import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  createLatticeLabCaseGallery,
  createReferencePolarityState,
  createSelectedSiteLedger,
} from "../src/apps/lattice-lab/LatticeLabCase.js";
import {
  LATTICE_LAB_LEDGER_SCOPE,
  createLatticeLabLedgerViewModel,
} from "../src/apps/lattice-lab/LatticeLabLedgerPresentation.js";
import {
  validatePeriodicSymmetryCertificate,
} from "../src/apps/lattice-lab/LatticeLabPeriodicStationary.js";

const PERIODIC_CASES = Object.freeze({
  "bcc-two-sublattice-v1": Object.freeze({ rows: 14, allFactors: true }),
  "fcc-alternating-planes-v1": Object.freeze({ rows: 18, allFactors: true }),
  "hcp-abab-layers-v1": Object.freeze({ rows: 18, allFactors: false }),
  "simple-cubic-alternating-planes-v1": Object.freeze({
    rows: 18,
    allFactors: true,
  }),
  "diamond-cubic-two-sublattice-v1": Object.freeze({
    rows: 16,
    allFactors: true,
  }),
});

function assertZero(vector, label) {
  assert.ok(vector, label);
  assert.ok(
    vector.every((value) => Math.abs(value) < 1e-12),
    `${label}: ${vector}`,
  );
}

test("deterministic gallery calculations use periodic certificates, never display crops", () => {
  const gallery = createLatticeLabCaseGallery();
  Object.entries(PERIODIC_CASES).forEach(([caseId, expectation]) => {
    const caseRecord = gallery.find((candidate) => candidate.id === caseId);
    assert.ok(caseRecord, caseId);
    assert.equal(caseRecord.calculationScope, "certified-periodic", caseId);
    assert.ok(caseRecord.accelerationCertificate, caseId);
    assert.match(caseRecord.calculationBoundaryTreatment, /ideal stationary infinite repeat/u);
    assert.match(caseRecord.calculationBoundaryTreatment, /spherical envelope is display only/u);
    assert.doesNotMatch(
      `${caseRecord.calculationBoundaryTreatment} ${caseRecord.evidenceStatus} ${caseRecord.accelerationStatus}`,
      /displayed sites|finite spherical crop are included|finite-displayed/u,
      caseId,
    );
    assert.equal(
      caseRecord.accelerationCertificate.calculationBoundary.displayCropRole,
      "the spherical envelope is a viewing crop only and supplies no calculation rows",
      caseId,
    );

    const factors = expectation.allFactors ? [1, 0.43, 0.01] : [1];
    factors.forEach((factor) => {
      const validation = validatePeriodicSymmetryCertificate(caseRecord, {
        deformationAxis: "x",
        deformationFactor: factor,
      });
      assert.equal(validation.passed, true, `${caseId}/${factor}`);
      assert.equal(validation.receiverOrbitCount, 2, caseId);

      ["positrino", "electrino"].forEach((polarity) => {
        const receiver = caseRecord.sites.find(
          (site) => site.polarity === polarity,
        );
        const ledger = createSelectedSiteLedger(
          caseRecord,
          createReferencePolarityState(caseRecord),
          receiver.id,
          { compressionAxis: "x", compressionFactor: factor },
        );
        assert.equal(ledger.receiverId, receiver.id, caseId);
        assert.equal(ledger.certificateApplies, true, caseId);
        assert.equal(ledger.certifiedExactZero, true, caseId);
        assert.equal(ledger.rows.length, expectation.rows, caseId);
        assert.equal(
          ledger.rows.every((row) => row.accelerationRow),
          true,
          caseId,
        );
        assertZero(ledger.normalizedAccelerationResidual, caseId);

        const view = createLatticeLabLedgerViewModel({
          caseRecord,
          ledger,
          certificatePassed: true,
          siteSelectionExplicit: true,
        });
        assert.equal(
          view.scope,
          LATTICE_LAB_LEDGER_SCOPE.CERTIFIED_PERIODIC,
          caseId,
        );
        assert.equal(view.outcome, "zero", caseId);
        assert.equal(
          view.outcomeLabel,
          "Net acceleration is zero at every architrino.",
          caseId,
        );
        assert.equal(view.residualLineLabel, "Magnitude 0 · Vector ⟨0, 0, 0⟩");
        assert.equal(view.calculationAvailable, true, caseId);
        assert.equal(view.calculationRows.length, expectation.rows, caseId);
        if (caseId === "hcp-abab-layers-v1") {
          assert.deepEqual(
            view.calculationRows.map(({ rowLabel }) => rowLabel),
            [
              ...Array.from({ length: 12 }, () => "12 near neighbors"),
              ...Array.from({ length: 6 }, () => "6 far neighbors"),
            ],
          );
          assert.equal(
            view.calculationRows.every(
              ({ showPolarityInLabel }) => showPolarityInLabel === false,
            ),
            true,
          );
        }
        assert.equal(view.shellSummaries.length, 2, caseId);
        assert.equal("statement" in view, false);
        assert.equal(view.shellScopeNote, null);
        assert.doesNotMatch(
          `${view.outcomeLabel} ${view.shellScopeNote}`,
          /finite|display crop|motion|stability|energy|conservation/u,
          caseId,
        );
      });
    });
  });
});

