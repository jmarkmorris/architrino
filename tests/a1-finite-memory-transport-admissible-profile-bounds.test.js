import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const python = process.env.AAA_VENV
  ? path.join(process.env.AAA_VENV, "bin", "python")
  : path.resolve(repoRoot, "../.venv/bin/python");
const scriptPath = path.join(
  repoRoot,
  "reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py"
);

test("A1 admissible profile bounds attempt remains fail-closed and priority-only", () => {
  const output = execFileSync(
    python,
    [
      scriptPath,
      "--theta-hi",
      "0.02",
      "--delta-steps",
      "128",
      "--integration-panels",
      "16",
      "--profile-mode",
      "tangential_transport",
      "--transport-steps",
      "16",
      "--past-profile",
      "endpoint_slope_cancel",
      "--endpoint-cancel-positivity-samples",
      "101",
      "--diagnostic-mode",
      "a1_admissible_profile_bounds_attempt",
      "--finite-collar-samples",
      "3",
      "--finite-collar-integration-panels",
      "16",
      "--finite-collar-transport-steps",
      "16",
      "--finite-collar-delta-steps",
      "128",
      "--finite-collar-positivity-samples",
      "101",
    ],
    {
      cwd: repoRoot,
      encoding: "utf8",
      env: {
        ...process.env,
        VIRTUAL_ENV: process.env.AAA_VENV ?? path.resolve(repoRoot, "../.venv"),
      },
    }
  );
  const packet = JSON.parse(output);

  assert.equal(
    packet.schema,
    "architrino.priority.master_equation_closure.a1_admissible_profile_bounds.v0"
  );
  assert.equal(packet.artifact_id, "a1_admissible_profile_bounds.v0");
  assert.equal(packet.diagnostic_mode, "a1_admissible_profile_bounds_attempt");
  assert.equal(packet.first_failure, "admissible_profile_bounds");
  assert.equal(packet.promotion_authorized, false);
  assert.equal(packet.authorizes_outward_certificate, false);
  assert.equal(packet.authorizes_obstruction_or_channel_decision, false);
  assert.equal(packet.past_profile_bounds.used_as_certificate, false);
  assert.equal(packet.future_profile_admissibility.used_as_certificate, false);
  assert.equal(packet.retained_root_context.used_as_certificate, false);
  assert.equal(
    packet.past_profile_bounds.status,
    "sampled_seed_bounds_only_not_certified"
  );
  assert.equal(
    packet.future_profile_admissibility.status,
    "sampled_transport_bounds_only_not_certified"
  );
  assert.equal(
    packet.retained_root_context.status,
    "sampled_retained_context_only_not_root_persistence_row"
  );
  assert.equal(packet.sampled_attempt_reading, "sampled_bounds_within_declared_convention");
  assert.equal(packet.retained_root_context.sampled_active_labels_match_retained_set, true);
  assert.equal(packet.reduced_smoke_context.used_as_certificate, false);
  assert.equal(packet.reduced_smoke_context.recomputed_by_this_mode, false);
  assert.ok(packet.blocked_rows.includes("outward_profile_bounds_absent"));
  assert.ok(packet.blocked_rows.includes("E_Q_plus_b_absent"));
});
