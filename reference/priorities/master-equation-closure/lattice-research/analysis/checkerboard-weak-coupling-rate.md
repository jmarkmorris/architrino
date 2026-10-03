# Weak-coupling rate of the coherent checkerboard mode

## Result and scope

Let $K=\kappa q_0^2>0$, lattice spacing $\ell$, and $g=K/(c_f^2\ell)$. Write the dimensional growth rate as $\gamma$ and its dimensionless version as $s=\gamma\ell/c_f$. The [coherent-mode equation](staggered-lattice-displacement-equation.md#4-same-polarity-geometry-and-the-initial-growth-allocation) is

$$
s=\frac g3\Sigma(s),\qquad
\Sigma(s)=\sum_{d\in\mathbb Z^3\setminus\{0\}}
\frac{e^{-s|d|}}{|d|^2}.
$$

Its unique positive root satisfies

$$
s_g^2=\frac{4\pi}{3}g\,[1+O(\sqrt g)],\qquad
\gamma_g^2=\frac{4\pi}{3}K n_{\rm arch}\,[1+O(\sqrt g)],
\qquad n_{\rm arch}=\ell^{-3},\quad g\downarrow0.
$$

Here $n_{\rm arch}$ counts all sites, including both polarities; it is not a single-sublattice density, braid density or the sea packet's normalized density $n$. The result is derived and self-reviewed without independent adjudication. It concerns the linearization about the verified stationary checkerboard, with complete ancient decaying histories and the retained stationary block convention. It is not a rate theorem for a disordered population or a population of neutral braids. Numerical instantiations use $c_f=1$.

## A uniform sum–integral estimate

Put $f_s(x)=e^{-s|x|}/|x|^2$. For $0<s\le1$,

$$
\int_{\mathbb R^3}f_s(x)\,dx
=4\pi\int_0^\infty e^{-sr}\,dr=\frac{4\pi}{s}.
$$

The origin singularity is integrable in three dimensions. Partition space into centered unit cubes $Q_d=d+[-1/2,1/2]^3$. The integral over $Q_0$ and contributions from the finitely many cubes with $0<|d|<2$ are bounded uniformly in $s$. These cubes require direct integral bounds rather than differentiating through the origin.

For $|d|\ge2$, Taylor expand about $d$. The integral of the first-order term vanishes by cube symmetry. The cube error is bounded by a fixed constant times the supremum of the Hessian on $Q_d$. Radial differentiation gives

$$
f_s'(r)=-e^{-sr}\left(\frac{s}{r^2}+\frac2{r^3}\right),
\qquad
f_s''(r)=e^{-sr}\left(\frac{s^2}{r^2}+\frac{4s}{r^3}+\frac6{r^4}\right).
$$

The radial Hessian eigenvalues are $f_s''(r)$ and $f_s'(r)/r$. Since $|x|\ge|d|/2$ on these cubes, their errors are bounded by

$$
C e^{-s|d|/2}
\left(\frac{s^2}{|d|^2}+\frac{s}{|d|^3}+\frac1{|d|^4}\right).
$$

The number of lattice centers in a unit radial shell is at most $C_1(m+1)^2$: disjoint unit cubes fit inside an annulus enlarged by $\sqrt3/2$. Consequently the total far-cube error is bounded by a constant times

$$
s^2\sum_{m\ge1}e^{-sm/2}
+s\sum_{m\ge1}\frac{e^{-sm/2}}m
+\sum_{m\ge1}\frac1{m^2}.
$$

The first term is $O(s)$, the second $O(s[1+|\log s|])$, and the last finite. All are uniformly bounded for $0<s\le1$. Summing cube integrals therefore proves

$$
\Sigma(s)=\frac{4\pi}{s}+E(s),\qquad |E(s)|\le C_0,
\quad 0<s\le1,
$$

for a finite universal constant. This proof specifies the asymptotic error order; it does not supply a tight numerical value of $C_0$ or an empirical threshold for usable coupling.

## Locating the root

The [general-mode note](checkerboard-linear-wavevectors.md#a-positive-growth-root-at-every-coupling) proves existence and uniqueness by positivity and monotonicity of $\Sigma$. As $g\downarrow0$, its root tends to zero: for any fixed $\delta>0$, a root at least $\delta$ would require $\delta\le g\Sigma(\delta)/3$, which fails for sufficiently small $g$.

For the small root, multiplying the characteristic equation by $s_g$ gives

$$
s_g^2=\frac{4\pi g}{3}+\frac g3s_gE(s_g).
$$

Since $s_g\to0$, the ratio $s_g^2/g$ tends to $4\pi/3$, so $s_g=O(\sqrt g)$. The bounded remainder then yields the stated relative $O(\sqrt g)$ error, and also $s_g=\sqrt{4\pi g/3}+O(g)$. The leading continuum coefficient is fixed by the three-dimensional integral; no standard plasma equation is used as a premise.

## Interpretation and a prospective independent check

This is the small-coupling limit of an exponentially growing coherent polarity-staggered mode, not a propagating acoustic mode. It supplies no collective signal speed. The limit requires $s_g\ll1$, equivalently small $g$ asymptotically. A numerical boundary such as $g\ll0.24$ is not certified by the unspecified error constant. The $g=16$ reference is outside this limit.

A future separately authored sum evaluator needs explicit infinite-tail bounds, not just a finite lattice cutoff. An analytical control for its shell census and tail treatment is the separable sum

$$
\sum_{d\in\mathbb Z^3\setminus\{0\}}e^{-s\|d\|_1}
=\left(\frac{1+e^{-s}}{1-e^{-s}}\right)^3-1.
$$

Pass that control first, then the existing coherent-root bracket at $g=16$, before testing smaller couplings against $s_g^2/g\to4\pi/3$. The separable control alone does not validate the Euclidean kernel or its tail; those need their own bounds. No evaluator or root instrument was run in this derivation.

Falsifiers: a failure of the centered-cube cancellation or uniform Hessian sum defeats the remainder estimate; a controlled small-$g$ sequence whose ratio does not tend to $4\pi/3$ defeats the continuum coefficient. A different sea-preparation spectrum would change its application without refuting the checkerboard lemma.
