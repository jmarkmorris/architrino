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
  getPdgeditAssemblyStageXForRole,
  getPdgeditGridCellFromLocalPoint,
  getPdgeditRoutingColumnForObjectPair,
  PDGEDIT_GRID_STRIP_WIDTH_PX,
  PDGEDIT_RESERVED_TOP_ROW_COUNT,
  PDGEDIT_TILE_SIZE_PX,
} from "./PdgeditSurfaceGeometryRuntime.js";
import { resolvePdgeditCompositeLabelTileKey } from "./PdgeditCompositeLabelRuntime.js";
import { getPdgeditFrameGeometry, resolvePdgeditCatalogColor } from "./PdgeditTileCatalogRuntime.js";
import { renderPdgeditTileSvg } from "./PdgeditTileSvgRuntime.js";

const PDGEDIT_BALANCE_EPSILON_GLYPH = "ϵ";
const PDGEDIT_BALANCE_EPSILON_FONT_FAMILY = "'STIX Two Text', Cambria Math, Georgia, serif";

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeInteger(value, fallback = 0) {
  const number = Number(value);
  return Number.isInteger(number) ? number : fallback;
}

function parseNonnegativeInteger(value) {
  const normalizedValue = String(value ?? "").trim();
  if (!/^\d+$/u.test(normalizedValue)) {
    return null;
  }
  const parsedValue = Number(normalizedValue);
  return Number.isInteger(parsedValue) ? parsedValue : null;
}

function normalizePrimitiveCounts(rawCounts) {
  if (!rawCounts || typeof rawCounts !== "object") {
    return null;
  }
  const electrinoCount = normalizeInteger(rawCounts.electrinoCount, -1);
  const positrinoCount = normalizeInteger(rawCounts.positrinoCount, -1);
  if (electrinoCount < 0 || positrinoCount < 0) {
    return null;
  }
  return { electrinoCount, positrinoCount };
}

function isEditingElement(element) {
  const tagName = String(element?.tagName ?? "").toLowerCase();
  return tagName === "input" || tagName === "textarea" || element?.isContentEditable === true;
}

function buildTileLookup(tileCatalog = {}) {
  return new Map((Array.isArray(tileCatalog?.tiles) ? tileCatalog.tiles : []).map((tile) => [tile.key, tile]));
}

function buildTileCacheKey(tileKey, sampleCounts) {
  const normalizedTileKey = String(tileKey || "").trim();
  if (!sampleCounts || typeof sampleCounts !== "object") {
    return normalizedTileKey;
  }
  const topCount = sampleCounts.topCount ?? "";
  const bottomCount = sampleCounts.bottomCount ?? "";
  return `${normalizedTileKey}::${topCount}/${bottomCount}`;
}

function compareLinkEntriesByVerticalPosition(left = {}, right = {}) {
  const leftCenter = (Number(left.leftObject?.y) + Number(left.rightObject?.y)) / 2;
  const rightCenter = (Number(right.leftObject?.y) + Number(right.rightObject?.y)) / 2;
  return (
    leftCenter - rightCenter ||
    Number(left.leftObject?.y) - Number(right.leftObject?.y) ||
    Number(left.rightObject?.y) - Number(right.rightObject?.y) ||
    left.link.id.localeCompare(right.link.id)
  );
}

function getLinkSlotOffsetForSortedGroupIndex(sortedIndex = 0, groupSize = 1) {
  const normalizedGroupSize = Math.max(1, Number(groupSize) || 1);
  const normalizedIndex = Math.max(0, Math.min(Number(sortedIndex) || 0, normalizedGroupSize - 1));
  return (normalizedIndex - (normalizedGroupSize - 1) / 2) * 6;
}

