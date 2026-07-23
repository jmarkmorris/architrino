import {
  EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
  validateExactPrescribedSourceRecord,
} from "./ExactPrescribedSourceWake.mjs";
import { sha256Canonical } from "./AnalyticalBraidEvaluator.mjs";

export const GENERALIZED_FAMILY_B_TRAIN_SPEC_SCHEMA =
  "prescribed-path-analysis/generalized-family-b-train-spec.v1";
export const GENERALIZED_FAMILY_B_SOURCE_EMITTER_VERSION =
  "prescribed-path-analysis/generalized-family-b-source-emitter/v1";

const TWO_PI = 2 * Math.PI;
const FRAME_TOLERANCE = 1e-12;
const RETURN_TOLERANCE = 2e-12;

function fail(message) {
  throw new TypeError(message);
}

function finite(value, label) {
  const normalized = Number(value);
  if (!Number.isFinite(normalized)) fail(`${label} must be finite.`);
  return normalized;
}

function positive(value, label) {
  const normalized = finite(value, label);
  if (!(normalized > 0)) throw new RangeError(`${label} must be positive.`);
  return normalized;
}

function nonnegative(value, label) {
  const normalized = finite(value, label);
  if (normalized < 0) throw new RangeError(`${label} must be nonnegative.`);
  return normalized;
}

function integer(value, label) {
  const normalized = finite(value, label);
  if (!Number.isSafeInteger(normalized)) fail(`${label} must be a safe integer.`);
  return normalized;
}

function text(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    fail(`${label} must be a nonempty string.`);
  }
  return value;
}

