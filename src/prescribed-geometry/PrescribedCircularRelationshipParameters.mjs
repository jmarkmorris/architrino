import {
  prescribedWorldlineSpeedBound,
} from "./PrescribedWorldlineOperators.mjs";

const GEOMETRY_TOLERANCE = 1e-12;

// Family-A/B/C analytical campaigns use this derived projection to vary the
// declared circular relationships. It is not a candidate source schema and it
// owns no constituent or worldline. Applying it rewrites the individually
// declared worldline operators in prescribed-assembly-spec.v2.
export function projectCircularRelationshipParameters(spec) {
  const taxonomy = spec.identity?.taxonomy;
  if (!taxonomy || !["A", "B", "C"].includes(taxonomy.familyId)) {
    throw new TypeError("circular relationship parameters require a Family-A, Family-B, or Family-C specification.");
  }
  const placement = spec.geometry?.assemblyPlacement;
  if (!placement) throw new TypeError("circular relationship parameters require geometry.assemblyPlacement.");
  const constituentById = new Map(spec.constituents.map((row) => [row.id, row]));
  const worldlineById = new Map(spec.worldlines.map((row) => [row.id, row]));
  const pairById = new Map((spec.relationships.neutralPairs ?? []).map((row) => [row.id, row]));
  const components = (spec.relationships.componentBraids ?? []).map((component) => {
    const metadata = component.metadata ?? {};
    const pairs = (spec.relationships.neutralPairs ?? [])
      .filter((pair) => pair.componentBraidId === component.id)
      .sort((left, right) => left.display.binaryIndex - right.display.binaryIndex)
      .map((pair, pairIndex) => projectPair({
        pair,
        pairIndex,
        componentMetadata: metadata,
        placement,
        constituentById,
        worldlineById,
      }));
    return {
      componentId: component.id,
      centerOffset: [...metadata.centerOffset],
      phaseOffset: metadata.phaseOffset,
      circulationSense: metadata.circulationSense,
      frameDefinition: structuredClone(metadata.frameDefinition),
      pairs,
    };
  });
  const pairOrder = [];
  for (let index = 0; index < spec.relationships.sourceOrder.length; index += 2) {
    const first = spec.relationships.sourceOrder[index];
    const pair = [...pairById.values()].find((row) => row.members.includes(first));
    if (!pair || pairOrder.includes(pair.id)) {
      throw new TypeError("circular relationship source order must preserve complete neutral pairs.");
    }
    pairOrder.push(pair.id);
  }
  const projected = {
    taxonomy: structuredClone(taxonomy),
    assemblyPlacement: {
      centerAtEpoch: [...placement.centerAtEpoch],
      velocity: [...placement.velocity],
    },
    history: structuredClone(spec.history),
    sphericalEnvelopeRadius: spec.display.sphericalEnvelopeRadius,
    pairOrder,
    components,
  };
  validateCircularRelationshipParameters(projected);
  return projected;
}

function projectPair({
  pair,
  pairIndex,
  componentMetadata,
  placement,
  constituentById,
  worldlineById,
}) {
  const members = pair.members.map((constituentId) => {
    const constituent = constituentById.get(constituentId);
    const worldline = constituent && worldlineById.get(constituent.worldlineId);
    if (!constituent || !worldline || worldline.operator.kind !== "moving-circular.v1") {
      throw new TypeError(`neutral pair ${pair.id} requires two declared moving-circular worldlines.`);
    }
    return { constituent, worldline };
  });
  const [first, second] = members;
  const axis = pair.display?.axis;
  if (!axis) throw new TypeError(`neutral pair ${pair.id} requires a declared display axis.`);
  const center = scale(add(first.worldline.operator.centerAtEpoch, second.worldline.operator.centerAtEpoch), 0.5);
  const componentCenter = add(placement.centerAtEpoch, componentMetadata.centerOffset);
  const centerOffset = subtract(center, componentCenter);
  const axialHalfSeparation = Math.abs(dot(
    scale(subtract(first.worldline.operator.centerAtEpoch, second.worldline.operator.centerAtEpoch), 0.5),
    axis,
  ));
  const transverseOrbitRadius = norm(first.worldline.operator.radiusU);
  return {
    pairIndex: pair.display?.binaryIndex ?? pairIndex + 1,
    pairId: pair.id,
    worldlineIds: members.map((row) => row.worldline.id),
    constituentIds: [...pair.members],
    centerOffset,
    radius: Math.hypot(axialHalfSeparation, transverseOrbitRadius),
    axialHalfSeparation,
    transverseOrbitRadius,
    frequency: Math.abs(first.worldline.operator.angularVelocity) / (2 * Math.PI),
    phase: first.worldline.operator.phaseAtEpoch - componentMetadata.phaseOffset,
    polarityAssignment: first.constituent.polarity,
  };
}

