# Priorities Inventory

Snapshot: 2026-09-02.

This is the developer-facing ownership and routing inventory for [reference/priorities](../README.md). The canonical numeric order lives in [priorities.md](priorities.md); the repeated mathematical joins live in [closure-join-matrix.md](closure-join-matrix.md).

The live filesystem contains 30 top-level workstream directories plus the `dormant-deferred` container. The workstreams comprise 17 ranked owners, 2 control/routing surfaces, and 11 unranked owners. The archive contains 22 child directories. The four separately ranked shared packets are not additional directory owners.

## Inclusion Rules

- An immediate top-level directory with its own `priorities.md` is part of the active inventory unless it is explicitly a control or routing surface.
- A top-level tracker may carry an internal `deferred` or `watchlist` status and still remain in the active inventory. Moving the directory under `dormant-deferred` is what removes it from active ranking.
- Every child of `dormant-deferred` belongs in the archive inventory and is unscored by policy, even when its parked tracker or a stale unified-table row retains historical rank metadata.
- `aaa-work-threads` is the ranking/control surface and `app-simulation` is a protocol-routing index; neither is a separately ranked owner.
- Supporting subdirectories inherit their parent owner unless a shared theorem packet is explicitly ranked in the unified table.
- Completed objects leave the live queue. The next local marginal winner then replaces the workstream's unified-table row and is rescored from scratch.

## Active Ranked Owners

The rank column mirrors the current unified table for owners that remain directly under `reference/priorities/`. Ranks `3`, `4`, `8`, and `13` belong to shared theorem packets listed separately below.

The unified table still contains archived `app-animator`, `archie`, and `aaa-futures` rows at ranks `13`, `18`, and `24`. Those entries contradict the archive policy and are excluded from the active inventory below. This inventory refresh does not rescore or renumber the unified table; its remaining archive cleanup is a separate ranking correction.

