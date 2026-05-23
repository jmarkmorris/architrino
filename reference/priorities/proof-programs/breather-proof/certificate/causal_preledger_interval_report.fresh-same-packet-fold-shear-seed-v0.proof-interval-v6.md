# Fresh Proof-Interval Preledger v6 Report

## Verdict

The fresh packet `fresh-same-packet-fold-shear-seed-v0` still fail-closes before branch-chart
authorization. This v6 sidecar imports the proof-interval-v5 complement strips
and tests whether any of the accepted parent-complement alternatives can
consume them without changing the live pre-ledger.

The result is negative: no receiver-side complement strip is accepted by strict
range-empty, endpoint/topology ownership, exact same-packet fold-family
coverage, or same-packet regular-boundary coverage. Therefore zero simple-root
parent rows are consumed.

| Quantity | Value |
| --- | ---: |
| Base rows inherited from v5 | 162 |
| Empty rows inherited from v5 | 124 |
| Range-empty rows inherited from v5 | 116 |
| Monotone diagonal exclusions inherited from v5 | 8 |
| Simple-root subrows inherited from v5 | 6 |
| Parent-complement strips probed | 10 |
| Strict range-empty complement strips | 0 |
| Endpoint/topology-owned strips | 0 |
| Exact fold-family-covered strips | 0 |
| Regular-boundary-covered strips | 0 |
| Parent-complement strips accepted by v6 | 0 |
| Parent-complement strips still split-required | 10 |
| Simple-root parent rows consumed by v6 | 0 |
| Accepted fold-layer rows | 0 |
| Split-required base rows | 38 |

Because `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v6.json` records
`branch_chart_authorized=false`, no `branch_chart.json` may be constructed
from this packet.

The exact backend certificate is
`preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v6.json`; the engine audit is
`preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v6.json`.

## Backend Meaning

v6 does not recompute trigonometric enclosures. It imports the v5 exact-rational
parent-complement strips and applies the current accepted complement
alternatives as a deterministic same-packet field check:

1. strict range-empty uses the v5 complement gap result;
2. endpoint/topology ownership requires finite endpoint-contact and ownership
   fields with no positive-width overlap;
3. exact fold-family coverage requires accepted same-packet fold-layer rows and
   exact strip membership;
4. regular-boundary coverage requires finite same-packet family definition,
   exact inclusion, domination, topology/no-double-counting, and non-core
   complement closure fields.

The fresh packet currently supplies none of the latter three ownership or
coverage packets, and v5 already rejected strict range-empty closure for all
10 strips.

## Parent-Complement Failure Summary

| Failure code | Strips |
| --- | ---: |
| `no_parent_complement_acceptance_alternative_satisfied` | 10 |

## Alternative Failure Summary

### Strict Range-Empty

| Failure code | Strips |
| --- | ---: |
| `parent_complement_null_ranges_overlap_requires_subdivision_endpoint_or_boundary_certificate` | 10 |

### Endpoint/Topology Ownership

| Failure code | Strips |
| --- | ---: |
| `endpoint_topology_positive_width_overlap_not_endpoint_contact` | 10 |

### Exact Fold-Family Coverage

| Failure code | Strips |
| --- | ---: |
| `fold_family_coverage_no_accepted_same_packet_fold_layer_membership` | 10 |

### Regular-Boundary Coverage

| Failure code | Strips |
| --- | ---: |
| `regular_boundary_coverage_same_packet_fields_absent` | 10 |

## Parent-Complement Summary

| Parent | Simple-root subrow | Complement strips | Accepted strips | Split-required strips | Status |
| --- | --- | ---: | ---: | ---: | --- |
| `R_w_A1_A0` | `S_w_A1_A0_v4_1` | 1 | 0 | 1 | `parent_complements_split_required` |
| `R_w_A2_A0` | `S_w_A2_A0_v4_2` | 2 | 0 | 2 | `parent_complements_split_required` |
| `R_w_A2_A1` | `S_w_A2_A1_v4_3` | 2 | 0 | 2 | `parent_complements_split_required` |
| `R_u_A3_A2` | `S_u_A3_A2_v4_4` | 1 | 0 | 1 | `parent_complements_split_required` |
| `R_u_A4_A2` | `S_u_A4_A2_v4_5` | 2 | 0 | 2 | `parent_complements_split_required` |
| `R_u_A4_A3` | `S_u_A4_A3_v4_6` | 2 | 0 | 2 | `parent_complements_split_required` |

## Parent-Complement Strips

| Strip | Parent | Side | Range relation | Strict range-empty | Endpoint/topology | Fold family | Regular boundary | Final status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `C_w_A1_A0_left_v6_1` | `R_w_A1_A0` | `left` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_w_A2_A0_left_v6_2` | `R_w_A2_A0` | `left` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_w_A2_A0_right_v6_3` | `R_w_A2_A0` | `right` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_w_A2_A1_left_v6_4` | `R_w_A2_A1` | `left` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_w_A2_A1_right_v6_5` | `R_w_A2_A1` | `right` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_u_A3_A2_left_v6_6` | `R_u_A3_A2` | `left` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_u_A4_A2_left_v6_7` | `R_u_A4_A2` | `left` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_u_A4_A2_right_v6_8` | `R_u_A4_A2` | `right` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_u_A4_A3_left_v6_9` | `R_u_A4_A3` | `left` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_u_A4_A3_right_v6_10` | `R_u_A4_A3` | `right` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |

## Next Certificate Action

The next proof advance is not another strict range-empty probe on the same
v5 collars. It must supply one of the missing same-packet ownership or coverage
objects: endpoint/topology ownership with finite contact tables and positive
post-deletion gaps, exact fold-family coverage with accepted fresh fold-layer
rows, finite regular-boundary inclusion and domination fields, or a repaired
successor candidate whose complement collars become strict range-empty.

## Capture Decision

Priority-only. This sidecar is a fail-closed ownership/coverage probe on top of
the v5 exact-rational parent-complement packet. It is not a passed pre-ledger
and not reader-facing AAA prose.
