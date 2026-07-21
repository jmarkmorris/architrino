import { MCP_TOOL_LIMITS } from "./tool-contract-v1.mjs";

export const MCP_REMOTE_DEPLOYMENT_CONTRACT_SCHEMA = "archie-mcp-remote-deployment-contract/v1";
export const MCP_REMOTE_DEPLOYMENT_NEGATIVE_SUITE_SCHEMA = "archie-mcp-remote-deployment-negative-suite/v1";

const EXPECTED_TOOLS = ["search", "read", "topics", "neighbors"];
const REQUIRED_READINESS_GATES = [
  "validated_snapshot",
  "fresh_snapshot",
  "configured_snapshot_hash_match",
  "origin_allowlist",
  "authorization",
  "rate_limiter",
  "safe_logging",
  "rollback_candidate",
];
const REQUIRED_FORBIDDEN_LOG_FIELDS = [
  "authorization_header",
  "access_token",
  "cookie",
  "raw_query",
  "raw_arguments",
  "raw_result_content",
  "source_content",
  "private_prompt",
  "provider_payload",
  "credential",
  "raw_log",
];
const SAFE_LOG_FIELDS = [
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
];

export function validateMcpRemoteDeploymentContract({ contract, candidateSnapshot }) {
  const errors = [];
  const add = (code, message) => errors.push({ code, message });

  if (contract?.schema !== MCP_REMOTE_DEPLOYMENT_CONTRACT_SCHEMA) {
    add("CONTRACT_SCHEMA_MISMATCH", "remote deployment contract schema is not v1");
    return errors;
  }

  if (contract.deploymentState !== "fixture_only" || contract.publicDeploymentAuthorized !== false) {
    add("PUBLIC_DEPLOYMENT_FORBIDDEN", "this contract fixture must not authorize a public deployment");
  }

  if (contract.protocol?.revision !== "2025-11-25" || contract.protocol?.transport !== "streamable_http") {
    add("TRANSPORT_MISMATCH", "remote V1 requires MCP 2025-11-25 Streamable HTTP");
  }
  if (contract.protocol?.endpointPath !== "/mcp") {
    add("MCP_ENDPOINT_MISMATCH", "remote V1 exposes one MCP endpoint at /mcp");
  }
  if (
    contract.protocol?.postRequestBody !== "single_json_rpc_message" ||
    !sameMembers(contract.protocol?.postAcceptTypes, ["application/json", "text/event-stream"]) ||
    !sameMembers(contract.protocol?.postResponseModes, ["application/json"])
  ) {
    add("HTTP_MESSAGE_CONTRACT_MISMATCH", "POST must accept the MCP media types and return one JSON response");
  }
  if (
    contract.protocol?.getMode !== "method_not_allowed_405" ||
    contract.protocol?.deleteMode !== "method_not_allowed_405" ||
    contract.protocol?.sessionMode !== "stateless"
  ) {
    add("UNSUPPORTED_STREAMING_MODE", "remote V1 is stateless and does not open or resume SSE streams");
  }
  if (
    contract.protocol?.protocolVersionHeaderRequiredAfterInitialization !== true ||
    contract.protocol?.unsupportedProtocolVersionStatus !== 400
  ) {
    add("PROTOCOL_VERSION_GATE_MISSING", "subsequent requests must carry a supported MCP protocol version");
  }

  if (contract.networkBoundary?.localBindAddress !== "127.0.0.1" || contract.networkBoundary?.directPublicBindAllowed !== false) {
    add("NETWORK_BINDING_UNSAFE", "the service process must bind to loopback behind a configured ingress");
  }
  if (contract.networkBoundary?.tlsRequiredAtIngress !== true) {
    add("REMOTE_TLS_REQUIRED", "remote ingress must terminate TLS");
  }

  if (contract.originPolicy?.validationRequired !== true || contract.originPolicy?.invalidOriginStatus !== 403) {
    add("ORIGIN_VALIDATION_REQUIRED", "invalid origins must fail with HTTP 403");
  }
  if (contract.originPolicy?.wildcardsAllowed !== false) {
    add("ORIGIN_WILDCARD_FORBIDDEN", "origin matching must use an exact allowlist without wildcards");
  }
  if (!validOrigins(contract.originPolicy?.allowedOrigins)) {
    add("ORIGIN_ALLOWLIST_INVALID", "configured origins must be unique exact HTTPS origins without paths or wildcards");
  }
  if (contract.originPolicy?.missingOriginPolicy !== "allow_only_after_authentication") {
    add("MISSING_ORIGIN_POLICY_UNSAFE", "an absent Origin may proceed only after authentication");
  }

  if (contract.authorization?.requiredForRemote !== true) {
    add("REMOTE_AUTH_REQUIRED", "all remote MCP connections require authorization");
  }
  if (
    contract.authorization?.profile !== "oauth_2_1_protected_resource" ||
    contract.authorization?.protectedResourceMetadataRequired !== true ||
    contract.authorization?.bearerHeaderOnly !== true ||
    contract.authorization?.audienceValidationRequired !== true ||
    !sameMembers(contract.authorization?.requiredScopes, ["architrino:mcp:read"])
  ) {
    add("AUTHORIZATION_PROFILE_MISMATCH", "remote V1 requires one least-privilege read scope and resource-server validation");
  }
  if (contract.authorization?.queryTokensAllowed !== false) {
    add("QUERY_TOKEN_FORBIDDEN", "access tokens must never enter a URI query string");
  }
  if (contract.authorization?.tokenPassthroughAllowed !== false) {
    add("TOKEN_PASSTHROUGH_FORBIDDEN", "the MCP server must validate tokens issued for its own audience");
  }

  if (!boundedPositiveInteger(contract.limits?.maxRequestBytes, 1024, 1048576) ||
      !boundedPositiveInteger(contract.limits?.requestTimeoutMs, 1000, 60000) ||
      !boundedPositiveInteger(contract.limits?.requestsPerMinutePerPrincipal, 1, 1000) ||
      !boundedPositiveInteger(contract.limits?.burstRequestsPerPrincipal, 1, 100) ||
      !boundedPositiveInteger(contract.limits?.maxConcurrentRequestsPerPrincipal, 1, 32) ||
      !boundedPositiveInteger(contract.limits?.maxUnauthenticatedRequestsPerMinutePerAddress, 1, 100)) {
    add("INVALID_REQUEST_LIMIT", "request size, time, rate, burst, and concurrency limits must be finite positive integers");
  }
  if (contract.limits?.maxResponseBytes !== MCP_TOOL_LIMITS.maxResponseBytes) {
    add("TOOL_RESPONSE_LIMIT_MISMATCH", "the transport response ceiling must preserve the tool-contract byte ceiling");
  }

  if (
    contract.logging?.rawRequestBodyAllowed !== false ||
    contract.logging?.rawResponseBodyAllowed !== false ||
    contract.logging?.queryTextAllowed !== false ||
    contract.logging?.sourceContentAllowed !== false ||
    contract.logging?.credentialsAllowed !== false ||
    !sameMembers(contract.logging?.safeFields, SAFE_LOG_FIELDS) ||
    !containsAll(contract.logging?.forbiddenFields, REQUIRED_FORBIDDEN_LOG_FIELDS)
  ) {
    add("SENSITIVE_LOGGING_FORBIDDEN", "logs must omit credentials, raw arguments, queries, source content, and response bodies");
  }

  if (
    contract.health?.livenessPath !== "/health/live" ||
    contract.health?.readinessPath !== "/health/ready" ||
    contract.health?.publicDetail !== "status_only" ||
    contract.health?.readinessFailureStatus !== 503 ||
    !sameMembers(contract.health?.readinessRequires, REQUIRED_READINESS_GATES)
  ) {
    add("HEALTH_CONTRACT_MISMATCH", "readiness must fail closed on every deployment gate without exposing diagnostics");
  }

  if (contract.snapshotPublication?.repositoryReadDuringRequest !== false) {
    add("REQUEST_REPOSITORY_READ_FORBIDDEN", "remote requests may consult only the validated in-memory snapshot");
  }
  if (contract.snapshotPublication?.writeDuringRequest !== false) {
    add("REQUEST_WRITE_FORBIDDEN", "remote requests may not write files or repository content");
  }
  if (
    contract.snapshotPublication?.loadMode !== "startup_once" ||
    contract.snapshotPublication?.activationMode !== "atomic_pointer_swap" ||
    contract.snapshotPublication?.validateBeforeActivation !== true
  ) {
    add("ATOMIC_ACTIVATION_REQUIRED", "a snapshot must validate fully before an atomic active-pointer swap");
  }
  if (contract.snapshotPublication?.acceptedMainRequiredForRemote !== true) {
    add("ACCEPTED_MAIN_REQUIRED", "a remote snapshot must identify an accepted main source state");
  }
  if (!snapshotMatches(contract.snapshotPublication, candidateSnapshot)) {
    add("SNAPSHOT_IDENTITY_MISMATCH", "the contract candidate id, hash, and repository ref must match the fixture snapshot");
  }

  if (
    contract.rollback?.requiredBeforeRemoteReady !== true ||
    contract.rollback?.compatibilitySmokeRequired !== true ||
    contract.rollback?.restoreMode !== "atomic_pointer_swap"
  ) {
    add("ROLLBACK_REQUIRED", "remote readiness requires a compatible rollback candidate and atomic restore path");
  }

  if (
    !sameMembers(contract.capabilityBoundary?.tools, EXPECTED_TOOLS) ||
    contract.capabilityBoundary?.resourcesEnabled !== false ||
    contract.capabilityBoundary?.promptsEnabled !== false ||
    contract.capabilityBoundary?.modelCallsAllowed !== false ||
    contract.capabilityBoundary?.repositoryWritesAllowed !== false ||
    contract.capabilityBoundary?.externalActionsAllowed !== false ||
    contract.capabilityBoundary?.durableUserStateAllowed !== false
  ) {
    add("CAPABILITY_BOUNDARY_VIOLATION", "remote V1 is limited to the four read-only tools and has no model, write, action, or durable-state surface");
  }

  const readinessOpen =
    contract.networkBoundary?.tlsConfigured !== true ||
    contract.networkBoundary?.trustedProxyConfigured !== true ||
    contract.originPolicy?.exactAllowlistConfigured !== true ||
    !Array.isArray(contract.originPolicy?.allowedOrigins) ||
    contract.originPolicy.allowedOrigins.length === 0 ||
    contract.authorization?.authorizationServerConfigured !== true ||
    contract.snapshotPublication?.candidateIsAcceptedMain !== true ||
    contract.rollback?.candidateConfigured !== true ||
    contract.rollback?.lastSmokeStatus !== "pass";
  if (contract.remoteReady === true && readinessOpen) {
    add("REMOTE_READINESS_GATES_OPEN", "remoteReady cannot be true while any deployment-hardening gate remains open");
  }

  return deduplicateErrors(errors);
}

