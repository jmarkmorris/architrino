export const BORG_BRAID_RECORD_CATALOG_ID = "borg-braid-record-catalog.v1";

const ENTRY_FIELDS = Object.freeze(["id", "label", "recordUrl"]);

export const BORG_BRAID_RECORD_CATALOG = createBorgBraidRecordCatalog([
  {
    id: "family-a-a1-general-v1",
    label: "A1.0 — coincident endpoint orbits",
    recordUrl: "content/assets/borg/records/family-a-a1-general.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a1-1-equal-frequency-v1",
    label: "A1.1 — equal frequency",
    recordUrl: "content/assets/borg/records/family-a-a1-1-equal-frequency.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a1-2-equal-frequency-equal-radius-v1",
    label: "A1.2 — equal frequency, equal radius",
    recordUrl: "content/assets/borg/records/family-a-a1-2-equal-frequency-equal-radius.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a1-3-4-2-1-frequency-v1",
    label: "A1.3 — 4:2:1 frequency",
    recordUrl: "content/assets/borg/records/family-a-a1-3-4-2-1-frequency.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a1-4-3-2-1-frequency-v1",
    label: "A1.4 — 3:2:1 frequency",
    recordUrl: "content/assets/borg/records/family-a-a1-4-3-2-1-frequency.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a2-fully-symmetric-v1",
    label: "A2.0 — fully symmetric",
    recordUrl: "content/assets/borg/records/family-a-a2-fully-symmetric.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a3-general-v1",
    label: "A3.0 — general",
    recordUrl: "content/assets/borg/records/family-a-a3-general.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a3-1-equal-frequency-v1",
    label: "A3.1 — equal frequency",
    recordUrl: "content/assets/borg/records/family-a-a3-1-equal-frequency.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a3-2-equal-frequency-equal-radius-v1",
    label: "A3.2 — equal frequency, equal radius",
    recordUrl: "content/assets/borg/records/family-a-a3-2-equal-frequency-equal-radius.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a3-3-4-2-1-frequency-v1",
    label: "A3.3 — 4:2:1 frequency",
    recordUrl: "content/assets/borg/records/family-a-a3-3-4-2-1-frequency.assembly-view-record.v0.json",
  },
  {
    id: "family-a-a3-4-3-2-1-frequency-v1",
    label: "A3.4 — 3:2:1 frequency",
    recordUrl: "content/assets/borg/records/family-a-a3-4-3-2-1-frequency.assembly-view-record.v0.json",
  },
  {
    id: "illustrative-spindle-chart-hypothesis-v0",
    label: "B1.1 — interior reference",
    recordUrl:
      "content/assets/borg/records/illustrative-spindle-chart-hypothesis.assembly-view-record.v0.json",
  },
  {
    id: "illustrative-extreme-cap-tilt-spindle-variant-v0",
    label: "B1.2 — high-axial interior",
    recordUrl:
      "content/assets/borg/records/illustrative-extreme-cap-tilt-spindle-variant.assembly-view-record.v0.json",
  },
  {
    id: "illustrative-planar-tri-binary-spindle-boundary-v0",
    label: "B1.3 — all-equatorial boundary",
    recordUrl:
      "content/assets/borg/records/illustrative-planar-tri-binary-spindle-boundary.assembly-view-record.v0.json",
  },
  {
    id: "family-c-c1-co-rotating-general-v1",
    label: "C1 — co-rotating",
    recordUrl:
      "content/assets/borg/records/family-c-c1-co-rotating-general.assembly-view-record.v0.json",
  },
  {
    id: "family-c-c2-counter-rotating-general-v1",
    label: "C2 — counter-rotating",
    recordUrl:
      "content/assets/borg/records/family-c-c2-counter-rotating-general.assembly-view-record.v0.json",
  },
  {
    id: "family-c-c1-co-rotating-b1-pair-v1",
    label: "C3 — co-rotating B1 pair",
    recordUrl:
      "content/assets/borg/records/family-c-c1-co-rotating-b1-pair.assembly-view-record.v0.json",
  },
  {
    id: "family-c-c2-counter-rotating-b1-pair-v1",
    label: "C4 — counter-rotating B1 pair",
    recordUrl:
      "content/assets/borg/records/family-c-c2-counter-rotating-b1-pair.assembly-view-record.v0.json",
  },
  {
    id: "family-c-c1-1-co-rotating-b1-3-pair-v1",
    label: "C5 — co-rotating B1.3 pair",
    recordUrl:
      "content/assets/borg/records/family-c-c1-1-co-rotating-b1-3-pair.assembly-view-record.v0.json",
  },
  {
    id: "family-c-c2-1-counter-rotating-b1-3-pair-v1",
    label: "C6 — counter-rotating B1.3 pair",
    recordUrl:
      "content/assets/borg/records/family-c-c2-1-counter-rotating-b1-3-pair.assembly-view-record.v0.json",
  },
  {
    id: "sd3-centered-five-coordinate-v2",
    label: "SD3 — centered five-coordinate representative",
    recordUrl:
      "content/assets/borg/records/sd3-centered-five-coordinate.assembly-view-record.v0.json",
  },
  {
    id: "f5-phase-varying-campaign-v2",
    label: "F5 — phase-varying prescribed display representative",
    recordUrl:
      "content/assets/borg/records/f5-phase-varying-campaign.assembly-view-record.v0.json",
  },
  {
    id: "f6c-polarity-resolved-harmonic-v2",
    label: "F6c — small asymmetric counter-breathing representative",
    recordUrl:
      "content/assets/borg/records/f6c-polarity-resolved-harmonic.assembly-view-record.v0.json",
  },
  {
    id: "f6b-scoped-negative-circular-v2",
    label: "F6b — scoped-negative circular realization",
    recordUrl:
      "content/assets/borg/records/f6b-scoped-negative-circular.assembly-view-record.v0.json",
  },
]);

// Labels are navigation aliases, not sealed-record or geometry-class identity.
// Keep one label owner for the library, workbench, and catalog-backed reports.
export function borgBraidRecordLabel(sourceId) {
  return BORG_BRAID_RECORD_CATALOG.entries.find((entry) => entry.id === sourceId)?.label ?? null;
}

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
