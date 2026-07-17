import assert from "node:assert/strict";
import { test } from "node:test";

import {
  BORG_CERTIFIED_RUN_GRADE,
  BORG_DISPLAY_RUN_GRADE,
  createBorgRunGradeControl,
} from "../src/apps/borg/BorgRunGradeControl.js";

function createButton() {
  const target = new EventTarget();
  const attributes = new Map();
  return {
    dataset: {},
    textContent: "",
    title: "",
    addEventListener: target.addEventListener.bind(target),
    removeEventListener: target.removeEventListener.bind(target),
    dispatchEvent: target.dispatchEvent.bind(target),
    setAttribute: (name, value) => attributes.set(name, String(value)),
    getAttribute: (name) => attributes.get(name) ?? null,
  };
}

test("Borg run-grade toggle defaults to display and reports pending changes", () => {
  const button = createButton();
  const changes = [];
  const control = createBorgRunGradeControl({
    button,
    onChange: (grade) => changes.push(grade),
  });

  assert.equal(control.getGrade(), BORG_DISPLAY_RUN_GRADE);
  assert.equal(button.dataset.runGrade, BORG_DISPLAY_RUN_GRADE);
  assert.equal(button.getAttribute("aria-pressed"), "false");
  assert.equal(
    button.textContent,
    "Continue through close encounters (display grade)",
  );

  button.dispatchEvent(new Event("click"));
  assert.equal(control.getGrade(), BORG_CERTIFIED_RUN_GRADE);
  assert.equal(button.getAttribute("aria-pressed"), "true");
  assert.equal(
    button.textContent,
    "Stop at uncertified encounters (certified grade)",
  );
  assert.deepEqual(changes, [BORG_CERTIFIED_RUN_GRADE]);

  control.dispose();
});
