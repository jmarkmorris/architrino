import {
  evaluatePrescribedWorldlineOperator,
} from "./PrescribedWorldlineOperators.mjs";

export const PRESCRIBED_SEA_MODEL_KINDS = Object.freeze([
  "assembly-population-sea.v1",
]);

const MATERIALIZATION_STATUSES = new Set(["explicit-finite", "template-only"]);
const BOUNDARY_INTERPRETATIONS = new Set([
  "finite-population",
  "visualization-window",
  "population-template",
]);
const POPULATION_ROLES = new Set(["sea-background", "transient"]);
const GEOMETRY_TOLERANCE = 1e-12;

export function validatePrescribedSeaDeclarations(rawSeas, context) {
  materializePrescribedSeaDeclarations(rawSeas, context);
  return rawSeas;
}

export function materializePrescribedSeaDeclarations(rawSeas, context) {
  if (rawSeas == null) return Object.freeze([]);
  if (!Array.isArray(rawSeas) || rawSeas.length === 0) {
    throw new TypeError("geometry.seas must be a nonempty array when declared.");
  }
  const constituentById = new Map((context?.constituents ?? []).map((row) => [row.id, row]));
  const worldlineById = new Map((context?.worldlines ?? []).map((row) => [row.id, row]));
  const seaIds = new Set();
  const seas = rawSeas.map((raw, index) => {
    const label = `geometry.seas[${index}]`;
    object(raw, label);
    const id = concreteString(raw.id, `${label}.id`);
    if (seaIds.has(id)) throw new TypeError(`sea id ${id} is duplicated.`);
    seaIds.add(id);
    const model = validateSeaModel(raw.model, `${label}.model`);
    const materialization = validateMaterialization(
      raw.materialization,
      model,
      constituentById,
      worldlineById,
      `${label}.materialization`,
    );
    return Object.freeze({
      id,
      model,
      materialization: materialization.declaration,
      realizedAssemblies: materialization.realizedAssemblies,
    });
  });
  return Object.freeze(seas);
}

function validateSeaModel(raw, label) {
  object(raw, label);
  if (!PRESCRIBED_SEA_MODEL_KINDS.includes(raw.kind)) {
    throw new TypeError(`${label}.kind ${raw.kind} is not a registered prescribed-sea model.`);
  }
  const frame = validateFrame(raw.frame, `${label}.frame`);
  const region = raw.region == null ? null : validateRegion(raw.region, `${label}.region`);
  const assemblyTemplates = validateAssemblyTemplates(
    raw.assemblyTemplates,
    `${label}.assemblyTemplates`,
  );
  return Object.freeze({
    kind: raw.kind,
    frame,
    region,
    assemblyTemplates,
    metadata: Object.freeze(structuredClone(raw.metadata ?? {})),
  });
}

function validateFrame(raw, label) {
  object(raw, label);
  if (raw.kind !== "visualization-frame.v1") {
    throw new TypeError(`${label}.kind must be visualization-frame.v1.`);
  }
  return Object.freeze({
    kind: raw.kind,
    epochTime: finite(raw.epochTime ?? 0, `${label}.epochTime`),
    originAtEpoch: freezeVector(vector3(raw.originAtEpoch, `${label}.originAtEpoch`)),
    velocity: freezeVector(vector3(raw.velocity, `${label}.velocity`)),
  });
}

function validateRegion(raw, label) {
  object(raw, label);
  if (raw.kind !== "axis-aligned-box.v1") {
    throw new TypeError(`${label}.kind must be axis-aligned-box.v1.`);
  }
  const minimum = vector3(raw.minimum, `${label}.minimum`);
  const maximumExclusive = vector3(raw.maximumExclusive, `${label}.maximumExclusive`);
  maximumExclusive.forEach((value, axis) => {
    if (!(value > minimum[axis])) {
      throw new RangeError(`${label}.maximumExclusive[${axis}] must exceed the corresponding minimum.`);
    }
  });
  return Object.freeze({
    kind: raw.kind,
    minimum: freezeVector(minimum),
    maximumExclusive: freezeVector(maximumExclusive),
  });
}

