#!/usr/bin/env node

// Family-neutral prescribed-braid record generator.
//
// This module evaluates only the exact A/B/C coordinate functions declared by
// a source specification. It invokes no EOM solver, causal-root evaluator,
// retention test, stability test, or energy calculation. Its Hermite segments
// are display paths with chart-hypothesis/display-only provenance.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
} from "../../src/prescribed-path-analysis/ExactPrescribedSourceWake.mjs";

export const PRESCRIBED_BRAID_SPEC_SCHEMA = "prescribed-braid-spec.v1";
export const PRESCRIBED_BRAID_EMITTER_ID = "prescribed-braid-record-emitter.v1";
export const PRESCRIBED_GEOMETRY_ENGINE_ID = "prescribed-geometry";
export const ASSEMBLY_VIEW_RECORD_SCHEMA = "assembly-view-record.v0";

const STATE_FLAG_FOR_POLARITY = Object.freeze({ "1": 1, "-1": 2 });
const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIRECTORY, "../..");
const CONFIGURATION_DIRECTORY = path.resolve(
  REPOSITORY_ROOT,
  "reference/priorities/braid-program/configurations",
);
const RECORD_DIRECTORY = path.resolve(REPOSITORY_ROOT, "content/assets/borg/records");
const GEOMETRY_TOLERANCE = 1e-12;

function target(specFile, outFile) {
  return Object.freeze({
    specPath: path.resolve(CONFIGURATION_DIRECTORY, specFile),
    outPath: path.resolve(RECORD_DIRECTORY, outFile),
  });
}

export const PRESCRIBED_BRAID_TARGETS = Object.freeze([
  target("family-a-a1-general.v1.json", "family-a-a1-general.assembly-view-record.v0.json"),
  target("family-a-a1-1-equal-frequency.v1.json", "family-a-a1-1-equal-frequency.assembly-view-record.v0.json"),
  target("family-a-a1-2-equal-frequency-equal-radius.v1.json", "family-a-a1-2-equal-frequency-equal-radius.assembly-view-record.v0.json"),
  target("family-a-a1-3-4-2-1-frequency.v1.json", "family-a-a1-3-4-2-1-frequency.assembly-view-record.v0.json"),
  target("family-a-a1-4-3-2-1-frequency.v1.json", "family-a-a1-4-3-2-1-frequency.assembly-view-record.v0.json"),
  target("family-a-a2-fully-symmetric.v1.json", "family-a-a2-fully-symmetric.assembly-view-record.v0.json"),
  target("family-a-a3-general.v1.json", "family-a-a3-general.assembly-view-record.v0.json"),
  target("family-a-a3-1-equal-frequency.v1.json", "family-a-a3-1-equal-frequency.assembly-view-record.v0.json"),
  target("family-a-a3-2-equal-frequency-equal-radius.v1.json", "family-a-a3-2-equal-frequency-equal-radius.assembly-view-record.v0.json"),
  target("family-a-a3-3-4-2-1-frequency.v1.json", "family-a-a3-3-4-2-1-frequency.assembly-view-record.v0.json"),
  target("family-a-a3-4-3-2-1-frequency.v1.json", "family-a-a3-4-3-2-1-frequency.assembly-view-record.v0.json"),
  // These four output URLs and source ids remain stable compatibility contracts.
  target("illustrative-spindle-chart-hypothesis.v0.json", "illustrative-spindle-chart-hypothesis.assembly-view-record.v0.json"),
  target("illustrative-extreme-cap-tilt-spindle-variant.v0.json", "illustrative-extreme-cap-tilt-spindle-variant.assembly-view-record.v0.json"),
  target("illustrative-planar-tri-binary-spindle-boundary.v0.json", "illustrative-planar-tri-binary-spindle-boundary.assembly-view-record.v0.json"),
  target("illustrative-full-cap-axial-spindle-boundary.v0.json", "illustrative-full-cap-axial-spindle-boundary.assembly-view-record.v0.json"),
  target("family-c-c1-co-rotating-b1-pair.v1.json", "family-c-c1-co-rotating-b1-pair.assembly-view-record.v0.json"),
  target("family-c-c2-counter-rotating-b1-pair.v1.json", "family-c-c2-counter-rotating-b1-pair.assembly-view-record.v0.json"),
  target("family-c-c1-1-co-rotating-b1-3-pair.v1.json", "family-c-c1-1-co-rotating-b1-3-pair.assembly-view-record.v0.json"),
  target("family-c-c2-1-counter-rotating-b1-3-pair.v1.json", "family-c-c2-1-counter-rotating-b1-3-pair.assembly-view-record.v0.json"),
]);

export const DEFAULT_PRESCRIBED_BRAID_SPEC_PATH = PRESCRIBED_BRAID_TARGETS[0].specPath;
export const DEFAULT_PRESCRIBED_BRAID_RECORD_PATH = PRESCRIBED_BRAID_TARGETS[0].outPath;

const FAMILY_MEMBERS = Object.freeze({
  A: Object.freeze([
    "A1", "A1.1", "A1.2", "A1.3", "A1.4", "A2",
    "A3", "A3.1", "A3.2", "A3.3", "A3.4",
  ]),
  B: Object.freeze(["B1", "B1.1", "B1.2", "B1.3", "B1.4"]),
  C: Object.freeze(["C1", "C1.1", "C2", "C2.1"]),
});

