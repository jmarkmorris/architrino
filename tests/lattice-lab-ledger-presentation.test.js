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
  assert.equal(
    viewModel.statement,
    "In this ideal repeating pattern, matching pulls cancel at every site at release.",
  );
  assert.deepEqual(
    viewModel.shellSummaries.map((shell) => shell.totalLabel),
    [
      "Nearest shell: 6 contributions → 3 matching pairs → zero",
      "Next shell: 12 contributions → 6 matching pairs → zero",
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
  assert.equal(viewModel.residualLineLabel, null);
  assert.equal(viewModel.calculationAvailable, false);
  assert.deepEqual(viewModel.calculationRows, []);
  assert.equal(
    viewModel.statement,
    "Acceleration has not been calculated for this geometry.",
  );
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
  assert.match(viewModel.statement, /complete symmetry orbits/u);
  assert.match(viewModel.shellScopeNote, /full declared repeating pattern/u);
  assert.doesNotMatch(JSON.stringify(viewModel), /displayed finite|finite crop/u);
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
  assert.match(viewModel.statement, /displayed finite configuration/u);
  assert.doesNotMatch(viewModel.statement, /every site/u);
  assert.equal(
    viewModel.receiverLabel,
    "Calculation target · Selected electrino",
  );
  assert.equal(viewModel.calculationAvailable, true);
  assert.equal(viewModel.calculationRows.length, 18);
  assert.deepEqual(
    viewModel.calculationRows.at(-1).runningResidual,
    [0.25, 0, 0],
  );
  assert.match(viewModel.shellSummaries[0].totalLabel, /6 calculated contributions/u);
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
      "Nearest shell: 5 calculated contributions",
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
  assert.match(viewModel.statement, /displayed finite configuration only/u);
  assert.doesNotMatch(viewModel.statement, /every site|repeating pattern/u);
});
