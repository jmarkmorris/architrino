export function createBorgDeploymentFieldRows({ manifest, state, retentionPolicy }) {
  const budget = state.liveRunBudget;
  const calibration = state.measuredRunPresetCalibration;
  return [
    ["deploymentBudgetStatus", manifest.deploymentBudget.deploymentBudgetStatus],
    ["bundleSizeBytes", manifest.deploymentBudget.bundleSizeBytes ?? "not-measured"],
    ["staticAssetTransferBytes", manifest.deploymentBudget.staticAssetTransferBytes ?? "not-measured"],
    ["browserHeapBudget", manifest.deploymentBudget.browserHeapBudget ?? "not-measured"],
    ["gpuMemoryBudget", manifest.deploymentBudget.gpuMemoryBudget ?? "not-measured"],
    ["eomSolverThroughput", "not-measured"],
    ["liveRunBudget", budget.schema],
    ["liveBudgetStatus", budget.status],
    ["lastChunkMs", budget.lastChunkWallTimeMs ?? "not-measured"],
    ["chunkFrameRows", budget.computedFrameRows ?? "not-measured"],
    ["appendRowsPerSec", budget.frameAppendRateRowsPerSecond ?? "not-measured"],
    ["heapGrowthBytes", budget.browserHeapGrowthBytes ?? budget.browserHeapAuthority],
    ["workerMemoryBytes", budget.wasmWorkerMemoryEstimateBytes ?? budget.wasmWorkerMemoryAuthority],
    ["workerBudgetPressure", budget.wasmWorkerMemoryPressure ?? "not-measured"],
    ["liveRunRetention", retentionPolicy.schema],
    ["retentionStatus", state.liveRunRetention.status],
    ["retentionFrameLimit", state.liveRunRetention.retainedFrameSetLimit],
    ["measuredRunPresets", calibration.schema],
    ["presetThresholdStatus", calibration.status],
    ["presetThresholdAuthority", calibration.thresholdAuthority],
    ["presetSamples", calibration.sampleCount],
    ["targetDurationLimit", calibration.thresholds.maxTargetDuration],
    ["chunkDurationLimit", calibration.thresholds.maxChunkDuration],
  ];
}

export function createBorgSourceFieldRows({
  state,
  manifest,
  activePreset,
  placement,
  isEomSimulationActive,
  formatRunDurationLabel,
  formatRunTargetDuration,
  formatRealtimeRate,
  currentFrameCount,
  frameSetCount,
  sampleInterval,
}) {
  return [
    ["Run source", state.sourceMode],
    ["Run mode", formatRunDurationLabel(activePreset)],
    ["Playback pace", `${formatRealtimeRate(state.playbackAdaptiveRate)} T/s`],
    ["Solver production", state.playbackMeasuredProductionRate == null
      ? "not-measured"
      : `${formatRealtimeRate(state.playbackMeasuredProductionRate)} T/s`],
    ["Finite duration", state.eomRunDuration],
    ["Preset basis", activePreset?.thresholdAuthority ?? "not-measured"],
    ["Preset target", formatRunTargetDuration(activePreset)],
    ["Preset chunk", activePreset?.effectiveChunkDuration ?? "static"],
    ["Distribution", state.distributionLabel],
    ["Active electrinos", state.initialConditionConfig.electrinoCount],
    ["Active positrinos", state.initialConditionConfig.positrinoCount],
    ["EOM coupling $\\kappa$", state.eomCoupling],
    ["Per-axis speed maximum", state.initialConditionConfig.randomVelocityMaxComponentMagnitude],
    ["Total-speed minimum", state.initialConditionConfig.randomVelocityMinSpeed],
    ["Required initial separation", placement.minimumPairSeparation],
    ["Measured initial separation", state.eomSeedCertificate?.geometryCertificate?.measuredMinimumSeparation ?? "not-certified"],
    ["Run budget", state.liveRunBudget.status],
    ["Forward EOM status", state.dynamicRunnerStatus],
    ["Runner kind", state.dynamicRunnerKind],
    ["EOM architrinos", isEomSimulationActive ? state.eomPathCount : "not-applicable"],
    ["EOM ordered pairs", isEomSimulationActive ? state.eomPathCount ** 2 : "not-applicable"],
    ["EOM requested duration", isEomSimulationActive ? state.eomRunDuration : "not-applicable"],
    ["Forward EOM target", state.dynamicTargetDuration ?? "not-started"],
    ["Forward EOM chunk duration", state.dynamicChunkDuration ?? "not-started"],
    ["Forward EOM chunks", state.dynamicChunksComputed],
    ["Causal seed-history depth", isEomSimulationActive ? state.eomSeedHistoryDepth : "not-applicable"],
    ["EOM retained-history policy", state.eomRetainedHistoryPolicy],
    ["EOM retained-history start", state.eomRetainedHistoryStart ?? "not-started"],
    ["EOM retained-history end", state.eomRetainedHistoryEnd ?? "not-started"],
    ["Core scale $\\epsilon_c$", isEomSimulationActive ? state.eomCoreScale : "not-applicable"],
    ["Far-field enclosure", "certified policy"],
    ["Forward-evolution claim", isEomSimulationActive ? state.eomEvolutionClaimLevel : "not-applicable"],
    ["Initial-history certificate", state.eomSeedCertificate?.schema ?? "not-applicable"],
    ["Initial-history acceptance", state.eomSeedCertificate?.acceptanceScope ?? "not-applicable"],
    ["Initial history is EOM evidence", state.eomSeedCertificate?.canonicalEomEvidence ?? "not-applicable"],
    ["Initial-history SHA-256", state.eomSeedCertificate?.contentSha256 ?? "not-applicable"],
    ["Retention", state.liveRunRetention.status],
    ["Retained frames", state.liveRunRetention.retainedFrameRows],
    ["Retained keyframes", state.liveRunRetention.retainedFrameSetCount],
    ["Compacted path points", state.liveRunRetention.compactedPathPointCount],
    ["Forward EOM message", state.dynamicRunnerMessage],
    ["Manifest", manifest.manifestId],
    ["Source claim", manifest.claimLevel],
    ["Frame rows", currentFrameCount],
    ["EOM frame sets", frameSetCount],
    ["Sample interval", sampleInterval],
    ["Playback source", state.sourceMode],
    ["Initial layout", manifest.initialConditions.initialLinePolicy],
  ];
}

