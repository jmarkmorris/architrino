import fs from "node:fs";
import path from "node:path";
import { effectiveFrwHandoffEvidenceStatusForPath } from "./effective-frw-handoff-evidence.mjs";
import { thetaWEffectiveMetricEvidenceStatusForPath } from "./effective-metric-theta-w-evidence.mjs";
import { outputProjectionEvidenceStatusForPath } from "../spacetime/noether-sea-density-compression-output-projection-evidence.mjs";

export const SHARED_OBSERVATION_EVIDENCE_SCHEMA =
  "aaa-equation-map-shared-observation-evidence/v1";

export const SHARED_OBSERVATION_ROWS = Object.freeze([
  "theta_obs",
  "theta_src",
  "theta_read",
  "theta_therm_prov",
  "theta_gal",
  "event_ledger",
  "frw_handoff",
  "thermal_provenance_ledger",
  "no_hidden_retune_witness",
]);

export const SHARED_OBSERVATION_PROJECTIONS = Object.freeze([
  "BBN",
  "CMB",
  "growth",
  "RAR",
]);

export const SHARED_OBSERVATION_KEYS = Object.freeze([
  "rho_NS",
  "n",
  "chi_sea",
  "Gamma_N",
  "u_sea",
  "M_sea_ab",
  "rho_bar",
  "rho_A",
  "eta",
  "N_eff",
  "Y_p",
  "H_eff",
  "a_eff",
]);

const SHARED_CONSTITUTIVE_SCHEMA =
  "aaa-equation-map-eq11-20-shared-constitutive-residual-input/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const DEFAULT_TOLERANCE = 1e-12;
const REJECTED_BASENAME_FRAGMENTS = Object.freeze([
  "attempt",
  "mock",
  "toy",
  "negative-control",
  "source-contract",
  "contract",
  "probe",
  "fixture",
  ".tmp",
]);

export function sharedObservationEvidenceStatusForPath(value, { repoRoot }) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(repoRoot, sourcePath);
  const pathReason = sharedObservationSourcePathRejectionReason(resolvedPath, repoRoot);
  if (pathReason) {
    return { accepted: false, reason: pathReason, resolvedPath };
  }
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  } catch (error) {
    return {
      accepted: false,
      reason: error.code === "ENOENT" ? "source_not_found" : "source_not_parseable_json",
      resolvedPath,
    };
  }
  const objectStatus = evaluateSharedObservationEvidenceObject(raw, {
    repoRoot,
    sourcePath: resolvedPath,
  });
  return {
    ...objectStatus,
    resolvedPath,
    reason: objectStatus.accepted ? "accepted" : objectStatus.reason,
  };
}

export function sharedObservationSourcePathRejectionReason(filePath, repoRoot) {
  const normalized = path.normalize(filePath);
  const tempRoot = path.normalize("/tmp");
  const privateTempRoot = path.normalize("/private/tmp");
  if (
    normalized.startsWith(`${tempRoot}${path.sep}`) ||
    normalized.startsWith(`${privateTempRoot}${path.sep}`)
  ) {
    return "temp_source_path";
  }
  const relative = path.relative(repoRoot, normalized);
  if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
    return "source_outside_repo";
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return "coordination_source_path";
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return "authored_prose_source_path";
  }
  if (relative.startsWith(`content${path.sep}generated${path.sep}`)) {
    return "generated_source_path";
  }
  if (relative.startsWith(`tests${path.sep}`)) {
    return "test_fixture_source_path";
  }
  const basename = path.basename(normalized).toLowerCase();
  const rejected = REJECTED_BASENAME_FRAGMENTS.find((fragment) =>
    basename.includes(fragment),
  );
  if (rejected) {
    return "control_or_attempt_source_path";
  }
  try {
    if (!fs.statSync(normalized).isFile()) {
      return "source_not_file";
    }
  } catch {
    return "source_not_found";
  }
  return null;
}

