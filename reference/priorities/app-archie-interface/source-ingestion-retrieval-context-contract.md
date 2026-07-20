# Source Ingestion And Retrieval Context Contract

## Workstream Metadata

- Kind: `priority-contract`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [Archie Interface App](priorities.md)
- Assistant mode contract: [assistant-mode-contract.md](../archie/assistant-mode-contract.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](manifest-service-contracts.md)
- Answer engine source contract: [answer-engine-source-contract.md](answer-engine-source-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](issue-mining-signal-contract.md)
- Observability, public status, and incident contract: [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md)
- Service-native speech and presentation contract: [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md)
- Visual artifact contract: [visual-artifact-contract.md](visual-artifact-contract.md)
- Generated media corporate standard: [corporate-media-standards.md](corporate-media-standards.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](../archie/service-platform.md)

## Purpose

This packet defines how the future Archie service turns repository content, public routes, app guides, priority packets, System Card routes, and curated external comparison sources into a validated `source_context`.

The answer engine source contract decides what can be claimed from the retrieved context. This contract owns the upstream source ingestion, route identity, freshness, authority flags, source-chip payloads, excluded-source reporting, and fail-closed missing-route behavior that the answer engine receives.

It is not runtime indexing code. It is the policy and schema target for future ingestion jobs, retrieval indexes, source route validators, source-chip rendering tests, answer fixtures, token receipts, visual artifacts, speech artifacts, issue drafts, and issue-mining reports.

## Current Fixture-Backed Source Index

The service scaffold now includes source-index build-input, snapshot, exact-content-view, search-view, graph-view, metadata-view, dry-run, and negative-suite contracts in [schema.json](../../../src/archie-service/contracts/v1/schema.json). The deterministic implementation is [snapshot-v1.mjs](../../../src/archie-service/source-index/snapshot-v1.mjs); the review fixtures live under [source-index](../../../tests/archie-service/fixtures/source-index/source-index-build-input.v1.json); and [build-source-index.mjs](../../../scripts/archie-service/build-source-index.mjs) writes or checks the expected snapshot without enabling runtime answer generation.

The bounded `search`, `read`, `topics`, and `neighbors` contract is fixture-backed in [MCP Tool Contract V1](../app-mcp/mcp-tool-contract-v1.md). Its pure query engine reads only the accepted snapshot, returns snapshot provenance and source chips, paginates records or exact content, excludes priority material publicly, and returns typed errors for missing, unauthorized, stale, incompatible, malformed, or over-budget requests. The [local fixture MCP adapter](../app-mcp/local-fixture-mcp-adapter.md) now exposes those semantics through a subprocess-tested public-scope stdio surface. Named-client conformance and manifest `source_context` population remain unresolved.

The dry run proves the first manifest-facing route cases without enabling runtime answer generation:

| Route case | Required behavior |
| --- | --- |
| markdown section | Resolve an authored corpus section into a `published_corpus` source chip. |
| sphere portion | Resolve a scene/sphere entry through its canonical authored corpus parent. |
| full-document sphere | Resolve full-document listening through the generated reading-copy route and canonical authored parent. |
| app guide | Resolve app-help material as `app_guide` with diagnostic authority only. |
| System Card | Resolve proof-status, launch-status, caveat, and unsupported-answer routing through the System Card route. |
| priority packet | Exclude priority material from ordinary public answers unless development-status visibility is enabled. |
| missing route | Return a missing-source context instead of substituting model memory. |

Each dry-run case declares the requested route, route surface, expected disposition, source chip, manifest `sourceContext` fragment, and the invariants `feedsManifestSourceContext`, `noModelMemorySubstitution`, and `privatePromptIncluded: false`.

The fixture-backed builder now produces deterministic hashed exact-content, search, graph, and metadata views from representative live repository sources. It fails closed on missing sources, duplicate ids, invalid canonical parents, priority authority or visibility inflation, false equation or figure provenance, stale source hashes, and altered view hashes. This is not yet complete production-corpus enumeration or a runtime `source_context` service.