function vector(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label} must be an {x,y,z} vector.`);
  }
  return {
    x: finite(value.x, `${label}.x`),
    y: finite(value.y, `${label}.y`),
    z: finite(value.z, `${label}.z`),
  };
}

function add(...values) {
  return values.reduce((sum, value) => ({
    x: sum.x + value.x,
    y: sum.y + value.y,
    z: sum.z + value.z,
  }), { x: 0, y: 0, z: 0 });
}

function scale(value, scalar) {
  return { x: value.x * scalar, y: value.y * scalar, z: value.z * scalar };
}

function dot(left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function norm(value) {
  return Math.sqrt(dot(value, value));
}

function close(left, right, tolerance = FRAME_TOLERANCE) {
  return Math.abs(left - right) <= tolerance * Math.max(1, Math.abs(left), Math.abs(right));
}

function validateFrame(rawFrame) {
  const origin = vector(rawFrame?.origin, "frame.origin");
  const n = vector(rawFrame?.n, "frame.n");
  const e1 = vector(rawFrame?.e1, "frame.e1");
  const e2 = vector(rawFrame?.e2, "frame.e2");
  for (const [id, basis] of [["n", n], ["e1", e1], ["e2", e2]]) {
    if (!close(norm(basis), 1)) throw new RangeError(`frame.${id} must be a unit vector.`);
  }
  for (const [leftId, left, rightId, right] of [
    ["n", n, "e1", e1],
    ["n", n, "e2", e2],
    ["e1", e1, "e2", e2],
  ]) {
    if (!close(dot(left, right), 0)) {
      throw new RangeError(`frame.${leftId} and frame.${rightId} must be orthogonal.`);
    }
  }
  return { origin, n, e1, e2 };
}

function validateReturn(angularFrequency, period, label) {
  const turns = angularFrequency * period / TWO_PI;
  if (!close(turns, Math.round(turns), RETURN_TOLERANCE)) {
    throw new RangeError(`${label} must make an integer number of turns per return period.`);
  }
  return angularFrequency;
}

function validateCoreOrbitals(rawOrbitals, expectedCount, period, componentIds) {
  if (!Array.isArray(rawOrbitals) || rawOrbitals.length !== expectedCount) {
    fail(`coreOrbitals must contain exactly ${expectedCount} rows.`);
  }
  const ids = new Set();
  const orbitals = rawOrbitals.map((raw, ordinal) => {
    const index = integer(raw?.index, `coreOrbitals[${ordinal}].index`);
    if (index !== ordinal + 1) {
      throw new RangeError("core orbital indices must be the persistent order 1..N_o.");
    }
    const id = text(raw.id, `coreOrbitals[${ordinal}].id`);
    if (ids.has(id)) fail(`core orbital id ${id} is duplicated.`);
    ids.add(id);
    const polarity = finite(raw.polarity, `coreOrbitals[${ordinal}].polarity`);
    if (polarity !== 1 && polarity !== -1) {
      throw new RangeError(`core orbital ${id} polarity must be +1 or -1.`);
    }
    const circulationSense = integer(
      raw.circulationSense,
      `coreOrbitals[${ordinal}].circulationSense`,
    );
    if (circulationSense !== 1 && circulationSense !== -1) {
      throw new RangeError(`core orbital ${id} circulationSense must be +1 or -1.`);
    }
    const componentId = text(raw.componentId, `coreOrbitals[${ordinal}].componentId`);
    if (!componentIds.has(componentId)) {
      fail(`core orbital ${id} names undeclared component ${componentId}.`);
    }
    return {
      id,
      index,
      componentId,
      axialCoordinate: finite(
        raw.axialCoordinate,
        `coreOrbitals[${ordinal}].axialCoordinate`,
      ),
      polarity,
      radius: positive(raw.radius, `coreOrbitals[${ordinal}].radius`),
      angularFrequency: validateReturn(
        positive(raw.angularFrequency, `coreOrbitals[${ordinal}].angularFrequency`),
        period,
        `coreOrbitals[${ordinal}].angularFrequency`,
      ),
      phase: finite(raw.phase, `coreOrbitals[${ordinal}].phase`),
      circulationSense,
    };
  });
  for (let index = 1; index < orbitals.length; index += 1) {
    if (!(orbitals[index].axialCoordinate > orbitals[index - 1].axialCoordinate)) {
      throw new RangeError("core orbital axial coordinates must be strictly increasing.");
    }
  }
  return orbitals;
}

function validateComponents(rawComponents, geometryClass, coreCount) {
  const expectedCount = geometryClass === "single" ? 1 : 2;
  if (!Array.isArray(rawComponents) || rawComponents.length !== expectedCount) {
    fail(`components must contain exactly ${expectedCount} rows.`);
  }
  const ids = new Set();
  const components = rawComponents.map((raw, index) => {
    const componentId = text(raw?.componentId, `components[${index}].componentId`);
    if (ids.has(componentId)) fail(`component ${componentId} is duplicated.`);
    ids.add(componentId);
    if (!Array.isArray(raw.orbitalIndices) || raw.orbitalIndices.length !== 6) {
      fail(`component ${componentId} must declare six orbital indices.`);
    }
    const orbitalIndices = raw.orbitalIndices.map((value, ordinal) =>
      integer(value, `components[${index}].orbitalIndices[${ordinal}]`));
    return {
      componentId,
      orbitalIndices,
      relativePhase: finite(raw.relativePhase ?? 0, `components[${index}].relativePhase`),
      relativeCirculation: text(
        raw.relativeCirculation,
        `components[${index}].relativeCirculation`,
      ),
      ordering: text(raw.ordering, `components[${index}].ordering`),
    };
  });
  const declared = components.flatMap((row) => row.orbitalIndices);
  const expected = Array.from({ length: coreCount }, (_, index) => index + 1);
  if (declared.join(",") !== expected.join(",")) {
    fail("component orbital indices must partition the persistent axial order without gaps.");
  }
  return { components, componentIds: ids };
}

function validateCounterpartMap(rawMap, orbitals) {
  if (!rawMap || typeof rawMap !== "object" || Array.isArray(rawMap)) {
    fail("binaryCounterpartMap must be an object keyed by core orbital id.");
  }
  const ids = new Set(orbitals.map((row) => row.id));
  if (Object.keys(rawMap).sort().join(",") !== [...ids].sort().join(",")) {
    fail("binaryCounterpartMap must contain every core orbital exactly once.");
  }
  const pairKeys = new Set();
  for (const orbital of orbitals) {
    const counterpart = text(rawMap[orbital.id], `binaryCounterpartMap.${orbital.id}`);
    if (!ids.has(counterpart) || counterpart === orbital.id ||
        rawMap[counterpart] !== orbital.id) {
      fail(`binaryCounterpartMap is not a fixed-point-free involution at ${orbital.id}.`);
    }
    const mate = orbitals.find((row) => row.id === counterpart);
    if (orbital.polarity + mate.polarity !== 0) {
      fail(`binary counterpart pair ${orbital.id}/${counterpart} is not polarity neutral.`);
    }
    pairKeys.add([orbital.id, counterpart].sort().join("::"));
  }
  return {
    map: structuredClone(rawMap),
    pairs: [...pairKeys].sort().map((key) => key.split("::")),
  };
}

function validateBinaryRelations(rawRelations, counterpartPairs) {
  if (!Array.isArray(rawRelations) || rawRelations.length !== counterpartPairs.length) {
    fail("binaryRelations must declare one exact relation for every counterpart pair.");
  }
  const expected = new Set(counterpartPairs.map((pair) => [...pair].sort().join("::")));
  const observed = new Set();
  const relations = rawRelations.map((raw, index) => {
    if (!Array.isArray(raw?.orbitalIds) || raw.orbitalIds.length !== 2) {
      fail(`binaryRelations[${index}].orbitalIds must contain two ids.`);
    }
    const orbitalIds = raw.orbitalIds.map((id, ordinal) =>
      text(id, `binaryRelations[${index}].orbitalIds[${ordinal}]`));
    const key = [...orbitalIds].sort().join("::");
    if (!expected.has(key) || observed.has(key)) {
      fail(`binary relation ${key} is missing from or duplicated in the counterpart map.`);
    }
    observed.add(key);
    return {
      orbitalIds,
      radiusRelation: text(raw.radiusRelation, `binaryRelations[${index}].radiusRelation`),
      frequencyRelation: text(
        raw.frequencyRelation,
        `binaryRelations[${index}].frequencyRelation`,
      ),
      phaseRelation: text(raw.phaseRelation, `binaryRelations[${index}].phaseRelation`),
      circulationRelation: text(
        raw.circulationRelation,
        `binaryRelations[${index}].circulationRelation`,
      ),
      axialMidpoint: finite(raw.axialMidpoint, `binaryRelations[${index}].axialMidpoint`),
      axialSeparation: positive(
        raw.axialSeparation,
        `binaryRelations[${index}].axialSeparation`,
      ),
      exactConstraint: text(
        raw.exactConstraint,
        `binaryRelations[${index}].exactConstraint`,
      ),
    };
  });
  return relations;
}

function validatePayloadSlots(rawSlots, coreCount) {
  const expectedCount = coreCount / 2;
  if (!Array.isArray(rawSlots) || rawSlots.length !== expectedCount) {
    fail(`payloadSlots must declare exactly ${expectedCount} adjacent-pair slots.`);
  }
  return rawSlots.map((raw, index) => {
    const expected = [2 * index + 1, 2 * index + 2];
    if (!Array.isArray(raw?.orbitalIndices) ||
        raw.orbitalIndices.join(",") !== expected.join(",")) {
      fail(`payload slot ${index + 1} must be the adjacent pair (${expected.join(",")}).`);
    }
    return {
      slotId: text(raw.slotId, `payloadSlots[${index}].slotId`),
      orbitalIndices: expected,
    };
  });
}

function validatePayloads(rawPayloads, geometryClass, period, slots, componentIds) {
  if (!Array.isArray(rawPayloads)) fail("payloads must be an array.");
  const allowedCounts = geometryClass === "single" ? [0, 3] : [0, 6];
  if (!allowedCounts.includes(rawPayloads.length)) {
    throw new RangeError(
      `${geometryClass} braid payload count must be one of ${allowedCounts.join(", ")}.`,
    );
  }
  const slotIds = new Set(slots.map((row) => row.slotId));
  const usedSlots = new Set();
  const ids = new Set();
  return rawPayloads.map((raw, index) => {
    const id = text(raw?.id, `payloads[${index}].id`);
    if (ids.has(id)) fail(`payload id ${id} is duplicated.`);
    ids.add(id);
    const slotId = text(raw.slotId, `payloads[${index}].slotId`);
    if (!slotIds.has(slotId) || usedSlots.has(slotId)) {
      fail(`payload ${id} must occupy one unique declared adjacent-pair slot.`);
    }
    usedSlots.add(slotId);
    const componentId = text(raw.componentId, `payloads[${index}].componentId`);
    if (!componentIds.has(componentId)) {
      fail(`payload ${id} names undeclared component ${componentId}.`);
    }
    const polarity = finite(raw.polarity, `payloads[${index}].polarity`);
    if (polarity !== 1 && polarity !== -1) {
      throw new RangeError(`payload ${id} polarity must be +1 or -1.`);
    }
    const circulationSense = integer(
      raw.circulationSense,
      `payloads[${index}].circulationSense`,
    );
    if (circulationSense !== 1 && circulationSense !== -1) {
      throw new RangeError(`payload ${id} circulationSense must be +1 or -1.`);
    }
    return {
      id,
      slotId,
      componentId,
      polarity,
      axialOffset: finite(raw.axialOffset, `payloads[${index}].axialOffset`),
      transverseOffsetE1: finite(
        raw.transverseOffsetE1,
        `payloads[${index}].transverseOffsetE1`,
      ),
      transverseOffsetE2: finite(
        raw.transverseOffsetE2,
        `payloads[${index}].transverseOffsetE2`,
      ),
      radius: nonnegative(raw.radius, `payloads[${index}].radius`),
      angularFrequency: validateReturn(
        nonnegative(raw.angularFrequency, `payloads[${index}].angularFrequency`),
        period,
        `payloads[${index}].angularFrequency`,
      ),
      phase: finite(raw.phase, `payloads[${index}].phase`),
      circulationSense,
      association: text(raw.association, `payloads[${index}].association`),
      symmetryRelation: text(
        raw.symmetryRelation,
        `payloads[${index}].symmetryRelation`,
      ),
    };
  });
}

export function validateGeneralizedFamilyBTrainSpec(rawSpec) {
  if (!rawSpec || rawSpec.schema !== GENERALIZED_FAMILY_B_TRAIN_SPEC_SCHEMA) {
    fail(`generalized Family-B train requires schema ${GENERALIZED_FAMILY_B_TRAIN_SPEC_SCHEMA}.`);
  }
  const geometryClass = text(rawSpec.geometryClass, "geometryClass");
  if (geometryClass !== "single" && geometryClass !== "dual") {
    fail("geometryClass must be single or dual.");
  }
  const coreCount = geometryClass === "single" ? 6 : 12;
  const returnPeriod = positive(rawSpec.prescribedReturnPeriod, "prescribedReturnPeriod");
  const frame = validateFrame(rawSpec.frame);
  const { components, componentIds } = validateComponents(
    rawSpec.components,
    geometryClass,
    coreCount,
  );
  const coreOrbitals = validateCoreOrbitals(
    rawSpec.coreOrbitals,
    coreCount,
    returnPeriod,
    componentIds,
  );
  const counterpart = validateCounterpartMap(rawSpec.binaryCounterpartMap, coreOrbitals);
  const binaryRelations = validateBinaryRelations(rawSpec.binaryRelations, counterpart.pairs);
  const payloadSlots = validatePayloadSlots(rawSpec.payloadSlots, coreCount);
  const payloads = validatePayloads(
    rawSpec.payloads,
    geometryClass,
    returnPeriod,
    payloadSlots,
    componentIds,
  );
  const history = {
    start: finite(rawSpec.history?.start, "history.start"),
    end: finite(rawSpec.history?.end, "history.end"),
  };
  if (!(history.end > history.start)) throw new RangeError("history interval must be nonempty.");
  const axialCoordinates = coreOrbitals.map((row) => row.axialCoordinate);
  const spacings = axialCoordinates.slice(1).map(
    (value, index) => value - axialCoordinates[index],
  );
  const declaredSpacings = rawSpec.spacingVector?.map((value, index) =>
    positive(value, `spacingVector[${index}]`));
  if (!declaredSpacings || declaredSpacings.length !== coreCount - 1 ||
      declaredSpacings.some((value, index) => !close(value, spacings[index]))) {
    fail("spacingVector must exactly match successive ordered axial-coordinate differences.");
  }
  const trainLength = axialCoordinates.at(-1) - axialCoordinates[0];
  if (!close(finite(rawSpec.trainLength, "trainLength"), trainLength)) {
    fail("trainLength must equal the first-to-last orbital axial-coordinate difference.");
  }
  return {
    ...structuredClone(rawSpec),
    specId: text(rawSpec.specId, "specId"),
    label: text(rawSpec.label, "label"),
    geometryClass,
    claimGrade: rawSpec.claimGrade === "chart-hypothesis"
      ? rawSpec.claimGrade
      : fail("claimGrade must be chart-hypothesis."),
    evidenceStatus: rawSpec.evidenceStatus === "display-only"
      ? rawSpec.evidenceStatus
      : fail("evidenceStatus must be display-only."),
    prescribedReturnPeriod: returnPeriod,
    groupTranslationSpeed: nonnegative(
      rawSpec.groupTranslationSpeed,
      "groupTranslationSpeed",
    ),
    frame,
    components,
    coreOrbitals,
    binaryCounterpartMap: counterpart.map,
    binaryRelations,
    payloadSlots,
    payloads,
    spacingVector: spacings,
    trainLength,
    history,
  };
}

function sourceTrajectory({
  frame,
  groupTranslationSpeed,
  axialCoordinate,
  axialOffset = 0,
  transverseOffsetE1 = 0,
  transverseOffsetE2 = 0,
  radius,
  angularFrequency,
  circulationSense,
  phase,
}) {
  return {
    kind: "moving-circular.v1",
    epochTime: 0,
    centerAtEpoch: add(
      frame.origin,
      scale(frame.n, axialCoordinate + axialOffset),
      scale(frame.e1, transverseOffsetE1),
      scale(frame.e2, transverseOffsetE2),
    ),
    centerVelocity: scale(frame.n, groupTranslationSpeed),
    radiusU: scale(frame.e1, radius),
    radiusV: scale(frame.e2, radius),
    angularVelocity: circulationSense * angularFrequency,
    angularAcceleration: 0,
    phaseAtEpoch: phase,
  };
}

export function createGeneralizedFamilyBExactSourceRecord(rawSpec) {
  const spec = validateGeneralizedFamilyBTrainSpec(rawSpec);
  const orbitalByIndex = new Map(spec.coreOrbitals.map((row) => [row.index, row]));
  const slotById = new Map(spec.payloadSlots.map((slot) => [slot.slotId, slot]));
  const coreSources = spec.coreOrbitals.map((orbital) => ({
    id: orbital.id,
    charge: orbital.polarity,
    trajectory: sourceTrajectory({
      frame: spec.frame,
      groupTranslationSpeed: spec.groupTranslationSpeed,
      axialCoordinate: orbital.axialCoordinate,
      radius: orbital.radius,
      angularFrequency: orbital.angularFrequency,
      circulationSense: orbital.circulationSense,
      phase: orbital.phase,
    }),
  }));
  const payloadSources = spec.payloads.map((payload) => {
    const [leftIndex, rightIndex] = slotById.get(payload.slotId).orbitalIndices;
    const midpoint = (
      orbitalByIndex.get(leftIndex).axialCoordinate +
      orbitalByIndex.get(rightIndex).axialCoordinate
    ) / 2;
    return {
      id: payload.id,
      charge: payload.polarity,
      trajectory: sourceTrajectory({
        frame: spec.frame,
        groupTranslationSpeed: spec.groupTranslationSpeed,
        axialCoordinate: midpoint,
        axialOffset: payload.axialOffset,
        transverseOffsetE1: payload.transverseOffsetE1,
        transverseOffsetE2: payload.transverseOffsetE2,
        radius: payload.radius,
        angularFrequency: payload.angularFrequency,
        circulationSense: payload.circulationSense,
        phase: payload.phase,
      }),
    };
  });
  const sourceRows = [
    ...spec.coreOrbitals.map((row) => ({
      id: row.id,
      sourceKind: "core-orbital",
      persistentOrbitalIndex: row.index,
      componentId: row.componentId,
      axialCoordinate: row.axialCoordinate,
      projectionFrame: {
        radialReference: "trajectory-radiusU/radiusV.v1",
        tangentialOrientation: "positive-prescribed-phase.v1",
      },
    })),
    ...spec.payloads.map((row) => ({
      id: row.id,
      sourceKind: "payload-architrino",
      payloadSlotId: row.slotId,
      componentId: row.componentId,
      projectionFrame: {
        radialReference: row.radius > 0
          ? "trajectory-radiusU/radiusV.v1"
          : "adjacent-pair-mean-phase-frame.v1",
        tangentialOrientation: "positive-prescribed-phase.v1",
      },
    })),
  ];
  const recordWithoutHash = {
    schema: EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
    recordId: spec.specId,
    sourceSchema: spec.schema,
    sourceHash: null,
    generatingSpec: {
      schema: spec.schema,
      specId: spec.specId,
      specHash: sha256Canonical(spec),
    },
    engineId: "prescribed-geometry",
    engineVersion: GENERALIZED_FAMILY_B_SOURCE_EMITTER_VERSION,
    claimGrade: spec.claimGrade,
    evidenceStatus: spec.evidenceStatus,
    taxonomy: {
      familyId: "B",
      memberId: geometryClassMemberId(spec.geometryClass, spec.payloads.length),
      assignmentStatus: "operator-directed-generalization/noncanonical-candidate.v1",
      canonicalBoundary:
        "does not alter canonical B1 or the Family-C dual-braid composition taxonomy",
    },
    parameterVector: {
      coordinateDefinition: "generalized-family-b-common-axis-train.v1",
      geometryClass: spec.geometryClass,
      frame: spec.frame,
      groupTranslationSpeed: spec.groupTranslationSpeed,
      prescribedReturnPeriod: spec.prescribedReturnPeriod,
      spacingVector: spec.spacingVector,
      trainLength: spec.trainLength,
      components: spec.components,
      binaryCounterpartMap: spec.binaryCounterpartMap,
      binaryRelations: spec.binaryRelations,
      payloadPairingMap: spec.payloadSlots,
      payloadDefinition:
        "one explicitly declared prescribed architrino worldline associated with one adjacent core-orbital pair; no Accessory Configuration, capture, or axial-layer identity is implied",
      sources: sourceRows,
      campaignCoordinates: structuredClone(spec.campaignCoordinates ?? {}),
    },
    history: spec.history,
    sources: [...coreSources, ...payloadSources],
  };
  const sourceHash = sha256Canonical(recordWithoutHash);
  return validateExactPrescribedSourceRecord({
    ...recordWithoutHash,
    sourceHash,
  });
}

function geometryClassMemberId(geometryClass, payloadCount) {
  if (geometryClass === "single") {
    return payloadCount === 0
      ? "B-generalized-single-6"
      : "B-generalized-single-6-plus-3-payload";
  }
  return payloadCount === 0
    ? "B-generalized-dual-12"
    : "B-generalized-dual-12-plus-6-payload";
}

export function centralRadiusEnvelope({
  count,
  endRadius,
  centerRadius,
  exponent = 1,
  reversed = false,
}) {
  const normalizedCount = integer(count, "count");
  const low = positive(endRadius, "endRadius");
  const high = positive(centerRadius, "centerRadius");
  const power = positive(exponent, "exponent");
  if (normalizedCount < 2) throw new RangeError("count must be at least two.");
  return Array.from({ length: normalizedCount }, (_, index) => {
    const edgeDistance = Math.abs(2 * index - (normalizedCount - 1)) /
      (normalizedCount - 1);
    const centralWeight = (1 - edgeDistance) ** power;
    const weight = reversed ? 1 - centralWeight : centralWeight;
    return low + (high - low) * weight;
  });
}

export function orderedCoordinatesFromSpacings(spacings, center = 0) {
  if (!Array.isArray(spacings) || spacings.length === 0) {
    fail("spacings must be a nonempty array.");
  }
  const coordinates = [0];
  for (let index = 0; index < spacings.length; index += 1) {
    coordinates.push(
      coordinates.at(-1) + positive(spacings[index], `spacings[${index}]`),
    );
  }
  const midpoint = (coordinates[0] + coordinates.at(-1)) / 2;
  return coordinates.map((value) => value - midpoint + finite(center, "center"));
}
