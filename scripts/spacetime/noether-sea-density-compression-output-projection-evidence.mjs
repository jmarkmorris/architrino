import fs from "node:fs";
import path from "node:path";
import { providerEvidenceStatusForPath } from "./noether-sea-density-compression-provider-evidence.mjs";
import { theta1120WeakGravityEvidenceStatusForPath } from "../equation-mapping/eq11-theta-11-20-weak-gravity-evidence.mjs";
import { pressureProjectionEvidenceStatusForPath } from "../equation-mapping/eq20-delta-p-eff-pressure-projection-evidence.mjs";
import { effectiveFrwHandoffEvidenceStatusForPath } from "../equation-mapping/effective-frw-handoff-evidence.mjs";

export const OUTPUT_PROJECTION_SCHEMA =
  "aaa-noether-sea-density-compression-output-projection-evidence/v1";

export const OUTPUT_PROJECTION_ROWS = Object.freeze([
  "delta_N",
  "delta_gamma_ij",
  "delta_G_eff",
  "delta_a_star",
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

export function outputProjectionEvidenceStatusForPath(value, { repoRoot }) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(repoRoot, sourcePath);
  const pathReason = outputProjectionSourcePathRejectionReason(resolvedPath, repoRoot);
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
  const objectStatus = evaluateOutputProjectionEvidenceObject(raw, {
    repoRoot,
    sourcePath: resolvedPath,
  });
  return {
    ...objectStatus,
    resolvedPath,
    reason: objectStatus.accepted ? "accepted" : objectStatus.reason,
  };
}

export function outputProjectionSourcePathRejectionReason(filePath, repoRoot) {
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

export function evaluateOutputProjectionEvidenceObject(
  raw,
  { repoRoot, sourcePath } = {},
) {
  const missing = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      accepted: false,
      reason: "output_projection_not_json_object",
      missingOrRejectedFields: ["output_projection_object"],
    };
  }
  if (raw.schema !== OUTPUT_PROJECTION_SCHEMA) {
    missing.push("output_projection_schema");
  }
  const status = raw.evidenceStatus ?? raw.status ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    missing.push("output_projection_status_accepted");
  }
  if (raw.authorization?.acceptedOutputProjection !== true) {
    missing.push("authorization.acceptedOutputProjection");
  }
  if (raw.authorization?.downstreamConsumerAuthorization !== true) {
    missing.push("authorization.downstreamConsumerAuthorization");
  }
  if ((raw.scoreDecision ?? raw.authorization?.scoreDecision) !== "no_score_increase") {
    missing.push("scoreDecision.no_score_increase");
  }

  const providerPath = raw.provider?.path ?? raw.providerPath;
  const providerEvidence =
    repoRoot && providerPath
      ? providerEvidenceStatusForPath(providerPath, { repoRoot })
      : { accepted: false, reason: "missing_provider_path" };
  if (!providerEvidence.accepted) {
    missing.push(`provider.${providerEvidence.reason}`);
  }
  const providerRaw =
    repoRoot && providerPath ? readJsonReference(providerPath, repoRoot) : null;
  const providerWindow = providerRaw?.window ?? {};
  const window = raw.window ?? {};
  requireSameField({
    missing,
    field: "windowId",
    expected: providerWindow.windowId,
    actual: window.windowId,
    prefix: "provider_window",
  });
  requireSameField({
    missing,
    field: "ell",
    expected: providerWindow.ell,
    actual: window.ell,
    prefix: "provider_window",
  });
  requireSameField({
    missing,
    field: "eventLedgerId",
    expected: providerWindow.eventLedgerId,
    actual: window.eventLedgerId,
    prefix: "provider_window",
  });
  if (
    concreteString(providerWindow.windowId) &&
    concreteString(window.commonCarrierId) &&
    providerWindow.windowId !== window.commonCarrierId
  ) {
    missing.push("window.commonCarrierId_matches_provider_window");
  }

  const sharedPath = raw.sharedConstitutive?.path ?? raw.sharedConstitutivePath;
  const sharedEvidence = evaluateSharedConstitutiveReference(sharedPath, repoRoot);
  if (!sharedEvidence.accepted) {
    missing.push(`sharedConstitutive.${sharedEvidence.reason}`);
  }
  if (
    concreteString(sharedEvidence.commonCarrierId) &&
    concreteString(window.commonCarrierId) &&
    sharedEvidence.commonCarrierId !== window.commonCarrierId
  ) {
    missing.push("sharedConstitutive.commonCarrierId_matches_window");
  }
  if (
    concreteString(sharedEvidence.thetaCosId) &&
    concreteString(window.thetaCosId) &&
    sharedEvidence.thetaCosId !== window.thetaCosId
  ) {
    missing.push("sharedConstitutive.thetaCosId_matches_window");
  }

  const rows = raw.rows ?? {};
  for (const row of OUTPUT_PROJECTION_ROWS) {
    requireAcceptedOutputRow({
      row,
      value: rows[row],
      missing,
      carrierId: window.commonCarrierId,
      eventLedgerId: window.eventLedgerId,
    });
  }

  const surfaceVector = raw.surfaceVector ?? {};
  for (const row of OUTPUT_PROJECTION_ROWS) {
    if (!hasProjectedOutput(surfaceVector[row])) {
      missing.push(`surfaceVector.${row}.projected`);
    }
  }
  const retuneResidual = scalarResidual(raw.noHiddenRetune ?? raw.retuneWitness ?? {});
  if (retuneResidual === null || retuneResidual > DEFAULT_TOLERANCE) {
    missing.push("noHiddenRetune.numeric_residual_within_tolerance");
  }
  if (sourcePath && raw.sourcePath) {
    const relativeSourcePath = path.relative(repoRoot, sourcePath);
    if (raw.sourcePath !== relativeSourcePath) {
      missing.push("sourcePath.self_reference");
    }
  }

  return {
    accepted: missing.length === 0,
    reason: missing.length === 0 ? "accepted" : "output_projection_fields_missing",
    evidenceStatus: status,
    missingOrRejectedFields: missing,
    commonCarrierId: window.commonCarrierId ?? null,
    windowId: window.windowId ?? null,
    thetaWId: window.thetaWId ?? null,
    thetaCosId: window.thetaCosId ?? null,
    sharedEvidence,
    providerEvidence,
    outputRows: Object.keys(rows),
  };
}

