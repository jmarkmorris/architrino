import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_SAME_SOURCE_WITNESS_SCHEMA,
  buildOctahedralSameSourceWitness,
  sameSourceEquation,
  validateOctahedralSameSourceWitness,
} from "../scripts/neutral-swarm/octahedral-same-source-witness.mjs";

test("octahedral same-source witness excludes ordinary positive-delay roots", () => {
  const artifact = buildOctahedralSameSourceWitness({ sampleCount: 33 });
  const errors = validateOctahedralSameSourceWitness(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, "neutral-swarm-octahedral-same-source-witness/v1");
  assert.equal(artifact.packet_id, "octahedral_same_source_positive_delay_witness");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.closure_status, "closed-rejected:ordinary-same-source-positive-delay");
  assert.equal(artifact.ordinary_same_source_status, "excluded_positive_delay");
  assert.equal(artifact.retention, "not_retained");
  assert.equal(artifact.result.closure_status, "closed-rejected:ordinary-same-source-positive-delay");
  assert.equal(artifact.result.ordinary_same_source_status, "excluded_positive_delay");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_positive_delay_root, false);
  assert.equal(artifact.result.equality, "only_excluded_y_0_limit");

  assert.equal(sameSourceEquation(0), 0);
  for (const y of [1e-4, 0.001, 0.25, 1, 2]) {
    assert.ok(sameSourceEquation(y) < 0, `G_self(${y}) must be negative`);
  }

  assert.equal(artifact.interval_certificates.length, 5);
  assert.deepEqual(artifact.interval_certificates.map((row) => row.equality_in_interval), [
    false,
    false,
    false,
    false,
    false,
  ]);
  assert.equal(artifact.interval_certificates[0].lower_open, true);
  assert.equal(artifact.interval_certificates[0].max_upper_bound, 0);
  assert.equal(artifact.interval_certificates[0].endpoint_values.y_to_0_plus_limit, 0);
  assert.ok(artifact.interval_certificates[1].max_upper_bound < 0);

  assert.equal(artifact.sample_certificate.sample_count, 33);
  assert.equal(artifact.sample_certificate.all_samples_negative, true);
  assert.equal(artifact.sample_certificate.samples.length, 33);
  assert.equal(artifact.sample_certificate.samples.at(-1).y, 2);
  assert.equal(artifact.sample_certificate.samples.at(-1).sign, "negative");

  assert.equal(artifact.large_delay_exclusion.domain, "y>2");
  assert.equal(artifact.large_delay_exclusion.same_source_separation_bound, 2);
  assert.equal(artifact.large_delay_exclusion.status, "excluded_by_bounded_separation");
});

test("octahedral same-source witness carries all six site labels with the same status", () => {
  const artifact = buildOctahedralSameSourceWitness();
  const labels = artifact.site_statuses.map((row) => row.label);

  assert.deepEqual(labels, ["1+", "1-", "2+", "2-", "3+", "3-"]);
  assert.equal(new Set(artifact.site_statuses.map((row) => row.site)).size, 6);
  for (const row of artifact.site_statuses) {
    assert.equal(row.ordinary_same_source_status, "excluded_positive_delay");
    assert.equal(row.equality_status, "only_excluded_y_0_limit");
    assert.equal(row.retention, "not_retained");
  }

  const serialized = JSON.stringify(artifact);
  assert.equal(serialized.includes("controlled self-hit"), false);
  assert.equal(serialized.includes("fold-layer"), false);
});

test("octahedral same-source witness CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-swarm-same-source-witness-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-swarm/octahedral-same-source-witness.mjs", import.meta.url)
  );

  execFileSync(process.execPath, [scriptPath, "--samples", "17", "--out", artifactPath, "--pretty"], {
    encoding: "utf8",
  });

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralSameSourceWitness(artifact), []);
  assert.equal(artifact.sample_certificate.sample_count, 17);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.closure_status, "closed-rejected:ordinary-same-source-positive-delay");
  assert.equal(validation.ordinary_same_source_status, "excluded_positive_delay");
  assert.equal(validation.retention, "not_retained");
  assert.equal(validation.sample_count, 17);
  assert.equal(validation.site_status_count, 6);

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_SAME_SOURCE_WITNESS_SCHEMA);
});
