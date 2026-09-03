#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { FULL_CORPUS_SNAPSHOT_PATH } from "../../src/archie-service/source-index/full-corpus-v1.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const SECURE_TUNNEL_CONTRACT_PATH = "scripts/config/archie-mcp-secure-tunnel-deployment.v1.json";
export const SECURE_TUNNEL_SCHEMA = "archie-mcp-secure-tunnel-deployment/v1";
const EXPECTED_TOOLS = ["search", "read", "topics", "neighbors", "walk"];
const STATE_ROOT = ".local-data/archie-mcp-tunnel";

export function readSecureTunnelContract(rootDir = ROOT) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, SECURE_TUNNEL_CONTRACT_PATH), "utf8"));
}

export function validateSecureTunnelContract(contract) {
  const failures = [];
  requireEqual(failures, contract.schema, SECURE_TUNNEL_SCHEMA, "schema");
  requireEqual(failures, contract.deploymentClass, "private_outbound_only", "deploymentClass");
  requireEqual(failures, contract.publicRemoteContractAdvanced, false, "publicRemoteContractAdvanced");
  requireEqual(failures, contract.provider, "openai_secure_mcp_tunnel", "provider");
  requireEqual(failures, contract.officialGuide, "https://developers.openai.com/api/docs/guides/secure-mcp-tunnels", "officialGuide");
  requireEqual(failures, contract.latestReleaseUrl, "https://github.com/openai/tunnel-client/releases/latest", "latestReleaseUrl");
  requireEqual(failures, contract.latestReleaseApi, "https://api.github.com/repos/openai/tunnel-client/releases/latest", "latestReleaseApi");
  requireEqual(failures, contract.controlPlane?.baseUrl, "https://api.openai.com", "controlPlane.baseUrl");
  requireEqual(failures, contract.controlPlane?.runtimeApiKeyEnvironmentVariable, "CONTROL_PLANE_API_KEY", "controlPlane.runtimeApiKeyEnvironmentVariable");
  requireEqual(failures, contract.controlPlane?.runtimeApiKeyReference, "env:CONTROL_PLANE_API_KEY", "controlPlane.runtimeApiKeyReference");
  requireEqual(failures, contract.runtime?.commands?.initialize, "init", "runtime.commands.initialize");
  requireEqual(failures, contract.runtime?.commands?.diagnose, "doctor", "runtime.commands.diagnose");
  requireEqual(failures, contract.runtime?.commands?.serve, "run", "runtime.commands.serve");
  requireEqual(failures, contract.runtime?.transport, "stdio", "runtime.transport");
  requireEqual(failures, contract.runtime?.healthListenAddress, "127.0.0.1:0", "runtime.healthListenAddress");
  requireEqual(failures, contract.runtime?.healthPath, "/healthz", "runtime.healthPath");
  requireEqual(failures, contract.runtime?.readinessPath, "/readyz", "runtime.readinessPath");
  requireEqual(failures, contract.runtime?.metricsPath, "/metrics", "runtime.metricsPath");
  requireEqual(
    failures,
    contract.runtime?.connectedMetric,
    "commands_poll_last_successful_timestamp_seconds",
    "runtime.connectedMetric"
  );
  requireEqual(failures, contract.runtime?.openBrowser, false, "runtime.openBrowser");
  requireEqual(failures, contract.runtime?.allowRemoteUi, false, "runtime.allowRemoteUi");
  requireEqual(failures, contract.runtime?.rawHttpLogging, false, "runtime.rawHttpLogging");
  requireEqual(
    failures,
    contract.runtime?.launcher,
    "scripts/archie-service/run-full-corpus-mcp-server.mjs",
    "runtime.launcher"
  );
  if (!Number.isInteger(contract.runtime?.maxSuccessfulPollAgeSeconds) || contract.runtime.maxSuccessfulPollAgeSeconds < 60 || contract.runtime.maxSuccessfulPollAgeSeconds > 300) {
    failures.push("runtime.maxSuccessfulPollAgeSeconds must be an integer in 60..300");
  }
  if (!Number.isInteger(contract.runtime?.startupTimeoutMs) || contract.runtime.startupTimeoutMs < 10000 || contract.runtime.startupTimeoutMs > 60000) {
    failures.push("runtime.startupTimeoutMs must be an integer in 10000..60000");
  }
  requireEqual(failures, contract.runtime?.supervisor, "scripts/dev/owned-compute-supervisor.mjs", "runtime.supervisor");
  requireEqual(failures, contract.runtime?.supervisorOwnerTask, "architrino-mcp-secure-tunnel", "runtime.supervisorOwnerTask");
  if (!Number.isInteger(contract.runtime?.supervisorDeadlineSeconds) || contract.runtime.supervisorDeadlineSeconds < 3600 || contract.runtime.supervisorDeadlineSeconds > 86400) {
    failures.push("runtime.supervisorDeadlineSeconds must be an integer in 3600..86400");
  }
  if (!Number.isInteger(contract.runtime?.supervisorHeartbeatSeconds) || contract.runtime.supervisorHeartbeatSeconds < 5 || contract.runtime.supervisorHeartbeatSeconds > 60) {
    failures.push("runtime.supervisorHeartbeatSeconds must be an integer in 5..60");
  }
  if (!Number.isInteger(contract.runtime?.supervisorTerminationGraceSeconds) || contract.runtime.supervisorTerminationGraceSeconds < 5 || contract.runtime.supervisorTerminationGraceSeconds > 30) {
    failures.push("runtime.supervisorTerminationGraceSeconds must be an integer in 5..30");
  }
  for (const field of ["profileDirectory", "receiptPath", "pidPath", "ownedComputeRunPath", "healthUrlPath", "logPath"]) {
    if (!isSafeStatePath(contract.runtime?.[field])) failures.push(`runtime.${field} must stay under ${STATE_ROOT}`);
  }
  for (const [field, expected] of Object.entries({
    requiresExactRemoteMain: true,
    requiresCleanTree: true,
    requiresCurrentOfficialRelease: true,
    requiresArchiveHash: true,
    requiresExecutableHash: true,
    requiresReleaseAttestation: true,
    requiresContentIntegrity: true,
    requiresFreshFullCorpusSnapshot: true,
    requiresFullCorpusProtocolSmoke: true,
    requiresDeterministicRecallBenchmark: true,
  })) {
    requireEqual(failures, contract.release?.[field], expected, `release.${field}`);
  }
  requireEqual(failures, contract.clientRelease?.attestationRepository, "openai/tunnel-client", "clientRelease.attestationRepository");
  requireEqual(failures, contract.clientRelease?.attestationVerification, "gh_attestation_verify", "clientRelease.attestationVerification");
  if (!/^v\d+\.\d+\.\d+$/.test(contract.clientRelease?.tag ?? "")) failures.push("clientRelease.tag is not a pinned release tag");
  if (!/^\d+\.\d+\.\d+\+$/.test(contract.clientRelease?.versionPrefix ?? "")) failures.push("clientRelease.versionPrefix is invalid");
  for (const field of ["provenanceBundleSha256"]) {
    if (!isSha256(contract.clientRelease?.[field])) failures.push(`clientRelease.${field} is not SHA-256`);
  }
  const platforms = Object.entries(contract.clientRelease?.platforms ?? {});
  if (platforms.length === 0) failures.push("clientRelease.platforms is empty");
  for (const [platformName, platform] of platforms) {
    if (typeof platform.archiveName !== "string" || !platform.archiveName.includes(contract.clientRelease.tag)) {
      failures.push(`clientRelease platform ${platformName} archiveName does not identify the pinned tag`);
    }
    for (const field of ["archiveSha256", "executableSha256"]) {
      if (!isSha256(platform[field])) failures.push(`clientRelease platform ${platformName} ${field} is not SHA-256`);
    }
  }
  requireEqual(failures, JSON.stringify(contract.capabilityBoundary?.tools), JSON.stringify(EXPECTED_TOOLS), "capabilityBoundary.tools");
  requireEqual(failures, contract.capabilityBoundary?.accessScope, "public", "capabilityBoundary.accessScope");
  requireEqual(failures, contract.capabilityBoundary?.readOnly, true, "capabilityBoundary.readOnly");
  for (const field of ["hiddenMaterialAllowed", "claimAuthorityRaised", "repositoryWritesAllowed", "inboundListenerAllowed", "publicEndpointCreated"]) {
    requireEqual(failures, contract.capabilityBoundary?.[field], false, `capabilityBoundary.${field}`);
  }
  return failures;
}

