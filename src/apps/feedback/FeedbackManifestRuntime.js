export const PUBLIC_FEEDBACK_MANIFEST_SCHEMA = "architrino.public-feedback-manifest.v1";
export const PUBLIC_FEEDBACK_ISSUE_URL =
  "https://github.com/jmarkmorris/architrino/issues/new?template=public-webapp-feedback.yml";

const PUBLIC_MANIFESTS = Object.freeze([
  Object.freeze({
    id: "scene-index",
    path: "content/scenes/scenes_index.json",
    countField: "scenes",
  }),
  Object.freeze({
    id: "markdown-index",
    path: "content/markdown/markdown_index.json",
    countField: "files",
  }),
  Object.freeze({
    id: "scene-graph",
    path: "content/graph/scene_graph.json",
    countFields: Object.freeze(["nodes", "edges", "searchEntries"]),
  }),
]);

export const PUBLIC_FEEDBACK_PRIVACY_OMISSIONS = Object.freeze([
  "raw user-agent string",
  "URL query string",
  "URL fragment",
  "cookies",
  "local storage",
  "session storage",
  "clipboard contents",
  "local file names or contents",
  "WebGL renderer",
  "account identifiers",
]);

function normalizeOrigin(value) {
  try {
    return new URL(String(value ?? "")).origin;
  } catch {
    return "http://localhost";
  }
}

export function sanitizePublicFeedbackPath(value, origin = "http://localhost") {
  const normalizedOrigin = normalizeOrigin(origin);
  const candidate = String(value ?? "").trim();
  if (!candidate) {
    return null;
  }
  try {
    const parsed = new URL(candidate, `${normalizedOrigin}/`);
    if (parsed.origin !== normalizedOrigin) {
      return null;
    }
    const pathname = parsed.pathname.replace(/\/{2,}/gu, "/");
    return pathname.startsWith("/") ? pathname.slice(0, 240) : null;
  } catch {
    return null;
  }
}