function validateAssemblyTemplates(rawTemplates, label) {
  if (!Array.isArray(rawTemplates) || rawTemplates.length === 0) {
    throw new TypeError(`${label} must be a nonempty array.`);
  }
  const templateIds = new Set();
  return Object.freeze(rawTemplates.map((raw, index) => {
    const rowLabel = `${label}[${index}]`;
    object(raw, rowLabel);
    const id = concreteString(raw.id, `${rowLabel}.id`);
    if (templateIds.has(id)) throw new TypeError(`sea assembly-template id ${id} is duplicated.`);
    templateIds.add(id);
    const assemblyClass = concreteString(raw.assemblyClass, `${rowLabel}.assemblyClass`);
    const variant = raw.variant == null ? null : concreteString(raw.variant, `${rowLabel}.variant`);
    if (!POPULATION_ROLES.has(raw.populationRole)) {
      throw new TypeError(`${rowLabel}.populationRole must be sea-background or transient.`);
    }
    return Object.freeze({
      id,
      assemblyClass,
      variant,
      populationRole: raw.populationRole,
      memberCount: positiveInteger(raw.memberCount, `${rowLabel}.memberCount`),
      geometryOwner: concreteString(raw.geometryOwner, `${rowLabel}.geometryOwner`),
      metadata: Object.freeze(structuredClone(raw.metadata ?? {})),
    });
  }));
}

function validateMaterialization(raw, model, constituentById, worldlineById, label) {
  object(raw, label);
  if (!MATERIALIZATION_STATUSES.has(raw.status)) {
    throw new TypeError(`${label}.status must be explicit-finite or template-only.`);
  }
  if (!BOUNDARY_INTERPRETATIONS.has(raw.boundaryInterpretation)) {
    throw new TypeError(`${label}.boundaryInterpretation is not registered.`);
  }
  if (raw.status === "template-only") {
    if (raw.boundaryInterpretation !== "population-template") {
      throw new TypeError(`${label}.boundaryInterpretation must be population-template for template-only seas.`);
    }
    if (raw.instances != null) {
      throw new TypeError(`${label} template-only declarations must not claim instances.`);
    }
    return {
      declaration: Object.freeze({
        status: raw.status,
        boundaryInterpretation: raw.boundaryInterpretation,
      }),
      realizedAssemblies: Object.freeze([]),
    };
  }
  if (raw.boundaryInterpretation !== "finite-population"
      && raw.boundaryInterpretation !== "visualization-window") {
    throw new TypeError(
      `${label}.boundaryInterpretation must be finite-population or visualization-window for an explicit sea.`,
    );
  }
  if (raw.boundaryInterpretation === "visualization-window" && model.region == null) {
    throw new TypeError(`${label} requires model.region for a visualization-window sea.`);
  }
  if (!Array.isArray(raw.instances) || raw.instances.length === 0) {
    throw new TypeError(`${label}.instances must be a nonempty array for an explicit sea.`);
  }
  const realizedAssemblies = materializeInstances(
    raw.instances,
    model,
    constituentById,
    worldlineById,
    `${label}.instances`,
  );
  return {
    declaration: Object.freeze({
      status: raw.status,
      boundaryInterpretation: raw.boundaryInterpretation,
      instances: Object.freeze(structuredClone(raw.instances)),
    }),
    realizedAssemblies,
  };
}

