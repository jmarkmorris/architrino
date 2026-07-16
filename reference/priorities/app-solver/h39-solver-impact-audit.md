# H39 Solver Impact Audit

Status: `closed-retrospective-boundary-capture`

Kind: `retrospective-impact-audit`

Source task: `h39_solver_impact_audit` in [priorities.md](priorities.md)

## Purpose

This audit asks whether the central solver would likely have changed the H39 solution path. The possible classifications are:

| Classification | Meaning |
| --- | --- |
| `h39_no_material_effect` | The central solver would not have changed the result, runtime profile, manual burden, or blocker order in a meaningful way. |
| `h39_same_result_faster` | The same mathematical result and blocker would likely have appeared, but with less runtime, less manual iteration, or better diagnostics. |
| `h39_refined_result` | The central solver would likely have produced sharper residuals, bounds, root data, or provenance while preserving the same broad conclusion. |
| `h39_changed_bottleneck` | The central solver would likely have removed or demoted a historical bottleneck and exposed a different live blocker earlier. |
| `h39_investigation_required_mismatch` | A central-solver replay would disagree with historical artifacts in root count, branch identity, residual sign, interval containment, or claim boundary in a way that needs investigation. |

This is not an app migration. It is also not a claim that the central solver would have solved H39.

## Current Evidence

The direct H39 sources inspected for this audit are:

- [priorities.md](priorities.md)
- [precision.md](precision.md)
- h39-h38-source-covariance-closure-sprint-wrap-up.md (legacy-braid ref: `braid-archive/braid-geometry-export-bridge/h39-h38-source-covariance-closure-sprint-wrap-up.md`)
- geometry-bridge.md (legacy-braid ref: `braid-archive/braid-geometry-export-bridge/priorities.md`)
- octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.md (legacy-braid ref: `braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.md`)
- octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-hybrid-prefix-cauchy-order-diagnostic.md (legacy-braid ref: `braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-hybrid-prefix-cauchy-order-diagnostic.md`)
- octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-coefficient-series-engine.md (legacy-braid ref: `braid-archive/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-coefficient-series-engine.md`)
- [theta3minus-fold-pair-first-y-gd-h39-recurrence-refined-subcover-diagnostic.mjs](../../../scripts/neutral-braid/theta3minus-fold-pair-first-y-gd-h39-recurrence-refined-subcover-diagnostic.mjs)
- [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs)
- [h39-shared-domain-primitive-replay.mjs](../../../scripts/solver-audits/h39-shared-domain-primitive-replay.mjs)
- [h39-terminal-graph-remainder-budget-replay.mjs](../../../scripts/solver-audits/h39-terminal-graph-remainder-budget-replay.mjs)
- [neutral-braid-theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.test.js](../../../tests/neutral-braid-theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.test.js)
- [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.test.js)
- [solver-h39-shared-domain-primitive-replay.test.js](../../../tests/solver-h39-shared-domain-primitive-replay.test.js)
- [solver-h39-terminal-graph-remainder-budget-replay.test.js](../../../tests/solver-h39-terminal-graph-remainder-budget-replay.test.js)
- [receiver-normal-branch-strength-certificate.md](../master-equation-closure/receiver-normal-branch-strength-certificate.md)
- [branch-provider-evidence-report.md](branch-provider-evidence-report.md)

No H39-named proof-program artifacts were found under [proof-programs](../proof-programs/priorities.md). The proof-program relevance is indirect: H39 uses certificate discipline, claim boundaries, source-hash style provenance, fail-closed validators, and candidate-only proof artifacts.

The H39/H38 source-covariance wrap-up records the live blocker as the missing same-domain branch-bearing source-map provider object before aggregate $P$ is formed. In concrete terms, the historical path needed one of these objects:

- explicit same-domain terminal provider-object branch rows $P_-$ and $P_+$;
- a same-domain branch projection map from source terms into $P_b$;
- a same-domain pushforward operator and normalization identity mapping expression-branch feeds into aggregate provider-object terms;
- a certified correction law from $A_G^{\mathrm{terminal}}$ to $A_P=P_- - P_+$.

The central solver can improve root, path-history, precision, replay, and ledger discipline. It does not currently define the H39 same-domain provider-object branch schema, projection map, pushforward identity, or directed-rounded proof-certificate backend needed to manufacture the missing $P_b$ object.