test("deformed HCP retains an exact periodic blocker without a green result", () => {
  const caseRecord = createLatticeLabCaseGallery().find(
    ({ id }) => id === "hcp-abab-layers-v1",
  );
  const validation = validatePeriodicSymmetryCertificate(caseRecord, {
    deformationAxis: "x",
    deformationFactor: 0.43,
  });
  assert.equal(validation.passed, false);
  assert.match(validation.reason, /undeformed baseline/u);

  const ledger = createSelectedSiteLedger(
    caseRecord,
    createReferencePolarityState(caseRecord),
    caseRecord.defaultSiteId,
    { compressionAxis: "x", compressionFactor: 0.43 },
  );
  assert.equal(ledger.certificateApplies, false);
  assert.equal(ledger.certifiedExactZero, false);
  const view = createLatticeLabLedgerViewModel({
    caseRecord,
    ledger,
    certificatePassed: false,
  });
  assert.equal(view.scope, LATTICE_LAB_LEDGER_SCOPE.NOT_ESTABLISHED);
  assert.equal(view.outcome, "not-established");
  assert.equal(view.icon, null);
  assert.equal(view.residualVector, null);
  assert.equal(view.calculationAvailable, false);
  assert.equal(view.calculationRows.length, 0);
  assert.match(view.outcomeLabel, /Periodic acceleration is not established/u);
  assert.match(view.outcomeLabel, /undeformed baseline/u);
  assert.doesNotMatch(view.outcomeLabel, /displayed finite|finite crop/u);
  assert.equal("statement" in view, false);
});

test("HCP user-facing copy consistently describes ABAB stacking", () => {
  const caseRecord = createLatticeLabCaseGallery().find(
    ({ id }) => id === "hcp-abab-layers-v1",
  );
  assert.equal(caseRecord.title, "Hexagonal Close-Packed");
  assert.equal(
    caseRecord.polarityRule,
    "opposite polarities alternate between A and B stacking positions",
  );
  assert.doesNotMatch(
    [
      caseRecord.title,
      caseRecord.polarityRule,
    ].join(" "),
    /\blayers?\b/u,
  );
  assert.equal("learnerOverview" in caseRecord, false);
  const runtimeSource = readFileSync(
    new URL("../src/apps/lattice-lab/LatticeLabRuntime.js", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(
    runtimeSource,
    /The undeformed repeating pattern has a complete symmetry-orbit zero certificate\./u,
  );
  assert.match(
    runtimeSource,
    /The undeformed HCP certificate uses ["'` +\n]*threefold rotational symmetry, which this X-axis deformation does ["'` +\n]*not preserve\. A complete periodic acceleration result is therefore ["'` +\n]*not established at this setting\./u,
  );
  assert.doesNotMatch(
    runtimeSource,
    /breaks the threefold symmetry|used by (?:that|the undeformed) proof/u,
  );
});

test("Random 50/50 remains the sole finite nonperiodic calculation", () => {
  const gallery = createLatticeLabCaseGallery();
  const finiteCases = gallery.filter(
    (caseRecord) => caseRecord.calculationScope === "finite-nonperiodic",
  );
  assert.deepEqual(
    finiteCases.map(({ id }) => id),
    ["simple-cubic-random-finite-fifty-fifty-v1"],
  );
  assert.equal(
    gallery.some(
      (caseRecord) => caseRecord.calculationScope === "finite-displayed",
    ),
    false,
  );
  const random = finiteCases[0];
  const ledger = createSelectedSiteLedger(
    random,
    createReferencePolarityState(random),
    random.defaultSiteId,
  );
  const view = createLatticeLabLedgerViewModel({
    caseRecord: random,
    ledger,
    finiteNonperiodic: true,
  });
  assert.equal(view.scope, LATTICE_LAB_LEDGER_SCOPE.FINITE_NONPERIODIC);
  assert.equal(view.calculationRows.length, random.sites.length - 1);
  assert.equal("statement" in view, false);
});
