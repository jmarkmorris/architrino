import {
  buildReactionParticipantStructureForPickerCell,
  getComposerReactionAddPickerCells,
} from "../../runtime/ComposerReactionAddPickerRuntime.js";

export function getReactionAddPickerCells() {
  return getComposerReactionAddPickerCells();
}

export function buildReactionParticipantStructureFromPickerCell(pickerCell, options = {}) {
  return buildReactionParticipantStructureForPickerCell(pickerCell, options);
}
