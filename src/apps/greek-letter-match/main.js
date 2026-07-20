import { mountGreekLetterMatch } from "./GreekLetterMatchRuntime.js";

function reportGreekLetterMatchBootstrapError(
  error,
  documentLike = globalThis.document,
  windowLike = globalThis.window
) {
  const message = error instanceof Error ? error.message : String(error);
  if (windowLike) {
    windowLike.__ARCHITRINO_GREEK_LETTER_MATCH_BOOT_ERROR__ = message;
  }
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(error);
  }
  const appElement = documentLike?.getElementById?.("greek-letter-match-app");
  if (!appElement) {
    return;
  }
  const banner = documentLike.createElement("div");
  banner.className = "greek-match-boot-error";
  banner.textContent = `It's Greek to Me! failed to initialize: ${message}`;
  appElement.append(banner);
}

if (typeof document !== "undefined") {
  try {
    const runtime = mountGreekLetterMatch();
    if (typeof window !== "undefined") {
      window.__ARCHITRINO_GREEK_LETTER_MATCH_RUNTIME__ = runtime;
    }
  } catch (error) {
    reportGreekLetterMatchBootstrapError(error, document, window);
  }
}
