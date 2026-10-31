import { STORY_ACTIVE_STEPS, createStoryScene, createStoryView } from "./CausalDelayFeedbackStoryMode.js";
import { BINARY_LESSONS, createBinaryLessonScene, createBinaryLessonView } from "./CausalDelayFeedbackBinaryLessons.js";

// Each scenario owns its lesson sequence and geometry description. The runtime,
// state object, transport and navigation remain shared across all scenarios.
export const LESSON_SCENARIOS = Object.freeze([
  { id: "path-history", label: "Path history", lessons: STORY_ACTIVE_STEPS, createScene: createStoryScene, createView: createStoryView },
  { id: "binary-pair", label: "Binary pair", lessons: BINARY_LESSONS, createScene: createBinaryLessonScene, createView: createBinaryLessonView },
]);

export function getLessonScenario(state) {
  return LESSON_SCENARIOS.find(({ id }) => id === state?.lessonScenario) ?? LESSON_SCENARIOS[0];
}

export function isBinaryLesson(state) {
  return state?.mode === "story" && getLessonScenario(state).id === "binary-pair";
}

export function createLessonScene(state) { return getLessonScenario(state).createScene(state); }
export function createLessonView(state) { return getLessonScenario(state).createView(state); }

export function getLessonLocation(href) {
  try {
    const url = new URL(href, "http://localhost/");
    const scenario = LESSON_SCENARIOS.find(({ id }) => id === url.searchParams.get("scenario")) ?? LESSON_SCENARIOS[0];
    const step = scenario.lessons.findIndex(({ id }) => id === url.searchParams.get("lesson"));
    return { scenario: scenario.id, step: Math.max(0, step) };
  } catch { return { scenario: "path-history", step: 0 }; }
}

export function createLessonLocationHref(href, state) {
  const url = new URL(href, "http://localhost/");
  const scenario = getLessonScenario(state);
  if (scenario.id === "path-history") url.searchParams.delete("scenario");
  else url.searchParams.set("scenario", scenario.id);
  if (state.mode === "story" && state.storyStep > 0) {
    url.searchParams.set("lesson", scenario.lessons[state.storyStep]?.id ?? scenario.lessons[0].id);
  } else url.searchParams.delete("lesson");
  return url.href;
}
