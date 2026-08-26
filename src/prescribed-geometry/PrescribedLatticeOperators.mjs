import {
  evaluatePrescribedWorldlineOperator,
} from "./PrescribedWorldlineOperators.mjs";

export const PRESCRIBED_LATTICE_GENERATOR_KINDS = Object.freeze([
  "translation-lattice.v1",
  "seeded-random-sites.v1",
]);

const MATERIALIZATION_STATUSES = new Set(["explicit-finite", "template-only"]);
const BOUNDARY_INTERPRETATIONS = new Set([
  "finite-population",
  "cropped-periodic-template",
  "infinite-template",
  "finite-sample",
  "stochastic-template",
]);
const CONSTITUENT_ROLES = new Set(["braid", "accessory"]);
const GEOMETRY_TOLERANCE = 1e-12;
const MAX_EXPLICIT_SITE_COUNT = 1_000_000;
const UINT32_MAX = 0xffff_ffff;

export function validatePrescribedLatticeDeclarations(rawLattices, context) {
  materializePrescribedLatticeDeclarations(rawLattices, context);
  return rawLattices;
}

export function materializePrescribedLatticeDeclarations(rawLattices, context) {
  if (rawLattices == null) return Object.freeze([]);
  if (!Array.isArray(rawLattices) || rawLattices.length === 0) {
    throw new TypeError("geometry.lattices must be a nonempty array when declared.");
  }
  const constituentById = new Map((context?.constituents ?? []).map((row) => [row.id, row]));
  const worldlineById = new Map((context?.worldlines ?? []).map((row) => [row.id, row]));
  const latticeIds = new Set();
  const materialized = rawLattices.map((raw, index) => {
    const label = `geometry.lattices[${index}]`;
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      throw new TypeError(`${label} must be an object.`);
    }
    const id = concreteString(raw.id, `${label}.id`);
    if (latticeIds.has(id)) throw new TypeError(`lattice id ${id} is duplicated.`);
    latticeIds.add(id);
    const generator = validateGenerator(raw.generator, `${label}.generator`);
    const materialization = validateMaterialization(
      raw.materialization,
      generator,
      constituentById,
      worldlineById,
      `${label}.materialization`,
    );
    return Object.freeze({
      id,
      generator,
      materialization: materialization.declaration,
      realizedSites: materialization.realizedSites,
    });
  });
  return Object.freeze(materialized);
}

function validateGenerator(raw, label) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new TypeError(`${label} must be an object.`);
  }
  if (!PRESCRIBED_LATTICE_GENERATOR_KINDS.includes(raw.kind)) {
    throw new TypeError(`${label}.kind ${raw.kind} is not a registered prescribed-lattice generator.`);
  }
  if (raw.kind === "translation-lattice.v1") return validateTranslationGenerator(raw, label);
  return validateSeededRandomGenerator(raw, label);
}

function validateTranslationGenerator(raw, label) {
  const origin = freezeVector(vector3(raw.origin, `${label}.origin`));
  if (!Array.isArray(raw.basisVectors) || raw.basisVectors.length !== 3) {
    throw new TypeError(`${label}.basisVectors must contain three three-vectors.`);
  }
  const basisVectors = raw.basisVectors.map((row, index) =>
    freezeVector(vector3(row, `${label}.basisVectors[${index}]`)));
  const determinant = dot(basisVectors[0], cross(basisVectors[1], basisVectors[2]));
  if (!(Math.abs(determinant) > GEOMETRY_TOLERANCE)) {
    throw new RangeError(`${label}.basisVectors must span three dimensions.`);
  }
  const siteTemplates = validateSiteTemplates(raw.siteTemplates, `${label}.siteTemplates`, {
    requireFractionalPosition: true,
  });
  const extent = validateTranslationExtent(raw.extent, `${label}.extent`);
  return Object.freeze({
    kind: raw.kind,
    origin,
    basisVectors: Object.freeze(basisVectors),
    siteTemplates,
    extent,
  });
}

function validateTranslationExtent(raw, label) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new TypeError(`${label} must be an object.`);
  }
  if (raw.kind === "infinite-index-space.v1") {
    return Object.freeze({ kind: raw.kind });
  }
  if (raw.kind !== "finite-index-box.v1") {
    throw new TypeError(`${label}.kind must be finite-index-box.v1 or infinite-index-space.v1.`);
  }
  const minimum = integerVector3(raw.minimum, `${label}.minimum`);
  const maximumExclusive = integerVector3(raw.maximumExclusive, `${label}.maximumExclusive`);
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

