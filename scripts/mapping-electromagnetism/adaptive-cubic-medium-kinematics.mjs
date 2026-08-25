import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SNAPSHOT_SCHEMA = "adaptive_cubic_medium_snapshot/v1";
const EPS = 1e-12;
const DIRECTIONS = ["100", "110", "111"];
const REQUIRED_TRANSITION_EVIDENCE = {
  rankTransition: "bracketed_or_dwell_certified",
  roots: "certified_complete",
  identity: "preserved",
  pairClearance: "passed",
  speed: "passed",
  boundary: "closed",
  action: "closed",
  energy: "closed",
  momentum: "closed",
  angularMomentum: "closed",
  sourceRecoil: "closed",
  exteriorHistory: "closed",
};

function finiteNumber(value, name) {
  if (!Number.isFinite(value)) throw new TypeError(`${name} must be finite`);
  return value;
}

function vector(value, name, length = 3) {
  if (!Array.isArray(value) || value.length !== length) {
    throw new TypeError(`${name} must contain ${length} finite values`);
  }
  return value.map((entry, index) => finiteNumber(entry, `${name}[${index}]`));
}

function add(left, right) {
  return left.map((entry, index) => entry + right[index]);
}

function subtract(left, right) {
  return left.map((entry, index) => entry - right[index]);
}

function scale(value, factor) {
  return value.map((entry) => entry * factor);
}

function dot(left, right) {
  return left.reduce((sum, entry, index) => sum + entry * right[index], 0);
}

