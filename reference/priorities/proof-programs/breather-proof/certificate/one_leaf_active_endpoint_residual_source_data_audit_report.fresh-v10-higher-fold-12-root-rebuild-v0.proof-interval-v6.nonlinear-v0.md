# Higher-Fold One-Leaf Active-Endpoint Residual Source-Data Audit

## Verdict

Status: `one_leaf_active_endpoint_residual_source_data_audit_fail_closed_source_samples_present_residual_functions_absent_no_row_consumption`.

This priority-only packet tests the source-data layer under the endpoint
interval-box/no-switch attempt: whether the imported one-leaf artifacts contain
the formulas, charts, evaluation rules, derivative data, rounding rules,
competing-endpoint inputs, and endpoint-gap bounds needed to construct endpoint
residual functions on interval boxes.

The audit fail-closes. It preserves sampled endpoint values for
3 / 3 rows and sampled defect
lambda derivatives for 3 / 3
rows, but finds 0 / 3 endpoint residual formula sources, 0 /
3 endpoint domain charts, 0 / 3 endpoint evaluation
rules, 0 / 3 endpoint motion rules, 0 / 3 residual
derivative formulas, 0 / 3 outward rounding rules, 0 /
3 competing-endpoint exclusion input rows, 0 / 3
endpoint-gap bound input rows, 0 / 3 interval-box radius rules,
and 0 / 3 residual source-data-ready rows. It consumes 0 rows,
keeps `preledger_pass=false`, keeps
`updates_live_ledger=false`, keeps `branch_chart_authorized=false`, emits no
candidate artifacts, emits no topology recertification, and emits no
proof-interval replay of its own.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
| `active_endpoint_interval_box_no_switch_attempt` | `one_leaf_active_endpoint_interval_box_no_switch_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `a373dea1f1beac01824d4299a9d04ed4c2a4068b169cf11b8e06aab8f9276d67` |
| `active_endpoint_interval_enclosure_attempt` | `one_leaf_active_endpoint_interval_enclosure_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `08a65b40bc8b530ce83fdb87812f4aae211d9e32f17e290ec8115c511fa11218` |
| `one_leaf_boundary_opening_interval_certificate_attempt` | `one_leaf_boundary_opening_interval_certificate_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `50ddea2d97587f4ad80a846471bcc80275e2898bebd2f9833ecd7e697bcf91c6` |
| `row_closure_budget` | `row_closure_geometry_budget_packet.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `4f88bae699b13f74331f14e1a56c14f50e8a839441bd0bf28d3975d7c9486ce6` |
| `direct_path_screen` | `one_leaf_direct_path_lambda_shift_screen.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true | `08176b503110002ca25fb0cf201860d124e33e6ca0e424b8d4ff8fae58069d88` |

## Residual Source-Data Rule

A one-leaf active-endpoint residual source-data packet must supply source and receiver residual formulas on endpoint boxes, endpoint domain charts, endpoint evaluation and motion rules, residual derivative formulas, outward rounding rules, competing-endpoint exclusion inputs, endpoint-gap bounds, and interval-box radius rules before residual interval bounds or no-switch certificates can be constructed.

## No-Promotion Rule

Sampled endpoint values and sampled lambda derivatives are diagnostic source data only. They do not define endpoint residual functions on boxes, derivative-isolation intervals, no-switch certificates, active-endpoint enclosures, preledger passes, row consumption, or branch-chart authorization.

## Row Audits

| Row | Failed side | Lower open threshold | Trial lambda | Source theta candidate | Receiver theta candidate | Sampled defect lambda derivative | Residual source data ready |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `R_w_A04_A03` | `lo` | 0.300720019526139 | 0.305 | 0.236031876245625 | 0.244031876245625 | -0.037071212036614 | false |
| `R_u_A10_A09` | `lo` | 0.300720019526139 | 0.305 | 0.736031876245625 | 0.744031876245625 | -0.037071212036613 | false |
| `R_u_A07_A06` | `hi` | 0.301815056706425 | 0.305 | 0.51154699193526 | 0.51954699193526 | -0.135634496618516 | false |

## Field Audit

| Field | Present count |
| --- | ---: |
| `candidate_lambda_interval_declared` | 3 / 3 |
| `candidate_lambda_interval_nonempty` | 3 / 3 |
| `sampled_endpoint_values_present` | 3 / 3 |
| `sampled_lambda_derivative_sample_present` | 3 / 3 |
| `constant_theta_endpoint_box_candidate_present` | 3 / 3 |
| `source_endpoint_residual_formula_present` | 0 / 3 |
| `receiver_endpoint_residual_formula_present` | 0 / 3 |
| `source_endpoint_domain_chart_present` | 0 / 3 |
| `receiver_endpoint_domain_chart_present` | 0 / 3 |
| `source_endpoint_evaluation_rule_present` | 0 / 3 |
| `receiver_endpoint_evaluation_rule_present` | 0 / 3 |
| `source_endpoint_motion_rule_present` | 0 / 3 |
| `receiver_endpoint_motion_rule_present` | 0 / 3 |
| `source_residual_derivative_formula_present` | 0 / 3 |
| `receiver_residual_derivative_formula_present` | 0 / 3 |
| `source_residual_outward_rounding_rule_present` | 0 / 3 |
| `receiver_residual_outward_rounding_rule_present` | 0 / 3 |
| `competing_endpoint_inventory_present` | 0 / 3 |
| `competing_endpoint_exclusion_rule_present` | 0 / 3 |
| `endpoint_gap_function_present` | 0 / 3 |
| `endpoint_gap_margin_bound_present` | 0 / 3 |
| `interval_box_radius_rule_present` | 0 / 3 |
| `residual_source_data_ready` | 0 / 3 |
| `row_consumed` | 0 / 3 |
| `branch_chart_authorized` | 0 / 3 |

## Construction Blocker

The next constructive object is not another sampled endpoint comparison. It is
an actual endpoint residual data layer: residual formulas on source and receiver
endpoint boxes, domain charts, evaluation/motion rules, derivative formulas,
outward interval rounding rules, competing-endpoint exclusion inputs, endpoint
gap bounds, and interval-box radius rules over each candidate lambda interval.

## Capture Decision

Priority-only. The audit preserves sampled endpoint values and sampled defect lambda derivatives for 3 / 3 rows, but it fail-closes because the imported artifacts do not provide endpoint residual formulas on boxes, endpoint domain charts, endpoint evaluation or motion rules, residual derivative formulas, outward rounding rules, competing-endpoint exclusion inputs, endpoint-gap bounds, interval-box radius rules, residual source-data-ready rows, preledger passes, or row consumption.
