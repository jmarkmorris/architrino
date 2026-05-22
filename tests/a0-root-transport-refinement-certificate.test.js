import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(
  new URL("../scripts/mass-map/a0-root-transport-refinement-certificate.mjs", import.meta.url)
);

function rootAt({ index, source, period, transportIdPrefix = "baseline" }) {
  const phase = (2 * Math.PI * index) / period;
  const rootKey = `I+|${source}|inter_layer|active`;
  return {
    root_key: rootKey,
    receiver: "I+",
    source,
    relation: "inter_layer",
    status: "active",
    t: index,
    theta: phase / 3,
    D_tau: 1 + index / 20,
    D_J: 2 + index / 10,
    G_r: 1 + index / 30,
    transport_id: `single_artifact_root_transport:${transportIdPrefix}:${source}:${index}`,
    transport_identity_components: {
      root_key: rootKey,
      cyclic_slot: index,
      same_key_root_count: period,
    },
    transport_identity_status: "single_artifact_not_refinement_stable",
    locked_fold_layer_key: false,
  };
}

function shiftedRoots({ period = 8, shift = 0, perturb = false, dropLast = false, transportIdPrefix = "variant" } = {}) {
  const roots = [];
  for (let index = 0; index < period; index += 1) {
    for (const source of ["M+", "O+"]) {
      const root = rootAt({ index, source, period, transportIdPrefix });
      root.t = (index + shift) % period;
      if (perturb && index === 3 && source === "M+") {
        root.D_J += 0.25;
      }
      roots.push(root);
    }
  }
  return dropLast ? roots.slice(0, -1) : roots;
}

function artifact({ shift = 0, perturb = false, dropLast = false, transportIdPrefix = "baseline" } = {}) {
  const roots = shiftedRoots({ shift, perturb, dropLast, transportIdPrefix });
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
    rows: [
      {
        row: 1,
        branch_chart_source_records: {
          root_transport_source_record: {
            schema: "a0-root-transport-source-record/v1",
            source: "active_causal_root_ledger",
            coordinate_family: "I_receiver_inter_layer_J_delay_shear",
            period: 8,
            root_count: roots.length,
            active_root_count: roots.length,
            bucket_spacing: 1,
            gap_normalizer: 1,
            gap_source: "nearest_same-key_active_root_time_gap",
            default_root_transport_quotient: "source_layer_shear",
            declared_root_transport_quotients: ["source_layer_shear"],
            transport_identity_schema: "a0-root-transport-identity/v1",
            transport_identity_scope: "single_artifact_cyclic_root_slot",
            transport_identity_rule:
              "transport_id is scoped to this synthetic artifact and is not a refinement-stable identity.",
            transport_identity_refinement_stable: false,
            phase_origin_covariance_schema: "a0-root-transport-phase-origin-covariance/v1",
            phase_origin_covariance_status: "single-artifact-phase-origin-not-certified",
            phase_origin_covariance_certified: false,
            phase_origin_tested_offsets: [0],
            phase_origin_covariance_rule: "Compare quotient features after cyclic reindexing.",
            phase_origin_rule:
              "theta=2*pi*(t-delay)/T mod 2*pi; D_tau and D_J use cyclic central differences by root_key over observation phase.",
            equality_group_key:
              "receiver + source + relation + status + declared quotient + phase origin + single-artifact transport slot",
            locked_fold_layer_keys_excluded: true,
            benchmark_inputs_excluded: true,
            root_transport_certified: false,
            transport_certification_status: "single-artifact-source-record-only",
            roots,
          },
        },
      },
    ],
  };
}

function runCertificate(baselineArtifact, variantArtifact, args = []) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-root-transport-cert-"));
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

test("root-transport certificate passes a cyclic phase-origin reindexing without transport_id matching", () => {
  const output = runCertificate(artifact({ transportIdPrefix: "a" }), artifact({ shift: 2, transportIdPrefix: "b" }), [
    "--phase-shift-buckets",
    "2",
  ]);

  assert.equal(output.status, "root_transport_refinement_certificate_passed");
  assert.equal(output.source_contract.transport_id_used_for_matching, false);
  assert.equal(output.certificate.transport_identity_refinement_stable, true);
  assert.equal(output.certificate.phase_origin_covariance_certified, true);
  assert.equal(output.certificate.comparison.phase_shift_buckets, 2);
  assert.equal(output.certificate.comparison.max_feature_relative_delta, 0);
});

test("root-transport certificate auto-detects the best cyclic phase shift", () => {
  const output = runCertificate(artifact({ transportIdPrefix: "a" }), artifact({ shift: 3, transportIdPrefix: "b" }));

  assert.equal(output.status, "root_transport_phase_shift_diagnostic_only");
  assert.equal(output.failure_code, "root-transport-phase-shift-not-declared");
  assert.equal(output.certificate.comparison.phase_shift_buckets, 3);
  assert.equal(output.certificate.diagnostic_phase_shift_detected, true);
  assert.equal(output.certificate.transport_identity_refinement_stable, false);
});

test("root-transport certificate fails when quotient features are not covariant", () => {
  const output = runCertificate(
    artifact({ transportIdPrefix: "a" }),
    artifact({ shift: 2, perturb: true, transportIdPrefix: "b" }),
    ["--phase-shift-buckets", "2"]
  );

  assert.equal(output.status, "root_transport_phase_origin_covariance_fail");
  assert.equal(output.failure_code, "root-transport-quotient-features-not-covariant");
  assert.ok(output.certificate.comparison.max_feature_relative_delta > 0.01);
});

test("root-transport certificate fails when root-key cyclic counts differ", () => {
  const output = runCertificate(
    artifact({ transportIdPrefix: "a" }),
    artifact({ shift: 2, dropLast: true, transportIdPrefix: "b" }),
    ["--phase-shift-buckets", "2"]
  );

  assert.equal(output.status, "root_transport_identity_refinement_fail");
  assert.equal(output.failure_code, "root-key-count-mismatch");
  assert.equal(output.certificate.comparison.mismatch_count, 1);
});

test("root-transport certificate fails when selected quotient is not source-declared", () => {
  const candidate = artifact({ shift: 2, transportIdPrefix: "b" });
  candidate.rows[0].branch_chart_source_records.root_transport_source_record.declared_root_transport_quotients = [];
  const output = runCertificate(artifact({ transportIdPrefix: "a" }), candidate, [
    "--phase-shift-buckets",
    "2",
  ]);

  assert.equal(output.status, "root_transport_source_metadata_mismatch");
  assert.equal(output.failure_code, "root-transport-quotient-not-source-declared");
});
