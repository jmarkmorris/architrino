const ELECTRINO = "electrino";
const POSITRINO = "positrino";

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
}

function assertGrid(grid, label) {
  if (
    !Array.isArray(grid) ||
    grid.length !== 3 ||
    !grid.every(Number.isSafeInteger)
  ) {
    throw new TypeError(`${label} must be a three-integer lattice coordinate.`);
  }
}

function assertPolarity(polarity, label) {
  if (polarity !== ELECTRINO && polarity !== POSITRINO) {
    throw new TypeError(`${label} must be electrino or positrino.`);
  }
}

function canonicalOffsetKey(offset) {
  const firstNonzero = offset.find((value) => value !== 0);
  const canonical = firstNonzero > 0
    ? offset
    : offset.map((value) => -value);
  return canonical.join(",");
}

export const SIMPLE_CUBIC_STATIONARY_CONTRACT = deepFreeze({
  schema: "lattice-lab-stationary-case-contract/v1",
  id: "simple-cubic-checkerboard-stationary-release-v1",
  title: "Simple-cubic checkerboard stationary release",
  claimGrade: "derived",
  normalizedWakeSpeed: 1,
  geometry: {
    sites: "X_g(T) = d g for every g in Z^3",
    nearestNeighborSpacing: "d > 0",
    polarity:
      "positrino when g_x + g_y + g_z is even; electrino when it is odd",
  },
  retainedHistory: {
    state: "every site is stationary for all T <= T_r",
    velocity: "V_g(T) = 0",
    partnerRoot:
      "T_t = T_r - d ||n|| for transmitter offset n != 0",
    selfRoot:
      "no positive-delay stationary self root; the T_t = T_r endpoint is excluded",
    transmitterFactor: "D_t = 1",
    accelerationWeight: "W_acc = 1",
  },
  acceleration: {
    scale: "a_0 = kappa epsilon^2 / d^2",
    normalizedRow:
      "A_n / a_0 = -sigma(n) n / ||n||^3",
    polaritySign: "sigma(n) = (-1)^(n_x + n_y + n_z)",
  },
  calculationBoundary: {
    kind: "receiver-centered inversion-symmetric exhaustion",
    rule:
      "the increasing finite sets E_R are closed under n -> -n, exclude n = 0, and exhaust Z^3 without the origin",
    admittedExamples:
      "centered integer cubes and centered Euclidean lattice balls",
    displayCropRole:
      "the dotted sphere is visual only and is not the calculation boundary",
  },
  result: {
    acceleration:
      "exactly zero at every receiver for every finite admitted exhaustion and therefore for its declared exhaustion limit",
    proofKey:
      "sigma(-n) = sigma(n), so A_-n = -A_n for every partner row",
  },
  nonClaims: [
    "no absolute-convergence or order-independent infinite-sum claim",
    "no perturbative stability result",
    "no later-time evolution result",
    "no physical-medium or conservation result",
  ],
  independentCheck: {
    theorem:
      "reference/priorities/app-lattice-lab/simple-cubic-checkerboard-cancellation-certificate.md",
    highPrecisionOracle: "tests/test_lattice_lab_stationary_oracle.py",
    structuralVerifier:
      "scripts/verify-lattice-lab-simple-cubic-checkerboard.mjs",
  },
});

export function simpleCubicCheckerboardPolarityAtGrid(grid) {
  assertGrid(grid, "grid");
  const parity = grid.reduce((sum, value) => sum + value, 0);
  return Math.abs(parity % 2) === 0 ? POSITRINO : ELECTRINO;
}

