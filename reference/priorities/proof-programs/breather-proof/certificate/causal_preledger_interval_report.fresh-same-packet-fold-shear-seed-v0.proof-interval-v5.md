# Fresh Proof-Interval Preledger v5 Report

## Verdict

The fresh packet `fresh-same-packet-fold-shear-seed-v0` still fail-closes before branch-chart
authorization. This v5 proof-interval sidecar certifies rows whose row-specific
rational trigonometric null-coordinate ranges are strictly disjoint,
same-interval regular rows whose rational derivative ranges prove strict
monotone diagonal exclusion, and simple-root subwindows whose oriented
source-inner range strictly covers the receiver range with strict source and
receiver monotonicity floors and strict causal memory margins. It then
partitions the receiver-side parent complements around those simple-root
subwindows and probes each complement by the same strict range-empty test. It
uses the conservative global envelope
$$
|X_\delta(\theta)| \le 1.374365144724375.
$$
as an audit ceiling, but row acceptance uses the subdivided trigonometric
enclosures recorded in the ledger rather than the v1 global $X_{\max}$ range.

It is a proof-grade subset for range-empty, monotone diagonal, and extracted
simple-root subwindows, plus a fail-closed parent-complement probe. It is
deliberately not a full pre-ledger. It does not accept periodic seam endpoint
rows, parent rows with unconsumed simple-root complements, or fold-layer rows.

| Quantity | Value |
| --- | ---: |
| Base rows | 162 |
| Empty rows accepted by this proof-interval-v5 sidecar | 124 |
| Range-empty rows accepted | 116 |
| Split-required rows | 38 |
| Certified diagonal exclusions | 8 |
| Certified full-parent simple-root rows | 0 |
| Certified simple-root subrows | 6 |
| Parent-complement strips probed | 10 |
| Parent-complement strict empty strips | 0 |
| Parent-complement split-required strips | 10 |
| Simple-root parent rows consumed by v5 | 0 |
| Accepted fold-layer rows | 0 |
| Minimum accepted range gap | 0.055914412432543 |
| Minimum accepted diagonal Jacobian floor | 0.001946149764116 |
| Minimum simple-root Jacobian floor | 0.001946149764116 |
| Minimum simple-root coverage gap | 0.001122267086258 |
| Minimum simple-root memory lower margin | 0.263009875015056 |
| Minimum simple-root horizon margin | 2.532580711213249 |
| Minimum parent-complement empty gap | none |

Because `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v5.json` records
`branch_chart_authorized=false`, no `branch_chart.json` may be constructed
from this packet.

The exact backend certificate is
`preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v5.json`; the engine audit is
`preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v5.json`.

## Backend Meaning

The generator wraps every JSON number token before parsing and converts each
decimal lexeme into a reduced `BigInt` rational. For a row subinterval
$[\theta_0,\theta_1]$, it forms the exact time range
$$
c_fT_{\mathrm{cyc}}[\theta_0+\ell,\theta_1+\ell]
$$
and encloses $X_\delta$ using a rational interval for $\pi$, exact
quarter-turn argument reduction, Taylor tails with rational remainder bounds,
and support-aware bump ranges. A range row is accepted as `empty` only when
the receiver and source null-coordinate hulls are strictly disjoint as rational
intervals. A same-interval regular row is accepted only when
$dY_\sigma/d\theta$ has one strict sign on the interval, with the row
Jacobian floor recorded as $|dY_\sigma/d\theta|/(c_fT_{\mathrm{cyc}})$.
A simple-root row or subrow is certified only when the source
$Y_\sigma$ derivative has one strict sign, an oriented source-inner range
strictly covers the receiver outward range, the receiver derivative has one
strict sign on the receiver block, and the inferred causal memory range lies
strictly inside $0<\tau<h$. The root sign is then inherited from the
null-coordinate identity: $x(t)-x(s)>0$ for $u$ rows and $x(t)-x(s)<0$ for
$w$ rows. For each certified simple-root subwindow, v5 forms the left and right
receiver complements against the full source interval and accepts a complement
only when the receiver and source null-coordinate ranges are strictly disjoint.
The v5 simple-root subwindows use the full parent source interval, so there are
no source-left or source-right complement strips in this packet.

The emitted $\pi$ interval is used only for trigonometric enclosure of
$X_\delta$. The packet period remains the exact decimal token
`314159265359/50000000000`.

## Split-Required Families

