# Fresh Proof-Interval Preledger v10 Report

## Verdict

The fresh packet `fresh-same-packet-fold-shear-seed-v0` still fail-closes before branch-chart
authorization. This v10 sidecar imports the v9 separator-assignment no-go data
and tests whether the current same-packet data certify topology/no-double-counting
for any residual regular-boundary core.

v10 proves a narrow no-go for the current fields. For each imported core $C$,
regular-boundary coverage would require a topology certificate $T(C)$ that
assigns shared simple-root and fold boundaries and proves that $C$ is not reused
in strict simple-root branch sums, endpoint-excluded complements, or accepted
fold-layer row rectangles. The current packet supplies no such $T(C)$.

This is a sharper blocker, not a passed pre-ledger. Zero topology/no-double-counting
certificates are accepted, zero parent-complement strips are accepted,
and zero simple-root parent rows are consumed.

| Quantity | Value |
| --- | ---: |
| Base rows inherited from v9 | 162 |
| Empty rows inherited from v9 | 124 |
| Simple-root subrows inherited from v9 | 6 |
| Parent-complement strips probed | 10 |
| Regular-boundary candidate cores imported from v9 | 10 |
| Finite candidate families imported from v9 | 4 |
| Candidate membership edges imported from v9 | 20 |
| Topology/no-double-counting methods tested | 5 |
| Topology/no-double-counting method evaluations | 50 |
| Topology/no-double-counting certificates certified | 0 |
| Topology/no-double-counting certificates accepted by v10 | 0 |
| Simple-root branch reuse exclusions certified | 0 |
| Endpoint-excluded complement disjointness certified | 0 |
| Fold-layer nonexpansion certificates certified | 0 |
| Exact single separator assignments certified | 0 |
| Same-packet inclusion proofs certified | 0 |
| Domination inequalities certified | 0 |
| Non-core complement closures certified | 0 |
| Parent-complement strips accepted by v10 | 0 |
| Parent-complement strips still split-required | 10 |
| Simple-root parent rows consumed by v10 | 0 |
| Split-required base rows | 38 |

Because `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.json` records
`branch_chart_authorized=false`, no `branch_chart.json` may be constructed
from this packet.

The exact backend certificate is
`preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.json`; the engine audit is
`preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.json`.

## Backend Meaning

Let $T(C)$ denote a topology/no-double-counting certificate for a residual
regular-boundary core $C$. v10 uses the acceptance rule

$$
\text{accepted\_topology}(C)
\Rightarrow
T(C)
\land
C\notin B_{\mathrm{simple}}
\land
C\notin B_{\mathrm{endpoint}}
\land
C\notin B_{\mathrm{fold}},
$$

where $B_{\mathrm{simple}}$ is the already accepted strict simple-root branch
sum, $B_{\mathrm{endpoint}}$ is the endpoint-excluded complement ledger, and
$B_{\mathrm{fold}}$ is the accepted fold-layer row rectangle ledger. Current
data contain rejected or diagnostic topology/ownership fields, but no accepted
residual-core certificate $T(C)$.

## Methods Tested

| Method | Meaning |
| --- | --- |
| `explicit_topology_no_double_counting_field` | Accept only an explicit topology_and_no_double_counting certificate on the imported residual regular-boundary core. |
| `complement_boundary_topology_convention` | Check whether an accepted complement-boundary ownership convention applies to the residual regular-boundary core. |
| `simple_root_branch_reuse_exclusion` | Check whether the core is proved outside the strict simple-root branch sum already accepted for the parent subrow. |
| `endpoint_excluded_complement_disjointness` | Check whether endpoint-excluded complement ownership with root-count bound $[0,0]$ applies to this core. |
| `fold_layer_row_nonexpansion` | Check whether regular-boundary coverage avoids silently expanding accepted fold-layer row rectangles. |

## Candidate Core Table

