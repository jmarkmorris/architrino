import {
  createLatticeLabCaseGallery,
  createReferencePolarityState,
  createSelectedSiteLedger,
} from "../src/apps/lattice-lab/LatticeLabCase.js";
import {
  LATTICE_LAB_LEDGER_SCOPE,
  createLatticeLabLedgerViewModel,
} from "../src/apps/lattice-lab/LatticeLabLedgerPresentation.js";

const EPSILON = 2e-9;
const IDENTITY = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const INVERSION = [[-1, 0, 0], [0, -1, 0], [0, 0, -1]];
const C2_X = [[1, 0, 0], [0, -1, 0], [0, 0, -1]];
const C2_Y = [[-1, 0, 0], [0, 1, 0], [0, 0, -1]];
const C2_Z = [[-1, 0, 0], [0, -1, 0], [0, 0, 1]];
const C120 = -0.5;
const S120 = Math.sqrt(3) / 2;
const R120 = [[C120, -S120, 0], [S120, C120, 0], [0, 0, 1]];
const R240 = [[C120, S120, 0], [-S120, C120, 0], [0, 0, 1]];
const Z_REFLECTION = [[1, 0, 0], [0, 1, 0], [0, 0, -1]];

const CASE_SPECS = Object.freeze({
  "bcc-two-sublattice-v1": Object.freeze({
    group: Object.freeze([IDENTITY, INVERSION]),
    factors: Object.freeze([1, 0.43, 0.01]),
    localRows: 14,
  }),
  "fcc-alternating-planes-v1": Object.freeze({
    group: Object.freeze([IDENTITY, INVERSION]),
    factors: Object.freeze([1, 0.43, 0.01]),
    localRows: 18,
  }),
  "hcp-abab-layers-v1": Object.freeze({
    group: Object.freeze([
      IDENTITY,
      R120,
      R240,
      Z_REFLECTION,
      [[C120, -S120, 0], [S120, C120, 0], [0, 0, -1]],
      [[C120, S120, 0], [-S120, C120, 0], [0, 0, -1]],
    ]),
    factors: Object.freeze([1]),
    localRows: 18,
  }),
  "simple-cubic-alternating-planes-v1": Object.freeze({
    group: Object.freeze([IDENTITY, INVERSION]),
    factors: Object.freeze([1, 0.43, 0.01]),
    localRows: 18,
  }),
  "diamond-cubic-two-sublattice-v1": Object.freeze({
    group: Object.freeze([IDENTITY, C2_X, C2_Y, C2_Z]),
    factors: Object.freeze([1, 0.43, 0.01]),
    localRows: 16,
  }),
});

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function add(left, right) {
  return left.map((value, axis) => value + right[axis]);
}

function subtract(left, right) {
  return left.map((value, axis) => value - right[axis]);
}

function scale(vector, factor) {
  return vector.map((value) => value * factor);
}

function matrixVector(matrix, vector) {
  return matrix.map((row) => row.reduce(
    (sum, value, axis) => sum + value * vector[axis],
    0,
  ));
}

function matrixProduct(left, right) {
  return left.map((row) => right[0].map((_, column) => row.reduce(
    (sum, value, axis) => sum + value * right[axis][column],
    0,
  )));
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
  const d = determinant(matrix);
  assert(Math.abs(d) > EPSILON, "translation matrix is singular");
  return [
    [
      (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) / d,
      (matrix[0][2] * matrix[2][1] - matrix[0][1] * matrix[2][2]) / d,
      (matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1]) / d,
    ],
    [
      (matrix[1][2] * matrix[2][0] - matrix[1][0] * matrix[2][2]) / d,
      (matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0]) / d,
      (matrix[0][2] * matrix[1][0] - matrix[0][0] * matrix[1][2]) / d,
    ],
    [
      (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]) / d,
      (matrix[0][1] * matrix[2][0] - matrix[0][0] * matrix[2][1]) / d,
      (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) / d,
    ],
  ];
}

function close(left, right, tolerance = EPSILON) {
  return left.every(
    (value, index) => Math.abs(value - right[index]) <= tolerance,
  );
}

function matrixClose(left, right) {
  return left.every((row, index) => close(row, right[index]));
}

function translationMatrix(vectors) {
  return vectors[0].map((_, axis) => vectors.map((vector) => vector[axis]));
}

function rank(rows) {
  const work = rows.map((row) => [...row]);
  let result = 0;
  for (let column = 0; column < 3; column += 1) {
    const pivot = work.findIndex(
      (row, index) => index >= result && Math.abs(row[column]) > EPSILON,
    );
    if (pivot < 0) {
      continue;
    }
    [work[result], work[pivot]] = [work[pivot], work[result]];
    const divisor = work[result][column];
    work[result] = work[result].map((value) => value / divisor);
    work.forEach((row, index) => {
      if (index === result) {
        return;
      }
      const factor = row[column];
      work[index] = row.map(
        (value, axis) => value - factor * work[result][axis],
      );
    });
    result += 1;
  }
  return result;
}

