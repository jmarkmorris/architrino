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
    documentSearchInputElement: documentLike.getElementById("pdgedit-document-search"),
    homeButtonElement: documentLike.getElementById("pdgedit-home-button"),
    createPickerElement: documentLike.getElementById("pdgedit-create-picker"),
    manifestUrl,
    tileCatalogUrl,
    templateCatalogUrl,
    homeHref,
  });
  return runtime;
}

function reportPdgeditBootstrapError(error, documentLike = globalThis.document, windowLike = globalThis.window) {
  const message = error instanceof Error ? error.message : String(error);
  if (windowLike) {
    windowLike.__ARCHITRINO_PDGEDIT_BOOT_ERROR__ = message;
  }
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(error);
  }
  const appElement = documentLike?.getElementById?.("pdgedit-app");
  if (!appElement) {
    return;
  }
  let banner = documentLike.getElementById("pdgedit-boot-error");
  if (!banner) {
    banner = documentLike.createElement("div");
    banner.id = "pdgedit-boot-error";
    banner.style.position = "absolute";
    banner.style.top = "96px";
    banner.style.left = "16px";
    banner.style.right = "16px";
    banner.style.padding = "12px 14px";
    banner.style.border = "1px solid rgba(255,255,255,0.18)";
    banner.style.borderRadius = "12px";
    banner.style.background = "rgba(131, 29, 29, 0.86)";
    banner.style.color = "#fff7f7";
    banner.style.font = '600 13px/1.4 "Helvetica Neue", Arial, sans-serif';
    banner.style.zIndex = "20";
    appElement.append(banner);
  }
  banner.textContent = `pdgedit failed to initialize: ${message}`;
}

if (typeof window !== "undefined") {
  window.__ARCHITRINO_APP_MODE__ = PDGEDIT_APP_MODE;
}

if (typeof document !== "undefined") {
  const runtime = bootstrapPdgeditApp();
  if (typeof window !== "undefined") {
    window.__ARCHITRINO_PDGEDIT_RUNTIME__ = runtime;
  }
  void runtime.init().catch((error) => {
    reportPdgeditBootstrapError(error, document, window);
  });
}
