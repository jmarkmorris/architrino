# Higher-Fold One-Leaf Boundary-Opening Interval Certificate Attempt

## Verdict

Status: `one_leaf_boundary_opening_interval_certificate_attempt_fail_closed_no_row_consumption`.

This priority-only packet tests whether the positive sampled one-leaf
boundary-opening budget can be promoted into an interval certificate. It
declares nonempty sampled candidate lambda intervals for
3 / 3 rows, with
shared threshold
`lambda>0.301815056706425`
and trial margin
`0.0031849432935751`.

The attempt fail-closes. It constructs 0 / 3 interval active-endpoint
enclosures, 0 / 3 interval defect-derivative bounds, 0 / 3
interval boundary-opening positivity certificates, 0 / 3
source/receiver monotonicity certificates, 0 / 3 ownership or
non-owned-complement closures, and 0 / 3 proof-grade interval
certificates. It consumes 0 rows, keeps `preledger_pass=false`, keeps
`updates_live_ledger=false`, and leaves `branch_chart_authorized=false`.

The imported trial replay still has 162
split-required base rows, 0
complete receiver-cover parent rows, 0
accepted fold-layer rows, and no branch-chart authorization.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
| `row_closure_budget` | `row_closure_geometry_budget_packet.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `4f88bae699b13f74331f14e1a56c14f50e8a839441bd0bf28d3975d7c9486ce6` |
| `direct_path_screen` | `one_leaf_direct_path_lambda_shift_screen.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true | `08176b503110002ca25fb0cf201860d124e33e6ca0e424b8d4ff8fae58069d88` |
| `lambda0305_replay_audit` | `lambda0305_preledger_replay_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true | `cd79f688660cf93b563a876dc4446da0c9c8aefeb8f19751eac15f13cdd468f3` |
| `endpoint_boundary_binding_attempt` | `fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `ce9055235d8ba2c3a64ca7b0522b701e1c1044ea6c0a6c3cfaced38eedbec7de` |

## Certificate Rule

A one-leaf boundary-opening interval certificate must enclose the active endpoint pair over the candidate lambda interval, bound the defect derivative with outward margins, prove positive boundary opening throughout the interval, preserve source and receiver monotonicity, certify memory margins and endpoint ownership/no-double-counting, exclude simple-root branch reuse, close non-owned complements, and pass the proof-interval preledger before any row can be consumed.

## No-Promotion Rule

Sampled active-endpoint stability, a nonempty lambda interval, imported root topology at lambda=0.305, and an imported v1-v6 replay are necessary diagnostics only. They do not imply interval positivity, endpoint boundary binding, endpoint motion, preledger pass, row consumption, or branch-chart authorization.

## Candidate Intervals

| Row | Failed side | Lower open threshold | Trial lambda | Width to trial | Sampled opening margin | Interval certificate |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| `R_w_A04_A03` | `lo` | 0.300720019526139 | 0.305 | 0.00427998047386102 | 0.000158664063655886 | false |
| `R_u_A10_A09` | `lo` | 0.300720019526139 | 0.305 | 0.00427998047386102 | 0.000158664063655664 | false |
| `R_u_A07_A06` | `hi` | 0.301815056706425 | 0.305 | 0.0031849432935751 | 0.000431988180379767 | false |

## Field Audit

| Field | Certified count |
| --- | ---: |
| `candidate_lambda_interval_declared` | 3 / 3 |
| `candidate_lambda_interval_nonempty` | 3 / 3 |
| `sampled_active_endpoint_stability_present` | 3 / 3 |
| `sampled_opening_above_probe_threshold_present` | 3 / 3 |
| `imported_trial_root_topology_recertified` | 3 / 3 |
| `imported_trial_preledger_replay_present` | 3 / 3 |
| `interval_active_endpoint_enclosure_present` | 0 / 3 |
| `interval_defect_derivative_bound_present` | 0 / 3 |
| `interval_boundary_opening_positive_certified` | 0 / 3 |
| `source_monotonicity_preserved_on_interval` | 0 / 3 |
| `receiver_monotonicity_preserved_on_interval` | 0 / 3 |
| `memory_margins_certified_on_interval` | 0 / 3 |
| `endpoint_ownership_no_double_counting_certified` | 0 / 3 |
| `simple_root_branch_reuse_exclusion_certified` | 0 / 3 |
| `non_owned_complement_closed` | 0 / 3 |
| `endpoint_boundary_bindings_constructed` | 0 / 3 |
| `endpoint_motion_rules_constructed` | 0 / 3 |
| `receiver_cover_parent_row_complete` | 0 / 3 |
| `fold_layer_rows_accepted` | 0 / 3 |
| `preledger_pass` | 0 / 3 |
| `row_consumed` | 0 / 3 |
| `branch_chart_authorized` | 0 / 3 |

## Closure Burden

The next proof object must supply interval data, not another sampled replay:
active-endpoint enclosure over the lambda interval, an outward defect-derivative
bound, positive boundary opening throughout the interval, source/receiver
monotonicity, memory margins, endpoint ownership/no-double-counting,
branch-reuse exclusion, non-owned complement closure, endpoint boundary
bindings and endpoint motion rules where the endpoint-functional route is used,
and a preledger pass before row consumption.

## Capture Decision

Priority-only. The attempt records a nonempty sampled lambda interval for each one-leaf row, but it fail-closes because no interval active-endpoint enclosure, derivative bound, interval positivity proof, monotonicity, memory, ownership/no-double-counting, branch-reuse exclusion, non-owned complement closure, endpoint binding/motion, preledger pass, or row consumption is certified.