Foundation/dynamics impact 2026-06-21: the new [Noether Braid Topological Charge](../../../content/markdown/aaa/noether-braid/noether-braid-topological-charge.md) chapter sharpens solver ledger vocabulary through $[\mathfrak B]_{\mathrm{top}}=(N_s,M_p,c_1)$, but it does not change the H39 blocker. H39 can consume signed-root and assembly topological charge diagnostics as replay metadata, yet the live closure still requires the same-domain provider-object branch schema and upstream producer rows before aggregate $P$ is formed. Classification remains `h39_no_material_effect` for final H39 closure unless that provider-object surface is explicitly reopened.

Master-equation sheaf refinement 2026-06-22: the latest [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) pass adds useful replay vocabulary for H39-style diagnostics: branch-chart local inverse data, $H^0$ global-section counts, $\check H^1$ gluing obstructions, separate $\eta$ versus $\epsilon_c$ regulator status, and finite-window degree changes at memory-boundary starvation. This still does not change the H39 final blocker. The missing object remains a same-domain branch-bearing provider object before aggregate $P$ is formed, so the impact classification remains `h39_no_material_effect` for final closure and `h39_refined_result` only for metadata-rich replay surfaces.

Receiver-normal first-derivative consequence 2026-06-29: the receiver-normal branch-strength certificate and branch-provider evidence report sharpen the same blocker for derivative-consuming force/action packets. Even if an H39 provider-object branch schema produced $A_P=P_- - P_+$ or explicit expression-level `P_-` / `P_+` rows, receiver-normal use still requires `h39-receiver-normal-retained-record-preimage-row/v0`: an accepted provider-object branch row bound to one retained causal-root force/action record carrying $D_s$, $D_T$, fixed signs, $W^{\mathrm{rec}}$, $D_vD_s$, $D_vD_T$, reconstructed $D_vW^{\mathrm{rec}}$, geometry derivatives, and the branch-family checksum. The solver therefore needs a retained-record preimage fixture or producer before H39 provider rows can feed `receiver-normal-retained-branch-family-first-derivative/v0`. Candidate alpha rows, row-local expression feeds, lambda terminal witnesses, aggregate-$P$ probes, hybrid prefix-Cauchy diagnostics, and coefficient-series source-map residual candidates remain negative controls.

Provisional classification before executable replay: `h39_same_result_faster`, bounded by `h39_no_material_effect` for final closure. The likely effect is sharper and faster diagnosis of solver-like subproblems, not automatic H39 closure.

## Historical Bottleneck Classes

| Bottleneck class | H39 evidence | Central-solver relevance |
| --- | --- | --- |
| Root solving | H39 packets use fold-pair and regular-root structure, root tangent bounds, root subdivisions, root graph centers, and Jacobian floor witnesses. | Maps to causal-root ledgers, root residuals, bracket/isolation metadata, Jacobian sign strata, first-failure codes, and precision replay. |
| Interval and bracket handling | The wrap-up says interval excess was not only partition size. Midpoint and affine candidates behaved well, while raw directed-rounded terminal producer intervals remained too wide. | Maps to interval or bounded charts, stage error budgets, validation replay, and explicit halt status when interval authority is insufficient. |
| Path-history or source-history handling | The live blocker is that aggregate $P$ provider rows are aggregate-only before terminal replay, so branch information is not available where H39 needs $P_-$, $P_+$, or $A_P$. | Maps only partially. The solver path-history stream can preserve branch metadata when supplied, but H39 needs a proof-level same-domain source-map provider object not yet represented by the central solver API. |
| Precision and dynamic range | H39 uses small residual budgets, Jacobian clearances, Cauchy majorants, primitive bounds, scale ratios, and directed-rounded shared-domain requirements. | Maps strongly to [precision.md](precision.md): numeric charts, precision paths, normalized residuals, Jacobian diagnostics, error budgets, and validation replay. |
| Ledger, replay, and provenance | H39 artifacts carefully keep candidate-only status, claim boundaries, schema checks, source-term provenance, provider-boundary replay, and validator rejection of overclaims. | Maps to solver manifests, artifact hashes, run claim levels, root ledgers, precision metadata, and validation-replay records. It does not yet map to H39 provider-object theorem identities. |
| Manual workflow overhead | The H39 path accumulated many packet builders, focused tests, and replay wrappers before isolating the upstream provider-object blocker. | The central solver could reduce repetition by standardizing replay manifests, comparable output sets, root/precision diagnostics, and timing or memory records. |

