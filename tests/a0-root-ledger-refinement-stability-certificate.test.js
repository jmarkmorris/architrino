import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(
  new URL("../scripts/mass-map/a0-root-ledger-refinement-stability-certificate.mjs", import.meta.url)
);

function activeRoot(index, source, { perturbJ = false, shift = 0 } = {}) {
  return {
    receiver: "I+",
    source,
    relation: "inter_layer",
    status: "active",
    t: (index + shift) % 8,
    delay: 0.4 + index / 40 + (source === "O+" ? 0.05 : 0),
    J: 1.2 + index / 30 + (source === "O+" ? 0.07 : 0) + (perturbJ && index === 3 && source === "M+" ? 0.01 : 0),
  };
}

function activeRoots(options = {}) {
  const roots = [];
  for (let index = 0; index < 8; index += 1) {
    roots.push(activeRoot(index, "M+", options));
    roots.push(activeRoot(index, "O+", options));
  }
  return roots;
}

function artifact({ roots = activeRoots(), phaseOriginVariant = false } = {}) {
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
    metadata: {
      artifact: phaseOriginVariant ? "a0-root-transport-phase-origin-variant" : "synthetic-a0-refinement",
    },
    rerun_authority: phaseOriginVariant
      ? "phase_origin_variant_certificate_input_only_not_corrected_rerun_authority"
      : "certificate_only_not_corrected_rerun_authority",
    rows: [
      {
        schema: "a0-tier1-fold-layer-locked-one-period-attempt-row/v1",
        row: 1,
        period: 8,
        validation: {
          benchmark_inputs_excluded: true,
          root_ledger_stable_under_refinement: false,
        },
        active_causal_root_ledger: roots,
        phase_origin_variant: phaseOriginVariant
          ? {
              schema: "a0-root-transport-phase-origin-variant/v1",
              variant_kind: "declared_phase_origin_bucket_shift",
            }
          : null,
      },
    ],
  };
}

function carrierReplayVariantArtifact({ roots = activeRoots(), delayDriftCount = 0 } = {}) {
  return {
    artifact_schema: "a0-tier1-continuation-source-prototype/v1",
    rows: [
      {
        schema: "a0-tier1-continuation-source-prototype-row/v1",
        row: 1,
        period: 8,
        validation: {
          benchmark_inputs_excluded: true,
          root_ledger_stable_under_refinement: delayDriftCount === 0,
        },
        active_causal_root_ledger: roots,
        diagnostics: {
          root_ledger_refinement: {
            status:
              delayDriftCount === 0
                ? "carrier-root-ledger-refinement-passed"
                : "carrier-root-ledger-refinement-failed",
            scope: "carrier_root_replay_only",
            acceptance_scope:
              "Sets only validation.root_ledger_stable_under_refinement for provisional carrier-root identity and delay stability; it does not establish Tier 1 continuation acceptance.",
            failure_code: delayDriftCount === 0 ? null : "carrier-root-refinement-delay-drift",
            warning_code: "carrier-root-refinement-J-drift-reported",
            root_ledger_stable_under_refinement: delayDriftCount === 0,
            relation_coverage_stable: true,
            source_coverage_stable: true,
            comparison: {
              shared_observation_time_count: 8,
              shared_time_base_active_root_count: 16,
              shared_time_refined_active_root_count: 16,
              matched_root_count: 16,
              missing_in_refined_count: 0,
              extra_in_refined_at_shared_times_count: 0,
              ambiguous_match_count: 0,
              max_delay_drift: delayDriftCount === 0 ? 0.000001 : 0.01,
              max_J_drift: 0.0001,
              delay_match_tolerance: 0.000008,
              J_match_tolerance: 0.000008,
              delay_drift_count: delayDriftCount,
              J_drift_count: 2,
              intermediate_refined_active_root_count: 16,
              J_drift_attribution: {
                status: "carrier-root-J-drift-attribution-warning",
                attribution_code: "carrier-root-J-drift-velocity-direction-sensitivity-dominated",
              },
            },
          },
        },
      },
    ],
  };
}

function runCertificate(baselineArtifact, variantArtifact, args = ["--variant-kind", "delta_t_refinement"]) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-root-ledger-cert-"));
  const baselinePath = path.join(tempDir, "baseline.json");
  const variantPath = path.join(tempDir, "variant.json");
  const outPath = path.join(tempDir, "out.json");
  fs.writeFileSync(baselinePath, JSON.stringify(baselineArtifact), "utf8");
  fs.writeFileSync(variantPath, JSON.stringify(variantArtifact), "utf8");
  execFileSync(process.execPath, [scriptPath, "--baseline", baselinePath, "--variant", variantPath, "--out", outPath, "--pretty", ...args], {
    encoding: "utf8",
  });
  return JSON.parse(fs.readFileSync(outPath, "utf8"));
}

