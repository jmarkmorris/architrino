import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { f6cSectorCurrentFlow } from "./f6c-current-transport.mjs";

// Root-certified local release screen around the strongest F6c current-handoff
// seed. It varies only relative polarity phase and harmonic release phase.
// This is a bounded geometry diagnostic, not evolution, retention, stability,
// particle identity, or an effective magnetic-field calculation.

function option(name, fallback) {
  const prefix = `--${name}=`;
  const entry = process.argv.slice(2).find((value) => value.startsWith(prefix));
  return entry ? entry.slice(prefix.length) : fallback;
}

const executable = option(
  "executable",
  ".tmp/eom-native-dev/attractor-ensemble-harness",
);
const analyzer = option(
  "analyzer",
  "scripts/mapping-electromagnetism/f6c-eom-coordinate-analysis.mjs",
);
const outRoot = option(
  "out-root",
  ".tmp/f6c-current-handoff-local-screen-7x7",
);
fs.mkdirSync(outRoot, { recursive: true });

const base = {
  rate: 1.25,
  negativeTheta: 1.3962634015954636,
  cyclePhase: Math.PI / 2,
  positiveHAmplitude: -0.0624,
  negativeHAmplitude: 0.08571428571428569,
  positiveRhoAmplitude: 0.010909090909090896,
  negativeRhoAmplitude: -0.009230769230769223,
};
const offsets = [-0.15, -0.10, -0.05, 0, 0.05, 0.10, 0.15];
const rows = [];
const rejected = [];

