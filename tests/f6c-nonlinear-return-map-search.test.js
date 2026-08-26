import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
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

test("F6c radial-frequency continuation changes only the declared ratio", () => {
  const temporaryDirectory = fs.mkdtempSync(path.join(
    os.tmpdir(),
    "f6c-radial-frequency-test-",
  ));
  const summaryPath = path.join(temporaryDirectory, "seed-summary.json");
  const parameters = {
    positiveRate: 0.6777475842498528,
    negativeRate: 1.2545692425737796,
    negativeTheta: 3.3558616268757473,
    breathingRate: 0.7871087192596784,
    cyclePhase: 1.7608789455930196,
    positiveHAmplitude: 0.07708359321456587,
    negativeHAmplitude: -0.14726023070320604,
    positiveRhoAmplitude: 0.04625367707338149,
    negativeRhoAmplitude: -0.13409161558077534,
    positivePhaseAmplitude: 0.11575417461112308,
    negativePhaseAmplitude: -0.2540441565373307,
    positiveHPhaseOffset: 4.823973427622599,
    negativeHPhaseOffset: 2.2086340370677515,
    positiveRhoPhaseOffset: 5.9991942778841585,
    negativeRhoPhaseOffset: 3.437565716154844,
  };
  fs.writeFileSync(summaryPath, JSON.stringify({
    schema: "f6c-nonlinear-return-map-search/v2",
    stage: "dual-turn-discovery",
    rows: [{
      status: "analyzed",
      result: {
        index: 12,
        parameters,
        dualTurnDiscovery: { passed: true },
        manifest: { runId: "fixture-dual-turn-seed" },
      },
    }],
  }));
  try {
    const result = spawnSync(
      process.execPath,
      [
        "scripts/mapping-electromagnetism/f6c-nonlinear-return-map-search.mjs",
        "--stage=radial-frequency-continuation",
        "--rows=3",
        "--radial-breathing-ratios=1,0.9,1.1",
        "--seed-summary=" + summaryPath,
        "--seed-row=12",
        "--dry-run",
      ],
      { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
    );
    assert.equal(result.status, 0, result.stderr);
    const packet = JSON.parse(result.stdout);
    assert.equal(packet.stage, "radial-frequency-continuation");
    assert.equal(packet.continuationCoordinate, "radialBreathingRatio");
    assert.deepEqual(packet.radialBreathingRatios, [1, 0.9, 1.1]);
    assert.equal(packet.materialImprovementFraction, 0.1);
    assert.deepEqual(
      packet.candidates.map((row) => row.parameters.radialBreathingRatio),
      [1, 0.9, 1.1],
    );
    assert.ok(packet.candidates.every((row) => row.admission.passed));
    for (const row of packet.candidates) {
      const { radialBreathingRatio, ...fixedParameters } = row.parameters;
      assert.deepEqual(fixedParameters, parameters);
      assert.ok(radialBreathingRatio > 0);
    }
    assert.ok(
      packet.candidates[1].admission.speedBound.positive.components.radial
      < packet.candidates[0].admission.speedBound.positive.components.radial,
    );
    assert.ok(
      packet.candidates[2].admission.speedBound.negative.components.radial
      > packet.candidates[0].admission.speedBound.negative.components.radial,
    );
  } finally {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});