export function evaluateSharedObservationEvidenceObject(
  raw,
  { repoRoot, sourcePath } = {},
) {
  const missing = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      accepted: false,
      reason: "shared_observation_evidence_not_json_object",
      missingOrRejectedFields: ["shared_observation_evidence_object"],
    };
  }
  if (raw.schema !== SHARED_OBSERVATION_EVIDENCE_SCHEMA) {
    missing.push("shared_observation_evidence_schema");
  }
  const status = raw.evidenceStatus ?? raw.status ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    missing.push("shared_observation_evidence_status_accepted");
  }
  if (raw.authorization?.acceptedSharedObservation !== true) {
    missing.push("authorization.acceptedSharedObservation");
  }
  if (raw.authorization?.downstreamConsumerAuthorization !== true) {
    missing.push("authorization.downstreamConsumerAuthorization");
  }
  if ((raw.scoreDecision ?? raw.authorization?.scoreDecision) !== "no_score_increase") {
    missing.push("scoreDecision.no_score_increase");
  }

  const window = raw.window ?? {};
  for (const field of [
    "thetaObsId",
    "providerWindowId",
    "thetaWId",
    "thetaCosId",
    "commonCarrierId",
    "eventLedgerId",
  ]) {
    if (!concreteString(window[field] ?? raw[field])) {
      missing.push(`window.${field}`);
    }
  }

  const sharedPath = raw.sharedConstitutive?.path ?? raw.sharedConstitutivePath;
  const sharedConstitutive = sharedConstitutiveStatusForPath(sharedPath, { repoRoot });
  if (!sharedConstitutive.accepted) {
    missing.push(`sharedConstitutive.${sharedConstitutive.reason}`);
  }
  if (
    concreteString(sharedConstitutive.commonCarrierId) &&
    concreteString(window.providerWindowId) &&
    sharedConstitutive.commonCarrierId !== window.providerWindowId
  ) {
    missing.push("sharedConstitutive.providerWindowId_matches_window");
  }
  if (
    concreteString(sharedConstitutive.thetaCosId) &&
    concreteString(window.thetaCosId) &&
    sharedConstitutive.thetaCosId !== window.thetaCosId
  ) {
    missing.push("sharedConstitutive.thetaCosId_matches_window");
  }

  const thetaWPath = raw.thetaW?.path ?? raw.thetaWPath;
  const thetaW =
    repoRoot && thetaWPath
      ? thetaWEffectiveMetricEvidenceStatusForPath(thetaWPath, { repoRoot })
      : { accepted: false, reason: "missing_theta_w_path" };
  if (!thetaW.accepted) {
    missing.push(`thetaW.${thetaW.reason}`);
  }
  if (
    concreteString(thetaW.thetaWId) &&
    concreteString(window.thetaWId) &&
    thetaW.thetaWId !== window.thetaWId
  ) {
    missing.push("thetaW.thetaWId_matches_window");
  }
  if (
    concreteString(thetaW.providerWindowId) &&
    concreteString(window.providerWindowId) &&
    thetaW.providerWindowId !== window.providerWindowId
  ) {
    missing.push("thetaW.providerWindowId_matches_window");
  }

  const outputProjectionPath =
    raw.outputProjection?.path ?? raw.outputProjectionPath;
  const outputProjection =
    repoRoot && outputProjectionPath
      ? outputProjectionEvidenceStatusForPath(outputProjectionPath, { repoRoot })
      : { accepted: false, reason: "missing_output_projection_path" };
  if (!outputProjection.accepted) {
    missing.push(`outputProjection.${outputProjection.reason}`);
  }
  if (
    concreteString(outputProjection.commonCarrierId) &&
    concreteString(window.providerWindowId) &&
    outputProjection.commonCarrierId !== window.providerWindowId
  ) {
    missing.push("outputProjection.providerWindowId_matches_window");
  }

  const thetaCosPath = raw.thetaCos?.path ?? raw.thetaCosPath;
  const thetaCos =
    repoRoot && thetaCosPath
      ? effectiveFrwHandoffEvidenceStatusForPath(thetaCosPath, { repoRoot })
      : { accepted: false, reason: "missing_theta_cos_path" };
  if (!thetaCos.accepted) {
    missing.push(`thetaCos.${thetaCos.reason}`);
  }
  if (
    concreteString(thetaCos.thetaCosId) &&
    concreteString(window.thetaCosId) &&
    thetaCos.thetaCosId !== window.thetaCosId
  ) {
    missing.push("thetaCos.thetaCosId_matches_window");
  }

  const rows = raw.rows ?? {};
  for (const row of SHARED_OBSERVATION_ROWS) {
    requireAcceptedRow({
      row,
      value: rows[row],
      missing,
      carrierId: window.commonCarrierId,
      eventLedgerId: window.eventLedgerId,
    });
  }
  const projections = raw.projections ?? {};
  for (const family of SHARED_OBSERVATION_PROJECTIONS) {
    requireAcceptedRow({
      row: `projection.${family}`,
      value: projections[family],
      missing,
      carrierId: window.commonCarrierId,
      eventLedgerId: window.eventLedgerId,
    });
  }

  const sharedKeys = new Map(
    (Array.isArray(raw.sharedKeys) ? raw.sharedKeys : []).map((row) => [row.key, row]),
  );
  for (const key of SHARED_OBSERVATION_KEYS) {
    const row = sharedKeys.get(key);
    requireAcceptedSharedKey({ key, value: row, missing });
  }

  const numericResiduals = raw.numericResiduals ?? raw.residualComponents ?? {};
  for (const key of ["growth", "CMB", "BBN", "RAR_BTFR", "FRW_to_obs", "handoff", "therm_prov"]) {
    const residual = finiteNumberOrNull(numericResiduals[key]);
    if (residual === null || residual > 1) {
      missing.push(`numericResiduals.${key}.within_tolerance`);
    }
  }
  const retuneResidual = finiteNumberOrNull(numericResiduals.S_retune);
  if (retuneResidual === null || retuneResidual > DEFAULT_TOLERANCE) {
    missing.push("numericResiduals.S_retune.zero");
  }

  return {
    accepted: missing.length === 0,
    reason:
      missing.length === 0
        ? "accepted"
        : "shared_observation_evidence_fields_missing",
    evidenceStatus: status,
    missingOrRejectedFields: missing,
    commonCarrierId: window.commonCarrierId ?? null,
    providerWindowId: window.providerWindowId ?? null,
    thetaObsId: window.thetaObsId ?? null,
    thetaWId: window.thetaWId ?? null,
    thetaCosId: window.thetaCosId ?? null,
    sharedConstitutive,
    thetaW,
    outputProjection,
    thetaCos,
    sourcePath,
  };
}

