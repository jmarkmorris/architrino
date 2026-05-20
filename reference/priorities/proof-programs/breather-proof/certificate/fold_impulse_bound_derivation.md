# Fold Impulse Bound Derivation

## Scope

This derivation belongs to packet `seed-doubled-four-arc-cosine-template-v0` and the refinement `preledger-separator-level-split-v1`. It does not edit `causal_ledger.json`, does not promote any row, and does not authorize `branch_chart.json`. It supplies the finite analytic ceiling form that a later constants artifact can instantiate for the current four separator layers
$$
\Sigma\in\{\Sigma_1,\Sigma_2,\Sigma_3,\Sigma_4\}.
$$

The result is theorem-grade only after the constants artifact records the mollifier norm, row-tube enclosures, and acceleration enclosures on the same packet identity tuple. Until then it is a conditional proof form, not a certificate pass.

All symbols introduced below for row projections, source slices, acceleration ceilings, and fallback bounds are local notation for this derivation artifact. They are not new project terminology.

## Fixed Law And Parameters

The fold rows must be evaluated from the dual-mollified absolute-time integral law, not from a branch sum with a collapsing
$$
|J_y|^{-1}
$$
factor. For a self-image fold row
$$
B=(I_\alpha^r,I_\beta^s,y),
\qquad
y\in\{u,w\},
$$
use the row-level contribution
$$
a^{\mathrm{fold}}_{\eta,\epsilon_c,B}(t)
=
\kappa\epsilon^2
\int_{S_B(t)}
\frac{\hat r_s(t;s)}
{|x(t)-x(s)|^2+\epsilon_c^2}\,
\delta_\eta\!\big(|x(t)-x(s)|-c_f(t-s)\big)\,ds.
$$
Here
$$
S_B(t)
\subseteq
I_\beta^s
$$
is the source slice of the certified row region. This `row region` language is local shorthand from the handoff, not a new project term.

For the current packet,
$$
c_f=1,
\qquad
\eta=0.02,
\qquad
\epsilon_c=0.05,
\qquad
h=2\pi.
$$
Let
$$
\Gamma\equiv\kappa\epsilon^2
$$
inside this derivation. The constants artifact must state whether the packet parameter `g=1.0` is being used as this same product.

## Assumptions

1. **Causal-surface mollifier.** Use the normalization from the collinear-breather proof scaffold:
   $$
   \delta_\eta(z)=\eta^{-1}\delta(z/\eta),
   \qquad
   \delta\in C_c^1(\mathbb{R}),
   \qquad
   \operatorname{supp}\delta\subset[-1,1],
   \qquad
   \int_{\mathbb{R}}\delta(z)\,dz=1.
   $$
   Define
   $$
   M_\delta\equiv\|\delta\|_\infty,
   \qquad
   \|\delta_\eta\|_\infty=\eta^{-1}M_\delta.
   $$
   If a Gaussian or any non-compact mollifier is chosen instead, the finite sup-norm bound still gives a crude finite full-memory ceiling, but support-based row-tube consumption is conditional on a declared tail cutoff or a full-tail quadrature enclosure.

2. **Core cutoff.** The core mollifier is fixed and positive:
   $$
   \epsilon_c>0.
   $$
   Hence
   $$
   |x(t)-x(s)|^2+\epsilon_c^2\ge\epsilon_c^2.
   $$

3. **Row-tube projection.** For each fold row
   $$
   B\in\mathcal{F}_\Sigma,
   $$
   the constants artifact must give a measurable receiver projection
   $$
   E_B\subseteq I_\alpha^r
   $$
   and source slices
   $$
   S_B(t)\subseteq I_\beta^s
   $$
   containing every point of the row where the chosen mollifier contributes. Define
   $$
   L_{r,B}\equiv |E_B|,
   \qquad
   L_{s,B}\equiv \sup_{t\in E_B}|S_B(t)|.
   $$
   The normal-form route should certify
   $$
   L_{r,B}\le c_{\Sigma,B}\eta^{1/2}
   $$
   with finite
   $$
   c_{\Sigma,B}.
   $$
   If this row-tube width is not certified, the full-interval fallback below remains finite but may be too coarse for later budget slack.

