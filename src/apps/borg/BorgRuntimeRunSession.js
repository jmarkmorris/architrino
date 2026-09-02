import { BORG_DATASET_MANIFEST_V1 } from "./BorgAppManifest.js";
import {
  BORG_DEFAULT_CERTIFIED_BUDGET_ID,
  getBorgCertifiedBudgetPreset,
} from "./BorgCertifiedBudgets.js";
import {
  BORG_EOM_RUN_GRADE_CERTIFIED,
  BORG_EOM_RUN_GRADE_DISPLAY,
} from "./BorgEomShadowRunner.js";
import { BORG_MAX_INITIAL_ARCHITRINO_COUNT } from "./BorgInitialConditions.js";

export const DEFAULT_RUN_CONTROL_PRESET_ID = "live-forever";
export const FINITE_RUN_CONTROL_PRESET_ID = "live-60s";
export const FIVE_MINUTE_RUN_CONTROL_PRESET_ID = "live-300s";
export const RUN_CONTROL_PRESETS = Object.freeze([
  Object.freeze({
    id: DEFAULT_RUN_CONTROL_PRESET_ID,
    label: "No limit",
    displayLabel: "No limit",
    sourceMode: "live",
    durationMode: "forever",
    targetDuration: Number.POSITIVE_INFINITY,
    chunkDuration: 20,
    minChunkDuration: 4,
  }),
  Object.freeze({
    id: FINITE_RUN_CONTROL_PRESET_ID,
    label: "60 seconds",
    displayLabel: "60 s",
    sourceMode: "live",
    targetDuration: 60,
    chunkDuration: 20,
    minTargetDuration: 60,
    minChunkDuration: 4,
  }),
  Object.freeze({
    id: FIVE_MINUTE_RUN_CONTROL_PRESET_ID,
    label: "5 minutes",
    displayLabel: "5 min",
    sourceMode: "live",
    targetDuration: 300,
    chunkDuration: 20,
    minTargetDuration: 300,
    minChunkDuration: 4,
  }),
]);

export function formatBorgRunDurationLabel(preset) {
  if (isBorgForeverRunPreset(preset)) {
    return "No limit";
  }
  const target = preset?.effectiveTargetDuration ?? preset?.targetDuration;
  if (Number.isFinite(Number(target))) {
    return `${Number(target)} s`;
  }
  return preset?.displayLabel ?? preset?.label ?? "Run";
}

export function formatBorgRunTargetDuration(preset) {
  if (isBorgForeverRunPreset(preset)) {
    return "forever";
  }
  return preset?.effectiveTargetDuration ?? preset?.targetDuration ?? "static";
}

export function isBorgForeverRunPreset(preset) {
  return (
    preset?.durationMode === "forever" ||
    preset?.targetDuration === Number.POSITIVE_INFINITY ||
    preset?.effectiveTargetDuration === Number.POSITIVE_INFINITY
  );
}

export function getBorgRunControlPreset(presetId) {
  return (
    RUN_CONTROL_PRESETS.find((preset) => preset.id === presetId) ??
    RUN_CONTROL_PRESETS.find((preset) => preset.id === DEFAULT_RUN_CONTROL_PRESET_ID) ??
    RUN_CONTROL_PRESETS[0]
  );
}

export function createDefaultBorgEomRecordReplayOptions(
  options = {},
  preset = getBorgRunControlPreset(),
) {
  if (options.eomRecordReplay === false || options.enableEomRecordReplay === false) {
    return null;
  }
  const configured =
    options.eomRecordReplay && typeof options.eomRecordReplay === "object"
      ? options.eomRecordReplay
      : null;
  if (!configured?.record) {
    return null;
  }
  return {
    ...configured,
    targetDuration: configured.targetDuration ?? preset.effectiveTargetDuration ?? preset.targetDuration,
    chunkDuration: configured.chunkDuration ?? preset.effectiveChunkDuration ?? preset.chunkDuration,
  };
}