function evaluateSharedConstitutiveReference(value, repoRoot) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const resolvedPath = path.isAbsolute(value.trim())
    ? value.trim()
    : path.resolve(repoRoot, value.trim().replace(/#.*/, ""));
  const pathReason = outputProjectionSourcePathRejectionReason(resolvedPath, repoRoot);
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
  const missing = [];
  if (raw.schema !== SHARED_CONSTITUTIVE_SCHEMA) {
    missing.push("shared_constitutive_schema");
  }
  const evidenceSources = raw.packet?.evidenceSources ?? {};
  const theta1120 = theta1120WeakGravityEvidenceStatusForPath(
    evidenceSources.theta1120WeakGravityPath,
    { repoRoot },
  );
  if (!theta1120.accepted) {
    missing.push(`theta1120.${theta1120.reason}`);
  }
  const provider = providerEvidenceStatusForPath(evidenceSources.providerPath, { repoRoot });
  if (!provider.accepted) {
    missing.push(`provider.${provider.reason}`);
  }
  const pressure = pressureProjectionEvidenceStatusForPath(
    evidenceSources.deltaPEffReportPath,
    { repoRoot },
  );
  if (!pressure.accepted) {
    missing.push(`pressure.${pressure.reason}`);
  }
  const thetaCos = effectiveFrwHandoffEvidenceStatusForPath(
    evidenceSources.thetaCosHandoffPath,
    { repoRoot },
  );
  if (!thetaCos.accepted) {
    missing.push(`thetaCos.${thetaCos.reason}`);
  }
  const eq20SlicePath = evidenceSources.eq20PressureEffectiveLambdaSlicePath;
  if (!sourceReferenceExists(eq20SlicePath, repoRoot)) {
    missing.push("eq20PressureEffectiveLambdaSlicePath");
  }
  const rows = raw.packet?.rows ?? {};
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
      missing.push(`rows.${row}.accepted`);
    }
  }
  const sharedKeys = evaluateSharedKeys(raw.packet?.sharedKeys ?? []);
  missing.push(...sharedKeys.missingSharedKeys.map((key) => `sharedKeys.${key}.accepted`));
  missing.push(...sharedKeys.mismatches.map((key) => `sharedKeys.${key}.projection_values_match`));
  const residual = raw.packet?.residualComponents ?? {};
  if (maxResidual(residual.identity) > DEFAULT_TOLERANCE) {
    missing.push("identity.residual");
  }
  if (couplingResidual(residual.coupling) > DEFAULT_TOLERANCE) {
    missing.push("coupling.residual");
  }
  if (pressureLambdaResidual(residual.pressureLambda) > DEFAULT_TOLERANCE) {
    missing.push("pressureLambda.residual");
  }
  if (scalarResidual(residual.noHiddenRetune) > DEFAULT_TOLERANCE) {
    missing.push("noHiddenRetune.residual");
  }
  return {
    accepted: missing.length === 0,
    reason: missing.length === 0 ? "accepted" : "shared_constitutive_fields_missing",
    missingOrRejectedFields: missing,
    commonCarrierId: sharedKeyValue(raw.packet?.sharedKeys, "provider_window_id"),
    thetaCosId: sharedKeyValue(raw.packet?.sharedKeys, "theta_cos_id"),
    theta1120Id: sharedKeyValue(raw.packet?.sharedKeys, "theta_11_20_id"),
    resolvedPath,
  };
}

