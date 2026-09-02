#!/usr/bin/env node

// Declarative prescribed-assembly record generator. Configuration geometry is
// owned by prescribed-assembly-spec.v3 JSON. This file invokes no EOM solver,
// causal-root evaluator, retention test, stability test, or energy calculation.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
  validateExactPrescribedSourceRecord,
} from "../../src/prescribed-path-analysis/ExactPrescribedSourceWake.mjs";
import {
  PRESCRIBED_ASSEMBLY_EVALUATOR_ID,
  PRESCRIBED_ASSEMBLY_SPEC_SCHEMA,
  deriveNeutralPairDisplayGeometry,
  evaluateMaterializedWorldline,
  evaluatePrescribedAssemblyWorldline,
  materializePrescribedAssemblySpec,
  validatePrescribedAssemblySpec,
} from "../../src/prescribed-geometry/PrescribedAssemblySpec.mjs";
import {
  deriveAssemblyScientificIdentity,
} from "../../src/prescribed-geometry/AssemblyScientificIdentity.mjs";
import {
  createNormalizedAssemblyViewRecordCarriers,
} from "../../src/apps/shared/AssemblyViewRecordCarriers.mjs";

export const PRESCRIBED_BRAID_SPEC_SCHEMA = PRESCRIBED_ASSEMBLY_SPEC_SCHEMA;
export const PRESCRIBED_ASSEMBLY_SPEC_SCHEMA_ID = PRESCRIBED_ASSEMBLY_SPEC_SCHEMA;
export const PRESCRIBED_BRAID_EMITTER_ID = "prescribed-assembly-record-emitter.v5";
export const PRESCRIBED_GEOMETRY_ENGINE_ID = "prescribed-geometry";
export const ASSEMBLY_VIEW_RECORD_SCHEMA = "assembly-view-record.v0";
export const ASSEMBLY_VIEW_RECORD_POSITION_QUANTUM = 2e-11;
export const ASSEMBLY_VIEW_RECORD_NUMERIC_CANONICALIZATION_ID = "assembly-view-record-position-grid.v2";

const STATE_FLAG_FOR_POLARITY = Object.freeze({ "1": 1, "-1": 2 });
const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIRECTORY, "../..");
const CONFIGURATION_DIRECTORY = path.resolve(REPOSITORY_ROOT, "reference/priorities/braid-program/configurations");
const RECORD_DIRECTORY = path.resolve(REPOSITORY_ROOT, "content/assets/borg/records");

function target(specFile, outFile, { activeAnalytical = false, control = false } = {}) {
  return Object.freeze({
    specPath: path.resolve(CONFIGURATION_DIRECTORY, specFile),
    outPath: path.resolve(RECORD_DIRECTORY, outFile),
    activeAnalytical,
    control,
  });
}

const ACTIVE_ANALYTICAL_PREFIXES = Object.freeze([
  "three-axis-circular-",
  "axial-transverse-three-binary-interior",
  "high-axial-three-binary-interior",
  "planar-three-binary-common-center-reference",
  "coincident-center-two-component-circular-",
  "coaxial-separated-two-component-circular-",
  "coaxial-separated-two-planar-braid-",
]);
const CONTROL_BASES = new Set([
  "all-axial-three-binary-boundary",
  "co-spherical-scoped-negative-circular-control",
]);

const CURRENT_TARGETS = fs.readdirSync(CONFIGURATION_DIRECTORY)
  .filter((name) => name.endsWith(".v3.json"))
  .toSorted()
  .filter((specFile) => {
    const rawSpec = JSON.parse(fs.readFileSync(path.resolve(CONFIGURATION_DIRECTORY, specFile), "utf8"));
    return rawSpec.display?.catalogVisibility !== "withheld";
  })
  .map((specFile) => {
    const base = specFile.slice(0, -".v3.json".length);
    return target(specFile, `${base}.assembly-view-record.v0.json`, {
      activeAnalytical: ACTIVE_ANALYTICAL_PREFIXES.some((prefix) => base.startsWith(prefix)),
      control: CONTROL_BASES.has(base),
    });
  });

