# Priorities Report

This file is the canonical control surface for the overall `reference/priorities` ranking. Directory names are stable identities. Rank, status, classification, and task queues live here and in each workstream tracker, not in directory names.

The pre-split monolith is retained in Git history rather than as a live
priority document.

## Scoring System

- The scored unit is exactly one **next unresolved evidence object**, decision object, or implementation artifact with an independently checkable completion boundary. Score the nearest object that would materially change what the workstream can claim or do, not the workstream's lifetime ambition.
- Scoring is two-level. First, within each priority bucket, score every live unresolved object against its own remaining value and cost, sort the bucket's compact numbered queue by the same `ROI` and tie-break rules, and make the highest current marginal ROI item local rank `1`. Second, carry only that local rank-`1` object into the unified table and sort the bucket winners globally.
- A bucket scoring pass is incomplete until its queue is re-sorted, completed objects are removed from the live queue or moved to the work log, and item numbers are contiguous. The unified row must name the same object that occupies local rank `1`; it may not skip to a more attractive downstream object while a different item heads the owning queue.
- Completed work receives no remaining `Base`, `Cascade`, `Engine`, or `Eureka` credit. It may reduce `Exec`, `Intuition`, `Deps`, or `Valid`, or satisfy a prerequisite for the next object. Do not use a percent-complete multiplier: a small final gate may carry most of the remaining value.
- If a row has no concrete next unresolved object, remove it from the numeric ranking until one is selected. If two objects have materially different value, dependencies, or completion boundaries, score them as separate rows or select the nearer one explicitly rather than averaging them into a workstream score.
- Score `Base` from `1-10` for the direct local value of completing the named next object.
- Score `Cascade` for how much that object unlocks, constrains, or simplifies other workstreams: `1.00-1.15` mostly local; `1.20-1.35` useful cross-links; `1.40-1.55` several theory queues; `1.60-1.75` a broad multiplier node.
- Map each row to the latest dated [closure-scorecard](../../../content/markdown/aaa/validation/closure-scorecard.md) categories it materially advances. `MinDelta` is the most negative applicable current delta; use `0` when none applies.
- Compute `Pressure = 1 + max(0, -MinDelta)/100`.
- Score `Engine` for the named object's foundational equation leverage: `1.40-1.55` core equations or master dynamics; `1.15-1.35` proofs or simulations that certify the core dynamics; `1.00-1.10` first physical payoff surfaces; `0.85-0.95` downstream sectors or reduced models; `0.00-0.40` ledgers, gates, validation packets, and coordination artifacts that depend on upstream derivations.
- Apply the dependency rule: a ledger, gate, checker, validation packet, app, or coordination artifact cannot outrank its upstream derivation merely by organizing it. A concrete result ready to inspect or validate may raise that row's engine leverage; planning structure alone may not.
- Score `Eureka` from `1-10` for the near-term chance that focused work on the named object yields a materially simplifying theorem route, carrier identity, solver target, physical object, or decisive negative result. Compute `EWeight = 0.50 + 0.10*Eureka`.
- Compute `Value = Base * Cascade * Pressure * Engine * EWeight`.
- Split the **remaining** resistance to this object's completion into four `1-10` burdens: `Exec` artifact effort once the path is known; `Intuition` conceptual invention still required; `Deps` cross-workstream integration; `Valid` validation and no-go burden.
- Compute `Cost = 0.25*Exec + 0.35*Intuition + 0.20*Deps + 0.20*Valid`, rounded half up to one decimal, then compute `ROI = Value / Cost`.
- After any object or component score changes, first re-sort the affected bucket, then recompute every derived field for its local rank-`1` object, sort the complete unified table by higher `ROI`, and rewrite contiguous global ranks so the highest current marginal ROI is rank `1`. Break ties at both levels by higher `Value`, higher `Eureka`, lower `Intuition`, lower `Cost`, then higher `Cascade`. A score edit without both re-sorts and tracker-metadata synchronization is incomplete.
- When the named object closes, immediately replace it with the workstream's next unresolved object or remove the row, rescore its remaining value and cost from scratch, and re-sort the full table. Do not let a completed object's score persist as workstream prestige.
- Validate every scoring pass with `node scripts/validate-priority-ranking.mjs`; the check recomputes `Pressure`, `EWeight`, `Value`, `Cost`, and `ROI`, verifies sort order and contiguous ranks, requires a next-object description, and checks tracker metadata.
- Treat every score as an **inferred attention score**, not as proof evidence, claim promotion, corpus readiness, or closure-score movement. A rank is falsified when its live tracker no longer exposes the scored path, its prerequisite fails, or measured effort/validation burden materially differs from the row.

