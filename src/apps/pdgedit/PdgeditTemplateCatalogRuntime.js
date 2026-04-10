import { normalizePdgeditDocument } from "./PdgeditDocumentRuntime.js";

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function getAssemblyDisplayTitle(title = "") {
  return normalizeText(title).replace(/\s+Row\s+\d+$/u, "").trim();
}

function buildOperatorTemplate(id, title) {
  return {
    id,
    type: id,
    title,
    displayTitle: title,
  };
}

export function normalizePdgeditTemplateCatalog(sourceDocument = {}) {
  const document = normalizePdgeditDocument(sourceDocument);
  const assemblyTemplateByType = new Map();

  document.assemblies.forEach((assembly) => {
    if (!assembly.type || assembly.type.endsWith("-composite") || assemblyTemplateByType.has(assembly.type)) {
      return;
    }
    assemblyTemplateByType.set(assembly.type, {
      id: assembly.type,
      type: assembly.type,
      title: getAssemblyDisplayTitle(assembly.title) || assembly.type,
      displayTitle: getAssemblyDisplayTitle(assembly.title) || assembly.type,
      tiles: [...assembly.tiles],
    });
  });

  const assemblyTemplates = [...assemblyTemplateByType.values()];
  const operatorTemplates = [
    buildOperatorTemplate("associate", "Associate"),
    buildOperatorTemplate("dissociate", "Dissociate"),
    buildOperatorTemplate("pass-thru", "Pass Thru"),
  ];

  return {
    assemblyTemplates,
    assemblyTemplateByType,
    operatorTemplates,
    operatorTemplateByType: new Map(operatorTemplates.map((template) => [template.type, template])),
  };
}

export async function loadPdgeditTemplateCatalog({
  fetchImpl = globalThis.fetch?.bind(globalThis),
  specUrl,
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new Error("pdgedit template catalog loading requires fetch().");
  }
  const response = await fetchImpl(specUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load pdgedit template catalog: ${response.status} ${response.statusText}`);
  }
  return normalizePdgeditTemplateCatalog(await response.json());
}
