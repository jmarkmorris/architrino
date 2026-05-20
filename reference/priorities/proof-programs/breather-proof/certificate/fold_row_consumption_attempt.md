# Fold Row Consumption Attempt

## Status

This document is a no-overclaiming row-consumption attempt for packet `seed-doubled-four-arc-cosine-template-v0` and refinement `preledger-separator-level-split-v1`.

It does not edit `causal_ledger.json`, does not edit `fold_layer_atlas.json`, does not create or authorize `branch_chart.json`, and does not promote any fold-layer row to a simple-root branch.

Current verdict: no rows are consumed under the current data.

The accepted-constants attempt named by the current workstream is not present here as accepted certificate data. The available constants artifact, `fold_impulse_constants.json`, has `status=diagnostic_bound_not_interval_certified`, reports diagnostic finite values only, and records `accepted_as_fold_layer=false` for every separator. Therefore it cannot consume rows.

## Current Row-Consumption Verdict

Under the current certificate data, the exact row-consumption verdict is:

| Artifact or row class | Current count or state | Consumption verdict |
| --- | ---: | --- |
| Fold-layer rows | 16 | Not consumed; remain `split_required` with `failure_code=fold_layer_impulse_ceiling_not_evaluated`. |
| Fold-adjacent parent rows | 6 | Not consumed; remain `split_required` with `failure_code=range_overlap_requires_level_split`. |
| `causal_ledger.json` | `status=preledger_rejected_fold_impulse_and_fold_adjacent_parent_leftovers_remaining` | Remains rejected with `accepted_fold_layer_rows=0`, `split_required_base_rows=22`, `unresolved_fold_layer_rows=16`, `unresolved_range_split_parent_rows=6`, `I_fold_all_finite=false`, `pass=false`, and `branch_chart_authorized=false`. |
| `branch_chart.json` | Absent and unauthorized | Must remain absent or unauthorized because the pre-ledger has not passed. |

The current summary row is therefore:

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

This verdict is fail-closed: finite diagnostic constants do not change the row status.

## Diagnostic Constants Blocker

The fold-layer alternative requires accepted finite constants on the same packet identity tuple:

$$
C_\Sigma<\infty,
\qquad
A_{\Sigma,\eta,\epsilon_c}<\infty,
\qquad
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}<\infty.
$$

The current diagnostic artifact records finite numerical ceilings, but it does not satisfy the acceptance contract because it lacks interval-certified mollifier data or direct quadrature enclosures, certified row-tube projections, certified source-slice coverage, and accepted separator aggregates. In particular, its diagnostic convention for

$$
M_\delta=1
$$

is not an interval-certified mollifier norm.

Thus the separator families

$$
\mathcal{F}_{\Sigma_1},
\qquad
\mathcal{F}_{\Sigma_2},
\qquad
\mathcal{F}_{\Sigma_3},
\qquad
\mathcal{F}_{\Sigma_4}
$$

are not accepted coverage families under the current data.

## Rows Not Consumed

The 16 fold-layer rows remain unresolved exactly as follows:

| Separator | Rows not consumed |
| --- | --- |
| $\Sigma_1$ | `R_w_F1_A0`, `R_w_F1_F1`, `R_w_A1_F1`, `R_w_A2_F1` |
| $\Sigma_2$ | `R_w_F2_A0`, `R_w_F2_A1`, `R_w_F2_F2`, `R_w_A2_F2` |
| $\Sigma_3$ | `R_u_F3_A2`, `R_u_F3_F3`, `R_u_A3_F3`, `R_u_A4_F3` |
| $\Sigma_4$ | `R_u_F4_A2`, `R_u_F4_A3`, `R_u_F4_F4`, `R_u_A4_F4` |

The six fold-adjacent parent rows also remain unresolved:

