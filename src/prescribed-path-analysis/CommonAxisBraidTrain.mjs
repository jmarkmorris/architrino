import {
  EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
  validateExactPrescribedSourceRecord,
} from "./ExactPrescribedSourceWake.mjs";
import { sha256Canonical } from "./AnalyticalBraidEvaluator.mjs";

export const COMMON_AXIS_BRAID_TRAIN_SPEC_SCHEMA =
  "prescribed-path-analysis/common-axis-braid-train-spec.v2";
export const COMMON_AXIS_BRAID_SOURCE_EMITTER_VERSION =
  "prescribed-path-analysis/common-axis-braid-source-emitter/v2";

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

function validateArchitrinoWorldlines(rawWorldlines, expectedCount, period, subsetIds) {
  if (!Array.isArray(rawWorldlines) || rawWorldlines.length !== expectedCount) {
    fail(`architrinoWorldlines must contain exactly ${expectedCount} rows.`);
  }
  const ids = new Set();
  const worldlines = rawWorldlines.map((raw, ordinal) => {
    const index = integer(raw?.index, `architrinoWorldlines[${ordinal}].index`);
    if (index !== ordinal + 1) {
      throw new RangeError("architrino worldline indices must be the persistent order 1..N_o.");
    }
    const id = text(raw.id, `architrinoWorldlines[${ordinal}].id`);
    if (ids.has(id)) fail(`architrino worldline id ${id} is duplicated.`);
    ids.add(id);
    const polarity = finite(raw.polarity, `architrinoWorldlines[${ordinal}].polarity`);
    if (polarity !== 1 && polarity !== -1) {
      throw new RangeError(`architrino worldline ${id} polarity must be +1 or -1.`);
    }
    const circulationSense = integer(
      raw.circulationSense,
      `architrinoWorldlines[${ordinal}].circulationSense`,
    );
    if (circulationSense !== 1 && circulationSense !== -1) {
      throw new RangeError(`architrino worldline ${id} circulationSense must be +1 or -1.`);
    }
    const subsetId = text(raw.subsetId, `architrinoWorldlines[${ordinal}].subsetId`);
    if (!subsetIds.has(subsetId)) {
      fail(`architrino worldline ${id} names undeclared index subset ${subsetId}.`);
    }
    return {
      id,
      index,
      subsetId,
      axialCoordinate: finite(
        raw.axialCoordinate,
        `architrinoWorldlines[${ordinal}].axialCoordinate`,
      ),
      polarity,
      radius: positive(raw.radius, `architrinoWorldlines[${ordinal}].radius`),
      angularFrequency: validateReturn(
        positive(raw.angularFrequency, `architrinoWorldlines[${ordinal}].angularFrequency`),
        period,
        `architrinoWorldlines[${ordinal}].angularFrequency`,
      ),
      phase: finite(raw.phase, `architrinoWorldlines[${ordinal}].phase`),
      circulationSense,
    };
  });
  for (let index = 1; index < worldlines.length; index += 1) {
    if (!(worldlines[index].axialCoordinate > worldlines[index - 1].axialCoordinate)) {
      throw new RangeError("architrino worldline axial coordinates must be strictly increasing.");
    }
  }
  return worldlines;
}

function validateIndexSubsets(rawSubsets, geometryClass, worldlineCount) {
  const expectedCount = geometryClass === "six-architrino" ? 1 : 2;
  if (!Array.isArray(rawSubsets) || rawSubsets.length !== expectedCount) {
    fail(`indexSubsets must contain exactly ${expectedCount} rows.`);
  }
  const ids = new Set();
  const indexSubsets = rawSubsets.map((raw, index) => {
    const subsetId = text(raw?.subsetId, `indexSubsets[${index}].subsetId`);
    if (ids.has(subsetId)) fail(`index subset ${subsetId} is duplicated.`);
    ids.add(subsetId);
    if (!Array.isArray(raw.worldlineIndices) || raw.worldlineIndices.length !== 6) {
      fail(`index subset ${subsetId} must declare six architrino worldline indices.`);
    }
    const worldlineIndices = raw.worldlineIndices.map((value, ordinal) =>
      integer(value, `indexSubsets[${index}].worldlineIndices[${ordinal}]`));
    return {
      subsetId,
      worldlineIndices,
      relativePhase: finite(raw.relativePhase ?? 0, `indexSubsets[${index}].relativePhase`),
      relativeCirculation: text(
        raw.relativeCirculation,
        `indexSubsets[${index}].relativeCirculation`,
      ),
      ordering: text(raw.ordering, `indexSubsets[${index}].ordering`),
    };
  });
  const declared = indexSubsets.flatMap((row) => row.worldlineIndices);
  const expected = Array.from({ length: worldlineCount }, (_, index) => index + 1);
  if (declared.join(",") !== expected.join(",")) {
    fail("index subsets must partition the persistent axial order without gaps.");
  }
  return { indexSubsets, subsetIds: ids };
}

