import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  buildCandidateFromCorrectedAttempt,
  buildAcceptedContinuationSourceTarget,
  validationErrors,
} from "../scripts/mass-map/a0-tier1-accepted-continuation-source-target.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/mass-map/a0-tier1-accepted-continuation-source-target.mjs", import.meta.url)
);
test("A0 Tier 1 accepted-continuation source target rejects fixture or shortcut provenance even with accepted-looking fields", () => {
  const candidate = completeAcceptedLookingCandidate({
    source_ref: "scripts/mass-map/fixtures/accepted-looking-a0-source.json",
    diagnostic_only: true,
    notes:
      "diagnostic sampled window aggregate H39 theta3minus source-normal denominator toy empirical cross-row bundle",
  });
  const report = buildAcceptedContinuationSourceTarget(candidate);

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.accepted_source_candidate_available, false);
  assert.equal(report.authorizes_retained_pressure_row_provider, false);
  assert.deepEqual(report.missing_or_rejected_fields, ["source_ref"]);
  assert.equal(report.rejected_source_family_codes.includes("fixture_ref"), true);
  assert.equal(report.rejected_source_family_codes.includes("diagnostic_row"), true);
  assert.equal(report.rejected_source_family_codes.includes("sampled_window"), true);
  assert.equal(report.rejected_source_family_codes.includes("aggregate_row"), true);
  assert.equal(report.rejected_source_family_codes.includes("h39_theta3minus_quotient_row"), true);
  assert.equal(report.rejected_source_family_codes.includes("source_normal_denominator_machinery"), true);
  assert.equal(report.rejected_source_family_codes.includes("toy_or_empirical_row"), true);
  assert.equal(report.rejected_source_family_codes.includes("cross_row_bundle"), true);
});

test("A0 Tier 1 accepted-continuation source target keeps positive non-fixture candidates non-authorizing", () => {
  const report = buildAcceptedContinuationSourceTarget(completeAcceptedLookingCandidate());

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.accepted_source_candidate_available, true);
  assert.equal(report.first_failure, null);
  assert.equal(report.first_missing_field, null);
  assert.equal(report.authorizes_retained_pressure_row_provider, false);
  assert.equal(report.pressure_row_provider_binding_required.same_record_binding, true);
  assert.equal(
    report.pressure_row_provider_binding_required.keeps_pressure_row_non_authorizing_until_accepted,
    true
  );
});

test("A0 Tier 1 source target translates corrected rerun residuals without accepting them", () => {
  const candidate = buildCandidateFromCorrectedAttempt(correctedAttemptArtifact(), {
    sourceRef: "reports/a0-tier1/corrected-rerun.json",
  });
  const report = buildAcceptedContinuationSourceTarget(candidate);

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.accepted_source_candidate_available, false);
  assert.equal(report.authorizes_retained_pressure_row_provider, false);
  assert.equal(report.provider_source_status, "diagnostic_failed_direct_one_period_residuals");
  assert.equal(report.first_missing_field, "provider_source_status");
  assert.equal(report.rejected_source_family_codes.includes("diagnostic_row"), true);
  assert.equal(
    report.corrected_rerun_source_boundary.first_failed_proof_field,
    "direct_one_period_residual_ledger.residuals_below_tolerance"
  );
  assert.equal(
    report.missing_or_rejected_fields_by_group.direct_one_period_residual_ledger.includes(
      "direct_one_period_residual_ledger.residuals_below_tolerance"
    ),
    true
  );
  assert.equal(report.corrected_rerun_source_boundary.pass_fail_fields.no_secular_center_drift, true);
  assert.equal(report.corrected_rerun_source_boundary.pass_fail_fields.Delta_k_positive, false);
  assert.equal(report.corrected_rerun_source_boundary.measured_residuals.R_root, 40.11722462935903);
});

test("A0 Tier 1 source target CLI emits measured corrected-rerun boundary", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-tier1-source-target-attempt-"));
  const attemptPath = path.join(tempDir, "attempt.json");
  const reportPath = path.join(tempDir, "report.json");
  fs.writeFileSync(attemptPath, `${JSON.stringify(correctedAttemptArtifact())}\n`);

  execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--from-corrected-attempt", attemptPath, "--out", reportPath, "--pretty"],
    { encoding: "utf8" }
  );

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.equal(report.accepted_source_candidate_available, false);
  assert.equal(report.first_missing_field, "provider_source_status");
  assert.equal(
    report.corrected_rerun_source_boundary.first_failed_proof_field,
    "direct_one_period_residual_ledger.residuals_below_tolerance"
  );

  const validation = JSON.parse(
    execFileSync(process.execPath, [SCRIPT_PATH, "--validate", reportPath, "--pretty"], {
      encoding: "utf8",
    })
  );
  assert.equal(validation.valid, true);
});

