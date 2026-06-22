# Specific Branch Response Insertion

Promotion status: `priority-only`.

This packet inserts actual root-ledger data into [minimal-worked-branch-response](minimal-worked-branch-response.md). The cleanest available source is not yet the exact-antipodal $M=3$ dynamics row, because that row has aggregate trust data but no full per-root exposure table. The cleanest available insertion target is the certified rigid octahedral all-pairs causal-root ledger in [octahedral-root-ledger-certification-target](../braid/neutral-braid/octahedral-root-ledger-certification-target.md).

The result is a branch-response row for the root ledger, not a retained dynamics branch. The rigid octahedral packet explicitly says its all-pairs root ledger is certified while dynamics, action, Noether, event, stability, observer-export, shell braid, and nested shell braid rows remain separate. This packet respects that boundary.

## Source Branch Record

Use the rigid octahedral carrier

$$
\mathbf{p}_1(\theta),-\mathbf{p}_1(\theta),
\mathbf{p}_2(\theta),-\mathbf{p}_2(\theta),
\mathbf{p}_3(\theta),-\mathbf{p}_3(\theta),
$$

with ordered distinct-pair policy

$$
\Pi_{\mathrm{all}}^{\mathrm{oct}}
=
\{
((a,\sigma),(b,\sigma')):(a,\sigma)\ne(b,\sigma')
\},
\qquad
|\Pi_{\mathrm{all}}^{\mathrm{oct}}|=30.
$$

For each ordered pair, let $y_{ij}(\theta)$ be the certified positive-delay root of

$$
G_{ij}(\theta,y)
=
\left\|
\sigma\mathbf{p}_a(\theta)
-
\sigma'\mathbf{p}_b(\theta-y)
\right\|
-y
=0.
$$

The source packet supplies the following root data:

| Root class | Multiplicity | Delay data | Jacobian data |
| --- | ---: | --- | --- |
| antipodal partner | $6$ | $y_*\in[1.47817026642,1.47817026644]$ | $J_*\in[1.673612029179,1.673612029187]$ |
| cross-binary $\kappa=+1$ | $12$ | $y\in[0.636732650805282,1.418310091622525]$ | $J>0$ with global floor below |
| cross-binary $\kappa=-1$ | $12$ | $y\in[1.409624004002596,1.979320146556212]$ | $J>0$ with global floor below |

The certified analytic Jacobian floor is

$$
J_{\min}^{\mathrm{oct}}\ge J_0,
\qquad
J_0\approx0.3798562906.
$$

The sharper sampled floor in the source packet is $J_{\min,\mathrm{cross}}\approx0.7284199113$, but the analytic floor is the certified value used for bounds here.

## Inserted Root-Delay Response

Apply the isotropic support deformation from the symbolic packet,

$$
\mathsf{D}_{\varepsilon}=(1+\varepsilon)I,
\qquad |\varepsilon|\ll1.
$$

Every simple fixed-speed root in this ledger obeys

$$
\delta y_{ij}
=
\frac{y_{ij}}{J_{ij}}\varepsilon.
$$

For the six antipodal-partner rows this becomes the concrete row

$$
\boxed{
\delta y_*
=
0.8832215834\,\varepsilon
}
$$

using the midpoint values $y_*=1.47817026643$ and $J_*=1.673612029183$.

For the whole all-pairs root ledger, define the normalized phase-pair average

$$
\langle f\rangle_{\mathrm{oct}}
=
\frac{1}{2\pi\cdot30}
\int_0^{2\pi}
\sum_{i\ne j} f_{ij}(\theta)\,d\theta .
$$

If the period-facing row uses the all-pairs delay sum with no phase correction, the inserted response is

$$
\delta\ln T_{\mathrm{oct,root}}
=
\varepsilon
\frac{
\langle y/J\rangle_{\mathrm{oct}}
}{
\langle y\rangle_{\mathrm{oct}}
}.
$$

The certified floor alone gives the interval-symbolic bound

$$
\boxed{
\frac12\,\varepsilon
\le
\delta\ln T_{\mathrm{oct,root}}
\le
\frac{1}{J_0}\,\varepsilon
\approx
2.6325745413\,\varepsilon
}
$$

for $\varepsilon>0$, with the inequalities reversed for $\varepsilon<0$. The lower endpoint uses the fixed-speed fact $0<J_{ij}\le2$.

Numerical midpoint quadrature of the analytic root functions over $5760$ phase nodes gives

$$
\boxed{
\delta\ln T_{\mathrm{oct,root}}
\approx
0.8460213966\,\varepsilon .
}
$$

This is the first actual branch-root insertion into the geometry-bridge period row. The interval bound is certificate-level from the root ledger. The decimal coefficient is a numerical quadrature row, not yet an interval quadrature certificate.

## Inserted Exposure Response

Use equal all-pairs exposure weights for this diagnostic insertion:

$$
\mathsf{W}_{\mathrm{ext},ij}=1,
\qquad
w_{ij}=\frac{1}{y_{ij}^2J_{ij}},
$$

where $J_{ij}>0$ on this ledger. Define

$$
\mathcal{Z}_{\mathrm{oct}}^{ab}
=
\left\langle
w_{ij}\widehat R_{ij}^a\widehat R_{ij}^b
\right\rangle_{\mathrm{oct}} .
$$

The same numerical quadrature gives

$$
\mathcal{Z}_{\mathrm{oct}}^{ab}
\approx
\begin{pmatrix}
0.1777383816 & -0.0031026663 & -0.0031026663\\
-0.0031026663 & 0.1777383816 & -0.0031026663\\
-0.0031026663 & -0.0031026663 & 0.1777383816
\end{pmatrix}.
$$

The trace-free part is therefore small but nonzero:

$$
\mathcal{Z}_{\mathrm{oct,tf}}^{ab}
\approx
\begin{pmatrix}
0 & -0.0031026663 & -0.0031026663\\
-0.0031026663 & 0 & -0.0031026663\\
-0.0031026663 & -0.0031026663 & 0
\end{pmatrix}.
$$

Under the isotropic support probe,

$$
\delta\mathcal{Z}_{\mathrm{tf}}^{ab}
=
-2\varepsilon
\left\langle
\frac{w_{ij}}{J_{ij}}
\left(
\widehat R_{ij}^a\widehat R_{ij}^b-\frac13h^{ab}
\right)
\right\rangle_{\mathrm{oct}} .
$$

The inserted numerical row is

$$
\boxed{
\delta\mathcal{Z}_{\mathrm{oct,tf}}^{ab}
\approx
\varepsilon
\begin{pmatrix}
0 & -0.0002267176 & -0.0002267176\\
-0.0002267176 & 0 & -0.0002267176\\
-0.0002267176 & -0.0002267176 & 0
\end{pmatrix}.
}
$$

This is the key geometry advance. An isotropic support deformation does not merely rescale a scalar delay. Even on the symmetric rigid octahedral all-pairs root ledger, the causal-root weighting leaves a small trace-free spatial-compliance response under equal exposure weights. That response is root-ledger geometry before any effective metric is assumed.

## Inserted Interface Row

If the assembly-interface diagnostic locks to this same all-pairs root population with equal locked weights, then

$$
\left\langle\frac1J\right\rangle_{\mathrm{oct}}
\approx
0.8265938388
$$

by the same numerical quadrature, while the certified floor gives

$$
\frac12
\le
\left\langle\frac1J\right\rangle_{\mathrm{oct}}
\le
\frac1{J_0}
\approx
2.6325745413.
$$

The interface displacement row from the symbolic packet becomes

$$
\boxed{
\delta s_X
\approx
\frac{
1.6531876776\,\varepsilon\,D_{a,X}(1-D_{a,X})
}{
\|\nabla D_{a,X}\|
}
}
$$

under this equal-weighted all-pairs interface convention.

## Aggregate Bound For Floor-Only Branch Data

The same calculation also gives the exact status of branch candidates that supply only root count and a Jacobian floor. Fix any same-branch root ledger with simple roots, fixed Jacobian signs, and

$$
|J_\rho|\ge J_{\min}>0.
$$

For the isotropic probe,

$$
\delta\eta_\rho
=
\frac{\eta_\rho}{J_\rho}\varepsilon,
\qquad
|\delta\eta_\rho|
\le
\frac{\eta_\rho}{J_{\min}}|\varepsilon|.
$$

Let

$$
S_H=\sum_{\rho\in\mathcal{H}_B}\eta_\rho,
\qquad
P_B=S_H+\mathcal{R}_{\mathrm{phase},B}.
$$

If $\delta\mathcal{R}_{\mathrm{phase},B}=0$, then

$$
\boxed{
|\delta\ln T_B|
\le
\frac{|\varepsilon|}{J_{\min}}
\frac{S_H}{|P_B|}.
}
$$

If $P_B>0$ and $\mathcal{R}_{\mathrm{phase},B}\ge0$, this reduces to

$$
|\delta\ln T_B|\le\frac{|\varepsilon|}{J_{\min}}.
$$

For the trace-free exposure tensor, define

$$
P_{\mathrm{tf}}^{ab}(\widehat R_\rho)
=
\widehat R_\rho^a\widehat R_\rho^b-\frac13h^{ab}
$$

and

$$
U_Z^{ab}
=
\left\langle
\sum_{\rho\in\mathcal A_B^{\mathrm{ext}}}
\mathsf W_{\mathrm{ext},\rho}
\frac{\operatorname{sgn}(J_\rho)}
{\eta_\rho^2|J_\rho|^2}
P_{\mathrm{tf}}^{ab}(\widehat R_\rho)
\right\rangle_B .
$$

Then

$$
\boxed{
\delta\mathcal Z_{\mathrm{tf}}^{ab}
=
-2\varepsilon\,U_Z^{ab}.
}
$$

Without $U_Z^{ab}$, the ledger can supply only a norm envelope:

$$
\boxed{
\|\delta\mathcal Z_{\mathrm{tf}}\|_F
\le
\frac{2|\varepsilon|}{J_{\min}^2}
\sqrt{\frac23}
\left\langle
\sum_{\rho}
\frac{|\mathsf W_{\mathrm{ext},\rho}|}{\eta_\rho^2}
\right\rangle_B .
}
$$

For the interface row,

$$
\boxed{
|\delta s_X|
\le
\frac{
2|\varepsilon|D_{a,X}(1-D_{a,X})
}{
J_{\min}\|\nabla D_{a,X}\|
}
\le
\frac{|\varepsilon|}{2J_{\min}\|\nabla D_{a,X}\|}.
}
$$

Thus root count plus a Jacobian floor is enough to bound the response, but not enough to certify a signed nonzero exposure tensor. Two branches can have the same count and floor while one has isotropically paired root directions that cancel $\mathcal Z_{\mathrm{tf}}$ and another has anisotropic root directions that do not. The first missing mathematical input for a signed geometry export is therefore the aggregate tensor $U_Z^{ab}$ or the underlying per-root table, not another requirement artifact.

## Exact-Antipodal $M=3$ Status

The exact-antipodal $M=3$ row remains the preferred dynamics continuation target, but it cannot yet be inserted into the specific response rows at the same level. The available $M=3$ packets provide:

| Available $M=3$ datum | Status |
| --- | --- |
| restricted equal-period rank | full $52$-column rank |
| fixed-window root convention | $5$-$5$ through $\rho=0.3$ under $\eta_{\max}=4$ |
| memory-frontier correction | roots beyond $\eta=4$ reappear under $\eta_{\max}=4.5$ |
| strongest current continuation target | $\rho=0.8$ with $\eta_{\max}=4.5$, $r_{\max}=2.7605787625$, and largest active root about $4.4058154936$ |
| unresolved support tail | $(4.5,5.5211575250]$, using the support bound $2r_{\max}=5.5211575250$ |
| first missing insertion input | full per-root table $(\rho,\eta_\rho,J_\rho,\widehat R_\rho,\mathsf{W}_{\mathrm{ext},\rho})$ on one active memory/action convention |

Thus the first missing mathematical input for the $M=3$ branch is not another gate. It is the retained per-root exposure table on the chosen memory convention. Once that table exists, the formulas in this packet compute $\delta\ln T_B$, $\delta\mathcal{Z}_{\mathrm{tf}}^{ab}$, and $\delta s_X$ directly.

The support-tail status matters because a geometry-export packet cannot choose between a signed tensor, a cancellation, or an additional tail contribution while the interval $(4.5,5.5211575250]$ has neither exclusion nor assimilation. For $M=3$, the current response status is therefore `response-open: active-window-only`, not `response-rejected`.

## Bounded-Speed Successor Status

The bounded-speed route is also `response-open`, but for a different reason. No current bounded-speed packet supplies a live retained ledger with the variables

$$
\chi_i,\quad
\Lambda_i,\quad
\eta_r,\quad
J_r^\nu,
$$

fixed sign strata, derivative columns, tail status, and same-ledger force/action/event consumer checksums. The fixed-speed octahedral root ledger above cannot be reused as a bounded-speed response row after $\nu_i$ becomes a branch variable, because the roots, Jacobians, clocks, delayed directions, and force weights all change together. The first missing bounded-speed insertion input is therefore the live bounded-speed root table and consumer checksum, not an additional observer-export condition.

## Response Classification

| Object | Classification | Reason |
| --- | --- | --- |
| rigid octahedral all-pairs root ledger insertion | `response-passed-root-ledger` | certified root count, delay bands, and positive Jacobian floor let the isotropic response formulas consume an actual ledger |
| rigid octahedral retained branch | `response-open` | dynamics, action, Noether, event, stability, and observer-export rows remain open or failed in the source workstream |
| exact-antipodal $M=3$ dynamics branch | `response-open` | aggregate trust rows exist, but the per-root geometry exposure table is not emitted on one memory/action convention |
| bounded-speed successor | `response-open` | no bounded-speed live ledger currently supplies roots, Jacobians, force/action/event rows, and exposure weights on one retained branch |

## Promotion Decision

This packet stays `priority-only`. The root-ledger response theorem target can be promoted later, but the numerical octahedral tensor should not enter reader-facing corpus prose until either:

1. an interval quadrature certificate replaces the midpoint numerical row; or
2. a retained dynamics/action branch consumes the same root ledger and reproduces the geometry-export packet on one ledger.

The durable mathematical advance is already captured here: the geometry bridge now has a branch-specific calculation, and its first trace-free exposure coefficient is nonzero under the all-pairs root weighting.
