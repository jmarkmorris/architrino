import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  createLoopbackStreamableHttpAdapter,
  createStaticBearerAuthorizer,
  RequestLimiter,
} from "../src/archie-service/mcp/loopback-streamable-http-adapter.mjs";
import {
  buildSourceIndexSnapshot,
  hashCanonical,
} from "../src/archie-service/source-index/snapshot-v1.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const smoke = readJson("tests/archie-service/fixtures/mcp/mcp-loopback-http-smoke.v1.json");
const baseContract = readJson(smoke.contractFixture);
const activeSnapshot = readJson(smoke.activeSnapshotFixture);
const rollbackSnapshot = buildRollbackSnapshot();
const fixtureToken = "loopback-fixture-token-v1";

test("loopback HTTP fixture exercises lifecycle, four tools, failures, safe logs, and rollback", async () => {
  let now = 0;
  const events = [];
  const contract = contractForSnapshot(activeSnapshot);
  const snapshotStatBefore = fs.statSync(path.join(rootDir, smoke.activeSnapshotFixture));
  const adapter = createLoopbackStreamableHttpAdapter({
    contract,
    activeSnapshot,
    rollbackSnapshot,
    authorize: createStaticBearerAuthorizer({ token: fixtureToken }),
    allowedOrigins: [smoke.allowedOrigin],
    logKey: Buffer.alloc(32, 7),
    logSink: (event) => events.push(event),
    clock: () => now,
  });
  const address = await adapter.listen({ port: 0 });
  assert.equal(address.host, "127.0.0.1");
  assert.equal(adapter.readiness().ready, true);

  try {
    for (const fixtureCase of smoke.cases) {
      const result = await runFixtureCase({ baseUrl: address.url, fixtureCase, contract });
      assert.equal(result.response.status, fixtureCase.expectedHttpStatus, fixtureCase.caseId);
      assert.equal(result.response.headers.get("cache-control"), "no-store", fixtureCase.caseId);
      assert.equal(result.response.headers.get("x-content-type-options"), "nosniff", fixtureCase.caseId);
      if (fixtureCase.expectedHttpStatus === 202) {
        assert.equal(result.text, "", fixtureCase.caseId);
      } else {
        assert.ok(result.json, `${fixtureCase.caseId}: expected JSON body`);
      }
      if (fixtureCase.expectedBodyStatus !== null) {
        assert.equal(result.json.status, fixtureCase.expectedBodyStatus, fixtureCase.caseId);
      }
      if (fixtureCase.expectedRpcErrorCode !== null) {
        assert.equal(result.json.error?.code, fixtureCase.expectedRpcErrorCode, fixtureCase.caseId);
      }
      assertFixtureSpecificResult(fixtureCase, result.json);
      now += 1100;
    }

    assert.equal(adapter.activateSnapshot(rollbackSnapshot), rollbackSnapshot.snapshotId);
    assert.equal(adapter.readiness().ready, false);
    const unavailable = await fetch(`${address.url}${contract.health.readinessPath}`);
    assert.equal(unavailable.status, 503);
    assert.deepEqual(await unavailable.json(), { status: "unavailable" });
    now += 1100;

    assert.equal(adapter.rollback(), activeSnapshot.snapshotId);
    assert.equal(adapter.readiness().ready, true);
    const readyAgain = await fetch(`${address.url}${contract.health.readinessPath}`);
    assert.equal(readyAgain.status, 200);
    assert.deepEqual(await readyAgain.json(), { status: "ready" });

    const snapshotStatAfter = fs.statSync(path.join(rootDir, smoke.activeSnapshotFixture));
    assert.equal(snapshotStatAfter.size, snapshotStatBefore.size);
    assert.equal(snapshotStatAfter.mtimeMs, snapshotStatBefore.mtimeMs);

    const serializedEvents = JSON.stringify(events);
    assert.ok(events.length >= smoke.cases.length);
    assert.ok(!serializedEvents.includes(fixtureToken));
    assert.ok(!serializedEvents.includes("Architrino"));
    assert.ok(!serializedEvents.includes("source.ontology-purpose"));
    for (const event of events) {
      assert.ok(typeof event.event_class === "string");
      assert.ok(!Object.hasOwn(event, "authorization_header"));
      assert.ok(!Object.hasOwn(event, "raw_query"));
      assert.ok(!Object.hasOwn(event, "raw_arguments"));
      assert.ok(!Object.hasOwn(event, "raw_result_content"));
    }
  } finally {
    await adapter.close();
  }
});

