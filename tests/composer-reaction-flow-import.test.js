import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  importReactionFlowToComposerDraft,
  summarizeComposerReactionImport,
} from "../src/apps/composer/ComposerReactionFlowImportRuntime.js";
import { createComposerSceneDocument } from "../src/runtime/Composer2SceneDocumentRuntime.js";
import { createComposerDocumentWorkspaceRuntime } from "../src/apps/composer/ComposerDocumentWorkspaceRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

test("reaction-flow import runtime maps the contract fixture into composer draft state", () => {
  const reactionFlow = readJson("content/contracts/examples/reaction-flow/free_neutron_beta.v1.json");
  const { draftState, importResult } = importReactionFlowToComposerDraft(reactionFlow, {
    nowIso: () => "2026-04-01T12:00:00.000Z",
  });

  assert.equal(importResult.schema, "composer-import-result/v1");
  assert.equal(importResult.sourceSchema, "reaction-flow/v1");
  assert.equal(importResult.importedReactionId, "free_neutron_beta_001");
  assert.equal(importResult.sceneId, "free_neutron_beta_scene");
  assert.equal(importResult.warnings.length, 0);
  assert.equal(draftState.id, "free_neutron_beta_scene");
  assert.equal(draftState.name, "Free Neutron Beta Reaction");
  assert.equal(draftState.assembliesDraft.length, 4);
  assert.deepEqual(
    draftState.transfers.map((transfer) => transfer.id),
    ["map_remainder_to_proton", "map_emitted_electron", "map_emitted_antineutrino"]
  );
  assert.equal(draftState.reactions.length, 1);
  assert.deepEqual(
    draftState.reactions[0].transferIds,
    ["map_remainder_to_proton", "map_emitted_electron", "map_emitted_antineutrino"]
  );
  assert.deepEqual(
    draftState.reactions[0].participants.map((participant) => participant.assembly),
    ["reactant_neutron", "product_proton", "product_electron", "product_antineutrino"]
  );
  assert.deepEqual(
    draftState.cameraShots[0].framing.requiredAssemblyIds,
    ["reactant_neutron", "product_proton", "product_electron"]
  );
  assert.equal(
    draftState.metadata.importedReactionFlow.importResult.fallbacks[0].code,
    "observer-hints-normalized"
  );

  const sceneDocument = createComposerSceneDocument(draftState);
  assert.equal(sceneDocument.cameraShots[0].framing.requiredAssemblyIds[0], "reactant_neutron");
  assert.equal(
    sceneDocument.metadata.importedReactionFlow.importedReactionId,
    "free_neutron_beta_001"
  );
});