| Rank | Owner | Local rank-1 object | Present role and ownership boundary | Execution queue and focused packet |
| ---: | --- | --- | --- | --- |
| 1 | [`braid-program`](../braid-program/priorities.md) | `binary_subfield_fate` | Sole scientific owner for evolution-first assembly campaigns and fate classification. | [Work queue](../braid-program/work-queue.md). |
| 2 | [`master-equation-closure`](../master-equation-closure/priorities.md) | `causal_wake_update_law` | Owns the independently evolving wake-state derivation, causal accounts, and branch-certificate mathematics. | [Work queue](../master-equation-closure/work-queue.md); [causal wake-state packet](../master-equation-closure/independent-causal-wake-state-closure.md). |
| 5 | [`mapping-equations`](../mapping-equations/priorities.md) | `lorentz_envelope_closure` | Maps source-backed carriers into explicit inherited-equation comparison and failure rows. | [Work queue](../mapping-equations/work-queue.md); [equation inventory](../mapping-equations/equation.md). |
| 6 | [`mapping-standard-model`](../mapping-standard-model/priorities.md) | `quark_mass_predictions` | Geometry-first quark, flavor, confinement, weak, and gauge recovery targets. | [Work queue](../mapping-standard-model/work-queue.md); [geometry-first program](../mapping-standard-model/geometry-first-program.md). |
| 7 | [`app-photon`](../app-photon/priorities.md) | `reusable_absolute_history_solver` | Photon teaching and diagnostics consumer; general solver capability routes back to EOM. | [Work queue](../app-photon/work-queue.md); the tracker retains the app and evidence boundary. |
| 9 | [`mapping-strong-field`](../mapping-strong-field/priorities.md) | `observer_predictions` | Strong-field boundary data, observer predictions, entropy recovery, and release-channel selection. | [Execution queue](../mapping-strong-field/work-queue.md) and [high-energy routing](../mapping-strong-field/high-energy-astrophysics/priorities.md). |
| 10 | [`mapping-nuclear-atomic-molecular`](../mapping-nuclear-atomic-molecular/priorities.md) | `iron_group_binding_cusp_recovery` | Hadronic-to-nuclear benchmark ladder and downstream atomic/molecular recovery. | [Work queue](../mapping-nuclear-atomic-molecular/work-queue.md); [nuclear binding closure](../mapping-nuclear-atomic-molecular/nuclear-binding-closure.md). |
| 11 | [`mapping-benchmarks`](../mapping-benchmarks/priorities.md) | `lorentz_preferred_frame` | Preferred-frame leakage and two-way synchronization benchmark on an accepted moving branch. | [Work queue](../mapping-benchmarks/work-queue.md); benchmark drafts remain sibling packets. |
| 14 | [`mapping-quantum`](../mapping-quantum/priorities.md) | `detector_response_kernel_acceptance` | Deferred but top-level quantum recovery owner for measures, detector kernels, pair provenance, and Bell gates. | [Work queue](../mapping-quantum/work-queue.md); [transfer-operator packet](../mapping-quantum/transfer-operator-basin-measure.md). |
| 15 | [`app-solver`](../app-solver/priorities.md) | `eom_application_surface` | Sole forward solver and reusable numerical-execution owner. | [Work queue](../app-solver/work-queue.md); [attractor-search instrument](../app-solver/campaigns/attractor-search-instrument.md). |
| 16 | [`mapping-cosmology`](../mapping-cosmology/priorities.md) | `component_interfaces` | Deferred but top-level owner for the cosmology transfer-function and observer-interface pipeline. | [Work queue](../mapping-cosmology/work-queue.md); the tracker retains interfaces and promotion map. |
| 17 | [`app-mcp`](../app-mcp/priorities.md) | `named_http_client_conformance` | Read-only source-grounded MCP access; repository sources remain authoritative. | [Work queue](../app-mcp/work-queue.md); [client conformance](../app-mcp/client-conformance.md). |
| 19 | [`app-ios`](../app-ios/priorities.md) | `first_release_device_qa_and_archive` | iPhone/iPad release packaging and physical-device acceptance. | [Work queue](../app-ios/work-queue.md); the tracker retains completed package design. |
| 20 | [`aaa-operations`](../aaa-operations/priorities.md) | `deployment_budget_contract` | Repo-wide deployment, hosting, cost, reliability, and release operations. | [Work queue](../aaa-operations/work-queue.md); first consumer is Borg. |
| 21 | [`app-ui-guidelines`](../app-ui-guidelines/priorities.md) | `standalone_app_home_search_settings_migration` | Shared implementation-facing control-bar and app-chrome standardization. | [Work queue](../app-ui-guidelines/work-queue.md); [runtime design](../app-ui-guidelines/top-dynamic-control-bar-runtime-design-v1.md). |
| 22 | [`dark-sector`](../dark-sector/priorities.md) | `dark_sector_photon_like_mode` | Speculative candidate-assembly and dark-visible re-entry watchlist. | [Work queue](../dark-sector/work-queue.md); [photon-like mode packet](../dark-sector/dark-sector-photon-like-mode.md). |
| 23 | [`app-borg`](../app-borg/priorities.md) | `borg_taxonomy_morph_lab` | Deferred teaching packet for one source-carried coordinate morph; no scientific claim follows from display behavior. | [Execution queue](../app-borg/work-queue.md) and [assembly-viewer requirements](../app-borg/assembly-viewer-requirements.md). |

Plainly: this table lists current top-level owners and copies their existing ranks. Gaps are shared-packet ranks or archived rows, not newly assigned priorities.

## Separately Ranked Shared Packets

These rows multiply several owners and therefore retain their own numeric attention score. They do not create another directory owner.

