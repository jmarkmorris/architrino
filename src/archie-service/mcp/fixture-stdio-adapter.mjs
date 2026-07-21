import crypto from "node:crypto";
import {
  executeMcpTool,
  MCP_TOOL_LIMITS,
} from "./tool-contract-v1.mjs";
import {
  hashCanonical,
} from "../source-index/snapshot-v1.mjs";

export const MCP_PROTOCOL_VERSION = "2025-11-25";
export const MCP_FIXTURE_SERVER_NAME = "architrino-fixture-mcp";
export const MCP_FIXTURE_SERVER_VERSION = "0.1.0";
export const MCP_FULL_CORPUS_SERVER_NAME = "architrino-full-corpus-mcp";
export const MCP_FULL_CORPUS_SERVER_VERSION = "1.0.0-local";

const TOOL_NAMES = ["search", "read", "topics", "neighbors"];

export const MCP_TOOL_DEFINITIONS = Object.freeze([
  {
    name: "search",
    title: "Search Architrino sources",
    description: "Search the active immutable Architrino source snapshot. Returns bounded, source-grounded matches with authority and snapshot provenance.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["query"],
      properties: {
        query: { type: "string", minLength: 1, maxLength: MCP_TOOL_LIMITS.maxQueryChars },
        filters: { $ref: "#/$defs/filters" },
        limit: { type: "integer", minimum: 1, maximum: MCP_TOOL_LIMITS.search.maxItems, default: MCP_TOOL_LIMITS.search.defaultItems },
        cursor: { type: ["string", "null"], default: null },
      },
      $defs: sharedInputDefinitions(),
    },
    annotations: readOnlyAnnotations(),
    execution: { taskSupport: "forbidden" },
  },
  {
    name: "read",
    title: "Read an Architrino source",
    description: "Read an exact bounded content page from the active immutable snapshot by source id or exact route. Does not read repository source files per request.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["topicOrRoute"],
      properties: {
        topicOrRoute: { type: "string", minLength: 1, maxLength: MCP_TOOL_LIMITS.maxIdentifierChars },
        sectionAnchor: { type: ["string", "null"], default: null },
        maxContentChars: {
          type: "integer",
          minimum: MCP_TOOL_LIMITS.read.minContentChars,
          maximum: MCP_TOOL_LIMITS.read.maxContentChars,
          default: MCP_TOOL_LIMITS.read.defaultContentChars,
        },
        cursor: { type: ["string", "null"], default: null },
        includeMetadata: { type: "boolean", default: true },
      },
    },
    annotations: readOnlyAnnotations(),
    execution: { taskSupport: "forbidden" },
  },
  {
    name: "topics",
    title: "List Architrino topics",
    description: "List bounded, directly addressable non-routing records from the active immutable source snapshot.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        filters: { $ref: "#/$defs/filters" },
        limit: { type: "integer", minimum: 1, maximum: MCP_TOOL_LIMITS.topics.maxItems, default: MCP_TOOL_LIMITS.topics.defaultItems },
        cursor: { type: ["string", "null"], default: null },
      },
      $defs: sharedInputDefinitions(),
    },
    annotations: readOnlyAnnotations(),
    execution: { taskSupport: "forbidden" },
  },
  {
    name: "neighbors",
    title: "List direct Architrino neighbors",
    description: "Return only directly declared, typed graph edges from the active immutable snapshot. No relationship is inferred.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["topicOrRoute"],
      properties: {
        topicOrRoute: { type: "string", minLength: 1, maxLength: MCP_TOOL_LIMITS.maxIdentifierChars },
        edgeTypes: {
          type: "array",
          maxItems: 16,
          uniqueItems: true,
          items: { type: "string", enum: ["routes_to", "mirrors", "related", "prerequisite", "contains", "depends_on"] },
          default: [],
        },
        direction: { type: "string", enum: ["outgoing", "incoming", "both"], default: "both" },
        limit: { type: "integer", minimum: 1, maximum: MCP_TOOL_LIMITS.neighbors.maxItems, default: MCP_TOOL_LIMITS.neighbors.defaultItems },
        cursor: { type: ["string", "null"], default: null },
      },
    },
    annotations: readOnlyAnnotations(),
    execution: { taskSupport: "forbidden" },
  },
]);

