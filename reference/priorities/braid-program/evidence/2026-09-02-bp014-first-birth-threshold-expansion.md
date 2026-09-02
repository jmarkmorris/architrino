# BP-014 First-Birth Threshold Expansion

Status: exact higher-order birth thresholds and dominant pre-phase lattice derived; uniform complement bound open

## Scope

This packet strengthens the regular alternating $2N$-gon causal-fold scaling with normalized wake speed $c_f=1$. It derives exact higher-order threshold terms for any fixed post-zero birth index and separates the parity-free local fold geometry from the parity-dependent acceleration ledger. It does not prove a large-$N$ tangential balance, a limiting zero, a compatible-radius law, retention, stability, or physical scaling.

## Exact threshold reversion

For transmitter index $k\geq1$, the post-zero lobe is born when

$$
\frac{k\pi}{N}=L(\beta),
\qquad
L(\beta)=2\left(\sqrt{\beta^2-1}-\arccos(1/\beta)\right).
$$

Write $\beta=\sec\alpha$ and

$$
r=\left(\frac{3k\pi}{2N}\right)^{1/3}.
$$

Then the fold equation is $2(\tan\alpha-\alpha)=2r^3/3$. Exact series reversion gives

$$
\alpha
=r\left(
1-\frac2{15}r^2+\frac3{175}r^4-\frac2{1575}r^6+
O(r^8)
\right).
$$

Consequently,

$$
\boxed{
\beta_{k,N}^{\mathrm{fold}}-1
=\frac12r^2
+\frac3{40}r^4
-\frac1{2800}r^6
-\frac{479}{1008000}r^8
+O(r^{10})
}.
$$

Equivalently, for each fixed $k$,

$$
\beta_{k,N}^{\mathrm{fold}}-1
=\frac12\left(\frac{3k\pi}{2N}\right)^{2/3}
+\frac3{40}\left(\frac{3k\pi}{2N}\right)^{4/3}
-\frac1{2800}\left(\frac{3k\pi}{2N}\right)^2
+O(N^{-8/3}).
$$

In the scaled coordinate $x=N^{2/3}(\beta-1)$, the limiting fold walls are therefore

$$
x_k^{\mathrm{fold}}
=\frac12\left(\frac{3k\pi}{2}\right)^{2/3}.
$$

The first-birth chamber lies between

$$
x_1^{\mathrm{fold}}
=\left(\frac{3\pi}{4\sqrt2}\right)^{2/3}
\quad\text{and}\quad
x_2^{\mathrm{fold}}=2^{2/3}x_1^{\mathrm{fold}},
$$

with the boxed formula supplying the signed finite-$N$ corrections to both walls.

The symbolic checker [check_braid_fold_series.py](../../../../scripts/equation-mapping/check_braid_fold_series.py) verifies the reversion and the displayed coefficients.

Plainly: the earlier $N^{-2/3}$ order is now an explicit threshold series. It locates the walls of the first-birth window more accurately, but it does not locate a balance inside that window.

## Parity separation

The fold position depends only on $k/N$ and is identical on the even- and odd-$N$ subsequences. The newborn acceleration sign is instead the polarity factor $(-1)^k$. The antipodal channel has factor $(-1)^N$, so its contribution differs between the two subsequences even though the local fixed-$k$ birth thresholds do not.

Therefore a correct limiting tangential reduction has the form

$$
S_N(x)
=K_{\mathrm{local}}(x)
+B_N^{\mathrm{even/odd}}(x),
\qquad
x=N^{2/3}(\beta-1),
$$

where the singular local newborn kernel can be common, but the regularized background must be proved separately for even and odd $N$. Parity cannot be inserted by changing the fold coefficient; it enters through the signed acceleration sum and especially the antipodal endpoint.

Plainly: even and odd rings reach the same nearby causal folds, but they weight at least the antipodal channel differently. The limiting zero can coincide only if the two background limits are proved to coincide.

## Dominant pre-phase lattice obstruction

There is a stronger scale-separation issue before parity enters. Fix $k\geq1$ and consider the ordinary root before transmitter phase $\phi_k=k\pi/N$. Writing

$$
z_{k,N}=\frac{\phi_k-\chi_{k,N}}2>0,
$$

its exact root equation is

$$
\beta_N\sin z_{k,N}+z_{k,N}=\frac{k\pi}{2N}.
$$

If $\beta_N=1+xN^{-2/3}$ with fixed $x$, then for every fixed $k$,

$$
Nz_{k,N}\longrightarrow\frac{k\pi}{4}.
$$

The exact tangential contribution of this root is

$$
T_{k,N}^{\mathrm{pre}}
=-\frac{(-1)^k\cos z_{k,N}}
{4\sin^2z_{k,N}(1+\beta_N\cos z_{k,N})},
$$