function norm(value) {
  return Math.hypot(...value);
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function transpose(matrix) {
  return matrix[0].map((_, column) => matrix.map((row) => row[column]));
}

function multiplyMatrices(left, right) {
  const rightTranspose = transpose(right);
  return left.map((row) => rightTranspose.map((column) => dot(row, column)));
}

function identityMatrix() {
  return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
}

function matrixSubtract(left, right) {
  return left.map((row, i) => row.map((entry, j) => entry - right[i][j]));
}

function matrixScale(matrix, factor) {
  return matrix.map((row) => row.map((entry) => entry * factor));
}

function maximumMatrixMagnitude(matrix) {
  return Math.max(...matrix.flat().map(Math.abs));
}

function outer(left, right) {
  return left.map((leftEntry) => right.map((rightEntry) =>
    leftEntry * rightEntry));
}

function matrixAdd(left, right) {
  return left.map((row, i) => row.map((entry, j) => entry + right[i][j]));
}

function labelKey(label) {
  return label.join(",");
}

function expectedPolarity(label, checkerboardPhase) {
  return checkerboardPhase * (label.reduce((sum, value) => sum + value, 0) % 2 === 0 ? 1 : -1);
}

function validateFrame(p, q, name, tolerance) {
  const checkedP = vector(p, `${name}.p`);
  const checkedQ = vector(q, `${name}.q`);
  const residual = Math.max(
    Math.abs(norm(checkedP) - 1),
    Math.abs(norm(checkedQ) - 1),
    Math.abs(dot(checkedP, checkedQ)),
  );
  if (residual > tolerance) {
    throw new RangeError(`${name} is not orthonormal within tolerance`);
  }
  return { p: checkedP, q: checkedQ, normal: cross(checkedP, checkedQ), residual };
}

function validateMember(member, index, checkerboardPhase, frameTolerance) {
  if (!member || typeof member !== "object") {
    throw new TypeError(`members[${index}] must be an object`);
  }
  if (typeof member.id !== "string" || member.id.length === 0) {
    throw new TypeError(`members[${index}].id must be a nonempty string`);
  }
  const label = vector(member.label, `members[${index}].label`).map((value) => {
    if (!Number.isInteger(value)) throw new TypeError("site labels must be integers");
    return value;
  });
  if (![1, -1].includes(member.polarity) ||
      member.polarity !== expectedPolarity(label, checkerboardPhase)) {
    throw new RangeError(`${member.id} violates the declared checkerboard polarity`);
  }
  const position = vector(member.position, `${member.id}.position`);
  const siteHistory = member.siteHistory;
  if (!siteHistory || typeof siteHistory !== "object") {
    throw new TypeError(`${member.id}.siteHistory must be declared`);
  }
  for (const field of ["historyFingerprint", "centerEstimatorId"]) {
    if (typeof siteHistory[field] !== "string" || siteHistory[field].length === 0) {
      throw new TypeError(`${member.id}.siteHistory.${field} must be declared`);
    }
  }
  if (!Array.isArray(siteHistory.historyWindow) || siteHistory.historyWindow.length !== 2) {
    throw new TypeError(`${member.id}.siteHistory.historyWindow must contain two times`);
  }
  const historyWindow = siteHistory.historyWindow.map((entry, windowIndex) =>
    finiteNumber(entry, `${member.id}.siteHistory.historyWindow[${windowIndex}]`));
  if (historyWindow[0] > historyWindow[1]) {
    throw new RangeError(`${member.id}.siteHistory.historyWindow must be ordered`);
  }
  const center = vector(siteHistory.center, `${member.id}.siteHistory.center`);
  const centerError = finiteNumber(
    siteHistory.centerError, `${member.id}.siteHistory.centerError`);
  if (centerError < 0) throw new RangeError("centerError must be nonnegative");
  const orbitRadius = finiteNumber(
    siteHistory.orbitRadius, `${member.id}.siteHistory.orbitRadius`);
  const orbitPhase = finiteNumber(
    siteHistory.orbitPhase, `${member.id}.siteHistory.orbitPhase`);
  if (orbitRadius < 0) throw new RangeError("orbitRadius must be nonnegative");
  const frame = validateFrame(
    siteHistory.frameP, siteHistory.frameQ,
    `${member.id}.siteHistory.frame`, frameTolerance);
  const reconstructedPosition = add(center, scale(add(
    scale(frame.p, Math.cos(orbitPhase)),
    scale(frame.q, Math.sin(orbitPhase)),
  ), orbitRadius));
  const reconstructionResidual = norm(subtract(position, reconstructedPosition));
  const declaredResidual = finiteNumber(
    siteHistory.reconstructionResidual,
    `${member.id}.siteHistory.reconstructionResidual`);
  if (declaredResidual < 0 || reconstructionResidual > declaredResidual + EPS) {
    throw new RangeError(`${member.id} exceeds its site-history reconstruction residual`);
  }
  return {
    ...member,
    label,
    position,
    siteHistory: {
      ...siteHistory,
      historyWindow,
      center,
      centerError,
      orbitRadius,
      orbitPhase,
      frameP: frame.p,
      frameQ: frame.q,
      frameNormal: frame.normal,
      frameResidual: frame.residual,
      reconstructionResidual,
    },
  };
}

function validateSnapshot(snapshot, options = {}) {
  if (!snapshot || snapshot.schema !== SNAPSHOT_SCHEMA) {
    throw new TypeError(`snapshot schema must be ${SNAPSHOT_SCHEMA}`);
  }
  const spacing = finiteNumber(snapshot.spacing, "snapshot.spacing");
  if (!(spacing > 0)) throw new RangeError("snapshot.spacing must be positive");
  const checkerboardPhase = snapshot.checkerboardPhase ?? 1;
  if (![1, -1].includes(checkerboardPhase)) {
    throw new RangeError("checkerboardPhase must be +1 or -1");
  }
  if (!Array.isArray(snapshot.members) || snapshot.members.length < 8) {
    throw new TypeError("snapshot must declare at least eight members");
  }
  const frameTolerance = options.frameTolerance ?? 1e-10;
  const members = snapshot.members.map((member, index) =>
    validateMember(member, index, checkerboardPhase, frameTolerance));
  for (const member of members) {
    if (snapshot.time < member.siteHistory.historyWindow[0] ||
        snapshot.time > member.siteHistory.historyWindow[1]) {
      throw new RangeError(`${member.id} history window does not contain snapshot.time`);
    }
  }
  if (new Set(members.map((member) => member.id)).size !== members.length) {
    throw new Error("member ids must be unique");
  }
  if (new Set(members.map((member) => labelKey(member.label))).size !== members.length) {
    throw new Error("site labels must be unique");
  }
  return {
    ...snapshot,
    time: finiteNumber(snapshot.time, "snapshot.time"),
    spacing,
    checkerboardPhase,
    members,
  };
}

function distanceInterval(left, right) {
  const nominal = norm(subtract(left.siteHistory.center, right.siteHistory.center));
  const error = left.siteHistory.centerError + right.siteHistory.centerError;
  return {
    nominal,
    lower: Math.max(0, nominal - error),
    upper: nominal + error,
  };
}

function neighborCertificate(receiver, members, coordination, gapFloor) {
  const rows = members.filter((member) => member.id !== receiver.id)
    .map((member) => ({ member, distance: distanceInterval(receiver, member) }))
    .sort((left, right) => left.distance.nominal - right.distance.nominal ||
      left.member.id.localeCompare(right.member.id));
  if (rows.length <= coordination) {
    return {
      memberId: receiver.id,
      status: "unresolved_insufficient_population",
      neighborIds: [],
      rankGapLower: null,
    };
  }
  const selected = rows.slice(0, coordination);
  const omitted = rows.slice(coordination);
  const selectedUpper = Math.max(...selected.map((row) => row.distance.upper));
  const omittedLower = Math.min(...omitted.map((row) => row.distance.lower));
  const rankGapLower = omittedLower - selectedUpper;
  return {
    memberId: receiver.id,
    status: rankGapLower > gapFloor ? "certified" : "unresolved_rank_overlap",
    neighborIds: selected.map((row) => row.member.id).sort(),
    rankGapLower,
    selectedDistanceUpper: selectedUpper,
    omittedDistanceLower: omittedLower,
  };
}

function referenceNeighbor(member, labelMap, axis, sign) {
  const label = [...member.label];
  label[axis] += sign;
  return labelMap.get(labelKey(label));
}

function deformationRecord(member, labelMap, spacing) {
  const columns = [];
  const neighborIds = [];
  for (let axis = 0; axis < 3; axis += 1) {
    const negative = referenceNeighbor(member, labelMap, axis, -1);
    const positive = referenceNeighbor(member, labelMap, axis, 1);
    if (!negative || !positive) return null;
    columns.push(scale(subtract(
      positive.siteHistory.center, negative.siteHistory.center), 1 / (2 * spacing)));
    neighborIds.push(negative.id, positive.id);
  }
  const deformationGradient = transpose(columns);
  const greenStrain = matrixScale(matrixSubtract(
    multiplyMatrices(transpose(deformationGradient), deformationGradient),
    identityMatrix(),
  ), 0.5);
  const rotationFacingSkew = matrixScale(matrixSubtract(
    deformationGradient, transpose(deformationGradient)), 0.5);
  return {
    memberId: member.id,
    referenceNeighborIds: neighborIds,
    deformationGradient,
    greenStrain,
    maximumGreenStrainMagnitude: maximumMatrixMagnitude(greenStrain),
    rotationFacingSkew,
    maximumRotationFacingSkewMagnitude: maximumMatrixMagnitude(rotationFacingSkew),
  };
}

export function analyzeSiteLocalSnapshot(snapshot, options = {}) {
  const checked = validateSnapshot(snapshot, options);
  const coordination = options.coordination ?? 6;
  if (coordination !== 6) {
    throw new RangeError("the cubic reference-order contract requires coordination 6");
  }
  const gapFloor = options.gapFloor ?? checked.spacing * 1e-8;
  if (!(gapFloor >= 0)) throw new RangeError("gapFloor must be nonnegative");
  const memberById = new Map(checked.members.map((member) => [member.id, member]));
  const labelMap = new Map(checked.members.map((member) =>
    [labelKey(member.label), member]));
  const probeIds = options.probeMemberIds ?? checked.members
    .filter((member) => [0, 1, 2].every((axis) =>
      referenceNeighbor(member, labelMap, axis, -1) &&
      referenceNeighbor(member, labelMap, axis, 1)))
    .map((member) => member.id);
  const probes = probeIds.map((id) => {
    const member = memberById.get(id);
    if (!member) throw new Error(`unknown probe member ${id}`);
    return member;
  });
  const neighborCertificates = probes.map((member) =>
    neighborCertificate(member, checked.members, coordination, gapFloor));
  const deformationRecords = probes.map((member) =>
    deformationRecord(member, labelMap, checked.spacing)).filter(Boolean);
  const allNeighborRanksCertified = neighborCertificates.every((row) =>
    row.status === "certified");
  return {
    schema: "adaptive_cubic_medium_snapshot_analysis/v1",
    claimBoundary: "geometric diagnostic; not EOM retention or constitutive evidence",
    time: checked.time,
    spacing: checked.spacing,
    checkerboardPhase: checked.checkerboardPhase,
    population: checked.members.length,
    probeMemberIds: probes.map((member) => member.id),
    allNeighborRanksCertified,
    neighborCertificates,
    deformationRecords,
    siteHistoryFingerprints: probes.map((member) => ({
      memberId: member.id,
      fingerprint: member.siteHistory.historyFingerprint,
      centerEstimatorId: member.siteHistory.centerEstimatorId,
    })),
  };
}

export function summarizeOrientationDistribution(snapshot, options = {}) {
  const checked = validateSnapshot(snapshot, options);
  const rawWeights = options.weights ?? Object.fromEntries(
    checked.members.map((member) => [member.id, 1]));
  const rows = checked.members.map((member) => {
    const weight = finiteNumber(rawWeights[member.id], `weights.${member.id}`);
    if (!(weight >= 0)) throw new RangeError("orientation weights must be nonnegative");
    return { member, weight };
  });
  const totalWeight = rows.reduce((sum, row) => sum + row.weight, 0);
  if (!(totalWeight > 0)) throw new RangeError("orientation weights must have positive sum");
  const normalizedRows = rows.map((row) => ({
    normal: row.member.siteHistory.frameNormal,
    weight: row.weight / totalWeight,
  }));
  const secondMoment = normalizedRows.reduce((sum, row) => matrixAdd(
    sum, matrixScale(outer(row.normal, row.normal), row.weight)),
  [[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const orderTensor = matrixSubtract(
    secondMoment, matrixScale(identityMatrix(), 1 / 3));
  const directions = options.directions ?? {
    "100": [1, 0, 0],
    "110": [1, 1, 0],
    "111": [1, 1, 1],
  };
  const fourthOrderDirectionalDiagnostics = {};
  for (const [directionId, rawDirection] of Object.entries(directions)) {
    const direction = vector(rawDirection, `directions.${directionId}`);
    const magnitude = norm(direction);
    if (!(magnitude > 0)) throw new RangeError("orientation direction must be nonzero");
    const unit = scale(direction, 1 / magnitude);
    fourthOrderDirectionalDiagnostics[directionId] = normalizedRows.reduce(
      (sum, row) => sum + row.weight * dot(row.normal, unit) ** 4, 0) - 1 / 5;
  }
  return {
    schema: "adaptive_cubic_medium_orientation_summary/v1",
    claimBoundary: "orientation-distribution geometry; not propagation isotropy",
    memberCount: checked.members.length,
    orderTensor,
    maximumOrderTensorMagnitude: maximumMatrixMagnitude(orderTensor),
    fourthOrderDirectionalDiagnostics,
  };
}

function evidenceResidual(evidence) {
  return Object.entries(REQUIRED_TRANSITION_EVIDENCE)
    .filter(([field, required]) => evidence?.[field] !== required)
    .map(([field, required]) => ({
      field,
      required,
      actual: evidence?.[field] ?? "missing",
    }));
}

export function buildNeighborReclassificationLedger({
  before,
  after,
  probeMemberIds,
  gapFloor,
  transitionEvidence = {},
} = {}) {
  const beforeAnalysis = analyzeSiteLocalSnapshot(before, {
    probeMemberIds, gapFloor,
  });
  const afterAnalysis = analyzeSiteLocalSnapshot(after, {
    probeMemberIds, gapFloor,
  });
  if (beforeAnalysis.spacing !== afterAnalysis.spacing ||
      beforeAnalysis.checkerboardPhase !== afterAnalysis.checkerboardPhase) {
    throw new Error("before and after snapshots do not share one cubic reference order");
  }
  const beforeMembers = new Map(before.members.map((member) => [member.id, member]));
  if (before.members.length !== after.members.length) {
    throw new Error("before and after snapshots must contain the same member population");
  }
  for (const member of after.members) {
    const prior = beforeMembers.get(member.id);
    if (!prior || prior.polarity !== member.polarity ||
        labelKey(prior.label) !== labelKey(member.label)) {
      throw new Error("member identity, polarity, and provenance label must persist");
    }
  }
  const beforeById = new Map(beforeAnalysis.neighborCertificates.map((row) =>
    [row.memberId, row]));
  const afterById = new Map(afterAnalysis.neighborCertificates.map((row) =>
    [row.memberId, row]));
  let events = beforeAnalysis.probeMemberIds.map((memberId) => {
    const left = beforeById.get(memberId);
    const right = afterById.get(memberId);
    const changed = left.neighborIds.join("|") !== right.neighborIds.join("|");
    return {
      memberId,
      changed,
      beforeStatus: left.status,
      afterStatus: right.status,
      beforeNeighborIds: left.neighborIds,
      afterNeighborIds: right.neighborIds,
      beforeRankGapLower: left.rankGapLower,
      afterRankGapLower: right.rankGapLower,
      removedNeighborIds: left.neighborIds.filter((id) => !right.neighborIds.includes(id)),
      addedNeighborIds: right.neighborIds.filter((id) => !left.neighborIds.includes(id)),
    };
  });
  const relatedMemberIds = [...new Set(events.flatMap((event) => [
    event.memberId,
    ...event.beforeNeighborIds,
    ...event.afterNeighborIds,
  ]))];
  const beforeRelated = analyzeSiteLocalSnapshot(before, {
    probeMemberIds: relatedMemberIds, gapFloor,
  });
  const afterRelated = analyzeSiteLocalSnapshot(after, {
    probeMemberIds: relatedMemberIds, gapFloor,
  });
  const beforeRelatedById = new Map(beforeRelated.neighborCertificates.map((row) =>
    [row.memberId, row]));
  const afterRelatedById = new Map(afterRelated.neighborCertificates.map((row) =>
    [row.memberId, row]));
  events = events.map((event) => ({
    ...event,
    reciprocalBefore: event.removedNeighborIds.every((neighborId) => {
      const row = beforeRelatedById.get(neighborId);
      return row?.status === "certified" && row.neighborIds.includes(event.memberId);
    }),
    reciprocalAfter: event.addedNeighborIds.every((neighborId) => {
      const row = afterRelatedById.get(neighborId);
      return row?.status === "certified" && row.neighborIds.includes(event.memberId);
    }),
  }));
  const unresolved = events.some((event) =>
    event.beforeStatus !== "certified" || event.afterStatus !== "certified" ||
    !event.reciprocalBefore || !event.reciprocalAfter);
  const changed = events.some((event) => event.changed);
  const missingEvidence = evidenceResidual(transitionEvidence);
  const decision = unresolved
    ? "neighbor_identity_unresolved"
    : !changed
    ? "no_reclassification"
    : missingEvidence.length > 0
    ? "kinematic_reclassification_only_missing_accounts"
    : "branch_reorganization_admissible_for_retention_test";
  return {
    schema: "adaptive_cubic_medium_neighbor_reclassification_ledger/v1",
    claimBoundary: "structural ledger; branch retention still requires a later history return",
    beforeTime: beforeAnalysis.time,
    afterTime: afterAnalysis.time,
    events,
    transitionEvidence,
    missingEvidence,
    decision,
  };
}

function directionalBlockers(records) {
  const blockers = [];
  for (const direction of DIRECTIONS) {
    const rows = records.filter((record) => record.direction === direction);
    for (const resolution of ["primary", "refined"]) {
      const count = rows.filter((record) => record.resolution === resolution).length;
      if (count === 0) {
        blockers.push(`missing_${direction}_${resolution}`);
      } else if (count > 1) {
        blockers.push(`duplicate_${direction}_${resolution}`);
      }
    }
  }
  for (const record of records) {
    if (!DIRECTIONS.includes(record.direction) ||
        !["primary", "refined"].includes(record.resolution)) {
      blockers.push("unexpected_direction_or_resolution");
    }
    if (record.backgroundHistoryReturn !== "accepted_one_period") {
      blockers.push(`${record.direction}_${record.resolution}_background_not_accepted`);
    }
    if (record.rootsStatus !== "certified_complete") {
      blockers.push(`${record.direction}_${record.resolution}_roots_incomplete`);
    }
    if (record.boundaryStatus !== "closed") {
      blockers.push(`${record.direction}_${record.resolution}_boundary_open`);
    }
    if (record.physicalReceiver?.status !== "accepted_retained_assembly" ||
        typeof record.physicalReceiver?.readoutMapFingerprint !== "string" ||
        record.physicalReceiver.readoutMapFingerprint.length === 0) {
      blockers.push(`${record.direction}_${record.resolution}_physical_receiver_missing`);
    }
  }
  const matchFields = [
    "campaignFingerprint", "backgroundFingerprint", "sourceFingerprint",
    "receiverFingerprint", "boundaryFingerprint", "sourceOrientationFingerprint",
    "receiverOrientationFingerprint", "transportRuleFingerprint", "distance",
  ];
  for (const field of matchFields) {
    const values = records.map((record) => record[field]);
    const missing = field === "distance"
      ? values.some((value) => !Number.isFinite(value) || !(value > 0))
      : values.some((value) => typeof value !== "string" || value.length === 0);
    if (missing) blockers.push(`missing_${field}`);
    if (new Set(values).size > 1) {
      blockers.push(`mismatched_${field}`);
    }
  }
  const readoutMapFingerprints = records.map((record) =>
    record.physicalReceiver?.readoutMapFingerprint);
  if (new Set(readoutMapFingerprints).size > 1) {
    blockers.push("mismatched_readoutMapFingerprint");
  }
  return [...new Set(blockers)];
}

function readoutKeys(records) {
  if (records.length === 0) return [];
  const keys = Object.keys(records[0].normalizedReadouts ?? {}).sort();
  for (const record of records) {
    const recordKeys = Object.keys(record.normalizedReadouts ?? {}).sort();
    if (recordKeys.join("|") !== keys.join("|")) {
      throw new Error("directional records must declare the same normalized readouts");
    }
    for (const key of keys) {
      finiteNumber(record.normalizedReadouts[key], `${record.direction}.${key}`);
    }
  }
  return keys;
}

export function adjudicateDirectionalRecords(records = [], options = {}) {
  if (!Array.isArray(records)) throw new TypeError("records must be an array");
  const tolerance = options.tolerance;
  if (!Number.isFinite(tolerance)) {
    throw new TypeError("a finite predeclared directional tolerance is required");
  }
  if (!(tolerance >= 0)) throw new RangeError("tolerance must be nonnegative");
  const blockers = directionalBlockers(records);
  const keys = readoutKeys(records);
  if (blockers.length > 0 || keys.length === 0) {
    return {
      schema: "adaptive_cubic_medium_directional_adjudication/v1",
      decision: "directional_campaign_blocked",
      blockers: blockers.length > 0 ? blockers : ["missing_normalized_readouts"],
      responseClaim: "not_available",
    };
  }
  const refined = new Map(records.filter((record) => record.resolution === "refined")
    .map((record) => [record.direction, record]));
  const primary = new Map(records.filter((record) => record.resolution === "primary")
    .map((record) => [record.direction, record]));
  const directionalResiduals = Object.fromEntries(keys.map((key) => {
    const values = DIRECTIONS.map((direction) =>
      refined.get(direction).normalizedReadouts[key]);
    return [key, Math.max(...values) - Math.min(...values)];
  }));
  const refinementResiduals = Object.fromEntries(keys.map((key) => [
    key,
    Math.max(...DIRECTIONS.map((direction) => Math.abs(
      refined.get(direction).normalizedReadouts[key] -
      primary.get(direction).normalizedReadouts[key],
    ))),
  ]));
  const maximumDirectionalResidual = Math.max(...Object.values(directionalResiduals));
  const maximumRefinementResidual = Math.max(...Object.values(refinementResiduals));
  if (maximumRefinementResidual > tolerance) {
    return {
      schema: "adaptive_cubic_medium_directional_adjudication/v1",
      claimBoundary: "refinement unresolved; no physical directional verdict",
      tolerance,
      directionalResiduals,
      refinementResiduals,
      maximumDirectionalResidual,
      maximumRefinementResidual,
      blockers: ["refinement_residual_exceeds_tolerance"],
      decision: "directional_campaign_blocked",
      responseClaim: "not_available",
    };
  }
  const pass = maximumDirectionalResidual <= tolerance;
  return {
    schema: "adaptive_cubic_medium_directional_adjudication/v1",
    claimBoundary: "bounded matched physical-receiver records; not global isotropy",
    tolerance,
    directionalResiduals,
    refinementResiduals,
    maximumDirectionalResidual,
    maximumRefinementResidual,
    blockers: [],
    decision: pass
      ? "adaptive_cubic_visibility_suppressed_within_declared_records"
      : "literal_cubic_architecture_rejected_for_claimed_isotropic_records",
    responseClaim: pass ? "bounded_directional_null" : "directional_visibility_measured",
  };
}

function parseCli(argv) {
  const input = argv.find((argument) => !argument.startsWith("--"));
  if (!input) {
    throw new TypeError(
      "usage: node adaptive-cubic-medium-kinematics.mjs SNAPSHOT.json");
  }
  return input;
}

if (process.argv[1] &&
    fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const snapshot = JSON.parse(fs.readFileSync(parseCli(process.argv.slice(2)), "utf8"));
  console.log(JSON.stringify(analyzeSiteLocalSnapshot(snapshot), null, 2));
}
