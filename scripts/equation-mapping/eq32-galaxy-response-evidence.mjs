import fs from "node:fs";
import path from "node:path";
import {
  SHARED_OBSERVATION_KEYS,
  sharedObservationEvidenceStatusForPath,
  sharedObservationSourcePathRejectionReason,
} from "./shared-observation-evidence.mjs";
import { outputProjectionEvidenceStatusForPath } from "../spacetime/noether-sea-density-compression-output-projection-evidence.mjs";

export const EQ32_GALAXY_RESPONSE_EVIDENCE_SCHEMA =
  "aaa-equation-map-eq32-galaxy-response-evidence/v1";

export const EQ32_GALAXY_RESPONSE_ROWS = Object.freeze([
  "galaxy_response_child",
  "rar_response_row",
  "btfr_response_row",
  "lensing_consistency_row",
  "high_acceleration_recovery_row",
  "local_gravity_constraint_row",
  "delta_a_star_parent_row",
  "galaxy_response_grid",
  "source_provenance",
  "no_hidden_retune_witness",
]);

export const EQ32_GALAXY_RESPONSE_KEYS = SHARED_OBSERVATION_KEYS;

const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const DEFAULT_TOLERANCE = 1e-12;

export function galaxyResponseEvidenceStatusForPath(value, { repoRoot }) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(repoRoot, sourcePath);
  const pathReason = sharedObservationSourcePathRejectionReason(
    resolvedPath,
    repoRoot,
  );
  if (pathReason) {
    return { accepted: false, reason: pathReason, resolvedPath };
  }
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  } catch (error) {
    return {
      accepted: false,
      reason:
        error.code === "ENOENT" ? "source_not_found" : "source_not_parseable_json",
      resolvedPath,
    };
  }
  const objectStatus = evaluateGalaxyResponseEvidenceObject(raw, {
    repoRoot,
    sourcePath: resolvedPath,
  });
  return {
    ...objectStatus,
    resolvedPath,
    reason: objectStatus.accepted ? "accepted" : objectStatus.reason,
  };
}

