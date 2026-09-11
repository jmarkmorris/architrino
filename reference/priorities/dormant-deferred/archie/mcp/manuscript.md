# Source-Grounded Retrieval Through a Bounded Protocol

## 1. Repository authority and client access

### 1.1. Retrieval as a derived interface

A software client needs to find an authored explanation, read its exact text, identify its source, and follow its declared relationships. These are retrieval operations. Their successful execution does not establish the truth of the retrieved statement. The Architrino Model Context Protocol adapter separates these obligations by treating the repository as the authority and the service as a bounded interface to a validated snapshot of that repository.

The architecture has three distinct responsibilities. Authors maintain the repository. The human reading interface presents published material and its routes. The protocol adapter supplies compatible software clients with source records, exact excerpts, and declared graph paths. A generated reading copy or scene route can help a client reach an explanation, but it cannot acquire the authority of a separately authored scientific result merely by appearing in a search response. The adapter is a service boundary rather than a website application or an additional scientific author.

The implemented retrieval vocabulary comprises `search`, `read`, `topics`, `neighbors`, and `walk`. All five operate on an immutable validated snapshot. Their contracts exclude repository editing, external actions, model calls, local-tool access, credential access, live repository scanning in the request path, and durable user state. Resources and prompts are not exposed. This exclusion applies to the retrieval interface; a transport process may authenticate itself without making its credentials available to the retrieval child.

### 1.2. Visibility and authority are separate attributes

A source record carries its identity, route, source inputs, class, authority role, visibility, and provenance. These fields answer different questions. A route says where to find a source. Visibility says whether an authorized request may receive it. Authority describes the role that source can play in an answer. None of these fields substitutes for the others.

Published corpus material is primary public content. Generated reading copies and scene routes are public routing records with published canonical parents. App guides are diagnostic rather than scientific primary sources. Archie references can be primary controlled references or diagnostic material according to their declared class rules. Development material, where an authorized operator scope admits it, retains its development visibility and `priority_only` authority. It is excluded from the full public snapshot before its content enters that artifact. External prior-physics material requires a curated policy and remains comparison material; the described full-corpus implementation contains none because that policy has not been established.

These distinctions prevent an attractive route, convenient excerpt, or high lexical score from promoting a claim. A client must preserve the returned source boundary. Missing information remains missing; model memory is not an alternative source supplied by the adapter.

## 2. Constructing an immutable source snapshot

### 2.1. Exact content, search, graph, and metadata

The snapshot supplies four coordinated views. The content view holds the exact selected source text. The search view holds deterministic retrieval fields. The graph view records explicit typed edges and their evidence sources. The metadata view links exact equations, figures, and other declared source metadata. The early architecture diagram emphasizes search, graph, and metadata, but exact content is indispensable: a selection hash alone cannot answer a snapshot-only `read` request.

The full-corpus enumerator follows the declared Markdown and scene indexes. Published documents and their unique second-level sections become addressable records. Controlled path rules distinguish app guides and Archie references. A chapter reading-copy section becomes a routing record only when its exact title identifies a published source; the aggregate textbook is not independently indexed as another copy of every chapter. A scene route requires a declared Markdown source with an indexed published parent.

The generated graph is intentionally narrow. Document-to-section `contains`, reading-copy `mirrors`, and scene `routes_to` edges record structural relationships. Word overlap does not manufacture prerequisite, causal, conceptual, or proof edges. A graph traversal can demonstrate that stored edges connect two records; it cannot demonstrate a scientific implication that those edges do not establish.

Equation extraction preserves exact display-source spans. Figure extraction admits a local Markdown image only when its referenced asset exists, retaining the exact alternative text and asset identity. The presence of an exact TeX span or reachable image establishes source linkage. It does not certify an equation, interpretation, or illustration as scientifically correct.

### 2.2. Hashes, ordering, and the freshness boundary