4. **Fold normal form.** On each separator layer, the stored atlas normal form must remain valid:
   $$
   y'(q_\Sigma)=0,
   \qquad
   |y''(q)|\ge\alpha_\Sigma>0,
   \qquad
   \inf_{q\in\partial I_\Sigma}\frac{|y'(q)|}{c_f}
   \ge\nu_{\mathrm{exit},\Sigma}>0.
   $$
   The current atlas records
   $$
   \alpha_{\Sigma,\min}=0.669228904575,
   \qquad
   \nu_{\mathrm{exit},\Sigma,\min}=0.055761655527.
   $$
   These floors are kinematic inputs; they do not by themselves bound the dual-mollified impulse.

## Row And Separator Constants

For each fold row define the row acceleration ceiling
$$
A_{B,\eta,\epsilon_c}
\equiv
\frac{\Gamma}{\epsilon_c^2}
\sup_{t\in E_B}
\int_{S_B(t)}
\delta_\eta\!\big(|x(t)-x(s)|-c_f(t-s)\big)\,ds.
$$
The immediate sup-norm enclosure is
$$
A_{B,\eta,\epsilon_c}
\le
\frac{\Gamma M_\delta}{\eta\epsilon_c^2}\,L_{s,B}.
$$
This is deliberately conservative. A sharper constants artifact may replace it by interval quadrature of the same integral, or by a local coarea-style enclosure. For example, when the source variable is the fold coordinate and the mollifier support is contained in the certified normal-form tube, a sufficient local sublevel estimate has the form
$$
\int_{S_B(t)}
\delta_\eta\!\big(|x(t)-x(s)|-c_f(t-s)\big)\,ds
\le
\frac{K_{\delta,\Sigma}}{\sqrt{\alpha_\Sigma\eta}},
$$
where
$$
K_{\delta,\Sigma}<\infty
$$
must be computed from the chosen mollifier and the interval remainder in the fold normal form.

Define the row impulse
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,B}
\equiv
\int_{E_B}
\left|a^{\mathrm{fold}}_{\eta,\epsilon_c,B}(t)\right|\,dt.
$$
Then
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,B}
\le
L_{r,B}A_{B,\eta,\epsilon_c}
\le
c_{\Sigma,B}\eta^{1/2}A_{B,\eta,\epsilon_c}.
$$

For a separator layer set
$$
C_\Sigma
\equiv
\sum_{B\in\mathcal{F}_\Sigma}c_{\Sigma,B},
$$
and choose
$$
A_{\Sigma,\eta,\epsilon_c}
\ge
\max_{B\in\mathcal{F}_\Sigma}
A_{B,\eta,\epsilon_c}.
$$
The finite separator ceiling is
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
\equiv
\sum_{B\in\mathcal{F}_\Sigma}
I^{\mathrm{fold}}_{\eta,\epsilon_c,B}.
$$
Therefore the constants artifact can consume the handoff inequality
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
\le
\eta^{1/2}
\sum_{B\in\mathcal{F}_\Sigma}
c_{\Sigma,B}A_{B,\eta,\epsilon_c}
\le
C_\Sigma\eta^{1/2}A_{\Sigma,\eta,\epsilon_c}.
$$

This proves finite impulse for fixed
$$
\eta>0,
\qquad
\epsilon_c>0,
\qquad
M_\delta<\infty,
\qquad
C_\Sigma<\infty,
\qquad
A_{\Sigma,\eta,\epsilon_c}<\infty.
$$
It does not prove a uniform
$$
\eta\downarrow0
$$
limit.

## Current Fold Rows

The separator row families are:

| Separator | Fold rows |
| --- | --- |
| $\Sigma_1$ | `R_w_F1_A0`, `R_w_F1_F1`, `R_w_A1_F1`, `R_w_A2_F1` |
| $\Sigma_2$ | `R_w_F2_A0`, `R_w_F2_A1`, `R_w_F2_F2`, `R_w_A2_F2` |
| $\Sigma_3$ | `R_u_F3_A2`, `R_u_F3_F3`, `R_u_A3_F3`, `R_u_A4_F3` |
| $\Sigma_4$ | `R_u_F4_A2`, `R_u_F4_A3`, `R_u_F4_F4`, `R_u_A4_F4` |

