# Higher-Fold One-Leaf Candidate-Change Boundary-Data Constructor

## Verdict

The candidate-change boundary-data route still fail-closes for packet
`fresh-v10-higher-fold-12-root-rebuild-v0`. The source-boundary and receiver-range theorem attempts prove
the same exact one-leaf defects, so the combined candidate-change target is now
finite and explicit: for each row, a favorable source-boundary shift plus a
favorable receiver-boundary shift must be strictly greater than the recorded
defect. Current same-packet candidate-change data assigns no such shifts.
Therefore 0 / 3 candidate-change boundary-data rows pass, and no row is consumed.

| Quantity | Value |
| --- | ---: |
| Constructor rows | 3 |
| Strict threshold identities verified | 3 |
| Candidate-change boundary targets declared | 3 |
| Combined boundary-opening conditions declared | 3 |
| Same-packet candidate-change data present | 0 |
| Strict combined boundary openings certified | 0 |
| Constructor pass rows | 0 |
| Row consumption count | 0 |

## Required-Field Audit

| Field | Rows certified |
| --- | ---: |
| `one_leaf_probe_input_present` | 3 / 3 |
| `source_theorem_input_present` | 3 / 3 |
| `receiver_theorem_input_present` | 3 / 3 |
| `strict_threshold_identities_verified` | 3 / 3 |
| `candidate_change_boundary_target_declared` | 3 / 3 |
| `combined_boundary_opening_condition_declared` | 3 / 3 |
| `same_packet_candidate_change_data_present` | 0 / 3 |
| `strict_combined_boundary_opening_gt_threshold` | 0 / 3 |
| `source_monotonicity_preserved_under_candidate_change` | 0 / 3 |
| `receiver_monotonicity_preserved_under_candidate_change` | 0 / 3 |
| `memory_margins_all_owned_components` | 0 / 3 |
| `endpoint_ownership_no_double_counting` | 0 / 3 |
| `simple_root_branch_reuse_exclusion` | 0 / 3 |
| `non_owned_complement_closed` | 0 / 3 |

## Candidate-Change Rows

| Row | Failed side | Required combined opening | Combined condition | Current opening | Current margin | Pass rule |
| --- | --- | ---: | --- | ---: | ---: | --- |
| `R_w_A04_A03` | `lo` | 0.000026691996524 | `sigma_source_lower + rho_receiver_lower > required_strict_improvement_q` | 0 | -0.000026691996524 | false |
| `R_u_A10_A09` | `lo` | 0.000026691996524 | `sigma_source_lower + rho_receiver_lower > required_strict_improvement_q` | 0 | -0.000026691996524 | false |
| `R_u_A07_A06` | `hi` | 0.00024618430271 | `sigma_source_upper + rho_receiver_upper > required_strict_improvement_q` | 0 | -0.00024618430271 | false |

## Constructor Form

For low-side rows, a candidate change must satisfy
`(source_inner_range_q.lo - sigma_source_lower) < (receiver_range_q.lo + rho_receiver_lower)`,
or equivalently
`sigma_source_lower + rho_receiver_lower > required_strict_improvement_q`.
For the high-side row, it must satisfy
`(source_inner_range_q.hi + sigma_source_upper) > (receiver_range_q.hi - rho_receiver_upper)`,
or equivalently
`sigma_source_upper + rho_receiver_upper > required_strict_improvement_q`.
Equality remains insufficient because the simple-root source-cover rule requires
strict coverage.

## Capture Decision

Priority-only constructor. This packet turns the separate source-boundary and
receiver-range theorem attempts into one combined candidate-change boundary
target. It does not certify a candidate change: the missing data is an actual
same-packet deformation or endpoint-tightening certificate assigning positive
boundary shifts, plus preservation of source and receiver monotonicity, memory
margins, endpoint ownership/no-double-counting, branch-reuse exclusion, and
non-owned-complement closure.