Source-file hashes identify raw bytes; selection and content-view identities identify the selected material. Generated-file and directory digests bind the declared generated inputs. Canonically normalized views receive their own hashes, and an enclosing snapshot hash binds the bundle without including itself. Source, edge, metadata, alias, and keyword ordering is normalized so that input-array order does not create a different semantic snapshot. Build time is excluded from the deterministic fingerprint rather than allowed to defeat repeatability.

This establishes a conditional identity rule: given the same normalized inputs and the specified construction, the artifact should have the same identity. Repeated builds and reversed-input tests exercise that rule. They do not independently prove that the source-selection policy is complete, that ranking is useful, or that upstream generated inputs are fresh. SHA-256 is a change detector here, not a signature proving the identity of an authorized publisher.

Freshness has two distinct scopes. A local snapshot can be internally current against its embedded local source-state manifest. Publication additionally requires the owning content-integrity checks and an accepted repository state. A builder that faithfully hashes an old generated graph still produces a self-consistent artifact from stale material. Consequently upstream validation precedes publication, and a changed upstream artifact requires the downstream identities to be rebuilt and checked under their owning procedure.

The local full-corpus artifact explicitly names a local source state. It does not relabel an editing checkout as accepted `main`. Publication writes a complete candidate to a same-directory temporary file before atomic rename. Serving reads the validated bundle at startup and operates from memory thereafter; it does not inspect the repository anew for each request.

### 2.3. What source coverage measurements establish

The small representative fixture contains six source records, two graph edges, one equation, and one figure. Its negative cases exercise missing paths, duplicate identifiers, missing or wrong-class canonical parents, priority authority inflation, public visibility leakage, false equation and figure provenance, stale source hashes, and altered view hashes. These are checks on the documented construction boundary, not a complete corpus survey.

The July 2026 full-corpus record reports 1,898 source records: 1,420 published-corpus, 74 generated-reading-copy, 152 scene-route, 94 app-guide, and 158 Archie-reference records. It reports 1,706 edges, 4,294 display equations, 36 figures, and a 25,395,549-byte snapshot. A separately described document-coverage check compared declared Markdown paths against document records. That comparison has a different evidentiary role from building the same snapshot twice.

The September client receipts describe a different 2,042-record snapshot, with 1,843 edges, 4,700 metadata records, and 1,528 published-corpus records. A later deployment record has those same counts but another snapshot identity. Equal counts therefore do not establish equal bytes. These dated populations describe their recorded inputs; they are not measurements of the repository at an arbitrary later time.

## 3. Deterministic retrieval and bounded continuation

### 3.1. Query semantics

`search` ranks eligible records using declared fields and fixed rules. Normalization uses Unicode NFKC, lowercasing, and collapsed whitespace. Exact-phrase and all-term matching retain deterministic field weights and authority preference, with a stable source-identifier tie-break. A score is retrieval bookkeeping, not a probability of truth or a scientific claim grade.

The natural-language recall benchmark exposed a concrete limitation: punctuation and ordinary question words made exact-phrase or all-raw-term matching too restrictive. The retained baseline produced a nonempty top-ten page for none of eight reviewed questions. The repair added a fallback only for records whose original score was zero. It tokenizes Unicode letters and numbers, removes a fixed function-word list, requires at least sixty percent token coverage and at least two matches for multi-token queries, and uses fixed field weights. It adds no stemming, inferred synonyms, embeddings, repository scans, or model calls.

The benchmark then found every one of its eight reviewed source targets within the first ten results. The questions cover fixed-void cosmology, clocks, magnetic-like behavior, prescribed versus evolved histories, generated ownership, causal-root acceleration, claim grades, and emergent mass. Two exact reads, a topic case, and two declared-graph cases also passed in the source record, without public priority leakage. This bounded improvement supports the lexical repair on those cases. It does not establish perfect recall for every question or a theorem that fallback additions cannot affect every possible ranking.

