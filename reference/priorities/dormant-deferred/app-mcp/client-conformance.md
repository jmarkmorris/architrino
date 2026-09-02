# MCP Client Conformance

## Status

- Kind: `priority-evidence`
- Claim level: `measured where marked; documented capability where marked`
- Status: `stdio-and-http-sdk-passing-current-full-corpus-codex-and-chatgpt-http-passing`
- Parent tracker: [Architrino MCP](priorities.md)
- Server boundaries: [Local Fixture MCP Adapter](local-fixture-mcp-adapter.md) and [Loopback Streamable HTTP Adapter](loopback-streamable-http-adapter.md)

## Purpose

This packet separates protocol conformance from client-surface conformance. A manual JSON-RPC transcript can prove the adapter's own behavior, but it cannot prove that an independent SDK or named client will accept the server and call its tools.

## Current Matrix

| Surface | Evidence grade | Result | Exact boundary |
| --- | --- | --- | --- |
| Official MCP TypeScript SDK `@modelcontextprotocol/sdk` `1.29.0` | `measured` | `stdio fixture, stdio full corpus, and Streamable HTTP full corpus passed` | The SDK initialized each transport, negotiated tools, listed exactly four tools, called `topics`, `search`, `read`, and `neighbors`, observed `SOURCE_NOT_FOUND`, and pinged. The HTTP pass additionally accepted GET 405, used no session id, remained locally ready, and changed no persistent client configuration. |
| Codex bundled CLI from the installed ChatGPT desktop app | `measured` | `stdio fixture, stdio full corpus, current-source Streamable HTTP fixture, and current full-corpus HTTP passed` | The earlier stdio runs passed through ephemeral and saved configurations. On 2026-09-02 bundled CLI `0.152.0` used only command-line HTTP configuration in ephemeral read-only sessions, called all four tools successfully against both the current-source fixture and current 2,042-record full-corpus snapshot, observed typed `SOURCE_NOT_FOUND`, and made no persistent MCP configuration change. The [fixture receipt](codex-http-fixture-conformance-2026-09-02.json) and [full-corpus receipt](codex-http-full-corpus-conformance-2026-09-02.json) record the exact boundaries. |
| ChatGPT mode in the unified desktop app | `operator-supplied client result corroborated by measured server telemetry; operator-reported for stdio calls` | `stdio fixture operator-reported working; current full-corpus Streamable HTTP passed` | The operator submitted the five-case prompt through ChatGPT mode in desktop version `26.831.20005`. `topics`, `search`, `read`, and `neighbors` returned typed `ok`; the missing-source `read` returned `not_found` with `SOURCE_NOT_FOUND` and no source. The loopback server independently recorded the same five-tool order from one pseudonymous principal against the expected snapshot, although its safe telemetry does not retain arguments or structured bodies. The [discovery receipt](chatgpt-desktop-http-discovery-2026-09-02.json) and [full-corpus conformance receipt](chatgpt-desktop-http-full-corpus-conformance-2026-09-02.json) preserve the two evidence boundaries. |
| ChatGPT web | `documented limitation` | `not a local-stdio target` | The current OpenAI Codex manual says ChatGPT web uses remote MCP-backed plugin tools and does not read local Codex configuration. |

These retained client runs measured the four primitive tools before the later `walk` extension was added. The current local transport suites expose and call `walk`, but this packet does not claim direct official-SDK, Codex, or ChatGPT invocation of that fifth tool.

## Compatibility Defect Found And Corrected

The first real Codex initialization failed at `tools/list` with JSON-RPC `-32602` because the adapter rejected the standard optional `_meta` request field. The official SDK defines `_meta` on base request parameters, including paginated list requests and tool calls.

The adapter now:

- accepts object-valued `_meta` on `tools/list` and `tools/call`;
- continues to reject unknown top-level request parameters;
- continues to reject task-augmented calls because all five current tools declare `taskSupport: forbidden`;
- exercises `_meta` in the owned subprocess transcript and focused lifecycle test.

The falsifier was direct and operator-checkable: before the correction, a required Codex MCP server prevented the session from starting; after the correction, the same configuration completed all four tool calls.

## Codex Streamable HTTP Fixture Pass — 2026-09-02

Official OpenAI documentation currently states that Codex-host MCP configuration supports Streamable HTTP through a server `url` and optional `bearer_token_env_var`, and that ChatGPT desktop and Codex share MCP configuration on the same host. The measured run used command-line overrides only, ignored user configuration, ran ephemerally with a read-only sandbox, and loaded one loopback fixture server. It did not replace or alter the saved stdio entry.

The Codex event stream records typed `ok` results for `topics`, `search`, `read`, and `neighbors`. A second `read` for `source.missing-conformance-record` returned structured status `not_found` with error code `SOURCE_NOT_FOUND`, no invented result, and no transport error. The exact fixture snapshot id and hash, client version, arguments, statuses, and nonclaims are retained in [the conformance receipt](codex-http-fixture-conformance-2026-09-02.json). The server built that snapshot in memory from current source input after the System Card route was repaired to `#understanding-the-evidence`; no generated repository artifact or persistent client configuration was written.

