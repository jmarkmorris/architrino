import { createPhotonRuntime } from "./PhotonRuntime.js";

function reportPhotonBootstrapError(error, documentLike = globalThis.document, windowLike = globalThis.window) {
  const message = error instanceof Error ? error.message : String(error);
  if (windowLike) {
    windowLike.__ARCHITRINO_PHOTON_BOOT_ERROR__ = message;
  }
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(error);
  }
  const appElement = documentLike?.getElementById?.("photon-app");
  if (!appElement) {
    return;
  }
  const banner = documentLike.createElement("div");
  banner.id = "photon-boot-error";
  banner.textContent = `photon failed to initialize: ${message}`;
  appElement.append(banner);
}

if (typeof document !== "undefined") {
  try {
    const runtime = createPhotonRuntime();
    if (typeof window !== "undefined") {
      window.__ARCHITRINO_PHOTON_RUNTIME__ = runtime;
    }
    runtime.init();
  } catch (error) {
    reportPhotonBootstrapError(error, document, window);
  }
}
