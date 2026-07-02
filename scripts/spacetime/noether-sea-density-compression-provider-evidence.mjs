import fs from "node:fs";
import path from "node:path";

export const PROVIDER_SCHEMA =
  "aaa-noether-sea-density-compression-provider/v1";

export const ACCEPTED_STATUSES = new Set(["accepted", "populated", "passed"]);

export const THETA_SEA_PROVIDER_ROWS = Object.freeze([
  "rho_NS",
  "n",
  "u_sea",
  "e_sea",
  "theta_sea",
  "f_N",
  "event_ledger_ref",
]);

export const REQUIRED_RESPONSE_PROVIDER_ROWS = Object.freeze([
  "channel_declaration_row",
  "speed_row",
  "causality_row",
  "correlation_row",
]);

export const STRESS_OR_METRIC_PROVIDER_ROWS = Object.freeze([
  "stress_strain_row",
  "metric_embedding_row",
]);

const REJECTED_BASENAME_FRAGMENTS = Object.freeze([
  "attempt",
  "mock",
  "negative-control",
  "source-contract",
  "contract",
  "probe",
  "fixture",
  ".tmp",
]);

export function providerEvidenceStatusForPath(value, { repoRoot }) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(repoRoot, sourcePath);
  const pathReason = providerSourcePathRejectionReason(resolvedPath, repoRoot);
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
  const objectStatus = evaluateThetaSeaRhoNsProviderObject(raw);
  return {
    ...objectStatus,
    resolvedPath,
    reason: objectStatus.accepted ? "accepted" : objectStatus.reason,
  };
}

