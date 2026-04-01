const composerScenePath = "content/scenes/archie/composer.json";

if (typeof window !== "undefined") {
  window.__ARCHITRINO_APP_MODE__ = "composer";
  if (!window.location.hash) {
    window.location.hash = `#scene=${encodeURIComponent(composerScenePath)}`;
  }
}

await import("../../../app.js");
