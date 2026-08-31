#!/usr/bin/env node

// Declarative prescribed-assembly record generator. Candidate geometry is
// owned by prescribed-assembly-spec.v2 JSON. This file invokes no EOM solver,
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

export const PRESCRIBED_BRAID_SPEC_SCHEMA = PRESCRIBED_ASSEMBLY_SPEC_SCHEMA;
export const PRESCRIBED_ASSEMBLY_SPEC_SCHEMA_ID = PRESCRIBED_ASSEMBLY_SPEC_SCHEMA;
export const PRESCRIBED_BRAID_EMITTER_ID = "prescribed-assembly-record-emitter.v2";
export const PRESCRIBED_GEOMETRY_ENGINE_ID = "prescribed-geometry";
export const ASSEMBLY_VIEW_RECORD_SCHEMA = "assembly-view-record.v0";

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

const MIGRATED_TARGETS = [
  target("family-a-a1-general.v2.json", "family-a-a1-general.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-a-a1-1-equal-frequency.v2.json", "family-a-a1-1-equal-frequency.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-a-a1-2-equal-frequency-equal-radius.v2.json", "family-a-a1-2-equal-frequency-equal-radius.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-a-a1-3-4-2-1-frequency.v2.json", "family-a-a1-3-4-2-1-frequency.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-a-a1-4-3-2-1-frequency.v2.json", "family-a-a1-4-3-2-1-frequency.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-a-a2-fully-symmetric.v2.json", "family-a-a2-fully-symmetric.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-a-a3-general.v2.json", "family-a-a3-general.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-a-a3-1-equal-frequency.v2.json", "family-a-a3-1-equal-frequency.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-a-a3-2-equal-frequency-equal-radius.v2.json", "family-a-a3-2-equal-frequency-equal-radius.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-a-a3-3-4-2-1-frequency.v2.json", "family-a-a3-3-4-2-1-frequency.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-a-a3-4-3-2-1-frequency.v2.json", "family-a-a3-4-3-2-1-frequency.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("illustrative-spindle-chart-hypothesis.v2.json", "illustrative-spindle-chart-hypothesis.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("illustrative-extreme-cap-tilt-spindle-variant.v2.json", "illustrative-extreme-cap-tilt-spindle-variant.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("illustrative-planar-tri-binary-spindle-boundary.v2.json", "illustrative-planar-tri-binary-spindle-boundary.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("illustrative-full-cap-axial-spindle-boundary.v2.json", "illustrative-full-cap-axial-spindle-boundary.assembly-view-record.v0.json", { control: true }),
  target("family-c-c1-co-rotating-general.v2.json", "family-c-c1-co-rotating-general.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-c-c2-counter-rotating-general.v2.json", "family-c-c2-counter-rotating-general.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-c-c1-co-rotating-b1-pair.v2.json", "family-c-c1-co-rotating-b1-pair.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-c-c2-counter-rotating-b1-pair.v2.json", "family-c-c2-counter-rotating-b1-pair.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-c-c1-1-co-rotating-b1-3-pair.v2.json", "family-c-c1-1-co-rotating-b1-3-pair.assembly-view-record.v0.json", { activeAnalytical: true }),
  target("family-c-c2-1-counter-rotating-b1-3-pair.v2.json", "family-c-c2-1-counter-rotating-b1-3-pair.assembly-view-record.v0.json", { activeAnalytical: true }),
];

const NEW_TARGETS = [
  target("shared-circle-01-alternating.v2.json", "shared-circle-01-alternating.assembly-view-record.v0.json"),
  target("shared-circle-02-alternating.v2.json", "shared-circle-02-alternating.assembly-view-record.v0.json"),
  target("shared-circle-03-alternating.v2.json", "shared-circle-03-alternating.assembly-view-record.v0.json"),
  target("shared-circle-04-alternating.v2.json", "shared-circle-04-alternating.assembly-view-record.v0.json"),
  target("shared-circle-05-alternating.v2.json", "shared-circle-05-alternating.assembly-view-record.v0.json"),
  target("shared-circle-06-alternating.v2.json", "shared-circle-06-alternating.assembly-view-record.v0.json"),
  target("shared-circle-07-alternating.v2.json", "shared-circle-07-alternating.assembly-view-record.v0.json"),
  target("shared-circle-08-alternating.v2.json", "shared-circle-08-alternating.assembly-view-record.v0.json"),
  target("shared-circle-09-alternating.v2.json", "shared-circle-09-alternating.assembly-view-record.v0.json"),
  target("shared-circle-10-alternating.v2.json", "shared-circle-10-alternating.assembly-view-record.v0.json"),
  target("shared-circle-11-alternating.v2.json", "shared-circle-11-alternating.assembly-view-record.v0.json"),
  target("shared-circle-12-alternating.v2.json", "shared-circle-12-alternating.assembly-view-record.v0.json"),
  target("shared-sphere-c5-two-rings.v2.json", "shared-sphere-c5-two-rings.assembly-view-record.v0.json"),
  target("shared-sphere-c6-two-rings.v2.json", "shared-sphere-c6-two-rings.assembly-view-record.v0.json"),
  target("platonic-vertices-04-tetrahedron.v2.json", "platonic-vertices-04-tetrahedron.assembly-view-record.v0.json"),
  target("platonic-vertices-06-octahedron.v2.json", "platonic-vertices-06-octahedron.assembly-view-record.v0.json"),
  target("platonic-vertices-08-cube.v2.json", "platonic-vertices-08-cube.assembly-view-record.v0.json"),
  target("platonic-vertices-12-icosahedron.v2.json", "platonic-vertices-12-icosahedron.assembly-view-record.v0.json"),
  target("platonic-vertices-20-dodecahedron.v2.json", "platonic-vertices-20-dodecahedron.assembly-view-record.v0.json"),
  target("sd3-centered-five-coordinate.v2.json", "sd3-centered-five-coordinate.assembly-view-record.v0.json"),
  target("f5-phase-varying-campaign.v2.json", "f5-phase-varying-campaign.assembly-view-record.v0.json"),
  target("f6c-polarity-resolved-harmonic.v2.json", "f6c-polarity-resolved-harmonic.assembly-view-record.v0.json"),
  target("f6b-scoped-negative-circular.v2.json", "f6b-scoped-negative-circular.assembly-view-record.v0.json", { control: true }),
];

export const PRESCRIBED_ASSEMBLY_TARGETS = Object.freeze([...MIGRATED_TARGETS, ...NEW_TARGETS]);
// Established analytical callers retain these names, but all delegate to the
// single v2 implementation; no v1 compiler remains.
export const PRESCRIBED_BRAID_TARGETS = PRESCRIBED_ASSEMBLY_TARGETS;
export const ACTIVE_PRESCRIBED_BRAID_TARGETS = Object.freeze(MIGRATED_TARGETS.filter((entry) => entry.activeAnalytical));
export const DEPRECATED_PRESCRIBED_BRAID_TARGETS = Object.freeze(PRESCRIBED_ASSEMBLY_TARGETS.filter((entry) => entry.control));
export const DEFAULT_PRESCRIBED_BRAID_SPEC_PATH = PRESCRIBED_ASSEMBLY_TARGETS[0].specPath;
export const DEFAULT_PRESCRIBED_BRAID_RECORD_PATH = PRESCRIBED_ASSEMBLY_TARGETS[0].outPath;

export const validatePrescribedBraidSpec = validatePrescribedAssemblySpec;
export const materializePrescribedBraidSpec = materializePrescribedAssemblySpec;

export function evaluatePrescribedAssemblySite(rawSpec, worldlineId, time) {
  return evaluatePrescribedAssemblyWorldline(rawSpec, worldlineId, time);
}

// Thin positional adapter for established spindle callers. Component/pair
// lookup is relational; path evaluation still uses the individual worldline.
export function evaluatePrescribedBraidSite(rawSpec, componentIndex, pairIndex, endpointIndex, time) {
  const spec = validatePrescribedAssemblySpec(rawSpec);
  const component = spec.relationships.componentBraids?.[componentIndex];
  const pairs = (spec.relationships.neutralPairs ?? []).filter((row) => row.componentBraidId === component?.id);
  const pair = pairs[pairIndex];
  if (!pair || (endpointIndex !== 0 && endpointIndex !== 1)) {
    throw new RangeError("prescribed braid compatibility evaluation requires a declared component, pair, and endpoint 0 or 1.");
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
    taxonomy: structuredClone(spec.identity.taxonomy ?? {
      familyId: spec.identity.candidateId,
      familyLabel: spec.identity.candidateId,
      memberId: spec.identity.candidateId,
      memberLabel: spec.identity.displayLabel,
      displayLabel: spec.identity.displayLabel,
      canonSource: spec.identity.geometryOwner,
    }),
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
    compatibility: structuredClone(spec.compatibility ?? { retainedIdentifiers: [] }),
  };
}

export function generatePrescribedBraidRecord(rawSpec, options = {}) {
  const materialized = materializePrescribedAssemblySpec(rawSpec);
  const { spec } = materialized;
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
  const ansatz = materialized.worldlines.map((row) => ({
    id: `${row.id}-prescribed-path`,
    worldlineId: row.id,
    label: `${spec.identity.displayLabel}, ${row.constituent.id}`,
    points: createAnsatzPoints(row, start, trailDuration, spec.display.ansatzSampleCount),
  }));
  return {
    schema: ASSEMBLY_VIEW_RECORD_SCHEMA,
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
        responseCenter: objectVector(spec.display.responseCenter ?? [0, 0, 0]),
        sphericalEnvelopeRadius: spec.display.sphericalEnvelopeRadius,
        displayTrailPeriods: spec.history.periodic ? spec.display.trailPeriods : null,
        displayTrailDuration: trailDuration,
        prescribedReturnPeriod: spec.history.periodic ? spec.history.returnPeriod : null,
        description: spec.provenanceDescription,
        taxonomy: structuredClone(spec.identity.taxonomy ?? null),
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
    fs.writeFileSync(outPath, serialized);
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
