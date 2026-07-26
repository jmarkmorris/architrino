import { performance } from "node:perf_hooks";

import {
  evaluatePrescribedRecordAnalysis,
  sha256Canonical,
} from "./AnalyticalBraidEvaluator.mjs";
import {
  validateB1CompleteCycleProbeProtocol,
} from "./B1CompleteCycleProbeProtocol.mjs";
import {
  buildCompleteCycleEndpointProtocol,
  comparePointwiseMemberResidualSearchScreens,
  reduceCompleteCycleEndpointPacket,
} from "./CompleteCycleAnalyticalCampaign.mjs";
import {
  sampleFullConstraintPreservingTaxonomy,
  sampleLocalReferenceNeighborhood,
} from "./CompactMonteCarloCampaign.mjs";
import {
  evaluateExactPrescribedSourceState,
  validateExactPrescribedSourceRecord,
} from "./ExactPrescribedSourceWake.mjs";
import {
  createPrescribedBraidExactSourceRecord,
  validatePrescribedBraidSpec,
} from "../../scripts/eom/generate-prescribed-braid-record.mjs";

export const ENDPOINT_RESIDUAL_SEARCH_SCHEMA =
  "prescribed-path-analysis/endpoint-residual-search-campaign.v1";
export const ENDPOINT_RESIDUAL_SEARCH_VERSION =
  "prescribed-record-analytics/endpoint-residual-search-campaign.v1";

const DEFAULT_STRATA = Object.freeze([
  Object.freeze({ stratumId: "catalog-reference", sampler: "reference", count: 1 }),
  Object.freeze({ stratumId: "local-neighborhood", sampler: "local", count: 2 }),
  Object.freeze({ stratumId: "full-bounded-taxonomy", sampler: "full", count: 3 }),
]);

function withoutMeasuredTiming(value) {
  if (Array.isArray(value)) {
    return value.map(withoutMeasuredTiming);
  }
  if (value === null || typeof value !== "object") {
    return value;
  }
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => key !== "measuredWallSeconds")
      .map(([key, child]) => [key, withoutMeasuredTiming(child)]),
  );
}

function vectorDistance(left, right) {
  return Math.hypot(
    left.x - right.x,
    left.y - right.y,
    left.z - right.z,
  );
}

function sampleForStratum({ candidate, seed, stratum, stratumOrdinal }) {
  if (stratum.sampler === "reference") {
    return {
      spec: validatePrescribedBraidSpec(structuredClone(candidate.spec)),
      coordinates: { referenceRecord: true },
      samplerId: "prescribed-path-analysis/catalog-reference.v1",
      samplingDisposition:
        "diagnostic exact catalog-reference prescribed geometry",
    };
  }
  const sampler = stratum.sampler === "local"
    ? sampleLocalReferenceNeighborhood
    : sampleFullConstraintPreservingTaxonomy;
  return sampler({
    candidate,
    seed: `${seed}/${stratum.stratumId}`,
    sampleOrdinal: stratumOrdinal,
  });
}