export function createStationarySimpleCubicAccelerationRow({
  receiverGrid,
  transmitterGrid,
  receiverPolarity = simpleCubicCheckerboardPolarityAtGrid(receiverGrid),
  transmitterPolarity = simpleCubicCheckerboardPolarityAtGrid(transmitterGrid),
}) {
  assertGrid(receiverGrid, "receiverGrid");
  assertGrid(transmitterGrid, "transmitterGrid");
  assertPolarity(receiverPolarity, "receiverPolarity");
  assertPolarity(transmitterPolarity, "transmitterPolarity");
  const relativeOffset = transmitterGrid.map(
    (value, index) => value - receiverGrid[index],
  );
  const separationSquared = relativeOffset.reduce(
    (sum, value) => sum + value * value,
    0,
  );
  if (separationSquared === 0) {
    throw new RangeError("A stationary partner row requires distinct sites.");
  }
  const separationInD = Math.sqrt(separationSquared);
  const polaritySign = receiverPolarity === transmitterPolarity ? 1 : -1;
  const accelerationNumerator = relativeOffset.map(
    (value) => value === 0 ? 0 : -polaritySign * value,
  );
  const accelerationDenominator = separationSquared * separationInD;

  return deepFreeze({
    schema: "lattice-lab-stationary-acceleration-row/v1",
    receiverGrid: [...receiverGrid],
    receiverPolarity,
    transmitterGrid: [...transmitterGrid],
    transmitterPolarity,
    relativeOffset,
    separationSquared,
    separationInD,
    polaritySign,
    emissionDelayInD: separationInD,
    transmitterFactor: 1,
    accelerationWeight: 1,
    accelerationScale: "kappa epsilon^2 / d^2",
    accelerationNumerator,
    accelerationDenominatorForm: "||n||^3",
    normalizedAcceleration: accelerationNumerator.map(
      (value) => value / accelerationDenominator,
    ),
  });
}

export function createStationarySimpleCubicExhaustionLedger({
  receiverGrid = [0, 0, 0],
  cutoff = 2,
  shape = "cube",
} = {}) {
  assertGrid(receiverGrid, "receiverGrid");
  if (!Number.isSafeInteger(cutoff) || cutoff < 1) {
    throw new RangeError("cutoff must be a positive integer.");
  }
  if (shape !== "cube" && shape !== "sphere") {
    throw new RangeError("shape must be cube or sphere.");
  }

  const rows = [];
  for (let nx = -cutoff; nx <= cutoff; nx += 1) {
    for (let ny = -cutoff; ny <= cutoff; ny += 1) {
      for (let nz = -cutoff; nz <= cutoff; nz += 1) {
        const offset = [nx, ny, nz];
        const separationSquared = nx * nx + ny * ny + nz * nz;
        if (
          separationSquared === 0 ||
          (shape === "sphere" && separationSquared > cutoff * cutoff)
        ) {
          continue;
        }
        rows.push(createStationarySimpleCubicAccelerationRow({
          receiverGrid,
          transmitterGrid: receiverGrid.map(
            (value, index) => value + offset[index],
          ),
        }));
      }
    }
  }

  const rowsByOffset = new Map(
    rows.map((row) => [row.relativeOffset.join(","), row]),
  );
  const pairs = [];
  const pairedKeys = new Set();
  rows.forEach((row) => {
    const pairKey = canonicalOffsetKey(row.relativeOffset);
    if (pairedKeys.has(pairKey)) {
      return;
    }
    pairedKeys.add(pairKey);
    const oppositeOffset = row.relativeOffset.map((value) => -value);
    const opposite = rowsByOffset.get(oppositeOffset.join(",")) ?? null;
    const exactNumeratorResidual = opposite
      ? row.accelerationNumerator.map(
        (value, index) => value + opposite.accelerationNumerator[index],
      )
      : null;
    pairs.push(deepFreeze({
      pairKey,
      row,
      opposite,
      sameSeparation: Boolean(
        opposite &&
        row.separationSquared === opposite.separationSquared,
      ),
      samePolaritySign: Boolean(
        opposite &&
        row.polaritySign === opposite.polaritySign,
      ),
      exactNumeratorResidual,
      cancelsExactly: Boolean(
        opposite &&
        row.separationSquared === opposite.separationSquared &&
        row.polaritySign === opposite.polaritySign &&
        exactNumeratorResidual.every((value) => value === 0),
      ),
    }));
  });

  return deepFreeze({
    schema: "lattice-lab-stationary-exhaustion-ledger/v1",
    contractId: SIMPLE_CUBIC_STATIONARY_CONTRACT.id,
    receiverGrid: [...receiverGrid],
    receiverPolarity: simpleCubicCheckerboardPolarityAtGrid(receiverGrid),
    cutoff,
    shape,
    rowCount: rows.length,
    pairCount: pairs.length,
    rows,
    pairs,
    allRowsPaired: pairs.length * 2 === rows.length,
    exactZero: pairs.length * 2 === rows.length &&
      pairs.every((pair) => pair.cancelsExactly),
  });
}
