# Fold Full-Interval Fallback Legality

## Scope

This legality note belongs to packet `seed-doubled-four-arc-cosine-template-v0` and refinement `preledger-separator-level-split-v1`. It evaluates only whether the current fold-ceiling contracts permit an accepted fixed-parameter full-interval fallback using:

- full refined receiver/source intervals;
- the candidate compact-support shell mollifier;
- the packet coupling convention
  $$
  \Gamma=\kappa\epsilon^2=1.
  $$

It does not edit `causal_ledger.json`, does not edit any JSON constants artifact, does not consume rows, and does not authorize `branch_chart.json`.

## Sources Read

- `fold_impulse_bound_derivation.md`
- `fold_interval_constants_contract.md`
- `fold_mollifier_kernel_candidate.md`
- `fold_row_tube_coverage_attempt.md`
- `fold_row_consumption_report.md`
- `fold_parent_boundary_complement_packet.md`

## Verdict

The current fold-ceiling contracts **do permit** an accepted fixed-parameter full-interval fallback in principle, but only with strict limitations.

The fallback is legal only as **coarse fixed-parameter consumption** for the already fixed packet values
$$
\eta=0.02,
\qquad
\epsilon_c=0.05,
\qquad
c_f=1,
\qquad
h=2\pi,
\qquad
\Gamma=1.
$$
It may not be used to claim the intended
$$
O(\eta^{1/2})
$$
fold-transit scaling, and it may not be described as a certified row-tube projection route. It is also not direct quadrature: it is a mollifier-norm sup-bound route over full refined rectangles.

The accepted artifact would still need to bind every value to the same packet identity tuple and prove the inequalities interval-certified, rather than reusing diagnostic-only numerical tables.

## Legal Fallback Construction

For each fold row
$$
B=(I_\alpha^r,I_\beta^s,y),
\qquad
y\in\{u,w\},
$$
the full-interval fallback chooses
$$
E_B=I_\alpha^r,
\qquad
S_B(t)=I_\beta^s.
$$
This trivially covers the full refined receiver/source rectangle assigned to the row, so no smaller row-tube sublevel proof is being claimed.

With the candidate mollifier
$$
\delta(z)
=
\begin{cases}
\dfrac{15}{16}(1-z^2)^2, & |z|\le 1,\\[4pt]
0, & |z|>1,
\end{cases}
$$
the candidate packet proves
$$
M_\delta=\frac{15}{16},
\qquad
\|\delta_\eta\|_\infty=46.875
$$
for
$$
\eta=0.02.
$$
Thus the full-interval fallback may use
$$
I^{\mathrm{fold,full}}_{\eta,\epsilon_c,\Sigma}
\le
\frac{\Gamma M_\delta}{\eta\epsilon_c^2}
\sum_{B\in\mathcal{F}_\Sigma}
|I_\alpha^r|\,|I_\beta^s|.
$$
The derivation records
$$
\sum_{B\in\mathcal{F}_\Sigma}
|I_\alpha^r|\,|I_\beta^s|
=
0.602128395781
$$
for all four separators, hence
$$
I^{\mathrm{fold,full}}_{\eta,\epsilon_c,\Sigma}
\le
12042.56791562\,\Gamma M_\delta.
$$
Under the candidate mollifier and
$$
\Gamma=1,
$$
this specializes to
$$
I^{\mathrm{fold,full}}_{\eta,\epsilon_c,\Sigma}
\le
12042.56791562\cdot\frac{15}{16}.
$$

This is finite for every
$$
\Sigma\in\{\Sigma_1,\Sigma_2,\Sigma_3,\Sigma_4\},
$$
but it is intentionally coarse.

## Distinction From The Intended Row-Tube Route

The intended normal-form row-tube route requires a proof that each receiver projection satisfies
$$
L_{r,B}\le c_{\Sigma,B}\eta^{1/2}
$$
with the full mollifier support contained in the certified row-tube projection. The rejected coverage attempt shows that the inspected refined intervals and fold atlas do not yet prove such row-tube projections.

The full-interval fallback instead uses full refined receiver/source intervals. One can form finite diagnostic constants such as
$$
C_\Sigma^{\mathrm{full}}
\equiv
\eta^{-1/2}\sum_{B\in\mathcal{F}_\Sigma}|I_\alpha^r|,
$$
but these constants do not establish the intended transit scaling. They only repackage full interval lengths at the fixed value
$$
\eta=0.02.
$$

