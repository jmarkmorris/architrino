import fs from "node:fs";
import path from "node:path";
import { providerEvidenceStatusForPath } from "../spacetime/noether-sea-density-compression-provider-evidence.mjs";
import { pressureProjectionEvidenceStatusForPath } from "./eq20-delta-p-eff-pressure-projection-evidence.mjs";
import { effectiveFrwHandoffEvidenceStatusForPath } from "./effective-frw-handoff-evidence.mjs";

export const THETA_11_20_WEAK_GRAVITY_SCHEMA =
  "aaa-equation-map-eq11-theta-11-20-weak-gravity-evidence/v1";

export const EQ11_THETA_11_20_ROWS = Object.freeze([
  "theta_11_20",
  "theta_sea",
  "theta_src",
  "constitutive_response",
  "source_branch_ledger",
  "wake_ledger",
  "mass_loading_row",
  "metric_projection",
  "effective_coupling_row",
  "poisson_handoff_row",
  "sea_stress_pressure_source_row",
  "curvature_readout_row",
  "stress_energy_readout_row",
  "effective_coupling_continuity_row",
  "ppn_metric_handoff",
  "source_provenance",
  "no_hidden_retune_witness",
]);

const EXPECTED_SHARED_KEYS = Object.freeze([
  "theta_11_20_id",
  "theta_W_id",
  "theta_cos_id",
  "rho_NS",
  "n",
  "chi_sea",
  "Gamma_N",
  "u_sea",
  "M_sea_ab",
  "G_eff",
  "p_DE_eff",
  "Lambda_eff",
  "tau_rel",
]);

