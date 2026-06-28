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
      "--admissible-profile-bernstein-depth",
      "12",
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
    "past_profile_float_bernstein_outward_attempt_not_interval_certificate"
  );
  assert.equal(
    packet.past_profile_bounds.outward_attempt.method,
    "subdivided_bernstein_convex_hull_float64"
  );
  assert.equal(packet.past_profile_bounds.outward_attempt.subdivision_depth, 12);
  assert.equal(
    packet.past_profile_bounds.outward_attempt.subinterval_count,
    4096
  );
  assert.ok(packet.past_profile_bounds.outward_q_min > 0.65);
  assert.ok(
    packet.past_profile_bounds.outward_q_min
      < packet.past_profile_bounds.sampled_seed_q_min
  );
  assert.ok(
    packet.past_profile_bounds.outward_q_max
      > packet.past_profile_bounds.sampled_seed_q_max
  );
  assert.ok(packet.past_profile_bounds.H_b > 0.53);
  assert.equal(packet.past_profile_bounds.used_as_certificate, false);
  assert.equal(
    packet.future_profile_admissibility.status,
    "transport_node_envelope_only_not_interval_certificate"
  );
  assert.equal(
    packet.future_profile_admissibility.transport_node_envelope.status,
    "transport_node_envelope_not_interval_certificate"
  );
  assert.equal(
    packet.future_profile_admissibility.transport_node_envelope.outward_for_continuous_transport_equation,
    false
  );
  assert.equal(
    packet.retained_root_context.status,
    "sampled_retained_context_only_not_root_persistence_row"
  );
  assert.equal(packet.sampled_attempt_reading, "sampled_bounds_within_declared_convention");
  assert.equal(
    packet.retained_root_context.sampled_active_labels_match_retained_set,
    true
  );
  assert.equal(packet.reduced_smoke_context.used_as_certificate, false);
  assert.equal(packet.reduced_smoke_context.recomputed_by_this_mode, false);
  assert.ok(
    packet.blocked_rows.includes("past_profile_interval_certificate_absent")
  );
  assert.ok(packet.blocked_rows.includes("future_outward_profile_bounds_absent"));
  assert.ok(packet.blocked_rows.includes("E_Q_plus_b_absent"));
});
