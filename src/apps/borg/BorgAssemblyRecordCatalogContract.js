export const BORG_ASSEMBLY_RECORD_CATALOG_ID = "borg-assembly-record-catalog.v2";

const ENTRY_FIELDS = Object.freeze(["assemblyId", "modelRevisionSha256", "label", "recordUrl"]);

export function createBorgAssemblyRecordCatalog(entries) {
  if (!Array.isArray(entries) || entries.length === 0) {
    throw new TypeError("Borg assembly record catalog requires at least one entry.");
  }
  const assemblyIds = new Set();
  const modelRevisions = new Set();
  const urls = new Set();
  const normalizedEntries = entries.map((entry, index) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new TypeError(`Borg assembly record catalog entry ${index} must be an object.`);
    }
    const fields = Object.keys(entry);
    if (fields.length !== ENTRY_FIELDS.length || ENTRY_FIELDS.some((field) => !fields.includes(field))) {
      throw new TypeError(`Borg assembly record catalog entry ${index} may contain only ${ENTRY_FIELDS.join(", ")}.`);
    }
    ENTRY_FIELDS.forEach((field) => requireConcreteString(entry[field], `entry ${index} ${field}`));
    if (!/^asm-[a-f0-9]{32}$/.test(entry.assemblyId)) {
      throw new TypeError(`Borg assembly record catalog entry ${index} assemblyId is invalid.`);
    }
    if (!/^[a-f0-9]{64}$/.test(entry.modelRevisionSha256)) {
      throw new TypeError(`Borg assembly record catalog entry ${index} modelRevisionSha256 is invalid.`);
    }
    if (entry.assemblyId !== `asm-${entry.modelRevisionSha256.slice(0, 32)}`) {
      throw new TypeError(`Borg assembly record catalog entry ${index} exact identity pair is inconsistent.`);
    }
    if (assemblyIds.has(entry.assemblyId)) throw new TypeError(`Borg assembly record assemblyId ${entry.assemblyId} is duplicated.`);
    if (modelRevisions.has(entry.modelRevisionSha256)) throw new TypeError(`Borg assembly record modelRevisionSha256 ${entry.modelRevisionSha256} is duplicated.`);
    if (urls.has(entry.recordUrl)) throw new TypeError(`Borg assembly record catalog URL ${entry.recordUrl} is duplicated.`);
    assemblyIds.add(entry.assemblyId);
    modelRevisions.add(entry.modelRevisionSha256);
    urls.add(entry.recordUrl);
    return Object.freeze({ ...entry });
  });
  return Object.freeze({ id: BORG_ASSEMBLY_RECORD_CATALOG_ID, entries: Object.freeze(normalizedEntries) });
}

function requireConcreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`Borg assembly record catalog ${label} must be a concrete string.`);
  }
}

export function validateBorgAssemblyRecordCatalogData(data) {
  if (!data || typeof data !== "object" || Array.isArray(data) ||
      Object.keys(data).length !== 2 || !Object.hasOwn(data, "schema") ||
      !Object.hasOwn(data, "entries") || data.schema !== BORG_ASSEMBLY_RECORD_CATALOG_ID) {
    throw new TypeError("Borg catalog data requires exactly the catalog schema and entries.");
  }
  const catalog = createBorgAssemblyRecordCatalog(data.entries);
  for (const entry of catalog.entries) {
    if (!/^content\/assets\/borg\/records\/[a-zA-Z0-9][-a-zA-Z0-9._]*\.json$/.test(entry.recordUrl) ||
        entry.recordUrl.includes("..")) {
      throw new TypeError("Borg catalog data recordUrl must be a canonical local record path.");
    }
  }
  return catalog;
}

// JSON.parse first establishes JSON grammar. The second pass rejects duplicate
// object keys (including escaped spellings) before their values can be hidden.
export function parseBorgAssemblyRecordCatalogData(text) {
  const data = JSON.parse(text);
  let at = 0;
  const space = () => { while (/\s/.test(text[at] ?? "") && at < text.length) at++; };
  function string() {
    const start = at++;
    while (at < text.length) {
      if (text[at] === "\\") at += 2;
      else if (text[at++] === '"') return JSON.parse(text.slice(start, at));
    }
    throw new SyntaxError("Unterminated catalog JSON string.");
  }
  function value(depth = 0) {
    if (depth > 16) throw new TypeError("Borg catalog JSON nesting is too deep.");
    space();
    if (text[at] === "{") {
      at++; space();
      const keys = new Set();
      if (text[at] === "}") { at++; return; }
      for (;;) {
        space();
        const key = string();
        if (keys.has(key)) throw new TypeError("Duplicate Borg catalog JSON key: " + key);
        keys.add(key); space(); at++; value(depth + 1); space();
        if (text[at++] === "}") return;
      }
    }
    if (text[at] === "[") {
      at++; space();
      if (text[at] === "]") { at++; return; }
      for (;;) { value(depth + 1); space(); if (text[at++] === "]") return; }
    }
    if (text[at] === '"') { string(); return; }
    while (at < text.length && !/[\s,}\]]/.test(text[at])) at++;
  }
  value();
  validateBorgAssemblyRecordCatalogData(data);
  return data;
}