## Core Invariant

Retrieval can find and rank sources. It cannot promote authority.

A generated reading copy, scene route, app visual, priority packet, external source, or model memory can help route or compare, but none can become a stronger source class than the underlying accepted source policy allows. If source identity, freshness, visibility, or authority is unresolved, the service must return a missing-source or unsupported route instead of filling the gap with fluent synthesis.

## Source Classes

The contract follows [assistant-mode-contract.md](../archie/assistant-mode-contract.md) and uses these source classes:

| Source class | Ingestion source | Default use | Authority limit |
| --- | --- | --- | --- |
| `published_corpus` | Authored markdown under `content/markdown/aaa/`. | Primary source for $\mathbb{A}\mathbb{A}\mathbb{A}$ explanations. | If authored corpus does not state the claim, retrieval must not create it. |
| `generated_reading_copy` | Generated textbook reading copies, PDFs, package exports, and table-of-contents artifacts. | Reader routing, excerpt selection, and convenience references. | Mirrors authored corpus; authored markdown wins on conflict. |
| `scene_route` | Scene JSON, generated scene indexes, markdown indexes, app routes, and public route metadata. | Navigation, sphere/document association, source chip route repair, and entry-point selection. | Routes users to material; does not establish theory claims by itself. |
| `app_guide` | App guides, app scene metadata, user-facing docs, and controlled runtime help references. | Controls, diagnostics, app state, visual state, and known app limits. | App diagnostics are not proof unless an accepted validation artifact supports that claim. |
| `archie_reference` | Archie public-program references, briefs, outreach notes, and related public descriptions outside authored corpus. | Public-program routing and messaging context. | Not published corpus authority unless promoted into authored corpus. |
| `priority_material` | Priority packets under `reference/priorities/`. | Development-status work, blockers, proof burdens, and operator/developer surfaces. | Always labeled `priority-only`; excluded from ordinary public answers unless explicitly enabled. |
| `external_prior_physics` | Curated external papers, standards, primary references, or controlled retrieval/search outputs. | Comparison, constraint, and recovery-target context. | Comparison material only; never native $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology. |
| `model_memory` | Model context, chat history, inferred recollection, and unstored prior conversation. | Operator continuity only. | Never public answer authority; must be verified against indexed sources before use. |

Public V1 should index `published_corpus`, `generated_reading_copy`, `scene_route`, and selected `app_guide` material first. `priority_material` and `external_prior_physics` require explicit visibility policy before public use. `model_memory` is always excluded from `source_context`.

## Ingestion Units

Each ingested source should become a routeable source record.

Required source record fields:

| Field | Requirement |
| --- | --- |
| `source_id` | Stable id for the source record. |
| `source_class` | One of the controlled source classes. |
| `title` | Human-readable title for source chips and reading paths. |
| `route` | Relative file path, public route, scene id, app id, or external source id. |
| `section_anchor` | Optional section, heading, sphere id, excerpt id, or app control id. |
| `authority_status` | `primary`, `routing_only`, `diagnostic`, `priority_only`, `comparison_only`, `excluded`, or `unsupported`. |
| `visibility` | `public`, `development_status`, `operator_developer`, `external_curated`, or `excluded`. |
| `content_snapshot_id` | Repository commit, generated index hash, build id, external snapshot id, or retrieval timestamp. |
| `canonical_parent` | Required when generated or routed material mirrors a stronger source. |
| `claim_label_floor` | Strongest claim label this source class can support before answer-engine review. |
| `teaser` | Short safe excerpt or summary for source chips, avoiding private prompt text. |

Generated artifacts, app visuals, screenshots, and model summaries should not be ingested as source records unless a separate approved policy defines their authority and retention.

## Snapshot And Freshness Rules

The retrieval context must be auditable.

Freshness fields:

