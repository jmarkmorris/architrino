# Priorities Inventory

Snapshot: 2026-08-01.

This is the developer-facing ownership and routing inventory for
[reference/priorities](../README.md). The canonical numeric order lives in
[priorities.md](priorities.md); the repeated mathematical joins live in
[closure-join-matrix.md](closure-join-matrix.md).

## Inclusion Rules

- An immediate top-level directory with its own `priorities.md` is part of the
  active inventory unless it is explicitly a control or routing surface.
- A top-level tracker may carry an internal `deferred` or `watchlist` status and
  still remain in the active inventory. Moving the directory under
  `dormant-deferred` is what removes it from active ranking.
- Every child of `dormant-deferred` is archived and unscored, even when its
  parked tracker retains historical rank metadata.
- `aaa-work-threads` is the ranking/control surface and `app-simulation` is a
  protocol-routing index; neither is a separately ranked owner.
- Supporting subdirectories inherit their parent owner unless a shared theorem
  packet is explicitly ranked in the unified table.
- Completed objects leave the live queue. The next local marginal winner then
  replaces the workstream's unified-table row and is rescored from scratch.

## Active Ranked Owners

The rank column is mirrored from the active-only unified table. Ranks `4`, `5`,
`10`, and `15` belong to shared theorem packets listed separately below.

