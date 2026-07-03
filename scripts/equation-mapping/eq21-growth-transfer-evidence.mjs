import fs from "node:fs";
import path from "node:path";
import {
  sharedObservationEvidenceStatusForPath,
  sharedObservationSourcePathRejectionReason,
} from "./shared-observation-evidence.mjs";

export const EQ21_GROWTH_TRANSFER_EVIDENCE_SCHEMA =
  "aaa-equation-map-eq21-growth-transfer-evidence/v1";

export const EQ21_GROWTH_TRANSFER_ROWS = Object.freeze([
  "growth_transfer_child",
  "linear_growth_kernel",
  "matter_loading_row",
  "f_sigma8_prediction",
  "source_provenance",
  "no_hidden_retune_witness",
]);

export const EQ21_GROWTH_TRANSFER_KEYS = Object.freeze([
  "rho_NS",
  "n",
  "chi_sea",
  "Gamma_N",
  "M_sea_ab",
  "rho_bar",
  "rho_A",
  "H_eff",
  "a_eff",
]);

const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const DEFAULT_TOLERANCE = 1e-12;

export function growthTransferEvidenceStatusForPath(value, { repoRoot }) {
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
  const objectStatus = evaluateGrowthTransferEvidenceObject(raw, {
    repoRoot,
    sourcePath: resolvedPath,
  });
  return {
    ...objectStatus,
    resolvedPath,
    reason: objectStatus.accepted ? "accepted" : objectStatus.reason,
  };
}

