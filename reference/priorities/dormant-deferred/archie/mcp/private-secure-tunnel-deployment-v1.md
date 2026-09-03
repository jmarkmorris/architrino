# Private Secure-Tunnel Deployment V1

## Status

- Task: `MCP-004`
- Deployment class: `private_outbound_only`
- Repository implementation: complete
- Live activation and remote-client acceptance: pending
- Public remote contract advanced: `false`
- Capability scope: five read-only tools over public repository sources
- Claim level: `measured where marked; otherwise priority-only contract`

## Purpose

This contract makes the already-working full-corpus MCP retrieval engine deployable to authorized OpenAI clients without opening an inbound port or creating a public endpoint. It uses the official [OpenAI Secure MCP Tunnel](https://developers.openai.com/api/docs/guides/secure-mcp-tunnels): `tunnel-client` runs beside the local stdio MCP server, opens an outbound HTTPS path to OpenAI, polls for work, forwards requests to the local process, and returns responses through the same tunnel. The existing [public remote transport contract](remote-transport-deployment-hardening-v1.md) remains deliberately unadvanced and continues to require its own OAuth, ingress, origin, load, rollback, and accepted-publication gates before any public MCP endpoint can exist.

Plainly: this is a private bridge from approved OpenAI clients to the same local read-only server. It does not publish a new website address, expose a listening port to the internet, or prove that the separate public-server design is ready.

## Executable Artifacts

| Artifact | Responsibility |
| --- | --- |
| [Deployment contract](../../../../../scripts/config/archie-mcp-secure-tunnel-deployment.v1.json) | Pins the reviewed release, platform hashes, attestation method, current CLI workflow, environment-reference names, local runtime paths, accepted-main gates, connectivity definition, and capability boundary. |
| [Deployment manager](../../../../../scripts/archie-service/manage-secure-mcp-tunnel.mjs) | Performs static checking, exact-main preflight, release and attestation verification, profile initialization, diagnosis, owned-compute-supervised startup, separate liveness/readiness/connectivity checks, safe status/stop/restart, and redacted receipt writing. |
| [Focused tests](../../../../../tests/archie-service-mcp-secure-tunnel-deployment.test.js) | Reject unsafe contract mutations, obsolete CLI commands, credential retention, non-loopback administration, stale connectivity, unsafe process termination, public or hidden-source expansion, and incomplete runtime status. |
| [Full-corpus stdio launcher](../../../../../scripts/archie-service/run-full-corpus-mcp-server.mjs) | Supplies the unchanged five-tool MCP server over stdio with `public` access scope and validated snapshot-only request handling. |

## Current OpenAI Workflow

The official guide was reviewed on 2026-09-02. The current named-stdio workflow is `tunnel-client init`, followed by `tunnel-client doctor --profile ... --explain`, followed by the long-running `tunnel-client run --profile ...`. The abandoned PR #254 design used the obsolete `runtimes connect` and `runtimes status` interface; none of those commands remains in this implementation.

OpenAI identifies the tunnel in Platform tunnel settings and authenticates the local runtime with a control-plane API key. The client requires outbound HTTPS to `api.openai.com:443` and local access to the stdio command. Its administration surfaces are `/healthz`, `/readyz`, `/metrics`, and `/ui`; this contract holds them to `127.0.0.1:0`, disables browser auto-opening and remote UI access, and never enables raw HTTP logging.

The official guide recommends using its settings download link or the latest public release and keeping the runbook pointed to the latest-release page. The executable contract therefore retains the stable latest-release URL and also pins the release reviewed for a reproducible activation. Preflight fails if the live latest-release API no longer reports that tag or archive digest.

## Release Identity

The release reviewed on 2026-09-02 is OpenAI `tunnel-client` `v0.0.14` for `darwin-arm64`. The GitHub release API reported archive SHA-256 `b540493c5bdbcdbb755700c8e2e16597e28b1569e425007e0f73111047bd6a64`. A fresh download matched that digest; the extracted executable matched `309fd85da5a8c2ca8dae920deea8ac10a4d7934ed18ac46e7df0c200139cc9c5` and reported version prefix `0.0.14+`. `gh attestation verify ... --repo openai/tunnel-client` accepted the downloaded archive. The published Sigstore provenance bundle has SHA-256 `3e1fa63b7ebe8333ce9031c6eac343bdf3fd911a3db27321d855d9d1f28541f2` and names the same archive digest as a SLSA provenance subject.

These facts establish the downloaded release identity and provenance verification performed by the named instrument. They do not establish future release currency; the live preflight is the falsifier and refuses activation when the published latest release changes.

## Frozen Capability Boundary

The deployment exposes exactly `search`, `read`, `topics`, `neighbors`, and `walk`. It preserves the existing public visibility filter, repository-source provenance, response ceilings, deterministic ranking, and no-authority-promotion rule. It permits no write tool, model call, external action, credential access, live repository scan in the request path, hidden priority material, or operator/developer source scope.

The tunnel client is transport, not a second retrieval implementation. The runtime key is referenced only as `env:CONTROL_PLANE_API_KEY`. The manager supplies the tunnel process with an allowlisted environment that excludes alternate profiles, targets, endpoints, raw-logging switches, UI switches, fallback credentials, and Node injection options. The generated MCP command removes `CONTROL_PLANE_API_KEY` before starting the repository server, so the transport can authenticate without exposing that credential to the retrieval child. Tracked artifacts, durable work records, manager output, and the redacted receipt retain neither the key value nor the tunnel identifier. The tunnel identifier necessarily exists in the ignored generated profile and the local tunnel log; `.local-data/archie-mcp-tunnel/` is excluded from Git and is the only manager-owned state root.

## Accepted-Main Preflight

`--preflight`, `--start`, and `--restart` fail unless all of these conditions hold:

1. the non-ignored working tree is clean;
2. local `HEAD` exactly equals the live SHA for `refs/heads/main` on `origin`;
3. the installed archive and executable match the pinned hashes and version;
4. the archive passes GitHub attestation verification for `openai/tunnel-client`;
5. the live latest-release API still reports the pinned tag, archive name, and digest;
6. a syntactically valid tunnel identifier and runtime key are present through the declared environment variables;
7. the ignored full-corpus snapshot is regenerated and checked;
8. the deterministic-recall benchmark and five-tool protocol smoke pass;
9. the complete content-integrity suite passes; and
10. validation leaves the non-ignored working tree clean.

The release receipt binds the accepted `main` commit to the independently computed corpus state, snapshot id, and snapshot SHA-256. It does not relabel any of those identities as another.

Plainly: activation is allowed only from the exact public `main` bytes, with the exact reviewed tunnel binary and a freshly rebuilt public-source snapshot. A changed release, source tree, snapshot, or safety check stops the launch.

## Runtime Management

Required environment variables are:

```text
ARCHITRINO_MCP_TUNNEL_ARCHIVE_PATH=/absolute/path/to/the/downloaded-release-archive
ARCHITRINO_MCP_TUNNEL_CLIENT_BIN=/absolute/path/to/the-extracted-tunnel-client
OPENAI_MCP_TUNNEL_ID=tunnel_<32 lowercase letters or digits>
CONTROL_PLANE_API_KEY=<runtime key with Tunnels Read + Use>
```

Static checking requires no credentials, network call, or local write:

```text
node scripts/archie-service/manage-secure-mcp-tunnel.mjs --check
```

After the implementation is merged, the supported accepted-main sequence is:

```text
node scripts/archie-service/manage-secure-mcp-tunnel.mjs --preflight
node scripts/archie-service/manage-secure-mcp-tunnel.mjs --start
node scripts/archie-service/manage-secure-mcp-tunnel.mjs --status
node scripts/archie-service/manage-secure-mcp-tunnel.mjs --restart
node scripts/archie-service/manage-secure-mcp-tunnel.mjs --stop
```

`--start` repeats the complete preflight, creates the ignored profile with `init`, runs `doctor --explain --json`, and starts `run` through the repository's canonical owned-compute supervisor. The supervisor gives the daemon an exact process-birth identity, authenticated control path, 15-second heartbeat, and 24-hour hard deadline; a longer operating period requires an explicit restart rather than an unbounded daemon. The manager then waits for four independent facts: the supervised process exists, `/healthz` is live, `/readyz` is ready, and `commands_poll_last_successful_timestamp_seconds` reports a recent successful control-plane poll. `/readyz` alone is not accepted as connected because the reviewed client can report local readiness while authentication or polling is failing.

`--stop` delegates to the supervisor, which refuses to signal a stale or reused process identity unless the recorded PID, process group, birth time, and exact command still match its authenticated lease. `--restart` uses that same protected stop and then repeats full accepted-main activation. The manager prints and stores only redacted state.

## Remaining Real-Client Acceptance

Repository implementation and local tests cannot close MCP-004. After merge and account setup, ChatGPT and Codex must independently discover the tunneled server, enumerate exactly five tools, and complete representative natural-language search, exact read with repository provenance, topics visibility, declared-edge traversal, and typed missing-source calls. Each retained transcript must name the client, time, accepted-main commit, snapshot identity, returned source routes, and tool outcomes without credentials, tunnel identifiers, private prompts, or returned source bodies.

A successful local smoke, `doctor` result, health response, recent poll metric, or locally authored replay cannot substitute for either remote-client transcript.

## Privacy, Freshness, Cost, Fallback, and Authority

- **Privacy:** only public source records may be returned. Credentials and tunnel identifiers remain outside Git and durable evidence; raw queries and returned source bodies are excluded from manager receipts.
- **Freshness:** every runtime is tied to one accepted-main commit and one regenerated snapshot. Source changes require a new accepted-main preflight and restart.
- **Cost:** this adds no embeddings or repository-side model calls. OpenAI account usage and tunnel availability are external service conditions, not an unmeasured zero-cost claim.
- **Fallback:** if the tunnel is unavailable, remote clients fail closed. The local stdio server remains available; no public endpoint fallback exists.
- **Authority:** successful transport and retrieval do not upgrade any theory claim. Returned content retains its repository source authority.

## Falsifiers

This deployment fails acceptance if release currency, archive hash, executable hash, attestation, exact remote-main identity, clean-tree state, content integrity, deterministic recall, or the five-tool smoke fails; if the administration surface binds beyond loopback; if the process is locally ready without a recent successful control-plane poll; if a receipt exposes a credential or tunnel id; if the runtime bypasses the owned-compute supervisor or an unrelated process identity can be signaled; if either client sees an extra tool, hidden material, or missing provenance; or if either real remote-client transcript is absent.

Closure goal: operate the existing public-source MCP engine through a private outbound-only tunnel from exact accepted `main`, and close MCP-004 only after live ChatGPT and Codex transcripts satisfy the frozen boundary.
