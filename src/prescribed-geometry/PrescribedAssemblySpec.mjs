import {
  evaluatePrescribedWorldlineOperator,
  prescribedWorldlineSpeedBound,
  validatePrescribedWorldlineOperator,
} from "./PrescribedWorldlineOperators.mjs";
import {
  runPrescribedAssemblyValidators,
} from "./PrescribedAssemblyValidators.mjs";
import {
  materializePrescribedLatticeDeclarations,
  validatePrescribedLatticeDeclarations,
} from "./PrescribedLatticeOperators.mjs";
import {
  materializePrescribedSeaDeclarations,
  validatePrescribedSeaDeclarations,
} from "./PrescribedSeaModels.mjs";

export {
  PRESCRIBED_LATTICE_GENERATOR_KINDS,
} from "./PrescribedLatticeOperators.mjs";
export {
  PRESCRIBED_SEA_MODEL_KINDS,
} from "./PrescribedSeaModels.mjs";

export const PRESCRIBED_ASSEMBLY_SPEC_SCHEMA = "prescribed-assembly-spec.v2";
export const PRESCRIBED_ASSEMBLY_EVALUATOR_ID = "prescribed-assembly-evaluator.v2";
export const NORMALIZED_FIELD_SPEED = 1;

const CONSTITUENT_ROLES = new Set(["braid", "accessory"]);
const GEOMETRY_TOLERANCE = 1e-12;

export function validatePrescribedAssemblySpec(spec) {
  if (!spec || typeof spec !== "object" || Array.isArray(spec)) {
    throw new TypeError("prescribed assembly specification must be an object.");
  }
  if (spec.schema !== PRESCRIBED_ASSEMBLY_SPEC_SCHEMA) {
    throw new TypeError(
      `prescribed assembly specification requires schema ${PRESCRIBED_ASSEMBLY_SPEC_SCHEMA}.`,
    );
  }
  for (const field of ["specId", "label", "provenanceDescription", "date"]) {
    concreteString(spec[field], field);
  }
  if (spec.claimGrade !== "chart-hypothesis" || spec.evidenceStatus !== "display-only") {
    throw new TypeError(
      "prescribed assembly specification must remain claimGrade=chart-hypothesis and evidenceStatus=display-only.",
    );
  }
  validateIdentity(spec.identity);
  validateConstituentsAndWorldlines(spec);
  validateGeometry(spec.geometry, spec);
  validateRelationships(spec.relationships, spec.constituents);
  validateHistory(spec.history);
  validateInterpolation(spec.interpolation);
  validateDisplay(spec.display, spec.history);
  validateConstraints(spec);
  validateCompatibility(spec.compatibility);
  runPrescribedAssemblyValidators(spec);
  return spec;
}

export function materializePrescribedAssemblySpec(rawSpec) {
  const spec = validatePrescribedAssemblySpec(rawSpec);
  const constituentById = new Map(spec.constituents.map((row) => [row.id, row]));
  const worldlineById = new Map(spec.worldlines.map((row) => [row.id, row]));
  const worldlines = spec.relationships.sourceOrder.map((constituentId, sourceIndex) => {
    const constituent = constituentById.get(constituentId);
    const worldline = worldlineById.get(constituent.worldlineId);
    return Object.freeze({
      sourceIndex,
      constituent: Object.freeze(structuredClone(constituent)),
      id: worldline.id,
      constituentId,
      operator: validatePrescribedWorldlineOperator(
        worldline.operator,
        `worldlines[${spec.worldlines.indexOf(worldline)}].operator`,
      ),
      metadata: Object.freeze(structuredClone(worldline.metadata ?? {})),
    });
  });
  const relationshipByPairId = new Map(
    (spec.relationships.neutralPairs ?? []).map((row) => [row.id, row]),
  );
  const lattices = materializePrescribedLatticeDeclarations(spec.geometry.lattices, spec);
  const seas = materializePrescribedSeaDeclarations(spec.geometry.seas, spec);
  return Object.freeze({
    spec,
    worldlines: Object.freeze(worldlines),
    lattices,
    seas,
    constituentById,
    worldlineById,
    relationshipByPairId,
  });
}

