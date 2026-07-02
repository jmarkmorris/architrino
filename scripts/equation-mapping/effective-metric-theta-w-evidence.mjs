import fs from "node:fs";
import path from "node:path";
import { theta1120WeakGravityEvidenceStatusForPath } from "./eq11-theta-11-20-weak-gravity-evidence.mjs";
import { outputProjectionEvidenceStatusForPath } from "../spacetime/noether-sea-density-compression-output-projection-evidence.mjs";

export const EFFECTIVE_METRIC_THETA_W_SCHEMA =
  "aaa-equation-map-effective-metric-theta-w-evidence/v1";

export const EFFECTIVE_METRIC_THETA_W_ROWS = Object.freeze([
  "theta_W",
  "noether_sea_cell",
  "constitutive_response",
  "metric_projection",
  "lapse_row",
  "drift_row",
  "spatial_compliance_row",
  "signal_delay_row",
  "cadence_row",
  "weak_clock_row",
  "redshift_row",
  "shapiro_row",
  "lensing_row",
  "acceleration_row",
  "ppn_decision_row",
  "null_eikonal_row",
  "geodesic_action_row",
  "source_provenance",
  "no_hidden_retune_witness",
]);

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

export function thetaWEffectiveMetricEvidenceStatusForPath(value, { repoRoot }) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(repoRoot, sourcePath);
  const pathReason = thetaWSourcePathRejectionReason(resolvedPath, repoRoot);
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
  const objectStatus = evaluateThetaWEffectiveMetricEvidenceObject(raw, {
    repoRoot,
    sourcePath: resolvedPath,
  });
  return {
    ...objectStatus,
    resolvedPath,
    reason: objectStatus.accepted ? "accepted" : objectStatus.reason,
  };
}

export function thetaWSourcePathRejectionReason(filePath, repoRoot) {
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

export function evaluateThetaWEffectiveMetricEvidenceObject(
  raw,
  { repoRoot, sourcePath } = {},
) {
  const missing = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      accepted: false,
      reason: "theta_w_evidence_not_json_object",
      missingOrRejectedFields: ["theta_w_evidence_object"],
    };
  }
  if (raw.schema !== EFFECTIVE_METRIC_THETA_W_SCHEMA) {
    missing.push("theta_w_evidence_schema");
  }
  const status = raw.evidenceStatus ?? raw.status ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    missing.push("theta_w_evidence_status_accepted");
  }
  if (raw.authorization?.acceptedThetaW !== true) {
    missing.push("authorization.acceptedThetaW");
  }
  if (raw.authorization?.downstreamConsumerAuthorization !== true) {
    missing.push("authorization.downstreamConsumerAuthorization");
  }
  if ((raw.scoreDecision ?? raw.authorization?.scoreDecision) !== "no_score_increase") {
    missing.push("scoreDecision.no_score_increase");
  }

  const window = raw.window ?? {};
  for (const field of [
    "thetaWId",
    "providerWindowId",
    "commonCarrierId",
    "windowId",
    "ell",
    "eventLedgerId",
    "theta1120Id",
    "thetaCosId",
  ]) {
    if (!concreteString(window[field] ?? raw[field])) {
      missing.push(`window.${field}`);
    }
  }
  if (
    concreteString(window.thetaWId) &&
    concreteString(window.commonCarrierId) &&
    window.thetaWId !== window.commonCarrierId
  ) {
    missing.push("window.thetaWId_matches_commonCarrierId");
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
  if (
    concreteString(outputProjection.thetaWId) &&
    concreteString(window.thetaWId) &&
    outputProjection.thetaWId !== window.thetaWId
  ) {
    missing.push("outputProjection.thetaWId_matches_window");
  }

  const theta1120Path = raw.theta1120WeakGravity?.path ?? raw.theta1120Path;
  const theta1120 =
    repoRoot && theta1120Path
      ? theta1120WeakGravityEvidenceStatusForPath(theta1120Path, { repoRoot })
      : { accepted: false, reason: "missing_theta_11_20_path" };
  if (!theta1120.accepted) {
    missing.push(`theta1120WeakGravity.${theta1120.reason}`);
  }
  if (
    concreteString(theta1120.commonCarrierId) &&
    concreteString(window.providerWindowId) &&
    theta1120.commonCarrierId !== window.providerWindowId
  ) {
    missing.push("theta1120WeakGravity.providerWindowId_matches_window");
  }
  if (
    concreteString(theta1120.thetaCosId) &&
    concreteString(window.thetaCosId) &&
    theta1120.thetaCosId !== window.thetaCosId
  ) {
    missing.push("theta1120WeakGravity.thetaCosId_matches_window");
  }

  const rows = raw.rows ?? {};
  for (const row of EFFECTIVE_METRIC_THETA_W_ROWS) {
    requireAcceptedRow({
      row,
      value: rows[row],
      missing,
      carrierId: window.commonCarrierId,
      eventLedgerId: window.eventLedgerId,
    });
  }

  const sharedKeys = evaluateSharedKeys(raw.sharedKeys ?? [], DEFAULT_TOLERANCE);
  missing.push(...sharedKeys.missingSharedKeys.map((key) => `sharedKeys.${key}.accepted`));
  missing.push(...sharedKeys.mismatches.map((key) => `sharedKeys.${key}.projection_values_match`));

  const numericResiduals = raw.numericResiduals ?? {};
  for (const key of [
    "staticResponse",
    "weakClock",
    "observables",
    "ppn",
    "sourceProvenance",
    "noHiddenRetune",
  ]) {
    const residual = scalarResidual(numericResiduals[key]);
    const tolerance = key === "ppn" ? 1 : DEFAULT_TOLERANCE;
    if (residual === null || residual > tolerance) {
      missing.push(`${key}.numeric_residual_within_tolerance`);
    }
  }
  if (sourcePath && raw.sourcePath) {
    const relativeSourcePath = path.relative(repoRoot, sourcePath);
    if (raw.sourcePath !== relativeSourcePath) {
      missing.push("sourcePath.self_reference");
    }
  }

  return {
    accepted: missing.length === 0,
    reason: missing.length === 0 ? "accepted" : "theta_w_evidence_fields_missing",
    evidenceStatus: status,
    missingOrRejectedFields: missing,
    thetaWId: window.thetaWId ?? null,
    commonCarrierId: window.commonCarrierId ?? null,
    providerWindowId: window.providerWindowId ?? null,
    thetaCosId: window.thetaCosId ?? null,
    outputProjection,
    theta1120,
  };
}