export const PRESCRIBED_ASSEMBLY_TARGETS = Object.freeze(CURRENT_TARGETS);
export const PRESCRIBED_BRAID_TARGETS = PRESCRIBED_ASSEMBLY_TARGETS;
export const ACTIVE_PRESCRIBED_BRAID_TARGETS = Object.freeze(CURRENT_TARGETS.filter((entry) => entry.activeAnalytical));
export const CONTROL_PRESCRIBED_BRAID_TARGETS = Object.freeze(CURRENT_TARGETS.filter((entry) => entry.control));
export const DEFAULT_PRESCRIBED_BRAID_SPEC_PATH = PRESCRIBED_ASSEMBLY_TARGETS[0].specPath;
export const DEFAULT_PRESCRIBED_BRAID_RECORD_PATH = PRESCRIBED_ASSEMBLY_TARGETS[0].outPath;

export const validatePrescribedBraidSpec = validatePrescribedAssemblySpec;
export const materializePrescribedBraidSpec = materializePrescribedAssemblySpec;

export function evaluatePrescribedAssemblySite(rawSpec, worldlineId, time) {
  return evaluatePrescribedAssemblyWorldline(rawSpec, worldlineId, time);
}

// Thin positional adapter for component/pair callers. Component/pair
// lookup is relational; path evaluation still uses the individual worldline.
export function evaluatePrescribedBraidSite(rawSpec, componentIndex, pairIndex, endpointIndex, time) {
  const spec = validatePrescribedAssemblySpec(rawSpec);
  const component = spec.relationships.componentBraids?.[componentIndex];
  const pairs = (spec.relationships.neutralPairs ?? []).filter((row) => row.componentBraidId === component?.id);
  const pair = pairs[pairIndex];
  if (!pair || (endpointIndex !== 0 && endpointIndex !== 1)) {
    throw new RangeError("prescribed braid evaluation requires a declared component, pair, and endpoint 0 or 1.");
  }
  const constituent = spec.constituents.find((row) => row.id === pair.members[endpointIndex]);
  return evaluatePrescribedAssemblyWorldline(spec, constituent.worldlineId, time);
}

export function createPrescribedBraidExactSourceRecord(rawSpec, options = {}) {
  const materialized = materializePrescribedAssemblySpec(rawSpec);
  const { spec } = materialized;
  return validateExactPrescribedSourceRecord({
    schema: EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA,
    recordId: spec.specId,
    sourceSchema: spec.schema,
    sourceHash: options.sourceHash ?? null,
    generatingSpec: options.generatingSpec ?? null,
    engineId: PRESCRIBED_GEOMETRY_ENGINE_ID,
    engineVersion: PRESCRIBED_BRAID_EMITTER_ID,
    claimGrade: spec.claimGrade,
    evidenceStatus: spec.evidenceStatus,
    assemblyId: spec.identity.assemblyId,
    modelRevisionSha256: spec.identity.modelRevisionSha256,
    parameterVector: createParameterVector(materialized),
    history: { start: spec.history.start, end: spec.history.end },
    sources: materialized.worldlines.map((row) => ({
      id: row.id,
      charge: row.constituent.polarity,
      trajectory: structuredClone(row.operator),
    })),
  });
}

function createParameterVector(materialized) {
  const { spec } = materialized;
  return {
    identity: structuredClone(spec.identity),
    constituentInventory: structuredClone(spec.constituents),
    worldlines: structuredClone(spec.worldlines),
    relationships: structuredClone(spec.relationships),
    geometry: structuredClone(spec.geometry ?? {}),
    history: structuredClone(spec.history),
    illustrativeCoordinates: structuredClone(spec.illustrativeCoordinates ?? {}),
  };
}

