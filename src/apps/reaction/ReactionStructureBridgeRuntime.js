import { classifyStructureTree } from "../../domain/structure/StructureClassification.js";
import {
  createStructureNode,
  STRUCTURE_ARCHITRINO_ROLES,
  STRUCTURE_CHARGE_TYPES,
  STRUCTURE_CLASSIFICATION_FAMILIES,
  STRUCTURE_KINDS,
  STRUCTURE_SLOT_ORDER,
} from "../../domain/structure/StructureSchema.js";
import {
  getStructureAssemblyCorePolarities,
  getStructureAssemblyDisplayLabel,
  normalizeStructureAssemblyTemplateId,
} from "../../domain/structure/StructureAssemblyCatalog.js";
import { validateStructureTree } from "../../domain/structure/StructureValidation.js";
import {
  getReactionCanonicalLabel,
  getReactionObjectOccupiedSlots,
  getReactionObjectSpec,
  normalizeReactionObjectPolarity,
  normalizeReactionObjectTemplateId,
} from "./ReactionObjectRegistryRuntime.js";

const STRUCTURE_FAMILY_BY_REGISTRY_FAMILY = Object.freeze({
  charged_lepton: STRUCTURE_CLASSIFICATION_FAMILIES.CHARGED_LEPTON,
  neutrino: STRUCTURE_CLASSIFICATION_FAMILIES.NEUTRINO,
  up_type_quark: STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK,
  down_type_quark: STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK,
  baryon: STRUCTURE_CLASSIFICATION_FAMILIES.BARYON,
  meson: STRUCTURE_CLASSIFICATION_FAMILIES.MESON,
  boson: STRUCTURE_CLASSIFICATION_FAMILIES.BOSON,
  exotic: STRUCTURE_CLASSIFICATION_FAMILIES.EXOTIC,
});

function formatNoetherCoreLabel(polarity = "pro") {
  return getReactionCanonicalLabel("noether_core", {
    polarity,
    occupiedCount: 3,
  });
}

function formatPolarityQualifiedLabel(baseLabel = "", polarity = "pro") {
  return `${
    String(polarity ?? "").trim().toLowerCase() === "anti" ? "Anti" : "Pro"
  } ${String(baseLabel ?? "").trim()}`.trim();
}

function resolveClassificationFamily(registryFamily = "") {
  return (
    STRUCTURE_FAMILY_BY_REGISTRY_FAMILY[String(registryFamily ?? "").trim().toLowerCase()] ??
    STRUCTURE_CLASSIFICATION_FAMILIES.EXOTIC
  );
}

function resolveRegistryConstituentLabel(constituent = {}) {
  return (
    constituent?.label ||
    getReactionCanonicalLabel(constituent?.templateId, {
      polarity: constituent?.polarity,
      occupiedCount: constituent?.occupiedCount,
    })
  );
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
  const { label = "Neutral Z Boson", occupiedSlots = STRUCTURE_SLOT_ORDER } = options;
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
        constituent.label ||
          resolveRegistryConstituentLabel(constituent),
        {
          polarity: constituent.polarity,
          occupiedSlots: constituent.occupiedSlots,
        }
      )
    ),
  });
}