function independentlyAuditCausalRoots(packet, sourceRecord, fieldSpeed, tolerance) {
  const sources = new Map(
    sourceRecord.sources.map((source) => [source.id, source]),
  );
  let maximumAbsoluteResidual = 0;
  let rootCount = 0;
  let minimumTransversalityMargin = Number.POSITIVE_INFINITY;
  let peak = null;
  for (const event of packet.rawLedgers?.causalRoots ?? []) {
    const receiver = sources.get(event.receiverSourceId);
    if (!receiver) {
      throw new Error(
        `independent root audit lacks receiver ${event.receiverSourceId}.`,
      );
    }
    const receiverState = evaluateExactPrescribedSourceState(
      receiver,
      event.observationTime,
    );
    for (const root of event.roots) {
      const transmitter = sources.get(root.transmitterId);
      if (!transmitter) {
        throw new Error(
          `independent root audit lacks transmitter ${root.transmitterId}.`,
        );
      }
      const transmitterState = evaluateExactPrescribedSourceState(
        transmitter,
        root.emissionTime,
      );
      const distance = vectorDistance(
        receiverState.position,
        transmitterState.position,
      );
      const independentlyComputedResidual =
        distance -
        fieldSpeed * (event.observationTime - root.emissionTime);
      const absoluteResidual = Math.abs(independentlyComputedResidual);
      rootCount += 1;
      minimumTransversalityMargin = Math.min(
        minimumTransversalityMargin,
        root.rootTransversalityMargin,
      );
      if (absoluteResidual > maximumAbsoluteResidual) {
        maximumAbsoluteResidual = absoluteResidual;
        peak = {
          eventId: event.eventId,
          receiverId: event.receiverSourceId,
          transmitterId: root.transmitterId,
          observationTime: event.observationTime,
          emissionTime: root.emissionTime,
          independentlyComputedResidual,
        };
      }
    }
  }
  return {
    status: rootCount > 0 && maximumAbsoluteResidual <= tolerance
      ? "passed"
      : "failed",
    independentlyAuthoredCheck:
      "recompute geometric distance minus fieldSpeed times causal delay from the exact source record; do not read the acceleration evaluator residual",
    tolerance,
    rootCount,
    maximumAbsoluteResidual,
    minimumTransversalityMargin:
      Number.isFinite(minimumTransversalityMargin)
        ? minimumTransversalityMargin
        : null,
    peak,
  };
}

function compactScreen(screen) {
  return {
    status: screen.status,
    outcome: screen.outcome,
    falsifiedAsExactIsolatedPrescribedHistory:
      screen.falsifiedAsExactIsolatedPrescribedHistory,
    branchExistenceClaim: screen.branchExistenceClaim,
    returnSymmetryClaim: screen.returnSymmetryClaim,
    taxonomyClaim: screen.taxonomyClaim,
    adjudicationThreshold: screen.adjudicationThreshold,
    windows: screen.windows,
    searchGuidance: screen.searchGuidance,
    partitionIdentities: screen.partitionIdentities,
  };
}

function evaluateResolution({
  sourceRecord,
  protocol,
  resolution,
  onRawPacket = null,
  rawPacketContext = null,
}) {
  const endpointProtocol = buildCompleteCycleEndpointProtocol(
    protocol,
    sourceRecord,
    resolution,
  );
  const packet = evaluatePrescribedRecordAnalysis({
    sourceRecord,
    protocol: endpointProtocol,
  });
  const rawEvidenceReceipt = onRawPacket?.(packet, {
    ...rawPacketContext,
    resolution,
    artifactKind: "endpoint-residual-raw-result-packet",
  }) ?? null;
  const reduction = reduceCompleteCycleEndpointPacket(
    packet,
    sourceRecord,
    protocol.completeCycle.period,
    {
      fieldSpeed: protocol.eventEvaluator.fieldSpeed,
      cycleStart: protocol.completeCycle.start,
    },
  );
  const rootAudit = independentlyAuditCausalRoots(
    packet,
    sourceRecord,
    protocol.eventEvaluator.fieldSpeed,
    protocol.eventEvaluator.rootPolicy.tolerance,
  );
  return {
    protocolHash: sha256Canonical(endpointProtocol),
    resultHash: packet.resultHash,
    rawEvidenceReceipt,
    eventCount: packet.rawLedgers.causalRoots.length,
    inventoryCertification: reduction.accelerationInventoryCertification,
    memberResidual: compactScreen(
      reduction.pointwiseMemberResidualSearchScreen,
    ),
    summedAcceleration: {
      status:
        reduction.pointwiseSummedAccelerationNecessaryCondition.status,
      outcome:
        reduction.pointwiseSummedAccelerationNecessaryCondition.outcome,
      maximumSummedEvaluatedAccelerationNorm:
        reduction.pointwiseSummedAccelerationNecessaryCondition.summary
          ?.maximumSummedEvaluatedAccelerationNorm ?? null,
      maximumSummedEquationResidualNorm:
        reduction.pointwiseSummedAccelerationNecessaryCondition.summary
          ?.maximumSummedEquationResidualNorm ?? null,
    },
    independentRootResidualAudit: rootAudit,
  };
}

