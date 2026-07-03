import fs from "node:fs";
import path from "node:path";
import { growthTransferEvidenceStatusForPath } from "./eq21-growth-transfer-evidence.mjs";
import {
  EQ21_MATTER_POWER_TRANSFER_KEYS,
  matterPowerTransferEvidenceStatusForPath,
} from "./eq21-matter-power-transfer-evidence.mjs";
import {
  sharedObservationEvidenceStatusForPath,
  sharedObservationSourcePathRejectionReason,
} from "./shared-observation-evidence.mjs";

export const EQ21_LENSING_TRANSFER_EVIDENCE_SCHEMA =
  "aaa-equation-map-eq21-lensing-transfer-evidence/v1";

export const EQ21_LENSING_TRANSFER_ROWS = Object.freeze([
  "lensing_transfer_child",
  "lensing_kernel_row",
  "matter_power_parent_row",
  "cmb_lensing_grid",
  "source_provenance",
  "no_hidden_retune_witness",
]);

export const EQ21_LENSING_TRANSFER_KEYS = EQ21_MATTER_POWER_TRANSFER_KEYS;

const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const DEFAULT_TOLERANCE = 1e-12;

export function lensingTransferEvidenceStatusForPath(value, { repoRoot }) {
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
  const objectStatus = evaluateLensingTransferEvidenceObject(raw, {
    repoRoot,
    sourcePath: resolvedPath,
  });
  return {
    ...objectStatus,
    resolvedPath,
    reason: objectStatus.accepted ? "accepted" : objectStatus.reason,
  };
}

