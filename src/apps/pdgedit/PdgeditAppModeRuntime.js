export const PDGEDIT_APP_MODE = "pdgedit";
export const STANDALONE_PDGEDIT_NAVIGATOR_HREF = "./index.html";

export function getPdgeditAppMode(windowLike = globalThis.window) {
  return String(windowLike?.__ARCHITRINO_APP_MODE__ ?? "").trim().toLowerCase();
}

export function isStandalonePdgeditAppMode(appMode = "") {
  return String(appMode ?? "").trim().toLowerCase() === PDGEDIT_APP_MODE;
}

export function navigateStandalonePdgeditHome(
  locationLike = globalThis.window?.location,
  href = STANDALONE_PDGEDIT_NAVIGATOR_HREF
) {
  const resolvedHref = String(href ?? "").trim();
  if (!resolvedHref || typeof locationLike?.assign !== "function") {
    return false;
  }
  locationLike.assign(resolvedHref);
  return true;
}