export function evaluateEndpointResidualSearchCase({
  candidate,
  sampled,
  protocol: rawProtocol,
  seed,
  stratumId,
  stratumOrdinal,
  refinement = "screening",
  onRawPacket = null,
} = {}) {
  const protocol = validateB1CompleteCycleProbeProtocol(rawProtocol);
  const started = performance.now();
  const sourceSpecHash = sha256Canonical(sampled.spec);
  let exactSourceHash = null;
  try {
    const sourceRecord = validateExactPrescribedSourceRecord(
      createPrescribedBraidExactSourceRecord(sampled.spec, {
        sourceHash: sourceSpecHash,
        generatingSpec: candidate.declaration.specPath,
      }),
    );
    exactSourceHash = sha256Canonical(sourceRecord);
    const primary = evaluateResolution({
      sourceRecord,
      protocol,
      resolution: "primary",
      onRawPacket,
      rawPacketContext: {
        candidateId: candidate.declaration.candidateId,
        memberId: candidate.declaration.memberId,
        seed,
        stratumId,
        stratumOrdinal,
        refinement,
      },
    });
    const refined = evaluateResolution({
      sourceRecord,
      protocol,
      resolution: "refined",
      onRawPacket,
      rawPacketContext: {
        candidateId: candidate.declaration.candidateId,
        memberId: candidate.declaration.memberId,
        seed,
        stratumId,
        stratumOrdinal,
        refinement,
      },
    });
    const comparison = comparePointwiseMemberResidualSearchScreens(
      primary.memberResidual,
      refined.memberResidual,
    );
    const completeInventory =
      primary.inventoryCertification.complete === true &&
      refined.inventoryCertification.complete === true;
    const independentRootCheckPassed =
      primary.independentRootResidualAudit.status === "passed" &&
      refined.independentRootResidualAudit.status === "passed";
    return {
      caseId:
        `${candidate.declaration.candidateId}/${stratumId}-${stratumOrdinal}`,
      familyId: candidate.declaration.familyId,
      memberId: candidate.declaration.memberId,
      candidateId: candidate.declaration.candidateId,
      seed,
      stratumId,
      stratumOrdinal,
      refinement,
      samplerId: sampled.samplerId ?? null,
      samplingDisposition: sampled.samplingDisposition,
      coordinates: sampled.coordinates,
      sampledSpec: sampled.spec,
      sampledSpecHash: sourceSpecHash,
      exactSourceHash,
      searchProtocolHash: sha256Canonical(protocol),
      status: completeInventory && independentRootCheckPassed
        ? "eligible-complete-inventory"
        : "unknown-failed-required-check",
      completeInventory,
      independentRootCheckPassed,
      primary,
      refined,
      resolutionComparison: comparison,
      measuredWallSeconds: (performance.now() - started) / 1_000,
      evidenceDisposition:
        "diagnostic prescribed-path endpoint evaluation only; no path evolution, EOM-solver branch, stability, retention, or taxonomy-existence claim",
    };
  } catch (error) {
    return {
      caseId:
        `${candidate.declaration.candidateId}/${stratumId}-${stratumOrdinal}`,
      familyId: candidate.declaration.familyId,
      memberId: candidate.declaration.memberId,
      candidateId: candidate.declaration.candidateId,
      seed,
      stratumId,
      stratumOrdinal,
      refinement,
      samplerId: sampled.samplerId ?? null,
      samplingDisposition: sampled.samplingDisposition,
      coordinates: sampled.coordinates,
      sampledSpec: sampled.spec,
      sampledSpecHash: sourceSpecHash,
      exactSourceHash,
      searchProtocolHash: sha256Canonical(protocol),
      status: "unknown-evaluation-failed",
      completeInventory: false,
      independentRootCheckPassed: false,
      error: {
        name: error?.name ?? "Error",
        code: error?.code ?? null,
        message: error?.message ?? String(error),
        details: error?.details ?? null,
      },
      measuredWallSeconds: (performance.now() - started) / 1_000,
      evidenceDisposition:
        "unknown; fail closed because endpoint evaluation did not complete",
    };
  }
}

