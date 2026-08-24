import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("F6c dual-turn dry run declares a broad admitted history domain", () => {
  const result = spawnSync(
    process.execPath,
    [
      "scripts/mapping-electromagnetism/f6c-nonlinear-return-map-search.mjs",
      "--stage=dual-turn-discovery",
      "--rows=16",
      "--seed-offset=1",
      "--dry-run",
    ],
    { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
  );
  assert.equal(result.status, 0, result.stderr);
  const packet = JSON.parse(result.stdout);
  assert.equal(packet.schema, "f6c-nonlinear-return-map-search-dry-run/v1");
  assert.equal(packet.stage, "dual-turn-discovery");
  assert.equal(packet.discoveryDomain.fixedConditions.fieldSpeed, 1);
  assert.equal(packet.candidates.length, 16);
  assert.ok(packet.candidates.every((row) => row.admission.passed));
  assert.ok(packet.candidates.every(
    (row) => row.admission.speedBound.maximum < 1,
  ));
  assert.ok(new Set(packet.candidates.map(
    (row) => row.parameters.positiveHAmplitude,
  )).size > 8);
  assert.ok(new Set(packet.candidates.map(
    (row) => row.parameters.negativeRhoPhaseOffset,
  )).size > 8);
  assert.deepEqual(
    Object.keys(packet.candidates[0].parameters).sort(),
    [
      "breathingRate",
      "cyclePhase",
      "negativeHAmplitude",
      "negativeHPhaseOffset",
      "negativePhaseAmplitude",
      "negativeRate",
      "negativeRhoAmplitude",
      "negativeRhoPhaseOffset",
      "negativeTheta",
      "positiveHAmplitude",
      "positiveHPhaseOffset",
      "positivePhaseAmplitude",
      "positiveRate",
      "positiveRhoAmplitude",
      "positiveRhoPhaseOffset",
    ],
  );
});
