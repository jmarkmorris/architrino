const reactionPolarizedTemplateIds = new Set([
  "noether_core",
  "electron",
  "neutrino",
  "down_quark",
  "up_quark",
  "fermion_gen1",
]);

const reactionCanonicalStaticBaseLabels = Object.freeze({
  associate: "Associate",
  dissociate: "Dissociate",
  w_minus_boson: "Negative W Boson",
  z_boson: "Neutral Z Boson",
  w_plus_boson: "Positive W Boson",
  free_architrinos: "Free Architrinos",
  photon: "Photon",
});

export const reactionPickerLabelColumns = Object.freeze([
  Object.freeze({
    id: "binary_count",
    entries: Object.freeze([
      Object.freeze({
        id: "uni_binary",
        templateId: "noether_core",
        label: "Pro Uni Binary",
        occupiedCount: 1,
      }),
      Object.freeze({
        id: "bi_binary",
        templateId: "noether_core",
        label: "Pro Bi Binary",
        occupiedCount: 2,
      }),
      Object.freeze({
        id: "tri_binary",
        templateId: "noether_core",
        label: "Pro Noether Core",
        occupiedCount: 3,
      }),
    ]),
  }),
  Object.freeze({
    id: "neutrinos",
    entries: Object.freeze([
      Object.freeze({
        id: "tau_neutrino",
        templateId: "neutrino",
        label: "Pro Tau Neutrino",
        occupiedCount: 1,
      }),
      Object.freeze({
        id: "muon_neutrino",
        templateId: "neutrino",
        label: "Pro Muon Neutrino",
        occupiedCount: 2,
      }),
      Object.freeze({
        id: "neutrino",
        templateId: "neutrino",
        label: "Pro Electron Neutrino",
        occupiedCount: 3,
      }),
    ]),
  }),
  Object.freeze({
    id: "charged_leptons",
    entries: Object.freeze([
      Object.freeze({
        id: "tau",
        templateId: "electron",
        label: "Pro Tau",
        occupiedCount: 1,
      }),
      Object.freeze({
        id: "muon",
        templateId: "electron",
        label: "Pro Muon",
        occupiedCount: 2,
      }),
      Object.freeze({
        id: "electron",
        templateId: "electron",
        label: "Pro Electron",
        occupiedCount: 3,
      }),
    ]),
  }),
  Object.freeze({
    id: "down_family",
    entries: Object.freeze([
      Object.freeze({
        id: "bottom",
        templateId: "down_quark",
        label: "Pro Bottom Quark",
        occupiedCount: 1,
      }),
      Object.freeze({
        id: "strange",
        templateId: "down_quark",
        label: "Pro Strange Quark",
        occupiedCount: 2,
      }),
      Object.freeze({
        id: "down",
        templateId: "down_quark",
        label: "Pro Down Quark",
        occupiedCount: 3,
      }),
    ]),
  }),
  Object.freeze({
    id: "up_family",
    entries: Object.freeze([
      Object.freeze({
        id: "top",
        templateId: "up_quark",
        label: "Pro Top Quark",
        occupiedCount: 1,
      }),
      Object.freeze({
        id: "charm",
        templateId: "up_quark",
        label: "Pro Charm Quark",
        occupiedCount: 2,
      }),
      Object.freeze({
        id: "up",
        templateId: "up_quark",
        label: "Pro Up Quark",
        occupiedCount: 3,
      }),
    ]),
  }),
  Object.freeze({
    id: "boson_bridge",
    entries: Object.freeze([
      Object.freeze({
        id: "photon",
        templateId: "photon",
        label: "Photon",
      }),
      Object.freeze({
        id: "pi_minus",
        templateId: "pi_minus",
        label: "Negative Pion",
      }),
      Object.freeze({
        id: "pi_plus",
        templateId: "pi_plus",
        label: "Positive Pion",
      }),
      Object.freeze({
        id: "dpi0",
        templateId: "dpi0",
        label: "Neutral Pion (d anti-d)",
      }),
      Object.freeze({
        id: "upi0",
        templateId: "upi0",
        label: "Neutral Pion (u anti-u)",
      }),
    ]),
  }),
  Object.freeze({
    id: "kaon_bridge",
    entries: Object.freeze([
      Object.freeze({
        id: "k_minus",
        templateId: "k_minus",
        label: "Negative Kaon",
      }),
      Object.freeze({
        id: "k_plus",
        templateId: "k_plus",
        label: "Positive Kaon",
      }),
      Object.freeze({
        id: "sk0",
        templateId: "sk0",
        label: "Neutral Kaon (s anti-d)",
      }),
      Object.freeze({
        id: "dk0",
        templateId: "dk0",
        label: "Neutral Kaon (d anti-s)",
      }),
    ]),
  }),
  Object.freeze({
    id: "b_meson_bridge",
    entries: Object.freeze([
      Object.freeze({
        id: "b_minus",
        templateId: "b_minus",
        label: "Negative B Meson",
      }),
      Object.freeze({
        id: "b_plus",
        templateId: "b_plus",
        label: "Positive B Meson",
      }),
      Object.freeze({
        id: "bB0",
        templateId: "bB0",
        label: "Neutral B Meson (b anti-d)",
      }),
      Object.freeze({
        id: "dB0",
        templateId: "dB0",
        label: "Neutral B Meson (d anti-b)",
      }),
    ]),
  }),
  Object.freeze({
    id: "composite_bridge",
    entries: Object.freeze([
      Object.freeze({
        id: "noether_pair",
        templateId: "noether_pair",
        label: "Noether Pair",
      }),
      Object.freeze({
        id: "noether_quad",
        templateId: "noether_quad",
        label: "Noether Quad",
      }),
      Object.freeze({
        id: "proton",
        templateId: "proton",
        label: "Pro Proton",
      }),
      Object.freeze({
        id: "neutron",
        templateId: "neutron",
        label: "Pro Neutron",
      }),
    ]),
  }),
]);

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeLowerText(value = "") {
  return normalizeText(value).toLowerCase();
}

