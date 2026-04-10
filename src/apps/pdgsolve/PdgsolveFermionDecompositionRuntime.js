const FERMION_DECOMPOSITION_LAW_TABLE_ID = "pdgsolve-laws/fermion-decomposition.v1";

const BETA_ACTIVE_DISSOCIATE_LAW = Object.freeze({
  id:
    "row.fermion_decomposition.pro_down_quark_to_unbound_architrino_residue_e4_p8_plus_unbound_architrino_residue_e9_p3_plus_unbound_architrino_residue_e6_p6.v1",
  kind: "dissociate",
  inputAssemblyId: "pro_down_quark",
  requiredSupportRows: Object.freeze([
    { rowAssemblyId: "pro_noether_core", count: 2 },
    { rowAssemblyId: "anti_noether_core", count: 2 },
  ]),
  outputAssemblyIds: Object.freeze([
    "unbound_architrino_residue_e4_p8",
    "unbound_architrino_residue_e9_p3",
    "unbound_architrino_residue_e6_p6",
  ]),
});

const BETA_ASSOCIATE_LAWS = Object.freeze([
  Object.freeze({
    id: "row.fermion_decomposition.unbound_architrino_residue_e4_p8_to_pro_up_quark.v1",
    kind: "associate",
    inputAssemblyIds: Object.freeze(["unbound_architrino_residue_e4_p8"]),
    outputAssemblyId: "pro_up_quark",
  }),
  Object.freeze({
    id: "row.fermion_decomposition.unbound_architrino_residue_e9_p3_to_electron.v1",
    kind: "associate",
    inputAssemblyIds: Object.freeze(["unbound_architrino_residue_e9_p3"]),
    outputAssemblyId: "electron",
  }),
  Object.freeze({
    id: "row.fermion_decomposition.unbound_architrino_residue_e6_p6_to_electron_antineutrino.v1",
    kind: "associate",
    inputAssemblyIds: Object.freeze(["unbound_architrino_residue_e6_p6"]),
    outputAssemblyId: "electron_antineutrino",
  }),
]);

const RESIDUE_ROW_BY_ID = Object.freeze({
  unbound_architrino_residue_e4_p8: Object.freeze({
    assemblyId: "unbound_architrino_residue_e4_p8",
    reviewLabel: "Residue 4E/8P",
    displayLabel: "Unbound Architrino Residue 4E/8P",
    electrinoCount: 4,
    positrinoCount: 8,
    allowedLanes: Object.freeze([3]),
    publicationRecipeId: "pdgsolve.pdgedit.unbound_architrino_residue_e4_p8.v1",
    associatesToAssemblyId: "pro_up_quark",
    associateLawId: "row.fermion_decomposition.unbound_architrino_residue_e4_p8_to_pro_up_quark.v1",
  }),
  unbound_architrino_residue_e6_p6: Object.freeze({
    assemblyId: "unbound_architrino_residue_e6_p6",
    reviewLabel: "Residue 6E/6P",
    displayLabel: "Unbound Architrino Residue 6E/6P",
    electrinoCount: 6,
    positrinoCount: 6,
    allowedLanes: Object.freeze([3]),
    publicationRecipeId: "pdgsolve.pdgedit.unbound_architrino_residue_e6_p6.v1",
    associatesToAssemblyId: "electron_antineutrino",
    associateLawId: "row.fermion_decomposition.unbound_architrino_residue_e6_p6_to_electron_antineutrino.v1",
  }),
  unbound_architrino_residue_e9_p3: Object.freeze({
    assemblyId: "unbound_architrino_residue_e9_p3",
    reviewLabel: "Residue 9E/3P",
    displayLabel: "Unbound Architrino Residue 9E/3P",
    electrinoCount: 9,
    positrinoCount: 3,
    allowedLanes: Object.freeze([3]),
    publicationRecipeId: "pdgsolve.pdgedit.unbound_architrino_residue_e9_p3.v1",
    associatesToAssemblyId: "electron",
    associateLawId: "row.fermion_decomposition.unbound_architrino_residue_e9_p3_to_electron.v1",
  }),
});

const RESIDUE_ROWS = Object.freeze(Object.values(RESIDUE_ROW_BY_ID));

const DECOMPOSITION_LAWS = Object.freeze([BETA_ACTIVE_DISSOCIATE_LAW, ...BETA_ASSOCIATE_LAWS]);
const DECOMPOSITION_LAW_BY_ID = new Map(DECOMPOSITION_LAWS.map((law) => [law.id, law]));

function normalizeText(value = "") {
  return typeof value === "string" ? value.trim() : "";
}

export {
  FERMION_DECOMPOSITION_LAW_TABLE_ID,
  BETA_ACTIVE_DISSOCIATE_LAW,
  BETA_ASSOCIATE_LAWS,
  RESIDUE_ROWS,
};

export function getPdgsolveFermionDecompositionResidueRows() {
  return RESIDUE_ROWS.map((row) => ({ ...row, allowedLanes: [...row.allowedLanes] }));
}

export function getPdgsolveFermionResidueRow(assemblyId = "") {
  const residue = RESIDUE_ROW_BY_ID[normalizeText(assemblyId)];
  return residue ? { ...residue, allowedLanes: [...residue.allowedLanes] } : null;
}

export function isPdgsolveFermionResidueRow(assemblyId = "") {
  return RESIDUE_ROW_BY_ID[normalizeText(assemblyId)] !== undefined;
}

export function getPdgsolveFermionDecompositionLaw(lawId = "") {
  const law = DECOMPOSITION_LAW_BY_ID.get(normalizeText(lawId));
  if (!law) {
    return null;
  }
  return {
    ...law,
    requiredSupportRows: Array.isArray(law.requiredSupportRows) ? law.requiredSupportRows.map((row) => ({ ...row })) : [],
    outputAssemblyIds: Array.isArray(law.outputAssemblyIds) ? [...law.outputAssemblyIds] : [],
    inputAssemblyIds: Array.isArray(law.inputAssemblyIds) ? [...law.inputAssemblyIds] : [],
  };
}

export function getPdgsolveFermionDecompositionLawTable() {
  return {
    id: FERMION_DECOMPOSITION_LAW_TABLE_ID,
    residues: getPdgsolveFermionDecompositionResidueRows(),
    laws: DECOMPOSITION_LAWS.map((law) => getPdgsolveFermionDecompositionLaw(law.id)),
  };
}
