import { Buffer } from "node:buffer";
import { canonicalJson, hashCanonical } from "../source-index/snapshot-v1.mjs";

export const MCP_TOOL_REQUEST_SCHEMA = "archie-mcp-tool-request/v1";
export const MCP_TOOL_RESPONSE_SCHEMA = "archie-mcp-tool-response/v1";
export const MCP_TOOL_CONTRACT_SCHEMA = "archie-mcp-tool-contract/v1";
export const MCP_TOOL_NEGATIVE_SUITE_SCHEMA = "archie-mcp-tool-negative-suite/v1";

export const MCP_TOOL_LIMITS = Object.freeze({
  search: Object.freeze({ defaultItems: 10, maxItems: 20 }),
  read: Object.freeze({ defaultContentChars: 4000, minContentChars: 256, maxContentChars: 8000 }),
  topics: Object.freeze({ defaultItems: 10, maxItems: 20 }),
  neighbors: Object.freeze({ defaultItems: 10, maxItems: 20 }),
  maxQueryChars: 256,
  maxIdentifierChars: 512,
  maxResponseBytes: 32768,
});

const TOOLS = new Set(["search", "read", "topics", "neighbors"]);
const VISIBILITY_SCOPES = new Set(["public", "operator_developer"]);
const SOURCE_CLASSES = new Set([
  "published_corpus",
  "generated_reading_copy",
  "scene_route",
  "app_guide",
  "archie_reference",
  "priority_material",
  "external_prior_physics",
]);
const AUTHORITIES = new Set([
  "primary",
  "routing_only",
  "diagnostic",
  "priority_only",
  "comparison_only",
  "excluded",
  "unsupported",
]);
const EDGE_TYPES = new Set(["routes_to", "mirrors", "related", "prerequisite", "contains", "depends_on"]);
const DIRECTIONS = new Set(["outgoing", "incoming", "both"]);
const TOPIC_SOURCE_CLASSES = new Set([
  "published_corpus",
  "app_guide",
  "archie_reference",
  "priority_material",
  "external_prior_physics",
]);

export function executeMcpTool({ snapshot, request, accessScope = "public" }) {
  const baseError = validateEnvelope({ snapshot, request, accessScope });
  if (baseError) return baseError;

  try {
    const response = TOOL_HANDLERS[request.tool]({ snapshot, request });
    if (responseByteLength(response) > MCP_TOOL_LIMITS.maxResponseBytes) {
      return errorResponse({
        snapshot,
        request,
        status: "response_limit_exceeded",
        code: "RESPONSE_BYTE_LIMIT",
        message: `response exceeds ${MCP_TOOL_LIMITS.maxResponseBytes} bytes`,
      });
    }
    return response;
  } catch (error) {
    if (error instanceof ContractError) {
      return errorResponse({
        snapshot,
        request,
        status: error.status,
        code: error.code,
        message: error.message,
      });
    }
    throw error;
  }
}

export function assertMcpToolPair({ snapshot, request, response, accessScope = "public" }) {
  const actual = executeMcpTool({ snapshot, request, accessScope });
  requireCondition(
    canonicalJson(actual) === canonicalJson(response),
    `${request.requestId}: response does not match mcp-tool-contract/v1 semantics`
  );
  return true;
}

const TOOL_HANDLERS = {
  search: executeSearch,
  read: executeRead,
  topics: executeTopics,
  neighbors: executeNeighbors,
};

function executeSearch({ snapshot, request }) {
  const args = request.arguments;
  requireExactKeys(args, ["cursor", "filters", "limit", "query"], "search arguments");
  requireString(args.query, "search query", 1, MCP_TOOL_LIMITS.maxQueryChars);
  validateFilters(args.filters);
  validateLimit(args.limit, MCP_TOOL_LIMITS.search.maxItems, "search limit");

  const scope = cursorScope(request);
  const offset = decodeCursorOffset({ cursor: args.cursor, request, scope });
  const visibleRecords = snapshot.views.search.records
    .filter((record) => isVisible(record, request.visibilityScope))
    .filter((record) => matchesFilters(record, args.filters));
  const ranked = visibleRecords
    .map((record) => scoreSearchRecord(record, args.query))
    .filter((entry) => entry.rankScore > 0)
    .sort((left, right) => right.rankScore - left.rankScore || left.source.sourceId.localeCompare(right.source.sourceId));
  const page = ranked.slice(offset, offset + args.limit).map((entry, index) => ({
    rank: offset + index + 1,
    rankScore: entry.rankScore,
    matchReasons: entry.matchReasons,
    source: sourceChip(entry.source),
    teaser: entry.source.searchText.slice(0, 240),
  }));

  return successResponse({
    snapshot,
    request,
    result: { kind: "search", query: args.query, records: page },
    page: recordPage({ request, scope, offset, limit: args.limit, returned: page.length, total: ranked.length }),
  });
}

