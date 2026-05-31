# Higher-Fold Proof-Interval Preledger v6 Report

## Verdict

The higher-fold packet `fresh-v10-higher-fold-12-root-rebuild-v0` still fail-closes before branch-chart
authorization. This v6 proof-interval sidecar inherits the v5 accepted row
surface, then recursively refines only failed receiver-cover cells to separate
coarse 32-cell hull artifacts from terminal source-cover defects. It certifies
rows whose
row-specific rational trigonometric null-coordinate ranges are strictly
disjoint, and it additionally certifies same-regular-interval diagonal rows
using the higher-fold root-count complement certificate. It also certifies
regular simple-root rows whose source null-coordinate range strictly covers
the receiver range with strict memory margins. New in v6, it adaptively audits
the receiver-cover leaves for regular residual parent-complement rows, records
signed source-cover margins on every terminal miss, and keeps those parents
unconsumed without endpoint ownership/no-double-counting.
It uses the
conservative global envelope
$$
|X_{\mathrm{seed}}(\theta)| \le 2.274365144724375.
$$
as an audit ceiling, but row acceptance uses the subdivided trigonometric
enclosures recorded in the ledger rather than the v1 global $X_{\max}$ range.

It is a proof-grade subset for range-empty, root-complement monotone diagonal,
regular simple-root rows, and adaptive receiver-cover leaves, but it is deliberately
not a full preledger. It consumes no receiver-cover parent rows and accepts no
fold-layer rows.

| Quantity | Value |
| --- | ---: |
| Base rows | 1250 |
| Empty rows accepted by this proof-interval-v6 sidecar | 1088 |
| Range-empty rows accepted by this sidecar | 1062 |
| Empty rows accepted by proof-interval-v5 | 1088 |
| Simple-root rows accepted by this sidecar | 0 |
| Split-required rows | 162 |
| Certified diagonal exclusions | 26 |
| Certified simple-root subrows | 42 |
| Receiver-cover audit parent rows | 42 |
| Complete receiver-cover parent rows | 0 |
| Receiver-cover base grid size | 32 |
| Receiver-cover terminal grid size | 128 |
| Receiver-cover max refinement depth | 2 |
| Receiver-cover certified leaves | 622 |
| Receiver-cover terminal missing leaves | 3024 |
| Receiver-cover coarse cells resolved by refinement | 0 |
| Receiver-cover coarse cells still missing after refinement | 773 |
| Receiver-cover structural terminal misses | 3024 |
| Receiver-cover indeterminate terminal misses | 0 |
| Receiver-cover certified cells in proof-interval-v5 | 571 |
| Receiver-cover missing cells in proof-interval-v5 | 773 |
| Accepted fold-layer rows | 0 |
| Minimum accepted range gap | 0.01541646634368 |
| Minimum accepted diagonal Jacobian floor | 0.023248692491025 |
| Minimum simple-root Jacobian floor | 0.023248692491025 |
| Minimum simple-root source-coverage gap | 0.000028264068189 |
| Minimum simple-root memory-depth margin | 0.05026548245744 |
| Minimum simple-root horizon margin | 2.933358374352118 |

Because `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` records
`branch_chart_authorized=false`, no `branch_chart.json` may be constructed
from this packet.

The exact backend certificate is
`preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`; the engine audit is
`preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`.

## Backend Meaning

The generator wraps every JSON number token before parsing and converts each
decimal lexeme into a reduced `BigInt` rational. For a row subinterval
$[\theta_0,\theta_1]$, it forms the exact time range
$$
c_fT_{\mathrm{cyc}}[\theta_0+\ell,\theta_1+\ell]
$$
and encloses $X_{\mathrm{seed}}$ using a rational interval for $\pi$, exact
quarter-turn argument reduction, Taylor tails with rational remainder bounds,
and support-aware bump ranges. A range-empty row is accepted only when the
receiver and source null-coordinate hulls are strictly disjoint as rational
intervals.

The emitted $\pi$ interval is used only for trigonometric enclosure of
$X_{\mathrm{seed}}$. The packet period remains the exact decimal token
`314159265359/50000000000`.

For a same-regular-interval row $R_{\sigma,A_i,A_i}$ with zero lift, the row
is accepted only when the matching root-count complement interval certifies a
strict sign for the appropriate field-speed residual: $\dot X(\theta)-1$ for
`u` rows and $\dot X(\theta)+1$ for `w` rows. Since
$c_f=1$, the residual margin gives the normalized Jacobian floor, and
$T_{\mathrm{cyc}}$ times that floor gives the phase-derivative floor.

