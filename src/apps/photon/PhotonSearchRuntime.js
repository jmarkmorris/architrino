import {
  PHOTON_LAYER_ORDER,
  clonePhotonState,
  getPhotonLayer,
  getPhotonSeparationLog10Ratio,
  normalizePhotonDegrees,
  normalizePhotonState,
  resolvePhotonSpeedSettings,
  setPhotonLayerEnabled,
  setPhotonLayerValue,
  setPhotonPairSeparationLog10Ratio,
} from "./PhotonStateRuntime.js";
import {
  PHOTON_NAMED_PRESETS,
  createPhotonPresetState,
} from "./PhotonPresetRuntime.js";
import { computePhotonDiagnostics } from "./PhotonDiagnosticsRuntime.js";
import {
  computePhotonFormulaSummaryWithPrescribedPathAnalysis,
} from "./PhotonFormulaRuntime.js";

const PHOTON_SEARCH_RESULT_LIMIT = 12;
const PHOTON_SEARCH_SUMMARY_OPTIONS = Object.freeze({
  polarizationSampleCount: 48,
  minimumPolarizationSampleCount: 12,
  analyzerSampleCount: 18,
  minimumAnalyzerSampleCount: 8,
  skipSelfHitDiagnostics: true,
});
const PHOTON_SEARCH_PERTURB_OPTIONS = Object.freeze({
  polarizationSampleCount: 24,
  minimumPolarizationSampleCount: 8,
  analyzerSampleCount: 10,
  minimumAnalyzerSampleCount: 4,
  skipSelfHitDiagnostics: true,
});
const PHOTON_SEARCH_COMPARISON_OPTIONS = Object.freeze({
  polarizationSampleCount: 4,
  minimumPolarizationSampleCount: 4,
  analyzerSampleCount: 2,
  minimumAnalyzerSampleCount: 1,
  absoluteHistorySegments: 2,
  maxDelay: 0.25,
  skipSelfHitDiagnostics: false,
  skipSpanSelfHitDiagnostics: true,
});
const PHOTON_SEARCH_COMPARISON_CANDIDATE_LIMIT = 3;
const PHOTON_SEARCH_EXPORT_KIND = "photon-configuration-search-results";
const PHOTON_SEARCH_EXPORT_VERSION = 1;
const EPSILON = 1e-9;

function normalizeSearchName(value, fallback = "Configuration") {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text || fallback;
}

function cloneNormalizedPhotonState(state) {
  return normalizePhotonState(clonePhotonState(normalizePhotonState(state)));
}

function getEnabledMask(state) {
  return ["left", "right"]
    .map((braidId) =>
      PHOTON_LAYER_ORDER.map((layerId) =>
        getPhotonLayer(state, braidId, layerId).enabled !== false ? layerId : "-"
      ).join("")
    )
    .join("/");
}

function getStateSearchKey(state) {
  const normalized = normalizePhotonState(state);
  return JSON.stringify({
    pair: {
      separation: Number(normalized.pair.pairSeparation).toPrecision(10),
      speedMode: normalized.pair.speedMode,
      localLorentzFactor: Number(normalized.pair.localLorentzFactor ?? 1).toPrecision(10),
      photonSpeedCf: Number(normalized.pair.photonSpeedCf ?? 1).toPrecision(10),
      left: normalized.pair.left.layers,
      right: normalized.pair.right.layers,
    },
    measurement: {
      sourceHistoryMode: normalized.measurement.sourceHistoryMode,
      observer: normalized.measurement.virtualObserver,
      signalSpeedCf: Number(normalized.measurement.signalSpeedCf ?? 1).toPrecision(10),
    },
    analyzer: normalized.polarization.analyzerAngleDeg,
    view: normalized.view,
  });
}

function setEnabledLayers(state, enabledLayers) {
  const enabledSet = new Set(enabledLayers);
  ["left", "right"].forEach((braidId) => {
    PHOTON_LAYER_ORDER.forEach((layerId) => {
      setPhotonLayerEnabled(state, braidId, layerId, enabledSet.has(layerId));
    });
  });
}

function setPhases(state, phaseMap) {
  ["left", "right"].forEach((braidId) => {
    PHOTON_LAYER_ORDER.forEach((layerId) => {
      const phase = phaseMap?.[braidId]?.[layerId] ?? phaseMap?.[layerId];
      if (Number.isFinite(Number(phase))) {
        state.pair[braidId].layers[layerId].phaseDeg = normalizePhotonDegrees(phase);
      }
    });
  });
}

function setAnalyzerAngle(state, angleDeg) {
  if (Number.isFinite(Number(angleDeg))) {
    state.polarization.analyzerAngleDeg = Number(angleDeg);
  }
}

