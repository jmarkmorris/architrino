import { PDGEDIT_APP_MODE } from "./PdgeditAppModeRuntime.js";
import {
  DEFAULT_PDGEDIT_MANIFEST_URL,
  DEFAULT_PDGEDIT_TEMPLATE_CATALOG_URL,
  DEFAULT_PDGEDIT_TILE_CATALOG_URL,
} from "./PdgeditBootstrapRuntime.js";
import { createPdgeditAppRuntime } from "./PdgeditAppRuntime.js";

export function bootstrapPdgeditApp({
  documentLike = globalThis.document,
  windowLike = globalThis.window,
  manifestUrl = DEFAULT_PDGEDIT_MANIFEST_URL,
  tileCatalogUrl = DEFAULT_PDGEDIT_TILE_CATALOG_URL,
  templateCatalogUrl = DEFAULT_PDGEDIT_TEMPLATE_CATALOG_URL,
  homeHref = "./index.html",
} = {}) {
  if (!documentLike) {
    throw new Error("pdgedit bootstrap requires document.");
  }
  const runtime = createPdgeditAppRuntime({
    documentLike,
    windowLike,
    appElement: documentLike.getElementById("pdgedit-app"),
    surfaceRegionElement: documentLike.getElementById("pdgedit-surface-region"),
    surfaceStripElement: documentLike.getElementById("pdgedit-surface-strip"),
    objectLayerElement: documentLike.getElementById("pdgedit-object-layer"),
    linkOverlayElement: documentLike.getElementById("pdgedit-link-overlay"),
    compositeLayerElement: documentLike.getElementById("pdgedit-composite-layer"),
    documentTriggerElement: documentLike.getElementById("pdgedit-document-trigger"),
    documentPanelElement: documentLike.getElementById("pdgedit-document-panel"),
    homeButtonElement: documentLike.getElementById("pdgedit-home-button"),
    createPickerElement: documentLike.getElementById("pdgedit-create-picker"),
    manifestUrl,
    tileCatalogUrl,
    templateCatalogUrl,
    homeHref,
  });
  return runtime;
}

if (typeof window !== "undefined") {
  window.__ARCHITRINO_APP_MODE__ = PDGEDIT_APP_MODE;
}

if (typeof document !== "undefined") {
  const runtime = bootstrapPdgeditApp();
  if (typeof window !== "undefined") {
    window.__ARCHITRINO_PDGEDIT_RUNTIME__ = runtime;
  }
  void runtime.init();
}
