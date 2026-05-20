# Fold Interval Constants Contract

## Scope

This document is a contract/proof packet only for the collinear-breather fold ceiling on packet `seed-doubled-four-arc-cosine-template-v0` and refinement `preledger-separator-level-split-v1`. It does not edit `causal_ledger.json`, does not accept any fold row, and does not authorize `branch_chart.json`.

Its purpose is to state exactly what an eventual accepted constants artifact must contain before the diagnostic fold constants can be consumed as interval-certified certificate data for the separator layers
$$
\Sigma\in\{\Sigma_1,\Sigma_2,\Sigma_3,\Sigma_4\}.
$$

All row-projection, source-slice, and packet-field labels below are local artifact labels for this contract. They are not new project terminology.

## Fixed Law And Coupling Convention

The accepted constants must be computed from the dual-mollified absolute-time law used by the master equation and the collinear-breather proof scaffold. For each fold row
$$
B\in\mathcal{F}_\Sigma,
$$
the row contribution must be bounded from
$$
a^{\mathrm{fold}}_{\eta,\epsilon_c,B}(t)
=
\Gamma
\int_{S_B(t)}
\frac{\hat r_s(t;s)}
{|x(t)-x(s)|^2+\epsilon_c^2}\,
\delta_\eta\!\big(|x(t)-x(s)|-c_f(t-s)\big)\,ds,
$$
where
$$
\Gamma=\kappa\epsilon^2.
$$
No separator row may be evaluated by a simple-root branch sum with a collapsing
$$
|J_y|^{-1}
$$
factor.

The packet parameters are fixed as
$$
T_{\mathrm{cyc}}=2\pi,
\qquad
c_f=1,
\qquad
\eta=0.02,
\qquad
\epsilon_c=0.05,
\qquad
h=2\pi.
$$

The accepted artifact must state whether packet `g=1.0` is exactly the coupling product
$$
\Gamma=\kappa\epsilon^2.
$$
If it is not exactly the same product, the artifact must give the interval enclosure for
$$
\Gamma
$$
and must recompute every row and separator ceiling under that convention.

## Acceptance Contract

### Packet identity

The accepted constants artifact must bind every reported value to the same packet identity tuple
$$
\mathfrak{I}_{\mathrm{seed}}
=
\left(
\mathcal{K},
T_{\mathrm{cyc}},
\mathcal{S},
\mathcal{P},
\mathcal{B}_{\mathrm{rep}},
\Theta
\right),
$$
with `packet_id=seed-doubled-four-arc-cosine-template-v0` and `refinement_id=preledger-separator-level-split-v1`. It must identify the inspected inputs `phi_cyc.json`, `mesh.json`, `mesh_refined_preledger_v1.json`, `fold_layer_atlas.json`, `causal_ledger.json`, and the accepted constants artifact itself by path plus digest or another exact identity check.

The artifact fails if any reported constant is computed on a different
$$
\mathcal{K},
\qquad
T_{\mathrm{cyc}},
\qquad
\mathcal{P},
\qquad
\Theta.
$$

### Mollifier route

The accepted artifact must choose one of two routes.

1. **Mollifier-norm route.** It must declare a compact-support normalized shell mollifier
   $$
   \delta_\eta(z)=\eta^{-1}\delta(z/\eta),
   \qquad
   \operatorname{supp}\delta\subset[-1,1],
   \qquad
   \int_{\mathbb{R}}\delta(z)\,dz=1,
   $$
   and must provide an interval-certified finite enclosure
   $$
   M_\delta\ge\|\delta\|_\infty.
   $$
   Then
   $$
   \|\delta_\eta\|_\infty\le \eta^{-1}M_\delta
   $$
   must be used consistently in every row bound that depends on a sup norm.

2. **Direct quadrature route.** It may use a compact or non-compact mollifier only if it supplies interval quadrature enclosures for the full dual-mollified row integrals assigned to every row in
   $$
   \mathcal{F}_\Sigma.
   $$
   If the mollifier has non-compact support, support-based row-tube consumption is not accepted unless the artifact also records a certified tail cutoff or a full-tail quadrature enclosure.

The artifact fails if it sets
$$
M_\delta
$$
by convention without an interval proof, or if direct quadrature does not enclose the full mollifier contribution for every fold row.

### Row-tube projections and source slices

For every fold row
$$
B=(I_\alpha^r,I_\beta^s,y),
\qquad
y\in\{u,w\},
$$
the accepted artifact must provide:

- a measurable receiver projection
  $$
  E_B\subseteq I_\alpha^r,
  $$
