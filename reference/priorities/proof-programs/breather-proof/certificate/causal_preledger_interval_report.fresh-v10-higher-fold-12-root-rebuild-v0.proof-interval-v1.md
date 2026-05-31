# Higher-Fold Proof-Interval Preledger v1 Report

## Verdict

The higher-fold packet `fresh-v10-higher-fold-12-root-rebuild-v0` still fail-closes before branch-chart
authorization. The 12-root topology is interval-certified, but this v1
proof-interval sidecar certifies only the rows whose exact rational time ranges
are already disjoint after expanding both ranges by the global direct-path
envelope
$$
|X_{\mathrm{seed}}(\theta)| \le 2.274365144724375.
$$

It is a proof-grade subset for coarse range-empty rows, but it is deliberately
not a full trigonometric interval backend. It accepts no diagonal exclusions,
no simple-root subrows, and no fold-layer rows.

| Quantity | Value |
| --- | ---: |
| Base rows | 1250 |
| Empty rows accepted by this proof-interval sidecar | 270 |
| Split-required rows | 980 |
| Certified diagonal exclusions | 0 |
| Certified simple-root subrows | 0 |
| Accepted fold-layer rows | 0 |
| Minimum accepted range gap | 0.001067761338362769 |

Because `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.json` records
`branch_chart_authorized=false`, no `branch_chart.json` may be constructed
from this packet.

The exact backend certificate is
`preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.json`; the engine audit is
`preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.json`.

## Backend Meaning

The generator wraps every JSON number token before parsing and converts each
decimal lexeme into a reduced `BigInt` rational. For a row interval
$[\theta_0,\theta_1]$, it forms the exact time range
$$
c_fT_{\mathrm{cyc}}[\theta_0+\ell,\theta_1+\ell]
$$
and expands it by the global higher-fold direct-path $X$ envelope. A row is
accepted as `empty` only when the expanded receiver and source intervals are
strictly disjoint as rational intervals.

The certified $X$ envelope uses only $|\cos|\le 1$ and the bump bound
$0\le\psi_i\le 1$ for the source seed and shifted-separator repair basis.
The previously emitted root-tube interval certificate supplies the 12-root
topology input; this sidecar supplies only coarse null-coordinate row
classification.

## Split-Required Families

| Failure code | Rows |
| --- | ---: |
| `coarse_xbound_overlap_requires_row_specific_certificate` | 252 |
| `coarse_xbound_overlap_same_interval_diagonal_or_endpoint` | 50 |
| `coarse_xbound_overlap_touches_fold_layer_candidate` | 678 |

## First Split-Required Rows

