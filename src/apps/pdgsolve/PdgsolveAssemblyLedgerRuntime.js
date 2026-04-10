const ASSEMBLY_LEDGER_BY_ID = Object.freeze({
  anti_noether_core: {
    title: "Anti Noether Core",
    recipeId: "pdgsolve.pdgedit.anti_noether_core.v1",
    counts: Object.freeze({ electrinoCount: 3, positrinoCount: 3 }),
  },
  electron: {
    title: "Electron",
    recipeId: "pdgsolve.pdgedit.electron.v1",
    counts: Object.freeze({ electrinoCount: 9, positrinoCount: 3 }),
  },
  electron_antineutrino: {
    title: "Electron Antineutrino",
    recipeId: "pdgsolve.pdgedit.electron_antineutrino.v1",
    counts: Object.freeze({ electrinoCount: 6, positrinoCount: 6 }),
  },
  pro_down_quark: {
    title: "Pro Down Quark",
    recipeId: "pdgsolve.pdgedit.pro_down_quark.v1",
    counts: Object.freeze({ electrinoCount: 7, positrinoCount: 5 }),
  },
  pro_noether_core: {
    title: "Pro Noether Core",
    recipeId: "pdgsolve.pdgedit.pro_noether_core.v1",
    counts: Object.freeze({ electrinoCount: 3, positrinoCount: 3 }),
  },
  pro_up_quark: {
    title: "Pro Up Quark",
    recipeId: "pdgsolve.pdgedit.pro_up_quark.v1",
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

export function getPdgsolveAssemblyLedgerCounts(assemblyId = "") {
  return cloneCounts(getPdgsolveAssemblyLedger(assemblyId)?.counts);
}
