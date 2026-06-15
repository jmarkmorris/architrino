const ELEMENT_NUCLEON_DATA = Object.freeze({
  H: { atomicNumber: 1, typicalMassNumber: 1 },
  He: { atomicNumber: 2, typicalMassNumber: 4 },
  Li: { atomicNumber: 3, typicalMassNumber: 7 },
  Be: { atomicNumber: 4, typicalMassNumber: 9 },
  B: { atomicNumber: 5, typicalMassNumber: 11 },
  C: { atomicNumber: 6, typicalMassNumber: 12 },
  N: { atomicNumber: 7, typicalMassNumber: 14 },
  O: { atomicNumber: 8, typicalMassNumber: 16 },
  F: { atomicNumber: 9, typicalMassNumber: 19 },
  Ne: { atomicNumber: 10, typicalMassNumber: 20 },
  Na: { atomicNumber: 11, typicalMassNumber: 23 },
  Mg: { atomicNumber: 12, typicalMassNumber: 24 },
  Al: { atomicNumber: 13, typicalMassNumber: 27 },
  Si: { atomicNumber: 14, typicalMassNumber: 28 },
  P: { atomicNumber: 15, typicalMassNumber: 31 },
  S: { atomicNumber: 16, typicalMassNumber: 32 },
  Cl: { atomicNumber: 17, typicalMassNumber: 35 },
  Ar: { atomicNumber: 18, typicalMassNumber: 40 },
  K: { atomicNumber: 19, typicalMassNumber: 39 },
  Ca: { atomicNumber: 20, typicalMassNumber: 40 },
  Sc: { atomicNumber: 21, typicalMassNumber: 45 },
  Ti: { atomicNumber: 22, typicalMassNumber: 48 },
  V: { atomicNumber: 23, typicalMassNumber: 51 },
  Cr: { atomicNumber: 24, typicalMassNumber: 52 },
  Mn: { atomicNumber: 25, typicalMassNumber: 55 },
  Fe: { atomicNumber: 26, typicalMassNumber: 56 },
  Co: { atomicNumber: 27, typicalMassNumber: 59 },
  Ni: { atomicNumber: 28, typicalMassNumber: 59 },
  Cu: { atomicNumber: 29, typicalMassNumber: 64 },
  Zn: { atomicNumber: 30, typicalMassNumber: 65 },
  Ga: { atomicNumber: 31, typicalMassNumber: 70 },
  Ge: { atomicNumber: 32, typicalMassNumber: 73 },
  As: { atomicNumber: 33, typicalMassNumber: 75 },
  Se: { atomicNumber: 34, typicalMassNumber: 79 },
  Br: { atomicNumber: 35, typicalMassNumber: 80 },
  Kr: { atomicNumber: 36, typicalMassNumber: 84 },
  Rb: { atomicNumber: 37, typicalMassNumber: 85 },
  Sr: { atomicNumber: 38, typicalMassNumber: 88 },
  Y: { atomicNumber: 39, typicalMassNumber: 89 },
  Zr: { atomicNumber: 40, typicalMassNumber: 91 },
  Nb: { atomicNumber: 41, typicalMassNumber: 93 },
  Mo: { atomicNumber: 42, typicalMassNumber: 96 },
  Tc: { atomicNumber: 43, typicalMassNumber: 98 },
  Ru: { atomicNumber: 44, typicalMassNumber: 101 },
  Rh: { atomicNumber: 45, typicalMassNumber: 103 },
  Pd: { atomicNumber: 46, typicalMassNumber: 106 },
  Ag: { atomicNumber: 47, typicalMassNumber: 108 },
  Cd: { atomicNumber: 48, typicalMassNumber: 112 },
  In: { atomicNumber: 49, typicalMassNumber: 115 },
  Sn: { atomicNumber: 50, typicalMassNumber: 119 },
  Sb: { atomicNumber: 51, typicalMassNumber: 122 },
  Te: { atomicNumber: 52, typicalMassNumber: 128 },
  I: { atomicNumber: 53, typicalMassNumber: 127 },
  Xe: { atomicNumber: 54, typicalMassNumber: 131 },
  Cs: { atomicNumber: 55, typicalMassNumber: 133 },
  Ba: { atomicNumber: 56, typicalMassNumber: 137 },
  La: { atomicNumber: 57, typicalMassNumber: 139 },
  Ce: { atomicNumber: 58, typicalMassNumber: 140 },
  Pr: { atomicNumber: 59, typicalMassNumber: 141 },
  Nd: { atomicNumber: 60, typicalMassNumber: 144 },
  Pm: { atomicNumber: 61, typicalMassNumber: 145 },
  Sm: { atomicNumber: 62, typicalMassNumber: 150 },
  Eu: { atomicNumber: 63, typicalMassNumber: 152 },
  Gd: { atomicNumber: 64, typicalMassNumber: 157 },
  Tb: { atomicNumber: 65, typicalMassNumber: 159 },
  Dy: { atomicNumber: 66, typicalMassNumber: 163 },
  Ho: { atomicNumber: 67, typicalMassNumber: 165 },
  Er: { atomicNumber: 68, typicalMassNumber: 167 },
  Tm: { atomicNumber: 69, typicalMassNumber: 169 },
  Yb: { atomicNumber: 70, typicalMassNumber: 173 },
  Lu: { atomicNumber: 71, typicalMassNumber: 175 },
  Hf: { atomicNumber: 72, typicalMassNumber: 178 },
  Ta: { atomicNumber: 73, typicalMassNumber: 181 },
  W: { atomicNumber: 74, typicalMassNumber: 184 },
  Re: { atomicNumber: 75, typicalMassNumber: 186 },
  Os: { atomicNumber: 76, typicalMassNumber: 190 },
  Ir: { atomicNumber: 77, typicalMassNumber: 192 },
  Pt: { atomicNumber: 78, typicalMassNumber: 195 },
  Au: { atomicNumber: 79, typicalMassNumber: 197 },
  Hg: { atomicNumber: 80, typicalMassNumber: 201 },
  Tl: { atomicNumber: 81, typicalMassNumber: 204 },
  Pb: { atomicNumber: 82, typicalMassNumber: 207 },
  Bi: { atomicNumber: 83, typicalMassNumber: 209 },
  Po: { atomicNumber: 84, typicalMassNumber: 209 },
  At: { atomicNumber: 85, typicalMassNumber: 210 },
  Rn: { atomicNumber: 86, typicalMassNumber: 222 },
  Fr: { atomicNumber: 87, typicalMassNumber: 223 },
  Ra: { atomicNumber: 88, typicalMassNumber: 226 },
  Ac: { atomicNumber: 89, typicalMassNumber: 227 },
  Th: { atomicNumber: 90, typicalMassNumber: 232 },
  Pa: { atomicNumber: 91, typicalMassNumber: 231 },
  U: { atomicNumber: 92, typicalMassNumber: 238 },
  Np: { atomicNumber: 93, typicalMassNumber: 237 },
  Pu: { atomicNumber: 94, typicalMassNumber: 244 },
  Am: { atomicNumber: 95, typicalMassNumber: 243 },
  Cm: { atomicNumber: 96, typicalMassNumber: 247 },
  Bk: { atomicNumber: 97, typicalMassNumber: 247 },
  Cf: { atomicNumber: 98, typicalMassNumber: 251 },
  Es: { atomicNumber: 99, typicalMassNumber: 252 },
  Fm: { atomicNumber: 100, typicalMassNumber: 257 },
  Md: { atomicNumber: 101, typicalMassNumber: 258 },
  No: { atomicNumber: 102, typicalMassNumber: 259 },
  Lr: { atomicNumber: 103, typicalMassNumber: 266 },
  Rf: { atomicNumber: 104, typicalMassNumber: 267 },
  Db: { atomicNumber: 105, typicalMassNumber: 268 },
  Sg: { atomicNumber: 106, typicalMassNumber: 269 },
  Bh: { atomicNumber: 107, typicalMassNumber: 270 },
  Hs: { atomicNumber: 108, typicalMassNumber: 269 },
  Mt: { atomicNumber: 109, typicalMassNumber: 278 },
  Ds: { atomicNumber: 110, typicalMassNumber: 281 },
  Rg: { atomicNumber: 111, typicalMassNumber: 282 },
  Cn: { atomicNumber: 112, typicalMassNumber: 285 },
  Nh: { atomicNumber: 113, typicalMassNumber: 286 },
  Fl: { atomicNumber: 114, typicalMassNumber: 289 },
  Mc: { atomicNumber: 115, typicalMassNumber: 289 },
  Lv: { atomicNumber: 116, typicalMassNumber: 293 },
  Ts: { atomicNumber: 117, typicalMassNumber: 294 },
  Og: { atomicNumber: 118, typicalMassNumber: 294 },
  Uue: { atomicNumber: 119, typicalMassNumber: 315 },
});

