import { renderWebsiteStatsApp } from "./WebsiteStatsRuntime.js";

renderWebsiteStatsApp({
  root: document.getElementById("website-stats-app"),
  dataPath: "./content/analytics/website-stats.json",
});