export function applyCircularRelationshipParameters(rawSpec, rawParameters) {
  const spec = structuredClone(rawSpec);
  const parameters = structuredClone(rawParameters);
  validateCircularRelationshipParameters(parameters);
  const expected = projectCircularRelationshipParameters(spec);
  requireSameIds(
    parameters.components.map((row) => row.componentId),
    expected.components.map((row) => row.componentId),
    "component relationship",
  );
  requireSameIds(
    parameters.components.flatMap((row) => row.pairs.map((pair) => pair.pairId)),
    expected.components.flatMap((row) => row.pairs.map((pair) => pair.pairId)),
    "neutral-pair relationship",
  );
  requireSameIds(parameters.pairOrder, expected.pairOrder, "neutral-pair source order");

  spec.geometry.assemblyPlacement = structuredClone(parameters.assemblyPlacement);
  const componentById = new Map(spec.relationships.componentBraids.map((row) => [row.id, row]));
  const pairById = new Map(spec.relationships.neutralPairs.map((row) => [row.id, row]));
  const constituentById = new Map(spec.constituents.map((row) => [row.id, row]));
  const worldlineById = new Map(spec.worldlines.map((row) => [row.id, row]));

  parameters.components.forEach((componentParameters) => {
    const component = componentById.get(componentParameters.componentId);
    component.metadata = {
      ...(component.metadata ?? {}),
      centerOffset: [...componentParameters.centerOffset],
      phaseOffset: componentParameters.phaseOffset,
      circulationSense: componentParameters.circulationSense,
      frameDefinition: structuredClone(componentParameters.frameDefinition),
    };
    const frames = materializeFrames(parameters.taxonomy.familyId, componentParameters);
    componentParameters.pairs.forEach((pairParameters, pairIndex) => {
      const pair = pairById.get(pairParameters.pairId);
      const frame = frames[pairIndex];
      pair.display = {
        ...(pair.display ?? {}),
        binaryIndex: pairParameters.pairIndex,
        axis: [...frame.axis],
        transverseBasis: [[...frame.e1], [...frame.e2]],
      };
      pair.members.forEach((constituentId, endpointIndex) => {
        const sign = endpointIndex === 0 ? 1 : -1;
        const constituent = constituentById.get(constituentId);
        const worldline = worldlineById.get(constituent.worldlineId);
        constituent.polarity = sign * pairParameters.polarityAssignment;
        const pairCenter = add(
          parameters.assemblyPlacement.centerAtEpoch,
          componentParameters.centerOffset,
          pairParameters.centerOffset,
        );
        worldline.operator = {
          kind: "moving-circular.v1",
          epochTime: worldline.operator.epochTime ?? 0,
          centerAtEpoch: add(pairCenter, scale(frame.axis, sign * pairParameters.axialHalfSeparation)),
          centerVelocity: [...parameters.assemblyPlacement.velocity],
          radiusU: scale(frame.e1, sign * pairParameters.transverseOrbitRadius),
          radiusV: scale(frame.e2, sign * pairParameters.transverseOrbitRadius),
          angularVelocity: componentParameters.circulationSense * 2 * Math.PI * pairParameters.frequency,
          angularAcceleration: 0,
          phaseAtEpoch: pairParameters.phase + componentParameters.phaseOffset,
        };
      });
    });
  });

  spec.relationships.neutralPairs.sort(
    (left, right) => parameters.pairOrder.indexOf(left.id) - parameters.pairOrder.indexOf(right.id),
  );
  spec.relationships.sourceOrder = parameters.pairOrder.flatMap((pairId) => pairById.get(pairId).members);
  rebuildPolaritySectors(spec);
  spec.geometry.frameProvenance = parameters.components.map((component) => ({
    braidId: component.componentId,
    frameDefinition: structuredClone(component.frameDefinition),
  }));
  if (spec.constraints.speedGuard.policy === "preserve-and-report") {
    spec.constraints.speedGuard.observedBound = Math.max(...spec.worldlines.map((row) =>
      prescribedWorldlineSpeedBound(row.operator, spec.history.start, spec.history.end)));
  }
  return spec;
}

