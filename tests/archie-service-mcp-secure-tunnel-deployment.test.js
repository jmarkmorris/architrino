import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  buildDoctorArgs,
  buildInitArgs,
  buildRunArgs,
  buildSupervisorStartArgs,
  buildTunnelRuntimeEnvironment,
  currentPlatformKey,
  evaluateRuntimeStatus,
  parsePrometheusMetric,
  publicRuntimeStatus,
  readSecureTunnelContract,
  redactRuntimeReceipt,
  shellCommand,
  validateHealthBaseUrl,
  validateRuntimeStatus,
  validateSecureTunnelContract,
  verifyLatestRelease,
  verifyTunnelClientFiles,
} from "../scripts/archie-service/manage-secure-mcp-tunnel.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contract = readSecureTunnelContract(rootDir);

test("secure-tunnel contract is private, outbound-only, source-grounded, and current-command pinned", () => {
  assert.deepEqual(validateSecureTunnelContract(contract), []);
  assert.equal(currentPlatformKey({ platform: "darwin", arch: "arm64" }), "darwin-arm64");
  assert.equal(currentPlatformKey({ platform: "linux", arch: "x64" }), "linux-amd64");
  assert.deepEqual(contract.runtime.commands, { initialize: "init", diagnose: "doctor", serve: "run" });
  assert.equal(contract.publicRemoteContractAdvanced, false);
  assert.equal(contract.runtime.healthListenAddress, "127.0.0.1:0");
  assert.equal(contract.runtime.allowRemoteUi, false);
  assert.equal(contract.runtime.rawHttpLogging, false);
  assert.equal(contract.capabilityBoundary.inboundListenerAllowed, false);
  assert.equal(contract.capabilityBoundary.publicEndpointCreated, false);
  assert.equal(contract.capabilityBoundary.hiddenMaterialAllowed, false);
  assert.equal(contract.capabilityBoundary.claimAuthorityRaised, false);
  assert.deepEqual(contract.capabilityBoundary.tools, ["search", "read", "topics", "neighbors", "walk"]);
});

test("unsafe deployment mutations fail their exact static gates", () => {
  const mutations = [
    ["deploymentClass", "public"],
    ["publicRemoteContractAdvanced", true],
    ["runtime.commands.initialize", "runtimes"],
    ["runtime.commands.diagnose", "status"],
    ["runtime.healthListenAddress", "0.0.0.0:8080"],
    ["runtime.openBrowser", true],
    ["runtime.allowRemoteUi", true],
    ["runtime.rawHttpLogging", true],
    ["runtime.supervisor", "scripts/archie-service/manage-secure-mcp-tunnel.mjs"],
    ["runtime.supervisorDeadlineSeconds", 0],
    ["runtime.logPath", "../tunnel.log"],
    ["release.requiresCurrentOfficialRelease", false],
    ["release.requiresReleaseAttestation", false],
    ["capabilityBoundary.accessScope", "operator_developer"],
    ["capabilityBoundary.hiddenMaterialAllowed", true],
    ["capabilityBoundary.claimAuthorityRaised", true],
    ["capabilityBoundary.repositoryWritesAllowed", true],
    ["capabilityBoundary.inboundListenerAllowed", true],
    ["capabilityBoundary.publicEndpointCreated", true],
  ];
  for (const [key, value] of mutations) {
    const altered = structuredClone(contract);
    const parts = key.split(".");
    let target = altered;
    for (const part of parts.slice(0, -1)) target = target[part];
    target[parts.at(-1)] = value;
    assert.ok(validateSecureTunnelContract(altered).some((message) => message.includes(key)), key);
  }
});