The separate proposal to add embeddings was declined because no residual reviewed failure remained for it to solve. That is a decision about the measured need, not a universal assertion that semantic retrieval is useless. A later proposal requires a significant surviving failure, a defined model and privacy boundary, freshness and cost measurements, visibility enforcement, provenance, fallback behavior, and unchanged source authority.

### 3.2. Reading and enumeration

`read` resolves a source identifier or route and returns exact content from the snapshot, with optional metadata. It does not substitute a search teaser or reopen repository files. Pagination uses Unicode character offsets so continuation does not split a surrogate pair. `topics` enumerates directly addressable, non-routing source records under the authorized visibility scope; excluding generated and scene routes from this enumeration does not exclude them from search.

The documented request limits are 256 Unicode characters for a query, 512 for a source identifier or route, twenty records per page, and between 256 and 8,000 characters for a read page. Filters are unique and bounded, and the serialized response ceiling is 32,768 UTF-8 bytes. Character and byte limits are different constraints: metadata and envelope overhead can consume response space even when a requested text length is within its character allowance. A caller cannot enlarge the service ceiling by requesting a larger page.

Continuation binds the snapshot, tool, visibility scope, normalized non-cursor arguments, and next record or character offset. Changing the query, filters, route, traversal options, or other bound arguments invalidates the cursor. The deterministic checksum prevents accidental cross-context reuse; it is not authentication. A public deployment needing adversarial cursor authenticity requires the corresponding authenticated mechanism rather than calling an ordinary hash a secret.

Typed responses distinguish invalid requests and cursors, missing or excluded sources, forbidden visibility, incompatible or stale snapshots, and response-limit failures. Error responses contain no invented result data. An HTTP exchange can succeed while the application returns typed `not_found`; a missing source is not necessarily a transport failure.

### 3.3. Traversing declared edges

`neighbors` follows declared incoming, outgoing, or bidirectional edges of selected types. `walk` composes that operation through bounded breadth-first traversal. Its depth is one to three, its materialized non-origin node ceiling is 256, and its page ceiling remains twenty records. Nodes are visited once, the origin is excluded from returned nodes, and cycles do not cause indefinite traversal.

Ordering is deterministic: shallower paths precede deeper ones, declared edge identifiers order expansion, and the first shortest path supplies a returned node's provenance. Every traversed node and every edge-evidence source must be visible. The service cannot cross a hidden intermediate record to reveal a public endpoint through an otherwise unauthorized path.

The hard node ceiling and the current page size describe different kinds of incompleteness. A page can continue within the bounded traversal, whereas hitting the traversal ceiling is disclosed as incomplete traversal with `traversal_node_limit`. Changing depth or other traversal arguments invalidates a continuation bound to the previous request. A result must preserve the explicit stop reason rather than presenting a bounded subset as the complete graph.

A separately authored cyclic and converging graph fixture provides an independent expected case for ordering, duplicate suppression, visibility, and path provenance. The retained local stdio and HTTP checks also call the later fifth tool and record a two-hop `routes_to` then `contains` path. Neither observation proves the physical truth of a source relationship, and neither extends an older four-tool named-client receipt to a fifth invocation that it never measured.

## 4. Transport without expanded authority

### 4.1. Stateful stdio and stateless HTTP

The local stdio adapter implements initialization, initialized notification, static tool discovery, tool calls, ping, and typed JSON-RPC errors. It uses newline-delimited UTF-8 messages and reserves standard output for protocol traffic. An apparently idle process can be waiting for input; lack of a banner is not a failure. Success and tool-level errors carry structured content with a matching text fallback. Tool annotations declare read-only, nondestructive, idempotent, closed-world behavior and forbid task augmentation.

The source records describe Node built-ins and launchers that resolve their input paths independently of the client's working directory. Startup validates the snapshot and its linked views before serving public-scope requests. Historical defaults include ten-record search, topics, and neighbor pages, 4,000-character reads with metadata, and a two-hop, ten-record walk. These are defaults inside the stronger maximum bounds.