function rebuildPolaritySectors(spec) {
  const positive = spec.constituents.filter((row) => row.polarity === 1).map((row) => row.id);
  const negative = spec.constituents.filter((row) => row.polarity === -1).map((row) => row.id);
  const sectors = spec.relationships.polaritySectors ?? [];
  const positiveSector = sectors.find((row) => row.polarity === 1);
  const negativeSector = sectors.find((row) => row.polarity === -1);
  if (positiveSector) positiveSector.members = positive;
  if (negativeSector) negativeSector.members = negative;
}

export function validateCircularRelationshipParameters(parameters) {
  const familyId = parameters.taxonomy?.familyId;
  const memberId = parameters.taxonomy?.memberId;
  if (!["A", "B", "C"].includes(familyId)) throw new TypeError("circular relationship family is invalid.");
  vector3(parameters.assemblyPlacement?.centerAtEpoch, "assemblyPlacement.centerAtEpoch");
  vector3(parameters.assemblyPlacement?.velocity, "assemblyPlacement.velocity");
  if (!Array.isArray(parameters.components) || parameters.components.length === 0) {
    throw new TypeError("circular relationship parameters require component relationships.");
  }
  const ids = new Set();
  parameters.components.forEach((component, componentIndex) => {
    concreteString(component.componentId, `components[${componentIndex}].componentId`);
    vector3(component.centerOffset, `components[${componentIndex}].centerOffset`);
    finite(component.phaseOffset, `components[${componentIndex}].phaseOffset`);
    if (component.circulationSense !== -1 && component.circulationSense !== 1) {
      throw new TypeError(`components[${componentIndex}].circulationSense must be -1 or +1.`);
    }
    validateFrameDefinition(component.frameDefinition, familyId, `components[${componentIndex}].frameDefinition`);
    if (!Array.isArray(component.pairs) || component.pairs.length !== 3) {
      throw new TypeError(`components[${componentIndex}].pairs must contain three declared neutral-pair relationships.`);
    }
    component.pairs.forEach((pair, pairIndex) => {
      const label = `components[${componentIndex}].pairs[${pairIndex}]`;
      concreteString(pair.pairId, `${label}.pairId`);
      if (ids.has(pair.pairId)) throw new TypeError(`neutral-pair relationship ${pair.pairId} is duplicated.`);
      ids.add(pair.pairId);
      if (pair.pairIndex !== pairIndex + 1) throw new TypeError(`${label}.pairIndex must preserve ${pairIndex + 1}.`);
      vector3(pair.centerOffset, `${label}.centerOffset`);
      const radius = positive(pair.radius, `${label}.radius`);
      const axial = nonnegative(pair.axialHalfSeparation, `${label}.axialHalfSeparation`);
      const transverse = nonnegative(pair.transverseOrbitRadius, `${label}.transverseOrbitRadius`);
      requireNear(axial ** 2 + transverse ** 2, radius ** 2, `${label} radius decomposition`);
      positive(pair.frequency, `${label}.frequency`);
      finite(pair.phase, `${label}.phase`);
      if (pair.polarityAssignment !== -1 && pair.polarityAssignment !== 1) {
        throw new TypeError(`${label}.polarityAssignment must be -1 or +1.`);
      }
    });
  });
  if (!Array.isArray(parameters.pairOrder) || parameters.pairOrder.length !== ids.size ||
      new Set(parameters.pairOrder).size !== ids.size || parameters.pairOrder.some((id) => !ids.has(id))) {
    throw new TypeError("pairOrder must name every neutral-pair relationship exactly once.");
  }
  validateFamilyConstraints(parameters, familyId, memberId);
  return parameters;
}