export function currentPlatformKey({ platform = process.platform, arch = process.arch } = {}) {
  const os = platform === "darwin" ? "darwin" : platform === "linux" ? "linux" : platform === "win32" ? "windows" : platform;
  const cpu = arch === "x64" ? "amd64" : arch;
  return `${os}-${cpu}`;
}

export function buildInitArgs({ contract, rootDir = ROOT, tunnelId, nodePath = process.execPath }) {
  const credentialName = contract.controlPlane.runtimeApiKeyEnvironmentVariable;
  return [
    "init",
    "--sample",
    "sample_mcp_stdio_local",
    "--profile",
    contract.runtime.profile,
    "--profile-dir",
    absoluteStatePath(rootDir, contract.runtime.profileDirectory),
    "--tunnel-id",
    tunnelId,
    "--control-plane-api-key-ref",
    contract.controlPlane.runtimeApiKeyReference,
    "--control-plane-base-url",
    contract.controlPlane.baseUrl,
    "--mcp-command",
    shellCommand(["/usr/bin/env", "-u", credentialName, nodePath, path.join(rootDir, contract.runtime.launcher)]),
    "--health-listen-addr",
    contract.runtime.healthListenAddress,
    "--force",
  ];
}

export function buildTunnelRuntimeEnvironment({ contract, environment = process.env }) {
  const allowedNames = ["PATH", "HOME", "TMPDIR", "TMP", "TEMP", "LANG", "LC_ALL", "USER", "LOGNAME", "SHELL"];
  const sanitized = {};
  for (const name of allowedNames) {
    if (typeof environment[name] === "string") sanitized[name] = environment[name];
  }
  const credentialName = contract.controlPlane.runtimeApiKeyEnvironmentVariable;
  if (typeof environment[credentialName] === "string") sanitized[credentialName] = environment[credentialName];
  return sanitized;
}

