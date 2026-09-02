# Priorities Report

This file is the canonical control surface for the overall `reference/priorities` ranking. Directory names are stable identities. Rank, status, classification, and task queues live here and in each workstream tracker, not in directory names.

The pre-split monolith is retained in Git history rather than as a live priority document.

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

This active-only audit read every immediate top-level `reference/priorities/*/priorities.md` tracker, the current directory inventory, the top-six closure join, and the current EOM/Braid acceptance boundaries. The numeric table includes 24 top-level owner directories and four separately ranked shared theorem packets. `aaa-work-threads` is the control surface and `app-simulation` is a routing index, so neither receives a numeric rank.

Every child of `dormant-deferred` is excluded regardless of whether its parked tracker still contains historical rank metadata. A top-level tracker remains in the active inventory even when its internal status is `deferred` or `watchlist`; moving that directory under `dormant-deferred` is the action that removes it from this table.

The audit preserves component scores for unchanged marginal objects, removes eight archived rows, adds the previously unranked top-level MCP packet, and re-sorts the remaining winners contiguously. The former `eom-attractor-search` packet is now distributed between EOM's reusable instrument packet and Braid Program's scientific campaign packet.

## Operator Discussion Queue

- **[`app-solver`](../app-solver/priorities.md) — [EOM-013](../app-solver/work-queue.md#eom-013--safety-zone-speed-and-accuracy-assessment), discussion-scoped.** Assess a numerical safety or exclusion zone around each architrino: potential simulation speed gains, accuracy loss on zone entry, and an operational boundary/response definition. Any changed interaction or trajectory rule requires an explicit EOM contract decision and a declared boundary for Braid Program consumers; no implementation, physical exclusion radius, or ranking change is approved.
- **[`field-speed-ceiling`](../field-speed-ceiling/priorities.md) — `FSC-001`, discussion-scoped.** Assess the operator-proposed primitive domain $\|\mathbf V\|\le c_f$, including exact-boundary root admission and evolution semantics. This crosses the Master Equation, MEC-007, EOM solver, Braid prescribed diagnostics, and several reader-facing closure hypotheses. It changes no existing theory status while the compatibility map is pending. See [its work queue](../field-speed-ceiling/work-queue.md).

## Unified Priority Table

The numeric table is the canonical cross-bucket ranking. The `Bucket #1 next unresolved evidence object` column is the scored unit and must match the owning bucket's local rank `1`; the slug identifies that bucket. `MinDelta` is prioritization pressure, not ownership of the full scorecard category. Shared theorem packets remain ranked only when they multiply several live workstreams; ordinary support files remain children of their owning directory.

| Rank | Kind | Slug or packet | Bucket #1 next unresolved evidence object | Base | Cascade | MinDelta | Pressure | Engine | Eureka | EWeight | Value | Exec | Intuition | Deps | Valid | Cost | ROI |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | Program | [`braid-program`](../braid-program/priorities.md) | `binary_subfield_fate`: Campaign 1 opposite-polarity binary fate packet | 10.0 | 1.75 | -56 | 1.56 | 1.35 | 10 | 1.50 | 55.28 | 5 | 3 | 4 | 6 | 4.3 | 12.86 |
| 2 | Workstream | [`master-equation-closure`](../master-equation-closure/priorities.md) | `causal_wake_update_law`: one independently evolving wake state with declared causal updates and a regular transmitter-side reduction | 10.0 | 1.70 | -56 | 1.56 | 1.45 | 9 | 1.40 | 53.84 | 6 | 6 | 5 | 7 | 6.0 | 8.97 |
| 3 | Shared packet | [`transfer-operator-basin-measure`](../mapping-quantum/transfer-operator-basin-measure.md) | Explicit transfer operator and invariant measure on one persistent accepted assembly state | 9.0 | 1.70 | -56 | 1.56 | 0.90 | 9 | 1.40 | 30.07 | 5 | 7 | 5 | 7 | 6.1 | 4.93 |
| 4 | Shared packet | [`pressure-dependent-noether-sea-constitutive-response`](../master-equation-closure/pressure-dependent-noether-sea-constitutive-response.md) | `pressure_dependent_noether_sea_constitutive_response/v0` on one accepted transmitter-side branch with causal wake accounts | 8.8 | 1.50 | -45 | 1.45 | 0.95 | 8 | 1.30 | 23.64 | 4 | 5 | 5 | 5 | 4.8 | 4.93 |
| 5 | Workstream | [`mapping-equations`](../mapping-equations/priorities.md) | `lorentz_envelope_closure`: source-backed positive-width `S_eq` retained-domain carrier | 8.5 | 1.50 | -45 | 1.45 | 0.85 | 8 | 1.30 | 20.43 | 5 | 5 | 5 | 6 | 5.2 | 3.93 |
| 6 | Workstream | [`mapping-standard-model`](../mapping-standard-model/priorities.md) | `quark_mass_predictions`: first geometry-derived row without observed-mass fitting | 8.5 | 1.30 | -56 | 1.56 | 0.95 | 8 | 1.30 | 21.29 | 6 | 6 | 6 | 7 | 6.2 | 3.43 |
| 7 | Shared packet | `exposure-quotient-theorem` | One accepted branch-to-sector exposure quotient with a null-sector bound | 9.5 | 1.65 | -45 | 1.45 | 0.35 | 6 | 1.10 | 8.75 | 4 | 4 | 4 | 5 | 4.2 | 2.08 |
| 8 | Workstream | [`mapping-strong-field`](../mapping-strong-field/priorities.md) | `observer_predictions` from one source-bound embedded horizon-interface record | 6.0 | 1.20 | -56 | 1.56 | 0.85 | 7 | 1.20 | 11.46 | 6 | 6 | 6 | 7 | 6.2 | 1.85 |
| 9 | Candidate | [`mapping-benchmarks`](../mapping-benchmarks/priorities.md) | `lorentz_preferred_frame` on one accepted moving branch with clock/ruler export and an independent leakage instrument | 7.5 | 1.35 | -56 | 1.56 | 0.40 | 6 | 1.10 | 6.95 | 4 | 4 | 5 | 6 | 4.6 | 1.51 |
| 10 | Shared packet | `residual-routing-event-ledger` | One concrete EOM-evolved transition with a closed event ledger | 9.5 | 1.70 | -23 | 1.23 | 0.25 | 6 | 1.10 | 5.46 | 4 | 4 | 4 | 5 | 4.2 | 1.30 |
| 11 | Workstream | [`mapping-quantum`](../mapping-quantum/priorities.md) | `detector_response_kernel_acceptance` on an accepted assembly basin measure | 6.0 | 1.35 | -56 | 1.56 | 0.40 | 9 | 1.40 | 7.08 | 6 | 8 | 7 | 8 | 7.3 | 0.97 |
| 12 | Engine | [`app-solver`](../app-solver/priorities.md) | `eom_application_surface`: bounded-population run and inspection surface with canonical history, progress, cancellation, checkpoint, diagnostics, and provenance | 6.0 | 1.30 | -56 | 1.56 | 0.20 | 2 | 0.70 | 1.70 | 4 | 2 | 4 | 4 | 3.3 | 0.52 |
| 13 | App | [`app-photon`](../app-photon/priorities.md) | `local_c_parameterization`: source-bound Noether sea state-to-$c_\gamma,c_{\mathrm{sig}}$ mapping with bounded no-catch-up and stale-root diagnostics | 5.0 | 1.15 | -24 | 1.24 | 0.35 | 3 | 0.80 | 2.00 | 4 | 8 | 8 | 6 | 6.6 | 0.30 |
| 14 | Op queue | [`aaa-operations`](../aaa-operations/priorities.md) | `borg_record_byte_identity`: portable sealed bytes plus Ubuntu, deployed-hash, and representative live-load verification | 5.0 | 1.20 | 0 | 1.00 | 0.20 | 2 | 0.70 | 0.84 | 4 | 2 | 4 | 4 | 3.3 | 0.25 |
| 15 | App | [`app-borg`](../app-borg/priorities.md) | `borg_taxonomy_morph_lab`: one source-carried coordinate morph teaching packet | 3.0 | 1.10 | 0 | 1.00 | 0.20 | 2 | 0.70 | 0.46 | 5 | 4 | 7 | 5 | 5.1 | 0.09 |

## Dormant-Deferred Routing — 2026-09-02

- At the operator's direction, `mapping-cosmology` and `mapping-nuclear-atomic-molecular` moved intact under `dormant-deferred`.
- Their 14 and 3 unresolved queue rows remain preserved but non-executable. No row was completed and no scientific claim advanced.
- The two owner rows left the active ranking. The 15 surviving rows were renumbered contiguously without changing their component scores or relative order.

## Active-Only Rerank Movement — 2026-07-26

- The top ten are unchanged. Their marginal objects and component scores remain current enough that removing archived rows does not alter their relative order.
- Eight `dormant-deferred` rows were removed: `app-equation-mapping`, `information-relay-machines`, `validation-gates`, `lissajou`, `media-videos`, `media-images`, `media-comics`, and `media-posts`.
- The then-separate MCP packet enters at rank `20` on `named_http_client_conformance`. Its score is for the remaining named-client verification object, not for the already completed local service and loopback adapter.
- The active rows below rank `16` were renumbered contiguously without changing component scores: `mapping-open-problems` is now `17`, `source-mining` `18`, `mapping-cosmology` `19`, `app-ideas` `21`, `archie` `22`, `app-ios` `23`, `aaa-operations` `24`, `app-ui-guidelines` `25`, `dark-sector` `26`, and `aaa-futures` `27`.
- Borg and Strong-Field now expose machine-checkable local rank-`1` objects. This changes queue representation, not their scores or evidence grade.

## App Ideas Owner Removal — 2026-07-27

- `app-ideas` was removed after its accepted concepts and implementation packets were transferred to Causal Delay Feedback and Borg.
- The surviving rows below its former rank were shifted upward by one without changing their component scores or evidence grades.

## Equation Mapping App Promotion — 2026-08-23

- `app-equation-mapping` moved from `dormant-deferred` into the active top-level inventory at operator direction.
- Its local rank-1 object is now `equation_page_api_access`, not the former seed-expansion object. The new inferred attention score is based on a bounded versioned read-only contract, stable-ID retrieval, canonical page-link resolution, and cross-surface integration validation.
- The promotion inserts the app at rank `17`; lower rows shift by one without changing their component scores or evidence grades.
- This is an execution-priority change only. It does not change equation claim levels, proof status, corpus authority, or equation-mapping score.

## Equation Mapping Link Contract Closure — 2026-08-24

- `equation_page_api_access` is verified across the canonical web corpus, generated textbook reading copies, and iOS public-web link bundle, so it no longer receives remaining-value credit.
- The app's next unresolved object is `symbol_definition_disclosure`. Its rank-18 inferred attention score reflects a useful but downstream accessibility and explanation surface with moderate implementation and cross-device validation burden.
- `mapping-open-problems` moves to rank `17`; all other rows retain their prior order. This rerank changes execution attention only and does not change any equation claim, proof status, corpus authority, or equation-mapping score.

## Equation Mapping Full-Corpus Baseline Closure — 2026-08-24

- `symbol_definition_disclosure` and `author_equation_registration_workflow` are verified across all 4,587 corpus display-equation occurrences, so they no longer receive remaining-value credit.
- The app's next unresolved object is `curated_carousel_promotion_review`. Every equation already has the same search, address, source, and symbol baseline; this object is only an editorial decision about whether one equation merits carousel placement and curated callouts.
- `app-equation-mapping` moves to rank `23`; `source-mining`, `mapping-cosmology`, the then-separate MCP packet, `archie`, and `app-ios` each move up one rank without score changes. The rerank changes execution attention only and does not change equation claim levels, proof status, corpus authority, or equation-mapping score.

## Equation Mapping Arbitrary-Promotion Withdrawal — 2026-09-01

- The operator withdrew `curated_carousel_promotion_review` because it did not identify a reader need, comprehension gap, or comparison use case that justified promoting an arbitrary equation.
- No equation was promoted. A future carousel addition must enter as a new accepted task naming the need, selected equation, intended callouts, claim boundary, and review condition.
- `review_packet_export` is deferred until an operator-selected local editor draft exists. Because the lane now has no executable next object, `app-equation-mapping` leaves the numeric ranking and becomes an unranked active owner.
- `aaa-operations`, `app-ui-guidelines`, `dark-sector`, and the retained historical `aaa-futures` row each move up one rank without score changes. This changes attention routing only; it does not change any equation claim, proof status, corpus authority, or equation-mapping score.

## Open Problems Paper-Shell Closure — 2026-09-02

- `mapping-open-problems` completed `paper_skeleton`: all 46 deployed chapters match the accepted single-level classification ledger, and all 16 `architecture-ready` chapters retain their specified-but-unexecuted four-part test contracts.
- The lane now has no executable object and becomes an unranked active owner. `source-mining` through `app-borg`, plus the retained historical `archie` and `aaa-futures` rows, each move up one rank without score changes.
- This is editorial and attention-routing closure only. It does not execute any test contract, close a scientific proof, classify an assembly, or alter a Borg or Braid queue object.

## UI Control-Bar Standard Acceptance — 2026-09-02

- `app-ui-guidelines` completed `standard_acceptance_pass` with fixed semantics, dimensions, action order, responsive behavior, page exceptions, and a live structural audit.
- It then completed `shared_bar_runtime_design` and `markdown_control_relocation`, followed by `main_webapp_and_animator_hud_unification`: the canonical runtime and stylesheet now generate one bar that moves between the two headers and passed desktop/mobile interaction checks.
- Its local rank-1 object is now `standalone_app_home_search_settings_migration`. The row retains its prior component scores and rank because the remaining multi-page migration has the same bounded support-surface value and cost envelope. This changes the scored object only; it does not claim that standalone pages already consume the canonical runtime.

## UI Standalone Migration Closure — 2026-09-02

- `app-ui-guidelines` completed `standalone_app_home_search_settings_migration` across every declared full-bar surface, including the final owner-coordinated Lorentz Geometry, Braid Search, Borg, and Borg Library batch.
- The lane now has no executable object and becomes an unranked active owner. `app-borg` moves from rank `18` to `17` without score changes.
- This is UI architecture and attention-routing closure only. It does not validate any simulation, scientific claim, campaign dataset, assembly classification, or Borg/Braid domain control.

## Solving The Crisis Source Refresh Closure — 2026-09-02

- `source-mining` completed `solving_the_crisis_source_refresh` with an exact 44-row primary/review/data/experiment source map for every retained Open Problems chapter; excluded chapters 45–46 remain outside the source program.
- The lane now has no executable object because its remaining repository-cleanup and domain-disposition rows require explicit external authority. It becomes an unranked active owner.
- Rows formerly below `source-mining` move up one rank without score changes. This is attention-routing maintenance only; the refresh does not close any scientific claim or change a Borg or Braid queue object.

## Borg Four-Item Closure Rerank — 2026-09-01

- Borg completed `prescribed_translation_and_causal_history_tubes`, `assembly_viewer_record_contract_carriers`, `assembly_explorer_disposition`, and `velocity_scale_sampling_evidence`. Those completed objects no longer receive remaining-value credit.
- Borg's local rank-1 object is now the deferred `borg_taxonomy_morph_lab`: one source-carried coordinate morph teaching packet. Its conservative support-surface score reflects optional local value, no direct closure-score pressure, low equation leverage, and unresolved source-packet dependencies.
- `app-borg` moves to rank `25`; rows formerly below rank `7` shift up one without score changes. This changes inferred execution attention only. The measured velocity sampler remains precision-insufficient and fail-closed, and no scientific claim or closure score advances.

## EOM Precision-Policy Closure Rerank — 2026-09-02

- `app-solver` completed `precision_convergence_and_failure_policy`; its live row now scores only `deterministic_cpu_multithreading_and_simd`.
- The new row retains global rank 1 because the bounded, implementation-known SIMD and replay object directly affects every EOM consumer and has low remaining conceptual burden. Its value falls from `40.54` to `34.53`, cost from `3.0` to `2.6`, and ROI from `13.51` to `13.28`.
- This is an inferred attention score, not a speed result. EOM-005 must still supply instruction-level SIMD evidence, matched wall-time measurements, deterministic replay, and independent-oracle agreement.

## EOM Deterministic CPU And SIMD Disposition Rerank — 2026-09-02

- `app-solver` completed `deterministic_cpu_multithreading_and_simd` with a mixed measured disposition. Four workers reduced the matched fine long-horizon median from `0.37` to `0.28` seconds with byte-identical single-worker replay; matched vector-enabled and vector-disabled long-horizon builds both measured a `1.07`-second median.
- The compiler confirms auto-vectorized loops, but the representative workload falsifies a useful SIMD speedup. Compiler-default vectorization remains enabled; no manual SIMD, structure-of-arrays, or cache-layout specialization is promoted without a measured benefit.
- The local rank-1 object is now `eom_application_surface`. Its score is rebuilt as a bounded app and integration artifact: lower foundational equation leverage and Eureka potential, moderate cross-consumer value, and remaining implementation/validation work. `app-solver` moves from rank `1` to rank `15`; rows formerly ranked `2` through `15` move up one without score changes.
- This changes inferred execution attention only. It does not change EOM mathematical acceptance, any physical claim, or the closure score.

## Dormant-Deferred Routing — 2026-09-02

- At operator direction, `app-ios`, the then-separate MCP packet, and `dark-sector` moved under `dormant-deferred`; their queues and evidence remain preserved but are no longer executable or scored while parked.
- The same archive-policy correction removes the stale `app-animator`, `archie`, and `aaa-futures` rows that were still present in the numeric table despite already living under `dormant-deferred`.
- The remaining 14 active owners and four shared packets retain their component scores and are renumbered contiguously. This is attention routing only; it does not complete MCP-001, iOS release acceptance, any dark-sector candidate, or any scientific claim.

## MCP-001 Named-Client Completion — 2026-09-02

- After archival, the operator completed the one outstanding ChatGPT-mode full-corpus HTTP test. The four bounded tools returned typed `ok`, and the missing-source read returned `not_found` with `SOURCE_NOT_FOUND`; loopback telemetry corroborated the five-tool sequence and snapshot identity.
- MCP-001 is now verified. The result does not reactivate the parked Archie-service MCP component, alter the active inventory or scores, establish remote deployment readiness, or advance any scientific claim.

## Current Focus

- **Operator-selected learning:** [QC-013 — Hilbert space and braid mapping](../mapping-quantum/work-queue.md#qc-013--hilbert-space-and-effective-state-vector-contract) is in progress in [mapping-hilbert/](../mapping-quantum/mapping-hilbert/README.md), with an academic synthesis maintained as dialogue develops. Bring it back at the next operator priority review or quantum learning session. Begin with ordinary vectors and build toward the braid mapping; no prior Hilbert-space understanding is assumed. This selected learning task does not change the physical-recovery ranking.
- **Measured/derived:** `app-solver` has the live production kernel, independent acceptance oracle, bounded-population precision and checkpoint/campaign-driver acceptance, exact checkpoint-backed record emission, a measured `1.321x` four-worker wall-latency gain, deterministic single-worker replay, compiler-confirmed auto-vectorization, and no representative SIMD speedup. **Inferred rank claim:** its next object is now the bounded application surface, which remains useful but cannot outrank the upstream derivation and physical-result lanes merely by packaging accepted capabilities. **Falsifier:** raise it if a consumer-ready surface becomes the immediate blocker for an accepted upstream result, or lower it if the canonical solver-only route cannot be exposed without unresolved EOM capabilities.
- **Measured/derived:** `braid-program` has a ratified charter and instrument gate, a fully constructed 243-row Campaign 1 workload, one diagnostic transverse inward-to-outward reversal, and no booked physics fate. **Inferred rank claim:** it is second because completing the first opposite-polarity binary fate remains the shortest route to a real assembly object or a decisive no-go. **Falsifier:** demote it if Campaign 1 cannot run under a source-frozen EOM/instrument contract or another lane obtains a shorter accepted route to a persistent assembly.
- **Measured/inferred:** the former attractor-search lane has a checkpointed harness, deterministic resume, native assembly-view records, and a measured small-population cost model. Those instrument capabilities now belong to EOM, while Braid Program owns the first statistical campaign. **Falsifier:** reopen a separate rank only if multiple non-braid scientific programs require an independent instrument roadmap and acceptance boundary.
- **Derived target:** `master-equation-closure` owns the causal wake update law, the finite coincident same-transmitter transition, and energy, momentum, and angular momentum accounts on that same update. Certified-braid construction and observer-level recovery remain downstream. **Falsifier:** demote it if no declared wake-state update reduces to the transmitter-side acceleration law on regular charts while crossing coincident same-transmitter birth finitely and closing the conserved accounts.
- **No closure-score movement:** the ranking changes attention order only. No row in the 2026-06-28 closure scorecard rises from this audit.

## Operator Burden Triage

The likely long numerical or proof campaigns remain concentrated in the theory and recovery rows; lower-cost app and coordination work remains lower in the table. A lower-cost row may produce visible progress sooner, but it does not outrank the derivation spine unless a concrete upstream result is ready for it to inspect, validate, or publish.

The `dormant-deferred` archive and all of its children are unscored.

## Work Queue

The routed next actions now live in [work-queue.md](work-queue.md). Each implementation remains owned by the linked workstream queue.

## Organization Status

- The numeric ranks are contiguous and include every top-level rankable owner plus the four explicitly ranked shared packets.
- No `dormant-deferred` child appears in the numeric table or active discussion queue.
- Legacy braid directories stay archived; Braid Program owns scientific search campaigns, EOM owns reusable execution capability, and the former attractor-search packet is distributed between those two canonical owners.
- The former [`app-simulation`](../app-simulation/priorities.md) directory is a compatibility location outside the owner inventory. Its canonical [Simulation Protocol Routing Index](../../op/simulation-protocol-routing-index.md) is operations documentation, and preserved protocol detail advances only through the named scientific or proof owner.
- [closure-join-matrix.md](closure-join-matrix.md) remains the shared-object dependency view, and [inventory.md](inventory.md) remains the detailed file map.
- Workstream metadata mirrors this table. Shared theorem packets do not require separate workstream metadata.

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [closure-scorecard](../../../content/markdown/aaa/validation/closure-scorecard.md)
- [failure-criteria](../../../content/markdown/aaa/validation/failure-criteria.md)
- [software-architecture-and-maintenance](../../../content/markdown/aaa/archie/software-architecture-and-maintenance.md)
- [research-notebook](../../../content/markdown/aaa/archie/research-notebook.md)