export function evaluateLensingTransferEvidenceObject(
  raw,
  { repoRoot, sourcePath } = {},
) {
  const missing = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      accepted: false,
      reason: "lensing_transfer_evidence_not_json_object",
      missingOrRejectedFields: ["lensing_transfer_evidence_object"],
    };
  }
  if (raw.schema !== EQ21_LENSING_TRANSFER_EVIDENCE_SCHEMA) {
    missing.push("lensing_transfer_evidence_schema");
  }
  const status = raw.evidenceStatus ?? raw.status ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    missing.push("lensing_transfer_evidence_status_accepted");
  }
  if (raw.authorization?.acceptedLensingTransferChild !== true) {
    missing.push("authorization.acceptedLensingTransferChild");
  }
  if (raw.authorization?.downstreamConsumerAuthorization !== true) {
    missing.push("authorization.downstreamConsumerAuthorization");
  }
  if ((raw.scoreDecision ?? raw.authorization?.scoreDecision) !== "no_score_increase") {
    missing.push("scoreDecision.no_score_increase");
  }

  const window = raw.window ?? {};
  for (const field of [
    "lensingTransferChildId",
    "matterPowerTransferChildId",
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

  const growthTransferPath =
    raw.growthTransferChild?.path ?? raw.growthTransferChildPath;
  const growthTransfer =
    repoRoot && growthTransferPath
      ? growthTransferEvidenceStatusForPath(growthTransferPath, { repoRoot })
      : { accepted: false, reason: "missing_growth_transfer_child_path" };
  if (!growthTransfer.accepted) {
    missing.push(`growthTransferChild.${growthTransfer.reason}`);
  }
  const growthChild = readJsonOrNull(growthTransferPath, repoRoot);
  const growthWindow = growthChild?.window ?? {};
  const growthChildKeys = sharedKeyValues(growthChild?.sharedKeys);

  const matterPowerPath =
    raw.matterPowerTransferChild?.path ?? raw.matterPowerTransferChildPath;
  const matterPower =
    repoRoot && matterPowerPath
      ? matterPowerTransferEvidenceStatusForPath(matterPowerPath, { repoRoot })
      : { accepted: false, reason: "missing_matter_power_transfer_child_path" };
  if (!matterPower.accepted) {
    missing.push(`matterPowerTransferChild.${matterPower.reason}`);
  }
  const matterChild = readJsonOrNull(matterPowerPath, repoRoot);
  const matterWindow = matterChild?.window ?? {};
  const matterChildKeys = sharedKeyValues(matterChild?.sharedKeys);

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
    if (
      concreteString(window[localField]) &&
      concreteString(growthWindow[parentField]) &&
      window[localField] !== growthWindow[parentField]
    ) {
      missing.push(`growthTransferChild.${localField}_matches_parent`);
    }
    if (
      concreteString(window[localField]) &&
      concreteString(matterWindow[parentField]) &&
      window[localField] !== matterWindow[parentField]
    ) {
      missing.push(`matterPowerTransferChild.${localField}_matches_parent`);
    }
  }
  if (
    concreteString(window.growthTransferChildId) &&
    concreteString(growthWindow.growthTransferChildId) &&
    window.growthTransferChildId !== growthWindow.growthTransferChildId
  ) {
    missing.push("growthTransferChild.growthTransferChildId_matches_parent");
  }
  if (
    concreteString(window.matterPowerTransferChildId) &&
    concreteString(matterWindow.matterPowerTransferChildId) &&
    window.matterPowerTransferChildId !== matterWindow.matterPowerTransferChildId
  ) {
    missing.push("matterPowerTransferChild.matterPowerTransferChildId_matches_parent");
  }

  const rows = raw.rows ?? {};
  for (const row of EQ21_LENSING_TRANSFER_ROWS) {
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
  for (const key of EQ21_LENSING_TRANSFER_KEYS) {
    const row = sharedKeys.get(key);
    requireAcceptedSharedKey({
      key,
      value: row,
      missing,
      parentGrowthKeys,
      growthChildKeys,
      matterChildKeys,
      keyValues,
    });
  }

  const model = evaluateLensingTransferModel(raw.model ?? {}, matterChild);
  if (!model.computed) {
    missing.push(model.reason);
  } else {
    compareDerived(raw.model?.derived ?? {}, model.derived, raw.tolerances ?? {}, missing);
    const residual = finiteNumberOrNull(raw.residualComponents?.cmb_lensing_grid_normalized);
    if (residual === null || residual > (raw.tolerances?.residual ?? 1)) {
      missing.push("residualComponents.cmb_lensing_grid_normalized.within_tolerance");
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
        : "lensing_transfer_evidence_fields_missing",
    evidenceStatus: status,
    missingOrRejectedFields: missing,
    commonCarrierId: window.commonCarrierId ?? null,
    providerWindowId: window.providerWindowId ?? null,
    thetaObsId: window.thetaObsId ?? null,
    thetaWId: window.thetaWId ?? null,
    thetaCosId: window.thetaCosId ?? null,
    growthTransferChildId: window.growthTransferChildId ?? null,
    matterPowerTransferChildId: window.matterPowerTransferChildId ?? null,
    lensingTransferChildId: window.lensingTransferChildId ?? null,
    sharedObservation,
    growthTransfer,
    matterPower,
    model,
    sourcePath,
  };
}

export function evaluateLensingTransferModel(rawModel, matterChild) {
  const matterSamples = new Map(
    (Array.isArray(matterChild?.model?.derived?.samples)
      ? matterChild.model.derived.samples
      : []
    ).map((sample) => [sample.sampleId, sample]),
  );
  if (matterSamples.size === 0) {
    return { computed: false, reason: "model.matterPowerChild.samples_present" };
  }

  const kernel = rawModel.lensingKernel ?? {};
  const aLens = finiteNumberOrNull(kernel.A_lens);
  const zSource = finiteNumberOrNull(kernel.z_source);
  if (aLens === null || aLens <= 0) {
    return { computed: false, reason: "model.lensingKernel.A_lens_positive" };
  }
  if (zSource === null || zSource <= 0) {
    return { computed: false, reason: "model.lensingKernel.z_source_positive" };
  }

  const samples = Array.isArray(rawModel.samples) ? rawModel.samples : [];
  const uniqueEll = new Set(samples.map((sample) => finiteNumberOrNull(sample.ell)));
  if (samples.length < 3 || uniqueEll.size < 3 || uniqueEll.has(null)) {
    return { computed: false, reason: "model.samples.cmb_lensing_grid_minimum" };
  }

  const derivedSamples = [];
  const residuals = [];
  for (const sample of samples) {
    const sampleId = concreteString(sample.sampleId) ? sample.sampleId : null;
    const ell = finiteNumberOrNull(sample.ell);
    const matterSampleId = concreteString(sample.matterSampleId)
      ? sample.matterSampleId
      : null;
    if (!sampleId || ell === null || ell <= 0 || !matterSampleId) {
      return { computed: false, reason: "model.samples.valid_lensing_sample" };
    }
    const matterSample = matterSamples.get(matterSampleId);
    if (!matterSample) {
      return { computed: false, reason: "model.samples.matter_sample_exists" };
    }
    const k = finiteNumberOrNull(matterSample.k);
    const z = finiteNumberOrNull(matterSample.z);
    const matterPower = finiteNumberOrNull(matterSample.matter_power);
    if (k === null || k <= 0 || z === null || z < 0 || matterPower === null || matterPower < 0) {
      return { computed: false, reason: "model.samples.matter_sample_valid" };
    }
    if (z >= zSource) {
      return { computed: false, reason: "model.samples.source_behind_lens" };
    }
    const lensingKernel = ((zSource - z) / (zSource + 1)) ** 2 / (1 + z);
    const ellDenominator = (ell * (ell + 1)) ** 2;
    const cPhiPhi = (aLens * lensingKernel * matterPower) / ellDenominator;
    const observed = finiteNumberOrNull(sample.benchmark?.C_phi_phi_observed);
    const sigma = finiteNumberOrNull(sample.benchmark?.sigma);
    const normalizedResidual =
      observed !== null && sigma !== null && sigma > 0
        ? Math.abs(cPhiPhi - observed) / sigma
        : null;
    if (normalizedResidual !== null) {
      residuals.push(normalizedResidual);
    }
    derivedSamples.push({
      sampleId,
      ell,
      matterSampleId,
      k,
      z,
      matter_power: matterPower,
      lensing_kernel: lensingKernel,
      ell_denominator: ellDenominator,
      C_phi_phi: cPhiPhi,
      cmb_lensing_normalized_residual: normalizedResidual,
    });
  }
  if (residuals.length !== samples.length) {
    return { computed: false, reason: "model.samples.benchmark_residuals_declared" };
  }

  return {
    computed: true,
    reason: "computed",
    derived: {
      A_lens: aLens,
      z_source: zSource,
      cmb_lensing_grid_normalized_residual: Math.max(...residuals),
      samples: derivedSamples,
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

function sharedKeyValues(rows) {
  return new Map(
    (Array.isArray(rows) ? rows : []).map((row) => [row.key, finiteNumberOrNull(row.value)]),
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
  growthChildKeys,
  matterChildKeys,
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
  const growthChildValue = growthChildKeys.get(key);
  if (growthChildValue === null || growthChildValue === undefined) {
    missing.push(`sharedKeys.${key}.growth_child_value`);
    return;
  }
  if (Math.abs(number - growthChildValue) > DEFAULT_TOLERANCE) {
    missing.push(`sharedKeys.${key}.matches_growth_child_value`);
  }
  const matterChildValue = matterChildKeys.get(key);
  if (matterChildValue === null || matterChildValue === undefined) {
    missing.push(`sharedKeys.${key}.matter_power_child_value`);
    return;
  }
  if (Math.abs(number - matterChildValue) > DEFAULT_TOLERANCE) {
    missing.push(`sharedKeys.${key}.matches_matter_power_child_value`);
  }
}

function compareDerived(actual, expected, tolerances, missing) {
  const tolerance = finiteNumberOrNull(tolerances.derived) ?? DEFAULT_TOLERANCE;
  for (const [key, expectedValue] of Object.entries(expected)) {
    if (key === "samples" || key === "cmb_lensing_grid_normalized_residual") {
      continue;
    }
    const actualValue = finiteNumberOrNull(actual[key]);
    if (actualValue === null || Math.abs(actualValue - expectedValue) > tolerance) {
      missing.push(`model.derived.${key}.matches_computed`);
    }
  }
  const actualSamples = Array.isArray(actual.samples) ? actual.samples : [];
  if (actualSamples.length !== expected.samples.length) {
    missing.push("model.derived.samples.length");
    return;
  }
  const actualById = new Map(actualSamples.map((sample) => [sample.sampleId, sample]));
  for (const expectedSample of expected.samples) {
    const actualSample = actualById.get(expectedSample.sampleId);
    if (!actualSample) {
      missing.push(`model.derived.samples.${expectedSample.sampleId}`);
      continue;
    }
    for (const [key, expectedValue] of Object.entries(expectedSample)) {
      if (key === "sampleId" || key === "cmb_lensing_normalized_residual") {
        continue;
      }
      if (typeof expectedValue === "string") {
        if (actualSample[key] !== expectedValue) {
          missing.push(`model.derived.samples.${expectedSample.sampleId}.${key}.matches_computed`);
        }
        continue;
      }
      const actualValue = finiteNumberOrNull(actualSample[key]);
      if (actualValue === null || Math.abs(actualValue - expectedValue) > tolerance) {
        missing.push(`model.derived.samples.${expectedSample.sampleId}.${key}.matches_computed`);
      }
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
