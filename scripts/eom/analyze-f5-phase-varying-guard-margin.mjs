#!/usr/bin/env node

// Independent bounded search and continuous-guard certificate for the
// campaign-scoped revised F5 representative. This instrument is authored
// directly from the displayed owner equations and imports no production
// prescribed-worldline evaluator or EOM solver path.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const outputIndex = process.argv.indexOf("--out");
if (outputIndex < 0 || !process.argv[outputIndex + 1]) {
  throw new Error("usage: analyze-f5-phase-varying-guard-margin.mjs --out <path>");
}

const outputPath = path.resolve(process.argv[outputIndex + 1]);
const predeclaration = Object.freeze({
  schema: "f5_phase_varying_guard_search_predeclaration/v1",
  candidate: "F5-revised-phase-varying-campaign-realization",
  claimScope: "campaign-scoped representative selection and prescribed-history H2/H3 guards only",
  normalizedFieldSpeed: 1,
  fixed: {
    assemblyCenter: [0, 0, 0],
    bodyAxes: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    axialHalfSeparation: 0.31,
    transverseRadii: [0.30, 0.22],
    positiveAmplitude: 0.24,
    negativeAmplitude: 0.27,
    positivePhase: 0,
  },
  stage1: { branchSheets: 64, relativePhaseSamples: 48, cycleSamples: 128 },
  stage2: { retainedRows: 4, relativePhaseSamples: 65, cycleSamples: 1024, halfWidthCoarseCells: 1 },
  certificate: { cycleSamples: 65536, continuousMethod: "sample-minus-global-pair-lipschitz" },
  speedPolicy: { conservativeMaximum: 0.5, normalizedCf: 1 },
  retainedHistoryDepth: 1,
  tieBreak: "lexicographic-branch-signs-then-relative-phase",
});

const TAU = 2 * Math.PI;
const axes = predeclaration.fixed.bodyAxes;
const h = predeclaration.fixed.axialHalfSeparation;
const [rho1, rho2] = predeclaration.fixed.transverseRadii;
const amplitudes = [predeclaration.fixed.positiveAmplitude, predeclaration.fixed.negativeAmplitude];

function add(left, right) {
  return [left[0] + right[0], left[1] + right[1], left[2] + right[2]];
}

function subtract(left, right) {
  return [left[0] - right[0], left[1] - right[1], left[2] - right[2]];
}

function scale(vector, scalar) {
  return [vector[0] * scalar, vector[1] * scalar, vector[2] * scalar];
}

function dot(left, right) {
  return left[0] * right[0] + left[1] * right[1] + left[2] * right[2];
}

