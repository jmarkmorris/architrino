import {
  deriveStructureClassification,
  getNoetherCoreBinaryPresenceKey,
} from "./StructureClassification.js";
import { STRUCTURE_KINDS } from "./StructureSchema.js";

const noetherCoreDisplayLabelsByBinaryPresenceKey = Object.freeze({
  inner: "Uni Binary",
  inner_middle: "Bi Binary",
});

const displayLabelsBySpecies = Object.freeze({
  noether_core: "Noether Core",
  higgs_cluster: "Higgs Cluster",
  photon: "Photon",
  proton: "Proton",
  neutron: "Neutron",
  electron: "Electron",
  muon: "Muon",
  tau: "Tau",
  electron_neutrino: "Neutrino",
  muon_neutrino: "Muon Neutrino",
  tau_neutrino: "Tau Neutrino",
  up_quark: "Up",
  charm_quark: "Charm",
  top_quark: "Top",
  down_quark: "Down",
  strange_quark: "Strange",
  bottom_quark: "Bottom",
});

function humanizeStructureId(value = "") {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized) {
    return "";
  }
  return normalized
    .split("_")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase?.() + word.slice(1))
    .join(" ");
}

function formatNoetherCoreDisplayLabel(structureRoot = null) {
  const polarity = String(structureRoot?.traits?.polarity ?? "").trim().toLowerCase();
  return polarity === "anti" ? "Anti Noether Core" : "Pro Noether Core";
}

export function resolveStructureDisplayLabel(structureRoot = null) {
  if (!structureRoot) {
    return "";
  }

  if (structureRoot.kind === STRUCTURE_KINDS.NOETHER_CORE) {
    const binaryPresenceKey = getNoetherCoreBinaryPresenceKey(structureRoot);
    if (binaryPresenceKey === "inner_middle_outer") {
      return formatNoetherCoreDisplayLabel(structureRoot);
    }
    if (noetherCoreDisplayLabelsByBinaryPresenceKey[binaryPresenceKey]) {
      return noetherCoreDisplayLabelsByBinaryPresenceKey[binaryPresenceKey];
    }
  }

  const derivedSpecies =
    structureRoot.kind === STRUCTURE_KINDS.PARTICLE
      ? deriveStructureClassification(structureRoot)?.species ?? structureRoot?.species
      : structureRoot?.species;
  const normalizedSpecies = String(derivedSpecies ?? "").trim().toLowerCase();

  if (displayLabelsBySpecies[normalizedSpecies]) {
    return displayLabelsBySpecies[normalizedSpecies];
  }

  const fallbackLabel = String(structureRoot?.label ?? structureRoot?.species ?? "").trim();
  return (
    humanizeStructureId(derivedSpecies) ||
    humanizeStructureId(fallbackLabel) ||
    fallbackLabel ||
    "Structure"
  );
}
