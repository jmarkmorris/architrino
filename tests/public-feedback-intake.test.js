import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  PUBLIC_FEEDBACK_MANIFEST_SCHEMA,
  PUBLIC_FEEDBACK_PRIVACY_OMISSIONS,
  buildPrivacySafeFeedbackManifest,
  classifyBrowser,
  classifyDevice,
  classifyDevicePixelRatio,
  classifyOperatingSystem,
  classifyViewport,
  sanitizePublicFeedbackPath,
  serializeFeedbackManifest,
} from "../src/apps/feedback/FeedbackManifestRuntime.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("feedback paths keep only same-origin pathnames", () => {
  const origin = "https://www.architrino.com";
  assert.equal(
    sanitizePublicFeedbackPath("/molecule.html?formula=private#result", origin),
    "/molecule.html"
  );
  assert.equal(
    sanitizePublicFeedbackPath("https://www.architrino.com/index.html?scene=private", origin),
    "/index.html"
  );
  assert.equal(sanitizePublicFeedbackPath("https://example.com/private", origin), null);
  assert.equal(sanitizePublicFeedbackPath("", origin), null);
});

test("browser and device classifications are coarse and reproducible", () => {
  const edgeUa =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0";
  assert.deepEqual(classifyBrowser(edgeUa), { family: "Edge", majorVersion: 140 });
  assert.equal(classifyOperatingSystem(edgeUa), "macOS");
  assert.equal(classifyDevice(430), "phone-sized");
  assert.equal(classifyDevice(900), "tablet-sized");
  assert.equal(classifyDevice(1440), "desktop-or-laptop-sized");
  assert.equal(classifyViewport(1440), "1024-to-1599-css-px");
  assert.equal(classifyDevicePixelRatio(2), "1.75-to-2.49");
});

