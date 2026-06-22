import { mountAssemblyConfigurationExplorer } from "./AssemblyConfigurationExplorerRuntime.js";

function reportAssemblyExplorerBootstrapError(error, documentLike = globalThis.document, windowLike = globalThis.window) {
  const message = error instanceof Error ? error.message : String(error);
  if (windowLike) {
    windowLike.__ARCHITRINO_ASSEMBLY_EXPLORER_BOOT_ERROR__ = message;
  }
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(error);
  }
  const appElement = documentLike?.getElementById?.("assembly-explorer-app");
  if (!appElement) {
    return;
  }
  const banner = documentLike.createElement("div");
  banner.id = "assembly-explorer-boot-error";
  banner.textContent = `assembly explorer failed to initialize: ${message}`;
  appElement.append(banner);
}

if (typeof document !== "undefined") {
  try {
    const runtime = mountAssemblyConfigurationExplorer();
    if (typeof window !== "undefined") {
      window.__ARCHITRINO_ASSEMBLY_EXPLORER_RUNTIME__ = runtime;
    }
  } catch (error) {
    reportAssemblyExplorerBootstrapError(error, document, window);
  }
}
