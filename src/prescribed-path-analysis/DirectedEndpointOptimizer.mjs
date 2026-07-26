import { createHash } from "node:crypto";
import { performance } from "node:perf_hooks";

import {
  sha256Canonical,
} from "./AnalyticalBraidEvaluator.mjs";
import {
  createEndpointResidualSearchProtocol,
  evaluateEndpointResidualSearchCase,
} from "./EndpointResidualSearchCampaign.mjs";
import {
  validatePrescribedBraidSpec,
} from "../../scripts/eom/generate-prescribed-braid-record.mjs";

export const DIRECTED_ENDPOINT_OPTIMIZER_SCHEMA =
  "prescribed-path-analysis/directed-endpoint-optimizer-result.v1";
export const DIRECTED_ENDPOINT_OPTIMIZER_VERSION =
  "prescribed-record-analytics/directed-endpoint-optimizer.v1";
export const DIRECTED_ENDPOINT_OPTIMIZER_CONTINUATION_SCHEMA =
  "prescribed-path-analysis/directed-endpoint-optimizer-continuation-result.v1";
export const DIRECTED_ENDPOINT_OPTIMIZER_CONTINUATION_VERSION =
  "prescribed-record-analytics/directed-endpoint-optimizer-continuation.v1";

export const DEFAULT_DIRECTED_OPTIMIZER_STEPS = Object.freeze({
  uniformGeometryLog: 0.08,
  orbitRadiusLog: 0.08,
  spacingLog: 0.08,
  radialProfileLog: 0.06,
  phaseRadians: Math.PI / 18,
  axialShapeRadians: Math.PI / 60,
  translationSpeed: 0.02,
  flattening: 0.05,
});

export const DEFAULT_DIRECTED_OPTIMIZER_BOUNDS = Object.freeze({
  minimumRadiusRatioToSeed: 0.65,
  maximumRadiusRatioToSeed: 1.35,
  maximumMidpointDisplacementFromSeed: 0.3,
  maximumPhaseDisplacementFromSeed: Math.PI / 2,
  maximumTranslationChangeFromSeed: 0.12,
  maximumFlatteningChangeFromSeed: 0.3,
  maximumAbsoluteTranslationSpeed: 0.25,
});

export const DEFAULT_DIRECTED_OPTIMIZER_CONTINUATION_BOUNDS = Object.freeze({
  minimumRadiusRatioToSeed: 0.5,
  maximumRadiusRatioToSeed: 1.5,
  maximumMidpointDisplacementFromSeed: 0.45,
  maximumPhaseDisplacementFromSeed: Math.PI,
  maximumTranslationChangeFromSeed: 0.18,
  maximumFlatteningChangeFromSeed: 0.45,
  maximumAbsoluteTranslationSpeed: 0.25,
});