export function validatePrescribedBraidSpec(spec) {
  if (!spec || typeof spec !== "object" || spec.schema !== PRESCRIBED_BRAID_SPEC_SCHEMA) {
    throw new TypeError(
      `prescribed braid specification requires schema ${PRESCRIBED_BRAID_SPEC_SCHEMA}.`,
    );
  }
  for (const field of ["specId", "label", "provenanceDescription", "date"]) {
    requireConcreteString(spec[field], field);
  }
  if (spec.claimGrade !== "chart-hypothesis" || spec.evidenceStatus !== "display-only") {
    throw new TypeError(
      "prescribed braid specification must remain claimGrade=chart-hypothesis and evidenceStatus=display-only.",
    );
  }
  validateTaxonomy(spec.taxonomy);
  validateIllustrativeCoordinates(spec.illustrativeCoordinates);
  validateCompatibility(spec.compatibility);
  vector3(spec.group?.centerAtEpoch, "group.centerAtEpoch");
  vector3(spec.group?.velocity, "group.velocity");
  const returnPeriod = requirePositiveFinite(
    spec.prescribedReturnPeriod,
    "prescribedReturnPeriod",
  );
  if (!Number.isSafeInteger(spec.displayTrailPeriods) || spec.displayTrailPeriods !== 1) {
    throw new TypeError(
      "prescribed braid displayTrailPeriods must be exactly 1 so the trail spans one complete return cycle.",
    );
  }
  const expectedBraidCount = spec.taxonomy.familyId === "C" ? 2 : 1;
  if (!Array.isArray(spec.braids) || spec.braids.length !== expectedBraidCount) {
    throw new TypeError(
      `prescribed braid ${spec.taxonomy.memberId} requires exactly ${expectedBraidCount} component braid(s).`,
    );
  }
  const binaryIds = new Set();
  const worldlineIds = new Set();
  spec.braids.forEach((braid, braidIndex) => {
    validateBraid(braid, braidIndex, spec.taxonomy.familyId, returnPeriod, {
      binaryIds,
      worldlineIds,
    });
  });
  validateSourceOrder(spec.sourceOrder, binaryIds);
  validateMemberConstraints(spec);
  validateRecordAndInterpolation(spec);
  validateEnvelope(spec);
  return spec;
}

function validateTaxonomy(taxonomy) {
  if (!taxonomy || typeof taxonomy !== "object" || Array.isArray(taxonomy)) {
    throw new TypeError("prescribed braid specification requires taxonomy metadata.");
  }
  for (const field of [
    "familyId",
    "familyLabel",
    "memberId",
    "memberLabel",
    "displayLabel",
    "canonSource",
  ]) {
    requireConcreteString(taxonomy[field], `taxonomy.${field}`);
  }
  if (!FAMILY_MEMBERS[taxonomy.familyId]?.includes(taxonomy.memberId)) {
    throw new TypeError(
      `prescribed braid taxonomy member ${taxonomy.memberId} is not valid in Family ${taxonomy.familyId}.`,
    );
  }
  if (taxonomy.familyLabel !== `Family ${taxonomy.familyId}`) {
    throw new TypeError("prescribed braid taxonomy.familyLabel must be Family A, Family B, or Family C.");
  }
  if (!taxonomy.displayLabel.startsWith(`${taxonomy.memberId} — `)) {
    throw new TypeError(
      "prescribed braid taxonomy.displayLabel must begin with its taxonomy member identifier.",
    );
  }
}

function validateIllustrativeCoordinates(declaration) {
  if (!declaration || declaration.status !== "prescribed-display-coordinates") {
    throw new TypeError(
      "prescribed braid illustrativeCoordinates.status must be prescribed-display-coordinates.",
    );
  }
  if (!Array.isArray(declaration.choices) || declaration.choices.length === 0) {
    throw new TypeError("prescribed braid illustrativeCoordinates.choices must be nonempty.");
  }
  declaration.choices.forEach((choice, index) =>
    requireConcreteString(choice, `illustrativeCoordinates.choices[${index}]`));
}

function validateCompatibility(compatibility) {
  if (compatibility == null) return;
  if (!Array.isArray(compatibility.retainedIdentifiers)) {
    throw new TypeError("prescribed braid compatibility.retainedIdentifiers must be an array.");
  }
  compatibility.retainedIdentifiers.forEach((row, index) => {
    for (const field of ["kind", "value", "reason"]) {
      requireConcreteString(row?.[field], `compatibility.retainedIdentifiers[${index}].${field}`);
    }
  });
}

function validateBraid(braid, braidIndex, familyId, returnPeriod, identities) {
  const label = `braids[${braidIndex}]`;
  requireConcreteString(braid?.braidId, `${label}.braidId`);
  vector3(braid?.centerOffset, `${label}.centerOffset`);
  requireFinite(braid?.phaseOffset, `${label}.phaseOffset`);
  if (braid?.circulationSense !== -1 && braid?.circulationSense !== 1) {
    throw new TypeError(`${label}.circulationSense must be -1 or +1.`);
  }
  validateFrameDefinition(braid?.frameDefinition, `${label}.frameDefinition`, familyId);
  if (!Array.isArray(braid?.binaries) || braid.binaries.length !== 3) {
    throw new TypeError(`${label}.binaries must contain exactly three persistent binaries.`);
  }
  braid.binaries.forEach((binary, binaryIndex) => {
    validateBinary(binary, braidIndex, binaryIndex, returnPeriod, identities);
  });
}