export function createBorgEnvelopeFieldRows({
  manifest,
  coupling,
  envelopeRadius,
  sampleInterval,
  populationCount,
  historyDepth,
}) {
  return [
    ["outerRadius", envelopeRadius],
    ["sampleInterval", sampleInterval],
    ["seedHistoryDepth", historyDepth],
    ["fieldSpeed", manifest.simulationEnvelope.fieldSpeed],
    ["coupling", coupling],
    ["seedWakeHorizon", manifest.simulationEnvelope.fieldSpeed * historyDepth],
    ["architrinoCount", populationCount ?? manifest.population.architrinoCount],
  ];
}

export function createBorgInitialConditionFieldRows({
  state,
  manifest,
  certifiedBudget,
  placement,
  activeFamily,
}) {
  const config = state.initialConditionConfig;
  return [
    ["family", activeFamily],
    ["seed", state.distributionFrameRows ? state.distributionLabel : manifest.initialConditions.initialConditionSeed ?? "null"],
    ["electrinoCount", config.electrinoCount],
    ["positrinoCount", config.positrinoCount],
    ["coupling $\\kappa$", state.eomCoupling],
    ["certifiedBudget", certifiedBudget.label],
    ["budgetAllocationHash", certifiedBudget.allocationHash],
    ["stepHeight", state.eomStepHeight],
    ["adaptiveMinimumStep", state.eomMinimumStep],
    ["velocityPolicy", manifest.initialConditions.velocityPolicy],
    ["maxPerAxisSpeed", config.randomVelocityMaxComponentMagnitude],
    ["minimumTotalSpeed", config.randomVelocityMinSpeed],
    ["minimumPairSeparation", placement.minimumPairSeparation],
    ["measuredMinimumSeparation", state.eomSeedCertificate?.geometryCertificate?.measuredMinimumSeparation ?? "not-certified"],
    ["velocity rays", state.activeLayers.has("velocity-vectors") ? "on" : "off"],
    ["customEditStatus", state.initialConditionEditStatus],
  ];
}

export function createBorgDiagnosticFieldRows({ diagnostics, manifest, formatPercent, formatPercentagePoints }) {
  return [
    ["proof claim", manifest.validation.proofClaimStatus],
    ["diagnostic authority", diagnostics?.authority ?? "not-measured"],
    ["raw EOM keyframe", diagnostics?.frameIndex ?? "not-measured"],
    ["diagnostic time", diagnostics?.time ?? "not-measured"],
    ["sphere radius", diagnostics?.sphereRadius ?? "not-measured"],
    ["electrinos outside sphere now", diagnostics?.outsideNow.electrino ?? "not-measured"],
    ["positrinos outside sphere now", diagnostics?.outsideNow.positrino ?? "not-measured"],
    ["electrinos escaped by time", diagnostics?.escapedThroughTime.electrino ?? "not-measured"],
    ["positrinos escaped by time", diagnostics?.escapedThroughTime.positrino ?? "not-measured"],
    ["close-pair threshold $\\epsilon_c$", diagnostics?.closePairThreshold ?? "not-measured"],
    ["close metric", diagnostics
      ? "fraction of unordered pairs inside core scale $\\epsilon_c$"
      : "not-measured"],
    ["electrino close-pair fraction", formatPercent(diagnostics?.pairs.electrino.closeFraction)],
    ["positrino close-pair fraction", formatPercent(diagnostics?.pairs.positrino.closeFraction)],
    ["all same-polarity close fraction", formatPercent(diagnostics?.pairs.same.closeFraction)],
    ["opposite-polarity close fraction", formatPercent(diagnostics?.pairs.opposite.closeFraction)],
    ["same / opposite close ratio", diagnostics?.sameToOppositeCloseRatio ?? "not-measured"],
    ["same - opposite close fraction", formatPercentagePoints(diagnostics?.sameMinusOppositeCloseFraction)],
    ["same-polarity mean separation", diagnostics?.pairs.same.meanSeparation ?? "not-measured"],
    ["opposite-polarity mean separation", diagnostics?.pairs.opposite.meanSeparation ?? "not-measured"],
  ];
}