function validateSeededRandomGenerator(raw, label) {
  if (raw.algorithm !== "xorshift32.v1") {
    throw new TypeError(`${label}.algorithm must be xorshift32.v1.`);
  }
  const seed = unsignedNonzeroInteger(raw.seed, `${label}.seed`);
  const siteCount = positiveInteger(raw.siteCount, `${label}.siteCount`);
  if (siteCount > MAX_EXPLICIT_SITE_COUNT) {
    throw new RangeError(`${label}.siteCount exceeds the ${MAX_EXPLICIT_SITE_COUNT} site validation limit.`);
  }
  if (raw.templateAssignment !== "cyclic.v1") {
    throw new TypeError(`${label}.templateAssignment must be cyclic.v1.`);
  }
  const domain = validateRandomDomain(raw.domain, `${label}.domain`);
  const siteTemplates = validateSiteTemplates(raw.siteTemplates, `${label}.siteTemplates`);
  return Object.freeze({
    kind: raw.kind,
    algorithm: raw.algorithm,
    seed,
    siteCount,
    templateAssignment: raw.templateAssignment,
    domain,
    siteTemplates,
  });
}

function validateRandomDomain(raw, label) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)
      || raw.kind !== "axis-aligned-box.v1") {
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

function validateSiteTemplates(rawTemplates, label, options = {}) {
  if (!Array.isArray(rawTemplates) || rawTemplates.length === 0) {
    throw new TypeError(`${label} must be a nonempty array.`);
  }
  const ids = new Set();
  return Object.freeze(rawTemplates.map((raw, index) => {
    const rowLabel = `${label}[${index}]`;
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      throw new TypeError(`${rowLabel} must be an object.`);
    }
    const id = concreteString(raw.id, `${rowLabel}.id`);
    if (ids.has(id)) throw new TypeError(`lattice site-template id ${id} is duplicated.`);
    ids.add(id);
    if (raw.polarity !== -1 && raw.polarity !== 1) {
      throw new TypeError(`${rowLabel}.polarity must be -1 or +1.`);
    }
    if (!CONSTITUENT_ROLES.has(raw.role)) {
      throw new TypeError(`${rowLabel}.role must be braid or accessory.`);
    }
    const fractionalPosition = options.requireFractionalPosition
      ? vector3(raw.fractionalPosition, `${rowLabel}.fractionalPosition`)
      : null;
    if (fractionalPosition?.some((value) => value < 0 || value >= 1)) {
      throw new RangeError(`${rowLabel}.fractionalPosition coordinates must lie in [0, 1).`);
    }
    return Object.freeze({
      id,
      polarity: raw.polarity,
      role: raw.role,
      ...(fractionalPosition ? { fractionalPosition: freezeVector(fractionalPosition) } : {}),
      metadata: Object.freeze(structuredClone(raw.metadata ?? {})),
    });
  }));
}

function validateMaterialization(raw, generator, constituentById, worldlineById, label) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new TypeError(`${label} must be an object.`);
  }
  if (!MATERIALIZATION_STATUSES.has(raw.status)) {
    throw new TypeError(`${label}.status must be explicit-finite or template-only.`);
  }
  if (!BOUNDARY_INTERPRETATIONS.has(raw.boundaryInterpretation)) {
    throw new TypeError(`${label}.boundaryInterpretation is not registered.`);
  }
  if (raw.status === "template-only") {
    validateTemplateBoundary(generator, raw.boundaryInterpretation, label);
    if (raw.epochTime != null || raw.instances != null) {
      throw new TypeError(`${label} template-only declarations must not claim epochTime or instances.`);
    }
    return {
      declaration: Object.freeze({
        status: raw.status,
        boundaryInterpretation: raw.boundaryInterpretation,
      }),
      realizedSites: Object.freeze([]),
    };
  }
  validateExplicitBoundary(generator, raw.boundaryInterpretation, label);
  const epochTime = finite(raw.epochTime, `${label}.epochTime`);
  if (!Array.isArray(raw.instances)) throw new TypeError(`${label}.instances must be an array.`);
  const realizedSites = generator.kind === "translation-lattice.v1"
    ? materializeTranslationSites(generator, raw.instances, epochTime, constituentById, worldlineById, label)
    : materializeRandomSites(generator, raw.instances, epochTime, constituentById, worldlineById, label);
  return {
    declaration: Object.freeze({
      status: raw.status,
      epochTime,
      boundaryInterpretation: raw.boundaryInterpretation,
      instances: Object.freeze(structuredClone(raw.instances)),
    }),
    realizedSites,
  };
}

