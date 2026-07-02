export const APPLICATIONS_SCENE_PATH = "content/scenes/archie/applications.json";
export const STANDALONE_APP_HOME_HREF = `./index.html#scene=${encodeURIComponent(APPLICATIONS_SCENE_PATH)}`;

export function resolveStandaloneAppHomeHref(currentHref = "") {
  const baseHref = String(currentHref ?? "").trim() || "http://localhost/";
  const url = new URL("./index.html", baseHref);
  const params = new URLSearchParams();
  params.set("scene", APPLICATIONS_SCENE_PATH);
  url.hash = params.toString();
  return url.href;
}

export function navigateStandaloneAppHome(
  locationLike = globalThis.window?.location,
  href = STANDALONE_APP_HOME_HREF
) {
  const resolvedHref = String(href ?? "").trim();
  if (!resolvedHref || typeof locationLike?.assign !== "function") {
    return false;
  }
  locationLike.assign(resolvedHref);
  return true;
}
