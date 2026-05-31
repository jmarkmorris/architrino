# Higher-Fold Proof-Interval Preledger v2 Report

## Verdict

The higher-fold packet `fresh-v10-higher-fold-12-root-rebuild-v0` still fail-closes before branch-chart
authorization. This v2 proof-interval sidecar certifies only the rows whose
row-specific rational trigonometric null-coordinate ranges are strictly
disjoint. It uses the conservative global envelope
$$
|X_{\mathrm{seed}}(\theta)| \le 2.274365144724375.
$$
as an audit ceiling, but row acceptance uses the subdivided trigonometric
enclosures recorded in the ledger rather than the v1 global $X_{\max}$ range.

It is a proof-grade subset for range-empty rows, but it is deliberately not a
full pre-ledger. It accepts no diagonal exclusions, no simple-root subrows, and
no fold-layer rows.

| Quantity | Value |
| --- | ---: |
| Base rows | 1250 |
| Empty rows accepted by this proof-interval-v2 sidecar | 1062 |
| Empty rows accepted by proof-interval-v1 | 270 |
| Split-required rows | 188 |
| Certified diagonal exclusions | 0 |
| Certified simple-root subrows | 0 |
| Accepted fold-layer rows | 0 |
| Minimum accepted range gap | 0.01541646634368 |

Because `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.json` records
`branch_chart_authorized=false`, no `branch_chart.json` may be constructed
from this packet.

The exact backend certificate is
`preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.json`; the engine audit is
`preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.json`.

## Backend Meaning

The generator wraps every JSON number token before parsing and converts each
decimal lexeme into a reduced `BigInt` rational. For a row subinterval
$[\theta_0,\theta_1]$, it forms the exact time range
$$
c_fT_{\mathrm{cyc}}[\theta_0+\ell,\theta_1+\ell]
$$
and encloses $X_{\mathrm{seed}}$ using a rational interval for $\pi$, exact
quarter-turn argument reduction, Taylor tails with rational remainder bounds,
and support-aware bump ranges. A row is accepted as `empty` only when the
receiver and source null-coordinate hulls are strictly disjoint as rational
intervals.

The emitted $\pi$ interval is used only for trigonometric enclosure of
$X_{\mathrm{seed}}$. The packet period remains the exact decimal token
`314159265359/50000000000`.

## Split-Required Families

| Failure code | Rows |
| --- | ---: |
| `trig_range_overlap_requires_simple_root_or_complement_certificate` | 50 |
| `trig_range_overlap_same_interval_diagonal_or_endpoint` | 26 |
| `trig_range_overlap_touches_fold_layer_candidate` | 112 |

## First Split-Required Rows

| Row | Status | Blocker | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A00_A00` | `split_required` | `trig_range_overlap_same_interval_diagonal_or_endpoint` | `A00` | `A00` | `u` | 0 |
| `R_w_A00_A00` | `split_required` | `trig_range_overlap_same_interval_diagonal_or_endpoint` | `A00` | `A00` | `w` | 0 |
| `R_u_A00_A12` | `split_required` | `trig_range_overlap_requires_simple_root_or_complement_certificate` | `A00` | `A12` | `u` | 0 |
| `R_w_A00_A12` | `split_required` | `trig_range_overlap_requires_simple_root_or_complement_certificate` | `A00` | `A12` | `w` | 0 |
| `R_u_F01_A00` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F01` | `A00` | `u` | 0 |
| `R_w_F01_A00` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F01` | `A00` | `w` | 0 |
| `R_u_F01_F01` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F01` | `F01` | `u` | 0 |
| `R_w_F01_F01` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F01` | `F01` | `w` | 0 |
| `R_w_A01_A00` | `split_required` | `trig_range_overlap_requires_simple_root_or_complement_certificate` | `A01` | `A00` | `w` | 0 |
| `R_u_A01_F01` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `A01` | `F01` | `u` | 0 |
| `R_w_A01_F01` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `A01` | `F01` | `w` | 0 |
| `R_u_A01_A01` | `split_required` | `trig_range_overlap_same_interval_diagonal_or_endpoint` | `A01` | `A01` | `u` | 0 |
| `R_w_A01_A01` | `split_required` | `trig_range_overlap_same_interval_diagonal_or_endpoint` | `A01` | `A01` | `w` | 0 |
| `R_w_A01_A12` | `split_required` | `trig_range_overlap_requires_simple_root_or_complement_certificate` | `A01` | `A12` | `w` | 0 |
| `R_u_F02_A01` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F02` | `A01` | `u` | 0 |
| `R_w_F02_A01` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F02` | `A01` | `w` | 0 |
| `R_u_F02_F02` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F02` | `F02` | `u` | 0 |
| `R_w_F02_F02` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F02` | `F02` | `w` | 0 |
| `R_w_F02_A12` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F02` | `A12` | `w` | 0 |
| `R_w_A02_A00` | `split_required` | `trig_range_overlap_requires_simple_root_or_complement_certificate` | `A02` | `A00` | `w` | 0 |
| `R_w_A02_F01` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `A02` | `F01` | `w` | 0 |
| `R_w_A02_A01` | `split_required` | `trig_range_overlap_requires_simple_root_or_complement_certificate` | `A02` | `A01` | `w` | 0 |
| `R_u_A02_F02` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `A02` | `F02` | `u` | 0 |
| `R_w_A02_F02` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `A02` | `F02` | `w` | 0 |