function materializeInstances(rawInstances, model, constituentById, worldlineById, label) {
  const templateById = new Map(model.assemblyTemplates.map((row) => [row.id, row]));
  const instanceIds = new Set();
  const assignedConstituentIds = new Set();
  return Object.freeze(rawInstances.map((raw, index) => {
    const rowLabel = `${label}[${index}]`;
    object(raw, rowLabel);
    const id = concreteString(raw.id, `${rowLabel}.id`);
    if (instanceIds.has(id)) throw new TypeError(`sea assembly-instance id ${id} is duplicated.`);
    instanceIds.add(id);
    const templateId = concreteString(raw.templateId, `${rowLabel}.templateId`);
    const template = templateById.get(templateId);
    if (!template) throw new TypeError(`${rowLabel}.templateId references undeclared template ${templateId}.`);
    if (!Array.isArray(raw.memberConstituentIds)
        || raw.memberConstituentIds.length !== template.memberCount
        || new Set(raw.memberConstituentIds).size !== raw.memberConstituentIds.length) {
      throw new TypeError(
        `${rowLabel}.memberConstituentIds must name ${template.memberCount} distinct constituents.`,
      );
    }
    const memberWorldlineIds = raw.memberConstituentIds.map((constituentId, memberIndex) => {
      concreteString(constituentId, `${rowLabel}.memberConstituentIds[${memberIndex}]`);
      if (assignedConstituentIds.has(constituentId)) {
        throw new TypeError(`${rowLabel} reuses constituent ${constituentId} within one sea.`);
      }
      assignedConstituentIds.add(constituentId);
      const constituent = constituentById.get(constituentId);
      const worldline = constituent == null ? null : worldlineById.get(constituent.worldlineId);
      if (!constituent || !worldline || worldline.constituentId !== constituentId) {
        throw new TypeError(`${rowLabel} member ${constituentId} must own one declared worldline.`);
      }
      return worldline.id;
    });
    const groupMotion = validateGroupMotion(raw.groupMotion, `${rowLabel}.groupMotion`);
    const states = memberWorldlineIds.map((worldlineId) =>
      evaluatePrescribedWorldlineOperator(worldlineById.get(worldlineId).operator, groupMotion.epochTime));
    const actualPosition = meanVector(states.map((state) => state.position));
    const actualVelocity = meanVector(states.map((state) => state.velocity));
    const frameState = evaluateFrame(model.frame, groupMotion.epochTime);
    const expectedPosition = add(frameState.position, groupMotion.positionAtEpoch);
    const expectedVelocity = add(frameState.velocity, groupMotion.velocity);
    requireVectorNear(actualPosition, expectedPosition, `${rowLabel} geometric-centroid position`);
    requireVectorNear(actualVelocity, expectedVelocity, `${rowLabel} geometric-centroid velocity`);
    return Object.freeze({
      id,
      templateId,
      assemblyClass: template.assemblyClass,
      variant: template.variant,
      populationRole: template.populationRole,
      memberConstituentIds: Object.freeze([...raw.memberConstituentIds]),
      memberWorldlineIds: Object.freeze(memberWorldlineIds),
      groupMotion,
      absoluteGroupStateAtEpoch: Object.freeze({
        position: freezeVector(expectedPosition),
        velocity: freezeVector(expectedVelocity),
      }),
      metadata: Object.freeze(structuredClone(raw.metadata ?? {})),
    });
  }));
}

function validateGroupMotion(raw, label) {
  object(raw, label);
  if (raw.kind !== "inertial-group.v1") {
    throw new TypeError(`${label}.kind must be inertial-group.v1.`);
  }
  return Object.freeze({
    kind: raw.kind,
    epochTime: finite(raw.epochTime ?? 0, `${label}.epochTime`),
    positionAtEpoch: freezeVector(vector3(raw.positionAtEpoch, `${label}.positionAtEpoch`)),
    velocity: freezeVector(vector3(raw.velocity, `${label}.velocity`)),
  });
}

function evaluateFrame(frame, time) {
  const dt = time - frame.epochTime;
  return {
    position: add(frame.originAtEpoch, scale(frame.velocity, dt)),
    velocity: frame.velocity,
  };
}

function object(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${label} must be an object.`);
  }
  return value;
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

function positiveInteger(value, label) {
  const number = finite(value, label);
  if (!Number.isSafeInteger(number) || number < 1) {
    throw new TypeError(`${label} must be a positive integer.`);
  }
  return number;
}

function vector3(value, label) {
  if (!Array.isArray(value) || value.length !== 3) {
    throw new TypeError(`${label} must be a three-vector.`);
  }
  return value.map((entry, index) => finite(entry, `${label}[${index}]`));
}

function meanVector(vectors) {
  return scale(vectors.reduce((sum, vector) => add(sum, vector), [0, 0, 0]), 1 / vectors.length);
}

function requireVectorNear(actual, expected, label) {
  const distance = Math.hypot(...actual.map((value, axis) => value - expected[axis]));
  if (distance > GEOMETRY_TOLERANCE) {
    throw new RangeError(
      `${label} differs from its declared sea group motion by ${distance}; tolerance ${GEOMETRY_TOLERANCE}.`,
    );
  }
}

function add(left, right) {
  return left.map((value, axis) => value + right[axis]);
}

function scale(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function freezeVector(vector) {
  return Object.freeze([...vector]);
}