For a regular simple-root row with zero lift, both source and receiver
intervals must lie inside certified root-count complements with strict
field-speed residual signs. The source endpoint ranges are then oriented by
the certified source monotonicity. The row is accepted as `simple_root` only
when that oriented source-inner range strictly covers the receiver range and
the memory-depth interval lies strictly inside $0<\tau<h$.

For a v6 receiver-cover audit, the generator first splits each eligible
residual receiver interval into 32
exact rational cells. Every failed base cell is then recursively bisected to
depth 2, producing a
terminal grid of 128 leaves.
Each leaf is certified by the same simple-root rule against the full monotone
source interval. Terminal misses record signed source-cover margins and are
classified as structural candidates, endpoint/refinement-limit indeterminate
misses, or monotonicity-certificate absences. A parent row is still not consumed
unless the adaptive leaves form a complete cover and a separate endpoint
ownership/no-double-counting certificate is present.

## Split-Required Families

| Failure code | Rows |
| --- | ---: |
| `trig_range_overlap_periodic_seam_endpoint_ownership_required` | 8 |
| `trig_range_overlap_simple_root_receiver_not_strictly_covered` | 42 |
| `trig_range_overlap_touches_fold_layer_candidate` | 112 |

## First Split-Required Rows

| Row | Status | Blocker | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A00_A12` | `split_required` | `trig_range_overlap_periodic_seam_endpoint_ownership_required` | `A00` | `A12` | `u` | 0 |
| `R_w_A00_A12` | `split_required` | `trig_range_overlap_periodic_seam_endpoint_ownership_required` | `A00` | `A12` | `w` | 0 |
| `R_u_F01_A00` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F01` | `A00` | `u` | 0 |
| `R_w_F01_A00` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F01` | `A00` | `w` | 0 |
| `R_u_F01_F01` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F01` | `F01` | `u` | 0 |
| `R_w_F01_F01` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F01` | `F01` | `w` | 0 |
| `R_w_A01_A00` | `split_required` | `trig_range_overlap_simple_root_receiver_not_strictly_covered` | `A01` | `A00` | `w` | 0 |
| `R_u_A01_F01` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `A01` | `F01` | `u` | 0 |
| `R_w_A01_F01` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `A01` | `F01` | `w` | 0 |
| `R_w_A01_A12` | `split_required` | `trig_range_overlap_periodic_seam_endpoint_ownership_required` | `A01` | `A12` | `w` | 0 |
| `R_u_F02_A01` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F02` | `A01` | `u` | 0 |
| `R_w_F02_A01` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F02` | `A01` | `w` | 0 |
| `R_u_F02_F02` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F02` | `F02` | `u` | 0 |
| `R_w_F02_F02` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F02` | `F02` | `w` | 0 |
| `R_w_F02_A12` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F02` | `A12` | `w` | 0 |
| `R_w_A02_A00` | `split_required` | `trig_range_overlap_simple_root_receiver_not_strictly_covered` | `A02` | `A00` | `w` | 0 |
| `R_w_A02_F01` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `A02` | `F01` | `w` | 0 |
| `R_w_A02_A01` | `split_required` | `trig_range_overlap_simple_root_receiver_not_strictly_covered` | `A02` | `A01` | `w` | 0 |
| `R_u_A02_F02` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `A02` | `F02` | `u` | 0 |
| `R_w_A02_F02` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `A02` | `F02` | `w` | 0 |
| `R_w_A02_A12` | `split_required` | `trig_range_overlap_periodic_seam_endpoint_ownership_required` | `A02` | `A12` | `w` | 0 |
| `R_u_F03_A02` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F03` | `A02` | `u` | 0 |
| `R_w_F03_A02` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F03` | `A02` | `w` | 0 |
| `R_u_F03_F03` | `split_required` | `trig_range_overlap_touches_fold_layer_candidate` | `F03` | `F03` | `u` | 0 |

## Accepted Empty Row Sample

