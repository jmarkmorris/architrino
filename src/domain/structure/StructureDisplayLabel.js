import {
  deriveStructureClassification,
  getNoetherCoreBinaryPresenceKey,
} from "./StructureClassification.js";
import { getStructureTrait, STRUCTURE_KINDS } from "./StructureSchema.js";

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
  up_quark: "Up Quark",
  charm_quark: "Charm Quark",
  top_quark: "Top Quark",
  down_quark: "Down Quark",
  strange_quark: "Strange Quark",
  bottom_quark: "Bottom Quark",
  pi_plus: "Positive Pion",
  pi_minus: "Negative Pion",
  upi0: "Neutral Pion (u anti-u)",
  dpi0: "Neutral Pion (d anti-d)",
  k_plus: "Positive Kaon",
  k_minus: "Negative Kaon",
  k0: "Neutral Kaon (d anti-s)",
  anti_k0: "Neutral Kaon (s anti-d)",
  b_plus: "Positive B Meson",
  b_minus: "Negative B Meson",
  b0: "Neutral B Meson (d anti-b)",
  anti_b0: "Neutral B Meson (b anti-d)",
});

const polarityQualifiedSpecies = new Set([
  "noether_core",
  "electron",
  "muon",
  "tau",
  "electron_neutrino",
  "muon_neutrino",
  "tau_neutrino",
  "up_quark",
  "charm_quark",
  "top_quark",
  "down_quark",
  "strange_quark",
  "bottom_quark",
]);

const alwaysProSpecies = new Set([
  "proton",
  "neutron",
]);

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

function formatPolarityQualifiedLabel(baseLabel = "", polarity = "") {
  const prefix = String(polarity ?? "").trim().toLowerCase() === "anti" ? "Anti" : "Pro";
  return `${prefix} ${String(baseLabel ?? "").trim()}`.trim();
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
      return formatPolarityQualifiedLabel(
        noetherCoreDisplayLabelsByBinaryPresenceKey[binaryPresenceKey],
        structureRoot?.traits?.polarity
      );
    }
  }

  const derivedSpecies =
    structureRoot.kind === STRUCTURE_KINDS.PARTICLE
      ? deriveStructureClassification(structureRoot)?.species ?? structureRoot?.species
      : structureRoot?.species;
  const normalizedSpecies = String(derivedSpecies ?? "").trim().toLowerCase();

  if (displayLabelsBySpecies[normalizedSpecies]) {
    const baseLabel = displayLabelsBySpecies[normalizedSpecies];
    if (polarityQualifiedSpecies.has(normalizedSpecies)) {
      return formatPolarityQualifiedLabel(baseLabel, getStructureTrait(structureRoot, "polarity", ""));
    }
    if (alwaysProSpecies.has(normalizedSpecies)) {
      return `Pro ${baseLabel}`;
    }
    return baseLabel;
  }

  const fallbackLabel = String(structureRoot?.label ?? structureRoot?.species ?? "").trim();
  return (
    humanizeStructureId(derivedSpecies) ||
    humanizeStructureId(fallbackLabel) ||
    fallbackLabel ||
    "Structure"
  );
}
