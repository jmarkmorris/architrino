# Fold Mollifier Coupling Audit

## Scope

This audit covers packet `seed-doubled-four-arc-cosine-template-v0` and refinement `preledger-separator-level-split-v1`. It checks whether the current fold-ceiling packet has enough support to identify packet `g=1.0` with
$$
\Gamma=\kappa\epsilon^2
$$
and whether it can accept either a shell mollifier norm route or a direct quadrature route for the collinear-breather fold ceiling.

This file is an audit artifact only. It does not edit `causal_ledger.json`, does not edit `fold_layer_atlas.json`, does not accept any fold row, and does not authorize `branch_chart.json`.

## Sources Read

- `fold_interval_constants_contract.md`
- `fold_impulse_bound_derivation.md`
- `fold_impulse_constants.json`
- `phi_cyc.json`
- `mesh.json`
- `content/markdown/aaa/dynamics/master-equation.md`
- `content/markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md`
- `content/markdown/aaa/proof-programs/collinear-breather.md`

## Verdicts

### Coupling: packet `g=1.0` versus $\Gamma=\kappa\epsilon^2$

Verdict: **supported as the intended reduced coupling convention, but not by itself an accepted interval constant.**

The master-equation law uses
$$
\kappa |q_iq_j|
$$
and, for equal-magnitude charges,
$$
|q_iq_j|=\epsilon^2.
$$
The collinear-breather proof scaffold and the closed-form ansatz both use the reduced coupling convention
$$
g\equiv \kappa\epsilon^2.
$$
The packet `phi_cyc.json` fixes `g=1.0` in the packet parameter block, and `fold_impulse_constants.json` records `g_kappa_epsilon_squared=1` in its packet identity check. Therefore the current packet is internally consistent with the identification
$$
g=1.0=\Gamma=\kappa\epsilon^2
$$
for the diagnostic fold-ceiling calculation.

This does not make the fold constants accepted. An accepted constants artifact must still state this convention explicitly on the same packet identity tuple and must either use
$$
\Gamma=1
$$
as the exact packet coupling product or provide an interval enclosure for
$$
\Gamma.
$$
The current evidence is enough to remove coupling-name ambiguity; it is not enough to promote the diagnostic numerical ceilings to accepted interval constants.

### Shell mollifier normalization and norm

Verdict: **not accepted now.**

The canonical proof scaffold fixes the shell normalization
$$
\delta_\eta(y)=\eta^{-1}\delta(y/\eta),
\qquad
\operatorname{supp}\delta\subset[-1,1],
\qquad
\int_{\mathbb{R}}\delta(y)\,dy=1,
$$
and uses
$$
\|\delta_\eta\|_\infty=\eta^{-1}\|\delta\|_\infty.
$$
The fold contract correctly requires a certified finite enclosure
$$
M_\delta\ge\|\delta\|_\infty.
$$

The inspected packet does not declare a concrete compact-support kernel with an interval proof of
$$
M_\delta.
$$
Instead, `fold_impulse_constants.json` sets
$$
M_\delta=1
$$
as a diagnostic convention and explicitly marks it `diagnostic_bound_not_interval_certified`. That is useful for scale testing, but it fails the mollifier-norm route in the contract.

### Direct quadrature route

Verdict: **not available now.**

The contract allows direct quadrature only if the artifact supplies interval quadrature enclosures for the full dual-mollified row integrals assigned to every fold row in
$$
\mathcal{F}_\Sigma.
$$
The current constants JSON explicitly reports `no_dual_mollified_quadrature_performed=true`. Its row values are full-rectangle sup-norm bounds, not interval quadrature enclosures of
$$
a^{\mathrm{fold}}_{\eta,\epsilon_c,B}(t)
=
\Gamma
\int_{S_B(t)}
\frac{\hat r_s(t;s)}
{|x(t)-x(s)|^2+\epsilon_c^2}\,
\delta_\eta\!\big(|x(t)-x(s)|-c_f(t-s)\big)\,ds.
$$
Therefore the direct quadrature route cannot be consumed for accepted constants.

## Accepted Constants Decision

Verdict: **accepted interval constants are not allowed now.**

The packet supports the reduced coupling convention
$$
g=1.0=\Gamma=\kappa\epsilon^2
$$
well enough for a future accepted artifact to use it, but the present fold-ceiling packet remains diagnostic-only. The current state does not satisfy either accepted route:

- no concrete compact-support shell mollifier is recorded with an interval-certified
  $$
  M_\delta\ge\|\delta\|_\infty;
  $$
- no direct interval quadrature encloses the full dual-mollified contribution for every row in
  $$
  \mathcal{F}_\Sigma;
  $$
- no interval arithmetic is performed in `fold_impulse_constants.json`;
- the reported bounds use full refined-mesh row rectangles rather than certified row-tube projections
  $$
  E_B,\qquad S_B(t)
  $$
  with coverage of the full mollifier contribution;
- the row acceleration and row impulse values are diagnostic finite ceilings, not interval-certified enclosures;
- separator aggregates
  $$
  C_\Sigma,\qquad A_{\Sigma,\eta,\epsilon_c},\qquad I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
  $$
  are not accepted interval aggregates;
- the packet is still marked `preledger_not_accepted`, `fold_constants_all_accepted=false`, and `branch_chart_authorized=false`;
- the 16 fold-layer rows and the 6 fold-adjacent parent boundary complements remain unresolved for row consumption.

## Minimal Unblocking Routes

The coupling issue is the easiest part: carry the exact declaration
$$
\Gamma=\kappa\epsilon^2=1
$$
into the accepted constants artifact, bound it to the same packet identity tuple, and keep the same
$$
T_{\mathrm{cyc}}=2\pi,\qquad c_f=1,\qquad \eta=0.02,\qquad \epsilon_c=0.05,\qquad h=2\pi.
$$

After that, one of two mathematical routes is still required.

1. **Mollifier-norm route.** Declare the actual compact-support normalized shell mollifier, prove an interval enclosure for
   $$
   M_\delta\ge\|\delta\|_\infty,
   $$
   certify row-tube projections and source slices covering the full shell support, then recompute row and separator enclosures as interval bounds.
2. **Direct quadrature route.** Provide interval quadrature enclosures for every fold row under the full dual-mollified law. If the chosen mollifier is non-compact, the quadrature must include a certified tail cutoff or a full-tail enclosure.

Until one of those routes is completed, the finite value
$$
I^{\mathrm{fold,full}}_{\eta,\epsilon_c,\Sigma}
\le
12042.56791562\,\Gamma M_\delta
$$
remains a diagnostic full-rectangle ceiling only. It is not an accepted fold certificate, does not prove the intended
$$
O(\eta^{1/2})
$$
fold-transit scaling, and does not authorize branch-chart promotion.
