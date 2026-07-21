#!/usr/bin/env node

// Source-defined prescribed-geometry emitter for spindle-braid chart records.
//
// This file evaluates only the exact chart equations declared in the source
// specification. It does not calculate causal roots, accelerations, residuals,
// stability, evolution, or any other physics. The emitted Hermite segments are
// display paths and remain chart-hypothesis/display-only provenance.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SPINDLE_CHART_SPEC_SCHEMA = "spindle-braid-chart-spec.v0";
export const SPINDLE_CHART_EMITTER_ID = "prescribed-spindle-chart-record-emitter.v0";
export const PRESCRIBED_GEOMETRY_ENGINE_ID = "prescribed-geometry";
export const ASSEMBLY_VIEW_RECORD_SCHEMA = "assembly-view-record.v0";

const STATE_FLAG_FOR_POLARITY = Object.freeze({ "1": 1, "-1": 2 });
const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
export const DEFAULT_SPINDLE_SPEC_PATH = path.resolve(
  SCRIPT_DIRECTORY,
  "../../reference/priorities/braid-program/configurations/illustrative-spindle-chart-hypothesis.v0.json",
);
export const DEFAULT_SPINDLE_RECORD_PATH = path.resolve(
  SCRIPT_DIRECTORY,
  "../../content/assets/borg/records/illustrative-spindle-chart-hypothesis.assembly-view-record.v0.json",
);

