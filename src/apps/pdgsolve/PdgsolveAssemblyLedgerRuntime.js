import { PDGSOLVE_STAGE_IDS } from "./PdgsolveStageRuntime.js";

const ASSEMBLY_LEDGER_BY_ID = Object.freeze({
  electron: {
    title: "Electron",
    reviewLabel: "Electron",
    recipeId: "pdgsolve.pdgedit.electron.v1",
    allowedStages: Object.freeze([
      PDGSOLVE_STAGE_IDS.REACTANT_ASSEMBLIES,
      PDGSOLVE_STAGE_IDS.INTERMEDIATE_ASSEMBLIES,
      PDGSOLVE_STAGE_IDS.PRODUCT_ASSEMBLIES,
    ]),
    counts: Object.freeze({ electrinoCount: 9, positrinoCount: 3 }),
  },
  electron_antineutrino: {
    title: "Electron Antineutrino",
    reviewLabel: "Electron Antineutrino",
    recipeId: "pdgsolve.pdgedit.electron_antineutrino.v1",
    allowedStages: Object.freeze([
      PDGSOLVE_STAGE_IDS.REACTANT_ASSEMBLIES,
      PDGSOLVE_STAGE_IDS.INTERMEDIATE_ASSEMBLIES,
      PDGSOLVE_STAGE_IDS.PRODUCT_ASSEMBLIES,
    ]),
    counts: Object.freeze({ electrinoCount: 6, positrinoCount: 6 }),
  },
  pro_down_quark: {
    title: "Pro Down Quark",
    reviewLabel: "Pro Down Quark",
    recipeId: "pdgsolve.pdgedit.pro_down_quark.v1",
    allowedStages: Object.freeze([
      PDGSOLVE_STAGE_IDS.REACTANT_ASSEMBLIES,
      PDGSOLVE_STAGE_IDS.INTERMEDIATE_ASSEMBLIES,
      PDGSOLVE_STAGE_IDS.PRODUCT_ASSEMBLIES,
    ]),
    counts: Object.freeze({ electrinoCount: 7, positrinoCount: 5 }),
  },
  pro_up_quark: {
    title: "Pro Up Quark",
    reviewLabel: "Pro Up Quark",
    recipeId: "pdgsolve.pdgedit.pro_up_quark.v1",
    allowedStages: Object.freeze([
      PDGSOLVE_STAGE_IDS.REACTANT_ASSEMBLIES,
      PDGSOLVE_STAGE_IDS.INTERMEDIATE_ASSEMBLIES,
      PDGSOLVE_STAGE_IDS.PRODUCT_ASSEMBLIES,
    ]),
    counts: Object.freeze({ electrinoCount: 4, positrinoCount: 8 }),
  },
});

export const PDGSOLVE_ASSEMBLY_LEDGER_BY_ID = ASSEMBLY_LEDGER_BY_ID;

function normalizeText(value = "") {
  return typeof value === "string" ? value.trim() : "";
}

function cloneCounts(counts = {}) {
  return {
    electrinoCount: Math.max(0, Number.isInteger(counts.electrinoCount) ? counts.electrinoCount : 0),
    positrinoCount: Math.max(0, Number.isInteger(counts.positrinoCount) ? counts.positrinoCount : 0),
  };
}

export function getPdgsolveAssemblyLedger(assemblyId = "") {
  return ASSEMBLY_LEDGER_BY_ID[normalizeText(assemblyId)] ?? null;
}

export function isPdgsolveAssemblyLedgerId(assemblyId = "") {
  return getPdgsolveAssemblyLedger(assemblyId) !== null;
}

export function getPdgsolveAssemblyLedgerTitle(assemblyId = "") {
  return getPdgsolveAssemblyLedger(assemblyId)?.title ?? "";
}

export function getPdgsolveAssemblyLedgerRecipeId(assemblyId = "") {
  return getPdgsolveAssemblyLedger(assemblyId)?.recipeId ?? "";
}

export function getPdgsolveAssemblyLedgerReviewLabel(assemblyId = "") {
  return getPdgsolveAssemblyLedger(assemblyId)?.reviewLabel ?? "";
}

export function getPdgsolveAssemblyAllowedStages(assemblyId = "") {
  return [...(getPdgsolveAssemblyLedger(assemblyId)?.allowedStages ?? [])];
}

export function isPdgsolveAssemblyAllowedInStage(assemblyId = "", stageId = "") {
  return getPdgsolveAssemblyAllowedStages(assemblyId).includes(String(stageId ?? "").trim());
}

export function getPdgsolveAssemblyLedgerCounts(assemblyId = "") {
  return cloneCounts(getPdgsolveAssemblyLedger(assemblyId)?.counts);
}
