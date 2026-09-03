#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

import {
  buildRegularCircularRootKernel,
  evaluatePlanarCoRotatingRing,
  projectRegularPolarityKernel,
  regularRingPhases,
} from "../../src/prescribed-path-analysis/PlanarCoRotatingRingBalance.mjs";

export const SPEED_DOMAIN = Object.freeze([0.05, 20]);
export const DIAGNOSTIC_SPEEDS = Object.freeze([0.05, 0.5, 0.99, 1.01, 3.070356625390253, 10, 20]);

const polaritiesFor = (word) => [...word].map((value) => value === "+" ? 1 : -1);
const foldCoordinate = (beta) => Math.sqrt(beta * beta - 1) - Math.acos(1 / beta);

function adjacentFloat(value, direction) {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, value, false);
  const bits = view.getBigUint64(0, false) + BigInt(direction);
  view.setBigUint64(0, bits, false);
  return view.getFloat64(0, false);
}

function invertFoldCoordinate(target) {
  let lo = 1;
  let hi = SPEED_DOMAIN[1];
  for (let iteration = 0; iteration < 100; iteration += 1) {
    const mid = (lo + hi) / 2;
    if (foldCoordinate(mid) < target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export function topologySchedule(n) {
  if (!Number.isSafeInteger(n) || n < 1) throw new TypeError("N must be a positive integer");
  const maximumQ = Math.floor((2 * n * foldCoordinate(SPEED_DOMAIN[1])) / Math.PI);
  const boundaries = Array.from({ length: maximumQ }, (_, index) => {
    const q = index + 1;
    const beta = invertFoldCoordinate(Math.PI * q / (2 * n));
    return {
      q,
      exactEquation: `M(beta)=pi*${q}/${2 * n}`,
      beta,
      probeBelow: adjacentFloat(beta, -1),
      probeAbove: adjacentFloat(beta, 1),
    };
  }).filter((row) => row.beta > SPEED_DOMAIN[0] && row.beta < SPEED_DOMAIN[1]);
  const endpoints = [SPEED_DOMAIN[0], ...boundaries.map((row) => row.beta), SPEED_DOMAIN[1]];
  return {
    n,
    speedDomain: SPEED_DOMAIN,
    foldBoundaries: boundaries,
    openTopologyCells: endpoints.slice(0, -1).map((lower, index) => ({
      lower,
      upper: endpoints[index + 1],
      representative: (lower + endpoints[index + 1]) / 2,
    })),
    boundaryProbeRule: "for every fold beta_q, evaluate nextDown(beta_q) and nextUp(beta_q); never treat either floating probe as an interval exclusion",
    derivation: "all regular phase differences give M(beta)=pi*q/(2N), q positive integer, where M(beta)=sqrt(beta^2-1)-acos(1/beta)",
  };
}

function close(actual, expected, tolerance = 5e-10) {
  return Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected));
}

export function runDiagnosticCensus(manifest, speeds = DIAGNOSTIC_SPEEDS) {
  if (manifest.schema !== "braid-program/regular-polarity-orbit-manifest.v1") throw new TypeError("unexpected manifest schema");
  const inventories = manifest.inventories.filter((row) => row.n >= 7 && row.n <= 12);
  const rows = [];
  for (const inventory of inventories) {
    for (const beta of speeds) {
      const kernel = buildRegularCircularRootKernel({ n: inventory.n, beta });
      if (!kernel.rootCompleteness.complete) throw new Error(`unresolved fold at N=${inventory.n}, beta=${beta}`);
      let best = null;
      for (const representative of inventory.representatives) {
        const projection = projectRegularPolarityKernel({ kernel, polarities: polaritiesFor(representative.canonicalWord) });
        const candidate = {
          classId: representative.classId,
          canonicalWord: representative.canonicalWord,
          subclass: representative.subclass,
          maximumFullVectorResidual: projection.residuals.maximumFullVector,
          compatibleScale: projection.compatibleScale,
        };
        if (best == null || candidate.maximumFullVectorResidual < best.maximumFullVectorResidual) best = candidate;
      }
      const controls = [best, {
        classId: inventory.representatives[0].classId,
        canonicalWord: inventory.representatives[0].canonicalWord,
        subclass: inventory.representatives[0].subclass,
      }].filter((row, index, all) => all.findIndex((other) => other.classId === row.classId) === index).map((row) => {
        const polarities = polaritiesFor(row.canonicalWord);
        const shared = projectRegularPolarityKernel({ kernel, polarities });
        const direct = evaluatePlanarCoRotatingRing({ phases: regularRingPhases(inventory.n), polarities, beta });
        return {
          classId: row.classId,
          role: row.classId === best.classId ? "finite-point minimizer" : "negative control",
          directMaximumFullVectorResidual: direct.residuals.maximumFullVector,
          sharedMaximumFullVectorResidual: shared.residuals.maximumFullVector,
          agreed: close(direct.residuals.maximumFullVector, shared.residuals.maximumFullVector),
        };
      });
      if (!controls.every((row) => row.agreed)) throw new Error("unchanged full evaluator disagrees with shared projection");
      rows.push({
        n: inventory.n,
        beta,
        representatives: inventory.representatives.length,
        rootCountPerReceiver: kernel.rootCountPerReceiver,
        topologySignature: kernel.entries.map((entry) => entry.roots.length).join(","),
        minimumJacobianFloor: kernel.rootCompleteness.minimumJacobianFloor,
        best,
        unchangedFullEvaluatorChecks: controls,
      });
    }
  }
  return {
    schema: "braid-program/bp012-bounded-speed-diagnostic-census.v1",
    speedDomain: SPEED_DOMAIN,
    diagnosticSpeeds: speeds,
    topologySchedules: inventories.map((row) => topologySchedule(row.n)),
    rows,
    census: {
      inventories: inventories.length,
      speedsPerInventory: speeds.length,
      projectedRepresentatives: rows.reduce((sum, row) => sum + row.representatives, 0),
      unchangedFullEvaluatorChecks: rows.reduce((sum, row) => sum + row.unchangedFullEvaluatorChecks.length, 0),
    },
    claimBoundary: "measured finite-point census on a frozen bounded schedule; fold equations and topology cells are derived, but no finite residual minimum is a continuous speed-domain or interval-certified exclusion",
    falsifier: "a missing balanced representative, a wrong fold equation, an unresolved scheduled fold, a smaller retained residual than reported, or disagreement with the unchanged full evaluator at a recorded control",
  };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const manifestPath = process.argv[2] ?? ".local-data/braid-analysis/bp012-regular-polarity-20260902/regular-polarity-orbit-manifest.v2.json";
  console.log(JSON.stringify(runDiagnosticCensus(JSON.parse(readFileSync(manifestPath))), null, 2));
}