export function createEndpointResidualSearchProtocol(
  rawProtocol,
  {
    primaryTimeSamples = 12,
    refinedTimeSamples = 24,
    suffix = "endpoint-residual-search",
  } = {},
) {
  const protocol = structuredClone(rawProtocol);
  protocol.protocolId = `${protocol.protocolId}-${suffix}`;
  protocol.completeCycle.primary.timeSamples = primaryTimeSamples;
  protocol.completeCycle.refined.timeSamples = refinedTimeSamples;
  return validateB1CompleteCycleProbeProtocol(protocol);
}

function rankedEligibleCases(cases) {
  return cases.filter(
    (row) => row.status === "eligible-complete-inventory",
  ).sort((left, right) =>
    left.refined.memberResidual.searchGuidance
      .fullCycleMaximumPointwiseMemberResidualNorm -
    right.refined.memberResidual.searchGuidance
      .fullCycleMaximumPointwiseMemberResidualNorm);
}

function campaignSummary(cases) {
  const eligible = rankedEligibleCases(cases);
  const exactNearZero = eligible.filter(
    (row) =>
      row.refined.memberResidual
        .falsifiedAsExactIsolatedPrescribedHistory === false,
  );
  const summedCancellationHidden = eligible.filter(
    (row) =>
      row.refined.summedAcceleration.outcome ===
        "not-falsified-by-this-screen" &&
      row.refined.memberResidual
        .falsifiedAsExactIsolatedPrescribedHistory === true,
  );
  return {
    drawnCount: cases.length,
    eligibleCompleteInventoryCount: eligible.length,
    unknownCount: cases.length - eligible.length,
    exactNearZeroCount: exactNearZero.length,
    summedCancellationHiddenMemberFailureCount:
      summedCancellationHidden.length,
    leadingCases: eligible.slice(0, 10).map((row) => ({
      caseId: row.caseId,
      memberId: row.memberId,
      stratumId: row.stratumId,
      stratumOrdinal: row.stratumOrdinal,
      refinedFullCyclePeak:
        row.refined.memberResidual.searchGuidance
          .fullCycleMaximumPointwiseMemberResidualNorm,
      refinedFullCycleRms:
        row.refined.memberResidual.searchGuidance
          .fullCycleRmsPointwiseMemberResidualNorm,
      firstHalfPeak:
        row.refined.memberResidual.searchGuidance
          .firstHalfMaximumPointwiseMemberResidualNorm,
      secondHalfPeak:
        row.refined.memberResidual.searchGuidance
          .secondHalfMaximumPointwiseMemberResidualNorm,
      adjudicationThreshold:
        row.refined.memberResidual.adjudicationThreshold,
      summedOutcome: row.refined.summedAcceleration.outcome,
      maximumIndependentRootResidual:
        row.refined.independentRootResidualAudit.maximumAbsoluteResidual,
    })),
    unknownByStatus: Object.fromEntries(
      [...cases.reduce((counts, row) => {
        if (row.status !== "eligible-complete-inventory") {
          counts.set(row.status, (counts.get(row.status) ?? 0) + 1);
        }
        return counts;
      }, new Map()).entries()].sort(),
    ),
    claimBoundary:
      "diagnostic prescribed-path endpoint coverage only; near-zero means only not falsified on the sampled grid and no branch, stability, retention, or taxonomy-existence claim",
  };
}

