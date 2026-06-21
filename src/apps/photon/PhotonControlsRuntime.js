import {
  PHOTON_CONTROL_RANGES,
  PHOTON_LAYER_META,
  PHOTON_LAYER_ORDER,
  PHOTON_LOCAL_C_SPEED_MODES,
  getPhotonFrequencyExponent,
  getPhotonFrequencyFromExponent,
  getPhotonLayer,
  getPhotonLayerRadiusBounds,
  getPhotonSeparationLog10Ratio,
  normalizePhotonSpeedMode,
  resolvePhotonSpeedSettings,
  setPhotonLayerEnabled,
  setPhotonPairSeparationLog10Ratio,
  setPhotonLayerValue,
} from "./PhotonStateRuntime.js";
import {
  PHOTON_DEFAULT_PRESET_ID,
} from "./PhotonPresetRuntime.js";

function formatControlValue(value, digits = 2) {
  if (!Number.isFinite(Number(value))) {
    return "0";
  }
  return Number(value).toFixed(digits);
}

const ZERO_SNAP_STEP_COUNT = 2;
const ZERO_SNAP_TRACK_RATIO = 0.0125;
const PHOTON_SEPARATION_LOG_TICK_EPSILON = 1e-10;
const PHOTON_SEPARATION_MANTISSAS = Object.freeze([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const PHOTON_CONTROL_SWARM_ORDER = Object.freeze(["right", "left"]);
const PHOTON_PLAYBACK_SPEED_RANGE = Object.freeze({
  min: PHOTON_CONTROL_RANGES.speedMultiplier.min,
  max: PHOTON_CONTROL_RANGES.speedMultiplier.max,
  sliderMin: 0,
  sliderMax: 100,
  sliderStep: 1,
});
const PHOTON_SUPERSCRIPT_DIGITS = Object.freeze({
  "-": "⁻",
  0: "⁰",
  1: "¹",
  2: "²",
  3: "³",
  4: "⁴",
  5: "⁵",
  6: "⁶",
  7: "⁷",
  8: "⁸",
  9: "⁹",
});
const PHOTON_PHASE_SNAP_STEP_DEG = 45;
const PHOTON_PHASE_SNAP_THRESHOLD_DEG = 5;

function formatPhotonSuperscriptInteger(value) {
  return String(Math.trunc(Number(value) || 0))
    .split("")
    .map((character) => PHOTON_SUPERSCRIPT_DIGITS[character] ?? character)
    .join("");
}

function formatPhotonSeparationScaleLabel(exponent) {
  return `10${formatPhotonSuperscriptInteger(exponent)}`;
}

function formatPhotonExponentText(exponent) {
  return String(Math.trunc(Number(exponent) || 0));
}

function renderPhotonSeparationScaleLabel(documentLike, element, exponent) {
  element.textContent = "";
  const label = createElement(documentLike, "span", "photon-exponent-label");
  const power = createElement(documentLike, "sup", "photon-exponent-power", formatPhotonExponentText(exponent));
  label.append(documentLike.createTextNode("10"), power);
  element.append(label);
}

function renderPhotonPowerOfTwoLabel(documentLike, element, exponent) {
  element.textContent = "";
  const label = createElement(documentLike, "span", "photon-exponent-label");
  const power = createElement(documentLike, "sup", "photon-exponent-power", formatPhotonExponentText(exponent));
  label.append(documentLike.createTextNode("2"), power);
  element.append(label);
}

export function getPhotonSeparationLogTicks() {
  const range = PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio;
  const ticks = [];
  for (let exponent = range.min; exponent < range.max; exponent += 1) {
    PHOTON_SEPARATION_MANTISSAS.forEach((mantissa) => {
      ticks.push({
        value: exponent + Math.log10(mantissa),
        mantissa,
        exponent,
        label: mantissa === 1 ? formatPhotonSeparationScaleLabel(exponent) : `${mantissa}`,
      });
    });
  }
  ticks.push({
    value: range.max,
    mantissa: 1,
    exponent: range.max,
    label: formatPhotonSeparationScaleLabel(range.max),
  });
  return ticks;
}

export function getPhotonSeparationLogTick(value) {
  const range = PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio;
  const number = Number(value);
  const clamped = Math.min(range.max, Math.max(range.min, Number.isFinite(number) ? number : range.max));
  return getPhotonSeparationLogTicks().reduce((best, tick) => {
    return Math.abs(tick.value - clamped) < Math.abs(best.value - clamped) ? tick : best;
  });
}

export function snapPhotonSeparationLogTick(value) {
  return getPhotonSeparationLogTick(value).value;
}

export function getPhotonSeparationLog10RatioFromParts(mantissa, exponent) {
  const range = PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio;
  const safeMantissa = Math.min(
    Math.max(1, Math.round(Number.isFinite(Number(mantissa)) ? Number(mantissa) : 1)),
    9
  );
  const safeExponent = Math.min(
    range.max,
    Math.max(range.min, Math.round(Number.isFinite(Number(exponent)) ? Number(exponent) : 0))
  );
  if (safeExponent >= range.max) {
    return range.max;
  }
  return snapPhotonSeparationLogTick(safeExponent + Math.log10(safeMantissa));
}

export function getPhotonPlaybackSpeedSliderValue(multiplier) {
  const minLog = Math.log(PHOTON_PLAYBACK_SPEED_RANGE.min);
  const maxLog = Math.log(PHOTON_PLAYBACK_SPEED_RANGE.max);
  const safeMultiplier = Math.min(
    PHOTON_PLAYBACK_SPEED_RANGE.max,
    Math.max(PHOTON_PLAYBACK_SPEED_RANGE.min, Number(multiplier) || 1)
  );
  return (
    ((Math.log(safeMultiplier) - minLog) / (maxLog - minLog)) *
    (PHOTON_PLAYBACK_SPEED_RANGE.sliderMax - PHOTON_PLAYBACK_SPEED_RANGE.sliderMin)
  );
}

export function getPhotonPlaybackSpeedMultiplier(sliderValue) {
  const sliderSpan =
    PHOTON_PLAYBACK_SPEED_RANGE.sliderMax - PHOTON_PLAYBACK_SPEED_RANGE.sliderMin;
  const progress = Math.min(
    1,
    Math.max(
      0,
      ((Number(sliderValue) || PHOTON_PLAYBACK_SPEED_RANGE.sliderMin) -
        PHOTON_PLAYBACK_SPEED_RANGE.sliderMin) /
        sliderSpan
    )
  );
  const minLog = Math.log(PHOTON_PLAYBACK_SPEED_RANGE.min);
  const maxLog = Math.log(PHOTON_PLAYBACK_SPEED_RANGE.max);
  const multiplier = Math.exp(minLog + progress * (maxLog - minLog));
  return Math.abs(multiplier - 1) < 1e-12 ? 1 : multiplier;
}

function formatPhotonSeparationLogRatio(value) {
  const range = PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio;
  const number = Number(value);
  const clamped = Math.min(range.max, Math.max(range.min, Number.isFinite(number) ? number : range.max));
  const exponent = Math.floor(clamped + PHOTON_SEPARATION_LOG_TICK_EPSILON);
  const mantissa = 10 ** (clamped - exponent);
  const roundedMantissa = Math.round(mantissa);
  const mantissaText =
    Math.abs(mantissa - roundedMantissa) <= 0.015
      ? String(roundedMantissa)
      : mantissa.toPrecision(2);
  return `${mantissaText} × ${formatPhotonSeparationScaleLabel(exponent)} r`;
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

export function snapPhotonPhaseDegrees(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return number;
  }
  const nearestStickySpot =
    Math.round(number / PHOTON_PHASE_SNAP_STEP_DEG) * PHOTON_PHASE_SNAP_STEP_DEG;
  return Math.abs(number - nearestStickySpot) <= PHOTON_PHASE_SNAP_THRESHOLD_DEG
    ? nearestStickySpot
    : number;
}

export function snapPhotonRangeControlValue(
  value,
  range,
  { snapToZero = false, snapToPhaseDegrees = false } = {}
) {
  const rawValue = Number(value);
  const zeroSnappedValue = snapToZero ? snapPhotonControlValueToZero(rawValue, range) : rawValue;
  return snapToPhaseDegrees ? snapPhotonPhaseDegrees(zeroSnappedValue) : zeroSnappedValue;
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

function bindPhotonPointerBlur(pointerElement, focusElement = pointerElement) {
  let pointerWasUsed = false;
  const blurAfterPointerUse = () => {
    if (!pointerWasUsed) {
      return;
    }
    pointerWasUsed = false;
    const windowLike = focusElement?.ownerDocument?.defaultView;
    const schedule = typeof windowLike?.requestAnimationFrame === "function"
      ? windowLike.requestAnimationFrame.bind(windowLike)
      : (callback) => setTimeout(callback, 0);
    schedule(() => {
      if (typeof focusElement?.blur === "function") {
        focusElement.blur();
      }
    });
  };

  pointerElement.addEventListener("pointerdown", () => {
    pointerWasUsed = true;
  });
  pointerElement.addEventListener("pointerup", blurAfterPointerUse);
  pointerElement.addEventListener("pointercancel", () => {
    pointerWasUsed = false;
  });
  pointerElement.addEventListener("click", blurAfterPointerUse);
}

function createRangeControl(
  documentLike,
  {
    label,
    value,
    range,
    digits = 2,
    zeroIndicator = false,
    snapToZero = false,
    snapToPhaseDegrees = false,
    onInput,
  }
) {
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
  if (snapToPhaseDegrees) {
    input.dataset.snapToPhaseDegrees = "true";
  }
  const output = createElement(documentLike, "output", "photon-control-output", formatControlValue(value, digits));
  const readInputValue = () => {
    const rawValue = Number(input.value);
    const nextValue = snapPhotonRangeControlValue(rawValue, range, {
      snapToZero,
      snapToPhaseDegrees,
    });
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
  bindPhotonPointerBlur(row, input);
  return { row, input, output, digits };
}

function createFrequencyPowerControl(documentLike, { label, value, onInput }) {
  const range = PHOTON_CONTROL_RANGES.frequencyExponent;
  const row = createElement(documentLike, "label", "photon-control-row");
  const span = createElement(documentLike, "span", "photon-control-label", label);
  const input = createElement(documentLike, "input", "photon-control-input");
  input.type = "range";
  input.min = String(range.min);
  input.max = String(range.max);
  input.step = String(range.step);
  input.setAttribute("aria-label", label);
  input.dataset.controlLabel = label;
  const output = createElement(documentLike, "output", "photon-control-output");

  const sync = (frequency = value) => {
    const exponent = getPhotonFrequencyExponent(frequency);
    const nextFrequency = getPhotonFrequencyFromExponent(exponent);
    input.value = String(exponent);
    input.title = `f = ${nextFrequency}`;
    input.setAttribute("aria-valuetext", `2^${exponent}`);
    output.title = `f = ${nextFrequency}`;
    output.setAttribute("aria-label", `2^${exponent}`);
    renderPhotonPowerOfTwoLabel(documentLike, output, exponent);
  };

  input.addEventListener("input", () => {
    const exponent = Number(input.value);
    const nextFrequency = getPhotonFrequencyFromExponent(exponent);
    sync(nextFrequency);
    onInput(nextFrequency);
  });

  row.append(span, input, output);
  bindPhotonPointerBlur(row, input);
  sync(value);
  return { row, input, output, sync };
}

function createSeparationLogControl(documentLike, { state, getState, onInput }) {
  const range = PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio;
  const initialTick = getPhotonSeparationLogTick(getPhotonSeparationLog10Ratio(state));
  const row = createElement(documentLike, "div", "photon-control-row photon-log-control-row");
  const span = createElement(documentLike, "span", "photon-control-label", "Δx");
  const controlShell = createElement(documentLike, "span", "photon-separation-picker");
  const mantissaGroup = createElement(documentLike, "span", "photon-separation-mantissas");
  const exponentControl = createElement(documentLike, "span", "photon-separation-exponent-control");
  const exponentButton = createButton(
    documentLike,
    "",
    "photon-separation-exponent-button"
  );
  renderPhotonSeparationScaleLabel(documentLike, exponentButton, initialTick.exponent);
  const exponentMenu = createElement(documentLike, "span", "photon-separation-exponent-menu");
  const output = createElement(
    documentLike,
    "output",
    "photon-control-output photon-separation-output",
    formatPhotonSeparationLogRatio(initialTick.value)
  );
  let selectedMantissa = initialTick.mantissa;
  let selectedExponent = initialTick.exponent;
  let exponentMenuOpen = false;

  PHOTON_SEPARATION_MANTISSAS.forEach((mantissa) => {
    const button = createButton(
      documentLike,
      String(mantissa),
      "photon-separation-mantissa-button"
    );
    button.dataset.mantissa = String(mantissa);
    button.setAttribute("aria-label", `Delta x coefficient ${mantissa}`);
    mantissaGroup.append(button);
  });

  exponentButton.setAttribute("aria-label", "Choose Delta x exponent");
  exponentButton.setAttribute("aria-haspopup", "listbox");
  exponentButton.setAttribute("aria-expanded", "false");
  exponentMenu.hidden = true;
  exponentMenu.setAttribute("role", "listbox");
  exponentMenu.setAttribute("aria-label", "Delta x exponent");
  for (let exponent = range.min; exponent <= range.max; exponent += 1) {
    const exponentOption = createButton(
      documentLike,
      "",
      "photon-separation-exponent-option"
    );
    renderPhotonSeparationScaleLabel(documentLike, exponentOption, exponent);
    exponentOption.dataset.exponent = String(exponent);
    exponentOption.setAttribute("role", "option");
    exponentOption.setAttribute("aria-label", `Delta x exponent ${exponent}`);
    exponentMenu.append(exponentOption);
  }

  const getSelectedExponentOption = () =>
    Array.from(exponentMenu.children).find(
      (button) => Number(button.dataset.exponent) === selectedExponent
    );

  const positionExponentMenu = () => {
    const selectedButton = getSelectedExponentOption();
    if (selectedButton) {
      exponentMenu.scrollTop =
        selectedButton.offsetTop -
        Math.max(0, (exponentMenu.clientHeight - selectedButton.offsetHeight) / 2);
    }

    const controlRect = exponentControl.getBoundingClientRect?.();
    const menuRect = exponentMenu.getBoundingClientRect?.();
    const windowLike = exponentControl.ownerDocument?.defaultView;
    if (!controlRect || !menuRect || !windowLike) {
      return;
    }

    const desiredTop = controlRect.height / 2 - menuRect.height / 2;
    const minTop = 8 - controlRect.top;
    const maxTop = (windowLike.innerHeight || 0) - menuRect.height - controlRect.top - 8;
    const top = Math.min(maxTop, Math.max(minTop, desiredTop));
    exponentMenu.style.setProperty(
      "--photon-exponent-menu-top",
      `${Number.isFinite(top) ? top : desiredTop}px`
    );
  };

  const setExponentMenuOpen = (nextOpen) => {
    exponentMenuOpen = Boolean(nextOpen);
    exponentControl.classList.toggle("is-open", exponentMenuOpen);
    exponentButton.setAttribute("aria-expanded", exponentMenuOpen ? "true" : "false");
    exponentMenu.hidden = !exponentMenuOpen;
    if (exponentMenuOpen) {
      const windowLike = exponentControl.ownerDocument?.defaultView;
      const schedule = typeof windowLike?.requestAnimationFrame === "function"
        ? windowLike.requestAnimationFrame.bind(windowLike)
        : (callback) => setTimeout(callback, 0);
      schedule(positionExponentMenu);
    } else {
      exponentMenu.style.removeProperty("--photon-exponent-menu-top");
    }
  };

  const syncOutput = () => {
    const currentState = getState();
    const tick = getPhotonSeparationLogTick(getPhotonSeparationLog10Ratio(currentState));
    selectedMantissa = tick.mantissa;
    selectedExponent = tick.exponent;
    const exponentLabel = formatPhotonSeparationScaleLabel(selectedExponent);
    renderPhotonSeparationScaleLabel(documentLike, exponentButton, selectedExponent);
    exponentButton.title = `Exponent ${selectedExponent}`;
    exponentButton.setAttribute(
      "aria-label",
      `Choose Delta x exponent, current ${exponentLabel}`
    );
    Array.from(mantissaGroup.children).forEach((button) => {
      const mantissa = Number(button.dataset.mantissa);
      const isSelected = mantissa === selectedMantissa;
      const isAvailable = selectedExponent < range.max || mantissa === 1;
      button.classList.toggle("is-selected", isSelected);
      button.disabled = !isAvailable;
      button.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
    Array.from(exponentMenu.children).forEach((button) => {
      const isSelected = Number(button.dataset.exponent) === selectedExponent;
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-selected", isSelected ? "true" : "false");
    });
    output.textContent = formatPhotonSeparationLogRatio(tick.value);
    output.title = `separation = ${Number(currentState.pair.pairSeparation).toExponential(3)}`;
    if (exponentMenuOpen) {
      positionExponentMenu();
    }
  };

  const commitParts = (mantissa, exponent) => {
    const nextValue = getPhotonSeparationLog10RatioFromParts(mantissa, exponent);
    setPhotonPairSeparationLog10Ratio(getState(), nextValue);
    syncOutput();
    onInput(nextValue);
  };

  Array.from(mantissaGroup.children).forEach((button) => {
    button.addEventListener("click", () => {
      commitParts(Number(button.dataset.mantissa), selectedExponent);
    });
  });
  exponentButton.addEventListener("click", () => {
    setExponentMenuOpen(!exponentMenuOpen);
  });
  Array.from(exponentMenu.children).forEach((button) => {
    button.addEventListener("click", () => {
      commitParts(selectedMantissa, Number(button.dataset.exponent));
      setExponentMenuOpen(false);
    });
  });
  documentLike.addEventListener?.("click", (event) => {
    if (!exponentControl.contains(event.target)) {
      setExponentMenuOpen(false);
    }
  });
  exponentControl.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setExponentMenuOpen(false);
      exponentButton.focus();
    }
  });

  exponentControl.append(exponentButton, exponentMenu);
  controlShell.append(mantissaGroup, exponentControl, output);
  row.append(span, controlShell);
  syncOutput();
  return { row, output, sync: syncOutput };
}

function createPlaybackSpeedControl(documentLike, { state, getState, onInput }) {
  const row = createElement(documentLike, "label", "photon-control-row photon-playback-speed-row");
  const slowLabel = createElement(documentLike, "span", "photon-speed-end-label", "Slow");
  const input = createElement(documentLike, "input", "photon-control-input");
  const fastLabel = createElement(documentLike, "span", "photon-speed-end-label is-fast", "Fast");

  input.type = "range";
  input.min = String(PHOTON_PLAYBACK_SPEED_RANGE.sliderMin);
  input.max = String(PHOTON_PLAYBACK_SPEED_RANGE.sliderMax);
  input.step = String(PHOTON_PLAYBACK_SPEED_RANGE.sliderStep);
  input.setAttribute("aria-label", "Playback speed");
  input.dataset.controlLabel = "Playback speed";

  const syncInput = () => {
    const multiplier = getState().time.speedMultiplier;
    const sliderValue = Math.round(getPhotonPlaybackSpeedSliderValue(multiplier));
    input.value = String(sliderValue);
    input.title = `Playback speed ${formatControlValue(multiplier, 2)}x`;
    input.setAttribute("aria-valuetext", `${formatControlValue(multiplier, 2)}x`);
  };

  input.addEventListener("input", () => {
    const multiplier = getPhotonPlaybackSpeedMultiplier(input.value);
    getState().time.speedMultiplier = multiplier;
    syncInput();
    onInput(multiplier);
  });

  row.append(slowLabel, input, fastLabel);
  bindPhotonPointerBlur(row, input);
  syncInput();
  return { row, input, sync: syncInput };
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
  bindPhotonPointerBlur(row, input);
  return { row, input };
}

function createSelectControl(documentLike, { label, value, options, onChange }) {
  const row = createElement(documentLike, "label", "photon-control-row photon-select-control-row");
  const span = createElement(documentLike, "span", "photon-control-label", label);
  const select = createElement(documentLike, "select", "photon-select");
  const output = createElement(documentLike, "output", "photon-control-output", "");
  select.setAttribute("aria-label", label);
  options.forEach((option) => {
    const element = createElement(documentLike, "option", "", option.label);
    element.value = option.value;
    select.append(element);
  });
  select.value = value;
  select.addEventListener("change", () => {
    onChange(select.value);
  });
  row.append(span, select, output);
  return {
    row,
    select,
    sync(nextValue) {
      select.value = nextValue;
    },
  };
}

function createPresetControl(
  documentLike,
  {
    getPresetId = () => PHOTON_DEFAULT_PRESET_ID,
    getPresetOptions = () => [],
    onPresetChange,
    onResetPreset,
  }
) {
  const row = createElement(documentLike, "div", "photon-preset-row");
  const label = createElement(documentLike, "span", "photon-control-label", "Preset");
  const actionShell = createElement(documentLike, "span", "photon-preset-actions");
  const select = createElement(documentLike, "select", "photon-select photon-preset-select");
  const resetButton = createButton(documentLike, "Reset preset");

  select.setAttribute("aria-label", "Photon preset");

  const renderOptions = () => {
    const selectedValue = select.value || getPresetId();
    select.textContent = "";
    const presetOptions = getPresetOptions();
    presetOptions.forEach((preset) => {
      const option = createElement(documentLike, "option", "", preset.name);
      option.value = preset.id;
      select.append(option);
    });
    select.value = presetOptions.some((preset) => preset.id === selectedValue)
      ? selectedValue
      : PHOTON_DEFAULT_PRESET_ID;
  };

  select.addEventListener("change", () => {
    onPresetChange(select.value);
  });
  resetButton.addEventListener("click", () => {
    onResetPreset();
  });

  actionShell.append(select, resetButton);
  row.append(label, actionShell);

  const sync = () => {
    renderOptions();
    const presetId = getPresetId();
    const presetOptions = getPresetOptions();
    const hasPreset = presetOptions.some((preset) => preset.id === presetId);
    select.value = hasPreset ? presetId : PHOTON_DEFAULT_PRESET_ID;
    resetButton.title = `Reset to ${select.options[select.selectedIndex]?.textContent ?? "preset"}`;
  };

  sync();
  return { row, select, resetButton, sync };
}

function createButton(documentLike, label, className = "photon-button") {
  const button = createElement(documentLike, "button", className, label);
  button.type = "button";
  bindPhotonPointerBlur(button);
  return button;
}

function formatPhotonSearchScore(score) {
  return Number.isFinite(Number(score)) ? Number(score).toFixed(1) : "0.0";
}

function getPhotonSearchPrimaryReason(result) {
  return Array.isArray(result?.reasons)
    ? result.reasons.find((reason) => Number(reason.score) > 0) ?? result.reasons[0]
    : null;
}

function formatPhotonSearchMeta(result) {
  const polarization = result?.polarization ?? {};
  const diagnostics = result?.diagnostics ?? {};
  const comparison = result?.comparison ?? {};
  const comparisonDeltas = comparison?.deltas ?? {};
  const fitResidual = Number(polarization.fitResidual);
  const lag = Number(polarization.phaseLagDeg);
  const rootCount = Number(diagnostics.rootCount);
  const sourceCount = Number(diagnostics.sourceCount);
  const parts = [
    polarization.classificationLabel ?? "Open",
    `fit ${Number.isFinite(fitResidual) ? fitResidual.toFixed(3) : "n/a"}`,
    `roots ${Number.isFinite(rootCount) ? rootCount : 0}/${Number.isFinite(sourceCount) ? sourceCount : 0}`,
  ];
  if (polarization.phaseLagDefined !== false && Number.isFinite(lag)) {
    parts.push(`lag ${lag.toFixed(1)} deg`);
  }
  if (comparison.status === "ok") {
    const strengthDelta = Number(comparisonDeltas.strengthDelta);
    const rootDelta = Number(comparisonDeltas.rootCountDelta);
    parts.push(
      `abs ${Number.isFinite(strengthDelta) ? `${(strengthDelta * 100).toFixed(0)}%` : "ok"}` +
      `${Number.isFinite(rootDelta) && rootDelta !== 0 ? `, roots ${rootDelta > 0 ? "+" : ""}${rootDelta}` : ""}`
    );
  } else if (
    comparison.status === "unavailable" ||
    comparison.status === "error" ||
    comparison.status === "skipped"
  ) {
    parts.push("abs n/a");
  }
  return parts.join(" | ");
}

function createSearchControl(
  documentLike,
  {
    getSearchResults = () => [],
    getSearchStatus = () => "",
    isPreviewingSearchResult = () => false,
    onSearchConfigurations,
    onRestoreSearchPreview,
    onPreviewSearchResult,
    onLoadSearchResult,
    onPlaySearchResult,
    onPromoteSearchResult,
    onDeleteSearchResult,
    onRenameSearchResult,
    onToggleSearchResultSelected,
    onExportSearchResults,
    onExportSelectedSearchResults,
    onImportSearchResults,
  }
) {
  const row = createElement(documentLike, "div", "photon-search-control");
  const toolbar = createElement(documentLike, "div", "photon-search-toolbar");
  const searchButton = createButton(documentLike, "Search configurations");
  const restoreButton = createButton(documentLike, "Restore preview");
  const importButton = createButton(documentLike, "Import");
  const exportSelectedButton = createButton(documentLike, "Export selected");
  const exportAllButton = createButton(documentLike, "Export all");
  const fileInput = createElement(documentLike, "input", "photon-search-file-input");
  const status = createElement(documentLike, "p", "photon-search-status");
  const resultsList = createElement(documentLike, "div", "photon-search-results");

  fileInput.type = "file";
  fileInput.accept = "application/json,.json";
  fileInput.hidden = true;

  searchButton.addEventListener("click", () => {
    onSearchConfigurations?.();
  });
  restoreButton.addEventListener("click", () => {
    onRestoreSearchPreview?.();
  });
  importButton.addEventListener("click", () => {
    fileInput.click();
  });
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (file) {
      onImportSearchResults?.(file);
    }
    fileInput.value = "";
  });
  exportSelectedButton.addEventListener("click", () => {
    onExportSelectedSearchResults?.();
  });
  exportAllButton.addEventListener("click", () => {
    onExportSearchResults?.();
  });

  toolbar.append(searchButton, restoreButton, importButton, exportSelectedButton, exportAllButton);
  row.append(toolbar, fileInput, status, resultsList);

  const sync = () => {
    const results = getSearchResults();
    const selectedCount = results.filter((result) => result.selected !== false).length;
    const previewing = isPreviewingSearchResult();
    restoreButton.hidden = !previewing;
    exportSelectedButton.disabled = selectedCount === 0;
    exportAllButton.disabled = results.length === 0;
    status.textContent =
      getSearchStatus() ||
      (results.length
        ? `${results.length} configurations, ${selectedCount} selected`
        : "No search results yet.");

    resultsList.textContent = "";
    if (results.length === 0) {
      const empty = createElement(
        documentLike,
        "p",
        "photon-search-empty",
        "Run a search to collect configurations worth inspecting."
      );
      resultsList.append(empty);
      return;
    }

    results.forEach((result) => {
      const card = createElement(documentLike, "article", "photon-search-result");
      if (result.suspect) {
        card.classList.add("is-suspect");
      }
      const header = createElement(documentLike, "div", "photon-search-result-header");
      const selected = createElement(documentLike, "input", "photon-search-select");
      selected.type = "checkbox";
      selected.checked = result.selected !== false;
      selected.setAttribute("aria-label", `Select ${result.name}`);
      selected.addEventListener("change", () => {
        onToggleSearchResultSelected?.(result.id, selected.checked);
      });
      const nameInput = createElement(documentLike, "input", "photon-search-name-input");
      nameInput.type = "text";
      nameInput.value = result.name;
      nameInput.setAttribute("aria-label", `Name for ${result.name}`);
      nameInput.addEventListener("change", () => {
        onRenameSearchResult?.(result.id, nameInput.value);
      });
      const score = createElement(
        documentLike,
        "span",
        "photon-search-score",
        result.suspect ? "suspect" : formatPhotonSearchScore(result.score)
      );
      header.append(selected, nameInput, score);

      const reason = getPhotonSearchPrimaryReason(result);
      const reasonText = reason
        ? `${reason.label}: ${reason.detail}`
        : "Reference state.";
      const reasonElement = createElement(documentLike, "p", "photon-search-reason", reasonText);
      const meta = createElement(documentLike, "p", "photon-search-meta", formatPhotonSearchMeta(result));
      const actions = createElement(documentLike, "div", "photon-search-result-actions");
      const previewButton = createButton(documentLike, "Preview");
      const loadButton = createButton(documentLike, "Load");
      const playButton = createButton(documentLike, "Play");
      const promoteButton = createButton(
        documentLike,
        result.promotedPresetId ? "Promoted" : "Promote"
      );
      const deleteButton = createButton(documentLike, "Delete");

      previewButton.addEventListener("click", () => onPreviewSearchResult?.(result.id));
      loadButton.addEventListener("click", () => onLoadSearchResult?.(result.id));
      playButton.addEventListener("click", () => onPlaySearchResult?.(result.id));
      promoteButton.disabled = Boolean(result.promotedPresetId);
      promoteButton.addEventListener("click", () => onPromoteSearchResult?.(result.id));
      deleteButton.addEventListener("click", () => onDeleteSearchResult?.(result.id));
      actions.append(previewButton, loadButton, playButton, promoteButton, deleteButton);
      card.append(header, reasonElement, meta, actions);
      resultsList.append(card);
    });
  };

  return { row, sync };
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
    control.sync(value);
    return;
  }
  control.input.value = String(value);
  control.output.textContent = formatControlValue(value, control.digits);
}

