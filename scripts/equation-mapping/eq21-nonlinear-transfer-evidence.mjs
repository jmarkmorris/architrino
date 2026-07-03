import fs from "node:fs";
import path from "node:path";
import { growthTransferEvidenceStatusForPath } from "./eq21-growth-transfer-evidence.mjs";
import {
  EQ21_MATTER_POWER_TRANSFER_KEYS,
  matterPowerTransferEvidenceStatusForPath,
} from "./eq21-matter-power-transfer-evidence.mjs";
import { lensingTransferEvidenceStatusForPath } from "./eq21-lensing-transfer-evidence.mjs";
import { shearRsdTransferEvidenceStatusForPath } from "./eq21-shear-rsd-transfer-evidence.mjs";
import { haloClusterTransferEvidenceStatusForPath } from "./eq21-halo-cluster-transfer-evidence.mjs";
import {
  sharedObservationEvidenceStatusForPath,
  sharedObservationSourcePathRejectionReason,
} from "./shared-observation-evidence.mjs";

export const EQ21_NONLINEAR_TRANSFER_EVIDENCE_SCHEMA =
  "aaa-equation-map-eq21-nonlinear-transfer-evidence/v1";

export const EQ21_NONLINEAR_TRANSFER_ROWS = Object.freeze([
  "nonlinear_transfer_child",
  "dimensionless_power_row",
  "nonlinear_response_row",
  "matter_power_parent_row",
  "lensing_parent_row",
  "shear_rsd_parent_row",
  "halo_cluster_parent_row",
  "nonlinear_grid",
  "source_provenance",
  "no_hidden_retune_witness",
]);

export const EQ21_NONLINEAR_TRANSFER_KEYS = EQ21_MATTER_POWER_TRANSFER_KEYS;

const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const DEFAULT_TOLERANCE = 1e-12;

export function nonlinearTransferEvidenceStatusForPath(value, { repoRoot }) {
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
  const objectStatus = evaluateNonlinearTransferEvidenceObject(raw, {
    repoRoot,
    sourcePath: resolvedPath,
  });
  return {
    ...objectStatus,
    resolvedPath,
    reason: objectStatus.accepted ? "accepted" : objectStatus.reason,
  };
}

