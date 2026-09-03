# Private Secure-Tunnel Deployment V1

## Status

- Task: `MCP-004`
- Deployment class: `private_outbound_only`
- Public remote contract advanced: `false`
- Capability scope: five read-only tools over public repository sources
- Claim level: `priority-only`

## Purpose

This contract makes the already-working full-corpus MCP retrieval engine deployable to authorized OpenAI clients without opening an inbound port or creating a public endpoint. It uses the official [OpenAI Secure MCP Tunnel](https://developers.openai.com/api/docs/guides/secure-mcp-tunnels): the pinned tunnel client runs beside the local stdio MCP server and polls the OpenAI control plane over outbound HTTPS. The existing [public remote transport contract](remote-transport-deployment-hardening-v1.md) remains deliberately unadvanced and continues to require its own OAuth, ingress, origin, load, rollback, and accepted-publication gates before any public MCP endpoint can exist.

Plainly: this is a private bridge from approved OpenAI clients to the same local read-only server. It does not publish a new website address, expose a listening port to the internet, or turn a private tunnel into evidence that the separate public-server design is ready.

## Executable Artifacts

| Artifact | Responsibility |
| --- | --- |
| [Deployment contract](../../../../../scripts/config/archie-mcp-secure-tunnel-deployment.v1.json) | Pins the deployment class, OpenAI tunnel-client release and checksums, environment-reference names, managed runtime, exact launcher, accepted-main gates, and capability boundary. |
| [Deployment manager](../../../../../scripts/archie-service/manage-secure-mcp-tunnel.mjs) | Performs static checking, accepted-main live preflight, managed connect, three-field runtime readiness checking, and redacted local receipt writing. |
| [Focused tests](../../../../../tests/archie-service-mcp-secure-tunnel-deployment.test.js) | Reject unsafe contract mutations, credential retention, non-loopback administration, public or hidden-source expansion, and incomplete managed-runtime status. |
| [Full-corpus stdio launcher](../../../../../scripts/archie-service/run-full-corpus-mcp-server.mjs) | Supplies the unchanged five-tool MCP server over stdio with `public` access scope and validated snapshot-only request handling. |

## Frozen Boundary

The deployment exposes exactly `search`, `read`, `topics`, `neighbors`, and `walk`. It preserves the existing public visibility filter, repository-source provenance, response ceilings, deterministic ranking, and no-authority-promotion rule. It permits no write tool, model call, external action, credential access, live repository scan in the request path, hidden priority material, or operator/developer source scope.

The tunnel client is a transport process, not a second retrieval implementation. Its local health and administration surface must bind to an ephemeral loopback address, browser auto-opening is disabled, and its long-lived runtime key is stored only as the reference `env:OPENAI_MCP_TUNNEL_API_KEY`. Tracked artifacts, durable work records, and redacted manager output must never retain the key value or tunnel identifier. The tunnel identifier necessarily exists in the ignored generated runtime profile and control-plane exchange; that local state must not be published. The local ignored runtime directory has mode-limited receipts and contains the downloaded binary, generated profile, process metadata, and health state.

The first supported host is `darwin-arm64`. The contract pins OpenAI `tunnel-client` `v0.0.14`, the official archive SHA-256 `b540493c5bdbcdbb755700c8e2e16597e28b1569e425007e0f73111047bd6a64`, and the extracted executable SHA-256 `309fd85da5a8c2ca8dae920deea8ac10a4d7934ed18ac46e7df0c200139cc9c5`. Adding another host requires recording and independently checking that release artifact's exact archive and executable identities before it becomes deployable.

## Accepted-Main Release Gate

`--preflight` and `--connect` fail unless all of these conditions hold in the release checkout:

1. the tracked tree is clean;
2. local `HEAD` exactly equals the live SHA returned for `refs/heads/main` by the configured Git remote;
3. the tunnel-client executable matches the pinned platform hash and version;
4. a syntactically valid tunnel identifier and runtime key are present only through the named environment variables;
5. the complete content-integrity suite passes;
6. the ignored full-corpus snapshot is regenerated, then passes its deterministic checker;
7. the full-corpus MCP protocol smoke passes all five tools, missing-source behavior, public-only visibility, response limits, task rejection, and outside-working-directory launch.

The source snapshot continues to identify its actual corpus byte state as `local-source-state:<sha256>`. The release receipt binds that source-state identity and snapshot SHA-256 to the independently checked accepted `main` commit. It does not relabel the source-state hash as a Git hash.

Plainly: the service is launched from the same bytes that the public Git remote calls `main`, then its generated corpus snapshot is identified separately. Neither identifier is substituted for the other.

## Managed Connection

Required environment variables:

```text
ARCHITRINO_MCP_TUNNEL_CLIENT_BIN=/absolute/path/to/the/verified/tunnel-client
OPENAI_MCP_TUNNEL_ID=tunnel_<32 lowercase letters or digits>
OPENAI_MCP_TUNNEL_API_KEY=<runtime key with Tunnels Read + Use>
```

Static, credential-free contract check:

```text
node scripts/archie-service/manage-secure-mcp-tunnel.mjs --check
```

Complete accepted-main preflight without starting a runtime:

```text
node scripts/archie-service/manage-secure-mcp-tunnel.mjs --preflight
```

Managed connection and immediate readiness verification:

```text
node scripts/archie-service/manage-secure-mcp-tunnel.mjs --connect
node scripts/archie-service/manage-secure-mcp-tunnel.mjs --status
```

The manager uses `tunnel-client runtimes connect`, not `nohup` or `disown`. It reports success only when the returned managed state has `process_running`, `healthy`, and `ready` all true. The written local receipt excludes credentials and tunnel identifiers.

## Real-Client Acceptance

Transport health is necessary but not sufficient. MCP-004 closes only after two real remote OpenAI client surfaces independently discover the tunneled server and exercise it. The minimum transcript for each client is:

1. enumerate the tool catalog and observe exactly the five frozen tool names;
2. call `search` with a natural-language query from the MCP-003 benchmark and obtain its reviewed authored target;
3. call `read` for an exact public source route and quote its repository route as provenance;
4. call `topics` and observe no `priority_material` record;
5. call either `neighbors` or `walk` and observe only declared repository edges;
6. request a missing source and observe typed `SOURCE_NOT_FOUND` behavior;
7. retain a redacted transcript that names the client, time, accepted-main commit, snapshot identity, returned source routes, and tool outcomes without prompts containing private material, credentials, tunnel identifiers, or returned source bodies.

The two target clients are ChatGPT and Codex. A successful local stdio smoke, tunnel `ready` state, or replay through a locally authored harness cannot substitute for either remote-client transcript.

## Freshness, Cost, Privacy, and Authority

- **Freshness:** a runtime is tied to one accepted-main commit and one regenerated snapshot. Source changes require a new accepted-main release preflight and runtime reconnect.
- **Cost:** the repository contract adds no embedding or model-provider cost. OpenAI account usage and tunnel availability are external service conditions and must be observed from the account; no unmeasured zero-cost claim is made.
- **Privacy:** only public source records may be returned. Runtime credentials and tunnel identifiers remain outside Git and evidence transcripts. Raw queries and returned source bodies are not retained by repository logging or receipts.
- **Provenance:** every retrieval result keeps its repository source id, route, source class, visibility, and authority fields.
- **Fallback:** if the tunnel is unavailable, the remote clients fail closed; the local stdio MCP server remains the deterministic fallback. There is no public endpoint fallback.
- **Authority:** transport success and client retrieval do not upgrade any theory claim. Returned content retains the authority of its repository source.

## Falsifiers

This deployment is not accepted if the binary hash or version differs, the release checkout is not exact remote `main`, content integrity or the full-corpus smoke fails, a tracked artifact retains a credential or tunnel identifier, the runtime listens beyond loopback for administration, any managed status field is not true, either client sees a tool outside the frozen five, hidden material is returned, provenance is absent, or either real remote client transcript is missing.

Closure goal: operate the existing public-source MCP engine through a private outbound-only tunnel from exact accepted `main`, and close MCP-004 only after live ChatGPT and Codex transcripts satisfy the frozen boundary.
