# Causal Pre-Ledger Interval Report

## Status

This report records the refined null-coordinate pre-ledger attempt for packet `seed-doubled-four-arc-cosine-template-v0`. It now includes two additional certificate artifacts:

- `diagonal_exclusion_subledger.json`
- `fold_layer_atlas.json`

The diagonal-exclusion subledger closes the monotone same-interval rows, the periodically identified endpoint contact, and eight adjacent interval endpoint contacts. The fold-layer atlas supplies the kinematic normal-form constants, exit floors, and itinerary parity rows for $\Sigma_1$ through $\Sigma_4$, but it does not supply the dual-mollified fold impulse ceiling. Therefore the ledger remains rejected before branch-chart certification.

The ledger status is `preledger_rejected_fold_impulse_and_fold_adjacent_parent_leftovers_remaining`.

## Refined Domain

The range pass uses
$$
u(t)=c_f t-x(t),
\qquad
w(t)=c_f t+x(t),
\qquad
c_f=1,
$$
with
$$
x(t)=1.25\cos t,
\qquad
T_{\mathrm{cyc}}=2\pi.
$$

The refined mesh splits the phase line into regular intervals $A_0,\ldots,A_4$ and separator-layer candidates $F_1,\ldots,F_4$. The separator layers are
$$
[\theta_{\Sigma_k}-0.0125,\theta_{\Sigma_k}+0.0125],
\qquad k=1,\ldots,4.
$$
The $w$ ledger has zero derivative at $\Sigma_1$ and $\Sigma_2$; the $u$ ledger has zero derivative at $\Sigma_3$ and $\Sigma_4$.

## Result Summary

| Quantity | Value |
| --- | ---: |
| Refined base rows | 162 |
| Certified range-empty base rows | 116 |
| Certified diagonal-exclusion empty rows | 24 |
| Certified simple-root subrows | 6 |
| Accepted fold-layer rows | 0 |
| Split-required base rows | 22 |
| Minimum range-empty gap $\gamma_{\mathrm{empty}}$ | 0.208212341788 |
| Minimum simple-root derivative floor $\nu_{\mathrm{simple}}$ | 0.055761655527 |
| Simple-root coverage gap $\gamma_{\mathrm{cov}}$ | 0.005 |
| Minimum memory-depth margin $\gamma_\tau$ | 0.278626695826 |
| Minimum horizon margin $\gamma_h$ | 4.197933629682 |
| Minimum sign margin $\gamma_{\mathrm{sign}}$ | 0.278626695826 |
| Minimum fold curvature floor $\alpha_{\Sigma}$ | 0.669228904575 |
| Minimum fold exit floor $\nu_{\mathrm{exit},\Sigma}$ | 0.055761655527 |

The branch chart remains unauthorized because accepted fold-layer rows require a finite $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}$, and that ceiling is not yet evaluated.

## Diagonal-Exclusion Subledger

The diagonal-exclusion subledger accepts 24 rows as empty. On each accepted same-interval row, the selected null coordinate is strictly monotone, so $y(t)=y(s)$ implies $t=s$; the diagonal is excluded by the causal self-interaction convention. The periodic-boundary rows use the same argument at the periodically identified zero-depth endpoint $\theta=0\sim1$. The adjacent-boundary rows close because the selected null-coordinate ranges touch only at a shared interval endpoint; strict monotonicity gives no off-endpoint crossing, and the endpoint has zero memory depth.

This closes the purely kinematic diagonal blockers. No branch-chart row may be attached to these rows because their root-count bound is $[0,0]$.

## Accepted Simple-Root Subrows