function normalizeOccupiedCount(value = null) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  return Math.max(0, Math.round(Number(value) || 0));
}

function stripLeadingParticipantPolarity(label = "") {
  return normalizeText(label).replace(/^(pro|anti)\s+/i, "") || normalizeText(label);
}

function supportsParticipantPolarity(templateId = "") {
  return reactionPolarizedTemplateIds.has(normalizeLowerText(templateId));
}

function shouldPreserveLeadingPolarityLabel(templateId = "") {
  const normalizedTemplateId = normalizeLowerText(templateId);
  return normalizedTemplateId === "proton" || normalizedTemplateId === "neutron";
}

function buildEntriesByTemplateId() {
  const entriesByTemplateId = new Map();
  reactionPickerLabelColumns.forEach((column) => {
    (Array.isArray(column?.entries) ? column.entries : []).forEach((entry) => {
      const templateId = normalizeLowerText(entry?.templateId);
      if (!templateId) {
        return;
      }
      if (!entriesByTemplateId.has(templateId)) {
        entriesByTemplateId.set(templateId, []);
      }
      entriesByTemplateId.get(templateId).push(entry);
    });
  });
  return entriesByTemplateId;
}

const reactionPickerEntriesByTemplateId = buildEntriesByTemplateId();

export function getReactionCanonicalBaseLabel(templateId = "", options = {}) {
  const normalizedTemplateId = normalizeLowerText(templateId);
  const fallbackLabel = normalizeText(options?.fallbackLabel);
  const occupiedCount = normalizeOccupiedCount(options?.occupiedCount);
  if (reactionCanonicalStaticBaseLabels[normalizedTemplateId]) {
    return reactionCanonicalStaticBaseLabels[normalizedTemplateId];
  }
  const templateEntries = reactionPickerEntriesByTemplateId.get(normalizedTemplateId) ?? [];
  if (!templateEntries.length) {
    return fallbackLabel || normalizeText(templateId) || "?";
  }
  if (occupiedCount !== null) {
    const exactEntry = templateEntries.find(
      (entry) => normalizeOccupiedCount(entry?.occupiedCount) === occupiedCount
    );
    if (exactEntry) {
      return exactEntry.label;
    }
  }
  const defaultEntry =
    templateEntries.find((entry) => normalizeOccupiedCount(entry?.occupiedCount) === 3) ??
    templateEntries.find((entry) => entry?.occupiedCount === null || entry?.occupiedCount === undefined) ??
    templateEntries[templateEntries.length - 1];
  return normalizeText(defaultEntry?.label) || fallbackLabel || normalizeText(templateId) || "?";
}

export function formatReactionCanonicalLabel(baseLabel = "", templateId = "", polarity = "") {
  const resolvedBaseLabel = normalizeText(baseLabel) || "?";
  if (shouldPreserveLeadingPolarityLabel(templateId)) {
    return resolvedBaseLabel;
  }
  if (!supportsParticipantPolarity(templateId)) {
    return stripLeadingParticipantPolarity(resolvedBaseLabel) || resolvedBaseLabel;
  }
  const cleanedBaseLabel = stripLeadingParticipantPolarity(resolvedBaseLabel) || "?";
  return `${normalizeLowerText(polarity) === "anti" ? "Anti" : "Pro"} ${cleanedBaseLabel}`;
}

export function getReactionCanonicalLabel(templateId = "", options = {}) {
  return formatReactionCanonicalLabel(
    getReactionCanonicalBaseLabel(templateId, options),
    templateId,
    options?.polarity
  );
}
