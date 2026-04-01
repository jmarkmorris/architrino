import test from "node:test";
import assert from "node:assert/strict";

import {
  buildReactionParticipantStructureFromPickerCell,
  getReactionAddPickerCells,
} from "../src/apps/reaction/ReactionAddPickerRuntime.js";

test("reaction add-picker runtime exposes the current picker cells and structure builder", () => {
  const pickerCells = getReactionAddPickerCells();
  const triBinaryCell = pickerCells.find((cell) => cell.id === "tri_binary");

  const structure = buildReactionParticipantStructureFromPickerCell(triBinaryCell, {
    participantId: "picker_participant",
    polarity: "pro",
  });

  assert.equal(Array.isArray(pickerCells), true);
  assert.equal(pickerCells.length > 0, true);
  assert.equal(typeof structure?.root?.id, "string");
  assert.equal(String(structure.root.id).startsWith("picker_participant"), true);
});