export function runEndpointResidualSearchCampaign({
  candidates,
  protocol: rawProtocol,
  seed,
  strata = DEFAULT_STRATA,
  onProgress = null,
} = {}) {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    throw new TypeError("endpoint residual search requires candidates.");
  }
  const protocol = validateB1CompleteCycleProbeProtocol(rawProtocol);
  const started = performance.now();
  const cases = [];
  const tasks = candidates.flatMap((candidate) =>
    strata.flatMap((stratum) =>
      Array.from({ length: stratum.count }, (_, stratumOrdinal) => ({
        candidate,
        stratum,
        stratumOrdinal,
      }))));
  for (const [taskIndex, task] of tasks.entries()) {
    onProgress?.({
      stage: "case-start",
      taskIndex,
      taskCount: tasks.length,
      memberId: task.candidate.declaration.memberId,
      stratumId: task.stratum.stratumId,
      stratumOrdinal: task.stratumOrdinal,
    });
    let sampled;
    try {
      sampled = sampleForStratum({
        candidate: task.candidate,
        seed,
        stratum: task.stratum,
        stratumOrdinal: task.stratumOrdinal,
      });
    } catch (error) {
      cases.push({
        caseId:
          `${task.candidate.declaration.candidateId}/` +
          `${task.stratum.stratumId}-${task.stratumOrdinal}`,
        familyId: task.candidate.declaration.familyId,
        memberId: task.candidate.declaration.memberId,
        candidateId: task.candidate.declaration.candidateId,
        seed,
        stratumId: task.stratum.stratumId,
        stratumOrdinal: task.stratumOrdinal,
        status: "unknown-sampling-failed",
        completeInventory: false,
        independentRootCheckPassed: false,
        error: {
          name: error?.name ?? "Error",
          code: error?.code ?? null,
          message: error?.message ?? String(error),
          details: error?.details ?? null,
        },
        evidenceDisposition:
          "unknown; fail closed because constraint-preserving sampling did not complete",
      });
      continue;
    }
    const row = evaluateEndpointResidualSearchCase({
      candidate: task.candidate,
      sampled,
      protocol,
      seed,
      stratumId: task.stratum.stratumId,
      stratumOrdinal: task.stratumOrdinal,
    });
    cases.push(row);
    onProgress?.({
      stage: "case-complete",
      taskIndex,
      taskCount: tasks.length,
      caseId: row.caseId,
      status: row.status,
    });
  }
  cases.sort((left, right) =>
    left.memberId.localeCompare(right.memberId, undefined, { numeric: true }) ||
    left.stratumId.localeCompare(right.stratumId) ||
    left.stratumOrdinal - right.stratumOrdinal);
  const summary = campaignSummary(cases);
  const campaignWithoutHash = {
    schema: ENDPOINT_RESIDUAL_SEARCH_SCHEMA,
    version: ENDPOINT_RESIDUAL_SEARCH_VERSION,
    seed,
    protocolHash: sha256Canonical(protocol),
    protocol,
    strata,
    candidateCount: candidates.length,
    cases,
    summary,
    measuredWallSeconds: (performance.now() - started) / 1_000,
    pathEvolutionInvoked: false,
    eomSolverInvoked: false,
    independentAcceptancePerformed: false,
  };
  return {
    ...campaignWithoutHash,
    campaignHash: sha256Canonical(withoutMeasuredTiming(campaignWithoutHash)),
  };
}

export function selectEndpointResidualRefinementCases(
  campaign,
  { leadingCount = 8, cancellationCount = 8 } = {},
) {
  const eligible = rankedEligibleCases(campaign.cases);
  const selected = new Map();
  eligible.slice(0, leadingCount).forEach((row) => {
    selected.set(row.caseId, {
      row,
      reason: "leading-full-cycle-member-residual",
    });
  });
  eligible.filter(
    (row) =>
      row.refined.summedAcceleration.outcome ===
        "not-falsified-by-this-screen" &&
      row.refined.memberResidual
        .falsifiedAsExactIsolatedPrescribedHistory === true,
  ).slice(0, cancellationCount).forEach((row) => {
    selected.set(row.caseId, {
      row,
      reason: "summed-cancellation-hidden-member-failure",
    });
  });
  return [...selected.values()];
}

export function refineEndpointResidualSearchCases({
  selected,
  candidates,
  protocol,
  seed,
} = {}) {
  const byCandidateId = new Map(
    candidates.map((candidate) => [
      candidate.declaration.candidateId,
      candidate,
    ]),
  );
  return selected.map(({ row, reason }) => {
    const candidate = byCandidateId.get(row.candidateId);
    if (!candidate) {
      throw new Error(`refinement lacks candidate ${row.candidateId}.`);
    }
    const refined = evaluateEndpointResidualSearchCase({
      candidate,
      sampled: {
        spec: row.sampledSpec,
        coordinates: row.coordinates,
        samplerId: row.samplerId,
        samplingDisposition: row.samplingDisposition,
      },
      protocol,
      seed,
      stratumId: row.stratumId,
      stratumOrdinal: row.stratumOrdinal,
      refinement: "dense-time-grid",
    });
    return { ...refined, selectionReason: reason };
  });
}