## Representative Replay Candidates

| Candidate | Historical artifact | Needed central-solver capability | Current replay classification |
| --- | --- | --- | --- |
| `h39_shared_domain_primitive_replay` | `buildH39SharedDomainPrimitiveDiagnostic` and tests for missing bounds, supplied bounds, and external directed-rounded provenance wording. | Validation replay manifest, interval/bounded chart metadata, normalized residual and Jacobian fields, claim boundary, artifact hash, and precision-path diagnostics. | `fixture_adapter_built`. The fixture translates the primitive-bound rows into solver-style validation artifacts and classifies the primitive replay surface as `h39_refined_result`. |
| `h39_terminal_graph_remainder_budget_replay` | `buildH39H38ExpressionN38TerminalGraphRemainderBudgetDiagnosticCandidate` and the focused terminal graph remainder budget test. | Root-ledger detail, root subdivisions, residual scale, interval authority, terminal-row provenance, timing records, and strict replay comparison. | `fixture_adapter_built`. The fixture translates the positive-$\xi$ and symmetric cross-fold terminal graph budget cases into solver-style validation artifacts and classifies the replay surface as `h39_refined_result`. |
| `h39_affine_endpoint_provider_boundary_replay` | The focused test `h39 terminal affine-zeta endpoint provider replay crosses the provider boundary`. | Branch-local source-history records, provider-boundary rows, terminal-row enclosure metadata, interval containment semantics, and directed-rounded authority labels. | `needs_missing_solver_capability`. The central solver does not currently expose H39 provider-boundary theorem objects. |
| `h39_pre_sum_provider_branch_source_audit` | `buildH39RequestedY44TerminalExpressionLevelSourceMapProviderObjectPreSumBranchSourceAuditCandidate`. | Source-history streams that preserve branch labels, branch weights, branch intervals, projection coefficients, and provider-object branch ids before aggregate formation. | `needs_missing_solver_capability`. The current solver can preserve supplied metadata, but it cannot derive the missing same-domain $P_b$ source-map provider object. |
| `h39_provider_object_pushforward_audit` | `buildH39RequestedY44TerminalProviderObjectPbPushforwardOperatorAuditCandidate`. | Same-domain pushforward operator rows, normalization identity rows, branch-pair admissibility, and provider-object branch-pair ledgers. | `needs_missing_solver_capability`. This is a proof-object identity requirement, not merely a root-solving request. |
| `h39_source_map_provider_object_branch_split_map_producer_target` | `h39-source-map-provider-object-branch-split-map-producer-target/v0` and `h39-source-map-provider-object-branch-split-map-source-absence-boundary/v0` in the branch-provider evidence report. | Source-map split-map source field, pre-aggregate `source_term_provider_probe_rows[].source_term_residual_rows[]` branch-bearing payloads, $A_P=P_- - P_+$ row count, explicit `P_-` / `P_+` rows, interval payloads, the $P_b$ map, projection coefficients or alpha map, pushforward and normalization identities, retained causal-root binding, and the aggregate-erasure negative control before aggregate $P$ is consumed. | `needs_missing_solver_capability` for the upstream producer: the branch-provider report emits the split-map producer target matrix fail-closed and names `buildH39RequestedY44TerminalAggregatePProviderPreaggregationBranchBearingAuditCandidate` as the expected pre-aggregate payload source over `source_map_residual_shared_stream_five_node_source_term_provider_probe.source_term_provider_probe_rows[].source_term_residual_rows[]`; the source remains `aggregate-P-provider-probe-born-aggregate-only`, missing same-domain pushforward/normalization identity fields, blocked $P_b$ fields, and retained causal-root binding, while aggregate $P$ is rejected as too late to recover branch identity. |
| `h39_producer_side_provider_object_branch_row_target` | `h39-producer-side-provider-object-branch-row-target/v0` in the branch-provider evidence report. | Same-domain $A_P=P_- - P_+$ or explicit `P_-` / `P_+` branch rows on all 15 terminal rows, both interval payloads, the $P_b$ map, branch projection or alpha map, `pushforward_operator_ref`, `normalization_identity_ref`, and same-record binding before aggregate $P$ is consumed. | `needs_missing_solver_capability` for the producer: the branch-provider report emits the producer-side target matrix fail-closed, but no accepted provider-object branch producer exists. |
| `h39_aggregate_p_preaggregation_branch_bearing_audit` | `buildH39RequestedY44TerminalAggregatePProviderPreaggregationBranchBearingAuditCandidate`, the cleanest stopping point in the wrap-up. | Raw provider-probe preservation of branch labels, branch weights, branch intervals, projection maps, pushforward operators, and normalization fields before aggregate $P$. | `needs_missing_solver_capability`. The historical artifact reports zero hits in the required branch-bearing field groups, so the central solver would need a new H39 provider-object schema and upstream producer. |
| `h39_receiver_normal_retained_record_preimage_fixture` | `h39-receiver-normal-retained-record-preimage-fixture/v0` in the branch-provider evidence report and `receiver-normal-retained-branch-family-first-derivative/v0` in the receiver-normal branch-strength certificate. | Accepted H39 provider-object branch rows plus a retained causal-root force/action record with same-record $D_s$, $D_T$, fixed signs, $W^{\mathrm{rec}}$, $D_vD_s$, $D_vD_T$, reconstructed $D_vW^{\mathrm{rec}}$, geometry derivatives, and branch-family checksum. | `needs_missing_solver_capability` for the producer: the branch-provider report emits the retained-record preimage fixture matrix fail-closed, but the upstream accepted $P_-$ / $P_+$ provider-object branch producer and retained causal-root binding are still missing. |

