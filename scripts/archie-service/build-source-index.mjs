#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  buildSourceIndexSnapshot,
  canonicalJson,
  validateSourceIndexSnapshot,
} from "../../src/archie-service/source-index/snapshot-v1.mjs";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const mode = args.length === 1 ? args[0] : null;
const failures = [];
const inputPath = "tests/archie-service/fixtures/source-index/source-index-build-input.v1.json";
const snapshotPath = "tests/archie-service/fixtures/source-index/source-index-snapshot.v1.json";
const negativeSuitePath = "tests/archie-service/fixtures/source-index/source-index-negative-suite.v1.json";

if (!["--check", "--write"].includes(mode)) {
  fail("Usage: node scripts/archie-service/build-source-index.mjs --check|--write");
}

const input = readJson(inputPath);
const dryRun = readJson("tests/archie-service/fixtures/source-index/source-index-dry-run.v1.json");
const negativeSuite = readJson(negativeSuitePath);
const validationPlan = readJson("tests/archie-service/fixtures/validators/negative-validator-suite.v1.json");
let builtSnapshot;

try {
  builtSnapshot = buildSourceIndexSnapshot({ rootDir, input });
} catch (error) {
  fail(`Archie source-index build failed: ${error.message}`);
}

if (mode === "--write") {
  fs.writeFileSync(path.join(rootDir, snapshotPath), `${JSON.stringify(builtSnapshot, null, 2)}\n`);
}

const snapshot = readJson(snapshotPath);
if (canonicalJson(snapshot) !== canonicalJson(builtSnapshot)) {
  failures.push(
    `source-index snapshot drift: run node scripts/archie-service/build-source-index.mjs --write`
  );
}

try {
  validateSourceIndexSnapshot({ rootDir, snapshot });
} catch (error) {
  failures.push(`source-index snapshot validation failed: ${error.message}`);
}

const rebuiltSnapshot = buildSourceIndexSnapshot({ rootDir, input: deepClone(input) });
if (rebuiltSnapshot.snapshotSha256 !== builtSnapshot.snapshotSha256) {
  failures.push("identical source-index inputs produced different snapshot hashes");
}

const reorderedInput = deepClone(input);
reorderedInput.sourceRecords.reverse();
reorderedInput.graphEdges.reverse();
reorderedInput.metadataRecords.reverse();
const reorderedSnapshot = buildSourceIndexSnapshot({ rootDir, input: reorderedInput });
if (reorderedSnapshot.snapshotSha256 !== builtSnapshot.snapshotSha256) {
  failures.push("source-index input ordering changed the canonical snapshot hash");
}

validateNegativeCases({ input, snapshot: builtSnapshot, negativeSuite });

if (dryRun.schema !== "archie-source-index-dry-run/v1") {
  failures.push("source-index dry-run fixture has unexpected schema");
}
if (
  validationPlan.checkModeBuilderContract?.scriptTarget !==
  "scripts/archie-service/build-source-index.mjs --check"
) {
  failures.push("negative validator suite does not target the source-index check-mode builder");
}
if (validationPlan.checkModeBuilderContract?.status !== "implemented") {
  failures.push("source-index builder contract must report implemented status");
}
if (dryRun.snapshotId !== snapshot.snapshotId) {
  failures.push(`dry-run snapshotId ${dryRun.snapshotId} does not match snapshot ${snapshot.snapshotId}`);
}

const scenesIndex = readJson("content/scenes/scenes_index.json");
const sceneEntries = Array.isArray(scenesIndex.scenes) ? scenesIndex.scenes : [];
const sceneById = new Map(sceneEntries.map((entry) => [entry.id, entry]));

for (const routeCase of dryRun.routeCases ?? []) {
  validateRouteCase(routeCase);
}

for (const placeholder of dryRun.validatorPlaceholders ?? []) {
  if (!["fixture_backed", "implemented"].includes(placeholder.status)) {
    failures.push(`${placeholder.validatorId}: expected fixture_backed or implemented status`);
  }
}

if (failures.length > 0) {
  console.error(`Archie source-index check failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

const action = mode === "--write" ? "write passed" : "check passed";
console.log(
  `Archie source-index ${action}: ${snapshot.snapshotId}, ${snapshot.views.search.records.length} source record(s), ${snapshot.views.graph.edges.length} graph edge(s), ${snapshot.views.metadata.records.length} metadata record(s), ${negativeSuite.cases.length} fail-closed case(s), sha256 ${snapshot.snapshotSha256}`
);

function validateNegativeCases({ input: baseInput, snapshot: baseSnapshot, negativeSuite: suite }) {
  if (suite.schema !== "archie-source-index-negative-suite/v1") {
    failures.push("source-index negative suite has unexpected schema");
    return;
  }
  const caseIds = new Set();
  for (const testCase of suite.cases ?? []) {
    if (caseIds.has(testCase.caseId)) {
      failures.push(`duplicate source-index negative case ${testCase.caseId}`);
      continue;
    }
    caseIds.add(testCase.caseId);
    const subject = deepClone(testCase.target === "input" ? baseInput : baseSnapshot);
    applyMutation(subject, testCase.mutation);
    try {
      if (testCase.target === "input") {
        buildSourceIndexSnapshot({ rootDir, input: subject });
      } else if (testCase.target === "snapshot") {
        validateSourceIndexSnapshot({ rootDir, snapshot: subject });
      } else {
        throw new Error(`unknown negative target ${testCase.target}`);
      }
      failures.push(`${testCase.caseId}: invalid subject was accepted`);
    } catch (error) {
      if (!error.message.includes(testCase.expectedError)) {
        failures.push(
          `${testCase.caseId}: expected error containing ${JSON.stringify(testCase.expectedError)}, received ${JSON.stringify(error.message)}`
        );
      }
    }
  }
}

function applyMutation(subject, mutation) {
  if (mutation.operation !== "set") {
    throw new Error(`unsupported mutation operation ${mutation.operation}`);
  }
  let target = subject;
  const pathParts = mutation.path;
  for (const part of pathParts.slice(0, -1)) {
    if (target?.[part] === undefined) {
      throw new Error(`mutation path is missing at ${String(part)}`);
    }
    target = target[part];
  }
  target[pathParts.at(-1)] = mutation.value;
}

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
    if (match) anchors.add(slugifyHeading(match[2]));
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

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
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
