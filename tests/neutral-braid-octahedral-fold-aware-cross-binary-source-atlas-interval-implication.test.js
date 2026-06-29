import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_INTERVAL_IMPLICATION_SCHEMA,
  buildOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication,
  validateOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-source-atlas-interval-implication.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication({
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

function row(rows, idField, id) {
  const found = rows.find((entry) => entry[idField] === id);
  assert.ok(found, `missing row ${id}`);
  return found;
}

test("source-atlas interval implication validates predecessors", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication(packet),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_INTERVAL_IMPLICATION_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_source_atlas_interval_implication"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.source_atlas_quarter_cell_reduction_check.valid, true);
  assert.equal(packet.source_interval_target_atlas_check.valid, true);
  assert.equal(packet.source_fold_collar_certificate_check.valid, true);
  assert.equal(
    packet.source_atlas_quarter_cell_reduction_check
      .certifies_C_m_Q_M_Q_interval_enclosure,
    false
  );
});

test("source-atlas interval implication imposes no speed window", () => {
  const packet = artifact();

  assert.equal(
    packet.interval_implication_parameters.speed_constraint,
    "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only"
  );
  assert.equal(packet.interval_implication_parameters.speed_band, undefined);
  assert.equal(packet.interval_implication_parameters.speed_window, undefined);
  assert.equal(packet.interval_implication_parameters.speed_min, undefined);
  assert.equal(packet.interval_implication_parameters.speed_max, undefined);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
});

test("source-atlas interval implication imports formula scope", () => {
  const scope = artifact().source_atlas_formula_scope;

  assert.equal(
    scope.formula_status,
    "source-atlas-aware-quarter-profile-formula-reduction-certified"
  );
  assert.match(scope.quarter_forcing_formula, /f_cross/);
  assert.match(scope.root_equation, /F_\{kappa,v\}/);
  assert.equal(scope.unified_quarter_cells.length, 3);
  assert.deepEqual(
    scope.unified_quarter_cells.map((cell) => cell.cell_id),
    ["I1", "I2", "I3"]
  );
});

test("source-atlas interval implication preserves target counts and bottleneck", () => {
  const summary = artifact().existing_predicate_summary;

  assert.equal(summary.point_sign_predicate_count, 13);
  assert.equal(summary.zero_isolation_predicate_count, 3);
  assert.equal(summary.regular_subcell_predicate_count, 5);
  assert.equal(summary.fold_collar_target_count, 2);
  assert.equal(summary.theta_order_predicate_count, 4);
  assert.equal(summary.value_budget_predicate_count, 1);
  assert.equal(summary.current_bottleneck_predicate, "I1.forcing-bracket");
  assert.equal(summary.first_outward_rounded_radius_target, 0.000236179200694);
});

test("source-atlas interval implication states the critical-exhaustion theorem", () => {
  const theorem = artifact().source_atlas_interval_implication_theorem;

  assert.equal(
    theorem.theorem_id,
    "source-atlas-interval-critical-exhaustion-implication"
  );
  assert.match(theorem.statement, /finite candidate set/);
  assert.equal(theorem.proof_steps.length, 7);
  assert.equal(
    theorem.proof_status,
    "conditional-interval-implication-theorem-stated"
  );
  assert.equal(artifact().regular_subcell_implication_rows.length, 3);
});

test("source-atlas interval implication emits fold-collar G,D rows", () => {
  const rows = artifact().fold_collar_G_D_implication_rows;
  const left = row(rows, "implication_id", "fold.3-.left-G-D-sign-transport");
  const right = row(rows, "implication_id", "fold.2+.right-G-D-sign-transport");

  assert.equal(rows.length, 2);
  assert.equal(left.G_definition, "G(y)=2y f_cross(theta_f+tau*y^2)");
  assert.equal(left.D_definition, "D(y)=tau*(y*G_y-G)");
  assert.equal(left.G_expected_sign, "-");
  assert.equal(left.D_expected_sign, "-");
  assert.equal(left.transported_forcing_sign, "-");
  assert.equal(left.transported_derivative_sign, "-");
  assert.equal(right.G_expected_sign, "-");
  assert.equal(right.D_expected_sign, "+");
  assert.equal(right.transported_forcing_sign, "-");
  assert.equal(right.transported_derivative_sign, "+");
});

test("source-atlas interval implication identifies bridge predicates", () => {
  const rows = artifact().bridge_predicate_rows;

  assert.deepEqual(
    rows.map((entry) => entry.bridge_predicate_id),
    [
      "theta_3plus.regular-entry-positive",
      "I2.turn-bridge-forcing-positive",
      "theta_2minus.regular-exit-negative",
    ]
  );
  assert.ok(rows.every((entry) => entry.status === "bridge-predicate-open"));
  assert.equal(
    artifact().interval_profile_boundary.status,
    "source-atlas-interval-implication-stated-bridge-predicates-open"
  );
});

test("source-atlas interval implication keeps interval closure open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_conditional_interval_implication_theorem,
    true
  );
  assert.equal(packet.artifact_claim.identifies_missing_bridge_predicates, true);
  assert.equal(packet.artifact_claim.certifies_interval_sign_topology, false);
  assert.equal(packet.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(packet.artifact_claim.certifies_C_m_Q_M_Q_interval_enclosure, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(packet.result.retention, "not_retained");
  assert.equal(
    packet.result.theory_status,
    "source-atlas-aware-interval-implication-theorem-stated"
  );
});

test("source-atlas interval implication rejects invalid controls", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication({
        targetMarginFactor: 1.1,
      }),
    /targetMarginFactor/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication({
        derivativeTailSampleCount: 0,
      }),
    /derivativeTailSampleCount/
  );

  const broken = structuredClone(artifact());
  broken.artifact_claim.certifies_interval_sign_topology = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinarySourceAtlasIntervalImplication(
      broken
    ).join("\n"),
    /leave interval\/retention claims open/
  );
});

test("source-atlas interval implication CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-source-atlas-interval-implication.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-source-atlas-interval-implication-")
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_INTERVAL_IMPLICATION_SCHEMA
  );
});