## First Executable Replay Fixture

Implemented first fixture: `h39_shared_domain_primitive_replay`.

Executable artifacts:

- [h39-shared-domain-primitive-replay.mjs](../../../scripts/solver-audits/h39-shared-domain-primitive-replay.mjs)
- [solver-h39-shared-domain-primitive-replay.test.js](../../../tests/solver-h39-shared-domain-primitive-replay.test.js)

Reasons this was the right first fixture:

- It is H39-specific and already has focused tests.
- It is compact compared with the terminal provider-boundary packets.
- It exercises the central solver precision contract directly: interval or bounded charts, Jacobian lower bounds, root-tangent numerator bounds, residual scale, claim boundary, and validation replay.
- It can produce a meaningful comparison without pretending to solve the missing provider-object branch identity.

The fixture emits:

- historical artifact id and source file;
- central-solver request or replay manifest;
- selected precision path, numeric chart, numeric type, unit convention, and scale normalization;
- global and stage error budgets;
- root or primitive residual scale, absolute residual, normalized residual, tolerance, iteration count where applicable, bracket or isolation metadata, Jacobian value, Jacobian sign stratum, and first-failure code;
- old artifact status, central replay status, timing note, memory note, and impact classification.

First-run outcome: `h39_refined_result` for the primitive replay surface, while preserving the broader H39 blocker as missing provider-object branch provenance. The fixture explicitly records that no native central-solver H39 backend was invoked.

## Second Executable Replay Fixture

Implemented second fixture: `h39_terminal_graph_remainder_budget_replay`.

Executable artifacts:

- [h39-terminal-graph-remainder-budget-replay.mjs](../../../scripts/solver-audits/h39-terminal-graph-remainder-budget-replay.mjs)
- [solver-h39-terminal-graph-remainder-budget-replay.test.js](../../../tests/solver-h39-terminal-graph-remainder-budget-replay.test.js)

Reasons this was the right second fixture:

- It was already the next audit action after the primitive replay.
- It exercises the central solver's root-ledger and validation-replay vocabulary against a heavier H39 terminal graph diagnostic.
- It records root subdivision count, comparison-window rows, interval authority, terminal $h_{37},h_{36},h_{35}$ residual rows, producer interval overbudget status, replay hashes, timing notes, and memory notes.
- It keeps the result candidate-only and does not promote the terminal graph budget into a directed-rounded terminal provider enclosure.