| Row | Ledger | Receiver | Source | Receiver $\theta$ range | Source floor | Receiver floor | Memory depth | Sign margin |
| --- | --- | --- | --- | --- | ---: | ---: | --- | ---: |
| `S_u_A3_A2_1` | `u` | `A3` | `A2` | $[0.670709367399,0.83991638235]$ | 0.061926988065 | 0.055761655527 | $[0.281740312711,1.877903023959]$ | 0.281740312711 |
| `S_u_A4_A2_2` | `u` | `A4` | `A2` | $[0.86491638235,0.957747116028]$ | 0.061926988065 | 0.061926988065 | $[2.034745625957,2.085251677498]$ | 2.034745625957 |
| `S_u_A4_A3_3` | `u` | `A4` | `A3` | $[0.873898811563,0.957785341387]$ | 0.055761655527 | 0.110022164784 | $[0.278626695826,1.805406300616]$ | 0.278626695826 |
| `S_w_A1_A0_4` | `w` | `A1` | `A0` | $[0.170709367399,0.33991638235]$ | 0.061926988065 | 0.055761655527 | $[0.281740312711,1.877903023959]$ | 0.281740312711 |
| `S_w_A2_A0_5` | `w` | `A2` | `A0` | $[0.36491638235,0.457747116028]$ | 0.061926988065 | 0.061926988065 | $[2.034745625957,2.085251677498]$ | 2.034745625957 |
| `S_w_A2_A1_6` | `w` | `A2` | `A1` | $[0.373898811563,0.457785341387]$ | 0.055761655527 | 0.110022164784 | $[0.278626695826,1.805406300616]$ | 0.278626695826 |

These six rows retain strict source monotonicity, strict receiver monotonicity, a $0.005$ source-coverage margin in null-coordinate value, positive memory depth, positive horizon margin, and the correct $u$ or $w$ line-of-action sign. They are subrows of parent overlap rows; the six remaining parent boundary leftovers are fold-adjacent and remain unresolved.

## Fold-Layer Atlas

| Event | Ledger | Interval | $\alpha_{\Sigma}$ | $\nu_{\mathrm{exit},\Sigma}$ | $\Delta N$ | $\Delta D$ | Impulse ceiling |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- |
| $\Sigma_1$ | `w` | `F1` | 0.669228904575 | 0.055761655527 | 2 | 0 | `not_evaluated_missing_dual_mollified_acceleration_bound` |
| $\Sigma_2$ | `w` | `F2` | 0.669228904575 | 0.055761655527 | -2 | 0 | `not_evaluated_missing_dual_mollified_acceleration_bound` |
| $\Sigma_3$ | `u` | `F3` | 0.669228904575 | 0.055761655527 | 2 | 0 | `not_evaluated_missing_dual_mollified_acceleration_bound` |
| $\Sigma_4$ | `u` | `F4` | 0.669228904575 | 0.055761655527 | -2 | 0 | `not_evaluated_missing_dual_mollified_acceleration_bound` |

The kinematic fold rows pass the normal-form and parity checks: each listed layer has positive curvature floor, positive exit floor, even root-count jump, and zero signed-degree jump. They are still not accepted fold-layer rows because the required finite fold impulse ceiling has not been computed from the dual-mollified acceleration bound.

## Remaining Blocking Classes

| Failure reason | Rows |
| --- | ---: |
| `fold_layer_impulse_ceiling_not_evaluated` | 16 |
| `range_overlap_requires_level_split` | 6 |

The remaining blockers have two different meanings.

- `fold_layer_impulse_ceiling_not_evaluated`: the row touches a separator layer on the active fold ledger. The kinematic atlas is ready, but the finite impulse ceiling is absent, so the row stays fail-closed.
- `range_overlap_requires_level_split`: the remaining parent range-overlap rows have accepted simple-root interiors, but their boundary leftovers are adjacent to active fold layers and cannot be promoted without the fold-layer alternative.

## Technical Conclusion

The diagonal-exclusion work is complete and technically useful. The fold-layer atlas is also useful, but only as a kinematic atlas: it does not yet satisfy the full fold-layer alternative in the pre-ledger theorem target. The next proof step with the highest technical value is a fold impulse ceiling bound for the four separator layers. If that closes, the six fold-adjacent parent boundary leftovers become a small finite promotion problem; if it does not close, this cosine template remains rejected before branch-chart certification.
