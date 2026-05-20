# Fold Mollifier Kernel Candidate

## Scope

This is a candidate/local proof packet only for the fold-ceiling certificate on packet `seed-doubled-four-arc-cosine-template-v0` and refinement `preledger-separator-level-split-v1`.

It proposes a concrete compact-support normalized
$$
C^1
$$
shell mollifier candidate and proves its exact sup norm. It does not edit `causal_ledger.json`, does not accept fold constants, does not consume any fold row, and does not authorize `branch_chart.json`.

## Sources Read

- `fold_mollifier_coupling_audit.md`
- `fold_interval_constants_contract.md`
- `fold_interval_constants_attempt.json`
- `content/markdown/aaa/dynamics/master-equation.md`
- `content/markdown/aaa/proof-programs/collinear-breather.md`

## Candidate Kernel

Use the even polynomial kernel
$$
\delta(z)
=
\begin{cases}
\dfrac{15}{16}(1-z^2)^2, & |z|\le 1,\\[4pt]
0, & |z|>1.
\end{cases}
$$
For shell width
$$
\eta>0,
$$
set
$$
\delta_\eta(y)=\eta^{-1}\delta(y/\eta).
$$

This candidate is intended for the mollifier-norm route in the fold interval constants contract, where the dual-mollified absolute-time law uses
$$
\delta_\eta\!\big(|x(t)-x(s)|-c_f(t-s)\big)
$$
and requires a finite certified value
$$
M_\delta\ge \|\delta\|_\infty.
$$

## Support And Nonnegativity

By definition,
$$
\delta(z)=0
\qquad
\text{for}
\qquad
|z|>1,
$$
so
$$
\operatorname{supp}\delta\subset[-1,1].
$$
For
$$
|z|\le 1,
$$
one has
$$
(1-z^2)^2\ge 0
$$
and therefore
$$
\delta(z)\ge 0.
$$

The scaled shell has
$$
\operatorname{supp}\delta_\eta\subset[-\eta,\eta].
$$

## Endpoint $C^1$ Check

On the interior interval
$$
|z|<1,
$$
the derivative is
$$
\delta'(z)
=
\frac{15}{16}\cdot 2(1-z^2)(-2z)
=
-\frac{15}{4}z(1-z^2).
$$
At the endpoints,
$$
\delta(1)=\delta(-1)=0,
$$
matching the exterior value
$$
0.
$$
The one-sided interior derivatives are
$$
\delta'(1^-)
=
-\frac{15}{4}(1)(1-1)
=0,
$$
and
$$
\delta'(-1^+)
=
-\frac{15}{4}(-1)(1-1)
=0.
$$
The exterior derivative is also
$$
0.
$$
Thus the piecewise definition matches in both value and first derivative at
$$
z=\pm1,
$$
so
$$
\delta\in C^1_c(\mathbb{R}).
$$

## Normalization

The integral is
$$
\int_{\mathbb{R}}\delta(z)\,dz
=
\frac{15}{16}\int_{-1}^{1}(1-z^2)^2\,dz.
$$
Expand the polynomial:
$$
(1-z^2)^2=1-2z^2+z^4.
$$
Hence
$$
\int_{-1}^{1}(1-z^2)^2\,dz
=
\int_{-1}^{1}(1-2z^2+z^4)\,dz
=
2-\frac{4}{3}+\frac{2}{5}.
$$
Putting the terms over denominator
$$
15,
$$
gives
$$
2-\frac{4}{3}+\frac{2}{5}
=
\frac{30-20+6}{15}
=
\frac{16}{15}.
$$
Therefore
$$
\int_{\mathbb{R}}\delta(z)\,dz
=
\frac{15}{16}\cdot\frac{16}{15}
=
1.
$$
By the change of variables
$$
z=y/\eta,
\qquad
dy=\eta\,dz,
$$
the scaled shell also satisfies
$$
\int_{\mathbb{R}}\delta_\eta(y)\,dy=1.
$$

## Exact Sup Norm

For
$$
|z|\le 1,
$$
the factor
$$
(1-z^2)^2
$$
satisfies
$$
0\le (1-z^2)^2\le 1,
$$
with equality at
$$
z=0.
$$
Since the exterior value is
$$
0,
$$
the exact sup norm is
$$
\|\delta\|_\infty
=
\delta(0)
=
\frac{15}{16}.
$$
Thus the sharp candidate value is
$$
M_\delta=\frac{15}{16}.
$$

For the packet shell width
$$
\eta=0.02,
$$
the scaled shell satisfies
$$
\|\delta_\eta\|_\infty
=
\eta^{-1}\|\delta\|_\infty
=
\frac{1}{0.02}\cdot\frac{15}{16}
=
50\cdot\frac{15}{16}
=
\frac{750}{16}
=
46.875.
$$

## Blocker Removed If Adopted

If a later accepted interval constants artifact imports this kernel proof, binds it to the same packet identity tuple, and uses the same mollifier in its row estimates, then it removes the specific blocker:

> No concrete compact-support normalized shell mollifier is recorded with an interval-certified
> $$
> M_\delta\ge\|\delta\|_\infty.
> $$

The adopted mollifier-norm route may then use the exact value
$$
M_\delta=\frac{15}{16}
$$
and, for
$$
\eta=0.02,
$$
the exact scaled norm
$$
\|\delta_\eta\|_\infty=46.875.
$$

## Blockers Remaining

This packet does not remove the remaining fold-ceiling blockers. An accepted constants artifact still must provide:

- certified row-tube projections
  $$
  E_B
  $$
  and source-slice families
  $$
  S_B(t)
  $$
  covering the full mollifier contribution for every fold row;
- interval-certified row acceleration or row impulse enclosures for the 16 fold-layer rows;
- separator aggregate enclosures
  $$
  C_\Sigma,
  \qquad
  A_{\Sigma,\eta,\epsilon_c},
  \qquad
  I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma};
  $$
- a constants artifact that accepts the relevant fold rows under the same packet identity and coupling convention
  $$
  \Gamma=\kappa\epsilon^2=1;
  $$
- resolution or explicit downstream consumption of the six fold-adjacent parent boundary complements;
- updates to `fold_layer_atlas.json`, `causal_ledger.json`, or any equivalent accepted certificate state before `branch_chart.json` can be authorized.

Therefore this packet upgrades only the local mollifier-kernel component of the mollifier-norm route. It does not accept the diagnostic fold constants in `fold_interval_constants_attempt.json`, does not convert the full-rectangle diagnostic ceilings into interval enclosures, and does not authorize branch-chart promotion.