If no sharper row-tube projection is certified, a theorem-grade finite fallback uses full refined intervals:
$$
E_B=I_\alpha^r,
\qquad
S_B(t)=I_\beta^s.
$$
This fallback gives
$$
I^{\mathrm{fold,full}}_{\eta,\epsilon_c,\Sigma}
\le
\frac{\Gamma M_\delta}{\eta\epsilon_c^2}
\sum_{B\in\mathcal{F}_\Sigma}
|I_\alpha^r|\,|I_\beta^s|.
$$
For the current mesh and parameters,
$$
\eta=0.02,
\qquad
\epsilon_c=0.05,
$$
the full-interval product sum is the same for all four separators:
$$
\sum_{B\in\mathcal{F}_\Sigma}
|I_\alpha^r|\,|I_\beta^s|
=
0.602128395781,
$$
so
$$
I^{\mathrm{fold,full}}_{\eta,\epsilon_c,\Sigma}
\le
12042.56791562\,\Gamma M_\delta.
$$
This is finite and honest, but it is a coarse fixed-parameter bound. It should not be used to claim the intended
$$
O(\eta^{1/2})
$$
fold-transit scaling or strict slack against adjacent arc budgets.

The full-interval receiver constants, useful only as fallback diagnostics, are:

| Separator | $\sum_{B\in\mathcal{F}_\Sigma}|I_\alpha^r|$ | $C_\Sigma^{\mathrm{full}}\equiv\eta^{-1/2}\sum_B|I_\alpha^r|$ | $\max_B |I_\beta^s|$ |
| --- | ---: | ---: | ---: |
| $\Sigma_1$ | 3.141592653590 | 22.214414690793 | 0.848755401659 |
| $\Sigma_2$ | 2.168749701358 | 15.335376205265 | 1.129922584912 |
| $\Sigma_3$ | 2.292837251931 | 16.212807689975 | 1.697510803318 |
| $\Sigma_4$ | 1.319994299699 | 9.333769204448 | 1.697510803318 |

The preferred certificate route should replace these fallback receiver lengths by certified row-tube projections. If every one of the four rows touching a separator is certified to have receiver projection no longer than the listed separator layer width
$$
2\rho_t=0.157079632680,
$$
then the separator transit constant may be bounded by
$$
C_\Sigma
\le
4\,\frac{2\rho_t}{\sqrt{\eta}}
=
4.442882938173.
$$
That sharper value is conditional: it is accepted only if the constants artifact proves that the mollifier support for each of the four rows is actually contained in those row-tube projections.

## Pass Criteria For The Constants Artifact

For every
$$
\Sigma_k,
$$
the pass must record the tuple
$$
(\alpha_{\Sigma_k},\nu_{\mathrm{exit},\Sigma_k},C_{\Sigma_k},A_{\Sigma_k,\eta,\epsilon_c},I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma_k},\Delta N_{\Sigma_k},\Delta D_{\Sigma_k})
$$
on the same packet identity tuple. The constants pass succeeds only if all of the following hold:

1. The mollifier normalization is fixed and reports either
   $$
   M_\delta<\infty
   $$
   for the compact-support route or a direct quadrature enclosure for the chosen non-compact route.
2. The core cutoff satisfies
   $$
   \epsilon_c=0.05>0.
   $$
3. Every row in
   $$
   \mathcal{F}_{\Sigma_k}
   $$
   has a certified row-tube projection
   $$
   E_B
   $$
   and source slice family
   $$
   S_B(t)
   $$
   covering the full mollifier contribution assigned to that row.
4. The reported
   $$
   C_{\Sigma_k}<\infty
   $$
   satisfies
   $$
   C_{\Sigma_k}
   \ge
   \eta^{-1/2}
   \sum_{B\in\mathcal{F}_{\Sigma_k}}|E_B|.
   $$
