# Fresh Proof-Interval Preledger v8 Report

## Verdict

The fresh packet `fresh-same-packet-fold-shear-seed-v0` still fail-closes before branch-chart
authorization. This v8 sidecar imports the v7 regular-boundary candidate cores
and constructs the finite candidate family that a regular-boundary theorem
would have to certify.

v8 records 4 finite candidate families and 20 candidate membership edges from
the 10 v7 cores. This is a sharper theorem target, not an acceptance
certificate. No core has an exact single separator assignment, no same-packet
inclusion proof is certified, no same-packet domination inequality or enlarged
ceiling is present, and no topology/no-double-counting or non-core complement
closure certificate is present. Therefore zero parent-complement strips are
accepted and zero simple-root parent rows are consumed.

| Quantity | Value |
| --- | ---: |
| Base rows inherited from v7 | 162 |
| Empty rows inherited from v7 | 124 |
| Simple-root subrows inherited from v7 | 6 |
| Parent-complement strips probed | 10 |
| Regular-boundary candidate cores imported from v7 | 10 |
| Finite candidate families constructed | 4 |
| Candidate membership edges recorded | 20 |
| Exact single separator assignments certified | 0 |
| Same-packet inclusion proofs certified | 0 |
| Same-packet fresh fold ceiling available | `false` |
| Domination inequalities certified | 0 |
| Topology/no-double-counting certificates | 0 |
| Non-core complement closures certified | 0 |
| Regular-boundary-covered strips | 0 |
| Parent-complement strips accepted by v8 | 0 |
| Parent-complement strips still split-required | 10 |
| Simple-root parent rows consumed by v8 | 0 |
| Split-required base rows | 38 |

Because `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v8.json` records
`branch_chart_authorized=false`, no `branch_chart.json` may be constructed
from this packet.

The exact backend certificate is
`preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v8.json`; the engine audit is
`preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v8.json`.

## Backend Meaning

v8 does not recompute trigonometric enclosures. It converts the v7 candidate
core table into finite regular-boundary candidate families by separator:

$$
\overline{\mathcal{F}}_{\Sigma}^{\mathrm{bdry},v8}
=
\{C : C\text{ is one of the named v8 candidate core records assigned to }\Sigma\}.
$$

This definition is candidate-only. It lists the finite objects that a later
same-packet regular-boundary theorem must certify. The finite inventory is a
formal list of named candidates, but the candidate membership edges are not
formal inclusion proofs and do not prove domination, topology ownership, or
non-core complement closure.

## Finite Candidate Families

| Family | Separator | Candidate memberships | Candidate cores |
| --- | --- | ---: | --- |
| `overline_F_Sigma_1_bdry_v8` | `Sigma_1` | 5 | `C_w_A1_A0_left_v8_reg_boundary_core_1`, `C_w_A2_A0_left_v8_reg_boundary_core_2`, `C_w_A2_A0_right_v8_reg_boundary_core_3`, `C_w_A2_A1_left_v8_reg_boundary_core_4`, `C_w_A2_A1_right_v8_reg_boundary_core_5` |
| `overline_F_Sigma_2_bdry_v8` | `Sigma_2` | 5 | `C_w_A1_A0_left_v8_reg_boundary_core_1`, `C_w_A2_A0_left_v8_reg_boundary_core_2`, `C_w_A2_A0_right_v8_reg_boundary_core_3`, `C_w_A2_A1_left_v8_reg_boundary_core_4`, `C_w_A2_A1_right_v8_reg_boundary_core_5` |
| `overline_F_Sigma_3_bdry_v8` | `Sigma_3` | 5 | `C_u_A3_A2_left_v8_reg_boundary_core_6`, `C_u_A4_A2_left_v8_reg_boundary_core_7`, `C_u_A4_A2_right_v8_reg_boundary_core_8`, `C_u_A4_A3_left_v8_reg_boundary_core_9`, `C_u_A4_A3_right_v8_reg_boundary_core_10` |
| `overline_F_Sigma_4_bdry_v8` | `Sigma_4` | 5 | `C_u_A3_A2_left_v8_reg_boundary_core_6`, `C_u_A4_A2_left_v8_reg_boundary_core_7`, `C_u_A4_A2_right_v8_reg_boundary_core_8`, `C_u_A4_A3_left_v8_reg_boundary_core_9`, `C_u_A4_A3_right_v8_reg_boundary_core_10` |

## Candidate Core Table