| Rank | Owner | Local rank-1 object | Present role and ownership boundary | Execution queue and focused packet |
| ---: | --- | --- | --- | --- |
| 1 | [`app-solver`](../app-solver/priorities.md) | `coupled_retained_history_integrator` | Sole forward solver and reusable numerical-execution owner. | [Work queue](../app-solver/work-queue.md); [attractor-search instrument](../app-solver/campaigns/attractor-search-instrument.md). |
| 2 | [`braid-program`](../braid-program/priorities.md) | `binary_subfield_fate` | Sole scientific owner for evolution-first assembly campaigns and fate classification. | [Work queue](../braid-program/work-queue.md); [undirected ensemble design](../braid-program/undirected-ensemble-search.md). |
| 3 | [`master-equation-closure`](../master-equation-closure/priorities.md) | `causal_wake_update_law` | Owns the independently evolving wake-state derivation, causal accounts, and branch-certificate mathematics. | [Work queue](../master-equation-closure/work-queue.md); [causal wake-state packet](../master-equation-closure/independent-causal-wake-state-closure.md). |
| 6 | [`equation-mapping`](../equation-mapping/priorities.md) | `lorentz_envelope_closure` | Maps source-backed carriers into explicit inherited-equation comparison and failure rows. | [Work queue](../equation-mapping/work-queue.md); [equation inventory](../equation-mapping/equation.md). |
| 7 | [`app-borg`](../app-borg/priorities.md) | `native_wake_history_and_boundary_residual_fixture` | EOM-backed simulation surface and record-only assembly replay; it does not certify displayed data. | [Execution queue](../app-borg/work-queue.md) and [assembly-viewer requirements](../app-borg/assembly-viewer-requirements.md). |
| 8 | [`standard-model-closure`](../standard-model-closure/priorities.md) | `quark_mass_predictions` | Geometry-first quark, flavor, confinement, weak, and gauge recovery targets. | [Work queue](../standard-model-closure/work-queue.md); [geometry-first program](../standard-model-closure/geometry-first-program.md). |
| 9 | [`app-photon`](../app-photon/priorities.md) | `reusable_absolute_history_solver` | Photon teaching and diagnostics consumer; general solver capability routes back to EOM. | [Work queue](../app-photon/work-queue.md); the tracker retains the app and evidence boundary. |
| 11 | [`strong-field-closure`](../strong-field-closure/priorities.md) | `embedded_boundary_conditions` | Strong-field boundary data, observer predictions, entropy recovery, and release-channel selection. | [Execution queue](../strong-field-closure/work-queue.md) and [high-energy routing](../strong-field-closure/high-energy-astrophysics/priorities.md). |
| 12 | [`nuclear-atomic-molecular-closure`](../nuclear-atomic-molecular-closure/priorities.md) | `iron_group_binding_cusp_recovery` | Hadronic-to-nuclear benchmark ladder and downstream atomic/molecular recovery. | [Work queue](../nuclear-atomic-molecular-closure/work-queue.md); [nuclear binding closure](../nuclear-atomic-molecular-closure/nuclear-binding-closure.md). |
| 13 | [`cross-theory-mapping`](../cross-theory-mapping/priorities.md) | `redshift_clock_transport` | Observer-level benchmark cases mapped to explicit acceptance and failure predicates. | [Work queue](../cross-theory-mapping/work-queue.md); benchmark drafts remain sibling packets. |
| 14 | [`app-animator`](../dormant-deferred/app-animator/priorities.md) | `runtime_cutover` | Animator-owned runtime, scene authoring, and record visualization. | [Work queue](../dormant-deferred/app-animator/work-queue.md); [design and interfaces](../dormant-deferred/app-animator/design-and-interfaces.md). |
| 16 | [`quantum-closure`](../quantum-closure/priorities.md) | `detector_response_kernel_acceptance` | Deferred but top-level quantum recovery owner for measures, detector kernels, pair provenance, and Bell gates. | [Work queue](../quantum-closure/work-queue.md); [transfer-operator packet](../quantum-closure/transfer-operator-basin-measure.md). |
| 17 | [`open-problems`](../open-problems/priorities.md) | `claim_level_audit` | Controls which open-problem chapters are strong enough for the deployed technical paper; scientific proof, instrument, and source work routes to its actual owner. | [Work queue](../open-problems/work-queue.md); [Solving the Crisis](../../../content/markdown/aaa/philosophy-history/solving-the-crisis.md). |
| 18 | [`source-mining`](../source-mining/priorities.md) | `mine_source_material` | Source acquisition and convergence intake when a batch yields a concrete mathematical or corpus artifact. | [Work queue](../source-mining/work-queue.md); [mining history](../source-mining/source-mining-history.md). |
| 19 | [`cosmology-closure`](../cosmology-closure/priorities.md) | `component_interfaces` | Deferred but top-level owner for the cosmology transfer-function and observer-interface pipeline. | [Work queue](../cosmology-closure/work-queue.md); the tracker retains interfaces and promotion map. |
| 20 | [`app-mcp`](../app-mcp/priorities.md) | `named_http_client_conformance` | Read-only source-grounded MCP access; repository sources remain authoritative. | [Work queue](../app-mcp/work-queue.md); [client conformance](../app-mcp/client-conformance.md). |
| 21 | [`archie`](../dormant-deferred/archie/priorities.md) | `platform_architecture_packet` | Single owner for the Archie persona, interface product, service platform, and source-authority boundary. | [Work queue](../dormant-deferred/archie/work-queue.md); [service architecture](../dormant-deferred/archie/service-deployment-architecture.md). |
| 22 | [`app-ios`](../app-ios/priorities.md) | `first_release_device_qa_and_archive` | iPhone/iPad release packaging and physical-device acceptance. | [Work queue](../app-ios/work-queue.md); the tracker retains completed package design. |
| 23 | [`operations`](../operations/priorities.md) | `deployment_budget_contract` | Repo-wide deployment, hosting, cost, reliability, and release operations. | [Work queue](../operations/work-queue.md); first consumer is Borg. |
| 24 | [`app-ui-guidelines`](../app-ui-guidelines/priorities.md) | `standard_acceptance_pass` | Shared implementation-facing control-bar and app-chrome standardization. | [Work queue](../app-ui-guidelines/work-queue.md); [top dynamic control bar](../app-ui-guidelines/top-dynamic-control-bar.md). |
| 25 | [`dark-sector`](../dark-sector/priorities.md) | `dark_sector_photon_like_mode` | Speculative candidate-assembly and dark-visible re-entry watchlist. | [Work queue](../dark-sector/work-queue.md); [photon-like mode packet](../dark-sector/dark-sector-photon-like-mode.md). |
| 26 | [`aaa-futures`](../dormant-deferred/aaa-futures/priorities.md) | `research_revolution_seed` | Low-priority future research, institutional, publication, and impact implications. | [Work queue](../dormant-deferred/aaa-futures/work-queue.md); [research revolution note](../dormant-deferred/aaa-futures/research-revolution.md). |

## Separately Ranked Shared Packets

These rows multiply several owners and therefore retain their own numeric
attention score. They do not create another directory owner.

