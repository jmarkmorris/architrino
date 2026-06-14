const ELEMENT_NUCLEON_DATA = Object.freeze({
  H: { atomicNumber: 1, typicalMassNumber: 1 },
  C: { atomicNumber: 6, typicalMassNumber: 12 },
  N: { atomicNumber: 7, typicalMassNumber: 14 },
  O: { atomicNumber: 8, typicalMassNumber: 16 },
  Na: { atomicNumber: 11, typicalMassNumber: 23 },
  P: { atomicNumber: 15, typicalMassNumber: 31 },
  Cl: { atomicNumber: 17, typicalMassNumber: 35 },
});

const PARTICLE_LEDGER = Object.freeze({
  proton: { electrinos: 21, positrinos: 15, architrinos: 36 },
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

export function calculateMoleculeLedger(preset) {
  const ledger = createEmptyLedger();
  const missingElements = new Set();
  const atoms = Array.isArray(preset?.atoms) ? preset.atoms : [];

  atoms.forEach((atom) => {
    const symbol = normalizeElementSymbol(atom?.element);
    const elementData = ELEMENT_NUCLEON_DATA[symbol];
    if (!elementData) {
      if (symbol) {
        missingElements.add(symbol);
      }
      return;
    }

    const protons = elementData.atomicNumber;
    const neutrons = Math.max(0, elementData.typicalMassNumber - elementData.atomicNumber);
    const electrons = elementData.atomicNumber;

    ledger.protons += protons;
    ledger.neutrons += neutrons;
    ledger.electrons += electrons;
    addParticleLedger(ledger, "proton", protons);
    addParticleLedger(ledger, "neutron", neutrons);
    addParticleLedger(ledger, "electron", electrons);
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
