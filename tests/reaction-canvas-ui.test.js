import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  REACTION_CENTER_ASSEMBLY_PICKER_ENTRIES,
  REACTION_OPERATOR_LANE_LAYOUT,
  REACTION_OPERATOR_LANE_COUNT,
  REACTION_OPERATOR_ENTRIES,
} from "../src/apps/reaction/ReactionCanvasUiRuntime.js";

test("reaction canvas keeps two operator lanes available", () => {
  assert.equal(REACTION_OPERATOR_LANE_COUNT, 2);
});

test("reaction canvas operator registry includes only associate and dissociate", () => {
  assert.deepEqual(
    REACTION_OPERATOR_ENTRIES.map((entry) => entry.templateId),
    [
      "associate",
      "dissociate",
    ]
  );
});

test("reaction canvas operator layout assigns dissociate to the inner-left group and associate to the inner-right group", () => {
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

test("reaction canvas center assembly lane exposes Noether core, weak bosons, and Free Architrinos", () => {
  assert.deepEqual(
    REACTION_CENTER_ASSEMBLY_PICKER_ENTRIES.map((entry) => ({
      templateId: entry.templateId,
      label: entry.label,
    })),
    [
      { templateId: "noether_core", label: "Noether Core" },
      { templateId: "w_minus_boson", label: "Negative W Boson" },
      { templateId: "z_boson", label: "Neutral Z Boson" },
      { templateId: "w_plus_boson", label: "Positive W Boson" },
      { templateId: "free_architrinos", label: "Free Architrinos" },
    ]
  );
});

test("center assembly picker renders as a single tile row matching the main picker style", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /function createCenterAssemblyPickerCell\(entry = null\) \{[\s\S]*?templateId: String\(entry\.templateId\),[\s\S]*?disabled: false,[\s\S]*?\}/s
  );
  assert.match(
    runtimeSource,
    /state\.menuMode === "center-assembly-picker"[\s\S]*?renderMenuTitle\("Add Assembly"\);[\s\S]*?REACTION_CENTER_ASSEMBLY_PICKER_ENTRIES\.forEach\(\(entry\) => \{[\s\S]*?tileButton\.className = "composer-reaction-canvas-picker-tile";[\s\S]*?tileButton\.style\.gridColumn = String\(REACTION_CENTER_ASSEMBLY_PICKER_ENTRIES\.indexOf\(entry\) \+ 1\);[\s\S]*?tileButton\.style\.gridRow = "2";[\s\S]*?tileButton\.setAttribute\("aria-label", `Add center assembly \$\{pickerCell\.label\}`\);[\s\S]*?createPickerTilePreview\(pickerCell\)[\s\S]*?addCenterAssemblyParticipant\(entry\.templateId\)/s
  );
});

test("reaction canvas template-grid picker places b mesons on a new row below kaons and shifts composites down", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /\["uni_binary", "tau_neutrino", "tau", "bottom", "top"\],\s*\["bi_binary", "muon_neutrino", "muon", "strange", "charm"\],\s*\["tri_binary", "neutrino", "electron", "down", "up"\],\s*\["noether_pair", "upi0", "dpi0", "pi_minus", "pi_plus"\],\s*\["noether_quad", "dk0", "sk0", "k_minus", "k_plus"\],\s*\["neutron", "dB0", "bB0", "b_minus", "b_plus"\],\s*\["photon", "proton", "side_disabled_z_boson", "side_disabled_w_minus_boson", "side_disabled_w_plus_boson"\]/
  );
  assert.match(
    runtimeSource,
    /SIDE_DISABLED_TEMPLATE_GRID_PICKER_CELLS = Object\.freeze\(\[[\s\S]*?label: "Neutral Z Boson"[\s\S]*?templateId: "z_boson"[\s\S]*?disabled: true[\s\S]*?label: "Negative W Boson"[\s\S]*?templateId: "w_minus_boson"[\s\S]*?disabled: true[\s\S]*?label: "Positive W Boson"[\s\S]*?templateId: "w_plus_boson"[\s\S]*?disabled: true/s
  );
  assert.match(
    runtimeSource,
    /if \(pickerCell\.disabled\) \{[\s\S]*?tileButton\.disabled = true;[\s\S]*?tileButton\.setAttribute\("aria-disabled", "true"\);[\s\S]*?tileButton\.style\.opacity = "0\.5";/s
  );
});

test("center-column Noether core title click toggles polarity directly", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  const renderSource = readFileSync(
    new URL("../src/apps/reaction/ReactionParticipantRenderRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /function handleParticipantVisualClick\(participant,\s*event\)\s*\{[\s\S]*?participant\.templateId !== "noether_core"[\s\S]*?participant\.surfaceColumn !== "center-assembly"[\s\S]*?setParticipantPolarity\(/s
  );
  assert.match(
    renderSource,
    /visual\.addEventListener\("click",\s*\(event\)\s*=>\s*\{[\s\S]*?handleParticipantVisualClick\(participant,\s*event\)/s
  );
});

test("operator fan sync remains optional in the participant render runtime", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /if \(typeof participantRenderRuntime\.syncOperatorFan === "function"\) \{\s*syncOperatorFan = participantRenderRuntime\.syncOperatorFan;\s*\}/
  );
});

test("reaction canvas no longer exposes a right-click root menu", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.doesNotMatch(
    runtimeSource,
    /root\.addEventListener\("contextmenu",/
  );
  assert.doesNotMatch(
    runtimeSource,
    /function handleSurfaceContextMenu\(event\)/
  );
  assert.doesNotMatch(
    runtimeSource,
    /function openMenuAt\(clientX,\s*clientY\)/
  );
  assert.doesNotMatch(
    runtimeSource,
    /Auto solve \(not yet implemented\)/
  );
  assert.doesNotMatch(
    runtimeSource,
    /Clear reaction canvas/
  );
});

test("reaction canvas exposes clear and solve actions in the reaction app shell and keeps them runtime-owned", () => {
  const reactionSolverExecutionSource = readFileSync(
    new URL("../src/apps/reaction/ReactionSolverExecutionRuntime.js", import.meta.url),
    "utf8"
  );
  const mappingRuntimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasMappingRuntime.js", import.meta.url),
    "utf8"
  );
  const reactionCommitStateSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCommitStateRuntime.js", import.meta.url),
    "utf8"
  );
  const reactionAppRuntimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionAppRuntime.js", import.meta.url),
    "utf8"
  );
  const reactionMainSource = readFileSync(
    new URL("../src/apps/reaction/main.js", import.meta.url),
    "utf8"
  );
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    reactionAppRuntimeSource,
    /reviewStateElement = null,/
  );
  assert.match(
    reactionAppRuntimeSource,
    /acceptButton = null,/
  );
  assert.match(
    reactionAppRuntimeSource,
    /exportButton = null,/
  );
  assert.match(
    reactionAppRuntimeSource,
    /solveSnapshot = null,/
  );
  assert.match(
    reactionAppRuntimeSource,
    /initialSolverRequest = null,/
  );
  assert.match(
    reactionAppRuntimeSource,
    /createCommitRuntime = createReactionCommitStateRuntime,/
  );
  assert.match(
    reactionAppRuntimeSource,
    /getReview:\s*\(\)\s*=> commitRuntime\.buildExportReview\(\),/
  );
  assert.match(
    reactionAppRuntimeSource,
    /getDocumentOptions:\s*\(\)\s*=> currentDocumentOptions \?\? \{\},/
  );
  assert.match(
    reactionAppRuntimeSource,
    /function loadSolverRequestReviewCandidate\(request = \{\}, options = \{\}\)/
  );
  assert.match(
    reactionAppRuntimeSource,
    /function acceptReactionFlowDocument\(\)/
  );
  assert.match(
    reactionAppRuntimeSource,
    /function downloadReactionFlowDocument\(\)/
  );
  assert.match(
    reactionAppRuntimeSource,
    /setStatus\("Reaction changed after acceptance\. Accept again to commit the latest handoff\."\);/
  );
  assert.match(
    reactionAppRuntimeSource,
    /setStatus\("Reaction accepted for handoff\. Export now emits accepted reaction-flow\/v1 JSON\."\);/
  );
  assert.match(
    reactionAppRuntimeSource,
    /solveSnapshot:\s*typeof solveSnapshot === "function" \? solveSnapshot : undefined,/
  );
  assert.match(
    reactionMainSource,
    /globalThis\.__ARCHITRINO_REACTION_APP_DEPS__ \?\? \{\}/
  );
  assert.match(
    reactionMainSource,
    /createBrowserReactionSolveSnapshot\(\{/
  );
  assert.match(
    reactionMainSource,
    /solveSnapshot:\s*typeof reactionAppRuntimeDeps\.solveSnapshot === "function"[\s\S]*?reactionAppRuntimeDeps\.solveSnapshot[\s\S]*?: defaultBrowserSolveSnapshot,/s
  );
  assert.match(
    reactionMainSource,
    /document\.getElementById\("reaction-review-state"\)/
  );
  assert.match(
    reactionMainSource,
    /initialSolverRequest:\s*reactionAppRuntimeDeps\.initialSolverRequest \?\? null,/
  );
  assert.match(
    reactionMainSource,
    /document\.getElementById\("reaction-status"\)/
  );
  assert.match(
    reactionMainSource,
    /document\.getElementById\("reaction-hint"\)/
  );
  assert.match(
    reactionMainSource,
    /document\.getElementById\("reaction-accept-button"\)/
  );
  assert.match(
    reactionMainSource,
    /document\.getElementById\("reaction-export-button"\)/
  );
  assert.match(
    reactionMainSource,
    /document\.getElementById\("reaction-clear-button"\)/
  );
  assert.match(
    reactionMainSource,
    /document\.getElementById\("reaction-solve-button"\)/
  );
  assert.match(
    reactionCommitStateSource,
    /export function createReactionCommitStateRuntime/
  );
  assert.match(
    reactionCommitStateSource,
    /needsReaccept:\s*false,/
  );
  assert.match(
    reactionCommitStateSource,
    /reset\(\{\s*needsReaccept:\s*true\s*\}\);/
  );
  assert.match(
    runtimeSource,
    /function clearReactionCanvas\(\)/
  );
  assert.match(
    runtimeSource,
    /function replaceSnapshot\(snapshot = \{\}, options = \{\}\)/
  );
  assert.match(
    runtimeSource,
    /async function solveReactionCanvas\(\)/
  );
  assert.match(
    runtimeSource,
    /function normalizeText\(value = ""\)\s*\{\s*return String\(value \?\? ""\)\.trim\(\);\s*\}/
  );
  assert.match(
    runtimeSource,
    /clearButton\.addEventListener\("click",\s*\(\) => \{\s*clearReactionCanvas\(\);/s
  );
  assert.match(
    runtimeSource,
    /solveButton\.addEventListener\("click",\s*async \(\) => \{\s*await solveReactionCanvas\(\);/s
  );
  assert.match(
    runtimeSource,
    /resetSolveDerivedArtifacts\(\);/
  );
  assert.match(
    runtimeSource,
    /const solution = await Promise\.resolve\(\s*solveSnapshot\(\s*\{\s*participants:\s*cloneSerializableValue\(state\.participants\),\s*mappings:\s*cloneSerializableValue\(state\.mappings\),/s
  );
  assert.match(
    runtimeSource,
    /replaceSnapshot,/
  );
  assert.match(
    runtimeSource,
    /const result = solution\?\.result \?\? null;/
  );
  assert.match(
    runtimeSource,
    /Solve v1 only supports reactants, products, center assemblies, and existing operators on the canvas\./
  );
  assert.doesNotMatch(
    runtimeSource,
    /Remove center bosons first\./
  );
  assert.doesNotMatch(
    runtimeSource,
    /Remove center bosons or operators first\./
  );
  assert.match(
    runtimeSource,
    /applySolvePlan\(\{/
  );
  assert.match(
    runtimeSource,
    /result,\s*createOperatorParticipant,/s
  );
  assert.match(
    runtimeSource,
    /markParticipantAutoDissociated,/
  );
  assert.match(
    runtimeSource,
    /buildReactionSolverExecutionStatusNote\(solution\?\.execution\)/
  );
  assert.match(
    runtimeSource,
    /state\.isSolving = true;/
  );
  assert.match(
    runtimeSource,
    /setStatus\("Running external Reaction solve\.\.\."\);/
  );
  assert.match(
    runtimeSource,
    /normalizeText\(solution\?\.planDescription\) \|\| describeSolvePlan\(\{\}\)/
  );
  assert.match(
    reactionSolverExecutionSource,
    /export function buildReactionSolverExecutionStatusNote\(_execution = null\)\s*\{\s*return "";\s*\}/
  );
  assert.match(
    runtimeSource,
    /function createOperatorParticipant\(templateId = "associate", operatorLaneIndex = 1,\s*options = \{\}\)/
  );
  assert.match(
    runtimeSource,
    /createCanvasMappingRuntime = defaultCreateCanvasMappingRuntime/
  );
  assert.match(
    runtimeSource,
    /createCanvasMappingRuntime\(\{/
  );
  assert.match(
    mappingRuntimeSource,
    /function addOrReplaceMapping\(\s*sourceKey,\s*sourceRole,\s*targetKey,\s*targetRole,\s*\{[\s\S]*?sourceAnchorInstanceIndex = null,[\s\S]*?targetAnchorInstanceIndex = null,[\s\S]*?\} = \{\}\s*\)/
  );
  assert.match(
    runtimeSource,
    /createBinaryInventoryRuntime\(\{/
  );
  assert.doesNotMatch(
    runtimeSource,
    /function resolveBinaryChoiceInventory\(participant,\s*node,\s*groupNode = null\)/
  );
});

test("W and Z bosons are not treated as polarity-toggling templates", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
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
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
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
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
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

test("canvas surface rows are shared across all five column groups and capped to the first eleven rows", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /const canvasSurfaceMaxRowIndex = REACTION_CANVAS_SURFACE_ROW_COUNT - 1;/
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
    /Math\.min\(canvasSurfaceMaxRowIndex,\s*normalizedRowIndex\)/
  );
  assert.match(
    runtimeSource,
    /markOccupiedSurfaceRowRange\(/
  );
  assert.match(
    runtimeSource,
    /const maxStartRowIndex = Math\.max\(0,\s*canvasSurfaceMaxRowIndex - resolvedRowSpan \+ 1\);/
  );
});

test("split row helper preserves the original participant row block instead of restacking at the top", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /function buildSplitParticipantsPreservingSurfaceRows\(\s*participant,\s*childStructures = \[\],\s*extraFieldsByIndex = \(\) => \(\{\}\)\s*\)/
  );
  assert.match(
    runtimeSource,
    /const baseRowIndex = getParticipantSurfaceRowIndex\(participant\);/
  );
  assert.match(
    runtimeSource,
    /surfaceRowIndex:\s*normalizeSurfaceRowStartIndex\(baseRowIndex \+ index,\s*1,\s*baseRowIndex \+ index\)/
  );
});

test("composite right-click dissociation marks the existing composite instead of replacing it with split participants", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /function splitNoetherAssemblyParticipantById\(participantId\)/
  );
  assert.match(
    runtimeSource,
    /participant\.isDissociatedComposite = true;/
  );
  assert.doesNotMatch(
    runtimeSource,
    /state\.participants\.splice\(participantIndex,\s*1,\s*\.\.\.replacementParticipants\);/
  );
  assert.match(
    runtimeSource,
    /`\$\{participant\.side === "reactant" \? "Reactant" : "Product"\} \$\{participant\.label\} marked dissociated\.`/
  );
  assert.match(
    runtimeSource,
    /if \(participant\.side !== "reactant"\) \{\s*setStatus\("Only reactant composites can be marked dissociated\."\);/
  );
});

test("mapping from a composite reactant child auto-marks the composite as dissociated", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  const mappingRuntimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasMappingRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /function markCompositeReactantDissociatedForNodeKey\(nodeKey,\s*role = ""\)/
  );
  assert.match(
    runtimeSource,
    /if \(role !== "reactant" \|\| !nodeKey\) \{\s*return false;\s*\}/
  );
  assert.match(
    runtimeSource,
    /if \(!participant \|\| participant\.side !== "reactant" \|\| !isCompositeParticipant\(participant\)\) \{\s*return false;\s*\}/
  );
  assert.match(
    runtimeSource,
    /if \(!rootNode\?\.id \|\| String\(rootNode\.id\) === String\(nodeId \?\? ""\)\) \{\s*return false;\s*\}/
  );
  assert.match(
    runtimeSource,
    /participant\.isAutoDissociatedComposite = true;/
  );
  assert.match(
    runtimeSource,
    /function markParticipantAutoDissociated\(participantOrId = null\) \{/
  );
  assert.match(
    mappingRuntimeSource,
    /markCompositeReactantDissociatedForNodeKey\(sourceKey,\s*sourceRole\);/
  );
});

test("solve resets only canvas-generated operators and auto dissociation before rebuilding mappings", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /function resetSolveDerivedArtifacts\(\)/
  );
  assert.match(
    runtimeSource,
    /state\.participants = state\.participants\.filter\(\s*\(participant\) => !\(participant\?\.side === "operator" && participant\?\.isSolveGenerated\)\s*\);/
  );
  assert.match(
    runtimeSource,
    /if \(participant\?\.isAutoDissociatedComposite\) \{\s*participant\.isAutoDissociatedComposite = false;\s*\}/
  );
  assert.match(
    runtimeSource,
    /state\.mappings = \[\];/
  );
});

test("operator tiles resolve vertical placement from explicit grid rows instead of free percentage offsets", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
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
    /canvasRowHeightPx \/ 2 \+\s*resolvedRowIndex \* canvasRowStepPx/
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

test("only drawn paths remove existing reaction mappings on click", () => {
  const canvasRuntimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  const routeRuntimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasRouteRenderRuntime.js", import.meta.url),
    "utf8"
  );
  assert.doesNotMatch(
    canvasRuntimeSource,
    /function removeMappingsForAnchor\(nodeKey,\s*role,\s*anchorInstanceIndex = null\)/
  );
  assert.doesNotMatch(
    canvasRuntimeSource,
    /const removedCount = removeMappingsForAnchor\(nodeKey,\s*role,\s*anchorInstanceIndex\);/
  );
  assert.match(
    routeRuntimeSource,
    /path\?\.(?:addEventListener\?\.)\("click",\s*\(\) => \{\s*if \(!removeMappingById\(mapping\.id\)\) \{\s*return;\s*\}\s*render\(\);\s*setStatus\("Removed reaction mapping\."\);/
  );
});

test("removing a reactant or product clears mappings and removes operators plus center bosons", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /function clearReactionWorkspaceParticipants\(\) \{/
  );
  assert.match(
    runtimeSource,
    /state\.participants = state\.participants\.filter\(\s*\(participant\) => participant\?\.side === "reactant" \|\| participant\?\.side === "product"\s*\);/
  );
  assert.match(
    runtimeSource,
    /if \(participant\?\.isAutoDissociatedComposite\) \{\s*participant\.isAutoDissociatedComposite = false;\s*\}/
  );
  assert.match(
    runtimeSource,
    /clearReactionMappings\(\);/
  );
  assert.match(
    runtimeSource,
    /if \(participant\.side === "reactant" \|\| participant\.side === "product"\) \{\s*clearReactionWorkspaceParticipants\(\);/
  );
});

test("route endpoints use fixed left and right tangents for canvas connectors", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasRouteRenderRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /function getFixedAnchorAttachmentPoint\(element,\s*bounds,\s*edgeInset = canvasRouteAnchorGapPx\) \{/
  );
  assert.match(
    runtimeSource,
    /if \(anchorRole === "reactant" \|\| anchorRole === "operator-output"\) \{\s*return \{\s*x: center\.x \+ radius,\s*y: center\.y,\s*\};/
  );
  assert.match(
    runtimeSource,
    /if \(anchorRole === "product" \|\| anchorRole === "operator-input"\) \{\s*return \{\s*x: center\.x - radius,\s*y: center\.y,\s*\};/
  );
  assert.match(
    runtimeSource,
    /const sourcePoint =\s*getFixedAnchorAttachmentPoint\(sourceElement,\s*bounds,\s*edgeInset\) \?\?\s*getElementCenterWithinSurface\(sourceElement,\s*bounds\);/
  );
  assert.match(
    runtimeSource,
    /const targetPoint =\s*getFixedAnchorAttachmentPoint\(targetElement,\s*bounds,\s*edgeInset\) \?\?\s*getElementCenterWithinSurface\(targetElement,\s*bounds\);/
  );
  assert.doesNotMatch(
    runtimeSource,
    /startX: sourcePoint\.x \+ unitX \* sourceRadius/
  );
  assert.doesNotMatch(
    runtimeSource,
    /endX: targetPoint\.x - unitX \* targetRadius/
  );
});

test("changing reactant or product polarity clears mappings and operators", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /function clearReactionOperatorsAndMappings\(\) \{/
  );
  assert.match(
    runtimeSource,
    /state\.participants = state\.participants\.filter\(\(participant\) => participant\?\.side !== "operator"\);/
  );
  assert.match(
    runtimeSource,
    /if \(participant\.side === "reactant" \|\| participant\.side === "product"\) \{\s*clearReactionOperatorsAndMappings\(\);/
  );
  assert.doesNotMatch(
    runtimeSource,
    /if \(participant\.side === "reactant" \|\| participant\.side === "product"\) \{\s*removeMappingsForParticipant\(participantId\);/
  );
});

test("participant menu exposes dissociate only for reactant composites", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /participant\.side === "reactant"[\s\S]*?isNoetherAssemblyTemplateId\(participant\.templateId\)[\s\S]*?participant\.templateId === "photon"[\s\S]*?participant\.templateId === "neutron"[\s\S]*?participant\.templateId === "proton"/
  );
});

test("reactant to dissociate mappings auto-create center assemblies from the source node", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionCanvasUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /function buildAutoGeneratedDissociateAssemblies\(sourceKey = ""\)/
  );
  assert.match(
    runtimeSource,
    /templateId:\s*"free_architrinos"/
  );
  assert.match(
    runtimeSource,
    /templateId:\s*"noether_core"/
  );
  assert.match(
    runtimeSource,
    /function syncAutoGeneratedDissociateAssembliesForOperator\(operatorId = ""\)/
  );
  assert.match(
    runtimeSource,
    /sourceRole === "reactant"[\s\S]*?targetRole === "operator-input"[\s\S]*?findParticipantById\(targetParticipantId\)\?\.templateId === "dissociate"/
  );
  assert.match(
    runtimeSource,
    /addOrReplaceMapping\(\s*buildNodeKey\(operator\.id,\s*operatorNode\.id\),\s*"operator-output",[\s\S]*?"operator-input"/
  );
});