export function generatePrescribedBraidRecord(rawSpec, options = {}) {
  const materialized = materializePrescribedAssemblySpec(rawSpec);
  const { spec } = materialized;
  const scientificIdentity = deriveAssemblyScientificIdentity(spec);
  const { start, end, delayHorizon } = spec.history;
  const segmentCount = Math.ceil((end - start) / spec.interpolation.interval);
  const actualStep = (end - start) / segmentCount;
  const trailDuration = spec.history.periodic ? spec.history.returnPeriod : spec.display.trailDuration;
  const worldlines = materialized.worldlines.map((row) => {
    const segments = [];
    for (let index = 0; index < segmentCount; index += 1) {
      const segmentStart = start + index * actualStep;
      const segmentEnd = index + 1 === segmentCount ? end : start + (index + 1) * actualStep;
      segments.push(createHermiteSegment(row, segmentStart, segmentEnd, spec.interpolation));
    }
    return {
      id: row.id,
      pathKey: row.id,
      polarity: row.constituent.polarity,
      charge: row.constituent.polarity,
      role: row.constituent.role,
      stateFlags: STATE_FLAG_FOR_POLARITY[String(row.constituent.polarity)],
      coverageStart: start,
      coverageEnd: end,
      interpolation: spec.interpolation.rule,
      segments,
    };
  });
  const binaries = (spec.relationships.neutralPairs ?? []).map((pair, index) => {
    const derived = deriveNeutralPairDisplayGeometry(materialized, pair);
    return derived ? { ...derived, binaryIndex: pair.display?.binaryIndex ?? index + 1 } : null;
  }).filter(Boolean);
  const recordCarriers = createNormalizedAssemblyViewRecordCarriers({
    fieldSpeed: spec.constraints.speedGuard.normalizedFieldSpeed,
    vectors: createSourceVectorOverlays(materialized, binaries, start),
  });
  const ansatz = materialized.worldlines.map((row) => ({
    id: `${row.id}-prescribed-path`,
    worldlineId: row.id,
    label: `${spec.identity.displayLabel}, ${row.constituent.id}`,
    points: createAnsatzPoints(row, start, trailDuration, spec.display.ansatzSampleCount),
  }));
  const positionByConstituent = new Map(materialized.worldlines.map((row) => [
    row.constituent.id,
    objectVector(evaluateMaterializedWorldline(row, start).position),
  ]));
  const structuralEdges = (spec.geometry?.structuralEdges ?? []).map((edge) => ({
    id: edge.id,
    kind: edge.kind,
    members: [...edge.members],
    polarity: edge.polarity,
    start: positionByConstituent.get(edge.members[0]),
    end: positionByConstituent.get(edge.members[1]),
  }));
  return canonicalizePrescribedBraidRecord({
    schema: ASSEMBLY_VIEW_RECORD_SCHEMA,
    assemblyId: scientificIdentity.assemblyId,
    modelRevisionSha256: scientificIdentity.modelRevisionSha256,
    sourceId: spec.specId,
    title: spec.identity.displayLabel,
    provenance: {
      engineId: PRESCRIBED_GEOMETRY_ENGINE_ID,
      engineVersion: PRESCRIBED_BRAID_EMITTER_ID,
      runId: spec.specId,
      claimGrade: spec.claimGrade,
      evidenceStatus: spec.evidenceStatus,
      generatingSpec: options.generatingSpec ?? (options.specPath ? path.relative(REPOSITORY_ROOT, options.specPath) : "inline-prescribed-assembly-spec"),
      date: spec.date,
      prescribedGeometry: {
        emitterId: PRESCRIBED_BRAID_EMITTER_ID,
        evaluatorId: PRESCRIBED_ASSEMBLY_EVALUATOR_ID,
        sourceSchema: PRESCRIBED_ASSEMBLY_SPEC_SCHEMA,
        interpolation: spec.interpolation.rule,
        errorMethod: spec.interpolation.errorMethod,
        physicsInvoked: false,
        ...(spec.display.staticGeometryOnly === true ? { staticGeometryOnly: true } : {}),
        responseCenter: objectVector(spec.display.responseCenter ?? [0, 0, 0]),
        sphericalEnvelopeRadius: spec.display.sphericalEnvelopeRadius,
        displayTrailPeriods: spec.history.periodic ? spec.display.trailPeriods : null,
        displayTrailDuration: trailDuration,
        prescribedReturnPeriod: spec.history.periodic ? spec.history.returnPeriod : null,
        description: spec.provenanceDescription,
        coordinates: createParameterVector(materialized),
        numericCanonicalization: {
          id: ASSEMBLY_VIEW_RECORD_NUMERIC_CANONICALIZATION_ID,
          positionQuantum: ASSEMBLY_VIEW_RECORD_POSITION_QUANTUM,
          coefficientRule: "coefficient k is the nearest multiple of positionQuantum / the repeated-product segmentDuration^k",
          errorRule: "sampled residual bounds include coefficient-grid displacement and round upward",
        },
      },
    },
    recordFrame: recordCarriers.frame,
    vectorOverlays: recordCarriers.vectorOverlays,
    window: { start, end, delayHorizon, sampleInterval: actualStep },
    worldlines,
    binaries,
    ...(structuralEdges.length > 0 ? { structuralEdges } : {}),
    ansatz,
    events: [],
  });
}

