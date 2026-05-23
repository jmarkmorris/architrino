# Fresh Proof-Interval Preledger v9 Report

## Verdict

The fresh packet `fresh-same-packet-fold-shear-seed-v0` still fail-closes before branch-chart
authorization. This v9 sidecar imports the v8 finite regular-boundary
candidate families and tests whether the current same-packet data certify a
single separator assignment for any residual regular-boundary core.

v9 proves a narrow no-go for the current fields. For each imported core
$C$, the v8 adjacency set $\operatorname{Adj}(C)$ has cardinality 2, while
the packet has no accepted ownership selector $o(C)$ and no exact singleton
separator field. Therefore no current core has a certified singleton
$\{s(C)\}$. Side labels, endpoint adjacency without ownership, array order,
separator order, and family order are explicitly rejected as certificates.

This is a sharper blocker, not a passed pre-ledger. Zero separator assignments
are accepted, zero parent-complement strips are accepted, and zero simple-root
parent rows are consumed.

| Quantity | Value |
| --- | ---: |
| Base rows inherited from v8 | 162 |
| Empty rows inherited from v8 | 124 |
| Simple-root subrows inherited from v8 | 6 |
| Parent-complement strips probed | 10 |
| Regular-boundary candidate cores imported from v8 | 10 |
| Finite candidate families imported from v8 | 4 |
| Candidate membership edges imported from v8 | 20 |
| Separator-assignment methods tested | 5 |
| Separator-assignment method evaluations | 50 |
| Ambiguous two-separator cores | 10 |
| Unique candidate-membership assignments | 0 |
| Exact single separator assignments certified | 0 |
| Separator assignments accepted by v9 | 0 |
| Heuristic assignments rejected | 20 |
| Same-packet inclusion proofs certified | 0 |
| Domination inequalities certified | 0 |
| Topology/no-double-counting certificates | 0 |
| Non-core complement closures certified | 0 |
| Parent-complement strips accepted by v9 | 0 |
| Parent-complement strips still split-required | 10 |
| Simple-root parent rows consumed by v9 | 0 |
| Split-required base rows | 38 |

Because `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v9.json` records
`branch_chart_authorized=false`, no `branch_chart.json` may be constructed
from this packet.

The exact backend certificate is
`preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v9.json`; the engine audit is
`preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v9.json`.

## Backend Meaning

Let $\operatorname{Adj}(C)$ denote the candidate separator set recorded by
v8 for a residual regular-boundary core $C$. v9 uses the acceptance rule

$$
\text{accepted\_separator}(C)
\Rightarrow
\left|\{s(C)\}\right|=1
\quad\text{and}\quad
s(C)\in\operatorname{Adj}(C),
$$

where the singleton must be supplied by an exact field or by an accepted
topology ownership convention. The current packet satisfies
$|\operatorname{Adj}(C)|=2$ for all 10 imported cores and supplies no
accepted selector. Therefore the selector field is currently underdetermined.

## Methods Tested

| Method | Meaning |
| --- | --- |
| `exact_single_separator_field` | Accept only an explicit exact_single_separator_assignment field certified by the imported regular-boundary record. |
| `unique_candidate_membership` | Audit candidate-list cardinality while treating a singleton candidate list as inventory only unless a certified uniqueness field is present. |
| `interval_endpoint_adjacency` | Check whether same-packet interval adjacency selects one separator together with an accepted topology ownership convention. |
| `side_heuristic` | Reject a choice based only on left/right side labels or ledger orientation. |
| `family_order_tiebreaker` | Reject a choice based only on array order, separator order, or family ordering. |

## Candidate Core Table

| Candidate core | Parent | Side | Candidate separator assignments | Candidate count | Failure code |
| --- | --- | --- | --- | ---: | --- |
| `C_w_A1_A0_left_v9_reg_boundary_core_1` | `R_w_A1_A0` | `left` | `Sigma_1`, `Sigma_2` | 2 | `regular_boundary_separator_assignment_no_go_current_packet_fields` |
| `C_w_A2_A0_left_v9_reg_boundary_core_2` | `R_w_A2_A0` | `left` | `Sigma_2`, `Sigma_1` | 2 | `regular_boundary_separator_assignment_no_go_current_packet_fields` |
| `C_w_A2_A0_right_v9_reg_boundary_core_3` | `R_w_A2_A0` | `right` | `Sigma_2`, `Sigma_1` | 2 | `regular_boundary_separator_assignment_no_go_current_packet_fields` |
| `C_w_A2_A1_left_v9_reg_boundary_core_4` | `R_w_A2_A1` | `left` | `Sigma_2`, `Sigma_1` | 2 | `regular_boundary_separator_assignment_no_go_current_packet_fields` |
| `C_w_A2_A1_right_v9_reg_boundary_core_5` | `R_w_A2_A1` | `right` | `Sigma_2`, `Sigma_1` | 2 | `regular_boundary_separator_assignment_no_go_current_packet_fields` |
| `C_u_A3_A2_left_v9_reg_boundary_core_6` | `R_u_A3_A2` | `left` | `Sigma_3`, `Sigma_4` | 2 | `regular_boundary_separator_assignment_no_go_current_packet_fields` |
| `C_u_A4_A2_left_v9_reg_boundary_core_7` | `R_u_A4_A2` | `left` | `Sigma_4`, `Sigma_3` | 2 | `regular_boundary_separator_assignment_no_go_current_packet_fields` |
| `C_u_A4_A2_right_v9_reg_boundary_core_8` | `R_u_A4_A2` | `right` | `Sigma_4`, `Sigma_3` | 2 | `regular_boundary_separator_assignment_no_go_current_packet_fields` |
| `C_u_A4_A3_left_v9_reg_boundary_core_9` | `R_u_A4_A3` | `left` | `Sigma_4`, `Sigma_3` | 2 | `regular_boundary_separator_assignment_no_go_current_packet_fields` |
| `C_u_A4_A3_right_v9_reg_boundary_core_10` | `R_u_A4_A3` | `right` | `Sigma_4`, `Sigma_3` | 2 | `regular_boundary_separator_assignment_no_go_current_packet_fields` |

## Separator-Assignment Failure Summary

| Failure code | Cores |
| --- | ---: |
| `separator_assignment_candidate_membership_nonunique` | 10 |
| `separator_assignment_heuristic_tiebreaker_rejected` | 10 |
| `separator_assignment_no_exact_single_separator_field` | 10 |
| `separator_assignment_topology_ownership_convention_absent` | 10 |

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

The next proof advance must supply one of two missing mathematical objects:
an exact core-to-separator assignment certificate for each imported residual
core, or a topology/no-double-counting ownership convention that selects one
separator from each two-element adjacency set. Without one of those objects,
regular-boundary coverage remains blocked before inclusion, domination, and
non-core complement closure can consume rows.

## Capture Decision

Priority-only. This sidecar proves a current-packet separator-assignment no-go
inside the breather proof program, but it is not a passed pre-ledger and not
reader-facing AAA prose.