function requireAcceptedRow({ row, value, missing, carrierId, eventLedgerId }) {
  if (!acceptedRow(value)) {
    missing.push(`rows.${row}.accepted`);
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return;
  }
  if (!concreteString(value.rowId ?? value.id)) {
    missing.push(`rows.${row}.rowId`);
  }
  if (value.carrierId !== carrierId) {
    missing.push(`rows.${row}.carrierId_matches_window`);
  }
  if (value.eventLedgerRef !== eventLedgerId && value.eventLedgerId !== eventLedgerId) {
    missing.push(`rows.${row}.eventLedgerRef_matches_window`);
  }
}

function acceptedRow(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      ACCEPTED_STATUSES.has(value.status),
  );
}

function evaluateSharedKeys(rows, tolerance) {
  const missingSharedKeys = [];
  const mismatches = [];
  for (const row of Array.isArray(rows) ? rows : []) {
    if (!acceptedRow(row)) {
      missingSharedKeys.push(row?.key ?? "unknown");
      continue;
    }
    const values = Array.isArray(row.values)
      ? row.values
      : Object.values(row.projectionValues ?? {});
    if (values.length === 0) {
      missingSharedKeys.push(row.key ?? "unknown");
      continue;
    }
    const first = values[0];
    if (values.some((value) => comparableResidual(value, first) > tolerance)) {
      mismatches.push(row.key ?? "unknown");
    }
  }
  return { missingSharedKeys, mismatches };
}

function comparableResidual(value, expected) {
  if (typeof value === "number" && typeof expected === "number") {
    return Math.abs(value - expected);
  }
  return value === expected ? 0 : Number.POSITIVE_INFINITY;
}

function scalarResidual(value) {
  if (value === undefined || value === null) {
    return null;
  }
  if (typeof value === "number") {
    return Math.abs(value);
  }
  const number = Number(value.residual ?? value.maxResidual ?? value.value);
  return Number.isFinite(number) ? Math.abs(number) : null;
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
