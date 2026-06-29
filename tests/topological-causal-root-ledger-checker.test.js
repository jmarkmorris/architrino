import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  TOPOLOGICAL_CAUSAL_ROOT_LEDGER_SCHEMA,
  buildTopologicalCausalRootLedgerArtifact,
  validateTopologicalCausalRootLedgerArtifact,
} from "../scripts/proof-programs/topological-causal-root-ledger-checker.mjs";

const scriptPath = fileURLToPath(
  new URL("../scripts/proof-programs/topological-causal-root-ledger-checker.mjs", import.meta.url)
);

test("topological causal-root ledger checker emits the requested priority rows", () => {
  const artifact = buildTopologicalCausalRootLedgerArtifact({
    subdivisions: 300,
    windingRadius: 1,
  });
  const errors = validateTopologicalCausalRootLedgerArtifact(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, TOPOLOGICAL_CAUSAL_ROOT_LEDGER_SCHEMA);
  assert.equal(artifact.promotion_status, "priority-only diagnostic");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.updates_live_validation_gate, false);
  assert.equal(artifact.causal_root_ledger.summary.pair_contact_min_root_count >= 1, true);
  assert.equal(artifact.causal_root_ledger.summary.self_hit_root_count >= 1, true);
  assert.equal(artifact.causal_root_ledger.summary.winding_owner_present, true);
  assert.equal(artifact.source_record_contract.source_record_id, "theta_sea_branch_q0_v0");
  assert.equal(artifact.source_record_contract.retained_chart_id, "torus_root_ledger_q0");
  assert.deepEqual(artifact.source_record_contract.retained_window, {
    id: "W0",
    h: artifact.scenario.retained_history_window,
    memory_depth: artifact.scenario.retained_history_window,
  });
  assert.equal(
    artifact.source_record_contract.active_root_ledger.root_row_count,
    artifact.causal_root_ledger.summary.root_row_count
  );
  assert.equal(artifact.source_record_contract.event_ledger_id, "L_EpJ_q0");
  assert.equal(artifact.source_record_contract.response_object_id, "M_sea_q0");
  assert.equal(artifact.source_point_vs_eta_segment.row_count, artifact.causal_root_ledger.root_rows.length);
  assert.ok(
    artifact.photon_constituent_speed_split.rows.some(
      (row) => row.speed_relation === "constituent_absolute_speed_exceeds_c_f"
    )
  );
  assert.equal(artifact.middle_hinge_root_count_word.not_literal_communication, true);
  assert.equal(artifact.middle_hinge_root_count_word.root_status_word, "0 1 C 0 1 1 0");
});

test("topological causal-root ledger checker CLI writes and validates JSON", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "topological-causal-root-ledger-"));
  const artifactPath = path.join(tempDir, "artifact.json");

  execFileSync(
    process.execPath,
    [scriptPath, "--subdivisions", "300", "--winding-radius", "1", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateTopologicalCausalRootLedgerArtifact(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.schema, TOPOLOGICAL_CAUSAL_ROOT_LEDGER_SCHEMA);
  assert.equal(validation.result.diagnostic_status, "diagnostic_passed_priority_only");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, TOPOLOGICAL_CAUSAL_ROOT_LEDGER_SCHEMA);
});
