import test from "node:test";
import assert from "node:assert/strict";

import {
  createLatticeLabCaseGallery,
  createReferencePolarityState,
  createSelectedSiteLedger,
  createSimpleCubicCheckerboardCase,
} from "../src/apps/lattice-lab/LatticeLabCase.js";
import {
  LATTICE_LAB_LEDGER_SCOPE,
  createLatticeLabLedgerViewModel,
} from "../src/apps/lattice-lab/LatticeLabLedgerPresentation.js";

function createCheckerboardLedger() {
  const caseRecord = createSimpleCubicCheckerboardCase();
  return {
    caseRecord,
    ledger: createSelectedSiteLedger(
      caseRecord,
      createReferencePolarityState(caseRecord),
      caseRecord.defaultSiteId,
    ),
  };
}

test("certified checkerboard view starts with the exact periodic zero result", () => {
  const { caseRecord, ledger } = createCheckerboardLedger();
  const viewModel = createLatticeLabLedgerViewModel({
    caseRecord,
    ledger,
    certificatePassed: true,
  });

  assert.equal(
    viewModel.scope,
    LATTICE_LAB_LEDGER_SCOPE.CERTIFIED_PERIODIC,
  );
  assert.equal(viewModel.outcome, "zero");
  assert.equal(
    viewModel.outcomeLabel,
    "Net acceleration is zero at every architrino.",
  );
  assert.equal(viewModel.residualMagnitude, 0);
  assert.equal(viewModel.residualMagnitudeLabel, "0");
  assert.deepEqual(viewModel.residualVector, [0, 0, 0]);
  assert.equal(viewModel.residualVectorLabel, "⟨0, 0, 0⟩");
  assert.equal(
    viewModel.residualLineLabel,
    "Magnitude 0 · Vector ⟨0, 0, 0⟩",
  );
  assert.equal("statement" in viewModel, false);
  assert.deepEqual(
    viewModel.shellSummaries.map((shell) => shell.totalLabel),
    [
      "6 near neighbors → 3 matching pairs → zero",
      "12 far neighbors → 6 matching pairs → zero",
    ],
  );
  assert.equal(viewModel.calculationAvailable, true);
  assert.equal(
    viewModel.calculationScopeDetail,
    "Certificate method: across the ideal stationary repeating pattern, " +
      "every contribution is paired with its receiver-centered inverse " +
      "under an inversion-symmetric exhaustion.",
  );
  assert.doesNotMatch(viewModel.calculationScopeDetail, /release|motion|stability|energy|conservation/u);
  assert.equal(viewModel.calculationRows.length, 18);
  assert.equal(viewModel.shellScopeNote, null);
  assert.deepEqual(
    [...new Set(viewModel.calculationRows.map(({ rowLabel }) => rowLabel))],
    ["6 near neighbors", "12 far neighbors"],
  );
});

test("checkerboard never inherits a zero result when the periodic check is absent", () => {
  const { caseRecord, ledger } = createCheckerboardLedger();
  const viewModel = createLatticeLabLedgerViewModel({
    caseRecord,
    ledger,
    certificatePassed: false,
  });

  assert.equal(
    viewModel.scope,
    LATTICE_LAB_LEDGER_SCOPE.NOT_ESTABLISHED,
  );
  assert.equal(viewModel.outcome, "not-established");
  assert.equal(viewModel.icon, null);
  assert.equal(
    viewModel.outcomeLabel,
    "Acceleration has not been calculated for this geometry.",
  );
  assert.equal(viewModel.residualMagnitude, null);
  assert.equal(viewModel.residualMagnitudeLabel, null);
  assert.equal(viewModel.residualVector, null);
  assert.equal(viewModel.residualVectorLabel, null);
  assert.equal(viewModel.residualLineLabel, null);
  assert.equal(viewModel.calculationAvailable, false);
  assert.deepEqual(viewModel.calculationRows, []);
  assert.equal("statement" in viewModel, false);
});