export function evaluatePrescribedAssemblyWorldline(rawSpec, worldlineId, time) {
  const materialized = materializePrescribedAssemblySpec(rawSpec);
  const row = materialized.worldlines.find((entry) => entry.id === worldlineId);
  if (!row) throw new RangeError(`prescribed assembly worldline ${worldlineId} is not declared.`);
  return evaluatePrescribedWorldlineOperator(row.operator, time);
}

export function evaluateMaterializedWorldline(row, time) {
  return evaluatePrescribedWorldlineOperator(row.operator, time);
}

export function deriveNeutralPairDisplayGeometry(materialized, pair) {
  const members = pair.members.map((constituentId) =>
    materialized.worldlines.find((row) => row.constituentId === constituentId));
  if (members.some((row) => !row)) {
    throw new TypeError(`neutral pair ${pair.id} references an unavailable constituent.`);
  }
  const [left, right] = members;
  if (left.operator.kind !== "moving-circular.v1" || right.operator.kind !== "moving-circular.v1") {
    return null;
  }
  const start = materialized.spec.history.start;
  const leftState = evaluatePrescribedWorldlineOperator(left.operator, start);
  const rightState = evaluatePrescribedWorldlineOperator(right.operator, start);
  const center = scale(add(leftState.position, rightState.position), 0.5);
  const half = scale(subtract(leftState.position, rightState.position), 0.5);
  const axis = pair.display?.axis ?? normalize(cross(left.operator.radiusU, left.operator.radiusV));
  const transverseU = norm(left.operator.radiusU) > GEOMETRY_TOLERANCE
    ? normalize(left.operator.radiusU)
    : pair.display?.transverseBasis?.[0];
  const transverseV = norm(left.operator.radiusV) > GEOMETRY_TOLERANCE
    ? normalize(left.operator.radiusV)
    : pair.display?.transverseBasis?.[1];
  if (!transverseU || !transverseV) {
    throw new TypeError(`neutral pair ${pair.id} requires a display transverse basis for a zero-radius control.`);
  }
  const axialHalfSeparation = Math.abs(dot(half, axis));
  const transverseOrbitRadius = Math.sqrt(Math.max(0, dot(half, half) - axialHalfSeparation ** 2));
  const angularFrequency = left.operator.angularVelocity;
  return Object.freeze({
    id: pair.id,
    braidId: pair.componentBraidId ?? null,
    members: members.map((row) => row.id),
    frequency: Math.abs(angularFrequency) / (2 * Math.PI),
    angularFrequency,
    phase: left.operator.phaseAtEpoch,
    circulationSense: Math.sign(angularFrequency) || 1,
    planeOrientation: {
      normal: objectVector(axis),
      transverseBasis: [
        objectVector(transverseU),
        objectVector(transverseV),
      ],
    },
    axisPoint: objectVector(center),
    axisDisplayHalfLength: materialized.spec.display.sphericalEnvelopeRadius * 0.9,
    separation: 2 * axialHalfSeparation,
    planarOffset: 2 * axialHalfSeparation,
    radius: norm(half),
    layerRadius: norm(half),
    axialHalfSeparation,
    transverseOrbitRadius,
    transverseRadius: transverseOrbitRadius,
    carrierSpeed: Math.abs(angularFrequency) * transverseOrbitRadius,
    polarityAssignment: left.constituent.polarity,
  });
}

function validateIdentity(identity) {
  if (!identity || typeof identity !== "object" || Array.isArray(identity)) {
    throw new TypeError("prescribed assembly identity metadata is required.");
  }
  for (const field of ["candidateId", "displayLabel", "status", "geometryOwner"]) {
    concreteString(identity[field], `identity.${field}`);
  }
  if (identity.taxonomy != null) {
    for (const field of ["familyId", "familyLabel", "memberId", "memberLabel", "canonSource"]) {
      concreteString(identity.taxonomy[field], `identity.taxonomy.${field}`);
    }
  }
}

