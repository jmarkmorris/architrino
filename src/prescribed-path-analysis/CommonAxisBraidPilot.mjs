import {
  COMMON_AXIS_BRAID_TRAIN_SPEC_SCHEMA,
  centralRadiusEnvelope,
  createCommonAxisBraidExactSourceRecord,
  orderedCoordinatesFromSpacings,
  validateCommonAxisBraidTrainSpec,
} from "./CommonAxisBraidTrain.mjs";

const TWO_PI = 2 * Math.PI;
const RETURN_PERIOD = 4;
const COMMON_ANGULAR_FREQUENCY = TWO_PI / RETURN_PERIOD;
const DEFAULT_SPACING = 0.28;

function counterpartMap(count, mode) {
  const pairs = [];
  if (mode === "adjacent") {
    for (let index = 1; index <= count; index += 2) pairs.push([index, index + 1]);
  } else if (mode === "subset-reflection") {
    for (let subsetStart = 1; subsetStart <= count; subsetStart += 6) {
      pairs.push(
        [subsetStart, subsetStart + 5],
        [subsetStart + 1, subsetStart + 4],
        [subsetStart + 2, subsetStart + 3],
      );
    }
  } else {
    throw new TypeError(`unsupported counterpart mode ${mode}.`);
  }
  const map = {};
  for (const [left, right] of pairs) {
    map[`architrino-${left}`] = `architrino-${right}`;
    map[`architrino-${right}`] = `architrino-${left}`;
  }
  return { map, pairs };
}

function indexSubsetRows(geometryClass, circulationStratum) {
  if (geometryClass === "six-architrino") {
    return [{
      subsetId: "index-subset-1",
      worldlineIndices: [1, 2, 3, 4, 5, 6],
      relativePhase: 0,
      relativeCirculation: "not-applicable-single-subset",
      ordering: "only-index-subset",
    }];
  }
  return [
    {
      subsetId: "index-subset-1",
      worldlineIndices: [1, 2, 3, 4, 5, 6],
      relativePhase: 0,
      relativeCirculation: "reference-positive",
      ordering: "indices-1-through-6",
    },
    {
      subsetId: "index-subset-2",
      worldlineIndices: [7, 8, 9, 10, 11, 12],
      relativePhase: Math.PI,
      relativeCirculation: circulationStratum === "co-rotating"
        ? "co-rotating-with-index-subset-1"
        : "counter-rotating-to-index-subset-1",
      ordering: "indices-7-through-12",
    },
  ];
}

function additionalWorldlineSlotRows(count) {
  return Array.from({ length: count / 2 }, (_, index) => ({
    slotId: `association-slot-${index + 1}`,
    worldlineIndices: [2 * index + 1, 2 * index + 2],
  }));
}

function binaryRelationRows(pairs, worldlines, mode) {
  const byIndex = new Map(worldlines.map((row) => [row.index, row]));
  return pairs.map(([leftIndex, rightIndex]) => {
    const left = byIndex.get(leftIndex);
    const right = byIndex.get(rightIndex);
    return {
      worldlineIds: [left.id, right.id],
      radiusRelation: Math.abs(left.radius - right.radius) < 1e-15
        ? "equal-radius"
        : "independently-declared-radii",
      frequencyRelation: "equal-frequency",
      phaseRelation: mode === "adjacent"
        ? "phase-antipodal-modulo-two-pi"
        : "declared-subset-reflection-phase-relation",
      circulationRelation: left.circulationSense === right.circulationSense
        ? "co-rotating"
        : "counter-rotating",
      axialMidpoint: (left.axialCoordinate + right.axialCoordinate) / 2,
      axialSeparation: Math.abs(right.axialCoordinate - left.axialCoordinate),
      exactConstraint:
        "polarity-conjugate counterpart relation with the separately declared radius, frequency, phase, circulation, midpoint, and separation rows",
    };
  });
}