test("BCC reports exact periodic zero only when its repeating-pattern certificate passes", () => {
  const caseRecord = createLatticeLabCaseGallery()[1];
  const ledger = createSelectedSiteLedger(
    caseRecord,
    createReferencePolarityState(caseRecord),
    caseRecord.defaultSiteId,
  );
  const viewModel = createLatticeLabLedgerViewModel({
    caseRecord,
    ledger,
    certificatePassed: ledger.certificateApplies,
  });

  assert.equal(viewModel.scope, LATTICE_LAB_LEDGER_SCOPE.CERTIFIED_PERIODIC);
  assert.equal(viewModel.outcome, "zero");
  assert.deepEqual(viewModel.residualVector, [0, 0, 0]);
  assert.equal(viewModel.calculationAvailable, true);
  assert.equal(viewModel.calculationRows.length, 14);
  assert.equal(viewModel.receiverLabel, null);
  assert.equal(viewModel.shellSummaries.length, 2);
  assert.equal("statement" in viewModel, false);
  assert.equal(viewModel.shellScopeNote, null);
  assert.doesNotMatch(JSON.stringify(viewModel), /displayed finite|finite crop/u);
});

test("alternating-planes Ledger keeps its periodic zero copy in the outcome", () => {
  const caseRecord = createLatticeLabCaseGallery().find(
    ({ id }) => id === "simple-cubic-alternating-planes-v1",
  );
  const ledger = createSelectedSiteLedger(
    caseRecord,
    createReferencePolarityState(caseRecord),
    caseRecord.defaultSiteId,
  );
  const viewModel = createLatticeLabLedgerViewModel({
    caseRecord,
    ledger,
    certificatePassed: ledger.certificateApplies,
  });

  assert.equal(
    viewModel.outcomeLabel,
    "Net acceleration is zero at every architrino.",
  );
  assert.equal("statement" in viewModel, false);
});

test("finite nonperiodic state reports only its calculated finite residual", () => {
  const { caseRecord, ledger } = createCheckerboardLedger();
  const finiteLedger = {
    ...ledger,
    certificateApplies: false,
    certifiedExactZero: false,
    normalizedAccelerationResidual: [99, 99, 99],
    shells: ledger.shells.map((shell, shellIndex) => ({
      ...shell,
      normalizedAccelerationResidual: shellIndex === 0
        ? [0.25, 0, 0]
        : [0, 0, 0],
      pairs: shellIndex === 0
        ? shell.pairs.map((pair, pairIndex) => pairIndex === 0
          ? { ...pair, accelerationCancelsExactly: false }
          : pair)
        : shell.pairs,
    })),
    rows: ledger.rows.map((row, rowIndex) => rowIndex === 0
      ? {
        ...row,
        accelerationRow: {
          ...row.accelerationRow,
          normalizedAcceleration: row.accelerationRow
            .normalizedAcceleration.map(
              (value, coordinate) => value + (coordinate === 0 ? 0.25 : 0),
            ),
        },
      }
      : row),
  };
  const viewModel = createLatticeLabLedgerViewModel({
    caseRecord,
    ledger: finiteLedger,
    certificatePassed: false,
    finiteNonperiodic: true,
    siteSelectionExplicit: true,
  });

  assert.equal(
    viewModel.scope,
    LATTICE_LAB_LEDGER_SCOPE.FINITE_NONPERIODIC,
  );
  assert.equal(viewModel.outcome, "nonzero");
  assert.equal(
    viewModel.outcomeLabel,
    "Non-zero acceleration in this configuration.",
  );
  assert.equal(viewModel.residualMagnitudeLabel, "0.25");
  assert.equal(viewModel.residualVectorLabel, "⟨0.25, 0, 0⟩");
  assert.equal("statement" in viewModel, false);
  assert.equal(
    viewModel.receiverLabel,
    "Calculation target · Selected electrino",
  );
  assert.equal(viewModel.calculationAvailable, true);
  assert.equal(
    viewModel.calculationScopeDetail,
    "Finite calculation scope: every other Architrino in this displayed " +
      "nonperiodic configuration is included once; there is no repeating " +
      "continuation.",
  );
  assert.equal(viewModel.calculationRows.length, 18);
  assert.deepEqual(
    viewModel.calculationRows.at(-1).runningResidual,
    [0.25, 0, 0],
  );
  assert.match(viewModel.shellSummaries[0].totalLabel, /^6 near neighbors →/u);
});

