import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  SCHEMA,
  buildBraidIdealWiggleReturnResponseTarget,
  evaluateBraidIdealWiggleReturnResponseEvidence,
  validateBraidIdealWiggleReturnResponseTarget,
} from "../scripts/braid-ideal/wiggle-return-response-target.mjs";

const TOY_SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/held-release-causal-wake-toy.mjs", import.meta.url)
);

function runToy(args = []) {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "braid-ideal-wiggle-return-"));
  execFileSync(
    process.execPath,
    [
      TOY_SCRIPT_PATH,
      "--duration",
      "3",
      "--dt",
      "0.004",
      "--sample-every",
      "25",
      "--out",
      outputDir,
      ...args,
    ],
    { encoding: "utf8" }
  );
  return JSON.parse(fs.readFileSync(path.join(outputDir, "result.json"), "utf8"));
}

test("high field-speed wiggle gap emits a return-response target without authorizing evidence", () => {
  const toyResult = runToy(["--field-speed", "6"]);
  const artifact = buildBraidIdealWiggleReturnResponseTarget({ toyResult });
  const repeated = buildBraidIdealWiggleReturnResponseTarget({ toyResult });

  assert.deepEqual(artifact, repeated);
  assert.equal(artifact.schema, SCHEMA);
  assert.equal(
    artifact.artifact_status,
    "priority_only_wiggle_return_response_target_present_retained_evidence_blocked"
  );
  assert.equal(artifact.hard_math_status, "return_response_acceleration_floor_measured");
  assert.equal(artifact.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(artifact.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(artifact.summary.route_row_count, 5);
  assert.equal(artifact.summary.top_ranked_route, "central_solver_retained_history_return_response");
  assert.equal(artifact.summary.post_first_expansion_inward_rows, 0);
  assert.equal(artifact.summary.required_inward_acceleration_magnitude > 0, true);
  assert.equal(artifact.summary.required_response_acceleration_delta < 0, true);
  assert.equal(artifact.response_gap_row.post_first_expansion_outward_rows > 0, true);
  assert.equal(artifact.response_gap_row.equation_form.includes("ddot_R_total"), true);

  const noetherSeaRoute = artifact.return_response_route_rows.find(
    (row) => row.route_id === "noether_sea_pressure_tension_return_response"
  );
  assert.equal(noetherSeaRoute.first_missing_field, "theta_sea_rho_NS");
  assert.equal(noetherSeaRoute.measured_response_gap.required_inward_acceleration_magnitude > 0, true);
  assert.deepEqual(validateBraidIdealWiggleReturnResponseTarget(artifact), []);
});

test("field-speed crossing blocks the return-response target before retained evidence", () => {
  const toyResult = runToy();
  const artifact = buildBraidIdealWiggleReturnResponseTarget({ toyResult });

  assert.equal(artifact.artifact_status, "fail_closed_field_speed_crossing_before_return_response_target");
  assert.equal(artifact.hard_math_status, "field_speed_crossing_blocks_return_response_target");
  assert.equal(artifact.first_missing_object, "sub_field_speed_wiggle_window");
  assert.equal(artifact.first_missing_field, "trajectoryDiagnostics.checks.fieldSpeedPass");
  assert.equal(artifact.authorization.accepted_wiggle_return_response, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(validateBraidIdealWiggleReturnResponseTarget(artifact), []);
});

test("axial-paired control fails closed before the same-level return-response target", () => {
  const toyResult = runToy(["--preset", "axial-paired"]);
  const artifact = buildBraidIdealWiggleReturnResponseTarget({ toyResult });

  assert.equal(artifact.artifact_status, "fail_closed_same_level_window_lost");
  assert.equal(artifact.hard_math_status, "same_level_window_missing");
  assert.equal(artifact.first_missing_object, "same_level_symmetry_window");
  assert.equal(artifact.first_missing_field, "trajectoryDiagnostics.checks.symmetryWindowPass");
  assert.equal(artifact.response_gap_row.accepted, false);
  assert.deepEqual(validateBraidIdealWiggleReturnResponseTarget(artifact), []);
});

test("missing reduced-radius diagnostic fails closed without synthetic response values", () => {
  const artifact = buildBraidIdealWiggleReturnResponseTarget({});

  assert.equal(artifact.artifact_status, "fail_closed_missing_reduced_radius_diagnostic");
  assert.equal(artifact.first_missing_field, "toyResult.reducedRadiusDiagnostics");
  assert.equal(artifact.response_gap_row.min_post_first_expansion_radial_acceleration, null);
  assert.equal(artifact.response_gap_row.required_inward_acceleration_magnitude, null);
  assert.equal(artifact.response_gap_row.required_response_acceleration_delta, null);
  assert.deepEqual(validateBraidIdealWiggleReturnResponseTarget(artifact), []);
});

test("wiggle return-response evidence guard rejects non-evidence classes", () => {
  const artifact = buildBraidIdealWiggleReturnResponseTarget({ toyResult: runToy(["--field-speed", "6"]) });

  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.accepted_wiggle_return_response, false);
  assert.equal(artifact.authorization.retainedBranchClaim, false);
  assert.equal(artifact.authorization.acceptedSameLevelBranchClaim, false);
  assert.equal(artifact.authorization.accepted_branch_chart, false);
  assert.equal(artifact.authorization.accepted_transition_source, false);
  assert.equal(artifact.authorization.moving_retained_branch_certificate, false);
  assert.equal(artifact.authorization.same_ledger_action_measure_row, false);
  assert.equal(artifact.authorization.bounded_speed_live_ledger, false);
  assert.equal(artifact.authorization.receiver_normal_branch_strength, false);
  assert.equal(artifact.authorization.noether_sea_response, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.equal(artifact.accepted_wiggle_return_response_ref, null);
  assert.equal(artifact.retained_root_ledger_ref, null);
  assert.equal(artifact.accepted_noether_sea_response_ref, null);

  assert.equal(
    evaluateBraidIdealWiggleReturnResponseEvidence({
      schema: SCHEMA,
      accepted_wiggle_return_response: true,
    }).reason,
    NEGATIVE_CONTROL_REASONS.synthetic_accepted_ref
  );
  assert.equal(
    evaluateBraidIdealWiggleReturnResponseEvidence({
      schema: SCHEMA,
      retained_root_ledger_ref: "proxy:retained-root-ledger",
    }).reason,
    "proxy_or_synthetic_ref_not_accepted_wiggle_return_response_evidence"
  );
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    assert.deepEqual(
      evaluateBraidIdealWiggleReturnResponseEvidence({ evidence_class: evidenceClass }),
      {
        accepted: false,
        reason,
        first_missing_field: FIRST_MISSING_FIELD,
      }
    );
  }
});
