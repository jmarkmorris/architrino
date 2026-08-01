const EPSILON = 1e-9;
const ELECTRINO = "electrino";
const POSITRINO = "positrino";

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
}

const IDENTITY = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const INVERSION = [[-1, 0, 0], [0, -1, 0], [0, 0, -1]];
const DIAMOND_C2_GROUP = [
  IDENTITY,
  [[1, 0, 0], [0, -1, 0], [0, 0, -1]],
  [[-1, 0, 0], [0, 1, 0], [0, 0, -1]],
  [[-1, 0, 0], [0, -1, 0], [0, 0, 1]],
];
const COS_120 = -0.5;
const SIN_120 = Math.sqrt(3) / 2;
const HCP_ROTATION_120 = [
  [COS_120, -SIN_120, 0],
  [SIN_120, COS_120, 0],
  [0, 0, 1],
];
const HCP_ROTATION_240 = [
  [COS_120, SIN_120, 0],
  [-SIN_120, COS_120, 0],
  [0, 0, 1],
];
const HCP_Z_REFLECTION = [[1, 0, 0], [0, 1, 0], [0, 0, -1]];
const HCP_UNDEFORMED_GROUP = [
  IDENTITY,
  HCP_ROTATION_120,
  HCP_ROTATION_240,
  HCP_Z_REFLECTION,
  [
    [COS_120, -SIN_120, 0],
    [SIN_120, COS_120, 0],
    [0, 0, -1],
  ],
  [
    [COS_120, SIN_120, 0],
    [-SIN_120, COS_120, 0],
    [0, 0, -1],
  ],
];

function createCertificate({
  id,
  caseId,
  cancellationKind,
  symmetryGroup,
  deformationCoverage,
}) {
  return deepFreeze({
    schema: "lattice-lab-periodic-symmetry-certificate/v1",
    id,
    caseId,
    claimGrade: "derived",
    normalizedWakeSpeed: 1,
    calculationBoundary: {
      kind: "receiver-centered symmetry-orbit exhaustion",
      rule:
        "finite source sets are unions of complete receiver-centered decorated-lattice symmetry orbits and exhaust the full repeating pattern",
      displayCropRole:
        "the spherical envelope is a viewing crop only and supplies no calculation rows",
    },
    acceleration: {
      normalizedRow:
        "A/a_0 = -sigma D_beta r / ||D_beta r||^3",
      polaritySign: "sigma = 1 for matching polarity and -1 for opposite polarity",
    },
    cancellationKind,
    symmetryGroup,
    deformationCoverage,
    result:
      "exact zero net stationary acceleration at every represented receiver orbit whenever the certificate is active",
    nonClaims: [
      "no order-independent infinite-sum claim",
      "no motion or later-time evolution result",
      "no stability, energy, or conservation result",
    ],
    independentVerifier:
      "scripts/verify-lattice-lab-periodic-gallery.mjs",
  });
}

export const LATTICE_LAB_PERIODIC_CERTIFICATES = deepFreeze({
  "bcc-two-sublattice-v1": createCertificate({
    id: "bcc-two-sublattice-stationary-symmetry-v1",
    caseId: "bcc-two-sublattice-v1",
    cancellationKind: "receiver-centered inversion pairs",
    symmetryGroup: [IDENTITY, INVERSION],
    deformationCoverage: "all supported static X-axis deformation factors",
  }),
  "fcc-alternating-planes-v1": createCertificate({
    id: "fcc-alternating-planes-stationary-symmetry-v1",
    caseId: "fcc-alternating-planes-v1",
    cancellationKind: "receiver-centered inversion pairs",
    symmetryGroup: [IDENTITY, INVERSION],
    deformationCoverage: "all supported static X-axis deformation factors",
  }),
  "hcp-abab-layers-v1": createCertificate({
    id: "hcp-abab-stationary-undeformed-symmetry-v1",
    caseId: "hcp-abab-layers-v1",
    cancellationKind:
      "threefold in-plane rotation orbits paired across the basal plane",
    symmetryGroup: HCP_UNDEFORMED_GROUP,
    deformationCoverage: "undeformed baseline only",
  }),
  "simple-cubic-alternating-planes-v1": createCertificate({
    id: "simple-cubic-alternating-planes-stationary-symmetry-v1",
    caseId: "simple-cubic-alternating-planes-v1",
    cancellationKind: "receiver-centered inversion pairs",
    symmetryGroup: [IDENTITY, INVERSION],
    deformationCoverage: "all supported static X-axis deformation factors",
  }),
  "diamond-cubic-two-sublattice-v1": createCertificate({
    id: "diamond-cubic-two-sublattice-stationary-symmetry-v1",
    caseId: "diamond-cubic-two-sublattice-v1",
    cancellationKind: "receiver-centered orthogonal twofold-rotation orbits",
    symmetryGroup: DIAMOND_C2_GROUP,
    deformationCoverage: "all supported static X-axis deformation factors",
  }),
});