function validateFamilyConstraints(parameters, familyId, memberId) {
  const components = parameters.components;
  const pairs = components[0].pairs;
  const equal = (read) => pairs.every((pair) => near(read(pair), read(pairs[0])));
  const phasesMatch = pairs.every((pair, index) =>
    near(wrappedAngle(pair.phase), wrappedAngle(index * 2 * Math.PI / 3)));
  if (familyId === "A") {
    if (!components.every((component) => component.centerOffset.every((value) => near(value, 0))) ||
        !pairs.every((pair) => pair.centerOffset.every((value) => near(value, 0)))) {
      throw new RangeError("Family A requires every neutral-pair midpoint at the component origin.");
    }
  }
  if (memberId === "A1" || memberId.startsWith("A1.")) {
    if (!pairs.every((pair) => near(pair.axialHalfSeparation, 0) && near(pair.transverseOrbitRadius, pair.radius))) {
      throw new RangeError(`${memberId} requires h_a=0 and rho_a=R_a for every neutral pair.`);
    }
  }
  if (["A1.1", "A3.1"].includes(memberId) && !equal((pair) => pair.frequency)) {
    throw new RangeError(`${memberId} requires one common frequency.`);
  }
  if (["A1.2", "A3.2"].includes(memberId) &&
      !(equal((pair) => pair.radius) && equal((pair) => pair.frequency) && phasesMatch)) {
    throw new RangeError(`${memberId} requires equal radii, equal frequencies, and 120-degree phase spacing.`);
  }
  if (["A1.3", "A3.3"].includes(memberId)) validateFrequencyRatio(pairs, [4, 2, 1], memberId);
  if (["A1.4", "A3.4"].includes(memberId)) validateFrequencyRatio(pairs, [3, 2, 1], memberId);
  if (memberId === "A2" && !(equal((pair) => pair.radius) &&
      equal((pair) => pair.axialHalfSeparation) && equal((pair) => pair.transverseOrbitRadius) &&
      equal((pair) => pair.frequency) && phasesMatch &&
      components[0].frameDefinition.phaseCompensatedCyclicFrames)) {
    throw new RangeError("A2 requires equal geometry, equal frequencies, 120-degree phases, and phase-compensated cyclic frames.");
  }
  if (familyId === "B" || (familyId === "C" && ["C3", "C4", "C5", "C6"].includes(memberId))) {
    components.forEach((component, index) => validateB1Component(component, index));
  }
  if (memberId === "B1.1" && !pairs.every((pair) => pair.axialHalfSeparation > 0 && pair.transverseOrbitRadius > 0)) {
    throw new RangeError("B1.1 requires h_a>0 and rho_a>0 for every neutral pair.");
  }
  if (memberId === "B1.2" && !pairs.every((pair) => pair.axialHalfSeparation > pair.transverseOrbitRadius && pair.transverseOrbitRadius > 0)) {
    throw new RangeError("B1.2 requires h_a>rho_a>0 for every neutral pair.");
  }
  if (memberId === "B1.3" && !pairs.every((pair) => near(pair.axialHalfSeparation, 0) && near(pair.transverseOrbitRadius, pair.radius))) {
    throw new RangeError("B1.3 requires h_a=0 and rho_a=R_a for every neutral pair.");
  }
  if (memberId === "B1.4" && !pairs.every((pair) => near(pair.transverseOrbitRadius, 0) && near(pair.axialHalfSeparation, pair.radius))) {
    throw new RangeError("B1.4 requires rho_a=0 and h_a=R_a for every neutral pair.");
  }
  if (familyId === "C") validateFamilyC(parameters, memberId);
}

function validateFamilyC(parameters, memberId) {
  const [left, right] = parameters.components;
  if (!left || !right) throw new TypeError("Family C requires two declared component relationships.");
  if (["C1", "C2"].includes(memberId)) validateGeneralFamilyC(parameters);
  if (["C3", "C4", "C5", "C6"].includes(memberId) && near(norm(subtract(left.centerOffset, right.centerOffset)), 0)) {
    throw new RangeError(`${memberId} requires two distinct declared component centers.`);
  }
  if (["C1", "C3", "C5"].includes(memberId) && left.circulationSense !== right.circulationSense) {
    throw new RangeError(`${memberId} requires a common circulation sense.`);
  }
  if (["C2", "C4", "C6"].includes(memberId) && left.circulationSense !== -right.circulationSense) {
    throw new RangeError(`${memberId} requires opposite circulation senses.`);
  }
  if (["C5", "C6"].includes(memberId) && !parameters.components.every((component) =>
    component.pairs.every((pair) => near(pair.axialHalfSeparation, 0) && near(pair.transverseOrbitRadius, pair.radius)))) {
    throw new RangeError(`${memberId} requires two all-equatorial B1.3 components.`);
  }
  if (["C3", "C4", "C5", "C6"].includes(memberId)) {
    const leftAxis = left.frameDefinition.axis;
    const rightAxis = right.frameDefinition.axis;
    const displacement = subtract(right.centerOffset, left.centerOffset);
    const transverse = subtract(displacement, scale(leftAxis, dot(displacement, leftAxis)));
    if (norm(subtract(leftAxis, rightAxis)) > GEOMETRY_TOLERANCE || norm(transverse) > GEOMETRY_TOLERANCE) {
      throw new RangeError(`${memberId} requires coaxial component relationships.`);
    }
  }
}

