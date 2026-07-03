import fs from "node:fs";
import path from "node:path";
import {
  EQ21_GROWTH_TRANSFER_KEYS,
  evaluateGrowthModel,
  growthTransferEvidenceStatusForPath,
} from "./eq21-growth-transfer-evidence.mjs";
import {
  sharedObservationEvidenceStatusForPath,
  sharedObservationSourcePathRejectionReason,
} from "./shared-observation-evidence.mjs";

export const EQ21_MATTER_POWER_TRANSFER_EVIDENCE_SCHEMA =
  "aaa-equation-map-eq21-matter-power-transfer-evidence/v1";

export const EQ21_MATTER_POWER_TRANSFER_ROWS = Object.freeze([
  "matter_power_transfer_child",
  "seed_spectrum_row",
  "transfer_kernel_row",
  "growth_factor_grid",
  "matter_power_grid",
  "source_provenance",
  "no_hidden_retune_witness",
]);

export const EQ21_MATTER_POWER_TRANSFER_KEYS = EQ21_GROWTH_TRANSFER_KEYS;

const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const DEFAULT_TOLERANCE = 1e-12;

export function matterPowerTransferEvidenceStatusForPath(value, { repoRoot }) {
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
  const objectStatus = evaluateMatterPowerTransferEvidenceObject(raw, {
    repoRoot,
    sourcePath: resolvedPath,
  });
  return {
    ...objectStatus,
    resolvedPath,
    reason: objectStatus.accepted ? "accepted" : objectStatus.reason,
  };
}

