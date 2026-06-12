import {
  PHOTON_CONTROL_RANGES,
  PHOTON_LAYER_ORDER,
  getPhotonLayer,
  setPhotonLayerEnabled,
  setPhotonLayerValue,
} from "./PhotonStateRuntime.js";

function formatControlValue(value, digits = 2) {
  if (!Number.isFinite(Number(value))) {
    return "0";
  }
  return Number(value).toFixed(digits);
}

function createElement(documentLike, tag, className, text = "") {
  const element = documentLike.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

function createRangeControl(documentLike, { label, value, range, digits = 2, onInput }) {
  const row = createElement(documentLike, "label", "photon-control-row");
  const span = createElement(documentLike, "span", "photon-control-label", label);
  const input = createElement(documentLike, "input", "photon-control-input");
  input.type = "range";
  input.min = String(range.min);
  input.max = String(range.max);
  input.step = String(range.step);
  input.value = String(value);
  input.setAttribute("aria-label", label);
  input.dataset.controlLabel = label;
  const output = createElement(documentLike, "output", "photon-control-output", formatControlValue(value, digits));
  input.addEventListener("input", () => {
    output.textContent = formatControlValue(input.value, digits);
    onInput(Number(input.value));
  });
  row.append(span, input, output);
  return { row, input, output, digits };
}

function createCheckboxControl(documentLike, { label, checked, onChange }) {
  const row = createElement(documentLike, "label", "photon-checkbox-row");
  const input = createElement(documentLike, "input", "photon-checkbox-input");
  input.type = "checkbox";
  input.checked = checked;
  input.setAttribute("aria-label", label);
  input.dataset.controlLabel = label;
  const span = createElement(documentLike, "span", "photon-checkbox-label", label);
  input.addEventListener("change", () => {
    onChange(input.checked);
  });
  row.append(input, span);
  return { row, input };
}

function createButton(documentLike, label, className = "photon-button") {
  const button = createElement(documentLike, "button", className, label);
  button.type = "button";
  return button;
}

function addSection(documentLike, parent, title) {
  const section = createElement(documentLike, "section", "photon-control-section");
  const heading = createElement(documentLike, "h2", "", title);
  section.append(heading);
  parent.append(section);
  return section;
}

function syncRange(control, value) {
  control.input.value = String(value);
  control.output.textContent = formatControlValue(value, control.digits);
}

function syncToggleButton(button, isActive, activeLabel, inactiveLabel) {
  button.textContent = isActive ? activeLabel : inactiveLabel;
  button.classList.toggle("is-active", isActive);
  button.setAttribute("aria-pressed", isActive ? "true" : "false");
}

export function createPhotonControlsRuntime({
  documentLike,
  container,
  state,
  getState = () => state,
  jsonElement,
  onStateChange,
  onResetAnimation,
  onResetParameters,
  onTogglePause,
  onExportState,
  onImportState,
}) {
  const controls = [];
  const binaryControls = [];
  container.textContent = "";
  const onRangeStateChange = () => onStateChange({ syncControls: false, drawNow: false });

  const timeSection = addSection(documentLike, container, "Runtime");
  const actionGrid = createElement(documentLike, "div", "photon-action-grid");
  const pauseButton = createButton(documentLike, "Pause");
  const resetTimeButton = createButton(documentLike, "Reset");
  const resetStateButton = createButton(documentLike, "Reset all");
  const pathsButton = createButton(documentLike, "Paths on", "photon-button is-active");
  actionGrid.append(pauseButton, resetTimeButton, resetStateButton, pathsButton);
  timeSection.append(actionGrid);

  pauseButton.addEventListener("click", onTogglePause);
  resetTimeButton.addEventListener("click", onResetAnimation);
  resetStateButton.addEventListener("click", onResetParameters);
  pathsButton.addEventListener("click", () => {
    const nextState = getState();
    nextState.view.pathsVisible = !nextState.view.pathsVisible;
    syncToggleButton(pathsButton, nextState.view.pathsVisible, "Paths on", "Paths off");
    onStateChange();
  });

  controls.push(
    createRangeControl(documentLike, {
      label: "Separation",
      value: state.pair.pairSeparation,
      range: PHOTON_CONTROL_RANGES.pairSeparation,
      digits: 2,
      onInput: (value) => {
        getState().pair.pairSeparation = value;
        onRangeStateChange();
      },
    })
  );
  controls.push(
    createRangeControl(documentLike, {
      label: "Time speed",
      value: state.time.speedMultiplier,
      range: PHOTON_CONTROL_RANGES.speedMultiplier,
      digits: 2,
      onInput: (value) => {
        getState().time.speedMultiplier = value;
        onRangeStateChange();
      },
    })
  );
  timeSection.append(...controls.slice(-2).map((control) => control.row));

  const measurementSection = addSection(documentLike, container, "Measurement");
  [
    ["x", "Test x", PHOTON_CONTROL_RANGES.testPointX, 2],
    ["u", "Test u", PHOTON_CONTROL_RANGES.testPointU, 2],
    ["v", "Test v", PHOTON_CONTROL_RANGES.testPointV, 2],
  ].forEach(([key, label, range, digits]) => {
    const control = createRangeControl(documentLike, {
      label,
      value: state.measurement.testPoint[key],
      range,
      digits,
      onInput: (value) => {
        getState().measurement.testPoint[key] = value;
        onRangeStateChange();
      },
    });
    controls.push(control);
    measurementSection.append(control.row);
  });
  [
    ["nearFieldWeight", "Near mix", PHOTON_CONTROL_RANGES.nearFieldWeight, 2],
    ["fieldGain", "Field gain", PHOTON_CONTROL_RANGES.fieldGain, 2],
  ].forEach(([key, label, range, digits]) => {
    const control = createRangeControl(documentLike, {
      label,
      value: state.measurement[key],
      range,
      digits,
      onInput: (value) => {
        getState().measurement[key] = value;
        onRangeStateChange();
      },
    });
    controls.push(control);
    measurementSection.append(control.row);
  });

  ["left", "right"].forEach((swarmId) => {
    const swarm = state.pair[swarmId];
    const section = addSection(documentLike, container, `${swarm.role} ${swarm.direction.toUpperCase()}`);
    PHOTON_LAYER_ORDER.forEach((layerId) => {
      const layer = getPhotonLayer(state, swarmId, layerId);
      const group = createElement(documentLike, "div", "photon-layer-group");
      group.append(createElement(documentLike, "h3", "", layerId));
      const enabledControl = createCheckboxControl(documentLike, {
        label: `${swarm.role} ${layerId} binary enabled`,
        checked: layer.enabled !== false,
        onChange: (checked) => {
          setPhotonLayerEnabled(getState(), swarmId, layerId, checked);
          onStateChange();
        },
      });
      binaryControls.push({ ...enabledControl, swarmId, layerId });
      group.append(enabledControl.row);
      [
        ["frequencyHz", "f", PHOTON_CONTROL_RANGES.frequencyHz, 2],
        ["radius", "r", PHOTON_CONTROL_RANGES.radius, 2],
        ["phaseDeg", "phase", PHOTON_CONTROL_RANGES.phaseDeg, 0],
      ].forEach(([key, label, range, digits]) => {
        const control = createRangeControl(documentLike, {
          label,
          value: layer[key],
          range,
          digits,
          onInput: (value) => {
            setPhotonLayerValue(getState(), swarmId, layerId, key, value);
            onRangeStateChange();
          },
        });
        controls.push(control);
        group.append(control.row);
      });
      section.append(group);
    });
  });

  const polarizationSection = addSection(documentLike, container, "Polarization");
  const basisRow = createElement(documentLike, "label", "photon-control-row");
  basisRow.append(createElement(documentLike, "span", "photon-control-label", "Basis"));
  const basisSelect = createElement(documentLike, "select", "photon-select");
  [
    ["linear", "Linear"],
    ["right_circular", "Right circular"],
    ["left_circular", "Left circular"],
    ["elliptical", "Elliptical"],
  ].forEach(([value, label]) => {
    const option = createElement(documentLike, "option", "", label);
    option.value = value;
    basisSelect.append(option);
  });
  basisSelect.value = state.polarization.basis;
  basisSelect.addEventListener("change", () => {
    getState().polarization.basis = basisSelect.value;
    onStateChange();
  });
  basisRow.append(basisSelect, createElement(documentLike, "output", "photon-control-output", ""));
  polarizationSection.append(basisRow);

  [
    ["linearAngleDeg", "Angle", PHOTON_CONTROL_RANGES.polarizationAngleDeg, 0],
    ["phaseLagDeg", "Lag", PHOTON_CONTROL_RANGES.phaseLagDeg, 0],
    ["ellipticity", "Ellipticity", PHOTON_CONTROL_RANGES.ellipticity, 2],
    ["intensity", "Intensity", PHOTON_CONTROL_RANGES.intensity, 2],
    ["analyzerAngleDeg", "Analyzer", PHOTON_CONTROL_RANGES.analyzerAngleDeg, 0],
  ].forEach(([key, label, range, digits]) => {
    const control = createRangeControl(documentLike, {
      label,
      value: state.polarization[key],
      range,
      digits,
      onInput: (value) => {
        getState().polarization[key] = value;
        onRangeStateChange();
      },
    });
    controls.push(control);
    polarizationSection.append(control.row);
  });

  const ioSection = addSection(documentLike, container, "State");
  const ioGrid = createElement(documentLike, "div", "photon-action-grid");
  const exportButton = createButton(documentLike, "Export");
  const importButton = createButton(documentLike, "Import");
  ioGrid.append(exportButton, importButton);
  ioSection.append(ioGrid);
  exportButton.addEventListener("click", onExportState);
  importButton.addEventListener("click", () => onImportState(jsonElement.value));

  function sync(nextState) {
    let index = 0;
    syncRange(controls[index], nextState.pair.pairSeparation);
    index += 1;
    syncRange(controls[index], nextState.time.speedMultiplier);
    index += 1;
    ["x", "u", "v"].forEach((key) => {
      syncRange(controls[index], nextState.measurement.testPoint[key]);
      index += 1;
    });
    ["nearFieldWeight", "fieldGain"].forEach((key) => {
      syncRange(controls[index], nextState.measurement[key]);
      index += 1;
    });
    ["left", "right"].forEach((swarmId) => {
      PHOTON_LAYER_ORDER.forEach((layerId) => {
        const layer = getPhotonLayer(nextState, swarmId, layerId);
        ["frequencyHz", "radius", "phaseDeg"].forEach((key) => {
          syncRange(controls[index], layer[key]);
          index += 1;
        });
      });
    });
    binaryControls.forEach((control) => {
      control.input.checked = getPhotonLayer(nextState, control.swarmId, control.layerId).enabled !== false;
    });
    basisSelect.value = nextState.polarization.basis;
    ["linearAngleDeg", "phaseLagDeg", "ellipticity", "intensity", "analyzerAngleDeg"].forEach((key) => {
      syncRange(controls[index], nextState.polarization[key]);
      index += 1;
    });
    pauseButton.textContent = nextState.time.paused ? "Play" : "Pause";
    syncToggleButton(pathsButton, nextState.view.pathsVisible, "Paths on", "Paths off");
  }

  sync(state);
  return { sync };
}
