# Fold Row Consumption Report

## Status

This report is a planning and integration report for packet `seed-doubled-four-arc-cosine-template-v0`. It does not edit `causal_ledger.json`, does not authorize `branch_chart.json`, and does not promote any fold row to a simple-root branch.

The current pre-ledger status remains

`preledger_rejected_fold_impulse_and_fold_adjacent_parent_leftovers_remaining`.

The current `causal_ledger.json` summary is:

| Quantity | Current value |
| --- | ---: |
| Refined base rows | 162 |
| Certified empty base rows | 140 |
| Certified simple-root subrows | 6 |
| Accepted fold-layer rows | 0 |
| Split-required base rows | 22 |
| Unresolved fold-layer rows | 16 |
| Unresolved range-split parent rows | 6 |
| `branch_chart_authorized` | `false` |

The 22 remaining rows split into:

- 16 rows with `failure_code=fold_layer_impulse_ceiling_not_evaluated`;
- 6 rows with `failure_code=range_overlap_requires_level_split`.

## Acceptance Dependency

The fold-layer atlas already supplies the kinematic part of the fold-layer alternative:

$$
\alpha_{\Sigma}>0,
\qquad
\nu_{\mathrm{exit},\Sigma}>0,
\qquad
\Delta N_\Sigma\in2\mathbb{Z},
\qquad
\Delta D_\Sigma=0.
$$

The missing accepted quantities are finite fold impulse ceilings on the same packet identity tuple:

$$
C_\Sigma<\infty,
\qquad
A_{\Sigma,\eta,\epsilon_c}<\infty,
\qquad
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}<\infty,
$$

with the recorded normal-form estimate

$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
\le
C_\Sigma\eta^{1/2}
A_{\Sigma,\eta,\epsilon_c}.
$$

Here `accepted finite constants` means the constants are part of the certificate update for the same `packet_id`, `refinement_id`, $T_{\mathrm{cyc}}$, $c_f$, $\eta$, $\epsilon_c$, $h$, mesh, and packet identity references used by `causal_ledger.json` and `fold_layer_atlas.json`. Constants reported only as diagnostics, estimates, scratch calculations, or off-packet values do not consume rows.

## Fold-Layer Row Consumption Map

If the finite constants are accepted, each row below can change from `split_required` to accepted `fold_layer`. The row is consumed by the fold-layer alternative only; it does not become a `simple_root` row and does not supply a branch

$$
s_B^y(t)=(y|_{I_\beta^s})^{-1}(y(t)).
$$

| Separator | Atlas ref | Required accepted constants | Rows consumed as `fold_layer` |
| --- | --- | --- | --- |
| $\Sigma_1$ | `fold_layer_atlas.json:fold_Sigma_1_w` | $C_{\Sigma_1}$, $A_{\Sigma_1,\eta,\epsilon_c}$, $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma_1}$ finite | `R_w_F1_A0`, `R_w_F1_F1`, `R_w_A1_F1`, `R_w_A2_F1` |
| $\Sigma_2$ | `fold_layer_atlas.json:fold_Sigma_2_w` | $C_{\Sigma_2}$, $A_{\Sigma_2,\eta,\epsilon_c}$, $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma_2}$ finite | `R_w_F2_A0`, `R_w_F2_A1`, `R_w_F2_F2`, `R_w_A2_F2` |
| $\Sigma_3$ | `fold_layer_atlas.json:fold_Sigma_3_u` | $C_{\Sigma_3}$, $A_{\Sigma_3,\eta,\epsilon_c}$, $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma_3}$ finite | `R_u_F3_A2`, `R_u_F3_F3`, `R_u_A3_F3`, `R_u_A4_F3` |
| $\Sigma_4$ | `fold_layer_atlas.json:fold_Sigma_4_u` | $C_{\Sigma_4}$, $A_{\Sigma_4,\eta,\epsilon_c}$, $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma_4}$ finite | `R_u_F4_A2`, `R_u_F4_A3`, `R_u_F4_F4`, `R_u_A4_F4` |

The fold-layer update should preserve the atlas floors:

