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

export function readSecureTunnelContract(rootDir = ROOT) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, SECURE_TUNNEL_CONTRACT_PATH), "utf8"));
}

export function validateSecureTunnelContract(contract) {
  const failures = [];
  requireEqual(failures, contract.schema, SECURE_TUNNEL_SCHEMA, "schema");
  requireEqual(failures, contract.deploymentClass, "private_outbound_only", "deploymentClass");
  requireEqual(failures, contract.publicRemoteContractAdvanced, false, "publicRemoteContractAdvanced");
  requireEqual(failures, contract.provider, "openai_secure_mcp_tunnel", "provider");
  requireEqual(failures, contract.controlPlane?.baseUrl, "https://api.openai.com", "controlPlane.baseUrl");
  requireEqual(
    failures,
    contract.controlPlane?.runtimeApiKeyReference,
    `env:${contract.controlPlane?.runtimeApiKeyEnvironmentVariable}`,
    "controlPlane.runtimeApiKeyReference"
  );
  requireEqual(failures, contract.runtime?.managedRuntime, true, "runtime.managedRuntime");
  requireEqual(failures, contract.runtime?.transport, "stdio", "runtime.transport");
  requireEqual(failures, contract.runtime?.healthListenAddress, "127.0.0.1:0", "runtime.healthListenAddress");
  requireEqual(failures, contract.runtime?.openBrowser, false, "runtime.openBrowser");
  requireEqual(
    failures,
    contract.runtime?.launcher,
    "scripts/archie-service/run-full-corpus-mcp-server.mjs",
    "runtime.launcher"
  );
  for (const [field, expected] of Object.entries({
    requiresExactRemoteMain: true,
    requiresCleanTrackedTree: true,
    requiresContentIntegrity: true,
    requiresFreshFullCorpusSnapshot: true,
    requiresFullCorpusProtocolSmoke: true,
  })) {
    requireEqual(failures, contract.release?.[field], expected, `release.${field}`);
  }
  requireEqual(failures, JSON.stringify(contract.capabilityBoundary?.tools), JSON.stringify(EXPECTED_TOOLS), "capabilityBoundary.tools");
  requireEqual(failures, contract.capabilityBoundary?.accessScope, "public", "capabilityBoundary.accessScope");
  for (const field of ["readOnly"]) requireEqual(failures, contract.capabilityBoundary?.[field], true, `capabilityBoundary.${field}`);
  for (const field of [
    "hiddenMaterialAllowed",
    "claimAuthorityRaised",
    "repositoryWritesAllowed",
    "inboundListenerAllowed",
    "publicEndpointCreated",
  ]) {
    requireEqual(failures, contract.capabilityBoundary?.[field], false, `capabilityBoundary.${field}`);
  }
  const platforms = Object.entries(contract.clientRelease?.platforms ?? {});
  if (platforms.length === 0) failures.push("clientRelease.platforms is empty");
  for (const [platformName, platform] of platforms) {
    for (const field of ["archiveSha256", "executableSha256"]) {
      if (!/^[a-f0-9]{64}$/.test(platform[field] ?? "")) failures.push(`clientRelease platform ${platformName} ${field} is not SHA-256`);
    }
  }
  if (!/^v\d+\.\d+\.\d+$/.test(contract.clientRelease?.tag ?? "")) failures.push("clientRelease.tag is not a pinned release tag");
  if (!/^\d+\.\d+\.\d+\+$/.test(contract.clientRelease?.versionPrefix ?? "")) failures.push("clientRelease.versionPrefix is invalid");
  return failures;
}

export function currentPlatformKey({ platform = process.platform, arch = process.arch } = {}) {
  const os = platform === "darwin" ? "darwin" : platform === "linux" ? "linux" : platform === "win32" ? "windows" : platform;
  const cpu = arch === "x64" ? "amd64" : arch;
  return `${os}-${cpu}`;
}

export function buildManagedConnectArgs({ contract, rootDir = ROOT, tunnelId }) {
  return [
    "runtimes",
    "connect",
    "--alias",
    contract.runtime.alias,
    "--profile",
    contract.runtime.profile,
    "--profile-dir",
    path.join(rootDir, contract.runtime.profileDirectory),
    "--tunnel-id",
    tunnelId,
    "--runtime-api-key",
    contract.controlPlane.runtimeApiKeyReference,
    "--mcp-command",
    shellCommand([process.execPath, path.join(rootDir, contract.runtime.launcher)]),
    "--json",
  ];
}