export function summarizeEndpointResidualRefinements(refinements) {
  const eligible = refinements.filter(
    (row) => row.status === "eligible-complete-inventory",
  );
  const ranked = [...eligible].sort((left, right) =>
    left.refined.memberResidual.searchGuidance
      .fullCycleMaximumPointwiseMemberResidualNorm -
    right.refined.memberResidual.searchGuidance
      .fullCycleMaximumPointwiseMemberResidualNorm);
  return {
    selectedCount: refinements.length,
    eligibleCount: eligible.length,
    unknownCount: refinements.length - eligible.length,
    exactNearZeroCount: eligible.filter(
      (row) =>
        row.refined.memberResidual
          .falsifiedAsExactIsolatedPrescribedHistory === false,
    ).length,
    leadingCases: ranked.map((row) => ({
      caseId: row.caseId,
      memberId: row.memberId,
      selectionReason: row.selectionReason,
      refinedFullCyclePeak:
        row.refined.memberResidual.searchGuidance
          .fullCycleMaximumPointwiseMemberResidualNorm,
      refinedFullCycleRms:
        row.refined.memberResidual.searchGuidance
          .fullCycleRmsPointwiseMemberResidualNorm,
      firstHalfPeak:
        row.refined.memberResidual.searchGuidance
          .firstHalfMaximumPointwiseMemberResidualNorm,
      secondHalfPeak:
        row.refined.memberResidual.searchGuidance
          .secondHalfMaximumPointwiseMemberResidualNorm,
      adjudicationThreshold:
        row.refined.memberResidual.adjudicationThreshold,
      summedOutcome: row.refined.summedAcceleration.outcome,
      maximumIndependentRootResidual:
        row.refined.independentRootResidualAudit.maximumAbsoluteResidual,
    })),
  };
}

export function runStratifiedEndpointResidualSearch({
  candidates,
  baseProtocol,
  seed,
  screeningPrimaryTimeSamples = 12,
  screeningRefinedTimeSamples = 24,
  densePrimaryTimeSamples = 48,
  denseRefinedTimeSamples = 96,
  leadingCount = 8,
  cancellationCount = 8,
  onProgress = null,
} = {}) {
  const screeningProtocol = createEndpointResidualSearchProtocol(baseProtocol, {
    primaryTimeSamples: screeningPrimaryTimeSamples,
    refinedTimeSamples: screeningRefinedTimeSamples,
    suffix: "stratified-endpoint-screen-v1",
  });
  const screening = runEndpointResidualSearchCampaign({
    candidates,
    protocol: screeningProtocol,
    seed,
    onProgress,
  });
  const selected = selectEndpointResidualRefinementCases(screening, {
    leadingCount,
    cancellationCount,
  });
  const denseRefinementProtocol =
    createEndpointResidualSearchProtocol(baseProtocol, {
      primaryTimeSamples: densePrimaryTimeSamples,
      refinedTimeSamples: denseRefinedTimeSamples,
      suffix: "stratified-endpoint-dense-refinement-v1",
    });
  const refinements = refineEndpointResidualSearchCases({
    selected,
    candidates,
    protocol: denseRefinementProtocol,
    seed,
  });
  const resultWithoutHash = {
    schema:
      "prescribed-path-analysis/stratified-endpoint-residual-search-result.v1",
    version: ENDPOINT_RESIDUAL_SEARCH_VERSION,
    seed,
    screening,
    denseRefinementProtocolHash:
      sha256Canonical(denseRefinementProtocol),
    denseRefinementProtocol,
    refinements,
    refinementSummary:
      summarizeEndpointResidualRefinements(refinements),
    claimBoundary:
      "diagnostic prescribed-path endpoint search only; no EOM evolution, branch, stability, retention, or taxonomy-existence claim",
  };
  return {
    ...resultWithoutHash,
    resultHash: sha256Canonical(withoutMeasuredTiming(resultWithoutHash)),
  };
}
