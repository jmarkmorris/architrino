# Higher-Fold One-Leaf Boundary Movement Probe

## Verdict

The higher-fold packet `fresh-v10-higher-fold-12-root-rebuild-v0` still fail-closes before branch-chart
authorization. This sidecar audits the three smallest regular
parent-complement boundary components from the source-cover defect atlas:
`R_w_A04_A03`, `R_u_A10_A09`, `R_u_A07_A06`.

Each probe has exactly one missing terminal leaf on the receiver-left boundary.
The existing data proves the receiver partition and records receiver
monotonicity lookup plus a positive boundary-candidate memory-depth floor for
all three rows. It does not prove all-owned-component memory margins,
source-boundary movement, receiver contraction, endpoint/topology ownership,
no-double-counting, simple-root branch-reuse exclusion, or non-owned complement
closure. Therefore 0 / 3
probe rows pass, and no row is consumed.

| Quantity | Value |
| --- | ---: |
| Probe rows | 3 |
| Selected one-leaf probes | 3 |
| Single-boundary-leaf rows | 3 |
| Receiver partitions complete | 3 |
| Monotone receiver certificates present | 3 |
| Positive boundary-candidate memory-depth floors | 3 |
| Source-boundary movement certified | 0 |
| Receiver-range contraction certified | 0 |
| All-owned-component memory margins certified | 0 |
| Endpoint ownership/no-double-counting certified | 0 |
| Closure alternatives certified | 0 |
| Rows passing probe rule | 0 |
| Row consumption count | 0 |

## Required-Field Audit

| Field | Rows certified |
| --- | ---: |
| `one_leaf_probe_selected` | 3 / 3 |
| `complete_receiver_partition` | 3 / 3 |
| `single_boundary_leaf` | 3 / 3 |
| `monotone_receiver_certificate_present` | 3 / 3 |
| `boundary_candidate_memory_depth_floor_positive` | 3 / 3 |
| `source_boundary_movement_certified` | 0 / 3 |
| `receiver_range_contraction_certified` | 0 / 3 |
| `memory_margins_all_owned_components` | 0 / 3 |
| `endpoint_ownership_no_double_counting` | 0 / 3 |
| `simple_root_branch_reuse_exclusion` | 0 / 3 |
| `non_owned_complement_closed` | 0 / 3 |

## Probe Rows

| Row | Failed side | Terminal span | Strict improvement threshold | Source-boundary route | Receiver-contraction route | Monotone data | Memory floor | Pass rule |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| `R_w_A04_A03` | `lo` | 0/128..1/128 | 0.000026691996524 | lower_source_inner_boundary | raise_receiver_lower_boundary | true | true | false |
| `R_u_A10_A09` | `lo` | 0/128..1/128 | 0.000026691996524 | lower_source_inner_boundary | raise_receiver_lower_boundary | true | true | false |
| `R_u_A07_A06` | `hi` | 0/128..1/128 | 0.00024618430271 | raise_source_inner_boundary | lower_receiver_upper_boundary | true | true | false |

## Closure Condition

For the two low-side failures, a future certificate must strictly lower the
source-inner lower boundary by more than the recorded threshold or strictly
raise the receiver lower boundary by more than that threshold. For the high-side
failure, a future certificate must strictly raise the source-inner upper
boundary or strictly lower the receiver upper boundary by more than the recorded
threshold. In all cases, endpoint/topology ownership, no-double-counting,
simple-root branch-reuse exclusion, and non-owned complement closure are still
required before any regular parent row may become `simple_root`.

## Capture Decision

Priority-only. This sidecar isolates the smallest regular-row movement
thresholds but deliberately leaves row consumption at 0 because the movement,
contraction, and ownership fields are absent.
