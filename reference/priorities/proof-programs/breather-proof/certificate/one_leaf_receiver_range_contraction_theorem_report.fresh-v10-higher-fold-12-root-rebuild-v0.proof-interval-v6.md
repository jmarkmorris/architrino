# Higher-Fold One-Leaf Receiver-Range Contraction Theorem Attempt

## Verdict

The receiver-range contraction route still fail-closes for packet
`fresh-v10-higher-fold-12-root-rebuild-v0`. The one-leaf probe gives exact rational contraction
thresholds, and this theorem attempt verifies that each threshold is exactly the
current receiver-boundary defect against the relevant source boundary. It does
not find a same-packet receiver-range refinement, endpoint-tightening
certificate, or proof that receiver monotonicity and memory margins survive
such a contraction. Therefore 0 / 3 receiver-range contraction rows pass, and no row is consumed.

| Quantity | Value |
| --- | ---: |
| Theorem rows | 3 |
| Strict threshold identities verified | 3 |
| Same-packet receiver-range refinements present | 0 |
| Receiver endpoint-tightening certificates present | 0 |
| Strict receiver contractions certified | 0 |
| Theorem pass rows | 0 |
| Row consumption count | 0 |

## Required-Field Audit

| Field | Rows certified |
| --- | ---: |
| `one_leaf_probe_input_present` | 3 / 3 |
| `strict_threshold_identity_verified` | 3 / 3 |
| `receiver_contraction_route_selected` | 3 / 3 |
| `same_packet_receiver_range_refinement_present` | 0 / 3 |
| `receiver_endpoint_tightening_certificate_present` | 0 / 3 |
| `strict_receiver_contraction_gt_threshold` | 0 / 3 |
| `receiver_monotonicity_preserved_under_contraction` | 0 / 3 |
| `memory_margins_all_owned_components` | 0 / 3 |
| `endpoint_ownership_no_double_counting` | 0 / 3 |
| `simple_root_branch_reuse_exclusion` | 0 / 3 |
| `non_owned_complement_closed` | 0 / 3 |

## Receiver-Boundary Rows

| Row | Failed side | Current receiver boundary | Source boundary | Required strict improvement | Signed receiver contraction required | Certified contraction | Pass rule |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| `R_w_A04_A03` | `lo` | 1.103728803738441 | 1.103755495734966 | 0.000026691996524 | 0.000026691996524 | 0 | false |
| `R_u_A10_A09` | `lo` | 4.245321457328441 | 4.245348149324966 | 0.000026691996524 | 0.000026691996524 | 0 | false |
| `R_u_A07_A06` | `hi` | 4.426796756331923 | 4.426550572029212 | 0.00024618430271 | -0.00024618430271 | 0 | false |

## Theorem Form

For a low-side row, the required same-packet theorem is
`receiver_range_q.lo > source_inner_range_q.lo`, equivalently a strict
positive tightening of the receiver lower boundary past the recorded defect. For
the high-side row, the required theorem is
`receiver_range_q.hi < source_inner_range_q.hi`, equivalently a strict
negative tightening of the receiver upper boundary past the recorded defect. The
weak target is equality with the source boundary; equality is not enough because
the simple-root source-cover rule requires strict coverage.

## Capture Decision

Priority-only theorem attempt. This packet converts the one-leaf probe into the
exact receiver-range contraction inequalities but leaves the theorem
fail-closed. The missing data is not another receiver partition. It is a
same-packet receiver-range refinement or endpoint-tightening certificate, plus
preservation of receiver monotonicity, memory margins, endpoint
ownership/no-double-counting, branch-reuse exclusion, and non-owned-complement
closure.