function periodicMember(caseRecord, receiver, position, polarity) {
  const lattice = translationMatrix(caseRecord.repeatCell.vectors);
  const latticeInverse = inverse(lattice);
  return caseRecord.repeatCell.sites.some((candidate) => {
    if (candidate.polarity !== polarity) {
      return false;
    }
    const relativeCandidate = subtract(candidate.position, receiver.position);
    const fractional = matrixVector(
      latticeInverse,
      subtract(position, relativeCandidate),
    );
    return fractional.every(
      (value) => Math.abs(value - Math.round(value)) < EPSILON,
    );
  });
}

function validateGroup(caseRecord, group, factor) {
  const lattice = translationMatrix(caseRecord.repeatCell.vectors);
  const latticeInverse = inverse(lattice);
  const deformation = [[factor, 0, 0], [0, 1, 0], [0, 0, 1]];
  const orthogonal = group.every((matrix) => matrixClose(
    matrixProduct(matrix, transpose(matrix)),
    IDENTITY,
  ));
  const closed = group.every((left) => group.every((right) =>
    group.some((candidate) => matrixClose(
      matrixProduct(left, right),
      candidate,
    ))
  ));
  const commutes = group.every((matrix) => matrixClose(
    matrixProduct(matrix, deformation),
    matrixProduct(deformation, matrix),
  ));
  const latticePreserved = group.every((matrix) => {
    const integerMap = matrixProduct(
      matrixProduct(latticeInverse, matrix),
      lattice,
    );
    return integerMap.flat().every(
      (value) => Math.abs(value - Math.round(value)) < EPSILON,
    ) && Math.abs(Math.abs(determinant(integerMap)) - 1) < EPSILON;
  });
  const decorated = caseRecord.repeatCell.sites.every((receiver) =>
    group.every((matrix) => caseRecord.repeatCell.sites.every((source) =>
      periodicMember(
        caseRecord,
        receiver,
        matrixVector(matrix, subtract(source.position, receiver.position)),
        source.polarity,
      )
    ))
  );
  const fixedRank = rank(group.flatMap((matrix) => matrix.map(
    (row, rowIndex) => row.map(
      (value, columnIndex) =>
        value - (rowIndex === columnIndex ? 1 : 0),
    ),
  )));
  return orthogonal && closed && commutes && latticePreserved &&
    decorated && fixedRank === 3;
}

function independentRow(offset, receiverPolarity, transmitterPolarity, factor) {
  const transformed = offset.map(
    (value, axis) => axis === 0 ? value * factor : value,
  );
  const radiusSquared = transformed.reduce(
    (sum, value) => sum + value * value,
    0,
  );
  const radiusCubed = radiusSquared * Math.sqrt(radiusSquared);
  const polaritySign = receiverPolarity === transmitterPolarity ? 1 : -1;
  return transformed.map((value) => -polaritySign * value / radiusCubed);
}

function orbitKey(position, polarity) {
  return `${polarity}|${position.map(
    (value) => Number(value.toFixed(9)),
  ).join(",")}`;
}

function verifySampleOrbits(caseRecord, group, factor) {
  let orbitCount = 0;
  let rowCount = 0;
  caseRecord.repeatCell.sites.forEach((receiver) => {
    const visited = new Set();
    for (let i = -2; i <= 2; i += 1) {
      for (let j = -2; j <= 2; j += 1) {
        for (let k = -2; k <= 2; k += 1) {
          caseRecord.repeatCell.sites.forEach((source) => {
            const translation = caseRecord.repeatCell.vectors.reduce(
              (sum, vector, axis) => add(
                sum,
                scale(vector, [i, j, k][axis]),
              ),
              [0, 0, 0],
            );
            const position = subtract(
              add(source.position, translation),
              receiver.position,
            );
            if (Math.hypot(...position) < EPSILON) {
              return;
            }
            const seedKey = orbitKey(position, source.polarity);
            if (visited.has(seedKey)) {
              return;
            }
            const orbit = new Map();
            group.forEach((matrix) => {
              const member = matrixVector(matrix, position);
              assert(
                periodicMember(
                  caseRecord,
                  receiver,
                  member,
                  source.polarity,
                ),
                `${caseRecord.id}: symmetry orbit leaves decorated lattice`,
              );
              orbit.set(orbitKey(member, source.polarity), member);
            });
            const residual = [...orbit.values()].reduce(
              (sum, member) => add(
                sum,
                independentRow(
                  member,
                  receiver.polarity,
                  source.polarity,
                  factor,
                ),
              ),
              [0, 0, 0],
            );
            assert(
              Math.hypot(...residual) < EPSILON,
              `${caseRecord.id}: nonzero complete orbit ${residual}`,
            );
            orbit.forEach((member, key) => visited.add(key));
            orbitCount += 1;
            rowCount += orbit.size;
          });
        }
      }
    }
  });
  return { orbitCount, rowCount };
}