so

$$
\frac{T_{k,N}^{\mathrm{pre}}}{N^2}
\longrightarrow
\frac{2(-1)^{k+1}}{\pi^2k^2}.
$$

This pointwise limit comes from an exact regularization, not only a small-angle substitution. Let $z_\beta(X)$ be the increasing inverse of

$$
G_\beta(z)=\beta\sin z+z,
\qquad
0<X<\pi,
$$

and set $C_\beta(X)=\csc z_\beta(X)$. Implicit differentiation gives

$$
T_{k,N}^{\mathrm{pre}}
=\frac{(-1)^k}{4}C_\beta'(X_k),
\qquad
X_k=\frac{k\pi}{2N}.
$$

Writing

$$
C_\beta(X)=\frac{\beta+1}{X}+R_\beta(X)
$$

is an exact subtraction with the positive closed form

$$
R_\beta(X)
=\frac{z-\sin z}{\sin z\,(\beta\sin z+z)},
\qquad z=z_\beta(X).
$$

This exact subtraction therefore yields the finite decomposition

$$
\sum_{k=1}^{2N-1}T_{k,N}^{\mathrm{pre}}
=\frac{(\beta+1)N^2}{\pi^2}
\sum_{k=1}^{2N-1}\frac{(-1)^{k+1}}{k^2}
+\frac14\sum_{k=1}^{2N-1}(-1)^kR_\beta'(X_k).
$$

The first term is

$$
\frac{N^2}{6}+\frac{xN^{4/3}}{12}+O(1)
$$

uniformly for $x$ in a fixed compact interval. Thus the large-$N$ decision is reduced to one explicit remainder question: prove that the regularized alternating sum of $R_\beta'$ is $O(N^{4/3})$, or exhibit an order-$N^2$ term in it that cancels $1/6$.

One sufficient shape inequality is now explicit. With $s=\sin z$, $c=\cos z$, $J=1+\beta c$, and $X=\beta s+z$, direct differentiation gives

$$
C_\beta''(X)
=\frac{1+c^2+2\beta c^3}{s^3J^3}.
$$

Hence $R_\beta'$ is increasing precisely when

$$
\boxed{
\frac{1+c^2+2\beta c^3}{s^3(1+\beta c)^3}
>\frac{2(\beta+1)}{(\beta s+z)^3}
}.
$$

If this inequality is certified on the increasing inverse branch for the declared first-birth $x$ interval, the alternating-sequence bound reduces the complete $R_\beta'$ sum to its last sample. At $X=\pi-\pi/(2N)$, writing $z=\pi-N^{-1/3}y$ gives the fold-separated cubic $y^3/6-xy=\pi/2+O(N^{-2/3})$, so that last sample is $O(N^{4/3})$. This would close the pre-phase remainder at the required subleading order.

Plainly: the remaining sum-exchange problem is now one concrete shape sign plus one scaled endpoint estimate. Proving that sign would turn the observed $1/6$ obstruction into a uniform theorem for all sufficiently large rings.

The leading part of the exact decomposition converges to the nonzero endpoint lattice

$$
\frac2{\pi^2}
\sum_{k=1}^{\infty}\frac{(-1)^{k+1}}{k^2}
=\frac16.
$$

By contrast, the same-transmitter post-zero root and the first newborn pair have $z=O(N^{-1/3})$ and tangential size $O(N^{4/3})$. They cannot cancel a surviving $N^2/6$ term. Therefore the proposed first-birth balance can exist for arbitrarily large $N$ only if the remaining growing-lattice terms supply another order-$N^2$ endpoint contribution that cancels the pre-phase lattice exactly.

Plainly: the nearest ordinary roots produce a larger positive asymptotic term than the new fold pair. The original limiting-kernel route must first prove a cancellation of that $1/6$ term; otherwise the finite $N=8$ through $N=12$ balances do not continue to infinity on this scale.

## Conditional fold-boundary balance law

If the regularized complement is $O(N^{4/3})$ and the $N^2/6$ term survives, the balance is not lost; it is forced into a thinner boundary layer immediately above the first fold. Let

$$
\Delta_N=\beta_N-\beta_{1,N}^{\mathrm{fold}}>0.
$$

For the newborn $k=1$ pair, expand $\beta\sin z-z-\pi/(2N)$ at the fold point $z=\alpha_N$. The two roots satisfy

$$
z_\pm=\alpha_N\pm\sqrt{\frac{2\Delta_N}{\beta_{1,N}^{\mathrm{fold}}}}
+o(\sqrt{\Delta_N}),
$$

and their combined tangential contribution is

