# Full-Corpus Local MCP V1

## Status

- Kind: `priority-implementation`
- Claim level: `measured local behavior where marked`
- Status: `local-full-corpus-passing`
- Parent tracker: [Architrino MCP](priorities.md)
- Supply contract: [Source Index Snapshot V1](source-index-snapshot-v1.md)
- Protocol boundary: [Local Fixture MCP Adapter](local-fixture-mcp-adapter.md)

## Purpose

This implementation replaces the six-record fixture as the only MCP data supply path. It mechanically enumerates the eligible live corpus, builds one immutable local snapshot, and serves that snapshot through the four primitive retrieval tools plus the bounded `walk` extension. The fixture remains a small regression surface.

This is a local V1 service. It is not an accepted-`main` publication artifact, remote endpoint, hosted service, or deployment decision.

## Eligibility Policy

The enumerator uses `content/markdown/markdown_index.json` as the authored Markdown declaration and `content/scenes/scenes_index.json` as the scene declaration.

| Source class | Mechanical rule | Public result |
| --- | --- | --- |
| `published_corpus` | Every declared Markdown document outside `content/markdown/aaa/archie/`, plus each unique H2 section. | Included as `primary` and `published corpus`. |
| `app_guide` | The declared Archie webapp, navigation, download, community, app-guide, support, and UI-guide paths, plus their H2 sections. | Included as `diagnostic` and `app diagnostic`. |
| `archie_reference` | Remaining declared Markdown under `content/markdown/aaa/archie/`, plus H2 sections. Controlled style, terminology, architecture, and System Card references retain `primary`; other Archie material is `diagnostic`. | Included with `AAA-native stance` or `unsupported` according to the controlled path list. |
| `generated_reading_copy` | A chapter reading-copy H2 whose exact title matches one published-corpus H1. The aggregate textbook copy is not separately indexed because it repeats chapter routes. | Included as `routing_only`, with the published document as canonical parent. |
| `scene_route` | A declared scene whose `scene.source` is Markdown and resolves to an indexed published-corpus document. | Included as `routing_only`, with the published document as canonical parent. |
| `priority_material` | Development material is not embedded in the public snapshot. | Excluded before content enters the generated artifact; count is zero. |
| `external_prior_physics` | No curated external-source policy exists in the current repository. | Excluded; count is zero. |

The policy does not turn links or word overlap into conceptual relationships. It creates only document-to-H2 `contains`, generated-copy `mirrors`, and scene `routes_to` edges with named evidence sources.

## Snapshot

The generated artifact is:

```text
content/generated/source-index/local-full-corpus-snapshot.v1.json
```

The builder publishes with a same-directory temporary file followed by an atomic rename. `--check` performs no write. The snapshot records `local-source-state:<sha256>` rather than falsely identifying a dirty working tree as accepted `main`; the exact source-state hash also determines the snapshot id.

Measured on 2026-07-21:

| Field | Value |
| --- | ---: |
| Source records | 1,898 |
| Published-corpus records | 1,420 |
| Generated reading-copy records | 74 |
| Scene-route records | 152 |
| App-guide records | 94 |
| Archie-reference records | 158 |
| Graph edges | 1,706 |
| Exact display equations | 4,294 |
| Source-linked figures | 36 |
| Snapshot bytes | 25,395,549 |
| Snapshot SHA-256 | `592d130a8349e9dde6273a549bf8a6ef1da2d4ba34cca18c525ecc4df01bae26` |

Equation extraction admits exact `$$...$$` and `\[...\]` source spans. Figure extraction admits local Markdown image references only when the referenced asset exists; the snapshot stores the exact alt text and asset hash. Extraction is routing metadata, not mathematical or evidentiary validation.

## Runtime

The full-corpus launcher is:

```text
scripts/archie-service/run-full-corpus-mcp-server.mjs
```

It resolves the snapshot from its own location, reads that one file at startup, validates schema, view and snapshot hashes, source linkage, repository provenance, visibility-policy version, class counts, and fresh local state, then serves only in-memory `search`, `read`, `topics`, `neighbors`, and `walk` requests. The request core has no filesystem, network, child-process, fetch, or write surface.

The existing `architrino_fixture` connection remains unchanged. The full-corpus launcher has not been added to persistent Codex or ChatGPT configuration.

## Commands

Generate the app-mcp-owned snapshot after an explicitly accepted source-state change:

```bash
node scripts/archie-service/build-full-corpus-source-index.mjs --write
```

Check without writing and run the local smoke:

```bash
node scripts/archie-service/build-full-corpus-source-index.mjs --check
node scripts/archie-service/check-full-corpus-mcp-server.mjs
node --test tests/archie-service-full-corpus-source-index.test.js
```

Run the official SDK client against the full-corpus launcher:

```bash
node scripts/archie-service/check-fixture-mcp-sdk-conformance.mjs \
  --sdk-root /path/to/node_modules/@modelcontextprotocol/sdk \
  --launcher scripts/archie-service/run-full-corpus-mcp-server.mjs \
  --server-name architrino-full-corpus-mcp
```

## Measured Evidence

- Repeated source enumeration and complete builds produced the same snapshot hash.
- Reversing source, edge, and metadata input arrays did not change the snapshot hash.
- An independent check found exactly one document record for every path declared by the Markdown index.
- Canonical-parent closure, public priority exclusion, exact section extraction, exact TeX, figure asset reachability, tamper rejection, route-and-anchor reads, realistic pagination, and Unicode code-point continuation passed.
- The current full-corpus subprocess smoke launched from `/tmp`, called all five tools, returned a declared two-hop `routes_to` then `contains` path, preserved authored-source preference, returned metadata, rejected a missing source, and rejected a task-augmented call.
- Official MCP TypeScript SDK `1.29.0` initialized the full-corpus server, listed and called all four tools, observed `SOURCE_NOT_FOUND`, pinged, and closed.
- Bundled Codex CLI `0.145.0-alpha.18` loaded only an ephemeral `architrino_full` configuration and successfully called all four tools plus the missing-source path against snapshot `592d130a8349e9dde6273a549bf8a6ef1da2d4ba34cca18c525ecc4df01bae26`, without a persistent configuration change. An earlier exploratory pass also exercised typed `INVALID_REQUEST` handling for two out-of-bounds arguments before correcting them.

## Freshness Boundary

`fresh` means internally current against the exact local source-state manifest embedded in this snapshot. It does not mean publishable from accepted `main`. The repository-wide content-integrity gate separately owns generated-artifact freshness and must pass before any publication campaign.

## Acceptance Falsifiers

The local V1 implementation is not accepted if:

- a declared Markdown document lacks exactly one document record;
- identical source state changes the snapshot hash;
- a route or source id is ambiguous;
- a routing record lacks a published canonical parent;
- priority or uncurated external content enters public results;
- an equation or figure lacks exact source evidence;
- a request reads repository sources or writes any file;
- the launcher depends on client working directory;
- any of the five local tools, pagination, Unicode continuation, missing-source handling, response ceiling, or scoped transport checks fail; the earlier SDK and Codex conformance claims remain bounded to the primitive four-tool surface they measured.

## Remaining Boundary

The [Loopback Streamable HTTP Adapter](loopback-streamable-http-adapter.md) exercises the full-corpus snapshot through local HTTP, fixture authorization, limits, safe events, health, and rollback mechanics. Named Codex and ChatGPT conformance is complete for the primitive four-tool surface; direct named-client invocation of `walk`, real OAuth, accepted-`main` publication, a separately published rollback snapshot, TLS ingress, hosting, and public deployment remain outside this local implementation claim.