## Audit Scope — 2026-07-26

This active-only audit read every immediate top-level
`reference/priorities/*/priorities.md` tracker, the current directory inventory,
the top-six closure join, and the current EOM/Braid acceptance boundaries. The
numeric table includes 23 top-level owner directories and four separately
ranked shared theorem packets. `aaa-work-threads` is the control surface and
`app-simulation` is a routing index, so neither receives a numeric rank.

Every child of `dormant-deferred` is excluded regardless of whether its parked
tracker still contains historical rank metadata. A top-level tracker remains
in the active inventory even when its internal status is `deferred` or
`watchlist`; moving that directory under `dormant-deferred` is the action that
removes it from this table.

The audit preserves component scores for unchanged marginal objects, removes
eight archived rows, adds the previously unranked top-level `app-mcp` owner,
and re-sorts the remaining winners contiguously. The former
`eom-attractor-search` packet is now distributed between EOM's reusable
instrument packet and Braid Program's scientific campaign packet.

## Operator Discussion Queue

- **[`field-speed-ceiling`](../field-speed-ceiling/priorities.md) —
  `FSC-001`, discussion-scoped.** Assess the operator-proposed primitive
  domain $\|\mathbf V\|\le c_f$, including exact-boundary root admission and
  evolution semantics. This crosses the Master Equation, MEC-007, EOM solver,
  Braid prescribed diagnostics, and several reader-facing closure hypotheses.
  It changes no existing theory status while the compatibility map is pending.
  See [its work queue](../field-speed-ceiling/work-queue.md).

## Unified Priority Table

The numeric table is the canonical cross-bucket ranking. The `Bucket #1 next unresolved evidence object` column is the scored unit and must match the owning bucket's local rank `1`; the slug identifies that bucket. `MinDelta` is prioritization pressure, not ownership of the full scorecard category. Shared theorem packets remain ranked only when they multiply several live workstreams; ordinary support files remain children of their owning directory.

