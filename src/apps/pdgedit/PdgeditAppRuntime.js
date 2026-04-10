import { navigateStandalonePdgeditHome } from "./PdgeditAppModeRuntime.js";
import { loadPdgeditContractBootstrapSeed } from "./PdgeditBootstrapRuntime.js";
import { loadPdgeditDocument } from "./PdgeditDocumentRuntime.js";
import {
  createPdgeditAssembly,
  createPdgeditLink,
  createPdgeditOperator,
  deletePdgeditLink,
  deletePdgeditObject,
  getPdgeditCreateSlot,
  getPdgeditDocumentMaxRow,
  getPdgeditDocumentObjects,
  movePdgeditObjectToRow,
} from "./PdgeditDocumentEditRuntime.js";
import {
  buildPdgeditSplinePath,
  getPdgeditGridCellFromLocalPoint,
  getPdgeditLinkSlotOffset,
  getPdgeditRoutingColumnForObjectPair,
  PDGEDIT_GRID_STRIP_WIDTH_PX,
  PDGEDIT_RESERVED_TOP_ROW_COUNT,
  PDGEDIT_TILE_SIZE_PX,
} from "./PdgeditSurfaceGeometryRuntime.js";
import { renderPdgeditTileSvg } from "./PdgeditTileSvgRuntime.js";

function isEditingElement(element) {
  const tagName = String(element?.tagName ?? "").toLowerCase();
  return tagName === "input" || tagName === "textarea" || element?.isContentEditable === true;
}

function buildTileLookup(tileCatalog = {}) {
  return new Map((Array.isArray(tileCatalog?.tiles) ? tileCatalog.tiles : []).map((tile) => [tile.key, tile]));
}

function buildLinkRenderModels(document, getObjectByIdFromDocument) {
  const groups = new Map();

  document.links.forEach((link) => {
    const leftObject = getObjectByIdFromDocument(link.endpointA);
    const rightObject = getObjectByIdFromDocument(link.endpointB);
    if (!leftObject || !rightObject) {
      return;
    }
    const routingColumn =
      leftObject.x < rightObject.x
        ? getPdgeditRoutingColumnForObjectPair(leftObject, rightObject)
        : getPdgeditRoutingColumnForObjectPair(rightObject, leftObject);
    if (!routingColumn) {
      return;
    }
    const key = String(routingColumn);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push({
      link,
      leftObject: leftObject.x < rightObject.x ? leftObject : rightObject,
      rightObject: leftObject.x < rightObject.x ? rightObject : leftObject,
    });
  });

  return [...groups.values()].flatMap((group) =>
    group
      .sort((left, right) => left.link.id.localeCompare(right.link.id))
      .map((entry, index) => ({
        ...entry,
        slotOffsetPx: getPdgeditLinkSlotOffset(index),
        spline:
          buildPdgeditSplinePath({
            leftObject: entry.leftObject,
            rightObject: entry.rightObject,
            slotOffsetPx: getPdgeditLinkSlotOffset(index),
          }) ?? null,
      }))
      .filter((entry) => entry.spline)
  );
}

