export const COMPOSER_APP_MODE = "composer";
export const COMPOSER_SCENE_PATH = "content/scenes/archie/composer.json";
export const STANDALONE_COMPOSER_NAVIGATOR_HREF = "./index.html";

export function getComposerAppMode(windowLike = globalThis.window) {
  return String(windowLike?.__ARCHITRINO_APP_MODE__ ?? "").trim().toLowerCase();
}

export function isStandaloneComposerAppMode(appMode = "") {
  return String(appMode ?? "").trim().toLowerCase() === COMPOSER_APP_MODE;
}

export function getComposerInitialScenePath({
  requestedScenePath = "",
  rootScenePath = "",
} = {}) {
  const normalizedRequestedScenePath = String(requestedScenePath ?? "").trim();
  if (normalizedRequestedScenePath) {
    return normalizedRequestedScenePath;
  }
  return COMPOSER_SCENE_PATH || String(rootScenePath ?? "").trim();
}

export function navigateStandaloneComposerHome(
  locationLike = globalThis.window?.location,
  href = STANDALONE_COMPOSER_NAVIGATOR_HREF
) {
  const resolvedHref = String(href ?? "").trim();
  if (!resolvedHref || typeof locationLike?.assign !== "function") {
    return false;
  }
  locationLike.assign(resolvedHref);
  return true;
}

export {
  createComposerAppRuntime,
  createComposerAppStore,
} from "./ComposerAppRuntime.js";
