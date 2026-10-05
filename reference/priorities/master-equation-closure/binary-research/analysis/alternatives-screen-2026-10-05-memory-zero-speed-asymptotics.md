# Exact zero-speed escape coefficient with the fixed uniform memory

## Fixed case and proposed strengthening

**Claim grade: derived candidate, pending independent assessment.** This note concerns only the selected canonical radial law plus the fixed memory

$$
q''(T)=F(T)-\int_0^1[q'(T)-q'(T-\theta)]\,d\theta,
\qquad K=c_f=\lambda=\tau=1,
$$

where $F$ is the complete canonical ordinary-root acceleration of the opposite mirror pair. The [compatible preparation](alternatives-screen-2026-10-05-memory-formulation.md), [global theorem](alternatives-screen-2026-10-05-memory-global-dispersal.md) and [independent assessment](../../analysis/alternatives-screen-2026-10-05-memory-adjudication.md) supply a sufficiently slow complete family. The [separate terminal-selection assessment](alternatives-screen-2026-10-05-terminal-speed-adjudication.md) proves zero-terminal-speed members accumulating at zero launch speed. No individual member is numerically located.

Fix any admitted member with zero terminal speed. In physical time put $r=|q|$, $u=r'$ and $H=q\times q'$. The existing proof gives $r\asymp T^{2/3}$, $q'\to0$, eventual $u>0$, $H\to H_\infty\in(0,\infty)$ and $\theta\to\theta_\infty$. Its complete supplied and future history stays separated and uniformly subfield, with one partner root and no positive-delay self root. The claim is the sharper equivalence

$$
r(T)\sim C_MT^{2/3},\qquad
u(T)\sim\frac23C_MT^{-1/3},\qquad C_M=\left(\frac34\right)^{1/3},
$$

$$
\theta_\infty-\theta(T)\sim\frac{3H_\infty}{C_M^2}T^{-1/3}.
$$

The coefficient concerns one member's radius; pair separation has coefficient $2C_M$. This statement retains the full fixed memory and does not insert an effective acceleration law as a premise.

## Complete-root limit of the canonical input

Let $S(T)$ be the actual partner source, $R=T-S=|q(T)+q(S)|$ and $N=(q(T)+q(S))/R$. With complete speed bound $b<1$,

$$
R\le\frac{2r(T)}{1-b}.
$$

Since $q'\to0$, $r(T)/T\to0$, so $S/T\to1$. The supremum of speed on $[S,T]$ tends to zero. Thus $|q(S)-q(T)|/r(T)\to0$, $R/(2r)\to1$, $N-n(T)\to0$ and $D=1+N\cdot q'(S)\to1$. The complete canonical input is therefore

$$
F(T)=-\frac{N}{R^2D}=-f(T)[n_\infty+o(1)],\qquad f(T)=\frac1{4r(T)^2}.
$$

The inherited two-sided radius estimate gives positive constants $c,C$ and a late time such that $cT^{-4/3}\le f(T)\le CT^{-4/3}$. For every fixed $L>0$, $f(T-s)/f(T)\to1$ uniformly on $0\le s\le L$: radius differences on that interval are bounded by $L$ times the late speed supremum, while radius tends to infinity. Consequently $F(T-s)/f(T)\to-n_\infty$ uniformly for each such fixed window. These statements follow from the actual delayed input and complete future, not from an assumed differentiable asymptotic expansion.

## Exact convolution inverse and its late limit

Write $A=q''$. The fundamental theorem of calculus and interchange of the bounded finite integrals give the exact identity

$$
\int_0^1[q'(T)-q'(T-\theta)]\,d\theta
=\int_0^1(1-s)A(T-s)\,ds.
$$

Let $k(s)=(1-s)$ on $0\le s\le1$ and zero elsewhere. Then $A+k*A=F$ at every generated time and $\|k\|_1=1/2$. On the initial interval the integral includes the original supplied acceleration; no source is discarded.

The complete canonical input is uniformly bounded because the admitted radius and transmitter factor have positive lower bounds. Acceleration on the compact supplied interval $[-1,0]$ is bounded. For any finite future endpoint, the supremum inequality from $A=F-k*A$ shows

