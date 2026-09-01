export const LIBRARY_VARIANT_DESCRIPTOR_VERSION = "borg-variant-set.v1";

const VARIANT_SET_DEFINITIONS = Object.freeze({
  "equal-radius-planar-three-binary-balance-row.v1": Object.freeze({
    label: "Equal-radius planar three-binary circular balance",
    parameterLabels: Object.freeze(["β_f", "R/R_*"]),
  }),
});

const SHA256 = /^[a-f0-9]{64}$/;
const DECIMAL = /^(?:0|[1-9]\d*)(?:\.\d+)?$/;

export function describeLibraryVariantSet(coordinates) {
  const row = coordinates?.geometry?.balanceParameters;
  const definition = VARIANT_SET_DEFINITIONS[row?.schema];
  if (!definition) return null;
  const order = Number(row.betaDecimal);
  if (!SHA256.test(row.sourceSha256 ?? "") ||
      !DECIMAL.test(row.betaDecimal ?? "") ||
      !DECIMAL.test(row.radiusDecimal ?? "") || !Number.isFinite(order)) {
    throw new TypeError(`Invalid ${row.schema} variant-set source parameters.`);
  }
  return Object.freeze({
    id: `variant-set:${row.schema}:${row.sourceSha256}`,
    label: definition.label,
    descriptorVersion: LIBRARY_VARIANT_DESCRIPTOR_VERSION,
    parameterLabels: [...definition.parameterLabels],
    parameters: Object.freeze({ betaF: row.betaDecimal, radiusRatio: row.radiusDecimal }),
    order,
    reason: `Source-declared ${row.schema} rows from one exact source ledger vary β_f and R/R_* while retaining separate exact assembly identities.`,
  });
}

export function isLibraryVariantSetId(value) {
  if (typeof value !== "string") return false;
  const match = /^variant-set:([a-z0-9.-]+):([a-f0-9]{64})$/.exec(value);
  return Boolean(match && VARIANT_SET_DEFINITIONS[match[1]]);
}

export function libraryVariantSetLabel(value) {
  if (!isLibraryVariantSetId(value)) return "Unknown variant set";
  return VARIANT_SET_DEFINITIONS[value.split(":")[1]].label;
}
