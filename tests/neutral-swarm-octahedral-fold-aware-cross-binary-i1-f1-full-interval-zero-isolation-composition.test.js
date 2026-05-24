import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_F1_FULL_INTERVAL_ZERO_ISOLATION_COMPOSITION_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryI1F1FullIntervalZeroIsolationComposition,
  validateOctahedralFoldAwareCrossBinaryI1F1FullIntervalZeroIsolationComposition,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition.mjs";

let cachedArtifact = null;
const EXPECTED_SUMMARY_STATUS =
  "i1-f1-full-interval-zero-isolation-composition-certified";
const EXPECTED_RESULT_THEORY_STATUS =
  "source-atlas-aware-i1-f1-full-interval-zero-isolation-composition-certified";
const EXPECTED_SUCCESSOR_ROW =
  "I1.f1.interval-critical-exhaustion-quadrature-retention-required";

function progressLogger(label) {
  if (process.env.AAA_TEST_HEARTBEAT === "0") {
    return null;
  }
  let lastPrintedAt = 0;
  return (progress) => {
    const now = Date.now();
    const completed = progress.stage === "peak-budget-parent-complete";
    const first = progress.parent_row_index === 1;
    const last = progress.parent_row_index === progress.parent_row_count;
    const intervalElapsed = now - lastPrintedAt >= 30_000;
    const rowBoundary =
      completed && progress.parent_row_index % 8 === 0;
    if (!(first || last || intervalElapsed || rowBoundary)) {
      return;
    }
    lastPrintedAt = now;
    console.error(
      `# ${label}: ${progress.parent_row_index}/${progress.parent_row_count} parent rows, ${progress.completed_subcell_row_count} subcells, ${(progress.elapsed_ms / 1000).toFixed(1)}s`
    );
  };
}

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryI1F1FullIntervalZeroIsolationComposition(
        {
          rootSubdivisions: 5000,
          endpointSpeedSampleCount: 9,
          zeroBranchSpeedSampleCount: 9,
          derivativeThetaSampleCount: 48,
          thetaCellCount: 16,
          speedCellCount: 8,
          parentStencilSamplesPerAxis: 5,
          refinementSamplesPerSubcellAxis: 3,
          endpointPadding: 1e-5,
          machinePadding: 1e-9,
          bisectionTolerance: 1e-12,
          progressCallback: progressLogger("I1.f1 zero-isolation composition"),
        }
      );
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

test("I1.f1 full interval zero-isolation composition validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryI1F1FullIntervalZeroIsolationComposition(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_F1_FULL_INTERVAL_ZERO_ISOLATION_COMPOSITION_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_i1_f1_full_interval_zero_isolation_composition"
  );
  assert.equal(packet.promotion_status, "priority-only");
});

test("I1.f1 composition consumes endpoint signs and directed-rounded derivative negativity", () => {
  const packet = artifact();

  assert.equal(packet.forcing_bracket_certificate_check.valid, true);
  assert.equal(
    packet.forcing_bracket_certificate_check
      .certifies_I1_forcing_bracket_point_signs,
    true
  );
  assert.equal(packet.derivative_peak_budget_check.valid, true);
  assert.equal(
    packet.derivative_peak_budget_check
      .certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure,
    true
  );
  assert.equal(
    packet.derivative_peak_budget_check
      .certifies_directed_rounded_taylor_upper_envelope,
    true
  );
  assert.equal(
    packet.derivative_peak_budget_check
      .certifies_I1_f1_full_interval_zero_isolation,
    false
  );
});

test("I1.f1 composition closes the bracket zero-isolation theorem", () => {
  const packet = artifact();
  const summary = packet.full_interval_zero_isolation_composition_summary;

  assert.equal(summary.status, EXPECTED_SUMMARY_STATUS);
  assert.equal(summary.endpoint_signs_force_existence, true);
  assert.equal(summary.derivative_envelope_forces_strict_monotonicity, true);
  assert.equal(summary.subcell_row_count, 2048);
  assert.equal(summary.theta_localized_taylor_tile_count, 4096);
  assert.equal(
    summary.directed_rounded_taylor_passed_tile_count,
    summary.theta_localized_taylor_tile_count
  );
  assert.ok(
    Number(summary.maximum_directed_rounded_interval_taylor_upper_bound) < 0
  );
  assert.ok(
    Number(
      summary.minimum_directed_rounded_interval_derivative_negativity_clearance
    ) > 0
  );
  assert.ok(Number(summary.maximum_allowed_upper_bound) <= 0);
  assert.ok(
    Number(summary.minimum_directed_rounded_interval_taylor_headroom) > 0
  );
});

test("I1.f1 composition imposes no fixed speed window", () => {
  const packet = artifact();

  assert.equal(
    packet.composition_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.deepEqual(packet.composition_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.composition_parameters.speed_band, undefined);
  assert.equal(packet.composition_parameters.speed_window, undefined);
  assert.equal(packet.composition_parameters.speed_min, undefined);
  assert.equal(packet.composition_parameters.speed_max, undefined);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
});

test("I1.f1 composition keeps downstream interval and retention claims open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_I1_f1_full_interval_zero_isolation,
    true
  );
  assert.equal(packet.artifact_claim.certifies_I1_zero_isolation, false);
  assert.equal(
    packet.artifact_claim.certifies_interval_critical_exhaustion,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_interval_quadrature_enclosure,
    false
  );
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(packet.result.theory_status, EXPECTED_RESULT_THEORY_STATUS);
  assert.equal(packet.result.first_successor_row, EXPECTED_SUCCESSOR_ROW);
});

test("I1.f1 composition rejects speed-band fields and downstream overclaims", () => {
  const packet = clone(artifact());
  packet.composition_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_interval_quadrature_enclosure = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryI1F1FullIntervalZeroIsolationComposition(
      packet
    );

  assert.ok(
    errors.includes("composition parameters must not contain speed-band fields")
  );
  assert.ok(
    errors.includes(
      "artifact claim must close only I1.f1 bracket zero isolation and keep downstream interval rows open"
    )
  );
});

test("I1.f1 full interval zero-isolation composition CLI validates JSON artifacts", () => {
  const packet = artifact();
  const scriptPath = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition.mjs",
      import.meta.url
    )
  );
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-i1-f1-zero-isolation-")
  );
  const artifactPath = path.join(tempDir, "artifact.json");
  fs.writeFileSync(artifactPath, `${JSON.stringify(packet)}\n`);

  const output = execFileSync(process.execPath, [
    scriptPath,
    "--validate",
    artifactPath,
  ]).toString();

  assert.equal(output.trim(), "ok");
});