| Failure code | Rows |
| --- | ---: |
| `trig_range_overlap_fold_interval_diagonal_locked` | 4 |
| `trig_range_overlap_periodic_seam_endpoint_ownership_required` | 2 |
| `trig_range_overlap_same_interval_nonmonotone_diagonal_or_endpoint` | 2 |
| `trig_range_overlap_simple_root_receiver_not_strict_monotone` | 4 |
| `trig_range_overlap_simple_root_receiver_not_strictly_covered` | 2 |
| `trig_range_overlap_touches_active_fold_layer` | 16 |
| `trig_range_overlap_touches_inactive_fold_neighborhood` | 8 |

## Parent-Complement Blockers

| Failure code | Strips |
| --- | ---: |
| `parent_complement_null_ranges_overlap_requires_subdivision_endpoint_or_boundary_certificate` | 10 |

## First Split-Required Rows

| Row | Status | Blocker | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A0_A4` | `split_required` | `trig_range_overlap_periodic_seam_endpoint_ownership_required` | `A0` | `A4` | `u` | 0 |
| `R_w_A0_A4` | `split_required` | `trig_range_overlap_periodic_seam_endpoint_ownership_required` | `A0` | `A4` | `w` | 0 |
| `R_u_F1_A0` | `split_required` | `trig_range_overlap_touches_inactive_fold_neighborhood` | `F1` | `A0` | `u` | 0 |
| `R_w_F1_A0` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `F1` | `A0` | `w` | 0 |
| `R_u_F1_F1` | `split_required` | `trig_range_overlap_fold_interval_diagonal_locked` | `F1` | `F1` | `u` | 0 |
| `R_w_F1_F1` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `F1` | `F1` | `w` | 0 |
| `R_w_A1_A0` | `split_required` | `trig_range_overlap_simple_root_receiver_not_strictly_covered` | `A1` | `A0` | `w` | 0 |
| `R_u_A1_F1` | `split_required` | `trig_range_overlap_touches_inactive_fold_neighborhood` | `A1` | `F1` | `u` | 0 |
| `R_w_A1_F1` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `A1` | `F1` | `w` | 0 |
| `R_w_F2_A0` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `F2` | `A0` | `w` | 0 |
| `R_u_F2_A1` | `split_required` | `trig_range_overlap_touches_inactive_fold_neighborhood` | `F2` | `A1` | `u` | 0 |
| `R_w_F2_A1` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `F2` | `A1` | `w` | 0 |
| `R_u_F2_F2` | `split_required` | `trig_range_overlap_fold_interval_diagonal_locked` | `F2` | `F2` | `u` | 0 |
| `R_w_F2_F2` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `F2` | `F2` | `w` | 0 |
| `R_w_A2_A0` | `split_required` | `trig_range_overlap_simple_root_receiver_not_strict_monotone` | `A2` | `A0` | `w` | 0 |
| `R_w_A2_F1` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `A2` | `F1` | `w` | 0 |
| `R_w_A2_A1` | `split_required` | `trig_range_overlap_simple_root_receiver_not_strict_monotone` | `A2` | `A1` | `w` | 0 |
| `R_u_A2_F2` | `split_required` | `trig_range_overlap_touches_inactive_fold_neighborhood` | `A2` | `F2` | `u` | 0 |
| `R_w_A2_F2` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `A2` | `F2` | `w` | 0 |
| `R_w_A2_A2` | `split_required` | `trig_range_overlap_same_interval_nonmonotone_diagonal_or_endpoint` | `A2` | `A2` | `w` | 0 |
| `R_u_F3_A2` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `F3` | `A2` | `u` | 0 |
| `R_w_F3_A2` | `split_required` | `trig_range_overlap_touches_inactive_fold_neighborhood` | `F3` | `A2` | `w` | 0 |
| `R_u_F3_F3` | `split_required` | `trig_range_overlap_touches_active_fold_layer` | `F3` | `F3` | `u` | 0 |
| `R_w_F3_F3` | `split_required` | `trig_range_overlap_fold_interval_diagonal_locked` | `F3` | `F3` | `w` | 0 |

## Accepted Simple-Root Rows

| Subrow | Parent | Receiver | Source | Ledger | Coverage gap | Jacobian floor | Memory depth |
| --- | --- | --- | --- | --- | ---: | ---: | --- |
| `S_w_A1_A0_v4_1` | `R_w_A1_A0` | `A1` | `A0` | `w` | 0.001721822928833 | 0.009421923711147 | `0.263009875015056..2.010093913107699` |
| `S_w_A2_A0_v4_2` | `R_w_A2_A0` | `A2` | `A0` | `w` | 0.043026210068286 | 0.009421923711147 | `1.656270700686398..2.750692884427899` |
| `S_w_A2_A1_v4_3` | `R_w_A2_A1` | `A2` | `A1` | `w` | 0.005280315036193 | 0.017320819823163 | `0.4753629083017..1.870521556232798` |
| `S_u_A3_A2_v4_4` | `R_u_A3_A2` | `A3` | `A2` | `u` | 0.001721822928833 | 0.001946149764116 | `0.263009875015056..2.9845130209105` |
| `S_u_A4_A2_v4_5` | `R_u_A4_A2` | `A4` | `A2` | `u` | 0.020073082906124 | 0.001946149764116 | `1.626785432984623..3.75060459596675` |
| `S_u_A4_A3_v4_6` | `R_u_A4_A3` | `A4` | `A3` | `u` | 0.001122267086258 | 0.017320819823163 | `0.461585603867875..1.896014159968848` |

## Parent-Complement Summary

| Parent | Simple-root subrow | Complement strips | Empty strips | Split-required strips | Status |
| --- | --- | ---: | ---: | ---: | --- |
| `R_w_A1_A0` | `S_w_A1_A0_v4_1` | 1 | 0 | 1 | `parent_complements_split_required` |
| `R_w_A2_A0` | `S_w_A2_A0_v4_2` | 2 | 0 | 2 | `parent_complements_split_required` |
| `R_w_A2_A1` | `S_w_A2_A1_v4_3` | 2 | 0 | 2 | `parent_complements_split_required` |
| `R_u_A3_A2` | `S_u_A3_A2_v4_4` | 1 | 0 | 1 | `parent_complements_split_required` |
| `R_u_A4_A2` | `S_u_A4_A2_v4_5` | 2 | 0 | 2 | `parent_complements_split_required` |
| `R_u_A4_A3` | `S_u_A4_A3_v4_6` | 2 | 0 | 2 | `parent_complements_split_required` |

## Parent-Complement Strips

| Strip | Parent | Side | Status | Range relation | Gap | Method or blocker | Receiver theta |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| `C_w_A1_A0_left_v5_1` | `R_w_A1_A0` | `left` | `split_required` | `overlap` | 0 | `parent_complement_null_ranges_overlap_requires_subdivision_endpoint_or_boundary_certificate` | `0.14008361765..0.156942939340625` |
| `C_w_A2_A0_left_v5_2` | `R_w_A2_A0` | `left` | `split_required` | `overlap` | 0 | `parent_complement_null_ranges_overlap_requires_subdivision_endpoint_or_boundary_certificate` | `0.34491638235..0.3786872867625` |
| `C_w_A2_A0_right_v5_3` | `R_w_A2_A0` | `right` | `split_required` | `overlap` | 0 | `parent_complement_null_ranges_overlap_requires_subdivision_endpoint_or_boundary_certificate` | `0.437786369484375..0.61508361765` |
| `C_w_A2_A1_left_v5_4` | `R_w_A2_A1` | `left` | `split_required` | `overlap` | 0 | `parent_complement_null_ranges_overlap_requires_subdivision_endpoint_or_boundary_certificate` | `0.34491638235..0.39557273896875` |
| `C_w_A2_A1_right_v5_5` | `R_w_A2_A1` | `right` | `split_required` | `overlap` | 0 | `parent_complement_null_ranges_overlap_requires_subdivision_endpoint_or_boundary_certificate` | `0.437786369484375..0.61508361765` |
| `C_u_A3_A2_left_v5_6` | `R_u_A3_A2` | `left` | `split_required` | `overlap` | 0 | `parent_complement_null_ranges_overlap_requires_subdivision_endpoint_or_boundary_certificate` | `0.64008361765..0.656942939340625` |
| `C_u_A4_A2_left_v5_7` | `R_u_A4_A2` | `left` | `split_required` | `overlap` | 0 | `parent_complement_null_ranges_overlap_requires_subdivision_endpoint_or_boundary_certificate` | `0.84491638235..0.873994560659375` |
| `C_u_A4_A2_right_v5_8` | `R_u_A4_A2` | `right` | `split_required` | `overlap` | 0 | `parent_complement_null_ranges_overlap_requires_subdivision_endpoint_or_boundary_certificate` | `0.94184364338125..1` |
| `C_u_A4_A3_left_v5_9` | `R_u_A4_A3` | `left` | `split_required` | `overlap` | 0 | `parent_complement_null_ranges_overlap_requires_subdivision_endpoint_or_boundary_certificate` | `0.84491638235..0.893380012865625` |
| `C_u_A4_A3_right_v5_10` | `R_u_A4_A3` | `right` | `split_required` | `overlap` | 0 | `parent_complement_null_ranges_overlap_requires_subdivision_endpoint_or_boundary_certificate` | `0.94184364338125..1` |

## Accepted Empty Row Sample

| Row | Status | Method | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A0_A0` | `empty` | `proof_interval_monotone_diagonal_exclusion` | `A0` | `A0` | `u` | 0 |
| `R_w_A0_A0` | `empty` | `proof_interval_monotone_diagonal_exclusion` | `A0` | `A0` | `w` | 0 |
| `R_u_A0_F1` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F1` | `u` | 4.82539086887821 |
| `R_w_A0_F1` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F1` | `w` | 5.972010162913826 |
| `R_u_A0_A1` | `empty` | `proof_interval_trig_range_empty` | `A0` | `A1` | `u` | 2.356406447360944 |
| `R_w_A0_A1` | `empty` | `proof_interval_trig_range_empty` | `A0` | `A1` | `w` | 5.960304612229138 |
| `R_u_A0_F2` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F2` | `u` | 2.03996594342155 |
| `R_w_A0_F2` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F2` | `w` | 6.183947986206514 |
| `R_u_A0_A2` | `empty` | `proof_interval_trig_range_empty` | `A0` | `A2` | `u` | 0.318898393147811 |
| `R_w_A0_A2` | `empty` | `proof_interval_trig_range_empty` | `A0` | `A2` | `w` | 4.48941237305853 |
| `R_u_A0_F3` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F3` | `u` | 0.341931545432752 |
| `R_w_A0_F3` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F3` | `w` | 4.172284179179284 |
| `R_u_A0_A3` | `empty` | `proof_interval_trig_range_empty` | `A0` | `A3` | `u` | 0.330225994748064 |
| `R_w_A0_A3` | `empty` | `proof_interval_trig_range_empty` | `A0` | `A3` | `w` | 1.703299757662019 |
| `R_u_A0_F4` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F4` | `u` | 0.553869368725439 |
| `R_w_A0_F4` | `empty` | `proof_interval_trig_range_empty` | `A0` | `F4` | `w` | 1.386859253722624 |
| `R_u_F1_A1` | `empty` | `proof_interval_trig_range_empty` | `F1` | `A1` | `u` | 3.497042069915517 |
| `R_w_F1_A1` | `empty` | `proof_interval_trig_range_empty` | `F1` | `A1` | `w` | 6.263053985355588 |
| `R_u_F1_F2` | `empty` | `proof_interval_trig_range_empty` | `F1` | `F2` | `u` | 3.180601565976122 |
| `R_w_F1_F2` | `empty` | `proof_interval_trig_range_empty` | `F1` | `F2` | `w` | 6.486697359332964 |
| `R_u_F1_A2` | `empty` | `proof_interval_trig_range_empty` | `F1` | `A2` | `u` | 1.459534015702383 |
| `R_w_F1_A2` | `empty` | `proof_interval_trig_range_empty` | `F1` | `A2` | `w` | 4.79216174618498 |
| `R_u_F1_F3` | `empty` | `proof_interval_trig_range_empty` | `F1` | `F3` | `u` | 1.482567167987324 |
| `R_w_F1_F3` | `empty` | `proof_interval_trig_range_empty` | `F1` | `F3` | `w` | 4.475033552305734 |

## Next Certificate Action

The next proof advance is no longer range-empty enclosure, regular
same-interval monotone diagonal exclusion, or locating the six simple-root
subwindows. It is endpoint/topology ownership plus accepted regular-boundary or
fold-family coverage for the parent-complement collars, endpoint ownership for
the periodic seam, and same-packet fold-layer impulse fields for active fold
rows.

## Capture Decision

Priority-only. This sidecar is a proof-interval backend and partial
range-empty/monotone-diagonal/simple-root/parent-complement-probe certificate
for the fresh packet, not a passed pre-ledger and not reader-facing AAA prose.
Keep it in the proof-program priority packet until a full same-packet
pre-ledger exists or the packet is rejected by a proof-grade interval backend.
