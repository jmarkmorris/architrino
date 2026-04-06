import { XYZZY_SCHEMA } from "./XyzzyConstants.js";
import {
  buildXyzzyDocumentValidation,
  buildXyzzyLinkEndpointPairKey,
  cloneXyzzyDocument,
  createDefaultXyzzyDocument,
  getXyzzyRoutingColumnBetweenObjects,
} from "./XyzzyDocumentRuntime.js";
import { renderXyzzySurface } from "./XyzzyRenderRuntime.js";
import { buildXyzzySurfaceLayout } from "./XyzzySurfaceLayoutRuntime.js";

const DEFAULT_TILE_WIDTH_PX = 112;
const DEFAULT_TILE_HEIGHT_PX = 96;

function normalizeString(value = "") {
  return String(value ?? "").trim();
}

function sanitizeIdSegment(value = "") {
  return normalizeString(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function setText(element, text = "") {
  if (element) {
    element.textContent = String(text ?? "");
  }
}

function setButtonDisabled(element, disabled = false) {
  if (element && "disabled" in element) {
    element.disabled = Boolean(disabled);
  }
}

function describeLinkAttemptFailure(objectA = {}, objectB = {}) {
  if (objectA?.id === objectB?.id) {
    return "Self-links are forbidden.";
  }
  return "Links are allowed only between neighboring object bands through columns 6, 8, 13, or 15.";
}

function formatJson(value = {}) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function downloadJson(documentValue = {}, filename = "xyzzy_document.v1.json") {
  if (!globalThis.window || typeof globalThis.Blob !== "function" || typeof globalThis.URL?.createObjectURL !== "function") {
    return false;
  }
  const payload = formatJson(documentValue);
  const blob = new Blob([payload], { type: "application/json" });
  const href = globalThis.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  link.click();
  globalThis.URL.revokeObjectURL(href);
  return true;
}

export function createXyzzyAppRuntime(deps = {}) {
  const {
    root = null,
    statusElement = null,
    diagnosticsElement = null,
    jsonTextarea = null,
    applyJsonButton = null,
    resetExampleButton = null,
    exportJsonButton = null,
    tileWidth = DEFAULT_TILE_WIDTH_PX,
    tileHeight = DEFAULT_TILE_HEIGHT_PX,
    initialDocument = createDefaultXyzzyDocument(),
    renderSurface = renderXyzzySurface,
    downloadJsonImpl = downloadJson,
  } = deps;

  let currentDocument = cloneXyzzyDocument(initialDocument);
  let currentLayout = buildXyzzySurfaceLayout(currentDocument);
  let pendingLinkEndpointId = "";

  function updateStatus(message = "") {
    setText(statusElement, message);
  }

  function renderDiagnostics(diagnostics = []) {
    if (!diagnosticsElement || typeof diagnosticsElement.innerHTML !== "string") {
      return;
    }
    diagnosticsElement.innerHTML = "";
    if (!Array.isArray(diagnostics) || diagnostics.length === 0) {
      const emptyState = document.createElement("li");
      emptyState.className = "xyzzy-diagnostics-empty";
      emptyState.textContent = "No validation issues.";
      diagnosticsElement.appendChild(emptyState);
      return;
    }
    diagnostics.forEach((diagnostic) => {
      const item = document.createElement("li");
      item.className = "xyzzy-diagnostic-item";
      item.textContent = String(diagnostic ?? "");
      diagnosticsElement.appendChild(item);
    });
  }

  function syncJsonTextarea() {
    if (jsonTextarea && typeof jsonTextarea.value === "string") {
      jsonTextarea.value = formatJson(currentDocument);
    }
  }

  function clearPendingLink(options = {}) {
    const hadPendingLink = Boolean(pendingLinkEndpointId);
    pendingLinkEndpointId = "";
    if (hadPendingLink && options?.rerender !== false) {
      render();
    }
  }

  function render(validationDiagnostics = currentLayout.validation.diagnostics) {
    renderSurface({
      root,
      layout: currentLayout,
      tileWidth,
      tileHeight,
      pendingLinkEndpointId,
      onObjectClick: handleObjectClick,
      onLinkClick: handleLinkClick,
    });
    renderDiagnostics(validationDiagnostics);
    setButtonDisabled(exportJsonButton, !currentLayout.validation.valid);
  }

  function applyDocument(nextDocument = {}, options = {}) {
    const nextLayout = buildXyzzySurfaceLayout(nextDocument);
    if (!nextLayout.validation.valid) {
      renderDiagnostics(nextLayout.validation.diagnostics);
      updateStatus(options.invalidStatusMessage || "Xyzzy JSON did not pass validation and was not applied.");
      return false;
    }
    currentDocument = cloneXyzzyDocument(nextDocument);
    currentLayout = nextLayout;
    syncJsonTextarea();
    if (!currentLayout.validation.objectLookup.has(pendingLinkEndpointId)) {
      pendingLinkEndpointId = "";
    }
    render();
    updateStatus(options.statusMessage || "Xyzzy surface updated.");
    return true;
  }

  function createLinkId(endpointA = "", endpointB = "") {
    const sortedIds = [sanitizeIdSegment(endpointA), sanitizeIdSegment(endpointB)].sort();
    return `link_${sortedIds.join("_to_") || "pair"}`;
  }

  function linkAlreadyExists(endpointA = "", endpointB = "") {
    const requestedKey = buildXyzzyLinkEndpointPairKey(endpointA, endpointB);
    return (Array.isArray(currentDocument?.links) ? currentDocument.links : []).some(
      (link) => buildXyzzyLinkEndpointPairKey(link?.endpointA, link?.endpointB) === requestedKey
    );
  }

  function handleObjectClick(objectId = "", event = null) {
    if (!event?.shiftKey) {
      return;
    }
    const clickedObject = currentLayout.validation.objectLookup.get(objectId);
    if (!clickedObject) {
      return;
    }

    if (!pendingLinkEndpointId) {
      pendingLinkEndpointId = objectId;
      render();
      updateStatus(`Spline draft started at ${normalizeString(clickedObject.title) || objectId}. Shift-click a neighboring object band to finish.`);
      return;
    }

    const pendingObject = currentLayout.validation.objectLookup.get(pendingLinkEndpointId);
    if (!pendingObject) {
      pendingLinkEndpointId = objectId;
      render();
      updateStatus(`Spline draft restarted at ${normalizeString(clickedObject.title) || objectId}.`);
      return;
    }

    const requestedRoutingColumn = getXyzzyRoutingColumnBetweenObjects(pendingObject, clickedObject);
    if (!requestedRoutingColumn) {
      clearPendingLink({ rerender: false });
      render();
      updateStatus(describeLinkAttemptFailure(pendingObject, clickedObject));
      return;
    }

    if (linkAlreadyExists(pendingLinkEndpointId, objectId)) {
      clearPendingLink({ rerender: false });
      render();
      updateStatus("That undirected spline already exists, so the repeated creation attempt was ignored.");
      return;
    }

    const nextDocument = cloneXyzzyDocument(currentDocument);
    nextDocument.links = Array.isArray(nextDocument.links) ? [...nextDocument.links] : [];
    nextDocument.links.push({
      id: createLinkId(pendingLinkEndpointId, objectId),
      endpointA: pendingLinkEndpointId,
      endpointB: objectId,
    });
    pendingLinkEndpointId = "";
    applyDocument(nextDocument, {
      statusMessage: `Spline added through routing column ${requestedRoutingColumn}.`,
      invalidStatusMessage: "The requested spline violated the Xyzzy surface rules and was not added.",
    });
  }

  function handleLinkClick(linkId = "", event = null) {
    if (event?.shiftKey) {
      return;
    }
    const nextDocument = cloneXyzzyDocument(currentDocument);
    nextDocument.links = (Array.isArray(nextDocument.links) ? nextDocument.links : []).filter(
      (link) => normalizeString(link?.id) !== normalizeString(linkId)
    );
    clearPendingLink({ rerender: false });
    applyDocument(nextDocument, {
      statusMessage: "Spline deleted.",
      invalidStatusMessage: "Spline deletion produced an invalid Xyzzy document.",
    });
  }

  function handleApplyJson() {
    const source = jsonTextarea && typeof jsonTextarea.value === "string" ? jsonTextarea.value : "";
    let parsedDocument;
    try {
      parsedDocument = JSON.parse(String(source ?? ""));
    } catch (error) {
      renderDiagnostics([`$: invalid JSON: ${String(error?.message ?? "parse failed").trim()}`]);
      updateStatus("Xyzzy JSON could not be parsed.");
      return false;
    }
    return applyDocument(parsedDocument, {
      statusMessage: "Xyzzy JSON applied to the surface.",
      invalidStatusMessage: "Xyzzy JSON failed strip, overlap, or adjacency validation.",
    });
  }

  function handleResetExample() {
    clearPendingLink({ rerender: false });
    applyDocument(createDefaultXyzzyDocument(), {
      statusMessage: "Loaded the built-in Xyzzy example document.",
    });
  }

  function handleExportJson() {
    if (!currentLayout.validation.valid) {
      updateStatus("Only a valid xyzzy/v1 document can be exported.");
      return false;
    }
    const exported = downloadJsonImpl(currentDocument, "xyzzy_document.v1.json");
    if (!exported) {
      updateStatus("JSON export is unavailable in this runtime.");
      return false;
    }
    updateStatus(`Exported ${XYZZY_SCHEMA} JSON.`);
    return true;
  }

  function wireDomListeners() {
    applyJsonButton?.addEventListener("click", handleApplyJson);
    resetExampleButton?.addEventListener("click", handleResetExample);
    exportJsonButton?.addEventListener("click", handleExportJson);
    globalThis.window?.addEventListener("keyup", (event) => {
      if (event.key === "Shift") {
        clearPendingLink();
      }
    });
    globalThis.window?.addEventListener("blur", () => {
      clearPendingLink();
    });
  }

  async function init() {
    wireDomListeners();
    syncJsonTextarea();
    render(currentLayout.validation.diagnostics);
    if (currentLayout.validation.valid) {
      updateStatus("Xyzzy is ready. JSON owns object creation and placement for v1; Shift-click neighboring objects to author splines.");
    } else {
      updateStatus("The initial Xyzzy document is invalid.");
    }
  }

  return {
    init,
    getDocument() {
      return cloneXyzzyDocument(currentDocument);
    },
    getLayout() {
      return currentLayout;
    },
    applyDocument,
    handleApplyJson,
    handleResetExample,
    handleExportJson,
    handleObjectClick,
    handleLinkClick,
  };
}
