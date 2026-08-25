import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  analyzeSiteLocalSnapshot,
  buildNeighborReclassificationLedger,
  summarizeOrientationDistribution,
} from "./adaptive-cubic-medium-kinematics.mjs";

const EPS = 1e-12;
const CENTER_ESTIMATOR_ID = "period-antipode-midpoint/v1";
const ACCEPTED_BOUNDARIES = new Set(["periodic_exact", "controlled_exterior_tail"]);

function finiteNumber(value, name) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) throw new TypeError(`${name} must be finite`);
  return parsed;
}

function positiveNumber(value, name) {
  const parsed = finiteNumber(value, name);
  if (!(parsed > 0)) throw new RangeError(`${name} must be positive`);
  return parsed;
}

function nonnegativeNumber(value, name) {
  const parsed = finiteNumber(value, name);
  if (!(parsed >= 0)) throw new RangeError(`${name} must be nonnegative`);
  return parsed;
}

function add(left, right) {
  return left.map((entry, index) => entry + right[index]);
}

function subtract(left, right) {
  return left.map((entry, index) => entry - right[index]);
}

function scale(value, factor) {
  return value.map((entry) => entry * factor);
}

function norm(value) {
  return Math.hypot(...value);
}

function normalize(value, name) {
  const magnitude = norm(value);
  if (!(magnitude > EPS)) throw new RangeError(`${name} is degenerate`);
  return scale(value, 1 / magnitude);
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readJsonLines(filePath) {
  if (!fs.existsSync(filePath)) return [];
  return fs.readFileSync(filePath, "utf8").split("\n")
    .filter(Boolean).map((line) => JSON.parse(line));
}

function siteCoordinate(pathId) {
  const match = /^g(?:(\d)(\d)(\d)|(\d+)_(\d+)_(\d+))[+-]$/u.exec(pathId);
  if (!match) throw new TypeError(`invalid cubic site path id: ${pathId}`);
  return (match[1] === undefined ? match.slice(4, 7) : match.slice(1, 4))
    .map(Number);
}

function checkerboardPhase(worldlines) {
  const phases = new Set(worldlines.map((worldline) => {
    const parity = siteCoordinate(worldline.id)
      .reduce((sum, value) => sum + value, 0) % 2 === 0 ? 1 : -1;
    return worldline.polarity * parity;
  }));
  if (phases.size !== 1 || ![1, -1].includes([...phases][0])) {
    throw new Error("worldline polarities do not share one checkerboard phase");
  }
  return [...phases][0];
}

function prepareSegment(segment, worldlineId, index) {
  const start = finiteNumber(segment.startTime, `${worldlineId}.segments[${index}].startTime`);
  const end = finiteNumber(segment.endTime, `${worldlineId}.segments[${index}].endTime`);
  if (!(end > start)) throw new RangeError(`${worldlineId} has a nonpositive segment`);
  if (!Array.isArray(segment.coefficients) || segment.coefficients.length !== 3) {
    throw new TypeError(`${worldlineId} segment coefficients must have three axes`);
  }
  const coefficients = segment.coefficients.map((axis, axisIndex) => {
    if (!Array.isArray(axis) || axis.length !== 4) {
      throw new TypeError(`${worldlineId} axis ${axisIndex} must have four coefficients`);
    }
    return axis.map((entry, coefficientIndex) => finiteNumber(
      entry, `${worldlineId}.coefficients[${axisIndex}][${coefficientIndex}]`));
  });
  const positionErrors = (segment.positionErrors ?? [
    segment.positionError, segment.positionError, segment.positionError,
  ]).map((entry, axis) => nonnegativeNumber(entry,
    `${worldlineId}.positionErrors[${axis}]`));
  const velocityErrors = (segment.velocityErrors ?? [
    segment.velocityError, segment.velocityError, segment.velocityError,
  ]).map((entry, axis) => nonnegativeNumber(entry,
    `${worldlineId}.velocityErrors[${axis}]`));
  if (positionErrors.length !== 3 || velocityErrors.length !== 3) {
    throw new TypeError(`${worldlineId} segment errors must have three axes`);
  }
  return { start, end, coefficients, positionErrors, velocityErrors };
}

function prepareWorldline(worldline) {
  if (!worldline || typeof worldline.id !== "string" ||
      ![1, -1].includes(worldline.polarity) || !Array.isArray(worldline.segments) ||
      worldline.segments.length === 0) {
    throw new TypeError("assembly record contains an invalid worldline");
  }
  const segments = worldline.segments.map((segment, index) =>
    prepareSegment(segment, worldline.id, index));
  for (let index = 1; index < segments.length; index += 1) {
    if (Math.abs(segments[index].start - segments[index - 1].end) > EPS) {
      throw new Error(`${worldline.id} history segments are not contiguous`);
    }
  }
  return {
    ...worldline,
    label: siteCoordinate(worldline.id),
    coverageStart: finiteNumber(worldline.coverageStart, `${worldline.id}.coverageStart`),
    coverageEnd: finiteNumber(worldline.coverageEnd, `${worldline.id}.coverageEnd`),
    segments,
  };
}

function segmentAt(worldline, time) {
  let lower = 0;
  let upper = worldline.segments.length - 1;
  while (lower <= upper) {
    const middle = Math.floor((lower + upper) / 2);
    const segment = worldline.segments[middle];
    if (time < segment.start - EPS) upper = middle - 1;
    else if (time > segment.end + EPS) lower = middle + 1;
    else return segment;
  }
  throw new RangeError(`${worldline.id} does not cover time ${time}`);
}

export function evaluateAssemblyWorldline(worldline, time) {
  const checked = worldline.segments?.[0]?.coefficients?.[0]?.every(
    (entry) => typeof entry === "number") ? worldline : prepareWorldline(worldline);
  const evaluationTime = finiteNumber(time, "evaluation time");
  const segment = segmentAt(checked, evaluationTime);
  const local = Math.min(segment.end - segment.start,
    Math.max(0, evaluationTime - segment.start));
  const position = segment.coefficients.map((row) =>
    ((row[3] * local + row[2]) * local + row[1]) * local + row[0]);
  const velocity = segment.coefficients.map((row) =>
    (3 * row[3] * local + 2 * row[2]) * local + row[1]);
  return {
    time: evaluationTime,
    position,
    velocity,
    positionErrors: segment.positionErrors,
    velocityErrors: segment.velocityErrors,
  };
}

function vectorDifferenceBounds(left, right, errorField) {
  const lower = [];
  const upper = [];
  for (let axis = 0; axis < 3; axis += 1) {
    const difference = Math.abs(left[errorField === "positionErrors"
      ? "position" : "velocity"][axis] - right[errorField === "positionErrors"
      ? "position" : "velocity"][axis]);
    const error = left[errorField][axis] + right[errorField][axis];
    lower.push(Math.max(0, difference - error));
    upper.push(difference + error);
  }
  return { lower: norm(lower), upper: norm(upper) };
}

function shiftPolynomialOrigin(coefficients, offset) {
  const [c0, c1, c2, c3] = coefficients;
  return [
    c0 + c1 * offset + c2 * offset ** 2 + c3 * offset ** 3,
    c1 + 2 * c2 * offset + 3 * c3 * offset ** 2,
    c2 + 3 * c3 * offset,
    c3,
  ];
}

function polynomialValue(coefficients, value) {
  return ((coefficients[3] * value + coefficients[2]) * value +
    coefficients[1]) * value + coefficients[0];
}

function quadraticRoots(a, b, c) {
  if (Math.abs(a) < 1e-30) {
    return Math.abs(b) < 1e-30 ? [] : [-c / b];
  }
  const discriminant = b ** 2 - 4 * a * c;
  if (discriminant < 0) return [];
  const squareRoot = Math.sqrt(Math.max(0, discriminant));
  return [(-b - squareRoot) / (2 * a), (-b + squareRoot) / (2 * a)];
}

function maximumAbsoluteCubic(coefficients, duration) {
  const candidates = [0, duration, ...quadraticRoots(
    3 * coefficients[3], 2 * coefficients[2], coefficients[1])
    .filter((value) => value > 0 && value < duration)];
  return Math.max(...candidates.map((value) =>
    Math.abs(polynomialValue(coefficients, value))));
}

function maximumAbsoluteQuadratic(coefficients, duration) {
  const candidates = [0, duration];
  if (Math.abs(coefficients[2]) > 1e-30) {
    const critical = -coefficients[1] / (2 * coefficients[2]);
    if (critical > 0 && critical < duration) candidates.push(critical);
  }
  return Math.max(...candidates.map((value) => Math.abs(
    coefficients[0] + coefficients[1] * value +
      coefficients[2] * value ** 2)));
}

function continuousShiftBounds(worldline, period, window) {
  const breakpoints = new Set([-window, 0]);
  for (const segment of worldline.segments) {
    for (const endpoint of [segment.start, segment.end]) {
      if (endpoint > -window + EPS && endpoint < -EPS) breakpoints.add(endpoint);
      const shifted = endpoint - period;
      if (shifted > -window + EPS && shifted < -EPS) breakpoints.add(shifted);
    }
  }
  const ordered = [...breakpoints].sort((left, right) => left - right);
  let maximumPositionUpper = 0;
  let maximumVelocityUpper = 0;
  let maximumPositionLowerWitness = 0;
  let maximumVelocityLowerWitness = 0;
  for (let index = 0; index + 1 < ordered.length; index += 1) {
    const start = ordered[index];
    const end = ordered[index + 1];
    if (!(end > start + EPS)) continue;
    const middle = (start + end) / 2;
    const beforeSegment = segmentAt(worldline, middle);
    const afterSegment = segmentAt(worldline, middle + period);
    const positionAxisUpper = [];
    const velocityAxisUpper = [];
    for (let axis = 0; axis < 3; axis += 1) {
      const before = shiftPolynomialOrigin(beforeSegment.coefficients[axis],
        start - beforeSegment.start);
      const after = shiftPolynomialOrigin(afterSegment.coefficients[axis],
        start + period - afterSegment.start);
      const difference = before.map((entry, coefficientIndex) =>
        entry - after[coefficientIndex]);
      const positionError = beforeSegment.positionErrors[axis] +
        afterSegment.positionErrors[axis];
      const velocityError = beforeSegment.velocityErrors[axis] +
        afterSegment.velocityErrors[axis];
      const positionMaximum = maximumAbsoluteCubic(difference, end - start);
      const velocityMaximum = maximumAbsoluteQuadratic([
        difference[1], 2 * difference[2], 3 * difference[3],
      ], end - start);
      positionAxisUpper.push(positionMaximum + positionError);
      velocityAxisUpper.push(velocityMaximum + velocityError);
      maximumPositionLowerWitness = Math.max(maximumPositionLowerWitness,
        Math.max(0, positionMaximum - positionError));
      maximumVelocityLowerWitness = Math.max(maximumVelocityLowerWitness,
        Math.max(0, velocityMaximum - velocityError));
    }
    maximumPositionUpper = Math.max(maximumPositionUpper,
      norm(positionAxisUpper));
    maximumVelocityUpper = Math.max(maximumVelocityUpper,
      norm(velocityAxisUpper));
  }
  return {
    maximumPositionLowerWitness,
    maximumPositionUpper,
    maximumVelocityLowerWitness,
    maximumVelocityUpper,
  };
}

function compareShiftedHistory(worldlines, period, window, samples, tolerance) {
  const rows = [];
  let maximumPositionLower = 0;
  let maximumPositionUpper = 0;
  let maximumVelocityLower = 0;
  let maximumVelocityUpper = 0;
  for (const worldline of worldlines) {
    const continuousBounds = continuousShiftBounds(worldline, period, window);
    let memberMaximum = {
      positionLower: 0,
      velocityLower: 0,
      worstTime: -window,
    };
    for (let index = 0; index < samples; index += 1) {
      const time = -window + window * index / (samples - 1);
      const before = evaluateAssemblyWorldline(worldline, time);
      const after = evaluateAssemblyWorldline(worldline, time + period);
      const position = vectorDifferenceBounds(before, after, "positionErrors");
      const velocity = vectorDifferenceBounds(before, after, "velocityErrors");
      const score = Math.max(position.lower, velocity.lower);
      const priorScore = Math.max(memberMaximum.positionLower,
        memberMaximum.velocityLower);
      if (score >= priorScore) {
        memberMaximum = {
          positionLower: position.lower,
          velocityLower: velocity.lower,
          worstTime: time,
        };
      }
      maximumPositionLower = Math.max(maximumPositionLower, position.lower);
      maximumVelocityLower = Math.max(maximumVelocityLower, velocity.lower);
    }
    maximumPositionUpper = Math.max(maximumPositionUpper,
      continuousBounds.maximumPositionUpper);
    maximumVelocityUpper = Math.max(maximumVelocityUpper,
      continuousBounds.maximumVelocityUpper);
    maximumPositionLower = Math.max(maximumPositionLower,
      continuousBounds.maximumPositionLowerWitness);
    maximumVelocityLower = Math.max(maximumVelocityLower,
      continuousBounds.maximumVelocityLowerWitness);
    rows.push({
      memberId: worldline.id,
      ...memberMaximum,
      continuousPositionLowerWitness:
        continuousBounds.maximumPositionLowerWitness,
      continuousPositionUpper: continuousBounds.maximumPositionUpper,
      continuousVelocityLowerWitness:
        continuousBounds.maximumVelocityLowerWitness,
      continuousVelocityUpper: continuousBounds.maximumVelocityUpper,
    });
  }
  const maximumLower = Math.max(maximumPositionLower, maximumVelocityLower);
  const maximumUpper = Math.max(maximumPositionUpper, maximumVelocityUpper);
  return {
    estimator: "continuous-piecewise-polynomial-upper-with-sampled-rejection-witness/v1",
    rejectionWitnessSampleCount: samples,
    initialWindow: [-window, 0],
    returnedWindow: [period - window, period],
    tolerance,
    maximumPositionLower,
    maximumPositionUpper,
    maximumVelocityLower,
    maximumVelocityUpper,
    memberRows: rows,
    decision: maximumUpper <= tolerance
      ? "history_return_accepted"
      : maximumLower > tolerance
      ? "history_return_rejected"
      : "history_return_unresolved",
  };
}

function orbitChart(worldline, anchor, period, conditioningFloor) {
  const endpoint = evaluateAssemblyWorldline(worldline, anchor);
  const endpointAntipode = evaluateAssemblyWorldline(worldline, anchor - period / 2);
  const center = scale(add(endpoint.position, endpointAntipode.position), 0.5);
  const residual = scale(subtract(endpoint.position, endpointAntipode.position), 0.5);
  const residualVelocity = scale(subtract(
    endpoint.velocity, endpointAntipode.velocity), 0.5);
  const circulation = cross(residual, residualVelocity);
  const frameConditioning = norm(circulation);
  if (!(frameConditioning > conditioningFloor)) {
    throw new RangeError(`${worldline.id} orbit circulation is not rank-certified`);
  }
  const normal = scale(circulation, 1 / frameConditioning);
  const frameP = normalize(residual, `${worldline.id} frame p`);
  const frameQ = normalize(cross(normal, frameP), `${worldline.id} frame q`);
  const orbitRadius = norm(residual);
  const reconstructed = add(center, scale(frameP, orbitRadius));
  const nominalResidual = norm(subtract(endpoint.position, reconstructed));
  const centerError = 0.5 * norm(add(
    endpoint.positionErrors, endpointAntipode.positionErrors));
  return {
    center,
    centerError,
    orbitRadius,
    orbitPhase: 0,
    frameP,
    frameQ,
    reconstructionResidual: nominalResidual + centerError +
      norm(endpoint.positionErrors) + 1e-12,
    instantaneousFrameConditioning: frameConditioning,
  };
}

function snapshotAt(worldlines, anchor, period, spacing, phase, options) {
  const members = worldlines.map((worldline) => {
    const evaluated = evaluateAssemblyWorldline(worldline, anchor);
    const chart = orbitChart(worldline, anchor, period,
      options.planeConditioningFloor);
    return {
      id: worldline.id,
      label: worldline.label,
      polarity: worldline.polarity,
      position: evaluated.position,
      siteHistory: {
        historyFingerprint: sha256(JSON.stringify({
          source: worldline.historyFingerprint,
          anchor,
          period,
          estimator: CENTER_ESTIMATOR_ID,
        })),
        centerEstimatorId: CENTER_ESTIMATOR_ID,
        historyWindow: [anchor - period / 2, anchor],
        center: chart.center,
        centerError: chart.centerError,
        orbitRadius: chart.orbitRadius,
        orbitPhase: chart.orbitPhase,
        frameP: chart.frameP,
        frameQ: chart.frameQ,
        reconstructionResidual: chart.reconstructionResidual,
        instantaneousFrameConditioning: chart.instantaneousFrameConditioning,
      },
    };
  });
  return {
    schema: "adaptive_cubic_medium_snapshot/v1",
    time: anchor,
    spacing,
    checkerboardPhase: phase,
    members,
  };
}

function boundaryStatus(manifest) {
  return manifest.adaptiveCubicMediumCoordinate?.boundaryStatus ??
    manifest.f6cCubicLatticeCoordinate?.boundaryStatus ?? "missing";
}

function declaredSpacing(manifest) {
  return manifest.adaptiveCubicMediumCoordinate?.spacing ??
    manifest.f6cCubicLatticeCoordinate?.spacing;
}

function guardRecord(manifest, census, assembly, period, options) {
  const boundary = boundaryStatus(manifest);
  const minimumPairDistance = census.length > 0
    ? Math.min(...census.map((row) => Number(row.minPairDistanceInChunk)))
    : null;
  const maximumSpeed = census.length > 0
    ? Math.max(...census.map((row) => Number(row.maxSpeed)))
    : null;
  const rootsComplete = manifest.releaseRootClearance === "certified_complete" &&
    census.length > 0 && census.every((row) => row.engine?.status === "completed" &&
      row.engine?.rejectedSteps === 0);
  const controlledTailFingerprint = manifest.adaptiveCubicMediumCoordinate
    ?.exteriorTailCertificateFingerprint ?? manifest.f6cCubicLatticeCoordinate
    ?.exteriorTailCertificateFingerprint;
  return {
    wakeSpeed: 1,
    runCompletedThroughPeriod: manifest.status === "completed" &&
      Number(manifest.acceptedEndTime) + EPS >= period,
    populationMatches: manifest.population === assembly.worldlines.length,
    rootsComplete,
    boundary,
    boundaryClosed: ACCEPTED_BOUNDARIES.has(boundary) &&
      (boundary !== "controlled_exterior_tail" ||
       typeof controlledTailFingerprint === "string" &&
       controlledTailFingerprint.length > 0),
    controlledTailFingerprint: controlledTailFingerprint ?? null,
    clearanceFloor: options.clearanceFloor,
    minimumPairDistance,
    pairClearance: Number.isFinite(minimumPairDistance) &&
      minimumPairDistance >= options.clearanceFloor,
    maximumSpeed,
    memberSpeed: Number.isFinite(maximumSpeed) && maximumSpeed < 1,
    sourceRecordAuthority: assembly.provenance?.recordAuthority ?? "missing",
    eomRecord: assembly.provenance?.engineId === "eom-solver" &&
      assembly.provenance?.claimGrade === "evolved-record",
  };
}

export function buildAdaptiveBackgroundExistencePacket(outDirectory, options = {}) {
  const period = positiveNumber(options.period, "period");
  const returnTolerance = nonnegativeNumber(
    options.returnTolerance, "returnTolerance");
  const chartTolerance = nonnegativeNumber(
    options.chartTolerance, "chartTolerance");
  const clearanceFloor = nonnegativeNumber(
    options.clearanceFloor, "clearanceFloor");
  const returnWindow = positiveNumber(options.returnWindow ?? period,
    "returnWindow");
  const historySamples = options.historySamples ?? 65;
  if (!Number.isInteger(historySamples) || historySamples < 3) {
    throw new RangeError("historySamples is too small");
  }
  const planeConditioningFloor = nonnegativeNumber(
    options.planeConditioningFloor ?? 1e-10, "planeConditioningFloor");
  const manifestPath = path.join(outDirectory, "run-manifest.json");
  const assemblyPath = path.join(outDirectory, "assembly-view-record.json");
  const censusPath = path.join(outDirectory, "census.jsonl");
  const manifest = readJson(manifestPath);
  const assembly = readJson(assemblyPath);
  const census = readJsonLines(censusPath);
  if (assembly.schema !== "assembly-view-record.v0" ||
      !Array.isArray(assembly.worldlines)) {
    throw new TypeError("directory does not contain an assembly-view record");
  }
  const spacing = positiveNumber(declaredSpacing(manifest), "lattice spacing");
  const worldlines = assembly.worldlines.map(prepareWorldline);
  if (new Set(worldlines.map((row) => row.id)).size !== worldlines.length) {
    throw new Error("worldline identities must be unique");
  }
  const phase = checkerboardPhase(worldlines);
  const checkedOptions = {
    returnTolerance,
    chartTolerance,
    clearanceFloor,
    historySamples,
    planeConditioningFloor,
  };
  const guards = guardRecord(manifest, census, assembly, period, checkedOptions);
  const blockers = [];
  for (const [field, passed] of Object.entries({
    run_completed_through_period: guards.runCompletedThroughPeriod,
    population_matches: guards.populationMatches,
    roots_complete: guards.rootsComplete,
    boundary_closed: guards.boundaryClosed,
    pair_clearance: guards.pairClearance,
    member_speed: guards.memberSpeed,
    eom_record: guards.eomRecord,
  })) {
    if (!passed) blockers.push(field);
  }
  const coverageStart = Math.max(...worldlines.map((row) => row.coverageStart));
  const coverageEnd = Math.min(...worldlines.map((row) => row.coverageEnd));
  const returnCoverage = coverageStart <= -returnWindow + EPS &&
    coverageEnd + EPS >= period;
  const chartCoverage = coverageStart <= -period / 2 + EPS &&
    coverageEnd + EPS >= period;
  if (!returnCoverage) blockers.push("history_return_coverage");
  if (!chartCoverage) blockers.push("site_chart_coverage");

  let historyReturn = null;
  if (returnCoverage) {
    historyReturn = compareShiftedHistory(worldlines, period, returnWindow,
      historySamples, returnTolerance);
  }
  let siteLocal = null;
  let neighborLedger = null;
  let orientation = null;
  if (chartCoverage) {
    try {
      const before = snapshotAt(worldlines, 0, period, spacing, phase,
        checkedOptions);
      const after = snapshotAt(worldlines, period, period, spacing, phase,
        checkedOptions);
      const beforeAnalysis = analyzeSiteLocalSnapshot(before, {
        gapFloor: options.gapFloor,
      });
      const afterAnalysis = analyzeSiteLocalSnapshot(after, {
        gapFloor: options.gapFloor,
      });
      neighborLedger = buildNeighborReclassificationLedger({
        before,
        after,
        gapFloor: options.gapFloor,
        transitionEvidence: options.transitionEvidence,
      });
      orientation = {
        before: summarizeOrientationDistribution(before),
        after: summarizeOrientationDistribution(after),
      };
      siteLocal = { before, after, beforeAnalysis, afterAnalysis };
      if (!beforeAnalysis.allNeighborRanksCertified ||
          !afterAnalysis.allNeighborRanksCertified) {
        blockers.push("neighbor_identity_unresolved");
      }
      if (neighborLedger.decision === "neighbor_identity_unresolved" ||
          neighborLedger.decision ===
            "kinematic_reclassification_only_missing_accounts") {
        blockers.push("neighbor_reclassification_not_admissible");
      }
      const maximumReconstructionResidual = Math.max(...[
        ...before.members, ...after.members,
      ].map((member) => member.siteHistory.reconstructionResidual));
      if (maximumReconstructionResidual > chartTolerance) {
        blockers.push("site_chart_reconstruction_residual");
      }
    } catch (error) {
      blockers.push("site_chart_unavailable");
      siteLocal = { error: error.message };
    }
  }

  const nonReturnBlockers = [...new Set(blockers)];
  let decision = "adaptive_background_blocked";
  if (nonReturnBlockers.length === 0 && historyReturn) {
    decision = historyReturn.decision === "history_return_accepted"
      ? "adaptive_background_accepted_for_directional_source_receiver_campaign"
      : historyReturn.decision === "history_return_rejected"
      ? "adaptive_background_history_return_rejected"
      : "adaptive_background_history_return_unresolved";
  }
  return {
    schema: "adaptive_cubic_background_existence_packet/v1",
    claimBoundary: "background existence and history return; not response or isotropy",
    source: {
      directory: path.resolve(outDirectory),
      runId: manifest.runId,
      seedFamily: manifest.seedFamily,
      modelFingerprint: manifest.modelFingerprint,
      manifestSha256: sha256(fs.readFileSync(manifestPath)),
      assemblyRecordSha256: sha256(fs.readFileSync(assemblyPath)),
    },
    contract: {
      wakeSpeed: 1,
      period,
      returnWindow,
      returnTolerance,
      chartTolerance,
      historySamples,
      centerEstimatorId: CENTER_ESTIMATOR_ID,
      planeConditioningFloor,
      gapFloor: options.gapFloor ?? spacing * 1e-8,
    },
    coverage: { commonStart: coverageStart, commonEnd: coverageEnd },
    guards,
    historyReturn,
    siteLocal,
    neighborLedger,
    orientation,
    blockers: nonReturnBlockers,
    decision,
    responseRows: "not_run",
    physicalReceiverRecords: "not_supplied_by_background_packet",
  };
}

function option(argv, name) {
  const prefix = `--${name}=`;
  const argument = argv.find((entry) => entry.startsWith(prefix));
  return argument?.slice(prefix.length);
}

function parseCli(argv) {
  const directory = argv.find((entry) => !entry.startsWith("--"));
  if (!directory) {
    throw new TypeError("usage: node adaptive-cubic-background-packet.mjs OUT_DIR --period=N --return-tolerance=N --chart-tolerance=N --clearance-floor=N");
  }
  return {
    directory,
    options: {
      period: option(argv, "period"),
      returnTolerance: option(argv, "return-tolerance"),
      chartTolerance: option(argv, "chart-tolerance"),
      clearanceFloor: option(argv, "clearance-floor"),
      returnWindow: option(argv, "return-window"),
      historySamples: option(argv, "history-samples") === undefined
        ? undefined : Number(option(argv, "history-samples")),
      gapFloor: option(argv, "gap-floor") === undefined
        ? undefined : Number(option(argv, "gap-floor")),
    },
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const cli = parseCli(process.argv.slice(2));
  console.log(JSON.stringify(
    buildAdaptiveBackgroundExistencePacket(cli.directory, cli.options), null, 2));
}