function setVirtualObserver(state, observer) {
  state.measurement.virtualObserver = {
    ...state.measurement.virtualObserver,
    ...observer,
  };
}

function setLocalCSpeedMode(state, speedMode, localLorentzFactor) {
  state.pair.speedMode = speedMode === "lorentz_factor" ? "lorentz_factor" : "direct";
  if (Number.isFinite(Number(localLorentzFactor))) {
    state.pair.localLorentzFactor = Number(localLorentzFactor);
  }
}

function mutateCandidateState(baseState, mutate) {
  const state = clonePhotonState(baseState);
  mutate(state);
  return normalizePhotonState(state);
}

function buildPhotonSearchCandidates(baseState) {
  const base = normalizePhotonState(baseState);
  const candidates = [];
  const seen = new Set();

  const pushCandidate = (name, state, source = "search") => {
    const normalized = normalizePhotonState(state);
    const key = getStateSearchKey(normalized);
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    candidates.push({
      name,
      source,
      state: normalized,
    });
  };

  pushCandidate("Current settings", base, "current");
  PHOTON_NAMED_PRESETS.forEach((preset) => {
    pushCandidate(preset.name, createPhotonPresetState(preset.id), "preset");
  });

  [
    ["Direct speed controls", "direct", base.pair.localLorentzFactor],
    ["Local c gamma 2", "lorentz_factor", 2],
    ["Local c gamma 5", "lorentz_factor", 5],
    ["Local c gamma 20", "lorentz_factor", 20],
    ["Local c gamma 100", "lorentz_factor", 100],
  ].forEach(([name, speedMode, localLorentzFactor]) => {
    pushCandidate(
      name,
      mutateCandidateState(base, (state) => {
        setLocalCSpeedMode(state, speedMode, localLorentzFactor);
      }),
      "local-c"
    );
  });

  [
    ["Outer only", ["O"]],
    ["Middle only", ["M"]],
    ["Inner only", ["I"]],
    ["Middle and Outer", ["M", "O"]],
    ["All layers", ["I", "M", "O"]],
  ].forEach(([name, enabledLayers]) => {
    pushCandidate(
      name,
      mutateCandidateState(base, (state) => setEnabledLayers(state, enabledLayers)),
      "enabled-layers"
    );
  });

  [
    ["Zero phase alignment", { I: 0, M: 0, O: 0 }],
    ["Shared 120 degree spread", { I: 0, M: 120, O: 240 }],
    [
      "Mirror 120 degree spread",
      {
        left: { I: 0, M: 120, O: 240 },
        right: { I: 0, M: 240, O: 120 },
      },
    ],
    [
      "Leading quadrature offset",
      {
        left: { I: 0, M: 0, O: 0 },
        right: { I: 90, M: 90, O: 90 },
      },
    ],
  ].forEach(([name, phases]) => {
    pushCandidate(
      name,
      mutateCandidateState(base, (state) => setPhases(state, phases)),
      "phase"
    );
  });

  [-4, -2, -1, 0, 1].forEach((log10Ratio) => {
    if (Math.abs(getPhotonSeparationLog10Ratio(base) - log10Ratio) <= 1e-8) {
      return;
    }
    pushCandidate(
      `App-coordinate Δx 10^${log10Ratio} r`,
      mutateCandidateState(base, (state) => setPhotonPairSeparationLog10Ratio(state, log10Ratio)),
      "delta-x"
    );
  });

  [
    ["Observer app-coordinate center", { x: 0, y: 0, z: 0 }],
    ["Observer app y +1", { x: 0, y: 1, z: 0 }],
    ["Observer app z +1", { x: 0, y: 0, z: 1 }],
    ["Observer app-coordinate diagonal", { x: 0, y: 1, z: 1 }],
    ["Observer app y edge", { x: 0, y: 4, z: 0 }],
  ].forEach(([name, observer]) => {
    pushCandidate(
      name,
      mutateCandidateState(base, (state) => setVirtualObserver(state, observer)),
      "observer"
    );
  });

  [0, 45, 90, 135].forEach((angleDeg) => {
    if (Math.abs(Number(base.polarization.analyzerAngleDeg) - angleDeg) <= 1e-8) {
      return;
    }
    pushCandidate(
      `Analyzer ${angleDeg} deg`,
      mutateCandidateState(base, (state) => setAnalyzerAngle(state, angleDeg)),
      "analyzer"
    );
  });

  pushCandidate(
    "Outer-only transverse observer",
    mutateCandidateState(base, (state) => {
      setEnabledLayers(state, ["O"]);
      setVirtualObserver(state, { x: 0, y: 4, z: 0 });
      setPhases(state, { I: 0, M: 0, O: 0 });
    }),
    "combined"
  );
  pushCandidate(
    "Small-gap phase stress",
    mutateCandidateState(base, (state) => {
      setPairAndPhaseStress(state);
    }),
    "combined"
  );
  pushCandidate(
    "Quadrature analyzer stress",
    mutateCandidateState(base, (state) => {
      setPhases(state, {
        left: { I: 0, M: 0, O: 0 },
        right: { I: 90, M: 90, O: 90 },
      });
      setAnalyzerAngle(state, 45);
    }),
    "combined"
  );

  return candidates;
}

