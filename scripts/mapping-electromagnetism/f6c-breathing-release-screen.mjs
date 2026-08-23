import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

// Bounded EOM-solver release screen on the exact F6c symmetry surface. Each
// row supplies one common-frequency harmonic coordinate history and is tested
// without evolution. This is a candidate filter, not evidence of retention,
// stability, binding, or particle identity.

function option(name, fallback) {
  const prefix = `--${name}=`;
  const entry = process.argv.slice(2).find((value) => value.startsWith(prefix));
  return entry ? entry.slice(prefix.length) : fallback;
}

function positiveInteger(name, fallback) {
  const value = Number.parseInt(option(name, String(fallback)), 10);
  if (!Number.isInteger(value) || value < 1) {
    throw new TypeError(`${name} must be a positive integer.`);
  }
  return value;
}

function halton(index, base) {
  let result = 0;
  let fraction = 1;
  let remaining = index;
  while (remaining > 0) {
    fraction /= base;
    result += fraction * (remaining % base);
    remaining = Math.floor(remaining / base);
  }
  return result;
}

function lerp(minimum, maximum, fraction) {
  return minimum + (maximum - minimum) * fraction;
}

const rowsRequested = positiveInteger("rows", 48);
const seedOffset = positiveInteger("seed-offset", 1);
const executable = option(
  "executable",
  ".tmp/eom-native-dev/attractor-ensemble-harness",
);
const analyzer = option(
  "analyzer",
  "scripts/mapping-electromagnetism/f6c-eom-coordinate-analysis.mjs",
);
const outRoot = option("out-root", ".tmp/f6c-breathing-release-screen");
fs.mkdirSync(outRoot, { recursive: true });

