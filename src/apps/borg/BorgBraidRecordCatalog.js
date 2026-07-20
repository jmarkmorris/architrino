export const BORG_BRAID_RECORD_CATALOG_ID = "borg-braid-record-catalog.v0";

const ENTRY_FIELDS = Object.freeze(["id", "label", "recordUrl"]);

export const BORG_BRAID_RECORD_CATALOG = createBorgBraidRecordCatalog([
  {
    id: "illustrative-spindle-chart-hypothesis-v0",
    label: "Illustrative spindle chart hypothesis",
    recordUrl:
      "content/assets/borg/records/illustrative-spindle-chart-hypothesis.assembly-view-record.v0.json",
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
