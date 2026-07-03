import fs from "node:fs";
import path from "node:path";
import { pressureProjectionEvidenceStatusForPath } from "./eq20-delta-p-eff-pressure-projection-evidence.mjs";

export const EFFECTIVE_FRW_HANDOFF_SCHEMA =
  "aaa-equation-map-effective-frw-theta-cos-handoff-evidence/v1";

export const EFFECTIVE_FRW_HANDOFF_ROWS = Object.freeze([
  "theta_cos",
  "cosmology_carrier",
  "noether_sea_window",
  "assembly_provenance_record",
  "metric_projection",
  "redshift_transfer_handoff",
  "pi_frw",
  "theta_read",
  "scale_factor_row",
  "hubble_row",
  "effective_density_row",
  "effective_pressure_row",
  "effective_coupling_row",
  "effective_lambda_row",
  "curvature_row",
  "source_term_row",
  "friedmann_residual",
  "continuity_residual",
  "source_provenance",
  "no_hidden_retune_witness",
]);

export const EFFECTIVE_FRW_SHARED_KEYS = Object.freeze([
  "theta_cos_id",
  "a_eff",
  "H_eff",
  "rho_eff",
  "P_eff",
  "G_eff",
  "Lambda_eff",
  "k",
  "S_eff",
]);

const REQUIRED_SOURCE_KINDS = Object.freeze([
  "theta_cos_homogeneous_window",
  "effective_frw_projection",
  "friedmann_residual",
  "continuity_residual",
  "fixed_void_witness",
  "delta_P_eff_pressure_projection",
  "no_hidden_retune",
]);

const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const DEFAULT_TOLERANCE = 1e-12;

export function effectiveFrwHandoffEvidenceStatusForPath(value, { repoRoot }) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(repoRoot, sourcePath);
  const pathReason = effectiveFrwHandoffSourcePathRejectionReason(resolvedPath, repoRoot);
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
  const objectStatus = evaluateEffectiveFrwHandoffEvidenceObject(raw, {
    repoRoot,
    sourcePath: resolvedPath,
  });
  return {
    ...objectStatus,
    resolvedPath,
    reason: objectStatus.accepted ? "accepted" : objectStatus.reason,
  };
}