for (let thetaIndex = 0; thetaIndex < offsets.length; thetaIndex += 1) {
  for (let phaseIndex = 0; phaseIndex < offsets.length; phaseIndex += 1) {
    const negativeTheta = base.negativeTheta + offsets[thetaIndex];
    const cyclePhase = base.cyclePhase + offsets[phaseIndex];
    const rowDirectory = path.join(
      outRoot,
      `theta-${thetaIndex}-phase-${phaseIndex}`,
    );
    fs.mkdirSync(rowDirectory, { recursive: true });
    const harness = spawnSync(executable, [
      "--seed-family=f6c-balanced-tetrahedral-v1",
      `--f6c-positive-rate=${base.rate}`,
      `--f6c-negative-rate=${base.rate}`,
      `--f6c-negative-theta=${negativeTheta}`,
      `--f6c-breathing-rate=${base.rate}`,
      `--f6c-cycle-phase=${cyclePhase}`,
      `--f6c-positive-h-amplitude=${base.positiveHAmplitude}`,
      `--f6c-negative-h-amplitude=${base.negativeHAmplitude}`,
      `--f6c-positive-rho-amplitude=${base.positiveRhoAmplitude}`,
      `--f6c-negative-rho-amplitude=${base.negativeRhoAmplitude}`,
      "--end-time=0",
      "--history-depth=8",
      "--history-segment-step=0.01",
      "--root-tolerance=1e-5",
      "--threads=8",
      `--out-dir=${rowDirectory}`,
      "--record-date=2026-08-23",
      "--generating-spec=F6c-current-handoff-local-screen-v1",
      "--engine-build-id=local-eom-native-dev",
    ], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
    if (harness.status !== 0) {
      rejected.push({
        thetaIndex,
        phaseIndex,
        negativeTheta,
        cyclePhase,
        reason: "harness-rejected",
        stderrTail: harness.stderr.trim().split("\n").slice(-3),
      });
      continue;
    }
    const analyzed = spawnSync(
      process.execPath,
      [analyzer, rowDirectory, "--release-capacity-only"],
      { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
    );
    if (analyzed.status !== 0) {
      rejected.push({
        thetaIndex,
        phaseIndex,
        negativeTheta,
        cyclePhase,
        reason: "analysis-rejected",
        stderrTail: analyzed.stderr.trim().split("\n").slice(-3),
      });
      continue;
    }
    const packet = JSON.parse(analyzed.stdout);
    const frame = packet.releaseFrame;
    const sectorNames = ["positive", "negative"];
    const flows = Object.fromEntries(sectorNames.map((sectorName) => {
      const sector = frame.sectors[sectorName];
      const acceleration = packet.releaseAcceleration.sectors[sectorName]
        .coordinateSecondDerivatives;
      const currentFlow = f6cSectorCurrentFlow(
        sectorName,
        sector,
        acceleration,
      );
      const speed = sector.coordinateSpeedBudget.memberSpeed;
      const speedDerivative = speed === 0
        ? Math.hypot(...currentFlow.rateVectorDerivative)
        : currentFlow.rateVector.reduce((sum, value, component) =>
          sum + value * currentFlow.rateVectorDerivative[component], 0) / speed;
      return [sectorName, {
        current: currentFlow.current,
        currentDerivative: currentFlow.currentDerivative,
        rateVectorDerivativeNorm: Math.hypot(
          ...currentFlow.rateVectorDerivative,
        ),
        speed,
        speedDerivative,
      }];
    }));
    const totalCurrent = flows.positive.current + flows.negative.current;
    const totalCurrentDerivative = flows.positive.currentDerivative
      + flows.negative.currentDerivative;
    const sectorDerivativeSum = Math.abs(flows.positive.currentDerivative)
      + Math.abs(flows.negative.currentDerivative);
    const maximumMemberSpeed = Math.max(
      flows.positive.speed,
      flows.negative.speed,
    );
    const row = {
      thetaIndex,
      phaseIndex,
      negativeTheta,
      cyclePhase,
      outDirectory: rowDirectory,
      minimumPairDistance: frame.minimumPair.distance,
      minimumPairDistanceRate: frame.minimumPair.distanceRate,
      maximumMemberSpeed,
      maximumPositiveSpeedDerivative: Math.max(
        0,
        flows.positive.speedDerivative,
        flows.negative.speedDerivative,
      ),
      maximumRateVectorDerivativeNorm: Math.max(
        flows.positive.rateVectorDerivativeNorm,
        flows.negative.rateVectorDerivativeNorm,
      ),
      totalCurrent,
      totalCurrentDerivative,
      absoluteFractionalCurrentDerivative:
        Math.abs(totalCurrentDerivative / totalCurrent),
      currentExchangeRatePerCurrent:
        sectorDerivativeSum / Math.abs(totalCurrent),
      currentTransferCancellationFraction: sectorDerivativeSum === 0
        ? 0
        : 1 - Math.abs(totalCurrentDerivative) / sectorDerivativeSum,
      currentMagnitudePerMaximumMemberSpeed:
        Math.abs(totalCurrent) / maximumMemberSpeed,
      assemblyCurrentDecomposition: frame.assemblyCurrentDecomposition,
      sectors: flows,
    };
    row.activeHandoff = row.currentTransferCancellationFraction >= 0.9
      && row.currentExchangeRatePerCurrent >= 0.5
      && row.absoluteFractionalCurrentDerivative <= 0.1;
    row.allImmediateGuards = row.activeHandoff
      && row.minimumPairDistanceRate >= 0
      && row.maximumPositiveSpeedDerivative === 0;
    rows.push(row);
  }
}

const guarded = rows.filter((row) => row.allImmediateGuards).sort(
  (left, right) =>
    left.absoluteFractionalCurrentDerivative
      - right.absoluteFractionalCurrentDerivative
    || right.minimumPairDistanceRate - left.minimumPairDistanceRate
    || left.maximumRateVectorDerivativeNorm
      - right.maximumRateVectorDerivativeNorm,
);

console.log(JSON.stringify({
  schema: "f6c-current-handoff-local-screen/v1",
  claimGrade: "measured-bounded-release-screen-not-independent-oracle",
  excludedClaims: [
    "evolution",
    "return",
    "binding",
    "retention",
    "stability",
    "particle-identity",
    "effective-magnetic-field",
  ],
  fixedConditions: {
    fieldSpeed: 1,
    rootTolerance: "1e-5",
    variedCoordinates: ["negativeTheta", "cyclePhase"],
    allOtherCoordinatesFixedToBase: true,
  },
  base,
  offsets,
  requestedRows: offsets.length ** 2,
  acceptedRows: rows.length,
  rejectedRows: rejected.length,
  activeHandoffRows: rows.filter((row) => row.activeHandoff).length,
  allImmediateGuardRows: guarded.length,
  guardedRows: guarded,
  rows,
  rejected,
}, null, 2));