const REQUIRED_SOURCE_KINDS = Object.freeze([
  "accepted_density_provider",
  "retained_delta_P_eff_pressure_projection",
  "accepted_theta_cos_handoff",
  "weak_gravity_metric_projection",
  "source_branch_ledger",
  "wake_ledger",
  "source_loading_record",
  "no_hidden_retune",
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

export function theta1120WeakGravityEvidenceStatusForPath(value, { repoRoot }) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(repoRoot, sourcePath);
  const pathReason = theta1120SourcePathRejectionReason(resolvedPath, repoRoot);
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
  const objectStatus = evaluateTheta1120WeakGravityEvidenceObject(raw, {
    repoRoot,
    sourcePath: resolvedPath,
  });
  return {
    ...objectStatus,
    resolvedPath,
    reason: objectStatus.accepted ? "accepted" : objectStatus.reason,
  };
}

export function theta1120SourcePathRejectionReason(filePath, repoRoot) {
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

export function evaluateTheta1120WeakGravityEvidenceObject(
  raw,
  { repoRoot, sourcePath } = {},
) {
  const missing = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      accepted: false,
      reason: "theta_11_20_weak_gravity_evidence_not_json_object",
      missingOrRejectedFields: ["evidence_object"],
    };
  }
  if (raw.schema !== THETA_11_20_WEAK_GRAVITY_SCHEMA) {
    missing.push("evidence_schema");
  }
  const status = raw.evidenceStatus ?? raw.status ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    missing.push("evidence_status_accepted");
  }
  if (raw.authorization?.acceptedTheta1120WeakGravity !== true) {
    missing.push("authorization.acceptedTheta1120WeakGravity");
  }
  if (raw.authorization?.downstreamConsumerAuthorization !== true) {
    missing.push("authorization.downstreamConsumerAuthorization");
  }
  if ((raw.scoreDecision ?? raw.authorization?.scoreDecision) !== "no_score_increase") {
    missing.push("scoreDecision.no_score_increase");
  }

  const window = raw.window ?? {};
  for (const field of [
    "theta1120Id",
    "commonCarrierId",
    "windowId",
    "ell",
    "eventLedgerId",
    "noetherSeaRecordId",
    "sourceLoadingRecordId",
    "thetaCosId",
  ]) {
    if (!concreteString(window[field] ?? raw[field])) {
      missing.push(`window.${field}`);
    }
  }

  const providerPath = raw.provider?.path ?? raw.providerPath;
  const providerEvidence =
    repoRoot && providerPath
      ? providerEvidenceStatusForPath(providerPath, { repoRoot })
      : { accepted: false, reason: "missing_provider_path" };
  if (!providerEvidence.accepted) {
    missing.push(`provider.${providerEvidence.reason}`);
  }
  const providerRaw = repoRoot && providerPath ? readJsonReference(providerPath, repoRoot) : null;
  const providerWindow = providerRaw?.window ?? {};
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
    window.commonCarrierId !== providerWindow.windowId
  ) {
    missing.push("window.commonCarrierId_matches_provider_window");
  }
  if (!sourceReferenceExists(raw.provider?.surfaceSlicePath ?? raw.surfaceSlicePath, repoRoot)) {
    missing.push("provider.surfaceSlicePath");
  }

  const pressurePath = raw.pressureProjection?.path ?? raw.deltaPEffReportPath;
  const pressureEvidence =
    repoRoot && pressurePath
      ? pressureProjectionEvidenceStatusForPath(pressurePath, { repoRoot })
      : { accepted: false, reason: "missing_pressure_projection_path" };
  if (!pressureEvidence.accepted) {
    missing.push(`pressureProjection.${pressureEvidence.reason}`);
  }
  if (
    concreteString(pressureEvidence.commonCarrierId) &&
    concreteString(window.commonCarrierId) &&
    pressureEvidence.commonCarrierId !== window.commonCarrierId
  ) {
    missing.push("pressureProjection.commonCarrierId_matches_window");
  }

  const thetaCosPath = raw.thetaCosHandoff?.path ?? raw.thetaCosHandoffPath;
  const thetaCosEvidence =
    repoRoot && thetaCosPath
      ? effectiveFrwHandoffEvidenceStatusForPath(thetaCosPath, { repoRoot })
      : { accepted: false, reason: "missing_theta_cos_handoff_path" };
  if (!thetaCosEvidence.accepted) {
    missing.push(`thetaCosHandoff.${thetaCosEvidence.reason}`);
  }
  if (
    concreteString(thetaCosEvidence.thetaCosId) &&
    concreteString(window.thetaCosId) &&
    thetaCosEvidence.thetaCosId !== window.thetaCosId
  ) {
    missing.push("thetaCosHandoff.thetaCosId_matches_window");
  }

  const rows = raw.rows ?? {};
  for (const row of EQ11_THETA_11_20_ROWS) {
    requireAcceptedRow({
      row,
      value: rows[row],
      missing,
      carrierId: window.commonCarrierId,
      eventLedgerId: window.eventLedgerId,
    });
  }

  const sharedKeys = evaluateSharedKeys(raw.sharedKeys ?? [], DEFAULT_TOLERANCE);
  for (const key of sharedKeys.missingSharedKeys) {
    missing.push(`sharedKeys.${key}.accepted`);
  }
  for (const mismatch of sharedKeys.mismatches) {
    missing.push(`sharedKeys.${mismatch.key}.projection_values_match`);
  }

  const numericResiduals = {
    poisson: poissonResidual(raw.weakGravity?.poisson ?? {}),
    curvature: curvatureResidual(raw.weakGravity?.curvature ?? {}, raw.weakGravity?.constants ?? {}),
    couplingContinuity: couplingContinuityResidual(raw.weakGravity?.couplingContinuity ?? {}),
    ppnHandoff: ppnResidual(raw.weakGravity?.ppnHandoff ?? {}),
    sourceProvenance: scalarResidual(raw.weakGravity?.sourceProvenance ?? raw.sourceProvenance ?? {}),
    noHiddenRetune: scalarResidual(raw.weakGravity?.noHiddenRetune ?? raw.noHiddenRetune ?? {}),
  };
  for (const [key, residual] of Object.entries(numericResiduals)) {
    const tolerance = key === "ppnHandoff" ? 1 : DEFAULT_TOLERANCE;
    if (residual === null || residual > tolerance) {
      missing.push(`${key}.numeric_residual_within_tolerance`);
    }
  }

  const provenance = evaluateSourceProvenance(raw.sourceProvenance ?? {});
  if (!provenance.accepted) {
    missing.push(...provenance.missingOrRejectedFields);
  }
  const retune = evaluateNoHiddenRetune(raw.noHiddenRetune ?? raw.retuneWitness ?? {});
  if (!retune.accepted) {
    missing.push(...retune.missingOrRejectedFields);
  }
  if (sourcePath && raw.sourcePath) {
    const relativeSourcePath = path.relative(repoRoot, sourcePath);
    if (raw.sourcePath !== relativeSourcePath) {
      missing.push("sourcePath.self_reference");
    }
  }

  return {
    accepted: missing.length === 0,
    reason: missing.length === 0 ? "accepted" : "theta_11_20_weak_gravity_fields_missing",
    evidenceStatus: status,
    missingOrRejectedFields: missing,
    commonCarrierId: window.commonCarrierId ?? null,
    theta1120Id: window.theta1120Id ?? null,
    thetaCosId: window.thetaCosId ?? null,
    windowId: window.windowId ?? null,
    eventLedgerId: window.eventLedgerId ?? null,
    providerEvidence,
    pressureEvidence,
    thetaCosEvidence,
    numericResiduals,
    sharedKeys,
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
  if (value.eventLedgerId !== eventLedgerId) {
    missing.push(`rows.${row}.eventLedgerId_matches_window`);
  }
}

