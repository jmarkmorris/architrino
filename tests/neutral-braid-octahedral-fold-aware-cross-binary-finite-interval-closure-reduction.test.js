import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FINITE_INTERVAL_CLOSURE_REDUCTION_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryFiniteIntervalClosureReduction,
  validateOctahedralFoldAwareCrossBinaryFiniteIntervalClosureReduction,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-finite-interval-closure-reduction.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryFiniteIntervalClosureReduction({
        rootSubdivisions: 5000,
        scanSamplesPerCell: 96,
        topologySamplesPerCell: 48,
        derivativeSamplesPerCell: 8,
        sourceAtlasSampleCount: 64,
        sourceQuadraturePanelsPerSegment: 96,
        valueQuadraturePanelsPerSegment: 384,
        derivativeTailSampleCount: 4,
        targetMarginFactor: 0.5,
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

function row(rows, idField, id) {
  const found = rows.find((entry) => entry[idField] === id);
  assert.ok(found, `missing row ${id}`);
  return found;
}

test("finite interval closure reduction validates predecessors", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryFiniteIntervalClosureReduction(packet),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FINITE_INTERVAL_CLOSURE_REDUCTION_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_finite_interval_closure_reduction"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.source_interval_implication_check.valid, true);
  assert.equal(packet.source_interval_bridge_reduction_check.valid, true);
  assert.equal(
    packet.source_interval_implication_check
      .certifies_interval_critical_exhaustion,
    false
  );
  assert.equal(
    packet.source_interval_bridge_reduction_check
      .certifies_interval_bridge_predicates,
    false
  );
});

test("finite interval closure reduction imposes no speed window", () => {
  const packet = artifact();

  assert.equal(
    packet.finite_interval_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.equal(packet.finite_interval_parameters.speed_band, undefined);
  assert.equal(packet.finite_interval_parameters.speed_window, undefined);
  assert.equal(packet.finite_interval_parameters.speed_min, undefined);
  assert.equal(packet.finite_interval_parameters.speed_max, undefined);
  assert.deepEqual(packet.finite_interval_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
});

test("finite interval closure reduction states the composition theorem", () => {
  const theorem = artifact().finite_interval_closure_reduction_theorem;

  assert.equal(
    theorem.theorem_id,
    "finite-source-atlas-interval-closure-reduction"
  );
  assert.match(theorem.statement, /bridge endpoint signs/);
  assert.match(theorem.statement, /candidate-value budget/);
  assert.equal(theorem.proof_steps.length, 6);
  assert.equal(
    theorem.proof_status,
    "conditional-finite-interval-closure-reduction-stated"
  );
});

test("finite interval closure reduction keeps bridge endpoints separate", () => {
  const rows = artifact().bridge_endpoint_separation_rows;

  assert.equal(rows.length, 5);
  assert.ok(
    rows.every((entry) => entry.counted_as_separate_bridge_endpoint_row === true)
  );
  assert.equal(
    rows.filter((entry) => entry.overlaps_existing_point_sign_label).length,
    3
  );
  assert.equal(
    row(rows, "bridge_target_id", "I2.turn-crest.forcing")
      .canonical_target_id,
    "I2.d1.forcing"
  );
  assert.equal(
    row(rows, "bridge_target_id", "theta_3plus.entry.forcing")
      .overlaps_existing_point_sign_label,
    false
  );
  assert.equal(
    row(rows, "bridge_target_id", "theta_2minus.exit.forcing")
      .overlaps_existing_point_sign_label,
    false
  );
});

test("finite interval closure reduction de-duplicates only derivative rows", () => {
  const rows = artifact().bridge_derivative_deduplication_rows;

  assert.equal(rows.length, 2);
  assert.deepEqual(
    rows.map((entry) => entry.canonical_target_id),
    [
      "I2.derivative-positive.before-turn",
      "I2.derivative-negative.after-turn",
    ]
  );
  assert.ok(
    rows.every((entry) => entry.duplicate_of_existing_regular_subcell_sign)
  );
});

test("finite interval closure reduction emits the finite row census", () => {
  const census = artifact().finite_interval_row_census;

  assert.equal(census.source_point_sign_target_count, 13);
  assert.equal(census.bridge_endpoint_target_count, 5);
  assert.equal(census.bridge_endpoint_label_overlap_count, 3);
  assert.equal(census.bridge_endpoint_rows_counted_separately, 5);
  assert.equal(census.bridge_derivative_target_count, 2);
  assert.equal(census.bridge_derivative_overlap_count, 2);
  assert.equal(census.zero_isolation_target_count, 3);
  assert.equal(census.regular_subcell_sign_target_count, 5);
  assert.equal(census.fold_collar_target_count, 2);
  assert.equal(census.theta_order_target_count, 4);
  assert.equal(census.value_budget_target_count, 1);
  assert.equal(census.finite_interval_row_family_count, 33);
  assert.equal(census.source_atlas_bottleneck_row_id, "I1.forcing-bracket");
  near(census.source_atlas_first_outward_radius, 0.000236179200694);
  assert.equal(
    census.weakest_bridge_predicate_id,
    "I2.turn-bridge-forcing-positive"
  );
  near(census.weakest_bridge_radius, 0.00282486983786);
  near(census.global_finite_row_radius_bottleneck, 0.000236179200694);
  assert.equal(
    census.global_finite_row_radius_bottleneck_source,
    "I1.forcing-bracket"
  );
});

test("finite interval closure reduction keeps interval and retention claims open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_finite_interval_closure_reduction_theorem,
    true
  );
  assert.equal(
    packet.artifact_claim.eliminates_bridge_predicates_as_primitive_assumptions,
    true
  );
  assert.equal(packet.artifact_claim.emits_finite_interval_row_census, true);
  assert.equal(packet.artifact_claim.certifies_interval_bridge_predicates, false);
  assert.equal(packet.artifact_claim.certifies_interval_sign_topology, false);
  assert.equal(packet.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(packet.result.retention, "not_retained");
  assert.equal(
    packet.result.theory_status,
    "source-atlas-aware-finite-interval-closure-reduction-stated"
  );
});

test("finite interval closure reduction rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryFiniteIntervalClosureReduction({
        targetMarginFactor: 1.1,
      }),
    /targetMarginFactor/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryFiniteIntervalClosureReduction({
        derivativeTailSampleCount: 0,
      }),
    /derivativeTailSampleCount/
  );

  const broken = structuredClone(artifact());
  broken.artifact_claim.certifies_interval_critical_exhaustion = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryFiniteIntervalClosureReduction(
      broken
    ).join("\n"),
    /leave interval\/retention claims open/
  );
});

test("finite interval closure reduction CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-finite-interval-closure-reduction.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-finite-interval-reduction-")
  );
  const outPath = path.join(tmpDir, "packet.json");

  execFileSync(process.execPath, [script, "--out", outPath, "--pretty"], {
    stdio: "pipe",
  });
  execFileSync(process.execPath, [script, "--validate", outPath], {
    stdio: "pipe",
  });
  assert.equal(
    execFileSync(process.execPath, [script, "--schema"], {
      encoding: "utf8",
    }).trim(),
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FINITE_INTERVAL_CLOSURE_REDUCTION_SCHEMA
  );
});
