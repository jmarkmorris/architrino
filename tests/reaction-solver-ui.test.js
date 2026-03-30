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

test("side-column dragging places participants on explicit shared surface rows instead of collection order", () => {
  const runtimeSource = readFileSync(
    new URL("../src/runtime/ComposerReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /function placeParticipantOnSurfaceGrid\(collectionKey,\s*participantId,\s*targetRowIndex = 0\)/
  );
  assert.match(
    runtimeSource,
    /findNearestAvailableCollectionRowIndex\(/
  );
  assert.match(
    runtimeSource,
    /placeParticipantOnSurfaceGrid\(\s*collectionKey,\s*participant\.id,/
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

test("solver surface rows are shared across all five column groups and capped to the first eleven rows", () => {
  const runtimeSource = readFileSync(
    new URL("../src/runtime/ComposerReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /const solverSurfaceMaxRowIndex = REACTION_SOLVER_SURFACE_ROW_COUNT - 1;/
  );
  assert.match(
    runtimeSource,
    /function getParticipantSurfaceRowIndex\(participant,\s*fallbackIndex = 0\)/
  );
  assert.match(
    runtimeSource,
    /function getParticipantSurfaceRowSpan\(participant\)/
  );
  assert.match(
    runtimeSource,
    /function setParticipantSurfaceRowIndex\(participant,\s*rowIndex\)/
  );
  assert.match(
    runtimeSource,
    /Math\.min\(solverSurfaceMaxRowIndex,\s*normalizedRowIndex\)/
  );
  assert.match(
    runtimeSource,
    /markOccupiedSurfaceRowRange\(/
  );
  assert.match(
    runtimeSource,
    /const maxStartRowIndex = Math\.max\(0,\s*solverSurfaceMaxRowIndex - resolvedRowSpan \+ 1\);/
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
    /function getReactionSurfaceRowCenterPx\(rowIndex = 0\)/
  );
  assert.match(
    runtimeSource,
    /function getOperatorGridTargetRowIndex\(clientY\)/
  );
  assert.match(
    runtimeSource,
    /solverCanvasRowHeightPx \/ 2 \+\s*resolvedRowIndex \* solverCanvasRowStepPx/
  );
  assert.match(
    runtimeSource,
    /setParticipantSurfaceRowIndex\(participant,\s*resolvedSlotIndex\);/
  );
  assert.match(
    runtimeSource,
    /setParticipantSurfaceRowIndex\(participant,\s*resolvedSlotIndex\);/
  );
  assert.doesNotMatch(
    runtimeSource,
    /operatorYRatio/
  );
});

test("mapped anchors and drawn paths both remove existing reaction mappings on click", () => {
  const runtimeSource = readFileSync(
    new URL("../src/runtime/ComposerReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /function removeMappingsForAnchor\(nodeKey,\s*role,\s*anchorInstanceIndex = null\)/
  );
  assert.match(
    runtimeSource,
    /const removedCount = removeMappingsForAnchor\(nodeKey,\s*role,\s*anchorInstanceIndex\);/
  );
  assert.match(
    runtimeSource,
    /path\.addEventListener\("click",\s*\(\) => \{\s*if \(!removeMappingById\(mapping\.id\)\) \{\s*return;\s*\}\s*render\(\);\s*setStatus\("Removed reaction mapping\."\);/
  );
});