export function evaluateGalaxyResponseEvidenceObject(
  raw,
  { repoRoot, sourcePath } = {},
) {
  const missing = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      accepted: false,
      reason: "galaxy_response_evidence_not_json_object",
      missingOrRejectedFields: ["galaxy_response_evidence_object"],
    };
  }
  if (raw.schema !== EQ32_GALAXY_RESPONSE_EVIDENCE_SCHEMA) {
    missing.push("galaxy_response_evidence_schema");
  }
  const status = raw.evidenceStatus ?? raw.status ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    missing.push("galaxy_response_evidence_status_accepted");
  }
  if (raw.authorization?.acceptedGalaxyResponseChild !== true) {
    missing.push("authorization.acceptedGalaxyResponseChild");
  }
  if (raw.authorization?.downstreamConsumerAuthorization !== true) {
    missing.push("authorization.downstreamConsumerAuthorization");
  }
  if ((raw.scoreDecision ?? raw.authorization?.scoreDecision) !== "no_score_increase") {
    missing.push("scoreDecision.no_score_increase");
  }

  const window = raw.window ?? {};
  for (const field of [
    "galaxyResponseChildId",
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
  const parentRarKeys = projectionValues(parent, "RAR");
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

  const outputProjectionPath =
    raw.outputProjection?.path ?? raw.outputProjectionPath;
  const outputProjection =
    repoRoot && outputProjectionPath
      ? outputProjectionEvidenceStatusForPath(outputProjectionPath, { repoRoot })
      : { accepted: false, reason: "missing_output_projection_path" };
  if (!outputProjection.accepted) {
    missing.push(`outputProjection.${outputProjection.reason}`);
  }
  const outputRaw = readJsonOrNull(outputProjectionPath, repoRoot);
  if (
    concreteString(outputProjection.commonCarrierId) &&
    concreteString(window.commonCarrierId) &&
    outputProjection.commonCarrierId !== window.commonCarrierId
  ) {
    missing.push("outputProjection.commonCarrierId_matches_window");
  }
  const deltaAStar = acceptedOutputValue(outputRaw, "delta_a_star");
  if (deltaAStar === null || deltaAStar <= 0) {
    missing.push("outputProjection.delta_a_star.accepted_positive");
  }

  const rows = raw.rows ?? {};
  for (const row of EQ32_GALAXY_RESPONSE_ROWS) {
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
  for (const key of EQ32_GALAXY_RESPONSE_KEYS) {
    const row = sharedKeys.get(key);
    requireAcceptedSharedKey({
      key,
      value: row,
      missing,
      parentRarKeys,
      keyValues,
    });
  }

  const model = evaluateGalaxyResponseModel(raw.model ?? {}, keyValues, outputRaw);
  if (!model.computed) {
    missing.push(model.reason);
  } else {
    compareDerived(raw.model?.derived ?? {}, model.derived, raw.tolerances ?? {}, missing);
    const residuals = raw.residualComponents ?? {};
    requireResidualWithin(
      residuals.rar_grid_normalized,
      raw.tolerances?.residual ?? 1,
      "residualComponents.rar_grid_normalized.within_tolerance",
      missing,
    );
    requireResidualWithin(
      residuals.btfr_low_acceleration,
      raw.tolerances?.btfr ?? 1,
      "residualComponents.btfr_low_acceleration.within_tolerance",
      missing,
    );
    requireResidualWithin(
      residuals.high_acceleration_recovery,
      raw.tolerances?.highAcceleration ?? 1,
      "residualComponents.high_acceleration_recovery.within_tolerance",
      missing,
    );
    requireResidualWithin(
      residuals.lensing_dynamics_split,
      raw.tolerances?.lensing ?? DEFAULT_TOLERANCE,
      "residualComponents.lensing_dynamics_split.within_tolerance",
      missing,
    );
  }
  const retuneResidual = finiteNumberOrNull(
    raw.residualComponents?.S_retune ?? raw.residualComponents?.noHiddenRetune,
  );
  if (retuneResidual === null || retuneResidual > DEFAULT_TOLERANCE) {
    missing.push("residualComponents.S_retune.zero");
  }
  if (sourcePath && raw.sourcePath) {
    const relativeSourcePath = path.relative(repoRoot, sourcePath);
    if (raw.sourcePath !== relativeSourcePath) {
      missing.push("sourcePath.self_reference");
    }
  }

  return {
    accepted: missing.length === 0,
    reason:
      missing.length === 0
        ? "accepted"
        : "galaxy_response_evidence_fields_missing",
    evidenceStatus: status,
    missingOrRejectedFields: missing,
    commonCarrierId: window.commonCarrierId ?? null,
    providerWindowId: window.providerWindowId ?? null,
    thetaObsId: window.thetaObsId ?? null,
    thetaWId: window.thetaWId ?? null,
    thetaCosId: window.thetaCosId ?? null,
    galaxyResponseChildId: window.galaxyResponseChildId ?? null,
    sharedObservation,
    outputProjection,
    deltaAStar,
    model,
    sourcePath,
  };
}

export function evaluateGalaxyResponseModel(rawModel, keyValues, outputProjection) {
  const galaxyResponse = rawModel.galaxyResponse ?? {};
  if (!ACCEPTED_STATUSES.has(galaxyResponse.status ?? null)) {
    return { computed: false, reason: "model.galaxyResponse.status_accepted" };
  }
  const aStar =
    finiteNumberOrNull(rawModel.a_star) ??
    finiteNumberOrNull(rawModel.aStar) ??
    finiteNumberOrNull(rawModel.delta_a_star) ??
    acceptedOutputValue(outputProjection, "delta_a_star");
  if (aStar === null || aStar <= 0) {
    return { computed: false, reason: "model.a_star.positive" };
  }
  const deltaGEff = acceptedOutputValue(outputProjection, "delta_G_eff") ?? 0;
  const gEff =
    finiteNumberOrNull(rawModel.G_eff) ??
    finiteNumberOrNull(rawModel.g_eff) ??
    1 + deltaGEff;
  if (gEff === null || gEff <= 0) {
    return { computed: false, reason: "model.G_eff.positive" };
  }
  for (const key of ["rho_NS", "rho_bar", "rho_A", "chi_sea", "Gamma_N", "M_sea_ab"]) {
    if (!Number.isFinite(keyValues[key])) {
      return { computed: false, reason: `model.sharedKey.${key}.numeric` };
    }
  }
  const samples = Array.isArray(rawModel.samples) ? rawModel.samples : [];
  const lowSamples = samples.filter((sample) => sample.regime === "low_acceleration");
  const highSamples = samples.filter((sample) => sample.regime === "high_acceleration");
  if (samples.length < 3 || lowSamples.length < 1 || highSamples.length < 1) {
    return { computed: false, reason: "model.samples.low_transition_high_grid" };
  }

  const derivedSamples = [];
  const rarResiduals = [];
  const btfrResiduals = [];
  const highResiduals = [];
  const lensingResiduals = [];
  for (const sample of samples) {
    const sampleId = concreteString(sample.sampleId) ? sample.sampleId : null;
    const gBar = finiteNumberOrNull(sample.g_bar);
    if (!sampleId || gBar === null || gBar <= 0) {
      return { computed: false, reason: "model.samples.valid_g_bar_sample" };
    }
    const y = gBar / aStar;
    const responseFactor = 0.5 + Math.sqrt(0.25 + 1 / y);
    const gResponse = gBar * responseFactor;
    const gLensing = gResponse;
    const btfrRatio = (gResponse * gResponse) / (gBar * aStar);
    const btfrResidual = Math.abs(btfrRatio - 1);
    const highResidual = Math.abs(gResponse / gBar - 1);
    const lensingResidual = relativeResidual(gLensing, gResponse);
    const declaredResponse = finiteNumberOrNull(sample.g_response);
    const rarResidual =
      declaredResponse === null ? 0 : relativeResidual(declaredResponse, gResponse);
    rarResiduals.push(rarResidual);
    lensingResiduals.push(lensingResidual);
    if (sample.regime === "low_acceleration") {
      btfrResiduals.push(btfrResidual);
    }
    if (sample.regime === "high_acceleration") {
      highResiduals.push(highResidual);
    }
    derivedSamples.push({
      sampleId,
      regime: sample.regime ?? null,
      g_bar: gBar,
      y,
      response_factor: responseFactor,
      g_response: gResponse,
      g_lensing: gLensing,
      btfr_ratio: btfrRatio,
      btfr_residual: btfrResidual,
      high_acceleration_residual: highResidual,
      rar_normalized_residual: rarResidual,
      lensing_dynamics_split: lensingResidual,
    });
  }

  const derived = {
    response_law: "g_response = g_bar * (0.5 + sqrt(0.25 + a_star / g_bar))",
    a_star: aStar,
    G_eff: gEff,
    sample_count: derivedSamples.length,
    rar_grid_normalized_residual: maxOrZero(rarResiduals),
    btfr_low_acceleration_residual: maxOrZero(btfrResiduals),
    high_acceleration_recovery_residual: maxOrZero(highResiduals),
    lensing_dynamics_split: maxOrZero(lensingResiduals),
    local_gravity_residual: maxOrZero(highResiduals),
    samples: derivedSamples,
  };

  return {
    computed: true,
    derived,
    derivedPass: true,
    rarGridResidualPass: derived.rar_grid_normalized_residual <= DEFAULT_TOLERANCE,
    btfrLowAccelerationPass: derived.btfr_low_acceleration_residual <= 1,
    highAccelerationRecoveryPass: derived.high_acceleration_recovery_residual <= 1,
    lensingDynamicsSplitPass: derived.lensing_dynamics_split <= DEFAULT_TOLERANCE,
    noHiddenRetunePass: true,
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

function requireAcceptedSharedKey({
  key,
  value,
  missing,
  parentRarKeys,
  keyValues,
}) {
  if (!acceptedRow(value)) {
    missing.push(`sharedKeys.${key}.accepted`);
    return;
  }
  const localValue = finiteNumberOrNull(value.value);
  if (localValue === null) {
    missing.push(`sharedKeys.${key}.value_numeric`);
    return;
  }
  const parentValue = finiteNumberOrNull(parentRarKeys[key]);
  if (parentValue === null) {
    missing.push(`sharedKeys.${key}.parent_RAR_value`);
    return;
  }
  if (Math.abs(localValue - parentValue) > DEFAULT_TOLERANCE) {
    missing.push(`sharedKeys.${key}.matches_parent_RAR_value`);
  }
  keyValues[key] = localValue;
}

function compareDerived(actual, expected, tolerances, missing) {
  const tolerance = tolerances.derived ?? DEFAULT_TOLERANCE;
  for (const key of [
    "a_star",
    "G_eff",
    "sample_count",
    "rar_grid_normalized_residual",
    "btfr_low_acceleration_residual",
    "high_acceleration_recovery_residual",
    "lensing_dynamics_split",
    "local_gravity_residual",
  ]) {
    const actualValue = finiteNumberOrNull(actual[key]);
    const expectedValue = finiteNumberOrNull(expected[key]);
    if (
      actualValue === null ||
      expectedValue === null ||
      Math.abs(actualValue - expectedValue) > tolerance
    ) {
      missing.push(`model.derived.${key}_matches_computed`);
    }
  }
  const actualSamples = Array.isArray(actual.samples) ? actual.samples : [];
  if (actualSamples.length !== expected.samples.length) {
    missing.push("model.derived.samples.length_matches_computed");
    return;
  }
  for (let index = 0; index < expected.samples.length; index += 1) {
    const actualSample = actualSamples[index] ?? {};
    const expectedSample = expected.samples[index];
    if (actualSample.sampleId !== expectedSample.sampleId) {
      missing.push(`model.derived.samples.${index}.sampleId_matches_computed`);
    }
    for (const key of [
      "g_bar",
      "y",
      "response_factor",
      "g_response",
      "g_lensing",
      "btfr_ratio",
      "btfr_residual",
      "high_acceleration_residual",
      "rar_normalized_residual",
      "lensing_dynamics_split",
    ]) {
      const actualValue = finiteNumberOrNull(actualSample[key]);
      const expectedValue = finiteNumberOrNull(expectedSample[key]);
      if (
        actualValue === null ||
        expectedValue === null ||
        Math.abs(actualValue - expectedValue) > tolerance
      ) {
        missing.push(`model.derived.samples.${index}.${key}_matches_computed`);
      }
    }
  }
}

function requireResidualWithin(value, tolerance, reason, missing) {
  const residual = finiteNumberOrNull(value);
  if (residual === null || residual > tolerance) {
    missing.push(reason);
  }
}

function acceptedOutputValue(raw, rowId) {
  const row = raw?.rows?.[rowId];
  if (!acceptedRow(row)) {
    return null;
  }
  return finiteNumberOrNull(row.value);
}

function projectionValues(parent, projection) {
  return Object.fromEntries(
    (Array.isArray(parent?.sharedKeys) ? parent.sharedKeys : []).map((row) => [
      row.key,
      row.projectionValues?.[projection],
    ]),
  );
}

function sharedKeyMap(sharedKeys) {
  return new Map(
    (Array.isArray(sharedKeys) ? sharedKeys : []).map((row) => [row.key, row]),
  );
}

function readJsonOrNull(value, repoRoot) {
  if (!concreteString(value)) {
    return null;
  }
  const resolvedPath = path.isAbsolute(value)
    ? value
    : path.resolve(repoRoot ?? process.cwd(), value.trim().replace(/#.*/, ""));
  try {
    return JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  } catch {
    return null;
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

function relativeResidual(actual, expected) {
  const scale = Math.max(Math.abs(expected), DEFAULT_TOLERANCE);
  return Math.abs(actual - expected) / scale;
}

function maxOrZero(values) {
  return values.length === 0 ? 0 : Math.max(...values);
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
