import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  PUBCHEM_EXPLICIT_FORM_SUBMIT,
  shouldQueryPubChem,
} from "../src/apps/molecule/MoleculeExternalLookupPolicy.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POLICY_PATH = path.join(
  ROOT,
  "reference/priorities/aaa-operations/observability-policy.v1.json"
);
const WEBSITE_STATS_DATA_PATH = path.join(ROOT, "content/analytics/website-stats.json");
const TEXT_EXTENSIONS = new Set([".html", ".js", ".mjs", ".swift"]);
const SKIPPED_DIRECTORIES = new Set([
  ".build",
  "GeneratedTextbookPackage",
  "ReaderAssets",
]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function collectFiles(directory, output = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!SKIPPED_DIRECTORIES.has(entry.name)) {
        collectFiles(filePath, output);
      }
    } else if (entry.isFile() && TEXT_EXTENSIONS.has(path.extname(entry.name))) {
      output.push(filePath);
    }
  }
  return output;
}

function authoredAppSources() {
  const files = [
    ...collectFiles(path.join(ROOT, "src/apps")),
    ...collectFiles(path.join(ROOT, "src/runtime")),
    ...collectFiles(path.join(ROOT, "apps")),
    ...fs
      .readdirSync(ROOT, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
      .map((entry) => path.join(ROOT, entry.name)),
  ];
  return [...new Set(files)].sort();
}

test("accepted observability contract keeps client analytics disabled", () => {
  const policy = readJson(POLICY_PATH);
  assert.equal(policy.status, "accepted");
  assert.equal(policy.analytics.mode, "disabled_no_collector");
  assert.deepEqual(policy.analytics.collectors, []);
  assert.equal(policy.analytics.rawEventRetentionDays, 0);
  assert.equal(policy.analytics.aggregateRetentionDays, 0);
  assert.equal(policy.analytics.crossSiteTracking, false);
  assert.equal(policy.analytics.deviceFingerprinting, false);
  assert.equal(policy.analytics.saleOrAdvertisingUse, false);
  assert.deepEqual(policy.websiteStatisticsUtility, {
    classification: "public_static_operations_utility",
    productApplicationCatalogue: false,
    publicSearchDiscovery: false,
    accessControl: "none",
    route: "website-stats.html",
  });
});

test("authored app sources contain no client collector or hidden-send primitives", () => {
  const forbidden = [
    ["sendBeacon", /\bnavigator\s*\.\s*sendBeacon\b/u],
    ["browser cookies", /\bdocument\s*\.\s*cookie\b/u],
    ["XMLHttpRequest", /\bnew\s+XMLHttpRequest\b/u],
    ["WebSocket", /\bnew\s+WebSocket\b/u],
    ["EventSource", /\bnew\s+EventSource\b/u],
    ["dynamic script injection", /createElement\(\s*["']script["']\s*\)/u],
    ["remote executable URL", /https?:\/\/[^\s"']+\.js(?:[?#][^\s"']*)?/iu],
    [
      "known analytics collector",
      /google-analytics\.com|googletagmanager\.com|plausible\.io|matomo\.|mixpanel\.com|posthog\.com|segment\.io|amplitude\.com|sentry\.io|datadoghq\.com|newrelic\.com|umami\.|usefathom\.com|hotjar\.com|fullstory\.com|clarity\.ms/iu,
    ],
  ];
  const failures = [];
  for (const filePath of authoredAppSources()) {
    const source = fs.readFileSync(filePath, "utf8");
    for (const [label, pattern] of forbidden) {
      if (pattern.test(source)) {
        failures.push(`${path.relative(ROOT, filePath)}: ${label}`);
      }
    }
  }
  assert.deepEqual(failures, []);
});

test("authored app HTML does not load remote executable or media resources", () => {
  const remoteResourcePattern = /<(?:script|img|iframe)\b[^>]+\b(?:src|href)\s*=\s*["']https?:\/\//iu;
  const remoteStylesheetPattern = /<link\b(?=[^>]*\brel\s*=\s*["']stylesheet["'])(?=[^>]*\bhref\s*=\s*["']https?:\/\/)[^>]*>/iu;
  const failures = authoredAppSources()
    .filter((filePath) => filePath.endsWith(".html"))
    .filter((filePath) => {
      const source = fs.readFileSync(filePath, "utf8");
      return remoteResourcePattern.test(source) || remoteStylesheetPattern.test(source);
    })
    .map((filePath) => path.relative(ROOT, filePath));
  assert.deepEqual(failures, []);
});

test("Website Statistics is an unconnected zero-data display", () => {
  const data = readJson(WEBSITE_STATS_DATA_PATH);
  assert.equal(data.mode, "unconnected");
  assert.match(data.sourceStatus, /No client analytics collector connected/u);
  assert.ok(Object.values(data.totals).every((value) => value === 0));
  for (const field of ["daily", "topPages", "referrers", "devices", "trafficChannels", "events"]) {
    assert.deepEqual(data[field], []);
  }
});

test("Website Statistics states its public operations and no-access-control boundary", () => {
  const runtimeSource = fs.readFileSync(
    path.join(ROOT, "src/apps/website-stats/WebsiteStatsRuntime.js"),
    "utf8"
  );
  assert.match(runtimeSource, /Public static operations utility\./u);
  assert.match(runtimeSource, /This route has no access control and is not a private dashboard\./u);
  assert.match(runtimeSource, /No client analytics collector is connected\./u);
  assert.match(runtimeSource, /content%2Fscenes%2Farchie%2Foperations\.json/u);
  assert.doesNotMatch(runtimeSource, /content%2Fscenes%2Farchie%2Fapplications\.json/u);
});

test("PubChem is activated only by the disclosed molecule-form submission", () => {
  assert.equal(shouldQueryPubChem(""), false);
  assert.equal(shouldQueryPubChem("shared-link-load"), false);
  assert.equal(shouldQueryPubChem(PUBCHEM_EXPLICIT_FORM_SUBMIT), true);

  const runtimeSource = fs.readFileSync(
    path.join(ROOT, "src/apps/molecule/MoleculeRuntime.js"),
    "utf8"
  );
  assert.equal(
    runtimeSource.match(/PUBCHEM_EXPLICIT_FORM_SUBMIT/gu)?.length,
    2,
    "the explicit activation token must remain limited to its import and form-submit call"
  );
  assert.match(
    fs.readFileSync(path.join(ROOT, "molecule.html"), "utf8"),
    /pressing Add sends only the formula to PubChem/u
  );
});