export function canonicalizePrescribedBraidRecord(record) {
  const canonical = structuredClone(record);
  const positionQuantum = ASSEMBLY_VIEW_RECORD_POSITION_QUANTUM;
  for (const worldline of canonical.worldlines ?? []) {
    for (const segment of worldline.segments ?? []) {
      const duration = segment.endTime - segment.startTime;
      if (!(duration > 0) || !Number.isFinite(duration)) {
        throw new RangeError("record numeric canonicalization requires a positive finite segment duration.");
      }
      segment.coefficients = segment.coefficients.map((axis) => axis.map((value, power) =>
        quantizeFiniteNumber(value, positionQuantum / repeatedIntegerPower(duration, power))));
      segment.positionError = quantizeFiniteNumber(
        segment.positionError + 2 * positionQuantum,
        10 * positionQuantum,
        "up",
      );
      segment.velocityError = quantizeFiniteNumber(
        segment.velocityError + 3 * positionQuantum / duration,
        10 * positionQuantum / duration,
        "up",
      );
    }
  }
  for (const field of ["recordFrame", "vectorOverlays", "binaries", "structuralEdges", "ansatz"]) {
    if (canonical[field] !== undefined) canonical[field] = canonicalizeNumericTree(canonical[field], positionQuantum);
  }
  return canonical;
}

function repeatedIntegerPower(value, power) {
  if (!Number.isInteger(power) || power < 0) throw new RangeError("record coefficient power must be a nonnegative integer.");
  let result = 1;
  for (let index = 0; index < power; index += 1) result *= value;
  return result;
}

function canonicalizeNumericTree(value, quantum) {
  if (typeof value === "number") return Number.isInteger(value) ? value : quantizeFiniteNumber(value, quantum);
  if (Array.isArray(value)) return value.map((item) => canonicalizeNumericTree(item, quantum));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, canonicalizeNumericTree(item, quantum)]));
  }
  return value;
}

function quantizeFiniteNumber(value, quantum, mode = "nearest") {
  if (!Number.isFinite(value) || !Number.isFinite(quantum) || !(quantum > 0)) {
    throw new TypeError("record numeric canonicalization requires finite values and a positive finite quantum.");
  }
  const scaled = value / quantum;
  const integer = mode === "up" ? Math.ceil(scaled) : Math.round(scaled);
  if (!Number.isSafeInteger(integer)) {
    throw new RangeError("record numeric canonicalization exceeded the safe integer grid.");
  }
  const result = integer * quantum;
  return Object.is(result, -0) ? 0 : result;
}

function createSourceVectorOverlays(materialized, binaries, epochTime) {
  const worldlineById = new Map(materialized.worldlines.map((row) => [row.id, row]));
  return binaries.flatMap((binary) => {
    const members = binary.members.map((id) => worldlineById.get(id));
    if (members.some((row) => !row)) return [];
    const positive = members.find((row) => row.constituent.polarity === 1);
    const negative = members.find((row) => row.constituent.polarity === -1);
    if (!positive || !negative) return [];
    const positivePosition = evaluateMaterializedWorldline(positive, epochTime).position;
    const negativePosition = evaluateMaterializedWorldline(negative, epochTime).position;
    const normal = binary.planeOrientation?.normal;
    if (!normal) return [];
    return [
      {
        id: `${binary.id}:kinematic-spin`,
        kind: "kinematic-spin",
        worldlineIds: [...binary.members],
        vector: scaleObjectVector(normal, binary.angularFrequency),
        source: "prescribed neutral-pair plane normal multiplied by declared angular velocity",
      },
      {
        id: `${binary.id}:polarity-dipole`,
        kind: "polarity-dipole",
        worldlineIds: [negative.id, positive.id],
        vector: objectVector(positivePosition.map((value, axis) => value - negativePosition[axis])),
        source: "prescribed epoch position from negative-polarity member to positive-polarity member",
      },
    ];
  });
}

function scaleObjectVector(vector, scalar) {
  return {
    x: Number(vector.x) * scalar,
    y: Number(vector.y) * scalar,
    z: Number(vector.z) * scalar,
  };
}

