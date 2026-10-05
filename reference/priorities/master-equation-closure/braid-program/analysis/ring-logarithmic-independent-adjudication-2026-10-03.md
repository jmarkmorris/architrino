# Independent adjudication of the logarithmic ring variation

Date: 2026-10-03. Subject: [the frozen logarithmic ring analysis](ring-logarithmic-variation-2026-10-03.md), SHA-256 `2816e63e4f15255a67bea5e408befc356a6a842f07872f3cb8911f1486cbb2c2`; subject instrument SHA-256 `0eecb7dd023d958a1936bf544ac144a658f640de78157b607dacd305c9aa5e16`. Reviewer: a different specialist from the subject author. No subject, oracle, baseline instrument, shared queue or equation owner edited.

## Verdict and scope

Accepted, independently reconstructed: the inverse-distance coupling has squared-speed units; radius cancels from exact circular balance; a tangential zero with negative radial coefficient would provide a continuous radius/frequency family at its required coupling; the small-speed tangential coefficient is positive for every fixed even alternating inventory; and a fixed finite positive coupling cannot support an unbounded-speed ladder of regular alternating six-member ordinary circles. The last conclusion is an analytical obstruction, not a conclusion drawn from a finite numerical scan.

Accepted at computer-assisted point/bracket scope: 60 signed points in T01–T20, five additional low-speed/wake-speed points, and logarithmic tangential imbalance throughout the exact baseline T02, T04 and T06 speed brackets. A separately constructed Cartesian/delay instrument reconstructs and checks these 68 cases without importing the subject evaluator. Each retained root has outward endpoint signs, a nonzero gap derivative and transmitter factor, and a disjoint same-source interval; the complete analytic census is matched.

Not established: absence of tangential zeros throughout any complete ordinary cell, a count of finite-speed logarithmic circles, a numerical upper-speed bound, an exact first logarithmic ring, or its stability. The finite-search receipt reports no discovered candidates; it is not a continuous-domain exclusion. The baseline ring ladder remains governed by the unchanged inverse-square equation. This review does not adopt the variation as physical law.

Falsifiers: a complete logarithmic circle with radius-dependent balance conditions, a different differentiated low-speed coefficient, an old-root family violating the uniform bounds below, an unbounded fixed-coupling sequence of exact ordinary six-member circles, an omitted Cartesian delay root, or a failed outward sign certificate defeats the respective accepted result. A finite-speed logarithmic solution is compatible with the high-speed theorem.

## Coupling, radius and full-vector balance reconstructed