function validateTemplateBoundary(generator, boundary, label) {
  if (generator.kind === "translation-lattice.v1") {
    if (generator.extent.kind === "infinite-index-space.v1" && boundary !== "infinite-template") {
      throw new TypeError(`${label}.boundaryInterpretation must be infinite-template for this template.`);
    }
    if (generator.extent.kind === "finite-index-box.v1"
        && boundary !== "finite-population" && boundary !== "cropped-periodic-template") {
      throw new TypeError(
        `${label}.boundaryInterpretation must be finite-population or cropped-periodic-template for this template.`,
      );
    }
  } else if (boundary !== "stochastic-template") {
    throw new TypeError(`${label}.boundaryInterpretation must be stochastic-template for a random template.`);
  }
}

function validateExplicitBoundary(generator, boundary, label) {
  if (generator.kind === "translation-lattice.v1") {
    if (generator.extent.kind !== "finite-index-box.v1") {
      throw new TypeError(`${label} cannot explicitly materialize an infinite translation lattice.`);
    }
    if (boundary !== "finite-population" && boundary !== "cropped-periodic-template") {
      throw new TypeError(`${label}.boundaryInterpretation must be finite-population or cropped-periodic-template.`);
    }
  } else if (boundary !== "finite-sample") {
    throw new TypeError(`${label}.boundaryInterpretation must be finite-sample for explicit random sites.`);
  }
}

function materializeTranslationSites(generator, rawInstances, epochTime, constituentById, worldlineById, label) {
  const expected = [];
  const { minimum, maximumExclusive } = generator.extent;
  const cellCount = product(maximumExclusive.map((value, axis) => value - minimum[axis]));
  const siteCount = cellCount * generator.siteTemplates.length;
  if (!Number.isSafeInteger(siteCount) || siteCount > MAX_EXPLICIT_SITE_COUNT) {
    throw new RangeError(`${label} exceeds the ${MAX_EXPLICIT_SITE_COUNT} site validation limit.`);
  }
  for (let i = minimum[0]; i < maximumExclusive[0]; i += 1) {
    for (let j = minimum[1]; j < maximumExclusive[1]; j += 1) {
      for (let k = minimum[2]; k < maximumExclusive[2]; k += 1) {
        for (const template of generator.siteTemplates) {
          const cellIndex = [i, j, k];
          expected.push({
            key: translationSiteKey(cellIndex, template.id),
            cellIndex,
            template,
            position: translationSitePosition(generator, cellIndex, template.fractionalPosition),
          });
        }
      }
    }
  }
  if (rawInstances.length !== expected.length) {
    throw new TypeError(`${label}.instances must bind all ${expected.length} generated translation-lattice sites.`);
  }
  const expectedByKey = new Map(expected.map((row) => [row.key, row]));
  return bindInstances(rawInstances, expectedByKey, epochTime, constituentById, worldlineById, label, (raw, rowLabel) => {
    const cellIndex = integerVector3(raw.cellIndex, `${rowLabel}.cellIndex`);
    const templateId = concreteString(raw.templateId, `${rowLabel}.templateId`);
    return translationSiteKey(cellIndex, templateId);
  });
}

function materializeRandomSites(generator, rawInstances, epochTime, constituentById, worldlineById, label) {
  if (rawInstances.length !== generator.siteCount) {
    throw new TypeError(`${label}.instances must bind all ${generator.siteCount} generated random sites.`);
  }
  const expectedByKey = new Map();
  let state = generator.seed;
  for (let sampleIndex = 0; sampleIndex < generator.siteCount; sampleIndex += 1) {
    const draws = [];
    for (let axis = 0; axis < 3; axis += 1) {
      state = nextXorshift32(state);
      draws.push(state / 0x1_0000_0000);
    }
    const template = generator.siteTemplates[sampleIndex % generator.siteTemplates.length];
    const position = draws.map((draw, axis) => generator.domain.minimum[axis]
      + draw * (generator.domain.maximumExclusive[axis] - generator.domain.minimum[axis]));
    const key = randomSiteKey(sampleIndex, template.id);
    expectedByKey.set(key, { key, sampleIndex, template, position });
  }
  return bindInstances(rawInstances, expectedByKey, epochTime, constituentById, worldlineById, label, (raw, rowLabel) => {
    const sampleIndex = nonnegativeInteger(raw.sampleIndex, `${rowLabel}.sampleIndex`);
    const templateId = concreteString(raw.templateId, `${rowLabel}.templateId`);
    return randomSiteKey(sampleIndex, templateId);
  });
}

