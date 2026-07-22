import crypto from "node:crypto";
import http from "node:http";
import {
  createStatelessMcpHandler,
  assertSnapshotBundle,
  jsonRpcError,
  MCP_FULL_CORPUS_SERVER_NAME,
  MCP_FULL_CORPUS_SERVER_VERSION,
  MCP_PROTOCOL_VERSION,
} from "./fixture-stdio-adapter.mjs";
import {
  validateMcpRemoteDeploymentContract,
} from "./remote-deployment-contract-v1.mjs";
import {
  hashCanonical,
} from "../source-index/snapshot-v1.mjs";

export const LOOPBACK_BIND_ADDRESS = "127.0.0.1";
export const LOOPBACK_DEFAULT_ALLOWED_ORIGIN = "https://client.architrino.test";
export const LOOPBACK_REQUIRED_SCOPE = "architrino:mcp:read";

const SAFE_LOG_FIELDS = new Set([
  "event_class",
  "request_id",
  "principal_pseudonym",
  "tool_name",
  "response_status",
  "http_status",
  "duration_ms",
  "request_bytes",
  "response_bytes",
  "snapshot_id",
  "snapshot_sha256",
  "listen_address",
]);

export function createLoopbackStreamableHttpAdapter({
  contract,
  activeSnapshot,
  rollbackSnapshot,
  authorize,
  allowedOrigins = [LOOPBACK_DEFAULT_ALLOWED_ORIGIN],
  logKey = crypto.randomBytes(32),
  logSink = defaultLogSink,
  clock = () => Date.now(),
  serverInfo = {
    name: MCP_FULL_CORPUS_SERVER_NAME,
    title: "Architrino Full Corpus MCP",
    version: MCP_FULL_CORPUS_SERVER_VERSION,
    description: "Read-only loopback Streamable HTTP adapter over one validated Architrino snapshot.",
  },
}) {
  const contractErrors = validateMcpRemoteDeploymentContract({ contract, candidateSnapshot: activeSnapshot });
  requireCondition(contractErrors.length === 0, `deployment contract rejected: ${contractErrors.map((error) => error.code).join(", ")}`);
  requireCondition(typeof authorize === "function", "loopback adapter requires an authorization hook");
  requireCondition(typeof logSink === "function", "loopback adapter requires a safe log sink");
  requireCondition(validExactOrigins(allowedOrigins), "allowed origins must be unique exact HTTPS origins");
  requireCondition(contract.protocol.transport === "streamable_http", "loopback adapter requires Streamable HTTP");
  requireCondition(contract.protocol.sessionMode === "stateless", "loopback adapter requires stateless mode");
  requireCondition(contract.networkBoundary.localBindAddress === LOOPBACK_BIND_ADDRESS, "loopback bind contract mismatch");
  requireCondition(contract.authorization.requiredScopes.length === 1 && contract.authorization.requiredScopes[0] === LOOPBACK_REQUIRED_SCOPE, "loopback scope contract mismatch");

  const normalizedLogKey = normalizeLogKey(logKey);
  const limiter = new RequestLimiter({ limits: contract.limits, clock });
  let activeBundle = buildBundle(activeSnapshot);
  let rollbackBundle = buildBundle(rollbackSnapshot);
  requireCondition(compatibleSnapshots(activeBundle.snapshot, rollbackBundle.snapshot), "rollback snapshot is not transport-compatible with the active snapshot");
  let closed = false;

  const server = http.createServer((request, response) => {
    void handleHttpRequest(request, response).catch((error) => {
      if (response.headersSent || response.writableEnded) {
        response.destroy(error);
        return;
      }
      writeJson(response, 500, { status: "internal_error" });
    });
  });
  server.maxHeadersCount = 64;
  server.requestTimeout = contract.limits.requestTimeoutMs;
  server.headersTimeout = Math.max(contract.limits.requestTimeoutMs, 5000);

  return {
    server,
    async listen({ port = 0, host = LOOPBACK_BIND_ADDRESS } = {}) {
      requireCondition(host === LOOPBACK_BIND_ADDRESS, `loopback adapter refuses bind address ${host}`);
      requireCondition(Number.isInteger(port) && port >= 0 && port <= 65535, "port must be an integer in 0..65535");
      requireCondition(!server.listening, "loopback adapter is already listening");
      await new Promise((resolve, reject) => {
        server.once("error", reject);
        server.listen({ host: LOOPBACK_BIND_ADDRESS, port, exclusive: true }, () => {
          server.off("error", reject);
          resolve();
        });
      });
      const address = server.address();
      requireCondition(address && typeof address === "object" && address.address === LOOPBACK_BIND_ADDRESS, "server did not bind to loopback");
      emitOperationalEvent("server_started", {
        http_status: 200,
        snapshot_id: activeBundle.snapshot.snapshotId,
        snapshot_sha256: activeBundle.snapshot.snapshotSha256,
        listen_address: `http://${LOOPBACK_BIND_ADDRESS}:${address.port}`,
      });
      return Object.freeze({ host: LOOPBACK_BIND_ADDRESS, port: address.port, url: `http://${LOOPBACK_BIND_ADDRESS}:${address.port}` });
    },
    async close() {
      if (closed) return;
      closed = true;
      if (!server.listening) return;
      await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    },
    activateSnapshot(nextSnapshot) {
      const nextBundle = buildBundle(nextSnapshot);
      requireCondition(compatibleSnapshots(activeBundle.snapshot, nextBundle.snapshot), "candidate snapshot is not transport-compatible with the active snapshot");
      rollbackBundle = activeBundle;
      activeBundle = nextBundle;
      emitOperationalEvent("snapshot_activated", snapshotLogFields(activeBundle.snapshot));
      return activeBundle.snapshot.snapshotId;
    },
    rollback() {
      requireCondition(Boolean(rollbackBundle), "no rollback snapshot is configured");
      const previousActive = activeBundle;
      activeBundle = rollbackBundle;
      rollbackBundle = previousActive;
      emitOperationalEvent("rollback_activated", snapshotLogFields(activeBundle.snapshot));
      return activeBundle.snapshot.snapshotId;
    },
    readiness() {
      return computeReadiness();
    },
    activeSnapshotIdentity() {
      return Object.freeze(snapshotLogFields(activeBundle.snapshot));
    },
    emitOperationalEvent,
    limiter,
  };

  async function handleHttpRequest(request, response) {
    const startedAt = clock();
    const requestId = crypto.randomUUID();
    const sourceAddress = request.socket.remoteAddress ?? "unknown";
    let principal = null;
    let principalLease = null;
    let requestBytes = 0;
    let toolName;

    const finishLog = ({ status, httpStatus, responseBytes = 0 }) => {
      emitOperationalEvent(httpStatus >= 400 ? "request_rejected" : "request_completed", {
        request_id: requestId,
        ...(principal ? { principal_pseudonym: principalPseudonym(principal.principalId) } : {}),
        ...(toolName ? { tool_name: toolName } : {}),
        response_status: status,
        http_status: httpStatus,
        duration_ms: Math.max(0, clock() - startedAt),
        request_bytes: requestBytes,
        response_bytes: responseBytes,
        ...snapshotLogFields(activeBundle.snapshot),
      });
    };

    try {
      const parsedUrl = parseLocalRequestUrl(request.url);
      if (parsedUrl.search !== "") {
        const addressRate = limiter.checkUnauthenticated(sourceAddress);
        if (!addressRate.ok) {
          const responseBytes = writeRateLimited(response, addressRate.retryAfterSeconds);
          finishLog({ status: "rate_limited", httpStatus: 429, responseBytes });
          return;
        }
        const responseBytes = writeJson(response, 400, { status: "invalid_request" });
        finishLog({ status: "invalid_request", httpStatus: 400, responseBytes });
        return;
      }

      if (request.method === "GET" && parsedUrl.pathname === contract.health.livenessPath) {
        const addressRate = limiter.checkUnauthenticated(sourceAddress);
        if (!addressRate.ok) {
          const responseBytes = writeRateLimited(response, addressRate.retryAfterSeconds);
          finishLog({ status: "rate_limited", httpStatus: 429, responseBytes });
          return;
        }
        const responseBytes = writeJson(response, 200, { status: "live" });
        finishLog({ status: "live", httpStatus: 200, responseBytes });
        return;
      }

      if (request.method === "GET" && parsedUrl.pathname === contract.health.readinessPath) {
        const addressRate = limiter.checkUnauthenticated(sourceAddress);
        if (!addressRate.ok) {
          const responseBytes = writeRateLimited(response, addressRate.retryAfterSeconds);
          finishLog({ status: "rate_limited", httpStatus: 429, responseBytes });
          return;
        }
        const ready = computeReadiness().ready;
        const status = ready ? 200 : contract.health.readinessFailureStatus;
        const responseBytes = writeJson(response, status, { status: ready ? "ready" : "unavailable" });
        finishLog({ status: ready ? "ready" : "unavailable", httpStatus: status, responseBytes });
        return;
      }

      if (parsedUrl.pathname !== contract.protocol.endpointPath) {
        const addressRate = limiter.checkUnauthenticated(sourceAddress);
        if (!addressRate.ok) {
          const responseBytes = writeRateLimited(response, addressRate.retryAfterSeconds);
          finishLog({ status: "rate_limited", httpStatus: 429, responseBytes });
          return;
        }
        const responseBytes = writeJson(response, 404, { status: "not_found" });
        finishLog({ status: "not_found", httpStatus: 404, responseBytes });
        return;
      }

      const origin = request.headers.origin;
      if (origin !== undefined && !allowedOrigins.includes(origin)) {
        const addressRate = limiter.checkUnauthenticated(sourceAddress);
        if (!addressRate.ok) {
          const responseBytes = writeRateLimited(response, addressRate.retryAfterSeconds);
          finishLog({ status: "rate_limited", httpStatus: 429, responseBytes });
          return;
        }
        const responseBytes = writeJson(response, contract.originPolicy.invalidOriginStatus, { status: "forbidden" });
        finishLog({ status: "invalid_origin", httpStatus: contract.originPolicy.invalidOriginStatus, responseBytes });
        return;
      }

      principal = await authorize({ authorizationHeader: request.headers.authorization ?? null });
      if (!validPrincipal(principal)) {
        const addressRate = limiter.checkUnauthenticated(sourceAddress);
        if (!addressRate.ok) {
          const responseBytes = writeRateLimited(response, addressRate.retryAfterSeconds);
          finishLog({ status: "rate_limited", httpStatus: 429, responseBytes });
          return;
        }
        response.setHeader("WWW-Authenticate", `Bearer realm="architrino-loopback", scope="${LOOPBACK_REQUIRED_SCOPE}"`);
        const responseBytes = writeJson(response, 401, { status: "unauthorized" });
        finishLog({ status: "unauthorized", httpStatus: 401, responseBytes });
        return;
      }
      principalLease = limiter.acquirePrincipal(principal.principalId);
      if (!principalLease.ok) {
        const responseBytes = writeRateLimited(response, principalLease.retryAfterSeconds);
        finishLog({ status: "rate_limited", httpStatus: 429, responseBytes });
        return;
      }
      if (!principal.scopes.includes(LOOPBACK_REQUIRED_SCOPE)) {
        response.setHeader("WWW-Authenticate", `Bearer error="insufficient_scope", scope="${LOOPBACK_REQUIRED_SCOPE}"`);
        const responseBytes = writeJson(response, 403, { status: "insufficient_scope" });
        finishLog({ status: "insufficient_scope", httpStatus: 403, responseBytes });
        return;
      }

      if (request.method === "GET" || request.method === "DELETE") {
        if (request.headers["mcp-protocol-version"] !== MCP_PROTOCOL_VERSION) {
          const responseBytes = writeJson(response, contract.protocol.unsupportedProtocolVersionStatus, { status: "unsupported_protocol_version" });
          finishLog({ status: "unsupported_protocol_version", httpStatus: contract.protocol.unsupportedProtocolVersionStatus, responseBytes });
          return;
        }
        response.setHeader("Allow", "POST");
        const responseBytes = writeJson(response, 405, { status: "method_not_allowed" });
        finishLog({ status: "method_not_allowed", httpStatus: 405, responseBytes });
        return;
      }
      if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        const responseBytes = writeJson(response, 405, { status: "method_not_allowed" });
        finishLog({ status: "method_not_allowed", httpStatus: 405, responseBytes });
        return;
      }

      const contentType = String(request.headers["content-type"] ?? "").toLowerCase();
      if (!contentType.startsWith("application/json")) {
        const responseBytes = writeJson(response, 415, { status: "unsupported_media_type" });
        finishLog({ status: "unsupported_media_type", httpStatus: 415, responseBytes });
        return;
      }
      const accept = String(request.headers.accept ?? "").toLowerCase();
      if (!accept.includes("application/json") || !accept.includes("text/event-stream")) {
        const responseBytes = writeJson(response, 406, { status: "not_acceptable" });
        finishLog({ status: "not_acceptable", httpStatus: 406, responseBytes });
        return;
      }

      let body;
      try {
        const bodyResult = await readBoundedBody(request, contract.limits.maxRequestBytes, contract.limits.requestTimeoutMs);
        body = bodyResult.body;
        requestBytes = bodyResult.bytes;
      } catch (error) {
        const status = error.code === "REQUEST_TOO_LARGE" ? 413 : 408;
        const responseBytes = writeJson(response, status, { status: error.code === "REQUEST_TOO_LARGE" ? "request_too_large" : "request_timeout" });
        finishLog({ status: error.code.toLowerCase(), httpStatus: status, responseBytes });
        return;
      }

      let message;
      try {
        message = JSON.parse(body);
      } catch {
        const rpcError = jsonRpcError(null, -32700, "Parse error");
        const responseBytes = writeJson(response, 400, rpcError);
        finishLog({ status: "parse_error", httpStatus: 400, responseBytes });
        return;
      }

      toolName = message?.method === "tools/call" && typeof message.params?.name === "string" ? message.params.name : undefined;
      if (message?.method !== "initialize" && request.headers["mcp-protocol-version"] !== MCP_PROTOCOL_VERSION) {
        const responseBytes = writeJson(response, contract.protocol.unsupportedProtocolVersionStatus, { status: "unsupported_protocol_version" });
        finishLog({ status: "unsupported_protocol_version", httpStatus: contract.protocol.unsupportedProtocolVersionStatus, responseBytes });
        return;
      }

      const rpcResponse = activeBundle.handler.handle(message);
      if (rpcResponse === null) {
        response.statusCode = 202;
        setCommonResponseHeaders(response);
        response.end();
        finishLog({ status: "accepted", httpStatus: 202, responseBytes: 0 });
        return;
      }

      let serialized = JSON.stringify(rpcResponse);
      if (Buffer.byteLength(serialized) > contract.limits.maxResponseBytes) {
        serialized = JSON.stringify(jsonRpcError(message?.id ?? null, -32001, "Response size limit exceeded"));
      }
      response.statusCode = 200;
      setCommonResponseHeaders(response);
      response.setHeader("Content-Type", "application/json; charset=utf-8");
      response.setHeader("Content-Length", Buffer.byteLength(serialized));
      response.end(serialized);
      finishLog({
        status: rpcResponse.error ? "json_rpc_error" : "ok",
        httpStatus: 200,
        responseBytes: Buffer.byteLength(serialized),
      });
    } finally {
      principalLease?.release();
    }
  }

  function computeReadiness() {
    const gates = Object.freeze({
      validatedSnapshot: true,
      freshSnapshot: activeBundle.snapshot.freshnessState === "fresh",
      configuredSnapshotHashMatch:
        activeBundle.snapshot.snapshotId === contract.snapshotPublication.candidateSnapshotId &&
        activeBundle.snapshot.snapshotSha256 === contract.snapshotPublication.candidateSnapshotSha256,
      originAllowlist: allowedOrigins.length > 0,
      authorization: typeof authorize === "function",
      rateLimiter: Boolean(limiter),
      safeLogging: typeof logSink === "function",
      rollbackCandidate: Boolean(rollbackBundle),
      rollbackCompatibility: compatibleSnapshots(activeBundle.snapshot, rollbackBundle.snapshot),
    });
    return Object.freeze({ ready: Object.values(gates).every(Boolean), gates });
  }

  function emitOperationalEvent(eventClass, fields = {}) {
    const event = { event_class: eventClass, ...fields };
    for (const key of Object.keys(event)) {
      requireCondition(SAFE_LOG_FIELDS.has(key), `unsafe log field rejected: ${key}`);
    }
    logSink(Object.freeze(event));
  }

  function principalPseudonym(principalId) {
    return crypto.createHmac("sha256", normalizedLogKey).update(principalId).digest("hex");
  }

  function buildBundle(snapshot) {
    const ownedSnapshot = deepFreeze(structuredClone(snapshot));
    assertSnapshotBundle(ownedSnapshot);
    return Object.freeze({
      snapshot: ownedSnapshot,
      handler: createStatelessMcpHandler({ snapshot: ownedSnapshot, accessScope: "public", serverInfo }),
    });
  }
}

