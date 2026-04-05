import { STRUCTURE_SLOT_ORDER } from "../../domain/structure/StructureSchema.js";
import { buildReactionParticipantStructure } from "./ReactionStructureBridgeRuntime.js";
import { reactionPickerLabelColumns } from "./ReactionLabelCatalogRuntime.js";

function getOccupiedSlots(count = 0) {
  const normalizedCount = Math.max(
    0,
    Math.min(STRUCTURE_SLOT_ORDER.length, Number(count) || 0)
  );
  return STRUCTURE_SLOT_ORDER.slice(0, normalizedCount);
}

function createPickerEntry({
  id,
  label,
  templateId = "",
  occupiedCount = null,
  vacant = false,
  disabled = false,
}) {
  return Object.freeze({
    id: String(id ?? "").trim(),
    label: String(label ?? "").trim(),
    templateId: String(templateId ?? "").trim(),
    vacant: vacant === true,
    disabled: disabled === true,
    structureBuildOptions:
      Number.isFinite(Number(occupiedCount)) && Number(occupiedCount) > 0
        ? Object.freeze({ occupiedSlots: Object.freeze(getOccupiedSlots(occupiedCount)) })
        : null,
  });
}

export const reactionAddPickerColumns = Object.freeze([
  ...reactionPickerLabelColumns.map((column) =>
    Object.freeze({
      id: column.id,
      entries: Object.freeze(
        (Array.isArray(column?.entries) ? column.entries : []).map((entry) =>
          createPickerEntry(entry)
        )
      ),
    })
  ),
]);

export function getReactionAddPickerCells() {
  const cells = [];
  reactionAddPickerColumns.forEach((column, columnIndex) => {
    const entries = Array.isArray(column?.entries) ? column.entries : [];
    entries.forEach((entry, rowIndex) => {
      const previewStructure =
        entry?.vacant === true
          ? null
          : buildReactionParticipantStructureForPickerCell(entry, {
              participantId: `picker_${String(entry?.id ?? "cell").trim() || "cell"}`,
            });
      cells.push({
        ...entry,
        label: String(entry?.label ?? "").trim(),
        columnId: String(column?.id ?? `column_${columnIndex + 1}`),
        columnIndex,
        rowIndex,
      });
    });
  });
  return cells;
}

export function buildReactionParticipantStructureForPickerCell(
  pickerCell = null,
  options = {}
) {
  if (!pickerCell || pickerCell.vacant || !pickerCell.templateId) {
    return null;
  }
  const participantId = String(options.participantId ?? "").trim() || "picker_participant";
  const structureId = `${participantId}__structure`;
  const polarity = String(options.polarity ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro";
  const label = String(options.label ?? pickerCell?.label ?? "").trim();
  return buildReactionParticipantStructure(pickerCell.templateId, {
    id: structureId,
    polarity,
    ...(label ? { label } : {}),
    ...(pickerCell.structureBuildOptions ?? {}),
  });
}

export function buildReactionParticipantStructureFromPickerCell(
  pickerCell = null,
  options = {}
) {
  return buildReactionParticipantStructureForPickerCell(pickerCell, options);
}