| Rank | Packet | Owning location | Next unresolved object |
| ---: | --- | --- | --- |
| 4 | `transfer-operator-basin-measure` | [Quantum Closure](../mapping-quantum/transfer-operator-basin-measure.md) | Explicit transfer operator and invariant measure on one persistent accepted assembly state. |
| 5 | `pressure-dependent-noether-sea-constitutive-response` | [Master-Equation Closure](../master-equation-closure/pressure-dependent-noether-sea-constitutive-response.md) | One accepted-branch response record shared by clock, signal, inertia, metric, material, and cosmology consumers. |
| 9 | `exposure-quotient-theorem` | Table-level shared contract in [closure-join-matrix.md](closure-join-matrix.md#exposure-quotient-contract) | One accepted branch-to-sector exposure quotient with a null-sector bound. |
| 14 | `residual-routing-event-ledger` | Table-level shared contract in [closure-join-matrix.md](closure-join-matrix.md#residual-routing-contract) | One concrete EOM-evolved transition with a closed event ledger. |

## Unranked Active Control And Routing Surfaces

| Directory | Role | Rule |
| --- | --- | --- |
| [`aaa-work-threads`](priorities.md) | Canonical active ranking, inventory, join matrix, history, and [routing queue](work-queue.md). | Never score the control surface as its own workstream. |
| [`app-simulation`](../app-simulation/priorities.md) | Preserved simulation-protocol routing index with a [no-local-owner queue](../app-simulation/work-queue.md). | EOM owns execution, the scientific lane owns campaigns, and the proof lane owns acceptance. |

## Unranked Active Owners

These eleven directories remain in the top-level inventory without a numeric rank. Their local status and ownership boundaries are preserved; inclusion here does not make a blocked task executable or reopen completed work.

| Directory | Present role | Ranking or execution boundary |
| --- | --- | --- |
| [`app-aaa-core`](../app-aaa-core/priorities.md) | Shared path, storage, query, codec, and publication platform. | Logical path, workload, codec, stream, query/publication, and thin-client contracts are accepted; remaining rows require measured workloads or external inputs. |
| [`app-equation-mapping`](../app-equation-mapping/priorities.md) | Interactive explanatory surface for stable-ID equation documents and canonical page links; it does not certify equation claims. | No executable object remains: carousel expansion requires a newly justified task, and review-packet export requires an operator-selected local draft. |
| [`app-potential`](../app-potential/priorities.md) | Potential-observable reconstruction and display application. | Core path, codec, stream, and query/publication contracts are accepted; ranking awaits a scientific reference sampler and measured workloads; no separate forward solver. |
| [`app-topo`](../app-topo/priorities.md) | Planar topographic display of prescribed potential products. | Ranking awaits a reference-surface estimate; consumes Potential and AAA Core services. |
| [`category-theory`](../category-theory/priorities.md) | Supporting mathematical structures for history composition, restrictions, and recovery interfaces. | Low-intensity support; physical realization and acceptance remain with the scientific owners. |
| [`aaa-corpus-dragnet`](../aaa-corpus-dragnet/priorities.md) | Read-only inventory of possible corpus connections, duplication, terminology drift, and routing gaps. | Recommendations require owner or operator triage; no independent edit or promotion authority. |
| [`field-speed-ceiling`](../field-speed-ceiling/priorities.md) | Bounded investigation of a proposed foundational speed constraint and its consequences. | No canonical adoption; the Master Equation and EOM solver contracts remain unchanged. |
| [`mapping-electromagnetism`](../mapping-electromagnetism/priorities.md) | Integrates electromagnetic equations and benchmarks against one common assembly and sea record. | Unranked integration owner; source workstreams retain native derivation and evidence authority. |
| [`mapping-one-nature-many-theories`](../mapping-one-nature-many-theories/priorities.md) | Cross-domain bridge assessment, editorial decisions, and promotion provenance. | Reader-facing promotion is complete; this inventory does not reopen its queue or assume ownership of domain mechanisms. |
| [`mapping-open-problems`](../mapping-open-problems/priorities.md) | Audited control surface for the deployed Solving the Crisis paper. | No executable object remains after OP-003; future paper revision requires a new bounded task, while scientific and source work remain with their owners. |
| [`source-mining`](../source-mining/priorities.md) | Source acquisition, source-to-corpus mapping, and completed-source provenance. | No executable object remains after SM-003; repository cleanup and domain disposition require explicit external authority. |

Plainly: these folders have defined responsibilities but no global numeric rank. Their own queues still determine what work is actionable.

## Dormant-Deferred Archive

The following 22 children are preserved as archived work. They are excluded from the active inventory, and archive policy excludes them from numeric ranking, the active discussion queue, and tracker-metadata synchronization. The three stale numeric-table exceptions are identified above; historical tracker metadata does not reactivate a directory.

| Archived child | Parked role |
| --- | --- |
| [`3x3`](../dormant-deferred/3x3/priorities.md) | Deferred binary-slot matrix note. |
| [`aaa-futures`](../dormant-deferred/aaa-futures/priorities.md) | Parked future research, institutional, publication, and impact ideas. |
| [`aaa-journey`](../dormant-deferred/aaa-journey/priorities.md) | Legacy ideation-sequence reconstruction. |
| [`amplituhedron`](../dormant-deferred/amplituhedron/amplituhedron.md) | External-watch comparison of positive-geometry scattering methods; no active queue or score. |
| [`app-animator`](../dormant-deferred/app-animator/priorities.md) | Parked Animator runtime, scene-authoring, and record-visualization program. |
| [`app-causal-delay-feedback`](../dormant-deferred/app-causal-delay-feedback/priorities.md) | Completed learner app plus deferred advanced Roots and path-history teaching material. |
| [`app-lattice-lab`](../dormant-deferred/app-lattice-lab/priorities.md) | Accepted Lattice Lab teaching app and its parked follow-on queue. |
| [`app-lorentz-geometry`](../dormant-deferred/app-lorentz-geometry/priorities.md) | Deferred Lorentz-geometry teaching app. |
| [`archie`](../dormant-deferred/archie/priorities.md) | Parked persona, interface product, and service-platform architecture. |
| [`cosmic-civics`](../dormant-deferred/cosmic-civics/priorities.md) | Exploratory movement, map, and claims-registry concepts; no rights or implementation authority. |
| [`electrodynamics`](../dormant-deferred/electrodynamics/priorities.md) | Parked electrodynamics recovery and primitive-dyon brainstorm; no executable queue. |
| [`electron-orbitals`](../dormant-deferred/electron-orbitals/priorities.md) | Deferred atomic/quantum note. |
| [`epr-bell`](../dormant-deferred/epr-bell/priorities.md) | Bell-assumption evidence audit and route adjudication, deferred pending accepted braid source and analyzer-response records. |
| [`information-relay-machines`](../dormant-deferred/information-relay-machines/priorities.md) | Deferred terminology and transduction-chain concept. |
| [`lissajou`](../dormant-deferred/lissajou/priorities.md) | Deferred phase-closure candidate. |
| [`media-comics`](../dormant-deferred/media-comics/priorities.md) | Deferred comic-production ideas. |
| [`media-images`](../dormant-deferred/media-images/priorities.md) | Deferred image-production ideas. |
| [`media-posts`](../dormant-deferred/media-posts/priorities.md) | Deferred short-form publication ideas. |
| [`media-videos`](../dormant-deferred/media-videos/priorities.md) | Deferred video-production program. |
| [`pdg`](../dormant-deferred/pdg/priorities.md) | Deferred PDG feed, solver, editor, and app plans. |
| [`ruth-kastner`](../dormant-deferred/ruth-kastner/priorities.md) | Deferred source/interpretation packet. |
| [`validation-gates`](../dormant-deferred/validation-gates/priorities.md) | Archived acceptance-intersection packet retained as reference, not a live ranked owner. |

Plainly: all 22 folders are parked. An old active label or rank inside a parked file does not return it to the active inventory.

The pre-split monolith remains recoverable from Git history; it is not a live archive packet.

## Maintenance Sequence

1. Resolve the exact top-level and archive directory sets; account for each directory once in the appropriate inventory section before scoring.
2. Remove completed local objects and sort each active owner's queue.
3. Carry each local rank-`1` object into the unified table.
4. Score and sort the active owners plus explicitly ranked shared packets.
5. Synchronize `Rank`, `Value`, `Cost`, and `ROI` metadata in tracker-backed rows.
6. Refresh this inventory's snapshot, membership, mirrored ranks, and local winners whenever the live directories or ranking change. Update the closure join when ownership or a shared mathematical dependency changes.
7. Run `node scripts/validate-priority-ranking.mjs`, strict link/content checks, and `git diff --check`.
