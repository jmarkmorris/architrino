import {
  PHOTON_NAMED_PRESETS,
  createPhotonPresetState,
} from "./PhotonPresetRuntime.js";
import {
  getPhotonMiddleCycleBounds,
  normalizePhotonState,
} from "./PhotonStateRuntime.js";
import {
  computePhotonSelfHitDiagnosticsWithPrescribedPathAnalysis,
} from "./PhotonFormulaRuntime.js";

export const PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_SCHEMA =
  "photon-helical-self-hit-phase-lock-sweep.v1";

export const PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_DEFAULTS = Object.freeze({
  presetIds: PHOTON_NAMED_PRESETS.map((preset) => preset.id),
  photonSpeedCfValues: [0, 0.25, 0.5, 0.75, 0.95, 1],
  signalSpeedCfValues: [0.6, 0.8, 1],
  observationProgressValues: [0, 1 / 8, 1 / 4, 3 / 8, 1 / 2, 3 / 4, 7 / 8],
  helicalSelfHitHistoryCycles: 3,
  helicalSelfHitScanSubdivisions: 160,
  helicalSelfHitMaxRoots: 12,
});

function roundSweepNumber(value, digits = 12) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return 0;
  }
  return Number(number.toFixed(digits));
}

function createSweepState({ presetId, photonSpeedCf, signalSpeedCf }) {
  const state = createPhotonPresetState(presetId);
  state.measurement.transmitterHistoryMode = "absolute_history";
  state.pair.speedMode = "direct";
  state.pair.photonSpeedCf = photonSpeedCf;
  state.measurement.signalSpeedCf = signalSpeedCf;
  state.measurement.emissionSpeedCf = signalSpeedCf;
  return normalizePhotonState(state);
}

function createObservationTime(state, observationProgress) {
  const middleCycle = getPhotonMiddleCycleBounds(state);
  const progress = Number(observationProgress) || 0;
  return middleCycle.start + (middleCycle.end - middleCycle.start) * progress;
}

function compactPhaseFamily(family = null) {
  if (!family) {
    return null;
  }
  return {
    key: family.key ?? "",
    label: family.label ?? "",
    role: family.role ?? "",
    layerId: family.layerId ?? "",
    chargeType: family.chargeType ?? "",
    transmitterCycleIndex: Number.isFinite(Number(family.transmitterCycleIndex))
      ? Number(family.transmitterCycleIndex)
      : 0,
    rootCount: Number(family.rootCount) || 0,
    transmitterPhaseSpreadDeg: roundSweepNumber(family.transmitterPhaseSpreadDeg, 6),
    receiverPhaseSpreadDeg: roundSweepNumber(family.receiverPhaseSpreadDeg, 6),
    minJacobianAbs: roundSweepNumber(family.minJacobianAbs, 12),
    maxFieldSpeedRatio: roundSweepNumber(family.maxFieldSpeedRatio, 6),
    speedFamily: family.speedFamily ?? "",
    phaseLockClassification: family.phaseLockClassification ?? "",
    phaseLockStable: family.phaseLockStable === true,
    phaseLockCandidate: family.phaseLockCandidate === true,
  };
}

function createSweepCaseId({ presetId, photonSpeedCf, signalSpeedCf, observationProgress }) {
  return [
    presetId,
    `cg${roundSweepNumber(photonSpeedCf, 3)}`,
    `cs${roundSweepNumber(signalSpeedCf, 3)}`,
    `p${roundSweepNumber(observationProgress, 4)}`,
  ].join("__").replaceAll(".", "_");
}

