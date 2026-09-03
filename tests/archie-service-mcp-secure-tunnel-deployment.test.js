import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  buildManagedConnectArgs,
  currentPlatformKey,
  publicManagedRuntimeStatus,
  readSecureTunnelContract,
  redactRuntimeReceipt,
  shellCommand,
  validateManagedRuntimeStatus,
  validateSecureTunnelContract,
} from "../scripts/archie-service/manage-secure-mcp-tunnel.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contract = readSecureTunnelContract(rootDir);

test("secure-tunnel deployment contract is private, outbound-only, source-grounded, and pinned", () => {
  assert.deepEqual(validateSecureTunnelContract(contract), []);
  assert.equal(currentPlatformKey({ platform: "darwin", arch: "arm64" }), "darwin-arm64");
  assert.equal(currentPlatformKey({ platform: "linux", arch: "x64" }), "linux-amd64");
  assert.equal(contract.publicRemoteContractAdvanced, false);
  assert.equal(contract.capabilityBoundary.inboundListenerAllowed, false);
  assert.equal(contract.capabilityBoundary.publicEndpointCreated, false);
  assert.equal(contract.capabilityBoundary.hiddenMaterialAllowed, false);
  assert.equal(contract.capabilityBoundary.claimAuthorityRaised, false);
  assert.deepEqual(contract.capabilityBoundary.tools, ["search", "read", "topics", "neighbors", "walk"]);
});

test("unsafe deployment mutations fail their exact static gate", () => {
  const mutations = [
    ["deploymentClass", "public"],
    ["publicRemoteContractAdvanced", true],
    ["runtime.healthListenAddress", "0.0.0.0:8080"],
    ["runtime.openBrowser", true],
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

test("managed runtime command retains an environment reference and exact stdio launcher", () => {
  const args = buildManagedConnectArgs({
    contract,
    rootDir,
    tunnelId: "tunnel_00000000000000000000000000000000",
  });
  assert.deepEqual(args.slice(0, 2), ["runtimes", "connect"]);
  assert.equal(args[args.indexOf("--runtime-api-key") + 1], "env:OPENAI_MCP_TUNNEL_API_KEY");
  assert.equal(args[args.indexOf("--profile-dir") + 1], path.join(rootDir, contract.runtime.profileDirectory));
  const command = args[args.indexOf("--mcp-command") + 1];
  assert.match(command, /run-full-corpus-mcp-server\.mjs/);
  assert.doesNotMatch(command, /run-loopback-mcp-http-server/);
  assert.equal(shellCommand(["a b", "c'd"]), "'a b' 'c'\\''d'");
});

test("runtime readiness requires all three managed status fields", () => {
  const healthy = { process_running: true, healthy: true, ready: true, tunnel_id: "must-not-escape" };
  assert.deepEqual(validateManagedRuntimeStatus(healthy), []);
  assert.deepEqual(publicManagedRuntimeStatus(healthy), { process_running: true, healthy: true, ready: true });
  for (const field of ["process_running", "healthy", "ready"]) {
    const status = { process_running: true, healthy: true, ready: true, [field]: false };
    assert.ok(validateManagedRuntimeStatus(status).some((message) => message.includes(field)));
  }
});

test("durable runtime receipt retains no tunnel identifier or credential", () => {
  const receipt = redactRuntimeReceipt({
    contract,
    preflight: {
      tunnelId: "tunnel_secretish_identifier_not_for_receipt",
      releaseCommit: "a".repeat(40),
      snapshotId: "snapshot",
      snapshotSha256: "b".repeat(64),
      repositoryRef: `local-source-state:${"c".repeat(64)}`,
    },
    status: { process_running: true, healthy: true, ready: true },
  });
  const text = JSON.stringify(receipt);
  assert.doesNotMatch(text, /secretish|api.?key|tunnelId/i);
  assert.equal(receipt.credentialValuesRetained, false);
  assert.equal(receipt.publicEndpointCreated, false);
});

test("owned static checker passes without network, credentials, or writes", () => {
  const before = fs.readFileSync(path.join(rootDir, "scripts/config/archie-mcp-secure-tunnel-deployment.v1.json"), "utf8");
  const run = spawnSync(process.execPath, ["scripts/archie-service/manage-secure-mcp-tunnel.mjs", "--check"], {
    cwd: rootDir,
    encoding: "utf8",
  });
  const after = fs.readFileSync(path.join(rootDir, "scripts/config/archie-mcp-secure-tunnel-deployment.v1.json"), "utf8");
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, /secure-tunnel contract passed/);
  assert.equal(after, before);
});