test("generated feedback manifest uses only same-origin public indexes and omits raw identifiers", async () => {
  const fetchCalls = [];
  const payloadByPath = new Map([
    ["/content/scenes/scenes_index.json", { scenes: new Array(394).fill({}) }],
    ["/content/markdown/markdown_index.json", { files: new Array(199).fill({}) }],
    ["/content/graph/scene_graph.json", { nodes: new Array(611).fill({}), edges: new Array(1379).fill({}), searchEntries: new Array(593).fill({}) }],
  ]);
  const rawUserAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0 private-token";
  const manifest = await buildPrivacySafeFeedbackManifest({
    now: "2026-09-02T03:30:00.000Z",
    reportedPath: "/molecule.html?formula=private#result",
    referrer: "https://www.architrino.com/index.html?scene=private#node",
    windowLike: {
      location: {
        origin: "https://www.architrino.com",
        href: "https://www.architrino.com/feedback.html?secret=value#hidden",
      },
      innerWidth: 1440,
      devicePixelRatio: 2,
    },
    navigatorLike: { userAgent: rawUserAgent, language: "en-US" },
    fetchImpl: async (url, init) => {
      const parsed = new URL(url);
      fetchCalls.push({ url, init });
      return {
        ok: true,
        status: 200,
        headers: { get: (name) => (name === "last-modified" ? "Wed, 02 Sep 2026 03:20:00 GMT" : null) },
        json: async () => payloadByPath.get(parsed.pathname),
      };
    },
  });

  assert.equal(manifest.schema, PUBLIC_FEEDBACK_MANIFEST_SCHEMA);
  assert.equal(manifest.reportedPagePath, "/molecule.html");
  assert.equal(manifest.feedbackPagePath, "/feedback.html");
  assert.deepEqual(manifest.browser, { family: "Edge", majorVersion: 140 });
  assert.equal(manifest.operatingSystemFamily, "macOS");
  assert.equal(manifest.deviceClass, "desktop-or-laptop-sized");
  assert.equal(manifest.publicManifests[0].entries.scenes, 394);
  assert.equal(manifest.publicManifests[1].entries.files, 199);
  assert.deepEqual(manifest.publicManifests[2].entries, {
    nodes: 611,
    edges: 1379,
    searchEntries: 593,
  });
  assert.deepEqual(manifest.omittedByDesign, [...PUBLIC_FEEDBACK_PRIVACY_OMISSIONS]);
  assert.equal(fetchCalls.length, 3);
  for (const call of fetchCalls) {
    const url = new URL(call.url);
    assert.equal(url.origin, "https://www.architrino.com");
    assert.equal(url.search, "");
    assert.equal(url.hash, "");
    assert.deepEqual(call.init, { cache: "no-store", credentials: "same-origin" });
  }
  const serialized = serializeFeedbackManifest(manifest);
  assert.doesNotMatch(serialized, /private-token|formula=private|secret=value|#hidden/u);
  for (const forbiddenProperty of [
    "rawUserAgent",
    "queryString",
    "fragment",
    "cookies",
    "localStorage",
    "sessionStorage",
    "clipboardContents",
    "webglRenderer",
    "accountId",
  ]) {
    assert.equal(Object.hasOwn(manifest, forbiddenProperty), false);
  }
});

test("unavailable public manifests fail visibly without widening the request surface", async () => {
  const manifest = await buildPrivacySafeFeedbackManifest({
    now: "2026-09-02T03:30:00.000Z",
    origin: "https://www.architrino.com",
    windowLike: {
      location: { origin: "https://www.architrino.com", href: "https://www.architrino.com/feedback.html" },
      innerWidth: 0,
      devicePixelRatio: 0,
    },
    navigatorLike: {},
    fetchImpl: async () => ({ ok: false, status: 404 }),
  });
  assert.ok(manifest.publicManifests.every((entry) => entry.status === "http-404"));
  assert.equal(manifest.deviceClass, "unavailable");
});

test("feedback page and issue form preserve explicit public submission", () => {
  const html = fs.readFileSync(path.join(ROOT, "feedback.html"), "utf8");
  const issueForm = fs.readFileSync(
    path.join(ROOT, ".github/ISSUE_TEMPLATE/public-webapp-feedback.yml"),
    "utf8"
  );
  const policy = JSON.parse(
    fs.readFileSync(
      path.join(ROOT, "reference/priorities/aaa-operations/contracts/feedback-intake-policy.v1.json"),
      "utf8"
    )
  );

  assert.match(html, /Nothing is sent automatically/u);
  assert.match(html, /GitHub issues are public/u);
  assert.match(html, /id="feedback-manifest"[^>]*readonly/u);
  assert.match(html, /id="feedback-manifest"[^>]*aria-labelledby="feedback-manifest-title"/u);
  assert.match(html, /src="\.\/src\/apps\/feedback\/main\.js"/u);
  assert.doesNotMatch(html, /<(?:script|img|iframe)\b[^>]+\bsrc\s*=\s*["']https?:\/\//iu);
  assert.match(issueForm, /id: sanitized_manifest/u);
  assert.match(issueForm, /required: true/u);
  assert.match(issueForm, /I reviewed this report and removed private workflow/u);
  assert.equal(policy.status, "accepted");
  assert.equal(policy.channel.automaticSubmission, false);
  assert.equal(policy.channel.userReviewRequired, true);
  assert.equal(policy.manifest.schema, PUBLIC_FEEDBACK_MANIFEST_SCHEMA);
  assert.equal(policy.manifest.requiredForSubmission, false);
  assert.match(html, /<details class="feedback-card feedback-diagnostics">/u);
  assert.match(html, /Optional: include diagnostic details/u);
  const diagnosticField = issueForm.split("id: sanitized_manifest")[1].split("- type: checkboxes")[0];
  assert.match(diagnosticField, /required: false/u);
  assert.deepEqual(policy.manifest.omitted, [...PUBLIC_FEEDBACK_PRIVACY_OMISSIONS]);
});
