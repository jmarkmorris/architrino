# Fresh Proof-Interval Preledger v2 Report

## Verdict

The fresh packet `fresh-same-packet-fold-shear-seed-v0` still fail-closes before branch-chart
authorization. This v2 proof-interval sidecar certifies only the rows whose
row-specific rational trigonometric null-coordinate ranges are strictly
disjoint. It uses the conservative global envelope
$$
|X_\delta(\theta)| \le 1.374365144724375.
$$
as an audit ceiling, but row acceptance uses the subdivided trigonometric
enclosures recorded in the ledger rather than the v1 global $X_{\max}$ range.

It is a proof-grade subset for range-empty rows, but it is deliberately not a
full pre-ledger. It accepts no diagonal exclusions, no simple-root subrows, and
no fold-layer rows.

| Quantity | Value |
| --- | ---: |
| Base rows | 162 |
| Empty rows accepted by this proof-interval-v2 sidecar | 116 |
| Split-required rows | 46 |
| Certified diagonal exclusions | 0 |
| Certified simple-root subrows | 0 |
| Accepted fold-layer rows | 0 |
| Minimum accepted range gap | 0.027437434267372 |

Because `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v2.json` records
`branch_chart_authorized=false`, no `branch_chart.json` may be constructed
from this packet.

The exact backend certificate is
`preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v2.json`; the engine audit is
`preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v2.json`.

## Backend Meaning

The generator wraps every JSON number token before parsing and converts each
decimal lexeme into a reduced `BigInt` rational. For a row subinterval
$[\theta_0,\theta_1]$, it forms the exact time range
$$
c_fT_{\mathrm{cyc}}[\theta_0+\ell,\theta_1+\ell]
$$
and encloses $X_\delta$ using a rational interval for $\pi$, exact
quarter-turn argument reduction, Taylor tails with rational remainder bounds,
and support-aware bump ranges. A row is accepted as `empty` only when the
receiver and source null-coordinate hulls are strictly disjoint as rational
intervals.

The emitted $\pi$ interval is used only for trigonometric enclosure of
$X_\delta$. The packet period remains the exact decimal token
`314159265359/50000000000`.

## Split-Required Families

| Failure code | Rows |
| --- | ---: |
| `trig_range_overlap_requires_simple_root_or_structural_certificate` | 8 |
| `trig_range_overlap_same_interval_diagonal_or_endpoint` | 14 |
| `trig_range_overlap_touches_active_fold_layer` | 16 |
| `trig_range_overlap_touches_inactive_fold_neighborhood` | 8 |

## First Split-Required Rows

