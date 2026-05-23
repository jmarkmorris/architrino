# Fresh Preledger Blocker Anatomy

## Verdict

The fresh sidecar `fresh-same-packet-fold-shear-seed-v0` remains blocked before branch-chart
authorization. This packet does not accept any new row. It converts the 34
`split_required` rows in `causal_ledger.fresh-same-packet-fold-shear-seed-v0.json` into row families
and proof burdens for the next proof-grade preledger pass.

| Blocker family | Rows |
| --- | ---: |
| `active_fold_layer_certificate_absent` | 16 |
| `nonmonotone_diagonal_contact` | 2 |
| `regular_parent_root_candidate_overlap` | 6 |
| `structural_endpoint_or_inactive_fold_contact` | 8 |
| `structural_periodic_seam_contact` | 2 |

The split is structurally useful: 16 rows require same-packet fold-layer
certification, 6 regular/regular rows are the actual simple-root candidate
parents, 10 endpoint/seam or inactive-fold-neighborhood rows need structural
endpoint handling rather than branch extraction, and 2 rows require diagonal
splitting or monotone exclusion.

## Row Anatomy

| Row | Family | Next action | Receiver | Source | Ledger | Diagnostic overlap width | Diagnostic source monotonicity floor |
| --- | --- | --- | --- | --- | --- | ---: | ---: |
| `R_u_A0_A4` | `structural_periodic_seam_contact` | `periodic_seam_endpoint_split` | `A0` | `A4` | `u` | 0.00237587901190994 | 0 |
| `R_w_A0_A4` | `structural_periodic_seam_contact` | `periodic_seam_endpoint_split` | `A0` | `A4` | `w` | 0.00264434733006991 | 5.73266725646168 |
| `R_u_F1_A0` | `structural_endpoint_or_inactive_fold_contact` | `inactive_fold_neighborhood_regular_split` | `F1` | `A0` | `u` | 0.000999287321443998 | 6.83370335789832 |
| `R_w_F1_A0` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `F1` | `A0` | `w` | 0.00692899875917008 | 0.0964624970326975 |
| `R_w_F1_F1` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `F1` | `F1` | `w` | 0.00745102360868999 | 0 |
| `R_w_A1_A0` | `regular_parent_root_candidate_overlap` | `simple_root_subrow_plus_parent_complement_closure` | `A1` | `A0` | `w` | 0.21249439100213 | 0.0964624970326975 |
| `R_u_A1_F1` | `structural_endpoint_or_inactive_fold_contact` | `inactive_fold_neighborhood_regular_split` | `A1` | `F1` | `u` | 0.000842369150806987 | 12.4699081173273 |
| `R_w_A1_F1` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `A1` | `F1` | `w` | 0.00390055196395989 | 0 |
| `R_w_F2_A0` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `F2` | `A0` | `w` | 0.00686862500427998 | 0.0964624970326975 |
| `R_u_F2_A1` | `structural_endpoint_or_inactive_fold_contact` | `inactive_fold_neighborhood_regular_split` | `F2` | `A1` | `u` | 0.000939480096880274 | 12.7172166899349 |
| `R_w_F2_A1` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `F2` | `A1` | `w` | 0.00399766290998005 | 0.150846075574873 |
| `R_w_F2_F2` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `F2` | `F2` | `w` | 0.00686862500427998 | 0 |
| `R_w_A2_A0` | `regular_parent_root_candidate_overlap` | `simple_root_subrow_plus_parent_complement_closure` | `A2` | `A0` | `w` | 0.22570618920172 | 0.0964624970326975 |
| `R_w_A2_F1` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `A2` | `F1` | `w` | 0.00745102360868999 | 0 |
| `R_w_A2_A1` | `regular_parent_root_candidate_overlap` | `simple_root_subrow_plus_parent_complement_closure` | `A2` | `A1` | `w` | 0.21249439100213 | 0.150846075574873 |
| `R_u_A2_F2` | `structural_endpoint_or_inactive_fold_contact` | `inactive_fold_neighborhood_regular_split` | `A2` | `F2` | `u` | 0.000906684327900198 | 12.5663706143468 |
| `R_w_A2_F2` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `A2` | `F2` | `w` | 0.00686862500427998 | 0 |
| `R_w_A2_A2` | `nonmonotone_diagonal_contact` | `diagonal_split_and_monotone_exclusion` | `A2` | `A2` | `w` | 1.70975004455992 | 0 |
| `R_u_F3_A2` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `F3` | `A2` | `u` | 0.00693091276859015 | 0.0964624970326993 |
| `R_w_F3_A2` | `structural_endpoint_or_inactive_fold_contact` | `inactive_fold_neighborhood_regular_split` | `F3` | `A2` | `w` | 0.000999764568099692 | 0 |
| `R_u_F3_F3` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `F3` | `F3` | `u` | 0.00745102360887007 | 0 |
| `R_u_A3_A2` | `regular_parent_root_candidate_overlap` | `simple_root_subrow_plus_parent_complement_closure` | `A3` | `A2` | `u` | 0.21249439100231 | 0.0964624970326993 |
| `R_u_A3_F3` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `A3` | `F3` | `u` | 0.00390055196413996 | 0 |
| `R_w_A3_F3` | `structural_endpoint_or_inactive_fold_contact` | `inactive_fold_neighborhood_regular_split` | `A3` | `F3` | `w` | 0.000842369150960032 | 12.4699081173273 |
| `R_u_F4_A2` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `F4` | `A2` | `u` | 0.0068686250044605 | 0.0964624970326993 |
| `R_u_F4_A3` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `F4` | `A3` | `u` | 0.00399766291016057 | 0.150846075574872 |
| `R_w_F4_A3` | `structural_endpoint_or_inactive_fold_contact` | `inactive_fold_neighborhood_regular_split` | `F4` | `A3` | `w` | 0.000939480097060574 | 12.7172166899349 |
| `R_u_F4_F4` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `F4` | `F4` | `u` | 0.0068686250044605 | 0 |
| `R_u_A4_A2` | `regular_parent_root_candidate_overlap` | `simple_root_subrow_plus_parent_complement_closure` | `A4` | `A2` | `u` | 0.22570645359456 | 0.0964624970326993 |
| `R_u_A4_F3` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `A4` | `F3` | `u` | 0.00745102360887007 | 0 |
| `R_u_A4_A3` | `regular_parent_root_candidate_overlap` | `simple_root_subrow_plus_parent_complement_closure` | `A4` | `A3` | `u` | 0.21249439100231 | 0.150846075574872 |
| `R_u_A4_F4` | `active_fold_layer_certificate_absent` | `fresh_fold_layer_certificate` | `A4` | `F4` | `u` | 0.0068686250044605 | 0 |
| `R_w_A4_F4` | `structural_endpoint_or_inactive_fold_contact` | `inactive_fold_neighborhood_regular_split` | `A4` | `F4` | `w` | 0.000906290876850235 | 12.5663706143468 |
| `R_u_A4_A4` | `nonmonotone_diagonal_contact` | `diagonal_split_and_monotone_exclusion` | `A4` | `A4` | `u` | 0.57059961841843 | 0 |

## Proof-Grade Reading

The derivative floors and overlap widths above are binary64 diagnostics. They
are not certificate margins. A later pass must recompute every retained margin
with exact decimal intake, certified trigonometric interval enclosures, and
outward rounding before promoting any row to `empty`, `simple_root`, or
`fold_layer`.

## Capture Decision

Priority-only. This is a row-anatomy and routing artifact for the fresh
preledger failure. It should stay under `reference/priorities` until a later
proof-grade interval certificate either consumes these rows or rejects the
fresh packet with formal margins.