export function buildDoctorArgs({ contract, rootDir = ROOT }) {
  return [
    "doctor",
    "--profile",
    contract.runtime.profile,
    "--profile-dir",
    absoluteStatePath(rootDir, contract.runtime.profileDirectory),
    "--explain",
    "--json",
  ];
}

export function buildRunArgs({ contract, rootDir = ROOT }) {
  return [
    "run",
    "--profile",
    contract.runtime.profile,
    "--profile-dir",
    absoluteStatePath(rootDir, contract.runtime.profileDirectory),
    "--health.listen-addr",
    contract.runtime.healthListenAddress,
    "--health.url-file",
    absoluteStatePath(rootDir, contract.runtime.healthUrlPath),
    "--pid.file",
    absoluteStatePath(rootDir, contract.runtime.pidPath),
    "--log.file",
    absoluteStatePath(rootDir, contract.runtime.logPath),
    "--log.format",
    "json",
    "--log.level",
    "info",
  ];
}

export function buildSupervisorStartArgs({ contract, binaryPath, rootDir = ROOT }) {
  return [
    contract.runtime.supervisor,
    "start",
    "--owner-task",
    contract.runtime.supervisorOwnerTask,
    "--deadline-seconds",
    String(contract.runtime.supervisorDeadlineSeconds),
    "--heartbeat-seconds",
    String(contract.runtime.supervisorHeartbeatSeconds),
    "--termination-grace-seconds",
    String(contract.runtime.supervisorTerminationGraceSeconds),
    "--cwd",
    ".",
    "--",
    binaryPath,
    ...buildRunArgs({ contract, rootDir }),
  ];
}

