import { mountBorgApp } from "./BorgAppRuntime.js";
import { createBorgEomHttpClient } from "./BorgEomHttpClient.js";
import { loadBorgFixtureTrajectoryFrames } from "./BorgFixtureTrajectory.js";

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

async function bootBorgApp() {
  const query = new URLSearchParams(window.location?.search ?? "");
  const eomShadowEnabled = query.get("eom") === "shadow";
  if (!eomShadowEnabled) {
    // The ordinary page seeds its live run from the manifest's frameIndex-0
    // rows, so it never waits on the recorded trajectory asset.
    return mountBorgApp({});
  }
  const eomStartTime = 300;
  const eomDuration = queryPositiveNumber(query.get("eomDuration"), 0.01);
  const eomPathCount = queryBoundedInteger(query.get("eomCount"), 16, 1, 16);
  // The shadow run replays the recorded trajectory as retained history, so
  // this is the one entry point that must wait for the asset.
  const fixtureTrajectoryFrames = await loadBorgFixtureTrajectoryFrames();
  return mountBorgApp({
    fixtureTrajectoryFrames,
    eomShadowRunner: {
      eomClient: createBorgEomHttpClient(),
      startTime: eomStartTime,
      targetDuration: eomStartTime + eomDuration,
      runDuration: eomDuration,
      pathCount: eomPathCount,
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
  });
}

try {
  window.__BORG_APP__ = await bootBorgApp();
} catch (error) {
  reportBorgBootstrapError(error);
}

function queryPositiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function queryBoundedInteger(value, fallback, minimum, maximum) {
  if (value == null || String(value).trim() === "") {
    return fallback;
  }
  const number = Number(value);
  return Number.isInteger(number)
    ? Math.min(maximum, Math.max(minimum, number))
    : fallback;
}