| Separator | Ledger | Layer | $\alpha_{\Sigma}$ | $\nu_{\mathrm{exit},\Sigma}$ | $\Delta N_\Sigma$ | $\Delta D_\Sigma$ |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| $\Sigma_1$ | `w` | `F1` | 0.669228904575 | 0.055761655527 | 2 | 0 |
| $\Sigma_2$ | `w` | `F2` | 0.669228904575 | 0.055761655527 | -2 | 0 |
| $\Sigma_3$ | `u` | `F3` | 0.669228904575 | 0.055761655527 | 2 | 0 |
| $\Sigma_4$ | `u` | `F4` | 0.669228904575 | 0.055761655527 | -2 | 0 |

## Fold-Adjacent Parent Row Consumption Map

The six parent rows already have accepted strict simple-root interiors, but the parent rows themselves remain `split_required` because their boundary complements are adjacent to active fold layers. After the finite constants are accepted, each parent row can be consumed only by replacing the parent row with:

1. its already accepted strict simple-root subrow;
2. boundary complements that are either range-empty with a strict range gap or covered by accepted fold-layer alternatives.

| Parent row | Accepted simple-root subrow | Ledger | Parent blocker | Boundary-complement route after accepted finite constants |
| --- | --- | --- | --- | --- |
| `R_w_A1_A0` | `S_w_A1_A0_4` | `w` | `range_overlap_requires_level_split` | Range-empty complements or coverage by accepted $\Sigma_1$ / $\Sigma_2$ fold-layer rows. |
| `R_w_A2_A0` | `S_w_A2_A0_5` | `w` | `range_overlap_requires_level_split` | Range-empty complements or coverage by accepted $\Sigma_1$ / $\Sigma_2$ fold-layer rows. |
| `R_w_A2_A1` | `S_w_A2_A1_6` | `w` | `range_overlap_requires_level_split` | Range-empty complements or coverage by accepted $\Sigma_1$ / $\Sigma_2$ fold-layer rows. |
| `R_u_A3_A2` | `S_u_A3_A2_1` | `u` | `range_overlap_requires_level_split` | Range-empty complements or coverage by accepted $\Sigma_3$ / $\Sigma_4$ fold-layer rows. |
| `R_u_A4_A2` | `S_u_A4_A2_2` | `u` | `range_overlap_requires_level_split` | Range-empty complements or coverage by accepted $\Sigma_3$ / $\Sigma_4$ fold-layer rows. |
| `R_u_A4_A3` | `S_u_A4_A3_3` | `u` | `range_overlap_requires_level_split` | Range-empty complements or coverage by accepted $\Sigma_3$ / $\Sigma_4$ fold-layer rows. |

The six accepted simple-root subrows keep their existing root-count bound $[1,1]$ and strict margins:

| Accepted subrow | Parent row | Source floor | Receiver floor | Memory depth | Sign margin |
| --- | --- | ---: | ---: | --- | ---: |
| `S_u_A3_A2_1` | `R_u_A3_A2` | 0.061926988065 | 0.055761655527 | $[0.281740312711,1.877903023959]$ | 0.281740312711 |
| `S_u_A4_A2_2` | `R_u_A4_A2` | 0.061926988065 | 0.061926988065 | $[2.034745625957,2.085251677498]$ | 2.034745625957 |
| `S_u_A4_A3_3` | `R_u_A4_A3` | 0.055761655527 | 0.110022164784 | $[0.278626695826,1.805406300616]$ | 0.278626695826 |
| `S_w_A1_A0_4` | `R_w_A1_A0` | 0.061926988065 | 0.055761655527 | $[0.281740312711,1.877903023959]$ | 0.281740312711 |
| `S_w_A2_A0_5` | `R_w_A2_A0` | 0.061926988065 | 0.061926988065 | $[2.034745625957,2.085251677498]$ | 2.034745625957 |
| `S_w_A2_A1_6` | `R_w_A2_A1` | 0.055761655527 | 0.110022164784 | $[0.278626695826,1.805406300616]$ | 0.278626695826 |