function validateFrameDefinition(frame, label, familyId) {
  if (!frame || typeof frame !== "object") {
    throw new TypeError(`${label} is required.`);
  }
  if (familyId === "A") {
    if (frame.type !== "family-a-flattening.v1") {
      throw new TypeError(`${label}.type must be family-a-flattening.v1 for Family A.`);
    }
    const lambda = requireFinite(frame.flattening, `${label}.flattening`);
    if (lambda < 0 || lambda > 1) {
      throw new RangeError(`${label}.flattening must satisfy 0 <= lambda_A <= 1.`);
    }
    validateOrthonormalAxes(frame.nearRestAxes, `${label}.nearRestAxes`);
    if (typeof frame.phaseCompensatedCyclicFrames !== "boolean") {
      throw new TypeError(`${label}.phaseCompensatedCyclicFrames must be boolean.`);
    }
    if (frame.interpolation !== "normalized-linear-to-equal-component/v1") {
      throw new TypeError(
        `${label}.interpolation must be normalized-linear-to-equal-component/v1.`,
      );
    }
    return;
  }
  if (frame.type !== "orthonormal.v1") {
    throw new TypeError(`${label}.type must be orthonormal.v1 for Family ${familyId}.`);
  }
  validateOrthonormalFrame(frame, label);
}

function validateOrthonormalAxes(axes, label) {
  if (!Array.isArray(axes) || axes.length !== 3) {
    throw new TypeError(`${label} must contain three axes.`);
  }
  const rows = axes.map((axis, index) => vector3(axis, `${label}[${index}]`));
  rows.forEach((axis, index) => requireNear(norm(axis), 1, GEOMETRY_TOLERANCE, `${label}[${index}] unit length`));
  for (let left = 0; left < 3; left += 1) {
    for (let right = left + 1; right < 3; right += 1) {
      requireNear(dot(rows[left], rows[right]), 0, GEOMETRY_TOLERANCE, `${label} orthogonality`);
    }
  }
  const handedness = dot(cross(rows[0], rows[1]), rows[2]);
  requireNear(handedness, 1, GEOMETRY_TOLERANCE, `${label} right-handedness`);
}

function validateOrthonormalFrame(frame, label) {
  const e1 = vector3(frame.e1, `${label}.e1`);
  const e2 = vector3(frame.e2, `${label}.e2`);
  const axis = vector3(frame.axis, `${label}.axis`);
  requireNear(norm(e1), 1, GEOMETRY_TOLERANCE, `${label}.e1 unit length`);
  requireNear(norm(e2), 1, GEOMETRY_TOLERANCE, `${label}.e2 unit length`);
  requireNear(norm(axis), 1, GEOMETRY_TOLERANCE, `${label}.axis unit length`);
  requireNear(dot(e1, e2), 0, GEOMETRY_TOLERANCE, `${label}.e1/e2 orthogonality`);
  requireNear(dot(e1, axis), 0, GEOMETRY_TOLERANCE, `${label}.e1/axis orthogonality`);
  requireNear(dot(e2, axis), 0, GEOMETRY_TOLERANCE, `${label}.e2/axis orthogonality`);
  if (norm(subtract(cross(e1, e2), axis)) > GEOMETRY_TOLERANCE) {
    throw new RangeError(`${label} must be right-handed.`);
  }
}

function validateBinary(binary, braidIndex, binaryIndex, returnPeriod, identities) {
  const label = `braids[${braidIndex}].binaries[${binaryIndex}]`;
  if (binary?.binaryIndex !== binaryIndex + 1) {
    throw new TypeError(`${label}.binaryIndex must preserve the persistent index ${binaryIndex + 1}.`);
  }
  requireConcreteString(binary?.binaryId, `${label}.binaryId`);
  if (identities.binaryIds.has(binary.binaryId)) {
    throw new TypeError(`prescribed braid binary id ${binary.binaryId} is duplicated.`);
  }
  identities.binaryIds.add(binary.binaryId);
  if (!Array.isArray(binary.worldlineIds) || binary.worldlineIds.length !== 2) {
    throw new TypeError(`${label}.worldlineIds must contain two endpoint ids.`);
  }
  binary.worldlineIds.forEach((id, endpointIndex) => {
    requireConcreteString(id, `${label}.worldlineIds[${endpointIndex}]`);
    if (identities.worldlineIds.has(id)) {
      throw new TypeError(`prescribed braid worldline id ${id} is duplicated.`);
    }
    identities.worldlineIds.add(id);
  });
  vector3(binary.centerOffset, `${label}.centerOffset`);
  const radius = requirePositiveFinite(binary.radius, `${label}.radius`);
  const axialHalfSeparation = requireNonnegativeFinite(
    binary.axialHalfSeparation,
    `${label}.axialHalfSeparation`,
  );
  const transverseOrbitRadius = requireNonnegativeFinite(
    binary.transverseOrbitRadius,
    `${label}.transverseOrbitRadius`,
  );
  requireNear(
    axialHalfSeparation ** 2 + transverseOrbitRadius ** 2,
    radius ** 2,
    GEOMETRY_TOLERANCE,
    `${label} radius decomposition`,
  );
  const frequency = requirePositiveFinite(binary.frequency, `${label}.frequency`);
  const cycles = frequency * returnPeriod;
  requireNear(cycles, Math.round(cycles), GEOMETRY_TOLERANCE, `${label} return-period cycles`);
  requireFinite(binary.phase, `${label}.phase`);
  if (binary.polarityAssignment !== -1 && binary.polarityAssignment !== 1) {
    throw new TypeError(`${label}.polarityAssignment must be -1 or +1.`);
  }
}

function validateSourceOrder(sourceOrder, binaryIds) {
  if (!Array.isArray(sourceOrder) || sourceOrder.length !== binaryIds.size) {
    throw new TypeError("prescribed braid sourceOrder must name every binary exactly once.");
  }
  if (new Set(sourceOrder).size !== sourceOrder.length || sourceOrder.some((id) => !binaryIds.has(id))) {
    throw new TypeError("prescribed braid sourceOrder must preserve the declared binary identities.");
  }
}

