# Independent reconstruction of the nonalternating radial margin

## Verdict

**Derived verdict:** the [frozen quantitative radial-margin proof](overnight2-c-equal-radius-radial-margin.md) is correct under its stated complete equal-radius assumptions. For three neutral antipodal pairs with all six positions distinct, common radius $a>0$, $0<v\le1$, $K_{\log}=c_f=1$, unchanged transmitter factor, and positive endpoints contained in a semicircle, at least one positive receiver has

$$
|F_{i,r}|>\frac{v}{16a},\qquad F_{i,r}=A_{i,r}+\frac{v^2}{a}.
$$

The claimed qualitative neighborhood exclusion on a separated compact nonalternating equal-radius subset is also supported. It requires continuity in the closed-subfield class and does not produce a numerical radius-width constant. No defect was found. This reconstruction depends on the independently checked [complete angle chart](overnight2-c-equal-radius-chart-independent-review.md) and [polarity-order restriction](overnight2-c-polarity-order-independent-review.md), not a sampled residual.

## Reconstructing the opposite-factor gap

For a clockwise present separation $\beta\in(0,\pi)$, put $\alpha_1=H_v^{-1}(\beta)$ and $\alpha_2=H_v^{-1}(\beta+\pi)$, with $H_v(\alpha)=\alpha-2v\sin(\alpha/2)$. Both roots lie strictly inside $(0,2\pi)$, $\alpha_1<\alpha_2$, and $H_v'=D=1-v\cos(\alpha/2)\le2$. Hence

$$
\pi=\int_{\alpha_1}^{\alpha_2}D\,d\alpha\le2(\alpha_2-\alpha_1),
\qquad \alpha_2-\alpha_1\ge\frac\pi2.
$$

The radial factor is $R_v(\beta)=1/D(\alpha(\beta))$. To integrate over emission angle, its derivative is with respect to $\alpha$, not $\beta$:

$$
R_v(\beta)-R_v(\beta+\pi)
=\int_{\alpha_1}^{\alpha_2}\frac{v\sin(\alpha/2)}{2D(\alpha)^2}\,d\alpha
\ge\frac v8\int_{\alpha_1}^{\alpha_2}\sin(\alpha/2)\,d\alpha.
$$

This confirms the denominator power and the factor $v/8$. Positivity of the integrand permits replacing any longer interval by a contained interval of length $\pi/2$. For an interval of exactly that length beginning at $s\in[0,3\pi/2]$, direct integration gives

$$
I(s)=\int_s^{s+\pi/2}\sin(\alpha/2)\,d\alpha
=4\sin(\pi/8)\sin(s/2+\pi/8).
$$

The second sine is evaluated on $[\pi/8,7\pi/8]$, where its minimum is $\sin(\pi/8)$ at either endpoint. Therefore

$$
I(s)\ge4\sin^2(\pi/8)=2-\sqrt2.
$$

The exact rational comparison $2<9/4$ proves $\sqrt2<3/2$, hence $2-\sqrt2>1/2$. Combining these steps yields the strict uniform factor gap

$$
R_v(\beta)-R_v(\beta+\pi)
\ge\frac{(2-\sqrt2)v}{8}>\frac v{16}.
$$

Strictness of the final result does not require equality cases of the sine bound to be attainable by causal roots. The argument remains valid at $v=1$, since both partner roots are interior and ordinary. Its lower bound tends to zero with $v$; it is not a positive constant uniform down to zero speed.

## Checking both pair multiplicities and the residual factor

Distinctness makes an enclosing positive semicircle's phase span strictly less than $\pi$. At the maximum positive phase, the two other positive sources each have clockwise separation in $(0,\pi)$. Each complete neutral pair contributes more than $v/(32a)$ radially after multiplying the factor gap by $1/(2a)$. At the minimum phase, write each other positive source's clockwise separation as $\gamma+\pi$, with $0<\gamma<\pi$. Its paired factor is the negative of $R_v(\gamma)-R_v(\gamma+\pi)$, so each pair contributes less than $-v/(32a)$.

Writing $B=-R_v(\pi)/(2a)$ for the common own-antipode contribution, the two complete five-row sums obey

$$
A_{\max,r}>B+\frac{v}{16a},\qquad
A_{\min,r}<B-\frac{v}{16a},\qquad
A_{\max,r}-A_{\min,r}>\frac{v}{8a}.
$$

The prescribed centripetal term $v^2/a$ is identical in both residuals and cancels on subtraction. The triangle inequality gives

$$
2\max\bigl(|F_{\max,r}|,|F_{\min,r}|\bigr)
\ge |F_{\max,r}-F_{\min,r}|>\frac{v}{8a},
$$

which proves the stated $v/(16a)$ residual obstruction. There are exactly two other neutral pairs and one own antipode at each receiver. The chart supplies every one of these roots and proves no positive self hit is missing. No tangential equation or assumption about its sign is needed.

## Scope of the neighborhood conclusion

Let $K$ be a compact subset of this equal-radius sector, with $v\ge v_0>0$, $a\le a_{\max}<\infty$, and every simultaneous separation at least $d_0>0$. The proved norm lower bound is at least $v_0/(16a_{\max})>0$. In a sufficiently small relative neighborhood of $K$ within the closed-subfield circular parameter space, radii stay bounded and separation stays above $d_0/2$. The independently reviewed closed-subfield root bounds give one ordinary root per directed partner, no positive self root, and a positive uniform transmitter-factor bound there. The complete residual is consequently continuous, including at equal radii and the closed wake-speed boundary. The nonzero-residual open set contains $K$; compactness permits a uniform relative neighborhood excluding exact balance. Intersecting that neighborhood with the original strict-subfield ordered-radius domain preserves the exclusion.

For C's previously constructed compact containing domain, the equal-radius condition is closed. The condition that three positives fit in a closed semicircle is also closed: represent the semicircle by its center on the compact angular circle and use a convergent subsequence of centers. Thus its separated nonalternating equal-radius subset is compact. The containing domain already bounds separation away from zero and angular rate away from zero, so the hypotheses above apply. Distinct antipodal labels forbid the apparent ordering-transition case with a positive-to-positive gap equal to $\pi$.

This does not compute the neighborhood's width, extend the result through a collision, or establish continuity of the complete law into the superfield regime, where positive self roots can appear. It does not exclude the remaining alternating equal-radius subset. The compactness argument uses all these restrictions rather than treating a pointwise sign as an automatic global neighborhood estimate.

## Independence, falsifiers, and provenance

The independent controls here are exact analytic identities: the elementary sine integral and its endpoint minima, the rational squared comparison $2<9/4$, and cancellation of a common scalar from two residuals. No new numerical instrument or target was run, so there is no numerical result to promote as independent evidence.

The result would fail if $\alpha_2-\alpha_1<\pi/2$ under $D\le2$, if an interval of that length inside $[0,2\pi]$ had sine integral below $2-\sqrt2$, if either extreme receiver did not include exactly two paired contributions with the indicated signs, or if the full radial residual norm could be at most $v/(16a)$ in the stated sector. The neighborhood conclusion would fail without a continuous complete-root residual on its relative domain or without compact positive parameter bounds.

The frozen subject identity measured with `shasum -a 256` was `d7ed41cf832c4e1ac09faf3f1d659bb7847c8dcd1288900caca42f1c306f221b`. Only this new review file was written. No subject, earlier review, main report, shared owner, or production source was changed; no numerical grid, worker, Git mutation, or recursive delegation was used. The original second-allocation exploration stop at 2026-10-07 13:55:15 UTC and deadline at 15:25:15 UTC remain unchanged. Parent integration is separate.