function executeRead({ snapshot, request }) {
  const args = request.arguments;
  requireExactKeys(
    args,
    ["cursor", "includeMetadata", "maxContentChars", "sectionAnchor", "topicOrRoute"],
    "read arguments"
  );
  requireString(args.topicOrRoute, "read topicOrRoute", 1, MCP_TOOL_LIMITS.maxIdentifierChars);
  requireNullableString(args.sectionAnchor, "read sectionAnchor", MCP_TOOL_LIMITS.maxIdentifierChars);
  requireCondition(typeof args.includeMetadata === "boolean", "read includeMetadata must be boolean");
  requireIntegerRange(
    args.maxContentChars,
    MCP_TOOL_LIMITS.read.minContentChars,
    MCP_TOOL_LIMITS.read.maxContentChars,
    "read maxContentChars"
  );

  const record = findRecord(snapshot, args.topicOrRoute, args.sectionAnchor);
  if (!record) {
    return errorResponse({
      snapshot,
      request,
      status: "not_found",
      code: "SOURCE_NOT_FOUND",
      message: "requested source or route is not present in the active snapshot",
    });
  }
  if (!isVisible(record, request.visibilityScope)) {
    return errorResponse({
      snapshot,
      request,
      status: "excluded_visibility",
      code: "SOURCE_VISIBILITY_EXCLUDED",
      message: "requested source is outside the authorized visibility scope",
    });
  }

  const contentRecord = snapshot.views.content.records.find((entry) => entry.sourceId === record.sourceId);
  requireCondition(Boolean(contentRecord), `${record.sourceId}: snapshot content record is missing`);
  const scope = cursorScope(request);
  const offset = decodeCursorOffset({ cursor: args.cursor, request, scope });
  const characters = Array.from(contentRecord.content);
  if (offset > characters.length) {
    throw new ContractError("invalid_cursor", "CURSOR_OFFSET_OUT_OF_RANGE", "cursor offset exceeds source length");
  }
  const chunk = characters.slice(offset, offset + args.maxContentChars).join("");
  const returned = Array.from(chunk).length;
  const nextOffset = offset + returned;
  const truncated = nextOffset < characters.length;
  const metadata = args.includeMetadata
    ? snapshot.views.metadata.records.filter((entry) => entry.sourceId === record.sourceId)
    : [];

  return successResponse({
    snapshot,
    request,
    result: {
      kind: "read",
      source: sourceChip(record),
      contentType: contentRecord.contentType,
      content: chunk,
      contentOffset: offset,
      contentComplete: !truncated,
      metadata,
    },
    page: {
      unit: "characters",
      limit: args.maxContentChars,
      returned,
      nextCursor: truncated ? encodeCursor({ request, scope, offset: nextOffset }) : null,
      truncated,
      truncationReasons: truncated ? ["content_char_limit"] : [],
    },
  });
}

function executeTopics({ snapshot, request }) {
  const args = request.arguments;
  requireExactKeys(args, ["cursor", "filters", "limit"], "topics arguments");
  validateFilters(args.filters);
  validateLimit(args.limit, MCP_TOOL_LIMITS.topics.maxItems, "topics limit");
  const scope = cursorScope(request);
  const offset = decodeCursorOffset({ cursor: args.cursor, request, scope });
  const records = snapshot.views.search.records
    .filter((record) => TOPIC_SOURCE_CLASSES.has(record.sourceClass))
    .filter((record) => isVisible(record, request.visibilityScope))
    .filter((record) => matchesFilters(record, args.filters))
    .sort((left, right) => left.title.localeCompare(right.title) || left.sourceId.localeCompare(right.sourceId));
  const page = records.slice(offset, offset + args.limit).map(sourceChip);
  return successResponse({
    snapshot,
    request,
    result: { kind: "topics", records: page },
    page: recordPage({ request, scope, offset, limit: args.limit, returned: page.length, total: records.length }),
  });
}