function selectPhotonSearchCandidatePool(candidates, maxCandidates = Number.POSITIVE_INFINITY) {
  const budget = Math.max(0, Math.floor(Number(maxCandidates)));
  if (!Number.isFinite(budget) || candidates.length <= budget) {
    return candidates.slice();
  }
  if (budget === 0) {
    return [];
  }

  const preferredSources = [
    "current",
    "local-c",
    "preset",
    "enabled-layers",
    "phase",
    "delta-x",
    "observer",
    "combined",
    "analyzer",
  ];
  const selected = [];
  const selectedIndexes = new Set();

  const pushIndex = (index) => {
    if (
      selected.length >= budget ||
      index < 0 ||
      index >= candidates.length ||
      selectedIndexes.has(index)
    ) {
      return;
    }
    selectedIndexes.add(index);
    selected.push(candidates[index]);
  };

  preferredSources.forEach((source) => {
    const index = candidates.findIndex(
      (candidate, candidateIndex) =>
        !selectedIndexes.has(candidateIndex) && candidate.source === source
    );
    pushIndex(index);
  });

  candidates.forEach((_, index) => pushIndex(index));
  return selected;
}

function setPairAndPhaseStress(state) {
  setPhotonPairSeparationLog10Ratio(state, -2);
  setVirtualObserver(state, { x: 0.5, y: 1.25, z: -0.75 });
  setPhases(state, {
    left: { I: 0, M: 90, O: 180 },
    right: { I: 45, M: 135, O: 315 },
  });
}

function pushReason(reasons, tag, label, detail, score) {
  reasons.push({ tag, label, detail, score });
  return score;
}

function getPolarizationStrength(summary) {
  return Math.hypot(
    summary.polarization.amplitudes.y,
    summary.polarization.amplitudes.z
  );
}

function getSignedDegreeDelta(a, b) {
  const delta = ((((Number(a) - Number(b) + 180) % 360) + 360) % 360) - 180;
  return Math.abs(delta);
}

function perturbPhotonSearchState(state) {
  const perturbed = clonePhotonState(state);
  const layer = perturbed.pair?.right?.layers?.O ?? perturbed.pair?.left?.layers?.O;
  if (layer) {
    layer.phaseDeg = normalizePhotonDegrees((Number(layer.phaseDeg) || 0) + 5);
  }
  return normalizePhotonState(perturbed);
}

async function evaluatePhotonSearchPerturbationWithPrescribedPathAnalysis(state, summary, options = {}) {
  const perturbed = perturbPhotonSearchState(state);
  const nextSummary = await computePhotonFormulaSummaryWithPrescribedPathAnalysis(
    perturbed,
    0,
    createPhotonSearchSolverOptions(options, PHOTON_SEARCH_PERTURB_OPTIONS, "perturb")
  );
  return summarizePhotonSearchPerturbation(summary, nextSummary);
}

function summarizePhotonSearchPerturbation(summary, nextSummary) {
  const previousStrength = Math.max(EPSILON, getPolarizationStrength(summary));
  const nextStrength = getPolarizationStrength(nextSummary);
  const strengthDelta = Math.abs(nextStrength - previousStrength) / previousStrength;
  const phaseDelta = summary.polarization.phaseLagDefined && nextSummary.polarization.phaseLagDefined
    ? getSignedDegreeDelta(
        nextSummary.polarization.phaseLagDeg,
        summary.polarization.phaseLagDeg
      )
    : 0;
  const classificationChanged =
    nextSummary.polarization.classification !== summary.polarization.classification;
  return {
    classificationChanged,
    strengthDelta,
    phaseDelta,
    fitDelta: Math.abs(nextSummary.fitResidual - summary.fitResidual),
  };
}

function createPhotonSearchModeState(state, sourceHistoryMode) {
  const next = cloneNormalizedPhotonState(state);
  next.measurement.sourceHistoryMode = sourceHistoryMode === "absolute_history"
    ? "absolute_history"
    : "co_moving";
  return normalizePhotonState(next);
}