| Field | Requirement |
| --- | --- |
| `repo_commit` | Commit or repository snapshot for authored corpus and priority material. |
| `index_snapshot_id` | Source-index build id or hash. |
| `generated_copy_snapshot_id` | Generated reading-copy or PDF package version when used. |
| `scene_index_snapshot_id` | Scene/route index version when scene routes are used. |
| `app_guide_snapshot_id` | App guide or app route index version when app help is used. |
| `external_snapshot_id` | Curated source bundle id or retrieval timestamp when external comparison is enabled. |

If a route is stale, missing, or based on an index older than the active content snapshot, retrieval must either reroute through the canonical parent, report source-index drift, or return a missing-source response. It must not silently substitute model memory.

## Retrieval Context Output

The `retrieval_context` service should output a structured object that can populate the Answer Artifact Manifest.

Required output:

| Field | Requirement |
| --- | --- |
| `source_classes_used` | Enabled source classes actually used. |
| `primary_source_routes` | Ordered source route records shown as source chips. |
| `supporting_source_routes` | Secondary route records used for context, comparison, or navigation. |
| `excluded_source_classes` | Source classes disabled, unsafe, unavailable, stale, private, or out of scope. |
| `source_policy` | Public/operator/development/external visibility state used for this request. |
| `source_freshness` | Snapshot and freshness fields sufficient to explain answer currency. |
| `system_card_route` | Required for proof status, caveats, validation, launch status, and unsupported answers. |
| `missing_source_routes` | Requested routes or source classes that could not be resolved. |
| `source_chip_payloads` | UI-ready source chips with title, class, route, section, authority status, and claim-label floor. |
| `retrieval_diagnostics` | Redacted developer-safe summary of misses, stale routes, ranking decisions, and exclusions. |

The answer engine may use this retrieval context to assign claim labels and write answer text. Media layers, token receipts, issue drafts, saved notes, and issue mining should inherit or reference this same `source_context` instead of reconstructing it.

Source-miss, stale-index, excluded-source, and retrieval-diagnostic observability must follow [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md). Source observability may include route ids, source classes, freshness classes, missing-route classes, and source-index candidate ids; it must not include private prompt text or use model memory as a replacement source.

## Source Chip Rules

Source chips are public-facing authority indicators, not decoration.

Each visible source chip should include:

1. source title;
2. source class;
3. route or public link;
4. section or sphere context when available;
5. authority status;
6. claim-label floor;
7. freshness summary when the question touches closure status, launch status, validation, or open burdens.

Priority chips must visibly say development-status or priority-only. Generated reading-copy chips must route back to their authored parent when the answer depends on a theory claim. External comparison chips must separate external-source status from native $\mathbb{A}\mathbb{A}\mathbb{A}$ claim status.

## Mode-Specific Retrieval Policy

| Mode | Retrieval behavior |
| --- | --- |
| `Ask` | Prefer authored `published_corpus`; use generated copies and scene routes for navigation only. |
| `Explain` | Use authored corpus first, then scene/app guides when the selected concept or app context requires them. |
| `Compare` | Use authored corpus plus curated `external_prior_physics` only when external policy is enabled. |
| `Visualize` | Inherit retrieval context from the underlying answer; do not run a separate visual-only authority search. |
| `Triage Idea` | Use published corpus, app guides, priority material when enabled, and route gaps to issue metadata. |
| `Find Source` | Return direct route candidates and missing-route reports rather than synthesized answers. |

When a mode asks for a disabled source class, retrieval should record the excluded class and return the nearest enabled route or a missing-source response.

## External Prior-Physics Boundary

External prior-physics retrieval requires a separate curated-source policy or controlled search path.

Minimum requirements before use:

1. source identity, title, author/publisher, and retrieval timestamp;
2. primary-source preference for technical claims;
3. separation between external result, local claim, recovery target, and open burden;
4. no promotion of external source content into $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology;
5. citation payloads that the UI can display separately from local source chips.

If those requirements are unavailable, Compare mode should use already-curated local comparison material or return a source-backed comparison-needed response.

## Fail-Closed Behavior

Retrieval should fail closed when:

