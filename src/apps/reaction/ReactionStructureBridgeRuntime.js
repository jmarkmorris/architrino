import { classifyStructureTree } from "../../domain/structure/StructureClassification.js";
import {
  createStructureNode,
  STRUCTURE_ARCHITRINO_ROLES,
  STRUCTURE_CHARGE_TYPES,
  STRUCTURE_CLASSIFICATION_FAMILIES,
  STRUCTURE_KINDS,
  STRUCTURE_SLOT_ORDER,
} from "../../domain/structure/StructureSchema.js";
import { validateStructureTree } from "../../domain/structure/StructureValidation.js";

function formatNoetherCoreLabel(polarity = "pro") {
  return String(polarity ?? "").trim().toLowerCase() === "anti"
    ? "Anti Noether Core"
    : "Pro Noether Core";
}

function formatPolarityQualifiedLabel(baseLabel = "", polarity = "pro") {
  return `${
    String(polarity ?? "").trim().toLowerCase() === "anti" ? "Anti" : "Pro"
  } ${String(baseLabel ?? "").trim()}`.trim();
}

function createArchitrinoNode(id, charge, role, label) {
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.ARCHITRINO,
    species: "architrino",
    label,
    traits: {
      charge,
      role,
    },
  });
}

function createBinaryNode(id, slotName) {
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.BINARY,
    species: "binary",
    label: `${slotName} binary`,
    traits: {
      slot: slotName,
    },
    children: [
      createArchitrinoNode(
        `${id}/electrino`,
        STRUCTURE_CHARGE_TYPES.ELECTRINO,
        STRUCTURE_ARCHITRINO_ROLES.BINARY_MEMBER,
        "electrino"
      ),
      createArchitrinoNode(
        `${id}/positrino`,
        STRUCTURE_CHARGE_TYPES.POSITRINO,
        STRUCTURE_ARCHITRINO_ROLES.BINARY_MEMBER,
        "positrino"
      ),
    ],
  });
}

function createPersonalityDressedBinaryNode(id, slotName) {
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.PERSONALITY_DRESSED_BINARY,
    species: "personality_dressed_binary",
    label: `${slotName} personality-dressed binary`,
    traits: {
      slot: slotName,
    },
    children: [
      createBinaryNode(`${id}/binary`, slotName),
      createArchitrinoNode(
        `${id}/personality_electrino`,
        STRUCTURE_CHARGE_TYPES.ELECTRINO,
        STRUCTURE_ARCHITRINO_ROLES.PERSONALITY_CHARGE,
        "electrino personality charge"
      ),
      createArchitrinoNode(
        `${id}/personality_positrino`,
        STRUCTURE_CHARGE_TYPES.POSITRINO,
        STRUCTURE_ARCHITRINO_ROLES.PERSONALITY_CHARGE,
        "positrino personality charge"
      ),
    ],
  });
}

function createNoetherCoreSlotNode(id, slotName, { occupied = true } = {}) {
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.SLOT,
    species: "slot",
    label: `${slotName} slot`,
    traits: {
      slot: slotName,
    },
    children: occupied ? [createPersonalityDressedBinaryNode(`${id}/pdb`, slotName)] : [],
  });
}

function createNoetherCoreNode(id, options = {}) {
  const {
    label = formatNoetherCoreLabel(options.polarity ?? "pro"),
    polarity = "pro",
    occupiedSlots = STRUCTURE_SLOT_ORDER,
  } = options;
  const occupiedSet = new Set(
    (Array.isArray(occupiedSlots) ? occupiedSlots : STRUCTURE_SLOT_ORDER).map((slotName) =>
      String(slotName ?? "").trim()
    )
  );
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.NOETHER_CORE,
    species: "noether_core",
    label,
    traits: {
      polarity,
    },
    children: STRUCTURE_SLOT_ORDER.map((slotName) =>
      createNoetherCoreSlotNode(`${id}/${slotName}_slot`, slotName, {
        occupied: occupiedSet.has(slotName),
      })
    ),
  });
}