| Candidate core | Parent | Side | Candidate separator assignments | Failure code |
| --- | --- | --- | --- | --- |
| `C_w_A1_A0_left_v10_reg_boundary_core_1` | `R_w_A1_A0` | `left` | `Sigma_1`, `Sigma_2` | `regular_boundary_topology_no_double_counting_no_go_current_packet_fields` |
| `C_w_A2_A0_left_v10_reg_boundary_core_2` | `R_w_A2_A0` | `left` | `Sigma_2`, `Sigma_1` | `regular_boundary_topology_no_double_counting_no_go_current_packet_fields` |
| `C_w_A2_A0_right_v10_reg_boundary_core_3` | `R_w_A2_A0` | `right` | `Sigma_2`, `Sigma_1` | `regular_boundary_topology_no_double_counting_no_go_current_packet_fields` |
| `C_w_A2_A1_left_v10_reg_boundary_core_4` | `R_w_A2_A1` | `left` | `Sigma_2`, `Sigma_1` | `regular_boundary_topology_no_double_counting_no_go_current_packet_fields` |
| `C_w_A2_A1_right_v10_reg_boundary_core_5` | `R_w_A2_A1` | `right` | `Sigma_2`, `Sigma_1` | `regular_boundary_topology_no_double_counting_no_go_current_packet_fields` |
| `C_u_A3_A2_left_v10_reg_boundary_core_6` | `R_u_A3_A2` | `left` | `Sigma_3`, `Sigma_4` | `regular_boundary_topology_no_double_counting_no_go_current_packet_fields` |
| `C_u_A4_A2_left_v10_reg_boundary_core_7` | `R_u_A4_A2` | `left` | `Sigma_4`, `Sigma_3` | `regular_boundary_topology_no_double_counting_no_go_current_packet_fields` |
| `C_u_A4_A2_right_v10_reg_boundary_core_8` | `R_u_A4_A2` | `right` | `Sigma_4`, `Sigma_3` | `regular_boundary_topology_no_double_counting_no_go_current_packet_fields` |
| `C_u_A4_A3_left_v10_reg_boundary_core_9` | `R_u_A4_A3` | `left` | `Sigma_4`, `Sigma_3` | `regular_boundary_topology_no_double_counting_no_go_current_packet_fields` |
| `C_u_A4_A3_right_v10_reg_boundary_core_10` | `R_u_A4_A3` | `right` | `Sigma_4`, `Sigma_3` | `regular_boundary_topology_no_double_counting_no_go_current_packet_fields` |

## Topology/No-Double-Counting Failure Summary

| Failure code | Cores |
| --- | ---: |
| `topology_no_double_counting_endpoint_exclusion_not_applicable` | 10 |
| `topology_no_double_counting_no_complement_boundary_ownership_for_residual_core` | 10 |
| `topology_no_double_counting_no_explicit_field` | 10 |
| `topology_no_double_counting_no_fold_layer_nonexpansion_certificate` | 10 |
| `topology_no_double_counting_no_simple_root_branch_reuse_exclusion` | 10 |

## Parent-Complement Summary

| Parent | Simple-root subrow | Complement strips | Split-required strips | Status |
| --- | --- | ---: | ---: | --- |
| `R_w_A1_A0` | `S_w_A1_A0_v4_1` | 1 | 1 | `parent_complements_split_required` |
| `R_w_A2_A0` | `S_w_A2_A0_v4_2` | 2 | 2 | `parent_complements_split_required` |
| `R_w_A2_A1` | `S_w_A2_A1_v4_3` | 2 | 2 | `parent_complements_split_required` |
| `R_u_A3_A2` | `S_u_A3_A2_v4_4` | 1 | 1 | `parent_complements_split_required` |
| `R_u_A4_A2` | `S_u_A4_A2_v4_5` | 2 | 2 | `parent_complements_split_required` |
| `R_u_A4_A3` | `S_u_A4_A3_v4_6` | 2 | 2 | `parent_complements_split_required` |

## Next Certificate Action

The next proof advance must supply an explicit residual-core ownership
convention with branch-reuse exclusions, or pivot to same-packet fold-layer
exact membership / candidate repair. Without topology/no-double-counting,
regular-boundary coverage remains blocked before inclusion, domination, and
non-core complement closure can consume rows.

## Capture Decision

Priority-only. This sidecar proves a current-packet topology/no-double-counting
no-go inside the breather proof program, but it is not a passed pre-ledger and
not reader-facing AAA prose.