function createHomeIconSvg(documentLike) {
  const namespace = "http://www.w3.org/2000/svg";
  const svg = documentLike.createElementNS(namespace, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  const path = documentLike.createElementNS(namespace, "path");
  path.setAttribute("d", "M3 11.5L12 4l9 7.5M6.5 10.5V20h11V10.5");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  svg.append(path);
  return svg;
}

function setPickerVisibility(element, isOpen) {
  if (!element) {
    return;
  }
  element.classList.toggle("is-open", isOpen);
  element.setAttribute("aria-hidden", isOpen ? "false" : "true");
  element.hidden = !isOpen;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createTextElement(documentLike, tagName, className, textContent) {
  const element = documentLike.createElement(tagName);
  if (className) {
    element.className = className;
  }
  element.textContent = textContent;
  return element;
}

export function createPdgeditAppRuntime({
  documentLike = globalThis.document,
  windowLike = globalThis.window,
  fetchImpl = globalThis.fetch?.bind(globalThis),
  bootstrapLoader = loadPdgeditContractBootstrapSeed,
  documentLoader = loadPdgeditDocument,
  appElement,
  surfaceRegionElement,
  surfaceStripElement,
  objectLayerElement,
  linkOverlayElement,
  compositeLayerElement,
  documentTriggerElement,
  documentPanelElement,
  homeButtonElement,
  createPickerElement,
  manifestUrl,
  tileCatalogUrl,
  templateCatalogUrl,
  homeHref,
} = {}) {
  if (!documentLike || !appElement || !surfaceRegionElement || !surfaceStripElement) {
    throw new Error("pdgedit app runtime requires the standalone app DOM.");
  }

  const measurementContext = documentLike.createElement("canvas").getContext("2d");
  const state = {
    tileCatalog: null,
    tileByKey: new Map(),
    manifest: null,
    templateCatalog: null,
    selectedEntry: null,
    document: null,
    previewDocument: null,
    selectedObjectId: "",
    pendingLinkObjectId: "",
    documentPanelOpen: false,
    createPicker: null,
    dragState: null,
    suppressObjectClickId: "",
  };

  function getRenderedDocument() {
    return state.previewDocument ?? state.document;
  }

  function closeDocumentPanel() {
    state.documentPanelOpen = false;
    setPickerVisibility(documentPanelElement, false);
  }

  function closeCreatePicker() {
    state.createPicker = null;
    setPickerVisibility(createPickerElement, false);
    createPickerElement.replaceChildren();
  }

  async function loadSelectedEntry(entry) {
    state.selectedEntry = entry ?? null;
    state.selectedObjectId = "";
    state.pendingLinkObjectId = "";
    state.previewDocument = null;
    if (!entry?.documentPath) {
      state.document = {
        schema: "pdgedit/v1",
        assemblies: [],
        operators: [],
        links: [],
        compositeLabels: [],
      };
      render();
      return;
    }
    state.document = await documentLoader({
      fetchImpl,
      specUrl: entry.documentPath,
    });
    render();
  }

  function commitDocument(nextDocument, { selectedObjectId = state.selectedObjectId } = {}) {
    state.document = nextDocument;
    state.previewDocument = null;
    state.selectedObjectId = selectedObjectId;
    render();
  }

  function renderDocumentPicker() {
    documentTriggerElement.textContent = state.selectedEntry?.displayTitle || "No documents";
    documentTriggerElement.disabled = !(state.manifest?.entries?.length);
    setPickerVisibility(documentPanelElement, state.documentPanelOpen && Boolean(state.manifest?.entries?.length));
    documentPanelElement.replaceChildren(
      ...(Array.isArray(state.manifest?.entries) ? state.manifest.entries : []).map((entry) => {
        const option = documentLike.createElement("button");
        option.type = "button";
        option.className = "pdgedit-document-option";
        option.dataset.entryId = entry.id;
        option.setAttribute("role", "option");
        option.setAttribute("aria-selected", entry.id === state.selectedEntry?.id ? "true" : "false");
        option.classList.toggle("is-selected", entry.id === state.selectedEntry?.id);
        option.textContent = entry.displayTitle;
        return option;
      })
    );
  }

  function createTileElement(tileKey, sampleCounts = undefined) {
    const tile = state.tileByKey.get(tileKey);
    if (!tile) {
      return createTextElement(documentLike, "div", "pdgedit-missing-tile", tileKey);
    }
    const svg = renderPdgeditTileSvg({
      documentLike,
      catalog: state.tileCatalog,
      tile,
      sampleCounts,
      measurementContext,
    });
    svg.classList.add("pdgedit-surface-tile");
    svg.style.width = `${PDGEDIT_TILE_SIZE_PX}px`;
    svg.style.height = `${PDGEDIT_TILE_SIZE_PX}px`;
    return svg;
  }

  function createObjectElement(object) {
    const element = documentLike.createElement("button");
    element.type = "button";
    element.className = `pdgedit-object pdgedit-object-${object.kind}`;
    element.dataset.objectId = object.id;
    element.dataset.kind = object.kind;
    element.style.left = `${(object.x - 1) * PDGEDIT_TILE_SIZE_PX}px`;
    element.style.top = `${(object.y + PDGEDIT_RESERVED_TOP_ROW_COUNT) * PDGEDIT_TILE_SIZE_PX}px`;
    element.style.width = `${object.widthTiles * PDGEDIT_TILE_SIZE_PX}px`;
    element.style.height = `${PDGEDIT_TILE_SIZE_PX}px`;
    element.classList.toggle("is-selected", state.selectedObjectId === object.id);
    element.classList.toggle("is-link-pending", state.pendingLinkObjectId === object.id);
    element.setAttribute("aria-label", object.title || object.id);

    if (object.kind === "assembly") {
      object.tiles.forEach((tileKey) => {
        element.append(createTileElement(tileKey));
      });
      return element;
    }

    element.append(
      createTileElement(object.type, {
        topCount: String(object.positrinoCount),
        bottomCount: String(object.electrinoCount),
      })
    );
    return element;
  }

  function renderObjects(document) {
    const objects = getPdgeditDocumentObjects(document).sort((left, right) =>
      left.y - right.y || left.x - right.x || left.id.localeCompare(right.id)
    );
    objectLayerElement.replaceChildren(...objects.map(createObjectElement));
  }

  function renderLinks(document) {
    const objectsById = new Map(getPdgeditDocumentObjects(document).map((record) => [record.id, record]));
    const models = buildLinkRenderModels(document, (objectId) => objectsById.get(objectId) ?? null);
    const totalRows = Math.max(2, getPdgeditDocumentMaxRow(document) + PDGEDIT_RESERVED_TOP_ROW_COUNT + 1);
    const heightPx = totalRows * PDGEDIT_TILE_SIZE_PX;
    linkOverlayElement.setAttribute("viewBox", `0 0 ${PDGEDIT_GRID_STRIP_WIDTH_PX} ${heightPx}`);
    linkOverlayElement.setAttribute("width", String(PDGEDIT_GRID_STRIP_WIDTH_PX));
    linkOverlayElement.setAttribute("height", String(heightPx));
    linkOverlayElement.replaceChildren(
      ...models.flatMap((model) => {
        const visiblePath = documentLike.createElementNS("http://www.w3.org/2000/svg", "path");
        visiblePath.setAttribute("d", model.spline.path);
        visiblePath.setAttribute("fill", "none");
        visiblePath.setAttribute("stroke", "#ffffff");
        visiblePath.setAttribute("stroke-width", "2");
        visiblePath.setAttribute("stroke-linecap", "round");
        visiblePath.setAttribute("stroke-linejoin", "round");
        visiblePath.setAttribute("pointer-events", "none");

        const hitPath = documentLike.createElementNS("http://www.w3.org/2000/svg", "path");
        hitPath.setAttribute("d", model.spline.path);
        hitPath.setAttribute("fill", "none");
        hitPath.setAttribute("stroke", "transparent");
        hitPath.setAttribute("stroke-width", "12");
        hitPath.setAttribute("stroke-linecap", "round");
        hitPath.setAttribute("stroke-linejoin", "round");
        hitPath.dataset.linkId = model.link.id;
        hitPath.classList.add("pdgedit-link-hit-target");

        return [visiblePath, hitPath];
      })
    );
  }

  function createCompositeLabelElement(label) {
    const wrapper = documentLike.createElement("div");
    wrapper.className = `pdgedit-composite-label pdgedit-composite-label-${label.side}`;
    wrapper.dataset.compositeType = label.type;
    wrapper.style.top = `${(label.rowStart + PDGEDIT_RESERVED_TOP_ROW_COUNT) * PDGEDIT_TILE_SIZE_PX}px`;
    wrapper.style.height = `${(label.rowEnd - label.rowStart + 1) * PDGEDIT_TILE_SIZE_PX}px`;
    wrapper.style.left = label.side === "left" ? "0px" : `${(20 - 1) * PDGEDIT_TILE_SIZE_PX}px`;
    wrapper.style.width = `${PDGEDIT_TILE_SIZE_PX}px`;

    const line = documentLike.createElement("div");
    line.className = "pdgedit-composite-line";
    const text = createTextElement(documentLike, "div", "pdgedit-composite-text", label.text);
    wrapper.append(line, text);
    return wrapper;
  }

  function renderCompositeLabels(document) {
    compositeLayerElement.replaceChildren(
      ...document.compositeLabels.map((label) => createCompositeLabelElement(label))
    );
  }

  function renderCreatePicker() {
    if (!state.createPicker) {
      closeCreatePicker();
      return;
    }
    const surfaceRect = surfaceRegionElement.getBoundingClientRect();
    const maxLeft = Math.max(16, surfaceRect.width - 320);
    const maxTop = Math.max(16, surfaceRect.height - 360);
    createPickerElement.style.left = `${clamp(state.createPicker.anchorX, 16, maxLeft)}px`;
    createPickerElement.style.top = `${clamp(state.createPicker.anchorY, 16, maxTop)}px`;
    createPickerElement.replaceChildren();

    if (state.createPicker.slot.kind === "assembly") {
      const list = documentLike.createElement("div");
      list.className = "pdgedit-create-list";
      state.templateCatalog.assemblyTemplates.forEach((template) => {
        const button = documentLike.createElement("button");
        button.type = "button";
        button.className = "pdgedit-create-option";
        button.dataset.assemblyType = template.type;
        button.textContent = template.displayTitle;
        list.append(button);
      });
      createPickerElement.append(list);
    } else {
      const typeRow = documentLike.createElement("div");
      typeRow.className = "pdgedit-operator-type-row";
      state.templateCatalog.operatorTemplates.forEach((template) => {
        const button = documentLike.createElement("button");
        button.type = "button";
        button.className = "pdgedit-operator-type-button";
        button.dataset.operatorType = template.type;
        button.textContent = template.displayTitle;
        button.classList.toggle("is-selected", state.createPicker.operatorType === template.type);
        typeRow.append(button);
      });

      const counts = documentLike.createElement("div");
      counts.className = "pdgedit-count-fields";

      const positrinoField = documentLike.createElement("label");
      positrinoField.className = "pdgedit-count-field";
      const positrinoInput = documentLike.createElement("input");
      positrinoInput.type = "number";
      positrinoInput.step = "1";
      positrinoInput.min = "0";
      positrinoInput.value = state.createPicker.positrinoCount;
      positrinoInput.dataset.countField = "positrinoCount";
      positrinoInput.setAttribute("aria-label", "Positrino count");
      positrinoField.append(positrinoInput);

      const electrinoField = documentLike.createElement("label");
      electrinoField.className = "pdgedit-count-field";
      const electrinoInput = documentLike.createElement("input");
      electrinoInput.type = "number";
      electrinoInput.step = "1";
      electrinoInput.min = "0";
      electrinoInput.value = state.createPicker.electrinoCount;
      electrinoInput.dataset.countField = "electrinoCount";
      electrinoInput.setAttribute("aria-label", "Electrino count");
      electrinoField.append(electrinoInput);

      counts.append(positrinoField, electrinoField);

      const createButton = documentLike.createElement("button");
      createButton.type = "button";
      createButton.className = "pdgedit-create-confirm";
      createButton.dataset.action = "create-operator";
      createButton.textContent = "Create";
      const positrinoCount = Number(state.createPicker.positrinoCount);
      const electrinoCount = Number(state.createPicker.electrinoCount);
      createButton.disabled = !Number.isInteger(positrinoCount) || positrinoCount < 0 || !Number.isInteger(electrinoCount) || electrinoCount < 0;

      createPickerElement.append(typeRow, counts, createButton);
    }

    setPickerVisibility(createPickerElement, true);
  }

  function render() {
    if (!state.document || !state.tileCatalog || !state.templateCatalog) {
      return;
    }
    const renderDocument = getRenderedDocument();
    const totalRows = Math.max(2, getPdgeditDocumentMaxRow(renderDocument) + PDGEDIT_RESERVED_TOP_ROW_COUNT + 1);
    surfaceStripElement.style.height = `${totalRows * PDGEDIT_TILE_SIZE_PX}px`;
    renderDocumentPicker();
    renderObjects(renderDocument);
    renderLinks(renderDocument);
    renderCompositeLabels(renderDocument);
    renderCreatePicker();
  }

  function openCreatePicker(slot, event) {
    closeDocumentPanel();
    state.createPicker = {
      slot,
      anchorX: event.clientX - surfaceRegionElement.getBoundingClientRect().left + 12,
      anchorY: event.clientY - surfaceRegionElement.getBoundingClientRect().top + 12,
      operatorType: "associate",
      positrinoCount: "0",
      electrinoCount: "0",
    };
    render();
  }

  function clearSelection() {
    state.selectedObjectId = "";
    state.pendingLinkObjectId = "";
    render();
  }

  function handleObjectActivation(objectId, shiftKey) {
    if (!shiftKey) {
      state.pendingLinkObjectId = "";
      state.selectedObjectId = objectId;
      render();
      return;
    }
    if (!state.pendingLinkObjectId) {
      state.pendingLinkObjectId = objectId;
      state.selectedObjectId = objectId;
      render();
      return;
    }
    if (state.pendingLinkObjectId === objectId) {
      state.pendingLinkObjectId = "";
      render();
      return;
    }
    const result = createPdgeditLink(state.document, state.pendingLinkObjectId, objectId);
    state.pendingLinkObjectId = "";
    if (result.ok) {
      commitDocument(result.document, { selectedObjectId: objectId });
      return;
    }
    state.selectedObjectId = objectId;
    render();
  }

  async function init() {
    const bootstrap = await bootstrapLoader({
      fetchImpl,
      manifestUrl,
      tileCatalogUrl,
      templateCatalogUrl,
    });
    state.tileCatalog = bootstrap.tileCatalog;
    state.tileByKey = buildTileLookup(bootstrap.tileCatalog);
    state.manifest = bootstrap.manifest;
    state.templateCatalog = bootstrap.templateCatalog;
    state.selectedEntry = bootstrap.selectedEntry;
    state.document = bootstrap.document;

    homeButtonElement.replaceChildren(createHomeIconSvg(documentLike));
    homeButtonElement.addEventListener("click", () => {
      navigateStandalonePdgeditHome(windowLike?.location, homeHref);
    });

    documentTriggerElement.addEventListener("click", (event) => {
      event.stopPropagation();
      state.documentPanelOpen = !state.documentPanelOpen;
      render();
    });

    documentPanelElement.addEventListener("click", async (event) => {
      const button = event.target.closest("button[data-entry-id]");
      if (!button) {
        return;
      }
      closeDocumentPanel();
      const entry = state.manifest.entries.find((record) => record.id === button.dataset.entryId) ?? null;
      await loadSelectedEntry(entry);
    });

    createPickerElement.addEventListener("click", (event) => {
      const assemblyButton = event.target.closest("button[data-assembly-type]");
      if (assemblyButton && state.createPicker?.slot.kind === "assembly") {
        const template = state.templateCatalog.assemblyTemplateByType.get(assemblyButton.dataset.assemblyType) ?? null;
        if (!template) {
          return;
        }
        const result = createPdgeditAssembly(
          state.document,
          template,
          state.createPicker.slot.role,
          state.createPicker.slot.y
        );
        if (result.ok) {
          closeCreatePicker();
          commitDocument(result.document, { selectedObjectId: result.createdId });
        }
        return;
      }
      const operatorButton = event.target.closest("button[data-operator-type]");
      if (operatorButton && state.createPicker?.slot.kind === "operator") {
        state.createPicker.operatorType = operatorButton.dataset.operatorType;
        renderCreatePicker();
        return;
      }
      const createOperatorButton = event.target.closest("button[data-action='create-operator']");
      if (createOperatorButton && state.createPicker?.slot.kind === "operator") {
        const result = createPdgeditOperator(state.document, {
          type: state.createPicker.operatorType,
          x: state.createPicker.slot.x,
          y: state.createPicker.slot.y,
          positrinoCount: Number(state.createPicker.positrinoCount),
          electrinoCount: Number(state.createPicker.electrinoCount),
        });
        if (result.ok) {
          closeCreatePicker();
          commitDocument(result.document, { selectedObjectId: result.createdId });
        }
      }
    });

    createPickerElement.addEventListener("input", (event) => {
      const input = event.target.closest("input[data-count-field]");
      if (!input || !state.createPicker) {
        return;
      }
      state.createPicker[input.dataset.countField] = input.value;
      renderCreatePicker();
    });

    objectLayerElement.addEventListener("pointerdown", (event) => {
      const objectElement = event.target.closest("[data-object-id]");
      if (!objectElement || event.button !== 0 || event.shiftKey) {
        return;
      }
      closeCreatePicker();
      state.dragState = {
        objectId: objectElement.dataset.objectId,
        pointerId: event.pointerId,
        startClientY: event.clientY,
        moved: false,
      };
    });

    objectLayerElement.addEventListener("click", (event) => {
      const objectElement = event.target.closest("[data-object-id]");
      if (!objectElement) {
        return;
      }
      event.stopPropagation();
      if (state.suppressObjectClickId && state.suppressObjectClickId === objectElement.dataset.objectId) {
        state.suppressObjectClickId = "";
        return;
      }
      closeCreatePicker();
      handleObjectActivation(objectElement.dataset.objectId, event.shiftKey);
    });

    documentLike.addEventListener("pointermove", (event) => {
      if (!state.dragState || event.pointerId !== state.dragState.pointerId) {
        return;
      }
      if (Math.abs(event.clientY - state.dragState.startClientY) > 3) {
        state.dragState.moved = true;
      }
      if (!state.dragState.moved) {
        return;
      }
      const stripRect = surfaceStripElement.getBoundingClientRect();
      const cell = getPdgeditGridCellFromLocalPoint(event.clientX - stripRect.left, event.clientY - stripRect.top);
      if (cell.row < 0) {
        state.previewDocument = null;
        render();
        return;
      }
      const result = movePdgeditObjectToRow(state.document, state.dragState.objectId, cell.row);
      state.previewDocument = result.ok ? result.document : null;
      render();
    });

    documentLike.addEventListener("pointerup", (event) => {
      if (!state.dragState || event.pointerId !== state.dragState.pointerId) {
        return;
      }
      if (state.dragState.moved && state.previewDocument) {
        const objectId = state.dragState.objectId;
        const previewDocument = state.previewDocument;
        state.dragState = null;
        state.previewDocument = null;
        state.suppressObjectClickId = objectId;
        commitDocument(previewDocument, {
          selectedObjectId: objectId,
        });
        return;
      }
      state.dragState = null;
      state.previewDocument = null;
      render();
    });

    linkOverlayElement.addEventListener("click", (event) => {
      const linkTarget = event.target.closest("[data-link-id]");
      if (!linkTarget || event.shiftKey) {
        return;
      }
      event.stopPropagation();
      const result = deletePdgeditLink(state.document, linkTarget.dataset.linkId);
      if (result.ok) {
        commitDocument(result.document);
      }
    });

    surfaceStripElement.addEventListener("click", (event) => {
      if (event.target.closest("[data-object-id]") || event.target.closest("[data-link-id]") || event.shiftKey) {
        return;
      }
      clearSelection();
    });

    surfaceStripElement.addEventListener("dblclick", (event) => {
      if (event.target.closest("[data-object-id]") || event.target.closest("[data-link-id]")) {
        return;
      }
      const stripRect = surfaceStripElement.getBoundingClientRect();
      const cell = getPdgeditGridCellFromLocalPoint(event.clientX - stripRect.left, event.clientY - stripRect.top);
      const slot = getPdgeditCreateSlot(cell.column, cell.row, state.document);
      if (!slot) {
        return;
      }
      event.preventDefault();
      openCreatePicker(slot, event);
    });

    documentLike.addEventListener("pointerdown", (event) => {
      const target = event.target;
      if (
        state.documentPanelOpen &&
        !documentPanelElement.contains(target) &&
        !documentTriggerElement.contains(target)
      ) {
        closeDocumentPanel();
        render();
      }
      if (state.createPicker && !createPickerElement.contains(target)) {
        closeCreatePicker();
        render();
      }
    });

    documentLike.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const hadOpenChrome = state.documentPanelOpen || Boolean(state.createPicker) || Boolean(state.pendingLinkObjectId);
        closeDocumentPanel();
        closeCreatePicker();
        state.pendingLinkObjectId = "";
        if (hadOpenChrome) {
          render();
        }
        return;
      }
      if ((event.key === "Delete" || event.key === "Backspace") && state.selectedObjectId && !isEditingElement(documentLike.activeElement)) {
        event.preventDefault();
        const result = deletePdgeditObject(state.document, state.selectedObjectId);
        if (result.ok) {
          commitDocument(result.document, { selectedObjectId: "" });
        }
      }
    });

    render();
  }

  return {
    init,
    render,
    loadSelectedEntry,
    readCurrentDocument() {
      return getRenderedDocument();
    },
    getState() {
      return {
        ...state,
      };
    },
  };
}
