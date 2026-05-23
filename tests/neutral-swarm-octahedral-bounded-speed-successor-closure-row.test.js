import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_BOUNDED_SPEED_SUCCESSOR_CLOSURE_ROW_SCHEMA,
  buildOctahedralBoundedSpeedSuccessorClosureRow,
  validateOctahedralBoundedSpeedSuccessorClosureRow,
} from "../scripts/neutral-swarm/octahedral-bounded-speed-successor-closure-row.mjs";

test("bounded-speed successor closure row records a conditional clock-window diagnostic", () => {
  const artifact = buildOctahedralBoundedSpeedSuccessorClosureRow();

  assert.deepEqual(validateOctahedralBoundedSpeedSuccessorClosureRow(artifact), []);
  assert.equal(artifact.schema, OCTAHEDRAL_BOUNDED_SPEED_SUCCESSOR_CLOSURE_ROW_SCHEMA);
  assert.equal(artifact.packet_id, "octahedral_bounded_speed_successor_closure_row");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(
    artifact.average_speed_lemma.status,
    "declared-speed-window-clock-length-necessary-condition-failed"
  );
  assert.ok(Math.abs(artifact.average_speed_lemma.trace_mean_path_speed - 1.694464950788) <= 1e-12);
  assert.ok(Math.abs(artifact.average_speed_lemma.declared_upper_window_failure_margin - 0.194464950788) <= 1e-12);
  assert.ok(
    Math.abs(
      artifact.average_speed_lemma.period_rescue_condition.minimum_period_ratio_to_fixed_period - 1.129643300525
    ) <= 1e-12
  );
  assert.ok(
    artifact.average_speed_lemma.clock_length_necessary_rows.every(
      (row) => row.necessary_condition_passed === false && row.failure_margin > 0.19
    )
  );
});

test("bounded-speed successor closure row preserves non-retention and conditional successor equations", () => {
  const artifact = buildOctahedralBoundedSpeedSuccessorClosureRow();

  assert.equal(artifact.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(artifact.artifact_claim.proves_conditional_clock_window_no_go_for_declared_window, true);
  assert.equal(artifact.artifact_claim.certifies_live_derivative_matrix, false);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.artifact_claim.retained_branch, false);
  assert.equal(artifact.result.theory_status, "declared-speed-window-clock-diagnostic-failed");
  assert.equal(artifact.result.first_successor_row, "period-rescaled-trace-simple-root-scan-required");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.successor_equations.live_zero_mean_correction, "B*alpha=-M(z_0)");
  assert.equal(artifact.successor_equations.constant_source_case, "1_6 in Range(B) when M(z_0)=m_* 1_6");
});

test("bounded-speed successor closure row records primitive and clock failure", () => {
  const artifact = buildOctahedralBoundedSpeedSuccessorClosureRow();

  assert.equal(artifact.physical_primitive_row.status, "declared-window-primitive-or-clock-row-failed");
  assert.ok(artifact.source_trace_candidate.zero_mean_residual_norm_inf <= 1e-8);
  assert.ok(artifact.source_trace_candidate.primitive_return_abs_max <= 1e-8);
  assert.ok(Math.abs(artifact.source_trace_candidate.primitive_excursion_max - 1.041664058515) <= 1e-9);
  assert.ok(Math.abs(artifact.source_trace_candidate.initial_speed_interval_width_min + 0.041664058515) <= 1e-9);
  assert.equal(artifact.source_trace_candidate.declared_window_rows_passed, false);
});

test("bounded-speed successor closure row CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-swarm-bounded-speed-successor-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-swarm/octahedral-bounded-speed-successor-closure-row.mjs", import.meta.url)
  );

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralBoundedSpeedSuccessorClosureRow(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.result.theory_status, "declared-speed-window-clock-diagnostic-failed");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_BOUNDED_SPEED_SUCCESSOR_CLOSURE_ROW_SCHEMA);
});
