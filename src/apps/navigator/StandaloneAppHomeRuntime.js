export const APPLICATIONS_SCENE_PATH = "content/scenes/archie/applications.json";
export const STANDALONE_APP_HOME_HREF = `./index.html#scene=${encodeURIComponent(APPLICATIONS_SCENE_PATH)}`;
export const STANDALONE_SITE_HOME_HREF = "./index.html";
export const STANDALONE_APP_HOME_RETURN_STORAGE_KEY = "architrino.standaloneApp.homeReturn.v1";

export function resolveStandaloneAppHomeHref(currentHref = "") {
  const baseHref = String(currentHref ?? "").trim() || "http://localhost/";
  const url = new URL("./index.html", baseHref);
  const params = new URLSearchParams();
  params.set("scene", APPLICATIONS_SCENE_PATH);
  url.hash = params.toString();
  return url.href;
}

export function resolveStandaloneSiteHomeHref(currentHref = "") {
  const baseHref = String(currentHref ?? "").trim() || "http://localhost/";
  return new URL(STANDALONE_SITE_HOME_HREF, baseHref).href;
}

function resolveReturnHref(windowLike = globalThis.window, returnHref = "") {
  const rawHref = String(returnHref || windowLike?.location?.href || "").trim();
  if (!rawHref) {
    return "";
  }
  try {
    return new URL(rawHref, windowLike?.location?.href || "http://localhost/").href;
  } catch {
    return "";
  }
}

function hasSameOrigin(windowLike = globalThis.window, href = "") {
  try {
    const currentOrigin = new URL(
      windowLike?.location?.href || "http://localhost/"
    ).origin;
    const returnOrigin = new URL(href).origin;
    return currentOrigin === returnOrigin;
  } catch {
    return false;
  }
}

export function recordStandaloneAppHomeReturn(windowLike = globalThis.window, returnHref = "") {
  const href = resolveReturnHref(windowLike, returnHref);
  if (
    !href ||
    !hasSameOrigin(windowLike, href) ||
    typeof windowLike?.sessionStorage?.setItem !== "function"
  ) {
    return false;
  }
  try {
    windowLike.sessionStorage.setItem(
      STANDALONE_APP_HOME_RETURN_STORAGE_KEY,
      JSON.stringify({
        href,
        recordedAt: Date.now(),
      })
    );
    return true;
  } catch {
    return false;
  }
}

export function consumeStandaloneAppHomeReturn(windowLike = globalThis.window) {
  if (typeof windowLike?.sessionStorage?.getItem !== "function") {
    return null;
  }
  try {
    const rawValue = windowLike.sessionStorage.getItem(
      STANDALONE_APP_HOME_RETURN_STORAGE_KEY
    );
    windowLike.sessionStorage.removeItem?.(
      STANDALONE_APP_HOME_RETURN_STORAGE_KEY
    );
    if (!rawValue) {
      return null;
    }
    const parsedValue = JSON.parse(rawValue);
    const href = resolveReturnHref(windowLike, parsedValue?.href);
    if (!href || !hasSameOrigin(windowLike, href)) {
      return null;
    }
    return {
      href,
    };
  } catch {
    return null;
  }
}

export function navigateStandaloneAppHome(
  locationLike = globalThis.window?.location,
  href = STANDALONE_APP_HOME_HREF,
  options = {}
) {
  const resolvedHref = String(href ?? "").trim();
  if (!resolvedHref || typeof locationLike?.assign !== "function") {
    return false;
  }
  recordStandaloneAppHomeReturn(
    options.windowLike ?? globalThis.window,
    options.returnHref
  );
  locationLike.assign(resolvedHref);
  return true;
}