$$
\sup_{[-1,T]}|A|\le\max\left(\sup_{[-1,0]}|A|,\,2\sup_{[0,T]}|F|\right).
$$

Indeed, if the supremum exceeds its supplied-past value, the attained future maximum is at most $\sup|F|+\tfrac12\sup|A|$. The global bound on $F$ therefore supplies one finite bound on $A$ for the whole future.

For large $T$, set $m=\lfloor T/2\rfloor$. Iterating the exact convolution identity $m$ times is legitimate because every resulting argument is at least $T-m\ge T/2>0$. It gives

$$
A(T)=\sum_{j=0}^{m-1}(-1)^j(k^{*j}*F)(T)
+(-1)^m(k^{*m}*A)(T),
$$

where $k^{*0}$ is the unit point mass at zero. Each $k^{*j}$ is nonnegative, supported in $[0,j]$ and has integral $2^{-j}$. The final term divided by $f(T)$ tends to zero, since it is bounded by $2^{-m}\sup|A|/f(T)$ and $f(T)\ge cT^{-4/3}$.

For any fixed $j$, the preceding fixed-window limit gives

$$
\frac{(k^{*j}*F)(T)}{f(T)}\longrightarrow-2^{-j}n_\infty.
$$

For every $0\le j<m$, the convolution arguments lie between $T/2$ and $T$. The two-sided polynomial estimates on $f$ and the bound $|F|\le C f$ on that tail give one constant, independent of $T$ and $j$, such that

$$
\left|\frac{(k^{*j}*F)(T)}{f(T)}\right|\le C'2^{-j}.
$$

First pass to the limit in any fixed finite sum, then bound the remaining sum by its geometric tail. This elementary dominated-series argument yields

$$
\frac{A(T)}{f(T)}\longrightarrow
-n_\infty\sum_{j=0}^{\infty}(-1/2)^j
=-\frac23n_\infty.
$$

Thus the factor $2/3$ is derived from the exact fixed-memory equation on the admitted slow tail. No jerk bound, differentiated remainder, instantaneous substitution or universal constitutive interpretation is used.

## Physical radial and angular coefficients

The exact polar equation and finite areal-rate limit give

$$
r''=\frac{H^2}{r^3}+n\cdot A
=-\frac1{6r^2}[1+o(1)].
$$

The centrifugal contribution is lower order because $H$ remains bounded and $r\to\infty$. Since $u>0$ eventually and tends to zero, integrating $d(u^2)/dr=2r''$ to infinite radius gives

$$
u^2\sim\frac1{3r}.
$$

For precision, sandwich the radial acceleration on each sufficiently late whole tail between $(1\pm\eta)/(6r^2)$, integrate these positive bounds, and then let $\eta\downarrow0$. No derivative of the $o(1)$ term is taken. Hence $(r^{3/2})'\to\sqrt3/2$, proving $r\sim(\sqrt3T/2)^{2/3}=(3/4)^{1/3}T^{2/3}$ and the stated radial-speed formula. The transverse speed $H/r$ is lower order, so total speed is asymptotic to $u$.

Finally $\theta'=H/r^2\sim H_\infty C_M^{-2}T^{-4/3}$. Integrating the tail yields the exact remaining-angle coefficient. Both integrations concern the actual solution of the delayed equation with memory.

## Boundaries and falsifiers

The argument is conditional on the already assessed global zero-speed family and its finite positive physical areal-rate limit. It does not give a numerical launch threshold or a particular zero-speed parameter, prove positive-speed existence, change the fixed unit memory, or establish nonmirror robustness, stable binding or any boundary continuation. Constants controlling convergence can depend on the selected member; no rate or uniform family asymptotic is claimed. The coefficient differs from the no-memory inverse-square value because the convolution inverse was retained explicitly.

Falsifiers are failure of the complete late-source limit, failure of the inherited polynomial comparability, an omitted old-acceleration contribution in the exact convolution identity, a wrong convolution mass or support, loss of the uniform acceleration bound, or a failure of the finite-sum/geometric-tail estimate. A zero-speed member satisfying all hypotheses but violating the stated leading coefficient would contradict one of these explicit steps. Validation is analytical; no numerical instrument, target, external physical law or background computation is used. Prior subjects and references remain unchanged.