function evaluateSharedKeys(rawKeys, tolerance) {
  const keyRows = new Map(
    (Array.isArray(rawKeys) ? rawKeys : []).map((row) => [row.key, row]),
  );
  const keys = Object.fromEntries(
    EXPECTED_SHARED_KEYS.map((key) => {
      const row = keyRows.get(key);
      const accepted = acceptedRow(row);
      const comparison = compareProjectionValues(row?.projectionValues ?? {}, tolerance);
      return [
        key,
        {
          status: row?.status ?? null,
          accepted,
          sourcePath: row?.sourcePath ?? row?.source ?? null,
          values: row?.projectionValues ?? {},
          mismatch: comparison.mismatch,
          maxDelta: comparison.maxDelta,
        },
      ];
    }),
  );
  const missingSharedKeys = EXPECTED_SHARED_KEYS.filter((key) => !keys[key].accepted);
  const mismatches = Object.entries(keys)
    .filter(([, value]) => value.mismatch)
    .map(([key, value]) => ({ key, maxDelta: value.maxDelta }));
  return {
    accepted: missingSharedKeys.length === 0,
    missingSharedKeys,
    mismatches,
    keys,
  };
}

function compareProjectionValues(projectionValues, tolerance) {
  const values = Object.values(projectionValues);
  if (values.length === 0) {
    return { mismatch: false, maxDelta: 0 };
  }
  const first = values[0];
  let maxDelta = 0;
  for (const value of values.slice(1)) {
    const delta = comparableResidual(value, first);
    maxDelta = Math.max(maxDelta, Math.abs(delta));
  }
  return {
    mismatch: maxDelta > tolerance,
    maxDelta,
  };
}

function poissonResidual(raw) {
  const laplacian = finiteNumberOrNull(raw.laplacian_phi_eff);
  const gEff = finiteNumberOrNull(raw.G_eff);
  const rhoSrc = finiteNumberOrNull(raw.rho_src_eff);
  const seaSource = finiteNumberOrNull(raw.sea_source_phi) ?? 0;
  if (laplacian === null || gEff === null || rhoSrc === null) {
    return finiteNumberOrNull(raw.residual);
  }
  return Math.abs(laplacian - (4 * Math.PI * gEff * rhoSrc + seaSource));
}

function curvatureResidual(raw, constants) {
  const gTensor = finiteArrayOrNull(raw.G_tensor);
  const metricTensor = finiteArrayOrNull(raw.metric_tensor);
  const tEff = finiteArrayOrNull(raw.T_eff);
  const gEff = finiteNumberOrNull(raw.G_eff);
  if (
    gTensor === null ||
    metricTensor === null ||
    tEff === null ||
    gEff === null ||
    gTensor.length !== metricTensor.length ||
    gTensor.length !== tEff.length
  ) {
    return finiteNumberOrNull(raw.maxAbsResidual ?? raw.residual);
  }
  const c0 = finiteNumberOrNull(constants.c0) ?? 1;
  const lambdaEff = finiteNumberOrNull(raw.lambda_eff) ?? 0;
  const rhsScale = (8 * Math.PI * gEff) / c0 ** 4;
  return Math.max(
    ...gTensor.map((component, index) =>
      Math.abs(component + lambdaEff * metricTensor[index] - rhsScale * tEff[index]),
    ),
  );
}