function validateConstituentsAndWorldlines(spec) {
  if (!Array.isArray(spec.constituents) || spec.constituents.length === 0) {
    throw new TypeError("prescribed assembly constituents must contain at least one architrino.");
  }
  if (!Array.isArray(spec.worldlines) || spec.worldlines.length !== spec.constituents.length) {
    throw new TypeError("prescribed assembly must declare exactly one worldline per constituent.");
  }
  const constituentIds = new Set();
  const constituentWorldlineIds = new Set();
  spec.constituents.forEach((row, index) => {
    const label = `constituents[${index}]`;
    const id = concreteString(row?.id, `${label}.id`);
    if (constituentIds.has(id)) throw new TypeError(`constituent id ${id} is duplicated.`);
    constituentIds.add(id);
    if (row.polarity !== -1 && row.polarity !== 1) {
      throw new TypeError(`${label}.polarity must be -1 or +1.`);
    }
    if (!CONSTITUENT_ROLES.has(row.role)) {
      throw new TypeError(`${label}.role must be braid or accessory.`);
    }
    const worldlineId = concreteString(row.worldlineId, `${label}.worldlineId`);
    if (constituentWorldlineIds.has(worldlineId)) {
      throw new TypeError(`constituent worldline id ${worldlineId} is duplicated.`);
    }
    constituentWorldlineIds.add(worldlineId);
  });
  const worldlineIds = new Set();
  const worldlineConstituentIds = new Set();
  spec.worldlines.forEach((row, index) => {
    const label = `worldlines[${index}]`;
    const id = concreteString(row?.id, `${label}.id`);
    if (worldlineIds.has(id)) throw new TypeError(`worldline id ${id} is duplicated.`);
    worldlineIds.add(id);
    const constituentId = concreteString(row.constituentId, `${label}.constituentId`);
    if (!constituentIds.has(constituentId)) {
      throw new TypeError(`${label}.constituentId references undeclared constituent ${constituentId}.`);
    }
    if (worldlineConstituentIds.has(constituentId)) {
      throw new TypeError(`constituent ${constituentId} owns more than one worldline.`);
    }
    worldlineConstituentIds.add(constituentId);
    validatePrescribedWorldlineOperator(row.operator, `${label}.operator`);
  });
  spec.constituents.forEach((constituent) => {
    const worldline = spec.worldlines.find((row) => row.id === constituent.worldlineId);
    if (!worldline || worldline.constituentId !== constituent.id) {
      throw new TypeError(
        `constituent ${constituent.id} must own its explicitly identified worldline ${constituent.worldlineId}.`,
      );
    }
  });
}

function validateGeometry(geometry, spec) {
  if (!geometry || typeof geometry !== "object" || Array.isArray(geometry)) {
    throw new TypeError("prescribed assembly geometry declaration is required.");
  }
  if (geometry.representation !== "individual-worldlines") {
    throw new TypeError("geometry.representation must be individual-worldlines.");
  }
  if (!geometry.assemblyPlacement || typeof geometry.assemblyPlacement !== "object") {
    throw new TypeError("geometry.assemblyPlacement is required.");
  }
  vector3(geometry.assemblyPlacement.centerAtEpoch, "geometry.assemblyPlacement.centerAtEpoch");
  vector3(geometry.assemblyPlacement.velocity, "geometry.assemblyPlacement.velocity");
  if (!Array.isArray(geometry.frameProvenance)) {
    throw new TypeError("geometry.frameProvenance must be an array.");
  }
  geometry.frameProvenance.forEach((row, index) => {
    concreteString(row?.frameId ?? row?.braidId, `geometry.frameProvenance[${index}] frame id`);
    if (!row.frameDefinition || typeof row.frameDefinition !== "object" || Array.isArray(row.frameDefinition)) {
      throw new TypeError(`geometry.frameProvenance[${index}].frameDefinition is required.`);
    }
  });
  if (geometry.reconstruction != null) {
    concreteString(geometry.reconstruction.operator, "geometry.reconstruction.operator");
  }
  if (geometry.transforms != null) {
    if (!Array.isArray(geometry.transforms)) throw new TypeError("geometry.transforms must be an array.");
    geometry.transforms.forEach((row, index) => {
      concreteString(row?.id, `geometry.transforms[${index}].id`);
      concreteString(row?.operator, `geometry.transforms[${index}].operator`);
    });
  }
  if (geometry.parameterRanges != null) {
    if (!Array.isArray(geometry.parameterRanges)) throw new TypeError("geometry.parameterRanges must be an array.");
    geometry.parameterRanges.forEach((row, index) => {
      concreteString(row?.id, `geometry.parameterRanges[${index}].id`);
      if (row.minimum != null) finite(row.minimum, `geometry.parameterRanges[${index}].minimum`);
      if (row.maximum != null) finite(row.maximum, `geometry.parameterRanges[${index}].maximum`);
      if (row.minimum != null && row.maximum != null && row.maximum < row.minimum) {
        throw new RangeError(`geometry.parameterRanges[${index}] maximum must not be below minimum.`);
      }
    });
  }
  validatePrescribedLatticeDeclarations(geometry.lattices, spec);
  validatePrescribedSeaDeclarations(geometry.seas, spec);
}