- a measurable source-slice family
  $$
  S_B(t)\subseteq I_\beta^s,
  $$
- interval enclosures for
  $$
  L_{r,B}\ge |E_B|,
  \qquad
  L_{s,B}\ge \sup_{t\in E_B}|S_B(t)|,
  $$
- and a coverage statement proving that the chosen
  $$
  E_B,
  \qquad
  S_B(t)
  $$
  contain the full mollifier contribution assigned to that row.

If the normal-form transit route is used, the row projection must also provide
$$
c_{\Sigma,B}<\infty
$$
with
$$
L_{r,B}\le c_{\Sigma,B}\eta^{1/2}.
$$
If no row-tube projection stronger than the full refined interval is proved, the artifact may still report a finite full-interval fallback, but it must label that fallback as coarse fixed-parameter consumption and may not use it to claim the intended
$$
O(\eta^{1/2})
$$
fold-transit scaling.

### Row acceleration or impulse enclosures

For each row
$$
B\in\mathcal{F}_\Sigma,
$$
the accepted artifact must provide at least one of the following interval-certified row enclosures.

The acceleration route reports
$$
A_{B,\eta,\epsilon_c}
\ge
\sup_{t\in E_B}
\left|a^{\mathrm{fold}}_{\eta,\epsilon_c,B}(t)\right|
<\infty
$$
and then reports the row impulse enclosure
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,B}
\ge
\int_{E_B}
\left|a^{\mathrm{fold}}_{\eta,\epsilon_c,B}(t)\right|\,dt.
$$
It must prove
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,B}
\le
L_{r,B}A_{B,\eta,\epsilon_c}.
$$

The direct quadrature route reports
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,B}<\infty
$$
as a direct interval enclosure of the row impulse under the same dual-mollified law. If it does not separately report
$$
A_{B,\eta,\epsilon_c},
$$
the separator aggregate must use the row impulses directly rather than the normal-form product
$$
C_\Sigma\eta^{1/2}A_{\Sigma,\eta,\epsilon_c}.
$$

### Separator aggregates

For every separator layer, the accepted artifact must report interval-certified finite aggregates
$$
C_\Sigma,
\qquad
A_{\Sigma,\eta,\epsilon_c},
\qquad
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma},
$$
unless the artifact uses direct row-impulse quadrature and explicitly declares that
$$
A_{\Sigma,\eta,\epsilon_c}
$$
is not the consumption route.

For the normal-form route, the artifact must prove
$$
C_\Sigma
\ge
\eta^{-1/2}
\sum_{B\in\mathcal{F}_\Sigma}L_{r,B},
$$
$$
A_{\Sigma,\eta,\epsilon_c}
\ge
\max_{B\in\mathcal{F}_\Sigma}
A_{B,\eta,\epsilon_c},
$$
and
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
\ge
\sum_{B\in\mathcal{F}_\Sigma}
I^{\mathrm{fold}}_{\eta,\epsilon_c,B},
$$
with the normal-form ceiling
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
\le
C_\Sigma\eta^{1/2}A_{\Sigma,\eta,\epsilon_c}.
$$

For the direct row-impulse route, the artifact must prove
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
\ge
\sum_{B\in\mathcal{F}_\Sigma}
I^{\mathrm{fold}}_{\eta,\epsilon_c,B},
$$
with
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
<\infty.
$$

In both routes, the fold-atlas data must remain attached to the same separator:
$$
\alpha_\Sigma>0,
\qquad
\nu_{\mathrm{exit},\Sigma}>0,
\qquad
\Delta N_\Sigma\in2\mathbb{Z},
\qquad
\Delta D_\Sigma=0.
$$

### Row consumption boundary

The accepted constants artifact may be consumed by a later row-consumption update, but it does not perform that update by itself. A later pre-ledger artifact must still show that the 16 fold-layer rows and the 6 fold-adjacent parent boundary complements no longer contain `split_required`.

The constants artifact must therefore identify the rows it covers:

| Separator | Fold rows |
| --- | --- |
| $\Sigma_1$ | `R_w_F1_A0`, `R_w_F1_F1`, `R_w_A1_F1`, `R_w_A2_F1` |
| $\Sigma_2$ | `R_w_F2_A0`, `R_w_F2_A1`, `R_w_F2_F2`, `R_w_A2_F2` |
| $\Sigma_3$ | `R_u_F3_A2`, `R_u_F3_F3`, `R_u_A3_F3`, `R_u_A4_F3` |
| $\Sigma_4$ | `R_u_F4_A2`, `R_u_F4_A3`, `R_u_F4_F4`, `R_u_A4_F4` |

