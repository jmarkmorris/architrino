import { mountBorgApp } from "./BorgAppRuntime.js";

function reportBorgBootstrapError(error, documentLike = globalThis.document, windowLike = globalThis.window) {
  const message = error instanceof Error ? error.message : String(error);
  if (windowLike) {
    windowLike.__ARCHITRINO_BORG_BOOT_ERROR__ = message;
  }
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(error);
  }
  const appElement = documentLike?.getElementById?.("borg-app");
  if (!appElement) {
    return;
  }
  const banner = documentLike.createElement("div");
  banner.id = "borg-boot-error";
  banner.textContent = `Borg failed to initialize: ${message}`;
  appElement.prepend(banner);
}

try {
  window.__BORG_APP__ = mountBorgApp();
} catch (error) {
  reportBorgBootstrapError(error);
}
