import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  TRANSPORT_CONTROL_ICON,
  getTransportControlIconMarkup,
  setTransportControlButtonPresentation,
} from "../src/runtime/TransportControlIcons.js";

test("canonical transport set exposes all seven controls as monoline SVG", () => {
  assert.deepEqual(Object.values(TRANSPORT_CONTROL_ICON), [
    "play",
    "pause",
    "first-frame",
    "last-frame",
    "rewind",
    "reset",
    "stop",
  ]);

  Object.values(TRANSPORT_CONTROL_ICON).forEach((kind) => {
    const markup = getTransportControlIconMarkup(kind);
    assert.match(markup, /viewBox="0 0 24 24"/);
    assert.match(markup, /stroke="currentColor"/);
    assert.match(markup, /stroke-width="2"/);
    assert.match(markup, new RegExp(`data-transport-icon="${kind}"`));
    assert.doesNotMatch(markup, /▶|⏮|⏸|⏹|\|\|/u);
  });
});

test("canonical pause is two independent strokes", () => {
  const markup = getTransportControlIconMarkup(TRANSPORT_CONTROL_ICON.PAUSE);
  assert.match(markup, /<path d="M8 5v14"><\/path><path d="M16 5v14"><\/path>/);
  assert.doesNotMatch(markup, /h3v14/);
});

test("canonical Last Frame mirrors First Frame with a right-side stop bar", () => {
  const markup = getTransportControlIconMarkup(TRANSPORT_CONTROL_ICON.LAST_FRAME);
  assert.match(markup, /<path d="M17 5v14"><\/path>/);
  assert.match(markup, /<path d="M6 6l8 6-8 6z"><\/path>/);

  const attributes = {};
  const button = {
    dataset: {},
    innerHTML: "",
    querySelector() {
      return null;
    },
    setAttribute(name, value) {
      attributes[name] = value;
    },
    removeAttribute(name) {
      delete attributes[name];
    },
  };
  setTransportControlButtonPresentation(button, {
    kind: TRANSPORT_CONTROL_ICON.LAST_FRAME,
  });
  assert.equal(attributes["aria-label"], "Last frame");
  assert.equal(button.title, "Last frame");
});

test("transport presentation keeps icon, accessible name, title, and pressed state together", () => {
  const attributes = {};
  const button = {
    dataset: {},
    innerHTML: "",
    querySelector() {
      return null;
    },
    setAttribute(name, value) {
      attributes[name] = value;
    },
    removeAttribute(name) {
      delete attributes[name];
    },
  };

  setTransportControlButtonPresentation(button, {
    kind: TRANSPORT_CONTROL_ICON.PAUSE,
    label: "Pause replay",
    pressed: true,
  });

  assert.match(button.innerHTML, /data-transport-icon="pause"/);
  assert.equal(attributes["aria-label"], "Pause replay");
  assert.equal(attributes["aria-pressed"], "true");
  assert.equal(button.title, "Pause replay");
  assert.equal(button.dataset.tooltip, "Pause replay");
});

test("unchanged transport presentation preserves the live icon node", () => {
  let writes = 0;
  const liveIcon = { dataset: { transportIcon: "pause" } };
  const container = {
    querySelector() {
      return liveIcon;
    },
    set innerHTML(_value) {
      writes += 1;
    },
  };
  const attributes = {};
  const button = {
    dataset: {},
    querySelector() {
      return container;
    },
    setAttribute(name, value) {
      attributes[name] = value;
    },
    removeAttribute(name) {
      delete attributes[name];
    },
  };
  setTransportControlButtonPresentation(button, {
    kind: TRANSPORT_CONTROL_ICON.PAUSE,
    label: "Pause replay",
    pressed: true,
  });
  assert.equal(writes, 0);
  assert.equal(attributes["aria-pressed"], "true");
});

test("unknown transport kinds do not advance", () => {
  assert.throws(() => getTransportControlIconMarkup("skip"), /Unknown transport-control icon/);
});

test("all app transport surfaces use the shared implementation path", () => {
  const runtimePaths = [
    "../src/apps/borg/BorgAppRuntime.js",
    "../src/apps/causal-delay-feedback/CausalDelayFeedbackRuntime.js",
    "../src/apps/ideal-braid/IdealBraidRuntime.js",
    "../src/apps/architrino/ArchitrinoSceneAppRuntime.js",
    "../src/apps/photon/PhotonControlsRuntime.js",
  ];
  runtimePaths.forEach((path) => {
    const source = readFileSync(new URL(path, import.meta.url), "utf8");
    assert.match(source, /TransportControlIcons\.js/);
  });

  const migratedSurface = [
    "../borg.html",
    "../causal-delay-feedback.html",
    "../ideal-braid.html",
    "../animator.html",
    "../index.html",
    "../photon.html",
    ...runtimePaths,
  ].map((path) => readFileSync(new URL(path, import.meta.url), "utf8")).join("\n");

  assert.doesNotMatch(migratedSurface, /PLAY_ICON_PATH|PAUSE_ICON_PATH|▶|⏮|⏸|⏹/u);
  assert.doesNotMatch(migratedSurface, /ideal-braid-control-icon\.is-(?:play|pause)/);
  assert.doesNotMatch(migratedSurface, /id="causal-delay-feedback-pause"/);
});
