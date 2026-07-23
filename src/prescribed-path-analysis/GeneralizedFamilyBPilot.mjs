import {
  GENERALIZED_FAMILY_B_TRAIN_SPEC_SCHEMA,
  centralRadiusEnvelope,
  createGeneralizedFamilyBExactSourceRecord,
  orderedCoordinatesFromSpacings,
  validateGeneralizedFamilyBTrainSpec,
} from "./GeneralizedFamilyBTrain.mjs";

const TWO_PI = 2 * Math.PI;
const RETURN_PERIOD = 4;
const COMMON_ANGULAR_FREQUENCY = TWO_PI / RETURN_PERIOD;
const DEFAULT_SPACING = 0.28;

function counterpartMap(count, mode) {
  const pairs = [];
  if (mode === "adjacent") {
    for (let index = 1; index <= count; index += 2) pairs.push([index, index + 1]);
  } else if (mode === "component-reflection") {
    for (let componentStart = 1; componentStart <= count; componentStart += 6) {
      pairs.push(
        [componentStart, componentStart + 5],
        [componentStart + 1, componentStart + 4],
        [componentStart + 2, componentStart + 3],
      );
    }
  } else {
    throw new TypeError(`unsupported counterpart mode ${mode}.`);
  }
  const map = {};
  for (const [left, right] of pairs) {
    map[`core-${left}`] = `core-${right}`;
    map[`core-${right}`] = `core-${left}`;
  }
  return { map, pairs };
}

function componentRows(geometryClass) {
  if (geometryClass === "single") {
    return [{
      componentId: "single-component",
      orbitalIndices: [1, 2, 3, 4, 5, 6],
      relativePhase: 0,
      relativeCirculation: "not-applicable-single-component",
      ordering: "only-component",
    }];
  }
  return [
    {
      componentId: "component-1",
      orbitalIndices: [1, 2, 3, 4, 5, 6],
      relativePhase: 0,
      relativeCirculation: "reference-positive",
      ordering: "axially-before-component-2",
    },
    {
      componentId: "component-2",
      orbitalIndices: [7, 8, 9, 10, 11, 12],
      relativePhase: Math.PI,
      relativeCirculation: "counter-rotating-to-component-1",
      ordering: "axially-after-component-1",
    },
  ];
}

function payloadSlotRows(count) {
  return Array.from({ length: count / 2 }, (_, index) => ({
    slotId: `payload-slot-${index + 1}`,
    orbitalIndices: [2 * index + 1, 2 * index + 2],
  }));
}