function validateCounterpartMap(rawMap, worldlines) {
  if (!rawMap || typeof rawMap !== "object" || Array.isArray(rawMap)) {
    fail("binaryCounterpartMap must be an object keyed by architrino worldline id.");
  }
  const ids = new Set(worldlines.map((row) => row.id));
  if (Object.keys(rawMap).sort().join(",") !== [...ids].sort().join(",")) {
    fail("binaryCounterpartMap must contain every architrino worldline exactly once.");
  }
  const pairKeys = new Set();
  for (const worldline of worldlines) {
    const counterpart = text(rawMap[worldline.id], `binaryCounterpartMap.${worldline.id}`);
    if (!ids.has(counterpart) || counterpart === worldline.id ||
        rawMap[counterpart] !== worldline.id) {
      fail(`binaryCounterpartMap is not a fixed-point-free involution at ${worldline.id}.`);
    }
    const mate = worldlines.find((row) => row.id === counterpart);
    if (worldline.polarity + mate.polarity !== 0) {
      fail(`binary counterpart pair ${worldline.id}/${counterpart} is not polarity neutral.`);
    }
    pairKeys.add([worldline.id, counterpart].sort().join("::"));
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
    if (!Array.isArray(raw?.worldlineIds) || raw.worldlineIds.length !== 2) {
      fail(`binaryRelations[${index}].worldlineIds must contain two ids.`);
    }
    const worldlineIds = raw.worldlineIds.map((id, ordinal) =>
      text(id, `binaryRelations[${index}].worldlineIds[${ordinal}]`));
    const key = [...worldlineIds].sort().join("::");
    if (!expected.has(key) || observed.has(key)) {
      fail(`binary relation ${key} is missing from or duplicated in the counterpart map.`);
    }
    observed.add(key);
    return {
      worldlineIds,
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

function validateAdditionalWorldlineSlots(rawSlots, worldlineCount) {
  const expectedCount = worldlineCount / 2;
  if (!Array.isArray(rawSlots) || rawSlots.length !== expectedCount) {
    fail(`additionalWorldlineSlots must declare exactly ${expectedCount} adjacent-pair slots.`);
  }
  return rawSlots.map((raw, index) => {
    const expected = [2 * index + 1, 2 * index + 2];
    if (!Array.isArray(raw?.worldlineIndices) ||
        raw.worldlineIndices.join(",") !== expected.join(",")) {
      fail(`additional-worldline slot ${index + 1} must be the adjacent pair (${expected.join(",")}).`);
    }
    return {
      slotId: text(raw.slotId, `additionalWorldlineSlots[${index}].slotId`),
      worldlineIndices: expected,
    };
  });
}

function validateAdditionalWorldlines(rawWorldlines, geometryClass, period, slots, subsetIds) {
  if (!Array.isArray(rawWorldlines)) fail("additionalWorldlines must be an array.");
  const allowedCounts = geometryClass === "six-architrino" ? [0, 3] : [0, 6];
  if (!allowedCounts.includes(rawWorldlines.length)) {
    throw new RangeError(
      `${geometryClass} additional-worldline count must be one of ${allowedCounts.join(", ")}.`,
    );
  }
  const slotIds = new Set(slots.map((row) => row.slotId));
  const usedSlots = new Set();
  const ids = new Set();
  return rawWorldlines.map((raw, index) => {
    const id = text(raw?.id, `additionalWorldlines[${index}].id`);
    if (ids.has(id)) fail(`additional architrino worldline id ${id} is duplicated.`);
    ids.add(id);
    const slotId = text(raw.slotId, `additionalWorldlines[${index}].slotId`);
    if (!slotIds.has(slotId) || usedSlots.has(slotId)) {
      fail(`additional architrino worldline ${id} must occupy one unique declared adjacent-pair slot.`);
    }
    usedSlots.add(slotId);
    const subsetId = text(raw.subsetId, `additionalWorldlines[${index}].subsetId`);
    if (!subsetIds.has(subsetId)) {
      fail(`additional architrino worldline ${id} names undeclared index subset ${subsetId}.`);
    }
    const polarity = finite(raw.polarity, `additionalWorldlines[${index}].polarity`);
    if (polarity !== 1 && polarity !== -1) {
      throw new RangeError(`additional architrino worldline ${id} polarity must be +1 or -1.`);
    }
    const circulationSense = integer(
      raw.circulationSense,
      `additionalWorldlines[${index}].circulationSense`,
    );
    if (circulationSense !== 1 && circulationSense !== -1) {
      throw new RangeError(`additional architrino worldline ${id} circulationSense must be +1 or -1.`);
    }
    return {
      id,
      slotId,
      subsetId,
      polarity,
      axialOffset: finite(raw.axialOffset, `additionalWorldlines[${index}].axialOffset`),
      transverseOffsetE1: finite(
        raw.transverseOffsetE1,
        `additionalWorldlines[${index}].transverseOffsetE1`,
      ),
      transverseOffsetE2: finite(
        raw.transverseOffsetE2,
        `additionalWorldlines[${index}].transverseOffsetE2`,
      ),
      radius: nonnegative(raw.radius, `additionalWorldlines[${index}].radius`),
      angularFrequency: validateReturn(
        nonnegative(raw.angularFrequency, `additionalWorldlines[${index}].angularFrequency`),
        period,
        `additionalWorldlines[${index}].angularFrequency`,
      ),
      phase: finite(raw.phase, `additionalWorldlines[${index}].phase`),
      circulationSense,
      association: text(raw.association, `additionalWorldlines[${index}].association`),
      symmetryRelation: text(
        raw.symmetryRelation,
        `additionalWorldlines[${index}].symmetryRelation`,
      ),
    };
  });
}

export function validateCommonAxisBraidTrainSpec(rawSpec) {
  if (!rawSpec || rawSpec.schema !== COMMON_AXIS_BRAID_TRAIN_SPEC_SCHEMA) {
    fail(`common-axis braid train requires schema ${COMMON_AXIS_BRAID_TRAIN_SPEC_SCHEMA}.`);
  }
  const geometryClass = text(rawSpec.geometryClass, "geometryClass");
  if (geometryClass !== "six-architrino" && geometryClass !== "twelve-architrino") {
    fail("geometryClass must be six-architrino or twelve-architrino.");
  }
  const worldlineCount = geometryClass === "six-architrino" ? 6 : 12;
  const returnPeriod = positive(rawSpec.prescribedReturnPeriod, "prescribedReturnPeriod");
  const frame = validateFrame(rawSpec.frame);
  const { indexSubsets, subsetIds } = validateIndexSubsets(
    rawSpec.indexSubsets,
    geometryClass,
    worldlineCount,
  );
  const architrinoWorldlines = validateArchitrinoWorldlines(
    rawSpec.architrinoWorldlines,
    worldlineCount,
    returnPeriod,
    subsetIds,
  );
  const counterpart = validateCounterpartMap(
    rawSpec.binaryCounterpartMap,
    architrinoWorldlines,
  );
  const binaryRelations = validateBinaryRelations(rawSpec.binaryRelations, counterpart.pairs);
  const additionalWorldlineSlots = validateAdditionalWorldlineSlots(
    rawSpec.additionalWorldlineSlots,
    worldlineCount,
  );
  const additionalWorldlines = validateAdditionalWorldlines(
    rawSpec.additionalWorldlines,
    geometryClass,
    returnPeriod,
    additionalWorldlineSlots,
    subsetIds,
  );
  const history = {
    start: finite(rawSpec.history?.start, "history.start"),
    end: finite(rawSpec.history?.end, "history.end"),
  };
  if (!(history.end > history.start)) throw new RangeError("history interval must be nonempty.");
  const axialCoordinates = architrinoWorldlines.map((row) => row.axialCoordinate);
  const spacings = axialCoordinates.slice(1).map(
    (value, index) => value - axialCoordinates[index],
  );
  const declaredSpacings = rawSpec.spacingVector?.map((value, index) =>
    positive(value, `spacingVector[${index}]`));
  if (!declaredSpacings || declaredSpacings.length !== worldlineCount - 1 ||
      declaredSpacings.some((value, index) => !close(value, spacings[index]))) {
    fail("spacingVector must exactly match successive ordered axial-coordinate differences.");
  }
  const trainLength = axialCoordinates.at(-1) - axialCoordinates[0];
  if (!close(finite(rawSpec.trainLength, "trainLength"), trainLength)) {
    fail("trainLength must equal the first-to-last architrino-worldline axial-coordinate difference.");
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
    indexSubsets,
    architrinoWorldlines,
    binaryCounterpartMap: counterpart.map,
    binaryRelations,
    additionalWorldlineSlots,
    additionalWorldlines,
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

export function createCommonAxisBraidExactSourceRecord(rawSpec) {
  const spec = validateCommonAxisBraidTrainSpec(rawSpec);
  const worldlineByIndex = new Map(
    spec.architrinoWorldlines.map((row) => [row.index, row]),
  );
  const slotById = new Map(
    spec.additionalWorldlineSlots.map((slot) => [slot.slotId, slot]),
  );
  const architrinoSources = spec.architrinoWorldlines.map((worldline) => ({
    id: worldline.id,
    charge: worldline.polarity,
    trajectory: sourceTrajectory({
      frame: spec.frame,
      groupTranslationSpeed: spec.groupTranslationSpeed,
      axialCoordinate: worldline.axialCoordinate,
      radius: worldline.radius,
      angularFrequency: worldline.angularFrequency,
      circulationSense: worldline.circulationSense,
      phase: worldline.phase,
    }),
  }));
  const additionalSources = spec.additionalWorldlines.map((worldline) => {
    const [leftIndex, rightIndex] = slotById.get(worldline.slotId).worldlineIndices;
    const midpoint = (
      worldlineByIndex.get(leftIndex).axialCoordinate +
      worldlineByIndex.get(rightIndex).axialCoordinate
    ) / 2;
    return {
      id: worldline.id,
      charge: worldline.polarity,
      trajectory: sourceTrajectory({
        frame: spec.frame,
        groupTranslationSpeed: spec.groupTranslationSpeed,
        axialCoordinate: midpoint,
        axialOffset: worldline.axialOffset,
        transverseOffsetE1: worldline.transverseOffsetE1,
        transverseOffsetE2: worldline.transverseOffsetE2,
        radius: worldline.radius,
        angularFrequency: worldline.angularFrequency,
        circulationSense: worldline.circulationSense,
        phase: worldline.phase,
      }),
    };
  });
  const sourceRows = [
    ...spec.architrinoWorldlines.map((row) => ({
      id: row.id,
      sourceKind: "defining-architrino-worldline",
      persistentWorldlineIndex: row.index,
      subsetId: row.subsetId,
      axialCoordinate: row.axialCoordinate,
      projectionFrame: {
        radialReference: "trajectory-radiusU/radiusV.v1",
        tangentialOrientation: "positive-prescribed-phase.v1",
      },
    })),
    ...spec.additionalWorldlines.map((row) => ({
      id: row.id,
      sourceKind: spec.geometryClass === "twelve-architrino"
        ? "accessory-configuration-worldline"
        : "three-worldline-scaling-control",
      associationSlotId: row.slotId,
      subsetId: row.subsetId,
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
    engineVersion: COMMON_AXIS_BRAID_SOURCE_EMITTER_VERSION,
    claimGrade: spec.claimGrade,
    evidenceStatus: spec.evidenceStatus,
    taxonomy: {
      familyId: spec.geometryClass === "six-architrino" ? "B" : "C",
      memberId: geometryClassMemberId(spec),
      assignmentStatus: spec.geometryClass === "six-architrino"
        ? "operator-directed-family-b-dimension-extension/candidate.v2"
        : "canonical-family-c-coordinate-chart/candidate.v2",
      canonicalBoundary:
        spec.geometryClass === "six-architrino"
          ? "contains B1 as the common-midpoint constrained locus"
          : "Family C does not require decomposition into two B1 components",
    },
    parameterVector: {
      coordinateDefinition: "common-axis-braid-train.v2",
      geometryClass: spec.geometryClass,
      frame: spec.frame,
      groupTranslationSpeed: spec.groupTranslationSpeed,
      prescribedReturnPeriod: spec.prescribedReturnPeriod,
      spacingVector: spec.spacingVector,
      trainLength: spec.trainLength,
      indexSubsets: spec.indexSubsets,
      binaryCounterpartMap: spec.binaryCounterpartMap,
      binaryRelations: spec.binaryRelations,
      additionalWorldlineAssociationMap: spec.additionalWorldlineSlots,
      additionalWorldlineDefinition: spec.geometryClass === "twelve-architrino"
        ? "six declared worldlines form one Accessory Configuration outside the twelve defining Family-C worldlines"
        : "three declared worldlines form a scaling control and are not an Accessory Configuration",
      sources: sourceRows,
      campaignCoordinates: structuredClone(spec.campaignCoordinates ?? {}),
    },
    history: spec.history,
    sources: [...architrinoSources, ...additionalSources],
  };
  const sourceHash = sha256Canonical(recordWithoutHash);
  return validateExactPrescribedSourceRecord({
    ...recordWithoutHash,
    sourceHash,
  });
}

function geometryClassMemberId(spec) {
  if (spec.geometryClass === "six-architrino") {
    return spec.additionalWorldlines.length === 0
      ? "B-generalized-single-6"
      : "B-generalized-single-6-plus-3-worldlines";
  }
  const senses = spec.architrinoWorldlines.map((row) => row.circulationSense);
  if (senses.every((sense) => sense === senses[0])) return "C1";
  const subsetSenses = spec.indexSubsets.map((subset) =>
    subset.worldlineIndices.map(
      (index) => spec.architrinoWorldlines[index - 1].circulationSense,
    ));
  if (subsetSenses.length === 2 &&
      subsetSenses.every((rows) => rows.every((sense) => sense === rows[0])) &&
      subsetSenses[0][0] === -subsetSenses[1][0]) {
    return "C2";
  }
  fail(
    "twelve-architrino circulation senses must satisfy the declared C1 or C2 relation.",
  );
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
