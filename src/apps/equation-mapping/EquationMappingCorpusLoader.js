export const EQUATION_MAPPING_CORPUS_REGISTRY_SCHEMA = "equation-mapping-corpus-registry.v1";
export const EQUATION_MAPPING_CORPUS_REGISTRY_HREF = "content/generated/equation-mapping/corpus-equations.json";

function validateCorpusRecord(record, index) {
  if (!record || typeof record !== "object") {
    throw new Error(`Equation Mapping corpus record ${index + 1} is not an object.`);
  }
  if (!record.semanticId || !record.formulaTeX) {
    throw new Error(`Equation Mapping corpus record ${index + 1} lacks a semantic ID or formula.`);
  }
  if (!record.source?.sourcePath || !record.source?.sourceHeading) {
    throw new Error(`Equation Mapping corpus record "${record.semanticId}" lacks source context.`);
  }
  if (!Array.isArray(record.symbols)) {
    throw new Error(`Equation Mapping corpus record "${record.semanticId}" lacks symbol definitions.`);
  }
  record.symbols.forEach((symbol, symbolIndex) => {
    if (!symbol?.tex || !symbol?.definition) {
      throw new Error(
        `Equation Mapping corpus record "${record.semanticId}" has an incomplete symbol ${symbolIndex + 1}.`
      );
    }
  });
}

export function normalizeEquationMappingCorpusPayload(payload = {}) {
  if (payload.schema !== EQUATION_MAPPING_CORPUS_REGISTRY_SCHEMA) {
    throw new Error(`Unsupported Equation Mapping corpus registry schema "${payload.schema ?? "missing"}".`);
  }
  if (!Array.isArray(payload.records) || payload.records.length !== payload.equationCount) {
    throw new Error("Equation Mapping corpus registry count does not match its records.");
  }
  payload.records.forEach(validateCorpusRecord);
  return payload;
}

export async function loadEquationMappingCorpusRecords(
  fetchLike = globalThis.fetch,
  registryHref = EQUATION_MAPPING_CORPUS_REGISTRY_HREF
) {
  if (typeof fetchLike !== "function") {
    throw new Error("Equation Mapping requires fetch access to its generated corpus registry.");
  }
  const response = await fetchLike(registryHref);
  if (!response?.ok) {
    throw new Error(`Equation Mapping corpus registry request failed with status ${response?.status ?? "unknown"}.`);
  }
  return normalizeEquationMappingCorpusPayload(await response.json()).records;
}