test("loopback adapter refuses a non-loopback bind", async () => {
  const adapter = makeAdapter();
  await assert.rejects(() => adapter.listen({ host: "0.0.0.0", port: 0 }), /refuses bind address/);
  await adapter.close();
});

test("HTTP principal rate limit returns 429 with Retry-After", async () => {
  const contract = contractForSnapshot(activeSnapshot);
  contract.limits.requestsPerMinutePerPrincipal = 2;
  const adapter = makeAdapter({ contract, clock: () => 0 });
  const address = await adapter.listen({ port: 0 });
  const headers = {
    Authorization: `Bearer ${fixtureToken}`,
    "MCP-Protocol-Version": "2025-11-25",
  };
  try {
    const first = await fetch(`${address.url}/mcp`, { headers });
    const second = await fetch(`${address.url}/mcp`, { headers });
    const third = await fetch(`${address.url}/mcp`, { headers });
    assert.equal(first.status, 405);
    assert.equal(second.status, 405);
    assert.equal(third.status, 429);
    assert.equal(third.headers.get("retry-after"), "60");
  } finally {
    await adapter.close();
  }
});

test("principal concurrency limit denies a second active lease", () => {
  const limits = structuredClone(baseContract.limits);
  limits.maxConcurrentRequestsPerPrincipal = 1;
  const limiter = new RequestLimiter({ limits, clock: () => 0 });
  const first = limiter.acquirePrincipal("principal-1");
  const second = limiter.acquirePrincipal("principal-1");
  assert.equal(first.ok, true);
  assert.equal(second.ok, false);
  first.release();
  const third = limiter.acquirePrincipal("principal-1");
  assert.equal(third.ok, true);
  third.release();
});

test("unauthenticated address limit and insufficient scope do not advance", async () => {
  const addressContract = contractForSnapshot(activeSnapshot);
  addressContract.limits.maxUnauthenticatedRequestsPerMinutePerAddress = 2;
  const addressAdapter = makeAdapter({ contract: addressContract, clock: () => 0 });
  const address = await addressAdapter.listen({ port: 0 });
  try {
    const first = await fetch(`${address.url}/mcp`);
    const second = await fetch(`${address.url}/mcp`);
    const third = await fetch(`${address.url}/mcp`);
    assert.equal(first.status, 401);
    assert.equal(second.status, 401);
    assert.equal(third.status, 429);
  } finally {
    await addressAdapter.close();
  }

  const scopeAdapter = makeAdapter({
    authorize: createStaticBearerAuthorizer({ token: fixtureToken, scopes: [] }),
  });
  const scopeAddress = await scopeAdapter.listen({ port: 0 });
  try {
    const response = await fetch(`${scopeAddress.url}/mcp`, {
      headers: { Authorization: `Bearer ${fixtureToken}` },
    });
    assert.equal(response.status, 403);
    assert.match(response.headers.get("www-authenticate"), /insufficient_scope/);
  } finally {
    await scopeAdapter.close();
  }
});

test("operational logger rejects a field outside the safe contract", async () => {
  const adapter = makeAdapter();
  assert.throws(
    () => adapter.emitOperationalEvent("unsafe-test", { raw_query: "must-not-log" }),
    /unsafe log field rejected/
  );
  await adapter.close();
});