function summarizePhotonSearchMode(summary, diagnostics) {
  return {
    sourceMode: summary.field.sourceMode,
    classification: summary.polarization.classification,
    classificationLabel: summary.polarization.classificationLabel,
    fitResidual: summary.fitResidual,
    phaseLagDeg: summary.polarization.phaseLagDeg,
    phaseLagDefined: summary.polarization.phaseLagDefined,
    amplitudeY: summary.polarization.amplitudes.y,
    amplitudeZ: summary.polarization.amplitudes.z,
    amplitudeRatio: summary.polarization.amplitudes.relative,
    transverseAmplitude: diagnostics.transverseAmplitude,
    sourceCount: diagnostics.sourceCount,
    rootCount: diagnostics.rootCount,
    unresolvedSourceCount: diagnostics.unresolvedSourceCount,
    unstableSourceCount: diagnostics.unstableSourceCount,
    delaySolveGapMax: diagnostics.delaySolveGapMax,
    jacobianAbsMin: diagnostics.jacobianAbsMin,
    averageDelay: diagnostics.averageDelay,
    helicalPhaseFamilyCount: diagnostics.helicalPhaseFamilyCount,
    helicalStablePhaseFamilyCount: diagnostics.helicalStablePhaseFamilyCount,
    helicalBestPhaseFamilyLabel: diagnostics.helicalBestPhaseFamily?.label ?? "",
    helicalBestPhaseFamilySpreadDeg: diagnostics.helicalBestPhaseFamily?.sourcePhaseSpreadDeg ?? 0,
  };
}

function computePhotonSearchComparisonDeltas(coMoving, absoluteHistory) {
  const coStrength = Math.hypot(coMoving.amplitudeY, coMoving.amplitudeZ);
  const absoluteStrength = Math.hypot(absoluteHistory.amplitudeY, absoluteHistory.amplitudeZ);
  const strengthDenominator = Math.max(EPSILON, coStrength);
  const phaseDeltaDeg = coMoving.phaseLagDefined !== false && absoluteHistory.phaseLagDefined !== false
    ? getSignedDegreeDelta(absoluteHistory.phaseLagDeg, coMoving.phaseLagDeg)
    : 0;
  return {
    classificationChanged: coMoving.classification !== absoluteHistory.classification,
    strengthDelta: Math.abs(absoluteStrength - coStrength) / strengthDenominator,
    phaseDeltaDeg,
    fitResidualDelta: Math.abs(absoluteHistory.fitResidual - coMoving.fitResidual),
    rootCountDelta: absoluteHistory.rootCount - coMoving.rootCount,
    unresolvedDelta: absoluteHistory.unresolvedSourceCount - coMoving.unresolvedSourceCount,
    jacobianRatio: absoluteHistory.jacobianAbsMin / Math.max(EPSILON, coMoving.jacobianAbsMin),
    stableHelicalFamilyDelta:
      (absoluteHistory.helicalStablePhaseFamilyCount ?? 0) -
      (coMoving.helicalStablePhaseFamilyCount ?? 0),
  };
}

async function computePhotonSearchModeSummary(state, sourceHistoryMode, options = {}) {
  const modeState = createPhotonSearchModeState(state, sourceHistoryMode);
  const summary = await computePhotonFormulaSummaryWithPrescribedPathAnalysis(
    modeState,
    0,
    createPhotonSearchSolverOptions(options, PHOTON_SEARCH_COMPARISON_OPTIONS, "comparison")
  );
  const diagnostics = computePhotonDiagnostics(modeState, 0, summary);
  return summarizePhotonSearchMode(summary, diagnostics);
}

async function comparePhotonSearchHistoryModes(state, summary, diagnostics, options = {}) {
  if (options.compareAbsoluteHistory === false) {
    return {
      status: "disabled",
      message: "Absolute-history comparison disabled for this search.",
    };
  }
  const candidateIndex = Number(options.candidateIndex);
  const comparisonCandidateLimit = Math.max(
    0,
    Math.round(Number(options.comparisonCandidateLimit ?? PHOTON_SEARCH_COMPARISON_CANDIDATE_LIMIT))
  );
  if (Number.isFinite(candidateIndex) && candidateIndex >= comparisonCandidateLimit) {
    return {
      status: "skipped",
      message: "Absolute-history comparison skipped for this lower-priority candidate.",
    };
  }
  const currentMode = state.measurement?.sourceHistoryMode === "absolute_history"
    ? "absolute_history"
    : "co_moving";
  const coMoving = currentMode === "co_moving"
    ? summarizePhotonSearchMode(summary, diagnostics)
    : await computePhotonSearchModeSummary(state, "co_moving", options);
  try {
    const absoluteHistory = currentMode === "absolute_history"
      ? summarizePhotonSearchMode(summary, diagnostics)
      : await computePhotonSearchModeSummary(state, "absolute_history", options);
    return {
      status: "ok",
      coMoving,
      absoluteHistory,
      deltas: computePhotonSearchComparisonDeltas(coMoving, absoluteHistory),
    };
  } catch (error) {
    return {
      status: "error",
      message: error?.message ?? "Absolute-history comparison failed.",
      coMoving,
    };
  }
}

