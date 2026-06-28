# Higher-Fold Preledger Row-Family Classifier

## Verdict

Status: `preledger_row_family_classifier_fail_closed_no_row_consumption`.

This priority-only classifier reads the higher-fold proof-interval v6 ledger,
the source-cover follow-ups, the one-leaf direct-path screen, the
`lambda=0.305` replay audit, and the fold-layer burden atlas. It separates the
remaining 162 split-required rows
into three certificate families:

- 42 regular source-cover parent-complement rows;
- 8 periodic endpoint/complement rows;
- 112 higher-fold layer rows.

It consumes 0 rows, keeps `preledger_pass=false`, keeps
`updates_live_ledger=false`, and leaves `branch_chart_authorized=false`.

## Source Artifacts

| Source | Artifact | Present | SHA-256 |
| --- | --- | ---: | --- |
| `ledger` | `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true | `0d774bb9e3e664d6749ef120a5805a4eeef7b19fdf412432201ea49a2b96f4a5` |
| `source_cover_defect_atlas` | `source_cover_defect_atlas.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true | `71acd423e49347c930c978976eca3d6fcd38475840f03daf572a36bc0c2b373d` |
| `source_cover_boundary_ownership_audit` | `source_cover_boundary_ownership_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true | `779de21e7d809940a94341a45176a5b45f0f4c5c0529b88cb46d002a2ab53ef6` |
| `one_leaf_direct_path_lambda_screen` | `one_leaf_direct_path_lambda_shift_screen.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true | `08176b503110002ca25fb0cf201860d124e33e6ca0e424b8d4ff8fae58069d88` |
| `lambda0305_preledger_replay_audit` | `lambda0305_preledger_replay_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true | `cd79f688660cf93b563a876dc4446da0c9c8aefeb8f19751eac15f13cdd468f3` |
| `fold_layer_burden_atlas` | `fold_layer_burden.fresh-v10-higher-fold-12-root-rebuild-v0.json` | true | `da59d44487f227ab01170459c660fb0cc92e9b8d9a9b894ba8a4c881af015e62` |

## Row Families

| Family | Rows | Failure code | Status | Mechanical continuation |
| --- | ---: | --- | --- | --- |
| `regular_source_cover_parent_complement` | 42 | `trig_range_overlap_simple_root_receiver_not_strictly_covered` | `fail_closed_no_rows_consumed` | mechanical interval-certificate candidate: intervalize the active-endpoint boundary-opening data and add monotonicity, memory, endpoint ownership/no-double-counting, branch-reuse exclusion, and non-owned-complement closure before any row consumption. |
| `periodic_endpoint_complement_ownership` | 8 | `trig_range_overlap_periodic_seam_endpoint_ownership_required` | `fail_closed_no_rows_consumed` | mechanical endpoint/complement ownership certificate: prove periodic source-lift endpoint ownership or complement closure for these seam rows before branch-chart work. |
| `higher_fold_layer_certificate` | 112 | `trig_range_overlap_touches_fold_layer_candidate` | `fail_closed_no_rows_consumed` | mechanical fold-layer certificate: construct same-packet alpha/exit/parity/impulse or direct quadrature fields for the 12 higher-fold separator layers; these rows must not be rewritten as simple-root rows. |

## Lambda Replay Delta

The `lambda=0.305` replay is useful but non-consuming. It recertifies root
topology and improves the v6 receiver-cover leaf count by
10, but it does not
reduce the split-required base-row count, complete any receiver-cover parent
row, accept any fold-layer row, pass the preledger, update the live ledger, or
authorize a branch chart.

| Replay field | Baseline | Trial | Delta |
| --- | ---: | ---: | ---: |
| `v4_simple_root_subrows` | 42 | 41 | -1 |
| `v5_receiver_cover_certified_cells` | 571 | 567 | -4 |
| `v5_receiver_cover_missing_cells` | 773 | 777 | 4 |
| `v6_receiver_cover_certified_cells` | 622 | 632 | 10 |
| `v6_receiver_cover_missing_cells` | 3024 | 3012 | -12 |
| `v6_terminal_missing_coarse_cells` | 773 | 777 | 4 |
| `v6_complete_receiver_cover_parent_rows` | 0 | 0 | 0 |
| `v6_accepted_fold_layer_rows` | 0 | 0 | 0 |
| `split_required_base_rows` | 162 | 162 | 0 |
| `branch_chart_authorized` | false | false |  |

Ephemeral replay ledgers present at the recorded scratch preledger directory:
false.

## Regular Source-Cover Rows

The regular family is the strongest non-rule-blocked certificate target. The
source-cover atlas already converts all 42 regular residual
rows into exact rational boundary burdens, and the ownership audit proves
42 / 42
complete terminal-grid receiver partitions. It certifies
0 rows against
the full ownership pass rule.

| Quantity | Value |
| --- | ---: |
| Terminal missing leaves | 3024 |
| Receiver-left boundary missing leaves | 978 |
| Receiver-right boundary missing leaves | 2046 |
| Receiver-interior missing leaves | 0 |
| Boundary component count | 64 |
| One-leaf screened rows | 3 |
| Unscreened regular rows | 39 |
| Sampled positive one-leaf rows | 3 |
| Proof-grade one-leaf rows | 0 |

| One-leaf row | Failed side | Required improvement | Trial sampled defect | Combined opening | Lambda threshold | Trial margin | Proof-grade |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| `R_w_A04_A03` | `lo` | 0.000026691996524 | -0.00016076283641997 | 0.000185356060179886 | 0.300720019526139 | 0.00427998047386102 | false |
| `R_u_A10_A09` | `lo` | 0.000026691996524 | -0.00016076283641997 | 0.000185356060179664 | 0.300720019526139 | 0.00427998047386102 | false |
| `R_u_A07_A06` | `hi` | 0.00024618430271 | -0.000434576402819964 | 0.000678172483089767 | 0.301815056706425 | 0.0031849432935751 | false |

## Periodic Endpoint/Complement Rows

The periodic seam family has 8 rows:
`R_u_A00_A12`, `R_w_A00_A12`, `R_w_A01_A12`, `R_w_A02_A12`, `R_w_A03_A12`, `R_w_A04_A12`, `R_w_A05_A12`, `R_w_A06_A12`.
These rows are not source-cover atlas rows. They need a periodic
endpoint/complement ownership certificate before branch-chart work.

## Fold-Layer Rows

The fold-layer family has 112 rows grouped over
12 higher-fold separator layers. It remains
non-consuming: accepted fold-layer rows are 0.
These rows must become proof-grade fold-layer rows; they must not be rewritten
as simple-root rows.

| Separator | Rows |
| --- | ---: |
| `Sigma_hf_01` | 11 |
| `Sigma_hf_02` | 11 |
| `Sigma_hf_03` | 7 |
| `Sigma_hf_04` | 9 |
| `Sigma_hf_05` | 9 |
| `Sigma_hf_06` | 9 |
| `Sigma_hf_07` | 11 |
| `Sigma_hf_08` | 11 |
| `Sigma_hf_09` | 7 |
| `Sigma_hf_10` | 9 |
| `Sigma_hf_11` | 9 |
| `Sigma_hf_12` | 9 |

## Certificate-Side Handoff

Most promising non-rule-blocked target: `regular_source_cover_parent_complement`.

Target: one-leaf active-endpoint interval boundary-opening certificate with monotonicity, memory, ownership/no-double-counting, branch-reuse exclusion, and non-owned-complement closure.

Reason: This family has exact source-cover boundary burdens for all 42 rows, complete terminal-grid receiver partitions, and 3 screened one-leaf rows with positive sampled lambda opening. It can continue mechanically by intervalizing existing geometry data; it does not require primitive proof-rule acceptance.

First mechanical handoff: Make the three screened one-leaf rows durable as interval endpoint boxes and residual-function bounds, or rerun the lambda=0.305 v1-v6 replay with durable row-level ledgers before attempting row-level delta promotion.

Still blocked: The remaining 39 regular rows have no one-leaf direct-path screen data, the 8 periodic seam rows still need endpoint/complement ownership, and the 112 fold-layer rows still need same-packet fold-layer certification.

## Capture Decision

Priority-only. This classifier sharpens the live blocker into three finite row families and selects the regular source-cover one-leaf interval route as the next non-rule-blocked certificate target, but it proves no preledger row and authorizes no branch chart.