test("periodic gallery method scope lives inside the calculation disclosure", () => {
  createLatticeLabCaseGallery()
    .filter((caseRecord) =>
      caseRecord.calculationScope === "certified-periodic" &&
      caseRecord.id !== "simple-cubic-checkerboard-v1"
    )
    .forEach((caseRecord) => {
      const ledger = createSelectedSiteLedger(
        caseRecord,
        createReferencePolarityState(caseRecord),
        caseRecord.defaultSiteId,
      );
      const viewModel = createLatticeLabLedgerViewModel({
        caseRecord,
        ledger,
        certificatePassed: ledger.certificateApplies,
      });
      if (!ledger.certificateApplies) {
        assert.equal(viewModel.calculationScopeDetail, null, caseRecord.id);
        return;
      }
      assert.match(
        viewModel.calculationScopeDetail,
        /^Certificate method: the ideal repeating pattern is exhausted by /u,
        caseRecord.id,
      );
      assert.match(
        viewModel.calculationScopeDetail,
        /every inequivalent Architrino class/u,
        caseRecord.id,
      );
      assert.doesNotMatch(
        viewModel.calculationScopeDetail,
        /release|motion|stability|energy|conservation/u,
        caseRecord.id,
      );
    });
});

test("finite nonperiodic zero is derived from included contribution rows only", () => {
  const { caseRecord, ledger } = createCheckerboardLedger();
  const excludedRow = {
    ...ledger.rows[0],
    includedInCalculation: false,
    accelerationRow: {
      ...ledger.rows[0].accelerationRow,
      normalizedAcceleration: [500, 0, 0],
    },
  };
  const finiteLedger = {
    ...ledger,
    certificateApplies: false,
    certifiedExactZero: false,
    rows: [excludedRow, ...ledger.rows.slice(1)],
    shells: ledger.shells.map((shell, shellIndex) => ({
      ...shell,
      rows: shellIndex === 0
        ? [excludedRow, ...shell.rows.slice(1)]
        : shell.rows,
    })),
  };
  const viewModel = createLatticeLabLedgerViewModel({
    caseRecord,
    ledger: finiteLedger,
    finiteNonperiodic: true,
  });

  const expected = ledger.rows.slice(1).reduce(
    (sum, row) => sum.map(
      (value, index) => value + row.accelerationRow.normalizedAcceleration[index],
    ),
    [0, 0, 0],
  );
  assert.deepEqual(viewModel.residualVector, expected);
  assert.equal(viewModel.outcome, "nonzero");
  assert.equal(viewModel.calculationRows.length, 17);
  assert.equal(
    viewModel.shellSummaries[0].totalLabel.startsWith(
      "5 near neighbors →",
    ),
    true,
  );
  assert.equal(JSON.stringify(viewModel).includes("500"), false);
});

test("finite nonperiodic exact zero uses finite-only outcome language", () => {
  const { caseRecord, ledger } = createCheckerboardLedger();
  const finiteLedger = {
    ...ledger,
    certificateApplies: false,
    certifiedExactZero: false,
  };
  const viewModel = createLatticeLabLedgerViewModel({
    caseRecord,
    ledger: finiteLedger,
    finiteNonperiodic: true,
  });

  assert.equal(viewModel.outcome, "zero");
  assert.equal(
    viewModel.outcomeLabel,
    "Net acceleration is zero in this finite configuration.",
  );
  assert.equal("statement" in viewModel, false);
});