export const SUPPORTED_MOLECULE_LEDGER_ELEMENTS = Object.freeze(Object.keys(ELEMENT_NUCLEON_DATA));

const PARTICLE_LEDGER = Object.freeze({
  proton: { electrinos: 15, positrinos: 21, architrinos: 36 },
  neutron: { positrinos: 18, electrinos: 18, architrinos: 36 },
  electron: { electrinos: 9, positrinos: 3, architrinos: 12 },
});

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

function normalizeElementSymbol(value) {
  const raw = String(value ?? "").trim();
  if (!raw) {
    return "";
  }
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

function createEmptyLedger() {
  return {
    protons: 0,
    neutrons: 0,
    electrons: 0,
    positrinos: 0,
    electrinos: 0,
    architrinos: 0,
    missingElements: [],
  };
}

function addParticleLedger(target, particleName, count) {
  const particleLedger = PARTICLE_LEDGER[particleName];
  if (!particleLedger || count <= 0) {
    return;
  }
  target.positrinos += particleLedger.positrinos * count;
  target.electrinos += particleLedger.electrinos * count;
  target.architrinos += particleLedger.architrinos * count;
}

function addElementLedger(target, symbol, missingElements) {
  const normalizedSymbol = normalizeElementSymbol(symbol);
  const elementData = ELEMENT_NUCLEON_DATA[normalizedSymbol];
  if (!elementData) {
    if (normalizedSymbol) {
      missingElements.add(normalizedSymbol);
    }
    return;
  }

  const protons = elementData.atomicNumber;
  const neutrons = Math.max(0, elementData.typicalMassNumber - elementData.atomicNumber);
  const electrons = elementData.atomicNumber;

  target.protons += protons;
  target.neutrons += neutrons;
  target.electrons += electrons;
  addParticleLedger(target, "proton", protons);
  addParticleLedger(target, "neutron", neutrons);
  addParticleLedger(target, "electron", electrons);
}

export function calculateAtomLedger(atom) {
  const ledger = createEmptyLedger();
  const missingElements = new Set();

  addElementLedger(ledger, atom?.element, missingElements);
  ledger.missingElements = Array.from(missingElements).sort();
  return ledger;
}

export function calculateMoleculeLedger(preset) {
  const ledger = createEmptyLedger();
  const missingElements = new Set();
  const atoms = Array.isArray(preset?.atoms) ? preset.atoms : [];

  atoms.forEach((atom) => {
    addElementLedger(ledger, atom?.element, missingElements);
  });

  ledger.missingElements = Array.from(missingElements).sort();
  return ledger;
}

export function formatLedgerNumber(value) {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) {
    return "-";
  }
  return NUMBER_FORMATTER.format(numberValue);
}
