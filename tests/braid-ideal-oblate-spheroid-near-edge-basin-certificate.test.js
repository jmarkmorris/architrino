import assert from "node:assert/strict";
import test from "node:test";

import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  SCHEMA,
  buildOblateSpheroidNearEdgeBasinCertificate,
  evaluateOblateSpheroidNearEdgeBasinCertificateEvidence,
  validateOblateSpheroidNearEdgeBasinCertificate,
} from "../scripts/braid-ideal/oblate-spheroid-near-edge-basin-certificate.mjs";

function makeSweepRow({
  u,
  vOrb,
  residual,
  objective,
  betaMax,
  rootBudgetMargin,
  partnerCoverage = 1,
  bounded = true,
}) {
  return {
    row_id: `two-speed-row:u_${u}:v_orb_${vOrb}`,
    schema: "oblate_spheroid_two_speed_deformation_sweep_row.v0",
    u,
    v_orb: vOrb,
    chi: Math.sqrt(Math.max(0, 1 - u * u)),
    candidate_objective: objective,
    speed_budget: {
      beta_max: betaMax,
      root_budget_margin: rootBudgetMargin,
    },
    residual_status: {
      normalized_residual: residual,
      sampled_wake_residual_diagnostic: {
        directed_partner_root_coverage: partnerCoverage,
        directed_self_root_coverage: 0,
        directed_self_pairs_with_roots: 0,
      },
    },
    root_ledger_status: {
      retained_root_ledger_ref: null,
    },
    return_status: {
      bounded_return_observed: bounded,
      stable_support_radius_observed: bounded,
      branch_curve_candidate: bounded,
      branch_curve_objective: bounded ? objective : null,
      dynamic_return_probe: {
        bounded_return_observed: bounded,
        stable_support_radius_observed: bounded,
        max_field_speed: bounded ? Math.min(0.999, betaMax + 0.01) : Math.max(1.001, betaMax),
        root_budget_margin: bounded ? Math.max(0.001, rootBudgetMargin - 0.01) : Math.min(-0.001, rootBudgetMargin),
        final_metrics: {
          position_return_rms: bounded ? 0.05 : 0.5,
          velocity_return_rms: bounded ? 0.02 : 0.4,
        },
        max_radius_mean_deviation: bounded ? 0.02 : 0.4,
        support_term: {
          rms_acceleration: 0.03,
        },
        branch_clock_lock_term: {
          rms_acceleration: 0.05,
        },
      },
    },
    accepted: false,
  };
}

function nearEdgeFixtureRows() {
  return [
    makeSweepRow({ u: 0.76, vOrb: 0.18, residual: 0.78, objective: 0.68, betaMax: 0.91, rootBudgetMargin: 0.09 }),
    makeSweepRow({ u: 0.76, vOrb: 0.2, residual: 0.74, objective: 0.64, betaMax: 0.93, rootBudgetMargin: 0.07 }),
    makeSweepRow({ u: 0.76, vOrb: 0.22, residual: 0.72, objective: 0.62, betaMax: 0.95, rootBudgetMargin: 0.05 }),
    makeSweepRow({ u: 0.78, vOrb: 0.18, residual: 0.76, objective: 0.66, betaMax: 0.94, rootBudgetMargin: 0.06 }),
    makeSweepRow({ u: 0.78, vOrb: 0.2, residual: 0.7, objective: 0.5, betaMax: 0.96, rootBudgetMargin: 0.04 }),
    makeSweepRow({ u: 0.78, vOrb: 0.22, residual: 0.66, objective: 0.46, betaMax: 1.01, rootBudgetMargin: -0.01 }),
    makeSweepRow({ u: 0.8, vOrb: 0.18, residual: 0.75, objective: 0.65, betaMax: 0.95, rootBudgetMargin: 0.05 }),
    makeSweepRow({ u: 0.8, vOrb: 0.2, residual: 0.67, objective: 0.45, betaMax: 1.02, rootBudgetMargin: -0.02 }),
    makeSweepRow({ u: 0.8, vOrb: 0.22, residual: 0.65, objective: 0.44, betaMax: 1.05, rootBudgetMargin: -0.05 }),
  ];
}