| Parent row | Accepted simple-root subrow preserved | Current blocker |
| --- | --- | --- |
| `R_w_A1_A0` | `S_w_A1_A0_4` | Boundary complements are not certified as range-empty or covered by accepted $\Sigma_1$ / $\Sigma_2$ fold-layer rows. |
| `R_w_A2_A0` | `S_w_A2_A0_5` | Boundary complements are not certified as range-empty or covered by accepted $\Sigma_1$ / $\Sigma_2$ fold-layer rows. |
| `R_w_A2_A1` | `S_w_A2_A1_6` | Boundary complements are not certified as range-empty or covered by accepted $\Sigma_1$ / $\Sigma_2$ fold-layer rows. |
| `R_u_A3_A2` | `S_u_A3_A2_1` | Boundary complements are not certified as range-empty or covered by accepted $\Sigma_3$ / $\Sigma_4$ fold-layer rows. |
| `R_u_A4_A2` | `S_u_A4_A2_2` | Boundary complements are not certified as range-empty or covered by accepted $\Sigma_3$ / $\Sigma_4$ fold-layer rows. |
| `R_u_A4_A3` | `S_u_A4_A3_3` | Boundary complements are not certified as range-empty or covered by accepted $\Sigma_3$ / $\Sigma_4$ fold-layer rows. |

The six strict simple-root subrows remain preserved as accepted subrows, but the parent rows are not consumed by those subrows alone.

## Conditional Accepted Path

If a later `fold_interval_constants_attempt.json` becomes accepted under `fold_interval_constants_contract.md`, then this consumption attempt can be updated to a row-consumption update only if the accepted artifact proves all of the following on the same packet identity tuple used by `causal_ledger.json` and `fold_layer_atlas.json`:

1. The artifact has accepted interval status, not diagnostic status.
2. It binds to `packet_id=seed-doubled-four-arc-cosine-template-v0` and `refinement_id=preledger-separator-level-split-v1`.
3. It proves the coupling convention for
   $$
   \Gamma=\kappa\epsilon^2
   $$
   or supplies the accepted enclosure used in every fold-row calculation.
4. It supplies either an interval-certified mollifier-norm route or a direct quadrature route.
5. For each fold row
   $$
   B\in\mathcal{F}_\Sigma,
   $$
   it supplies accepted row coverage, row-tube or quadrature data, and finite row impulse enclosures.
6. For each separator, it records finite accepted aggregates
   $$
   C_\Sigma,
   \qquad
   A_{\Sigma,\eta,\epsilon_c},
   \qquad
   I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma},
   $$
   or an accepted direct row-impulse aggregate route.
7. It preserves the fold-atlas conditions
   $$
   \alpha_{\Sigma}>0,
   \qquad
   \nu_{\mathrm{exit},\Sigma}>0,
   \qquad
   \Delta N_\Sigma\in2\mathbb{Z},
   \qquad
   \Delta D_\Sigma=0.
   $$
8. Every boundary complement of each of the six parent rows is explicitly classified as either strict range-empty,
   $$
   \Delta^y_B
   =
   \operatorname{dist}\!\big(Y_{\alpha}^{y},Y_{\beta}^{y}\big)
   >0,
   $$
   or covered by an accepted separator family,
   $$
   B\in\mathcal{F}_{\Sigma},
   $$
   with finite accepted
   $$
   I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}.
   $$

Only after those conditions are present may the target consumption state be considered:

| Quantity | Conditional target after accepted constants and parent-complement closure |
| --- | ---: |
| Accepted fold-layer rows | 16 |
| Split-required base rows | 0 |
| Unresolved fold-layer rows | 0 |
| Unresolved range-split parent rows | 0 |
| `branch_chart_authorized` | Eligible to become `true` only as part of a full passed pre-ledger update |

This conditional path is not the current state. It is a guarded update path for a later accepted constants artifact.

## No-Overclaiming Rule

Fold-layer rows are never consumed as `simple_root` rows. They do not supply a branch

$$
s_B^y(t)=(y|_{I_\beta^s})^{-1}(y(t)).
$$

They also do not permit a separator-layer branch-sum evaluation with a collapsing

$$
|J_y|^{-1}
$$

factor. Under the current data, `branch_chart.json` remains unauthorized because the full pre-ledger row set has not closed.