$$
T_N^{\mathrm{new}}
=-\frac{1+o(1)}
{2\sqrt{2\beta_{1,N}^{\mathrm{fold}}}\,\alpha_N^3\sqrt{\Delta_N}}
=-\frac{N[1+o(1)]}{3\pi\sqrt2\,\sqrt{\Delta_N}}.
$$

Balancing this against $N^2/6$ gives the conditional law

$$
\boxed{
\beta_N-\beta_{1,N}^{\mathrm{fold}}
=\frac{2}{\pi^2N^2}+o(N^{-2})
}.
$$

Thus

$$
N^{2/3}(\beta_N-1)
=x_1^{\mathrm{fold}}
+O(N^{-2/3})
+\frac{2}{\pi^2}N^{-4/3}
+o(N^{-4/3}),
$$

so the limiting scaled zero sits on the first-fold wall, not in the interior of the first-birth chamber. The newborn radial-to-tangential ratio is $\tan\alpha_N\sim(3\pi/2N)^{1/3}$, which conditionally predicts

$$
\frac{R_N}{R_*}
\sim\frac16\left(\frac{3\pi}{2}\right)^{1/3}N^{5/3}.
$$

Plainly: if the $1/6$ background theorem closes, the large ring can balance only by sitting extremely close to root birth. Its compatible radius then grows like $N^{5/3}$ on this prescribed chart; this is not a released-object size law.

The accepted $N=12$ row provides a finite, nonindependent check only. Its first-fold speed is $1.2896055860174487\ldots$, and the accepted balance gives

$$
N^2(\beta_N-\beta_{1,N}^{\mathrm{fold}})
\approx0.1778768,
\qquad
\frac2{\pi^2}\approx0.2026424.
$$

The agreement is directionally consistent at small $N$ but does not establish the conditional asymptotic law.

The tracked same-evaluator diagnostic [diagnose_planar_ring_large_n_first_birth.mjs](../../../../scripts/equation-mapping/diagnose_planar_ring_large_n_first_birth.mjs) evaluates $x=1.55$. It measures $S_N/N^2$ as approximately $0.1550292$, $0.1600725$, $0.1627559$, and $0.1642900$ for $N=50,100,200,400$, respectively, with exactly $2N+2$ roots per receiver and no reported fold event. This trend is consistent with $1/6$ but is not an independent oracle or a proof of the limit.

## Uniform remainder obligation

For any fixed $K$, analyticity of $2(\tan\alpha-\alpha)$ at $\alpha=0$ gives a uniform remainder over $1\leq k\leq K$ once $N$ is large enough. That finite-$K$ statement is not uniform when the number of born lobes grows with $N$. The first-birth theorem must therefore predeclare a compact $x$ interval strictly between the $k=1$ and $k=2$ threshold limits, use the boxed corrections to keep it fold-separated for finite $N$, and prove a uniform decomposition of the complete tangential ledger. In particular, it must justify the pre-phase sum limit, bound the bulk and opposite endpoint after alternating pairing, and decide whether any complement term cancels the derived $1/6$ coefficient.

## Boundary and falsifier

Derived: the fixed-$k$ threshold expansion, the location of parity in the signed ledger, the fixed-$k$ pre-phase limit, the exact finite regularized decomposition that exposes the $N^2/6$ term, and the local newborn fold expansion. Inferred conditional on the open complement bound: the $2/(\pi^2N^2)$ balance-to-fold gap and $N^{5/3}$ compatible-radius order. Measured: the same-evaluator $N=50$ through $N=400$ diagnostic and the accepted finite $N=12$ comparison. Open: an $O(N^{4/3})$ bound or contrary leading term for the regularized $R_\beta'$ sum, bounds for the opposite endpoint and the non-pre-phase roots, whether the $1/6$ term survives in the complete ledger, even/odd subleading backgrounds, and certification of the boundary-layer zero.

The threshold series is falsified by a symbolic residual below the declared order or an independently enclosed fixed-$k$ fold violating its remainder. The proposed limiting-balance route is falsified if a uniform complete-ledger bound leaves the nonzero $N^2/6$ term uncancelled. It is also falsified by an additional fold entering the predeclared compact $x$ interval, nonconvergence of either parity background, distinct even/odd limiting zeros when a common constant is claimed, or failure of the finite-$N$ remainder to be uniform.

Closure goal: prove the regularized $R_\beta'$ shape inequality and complete-ledger $O(N^{4/3})$ complement bound; if the $1/6$ coefficient survives, replace the presumed interior limiting zero with the fold-boundary law $\beta_N-\beta_{1,N}^{\mathrm{fold}}\sim2/(\pi^2N^2)$ and certify its radius asymptotic.
