import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

// Samples one immutable common-frequency F6c harmonic history around a full
// cycle. The residual compares its analytically prescribed coordinate second
// derivatives with the EOM-solver release acceleration at the same phase.
// This is a prescribed-history consistency diagnostic, not an evolved return,
// retained braid, stability result, or independent oracle.

function option(name, fallback = null) {
  const prefix = `--${name}=`;
  const entry = process.argv.slice(2).find((value) => value.startsWith(prefix));
  return entry ? entry.slice(prefix.length) : fallback;
}

function finiteOption(name, fallback = null) {
  const raw = option(name, fallback === null ? null : String(fallback));
  if (raw === null) throw new TypeError(`missing --${name}`);
  const value = Number(raw);
  if (!Number.isFinite(value)) throw new TypeError(`${name} must be finite.`);
  return value;
}

function positiveInteger(name, fallback) {
  const value = Number.parseInt(option(name, String(fallback)), 10);
  if (!Number.isInteger(value) || value < 1) {
    throw new TypeError(`${name} must be a positive integer.`);
  }
  return value;
}

const rate = finiteOption("rate");
const negativeTheta = finiteOption("negative-theta");
const positiveHAmplitude = finiteOption("positive-h-amplitude");
const negativeHAmplitude = finiteOption("negative-h-amplitude");
const positiveRhoAmplitude = finiteOption("positive-rho-amplitude");
const negativeRhoAmplitude = finiteOption("negative-rho-amplitude");
const positivePhaseAmplitude = finiteOption("positive-phase-amplitude", 0);
const negativePhaseAmplitude = finiteOption("negative-phase-amplitude", 0);
const phaseCount = positiveInteger("phases", 12);
const executable = option(
  "executable",
  ".tmp/eom-native-dev/attractor-ensemble-harness",
);
const analyzer = option(
  "analyzer",
  "scripts/mapping-electromagnetism/f6c-eom-coordinate-analysis.mjs",
);
const outRoot = option("out-root", ".tmp/f6c-harmonic-cycle-residual");
fs.mkdirSync(outRoot, { recursive: true });