export function validateSpindleChartSpec(spec) {
  if (!spec || typeof spec !== "object" || spec.schema !== SPINDLE_CHART_SPEC_SCHEMA) {
    throw new TypeError(`spindle chart specification requires schema ${SPINDLE_CHART_SPEC_SCHEMA}.`);
  }
  for (const field of ["specId", "label", "date"]) {
    requireConcreteString(spec[field], field);
  }
  if (spec.claimGrade !== "chart-hypothesis" || spec.evidenceStatus !== "display-only") {
    throw new TypeError(
      "spindle chart specification must remain claimGrade=chart-hypothesis and evidenceStatus=display-only.",
    );
  }
  const tolerance = requirePositiveFinite(
    spec.frame?.orthonormalTolerance,
    "frame.orthonormalTolerance",
  );
  const e1 = vector3(spec.frame?.e1, "frame.e1");
  const e2 = vector3(spec.frame?.e2, "frame.e2");
  const axis = vector3(spec.frame?.axis, "frame.axis");
  requireNear(norm(e1), 1, tolerance, "frame.e1 unit length");
  requireNear(norm(e2), 1, tolerance, "frame.e2 unit length");
  requireNear(norm(axis), 1, tolerance, "frame.axis unit length");
  requireNear(dot(e1, e2), 0, tolerance, "frame.e1/frame.e2 orthogonality");
  requireNear(dot(e1, axis), 0, tolerance, "frame.e1/frame.axis orthogonality");
  requireNear(dot(e2, axis), 0, tolerance, "frame.e2/frame.axis orthogonality");
  const handednessResidual = subtract(cross(e1, e2), axis);
  if (norm(handednessResidual) > tolerance) {
    throw new RangeError(
      `spindle chart frame must be right-handed within ${tolerance}; residual=${norm(handednessResidual)}.`,
    );
  }
  vector3(spec.responseCenter, "responseCenter");
  requireFinite(spec.axialDriftSpeed, "axialDriftSpeed");
  const omega = requireFinite(spec.angularFrequency, "angularFrequency");
  if (omega === 0) {
    throw new RangeError("spindle chart angularFrequency must be nonzero.");
  }
  if (!Number.isSafeInteger(spec.displayTrailPeriods) || spec.displayTrailPeriods < 1) {
    throw new TypeError("spindle chart displayTrailPeriods must be a positive safe integer.");
  }
  if (!Array.isArray(spec.layers) || spec.layers.length !== 3) {
    throw new TypeError("spindle chart specification requires exactly three labeled layers.");
  }
  if (!Array.isArray(spec.sourceOrder) || spec.sourceOrder.length !== spec.layers.length) {
    throw new TypeError("spindle chart specification sourceOrder must name all three binaries.");
  }
  const binaryIds = new Set();
  const worldlineIds = new Set();
  spec.layers.forEach((layer, index) => {
    const label = `layers[${index}]`;
    requireConcreteString(layer?.binaryId, `${label}.binaryId`);
    if (binaryIds.has(layer.binaryId)) {
      throw new TypeError(`spindle chart binary id ${layer.binaryId} is duplicated.`);
    }
    binaryIds.add(layer.binaryId);
    if (!Array.isArray(layer.worldlineIds) || layer.worldlineIds.length !== 2) {
      throw new TypeError(`${label}.worldlineIds must contain two endpoint ids.`);
    }
    layer.worldlineIds.forEach((id, endpointIndex) => {
      requireConcreteString(id, `${label}.worldlineIds[${endpointIndex}]`);
      if (worldlineIds.has(id)) {
        throw new TypeError(`spindle chart worldline id ${id} is duplicated.`);
      }
      worldlineIds.add(id);
    });
    requirePositiveFinite(layer.radius, `${label}.radius`);
    const alpha = requireFinite(layer.capAngle, `${label}.capAngle`);
    if (alpha < 0 || alpha > Math.PI / 2) {
      throw new RangeError(`${label}.capAngle must satisfy 0 <= alpha <= pi/2.`);
    }
    requireFinite(layer.phase, `${label}.phase`);
    if (layer.polarityAssignment !== -1 && layer.polarityAssignment !== 1) {
      throw new TypeError(`${label}.polarityAssignment must be -1 or +1.`);
    }
  });
  if (spec.sourceOrder.some((id, index) => id !== spec.layers[index].binaryId)) {
    throw new TypeError("spindle chart sourceOrder must preserve the declared layer order.");
  }
  const start = requireFinite(spec.recordInterval?.start, "recordInterval.start");
  const end = requireFinite(spec.recordInterval?.end, "recordInterval.end");
  if (!(end > start)) {
    throw new RangeError("spindle chart record interval requires end > start.");
  }
  const delayHorizon = requireNonnegativeFinite(
    spec.recordInterval?.delayHorizon,
    "recordInterval.delayHorizon",
  );
  if (delayHorizon > end - start) {
    throw new RangeError("spindle chart delayHorizon must not exceed the record duration.");
  }
  if (spec.interpolation?.rule !== "piecewise-cubic-hermite/v0") {
    throw new TypeError("spindle chart interpolation rule must be piecewise-cubic-hermite/v0.");
  }
  if (spec.interpolation?.errorMethod !== "fourth-derivative-hermite-envelope/v1") {
    throw new TypeError(
      "spindle chart interpolation errorMethod must be fourth-derivative-hermite-envelope/v1.",
    );
  }
  requirePositiveFinite(spec.interpolation?.interval, "interpolation.interval");
  requirePositiveFinite(spec.interpolation?.positionDivisor, "interpolation.positionDivisor");
  requirePositiveFinite(spec.interpolation?.velocityDivisor, "interpolation.velocityDivisor");
  requirePositiveFinite(spec.interpolation?.roundoffMultiplier, "interpolation.roundoffMultiplier");
  const ansatzSampleCount = Number(spec.ansatzSampleCount);
  if (!Number.isSafeInteger(ansatzSampleCount) || ansatzSampleCount < 8) {
    throw new TypeError("spindle chart ansatzSampleCount must be a safe integer >= 8.");
  }
  const envelopeRadius = requirePositiveFinite(
    spec.sphericalEnvelopeRadius,
    "sphericalEnvelopeRadius",
  );
  const maximumChartRadius = Math.max(...spec.layers.map((layer) => layer.radius));
  const centerRadius = norm(spec.responseCenter);
  const maximumDrift = Math.max(Math.abs(start), Math.abs(end)) * Math.abs(spec.axialDriftSpeed);
  if (centerRadius + maximumDrift + maximumChartRadius > envelopeRadius + tolerance) {
    throw new RangeError(
      "spindle chart exceeds the declared spherical simulation envelope.",
    );
  }
  return spec;
}

