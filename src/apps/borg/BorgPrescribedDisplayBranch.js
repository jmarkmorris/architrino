import { getBorgCertifiedBudgetPreset } from "./BorgCertifiedBudgets.js";

export const BORG_PRESCRIBED_DISPLAY_PROFILE_V1 = Object.freeze({
  schema: "borg-prescribed-display-profile.v1",
  id: "borg-prescribed-display-v1",
  label: "Borg prescribed Display profile v1",
  runGrade: "display",
  certifiedBudgetId: "research-certified-v1",
  fieldSpeed: 1,
  coupling: "0.0005",
  sampleInterval: 0.01,
  chunkDuration: 0.3,
  historyPolicy: "exact-source-segment-prefix-through-selected-cut",
  promotionEligible: false,
});

let prescribedDisplayBranchSequence = 0;

export function createBorgPrescribedDisplayBranch({
  entry,
  cutTime,
  eomClient,
  manifest,
  runDuration = 60,
  profile = BORG_PRESCRIBED_DISPLAY_PROFILE_V1,
  runId,
} = {}) {
  const dataset = entry?.dataset;
  if (!dataset || dataset.provenance?.prescribedGeometry == null) {
    throw new TypeError("A prescribed Display branch requires a parsed prescribed-geometry record.");
  }
  if (dataset.provenance.claimGrade !== "chart-hypothesis" ||
      dataset.provenance.evidenceStatus !== "display-only") {
    throw new TypeError("A prescribed Display branch requires a display-only chart hypothesis.");
  }
  if (!eomClient || typeof eomClient.evolveRetainedHistories !== "function") {
    throw new TypeError("A prescribed Display branch requires an EOM client.");
  }
  if (!manifest || typeof manifest !== "object") {
    throw new TypeError("A prescribed Display branch requires the Borg manifest.");
  }
  validateProfile(profile, manifest, dataset);

  const cut = requiredFiniteNumber(cutTime, "selected cut time");
  if (!(cut > dataset.window.start && cut <= dataset.window.end)) {
    throw new RangeError(
      `The selected cut T=${cut} must lie in (${dataset.window.start}, ${dataset.window.end}].`,
    );
  }
  const duration = requiredPositiveNumber(runDuration, "Display branch run duration");
  const pathMap = Object.freeze(dataset.worldlines.map((worldline, index) => Object.freeze({
    sourceWorldlineId: worldline.id,
    sourcePathKey: worldline.pathKey,
    pathKey: 1001 + index,
  })));
  const retainedHistories = Object.freeze(dataset.worldlines.map((worldline, index) =>
    createRetainedHistory(worldline, pathMap[index].pathKey, cut, entry.sourceId),
  ));
  const displayRows = createDisplayRows(dataset, pathMap, cut, profile.sampleInterval);
  const certifiedBudget = getBorgCertifiedBudgetPreset(profile.certifiedBudgetId);
  const sphericalEnvelopeRadius = requiredPositiveNumber(
    dataset.provenance.prescribedGeometry.sphericalEnvelopeRadius,
    "prescribed spherical-envelope radius",
  );
  const historyDepth = cut - Number(retainedHistories[0].coverageStart);
  const resolvedRunId = String(
    runId ??
      `borg-prescribed-display:${entry.sourceId}:${Date.now()}:${++prescribedDisplayBranchSequence}`,
  );

  return Object.freeze({
    schema: "borg-prescribed-display-branch.v1",
    sourceRecordId: entry.sourceId,
    sourceRunId: dataset.provenance.runId,
    selectedCutTime: cut,
    profile,
    pathMap,
    displayRows,
    retainedHistories,
    runnerOptions: Object.freeze({
      eomClient,
      runId: resolvedRunId,
      runGrade: "display",
      startTime: cut,
      targetDuration: cut + duration,
      runDuration: duration,
      historyDepth,
      initialRetainedHistories: retainedHistories,
      initialHistoryProvenance:
        `prescribed-display-branch:${entry.sourceId}:${profile.id}`,
      initialHistoryClaimLevel: "display-only-chart-hypothesis",
      pathCount: retainedHistories.length,
      fieldSpeed: profile.fieldSpeed,
      coupling: profile.coupling,
      simulationOuterRadius: sphericalEnvelopeRadius,
      sampleInterval: profile.sampleInterval,
      chunkDuration: profile.chunkDuration,
      certifiedBudgetId: certifiedBudget.id,
      initialStep: certifiedBudget.allocations.controller.initialStep,
      minimumStep: certifiedBudget.allocations.controller.minimumStep,
      maximumStep: certifiedBudget.allocations.controller.maximumStep,
      useAdaptiveStepGrowth: certifiedBudget.allocations.controller.adaptiveGrowth,
      causalHistoryRetention: false,
    }),
  });
}