It must also list the six fold-adjacent parent rows as still requiring row-consumption resolution unless a separate pre-ledger update consumes them:

| Parent row | Accepted simple-root subrow | Boundary-complement requirement |
| --- | --- | --- |
| `R_w_A1_A0` | `S_w_A1_A0_4` | Complements must be range-empty or covered by accepted $\Sigma_1$ / $\Sigma_2$ fold-layer alternatives. |
| `R_w_A2_A0` | `S_w_A2_A0_5` | Complements must be range-empty or covered by accepted $\Sigma_1$ / $\Sigma_2$ fold-layer alternatives. |
| `R_w_A2_A1` | `S_w_A2_A1_6` | Complements must be range-empty or covered by accepted $\Sigma_1$ / $\Sigma_2$ fold-layer alternatives. |
| `R_u_A3_A2` | `S_u_A3_A2_1` | Complements must be range-empty or covered by accepted $\Sigma_3$ / $\Sigma_4$ fold-layer alternatives. |
| `R_u_A4_A2` | `S_u_A4_A2_2` | Complements must be range-empty or covered by accepted $\Sigma_3$ / $\Sigma_4$ fold-layer alternatives. |
| `R_u_A4_A3` | `S_u_A4_A3_3` | Complements must be range-empty or covered by accepted $\Sigma_3$ / $\Sigma_4$ fold-layer alternatives. |

## Minimal Fields For An Accepted Constants Artifact

The eventual accepted artifact can stay narrow. It needs only enough fields to bind the constants to the existing certificate packet and to make the fold-ceiling inequalities checkable.

| Field | Required content | Acceptance condition |
| --- | --- | --- |
| `schema` | A fold constants schema label. | Identifies this artifact as accepted interval constants, not diagnostic bounds. |
| `packet_id`, `refinement_id` | `seed-doubled-four-arc-cosine-template-v0`, `preledger-separator-level-split-v1`. | Matches the inspected packet inputs. |
| `status` | Accepted or rejected interval status. | Accepted only if every required interval enclosure is finite and packet-bound. |
| `packet_identity_check` | Exact identity tuple and input digests or equivalent exact references. | No mismatch across candidate, mesh, pre-ledger, atlas, ledger, and constants artifact. |
| `parameters` | $T_{\mathrm{cyc}}$, $c_f$, $\eta$, $\epsilon_c$, $h$, and the coupling convention. | Values match the packet, and `g` is either proved equal to $\Gamma=\kappa\epsilon^2$ or replaced by a certified $\Gamma$ enclosure. |
| `mollifier` | Chosen route, kernel description, $M_\delta$ enclosure or direct quadrature declaration. | Norm or quadrature route is interval-certified. |
| `rows` | One entry per fold row with $E_B$, $S_B(t)$, $L_{r,B}$, $L_{s,B}$, and row enclosure data. | Full assigned mollifier contribution is covered. |
| `separators` | One entry per $\Sigma$ with $\alpha_\Sigma$, $\nu_{\mathrm{exit},\Sigma}$, $\Delta N_\Sigma$, $\Delta D_\Sigma$, and aggregate ceilings. | Finite aggregate inequalities hold on the same packet identity. |
| `row_consumption_boundary` | Covered fold rows and unresolved or separately consumed parent complements. | Makes clear whether this artifact is constants-only or paired with a later pre-ledger consumption update. |
| `pass_fail` | Explicit blockers when rejected. | No silent promotion of fold rows or branch-chart authorization. |

## Why `fold_impulse_constants.json` Remains Diagnostic-Only

The current `fold_impulse_constants.json` is useful as a finite diagnostic bound, but it is not an accepted constants artifact under this contract.

It remains diagnostic-only because:

- it explicitly reports `status=diagnostic_bound_not_interval_certified`;
- it performs no interval arithmetic and no dual-mollified quadrature;
- it sets
  $$
  M_\delta=1
  $$
  as a diagnostic convention rather than as an interval-certified mollifier norm;
- it uses full refined-mesh row rectangles rather than certified row-tube projections or direct interval quadrature over the row contribution;
- its reported separator constants are finite numerical ceilings, but not accepted interval enclosures tied to a proved coverage statement for
  $$
  E_B
  \qquad
  \text{and}
  \qquad
  S_B(t);
  $$
- it leaves `fold_constants_all_accepted=false`;
- it does not consume the 16 fold-layer rows or the 6 fold-adjacent parent boundary complements;
- and it preserves `branch_chart_authorized=false`.

Thus the correct current state remains:

`branch_chart_authorized: false`