5. The reported
   $$
   A_{\Sigma_k,\eta,\epsilon_c}<\infty
   $$
   satisfies
   $$
   A_{\Sigma_k,\eta,\epsilon_c}
   \ge
   \max_{B\in\mathcal{F}_{\Sigma_k}}
   \sup_{t\in E_B}
   \left|a^{\mathrm{fold}}_{\eta,\epsilon_c,B}(t)\right|.
   $$
6. The reported impulse ceiling satisfies
   $$
   I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma_k}
   \ge
   \sum_{B\in\mathcal{F}_{\Sigma_k}}
   I^{\mathrm{fold}}_{\eta,\epsilon_c,B}
   $$
   and
   $$
   I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma_k}
   \le
   C_{\Sigma_k}\eta^{1/2}A_{\Sigma_k,\eta,\epsilon_c}.
   $$
7. The fold atlas floors remain positive:
   $$
   \alpha_{\Sigma_k}>0,
   \qquad
   \nu_{\mathrm{exit},\Sigma_k}>0.
   $$
8. The parity data remain
   $$
   \Delta N_{\Sigma_k}\in2\mathbb{Z},
   \qquad
   \Delta D_{\Sigma_k}=0.
   $$
9. No fold row is emitted as a `simple_root` row, and no branch-sum residual is evaluated on a separator layer.

## Failure Modes

The fold-ceiling artifact fails immediately under any of these conditions:

- packet identity mismatch among `phi_cyc.json`, `mesh.json`, `mesh_refined_preledger_v1.json`, `causal_ledger.json`, `fold_layer_atlas.json`, and the constants artifact;
- absent or infinite
  $$
  M_\delta,
  \qquad
  C_\Sigma,
  \qquad
  A_{\Sigma,\eta,\epsilon_c},
  \qquad
  I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma};
  $$
- a non-compact mollifier is used with support-based row consumption but without a tail cutoff or full-tail quadrature enclosure;
- the core cutoff is missing, zero, or not the packet value
  $$
  \epsilon_c=0.05;
  $$
- a row-tube projection omits any part of the mollifier support assigned to a fold row;
- the normal-form floor
  $$
  \alpha_\Sigma>0
  $$
  or the exit floor
  $$
  \nu_{\mathrm{exit},\Sigma}>0
  $$
  is weakened to a non-positive interval;
- a separator has
  $$
  \Delta N_\Sigma\notin2\mathbb{Z}
  \qquad
  \text{or}
  \qquad
  \Delta D_\Sigma\ne0;
  $$
- direct quadrature is used but does not enclose every row in
  $$
  \mathcal{F}_\Sigma;
  $$
- any of the six fold-adjacent parent-row complements remains neither strict range-empty nor covered by an accepted fold-layer alternative.

## Constants Still Needed

Worker B or the coordinator must supply:

1. the chosen mollifier and its certified
   $$
   M_\delta
   $$
   or a direct quadrature enclosure;
2. the value of
   $$
   \Gamma=\kappa\epsilon^2
   $$
   and whether packet `g=1.0` is exactly this coupling product;
3. for every fold row
   $$
   B\in\mathcal{F}_\Sigma,
   $$
   certified
   $$
   E_B,
   \qquad
   S_B(t),
   \qquad
   L_{r,B},
   \qquad
   L_{s,B};
   $$
4. row acceleration enclosures
   $$
   A_{B,\eta,\epsilon_c}
   $$
   or direct interval quadrature values
   $$
   I^{\mathrm{fold}}_{\eta,\epsilon_c,B};
   $$
5. separator aggregates
   $$
   C_\Sigma,
   \qquad
   A_{\Sigma,\eta,\epsilon_c},
   \qquad
   I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma};
   $$
6. a row-consumption update proving that the 16 fold-layer rows and the 6 fold-adjacent parent rows no longer contain `split_required`.

Until those constants are accepted on the same packet identity, the correct state remains:

`branch_chart_authorized: false`
