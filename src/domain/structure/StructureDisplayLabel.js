import {
  deriveStructureClassification,
  getNoetherBraidBinaryPresenceKey,
} from "./StructureClassification.js";
import {
  getStructureAssemblyDisplayLabel,
  isNoetherAssemblyTemplateId,
  normalizeStructureAssemblyTemplateId,
} from "./StructureAssemblyCatalog.js";
import { getStructureTrait, STRUCTURE_KINDS } from "./StructureSchema.js";

const noetherBraidDisplayLabelsByBinaryPresenceKey = Object.freeze({
  inner: "Shell Braid",
  inner_middle: "Nested Shell Braid",
});

const displayLabelsBySpecies = Object.freeze({
  noether_braid: "Noether braid",
  noether_pair: "Pro/anti-orientation Noether-braid composite",
  noether_quad: "Noether Quad",
  photon: "Photon",
  proton: "Proton",
  neutron: "Neutron",
  electron: "Electron",
  muon: "Muon",
  tau: "Tau",
  w_minus_boson: "Negative W Boson",
  z_boson: "Neutral Z Boson",
  w_plus_boson: "Positive W Boson",
  electron_neutrino: "Electron Neutrino",
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
  dk0: "Neutral Kaon (d anti-s)",
  sk0: "Neutral Kaon (s anti-d)",
  b_plus: "Positive B Meson",
  b_minus: "Negative B Meson",
  db0: "Neutral B Meson (d anti-b)",
  bb0: "Neutral B Meson (b anti-d)",
});

const polarityQualifiedSpecies = new Set([
  "noether_braid",
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

function formatNoetherBraidDisplayLabel(structureRoot = null) {
  const polarity = String(structureRoot?.traits?.polarity ?? "").trim().toLowerCase();
  return polarity === "anti" ? "Anti Noether braid" : "Pro Noether braid";
}

function formatPolarityQualifiedLabel(baseLabel = "", polarity = "") {
  const prefix = String(polarity ?? "").trim().toLowerCase() === "anti" ? "Anti" : "Pro";
  return `${prefix} ${String(baseLabel ?? "").trim()}`.trim();
}

export function resolveStructureDisplayLabel(structureRoot = null) {
  if (!structureRoot) {
    return "";
  }

  if (structureRoot.kind === STRUCTURE_KINDS.NOETHER_BRAID) {
    const binaryPresenceKey = getNoetherBraidBinaryPresenceKey(structureRoot);
    if (binaryPresenceKey === "inner_middle_outer") {
      return formatNoetherBraidDisplayLabel(structureRoot);
    }
    if (noetherBraidDisplayLabelsByBinaryPresenceKey[binaryPresenceKey]) {
      return formatPolarityQualifiedLabel(
        noetherBraidDisplayLabelsByBinaryPresenceKey[binaryPresenceKey],
        structureRoot?.traits?.polarity
      );
    }
  }

  const derivedSpecies =
    structureRoot.kind === STRUCTURE_KINDS.PARTICLE
      ? deriveStructureClassification(structureRoot)?.species ?? structureRoot?.species
      : structureRoot?.species;
  const normalizedSpecies = String(derivedSpecies ?? "").trim().toLowerCase();

  if (isNoetherAssemblyTemplateId(normalizedSpecies)) {
    return getStructureAssemblyDisplayLabel(normalizeStructureAssemblyTemplateId(normalizedSpecies));
  }

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
