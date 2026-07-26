import { performance } from "node:perf_hooks";

import {
  COMPACT_MONTE_CARLO_CAMPAIGN_SCHEMA,
  COMPACT_MONTE_CARLO_CASE_SCHEMA,
} from "./CompactMonteCarloCampaign.mjs";
import {
  evaluateEndpointResidualSearchCase,
} from "./EndpointResidualSearchCampaign.mjs";
import { sha256Canonical } from "./AnalyticalBraidEvaluator.mjs";

export const MONTE_CARLO_BASIN_HANDOFF_VERSION =
  "prescribed-path-analysis/monte-carlo-basin-handoff.v1";

function objectiveFromFullRow(row) {
  const guidance = row.refined?.memberResidual?.searchGuidance;
  if (guidance == null) return null;
  return {
    refinedFullCyclePeak:
      guidance.fullCycleMaximumPointwiseMemberResidualNorm,
    refinedFullCycleRms:
      guidance.fullCycleRmsPointwiseMemberResidualNorm,
    adjudicationThreshold:
      row.refined.memberResidual.adjudicationThreshold,
  };
}

function compactSearchScore(row) {
  const objective = row.objective ?? objectiveFromFullRow(row);
  const completeInventory = row.completeInventory === true;
  const independentRootCheckPassed =
    row.independentRootCheckPassed === true;
  const eligible = objective !== null &&
    completeInventory &&
    independentRootCheckPassed;
  return {
    objective,
    certification: {
      completeInventory,
      independentRootCheckPassed,
      primaryInventoryCertification:
        row.primaryInventoryCertification ??
        row.primary?.inventoryCertification ??
        null,
      refinedInventoryCertification:
        row.refinedInventoryCertification ??
        row.refined?.inventoryCertification ??
        null,
      primaryIndependentRootResidualAudit:
        row.primaryIndependentRootResidualAudit ??
        row.primary?.independentRootResidualAudit ??
        null,
      refinedIndependentRootResidualAudit:
        row.refinedIndependentRootResidualAudit ??
        row.refined?.independentRootResidualAudit ??
        null,
    },
    resolutionComparison: row.resolutionComparison ?? null,
    status: {
      code: eligible
        ? "directed-diagnostic-eligible"
        : "directed-diagnostic-unknown",
      passed: eligible,
      disposition: eligible
        ? "eligible prescribed-coordinate search point"
        : "unknown; required numerical certification did not complete",
    },
  };
}

function rawReceipts(row) {
  return [
    row.primaryRawEvidenceReceipt ??
      row.primary?.rawEvidenceReceipt ??
      null,
    row.refinedRawEvidenceReceipt ??
      row.refined?.rawEvidenceReceipt ??
      null,
  ].filter(Boolean);
}

export function selectMonteCarloBasinHandoffs(
  campaigns,
  {
    maximumRefinedFullCyclePeak = 6,
    maximumResolutionChange = 0.05,
  } = {},
) {
  const selected = [];
  const dispositionCounts = new Map();
  for (const campaign of campaigns) {
    for (const row of campaign.caseRows) {
      let disposition = "not-evaluated";
      const search = row.score?.pointwiseMemberResidualSearch;
      const peak =
        search?.refined?.fullCycleMaximumPointwiseMemberResidualNorm;
      const change =
        search?.resolutionComparison?.maximumRelativeOrAbsoluteChange;
      if (row.evaluationStatus?.evaluated === true) {
        if (search?.status !== "eligible-diagnostic-search-score") {
          disposition = "inapplicable-member-residual-score";
        } else if (!Number.isFinite(peak) || !Number.isFinite(change)) {
          disposition = "unknown-missing-handoff-metric";
        } else if (peak > maximumRefinedFullCyclePeak) {
          disposition = "above-residual-handoff-threshold";
        } else if (change > maximumResolutionChange) {
          disposition = "above-resolution-change-threshold";
        } else {
          disposition = "selected-for-directed-handoff";
          selected.push({
            sourceCampaignHash: campaign.campaignHash,
            sourceCampaignId: campaign.campaignId,
            row,
            compactRefinedFullCyclePeak: peak,
            compactRefinedFullCycleRms:
              search.refined.fullCycleRmsPointwiseMemberResidualNorm,
            compactResolutionChange: change,
          });
        }
      }
      dispositionCounts.set(
        disposition,
        (dispositionCounts.get(disposition) ?? 0) + 1,
      );
    }
  }
  selected.sort((left, right) =>
    left.compactRefinedFullCyclePeak -
      right.compactRefinedFullCyclePeak ||
    left.row.caseId.localeCompare(right.row.caseId));
  return {
    policy: {
      maximumRefinedFullCyclePeak,
      maximumResolutionChange,
      selection:
        "every evaluated compact row with an eligible refined full-cycle " +
        "member-residual score at or below both thresholds",
      acceptanceBoundary:
        "handoff only; not analytical acceptance or a near-zero claim",
    },
    selected,
    selectedCount: selected.length,
    dispositionCounts: Object.fromEntries(
      [...dispositionCounts].sort(([left], [right]) =>
        left.localeCompare(right)),
    ),
  };
}

