#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_CONTRACT_PATH = "reference/priorities/aaa-operations/contracts/browser-performance-budget.v1.json";
const CONTRACT_SCHEMA = "architrino.browser-performance-budget.v1";
const EVIDENCE_SCHEMA = "architrino.browser-performance-evidence.v1";

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function repoFile(rootDir, relativePath, label) {
  requireCondition(typeof relativePath === "string" && relativePath.length > 0, `${label} must be a non-empty path`);
  requireCondition(!path.isAbsolute(relativePath), `${label} must be repository-relative: ${relativePath}`);
  const normalized = path.posix.normalize(relativePath.replaceAll("\\", "/").replace(/^\//u, ""));
  requireCondition(normalized !== ".." && !normalized.startsWith("../"), `${label} escapes the repository: ${relativePath}`);
  const absolute = path.resolve(rootDir, normalized);
  requireCondition(absolute.startsWith(`${rootDir}${path.sep}`), `${label} escapes the repository: ${relativePath}`);
  const stat = fs.lstatSync(absolute);
  requireCondition(stat.isFile() && !stat.isSymbolicLink(), `${label} must be a regular file: ${relativePath}`);
  return { absolute, normalized, stat };
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

export function fingerprintSourceClosure(rootDir, sourcePaths) {
  rootDir = path.resolve(rootDir);
  const unique = [...new Set(sourcePaths)].sort();
  requireCondition(unique.length === sourcePaths.length, "source closure contains duplicate paths");
  const records = unique.map((relativePath) => {
    const source = repoFile(rootDir, relativePath, "source closure path");
    return {
      path: source.normalized,
      bytes: source.stat.size,
      sha256: sha256File(source.absolute),
    };
  });
  const fingerprint = crypto.createHash("sha256");
  for (const record of records) {
    fingerprint.update(`${record.path}\0${record.bytes}\0${record.sha256}\n`);
  }
  return {
    files: records.length,
    bytes: records.reduce((sum, record) => sum + record.bytes, 0),
    sha256: fingerprint.digest("hex"),
    records,
  };
}

function requireMaximum(value, maximum, label) {
  requireCondition(Number.isFinite(value), `${label} is not finite`);
  requireCondition(value <= maximum, `${label} ${value} exceeds ${maximum}`);
}

function requireMinimum(value, minimum, label) {
  requireCondition(Number.isFinite(value), `${label} is not finite`);
  requireCondition(value >= minimum, `${label} ${value} is below ${minimum}`);
}

function validateSourceIdentity(rootDir, evidence, profile) {
  const identity = evidence.sourceClosures?.[profile.id];
  requireCondition(identity != null, `${profile.id}: source closure is missing`);
  requireCondition(Array.isArray(identity.paths) && identity.paths.length > 0, `${profile.id}: source paths are missing`);
  requireCondition(identity.paths[0] === profile.entrypoint, `${profile.id}: source closure must begin with its entrypoint`);
  const current = fingerprintSourceClosure(rootDir, identity.paths);
  requireCondition(current.files === identity.files, `${profile.id}: source file count changed`);
  requireCondition(current.bytes === identity.bytes, `${profile.id}: source byte count changed`);
  requireCondition(current.sha256 === identity.sha256, `${profile.id}: source fingerprint changed`);
}

function validateProfile(rootDir, contract, evidence, profile) {
  const measured = evidence.profiles?.[profile.id];
  requireCondition(measured?.status === "passed", `${profile.id}: passing evidence is missing`);
  requireCondition(measured.route === profile.route, `${profile.id}: route changed`);
  requireCondition(measured.viewport.cssWidth === profile.viewport.cssWidth, `${profile.id}: viewport width changed`);
  requireCondition(measured.viewport.cssHeight === profile.viewport.cssHeight, `${profile.id}: viewport height changed`);
  requireCondition(measured.viewport.devicePixelRatio === profile.viewport.devicePixelRatio, `${profile.id}: device-pixel ratio changed`);
  requireCondition(measured.launch.cold.originWasFresh === true, `${profile.id}: cold profile lacks a fresh origin`);
  requireCondition(measured.launch.warm.sameOriginReload === true, `${profile.id}: warm profile is not a same-origin reload`);

  requireMaximum(measured.launch.cold.loadEventEndMs, profile.budgets.coldLoadEventEndMs, `${profile.id}: cold load`);
  requireMaximum(measured.launch.warm.loadEventEndMs, profile.budgets.warmLoadEventEndMs, `${profile.id}: warm load`);
  requireMaximum(measured.launch.cold.transferBytes, profile.budgets.coldTransferBytes, `${profile.id}: cold transfer`);
  requireMaximum(measured.launch.warm.transferBytes, profile.budgets.warmTransferBytes, `${profile.id}: warm transfer`);
  requireMaximum(measured.launch.cold.resourceCount, profile.budgets.resourceCount, `${profile.id}: cold resource count`);
  requireMaximum(measured.launch.warm.resourceCount, profile.budgets.resourceCount, `${profile.id}: warm resource count`);

  requireMinimum(measured.frameTiming.samples, profile.budgets.frameSamples, `${profile.id}: frame samples`);
  requireMaximum(measured.frameTiming.p95Ms, profile.budgets.frameP95Ms, `${profile.id}: frame p95`);
  requireMinimum(measured.frameTiming.medianFps, profile.budgets.medianFps, `${profile.id}: median FPS`);
  requireMaximum(measured.frameTiming.intervalsOver33_34Ms, profile.budgets.intervalsOver33_34Ms, `${profile.id}: slow-frame count`);

  requireCondition(measured.heap.supported === true, `${profile.id}: browser heap measurement is unavailable`);
  requireMaximum(measured.heap.warmAfterFramesUsedBytes, profile.budgets.heapUsedBytes, `${profile.id}: used heap`);
  requireMaximum(measured.heap.frameWindowGrowthBytes, profile.budgets.heapGrowthBytes, `${profile.id}: heap growth`);
  requireCondition(measured.storage.supported === true, `${profile.id}: storage estimate is unavailable`);
  requireMaximum(measured.storage.originUsageBytes, profile.budgets.originStorageBytes, `${profile.id}: origin storage`);

  if (profile.interactionId) {
    requireCondition(measured.interaction?.id === profile.interactionId && measured.interaction.status === "passed", `${profile.id}: interaction did not pass`);
    requireMaximum(measured.interaction.nextPaintMs, profile.budgets.interactionNextPaintMs, `${profile.id}: interaction next paint`);
  }
  if (profile.budgets.gpuMinimumSurfaceBytes != null) {
    requireCondition(measured.gpuSurfaceProxy?.method === contract.gpu.surfaceProxyMethod, `${profile.id}: GPU surface method changed`);
    requireMaximum(measured.gpuSurfaceProxy.minimumSurfaceBytes, profile.budgets.gpuMinimumSurfaceBytes, `${profile.id}: GPU surface lower bound`);
  }
  validateSourceIdentity(rootDir, evidence, profile);
  return {
    id: profile.id,
    route: profile.route,
    coldTransferBytes: measured.launch.cold.transferBytes,
    warmTransferBytes: measured.launch.warm.transferBytes,
    medianFps: measured.frameTiming.medianFps,
    heapUsedBytes: measured.heap.warmAfterFramesUsedBytes,
    originStorageBytes: measured.storage.originUsageBytes,
  };
}

function validateInstrument(rootDir, contract, evidence) {
  const paths = contract.instrument.sourceFiles;
  const recorded = new Map((evidence.instrumentSources ?? []).map((entry) => [entry.path, entry]));
  requireCondition(recorded.size === paths.length, "performance instrument source count changed");
  for (const relativePath of paths) {
    const source = repoFile(rootDir, relativePath, "performance instrument source");
    const expected = recorded.get(source.normalized);
    requireCondition(expected != null, `performance instrument identity missing for ${relativePath}`);
    requireCondition(expected.bytes === source.stat.size, `performance instrument byte count changed for ${relativePath}`);
    requireCondition(expected.sha256 === sha256File(source.absolute), `performance instrument SHA-256 changed for ${relativePath}`);
  }
}

function validateGpuProcess(contract, evidence) {
  const measured = evidence.gpuProcess;
  requireCondition(measured.method === contract.gpu.processMethod, "GPU process measurement method changed");
  requireCondition(measured.sharedProcessBoundaryAcknowledged === true, "GPU process shared-boundary acknowledgement is missing");
  requireMinimum(measured.samples, contract.gpu.minimumSamples, "GPU process samples");
  requireMaximum(measured.peakResidentBytes, contract.gpu.maximumPeakResidentBytes, "GPU process peak RSS");
  requireMaximum(measured.peakGrowthBytes, contract.gpu.maximumPeakGrowthBytes, "GPU process RSS growth");
}

export function checkBrowserPerformanceBudget({ rootDir = ROOT, contractPath = DEFAULT_CONTRACT_PATH, contract: suppliedContract = null, evidence: suppliedEvidence = null } = {}) {
  rootDir = path.resolve(rootDir);
  const contract = suppliedContract ?? readJson(repoFile(rootDir, contractPath, "browser performance contract").absolute);
  requireCondition(contract.schema === CONTRACT_SCHEMA, "invalid browser performance contract schema");
  requireCondition(contract.status === "accepted", "browser performance contract is not accepted");
  requireCondition(Array.isArray(contract.profiles) && contract.profiles.length >= 2, "browser performance contract requires representative profiles");
  const evidencePath = contract.evidencePath;
  const evidence = suppliedEvidence ?? readJson(repoFile(rootDir, evidencePath, "browser performance evidence").absolute);
  requireCondition(evidence.schema === EVIDENCE_SCHEMA, "invalid browser performance evidence schema");
  requireCondition(evidence.status === "passed_pre_release", "browser performance evidence is not passing");
  requireCondition(evidence.productionMutation === false, "browser performance evidence must not imply production mutation");
  validateInstrument(rootDir, contract, evidence);
  validateGpuProcess(contract, evidence);
  const profiles = contract.profiles.map((profile) => validateProfile(rootDir, contract, evidence, profile));
  return { schema: CONTRACT_SCHEMA, status: "passed", evidencePath, profiles };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  requireCondition(args.length === 0 || (args.length === 2 && args[0] === "--contract"), "Usage: check-browser-performance-budget.mjs [--contract <path>]");
  console.log(JSON.stringify(checkBrowserPerformanceBudget({ contractPath: args[1] ?? DEFAULT_CONTRACT_PATH }), null, 2));
}
