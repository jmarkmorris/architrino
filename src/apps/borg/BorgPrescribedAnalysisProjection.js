export const BORG_PRESCRIBED_ANALYSIS_PROJECTION_SCHEMA =
  "borg-prescribed-analysis-projection.v1";

export const BORG_PRESCRIBED_ANALYSIS_EVENT_STATUS = Object.freeze({
  EVALUATED: "evaluated",
  DRAWN_NOT_EVALUATED: "drawn-not-evaluated",
  UNRESOLVED: "unresolved",
  INVALIDATED: "invalidated",
  UNAVAILABLE: "unavailable",
});

const EVENT_STATUSES = new Set(Object.values(BORG_PRESCRIBED_ANALYSIS_EVENT_STATUS));
const SHA256_PATTERN = /^[0-9a-f]{64}$/;

const TOP_LEVEL_FIELDS = Object.freeze([
  "schema",
  "projectionId",
  "projectionHash",
  "displaySource",
  "analysisSource",
  "provenance",
  "fieldSpeed",
  "events",
  "branches",
  "provider",
]);
const DISPLAY_SOURCE_FIELDS = Object.freeze(["recordId", "recordHash"]);
const ANALYSIS_SOURCE_FIELDS = Object.freeze(["recordId", "sourceHash"]);
const PROVENANCE_FIELDS = Object.freeze([
  "sourceHash",
  "protocolHash",
  "implementationHash",
  "resultHash",
  "caseHash",
  "campaignHash",
]);
const PROVIDER_FIELDS = Object.freeze(["kind", "capabilityLabel", "generatedAt"]);
const EVENT_FIELDS = Object.freeze([
  "eventId",
  "status",
  "receiver",
  "retainedHistory",
  "rootCompleteness",
  "roots",
  "noRootTransmitters",
  "unresolvedIntervals",
  "drawnNotEvaluatedReason",
]);
const RECEIVER_FIELDS = Object.freeze([
  "identity",
  "id",
  "kind",
  "sourceWorldlineId",
  "polarity",
  "receptionTime",
  "position",
]);
const ROOT_COMPLETENESS_FIELDS = Object.freeze([
  "policy",
  "complete",
  "reason",
]);
const ROOT_FIELDS = Object.freeze([
  "rootId",
  "rootOrdinal",
  "transmitterId",
  "binaryId",
  "emissionTime",
  "receptionTime",
  "delay",
  "transmitterPosition",
  "receiverPosition",
  "direction",
  "distance",
  "finalBracket",
  "transmitterSideFactorDt",
  "rootCompletenessStatus",
  "accelerationContribution",
  "rootIsolationMethod",
]);
const NO_ROOT_FIELDS = Object.freeze([
  "transmitterId",
  "retainedInterval",
  "reason",
]);
const UNRESOLVED_FIELDS = Object.freeze([
  "intervalId",
  "transmitterId",
  "emissionInterval",
  "startPosition",
  "endPosition",
  "reason",
]);
const DRAWN_NOT_EVALUATED_REASON_FIELDS = Object.freeze(["code", "message"]);
const BRANCH_FIELDS = Object.freeze([
  "branchId",
  "transmitterId",
  "rootOrdinal",
  "interpolationAuthorized",
  "points",
]);
const BRANCH_POINT_FIELDS = Object.freeze([
  "eventId",
  "receptionTime",
  "emissionTime",
  "status",
]);

