#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

import {
  evaluateB1StreamingSurfaceReductions,
} from "../../src/prescribed-path-analysis/B1StreamingReductions.mjs";
import {
  evaluateCompleteCycleCandidate,
} from "../../src/prescribed-path-analysis/CompleteCycleAnalyticalCampaign.mjs";
import {
  loadAllCandidateCampaignRegistry,
} from "../../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  createPrescribedBraidExactSourceRecord,
} from "./generate-prescribed-braid-record.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const REPORT_SCHEMA =
  "prescribed-record-analytics/analytical-gate-adjudication-report.v1";
const DEFAULT_OUTPUT = path.resolve(
  ".local-data/braid-analysis/gate-adjudication/targeted-resolution-ladders.v1.json",
);

const SURFACE_CANDIDATES = Object.freeze(["B1.3", "B1.1", "C1"]);
const SENSITIVITY_CANDIDATES = Object.freeze(["A1.2", "A2"]);
const SURFACE_LEVELS = Object.freeze([
  {
    id: "12x8x16-versus-24x12x24",
    primary: { timeSamples: 12, polarOrder: 8, azimuthCount: 16 },
    refined: { timeSamples: 24, polarOrder: 12, azimuthCount: 24 },
  },
  {
    id: "24x12x24-versus-48x16x32",
    primary: { timeSamples: 24, polarOrder: 12, azimuthCount: 24 },
    refined: { timeSamples: 48, polarOrder: 16, azimuthCount: 32 },
  },
  {
    id: "48x16x32-versus-96x20x40",
    primary: { timeSamples: 48, polarOrder: 16, azimuthCount: 32 },
    refined: { timeSamples: 96, polarOrder: 20, azimuthCount: 40 },
  },
]);

function fail(message) {
  throw new Error(message);
}

function parseArguments(args) {
  let output = DEFAULT_OUTPUT;
  let surfaceLevelCount = SURFACE_LEVELS.length;
  let sensitivityLevelCount = 3;
  for (let index = 0; index < args.length; index += 1) {
    const key = args[index];
    const value = args[index + 1];
    if (!value || value.startsWith("--")) fail(`${key} requires a value.`);
    if (key === "--output") output = path.resolve(value);
    else if (key === "--surface-levels") surfaceLevelCount = Number(value);
    else if (key === "--sensitivity-levels") sensitivityLevelCount = Number(value);
    else fail(`unexpected argument ${key}.`);
    index += 1;
  }
  if (!Number.isSafeInteger(surfaceLevelCount) ||
      surfaceLevelCount < 1 || surfaceLevelCount > SURFACE_LEVELS.length) {
    fail(`--surface-levels must be between 1 and ${SURFACE_LEVELS.length}.`);
  }
  if (!Number.isSafeInteger(sensitivityLevelCount) ||
      sensitivityLevelCount < 1 || sensitivityLevelCount > 3) {
    fail("--sensitivity-levels must be between 1 and 3.");
  }
  return { output, surfaceLevelCount, sensitivityLevelCount };
}

function candidateByMemberId(loaded, memberId) {
  const candidate = loaded.candidates.find(
    (row) => row.declaration.memberId === memberId,
  );
  if (!candidate) fail(`campaign registry does not contain ${memberId}.`);
  return candidate;
}

function exactSource(candidate) {
  return createPrescribedBraidExactSourceRecord(candidate.spec, {
    generatingSpec: candidate.declaration.specPath,
  });
}

function outerRadiusOnly(protocol, suffix) {
  const modified = structuredClone(protocol);
  modified.protocolId = `${protocol.protocolId}-${suffix}`;
  modified.enclosingSurfaces.radii = [Math.max(...protocol.enclosingSurfaces.radii)];
  return modified;
}

function compactGate(gate) {
  const worst = [...(gate.entries ?? [])].sort((left, right) =>
    (right.relativeOrAbsoluteChange ?? right.relativeChange ??
      right.absoluteChange ?? right.outOfBandRmsFraction ?? 0) -
    (left.relativeOrAbsoluteChange ?? left.relativeChange ??
      left.absoluteChange ?? left.outOfBandRmsFraction ?? 0))[0] ?? null;
  return {
    passed: gate.passed,
    threshold: gate.threshold,
    maximumChange: gate.maximumChange,
    identityMatch: gate.identityMatch ?? true,
    worstEntry: worst,
  };
}

