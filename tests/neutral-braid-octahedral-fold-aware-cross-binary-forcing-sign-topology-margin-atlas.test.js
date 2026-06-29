import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_SIGN_TOPOLOGY_MARGIN_ATLAS_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryForcingSignTopologyMarginAtlas,
  validateOctahedralFoldAwareCrossBinaryForcingSignTopologyMarginAtlas,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryForcingSignTopologyMarginAtlas({
        topologySamplesPerCell: 48,
        derivativeSamplesPerCell: 8,
        sourceQuadraturePanelsPerSegment: 96,
        valueQuadraturePanelsPerSegment: 384,
        scanSamplesPerCell: 96,
        rootSubdivisions: 5000,
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

function coreRow(atlas, rowId) {
  const row = atlas.core_margin_rows.find((entry) => entry.margin_row_id === rowId);
  assert.ok(row, `missing core row ${rowId}`);
  return row;
}

test("fold-aware forcing sign topology margin atlas validates predecessors", () => {
  const atlas = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryForcingSignTopologyMarginAtlas(atlas),
    []
  );
  assert.equal(
    atlas.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_SIGN_TOPOLOGY_MARGIN_ATLAS_SCHEMA
  );
  assert.equal(
    atlas.packet_id,
    "octahedral_fold_aware_cross_binary_forcing_sign_topology_margin_atlas"
  );
  assert.equal(atlas.promotion_status, "priority-only");
  assert.equal(atlas.source_forcing_sign_certificate_check.valid, true);
  assert.equal(atlas.source_finite_candidate_reduction_check.valid, true);
  assert.equal(
    atlas.source_forcing_sign_certificate_check.certifies_interval_critical_exhaustion,
    false
  );
  assert.equal(
    atlas.source_finite_candidate_reduction_check
      .certifies_C_m_Q_M_Q_interval_enclosure,
    false
  );
});

test("fold-aware forcing sign topology margin atlas imposes no speed window", () => {
  const atlas = artifact();

  assert.equal(
    atlas.margin_parameters.speed_constraint,
    "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only"
  );
  assert.deepEqual(atlas.margin_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(atlas.margin_parameters.speed_ratio_estimate, 3.021564740248);
  assert.equal(atlas.artifact_claim.assumes_fixed_speed_window, false);
});

test("fold-aware forcing sign topology margin atlas preserves candidate order", () => {
  const atlas = artifact();

  assert.deepEqual(atlas.candidate_order, [
    "endpoint.0",
    "I1.z1",
    "fold.3-",
    "I2.z1",
    "fold.2+",
    "endpoint.Q",
  ]);
});

test("fold-aware forcing sign topology margin atlas emits core margin rows", () => {
  const atlas = artifact();

  assert.equal(atlas.core_margin_rows.length, 10);
  near(coreRow(atlas, "I1.forcing-bracket").sampled_margin, 0.000472358401387);
  near(coreRow(atlas, "I1.transversality").sampled_margin, 0.0903091258188);
  near(
    coreRow(atlas, "I2.derivative-turn-bracket").sampled_margin,
    0.0520912735854
  );
  near(coreRow(atlas, "I2.crest-positive-forcing").sampled_margin, 0.0707209047205);
  near(coreRow(atlas, "I2.forcing-bracket").sampled_margin, 0.00564973967572);
  near(coreRow(atlas, "I2.transversality").sampled_margin, 4.1764551399);
  near(coreRow(atlas, "I3.endpoint-forcing-negative").sampled_margin, 0.0329365148835);
  near(
    coreRow(atlas, "I3.endpoint-derivative-positive").sampled_margin,
    0.434970197587
  );
  near(coreRow(atlas, "I2.turn-before-zero").sampled_margin, 0.033867572886);
  near(
    coreRow(atlas, "I2.turn-before-zero").equal_radius_order_budget,
    0.016933786443
  );
  near(coreRow(atlas, "value.full-order").sampled_margin, 0.0004836066205);
});

test("fold-aware forcing sign topology margin atlas identifies the bottleneck", () => {
  const summary = artifact().margin_summary;

  near(summary.minimum_sign_preservation_budget, 0.000472358401387);
  assert.equal(
    summary.minimum_sign_preservation_budget_row_id,
    "I1.forcing-bracket"
  );
  near(summary.minimum_value_ordering_budget, 0.0004836066205);
  near(summary.global_sampled_closure_bottleneck, 0.000472358401387);
  assert.equal(summary.global_sampled_closure_bottleneck_row_id, "I1.forcing-bracket");
  assert.equal(summary.status, "sampled-sign-topology-margins-positive");
});

test("fold-aware forcing sign topology margin atlas preserves interval and retention boundaries", () => {
  const atlas = artifact();

  assert.equal(atlas.artifact_claim.certifies_sampled_sign_topology_margin_atlas, true);
  assert.equal(atlas.artifact_claim.certifies_sampled_sign_preservation_budgets, true);
  assert.equal(atlas.artifact_claim.certifies_sampled_turn_order_margin, true);
  assert.equal(atlas.artifact_claim.certifies_sampled_value_margin_budget_import, true);
  assert.equal(atlas.artifact_claim.certifies_sampled_interval_target_predicates, true);
  assert.equal(atlas.artifact_claim.certifies_interval_derivative_enclosure, false);
  assert.equal(atlas.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(atlas.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(atlas.artifact_claim.certifies_C_m_Q_M_Q_interval_enclosure, false);
  assert.equal(atlas.artifact_claim.retained_branch, false);
  assert.equal(atlas.result.retention, "not_retained");
});

test("fold-aware forcing sign topology margin atlas rejects invalid controls", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryForcingSignTopologyMarginAtlas({
        valueQuadraturePanelsPerSegment: 16,
      }),
    /valueQuadraturePanelsPerSegment/
  );
  const broken = structuredClone(artifact());
  broken.margin_summary.global_sampled_closure_bottleneck_row_id = "value.full-order";
  assert.match(
    validateOctahedralFoldAwareCrossBinaryForcingSignTopologyMarginAtlas(
      broken
    ).join("\n"),
    /positive sampled margin budgets/
  );
});

test("fold-aware forcing sign topology margin atlas CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-forcing-sign-margin-")
  );
  const outPath = path.join(tmpDir, "margin-atlas.json");

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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_SIGN_TOPOLOGY_MARGIN_ATLAS_SCHEMA
  );
});
