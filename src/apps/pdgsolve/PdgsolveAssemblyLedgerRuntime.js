const ASSEMBLY_LEDGER_BY_ID = Object.freeze({
  anti_noether_core: {
    title: "Anti Noether Core",
    reviewLabel: "Anti Noether Core",
    recipeId: "pdgsolve.pdgedit.anti_noether_core.v1",
    allowedLanes: Object.freeze([1]),
    counts: Object.freeze({ electrinoCount: 3, positrinoCount: 3 }),
  },
  electron: {
    title: "Electron",
    reviewLabel: "Electron",
    recipeId: "pdgsolve.pdgedit.electron.v1",
    allowedLanes: Object.freeze([1, 3, 5]),
    counts: Object.freeze({ electrinoCount: 9, positrinoCount: 3 }),
  },
  electron_antineutrino: {
    title: "Electron Antineutrino",
    reviewLabel: "Electron Antineutrino",
    recipeId: "pdgsolve.pdgedit.electron_antineutrino.v1",
    allowedLanes: Object.freeze([1, 3, 5]),
    counts: Object.freeze({ electrinoCount: 6, positrinoCount: 6 }),
  },
  pro_down_quark: {
    title: "Pro Down Quark",
    reviewLabel: "Pro Down Quark",
    recipeId: "pdgsolve.pdgedit.pro_down_quark.v1",
    allowedLanes: Object.freeze([1, 3, 5]),
    counts: Object.freeze({ electrinoCount: 7, positrinoCount: 5 }),
  },
  pro_noether_core: {
    title: "Pro Noether Core",
    reviewLabel: "Pro Noether Core",
    recipeId: "pdgsolve.pdgedit.pro_noether_core.v1",
    allowedLanes: Object.freeze([1]),
    counts: Object.freeze({ electrinoCount: 3, positrinoCount: 3 }),
  },
  pro_up_quark: {
    title: "Pro Up Quark",
    reviewLabel: "Pro Up Quark",
    recipeId: "pdgsolve.pdgedit.pro_up_quark.v1",
    allowedLanes: Object.freeze([1, 3, 5]),
    counts: Object.freeze({ electrinoCount: 4, positrinoCount: 8 }),
  },
  unbound_architrino_residue_e4_p8: {
    title: "Unbound Architrino Residue 4E/8P",
    reviewLabel: "Residue 4E/8P",
    recipeId: "pdgsolve.pdgedit.unbound_architrino_residue_e4_p8.v1",
    allowedLanes: Object.freeze([3]),
    counts: Object.freeze({ electrinoCount: 4, positrinoCount: 8 }),
  },
  unbound_architrino_residue_e6_p6: {
    title: "Unbound Architrino Residue 6E/6P",
    reviewLabel: "Residue 6E/6P",
    recipeId: "pdgsolve.pdgedit.unbound_architrino_residue_e6_p6.v1",
    allowedLanes: Object.freeze([3]),
    counts: Object.freeze({ electrinoCount: 6, positrinoCount: 6 }),
  },
  unbound_architrino_residue_e9_p3: {
    title: "Unbound Architrino Residue 9E/3P",
    reviewLabel: "Residue 9E/3P",
    recipeId: "pdgsolve.pdgedit.unbound_architrino_residue_e9_p3.v1",
    allowedLanes: Object.freeze([3]),
    counts: Object.freeze({ electrinoCount: 9, positrinoCount: 3 }),
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

export function getPdgsolveAssemblyAllowedLanes(assemblyId = "") {
  return [...(getPdgsolveAssemblyLedger(assemblyId)?.allowedLanes ?? [])];
}

export function isPdgsolveAssemblyAllowedInLane(assemblyId = "", lane = 0) {
  return getPdgsolveAssemblyAllowedLanes(assemblyId).includes(Number(lane));
}

export function getPdgsolveAssemblyLedgerCounts(assemblyId = "") {
  return cloneCounts(getPdgsolveAssemblyLedger(assemblyId)?.counts);
}