export async function verifyLatestRelease({ contract, fetchImpl = fetch, platformKey = currentPlatformKey() }) {
  const response = await fetchImpl(contract.latestReleaseApi, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "architrino-mcp-release-preflight" },
  });
  if (!response.ok) throw new Error(`latest tunnel-client release lookup returned HTTP ${response.status}`);
  const release = await response.json();
  if (release.tag_name !== contract.clientRelease.tag) {
    throw new Error(`pinned tunnel-client ${contract.clientRelease.tag} is not current latest ${release.tag_name ?? "missing"}`);
  }
  const platform = contract.clientRelease.platforms[platformKey];
  if (!platform) throw new Error(`no pinned tunnel-client release for ${platformKey}`);
  const asset = release.assets?.find((entry) => entry.name === platform.archiveName);
  if (!asset) throw new Error(`latest release does not contain ${platform.archiveName}`);
  if (asset.digest !== `sha256:${platform.archiveSha256}`) throw new Error(`latest release digest differs for ${platform.archiveName}`);
  return { tag: release.tag_name, archiveName: asset.name, archiveSha256: platform.archiveSha256 };
}

export function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

export function verifyTunnelClientFiles({ contract, binaryPath, archivePath, runner = runChecked, platformKey = currentPlatformKey() }) {
  if (!path.isAbsolute(binaryPath ?? "")) throw new Error(`${contract.controlPlane.binaryPathEnvironmentVariable} must be an absolute path`);
  if (!path.isAbsolute(archivePath ?? "")) throw new Error(`${contract.controlPlane.archivePathEnvironmentVariable} must be an absolute path`);
  const platform = contract.clientRelease.platforms[platformKey];
  if (!platform) throw new Error(`no pinned tunnel-client release for ${platformKey}`);
  if (path.basename(archivePath) !== platform.archiveName) throw new Error(`tunnel-client archive name must be ${platform.archiveName}`);
  const archiveSha256 = sha256File(archivePath);
  if (archiveSha256 !== platform.archiveSha256) throw new Error(`tunnel-client archive SHA-256 mismatch: ${archiveSha256}`);
  const executableSha256 = sha256File(binaryPath);
  if (executableSha256 !== platform.executableSha256) throw new Error(`tunnel-client executable SHA-256 mismatch: ${executableSha256}`);
  const version = runner(binaryPath, ["--version"]);
  if (!version.startsWith(contract.clientRelease.versionPrefix)) throw new Error(`unexpected tunnel-client version: ${version}`);
  runner("gh", ["attestation", "verify", archivePath, "--repo", contract.clientRelease.attestationRepository]);
  return { archiveSha256, executableSha256, version };
}

