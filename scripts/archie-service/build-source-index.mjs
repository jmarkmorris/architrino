#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const failures = [];

if (args.length !== 1 || args[0] !== "--check") {
  fail("Usage: node scripts/archie-service/build-source-index.mjs --check");
}

const snapshot = readJson("tests/archie-service/fixtures/source-index/source-index-snapshot.v1.json");
const dryRun = readJson("tests/archie-service/fixtures/source-index/source-index-dry-run.v1.json");
const validationPlan = readJson("tests/archie-service/fixtures/validators/negative-validator-suite.v1.json");

if (snapshot.schema !== "archie-source-index-snapshot/v1") {
  failures.push("source-index snapshot fixture has unexpected schema");
}
if (dryRun.schema !== "archie-source-index-dry-run/v1") {
  failures.push("source-index dry-run fixture has unexpected schema");
}
if (validationPlan.checkModeBuilderContract?.scriptTarget !== "scripts/archie-service/build-source-index.mjs --check") {
  failures.push("negative validator suite does not target the source-index check-mode builder");
}
if (dryRun.snapshotId !== snapshot.snapshotId) {
  failures.push(`dry-run snapshotId ${dryRun.snapshotId} does not match snapshot ${snapshot.snapshotId}`);
}

for (const [key, artifactPath] of Object.entries(snapshot.generatedArtifactRefs ?? {})) {
  if (!exists(artifactPath)) {
    failures.push(`generated artifact ref ${key} does not exist: ${artifactPath}`);
  }
}

const scenesIndex = readJson("content/scenes/scenes_index.json");
const sceneEntries = Array.isArray(scenesIndex.scenes) ? scenesIndex.scenes : [];
const sceneById = new Map(sceneEntries.map((entry) => [entry.id, entry]));

for (const routeCase of dryRun.routeCases ?? []) {
  validateRouteCase(routeCase);
}

for (const placeholder of dryRun.validatorPlaceholders ?? []) {
  if (placeholder.status !== "fixture_backed") {
    failures.push(`${placeholder.validatorId}: expected fixture_backed status`);
  }
}

