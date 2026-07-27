import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function read(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

test("Braid Search is a focused standalone app with configured local data", () => {
  const html = read("braid-search.html");
  const main = read("src/apps/compact-sweep-dashboard/main.js");
  const runtime = read(
    "src/apps/compact-sweep-dashboard/CompactSweepDashboardRuntime.js",
  );

  assert.match(
    html,
    /<title>architrino Braid Search<\/title>/u,
  );
  assert.match(html, /id="compact-sweep-dashboard-app"/u);
  assert.match(
    html,
    /src="\.\/src\/apps\/compact-sweep-dashboard\/main\.js"/u,
  );
  assert.match(html, /prefers-reduced-motion/u);
  assert.match(html, /aria-live="polite"/u);
  assert.match(
    html,
    /src\/apps\/navigator\/standalone-app-navigation\.css/u,
  );
  assert.match(main, /renderCompactSweepDashboardApp/u);
  assert.match(runtime, /createStandaloneAppSceneSearchRuntime/u);
  assert.match(runtime, /resolveStandaloneGlobalSceneHref/u);
  assert.match(runtime, /TEXTBOOK_TOC_SCENE_PATH/u);
  assert.match(runtime, /resolveStandaloneSiteHomeHref/u);
  for (const id of [
    "textbook-toc-button",
    "nav-up",
    "nav-forward",
    "home-button",
    "scene-search-toggle",
    "scene-search-panel",
    "scene-search-input",
    "scene-search-results",
  ]) {
    assert.match(runtime, new RegExp(`(?:id =|id:) "${id}"`, "u"));
  }
  assert.doesNotMatch(runtime, /compact-dashboard-action-link/u);
  assert.doesNotMatch(runtime, /STANDALONE_APP_HOME_HREF/u);
  assert.match(
    runtime,
    /\.\/\.local-data\/braid-analysis\/compact-monte-carlo\/family-sweep-v1\/compact-sweep-dashboard\.v1\.json/u,
  );
  assert.match(runtime, /role", "tablist"/u);
  assert.match(runtime, /Member-by-gate heatmap/u);
  assert.match(runtime, /Active candidates/u);
  assert.match(runtime, /Deprecated controls/u);
  assert.match(runtime, /candidateDisposition: "all"/u);
  assert.match(runtime, /Family \$\{range\.familyId\}/u);
  assert.match(
    runtime,
    /replaceChildren\(state\.viewContainer, renderBoundary\(data\)\)/u,
  );
  assert.match(runtime, /descriptionClassName: "compact-dashboard-nowrap"/u);
  assert.match(runtime, /\["cases", "Case detail"\]/u);
  assert.match(runtime, /function renderCaseDetail/u);
  assert.match(runtime, /function renderCases/u);
  assert.match(runtime, /caseResidualDetail\(row\)/u);
  assert.match(runtime, /Signed-cycle residual/u);
  assert.match(runtime, /Signed-emission threshold/u);
  assert.match(runtime, /tabindex: 0/u);
  assert.match(runtime, /circle\.addEventListener\("click", inspect\)/u);
  assert.match(runtime, /event\.key === "Enter" \|\| event\.key === " "/u);
  assert.match(runtime, /compact-dashboard-case-member/u);
  assert.match(runtime, /compact-dashboard-case-sample/u);
  assert.match(runtime, /Candidate, case, or hash/u);
  assert.match(runtime, /Selected campaign row/u);
  assert.match(runtime, /cancellation and agreement/u);
  assert.match(runtime, /not mean the candidate emits slowly/u);
  assert.match(
    read("src/apps/compact-sweep-dashboard/CompactSweepDashboardData.js"),
    /Lower is better for this compact diagnostic/u,
  );
  assert.equal(runtime.includes("Data identity"), false);
  assert.equal(runtime.includes("B1.4"), false);
  assert.equal(runtime.includes("Open JSON"), false);
  assert.equal(runtime.includes("No smoothed density"), false);
  assert.equal(runtime.includes("Why rows have null scores"), false);
  assert.equal(runtime.includes("node:sqlite"), false);
});

test("Braid Search is exposed through the public standalone launch inventory", () => {
  const launchRuntime = read(
    "src/apps/navigator/StandaloneAppLaunchRuntime.js",
  );
  const applications = read("content/scenes/archie/applications.json");
  assert.equal(launchRuntime.includes("braid-search.html"), true);
  assert.equal(applications.includes("braid_search"), true);
});
