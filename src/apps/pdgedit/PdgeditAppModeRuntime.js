import {
  STANDALONE_APP_HOME_HREF,
  navigateStandaloneAppHome,
} from "../navigator/StandaloneAppHomeRuntime.js";

export const PDGEDIT_APP_MODE = "pdgedit";
export const STANDALONE_PDGEDIT_NAVIGATOR_HREF = STANDALONE_APP_HOME_HREF;

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
  return navigateStandaloneAppHome(locationLike, href);
}