function createPhotonSearchSolverOptions(options, defaults, overrideKey) {
  const {
    limit: _limit,
    maxCandidates: _maxCandidates,
    summaryOptions,
    perturbOptions,
    comparisonOptions,
    compareAbsoluteHistory: _compareAbsoluteHistory,
    comparisonCandidateLimit: _comparisonCandidateLimit,
    candidateIndex: _candidateIndex,
    ...solverOptions
  } = options && typeof options === "object" ? options : {};
  const overrides = overrideKey === "comparison"
    ? comparisonOptions
    : overrideKey === "perturb"
      ? perturbOptions
      : summaryOptions;
  return {
    ...solverOptions,
    ...defaults,
    ...(overrides && typeof overrides === "object" ? overrides : {}),
  };
}

function countEnabledLayers(state) {
  return ["left", "right"].reduce((sum, braidId) => (
    sum + PHOTON_LAYER_ORDER.filter(
      (layerId) => getPhotonLayer(state, braidId, layerId).enabled !== false
    ).length
  ), 0);
}

function hasSimplePhases(state) {
  return ["left", "right"].every((braidId) =>
    PHOTON_LAYER_ORDER.every((layerId) => {
      const phase = Number(getPhotonLayer(state, braidId, layerId).phaseDeg) || 0;
      return Math.abs(phase - Math.round(phase / 45) * 45) <= 1e-6;
    })
  );
}

