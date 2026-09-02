#!/usr/bin/env node

import { evaluatePlanarCoRotatingRing } from "../../src/prescribed-path-analysis/PlanarCoRotatingRingBalance.mjs";

const scaledSpeed = 1.55;
const inventorySizes = [50, 100, 200, 400];
const makeEvaluation = (n, beta) => {
  const memberCount = 2 * n;
  const phases = Array.from({ length: memberCount }, (_, index) => index * Math.PI / n);
  const polarities = Array.from({ length: memberCount }, (_, index) => index % 2 === 0 ? 1 : -1);
  return evaluatePlanarCoRotatingRing({
    phases,
    polarities,
    beta,
    rootTolerance: 1e-11,
    foldTolerance: 1e-8,
  });
};

const firstFoldBeta = (n) => {
  const target = Math.PI / (2 * n);
  let lower = 0;
  let upper = 1;
  while (Math.tan(upper) - upper < target) {
    upper *= 1.2;
  }
  for (let iteration = 0; iteration < 100; iteration += 1) {
    const midpoint = (lower + upper) / 2;
    if (Math.tan(midpoint) - midpoint < target) {
      lower = midpoint;
    } else {
      upper = midpoint;
    }
  }
  return 1 / Math.cos((lower + upper) / 2);
};

const rows = inventorySizes.map((n) => {
  const memberCount = 2 * n;
  const beta = 1 + scaledSpeed * n ** (-2 / 3);
  const evaluation = makeEvaluation(n, beta);
  const receiver = evaluation.receivers[0];
  return {
    n,
    memberCount,
    beta,
    rootsPerReceiver: receiver.directedPairs.reduce((sum, pair) => sum + pair.rootCount, 0),
    foldEventCount: evaluation.rootCompleteness.foldEvents.length,
    tangentialCoefficient: receiver.tangentialCoefficient,
    tangentialOverNSquared: receiver.tangentialCoefficient / n ** 2,
    differenceFromOneSixth: receiver.tangentialCoefficient / n ** 2 - 1 / 6,
  };
});

const boundaryLayerRows = inventorySizes.map((n) => {
  const foldBeta = firstFoldBeta(n);
  const beta = foldBeta + 2 / (Math.PI ** 2 * n ** 2);
  const evaluation = makeEvaluation(n, beta);
  const receiver = evaluation.receivers[0];
  return {
    n,
    foldBeta,
    beta,
    scaledOffset: n ** 2 * (beta - foldBeta),
    rootsPerReceiver: receiver.directedPairs.reduce((sum, pair) => sum + pair.rootCount, 0),
    foldEventCount: evaluation.rootCompleteness.foldEvents.length,
    tangentialCoefficient: receiver.tangentialCoefficient,
    tangentialOverNFourThirds: receiver.tangentialCoefficient / n ** (4 / 3),
  };
});

process.stdout.write(`${JSON.stringify({
  schema: "braid-program/large-n-first-birth-diagnostic.v1",
  claimGrade: "same-evaluator measured diagnostic",
  cF: 1,
  scaledCoordinate: scaledSpeed,
  rows,
  predictedBoundaryOffset: 2 / Math.PI ** 2,
  boundaryLayerRows,
  claimBoundary: "prescribed regular alternating circular-path evaluation only; no interval certificate, uniform limit, balance, evolution, retention, or stability claim",
}, null, 2)}\n`);
