export const PDGSOLVE_APP_MODE = "pdgsolve";
export const STANDALONE_PDGSOLVE_NAVIGATOR_HREF = "./index.html";

export function getPdgsolveAppMode(windowLike = globalThis.window) {
  return String(windowLike?.__ARCHITRINO_APP_MODE__ ?? "").trim().toLowerCase();
}

export function isStandalonePdgsolveAppMode(appMode = "") {
  return String(appMode ?? "").trim().toLowerCase() === PDGSOLVE_APP_MODE;
}

export function navigateStandalonePdgsolveHome(
  locationLike = globalThis.window?.location,
  href = STANDALONE_PDGSOLVE_NAVIGATOR_HREF
) {
  const resolvedHref = String(href ?? "").trim();
  if (!resolvedHref || typeof locationLike?.assign !== "function") {
    return false;
  }
  locationLike.assign(resolvedHref);
  return true;
}