test("current init, doctor, and run arguments preserve the exact stdio and loopback boundary", () => {
  const tunnelId = `tunnel_${"0".repeat(32)}`;
  const init = buildInitArgs({ contract, rootDir, tunnelId, nodePath: "/verified/node" });
  const doctor = buildDoctorArgs({ contract, rootDir });
  const run = buildRunArgs({ contract, rootDir });
  assert.equal(init[0], "init");
  assert.equal(doctor[0], "doctor");
  assert.equal(run[0], "run");
  assert.equal(init[init.indexOf("--control-plane-api-key-ref") + 1], "env:CONTROL_PLANE_API_KEY");
  assert.equal(init[init.indexOf("--control-plane-base-url") + 1], "https://api.openai.com");
  assert.equal(init[init.indexOf("--health-listen-addr") + 1], "127.0.0.1:0");
  assert.match(init[init.indexOf("--mcp-command") + 1], /run-full-corpus-mcp-server\.mjs/);
  assert.match(init[init.indexOf("--mcp-command") + 1], /env'.*'-u'.*'CONTROL_PLANE_API_KEY'/);
  assert.doesNotMatch(init.join(" "), /run-loopback-mcp-http-server|runtimes connect/);
  assert.ok(doctor.includes("--explain"));
  assert.ok(doctor.includes("--json"));
  assert.equal(run[run.indexOf("--health.listen-addr") + 1], "127.0.0.1:0");
  assert.ok(run.includes("--health.url-file"));
  assert.ok(run.includes("--pid.file"));
  assert.ok(run.includes("--log.file"));
  assert.ok(!run.includes("--allow-remote-ui"));
  assert.ok(!run.includes("--open-web-ui"));
  assert.ok(!run.includes("--log.http-raw-unsafe"));
  const supervised = buildSupervisorStartArgs({ contract, binaryPath: "/verified/tunnel-client", rootDir });
  assert.deepEqual(supervised.slice(0, 2), ["scripts/dev/owned-compute-supervisor.mjs", "start"]);
  assert.equal(supervised[supervised.indexOf("--owner-task") + 1], "architrino-mcp-secure-tunnel");
  assert.equal(supervised[supervised.indexOf("--deadline-seconds") + 1], "86400");
  assert.deepEqual(supervised.slice(supervised.indexOf("--") + 1, supervised.indexOf("--") + 3), ["/verified/tunnel-client", "run"]);
  assert.doesNotMatch(supervised.join(" "), /CONTROL_PLANE_API_KEY|tunnel_[a-z0-9]/);
  assert.equal(shellCommand(["a b", "c'd"]), "'a b' 'c'\\''d'");
});

test("runtime environment permits the tunnel credential but rejects configuration injection", () => {
  const environment = {
    PATH: "/usr/bin:/bin",
    HOME: "/private/home",
    LANG: "en_US.UTF-8",
    CONTROL_PLANE_API_KEY: "runtime-secret",
    OPENAI_API_KEY: "fallback-secret",
    CONTROL_PLANE_BASE_URL: "https://attacker.invalid",
    CONTROL_PLANE_TUNNEL_ID: "tunnel_attacker",
    TUNNEL_CLIENT_CONFIG: "/tmp/attacker.yml",
    MCP_COMMAND: "malicious-command",
    MCP_SERVER_URL: "https://attacker.invalid/mcp",
    ALLOW_REMOTE_UI: "true",
    OPEN_WEB_UI: "true",
    LOG_HTTP_RAW_UNSAFE: "true",
    NODE_OPTIONS: "--require=/tmp/attacker.js",
  };
  assert.deepEqual(buildTunnelRuntimeEnvironment({ contract, environment }), {
    PATH: "/usr/bin:/bin",
    HOME: "/private/home",
    LANG: "en_US.UTF-8",
    CONTROL_PLANE_API_KEY: "runtime-secret",
  });
});

test("release currency and local archive identity are checked independently", async () => {
  const platformKey = "fixture-platform";
  const archive = Buffer.from("fixture archive");
  const executable = Buffer.from("fixture executable");
  const fixtureContract = structuredClone(contract);
  fixtureContract.clientRelease.platforms[platformKey] = {
    archiveName: "tunnel-client-v0.0.14-fixture-platform.zip",
    archiveSha256: crypto.createHash("sha256").update(archive).digest("hex"),
    executableSha256: crypto.createHash("sha256").update(executable).digest("hex"),
  };
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "archie-mcp-release-"));
  const archivePath = path.join(temporary, fixtureContract.clientRelease.platforms[platformKey].archiveName);
  const binaryPath = path.join(temporary, "tunnel-client");
  fs.writeFileSync(archivePath, archive);
  fs.writeFileSync(binaryPath, executable);
  const calls = [];
  const verified = verifyTunnelClientFiles({
    contract: fixtureContract,
    archivePath,
    binaryPath,
    platformKey,
    runner: (command, args) => {
      calls.push([command, args]);
      return args[0] === "--version" ? "0.0.14+fixture" : "";
    },
  });
  assert.equal(verified.archiveSha256, fixtureContract.clientRelease.platforms[platformKey].archiveSha256);
  assert.deepEqual(calls[1], ["gh", ["attestation", "verify", archivePath, "--repo", "openai/tunnel-client"]]);

  const release = await verifyLatestRelease({
    contract: fixtureContract,
    platformKey,
    fetchImpl: async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        tag_name: "v0.0.14",
        assets: [{ name: path.basename(archivePath), digest: `sha256:${verified.archiveSha256}` }],
      }),
    }),
  });
  assert.equal(release.tag, "v0.0.14");
  await assert.rejects(
    () => verifyLatestRelease({
      contract: fixtureContract,
      platformKey,
      fetchImpl: async () => ({ ok: true, status: 200, json: async () => ({ tag_name: "v0.0.15", assets: [] }) }),
    }),
    /is not current latest/
  );
});

