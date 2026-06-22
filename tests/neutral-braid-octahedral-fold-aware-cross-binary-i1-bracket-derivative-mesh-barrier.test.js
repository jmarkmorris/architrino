import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_DERIVATIVE_MESH_BARRIER_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier,
  validateOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier({
        rootSubdivisions: 5000,
        zeroBranchSpeedSampleCount: 9,
        derivativeThetaSampleCount: 48,
        thetaCellCount: 16,
        speedCellCount: 8,
        endpointPadding: 1e-5,
        machinePadding: 1e-9,
        bisectionTolerance: 1e-12,
      });
  }
  return cachedArtifact;
}

function near(actual, expected, tolerance = 5e-12) {
  assert.ok(
    Math.abs(Number(actual) - expected) <= tolerance,
    `${actual} not within ${tolerance} of ${expected}`
  );
}

test("I1.f1 bracket derivative mesh barrier validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier(packet),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_DERIVATIVE_MESH_BARRIER_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_i1_bracket_derivative_mesh_barrier"
  );
  assert.equal(packet.promotion_status, "priority-only");
});

test("I1.f1 bracket derivative mesh barrier imports the sampled zero branch", () => {
  const packet = artifact();

  assert.equal(packet.zero_isolation_scan_check.valid, true);
  assert.equal(
    packet.zero_isolation_scan_check
      .certifies_I1_f1_zero_isolation_speed_envelope_scan,
    true
  );
  assert.equal(
    packet.zero_isolation_scan_check.certifies_I1_f1_full_interval_zero_isolation,
    false
  );
  assert.equal(
    packet.zero_isolation_scan_check.root_branch_summary.status,
    "i1-f1-zero-isolation-speed-envelope-scan-certified"
  );
});

test("I1.f1 bracket derivative mesh barrier imposes no fixed speed window", () => {
  const packet = artifact();

  assert.equal(
    packet.mesh_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.deepEqual(packet.mesh_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.mesh_parameters.speed_band, undefined);
  assert.equal(packet.mesh_parameters.speed_window, undefined);
  assert.equal(packet.mesh_parameters.speed_min, undefined);
  assert.equal(packet.mesh_parameters.speed_max, undefined);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
});

test("I1.f1 bracket derivative mesh rows have negative local barriers", () => {
  const packet = artifact();

  assert.equal(packet.mesh_barrier_rows.length, 128);
  for (const row of packet.mesh_barrier_rows) {
    assert.equal(row.status, "i1-f1-bracket-derivative-mesh-barrier-certified");
    assert.equal(row.source_root_count_center, 6);
    assert.equal(row.source_root_count_preserved, true);
    assert.deepEqual(row.term_root_count_signature, [1, 3, 1, 1]);
    assert.ok(Number(row.derivative_center) < 0);
    assert.ok(Number(row.local_derivative_upper_barrier_stencil) < 0);
    assert.ok(Number(row.signed_barrier_clearance) > 0);
    assert.ok(Number(row.min_abs_F_delta) > 0);
  }
});

test("I1.f1 bracket derivative mesh summary records the barrier margin", () => {
  const summary = artifact().barrier_summary;

  assert.equal(
    summary.barrier_row_id,
    "I1.f1.bracket-local-derivative-mesh-barrier"
  );
  assert.equal(summary.local_scope, "I1.f1 forcing bracket only");
  assert.equal(summary.mesh_row_count, 128);
  assert.equal(summary.certified_mesh_row_count, 128);
  assert.deepEqual(summary.source_root_counts, [6]);
  assert.deepEqual(summary.term_root_count_signatures, ["1,3,1,1"]);
  near(summary.raw_derivative_minimum, -0.099363605995, 5e-13);
  near(summary.raw_derivative_maximum, -0.0614940465699, 5e-13);
  near(
    summary.max_local_derivative_upper_barrier_stencil,
    -0.0603824889362,
    5e-13
  );
  near(summary.min_signed_barrier_clearance, 0.0603824889362, 5e-13);
  assert.equal(
    summary.worst_mesh_row_id,
    "I1.f1.bracket-derivative-mesh.15.7"
  );
  near(summary.worst_theta_center, 0.144807653723, 5e-13);
  near(summary.worst_speed_ratio_center, 3.021569375, 5e-13);
  assert.equal(
    summary.status,
    "i1-f1-bracket-derivative-mesh-barrier-certified"
  );
});

test("I1.f1 bracket derivative mesh barrier keeps interval and retention claims open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_I1_f1_bracket_derivative_mesh_barrier,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_I1_f1_bracket_local_derivative_negative_stencil_barrier,
    true
  );
  assert.equal(packet.artifact_claim.advances_I1_derivative_negative_full_cell, true);
  assert.equal(
    packet.artifact_claim
      .certifies_I1_derivative_negative_full_cell_interval_enclosure,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_I1_f1_full_interval_zero_isolation,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_outward_rounded_interval_enclosure,
    false
  );
  assert.equal(packet.artifact_claim.certifies_interval_derivative_enclosure, false);
  assert.equal(packet.artifact_claim.certifies_I1_zero_isolation, false);
  assert.equal(packet.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.theory_status,
    "source-atlas-aware-i1-f1-bracket-derivative-mesh-barrier-certified"
  );
});

test("I1.f1 bracket derivative mesh barrier rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier({
        thetaCellCount: 3,
      }),
    /thetaCellCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier({
        speedCellCount: 1,
      }),
    /speedCellCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier({
        bisectionTolerance: 0,
      }),
    /bisectionTolerance/
  );

  const broken = structuredClone(artifact());
  broken.artifact_claim.certifies_interval_derivative_enclosure = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier(
      broken
    ).join("\n"),
    /leave interval\/retention claims open/
  );
});

test("I1.f1 bracket derivative mesh barrier CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-i1-bracket-barrier-")
  );
  const outPath = path.join(tmpDir, "packet.json");

  execFileSync(
    process.execPath,
    [
      script,
      "--out",
      outPath,
      "--pretty",
      "--zero-branch-speed-samples",
      "3",
      "--derivative-theta-samples",
      "8",
      "--theta-cells",
      "4",
      "--speed-cells",
      "2",
    ],
    {
      stdio: "pipe",
    }
  );
  execFileSync(process.execPath, [script, "--validate", outPath], {
    stdio: "pipe",
  });
  assert.equal(
    execFileSync(process.execPath, [script, "--schema"], {
      encoding: "utf8",
    }).trim(),
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_DERIVATIVE_MESH_BARRIER_SCHEMA
  );
});