function buildPhotonSearchCandidateResult(
  candidate,
  index,
  state,
  summary,
  diagnostics,
  perturbation,
  comparison
) {
  const reasons = [];
  const components = {};
  const polarization = summary.polarization;
  const classification = polarization.classification;
  const strength = getPolarizationStrength(summary);
  const speedSettings = resolvePhotonSpeedSettings(state);
  const enabledCount = countEnabledLayers(state);
  const suspect =
    diagnostics.unresolvedSourceCount > 0 ||
    diagnostics.delaySolveGapMax > 0.05 ||
    diagnostics.jacobianAbsMin <= 1e-4 ||
    diagnostics.unstableSourceCount > 0;

  if (classification !== "weak" && summary.fitResidual <= 0.08 && strength > 0.05) {
    components.cleanPolarization = pushReason(
      reasons,
      "clean-polarization",
      "Clean polarization",
      `${polarization.classificationLabel}, fit residual ${summary.fitResidual.toFixed(4)}`,
      24 * (1 - Math.min(1, summary.fitResidual / 0.08))
    );
  }

  const absS3 = Math.abs(polarization.normalizedStokes.s3 || 0);
  if (
    (classification === "right_circular" || classification === "left_circular" || absS3 >= 0.7) &&
    polarization.amplitudes.relative > 0.55 &&
    polarization.amplitudes.relative < 1.85
  ) {
    components.circularBalance = pushReason(
      reasons,
      "near-circular",
      "Near circular balance",
      `handed component ${absS3.toFixed(2)}, E_z/E_y ${polarization.amplitudes.relative.toFixed(2)}`,
      18 * Math.min(1, absS3)
    );
  }

  const transversePerSource = diagnostics.transverseAmplitude / Math.max(1, diagnostics.sourceCount);
  if (diagnostics.sourceCount >= 8 && transversePerSource <= 0.22) {
    components.cancellation = pushReason(
      reasons,
      "strong-cancellation",
      "Strong cancellation",
      `${diagnostics.sourceCount} transmitters with ${diagnostics.transverseAmplitude.toFixed(3)} net transverse field`,
      14 * (1 - Math.min(1, transversePerSource / 0.22))
    );
  }

  if (
    diagnostics.unresolvedSourceCount === 0 &&
    diagnostics.delaySolveGapMax <= 0.01 &&
    diagnostics.jacobianAbsMin >= 0.05
  ) {
    components.causalRoots = pushReason(
      reasons,
      "healthy-roots",
      "Healthy causal roots",
      `${diagnostics.rootCount} roots, min |J| ${diagnostics.jacobianAbsMin.toFixed(3)}`,
      8
    );
  }

  if (diagnostics.rootCount > diagnostics.sourceCount && diagnostics.sourceCount > 0) {
    components.rootFamily = pushReason(
      reasons,
      "root-family",
      "Multiple-root family",
      `${diagnostics.rootCount} roots for ${diagnostics.sourceCount} transmitters`,
      6
    );
  }

  const helicalFamilySummary = diagnostics.helicalStablePhaseFamilyCount > 0
    ? diagnostics
    : comparison?.absoluteHistory;
  if ((helicalFamilySummary?.helicalStablePhaseFamilyCount ?? 0) > 0) {
    components.helicalPhaseFamily = pushReason(
      reasons,
      "helical-phase-family",
      "Helical phase family",
      `${helicalFamilySummary.helicalStablePhaseFamilyCount} stable families, best ${helicalFamilySummary.helicalBestPhaseFamilyLabel || "n/a"}`,
      9
    );
  }

  if (
    perturbation.classificationChanged ||
    perturbation.phaseDelta >= 25 ||
    perturbation.strengthDelta >= 0.35 ||
    perturbation.fitDelta >= 0.12
  ) {
    components.transition = pushReason(
      reasons,
      "sharp-transition",
      "Sharp transition",
      `5 deg nudge changes mode/lag/strength noticeably`,
      10
    );
  } else if (classification !== "weak" && summary.fitResidual <= 0.12) {
    components.robust = pushReason(
      reasons,
      "robust-pattern",
      "Robust pattern",
      `5 deg nudge keeps the same polarization family`,
      7
    );
  }

  if (enabledCount <= 4 || hasSimplePhases(state)) {
    components.simple = pushReason(
      reasons,
      "simple-explanation",
      "Simple explanation",
      `${enabledCount} enabled binaries with phase values on 45 deg steps`,
      5
    );
  }

  if (speedSettings.speedMode === "lorentz_factor") {
    components.derivedLocalC = pushReason(
      reasons,
      "derived-local-c",
      "Derived local c",
      `gamma ${speedSettings.localLorentzFactor.toFixed(2)}, c/c_f ${speedSettings.photonSpeedCf.toFixed(3)}`,
      6
    );
  }

  if (comparison?.status === "ok") {
    const deltas = comparison.deltas ?? {};
    const comparisonSuspect =
      comparison.absoluteHistory?.unresolvedSourceCount > 0 ||
      comparison.absoluteHistory?.delaySolveGapMax > 0.05 ||
      comparison.absoluteHistory?.jacobianAbsMin <= 1e-4;
    if (
      !comparisonSuspect &&
      !deltas.classificationChanged &&
      deltas.strengthDelta <= 0.18 &&
      deltas.phaseDeltaDeg <= 12
    ) {
      components.absoluteAgreement = pushReason(
        reasons,
        "absolute-history-agreement",
        "Absolute-history agreement",
        `absolute mode keeps ${comparison.absoluteHistory.classificationLabel}, strength delta ${(deltas.strengthDelta * 100).toFixed(0)}%`,
        9
      );
    } else if (
      deltas.classificationChanged ||
      deltas.strengthDelta >= 0.4 ||
      deltas.phaseDeltaDeg >= 30 ||
      Math.abs(deltas.rootCountDelta) >= Math.max(2, diagnostics.sourceCount * 0.25)
    ) {
      components.absoluteDivergence = pushReason(
        reasons,
        "absolute-history-divergence",
        "Absolute-history divergence",
        `absolute mode changes ${comparison.coMoving.classificationLabel} to ${comparison.absoluteHistory.classificationLabel}`,
        7
      );
    }
    if (comparisonSuspect) {
      components.absoluteSuspect = pushReason(
        reasons,
        "absolute-history-suspect",
        "Absolute-history suspect",
        `absolute mode missed ${comparison.absoluteHistory.unresolvedSourceCount}, min |J| ${comparison.absoluteHistory.jacobianAbsMin.toFixed(4)}`,
        -8
      );
    }
  }

  if (suspect) {
    components.suspect = pushReason(
      reasons,
      "suspect-numerics",
      "Suspect numerics",
      `missed ${diagnostics.unresolvedSourceCount}, gap ${diagnostics.delaySolveGapMax.toFixed(3)}, min |J| ${diagnostics.jacobianAbsMin.toFixed(4)}`,
      -12
    );
  }

  if (reasons.length === 0) {
    components.reference = pushReason(
      reasons,
      "reference",
      "Reference state",
      "Useful for comparison against nearby search variants",
      1
    );
  }

  const rawScore = reasons.reduce((sum, reason) => sum + reason.score, 0);
  const score = suspect ? rawScore * 0.55 : rawScore;
  return {
    id: `search-candidate-${index + 1}`,
    name: buildPhotonSearchResultName(candidate.name, polarization.classificationLabel, reasons),
    source: candidate.source,
    selected: true,
    promotedPresetId: "",
    state,
    score,
    scoreComponents: components,
    reasons,
    suspect,
    polarization: {
      classification,
      classificationLabel: polarization.classificationLabel,
      fitResidual: summary.fitResidual,
      phaseLagDeg: polarization.phaseLagDeg,
      phaseLagDefined: polarization.phaseLagDefined,
      amplitudeY: polarization.amplitudes.y,
      amplitudeZ: polarization.amplitudes.z,
      amplitudeRatio: polarization.amplitudes.relative,
      normalizedStokes: polarization.normalizedStokes,
    },
    diagnostics: {
      transverseAmplitude: diagnostics.transverseAmplitude,
      longitudinalLeakage: diagnostics.longitudinalLeakage,
      analyzerResidual: summary.analyzerResidual,
      analyzerTarget: summary.analyzerTarget,
      averageAnalyzerFraction: summary.averageAnalyzerFraction,
      sourceCount: diagnostics.sourceCount,
      rootCount: diagnostics.rootCount,
      unresolvedSourceCount: diagnostics.unresolvedSourceCount,
      unstableSourceCount: diagnostics.unstableSourceCount,
      sourceHistoryProviderId: diagnostics.sourceHistoryProviderId ?? "",
      analysisFieldSchema: diagnostics.analysisFieldSchema ?? "",
      fieldReconstructionOwner: diagnostics.fieldReconstructionOwner ?? "",
      receiverNormalOwner: diagnostics.receiverNormalOwner ?? "",
      delaySolveGapMax: diagnostics.delaySolveGapMax,
      jacobianAbsMin: diagnostics.jacobianAbsMin,
      averageDelay: diagnostics.averageDelay,
      helicalSpeedRegimeSummary: diagnostics.helicalSpeedRegimeSummary,
      helicalPhaseFamilyCount: diagnostics.helicalPhaseFamilyCount,
      helicalStablePhaseFamilyCount: diagnostics.helicalStablePhaseFamilyCount,
      helicalStablePhaseLockFamilyCount: diagnostics.helicalStablePhaseLockFamilyCount,
      helicalCandidatePhaseLockFamilyCount: diagnostics.helicalCandidatePhaseLockFamilyCount,
      helicalSingularCandidateFamilyCount: diagnostics.helicalSingularCandidateFamilyCount,
      helicalDiffusePhaseFamilyCount: diagnostics.helicalDiffusePhaseFamilyCount,
      helicalPhaseDriftFamilyCount: diagnostics.helicalPhaseDriftFamilyCount,
      helicalSingleHitFamilyCount: diagnostics.helicalSingleHitFamilyCount,
      helicalSelfHitFamilyCount: diagnostics.helicalSelfHitFamilyCount,
      helicalSubFieldFamilyCount: diagnostics.helicalSubFieldFamilyCount,
      helicalFieldSpeedBoundaryFamilyCount: diagnostics.helicalFieldSpeedBoundaryFamilyCount,
      helicalBestPhaseFamilyLabel: diagnostics.helicalBestPhaseFamily?.label ?? "",
      helicalBestPhaseFamilyClass: diagnostics.helicalBestPhaseFamily?.phaseLockClassification ?? "",
      helicalBestPhaseFamilySpeedFamily: diagnostics.helicalBestPhaseFamily?.speedFamily ?? "",
      helicalBestPhaseFamilySpreadDeg: diagnostics.helicalBestPhaseFamily?.sourcePhaseSpreadDeg ?? 0,
      speedMode: speedSettings.speedMode,
      localLorentzFactor: speedSettings.localLorentzFactor,
      signalSpeedCf: speedSettings.signalSpeedCf,
      photonSpeedCf: speedSettings.photonSpeedCf,
    },
    comparison: comparison ?? {
      status: "unavailable",
      message: "Absolute-history comparison was not computed.",
    },
    plot: {
      runDuration: summary.runDuration,
      middleCycleStart: summary.middleCycle.start,
      middleCycleEnd: summary.middleCycle.end,
      maxE: Math.max(
        Math.abs(polarization.amplitudes.y),
        Math.abs(polarization.amplitudes.z)
      ),
    },
  };
}

