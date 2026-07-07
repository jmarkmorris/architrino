import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  AUTHORITY_CLASS,
  CANDIDATE_A_FCC,
  DEFAULT_ROWS,
  PUMP_BAND_HI_COEFF,
  PUMP_BAND_LO_COEFF,
  SCHEMA,
  SEED_PATH_CERTIFICATE_FIELD,
  SEED_PATH_CERTIFICATE_OBJECT,
  buildFailClosedAuthorization,
  buildFoldCrossingClickImpulseDiagnostic,
  buildSyntheticFoldWorldline,
  computeChartClickImpulse,
  computeConvergenceWitness,
  computeCutDistanceSensitivity,
  computeRegularizationInvarianceWitness,
  evaluateFoldCrossingClickImpulseEvidence,
} from "../scripts/braid-ideal/fold-crossing-click-impulse-diagnostic.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/fold-crossing-click-impulse-diagnostic.mjs", import.meta.url)
);

function syntheticWorldline() {
  return buildSyntheticFoldWorldline({ betaStart: 0.9, rampRate: 0.4 });
}

test("chart click impulse is absorptive on the canonical fold channel while the naive kernel is ejective", () => {
  const worldline = syntheticWorldline();
  const result = computeChartClickImpulse({ worldline });
  assert.equal(result.definable, true);
  assert.equal(result.sign, "absorptive");
  assert.ok(result.chartImpulse < 0, "signed chart impulse must be negative (absorptive)");
  // Naive absolute branch weight reads the opposite (ejective) sign on the same chart.
  assert.ok(result.naiveImpulse > 0, "naive absolute-weight impulse must be positive (ejective)");
});

test("fold birth carries the super-field receiver / sub-field source sign structure", () => {
  const worldline = syntheticWorldline();
  const { birth } = computeChartClickImpulse({ worldline });
  assert.ok(birth.receiverNormalNumerator < 0, "receiver is super-field along the ray: D_T < 0");
  assert.ok(birth.sourceNormalDenominator > 0, "source (own past) is sub-field: D_s > 0");
  assert.ok(birth.signedBranchOrientation < 0, "signed branch orientation m = D_T / D_s < 0");
});

test("chart impulse converges under nstep refinement with a fixed sign", () => {
  const worldline = syntheticWorldline();
  const witness = computeConvergenceWitness({ worldline });
  assert.equal(witness.converged, true);
  assert.equal(witness.signStable, true);
  assert.equal(witness.convergedSign, "absorptive");
});

test("chart impulse is invariant under softening / Jacobian floor / self-hit min-delay while the naive impulse drifts", () => {
  const worldline = syntheticWorldline();
  const witness = computeRegularizationInvarianceWitness({ worldline });
  assert.equal(witness.chartImpulseInvariant, true);
  assert.equal(witness.naiveImpulseDrifts, true);
  // Every regularization triple keeps the absorptive sign.
  for (const row of witness.rows) {
    assert.equal(row.sign, "absorptive");
  }
});

test("chart impulse sign is stable across coincidence cuts while the magnitude diverges", () => {
  const worldline = syntheticWorldline();
  const witness = computeCutDistanceSensitivity({ worldline });
  assert.equal(witness.signStableAcrossCuts, true);
  assert.equal(witness.stableSign, "absorptive");
  // Magnitude grows without bound as the resolved chord shrinks (coincidence stratum).
  assert.equal(witness.magnitudeGrowsAsCutShrinks, true);
});

test("hermetic diagnostic build resolves to the absorptive-sign / coincidence-magnitude decision, fail-closed", () => {
  const artifact = buildFoldCrossingClickImpulseDiagnostic();
  assert.equal(artifact.schema, SCHEMA);
  assert.equal(artifact.claim_level, "diagnostic_only");
  assert.equal(artifact.candidate_a_fcc, CANDIDATE_A_FCC);
  assert.equal(artifact.rows.length, DEFAULT_ROWS.length);
  assert.equal(
    artifact.mechanism_decision,
    "absorptive_branch_orientation_sign_regulator_independent_magnitude_coincidence_sensitive_refines_rigid_rotation_m_equals_one"
  );
  // The proof-moving quantity is the sign; the magnitude is not regulator-independent.
  assert.equal(artifact.sign_result.sign, "absorptive");
  assert.equal(artifact.sign_result.regulator_independent, true);
  assert.equal(artifact.magnitude_result.regulator_independent, false);
  assert.equal(artifact.magnitude_coincidence_sensitive, true);
  assert.equal(artifact.all_rows_sign_stable, true);
  assert.deepEqual(artifact.provably_independent_of, [
    "softening",
    "jacobian_floor",
    "self_hit_minimum_delay",
  ]);
});

test("each row books a diagnostic-only h_act ledger row against the certified pump band", () => {
  const artifact = buildFoldCrossingClickImpulseDiagnostic();
  for (const row of artifact.rows) {
    const ledger = row.h_act_ledger_row;
    assert.equal(ledger.row_kind, "h_act_ledger_row");
    assert.equal(ledger.diagnostic_only, true);
    assert.equal(ledger.fail_closed, true);
    assert.equal(ledger.transacted_action_unit, "h_act");
    assert.equal(ledger.transacted_cycle_increment, "-1*h_act");
    assert.equal(ledger.absorber_vs_ejector_decision, "click_absorbs_pumped_tangential_action");
    assert.equal(ledger.first_missing_object, SEED_PATH_CERTIFICATE_OBJECT);
    // Certified tangential pump band is carried for the comparison.
    const band = row.pump_band;
    assert.equal(band.tangentialPumpLow, PUMP_BAND_LO_COEFF * band.beta);
    assert.equal(band.tangentialPumpHigh, PUMP_BAND_HI_COEFF * band.beta);
  }
});

test("evidence and authorization fail closed at the seed-path certificate", () => {
  const evidence = evaluateFoldCrossingClickImpulseEvidence({ schema: SCHEMA });
  assert.equal(evidence.accepted, false);
  assert.equal(evidence.first_missing_object, SEED_PATH_CERTIFICATE_OBJECT);
  assert.equal(evidence.first_missing_field, SEED_PATH_CERTIFICATE_FIELD);

  const badSchema = evaluateFoldCrossingClickImpulseEvidence({ schema: "wrong" });
  assert.equal(badSchema.accepted, false);
  assert.equal(badSchema.reason, "schema_not_fold_crossing_click_impulse_diagnostic_v0");

  const authorization = buildFailClosedAuthorization();
  assert.equal(authorization.authority_class, AUTHORITY_CLASS);
  assert.equal(authorization.accepted_retained_evidence, false);
  assert.equal(authorization.retained_branch_claim, false);
  assert.equal(authorization.accepted_stability_claim, false);
  assert.equal(authorization.accepted_click_mechanism_closure, false);
  assert.equal(authorization.scoreMovement, "no_score_increase");
});

test("CLI emits a fail-closed JSON artifact (hermetic)", () => {
  const stdout = execFileSync("node", [SCRIPT_PATH], { encoding: "utf8", maxBuffer: 1024 * 1024 * 16 });
  const artifact = JSON.parse(stdout);
  assert.equal(artifact.schema, SCHEMA);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.equal(artifact.evidence.accepted, false);
});
