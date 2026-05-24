import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_INTERVAL_BRIDGE_PREDICATE_REDUCTION_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction,
  validateOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction({
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

test("interval bridge predicate reduction validates predecessors", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction(packet),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_INTERVAL_BRIDGE_PREDICATE_REDUCTION_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_interval_bridge_predicate_reduction"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.source_bridge_predicate_certificate_check.valid, true);
  assert.equal(packet.source_interval_target_atlas_check.valid, true);
  assert.equal(
    packet.source_bridge_predicate_certificate_check
      .certifies_interval_bridge_predicates,
    false
  );
  assert.equal(
    packet.source_interval_target_atlas_check.certifies_interval_sign_topology,
    false
  );
});

test("interval bridge predicate reduction imposes no speed window", () => {
  const packet = artifact();

  assert.equal(
    packet.interval_bridge_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.equal(packet.interval_bridge_parameters.speed_band, undefined);
  assert.equal(packet.interval_bridge_parameters.speed_window, undefined);
  assert.equal(packet.interval_bridge_parameters.speed_min, undefined);
  assert.equal(packet.interval_bridge_parameters.speed_max, undefined);
  assert.deepEqual(packet.interval_bridge_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
});

test("interval bridge predicate reduction states the theorem", () => {
  const theorem = artifact().interval_bridge_reduction_theorem;

  assert.equal(theorem.theorem_id, "interval-bridge-predicate-reduction");
  assert.match(theorem.statement, /five bridge endpoint sign enclosures/);
  assert.match(theorem.statement, /two imported I2 derivative-sign enclosures/);
  assert.equal(theorem.proof_steps.length, 5);
  assert.equal(
    theorem.proof_status,
    "conditional-interval-bridge-predicate-reduction-stated"
  );
});

test("interval bridge predicate reduction emits endpoint and derivative targets", () => {
  const packet = artifact();
  const endpointRows = packet.bridge_endpoint_enclosure_target_rows;
  const derivativeRows = packet.bridge_derivative_target_rows;

  assert.equal(endpointRows.length, 5);
  assert.deepEqual(
    endpointRows.map((entry) => entry.target_id),
    [
      "theta_3plus.entry.forcing",
      "I2.turn-crest.forcing",
      "I2.left-forcing-bracket.forcing",
      "I2.right-forcing-bracket.forcing",
      "theta_2minus.exit.forcing",
    ]
  );
  near(
    row(endpointRows, "target_id", "I2.left-forcing-bracket.forcing")
      .target_enclosure_radius,
    0.00282486983786
  );
  assert.deepEqual(
    derivativeRows.map((entry) => entry.source_target_id),
    [
      "I2.derivative-positive.before-turn",
      "I2.derivative-negative.after-turn",
    ]
  );
  assert.ok(
    derivativeRows.every(
      (entry) => entry.status === "bridge-derivative-sign-target-imported"
    )
  );
});

test("interval bridge predicate reduction emits the three bridge reductions", () => {
  const rows = artifact().interval_bridge_predicate_reduction_rows;

  assert.deepEqual(
    rows.map((entry) => entry.interval_bridge_predicate_id),
    [
      "theta_3plus.regular-entry-positive",
      "I2.turn-bridge-forcing-positive",
      "theta_2minus.regular-exit-negative",
    ]
  );
  assert.ok(
    rows.every(
      (entry) => entry.status === "interval-bridge-predicate-reduction-stated"
    )
  );

  const turn = row(
    rows,
    "interval_bridge_predicate_id",
    "I2.turn-bridge-forcing-positive"
  );
  assert.deepEqual(turn.required_endpoint_target_ids, [
    "theta_3plus.entry.forcing",
    "I2.turn-crest.forcing",
    "I2.left-forcing-bracket.forcing",
  ]);
  assert.deepEqual(turn.required_derivative_target_ids, [
    "I2.entry-to-turn.derivative-positive",
    "I2.turn-to-exit.derivative-negative",
  ]);
  near(turn.inherited_target_radius_budget, 0.00282486983786);
});

test("interval bridge predicate reduction summarizes the weakest bridge budget", () => {
  const summary = artifact().interval_bridge_reduction_summary;

  assert.equal(summary.interval_bridge_predicate_count, 3);
  assert.equal(summary.interval_bridge_predicate_reduction_stated_count, 3);
  assert.equal(
    summary.weakest_bridge_predicate_id,
    "I2.turn-bridge-forcing-positive"
  );
  near(summary.weakest_inherited_sampled_margin_budget, 0.00564973967572);
  near(summary.weakest_inherited_target_radius_budget, 0.00282486983786);
  assert.equal(summary.status, "interval-bridge-predicate-reduction-stated");
});

test("interval bridge predicate reduction keeps interval and retention claims open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_interval_bridge_predicate_reduction_theorem,
    true
  );
  assert.equal(packet.artifact_claim.emits_bridge_endpoint_enclosure_targets, true);
  assert.equal(
    packet.artifact_claim.imports_bridge_derivative_enclosure_targets,
    true
  );
  assert.equal(packet.artifact_claim.certifies_interval_bridge_predicates, false);
  assert.equal(packet.artifact_claim.certifies_interval_sign_topology, false);
  assert.equal(packet.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(packet.result.retention, "not_retained");
  assert.equal(
    packet.result.theory_status,
    "source-atlas-aware-interval-bridge-predicate-reduction-stated"
  );
});

test("interval bridge predicate reduction rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction({
        targetMarginFactor: 1.1,
      }),
    /targetMarginFactor/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction({
        derivativeTailSampleCount: 0,
      }),
    /derivativeTailSampleCount/
  );

  const broken = structuredClone(artifact());
  broken.artifact_claim.certifies_interval_bridge_predicates = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction(
      broken
    ).join("\n"),
    /leave interval\/retention claims open/
  );
});

test("interval bridge predicate reduction CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-interval-bridge-reduction-")
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_INTERVAL_BRIDGE_PREDICATE_REDUCTION_SCHEMA
  );
});