export function applyFixtureMutation(value, dottedPath, replacement) {
  const clone = structuredClone(value);
  const parts = dottedPath.split(".");
  let cursor = clone;
  for (const part of parts.slice(0, -1)) {
    if (!cursor || typeof cursor !== "object" || !(part in cursor)) {
      throw new Error(`unknown mutation path: ${dottedPath}`);
    }
    cursor = cursor[part];
  }
  const last = parts.at(-1);
  if (!cursor || typeof cursor !== "object" || !(last in cursor)) {
    throw new Error(`unknown mutation path: ${dottedPath}`);
  }
  cursor[last] = structuredClone(replacement);
  return clone;
}

function snapshotMatches(publication, snapshot) {
  return snapshot?.schema === "archie-source-index-snapshot/v1" &&
    publication?.candidateSnapshotId === snapshot.snapshotId &&
    publication?.candidateSnapshotSha256 === snapshot.snapshotSha256 &&
    publication?.candidateRepositoryRef === snapshot.repositoryRef &&
    snapshot.freshnessState === "fresh";
}

function sameMembers(actual, expected) {
  return Array.isArray(actual) && new Set(actual).size === actual.length &&
    actual.length === expected.length && expected.every((entry) => actual.includes(entry));
}

function containsAll(actual, expected) {
  return Array.isArray(actual) && expected.every((entry) => actual.includes(entry));
}

function boundedPositiveInteger(value, minimum, maximum) {
  return Number.isInteger(value) && value >= minimum && value <= maximum;
}

function validOrigins(origins) {
  if (!Array.isArray(origins) || new Set(origins).size !== origins.length) return false;
  return origins.every((origin) => {
    if (origin.includes("*")) return false;
    try {
      const parsed = new URL(origin);
      return parsed.protocol === "https:" && parsed.origin === origin && parsed.pathname === "/";
    } catch {
      return false;
    }
  });
}

function deduplicateErrors(errors) {
  const seen = new Set();
  return errors.filter((error) => {
    if (seen.has(error.code)) return false;
    seen.add(error.code);
    return true;
  });
}