function norm(vector) {
  return Math.sqrt(dot(vector, vector));
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function branchSigns(mask) {
  return Array.from({ length: 6 }, (_, index) => ((mask >> index) & 1) === 0 ? -1 : 1);
}

function sectorMembers(theta, sigma, amplitude, phase, signs) {
  const angle = theta + phase;
  const [u, v, w] = [angle, angle - 2 * Math.PI / 3, angle + 2 * Math.PI / 3]
    .map((row) => amplitude * Math.cos(row));
  const resultants = [[0, v, w], [u, 0, -w], [-u, -v, 0]];
  const members = [];
  for (let axisIndex = 0; axisIndex < 3; axisIndex += 1) {
    const axis = axes[axisIndex];
    const resultant = resultants[axisIndex];
    const kappa = norm(resultant);
    const e = scale(resultant, 1 / kappa);
    const tangent = cross(axis, e);
    const alpha = (kappa ** 2 + rho1 ** 2 - rho2 ** 2) / (2 * kappa);
    const beta = Math.sqrt(rho1 ** 2 - alpha ** 2);
    const r1 = add(scale(e, alpha), scale(tangent, signs[axisIndex] * beta));
    const r2 = subtract(resultant, r1);
    members.push(add(scale(axis, sigma * h), r1));
    members.push(add(scale(axis, -sigma * h), r2));
  }
  return members;
}

function positions(theta, relativePhase, signs) {
  return [
    ...sectorMembers(theta, 1, amplitudes[0], 0, signs.slice(0, 3)),
    ...sectorMembers(theta, -1, amplitudes[1], relativePhase, signs.slice(3, 6)),
  ];
}

function minimumPairDistance(points) {
  let minimum = Infinity;
  let pair = null;
  for (let left = 0; left < points.length; left += 1) {
    for (let right = left + 1; right < points.length; right += 1) {
      const distance = norm(subtract(points[left], points[right]));
      if (distance < minimum) {
        minimum = distance;
        pair = [left, right];
      }
    }
  }
  return { minimum, pair };
}

function sampledClearance(signs, relativePhase, samples) {
  let minimum = Infinity;
  let minimumPair = null;
  let minimumCycleIndex = null;
  for (let sample = 0; sample < samples; sample += 1) {
    const row = minimumPairDistance(positions(TAU * sample / samples, relativePhase, signs));
    if (row.minimum < minimum) {
      minimum = row.minimum;
      minimumPair = row.pair;
      minimumCycleIndex = sample;
    }
  }
  return { minimum, minimumPair, minimumCycleIndex };
}

function compareRows(left, right) {
  if (left.clearance !== right.clearance) return right.clearance - left.clearance;
  const leftSigns = left.signs.join(",");
  const rightSigns = right.signs.join(",");
  if (leftSigns !== rightSigns) return leftSigns.localeCompare(rightSigns);
  return left.relativePhase - right.relativePhase;
}

function unitFrequencySpeedBound(amplitude, ringIndex) {
  const kappaMinimum = amplitude / Math.sqrt(2);
  const kappaMaximum = amplitude * Math.sqrt(3 / 2);
  const kappaRateBound = Math.sqrt(2) * amplitude;
  const difference = rho1 ** 2 - rho2 ** 2;
  const alphaRateFactor = Math.max(
    Math.abs(0.5 - difference / (2 * kappaMinimum ** 2)),
    Math.abs(0.5 - difference / (2 * kappaMaximum ** 2)),
  );
  const alphaRateBound = alphaRateFactor * kappaRateBound;
  const betaAt = (kappa) => {
    const alpha = (kappa ** 2 + difference) / (2 * kappa);
    return Math.sqrt(rho1 ** 2 - alpha ** 2);
  };
  const betaMinimum = Math.min(betaAt(kappaMinimum), betaAt(kappaMaximum));
  const betaRateBound = rho1 * alphaRateBound / betaMinimum;
  return ringIndex === 1
    ? alphaRateBound + betaRateBound + 4 * rho1
    : kappaRateBound + alphaRateBound + betaRateBound + 4 * rho2;
}

function heartbeat(stage, detail) {
  process.stderr.write(`${new Date().toISOString()} stage=${stage} ${detail}\n`);
}

const startedAt = new Date();
const stage1Rows = [];
heartbeat("stage1", "started");
for (let mask = 0; mask < predeclaration.stage1.branchSheets; mask += 1) {
  const signs = branchSigns(mask);
  for (let phaseIndex = 0; phaseIndex < predeclaration.stage1.relativePhaseSamples; phaseIndex += 1) {
    const relativePhase = TAU * phaseIndex / predeclaration.stage1.relativePhaseSamples;
    const row = sampledClearance(signs, relativePhase, predeclaration.stage1.cycleSamples);
    stage1Rows.push({ signs, relativePhase, clearance: row.minimum });
  }
  if ((mask + 1) % 16 === 0) heartbeat("stage1", `branchSheets=${mask + 1}/64`);
}
stage1Rows.sort(compareRows);

heartbeat("stage2", "started");
const stage2Rows = [];
const coarseWidth = TAU / predeclaration.stage1.relativePhaseSamples;
for (const seed of stage1Rows.slice(0, predeclaration.stage2.retainedRows)) {
  for (let phaseIndex = 0; phaseIndex < predeclaration.stage2.relativePhaseSamples; phaseIndex += 1) {
    const fraction = phaseIndex / (predeclaration.stage2.relativePhaseSamples - 1);
    let relativePhase = seed.relativePhase + coarseWidth * (2 * fraction - 1);
    relativePhase = ((relativePhase % TAU) + TAU) % TAU;
    const row = sampledClearance(seed.signs, relativePhase, predeclaration.stage2.cycleSamples);
    stage2Rows.push({
      signs: seed.signs,
      relativePhase,
      clearance: row.minimum,
      minimumPair: row.minimumPair,
      minimumCycleIndex: row.minimumCycleIndex,
    });
  }
}
stage2Rows.sort(compareRows);
const selected = stage2Rows[0];

heartbeat("certificate", "started");
const certificateSample = sampledClearance(
  selected.signs,
  selected.relativePhase,
  predeclaration.certificate.cycleSamples,
);
const unitSpeedBounds = amplitudes.flatMap((amplitude) => [
  unitFrequencySpeedBound(amplitude, 1),
  unitFrequencySpeedBound(amplitude, 2),
]);
const maximumUnitFrequencySpeedBound = Math.max(...unitSpeedBounds);
const phaseGridHalfWidth = Math.PI / predeclaration.certificate.cycleSamples;
const continuousClearanceLowerBound = certificateSample.minimum
  - 2 * maximumUnitFrequencySpeedBound * phaseGridHalfWidth;
const angularFrequency = predeclaration.speedPolicy.conservativeMaximum
  / maximumUnitFrequencySpeedBound;
const returnPeriod = TAU / angularFrequency;
const centeredRadiusBound = Math.sqrt(h ** 2 + rho1 ** 2);
const maximumPossibleRootDelay = 2 * centeredRadiusBound;
const memberOrder = [];
for (const sector of [
  { name: "positive", polarity: 1, signOffset: 0, amplitude: amplitudes[0], phase: 0 },
  { name: "negative", polarity: -1, signOffset: 3, amplitude: amplitudes[1], phase: selected.relativePhase },
]) {
  for (let axisIndex = 0; axisIndex < 3; axisIndex += 1) {
    for (const ringIndex of [1, 2]) {
      memberOrder.push({
        constituentId: `f5-axis-${axisIndex + 1}-ring-${ringIndex}-${sector.name}-architrino`,
        worldlineId: `f5-axis-${axisIndex + 1}-ring-${ringIndex}-${sector.name}-worldline`,
        axisIndex,
        ringIndex,
        polarity: sector.polarity,
        branchSign: selected.signs[sector.signOffset + axisIndex],
        amplitude: sector.amplitude,
        phase: sector.phase,
      });
    }
  }
}

const canonicalPredeclaration = JSON.stringify(predeclaration);
const result = {
  schema: "f5_phase_varying_guard_search_result/v1",
  predeclaration,
  predeclarationSha256: crypto.createHash("sha256").update(canonicalPredeclaration).digest("hex"),
  startedAt: startedAt.toISOString(),
  completedAt: new Date().toISOString(),
  stage1Best: stage1Rows.slice(0, 8),
  stage2Best: stage2Rows.slice(0, 8),
  selected: {
    ...selected,
    certificateSample,
    maximumUnitFrequencySpeedBound,
    phaseGridHalfWidth,
    continuousClearanceLowerBound,
    collisionGuardPassed: continuousClearanceLowerBound > 0,
    angularFrequency,
    conservativeMaximumSpeed: angularFrequency * maximumUnitFrequencySpeedBound,
    speedMargin: 1 - angularFrequency * maximumUnitFrequencySpeedBound,
    returnPeriod,
    retainedHistoryDepth: predeclaration.retainedHistoryDepth,
    centeredRadiusBound,
    maximumPossibleRootDelay,
    historyCoveragePassed: predeclaration.retainedHistoryDepth > maximumPossibleRootDelay,
    memberOrder,
  },
  claimGrade: "measured-bounded-search-plus-derived-lipschitz-certificate",
  establishes: [
    "one reproducible campaign-scoped numerical F5 row",
    "stable member identity and source-order proposal",
    "continuous prescribed-history point noncoincidence for the selected row",
    "strict c_f=1 conservative speed guard for the selected row",
    "release-root delay coverage by the selected retained-history depth",
  ],
  excludes: [
    "operator-approved or canonical display selection",
    "EOM compatibility",
    "causal-root completeness",
    "return under ordinary evolution",
    "binding, retention, stability, particle identity, or physical realization",
    "global optimization over the continuous F5 parameter family",
  ],
  falsifier: "an independently reconstructed member pair falls below the certified clearance bound, a member exceeds the conservative speed bound, or a release root requires delay beyond the centered-radius bound",
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
heartbeat("complete", `output=${outputPath}`);
process.stdout.write(`${JSON.stringify({
  outputPath,
  predeclarationSha256: result.predeclarationSha256,
  selected: result.selected,
}, null, 2)}\n`);