export function evaluateNonlinearTransferEvidenceObject(
  raw,
  { repoRoot, sourcePath } = {},
) {
  const missing = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      accepted: false,
      reason: "nonlinear_transfer_evidence_not_json_object",
      missingOrRejectedFields: ["nonlinear_transfer_evidence_object"],
    };
  }
  if (raw.schema !== EQ21_NONLINEAR_TRANSFER_EVIDENCE_SCHEMA) {
    missing.push("nonlinear_transfer_evidence_schema");
  }
  const status = raw.evidenceStatus ?? raw.status ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    missing.push("nonlinear_transfer_evidence_status_accepted");
  }
  if (raw.authorization?.acceptedNonlinearTransferChild !== true) {
    missing.push("authorization.acceptedNonlinearTransferChild");
  }
  if (raw.authorization?.downstreamConsumerAuthorization !== true) {
    missing.push("authorization.downstreamConsumerAuthorization");
  }
  if ((raw.scoreDecision ?? raw.authorization?.scoreDecision) !== "no_score_increase") {
    missing.push("scoreDecision.no_score_increase");
  }

  const window = raw.window ?? {};
  for (const field of [
    "nonlinearTransferChildId",
    "haloClusterTransferChildId",
    "shearRsdTransferChildId",
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

  const lensingPath =
    raw.lensingTransferChild?.path ?? raw.lensingTransferChildPath;
  const lensing =
    repoRoot && lensingPath
      ? lensingTransferEvidenceStatusForPath(lensingPath, { repoRoot })
      : { accepted: false, reason: "missing_lensing_transfer_child_path" };
  if (!lensing.accepted) {
    missing.push(`lensingTransferChild.${lensing.reason}`);
  }
  const lensingChild = readJsonOrNull(lensingPath, repoRoot);
  const lensingWindow = lensingChild?.window ?? {};
  const lensingChildKeys = sharedKeyValues(lensingChild?.sharedKeys);

  const shearRsdPath =
    raw.shearRsdTransferChild?.path ?? raw.shearRsdTransferChildPath;
  const shearRsd =
    repoRoot && shearRsdPath
      ? shearRsdTransferEvidenceStatusForPath(shearRsdPath, { repoRoot })
      : { accepted: false, reason: "missing_shear_rsd_transfer_child_path" };
  if (!shearRsd.accepted) {
    missing.push(`shearRsdTransferChild.${shearRsd.reason}`);
  }
  const shearRsdChild = readJsonOrNull(shearRsdPath, repoRoot);
  const shearRsdWindow = shearRsdChild?.window ?? {};
  const shearRsdChildKeys = sharedKeyValues(shearRsdChild?.sharedKeys);

  const haloClusterPath =
    raw.haloClusterTransferChild?.path ?? raw.haloClusterTransferChildPath;
  const haloCluster =
    repoRoot && haloClusterPath
      ? haloClusterTransferEvidenceStatusForPath(haloClusterPath, { repoRoot })
      : { accepted: false, reason: "missing_halo_cluster_transfer_child_path" };
  if (!haloCluster.accepted) {
    missing.push(`haloClusterTransferChild.${haloCluster.reason}`);
  }
  const haloClusterChild = readJsonOrNull(haloClusterPath, repoRoot);
  const haloClusterWindow = haloClusterChild?.window ?? {};
  const haloClusterChildKeys = sharedKeyValues(haloClusterChild?.sharedKeys);

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
    if (
      concreteString(window[localField]) &&
      concreteString(lensingWindow[parentField]) &&
      window[localField] !== lensingWindow[parentField]
    ) {
      missing.push(`lensingTransferChild.${localField}_matches_parent`);
    }
    if (
      concreteString(window[localField]) &&
      concreteString(shearRsdWindow[parentField]) &&
      window[localField] !== shearRsdWindow[parentField]
    ) {
      missing.push(`shearRsdTransferChild.${localField}_matches_parent`);
    }
    if (
      concreteString(window[localField]) &&
      concreteString(haloClusterWindow[parentField]) &&
      window[localField] !== haloClusterWindow[parentField]
    ) {
      missing.push(`haloClusterTransferChild.${localField}_matches_parent`);
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
  if (
    concreteString(window.lensingTransferChildId) &&
    concreteString(lensingWindow.lensingTransferChildId) &&
    window.lensingTransferChildId !== lensingWindow.lensingTransferChildId
  ) {
    missing.push("lensingTransferChild.lensingTransferChildId_matches_parent");
  }
  if (
    concreteString(window.shearRsdTransferChildId) &&
    concreteString(shearRsdWindow.shearRsdTransferChildId) &&
    window.shearRsdTransferChildId !== shearRsdWindow.shearRsdTransferChildId
  ) {
    missing.push("shearRsdTransferChild.shearRsdTransferChildId_matches_parent");
  }
  if (
    concreteString(window.haloClusterTransferChildId) &&
    concreteString(haloClusterWindow.haloClusterTransferChildId) &&
    window.haloClusterTransferChildId !== haloClusterWindow.haloClusterTransferChildId
  ) {
    missing.push("haloClusterTransferChild.haloClusterTransferChildId_matches_parent");
  }

  const rows = raw.rows ?? {};
  for (const row of EQ21_NONLINEAR_TRANSFER_ROWS) {
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
  for (const key of EQ21_NONLINEAR_TRANSFER_KEYS) {
    const row = sharedKeys.get(key);
    requireAcceptedSharedKey({
      key,
      value: row,
      missing,
      parentGrowthKeys,
      growthChildKeys,
      matterChildKeys,
      lensingChildKeys,
      shearRsdChildKeys,
      haloClusterChildKeys,
      keyValues,
    });
  }

  const model = evaluateNonlinearTransferModel(
    raw.model ?? {},
    matterChild,
    lensingChild,
    shearRsdChild,
    haloClusterChild,
  );
  if (!model.computed) {
    missing.push(model.reason);
  } else {
    compareDerived(raw.model?.derived ?? {}, model.derived, raw.tolerances ?? {}, missing);
    const residual = finiteNumberOrNull(raw.residualComponents?.nonlinear_grid_normalized);
    if (residual === null || residual > (raw.tolerances?.residual ?? 1)) {
      missing.push("residualComponents.nonlinear_grid_normalized.within_tolerance");
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
        : "nonlinear_transfer_evidence_fields_missing",
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
    shearRsdTransferChildId: window.shearRsdTransferChildId ?? null,
    haloClusterTransferChildId: window.haloClusterTransferChildId ?? null,
    nonlinearTransferChildId: window.nonlinearTransferChildId ?? null,
    sharedObservation,
    growthTransfer,
    matterPower,
    lensing,
    shearRsd,
    haloCluster,
    model,
    sourcePath,
  };
}

export function evaluateNonlinearTransferModel(
  rawModel,
  matterChild,
  lensingChild,
  shearRsdChild,
  haloClusterChild,
) {
  const matterSamples = new Map(
    (Array.isArray(matterChild?.model?.derived?.samples)
      ? matterChild.model.derived.samples
      : []
    ).map((sample) => [sample.sampleId, sample]),
  );
  if (matterSamples.size === 0) {
    return { computed: false, reason: "model.matterPowerChild.samples_present" };
  }
  const lensingSamples = new Map(
    (Array.isArray(lensingChild?.model?.derived?.samples)
      ? lensingChild.model.derived.samples
      : []
    ).map((sample) => [sample.sampleId, sample]),
  );
  if (lensingSamples.size === 0) {
    return { computed: false, reason: "model.lensingTransferChild.samples_present" };
  }
  const shearRsdSamples = new Map(
    (Array.isArray(shearRsdChild?.model?.derived?.samples)
      ? shearRsdChild.model.derived.samples
      : []
    ).map((sample) => [sample.sampleId, sample]),
  );
  if (shearRsdSamples.size === 0) {
    return { computed: false, reason: "model.shearRsdTransferChild.samples_present" };
  }
  const haloClusterSamples = new Map(
    (Array.isArray(haloClusterChild?.model?.derived?.samples)
      ? haloClusterChild.model.derived.samples
      : []
    ).map((sample) => [sample.sampleId, sample]),
  );
  if (haloClusterSamples.size === 0) {
    return { computed: false, reason: "model.haloClusterTransferChild.samples_present" };
  }

  const nonlinearTransfer = rawModel.nonlinearTransfer ?? {};
  if (!ACCEPTED_STATUSES.has(nonlinearTransfer.status ?? null)) {
    return { computed: false, reason: "model.nonlinearTransfer.status_accepted" };
  }

  const samples = Array.isArray(rawModel.samples) ? rawModel.samples : [];
  const uniqueHaloClusterSamples = new Set(
    samples.map((sample) => sample.haloClusterSampleId),
  );
  if (
    samples.length < 3 ||
    uniqueHaloClusterSamples.size < 3 ||
    uniqueHaloClusterSamples.has(undefined)
  ) {
    return { computed: false, reason: "model.samples.nonlinear_grid_minimum" };
  }

  const derivedSamples = [];
  const residuals = [];
  for (const sample of samples) {
    const sampleId = concreteString(sample.sampleId) ? sample.sampleId : null;
    const haloClusterSampleId = concreteString(sample.haloClusterSampleId)
      ? sample.haloClusterSampleId
      : null;
    const shearRsdSampleId = concreteString(sample.shearRsdSampleId)
      ? sample.shearRsdSampleId
      : null;
    const matterSampleId = concreteString(sample.matterSampleId)
      ? sample.matterSampleId
      : null;
    const lensingSampleId = concreteString(sample.lensingSampleId)
      ? sample.lensingSampleId
      : null;
    if (!sampleId || !haloClusterSampleId) {
      return { computed: false, reason: "model.samples.valid_nonlinear_sample" };
    }
    const haloClusterSample = haloClusterSamples.get(haloClusterSampleId);
    if (!haloClusterSample) {
      return { computed: false, reason: "model.samples.halo_cluster_sample_exists" };
    }
    const parentShearRsdSampleId = concreteString(haloClusterSample.shearRsdSampleId)
      ? haloClusterSample.shearRsdSampleId
      : null;
    const parentLensingSampleId = concreteString(haloClusterSample.lensingSampleId)
      ? haloClusterSample.lensingSampleId
      : null;
    const parentMatterSampleId = concreteString(haloClusterSample.matterSampleId)
      ? haloClusterSample.matterSampleId
      : null;
    if (!parentShearRsdSampleId || !parentLensingSampleId || !parentMatterSampleId) {
      return { computed: false, reason: "model.samples.halo_cluster_parent_links" };
    }
    if (shearRsdSampleId && shearRsdSampleId !== parentShearRsdSampleId) {
      return { computed: false, reason: "model.samples.shear_rsd_halo_cluster_parent_match" };
    }
    if (lensingSampleId && lensingSampleId !== parentLensingSampleId) {
      return { computed: false, reason: "model.samples.lensing_halo_cluster_parent_match" };
    }
    if (matterSampleId && matterSampleId !== parentMatterSampleId) {
      return { computed: false, reason: "model.samples.matter_halo_cluster_parent_match" };
    }
    const shearRsdSample = shearRsdSamples.get(parentShearRsdSampleId);
    if (!shearRsdSample) {
      return { computed: false, reason: "model.samples.shear_rsd_sample_exists" };
    }
    const lensingSample = lensingSamples.get(parentLensingSampleId);
    if (!lensingSample) {
      return { computed: false, reason: "model.samples.lensing_sample_exists" };
    }
    if (
      concreteString(shearRsdSample.lensingSampleId) &&
      shearRsdSample.lensingSampleId !== parentLensingSampleId
    ) {
      return { computed: false, reason: "model.samples.lensing_shear_rsd_parent_match" };
    }
    if (
      concreteString(shearRsdSample.matterSampleId) &&
      shearRsdSample.matterSampleId !== parentMatterSampleId
    ) {
      return { computed: false, reason: "model.samples.matter_shear_rsd_parent_match" };
    }
    if (
      concreteString(lensingSample.matterSampleId) &&
      lensingSample.matterSampleId !== parentMatterSampleId
    ) {
      return { computed: false, reason: "model.samples.matter_lensing_parent_match" };
    }
    const matterSample = matterSamples.get(parentMatterSampleId);
    if (!matterSample) {
      return { computed: false, reason: "model.samples.matter_sample_exists" };
    }
    const k = finiteNumberOrNull(haloClusterSample.k);
    const z = finiteNumberOrNull(haloClusterSample.z);
    const matterPower = finiteNumberOrNull(haloClusterSample.matter_power);
    const parentMatterPower = finiteNumberOrNull(matterSample.matter_power);
    const pFromLensing = finiteNumberOrNull(haloClusterSample.P_lensing);
    const pFromShear = finiteNumberOrNull(haloClusterSample.P_shear);
    const pFromRsd = finiteNumberOrNull(haloClusterSample.P_RSD);
    const inheritedResidual = finiteNumberOrNull(
      haloClusterSample.halo_cluster_normalized_residual,
    );
    if (
      k === null ||
      k <= 0 ||
      z === null ||
      z < 0 ||
      matterPower === null ||
      matterPower < 0 ||
      parentMatterPower === null ||
      parentMatterPower < 0 ||
      pFromLensing === null ||
      pFromLensing < 0 ||
      pFromShear === null ||
      pFromShear < 0 ||
      pFromRsd === null ||
      pFromRsd < 0 ||
      inheritedResidual === null ||
      inheritedResidual < 0
    ) {
      return { computed: false, reason: "model.samples.matter_sample_valid" };
    }
    const parentConsensusResidual = Math.max(
      inheritedResidual,
      relativeDelta(parentMatterPower, matterPower),
      relativeDelta(pFromLensing, matterPower),
      relativeDelta(pFromShear, matterPower),
      relativeDelta(pFromRsd, matterPower),
    );
    const pConsensus = (matterPower + pFromLensing + pFromShear + pFromRsd) / 4;
    const deltaL2 = (k * k * k * pConsensus) / (2 * Math.PI * Math.PI);
    const nonlinearBoost = 1 + deltaL2;
    const pNonlinear = pConsensus * nonlinearBoost;
    const normalizedResidual = parentConsensusResidual;
    residuals.push(normalizedResidual);
    derivedSamples.push({
      sampleId,
      haloClusterSampleId,
      shearRsdSampleId: parentShearRsdSampleId,
      lensingSampleId: parentLensingSampleId,
      matterSampleId: parentMatterSampleId,
      k,
      z,
      P_linear: matterPower,
      P_parent_matter: parentMatterPower,
      P_lensing: pFromLensing,
      P_shear: pFromShear,
      P_RSD: pFromRsd,
      P_linear_consensus: pConsensus,
      Delta_L2: deltaL2,
      nonlinear_boost: nonlinearBoost,
      P_nonlinear: pNonlinear,
      parent_consensus_residual: parentConsensusResidual,
      nonlinear_normalized_residual: normalizedResidual,
    });
  }

  return {
    computed: true,
    reason: "computed",
    derived: {
      nonlinear_order: 1,
      nonlinear_grid_normalized_residual: Math.max(...residuals),
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
  lensingChildKeys,
  shearRsdChildKeys,
  haloClusterChildKeys,
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
  const lensingChildValue = lensingChildKeys.get(key);
  if (lensingChildValue === null || lensingChildValue === undefined) {
    missing.push(`sharedKeys.${key}.lensing_child_value`);
    return;
  }
  if (Math.abs(number - lensingChildValue) > DEFAULT_TOLERANCE) {
    missing.push(`sharedKeys.${key}.matches_lensing_child_value`);
  }
  const shearRsdChildValue = shearRsdChildKeys.get(key);
  if (shearRsdChildValue === null || shearRsdChildValue === undefined) {
    missing.push(`sharedKeys.${key}.shear_rsd_child_value`);
    return;
  }
  if (Math.abs(number - shearRsdChildValue) > DEFAULT_TOLERANCE) {
    missing.push(`sharedKeys.${key}.matches_shear_rsd_child_value`);
  }
  const haloClusterChildValue = haloClusterChildKeys.get(key);
  if (haloClusterChildValue === null || haloClusterChildValue === undefined) {
    missing.push(`sharedKeys.${key}.halo_cluster_child_value`);
    return;
  }
  if (Math.abs(number - haloClusterChildValue) > DEFAULT_TOLERANCE) {
    missing.push(`sharedKeys.${key}.matches_halo_cluster_child_value`);
  }
}

function compareDerived(actual, expected, tolerances, missing) {
  const tolerance = finiteNumberOrNull(tolerances.derived) ?? DEFAULT_TOLERANCE;
  for (const [key, expectedValue] of Object.entries(expected)) {
    if (key === "samples" || key === "nonlinear_grid_normalized_residual") {
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
      if (key === "sampleId" || key === "nonlinear_normalized_residual") {
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

function relativeDelta(actual, expected) {
  return Math.abs(actual - expected) / Math.max(Math.abs(expected), DEFAULT_TOLERANCE);
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