export function admitMonteCarloBasinHandoffs({
  selected,
  candidates,
  protocol,
  seed,
  onRawPacket = null,
  onProgress = null,
}) {
  const candidatesById = new Map(candidates.map((candidate) => [
    candidate.declaration.candidateId,
    candidate,
  ]));
  return selected.map((handoff, index) => {
    const candidate = candidatesById.get(handoff.row.candidateId);
    if (!candidate) {
      throw new Error(
        `Monte Carlo handoff lacks candidate ${handoff.row.candidateId}.`,
      );
    }
    onProgress?.({
      stage: "handoff-admission-start",
      index,
      count: selected.length,
      caseId: handoff.row.caseId,
      memberId: handoff.row.memberId,
    });
    const row = evaluateEndpointResidualSearchCase({
      candidate,
      sampled: {
        spec: handoff.row.exactRerunInstruction.sampledSpec,
        coordinates: handoff.row.sampling.coordinates,
        samplerId: handoff.row.sampling.samplerId,
        samplingDisposition:
          "selected compact Monte Carlo coordinate replay for directed " +
          "endpoint admission",
      },
      protocol,
      seed,
      stratumId:
        `mc-handoff-${handoff.sourceCampaignHash.slice(0, 12)}-` +
        `${handoff.row.sampleOrdinal}`,
      stratumOrdinal: index,
      refinement: "monte-carlo-handoff-admission",
      onRawPacket,
    });
    const result = {
      ...row,
      handoffLineage: {
        version: MONTE_CARLO_BASIN_HANDOFF_VERSION,
        sourceCampaignHash: handoff.sourceCampaignHash,
        sourceCampaignId: handoff.sourceCampaignId,
        sourceCaseId: handoff.row.caseId,
        sourceCaseHash: handoff.row.caseHash,
        compactScoreHash: handoff.row.scoreHash,
        compactRefinedFullCyclePeak:
          handoff.compactRefinedFullCyclePeak,
        compactRefinedFullCycleRms:
          handoff.compactRefinedFullCycleRms,
        compactResolutionChange:
          handoff.compactResolutionChange,
      },
    };
    onProgress?.({
      stage: "handoff-admission-complete",
      index,
      count: selected.length,
      caseId: result.caseId,
      memberId: result.memberId,
      status: result.status,
    });
    return result;
  });
}

function buildCompactCase({
  row,
  outputOrdinal,
  protocolHash,
  implementationIdentity,
  seed,
  caseId,
  searchLineage,
}) {
  if (row.sampledSpec == null ||
      typeof row.sampledSpecHash !== "string" ||
      typeof row.exactSourceHash !== "string") {
    throw new Error(
      `${caseId} lacks an exact sampled specification or source identity.`,
    );
  }
  const score = compactSearchScore(row);
  const caseIdentity = {
    schema: COMPACT_MONTE_CARLO_CASE_SCHEMA,
    caseId,
    familyId: row.familyId,
    memberId: row.memberId,
    candidateId: row.candidateId,
    sampleOrdinal: outputOrdinal,
    sampling: {
      samplerId: MONTE_CARLO_BASIN_HANDOFF_VERSION,
      seed,
      coordinates: row.coordinates ?? null,
      disposition:
        "directed local prescribed-coordinate search point; basin means " +
        "only the declared optimization neighborhood",
    },
    exactRerunInstruction: {
      sampledSpec: row.sampledSpec,
      sampledSpecHash: row.sampledSpecHash,
      exactSourceHash: row.exactSourceHash,
      protocolHash,
      implementationIdentity,
      evidenceMode: "endpoint-raw-external",
      includeSensitivity: false,
    },
    evaluationStatus: {
      code: "evaluated",
      evaluated: true,
      stage: searchLineage.stage,
      reasonCode: row.error?.code ?? null,
      errorName: row.error?.name ?? null,
      message: row.error?.message ?? null,
      details: row.error?.details ?? null,
    },
    score,
    scoreHash: sha256Canonical(score),
    searchLineage,
    verificationReceipts: {
      rawEvidence: rawReceipts(row),
      completeInventory: row.completeInventory === true,
      independentRootCheckPassed:
        row.independentRootCheckPassed === true,
    },
    evidenceDisposition:
      "diagnostic-only endpoint residual search; raw endpoint packets are " +
      "external and this is not full analytical adjudication",
    pathEvolutionInvoked: false,
    eomSolverInvoked: false,
  };
  return {
    ...caseIdentity,
    measuredCost: {
      wallSeconds: row.measuredWallSeconds ?? null,
      sourceAndProtocolSetupSeconds: null,
      analyticalEvaluationSeconds: null,
      scoreAndIdentitySeconds: null,
      userCpuSeconds: null,
      systemCpuSeconds: null,
      processLifetimeMaximumRssKilobytes: null,
      retainedCaseBytes: Buffer.byteLength(JSON.stringify(caseIdentity)),
    },
    caseHash: sha256Canonical(caseIdentity),
  };
}