The local Streamable HTTP adapter shares the same tool engine and definitions but uses a stateless request handler. The recorded protocol target is revision `2025-11-25`, as checked in the dated source work. It returns no session identifier, accepts initialization and its notification, and requires the negotiated protocol header thereafter. Its single `/mcp` endpoint accepts JSON-RPC POST requests and returns JSON. GET and DELETE return 405 after their authorization and protocol gates because the design supplies neither a server event stream nor retained sessions.

This describes the retained implementation contract. It is not a new claim about the latest protocol revision, client configuration syntax, or SDK recommendation. Those external conditions require their own current verification before a future deployment choice.

### 4.2. Authorization, load, and safe events

The local HTTP launcher binds only to IPv4 loopback and requires a temporary bearer credential of at least sixteen characters, supplied through the environment. Constant-time comparison, an explicit read scope, exact supplied-origin checks, and rejection of query-string credentials provide a local authorization boundary. An invalid credential produces 401, insufficient scope produces 403, and an invalid supplied origin produces 403 before tool execution. A native client omitting Origin still requires authorization. This hook is not OAuth conformance.

The policy ceilings are 65,536 request bytes, 32,768 response bytes, a 10,000-millisecond request time, sixty authenticated requests per principal per minute, ten per second in the local burst gate, four concurrent requests per principal, and ten unauthenticated requests per source address per minute. Oversize requests receive 413; rate rejection includes `Retry-After`; excessive JSON-RPC responses are replaced with a bounded size error. All responses carry `no-store` and `nosniff`. These are versioned policy choices, not measured host capacity or optimal quotas.

Safe events are constructed from an allowlist. They can include request identity, a keyed principal pseudonym, tool name, typed status, HTTP status, duration, byte counts, and snapshot identity. They exclude credentials, raw query text, tool arguments, source content, response bodies, private prompts, and provider payloads. Retained tests inject recognizable secret, query, source-id, and content markers to check that these markers do not enter the event stream. This is a scoped negative test; the allowlist is the continuing contract.

### 4.3. Liveness, readiness, and atomic activation

Liveness answers whether the process is running. Readiness additionally requires a structurally valid fresh snapshot with the configured identity, the configured authorization and origin controls, rate limiting, safe logging, and a compatible rollback candidate. Public health responses disclose only status. A running process serving a stale or mismatched snapshot must be unavailable for retrieval.

Activation validates and freezes a complete handler/snapshot pair before changing one active reference. Requests therefore observe a complete prior or new bundle. Compatibility includes snapshot, visibility-policy, and view schemas. An identity change that does not match the configured candidate makes readiness fail.

The local rollback fixture has distinct fixture provenance but the same content as the active snapshot. It exercises validation, compatibility, pointer replacement, readiness loss, and restoration mechanics. Because the contents agree by construction, it is not independent evidence that a separately published prior version restores changed content. A remote release requires that separate prior artifact and a five-tool plus missing-source smoke before and after restoration.

## 5. Independent client evidence

### 5.1. Adapter tests and real consumers answer different questions

A repository-authored transcript can show that the adapter returns expected messages. An independent SDK or named client can expose interoperability assumptions that the transcript missed. This distinction mattered when the first real Codex initialization rejected `tools/list`: the adapter disallowed the standard optional object-valued `_meta` field. The correction admitted that metadata on list and call requests while continuing to reject malformed metadata, unsupported top-level parameters, and task augmentation.

The retained official TypeScript SDK `1.29.0` results cover fixture stdio, full-corpus stdio, and full-corpus HTTP. They initialize, discover and call the four primitive tools, receive a typed missing-source result, ping, and close; HTTP additionally accepts GET 405 and remains stateless and locally ready. These are historical four-tool results. The later `walk` extension has local transport evidence but no direct official-SDK, Codex, or ChatGPT invocation in these receipts.

