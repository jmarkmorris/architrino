import {
  ANIMATOR_APP_MODE,
  ANIMATOR_SCENE_PATH,
} from "./AnimatorAppModeRuntime.js";

if (typeof window !== "undefined") {
  window.__ARCHITRINO_APP_MODE__ = ANIMATOR_APP_MODE;
  if (!window.location.hash) {
    window.location.hash = `#scene=${encodeURIComponent(ANIMATOR_SCENE_PATH)}`;
  }
}

await import("../architrino/ArchitrinoSceneAppRuntime.js");