export function validateManagedRuntimeStatus(status) {
  const failures = [];
  for (const field of ["process_running", "healthy", "ready"]) {
    if (status?.[field] !== true) failures.push(`${field} is not true`);
  }
  return failures;
}

export function publicManagedRuntimeStatus(status) {
  return {
    process_running: status.process_running === true,
    healthy: status.healthy === true,
    ready: status.ready === true,
  };
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
    toolNames: [...contract.capabilityBoundary.tools],
    accessScope: contract.capabilityBoundary.accessScope,
    processRunning: status.process_running,
    healthy: status.healthy,
    ready: status.ready,
    credentialValuesRetained: false,
    publicEndpointCreated: false,
  };
}

export function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

export function shellCommand(parts) {
  return parts.map((part) => `'${String(part).replaceAll("'", "'\\''")}'`).join(" ");
}

function run(command, args, { cwd = ROOT, env = process.env, maxBuffer = 64 * 1024 * 1024, redactions = [] } = {}) {
  const result = spawnSync(command, args, { cwd, env, encoding: "utf8", maxBuffer });
  if (result.error || result.status !== 0) {
    let detail = result.error?.message || result.stderr?.trim() || result.stdout?.trim() || `exit ${result.status}`;
    for (const value of redactions.filter(Boolean)) detail = detail.replaceAll(value, "[redacted]");
    throw new Error(`${path.basename(command)} failed: ${detail}`);
  }
  return result.stdout.trim();
}

function verifyTunnelClient({ contract, binaryPath }) {
  if (!path.isAbsolute(binaryPath)) throw new Error("ARCHITRINO_MCP_TUNNEL_CLIENT_BIN must be an absolute path");
  const platform = contract.clientRelease.platforms[currentPlatformKey()];
  if (!platform) throw new Error(`no pinned tunnel-client release for ${currentPlatformKey()}`);
  const actualSha256 = sha256File(binaryPath);
  if (actualSha256 !== platform.executableSha256) throw new Error(`tunnel-client SHA-256 mismatch: ${actualSha256}`);
  const version = run(binaryPath, ["--version"]);
  if (!version.startsWith(contract.clientRelease.versionPrefix)) throw new Error(`unexpected tunnel-client version: ${version}`);
  return { binaryPath, binarySha256: actualSha256, version };
}

function trackedStatus(rootDir) {
  return run("git", ["status", "--porcelain", "--untracked-files=no"], { cwd: rootDir });
}

function livePreflight({ contract, rootDir = ROOT, binaryPath, environment = process.env }) {
  const client = verifyTunnelClient({ contract, binaryPath });
  const tunnelId = environment[contract.controlPlane.tunnelIdEnvironmentVariable];
  const runtimeKey = environment[contract.controlPlane.runtimeApiKeyEnvironmentVariable];
  if (!/^tunnel_[a-z0-9]{32}$/.test(tunnelId ?? "")) throw new Error(`${contract.controlPlane.tunnelIdEnvironmentVariable} is missing or invalid`);
  if (typeof runtimeKey !== "string" || runtimeKey.length < 20) throw new Error(`${contract.controlPlane.runtimeApiKeyEnvironmentVariable} is missing or invalid`);
  if (trackedStatus(rootDir) !== "") throw new Error("tracked release tree is not clean");
  const releaseCommit = run("git", ["rev-parse", "HEAD"], { cwd: rootDir });
  const remoteLine = run("git", ["ls-remote", "origin", `refs/heads/${contract.release.acceptedBranch}`], { cwd: rootDir });
  const remoteMainCommit = remoteLine.split(/\s+/)[0];
  if (!/^[a-f0-9]{40}$/.test(remoteMainCommit) || remoteMainCommit !== releaseCommit) {
    throw new Error(`release commit ${releaseCommit} is not exact remote ${contract.release.acceptedBranch} ${remoteMainCommit || "missing"}`);
  }
  run(process.execPath, ["scripts/check-content-integrity.mjs"], { cwd: rootDir });
  run(process.execPath, ["scripts/archie-service/build-full-corpus-source-index.mjs", "--write"], { cwd: rootDir });
  run(process.execPath, ["scripts/archie-service/build-full-corpus-source-index.mjs", "--check"], { cwd: rootDir });
  run(process.execPath, ["scripts/archie-service/check-full-corpus-mcp-server.mjs", "--check"], { cwd: rootDir });
  if (trackedStatus(rootDir) !== "") throw new Error("validation changed the tracked release tree");
  const snapshot = JSON.parse(fs.readFileSync(path.join(rootDir, FULL_CORPUS_SNAPSHOT_PATH), "utf8"));
  return {
    ...client,
    tunnelId,
    releaseCommit,
    remoteMainCommit,
    snapshotId: snapshot.snapshotId,
    snapshotSha256: snapshot.snapshotSha256,
    repositoryRef: snapshot.repositoryRef,
  };
}