function createNoetherAssemblyNode(id, templateId, options = {}) {
  const normalizedTemplateId = normalizeStructureAssemblyTemplateId(templateId);
  const corePolarities = getStructureAssemblyCorePolarities(normalizedTemplateId);
  const { label = getStructureAssemblyDisplayLabel(normalizedTemplateId, "Noether Assembly") } = options;
  return createStructureNode({
    id,
    kind: STRUCTURE_KINDS.PARTICLE,
    species: normalizedTemplateId,
    label,
    classification: {
      family: STRUCTURE_CLASSIFICATION_FAMILIES.BOSON,
      source: "derived",
    },
    children: corePolarities.map((polarity, index) =>
      createNoetherCoreNode(`${id}/core_${polarity}_${index + 1}`, {
        label: formatNoetherCoreLabel(polarity),
        polarity,
      })
    ),
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
  const normalizedTemplateId = normalizeReactionObjectTemplateId(
    normalizeStructureAssemblyTemplateId(templateId)
  );
  const objectSpec = getReactionObjectSpec(normalizedTemplateId);
  const structureId = String(options.id ?? `structure_${normalizedTemplateId || "node"}`).trim();
  const label = String(options.label ?? "").trim();
  const polarity = normalizeReactionObjectPolarity(options.polarity);
  const occupiedSlots = getReactionObjectOccupiedSlots(normalizedTemplateId, {
    occupiedSlots: Array.isArray(options.occupiedSlots) ? options.occupiedSlots : undefined,
    label,
    templateId: normalizedTemplateId,
  });
  const resolvedLabel =
    label ||
    getReactionCanonicalLabel(normalizedTemplateId, {
      polarity,
      occupiedSlots,
    });
  const structureSpec = objectSpec?.structure ?? null;

  let root = null;
  if (structureSpec?.kind === "family_particle") {
    root = createFamilyParticleNode(
      structureId,
      resolveClassificationFamily(structureSpec.family),
      resolvedLabel,
      { polarity, occupiedSlots }
    );
  } else if (normalizedTemplateId === "w_minus_boson") {
    root = createWBosonNode(structureId, "w_minus_boson", label || "Negative W Boson", {
      occupiedSlots,
    });
  } else if (normalizedTemplateId === "w_plus_boson") {
    root = createWBosonNode(structureId, "w_plus_boson", label || "Positive W Boson", {
      occupiedSlots,
    });
  } else if (normalizedTemplateId === "z_boson") {
    root = createZBosonNode(structureId, {
      label: label || "Neutral Z Boson",
      occupiedSlots,
    });
  } else if (structureSpec?.kind === "baryon") {
    root = createBaryonNode(
      structureId,
      normalizedTemplateId,
      (Array.isArray(structureSpec.constituents) ? structureSpec.constituents : []).map((constituent) =>
        resolveClassificationFamily(getReactionObjectSpec(constituent?.templateId)?.structure?.family)
      ),
      { label: resolvedLabel }
    );
  } else if (structureSpec?.kind === "meson") {
    root = createMesonNode(
      structureId,
      normalizedTemplateId,
      (Array.isArray(structureSpec.constituents) ? structureSpec.constituents : []).map((constituent) => ({
        family: resolveClassificationFamily(getReactionObjectSpec(constituent?.templateId)?.structure?.family),
        polarity: normalizeReactionObjectPolarity(constituent?.polarity),
        label: resolveRegistryConstituentLabel(constituent),
        occupiedSlots: getReactionObjectOccupiedSlots(constituent?.templateId, {
          occupiedCount: constituent?.occupiedCount,
        }),
      })),
      { label: resolvedLabel }
    );
  } else if (structureSpec?.kind === "assembly") {
    root = createNoetherAssemblyNode(structureId, structureSpec.assemblyTemplateId || normalizedTemplateId, {
      label: resolvedLabel || getStructureAssemblyDisplayLabel(normalizedTemplateId),
    });
  } else if (structureSpec?.kind === "photon") {
    root = createPhotonNode(structureId, { label: resolvedLabel || "Photon" });
  } else if (structureSpec?.kind === "noether_core") {
    root = createNoetherCoreNode(structureId, {
      label: resolvedLabel || formatNoetherCoreLabel(polarity),
      polarity,
      occupiedSlots,
    });
  } else if (structureSpec?.kind === "free_architrinos") {
    root = createFreeArchitrinosNode(structureId, {
      label: resolvedLabel || "Free Architrinos",
      occupiedSlots,
    });
  } else if (structureSpec?.kind === "operator") {
    root = createOperatorNode(structureId, normalizedTemplateId, {
      label: resolvedLabel || "Operator",
    });
  } else if (structureSpec?.kind === "generic_particle" && normalizedTemplateId === "fermion_gen1") {
    root = createGenericParticleNode(structureId, normalizedTemplateId, {
      label: resolvedLabel || "Gen I Fermion",
      polarity,
    });
  } else {
    root = createGenericParticleNode(structureId, normalizedTemplateId, {
      label: resolvedLabel || normalizedTemplateId || "Particle",
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
