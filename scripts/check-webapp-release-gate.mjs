#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_CONTRACT_PATH = "reference/priorities/aaa-operations/contracts/webapp-release-gate.v1.json";
const CONTRACT_SCHEMA = "architrino.webapp-release-gate.v1";
const EVIDENCE_SCHEMA = "architrino.webapp-release-gate-evidence.v1";

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolveRepoFile(rootDir, relativePath, label) {
  requireCondition(typeof relativePath === "string" && relativePath.length > 0, `${label} must be a non-empty path`);
  requireCondition(!path.isAbsolute(relativePath), `${label} must be repository-relative: ${relativePath}`);
  const normalized = path.posix.normalize(relativePath.replaceAll("\\", "/"));
  requireCondition(normalized !== ".." && !normalized.startsWith("../"), `${label} escapes the repository: ${relativePath}`);
  const absolute = path.resolve(rootDir, normalized);
  requireCondition(absolute.startsWith(`${rootDir}${path.sep}`), `${label} escapes the repository: ${relativePath}`);
  const stat = fs.lstatSync(absolute);
  requireCondition(stat.isFile() && !stat.isSymbolicLink(), `${label} must be a regular file: ${relativePath}`);
  requireCondition(fs.realpathSync(absolute).startsWith(`${fs.realpathSync(rootDir)}${path.sep}`), `${label} resolves outside the repository: ${relativePath}`);
  return { absolute, normalized, stat };
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function classifyReference(reference, sourcePath) {
  const value = String(reference ?? "").trim();
  if (!value || value.startsWith("#") || /^(?:data|mailto|tel|javascript):/iu.test(value)) return null;
  if (/^https?:\/\//iu.test(value)) return { remote: value };
  const pathname = value.split(/[?#]/u, 1)[0];
  const normalized = pathname.startsWith("/")
    ? path.posix.normalize(pathname.slice(1))
    : path.posix.normalize(path.posix.join(path.posix.dirname(sourcePath), pathname));
  requireCondition(normalized !== ".." && !normalized.startsWith("../"), `dependency escapes the repository: ${sourcePath} -> ${value}`);
  return { local: normalized };
}

function collectReferences(sourcePath, content) {
  const references = [];
  if (/\.html?$/iu.test(sourcePath)) {
    for (const match of content.matchAll(/<(?:script|img|source|audio|video|iframe)\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/giu)) references.push(match[1]);
    for (const match of content.matchAll(/<link\b[^>]*\bhref\s*=\s*["']([^"']+)["']/giu)) references.push(match[1]);
  }
  if (/\.(?:m?js)$/iu.test(sourcePath)) {
    for (const match of content.matchAll(/(?:import|export)\s+(?:[^"']*?\s+from\s+)?["']([^"']+)["']/gu)) references.push(match[1]);
    for (const match of content.matchAll(/import\s*\(\s*["']([^"']+)["']\s*\)/gu)) references.push(match[1]);
  }
  if (/\.css$/iu.test(sourcePath)) {
    for (const match of content.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gu)) references.push(match[1]);
  }
  return references;
}

export function discoverResourceClosure(rootDir, entrypoint) {
  rootDir = path.resolve(rootDir);
  const queue = [entrypoint];
  const local = new Set();
  const remote = new Set();
  while (queue.length) {
    const sourcePath = queue.shift();
    if (local.has(sourcePath)) continue;
    const source = resolveRepoFile(rootDir, sourcePath, "resource dependency");
    local.add(source.normalized);
    const content = fs.readFileSync(source.absolute, "utf8");
    for (const rawReference of collectReferences(source.normalized, content)) {
      const reference = classifyReference(rawReference, source.normalized);
      if (!reference) continue;
      if (reference.remote) remote.add(reference.remote);
      if (reference.local && !local.has(reference.local)) queue.push(reference.local);
    }
  }
  return {
    local: [...local].sort(),
    remote: [...remote].sort(),
  };
}

function assertSameStrings(actual, expected, label) {
  const left = [...actual].sort();
  const right = [...expected].sort();
  requireCondition(JSON.stringify(left) === JSON.stringify(right), `${label} mismatch\nactual: ${JSON.stringify(left)}\nexpected: ${JSON.stringify(right)}`);
}

function validateEvidence({ rootDir, contract, profile, evidence }) {
  requireCondition(evidence.schema === EVIDENCE_SCHEMA, `${profile.id}: invalid evidence schema`);
  requireCondition(evidence.profileId === profile.id, `${profile.id}: evidence profile mismatch`);
  requireCondition(evidence.status === "passed_pre_release", `${profile.id}: evidence is not a passing pre-release receipt`);
  requireCondition(evidence.productionMutation === false, `${profile.id}: release-gate evidence must not imply a production mutation`);

  const evidenceSources = new Map((evidence.sourceFiles ?? []).map((entry) => [entry.path, entry]));
  assertSameStrings(evidenceSources.keys(), profile.resourceClosure, `${profile.id}: evidence source closure`);
  for (const relativePath of profile.resourceClosure) {
    const source = resolveRepoFile(rootDir, relativePath, `${profile.id} source`);
    const recorded = evidenceSources.get(relativePath);
    requireCondition(recorded.bytes === source.stat.size, `${profile.id}: byte count changed for ${relativePath}`);
    requireCondition(recorded.sha256 === sha256File(source.absolute), `${profile.id}: SHA-256 changed for ${relativePath}`);
  }

  for (const category of contract.requiredCheckCategories) {
    requireCondition(evidence.checks?.[category]?.status === "passed", `${profile.id}: ${category} check is not passed`);
  }

  const viewportEvidence = new Map((evidence.checks.visual.viewports ?? []).map((entry) => [entry.id, entry]));
  assertSameStrings(viewportEvidence.keys(), profile.browser.viewports.map((entry) => entry.id), `${profile.id}: visual viewport ids`);
  for (const viewport of profile.browser.viewports) {
    const measured = viewportEvidence.get(viewport.id);
    requireCondition(measured.width === viewport.width && measured.height === viewport.height, `${profile.id}: ${viewport.id} viewport changed`);
    requireCondition(measured.overflowXCssPx === 0, `${profile.id}: ${viewport.id} has horizontal overflow`);
    requireCondition(measured.visuallyInspected === true, `${profile.id}: ${viewport.id} lacks visual inspection`);
  }

  const browser = evidence.checks.browser;
  requireCondition(browser.consoleMessageCount === 0, `${profile.id}: browser console is not clean`);
  requireCondition(browser.requiredInteractionsPassed === true, `${profile.id}: required browser interactions did not pass`);
  requireCondition(browser.expectedSchema === profile.browser.expectedSchema, `${profile.id}: browser schema mismatch`);
  requireCondition(browser.sanitizedPath === profile.browser.expectedSanitizedPath, `${profile.id}: browser path sanitization mismatch`);

  const accessibility = evidence.checks.accessibility;
  requireCondition(accessibility.unnamedControlCount <= profile.accessibility.maxUnnamedControls, `${profile.id}: unnamed control budget exceeded`);
  requireCondition(accessibility.duplicateIdCount <= profile.accessibility.maxDuplicateIds, `${profile.id}: duplicate id budget exceeded`);
  requireCondition(accessibility.minimumControlHeightCssPx >= profile.accessibility.minControlHeightCssPx, `${profile.id}: control height below accessibility floor`);
  requireCondition(accessibility.headingAndMainLandmarksPassed === true, `${profile.id}: heading or main landmark check failed`);

  const preview = evidence.checks.preview;
  requireCondition(preview.isolatedCleanCheckoutBuild === true && preview.buildStatus === "passed", `${profile.id}: isolated preview build did not pass`);
  requireCondition(preview.entrypointIncluded === true && preview.localRouteStatus === 200, `${profile.id}: preview route did not pass`);

}

export function checkWebappReleaseGate({ rootDir = ROOT, contractPath = DEFAULT_CONTRACT_PATH, contract: suppliedContract = null, evidenceByPath = null } = {}) {
  rootDir = path.resolve(rootDir);
  const contract = suppliedContract ?? readJson(resolveRepoFile(rootDir, contractPath, "release-gate contract").absolute);
  requireCondition(contract.schema === CONTRACT_SCHEMA, "invalid webapp release-gate schema");
  requireCondition(contract.status === "accepted", "webapp release-gate contract is not accepted");
  requireCondition(Array.isArray(contract.requiredCheckCategories) && contract.requiredCheckCategories.length === 7, "release gate must declare seven check categories");
  assertSameStrings(contract.requiredCheckCategories, ["content", "graph", "size", "visual", "browser", "accessibility", "preview"], "release-gate categories");
  requireCondition(Array.isArray(contract.profiles) && contract.profiles.length > 0, "release gate has no consumer profiles");

  const summaries = [];
  for (const profile of contract.profiles) {
    requireCondition(typeof profile.id === "string" && profile.id.length > 0, "release-gate profile id is required");
    requireCondition(typeof profile.entrypoint === "string", `${profile.id}: entrypoint is required`);
    requireCondition(Array.isArray(profile.resourceClosure) && profile.resourceClosure.length > 0, `${profile.id}: resource closure is required`);
    const discovered = discoverResourceClosure(rootDir, profile.entrypoint);
    assertSameStrings(discovered.local, profile.resourceClosure, `${profile.id}: local resource closure`);
    assertSameStrings(discovered.remote, profile.allowedRemoteLoadResources ?? [], `${profile.id}: remote load resource closure`);
    const sourceRecords = profile.resourceClosure.map((relativePath) => resolveRepoFile(rootDir, relativePath, `${profile.id} resource`));
    const bytes = sourceRecords.reduce((sum, entry) => sum + entry.stat.size, 0);
    requireCondition(bytes <= profile.size.maxUncompressedBytes, `${profile.id}: ${bytes} bytes exceed ${profile.size.maxUncompressedBytes}`);
    const evidencePath = profile.evidencePath;
    const evidence = evidenceByPath?.get(evidencePath) ?? readJson(resolveRepoFile(rootDir, evidencePath, `${profile.id} evidence`).absolute);
    validateEvidence({ rootDir, contract, profile, evidence });
    summaries.push({ id: profile.id, status: "passed_pre_release", route: profile.route, resourceFiles: sourceRecords.length, uncompressedBytes: bytes, evidencePath });
  }
  return { schema: CONTRACT_SCHEMA, status: "passed", profiles: summaries };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  requireCondition(args.length === 0 || (args.length === 2 && args[0] === "--contract"), "Usage: check-webapp-release-gate.mjs [--contract <path>]");
  console.log(JSON.stringify(checkWebappReleaseGate({ contractPath: args[1] ?? DEFAULT_CONTRACT_PATH }), null, 2));
}