The source-index check now passes over 2,042 records. After the deployment contract was rebound to current snapshot `source_snapshot_full_corpus_v1_6ab8e3d3608d946ccde0`, the focused HTTP suite passed 9/9 and bundled Codex CLI `0.152.0` completed the same four calls plus typed `SOURCE_NOT_FOUND` against the full corpus. The [full-corpus conformance receipt](codex-http-full-corpus-conformance-2026-09-02.json) records the exact snapshot and execution boundary. No generator write was run in this campaign.

Plainly: Codex and ChatGPT mode can both use the current full Architrino corpus through the HTTP adapter. The result proves bounded local retrieval compatibility, not remote hosting or theory correctness.

## Official SDK Runner

The repository still has no root Node package manifest or lockfile, so the SDK is not added as an application dependency. The durable conformance runner accepts the root of an independently installed SDK package:

```bash
node scripts/archie-service/check-fixture-mcp-sdk-conformance.mjs \
  --sdk-root /path/to/node_modules/@modelcontextprotocol/sdk
```

The same runner targets the full-corpus launcher with:

```bash
node scripts/archie-service/check-fixture-mcp-sdk-conformance.mjs \
  --sdk-root /path/to/node_modules/@modelcontextprotocol/sdk \
  --launcher scripts/archie-service/run-full-corpus-mcp-server.mjs \
  --server-name architrino-full-corpus-mcp
```

The measured pass used the recommended stable V1 package, `@modelcontextprotocol/sdk@1.29.0`, installed in a temporary directory with `zod@4`. The official SDK repository currently labels its V2 main branch pre-alpha and recommends V1 for production use.

The Streamable HTTP runner is:

```bash
node scripts/archie-service/check-loopback-mcp-http-sdk-conformance.mjs \
  --sdk-root /path/to/node_modules/@modelcontextprotocol/sdk
```

It starts only an ephemeral `127.0.0.1` server, supplies a fixture bearer credential through the SDK request headers, performs all four calls plus the missing-source and ping checks, closes the server, and writes no client configuration.

## Codex Configuration Used

The first successful Codex run used command-line overrides rather than writing global or project configuration:

```toml
[mcp_servers.architrino_fixture]
command = "node"
args = ["/Users/markmorris/vibe/architrino/scripts/archie-service/run-fixture-mcp-server.mjs"]
enabled = true
required = true
enabled_tools = ["search", "read", "topics", "neighbors"]
```

The ordinary shell `codex` wrapper was broken locally because its npm-installed architecture binary was missing. The healthy bundled executable at `/Applications/ChatGPT.app/Contents/Resources/codex` was used instead. This is a local installation defect, not an adapter failure.

After operator approval, the same entry was installed in the shared MCP configuration with:

```bash
/Applications/ChatGPT.app/Contents/Resources/codex mcp add architrino_fixture -- \
  node /Users/markmorris/vibe/architrino/scripts/archie-service/run-fixture-mcp-server.mjs
```

`codex mcp get architrino_fixture` and `codex mcp list` report the stdio entry enabled. A fresh ephemeral Codex turn then loaded that saved entry and called `topics` successfully. The entry remains enabled for later operator inspection in both Codex and ChatGPT desktop.

## ChatGPT Desktop Evidence Boundary

The retained manual result satisfies the named ChatGPT surface obligation for the current full-corpus snapshot. The operator supplied the structured result from ChatGPT mode in the unified desktop app; the loopback server independently corroborated the exact five-tool order, common client principal, HTTP success, and snapshot identity. Because safe server telemetry omits arguments and structured bodies, the returned source identifiers and typed `not_found` details remain operator-supplied client evidence rather than an independently reconstructed transcript.

The result does not test bearer-token handling, TLS ingress, trusted-proxy behavior, remote authorization, hosting availability, accepted-`main` publication, or rollback. Those are remote-deployment obligations outside MCP-001. The temporary HTTP entry is not a production connection.

## Sources Checked

- Official MCP TypeScript SDK: <https://github.com/modelcontextprotocol/typescript-sdk>
- Official MCP SDK V1 package: <https://www.npmjs.com/package/@modelcontextprotocol/sdk>
- OpenAI Codex MCP manual: <https://learn.chatgpt.com/docs/extend/mcp>

## Acceptance Falsifiers

Client conformance is not accepted for a surface if:

- initialization or `tools/list` fails;
- the surface omits or alters any tool required by the exact client-conformance campaign being claimed;
- any successful call loses its typed `archie-mcp-tool-response/v1` structured content;
- a missing source becomes a transport error, invented data, or an untyped success;
- a client causes repository-source reads, writes, model calls inside the adapter, or external actions;
- a result is inferred from another client rather than measured through the named surface.

Codex is graded passing over both the current-source Streamable HTTP fixture and the current full-corpus HTTP chain. ChatGPT mode is graded passing for the current full-corpus HTTP calls at the explicitly mixed evidence grade recorded above. The official SDK result proves protocol interoperability; the operator-supplied ChatGPT result plus server telemetry establishes the separate named-client boundary.