| Candidate core | Parent | Side | Candidate separator assignments | Membership edges | Failure code |
| --- | --- | --- | --- | ---: | --- |
| `C_w_A1_A0_left_v8_reg_boundary_core_1` | `R_w_A1_A0` | `left` | `Sigma_1`, `Sigma_2` | 2 | `regular_boundary_finite_family_candidate_missing_acceptance_fields` |
| `C_w_A2_A0_left_v8_reg_boundary_core_2` | `R_w_A2_A0` | `left` | `Sigma_2`, `Sigma_1` | 2 | `regular_boundary_finite_family_candidate_missing_acceptance_fields` |
| `C_w_A2_A0_right_v8_reg_boundary_core_3` | `R_w_A2_A0` | `right` | `Sigma_2`, `Sigma_1` | 2 | `regular_boundary_finite_family_candidate_missing_acceptance_fields` |
| `C_w_A2_A1_left_v8_reg_boundary_core_4` | `R_w_A2_A1` | `left` | `Sigma_2`, `Sigma_1` | 2 | `regular_boundary_finite_family_candidate_missing_acceptance_fields` |
| `C_w_A2_A1_right_v8_reg_boundary_core_5` | `R_w_A2_A1` | `right` | `Sigma_2`, `Sigma_1` | 2 | `regular_boundary_finite_family_candidate_missing_acceptance_fields` |
| `C_u_A3_A2_left_v8_reg_boundary_core_6` | `R_u_A3_A2` | `left` | `Sigma_3`, `Sigma_4` | 2 | `regular_boundary_finite_family_candidate_missing_acceptance_fields` |
| `C_u_A4_A2_left_v8_reg_boundary_core_7` | `R_u_A4_A2` | `left` | `Sigma_4`, `Sigma_3` | 2 | `regular_boundary_finite_family_candidate_missing_acceptance_fields` |
| `C_u_A4_A2_right_v8_reg_boundary_core_8` | `R_u_A4_A2` | `right` | `Sigma_4`, `Sigma_3` | 2 | `regular_boundary_finite_family_candidate_missing_acceptance_fields` |
| `C_u_A4_A3_left_v8_reg_boundary_core_9` | `R_u_A4_A3` | `left` | `Sigma_4`, `Sigma_3` | 2 | `regular_boundary_finite_family_candidate_missing_acceptance_fields` |
| `C_u_A4_A3_right_v8_reg_boundary_core_10` | `R_u_A4_A3` | `right` | `Sigma_4`, `Sigma_3` | 2 | `regular_boundary_finite_family_candidate_missing_acceptance_fields` |

## Domination Audit

| Separator | Fold constants packet | Same fresh packet? | Candidate memberships | Failure code |
| --- | --- | --- | ---: | --- |
| `Sigma_1` | `seed-doubled-four-arc-cosine-template-v0` | `false` | 5 | `regular_boundary_domination_not_same_packet_ceiling` |
| `Sigma_2` | `seed-doubled-four-arc-cosine-template-v0` | `false` | 5 | `regular_boundary_domination_not_same_packet_ceiling` |
| `Sigma_3` | `seed-doubled-four-arc-cosine-template-v0` | `false` | 5 | `regular_boundary_domination_not_same_packet_ceiling` |
| `Sigma_4` | `seed-doubled-four-arc-cosine-template-v0` | `false` | 5 | `regular_boundary_domination_not_same_packet_ceiling` |

## Regular-Boundary Field Failure Summary

| Failure code | Cores |
| --- | ---: |
| `regular_boundary_domination_not_same_packet_ceiling` | 10 |
| `regular_boundary_non_core_complement_closure_absent` | 10 |
| `regular_boundary_same_packet_inclusion_proof_absent` | 10 |
| `regular_boundary_separator_assignment_nonunique` | 10 |
| `regular_boundary_topology_no_double_counting_absent` | 10 |

## Parent-Complement Summary

| Parent | Simple-root subrow | Complement strips | Accepted strips | Split-required strips | Status |
| --- | --- | ---: | ---: | ---: | --- |
| `R_w_A1_A0` | `S_w_A1_A0_v4_1` | 1 | 0 | 1 | `parent_complements_split_required` |
| `R_w_A2_A0` | `S_w_A2_A0_v4_2` | 2 | 0 | 2 | `parent_complements_split_required` |
| `R_w_A2_A1` | `S_w_A2_A1_v4_3` | 2 | 0 | 2 | `parent_complements_split_required` |
| `R_u_A3_A2` | `S_u_A3_A2_v4_4` | 1 | 0 | 1 | `parent_complements_split_required` |
| `R_u_A4_A2` | `S_u_A4_A2_v4_5` | 2 | 0 | 2 | `parent_complements_split_required` |
| `R_u_A4_A3` | `S_u_A4_A3_v4_6` | 2 | 0 | 2 | `parent_complements_split_required` |

## Next Certificate Action

The next proof advance must move from candidate family listing to proof fields:
choose a single separator assignment for each core, prove same-packet inclusion
in the finite family, supply a fresh same-packet domination inequality or
accepted enlarged ceiling, and close topology/no-double-counting plus non-core
complements. Without those fields, regular-boundary coverage remains a theorem
target rather than a row-consumption certificate.

## Capture Decision

Priority-only. This sidecar sharpens the regular-boundary theorem target, but
it is not a passed pre-ledger and not reader-facing AAA prose.