export function parsePrometheusMetric(metricsText, metricName) {
  const escaped = metricName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = String(metricsText).match(new RegExp(`^${escaped}(?:\\{[^\\n]*\\})?\\s+([+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?)$`, "m"));
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

export function evaluateRuntimeStatus({
  pid,
  processRunning,
  healthStatus,
  healthBody,
  readinessStatus,
  readinessBody,
  metricsText,
  nowSeconds = Math.floor(Date.now() / 1000),
  connectedMetric = "commands_poll_last_successful_timestamp_seconds",
  maxSuccessfulPollAgeSeconds = 90,
}) {
  const lastSuccessfulPoll = parsePrometheusMetric(metricsText, connectedMetric);
  const pollAgeSeconds = lastSuccessfulPoll && lastSuccessfulPoll > 0 ? nowSeconds - lastSuccessfulPoll : null;
  const healthy = processRunning === true && healthStatus === 200 && String(healthBody).trim() === "live";
  const ready = healthy && readinessStatus === 200 && String(readinessBody).trim().startsWith("ready");
  const connected = ready && pollAgeSeconds !== null && pollAgeSeconds >= 0 && pollAgeSeconds <= maxSuccessfulPollAgeSeconds;
  return {
    process_running: processRunning === true,
    healthy,
    ready,
    connected,
    pid: Number.isInteger(pid) && pid > 0 ? pid : null,
    last_successful_poll_unix_seconds: lastSuccessfulPoll && lastSuccessfulPoll > 0 ? lastSuccessfulPoll : null,
    successful_poll_age_seconds: pollAgeSeconds,
  };
}

export function validateRuntimeStatus(status) {
  const failures = [];
  for (const field of ["process_running", "healthy", "ready", "connected"]) {
    if (status?.[field] !== true) failures.push(`${field} is not true`);
  }
  return failures;
}

export function publicRuntimeStatus(status) {
  return {
    process_running: status?.process_running === true,
    healthy: status?.healthy === true,
    ready: status?.ready === true,
    connected: status?.connected === true,
    successful_poll_age_seconds: Number.isFinite(status?.successful_poll_age_seconds)
      ? status.successful_poll_age_seconds
      : null,
  };
}

export function validateHealthBaseUrl(value) {
  let parsed;
  try {
    parsed = new URL(String(value).trim());
  } catch {
    throw new Error("tunnel-client health URL is invalid");
  }
  if (parsed.protocol !== "http:" || parsed.hostname !== "127.0.0.1" || parsed.pathname !== "/" || parsed.username || parsed.password || parsed.search || parsed.hash) {
    throw new Error("tunnel-client health URL must be an unadorned http://127.0.0.1:<port>/ URL");
  }
  const port = Number(parsed.port);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("tunnel-client health URL port is invalid");
  return `http://127.0.0.1:${port}`;
}

export function redactRuntimeReceipt({ contract, preflight, status }) {
  return {
    schema: "archie-mcp-secure-tunnel-runtime-receipt/v1",
    deploymentClass: contract.deploymentClass,
    provider: contract.provider,
    releaseCommit: preflight.releaseCommit,
    snapshotId: preflight.snapshotId,
    snapshotSha256: preflight.snapshotSha256,
    repositoryRef: preflight.repositoryRef,
    tunnelClientTag: contract.clientRelease.tag,
    tunnelClientExecutableSha256: preflight.executableSha256,
    toolNames: [...contract.capabilityBoundary.tools],
    accessScope: contract.capabilityBoundary.accessScope,
    processRunning: status.process_running,
    healthy: status.healthy,
    ready: status.ready,
    connected: status.connected,
    credentialValuesRetained: false,
    tunnelIdentifierRetained: false,
    publicEndpointCreated: false,
  };
}

export function shellCommand(parts) {
  return parts.map((part) => `'${String(part).replaceAll("'", "'\\''")}'`).join(" ");
}

async function livePreflight({ contract, rootDir = ROOT, environment = process.env }) {
  const binaryPath = environment[contract.controlPlane.binaryPathEnvironmentVariable];
  const archivePath = environment[contract.controlPlane.archivePathEnvironmentVariable];
  const tunnelId = environment[contract.controlPlane.tunnelIdEnvironmentVariable];
  const runtimeKey = environment[contract.controlPlane.runtimeApiKeyEnvironmentVariable];
  if (!/^tunnel_[a-z0-9]{32}$/.test(tunnelId ?? "")) throw new Error(`${contract.controlPlane.tunnelIdEnvironmentVariable} is missing or invalid`);
  if (typeof runtimeKey !== "string" || runtimeKey.length < 20) throw new Error(`${contract.controlPlane.runtimeApiKeyEnvironmentVariable} is missing or invalid`);
  if (treeStatus(rootDir) !== "") throw new Error("release working tree is not clean");
  const releaseCommit = runChecked("git", ["rev-parse", "HEAD"], { cwd: rootDir });
  const remoteLine = runChecked("git", ["ls-remote", "origin", `refs/heads/${contract.release.acceptedBranch}`], { cwd: rootDir });
  const remoteMainCommit = remoteLine.split(/\s+/)[0];
  if (!/^[a-f0-9]{40}$/.test(remoteMainCommit) || remoteMainCommit !== releaseCommit) {
    throw new Error(`release commit ${releaseCommit} is not exact remote ${contract.release.acceptedBranch} ${remoteMainCommit || "missing"}`);
  }
  const client = verifyTunnelClientFiles({ contract, binaryPath, archivePath });
  await verifyLatestRelease({ contract });
  runChecked(process.execPath, ["scripts/archie-service/build-full-corpus-source-index.mjs", "--write"], { cwd: rootDir });
  runChecked(process.execPath, ["scripts/archie-service/build-full-corpus-source-index.mjs", "--check"], { cwd: rootDir });
  runChecked(process.execPath, ["scripts/archie-service/check-mcp-deterministic-recall-benchmark.mjs", "--check"], { cwd: rootDir });
  runChecked(process.execPath, ["scripts/archie-service/check-full-corpus-mcp-server.mjs", "--check"], { cwd: rootDir });
  runChecked(process.execPath, ["scripts/check-content-integrity.mjs"], { cwd: rootDir, maxBuffer: 128 * 1024 * 1024 });
  if (treeStatus(rootDir) !== "") throw new Error("release validation changed the non-ignored working tree");
  const snapshot = JSON.parse(fs.readFileSync(path.join(rootDir, FULL_CORPUS_SNAPSHOT_PATH), "utf8"));
  return {
    ...client,
    binaryPath,
    tunnelId,
    releaseCommit,
    remoteMainCommit,
    snapshotId: snapshot.snapshotId,
    snapshotSha256: snapshot.snapshotSha256,
    repositoryRef: snapshot.repositoryRef,
  };
}

async function startRuntime({ contract, rootDir = ROOT, environment = process.env }) {
  const preflight = await livePreflight({ contract, rootDir, environment });
  const tunnelEnvironment = buildTunnelRuntimeEnvironment({ contract, environment });
  const existing = await readRuntimeStatus({ contract, rootDir });
  if (existing.process_running) throw new Error("tunnel-client is already running; use --restart or --status");
  ensurePrivateDirectory(path.join(rootDir, STATE_ROOT));
  ensurePrivateDirectory(absoluteStatePath(rootDir, contract.runtime.profileDirectory));
  for (const relativePath of [contract.runtime.pidPath, contract.runtime.ownedComputeRunPath, contract.runtime.healthUrlPath, contract.runtime.logPath]) {
    unlinkIfPresent(absoluteStatePath(rootDir, relativePath));
  }
  const redactions = [preflight.tunnelId, environment[contract.controlPlane.runtimeApiKeyEnvironmentVariable]];
  runChecked(preflight.binaryPath, buildInitArgs({ contract, rootDir, tunnelId: preflight.tunnelId }), {
    cwd: rootDir,
    env: tunnelEnvironment,
    redactions,
  });
  runChecked(preflight.binaryPath, buildDoctorArgs({ contract, rootDir }), {
    cwd: rootDir,
    env: tunnelEnvironment,
    redactions,
    maxBuffer: 16 * 1024 * 1024,
  });
  const leaseOutput = runChecked(process.execPath, buildSupervisorStartArgs({ contract, binaryPath: preflight.binaryPath, rootDir }), {
    cwd: rootDir,
    env: tunnelEnvironment,
    redactions,
  });
  const lease = JSON.parse(leaseOutput);
  if (!/^[0-9a-f-]{36}$/.test(lease.runId ?? "") || lease.status !== "running") {
    throw new Error("owned-compute supervisor did not return a running tunnel-client lease");
  }
  writePrivateJson(absoluteStatePath(rootDir, contract.runtime.ownedComputeRunPath), {
    schema: "archie-mcp-owned-compute-run/v1",
    runId: lease.runId,
  });
  try {
    const status = await waitForReadyRuntime({ contract, rootDir });
    const receipt = redactRuntimeReceipt({ contract, preflight, status });
    writePrivateJson(absoluteStatePath(rootDir, contract.runtime.receiptPath), receipt);
    return receipt;
  } catch (error) {
    try {
      stopOwnedComputeRun({ contract, rootDir, runId: lease.runId });
    } catch {
      // Preserve the readiness error; the supervisor lease remains the recovery authority.
    }
    throw error;
  }
}

async function waitForReadyRuntime({ contract, rootDir }) {
  const deadline = Date.now() + contract.runtime.startupTimeoutMs;
  let last = null;
  while (Date.now() < deadline) {
    last = await readRuntimeStatus({ contract, rootDir });
    if (validateRuntimeStatus(last).length === 0) return last;
    await delay(250);
  }
  throw new Error(`tunnel-client did not become healthy, ready, and connected: ${validateRuntimeStatus(last).join(", ")}`);
}

async function readRuntimeStatus({ contract, rootDir = ROOT }) {
  const pointer = readOwnedComputePointer(absoluteStatePath(rootDir, contract.runtime.ownedComputeRunPath));
  const supervised = pointer ? ownedComputeRunStatus({ contract, rootDir, runId: pointer.runId }) : null;
  const pid = supervised?.pid ?? null;
  const running = supervised?.running === true;
  const healthUrlFile = absoluteStatePath(rootDir, contract.runtime.healthUrlPath);
  if (!running || !fs.existsSync(healthUrlFile)) {
    return evaluateRuntimeStatus({ pid, processRunning: false, metricsText: "" });
  }
  let baseUrl;
  try {
    baseUrl = validateHealthBaseUrl(fs.readFileSync(healthUrlFile, "utf8"));
  } catch {
    return evaluateRuntimeStatus({ pid, processRunning: true, metricsText: "" });
  }
  const [health, readiness, metrics] = await Promise.all([
    fetchText(`${baseUrl}${contract.runtime.healthPath}`),
    fetchText(`${baseUrl}${contract.runtime.readinessPath}`),
    fetchText(`${baseUrl}${contract.runtime.metricsPath}`),
  ]);
  return evaluateRuntimeStatus({
    pid,
    processRunning: true,
    healthStatus: health.status,
    healthBody: health.body,
    readinessStatus: readiness.status,
    readinessBody: readiness.body,
    metricsText: metrics.body,
    connectedMetric: contract.runtime.connectedMetric,
    maxSuccessfulPollAgeSeconds: contract.runtime.maxSuccessfulPollAgeSeconds,
  });
}

async function stopRuntime({ contract, rootDir = ROOT, environment = process.env }) {
  void environment;
  const pointerPath = absoluteStatePath(rootDir, contract.runtime.ownedComputeRunPath);
  const pointer = readOwnedComputePointer(pointerPath);
  if (!pointer) return { stopped: false, reason: "not_running" };
  stopOwnedComputeRun({ contract, rootDir, runId: pointer.runId });
  unlinkIfPresent(pointerPath);
  unlinkIfPresent(absoluteStatePath(rootDir, contract.runtime.pidPath));
  unlinkIfPresent(absoluteStatePath(rootDir, contract.runtime.healthUrlPath));
  return { stopped: true };
}

async function fetchText(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
    return { status: response.status, body: await response.text() };
  } catch {
    return { status: null, body: "" };
  }
}