const HELD_OUT_STRATA = Object.freeze([
  "scale",
  "phase-shape",
  "coupled",
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

export function computeDirectedEndpointOptimizerResultHash(result) {
  const { resultHash: _resultHash, ...resultWithoutHash } = result;
  return sha256Canonical(withoutMeasuredTiming(resultWithoutHash));
}

function allBinaries(spec) {
  return spec.braids.flatMap((braid, braidIndex) =>
    braid.binaries.map((binary, binaryIndex) => ({
      braid,
      braidIndex,
      binary,
      binaryIndex,
    })));
}

function scaleVector(vector, factor) {
  return vector.map((value) => value * factor);
}

function addScaledVector(vector, direction, magnitude) {
  return vector.map((value, index) => value + direction[index] * magnitude);
}

function vectorNorm(vector) {
  return Math.hypot(...vector);
}

function wrappedAngle(value) {
  const turn = 2 * Math.PI;
  const wrapped = value % turn;
  return wrapped < 0 ? wrapped + turn : wrapped;
}

function wrappedAngleDifference(left, right) {
  const turn = 2 * Math.PI;
  const difference = Math.abs(wrappedAngle(left) - wrappedAngle(right));
  return Math.min(difference, turn - difference);
}

function scaleBinaryGeometry(binary, factor) {
  binary.radius *= factor;
  binary.axialHalfSeparation *= factor;
  binary.transverseOrbitRadius *= factor;
}

function centeredCoefficient(index, count) {
  if (count <= 1) return 0;
  return (2 * index - (count - 1)) / (count - 1);
}

function translationAxis(spec) {
  if (spec.taxonomy.familyId !== "A") {
    return [...spec.braids[0].frameDefinition.axis];
  }
  const sum = spec.braids[0].frameDefinition.nearRestAxes.reduce(
    (vector, axis) =>
      vector.map((value, index) => value + axis[index]),
    [0, 0, 0],
  );
  const norm = vectorNorm(sum);
  return sum.map((value) => value / norm);
}

function setAxialShape(binary, delta) {
  const angle = Math.atan2(
    binary.axialHalfSeparation,
    binary.transverseOrbitRadius,
  );
  const next = Math.min(
    Math.PI / 2,
    Math.max(0, angle + delta),
  );
  binary.axialHalfSeparation = binary.radius * Math.sin(next);
  binary.transverseOrbitRadius = binary.radius * Math.cos(next);
}

function mutateUniformGeometry(spec, signedStep) {
  const factor = Math.exp(signedStep);
  spec.braids.forEach((braid) => {
    braid.centerOffset = scaleVector(braid.centerOffset, factor);
    braid.binaries.forEach((binary) => {
      binary.centerOffset = scaleVector(binary.centerOffset, factor);
      scaleBinaryGeometry(binary, factor);
    });
  });
}

function mutateOrbitRadius(spec, signedStep) {
  const factor = Math.exp(signedStep);
  allBinaries(spec).forEach(({ binary }) =>
    scaleBinaryGeometry(binary, factor));
}

function mutateSpacing(spec, signedStep) {
  const factor = Math.exp(signedStep);
  spec.braids.forEach((braid) => {
    braid.centerOffset = scaleVector(braid.centerOffset, factor);
    braid.binaries.forEach((binary) => {
      binary.centerOffset = scaleVector(binary.centerOffset, factor);
    });
  });
}

function mutateRadialProfile(spec, signedStep) {
  const binaries = allBinaries(spec);
  binaries.forEach(({ binary }, index) => {
    const factor = Math.exp(
      signedStep * centeredCoefficient(index, binaries.length),
    );
    scaleBinaryGeometry(binary, factor);
  });
}

function mutatePhaseProfile(spec, signedStep) {
  const binaries = allBinaries(spec);
  binaries.forEach(({ binary }, index) => {
    binary.phase = wrappedAngle(
      binary.phase +
      signedStep * centeredCoefficient(index, binaries.length),
    );
  });
}

function mutateRelativeBraidPhase(spec, signedStep) {
  spec.braids[0].phaseOffset = wrappedAngle(
    spec.braids[0].phaseOffset - signedStep / 2,
  );
  spec.braids[1].phaseOffset = wrappedAngle(
    spec.braids[1].phaseOffset + signedStep / 2,
  );
}

function mutateAxialShape(spec, signedStep) {
  allBinaries(spec).forEach(({ binary }) =>
    setAxialShape(binary, signedStep));
}

function mutateTranslation(spec, signedStep, maximumAbsoluteSpeed) {
  spec.group.velocity = addScaledVector(
    spec.group.velocity,
    translationAxis(spec),
    signedStep,
  );
  if (vectorNorm(spec.group.velocity) > maximumAbsoluteSpeed) {
    throw new RangeError(
      "directed optimizer translation exceeded the declared absolute speed bound.",
    );
  }
}

function mutateFlattening(spec, signedStep) {
  const frame = spec.braids[0].frameDefinition;
  frame.flattening = Math.min(
    1,
    Math.max(0, frame.flattening + signedStep),
  );
}

const MOVE_OPERATORS = Object.freeze([
  Object.freeze({
    operatorId: "uniform-geometry-scale",
    stepKey: "uniformGeometryLog",
    applicable: () => true,
    mutate: mutateUniformGeometry,
  }),
  Object.freeze({
    operatorId: "orbit-radius-scale",
    stepKey: "orbitRadiusLog",
    applicable: () => true,
    mutate: mutateOrbitRadius,
  }),
  Object.freeze({
    operatorId: "family-c-spacing-scale",
    stepKey: "spacingLog",
    applicable: (spec) => spec.taxonomy.familyId === "C",
    mutate: mutateSpacing,
  }),
  Object.freeze({
    operatorId: "radial-profile-tilt",
    stepKey: "radialProfileLog",
    applicable: (spec) =>
      !["A1.2", "A2", "A3.2"].includes(spec.taxonomy.memberId),
    mutate: mutateRadialProfile,
  }),
  Object.freeze({
    operatorId: "phase-profile-twist",
    stepKey: "phaseRadians",
    applicable: (spec) =>
      !["A1.2", "A2", "A3.2"].includes(spec.taxonomy.memberId),
    mutate: mutatePhaseProfile,
  }),
  Object.freeze({
    operatorId: "relative-braid-phase",
    stepKey: "phaseRadians",
    applicable: (spec) => spec.braids.length === 2,
    mutate: mutateRelativeBraidPhase,
  }),
  Object.freeze({
    operatorId: "axial-shape",
    stepKey: "axialShapeRadians",
    applicable: (spec) => ![
      "A1",
      "A1.1",
      "A1.2",
      "A1.3",
      "A1.4",
      "B1.3",
      "B1.4",
      "C5",
      "C6",
    ].includes(spec.taxonomy.memberId),
    mutate: mutateAxialShape,
  }),
  Object.freeze({
    operatorId: "common-translation-axis",
    stepKey: "translationSpeed",
    applicable: () => true,
    mutate: (spec, signedStep, bounds) =>
      mutateTranslation(
        spec,
        signedStep,
        bounds.maximumAbsoluteTranslationSpeed,
      ),
  }),
  Object.freeze({
    operatorId: "family-a-flattening",
    stepKey: "flattening",
    applicable: (spec) => spec.taxonomy.familyId === "A",
    mutate: mutateFlattening,
  }),
]);

function binaryMap(spec) {
  return new Map(
    allBinaries(spec).map(({ braid, binary }) => [
      binary.binaryId,
      {
        radius: binary.radius,
        phase: binary.phase,
        midpoint: braid.centerOffset.map(
          (value, index) => value + binary.centerOffset[index],
        ),
      },
    ]),
  );
}

function assertWithinBasinBounds(seedSpec, trialSpec, bounds) {
  const seedBinaries = binaryMap(seedSpec);
  for (const [binaryId, trial] of binaryMap(trialSpec)) {
    const seed = seedBinaries.get(binaryId);
    if (!seed) {
      throw new RangeError(`basin bounds lack seed binary ${binaryId}.`);
    }
    const ratio = trial.radius / seed.radius;
    if (ratio < bounds.minimumRadiusRatioToSeed ||
        ratio > bounds.maximumRadiusRatioToSeed) {
      throw new RangeError(
        `${binaryId} radius ratio ${ratio} left the declared local basin.`,
      );
    }
    const midpointDisplacement = Math.hypot(
      ...trial.midpoint.map((value, index) => value - seed.midpoint[index]),
    );
    if (midpointDisplacement >
        bounds.maximumMidpointDisplacementFromSeed) {
      throw new RangeError(
        `${binaryId} midpoint displacement left the declared local basin.`,
      );
    }
    if (wrappedAngleDifference(trial.phase, seed.phase) >
        bounds.maximumPhaseDisplacementFromSeed) {
      throw new RangeError(
        `${binaryId} phase displacement left the declared local basin.`,
      );
    }
  }
  const translationChange = Math.hypot(
    ...trialSpec.group.velocity.map(
      (value, index) => value - seedSpec.group.velocity[index],
    ),
  );
  if (translationChange > bounds.maximumTranslationChangeFromSeed) {
    throw new RangeError(
      "common translation left the declared local basin.",
    );
  }
  if (seedSpec.taxonomy.familyId === "A") {
    const change = Math.abs(
      trialSpec.braids[0].frameDefinition.flattening -
      seedSpec.braids[0].frameDefinition.flattening,
    );
    if (change > bounds.maximumFlatteningChangeFromSeed) {
      throw new RangeError(
        "Family-A flattening left the declared local basin.",
      );
    }
  }
}

function applyOperator({
  currentSpec,
  seedSpec,
  operator,
  signedStep,
  bounds,
}) {
  if (!operator.applicable(currentSpec)) {
    return {
      status: "inapplicable",
      reason: `${operator.operatorId} is not a free coordinate for this taxonomy member.`,
    };
  }
  const trial = structuredClone(currentSpec);
  try {
    operator.mutate(trial, signedStep, bounds);
    assertWithinBasinBounds(seedSpec, trial, bounds);
    validatePrescribedBraidSpec(trial);
    return { status: "applicable", spec: trial };
  } catch (error) {
    return {
      status: "inapplicable",
      reason: error?.message ?? String(error),
    };
  }
}

function objectiveFromCase(row) {
  if (row.status !== "eligible-complete-inventory") return null;
  const guidance = row.refined.memberResidual.searchGuidance;
  return {
    refinedFullCyclePeak:
      guidance.fullCycleMaximumPointwiseMemberResidualNorm,
    refinedFullCycleRms:
      guidance.fullCycleRmsPointwiseMemberResidualNorm,
    adjudicationThreshold:
      row.refined.memberResidual.adjudicationThreshold,
  };
}

function compareObjectives(left, right) {
  if (right == null) return left == null ? 0 : -1;
  if (left == null) return 1;
  const peakScale = Math.max(
    1,
    Math.abs(left.refinedFullCyclePeak),
    Math.abs(right.refinedFullCyclePeak),
  );
  const peakTolerance = 1e-12 * peakScale;
  if (left.refinedFullCyclePeak <
      right.refinedFullCyclePeak - peakTolerance) {
    return -1;
  }
  if (left.refinedFullCyclePeak >
      right.refinedFullCyclePeak + peakTolerance) {
    return 1;
  }
  return left.refinedFullCycleRms - right.refinedFullCycleRms;
}

function compactRootAudit(audit) {
  return {
    status: audit?.status ?? null,
    tolerance: audit?.tolerance ?? null,
    rootCount: audit?.rootCount ?? 0,
    maximumAbsoluteResidual: audit?.maximumAbsoluteResidual ?? null,
    minimumTransversalityMargin:
      audit?.minimumTransversalityMargin ?? null,
    independentlyAuthoredCheck:
      audit?.independentlyAuthoredCheck ?? null,
  };
}

function compactEvaluation(row) {
  const objective = objectiveFromCase(row);
  return {
    caseId: row.caseId,
    familyId: row.familyId,
    memberId: row.memberId,
    candidateId: row.candidateId,
    status: row.status,
    completeInventory: row.completeInventory,
    independentRootCheckPassed: row.independentRootCheckPassed,
    sampledSpecHash: row.sampledSpecHash,
    sampledSpec: row.sampledSpec ?? null,
    coordinates: row.coordinates ?? null,
    searchProtocolHash: row.searchProtocolHash ?? null,
    exactSourceHash: row.exactSourceHash ?? null,
    objective,
    primaryInventoryCertification:
      row.primary?.inventoryCertification ?? null,
    primaryProtocolHash: row.primary?.protocolHash ?? null,
    primaryResultHash: row.primary?.resultHash ?? null,
    primaryRawEvidenceReceipt:
      row.primary?.rawEvidenceReceipt ?? null,
    refinedInventoryCertification:
      row.refined?.inventoryCertification ?? null,
    refinedProtocolHash: row.refined?.protocolHash ?? null,
    refinedResultHash: row.refined?.resultHash ?? null,
    refinedRawEvidenceReceipt:
      row.refined?.rawEvidenceReceipt ?? null,
    primaryIndependentRootResidualAudit:
      compactRootAudit(row.primary?.independentRootResidualAudit),
    refinedIndependentRootResidualAudit:
      compactRootAudit(row.refined?.independentRootResidualAudit),
    resolutionComparison: row.resolutionComparison ?? null,
    falsifiedAsExactIsolatedPrescribedHistory:
      row.refined?.memberResidual
        ?.falsifiedAsExactIsolatedPrescribedHistory ?? null,
    branchExistenceClaim:
      row.refined?.memberResidual?.branchExistenceClaim ?? false,
    returnSymmetryClaim:
      row.refined?.memberResidual?.returnSymmetryClaim ?? false,
    taxonomyClaim:
      row.refined?.memberResidual?.taxonomyClaim ?? false,
    error: row.error ?? null,
    measuredWallSeconds: row.measuredWallSeconds ?? null,
  };
}

function countBy(values, readKey) {
  return Object.fromEntries(
    [...values.reduce((counts, value) => {
      const key = readKey(value);
      counts.set(key, (counts.get(key) ?? 0) + 1);
      return counts;
    }, new Map()).entries()].sort(([left], [right]) =>
      left.localeCompare(right)),
  );
}

function evaluateSpec({
  candidate,
  spec,
  protocol,
  seed,
  stratumId,
  ordinal,
  refinement,
  coordinates,
  onRawPacket = null,
}) {
  return evaluateEndpointResidualSearchCase({
    candidate,
    sampled: {
      spec,
      coordinates,
      samplerId: DIRECTED_ENDPOINT_OPTIMIZER_VERSION,
      samplingDisposition:
        "bounded directed local prescribed-path coordinate move; " +
        "diagnostic search guidance only",
    },
    protocol,
    seed,
    stratumId,
    stratumOrdinal: ordinal,
    refinement,
    onRawPacket,
  });
}

function rankedEligibleSeedRows(sourceSearch) {
  const cases = sourceSearch?.screening?.cases ?? sourceSearch?.cases;
  if (!Array.isArray(cases)) {
    throw new TypeError(
      "directed optimizer source search must expose screening.cases or cases.",
    );
  }
  return cases.filter(
    (row) =>
      row.status === "eligible-complete-inventory" &&
      row.completeInventory === true &&
      row.independentRootCheckPassed === true &&
      row.sampledSpec != null,
  ).sort((left, right) =>
    compareObjectives(objectiveFromCase(left), objectiveFromCase(right)));
}

export function selectDirectedOptimizerSeeds(
  sourceSearch,
  { basinCount = 4 } = {},
) {
  if (!Number.isSafeInteger(basinCount) || basinCount < 1) {
    throw new TypeError("directed optimizer basinCount must be positive.");
  }
  const ranked = rankedEligibleSeedRows(sourceSearch);
  const selected = [];
  const selectedCaseIds = new Set();
  const selectedMembers = new Set();
  for (const row of ranked) {
    if (selectedMembers.has(row.memberId)) continue;
    selected.push(row);
    selectedCaseIds.add(row.caseId);
    selectedMembers.add(row.memberId);
    if (selected.length === basinCount) break;
  }
  for (const row of ranked) {
    if (selected.length === basinCount) break;
    if (selectedCaseIds.has(row.caseId)) continue;
    selected.push(row);
    selectedCaseIds.add(row.caseId);
  }
  if (selected.length < basinCount) {
    throw new RangeError(
      `directed optimizer requested ${basinCount} basins but only ` +
      `${selected.length} complete-inventory independently root-audited ` +
      "seed configurations are available.",
    );
  }
  return selected;
}

function runBasin({
  basinIndex,
  seedRow,
  candidate,
  protocol,
  denseProtocol,
  seed,
  maximumIterations,
  shrinkFactor,
  minimumStepScale,
  steps,
  bounds,
  onProgress,
  onRawPacket = null,
  sourceKind = "endpoint-search-seed",
  sourceResultHash = null,
  sourceBasinId = null,
  sourceObjective = null,
}) {
  const started = performance.now();
  const basinId = `basin-${basinIndex + 1}-${seedRow.memberId}`;
  const seedSpec = validatePrescribedBraidSpec(
    structuredClone(seedRow.sampledSpec),
  );
  let currentSpec = structuredClone(seedSpec);
  const initial = evaluateSpec({
    candidate,
    spec: currentSpec,
    protocol,
    seed,
    stratumId: `${basinId}-initial`,
    ordinal: 0,
    refinement: "directed-optimization",
    coordinates: {
      sourceCaseId: seedRow.caseId,
      stage: "initial-seed-reevaluation",
    },
    onRawPacket,
  });
  let currentObjective = objectiveFromCase(initial);
  const iterations = [];
  let stepScale = 1;
  let evaluationCount = 1;
  let stoppingAssessment = null;
  let terminationReason = currentObjective == null
    ? "certification-unknown-starting-point"
    : null;
  if (currentObjective != null) {
    for (let iterationIndex = 0;
      iterationIndex < maximumIterations &&
      stepScale >= minimumStepScale;
      iterationIndex += 1) {
      const stepScaleBefore = stepScale;
      const trials = [];
      let trialOrdinal = 0;
      for (const operator of MOVE_OPERATORS) {
        for (const direction of [-1, 1]) {
          const signedStep =
            direction * steps[operator.stepKey] * stepScale;
          const applied = applyOperator({
            currentSpec,
            seedSpec,
            operator,
            signedStep,
            bounds,
          });
          const move = {
            operatorId: operator.operatorId,
            stepKey: operator.stepKey,
            direction,
            baseStep: steps[operator.stepKey],
            stepScale,
            signedStep,
          };
          if (applied.status === "inapplicable") {
            trials.push({
              move,
              disposition: "inapplicable",
              reason: applied.reason,
            });
            continue;
          }
          const row = evaluateSpec({
            candidate,
            spec: applied.spec,
            protocol,
            seed,
            stratumId:
              `${basinId}-iteration-${iterationIndex + 1}-` +
              operator.operatorId,
            ordinal: trialOrdinal,
            refinement: "directed-optimization",
            coordinates: {
              sourceCaseId: seedRow.caseId,
              basinId,
              iteration: iterationIndex + 1,
              move,
            },
            onRawPacket,
          });
          trialOrdinal += 1;
          evaluationCount += 1;
          const objective = objectiveFromCase(row);
          trials.push({
            move,
            disposition: objective == null
              ? "unknown-failed-required-check"
              : "eligible-not-selected",
            evaluation: compactEvaluation(row),
            spec: applied.spec,
            objective,
          });
        }
      }
      const eligibleTrials = trials.filter((trial) => trial.objective != null);
      eligibleTrials.sort((left, right) =>
        compareObjectives(left.objective, right.objective));
      const bestTrial = eligibleTrials[0] ?? null;
      const improved = bestTrial != null &&
        compareObjectives(bestTrial.objective, currentObjective) < 0;
      if (improved) {
        if (
          bestTrial.evaluation.completeInventory !== true ||
          bestTrial.evaluation.independentRootCheckPassed !== true ||
          bestTrial.evaluation.refinedIndependentRootResidualAudit.status !==
            "passed"
        ) {
          throw new Error(
            `${basinId} attempted to accept an uncertified numerical point.`,
          );
        }
        bestTrial.disposition = "eligible-accepted-improvement";
        currentSpec = bestTrial.spec;
        currentObjective = bestTrial.objective;
      } else {
        stepScale *= shrinkFactor;
      }
      const serializableTrials = trials.map((trial) => {
        const { spec: _spec, objective: _objective, ...serializable } = trial;
        return serializable;
      });
      iterations.push({
        iteration: iterationIndex + 1,
        stepScaleBefore,
        improved,
        acceptedMove: improved ? bestTrial.move : null,
        acceptedPointCertification: improved
          ? {
            completeInventory: bestTrial.evaluation.completeInventory,
            independentRootCheckPassed:
              bestTrial.evaluation.independentRootCheckPassed,
            refinedIndependentRootResidualAudit:
              bestTrial.evaluation.refinedIndependentRootResidualAudit,
          }
          : null,
        bestObjectiveAfterIteration: currentObjective,
        stepScaleAfter: stepScale,
        trials: serializableTrials,
      });
      const applicableTrials = trials.filter(
        (trial) => trial.evaluation != null,
      );
      const unknownTrials = applicableTrials.filter(
        (trial) => trial.objective == null,
      );
      const eligibleTrialCount =
        applicableTrials.length - unknownTrials.length;
      stoppingAssessment = {
        iteration: iterationIndex + 1,
        stepScale: stepScaleBefore,
        improved,
        applicableTrialCount: applicableTrials.length,
        eligibleTrialCount,
        certificationUnknownTrialCount: unknownTrials.length,
        inapplicableTrialCount: trials.length - applicableTrials.length,
      };
      onProgress?.({
        stage: "basin-iteration-complete",
        basinId,
        iteration: iterationIndex + 1,
        maximumIterations,
        improved,
        objective: currentObjective,
        stepScale,
      });
      if (!improved && applicableTrials.length === 0) {
        terminationReason = "local-bound-no-applicable-moves";
        break;
      }
      if (!improved && stepScale < minimumStepScale) {
        terminationReason = unknownTrials.length > 0
          ? "certification-unknown-at-minimum-step"
          : "coordinate-stationarity-at-minimum-step";
        break;
      }
    }
  }
  if (terminationReason == null) {
    terminationReason = "iteration-budget-reached";
  }
  const dense = evaluateSpec({
    candidate,
    spec: currentSpec,
    protocol: denseProtocol,
    seed,
    stratumId: `${basinId}-dense-final`,
    ordinal: 0,
    refinement: "dense-final-refinement",
    coordinates: {
      sourceCaseId: seedRow.caseId,
      basinId,
      stage: "dense-final-refinement",
    },
    onRawPacket,
  });
  evaluationCount += 1;
  const denseObjective = objectiveFromCase(dense);
  const initialObjective = objectiveFromCase(initial);
  const serializedTrials = iterations.flatMap((iteration) =>
    iteration.trials);
  return {
    basinId,
    seedSource: {
      sourceKind,
      sourceResultHash,
      sourceBasinId,
      caseId: seedRow.caseId,
      candidateId: seedRow.candidateId,
      familyId: seedRow.familyId,
      memberId: seedRow.memberId,
      sampledSpecHash: seedRow.sampledSpecHash,
      sourceObjective: sourceObjective ?? objectiveFromCase(seedRow),
      sourceSearchCompleteInventory: seedRow.completeInventory,
      sourceSearchIndependentRootCheckPassed:
        seedRow.independentRootCheckPassed,
    },
    seedSpec,
    initialEvaluation: compactEvaluation(initial),
    iterations,
    finalSpec: currentSpec,
    finalSpecHash: sha256Canonical(currentSpec),
    denseFinalEvaluation: compactEvaluation(dense),
    optimizationObjective: currentObjective,
    denseFinalObjective: denseObjective,
    refinementStatus: denseObjective == null
      ? "unknown-failed-dense-required-check"
      : "eligible-dense-refined",
    improvement: {
      initialPeak: initialObjective?.refinedFullCyclePeak ?? null,
      optimizationPeak: currentObjective?.refinedFullCyclePeak ?? null,
      denseFinalPeak: denseObjective?.refinedFullCyclePeak ?? null,
      initialToDensePeakRatio:
        initialObjective != null && denseObjective != null
          ? initialObjective.refinedFullCyclePeak /
            denseObjective.refinedFullCyclePeak
          : null,
    },
    acceptedMoveCount: iterations.filter((iteration) =>
      iteration.improved).length,
    trialDispositionCounts: countBy(
      serializedTrials,
      (trial) => trial.disposition,
    ),
    terminationReason,
    stoppingAssessment,
    evaluationCount,
    measuredWallSeconds: (performance.now() - started) / 1_000,
    disposition: initialObjective == null
      ? "certification-unknown-starting-point"
      : denseObjective == null
        ? `${terminationReason}/dense-certification-unknown`
        : `${terminationReason}/dense-eligible`,
  };
}

function signedUnit(seed, ...parts) {
  const digest = createHash("sha256")
    .update([seed, ...parts].join("\0"))
    .digest();
  return 2 * (Number(digest.readBigUInt64BE(0)) / 2 ** 64) - 1;
}

function applyHeldOutPerturbation({
  spec,
  seedSpec,
  basinId,
  stratumId,
  ordinal,
  seed,
  bounds,
}) {
  const trial = structuredClone(spec);
  const moves = [];
  const perturb = (id, magnitude, mutate) => {
    const signedStep =
      signedUnit(seed, basinId, stratumId, ordinal, id) * magnitude;
    mutate(trial, signedStep, bounds);
    moves.push({ operatorId: id, signedStep });
  };
  try {
    if (stratumId === "scale") {
      perturb("held-out-uniform-geometry", 0.04, mutateUniformGeometry);
      perturb("held-out-orbit-radius", 0.03, mutateOrbitRadius);
    } else if (stratumId === "phase-shape") {
      let applicableCount = 0;
      const phaseOperator = MOVE_OPERATORS.find(
        (row) => row.operatorId === "phase-profile-twist",
      );
      const shapeOperator = MOVE_OPERATORS.find(
        (row) => row.operatorId === "axial-shape",
      );
      if (phaseOperator.applicable(trial)) {
        perturb("held-out-phase-profile", Math.PI / 24, mutatePhaseProfile);
        applicableCount += 1;
      }
      if (shapeOperator.applicable(trial)) {
        perturb(
          "held-out-axial-shape",
          Math.PI / 90,
          mutateAxialShape,
        );
        applicableCount += 1;
      }
      if (applicableCount === 0) {
        return {
          status: "inapplicable",
          reason:
            "phase and axial-shape coordinates are fixed for this taxonomy member.",
          moves: [],
        };
      }
    } else if (stratumId === "coupled") {
      perturb("held-out-coupled-geometry", 0.025, mutateUniformGeometry);
      if (trial.taxonomy.familyId === "C") {
        perturb("held-out-coupled-spacing", 0.025, mutateSpacing);
      }
      const phaseOperator = MOVE_OPERATORS.find(
        (row) => row.operatorId === "phase-profile-twist",
      );
      if (phaseOperator.applicable(trial)) {
        perturb(
          "held-out-coupled-phase",
          Math.PI / 36,
          mutatePhaseProfile,
        );
      }
      perturb(
        "held-out-coupled-translation",
        0.01,
        (target, signedStep) =>
          mutateTranslation(
            target,
            signedStep,
            bounds.maximumAbsoluteTranslationSpeed,
          ),
      );
    } else {
      throw new RangeError(`unsupported held-out stratum ${stratumId}.`);
    }
    assertWithinBasinBounds(seedSpec, trial, bounds);
    validatePrescribedBraidSpec(trial);
    return { status: "applicable", spec: trial, moves };
  } catch (error) {
    return {
      status: "inapplicable",
      reason: error?.message ?? String(error),
      moves,
    };
  }
}

function runHeldOutAudit({
  basins,
  candidatesById,
  protocol,
  seed,
  heldOutPerStratum,
  bounds,
  onProgress,
  onRawPacket = null,
}) {
  const started = performance.now();
  const cases = [];
  for (const basin of basins) {
    const candidate = candidatesById.get(basin.seedSource.candidateId);
    for (const stratumId of HELD_OUT_STRATA) {
      for (let ordinal = 0; ordinal < heldOutPerStratum; ordinal += 1) {
        const applied = applyHeldOutPerturbation({
          spec: basin.finalSpec,
          seedSpec: basin.seedSpec,
          basinId: basin.basinId,
          stratumId,
          ordinal,
          seed,
          bounds,
        });
        if (applied.status === "inapplicable") {
          cases.push({
            basinId: basin.basinId,
            stratumId,
            ordinal,
            usedForOptimization: false,
            disposition: "inapplicable",
            reason: applied.reason,
            moves: applied.moves,
          });
          continue;
        }
        const row = evaluateSpec({
          candidate,
          spec: applied.spec,
          protocol,
          seed,
          stratumId:
            `${basin.basinId}-held-out-${stratumId}`,
          ordinal,
          refinement: "held-out-dense-audit",
          coordinates: {
            basinId: basin.basinId,
            stratumId,
            ordinal,
            usedForOptimization: false,
            moves: applied.moves,
          },
          onRawPacket,
        });
        const objective = objectiveFromCase(row);
        const baselineObjective = basin.denseFinalObjective;
        cases.push({
          basinId: basin.basinId,
          stratumId,
          ordinal,
          usedForOptimization: false,
          moves: applied.moves,
          sampledSpec: applied.spec,
          evaluation: compactEvaluation(row),
          relativeToDenseBasinBest:
            objective != null && baselineObjective != null
              ? {
                peakRatio:
                  objective.refinedFullCyclePeak /
                  baselineObjective.refinedFullCyclePeak,
                rmsRatio:
                  objective.refinedFullCycleRms /
                  baselineObjective.refinedFullCycleRms,
              }
              : null,
          disposition: objective == null
            ? "unknown-failed-required-check"
            : "eligible-held-out-diagnostic",
        });
        onProgress?.({
          stage: "held-out-case-complete",
          basinId: basin.basinId,
          stratumId,
          ordinal,
          status: row.status,
        });
      }
    }
  }
  const eligible = cases.filter(
    (row) => row.disposition === "eligible-held-out-diagnostic",
  );
  const ratios = eligible
    .map((row) => row.relativeToDenseBasinBest?.peakRatio)
    .filter(Number.isFinite)
    .sort((left, right) => left - right);
  return {
    seed,
    strata: HELD_OUT_STRATA,
    casesPerStratumPerBasin: heldOutPerStratum,
    cases,
    summary: {
      drawnCount: cases.length,
      eligibleCount: eligible.length,
      unknownCount: cases.filter(
        (row) => row.disposition === "unknown-failed-required-check",
      ).length,
      inapplicableCount: cases.filter(
        (row) => row.disposition === "inapplicable",
      ).length,
      dispositionCounts: countBy(cases, (row) => row.disposition),
      dispositionCountsByStratum: Object.fromEntries(
        HELD_OUT_STRATA.map((stratumId) => [
          stratumId,
          countBy(
            cases.filter((row) => row.stratumId === stratumId),
            (row) => row.disposition,
          ),
        ]),
      ),
      exactNearZeroCount: eligible.filter(
        (row) =>
          row.evaluation
            .falsifiedAsExactIsolatedPrescribedHistory === false,
      ).length,
      bestPeakRatioToOptimizedBasin:
        ratios.length > 0 ? ratios[0] : null,
      worstPeakRatioToOptimizedBasin:
        ratios.length > 0 ? ratios.at(-1) : null,
    },
    measuredWallSeconds: (performance.now() - started) / 1_000,
    usedForOptimization: false,
    claimBoundary:
      "held-out deterministic local perturbations test only the sampled " +
      "prescribed-path neighborhoods; they do not validate a branch, basin " +
      "existence, stability, retention, taxonomy, return symmetry, or " +
      "physical realization",
  };
}

function summarizeBasins(basins, heldOutAudit) {
  const eligibleDense = basins.filter(
    (basin) => basin.denseFinalObjective != null,
  );
  const ranked = [...eligibleDense].sort((left, right) =>
    compareObjectives(left.denseFinalObjective, right.denseFinalObjective));
  const best = ranked[0] ?? null;
  const optimizationTrials = basins.flatMap((basin) =>
    basin.iterations.flatMap((iteration) => iteration.trials));
  return {
    basinCount: basins.length,
    eligibleDenseBasinCount: eligibleDense.length,
    unknownDenseBasinCount: basins.length - eligibleDense.length,
    evaluationCount: basins.reduce(
      (sum, basin) => sum + basin.evaluationCount,
      0,
    ) + heldOutAudit.cases.filter((row) => row.evaluation != null).length,
    acceptedMoveCount: basins.reduce(
      (sum, basin) => sum + basin.acceptedMoveCount,
      0,
    ),
    optimizationTrialDispositionCounts: countBy(
      optimizationTrials,
      (trial) => trial.disposition,
    ),
    basinTerminationCounts: countBy(
      basins,
      (basin) => basin.terminationReason,
    ),
    denseUnknownIndependentRootAuditCount: basins.filter(
      (basin) =>
        basin.denseFinalEvaluation.completeInventory === true &&
        basin.denseFinalEvaluation.independentRootCheckPassed === false,
    ).length,
    exactNearZeroDenseBasinCount: eligibleDense.filter(
      (basin) =>
        basin.denseFinalEvaluation
          .falsifiedAsExactIsolatedPrescribedHistory === false,
    ).length,
    bestBasin: best == null
      ? null
      : {
        basinId: best.basinId,
        candidateId: best.seedSource.candidateId,
        memberId: best.seedSource.memberId,
        sourceCaseId: best.seedSource.caseId,
        initialObjective: best.initialEvaluation.objective,
        denseFinalObjective: best.denseFinalObjective,
        improvement: best.improvement,
        maximumIndependentRootResidual:
          best.denseFinalEvaluation
            .refinedIndependentRootResidualAudit
            .maximumAbsoluteResidual,
        refinementStatus: best.refinementStatus,
      },
    heldOut: heldOutAudit.summary,
    claimBoundary:
      "bounded multi-start local-basin prescribed-path search guidance only; " +
      "not global optimization and no branch, stability, retention, taxonomy, " +
      "return-symmetry, or physical-realization evidence",
  };
}

export function runDirectedEndpointOptimizer({
  candidates,
  baseProtocol,
  sourceSearch,
  seed = "directed-endpoint-optimizer-2026-07-24-v1",
  basinCount = 4,
  maximumIterations = 5,
  shrinkFactor = 0.5,
  minimumStepScale = 0.125,
  heldOutPerStratum = 1,
  optimizationPrimaryTimeSamples = 12,
  optimizationRefinedTimeSamples = 24,
  densePrimaryTimeSamples = 48,
  denseRefinedTimeSamples = 96,
  steps = DEFAULT_DIRECTED_OPTIMIZER_STEPS,
  bounds = DEFAULT_DIRECTED_OPTIMIZER_BOUNDS,
  onProgress = null,
  onRawPacket = null,
} = {}) {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    throw new TypeError("directed endpoint optimizer requires candidates.");
  }
  if (!Number.isSafeInteger(maximumIterations) || maximumIterations < 1) {
    throw new TypeError(
      "directed endpoint optimizer maximumIterations must be positive.",
    );
  }
  if (!Number.isSafeInteger(heldOutPerStratum) ||
      heldOutPerStratum < 1) {
    throw new TypeError(
      "directed endpoint optimizer heldOutPerStratum must be positive.",
    );
  }
  if (!(shrinkFactor > 0 && shrinkFactor < 1)) {
    throw new RangeError(
      "directed endpoint optimizer shrinkFactor must lie between zero and one.",
    );
  }
  const started = performance.now();
  const optimizationProtocol = createEndpointResidualSearchProtocol(
    baseProtocol,
    {
      primaryTimeSamples: optimizationPrimaryTimeSamples,
      refinedTimeSamples: optimizationRefinedTimeSamples,
      suffix: "directed-local-optimization-v1",
    },
  );
  const denseProtocol = createEndpointResidualSearchProtocol(
    baseProtocol,
    {
      primaryTimeSamples: densePrimaryTimeSamples,
      refinedTimeSamples: denseRefinedTimeSamples,
      suffix: "directed-local-dense-audit-v1",
    },
  );
  const selectedSeeds = selectDirectedOptimizerSeeds(sourceSearch, {
    basinCount,
  });
  const candidatesById = new Map(
    candidates.map((candidate) => [
      candidate.declaration.candidateId,
      candidate,
    ]),
  );
  const basins = selectedSeeds.map((seedRow, basinIndex) => {
    const candidate = candidatesById.get(seedRow.candidateId);
    if (!candidate) {
      throw new Error(
        `directed optimizer lacks candidate ${seedRow.candidateId}.`,
      );
    }
    onProgress?.({
      stage: "basin-start",
      basinIndex,
      basinCount,
      caseId: seedRow.caseId,
      memberId: seedRow.memberId,
    });
    return runBasin({
      basinIndex,
      seedRow,
      candidate,
      protocol: optimizationProtocol,
      denseProtocol,
      seed,
      maximumIterations,
      shrinkFactor,
      minimumStepScale,
      steps,
      bounds,
      onProgress,
      onRawPacket,
    });
  });
  const heldOutAudit = runHeldOutAudit({
    basins,
    candidatesById,
    protocol: denseProtocol,
    seed: `${seed}/held-out`,
    heldOutPerStratum,
    bounds,
    onProgress,
    onRawPacket,
  });
  const resultWithoutHash = {
    schema: DIRECTED_ENDPOINT_OPTIMIZER_SCHEMA,
    version: DIRECTED_ENDPOINT_OPTIMIZER_VERSION,
    seed,
    sourceSearch: {
      schema: sourceSearch.schema ?? null,
      seed: sourceSearch.seed ?? sourceSearch.screening?.seed ?? null,
      resultHash: sourceSearch.resultHash ?? null,
      campaignHash: sourceSearch.campaignHash ??
        sourceSearch.screening?.campaignHash ?? null,
    },
    configuration: {
      basinCount,
      maximumIterations,
      shrinkFactor,
      minimumStepScale,
      heldOutPerStratum,
      steps,
      bounds,
      objectiveOrder: [
        "refined full-cycle worst per-Architrino residual",
        "refined full-cycle RMS per-Architrino residual",
      ],
      optimizationTimeSamples: {
        primary: optimizationPrimaryTimeSamples,
        refined: optimizationRefinedTimeSamples,
      },
      denseTimeSamples: {
        primary: densePrimaryTimeSamples,
        refined: denseRefinedTimeSamples,
      },
    },
    optimizationProtocolHash: sha256Canonical(optimizationProtocol),
    optimizationProtocol,
    denseProtocolHash: sha256Canonical(denseProtocol),
    denseProtocol,
    basins,
    heldOutAudit,
    summary: summarizeBasins(basins, heldOutAudit),
    measuredWallSeconds: (performance.now() - started) / 1_000,
    pathEvolutionInvoked: false,
    eomSolverInvoked: false,
    independentAcceptancePerformed: false,
    acceptedReturnSymmetryChanged: false,
    globalOptimizationClaim: false,
    branchExistenceClaim: false,
    stabilityClaim: false,
    retentionClaim: false,
    taxonomyClaim: false,
    physicalRealizationClaim: false,
  };
  return {
    ...resultWithoutHash,
    resultHash: computeDirectedEndpointOptimizerResultHash(resultWithoutHash),
  };
}

export function runDirectedEndpointOptimizerContinuation({
  candidates,
  baseProtocol,
  sourceResult,
  seed = "directed-endpoint-optimizer-continuation-2026-07-25-v1",
  maximumIterations = 24,
  shrinkFactor = 0.5,
  minimumStepScale = 1 / 32,
  heldOutPerStratum = 1,
  optimizationPrimaryTimeSamples = 12,
  optimizationRefinedTimeSamples = 24,
  densePrimaryTimeSamples = 48,
  denseRefinedTimeSamples = 96,
  steps = DEFAULT_DIRECTED_OPTIMIZER_STEPS,
  bounds = DEFAULT_DIRECTED_OPTIMIZER_CONTINUATION_BOUNDS,
  onProgress = null,
  onRawPacket = null,
} = {}) {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    throw new TypeError(
      "directed endpoint optimizer continuation requires candidates.",
    );
  }
  if (sourceResult?.schema !== DIRECTED_ENDPOINT_OPTIMIZER_SCHEMA) {
    throw new TypeError(
      "directed endpoint optimizer continuation requires a canonical " +
      "directed endpoint optimizer source result.",
    );
  }
  const computedSourceHash =
    computeDirectedEndpointOptimizerResultHash(sourceResult);
  if (
    typeof sourceResult.resultHash !== "string" ||
    sourceResult.resultHash !== computedSourceHash
  ) {
    throw new Error(
      "directed endpoint optimizer continuation source result hash failed.",
    );
  }
  if (!Array.isArray(sourceResult.basins) ||
      sourceResult.basins.length === 0) {
    throw new TypeError(
      "directed endpoint optimizer continuation source has no basins.",
    );
  }
  if (!Number.isSafeInteger(maximumIterations) || maximumIterations < 1) {
    throw new TypeError(
      "directed endpoint optimizer continuation maximumIterations must " +
      "be positive.",
    );
  }
  if (!Number.isSafeInteger(heldOutPerStratum) ||
      heldOutPerStratum < 1) {
    throw new TypeError(
      "directed endpoint optimizer continuation heldOutPerStratum must " +
      "be positive.",
    );
  }
  if (!(shrinkFactor > 0 && shrinkFactor < 1)) {
    throw new RangeError(
      "directed endpoint optimizer continuation shrinkFactor must lie " +
      "between zero and one.",
    );
  }
  if (!(minimumStepScale > 0 && minimumStepScale <= 1)) {
    throw new RangeError(
      "directed endpoint optimizer continuation minimumStepScale must " +
      "lie in (0, 1].",
    );
  }

  const started = performance.now();
  const optimizationProtocol = createEndpointResidualSearchProtocol(
    baseProtocol,
    {
      primaryTimeSamples: optimizationPrimaryTimeSamples,
      refinedTimeSamples: optimizationRefinedTimeSamples,
      suffix: "directed-local-continuation-optimization-v1",
    },
  );
  const denseProtocol = createEndpointResidualSearchProtocol(
    baseProtocol,
    {
      primaryTimeSamples: densePrimaryTimeSamples,
      refinedTimeSamples: denseRefinedTimeSamples,
      suffix: "directed-local-continuation-dense-audit-v1",
    },
  );
  const candidatesById = new Map(
    candidates.map((candidate) => [
      candidate.declaration.candidateId,
      candidate,
    ]),
  );
  const basins = sourceResult.basins.map((sourceBasin, basinIndex) => {
    if (
      sourceBasin.optimizationObjective == null ||
      sourceBasin.finalSpec == null
    ) {
      throw new Error(
        `${sourceBasin.basinId ?? `source basin ${basinIndex + 1}`} lacks ` +
        "a retained eligible optimization endpoint.",
      );
    }
    const retainedSpec = validatePrescribedBraidSpec(
      structuredClone(sourceBasin.finalSpec),
    );
    const retainedSpecHash = sha256Canonical(retainedSpec);
    if (retainedSpecHash !== sourceBasin.finalSpecHash) {
      throw new Error(
        `${sourceBasin.basinId} retained final specification hash failed.`,
      );
    }
    const candidate = candidatesById.get(
      sourceBasin.seedSource.candidateId,
    );
    if (!candidate) {
      throw new Error(
        "directed optimizer continuation lacks candidate " +
        `${sourceBasin.seedSource.candidateId}.`,
      );
    }
    const seedRow = {
      caseId: `${sourceBasin.basinId}/retained-final`,
      candidateId: sourceBasin.seedSource.candidateId,
      familyId: sourceBasin.seedSource.familyId,
      memberId: sourceBasin.seedSource.memberId,
      sampledSpec: retainedSpec,
      sampledSpecHash: retainedSpecHash,
      completeInventory: true,
      independentRootCheckPassed: true,
    };
    onProgress?.({
      stage: "basin-start",
      basinIndex,
      basinCount: sourceResult.basins.length,
      caseId: seedRow.caseId,
      memberId: seedRow.memberId,
      sourceBasinId: sourceBasin.basinId,
    });
    return runBasin({
      basinIndex,
      seedRow,
      candidate,
      protocol: optimizationProtocol,
      denseProtocol,
      seed,
      maximumIterations,
      shrinkFactor,
      minimumStepScale,
      steps,
      bounds,
      onProgress,
      onRawPacket,
      sourceKind: "retained-directed-optimizer-endpoint",
      sourceResultHash: sourceResult.resultHash,
      sourceBasinId: sourceBasin.basinId,
      sourceObjective: sourceBasin.optimizationObjective,
    });
  });
  const heldOutAudit = runHeldOutAudit({
    basins,
    candidatesById,
    protocol: denseProtocol,
    seed: `${seed}/held-out`,
    heldOutPerStratum,
    bounds,
    onProgress,
    onRawPacket,
  });
  const resultWithoutHash = {
    schema: DIRECTED_ENDPOINT_OPTIMIZER_CONTINUATION_SCHEMA,
    version: DIRECTED_ENDPOINT_OPTIMIZER_CONTINUATION_VERSION,
    seed,
    sourceRun: {
      schema: sourceResult.schema,
      version: sourceResult.version,
      resultHash: sourceResult.resultHash,
      basinCount: sourceResult.basins.length,
      retainedFinalSpecHashes: sourceResult.basins.map((basin) => ({
        basinId: basin.basinId,
        finalSpecHash: basin.finalSpecHash,
      })),
      newRandomDraws: false,
    },
    configuration: {
      basinCount: sourceResult.basins.length,
      maximumIterations,
      shrinkFactor,
      minimumStepScale,
      heldOutPerStratum,
      steps,
      bounds,
      stoppingConditions: {
        coordinateStationarity:
          "no improving move at the declared minimum step scale, with " +
          "every applicable neighbor complete-inventory and independently " +
          "root-audited",
        localBound:
          "no declared coordinate move remains applicable inside the " +
          "finite continuation bounds",
        certificationUnknown:
          "any unresolved required check at the minimum step prevents a " +
          "stationarity disposition",
        iterationBudget:
          "stop after the declared per-basin iteration count even if " +
          "improvement continues",
      },
      objectiveOrder: [
        "refined full-cycle worst per-Architrino residual",
        "refined full-cycle RMS per-Architrino residual",
      ],
      optimizationTimeSamples: {
        primary: optimizationPrimaryTimeSamples,
        refined: optimizationRefinedTimeSamples,
      },
      denseTimeSamples: {
        primary: densePrimaryTimeSamples,
        refined: denseRefinedTimeSamples,
      },
    },
    optimizationProtocolHash: sha256Canonical(optimizationProtocol),
    optimizationProtocol,
    denseProtocolHash: sha256Canonical(denseProtocol),
    denseProtocol,
    basins,
    heldOutAudit,
    summary: summarizeBasins(basins, heldOutAudit),
    measuredWallSeconds: (performance.now() - started) / 1_000,
    pathEvolutionInvoked: false,
    eomSolverInvoked: false,
    independentAcceptancePerformed: false,
    acceptedReturnSymmetryChanged: false,
    globalOptimizationClaim: false,
    branchExistenceClaim: false,
    stabilityClaim: false,
    retentionClaim: false,
    taxonomyClaim: false,
    physicalRealizationClaim: false,
  };
  return {
    ...resultWithoutHash,
    resultHash:
      computeDirectedEndpointOptimizerResultHash(resultWithoutHash),
  };
}
