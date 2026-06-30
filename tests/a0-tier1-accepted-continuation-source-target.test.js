import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  buildAcceptedContinuationSourceTarget,
  validationErrors,
} from "../scripts/mass-map/a0-tier1-accepted-continuation-source-target.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/mass-map/a0-tier1-accepted-continuation-source-target.mjs", import.meta.url)
);
const A0_BRANCH_SOURCE_PARTIAL_FIXTURE = fileURLToPath(
  new URL("../scripts/mass-map/fixtures/pressure-row-branch-intake-a0-branch-source-partial.json", import.meta.url)
);

test("A0 Tier 1 accepted-continuation source target rejects current fixture-backed partial", () => {
  const fixture = JSON.parse(fs.readFileSync(A0_BRANCH_SOURCE_PARTIAL_FIXTURE, "utf8"));
  const report = buildAcceptedContinuationSourceTarget(fixture, {
    sourceRef: A0_BRANCH_SOURCE_PARTIAL_FIXTURE,
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.schema, "a0-tier1-accepted-continuation-source/v1");
  assert.equal(report.claim_level, "fail-closed producer target, not accepted continuation evidence");
  assert.equal(report.accepted_source_candidate_available, false);
  assert.equal(report.authorizes_retained_pressure_row_provider, false);
  assert.equal(report.first_failure, "accepted_tier1_continuation_source_missing");
  assert.equal(report.first_missing_field, "provider_source_status");
  assert.equal(report.rejected_source_family_codes.includes("fixture_ref"), true);
  assert.equal(report.rejected_source_family_codes.includes("diagnostic_row"), true);
  assert.equal(
    report.missing_or_rejected_fields_by_group.provider_provenance.includes("branch_certificate_ref"),
    true
  );
  assert.equal(
    report.missing_or_rejected_fields_by_group.direct_one_period_residual_ledger.includes(
      "direct_one_period_residual_ledger.residuals_below_tolerance"
    ),
    true
  );
  assert.equal(
    report.missing_or_rejected_fields_by_group.quotient_monodromy.includes(
      "quotient_monodromy.Delta_k_positive"
    ),
    true
  );
  assert.equal(
    report.missing_or_rejected_fields_by_group.eta_ladder_persistence.includes(
      "eta_ladder_persistence.same_branch_persists_across_eta_ladder"
    ),
    true
  );
  assert.equal(
    report.missing_or_rejected_fields_by_group.retained_source_binding.includes(
      "retained_source_binding.source_artifact_hash"
    ),
    true
  );
  assert.equal(
    report.missing_or_rejected_fields_by_group.receiver_normal_branch_strength.includes(
      "receiver_normal_branch_strength.W_rec"
    ),
    true
  );
});

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

test("A0 Tier 1 accepted-continuation source target CLI emits and validates fixture-backed partial report", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-tier1-source-target-"));
  const reportPath = path.join(tempDir, "report.json");

  execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--source", A0_BRANCH_SOURCE_PARTIAL_FIXTURE, "--out", reportPath, "--pretty"],
    { encoding: "utf8" }
  );

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.equal(report.accepted_source_candidate_available, false);
  assert.equal(report.first_missing_field, "provider_source_status");

  const validation = JSON.parse(
    execFileSync(process.execPath, [SCRIPT_PATH, "--validate", reportPath, "--pretty"], {
      encoding: "utf8",
    })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.first_failure, "accepted_tier1_continuation_source_missing");
  assert.equal(validation.first_missing_field, "provider_source_status");
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