function createFreeArchitrinosNode(id, options = {}) {
  const {
    label = "Free Architrinos",
    occupiedSlots = STRUCTURE_SLOT_ORDER,
  } = options;
  const occupiedSet = new Set(
    (Array.isArray(occupiedSlots) ? occupiedSlots : STRUCTURE_SLOT_ORDER).map((slotName) =>
      String(slotName ?? "").trim()
    )
  );
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.PARTICLE,
    species: "free_architrinos",
    label,
    children: STRUCTURE_SLOT_ORDER.map((slotName) =>
      createNoetherCoreSlotNode(`${id}/${slotName}_slot`, slotName, {
        occupied: occupiedSet.has(slotName),
      })
    ),
  });
}

function createFamilyParticleNode(id, family, label, options = {}) {
  const { polarity = "pro", occupiedSlots = STRUCTURE_SLOT_ORDER } = options;
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.PARTICLE,
    species: undefined,
    label,
    traits: {
      polarity,
    },
    classification: {
      family,
      source: "derived",
    },
    children: [
      createNoetherCoreNode(`${id}/core`, {
        label: `${label} Core`,
        polarity,
        occupiedSlots,
      }),
    ],
  });
}

function createQuarkNode(id, family, label, options = {}) {
  return createFamilyParticleNode(id, family, label, options);
}

function createZBosonNode(id, options = {}) {
  const { label = "Z Boson", occupiedSlots = STRUCTURE_SLOT_ORDER } = options;
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.PARTICLE,
    species: "z_boson",
    label,
    classification: {
      family: STRUCTURE_CLASSIFICATION_FAMILIES.NEUTRINO,
      source: "authored_override",
    },
    children: [
      createNoetherCoreNode(`${id}/core`, {
        label: `${label} Core`,
        polarity: "pro",
        occupiedSlots,
      }),
    ],
  });
}

function createWBosonNode(id, species, label, options = {}) {
  const { occupiedSlots = STRUCTURE_SLOT_ORDER } = options;
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.PARTICLE,
    species,
    label,
    classification: {
      family: STRUCTURE_CLASSIFICATION_FAMILIES.CHARGED_LEPTON,
      source: "authored_override",
    },
    children: [
      createNoetherCoreNode(`${id}/core`, {
        label: `${label} Core`,
        polarity: "pro",
        occupiedSlots,
      }),
    ],
  });
}

function createBaryonNode(id, species, quarkFamilies, options = {}) {
  const { label = species } = options;
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.PARTICLE,
    species,
    label,
    classification: {
      family: STRUCTURE_CLASSIFICATION_FAMILIES.BARYON,
      source: "derived",
    },
    children: quarkFamilies.map((family, index) =>
      createQuarkNode(
        `${id}/quark_${index + 1}`,
        family,
        family === STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK
          ? formatPolarityQualifiedLabel("Up Quark", "pro")
          : formatPolarityQualifiedLabel("Down Quark", "pro")
      )
    ),
  });
}

function createMesonNode(id, species, constituents = [], options = {}) {
  const { label = species } = options;
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.PARTICLE,
    species,
    label,
    classification: {
      family: STRUCTURE_CLASSIFICATION_FAMILIES.MESON,
      source: "authored_override",
    },
    children: constituents.map((constituent, index) =>
      createQuarkNode(
        `${id}/quark_${index + 1}`,
        constituent.family,
        formatPolarityQualifiedLabel(
          constituent.family === STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK
            ? "Up Quark"
            : "Down Quark",
          constituent.polarity
        ),
        { polarity: constituent.polarity }
      )
    ),
  });
}