| Row | Status | Blocker | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A0_A0` | `split_required` | `trig_range_overlap_same_interval_diagonal_or_endpoint` | `A0` | `A0` | `u` | 0 |
| `R_w_A0_A0` | `split_required` | `trig_range_overlap_same_interval_diagonal_or_endpoint` | `A0` | `A0` | `w` | 0 |
| `R_u_A0_A4` | `split_required` | `trig_range_overlap_requires_simple_root_or_structural_certificate` | `A0` | `A4` | `u` | 0 |
| `R_w_A0_A4` | `split_required` | `trig_range_overlap_requires_simple_root_or_structural_certificate` | `A0` | `A4` | `w` | 0 |
| `R_u_F1_A0` | `split_required` | `trig_range_overlap_touches_inactive_fold_neighborhood` | `F1` | `A0` | `u` | 0 |
| `R_w_F1_A0` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `F1` | `A0` | `w` | 0 |
| `R_u_F1_F1` | `split_required` | `trig_range_overlap_same_interval_diagonal_or_endpoint` | `F1` | `F1` | `u` | 0 |
| `R_w_F1_F1` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `F1` | `F1` | `w` | 0 |
| `R_w_A1_A0` | `split_required` | `trig_range_overlap_requires_simple_root_or_structural_certificate` | `A1` | `A0` | `w` | 0 |
| `R_u_A1_F1` | `split_required` | `trig_range_overlap_touches_inactive_fold_neighborhood` | `A1` | `F1` | `u` | 0 |
| `R_w_A1_F1` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `A1` | `F1` | `w` | 0 |
| `R_u_A1_A1` | `split_required` | `trig_range_overlap_same_interval_diagonal_or_endpoint` | `A1` | `A1` | `u` | 0 |
| `R_w_A1_A1` | `split_required` | `trig_range_overlap_same_interval_diagonal_or_endpoint` | `A1` | `A1` | `w` | 0 |
| `R_w_F2_A0` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `F2` | `A0` | `w` | 0 |
| `R_u_F2_A1` | `split_required` | `trig_range_overlap_touches_inactive_fold_neighborhood` | `F2` | `A1` | `u` | 0 |
| `R_w_F2_A1` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `F2` | `A1` | `w` | 0 |
| `R_u_F2_F2` | `split_required` | `trig_range_overlap_same_interval_diagonal_or_endpoint` | `F2` | `F2` | `u` | 0 |
| `R_w_F2_F2` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `F2` | `F2` | `w` | 0 |
| `R_w_A2_A0` | `split_required` | `trig_range_overlap_requires_simple_root_or_structural_certificate` | `A2` | `A0` | `w` | 0 |
| `R_w_A2_F1` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `A2` | `F1` | `w` | 0 |
| `R_w_A2_A1` | `split_required` | `trig_range_overlap_requires_simple_root_or_structural_certificate` | `A2` | `A1` | `w` | 0 |
| `R_u_A2_F2` | `split_required` | `trig_range_overlap_touches_inactive_fold_neighborhood` | `A2` | `F2` | `u` | 0 |
| `R_w_A2_F2` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `A2` | `F2` | `w` | 0 |
| `R_u_A2_A2` | `split_required` | `trig_range_overlap_same_interval_diagonal_or_endpoint` | `A2` | `A2` | `u` | 0 |

## Accepted Empty Row Sample

| Row | Status | Method | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A0_F1` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F1` | `u` | 4.824537815561723 |
| `R_w_A0_F1` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F1` | `w` | 5.967548542292922 |
| `R_u_A0_A1` | `empty` | `proof_interval_trig_range_empty` | `A0` | `A1` | `u` | 2.354818507695565 |
| `R_w_A0_A1` | `empty` | `proof_interval_trig_range_empty` | `A0` | `A1` | `w` | 5.940642320479591 |
| `R_u_A0_F2` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F2` | `u` | 2.039112890105063 |
| `R_w_A0_F2` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F2` | `w` | 6.179411919433126 |
| `R_u_A0_A2` | `empty` | `proof_interval_trig_range_empty` | `A0` | `A2` | `u` | 0.29230813732316 |
| `R_w_A0_A2` | `empty` | `proof_interval_trig_range_empty` | `A0` | `A2` | `w` | 4.487405121698242 |
| `R_u_A0_F3` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F3` | `u` | 0.338624122855648 |
| `R_w_A0_F3` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F3` | `w` | 4.170276927818996 |
| `R_u_A0_A3` | `empty` | `proof_interval_trig_range_empty` | `A0` | `A3` | `u` | 0.311717901042317 |
| `R_w_A0_A3` | `empty` | `proof_interval_trig_range_empty` | `A0` | `A3` | `w` | 1.700557619952838 |
| `R_u_A0_F4` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F4` | `u` | 0.550487499995853 |
| `R_w_A0_F4` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F4` | `w` | 1.384852002362337 |
| `R_u_F1_A1` | `empty` | `proof_interval_trig_range_empty` | `F1` | `A1` | `u` | 3.496307183566624 |
| `R_w_F1_A1` | `empty` | `proof_interval_trig_range_empty` | `F1` | `A1` | `w` | 6.242944575705711 |
| `R_u_F1_F2` | `empty` | `proof_interval_trig_range_empty` | `F1` | `F2` | `u` | 3.180601565976122 |
| `R_w_F1_F2` | `empty` | `proof_interval_trig_range_empty` | `F1` | `F2` | `w` | 6.481714174659247 |
| `R_u_F1_A2` | `empty` | `proof_interval_trig_range_empty` | `F1` | `A2` | `u` | 1.433796813194219 |
| `R_w_F1_A2` | `empty` | `proof_interval_trig_range_empty` | `F1` | `A2` | `w` | 4.789707376924363 |
| `R_u_F1_F3` | `empty` | `proof_interval_trig_range_empty` | `F1` | `F3` | `u` | 1.480112798726707 |
| `R_w_F1_F3` | `empty` | `proof_interval_trig_range_empty` | `F1` | `F3` | `w` | 4.472579183045117 |
| `R_u_F1_A3` | `empty` | `proof_interval_trig_range_empty` | `F1` | `A3` | `u` | 1.453206576913376 |
| `R_w_F1_A3` | `empty` | `proof_interval_trig_range_empty` | `F1` | `A3` | `w` | 2.002859875178959 |

## Next Certificate Action

The next proof advance is no longer range-empty enclosure for the rows accepted
here. It is monotonicity and Jacobian floors for same-interval and
root-candidate rows, followed by same-packet fold-layer impulse fields for
active fold rows.

## Capture Decision

Priority-only. This sidecar is a proof-interval backend and row-specific
range-empty certificate for the fresh packet, not a passed pre-ledger and not
reader-facing AAA prose. Keep it in the proof-program priority packet until a
full same-packet pre-ledger exists or the packet is rejected by a proof-grade
interval backend.
