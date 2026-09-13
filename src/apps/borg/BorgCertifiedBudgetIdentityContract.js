export const BORG_CERTIFIED_BUDGET_IDENTITIES_SCHEMA = "borg-certified-budget-identities/v1";
const PRESET_IDS = Object.freeze(["interactive-certified-v1", "research-certified-v1"]);

function exactFields(value, fields, label) {
  if (!value || typeof value !== "object" || Array.isArray(value) ||
      Object.keys(value).length !== fields.length || fields.some((key) => !Object.hasOwn(value, key))) {
    throw new TypeError(`Borg budget identities ${label} requires exactly ${fields.join(", ")}.`);
  }
}

export function validateBorgCertifiedBudgetIdentities(data) {
  exactFields(data, ["schema", "presets"], "document");
  if (data.schema !== BORG_CERTIFIED_BUDGET_IDENTITIES_SCHEMA) throw new TypeError("Invalid Borg budget identities schema.");
  exactFields(data.presets, PRESET_IDS, "presets");
  const presets = {};
  for (const id of PRESET_IDS) {
    const row = data.presets[id];
    exactFields(row, ["allocationCanonicalJson", "allocationHash"], id);
    if (typeof row.allocationCanonicalJson !== "string" || typeof row.allocationHash !== "string" || row.allocationHash.length !== 64 ||
        !/^[0-9a-f]{64}$/.test(row.allocationHash)) {
      throw new TypeError("Borg budget identity requires canonical allocation JSON and a SHA-256 value.");
    }
    const allocations = parseUniqueJson(row.allocationCanonicalJson);
    if (!allocations || allocations.schema !== "borg_certified_budget/v1" || allocations.presetId !== id ||
        canonicalStringify(allocations) !== row.allocationCanonicalJson) {
      throw new TypeError("Borg budget identity applicability must be canonical and match its preset id.");
    }
    presets[id] = Object.freeze({ ...row });
  }
  return Object.freeze({ schema: data.schema, presets: Object.freeze(presets) });
}

export function selectBorgCertifiedBudgetIdentity(data, presetId, allocationCanonicalJson) {
  const validated = validateBorgCertifiedBudgetIdentities(data);
  if (!Object.hasOwn(validated.presets, presetId)) throw new RangeError("Missing Borg budget identity selection.");
  const row = validated.presets[presetId];
  if (row.allocationCanonicalJson !== allocationCanonicalJson) {
    throw new TypeError("Borg budget identity applicability differs from the current allocations.");
  }
  return row;
}

export function parseBorgCertifiedBudgetIdentities(text) {
  return validateBorgCertifiedBudgetIdentities(parseUniqueJson(text));
}

// First validate JSON grammar; then reject duplicate keys before accepting the
// parsed values. Escaped spellings of the same key are duplicates too.
function parseUniqueJson(text) {
  const data = JSON.parse(text);
  let at = 0;
  const space = () => { while (at < text.length && /\s/.test(text[at])) at++; };
  function string() {
    const start = at++;
    while (at < text.length) {
      if (text[at] === "\\") at += 2;
      else if (text[at++] === '"') return JSON.parse(text.slice(start, at));
    }
    throw new SyntaxError("Unterminated budget JSON string.");
  }
  function value(depth = 0) {
    if (depth > 32) throw new TypeError("Budget JSON nesting is too deep.");
    space();
    if (text[at] === "{") {
      at++; space();
      const keys = new Set();
      if (text[at] === "}") { at++; return; }
      for (;;) {
        space(); const key = string();
        if (keys.has(key)) throw new TypeError("Duplicate budget JSON key: " + key);
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
  return data;
}

export function canonicalStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(canonicalStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) =>
      `${JSON.stringify(key)}:${canonicalStringify(value[key])}`
    ).join(",")}}`;
  }
  return JSON.stringify(value);
}
