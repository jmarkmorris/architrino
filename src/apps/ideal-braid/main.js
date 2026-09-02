import { mountIdealBraid } from "./IdealBraidRuntime.js";

export function reportIdealBraidBootstrapError(
  error,
  documentLike = globalThis.document,
  windowLike = globalThis.window
) {
  const message = error instanceof Error ? error.message : String(error);
  if (windowLike) {
    windowLike.__ARCHITRINO_IDEAL_BRAID_BOOT_ERROR__ = message;
  }
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(error);
  }
  const appElement = documentLike?.getElementById?.("ideal-braid-app");
  if (!appElement || typeof documentLike?.createElement !== "function") {
    return null;
  }
  const banner = documentLike.createElement("div");
  banner.id = "ideal-braid-boot-error";
  banner.className = "ideal-braid-boot-error";
  banner.setAttribute?.("role", "alert");
  banner.textContent = `Coincident-Midpoint Three-Axis Circular Lorentz Geometry failed to initialize: ${message}`;
  appElement.prepend?.(banner);
  return banner;
}

export function bootstrapIdealBraid({
  documentLike = globalThis.document,
  windowLike = globalThis.window,
  mount = mountIdealBraid,
} = {}) {
  try {
    const runtime = mount({ documentLike, windowLike });
    if (windowLike) {
      windowLike.__IDEAL_BRAID__ = runtime;
    }
    return runtime;
  } catch (error) {
    reportIdealBraidBootstrapError(error, documentLike, windowLike);
    return null;
  }
}

if (typeof document !== "undefined") {
  bootstrapIdealBraid({ documentLike: document, windowLike: window });
}