function createRetainedHistory(worldline, numericPathKey, cutTime, sourceRecordId) {
  const segments = worldline.segments
    .filter((segment) => Number(segment.endTime) <= cutTime + 1e-12)
    .map((segment) => Object.freeze({
      startTime: String(segment.startTime),
      endTime: String(segment.endTime),
      coefficients: Object.freeze(segment.coefficients.map((axis) =>
        Object.freeze(axis.map(String)),
      )),
      positionErrors: Object.freeze([0, 1, 2].map(() => String(segment.positionError ?? 0))),
      velocityErrors: Object.freeze([0, 1, 2].map(() => String(segment.velocityError ?? 0))),
      evidenceStatus: "display-only",
      claimGrade: "chart-hypothesis",
    }));
  if (segments.length === 0 || Math.abs(Number(segments.at(-1).endTime) - cutTime) > 1e-12) {
    throw new RangeError(
      `Selected cut T=${cutTime} is not a common exact segment boundary for ${worldline.id}.`,
    );
  }
  return Object.freeze({
    pathId: String(numericPathKey),
    pathKey: numericPathKey,
    charge: String(worldline.charge),
    stateFlags: worldline.stateFlags,
    coverageStart: segments[0].startTime,
    coverageEnd: segments.at(-1).endTime,
    interpolation: worldline.interpolation,
    sourceProvenance: `assembly-view-record:${sourceRecordId}`,
    sourceClaimLevel: "display-only-chart-hypothesis",
    sourceAcceptedInitialDatum: false,
    sourceIsEomOutput: false,
    segments: Object.freeze(segments),
  });
}

function createDisplayRows(dataset, pathMap, cutTime, sampleInterval) {
  const rows = [];
  const sampleCount = Math.round((cutTime - dataset.window.start) / sampleInterval);
  for (let sampleIndex = 0; sampleIndex <= sampleCount; sampleIndex += 1) {
    const time = sampleIndex === sampleCount
      ? cutTime
      : Number((dataset.window.start + sampleIndex * sampleInterval).toPrecision(15));
    dataset.worldlines.forEach((worldline, index) => {
      const evaluated = dataset.evaluateWorldline(worldline.id, time);
      rows.push(Object.freeze({
        pathKey: pathMap[index].pathKey,
        sourceWorldlineId: worldline.id,
        frameIndex: Math.round(time / sampleInterval),
        time,
        position: evaluated.position,
        velocity: evaluated.velocity,
        errorBound: evaluated.errorBound,
        stateFlags: worldline.stateFlags,
        runSource: "prescribed-display-branch-source-history",
        valueAuthority: "display-only-prescribed-source-history",
      }));
    });
  }
  return Object.freeze(rows);
}

function validateProfile(profile, manifest, dataset) {
  if (profile?.schema !== "borg-prescribed-display-profile.v1" ||
      profile.runGrade !== "display" || profile.promotionEligible !== false) {
    throw new TypeError("The prescribed branch profile must be fixed to non-promotable Display grade.");
  }
  if (Number(profile.fieldSpeed) !== Number(manifest.simulationEnvelope?.fieldSpeed)) {
    throw new RangeError("The prescribed Display profile field speed does not match Borg.");
  }
  const radius = Number(dataset.provenance.prescribedGeometry.sphericalEnvelopeRadius);
  if (radius !== Number(manifest.simulationEnvelope?.outerRadius)) {
    throw new RangeError("The prescribed geometry spherical envelope does not match Borg.");
  }
  getBorgCertifiedBudgetPreset(profile.certifiedBudgetId);
  requiredPositiveNumber(profile.sampleInterval, "profile sample interval");
  requiredPositiveNumber(profile.chunkDuration, "profile chunk duration");
  requiredPositiveNumber(profile.fieldSpeed, "profile field speed");
  requiredPositiveNumber(profile.coupling, "profile coupling");
}

function requiredFiniteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new TypeError(`${label} must be finite.`);
  }
  return number;
}

function requiredPositiveNumber(value, label) {
  const number = requiredFiniteNumber(value, label);
  if (!(number > 0)) {
    throw new RangeError(`${label} must be positive.`);
  }
  return number;
}