function surfaceLevelProtocol(baseProtocol, level) {
  const protocol = structuredClone(baseProtocol);
  protocol.protocolId = `${baseProtocol.protocolId}-gate-ladder-${level.id}`;
  protocol.completeCycle.primary = structuredClone(level.primary);
  protocol.completeCycle.refined = structuredClone(level.refined);
  return protocol;
}

function sensitivityLevelProtocol(baseProtocol, levelIndex) {
  const protocol = outerRadiusOnly(
    baseProtocol,
    `sensitivity-step-ladder-${levelIndex}`,
  );
  const primaryStep =
    baseProtocol.localTransmitterSensitivity.primaryStep / (2 ** levelIndex);
  protocol.localTransmitterSensitivity.primaryStep = primaryStep;
  protocol.localTransmitterSensitivity.refinedStep = primaryStep / 2;
  return protocol;
}

function heartbeat(fields) {
  process.stderr.write(`${JSON.stringify({
    heartbeat: "analytical-gate-adjudication",
    ...fields,
  })}\n`);
}

function runSurfaceLadder(loaded, memberId, levelCount, campaignStart) {
  const candidate = candidateByMemberId(loaded, memberId);
  const sourceRecord = exactSource(candidate);
  const levels = [];
  for (const [levelIndex, declaration] of
    SURFACE_LEVELS.slice(0, levelCount).entries()) {
    const started = performance.now();
    heartbeat({
      memberId,
      lane: "surface-resolution",
      level: levelIndex + 1,
      totalLevels: levelCount,
      state: "started",
      wallSeconds: (started - campaignStart) / 1000,
    });
    const protocol = surfaceLevelProtocol(loaded.protocol, declaration);
    const reduction = evaluateB1StreamingSurfaceReductions({
      sourceRecord,
      completeCycleProtocol: protocol,
      onProgress(progress) {
        heartbeat({
          memberId,
          lane: "surface-resolution",
          level: levelIndex + 1,
          totalLevels: levelCount,
          state: "running",
          ...progress,
          wallSeconds: (performance.now() - campaignStart) / 1000,
        });
      },
    });
    const ended = performance.now();
    const gates = reduction.convergenceComparisons.quadrature.gates;
    levels.push({
      levelId: declaration.id,
      primary: declaration.primary,
      refined: declaration.refined,
      radii: protocol.enclosingSurfaces.radii,
      wallSeconds: (ended - started) / 1000,
      quadratureAccepted: reduction.convergenceComparisons.quadrature.passed,
      frequencyResolvedWakeFlux: compactGate(gates.frequencyResolvedWakeFlux),
      frequencyResolvedWakeFluxBandCoverage:
        compactGate(gates.frequencyResolvedWakeFluxBandCoverage),
      exposure: compactGate(gates.exposure),
      anisotropy: compactGate(gates.anisotropy),
      retainedSpectralPower: compactGate(gates.retainedSpectralPower),
      causalWakeFlux: compactGate(gates.causalWakeFlux),
    });
    heartbeat({
      memberId,
      lane: "surface-resolution",
      level: levelIndex + 1,
      totalLevels: levelCount,
      state: "completed",
      levelWallSeconds: (ended - started) / 1000,
      frequencyMaximumChange:
        gates.frequencyResolvedWakeFlux.maximumChange,
      accepted: reduction.convergenceComparisons.quadrature.passed,
      wallSeconds: (ended - campaignStart) / 1000,
    });
  }
  return {
    candidateId: candidate.declaration.candidateId,
    memberId,
    familyId: candidate.declaration.familyId,
    levels,
    falsifier:
      "The aliasing diagnosis fails if the frequency-resolved discrepancy does not decrease or settle under the declared resolution ladder.",
  };
}

