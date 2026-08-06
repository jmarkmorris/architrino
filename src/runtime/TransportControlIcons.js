export const TRANSPORT_CONTROL_ICON = Object.freeze({
  PLAY: "play",
  PAUSE: "pause",
  FIRST_FRAME: "first-frame",
  LAST_FRAME: "last-frame",
  REWIND: "rewind",
  RESET: "reset",
  STOP: "stop",
});

const TRANSPORT_CONTROL_ICON_FRAGMENT = Object.freeze({
  [TRANSPORT_CONTROL_ICON.PLAY]: '<path d="M8 5v14l10-7z"></path>',
  [TRANSPORT_CONTROL_ICON.PAUSE]: '<path d="M8 5v14"></path><path d="M16 5v14"></path>',
  [TRANSPORT_CONTROL_ICON.FIRST_FRAME]: '<path d="M7 5v14"></path><path d="M18 6l-8 6 8 6z"></path>',
  [TRANSPORT_CONTROL_ICON.LAST_FRAME]: '<path d="M17 5v14"></path><path d="M6 6l8 6-8 6z"></path>',
  [TRANSPORT_CONTROL_ICON.REWIND]: '<path d="M11 6l-7 6 7 6z"></path><path d="M20 6l-7 6 7 6z"></path>',
  [TRANSPORT_CONTROL_ICON.RESET]: '<path d="M6 8a8 8 0 1 1-1.6 7"></path><path d="M6 3v5h5"></path>',
  [TRANSPORT_CONTROL_ICON.STOP]: '<rect x="7" y="7" width="10" height="10" rx="1"></rect>',
});

const TRANSPORT_CONTROL_LABEL = Object.freeze({
  [TRANSPORT_CONTROL_ICON.PLAY]: "Play",
  [TRANSPORT_CONTROL_ICON.PAUSE]: "Pause",
  [TRANSPORT_CONTROL_ICON.FIRST_FRAME]: "First frame",
  [TRANSPORT_CONTROL_ICON.LAST_FRAME]: "Last frame",
  [TRANSPORT_CONTROL_ICON.REWIND]: "Rewind",
  [TRANSPORT_CONTROL_ICON.RESET]: "Reset",
  [TRANSPORT_CONTROL_ICON.STOP]: "Stop",
});

export function getTransportControlIconMarkup(kind) {
  const fragment = TRANSPORT_CONTROL_ICON_FRAGMENT[kind];
  if (!fragment) {
    throw new TypeError(`Unknown transport-control icon: ${String(kind)}`);
  }
  return `<svg class="transport-control-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-transport-icon="${kind}">${fragment}</svg>`;
}

export function setTransportControlIcon(container, kind) {
  if (!container) {
    return;
  }
  const currentIcon = container.querySelector?.("[data-transport-icon]");
  if (currentIcon?.dataset?.transportIcon === kind) {
    return;
  }
  container.innerHTML = getTransportControlIconMarkup(kind);
}

export function setTransportControlButtonPresentation(button, {
  kind,
  label = TRANSPORT_CONTROL_LABEL[kind],
  pressed,
  tooltip = label,
} = {}) {
  if (!button) {
    return;
  }
  const iconHost = button.querySelector?.("[data-transport-icon-host]") ?? button;
  setTransportControlIcon(iconHost, kind);
  if (label) {
    button.setAttribute("aria-label", label);
    button.title = label;
  }
  if (typeof pressed === "boolean") {
    button.setAttribute("aria-pressed", pressed ? "true" : "false");
  } else {
    button.removeAttribute?.("aria-pressed");
  }
  if (tooltip && button.dataset) {
    button.dataset.tooltip = tooltip;
  }
}
