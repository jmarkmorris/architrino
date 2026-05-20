# Fold Parent `w` Complement Closure Attempt

## Scope

This packet attempts complement-by-complement closure for the three `w` parent rows after the accepted fixed-parameter full-interval fold constants certificate:

- `R_w_A1_A0`;
- `R_w_A2_A0`;
- `R_w_A2_A1`.

It uses packet identity `seed-doubled-four-arc-cosine-template-v0` and refinement `preledger-separator-level-split-v1`. It reads the accepted constants artifact `fold_full_interval_constants_certificate.json`, the parent-complement contract `fold_parent_boundary_complement_packet.md`, the post-constants status packet `fold_parent_after_full_interval_status.md`, the live ledger `causal_ledger.json`, the refined pre-ledger `mesh_refined_preledger_v1.json`, and `causal_preledger_interval_report.md`.

This packet does not edit `causal_ledger.json`, `fold_layer_atlas.json`, `branch_chart.json`, or any pass/fail ledger.

## Verdict

Rejected as a closure certificate; useful as a blocked attempt.

The accepted full-interval constants certificate supplies finite fixed-parameter fold-layer constants for $\Sigma_1$ and $\Sigma_2$ on the same packet identity tuple. However, the current artifacts still do not record the required boundary-complement decomposition for the three `w` parent rows. In particular, they do not give, for every boundary complement $B$ of each parent row, exactly one of:

$$
\Delta^w_B
=
\operatorname{dist}\!\big(Y_{\alpha}^{w},Y_{\beta}^{w}\big)
>0
$$

or

$$
B\in\mathcal{F}_{\Sigma_1}
\quad\text{or}\quad
B\in\mathcal{F}_{\Sigma_2}
$$

with the covering fold-layer row accepted on the same packet identity tuple.

Therefore the `w` side cannot be consumed now, and no live ledger update is authorized by this attempt.

## Accepted Fold-Layer Evidence Available

The accepted constants artifact records finite fixed-parameter values for the `w` separator families:

| Separator family | Accepted coverage rows in the constants certificate | Accepted aggregate evidence |
| --- | --- | --- |
| $\mathcal{F}_{\Sigma_1}$ | `R_w_F1_A0`, `R_w_F1_F1`, `R_w_A1_F1`, `R_w_A2_F1` | `accepted=true`, $\alpha_{\Sigma}=0.669228904575$, $\nu_{\mathrm{exit},\Sigma}=0.055761655527$, $\Delta N_\Sigma=2$, $\Delta D_\Sigma=0$, finite $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}=11289.90742089375$ |
| $\mathcal{F}_{\Sigma_2}$ | `R_w_F2_A0`, `R_w_F2_A1`, `R_w_F2_F2`, `R_w_A2_F2` | `accepted=true`, $\alpha_{\Sigma}=0.669228904575$, $\nu_{\mathrm{exit},\Sigma}=0.055761655527$, $\Delta N_\Sigma=-2$, $\Delta D_\Sigma=0$, finite $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}=11289.90742089375$ |

This is enough to make the listed fold-layer rows fold-ceiling-ready under the fixed-parameter full-interval fallback. It is not enough, by itself, to certify the parent boundary complements, because no current artifact assigns the individual parent complements to those accepted fold-layer families or records strict range-empty gaps for them.

## Per-Parent-Row Attempt Table

| Parent row | Accepted simple-root subrow | Simple-root receiver $\theta$ range | Simple-root source $\theta$ range | Available closure route | Missing interval data | Row verdict |
| --- | --- | --- | --- | --- | --- | --- |
| `R_w_A1_A0` | `S_w_A1_A0_4` | $[0.170709367399,0.33991638235]$ | $[0.04103883344,0.125869003963]$ | Potential coverage by accepted $\mathcal{F}_{\Sigma_1}$ / $\mathcal{F}_{\Sigma_2}$, or strict range-empty complements. | Exact disjoint complement rectangles inside `A1` $\times$ `A0`; for each complement, certified $Y^w$ range enclosure and $\Delta^w_B>0$, or explicit membership in $\mathcal{F}_{\Sigma_1}$ / $\mathcal{F}_{\Sigma_2}$. | Blocked; cannot accept. |
| `R_w_A2_A0` | `S_w_A2_A0_5` | $[0.36491638235,0.457747116028]$ | $[0.041076558044,0.125869003963]$ | Potential coverage by accepted $\mathcal{F}_{\Sigma_1}$ / $\mathcal{F}_{\Sigma_2}$, or strict range-empty complements. | Exact disjoint complement rectangles inside `A2` $\times$ `A0`; for each complement, certified $Y^w$ range enclosure and $\Delta^w_B>0$, or explicit membership in $\mathcal{F}_{\Sigma_1}$ / $\mathcal{F}_{\Sigma_2}$. | Blocked; cannot accept. |
| `R_w_A2_A1` | `S_w_A2_A1_6` | $[0.373898811563,0.457785341387]$ | $[0.170446004355,0.329553995645]$ | Potential coverage by accepted $\mathcal{F}_{\Sigma_1}$ / $\mathcal{F}_{\Sigma_2}$, or strict range-empty complements. | Exact disjoint complement rectangles inside `A2` $\times$ `A1`; for each complement, certified $Y^w$ range enclosure and $\Delta^w_B>0$, or explicit membership in $\mathcal{F}_{\Sigma_1}$ / $\mathcal{F}_{\Sigma_2}$. | Blocked; cannot accept. |

