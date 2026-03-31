import test from "node:test";
import assert from "node:assert/strict";

import { createComposerReactionParticipantMutationRuntime } from "../src/runtime/ComposerReactionParticipantMutationRuntime.js";
import { buildReactionParticipantStructure } from "../src/runtime/ComposerReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/runtime/ComposerReactionStructureDescriptorRuntime.js";

function supportsParticipantPolarity(templateId) {
  return new Set(["noether_core", "electron", "neutrino", "down_quark", "up_quark"]).has(
    String(templateId ?? "").trim().toLowerCase()
  );
}

function normalizeParticipantPolarity(polarity) {
  return String(polarity ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro";
}

function formatParticipantLabel(baseLabel = "", templateId = "", polarity = "") {
  if (!supportsParticipantPolarity(templateId)) {
    return baseLabel;
  }
  return `${normalizeParticipantPolarity(polarity)} ${baseLabel}`;
}

const mutationRuntime = createComposerReactionParticipantMutationRuntime({
  supportsParticipantPolarity,
  formatParticipantLabel,
  buildParticipantHierarchy: (structureRoot) => buildReactionStructureDescriptorTree(structureRoot),
  getInitialParticipantBinarySelections: () => ({}),
});

function createParticipant(templateId, label, polarity = "pro") {
  const structure = buildReactionParticipantStructure(templateId, {
    id: `${templateId}_${polarity}`,
    label,
    polarity,
  });
  return {
    id: `${templateId}_${polarity}`,
    templateId,
    polarity,
    baseLabel: label,
    label: formatParticipantLabel(label, templateId, polarity),
    structure: structure.root,
    hierarchy: buildReactionStructureDescriptorTree(structure.root),
    binarySelections: {},
  };
}

test("generation trim reclassifies electron to muon then tau", () => {
  const participant = createParticipant("electron", "Electron", "pro");

  const firstTrim = mutationRuntime.getNextParticipantGenerationTrimAction(participant);
  assert.equal(firstTrim?.slotName, "outer");

  const muonStructure = mutationRuntime.trimParticipantGenerationStructure(participant, "outer");
  assert(muonStructure);
  mutationRuntime.refreshParticipantFromStructure(participant, muonStructure, {
    preserveBinarySelections: true,
  });
  assert.equal(participant.label, "pro Muon");

  const secondTrim = mutationRuntime.getNextParticipantGenerationTrimAction(participant);
  assert.equal(secondTrim?.slotName, "middle");

  const tauStructure = mutationRuntime.trimParticipantGenerationStructure(participant, "middle");
  assert(tauStructure);
  mutationRuntime.refreshParticipantFromStructure(participant, tauStructure, {
    preserveBinarySelections: true,
  });
  assert.equal(participant.label, "pro Tau");
});

test("split helper derives proton children as up/down/up", () => {
  const participant = createParticipant("proton", "Proton", "pro");
  const children = mutationRuntime.buildSplitParticipantsFromChildStructures(
    participant,
    participant.structure.children,
    ({ templateId, label, structure, extraFields }) => ({
      templateId,
      label,
      structure: structure.root ?? structure,
      polarity: extraFields?.polarity ?? "",
    })
  );

  assert.deepEqual(
    children.map((child) => child.templateId),
    ["up_quark", "down_quark", "up_quark"]
  );
});

test("refresh from structure preserves full quark labels for participant titles", () => {
  const participant = createParticipant("down_quark", "Down Quark", "pro");
  const refreshedStructure = buildReactionParticipantStructure("down_quark", {
    id: "down_quark_refresh",
    polarity: "pro",
  });

  mutationRuntime.refreshParticipantFromStructure(participant, refreshedStructure.root, {
    preserveBinarySelections: true,
  });

  assert.equal(participant.baseLabel, "Down Quark");
  assert.equal(participant.label, "pro Down Quark");
});

test("split helper derives photon children as pro and anti Noether cores", () => {
  const participant = createParticipant("photon", "Photon", "pro");
  const children = mutationRuntime.buildSplitParticipantsFromChildStructures(
    participant,
    participant.structure.children,
    ({ templateId, structure, extraFields }) => ({
      templateId,
      structure: structure.root ?? structure,
      polarity: extraFields?.polarity ?? "",
    })
  );

  assert.deepEqual(
    children.map((child) => child.templateId),
    ["noether_core", "noether_core"]
  );
  assert.deepEqual(
    children.map((child) => child.polarity),
    ["pro", "anti"]
  );
});