export function evaluateSpindleSite(spec, layerIndex, endpointIndex, time) {
  validateSpindleChartSpec(spec);
  const layer = spec.layers[layerIndex];
  if (!layer || (endpointIndex !== 0 && endpointIndex !== 1)) {
    throw new RangeError("spindle chart evaluation requires a declared layer and endpoint 0 or 1.");
  }
  const T = requireFinite(time, "evaluation time");
  const sign = endpointIndex === 0 ? 1 : -1;
  const theta = spec.angularFrequency * T + layer.phase;
  const transverseRadius = layer.radius * Math.cos(layer.capAngle);
  const axialHeight = layer.radius * Math.sin(layer.capAngle);
  const e1 = spec.frame.e1;
  const e2 = spec.frame.e2;
  const axis = spec.frame.axis;
  const center = spec.responseCenter;
  const drift = spec.axialDriftSpeed;
  const rotating = add(scale(e1, Math.cos(theta)), scale(e2, Math.sin(theta)));
  const tangent = add(scale(e1, -Math.sin(theta)), scale(e2, Math.cos(theta)));
  const position = add(
    center,
    scale(axis, drift * T + sign * axialHeight),
    scale(rotating, sign * transverseRadius),
  );
  const velocity = add(
    scale(axis, drift),
    scale(tangent, sign * spec.angularFrequency * transverseRadius),
  );
  return Object.freeze({
    position: Object.freeze(position),
    velocity: Object.freeze(velocity),
    responseCenter: Object.freeze(add(center, scale(axis, drift * T))),
    transverseRadius,
    axialHeight: sign * axialHeight,
    carrierSpeed: Math.abs(spec.angularFrequency) * transverseRadius,
  });
}

export function generateSpindleChartRecord(rawSpec, options = {}) {
  const spec = validateSpindleChartSpec(rawSpec);
  const { start, end, delayHorizon } = spec.recordInterval;
  const requestedStep = spec.interpolation.interval;
  const segmentCount = Math.ceil((end - start) / requestedStep);
  const actualStep = (end - start) / segmentCount;
  const worldlines = [];
  const binaries = [];
  const ansatz = [];

  spec.layers.forEach((layer, layerIndex) => {
    const separation = 2 * layer.radius * Math.sin(layer.capAngle);
    const transverseRadius = layer.radius * Math.cos(layer.capAngle);
    const carrierSpeed = Math.abs(spec.angularFrequency) * transverseRadius;
    const ordinaryFrequency = Math.abs(spec.angularFrequency) / (2 * Math.PI);
    layer.worldlineIds.forEach((worldlineId, endpointIndex) => {
      const polarity = endpointIndex === 0
        ? layer.polarityAssignment
        : -layer.polarityAssignment;
      const segments = [];
      for (let index = 0; index < segmentCount; index += 1) {
        const segmentStart = start + index * actualStep;
        const segmentEnd = index + 1 === segmentCount
          ? end
          : start + (index + 1) * actualStep;
        segments.push(createHermiteSegment(
          spec,
          layerIndex,
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
        id: `${worldlineId}-static-chart-curve`,
        worldlineId,
        label: `${worldlineId} prescribed circular chart path`,
        points: createAnsatzPoints(spec, layerIndex, endpointIndex),
      });
    });
    binaries.push({
      id: layer.binaryId,
      members: [...layer.worldlineIds],
      frequency: ordinaryFrequency,
      angularFrequency: spec.angularFrequency,
      phase: layer.phase,
      planeOrientation: {
        normal: objectVector(spec.frame.axis),
        transverseBasis: [objectVector(spec.frame.e1), objectVector(spec.frame.e2)],
      },
      axisPoint: objectVector(spec.responseCenter),
      axisDisplayHalfLength: spec.sphericalEnvelopeRadius * 0.9,
      separation,
      planarOffset: separation,
      layerRadius: layer.radius,
      capAngle: layer.capAngle,
      transverseRadius,
      carrierSpeed,
      polarityAssignment: layer.polarityAssignment,
    });
  });

  return {
    schema: ASSEMBLY_VIEW_RECORD_SCHEMA,
    sourceId: spec.specId,
    provenance: {
      engineId: PRESCRIBED_GEOMETRY_ENGINE_ID,
      engineVersion: SPINDLE_CHART_EMITTER_ID,
      runId: spec.specId,
      claimGrade: "chart-hypothesis",
      evidenceStatus: "display-only",
      generatingSpec: options.generatingSpec ??
        "reference/priorities/braid-program/configurations/illustrative-spindle-chart-hypothesis.v0.json",
      date: spec.date,
      prescribedGeometry: {
        emitterId: SPINDLE_CHART_EMITTER_ID,
        sourceSchema: SPINDLE_CHART_SPEC_SCHEMA,
        interpolation: spec.interpolation.rule,
        errorMethod: spec.interpolation.errorMethod,
        physicsInvoked: false,
        responseCenter: objectVector(spec.responseCenter),
        sphericalEnvelopeRadius: spec.sphericalEnvelopeRadius,
        displayTrailPeriods: spec.displayTrailPeriods,
      },
    },
    window: {
      start,
      end,
      delayHorizon,
      sampleInterval: actualStep,
    },
    worldlines,
    binaries,
    ansatz,
    events: [],
  };
}

function createHermiteSegment(spec, layerIndex, endpointIndex, startTime, endTime) {
  const start = evaluateSpindleSite(spec, layerIndex, endpointIndex, startTime);
  const end = evaluateSpindleSite(spec, layerIndex, endpointIndex, endTime);
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
  const layer = spec.layers[layerIndex];
  const transverseRadius = layer.radius * Math.cos(layer.capAngle);
  const fourthDerivative = transverseRadius * Math.abs(spec.angularFrequency) ** 4;
  const coordinateScale = Math.max(1, norm(spec.responseCenter), layer.radius);
  const speedScale = Math.max(1, start.carrierSpeed, Math.abs(spec.axialDriftSpeed));
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

function createAnsatzPoints(spec, layerIndex, endpointIndex) {
  const points = [];
  const period = 2 * Math.PI / Math.abs(spec.angularFrequency);
  const start = spec.recordInterval.start;
  for (let index = 0; index <= spec.ansatzSampleCount; index += 1) {
    const time = start + period * index / spec.ansatzSampleCount;
    const state = evaluateSpindleSite(spec, layerIndex, endpointIndex, time);
    points.push(objectVector(state.position));
  }
  return points;
}

function parseArgs(args) {
  const parsed = {
    specPath: DEFAULT_SPINDLE_SPEC_PATH,
    outPath: DEFAULT_SPINDLE_RECORD_PATH,
    mode: null,
  };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--spec" || arg === "--out") {
      const value = args[index + 1];
      if (!value) throw new TypeError(`${arg} requires a path.`);
      index += 1;
      if (arg === "--spec") parsed.specPath = path.resolve(value);
      if (arg === "--out") parsed.outPath = path.resolve(value);
    } else if (arg === "--write" || arg === "--check") {
      if (parsed.mode) throw new TypeError("choose exactly one of --write or --check.");
      parsed.mode = arg.slice(2);
    } else {
      throw new TypeError(`unknown spindle chart generator argument: ${arg}`);
    }
  }
  if (!parsed.mode) {
    throw new TypeError("spindle chart generator requires --write or --check.");
  }
  return parsed;
}

