import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

// Deterministic bounded search over common-frequency harmonic F6c histories.
// Each candidate is evaluated by the full-cycle release residual instrument.
// Ranking is diagnostic only: it establishes neither an evolved return nor a
// retained/stable assembly.

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

function optionalFinite(name) {
  const raw = option(name, null);
  if (raw === null) return null;
  const value = Number(raw);
  if (!Number.isFinite(value)) throw new TypeError(`${name} must be finite.`);
  return value;
}

function halton(index, base) {
  let fraction = 1;
  let result = 0;
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

const rowsRequested = positiveInteger("rows", 24);
const phaseCount = positiveInteger("phases", 8);
const seedOffset = positiveInteger("seed-offset", 1);
const outRoot = option("out-root", ".tmp/f6c-harmonic-cycle-search");
const residualScript = option(
  "residual-script",
  "scripts/mapping-electromagnetism/f6c-harmonic-cycle-residual.mjs",
);
const localScale = Number(option("local-scale", "1"));
if (!(localScale > 0) || !Number.isFinite(localScale)) {
  throw new TypeError("local-scale must be positive and finite.");
}
const localCenter = {
  rate: optionalFinite("center-rate"),
  negativeTheta: optionalFinite("center-negative-theta"),
  positiveHAmplitude: optionalFinite("center-positive-h-amplitude"),
  negativeHAmplitude: optionalFinite("center-negative-h-amplitude"),
  positiveRhoAmplitude: optionalFinite("center-positive-rho-amplitude"),
  negativeRhoAmplitude: optionalFinite("center-negative-rho-amplitude"),
  positivePhaseAmplitude: optionalFinite("center-positive-phase-amplitude"),
  negativePhaseAmplitude: optionalFinite("center-negative-phase-amplitude"),
};
const isLocal = Object.values(localCenter).every((value) => value !== null);
if (!isLocal && Object.values(localCenter).some((value) => value !== null)) {
  throw new TypeError("local refinement requires all six center coordinates.");
}
fs.mkdirSync(outRoot, { recursive: true });

const bases = [2, 3, 5, 7, 11, 13, 17, 19];
const rows = [];
for (let rowIndex = 0; rowIndex < rowsRequested; rowIndex += 1) {
  const index = seedOffset + rowIndex;
  const decode = (minimum, maximum, fraction, center = null) => center === null
    ? lerp(minimum, maximum, fraction)
    : lerp(
      center - (maximum - minimum) * localScale / 2,
      center + (maximum - minimum) * localScale / 2,
      fraction,
    );
  const parameters = {
    rate: decode(0.8, 2.0, halton(index, bases[0]), localCenter.rate),
    negativeTheta: decode(
      0,
      2 * Math.PI,
      halton(index, bases[1]),
      localCenter.negativeTheta,
    ),
    positiveHAmplitude: decode(
      -0.12, 0.12, halton(index, bases[2]), localCenter.positiveHAmplitude,
    ),
    negativeHAmplitude: decode(
      -0.12, 0.12, halton(index, bases[3]), localCenter.negativeHAmplitude,
    ),
    positiveRhoAmplitude: decode(
      -0.12, 0.12, halton(index, bases[4]), localCenter.positiveRhoAmplitude,
    ),
    negativeRhoAmplitude: decode(
      -0.12, 0.12, halton(index, bases[5]), localCenter.negativeRhoAmplitude,
    ),
    positivePhaseAmplitude: decode(
      -0.75, 0.75, halton(index, bases[6]), localCenter.positivePhaseAmplitude,
    ),
    negativePhaseAmplitude: decode(
      -0.75, 0.75, halton(index, bases[7]), localCenter.negativePhaseAmplitude,
    ),
  };
  const speedBound = (hAmplitude, rhoAmplitude, phaseAmplitude) => Math.hypot(
    Math.abs(hAmplitude) * parameters.rate,
    Math.abs(rhoAmplitude) * parameters.rate,
    (0.3 + Math.abs(rhoAmplitude)) * parameters.rate
      * (1 + Math.abs(phaseAmplitude)),
  );
  parameters.maximumPrescribedSpeedBound = Math.max(
    speedBound(
      parameters.positiveHAmplitude,
      parameters.positiveRhoAmplitude,
      parameters.positivePhaseAmplitude,
    ),
    speedBound(
      parameters.negativeHAmplitude,
      parameters.negativeRhoAmplitude,
      parameters.negativePhaseAmplitude,
    ),
  );
  if (parameters.maximumPrescribedSpeedBound >= 0.85) {
    rows.push({ rowIndex, parameters, status: "speed-margin-rejected" });
    continue;
  }
  const rowDirectory = path.join(outRoot, `row-${String(rowIndex).padStart(3, "0")}`);
  const evaluated = spawnSync(process.execPath, [
    residualScript,
    `--rate=${parameters.rate}`,
    `--negative-theta=${parameters.negativeTheta}`,
    `--positive-h-amplitude=${parameters.positiveHAmplitude}`,
    `--negative-h-amplitude=${parameters.negativeHAmplitude}`,
    `--positive-rho-amplitude=${parameters.positiveRhoAmplitude}`,
    `--negative-rho-amplitude=${parameters.negativeRhoAmplitude}`,
    `--positive-phase-amplitude=${parameters.positivePhaseAmplitude}`,
    `--negative-phase-amplitude=${parameters.negativePhaseAmplitude}`,
    `--phases=${phaseCount}`,
    `--out-root=${rowDirectory}`,
  ], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  if (evaluated.status !== 0) {
    rows.push({
      rowIndex,
      parameters,
      status: "cycle-instrument-rejected",
      stderrTail: evaluated.stderr.trim().split("\n").slice(-3),
    });
    continue;
  }
  const packet = JSON.parse(evaluated.stdout);
  rows.push({
    rowIndex,
    parameters,
    status: packet.summary.rejectedPhases === 0
      ? "certified-complete-cycle-sample"
      : "incomplete-cycle-sample",
    ...packet.summary,
  });
}

const ranked = rows.filter((row) =>
  row.status === "certified-complete-cycle-sample"
  && row.minimumPairDistance > 0.12)
  .sort((left, right) =>
    left.accelerationResidualRms - right.accelerationResidualRms
    || right.minimumPairDistance - left.minimumPairDistance);
console.log(JSON.stringify({
  schema: "f6c-harmonic-cycle-search/v2",
  claimGrade: "measured-eom-solver-bounded-prescribed-history-search",
  excludedClaims: [
    "evolved-return",
    "binding",
    "retention",
    "stability",
    "particle-identity",
    "global-optimum",
    "independent-oracle",
  ],
  search: {
    rowsRequested,
    phaseCount,
    seedOffset,
    rateRange: [0.8, 2.0],
    amplitudeRange: [-0.12, 0.12],
    phaseModulationAmplitudeRange: [-0.75, 0.75],
    speedBoundMaximum: 0.85,
    rankingClearanceFloor: 0.12,
    localCenter: isLocal ? localCenter : null,
    localScale: isLocal ? localScale : null,
    rankedRows: ranked.length,
  },
  bestRows: ranked.slice(0, 8),
  rows,
}, null, 2));