function runCertificateSamePath(sourceArtifact, args = ["--variant-kind", "delta_t_refinement"]) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-root-ledger-cert-same-"));
  const sourcePath = path.join(tempDir, "source.json");
  const outPath = path.join(tempDir, "out.json");
  fs.writeFileSync(sourcePath, JSON.stringify(sourceArtifact), "utf8");
  execFileSync(process.execPath, [scriptPath, "--baseline", sourcePath, "--variant", sourcePath, "--out", outPath, "--pretty", ...args], {
    encoding: "utf8",
  });
  return JSON.parse(fs.readFileSync(outPath, "utf8"));
}

test("root-ledger stability certificate passes matching active ledgers without transport ids", () => {
  const output = runCertificate(artifact(), artifact());

  assert.equal(output.artifact_schema, "a0-root-ledger-refinement-stability-certificate/v1");
  assert.equal(output.status, "root_ledger_refinement_stability_certificate_passed");
  assert.equal(output.accepted_history_boundary, false);
  assert.equal(output.rerun_authority, "certificate_only_not_corrected_rerun_authority");
  assert.equal(output.parameters.phase_origin_reindexing_allowed, false);
  assert.equal(output.certificate.root_ledger_stable_under_refinement, true);
  assert.equal(output.certificate.matched_without_transport_id, true);
  assert.equal(output.certificate.phase_origin_shift_used_for_matching, false);
  assert.equal(output.certificate.comparison.matched_root_count, 16);
  assert.equal(output.certificate.comparison.max_field_relative_delta, 0);
});

test("root-ledger stability certificate rejects same artifact paths", () => {
  const output = runCertificateSamePath(artifact());

  assert.equal(output.status, "blocked_same_artifact_not_refinement_variant");
  assert.equal(output.failure_code, "same-artifact-not-a-root-ledger-refinement-variant");
  assert.equal(output.certificate.root_ledger_stable_under_refinement, false);
});

test("root-ledger stability certificate rejects phase-origin variants", () => {
  const output = runCertificate(artifact(), artifact({ phaseOriginVariant: true }), [
    "--variant-kind",
    "declared_phase_origin_bucket_shift",
  ]);

  assert.equal(output.status, "blocked_phase_origin_variant_not_refinement");
  assert.equal(output.failure_code, "phase-origin-variant-not-root-ledger-refinement");
  assert.equal(output.certificate.phase_origin_variant_detected, true);
  assert.ok(output.source_contract.phase_origin_variant_evidence.length >= 1);
});

test("root-ledger stability certificate fails active-root field drift", () => {
  const output = runCertificate(artifact(), artifact({ roots: activeRoots({ perturbJ: true }) }));

  assert.equal(output.status, "root_ledger_field_refinement_fail");
  assert.equal(output.failure_code, "active-root-field-drift");
  assert.equal(output.certificate.comparison.field_drift_count, 1);
});

test("root-ledger stability certificate fails cyclic phase shifts as active-root drift", () => {
  const output = runCertificate(artifact(), artifact({ roots: activeRoots({ shift: 1 }) }));

  assert.equal(output.status, "root_ledger_field_refinement_fail");
  assert.equal(output.failure_code, "active-root-field-drift");
  assert.ok(output.certificate.comparison.field_drift_count > 0);
});

test("root-ledger stability certificate consumes carrier-replay refinement diagnostics", () => {
  const output = runCertificate(artifact(), carrierReplayVariantArtifact(), [
    "--variant-kind",
    "carrier_root_replay_refinement",
    "--tolerance",
    "0.00001",
  ]);

  assert.equal(output.status, "root_ledger_refinement_stability_certificate_passed");
  assert.equal(output.inputs.variant_schema, "a0-tier1-continuation-source-prototype/v1");
  assert.equal(output.source_contract.refinement_evidence_source, "carrier_replay_root_refinement_diagnostic");
  assert.equal(output.source_contract.refinement_diagnostic_warning_code, "carrier-root-refinement-J-drift-reported");
  assert.equal(output.certificate.root_ledger_stable_under_refinement, true);
  assert.equal(output.certificate.comparison.carrier_root_replay.J_drift_count, 2);
});

test("root-ledger stability certificate rejects carrier-replay fingerprint mismatch", () => {
  const output = runCertificate(artifact(), carrierReplayVariantArtifact({ roots: activeRoots({ shift: 1 }) }), [
    "--variant-kind",
    "carrier_root_replay_refinement",
    "--tolerance",
    "0.00001",
  ]);

  assert.equal(output.status, "root_ledger_carrier_replay_refinement_fail");
  assert.equal(output.failure_code, "carrier-root-refinement-baseline-ledger-fingerprint-mismatch");
});
