import { mountEquationMappingApp } from "./EquationMappingRuntime.js";

function reportEquationMappingBootstrapError(error, documentLike = globalThis.document, windowLike = globalThis.window) {
  const message = error instanceof Error ? error.message : String(error);
  if (windowLike) {
    windowLike.__ARCHITRINO_EQUATION_MAPPING_BOOT_ERROR__ = message;
  }
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(error);
  }
  const appElement = documentLike?.getElementById?.("equation-mapping-app");
  if (!appElement) {
    return;
  }
  const banner = documentLike.createElement("div");
  banner.id = "equation-mapping-boot-error";
  banner.textContent = `equation mapping failed to initialize: ${message}`;
  appElement.append(banner);
}

if (typeof document !== "undefined") {
  try {
    const runtime = mountEquationMappingApp();
    if (typeof window !== "undefined") {
      window.__ARCHITRINO_EQUATION_MAPPING_RUNTIME__ = runtime;
    }
  } catch (error) {
    reportEquationMappingBootstrapError(error, document, window);
  }
}
