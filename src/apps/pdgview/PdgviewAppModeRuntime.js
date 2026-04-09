export const PDGVIEW_APP_MODE = "pdgview";
export const PDGVIEW_SCENE_PATH = "content/scenes/archie/pdgview.json";
export const STANDALONE_PDGVIEW_NAVIGATOR_HREF = "./index.html";

export function getPdgviewAppMode(windowLike = globalThis.window) {
  return String(windowLike?.__ARCHITRINO_APP_MODE__ ?? "").trim().toLowerCase();
}

export function isStandalonePdgviewAppMode(appMode = "") {
  return String(appMode ?? "").trim().toLowerCase() === PDGVIEW_APP_MODE;
}

export function getPdgviewInitialScenePath({
  requestedScenePath = "",
  rootScenePath = "",
} = {}) {
  const normalizedRequestedScenePath = String(requestedScenePath ?? "").trim();
  if (normalizedRequestedScenePath) {
    return normalizedRequestedScenePath;
  }
  return PDGVIEW_SCENE_PATH || String(rootScenePath ?? "").trim();
}

export function navigateStandalonePdgviewHome(
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
  createPdgviewAppRuntime,
  createPdgviewAppStore,
} from "./PdgviewAppRuntime.js";