function validateMemberConstraints(spec) {
  const memberId = spec.taxonomy.memberId;
  const braids = spec.braids;
  const binaries = braids[0].binaries;
  const equal = (read) => binaries.every((binary) => near(read(binary), read(binaries[0])));
  const phasePattern = [0, 2 * Math.PI / 3, 4 * Math.PI / 3];
  const phasesMatch = binaries.every((binary, index) =>
    near(wrappedAngle(binary.phase), wrappedAngle(phasePattern[index])));
  if (spec.taxonomy.familyId === "A") {
    if (!braids.every((braid) => braid.centerOffset.every((coordinate) => near(coordinate, 0))) ||
        !binaries.every((binary) => binary.centerOffset.every((coordinate) => near(coordinate, 0)))) {
      throw new RangeError("Family A requires every binary midpoint at the braid origin in the relative frame.");
    }
  }
  if (memberId === "A1" || memberId.startsWith("A1.")) {
    if (!binaries.every((binary) =>
      near(binary.axialHalfSeparation, 0) &&
      near(binary.transverseOrbitRadius, binary.radius))) {
      throw new RangeError(`${memberId} requires h_a=0 and rho_a=R_a for every binary.`);
    }
  }
  if ((memberId === "A1.1" || memberId === "A3.1") && !equal((binary) => binary.frequency)) {
    throw new RangeError(`${memberId} requires one common frequency.`);
  }
  if ((memberId === "A1.2" || memberId === "A3.2") && !(
    equal((binary) => binary.radius) &&
    equal((binary) => binary.frequency) &&
    phasesMatch
  )) {
    throw new RangeError(`${memberId} requires equal radii, equal frequencies, and 120-degree phase spacing.`);
  }
  if (memberId === "A1.3" || memberId === "A3.3") {
    validateFrequencyRatio(binaries, [4, 2, 1], memberId);
  }
  if (memberId === "A1.4" || memberId === "A3.4") {
    validateFrequencyRatio(binaries, [3, 2, 1], memberId);
  }
  if (memberId === "A2") {
    const frame = braids[0].frameDefinition;
    if (!(
      equal((binary) => binary.radius) &&
      equal((binary) => binary.axialHalfSeparation) &&
      equal((binary) => binary.transverseOrbitRadius) &&
      equal((binary) => binary.frequency) &&
      phasesMatch &&
      frame.phaseCompensatedCyclicFrames
    )) {
      throw new RangeError(
        "A2 requires equal geometry, equal frequencies, 120-degree phases, and phase-compensated cyclic frames.",
      );
    }
  }
  if (spec.taxonomy.familyId === "B" || spec.taxonomy.familyId === "C") {
    braids.forEach((braid, braidIndex) => validateB1Component(braid, braidIndex));
  }
  if (memberId === "B1.1" && !binaries.every((binary) =>
    binary.axialHalfSeparation > 0 && binary.transverseOrbitRadius > 0)) {
    throw new RangeError("B1.1 requires h_a>0 and rho_a>0 for every binary.");
  }
  if (memberId === "B1.2" && !binaries.every((binary) =>
    binary.axialHalfSeparation > binary.transverseOrbitRadius &&
    binary.transverseOrbitRadius > 0)) {
    throw new RangeError("B1.2 requires h_a>rho_a>0 for every binary.");
  }
  if (memberId === "B1.3" && !binaries.every((binary) =>
    near(binary.axialHalfSeparation, 0) &&
    near(binary.transverseOrbitRadius, binary.radius))) {
    throw new RangeError("B1.3 requires h_a=0 and rho_a=R_a for every binary.");
  }
  if (memberId === "B1.4" && !binaries.every((binary) =>
    near(binary.transverseOrbitRadius, 0) &&
    near(binary.axialHalfSeparation, binary.radius))) {
    throw new RangeError("B1.4 requires rho_a=0 and h_a=R_a for every binary.");
  }
  if (spec.taxonomy.familyId === "C") {
    const [left, right] = braids;
    if (near(norm(subtract(left.centerOffset, right.centerOffset)), 0)) {
      throw new RangeError("Family C requires two distinct declared braid centers.");
    }
    if ((memberId === "C1" || memberId === "C1.1") &&
        left.circulationSense !== right.circulationSense) {
      throw new RangeError(`${memberId} requires a common circulation sense.`);
    }
    if ((memberId === "C2" || memberId === "C2.1") &&
        left.circulationSense !== -right.circulationSense) {
      throw new RangeError(`${memberId} requires opposite circulation senses.`);
    }
    if ((memberId === "C1.1" || memberId === "C2.1") &&
        !braids.every((braid) => braid.binaries.every((binary) =>
          near(binary.axialHalfSeparation, 0) &&
          near(binary.transverseOrbitRadius, binary.radius)))) {
      throw new RangeError(`${memberId} requires two all-equatorial B1.3 components.`);
    }
    if (memberId === "C1.1" || memberId === "C2.1") {
      const leftAxis = left.frameDefinition.axis;
      const rightAxis = right.frameDefinition.axis;
      const centerDisplacement = subtract(right.centerOffset, left.centerOffset);
      const transverseDisplacement = subtract(
        centerDisplacement,
        scale(leftAxis, dot(centerDisplacement, leftAxis)),
      );
      if (norm(subtract(leftAxis, rightAxis)) > GEOMETRY_TOLERANCE ||
          norm(transverseDisplacement) > GEOMETRY_TOLERANCE) {
        throw new RangeError(
          `${memberId} requires coaxial B1.3 components separated along their common oriented axis.`,
        );
      }
    }
  }
}