The parent-row update must not erase the distinction between a strict simple-root subrow and a fold-adjacent boundary complement. A parent row is consumed only when every boundary complement has one of these accepted outcomes:

$$
\Delta^y_B
=
\operatorname{dist}\!\big(Y_{\alpha}^{y},Y_{\beta}^{y}\big)
>0
$$

for a range-empty complement, or membership in an accepted fold-layer family

$$
B\in\mathcal{F}_{\Sigma}
$$

with finite

$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}.
$$

## Diagnostic-Only Constants Do Not Consume Rows

If $C_\Sigma$, $A_{\Sigma,\eta,\epsilon_c}$, or $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}$ are reported only as diagnostic values, then no row consumption is authorized.

| Row class | Count | Status if constants are diagnostic-only | Reason |
| --- | ---: | --- | --- |
| Fold-layer rows | 16 | remain `split_required` with `failure_code=fold_layer_impulse_ceiling_not_evaluated` | `fold_layer_atlas.json` still has `accepted_as_fold_layer=false`, `C_Sigma=null`, `A_Sigma_eta_epsilon_c=null`, and `I_fold_eta_epsilon_c_Sigma=null`. |
| Fold-adjacent parent rows | 6 | remain `split_required` with `failure_code=range_overlap_requires_level_split` | The accepted simple-root interiors are preserved, but the boundary complements are not certified as range-empty or covered by accepted fold-layer rows. |
| `causal_ledger.json` pre-ledger | 1 | remains rejected | `I_fold_all_finite=false`, `pass=false`, and `branch_chart_authorized=false` remain the correct state. |
| `branch_chart.json` | 1 | remains unauthorized and absent | A branch chart requires full pre-ledger closure, not diagnostic fold constants. |

## Certificate Integration Plan

The next certificate update can change `causal_ledger.json` only after the following row-level facts are recorded on the same packet identity tuple.

1. For each $\Sigma_k$, record finite
   $$
   (C_{\Sigma_k},A_{\Sigma_k,\eta,\epsilon_c},I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma_k})
   $$
   and preserve the existing $\alpha_{\Sigma_k}$, $\nu_{\mathrm{exit},\Sigma_k}$, $\Delta N_{\Sigma_k}$, and $\Delta D_{\Sigma_k}$ values.
2. Rewrite the 16 fold-touching rows as accepted `fold_layer` rows, with the relevant atlas reference and finite impulse ceiling.
3. Replace each of the 6 parent rows by its accepted strict simple-root subrow plus boundary complements that are either strict range-empty rows or covered by accepted fold-layer rows.
4. Set the pre-ledger pass state only if all 22 currently unresolved rows are consumed and all 140 currently accepted empty rows and 6 accepted simple-root subrows keep their certified margins.

If all four steps are satisfied, the target row-consumption summary is:

| Quantity | Target after accepted finite constants and parent-complement closure |
| --- | ---: |
| Certified empty base rows | 140 plus any newly certified range-empty boundary complements |
| Certified simple-root subrows | 6 |
| Accepted fold-layer rows | 16 |
| Split-required base rows | 0 |
| Unresolved fold-layer rows | 0 |
| Unresolved range-split parent rows | 0 |
| `branch_chart_authorized` | Eligible to change to `true` only as part of the full passed pre-ledger update |

## No-Overclaiming Rule

Fold rows cannot become simple-root branches. The fold-layer rows may carry atlas references, parity data, row impulse ceilings, and fold-transition labels, but they do not authorize branch-sum formulas with a collapsing

$$
|J_y|^{-1}
$$

factor through a separator layer.

`branch_chart.json` remains unauthorized unless the full pre-ledger row set closes. It is not enough to accept the 16 fold-layer rows if any one of the 6 fold-adjacent parent rows still has an unresolved boundary complement. It is also not enough to preserve the 6 accepted simple-root subrows if the fold rows remain diagnostic-only. The branch chart may be built only after every pre-ledger row is classified as accepted `empty`, accepted `simple_root`, or accepted `fold_layer` on the same packet identity tuple.