| Rank | Kind | Slug or packet | Bucket #1 next unresolved evidence object | Base | Cascade | MinDelta | Pressure | Engine | Eureka | EWeight | Value | Exec | Intuition | Deps | Valid | Cost | ROI |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | Engine | [`app-solver`](../app-solver/priorities.md) | `coupled_retained_history_integrator`: claim-ready bounded-population long-horizon kernel | 10.0 | 1.75 | -56 | 1.56 | 1.55 | 10 | 1.50 | 63.47 | 5 | 3 | 5 | 7 | 4.7 | 13.50 |
| 2 | Program | [`braid-program`](../braid-program/priorities.md) | `binary_subfield_fate`: Campaign 1 opposite-polarity binary fate packet | 10.0 | 1.75 | -56 | 1.56 | 1.35 | 10 | 1.50 | 55.28 | 5 | 3 | 4 | 6 | 4.3 | 12.86 |
| 3 | Workstream | [`master-equation-closure`](../master-equation-closure/priorities.md) | `causal_wake_update_law`: one independently evolving wake state with declared causal updates and a regular transmitter-side reduction | 10.0 | 1.70 | -56 | 1.56 | 1.45 | 9 | 1.40 | 53.84 | 6 | 6 | 5 | 7 | 6.0 | 8.97 |
| 4 | Shared packet | [`transfer-operator-basin-measure`](../quantum-closure/transfer-operator-basin-measure.md) | Explicit transfer operator and invariant measure on one persistent accepted assembly state | 9.0 | 1.70 | -56 | 1.56 | 0.90 | 9 | 1.40 | 30.07 | 5 | 7 | 5 | 7 | 6.1 | 4.93 |
| 5 | Shared packet | [`pressure-dependent-noether-sea-constitutive-response`](../master-equation-closure/pressure-dependent-noether-sea-constitutive-response.md) | `pressure_dependent_noether_sea_constitutive_response/v0` on one accepted transmitter-side branch with causal wake accounts | 8.8 | 1.50 | -45 | 1.45 | 0.95 | 8 | 1.30 | 23.64 | 4 | 5 | 5 | 5 | 4.8 | 4.93 |
| 6 | Workstream | [`mapping-equations`](../mapping-equations/priorities.md) | `lorentz_envelope_closure`: source-backed positive-width `S_eq` retained-domain carrier | 8.5 | 1.50 | -45 | 1.45 | 0.85 | 8 | 1.30 | 20.43 | 5 | 5 | 5 | 6 | 5.2 | 3.93 |
| 7 | App | [`app-borg`](../app-borg/priorities.md) | `native_wake_history_and_boundary_residual_fixture` for Borg EOM runs | 7.2 | 1.35 | -56 | 1.56 | 0.90 | 7 | 1.20 | 16.38 | 5 | 3 | 5 | 5 | 4.3 | 3.81 |
| 8 | Workstream | [`standard-model-closure`](../standard-model-closure/priorities.md) | `quark_mass_predictions`: first geometry-derived row without observed-mass fitting | 8.5 | 1.30 | -56 | 1.56 | 0.95 | 8 | 1.30 | 21.29 | 6 | 6 | 6 | 7 | 6.2 | 3.43 |
| 9 | App | [`app-photon`](../app-photon/priorities.md) | `reusable_absolute_history_solver` generalized beyond Photon circular histories | 6.0 | 1.25 | -45 | 1.45 | 0.85 | 5 | 1.00 | 9.24 | 4 | 3 | 4 | 4 | 3.7 | 2.50 |
| 10 | Shared packet | `exposure-quotient-theorem` | One accepted branch-to-sector exposure quotient with a null-sector bound | 9.5 | 1.65 | -45 | 1.45 | 0.35 | 6 | 1.10 | 8.75 | 4 | 4 | 4 | 5 | 4.2 | 2.08 |
| 11 | Workstream | [`strong-field-closure`](../strong-field-closure/priorities.md) | `embedded_boundary_conditions` for one Noether sea horizon-interface case | 6.0 | 1.20 | -56 | 1.56 | 0.85 | 7 | 1.20 | 11.46 | 6 | 6 | 6 | 7 | 6.2 | 1.85 |
| 12 | Candidate | [`nuclear-atomic-molecular-closure`](../nuclear-atomic-molecular-closure/priorities.md) | `iron_group_binding_cusp_recovery` with an accepted nucleon branch-interface ledger | 6.0 | 1.25 | -45 | 1.45 | 0.85 | 5 | 1.00 | 9.24 | 5 | 6 | 6 | 6 | 5.8 | 1.59 |
| 13 | Candidate | [`mapping-benchmarks`](../mapping-benchmarks/priorities.md) | `redshift_clock_transport` benchmark mapped to explicit acceptance and failure gates | 7.5 | 1.35 | -56 | 1.56 | 0.40 | 6 | 1.10 | 6.95 | 4 | 4 | 5 | 6 | 4.6 | 1.51 |
| 14 | App | [`app-animator`](../dormant-deferred/app-animator/priorities.md) | `runtime_cutover` from shared scene-shell behavior to the Animator-owned runtime | 7.0 | 1.20 | 0 | 1.00 | 0.85 | 4 | 0.90 | 6.43 | 5 | 4 | 4 | 4 | 4.3 | 1.50 |
| 15 | Shared packet | `residual-routing-event-ledger` | One concrete EOM-evolved transition with a closed event ledger | 9.5 | 1.70 | -23 | 1.23 | 0.25 | 6 | 1.10 | 5.46 | 4 | 4 | 4 | 5 | 4.2 | 1.30 |
| 16 | Workstream | [`quantum-closure`](../quantum-closure/priorities.md) | `detector_response_kernel_acceptance` on an accepted assembly basin measure | 6.0 | 1.35 | -56 | 1.56 | 0.40 | 9 | 1.40 | 7.08 | 6 | 8 | 7 | 8 | 7.3 | 0.97 |
| 17 | Candidate | [`open-problems`](../open-problems/priorities.md) | `claim_level_audit` of every Solving the Crisis chapter | 5.0 | 1.25 | -56 | 1.56 | 0.25 | 5 | 1.00 | 2.44 | 4 | 4 | 5 | 5 | 4.4 | 0.55 |
| 18 | Op queue | [`source-mining`](../source-mining/priorities.md) | `mine_source_material`: one batch yielding a concrete mathematical artifact | 4.0 | 1.10 | 0 | 1.00 | 0.35 | 3 | 0.80 | 1.23 | 4 | 2 | 3 | 2 | 2.7 | 0.46 |
| 19 | Workstream | [`cosmology-closure`](../cosmology-closure/priorities.md) | `component_interfaces` for the first cosmology transfer-function pipeline | 3.5 | 1.20 | -56 | 1.56 | 0.40 | 7 | 1.20 | 3.14 | 6 | 7 | 7 | 8 | 7.0 | 0.45 |
| 20 | App | [`app-mcp`](../app-mcp/priorities.md) | `named_http_client_conformance`: ephemeral Codex and supported ChatGPT loopback verification | 5.5 | 1.20 | 0 | 1.00 | 0.20 | 3 | 0.80 | 1.06 | 3 | 2 | 3 | 4 | 2.9 | 0.37 |
| 21 | Design | [`archie`](../dormant-deferred/archie/priorities.md) | `platform_architecture_packet` for the future Archie service boundary | 5.0 | 1.25 | 0 | 1.00 | 0.20 | 3 | 0.80 | 1.00 | 4 | 2 | 4 | 5 | 3.5 | 0.29 |
| 22 | App | [`app-ios`](../app-ios/priorities.md) | `first_release_device_qa_and_archive`: physical iPhone/iPad QA and signed archive | 5.5 | 1.20 | 0 | 1.00 | 0.20 | 2 | 0.70 | 0.92 | 5 | 2 | 4 | 3 | 3.4 | 0.27 |
| 23 | Op queue | [`operations`](../operations/priorities.md) | `deployment_budget_contract`: `deployment-budget.v1` applied first to Borg | 5.0 | 1.20 | 0 | 1.00 | 0.20 | 2 | 0.70 | 0.84 | 4 | 2 | 4 | 4 | 3.3 | 0.25 |
| 24 | Design | [`app-ui-guidelines`](../app-ui-guidelines/priorities.md) | `standard_acceptance_pass` for the shared dynamic control bar | 4.5 | 1.20 | 0 | 1.00 | 0.20 | 2 | 0.70 | 0.76 | 4 | 2 | 5 | 4 | 3.5 | 0.22 |
| 25 | Candidate | [`dark-sector`](../dark-sector/priorities.md) | `dark_sector_photon_like_mode` packet with release-channel predicates | 3.0 | 1.10 | 0 | 1.00 | 0.20 | 5 | 1.00 | 0.66 | 4 | 7 | 6 | 7 | 6.1 | 0.11 |
| 26 | Candidate | [`aaa-futures`](../dormant-deferred/aaa-futures/priorities.md) | `research_revolution_seed` with opportunity, work, risk, and claim dependencies | 2.0 | 1.05 | 0 | 1.00 | 0.10 | 3 | 0.80 | 0.17 | 3 | 3 | 3 | 2 | 2.8 | 0.06 |