function validateB1Component(braid, braidIndex) {
  const [reference, ...others] = braid.binaries;
  if (!others.every((binary) => near(binary.frequency, reference.frequency))) {
    throw new RangeError(`braids[${braidIndex}] must be a common-frequency B1 component.`);
  }
  if (!braid.binaries.every((binary) =>
    binary.centerOffset.every((coordinate) => near(coordinate, 0)))) {
    throw new RangeError(
      `braids[${braidIndex}] must place every B1 binary midpoint at its braid center.`,
    );
  }
}

function validateFrequencyRatio(binaries, ratio, memberId) {
  const base = binaries[2].frequency;
  if (!binaries.every((binary, index) => near(binary.frequency, ratio[index] * base))) {
    throw new RangeError(`${memberId} requires the indexed frequency ratio ${ratio.join(":")}.`);
  }
}

function validateRecordAndInterpolation(spec) {
  const start = requireFinite(spec.recordInterval?.start, "recordInterval.start");
  const end = requireFinite(spec.recordInterval?.end, "recordInterval.end");
  if (!(end > start)) throw new RangeError("prescribed braid record interval requires end > start.");
  const delayHorizon = requireNonnegativeFinite(
    spec.recordInterval?.delayHorizon,
    "recordInterval.delayHorizon",
  );
  if (delayHorizon > end - start) {
    throw new RangeError("prescribed braid delayHorizon must not exceed the record duration.");
  }
  if (spec.interpolation?.rule !== "piecewise-cubic-hermite/v0") {
    throw new TypeError("prescribed braid interpolation rule must be piecewise-cubic-hermite/v0.");
  }
  if (spec.interpolation?.errorMethod !== "fourth-derivative-hermite-envelope/v1") {
    throw new TypeError(
      "prescribed braid interpolation errorMethod must be fourth-derivative-hermite-envelope/v1.",
    );
  }
  for (const field of ["interval", "positionDivisor", "velocityDivisor", "roundoffMultiplier"]) {
    requirePositiveFinite(spec.interpolation?.[field], `interpolation.${field}`);
  }
  if (!Number.isSafeInteger(spec.ansatzSampleCount) || spec.ansatzSampleCount < 8) {
    throw new TypeError("prescribed braid ansatzSampleCount must be a safe integer >= 8.");
  }
  requirePositiveFinite(spec.sphericalEnvelopeRadius, "sphericalEnvelopeRadius");
}

function validateEnvelope(spec) {
  const materialized = materializeValidatedSpec(spec);
  const { start, end } = spec.recordInterval;
  const groupCenter = spec.group.centerAtEpoch;
  const velocity = spec.group.velocity;
  let maximum = 0;
  for (const binary of materialized.binaries) {
    for (const time of [start, end]) {
      const center = add(groupCenter, scale(velocity, time), binary.centerOffset);
      maximum = Math.max(maximum, norm(center) + binary.radius);
    }
  }
  if (maximum > spec.sphericalEnvelopeRadius + GEOMETRY_TOLERANCE) {
    throw new RangeError(
      `prescribed braid exceeds sphericalEnvelopeRadius; required at least ${maximum}.`,
    );
  }
}

function materializeValidatedSpec(spec) {
  const binaries = [];
  const familyA = spec.taxonomy.familyId === "A";
  spec.braids.forEach((braid, braidIndex) => {
    const frames = familyA
      ? materializeFamilyAFrames(braid)
      : braid.binaries.map(() => ({
        e1: [...braid.frameDefinition.e1],
        e2: [...braid.frameDefinition.e2],
        axis: [...braid.frameDefinition.axis],
      }));
    braid.binaries.forEach((binary, binaryIndex) => {
      let frame = frames[binaryIndex];
      if (familyA && braid.frameDefinition.phaseCompensatedCyclicFrames) {
        frame = rotateTransverseFrame(frame, -binary.phase);
      }
      binaries.push(Object.freeze({
        braidIndex,
        binaryIndex,
        braidId: braid.braidId,
        binaryId: binary.binaryId,
        worldlineIds: Object.freeze([...binary.worldlineIds]),
        centerOffset: Object.freeze(add(braid.centerOffset, binary.centerOffset)),
        radius: binary.radius,
        axialHalfSeparation: binary.axialHalfSeparation,
        transverseOrbitRadius: binary.transverseOrbitRadius,
        frequency: binary.frequency,
        phase: binary.phase + braid.phaseOffset,
        polarityAssignment: binary.polarityAssignment,
        circulationSense: braid.circulationSense,
        frame: Object.freeze({
          e1: Object.freeze(frame.e1),
          e2: Object.freeze(frame.e2),
          axis: Object.freeze(frame.axis),
        }),
      }));
    });
  });
  return Object.freeze({ spec, binaries: Object.freeze(binaries) });
}

function materializeFamilyAFrames(braid) {
  const axes0 = braid.frameDefinition.nearRestAxes;
  const translationDirection = normalize(add(...axes0));
  const lambda = braid.frameDefinition.flattening;
  return axes0.map((axis0, index) => {
    const axis = normalize(add(scale(axis0, 1 - lambda), scale(translationDirection, lambda)));
    const reference = axes0[(index + 1) % axes0.length];
    const e1 = normalize(subtract(reference, scale(axis, dot(reference, axis))));
    const e2 = normalize(cross(axis, e1));
    return { e1, e2, axis };
  });
}

function rotateTransverseFrame(frame, angle) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return {
    e1: add(scale(frame.e1, cosine), scale(frame.e2, sine)),
    e2: add(scale(frame.e1, -sine), scale(frame.e2, cosine)),
    axis: [...frame.axis],
  };
}