test("near-edge positive-margin row produces a non-authorizing basin certificate", () => {
  const artifact = buildOblateSpheroidNearEdgeBasinCertificate({
    sourceArtifact: {
      schema: "oblate_spheroid_two_speed_deformation_sweep.v0",
      row_id: "two-speed-sweep:test",
      rows: nearEdgeFixtureRows(),
    },
  });
  const repeated = buildOblateSpheroidNearEdgeBasinCertificate({
    sourceArtifact: {
      schema: "oblate_spheroid_two_speed_deformation_sweep.v0",
      row_id: "two-speed-sweep:test",
      rows: nearEdgeFixtureRows(),
    },
  });

  assert.deepEqual(artifact, repeated);
  assert.equal(artifact.schema, SCHEMA);
  assert.equal(
    artifact.artifact_status,
    "priority_only_near_edge_basin_certificate_present_retained_evidence_blocked"
  );
  assert.equal(artifact.hard_math_status, "near_edge_finite_difference_certificate_present");
  assert.equal(artifact.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(artifact.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(artifact.summary.hard_math_candidate_count, 1);
  assert.deepEqual(validateOblateSpheroidNearEdgeBasinCertificate(artifact), []);

  const candidate = artifact.near_edge_candidate_rows[0];
  assert.equal(candidate.u, 0.78);
  assert.equal(candidate.v_orb, 0.2);
  assert.equal(candidate.near_edge_status.near_edge_positive_margin, true);
  assert.equal(candidate.finite_difference.finite_difference_complete, true);
  assert.equal(candidate.edge_constrained_basin_status, "improvement_points_toward_inadmissible_beta_edge");
  assert.equal(candidate.dynamic_return_status.dynamic_bounded_return, true);
  assert.equal(candidate.partner_root_coverage_status, "directed_partner_root_coverage_full");
  assert.equal(candidate.same_source_coverage_blocker, "same_source_causal_root_coverage_absent");
  assert.equal(candidate.accepted, false);
});

test("finite-difference rows expose directional residual and objective slopes", () => {
  const artifact = buildOblateSpheroidNearEdgeBasinCertificate({ rows: nearEdgeFixtureRows() });
  const candidate = artifact.near_edge_candidate_rows[0];

  assert.equal(candidate.finite_difference.dE_du.status, "central_difference");
  assert.equal(candidate.finite_difference.dE_dv_orb.status, "central_difference");
  assert.equal(candidate.finite_difference.dObjective_du.status, "central_difference");
  assert.equal(candidate.finite_difference.dObjective_dv_orb.status, "central_difference");
  assert.equal(Math.abs(candidate.finite_difference.dE_du.value + 1.75) < 1e-10, true);
  assert.equal(Math.abs(candidate.finite_difference.dE_dv_orb.value + 2.5) < 1e-10, true);
  assert.equal(Math.abs(candidate.finite_difference.dObjective_du.value + 4.75) < 1e-10, true);
  assert.equal(Math.abs(candidate.finite_difference.dObjective_dv_orb.value + 5) < 1e-10, true);
});

test("missing finite-difference neighbors fail closed before retained evidence", () => {
  const artifact = buildOblateSpheroidNearEdgeBasinCertificate({
    rows: [
      makeSweepRow({ u: 0.78, vOrb: 0.2, residual: 0.7, objective: 0.5, betaMax: 0.96, rootBudgetMargin: 0.04 }),
    ],
  });

  assert.equal(artifact.artifact_status, "fail_closed_missing_finite_difference_neighborhood");
  assert.equal(artifact.hard_math_status, "missing_finite_difference_neighborhood");
  assert.equal(artifact.first_missing_object, "finite_difference_neighborhood_for_near_edge_basin_certificate");
  assert.equal(
    artifact.first_missing_field,
    "oblate_spheroid_near_edge_basin_certificate.rows[*].finite_difference"
  );
  assert.equal(artifact.summary.hard_math_candidate_count, 0);
  assert.deepEqual(validateOblateSpheroidNearEdgeBasinCertificate(artifact), []);
});

test("near-edge rows without bounded dynamic return fail closed", () => {
  const artifact = buildOblateSpheroidNearEdgeBasinCertificate({
    rows: nearEdgeFixtureRows().map((row) =>
      row.u === 0.78 && row.v_orb === 0.2
        ? makeSweepRow({
            u: row.u,
            vOrb: row.v_orb,
            residual: row.residual_status.normalized_residual,
            objective: row.candidate_objective,
            betaMax: row.speed_budget.beta_max,
            rootBudgetMargin: row.speed_budget.root_budget_margin,
            bounded: false,
          })
        : {
            ...row,
            return_status: {
              ...row.return_status,
              bounded_return_observed: false,
              stable_support_radius_observed: false,
              branch_curve_candidate: false,
              branch_curve_objective: null,
              dynamic_return_probe: {
                ...row.return_status.dynamic_return_probe,
                bounded_return_observed: false,
                stable_support_radius_observed: false,
                max_field_speed: 1.2,
                root_budget_margin: -0.2,
              },
            },
          }
    ),
  });

  assert.equal(artifact.artifact_status, "fail_closed_missing_bounded_dynamic_return");
  assert.equal(artifact.hard_math_status, "near_edge_rows_missing_bounded_dynamic_return");
  assert.equal(artifact.summary.hard_math_candidate_count, 0);
  assert.deepEqual(validateOblateSpheroidNearEdgeBasinCertificate(artifact), []);
});

test("inadmissible beta edge and non-positive root-budget rows are not interior evidence", () => {
  const rows = nearEdgeFixtureRows().map((row) =>
    row.u === 0.78 && row.v_orb === 0.2
      ? {
          ...row,
          speed_budget: {
            ...row.speed_budget,
            beta_max: 1,
            root_budget_margin: 0,
          },
        }
      : row
  );
  const artifact = buildOblateSpheroidNearEdgeBasinCertificate({ rows });

  assert.equal(artifact.near_edge_candidate_rows.length, 0);
  assert.equal(
    artifact.rows.some((row) => row.local_values.beta_max >= 1 && row.hard_math_candidate),
    false
  );
  assert.equal(
    artifact.rows.some((row) => row.local_values.root_budget_margin <= 0 && row.hard_math_candidate),
    false
  );
});

test("retained authorization and excluded evidence classes remain rejected", () => {
  const artifact = buildOblateSpheroidNearEdgeBasinCertificate({ rows: nearEdgeFixtureRows() });

  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.retainedBranchClaim, false);
  assert.equal(artifact.authorization.accepted_transition_source, false);
  assert.equal(artifact.authorization.moving_retained_branch_certificate, false);
  assert.equal(artifact.authorization.same_ledger_action_measure_row, false);
  assert.equal(artifact.authorization.bounded_speed_live_ledger, false);
  assert.equal(artifact.authorization.receiver_normal_branch_strength, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");

  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    assert.deepEqual(evaluateOblateSpheroidNearEdgeBasinCertificateEvidence({ evidence_class: evidenceClass }), {
      accepted: false,
      reason,
      first_missing_field: FIRST_MISSING_FIELD,
    });
  }
});
