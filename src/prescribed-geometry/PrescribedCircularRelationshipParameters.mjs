import {
  prescribedWorldlineSpeedBound,
} from "./PrescribedWorldlineOperators.mjs";

const GEOMETRY_TOLERANCE = 1e-12;

// Analytical campaigns use this derived projection to vary the declared
// circular relationships. It is not a configuration source schema and it
// owns no constituent or worldline. Applying it rewrites the individually
// declared worldline operators in prescribed-assembly-spec.v3.
export function projectCircularRelationshipParameters(spec) {
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
    const frames = materializeFrames(componentParameters);
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
    validateFrameDefinition(component.frameDefinition, `components[${componentIndex}].frameDefinition`);
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
  return parameters;
}
function validateFrameDefinition(frame, label) {
  if (frame?.type === "three-axis-flattening.v1") {
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

function materializeFrames(component) {
  let frames;
  if (component.frameDefinition.type === "three-axis-flattening.v1") {
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
  if (component.frameDefinition.type === "three-axis-flattening.v1" &&
      component.frameDefinition.phaseCompensatedCyclicFrames) {
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