const amplitudes = {
  positive: {
    h: positiveHAmplitude,
    rho: positiveRhoAmplitude,
    theta: positivePhaseAmplitude,
  },
  negative: {
    h: negativeHAmplitude,
    rho: negativeRhoAmplitude,
    theta: negativePhaseAmplitude,
  },
};
const rows = [];
for (let phaseIndex = 0; phaseIndex < phaseCount; phaseIndex += 1) {
  const phase = 2 * Math.PI * phaseIndex / phaseCount;
  const rowDirectory = path.join(
    outRoot,
    `phase-${String(phaseIndex).padStart(3, "0")}`,
  );
  fs.mkdirSync(rowDirectory, { recursive: true });
  const harness = spawnSync(executable, [
    "--seed-family=f6c-balanced-tetrahedral-v1",
    `--f6c-positive-rate=${rate}`,
    `--f6c-negative-rate=${rate}`,
    `--f6c-negative-theta=${negativeTheta}`,
    `--f6c-breathing-rate=${rate}`,
    `--f6c-cycle-phase=${phase}`,
    `--f6c-positive-h-amplitude=${positiveHAmplitude}`,
    `--f6c-negative-h-amplitude=${negativeHAmplitude}`,
    `--f6c-positive-rho-amplitude=${positiveRhoAmplitude}`,
    `--f6c-negative-rho-amplitude=${negativeRhoAmplitude}`,
    `--f6c-positive-phase-amplitude=${positivePhaseAmplitude}`,
    `--f6c-negative-phase-amplitude=${negativePhaseAmplitude}`,
    "--end-time=0",
    "--history-depth=8",
    "--history-segment-step=0.01",
    "--threads=8",
    `--out-dir=${rowDirectory}`,
    "--record-date=2026-08-23",
    "--generating-spec=F6c-harmonic-cycle-residual-v1",
    "--engine-build-id=local-eom-native-dev",
  ], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  if (harness.status !== 0) {
    rows.push({
      phaseIndex,
      phase,
      status: "harness-rejected",
      stderrTail: harness.stderr.trim().split("\n").slice(-3),
    });
    continue;
  }
  const analyzed = spawnSync(process.execPath, [analyzer, rowDirectory], {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  if (analyzed.status !== 0) {
    rows.push({
      phaseIndex,
      phase,
      status: "analysis-rejected",
      stderrTail: analyzed.stderr.trim().split("\n").slice(-3),
    });
    continue;
  }
  const packet = JSON.parse(analyzed.stdout);
  const sectors = {};
  for (const sector of ["positive", "negative"]) {
    const amplitude = amplitudes[sector];
    const expected = {
      h: 0.3 + amplitude.h * Math.sin(phase),
      rho: 0.3 + amplitude.rho * Math.sin(phase),
      theta: phase + amplitude.theta * Math.cos(phase)
        + (sector === "negative" ? negativeTheta : 0),
      hDot: amplitude.h * rate * Math.cos(phase),
      rhoDot: amplitude.rho * rate * Math.cos(phase),
      thetaDot: rate - amplitude.theta * rate * Math.sin(phase),
      hDDot: -amplitude.h * rate ** 2 * Math.sin(phase),
      rhoDDot: -amplitude.rho * rate ** 2 * Math.sin(phase),
      thetaDDot: -amplitude.theta * rate ** 2 * Math.cos(phase),
    };
    const observedState = packet.coordinateFrames[0].sectors[sector];
    const observedAcceleration = packet.releaseAcceleration.sectors[sector]
      .coordinateSecondDerivatives;
    const stateResidual = Object.fromEntries(
      ["h", "rho", "hDot", "rhoDot", "thetaDot"].map((coordinate) => [
        coordinate,
        observedState[coordinate] - expected[coordinate],
      ]),
    );
    const accelerationResidual = Object.fromEntries(
      ["hDDot", "rhoDDot", "thetaDDot"].map((coordinate) => [
        coordinate,
        observedAcceleration[coordinate] - expected[coordinate],
      ]),
    );
    sectors[sector] = {
      expected,
      observedAcceleration,
      stateResidual,
      accelerationResidual,
    };
  }
  rows.push({
    phaseIndex,
    phase,
    status: "certified_complete",
    minimumPairDistance:
      packet.trajectorySummary.minimumResolvedFramePair.distance,
    maximumMemberSpeed: packet.trajectorySummary.maximumMemberSpeed,
    sectors,
  });
}

const acceptedRows = rows.filter((row) => row.status === "certified_complete");
const accelerationResiduals = acceptedRows.flatMap((row) =>
  Object.values(row.sectors).flatMap((sector) =>
    Object.values(sector.accelerationResidual)),
);
const stateResiduals = acceptedRows.flatMap((row) =>
  Object.values(row.sectors).flatMap((sector) =>
    Object.values(sector.stateResidual)),
);
console.log(JSON.stringify({
  schema: "f6c-harmonic-cycle-residual/v2",
  claimGrade: "measured-eom-solver-prescribed-history-diagnostic",
  excludedClaims: [
    "evolved-return",
    "binding",
    "retention",
    "stability",
    "particle-identity",
    "independent-oracle",
  ],
  fixedHistory: {
    rate,
    negativeTheta,
    positiveHAmplitude,
    negativeHAmplitude,
    positiveRhoAmplitude,
    negativeRhoAmplitude,
    positivePhaseAmplitude,
    negativePhaseAmplitude,
    phaseCount,
    fieldSpeed: 1,
  },
  summary: {
    certifiedPhases: acceptedRows.length,
    rejectedPhases: rows.length - acceptedRows.length,
    accelerationResidualRms: accelerationResiduals.length === 0
      ? null
      : Math.sqrt(accelerationResiduals.reduce(
        (sum, value) => sum + value ** 2,
        0,
      ) / accelerationResiduals.length),
    accelerationResidualMaximum: accelerationResiduals.length === 0
      ? null
      : Math.max(...accelerationResiduals.map(Math.abs)),
    maximumStateReconstructionResidual: stateResiduals.length === 0
      ? null
      : Math.max(...stateResiduals.map(Math.abs)),
    minimumPairDistance: acceptedRows.length === 0
      ? null
      : Math.min(...acceptedRows.map((row) => row.minimumPairDistance)),
    maximumMemberSpeed: acceptedRows.length === 0
      ? null
      : Math.max(...acceptedRows.map((row) => row.maximumMemberSpeed)),
  },
  rows,
}, null, 2));
