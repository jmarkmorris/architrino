import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_C1_TWENTY_SEVENTH_ORDER_TAIL_BOUND_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdC1TwentySeventhOrderTailBoundCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdC1TwentySeventhOrderTailBoundCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-c1-twenty-seventh-order-tail-bound-certificate.mjs";

const EXPECTED_OBSTRUCTION_STATUS =
  "rigorous-obstruction-theta3minus-fold-pair-first-y-GD-C1-twenty-seventh-order-tail-bound-open";
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    process.stderr.write(
      "# building C1 twenty-seventh-order tail-bound artifact; this imports the full Shift31 tube\n"
    );
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdC1TwentySeventhOrderTailBoundCertificate();
    process.stderr.write("# built C1 twenty-seventh-order tail-bound artifact\n");
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-c1-twenty-seventh-order-tail-bound-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y G/D C1 twenty-seventh-order tail-bound obstruction validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdC1TwentySeventhOrderTailBoundCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_C1_TWENTY_SEVENTH_ORDER_TAIL_BOUND_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_c1_twenty_seventh_order_tail_bound_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_OBSTRUCTION_STATUS);
});

test("C1 twenty-seventh-order tail-bound attempt imposes no fixed speed band", () => {
  const packet = artifact();
  const params = packet.c1_twenty_seventh_order_tail_bound_parameters;

  assert.equal(params.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(params.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(params.speed_cell_count, 128);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(params.speed_band, undefined);
  assert.equal(params.speed_window, undefined);
  assert.equal(params.speed_min, undefined);
  assert.equal(params.speed_max, undefined);
});

test("C1 twenty-seventh-order tail-bound attempt includes Xi and rejects invalid derivative routes", () => {
  const packet = artifact();
  const summary = packet.c1_twenty_seventh_order_tail_bound_summary;
  const firstRow = packet.c1_twenty_seventh_order_tail_bound_rows[0];

  assert.equal(summary.h26_seed_artifact_valid, true);
  assert.equal(summary.finite_shift31_artifact_valid, true);
  assert.equal(summary.all_rows_include_root_tangent_Xi, true);
  assert.equal(summary.all_rows_reject_constant_W_derivative, true);
  assert.equal(summary.all_rows_avoid_direct_D_unfactored_F_delta_inverse, true);
  assert.equal(summary.all_rows_avoid_zero_touching_y_division, true);
  assert.equal(firstRow.C1_root_tangent_Xi_used, true);
  assert.match(firstRow.tangent_operator, /Xi_epsilon=-y\*partial_y R_epsilon,31\/J_epsilon/);
  assert.equal(firstRow.constant_W_derivative_used, false);
  assert.equal(firstRow.direct_D_unfactored_F_delta_inverse_used, false);
});

test("C1 twenty-seventh-order tail-bound attempt records exact positive obstruction bounds", () => {
  const packet = artifact();
  const summary = packet.c1_twenty_seventh_order_tail_bound_summary;
  const worstRow = packet.c1_twenty_seventh_order_tail_bound_rows.find(
    (row) => row.cell_id === summary.worst_D_identity_budget_row
  );

  assert.equal(summary.c1_tail_row_count, 1920);
  assert.equal(summary.tail_order, 27);
  assert.equal(summary.numerator_shift_power, 29);
  assert.equal(summary.root_shift_power, 31);
  assert.equal(summary.all_rows_close_C1_twenty_seventh_order_tail_budget, false);
  assert.equal(summary.min_abs_branch_J_clearance, 0.791609030534);
  assert.equal(summary.max_abs_T_G_27, 3.80666108795e110);
  assert.equal(summary.max_abs_D_y_T_G_27, 4.03517714144e128);
  assert.equal(summary.max_T_D_27_identity_bound_abs, 4.03517714144e128);
  assert.equal(summary.Q_G_tail_budget, 1.15377790014e73);
  assert.equal(summary.Q_D_tail_budget, 1.15370158828e73);
  assert.equal(summary.Q_D_identity_TG_only_ceiling, 4.12036281529e71);
  assert.equal(summary.max_Q_G_budget_excess, 3.80666108795e110);
  assert.equal(summary.max_Q_D_identity_budget_excess, 4.03517714144e128);
  assert.equal(summary.worst_G_budget_row, "speed.0.first-y-positive.1.pair");
  assert.equal(summary.worst_D_identity_budget_row, "speed.0.first-y-positive.1.pair");
  assert.match(summary.obstruction_driver, /coefficient-preserving Taylor quotient/);
  assert.equal(worstRow.T_D_27_identity_bound_abs, 4.03517714144e128);
  assert.equal(worstRow.Q_D_identity_budget_excess, 4.03517714144e128);
  assert.deepEqual(worstRow.y_interval, [0.0001123046875, 0.000224609375]);
  assert.deepEqual(worstRow.shifted_G_tail_numerator_interval, [
    -0.000110174944504,
    0.000110069113266,
  ]);
});

test("C1 twenty-seventh-order tail-bound validator rejects invalid controls, speed-band fields, and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdC1TwentySeventhOrderTailBoundCertificate(
        { ySubcellCount: 2 }
      ),
    /ySubcellCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdC1TwentySeventhOrderTailBoundCertificate(
        { wTubePadding: -1 }
      ),
    /wTubePadding/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdC1TwentySeventhOrderTailBoundCertificate(
        { zPredecessorTubePadding: -1 }
      ),
    /zPredecessorTubePadding/
  );

  const packet = clone(artifact());
  packet.c1_twenty_seventh_order_tail_bound_parameters.speed_band = "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_C1_twenty_seventh_order_tail_bound = true;
  packet.artifact_claim.certifies_rigorous_C1_tail_bound_obstruction = false;
  packet.artifact_claim.uses_constant_W_derivative = true;
  packet.artifact_claim.uses_direct_D_unfactored_F_delta_inverse = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_quadrature = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdC1TwentySeventhOrderTailBoundCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "C1 twenty-seventh-order tail-bound parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "C1 artifact must either certify the twenty-seventh-order tail budgets or record a rigorous positive D-identity budget obstruction"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must include root-tangent C1 identity discipline and keep full quotient, scaled remainder, I1, quadrature, and retention open"
    )
  );
});

test("C1 twenty-seventh-order tail-bound CLI validates artifact JSON and reports schema", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-c1-27-"));
  const outPath = path.join(tmpDir, "artifact.json");
  fs.writeFileSync(outPath, `${JSON.stringify(artifact(), null, 2)}\n`);

  const validateOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--validate", outPath], {
      encoding: "utf8",
    })
  );
  assert.equal(validateOutput.valid, true);

  const schemaOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--schema"], {
      encoding: "utf8",
    })
  );
  assert.equal(
    schemaOutput.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_C1_TWENTY_SEVENTH_ORDER_TAIL_BOUND_CERTIFICATE_SCHEMA
  );
});