export function materializePrescribedBraidSpec(rawSpec) {
  const spec = validatePrescribedBraidSpec(rawSpec);
  return materializeValidatedSpec(spec);
}

export function evaluatePrescribedBraidSite(
  rawSpec,
  braidIndex,
  binaryIndex,
  endpointIndex,
  time,
) {
  const materialized = materializePrescribedBraidSpec(rawSpec);
  const binary = materialized.binaries.find((row) =>
    row.braidIndex === braidIndex && row.binaryIndex === binaryIndex);
  if (!binary || (endpointIndex !== 0 && endpointIndex !== 1)) {
    throw new RangeError(
      "prescribed braid evaluation requires a declared braid, binary, and endpoint 0 or 1.",
    );
  }
  return evaluateMaterializedSite(materialized.spec, binary, endpointIndex, time);
}

function evaluateMaterializedSite(spec, binary, endpointIndex, time) {
  const T = requireFinite(time, "evaluation time");
  const sign = endpointIndex === 0 ? 1 : -1;
  const angularVelocity = binary.circulationSense * 2 * Math.PI * binary.frequency;
  const theta = angularVelocity * T + binary.phase;
  const rotating = add(
    scale(binary.frame.e1, Math.cos(theta)),
    scale(binary.frame.e2, Math.sin(theta)),
  );
  const tangent = add(
    scale(binary.frame.e1, -Math.sin(theta)),
    scale(binary.frame.e2, Math.cos(theta)),
  );
  const center = add(
    spec.group.centerAtEpoch,
    scale(spec.group.velocity, T),
    binary.centerOffset,
  );
  const halfSeparation = add(
    scale(binary.frame.axis, binary.axialHalfSeparation),
    scale(rotating, binary.transverseOrbitRadius),
  );
  const position = add(center, scale(halfSeparation, sign));
  const velocity = add(
    spec.group.velocity,
    scale(tangent, sign * angularVelocity * binary.transverseOrbitRadius),
  );
  return Object.freeze({
    position: Object.freeze(position),
    velocity: Object.freeze(velocity),
    responseCenter: Object.freeze(add(spec.group.centerAtEpoch, scale(spec.group.velocity, T))),
    binaryCenter: Object.freeze(center),
    axis: Object.freeze([...binary.frame.axis]),
    axialHalfSeparation: sign * binary.axialHalfSeparation,
    transverseOrbitRadius: binary.transverseOrbitRadius,
    carrierSpeed: Math.abs(angularVelocity) * binary.transverseOrbitRadius,
  });
}

export function createPrescribedBraidExactSourceRecord(rawSpec, options = {}) {
  const materialized = materializePrescribedBraidSpec(rawSpec);
  const { spec } = materialized;
  const sources = [];
  materialized.binaries.forEach((binary) => {
    binary.worldlineIds.forEach((worldlineId, endpointIndex) => {
      const sign = endpointIndex === 0 ? 1 : -1;
      const charge = endpointIndex === 0
        ? binary.polarityAssignment
        : -binary.polarityAssignment;
      const angularVelocity = binary.circulationSense * 2 * Math.PI * binary.frequency;
      sources.push({
        id: worldlineId,
        charge,
        trajectory: {
          kind: "moving-circular.v1",
          epochTime: 0,
          centerAtEpoch: objectVector(add(
            spec.group.centerAtEpoch,
            binary.centerOffset,
            scale(binary.frame.axis, sign * binary.axialHalfSeparation),
          )),
          centerVelocity: objectVector(spec.group.velocity),
          radiusU: objectVector(scale(binary.frame.e1, sign * binary.transverseOrbitRadius)),
          radiusV: objectVector(scale(binary.frame.e2, sign * binary.transverseOrbitRadius)),
          angularVelocity,
          angularAcceleration: 0,
          phaseAtEpoch: binary.phase,
        },
      });
    });
  });
  return {
    schema: EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
    recordId: spec.specId,
    sourceSchema: spec.schema,
    sourceHash: options.sourceHash ?? null,
    generatingSpec: options.generatingSpec ?? null,
    engineId: PRESCRIBED_GEOMETRY_ENGINE_ID,
    engineVersion: PRESCRIBED_BRAID_EMITTER_ID,
    claimGrade: spec.claimGrade,
    evidenceStatus: spec.evidenceStatus,
    taxonomy: structuredClone(spec.taxonomy),
    parameterVector: createParameterVector(materialized),
    history: {
      start: spec.recordInterval.start,
      end: spec.recordInterval.end,
    },
    sources,
  };
}

function createParameterVector(materialized) {
  const { spec } = materialized;
  return {
    group: structuredClone(spec.group),
    prescribedReturnPeriod: spec.prescribedReturnPeriod,
    braids: spec.braids.map((braid, braidIndex) => ({
      braidId: braid.braidId,
      centerOffset: [...braid.centerOffset],
      phaseOffset: braid.phaseOffset,
      circulationSense: braid.circulationSense,
      frameDefinition: structuredClone(braid.frameDefinition),
      binaries: materialized.binaries.filter((row) => row.braidIndex === braidIndex).map(
        (binary) => ({
          binaryIndex: binary.binaryIndex + 1,
          binaryId: binary.binaryId,
          worldlineIds: [...binary.worldlineIds],
          centerOffset: [...binary.centerOffset],
          radius: binary.radius,
          axialHalfSeparation: binary.axialHalfSeparation,
          transverseOrbitRadius: binary.transverseOrbitRadius,
          frequency: binary.frequency,
          phase: binary.phase,
          circulationSense: binary.circulationSense,
          polarityAssignment: binary.polarityAssignment,
          axis: objectVector(binary.frame.axis),
          transverseFrame: [objectVector(binary.frame.e1), objectVector(binary.frame.e2)],
        }),
      ),
    })),
    illustrativeCoordinates: structuredClone(spec.illustrativeCoordinates),
    compatibility: structuredClone(spec.compatibility ?? { retainedIdentifiers: [] }),
  };
}

