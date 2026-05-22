# Fresh Null-Coordinate Preledger Report

## Verdict

The fresh packet `fresh-same-packet-fold-shear-seed-v0` fail-closes before branch-chart authorization.
This run is a binary64 outward-padded preledger attempt, not an MPFR/Arb-style
formal interval certificate. It accepts only range-empty or monotone
diagonal-empty rows under that conservative engine and leaves every overlap,
simple-root candidate, and fold-layer candidate unpromoted.

| Quantity | Value |
| --- | ---: |
| Base rows | 162 |
| Empty rows accepted by this pass | 128 |
| Range-empty rows accepted by this pass | 116 |
| Monotone diagonal exclusions accepted by this pass | 12 |
| Certified simple-root subrows | 0 |
| Accepted fold-layer rows | 0 |
| Split-required rows | 34 |

The minimum range-empty gap accepted by this pass is
$$
\gamma_{\mathrm{empty}}=0.0813286869617.
$$
Because `causal_ledger.fresh-same-packet-fold-shear-seed-v0.json` records
`branch_chart_authorized=false`, no `branch_chart.json` may be constructed
from this packet.

The engine audit is recorded in `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.json`.

## Interval Method

Each null-coordinate range is enclosed by subdividing the theta interval,
evaluating the midpoint, adding the analytic global Lipschitz radius for the
subinterval, and padding the binary64 endpoints outward. A row is accepted as
`empty` only when the padded receiver and source ranges are strictly disjoint.
Same-interval rows are accepted only when the receiver ledger coordinate is
strictly monotone on the interval, so the equality can occur only on the
excluded diagonal.

This method is deliberately narrower than the full certificate target. It does
not extract simple-root subrows, does not certify fold-layer impulses, does not
parse JSON decimals as exact rationals, and does not replace a proof-grade
interval backend for trigonometric enclosures.

## First Split-Required Rows