export function createLoopbackRollbackFixture(snapshot) {
  assertSnapshotBundle(snapshot);
  const rollback = structuredClone(snapshot);
  rollback.snapshotId = `${snapshot.snapshotId}_rollback_fixture`;
  rollback.repositoryRef = `fixture-rollback:${snapshot.snapshotSha256}`;
  rollback.rollbackParent = null;
  delete rollback.snapshotSha256;
  rollback.snapshotSha256 = hashCanonical(rollback);
  assertSnapshotBundle(rollback);
  return rollback;
}

export function createStaticBearerAuthorizer({ token, principalId = "loopback-operator", scopes = [LOOPBACK_REQUIRED_SCOPE] }) {
  requireCondition(typeof token === "string" && token.length >= 16, "local bearer token must contain at least 16 characters");
  requireCondition(typeof principalId === "string" && principalId.length > 0, "principal id is required");
  requireCondition(Array.isArray(scopes) && scopes.every((scope) => typeof scope === "string"), "scopes must be strings");
  const expected = Buffer.from(`Bearer ${token}`);
  return async ({ authorizationHeader }) => {
    if (typeof authorizationHeader !== "string") return null;
    const actual = Buffer.from(authorizationHeader);
    if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null;
    return Object.freeze({ principalId, scopes: Object.freeze([...scopes]) });
  };
}

