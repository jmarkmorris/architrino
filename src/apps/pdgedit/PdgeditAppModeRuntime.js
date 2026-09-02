export const PDGEDIT_APP_MODE = "pdgedit";

export function getPdgeditAppMode(windowLike = globalThis.window) {
  return String(windowLike?.__ARCHITRINO_APP_MODE__ ?? "").trim().toLowerCase();
}

export function isStandalonePdgeditAppMode(appMode = "") {
  return String(appMode ?? "").trim().toLowerCase() === PDGEDIT_APP_MODE;
}
