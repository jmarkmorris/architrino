import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { createEomHistoryDataset } from "../src/apps/shared/EomHistoryDataset.mjs";

import {
  BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING,
  BORG_PRESCRIBED_DISPLAY_FRAME_FIXED,
  applyBorgPrescribedDisplayFrame,
  applyBorgPrescribedVelocityFrame,
  borgPrescribedDisplayFrameReadout,
  resolveBorgPrescribedTranslation,
} from "../src/apps/borg/BorgPrescribedTranslation.js";

test("prescribed controls default closed and timeline scrubbing captures its requested frame", () => {
  const htmlSource = readFileSync(new URL("../borg.html", import.meta.url), "utf8");
  const runtimeSource = readFileSync(
    new URL("../src/apps/borg/BorgAppRuntime.js", import.meta.url),
    "utf8",
  );

  assert.match(
    htmlSource,
    /<details id="borg-prescribed-translation-drawer" class="borg-control-drawer">/,
  );
  assert.match(
    htmlSource,
    /<details id="borg-prescribed-analysis-drawer" class="borg-control-drawer">/,
  );
  assert.match(
    runtimeSource,
    /const requestedFrameIndex = Number\(dom\.timelineRange\.value\);\s*stopPlayback\(\);\s*updateFrame\(requestedFrameIndex\);/,
  );
});

test("source-carried translation maps fixed and co-translating positions without mutation", () => {
  const entry = prescribedEntry({
    centerAtEpoch: [4, -2, 1],
    velocity: [0.5, -0.25, 1],
  });
  const translation = resolveBorgPrescribedTranslation(entry);
  const sourcePosition = Object.freeze({ x: 7, y: 1, z: 9 });
  const fixed = applyBorgPrescribedDisplayFrame(
    sourcePosition,
    6,
    translation,
    BORG_PRESCRIBED_DISPLAY_FRAME_FIXED,
  );
  const coTranslating = applyBorgPrescribedDisplayFrame(
    sourcePosition,
    6,
    translation,
    BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING,
  );

  assert.deepEqual(fixed, sourcePosition);
  assert.deepEqual(coTranslating, { x: 4, y: 2.5, z: 3 });
  assert.deepEqual(sourcePosition, { x: 7, y: 1, z: 9 });
  assert.equal(translation.epochTime, 0);
  assert.equal(
    translation.source,
    "provenance.prescribedGeometry.coordinates.geometry.assemblyPlacement.centerAtEpoch/velocity",
  );
});

test("current v3 prescribed records expose the canonical assembly-placement carrier", () => {
  const rawRecord = JSON.parse(readFileSync(new URL(
    "../content/assets/borg/records/axial-transverse-three-binary-interior.assembly-view-record.v0.json",
    import.meta.url,
  )));
  const translation = resolveBorgPrescribedTranslation({
    sourceId: rawRecord.sourceId,
    rawRecord,
    dataset: createEomHistoryDataset(rawRecord),
  });

  assert.equal(translation.available, true);
  assert.equal(translation.stationary, true);
  assert.deepEqual(translation.centerAtEpoch, { x: 0, y: 0, z: 0 });
  assert.deepEqual(translation.velocity, { x: 0, y: 0, z: 0 });
});

test("co-translating velocity subtracts only the declared common velocity", () => {
  const translation = resolveBorgPrescribedTranslation(prescribedEntry({
    centerAtEpoch: [0, 0, 0],
    velocity: [0.25, -0.5, 0.75],
  }));
  const sourceVelocity = Object.freeze({ x: 1.25, y: 1.5, z: -0.25 });

  assert.deepEqual(
    applyBorgPrescribedVelocityFrame(
      sourceVelocity,
      translation,
      BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING,
    ),
    { x: 1, y: 2, z: -1 },
  );
  assert.deepEqual(sourceVelocity, { x: 1.25, y: 1.5, z: -0.25 });
});

test("zero common translation makes the two display frames coincide exactly", () => {
  const translation = resolveBorgPrescribedTranslation(prescribedEntry({
    centerAtEpoch: [0, 0, 0],
    velocity: [0, 0, 0],
  }));
  const position = { x: -3, y: 2, z: 0.5 };

  assert.equal(translation.stationary, true);
  assert.deepEqual(
    applyBorgPrescribedDisplayFrame(
      position,
      123.5,
      translation,
      BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING,
    ),
    position,
  );
  assert.match(
    borgPrescribedDisplayFrameReadout({
      frame: BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING,
      time: 123.5,
      translation,
    }),
    /source translation is zero/,
  );
});

test("co-translating display does not advance without a translation carrier", () => {
  const translation = resolveBorgPrescribedTranslation(prescribedEntry(null));

  assert.equal(translation.available, false);
  assert.equal(translation.code, "missing-assembly-placement");
  assert.throws(
    () => applyBorgPrescribedDisplayFrame(
      { x: 0, y: 0, z: 0 },
      0,
      translation,
      BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING,
    ),
    /Missing carrier/,
  );
});

function prescribedEntry(assemblyPlacement) {
  return {
    sourceId: "translation-fixture",
    dataset: {
      provenance: {
        engineId: "prescribed-geometry",
        prescribedGeometry: {
          coordinates: assemblyPlacement == null
            ? {}
            : { geometry: { assemblyPlacement } },
        },
      },
    },
  };
}