function executeNeighbors({ snapshot, request }) {
  const args = request.arguments;
  requireExactKeys(args, ["cursor", "direction", "edgeTypes", "limit", "topicOrRoute"], "neighbors arguments");
  requireString(args.topicOrRoute, "neighbors topicOrRoute", 1, MCP_TOOL_LIMITS.maxIdentifierChars);
  requireArrayOfAllowed(args.edgeTypes, EDGE_TYPES, "neighbors edgeTypes");
  requireCondition(DIRECTIONS.has(args.direction), "neighbors direction is unsupported");
  validateLimit(args.limit, MCP_TOOL_LIMITS.neighbors.maxItems, "neighbors limit");

  const origin = findRecord(snapshot, args.topicOrRoute, null);
  if (!origin) {
    return errorResponse({
      snapshot,
      request,
      status: "not_found",
      code: "SOURCE_NOT_FOUND",
      message: "requested graph origin is not present in the active snapshot",
    });
  }
  if (!isVisible(origin, request.visibilityScope)) {
    return errorResponse({
      snapshot,
      request,
      status: "excluded_visibility",
      code: "SOURCE_VISIBILITY_EXCLUDED",
      message: "requested graph origin is outside the authorized visibility scope",
    });
  }

  const recordById = new Map(snapshot.views.search.records.map((record) => [record.sourceId, record]));
  const scope = cursorScope(request);
  const offset = decodeCursorOffset({ cursor: args.cursor, request, scope });
  const neighbors = [];
  for (const edge of snapshot.views.graph.edges) {
    if (args.edgeTypes.length > 0 && !args.edgeTypes.includes(edge.edgeType)) continue;
    const outgoing = edge.from === origin.sourceId;
    const incoming = edge.to === origin.sourceId;
    if (args.direction === "outgoing" && !outgoing) continue;
    if (args.direction === "incoming" && !incoming) continue;
    if (args.direction === "both" && !outgoing && !incoming) continue;
    const neighborId = outgoing ? edge.to : edge.from;
    const neighbor = recordById.get(neighborId);
    const evidence = recordById.get(edge.evidenceSourceId);
    if (!neighbor || !evidence) continue;
    if (!isVisible(neighbor, request.visibilityScope) || !isVisible(evidence, request.visibilityScope)) continue;
    neighbors.push({
      edgeId: edge.edgeId,
      edgeType: edge.edgeType,
      direction: outgoing ? "outgoing" : "incoming",
      evidenceSourceId: edge.evidenceSourceId,
      neighbor: sourceChip(neighbor),
    });
  }
  neighbors.sort((left, right) => left.edgeId.localeCompare(right.edgeId));
  const page = neighbors.slice(offset, offset + args.limit);
  return successResponse({
    snapshot,
    request,
    result: { kind: "neighbors", origin: sourceChip(origin), records: page },
    page: recordPage({ request, scope, offset, limit: args.limit, returned: page.length, total: neighbors.length }),
  });
}

function validateEnvelope({ snapshot, request, accessScope }) {
  const safeRequest = request && typeof request === "object" ? request : {};
  const tool = TOOLS.has(safeRequest.tool) ? safeRequest.tool : "search";
  const requestForError = {
    requestId: typeof safeRequest.requestId === "string" && safeRequest.requestId ? safeRequest.requestId : "invalid-request",
    tool,
  };
  try {
    requireExactKeys(safeRequest, ["arguments", "requestId", "schema", "snapshotId", "tool", "visibilityScope"], "request");
    requireCondition(safeRequest.schema === MCP_TOOL_REQUEST_SCHEMA, "request has incompatible schema");
    requireString(safeRequest.requestId, "requestId", 1, 128);
    requireCondition(TOOLS.has(safeRequest.tool), "request tool is unsupported");
    requireString(safeRequest.snapshotId, "snapshotId", 1, 256);
    requireCondition(VISIBILITY_SCOPES.has(safeRequest.visibilityScope), "request visibilityScope is unsupported");
    requireCondition(safeRequest.arguments && typeof safeRequest.arguments === "object" && !Array.isArray(safeRequest.arguments), "request arguments must be an object");
  } catch (error) {
    return errorResponse({
      snapshot,
      request: requestForError,
      status: "invalid_request",
      code: "INVALID_REQUEST",
      message: error.message,
    });
  }
  if (safeRequest.snapshotId !== snapshot.snapshotId) {
    return errorResponse({
      snapshot,
      request: safeRequest,
      status: "incompatible_snapshot",
      code: "SNAPSHOT_ID_MISMATCH",
      message: "request snapshotId does not match the active snapshot",
    });
  }
  if (!["fresh", "rollback_snapshot"].includes(snapshot.freshnessState)) {
    return errorResponse({
      snapshot,
      request: safeRequest,
      status: "stale_snapshot",
      code: "SNAPSHOT_NOT_FRESH",
      message: "active snapshot is not eligible for MCP retrieval",
    });
  }
  if (safeRequest.visibilityScope === "operator_developer" && accessScope !== "operator_developer") {
    return errorResponse({
      snapshot,
      request: safeRequest,
      status: "forbidden_visibility",
      code: "VISIBILITY_SCOPE_FORBIDDEN",
      message: "operator_developer visibility requires an authorized service context",
    });
  }
  return null;
}