1. requested route cannot be resolved;
2. route exists only in generated material with no canonical parent;
3. priority material is needed but not enabled for the surface;
4. external comparison source is needed but curated external retrieval is disabled;
5. source index freshness cannot be established;
6. app diagnostic is requested but no app guide or validation artifact is indexed;
7. System Card route is missing for proof-status, caveat, validation, launch-status, or unsupported-answer questions;
8. source chips cannot show authority status clearly;
9. private or uploaded material would need to become a source record without policy.

Fail-closed retrieval can still return a useful response: nearest source route, missing-route report, source-index candidate, System Card route, or issue-draft metadata.

## Regression Fixtures

The future implementation should include retrieval fixtures for:

| Fixture | Required proof |
| --- | --- |
| `retrieval-published-corpus-001` | Published-corpus request returns authored markdown route, source chip, and freshness fields. |
| `retrieval-generated-copy-parent-001` | Generated reading copy routes back to canonical authored parent for theory claims. |
| `retrieval-scene-route-001` | Scene route supplies navigation source chip without increasing claim authority. |
| `retrieval-app-guide-001` | App diagnostic request returns app guide route and `app diagnostic` claim-label floor. |
| `retrieval-priority-disabled-001` | Priority-only material is excluded when development-status visibility is disabled. |
| `retrieval-priority-visible-001` | Priority route is returned only with `priority_only` authority status and development-status chip. |
| `retrieval-external-disabled-001` | External comparison request returns comparison-needed response when curated external policy is unavailable. |
| `retrieval-missing-route-001` | Missing route is reported rather than replaced with model memory. |
| `retrieval-stale-index-001` | Stale index or generated-copy drift is reported with source-index candidate metadata. |
| `retrieval-system-card-001` | Proof-status or launch-status question includes System Card route. |
| `retrieval-source-chip-001` | Source chips include class, route, authority status, claim-label floor, and freshness summary when needed. |
| `retrieval-observability-source-miss-001` | Source misses emit safe route/source-index classes without private prompt text or model-memory substitution. |
| `retrieval-private-material-negative-001` | Private user material is not ingested as source without explicit policy. |
| `retrieval-dry-run-route-cases-001` | Source-index dry-run fixture covers markdown section, sphere portion, full-document sphere, app guide, System Card, priority exclusion, and missing route cases as manifest-ready `sourceContext` fragments. |
| `retrieval-negative-validator-suite-001` | Negative validator suite blocks browser-key exposure, private-prompt leakage, low-quality speech fallback, unconfirmed GitHub handoff, stale terms, and source-authority inflation before route output can drive answer artifacts. |

## Implementation Handoff

Closure goal:
Extend the fixture-backed source-index snapshot into complete corpus record enumeration and manifest `source_context` population while preserving the accepted hash, provenance, visibility, canonical-parent, and source-authority gates.

Use this packet, [assistant-mode-contract.md](../archie/assistant-mode-contract.md), [answer-artifact-manifest.md](answer-artifact-manifest.md), [manifest-service-contracts.md](manifest-service-contracts.md), [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md), and [answer-engine-source-contract.md](answer-engine-source-contract.md) as the source of truth.

Task:
- Expand the representative hashed snapshot builder into complete corpus, generated-copy, scene-route, app-guide, Archie-reference, and policy-controlled priority/external record enumeration.
- Populate manifest `source_context` from the accepted snapshot before answer generation, speech, visuals, token receipts, issue drafts, saved notes, or issue mining.
- Add freshness and rollback behavior for full snapshots without weakening canonical-parent, visibility, source-chip, missing-route, or source-authority checks.
- Preserve the existing route dry runs and source-index negative suite while adding complete-source fixtures and retrieval-context outputs.
- Emit source-miss, stale-index, excluded-source, retrieval-diagnostic, and source-index candidate observability classes without private prompt text.

Constraints:
- Do not use model memory as public source authority.
- Do not let generated reading copies, scene routes, app visuals, priority packets, token spend, speech quality, or generated media strengthen claim labels.
- Preserve TeX exactly when source excerpts include math.
- Do not add runtime AI calls, credentials, deployment config, external search, or public launch behavior unless explicitly requested.