if (failures.length > 0) {
  console.error(`Archie source-index check failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Archie source-index check passed: ${dryRun.routeCases.length} route case(s), ${dryRun.validatorPlaceholders.length} validator placeholder(s)`
);

function validateRouteCase(routeCase) {
  const label = routeCase.caseId;

  if (routeCase.expectedSourceChip.route !== routeCase.requestedRoute) {
    failures.push(`${label}: source chip route must match requested route`);
  }
  if (routeCase.feedsManifestSourceContext !== true) {
    failures.push(`${label}: must feed manifest sourceContext`);
  }
  if (routeCase.noModelMemorySubstitution !== true) {
    failures.push(`${label}: must prohibit model-memory substitution`);
  }
  if (routeCase.privatePromptIncluded !== false) {
    failures.push(`${label}: must not include private prompt text`);
  }
  if (!exists(routeCase.expectedSourceContextFragment.systemCardRoute)) {
    failures.push(`${label}: System Card route missing: ${routeCase.expectedSourceContextFragment.systemCardRoute}`);
  }

  switch (routeCase.routeSurface) {
    case "markdown_section":
    case "app_guide":
    case "system_card":
      validateMarkdownRoute(routeCase);
      break;
    case "sphere_portion":
      validateSphereRoute(routeCase);
      break;
    case "full_document_sphere":
      validateFullDocumentSphere(routeCase);
      break;
    case "priority_packet":
      validatePriorityRoute(routeCase);
      break;
    case "missing_route":
      validateMissingRoute(routeCase);
      break;
    default:
      failures.push(`${label}: unknown route surface ${routeCase.routeSurface}`);
  }
}

function validateMarkdownRoute(routeCase) {
  const { filePath, anchor } = splitMarkdownRoute(routeCase.requestedRoute);
  if (!filePath || !anchor) {
    failures.push(`${routeCase.caseId}: expected markdown route with anchor`);
    return;
  }
  if (!exists(filePath)) {
    failures.push(`${routeCase.caseId}: markdown file missing: ${filePath}`);
    return;
  }
  if (!markdownAnchors(filePath).has(anchor)) {
    failures.push(`${routeCase.caseId}: markdown anchor missing: ${routeCase.requestedRoute}`);
  }
  if (routeCase.expectedSourceChip.sectionId !== anchor) {
    failures.push(`${routeCase.caseId}: sectionId must match markdown anchor`);
  }
  if (routeCase.expectedDisposition !== "resolved") {
    failures.push(`${routeCase.caseId}: markdown routes should resolve directly`);
  }
}

function validateSphereRoute(routeCase) {
  const match = /^scene:([^#]+)#section:(.+)$/.exec(routeCase.requestedRoute);
  if (!match) {
    failures.push(`${routeCase.caseId}: expected scene:<id>#section:<anchor> route`);
    return;
  }
  const [, sceneId, anchor] = match;
  const sceneEntry = sceneById.get(sceneId);
  if (!sceneEntry) {
    failures.push(`${routeCase.caseId}: scene id not found in scenes index: ${sceneId}`);
    return;
  }
  const scene = readJson(sceneEntry.path);
  const sourcePath = scene.scene?.source?.path;
  if (!sourcePath || !exists(sourcePath)) {
    failures.push(`${routeCase.caseId}: scene source markdown missing for ${sceneId}`);
    return;
  }
  if (!markdownAnchors(sourcePath).has(anchor)) {
    failures.push(`${routeCase.caseId}: scene source does not contain section anchor ${anchor}`);
  }
  if (routeCase.expectedSourceChip.authorityStatus !== "routing_only") {
    failures.push(`${routeCase.caseId}: sphere route must remain routing_only`);
  }
  if (!routeCase.expectedSourceContextFragment.sourceClasses.includes("published_corpus")) {
    failures.push(`${routeCase.caseId}: sphere route must include canonical published_corpus parent`);
  }
}

function validateFullDocumentSphere(routeCase) {
  const prefix = "document-sphere:";
  if (!routeCase.requestedRoute.startsWith(prefix)) {
    failures.push(`${routeCase.caseId}: expected document-sphere route`);
    return;
  }
  const sourcePath = routeCase.requestedRoute.slice(prefix.length);
  if (!exists(sourcePath)) {
    failures.push(`${routeCase.caseId}: full-document source missing: ${sourcePath}`);
  }
  if (routeCase.expectedSourceChip.sourceClass !== "generated_reading_copy") {
    failures.push(`${routeCase.caseId}: full-document sphere should route through generated_reading_copy`);
  }
  if (!routeCase.expectedSourceContextFragment.sourceClasses.includes("published_corpus")) {
    failures.push(`${routeCase.caseId}: full-document sphere must include canonical published_corpus parent`);
  }
}

function validatePriorityRoute(routeCase) {
  if (!exists(routeCase.requestedRoute)) {
    failures.push(`${routeCase.caseId}: priority route fixture points at missing file`);
  }
  if (routeCase.expectedDisposition !== "excluded_visibility") {
    failures.push(`${routeCase.caseId}: priority route should be excluded by default`);
  }
  if (!routeCase.expectedSourceContextFragment.excludedSourceClasses.includes("priority_material")) {
    failures.push(`${routeCase.caseId}: priority route must exclude priority_material`);
  }
}

function validateMissingRoute(routeCase) {
  if (exists(routeCase.requestedRoute)) {
    failures.push(`${routeCase.caseId}: missing-route fixture unexpectedly exists`);
  }
  if (!routeCase.expectedSourceContextFragment.missingSourceRoutes.includes(routeCase.requestedRoute)) {
    failures.push(`${routeCase.caseId}: missing route must be recorded in sourceContext`);
  }
  if (routeCase.expectedDisposition !== "missing_route") {
    failures.push(`${routeCase.caseId}: missing route must use missing_route disposition`);
  }
}

function splitMarkdownRoute(route) {
  const [filePath, anchor] = route.split("#");
  return { filePath, anchor };
}

function markdownAnchors(relativePath) {
  const text = fs.readFileSync(path.join(rootDir, relativePath), "utf8");
  const anchors = new Set();
  for (const line of text.split(/\r?\n/)) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!match) {
      continue;
    }
    anchors.add(slugifyHeading(match[2]));
  }
  return anchors;
}

function slugifyHeading(value) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\$([^$]+)\$/g, "$1")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function exists(relativePath) {
  return fs.existsSync(path.join(rootDir, relativePath));
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