function couplingContinuityResidual(raw) {
  const projection = finiteNumberOrNull(raw.projection);
  const rows = Array.isArray(raw.rows) ? raw.rows : [];
  if (projection === null || rows.length === 0) {
    return finiteNumberOrNull(raw.maxAbsNormalized ?? raw.residual);
  }
  const residuals = rows.map((row) => {
    const gEff = finiteNumberOrNull(row.G_eff);
    const sigma = finiteNumberOrNull(row.sigma);
    return gEff === null || sigma === null || sigma <= 0
      ? Infinity
      : Math.abs((gEff - projection) / sigma);
  });
  const provenanceResidual = finiteNumberOrNull(raw.provenanceResidual) ?? 0;
  return Math.max(...residuals, Math.abs(provenanceResidual));
}

function ppnResidual(raw) {
  const bounds = raw.bounds ?? {};
  const entries = {
    gamma_PPN_minus_1: (finiteNumberOrNull(raw.gamma_PPN) ?? Infinity) - 1,
    beta_PPN_minus_1: (finiteNumberOrNull(raw.beta_PPN) ?? Infinity) - 1,
    alpha1: finiteNumberOrNull(raw.alpha1) ?? 0,
    alpha2: finiteNumberOrNull(raw.alpha2) ?? 0,
    alpha3: finiteNumberOrNull(raw.alpha3) ?? 0,
  };
  const normalized = Object.entries(entries).map(([key, value]) => {
    const bound = finiteNumberOrNull(bounds[key]);
    return bound === null || bound <= 0 ? Infinity : Math.abs(value / bound);
  });
  return Math.max(...normalized);
}

function scalarResidual(raw) {
  return finiteNumberOrNull(raw.residual ?? raw.maxResidual);
}

function evaluateSourceProvenance(raw) {
  const rows = Array.isArray(raw.rows) ? raw.rows : [];
  const kinds = new Set(rows.map((row) => row.kind).filter(concreteString));
  const missing = [];
  for (const kind of REQUIRED_SOURCE_KINDS) {
    if (!kinds.has(kind)) {
      missing.push(`sourceProvenance.${kind}`);
    }
  }
  if (finiteNumberOrNull(raw.residual ?? raw.maxResidual) !== 0) {
    missing.push("sourceProvenance.residual_zero");
  }
  return {
    accepted: missing.length === 0,
    missingOrRejectedFields: missing,
  };
}

function evaluateNoHiddenRetune(raw) {
  const residual = finiteNumberOrNull(raw.residual ?? raw.maxResidual);
  return {
    accepted: residual !== null && residual <= DEFAULT_TOLERANCE,
    missingOrRejectedFields:
      residual !== null && residual <= DEFAULT_TOLERANCE ? [] : ["noHiddenRetune.residual"],
  };
}

function acceptedRow(row) {
  return Boolean(
    row &&
      typeof row === "object" &&
      !Array.isArray(row) &&
      ACCEPTED_STATUSES.has(row.status ?? row.retainedStatus),
  );
}

function sourceReferenceExists(value, repoRoot) {
  if (!concreteString(value)) {
    return false;
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolved = path.isAbsolute(sourcePath) ? sourcePath : path.resolve(repoRoot, sourcePath);
  try {
    return fs.statSync(resolved).isFile();
  } catch {
    return false;
  }
}

function readJsonReference(value, repoRoot) {
  if (!concreteString(value)) {
    return null;
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolved = path.isAbsolute(sourcePath) ? sourcePath : path.resolve(repoRoot, sourcePath);
  try {
    return JSON.parse(fs.readFileSync(resolved, "utf8"));
  } catch {
    return null;
  }
}

function requireSameField({ missing, field, expected, actual, prefix }) {
  if (!concreteString(expected) || !concreteString(actual) || expected !== actual) {
    missing.push(`${prefix}.${field}`);
  }
}

function finiteNumberOrNull(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function finiteArrayOrNull(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }
  const values = value.map(finiteNumberOrNull);
  return values.some((entry) => entry === null) ? null : values;
}

function comparableResidual(value, expected) {
  if (typeof value === "number" && typeof expected === "number") {
    return value - expected;
  }
  return JSON.stringify(value) === JSON.stringify(expected) ? 0 : Infinity;
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