export function validateBorgPrescribedAnalysisProjection(raw, expected = {}) {
  const projection = object(raw, "projection");
  exactFields(projection, TOP_LEVEL_FIELDS, "projection");
  if (projection.schema !== BORG_PRESCRIBED_ANALYSIS_PROJECTION_SCHEMA) {
    throw new TypeError(
      `Borg prescribed analysis requires schema ${BORG_PRESCRIBED_ANALYSIS_PROJECTION_SCHEMA}.`,
    );
  }
  concreteString(projection.projectionId, "projection.projectionId");
  sha256(projection.projectionHash, "projection.projectionHash");
  const displaySource = validateIdentityObject(
    projection.displaySource,
    DISPLAY_SOURCE_FIELDS,
    "projection.displaySource",
  );
  sha256(displaySource.recordHash, "projection.displaySource.recordHash");
  const analysisSource = validateIdentityObject(
    projection.analysisSource,
    ANALYSIS_SOURCE_FIELDS,
    "projection.analysisSource",
  );
  sha256(analysisSource.sourceHash, "projection.analysisSource.sourceHash");
  const provenance = object(projection.provenance, "projection.provenance");
  exactFields(provenance, PROVENANCE_FIELDS, "projection.provenance");
  for (const field of ["sourceHash", "protocolHash", "implementationHash", "resultHash"]) {
    sha256(provenance[field], `projection.provenance.${field}`);
  }
  optionalSha256(provenance.caseHash, "projection.provenance.caseHash");
  optionalSha256(provenance.campaignHash, "projection.provenance.campaignHash");
  if (analysisSource.sourceHash !== provenance.sourceHash) {
    throw new Error("Borg prescribed analysis source hashes disagree inside the projection.");
  }
  if (finiteNumber(projection.fieldSpeed, "projection.fieldSpeed") !== 1) {
    throw new RangeError("Borg prescribed analysis requires normalized fieldSpeed c_f=1.");
  }
  const provider = object(projection.provider, "projection.provider");
  exactFields(provider, PROVIDER_FIELDS, "projection.provider");
  concreteString(provider.kind, "projection.provider.kind");
  concreteString(provider.capabilityLabel, "projection.provider.capabilityLabel");
  concreteString(provider.generatedAt, "projection.provider.generatedAt");
  if (!Array.isArray(projection.events)) {
    throw new TypeError("projection.events must be an array.");
  }
  const events = projection.events.map(validateEvent);
  unique(events.map((event) => event.eventId), "projection event id");
  unique(
    events.map((event) => event.receiver.identity),
    "projection receiver identity",
  );
  if (!Array.isArray(projection.branches)) {
    throw new TypeError("projection.branches must be an array.");
  }
  const branches = projection.branches.map(validateBranch);
  unique(branches.map((branch) => branch.branchId), "projection branch id");
  const eventIds = new Set(events.map((event) => event.eventId));
  branches.forEach((branch, branchIndex) => {
    branch.points.forEach((point, pointIndex) => {
      if (!eventIds.has(point.eventId)) {
        throw new Error(
          `projection.branches[${branchIndex}].points[${pointIndex}] references an unknown event id.`,
        );
      }
    });
  });

  mismatch(expected.displayRecordId, displaySource.recordId, "display record id");
  mismatch(expected.displayRecordHash, displaySource.recordHash, "display record hash");
  mismatch(expected.analysisSourceHash, provenance.sourceHash, "analysis source hash");
  mismatch(expected.protocolHash, provenance.protocolHash, "protocol hash");

  return deepFreeze({
    ...projection,
    displaySource: { ...displaySource },
    analysisSource: { ...analysisSource },
    provenance: { ...provenance },
    provider: { ...provider },
    events,
    branches,
  });
}

export async function verifyBorgPrescribedAnalysisProjectionHash(
  projection,
  { cryptoLike = globalThis.crypto } = {},
) {
  const validated = validateBorgPrescribedAnalysisProjection(projection);
  const expected = await hashBorgPrescribedAnalysisProjection(validated, { cryptoLike });
  if (validated.projectionHash !== expected) {
    throw new Error(
      `Borg prescribed analysis projection hash mismatch: expected ${expected}, received ${validated.projectionHash}.`,
    );
  }
  return validated;
}

export async function sealBorgPrescribedAnalysisProjection(
  projectionWithoutHash,
  { cryptoLike = globalThis.crypto } = {},
) {
  const candidate = {
    ...projectionWithoutHash,
    projectionHash: "0".repeat(64),
  };
  const projectionHash = await hashBorgPrescribedAnalysisProjection(candidate, { cryptoLike });
  return validateBorgPrescribedAnalysisProjection({
    ...candidate,
    projectionHash,
  });
}