function createHermiteSegment(row, startTime, endTime, interpolation) {
  const start = evaluateMaterializedWorldline(row, startTime);
  const end = evaluateMaterializedWorldline(row, endTime);
  const duration = endTime - startTime;
  const coefficients = [0, 1, 2].map((axis) => {
    const x0 = start.position[axis];
    const x1 = end.position[axis];
    const v0 = start.velocity[axis];
    const v1 = end.velocity[axis];
    const delta = x1 - x0;
    return [x0, v0, (3 * delta) / duration ** 2 - (2 * v0 + v1) / duration, (-2 * delta) / duration ** 3 + (v0 + v1) / duration ** 2];
  });
  let positionError = 0;
  let velocityError = 0;
  for (let sample = 1; sample < 16; sample += 1) {
    const dt = duration * sample / 16;
    const exact = evaluateMaterializedWorldline(row, startTime + dt);
    const approximatePosition = coefficients.map((c) => c[0] + c[1] * dt + c[2] * dt ** 2 + c[3] * dt ** 3);
    const approximateVelocity = coefficients.map((c) => c[1] + 2 * c[2] * dt + 3 * c[3] * dt ** 2);
    positionError = Math.max(positionError, distance(exact.position, approximatePosition));
    velocityError = Math.max(velocityError, distance(exact.velocity, approximateVelocity));
  }
  const roundoff = interpolation.roundoffMultiplier * Number.EPSILON;
  return { startTime, endTime, coefficients, positionError: positionError * 1.1 + roundoff, velocityError: velocityError * 1.1 + roundoff };
}

function createAnsatzPoints(row, start, duration, count) {
  return Array.from({ length: count + 1 }, (_, index) => objectVector(evaluateMaterializedWorldline(row, start + duration * index / count).position));
}

export function serializePrescribedBraidRecord(record) {
  return `${JSON.stringify(record, null, 2)}\n`;
}

function parseArgs(args) {
  const parsed = { specPath: DEFAULT_PRESCRIBED_BRAID_SPEC_PATH, outPath: DEFAULT_PRESCRIBED_BRAID_RECORD_PATH, mode: null, all: false };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--spec" || arg === "--out") {
      const value = args[index + 1];
      if (!value) throw new TypeError(`${arg} requires a path.`);
      index += 1;
      if (arg === "--spec") parsed.specPath = path.resolve(value);
      else parsed.outPath = path.resolve(value);
    } else if (arg === "--all") parsed.all = true;
    else if (arg === "--write" || arg === "--check") {
      if (parsed.mode) throw new TypeError("choose exactly one of --write or --check.");
      parsed.mode = arg.slice(2);
    } else throw new TypeError(`unknown prescribed assembly generator argument: ${arg}`);
  }
  if (!parsed.mode) throw new TypeError("prescribed assembly generator requires --write or --check.");
  if (parsed.all && args.some((arg) => arg === "--spec" || arg === "--out")) throw new TypeError("prescribed assembly generator --all cannot be combined with --spec or --out.");
  return parsed;
}

export function runPrescribedBraidCli(args = process.argv.slice(2)) {
  const parsed = parseArgs(args);
  const targets = parsed.all ? PRESCRIBED_ASSEMBLY_TARGETS : [{ specPath: parsed.specPath, outPath: parsed.outPath }];
  targets.forEach((entry) => processTarget(entry, parsed.mode));
}

function processTarget({ specPath, outPath }, mode) {
  const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
  const record = generatePrescribedBraidRecord(spec, { specPath, generatingSpec: path.relative(REPOSITORY_ROOT, specPath) });
  const serialized = serializePrescribedBraidRecord(record);
  if (mode === "write") {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    if (!fs.existsSync(outPath) || fs.readFileSync(outPath, "utf8") !== serialized) {
      const temporaryPath = `${outPath}.${process.pid}.tmp`;
      fs.writeFileSync(temporaryPath, serialized);
      fs.renameSync(temporaryPath, outPath);
    }
    process.stdout.write(`prescribed assembly record written: ${outPath}\n`);
    return;
  }
  if (!fs.existsSync(outPath)) throw new Error(`prescribed assembly record drift: missing generated record ${outPath}`);
  if (fs.readFileSync(outPath, "utf8") !== serialized) throw new Error("prescribed assembly record drift: run node scripts/eom/generate-prescribed-braid-record.mjs --all --write");
  process.stdout.write(`prescribed assembly record check passed: ${outPath}\n`);
}

function distance(left, right) {
  return Math.hypot(...left.map((value, index) => value - right[index]));
}

function objectVector(vector) {
  return { x: vector[0], y: vector[1], z: vector[2] };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) runPrescribedBraidCli();