export function providerSourcePathRejectionReason(filePath, repoRoot) {
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
    lowerBasename.includes(fragment)
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

export function evaluateThetaSeaRhoNsProviderObject(raw) {
  const missing = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      accepted: false,
      reason: "provider_object_not_json_object",
      missingOrRejectedFields: ["provider_object"],
    };
  }
  if (raw.schema !== PROVIDER_SCHEMA) {
    missing.push("provider_schema");
  }
  const status = raw.providerStatus ?? raw.status ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    missing.push("provider_status_accepted");
  }
  if (raw.authorization?.acceptedProvider !== true) {
    missing.push("authorization.acceptedProvider");
  }
  const window = raw.window ?? {};
  const requiredWindowFields = [
    "windowId",
    "ell",
    "retainedInventoryId",
    "smoothingKernelId",
    "eventLedgerId",
    "refinementFamilyId",
  ];
  for (const field of requiredWindowFields) {
    if (!concreteString(window[field] ?? raw[field])) {
      missing.push(`window.${field}`);
    }
  }
  const thetaRows = raw.thetaSeaRows ?? raw.window?.thetaSeaRows ?? {};
  for (const row of THETA_SEA_PROVIDER_ROWS) {
    requireAcceptedRow({
      row,
      value: thetaRows[row],
      missing,
      prefix: "thetaSeaRows",
      eventLedgerId: window.eventLedgerId ?? raw.eventLedgerId,
    });
  }
  const responseRows = raw.responseRows ?? raw.rows ?? {};
  for (const row of REQUIRED_RESPONSE_PROVIDER_ROWS) {
    requireAcceptedRow({
      row,
      value: responseRows[row],
      missing,
      prefix: "responseRows",
      eventLedgerId: window.eventLedgerId ?? raw.eventLedgerId,
    });
  }
  const stressAccepted = acceptedRow(responseRows.stress_strain_row);
  const metricAccepted = acceptedRow(responseRows.metric_embedding_row);
  if (!stressAccepted && !metricAccepted) {
    missing.push("responseRows.stress_strain_row_or_metric_embedding_row.accepted");
  }
  const retune = raw.retuneWitness ?? raw.retune ?? {};
  if (!acceptedRow(retune)) {
    missing.push("retuneWitness.accepted");
  }
  if (finiteNumberOrNull(retune.residual) !== 0) {
    missing.push("retuneWitness.zero_residual");
  }
  if (!Array.isArray(retune.changedRows) || retune.changedRows.length !== 0) {
    missing.push("retuneWitness.changedRows_empty");
  }
  const agreement =
    raw.acousticElasticAgreement ??
    raw.coefficientChecks?.acousticElasticAgreement ??
    {};
  if (!acceptedRow(agreement)) {
    missing.push("acousticElasticAgreement.accepted");
  }
  if (agreement.windowId !== (window.windowId ?? raw.windowId)) {
    missing.push("acousticElasticAgreement.same_window_id");
  }
  if (agreement.ell !== (window.ell ?? raw.ell)) {
    missing.push("acousticElasticAgreement.same_ell");
  }
  if (agreement.speedRowId !== responseRows.speed_row?.rowId) {
    missing.push("acousticElasticAgreement.speed_row_id");
  }
  if (
    responseRows.stress_strain_row &&
    agreement.stressStrainRowId !== responseRows.stress_strain_row.rowId
  ) {
    missing.push("acousticElasticAgreement.stress_strain_row_id");
  }
  if (agreement.rhoRowId !== thetaRows.rho_NS?.rowId) {
    missing.push("acousticElasticAgreement.rho_row_id");
  }
  const retuneWitnessId =
    retune.witnessId ?? retune.rowId ?? retune.eventLedgerRef ?? null;
  if (!concreteString(retuneWitnessId) || agreement.retuneWitnessId !== retuneWitnessId) {
    missing.push("acousticElasticAgreement.retune_witness_id");
  }
  const cDispSquared = finiteNumberOrNull(
    agreement.c_X_disp_squared ?? agreement.cDispSquared ?? agreement.c_disp_squared,
  );
  const C1111 = finiteNumberOrNull(
    agreement.C1111_X ?? agreement.C1111 ?? agreement.c1111,
  );
  const rhoNS = finiteNumberOrNull(agreement.rho_NS ?? agreement.rhoNS);
  const refinementError = finiteNumberOrNull(
    agreement.refinementError ?? agreement.epsilon_ref ?? agreement.tolerance,
  );
  const agreementResidual =
    cDispSquared !== null && C1111 !== null && rhoNS !== null && rhoNS > 0
      ? Math.abs(cDispSquared - C1111 / rhoNS)
      : null;
  if (
    agreementResidual === null ||
    refinementError === null ||
    refinementError < 0 ||
    agreementResidual > refinementError
  ) {
    missing.push("acousticElasticAgreement.numeric_residual_within_refinement");
  }
  const surfaceVector = raw.surfaceVector ?? raw.jacobian ?? {};
  if (!hasProjectedOutput(surfaceVector.delta_c_X_squared)) {
    missing.push("surfaceVector.delta_c_X_squared");
  }
  if (!hasProjectedOutput(surfaceVector.delta_C_ij_kl)) {
    missing.push("surfaceVector.delta_C_ij_kl");
  }
  return {
    accepted: missing.length === 0,
    reason: missing.length === 0 ? "accepted" : "provider_object_fields_missing",
    providerStatus: status,
    missingOrRejectedFields: missing,
    agreementResidual,
  };
}

function requireAcceptedRow({ row, value, missing, prefix, eventLedgerId }) {
  if (!acceptedRow(value)) {
    missing.push(`${prefix}.${row}.accepted`);
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return;
  }
  const id =
    value.rowId ?? value.eventId ?? value.eventLedgerRef ?? value.witnessId ?? null;
  if (!concreteString(id)) {
    missing.push(`${prefix}.${row}.row_reference`);
  }
  if (
    row !== "event_ledger_ref" &&
    concreteString(eventLedgerId) &&
    value.eventLedgerRef !== eventLedgerId
  ) {
    missing.push(`${prefix}.${row}.same_event_ledger`);
  }
}

function acceptedRow(value) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    ACCEPTED_STATUSES.has(value.status)
  );
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