| Row | Status | Method | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A00_A00` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A00` | `A00` | `u` | 0 |
| `R_w_A00_A00` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A00` | `A00` | `w` | 0 |
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

## Certified Diagonal Row Sample

| Row | Status | Method | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A00_A00` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A00` | `A00` | `u` | 0 |
| `R_w_A00_A00` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A00` | `A00` | `w` | 0 |
| `R_u_A01_A01` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A01` | `A01` | `u` | 0 |
| `R_w_A01_A01` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A01` | `A01` | `w` | 0 |
| `R_u_A02_A02` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A02` | `A02` | `u` | 0 |
| `R_w_A02_A02` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A02` | `A02` | `w` | 0 |
| `R_u_A03_A03` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A03` | `A03` | `u` | 0 |
| `R_w_A03_A03` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A03` | `A03` | `w` | 0 |
| `R_u_A04_A04` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A04` | `A04` | `u` | 0 |
| `R_w_A04_A04` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A04` | `A04` | `w` | 0 |
| `R_u_A05_A05` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A05` | `A05` | `u` | 0 |
| `R_w_A05_A05` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A05` | `A05` | `w` | 0 |
| `R_u_A06_A06` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A06` | `A06` | `u` | 0 |
| `R_w_A06_A06` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A06` | `A06` | `w` | 0 |
| `R_u_A07_A07` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A07` | `A07` | `u` | 0 |
| `R_w_A07_A07` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A07` | `A07` | `w` | 0 |
| `R_u_A08_A08` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A08` | `A08` | `u` | 0 |
| `R_w_A08_A08` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A08` | `A08` | `w` | 0 |
| `R_u_A09_A09` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A09` | `A09` | `u` | 0 |
| `R_w_A09_A09` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A09` | `A09` | `w` | 0 |
| `R_u_A10_A10` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A10` | `A10` | `u` | 0 |
| `R_w_A10_A10` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A10` | `A10` | `w` | 0 |
| `R_u_A11_A11` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A11` | `A11` | `u` | 0 |
| `R_w_A11_A11` | `empty` | `proof_interval_root_complement_monotone_diagonal_exclusion` | `A11` | `A11` | `w` | 0 |

## Certified Simple-Root Row Sample

| Row | Status | Method | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |


## Receiver-Cover Audit Sample

| Parent row | Receiver | Source | Ledger | Certified leaves | Missing leaves | Resolved coarse cells | Structural misses | Indeterminate misses | Parent blocker |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| `R_w_A01_A00` | `A01` | `A00` | `w` | 17/128 | 68 | 0 | 68 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A02_A00` | `A02` | `A00` | `w` | 4/128 | 115 | 0 | 115 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A02_A01` | `A02` | `A01` | `w` | 11/128 | 87 | 0 | 87 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A03_A00` | `A03` | `A00` | `w` | 3/128 | 121 | 0 | 121 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A03_A01` | `A03` | `A01` | `w` | 5/128 | 111 | 0 | 111 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A03_A02` | `A03` | `A02` | `w` | 22/128 | 43 | 0 | 43 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A04_A00` | `A04` | `A00` | `w` | 4/128 | 112 | 0 | 112 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A04_A01` | `A04` | `A01` | `w` | 8/128 | 96 | 0 | 96 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A04_A02` | `A04` | `A02` | `w` | 18/128 | 56 | 0 | 56 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A04_A03` | `A04` | `A03` | `w` | 33/128 | 1 | 0 | 1 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A05_A00` | `A05` | `A00` | `w` | 5/128 | 113 | 0 | 113 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A05_A01` | `A05` | `A01` | `w` | 9/128 | 97 | 0 | 97 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A05_A02` | `A05` | `A02` | `w` | 17/128 | 60 | 0 | 60 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A05_A03` | `A05` | `A03` | `w` | 28/128 | 19 | 0 | 19 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A05_A04` | `A05` | `A04` | `w` | 28/128 | 19 | 0 | 19 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A06_A00` | `A06` | `A00` | `w` | 2/128 | 123 | 0 | 123 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A06_A01` | `A06` | `A01` | `w` | 4/128 | 118 | 0 | 118 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A06_A02` | `A06` | `A02` | `w` | 11/128 | 90 | 0 | 90 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A06_A03` | `A06` | `A03` | `w` | 16/128 | 70 | 0 | 70 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A06_A04` | `A06` | `A04` | `w` | 11/128 | 92 | 0 | 92 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_w_A06_A05` | `A06` | `A05` | `w` | 13/128 | 81 | 0 | 81 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_u_A07_A06` | `A07` | `A06` | `u` | 33/128 | 1 | 0 | 1 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_u_A08_A06` | `A08` | `A06` | `u` | 11/128 | 87 | 0 | 87 | 0 | `adaptive_receiver_cover_incomplete` |
| `R_u_A08_A07` | `A08` | `A07` | `u` | 11/128 | 87 | 0 | 87 | 0 | `adaptive_receiver_cover_incomplete` |

## Next Certificate Action

The next proof advance for regular rows is endpoint ownership/no-double-counting
for any complete receiver covers and periodic endpoint/complement closure for
the 8 lift rows. Fold-layer row promotion is a separate higher-fold
separator-layer certificate requiring finite fold impulse data.

## Capture Decision

Priority-only. This sidecar is a proof-interval backend, row-specific
range-empty certificate, and root-complement monotone diagonal certificate for
the higher-fold packet, plus a simple-root receiver-cover audit for residual
regular rows. It is not a passed preledger and not reader-facing
$\mathbb{A}\mathbb{A}\mathbb{A}$ prose. Keep it in the proof-program priority packet until a
full higher-fold preledger exists or the packet is rejected by a proof-grade
interval backend.
