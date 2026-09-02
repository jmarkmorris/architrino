import {
  renderCompactSweepDashboardApp,
} from "./CompactSweepDashboardRuntime.js";

function reportBootstrapError(error) {
  const message = error instanceof Error ? error.message : String(error);
  globalThis.__ARCHITRINO_COMPACT_SWEEP_DASHBOARD_BOOT_ERROR__ = message;
  console.error(error);
  const root = document.getElementById("compact-sweep-dashboard-app");
  if (!root) return;
  const banner = document.createElement("section");
  banner.className = "compact-dashboard-error";
  const title = document.createElement("h1");
  title.textContent = "Braid Search failed to initialize";
  const detail = document.createElement("p");
  detail.textContent = message;
  banner.append(title, detail);
  root.replaceChildren(banner);
}

renderCompactSweepDashboardApp()
  .then((runtime) => {
    globalThis.__ARCHITRINO_COMPACT_SWEEP_DASHBOARD_RUNTIME__ = runtime;
  })
  .catch(reportBootstrapError);