function successResponse({ snapshot, request, result, page }) {
  return {
    schema: MCP_TOOL_RESPONSE_SCHEMA,
    requestId: request.requestId,
    tool: request.tool,
    status: "ok",
    snapshot: snapshotProvenance(snapshot),
    result,
    page,
    error: null,
  };
}

function errorResponse({ snapshot, request, status, code, message }) {
  return {
    schema: MCP_TOOL_RESPONSE_SCHEMA,
    requestId: request.requestId,
    tool: request.tool,
    status,
    snapshot: snapshotProvenance(snapshot),
    result: null,
    page: null,
    error: { code, message, retriable: ["stale_snapshot", "response_limit_exceeded"].includes(status) },
  };
}

function snapshotProvenance(snapshot) {
  return {
    snapshotId: snapshot.snapshotId,
    snapshotSha256: snapshot.snapshotSha256,
    repositoryRef: snapshot.repositoryRef,
    visibilityPolicyVersion: snapshot.visibilityPolicyVersion,
    freshnessState: snapshot.freshnessState,
  };
}

function sourceChip(record) {
  return {
    sourceId: record.sourceId,
    title: record.title,
    route: record.route,
    sectionAnchor: record.sectionAnchor,
    sourceClass: record.sourceClass,
    authorityStatus: record.authorityStatus,
    visibility: record.visibility,
    canonicalParent: record.canonicalParent,
    claimLabelFloor: record.claimLabelFloor,
    selectionSha256: record.selectionSha256,
  };
}

function findRecord(snapshot, topicOrRoute, sectionAnchor) {
  return snapshot.views.search.records.find((record) => {
    const anchorSuffix = record.sectionAnchor === null ? null : `#${record.sectionAnchor}`;
    const routeWithoutAnchor =
      anchorSuffix !== null && record.route.endsWith(anchorSuffix)
        ? record.route.slice(0, -anchorSuffix.length)
        : null;
    const identityMatch =
      record.sourceId === topicOrRoute ||
      record.route === topicOrRoute ||
      (sectionAnchor !== null && routeWithoutAnchor === topicOrRoute);
    const sectionMatch = sectionAnchor === null || record.sectionAnchor === sectionAnchor;
    return identityMatch && sectionMatch;
  });
}

function isVisible(record, scope) {
  if (record.visibility === "excluded" || record.authorityStatus === "excluded") return false;
  if (scope === "public") return record.visibility === "public" && record.publicEligible === true;
  return ["public", "development_status", "operator_developer"].includes(record.visibility);
}

function matchesFilters(record, filters) {
  return (
    (filters.sourceClasses.length === 0 || filters.sourceClasses.includes(record.sourceClass)) &&
    (filters.authorityStatuses.length === 0 || filters.authorityStatuses.includes(record.authorityStatus))
  );
}

function scoreSearchRecord(record, query) {
  const normalizedQuery = normalize(query);
  const tokens = normalizedQuery.split(" ").filter(Boolean);
  const title = normalize(record.title);
  const aliases = record.aliases.map(normalize);
  const keywords = record.keywords.map(normalize);
  const sourceId = normalize(record.sourceId);
  const route = normalize(record.route);
  const searchText = normalize(record.searchText);
  let rankScore = 0;
  const matchReasons = [];
  if (title === normalizedQuery) add(400, "exact_title");
  else if (title.includes(normalizedQuery)) add(200, "title_phrase");
  if (aliases.some((value) => value === normalizedQuery)) add(180, "exact_alias");
  else if (aliases.some((value) => value.includes(normalizedQuery))) add(140, "alias_phrase");
  if (keywords.some((value) => value === normalizedQuery)) add(120, "exact_keyword");
  else if (keywords.some((value) => value.includes(normalizedQuery))) add(100, "keyword_phrase");
  if (sourceId.includes(normalizedQuery)) add(80, "source_id");
  if (route.includes(normalizedQuery)) add(80, "route");
  if (searchText.includes(normalizedQuery)) add(60, "content_phrase");
  if (tokens.length > 1 && tokens.every((token) => searchText.includes(token))) add(20, "all_query_terms");
  if (rankScore > 0) {
    const authorityPreference = {
      primary: 300,
      diagnostic: 150,
      priority_only: 50,
      comparison_only: 25,
      routing_only: 0,
      excluded: 0,
      unsupported: 0,
    }[record.authorityStatus];
    if (authorityPreference > 0) add(authorityPreference, "authority_preference");
  }
  return { source: record, rankScore, matchReasons };

  function add(score, reason) {
    rankScore += score;
    matchReasons.push(reason);
  }
}