function createAdditionalWorldlineRows(geometryClass, count, kind = "midpoint") {
  if (count === 0) return [];
  const expected = geometryClass === "six-architrino" ? 3 : 6;
  if (count !== expected) {
    throw new RangeError(`additional-worldline count must be ${expected}.`);
  }
  return Array.from({ length: count }, (_, index) => ({
    id: `additional-${index + 1}`,
    slotId: `association-slot-${index + 1}`,
    subsetId: geometryClass === "six-architrino" || index < 3
      ? "index-subset-1"
      : "index-subset-2",
    polarity: index % 2 === 0 ? 1 : -1,
    axialOffset: kind === "axial-offset" ? (index % 2 === 0 ? 0.025 : -0.025) : 0,
    transverseOffsetE1: kind === "transverse-offset"
      ? (index % 2 === 0 ? 0.025 : -0.025)
      : 0,
    transverseOffsetE2: 0,
    radius: 0.07,
    angularFrequency: COMMON_ANGULAR_FREQUENCY,
    phase: index % 2 === 0 ? Math.PI / 2 : 3 * Math.PI / 2,
    circulationSense: index < 3 ? -1 : 1,
    association: geometryClass === "twelve-architrino"
      ? "Accessory Configuration worldline associated with its declared adjacent-pair slot"
      : "three-worldline scaling control associated with its declared adjacent-pair slot",
    symmetryRelation: "reflection-conjugate with the opposite train-half association slot",
  }));
}

export function createCommonAxisBraidTrainSpec({
  specId,
  label,
  geometryClass,
  radii,
  spacings,
  additionalWorldlineCount = 0,
  additionalWorldlineKind = "midpoint",
  counterpartMode = "adjacent",
  circulationStratum = "counter-rotating",
  phaseJitter = [],
  radiusMultipliers = [],
} = {}) {
  const worldlineCount = geometryClass === "six-architrino" ? 6 : 12;
  if (!Array.isArray(radii) || radii.length !== worldlineCount) {
    throw new TypeError(`radii must contain ${worldlineCount} values.`);
  }
  if (!Array.isArray(spacings) || spacings.length !== worldlineCount - 1) {
    throw new TypeError(`spacings must contain ${worldlineCount - 1} values.`);
  }
  if (geometryClass === "twelve-architrino" &&
      !["co-rotating", "counter-rotating"].includes(circulationStratum)) {
    throw new TypeError(
      "twelve-architrino circulationStratum must be co-rotating or counter-rotating.",
    );
  }
  const axialCoordinates = orderedCoordinatesFromSpacings(spacings);
  const { map, pairs } = counterpartMap(worldlineCount, counterpartMode);
  const indexSubsets = indexSubsetRows(geometryClass, circulationStratum);
  const architrinoWorldlines = Array.from({ length: worldlineCount }, (_, index) => {
    const subsetIndex = geometryClass === "six-architrino" || index < 6 ? 0 : 1;
    const localIndex = index % 6;
    const phase = (localIndex % 2 === 0 ? 0 : Math.PI) +
      (indexSubsets[subsetIndex].relativePhase ?? 0) +
      (phaseJitter[index] ?? 0);
    return {
      id: `architrino-${index + 1}`,
      index: index + 1,
      subsetId: indexSubsets[subsetIndex].subsetId,
      axialCoordinate: axialCoordinates[index],
      polarity: index % 2 === 0 ? 1 : -1,
      radius: radii[index] * (radiusMultipliers[index] ?? 1),
      angularFrequency: COMMON_ANGULAR_FREQUENCY,
      phase,
      circulationSense:
        subsetIndex === 0 || circulationStratum === "co-rotating" ? 1 : -1,
    };
  });
  const spec = {
    schema: COMMON_AXIS_BRAID_TRAIN_SPEC_SCHEMA,
    specId,
    label,
    geometryClass,
    claimGrade: "chart-hypothesis",
    evidenceStatus: "display-only",
    prescribedReturnPeriod: RETURN_PERIOD,
    history: { start: -4, end: 8 },
    frame: {
      origin: { x: 0, y: 0, z: 0 },
      n: { x: 1, y: 0, z: 0 },
      e1: { x: 0, y: 1, z: 0 },
      e2: { x: 0, y: 0, z: 1 },
    },
    groupTranslationSpeed: 0.1,
    spacingVector: [...spacings],
    trainLength: axialCoordinates.at(-1) - axialCoordinates[0],
    indexSubsets,
    architrinoWorldlines,
    binaryCounterpartMap: map,
    binaryRelations: binaryRelationRows(
      pairs,
      architrinoWorldlines,
      counterpartMode,
    ),
    additionalWorldlineSlots: additionalWorldlineSlotRows(worldlineCount),
    additionalWorldlines: createAdditionalWorldlineRows(
      geometryClass,
      additionalWorldlineCount,
      additionalWorldlineKind,
    ),
    campaignCoordinates: {
      radiusEnvelope: label.includes("equal-radius")
        ? "equal-radius"
        : label.includes("reflection-broken")
          ? "reflection-broken-central-envelope"
          : "source-inspired-central-envelope",
      spacingStratum: spacings.every(
        (value) => Math.abs(value - spacings[0]) <= 1e-15,
      ) ? "equal-spacing" : "nonuniform-spacing",
      counterpartMode,
      additionalWorldlineKind: additionalWorldlineCount === 0
        ? "none"
        : additionalWorldlineKind,
      circulationStratum: geometryClass === "six-architrino"
        ? "single-six-worldline-set"
        : circulationStratum,
      frequencyStratum: "equal-frequency",
    },
  };
  return validateCommonAxisBraidTrainSpec(spec);
}

