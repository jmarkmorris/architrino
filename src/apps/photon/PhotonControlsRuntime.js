import {
  PHOTON_CONTROL_RANGES,
  PHOTON_LAYER_ORDER,
  getPhotonLayer,
  getPhotonSeparationLog10Ratio,
  setPhotonLayerEnabled,
  setPhotonPairSeparationLog10Ratio,
  setPhotonLayerValue,
} from "./PhotonStateRuntime.js";

function formatControlValue(value, digits = 2) {
  if (!Number.isFinite(Number(value))) {
    return "0";
  }
  return Number(value).toFixed(digits);
}

const ZERO_SNAP_STEP_COUNT = 2;
const ZERO_SNAP_TRACK_RATIO = 0.0125;
const PHOTON_SEPARATION_LOG_TICK_EPSILON = 1e-10;

export function getPhotonSeparationLogTicks() {
  const range = PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio;
  const ticks = [];
  for (let exponent = range.min; exponent < range.max; exponent += 1) {
    for (let mantissa = 1; mantissa <= 9; mantissa += 1) {
      ticks.push({
        value: exponent + Math.log10(mantissa),
        mantissa,
        exponent,
        label: mantissa === 1 ? `1e${exponent}` : `${mantissa}`,
      });
    }
  }
  ticks.push({
    value: range.max,
    mantissa: 1,
    exponent: range.max,
    label: range.max === 0 ? "1" : `1e${range.max}`,
  });
  return ticks;
}

export function snapPhotonSeparationLogTick(value) {
  const range = PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio;
  const number = Number(value);
  const clamped = Math.min(range.max, Math.max(range.min, Number.isFinite(number) ? number : range.max));
  return getPhotonSeparationLogTicks().reduce((best, tick) => {
    return Math.abs(tick.value - clamped) < Math.abs(best.value - clamped) ? tick : best;
  }).value;
}

function formatPhotonSeparationLogRatio(value) {
  const range = PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio;
  const number = Number(value);
  const clamped = Math.min(range.max, Math.max(range.min, Number.isFinite(number) ? number : range.max));
  if (Math.abs(clamped) <= PHOTON_SEPARATION_LOG_TICK_EPSILON) {
    return "1 r";
  }
  const exponent = Math.floor(clamped + PHOTON_SEPARATION_LOG_TICK_EPSILON);
  const mantissa = 10 ** (clamped - exponent);
  const roundedMantissa = Math.round(mantissa);
  const mantissaText =
    Math.abs(mantissa - roundedMantissa) <= 0.015
      ? String(roundedMantissa)
      : mantissa.toPrecision(2);
  return `${mantissaText}e${exponent} r`;
}

export function getPhotonControlZeroPositionPercent(range) {
  const min = Number(range?.min);
  const max = Number(range?.max);
  if (!Number.isFinite(min) || !Number.isFinite(max) || min >= 0 || max <= 0 || max <= min) {
    return null;
  }
  return ((0 - min) / (max - min)) * 100;
}

export function getPhotonControlZeroSnapThreshold(range) {
  const min = Number(range?.min);
  const max = Number(range?.max);
  const step = Math.abs(Number(range?.step));
  if (
    !Number.isFinite(min) ||
    !Number.isFinite(max) ||
    !Number.isFinite(step) ||
    getPhotonControlZeroPositionPercent(range) === null
  ) {
    return null;
  }
  return Math.max(step * ZERO_SNAP_STEP_COUNT, (max - min) * ZERO_SNAP_TRACK_RATIO);
}

