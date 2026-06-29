import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_ZERO_ISOLATION_MESH_COMPOSITION_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition,
  validateOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition({
        rootSubdivisions: 5000,
        endpointSpeedSampleCount: 9,
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

test("I1.f1 bracket-local zero-isolation mesh composition validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_ZERO_ISOLATION_MESH_COMPOSITION_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_i1_bracket_local_zero_isolation_mesh_composition"
  );
  assert.equal(packet.promotion_status, "priority-only");
});

test("I1.f1 bracket-local zero-isolation composition consumes predecessor rows", () => {
  const packet = artifact();

  assert.equal(packet.forcing_bracket_certificate_check.valid, true);
  assert.equal(
    packet.forcing_bracket_certificate_check.certifies_I1_forcing_bracket_point_signs,
    true
  );
  assert.equal(
    packet.forcing_bracket_certificate_check.certifies_I1_zero_isolation,
    false
  );
  assert.equal(packet.derivative_mesh_barrier_check.valid, true);
  assert.equal(
    packet.derivative_mesh_barrier_check
      .certifies_I1_f1_bracket_derivative_mesh_barrier,
    true
  );
  assert.equal(
    packet.derivative_mesh_barrier_check.certifies_I1_f1_full_interval_zero_isolation,
    false
  );
  assert.equal(
    packet.derivative_mesh_barrier_check.certifies_interval_derivative_enclosure,
    false
  );
});

test("I1.f1 bracket-local zero-isolation composition imposes no fixed speed window", () => {
  const packet = artifact();

  assert.equal(
    packet.composition_parameters.speed_constraint,
    "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only"
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

test("I1.f1 bracket-local zero-isolation composition records the certified mesh crossing", () => {
  const summary = artifact().bracket_local_zero_isolation_mesh_composition_summary;

  assert.equal(
    summary.composition_row_id,
    "I1.f1.bracket-local-zero-isolation-mesh-composition"
  );
  assert.deepEqual(summary.bracket_interval, [0.124678831905, 0.145456970556]);
  assert.deepEqual(summary.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.deepEqual(summary.left_endpoint_forcing_enclosure, [
    0.000471690862363,
    0.000472960105266,
  ]);
  assert.deepEqual(summary.right_endpoint_forcing_enclosure, [
    -0.0011858057038,
    -0.00118456783555,
  ]);
  near(summary.minimum_endpoint_signed_clearance, 0.000471690862363, 5e-15);
  assert.equal(summary.mesh_row_count, 128);
  assert.equal(summary.certified_mesh_row_count, 128);
  near(
    summary.maximum_local_derivative_upper_barrier_stencil,
    -0.0603824889362,
    5e-13
  );
  near(summary.minimum_derivative_signed_clearance, 0.0603824889362, 5e-13);
  assert.deepEqual(summary.sampled_root_theta_envelope, [
    0.129617801662,
    0.129631781031,
  ]);
  near(summary.minimum_root_clearance_from_left_endpoint, 0.004938969757, 5e-13);
  near(summary.minimum_root_clearance_from_right_endpoint, 0.015825189525, 5e-13);
  assert.deepEqual(summary.sampled_root_derivative_envelope, [
    -0.0903237258617,
    -0.0902959668558,
  ]);
  assert.deepEqual(summary.source_root_counts, [6]);
  assert.deepEqual(summary.term_root_count_signatures, ["1,3,1,1"]);
  assert.equal(summary.endpoint_signs_force_existence, true);
  assert.equal(
    summary.derivative_barrier_forces_at_most_one_zero_under_stencil_contract,
    true
  );
  assert.equal(summary.sampled_root_branch_locates_zero, true);
  assert.equal(
    summary.status,
    "i1-f1-bracket-local-zero-isolation-mesh-composition-certified"
  );
});

test("I1.f1 bracket-local zero-isolation composition keeps interval and retention claims open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .composes_I1_endpoint_signs_and_bracket_derivative_mesh_barrier,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_I1_f1_bracket_local_zero_isolation_mesh_composition,
    true
  );
  assert.equal(packet.artifact_claim.certifies_I1_f1_sampled_stencil_unique_zero, true);
  assert.equal(packet.artifact_claim.advances_I1_f1_zero_isolation, true);
  assert.equal(
    packet.artifact_claim.certifies_I1_f1_full_interval_zero_isolation,
    false
  );
  assert.equal(packet.artifact_claim.certifies_I1_zero_isolation, false);
  assert.equal(
    packet.artifact_claim.certifies_outward_rounded_interval_enclosure,
    false
  );
  assert.equal(packet.artifact_claim.certifies_interval_derivative_enclosure, false);
  assert.equal(packet.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.theory_status,
    "source-atlas-aware-i1-f1-bracket-local-zero-isolation-mesh-composition-certified"
  );
});

test("I1.f1 bracket-local zero-isolation composition rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition({
        endpointSpeedSampleCount: 2,
      }),
    /endpointSpeedSampleCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition({
        thetaCellCount: 3,
      }),
    /thetaCellCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition({
        bisectionTolerance: 0,
      }),
    /bisectionTolerance/
  );

  const broken = structuredClone(artifact());
  broken.artifact_claim.certifies_I1_f1_full_interval_zero_isolation = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition(
      broken
    ).join("\n"),
    /leave interval\/retention claims open/
  );
});

test("I1.f1 bracket-local zero-isolation composition CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-i1-local-zero-composition-")
  );
  const outPath = path.join(tmpDir, "packet.json");

  execFileSync(
    process.execPath,
    [
      script,
      "--out",
      outPath,
      "--pretty",
      "--endpoint-speed-samples",
      "3",
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_ZERO_ISOLATION_MESH_COMPOSITION_SCHEMA
  );
});