export async function hashBorgPrescribedAnalysisProjection(
  projection,
  { cryptoLike = globalThis.crypto } = {},
) {
  const preimage = { ...projection };
  delete preimage.projectionHash;
  return sha256Text(canonicalJson(preimage), cryptoLike);
}

export async function sha256BorgCanonicalJson(
  value,
  { cryptoLike = globalThis.crypto } = {},
) {
  return sha256Text(canonicalJson(value), cryptoLike);
}

/**
 * Thin producer-side adapter from the canonical evaluator packet to Borg's
 * browser-safe projection. It performs no root solving or analytical
 * acceleration calculation.
 */
export async function createBorgPrescribedAnalysisProjection({
  packet,
  displayRecordId,
  displayRecordHash,
  implementationHash,
  caseHash = null,
  campaignHash = null,
  generatedAt,
  providerKind = "precomputed-static",
  capabilityLabel = "Precomputed canonical prescribed-path analysis",
  cryptoLike = globalThis.crypto,
}) {
  if (packet?.schema !== "prescribed-path-analysis/result-packet.v1") {
    throw new TypeError(
      "Borg projection adapter requires prescribed-path-analysis/result-packet.v1.",
    );
  }
  sha256(packet.source?.sourceHash, "packet.source.sourceHash");
  sha256(packet.protocolHash, "packet.protocolHash");
  sha256(packet.resultHash, "packet.resultHash");
  sha256(implementationHash, "implementationHash");
  sha256(displayRecordHash, "displayRecordHash");
  optionalSha256(caseHash, "caseHash");
  optionalSha256(campaignHash, "campaignHash");
  const events = packet.rawLedgers?.causalRoots;
  if (!Array.isArray(events)) {
    throw new TypeError("canonical evaluator packet lacks rawLedgers.causalRoots.");
  }
  const projectedEvents = [];
  const binaryByWorldline = sourceBinaryMembership(packet.source);
  for (const event of events) {
    for (const response of event.measures?.probeResponses ?? []) {
      projectedEvents.push(projectEvent(
        event,
        response.probePolarity,
        binaryByWorldline,
      ));
    }
  }
  const projectionId =
    `${displayRecordId}:${packet.protocolHash}:${packet.resultHash}`;
  return sealBorgPrescribedAnalysisProjection({
    schema: BORG_PRESCRIBED_ANALYSIS_PROJECTION_SCHEMA,
    projectionId,
    displaySource: {
      recordId: concreteString(displayRecordId, "displayRecordId"),
      recordHash: displayRecordHash,
    },
    analysisSource: {
      recordId: concreteString(packet.source?.recordId, "packet.source.recordId"),
      sourceHash: packet.source.sourceHash,
    },
    provenance: {
      sourceHash: packet.source.sourceHash,
      protocolHash: packet.protocolHash,
      implementationHash,
      resultHash: packet.resultHash,
      caseHash,
      campaignHash,
    },
    fieldSpeed: packet.protocol?.fieldSpeed,
    events: projectedEvents,
    branches: projectBranches(projectedEvents),
    provider: {
      kind: providerKind,
      capabilityLabel,
      generatedAt: concreteString(generatedAt, "generatedAt"),
    },
  }, { cryptoLike });
}

export function findBorgPrescribedAnalysisEvent(projection, receiverIdentity) {
  const identity = concreteString(receiverIdentity, "receiverIdentity");
  return projection.events.find((event) => event.receiver.identity === identity) ?? null;
}

export function createBorgReceiverEventIdentity({
  kind,
  id,
  polarity,
  receptionTime,
  position,
}) {
  const receiverKind = concreteString(kind, "receiver.kind");
  const receiverId = concreteString(id, "receiver.id");
  const receiverPolarity = finiteNonzero(polarity, "receiver.polarity");
  const time = finiteNumber(receptionTime, "receiver.receptionTime");
  const point = vector(position, "receiver.position");
  return `${receiverKind}:${receiverId}:polarity=${receiverPolarity}:T=${numberToken(time)}:` +
    `X=${numberToken(point.x)},${numberToken(point.y)},${numberToken(point.z)}`;
}