| Row | Status | Blocker | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A00_A00` | `split_required` | `coarse_xbound_overlap_same_interval_diagonal_or_endpoint` | `A00` | `A00` | `u` | 0 |
| `R_w_A00_A00` | `split_required` | `coarse_xbound_overlap_same_interval_diagonal_or_endpoint` | `A00` | `A00` | `w` | 0 |
| `R_u_A00_A04` | `split_required` | `coarse_xbound_overlap_requires_row_specific_certificate` | `A00` | `A04` | `u` | 0 |
| `R_w_A00_A04` | `split_required` | `coarse_xbound_overlap_requires_row_specific_certificate` | `A00` | `A04` | `w` | 0 |
| `R_u_A00_F05` | `split_required` | `coarse_xbound_overlap_touches_fold_layer_candidate` | `A00` | `F05` | `u` | 0 |
| `R_w_A00_F05` | `split_required` | `coarse_xbound_overlap_touches_fold_layer_candidate` | `A00` | `F05` | `w` | 0 |
| `R_u_A00_A05` | `split_required` | `coarse_xbound_overlap_requires_row_specific_certificate` | `A00` | `A05` | `u` | 0 |
| `R_w_A00_A05` | `split_required` | `coarse_xbound_overlap_requires_row_specific_certificate` | `A00` | `A05` | `w` | 0 |
| `R_u_A00_F06` | `split_required` | `coarse_xbound_overlap_touches_fold_layer_candidate` | `A00` | `F06` | `u` | 0 |
| `R_w_A00_F06` | `split_required` | `coarse_xbound_overlap_touches_fold_layer_candidate` | `A00` | `F06` | `w` | 0 |
| `R_u_A00_A06` | `split_required` | `coarse_xbound_overlap_requires_row_specific_certificate` | `A00` | `A06` | `u` | 0 |
| `R_w_A00_A06` | `split_required` | `coarse_xbound_overlap_requires_row_specific_certificate` | `A00` | `A06` | `w` | 0 |
| `R_u_A00_F07` | `split_required` | `coarse_xbound_overlap_touches_fold_layer_candidate` | `A00` | `F07` | `u` | 0 |
| `R_w_A00_F07` | `split_required` | `coarse_xbound_overlap_touches_fold_layer_candidate` | `A00` | `F07` | `w` | 0 |
| `R_u_A00_A07` | `split_required` | `coarse_xbound_overlap_requires_row_specific_certificate` | `A00` | `A07` | `u` | 0 |
| `R_w_A00_A07` | `split_required` | `coarse_xbound_overlap_requires_row_specific_certificate` | `A00` | `A07` | `w` | 0 |
| `R_u_A00_F08` | `split_required` | `coarse_xbound_overlap_touches_fold_layer_candidate` | `A00` | `F08` | `u` | 0 |
| `R_w_A00_F08` | `split_required` | `coarse_xbound_overlap_touches_fold_layer_candidate` | `A00` | `F08` | `w` | 0 |
| `R_u_A00_A08` | `split_required` | `coarse_xbound_overlap_requires_row_specific_certificate` | `A00` | `A08` | `u` | 0 |
| `R_w_A00_A08` | `split_required` | `coarse_xbound_overlap_requires_row_specific_certificate` | `A00` | `A08` | `w` | 0 |
| `R_u_A00_F09` | `split_required` | `coarse_xbound_overlap_touches_fold_layer_candidate` | `A00` | `F09` | `u` | 0 |
| `R_w_A00_F09` | `split_required` | `coarse_xbound_overlap_touches_fold_layer_candidate` | `A00` | `F09` | `w` | 0 |
| `R_u_A00_A09` | `split_required` | `coarse_xbound_overlap_requires_row_specific_certificate` | `A00` | `A09` | `u` | 0 |
| `R_w_A00_A09` | `split_required` | `coarse_xbound_overlap_requires_row_specific_certificate` | `A00` | `A09` | `w` | 0 |

## Accepted Empty Row Sample

| Row | Status | Method | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A00_F01` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `A00` | `F01` | `u` | 1.611637645204054644 |
| `R_w_A00_F01` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `A00` | `F01` | `w` | 1.611637645204054644 |
| `R_u_A00_A01` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `A00` | `A01` | `u` | 1.404341285904999742 |
| `R_w_A00_A01` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `A00` | `A01` | `w` | 1.404341285904999742 |
| `R_u_A00_F02` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `A00` | `F02` | `u` | 1.354075803447559742 |
| `R_w_A00_F02` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `A00` | `F02` | `w` | 1.354075803447559742 |
| `R_u_A00_A02` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `A00` | `A02` | `u` | 0.957956247104091292 |
| `R_w_A00_A02` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `A00` | `A02` | `w` | 0.957956247104091292 |
| `R_u_A00_F03` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `A00` | `F03` | `u` | 0.907690764646651292 |
| `R_w_A00_F03` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `A00` | `F03` | `w` | 0.907690764646651292 |
| `R_u_A00_A03` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `A00` | `A03` | `u` | 0.251423000878610939 |
| `R_w_A00_A03` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `A00` | `A03` | `w` | 0.251423000878610939 |
| `R_u_A00_F04` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `A00` | `F04` | `u` | 0.201157518421170939 |
| `R_w_A00_F04` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `A00` | `F04` | `w` | 0.201157518421170939 |
| `R_u_F01_A01` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `F01` | `A01` | `u` | 1.476893175974755098 |
| `R_w_F01_A01` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `F01` | `A01` | `w` | 1.476893175974755098 |
| `R_u_F01_F02` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `F01` | `F02` | `u` | 1.426627693517315098 |
| `R_w_F01_F02` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `F01` | `F02` | `w` | 1.426627693517315098 |
| `R_u_F01_A02` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `F01` | `A02` | `u` | 1.030508137173846648 |
| `R_w_F01_A02` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `F01` | `A02` | `w` | 1.030508137173846648 |
| `R_u_F01_F03` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `F01` | `F03` | `u` | 0.980242654716406648 |
| `R_w_F01_F03` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `F01` | `F03` | `w` | 0.980242654716406648 |
| `R_u_F01_A03` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `F01` | `A03` | `u` | 0.323974890948366294 |
| `R_w_F01_A03` | `empty` | `higher_fold_proof_interval_time_xbound_range_empty` | `F01` | `A03` | `w` | 0.323974890948366294 |

## Next Certificate Action

The next proof advance is a trig-enabled proof-interval pass over the remaining
rows: certified sine/cosine enclosures for row-specific $X$ ranges,
monotonicity and Jacobian floors for same-interval and root-candidate rows,
then same-packet fold-layer impulse fields for active fold rows.

## Capture Decision

Priority-only. This sidecar is a proof-interval backend and coarse range-empty
certificate for the higher-fold packet, not a passed pre-ledger and not
reader-facing AAA prose. Keep it in the proof-program priority packet until a
full same-packet pre-ledger exists or the packet is rejected by a proof-grade
interval backend.