export function createPhotonSelfHitPhaseLockSweepCases(options = {}) {
  const presetIds = options.presetIds ?? PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_DEFAULTS.presetIds;
  const photonSpeedCfValues =
    options.photonSpeedCfValues ?? PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_DEFAULTS.photonSpeedCfValues;
  const signalSpeedCfValues =
    options.signalSpeedCfValues ?? PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_DEFAULTS.signalSpeedCfValues;
  const observationProgressValues =
    options.observationProgressValues ??
    PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_DEFAULTS.observationProgressValues;

  return presetIds.flatMap((presetId) =>
    photonSpeedCfValues.flatMap((photonSpeedCf) =>
      signalSpeedCfValues.flatMap((signalSpeedCf) =>
        observationProgressValues.map((observationProgress) => ({
          caseId: createSweepCaseId({
            presetId,
            photonSpeedCf,
            signalSpeedCf,
            observationProgress,
          }),
          presetId,
          photonSpeedCf,
          signalSpeedCf,
          observationProgress,
        }))
      )
    )
  );
}

function incrementCount(map, key, amount = 1) {
  const safeKey = key || "unknown";
  map[safeKey] = (map[safeKey] ?? 0) + amount;
}

function compareBestCase(left, right) {
  const leftFamily = left?.bestPhaseFamily;
  const rightFamily = right?.bestPhaseFamily;
  if (!leftFamily) {
    return right ? 1 : 0;
  }
  if (!rightFamily) {
    return -1;
  }
  return (
    Number(rightFamily.phaseLockStable) - Number(leftFamily.phaseLockStable) ||
    Number(rightFamily.phaseLockCandidate) - Number(leftFamily.phaseLockCandidate) ||
    rightFamily.rootCount - leftFamily.rootCount ||
    leftFamily.transmitterPhaseSpreadDeg - rightFamily.transmitterPhaseSpreadDeg ||
    rightFamily.minJacobianAbs - leftFamily.minJacobianAbs ||
    left.caseId.localeCompare(right.caseId)
  );
}

function summarizeSweepCases(caseResults, config) {
  const classificationCounts = {};
  const speedFamilyCounts = {};
  let totalPhaseFamilies = 0;
  let totalHelicalRoots = 0;
  let totalStablePhaseLockFamilies = 0;
  let totalCandidatePhaseLockFamilies = 0;
  let totalSingularCandidateFamilies = 0;
  let stablePhaseLockCaseCount = 0;
  let candidatePhaseLockCaseCount = 0;
  let singularCandidateCaseCount = 0;
  let totalHelicalCandidateRoots = 0;
  let totalHelicalAdmittedRoots = 0;
  let totalHelicalRejectedRoots = 0;
  const rejectedRootReasonCounts = {};

  caseResults.forEach((caseResult) => {
    totalPhaseFamilies += caseResult.helicalPhaseFamilyCount;
    totalHelicalRoots += caseResult.helicalRootFoundCount;
    totalStablePhaseLockFamilies += caseResult.helicalStablePhaseLockFamilyCount;
    totalCandidatePhaseLockFamilies += caseResult.helicalCandidatePhaseLockFamilyCount;
    totalSingularCandidateFamilies += caseResult.helicalSingularCandidateFamilyCount;
    totalHelicalCandidateRoots += caseResult.helicalCandidateRootCount;
    totalHelicalAdmittedRoots += caseResult.helicalAdmittedRootCount;
    totalHelicalRejectedRoots += caseResult.helicalRejectedRootCount;
    Object.entries(caseResult.helicalRejectedRootReasonCounts ?? {}).forEach(([reason, count]) => {
      incrementCount(rejectedRootReasonCounts, reason, Number(count) || 0);
    });
    if (caseResult.helicalStablePhaseLockFamilyCount > 0) {
      stablePhaseLockCaseCount += 1;
    }
    if (caseResult.helicalCandidatePhaseLockFamilyCount > 0) {
      candidatePhaseLockCaseCount += 1;
    }
    if (caseResult.helicalSingularCandidateFamilyCount > 0) {
      singularCandidateCaseCount += 1;
    }
    caseResult.phaseFamilies.forEach((family) => {
      incrementCount(classificationCounts, family.phaseLockClassification);
      incrementCount(speedFamilyCounts, family.speedFamily);
    });
  });

  const sortedCases = caseResults.slice().sort(compareBestCase);
  const bestStableCase = sortedCases.find(
    (caseResult) => caseResult.helicalStablePhaseLockFamilyCount > 0
  ) ?? null;
  const bestCandidateCase = sortedCases.find(
    (caseResult) => caseResult.helicalCandidatePhaseLockFamilyCount > 0
  ) ?? null;
  const bestSingularCase = sortedCases.find(
    (caseResult) => caseResult.helicalSingularCandidateFamilyCount > 0
  ) ?? null;

  return {
    schema: PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_SCHEMA,
    sweepId: config.sweepId,
    caseCount: caseResults.length,
    presetIds: config.presetIds,
    photonSpeedCfValues: config.photonSpeedCfValues,
    signalSpeedCfValues: config.signalSpeedCfValues,
    observationProgressValues: config.observationProgressValues,
    helicalSelfHitHistoryCycles: config.helicalSelfHitHistoryCycles,
    helicalSelfHitScanSubdivisions: config.helicalSelfHitScanSubdivisions,
    helicalSelfHitMaxRoots: config.helicalSelfHitMaxRoots,
    totalPhaseFamilies,
    totalHelicalRoots,
    stablePhaseLockFound: totalStablePhaseLockFamilies > 0,
    stablePhaseLockCaseCount,
    candidatePhaseLockCaseCount,
    singularCandidateCaseCount,
    totalStablePhaseLockFamilies,
    totalCandidatePhaseLockFamilies,
    totalSingularCandidateFamilies,
    totalHelicalCandidateRoots,
    totalHelicalAdmittedRoots,
    totalHelicalRejectedRoots,
    rejectedRootReasonCounts,
    classificationCounts,
    speedFamilyCounts,
    bestStableCase: bestStableCase ? compactSweepCase(bestStableCase) : null,
    bestCandidateCase: bestCandidateCase ? compactSweepCase(bestCandidateCase) : null,
    bestSingularCase: bestSingularCase ? compactSweepCase(bestSingularCase) : null,
  };
}