function validateFilters(filters) {
  requireCondition(filters && typeof filters === "object" && !Array.isArray(filters), "filters must be an object");
  requireExactKeys(filters, ["authorityStatuses", "sourceClasses"], "filters");
  requireArrayOfAllowed(filters.sourceClasses, SOURCE_CLASSES, "filters sourceClasses");
  requireArrayOfAllowed(filters.authorityStatuses, AUTHORITIES, "filters authorityStatuses");
}

function validateLimit(value, maximum, label) {
  requireIntegerRange(value, 1, maximum, label);
}

function recordPage({ request, scope, offset, limit, returned, total }) {
  const nextOffset = offset + returned;
  const truncated = nextOffset < total;
  return {
    unit: "records",
    limit,
    returned,
    nextCursor: truncated ? encodeCursor({ request, scope, offset: nextOffset }) : null,
    truncated,
    truncationReasons: truncated ? ["record_limit"] : [],
  };
}

function cursorScope(request) {
  const args = { ...request.arguments, cursor: null };
  return hashCanonical({
    schema: request.schema,
    tool: request.tool,
    snapshotId: request.snapshotId,
    visibilityScope: request.visibilityScope,
    arguments: args,
  });
}

function encodeCursor({ request, scope, offset }) {
  const payload = {
    version: 1,
    snapshotId: request.snapshotId,
    tool: request.tool,
    visibilityScope: request.visibilityScope,
    scopeSha256: scope,
    offset,
  };
  return Buffer.from(canonicalJson({ ...payload, sha256: hashCanonical(payload) }), "utf8").toString("base64url");
}

function decodeCursorOffset({ cursor, request, scope }) {
  if (cursor === null) return 0;
  requireString(cursor, "cursor", 1, 2048);
  let decoded;
  try {
    decoded = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
  } catch {
    throw new ContractError("invalid_cursor", "CURSOR_MALFORMED", "cursor is not valid base64url canonical JSON");
  }
  const { sha256, ...payload } = decoded ?? {};
  if (hashCanonical(payload) !== sha256) {
    throw new ContractError("invalid_cursor", "CURSOR_HASH_MISMATCH", "cursor integrity hash does not match");
  }
  if (
    payload.version !== 1 ||
    payload.snapshotId !== request.snapshotId ||
    payload.tool !== request.tool ||
    payload.visibilityScope !== request.visibilityScope ||
    payload.scopeSha256 !== scope
  ) {
    throw new ContractError("invalid_cursor", "CURSOR_SCOPE_MISMATCH", "cursor is bound to a different request scope");
  }
  if (!Number.isInteger(payload.offset) || payload.offset < 0) {
    throw new ContractError("invalid_cursor", "CURSOR_OFFSET_INVALID", "cursor offset must be a nonnegative integer");
  }
  return payload.offset;
}

function responseByteLength(response) {
  return Buffer.byteLength(JSON.stringify(response), "utf8");
}

function normalize(value) {
  return value.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
}

function requireArrayOfAllowed(value, allowed, label) {
  requireCondition(Array.isArray(value), `${label} must be an array`);
  requireCondition(value.length <= 16, `${label} exceeds 16 entries`);
  requireCondition(new Set(value).size === value.length, `${label} contains duplicate entries`);
  for (const entry of value) {
    requireCondition(typeof entry === "string" && allowed.has(entry), `${label} contains unsupported value ${String(entry)}`);
  }
}

function requireExactKeys(value, expected, label) {
  requireCondition(value && typeof value === "object" && !Array.isArray(value), `${label} must be an object`);
  const actual = Object.keys(value).sort();
  const required = [...expected].sort();
  requireCondition(canonicalJson(actual) === canonicalJson(required), `${label} must contain exactly ${required.join(", ")}`);
}

function requireString(value, label, minimum, maximum) {
  requireCondition(typeof value === "string", `${label} must be a string`);
  const length = Array.from(value).length;
  requireCondition(length >= minimum && length <= maximum, `${label} length must be ${minimum}..${maximum}`);
}

function requireNullableString(value, label, maximum) {
  if (value === null) return;
  requireString(value, label, 1, maximum);
}

function requireIntegerRange(value, minimum, maximum, label) {
  requireCondition(Number.isInteger(value) && value >= minimum && value <= maximum, `${label} must be an integer in ${minimum}..${maximum}`);
}

function requireCondition(condition, message) {
  if (!condition) throw new ContractError("invalid_request", "INVALID_REQUEST", message);
}

class ContractError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}