export function canonicalJson(value) {
  return JSON.stringify(canonicalize(value));
}

function projectEvent(event, polarity, binaryByWorldline) {
  const receiverId = event.receiverSourceId ?? event.probeId;
  const receiverKind = event.receiverSourceId == null
    ? "virtual-probe"
    : "source-worldline";
  const receiver = {
    id: receiverId,
    kind: receiverKind,
    sourceWorldlineId: event.receiverSourceId ?? null,
    polarity,
    receptionTime: event.observationTime,
    position: event.probePosition,
  };
  receiver.identity = createBorgReceiverEventIdentity({
    kind: receiverKind,
    id: receiverId,
    polarity,
    receptionTime: event.observationTime,
    position: event.probePosition,
  });
  return {
    eventId: `${event.eventId}:polarity=${polarity}`,
    status: BORG_PRESCRIBED_ANALYSIS_EVENT_STATUS.EVALUATED,
    receiver,
    retainedHistory: evaluatorInterval(
      event.retainedHistory,
      "canonical evaluator event retainedHistory",
    ),
    rootCompleteness: {
      policy: event.rootCompletenessCertification?.policy,
      complete: event.rootCompletenessCertification?.complete,
      reason: event.rootCompletenessCertification?.reason,
    },
    roots: (event.roots ?? []).map((root) => ({
      rootId: root.rootId,
      rootOrdinal: root.rootOrdinal,
      transmitterId: root.transmitterId,
      binaryId: binaryByWorldline.get(root.transmitterId) ?? null,
      emissionTime: root.emissionTime,
      receptionTime: root.receptionTime,
      delay: root.delay,
      transmitterPosition: root.transmitterPosition,
      receiverPosition: event.probePosition,
      direction: root.direction,
      distance: root.distance,
      finalBracket: root.finalBracket,
      transmitterSideFactorDt: root.transmitterSideFactorDt,
      rootCompletenessStatus: event.rootCompletenessCertification?.complete
        ? "certified-complete"
        : "not-certified",
      accelerationContribution:
        root.probeAccelerationContributions?.find(
          (row) => row.probePolarity === polarity,
        )?.acceleration ?? null,
      rootIsolationMethod: root.rootIsolationCertificate?.method ??
        "strictly-monotone-simple-root",
    })),
    noRootTransmitters: (event.noRootTransmitters ?? []).map((row) => ({
      transmitterId: row.transmitterId,
      retainedInterval: row.retainedInterval,
      reason: row.reason,
    })),
    unresolvedIntervals: [],
    drawnNotEvaluatedReason: null,
  };
}

function sourceBinaryMembership(source) {
  const membership = new Map();
  for (const braid of source?.parameterVector?.braids ?? []) {
    for (const binary of braid?.binaries ?? []) {
      for (const worldlineId of binary?.worldlineIds ?? []) {
        membership.set(String(worldlineId), String(binary.binaryId));
      }
    }
  }
  return membership;
}

function evaluatorInterval(value, label) {
  if (Array.isArray(value)) {
    return value;
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return [value.start, value.end];
  }
  throw new TypeError(`${label} is unavailable.`);
}

function projectBranches(events) {
  const grouped = new Map();
  for (const event of events) {
    for (const root of event.roots) {
      const key = `${root.transmitterId}:root-${root.rootOrdinal}`;
      const branch = grouped.get(key) ?? {
        branchId: key,
        transmitterId: root.transmitterId,
        rootOrdinal: root.rootOrdinal,
        interpolationAuthorized: false,
        points: [],
      };
      if (!branch.points.some(
        (point) => point.receptionTime === root.receptionTime &&
          point.emissionTime === root.emissionTime,
      )) {
        branch.points.push({
          eventId: event.eventId,
          receptionTime: root.receptionTime,
          emissionTime: root.emissionTime,
          status: "evaluated",
        });
      }
      grouped.set(key, branch);
    }
  }
  return [...grouped.values()].filter((branch) => branch.points.length > 1);
}

