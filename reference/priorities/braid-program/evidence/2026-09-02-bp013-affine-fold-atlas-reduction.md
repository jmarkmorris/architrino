# BP-013 Affine Fold-Atlas Reduction

Status: exact fold-sheet parameterization derived; outward-rounded cover open

## Scope

This packet advances the alternating $2{:}2$ nonuniform-phase census on the declared $D_4$ gap chamber, $g_i\geq0.01$ and $0.05\leq\beta_f\leq20$, with normalized wake speed $c_f=1$. It reduces every directed causal-fold hypersurface to an affine gap sheet coupled to one scalar speed function. It does not certify a topology cell, a full-vector zero census, or uniqueness of the regular square.

## Directed-channel fold equation

For receiver phase $\phi_i$, transmitter phase $\phi_j$, lifted difference $\delta_{ij}=\phi_i-\phi_j$, and causal delay angle $\chi>0$, set

$$
u=\frac{\delta_{ij}+\chi}{2}.
$$

The causal equation is

$$
H(u;\delta_{ij},\beta_f)
=\beta_f|\sin u|-u+\frac{\delta_{ij}}2=0,
\qquad
0<2u-\delta_{ij}\leq2\beta_f.
$$

On the open lobe $\ell\pi<u<(\ell+1)\pi$, $H$ is strictly concave because

$$
\partial_u^2H=-\beta_f|\sin u|<0.
$$

For $\beta_f>1$, its unique stationary maximum is at

$$
u_*=\ell\pi+\alpha,
\qquad
\alpha=\arccos(1/\beta_f).
$$

Define

$$
L(\beta_f)
=2\left(
\sqrt{\beta_f^2-1}-\arccos(1/\beta_f)
\right).
$$

The maximum value is

$$
H(u_*)=\frac{L(\beta_f)+\delta_{ij}-2\ell\pi}{2}.
$$

Hence every interior directed-channel fold lies on the exact sheet

$$
\boxed{
\delta_{ij}=2\ell\pi-L(\beta_f)
}.
$$

Within an untruncated lobe, the sign of $L(\beta_f)+\delta_{ij}-2\ell\pi$ gives respectively two ordinary roots, one fold root, or no root. A lobe cut by either delay endpoint is handled by the same concavity plus endpoint signs; no free root search is needed to discover an additional interior fold.

Plainly: a causal topology change occurs only when one affine phase difference meets one known scalar curve of speed. The four-dimensional cover can be cut along named sheets before any interval acceleration evaluation.

## Affine gap coordinates and finite atlas

On the accepted quotient coordinates,

$$
(\phi_0,\phi_1,\phi_2,\phi_3)
=(0,g_0,g_0+g_1,g_0+g_1+g_2),
$$

so every $\delta_{ij}$ is an integer-coefficient affine form in $(g_0,g_1,g_2)$, with $g_3=2\pi-g_0-g_1-g_2$. The fold sheets are therefore affine in the three gap coordinates after adjoining the single monotone coordinate $\lambda=L(\beta_f)$.

Before applying the $D_4$ chamber symmetries, the sixteen directed channels collapse to thirteen distinct affine forms:

$$
0,
\quad
\pm g_0,
\quad
\pm g_1,
\quad
\pm g_2,
\quad
\pm(g_0+g_1),
\quad
\pm(g_1+g_2),
\quad
\pm(g_0+g_1+g_2).
$$

The zero form has multiplicity four from the same-transmitter channels; every other displayed form belongs to one directed pair. Thus the raw $16\times7=112$ fold-sheet candidates reduce to at most $13\times7=91$ distinct sheets before chamber feasibility and $D_4$ equivalence remove more.

Because $-2\pi<\delta_{ij}<2\pi$ on the collision-free chamber and $0<L(\beta_f)<L(20)<12\pi$, only $\ell=0,1,\ldots,6$ can intersect the declared domain. The last inequality follows without decimal sampling: the alternating cosine series gives $\cos(3/2)>1-9/8+81/384-729/46080=359/5120>1/20$, hence $\arccos(1/20)>3/2$; together with $\sqrt{399}<20$ and $\pi>31/10$, this gives $L(20)<37<12\pi$. Thus $\ell\leq-1$ forces $\delta_{ij}\leq-2\pi$, while $\ell\geq7$ forces $\delta_{ij}>2\pi$. The speed interval first splits at $\beta_f=1$; below that value no interior lobe maximum exists. Above it, the cover needs only the finite family

$$
\delta_{ij}+L(\beta_f)-2\ell\pi=0,
\qquad
i,j\in\{0,1,2,3\},
\quad
\ell\in\{0,\ldots,6\},
$$

followed by exact removal of duplicates, impossible sheets, and zero-delay self roots. This is a finite source-bound fold atlas for all sixteen directed channels, including the four same-transmitter channels whose coincident zero root is excluded while nontrivial roots are retained.

The tracked symbolic manifest [derive_bp013_affine_fold_atlas.py](../../../../scripts/equation-mapping/derive_bp013_affine_fold_atlas.py) performs the first two exact reductions. Positive difference forms can intersect only $\ell=1,\ldots,6$, negative forms only $\ell=0,\ldots,5$, and the zero form only $\ell=0,\ldots,5$ on $L(\beta_f)<12\pi$. The resulting manifest has 78 sign-feasible sheets before the gap-polytope and $D_4$ reductions. It preserves all sixteen directed owners, including the fourfold zero-form multiplicity.

Plainly: the certificate no longer has to hunt for fold surfaces. It can enumerate a finite list, intersect each with the $D_4$ chamber, and then certify roots inside the resulting cells.

## Consequence for the continuous certificate

The next outward-rounded implementation can use $\lambda=L(\beta_f)$ as a monotone topology coordinate. In each open atlas cell it must still:

1. certify the admitted delay interval and lobe endpoints for every directed channel;
2. use strict concavity and endpoint signs to own all zero, one, or two roots and exclude the complementary delay intervals;
3. evaluate all seven full-vector rows;
4. reject boxes by any sign-definite row; and
5. apply interval Newton or Krawczyk to the selected four-row subsystem on survivors.

The affine atlas removes fold discovery from the four-dimensional branch-and-bound problem, but it does not remove root enclosure or the seven-row balance obligation.

## Boundary and falsifier

Derived: the lobe concavity, stationary point, fold-sheet equation, affine gap dependence, and finite lobe-index range. Open: an outward-rounded implementation, exact duplicate-sheet reduction on the $D_4$ chamber, complete root ownership in every atlas cell, and the full-vector zero census.

The reduction is falsified by an interior multiple causal root not satisfying the boxed sheet equation, a relevant lobe with $\ell\notin\{0,\ldots,6\}$ inside the declared delay and phase bounds, a phase difference not affine in the declared gaps, or a truncated-lobe root count inconsistent with concavity and certified endpoint signs.

Closure goal: implement the finite affine fold atlas with outward-rounded $L(\beta_f)$ bounds, then certify complete directed-root ownership and all seven balance rows cell by cell.