async function evaluatePhotonSearchCandidateWithPrescribedPathAnalysis(candidate, index, options = {}) {
  const state = cloneNormalizedPhotonState(candidate.state);
  const summary = await computePhotonFormulaSummaryWithPrescribedPathAnalysis(
    state,
    0,
    createPhotonSearchSolverOptions(options, PHOTON_SEARCH_SUMMARY_OPTIONS, "summary")
  );
  const diagnostics = computePhotonDiagnostics(state, 0, summary);
  const perturbation = await evaluatePhotonSearchPerturbationWithPrescribedPathAnalysis(
    state,
    summary,
    options
  );
  const comparison = await comparePhotonSearchHistoryModes(
    state,
    summary,
    diagnostics,
    {
      ...options,
      candidateIndex: index,
    }
  );
  return buildPhotonSearchCandidateResult(
    candidate,
    index,
    state,
    summary,
    diagnostics,
    perturbation,
    comparison
  );
}

function buildPhotonSearchResultName(candidateName, classificationLabel, reasons) {
  const primary = reasons.find((reason) => reason.score > 0)?.label ?? "Reference";
  return normalizeSearchName(`${primary}: ${classificationLabel} (${candidateName})`);
}

function selectDiversePhotonSearchResults(evaluatedResults, limit = PHOTON_SEARCH_RESULT_LIMIT) {
  const sorted = evaluatedResults
    .slice()
    .sort((a, b) => b.score - a.score);
  const selected = [];
  const signatures = new Set();

  sorted.forEach((result) => {
    if (selected.length >= limit) {
      return;
    }
    const primaryTag = result.reasons.find((reason) => reason.score > 0)?.tag ?? "reference";
    const signature = [
      result.polarization.classification,
      primaryTag,
      getEnabledMask(result.state),
      result.suspect ? "suspect" : "clean",
    ].join("|");
    if (signatures.has(signature) && selected.length >= Math.max(4, Math.floor(limit / 2))) {
      return;
    }
    signatures.add(signature);
    selected.push(result);
  });

  sorted.forEach((result) => {
    if (selected.length >= limit || selected.includes(result)) {
      return;
    }
    selected.push(result);
  });

  return selected.slice(0, limit).map((result, index) => ({
    ...result,
    id: `photon-search-${String(index + 1).padStart(2, "0")}`,
  }));
}

