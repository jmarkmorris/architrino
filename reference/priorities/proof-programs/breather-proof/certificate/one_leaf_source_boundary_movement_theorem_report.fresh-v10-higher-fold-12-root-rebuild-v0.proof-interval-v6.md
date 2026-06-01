# Higher-Fold One-Leaf Source-Boundary Movement Theorem Attempt

## Verdict

The source-boundary route still fail-closes for packet `fresh-v10-higher-fold-12-root-rebuild-v0`. The
one-leaf probe gives exact rational movement thresholds, and this theorem
attempt verifies that each threshold is exactly the current source-boundary
defect against the relevant receiver boundary. It does not find a same-packet
source-boundary variation, endpoint-tightening certificate, or proof that source
monotonicity and memory margins survive such a movement. Therefore 0 / 3 source-boundary movement rows pass, and no row is consumed.

| Quantity | Value |
| --- | ---: |
| Theorem rows | 3 |
| Strict threshold identities verified | 3 |
| Same-packet source-boundary variations present | 0 |
| Source endpoint-tightening certificates present | 0 |
| Strict source-boundary movements certified | 0 |
| Theorem pass rows | 0 |
| Row consumption count | 0 |

## Required-Field Audit

| Field | Rows certified |
| --- | ---: |
| `one_leaf_probe_input_present` | 3 / 3 |
| `strict_threshold_identity_verified` | 3 / 3 |
| `source_boundary_route_selected` | 3 / 3 |
| `same_packet_source_boundary_variation_present` | 0 / 3 |
| `source_endpoint_tightening_certificate_present` | 0 / 3 |
| `strict_source_boundary_movement_gt_threshold` | 0 / 3 |
| `source_monotonicity_preserved_under_movement` | 0 / 3 |
| `memory_margins_all_owned_components` | 0 / 3 |
| `endpoint_ownership_no_double_counting` | 0 / 3 |
| `simple_root_branch_reuse_exclusion` | 0 / 3 |
| `non_owned_complement_closed` | 0 / 3 |

## Source-Boundary Rows

| Row | Failed side | Current source boundary | Receiver boundary | Required strict improvement | Signed source movement required | Certified movement | Pass rule |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| `R_w_A04_A03` | `lo` | 1.103755495734966 | 1.103728803738441 | 0.000026691996524 | -0.000026691996524 | 0 | false |
| `R_u_A10_A09` | `lo` | 4.245348149324966 | 4.245321457328441 | 0.000026691996524 | -0.000026691996524 | 0 | false |
| `R_u_A07_A06` | `hi` | 4.426550572029212 | 4.426796756331923 | 0.00024618430271 | 0.00024618430271 | 0 | false |

## Theorem Form

For a low-side row, the required same-packet theorem is
`source_inner_range_q.lo < receiver_range_q.lo`, equivalently a strict
negative movement of the source lower boundary past the recorded defect. For the
high-side row, the required theorem is
`source_inner_range_q.hi > receiver_range_q.hi`, equivalently a strict positive
movement of the source upper boundary past the recorded defect. The weak target
is equality with the receiver boundary; equality is not enough because the
simple-root source-cover rule requires strict coverage.

## Capture Decision

Priority-only theorem attempt. This packet converts the one-leaf probe into the
exact source-boundary movement inequalities but leaves the theorem fail-closed.
The missing data is not another receiver partition. It is a same-packet
source-boundary variation or endpoint-tightening certificate, plus preservation
of source monotonicity, memory margins, endpoint ownership/no-double-counting,
branch-reuse exclusion, and non-owned-complement closure.
