export const PDGSOLVE_STAGE_IDS = Object.freeze({
  REACTANT_ASSEMBLIES: "reactantAssemblies",
  REACTANT_SIDE_OPERATORS: "reactantSideOperators",
  INTERMEDIATE_ASSEMBLIES: "intermediateAssemblies",
  PRODUCT_SIDE_OPERATORS: "productSideOperators",
  PRODUCT_ASSEMBLIES: "productAssemblies",
});

export const PDGSOLVE_ASSEMBLY_STAGE_IDS = Object.freeze([
  PDGSOLVE_STAGE_IDS.REACTANT_ASSEMBLIES,
  PDGSOLVE_STAGE_IDS.INTERMEDIATE_ASSEMBLIES,
  PDGSOLVE_STAGE_IDS.PRODUCT_ASSEMBLIES,
]);

export const PDGSOLVE_OPERATOR_STAGE_IDS = Object.freeze([
  PDGSOLVE_STAGE_IDS.REACTANT_SIDE_OPERATORS,
  PDGSOLVE_STAGE_IDS.PRODUCT_SIDE_OPERATORS,
]);

export function normalizePdgsolveStageId(stageId = "") {
  return String(stageId ?? "").trim();
}

export function isPdgsolveAssemblyStageId(stageId = "") {
  return PDGSOLVE_ASSEMBLY_STAGE_IDS.includes(normalizePdgsolveStageId(stageId));
}

export function isPdgsolveOperatorStageId(stageId = "") {
  return PDGSOLVE_OPERATOR_STAGE_IDS.includes(normalizePdgsolveStageId(stageId));
}