export async function createPhotonConfigurationSearchResultsWithPrescribedPathAnalysis(
  baseState,
  options = {}
) {
  const candidates = selectPhotonSearchCandidatePool(
    buildPhotonSearchCandidates(baseState),
    options.maxCandidates ?? Number.POSITIVE_INFINITY
  );
  const evaluated = await Promise.all(
    candidates.map((candidate, index) =>
      evaluatePhotonSearchCandidateWithPrescribedPathAnalysis(candidate, index, options)
    )
  );
  return selectDiversePhotonSearchResults(
    evaluated,
    options.limit ?? PHOTON_SEARCH_RESULT_LIMIT
  );
}

function serializePhotonSearchResult(result) {
  return {
    id: result.id,
    name: normalizeSearchName(result.name),
    source: result.source ?? "imported",
    selected: result.selected !== false,
    promotedPresetId: result.promotedPresetId ?? "",
    state: cloneNormalizedPhotonState(result.state),
    score: Number(result.score) || 0,
    scoreComponents: result.scoreComponents ?? {},
    reasons: Array.isArray(result.reasons) ? result.reasons : [],
    suspect: !!result.suspect,
    polarization: result.polarization ?? {},
    diagnostics: result.diagnostics ?? {},
    comparison: result.comparison ?? {},
    plot: result.plot ?? {},
  };
}

export function createPhotonSearchExportPayload(results) {
  return {
    app: "photon",
    kind: PHOTON_SEARCH_EXPORT_KIND,
    version: PHOTON_SEARCH_EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    results: (Array.isArray(results) ? results : []).map(serializePhotonSearchResult),
  };
}

export function serializePhotonSearchResults(results) {
  return JSON.stringify(createPhotonSearchExportPayload(results), null, 2);
}

export function normalizePhotonSearchResult(rawResult, index = 0) {
  const raw = rawResult && typeof rawResult === "object" ? rawResult : {};
  const state = normalizePhotonState(raw.state ?? raw.settings ?? raw);
  return {
    ...serializePhotonSearchResult({
      ...raw,
      id: raw.id || `photon-import-${String(index + 1).padStart(2, "0")}`,
      name: raw.name || `Imported ${index + 1}`,
      state,
    }),
    id: raw.id || `photon-import-${String(index + 1).padStart(2, "0")}`,
  };
}

export function parsePhotonSearchResultsJson(jsonText) {
  const parsed = JSON.parse(String(jsonText ?? ""));
  const rawResults = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.results)
      ? parsed.results
      : [];
  return rawResults.map((result, index) => normalizePhotonSearchResult(result, index));
}