function readOwnedComputePointer(pointerPath) {
  if (!fs.existsSync(pointerPath)) return null;
  try {
    const pointer = JSON.parse(fs.readFileSync(pointerPath, "utf8"));
    if (pointer.schema !== "archie-mcp-owned-compute-run/v1" || !/^[0-9a-f-]{36}$/.test(pointer.runId ?? "")) {
      throw new Error("invalid owned-compute run pointer");
    }
    return pointer;
  } catch (error) {
    throw new Error(`owned-compute run pointer is invalid: ${error.message}`);
  }
}

function ownedComputeRunStatus({ contract, rootDir, runId }) {
  const output = runChecked(process.execPath, [contract.runtime.supervisor, "status", "--run-id", runId], { cwd: rootDir });
  const result = JSON.parse(output);
  if (!["authenticated_running", "terminal", "stale_closed"].includes(result.classification)) {
    throw new Error(`owned-compute tunnel lease is ${result.classification ?? "unknown"}; refusing lifecycle action`);
  }
  return {
    running: result.classification === "authenticated_running",
    pid: Number.isInteger(result.lease?.targetIdentity?.pid) ? result.lease.targetIdentity.pid : null,
  };
}

function stopOwnedComputeRun({ contract, rootDir, runId }) {
  runChecked(process.execPath, [contract.runtime.supervisor, "stop", "--run-id", runId, "--reason", "mcp_manager_stop"], { cwd: rootDir });
}