Therefore:

- the fallback is permitted as finite fixed-parameter consumption;
- the fallback is not a proof of
  $$
  O(\eta^{1/2})
  $$
  behavior as
  $$
  \eta\downarrow0;
  $$
- the fallback is not evidence of strict slack against adjacent arc budgets unless a separate budget artifact proves that slack.

## Distinction From Direct Quadrature

Direct quadrature would enclose each full dual-mollified row integral by interval quadrature under the same law:
$$
a^{\mathrm{fold}}_{\eta,\epsilon_c,B}(t)
=
\Gamma
\int_{S_B(t)}
\frac{\hat r_s(t;s)}
{|x(t)-x(s)|^2+\epsilon_c^2}\,
\delta_\eta\!\big(|x(t)-x(s)|-c_f(t-s)\big)\,ds.
$$

The full-interval fallback described here does not perform that quadrature. It uses the finite sup norm
$$
\|\delta_\eta\|_\infty\le \eta^{-1}M_\delta
$$
and the full interval product
$$
|I_\alpha^r|\,|I_\beta^s|.
$$
Thus an accepted fallback artifact must label its route as mollifier-norm full-interval fallback, not as direct quadrature.

## Acceptance Conditions For A Future Artifact

A future accepted constants artifact may use this fallback only if it records all of the following on the same packet identity tuple:

1. The candidate mollifier proof, including
   $$
   M_\delta=\frac{15}{16}.
   $$
2. The coupling convention
   $$
   \Gamma=\kappa\epsilon^2=1,
   $$
   or an interval enclosure for
   $$
   \Gamma
   $$
   if packet `g=1.0` is not exactly the same product.
3. For all 16 fold rows,
   $$
   E_B=I_\alpha^r,
   \qquad
   S_B(t)=I_\beta^s,
   $$
   with interval enclosures for
   $$
   L_{r,B}\ge |E_B|,
   \qquad
   L_{s,B}\ge \sup_{t\in E_B}|S_B(t)|.
   $$
4. Row impulse or separator aggregate inequalities proving finite
   $$
   I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
   $$
   for each separator.
5. Preservation of the fold atlas conditions
   $$
   \alpha_{\Sigma}>0,
   \qquad
   \nu_{\mathrm{exit},\Sigma}>0,
   \qquad
   \Delta N_\Sigma\in2\mathbb{Z},
   \qquad
   \Delta D_\Sigma=0.
   $$
6. An explicit status that the artifact is accepted interval-certified data, not diagnostic-only data.

The existing diagnostic attempts do not satisfy these conditions because they are not accepted interval-certified constants artifacts.

## Row Consumption Consequence

If a future artifact satisfies the acceptance conditions above, then the fallback may accept the 16 fold-layer rows as `fold_layer` rows, not as `simple_root` rows. The relevant rows are:

| Separator | Fold rows |
| --- | --- |
| $\Sigma_1$ | `R_w_F1_A0`, `R_w_F1_F1`, `R_w_A1_F1`, `R_w_A2_F1` |
| $\Sigma_2$ | `R_w_F2_A0`, `R_w_F2_A1`, `R_w_F2_F2`, `R_w_A2_F2` |
| $\Sigma_3$ | `R_u_F3_A2`, `R_u_F3_F3`, `R_u_A3_F3`, `R_u_A4_F3` |
| $\Sigma_4$ | `R_u_F4_A2`, `R_u_F4_A3`, `R_u_F4_F4`, `R_u_A4_F4` |

However, accepting those 16 rows by fallback would not by itself pass the full pre-ledger. The six fold-adjacent parent boundary complements must still be separately consumed by strict range-empty gaps
$$
\Delta^y_B>0
$$
or by coverage from accepted fold-layer alternatives on the same packet identity tuple.

Therefore the legality result is:

- **16 fold rows:** legally acceptable by a future interval-certified full-interval fallback artifact, with the limitations above.
- **Full pre-ledger:** not passable by this fallback alone; the six fold-adjacent parent boundary complements remain an independent closure obligation.
- **Branch chart:** still unauthorized until the full pre-ledger has no `split_required` rows.

## Current State

No present certificate state changes follow from this note. The existing correct state remains:

`branch_chart_authorized: false`
