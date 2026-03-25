import test from "node:test";
import assert from "node:assert/strict";

import { createComposerReactionBinarySelectionRuntime } from "../src/runtime/ComposerReactionBinarySelectionRuntime.js";
import { buildReactionParticipantStructure } from "../src/runtime/ComposerReactionStructureBridgeRuntime.js";

function supportsParticipantPolarity(templateId) {
  return new Set(["noether_core", "electron", "neutrino", "down_quark", "up_quark"]).has(
    String(templateId ?? "").trim().toLowerCase()
  );
}

function normalizeParticipantPolarity(polarity) {
  return String(polarity ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro";
}

const selectionRuntime = createComposerReactionBinarySelectionRuntime({
  supportsParticipantPolarity,
  normalizeParticipantPolarity,
});

function createParticipant(templateId, polarity = "pro") {
  const structure = buildReactionParticipantStructure(templateId, {
    id: `${templateId}_${polarity}`,
    label: templateId,
    polarity,
  });
  return {
    id: `${templateId}_${polarity}`,
    templateId,
    polarity,
    structure: structure.root,
    binarySelections: {},
  };
}

test("up quark defaults to the expected I/M/O preset", () => {
  const participant = createParticipant("up_quark", "pro");
  const selections = selectionRuntime.getInitialParticipantBinarySelections(participant);

  assert.deepEqual(selections, {
    "up_quark_pro/inner": "pp",
    "up_quark_pro/middle": "pe",
    "up_quark_pro/outer": "pp",
  });
});

test("anti up quark defaults are inverted from the pro preset", () => {
  const participant = createParticipant("up_quark", "anti");
  const selections = selectionRuntime.getInitialParticipantBinarySelections(participant);

  assert.deepEqual(selections, {
    "up_quark_anti/inner": "ee",
    "up_quark_anti/middle": "ep",
    "up_quark_anti/outer": "ee",
  });
});

test("quark assignment search preserves only valid charge-count patterns", () => {
  const participant = createParticipant("down_quark", "pro");
  const assignments = selectionRuntime.enumerateValidBinarySelectionAssignments(participant);
  const assignmentKeys = assignments.map((assignment) => Object.values(assignment).sort().join(","));

  assert.equal(assignments.length, 6);
  assert(assignmentKeys.includes("ee,pe,pe"));
  assert(assignmentKeys.includes("ee,ee,pp"));
  assert(!assignmentKeys.includes("ee,ee,ee"));
});