function validateRelationships(relationships, constituents) {
  if (!relationships || typeof relationships !== "object" || Array.isArray(relationships)) {
    throw new TypeError("prescribed assembly relationships are required.");
  }
  const constituentIds = new Set(constituents.map((row) => row.id));
  if (!Array.isArray(relationships.sourceOrder)
      || relationships.sourceOrder.length !== constituents.length
      || new Set(relationships.sourceOrder).size !== constituents.length
      || relationships.sourceOrder.some((id) => !constituentIds.has(id))) {
    throw new TypeError("relationships.sourceOrder must name every constituent exactly once.");
  }
  const relationshipIds = new Set();
  for (const collection of [
    "neutralPairs",
    "pairings",
    "componentBraids",
    "polaritySectors",
    "symmetryOrbits",
    "accessorySets",
    "equivalences",
  ]) {
    if (relationships[collection] == null) continue;
    if (!Array.isArray(relationships[collection])) {
      throw new TypeError(`relationships.${collection} must be an array.`);
    }
    relationships[collection].forEach((row, index) => {
      const label = `relationships.${collection}[${index}]`;
      const id = concreteString(row?.id, `${label}.id`);
      if (relationshipIds.has(id)) throw new TypeError(`relationship id ${id} is duplicated.`);
      relationshipIds.add(id);
      if (!Array.isArray(row.members) || row.members.length === 0
          || new Set(row.members).size !== row.members.length
          || row.members.some((memberId) => !constituentIds.has(memberId))) {
        throw new TypeError(`${label}.members must reference distinct declared constituents.`);
      }
      if (collection === "neutralPairs") {
        if (row.members.length !== 2) throw new TypeError(`${label} must contain two members.`);
        const polarities = row.members.map((id) => constituents.find((entry) => entry.id === id).polarity);
        if (polarities[0] !== -polarities[1]) {
          throw new RangeError(`${label} must relate opposite-polarity constituents.`);
        }
      }
      if (collection === "pairings") {
        concreteString(row.kind, `${label}.kind`);
        if (row.members.length < 2) throw new TypeError(`${label} must relate at least two constituents.`);
      }
      if (collection === "componentBraids" && row.members.some((id) =>
        constituents.find((entry) => entry.id === id).role !== "braid")) {
        throw new TypeError(`${label} may contain only braid-role constituents.`);
      }
      if (collection === "polaritySectors") {
        if (row.polarity !== -1 && row.polarity !== 1) {
          throw new TypeError(`${label}.polarity must be -1 or +1.`);
        }
        if (row.members.some((id) =>
          constituents.find((entry) => entry.id === id).polarity !== row.polarity)) {
          throw new RangeError(`${label} contains a constituent from the opposite polarity sector.`);
        }
      }
      if (collection === "accessorySets" && row.members.some((id) =>
        constituents.find((entry) => entry.id === id).role !== "accessory")) {
        throw new TypeError(`${label} may contain only accessory constituents.`);
      }
    });
  }
  if (relationships.permutations != null) {
    if (!Array.isArray(relationships.permutations)) {
      throw new TypeError("relationships.permutations must be an array.");
    }
    relationships.permutations.forEach((row, index) => {
      const label = `relationships.permutations[${index}]`;
      const id = concreteString(row?.id, `${label}.id`);
      if (relationshipIds.has(id)) throw new TypeError(`relationship id ${id} is duplicated.`);
      relationshipIds.add(id);
      concreteString(row.kind, `${label}.kind`);
      if (!row.mapping || typeof row.mapping !== "object" || Array.isArray(row.mapping)) {
        throw new TypeError(`${label}.mapping must be an object.`);
      }
      const from = Object.keys(row.mapping);
      const to = Object.values(row.mapping);
      if (from.length === 0 || from.some((memberId) => !constituentIds.has(memberId)) ||
          to.some((memberId) => !constituentIds.has(memberId)) ||
          new Set(from).size !== from.length || new Set(to).size !== to.length ||
          from.some((memberId) => !to.includes(memberId))) {
        throw new TypeError(`${label}.mapping must be a bijection of one declared constituent subset.`);
      }
    });
  }
  const owned = new Set();
  (relationships.neutralPairs ?? []).forEach((pair) => pair.members.forEach((id) => {
    if (owned.has(id)) throw new TypeError(`constituent ${id} belongs to more than one neutral pair.`);
    owned.add(id);
  }));
  const accessories = constituents.filter((row) => row.role === "accessory").map((row) => row.id);
  const declaredAccessories = new Set((relationships.accessorySets ?? []).flatMap((row) => row.members));
  if (accessories.some((id) => !declaredAccessories.has(id))) {
    throw new TypeError("every accessory constituent must belong to a declared accessory set.");
  }
}