function assertPolarity(value, label) {
  if (value !== ELECTRINO && value !== POSITRINO) {
    throw new TypeError(`${label} must be electrino or positrino.`);
  }
}

function assertPosition(value, label) {
  if (
    !Array.isArray(value) || value.length !== 3 ||
    !value.every(Number.isFinite)
  ) {
    throw new TypeError(`${label} must be a finite three-vector.`);
  }
}

function normalizeDeformation(axis = "x", factor = 1) {
  if (axis !== "x") {
    throw new RangeError("Periodic gallery certificates use semantic X deformation.");
  }
  if (!Number.isFinite(factor) || factor <= 0 || factor > 1) {
    throw new RangeError("deformationFactor must satisfy 0 < factor <= 1.");
  }
  return Object.freeze({ axis, axisIndex: 0, factor });
}

export function createStationaryPeriodicAccelerationRow({
  receiverPosition,
  transmitterPosition,
  receiverPolarity,
  transmitterPolarity,
  deformationAxis = "x",
  deformationFactor = 1,
}) {
  assertPosition(receiverPosition, "receiverPosition");
  assertPosition(transmitterPosition, "transmitterPosition");
  assertPolarity(receiverPolarity, "receiverPolarity");
  assertPolarity(transmitterPolarity, "transmitterPolarity");
  const deformation = normalizeDeformation(
    deformationAxis,
    deformationFactor,
  );
  const relativeOffset = transmitterPosition.map(
    (value, axis) => value - receiverPosition[axis],
  );
  const physicalOffsetInD = relativeOffset.map(
    (value, axis) => axis === deformation.axisIndex
      ? value * deformation.factor
      : value,
  );
  const separationSquared = physicalOffsetInD.reduce(
    (sum, value) => sum + value * value,
    0,
  );
  if (separationSquared < EPSILON * EPSILON) {
    throw new RangeError("A stationary partner row requires distinct sites.");
  }
  const separationInD = Math.sqrt(separationSquared);
  const polaritySign = receiverPolarity === transmitterPolarity ? 1 : -1;
  const accelerationNumerator = physicalOffsetInD.map(
    (value) => Math.abs(value) < EPSILON ? 0 : -polaritySign * value,
  );
  const accelerationDenominator = separationSquared * separationInD;
  return deepFreeze({
    schema: "lattice-lab-stationary-acceleration-row/v1",
    receiverPosition: [...receiverPosition],
    receiverPolarity,
    transmitterPosition: [...transmitterPosition],
    transmitterPolarity,
    relativeOffset,
    physicalOffsetInD,
    deformation,
    separationSquared,
    separationInD,
    polaritySign,
    emissionDelayInD: separationInD,
    transmitterFactor: 1,
    accelerationWeight: 1,
    accelerationScale: "kappa epsilon^2 / d^2",
    accelerationNumerator,
    accelerationDenominatorForm: "||D_beta r||^3",
    normalizedAcceleration: accelerationNumerator.map(
      (value) => value / accelerationDenominator,
    ),
  });
}

function multiplyMatrix(left, right) {
  return left.map((row) => right[0].map((_, column) => row.reduce(
    (sum, value, index) => sum + value * right[index][column],
    0,
  )));
}

function multiplyVector(matrix, vector) {
  return matrix.map((row) => row.reduce(
    (sum, value, index) => sum + value * vector[index],
    0,
  ));
}

function transpose(matrix) {
  return matrix[0].map((_, column) => matrix.map((row) => row[column]));
}

function determinant(matrix) {
  return matrix[0][0] * (
    matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]
  ) - matrix[0][1] * (
    matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]
  ) + matrix[0][2] * (
    matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]
  );
}

function inverse(matrix) {
  const value = determinant(matrix);
  if (Math.abs(value) < EPSILON) {
    throw new Error("Periodic translation vectors must span a volume.");
  }
  return [
    [
      (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) / value,
      (matrix[0][2] * matrix[2][1] - matrix[0][1] * matrix[2][2]) / value,
      (matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1]) / value,
    ],
    [
      (matrix[1][2] * matrix[2][0] - matrix[1][0] * matrix[2][2]) / value,
      (matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0]) / value,
      (matrix[0][2] * matrix[1][0] - matrix[0][0] * matrix[1][2]) / value,
    ],
    [
      (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]) / value,
      (matrix[0][1] * matrix[2][0] - matrix[0][0] * matrix[2][1]) / value,
      (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) / value,
    ],
  ];
}

function matrixClose(left, right) {
  return left.every((row, i) => row.every(
    (value, j) => Math.abs(value - right[i][j]) < EPSILON,
  ));
}

function vectorClose(left, right) {
  return left.every(
    (value, index) => Math.abs(value - right[index]) < EPSILON,
  );
}