export function generatePrescribedBraidRecord(rawSpec, options = {}) {
  const materialized = materializePrescribedBraidSpec(rawSpec);
  const { spec } = materialized;
  const { start, end, delayHorizon } = spec.recordInterval;
  const segmentCount = Math.ceil((end - start) / spec.interpolation.interval);
  const actualStep = (end - start) / segmentCount;
  const worldlines = [];
  const binaries = [];
  const ansatz = [];

  materialized.binaries.forEach((binary) => {
    const angularFrequency = binary.circulationSense * 2 * Math.PI * binary.frequency;
    binary.worldlineIds.forEach((worldlineId, endpointIndex) => {
      const polarity = endpointIndex === 0
        ? binary.polarityAssignment
        : -binary.polarityAssignment;
      const segments = [];
      for (let index = 0; index < segmentCount; index += 1) {
        const segmentStart = start + index * actualStep;
        const segmentEnd = index + 1 === segmentCount
          ? end
          : start + (index + 1) * actualStep;
        segments.push(createHermiteSegment(
          spec,
          binary,
          endpointIndex,
          segmentStart,
          segmentEnd,
        ));
      }
      worldlines.push({
        id: worldlineId,
        pathKey: worldlineId,
        polarity,
        charge: polarity,
        stateFlags: STATE_FLAG_FOR_POLARITY[String(polarity)],
        coverageStart: start,
        coverageEnd: end,
        interpolation: spec.interpolation.rule,
        segments,
      });
      ansatz.push({
        id: `${worldlineId}-prescribed-return-cycle`,
        worldlineId,
        label: `${spec.taxonomy.displayLabel}, ${binary.binaryId}, endpoint ${endpointIndex + 1}`,
        points: createAnsatzPoints(spec, binary, endpointIndex),
      });
    });
    const axisPoint = add(spec.group.centerAtEpoch, binary.centerOffset);
    binaries.push({
      id: binary.binaryId,
      braidId: binary.braidId,
      binaryIndex: binary.binaryIndex + 1,
      members: [...binary.worldlineIds],
      frequency: binary.frequency,
      angularFrequency,
      phase: binary.phase,
      circulationSense: binary.circulationSense,
      planeOrientation: {
        normal: objectVector(binary.frame.axis),
        transverseBasis: [objectVector(binary.frame.e1), objectVector(binary.frame.e2)],
      },
      axisPoint: objectVector(axisPoint),
      axisDisplayHalfLength: spec.sphericalEnvelopeRadius * 0.9,
      separation: 2 * binary.axialHalfSeparation,
      planarOffset: 2 * binary.axialHalfSeparation,
      radius: binary.radius,
      layerRadius: binary.radius,
      axialHalfSeparation: binary.axialHalfSeparation,
      transverseOrbitRadius: binary.transverseOrbitRadius,
      transverseRadius: binary.transverseOrbitRadius,
      carrierSpeed: Math.abs(angularFrequency) * binary.transverseOrbitRadius,
      polarityAssignment: binary.polarityAssignment,
    });
  });

  return {
    schema: ASSEMBLY_VIEW_RECORD_SCHEMA,
    sourceId: spec.specId,
    title: spec.taxonomy.displayLabel,
    provenance: {
      engineId: PRESCRIBED_GEOMETRY_ENGINE_ID,
      engineVersion: PRESCRIBED_BRAID_EMITTER_ID,
      runId: spec.specId,
      claimGrade: spec.claimGrade,
      evidenceStatus: spec.evidenceStatus,
      generatingSpec: options.generatingSpec ?? (
        options.specPath
          ? path.relative(REPOSITORY_ROOT, options.specPath)
          : "inline-prescribed-braid-spec"
      ),
      date: spec.date,
      prescribedGeometry: {
        emitterId: PRESCRIBED_BRAID_EMITTER_ID,
        sourceSchema: PRESCRIBED_BRAID_SPEC_SCHEMA,
        interpolation: spec.interpolation.rule,
        errorMethod: spec.interpolation.errorMethod,
        physicsInvoked: false,
        responseCenter: objectVector(spec.group.centerAtEpoch),
        sphericalEnvelopeRadius: spec.sphericalEnvelopeRadius,
        displayTrailPeriods: spec.displayTrailPeriods,
        prescribedReturnPeriod: spec.prescribedReturnPeriod,
        description: spec.provenanceDescription,
        taxonomy: structuredClone(spec.taxonomy),
        coordinates: createParameterVector(materialized),
      },
    },
    window: { start, end, delayHorizon, sampleInterval: actualStep },
    worldlines,
    binaries,
    ansatz,
    events: [],
  };
}