function compactSweepCase(caseResult) {
  return {
    caseId: caseResult.caseId,
    presetId: caseResult.presetId,
    photonSpeedCf: caseResult.photonSpeedCf,
    signalSpeedCf: caseResult.signalSpeedCf,
    observationProgress: caseResult.observationProgress,
    observationTime: caseResult.observationTime,
    helicalRootFoundCount: caseResult.helicalRootFoundCount,
    helicalCandidateRootCount: caseResult.helicalCandidateRootCount,
    helicalAdmittedRootCount: caseResult.helicalAdmittedRootCount,
    helicalRejectedRootCount: caseResult.helicalRejectedRootCount,
    helicalRejectedRootReasonCounts: caseResult.helicalRejectedRootReasonCounts,
    helicalPhaseFamilyCount: caseResult.helicalPhaseFamilyCount,
    helicalStablePhaseLockFamilyCount: caseResult.helicalStablePhaseLockFamilyCount,
    helicalCandidatePhaseLockFamilyCount: caseResult.helicalCandidatePhaseLockFamilyCount,
    helicalSingularCandidateFamilyCount: caseResult.helicalSingularCandidateFamilyCount,
    bestPhaseFamily: caseResult.bestPhaseFamily,
  };
}

async function evaluateSweepCase(sweepCase, config, options = {}) {
  const state = createSweepState(sweepCase);
  const observationTime = createObservationTime(state, sweepCase.observationProgress);
  const diagnostics = await computePhotonSelfHitDiagnosticsWithPrescribedPathAnalysis(state, {
    skipSpanSelfHitDiagnostics: true,
    selfHitObservationTime: observationTime,
    helicalSelfHitHistoryCycles: config.helicalSelfHitHistoryCycles,
    helicalSelfHitScanSubdivisions: config.helicalSelfHitScanSubdivisions,
    helicalSelfHitMaxRoots: config.helicalSelfHitMaxRoots,
    ...(options.diagnosticsOptions ?? {}),
  });
  const phaseFamilies = (diagnostics.helicalPhaseFamilies ?? []).map(compactPhaseFamily);
  return {
    ...sweepCase,
    observationTime: roundSweepNumber(observationTime, 12),
    status: diagnostics.status,
    helicalRecordCount: diagnostics.helicalRecordCount,
    helicalRootFoundCount: diagnostics.helicalRootFoundCount,
    helicalCandidateRootCount: diagnostics.helicalCandidateRootCount,
    helicalAdmittedRootCount: diagnostics.helicalAdmittedRootCount,
    helicalRejectedRootCount: diagnostics.helicalRejectedRootCount,
    helicalRejectedRootReasonCounts: diagnostics.helicalRejectedRootReasonCounts,
    helicalPhaseFamilyCount: diagnostics.helicalPhaseFamilyCount,
    helicalStablePhaseLockFamilyCount: diagnostics.helicalStablePhaseLockFamilyCount,
    helicalCandidatePhaseLockFamilyCount: diagnostics.helicalCandidatePhaseLockFamilyCount,
    helicalSingularCandidateFamilyCount: diagnostics.helicalSingularCandidateFamilyCount,
    helicalDiffusePhaseFamilyCount: diagnostics.helicalDiffusePhaseFamilyCount,
    helicalPhaseDriftFamilyCount: diagnostics.helicalPhaseDriftFamilyCount,
    helicalSingleHitFamilyCount: diagnostics.helicalSingleHitFamilyCount,
    helicalSelfHitFamilyCount: diagnostics.helicalSelfHitFamilyCount,
    helicalSubFieldFamilyCount: diagnostics.helicalSubFieldFamilyCount,
    helicalFieldSpeedBoundaryFamilyCount: diagnostics.helicalFieldSpeedBoundaryFamilyCount,
    bestPhaseFamily: compactPhaseFamily(diagnostics.helicalBestPhaseFamily),
    phaseFamilies,
  };
}