const bases = [2, 3, 5, 7, 11, 13];
const accepted = [];
const rejected = [];
for (let rowIndex = 0; rowIndex < rowsRequested; rowIndex += 1) {
  const sequenceIndex = seedOffset + rowIndex;
  const rate = lerp(1.2, 2.4, halton(sequenceIndex, bases[0]));
  const negativeTheta = 2 * Math.PI * halton(sequenceIndex, bases[1]);
  const positiveHAmplitude = lerp(-0.12, 0.12, halton(sequenceIndex, bases[2]));
  const negativeHAmplitude = lerp(-0.12, 0.12, halton(sequenceIndex, bases[3]));
  const positiveRhoAmplitude = lerp(-0.12, 0.12, halton(sequenceIndex, bases[4]));
  const negativeRhoAmplitude = lerp(-0.12, 0.12, halton(sequenceIndex, bases[5]));
  const conservativeSectorSpeed = (hAmplitude, rhoAmplitude) => Math.hypot(
    Math.abs(hAmplitude) * rate,
    Math.abs(rhoAmplitude) * rate,
    (0.3 + Math.abs(rhoAmplitude)) * rate,
  );
  const maximumPrescribedSpeedBound = Math.max(
    conservativeSectorSpeed(positiveHAmplitude, positiveRhoAmplitude),
    conservativeSectorSpeed(negativeHAmplitude, negativeRhoAmplitude),
  );
  const parameters = {
    rate,
    negativeTheta,
    breathingRate: rate,
    positiveHAmplitude,
    negativeHAmplitude,
    positiveRhoAmplitude,
    negativeRhoAmplitude,
    maximumPrescribedSpeedBound,
  };
  if (maximumPrescribedSpeedBound >= 0.95) {
    rejected.push({ rowIndex, parameters, reason: "speed-margin" });
    continue;
  }
  const rowDirectory = path.join(outRoot, `row-${String(rowIndex).padStart(3, "0")}`);
  fs.mkdirSync(rowDirectory, { recursive: true });
  const harness = spawnSync(executable, [
    "--seed-family=f6c-balanced-tetrahedral-v1",
    `--f6c-positive-rate=${rate}`,
    `--f6c-negative-rate=${rate}`,
    `--f6c-negative-theta=${negativeTheta}`,
    `--f6c-breathing-rate=${rate}`,
    `--f6c-positive-h-amplitude=${positiveHAmplitude}`,
    `--f6c-negative-h-amplitude=${negativeHAmplitude}`,
    `--f6c-positive-rho-amplitude=${positiveRhoAmplitude}`,
    `--f6c-negative-rho-amplitude=${negativeRhoAmplitude}`,
    "--end-time=0",
    "--history-depth=8",
    "--history-segment-step=0.02",
    "--threads=8",
    `--out-dir=${rowDirectory}`,
    "--record-date=2026-08-23",
    "--generating-spec=F6c-breathing-release-screen-v1",
    "--engine-build-id=local-eom-native-dev",
  ], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  if (harness.status !== 0) {
    rejected.push({
      rowIndex,
      parameters,
      reason: "harness-rejected",
      stderrTail: harness.stderr.trim().split("\n").slice(-3),
    });
    continue;
  }
  const analyzed = spawnSync(process.execPath, [analyzer, rowDirectory], {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  if (analyzed.status !== 0) {
    rejected.push({
      rowIndex,
      parameters,
      reason: "analysis-rejected",
      stderrTail: analyzed.stderr.trim().split("\n").slice(-3),
    });
    continue;
  }
  const packet = JSON.parse(analyzed.stdout);
  const positive = packet.releaseAcceleration.sectors.positive;
  const negative = packet.releaseAcceleration.sectors.negative;
  const result = {
    rowIndex,
    parameters,
    rootStatus: packet.releaseAcceleration.status,
    minimumPairDistance: packet.trajectorySummary.minimumResolvedFramePair.distance,
    positive: {
      ...positive.coordinateSecondDerivatives,
      ...positive.projectedAcceleration,
    },
    negative: {
      ...negative.coordinateSecondDerivatives,
      ...negative.projectedAcceleration,
    },
    releaseRates: {
      positive: {
        hDot: positiveHAmplitude * rate,
        rhoDot: positiveRhoAmplitude * rate,
        thetaDot: rate,
      },
      negative: {
        hDot: negativeHAmplitude * rate,
        rhoDot: negativeRhoAmplitude * rate,
        thetaDot: rate,
      },
    },
  };
  result.radialWorst = Math.max(result.positive.rhoDDot, result.negative.rhoDDot);
  result.radialBothRestoring = result.radialWorst < 0;
  result.predictsTwoRadialMaxima = result.radialBothRestoring
    && result.releaseRates.positive.rhoDot > 0
    && result.releaseRates.negative.rhoDot > 0;
  result.axialAccelerationOpposesVelocity = {
    positive: result.releaseRates.positive.hDot * result.positive.hDDot < 0,
    negative: result.releaseRates.negative.hDot * result.negative.hDDot < 0,
  };
  accepted.push(result);
}

accepted.sort((left, right) =>
  left.radialWorst - right.radialWorst
  || right.minimumPairDistance - left.minimumPairDistance);
console.log(JSON.stringify({
  schema: "f6c-breathing-release-screen/v1",
  claimGrade: "measured-eom-solver-diagnostic-not-independent-oracle",
  excludedClaims: ["binding", "retention", "stability", "particle-identity"],
  fixedConditions: {
    fieldSpeed: 1,
    hPositive: 0.3,
    rhoPositive: 0.3,
    hNegative: 0.3,
    rhoNegative: 0.3,
    commonAngularAndBreathingRate: true,
    oneSharedReleaseRecordPerRow: true,
    noEvolution: true,
  },
  search: {
    rowsRequested,
    seedOffset,
    acceptedRows: accepted.length,
    rejectedRows: rejected.length,
    simultaneousRadialRestoringRows: accepted.filter(
      (row) => row.radialBothRestoring,
    ).length,
    predictedTwoRadialMaximumRows: accepted.filter(
      (row) => row.predictsTwoRadialMaxima,
    ).length,
  },
  bestRows: accepted.slice(0, 12),
  rows: accepted,
  rejected,
}, null, 2));