export function evaluateMatterPowerTransferEvidenceObject(
  raw,
  { repoRoot, sourcePath } = {},
) {
  const missing = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      accepted: false,
      reason: "matter_power_transfer_evidence_not_json_object",
      missingOrRejectedFields: ["matter_power_transfer_evidence_object"],
    };
  }
  if (raw.schema !== EQ21_MATTER_POWER_TRANSFER_EVIDENCE_SCHEMA) {
    missing.push("matter_power_transfer_evidence_schema");
  }
  const status = raw.evidenceStatus ?? raw.status ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    missing.push("matter_power_transfer_evidence_status_accepted");
  }
  if (raw.authorization?.acceptedMatterPowerTransferChild !== true) {
    missing.push("authorization.acceptedMatterPowerTransferChild");
  }
  if (raw.authorization?.downstreamConsumerAuthorization !== true) {
    missing.push("authorization.downstreamConsumerAuthorization");
  }
  if ((raw.scoreDecision ?? raw.authorization?.scoreDecision) !== "no_score_increase") {
    missing.push("scoreDecision.no_score_increase");
  }

  const window = raw.window ?? {};
  for (const field of [
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
  }
  if (
    concreteString(window.growthTransferChildId) &&
    concreteString(growthWindow.growthTransferChildId) &&
    window.growthTransferChildId !== growthWindow.growthTransferChildId
  ) {
    missing.push("growthTransferChild.growthTransferChildId_matches_parent");
  }

  const rows = raw.rows ?? {};
  for (const row of EQ21_MATTER_POWER_TRANSFER_ROWS) {
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
  for (const key of EQ21_MATTER_POWER_TRANSFER_KEYS) {
    const row = sharedKeys.get(key);
    requireAcceptedSharedKey({
      key,
      value: row,
      missing,
      parentGrowthKeys,
      growthChildKeys,
      keyValues,
    });
  }

  const model = evaluateMatterPowerModel(raw.model ?? {}, keyValues, growthChild);
  if (!model.computed) {
    missing.push(model.reason);
  } else {
    compareDerived(raw.model?.derived ?? {}, model.derived, raw.tolerances ?? {}, missing);
    const residual = finiteNumberOrNull(raw.residualComponents?.matter_power_grid_normalized);
    if (residual === null || residual > (raw.tolerances?.residual ?? 1)) {
      missing.push("residualComponents.matter_power_grid_normalized.within_tolerance");
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
        : "matter_power_transfer_evidence_fields_missing",
    evidenceStatus: status,
    missingOrRejectedFields: missing,
    commonCarrierId: window.commonCarrierId ?? null,
    providerWindowId: window.providerWindowId ?? null,
    thetaObsId: window.thetaObsId ?? null,
    thetaWId: window.thetaWId ?? null,
    thetaCosId: window.thetaCosId ?? null,
    growthTransferChildId: window.growthTransferChildId ?? null,
    matterPowerTransferChildId: window.matterPowerTransferChildId ?? null,
    sharedObservation,
    growthTransfer,
    model,
    sourcePath,
  };
}

export function evaluateMatterPowerModel(rawModel, keyValues, growthChild) {
  const growthBase = evaluateGrowthModel(rawModel, keyValues);
  if (!growthBase.computed) {
    return growthBase;
  }
  const growthDerived = growthChild?.model?.derived ?? {};
  const growthSigma8 = finiteNumberOrNull(growthChild?.model?.sigma8Seed?.value);
  const sigma8Seed = finiteNumberOrNull(rawModel.sigma8Seed?.value);
  if (sigma8Seed === null || sigma8Seed <= 0) {
    return { computed: false, reason: "model.sigma8Seed.positive" };
  }
  if (growthSigma8 === null || Math.abs(sigma8Seed - growthSigma8) > DEFAULT_TOLERANCE) {
    return { computed: false, reason: "model.sigma8Seed.matches_growth_child" };
  }
  const growthF = finiteNumberOrNull(growthDerived.growth_rate_f);
  const growthFSigma8 = finiteNumberOrNull(growthDerived.f_sigma8);
  if (
    growthF === null ||
    Math.abs(growthF - growthBase.derived.growth_rate_f) > DEFAULT_TOLERANCE ||
    growthFSigma8 === null ||
    Math.abs(growthFSigma8 - growthBase.derived.f_sigma8) > DEFAULT_TOLERANCE
  ) {
    return { computed: false, reason: "model.growth_child_derived_matches" };
  }

  const seed = rawModel.seedSpectrum ?? {};
  const aSeed = finiteNumberOrNull(seed.A_seed);
  const nS = finiteNumberOrNull(seed.n_s);
  const kPivot = finiteNumberOrNull(seed.k_pivot);
  if (aSeed === null || aSeed <= 0) {
    return { computed: false, reason: "model.seedSpectrum.A_seed_positive" };
  }
  if (Math.abs(aSeed - sigma8Seed ** 2) > DEFAULT_TOLERANCE) {
    return { computed: false, reason: "model.seedSpectrum.A_seed_matches_sigma8" };
  }
  if (nS === null || nS <= 0) {
    return { computed: false, reason: "model.seedSpectrum.n_s_positive" };
  }
  if (kPivot === null || kPivot <= 0) {
    return { computed: false, reason: "model.seedSpectrum.k_pivot_positive" };
  }

  const transferKernel = rawModel.transferKernel ?? {};
  const kDampBase = finiteNumberOrNull(transferKernel.k_damp_base);
  if (kDampBase === null || kDampBase <= 0) {
    return { computed: false, reason: "model.transferKernel.k_damp_base_positive" };
  }
  const kEq =
    keyValues.H_eff *
    Math.sqrt(growthBase.derived.omega_m_eff) /
    (keyValues.chi_sea * keyValues.Gamma_N);
  const kDamp = kDampBase / keyValues.chi_sea;
  if (!Number.isFinite(kEq) || kEq <= 0 || !Number.isFinite(kDamp) || kDamp <= 0) {
    return { computed: false, reason: "model.transferKernel.scales_positive" };
  }

  const samples = Array.isArray(rawModel.samples) ? rawModel.samples : [];
  const uniqueK = new Set(samples.map((sample) => finiteNumberOrNull(sample.k)));
  const uniqueZ = new Set(samples.map((sample) => finiteNumberOrNull(sample.z)));
  if (
    samples.length < 4 ||
    uniqueK.size < 2 ||
    uniqueZ.size < 2 ||
    uniqueK.has(null) ||
    uniqueZ.has(null)
  ) {
    return { computed: false, reason: "model.samples.matter_power_grid_minimum" };
  }

  const derivedSamples = [];
  const residuals = [];
  for (const sample of samples) {
    const sampleId = concreteString(sample.sampleId) ? sample.sampleId : null;
    const k = finiteNumberOrNull(sample.k);
    const z = finiteNumberOrNull(sample.z);
    if (!sampleId || k === null || k <= 0 || z === null || z < 0) {
      return { computed: false, reason: "model.samples.valid_k_z" };
    }
    const a = 1 / (1 + z);
    const e = Math.sqrt(growthBase.derived.omega_m_eff / a ** 3 + growthBase.derived.omega_de_eff);
    const omegaMA = growthBase.derived.omega_m_eff / (a ** 3 * e ** 2);
    const growthRateF = growthBase.derived.mu_growth * omegaMA ** growthBase.derived.gamma_growth;
    const growthFactor = a ** growthRateF;
    const q = k / kEq;
    const transfer = (1 / (1 + q ** 2)) * Math.exp(-((k / kDamp) ** 2));
    const seedPower = aSeed * (k / kPivot) ** nS;
    const matterPower = seedPower * transfer ** 2 * growthFactor ** 2;
    const observed = finiteNumberOrNull(sample.benchmark?.matter_power_observed);
    const sigma = finiteNumberOrNull(sample.benchmark?.sigma);
    const normalizedResidual =
      observed !== null && sigma !== null && sigma > 0
        ? Math.abs(matterPower - observed) / sigma
        : null;
    if (normalizedResidual !== null) {
      residuals.push(normalizedResidual);
    }
    derivedSamples.push({
      sampleId,
      k,
      z,
      a,
      E: e,
      Omega_m_a: omegaMA,
      growth_rate_f: growthRateF,
      growth_factor: growthFactor,
      q,
      transfer,
      seed_power: seedPower,
      matter_power: matterPower,
      matter_power_normalized_residual: normalizedResidual,
    });
  }
  if (residuals.length !== samples.length) {
    return { computed: false, reason: "model.samples.benchmark_residuals_declared" };
  }

  const {
    f_sigma8_normalized_residual: _fSigma8ScalarResidual,
    ...growthDerivedForMatter
  } = growthBase.derived;

  return {
    computed: true,
    reason: "computed",
    derived: {
      ...growthDerivedForMatter,
      A_seed: aSeed,
      n_s: nS,
      k_pivot: kPivot,
      k_eq: kEq,
      k_damp: kDamp,
      matter_power_grid_normalized_residual: Math.max(...residuals),
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
  return new Map((Array.isArray(rows) ? rows : []).map((row) => [row.key, finiteNumberOrNull(row.value)]));
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
}

function compareDerived(actual, expected, tolerances, missing) {
  const tolerance = finiteNumberOrNull(tolerances.derived) ?? DEFAULT_TOLERANCE;
  for (const [key, expectedValue] of Object.entries(expected)) {
    if (key === "samples" || key === "matter_power_grid_normalized_residual") {
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
      if (key === "sampleId" || key === "matter_power_normalized_residual") {
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
