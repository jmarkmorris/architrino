import { createMoleculeRuntime } from "./MoleculeRuntime.js";

function reportMoleculeBootstrapError(error, documentLike = globalThis.document, windowLike = globalThis.window) {
  const message = error instanceof Error ? error.message : String(error);
  if (windowLike) {
    windowLike.__ARCHITRINO_MOLECULE_BOOT_ERROR__ = message;
  }
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(error);
  }
  const appElement = documentLike?.getElementById?.("molecule-app");
  if (!appElement) {
    return;
  }
  const banner = documentLike.createElement("div");
  banner.id = "molecule-boot-error";
  banner.textContent = `molecule failed to initialize: ${message}`;
  appElement.append(banner);
}

if (typeof document !== "undefined") {
  try {
    const runtime = createMoleculeRuntime();
    if (typeof window !== "undefined") {
      window.__ARCHITRINO_MOLECULE_RUNTIME__ = runtime;
    }
    runtime.init();
  } catch (error) {
    reportMoleculeBootstrapError(error, document, window);
  }
}
