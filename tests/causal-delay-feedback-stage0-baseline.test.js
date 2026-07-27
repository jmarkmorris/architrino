import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { STORY_STEPS } from "../src/apps/causal-delay-feedback/CausalDelayFeedbackStoryMode.js";

const baseline = JSON.parse(readFileSync(
  new URL("../reference/priorities/dormant-deferred/app-causal-delay-feedback/browser-qa/stage-0-golden-baseline.json", import.meta.url),
));
const matrix = JSON.parse(readFileSync(
  new URL("../reference/priorities/dormant-deferred/app-causal-delay-feedback/browser-qa/stage-0-transition-matrix.json", import.meta.url),
));

test("Stage 0 golden baseline matches the current five working Story lessons", () => {
  assert.equal(baseline.schemaVersion, "cdf-stage-0-golden-baseline/v1");
  assert.equal(baseline.page.lessonCount, 5);
  assert.equal(baseline.lessons.length, STORY_STEPS.length);
  assert.equal(STORY_STEPS.length, 5);
  assert.deepEqual(
    baseline.lessons.map(({ id, title, body }) => ({ id, title, body })),
    STORY_STEPS.map(({ id, title, body }) => ({ id, title, body })),
  );
  assert.equal(baseline.page.laboratoryLabel, "Laboratory");
  assert.equal(baseline.page.laboratoryTitle, "Causal Delay Laboratory");
  assert.equal(baseline.sharedPace.value, "0.800");
  assert.deepEqual(Object.keys(baseline.viewports).sort(), ["desktop", "portrait"]);
});

test("Stage 0 matrix covers every requested normal-UI transition", () => {
  assert.equal(matrix.schemaVersion, "cdf-stage-0-transition-matrix/v1");
  assert.equal(matrix.interactionAuthority, "normal-browser-ui-input");
  const ids = new Set(matrix.cases.map(({ id }) => id));
  for (const requiredId of [
    "cold-load-lesson-one",
    "direct-entry-lesson-one",
    "direct-entry-lesson-two",
    "direct-entry-lesson-three",
    "direct-entry-lesson-four",
    "direct-entry-lesson-five",
    "lesson-one-to-two",
    "lesson-two-to-three-handoff",
    "pointer-and-keyboard-scrub",
    "pause-resume",
    "first-last",
    "shared-pace",
    "desktop-navigation",
    "portrait-navigation",
    "laboratory-entry",
  ]) {
    assert.ok(ids.has(requiredId), `missing Stage 0 matrix case ${requiredId}`);
  }
  assert.match(JSON.stringify(matrix), /normal-browser-ui-input/u);
  assert.doesNotMatch(JSON.stringify(matrix), /learnerState\s*=/u);
  assert.doesNotMatch(JSON.stringify(matrix), /runtime\./u);
});