## Active-Only Rerank Movement — 2026-07-26

- The top ten are unchanged. Their marginal objects and component scores remain
  current enough that removing archived rows does not alter their relative
  order.
- Eight `dormant-deferred` rows were removed:
  `app-equation-mapping`, `information-relay-machines`, `validation-gates`,
  `lissajou`, `media-videos`, `media-images`, `media-comics`, and
  `media-posts`.
- `app-mcp` enters at rank `20` on
  `named_http_client_conformance`. Its score is for the remaining named-client
  verification object, not for the already completed local service and
  loopback adapter.
- The active rows below rank `16` were renumbered contiguously without changing
  component scores: `open-problems` is now `17`, `source-mining` `18`,
  `cosmology-closure` `19`, `app-ideas` `21`, `archie` `22`, `app-ios` `23`,
  `operations` `24`, `app-ui-guidelines` `25`, `dark-sector` `26`, and
  `aaa-futures` `27`.
- Borg and Strong-Field now expose machine-checkable local rank-`1` objects.
  This changes queue representation, not their scores or evidence grade.

## App Ideas Owner Removal — 2026-07-27

- `app-ideas` was removed after its accepted concepts and implementation
  packets were transferred to Causal Delay Feedback and Borg.
- The surviving rows below its former rank were shifted upward by one without
  changing their component scores or evidence grades.

