#!/usr/bin/env node

import { evaluatePlanarCoRotatingRing } from "../../src/prescribed-path-analysis/PlanarCoRotatingRingBalance.mjs";

const scaledSpeed = 1.55;
const inventorySizes = [50, 100, 200, 400];
const rows = inventorySizes.map((n) => {
  const memberCount = 2 * n;
  const beta = 1 + scaledSpeed * n ** (-2 / 3);
  const phases = Array.from({ length: memberCount }, (_, index) => index * Math.PI / n);
  const polarities = Array.from({ length: memberCount }, (_, index) => index % 2 === 0 ? 1 : -1);
  const evaluation = evaluatePlanarCoRotatingRing({
    phases,
    polarities,
    beta,
    rootTolerance: 1e-11,
    foldTolerance: 1e-8,
  });
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

process.stdout.write(`${JSON.stringify({
  schema: "braid-program/large-n-first-birth-diagnostic.v1",
  claimGrade: "same-evaluator measured diagnostic",
  cF: 1,
  scaledCoordinate: scaledSpeed,
  rows,
  claimBoundary: "prescribed regular alternating circular-path evaluation only; no interval certificate, uniform limit, balance, evolution, retention, or stability claim",
}, null, 2)}\n`);
