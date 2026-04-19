import {
  PDGVIEW_APP_MODE,
  PDGVIEW_SCENE_PATH,
} from "./PdgviewAppModeRuntime.js";

if (typeof window !== "undefined") {
  window.__ARCHITRINO_APP_MODE__ = PDGVIEW_APP_MODE;
  if (!window.location.hash) {
    window.location.hash = `#scene=${encodeURIComponent(PDGVIEW_SCENE_PATH)}`;
  }
}

await import("../architrino/ArchitrinoSceneAppRuntime.js");