| Row | Status | Blocker | Receiver | Source | Ledger | Padded range gap |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A0_A4` | `split_required` | `range_overlap_requires_level_split` | `A0` | `A4` | `u` | 0 |
| `R_w_A0_A4` | `split_required` | `range_overlap_requires_level_split` | `A0` | `A4` | `w` | 0 |
| `R_u_F1_A0` | `split_required` | `range_overlap_requires_level_split` | `F1` | `A0` | `u` | 0 |
| `R_w_F1_A0` | `split_required` | `fold_layer_interval_not_evaluated` | `F1` | `A0` | `w` | 0 |
| `R_w_F1_F1` | `split_required` | `fold_layer_interval_not_evaluated` | `F1` | `F1` | `w` | 0 |
| `R_w_A1_A0` | `split_required` | `range_overlap_requires_level_split` | `A1` | `A0` | `w` | 0 |
| `R_u_A1_F1` | `split_required` | `range_overlap_requires_level_split` | `A1` | `F1` | `u` | 0 |
| `R_w_A1_F1` | `split_required` | `fold_layer_interval_not_evaluated` | `A1` | `F1` | `w` | 0 |
| `R_w_F2_A0` | `split_required` | `fold_layer_interval_not_evaluated` | `F2` | `A0` | `w` | 0 |
| `R_u_F2_A1` | `split_required` | `range_overlap_requires_level_split` | `F2` | `A1` | `u` | 0 |
| `R_w_F2_A1` | `split_required` | `fold_layer_interval_not_evaluated` | `F2` | `A1` | `w` | 0 |
| `R_w_F2_F2` | `split_required` | `fold_layer_interval_not_evaluated` | `F2` | `F2` | `w` | 0 |
| `R_w_A2_A0` | `split_required` | `range_overlap_requires_level_split` | `A2` | `A0` | `w` | 0 |
| `R_w_A2_F1` | `split_required` | `fold_layer_interval_not_evaluated` | `A2` | `F1` | `w` | 0 |
| `R_w_A2_A1` | `split_required` | `range_overlap_requires_level_split` | `A2` | `A1` | `w` | 0 |
| `R_u_A2_F2` | `split_required` | `range_overlap_requires_level_split` | `A2` | `F2` | `u` | 0 |
| `R_w_A2_F2` | `split_required` | `fold_layer_interval_not_evaluated` | `A2` | `F2` | `w` | 0 |
| `R_w_A2_A2` | `split_required` | `diagonal_exclusion_not_monotone_certified` | `A2` | `A2` | `w` | 0 |
| `R_u_F3_A2` | `split_required` | `fold_layer_interval_not_evaluated` | `F3` | `A2` | `u` | 0 |
| `R_w_F3_A2` | `split_required` | `range_overlap_requires_level_split` | `F3` | `A2` | `w` | 0 |
| `R_u_F3_F3` | `split_required` | `fold_layer_interval_not_evaluated` | `F3` | `F3` | `u` | 0 |
| `R_u_A3_A2` | `split_required` | `range_overlap_requires_level_split` | `A3` | `A2` | `u` | 0 |
| `R_u_A3_F3` | `split_required` | `fold_layer_interval_not_evaluated` | `A3` | `F3` | `u` | 0 |
| `R_w_A3_F3` | `split_required` | `range_overlap_requires_level_split` | `A3` | `F3` | `w` | 0 |

## Accepted Empty Row Sample

| Row | Status | Method | Receiver | Source | Ledger | Padded range gap |
| --- | --- | --- | --- | --- | --- | ---: |
| `R_u_A0_A0` | `empty` | `monotone_diagonal_exclusion` | `A0` | `A0` | `u` | 0 |
| `R_w_A0_A0` | `empty` | `monotone_diagonal_exclusion` | `A0` | `A0` | `w` | 0 |
| `R_u_A0_F1` | `empty` | `outward_padded_lipschitz_range_empty` | `A0` | `F1` | `u` | 4.8246079151251 |
| `R_w_A0_F1` | `empty` | `outward_padded_lipschitz_range_empty` | `A0` | `F1` | `w` | 5.97298405883689 |
| `R_u_A0_A1` | `empty` | `outward_padded_lipschitz_range_empty` | `A0` | `A1` | `u` | 2.35617699911998 |
| `R_w_A0_A1` | `empty` | `outward_padded_lipschitz_range_empty` | `A0` | `A1` | `w` | 5.97653453048162 |
| `R_u_A0_F2` | `empty` | `outward_padded_lipschitz_range_empty` | `A0` | `F2` | `u` | 2.03913867880851 |
| `R_w_A0_F2` | `empty` | `outward_padded_lipschitz_range_empty` | `A0` | `F2` | `w` | 6.18503125857377 |
| `R_u_A0_A2` | `empty` | `outward_padded_lipschitz_range_empty` | `A0` | `A2` | `u` | 0.34251728581191 |
| `R_w_A0_A2` | `empty` | `outward_padded_lipschitz_range_empty` | `A0` | `A2` | `w` | 4.48946222832825 |
| `R_u_A0_F3` | `empty` | `outward_padded_lipschitz_range_empty` | `A0` | `F3` | `u` | 0.34199717497168 |
| `R_w_A0_F3` | `empty` | `outward_padded_lipschitz_range_empty` | `A0` | `F3` | `w` | 4.1724094918105 |
| `R_u_A0_A3` | `empty` | `outward_padded_lipschitz_range_empty` | `A0` | `A3` | `u` | 0.3455476466164 |
| `R_w_A0_A3` | `empty` | `outward_padded_lipschitz_range_empty` | `A0` | `A3` | `w` | 1.70397857580538 |
| `R_u_A0_F4` | `empty` | `outward_padded_lipschitz_range_empty` | `A0` | `F4` | `u` | 0.55404437470855 |
| `R_w_A0_F4` | `empty` | `outward_padded_lipschitz_range_empty` | `A0` | `F4` | `w` | 1.3869402554939 |
| `R_u_F1_F1` | `empty` | `monotone_diagonal_exclusion` | `F1` | `F1` | `u` | 0 |
| `R_u_F1_A1` | `empty` | `outward_padded_lipschitz_range_empty` | `F1` | `A1` | `u` | 3.49670189008895 |
| `R_w_F1_A1` | `empty` | `outward_padded_lipschitz_range_empty` | `F1` | `A1` | `w` | 6.27928475521594 |
| `R_u_F1_F2` | `empty` | `outward_padded_lipschitz_range_empty` | `F1` | `F2` | `u` | 3.17966356977748 |
| `R_w_F1_F2` | `empty` | `outward_padded_lipschitz_range_empty` | `F1` | `F2` | `w` | 6.48778148330809 |
| `R_u_F1_A2` | `empty` | `outward_padded_lipschitz_range_empty` | `F1` | `A2` | `u` | 1.48304217678088 |
| `R_w_F1_A2` | `empty` | `outward_padded_lipschitz_range_empty` | `F1` | `A2` | `w` | 4.79221245306257 |
| `R_u_F1_F3` | `empty` | `outward_padded_lipschitz_range_empty` | `F1` | `F3` | `u` | 1.48252206594065 |

## Next Certificate Action

The next proof advance is not branch-chart construction. It is a stronger
same-packet preledger pass that either:

1. extracts interval-certified simple-root subrows from the remaining overlap
   rows with positive Jacobian, memory-depth, coverage, and sign margins; or
2. certifies same-packet fold-layer impulse fields and consumes every
   fold-adjacent parent complement by an accepted alternative.

## Capture Decision

Priority-only. This is a priority-side fail-closed preledger attempt and routing
artifact. It blocks branch-chart work, but it does not promote row acceptances as
formal MPFR/Arb interval-certificate results. It should not be promoted into
`content/markdown/aaa` unless a later proof-program chapter needs a worked
account of the fresh preledger failure mode.