function verifyLocalRows(caseRecord, factor, expectedCount) {
  const polarityBySiteId = createReferencePolarityState(caseRecord);
  const receivers = [
    caseRecord.sites.find((site) => site.polarity === "positrino"),
    caseRecord.sites.find((site) => site.polarity === "electrino"),
  ];
  let rowsChecked = 0;
  receivers.forEach((receiver) => {
    assert(receiver, `${caseRecord.id}: missing receiver polarity orbit`);
    const ledger = createSelectedSiteLedger(
      caseRecord,
      polarityBySiteId,
      receiver.id,
      { compressionAxis: "x", compressionFactor: factor },
    );
    assert(ledger.certificateApplies, `${caseRecord.id}: certificate inactive`);
    assert(ledger.rows.length === expectedCount, `${caseRecord.id}: local row count`);
    ledger.rows.forEach((row) => {
      const expected = independentRow(
        row.latticeOffset,
        receiver.polarity,
        row.polarity,
        factor,
      );
      assert(
        close(row.accelerationRow.normalizedAcceleration, expected),
        `${caseRecord.id}: local row mismatch`,
      );
      rowsChecked += 1;
    });
    assert(
      Math.hypot(...ledger.normalizedAccelerationResidual) < EPSILON,
      `${caseRecord.id}: local shells do not cancel`,
    );
    const view = createLatticeLabLedgerViewModel({
      caseRecord,
      ledger,
      certificatePassed: true,
      siteSelectionExplicit: true,
    });
    assert(
      view.scope === LATTICE_LAB_LEDGER_SCOPE.CERTIFIED_PERIODIC &&
      view.outcome === "zero" && view.calculationRows.length === expectedCount,
      `${caseRecord.id}: certified view mismatch`,
    );
  });
  return rowsChecked;
}

const gallery = createLatticeLabCaseGallery();
const summaries = [];
let checkedOrbits = 0;
let checkedOrbitRows = 0;
let checkedLocalRows = 0;

Object.entries(CASE_SPECS).forEach(([caseId, specification]) => {
  const caseRecord = gallery.find((candidate) => candidate.id === caseId);
  assert(caseRecord, `${caseId}: missing case`);
  assert(
    caseRecord.calculationScope === "certified-periodic",
    `${caseId}: wrong calculation scope`,
  );
  assert(
    !/displayed sites|finite spherical crop are included/u.test(
      caseRecord.calculationBoundaryTreatment,
    ),
    `${caseId}: display crop leaked into periodic calculation scope`,
  );
  specification.factors.forEach((factor) => {
    assert(
      validateGroup(caseRecord, specification.group, factor),
      `${caseId}: independent group validation failed at ${factor}`,
    );
    const samples = verifySampleOrbits(
      caseRecord,
      specification.group,
      factor,
    );
    checkedOrbits += samples.orbitCount;
    checkedOrbitRows += samples.rowCount;
    checkedLocalRows += verifyLocalRows(
      caseRecord,
      factor,
      specification.localRows,
    );
  });
  summaries.push(Object.freeze({
    caseId,
    receiverOrbits: caseRecord.repeatCell.sites.length,
    factors: specification.factors,
    groupOrder: specification.group.length,
  }));
});

const hcp = gallery.find(({ id }) => id === "hcp-abab-layers-v1");
const hcpLedger = createSelectedSiteLedger(
  hcp,
  createReferencePolarityState(hcp),
  hcp.defaultSiteId,
  { compressionAxis: "x", compressionFactor: 0.43 },
);
const hcpView = createLatticeLabLedgerViewModel({
  caseRecord: hcp,
  ledger: hcpLedger,
  certificatePassed: false,
});
assert(!hcpLedger.certificateApplies, "deformed HCP certificate must be inactive");
assert(
  hcpView.scope === LATTICE_LAB_LEDGER_SCOPE.NOT_ESTABLISHED &&
  !hcpView.calculationAvailable,
  "deformed HCP must remain not established without calculation disclosure",
);

const bcc = gallery.find(({ id }) => id === "bcc-two-sublattice-v1");
assert(
  !validateGroup(bcc, [IDENTITY, C2_Z], 1),
  "tampered fixed-vector symmetry negative control was not detected",
);
const reference = independentRow([1, 0, 0], "electrino", "positrino", 1);
const tampered = [...reference];
tampered[0] += 1e-4;
assert(
  !close(reference, tampered),
  "tampered acceleration-row negative control was not detected",
);

process.stdout.write(`${JSON.stringify({
  ok: true,
  scope: "certified-periodic",
  normalizedWakeSpeed: 1,
  cases: summaries,
  checkedReceiverOrbits: summaries.reduce(
    (sum, item) => sum + item.receiverOrbits,
    0,
  ),
  checkedOrbits,
  checkedOrbitRows,
  checkedLocalRows,
  hcpDeformedScope: hcpView.scope,
  negativeControls: 2,
})}\n`);
