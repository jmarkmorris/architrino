# Priorities Report

This file is the canonical control surface for the overall `reference/priorities` ranking. Directory names are stable identities. Rank, status, classification, and task queues live here and in each workstream tracker, not in directory names.

The full pre-split monolith is preserved at [dormant-deferred/priorities-legacy.md](../dormant-deferred/priorities-legacy.md).

## Scoring System

- Score `Base` from `1-10` for the direct local value of closing the work.
- Score `Cascade` for how much the result unlocks, constrains, or simplifies other workstreams: `1.00-1.15` mostly local; `1.20-1.35` useful cross-links; `1.40-1.55` several theory queues; `1.60-1.75` a broad multiplier node.
- Map each row to the latest dated [closure-scorecard](../../../content/markdown/aaa/validation/closure-scorecard.md) categories it materially advances. `MinDelta` is the most negative applicable current delta; use `0` when none applies.
- Compute `Pressure = 1 + max(0, -MinDelta)/100`.
- Score `Engine` for foundational equation leverage: `1.40-1.55` core equations or master dynamics; `1.15-1.35` proofs or simulations that certify the core dynamics; `1.00-1.10` first physical payoff surfaces; `0.85-0.95` downstream sectors or reduced models; `0.00-0.40` ledgers, gates, validation packets, and coordination artifacts that depend on upstream derivations.
- Apply the dependency rule: a ledger, gate, checker, validation packet, app, or coordination artifact cannot outrank its upstream derivation merely by organizing it. A concrete result ready to inspect or validate may raise that row's engine leverage; planning structure alone may not.
- Score `Eureka` from `1-10` for the near-term chance that focused work yields a materially simplifying theorem route, carrier identity, solver target, physical object, or decisive negative result. Compute `EWeight = 0.50 + 0.10*Eureka`.
- Compute `Value = Base * Cascade * Pressure * Engine * EWeight`.
- Split resistance to closure into four `1-10` burdens: `Exec` artifact effort once the path is known; `Intuition` conceptual invention still required; `Deps` cross-workstream integration; `Valid` validation and no-go burden.
- Compute `Cost = 0.25*Exec + 0.35*Intuition + 0.20*Deps + 0.20*Valid`, rounded half up to one decimal, then compute `ROI = Value / Cost`.
- Rank by higher `ROI`; break ties by higher `Value`, higher `Eureka`, lower `Intuition`, lower `Cost`, then higher `Cascade`.
- Treat every score as an **inferred attention score**, not as proof evidence, claim promotion, corpus readiness, or closure-score movement. A rank is falsified when its live tracker no longer exposes the scored path, its prerequisite fails, or measured effort/validation burden materially differs from the row.

## Audit Scope — 2026-07-16

This rescore read every immediate live `reference/priorities/*/priorities.md` tracker, the `dormant-deferred` archive index, the top-six closure join, the latest work logs for the new EOM/braid lanes, and the current `2026-06-28` closure-scorecard deltas. Support subdirectories inherit their parent workstream unless they have an explicitly ranked shared packet. Dormant children remain unscored until promoted into a live priority directory.

The central change since the prior full ranking is the EOM and campaign-ownership consolidation. `app-eom` is the sole forward solver and reusable campaign-execution owner; `braid-program` owns the evolution-first N-ladder and undirected ensemble campaigns; `master-equation-closure` remains the independent retained-branch certificate owner; and the former `app-simulation` queue now routes to those canonical owners and the relevant downstream scientific lanes. The concurrent assembly-viewer consolidation is also reflected: Borg owns the record-only inspection surface, while the removed standalone priority lane no longer consumes a numeric rank.

## Operator Discussion Queue