function mulberry32(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let value = state;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}

function perturbReference(reference, seed) {
  const random = mulberry32(seed);
  const spacingMultipliers = reference.spacingVector.map(() => 0.96 + 0.08 * random());
  const spacings = reference.spacingVector.map(
    (value, index) => value * spacingMultipliers[index],
  );
  const radii = reference.architrinoWorldlines.map((row) => row.radius);
  const radiusMultipliers = radii.map(() => 0.97 + 0.06 * random());
  const phaseJitter = radii.map(() => (2 * random() - 1) * Math.PI / 32);
  return createCommonAxisBraidTrainSpec({
    specId: `${reference.specId}-seed-${seed}`,
    label: `${reference.label} seeded neighborhood sample`,
    geometryClass: reference.geometryClass,
    radii,
    spacings,
    additionalWorldlineCount: reference.additionalWorldlines.length,
    additionalWorldlineKind:
      reference.campaignCoordinates.additionalWorldlineKind === "none"
      ? "midpoint"
      : reference.campaignCoordinates.additionalWorldlineKind,
    counterpartMode: reference.campaignCoordinates.counterpartMode,
    circulationStratum: reference.campaignCoordinates.circulationStratum,
    phaseJitter,
    radiusMultipliers,
  });
}

export function createCommonAxisBraidPilotInventory({
  seed = 20210102,
  includeNeighborhoodSamples = true,
} = {}) {
  const sixWorldlineEnvelope = centralRadiusEnvelope({
    count: 6,
    endRadius: 0.16,
    centerRadius: 0.34,
    exponent: 1,
  });
  const twelveWorldlineEnvelope = centralRadiusEnvelope({
    count: 12,
    endRadius: 0.16,
    centerRadius: 0.36,
    exponent: 1,
  });
  const equalDual = Array(12).fill(0.26);
  const equalSingleSpacing = Array(5).fill(DEFAULT_SPACING);
  const equalDualSpacing = Array(11).fill(DEFAULT_SPACING);
  const brokenSpacing = equalDualSpacing.map(
    (value, index) => value * (index < 5 ? 0.96 : index === 5 ? 1.12 : 1.02),
  );
  const brokenRadii = twelveWorldlineEnvelope.map(
    (value, index) => value * (index < 6 ? 0.94 : 1.05),
  );
  const references = [
    createCommonAxisBraidTrainSpec({
      specId: "family-b-six-architrino-central-reference",
      label: "Family-B six-architrino central-envelope reference",
      geometryClass: "six-architrino",
      radii: sixWorldlineEnvelope,
      spacings: equalSingleSpacing,
    }),
    createCommonAxisBraidTrainSpec({
      specId: "family-c-c2-central-no-accessory",
      label: "C2 central-envelope no-Accessory-Configuration reference",
      geometryClass: "twelve-architrino",
      radii: twelveWorldlineEnvelope,
      spacings: equalDualSpacing,
    }),
    createCommonAxisBraidTrainSpec({
      specId: "family-c-c2-central-six-accessory",
      label: "C2 central-envelope six-architrino Accessory Configuration reference",
      geometryClass: "twelve-architrino",
      radii: twelveWorldlineEnvelope,
      spacings: equalDualSpacing,
      additionalWorldlineCount: 6,
    }),
    createCommonAxisBraidTrainSpec({
      specId: "family-c-c2-equal-radius-no-accessory",
      label: "C2 equal-radius no-Accessory-Configuration control",
      geometryClass: "twelve-architrino",
      radii: equalDual,
      spacings: equalDualSpacing,
    }),
    createCommonAxisBraidTrainSpec({
      specId: "family-c-c2-reflection-broken",
      label: "C2 reflection-broken adverse control",
      geometryClass: "twelve-architrino",
      radii: brokenRadii,
      spacings: brokenSpacing,
    }),
    createCommonAxisBraidTrainSpec({
      specId: "family-c-c2-crossed-pairing-six-accessory",
      label: "C2 central-envelope six-accessory crossed-pairing control",
      geometryClass: "twelve-architrino",
      radii: twelveWorldlineEnvelope,
      spacings: equalDualSpacing,
      additionalWorldlineCount: 6,
      counterpartMode: "subset-reflection",
    }),
  ];
  const rows = references.map((spec) => ({
    caseType: "bounded-pilot-reference",
    spec,
    sourceRecord: createCommonAxisBraidExactSourceRecord(spec),
  }));
  if (includeNeighborhoodSamples) {
    references.forEach((reference, index) => {
      const sampleSeed = seed + index;
      const spec = perturbReference(reference, sampleSeed);
      rows.push({
        caseType: "seeded-neighborhood-sample",
        seed: sampleSeed,
        spec,
        sourceRecord: createCommonAxisBraidExactSourceRecord(spec),
      });
    });
  }
  return rows;
}