Second-run outcome: `h39_refined_result` for the terminal graph remainder budget replay surface. Both the positive-$\xi$ window and the symmetric cross-fold window preserve the historical decision: graph plus live nonterminal replay stays below the $5\%$ budget target, raw terminal producer intervals remain over budget, midpoint-fit residuals remain inside the allowed budget, and the producer interval gap stays at roughly $45.4\times$ the allowed scale. The fixture explicitly records that no native central-solver H39 backend was invoked.

## Audit Plan

1. Keep provider-boundary, aggregate-$P$, and receiver-normal retained-record preimage packets as missing-capability cases until the solver owns an H39 provider-object schema plus a retained-record preimage fixture or producer.
2. If a replay changes root counts, residual signs, Jacobian sign strata, interval containment, or claim-boundary status, classify it as `h39_investigation_required_mismatch` and stop before broadening the audit.
3. If replay agrees and only improves diagnostics or runtime, classify the relevant candidate as `h39_same_result_faster` or `h39_refined_result`; keep the whole H39/H38 source-covariance lane blocked until a same-domain branch-bearing provider object exists.

## Current Conclusion

The central solver would likely have improved H39's numerical replay discipline, precision metadata, root/ledger reporting, and repeated manual comparison work. It would not currently supply the missing same-domain branch-bearing provider object before aggregate $P$, and it would not bind that provider object to the same retained causal-root force/action record needed for $D_s$, $D_T$, $W^{\mathrm{rec}}$, $D_vD_s$, $D_vD_T$, and reconstructed $D_vW^{\mathrm{rec}}$.

Therefore the best current retrospective classification is:

| Scope | Classification |
| --- | --- |
| H39 shared-domain primitive replay | `h39_refined_result`: the adapter preserves historical decisions and claim boundaries while adding solver-style precision metadata, primitive residual rows, hashes, and resource notes. |
| H39 terminal graph remainder budget replay | `h39_refined_result`: the adapter preserves the historical positive-$\xi$ and symmetric cross-fold budget decisions while adding solver-style root ledger rows, terminal residual rows, replay hashes, interval authority notes, timing notes, and strict diff metadata. |
| Other H39 solver-like subproblems | Provider-boundary and aggregate-$P$ cases are classified as missing-capability surfaces: they require H39 provider-object theorem schemas and upstream producer rows rather than only replay formatting. |
| Split-map producer target | `needs_missing_solver_capability`: the executable target isolates the first upstream source-field absence, names the searched H39 candidate producers, and records the missing pre-aggregate branch-bearing row family plus retained causal-root binding requirement before preserving the $A_P$ row-count, explicit branch-row, interval-payload, identity-payload, and aggregate-erasure negative-control blockers. |
| Producer-side provider-object branch row target | `needs_missing_solver_capability`: the executable target distinguishes missing/partial `P_-` / `P_+` producer rows from complete producer rows that still lack interval payloads, identity payloads, or same-record binding. |
| Receiver-normal first-derivative consumer | `needs_missing_solver_capability`: H39 provider rows still must pass through `h39-receiver-normal-retained-record-preimage-row/v0` before they can feed `receiver-normal-retained-branch-family-first-derivative/v0`; the executable fixture rejects current absence, partial branch rows, accepted-but-unbound rows, missing derivative rows, and fourth-jet/Taylor diagnostics. |
| Final H39/H38 source-covariance blocker | `h39_no_material_effect` until the central solver gains an H39 provider-object branch schema, an upstream producer for $P_b$, and retained-record preimage binding. |
| Next audit action | Hold `h39_affine_endpoint_provider_boundary_replay` at missing-capability status and use the executable retained-record preimage fixture as the fail-closed target for any future accepted `P_-` / `P_+` provider-object branch producer. |

## Completion Judgment

`h39_solver_impact_audit` is complete as a retrospective solver-impact audit and
closed in [priorities.md](priorities.md). Representative H39 replay surfaces were
selected, two executable solver-style replay fixtures were built, historical
artifact decisions were preserved, and the current classifications are recorded.

The central solver would have improved replay discipline and diagnostics for the
covered primitive and terminal graph budget surfaces, but it would not have
removed the final H39/H38 source-covariance blocker or the downstream
receiver-normal retained-record derivative blocker. Reopening this audit should
wait until the solver owns an H39 provider-object branch schema, an upstream
producer for same-domain $P_b$ rows, and a retained-record preimage fixture or
producer binding accepted provider rows to the same retained causal-root
force/action record.