function setRangeControlDisabled(control, disabled) {
  control.input.disabled = disabled;
  control.row.classList.toggle("is-disabled", disabled);
}

function syncRadiusRange(control, state, swarmId, layerId) {
  const bounds = getPhotonLayerRadiusBounds(state, swarmId, layerId);
  control.input.min = String(bounds.min);
  control.input.max = String(bounds.max);
  syncRange(control, getPhotonLayer(state, swarmId, layerId).radius);
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
  getPresetId,
  getPresetOptions,
  onPresetChange,
  onResetPreset,
  getSearchResults,
  getSearchStatus,
  isPreviewingSearchResult,
  onSearchConfigurations,
  onRestoreSearchPreview,
  onPreviewSearchResult,
  onLoadSearchResult,
  onPlaySearchResult,
  onPromoteSearchResult,
  onDeleteSearchResult,
  onRenameSearchResult,
  onToggleSearchResultSelected,
  onExportSearchResults,
  onExportSelectedSearchResults,
  onImportSearchResults,
}) {
  const controls = [];
  const binaryControls = [];
  container.textContent = "";
  const onRangeStateChange = () => onStateChange({ syncControls: false, drawNow: false });

  const timeSection = addSection(documentLike, container, "Runtime");
  const presetControl = createPresetControl(documentLike, {
    getPresetId,
    getPresetOptions,
    onPresetChange,
    onResetPreset,
  });
  timeSection.append(presetControl.row);
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
    createPlaybackSpeedControl(documentLike, {
      state,
      getState,
      onInput: () => onRangeStateChange(),
    })
  );
  timeSection.append(...controls.slice(-2).map((control) => control.row));

  const searchSection = addSection(documentLike, container, "Configuration Search");
  const searchControl = createSearchControl(documentLike, {
    getSearchResults,
    getSearchStatus,
    isPreviewingSearchResult,
    onSearchConfigurations,
    onRestoreSearchPreview,
    onPreviewSearchResult,
    onLoadSearchResult,
    onPlaySearchResult,
    onPromoteSearchResult,
    onDeleteSearchResult,
    onRenameSearchResult,
    onToggleSearchResultSelected,
    onExportSearchResults,
    onExportSelectedSearchResults,
    onImportSearchResults,
  });
  searchSection.append(searchControl.row);

  const measurementSection = addSection(documentLike, container, "Measurement");
  measurementSection.classList.add("photon-measurement-section");
  const measurementControls = createElement(documentLike, "div", "photon-measurement-controls");
  const measurementZeroMarker = createElement(documentLike, "span", "photon-measurement-zero-marker");
  const measurementZeroLine = createElement(documentLike, "span", "photon-measurement-zero-line");
  const measurementZeroLabel = createElement(documentLike, "span", "photon-measurement-zero-label", "0");
  measurementZeroMarker.setAttribute("aria-hidden", "true");
  measurementZeroMarker.append(measurementZeroLine, measurementZeroLabel);
  measurementControls.append(measurementZeroMarker);
  measurementSection.append(measurementControls);
  const absoluteHistoryControl = createCheckboxControl(documentLike, {
    label: "Absolute history",
    checked: state.measurement?.sourceHistoryMode === "absolute_history",
    onChange: (checked) => {
      getState().measurement.sourceHistoryMode = checked ? "absolute_history" : "co_moving";
      onStateChange();
    },
  });
  measurementSection.append(absoluteHistoryControl.row);
  const speedModeControl = createSelectControl(documentLike, {
    label: "Local c mode",
    value: normalizePhotonSpeedMode(state.pair?.speedMode),
    options: [
      { value: "direct", label: "Direct" },
      { value: "lorentz_factor", label: "Lorentz factor" },
    ].filter((option) => PHOTON_LOCAL_C_SPEED_MODES.includes(option.value)),
    onChange: (value) => {
      getState().pair.speedMode = normalizePhotonSpeedMode(value);
      onStateChange();
    },
  });
  measurementControls.append(speedModeControl.row);
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
      snapToZero: true,
      onInput: (value) => {
        getState().measurement.virtualObserver[key] = value;
        onRangeStateChange();
      },
    });
    controls.push(control);
    measurementControls.append(control.row);
  });
  const localLorentzControl = createRangeControl(documentLike, {
    label: "Local γ",
    value: state.pair.localLorentzFactor,
    range: PHOTON_CONTROL_RANGES.localLorentzFactor,
    digits: 2,
    onInput: (value) => {
      getState().pair.localLorentzFactor = value;
      onStateChange({ syncControls: true, drawNow: false });
    },
  });
  controls.push(localLorentzControl);
  measurementControls.append(localLorentzControl.row);
  [
    ["signalSpeedCf", "Signal c/c_f", PHOTON_CONTROL_RANGES.signalSpeedCf, 2],
    ["photonSpeedCf", "Photon cγ/c_f", PHOTON_CONTROL_RANGES.photonSpeedCf, 2],
  ].forEach(([key, label, range, digits]) => {
    const control = createRangeControl(documentLike, {
      label,
      value: key === "signalSpeedCf"
        ? state.measurement.signalSpeedCf
        : state.pair.photonSpeedCf,
      range,
      digits,
      onInput: (value) => {
        const nextState = getState();
        if (key === "signalSpeedCf") {
          nextState.measurement.signalSpeedCf = value;
          nextState.measurement.emissionSpeedCf = value;
        } else {
          nextState.pair.photonSpeedCf = value;
        }
        onRangeStateChange();
      },
    });
    controls.push(control);
    measurementControls.append(control.row);
  });
  PHOTON_CONTROL_SWARM_ORDER.forEach((swarmId) => {
    const swarm = state.pair[swarmId];
    const section = addSection(documentLike, container, `${swarm.role} ${swarm.direction.toUpperCase()}`);
    PHOTON_LAYER_ORDER.forEach((layerId) => {
      const layer = getPhotonLayer(state, swarmId, layerId);
      const layerLabel = PHOTON_LAYER_META[layerId]?.label ?? layerId;
      const group = createElement(documentLike, "div", "photon-layer-group");
      group.append(createElement(documentLike, "h3", "", layerLabel));
      const enabledControl = createCheckboxControl(documentLike, {
        label: `${swarm.role} ${layerLabel} binary enabled`,
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
        ["radius", "r", PHOTON_CONTROL_RANGES.radius, 4],
        ["phaseDeg", "phase", PHOTON_CONTROL_RANGES.phaseDeg, 0],
      ].forEach(([key, label, range, digits]) => {
        const handleLayerInput = (value) => {
          const nextState = getState();
          setPhotonLayerValue(nextState, swarmId, layerId, key, value);
          if (key === "radius") {
            onStateChange({ syncControls: true, drawNow: false });
            return;
          }
          onRangeStateChange();
        };
        const control = key === "frequencyHz"
          ? createFrequencyPowerControl(documentLike, {
              label,
              value: layer[key],
              onInput: handleLayerInput,
            })
          : createRangeControl(documentLike, {
              label,
              value: layer[key],
              range,
              digits,
              snapToPhaseDegrees: key === "phaseDeg",
              onInput: handleLayerInput,
            });
        controls.push(control);
        group.append(control.row);
      });
      section.append(group);
    });
  });

  const analyzerSection = addSection(documentLike, container, "Analyzer");
  const rawPolarizationControl = createCheckboxControl(documentLike, {
    label: "Show raw polarization points",
    checked: state.view?.rawPolarizationVisible !== false,
    onChange: (checked) => {
      getState().view.rawPolarizationVisible = checked;
      onStateChange();
    },
  });
  analyzerSection.append(rawPolarizationControl.row);
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
    presetControl.sync(nextState);
    searchControl.sync(nextState);
    const speedSettings = resolvePhotonSpeedSettings(nextState);
    let index = 0;
    syncRange(controls[index], nextState.pair.pairSeparation);
    index += 1;
    syncRange(controls[index], nextState.time.speedMultiplier);
    index += 1;
    ["x", "y", "z"].forEach((key) => {
      syncRange(controls[index], nextState.measurement.virtualObserver[key]);
      index += 1;
    });
    syncRange(controls[index], speedSettings.localLorentzFactor);
    setRangeControlDisabled(controls[index], speedSettings.speedMode !== "lorentz_factor");
    index += 1;
    syncRange(controls[index], speedSettings.signalSpeedCf);
    setRangeControlDisabled(controls[index], speedSettings.speedMode !== "direct");
    index += 1;
    syncRange(controls[index], speedSettings.photonSpeedCf);
    setRangeControlDisabled(controls[index], speedSettings.speedMode !== "direct");
    index += 1;
    PHOTON_CONTROL_SWARM_ORDER.forEach((swarmId) => {
      PHOTON_LAYER_ORDER.forEach((layerId) => {
        const layer = getPhotonLayer(nextState, swarmId, layerId);
        ["frequencyHz", "radius", "phaseDeg"].forEach((key) => {
          if (key === "radius") {
            syncRadiusRange(controls[index], nextState, swarmId, layerId);
          } else {
            syncRange(controls[index], layer[key]);
          }
          index += 1;
        });
      });
    });
    binaryControls.forEach((control) => {
      control.input.checked = getPhotonLayer(nextState, control.swarmId, control.layerId).enabled !== false;
    });
    absoluteHistoryControl.input.checked = nextState.measurement?.sourceHistoryMode === "absolute_history";
    speedModeControl.sync(speedSettings.speedMode);
    ["analyzerAngleDeg"].forEach((key) => {
      syncRange(controls[index], nextState.polarization[key]);
      index += 1;
    });
    pauseButton.textContent = nextState.time.paused ? "Play" : "Pause";
    syncToggleButton(pathsButton, nextState.view.pathsVisible, "Paths on", "Paths off");
    rawPolarizationControl.input.checked = nextState.view?.rawPolarizationVisible !== false;
  }

  sync(state);
  return { sync };
}