The original subprocess check itself required a coverage repair: listing four tools and successfully calling only search and a missing read did not establish successful calls to all four. The strengthened transcript explicitly exercised each successful primitive. A later saved-configuration Codex result similarly illustrates evidence priority: the tool event reported three topics even though the model's prose incorrectly said the count was unavailable. The recorded structured event supports the count.

### 5.2. Codex and ChatGPT at their recorded scopes

The September Codex CLI `0.152.0` receipts use ephemeral read-only sessions, command-line HTTP configuration, ignored user configuration, and temporary bearer credentials. The earlier receipt covers a six-source fixture built in memory from corrected source selections. Its contemporaneous generated-drift and unmeasured-full-corpus statements remain historical. A later same-day receipt covers the 2,042-record full corpus and records successful topics, ontology search, exact ontology read, a declared `contains` neighbor, and typed missing-source read.

ChatGPT discovery and invocation are separate records. Desktop version `26.831.20005`, build `7524`, initially initialized and listed tools but received no submitted prompt; that observation establishes discovery only. The later operator-supplied five-case result reports the four successful primitive calls and a typed missing-source result. Independent server telemetry corroborates the order `topics`, `search`, `read`, `neighbors`, `read`, a common pseudonymous principal, HTTP success, and the expected snapshot identity.

The ChatGPT grade is deliberately mixed. Safe telemetry omits arguments and structured bodies, so the returned source identifiers and exact `not_found` details remain operator-supplied client evidence. Its test-only unauthenticated authorizer does not test bearer-token handling. The successful missing-source exchange is HTTP 200 carrying application-level `not_found` and `SOURCE_NOT_FOUND`, with no source returned.

Neither client's local result establishes the other's behavior, a remote authenticated connection, TLS ingress, trusted-proxy behavior, hosting availability, accepted-main publication, real rollback, or theory correctness. Historical configuration and package statements describe the measured installation rather than a presently verified user setup.

## 6. Public remote service and private outbound transport

### 6.1. The unadvanced public endpoint contract

A public remote adapter must preserve the same retrieval semantics while independently satisfying network, authorization, load, logging, health, and rollback obligations. The documented design places a loopback process behind TLS ingress and a configured trusted proxy, requires exact non-wildcard origins, and treats the service as an OAuth protected resource with audience validation and a single read scope. Query tokens and token passthrough are forbidden.

The public contract remains fixture-only, with remote readiness and public-deployment authority false. Its negative cases reject premature readiness, public or static-app classification, wrong transport or endpoint, uncontracted streaming, unsafe origins, missing authorization, optional TLS, excessive responses, sensitive logging, request-path repository reads, non-atomic activation, absent rollback, expanded capabilities, and unbounded rates. A separate candidate-identity check rejects a mismatched snapshot. Earlier evidence counts nineteen negative cases; later classification and capability hardening records twenty-four. The populations must retain their source-time scope.

An actual remote release also needs an accepted-main snapshot, a separately published compatible rollback version, staging rollback evidence, and measured host behavior under the bounded load. The original hosting list is an unverified candidate ordering rather than a selected provider or cost result. Geometry, limits, and a successful local request do not measure service availability or expenditure.

### 6.2. A private tunnel preserves the retrieval boundary

The separately specified private transport uses an outbound connection between a local tunnel client and authorized OpenAI clients, with the existing stdio server behind it. It creates no inbound public endpoint and does not advance the public OAuth/HTTPS contract. Public repository content remains the only exposed source scope; “private” describes the connection boundary, not permission to expose hidden development material.

The dated implementation reviewed `tunnel-client` version `v0.0.14` for `darwin-arm64` and the named-stdio `init`, `doctor`, and `run` workflow. It recorded release-API and downloaded-archive agreement, executable identity and version, and GitHub attestation verification. The abandoned interface in an older proposal is not a current command alternative. The recorded version is reproducible historical evidence; a future activation must fail if live release currency or its pinned identity no longer matches.

