export const BORG_BRAID_RECORD_CATALOG_ID = "borg-braid-record-catalog.v0";

const ENTRY_FIELDS = Object.freeze(["id", "label", "recordUrl", "familyId", "familyLabel"]);

export const BORG_BRAID_RECORD_CATALOG = createBorgBraidRecordCatalog([
  {
    id: "family-a-a1-general-v1",
    label: "A1 — coincident endpoint orbits",
    familyId: "A",
    familyLabel: "Family A",
    recordUrl: "content/assets/borg/records/family-a-a1-general.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a1-1-equal-frequency-v1",
    label: "A1.1 — equal frequency",
    familyId: "A",
    familyLabel: "Family A",
    recordUrl: "content/assets/borg/records/family-a-a1-1-equal-frequency.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a1-2-equal-frequency-equal-radius-v1",
    label: "A1.2 — equal frequency, equal radius",
    familyId: "A",
    familyLabel: "Family A",
    recordUrl: "content/assets/borg/records/family-a-a1-2-equal-frequency-equal-radius.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a1-3-4-2-1-frequency-v1",
    label: "A1.3 — 4:2:1 frequency",
    familyId: "A",
    familyLabel: "Family A",
    recordUrl: "content/assets/borg/records/family-a-a1-3-4-2-1-frequency.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a1-4-3-2-1-frequency-v1",
    label: "A1.4 — 3:2:1 frequency",
    familyId: "A",
    familyLabel: "Family A",
    recordUrl: "content/assets/borg/records/family-a-a1-4-3-2-1-frequency.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a2-fully-symmetric-v1",
    label: "A2 — fully symmetric",
    familyId: "A",
    familyLabel: "Family A",
    recordUrl: "content/assets/borg/records/family-a-a2-fully-symmetric.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a3-general-v1",
    label: "A3 — general",
    familyId: "A",
    familyLabel: "Family A",
    recordUrl: "content/assets/borg/records/family-a-a3-general.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a3-1-equal-frequency-v1",
    label: "A3.1 — equal frequency",
    familyId: "A",
    familyLabel: "Family A",
    recordUrl: "content/assets/borg/records/family-a-a3-1-equal-frequency.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a3-2-equal-frequency-equal-radius-v1",
    label: "A3.2 — equal frequency, equal radius",
    familyId: "A",
    familyLabel: "Family A",
    recordUrl: "content/assets/borg/records/family-a-a3-2-equal-frequency-equal-radius.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a3-3-4-2-1-frequency-v1",
    label: "A3.3 — 4:2:1 frequency",
    familyId: "A",
    familyLabel: "Family A",
    recordUrl: "content/assets/borg/records/family-a-a3-3-4-2-1-frequency.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a3-4-3-2-1-frequency-v1",
    label: "A3.4 — 3:2:1 frequency",
    familyId: "A",
    familyLabel: "Family A",
    recordUrl: "content/assets/borg/records/family-a-a3-4-3-2-1-frequency.assembly-view-record.v0.json",
  },
  {
    id: "illustrative-spindle-chart-hypothesis-v0",
    label: "B1.1 — interior reference",
    familyId: "B",
    familyLabel: "Family B",
    recordUrl:
      "content/assets/borg/records/illustrative-spindle-chart-hypothesis.assembly-view-record.v0.json",
  },
  {
    id: "illustrative-extreme-cap-tilt-spindle-variant-v0",
    label: "B1.2 — high-axial interior",
    familyId: "B",
    familyLabel: "Family B",
    recordUrl:
      "content/assets/borg/records/illustrative-extreme-cap-tilt-spindle-variant.assembly-view-record.v0.json",
  },
  {
    id: "illustrative-planar-tri-binary-spindle-boundary-v0",
    label: "B1.3 — all-equatorial boundary",
    familyId: "B",
    familyLabel: "Family B",
    recordUrl:
      "content/assets/borg/records/illustrative-planar-tri-binary-spindle-boundary.assembly-view-record.v0.json",
  },
  {
    id: "illustrative-full-cap-axial-spindle-boundary-v0",
    label: "B1.4 — all-axial boundary",
    familyId: "B",
    familyLabel: "Family B",
    recordUrl:
      "content/assets/borg/records/illustrative-full-cap-axial-spindle-boundary.assembly-view-record.v0.json",
  },
  {
    id: "family-c-c1-co-rotating-general-v1",
    label: "C1 — co-rotating",
    familyId: "C",
    familyLabel: "Family C",
    recordUrl:
      "content/assets/borg/records/family-c-c1-co-rotating-general.assembly-view-record.v0.json",
  },
  {
    id: "family-c-c2-counter-rotating-general-v1",
    label: "C2 — counter-rotating",
    familyId: "C",
    familyLabel: "Family C",
    recordUrl:
      "content/assets/borg/records/family-c-c2-counter-rotating-general.assembly-view-record.v0.json",
  },
  {
    id: "family-c-c1-co-rotating-b1-pair-v1",
    label: "C3 — co-rotating B1 pair",
    familyId: "C",
    familyLabel: "Family C",
    recordUrl:
      "content/assets/borg/records/family-c-c1-co-rotating-b1-pair.assembly-view-record.v0.json",
  },
  {
    id: "family-c-c2-counter-rotating-b1-pair-v1",
    label: "C4 — counter-rotating B1 pair",
    familyId: "C",
    familyLabel: "Family C",
    recordUrl:
      "content/assets/borg/records/family-c-c2-counter-rotating-b1-pair.assembly-view-record.v0.json",
  },
  {
    id: "family-c-c1-1-co-rotating-b1-3-pair-v1",
    label: "C5 — co-rotating B1.3 pair",
    familyId: "C",
    familyLabel: "Family C",
    recordUrl:
      "content/assets/borg/records/family-c-c1-1-co-rotating-b1-3-pair.assembly-view-record.v0.json",
  },
  {
    id: "family-c-c2-1-counter-rotating-b1-3-pair-v1",
    label: "C6 — counter-rotating B1.3 pair",
    familyId: "C",
    familyLabel: "Family C",
    recordUrl:
      "content/assets/borg/records/family-c-c2-1-counter-rotating-b1-3-pair.assembly-view-record.v0.json",
  },
]);