export function serializeSpindleChartRecord(record) {
  return `${JSON.stringify(record, null, 2)}\n`;
}

function runCli() {
  const args = parseArgs(process.argv.slice(2));
  const spec = JSON.parse(fs.readFileSync(args.specPath, "utf8"));
  const record = generateSpindleChartRecord(spec, {
    generatingSpec: path.relative(process.cwd(), args.specPath),
  });
  const serialized = serializeSpindleChartRecord(record);
  if (args.mode === "write") {
    fs.mkdirSync(path.dirname(args.outPath), { recursive: true });
    fs.writeFileSync(args.outPath, serialized);
    process.stdout.write(`spindle chart record written: ${args.outPath}\n`);
    return;
  }
  if (!fs.existsSync(args.outPath)) {
    throw new Error(`spindle chart record drift: missing generated record ${args.outPath}`);
  }
  const current = fs.readFileSync(args.outPath, "utf8");
  if (current !== serialized) {
    throw new Error(
      `spindle chart record drift: run node scripts/eom/generate-spindle-chart-record.mjs --write`,
    );
  }
  process.stdout.write(`spindle chart record check passed: ${args.outPath}\n`);
}

function requireConcreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0 || value === "unspecified") {
    throw new TypeError(`spindle chart ${label} must be concrete.`);
  }
  return value;
}

function requireFinite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new TypeError(`spindle chart ${label} must be finite.`);
  }
  return number;
}

function requirePositiveFinite(value, label) {
  const number = requireFinite(value, label);
  if (!(number > 0)) throw new RangeError(`spindle chart ${label} must be positive.`);
  return number;
}

function requireNonnegativeFinite(value, label) {
  const number = requireFinite(value, label);
  if (number < 0) throw new RangeError(`spindle chart ${label} must be nonnegative.`);
  return number;
}

function requireNear(actual, expected, tolerance, label) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new RangeError(
      `spindle chart ${label} must be within ${tolerance}; received ${actual}.`,
    );
  }
}

function vector3(value, label) {
  if (!Array.isArray(value) || value.length !== 3) {
    throw new TypeError(`spindle chart ${label} must be a three-vector.`);
  }
  return value.map((entry, index) => requireFinite(entry, `${label}[${index}]`));
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

function objectVector(vector) {
  return { x: vector[0], y: vector[1], z: vector[2] };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runCli();
}
