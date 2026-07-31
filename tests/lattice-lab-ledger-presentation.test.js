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
  assert.equal(viewModel.outcomeLabel, "Zero residual — certified");
  assert.equal(viewModel.residualMagnitude, 0);
  assert.equal(viewModel.residualMagnitudeLabel, "0");
  assert.deepEqual(viewModel.residualVector, [0, 0, 0]);
  assert.equal(viewModel.residualVectorLabel, "⟨0, 0, 0⟩");
  assert.equal(
    viewModel.statement,
    "In this ideal repeating pattern, matching pulls cancel at every site at release.",
  );
  assert.deepEqual(
    viewModel.shellSummaries.map((shell) => shell.totalLabel),
    [
      "6 contributions → 3 matching pairs → ⟨0, 0, 0⟩",
      "12 contributions → 6 matching pairs → ⟨0, 0, 0⟩",
    ],
  );
  assert.equal(viewModel.calculationAvailable, true);
  assert.equal(viewModel.calculationRows.length, 18);
  assert.match(viewModel.shellScopeNote, /local examples/u);
  assert.match(viewModel.shellScopeNote, /separate certificate/u);
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
  assert.equal(viewModel.outcomeLabel, null);
  assert.equal(viewModel.residualMagnitude, null);
  assert.equal(viewModel.residualMagnitudeLabel, null);
  assert.equal(viewModel.residualVector, null);
  assert.equal(viewModel.residualVectorLabel, null);
  assert.equal(viewModel.residualMeaning, null);
  assert.equal(viewModel.calculationAvailable, false);
  assert.deepEqual(viewModel.calculationRows, []);
  assert.equal(
    viewModel.statement,
    "Acceleration has not been calculated for this geometry.",
  );
});

test("non-certified gallery cases expose geometry shells without acceleration rows", () => {
  const caseRecord = createLatticeLabCaseGallery()[1];
  const ledger = createSelectedSiteLedger(
    caseRecord,
    createReferencePolarityState(caseRecord),
    caseRecord.defaultSiteId,
  );
  const viewModel = createLatticeLabLedgerViewModel({
    caseRecord,
    ledger,
    certificatePassed: false,
  });

  assert.equal(viewModel.outcome, "not-established");
  assert.equal(viewModel.residualMagnitude, null);
  assert.equal(viewModel.calculationAvailable, false);
  assert.deepEqual(
    viewModel.shellSummaries.map((shell) => ({
      count: shell.count,
      distance: shell.distance,
      totalLabel: shell.totalLabel,
      vector: shell.vector,
    })),
    [
      {
        count: 8,
        distance: "d",
        totalLabel: "8 sites at d",
        vector: null,
      },
      {
        count: 6,
        distance: "2d/√3",
        totalLabel: "6 sites at 2d/√3",
        vector: null,
      },
    ],
  );
  assert.match(viewModel.shellScopeNote, /geometry only/u);
});

test("finite nonperiodic state reports only its calculated finite residual", () => {
  const { caseRecord, ledger } = createCheckerboardLedger();
  const finiteLedger = {
    ...ledger,
    certificateApplies: false,
    certifiedExactZero: false,
    normalizedAccelerationResidual: [0.25, 0, 0],
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
    "Nonzero residual in displayed finite scope",
  );
  assert.equal(viewModel.residualMagnitudeLabel, "0.25");
  assert.equal(viewModel.residualVectorLabel, "⟨0.25, 0, 0⟩");
  assert.match(viewModel.statement, /displayed finite configuration/u);
  assert.doesNotMatch(viewModel.statement, /every site/u);
  assert.equal(viewModel.receiverLabel, "Selected electrino");
  assert.equal(viewModel.calculationAvailable, true);
});