export function createBorgBraidRecordCatalog(entries) {
  if (!Array.isArray(entries) || entries.length === 0) {
    throw new TypeError("Borg braid record catalog requires at least one entry.");
  }
  const ids = new Set();
  const urls = new Set();
  const normalizedEntries = entries.map((entry, index) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new TypeError(`Borg braid record catalog entry ${index} must be an object.`);
    }
    const fields = Object.keys(entry);
    if (fields.length !== ENTRY_FIELDS.length || ENTRY_FIELDS.some((field) => !fields.includes(field))) {
      throw new TypeError(
        `Borg braid record catalog entry ${index} may contain only ${ENTRY_FIELDS.join(", ")}.`,
      );
    }
    ENTRY_FIELDS.forEach((field) => requireConcreteString(entry[field], `entry ${index} ${field}`));
    if (ids.has(entry.id)) {
      throw new TypeError(`Borg braid record catalog id ${entry.id} is duplicated.`);
    }
    if (urls.has(entry.recordUrl)) {
      throw new TypeError(`Borg braid record catalog URL ${entry.recordUrl} is duplicated.`);
    }
    ids.add(entry.id);
    urls.add(entry.recordUrl);
    return Object.freeze({
      id: entry.id,
      label: entry.label,
      recordUrl: entry.recordUrl,
      familyId: entry.familyId,
      familyLabel: entry.familyLabel,
    });
  });
  return Object.freeze({
    id: BORG_BRAID_RECORD_CATALOG_ID,
    entries: Object.freeze(normalizedEntries),
  });
}

function requireConcreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`Borg braid record catalog ${label} must be a concrete string.`);
  }
}
