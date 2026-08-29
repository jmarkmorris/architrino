#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  DEFAULT_ORTHOGONAL_PLANE_WEAVE_OPTIONS,
  evaluateOrthogonalPlaneWeaveCycle,
  scanOrthogonalPlaneWeaveBetas,
} from "../../src/prescribed-path-analysis/OrthogonalPlaneWeaveBalance.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SEED_BETA = 3.070356625390253;
const BINARY_ZERO_BETAS = [
  3.070356625390253,
  6.218454963409138,
  9.376436028216506,
];
const PROVENANCE_PATHS = [
  "src/prescribed-path-analysis/OrthogonalPlaneWeaveBalance.mjs",
  "scripts/prescribed-path-analysis/run-orthogonal-plane-weave-balance.mjs",
  "scripts/equation-mapping/analyze-circular-self-hit-binary.mjs",
  "content/markdown/aaa/dynamics/master-equation.md",
  "content/markdown/aaa/noether-braid/braid-family-a.md",
  "content/markdown/aaa/noether-braid/braid-a2-symmetry-and-return-response.md",
  "reference/priorities/braid-program/brainstorming.md",
  "reference/priorities/braid-program/configurations/family-a-a1-2-equal-frequency-equal-radius.v2.json",
  "reference/priorities/braid-program/configurations/family-a-a2-fully-symmetric.v2.json",
];

function parseArguments(argv) {
  const output = { write: null };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--write") {
      output.write = argv[index + 1];
      index += 1;
    } else {
      throw new Error(`unknown argument: ${argument}`);
    }
  }
  return output;
}

function sha256File(relativePath) {
  return createHash("sha256")
    .update(readFileSync(path.join(ROOT, relativePath)))
    .digest("hex");
}

function fixedGrid(start, end, step) {
  const count = Math.round((end - start) / step);
  return Array.from({ length: count + 1 }, (_, index) =>
    Number((start + index * step).toFixed(12)));
}

function compactRoot(root) {
  return {
    rootId: root.rootId,
    identity: root.identity,
    multiplicity: root.multiplicity,
    emissionTime: root.emissionTime,
    delay: root.delay,
    separation: root.separation,
    distance: root.distance,
    rootResidual: root.rootResidual,
    squaredRootResidual: root.squaredRootResidual,
    transmitterSideFactorDt: root.transmitterSideFactorDt,
    receiverSideFactorDr: root.receiverSideFactorDr,
    rootPlaybackDerivative: root.rootPlaybackDerivative,
    accelerationWeight: root.accelerationWeight,
    jacobianFloor: root.jacobianFloor,
    regular: root.regular,
    polaritySign: root.polaritySign,
    accelerationContribution: root.accelerationContribution,
    isolation: root.isolation,
    finalBracket: root.finalBracket,
  };
}

function compactCycle(cycle) {
  return {
    beta: cycle.scan.beta,
    phaseSampleCount: cycle.scan.phaseSampleCount,
    fullPeriodInReceptionTime: cycle.scan.fullPeriodInReceptionTime,
    summary: cycle.summary,
    directedPairPhaseRootCounts: cycle.phaseEvaluations.flatMap((phase) =>
      phase.receivers.flatMap((receiver) => receiver.directedPairs.map((pair) => ({
        phase: phase.phase,
        receiverId: receiver.receiverId,
        transmitterId: pair.transmitterId,
        rootCount: pair.rootCount,
        complete: pair.complete,
        unresolvedIntervalCount: pair.unresolvedIntervals.length,
      })))),
    rootLedgers: cycle.phaseEvaluations.map((phase) => ({
      phase: phase.phase,
      receptionTime: phase.receptionTime,
      rootComplete: phase.rootComplete,
      regular: phase.regular,
      maximumRootResidual: phase.maximumRootResidual,
      minimumJacobianFloor: phase.minimumJacobianFloor,
      receivers: phase.receivers.map((receiver) => ({
        receiverId: receiver.receiverId,
        position: receiver.position,
        velocity: receiver.velocity,
        prescribedAcceleration: receiver.prescribedAcceleration,
        basis: receiver.basis,
        rootCount: receiver.rootCount,
        masterAcceleration: receiver.masterAcceleration,
        masterAccelerationProjections: receiver.masterAccelerationProjections,
        compatibleRadiusFromRadial: receiver.compatibleRadiusFromRadial,
        directedPairs: receiver.directedPairs.map((pair) => ({
          pairId: pair.pairId,
          sameTransmitter: pair.sameTransmitter,
          sameBinary: pair.sameBinary,
          coincidentSelfRootExcluded: pair.coincidentSelfRootExcluded,
          rootCount: pair.rootCount,
          roots: pair.roots.map(compactRoot),
          inactiveRootGaps: pair.inactiveRootGaps,
          unresolvedIntervals: pair.unresolvedIntervals,
          complete: pair.complete,
        })),
      })),
    })),
  };
}