test("liveness and readiness do not substitute for a recent successful control-plane poll", () => {
  const now = 2_000_000_000;
  const base = {
    pid: 42,
    processRunning: true,
    healthStatus: 200,
    healthBody: "live",
    readinessStatus: 200,
    readinessBody: "ready",
    nowSeconds: now,
  };
  const disconnected = evaluateRuntimeStatus({
    ...base,
    metricsText: "commands_poll_last_successful_timestamp_seconds 0\n",
  });
  assert.equal(disconnected.healthy, true);
  assert.equal(disconnected.ready, true);
  assert.equal(disconnected.connected, false);
  assert.ok(validateRuntimeStatus(disconnected).includes("connected is not true"));

  const stale = evaluateRuntimeStatus({
    ...base,
    metricsText: `commands_poll_last_successful_timestamp_seconds ${now - 91}\n`,
  });
  assert.equal(stale.connected, false);
  const connected = evaluateRuntimeStatus({
    ...base,
    metricsText: `commands_poll_last_successful_timestamp_seconds{scope="controlplane"} ${now - 5}\n`,
  });
  assert.deepEqual(validateRuntimeStatus(connected), []);
  assert.equal(parsePrometheusMetric("other 1\n", contract.runtime.connectedMetric), null);
  assert.deepEqual(publicRuntimeStatus(connected), {
    process_running: true,
    healthy: true,
    ready: true,
    connected: true,
    successful_poll_age_seconds: 5,
  });
});

test("health URL checks reject remote administration", () => {
  assert.equal(validateHealthBaseUrl("http://127.0.0.1:43123"), "http://127.0.0.1:43123");
  for (const unsafe of ["http://0.0.0.0:8080", "http://localhost:8080", "https://127.0.0.1:8080", "http://127.0.0.1:8080/ui", "http://user@127.0.0.1:8080"]) {
    assert.throws(() => validateHealthBaseUrl(unsafe), /health URL/);
  }
});

test("durable receipt retains no tunnel identifier, credential, health URL, or raw content", () => {
  const receipt = redactRuntimeReceipt({
    contract,
    preflight: {
      tunnelId: "tunnel_secretish_identifier_not_for_receipt",
      releaseCommit: "a".repeat(40),
      snapshotId: "snapshot",
      snapshotSha256: "b".repeat(64),
      repositoryRef: `local-source-state:${"c".repeat(64)}`,
      executableSha256: "d".repeat(64),
    },
    status: { process_running: true, healthy: true, ready: true, connected: true },
  });
  const text = JSON.stringify(receipt);
  assert.doesNotMatch(text, /secretish|CONTROL_PLANE_API_KEY|health.*url|raw.*query|source.*content/i);
  assert.equal(Object.hasOwn(receipt, "tunnelId"), false);
  assert.equal(Object.hasOwn(receipt, "runtimeApiKey"), false);
  assert.equal(receipt.credentialValuesRetained, false);
  assert.equal(receipt.tunnelIdentifierRetained, false);
  assert.equal(receipt.publicEndpointCreated, false);
});

test("owned static checker passes without network, credentials, or writes", () => {
  const contractPath = path.join(rootDir, "scripts/config/archie-mcp-secure-tunnel-deployment.v1.json");
  const before = fs.readFileSync(contractPath, "utf8");
  const run = spawnSync(process.execPath, ["scripts/archie-service/manage-secure-mcp-tunnel.mjs", "--check"], {
    cwd: rootDir,
    encoding: "utf8",
  });
  const after = fs.readFileSync(contractPath, "utf8");
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, /current init\/doctor\/run workflow/);
  assert.equal(after, before);

  const managerSource = fs.readFileSync(path.join(rootDir, "scripts/archie-service/manage-secure-mcp-tunnel.mjs"), "utf8");
  assert.doesNotMatch(managerSource, /["']runtimes["']|--allow-remote-ui|--open-web-ui|--log\.http-raw-unsafe/);
  assert.doesNotMatch(managerSource, /detached\s*:\s*true|process\.kill\s*\(/);
  assert.match(managerSource, /owned-compute-supervisor\.mjs/);
  const ignore = fs.readFileSync(path.join(rootDir, ".gitignore"), "utf8");
  assert.match(ignore, /^\/\.local-data\/archie-mcp-tunnel\/$/m);
});
