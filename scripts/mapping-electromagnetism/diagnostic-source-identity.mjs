import { canonicalJson, sha256Canonical } from "../../src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs";

// Identity describes the declared diagnostic paths, not a catalog admission or
// a claim that those paths solve the evolution equation.
export function identifyDiagnosticSourceRecord(record) {
  const scientificModel = {
    schema: record.schema,
    engineId: record.engineId,
    normalizedFieldSpeed: 1,
    history: record.history,
    sources: record.sources,
  };
  const modelRevisionSha256 = sha256Canonical(scientificModel);
  return {
    ...record,
    assemblyId: `asm-${modelRevisionSha256.slice(0, 32)}`,
    modelRevisionSha256,
    scientificIdentityPreimage: canonicalJson(scientificModel),
  };
}