function managedEnvironment(contract, rootDir, environment = process.env) {
  return { ...environment, XDG_CONFIG_HOME: path.join(rootDir, contract.runtime.stateDirectory) };
}

function runtimeStatus({ contract, rootDir, binaryPath, environment = process.env }) {
  verifyTunnelClient({ contract, binaryPath });
  const output = run(binaryPath, ["runtimes", "status", contract.runtime.alias, "--json"], {
    cwd: rootDir,
    env: managedEnvironment(contract, rootDir, environment),
  });
  const status = JSON.parse(output);
  const failures = validateManagedRuntimeStatus(status);
  if (failures.length) throw new Error(`managed runtime is not ready: ${failures.join(", ")}`);
  return status;
}

function writeReceipt(rootDir, relativePath, value) {
  const target = path.join(rootDir, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  fs.chmodSync(target, 0o600);
}

function printJson(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

function requireEqual(failures, actual, expected, field) {
  if (actual !== expected) failures.push(`${field} must equal ${JSON.stringify(expected)}`);
}

async function main() {
  const mode = process.argv[2];
  if (!new Set(["--check", "--preflight", "--connect", "--status"]).has(mode) || process.argv.length !== 3) {
    throw new Error("Usage: node scripts/archie-service/manage-secure-mcp-tunnel.mjs --check|--preflight|--connect|--status");
  }
  const contract = readSecureTunnelContract();
  const failures = validateSecureTunnelContract(contract);
  if (failures.length) throw new Error(`secure-tunnel contract rejected:\n- ${failures.join("\n- ")}`);
  if (mode === "--check") {
    process.stdout.write(`Archie MCP secure-tunnel contract passed: ${contract.deploymentClass}, ${contract.capabilityBoundary.tools.length} read-only public-source tools, public contract unchanged\n`);
    return;
  }
  const binaryPath = process.env.ARCHITRINO_MCP_TUNNEL_CLIENT_BIN;
  if (!binaryPath) throw new Error("set ARCHITRINO_MCP_TUNNEL_CLIENT_BIN to the pinned tunnel-client executable");
  if (mode === "--status") {
    printJson(publicManagedRuntimeStatus(runtimeStatus({ contract, rootDir: ROOT, binaryPath })));
    return;
  }
  const preflight = livePreflight({ contract, rootDir: ROOT, binaryPath });
  if (mode === "--preflight") {
    const { tunnelId: _tunnelId, ...safePreflight } = preflight;
    printJson({ ...safePreflight, credentialValuesRetained: false });
    return;
  }
  fs.mkdirSync(path.join(ROOT, contract.runtime.profileDirectory), { recursive: true });
  fs.mkdirSync(path.join(ROOT, contract.runtime.stateDirectory), { recursive: true });
  run(binaryPath, buildManagedConnectArgs({ contract, rootDir: ROOT, tunnelId: preflight.tunnelId }), {
    cwd: ROOT,
    env: managedEnvironment(contract, ROOT),
    redactions: [preflight.tunnelId],
  });
  const status = runtimeStatus({ contract, rootDir: ROOT, binaryPath });
  const receipt = redactRuntimeReceipt({ contract, preflight, status });
  writeReceipt(ROOT, contract.runtime.receiptPath, receipt);
  printJson(receipt);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`Archie MCP secure-tunnel deployment failed: ${error.message}\n`);
    process.exit(1);
  });
}