function validateGeneralFamilyC(parameters) {
  const axis = parameters.components[0].frameDefinition.axis;
  const rows = parameters.components.flatMap((component) => {
    if (norm(subtract(axis, component.frameDefinition.axis)) > GEOMETRY_TOLERANCE) {
      throw new RangeError(`${parameters.taxonomy.memberId} requires one common oriented axis.`);
    }
    return component.pairs.map((pair) => {
      const midpoint = add(component.centerOffset, pair.centerOffset);
      const transverse = subtract(midpoint, scale(axis, dot(midpoint, axis)));
      if (norm(transverse) > GEOMETRY_TOLERANCE) {
        throw new RangeError(`${parameters.taxonomy.memberId} requires every neutral-pair midpoint on the common axis.`);
      }
      return {
        pairId: pair.pairId,
        midpoint: dot(midpoint, axis),
        centers: [
          dot(midpoint, axis) - pair.axialHalfSeparation,
          dot(midpoint, axis) + pair.axialHalfSeparation,
        ],
      };
    });
  }).toSorted((a, b) => a.midpoint - b.midpoint);
  if (rows.some((row, index) => row.pairId !== parameters.pairOrder[index])) {
    throw new RangeError(`${parameters.taxonomy.memberId} pairOrder must follow increasing axial midpoint coordinate.`);
  }
  const centers = rows.flatMap((row) => row.centers).toSorted((a, b) => a - b);
  for (let index = 1; index < centers.length; index += 1) {
    if (!(centers[index] - centers[index - 1] > GEOMETRY_TOLERANCE)) {
      throw new RangeError(`${parameters.taxonomy.memberId} requires twelve strictly ordered coaxial orbit centers.`);
    }
  }
}

function validateB1Component(component, index) {
  const frequency = component.pairs[0].frequency;
  if (!component.pairs.every((pair) => near(pair.frequency, frequency))) {
    throw new RangeError(`components[${index}] must be a common-frequency B1 relationship group.`);
  }
  if (!component.pairs.every((pair) => pair.centerOffset.every((value) => near(value, 0)))) {
    throw new RangeError(`components[${index}] must place every neutral-pair midpoint at its component center.`);
  }
}

function validateFrequencyRatio(pairs, ratio, memberId) {
  const base = pairs[2].frequency;
  if (!pairs.every((pair, index) => near(pair.frequency, ratio[index] * base))) {
    throw new RangeError(`${memberId} requires the indexed frequency ratio ${ratio.join(":")}.`);
  }
}

function validateFrameDefinition(frame, familyId, label) {
  if (familyId === "A") {
    if (frame?.type !== "family-a-flattening.v1") throw new TypeError(`${label}.type is invalid.`);
    const flattening = finite(frame.flattening, `${label}.flattening`);
    if (flattening < 0 || flattening > 1) throw new RangeError(`${label}.flattening must be in [0,1].`);
    validateOrthonormalAxes(frame.nearRestAxes, `${label}.nearRestAxes`);
    if (typeof frame.phaseCompensatedCyclicFrames !== "boolean") throw new TypeError(`${label}.phaseCompensatedCyclicFrames must be boolean.`);
    if (frame.interpolation !== "normalized-linear-to-equal-component/v1") throw new TypeError(`${label}.interpolation is invalid.`);
    return;
  }
  if (frame?.type !== "orthonormal.v1") throw new TypeError(`${label}.type is invalid.`);
  validateOrthonormalFrame(frame, label);
}