function completeAcceptedLookingCandidate(overrides = {}) {
  return {
    provider_source_status: "accepted_non_fixture_source",
    source_ref: "reports/a0-tier1/accepted-continuation-source-row.json",
    accepted_status: true,
    branch_certificate_ref: "branch-certificate:a0-tier1-row-1",
    same_domain_record_ref: "a0-tier1-row-1",
    active_root_or_live_ledger_identity: "a0-live-ledger:row-1",
    branch_local_projection_or_normalization_identity: "a0-quotient-row:row-1",
    direct_one_period_residual_ledger: {
      status: "pass",
      residuals_below_tolerance: true,
      residual_vector: {
        R_state: 0,
        R_root: 0,
        R_phase: 0,
        R_E: 0,
        R_drift: 0,
        R_speed: 0,
        R_lock: 0,
      },
    },
    no_secular_center_drift: {
      status: "pass",
      pass: true,
    },
    quotient_row_identity: {
      status: "pass",
      branch_label: { k: { I: 60, M: 5, O: 1 }, q: { IM: 55, MO: 4, IO: 59 } },
      z_lambda: { value: "non-null" },
      source_row_identity_matches: true,
    },
    quotient_monodromy: {
      status: "pass",
      Delta_k: 1,
      Delta_k_positive: true,
    },
    eta_ladder_persistence: {
      status: "pass",
      same_branch_persists_across_eta_ladder: true,
      eta_values: [1, 0.5, 0.25, 0.125],
      quotient_row_identity_carried: true,
    },
    retained_source_binding: {
      retained_record_id: "retained:a0-tier1-row-1",
      source_record_id: "source:a0-tier1-row-1",
      source_artifact_hash: "sha256:a0-tier1-row-1",
      causal_root_replay_ref: "causal-root-replay:a0-tier1-row-1",
    },
    receiver_normal_branch_strength: {
      D_s: "D_s:a0-tier1-row-1",
      D_t: "D_t:a0-tier1-row-1",
      W_rec: "W_rec:a0-tier1-row-1",
      retained_root_row_ids: ["root-row:a0-tier1-row-1"],
    },
    benchmark_exclusion: {
      benchmark_inputs_excluded: true,
      excluded_source_families: [
        "fixture_ref",
        "proxy_ref",
        "diagnostic_row",
        "sampled_window",
        "aggregate_row",
        "h39_theta3minus_quotient_row",
        "source_normal_denominator_machinery",
        "toy_or_empirical_row",
        "cross_row_bundle",
      ],
    },
    ...overrides,
  };
}

function correctedAttemptArtifact() {
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
    metadata: {
      status: "failed_direct_one_period_residuals",
    },
    rows: [
      {
        schema: "a0-tier1-fold-layer-locked-one-period-attempt-row/v1",
        row: 1,
        status: "failed_direct_one_period_residuals",
        correction_context: {
          status: "correction_context_ready",
          accepted_history_boundary: false,
        },
        validation: {
          source_row_present: true,
          no_secular_center_drift: true,
          benchmark_inputs_excluded: true,
        },
        source_row: {
          branch_label: { k: { I: 60, M: 5, O: 1 }, q: { IM: 55, MO: 4, IO: 59 } },
          z_lambda: null,
        },
        active_causal_root_ledger: [{ root_key: "I+|I-|partner|active" }],
        accepted_history_boundary: {
          status_is_accepted_history_segment: false,
          residuals_below_tolerance: false,
          no_secular_center_drift: true,
          Delta_k_positive: false,
          same_branch_persists_across_eta_ladder: false,
        },
        residual_ledgers: {
          state_return: {
            status: "failed",
            max_state_return_residual: 0.9417358421826848,
          },
          root_closure: {
            status: "failed",
            max_root_residual: 40.11722462935903,
          },
          phase_closure: {
            status: "failed",
            phase_closure_residual: 0.2805922454402012,
          },
          energy_like_speed: {
            status: "failed",
            energy_like_speed_residual: 0.8721683631666627,
          },
          center_drift: {
            status: "passed",
            max_center_drift: 9.97938043855093e-17,
          },
          speed_ordering: {
            status: "failed",
            max_speed_ordering_residual: 1.5917291613135518,
          },
          fold_layer_lock: {
            status: "passed",
          },
          monodromy: {
            status: "not_computed",
            Delta_k: null,
            Delta_k_positive: false,
          },
          eta_ladder: {
            status: "not_computed",
            same_branch_persists_across_eta_ladder: false,
          },
          residual_balance: {
            relative_residual: 0.9925655644010825,
          },
          refined_i_receiver_phase_bin_residual_balance: {
            relative_residual: 0.3500173344435869,
          },
        },
      },
    ],
  };
}