test("rollback snapshot with another visibility policy is rejected", () => {
  const incompatible = structuredClone(rollbackSnapshot);
  incompatible.visibilityPolicyVersion = "incompatible-visibility-policy";
  delete incompatible.snapshotSha256;
  incompatible.snapshotSha256 = hashCanonical(incompatible);
  assert.throws(
    () => createLoopbackStreamableHttpAdapter({
      contract: contractForSnapshot(activeSnapshot),
      activeSnapshot,
      rollbackSnapshot: incompatible,
      authorize: createStaticBearerAuthorizer({ token: fixtureToken }),
      allowedOrigins: [smoke.allowedOrigin],
      logKey: Buffer.alloc(32, 5),
      logSink: () => {},
    }),
    /rollback snapshot is not transport-compatible/
  );
});

test("HTTP request adapter has no filesystem, model, child-process, or external-action surface", () => {
  const adapterSource = fs.readFileSync(
    path.join(rootDir, "src/archie-service/mcp/loopback-streamable-http-adapter.mjs"),
    "utf8"
  );
  const launcherSource = fs.readFileSync(
    path.join(rootDir, "scripts/archie-service/run-loopback-mcp-http-server.mjs"),
    "utf8"
  );
  assert.doesNotMatch(adapterSource, /node:fs|node:child_process|\bfetch\s*\(|writeFile|appendFile|modelCall|externalAction/);
  assert.doesNotMatch(launcherSource, /node:child_process|\bfetch\s*\(|writeFile|appendFile|modelCall|externalAction/);
});

test("full-corpus loopback launcher starts outside the repository without changing stdio", async () => {
  const launcher = path.join(rootDir, "scripts/archie-service/run-loopback-mcp-http-server.mjs");
  const token = "launcher-fixture-token-v1";
  const child = spawn(process.execPath, [launcher, "--port", "0"], {
    cwd: "/tmp",
    env: { ...process.env, ARCHITRINO_MCP_LOCAL_TOKEN: token },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => { stdout += String(chunk); });
  child.stderr.on("data", (chunk) => { stderr += String(chunk); });

  try {
    const started = await waitForServerStarted(child, () => stderr);
    const ready = await fetch(`${started.listen_address}/health/ready`);
    assert.equal(ready.status, 200);
    assert.deepEqual(await ready.json(), { status: "ready" });

    const response = await fetch(`${started.listen_address}/mcp`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "MCP-Protocol-Version": "2025-11-25",
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: { name: "search", arguments: { query: "launcher-query-must-not-log" } },
      }),
    });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.result.structuredContent.schema, "archie-mcp-tool-response/v1");
    assert.equal(body.result.structuredContent.status, "ok");
  } finally {
    child.kill("SIGINT");
    await waitForChildExit(child);
  }

  assert.equal(stdout, "");
  assert.ok(!stderr.includes(token));
  assert.ok(!stderr.includes("launcher-query-must-not-log"));
  assert.match(stderr, /"event_class":"server_started"/);
});

function makeAdapter({
  contract = contractForSnapshot(activeSnapshot),
  clock = () => Date.now(),
  authorize = createStaticBearerAuthorizer({ token: fixtureToken }),
  logSink = () => {},
} = {}) {
  return createLoopbackStreamableHttpAdapter({
    contract,
    activeSnapshot,
    rollbackSnapshot,
    authorize,
    allowedOrigins: [smoke.allowedOrigin],
    logKey: Buffer.alloc(32, 9),
    logSink,
    clock,
  });
}