function materializeFrames(familyId, component) {
  let frames;
  if (familyId === "A") {
    const axes0 = component.frameDefinition.nearRestAxes;
    const direction = normalize(add(...axes0));
    const lambda = component.frameDefinition.flattening;
    frames = axes0.map((axis0, index) => {
      const axis = normalize(add(scale(axis0, 1 - lambda), scale(direction, lambda)));
      const reference = axes0[(index + 1) % axes0.length];
      const e1 = normalize(subtract(reference, scale(axis, dot(reference, axis))));
      return { axis, e1, e2: normalize(cross(axis, e1)) };
    });
  } else {
    frames = component.pairs.map(() => ({
      axis: [...component.frameDefinition.axis],
      e1: [...component.frameDefinition.e1],
      e2: [...component.frameDefinition.e2],
    }));
  }
  if (familyId === "A" && component.frameDefinition.phaseCompensatedCyclicFrames) {
    return frames.map((frame, index) => rotateTransverseFrame(frame, -component.pairs[index].phase));
  }
  return frames;
}

function rotateTransverseFrame(frame, angle) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return {
    axis: [...frame.axis],
    e1: add(scale(frame.e1, cosine), scale(frame.e2, sine)),
    e2: add(scale(frame.e1, -sine), scale(frame.e2, cosine)),
  };
}

function validateOrthonormalAxes(axes, label) {
  if (!Array.isArray(axes) || axes.length !== 3) throw new TypeError(`${label} must contain three axes.`);
  axes.forEach((axis, index) => vector3(axis, `${label}[${index}]`));
  for (let left = 0; left < 3; left += 1) for (let right = left + 1; right < 3; right += 1) {
    requireNear(dot(axes[left], axes[right]), 0, `${label} orthogonality`);
  }
  requireNear(dot(cross(axes[0], axes[1]), axes[2]), 1, `${label} right-handedness`);
}

function validateOrthonormalFrame(frame, label) {
  const e1 = vector3(frame.e1, `${label}.e1`);
  const e2 = vector3(frame.e2, `${label}.e2`);
  const axis = vector3(frame.axis, `${label}.axis`);
  [e1, e2, axis].forEach((row, index) => requireNear(norm(row), 1, `${label} vector ${index} unit length`));
  requireNear(dot(e1, e2), 0, `${label}.e1/e2 orthogonality`);
  requireNear(dot(e1, axis), 0, `${label}.e1/axis orthogonality`);
  requireNear(dot(e2, axis), 0, `${label}.e2/axis orthogonality`);
  if (norm(subtract(cross(e1, e2), axis)) > GEOMETRY_TOLERANCE) throw new RangeError(`${label} must be right-handed.`);
}

function requireSameIds(actual, expected, label) {
  if (actual.length !== expected.length || new Set(actual).size !== expected.length ||
      actual.some((id) => !expected.includes(id))) {
    throw new TypeError(`${label} identities differ from the source specification.`);
  }
}

function wrappedAngle(angle) {
  const result = angle % (2 * Math.PI);
  return result < 0 ? result + 2 * Math.PI : result;
}

function near(left, right) {
  return Math.abs(left - right) <= GEOMETRY_TOLERANCE;
}

function requireNear(actual, expected, label) {
  if (!near(actual, expected)) throw new RangeError(`${label} must be within ${GEOMETRY_TOLERANCE}; received ${actual}, expected ${expected}.`);
}

function concreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) throw new TypeError(`${label} must be concrete.`);
  return value;
}

function finite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`${label} must be finite.`);
  return number;
}

function positive(value, label) {
  const number = finite(value, label);
  if (!(number > 0)) throw new RangeError(`${label} must be positive.`);
  return number;
}

function nonnegative(value, label) {
  const number = finite(value, label);
  if (number < 0) throw new RangeError(`${label} must be nonnegative.`);
  return number;
}

function vector3(value, label) {
  if (!Array.isArray(value) || value.length !== 3) throw new TypeError(`${label} must be a three-vector.`);
  value.forEach((entry, index) => finite(entry, `${label}[${index}]`));
  return value;
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
  if (!(length > 0)) throw new RangeError("cannot normalize a zero vector.");
  return scale(vector, 1 / length);
}
