import fs from "node:fs";
import path from "node:path";
import {
  ACCEPTED_STATUSES,
  providerEvidenceStatusForPath,
} from "../spacetime/noether-sea-density-compression-provider-evidence.mjs";

export const PRESSURE_PROJECTION_SCHEMA =
  "aaa-equation-map-eq20-delta-p-eff-pressure-projection-report/v1";

export const EQ20_DELTA_P_EFF_REPORT_ROWS = Object.freeze([
  "pressure_law_row",
  "sea_pressure_row",
  "sea_tension_row",
  "relaxation_memory_row",
  "effective_density_row",
  "effective_pressure_row",
  "effective_coupling_row",
  "effective_lambda_row",
  "frw_handoff",
  "source_provenance",
  "no_hidden_retune_witness",
]);

const EXPECTED_SHARED_KEYS = Object.freeze([
  "theta_11_20_id",
  "theta_cos_id",
  "rho_NS",
  "n",
  "chi_sea",
  "Gamma_N",
  "u_sea",
  "M_sea_ab",
  "G_eff",
  "rho_DE_eff",
  "p_sea",
  "p_DE_eff",
  "w_eff",
  "Lambda_eff",
  "tau_rel",
]);

const REQUIRED_SOURCE_KINDS = Object.freeze([
  "accepted_density_provider",
  "outer_binary_strain",
  "release_channel_availability",
  "sea_tension_projection",
  "pressure_projection",
  "effective_lambda_projection",
  "no_hidden_retune",
  "inherited_theta_cos_handoff",
]);

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

const DEFAULT_TOLERANCE = 1e-12;

export function pressureProjectionEvidenceStatusForPath(value, { repoRoot }) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(repoRoot, sourcePath);
  const pathReason = pressureProjectionSourcePathRejectionReason(resolvedPath, repoRoot);
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
  const objectStatus = evaluateEq20DeltaPEffPressureProjectionReportObject(raw, {
    repoRoot,
    sourcePath: resolvedPath,
  });
  return {
    ...objectStatus,
    resolvedPath,
    reason: objectStatus.accepted ? "accepted" : objectStatus.reason,
  };
}