| Rank | ID | Decision | Owning tracker task | Status | Last surfaced |
| ---: | --- | --- | --- | --- | --- |
| 1 | `BP-01` | Ratify the Braid Program charter and evolution-first N-ladder while preserving the already-ratified instrument gate. | [`braid-program` queue item 1](../braid-program/priorities.md#queue) | `discussion-scoped` | 2026-07-16 |
| 2 | `DF-01` | Decide whether Information Relay Machines and record-preserving transduction chains should become controlled reader-facing terminology. | [`information-relay-machines` queue](../information-relay-machines/priorities.md#queue) | `discussion-scoped` | 2026-07-11 |

## Unified Priority Table

The numeric table is the canonical ranking. `MinDelta` is prioritization pressure, not ownership of the full scorecard category. Shared theorem packets remain ranked only when they multiply several live workstreams; ordinary support files remain children of their owning directory.

| Rank | Kind | Slug or packet | Title | Base | Cascade | MinDelta | Pressure | Engine | Eureka | EWeight | Value | Exec | Intuition | Deps | Valid | Cost | ROI |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | Engine | [`app-eom`](../app-eom/priorities.md) | EOM solver production host, certified bounded-population evolution, and scale path | 10.0 | 1.75 | -56 | 1.56 | 1.55 | 10 | 1.50 | 63.47 | 5 | 3 | 5 | 7 | 4.7 | 13.50 |
| 2 | Program | [`braid-program`](../braid-program/priorities.md) | Evolution-first N-ladder from binary fate to persistent free assemblies | 10.0 | 1.75 | -56 | 1.56 | 1.35 | 10 | 1.50 | 55.28 | 5 | 3 | 4 | 6 | 4.3 | 12.86 |
| 3 | Workstream | [`master-equation-closure`](../master-equation-closure/priorities.md) | Receiver-normal retained-branch certificate and first certified eigen-braid | 10.0 | 1.70 | -56 | 1.56 | 1.45 | 9 | 1.40 | 53.84 | 6 | 6 | 5 | 7 | 6.0 | 8.97 |
| 4 | Shared packet | [`transfer-operator-basin-measure`](../quantum-closure/transfer-operator-basin-measure.md) | Shared transfer-operator and basin-measure theorem | 9.0 | 1.70 | -56 | 1.56 | 0.90 | 9 | 1.40 | 30.07 | 5 | 7 | 5 | 7 | 6.1 | 4.93 |
| 5 | Shared packet | [`pressure-dependent-noether-sea-constitutive-response`](../master-equation-closure/pressure-dependent-noether-sea-constitutive-response.md) | Shared pressure-dependent Noether sea constitutive response | 8.8 | 1.50 | -45 | 1.45 | 0.95 | 8 | 1.30 | 23.64 | 4 | 5 | 5 | 5 | 4.8 | 4.92 |
| 6 | Workstream | [`equation-mapping`](../equation-mapping/priorities.md) | Bidirectional equation maps and accepted-evidence carrier search | 8.5 | 1.50 | -45 | 1.45 | 0.85 | 8 | 1.30 | 20.43 | 5 | 5 | 5 | 6 | 5.2 | 3.93 |
| 7 | App | [`app-borg`](../app-borg/priorities.md) | EOM-backed simulation and assembly-record inspection surface | 7.2 | 1.35 | -56 | 1.56 | 0.90 | 7 | 1.20 | 16.38 | 5 | 3 | 5 | 5 | 4.3 | 3.81 |
| 8 | Workstream | [`standard-model-closure`](../standard-model-closure/priorities.md) | Geometry-first mass, mixing, confinement, weak, and nuclear closure | 8.5 | 1.30 | -56 | 1.56 | 0.95 | 8 | 1.30 | 21.29 | 6 | 6 | 6 | 7 | 6.2 | 3.43 |
| 9 | App | [`app-photon`](../app-photon/priorities.md) | Photon and polarization visualization app ledger | 6.0 | 1.25 | -45 | 1.45 | 0.85 | 5 | 1.00 | 9.24 | 4 | 3 | 4 | 4 | 3.7 | 2.50 |
| 10 | Shared packet | `exposure-quotient-theorem` | Shared sector exposure and quotient theorem | 9.5 | 1.65 | -45 | 1.45 | 0.35 | 6 | 1.10 | 8.75 | 4 | 4 | 4 | 5 | 4.2 | 2.08 |
| 11 | Workstream | [`strong-field-closure`](../strong-field-closure/priorities.md) | Black-hole and strong-field quantitative closure | 6.0 | 1.20 | -56 | 1.56 | 0.85 | 7 | 1.20 | 11.46 | 6 | 6 | 6 | 7 | 6.2 | 1.85 |
| 12 | App | [`app-causal-delay-feedback`](../app-causal-delay-feedback/priorities.md) | Causal-delay feedback teaching and replay app | 5.0 | 1.15 | 0 | 1.00 | 0.85 | 4 | 0.90 | 4.40 | 4 | 2 | 3 | 2 | 2.7 | 1.63 |
| 13 | Candidate | [`high-energy-astrophysics`](../high-energy-astrophysics/priorities.md) | High-energy source-window and event-scale routing | 5.5 | 1.25 | -56 | 1.56 | 0.75 | 5 | 1.00 | 8.04 | 4 | 5 | 5 | 6 | 5.0 | 1.61 |
| 14 | Candidate | [`nuclear-atomic-molecular-closure`](../nuclear-atomic-molecular-closure/priorities.md) | Higher-assembly nuclear, atomic, molecular, and biomolecular staging | 6.0 | 1.25 | -45 | 1.45 | 0.85 | 5 | 1.00 | 9.24 | 5 | 6 | 6 | 6 | 5.8 | 1.59 |
| 15 | Candidate | [`cross-theory-mapping`](../cross-theory-mapping/priorities.md) | Observational and experimental benchmark mapping | 7.5 | 1.35 | -56 | 1.56 | 0.40 | 6 | 1.10 | 6.95 | 4 | 4 | 5 | 6 | 4.6 | 1.51 |
| 16 | App | [`app-animator`](../app-animator/priorities.md) | Scene animator and visual reasoning surface | 7.0 | 1.20 | 0 | 1.00 | 0.85 | 4 | 0.90 | 6.43 | 5 | 4 | 4 | 4 | 4.3 | 1.49 |
| 17 | Shared packet | `residual-routing-event-ledger` | Shared residual-to-channel routing and event ledger | 9.5 | 1.70 | -23 | 1.23 | 0.25 | 6 | 1.10 | 5.46 | 4 | 4 | 4 | 5 | 4.2 | 1.30 |
| 18 | Workstream | [`quantum-closure`](../quantum-closure/priorities.md) | Born-rule, detector-response, and Bell closure | 6.0 | 1.35 | -56 | 1.56 | 0.40 | 9 | 1.40 | 7.08 | 6 | 8 | 7 | 8 | 7.3 | 0.97 |
| 19 | App | [`app-equation-mapping`](../app-equation-mapping/priorities.md) | Static equation annotation and review app | 5.0 | 1.20 | 0 | 1.00 | 0.35 | 5 | 1.00 | 2.10 | 3 | 2 | 3 | 3 | 2.7 | 0.78 |
| 20 | Candidate | [`information-relay-machines`](../information-relay-machines/priorities.md) | Record-preserving transduction-chain paper and terminology lane | 4.5 | 1.30 | 0 | 1.00 | 0.35 | 6 | 1.10 | 2.25 | 3 | 3 | 4 | 3 | 3.2 | 0.70 |
| 21 | Workstream | [`validation-gates`](../validation-gates/priorities.md) | Cross-sector acceptance intersections and no-go routing | 8.5 | 1.65 | 0 | 1.00 | 0.25 | 3 | 0.80 | 2.80 | 4 | 4 | 6 | 5 | 4.6 | 0.61 |
| 22 | Candidate | [`open-problems`](../open-problems/priorities.md) | Solving the Crisis paper and claim-level audit | 5.0 | 1.25 | -56 | 1.56 | 0.25 | 5 | 1.00 | 2.44 | 4 | 4 | 5 | 5 | 4.4 | 0.55 |
| 23 | Op queue | [`source-mining`](../source-mining/priorities.md) | Source mining and corpus integration queue | 4.0 | 1.10 | 0 | 1.00 | 0.35 | 3 | 0.80 | 1.23 | 4 | 2 | 3 | 2 | 2.7 | 0.46 |
| 24 | Workstream | [`cosmology-closure`](../cosmology-closure/priorities.md) | Cosmology transfer-function closure | 3.5 | 1.20 | -56 | 1.56 | 0.40 | 7 | 1.20 | 3.14 | 6 | 7 | 7 | 8 | 7.0 | 0.45 |
| 25 | Candidate | [`lissajou`](../lissajou/priorities.md) | Lissajou candidate theory and visualization lane | 3.0 | 1.10 | 0 | 1.00 | 0.35 | 5 | 1.00 | 1.16 | 3 | 4 | 2 | 3 | 3.2 | 0.36 |
| 26 | App queue | [`app-ideas`](../app-ideas/priorities.md) | Queue of one-page concept apps | 4.5 | 1.10 | 0 | 1.00 | 0.20 | 3 | 0.80 | 0.79 | 3 | 2 | 3 | 2 | 2.5 | 0.32 |
| 27 | Design | [`archie`](../archie/priorities.md) | Public Archie guide, source authority, and service planning | 5.0 | 1.25 | 0 | 1.00 | 0.20 | 3 | 0.80 | 1.00 | 4 | 2 | 4 | 5 | 3.5 | 0.29 |
| 28 | App | [`app-ios`](../app-ios/priorities.md) | Architrino Reader iOS and iPadOS release preparation | 5.5 | 1.20 | 0 | 1.00 | 0.20 | 2 | 0.70 | 0.92 | 5 | 2 | 4 | 3 | 3.4 | 0.27 |
| 29 | Op queue | [`operations`](../operations/priorities.md) | Deployment, reliability, release, and cost operations | 5.0 | 1.20 | 0 | 1.00 | 0.20 | 2 | 0.70 | 0.84 | 4 | 2 | 4 | 4 | 3.3 | 0.25 |
| 30 | App | [`app-archie-interface`](../app-archie-interface/priorities.md) | Future Archie question-interface planning | 4.5 | 1.20 | 0 | 1.00 | 0.20 | 3 | 0.80 | 0.86 | 4 | 2 | 4 | 5 | 3.5 | 0.25 |
| 31 | Design | [`app-ui-guidelines`](../app-ui-guidelines/priorities.md) | Shared app chrome and dynamic control-bar standard | 4.5 | 1.20 | 0 | 1.00 | 0.20 | 2 | 0.70 | 0.76 | 4 | 2 | 5 | 4 | 3.5 | 0.22 |
| 32 | Media | [`media-videos`](../media-videos/priorities.md) | AI-assisted media production and first video prototype | 3.5 | 1.15 | 0 | 1.00 | 0.20 | 2 | 0.70 | 0.56 | 5 | 3 | 4 | 3 | 3.7 | 0.15 |
| 33 | Candidate | [`dark-sector`](../dark-sector/priorities.md) | Candidate dark-sector assembly watchlist | 3.0 | 1.10 | 0 | 1.00 | 0.20 | 5 | 1.00 | 0.66 | 4 | 7 | 6 | 7 | 6.1 | 0.11 |
| 34 | Media | [`media-images`](../media-images/priorities.md) | Image concepts, diagrams, and publication notes | 2.5 | 1.05 | 0 | 1.00 | 0.10 | 2 | 0.70 | 0.18 | 3 | 2 | 2 | 2 | 2.3 | 0.08 |
| 35 | Media | [`media-comics`](../media-comics/priorities.md) | Comic concepts, panels, and publication notes | 2.0 | 1.05 | 0 | 1.00 | 0.10 | 2 | 0.70 | 0.15 | 3 | 2 | 2 | 2 | 2.3 | 0.06 |
| 36 | Media | [`media-posts`](../media-posts/priorities.md) | Short-form posts, captions, and publication hooks | 2.0 | 1.05 | 0 | 1.00 | 0.10 | 2 | 0.70 | 0.15 | 3 | 2 | 2 | 2 | 2.3 | 0.06 |
| 37 | Candidate | [`aaa-futures`](../aaa-futures/priorities.md) | Future physics and cosmology research-strategy ideas | 2.0 | 1.05 | 0 | 1.00 | 0.10 | 3 | 0.80 | 0.17 | 3 | 3 | 3 | 2 | 2.8 | 0.06 |

## Top-Ten Movement Since The Prior Full Ranking

The comparison baseline is the last complete table before the legacy braid directories were archived. An archived row has no current numeric rank; its active obligations now route through `braid-program`, `app-eom`, `master-equation-closure`, or a downstream shared packet.

| Current rank | Current row | Prior rank | Movement | Reason |
| ---: | --- | ---: | ---: | --- |
| 1 | `app-eom` | unranked | new | Sole forward solver target; bounded-population coupled evolution and independent-oracle path now drive every executable dynamics claim. |
| 2 | `braid-program` | unranked | new | Consolidates the archived braid lanes into the evolution-first N-ladder and owns the first binary fate campaign. |
| 3 | `master-equation-closure` | 1 | down 2 | Remains the independent receiver-normal certificate and first-eigen-braid owner; it is no longer double-counted with EOM implementation or generic simulation protocols. |
| 4 | `transfer-operator-basin-measure` | 9 | up 5 | Retains high cross-sector theorem leverage while remaining blocked on a persistent accepted assembly state. |
| 5 | `pressure-dependent-noether-sea-constitutive-response` | 10 | up 5 | Now has a live focused packet under Master-Equation Closure; coefficients remain blocked on same-record EOM-evolved receiver-normal evidence. |
| 6 | `equation-mapping` | 5 | down 1 | Valuable as a carrier-discovery and inverse-clue lane, but accepted mappings still depend on EOM-evolved retained records. |
| 7 | `app-borg` | 15 | up 8 | Owns the working EOM-backed simulation surface and the consolidated record-only assembly inspection surface; display remains non-authoritative. |
| 8 | `standard-model-closure` | 13 | up 5 | Enters the top ten after duplicate and archived lanes were consolidated, not because its downstream mass, mixing, confinement, or weak gates closed. |
| 9 | `app-photon` | 16 | up 7 | Remains a deployed explanatory app with no independent photon-closure authority. |
| 10 | `exposure-quotient-theorem` | 18 | up 8 | Shared proof grammar remains visible, but stays dependency-discounted until accepted branch and sector ledgers exist to project. |

Prior ranks `3`, `4`, `6`, `7`, and `8` belonged to `braid-mass-response-map`, `braid-retained-branch-closure`, `proof-programs`, `braid-nested-shell-causal-closure`, and `braid-angular-momentum-spin`. Those directories are archived and are no longer independently ranked.

## Current Focus

- **Measured/derived:** `app-eom` has the live production kernel, independent acceptance oracle, persistent worker foundations, exact checkpoint-backed record emission, deterministic thread replay, and measured recursive block-exclusion ladders. **Inferred rank claim:** it is first because completing long-horizon bounded evolution and precision/refinement acceptance unlocks every physical campaign. **Falsifier:** demote it if the live EOM queue becomes maintenance-only or a different active lane can produce accepted dynamics without further EOM work.
- **Measured/derived:** `braid-program` has a ratified instrument gate, a fully constructed 243-row Campaign 1 workload, and no booked physics fate. **Inferred rank claim:** it is second because the first opposite-polarity binary fate is the shortest route to a real assembly object or a decisive no-go. **Falsifier:** demote it if charter ratification rejects the N-ladder or Campaign 1 cannot run under the frozen EOM/instrument contract.
- **Measured/inferred:** the former attractor-search lane has a checkpointed harness, deterministic resume, native assembly-view records, and a measured small-population cost model. Those instrument capabilities now belong to EOM, while Braid Program owns the first statistical campaign. **Falsifier:** reopen a separate rank only if multiple non-braid scientific programs require an independent instrument roadmap and acceptance boundary.
- **Derived target:** `master-equation-closure` owns the first same-record receiver-normal branch-strength certificate, the first certified eigen-braid, and the derivation-side home for the shared Noether sea constitutive response. **Falsifier:** demote it if EOM evolution shows the candidate branch families do not persist or if the certificate route cannot bind to EOM-evolved retained histories.
- **No closure-score movement:** the ranking changes attention order only. No row in the 2026-06-28 closure scorecard rises from this audit.

## Operator Burden Triage

The likely long numerical/proof campaigns are ranks `1-6`, `8`, `10-11`, `18`, and `24`. The lower-slog inspection or support surfaces are led by ranks `7`, `9`, `12-17`, and `19-23`. A lower-slog row may produce visible progress sooner, but it does not outrank the derivation spine unless a concrete upstream result is ready for it to inspect, validate, or publish.

The `dormant-deferred` archive and all of its children are unscored. `information-relay-machines` and `lissajou` are now visible in the numeric table because they have live top-level trackers, but their low engine leverage keeps them below the core theory and validation stack.

## Top Cross-Workstream Next Actions

1. Finish the EOM bounded-population long-horizon acceptance stack: retained-history residency, refinement and precision ladders, deterministic CPU/SIMD evidence, and the first claim-ready binary run packet.
2. Ratify the Braid Program charter, then execute Campaign 1 without changing its frozen 27-configuration, three-prehistory, three-refinement workload or its instrument in the production change.
3. Run Braid Program's first declared undirected ensemble campaign through EOM's checkpointed harness, with a persistence criterion fixed before scoring and the targeted $2{:}2$ neighborhood at $N\in\{4,6,8\}$.
4. Bind `receiver_normal_branch_strength_certificate/v0` to one EOM-evolved retained branch and use it to attempt, not presume, the first certified eigen-braid.
5. Populate the pressure-dependent Noether sea constitutive packet only after the receiver-normal certificate exists, and require one shared response row across clock, signal, inertia, effective-metric, material, and cosmology consumers.
6. Keep the transfer-operator, Noether sea response, equation-mapping, and Standard Model lanes downstream of persistent EOM-evolved assembly records; do not convert their current scaffolds into accepted coefficients, measures, or benchmark closure.

## Organization Status

- The numeric ranks are contiguous again and include every immediate live priority tracker plus the explicitly ranked shared packets.
- Legacy braid directories stay archived; Braid Program owns scientific search campaigns, EOM owns reusable execution capability, and the former attractor-search directory is a focused instrument/evidence packet.
- The former `app-simulation` directory is a routing index, not a ranked owner; its preserved protocol detail advances only through the named canonical lane.
- [closure-join-matrix.md](closure-join-matrix.md) remains the shared-object dependency view, and [inventory.md](inventory.md) remains the detailed file map.
- Workstream metadata mirrors this table. Shared theorem packets do not require separate workstream metadata.

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [closure-scorecard](../../../content/markdown/aaa/validation/closure-scorecard.md)
- [failure-criteria](../../../content/markdown/aaa/validation/failure-criteria.md)
- [software-architecture-and-maintenance](../../../content/markdown/aaa/archie/software-architecture-and-maintenance.md)
- [research-notebook](../../../content/markdown/aaa/archie/research-notebook.md)
