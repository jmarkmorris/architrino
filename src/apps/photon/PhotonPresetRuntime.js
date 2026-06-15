import {
  PHOTON_DEFAULT_LAYER_RADII,
  createDefaultPhotonState,
  getPhotonRadiusForSpeedRatio,
  normalizePhotonState,
  setPhotonPairSeparationLog10Ratio,
} from "./PhotonStateRuntime.js";

export const PHOTON_DEFAULT_PRESET_ID = "balanced_contra_rotating_pair";

export const PHOTON_NAMED_PRESETS = Object.freeze([
  {
    id: PHOTON_DEFAULT_PRESET_ID,
    name: "Balanced pair",
  },
  {
    id: "linear_polarization_candidate",
    name: "Linear candidate",
  },
  {
    id: "right_circular_candidate",
    name: "Right circular candidate",
  },
  {
    id: "left_circular_candidate",
    name: "Left circular candidate",
  },
  {
    id: "phase_offset_stress_test",
    name: "Phase-offset stress",
  },
  {
    id: "layer_radius_stress_test",
    name: "Layer-radius stress",
  },
]);

const PRESET_LAYER_SPEED_RATIOS = Object.freeze({
  I: 1.2,
  M: 1,
  O: 0.8,
});

function setPhotonPresetEnabledLayers(state, enabledLayers) {
  const enabledSet = new Set(enabledLayers);
  ["left", "right"].forEach((swarmId) => {
    ["I", "M", "O"].forEach((layerId) => {
      state.pair[swarmId].layers[layerId].enabled = enabledSet.has(layerId);
    });
  });
}

function setPhotonPresetLayerPhases(state, phases) {
  ["left", "right"].forEach((swarmId) => {
    ["I", "M", "O"].forEach((layerId) => {
      const phase = phases?.[swarmId]?.[layerId];
      if (Number.isFinite(Number(phase))) {
        state.pair[swarmId].layers[layerId].phaseDeg = Number(phase);
      }
    });
  });
}

function setPhotonPresetLayerRadii(state, radii) {
  ["left", "right"].forEach((swarmId) => {
    ["I", "M", "O"].forEach((layerId) => {
      const radius = radii?.[swarmId]?.[layerId] ?? radii?.[layerId];
      if (Number.isFinite(Number(radius))) {
        state.pair[swarmId].layers[layerId].radius = Number(radius);
      }
    });
  });
}

function setPhotonPresetSpeedMatchedRadii(state, speedRatios = PRESET_LAYER_SPEED_RATIOS) {
  ["left", "right"].forEach((swarmId) => {
    ["I", "M", "O"].forEach((layerId) => {
      const layer = state.pair[swarmId].layers[layerId];
      layer.radius = getPhotonRadiusForSpeedRatio(
        layer.frequencyHz,
        speedRatios[layerId] ?? PRESET_LAYER_SPEED_RATIOS[layerId]
      );
    });
  });
}

function setPhotonPresetCommonState(state, options = {}) {
  if (options.enabledLayers) {
    setPhotonPresetEnabledLayers(state, options.enabledLayers);
  }
  if (options.phases) {
    setPhotonPresetLayerPhases(state, options.phases);
  }
  if (options.radii) {
    setPhotonPresetLayerRadii(state, options.radii);
  }
  if (Number.isFinite(Number(options.analyzerAngleDeg))) {
    state.polarization.analyzerAngleDeg = Number(options.analyzerAngleDeg);
  }
  if (options.virtualObserver) {
    state.measurement.virtualObserver = {
      ...state.measurement.virtualObserver,
      ...options.virtualObserver,
    };
  }
  setPhotonPairSeparationLog10Ratio(state, options.separationLog10Ratio ?? 0);
}

function buildPhotonPresetState(presetId) {
  const state = createDefaultPhotonState();
  setPhotonPresetSpeedMatchedRadii(state);

  if (presetId === "linear_polarization_candidate") {
    setPhotonPresetCommonState(state, {
      enabledLayers: ["O"],
      analyzerAngleDeg: 0,
      phases: {
        left: { I: 0, M: 0, O: 0 },
        right: { I: 0, M: 0, O: 0 },
      },
    });
    return state;
  }

  if (presetId === "right_circular_candidate") {
    setPhotonPresetCommonState(state, {
      analyzerAngleDeg: 45,
      phases: {
        left: { I: 0, M: 240, O: 120 },
        right: { I: 180, M: 60, O: 300 },
      },
    });
    return state;
  }

  if (presetId === "left_circular_candidate") {
    setPhotonPresetCommonState(state, {
      analyzerAngleDeg: 45,
      phases: {
        left: { I: 0, M: 120, O: 240 },
        right: { I: 180, M: 300, O: 60 },
      },
    });
    return state;
  }

  if (presetId === "phase_offset_stress_test") {
    setPhotonPresetCommonState(state, {
      analyzerAngleDeg: 30,
      separationLog10Ratio: -2,
      virtualObserver: { x: 0.5, y: 1.25, z: -0.75 },
      phases: {
        left: { I: 0, M: 90, O: 180 },
        right: { I: 45, M: 135, O: 315 },
      },
    });
    return state;
  }

  if (presetId === "layer_radius_stress_test") {
    setPhotonPresetCommonState(state, {
      analyzerAngleDeg: 90,
      radii: {
        I: 0.02,
        M: 0.11,
        O: PHOTON_DEFAULT_LAYER_RADII.O,
      },
    });
    return state;
  }

  setPhotonPresetCommonState(state, {
    analyzerAngleDeg: 0,
    phases: {
      left: { I: 0, M: 0, O: 0 },
      right: { I: 0, M: 0, O: 0 },
    },
  });
  return state;
}

export function getPhotonPreset(presetId) {
  return (
    PHOTON_NAMED_PRESETS.find((preset) => preset.id === presetId) ??
    PHOTON_NAMED_PRESETS[0]
  );
}

export function createPhotonPresetState(presetId = PHOTON_DEFAULT_PRESET_ID) {
  return normalizePhotonState(buildPhotonPresetState(getPhotonPreset(presetId).id));
}