function summaryOnly(beta, phaseSampleCount) {
  const { residualRows: _residualRows, ...summary } = evaluateOrthogonalPlaneWeaveCycle({
    beta,
    phaseSampleCount,
    includeFullLedgers: false,
  }).summary;
  return summary;
}

function compactScanRows(rows) {
  return rows.map(({ residualRows: _residualRows, ...row }) => row);
}

function buildEvidence() {
  const coarseBetas = [...new Set([
    ...fixedGrid(0.25, 12, 0.05),
    SEED_BETA,
    ...BINARY_ZERO_BETAS,
  ])].sort((left, right) => left - right);
  const coarseScan = scanOrthogonalPlaneWeaveBetas({
    betas: coarseBetas,
    phaseSampleCount: 12,
  });
  const fineBetas = fixedGrid(6.45, 6.6, 0.002);
  const fineScan = scanOrthogonalPlaneWeaveBetas({
    betas: fineBetas,
    phaseSampleCount: 12,
  });
  const bestSampledRow = [...coarseScan, ...fineScan]
    .filter((row) => row.rootComplete && row.regular)
    .sort((left, right) =>
      left.maximumAbsoluteTransverseVector - right.maximumAbsoluteTransverseVector)[0];
  assert.ok(bestSampledRow);
  const { residualRows: _bestResidualRows, ...compactBestSampledRow } = bestSampledRow;
  const selectedBeta = bestSampledRow.beta;
  const refinementCounts = [12, 24, 48, 96];
  const seedRefinement = refinementCounts.map((phaseSampleCount) =>
    summaryOnly(SEED_BETA, phaseSampleCount));
  const selectedRefinement = refinementCounts.map((phaseSampleCount) =>
    summaryOnly(selectedBeta, phaseSampleCount));
  const seedCycle = compactCycle(evaluateOrthogonalPlaneWeaveCycle({
    beta: SEED_BETA,
    phaseSampleCount: 24,
  }));
  const selectedCycle = compactCycle(evaluateOrthogonalPlaneWeaveCycle({
    beta: selectedBeta,
    phaseSampleCount: 24,
  }));
  const binaryZeroRows = BINARY_ZERO_BETAS.map((beta) =>
    summaryOnly(beta, 48));

  return {
    schema: "braid-program/orthogonal-plane-weave-complete-cycle-evidence.v1",
    date: "2026-08-29",
    disposition: {
      declaredCategory:
        "remains unresolved because a continuous-beta and continuous-phase enclosure is absent",
      boundedFinding:
        "Every evaluated beta, including the first three complete-binary tangential zeros, fails the sampled six-worldline acceleration-balance requirement. The binary seed is decisively rejected by ordinary-phase residuals and phase-dependent root counts.",
      candidateStatus: "no bounded candidate",
      taxonomyStatus: "unchanged",
      retentionStatus: "not evaluated",
      stabilityStatus: "not eligible because acceleration balance is absent",
    },
    geometry: seedCycle.rootLedgers.length > 0
      ? evaluateOrthogonalPlaneWeaveCycle({
        beta: SEED_BETA,
        phaseSampleCount: 12,
        includeFullLedgers: false,
      }).geometry
      : null,
    modelScope: {
      fieldSpeed: 1,
      masterEquation: "default uncapped canonical Master Equation",
      fieldSpeedCeilingApplied: false,
      radiusScaling:
        "root geometry uses R=1; for each beta the radial projection selects a compatible R in units kappa*abs(q)^2/c_f^2 only if every phase is inward",
      prescribedHistoryOnly: true,
      eomSolverInvoked: false,
    },
    search: {
      coarse: {
        betaDomain: [0.25, 12],
        betaStep: 0.05,
        addedBetas: [SEED_BETA, ...BINARY_ZERO_BETAS],
        phaseSampleCount: 12,
        rows: compactScanRows(coarseScan),
      },
      refinement: {
        betaDomain: [6.45, 6.6],
        betaStep: 0.002,
        phaseSampleCount: 12,
        rows: compactScanRows(fineScan),
      },
      bestSampledRow: compactBestSampledRow,
      binaryCircularTangentialZeroControls: binaryZeroRows,
      phaseRefinement: {
        sampleCounts: refinementCounts,
        seed: seedRefinement,
        bestSampledBeta: selectedRefinement,
      },
    },
    completeRootLedgers: {
      seed: seedCycle,
      bestSampledBeta: selectedCycle,
    },
    numericalCertification: {
      tolerances: {
        geometryIdentity: 2e-12,
        ...DEFAULT_ORTHOGONAL_PLANE_WEAVE_OPTIONS,
      },
      crossPairRootCompleteness:
        "At each reported sample, every squared causal-residual interval is certified root-free or monotonic with every sign-changing monotonic interval bisected.",
      sameBinaryRootCompleteness:
        "The independently existing canonical circular half-lobe enumerator supplies every nontrivial same-transmitter and antipodal-partner root.",
      continuousPhaseEnclosure: false,
      continuousBetaEnclosure: false,
      unresolvedFoldRule:
        "Any phase or beta interval containing an unisolated D_t=0 fold remains outside the ordinary simple-root acceleration chart.",
    },
    provenance: {
      files: PROVENANCE_PATHS.map((relativePath) => ({
        path: relativePath,
        sha256: sha256File(relativePath),
      })),
      reproductionCommand:
        "node scripts/prescribed-path-analysis/run-orthogonal-plane-weave-balance.mjs --write reference/priorities/braid-program/evidence/2026-08-29-orthogonal-plane-weave-complete-cycle.v1.json",
    },
    claimGrades: {
      geometry: "derived",
      sampledRootLedgersAndResiduals: "measured by the focused evaluator",
      boundedNoCandidateFinding: "inferred from the declared finite beta and phase grids",
      globalLocusDecision: "unresolved",
    },
    independentChecks: {
      geometryAndKinematics:
        "Closed-form explicit-coordinate identities in tests/orthogonal-plane-weave-balance.test.js are separate from the phase-compensated frame evaluation path.",
      sameBinaryRoots:
        "scripts/equation-mapping/analyze-circular-self-hit-binary.mjs is independently authored and unchanged in this work.",
      crossPairRootResiduals:
        "Every reported cross-pair root is checked against the direct-coordinate squared causal equation in the targeted test.",
      accelerationOracle:
        "missing: no independently authored full six-worldline Master Equation acceleration sum is available",
    },
    falsifiers: [
      "An independent root oracle finds an omitted root or invalidates a retained root in either complete ledger.",
      "An independent canonical acceleration sum removes the reported transverse or outward-radial mismatch on the same root ledger.",
      "A continuous beta-phase enclosure isolates a regular branch with zero two-transverse residuals and one common positive compatible radius.",
    ],
    exclusions: [
      "No stability, perturbation, retention, binding, or physical-realization inference is made.",
      "No variable-speed, breathing, precessing-plane, or other three-dimensional 3:3 history is rejected.",
      "No N>3 family is defined or promoted.",
    ],
  };
}

const args = parseArguments(process.argv.slice(2));
const evidence = buildEvidence();
const rendered = `${JSON.stringify(evidence, null, 2)}\n`;
if (args.write) {
  const outputPath = path.resolve(ROOT, args.write);
  writeFileSync(outputPath, rendered);
} else {
  process.stdout.write(rendered);
}