function validateHistory(history) {
  if (!history || typeof history !== "object") throw new TypeError("prescribed assembly history is required.");
  const start = finite(history.start, "history.start");
  const end = finite(history.end, "history.end");
  if (!(end > start)) throw new RangeError("history.end must be greater than history.start.");
  nonnegative(history.delayHorizon, "history.delayHorizon");
  if (typeof history.periodic !== "boolean") throw new TypeError("history.periodic must be boolean.");
  if (history.periodic) {
    const period = positive(history.returnPeriod, "history.returnPeriod");
    requireNear((end - start) / period, Math.round((end - start) / period), GEOMETRY_TOLERANCE, "history interval periods");
  } else if (history.returnPeriod != null) {
    throw new TypeError("nonperiodic prescribed history must not declare a returnPeriod.");
  }
}

function validateInterpolation(interpolation) {
  if (interpolation?.rule !== "piecewise-cubic-hermite/v0") {
    throw new TypeError("interpolation.rule must be piecewise-cubic-hermite/v0.");
  }
  positive(interpolation.interval, "interpolation.interval");
  concreteString(interpolation.errorMethod, "interpolation.errorMethod");
  positive(interpolation.positionDivisor, "interpolation.positionDivisor");
  positive(interpolation.velocityDivisor, "interpolation.velocityDivisor");
  positive(interpolation.roundoffMultiplier, "interpolation.roundoffMultiplier");
}

function validateDisplay(display, history) {
  if (!display || typeof display !== "object") throw new TypeError("prescribed assembly display metadata is required.");
  positive(display.sphericalEnvelopeRadius, "display.sphericalEnvelopeRadius");
  positiveInteger(display.ansatzSampleCount, "display.ansatzSampleCount");
  if (history.periodic) {
    if (display.trailPeriods !== 1) throw new TypeError("periodic display.trailPeriods must be exactly 1.");
  } else {
    positive(display.trailDuration, "display.trailDuration");
    if (display.trailDuration > history.end - history.start + GEOMETRY_TOLERANCE) {
      throw new RangeError("display.trailDuration must fit inside the declared nonperiodic history.");
    }
  }
}

