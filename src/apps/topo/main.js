import { mountTopoInteractionContractPreview } from "./TopoInteractionContractRuntime.js";

function reportTopoBootstrapError(
  error,
  documentLike = globalThis.document,
  windowLike = globalThis.window,
) {
  const message = error instanceof Error ? error.message : String(error);
  if (windowLike) {
    windowLike.__ARCHITRINO_TOPO_BOOT_ERROR__ = message;
  }
  console.error(error);
  const status = documentLike?.querySelector?.("#topo-status");
  if (status) {
    status.textContent = "Topo interaction preview failed to initialize: " + message;
  }
}

if (typeof document !== "undefined") {
  try {
    window.__ARCHITRINO_TOPO_RUNTIME__ =
      mountTopoInteractionContractPreview();
  } catch (error) {
    reportTopoBootstrapError(error, document, window);
  }
}
