export const BORG_CAUSAL_HISTORY_RETENTION_SCHEMA =
  "borg-causal-history-retention/v1";
export const BORG_CAUSAL_HISTORY_RETENTION_POLICY =
  "fixed-spherical-receiver-envelope";

export function createBorgCausalHistoryRetentionRequest({
  enabled = false,
  center,
  radius,
} = {}) {
  if (enabled !== true) {
    return null;
  }
  const normalizedCenter = ["x", "y", "z"].map((axis) => {
    const value = Number(center?.[axis]);
    if (!Number.isFinite(value)) {
      throw new TypeError(
        `Borg causal-history receiver envelope requires a finite ${axis} center.`,
      );
    }
    return String(value);
  });
  const normalizedRadius = Number(radius);
  if (!(normalizedRadius > 0) || !Number.isFinite(normalizedRadius)) {
    throw new TypeError(
      "Borg causal-history receiver envelope requires a positive finite radius.",
    );
  }
  return Object.freeze({
    schema: BORG_CAUSAL_HISTORY_RETENTION_SCHEMA,
    policy: BORG_CAUSAL_HISTORY_RETENTION_POLICY,
    receiverDomain: "all-requested-receiver-events-inside-envelope",
    center: Object.freeze(normalizedCenter),
    radius: String(normalizedRadius),
    outsideReceiverPolicy: "preserve-exact-history-no-retirement",
  });
}

export function applyBorgCausalHistoryRetention(histories, certificate) {
  if (certificate == null) {
    return histories;
  }
  if (!Array.isArray(histories) || histories.length === 0) {
    throw new TypeError(
      "Borg causal-history retirement requires retained histories.",
    );
  }
  if (certificate.schema !== BORG_CAUSAL_HISTORY_RETENTION_SCHEMA ||
      certificate.policy !== BORG_CAUSAL_HISTORY_RETENTION_POLICY ||
      !Array.isArray(certificate.paths) ||
      certificate.paths.length !== histories.length) {
    throw new Error("Borg EOM causal-history retention certificate is malformed.");
  }
  let changed = false;
  const retired = histories.map((history, index) => {
    const row = certificate.paths[index];
    if (String(row?.pathId) !== String(history.pathId) ||
        !Number.isSafeInteger(Number(row.retiredPrefixCount)) ||
        Number(row.retiredPrefixCount) < 0 ||
        typeof row.retainedCoverageStart !== "string" ||
        !Array.isArray(history.segments) || history.segments.length === 0) {
      throw new Error(
        "Borg EOM causal-history retention certificate reordered or omitted a path.",
      );
    }
    const retainedIndex = history.segments.findIndex(
      (segment) => String(segment.startTime) === row.retainedCoverageStart,
    );
    if (retainedIndex < 0) {
      throw new Error(
        `Borg EOM causal-history retention start is absent for path ${history.pathId}.`,
      );
    }
    const declaredRetired = Number(row.retiredPrefixCount);
    const alreadyApplied = retainedIndex === 0 &&
      String(history.coverageStart) === row.retainedCoverageStart;
    if (retainedIndex !== declaredRetired && !alreadyApplied) {
      throw new Error(
        `Borg EOM causal-history retired count is inconsistent for path ${history.pathId}.`,
      );
    }
    if (Number(row.retainedSegmentCount) !==
        history.segments.length - retainedIndex) {
      throw new Error(
        `Borg EOM causal-history retained count is inconsistent for path ${history.pathId}.`,
      );
    }
    if (retainedIndex === 0) {
      return history;
    }
    changed = true;
    return Object.freeze({
      ...history,
      coverageStart: row.retainedCoverageStart,
      segments: Object.freeze(history.segments.slice(retainedIndex)),
    });
  });
  return changed ? Object.freeze(retired) : histories;
}

export function validateBorgCausalHistoryRetentionCertificate(
  certificate,
  request,
) {
  if (request == null) {
    if (certificate != null) {
      throw new Error(
        "Borg EOM returned causal-history retirement without a requested receiver envelope.",
      );
    }
    return null;
  }
  const retiredTotal = Array.isArray(certificate?.paths)
    ? certificate.paths.reduce((sum, row) => {
        const count = Number(row?.retiredPrefixCount);
        return Number.isSafeInteger(count) && count >= 0
          ? sum + count
          : Number.NaN;
      }, 0)
    : Number.NaN;
  if (certificate?.schema !== request.schema ||
      certificate?.policy !== request.policy ||
      certificate?.receiverDomain !== request.receiverDomain ||
      certificate?.outsideReceiverPolicy !== request.outsideReceiverPolicy ||
      certificate?.radius !== request.radius ||
      !Array.isArray(certificate?.center) ||
      certificate.center.length !== 3 ||
      certificate.center.some((value, index) => value !== request.center[index]) ||
      certificate?.receiverDomainStatus !== "enclosed" ||
      !Number.isSafeInteger(Number(certificate?.totalRetiredSegmentCount)) ||
      Number(certificate.totalRetiredSegmentCount) < 0 ||
      retiredTotal !== Number(certificate.totalRetiredSegmentCount)) {
    throw new Error(
      "Borg EOM causal-history retention certificate does not match the requested receiver envelope.",
    );
  }
  return certificate;
}
