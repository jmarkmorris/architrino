import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FINITE_CANDIDATE_REDUCTION_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryFiniteCandidateReduction,
  validateOctahedralFoldAwareCrossBinaryFiniteCandidateReduction,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-finite-candidate-reduction.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareCrossBinaryFiniteCandidateReduction({
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

test("fold-aware finite candidate reduction validates topology and value predecessors", () => {
  const reduction = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryFiniteCandidateReduction(reduction),
    []
  );
  assert.equal(
    reduction.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FINITE_CANDIDATE_REDUCTION_SCHEMA
  );
  assert.equal(
    reduction.packet_id,
    "octahedral_fold_aware_cross_binary_finite_candidate_reduction"
  );
  assert.equal(reduction.promotion_status, "priority-only");
  assert.equal(reduction.source_forcing_topology_atlas_check.valid, true);
  assert.equal(reduction.source_critical_value_atlas_check.valid, true);
  assert.equal(
    reduction.source_forcing_topology_atlas_check
      .certifies_interval_critical_exhaustion,
    false
  );
  assert.equal(
    reduction.source_critical_value_atlas_check
      .certifies_C_m_Q_M_Q_interval_enclosure,
    false
  );
});

test("fold-aware finite candidate reduction imposes no speed window", () => {
  const reduction = artifact();

  assert.equal(
    reduction.reduction_parameters.speed_constraint,
    "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only"
  );
  assert.deepEqual(reduction.reduction_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(reduction.reduction_parameters.speed_ratio_estimate, 3.021564740248);
  assert.equal(reduction.artifact_claim.assumes_fixed_speed_window, false);
});

test("fold-aware finite candidate reduction states the conditional theorem", () => {
  const reduction = artifact();
  const theorem = reduction.finite_candidate_theorem;

  assert.equal(
    theorem.theorem_name,
    "conditional fold-aware cross-binary finite-candidate reduction"
  );
  assert.match(theorem.statement, /reduces the primitive extrema/);
  assert.deepEqual(theorem.proof_route.slice(0, 2), [
    "Use A'_cross=f_cross and A''_cross=f'_cross on each regular cell.",
    "Apply the one-dimensional monotonicity theorem on I1 to get one regular critical point.",
  ]);
  assert.equal(
    theorem.sampled_witness_status,
    "sampled-topology-satisfies-finite-candidate-reduction-hypotheses"
  );
  assert.equal(
    theorem.theorem_claim_level,
    "conditional theorem target with sampled witness rows; exact interval critical exhaustion remains open"
  );
});

test("fold-aware finite candidate reduction aligns all candidate rows", () => {
  const reduction = artifact();

  assert.equal(reduction.reduction_rows.length, 4);
  assert.ok(reduction.reduction_rows.every((row) => row.sampled_witness));
  assert.deepEqual(reduction.finite_candidate_set.candidate_ids, [
    "endpoint.0",
    "I1.z1",
    "fold.3-",
    "I2.z1",
    "fold.2+",
    "endpoint.Q",
  ]);
  assert.equal(reduction.finite_candidate_set.candidate_count, 6);
  assert.equal(reduction.finite_candidate_set.candidate_ids_match_topology, true);
  assert.equal(
    reduction.finite_candidate_set.status,
    "sampled-finite-candidate-set-aligned-with-topology"
  );
});

test("fold-aware finite candidate reduction derives margin budgets", () => {
  const reduction = artifact();
  const margins = reduction.extremum_margin_budgets;
  const budget = reduction.interval_closure_budget;

  assert.equal(margins.sampled_M_Q_candidate_id, "I1.z1");
  near(margins.sampled_M_Q_gap_to_second, 0.001648085483);
  near(margins.equal_radius_M_Q_certification_budget, 0.0008240427415);
  assert.equal(margins.sampled_m_Q_candidate_id, "endpoint.Q");
  near(margins.sampled_m_Q_gap_to_second, 0.148348886356);
  near(margins.equal_radius_m_Q_certification_budget, 0.074174443178);
  near(margins.negative_C_cross_budget, 0.2680796825);
  assert.equal(margins.status, "sampled-extremum-margin-budgets-positive");

  near(budget.equal_radius_full_order_budget, 0.0004836066205);
  near(budget.positive_M_Q_budget, 0.001648085483);
  assert.equal(budget.status, "sampled-margin-closure-budgets-derived");
});

test("fold-aware finite candidate reduction preserves interval and retention boundaries", () => {
  const reduction = artifact();

  assert.equal(
    reduction.artifact_claim.certifies_conditional_finite_candidate_reduction,
    true
  );
  assert.equal(
    reduction.artifact_claim.certifies_sampled_topology_witness_for_reduction,
    true
  );
  assert.equal(
    reduction.artifact_claim.certifies_sampled_candidate_value_margin_budgets,
    true
  );
  assert.equal(
    reduction.artifact_claim.certifies_C_m_Q_M_Q_interval_enclosure,
    false
  );
  assert.equal(reduction.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(reduction.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(reduction.artifact_claim.retained_branch, false);
  assert.equal(reduction.result.retention, "not_retained");
});

test("fold-aware finite candidate reduction rejects invalid controls", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryFiniteCandidateReduction({
        valueQuadraturePanelsPerSegment: 16,
      }),
    /valueQuadraturePanelsPerSegment/
  );
  const broken = structuredClone(artifact());
  broken.extremum_margin_budgets.sampled_M_Q_candidate_id = "endpoint.0";
  assert.match(
    validateOctahedralFoldAwareCrossBinaryFiniteCandidateReduction(broken).join(
      "\n"
    ),
    /positive sampled extremum margins/
  );
});

test("fold-aware finite candidate reduction CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-finite-candidate-reduction.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-finite-candidate-")
  );
  const outPath = path.join(tmpDir, "reduction.json");

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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FINITE_CANDIDATE_REDUCTION_SCHEMA
  );
});
