# Fresh Proof-Interval Preledger v7 Report

## Verdict

The fresh packet `fresh-same-packet-fold-shear-seed-v0` still fail-closes before branch-chart
authorization. This v7 sidecar imports the proof-interval-v6 complement strips
and tries to construct the same-packet ownership data needed by the accepted
parent-complement alternatives.

v7 constructs a finite candidate regular-boundary core table for the 10
receiver-side complement strips. That is useful proof data, but it is not an
acceptance certificate: the current same-packet artifacts still do not supply
endpoint contact tables for positive-width overlap strips, accepted exact
fold-family membership rows, or regular-boundary inclusion/domination and
topology fields. Therefore zero simple-root parent rows are consumed.

| Quantity | Value |
| --- | ---: |
| Base rows inherited from v6 | 162 |
| Empty rows inherited from v6 | 124 |
| Range-empty rows inherited from v6 | 116 |
| Monotone diagonal exclusions inherited from v6 | 8 |
| Simple-root subrows inherited from v6 | 6 |
| Parent-complement strips probed | 10 |
| Strict range-empty complement strips | 0 |
| Endpoint contact tables constructed | 0 |
| Endpoint/topology-owned strips | 0 |
| Fold-family candidate rows considered | 16 |
| Accepted same-packet fold-layer rows | 0 |
| Exact fold-family-covered strips | 0 |
| Regular-boundary candidate cores constructed | 10 |
| Regular-boundary-covered strips | 0 |
| Parent-complement strips accepted by v7 | 0 |
| Parent-complement strips still split-required | 10 |
| Simple-root parent rows consumed by v7 | 0 |
| Split-required base rows | 38 |

Because `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v7.json` records
`branch_chart_authorized=false`, no `branch_chart.json` may be constructed
from this packet.

The exact backend certificate is
`preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v7.json`; the engine audit is
`preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v7.json`.

## Backend Meaning

v7 does not recompute trigonometric enclosures. It imports the v6
exact-rational parent-complement strips and constructs/checks same-packet data
objects:

1. endpoint/topology ownership is rejected for positive-width overlap strips;
2. exact fold-family coverage checks the fresh fold-layer burden rows, but no
   row is an accepted same-packet fold-layer row with exact complement
   membership;
3. regular-boundary coverage receives a finite candidate core table from v7,
   but remains rejected because exact inclusion, domination, topology and
   no-double-counting, and non-core complement closure fields are absent.

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

## Candidate Regular-Boundary Core Table

| Candidate core | Parent | Side | Candidate separator assignments | Assignment status |
| --- | --- | --- | --- | --- |
| `C_w_A1_A0_left_v7_reg_boundary_core_1` | `R_w_A1_A0` | `left` | `Sigma_1`, `Sigma_2` | `nonunique_or_absent_candidate_not_certified` |
| `C_w_A2_A0_left_v7_reg_boundary_core_2` | `R_w_A2_A0` | `left` | `Sigma_2`, `Sigma_1` | `nonunique_or_absent_candidate_not_certified` |
| `C_w_A2_A0_right_v7_reg_boundary_core_3` | `R_w_A2_A0` | `right` | `Sigma_2`, `Sigma_1` | `nonunique_or_absent_candidate_not_certified` |
| `C_w_A2_A1_left_v7_reg_boundary_core_4` | `R_w_A2_A1` | `left` | `Sigma_2`, `Sigma_1` | `nonunique_or_absent_candidate_not_certified` |
| `C_w_A2_A1_right_v7_reg_boundary_core_5` | `R_w_A2_A1` | `right` | `Sigma_2`, `Sigma_1` | `nonunique_or_absent_candidate_not_certified` |
| `C_u_A3_A2_left_v7_reg_boundary_core_6` | `R_u_A3_A2` | `left` | `Sigma_3`, `Sigma_4` | `nonunique_or_absent_candidate_not_certified` |
| `C_u_A4_A2_left_v7_reg_boundary_core_7` | `R_u_A4_A2` | `left` | `Sigma_4`, `Sigma_3` | `nonunique_or_absent_candidate_not_certified` |
| `C_u_A4_A2_right_v7_reg_boundary_core_8` | `R_u_A4_A2` | `right` | `Sigma_4`, `Sigma_3` | `nonunique_or_absent_candidate_not_certified` |
| `C_u_A4_A3_left_v7_reg_boundary_core_9` | `R_u_A4_A3` | `left` | `Sigma_4`, `Sigma_3` | `nonunique_or_absent_candidate_not_certified` |
| `C_u_A4_A3_right_v7_reg_boundary_core_10` | `R_u_A4_A3` | `right` | `Sigma_4`, `Sigma_3` | `nonunique_or_absent_candidate_not_certified` |

These entries are finite candidate records only. They do not certify membership
in $\overline{\mathcal{F}}_{\Sigma}^{\mathrm{bdry}}$ and do not prove a
domination inequality against the fold-layer ceiling.

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
| `C_w_A1_A0_left_v7_1` | `R_w_A1_A0` | `left` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_w_A2_A0_left_v7_2` | `R_w_A2_A0` | `left` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_w_A2_A0_right_v7_3` | `R_w_A2_A0` | `right` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_w_A2_A1_left_v7_4` | `R_w_A2_A1` | `left` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_w_A2_A1_right_v7_5` | `R_w_A2_A1` | `right` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_u_A3_A2_left_v7_6` | `R_u_A3_A2` | `left` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_u_A4_A2_left_v7_7` | `R_u_A4_A2` | `left` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_u_A4_A2_right_v7_8` | `R_u_A4_A2` | `right` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_u_A4_A3_left_v7_9` | `R_u_A4_A3` | `left` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |
| `C_u_A4_A3_right_v7_10` | `R_u_A4_A3` | `right` | `overlap` | `rejected` | `rejected` | `rejected` | `rejected` | `split_required` |

## Next Certificate Action

The next proof advance is no longer an ownership-data inventory pass. It must
supply proof-grade fields for one of the candidate records: accepted
same-packet fold-layer rows with exact membership, or a regular-boundary
inclusion/domination certificate for the finite candidate core table, or a
repaired successor candidate whose complement collars become strict
range-empty.

## Capture Decision

Priority-only. This sidecar constructs candidate ownership data on top of v6,
but it is not a passed pre-ledger and not reader-facing AAA prose.
