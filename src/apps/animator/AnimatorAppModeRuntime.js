import {
  STANDALONE_APP_HOME_HREF,
  navigateStandaloneAppHome,
} from "../navigator/StandaloneAppHomeRuntime.js";

export const ANIMATOR_APP_MODE = "animator";
export const ANIMATOR_SCENE_PATH = "content/archive/pdg/animator-simulation-fixture.json";
export const STANDALONE_ANIMATOR_NAVIGATOR_HREF = STANDALONE_APP_HOME_HREF;

export function getAnimatorAppMode(windowLike = globalThis.window) {
  return String(windowLike?.__ARCHITRINO_APP_MODE__ ?? "").trim().toLowerCase();
}

export function isStandaloneAnimatorAppMode(appMode = "") {
  return String(appMode ?? "").trim().toLowerCase() === ANIMATOR_APP_MODE;
}

export function getAnimatorInitialScenePath({
  requestedScenePath = "",
  rootScenePath = "",
} = {}) {
  const normalizedRequestedScenePath = String(requestedScenePath ?? "").trim();
  if (normalizedRequestedScenePath) {
    return normalizedRequestedScenePath;
  }
  return ANIMATOR_SCENE_PATH || String(rootScenePath ?? "").trim();
}

export function navigateStandaloneAnimatorHome(
  locationLike = globalThis.window?.location,
  href = STANDALONE_ANIMATOR_NAVIGATOR_HREF
) {
  return navigateStandaloneAppHome(locationLike, href);
}

export {
  createAnimatorAppRuntime,
  createAnimatorAppStore,
} from "./AnimatorAppRuntime.js";
