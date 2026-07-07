import test from "node:test";
import assert from "node:assert/strict";

import {
  SCHEMA,
  asymmetricSelfHitChord,
  crossHitFold,
  softeningIndependence,
  diagnosticReport,
} from "../scripts/braid-ideal/fold-crossing-hinge-geometry-diagnostic.mjs";

test("self-hit coincidence theorem holds even for an asymmetric worldline", () => {
  const r = asymmetricSelfHitChord({ rho: 1, radialDrift: 0.15, pump: 0.4 });
  assert.equal(r.coincidenceBirthConfirmed, true);
  // fold chord shrinks monotonically toward zero as beta -> 1
  const chords = r.rows.map((x) => x.foldChord_rc);
  for (let i = 1; i < chords.length; i++) assert.ok(chords[i] > chords[i - 1]);
  assert.ok(chords[0] < 0.1); // near the crossing the chord is already tiny
});

test("cross-hit fold is born at finite chord with nonzero curvature (generic A2)", () => {
  const c = crossHitFold({ L: 1.0, g: 0.5 });
  assert.ok(Math.abs(c.foldChord_rc - 1.0) < 1e-9); // r_c = L, finite
  assert.equal(c.finiteChord, true);
  assert.ok(Math.abs(c.foldCurvature_a - -0.5) < 1e-9); // a = -g != 0
  assert.equal(c.nondegenerate, true);
  // Section 2.2 finite impulse applies and is finite
  const dp = c.sectionTwoImpulse({ kappa: 1, chi: 1, mu0: 0.5 });
  assert.ok(Number.isFinite(dp) && dp > 0);
});

test("cross-hit impulse is softening-independent (decoupled from coincidence)", () => {
  const s = softeningIndependence({ L: 1.0, g: 0.5 });
  assert.equal(s.softeningIndependent, true);
  // converges: tail spread across the smallest softenings is negligible
  assert.ok(s.tailSpread < 0.01);
  const impulses = s.values.map((v) => v.impulse);
  assert.ok(Number.isFinite(impulses[impulses.length - 1]));
});

test("finite chord decouples from softening while the window stays non-coincident", () => {
  // the click window is bounded to keep the chord finite; larger L is flatter
  const mid = softeningIndependence({ L: 1.5, g: 0.5 });
  const far = softeningIndependence({ L: 3.0, g: 0.5 });
  assert.equal(mid.softeningIndependent, true);
  assert.equal(far.softeningIndependent, true);
  assert.ok(far.tailSpread <= mid.tailSpread);
});

test("diagnostic report is fail-closed with the contingent-rescue disposition", () => {
  const r = diagnosticReport();
  assert.equal(r.schema, SCHEMA);
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.acceptedSameLevelBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
  assert.equal(r.retainedBranch, null);
  assert.equal(
    r.disposition,
    "non_coincident_cross_hit_hinge_restores_a2_finite_impulse_contingent_on_sustained_velocity_alignment"
  );
  assert.equal(r.contractRows.action_ledger_row.chart_validity, "a_nonzero_finite_chord_generic_A2_fold");
});
