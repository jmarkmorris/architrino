#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

function norm(vector) {
  return Math.hypot(...vector);
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function dot(left, right) {
  return left.reduce(
    (sum, value, index) => sum + value * right[index],
    0,
  );
}

function vector(row, key) {
  return ["x", "y", "z"].map((axis) => Number(row[key][axis]));
}

export function reduceBinaryBreatherFrames(rows) {
  const radialSpeedZeroTolerance = 1e-12;
  const byFrame = new Map();
  for (const row of rows) {
    const frame = byFrame.get(row.frameIndex) ?? [];
    frame.push(row);
    byFrame.set(row.frameIndex, frame);
  }

  const samples = [...byFrame.entries()]
    .sort(([left], [right]) => left - right)
    .map(([frameIndex, frame]) => {
      if (frame.length !== 2) {
        throw new Error(
          `frame ${frameIndex} has ${frame.length} paths; expected exactly 2`,
        );
      }
      frame.sort((left, right) => left.pathKey - right.pathKey);
      const pathPositions = frame.map((row) => vector(row, "position"));
      const pathVelocities = frame.map((row) => vector(row, "velocity"));
      const deltaPosition = subtract(
        pathPositions[0],
        pathPositions[1],
      );
      const deltaVelocity = subtract(
        pathVelocities[0],
        pathVelocities[1],
      );
      const midpoint = pathPositions[0].map(
        (value, index) => (value + pathPositions[1][index]) / 2,
      );
      const separation = norm(deltaPosition);
      if (!(separation > 0)) {
        throw new Error(`frame ${frameIndex} has non-positive separation`);
      }
      return {
        frameIndex,
        time: Number(frame[0].time),
        separation,
        radialSpeed: dot(deltaPosition, deltaVelocity) / separation,
        relativeSpeed: norm(deltaVelocity),
        individualSpeeds: pathVelocities.map(norm),
        maximumIndividualSpeed: Math.max(...pathVelocities.map(norm)),
        maximumReportedErrorBound: Math.max(
          Number(frame[0].errorBound),
          Number(frame[1].errorBound),
        ),
        midpoint,
        pathPositions,
        deltaPosition,
      };
    });

  if (samples.length === 0) {
    throw new Error("no frame rows");
  }

  const initialAxis = samples[0].deltaPosition.map(
    (value) => value / samples[0].separation,
  );
  for (const sample of samples) {
    sample.signedAxialSeparation = dot(sample.deltaPosition, initialAxis);
    const axial = initialAxis.map(
      (value) => value * sample.signedAxialSeparation,
    );
    sample.transverseSeparation = norm(
      subtract(sample.deltaPosition, axial),
    );
    delete sample.deltaPosition;
  }

  const crossings = [];
  for (let index = 1; index < samples.length; ++index) {
    const left = samples[index - 1];
    const right = samples[index];
    if (
      left.signedAxialSeparation === 0 ||
      right.signedAxialSeparation === 0 ||
      Math.sign(left.signedAxialSeparation) !==
        Math.sign(right.signedAxialSeparation)
    ) {
      crossings.push({
        timeBracket: [left.time, right.time],
        signedAxialSeparationBracket: [
          left.signedAxialSeparation,
          right.signedAxialSeparation,
        ],
        ...crossingInterpolation(left, right),
      });
    }
  }

  const turningPoints = [];
  for (let index = 1; index < samples.length; ++index) {
    const left = samples[index - 1];
    const right = samples[index];
    if (
      Math.abs(left.radialSpeed) <= radialSpeedZeroTolerance ||
      Math.abs(right.radialSpeed) <= radialSpeedZeroTolerance
    ) {
      continue;
    }
    if (Math.sign(left.radialSpeed) === Math.sign(right.radialSpeed)) continue;
    const fraction =
      -left.radialSpeed / (right.radialSpeed - left.radialSpeed);
    turningPoints.push({
      kind:
        left.radialSpeed < 0 && right.radialSpeed > 0
          ? "minimum"
          : "maximum",
      timeBracket: [left.time, right.time],
      radialSpeedBracket: [left.radialSpeed, right.radialSpeed],
      linearZeroTime:
        left.time + fraction * (right.time - left.time),
      linearSeparation:
        left.separation +
        fraction * (right.separation - left.separation),
      sampledSeparationBracket: [
        Math.min(left.separation, right.separation),
        Math.max(left.separation, right.separation),
      ],
    });
  }

  const minimumSample = samples.reduce((best, row) =>
    row.separation < best.separation ? row : best,
  );
  const maximumSample = samples.reduce((best, row) =>
    row.separation > best.separation ? row : best,
  );
  const maximumIndividualSpeed = samples.reduce(
    (best, row) => Math.max(best, row.maximumIndividualSpeed),
    0,
  );
  const maximumReportedErrorBound = samples.reduce(
    (best, row) => Math.max(best, row.maximumReportedErrorBound),
    0,
  );
  const initialMidpoint = samples[0].midpoint;
  const finalMidpoint = samples.at(-1).midpoint;
  const maximumMidpointDrift = samples.reduce(
    (best, row) =>
      Math.max(best, norm(subtract(row.midpoint, initialMidpoint))),
    0,
  );
  const largestSampleInterval = samples
    .slice(1)
    .reduce(
      (best, row, index) =>
        Math.max(best, row.time - samples[index].time),
      0,
    );
  const maximumTransverseSeparation = samples.reduce(
    (best, row) => Math.max(best, row.transverseSeparation),
    0,
  );

  const minima = turningPoints.filter((row) => row.kind === "minimum");
  const maxima = turningPoints.filter((row) => row.kind === "maximum");
  const completedReturnIntervals = Math.max(
    0,
    Math.min(minima.length - 1, maxima.length),
  );
  const excursions = [];
  for (let index = 0; index + 2 < turningPoints.length; ++index) {
    const innerStart = turningPoints[index];
    const outer = turningPoints[index + 1];
    const innerEnd = turningPoints[index + 2];
    if (
      innerStart.kind !== "minimum" ||
      outer.kind !== "maximum" ||
      innerEnd.kind !== "minimum"
    ) {
      continue;
    }
    const innerMean =
      (innerStart.linearSeparation + innerEnd.linearSeparation) / 2;
    excursions.push({
      innerStart: returnEventRow(innerStart),
      outer: returnEventRow(outer),
      innerEnd: returnEventRow(innerEnd),
      sampledExcursionSize: outer.linearSeparation - innerMean,
    });
    index += 1;
  }
  const excursionComparisons = [];
  for (let index = 1; index < excursions.length; ++index) {
    const previous = excursions[index - 1];
    const current = excursions[index];
    excursionComparisons.push({
      fromExcursion: index,
      toExcursion: index + 1,
      outerSeparationChange:
        current.outer.separation - previous.outer.separation,
      outerSeparationRatio:
        current.outer.separation / previous.outer.separation,
      innerStartSeparationChange:
        current.innerStart.separation - previous.innerStart.separation,
      innerStartSeparationRatio:
        current.innerStart.separation / previous.innerStart.separation,
      excursionSizeChange:
        current.sampledExcursionSize - previous.sampledExcursionSize,
      excursionSizeRatio:
        current.sampledExcursionSize / previous.sampledExcursionSize,
    });
  }
  const returnMapTrend = classifyExcursionTrend(
    excursions,
    maximumReportedErrorBound,
  );

  return {
    schema: "binary_breather_sampled_reduction/v1",
    evidenceBoundary:
      "sampled diagnostic reduction of EOM output; not an independent solver oracle",
    sampleCount: samples.length,
    timeWindow: [samples[0].time, samples.at(-1).time],
    largestSampleInterval,
    separation: {
      initial: samples[0].separation,
      final: samples.at(-1).separation,
      sampledMinimum: {
        time: minimumSample.time,
        value: minimumSample.separation,
      },
      sampledMaximum: {
        time: maximumSample.time,
        value: maximumSample.separation,
      },
    },
    radialSpeed: {
      initial: samples[0].radialSpeed,
      final: samples.at(-1).radialSpeed,
    },
    maximumIndividualSpeed,
    maximumReportedErrorBound,
    midpointDrift: {
      initial: initialMidpoint,
      final: finalMidpoint,
      maximumMagnitude: maximumMidpointDrift,
    },
    labeledPathCrossings: crossings,
    maximumTransverseSeparation,
    turningPoints,
    returnMap: {
      completedReturnIntervals,
      sufficientForRepeatedBreathingDiagnostic:
        minima.length >= 2 && maxima.length >= 1,
      minimumCount: minima.length,
      laterMaximumCount: maxima.length,
      crossingOccurred: crossings.length > 0,
      excursions,
      successiveExcursionComparisons: excursionComparisons,
      observedFiniteTimeTrend: returnMapTrend,
      trendEvidenceBoundary:
        "sampled extrema only; refinement and accepted return-map evidence are still required",
    },
    energyAccount:
      "not evaluated: no accepted architrino-level energy account is defined for this run",
  };
}

function interpolate(left, right, fraction) {
  return left.map(
    (value, index) => value + fraction * (right[index] - value),
  );
}

function crossingInterpolation(left, right) {
  const denominator =
    right.signedAxialSeparation - left.signedAxialSeparation;
  const fraction =
    denominator === 0 ? 0.5 : -left.signedAxialSeparation / denominator;
  const midpoint = interpolate(left.midpoint, right.midpoint, fraction);
  const firstPosition = interpolate(
    left.pathPositions[0],
    right.pathPositions[0],
    fraction,
  );
  const secondPosition = interpolate(
    left.pathPositions[1],
    right.pathPositions[1],
    fraction,
  );
  const individualSpeeds = left.individualSpeeds.map(
    (value, index) =>
      value + fraction * (right.individualSpeeds[index] - value),
  );
  return {
    linearCrossingTime:
      left.time + fraction * (right.time - left.time),
    linearCrossingLocation: midpoint,
    crossingLocationRadiusFromOrigin: norm(midpoint),
    symmetryError: {
      positionSumMagnitude: norm(
        firstPosition.map(
          (value, index) => value + secondPosition[index],
        ),
      ),
      midpointMagnitude: norm(midpoint),
    },
    individualSpeeds,
    fieldSpeedFractions: individualSpeeds,
    evidenceBoundary:
      "linear interpolation inside two atomically published EOM frame endpoints",
  };
}

function returnEventRow(event) {
  return {
    time: event.linearZeroTime,
    separation: event.linearSeparation,
    timeBracket: event.timeBracket,
    separationBracket: event.sampledSeparationBracket,
  };
}

function classifyExcursionTrend(excursions, reportedError) {
  if (excursions.length < 2) return "unresolved";
  const scales = excursions.map((row) => row.sampledExcursionSize);
  const tolerance = Math.max(
    4 * reportedError,
    ...excursions.map(
      (row) =>
        row.outer.separationBracket[1] -
        row.outer.separationBracket[0],
    ),
  );
  const changes = scales.slice(1).map(
    (value, index) => value - scales[index],
  );
  if (changes.every((value) => value < -tolerance)) return "shrinking";
  if (changes.every((value) => value > tolerance)) return "growing";
  if (changes.every((value) => Math.abs(value) <= tolerance)) {
    return "approximately neutral within sampled uncertainty";
  }
  return "unresolved";
}

export function readJsonLines(filePath) {
  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function main(argv) {
  if (argv.length !== 1) {
    throw new Error(
      "usage: analyze-binary-breather-frames.mjs <frames.jsonl>",
    );
  }
  const input = path.resolve(argv[0]);
  process.stdout.write(
    `${JSON.stringify(reduceBinaryBreatherFrames(readJsonLines(input)), null, 2)}\n`,
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2));
}