export function classifyBrowser(userAgent = "") {
  const source = String(userAgent ?? "");
  const candidates = [
    ["Edge", /\bEdgA?\/(\d+)/u],
    ["Firefox", /\b(?:Firefox|FxiOS)\/(\d+)/u],
    ["Chrome", /\b(?:Chrome|CriOS)\/(\d+)/u],
    ["Safari", /\bVersion\/(\d+).*\bSafari\//u],
  ];
  for (const [family, pattern] of candidates) {
    const match = source.match(pattern);
    if (match) {
      return Object.freeze({ family, majorVersion: Number(match[1]) });
    }
  }
  return Object.freeze({ family: "Other", majorVersion: null });
}

export function classifyOperatingSystem(userAgent = "") {
  const source = String(userAgent ?? "");
  if (/\b(?:iPhone|iPad|iPod)\b/u.test(source)) return "iOS or iPadOS";
  if (/\bAndroid\b/u.test(source)) return "Android";
  if (/\bWindows NT\b/u.test(source)) return "Windows";
  if (/\bMacintosh\b|\bMac OS X\b/u.test(source)) return "macOS";
  if (/\bLinux\b/u.test(source)) return "Linux";
  return "Other";
}

export function classifyViewport(width) {
  const value = Number(width);
  if (!Number.isFinite(value) || value <= 0) return "unavailable";
  if (value < 600) return "under-600-css-px";
  if (value < 1024) return "600-to-1023-css-px";
  if (value < 1600) return "1024-to-1599-css-px";
  return "1600-css-px-or-more";
}

export function classifyDevice(width) {
  const viewport = classifyViewport(width);
  if (viewport === "under-600-css-px") return "phone-sized";
  if (viewport === "600-to-1023-css-px") return "tablet-sized";
  if (viewport === "unavailable") return "unavailable";
  return "desktop-or-laptop-sized";
}

export function classifyDevicePixelRatio(value) {
  const ratio = Number(value);
  if (!Number.isFinite(ratio) || ratio <= 0) return "unavailable";
  if (ratio < 1.25) return "under-1.25";
  if (ratio < 1.75) return "1.25-to-1.74";
  if (ratio < 2.5) return "1.75-to-2.49";
  return "2.5-or-more";
}

function summarizeManifest(payload, spec) {
  if (spec.countField) {
    return { [spec.countField]: Array.isArray(payload?.[spec.countField]) ? payload[spec.countField].length : null };
  }
  return Object.fromEntries(
    spec.countFields.map((field) => [field, Array.isArray(payload?.[field]) ? payload[field].length : null])
  );
}

async function inspectPublicManifest(spec, { fetchImpl, origin }) {
  const url = new URL(spec.path, `${origin}/`);
  try {
    const response = await fetchImpl(url.href, {
      cache: "no-store",
      credentials: "same-origin",
    });
    if (!response?.ok) {
      return Object.freeze({ id: spec.id, path: `/${spec.path}`, status: `http-${response?.status ?? "error"}` });
    }
    const payload = await response.json();
    const lastModified = response.headers?.get?.("last-modified") ?? null;
    return Object.freeze({
      id: spec.id,
      path: `/${spec.path}`,
      status: "available",
      lastModifiedUtc: lastModified,
      entries: summarizeManifest(payload, spec),
    });
  } catch {
    return Object.freeze({ id: spec.id, path: `/${spec.path}`, status: "unavailable" });
  }
}

export async function buildPrivacySafeFeedbackManifest(options = {}) {
  const windowLike = options.windowLike ?? globalThis.window ?? {};
  const navigatorLike = options.navigatorLike ?? windowLike.navigator ?? {};
  const fetchImpl = options.fetchImpl ?? windowLike.fetch?.bind(windowLike);
  const origin = normalizeOrigin(options.origin ?? windowLike.location?.origin ?? "http://localhost");
  const reportedPath = sanitizePublicFeedbackPath(options.reportedPath, origin);
  const currentPath = sanitizePublicFeedbackPath(windowLike.location?.href, origin);
  const referrerPath = sanitizePublicFeedbackPath(options.referrer, origin);
  const browser = classifyBrowser(navigatorLike.userAgent);
  const manifests = typeof fetchImpl === "function"
    ? await Promise.all(PUBLIC_MANIFESTS.map((spec) => inspectPublicManifest(spec, { fetchImpl, origin })))
    : PUBLIC_MANIFESTS.map((spec) => Object.freeze({ id: spec.id, path: `/${spec.path}`, status: "unavailable" }));

  return Object.freeze({
    schema: PUBLIC_FEEDBACK_MANIFEST_SCHEMA,
    generatedAtUtc: new Date(options.now ?? Date.now()).toISOString(),
    reportedPagePath: reportedPath ?? referrerPath ?? null,
    feedbackPagePath: currentPath,
    browser,
    operatingSystemFamily: classifyOperatingSystem(navigatorLike.userAgent),
    deviceClass: classifyDevice(windowLike.innerWidth),
    viewportWidthBucket: classifyViewport(windowLike.innerWidth),
    devicePixelRatioBucket: classifyDevicePixelRatio(windowLike.devicePixelRatio),
    language: String(navigatorLike.language ?? "").slice(0, 24) || null,
    publicManifests: manifests,
    omittedByDesign: [...PUBLIC_FEEDBACK_PRIVACY_OMISSIONS],
  });
}

export function serializeFeedbackManifest(manifest) {
  return JSON.stringify(manifest, null, 2);
}

export function renderPublicFeedbackApp(options = {}) {
  const documentLike = options.documentLike ?? globalThis.document;
  const windowLike = options.windowLike ?? globalThis.window;
  const pathInput = documentLike.getElementById("feedback-page-path");
  const manifestOutput = documentLike.getElementById("feedback-manifest");
  const status = documentLike.getElementById("feedback-status");
  const refreshButton = documentLike.getElementById("feedback-refresh");
  const copyButton = documentLike.getElementById("feedback-copy");
  const issueLink = documentLike.getElementById("feedback-open-issue");

  issueLink.href = PUBLIC_FEEDBACK_ISSUE_URL;
  const origin = normalizeOrigin(windowLike.location?.origin);
  const queryPath = new URL(windowLike.location.href).searchParams.get("page");
  const referrerPath = sanitizePublicFeedbackPath(documentLike.referrer, origin);
  pathInput.value = sanitizePublicFeedbackPath(queryPath, origin) ?? referrerPath ?? "";

  let currentManifest = null;
  async function refresh() {
    status.textContent = "Building a local, sanitized manifest…";
    refreshButton.disabled = true;
    currentManifest = await buildPrivacySafeFeedbackManifest({
      windowLike,
      navigatorLike: windowLike.navigator,
      fetchImpl: windowLike.fetch?.bind(windowLike),
      reportedPath: pathInput.value,
      referrer: documentLike.referrer,
    });
    manifestOutput.value = serializeFeedbackManifest(currentManifest);
    refreshButton.disabled = false;
    status.textContent = "Manifest ready. Review it before copying or opening a public issue.";
    return currentManifest;
  }

  refreshButton.addEventListener("click", refresh);
  pathInput.addEventListener("change", refresh);
  copyButton.addEventListener("click", async () => {
    if (!currentManifest) await refresh();
    if (typeof windowLike.navigator?.clipboard?.writeText !== "function") {
      manifestOutput.focus();
      manifestOutput.select();
      status.textContent = "Clipboard writing is unavailable. The manifest is selected for manual copy.";
      return;
    }
    await windowLike.navigator.clipboard.writeText(manifestOutput.value);
    status.textContent = "Sanitized manifest copied. Paste it into the required issue field.";
  });

  refresh();
  return Object.freeze({ refresh, getManifest: () => currentManifest });
}