export class RequestLimiter {
  constructor({ limits, clock = () => Date.now() }) {
    this.limits = limits;
    this.clock = clock;
    this.addressMinutes = new Map();
    this.principalMinutes = new Map();
    this.principalBursts = new Map();
    this.activeByPrincipal = new Map();
  }

  checkUnauthenticated(address) {
    return incrementFixedWindow({
      map: this.addressMinutes,
      key: address,
      now: this.clock(),
      windowMs: 60000,
      limit: this.limits.maxUnauthenticatedRequestsPerMinutePerAddress,
    });
  }

  acquirePrincipal(principalId) {
    const now = this.clock();
    const minute = incrementFixedWindow({
      map: this.principalMinutes,
      key: principalId,
      now,
      windowMs: 60000,
      limit: this.limits.requestsPerMinutePerPrincipal,
    });
    if (!minute.ok) return { ...minute, release() {} };
    const burst = incrementFixedWindow({
      map: this.principalBursts,
      key: principalId,
      now,
      windowMs: 1000,
      limit: this.limits.burstRequestsPerPrincipal,
    });
    if (!burst.ok) return { ...burst, release() {} };
    const active = this.activeByPrincipal.get(principalId) ?? 0;
    if (active >= this.limits.maxConcurrentRequestsPerPrincipal) {
      return { ok: false, retryAfterSeconds: 1, release() {} };
    }
    this.activeByPrincipal.set(principalId, active + 1);
    let released = false;
    return {
      ok: true,
      retryAfterSeconds: 0,
      release: () => {
        if (released) return;
        released = true;
        const current = this.activeByPrincipal.get(principalId) ?? 1;
        if (current <= 1) this.activeByPrincipal.delete(principalId);
        else this.activeByPrincipal.set(principalId, current - 1);
      },
    };
  }
}