The [authorized equation owner](../../equation-variants/logarithmic-potential/manuscript.md#after-the-proposed-logarithmic-potential-equation) selects the per-hit acceleration

$$
\mathbf A_b=\sigma K_{\log}\frac{c_f}{|c_f-\mathbf n\cdot\mathbf V_s|}\frac{\mathbf n}{\ell}.
$$

The transmitter weight is dimensionless. Since acceleration has units $L/T^2$ and the remaining distance factor is $1/L$, $[K_{\log}]=L^2/T^2$. The baseline coupling instead has $L^3/T^2$ units. Thus $k=K_{\log}/c_f^2$ is dimensionless and the baseline length $K/c_f^2$ supplies no logarithmic radius selection by itself.

For a circle at speed $c_f\beta$, write its root half-angle $x\in(0,\pi)$. The separation is $2R\sin x$, the unit chord direction in the receiver frame is $(\sin x,\cos x)$, and the dimensionless transmitter factor is $D=1-\beta\cos x$. Substitution gives per-hit radial and tangential coefficients $\sigma/(2|D|)$ and $\sigma\cot x/(2|D|)$, respectively. Summing every partner and positive-delay self hit gives exactly the subject's $C_r,C_t$. Circular acceleration is $-c_f^2\beta^2/R$ radially and zero tangentially, so multiplying both components by $R/K_{\log}$ gives

$$
C_t(\beta)=0,\qquad C_r(\beta)=-\beta^2/k.
$$

This independently checks both the direction and radius power. For a simple-root zero $\beta_0>0$ with $C_r(\beta_0)<0$, the required $k_0=-\beta_0^2/C_r(\beta_0)$ is fixed. At that selected coupling, scaling $R$ scales every causal delay by $R/c_f$, leaves the speed and transmitter factors unchanged, and scales both received and prescribed acceleration as $1/R$. Every positive radius is therefore conditionally an exact history with $\Omega=c_f\beta_0/R$. This is an exact scale covariance statement conditional on an actual full-vector balance; no such balance is exhibited in the subject.

The scalar reference radius adds only a constant to the local logarithmic acceleration-potential. It does not occur in the acceleration or either balance condition. Treating it as a radius-adjustment knob would change the subject's interpretation rather than solve its equation.

## Static and low-speed finite-inventory check

At zero speed an alternating $2N$-member ring has partner half-angles $x_j=j\pi/(2N)$, $j=1,\ldots,2N-1$, and no positive-delay self root. The radial sum is $(1/2)\sum_j(-1)^j=-1/2$. Reflection pairs cancel the tangential cotangents, so $C_t(0)=0$. At positive coupling the nonzero inward acceleration means this static ring is not an equilibrium.

Differentiating the root equation $\beta\sin x-x=\text{constant}$ gives $x'=\sin x/D$. At zero speed $D=1$ and $D'=-\cos x$. Hence

$$
\frac{d}{d\beta}\left(\frac{\cot x}{D}\right)_{\beta=0}
=-\csc^2x\sin x+\cot x\cos x=-\sin x.
$$

With $\theta=\pi/(2N)$ and $r=-e^{i\theta}$, the finite geometric sum obeys $r^{2N}=-1$ and

$$
\sum_{j=1}^{2N-1}r^j=\frac{r+1}{1-r}
=\frac{1-e^{i\theta}}{1+e^{i\theta}}
=-i\tan(\theta/2).
$$

Its imaginary part therefore gives the alternating sine sum $-\tan(\pi/(4N))$. Analyticity of the finitely many sub-wake partner roots near zero establishes

$$
C_t(\beta)=\frac12\tan\!\left(\frac\pi{4N}\right)\beta+O(\beta^2).
$$

The linear coefficient is strictly positive at every fixed finite $N$. For six members it is $(2-\sqrt3)/2$. This proves a sufficiently-small-positive-speed exclusion independently of radius and coupling. It supplies no uniform low-speed interval in $N$, no whole sub-wake sign theorem, and no empirical threshold. The separate checker also verifies the finite-sum and closed-form equality with outward intervals for $N=1,2,3,10$ as analytical controls before its target.

## Uniform older-root bounds reconstructed without baseline balance

Let $h=\pi/6$, $F(x)=\beta\sin x-x$, $x_*=\arccos(1/\beta)$ and $M=F(x_*)$. In a high ordinary cell $qh<M<(q+1)h$, the complete roots are the descending levels $m=-5,\ldots,0$ and two roots at each $m=1,\ldots,q$. Strict concavity $F''=-\beta\sin x<0$ and endpoint values prove this census. Its number is $2q+6=O(\beta)$ because $qh<M<\beta$. Fold levels are outside the ordinary sum.

Remove only the two newest level-$q$ roots for this estimate; they will be added back below. Every remaining root has $M-F(x)\ge h$. This statement holds throughout the whole cell, including speeds arbitrarily close to the newborn fold. Since $D=1-\beta\cos x$ and $D'=\beta\sin x$, a uniform lower bound follows directly.

For $\beta\ge4$, if $|D|\ge\beta/4$ then $|D|\ge\sqrt\beta/2$. Otherwise $(1-D)/\beta=\cos x$ and $\cos x_*=1/\beta$ place both points in $[\pi/3,2\pi/3]$, where $D'\ge\sqrt3\beta/2$. Parametrizing the integral of $|D|$ by its value between the root and maximizer gives

$$
M-F(x)=\int_0^{|D(x)|}\frac{s}{D'(x(s))}\,ds
\le\frac{D(x)^2}{\sqrt3\beta}.
$$

Combining this with the gap $h$ again yields the weakened bound $|D|\ge\sqrt\beta/2$. With $O(\beta)$ rows, each contributing at most $1/(2|D|)$ in radial magnitude,

$$
|C_r^{\rm old}|=O(\sqrt\beta).
$$

The older tangential bound needs the full sum, rather than a fixed-level asymptotic. The identity $\beta\cos x=1-D$ gives

$$
\frac{|\cot x|}{|D|}
\le\frac{1+1/|D|}{\beta\sin x}
\le\frac{C}{\beta\sin x}
$$

uniformly at sufficiently high speed. For a rising positive-level root, $\beta\sin x=x+mh\ge mh$; its complete sum is bounded by a constant times $\sum_{m\le q}m^{-1}=O(\log\beta)$.

For a descending root put $y=\pi-x$ and $l=m+6\ge1$. The root equation becomes $\beta\sin x+y=lh$. If $y\le lh/2$, then $\beta\sin x\ge lh/2$, giving another harmonic sum. Otherwise $lh<2\pi$, so $l<12$; there are only finitely many such rows. They obey $x\ge x_*\ge\pi/3$ and $y>h/2$, placing $x$ a fixed distance from both sine zeros. Their total is $O(\beta^{-1})$. Therefore

$$
|C_t^{\rm old}|=O(\log\beta).
$$

This reconstruction does not use the inverse-square radius, its balance offset, or its high-speed growth law. It checks that the lemma borrowed in the subject from the [fast-limit adjudication](ring-frequency-and-fast-limit-independent-adjudication-2026-10-03.md#5-newest-pair-dominance-and-uniformly-smaller-old-roots) is geometric and uniform in root level; applying a baseline newest-fold offset here would be unjustified.

## Fixed-coupling high-speed contradiction

Fix $0<k<\infty$. Suppose exact logarithmic circle speeds were unbounded. If the newest level $q$ is even, both newborn radial contributions are positive; they cannot combine with the older $O(\sqrt\beta)$ sum to produce $-\beta^2/k$ for large $\beta$. Any sufficiently high balanced sequence must therefore use odd $q$.

Write the odd pair's radial contribution as $-L$, where

$$
L=\frac12\left(|D_-|^{-1}+|D_+|^{-1}\right)>0.
$$

Radial balance requires $L=\beta^2/k+O(\sqrt\beta)$. At least one reciprocal factor is at least $L$, so its $|D|=O(\beta^{-2})$. Since $D'=\beta\sin x\asymp\beta$ near $x_*$, this places that root within $O(\beta^{-3})$ of $x_*$. Integrating $|D|$ bounds the newest height gap $\delta=M-qh$ by $O(\beta^{-5})$.

The other root must also approach $x_*$. To avoid assuming a local expansion for it, observe first that a fixed excursion outside a central interval around $x_*$ would give a gap of order $\beta$, contradicting this small $\delta$. Inside that central interval $c\beta\le D'\le\beta$; integrating twice gives $\delta\asymp\beta|x-x_*|^2$ on either side. Both newborn roots thus have offsets $O(\beta^{-3})$ and factors $O(\beta^{-2})$.

Their cotangents satisfy

$$
\cot x_\pm=\cot x_*+O(\beta^{-3})
=\frac1{\sqrt{\beta^2-1}}+O(\beta^{-3})
=\frac1\beta+O(\beta^{-3}).
$$

The exact maximizer cotangent is $1/\sqrt{\beta^2-1}$; replacing it by $1/\beta$ introduces only the explicitly retained order-$\beta^{-3}$ error. Weighted by the positive inverse factors, the newborn tangential coefficient is

$$
C_t^{\rm new}=-L/\beta+O(L\beta^{-3})
=-\beta/k+O(\beta^{-1/2}).
$$

The $O(\beta^{-1/2})$ remainder includes the older radial correction divided by $\beta$; the local cotangent remainder contributes only $O(\beta^{-1})$ at fixed $k$. Adding the complete older tangential sum leaves $C_t=-\beta/k+O(\log\beta)$, which is strictly negative at sufficiently high speed and cannot satisfy tangential balance. This contradiction proves a finite upper speed bound on the set of these exact regular circles at each fixed finite positive coupling. It does not provide a numerical bound, forbid finite-speed solutions, or compare different couplings.

The proof accepts every positive-delay self root in the old/new split according to its actual level. It neither omits an older self term nor caps the number of branches. The theorem is restricted to fixed six-member regular alternating circles on complete ordinary charts; it is not a general logarithmic no-assembly theorem.

## Separate numerical construction and receipt interpretation

The new [independent checker](../../../../../scripts/braid-program/ring_logarithmic_independent_adjudication_20261003.py) uses physical dimensionless delay $\chi=c_f\Delta/R\in(0,2]$. In source channel $j$ it solves

$$
g_j(\chi)=2\left|\sin\frac{\beta\chi-j\pi/3}{2}\right|-\chi=0.
$$

Each phase lobe of the distance-minus-delay gap is concave, and its geometric zeros and single maximum provide monotone search pieces. This independently locates all candidate positive delays, excluding the self endpoint. Around each one, interval endpoint signs prove existence, a separately enclosed gap derivative proves uniqueness, and disjoint same-source intervals prove distinctness. The independent cell-admission check and analytic complete census then verify that no branch is missing. A finite unstructured root scan alone would not provide that last step.

The checker constructs the Cartesian source chord $(1-\cos\theta,-\sin\theta)$, with $\theta=j\pi/3-\beta\chi$, source velocity $\beta(-\sin\theta,\cos\theta)$ and transmitter factor $D=1+\beta\sin\theta/\chi$. Its inverse-distance acceleration is $(-1)^j(1-\cos\theta,-\sin\theta)/(\chi^2|D|)$ at $R=K_{\log}=c_f=1$. It sums those vectors without importing the subject's half-angle coefficient or root function. Interval uncertainty includes the original baseline speed brackets. For representative point receipts, the printed 75-digit speed is enclosed with half-width $10^{-70}$, which also covers its suppressed printing digits; the comparison checks outward sign and overlap rather than equality of rounded point values.

Before target use, the checker passed exact analytical controls: stationary LOG acceleration $1/2$ at separation 2 and Jacobian diagonal $(-1/4,1/4)$; static alternating-hexagon coefficients $(-1/2,0)$ with the 30-hit census; the independently known source-$j=1$ delay $\chi=2$ at $\beta=2\pi/3$; and the finite-inventory small-speed sine identities. It records its own source identity before target admission. None of these controls imports the subject implementation.

The target verifies all 65 reported point signs, their complete directed censuses and overlap with their supplied binary coefficient intervals, then verifies the negative tangential coefficient over all three baseline exact-speed brackets. All 68 cases pass; receipts and per-cell progress live in `.local-data/ring-exploration/logarithmic-adjudication/`. The subject's bound baseline exclusion intervals are consequently accepted at their stated widths: T02 $[-2.732306,-2.732305]$, T04 $[-2.867914,-2.867913]$, and T06 $[-2.924055,-2.924054]$.

The checker also reads the finite-search table's declared `finiteScanNotComplete` flags and empty candidate lists. That establishes the retained diagnostic report's scope; it does not independently reconstruct every floating discovery sample or promote a failure to discover a zero into a theorem that no zero exists. The analytical high-speed obstruction above is independent of those samples.

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_logarithmic_independent_adjudication_20261003.py --stage control
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_logarithmic_independent_adjudication_20261003.py --stage target
```

## Integration boundary and next action

No mathematical repair of the frozen subject is required by this review. Its hypotheses and grade boundaries are material: preserve fixed coupling, ordinary roots, fixed six-member inventory, finite point-sign scope and the distinction between the logarithmic and baseline couplings. The numerical receipt's success means the diagnostic completed; it does not mean a ring balanced. No first-ring stability spectrum may be attached until a complete logarithmic circle satisfies both balance equations.

Recommended next action: construct a continuous-domain tangential-zero census on the finite-speed cells, then check the required coupling and the independently selected fixed-coupling model. If an exact balance is found, only then derive its stability equation. This review does not require that extension to accept the bounded witnesses, scaling and high-speed theorem above. Shared indexes, queues, manuscript and task statuses remain with the coordinator.
