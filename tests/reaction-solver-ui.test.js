import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  REACTION_CENTER_ASSEMBLY_PICKER_ENTRIES,
  REACTION_OPERATOR_LANE_LAYOUT,
  REACTION_OPERATOR_LANE_COUNT,
  REACTION_OPERATOR_ENTRIES,
} from "../src/runtime/ComposerReactionSolverUiRuntime.js";

test("reaction solver keeps two operator lanes available", () => {
  assert.equal(REACTION_OPERATOR_LANE_COUNT, 2);
});

test("reaction solver operator registry includes only associate and dissociate", () => {
  assert.deepEqual(
    REACTION_OPERATOR_ENTRIES.map((entry) => entry.templateId),
    [
      "associate",
      "dissociate",
    ]
  );
});

test("reaction solver operator layout assigns dissociate to the inner-left group and associate to the inner-right group", () => {
  assert.deepEqual(
    REACTION_OPERATOR_LANE_LAYOUT.map((entry) => ({
      laneIndex: entry.laneIndex,
      templateId: entry.templateId,
      enabled: entry.enabled,
    })),
    [
      { laneIndex: 0, templateId: "assembly", enabled: true },
      { laneIndex: 1, templateId: "operator", enabled: true },
    ]
  );
  assert.deepEqual(
    REACTION_OPERATOR_LANE_LAYOUT[0].pickerEntries.map((entry) => entry.templateId),
    ["dissociate"]
  );
  assert.deepEqual(
    REACTION_OPERATOR_LANE_LAYOUT[1].pickerEntries.map((entry) => entry.templateId),
    ["associate"]
  );
});

test("reaction solver center assembly lane exposes W-, W+, and Z bosons", () => {
  assert.deepEqual(
    REACTION_CENTER_ASSEMBLY_PICKER_ENTRIES.map((entry) => entry.templateId),
    ["w_minus_boson", "w_plus_boson", "z_boson"]
  );
});

test("W and Z bosons are not treated as polarity-toggling templates", () => {
  const runtimeSource = readFileSync(
    new URL("../src/runtime/ComposerReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );
  const setStart = runtimeSource.indexOf("const participantPolarityTemplateIds = new Set([");
  const setEnd = runtimeSource.indexOf("]);", setStart);
  const polaritySetSource = runtimeSource.slice(setStart, setEnd);
  assert.ok(setStart >= 0 && setEnd > setStart);
  assert.equal(polaritySetSource.includes('"w_minus_boson"'), false);
  assert.equal(polaritySetSource.includes('"w_plus_boson"'), false);
  assert.equal(polaritySetSource.includes('"z_boson"'), false);
});

test("center assemblies use their own reorder collection during side-column dragging", () => {
  const runtimeSource = readFileSync(
    new URL("../src/runtime/ComposerReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /const collectionKey = getParticipantCollectionKey\(participant\);/
  );
  assert.match(
    runtimeSource,
    /collectionKey === "center-assembly"\s*\?\s*centerAssembliesColumn/
  );
  assert.match(
    runtimeSource,
    /reorderParticipantCollection\(collectionKey,\s*nextParticipantIds\)/
  );
});

test("center assembly header geometry is resynced with the other lane columns", () => {
  const runtimeSource = readFileSync(
    new URL("../src/runtime/ComposerReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /const centerSynced = syncSideColumnTrackAlignment\(centerAssembliesColumn,\s*"center"\);/
  );
  assert.match(
    runtimeSource,
    /if \(reactantsSynced \|\| centerSynced \|\| productsSynced\) \{/
  );
});

test("center assemblies snap to explicit canvas rows so they can occupy empty grid lines", () => {
  const runtimeSource = readFileSync(
    new URL("../src/runtime/ComposerReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /participant\.canvasRowIndex = 0;/
  );
  assert.match(
    runtimeSource,
    /function placeParticipantOnCanvasGrid\(collectionKey,\s*participantId,\s*targetRowIndex = 0\)/
  );
  assert.match(
    runtimeSource,
    /entry\.canvasRowIndex = getParticipantCanvasRowIndex\(entry\) \+ 1;/
  );
  assert.match(
    runtimeSource,
    /getCanvasGridTargetRowIndex\(columnElement,\s*"center",\s*clientY\)/
  );
});

test("operator tiles resolve vertical placement from explicit grid rows instead of free percentage offsets", () => {
  const runtimeSource = readFileSync(
    new URL("../src/runtime/ComposerReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /function getReactionSurfaceGridStartOffsetPx\(\)/
  );
  assert.match(
    runtimeSource,
    /function getRenderedSurfaceRowCenterOffsetsPx\(\)/
  );
  assert.match(
    runtimeSource,
    /function getOperatorLayerTopOffsetPx\(\)/
  );
  assert.match(
    runtimeSource,
    /function getOperatorGridTargetRowIndex\(clientY\)/
  );
  assert.match(
    runtimeSource,
    /\.composer-reaction-solver-column > \.composer-reaction-solver-participant > \.composer-reaction-solver-particle/
  );
  assert.match(
    runtimeSource,
    /getReactionSurfaceGridStartOffsetPx\(\) - getOperatorLayerTopOffsetPx\(\)/
  );
  assert.match(
    runtimeSource,
    /participant\.operatorSlotIndex = resolvedSlotIndex;/
  );
  assert.doesNotMatch(
    runtimeSource,
    /operatorYRatio/
  );
});
