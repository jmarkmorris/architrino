import {
  COMPOSER_APP_MODE,
  COMPOSER_SCENE_PATH,
} from "./ComposerAppModeRuntime.js";

if (typeof window !== "undefined") {
  window.__ARCHITRINO_APP_MODE__ = COMPOSER_APP_MODE;
  if (!window.location.hash) {
    window.location.hash = `#scene=${encodeURIComponent(COMPOSER_SCENE_PATH)}`;
  }
}

await import("../../../app.js");