function sharedConstitutiveStatusForPath(value, { repoRoot }) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const resolvedPath = path.isAbsolute(value)
    ? value
    : path.resolve(repoRoot, value.trim().replace(/#.*/, ""));
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  } catch (error) {
    return {
      accepted: false,
      reason: error.code === "ENOENT" ? "source_not_found" : "source_not_parseable_json",
      resolvedPath,
    };
  }
  const missing = [];
  if (raw.schema !== SHARED_CONSTITUTIVE_SCHEMA) {
    missing.push("shared_constitutive_schema");
  }
  const packet = raw.packet ?? {};
  const rows = packet.rows ?? {};
  for (const row of [
    "theta_11_20_weak_gravity",
    "eq20_pressure_effective_lambda",
    "theta_sea_rho_NS_provider",
    "delta_P_eff_pressure_projection",
    "theta_cos_handoff",
    "shared_coupling",
    "shared_no_hidden_retune_witness",
  ]) {
    if (!acceptedRow(rows[row])) {
      missing.push(`shared_constitutive.rows.${row}`);
    }
  }
  const providerKey = (packet.sharedKeys ?? []).find(
    (row) => row.key === "provider_window_id",
  );
  const thetaCosKey = (packet.sharedKeys ?? []).find(
    (row) => row.key === "theta_cos_id",
  );
  const retuneResidual = finiteNumberOrNull(
    packet.residualComponents?.noHiddenRetune?.residual,
  );
  if (!providerKey) {
    missing.push("shared_constitutive.provider_window_id_key");
  }
  if (!thetaCosKey) {
    missing.push("shared_constitutive.theta_cos_id_key");
  }
  if (retuneResidual === null || retuneResidual > DEFAULT_TOLERANCE) {
    missing.push("shared_constitutive.no_hidden_retune_zero");
  }
  return {
    accepted: missing.length === 0,
    reason: missing.length === 0 ? "accepted" : "shared_constitutive_fields_missing",
    missingOrRejectedFields: missing,
    commonCarrierId: firstConcreteProjectionValue(providerKey),
    thetaCosId: firstConcreteProjectionValue(thetaCosKey),
    resolvedPath,
  };
}

function requireAcceptedRow({ row, value, missing, carrierId, eventLedgerId }) {
  if (!acceptedRow(value)) {
    missing.push(`rows.${row}.accepted`);
    return;
  }
  if (!concreteString(value.rowId ?? value.id)) {
    missing.push(`rows.${row}.rowId`);
  }
  if (concreteString(carrierId) && value.carrierId !== carrierId) {
    missing.push(`rows.${row}.carrierId_matches_window`);
  }
  if (concreteString(eventLedgerId) && value.eventLedgerRef !== eventLedgerId) {
    missing.push(`rows.${row}.eventLedgerRef_matches_window`);
  }
}

function requireAcceptedSharedKey({ key, value, missing }) {
  if (!acceptedRow(value)) {
    missing.push(`sharedKeys.${key}.accepted`);
    return;
  }
  if (!value.projectionValues || typeof value.projectionValues !== "object") {
    missing.push(`sharedKeys.${key}.projectionValues`);
    return;
  }
  const values = Object.values(value.projectionValues)
    .map((entry) => finiteNumberOrNull(entry))
    .filter((entry) => entry !== null);
  if (values.length < 2) {
    return;
  }
  const maxDelta = values.reduce(
    (max, entry) => Math.max(max, Math.abs(entry - values[0])),
    0,
  );
  if (maxDelta > DEFAULT_TOLERANCE) {
    missing.push(`sharedKeys.${key}.hidden_retune_numeric_match`);
  }
}

function acceptedRow(value) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    ACCEPTED_STATUSES.has(value.status ?? value.retainedStatus ?? null)
  );
}

function firstConcreteProjectionValue(row) {
  const values = Object.values(row?.projectionValues ?? {});
  return values.find((value) => concreteString(value)) ?? null;
}

function finiteNumberOrNull(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function concreteString(value) {
  const text = typeof value === "string" ? value.trim() : "";
  const lowerText = text.toLowerCase();
  return (
    text !== "" &&
    text !== "..." &&
    !text.includes("<") &&
    !lowerText.includes("todo") &&
    !lowerText.includes("pending") &&
    !lowerText.includes("placeholder")
  );
}