export function buildCompactSearchCampaign({
  campaignId,
  protocol,
  implementationIdentity,
  seed,
  points,
  stage,
}) {
  const started = performance.now();
  const protocolHash = sha256Canonical(protocol);
  const caseRows = points.map((point, outputOrdinal) =>
    buildCompactCase({
      row: point.row,
      outputOrdinal,
      protocolHash,
      implementationIdentity,
      seed,
      caseId: point.caseId,
      searchLineage: {
        ...point.lineage,
        stage,
      },
    }));
  const campaignIdentity = {
    schema: COMPACT_MONTE_CARLO_CAMPAIGN_SCHEMA,
    campaignId,
    campaignKind: "directed-prescribed-coordinate-search",
    claimGrade: "measured",
    claimBoundary: {
      diagnosticOnly: true,
      independentAcceptancePerformed: false,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      excludedClaims: [
        "global-optimum",
        "dynamical-basin",
        "stability",
        "retention",
        "binding",
        "energy-closure",
        "particle-identity",
        "physical-realization",
      ],
    },
    sampling: {
      samplerId: MONTE_CARLO_BASIN_HANDOFF_VERSION,
      seed,
      casesPerMember: null,
      memberCount: new Set(caseRows.map((row) => row.memberId)).size,
      executionOrder:
        "stage order retained in output ordinal; no row omitted after evaluation",
      domainDisposition:
        "bounded local prescribed coordinates around selected Monte Carlo points",
    },
    protocol,
    protocolHash,
    implementationIdentity,
    caseCount: caseRows.length,
    evaluationSummary: {
      drawnCount: caseRows.length,
      evaluatedCount: caseRows.length,
      notEvaluatedCount: 0,
      notEvaluatedByReason: {},
    },
    cases: caseRows.map((row, executionIndex) => ({
      caseId: row.caseId,
      caseHash: row.caseHash,
      scoreHash: row.scoreHash,
      executionIndex,
    })),
  };
  return {
    ...campaignIdentity,
    wallSeconds: (performance.now() - started) / 1_000,
    caseRows,
    campaignHash: sha256Canonical(campaignIdentity),
  };
}

export function directedOptimizerPoints(result) {
  const optimization = [];
  const dense = [];
  for (const basin of result.basins) {
    optimization.push({
      caseId: `${basin.basinId}/initial`,
      row: basin.initialEvaluation,
      lineage: {
        basinId: basin.basinId,
        sourceCaseId: basin.seedSource.caseId,
        pointKind: "initial-reevaluation",
      },
    });
    for (const iteration of basin.iterations) {
      for (const [trialIndex, trial] of iteration.trials.entries()) {
        if (trial.evaluation == null) continue;
        optimization.push({
          caseId:
            `${basin.basinId}/iteration-${iteration.iteration}/` +
            `${trial.move.operatorId}/${trial.move.direction}`,
          row: trial.evaluation,
          lineage: {
            basinId: basin.basinId,
            sourceCaseId: basin.seedSource.caseId,
            pointKind: "coordinate-trial",
            iteration: iteration.iteration,
            trialIndex,
            move: trial.move,
            disposition: trial.disposition,
          },
        });
      }
    }
    dense.push({
      caseId: `${basin.basinId}/dense-final`,
      row: basin.denseFinalEvaluation,
      lineage: {
        basinId: basin.basinId,
        sourceCaseId: basin.seedSource.caseId,
        pointKind: "dense-final",
        disposition: basin.disposition,
      },
    });
  }
  for (const heldOut of result.heldOutAudit.cases) {
    if (heldOut.evaluation == null) continue;
    dense.push({
      caseId:
        `${heldOut.basinId}/held-out-${heldOut.stratumId}-` +
        `${heldOut.ordinal}`,
      row: heldOut.evaluation,
      lineage: {
        basinId: heldOut.basinId,
        pointKind: "held-out-audit",
        stratumId: heldOut.stratumId,
        ordinal: heldOut.ordinal,
        usedForOptimization: false,
        moves: heldOut.moves,
        disposition: heldOut.disposition,
      },
    });
  }
  return { optimization, dense };
}
