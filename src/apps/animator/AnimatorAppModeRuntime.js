export const PDGVIEW_APP_MODE = "animator";
export const PDGVIEW_SCENE_PATH = "content/archive/pdg/animator.json";
export const STANDALONE_PDGVIEW_NAVIGATOR_HREF = "./index.html";

export function getAnimatorAppMode(windowLike = globalThis.window) {
  return String(windowLike?.__ARCHITRINO_APP_MODE__ ?? "").trim().toLowerCase();
}

export function isStandaloneAnimatorAppMode(appMode = "") {
  return String(appMode ?? "").trim().toLowerCase() === PDGVIEW_APP_MODE;
}

export function getAnimatorInitialScenePath({
  requestedScenePath = "",
  rootScenePath = "",
} = {}) {
  const normalizedRequestedScenePath = String(requestedScenePath ?? "").trim();
  if (normalizedRequestedScenePath) {
    return normalizedRequestedScenePath;
  }
  return PDGVIEW_SCENE_PATH || String(rootScenePath ?? "").trim();
}

export function navigateStandaloneAnimatorHome(
  locationLike = globalThis.window?.location,
  href = STANDALONE_PDGVIEW_NAVIGATOR_HREF
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