async function runFixtureCase({ baseUrl, fixtureCase, contract }) {
  const headers = {};
  if (fixtureCase.authorization === "valid") headers.Authorization = `Bearer ${fixtureToken}`;
  if (fixtureCase.origin === "valid") headers.Origin = smoke.allowedOrigin;
  if (fixtureCase.origin === "invalid") headers.Origin = "https://invalid.example.test";
  if (fixtureCase.protocolVersion === "current") headers["MCP-Protocol-Version"] = contract.protocol.revision;
  if (fixtureCase.protocolVersion === "invalid") headers["MCP-Protocol-Version"] = "1900-01-01";
  if (fixtureCase.contentType === "json") headers["Content-Type"] = "application/json";
  if (fixtureCase.contentType === "text") headers["Content-Type"] = "text/plain";
  if (fixtureCase.accept === "mcp") headers.Accept = "application/json, text/event-stream";
  if (fixtureCase.accept === "sse") headers.Accept = "text/event-stream";
  if (fixtureCase.accept === "json_only") headers.Accept = "application/json";

  let body;
  if (fixtureCase.bodyMode === "json") body = JSON.stringify(fixtureCase.message);
  if (fixtureCase.bodyMode === "malformed") body = "{";
  if (fixtureCase.bodyMode === "oversized") body = "x".repeat(contract.limits.maxRequestBytes + 1);

  const response = await fetch(`${baseUrl}${fixtureCase.path}`, {
    method: fixtureCase.method,
    headers,
    ...(body === undefined ? {} : { body }),
  });
  const text = await response.text();
  let json = null;
  if (text !== "") json = JSON.parse(text);
  return { response, text, json };
}

function assertFixtureSpecificResult(fixtureCase, body) {
  if (fixtureCase.caseId === "http-initialize-001") {
    assert.equal(body.result.protocolVersion, "2025-11-25");
  }
  if (fixtureCase.caseId === "http-tools-list-001") {
    assert.deepEqual(body.result.tools.map((tool) => tool.name), ["search", "read", "topics", "neighbors"]);
  }
  if (fixtureCase.caseId.includes("-call-")) {
    assert.equal(body.result.structuredContent.schema, "archie-mcp-tool-response/v1");
    assert.equal(body.result.structuredContent.status, "ok");
    assert.equal(body.result.isError, false);
  }
  if (fixtureCase.caseId === "http-missing-read-001") {
    assert.equal(body.result.structuredContent.error.code, "SOURCE_NOT_FOUND");
    assert.equal(body.result.isError, true);
  }
}

function contractForSnapshot(snapshot) {
  const contract = structuredClone(baseContract);
  contract.snapshotPublication.candidatePath = smoke.activeSnapshotFixture;
  contract.snapshotPublication.candidateSnapshotId = snapshot.snapshotId;
  contract.snapshotPublication.candidateSnapshotSha256 = snapshot.snapshotSha256;
  contract.snapshotPublication.candidateRepositoryRef = snapshot.repositoryRef;
  return contract;
}

function buildRollbackSnapshot() {
  const input = readJson(smoke.rollbackBuildInputFixture);
  input.snapshotId = "source_snapshot_fixture_rollback_001";
  input.repositoryRef = "fixture-rollback-ref";
  input.rollbackParent = activeSnapshot.snapshotId;
  return buildSourceIndexSnapshot({ rootDir, input });
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function waitForServerStarted(child, stderrValue) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`loopback launcher did not start: ${stderrValue()}`)), 10000);
    const inspect = () => {
      for (const line of stderrValue().split("\n")) {
        if (!line.includes('"event_class":"server_started"')) continue;
        try {
          const event = JSON.parse(line);
          clearTimeout(timeout);
          child.stderr.off("data", inspect);
          resolve(event);
          return;
        } catch {
          // Wait for the complete line.
        }
      }
    };
    child.stderr.on("data", inspect);
    child.once("exit", (code, signal) => {
      clearTimeout(timeout);
      reject(new Error(`loopback launcher exited before startup: code=${code} signal=${signal} ${stderrValue()}`));
    });
  });
}

function waitForChildExit(child) {
  if (child.exitCode !== null || child.signalCode !== null) return Promise.resolve();
  return new Promise((resolve) => child.once("exit", resolve));
}