export function createFixtureMcpSession({ snapshot, accessScope = "public" }) {
  return createMcpSession({ snapshot, accessScope });
}

export function createStatelessMcpHandler({
  snapshot,
  accessScope = "public",
  serverInfo = {
    name: MCP_FULL_CORPUS_SERVER_NAME,
    title: "Architrino Full Corpus MCP",
    version: MCP_FULL_CORPUS_SERVER_VERSION,
    description: "Read-only local MCP adapter over one validated full-corpus Architrino snapshot.",
  },
  expectedVisibilityPolicyVersion = null,
}) {
  assertSnapshotBundle(snapshot, { expectedVisibilityPolicyVersion });
  requireCondition(accessScope === "public", "local MCP adapter currently supports public access only");
  requireServerInfo(serverInfo);

  return {
    handle(message) {
      const envelopeError = validateJsonRpcEnvelope(message);
      if (envelopeError) return envelopeError;

      const isNotification = !Object.prototype.hasOwnProperty.call(message, "id");
      if (isNotification) return null;
      if (message.method === "ping") return jsonRpcResult(message.id, {});
      if (message.method === "initialize") {
        const paramsError = validateInitializeParams(message.params);
        if (paramsError) return jsonRpcError(message.id, -32602, paramsError);
        return initializeResult(message.id, serverInfo);
      }
      if (message.method === "tools/list") return handleToolsList(message);
      if (message.method === "tools/call") return handleToolCall({ message, snapshot, accessScope });
      return jsonRpcError(message.id, -32601, `Method not found: ${message.method}`);
    },
  };
}

export function createMcpSession({
  snapshot,
  accessScope = "public",
  serverInfo = {
    name: MCP_FIXTURE_SERVER_NAME,
    title: "Architrino Fixture MCP",
    version: MCP_FIXTURE_SERVER_VERSION,
    description: "Read-only local MCP adapter over one validated Architrino fixture snapshot.",
  },
  expectedVisibilityPolicyVersion = null,
}) {
  assertSnapshotBundle(snapshot, { expectedVisibilityPolicyVersion });
  requireCondition(accessScope === "public", "local MCP adapter currently supports public access only");
  requireServerInfo(serverInfo);
  let state = "new";

  return {
    handle(message) {
      const envelopeError = validateJsonRpcEnvelope(message);
      if (envelopeError) return envelopeError;

      const isNotification = !Object.prototype.hasOwnProperty.call(message, "id");
      if (isNotification) {
        if (message.method === "notifications/initialized" && state === "initializing") {
          state = "ready";
        }
        return null;
      }

      if (message.method === "ping") return jsonRpcResult(message.id, {});
      if (message.method === "initialize") {
        if (state !== "new") return jsonRpcError(message.id, -32600, "Server is already initialized");
        const paramsError = validateInitializeParams(message.params);
        if (paramsError) return jsonRpcError(message.id, -32602, paramsError);
        state = "initializing";
        return initializeResult(message.id, serverInfo);
      }

      if (state !== "ready") return jsonRpcError(message.id, -32002, "Server not initialized");
      if (message.method === "tools/list") return handleToolsList(message);
      if (message.method === "tools/call") return handleToolCall({ message, snapshot, accessScope });
      return jsonRpcError(message.id, -32601, `Method not found: ${message.method}`);
    },
  };
}

export function assertFixtureSnapshotBundle(snapshot) {
  return assertSnapshotBundle(snapshot);
}

