# Fresh Proof-Interval Preledger v1 Report

## Verdict

The fresh packet `fresh-same-packet-fold-shear-seed-v0` still fail-closes before branch-chart
authorization. This v1 proof-interval sidecar certifies only the rows whose
exact rational time ranges are already disjoint after expanding both ranges by
the global envelope
$$
|X_\delta(\theta)| \le 1.374365144724375.
$$

It is a proof-grade subset for coarse range-empty rows, but it is deliberately
not a full trigonometric interval backend. It accepts no diagonal exclusions,
no simple-root subrows, and no fold-layer rows.

| Quantity | Value |
| --- | ---: |
| Base rows | 162 |
| Empty rows accepted by this proof-interval sidecar | 70 |
| Split-required rows | 92 |
| Certified diagonal exclusions | 0 |
| Certified simple-root subrows | 0 |
| Accepted fold-layer rows | 0 |
| Minimum accepted range gap | 0.23578273146175 |

Because `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v1.json` records
`branch_chart_authorized=false`, no `branch_chart.json` may be constructed
from this packet.

The exact backend certificate is
`preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v1.json`; the engine audit is
`preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v1.json`.

## Backend Meaning

The generator wraps every JSON number token before parsing and converts each
decimal lexeme into a reduced `BigInt` rational. For a row interval
$[\theta_0,\theta_1]$, it forms the exact time range
$$
c_fT_{\mathrm{cyc}}[\theta_0+\ell,\theta_1+\ell]
$$
and expands it by the global $X$ envelope. A row is accepted as `empty` only
when the expanded receiver and source intervals are strictly disjoint as
rational intervals.

The certified $X$ envelope uses only $|\cos| \le 1$ and the bump bound
$0 \le \psi_i \le 1$. The emitted Machin-identity rational interval for $\pi$
is reserved for a later trigonometric enclosure pass and is not consumed here.

## Split-Required Families

| Failure code | Rows |
| --- | ---: |
| `coarse_xbound_overlap_requires_trig_or_row_specific_certificate` | 26 |
| `coarse_xbound_overlap_same_interval_diagonal_or_endpoint` | 14 |
| `coarse_xbound_overlap_touches_active_fold_layer` | 30 |
| `coarse_xbound_overlap_touches_inactive_fold_neighborhood` | 22 |

## First Split-Required Rows