export function createDefaultEomShadowRunnerOptions(
  options = {},
  preset = getBorgRunControlPreset(),
  initialFrameRows = null,
  manifest = BORG_DATASET_MANIFEST_V1,
  runtimeControls = {},
) {
  if (options.eomShadowRunner === false || options.enableEomShadowRunner === false) {
    return null;
  }
  const configured =
    options.eomShadowRunner && typeof options.eomShadowRunner === "object"
      ? options.eomShadowRunner
      : null;
  const eomClient = configured?.eomClient ?? configured?.eomClientFactory?.();
  if (!eomClient) {
    return null;
  }
  const historyEndTime = finiteBorgControlNumber(
    configured.startTime ?? options.eomHistoryEndTime ?? 0,
  );
  const requestedTarget = configured.targetDuration ?? preset.effectiveTargetDuration ?? preset.targetDuration;
  const historyDepth = positiveBorgControlNumber(
    runtimeControls.historyDepth ?? configured.historyDepth,
    manifest.simulationEnvelope?.historyDepth ?? 10,
  );
  const targetDuration = Number.isFinite(Number(requestedTarget))
    ? Number(requestedTarget)
    : historyEndTime + (finiteBorgControlNumber(configured.chunkDuration) ?? 20);
  const runDuration = positiveBorgControlNumber(
    runtimeControls.runDuration ?? configured.runDuration,
    targetDuration - historyEndTime,
  );
  const certifiedBudget = getBorgCertifiedBudgetPreset(
    runtimeControls.certifiedBudgetId ??
      configured.certifiedBudgetId ??
      BORG_DEFAULT_CERTIFIED_BUDGET_ID,
  );
  return {
    ...configured,
    eomClient,
    runGrade: normalizeBorgEomRunGrade(
      runtimeControls.runGrade ?? configured.runGrade,
      BORG_EOM_RUN_GRADE_DISPLAY,
    ),
    certifiedBudgetId: certifiedBudget.id,
    startTime: historyEndTime,
    targetDuration: historyEndTime + runDuration,
    runDuration,
    historyDepth,
    coreScale: Number(certifiedBudget.allocations.finiteWidth.coreScale),
    farFieldEnclosureFraction:
      certifiedBudget.allocations.ordinary.farFieldEnclosureFraction,
    coupling: String(
      runtimeControls.coupling ?? configured.coupling ?? manifest.modelControls?.coupling ?? 1,
    ),
    initialStep: certifiedBudget.allocations.controller.initialStep,
    minimumStep: certifiedBudget.allocations.controller.minimumStep,
    maximumStep: certifiedBudget.allocations.controller.maximumStep,
    useAdaptiveStepGrowth: certifiedBudget.allocations.controller.adaptiveGrowth,
    simulationOuterRadius: positiveBorgControlNumber(
      runtimeControls.simulationOuterRadius ?? configured.simulationOuterRadius,
      manifest.simulationEnvelope?.outerRadius ?? 1,
    ),
    pathCount: boundedBorgControlInteger(
      runtimeControls.pathCount,
      configured.pathCount ?? manifest.population?.architrinoCount ?? 1,
      1,
      manifest.population?.maximumArchitrinoCount ?? BORG_MAX_INITIAL_ARCHITRINO_COUNT,
    ),
    chunkDuration: configured.chunkDuration ?? preset.effectiveChunkDuration ?? preset.chunkDuration,
    initialFrameRows: configured.initialFrameRows ?? initialFrameRows ?? undefined,
  };
}

export function boundedBorgControlInteger(value, fallback, minimum, maximum) {
  const number = Number(value);
  return Number.isInteger(number)
    ? Math.min(maximum, Math.max(minimum, number))
    : fallback;
}

export function positiveBorgControlNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

export function normalizeBorgEomRunGrade(value, fallback) {
  return value === BORG_EOM_RUN_GRADE_CERTIFIED ||
      value === BORG_EOM_RUN_GRADE_DISPLAY
    ? value
    : fallback;
}

function finiteBorgControlNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}