function validateEvent(raw, index) {
  const label = `projection.events[${index}]`;
  const event = object(raw, label);
  exactFields(event, EVENT_FIELDS, label);
  concreteString(event.eventId, `${label}.eventId`);
  if (!EVENT_STATUSES.has(event.status)) {
    throw new TypeError(`${label}.status is unsupported.`);
  }
  const receiver = object(event.receiver, `${label}.receiver`);
  exactFields(receiver, RECEIVER_FIELDS, `${label}.receiver`);
  concreteString(receiver.identity, `${label}.receiver.identity`);
  concreteString(receiver.id, `${label}.receiver.id`);
  concreteString(receiver.kind, `${label}.receiver.kind`);
  optionalString(receiver.sourceWorldlineId, `${label}.receiver.sourceWorldlineId`);
  finiteNonzero(receiver.polarity, `${label}.receiver.polarity`);
  finiteNumber(receiver.receptionTime, `${label}.receiver.receptionTime`);
  vector(receiver.position, `${label}.receiver.position`);
  const retainedHistory = interval(event.retainedHistory, `${label}.retainedHistory`);
  const rootCompleteness = object(
    event.rootCompleteness,
    `${label}.rootCompleteness`,
  );
  exactFields(
    rootCompleteness,
    ROOT_COMPLETENESS_FIELDS,
    `${label}.rootCompleteness`,
  );
  concreteString(rootCompleteness.policy, `${label}.rootCompleteness.policy`);
  if (typeof rootCompleteness.complete !== "boolean") {
    throw new TypeError(`${label}.rootCompleteness.complete must be boolean.`);
  }
  concreteString(rootCompleteness.reason, `${label}.rootCompleteness.reason`);
  if (!Array.isArray(event.roots) ||
      !Array.isArray(event.noRootTransmitters) ||
      !Array.isArray(event.unresolvedIntervals)) {
    throw new TypeError(`${label} root, root-free, and unresolved rows must be arrays.`);
  }
  const roots = event.roots.map((root, rootIndex) =>
    validateRoot(root, `${label}.roots[${rootIndex}]`));
  unique(roots.map((root) => root.rootId), `${label} root id`);
  const noRootTransmitters = event.noRootTransmitters.map((row, rowIndex) =>
    validateNoRoot(row, `${label}.noRootTransmitters[${rowIndex}]`));
  unique(
    noRootTransmitters.map((row) => row.transmitterId),
    `${label} root-free transmitter`,
  );
  const unresolvedIntervals = event.unresolvedIntervals.map((row, rowIndex) =>
    validateUnresolved(row, `${label}.unresolvedIntervals[${rowIndex}]`));
  unique(
    unresolvedIntervals.map((row) => row.intervalId),
    `${label} unresolved interval`,
  );
  const drawnNotEvaluatedReason = validateDrawnNotEvaluatedReason(
    event.drawnNotEvaluatedReason,
    `${label}.drawnNotEvaluatedReason`,
  );
  if (event.status === BORG_PRESCRIBED_ANALYSIS_EVENT_STATUS.EVALUATED &&
      unresolvedIntervals.length > 0) {
    throw new Error(`${label} cannot be evaluated while retaining unresolved intervals.`);
  }
  if (event.status === BORG_PRESCRIBED_ANALYSIS_EVENT_STATUS.DRAWN_NOT_EVALUATED &&
      !event.drawnNotEvaluatedReason) {
    throw new Error(`${label} drawn-not-evaluated status requires a structured reason.`);
  }
  return deepFreeze({
    ...event,
    receiver: { ...receiver },
    retainedHistory,
    rootCompleteness: { ...rootCompleteness },
    roots,
    noRootTransmitters,
    unresolvedIntervals,
    drawnNotEvaluatedReason,
  });
}