function requireAcceptedOutputRow({ row, value, missing, carrierId, eventLedgerId }) {
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
  if (!hasProjectedOutput(value.value)) {
    missing.push(`rows.${row}.value_projected`);
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

function evaluateSharedKeys(rows) {
  const missingSharedKeys = [];
  const mismatches = [];
  for (const row of Array.isArray(rows) ? rows : []) {
    if (!acceptedRow(row)) {
      missingSharedKeys.push(row?.key ?? "unknown");
      continue;
    }
    const values = Object.values(row.projectionValues ?? {});
    if (values.length === 0) {
      missingSharedKeys.push(row.key ?? "unknown");
      continue;
    }
    const first = values[0];
    if (values.some((value) => comparableResidual(value, first) > DEFAULT_TOLERANCE)) {
      mismatches.push(row.key ?? "unknown");
    }
  }
  return { missingSharedKeys, mismatches };
}

function sharedKeyValue(rows, key) {
  const row = (Array.isArray(rows) ? rows : []).find((entry) => entry.key === key);
  const values = Object.values(row?.projectionValues ?? {});
  return values[0] ?? null;
}

function comparableResidual(value, expected) {
  if (typeof value === "number" && typeof expected === "number") {
    return Math.abs(value - expected);
  }
  return value === expected ? 0 : Number.POSITIVE_INFINITY;
}

function maxResidual(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return Number.POSITIVE_INFINITY;
  }
  const values = Object.values(raw).map((value) => Number(value));
  return values.length > 0 && values.every(Number.isFinite)
    ? Math.max(...values.map(Math.abs))
    : Number.POSITIVE_INFINITY;
}

function couplingResidual(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return Number.POSITIVE_INFINITY;
  }
  const values = [raw.G_eff_weak, raw.G_eff_pressure, raw.G_eff_frw].map(Number);
  return values.every(Number.isFinite)
    ? Math.max(Math.abs(values[0] - values[1]), Math.abs(values[0] - values[2]))
    : Number.POSITIVE_INFINITY;
}

function pressureLambdaResidual(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return Number.POSITIVE_INFINITY;
  }
  const values = [
    Math.abs(Number(raw.p_DE_eff_weak) - Number(raw.p_DE_eff_pressure)),
    Math.abs(Number(raw.Lambda_eff_weak) - Number(raw.Lambda_eff_pressure)),
  ];
  return values.every(Number.isFinite) ? Math.max(...values) : Number.POSITIVE_INFINITY;
}

function scalarResidual(raw) {
  if (raw === undefined || raw === null) {
    return null;
  }
  if (typeof raw === "number") {
    return Math.abs(raw);
  }
  const value = Number(raw.maxResidual ?? raw.residual);
  return Number.isFinite(value) ? Math.abs(value) : null;
}

function requireSameField({ missing, field, expected, actual, prefix }) {
  if (!concreteString(expected) || !concreteString(actual)) {
    missing.push(`${prefix}.${field}`);
  } else if (expected !== actual) {
    missing.push(`${prefix}.${field}_matches`);
  }
}

function hasProjectedOutput(value) {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === "number") {
    return Number.isFinite(value);
  }
  if (Array.isArray(value)) {
    return value.some((entry) => hasProjectedOutput(entry));
  }
  if (typeof value === "object") {
    return Object.values(value).some((entry) => hasProjectedOutput(entry));
  }
  return false;
}

function readJsonReference(value, repoRoot) {
  if (!concreteString(value)) {
    return null;
  }
  const resolvedPath = path.isAbsolute(value.trim())
    ? value.trim()
    : path.resolve(repoRoot, value.trim().replace(/#.*/, ""));
  try {
    return JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  } catch {
    return null;
  }
}

function sourceReferenceExists(value, repoRoot) {
  if (!concreteString(value)) {
    return false;
  }
  const resolvedPath = path.isAbsolute(value.trim())
    ? value.trim()
    : path.resolve(repoRoot, value.trim().replace(/#.*/, ""));
  try {
    return fs.statSync(resolvedPath).isFile();
  } catch {
    return false;
  }
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
