# MCP Client Conformance

## Status

- Kind: `priority-evidence`
- Claim level: `measured where marked; documented capability where marked`
- Status: `sdk-and-codex-passing-chatgpt-desktop-pending`
- Parent tracker: [Architrino MCP](priorities.md)
- Server boundary: [Local Fixture MCP Adapter](local-fixture-mcp-adapter.md)

## Purpose

This packet separates protocol conformance from client-surface conformance. A manual JSON-RPC transcript can prove the adapter's own behavior, but it cannot prove that an independent SDK or named client will accept the server and call its tools.

## Current Matrix

| Surface | Evidence grade | Result | Exact boundary |
| --- | --- | --- | --- |
| Official MCP TypeScript SDK `@modelcontextprotocol/sdk` `1.29.0` | `measured` | `passed` | The SDK initialized the server, negotiated tools, listed exactly four tools, called `topics`, `search`, `read`, and `neighbors`, observed `SOURCE_NOT_FOUND` as a tool-level error, pinged, and closed the stdio transport. |
| Codex bundled CLI `0.145.0-alpha.18` from the installed ChatGPT desktop app | `measured` | `passed-after-fix` | One ephemeral read-only Codex turn initialized the required server, discovered it, called all four tools, consumed structured content, and reported all four statuses as `ok`. A second fresh turn loaded the saved shared configuration without command-line server overrides and returned three `topics` records with `status: ok`. |
| ChatGPT desktop local MCP surface | `documented capability` | `installed; pending direct invocation` | The shared `architrino_fixture` stdio entry is installed and enabled. The current OpenAI Codex manual says the ChatGPT desktop app supports local stdio MCP and shares configuration with Codex. This active task cannot reload the new connection without a restart or new chat. No direct ChatGPT tool call is claimed. |
| ChatGPT web | `documented limitation` | `not a local-stdio target` | The current OpenAI Codex manual says ChatGPT web uses remote MCP-backed plugin tools and does not read local Codex configuration. |

## Compatibility Defect Found And Corrected

The first real Codex initialization failed at `tools/list` with JSON-RPC `-32602` because the adapter rejected the standard optional `_meta` request field. The official SDK defines `_meta` on base request parameters, including paginated list requests and tool calls.

The adapter now:

- accepts object-valued `_meta` on `tools/list` and `tools/call`;
- continues to reject unknown top-level request parameters;
- continues to reject task-augmented calls because all four V1 tools declare `taskSupport: forbidden`;
- exercises `_meta` in the owned subprocess transcript and focused lifecycle test.

The falsifier was direct and operator-checkable: before the correction, a required Codex MCP server prevented the session from starting; after the correction, the same configuration completed all four tool calls.

## Official SDK Runner

The repository still has no root Node package manifest or lockfile, so the SDK is not added as an application dependency. The durable conformance runner accepts the root of an independently installed SDK package:

```bash
node scripts/archie-service/check-fixture-mcp-sdk-conformance.mjs \
  --sdk-root /path/to/node_modules/@modelcontextprotocol/sdk
```

The measured pass used the recommended stable V1 package, `@modelcontextprotocol/sdk@1.29.0`, installed in a temporary directory with `zod@4`. The official SDK repository currently labels its V2 main branch pre-alpha and recommends V1 for production use.

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

## ChatGPT Desktop Completion Gate

Direct ChatGPT desktop acceptance requires one fresh client session:

1. restart the MCP connection or open a fresh ChatGPT chat as the UI requires;
2. confirm that `architrino_fixture` appears in `/mcp` or the connection picker;
3. call all four tools and record structured-result and error behavior;
4. remove the development connection later if it should not remain installed.

This step is intentionally not represented as complete from shared configuration or Codex behavior. The ChatGPT UI must itself discover and call the server.

## Sources Checked

- Official MCP TypeScript SDK: <https://github.com/modelcontextprotocol/typescript-sdk>
- Official MCP SDK V1 package: <https://www.npmjs.com/package/@modelcontextprotocol/sdk>
- OpenAI Codex MCP manual: <https://learn.chatgpt.com/docs/extend/mcp>

## Acceptance Falsifiers

Client conformance is not accepted for a surface if:

- initialization or `tools/list` fails;
- the surface discovers a tool set other than the four bounded V1 tools;
- any successful call loses its typed `archie-mcp-tool-response/v1` structured content;
- a missing source becomes a transport error, invented data, or an untyped success;
- a client causes repository-source reads, writes, model calls inside the adapter, or external actions;
- a result is inferred from another client rather than measured through the named surface.