export function perturbCommonAxisBraidSpacingScale(rawSpec, delta) {
  const spec = validateCommonAxisBraidTrainSpec(rawSpec);
  const scale = 1 + delta;
  if (!(scale > 0)) throw new RangeError("spacing scale must remain positive.");
  const perturbed = structuredClone(spec);
  perturbed.architrinoWorldlines.forEach((worldline) => {
    worldline.axialCoordinate *= scale;
  });
  perturbed.spacingVector = perturbed.spacingVector.map((value) => value * scale);
  perturbed.trainLength *= scale;
  const worldlineById = new Map(
    perturbed.architrinoWorldlines.map((row) => [row.id, row]),
  );
  perturbed.binaryRelations.forEach((relation) => {
    const left = worldlineById.get(relation.worldlineIds[0]);
    const right = worldlineById.get(relation.worldlineIds[1]);
    relation.axialMidpoint = (left.axialCoordinate + right.axialCoordinate) / 2;
    relation.axialSeparation = Math.abs(right.axialCoordinate - left.axialCoordinate);
  });
  return validateCommonAxisBraidTrainSpec(perturbed);
}

export const COMMON_AXIS_BRAID_SPACING_SENSITIVITY_ADAPTER = Object.freeze({
  coordinateId: "central-spacing-scale",
  coordinatePath: "spacingVector[*] about fixed train midpoint",
  perturbSpec: perturbCommonAxisBraidSpacingScale,
  createSourceRecord: (spec) => createCommonAxisBraidExactSourceRecord(spec),
});