function createHiggsClusterNode(id, options = {}) {
  const { label = "Higgs cluster" } = options;
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.PARTICLE,
    species: "higgs_cluster",
    label,
    classification: {
      family: STRUCTURE_CLASSIFICATION_FAMILIES.BOSON,
      source: "derived",
    },
    children: [
      createNoetherCoreNode(`${id}/core_pro_1`, {
        label: formatNoetherCoreLabel("pro"),
        polarity: "pro",
      }),
      createNoetherCoreNode(`${id}/core_anti_1`, {
        label: formatNoetherCoreLabel("anti"),
        polarity: "anti",
      }),
      createNoetherCoreNode(`${id}/core_pro_2`, {
        label: formatNoetherCoreLabel("pro"),
        polarity: "pro",
      }),
      createNoetherCoreNode(`${id}/core_anti_2`, {
        label: formatNoetherCoreLabel("anti"),
        polarity: "anti",
      }),
    ],
  });
}

function createPhotonNode(id, options = {}) {
  const { label = "Photon" } = options;
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.PARTICLE,
    species: "photon",
    label,
    classification: {
      family: STRUCTURE_CLASSIFICATION_FAMILIES.BOSON,
      source: "derived",
    },
    children: [
      createNoetherCoreNode(`${id}/core_pro_1`, {
        label: formatNoetherCoreLabel("pro"),
        polarity: "pro",
      }),
      createNoetherCoreNode(`${id}/core_anti_1`, {
        label: formatNoetherCoreLabel("anti"),
        polarity: "anti",
      }),
    ],
  });
}

function createOperatorNode(id, species, options = {}) {
  const normalizedSpecies = String(species ?? "").trim().toLowerCase() || "operator";
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.COMPOSITE,
    species: normalizedSpecies,
    label: options.label ?? normalizedSpecies,
    classification: {
      family: STRUCTURE_CLASSIFICATION_FAMILIES.EXOTIC,
      source: "authored_override",
    },
    traits: {
      variant: "operator_tile",
      allowNonCanonicalChildren: true,
    },
    children: [],
  });
}

function createGenericParticleNode(id, templateId, options = {}) {
  const fallbackLabel = String(templateId ?? "").trim() || "Particle";
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.PARTICLE,
    species: String(templateId ?? "").trim() || "particle",
    label: options.label ?? fallbackLabel,
    classification: {
      family: STRUCTURE_CLASSIFICATION_FAMILIES.EXOTIC,
      source: "authored_override",
    },
    traits: {
      variant: "generic_particle",
      templateId,
      polarity: options.polarity ?? "",
      allowNonCanonicalChildren: true,
    },
    children: [],
  });
}

