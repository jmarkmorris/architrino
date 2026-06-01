# Higher-Fold Fold-Coordinate Row-Closure Geometry Budget

## Verdict

Status: `row_closure_geometry_budget_packet_fail_closed_no_row_consumption`.

This priority-only packet records the row-closure geometry route left open by
the endpoint-boundary-binding construction attempt. It imports the one-leaf
direct-path lambda screen and the `lambda=0.305` replay audit, then separates
the screen-level geometry budget from proof-grade row consumption.

The sampled direct-path geometry opens 3 / 3
one-leaf rows. The shared active-endpoint threshold is
`lambda>0.301815056706425`,
and the imported trial value `lambda=0.305` has minimum
margin `0.0031849432935751`.
The imported trial also has root topology recertified and v1-v6 preledger
replayed, but the replay still has
162 split-required base rows,
0 complete receiver-cover parent
rows, 0 accepted fold-layer rows, and no
branch-chart authorization.

The packet consumes 0 rows, keeps `preledger_pass=false`, keeps
`updates_live_ledger=false`, and leaves `branch_chart_authorized=false`.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
| `direct_path_screen` | `one_leaf_direct_path_lambda_shift_screen.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true | `08176b503110002ca25fb0cf201860d124e33e6ca0e424b8d4ff8fae58069d88` |
| `lambda0305_replay_audit` | `lambda0305_preledger_replay_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true | `cd79f688660cf93b563a876dc4446da0c9c8aefeb8f19751eac15f13cdd468f3` |
| `fold_layer_burden` | `fold_layer_burden.fresh-v10-higher-fold-12-root-rebuild-v0.json` | true | `da59d44487f227ab01170459c660fb0cc92e9b8d9a9b894ba8a4c881af015e62` |
| `endpoint_boundary_binding_attempt` | `fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `ce9055235d8ba2c3a64ca7b0522b701e1c1044ea6c0a6c3cfaced38eedbec7de` |

## Geometry Budget Rule

For each one-leaf row, use the direct-path active-endpoint screen to form a sampled boundary-opening budget. A sampled row opens only if its active endpoints are stable from the baseline lambda to the trial lambda, the trial sampled defect is negative, and the combined favorable source/receiver boundary shift exceeds the exact probe threshold. This is not a row-consumption rule.

The screen-level lemma recorded by this packet is:

If the active endpoint pair for row r remains fixed on a lambda interval and the sampled active-endpoint defect derivative is negative, then the screen-level boundary opening threshold is lambda > lambda_min(r). For this packet, max_r lambda_min(r) is below the trial lambda, so the sampled one-leaf geometry opens. The lemma is screen-level until the active-endpoint, monotonicity, topology, preledger, ownership, and complement conditions are interval-certified.

## Lambda Budget

| Quantity | Value |
| --- | ---: |
| Baseline lambda | 0.3 |
| Trial lambda | 0.305 |
| Shared active-endpoint lambda threshold | 0.301815056706425 |
| Minimum trial margin after shared threshold | 0.0031849432935751 |
| Samples per boundary interval in imported screen | 50000 |
| Imported trial topology recertified | true |
| Imported trial v1-v6 replay present | true |
| Imported trial preledger pass | false |
| Imported trial branch-chart authorized | false |

## Row Budgets

| Row | Failed side | Probe threshold | Trial sampled defect | Combined opening | Opening margin | Lambda threshold | Trial margin | Proof-grade row |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `R_w_A04_A03` | `lo` | 0.000026691996524 | -0.00016076283641997 | 0.000185356060179886 | 0.000158664063655886 | 0.300720019526139 | 0.00427998047386102 | false |
| `R_u_A10_A09` | `lo` | 0.000026691996524 | -0.00016076283641997 | 0.000185356060179664 | 0.000158664063655664 | 0.300720019526139 | 0.00427998047386102 | false |
| `R_u_A07_A06` | `hi` | 0.00024618430271 | -0.000434576402819964 | 0.000678172483089767 | 0.000431988180379767 | 0.301815056706425 | 0.0031849432935751 | false |

## Replay And Route Locks

| Imported replay field | Value |
| --- | ---: |
| v4 simple-root subrows | 41 |
| v5 receiver-cover certified cells | 567 |
| v5 complete receiver-cover parent rows | 0 |
| v6 receiver-cover certified cells | 632 |
| v6 receiver-cover structural misses | 3012 |
| v6 split-required base rows | 162 |
| v6 accepted fold-layer rows | 0 |

| Endpoint route lock | Value |
| --- | ---: |
| Endpoint source-data rows ready | 4 |
| Row source-data rows ready | 3 |
| Endpoint boundary bindings constructed | 0 |
| Endpoint motion rules constructed | 0 |
| Endpoint evaluation maps constructed | 0 |
| Full endpoint evaluation maps constructed | 0 |
| Exact $B\xi=0$ certificates | 0 |
| Rank certificates | 0 |

| Fold-layer route lock | Value |
| --- | ---: |
| Fold-layer burden rows | 112 |
| Separator count | 12 |
| Accepted fold-layer rows at trial lambda | 0 |

## Proof-Grade Field Audit

| Field | Certified count |
| --- | ---: |
| `sampled_trial_defect_opened` | 3 / 3 |
| `combined_opening_gt_probe_threshold` | 3 / 3 |
| `active_endpoint_stable_between_lambdas` | 3 / 3 |
| `root_topology_recertified_at_trial_lambda` | 3 / 3 |
| `proof_interval_preledger_rerun_at_trial_lambda` | 3 / 3 |
| `proof_interval_preledger_passed_at_trial_lambda` | 0 / 3 |
| `source_monotonicity_preserved_under_candidate_change` | 0 / 3 |
| `receiver_monotonicity_preserved_under_candidate_change` | 0 / 3 |
| `memory_margins_all_owned_components` | 0 / 3 |
| `endpoint_ownership_no_double_counting` | 0 / 3 |
| `simple_root_branch_reuse_exclusion` | 0 / 3 |
| `non_owned_complement_closed` | 0 / 3 |
| `endpoint_boundary_bindings_constructed` | 0 / 3 |
| `endpoint_motion_rules_constructed` | 0 / 3 |
| `receiver_cover_parent_row_complete` | 0 / 3 |
| `fold_layer_rows_accepted` | 0 / 3 |
| `row_consumed` | 0 / 3 |
| `branch_chart_authorized` | 0 / 3 |

## Closure Burden

The direct-path lambda family has a real screen-level row-closure geometry
budget, but replaying `lambda=0.305` proves that this budget is not yet a
preledger closure mechanism. The next proof object must either make the
positive boundary-opening budget interval-certified with monotonicity, memory,
ownership/no-double-counting, branch-reuse, and non-owned-complement closure, or
strengthen receiver-cover and fold-layer certification so the same trial can
consume rows. It must not re-promote endpoint source data or component locators
as endpoint boundary bindings.

## Capture Decision

Priority-only. The packet constructs a shared sampled lambda opening budget and imports the topology/preledger replay result, but the replay remains preledger-blocked and the endpoint-functional boundary-binding route remains absent. It does not emit candidate artifacts, topology recertification, proof-interval replay, row consumption, live-ledger updates, or a branch chart.
