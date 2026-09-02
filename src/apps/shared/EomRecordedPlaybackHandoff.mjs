import {
  EOM_EVOLUTION_CONTRACT_ID,
  EOM_HISTORY_DEFAULT_ENGINE_ID,
} from "./EomHistoryDataset.mjs";

export const EOM_RECORDED_PLAYBACK_HANDOFF_SCHEMA = "eom-recorded-playback-handoff.v1";
export const EOM_RECORDED_PLAYBACK_MODEL_BINDING_ID = "master_eom_binding/v1";
export const EOM_RECORDED_PLAYBACK_ACCEPTED_EVIDENCE_STATUSES = Object.freeze([
  "canonical",
  "conditional",
  "reference",
  "display-only",
  "executable_architecture_evidence",
]);

const SHA256 = /^[a-f0-9]{64}$/;

function requireConcreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${label} must be a concrete string.`);
  }
  return value;
}

function canonicalJson(value, path = "record") {
  if (value === null) return "null";
  if (typeof value === "string" || typeof value === "boolean") return JSON.stringify(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError(`${path} must not contain non-finite numbers.`);
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((entry, index) => canonicalJson(entry, `${path}[${index}]`)).join(",")}]`;
  }
  if (!value || typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError(`${path} must contain JSON objects, arrays, and scalar values only.`);
  }
  const rows = Object.keys(value).sort().map((key) => {
    if (value[key] === undefined) throw new TypeError(`${path}.${key} must not be undefined.`);
    return `${JSON.stringify(key)}:${canonicalJson(value[key], `${path}.${key}`)}`;
  });
  return `{${rows.join(",")}}`;
}

export async function sha256CanonicalJson(value, cryptoLike = globalThis.crypto) {
  if (typeof cryptoLike?.subtle?.digest !== "function") {
    throw new Error("Recorded EOM playback requires Web Crypto SHA-256 support.");
  }
  const digest = await cryptoLike.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(canonicalJson(value)),
  );
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function readRecordIdentity(record = {}) {
  const provenance = record.provenance && typeof record.provenance === "object"
    ? record.provenance
    : {};
  return Object.freeze({
    contractId: record.contractId,
    modelBindingId: record.modelBindingId,
    engineId: provenance.engineId,
    engineVersion: provenance.engineVersion,
    runId: provenance.runId ?? record.runId,
    claimGrade: provenance.claimGrade ?? record.claimGrade ?? record.claimLevel,
    evidenceStatus: provenance.evidenceStatus ?? record.evidenceStatus,
    status: record.status,
  });
}

function validateAcceptedRecordIdentity(identity) {
  if (identity.contractId !== EOM_EVOLUTION_CONTRACT_ID) {
    throw new TypeError(
      `Recorded EOM playback requires contractId ${EOM_EVOLUTION_CONTRACT_ID}; received ${String(identity.contractId ?? "none")}.`,
    );
  }
  if (identity.modelBindingId !== EOM_RECORDED_PLAYBACK_MODEL_BINDING_ID) {
    throw new TypeError(
      `Recorded EOM playback requires modelBindingId ${EOM_RECORDED_PLAYBACK_MODEL_BINDING_ID}; received ${String(identity.modelBindingId ?? "none")}.`,
    );
  }
  if (identity.engineId !== EOM_HISTORY_DEFAULT_ENGINE_ID) {
    throw new TypeError(
      `Recorded EOM playback requires engineId ${EOM_HISTORY_DEFAULT_ENGINE_ID}; received ${String(identity.engineId ?? "none")}.`,
    );
  }
  requireConcreteString(identity.engineVersion, "Recorded EOM playback engineVersion");
  requireConcreteString(identity.runId, "Recorded EOM playback runId");
  requireConcreteString(identity.claimGrade, "Recorded EOM playback claimGrade");
  if (identity.claimGrade === "failed") {
    throw new TypeError("Recorded EOM playback rejects failed claim grade output.");
  }
  if (!EOM_RECORDED_PLAYBACK_ACCEPTED_EVIDENCE_STATUSES.includes(identity.evidenceStatus)) {
    throw new TypeError(
      `Recorded EOM playback evidenceStatus must be one of ${EOM_RECORDED_PLAYBACK_ACCEPTED_EVIDENCE_STATUSES.join("|")}; received ${String(identity.evidenceStatus ?? "none")}.`,
    );
  }
  if (identity.status !== "completed") {
    throw new TypeError(
      `Recorded EOM playback requires a completed accepted record; received status ${String(identity.status ?? "none")}.`,
    );
  }
  return identity;
}

export async function createEomRecordedPlaybackHandoff(record, options = {}) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new TypeError("Recorded EOM playback handoff requires an EOM record object.");
  }
  const identity = validateAcceptedRecordIdentity(readRecordIdentity(record));
  const recordSha256 = await sha256CanonicalJson(record, options.cryptoLike);
  return Object.freeze({
    schema: EOM_RECORDED_PLAYBACK_HANDOFF_SCHEMA,
    recordSha256,
    identity,
    record,
  });
}

export async function validateEomRecordedPlaybackHandoff(handoff, options = {}) {
  if (!handoff || typeof handoff !== "object" || Array.isArray(handoff)) {
    throw new TypeError("Animator requires a recorded EOM playback handoff object.");
  }
  if (handoff.schema !== EOM_RECORDED_PLAYBACK_HANDOFF_SCHEMA) {
    throw new TypeError(
      `Animator requires handoff schema ${EOM_RECORDED_PLAYBACK_HANDOFF_SCHEMA}; received ${String(handoff.schema ?? "none")}.`,
    );
  }
  if (!SHA256.test(handoff.recordSha256 ?? "")) {
    throw new TypeError("Recorded EOM playback handoff requires a lowercase SHA-256 record pin.");
  }
  if (!handoff.record || typeof handoff.record !== "object" || Array.isArray(handoff.record)) {
    throw new TypeError("Recorded EOM playback handoff requires its pinned record.");
  }
  const actualRecordSha256 = await sha256CanonicalJson(handoff.record, options.cryptoLike);
  if (actualRecordSha256 !== handoff.recordSha256) {
    throw new Error("Recorded EOM playback handoff is stale or altered; its record SHA-256 does not match.");
  }
  const actualIdentity = validateAcceptedRecordIdentity(readRecordIdentity(handoff.record));
  const declaredIdentity = handoff.identity && typeof handoff.identity === "object"
    ? handoff.identity
    : null;
  if (!declaredIdentity || canonicalJson(declaredIdentity, "handoff.identity") !== canonicalJson(actualIdentity, "record.identity")) {
    throw new Error("Recorded EOM playback handoff identity does not match the pinned record.");
  }
  return Object.freeze({
    schema: EOM_RECORDED_PLAYBACK_HANDOFF_SCHEMA,
    recordSha256: handoff.recordSha256,
    identity: actualIdentity,
    record: handoff.record,
  });
}