export function assertSnapshotBundle(snapshot, { expectedVisibilityPolicyVersion = null } = {}) {
  requireCondition(snapshot?.schema === "archie-source-index-snapshot/v1", "snapshot has incompatible schema");
  requireCondition(snapshot.freshnessState === "fresh", "snapshot must be fresh");
  requireCondition(
    typeof snapshot.repositoryRef === "string" && snapshot.repositoryRef.length > 0,
    "snapshot lacks repository provenance"
  );
  requireCondition(
    typeof snapshot.visibilityPolicyVersion === "string" && snapshot.visibilityPolicyVersion.length > 0,
    "snapshot lacks a visibility policy version"
  );
  if (expectedVisibilityPolicyVersion !== null) {
    requireCondition(
      snapshot.visibilityPolicyVersion === expectedVisibilityPolicyVersion,
      "snapshot visibility policy version mismatch"
    );
  }
  const expectedViews = {
    content: "archie-source-content-view/v1",
    search: "archie-source-search-view/v1",
    graph: "archie-source-graph-view/v1",
    metadata: "archie-source-metadata-view/v1",
  };
  for (const [name, schema] of Object.entries(expectedViews)) {
    const view = snapshot.views?.[name];
    requireCondition(view?.schema === schema, `${name} view has incompatible schema`);
    const withoutHash = { ...view };
    delete withoutHash.sha256;
    requireCondition(hashCanonical(withoutHash) === view.sha256, `${name} view hash mismatch`);
  }
  const withoutSnapshotHash = { ...snapshot };
  delete withoutSnapshotHash.snapshotSha256;
  requireCondition(
    hashCanonical(withoutSnapshotHash) === snapshot.snapshotSha256,
    "fixture snapshot hash mismatch"
  );

  const sourceInputById = new Map(snapshot.sourceInputs.map((entry) => [entry.sourceId, entry]));
  const searchById = new Map(snapshot.views.search.records.map((entry) => [entry.sourceId, entry]));
  requireCondition(sourceInputById.size === snapshot.sourceInputs.length, "snapshot has duplicate source inputs");
  requireCondition(searchById.size === snapshot.views.search.records.length, "snapshot has duplicate search records");
  requireCondition(searchById.size === sourceInputById.size, "snapshot source/search counts differ");
  const countedRecords = Object.values(snapshot.sourceRecordCountByClass ?? {}).reduce(
    (total, count) => total + count,
    0
  );
  requireCondition(countedRecords === searchById.size, "snapshot source-class counts differ from records");

  for (const content of snapshot.views.content.records) {
    const sourceInput = sourceInputById.get(content.sourceId);
    const search = searchById.get(content.sourceId);
    requireCondition(Boolean(sourceInput && search), `${content.sourceId}: content provenance is missing`);
    requireCondition(sha256(content.content) === content.selectionSha256, `${content.sourceId}: content hash mismatch`);
    requireCondition(sourceInput.selectionSha256 === content.selectionSha256, `${content.sourceId}: source/content hash mismatch`);
    requireCondition(search.selectionSha256 === content.selectionSha256, `${content.sourceId}: search/content hash mismatch`);
  }
  for (const edge of snapshot.views.graph.edges) {
    requireCondition(searchById.has(edge.from), `${edge.edgeId}: graph from source is missing`);
    requireCondition(searchById.has(edge.to), `${edge.edgeId}: graph to source is missing`);
    requireCondition(searchById.has(edge.evidenceSourceId), `${edge.edgeId}: graph evidence source is missing`);
  }
  for (const metadata of snapshot.views.metadata.records) {
    requireCondition(searchById.has(metadata.sourceId), `${metadata.metadataId}: metadata source is missing`);
  }
  return true;
}

export function jsonRpcError(id, code, message, data) {
  const error = { code, message };
  if (data !== undefined) error.data = data;
  return { jsonrpc: "2.0", id: id ?? null, error };
}