## Why Strict Range-Empty Closure Is Not Available From Current Artifacts

The parent rows remain `split_required` in `causal_ledger.json` with `failure_code=range_overlap_requires_level_split` and `range_gap=0`. The accepted simple-root subrows record source-coverage gaps, but the parent-complement contract explicitly states that the accepted simple-root subrow's source-coverage gap does not certify the boundary complement.

The current files do not contain per-complement values of

$$
Y_{\alpha}^{w},
\qquad
Y_{\beta}^{w},
\qquad
\Delta^w_B.
$$

Therefore no boundary complement can be accepted now by the strict range-empty alternative.

## Why Fold-Layer Coverage Is Not Yet Recorded For The Parent Complements

The full-interval constants certificate accepts the fold-layer rows attached to `F1` and `F2`. Those accepted rows are:

- `R_w_F1_A0`, `R_w_F1_F1`, `R_w_A1_F1`, `R_w_A2_F1`;
- `R_w_F2_A0`, `R_w_F2_A1`, `R_w_F2_F2`, `R_w_A2_F2`.

The three parent rows attempted here are regular-regular rows:

- `R_w_A1_A0`;
- `R_w_A2_A0`;
- `R_w_A2_A1`.

The current artifacts say their boundary leftovers are fold-adjacent, but they do not define the individual complement regions $B$ and do not record a proof that each such $B$ belongs to $\mathcal{F}_{\Sigma_1}$ or $\mathcal{F}_{\Sigma_2}$. Since the parent-complement contract requires explicit classification of every boundary complement, the accepted fold-layer constants cannot be consumed by these parent rows without that missing assignment.

## Minimal Next Calculation

For each of the three parent rows, compute a disjoint boundary-complement partition of the parent row minus the accepted simple-root subrow. For every complement rectangle $B$, record:

1. `parent_row_id`;
2. a stable `complement_id`;
3. receiver and source $\theta$ intervals;
4. receiver and source $w$-range enclosures;
5. either the strict gap
   $$
   \Delta^w_B
   =
   \operatorname{dist}\!\big(Y_{\alpha}^{w},Y_{\beta}^{w}\big)
   >0
   $$
   with its certified lower bound, or the exact separator-family assignment
   $$
   B\in\mathcal{F}_{\Sigma_1}
   \quad\text{or}\quad
   B\in\mathcal{F}_{\Sigma_2};
   $$
6. the covering accepted fold-layer row when the route is fold-layer coverage.

The smallest useful calculation is not another fold-constant pass. It is the parent-complement interval partition and range/membership certificate for:

| Parent row | Minimal missing calculation |
| --- | --- |
| `R_w_A1_A0` | Partition `A1` $\times$ `A0` around `S_w_A1_A0_4`; certify every receiver-left/source-left/source-right leftover by strict $\Delta^w_B>0$ or by $\mathcal{F}_{\Sigma_1}$ / $\mathcal{F}_{\Sigma_2}$ membership. |
| `R_w_A2_A0` | Partition `A2` $\times$ `A0` around `S_w_A2_A0_5`; certify every receiver-right/source-left/source-right leftover by strict $\Delta^w_B>0$ or by $\mathcal{F}_{\Sigma_1}$ / $\mathcal{F}_{\Sigma_2}$ membership. |
| `R_w_A2_A1` | Partition `A2` $\times$ `A1` around `S_w_A2_A1_6`; certify every receiver-left/receiver-right/source-left/source-right leftover by strict $\Delta^w_B>0$ or by $\mathcal{F}_{\Sigma_1}$ / $\mathcal{F}_{\Sigma_2}$ membership. |

## Consumption And Ledger Authorization

| Question | Answer |
| --- | --- |
| Can the `w` parent side be consumed now? | No. |
| Are the accepted fixed-parameter full-interval fold constants useful? | Yes. They remove the constants-only blocker for $\Sigma_1$ and $\Sigma_2$ under the accepted fallback route. |
| Do the artifacts currently close the three `w` parent boundary complements? | No. The required complement-by-complement interval partition and classification is absent. |
| Is any live `causal_ledger.json` update authorized? | No. |
| Is any `fold_layer_atlas.json` update authorized by this packet? | No. |
| Is any `branch_chart.json` creation or authorization allowed? | No. |

The correct current state remains: the constants certificate is accepted for fixed-parameter fold constants, but the three `w` parent rows remain blocked until their boundary complements are explicitly certified.