## Current Focus

- **Measured/derived:** `app-solver` has the live production kernel, independent acceptance oracle, persistent worker foundations, exact checkpoint-backed record emission, deterministic thread replay, and measured recursive block-exclusion ladders. **Inferred rank claim:** it is first because completing long-horizon bounded evolution and precision/refinement acceptance unlocks every physical campaign. **Falsifier:** demote it if the live EOM queue becomes maintenance-only or a different active lane can produce accepted dynamics without further EOM work.
- **Measured/derived:** `braid-program` has a ratified charter and instrument gate, a fully constructed 243-row Campaign 1 workload, one diagnostic transverse inward-to-outward reversal, and no booked physics fate. **Inferred rank claim:** it is second because completing the first opposite-polarity binary fate remains the shortest route to a real assembly object or a decisive no-go. **Falsifier:** demote it if Campaign 1 cannot run under a source-frozen EOM/instrument contract or another lane obtains a shorter accepted route to a persistent assembly.
- **Measured/inferred:** the former attractor-search lane has a checkpointed harness, deterministic resume, native assembly-view records, and a measured small-population cost model. Those instrument capabilities now belong to EOM, while Braid Program owns the first statistical campaign. **Falsifier:** reopen a separate rank only if multiple non-braid scientific programs require an independent instrument roadmap and acceptance boundary.
- **Derived target:** `master-equation-closure` owns the causal wake update law, the finite coincident same-transmitter transition, and energy, momentum, and angular momentum accounts on that same update. Certified-braid construction and observer-level recovery remain downstream. **Falsifier:** demote it if no declared wake-state update reduces to the transmitter-side acceleration law on regular charts while crossing coincident same-transmitter birth finitely and closing the conserved accounts.
- **No closure-score movement:** the ranking changes attention order only. No row in the 2026-06-28 closure scorecard rises from this audit.

## Operator Burden Triage

The likely long numerical or proof campaigns are ranks `1-6`, `8`, `10-13`,
`15-16`, and `19`. Lower-cost inspection, app, and coordination surfaces are
led by ranks `7`, `9`, `14`, `17-18`, and `20-25`. A lower-cost row may produce
visible progress sooner, but it does not outrank the derivation spine unless a
concrete upstream result is ready for it to inspect, validate, or publish.

The `dormant-deferred` archive and all of its children are unscored.

## Work Queue

The routed next actions now live in [work-queue.md](work-queue.md). Each implementation remains owned by the linked workstream queue.

## Organization Status

- The numeric ranks are contiguous and include every top-level rankable owner
  plus the four explicitly ranked shared packets.
- No `dormant-deferred` child appears in the numeric table or active discussion
  queue.
- Legacy braid directories stay archived; Braid Program owns scientific search campaigns, EOM owns reusable execution capability, and the former attractor-search packet is distributed between those two canonical owners.
- The former `app-simulation` directory is a routing index, not a ranked owner; its preserved protocol detail advances only through the named canonical lane.
- [closure-join-matrix.md](closure-join-matrix.md) remains the shared-object dependency view, and [inventory.md](inventory.md) remains the detailed file map.
- Workstream metadata mirrors this table. Shared theorem packets do not require separate workstream metadata.

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [closure-scorecard](../../../content/markdown/aaa/validation/closure-scorecard.md)
- [failure-criteria](../../../content/markdown/aaa/validation/failure-criteria.md)
- [software-architecture-and-maintenance](../../../content/markdown/aaa/archie/software-architecture-and-maintenance.md)
- [research-notebook](../../../content/markdown/aaa/archie/research-notebook.md)