## Accepted Empty Row Sample

| Row | Status | Method | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A00_F01` | `empty` | `proof_interval_trig_range_empty` | `A00` | `F01` | `u` | 6.077683471178867 |
| `R_w_A00_F01` | `empty` | `proof_interval_trig_range_empty` | `A00` | `F01` | `w` | 6.238303913688356 |
| `R_u_A00_A01` | `empty` | `proof_interval_trig_range_empty` | `A00` | `A01` | `u` | 5.580024151743614 |
| `R_w_A00_A01` | `empty` | `proof_interval_trig_range_empty` | `A00` | `A01` | `w` | 6.2352963513414 |
| `R_u_A00_F02` | `empty` | `proof_interval_trig_range_empty` | `A00` | `F02` | `u` | 5.479677920890898 |
| `R_w_A00_F02` | `empty` | `proof_interval_trig_range_empty` | `A00` | `F02` | `w` | 6.323947620182635 |
| `R_u_A00_A02` | `empty` | `proof_interval_trig_range_empty` | `A00` | `A02` | `u` | 5.030393737810818 |
| `R_w_A00_A02` | `empty` | `proof_interval_trig_range_empty` | `A00` | `A02` | `w` | 5.966554094798239 |
| `R_u_A00_F03` | `empty` | `proof_interval_trig_range_empty` | `A00` | `F03` | `u` | 4.934852220295766 |
| `R_w_A00_F03` | `empty` | `proof_interval_trig_range_empty` | `A00` | `F03` | `w` | 5.974360845177222 |
| `R_u_A00_A03` | `empty` | `proof_interval_trig_range_empty` | `A00` | `A03` | `u` | 3.173698540922813 |
| `R_w_A00_A03` | `empty` | `proof_interval_trig_range_empty` | `A00` | `A03` | `w` | 5.95691633788764 |
| `R_u_A00_F04` | `empty` | `proof_interval_trig_range_empty` | `A00` | `F04` | `u` | 3.074865168691651 |
| `R_w_A00_F04` | `empty` | `proof_interval_trig_range_empty` | `A00` | `F04` | `w` | 6.421879090568777 |
| `R_u_A00_A04` | `empty` | `proof_interval_trig_range_empty` | `A00` | `A04` | `u` | 2.246667473637264 |
| `R_w_A00_A04` | `empty` | `proof_interval_trig_range_empty` | `A00` | `A04` | `w` | 6.172963398212799 |
| `R_u_A00_F05` | `empty` | `proof_interval_trig_range_empty` | `A00` | `F05` | `u` | 2.147461992429527 |
| `R_w_A00_F05` | `empty` | `proof_interval_trig_range_empty` | `A00` | `F05` | `w` | 6.187340765842752 |
| `R_u_A00_A05` | `empty` | `proof_interval_trig_range_empty` | `A00` | `A05` | `u` | 1.09803725341431 |
| `R_w_A00_A05` | `empty` | `proof_interval_trig_range_empty` | `A00` | `A05` | `w` | 6.178366239076784 |
| `R_u_A00_F06` | `empty` | `proof_interval_trig_range_empty` | `A00` | `F06` | `u` | 0.997572618907691 |
| `R_w_A00_F06` | `empty` | `proof_interval_trig_range_empty` | `A00` | `F06` | `w` | 6.442426259669872 |
| `R_u_A00_A06` | `empty` | `proof_interval_trig_range_empty` | `A00` | `A06` | `u` | 0.595712990044322 |
| `R_w_A00_A06` | `empty` | `proof_interval_trig_range_empty` | `A00` | `A06` | `w` | 5.524042104899997 |

## Next Certificate Action

The next proof advance is no longer row-specific range-empty enclosure for the
rows accepted here. It is monotonicity and Jacobian floors for same-interval
and root-candidate rows, followed by higher-fold separator-layer certificates
for unresolved fold-layer rows.

## Capture Decision

Priority-only. This sidecar is a proof-interval backend and row-specific
range-empty certificate for the higher-fold packet, not a passed pre-ledger and not
reader-facing AAA prose. Keep it in the proof-program priority packet until a
full higher-fold preledger exists or the packet is rejected by a proof-grade
interval backend.