export function buildPdgeditLinkRenderModels(document, getObjectByIdFromDocument) {
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
      .sort(compareLinkEntriesByVerticalPosition)
      .map((entry, index) => ({
        ...entry,
        slotOffsetPx: getLinkSlotOffsetForSortedGroupIndex(index, group.length),
        spline:
          buildPdgeditSplinePath({
            leftObject: entry.leftObject,
            rightObject: entry.rightObject,
            slotOffsetPx: getLinkSlotOffsetForSortedGroupIndex(index, group.length),
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
  element.inert = !isOpen;
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

function getPdgeditBalanceTypography(tileCatalog = {}) {
  const textLayout = tileCatalog?.textLayout ?? {};
  const fontSizePx = Number(textLayout.fontSizePx) || 11.75;
  const fontWeight = Number(textLayout.fontWeight) || 700;
  const fontFamily = normalizeText(textLayout.fontFamily) || '"Helvetica Neue", Helvetica, Arial, sans-serif';
  return {
    fontSizePx,
    fontWeight,
    fontFamily,
    superscriptSizePx: Math.max(7, fontSizePx - 2.5),
  };
}

function createReactionParticipantElement(documentLike, text) {
  const element = documentLike.createElement("span");
  element.className = "pdgedit-reaction-participant";
  const label = documentLike.createElement("span");
  label.className = "pdgedit-reaction-label";
  label.textContent = text;
  element.append(label);
  return element;
}

function createReactionSeparatorElement(documentLike) {
  const element = documentLike.createElement("span");
  element.className = "pdgedit-reaction-separator";
  element.textContent = "+";
  return element;
}

function createReactionProvenanceElement(documentLike, provenance) {
  const superscript = documentLike.createElement("sup");
  superscript.className = "pdgedit-reaction-provenance";
  superscript.textContent = provenance;
  return superscript;
}

function createReactionBracketedGroupElement(documentLike, participants, provenance) {
  const normalizedParticipants = Array.isArray(participants)
    ? participants.map((participant) => normalizeText(participant?.text)).filter(Boolean)
    : [];
  if (!normalizedParticipants.length) {
    return null;
  }
  const element = documentLike.createElement("span");
  element.className = "pdgedit-reaction-group";
  element.append(createTextElement(documentLike, "span", "pdgedit-reaction-bracket", "["));
  normalizedParticipants.forEach((text, index) => {
    if (index > 0) {
      element.append(createReactionSeparatorElement(documentLike));
    }
    element.append(createReactionParticipantElement(documentLike, text));
  });
  element.append(createTextElement(documentLike, "span", "pdgedit-reaction-bracket", "]"));
  element.append(createReactionProvenanceElement(documentLike, provenance));
  return element;
}

function appendReactionParticipantGroup(documentLike, container, participants, hasPreviousParticipant) {
  let appended = hasPreviousParticipant;
  participants.forEach((participant) => {
    const text = normalizeText(participant?.text);
    if (!text) {
      return;
    }
    if (appended) {
      container.append(createReactionSeparatorElement(documentLike));
    }
    container.append(createReactionParticipantElement(documentLike, text));
    appended = true;
  });
  return appended;
}

function renderReactionSide(documentLike, summary, side) {
  const pdgParticipants = Array.isArray(summary?.[`pdg${side}`]) ? summary[`pdg${side}`] : [];
  const aaaParticipants = Array.isArray(summary?.[`aaa${side}`]) ? summary[`aaa${side}`] : [];
  const sideElement = documentLike.createElement("span");
  sideElement.className = "pdgedit-reaction-side";
  const hasPdgParticipants = appendReactionParticipantGroup(documentLike, sideElement, pdgParticipants, false);
  const aaaGroup = createReactionBracketedGroupElement(documentLike, aaaParticipants, "AAA");
  if (aaaGroup) {
    if (hasPdgParticipants) {
      sideElement.append(createReactionSeparatorElement(documentLike));
    }
    sideElement.append(aaaGroup);
  }
  if (!hasPdgParticipants && !aaaGroup) {
    sideElement.append(documentLike.createTextNode(side === "Reactants" ? "No reactants" : "No products"));
  }
  return sideElement;
}

function isPdgeditDocumentLinkComplete(document = {}) {
  const objects = getPdgeditDocumentObjects(document);
  if (objects.length < 2 || !Array.isArray(document?.links) || document.links.length === 0) {
    return false;
  }
  const linkCountByObjectId = new Map();
  objects.forEach((object) => {
    const objectId = normalizeText(object?.id);
    if (objectId) {
      linkCountByObjectId.set(objectId, 0);
    }
  });
  if (!linkCountByObjectId.size) {
    return false;
  }
  document.links.forEach((link) => {
    const endpointA = normalizeText(link?.endpointA);
    const endpointB = normalizeText(link?.endpointB);
    if (!linkCountByObjectId.has(endpointA) || !linkCountByObjectId.has(endpointB) || endpointA === endpointB) {
      return;
    }
    linkCountByObjectId.set(endpointA, linkCountByObjectId.get(endpointA) + 1);
    linkCountByObjectId.set(endpointB, linkCountByObjectId.get(endpointB) + 1);
  });
  return [...linkCountByObjectId.values()].every((count) => count > 0);
}

function getPdgeditBalanceState(document = {}) {
  const balanceSummary = document?.metadata?.balanceSummary;
  return {
    balanceSummary,
    isBalanced: balanceSummary?.isBalanced === true,
    isLinkComplete: isPdgeditDocumentLinkComplete(document),
  };
}

function getPdgeditConnectorSourceCounts(object = {}) {
  if (object?.kind === "operator") {
    const electrinoCount = normalizeInteger(object?.electrinoCount, -1);
    const positrinoCount = normalizeInteger(object?.positrinoCount, -1);
    if (electrinoCount >= 0 && positrinoCount >= 0) {
      return { electrinoCount, positrinoCount };
    }
    return null;
  }
  if (object?.kind !== "assembly") {
    return null;
  }
  const primitiveCounts = object?.primitiveCounts;
  if (primitiveCounts && typeof primitiveCounts === "object") {
    const electrinoCount = normalizeInteger(primitiveCounts.electrinoCount, -1);
    const positrinoCount = normalizeInteger(primitiveCounts.positrinoCount, -1);
    if (electrinoCount >= 0 && positrinoCount >= 0) {
      return { electrinoCount, positrinoCount };
    }
  }
  const sampleCounts = object?.sampleCounts;
  if (sampleCounts && typeof sampleCounts === "object") {
    const electrinoCount = parseNonnegativeInteger(sampleCounts.topCount);
    const positrinoCount = parseNonnegativeInteger(sampleCounts.bottomCount);
    if (electrinoCount !== null && positrinoCount !== null) {
      return { electrinoCount, positrinoCount };
    }
  }
  return null;
}

function resolvePdgeditConnectorHighlightColor(catalog, model) {
  const counts = normalizePrimitiveCounts(model?.link?.primitiveCounts) || getPdgeditConnectorSourceCounts(model?.leftObject);
  if (!counts) {
    return resolvePdgeditCatalogColor(catalog, "purple");
  }
  if (counts.positrinoCount > counts.electrinoCount) {
    return resolvePdgeditCatalogColor(catalog, "red");
  }
  if (counts.electrinoCount > counts.positrinoCount) {
    return resolvePdgeditCatalogColor(catalog, "blue");
  }
  return resolvePdgeditCatalogColor(catalog, "purple");
}

function createBalanceLabelElement(documentLike, sign, tileCatalog) {
  const typography = getPdgeditBalanceTypography(tileCatalog);
  const labelElement = documentLike.createElement("span");
  labelElement.className = "pdgedit-balance-label";

  const epsilonElement = documentLike.createElement("span");
  epsilonElement.className = "pdgedit-balance-epsilon";
  epsilonElement.textContent = PDGEDIT_BALANCE_EPSILON_GLYPH;
  epsilonElement.style.fontFamily = PDGEDIT_BALANCE_EPSILON_FONT_FAMILY;

  const signElement = documentLike.createElement("span");
  signElement.className = "pdgedit-balance-sign";
  signElement.textContent = sign;
  signElement.style.fontSize = `${typography.superscriptSizePx}px`;

  labelElement.append(epsilonElement, signElement);
  return labelElement;
}

function createBalanceTermElement(documentLike, className, sign, count, tileCatalog) {
  const element = documentLike.createElement("span");
  element.className = `pdgedit-balance-term ${className}`;
  const labelElement = createBalanceLabelElement(documentLike, sign, tileCatalog);
  const countElement = documentLike.createElement("span");
  countElement.className = "pdgedit-balance-count";
  countElement.textContent = String(normalizeInteger(count));
  element.append(labelElement, documentLike.createTextNode(" "), countElement);
  return element;
}

function createBalanceBadgeElement(documentLike, role, totals, tileCatalog) {
  const stageX = getPdgeditAssemblyStageXForRole(role);
  if (!stageX) {
    return null;
  }
  const typography = getPdgeditBalanceTypography(tileCatalog);
  const element = documentLike.createElement("div");
  element.className = "pdgedit-balance-badge";
  element.dataset.balanceRole = role;
  element.style.left = `${(stageX - 1) * PDGEDIT_TILE_SIZE_PX + PDGEDIT_TILE_SIZE_PX * 2}px`;
  element.style.fontFamily = typography.fontFamily;
  element.style.fontSize = `${typography.fontSizePx}px`;
  element.style.fontWeight = String(typography.fontWeight);
  element.append(
    createBalanceTermElement(
      documentLike,
      "is-negative",
      "\u2212",
      totals?.epsilonMinusCount,
      tileCatalog,
    ),
    createTextElement(documentLike, "span", "pdgedit-balance-separator", ":"),
    createBalanceTermElement(
      documentLike,
      "is-positive",
      "+",
      totals?.epsilonPlusCount,
      tileCatalog,
    ),
  );
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
  balanceLayerElement,
  documentTitleElement,
  documentTriggerElement,
  documentPanelElement,
  documentSearchInputElement,
  documentSourceFilterElement,
  homeButtonElement,
  createPickerElement,
  reactionSummaryElement,
  manifestUrl,
  tileCatalogUrl,
  templateCatalogUrl,
  homeHref,
} = {}) {
  if (!documentLike || !appElement || !surfaceRegionElement || !surfaceStripElement) {
    throw new Error("pdgedit app runtime requires the standalone app DOM.");
  }

  const measurementContext = documentLike.createElement("canvas").getContext("2d");
  const tileElementPrototypeCache = new Map();
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
    documentQuery: "",
    documentSourceFilter: "all",
    createPicker: null,
    dragState: null,
    suppressObjectClickId: "",
  };

  function getRenderedDocument() {
    return state.previewDocument ?? state.document;
  }

  function closeDocumentPanel() {
    if (documentPanelElement?.contains(documentLike.activeElement)) {
      documentTriggerElement?.focus?.();
    }
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

  function renderSurface(document) {
    const totalRows = Math.max(2, getPdgeditDocumentMaxRow(document) + PDGEDIT_RESERVED_TOP_ROW_COUNT + 1);
    surfaceStripElement.style.height = `${totalRows * PDGEDIT_TILE_SIZE_PX}px`;
    renderObjects(document);
    renderLinks(document);
    renderCompositeLabels(document);
    renderBalanceBadges(document);
  }

  function renderChrome() {
    renderDocumentHeader();
    renderDocumentPicker();
    renderCreatePicker();
  }

  function renderDocumentHeader() {
    const renderedDocument = getRenderedDocument();
    const reactionSummary = renderedDocument?.metadata?.reactionSummary ?? null;
    const headingText =
      normalizeText(reactionSummary?.title) ||
      normalizeText(state.selectedEntry?.title) ||
      normalizeText(state.selectedEntry?.displayTitle) ||
      "No reaction selected";
    if (documentTitleElement) {
      documentTitleElement.textContent = headingText;
      documentTitleElement.title = headingText;
    }
    if (!reactionSummaryElement) {
      return;
    }
    reactionSummaryElement.replaceChildren();
    if (!reactionSummary) {
      reactionSummaryElement.hidden = true;
      reactionSummaryElement.setAttribute("aria-hidden", "true");
      return;
    }
    const summaryLine = documentLike.createElement("p");
    summaryLine.className = "pdgedit-reaction-summary-line";
    summaryLine.append(renderReactionSide(documentLike, reactionSummary, "Reactants"));
    summaryLine.append(createTextElement(documentLike, "span", "pdgedit-reaction-arrow", "\u2192"));
    summaryLine.append(renderReactionSide(documentLike, reactionSummary, "Products"));
    reactionSummaryElement.hidden = false;
    reactionSummaryElement.setAttribute("aria-hidden", "false");
    reactionSummaryElement.append(summaryLine);
  }

  function renderDocumentPicker() {
    documentTriggerElement.textContent = state.selectedEntry?.displayTitle || "No documents";
    documentTriggerElement.disabled = !(state.manifest?.entries?.length);
    setPickerVisibility(documentPanelElement, state.documentPanelOpen && Boolean(state.manifest?.entries?.length));
    const normalizedQuery = String(state.documentQuery || "").trim().toLowerCase();
    const normalizedSourceFilter =
      state.documentSourceFilter === "exact" ||
      state.documentSourceFilter === "example" ||
      state.documentSourceFilter === "unsolved"
        ? state.documentSourceFilter
        : "all";
    const filteredEntries = (Array.isArray(state.manifest?.entries) ? state.manifest.entries : []).filter((entry) => {
      if (normalizedSourceFilter !== "all" && entry.sourceKind !== normalizedSourceFilter) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      return [entry.displayTitle, entry.title, entry.id].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(normalizedQuery)
      );
    });
    if (documentSearchInputElement) {
      documentSearchInputElement.value = state.documentQuery;
    }
    if (documentSourceFilterElement) {
      const buttons = documentSourceFilterElement.querySelectorAll("[data-source-filter]");
      buttons.forEach((button) => {
        const isSelected = button.dataset.sourceFilter === normalizedSourceFilter;
        button.classList.toggle("is-selected", isSelected);
        button.setAttribute("aria-pressed", isSelected ? "true" : "false");
      });
    }
    const optionList = documentLike.createElement("div");
    optionList.className = "pdgedit-document-option-list";
    if (!filteredEntries.length) {
      optionList.append(createTextElement(documentLike, "div", "pdgedit-document-empty", "No matching reactions."));
    } else {
      filteredEntries.forEach((entry) => {
        const option = documentLike.createElement("button");
        option.type = "button";
        option.className = "pdgedit-document-option";
        option.dataset.entryId = entry.id;
        option.setAttribute("role", "option");
        option.setAttribute("aria-selected", entry.id === state.selectedEntry?.id ? "true" : "false");
        option.classList.toggle("is-selected", entry.id === state.selectedEntry?.id);
        option.textContent = entry.displayTitle;
        optionList.append(option);
      });
    }
    documentPanelElement.replaceChildren(
      ...([documentSearchInputElement, documentSourceFilterElement].filter(Boolean)),
      optionList
    );
  }

  function createTileElement(tileKey, sampleCounts = undefined) {
    const cacheKey = buildTileCacheKey(tileKey, sampleCounts);
    const cachedPrototype = tileElementPrototypeCache.get(cacheKey);
    if (cachedPrototype) {
      return cachedPrototype.cloneNode(true);
    }
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
    tileElementPrototypeCache.set(cacheKey, svg);
    return svg.cloneNode(true);
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
        element.append(createTileElement(tileKey, object.sampleCounts));
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
    const models = buildPdgeditLinkRenderModels(document, (objectId) => objectsById.get(objectId) ?? null);
    const balanceState = getPdgeditBalanceState(document);
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
        visiblePath.setAttribute(
          "stroke",
          balanceState.isBalanced && balanceState.isLinkComplete
            ? resolvePdgeditConnectorHighlightColor(state.tileCatalog, model)
            : "#ffffff"
        );
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
        hitPath.setAttribute("pointer-events", "stroke");
        hitPath.dataset.linkId = model.link.id;
        hitPath.classList.add("pdgedit-link-hit-target");

        return [visiblePath, hitPath];
      })
    );
  }

  function renderBalanceBadges(document) {
    if (!balanceLayerElement) {
      return;
    }
    balanceLayerElement.replaceChildren();
    const balanceSummary = document?.metadata?.balanceSummary ?? null;
    if (!balanceSummary) {
      return;
    }
    const balanceState = getPdgeditBalanceState(document);
    const reactantBadge = createBalanceBadgeElement(
      documentLike,
      "reactant",
      balanceSummary.reactantTotals,
      state.tileCatalog,
    );
    const productBadge = createBalanceBadgeElement(
      documentLike,
      "product",
      balanceSummary.productTotals,
      state.tileCatalog,
    );
    balanceLayerElement.replaceChildren(...[reactantBadge, productBadge].filter(Boolean));
  }

  function createCompositeLabelElement(label) {
    const frame = getPdgeditFrameGeometry(state.tileCatalog);
    const wrapper = documentLike.createElement("div");
    wrapper.className = `pdgedit-composite-label pdgedit-composite-label-${label.side}`;
    wrapper.dataset.compositeType = label.type;
    wrapper.style.top = `${(label.rowStart + PDGEDIT_RESERVED_TOP_ROW_COUNT) * PDGEDIT_TILE_SIZE_PX}px`;
    wrapper.style.height = `${(label.rowEnd - label.rowStart + 1) * PDGEDIT_TILE_SIZE_PX}px`;
    wrapper.style.left = label.side === "left" ? "0px" : `${(20 - 1) * PDGEDIT_TILE_SIZE_PX}px`;
    wrapper.style.width = `${PDGEDIT_TILE_SIZE_PX}px`;

    const line = documentLike.createElement("div");
    line.className = "pdgedit-composite-line";
    line.style.top = `${frame.outerInset}px`;
    line.style.bottom = `${frame.outerInset}px`;
    line.style.left = label.side === "left" ? "100%" : "0";
    line.style.zIndex = "2";
    const tileKey = resolvePdgeditCompositeLabelTileKey(label.type) || normalizeText(label.type) || label.text;
    const tileElement = createTileElement(tileKey);
    tileElement.classList.add("pdgedit-composite-tile");
    tileElement.setAttribute("aria-hidden", "true");
    tileElement.style.zIndex = "1";
    wrapper.append(tileElement, line);
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
    renderChrome();
    renderSurface(getRenderedDocument());
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

  function cancelPendingDragPreviewFrame() {
    if (!state.dragState?.animationFrameId) {
      return;
    }
    windowLike?.cancelAnimationFrame?.(state.dragState.animationFrameId);
    state.dragState.animationFrameId = 0;
  }

  function updateDragPreview() {
    if (!state.dragState) {
      return;
    }
    state.dragState.animationFrameId = 0;
    const stripRect = surfaceStripElement.getBoundingClientRect();
    const cell = getPdgeditGridCellFromLocalPoint(
      state.dragState.lastClientX - stripRect.left,
      state.dragState.lastClientY - stripRect.top
    );
    if (cell.row < 0) {
      if (state.previewDocument !== null || state.dragState.previewRow !== null) {
        state.dragState.previewRow = null;
        state.previewDocument = null;
        renderSurface(getRenderedDocument());
      }
      return;
    }
    if (cell.row === state.dragState.previewRow) {
      return;
    }
    state.dragState.previewRow = cell.row;
    const result = movePdgeditObjectToRow(state.document, state.dragState.objectId, cell.row);
    state.previewDocument = result.ok ? result.document : null;
    renderSurface(getRenderedDocument());
  }

  function queueDragPreviewUpdate() {
    if (!state.dragState || state.dragState.animationFrameId) {
      return;
    }
    if (typeof windowLike?.requestAnimationFrame === "function") {
      state.dragState.animationFrameId = windowLike.requestAnimationFrame(() => {
        updateDragPreview();
      });
      return;
    }
    updateDragPreview();
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
    tileElementPrototypeCache.clear();
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

    documentSearchInputElement?.addEventListener("input", (event) => {
      state.documentQuery = event.target.value;
      renderDocumentPicker();
    });

    documentSourceFilterElement?.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-source-filter]");
      if (!button) {
        return;
      }
      state.documentSourceFilter = button.dataset.sourceFilter || "all";
      renderDocumentPicker();
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
        lastClientX: event.clientX,
        lastClientY: event.clientY,
        previewRow: null,
        animationFrameId: 0,
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
      state.dragState.lastClientX = event.clientX;
      state.dragState.lastClientY = event.clientY;
      if (Math.abs(event.clientY - state.dragState.startClientY) > 3) {
        state.dragState.moved = true;
      }
      if (!state.dragState.moved) {
        return;
      }
      queueDragPreviewUpdate();
    });

    documentLike.addEventListener("pointerup", (event) => {
      if (!state.dragState || event.pointerId !== state.dragState.pointerId) {
        return;
      }
      cancelPendingDragPreviewFrame();
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

    documentLike.addEventListener("pointercancel", (event) => {
      if (!state.dragState || event.pointerId !== state.dragState.pointerId) {
        return;
      }
      cancelPendingDragPreviewFrame();
      state.dragState = null;
      state.previewDocument = null;
      renderSurface(getRenderedDocument());
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