export function effectiveFrwHandoffSourcePathRejectionReason(filePath, repoRoot) {
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
  if (
    basename.includes("attempt") ||
    basename.includes("mock") ||
    basename.includes("toy") ||
    basename.includes("probe") ||
    basename.includes("negative-control") ||
    basename.includes("source-contract") ||
    basename.includes("contract") ||
    basename.includes(".tmp")
  ) {
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

export function evaluateEffectiveFrwHandoffEvidenceObject(
  raw,
  { repoRoot, sourcePath } = {},
) {
  const missing = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      accepted: false,
      reason: "effective_frw_handoff_not_json_object",
      missingOrRejectedFields: ["handoff_object"],
    };
  }
  if (raw.schema !== EFFECTIVE_FRW_HANDOFF_SCHEMA) {
    missing.push("handoff_schema");
  }
  const status = raw.handoffStatus ?? raw.status ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    missing.push("handoff_status_accepted");
  }
  if (raw.authorization?.acceptedThetaCosHandoff !== true) {
    missing.push("authorization.acceptedThetaCosHandoff");
  }
  if (raw.authorization?.downstreamConsumerAuthorization !== true) {
    missing.push("authorization.downstreamConsumerAuthorization");
  }
  if ((raw.scoreDecision ?? raw.authorization?.scoreDecision) !== "no_score_increase") {
    missing.push("scoreDecision.no_score_increase");
  }

  const window = raw.window ?? {};
  const commonCarrierId = window.commonCarrierId ?? raw.commonCarrierId;
  const eventLedgerId = window.eventLedgerId ?? raw.eventLedgerId;
  const thetaCosId = window.thetaCosId ?? raw.thetaCosId;
  for (const field of ["windowId", "thetaCosId", "commonCarrierId", "eventLedgerId"]) {
    if (!concreteString(window[field] ?? raw[field])) {
      missing.push(`window.${field}`);
    }
  }
  if (
    concreteString(thetaCosId) &&
    concreteString(commonCarrierId) &&
    thetaCosId !== commonCarrierId
  ) {
    missing.push("window.thetaCosId_matches_commonCarrierId");
  }

  const rows = raw.rows ?? {};
  for (const row of EFFECTIVE_FRW_HANDOFF_ROWS) {
    requireAcceptedRow({
      row,
      value: rows[row],
      missing,
      carrierId: commonCarrierId,
      eventLedgerId,
    });
  }

  const sharedKeys = evaluateSharedKeys(raw.sharedKeys ?? [], DEFAULT_TOLERANCE);
  for (const key of sharedKeys.missingSharedKeys) {
    missing.push(`sharedKeys.${key}.accepted`);
  }
  for (const mismatch of sharedKeys.mismatches) {
    missing.push(`sharedKeys.${mismatch.key}.projection_values_match`);
  }

  const constants = raw.constants ?? {};
  const c0 = positiveNumberOrNull(constants.c0) ?? 1;
  const numericResiduals = {
    frwProjection: frwProjectionResidual(raw.frwProjection ?? {}),
    friedmann: friedmannResidual(raw.friedmann ?? {}, c0),
    continuity: continuityResidual(raw.continuity ?? {}, c0),
    fixedVoid: fixedVoidResidual(raw.fixedVoid ?? {}),
    pressureHandoff: pressureHandoffResidual(raw.pressureHandoff ?? {}, repoRoot),
  };
  for (const [key, residual] of Object.entries(numericResiduals)) {
    if (residual === null || residual > DEFAULT_TOLERANCE) {
      missing.push(`${key}.numeric_residual_within_tolerance`);
    }
  }

  const pressureHandoff = evaluatePressureHandoff(raw.pressureHandoff ?? {}, repoRoot);
  if (!pressureHandoff.accepted) {
    missing.push(...pressureHandoff.missingOrRejectedFields);
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
    reason: missing.length === 0 ? "accepted" : "effective_frw_handoff_fields_missing",
    handoffStatus: status,
    missingOrRejectedFields: missing,
    commonCarrierId,
    thetaCosId,
    windowId: window.windowId ?? null,
    eventLedgerId,
    pressureHandoff,
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
  for (const key of EFFECTIVE_FRW_SHARED_KEYS) {
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

function frwProjectionResidual(raw) {
  const aBefore = positiveNumberOrNull(raw.aBefore ?? raw.a_eff_before);
  const aAfter = positiveNumberOrNull(raw.aAfter ?? raw.a_eff_after);
  const aEff = positiveNumberOrNull(raw.aEff ?? raw.a_eff);
  const deltaTau = positiveNumberOrNull(raw.deltaTau ?? raw.delta_tau);
  const hEff = finiteNumberOrNull(raw.H_eff ?? raw.hEff);
  if ([aBefore, aAfter, aEff, deltaTau, hEff].some((value) => value === null)) {
    return null;
  }
  return Math.abs(hEff - (aAfter - aBefore) / (deltaTau * aEff));
}

function friedmannResidual(raw, c0) {
  const HEff = finiteNumberOrNull(raw.H_eff ?? raw.hEff);
  const GEff = finiteNumberOrNull(raw.G_eff ?? raw.gEff);
  const rhoEff = finiteNumberOrNull(raw.rho_eff ?? raw.rhoEff);
  const aEff = positiveNumberOrNull(raw.a_eff ?? raw.aEff);
  const k = finiteNumberOrNull(raw.k) ?? 0;
  const LambdaEff = finiteNumberOrNull(raw.Lambda_eff ?? raw.lambdaEff) ?? 0;
  if ([HEff, GEff, rhoEff, aEff].some((value) => value === null)) {
    return null;
  }
  const target =
    (8 * Math.PI * GEff * rhoEff) / (3 * c0 ** 2) -
    (k * c0 ** 2) / (aEff ** 2) +
    LambdaEff / 3;
  return Math.abs(HEff ** 2 - target);
}

function continuityResidual(raw, c0) {
  const rhoDot = finiteNumberOrNull(raw.rhoDot ?? raw.rho_dot);
  const HEff = finiteNumberOrNull(raw.H_eff ?? raw.hEff);
  const rhoEff = finiteNumberOrNull(raw.rho_eff ?? raw.rhoEff);
  const PEff = finiteNumberOrNull(raw.P_eff ?? raw.pEff) ?? 0;
  const SEff = finiteNumberOrNull(raw.S_eff ?? raw.sourceTerm) ?? 0;
  if ([rhoDot, HEff, rhoEff].some((value) => value === null)) {
    return null;
  }
  return Math.abs(rhoDot + 3 * HEff * (rhoEff + PEff / c0 ** 2) - SEff);
}

function fixedVoidResidual(raw) {
  if (raw.euclideanVoidExpansion !== false) {
    return null;
  }
  return finiteNumberOrNull(raw.voidScaleDrift ?? raw.residual);
}

function pressureHandoffResidual(raw, repoRoot) {
  const comparison = comparePressureHandoffToReport(raw, repoRoot);
  if (!comparison.accepted) {
    return null;
  }
  return comparison.maxResidual;
}

function evaluatePressureHandoff(raw, repoRoot) {
  const missing = [];
  if (!acceptedRow(raw)) {
    missing.push("pressureHandoff.accepted");
  }
  const deltaPEffReportPath = raw.deltaPEffReportPath ?? raw.reportPath;
  const pressureEvidence =
    repoRoot && deltaPEffReportPath
      ? pressureProjectionEvidenceStatusForPath(deltaPEffReportPath, { repoRoot })
      : { accepted: false, reason: "missing_delta_P_eff_report_path" };
  if (!pressureEvidence.accepted) {
    missing.push(`pressureHandoff.delta_P_eff_report.${pressureEvidence.reason}`);
  }
  const comparison = comparePressureHandoffToReport(raw, repoRoot);
  if (!comparison.accepted) {
    missing.push(...comparison.missingOrRejectedFields);
  }
  return {
    accepted: missing.length === 0,
    missingOrRejectedFields: missing,
    pressureEvidence,
    comparison,
  };
}

function comparePressureHandoffToReport(raw, repoRoot) {
  const missing = [];
  const reportPath = raw.deltaPEffReportPath ?? raw.reportPath;
  const report = readJsonReference(reportPath, repoRoot);
  if (!report) {
    return {
      accepted: false,
      missingOrRejectedFields: ["pressureHandoff.delta_P_eff_report_parseable"],
      maxResidual: null,
    };
  }
  const comparisons = [
    ["p_DE_eff", raw.P_eff ?? raw.p_DE_eff, report.pressureProjection?.p_DE_eff],
    ["G_eff", raw.G_eff, report.lambdaProjection?.G_eff],
    ["Lambda_eff", raw.Lambda_eff, report.lambdaProjection?.Lambda_eff],
    ["rho_eff", raw.rho_eff, report.equationOfState?.rho_DE_eff],
  ];
  const residuals = [];
  for (const [field, actual, expected] of comparisons) {
    const actualNumber = finiteNumberOrNull(actual);
    const expectedNumber = finiteNumberOrNull(expected);
    if (actualNumber === null || expectedNumber === null) {
      missing.push(`pressureHandoff.${field}`);
      continue;
    }
    residuals.push(Math.abs(actualNumber - expectedNumber));
  }
  const explicitResidual = finiteNumberOrNull(raw.residual ?? raw.maxResidual);
  if (explicitResidual === null) {
    missing.push("pressureHandoff.zero_residual");
  } else {
    residuals.push(Math.abs(explicitResidual));
  }
  const maxResidual = residuals.length > 0 ? Math.max(...residuals) : null;
  if (maxResidual === null || maxResidual > DEFAULT_TOLERANCE) {
    missing.push("pressureHandoff.values_match_delta_P_eff_report");
  }
  return {
    accepted: missing.length === 0,
    missingOrRejectedFields: missing,
    maxResidual,
  };
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

function positiveNumberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
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
