# One-Leaf Proof-Data Readiness Classifier

Packet: `fresh-v10-higher-fold-12-root-rebuild-v0`

Status: `one_leaf_proof_data_readiness_classifier_fail_closed_proof_data_absent_no_row_consumption`

Claim level: priority-only row-level proof-data readiness classifier for the three regular source-cover one-leaf screened rows; no row consumption

## Blocker Sharpened

This artifact reduces the regular source-cover one-leaf preledger blocker to a
row-level proof-data readiness table. The three sampled-positive screened rows
all declare a nonempty candidate lambda interval and an active-endpoint
interval-enclosure proof-data target, but none has a proof-grade endpoint
interval box pair, residual function pair, residual interval bound pair,
no-switch certificate, interval active-endpoint enclosure, boundary-opening
interval certificate, preledger pass, row consumption, or branch-chart
authorization.

The first interval-certificate blocker on all three rows is
`source_endpoint_interval_box_constructed`. The first source-layer dependency
blocker on all three rows is
`source_endpoint_boundary_binding_constructed`.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
| `row_family_classifier` | `preledger_row_family_classifier.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json` | true | `e28c017b4fd8a16ed5eb4c1be765c0a99288a60db1b54c88df501ac5e2e84e0b` |
| `boundary_opening_interval_certificate_attempt` | `one_leaf_boundary_opening_interval_certificate_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `50ddea2d97587f4ad80a846471bcc80275e2898bebd2f9833ecd7e697bcf91c6` |
| `active_endpoint_interval_enclosure_attempt` | `one_leaf_active_endpoint_interval_enclosure_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `08a65b40bc8b530ce83fdb87812f4aae211d9e32f17e290ec8115c511fa11218` |
| `endpoint_interval_box_no_switch_construction_attempt` | `one_leaf_active_endpoint_interval_box_no_switch_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `a373dea1f1beac01824d4299a9d04ed4c2a4068b169cf11b8e06aab8f9276d67` |
| `residual_source_data_audit` | `one_leaf_active_endpoint_residual_source_data_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `dc9391137d07bf822520e0fafba5010c97b2bb24edb18070e8838715970ebf90` |
| `residual_data_construction_attempt` | `one_leaf_active_endpoint_residual_data_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `2a08e15d1e901572e644b331f193529e9ebd57e02a6cca15c03614627dcdea37` |
| `active_endpoint_interval_enclosure_proof_data_construction_attempt` | `one_leaf_active_endpoint_interval_enclosure_proof_data_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `1522d11d142015f7a454cf28cac9f44e5b4db919460b9caa1f97bd5257ebe722` |
| `residual_function_on_box_source_layer_attempt` | `one_leaf_active_endpoint_residual_function_on_box_source_layer_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true | `d7223301c1a7b64ee92fc776d696fc9f9f233f65f3d82662c98561829ad83722` |

## Counts

| Measure | Value |
| --- | ---: |
| Regular source-cover parent-complement rows | 42 |
| One-leaf screened rows | 3 |
| Unscreened regular rows | 39 |
| Sampled-positive one-leaf rows | 3 |
| Proof-data target declared rows | 3 |
| Endpoint boundary binding pair rows | 0 |
| Endpoint interval box pair rows | 0 |
| Endpoint residual function pair rows | 0 |
| Endpoint residual interval bound pair rows | 0 |
| Endpoint no-switch certified rows | 0 |
| Interval active-endpoint enclosure rows | 0 |
| Boundary-opening interval certified rows | 0 |
| Monotonicity/memory/ownership/complement closed rows | 0 |
| Proof-interval replay rows | 0 |
| preledger_pass rows | 0 |
| Row consumption count | 0 |
| Branch-chart authorized rows | 0 |

## Row Readiness

| Row | Failed side | Sampled margin vs probe threshold | First interval blocker | First source-layer blocker | preledger_pass | Row consumed |
| --- | --- | ---: | --- | --- | --- | --- |
| `R_w_A04_A03` | `lo` | 0.000158664063655886 | `source_endpoint_interval_box_constructed` | `source_endpoint_boundary_binding_constructed` | false | false |
| `R_u_A10_A09` | `lo` | 0.000158664063655664 | `source_endpoint_interval_box_constructed` | `source_endpoint_boundary_binding_constructed` | false | false |
| `R_u_A07_A06` | `hi` | 0.000431988180379767 | `source_endpoint_interval_box_constructed` | `source_endpoint_boundary_binding_constructed` | false | false |

## Certificate-Side Handoff

Next artifact target: `one_leaf_endpoint_box_residual_function_pair_certificate`.

Continuation class: mechanical certificate-side handoff until endpoint interval boxes and source-layer residual functions are either constructed or shown unavailable from existing same-packet sources.

Minimum next objects:

- source and receiver endpoint interval boxes on the candidate lambda interval
- source and receiver endpoint residual functions on those boxes
- outward-rounded source and receiver residual interval bounds
- source and receiver derivative isolation plus endpoint uniqueness certificates
- endpoint switch-exclusion and positive endpoint-gap margin certificates

Source-layer dependency: The first source-layer missing field on all three screened rows is source_endpoint_boundary_binding_constructed, followed by receiver_endpoint_boundary_binding_constructed and the combined binding/evaluation/motion data needed to define residual functions on boxes.

Fail-closed stop conditions:

- Do not set preledger_pass before interval active-endpoint enclosure, boundary-opening positivity, monotonicity, memory, ownership/no-double-counting, branch-reuse exclusion, and non-owned complement closure are certified.
- Do not consume rows or authorize a branch chart before a proof-interval v1-v6 replay for the candidate change passes.
- If endpoint boundary binding construction requires a new proof-rule or primitive-acceptance decision, stop and keep this route as a certificate-side handoff.

## Authorization Lock

- `preledger_pass`: false
- `updates_live_ledger`: false
- `branch_chart_authorized`: false
- row consumption authorized: false

This artifact is a priority-only classifier and handoff. It proves no preledger
row and does not authorize branch-chart use.