function translationMatrix(vectors) {
  return vectors[0].map((_, axis) => vectors.map((vector) => vector[axis]));
}

function matrixRank(rows) {
  const reduced = rows.map((row) => [...row]);
  let rank = 0;
  for (let column = 0; column < 3; column += 1) {
    const pivot = reduced.findIndex(
      (row, index) => index >= rank && Math.abs(row[column]) > EPSILON,
    );
    if (pivot < 0) {
      continue;
    }
    [reduced[rank], reduced[pivot]] = [reduced[pivot], reduced[rank]];
    const divisor = reduced[rank][column];
    reduced[rank] = reduced[rank].map((value) => value / divisor);
    reduced.forEach((row, index) => {
      if (index === rank) {
        return;
      }
      const factor = row[column];
      reduced[index] = row.map(
        (value, axis) => value - factor * reduced[rank][axis],
      );
    });
    rank += 1;
  }
  return rank;
}

function decoratedRelativeLatticeIsPreserved(
  repeatCell,
  receiver,
  symmetry,
  latticeInverse,
) {
  return repeatCell.sites.every((source) => {
    const relative = source.position.map(
      (value, axis) => value - receiver.position[axis],
    );
    const transformed = multiplyVector(symmetry, relative);
    return repeatCell.sites.some((candidate) => {
      if (candidate.polarity !== source.polarity) {
        return false;
      }
      const candidateRelative = candidate.position.map(
        (value, axis) => value - receiver.position[axis],
      );
      const fractionalTranslation = multiplyVector(
        latticeInverse,
        transformed.map(
          (value, axis) => value - candidateRelative[axis],
        ),
      );
      return fractionalTranslation.every(
        (value) => Math.abs(value - Math.round(value)) < EPSILON,
      );
    });
  });
}

export function validatePeriodicSymmetryCertificate(
  caseRecord,
  { deformationAxis = "x", deformationFactor = 1 } = {},
) {
  const certificate = LATTICE_LAB_PERIODIC_CERTIFICATES[caseRecord.id] ?? null;
  if (!certificate || !caseRecord.repeatCell) {
    return deepFreeze({ passed: false, reason: "no periodic certificate" });
  }
  const deformation = normalizeDeformation(
    deformationAxis,
    deformationFactor,
  );
  if (
    certificate.caseId === "hcp-abab-layers-v1" &&
    Math.abs(deformation.factor - 1) >= EPSILON
  ) {
    return deepFreeze({
      passed: false,
      reason:
        "the HCP threefold symmetry certificate applies only at the undeformed baseline",
    });
  }
  const group = certificate.symmetryGroup;
  const scale = [
    [deformation.factor, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  const orthogonal = group.every((matrix) => matrixClose(
    multiplyMatrix(matrix, transpose(matrix)),
    IDENTITY,
  ));
  const closed = group.every((left) => group.every((right) => {
    const product = multiplyMatrix(left, right);
    return group.some((candidate) => matrixClose(candidate, product));
  }));
  const commutesWithDeformation = group.every((matrix) => matrixClose(
    multiplyMatrix(matrix, scale),
    multiplyMatrix(scale, matrix),
  ));
  const lattice = translationMatrix(caseRecord.repeatCell.vectors);
  const latticeInverse = inverse(lattice);
  const latticePreserved = group.every((matrix) => {
    const integerMap = multiplyMatrix(
      multiplyMatrix(latticeInverse, matrix),
      lattice,
    );
    return integerMap.flat().every(
      (value) => Math.abs(value - Math.round(value)) < EPSILON,
    ) && Math.abs(Math.abs(determinant(integerMap)) - 1) < EPSILON;
  });
  const receiverOrbitsCovered = caseRecord.repeatCell.sites.every(
    (receiver) => group.every((symmetry) =>
      decoratedRelativeLatticeIsPreserved(
        caseRecord.repeatCell,
        receiver,
        symmetry,
        latticeInverse,
      )
    ),
  );
  const fixedSpaceRank = matrixRank(group.flatMap((matrix) => matrix.map(
    (row, rowIndex) => row.map(
      (value, columnIndex) =>
        value - (rowIndex === columnIndex ? 1 : 0),
    ),
  )));
  const noInvariantVector = fixedSpaceRank === 3;
  const passed = orthogonal && closed && commutesWithDeformation &&
    latticePreserved && receiverOrbitsCovered && noInvariantVector;
  return deepFreeze({
    passed,
    reason: passed
      ? "complete decorated-lattice symmetry orbits have exact zero vector sum"
      : "the declared periodic symmetry certificate did not validate",
    certificateId: certificate.id,
    caseId: caseRecord.id,
    receiverOrbitCount: caseRecord.repeatCell.sites.length,
    groupOrder: group.length,
    deformation,
    orthogonal,
    closed,
    commutesWithDeformation,
    latticePreserved,
    receiverOrbitsCovered,
    noInvariantVector,
  });
}