export function buildReactionParticipantStructure(templateId, options = {}) {
  const normalizedTemplateId = String(templateId ?? "").trim().toLowerCase();
  const structureId = String(options.id ?? `structure_${normalizedTemplateId || "node"}`).trim();
  const label = String(options.label ?? "").trim();
  const polarity = String(options.polarity ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro";
  const occupiedSlots = Array.isArray(options.occupiedSlots) ? options.occupiedSlots : undefined;

  let root = null;
  if (normalizedTemplateId === "electron") {
    root = createFamilyParticleNode(
      structureId,
      STRUCTURE_CLASSIFICATION_FAMILIES.CHARGED_LEPTON,
      label || formatPolarityQualifiedLabel("Electron", polarity),
      { polarity, occupiedSlots }
    );
  } else if (normalizedTemplateId === "w_minus_boson") {
    root = createWBosonNode(structureId, "w_minus_boson", label || "W- Boson", {
      occupiedSlots,
    });
  } else if (normalizedTemplateId === "w_plus_boson") {
    root = createWBosonNode(structureId, "w_plus_boson", label || "W+ Boson", {
      occupiedSlots,
    });
  } else if (normalizedTemplateId === "z_boson") {
    root = createZBosonNode(structureId, {
      label: label || "Z Boson",
      occupiedSlots,
    });
  } else if (normalizedTemplateId === "neutrino") {
    root = createFamilyParticleNode(
      structureId,
      STRUCTURE_CLASSIFICATION_FAMILIES.NEUTRINO,
      label || formatPolarityQualifiedLabel("Neutrino", polarity),
      { polarity, occupiedSlots }
    );
  } else if (normalizedTemplateId === "up_quark") {
    root = createFamilyParticleNode(
      structureId,
      STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK,
      label || formatPolarityQualifiedLabel("Up Quark", polarity),
      { polarity, occupiedSlots }
    );
  } else if (normalizedTemplateId === "down_quark") {
    root = createFamilyParticleNode(
      structureId,
      STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK,
      label || formatPolarityQualifiedLabel("Down Quark", polarity),
      { polarity, occupiedSlots }
    );
  } else if (normalizedTemplateId === "proton") {
    root = createBaryonNode(
      structureId,
      "proton",
      [
        STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK,
        STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK,
        STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK,
      ],
      { label: label || "Pro Proton" }
    );
  } else if (normalizedTemplateId === "neutron") {
    root = createBaryonNode(
      structureId,
      "neutron",
      [
        STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK,
        STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK,
        STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK,
      ],
      { label: label || "Pro Neutron" }
    );
  } else if (normalizedTemplateId === "pi_plus") {
    root = createMesonNode(
      structureId,
      "pi_plus",
      [
        {
          family: STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK,
          polarity: "pro",
        },
        {
          family: STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK,
          polarity: "anti",
        },
      ],
      { label: label || "Pi+" }
    );
  } else if (normalizedTemplateId === "pi_minus") {
    root = createMesonNode(
      structureId,
      "pi_minus",
      [
        {
          family: STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK,
          polarity: "pro",
        },
        {
          family: STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK,
          polarity: "anti",
        },
      ],
      { label: label || "Pi-" }
    );
  } else if (normalizedTemplateId === "upi0") {
    root = createMesonNode(
      structureId,
      "upi0",
      [
        {
          family: STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK,
          polarity: "pro",
        },
        {
          family: STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK,
          polarity: "anti",
        },
      ],
      { label: label || "Pi0 (u anti-u)" }
    );
  } else if (normalizedTemplateId === "dpi0") {
    root = createMesonNode(
      structureId,
      "dpi0",
      [
        {
          family: STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK,
          polarity: "pro",
        },
        {
          family: STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK,
          polarity: "anti",
        },
      ],
      { label: label || "Pi0 (d anti-d)" }
    );
  } else if (normalizedTemplateId === "higgs_cluster") {
    root = createHiggsClusterNode(structureId, { label: label || "Higgs cluster" });
  } else if (normalizedTemplateId === "photon") {
    root = createPhotonNode(structureId, { label: label || "Photon" });
  } else if (normalizedTemplateId === "noether_core") {
    root = createNoetherCoreNode(structureId, {
      label: label || formatNoetherCoreLabel(polarity),
      polarity,
      occupiedSlots,
    });
  } else if (normalizedTemplateId === "free_architrinos") {
    root = createFreeArchitrinosNode(structureId, {
      label: label || "Free Architrinos",
      occupiedSlots,
    });
  } else if (
    normalizedTemplateId === "associate" ||
    normalizedTemplateId === "dissociate"
  ) {
    root = createOperatorNode(structureId, normalizedTemplateId, {
      label:
        label ||
        (normalizedTemplateId === "associate"
          ? "Associate"
          : normalizedTemplateId === "dissociate"
            ? "Dissociate"
            : "Operator"),
    });
  } else if (normalizedTemplateId === "fermion_gen1") {
    root = createGenericParticleNode(structureId, normalizedTemplateId, {
      label: label || "Gen I Fermion",
      polarity,
    });
  } else {
    root = createGenericParticleNode(structureId, normalizedTemplateId, {
      label: label || normalizedTemplateId || "Particle",
      polarity,
    });
  }

  const classifiedRoot = classifyStructureTree(root);
  const validation = validateStructureTree(classifiedRoot);
  return {
    root: classifiedRoot,
    validation,
  };
}
