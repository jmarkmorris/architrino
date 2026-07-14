import { mountBorgApp } from "./BorgAppRuntime.js";
import { createBorgEomHttpClient } from "./BorgEomHttpClient.js";

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
  const query = new URLSearchParams(window.location?.search ?? "");
  const eomShadowEnabled = query.get("eom") === "shadow";
  window.__BORG_APP__ = mountBorgApp(
    eomShadowEnabled
      ? {
          eomShadowRunner: {
            eomClient: createBorgEomHttpClient(),
            startTime: 300,
            targetDuration: 300.01,
            chunkDuration: 0.01,
            sampleInterval: 0.01,
            initialStep: "0.01",
            minimumStep: "0.01",
            rootTolerance: "1e-3",
            accelerationTolerance: "1e-1",
            positionTolerance: "1e-2",
            velocityTolerance: "1e-2",
            correctionTolerance: "1e-1",
            threadCount: 4,
          },
        }
      : {},
  );
} catch (error) {
  reportBorgBootstrapError(error);
}
