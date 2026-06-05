# Higher-Fold One-Leaf Active-Endpoint Interval-Enclosure Attempt

## Verdict

Status: `one_leaf_active_endpoint_interval_enclosure_attempt_fail_closed_sampled_stability_only_no_row_consumption`.

This priority-only packet tests the first missing subproblem in the one-leaf
boundary-opening interval-certificate attempt: whether stable sampled active
endpoint pairs can be promoted into interval active-endpoint enclosures. It
imports the nonempty sampled lambda intervals from the prior attempt and the
direct-path screen at `lambda=0.305`.

The attempt fail-closes. It records sampled active-endpoint pair stability in
3 / 3 rows over
candidate intervals ending at `0.305`, but constructs 0 / 3
source endpoint interval boxes, 0 / 3 receiver endpoint interval
boxes, 0 / 3 endpoint residual interval bounds, 0 / 3
endpoint derivative-isolation certificates, 0 / 3 endpoint
switch-exclusion certificates, 0 / 3 active-endpoint uniqueness
certificates, 0 / 3 active-endpoint gap-margin certificates, and
0 / 3 interval active-endpoint enclosures. It consumes 0 rows,
keeps `preledger_pass=false`, keeps `updates_live_ledger=false`, keeps
`branch_chart_authorized=false`, emits no candidate artifacts, emits no
topology recertification, and emits no proof-interval replay of its own.

The imported trial replay remains locked with 162
split-required base rows, 0
complete receiver-cover parent rows, 0
accepted fold-layer rows, and no branch-chart authorization.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
| `one_leaf_boundary_opening_interval_certificate_attempt` | `one_leaf_boundary_opening_interval_certificate_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `50ddea2d97587f4ad80a846471bcc80275e2898bebd2f9833ecd7e697bcf91c6` |
| `row_closure_budget` | `row_closure_geometry_budget_packet.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `4f88bae699b13f74331f14e1a56c14f50e8a839441bd0bf28d3975d7c9486ce6` |
| `direct_path_screen` | `one_leaf_direct_path_lambda_shift_screen.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true | `08176b503110002ca25fb0cf201860d124e33e6ca0e424b8d4ff8fae58069d88` |

## Enclosure Rule

A one-leaf active-endpoint interval enclosure must construct source and receiver endpoint boxes over the full candidate lambda interval, bound the endpoint residuals on those boxes, isolate the endpoint derivatives, exclude endpoint switching, prove active-endpoint uniqueness, and certify a positive endpoint gap margin before it can feed any boundary-opening interval certificate.

## No-Promotion Rule

Sampled equality of the active endpoint pair at lambda=0.3 and lambda=0.305 is diagnostic only. It does not imply an interval endpoint box, residual interval bound, derivative isolation, no-switch proof, uniqueness proof, interval active-endpoint enclosure, strict boundary-opening certificate, preledger pass, row consumption, or branch-chart authorization.

## Row Attempts

| Row | Failed side | Lower open threshold | Trial lambda | Source theta sample | Receiver theta sample | Sampled pair stable | Interval enclosure |
| --- | --- | ---: | ---: | --- | --- | ---: | ---: |
| `R_w_A04_A03` | `lo` | 0.300720019526139 | 0.305 | 0.236031876245625 -> 0.236031876245625 | 0.244031876245625 -> 0.244031876245625 | true | false |
| `R_u_A10_A09` | `lo` | 0.300720019526139 | 0.305 | 0.736031876245625 -> 0.736031876245625 | 0.744031876245625 -> 0.744031876245625 | true | false |
| `R_u_A07_A06` | `hi` | 0.301815056706425 | 0.305 | 0.51154699193526 -> 0.51154699193526 | 0.51954699193526 -> 0.51954699193526 | true | false |

## Field Audit

| Field | Certified count |
| --- | ---: |
| `candidate_lambda_interval_declared` | 3 / 3 |
| `candidate_lambda_interval_nonempty` | 3 / 3 |
| `sampled_active_endpoint_stability_present` | 3 / 3 |
| `source_active_endpoint_sample_present` | 3 / 3 |
| `receiver_active_endpoint_sample_present` | 3 / 3 |
| `sampled_active_endpoint_pair_stable` | 3 / 3 |
| `sampled_opening_above_probe_threshold_present` | 3 / 3 |
| `source_active_endpoint_interval_box_constructed` | 0 / 3 |
| `receiver_active_endpoint_interval_box_constructed` | 0 / 3 |
| `source_endpoint_residual_interval_bound_constructed` | 0 / 3 |
| `receiver_endpoint_residual_interval_bound_constructed` | 0 / 3 |
| `source_endpoint_derivative_isolation_certified` | 0 / 3 |
| `receiver_endpoint_derivative_isolation_certified` | 0 / 3 |
| `active_endpoint_pair_constant_on_interval_certified` | 0 / 3 |
| `active_endpoint_uniqueness_on_interval_certified` | 0 / 3 |
| `endpoint_switch_exclusion_certified` | 0 / 3 |
| `active_endpoint_gap_margin_positive_on_interval` | 0 / 3 |
| `interval_active_endpoint_enclosure_present` | 0 / 3 |
| `interval_defect_derivative_bound_present` | 0 / 3 |
| `strict_combined_boundary_opening_gt_threshold` | 0 / 3 |
| `interval_boundary_opening_positive_certified` | 0 / 3 |
| `source_monotonicity_preserved_on_interval` | 0 / 3 |
| `receiver_monotonicity_preserved_on_interval` | 0 / 3 |
| `memory_margins_certified_on_interval` | 0 / 3 |
| `endpoint_ownership_no_double_counting_certified` | 0 / 3 |
| `non_owned_complement_closed` | 0 / 3 |
| `preledger_pass` | 0 / 3 |
| `row_consumed` | 0 / 3 |
| `branch_chart_authorized` | 0 / 3 |

## Downstream Boundary-Opening Lock

Active-endpoint enclosures alone would still be insufficient. A consumable
one-leaf boundary-opening interval certificate also needs interval
defect-derivative bounds, strict combined boundary-opening certificates,
source/receiver monotonicity, memory margins, ownership/no-double-counting or
non-owned-complement closure, and proof-grade interval certificates before
`preledger_pass`, live-ledger updates, row consumption, or branch-chart
authorization can occur.

## Capture Decision

Priority-only. The attempt narrows the blocker from sampled one-leaf opening to the missing interval active-endpoint enclosure layer: sampled endpoint pairs are stable in 3 / 3 rows, but no source/receiver interval boxes, residual bounds, derivative isolation, no-switch proof, uniqueness proof, gap-margin certificate, interval active-endpoint enclosure, downstream interval derivative bound, preledger pass, or row consumption is certified.
