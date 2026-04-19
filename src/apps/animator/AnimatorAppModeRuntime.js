export const ANIMATOR_APP_MODE = "animator";
export const ANIMATOR_SCENE_PATH = "content/archive/pdg/animator.json";
export const STANDALONE_ANIMATOR_NAVIGATOR_HREF = "./index.html";

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
  const resolvedHref = String(href ?? "").trim();
  if (!resolvedHref || typeof locationLike?.assign !== "function") {
    return false;
  }
  locationLike.assign(resolvedHref);
  return true;
}

export {
  createAnimatorAppRuntime,
  createAnimatorAppStore,
} from "./AnimatorAppRuntime.js";