function validateDrawnNotEvaluatedReason(value, label) {
  if (value == null) return null;
  const reason = object(value, label);
  exactFields(reason, DRAWN_NOT_EVALUATED_REASON_FIELDS, label);
  concreteString(reason.code, `${label}.code`);
  concreteString(reason.message, `${label}.message`);
  return { ...reason };
}

function validateRoot(raw, label) {
  const root = object(raw, label);
  exactFields(root, ROOT_FIELDS, label);
  concreteString(root.rootId, `${label}.rootId`);
  nonnegativeInteger(root.rootOrdinal, `${label}.rootOrdinal`);
  concreteString(root.transmitterId, `${label}.transmitterId`);
  optionalString(root.binaryId, `${label}.binaryId`);
  finiteNumber(root.emissionTime, `${label}.emissionTime`);
  finiteNumber(root.receptionTime, `${label}.receptionTime`);
  nonnegative(root.delay, `${label}.delay`);
  vector(root.transmitterPosition, `${label}.transmitterPosition`);
  vector(root.receiverPosition, `${label}.receiverPosition`);
  vector(root.direction, `${label}.direction`);
  nonnegative(root.distance, `${label}.distance`);
  interval(root.finalBracket, `${label}.finalBracket`);
  finiteNumber(root.transmitterSideFactorDt, `${label}.transmitterSideFactorDt`);
  concreteString(root.rootCompletenessStatus, `${label}.rootCompletenessStatus`);
  nullableVector(root.accelerationContribution, `${label}.accelerationContribution`);
  concreteString(root.rootIsolationMethod, `${label}.rootIsolationMethod`);
  if (root.receptionTime < root.emissionTime ||
      Math.abs(root.receptionTime - root.emissionTime - root.delay) >
        1e-10 * Math.max(1, Math.abs(root.delay))) {
    throw new Error(`${label} has an inconsistent emission, reception, or delay row.`);
  }
  return deepFreeze({ ...root });
}

function validateNoRoot(raw, label) {
  const row = object(raw, label);
  exactFields(row, NO_ROOT_FIELDS, label);
  concreteString(row.transmitterId, `${label}.transmitterId`);
  interval(row.retainedInterval, `${label}.retainedInterval`);
  concreteString(row.reason, `${label}.reason`);
  return deepFreeze({ ...row });
}

function validateUnresolved(raw, label) {
  const row = object(raw, label);
  exactFields(row, UNRESOLVED_FIELDS, label);
  concreteString(row.intervalId, `${label}.intervalId`);
  concreteString(row.transmitterId, `${label}.transmitterId`);
  interval(row.emissionInterval, `${label}.emissionInterval`);
  vector(row.startPosition, `${label}.startPosition`);
  vector(row.endPosition, `${label}.endPosition`);
  concreteString(row.reason, `${label}.reason`);
  return deepFreeze({ ...row });
}

function validateBranch(raw, index) {
  const label = `projection.branches[${index}]`;
  const branch = object(raw, label);
  exactFields(branch, BRANCH_FIELDS, label);
  concreteString(branch.branchId, `${label}.branchId`);
  concreteString(branch.transmitterId, `${label}.transmitterId`);
  nonnegativeInteger(branch.rootOrdinal, `${label}.rootOrdinal`);
  if (typeof branch.interpolationAuthorized !== "boolean") {
    throw new TypeError(`${label}.interpolationAuthorized must be boolean.`);
  }
  if (!Array.isArray(branch.points)) {
    throw new TypeError(`${label}.points must be an array.`);
  }
  const points = branch.points.map((rawPoint, pointIndex) => {
    const pointLabel = `${label}.points[${pointIndex}]`;
    const point = object(rawPoint, pointLabel);
    exactFields(point, BRANCH_POINT_FIELDS, pointLabel);
    concreteString(point.eventId, `${pointLabel}.eventId`);
    finiteNumber(point.receptionTime, `${pointLabel}.receptionTime`);
    finiteNumber(point.emissionTime, `${pointLabel}.emissionTime`);
    concreteString(point.status, `${pointLabel}.status`);
    return deepFreeze({ ...point });
  });
  return deepFreeze({ ...branch, points });
}

