import test from "node:test";
import assert from "node:assert/strict";

import { createReactionBinarySelectionRuntime } from "../src/apps/reaction/ReactionBinarySelectionRuntime.js";
import { createReactionBinaryInventoryRuntime } from "../src/apps/reaction/ReactionBinaryInventoryRuntime.js";
import { createReactionParticipantMutationRuntime } from "../src/apps/reaction/ReactionParticipantMutationRuntime.js";
import { buildReactionParticipantStructure } from "../src/runtime/ComposerReactionStructureBridgeRuntime.js";

function supportsParticipantPolarity(templateId) {
  return new Set(["noether_core", "electron", "neutrino", "down_quark", "up_quark"]).has(
    String(templateId ?? "").trim().toLowerCase()
  );
}

function normalizeParticipantPolarity(polarity) {
  return String(polarity ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro";
}

test("reaction solver helper runtimes expose the expected reaction-side interfaces", () => {
  const binarySelectionRuntime = createReactionBinarySelectionRuntime({
    supportsParticipantPolarity,
    normalizeParticipantPolarity,
  });
  const binaryInventoryRuntime = createReactionBinaryInventoryRuntime({
    getBinaryChoiceInventory: binarySelectionRuntime.getBinaryChoiceInventory,
    getResolvedBinarySelectionMap: binarySelectionRuntime.getResolvedBinarySelectionMap,
    resolveBinarySelectorGroup: binarySelectionRuntime.resolveBinarySelectorGroup,
  });
  const participantMutationRuntime = createReactionParticipantMutationRuntime({
    supportsParticipantPolarity,
    formatParticipantLabel: (label, templateId, polarity) =>
      `${normalizeParticipantPolarity(polarity) === "anti" ? "Anti" : "Pro"} ${label}`.trim(),
    buildParticipantHierarchy: () => [],
    getInitialParticipantBinarySelections: binarySelectionRuntime.getInitialParticipantBinarySelections,
  });

  const electronStructure = buildReactionParticipantStructure("electron", {
    id: "electron_pro",
    label: "Electron",
    polarity: "pro",
  });
  const participant = {
    id: "electron_pro",
    templateId: "electron",
    polarity: "pro",
    structure: electronStructure.root,
    binarySelections: {},
  };

  assert.equal(typeof binarySelectionRuntime.getInitialParticipantBinarySelections, "function");
  assert.equal(typeof binaryInventoryRuntime.resolveBinaryChoiceInventory, "function");
  assert.equal(typeof participantMutationRuntime.refreshParticipantFromStructure, "function");
  assert.deepEqual(binarySelectionRuntime.getInitialParticipantBinarySelections(participant), {
    "electron_pro/inner": "ee",
    "electron_pro/middle": "ee",
    "electron_pro/outer": "ee",
  });
});