function treeStatus(rootDir) {
  return runChecked("git", ["status", "--porcelain", "--untracked-files=normal"], { cwd: rootDir });
}

function runChecked(command, args, { cwd = ROOT, env = process.env, maxBuffer = 64 * 1024 * 1024, redactions = [] } = {}) {
  const result = spawnSync(command, args, { cwd, env, encoding: "utf8", maxBuffer });
  if (result.error || result.status !== 0) {
    let detail = result.error?.message || result.stderr?.trim() || result.stdout?.trim() || `exit ${result.status}`;
    for (const value of redactions.filter(Boolean)) detail = detail.replaceAll(value, "[redacted]");
    throw new Error(`${path.basename(command)} failed: ${detail}`);
  }
  return result.stdout.trim();
}

function ensurePrivateDirectory(directory) {
  fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
  fs.chmodSync(directory, 0o700);
}

function writePrivateJson(target, value) {
  ensurePrivateDirectory(path.dirname(target));
  const temporary = `${target}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  fs.renameSync(temporary, target);
  fs.chmodSync(target, 0o600);
}

function unlinkIfPresent(target) {
  try {
    fs.unlinkSync(target);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

function absoluteStatePath(rootDir, relativePath) {
  if (!isSafeStatePath(relativePath)) throw new Error(`unsafe secure-tunnel state path: ${relativePath}`);
  return path.join(rootDir, relativePath);
}

function isSafeStatePath(value) {
  if (typeof value !== "string" || value === "" || path.isAbsolute(value)) return false;
  const normalized = path.posix.normalize(value.replaceAll("\\", "/"));
  return normalized === STATE_ROOT || normalized.startsWith(`${STATE_ROOT}/`);
}

function isSha256(value) {
  return /^[a-f0-9]{64}$/.test(value ?? "");
}

function requireEqual(failures, actual, expected, field) {
  if (actual !== expected) failures.push(`${field} must equal ${JSON.stringify(expected)}`);
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function printJson(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

async function main() {
  const mode = process.argv[2];
  const modes = new Set(["--check", "--preflight", "--start", "--status", "--stop", "--restart"]);
  if (!modes.has(mode) || process.argv.length !== 3) {
    throw new Error("Usage: node scripts/archie-service/manage-secure-mcp-tunnel.mjs --check|--preflight|--start|--status|--stop|--restart");
  }
  const contract = readSecureTunnelContract();
  const failures = validateSecureTunnelContract(contract);
  if (failures.length) throw new Error(`secure-tunnel contract rejected:\n- ${failures.join("\n- ")}`);
  if (mode === "--check") {
    process.stdout.write(`Archie MCP secure-tunnel contract passed: current init/doctor/run workflow, ${contract.capabilityBoundary.tools.length} read-only public-source tools, public contract unchanged\n`);
    return;
  }
  if (mode === "--status") {
    printJson(publicRuntimeStatus(await readRuntimeStatus({ contract })));
    return;
  }
  if (mode === "--stop") {
    printJson(await stopRuntime({ contract }));
    return;
  }
  if (mode === "--restart") await stopRuntime({ contract });
  if (mode === "--preflight") {
    const preflight = await livePreflight({ contract });
    printJson({
      releaseCommit: preflight.releaseCommit,
      remoteMainCommit: preflight.remoteMainCommit,
      snapshotId: preflight.snapshotId,
      snapshotSha256: preflight.snapshotSha256,
      repositoryRef: preflight.repositoryRef,
      tunnelClientTag: contract.clientRelease.tag,
      archiveSha256: preflight.archiveSha256,
      executableSha256: preflight.executableSha256,
      releaseAttestationVerified: true,
      credentialValuesRetained: false,
      tunnelIdentifierRetained: false,
    });
    return;
  }
  printJson(await startRuntime({ contract }));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`Archie MCP secure-tunnel deployment failed: ${error.message}\n`);
    process.exit(1);
  });
}
