import { pathToFileURL } from "node:url";

import {
  SIMPLE_CUBIC_STATIONARY_CONTRACT,
  createStationarySimpleCubicExhaustionLedger,
} from "../src/apps/lattice-lab/SimpleCubicStationaryLedger.js";

function independentPolarity(grid) {
  const sum = grid[0] + grid[1] + grid[2];
  return ((sum % 2) + 2) % 2 === 0 ? "positrino" : "electrino";
}

function verifyRowIndependently(row) {
  const issues = [];
  const offset = row.transmitterGrid.map(
    (value, index) => value - row.receiverGrid[index],
  );
  const axisIndex = ["x", "y", "z"].indexOf(row.compression.axis);
  const physicalOffset = offset.map((value, index) =>
    index === axisIndex ? value * row.compression.factor : value
  );
  const squared = physicalOffset.reduce(
    (sum, value) => sum + value * value,
    0,
  );
  const receiverPolarity = independentPolarity(row.receiverGrid);
  const transmitterPolarity = independentPolarity(row.transmitterGrid);
  const sigma = receiverPolarity === transmitterPolarity ? 1 : -1;
  const expectedNumerator = physicalOffset.map((value) => -sigma * value);

  if (row.receiverPolarity !== receiverPolarity) {
    issues.push("receiver polarity does not match the independent parity oracle");
  }
  if (row.transmitterPolarity !== transmitterPolarity) {
    issues.push("transmitter polarity does not match the independent parity oracle");
  }
  if (row.relativeOffset.join(",") !== offset.join(",")) {
    issues.push("relative offset does not match the coordinate difference");
  }
  if (row.physicalOffsetInD.join(",") !== physicalOffset.join(",")) {
    issues.push("physical offset does not match the independently applied uniaxial map");
  }
  if (row.separationSquared !== squared || !(squared > 0)) {
    issues.push("separation square is not the positive transformed-coordinate norm");
  }
  if (row.polaritySign !== sigma) {
    issues.push("polarity sign does not match the independent parity product");
  }
  if (row.accelerationNumerator.join(",") !== expectedNumerator.join(",")) {
    issues.push("acceleration numerator does not match -sigma times the transformed offset");
  }
  if (row.transmitterFactor !== 1 || row.accelerationWeight !== 1) {
    issues.push("a stationary row must have D_t = W_acc = 1");
  }
  if (row.emissionDelayInD !== Math.sqrt(squared)) {
    issues.push("stationary emission delay does not equal the separation");
  }
  return issues;
}

export function verifySimpleCubicStationaryLedger() {
  const receiverGrids = [
    [0, 0, 0],
    [1, 0, 0],
    [-2, 3, 1],
    [4, -3, 2],
  ];
  const shapes = ["cube", "sphere"];
  const transforms = [
    ["x", 1],
    ["x", 0.75],
    ["y", 0.2],
    ["z", 0.000001],
  ];
  const ledgers = [];
  const issues = [];

  receiverGrids.forEach((receiverGrid) => {
    shapes.forEach((shape) => {
      transforms.forEach(([compressionAxis, compressionFactor]) => {
        for (let cutoff = 1; cutoff <= 6; cutoff += 1) {
          const ledger = createStationarySimpleCubicExhaustionLedger({
            receiverGrid,
            cutoff,
            shape,
            compressionAxis,
            compressionFactor,
          });
          const expectedCubeRows = (2 * cutoff + 1) ** 3 - 1;
          if (shape === "cube" && ledger.rowCount !== expectedCubeRows) {
            issues.push(
              `${shape} cutoff ${cutoff} has ${ledger.rowCount} rows, expected ${expectedCubeRows}`,
            );
          }
          if (!ledger.allRowsPaired || !ledger.exactZero) {
            issues.push(
              `${shape} cutoff ${cutoff} failed exact inversion pairing at receiver ${receiverGrid.join(",")} under ${compressionAxis}/${compressionFactor}`,
            );
          }
          ledger.rows.forEach((row) => {
            verifyRowIndependently(row).forEach((issue) => {
              issues.push(
                `${shape} cutoff ${cutoff} ${compressionAxis}/${compressionFactor} row ${row.relativeOffset.join(",")}: ${issue}`,
              );
            });
          });
          ledgers.push({
            receiverGrid,
            receiverPolarity: ledger.receiverPolarity,
            compressionAxis,
            compressionFactor,
            cutoff,
            shape,
            rowCount: ledger.rowCount,
            pairCount: ledger.pairCount,
            exactZero: ledger.exactZero,
          });
        }
      });
    });
  });

  const negativeControlLedger = createStationarySimpleCubicExhaustionLedger({
    cutoff: 1,
    shape: "cube",
  });
  const tamperedRow = {
    ...negativeControlLedger.rows[0],
    accelerationNumerator: [
      negativeControlLedger.rows[0].accelerationNumerator[0] + 1,
      ...negativeControlLedger.rows[0].accelerationNumerator.slice(1),
    ],
  };
  const negativeControlIssues = verifyRowIndependently(tamperedRow);
  if (negativeControlIssues.length === 0) {
    issues.push("tampered acceleration-numerator negative control was not rejected");
  }

  return Object.freeze({
    schema: "lattice-lab-stationary-ledger-verification/v1",
    contractId: SIMPLE_CUBIC_STATIONARY_CONTRACT.id,
    status: issues.length === 0 ? "Verified" : "Verification incomplete",
    claimGrade: "implementation verification against a closed-form parity oracle",
    theoremAuthority:
      "the inversion-pair theorem, not same-implementation replay",
    transformsChecked: transforms.length,
    ledgersChecked: ledgers.length,
    rowsChecked: ledgers.reduce((sum, ledger) => sum + ledger.rowCount, 0),
    negativeControlsPassed: negativeControlIssues.length > 0,
    issues: Object.freeze(issues),
    result:
      "exact zero under the declared receiver-centered inversion-symmetric exhaustion",
    nonClaims: SIMPLE_CUBIC_STATIONARY_CONTRACT.nonClaims,
  });
}

function runCli() {
  const report = verifySimpleCubicStationaryLedger();
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (report.status !== "Verified") {
    process.exitCode = 1;
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  runCli();
}
