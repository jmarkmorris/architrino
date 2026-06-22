import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_TRACE_AFFINE_ZERO_MEAN_OBSTRUCTION_SCHEMA,
  buildOctahedralTraceAffineZeroMeanObstruction,
  tracePartnerMean,
  tracePartnerRoot,
  validateOctahedralTraceAffineZeroMeanObstruction,
} from "../scripts/neutral-braid/octahedral-trace-affine-zero-mean-obstruction.mjs";

test("trace affine partner root is unique in the positive-scale interval", () => {
  for (const scale of [0.125, 0.5, 1, 4.24679501458, 16]) {
    const root = tracePartnerRoot(scale);
    const row = tracePartnerMean(scale, root);

    assert.ok(root > 0);
    assert.ok(root < Math.PI);
    assert.ok(row.jacobian > 1);
    assert.ok(row.mean > 0);
  }
});

test("trace affine obstruction reproduces the fixed-speed positive partner mean", () => {
  const artifact = buildOctahedralTraceAffineZeroMeanObstruction();

  assert.deepEqual(validateOctahedralTraceAffineZeroMeanObstruction(artifact), []);
  assert.equal(artifact.schema, OCTAHEDRAL_TRACE_AFFINE_ZERO_MEAN_OBSTRUCTION_SCHEMA);
  assert.equal(artifact.packet_id, "octahedral_trace_affine_partner_positive_row");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.ok(Math.abs(artifact.unit_scale_check.partner_period_integral - 1.15740669293) <= 1e-11);
});

test("linear trace scale remains positive in the partner row only", () => {
  const artifact = buildOctahedralTraceAffineZeroMeanObstruction();

  assert.equal(
    artifact.analytic_certificate.zero_mean_verdict,
    "partner-row-positive-total-row-not-decided"
  );
  assert.equal(artifact.linear_trace_scale_check.positivity_status, "positive");
  assert.ok(artifact.linear_trace_scale_check.partner_period_integral > 0.7);
  assert.equal(artifact.result.nonlinear_trace_zero_mean, "not_decided_by_partner_row");
  assert.equal(artifact.result.first_order_status, "linear-range-pass-requires-total-root-ledger-solve");
  assert.equal(artifact.result.retention, "not_retained");
});

test("trace affine obstruction CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-trace-affine-obstruction-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-trace-affine-zero-mean-obstruction.mjs", import.meta.url)
  );

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralTraceAffineZeroMeanObstruction(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.result.retention, "not_retained");
  assert.equal(validation.linear_trace_scale_check.positivity_status, "positive");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_TRACE_AFFINE_ZERO_MEAN_OBSTRUCTION_SCHEMA);
});