export function snapPhotonControlValueToZero(value, range) {
  const number = Number(value);
  const threshold = getPhotonControlZeroSnapThreshold(range);
  if (!Number.isFinite(number) || threshold === null) {
    return number;
  }
  return threshold > 0 && Math.abs(number) <= threshold ? 0 : number;
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

function createRangeControl(documentLike, { label, value, range, digits = 2, zeroIndicator = false, snapToZero = false, onInput }) {
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
  if (snapToZero) {
    input.dataset.snapToZero = "true";
  }
  const output = createElement(documentLike, "output", "photon-control-output", formatControlValue(value, digits));
  const readInputValue = () => {
    const rawValue = Number(input.value);
    const nextValue = snapToZero ? snapPhotonControlValueToZero(rawValue, range) : rawValue;
    if (!Object.is(nextValue, rawValue)) {
      input.value = String(nextValue);
    }
    return nextValue;
  };
  input.addEventListener("input", () => {
    const nextValue = readInputValue();
    output.textContent = formatControlValue(nextValue, digits);
    onInput(nextValue);
  });
  const zeroPosition = zeroIndicator ? getPhotonControlZeroPositionPercent(range) : null;
  if (zeroPosition !== null) {
    const rangeShell = createElement(documentLike, "span", "photon-range-shell");
    rangeShell.style.setProperty("--photon-zero-position", `${zeroPosition}%`);
    const zeroTick = createElement(documentLike, "span", "photon-zero-tick");
    zeroTick.setAttribute("aria-hidden", "true");
    rangeShell.append(input, zeroTick);
    row.classList.add("has-zero-indicator");
    row.append(span, rangeShell, output);
  } else {
    row.append(span, input, output);
  }
  return { row, input, output, digits };
}

function createSeparationLogControl(documentLike, { state, getState, onInput }) {
  const range = PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio;
  const ticks = getPhotonSeparationLogTicks();
  const value = snapPhotonSeparationLogTick(getPhotonSeparationLog10Ratio(state));
  const row = createElement(documentLike, "label", "photon-control-row photon-log-control-row");
  const span = createElement(documentLike, "span", "photon-control-label", "Sep/r");
  const input = createElement(documentLike, "input", "photon-control-input");
  const output = createElement(documentLike, "output", "photon-control-output", formatPhotonSeparationLogRatio(value));
  const rangeShell = createElement(documentLike, "span", "photon-range-shell photon-log-range-shell");
  const tickStrip = createElement(documentLike, "span", "photon-log-tick-strip");
  const datalist = createElement(documentLike, "datalist");
  const datalistId = "photon-separation-log-ticks";
  const syncOutput = () => {
    const currentState = getState();
    const logValue = snapPhotonSeparationLogTick(getPhotonSeparationLog10Ratio(currentState));
    input.value = String(logValue);
    output.textContent = formatPhotonSeparationLogRatio(logValue);
    output.title = `separation = ${Number(currentState.pair.pairSeparation).toExponential(3)}`;
  };

  input.type = "range";
  input.min = String(range.min);
  input.max = String(range.max);
  input.step = String(range.step);
  input.value = String(value);
  input.setAttribute("aria-label", "Separation over r");
  input.setAttribute("list", datalistId);
  input.dataset.controlLabel = "Separation over r";
  datalist.id = datalistId;
  ticks.forEach((tick) => {
    const option = createElement(documentLike, "option");
    option.value = String(tick.value);
    option.label = tick.label;
    datalist.append(option);

    const tickElement = createElement(
      documentLike,
      "span",
      tick.mantissa === 1 ? "photon-log-tick is-decade" : "photon-log-tick"
    );
    const position = ((tick.value - range.min) / (range.max - range.min)) * 100;
    tickElement.style.setProperty("--photon-log-tick-position", `${position}%`);
    tickElement.setAttribute("aria-hidden", "true");
    tickStrip.append(tickElement);
  });

  input.addEventListener("input", () => {
    const nextValue = snapPhotonSeparationLogTick(input.value);
    input.value = String(nextValue);
    setPhotonPairSeparationLog10Ratio(getState(), nextValue);
    syncOutput();
    onInput(nextValue);
  });

  rangeShell.append(input, tickStrip, datalist);
  row.append(span, rangeShell, output);
  syncOutput();
  return { row, input, output, sync: syncOutput };
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
  if (typeof control.sync === "function") {
    control.sync();
    return;
  }
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
  onStateChange,
  onResetAnimation,
  onResetParameters,
  onTogglePause,
}) {
  const controls = [];
  const binaryControls = [];
  container.textContent = "";
  const onRangeStateChange = () => onStateChange({ syncControls: false, drawNow: false });

  const timeSection = addSection(documentLike, container, "Runtime");
  const actionGrid = createElement(documentLike, "div", "photon-action-grid");
  const pauseButton = createButton(documentLike, "Pause");
  const resetTimeButton = createButton(documentLike, "Reset time");
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
    createSeparationLogControl(documentLike, {
      state,
      getState,
      onInput: () => onRangeStateChange(),
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
    ["x", "Observer x", PHOTON_CONTROL_RANGES.virtualObserverX, 2],
    ["y", "Observer y", PHOTON_CONTROL_RANGES.virtualObserverY, 2],
    ["z", "Observer z", PHOTON_CONTROL_RANGES.virtualObserverZ, 2],
  ].forEach(([key, label, range, digits]) => {
    const control = createRangeControl(documentLike, {
      label,
      value: state.measurement.virtualObserver[key],
      range,
      digits,
      zeroIndicator: true,
      snapToZero: true,
      onInput: (value) => {
        getState().measurement.virtualObserver[key] = value;
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
          const nextState = getState();
          const separationLog10Ratio = getPhotonSeparationLog10Ratio(nextState);
          setPhotonLayerEnabled(nextState, swarmId, layerId, checked);
          setPhotonPairSeparationLog10Ratio(nextState, separationLog10Ratio);
          onStateChange();
        },
      });
      binaryControls.push({ ...enabledControl, swarmId, layerId });
      group.append(enabledControl.row);
      [
        ["frequencyHz", "f", PHOTON_CONTROL_RANGES.frequencyHz, 4],
        ["radius", "r", PHOTON_CONTROL_RANGES.radius, 2],
        ["phaseDeg", "phase", PHOTON_CONTROL_RANGES.phaseDeg, 0],
      ].forEach(([key, label, range, digits]) => {
        const control = createRangeControl(documentLike, {
          label,
          value: layer[key],
          range,
          digits,
          onInput: (value) => {
            const nextState = getState();
            const separationLog10Ratio = getPhotonSeparationLog10Ratio(nextState);
            setPhotonLayerValue(nextState, swarmId, layerId, key, value);
            if (key === "radius") {
              setPhotonPairSeparationLog10Ratio(nextState, separationLog10Ratio);
            }
            onRangeStateChange();
          },
        });
        controls.push(control);
        group.append(control.row);
      });
      section.append(group);
    });
  });

  const analyzerSection = addSection(documentLike, container, "Analyzer");
  [
    ["analyzerAngleDeg", "Angle", PHOTON_CONTROL_RANGES.analyzerAngleDeg, 0],
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
    analyzerSection.append(control.row);
  });

  function sync(nextState) {
    let index = 0;
    syncRange(controls[index], nextState.pair.pairSeparation);
    index += 1;
    syncRange(controls[index], nextState.time.speedMultiplier);
    index += 1;
    ["x", "y", "z"].forEach((key) => {
      syncRange(controls[index], nextState.measurement.virtualObserver[key]);
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
    ["analyzerAngleDeg"].forEach((key) => {
      syncRange(controls[index], nextState.polarization[key]);
      index += 1;
    });
    pauseButton.textContent = nextState.time.paused ? "Play" : "Pause";
    syncToggleButton(pathsButton, nextState.view.pathsVisible, "Paths on", "Paths off");
  }

  sync(state);
  return { sync };
}
