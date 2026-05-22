import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_SPEED_ODE_DIAGNOSTIC_SCHEMA,
  buildOctahedralSpeedOdeDiagnostic,
  validateOctahedralSpeedOdeDiagnostic,
} from "../scripts/neutral-swarm/octahedral-speed-ode-diagnostic.mjs";

test("octahedral speed-ODE diagnostic rejects the frozen fixed-ledger primitive", () => {
  const artifact = buildOctahedralSpeedOdeDiagnostic({ phaseSamples: 120, ySubdivisions: 240 });
  const errors = validateOctahedralSpeedOdeDiagnostic(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, "neutral-swarm-octahedral-speed-ode-diagnostic/v1");
  assert.equal(artifact.packet_id, "octahedral_speed_ode_diagnostic");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.source_ledger_reference.fixed_source_status, "all-pairs-root-ledger-certified");
  assert.equal(artifact.source_ledger_reference.bounded_speed_live_ledger_status, "bounded-speed-ledger-handoff-open");
  assert.equal(artifact.sampled_root_dependency.status, "certified-root-ledger-dependency-passed");
  assert.equal(artifact.speed_ode_solvability.status, "sampled-speed-ode-zero-mean-failed");
  assert.equal(artifact.speed_ode_solvability.sampled_summary.zero_mean_failed_site_count, 6);
  assert.equal(artifact.speed_ode_solvability.sampled_summary.periodic_primitive_failed_site_count, 6);
  assert.ok(artifact.speed_ode_solvability.sampled_summary.max_zero_mean_residual > 1);
  assert.ok(artifact.speed_ode_solvability.sampled_summary.partner_mean_min > 0.18);
  assert.ok(artifact.speed_ode_solvability.sampled_summary.cross_binary_mean_abs_max < 1e-9);
  assert.ok(artifact.speed_ode_solvability.sampled_summary.cross_binary_pair_cancellation_abs_max < 1e-9);
  assert.equal(artifact.speed_ode_solvability.mean_split_certificate.status, "frozen-fixed-ledger-mean-obstruction");
  assert.equal(artifact.speed_ode_solvability.mean_split_certificate.obstructing_source_relation, "antipodal-partner");
  assert.equal(
    artifact.speed_ode_solvability.mean_split_certificate.partner_positive_certificate.status,
    "analytic-antipodal-partner-positive-mean-certified"
  );
  assert.equal(
    artifact.speed_ode_solvability.mean_split_certificate.cross_binary_cancellation_status,
    "sampled-cross-binary-pair-mean-cancellation-passed"
  );
  assert.equal(
    artifact.speed_ode_solvability.mean_split_certificate.bounded_speed_handoff_status,
    "bounded-speed-ledger-handoff-open"
  );
  assert.equal(artifact.speed_ode_solvability.mean_split_certificate.retention_effect, "diagnostic-only");
  for (const row of artifact.speed_ode_solvability.site_rows) {
    assert.equal(row.mean_split.source_mean_rows.length, 5);
    assert.equal(row.mean_split.cross_binary_pair_cancellation_rows.length, 2);
    assert.equal(
      row.mean_split.cross_binary_pair_cancellation_status,
      "sampled-cross-binary-pair-mean-cancellation-passed"
    );
    assert.equal(row.mean_split.partner_positive_mean_status, "sampled-antipodal-partner-positive-mean-passed");
  }
  assert.equal(artifact.result.speed_ode_diagnostic, "sampled_failed");
  assert.equal(artifact.result.frozen_ledger_status, "rejected_by_sampled_zero_mean_row");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.bounded_speed_handoff_status, "bounded-speed-ledger-handoff-open");
});

test("octahedral speed-ODE CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-swarm-speed-ode-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-swarm/octahedral-speed-ode-diagnostic.mjs", import.meta.url)
  );

  execFileSync(
    process.execPath,
    [scriptPath, "--samples", "120", "--subdivisions", "240", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralSpeedOdeDiagnostic(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.phase_sample_count, 120);
  assert.equal(validation.result.speed_ode_diagnostic, "sampled_failed");
  assert.equal(validation.result.retention, "not_retained");
  assert.ok(validation.summary.max_zero_mean_residual > 1);

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_SPEED_ODE_DIAGNOSTIC_SCHEMA);
});