function incrementFixedWindow({ map, key, now, windowMs, limit }) {
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const current = map.get(key);
  const count = current?.windowStart === windowStart ? current.count + 1 : 1;
  map.set(key, { windowStart, count });
  if (count <= limit) return { ok: true, retryAfterSeconds: 0 };
  return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((windowStart + windowMs - now) / 1000)) };
}

async function readBoundedBody(request, maxBytes, timeoutMs) {
  const declaredLength = Number(request.headers["content-length"]);
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    request.resume();
    throw codedError("REQUEST_TOO_LARGE");
  }
  let timeout;
  const read = (async () => {
    const chunks = [];
    let bytes = 0;
    let tooLarge = false;
    for await (const chunk of request) {
      bytes += chunk.length;
      if (bytes > maxBytes) tooLarge = true;
      else if (!tooLarge) chunks.push(chunk);
    }
    if (tooLarge) throw codedError("REQUEST_TOO_LARGE");
    return { body: Buffer.concat(chunks).toString("utf8"), bytes };
  })();
  const timed = new Promise((_, reject) => {
    timeout = setTimeout(() => reject(codedError("REQUEST_TIMEOUT")), timeoutMs);
  });
  try {
    return await Promise.race([read, timed]);
  } finally {
    clearTimeout(timeout);
  }
}