test("composer document workspace runtime imports reaction-flow json text and applies the imported draft", async () => {
  const reactionFlow = readJson("content/contracts/examples/reaction-flow/free_neutron_beta.v1.json");
  const sceneIdInput = { value: "composer_scene" };
  const sceneNameInput = { value: "Composer Scene" };
  const transferListInput = { value: "" };
  const assemblyDraftsState = [];
  const overlayDraftsState = { value: [] };
  let supplementalDraftState = {};
  let statusMessage = "";

  const runtime = createComposerDocumentWorkspaceRuntime({
    nowIso: () => "2026-04-01T12:00:00.000Z",
    pickReactionFlowText: async () => JSON.stringify(reactionFlow),
    dom: {
      sceneIdInput,
      sceneNameInput,
      sceneDurationInput: { value: "24" },
      sceneLoopInput: { checked: false },
      markerListInput: { value: "" },
      pauseListInput: { value: "" },
      warpListInput: { value: "" },
      transferListInput,
      jsonPreview: { textContent: "" },
      frameScaleInput: { value: "" },
      frameScaleLabel: { textContent: "" },
      cameraSpeedInput: { value: "" },
      cameraSpeedLabel: { textContent: "" },
      cameraPoiSelect: { value: "" },
    },
    state: {
      pathState: { points: [], interpolate: "spline", closed: false },
      frameState: { rotation: { x: 0, y: 0, z: 0, set() {} }, scale: 1 },
      cameraState: { speed: 1 },
      cameraOrbitState: { minDistance: 0.3, radius: 1, theta: 0, phi: Math.PI / 2 },
      cameraFlightState: { waypoints: [], poiMode: "origin" },
      playbackState: { playheadSeconds: 0 },
      palette: ["#fff"],
    },
    helpers: {
      sanitizeSceneId(value) {
        return String(value).trim().toLowerCase().replace(/\s+/g, "_");
      },
      normalizeAssemblyDraft(draft) {
        return { ...draft };
      },
      normalizeAssemblyPathPoints(points) {
        return Array.isArray(points) ? points : [];
      },
      formatTransferList(transfers = []) {
        return transfers.map((entry) => entry.id).join("\n");
      },
      normalizeGraphicOverlayList(overlays = []) {
        return Array.isArray(overlays) ? overlays : [];
      },
      parseTransfers() {
        return { entries: [], errors: [] };
      },
      readTimingState() {
        return {
          time: { timeBase: "seconds", start: 0, end: 24, playbackRate: 1, loop: false },
          markers: [],
          pauses: [],
          timeWarps: [],
          diagnostics: {},
        };
      },
      updateTimingDiagnostics() {},
      formatTimingStatus() {
        return "Timing OK";
      },
      formatScaleLabel(value) {
        return String(value);
      },
      clampFn(value) {
        return value;
      },
      vectorFromTriplet(value) {
        return value;
      },
      getTransferListRaw() {
        return transferListInput.value;
      },
    },
    operations: {
      ensureAssemblyDrafts() {},
      persistPathStateToSelectedAssembly() {},
      renderAssemblyEditor() {},
      validateSelectedAssemblyId() {
        return assemblyDraftsState[0]?.id ?? null;
      },
      setSelectedAssembly() {},
      rebuildControlPoints() {},
      updatePathGeometry() {},
      updatePointMaterials() {},
      updateFrame() {},
      syncCameraRadiusInput() {},
      stopCameraFlightPreview() {},
      updateCameraFlightDisplay() {},
      updateWaypointCount() {},
      updateCameraPoiStatus() {},
      updateCamera() {},
      updateViewportFromDocument() {},
      renderTimeline() {},
      updateTimelinePlayhead() {},
      setStatus(message) {
        statusMessage = message;
      },
    },
    accessors: {
      getAssemblyDraftsState() {
        return assemblyDraftsState;
      },
      setAssemblyDraftsState(nextValue) {
        assemblyDraftsState.splice(0, assemblyDraftsState.length, ...nextValue);
      },
      updateAssemblyDraftByIdState() {},
      getGraphicOverlayDraftsState() {
        return overlayDraftsState.value;
      },
      setGraphicOverlayDraftsState(nextValue) {
        overlayDraftsState.value = nextValue;
      },
      getSelectedPointIndexState() {
        return null;
      },
      setSelectedPointIndexState() {},
      getSelectedAssemblyIdState() {
        return assemblyDraftsState[0]?.id ?? null;
      },
      setTransferListRawStateValue() {},
      getSupplementalDraftState() {
        return supplementalDraftState;
      },
      setSupplementalDraftState(nextValue) {
        supplementalDraftState = nextValue;
      },
      setCurrentDocument() {},
    },
  });

  const importPayload = await runtime.importReactionFlowFromPicker();
  const importedDraftState = runtime.readComposerDraftState();
  const importedSceneDocument = runtime.buildComposerDocumentData(importedDraftState);

  assert.equal(importPayload.importResult.importedReactionId, "free_neutron_beta_001");
  assert.equal(sceneIdInput.value, "free_neutron_beta_scene");
  assert.equal(sceneNameInput.value, "Free Neutron Beta Reaction");
  assert.match(statusMessage, /Imported free_neutron_beta_001/);
  assert.equal(assemblyDraftsState.length, 4);
  assert.match(transferListInput.value, /map_remainder_to_proton/);
  assert.equal(supplementalDraftState.reactions.length, 1);
  assert.equal(supplementalDraftState.cameraShots.length, 1);
  assert.deepEqual(
    importedDraftState.reactions[0].transferIds,
    ["map_remainder_to_proton", "map_emitted_electron", "map_emitted_antineutrino"]
  );
  assert.deepEqual(
    importedSceneDocument.reactions[0].transferIds,
    ["map_remainder_to_proton", "map_emitted_electron", "map_emitted_antineutrino"]
  );
});

test("reaction import summary mentions fallbacks and warnings when present", () => {
  const summary = summarizeComposerReactionImport({
    importedReactionId: "reaction_a",
    warnings: [{ code: "warn", message: "warn" }],
    rejectedFeatures: [],
    fallbacks: [{ code: "fallback", message: "fallback" }],
  });

  assert.match(summary, /Imported reaction_a/);
  assert.match(summary, /1 fallback/);
  assert.match(summary, /1 warning/);
});