The manager's accepted-main preflight requires a clean non-ignored tree, local HEAD equal to the live remote main identity, verified archive and executable identities, attestation and release currency, valid environment-referenced account prerequisites, a regenerated and checked public snapshot, the deterministic recall benchmark, five-tool smoke, complete content integrity, and a clean tree after validation. Repository commit, corpus state, snapshot identity, and release-binary identity remain distinct values.

The control-plane key enters only the allowlisted tunnel environment. Alternate profiles, endpoints, logging and UI switches, fallback credentials, and Node injection options are excluded. The generated child command removes the key before starting repository retrieval code. Administration remains on loopback, browser auto-opening and remote UI are disabled, and durable receipts retain neither credential values nor tunnel identifiers. The ignored runtime profile and local log necessarily hold connection state and have their own local owner.

### 6.3. Connectivity and real remote acceptance

Local health cannot establish connectivity. The source records an invalid-credential experiment in which both health and readiness remained positive while control-plane requests failed with 401. Accordingly the manager requires four facts: the supervised process identity exists, liveness passes, readiness passes, and a recent successful control-plane polling metric is present. An old positive poll is not current connection evidence.

The owned process supervisor supplies exact process-birth identity, an authenticated control path, fifteen-second heartbeats, a twenty-four-hour hard deadline, and a termination grace. Stop and restart must match the recorded process identity rather than signaling a reused PID. Restart repeats the accepted-main preflight; source changes require a new accepted snapshot and activation. The local HTTP launcher's thirty-second heartbeat is a different mechanism and does not make that process persistent across restarts.

The live queue records the repository implementation as merged and records post-merge content and Pages checks, whereas older strategy and implementation prose still describe merge as pending. The queue's merge record does not make its commit a permanent activation target. Each later activation must establish the then-current exact remote-main identity. Account activation and independent real ChatGPT and Codex remote transcripts remain the stated incomplete obligation.

Each remote transcript must enumerate exactly five tools and establish representative search, exact source-linked read, topics visibility, declared-edge traversal, and typed missing-source behavior against its accepted commit and snapshot. A local harness, diagnosis command, health response, recent poll, or replay cannot substitute for either named remote client. If the tunnel is unavailable, remote use fails closed; the local stdio service remains separately usable, with no automatic public-endpoint fallback. No repository-side model or embedding call is introduced, but external account usage and service availability are not established to be cost-free.

## 7. Extensions with distinct proof obligations

The architecture leaves room for capability discovery, client budget manifests, graph-path caching, reader links, signed manifests, and private workspaces. Each addresses a different problem. Discovery would expose versions, capabilities, freshness, and limits without revealing forbidden internals. A budget manifest would make truncation and response constraints explicit. Caching requires a measured traversal bottleneck before adding another state owner. A reader link connects a result to its canonical route; it does not change the source's authority. Signed manifests require a trust and key-rotation model beyond ordinary content hashes. Private workspaces require authorization and cache isolation before admitting private records.

Higher-order operations also need separate semantics. A bounded path traversal does not automatically implement comparison, relatedness, contextual explanation, or a learning path. A proposed `derive` tool that merely lists prerequisites must say so; source linkage does not turn it into a proof engine. An `explain` operation belongs to retrieval only when it returns authored explanations or a deterministic excerpt bundle. Model-authored explanation belongs to the separately governed answer engine, with its own context, claim, provider, privacy, token, and manifest constraints.

The practical criterion for expansion is an independently demonstrated unmet need together with a bounded contract and an appropriate instrument. Deterministic replay checks repeatability, independent graph fixtures check declared traversal cases, SDKs and named clients check their own compatibility, and remote transcripts check their actual connection. Maintaining those distinctions makes the interface useful without allowing access, convenience, or successful transport to become an unsupported scientific claim.
