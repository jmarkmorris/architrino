import {
  APPLICATIONS_SCENE_PATH,
  navigateStandaloneAppHome,
} from "../navigator/StandaloneAppHomeRuntime.js";

export function buildMoleculeElementSceneHref({
  currentHref,
  scenePath,
}) {
  const normalizedScenePath = String(scenePath ?? "").trim();
  if (!normalizedScenePath) {
    return null;
  }
  const url = new URL("./index.html", currentHref);
  const params = new URLSearchParams();
  params.set("scene", normalizedScenePath);
  params.set("parent", APPLICATIONS_SCENE_PATH);
  params.set("focus", "molecule");
  url.hash = params.toString();
  return url.href;
}

export function navigateMoleculeElementScene({
  windowLike = globalThis.window,
  scenePath,
}) {
  const currentHref = windowLike?.location?.href;
  if (!currentHref) {
    return false;
  }
  const href = buildMoleculeElementSceneHref({ currentHref, scenePath });
  if (!href) {
    return false;
  }
  return navigateStandaloneAppHome(windowLike.location, href, {
    windowLike,
    returnHref: currentHref,
  });
}
