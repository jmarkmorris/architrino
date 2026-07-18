import assert from "node:assert/strict";
import { test } from "node:test";

import { createBorgDiagnosticsPanelController } from "../src/apps/borg/BorgDiagnosticsPanel.js";

function createElement() {
  const eventTarget = new EventTarget();
  const attributes = new Map();
  const classes = new Set();
  return {
    title: "",
    classList: {
      contains: (name) => classes.has(name),
      toggle(name, force) {
        if (force) {
          classes.add(name);
        } else {
          classes.delete(name);
        }
      },
    },
    addEventListener: eventTarget.addEventListener.bind(eventTarget),
    removeEventListener: eventTarget.removeEventListener.bind(eventTarget),
    dispatchEvent: eventTarget.dispatchEvent.bind(eventTarget),
    setAttribute: (name, value) => attributes.set(name, String(value)),
    removeAttribute: (name) => attributes.delete(name),
    getAttribute: (name) => attributes.get(name) ?? null,
    hasAttribute: (name) => attributes.has(name),
  };
}

test("Borg diagnostics panel is closed by default and renders only while open", () => {
  const panel = createElement();
  const toggleButton = createElement();
  let currentValue = "initial";
  let renderedValue = null;
  let renderCount = 0;
  const controller = createBorgDiagnosticsPanelController({
    panel,
    toggleButton,
    render() {
      renderedValue = currentValue;
      renderCount += 1;
    },
  });

  assert.equal(panel.getAttribute("aria-hidden"), "true");
  assert.equal(panel.hasAttribute("inert"), true);
  assert.equal(toggleButton.getAttribute("aria-label"), "Show diagnostics");
  assert.equal(toggleButton.getAttribute("aria-pressed"), "false");
  assert.equal(renderCount, 0);

  currentValue = "closed update";
  assert.equal(controller.renderIfOpen(), false);
  assert.equal(renderCount, 0);

  toggleButton.dispatchEvent(new Event("click"));
  assert.equal(panel.classList.contains("is-open"), true);
  assert.equal(panel.getAttribute("aria-hidden"), "false");
  assert.equal(panel.hasAttribute("inert"), false);
  assert.equal(toggleButton.classList.contains("is-active"), true);
  assert.equal(toggleButton.getAttribute("aria-label"), "Hide diagnostics");
  assert.equal(toggleButton.getAttribute("aria-pressed"), "true");
  assert.equal(renderedValue, "closed update");
  assert.equal(renderCount, 1);

  currentValue = "open update";
  assert.equal(controller.renderIfOpen(), true);
  assert.equal(renderedValue, "open update");
  assert.equal(renderCount, 2);

  toggleButton.dispatchEvent(new Event("click"));
  currentValue = "second closed update";
  assert.equal(controller.renderIfOpen(), false);
  assert.equal(renderedValue, "open update");
  assert.equal(renderCount, 2);

  controller.dispose();
});
