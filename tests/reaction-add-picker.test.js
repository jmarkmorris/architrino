import test from "node:test";
import assert from "node:assert/strict";

import { getComposerReactionAddPickerCells } from "../src/runtime/ComposerReactionAddPickerRuntime.js";
import { buildReactionParticipantStructure } from "../src/runtime/ComposerReactionStructureBridgeRuntime.js";
import { resolveStructureDisplayLabel } from "../src/domain/structure/StructureDisplayLabel.js";

test("full noether-core picker cell is labeled Pro Noether Core", () => {
  const triBinaryCell = getComposerReactionAddPickerCells().find((cell) => cell.id === "tri_binary");

  assert.ok(triBinaryCell);
  assert.equal(triBinaryCell.templateId, "noether_core");
  assert.equal(triBinaryCell.label, "Pro Noether Core");
});

test("full pro and anti noether cores resolve as Noether-core labels instead of Tri Binary", () => {
  const proCore = buildReactionParticipantStructure("noether_core", {
    id: "pro_core",
    polarity: "pro",
  }).root;
  const antiCore = buildReactionParticipantStructure("noether_core", {
    id: "anti_core",
    polarity: "anti",
  }).root;

  assert.equal(resolveStructureDisplayLabel(proCore), "Pro Noether Core");
  assert.equal(resolveStructureDisplayLabel(antiCore), "Anti Noether Core");
});
