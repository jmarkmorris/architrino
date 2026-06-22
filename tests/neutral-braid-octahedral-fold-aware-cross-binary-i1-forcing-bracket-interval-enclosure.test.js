import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_FORCING_BRACKET_INTERVAL_ENCLOSURE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure,
  validateOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure({
        rootSubdivisions: 5000,
        speedSampleCount: 9,
        machinePadding: 1e-9,
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

function row(id) {
  const found = artifact().endpoint_enclosure_rows.find(
    (entry) => entry.endpoint_id === id
  );
  assert.ok(found, `missing endpoint ${id}`);
  return found;
}

test("I1 forcing bracket speed-envelope certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure(packet),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_FORCING_BRACKET_INTERVAL_ENCLOSURE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_i1_forcing_bracket_interval_enclosure"
  );
  assert.equal(packet.promotion_status, "priority-only");
});

test("I1 forcing bracket certificate imposes no fixed speed window", () => {
  const packet = artifact();

  assert.equal(
    packet.enclosure_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.deepEqual(packet.enclosure_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.enclosure_parameters.speed_band, undefined);
  assert.equal(packet.enclosure_parameters.speed_window, undefined);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
});

test("I1 forcing bracket endpoint envelopes preserve signs below target radius", () => {
  const left = row("I1.f1.left");
  const right = row("I1.f1.right");

  assert.equal(left.source_root_counts_match, true);
  assert.equal(right.source_root_counts_match, true);
  assert.equal(left.expected_sign, "+");
  assert.equal(right.expected_sign, "-");
  assert.equal(left.forcing_enclosure[0] > 0, true);
  assert.equal(right.forcing_enclosure[1] < 0, true);
  assert.ok(Number(left.enclosure_radius) < Number(left.target_radius));
  assert.ok(Number(right.enclosure_radius) < Number(right.target_radius));
  assert.ok(Number(left.signed_clearance) > 0);
  assert.ok(Number(right.signed_clearance) > 0);
  near(left.target_radius, 0.000236179200694);
  near(right.target_radius, 0.000236179200694);
});

test("I1 forcing bracket summary records the bottleneck clearance", () => {
  const summary = artifact().envelope_summary;

  assert.equal(summary.bracket_row_id, "I1.forcing-bracket");
  near(summary.sampled_margin, 0.000472358401387);
  near(summary.target_radius, 0.000236179200694);
  assert.equal(summary.endpoint_count, 2);
  assert.equal(summary.certified_endpoint_count, 2);
  assert.ok(Number(summary.max_endpoint_enclosure_radius) < 7e-7);
  assert.ok(Number(summary.min_signed_clearance) > 4.7e-4);
  assert.equal(summary.status, "i1-forcing-bracket-speed-envelope-certified");
});

test("I1 forcing bracket certificate keeps interval and retention claims open", () => {
  const packet = artifact();

  assert.equal(packet.artifact_claim.certifies_I1_forcing_bracket_point_signs, true);
  assert.equal(
    packet.artifact_claim.certifies_I1_forcing_bracket_speed_envelope,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_outward_rounded_interval_enclosure,
    false
  );
  assert.equal(packet.artifact_claim.certifies_interval_derivative_enclosure, false);
  assert.equal(packet.artifact_claim.certifies_I1_zero_isolation, false);
  assert.equal(packet.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.theory_status,
    "source-atlas-aware-i1-forcing-bracket-speed-envelope-certified"
  );
  assert.equal(
    packet.result.first_successor_row,
    "I1.derivative-negative.full-cell-interval-derivative-enclosure-required"
  );
});

test("I1 forcing bracket certificate rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure({
        speedSampleCount: 2,
      }),
    /speedSampleCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure({
        machinePadding: 0,
      }),
    /machinePadding/
  );

  const broken = structuredClone(artifact());
  broken.artifact_claim.certifies_outward_rounded_interval_enclosure = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure(
      broken
    ).join("\n"),
    /leave interval\/retention claims open/
  );
});

test("I1 forcing bracket CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-i1-forcing-bracket-")
  );
  const outPath = path.join(tmpDir, "packet.json");

  execFileSync(
    process.execPath,
    [script, "--out", outPath, "--pretty", "--speed-samples", "5"],
    {
      stdio: "pipe",
    }
  );
  execFileSync(process.execPath, [script, "--validate", outPath], {
    stdio: "pipe",
  });
  assert.equal(
    execFileSync(process.execPath, [script, "--schema"], {
      encoding: "utf8",
    }).trim(),
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_FORCING_BRACKET_INTERVAL_ENCLOSURE_SCHEMA
  );
});