function validateConstraints(spec) {
  const validators = spec.constraints?.validators;
  if (!Array.isArray(validators)) throw new TypeError("constraints.validators must be an array.");
  validators.forEach((id, index) => concreteString(id, `constraints.validators[${index}]`));
  const speed = spec.constraints?.speedGuard;
  if (!speed || speed.normalizedFieldSpeed !== NORMALIZED_FIELD_SPEED) {
    throw new TypeError("constraints.speedGuard.normalizedFieldSpeed must be c_f=1.");
  }
  if (speed.maximumExclusive !== NORMALIZED_FIELD_SPEED) {
    throw new TypeError("constraints.speedGuard.maximumExclusive must be 1.");
  }
  const maximum = Math.max(...spec.worldlines.map((row) => prescribedWorldlineSpeedBound(
    row.operator,
    spec.history.start,
    spec.history.end,
  )));
  if (speed.policy === "reject" && !(maximum < NORMALIZED_FIELD_SPEED)) {
    throw new RangeError(`prescribed assembly speed guard failed: bound ${maximum} is not below c_f=1.`);
  }
  if (speed.policy === "preserve-and-report") {
    const declared = finite(speed.observedBound, "constraints.speedGuard.observedBound");
    requireNear(declared, maximum, GEOMETRY_TOLERANCE, "constraints.speedGuard.observedBound");
    if (speed.migrationBoundary !== "geometry-preservation-only") {
      throw new TypeError("preserve-and-report speed guards require migrationBoundary=geometry-preservation-only.");
    }
  } else if (speed.policy !== "reject") {
    throw new TypeError("constraints.speedGuard.policy must be reject or preserve-and-report.");
  }
  if (spec.constraints.collisionGuard != null) {
    const samples = positiveInteger(
      spec.constraints.collisionGuard.sampleCount,
      "constraints.collisionGuard.sampleCount",
    );
    const minimumRequired = positive(
      spec.constraints.collisionGuard.minimumSampledClearance,
      "constraints.collisionGuard.minimumSampledClearance",
    );
    let minimum = Infinity;
    for (let sample = 0; sample <= samples; sample += 1) {
      const time = spec.history.start
        + (spec.history.end - spec.history.start) * sample / samples;
      const positions = spec.worldlines.map((row) =>
        evaluatePrescribedWorldlineOperator(row.operator, time).position);
      for (let left = 0; left < positions.length; left += 1) {
        for (let right = left + 1; right < positions.length; right += 1) {
          minimum = Math.min(minimum, norm(subtract(positions[left], positions[right])));
        }
      }
    }
    if (minimum + GEOMETRY_TOLERANCE < minimumRequired) {
      throw new RangeError(
        `prescribed assembly collision guard failed: sampled ${minimum}, required ${minimumRequired}.`,
      );
    }
  }
}

function validateCompatibility(compatibility) {
  if (compatibility == null) return;
  if (!Array.isArray(compatibility.retainedIdentifiers)) {
    throw new TypeError("compatibility.retainedIdentifiers must be an array.");
  }
  compatibility.retainedIdentifiers.forEach((row, index) => {
    for (const field of ["kind", "value", "reason"]) {
      concreteString(row?.[field], `compatibility.retainedIdentifiers[${index}].${field}`);
    }
  });
}

function concreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0 || value === "unspecified") {
    throw new TypeError(`${label} must be concrete.`);
  }
  return value;
}

function finite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`${label} must be finite.`);
  return number;
}

function vector3(value, label) {
  if (!Array.isArray(value) || value.length !== 3) {
    throw new TypeError(`${label} must be a three-vector.`);
  }
  value.forEach((entry, index) => finite(entry, `${label}[${index}]`));
  return value;
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

function positiveInteger(value, label) {
  const number = finite(value, label);
  if (!Number.isSafeInteger(number) || number < 1) throw new TypeError(`${label} must be a positive integer.`);
  return number;
}

function requireNear(actual, expected, tolerance, label) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new RangeError(`${label} must be within ${tolerance}; received ${actual}, expected ${expected}.`);
  }
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

function objectVector(vector) {
  return { x: vector[0], y: vector[1], z: vector[2] };
}