export function evaluateGrowthTransferEvidenceObject(
  raw,
  { repoRoot, sourcePath } = {},
) {
  const missing = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      accepted: false,
      reason: "growth_transfer_evidence_not_json_object",
      missingOrRejectedFields: ["growth_transfer_evidence_object"],
    };
  }
  if (raw.schema !== EQ21_GROWTH_TRANSFER_EVIDENCE_SCHEMA) {
    missing.push("growth_transfer_evidence_schema");
  }
  const status = raw.evidenceStatus ?? raw.status ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    missing.push("growth_transfer_evidence_status_accepted");
  }
  if (raw.authorization?.acceptedGrowthTransferChild !== true) {
    missing.push("authorization.acceptedGrowthTransferChild");
  }
  if (raw.authorization?.downstreamConsumerAuthorization !== true) {
    missing.push("authorization.downstreamConsumerAuthorization");
  }
  if ((raw.scoreDecision ?? raw.authorization?.scoreDecision) !== "no_score_increase") {
    missing.push("scoreDecision.no_score_increase");
  }

  const window = raw.window ?? {};
  for (const field of [
    "growthTransferChildId",
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

  const sharedObservationPath =
    raw.sharedObservation?.path ?? raw.sharedObservationPath;
  const sharedObservation =
    repoRoot && sharedObservationPath
      ? sharedObservationEvidenceStatusForPath(sharedObservationPath, { repoRoot })
      : { accepted: false, reason: "missing_shared_observation_path" };
  if (!sharedObservation.accepted) {
    missing.push(`sharedObservation.${sharedObservation.reason}`);
  }
  const parent = readJsonOrNull(sharedObservationPath, repoRoot);
  const parentWindow = parent?.window ?? {};
  const parentGrowthKeys = growthProjectionValues(parent);
  for (const [localField, parentField] of [
    ["thetaObsId", "thetaObsId"],
    ["providerWindowId", "providerWindowId"],
    ["thetaWId", "thetaWId"],
    ["thetaCosId", "thetaCosId"],
    ["commonCarrierId", "commonCarrierId"],
    ["eventLedgerId", "eventLedgerId"],
  ]) {
    if (
      concreteString(window[localField]) &&
      concreteString(parentWindow[parentField]) &&
      window[localField] !== parentWindow[parentField]
    ) {
      missing.push(`sharedObservation.${localField}_matches_parent`);
    }
  }

  const rows = raw.rows ?? {};
  for (const row of EQ21_GROWTH_TRANSFER_ROWS) {
    requireAcceptedRow({
      row,
      value: rows[row],
      missing,
      carrierId: window.commonCarrierId,
      eventLedgerId: window.eventLedgerId,
    });
  }

  const sharedKeys = sharedKeyMap(raw.sharedKeys);
  const keyValues = {};
  for (const key of EQ21_GROWTH_TRANSFER_KEYS) {
    const row = sharedKeys.get(key);
    requireAcceptedSharedKey({
      key,
      value: row,
      missing,
      parentGrowthKeys,
      keyValues,
    });
  }

  const model = evaluateGrowthModel(raw.model ?? {}, keyValues);
  if (!model.computed) {
    missing.push(model.reason);
  } else {
    compareDerived(raw.model?.derived ?? {}, model.derived, raw.tolerances ?? {}, missing);
    const residual = finiteNumberOrNull(raw.residualComponents?.f_sigma8_normalized);
    if (residual === null || residual > (raw.tolerances?.residual ?? 1)) {
      missing.push("residualComponents.f_sigma8_normalized.within_tolerance");
    }
  }
  const retuneResidual = finiteNumberOrNull(
    raw.residualComponents?.S_retune ?? raw.residualComponents?.noHiddenRetune,
  );
  if (retuneResidual === null || retuneResidual > DEFAULT_TOLERANCE) {
    missing.push("residualComponents.S_retune.zero");
  }

  return {
    accepted: missing.length === 0,
    reason:
      missing.length === 0
        ? "accepted"
        : "growth_transfer_evidence_fields_missing",
    evidenceStatus: status,
    missingOrRejectedFields: missing,
    commonCarrierId: window.commonCarrierId ?? null,
    providerWindowId: window.providerWindowId ?? null,
    thetaObsId: window.thetaObsId ?? null,
    thetaWId: window.thetaWId ?? null,
    thetaCosId: window.thetaCosId ?? null,
    growthTransferChildId: window.growthTransferChildId ?? null,
    sharedObservation,
    model,
    sourcePath,
  };
}

export function evaluateGrowthModel(rawModel, keyValues) {
  const aEval = finiteNumberOrNull(rawModel.evaluation?.a_eff ?? rawModel.a_eff) ?? 1;
  const sigma8Seed = finiteNumberOrNull(rawModel.sigma8Seed?.value);
  if (!Number.isFinite(aEval) || aEval <= 0) {
    return { computed: false, reason: "model.evaluation.a_eff_positive" };
  }
  if (sigma8Seed === null || sigma8Seed <= 0) {
    return { computed: false, reason: "model.sigma8Seed.positive" };
  }
  for (const key of ["rho_bar", "rho_A", "chi_sea", "Gamma_N", "M_sea_ab"]) {
    if (!Number.isFinite(keyValues[key])) {
      return { computed: false, reason: `model.sharedKey.${key}.numeric` };
    }
  }
  const omegaM = keyValues.rho_bar + keyValues.rho_A;
  if (!Number.isFinite(omegaM) || omegaM <= 0 || omegaM >= 1) {
    return { computed: false, reason: "model.omega_m_eff.open_unit_interval" };
  }
  const omegaDe = 1 - omegaM;
  const eEff = Math.sqrt(omegaM / aEval ** 3 + omegaDe);
  const omegaMA = omegaM / (aEval ** 3 * eEff ** 2);
  const muGrowth = keyValues.M_sea_ab / keyValues.chi_sea ** 2;
  const gammaGrowth =
    0.55 +
    0.02 * (keyValues.chi_sea - 1) +
    0.01 * Math.abs(keyValues.Gamma_N - 1);
  const growthRateF = muGrowth * omegaMA ** gammaGrowth;
  const fSigma8 = growthRateF * sigma8Seed;
  const benchmark = rawModel.benchmark ?? {};
  const observed = finiteNumberOrNull(benchmark.f_sigma8_observed);
  const sigma = finiteNumberOrNull(benchmark.sigma);
  const normalizedResidual =
    observed !== null && sigma !== null && sigma > 0
      ? Math.abs(fSigma8 - observed) / sigma
      : null;
  return {
    computed: true,
    reason: "computed",
    derived: {
      omega_m_eff: omegaM,
      omega_de_eff: omegaDe,
      E_eff: eEff,
      Omega_m_a: omegaMA,
      mu_growth: muGrowth,
      gamma_growth: gammaGrowth,
      growth_rate_f: growthRateF,
      f_sigma8: fSigma8,
      f_sigma8_normalized_residual: normalizedResidual,
    },
  };
}

function readJsonOrNull(value, repoRoot) {
  if (!concreteString(value) || !repoRoot) {
    return null;
  }
  const resolvedPath = path.isAbsolute(value)
    ? value
    : path.resolve(repoRoot, value.trim().replace(/#.*/, ""));
  try {
    return JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  } catch {
    return null;
  }
}

function growthProjectionValues(parent) {
  return new Map(
    (Array.isArray(parent?.sharedKeys) ? parent.sharedKeys : []).map((row) => [
      row.key,
      finiteNumberOrNull(row.projectionValues?.growth),
    ]),
  );
}

function sharedKeyMap(rows) {
  return new Map((Array.isArray(rows) ? rows : []).map((row) => [row.key, row]));
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

function requireAcceptedSharedKey({
  key,
  value,
  missing,
  parentGrowthKeys,
  keyValues,
}) {
  if (!acceptedRow(value)) {
    missing.push(`sharedKeys.${key}.accepted`);
    return;
  }
  const number = finiteNumberOrNull(value.value);
  if (number === null) {
    missing.push(`sharedKeys.${key}.value_numeric`);
    return;
  }
  keyValues[key] = number;
  const parentValue = parentGrowthKeys.get(key);
  if (parentValue === null || parentValue === undefined) {
    missing.push(`sharedKeys.${key}.parent_growth_value`);
    return;
  }
  if (Math.abs(number - parentValue) > DEFAULT_TOLERANCE) {
    missing.push(`sharedKeys.${key}.matches_parent_growth_value`);
  }
}

function compareDerived(actual, expected, tolerances, missing) {
  const tolerance = finiteNumberOrNull(tolerances.derived) ?? DEFAULT_TOLERANCE;
  for (const [key, expectedValue] of Object.entries(expected)) {
    if (key === "f_sigma8_normalized_residual") {
      continue;
    }
    const actualValue = finiteNumberOrNull(actual[key]);
    if (actualValue === null || Math.abs(actualValue - expectedValue) > tolerance) {
      missing.push(`model.derived.${key}.matches_computed`);
    }
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
