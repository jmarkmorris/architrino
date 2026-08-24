import { mountEquationMappingApp } from "./EquationMappingRuntime.js";
import { createEquationMappingRegistryApi } from "./EquationMappingRegistry.js";
import { loadEquationMappingCorpusRecords } from "./EquationMappingCorpusLoader.js";

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

async function bootstrapEquationMapping(documentLike = globalThis.document, windowLike = globalThis.window) {
  try {
    const corpusRecords = await loadEquationMappingCorpusRecords(windowLike?.fetch?.bind(windowLike));
    const registryApi = createEquationMappingRegistryApi({ corpusRecords });
    if (windowLike) {
      Object.defineProperty(windowLike, "ArchitrinoEquationMapping", {
        configurable: false,
        enumerable: true,
        writable: false,
        value: registryApi,
      });
    }
    const runtime = mountEquationMappingApp({
      document: documentLike,
      window: windowLike,
      documents: registryApi.list().map((page) => page.document),
    });
    if (windowLike) {
      windowLike.__ARCHITRINO_EQUATION_MAPPING_RUNTIME__ = runtime;
    }
  } catch (error) {
    reportEquationMappingBootstrapError(error, documentLike, windowLike);
  }
}

if (typeof document !== "undefined") {
  bootstrapEquationMapping(document, window);
}