function createHermiteSegment(spec, binary, endpointIndex, startTime, endTime) {
  const start = evaluateMaterializedSite(spec, binary, endpointIndex, startTime);
  const end = evaluateMaterializedSite(spec, binary, endpointIndex, endTime);
  const duration = endTime - startTime;
  const coefficients = [0, 1, 2].map((axis) => {
    const x0 = start.position[axis];
    const x1 = end.position[axis];
    const v0 = start.velocity[axis];
    const v1 = end.velocity[axis];
    const delta = x1 - x0;
    return [
      x0,
      v0,
      (3 * delta) / duration ** 2 - (2 * v0 + v1) / duration,
      (-2 * delta) / duration ** 3 + (v0 + v1) / duration ** 2,
    ];
  });
  const angularFrequency = 2 * Math.PI * binary.frequency;
  const fourthDerivative = binary.transverseOrbitRadius * angularFrequency ** 4;
  const coordinateScale = Math.max(1, norm(spec.group.centerAtEpoch), binary.radius);
  const speedScale = Math.max(1, start.carrierSpeed, norm(spec.group.velocity));
  const roundoff = spec.interpolation.roundoffMultiplier * Number.EPSILON;
  return {
    startTime,
    endTime,
    coefficients,
    positionError:
      (fourthDerivative * duration ** 4) / spec.interpolation.positionDivisor +
      roundoff * coordinateScale,
    velocityError:
      (fourthDerivative * duration ** 3) / spec.interpolation.velocityDivisor +
      roundoff * speedScale,
  };
}

function createAnsatzPoints(spec, binary, endpointIndex) {
  const points = [];
  const start = spec.recordInterval.start;
  for (let index = 0; index <= spec.ansatzSampleCount; index += 1) {
    const time = start + spec.prescribedReturnPeriod * index / spec.ansatzSampleCount;
    const state = evaluateMaterializedSite(spec, binary, endpointIndex, time);
    points.push(objectVector(state.position));
  }
  return points;
}

export function serializePrescribedBraidRecord(record) {
  return `${JSON.stringify(record, null, 2)}\n`;
}

function parseArgs(args) {
  const parsed = {
    specPath: DEFAULT_PRESCRIBED_BRAID_SPEC_PATH,
    outPath: DEFAULT_PRESCRIBED_BRAID_RECORD_PATH,
    mode: null,
    all: false,
  };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--spec" || arg === "--out") {
      const value = args[index + 1];
      if (!value) throw new TypeError(`${arg} requires a path.`);
      index += 1;
      if (arg === "--spec") parsed.specPath = path.resolve(value);
      if (arg === "--out") parsed.outPath = path.resolve(value);
    } else if (arg === "--all") {
      parsed.all = true;
    } else if (arg === "--write" || arg === "--check") {
      if (parsed.mode) throw new TypeError("choose exactly one of --write or --check.");
      parsed.mode = arg.slice(2);
    } else {
      throw new TypeError(`unknown prescribed braid generator argument: ${arg}`);
    }
  }
  if (!parsed.mode) throw new TypeError("prescribed braid generator requires --write or --check.");
  if (parsed.all && args.some((arg) => arg === "--spec" || arg === "--out")) {
    throw new TypeError("prescribed braid generator --all cannot be combined with --spec or --out.");
  }
  return parsed;
}

export function runPrescribedBraidCli(args = process.argv.slice(2)) {
  const parsed = parseArgs(args);
  const targets = parsed.all
    ? PRESCRIBED_BRAID_TARGETS
    : [{ specPath: parsed.specPath, outPath: parsed.outPath }];
  targets.forEach((entry) => processTarget(entry, parsed.mode));
}

function processTarget({ specPath, outPath }, mode) {
  const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
  const record = generatePrescribedBraidRecord(spec, {
    specPath,
    generatingSpec: path.relative(REPOSITORY_ROOT, specPath),
  });
  const serialized = serializePrescribedBraidRecord(record);
  if (mode === "write") {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, serialized);
    process.stdout.write(`prescribed braid record written: ${outPath}\n`);
    return;
  }
  if (!fs.existsSync(outPath)) {
    throw new Error(`prescribed braid record drift: missing generated record ${outPath}`);
  }
  if (fs.readFileSync(outPath, "utf8") !== serialized) {
    throw new Error(
      "prescribed braid record drift: run " +
      "node scripts/eom/generate-prescribed-braid-record.mjs --all --write",
    );
  }
  process.stdout.write(`prescribed braid record check passed: ${outPath}\n`);
}

function requireConcreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0 || value === "unspecified") {
    throw new TypeError(`prescribed braid ${label} must be concrete.`);
  }
  return value;
}

function requireFinite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`prescribed braid ${label} must be finite.`);
  return number;
}

function requirePositiveFinite(value, label) {
  const number = requireFinite(value, label);
  if (!(number > 0)) throw new RangeError(`prescribed braid ${label} must be positive.`);
  return number;
}

function requireNonnegativeFinite(value, label) {
  const number = requireFinite(value, label);
  if (number < 0) throw new RangeError(`prescribed braid ${label} must be nonnegative.`);
  return number;
}

function requireNear(actual, expected, tolerance, label) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new RangeError(
      `prescribed braid ${label} must be within ${tolerance}; received ${actual}, expected ${expected}.`,
    );
  }
}

function vector3(value, label) {
  if (!Array.isArray(value) || value.length !== 3) {
    throw new TypeError(`prescribed braid ${label} must be a three-vector.`);
  }
  return value.map((entry, index) => requireFinite(entry, `${label}[${index}]`));
}

function near(left, right) {
  return Math.abs(Number(left) - Number(right)) <= GEOMETRY_TOLERANCE;
}

function wrappedAngle(value) {
  const period = 2 * Math.PI;
  return ((Number(value) % period) + period) % period;
}

function add(...vectors) {
  return [0, 1, 2].map((axis) => vectors.reduce((sum, vector) => sum + vector[axis], 0));
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function norm(vector) {
  return Math.hypot(...vector);
}

function normalize(vector) {
  const length = norm(vector);
  if (!(length > 0)) throw new RangeError("prescribed braid cannot normalize a zero vector.");
  return scale(vector, 1 / length);
}

function objectVector(vector) {
  return { x: vector[0], y: vector[1], z: vector[2] };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) runPrescribedBraidCli();
