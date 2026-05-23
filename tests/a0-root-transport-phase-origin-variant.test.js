import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const variantScriptPath = fileURLToPath(
  new URL("../scripts/mass-map/a0-root-transport-phase-origin-variant.mjs", import.meta.url)
);
const certificateScriptPath = fileURLToPath(
  new URL("../scripts/mass-map/a0-root-transport-refinement-certificate.mjs", import.meta.url)
);

function activeRoot(index, source) {
  return {
    receiver: "I+",
    source,
    relation: "inter_layer",
    status: "active",
    t: index,
    delay: 0.4 + index / 40 + (source === "O+" ? 0.05 : 0),
    J: 1.2 + index / 30 + (source === "O+" ? 0.07 : 0),
  };
}

function activeRoots(period = 8) {
  const roots = [];
  for (let index = 0; index < period; index += 1) {
    roots.push(activeRoot(index, "M+"));
    roots.push(activeRoot(index, "O+"));
  }
  return roots;
}

function sourceAttemptArtifact() {
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
    metadata: {
      artifact: "synthetic-a0-attempt",
      status: "failed_direct_one_period_residuals",
    },
    rows: [
      {
        row: 1,
        schema: "a0-tier1-fold-layer-locked-one-period-attempt-row/v1",
        status: "failed_direct_one_period_residuals",
        failure_code: "direct-one-period-residuals-failed",
        period: 8,
        active_causal_root_ledger: activeRoots(),
        residual_ledgers: {
          trajectory: {
            diagnostics: {
              locked_self_root_keys: [],
            },
          },
        },
        validation: {
          benchmark_inputs_excluded: true,
          root_ledger_stable_under_refinement: false,
        },
        branch_chart_source_records: {
          root_transport_source_record: {
            schema: "a0-root-transport-source-record/v1",
            root_count: 1,
            roots: [
              {
                root_key: "stale|record",
                D_J: 999,
              },
            ],
          },
        },
        accepted_history_boundary: false,
      },
    ],
  };
}

function writeTempJson(tempDir, name, value) {
  const filePath = path.join(tempDir, name);
  fs.writeFileSync(filePath, JSON.stringify(value), "utf8");
  return filePath;
}

function runVariant(sourcePath, tempDir, shift) {
  const outPath = path.join(tempDir, `variant-${shift}.json`);
  execFileSync(
    process.execPath,
    [
      variantScriptPath,
      "--source",
      sourcePath,
      "--phase-shift-buckets",
      String(shift),
      "--out",
      outPath,
      "--pretty",
    ],
    { encoding: "utf8" }
  );
  return {
    path: outPath,
    artifact: JSON.parse(fs.readFileSync(outPath, "utf8")),
  };
}

function runCertificate(baselinePath, variantPath, tempDir, shift) {
  const outPath = path.join(tempDir, "certificate.json");
  execFileSync(
    process.execPath,
    [
      certificateScriptPath,
      "--baseline",
      baselinePath,
      "--variant",
      variantPath,
      "--phase-shift-buckets",
      String(shift),
      "--out",
      outPath,
      "--pretty",
    ],
    { encoding: "utf8" }
  );
  return JSON.parse(fs.readFileSync(outPath, "utf8"));
}

test("phase-origin sidecar recomputes root transport from active roots and certifies declared shift", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-root-transport-variant-"));
  const sourcePath = writeTempJson(tempDir, "source.json", sourceAttemptArtifact());
  const reference = runVariant(sourcePath, tempDir, 0);
  const variant = runVariant(sourcePath, tempDir, 2);
  const record = variant.artifact.rows[0].branch_chart_source_records.root_transport_source_record;

  assert.equal(variant.artifact.metadata.status, "phase_origin_variant_source_record_emitted");
  assert.equal(variant.artifact.accepted_history_boundary, false);
  assert.equal(variant.artifact.rerun_authority, "phase_origin_variant_certificate_input_only_not_corrected_rerun_authority");
  assert.equal(record.root_count, 16);
  assert.equal(record.phase_origin_variant.existing_root_transport_source_record_used, false);
  assert.notEqual(record.roots[0].D_J, 999);
  assert.equal(record.phase_origin_tested_offsets[1], 2);

  const certificate = runCertificate(reference.path, variant.path, tempDir, 2);
  assert.equal(certificate.status, "root_transport_refinement_certificate_passed");
  assert.equal(certificate.certificate.comparison.phase_shift_buckets, 2);
  assert.equal(certificate.source_contract.transport_id_used_for_matching, false);
});
