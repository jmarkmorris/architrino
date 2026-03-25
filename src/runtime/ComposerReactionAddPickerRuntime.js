import { STRUCTURE_SLOT_ORDER } from "../domain/structure/StructureSchema.js";
import { buildReactionParticipantStructure } from "./ComposerReactionStructureBridgeRuntime.js";

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
}) {
  return Object.freeze({
    id: String(id ?? "").trim(),
    label: String(label ?? "").trim(),
    templateId: String(templateId ?? "").trim(),
    vacant: vacant === true,
    structureBuildOptions:
      Number.isFinite(Number(occupiedCount)) && Number(occupiedCount) > 0
        ? Object.freeze({ occupiedSlots: Object.freeze(getOccupiedSlots(occupiedCount)) })
        : null,
  });
}

export const composerReactionAddPickerColumns = Object.freeze([
  Object.freeze({
    id: "binary_count",
    entries: Object.freeze([
      createPickerEntry({
        id: "uni_binary",
        label: "Uni Binary",
        templateId: "noether_core",
        occupiedCount: 1,
      }),
      createPickerEntry({
        id: "bi_binary",
        label: "Bi Binary",
        templateId: "noether_core",
        occupiedCount: 2,
      }),
      createPickerEntry({
        id: "tri_binary",
        label: "Tri Binary",
        templateId: "noether_core",
        occupiedCount: 3,
      }),
    ]),
  }),
  Object.freeze({
    id: "down_family",
    entries: Object.freeze([
      createPickerEntry({
        id: "bottom",
        label: "Bottom",
        templateId: "down_quark",
        occupiedCount: 1,
      }),
      createPickerEntry({
        id: "strange",
        label: "Strange",
        templateId: "down_quark",
        occupiedCount: 2,
      }),
      createPickerEntry({
        id: "down",
        label: "Down",
        templateId: "down_quark",
        occupiedCount: 3,
      }),
    ]),
  }),
  Object.freeze({
    id: "up_family",
    entries: Object.freeze([
      createPickerEntry({
        id: "top",
        label: "Top",
        templateId: "up_quark",
        occupiedCount: 1,
      }),
      createPickerEntry({
        id: "charm",
        label: "Charm",
        templateId: "up_quark",
        occupiedCount: 2,
      }),
      createPickerEntry({
        id: "up",
        label: "Up",
        templateId: "up_quark",
        occupiedCount: 3,
      }),
    ]),
  }),
  Object.freeze({
    id: "charged_leptons",
    entries: Object.freeze([
      createPickerEntry({
        id: "tau",
        label: "Tau",
        templateId: "electron",
        occupiedCount: 1,
      }),
      createPickerEntry({
        id: "muon",
        label: "Muon",
        templateId: "electron",
        occupiedCount: 2,
      }),
      createPickerEntry({
        id: "electron",
        label: "Electron",
        templateId: "electron",
        occupiedCount: 3,
      }),
    ]),
  }),
  Object.freeze({
    id: "neutrinos",
    entries: Object.freeze([
      createPickerEntry({
        id: "tau_neutrino",
        label: "Tau Neutrino",
        templateId: "neutrino",
        occupiedCount: 1,
      }),
      createPickerEntry({
        id: "muon_neutrino",
        label: "Muon Neutrino",
        templateId: "neutrino",
        occupiedCount: 2,
      }),
      createPickerEntry({
        id: "neutrino",
        label: "Neutrino",
        templateId: "neutrino",
        occupiedCount: 3,
      }),
    ]),
  }),
  Object.freeze({
    id: "boson_bridge",
    entries: Object.freeze([
      createPickerEntry({
        id: "gluon",
        label: "Gluon",
        templateId: "gluon",
      }),
      createPickerEntry({
        id: "boson_bridge_vacant",
        label: "Vacant",
        vacant: true,
      }),
      createPickerEntry({
        id: "photon",
        label: "Photon",
        templateId: "photon",
      }),
    ]),
  }),
  Object.freeze({
    id: "composite_bridge",
    entries: Object.freeze([
      createPickerEntry({
        id: "composite_bridge_top_vacant",
        label: "Vacant",
        vacant: true,
      }),
      createPickerEntry({
        id: "composite_bridge_middle_vacant",
        label: "Vacant",
        vacant: true,
      }),
      createPickerEntry({
        id: "higgs",
        label: "Higgs",
        templateId: "higgs_cluster",
      }),
    ]),
  }),
]);

export function getComposerReactionAddPickerCells() {
  const cells = [];
  composerReactionAddPickerColumns.forEach((column, columnIndex) => {
    const entries = Array.isArray(column?.entries) ? column.entries : [];
    entries.forEach((entry, rowIndex) => {
      cells.push({
        ...entry,
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
  const label = String(options.label ?? pickerCell.label ?? "").trim() || "Structure";
  return buildReactionParticipantStructure(pickerCell.templateId, {
    id: structureId,
    label,
    polarity,
    ...(pickerCell.structureBuildOptions ?? {}),
  });
}