function handleToolsList(message) {
  const params = message.params ?? {};
  if (!isPlainObject(params)) return jsonRpcError(message.id, -32602, "tools/list params must be an object");
  const keys = Object.keys(params);
  if (keys.some((key) => !["cursor", "_meta"].includes(key))) {
    return jsonRpcError(message.id, -32602, "tools/list has unsupported params");
  }
  if (params._meta !== undefined && !isPlainObject(params._meta)) {
    return jsonRpcError(message.id, -32602, "tools/list _meta must be an object");
  }
  if (params.cursor !== undefined && params.cursor !== null) {
    return jsonRpcError(message.id, -32602, "tool catalog has one page and does not accept a cursor");
  }
  return jsonRpcResult(message.id, { tools: MCP_TOOL_DEFINITIONS });
}

function handleToolCall({ message, snapshot, accessScope }) {
  const params = message.params;
  if (!isPlainObject(params) || typeof params.name !== "string" || !isPlainObject(params.arguments ?? {})) {
    return jsonRpcError(message.id, -32602, "tools/call requires name and object arguments");
  }
  const keys = Object.keys(params);
  if (keys.some((key) => !["name", "arguments", "_meta"].includes(key))) {
    return jsonRpcError(message.id, -32602, "tools/call has unsupported params");
  }
  if (params._meta !== undefined && !isPlainObject(params._meta)) {
    return jsonRpcError(message.id, -32602, "tools/call _meta must be an object");
  }
  if (!TOOL_NAMES.includes(params.name)) {
    return jsonRpcError(message.id, -32602, `Unknown tool: ${params.name}`);
  }
  let normalizedArguments;
  try {
    normalizedArguments = normalizeToolArguments(params.name, params.arguments ?? {});
  } catch (error) {
    return jsonRpcError(message.id, -32602, error.message);
  }
  const internalRequest = {
    schema: "archie-mcp-tool-request/v1",
    requestId: `mcp:${String(message.id)}`,
    tool: params.name,
    snapshotId: snapshot.snapshotId,
    visibilityScope: "public",
    arguments: normalizedArguments,
  };
  const toolResponse = executeMcpTool({ snapshot, request: internalRequest, accessScope });
  return jsonRpcResult(message.id, {
    content: [{ type: "text", text: JSON.stringify(toolResponse) }],
    structuredContent: toolResponse,
    isError: toolResponse.status !== "ok",
  });
}

function normalizeToolArguments(tool, args) {
  const specs = {
    search: {
      allowed: ["query", "filters", "limit", "cursor"],
      required: ["query"],
      build: () => ({
        query: args.query,
        filters: normalizeFilters(args.filters),
        limit: args.limit ?? MCP_TOOL_LIMITS.search.defaultItems,
        cursor: args.cursor ?? null,
      }),
    },
    read: {
      allowed: ["topicOrRoute", "sectionAnchor", "maxContentChars", "cursor", "includeMetadata"],
      required: ["topicOrRoute"],
      build: () => ({
        topicOrRoute: args.topicOrRoute,
        sectionAnchor: args.sectionAnchor ?? null,
        maxContentChars: args.maxContentChars ?? MCP_TOOL_LIMITS.read.defaultContentChars,
        cursor: args.cursor ?? null,
        includeMetadata: args.includeMetadata ?? true,
      }),
    },
    topics: {
      allowed: ["filters", "limit", "cursor"],
      required: [],
      build: () => ({
        filters: normalizeFilters(args.filters),
        limit: args.limit ?? MCP_TOOL_LIMITS.topics.defaultItems,
        cursor: args.cursor ?? null,
      }),
    },
    neighbors: {
      allowed: ["topicOrRoute", "edgeTypes", "direction", "limit", "cursor"],
      required: ["topicOrRoute"],
      build: () => ({
        topicOrRoute: args.topicOrRoute,
        edgeTypes: args.edgeTypes ?? [],
        direction: args.direction ?? "both",
        limit: args.limit ?? MCP_TOOL_LIMITS.neighbors.defaultItems,
        cursor: args.cursor ?? null,
      }),
    },
  };
  const spec = specs[tool];
  const unexpected = Object.keys(args).filter((key) => !spec.allowed.includes(key));
  if (unexpected.length > 0) throw new Error(`${tool} arguments contain unsupported field ${unexpected[0]}`);
  const missing = spec.required.find((key) => !Object.prototype.hasOwnProperty.call(args, key));
  if (missing) throw new Error(`${tool} requires ${missing}`);
  return spec.build();
}