function bindInstances(rawInstances, expectedByKey, epochTime, constituentById, worldlineById, label, keyFor) {
  const boundKeys = new Set();
  const boundConstituents = new Set();
  const boundWorldlines = new Set();
  const rows = rawInstances.map((raw, index) => {
    const rowLabel = `${label}.instances[${index}]`;
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      throw new TypeError(`${rowLabel} must be an object.`);
    }
    const key = keyFor(raw, rowLabel);
    const expected = expectedByKey.get(key);
    if (!expected) throw new TypeError(`${rowLabel} does not identify a generated lattice site.`);
    if (boundKeys.has(key)) throw new TypeError(`${rowLabel} duplicates generated lattice site ${key}.`);
    boundKeys.add(key);
    const constituentId = concreteString(raw.constituentId, `${rowLabel}.constituentId`);
    const worldlineId = concreteString(raw.worldlineId, `${rowLabel}.worldlineId`);
    if (boundConstituents.has(constituentId)) {
      throw new TypeError(`${rowLabel} reuses constituent ${constituentId} within one lattice.`);
    }
    if (boundWorldlines.has(worldlineId)) {
      throw new TypeError(`${rowLabel} reuses worldline ${worldlineId} within one lattice.`);
    }
    boundConstituents.add(constituentId);
    boundWorldlines.add(worldlineId);
    const constituent = constituentById.get(constituentId);
    const worldline = worldlineById.get(worldlineId);
    if (!constituent || !worldline || constituent.worldlineId !== worldlineId
        || worldline.constituentId !== constituentId) {
      throw new TypeError(`${rowLabel} must bind one declared constituent to its own declared worldline.`);
    }
    if (constituent.polarity !== expected.template.polarity || constituent.role !== expected.template.role) {
      throw new TypeError(`${rowLabel} constituent does not match lattice site-template polarity and role.`);
    }
    const actual = evaluatePrescribedWorldlineOperator(worldline.operator, epochTime).position;
    requireVectorNear(actual, expected.position, GEOMETRY_TOLERANCE, `${rowLabel} worldline position`);
    return Object.freeze({
      siteKey: key,
      constituentId,
      worldlineId,
      templateId: expected.template.id,
      position: freezeVector(expected.position),
      ...(expected.cellIndex ? { cellIndex: freezeVector(expected.cellIndex) } : {}),
      ...(expected.sampleIndex != null ? { sampleIndex: expected.sampleIndex } : {}),
    });
  });
  if (boundKeys.size !== expectedByKey.size) {
    throw new TypeError(`${label}.instances must bind every generated lattice site exactly once.`);
  }
  return Object.freeze(rows);
}

function translationSitePosition(generator, cellIndex, fractionalPosition) {
  const coefficients = cellIndex.map((value, axis) => value + fractionalPosition[axis]);
  return add(
    generator.origin,
    scale(generator.basisVectors[0], coefficients[0]),
    scale(generator.basisVectors[1], coefficients[1]),
    scale(generator.basisVectors[2], coefficients[2]),
  );
}

function translationSiteKey(cellIndex, templateId) {
  return `cell:${cellIndex.join(",")}/template:${templateId}`;
}

function randomSiteKey(sampleIndex, templateId) {
  return `sample:${sampleIndex}/template:${templateId}`;
}

function nextXorshift32(input) {
  let state = input >>> 0;
  state ^= state << 13;
  state ^= state >>> 17;
  state ^= state << 5;
  return state >>> 0;
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
  return value.map((entry, index) => finite(entry, `${label}[${index}]`));
}

function integerVector3(value, label) {
  const vector = vector3(value, label);
  vector.forEach((entry, index) => {
    if (!Number.isSafeInteger(entry)) throw new TypeError(`${label}[${index}] must be a safe integer.`);
  });
  return vector;
}

function positiveInteger(value, label) {
  const number = finite(value, label);
  if (!Number.isSafeInteger(number) || number < 1) throw new TypeError(`${label} must be a positive integer.`);
  return number;
}

function nonnegativeInteger(value, label) {
  const number = finite(value, label);
  if (!Number.isSafeInteger(number) || number < 0) throw new TypeError(`${label} must be a nonnegative integer.`);
  return number;
}

function unsignedNonzeroInteger(value, label) {
  const number = finite(value, label);
  if (!Number.isSafeInteger(number) || number < 1 || number > UINT32_MAX) {
    throw new TypeError(`${label} must be an integer in [1, ${UINT32_MAX}].`);
  }
  return number;
}

function requireVectorNear(actual, expected, tolerance, label) {
  const distance = Math.hypot(...actual.map((value, axis) => value - expected[axis]));
  if (distance > tolerance) {
    throw new RangeError(`${label} differs from its generated lattice site by ${distance}; tolerance ${tolerance}.`);
  }
}

function add(...vectors) {
  return [0, 1, 2].map((axis) => vectors.reduce((sum, vector) => sum + vector[axis], 0));
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

function product(values) {
  return values.reduce((result, value) => result * value, 1);
}

function freezeVector(vector) {
  return Object.freeze([...vector]);
}