export function pressureProjectionSourcePathRejectionReason(filePath, repoRoot) {
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
  const lowerBasename = path.basename(normalized).toLowerCase();
  const rejectedFragment = REJECTED_BASENAME_FRAGMENTS.find((fragment) =>
    lowerBasename.includes(fragment),
  );
  if (rejectedFragment) {
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

export function evaluateEq20DeltaPEffPressureProjectionReportObject(
  raw,
  { repoRoot, sourcePath } = {},
) {
  const missing = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      accepted: false,
      reason: "pressure_projection_report_not_json_object",
      missingOrRejectedFields: ["report_object"],
    };
  }
  if (raw.schema !== PRESSURE_PROJECTION_SCHEMA) {
    missing.push("report_schema");
  }
  const status = raw.reportStatus ?? raw.status ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    missing.push("report_status_accepted");
  }
  if (raw.authorization?.acceptedPressureProjection !== true) {
    missing.push("authorization.acceptedPressureProjection");
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
    actual: window.windowId ?? raw.sameWindowIdentity?.pressureWindowId,
    prefix: "same_window",
  });
  requireSameField({
    missing,
    field: "ell",
    expected: providerWindow.ell,
    actual: window.ell,
    prefix: "same_window",
  });
  requireSameField({
    missing,
    field: "eventLedgerId",
    expected: providerWindow.eventLedgerId,
    actual: window.eventLedgerId,
    prefix: "same_window",
  });
  const commonCarrierId = window.commonCarrierId ?? raw.sameWindowIdentity?.commonCarrierId;
  if (!concreteString(commonCarrierId)) {
    missing.push("window.commonCarrierId");
  }
  if (
    concreteString(providerWindow.windowId) &&
    concreteString(commonCarrierId) &&
    commonCarrierId !== providerWindow.windowId
  ) {
    missing.push("window.commonCarrierId_matches_provider_window");
  }
  if (raw.sameWindowIdentity?.sameWindow !== true) {
    missing.push("sameWindowIdentity.sameWindow");
  }
  const surfaceSlicePath = raw.provider?.surfaceSlicePath ?? raw.surfaceSlicePath;
  if (!sourceReferenceExists(surfaceSlicePath, repoRoot)) {
    missing.push("provider.surfaceSlicePath");
  }

  const rows = raw.rows ?? raw.pressureRows ?? {};
  for (const row of EQ20_DELTA_P_EFF_REPORT_ROWS) {
    requireAcceptedRow({
      row,
      value: rows[row],
      missing,
      carrierId: commonCarrierId,
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
    outerBinaryStrain: outerBinaryStrainResidual(raw.outerBinaryStrain ?? {}),
    releaseChannelAvailability: releaseChannelResidual(
      raw.releaseChannelAvailability ?? {},
    ),
    pressureProjection: pressureProjectionResidual(raw.pressureProjection ?? {}),
    pressureLaw: pressureLawResidual(raw.pressureLaw ?? {}),
    equationOfState: equationOfStateResidual(raw.equationOfState ?? {}),
    lambdaProjection: lambdaProjectionResidual(raw.lambdaProjection ?? {}),
    surfaceVector: surfaceVectorResidual(raw.surfaceVector ?? {}, raw.pressureProjection ?? {}),
    frwHandoff: frwHandoffResidual(raw.frwHandoff ?? {}),
  };
  for (const [key, residual] of Object.entries(numericResiduals)) {
    if (residual === null || residual > DEFAULT_TOLERANCE) {
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
  if (raw.frwHandoff?.inheritedBlocker !== "missing_accepted_theta_cos") {
    missing.push("frwHandoff.inherited_theta_cos_blocker");
  }
  if (sourcePath && raw.sourcePath) {
    const relativeSourcePath = path.relative(repoRoot, sourcePath);
    if (raw.sourcePath !== relativeSourcePath) {
      missing.push("sourcePath.self_reference");
    }
  }

  return {
    accepted: missing.length === 0,
    reason: missing.length === 0 ? "accepted" : "pressure_projection_report_fields_missing",
    reportStatus: status,
    missingOrRejectedFields: missing,
    providerEvidence,
    commonCarrierId,
    windowId: window.windowId ?? null,
    eventLedgerId: window.eventLedgerId ?? null,
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
  const rowId = value.rowId ?? value.id ?? null;
  if (!concreteString(rowId)) {
    missing.push(`rows.${row}.row_reference`);
  }
  if (concreteString(carrierId) && value.carrierId !== carrierId) {
    missing.push(`rows.${row}.same_carrier`);
  }
  if (concreteString(eventLedgerId) && value.eventLedgerRef !== eventLedgerId) {
    missing.push(`rows.${row}.same_event_ledger`);
  }
}

function evaluateSharedKeys(rawKeys, tolerance) {
  const keyRows = new Map(
    (Array.isArray(rawKeys) ? rawKeys : []).map((row) => [row.key, row]),
  );
  const missingSharedKeys = [];
  const mismatches = [];
  for (const key of EXPECTED_SHARED_KEYS) {
    const row = keyRows.get(key);
    if (!acceptedRow(row)) {
      missingSharedKeys.push(key);
      continue;
    }
    const comparison = compareProjectionValues(row.projectionValues ?? {}, tolerance);
    if (comparison.mismatch) {
      mismatches.push({ key, maxDelta: comparison.maxDelta });
    }
  }
  return {
    accepted: missingSharedKeys.length === 0 && mismatches.length === 0,
    missingSharedKeys,
    mismatches,
  };
}

function compareProjectionValues(projectionValues, tolerance) {
  const values = Object.values(projectionValues)
    .map((value) => finiteNumberOrNull(value))
    .filter((value) => value !== null);
  if (values.length < 2) {
    return { mismatch: false, maxDelta: 0 };
  }
  let maxDelta = 0;
  for (let index = 0; index < values.length; index += 1) {
    for (let other = index + 1; other < values.length; other += 1) {
      maxDelta = Math.max(maxDelta, Math.abs(values[index] - values[other]));
    }
  }
  return {
    mismatch: maxDelta > tolerance,
    maxDelta,
  };
}

function outerBinaryStrainResidual(raw) {
  const ROuter = positiveNumberOrNull(raw.R_outer);
  const REq = positiveNumberOrNull(raw.R_eq);
  const epsilonO = finiteNumberOrNull(raw.epsilon_O);
  const rhoNS = positiveNumberOrNull(raw.rho_NS);
  const KO = positiveNumberOrNull(raw.K_O);
  const uOStr = finiteNumberOrNull(raw.u_O_str);
  if ([ROuter, REq, epsilonO, rhoNS, KO, uOStr].some((value) => value === null)) {
    return null;
  }
  const strainResidual = Math.abs(epsilonO - (ROuter - REq) / REq);
  const energyResidual = Math.abs(uOStr - rhoNS * 0.5 * KO * REq ** 2 * epsilonO ** 2);
  return Math.max(strainResidual, energyResidual);
}

function releaseChannelResidual(raw) {
  const ADown = nonnegativeNumberOrNull(raw.A_down);
  const Gamma = nonnegativeNumberOrNull(raw.Gamma);
  const muSource = finiteNumberOrNull(raw.mu_source);
  const muAcceptor = finiteNumberOrNull(raw.mu_acceptor);
  const JEO = finiteNumberOrNull(raw.J_E_O);
  const noCurrentResidual = finiteNumberOrNull(raw.noCurrentResidual);
  if ([ADown, Gamma, muSource, muAcceptor, JEO, noCurrentResidual].some((value) => value === null)) {
    return null;
  }
  const currentResidual = Math.abs(JEO - Gamma * ADown * (muSource - muAcceptor));
  return Math.max(currentResidual, Math.abs(noCurrentResidual));
}

function pressureProjectionResidual(raw) {
  const hTraceTension = finiteNumberOrNull(raw.hTraceTension);
  const pKin = finiteNumberOrNull(raw.p_kin ?? 0);
  const pSrc = finiteNumberOrNull(raw.p_src ?? 0);
  const pSea = finiteNumberOrNull(raw.p_sea);
  const piDE = finiteNumberOrNull(raw.Pi_DE ?? 1);
  const pDEEff = finiteNumberOrNull(raw.p_DE_eff);
  if ([hTraceTension, pKin, pSrc, pSea, piDE, pDEEff].some((value) => value === null)) {
    return null;
  }
  const seaResidual = Math.abs(pSea - (-hTraceTension / 3 + pKin + pSrc));
  const effectiveResidual = Math.abs(pDEEff - piDE * pSea);
  return Math.max(seaResidual, effectiveResidual);
}

function pressureLawResidual(raw) {
  const pSeaProjected = finiteNumberOrNull(raw.pSeaProjected);
  const pDEEff = finiteNumberOrNull(raw.p_DE_eff);
  if (pSeaProjected === null || pDEEff === null) {
    return null;
  }
  return Math.abs(pDEEff - pSeaProjected);
}

function equationOfStateResidual(raw) {
  const pDEEff = finiteNumberOrNull(raw.p_DE_eff);
  const rhoDEEff = positiveNumberOrNull(raw.rho_DE_eff);
  const wEff = finiteNumberOrNull(raw.w_eff);
  const wBench = finiteNumberOrNull(raw.wBench);
  if ([pDEEff, rhoDEEff, wEff, wBench].some((value) => value === null)) {
    return null;
  }
  return Math.max(Math.abs(wEff - pDEEff / rhoDEEff), Math.abs(wEff - wBench));
}

function lambdaProjectionResidual(raw) {
  const LambdaEff = finiteNumberOrNull(raw.Lambda_eff);
  const GEff = finiteNumberOrNull(raw.G_eff);
  const rhoDEEff = finiteNumberOrNull(raw.rho_DE_eff);
  if ([LambdaEff, GEff, rhoDEEff].some((value) => value === null)) {
    return null;
  }
  return Math.abs(LambdaEff - 8 * Math.PI * GEff * rhoDEEff);
}

function surfaceVectorResidual(raw, pressureProjection) {
  const deltaPEff = finiteNumberOrNull(raw.delta_P_eff);
  const pDEEff = finiteNumberOrNull(pressureProjection.p_DE_eff);
  if (deltaPEff === null || pDEEff === null) {
    return null;
  }
  return Math.abs(deltaPEff - pDEEff);
}

function frwHandoffResidual(raw) {
  const residuals = [
    raw.P_eff_residual,
    raw.G_eff_residual,
    raw.Lambda_eff_residual,
    raw.residual,
  ]
    .map((value) => finiteNumberOrNull(value))
    .filter((value) => value !== null);
  if (residuals.length === 0) {
    return null;
  }
  return Math.max(...residuals.map(Math.abs));
}

function evaluateSourceProvenance(raw) {
  const missing = [];
  if (!acceptedRow(raw)) {
    missing.push("sourceProvenance.accepted");
  }
  const residual = finiteNumberOrNull(raw.residual ?? raw.maxResidual);
  if (residual !== 0) {
    missing.push("sourceProvenance.zero_residual");
  }
  const rows = Array.isArray(raw.rows) ? raw.rows : [];
  const kinds = new Set(rows.map((row) => row.kind));
  for (const kind of REQUIRED_SOURCE_KINDS) {
    if (!kinds.has(kind)) {
      missing.push(`sourceProvenance.${kind}`);
    }
  }
  return {
    accepted: missing.length === 0,
    missingOrRejectedFields: missing,
  };
}

function evaluateNoHiddenRetune(raw) {
  const missing = [];
  if (!acceptedRow(raw)) {
    missing.push("noHiddenRetune.accepted");
  }
  if (finiteNumberOrNull(raw.residual ?? raw.maxResidual) !== 0) {
    missing.push("noHiddenRetune.zero_residual");
  }
  if (!Array.isArray(raw.changedRows) || raw.changedRows.length !== 0) {
    missing.push("noHiddenRetune.changedRows_empty");
  }
  return {
    accepted: missing.length === 0,
    missingOrRejectedFields: missing,
  };
}

function acceptedRow(value) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    ACCEPTED_STATUSES.has(value.status)
  );
}

function requireSameField({ missing, field, expected, actual, prefix }) {
  if (!concreteString(expected) || !concreteString(actual)) {
    missing.push(`${prefix}.${field}`);
    return;
  }
  if (actual !== expected) {
    missing.push(`${prefix}.${field}_matches_provider`);
  }
}

function readJsonReference(value, repoRoot) {
  if (!concreteString(value) || !repoRoot) {
    return null;
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(repoRoot, sourcePath);
  try {
    return JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  } catch {
    return null;
  }
}

function sourceReferenceExists(value, repoRoot) {
  if (!concreteString(value) || !repoRoot) {
    return false;
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(repoRoot, sourcePath);
  try {
    return fs.statSync(resolvedPath).isFile();
  } catch {
    return false;
  }
}

function positiveNumberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function nonnegativeNumberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
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