export async function runPhotonSelfHitPhaseLockSweep(options = {}) {
  const config = {
    sweepId: options.sweepId ?? "photon_helical_self_hit_phase_lock_sweep_v1",
    presetIds: options.presetIds ?? PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_DEFAULTS.presetIds,
    photonSpeedCfValues:
      options.photonSpeedCfValues ?? PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_DEFAULTS.photonSpeedCfValues,
    signalSpeedCfValues:
      options.signalSpeedCfValues ?? PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_DEFAULTS.signalSpeedCfValues,
    observationProgressValues:
      options.observationProgressValues ??
      PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_DEFAULTS.observationProgressValues,
    helicalSelfHitHistoryCycles:
      options.helicalSelfHitHistoryCycles ??
      PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_DEFAULTS.helicalSelfHitHistoryCycles,
    helicalSelfHitScanSubdivisions:
      options.helicalSelfHitScanSubdivisions ??
      PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_DEFAULTS.helicalSelfHitScanSubdivisions,
    helicalSelfHitMaxRoots:
      options.helicalSelfHitMaxRoots ?? PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_DEFAULTS.helicalSelfHitMaxRoots,
  };
  const cases = createPhotonSelfHitPhaseLockSweepCases(config).slice(
    0,
    Number.isFinite(Number(options.caseLimit)) ? Math.max(0, Number(options.caseLimit)) : undefined
  );
  const caseResults = [];
  for (const sweepCase of cases) {
    caseResults.push(await evaluateSweepCase(sweepCase, config, options));
    options.onProgress?.({
      completed: caseResults.length,
      total: cases.length,
      caseId: sweepCase.caseId,
    });
  }
  const summary = summarizeSweepCases(caseResults, config);
  return {
    schema: PHOTON_SELF_HIT_PHASE_LOCK_SWEEP_SCHEMA,
    generatedAt: options.generatedAt ?? null,
    deterministic: true,
    summary,
    cases: options.includeCases === false ? [] : caseResults,
  };
}