| Row | Status | Blocker | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A0_A0` | `split_required` | `coarse_xbound_overlap_same_interval_diagonal_or_endpoint` | `A0` | `A0` | `u` | 0 |
| `R_w_A0_A0` | `split_required` | `coarse_xbound_overlap_same_interval_diagonal_or_endpoint` | `A0` | `A0` | `w` | 0 |
| `R_u_A0_A2` | `split_required` | `coarse_xbound_overlap_requires_trig_or_row_specific_certificate` | `A0` | `A2` | `u` | 0 |
| `R_w_A0_A2` | `split_required` | `coarse_xbound_overlap_requires_trig_or_row_specific_certificate` | `A0` | `A2` | `w` | 0 |
| `R_u_A0_F3` | `split_required` | `coarse_xbound_overlap_touches_active_fold_layer` | `A0` | `F3` | `u` | 0 |
| `R_w_A0_F3` | `split_required` | `coarse_xbound_overlap_touches_inactive_fold_neighborhood` | `A0` | `F3` | `w` | 0 |
| `R_u_A0_A3` | `split_required` | `coarse_xbound_overlap_requires_trig_or_row_specific_certificate` | `A0` | `A3` | `u` | 0 |
| `R_w_A0_A3` | `split_required` | `coarse_xbound_overlap_requires_trig_or_row_specific_certificate` | `A0` | `A3` | `w` | 0 |
| `R_u_A0_F4` | `split_required` | `coarse_xbound_overlap_touches_active_fold_layer` | `A0` | `F4` | `u` | 0 |
| `R_w_A0_F4` | `split_required` | `coarse_xbound_overlap_touches_inactive_fold_neighborhood` | `A0` | `F4` | `w` | 0 |
| `R_u_A0_A4` | `split_required` | `coarse_xbound_overlap_requires_trig_or_row_specific_certificate` | `A0` | `A4` | `u` | 0 |
| `R_w_A0_A4` | `split_required` | `coarse_xbound_overlap_requires_trig_or_row_specific_certificate` | `A0` | `A4` | `w` | 0 |
| `R_u_F1_A0` | `split_required` | `coarse_xbound_overlap_touches_inactive_fold_neighborhood` | `F1` | `A0` | `u` | 0 |
| `R_w_F1_A0` | `split_required` | `coarse_xbound_overlap_touches_active_fold_layer` | `F1` | `A0` | `w` | 0 |
| `R_u_F1_F1` | `split_required` | `coarse_xbound_overlap_same_interval_diagonal_or_endpoint` | `F1` | `F1` | `u` | 0 |
| `R_w_F1_F1` | `split_required` | `coarse_xbound_overlap_touches_active_fold_layer` | `F1` | `F1` | `w` | 0 |
| `R_u_F1_A3` | `split_required` | `coarse_xbound_overlap_touches_inactive_fold_neighborhood` | `F1` | `A3` | `u` | 0 |
| `R_w_F1_A3` | `split_required` | `coarse_xbound_overlap_touches_active_fold_layer` | `F1` | `A3` | `w` | 0 |
| `R_u_F1_F4` | `split_required` | `coarse_xbound_overlap_touches_active_fold_layer` | `F1` | `F4` | `u` | 0 |
| `R_w_F1_F4` | `split_required` | `coarse_xbound_overlap_touches_active_fold_layer` | `F1` | `F4` | `w` | 0 |
| `R_u_F1_A4` | `split_required` | `coarse_xbound_overlap_touches_inactive_fold_neighborhood` | `F1` | `A4` | `u` | 0 |
| `R_w_F1_A4` | `split_required` | `coarse_xbound_overlap_touches_active_fold_layer` | `F1` | `A4` | `w` | 0 |
| `R_u_A1_A0` | `split_required` | `coarse_xbound_overlap_requires_trig_or_row_specific_certificate` | `A1` | `A0` | `u` | 0 |
| `R_w_A1_A0` | `split_required` | `coarse_xbound_overlap_requires_trig_or_row_specific_certificate` | `A1` | `A0` | `w` | 0 |

## Accepted Empty Row Sample

| Row | Status | Method | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A0_F1` | `empty` | `proof_interval_time_xbound_range_empty` | `A0` | `F1` | `u` | 2.654283689536149 |
| `R_w_A0_F1` | `empty` | `proof_interval_time_xbound_range_empty` | `A0` | `F1` | `w` | 2.654283689536149 |
| `R_u_A0_A1` | `empty` | `proof_interval_time_xbound_range_empty` | `A0` | `A1` | `u` | 1.52436110462355 |
| `R_w_A0_A1` | `empty` | `proof_interval_time_xbound_range_empty` | `A0` | `A1` | `w` | 1.52436110462355 |
| `R_u_A0_F2` | `empty` | `proof_interval_time_xbound_range_empty` | `A0` | `F2` | `u` | 1.36728147194405 |
| `R_w_A0_F2` | `empty` | `proof_interval_time_xbound_range_empty` | `A0` | `F2` | `w` | 1.36728147194405 |
| `R_u_F1_A1` | `empty` | `proof_interval_time_xbound_range_empty` | `F1` | `A1` | `u` | 2.247452800139151 |
| `R_w_F1_A1` | `empty` | `proof_interval_time_xbound_range_empty` | `F1` | `A1` | `w` | 2.247452800139151 |
| `R_u_F1_F2` | `empty` | `proof_interval_time_xbound_range_empty` | `F1` | `F2` | `u` | 2.090373167459651 |
| `R_w_F1_F2` | `empty` | `proof_interval_time_xbound_range_empty` | `F1` | `F2` | `w` | 2.090373167459651 |
| `R_u_F1_A2` | `empty` | `proof_interval_time_xbound_range_empty` | `F1` | `A2` | `u` | 0.39286236414125 |
| `R_w_F1_A2` | `empty` | `proof_interval_time_xbound_range_empty` | `F1` | `A2` | `w` | 0.39286236414125 |
| `R_u_F1_F3` | `empty` | `proof_interval_time_xbound_range_empty` | `F1` | `F3` | `u` | 0.23578273146175 |
| `R_w_F1_F3` | `empty` | `proof_interval_time_xbound_range_empty` | `F1` | `F3` | `w` | 0.23578273146175 |
| `R_u_A1_F2` | `empty` | `proof_interval_time_xbound_range_empty` | `A1` | `F2` | `u` | 2.247452800139151 |
| `R_w_A1_F2` | `empty` | `proof_interval_time_xbound_range_empty` | `A1` | `F2` | `w` | 2.247452800139151 |
| `R_u_A1_A2` | `empty` | `proof_interval_time_xbound_range_empty` | `A1` | `A2` | `u` | 0.54994199682075 |
| `R_w_A1_A2` | `empty` | `proof_interval_time_xbound_range_empty` | `A1` | `A2` | `w` | 0.54994199682075 |
| `R_u_A1_F3` | `empty` | `proof_interval_time_xbound_range_empty` | `A1` | `F3` | `u` | 0.39286236414125 |
| `R_w_A1_F3` | `empty` | `proof_interval_time_xbound_range_empty` | `A1` | `F3` | `w` | 0.39286236414125 |
| `R_u_F2_A2` | `empty` | `proof_interval_time_xbound_range_empty` | `F2` | `A2` | `u` | 1.679864581733348 |
| `R_w_F2_A2` | `empty` | `proof_interval_time_xbound_range_empty` | `F2` | `A2` | `w` | 1.679864581733348 |
| `R_u_F2_F3` | `empty` | `proof_interval_time_xbound_range_empty` | `F2` | `F3` | `u` | 1.522784949053848 |
| `R_w_F2_F3` | `empty` | `proof_interval_time_xbound_range_empty` | `F2` | `F3` | `w` | 1.522784949053848 |

## Next Certificate Action

The next proof advance is a trig-enabled proof-interval pass over the remaining
rows: certified sine/cosine enclosures for row-specific $X$ ranges,
monotonicity and Jacobian floors for same-interval and root-candidate rows,
then same-packet fold-layer impulse fields for active fold rows.

## Capture Decision

Priority-only. This sidecar is a proof-interval backend and coarse range-empty
certificate for the fresh packet, not a passed pre-ledger and not reader-facing
AAA prose. Keep it in the proof-program priority packet until a full same-packet
pre-ledger exists or the packet is rejected by a proof-grade interval backend.