function binaryRelationRows(pairs, orbitals, mode) {
  const byIndex = new Map(orbitals.map((row) => [row.index, row]));
  return pairs.map(([leftIndex, rightIndex]) => {
    const left = byIndex.get(leftIndex);
    const right = byIndex.get(rightIndex);
    return {
      orbitalIds: [left.id, right.id],
      radiusRelation: Math.abs(left.radius - right.radius) < 1e-15
        ? "equal-radius"
        : "independently-declared-radii",
      frequencyRelation: "equal-frequency",
      phaseRelation: mode === "adjacent"
        ? "phase-antipodal-modulo-two-pi"
        : "declared-component-reflection-phase-relation",
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

function createPayloadRows(geometryClass, count, kind = "midpoint") {
  if (count === 0) return [];
  const expected = geometryClass === "single" ? 3 : 6;
  if (count !== expected) throw new RangeError(`payload count must be ${expected}.`);
  return Array.from({ length: count }, (_, index) => ({
    id: `payload-${index + 1}`,
    slotId: `payload-slot-${index + 1}`,
    componentId: geometryClass === "single" || index < 3
      ? (geometryClass === "single" ? "single-component" : "component-1")
      : "component-2",
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
    association:
      "payload architrino working term associated only with its declared adjacent-pair slot",
    symmetryRelation: "reflection-conjugate with the opposite train-half payload slot",
  }));
}

export function createGeneralizedFamilyBTrainSpec({
  specId,
  label,
  geometryClass,
  radii,
  spacings,
  payloadCount = 0,
  payloadKind = "midpoint",
  counterpartMode = "adjacent",
  phaseJitter = [],
  radiusMultipliers = [],
} = {}) {
  const coreCount = geometryClass === "single" ? 6 : 12;
  if (!Array.isArray(radii) || radii.length !== coreCount) {
    throw new TypeError(`radii must contain ${coreCount} values.`);
  }
  if (!Array.isArray(spacings) || spacings.length !== coreCount - 1) {
    throw new TypeError(`spacings must contain ${coreCount - 1} values.`);
  }
  const axialCoordinates = orderedCoordinatesFromSpacings(spacings);
  const { map, pairs } = counterpartMap(coreCount, counterpartMode);
  const components = componentRows(geometryClass);
  const coreOrbitals = Array.from({ length: coreCount }, (_, index) => {
    const componentIndex = geometryClass === "single" || index < 6 ? 0 : 1;
    const localIndex = index % 6;
    const phase = (localIndex % 2 === 0 ? 0 : Math.PI) +
      (components[componentIndex].relativePhase ?? 0) +
      (phaseJitter[index] ?? 0);
    return {
      id: `core-${index + 1}`,
      index: index + 1,
      componentId: components[componentIndex].componentId,
      axialCoordinate: axialCoordinates[index],
      polarity: index % 2 === 0 ? 1 : -1,
      radius: radii[index] * (radiusMultipliers[index] ?? 1),
      angularFrequency: COMMON_ANGULAR_FREQUENCY,
      phase,
      circulationSense: componentIndex === 0 ? 1 : -1,
    };
  });
  const spec = {
    schema: GENERALIZED_FAMILY_B_TRAIN_SPEC_SCHEMA,
    specId,
    label,
    geometryClass,
    claimGrade: "chart-hypothesis",
    evidenceStatus: "display-only",
    prescribedReturnPeriod: RETURN_PERIOD,
    history: { start: 0, end: 8 },
    frame: {
      origin: { x: 0, y: 0, z: 0 },
      n: { x: 1, y: 0, z: 0 },
      e1: { x: 0, y: 1, z: 0 },
      e2: { x: 0, y: 0, z: 1 },
    },
    groupTranslationSpeed: 0.1,
    spacingVector: [...spacings],
    trainLength: axialCoordinates.at(-1) - axialCoordinates[0],
    components,
    coreOrbitals,
    binaryCounterpartMap: map,
    binaryRelations: binaryRelationRows(pairs, coreOrbitals, counterpartMode),
    payloadSlots: payloadSlotRows(coreCount),
    payloads: createPayloadRows(geometryClass, payloadCount, payloadKind),
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
      payloadKind: payloadCount === 0 ? "no-payload" : payloadKind,
      componentCirculation: geometryClass === "single"
        ? "single-component"
        : "counter-rotating",
      frequencyStratum: "equal-frequency",
    },
  };
  return validateGeneralizedFamilyBTrainSpec(spec);
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
  const radii = reference.coreOrbitals.map((row) => row.radius);
  const radiusMultipliers = radii.map(() => 0.97 + 0.06 * random());
  const phaseJitter = radii.map(() => (2 * random() - 1) * Math.PI / 32);
  return createGeneralizedFamilyBTrainSpec({
    specId: `${reference.specId}-seed-${seed}`,
    label: `${reference.label} seeded neighborhood sample`,
    geometryClass: reference.geometryClass,
    radii,
    spacings,
    payloadCount: reference.payloads.length,
    payloadKind: reference.campaignCoordinates.payloadKind === "no-payload"
      ? "midpoint"
      : reference.campaignCoordinates.payloadKind,
    counterpartMode: reference.campaignCoordinates.counterpartMode,
    phaseJitter,
    radiusMultipliers,
  });
}

export function createGeneralizedFamilyBPilotInventory({
  seed = 20210102,
  includeNeighborhoodSamples = true,
} = {}) {
  const singleEnvelope = centralRadiusEnvelope({
    count: 6,
    endRadius: 0.16,
    centerRadius: 0.34,
    exponent: 1,
  });
  const dualEnvelope = centralRadiusEnvelope({
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
  const brokenRadii = dualEnvelope.map(
    (value, index) => value * (index < 6 ? 0.94 : 1.05),
  );
  const references = [
    createGeneralizedFamilyBTrainSpec({
      specId: "generalized-b-single-central-reference",
      label: "single central-envelope reference",
      geometryClass: "single",
      radii: singleEnvelope,
      spacings: equalSingleSpacing,
    }),
    createGeneralizedFamilyBTrainSpec({
      specId: "generalized-b-dual-central-no-payload",
      label: "dual central-envelope no-payload reference",
      geometryClass: "dual",
      radii: dualEnvelope,
      spacings: equalDualSpacing,
    }),
    createGeneralizedFamilyBTrainSpec({
      specId: "generalized-b-dual-central-six-payload",
      label: "dual central-envelope six-payload reference",
      geometryClass: "dual",
      radii: dualEnvelope,
      spacings: equalDualSpacing,
      payloadCount: 6,
    }),
    createGeneralizedFamilyBTrainSpec({
      specId: "generalized-b-dual-equal-radius-no-payload",
      label: "dual equal-radius no-payload control",
      geometryClass: "dual",
      radii: equalDual,
      spacings: equalDualSpacing,
    }),
    createGeneralizedFamilyBTrainSpec({
      specId: "generalized-b-dual-reflection-broken",
      label: "dual reflection-broken adverse control",
      geometryClass: "dual",
      radii: brokenRadii,
      spacings: brokenSpacing,
    }),
    createGeneralizedFamilyBTrainSpec({
      specId: "generalized-b-dual-crossed-pairing-six-payload",
      label: "dual central-envelope six-payload crossed-pairing control",
      geometryClass: "dual",
      radii: dualEnvelope,
      spacings: equalDualSpacing,
      payloadCount: 6,
      counterpartMode: "component-reflection",
    }),
  ];
  const rows = references.map((spec) => ({
    caseType: "bounded-pilot-reference",
    spec,
    sourceRecord: createGeneralizedFamilyBExactSourceRecord(spec),
  }));
  if (includeNeighborhoodSamples) {
    references.forEach((reference, index) => {
      const sampleSeed = seed + index;
      const spec = perturbReference(reference, sampleSeed);
      rows.push({
        caseType: "seeded-neighborhood-sample",
        seed: sampleSeed,
        spec,
        sourceRecord: createGeneralizedFamilyBExactSourceRecord(spec),
      });
    });
  }
  return rows;
}

export function perturbGeneralizedFamilyBSpacingScale(rawSpec, delta) {
  const spec = validateGeneralizedFamilyBTrainSpec(rawSpec);
  const scale = 1 + delta;
  if (!(scale > 0)) throw new RangeError("spacing scale must remain positive.");
  const perturbed = structuredClone(spec);
  perturbed.coreOrbitals.forEach((orbital) => {
    orbital.axialCoordinate *= scale;
  });
  perturbed.spacingVector = perturbed.spacingVector.map((value) => value * scale);
  perturbed.trainLength *= scale;
  const orbitalById = new Map(perturbed.coreOrbitals.map((row) => [row.id, row]));
  perturbed.binaryRelations.forEach((relation) => {
    const left = orbitalById.get(relation.orbitalIds[0]);
    const right = orbitalById.get(relation.orbitalIds[1]);
    relation.axialMidpoint = (left.axialCoordinate + right.axialCoordinate) / 2;
    relation.axialSeparation = Math.abs(right.axialCoordinate - left.axialCoordinate);
  });
  return validateGeneralizedFamilyBTrainSpec(perturbed);
}

export const GENERALIZED_FAMILY_B_SPACING_SENSITIVITY_ADAPTER = Object.freeze({
  coordinateId: "central-spacing-scale",
  coordinatePath: "spacingVector[*] about fixed train midpoint",
  perturbSpec: perturbGeneralizedFamilyBSpacingScale,
  createSourceRecord: (spec) => createGeneralizedFamilyBExactSourceRecord(spec),
});
