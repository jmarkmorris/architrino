import { STRUCTURE_SLOT_ORDER } from "../../domain/structure/StructureSchema.js";
import { resolveStructureDisplayLabel } from "../../domain/structure/StructureDisplayLabel.js";
import { buildReactionParticipantStructure } from "./ReactionStructureBridgeRuntime.js";

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

export const reactionAddPickerColumns = Object.freeze([
  Object.freeze({
    id: "binary_count",
    entries: Object.freeze([
      createPickerEntry({
        id: "uni_binary",
        label: "Pro Uni Binary",
        templateId: "noether_core",
        occupiedCount: 1,
      }),
      createPickerEntry({
        id: "bi_binary",
        label: "Pro Bi Binary",
        templateId: "noether_core",
        occupiedCount: 2,
      }),
      createPickerEntry({
        id: "tri_binary",
        label: "Pro Noether Core",
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
        label: "Pro Bottom Quark",
        templateId: "down_quark",
        occupiedCount: 1,
      }),
      createPickerEntry({
        id: "strange",
        label: "Pro Strange Quark",
        templateId: "down_quark",
        occupiedCount: 2,
      }),
      createPickerEntry({
        id: "down",
        label: "Pro Down Quark",
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
        label: "Pro Top Quark",
        templateId: "up_quark",
        occupiedCount: 1,
      }),
      createPickerEntry({
        id: "charm",
        label: "Pro Charm Quark",
        templateId: "up_quark",
        occupiedCount: 2,
      }),
      createPickerEntry({
        id: "up",
        label: "Pro Up Quark",
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
        label: "Pro Tau",
        templateId: "electron",
        occupiedCount: 1,
      }),
      createPickerEntry({
        id: "muon",
        label: "Pro Muon",
        templateId: "electron",
        occupiedCount: 2,
      }),
      createPickerEntry({
        id: "electron",
        label: "Pro Electron",
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
        label: "Pro Tau Neutrino",
        templateId: "neutrino",
        occupiedCount: 1,
      }),
      createPickerEntry({
        id: "muon_neutrino",
        label: "Pro Muon Neutrino",
        templateId: "neutrino",
        occupiedCount: 2,
      }),
      createPickerEntry({
        id: "neutrino",
        label: "Pro Neutrino",
        templateId: "neutrino",
        occupiedCount: 3,
      }),
    ]),
  }),
  Object.freeze({
    id: "boson_bridge",
    entries: Object.freeze([
      createPickerEntry({
        id: "photon",
        label: "Photon",
        templateId: "photon",
      }),
      createPickerEntry({
        id: "pi_minus",
        label: "Negative Pion",
        templateId: "pi_minus",
      }),
      createPickerEntry({
        id: "pi_plus",
        label: "Positive Pion",
        templateId: "pi_plus",
      }),
      createPickerEntry({
        id: "dpi0",
        label: "Neutral Pion (d anti-d)",
        templateId: "dpi0",
      }),
      createPickerEntry({
        id: "upi0",
        label: "Neutral Pion (u anti-u)",
        templateId: "upi0",
      }),
    ]),
  }),
  Object.freeze({
    id: "composite_bridge",
    entries: Object.freeze([
      createPickerEntry({
        id: "proton",
        label: "Pro Proton",
        templateId: "proton",
      }),
      createPickerEntry({
        id: "neutron",
        label: "Pro Neutron",
        templateId: "neutron",
      }),
      createPickerEntry({
        id: "higgs",
        label: "Higgs",
        templateId: "higgs_cluster",
      }),
    ]),
  }),
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
        label:
          entry?.vacant === true
            ? String(entry?.label ?? "").trim()
            : resolveStructureDisplayLabel(previewStructure?.root ?? previewStructure),
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
  const label = String(options.label ?? "").trim();
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