function validateIdentityObject(value, fields, label) {
  const row = object(value, label);
  exactFields(row, fields, label);
  fields.forEach((field) => concreteString(row[field], `${label}.${field}`));
  return { ...row };
}

function exactFields(value, fields, label) {
  const expected = new Set(fields);
  const actual = Object.keys(value);
  const unknown = actual.filter((field) => !expected.has(field));
  const missing = fields.filter((field) => !actual.includes(field));
  if (unknown.length > 0 || missing.length > 0) {
    throw new TypeError(
      `${label} fields differ; unknown=[${unknown.join(",")}], missing=[${missing.join(",")}].`,
    );
  }
}

function object(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${label} must be an object.`);
  }
  return value;
}

function vector(value, label) {
  const row = object(value, label);
  exactFields(row, ["x", "y", "z"], label);
  return {
    x: finiteNumber(row.x, `${label}.x`),
    y: finiteNumber(row.y, `${label}.y`),
    z: finiteNumber(row.z, `${label}.z`),
  };
}

function nullableVector(value, label) {
  return value == null ? null : vector(value, label);
}

function interval(value, label) {
  if (!Array.isArray(value) || value.length !== 2) {
    throw new TypeError(`${label} must be a two-value interval.`);
  }
  const start = finiteNumber(value[0], `${label}[0]`);
  const end = finiteNumber(value[1], `${label}[1]`);
  if (end < start) {
    throw new RangeError(`${label} is inverted.`);
  }
  return Object.freeze([start, end]);
}

function concreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${label} must be a nonempty string.`);
  }
  return value;
}

function optionalString(value, label) {
  if (value == null) return null;
  return concreteString(value, label);
}

function sha256(value, label) {
  if (typeof value !== "string" || !SHA256_PATTERN.test(value)) {
    throw new TypeError(`${label} must be a lowercase SHA-256 hex string.`);
  }
  return value;
}

function optionalSha256(value, label) {
  if (value == null) return null;
  return sha256(value, label);
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new TypeError(`${label} must be finite.`);
  }
  return number;
}

function finiteNonzero(value, label) {
  const number = finiteNumber(value, label);
  if (number === 0) {
    throw new RangeError(`${label} must be nonzero.`);
  }
  return number;
}

function nonnegative(value, label) {
  const number = finiteNumber(value, label);
  if (number < 0) {
    throw new RangeError(`${label} must be nonnegative.`);
  }
  return number;
}

function nonnegativeInteger(value, label) {
  const number = finiteNumber(value, label);
  if (!Number.isSafeInteger(number) || number < 0) {
    throw new TypeError(`${label} must be a nonnegative safe integer.`);
  }
  return number;
}

function unique(values, label) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) {
      throw new TypeError(`${label} ${value} is duplicated.`);
    }
    seen.add(value);
  }
}

function mismatch(expected, actual, label) {
  if (expected != null && expected !== actual) {
    throw new Error(`Borg prescribed analysis ${label} mismatch.`);
  }
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
    );
  }
  return value;
}

async function sha256Text(text, cryptoLike) {
  if (!cryptoLike?.subtle || typeof cryptoLike.subtle.digest !== "function") {
    throw new TypeError("Borg prescribed analysis hashing requires Web Crypto SHA-256.");
  }
  const bytes = new TextEncoder().encode(text);
  const digest = await cryptoLike.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

function numberToken(value) {
  return Number(value.toPrecision(15)).toString();
}

function deepFreeze(value) {
  if (!value || typeof value !== "object") {
    return value;
  }
  Object.values(value).forEach(deepFreeze);
  return Object.isFrozen(value) ? value : Object.freeze(value);
}