function normalizeFilters(filters) {
  if (filters === undefined) return { sourceClasses: [], authorityStatuses: [] };
  if (!isPlainObject(filters)) throw new Error("filters must be an object");
  const unexpected = Object.keys(filters).filter((key) => !["sourceClasses", "authorityStatuses"].includes(key));
  if (unexpected.length > 0) throw new Error(`filters contain unsupported field ${unexpected[0]}`);
  return {
    sourceClasses: filters.sourceClasses ?? [],
    authorityStatuses: filters.authorityStatuses ?? [],
  };
}

function validateJsonRpcEnvelope(message) {
  if (!isPlainObject(message)) return jsonRpcError(null, -32600, "Invalid Request");
  const id = Object.prototype.hasOwnProperty.call(message, "id") ? message.id : null;
  if (message.jsonrpc !== "2.0" || typeof message.method !== "string") {
    return jsonRpcError(id, -32600, "Invalid Request");
  }
  if (Object.prototype.hasOwnProperty.call(message, "id") && !["string", "number"].includes(typeof message.id)) {
    return jsonRpcError(null, -32600, "Invalid Request id");
  }
  return null;
}

function validateInitializeParams(params) {
  if (!isPlainObject(params)) return "initialize params must be an object";
  if (typeof params.protocolVersion !== "string" || params.protocolVersion.length === 0) {
    return "initialize requires protocolVersion";
  }
  if (!isPlainObject(params.capabilities)) return "initialize requires capabilities";
  if (!isPlainObject(params.clientInfo) || typeof params.clientInfo.name !== "string" || typeof params.clientInfo.version !== "string") {
    return "initialize requires clientInfo name and version";
  }
  return null;
}

function jsonRpcResult(id, result) {
  return { jsonrpc: "2.0", id, result };
}

function initializeResult(id, serverInfo) {
  return jsonRpcResult(id, {
    protocolVersion: MCP_PROTOCOL_VERSION,
    capabilities: { tools: { listChanged: false } },
    serverInfo,
    instructions: "Use search to locate sources, read to retrieve exact bounded content, topics to enumerate addressable records, and neighbors only for declared direct graph edges. Source authority fields are mandatory context; retrieval is not proof.",
  });
}

function requireServerInfo(serverInfo) {
  requireCondition(typeof serverInfo?.name === "string" && serverInfo.name.length > 0, "serverInfo requires name");
  requireCondition(typeof serverInfo?.title === "string" && serverInfo.title.length > 0, "serverInfo requires title");
  requireCondition(typeof serverInfo?.version === "string" && serverInfo.version.length > 0, "serverInfo requires version");
  requireCondition(
    typeof serverInfo?.description === "string" && serverInfo.description.length > 0,
    "serverInfo requires description"
  );
}

function sharedInputDefinitions() {
  return {
    filters: {
      type: "object",
      additionalProperties: false,
      properties: {
        sourceClasses: {
          type: "array",
          maxItems: 16,
          uniqueItems: true,
          items: {
            type: "string",
            enum: ["published_corpus", "generated_reading_copy", "scene_route", "app_guide", "archie_reference", "priority_material", "external_prior_physics"],
          },
          default: [],
        },
        authorityStatuses: {
          type: "array",
          maxItems: 16,
          uniqueItems: true,
          items: {
            type: "string",
            enum: ["primary", "routing_only", "diagnostic", "priority_only", "comparison_only", "excluded", "unsupported"],
          },
          default: [],
        },
      },
      default: { sourceClasses: [], authorityStatuses: [] },
    },
  };
}

function readOnlyAnnotations() {
  return {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  };
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}