function runSensitivityLadder(loaded, memberId, levelCount, campaignStart) {
  const candidate = candidateByMemberId(loaded, memberId);
  const sourceRecord = exactSource(candidate);
  const levels = [];
  for (let levelIndex = 0; levelIndex < levelCount; levelIndex += 1) {
    const protocol = sensitivityLevelProtocol(loaded.protocol, levelIndex);
    const started = performance.now();
    heartbeat({
      memberId,
      lane: "sensitivity-step",
      level: levelIndex + 1,
      totalLevels: levelCount,
      state: "started",
      primaryStep: protocol.localTransmitterSensitivity.primaryStep,
      wallSeconds: (started - campaignStart) / 1000,
    });
    const result = evaluateCompleteCycleCandidate({
      candidateId: candidate.declaration.candidateId,
      sourceRecord,
      sourceSpec: candidate.spec,
      completeCycleProtocol: protocol,
      includeSensitivity: true,
    });
    const ended = performance.now();
    const sensitivity = result.diagnosticReductions.transmitterSensitivity;
    levels.push({
      primaryStep: sensitivity.stencil.primary.step,
      refinedStep: sensitivity.stencil.refined.step,
      wallSeconds: (ended - started) / 1000,
      topologyMatch: sensitivity.topologyMatch,
      allPerturbedEvaluationsAccepted:
        sensitivity.perturbedSources.every((row) => row.accepted),
      maximumAbsoluteUncertainty: sensitivity.maximumUncertainty,
      maximumNormalizedUncertainty: sensitivity.maximumNormalizedUncertainty,
      threshold: sensitivity.threshold,
      sensitivityAccepted: sensitivity.accepted,
      failureCode: sensitivity.failureCode,
      convergenceAdjudication: sensitivity.convergenceAdjudication,
    });
    heartbeat({
      memberId,
      lane: "sensitivity-step",
      level: levelIndex + 1,
      totalLevels: levelCount,
      state: "completed",
      levelWallSeconds: (ended - started) / 1000,
      maximumNormalizedUncertainty:
        sensitivity.maximumNormalizedUncertainty,
      accepted: sensitivity.accepted,
      failureCode: sensitivity.failureCode,
      wallSeconds: (ended - campaignStart) / 1000,
    });
  }
  return {
    candidateId: candidate.declaration.candidateId,
    memberId,
    familyId: candidate.declaration.familyId,
    levels,
    falsifier:
      "The numerical-stencil diagnosis fails if normalized uncertainty does not decrease or settle as the phase step is halved.",
  };
}

export function runAnalyticalGateAdjudication(options = {}) {
  const loaded = loadAllCandidateCampaignRegistry();
  const campaignStart = performance.now();
  const surfaceLevelCount = options.surfaceLevelCount ?? SURFACE_LEVELS.length;
  const sensitivityLevelCount = options.sensitivityLevelCount ?? 3;
  const report = {
    schema: REPORT_SCHEMA,
    harnessVersion: REPORT_SCHEMA,
    generatedAt: new Date().toISOString(),
    claimGrade: "measured",
    claimBoundary: {
      prescribedPathsHeldFixed: true,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      excludedClaims: ["stability", "energy", "retention", "physical-realization"],
    },
    repairedGateDefinitions: {
      minimumSeparation: {
        priorProblem:
          "sampled minimum changes and exact minimum-pair labels were mixed into root convergence",
        replacement:
          "continuous separation floor certified by a periodic-sample Lipschitz lower bound; sampled refinement remains diagnostic",
      },
      transmitterSensitivity: {
        priorProblem:
          "one absolute threshold mixed ratio derivatives with endpoint RMS acceleration derivatives",
        replacement:
          "per-measure dimensionless stencil-settling uncertainty with declared scales",
      },
    },
    surfaceResolutionLadders: SURFACE_CANDIDATES.map((memberId) =>
      runSurfaceLadder(loaded, memberId, surfaceLevelCount, campaignStart)),
    sensitivityStepLadders: SENSITIVITY_CANDIDATES.map((memberId) =>
      runSensitivityLadder(loaded, memberId, sensitivityLevelCount, campaignStart)),
  };
  report.wallSeconds = (performance.now() - campaignStart) / 1000;
  return report;
}

function main(args) {
  const options = parseArguments(args);
  const report = runAnalyticalGateAdjudication(options);
  mkdirSync(path.dirname(options.output), { recursive: true });
  writeFileSync(options.output, `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify({
    schema: report.schema,
    output: options.output,
    wallSeconds: report.wallSeconds,
    surfaceCandidates: report.surfaceResolutionLadders.length,
    sensitivityCandidates: report.sensitivityStepLadders.length,
  }, null, 2)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(SCRIPT_PATH)) {
  main(process.argv.slice(2));
}