| Rank | Packet | Owning location | Next unresolved object |
| ---: | --- | --- | --- |
| 4 | `transfer-operator-basin-measure` | [Quantum Closure](../quantum-closure/transfer-operator-basin-measure.md) | Explicit transfer operator and invariant measure on one persistent accepted assembly state. |
| 5 | `pressure-dependent-noether-sea-constitutive-response` | [Master-Equation Closure](../master-equation-closure/pressure-dependent-noether-sea-constitutive-response.md) | One accepted-branch response record shared by clock, signal, inertia, metric, material, and cosmology consumers. |
| 10 | `exposure-quotient-theorem` | Table-level shared contract in [closure-join-matrix.md](closure-join-matrix.md#exposure-quotient-contract) | One accepted branch-to-sector exposure quotient with a null-sector bound. |
| 15 | `residual-routing-event-ledger` | Table-level shared contract in [closure-join-matrix.md](closure-join-matrix.md#residual-routing-contract) | One concrete EOM-evolved transition with a closed event ledger. |

## Unranked Active Control And Routing Surfaces

| Directory | Role | Rule |
| --- | --- | --- |
| [`aaa-work-threads`](priorities.md) | Canonical active ranking, inventory, join matrix, history, and [routing queue](work-queue.md). | Never score the control surface as its own workstream. |
| [`app-simulation`](../app-simulation/priorities.md) | Preserved simulation-protocol routing index with a [no-local-owner queue](../app-simulation/work-queue.md). | EOM owns execution, the scientific lane owns campaigns, and the proof lane owns acceptance. |

## Dormant-Deferred Archive

The following 16 children are preserved but excluded from the numeric table,
active discussion queue, and tracker-metadata synchronization:

| Archived child | Parked role |
| --- | --- |
| [`3x3`](../dormant-deferred/3x3/priorities.md) | Deferred binary-slot matrix note. |
| [`aaa-journey`](../dormant-deferred/aaa-journey/priorities.md) | Legacy ideation-sequence reconstruction. |
| [`app-causal-delay-feedback`](../dormant-deferred/app-causal-delay-feedback/priorities.md) | Completed learner app plus deferred advanced Roots and path-history teaching material. |
| [`app-equation-mapping`](../dormant-deferred/app-equation-mapping/priorities.md) | Deferred equation-mapping app surface; the active scientific map remains top-level `equation-mapping`. |
| [`app-lorentz-geometry`](../dormant-deferred/app-lorentz-geometry/priorities.md) | Deferred Lorentz-geometry teaching app. |
| [`app-lattice-lab`](../dormant-deferred/app-lattice-lab/priorities.md) | Accepted Lattice Lab teaching app and its parked follow-on queue. |
| [`electron-orbitals`](../dormant-deferred/electron-orbitals/priorities.md) | Deferred atomic/quantum note. |
| [`information-relay-machines`](../dormant-deferred/information-relay-machines/priorities.md) | Deferred terminology and transduction-chain concept. |
| [`lissajou`](../dormant-deferred/lissajou/priorities.md) | Deferred phase-closure candidate. |
| [`media-comics`](../dormant-deferred/media-comics/priorities.md) | Deferred comic-production ideas. |
| [`media-images`](../dormant-deferred/media-images/priorities.md) | Deferred image-production ideas. |
| [`media-posts`](../dormant-deferred/media-posts/priorities.md) | Deferred short-form publication ideas. |
| [`media-videos`](../dormant-deferred/media-videos/priorities.md) | Deferred video-production program. |
| [`pdg`](../dormant-deferred/pdg/priorities.md) | Deferred PDG feed, solver, editor, and app plans. |
| [`ruth-kastner`](../dormant-deferred/ruth-kastner/priorities.md) | Deferred source/interpretation packet. |
| [`validation-gates`](../dormant-deferred/validation-gates/priorities.md) | Archived acceptance-intersection packet retained as reference, not a live ranked owner. |

The pre-split monolith remains recoverable from Git history; it is not a live
archive packet.

## Maintenance Sequence

1. Resolve the exact top-level directory set before scoring.
2. Remove completed local objects and sort each active owner's queue.
3. Carry each local rank-`1` object into the unified table.
4. Score and sort the active owners plus explicitly ranked shared packets.
5. Synchronize `Rank`, `Value`, `Cost`, and `ROI` metadata in tracker-backed
   rows.
6. Update this inventory and the closure join only when ownership or a shared
   mathematical dependency changed.
7. Run `node scripts/validate-priority-ranking.mjs`, strict link/content checks,
   and `git diff --check`.