function writeRateLimited(response, retryAfterSeconds) {
  response.setHeader("Retry-After", String(retryAfterSeconds));
  return writeJson(response, 429, { status: "rate_limited" });
}

function writeJson(response, status, value) {
  const body = JSON.stringify(value);
  const bytes = Buffer.byteLength(body);
  response.statusCode = status;
  setCommonResponseHeaders(response);
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Content-Length", bytes);
  response.end(body);
  return bytes;
}

function setCommonResponseHeaders(response) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
}

function parseLocalRequestUrl(value) {
  try {
    return new URL(value ?? "/", "http://127.0.0.1");
  } catch {
    return new URL("/invalid-request", "http://127.0.0.1");
  }
}

function validExactOrigins(origins) {
  if (!Array.isArray(origins) || origins.length === 0 || new Set(origins).size !== origins.length) return false;
  return origins.every((origin) => {
    if (typeof origin !== "string" || origin.includes("*")) return false;
    try {
      const parsed = new URL(origin);
      return parsed.protocol === "https:" && parsed.origin === origin && parsed.pathname === "/";
    } catch {
      return false;
    }
  });
}

function validPrincipal(principal) {
  return principal !== null && typeof principal === "object" &&
    typeof principal.principalId === "string" && principal.principalId.length > 0 &&
    Array.isArray(principal.scopes) && principal.scopes.every((scope) => typeof scope === "string");
}

function compatibleSnapshots(left, right) {
  if (!left || !right || left.snapshotId === right.snapshotId) return false;
  if (left.schema !== right.schema || left.visibilityPolicyVersion !== right.visibilityPolicyVersion) return false;
  for (const viewName of ["content", "search", "graph", "metadata"]) {
    if (left.views?.[viewName]?.schema !== right.views?.[viewName]?.schema) return false;
  }
  return true;
}

function normalizeLogKey(value) {
  const key = Buffer.isBuffer(value) ? value : Buffer.from(value);
  requireCondition(key.length >= 32, "safe log pseudonym key must contain at least 32 bytes");
  return key;
}

function snapshotLogFields(snapshot) {
  return {
    snapshot_id: snapshot.snapshotId,
    snapshot_sha256: snapshot.snapshotSha256,
  };
}

function codedError(code) {
  const error = new Error(code);
  error.code = code;
  return error;
}

function deepFreeze(value) {
  if (value === null || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.freeze(value);
  for (const child of Object.values(value)) deepFreeze(child);
  return value;
}

function defaultLogSink(event) {
  process.stderr.write(`${JSON.stringify(event)}\n`);
}

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}
