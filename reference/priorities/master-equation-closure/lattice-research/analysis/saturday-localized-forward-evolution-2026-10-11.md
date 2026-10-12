# Forward evolution of the localized lattice preparation at $g=16$ (2026-10-11)

## Result

**In words.** The localized disturbance constructed in the [preparation note](saturday-localized-nonlinear-preparation-2026-10-10.md) was defined only up to time zero. This note continues that same history forward, proves the continuation is unique, and says exactly how regular evolution can end.

Four things are proved.

1. **The same history continues, uniquely.** A history that solves the equation up to some time, with every displacement below half a lattice spacing and every speed below wake speed by a margin, has exactly one continuation for a further short time. The reason is that every wake received during a short step was emitted before the step began, so each member moves in a field already fixed by the past, and the members do not influence one another within the step. Repeating the step continues the history for as long as the two margins last.
2. **For the constructed family the continuation is given by the same construction while it is small.** Moving the time origin forward turns the linear seed into another linear seed, and the preparation theorem applies to that seed as well. The new point is the matching: the solution built from the later seed agrees with the original constructed history on the whole past, because the correction is unique in a ball of fixed size. This is a representation by a fixed point of the complete-past construction; the correction itself is not evaluated and no closed formula is given. The disturbance of size $\varepsilon$ therefore continues for a time of order $\ln(1/\varepsilon)$, stays equal to the linear seed plus a correction of second order, keeps every margin of the preparation theorem (speeds at most $3/16$, separations at least $7/8$), and keeps its spatial decay of every order. Over that time its largest displacement grows from order $\varepsilon$ to at least a fixed small power of $\varepsilon$, which is still small: reaching the small threshold is not reaching order-one amplitude.
3. **Spatial localization lasts as long as regular evolution does.** In any region of displacements and speeds with fixed margins, the spatially weighted size of the disturbance grows at most exponentially, at a rate given by an explicit formula in the margins. The rate is crude (floating evaluations give about $54$ per unit time for the small-amplitude margins and about $1100$ for displacements up to a quarter and speeds up to a half), but it is the same for every spatial weight.
4. **How regular evolution can end.** Either it never ends; or some member's displacement reaches half a spacing, which is the edge of the region in which this note's form of the equation is used and is not by itself a physical event; or, with all displacements still below a half, a finite number of members reach wake speed exactly while all others stay below it. In the last case the complete field from the other members, taken with the original grouped summation, is a fixed, bounded field, Lipschitz in time and position, near each arriving member, which is the full-field condition of the [cross-geometry comparison](../../analysis/saturday-cross-geometry-comparison-2026-10-10.md#6-the-lattice-what-carries-over-to-a-localized-preparation).

**What is not proved.** Whether the continued disturbance ever leaves the small-amplitude regime in a controlled way beyond the bound in item 2, which of the three endings occurs, whether an ending occurs at all, and whether the arrival rate is positive at an arrival. The amplitude threshold and the duration are existential: they depend on constants of the preparation proof that have not been evaluated. No wake-speed arrival is established, so no obstruction is applied.

| Statement | Grade | Quantitative or existential |
| --- | --- | --- |
| Lemma 1: in a chart, the acceleration of each member is a bounded map of reception time and its own position, Lipschitz in both, fixed by the earlier paths; ancient and recent sources separate, with explicit tails | derived | explicit bounds; one derivative constant unevaluated |
| Theorem 1: unique continuation by steps in the class of charted histories | derived | step length explicit in the chart margins and one acceleration bound |
| Theorem 2: the constructed history continues to $T_1(\varepsilon)=\lambda_+^{-1}\ln(\delta_0/(\varepsilon\bar\Lambda_0))$ with $u=\varepsilon\phi+O(\varepsilon^2e^{2\lambda_+T})$ and all preparation margins | derived, relying on the accepted preparation proof | existential: $\delta_0$, $\bar\Lambda_0$ not evaluated |
| Proposition 3: for bump seeds, $\sup_j\lvert u_j(T)\rvert\ge\tfrac c2\varepsilon e^{(2a-\lambda_+)T}$ up to a time $T_2(\varepsilon)$ | derived | existential constants |
| Proposition 4: weighted a-priori bound with rate $\nu_*(\rho,\varpi)$ | derived; the tabulated values of $\nu_*$ are floating evaluations, not certified upper bounds | explicit formula |
| Theorem 5: continuation alternative, and conditions (F2), (F3) at an arrival; conditional use of the wake-speed obstruction in an adapted grouped-sum class | derived; the obstruction is not applied, because no arrival is established | qualitative |

Everything is for the unchanged Master Equation at $g=16$, unit spacing, $c_f=1$, every member dynamical, every causal root kept, the original eight-source block summation. No event rule, speed limit, response factor or changed equation is used or proposed.

## 1. Setting, sources and reading limits

This is task 1 of the [follow-up round](../../../../op/agent-chats/2026-10-11-saturday-serial-followups/chat.md). It starts from the accepted preparation note and its [Codex review](saturday-localized-nonlinear-preparation-codex-review-2026-10-10.md), both read in full, and from Section 6 of the comparison and its [review](../../analysis/saturday-cross-geometry-comparison-codex-review-2026-10-10.md). The one fact taken from the lane [manuscript](../manuscript.md#11-what-the-stationary-lattice-establishes) is that the block sum of the resting rows vanishes at an anchor; its Section 1.1 was read and the fact was not rederived. The wake-speed theorems are cited only for what an arrival would need; none is applied. Not read for this task: the rest of the manuscript, the lattice queue beyond what the release quotes, and the coherent-branch certificate, none of which is used.

**Notation of the preparation note, kept.** Member $j\in\mathbb Z^3$ has polarity $\sigma_j=(-1)^{j_1+j_2+j_3}$ and position $X_j=j+u_j$. For receiver $i$ and source $j=i-d$: $r=\lvert d\rvert$, $n=d/r$, $\sigma_d=\sigma_i\sigma_j$. The row is $g\,\sigma_d\Psi(R,v)$ with $\Psi(R,v)=R/(\lvert R\rvert^2(\lvert R\rvert-R\cdot v))$, $R$ the vector from the emission point to the receiver and $v$ the source velocity at emission; this is the row of the [canonical equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), which gives acceleration directly. $S_p(x)=\sum_{d\ne0}e^{-xr}/r^p$. The spatial weights are $w_j=(1+\lvert j\rvert/(4m))^m$, with $w_i\le w_{i-d}\,\omega_d$ and $\omega_d\le e^{r/4}$; $\lVert\cdot\rVert_a$ and $X_a$ are the history norm and space of that note on $T\le0$, and $\lVert\cdot\rVert_a^{(0)}$ is the norm without weight. The seed $\phi$ is the contour seed of that note, with contour $\Gamma$ of radius $\varrho_\Gamma$ about $\lambda_g$, left edge $a=\lambda_g-\varrho_\Gamma\ge2.65$, and right edge

$$
\lambda_+=\lambda_g+\varrho_\Gamma<3.35 .
$$

**Charts.** For $0<\rho<1/2$ and $0<\varpi<1$, a family $u=(u_j)$ of twice continuously differentiable functions on $(-\infty,T_0]$ is *in the chart $(\rho,\varpi)$* when $\lvert u_j(T)\rvert\le\rho$ and $\lvert u_j'(T)\rvert\le\varpi$ for all $j$ and $T\le T_0$, and $\sup_{j,T}\lvert u_j''\rvert<\infty$. It is *ancient* when there are $a>1/4$, $A$ and $T_-\le T_0$ with $\lvert u_j\rvert+\lvert u_j'\rvert+\lvert u_j''\rvert\le Ae^{aT}$ for all $j$ and $T\le T_-$. The constructed histories are ancient and in the chart $(1/16,3/16)$. Write $\kappa=1-2\rho$.

In a chart, distinct members are at least $\kappa$ apart; each ordered pair has exactly one causal root, because the source is slower than its wake; a member has no root on its own path; $D\ge1-\varpi$; the delay $\tau$ of the pair at anchor distance $r$ satisfies $r-2\rho\le\tau\le r+2\rho$; and the range satisfies $\lvert R\rvert\ge r-2\rho\ge\kappa r$. These are the statements of the preparation note's root census with $1/16$ and $3/16$ replaced by $\rho$ and $\varpi$; the proofs are the same.

## 2. The equation in a chart, and how the sources divide

**Lemma 1 (regular map; derived).** Let $u$ be ancient and in the chart $(\rho,\varpi)$ on $(-\infty,T_0]$. For $T\le T_0+h$ with $0\le h<\kappa'=1-\rho-\rho'$, where $\rho\le\rho'<1/2$, and for a trial displacement $\alpha$ of member $i$ with $\lvert\alpha\rvert\le\rho'$, each other member $j=i-d$ has exactly one emission time $s=s_{i,d}(T,\alpha)\le T_0$ with $T-s=\lvert i+\alpha-X_j(s)\rvert$, and

$$
\mathcal G_i(T,\alpha)=g\Bigl\{E(\alpha)+\sum_{d\ne0}\sigma_d\bigl[\Psi\bigl(d+\alpha-u_{i-d}(s),u_{i-d}'(s)\bigr)-\Psi(d+\alpha,0)\bigr]\Bigr\},\qquad E(\alpha)=\sum_{d\ne0}\sigma_d f_d(\alpha),
$$

is well defined, with both sums absolutely convergent. It equals the block-prescribed sum of all rows received by a member at $i+\alpha$ at time $T$ from the paths before $T_0$. It is bounded, and Lipschitz jointly in the reception time $T$ and the position $\alpha$, uniformly in $i$ and for $T$ in bounded intervals, with

$$
\lvert\mathcal G_i(T,\alpha)\rvert\le g\,L_E\lvert\alpha\rvert+\frac{g}{(1-\varpi)^2}\sum_{d\ne0}\Bigl[\frac{3\lvert u_{i-d}(s)\rvert}{\kappa'^3r^3}+\frac{\lvert u_{i-d}'(s)\rvert}{\kappa'^2r^2}\Bigr],\qquad L_E\le\frac{6\rho'Z_4}{(1-2\rho')^4},\quad Z_4=\sum_{d\ne0}r^{-4}\le52 .
$$

*Proof.* *Root.* For $s\le T_0$ the function $(T-s)-\lvert i+\alpha-X_j(s)\rvert$ is strictly decreasing in $s$, tends to $+\infty$ as $s\to-\infty$, and at $s=T_0$ is at most $h-(r-\rho'-\rho)\le h-\kappa'<0$. So there is one root, with $T-s\ge r-\rho-\rho'$.

*Reduction.* Split each row as in the preparation note: the resting row $\sigma_dd/r^3$, the receiver-linear row $-\sigma_dT_d\alpha$, the receiver remainder $\sigma_df_d(\alpha)$ and the source bracket. The first two vanish as block sums, by the manuscript's resting cancellation and by the preparation note's cancellation of $\sum\sigma_dT_d$; neither statement involves $\alpha$ beyond linearity. For the third, $f_d(\alpha)=G(d+\alpha)-G(d)-\nabla G(d)\alpha$ with $G(x)=x/\lvert x\rvert^3$; the second derivative of $G$ is the third derivative of $-1/\lvert x\rvert$, whose norm is $6/\lvert x\rvert^4$, and for $0\le\theta\le1$, $\lvert d+\theta\alpha\rvert\ge r-\rho'\ge(1-2\rho')r$ because $r\ge1$. Hence $\lvert f_d(\alpha)\rvert\le3\lvert\alpha\rvert^2/((1-2\rho')^4r^4)$ and $\lvert\nabla f_d(\alpha)\rvert\le6\lvert\alpha\rvert/((1-2\rho')^4r^4)$, which sum over $d$ and give $E(0)=0$ and the bound on $L_E$. The sum $Z_4$ is finite: the sites with largest coordinate $m$ number $24m^2+2\le26m^2$ and are at distance at least $m$, so $Z_4\le26\sum_{m\ge1}m^{-2}\le52$. This is valid for every $\lvert\alpha\rvert<1/2$ and does not need the small-amplitude chart.

*Source bracket.* For $\lvert v\rvert\le\varpi$ the derivatives of $\Psi=n/(\lvert R\rvert^2D)$ satisfy $\lvert\partial_v\Psi\rvert\le1/(\lvert R\rvert^2(1-\varpi)^2)$ and $\lvert\partial_R\Psi\rvert\le(\sqrt5(1-\varpi)+\varpi)/(\lvert R\rvert^3(1-\varpi)^2)\le3/(\lvert R\rvert^3(1-\varpi)^2)$. Along the segment from $(d+\alpha,0)$ to $(d+\alpha-p,v)$, $p=u_{i-d}(s)$, $v=u_{i-d}'(s)$, the range is at least $r-\rho-\rho'\ge\kappa'r$. The mean value theorem gives the displayed bound for each bracket.

*Division of the sources.* Since $s\le T-r+\rho+\rho'<T-r+1$, every source with $r>T-T_-+1$ is sampled at a time before $T_-$, where $\lvert p\rvert,\lvert v\rvert\le Ae^{as}\le Ae^{a(T+1)}e^{-ar}$. These *ancient* sources are infinitely many and their brackets sum absolutely, with the exponential factor $e^{-ar}$. The remaining *recent* sources, those with $r\le T-T_-+1$, are finitely many, and each bracket is bounded using $\rho$ and $\varpi$. Hence $\mathcal G_i$ is finite and bounded uniformly in $i$.

*Lipschitz dependence.* The root depends on $\alpha$ with $\lvert\partial_\alpha s\rvert\le1/(1-\varpi)$, by the implicit-function theorem with derivative $-D$ in $s$. The derivative of a bracket in $\alpha$ is the difference of $\partial_R\Psi$ at the two ends of the segment, bounded by the second derivatives of $\Psi$ times $(\lvert p\rvert,\lvert v\rvert)$, plus the terms from the moving root, $(\lvert\partial_R\Psi\rvert\lvert u_{i-d}'(s)\rvert+\lvert\partial_v\Psi\rvert\lvert u_{i-d}''(s)\rvert)\lvert\partial_\alpha s\rvert$. Each is a bounded multiple of $(\lvert p\rvert+\lvert u_{i-d}'(s)\rvert+\lvert u_{i-d}''(s)\rvert)/r^2$, summable over the ancient sources by the same exponential factor and finite over the recent ones; this is where the bound on second derivatives in the definition of a chart is used.

*Dependence on the reception time.* Hold the receiver position fixed. The resting subtraction $\Psi(d+\alpha,0)$ and $E(\alpha)$ do not depend on $T$. The root moves with $\partial_Ts=1/D$, and with $R=d+\alpha-u_j(s)$,

$$
\partial_T\Psi\bigl(R,u_j'(s)\bigr)=\frac{-\partial_R\Psi\bigl(R,u_j'(s)\bigr)\,u_j'(s)+\partial_v\Psi\bigl(R,u_j'(s)\bigr)\,u_j''(s)}{D},
$$

which by the two first-derivative bounds is at most $\bigl[3\lvert u_j'(s)\rvert/(\kappa'^3r^3)+\lvert u_j''(s)\rvert/(\kappa'^2r^2)\bigr]/(1-\varpi)^3$. Only the first two derivatives of the source path enter, and they are continuous, so each bracket is continuously differentiable in $T$; the bound is summable over the ancient sources by the exponential factor and finite over the recent ones. Together with the previous paragraph, $\mathcal G_i$ is Lipschitz in $(T,\alpha)$ on the stated domain, uniformly in $i$.

*Explicit tails.* Let the receptions be at times $T\le t_+$ and let $R_c>t_+-T_-+1$, so that every source beyond $R_c$ is ancient. The three parts of the sum have three different tails, with $\lvert d\rvert=r$:

$$
\Bigl\lvert g\sum_{r>R_c}\sigma_d[\text{bracket}]\Bigr\rvert\le\frac{g\,A\,e^{a(t_++1)}}{(1-\varpi)^2}\sum_{r>R_c}e^{-ar}\Bigl(\frac{3}{\kappa'^3r^3}+\frac{1}{\kappa'^2r^2}\Bigr),\qquad
\Bigl\lvert g\sum_{r>R_c}\sigma_df_d(\alpha)\Bigr\rvert\le\frac{3g\rho'^2}{(1-2\rho')^4}\sum_{r>R_c}\frac1{r^4},
$$

and the tails of the derivatives of the brackets in $T$ and in $\alpha$ are at most $C_\partial\,g\,A\,e^{a(t_++1)}\sum_{r>R_c}e^{-ar}(r^{-2}+r^{-3}+r^{-4})$, with $C_\partial$ fixed by $\rho'$, $\varpi$ and the second-derivative constants of $\Psi$, which are not evaluated. By the shell count just used, for an integer $N$ the sites outside the cube of half-width $N$ contribute at most $26/N$ to $\sum r^{-4}$ and at most $26\,e^{-a(N+1)}(N+1)^{2-p}/(1-e^{-a})$ to $\sum e^{-ar}r^{-p}$ for $p\ge2$. So the source tails are exponentially small in the cutoff and the receiver-remainder tail is only algebraic. The resting rows and the receiver-linear rows have no such tails: they are not absolutely summable and enter only through their block sums, which vanish; the exponential bound for the brackets is not a bound for individual resting rows. $\square$

The division in the proof is the one the release asks for. At a reception time $T\ge0$ the sources seen at times after zero are those within distance about $T+1$; all others are seen in the constructed past, and it is the past's exponential decay in time that makes their sum converge, whatever the spatial behaviour.

## 3. Unique continuation by steps

**Theorem 1 (derived).** Let $u$ be ancient, in the chart $(\rho,\varpi)$ on $(-\infty,T_0]$, and a solution of the equation there, meaning $u_i''(T)=\mathcal G_i(T,u_i(T))$ with every root taken on the path itself. Let $\rho<\rho'<1/2$ and $\varpi<\varpi'<1$, let $G_{\max}$ bound $\lvert\mathcal G_i(T,\alpha)\rvert$ of Lemma 1 for $T_0\le T\le T_0+(1-2\rho')/2$ and $\lvert\alpha\rvert\le\rho'$, and put

$$
h=\min\Bigl\{\frac{1-2\rho'}2,\ \frac{\varpi'-\varpi}{G_{\max}},\ \frac{\rho'-\rho}{\varpi'}\Bigr\}.
$$

Then $u$ has a continuation to $(-\infty,T_0+h]$ that is twice continuously differentiable, in the chart $(\rho',\varpi')$, ancient, and a solution of the equation. It is unique among all twice continuously differentiable continuations that lie in some chart $(\rho'',\varpi'')$ with $\rho''<1/2$, $\varpi''<1$.

*Proof.* For $T\in[T_0,T_0+h]$ and a continuation in the chart $(\rho',\varpi')$, two members at any two times of the step are at least $1-2\rho'$ apart, which is more than the step length $h\le(1-2\rho')/2$, so no root is emitted during the step; since $h<\kappa'$, Lemma 1 applies; and no member has a root on its own path because its speed is below one throughout. Every root is therefore the root of Lemma 1 in the path before $T_0$, and the equation for member $i$ during the step is the ordinary differential equation $\alpha''=\mathcal G_i(T,\alpha)$ with data $u_i(T_0)$, $u_i'(T_0)$. Its right side is continuous in $T$ and Lipschitz in $\alpha$, so it has exactly one solution while $\lvert\alpha\rvert\le\rho'$; the choice of $h$ keeps the speed at most $\varpi+hG_{\max}\le\varpi'$ and the displacement at most $\rho+h\varpi'\le\rho'$ throughout the step. The equations of different members are not coupled during the step, and the bounds are uniform in $i$, so the step length is common to all members. At $T_0$ the new acceleration is $\mathcal G_i(T_0,u_i(T_0))$, which is the old one because the given history solves the equation at $T_0$; the continuation is twice continuously differentiable across the join with no compatibility condition to impose. The continued family solves the equation with roots on its own paths, by the first sentence. For uniqueness, a competing continuation in a chart $(\rho'',\varpi'')$ satisfies the same ordinary equations on a first step of length less than $1-2\max\{\rho',\rho''\}$ by the same argument, so it agrees there, and the argument repeats. $\square$

**Maximal continuation.** For an ancient charted solution define $T_{\max}\le\infty$ as the supremum of the times to which it continues within charts. By Theorem 1 the continuation is unique, and if $T_{\max}<\infty$ then no single chart $(\rho,\varpi)$ with $\rho<1/2$, $\varpi<1$ contains it on $[0,T_{\max})$: otherwise the step length would be bounded below and the solution would continue past $T_{\max}$.

## 4. The constructed history, continued

The preparation theorem was proved for the seed $\varepsilon\phi$. Its proof uses the seed only through three properties: it is real, it solves the linear equation on $T\le0$, and its norm in $X_a$ is small. Stating it that way gives the uniqueness radius the matching needs.

**Lemma 2 (preparation for a general small linear solution; derived from the accepted proof).** Take the norms without weight, $m=0$. With $C_L\le0.0446$, $C_N$ and $C_N'$ the constants of the preparation note, put

$$
\varrho_0=\min\Bigl\{\frac{\rho_0}{8},\ \frac1{128\,C_LC_N'}\Bigr\},\qquad
\delta_0=\min\Bigl\{\frac{\rho_0}{2},\ \frac1{32\,C_LC_N'},\ \frac{\sqrt2-1}{8\,C_LC_N},\ \sqrt{\frac{\varrho_0}{2C_LC_N}}\Bigr\},\qquad\rho_0=\frac1{16}.
$$

For every real $\psi\in X_a$ with $\psi''=g\mathcal K\psi$ on $T\le0$ and $\lVert\psi\rVert_a\le\delta_0$ there is exactly one $v$ with $\lVert v\rVert_{2a}\le\varrho_0$ such that $\psi+v$ solves the Master Equation on $T\le0$; it satisfies $\lVert v\rVert_{2a}\le2C_LC_N\lVert\psi\rVert_a^2$. If $\psi$ has finite norm with the weight of exponent $m$, so does $v$, with $\lVert v\rVert_{2a}^{(m)}\le2C_LC_N\lVert\psi+v\rVert_a^{(0)}\lVert\psi\rVert_a^{(m)}$.

*Proof.* The map $\Phi_\psi(v)=(I-\mathcal Jg\mathcal K)^{-1}\mathcal J\mathcal N[\psi+v]$ is defined on the ball $\lVert v\rVert_{2a}\le\varrho_0$ because $\lVert\psi+v\rVert_a\le\delta_0+4\varrho_0\le\rho_0$. By the preparation note's Lemma 2(b) it has Lipschitz constant at most $8C_LC_N'(\delta_0+4\varrho_0)\le1/2$ there. By its Lemma 2(a), $\lVert\Phi_\psi(v)\rVert_{2a}\le C_LC_N(\lVert\psi\rVert_a+4\lVert v\rVert_{2a})^2$, which maps the ball of radius $2C_LC_N\lVert\psi\rVert_a^2\le\varrho_0$ into itself when $8C_LC_N\lVert\psi\rVert_a\le\sqrt2-1$. So there is a fixed point in the small ball, and two fixed points in the ball of radius $\varrho_0$ coincide because the map contracts there. The weighted statement is the truncated-weight absorption of the preparation theorem, which needs $4C_LC_N\lVert\psi+v\rVert_a^{(0)}\le1/2$; this follows from $\lVert\psi+v\rVert^{(0)}_a\le\lVert\psi\rVert_a+8C_LC_N\lVert\psi\rVert_a^2\le\sqrt2\,\delta_0$ and the third entry of $\delta_0$. $\square$

The only difference from the accepted theorem is that uniqueness is stated in the ball of fixed radius $\varrho_0$, in which the map is already a contraction, and not only in the ball of radius $O(\varepsilon^2)$ that it maps into itself. For $\varepsilon$ small the constructed $u^\varepsilon$ of the preparation theorem, with any weight exponent, is the solution of Lemma 2 for $\psi=\varepsilon\phi$: its correction has unweighted norm at most its weighted norm, which is $O(\varepsilon^2)\le\varrho_0$.

**The translated seed.** The contour formula defines $\phi_j(T)$ for every real $T$, and $\phi$ solves the linear equation at every $T$. For $t\ge0$ put $\phi^t(T)=\phi(T+t)$. In the bounds of the preparation note's Lemma 3 the time enters only through $\sup_\Gamma\lvert e^{\lambda(T+t)}\rvert$, which is $e^{a(T+t)}$ for $T+t\le0$ and $e^{\lambda_+(T+t)}$ for $T+t>0$; in both cases it is at most $e^{aT}e^{\lambda_+t}$ when $T\le0\le t$. Hence, with $\bar\Lambda_m$ the constant of that lemma for the weight of exponent $m$,

$$
\lVert\phi^t\rVert_a^{(m)}\le\bar\Lambda_m\,e^{\lambda_+t}\qquad(t\ge0).
$$

**Theorem 2 (the constructed history continues; derived).** Let $0<\varepsilon\le\delta_0/\bar\Lambda_0$, small enough for the preparation theorem, and put

$$
T_1(\varepsilon)=\frac1{\lambda_+}\ln\frac{\delta_0}{\varepsilon\bar\Lambda_0}\ \ge0 .
$$

Then the constructed history $u^\varepsilon$ has a continuation $u$ to $(-\infty,T_1(\varepsilon)]$ with the following properties.

1. It solves the unchanged Master Equation with the block prescription at every time, with one root per distinct source and none on a member's own path. It is the unique continuation of $u^\varepsilon$ in the class of Theorem 1.
2. For $0\le T\le T_1(\varepsilon)$ and every $j$: $\lvert u_j(T)-\varepsilon\phi_j(T)\rvert\le2C_LC_N\bar\Lambda_0^{2}\,\varepsilon^2e^{2\lambda_+T}$, with the same bound for the first two derivatives after division by $2a$ and $(2a)^2$.
3. On the whole of $(-\infty,T_1(\varepsilon)]$: displacements are at most $1/16$, speeds at most $3/16$, accelerations at most $9/16$, transmitter factors at least $13/16$, separations at least $7/8$, and each delay is within $1/8$ of the anchor distance.
4. For every weight exponent $m$ and $0\le T\le T_1(\varepsilon)$: $\sup_jw_j\lvert u_j(T)\rvert\le\varepsilon\bar\Lambda_me^{\lambda_+T}(1+2\sqrt2\,C_LC_N\delta_0)$, and likewise for the derivatives. The continued disturbance decays in space faster than any power at each such time.

*Proof.* Fix $t\in[0,T_1(\varepsilon)]$. Then $\psi=\varepsilon\phi^t$ is real, solves the linear equation on $T\le0$ and has $\lVert\psi\rVert_a^{(0)}\le\varepsilon\bar\Lambda_0e^{\lambda_+t}\le\delta_0$. Lemma 2 gives $\tilde v^t$ with $\lVert\tilde v^t\rVert_{2a}\le2C_LC_N\lVert\psi\rVert_a^2\le\varrho_0$ such that $\tilde u^t=\varepsilon\phi^t+\tilde v^t$ solves the Master Equation on $T\le0$. The equation and the block prescription do not depend on the time origin, so $U(T)=\tilde u^t(T-t)$ solves it on $T\le t$, and $U=\varepsilon\phi+c$ with $c(T)=\tilde v^t(T-t)$.

*Matching of the prescribed past.* On $T\le0$,

$$
\sup_{T\le0}e^{-2aT}\lvert c_j(T)\rvert=e^{-2at}\sup_{T'\le-t}e^{-2aT'}\lvert\tilde v^t_j(T')\rvert\le e^{-2at}\lVert\tilde v^t\rVert_{2a}\le\varrho_0,
$$

and the same holds for the two derivatives. So the restriction of $c$ to $T\le0$ is a correction of norm at most $\varrho_0$ for which $\varepsilon\phi+c$ solves the Master Equation on $T\le0$. By the uniqueness in Lemma 2 for the seed $\varepsilon\phi$, it equals the correction of $u^\varepsilon$. Hence $U=u^\varepsilon$ on $T\le0$: $U$ is a continuation of the constructed history, not another solution with the same seed.

*Properties.* $\lVert\tilde u^t\rVert_a^{(0)}\le\rho_0$, so $\tilde u^t$ is in the chart $(1/16,3/16)$ with the root census of the preparation note on $T\le0$; translating gives item 3 and the first sentence of item 1 on $T\le t$. Uniqueness in item 1 is Theorem 1, since $U$ and $u^\varepsilon$ are ancient and charted. For item 2 take $t=T$: $\lvert u_j(T)-\varepsilon\phi_j(T)\rvert=\lvert\tilde v^T_j(0)\rvert\le\lVert\tilde v^T\rVert_{2a}\le2C_LC_N(\varepsilon\bar\Lambda_0e^{\lambda_+T})^2$. Continuations obtained with different $t$ agree on their common domain by Theorem 1. For item 4 use the weighted statement of Lemma 2 at $t=T$: $w_j\lvert u_j(T)\rvert\le\lVert\varepsilon\phi^T\rVert_a^{(m)}+\lVert\tilde v^T\rVert_{2a}^{(m)}\le\varepsilon\bar\Lambda_me^{\lambda_+T}(1+2C_LC_N\cdot\sqrt2\,\delta_0)$, using $\lVert\tilde u^T\rVert_a^{(0)}\le\sqrt2\,\delta_0$. $\square$

**What kind of interval this is.** $T_1(\varepsilon)$ is positive for every $\varepsilon$ below the threshold and grows like $\lambda_+^{-1}\ln(1/\varepsilon)$ as $\varepsilon\to0$. It is existential in the sense that $\delta_0$ contains $C_N$ and $C_N'$, which rest on unevaluated derivative constants of $\Psi$, and $\bar\Lambda_0$ depends on the unquantified contour neighbourhood. Beyond $T_1(\varepsilon)$ Theorem 1 applies with $\rho=1/16$, $\varpi=3/16$ and gives a further step whose length is explicit in terms of $G_{\max}$: with $\rho'=1/8$, $\varpi'=1/4$ it is $\min\{1/(16G_{\max}),\ 1/4\}$.

**The structure behind Theorem 2.** The solutions $\psi+v[\psi]$ of Lemma 2, over small linear solutions $\psi$ built on the contour, form a family that the forward evolution maps to itself while it stays small, and on which the evolution is the linear evolution of the seed: the solution with seed $\psi$ at time $t$ is the solution with seed $\psi(\cdot+t)$ at time zero. The nonlinear motion of the constructed disturbance is therefore conjugate to the linear motion of its seed for as long as the seed's norm stays below $\delta_0$. Nothing of this kind is claimed beyond that threshold.

## 5. The continued disturbance grows

**Proposition 3 (derived; existential constants).** Let the seed be $V(k)=b(k)\,\mathbf e$ with $\mathbf e$ a fixed real unit vector and $b$ a real, even, nonnegative, smooth bump about $Q$. Suppose the contour radius is small enough that $\partial_\lambda(\lambda h(\lambda))>0$ on the real diameter of $\Gamma$, which holds for small radii because its value at $\lambda_g$ is $\lambda_gh'(\lambda_g)>0$, and that $b$ is supported in a neighbourhood of $Q$ so small that for every $k$ in it (i) the three zeros of $\det F(k,\cdot)$ inside $\Gamma$ are real and $\partial_\lambda F$ is positive definite at them, and (ii) $\mathbf e^{\mathsf T}P(k)\mathbf e\ge p_0>0$, where $P(k)=\frac1{2\pi i}\oint_\Gamma F(k,\lambda)^{-1}d\lambda$. Then there are $c,C>0$ with

$$
\sup_j\lvert\phi_j(T)\rvert\ge c\,e^{(2a-\lambda_+)T}\quad(T\ge0),\qquad
\sup_j\lvert u_j(T)\rvert\ge\frac c2\,\varepsilon\,e^{(2a-\lambda_+)T}\quad\text{for }0\le T\le T_2(\varepsilon)=\frac{1}{3\lambda_+-2a}\ln\frac{c}{2C\varepsilon},
$$

where $2a-\lambda_+=\lambda_g-3\varrho_\Gamma>1.9$ and $T_2(\varepsilon)\le T_1(\varepsilon)$ for small $\varepsilon$. At $T_2(\varepsilon)$ the largest displacement is at least a constant times $\varepsilon^{\vartheta}$ with $\vartheta=8\varrho_\Gamma/(\lambda_g+5\varrho_\Gamma)$, which is below $0.59$ by the hand bounds $2.7<\lambda_g<3$ and $\varrho_\Gamma\le\lambda_g-2.65$ (below $0.33$ with the measured $\lambda_g=2.7952$) and tends to zero with the contour radius.

*Proof.* Such a neighbourhood exists: at $Q$, $F=\lambda h(\lambda)I$ has a triple zero at $\lambda_g$ inside $\Gamma$ with $\partial_\lambda F=\lambda_gh'(\lambda_g)I>0$ and $P(Q)=I/(\lambda_gh'(\lambda_g))$; for $k$ near $Q$ the number of zeros inside $\Gamma$ stays three by continuity of the argument integral, and the real symmetric matrix $F(k,\lambda)$ on the real diameter of $\Gamma$ keeps $\partial_\lambda F>0$ and opposite definite signs at the two ends, as at $Q$, so each of its three eigenvalues crosses zero once and the three zeros are real; (ii) holds by continuity. At a real zero $\lambda_0$ with kernel spanned by the columns of $K$ the pole of $F^{-1}$ is simple with residue $K(K^{\mathsf T}\partial_\lambda FK)^{-1}K^{\mathsf T}$, positive semidefinite. Hence for every real $T$, $\hat\phi(k,T)=\sum_{\lambda_0}e^{\lambda_0T}P_{\lambda_0}(k)V(k)$, and for $T\ge0$, since every $\lambda_0\ge a$,

$$
\mathbf e\cdot\hat\phi(k,T)=b(k)\sum_{\lambda_0}e^{\lambda_0T}\,\mathbf e^{\mathsf T}P_{\lambda_0}\mathbf e\ \ge\ b(k)\,e^{aT}\,\mathbf e^{\mathsf T}P(k)\mathbf e\ \ge\ p_0\,b(k)\,e^{aT} ,
$$

and since $\lvert\hat\phi\rvert\ge\mathbf e\cdot\hat\phi$ this gives $\sum_j\lvert\phi_j(T)\rvert^2=(2\pi)^{-3}\int\lvert\hat\phi\rvert^2dk\ge c_2^2e^{2aT}$ by Parseval. The weighted bound of the seed with the fourth power of $1+\lvert j\rvert$ gives $\sum_j\lvert\phi_j(T)\rvert\le C_1e^{\lambda_+T}$. Since $\sup_j\lvert\phi_j\rvert\ge\sum\lvert\phi_j\rvert^2/\sum\lvert\phi_j\rvert$, the first inequality follows with $c=c_2^2/C_1$. The second follows from item 2 of Theorem 2, with $C=2C_LC_N\bar\Lambda_0^2$, as long as $C\varepsilon^2e^{2\lambda_+T}\le\tfrac c2\varepsilon e^{(2a-\lambda_+)T}$, which is $T\le T_2(\varepsilon)$. The exponent $\vartheta$ is $1-(2a-\lambda_+)/(3\lambda_+-2a)$. $\square$

So the continued disturbance does not stay of size $\varepsilon$: it grows by at least the factor $\varepsilon^{-(1-\vartheta)}$. The bound does not show that it reaches a size independent of $\varepsilon$; the loss $\varepsilon^\vartheta$ comes from the spread of growth rates across the contour, $a\le\lambda\le\lambda_+$, which the proof bounds from the two sides separately.

## 6. Spatial localization lasts as long as a chart does

**Proposition 4 (weighted a-priori bound; derived).** Let $u$ be a solution on $(-\infty,T_e]$, $T_e\ge0$, in the chart $(\rho,\varpi)$, with $\lVert u\rVert_a<\infty$ on $T\le0$ for a rate $a>1/4$ and a weight of exponent $m$. Put

$$
K_0=g\,L_E+\frac{3g\,e^{2a\rho}S_3(a-\tfrac14)}{(1-\varpi)^2\kappa^3},\qquad K_1=\frac{g\,e^{2a\rho}S_2(a-\tfrac14)}{(1-\varpi)^2\kappa^2},\qquad\nu_*=\max\Bigl\{a,\ \frac{K_1+\sqrt{K_1^2+4K_0}}2\Bigr\},
$$

with $L_E\le6\rho Z_4/\kappa^4$ and $Z_4\le52$. Then for every $\nu>\nu_*$, every $j$ and every $0\le T\le T_e$,

$$
w_j\max\Bigl\{\lvert u_j(T)\rvert,\ \frac{\lvert u_j'(T)\rvert}{\nu},\ \frac{\lvert u_j''(T)\rvert}{\nu^2}\Bigr\}\le\lVert u\rVert_a\,e^{\nu T}.
$$

The rate does not depend on the weight exponent.

*Proof.* Let $\theta(T)=e^{aT}$ for $T\le0$ and $e^{\nu T}$ for $T\ge0$, and let $M(T)$ be the supremum over $t\le T$ and $j$ of $w_j\theta(t)^{-1}\max\{\lvert u_j\rvert,\lvert u_j'\rvert/\nu,\lvert u_j''\rvert/\nu^2\}$, first with the weight replaced by the truncated weight $\min\{w_j,L\}$, for which $M(T)$ is finite because the chart bounds every term. Since $\nu\ge a$, $M(0)\le\lVert u\rVert_a$. For $s\le T$ one has $\theta(s)/\theta(T)\le e^{-a(T-s)}$ in each of the three cases $s\le T\le0$, $s\le0\le T$, $0\le s\le T$. A source at anchor distance $r$ is sampled at $s=T-\tau$ with $\tau\ge r-2\rho$, so $\lvert u_{i-d}(s)\rvert\le M(T)\theta(T)e^{2a\rho}e^{-ar}\omega_d/w_i$ and $\lvert u_{i-d}'(s)\rvert$ obeys the same bound times $\nu$. With the bracket bound of Lemma 1 and $\lvert E(\alpha)\rvert\le L_E\lvert\alpha\rvert$,

$$
\frac{w_i\lvert u_i''(T)\rvert}{\theta(T)}\le(K_0+\nu K_1)\,M(T)=\tilde q\,\nu^2M(T),\qquad\tilde q=\frac{K_0+\nu K_1}{\nu^2}<1\ \text{ for }\nu>\nu_* ,
$$

using $\sum_d\omega_de^{-ar}/r^p\le S_p(a-\tfrac14)$. Integrating from $0$ to $t\le T$: $w_i\lvert u_i'(t)\rvert\le\nu M(0)+\tilde q\nu M(T)(e^{\nu t}-1)\le\nu e^{\nu t}\max\{M(0),\tilde qM(T)\}$, and then $w_i\lvert u_i(t)\rvert\le e^{\nu t}\max\{M(0),\tilde qM(T)\}$. So $M(T)\le\max\{M(0),\tilde qM(T)\}$, and since $M(T)$ is finite and $\tilde q<1$, $M(T)\le M(0)$. The bound is uniform in the truncation $L$; let $L\to\infty$. $\square$

The rate is an upper bound from absolute values and is far from the true growth. The following values are floating evaluations by the session instrument, at $a=2.65$, with the preparation note's hand-majorant formula evaluated in floating point at $2.4$ ($S_2\approx1.1018$, $S_3\approx0.8680$) and with the instrument's estimate $16.79$ for $Z_4$. That estimate is a floating cube sum plus shell terms up to $m=199999$ only; the omitted shells add at most $26/199999\approx1.3\times10^{-4}$, and no roundoff enclosure exists. The values are therefore illustrations of the formula's size, not certified upper bounds; with the proved bound $Z_4\le52$ in place of $16.79$ the same floating evaluation gives about $60$ for the first row.

| $\rho$ | $\varpi$ | $L_E$ bound | $K_0$ | $K_1$ | $\nu_*$ |
| ---: | ---: | ---: | ---: | ---: | ---: |
| $1/16$ | $3/16$ | $10.7$ | $303$ | $48.6$ | $54.2$ |
| $1/8$ | $1/4$ | $39.8$ | $977$ | $108$ | $116$ |
| $1/4$ | $1/2$ | $403$ | $1.15\times10^4$ | $1061$ | $1072$ |
| $3/8$ | $3/4$ | $9671$ | $4.66\times10^5$ | $3.29\times10^4$ | $3.29\times10^4$ |

The use of the proposition is qualitative, and needs only that $Z_4$ and $S_p(a-\tfrac14)$ are finite: on every bounded time interval inside a chart the disturbance has finite spatially weighted size for every weight, so far members are as nearly at rest as a power of the distance requires. With $m=0$ it also bounds the largest displacement by $\lVert u\rVert_a^{(0)}e^{\nu T}$.

## 7. How regular evolution can end

**Theorem 5 (continuation alternative; derived).** Let $u$ be the maximal continuation of an ancient charted solution that has finite weighted norm on $T\le0$ for some exponent $m\ge1$, for instance of a constructed history, and suppose $T_{\max}<\infty$. Then one of the following holds.

- **(X) Chart exit.** $\sup_{T<T_{\max}}\sup_j\lvert u_j(T)\rvert=1/2$.
- **(W) Arrival.** $\sup_{T<T_{\max}}\sup_j\lvert u_j(T)\rvert=\bar\rho<1/2$, every position and velocity has a limit at $T_{\max}$, and the set $A$ of members whose limiting speed equals one is nonempty and finite. Every member has speed below one at every earlier time, all members outside a bounded region have limiting speed at most $1/2$, and all separations are at least $\gamma=1-2\bar\rho$ up to and at $T_{\max}$.

In case (W), for each $i\in A$, with $N_i$ the set of receptions within $\gamma/4$ of $T_{\max}$ in time and of $X_i(T_{\max})$ in position:

- **(F2)** for every reception in $N_i$ each other member has exactly one root in its path before $T_{\max}$, emitted before $T_{\max}-\gamma/4$, at range at least $\gamma/4$, and the complete block-prescribed sum of rows, resting part included, is the field $B_i(t,x)=\mathcal G_i(t,x-i)$ of Lemma 1, bounded and Lipschitz in time and position on $N_i$ and fixed by the paths before $T_{\max}-\gamma/4$;
- **(F3)** the paths are twice continuously differentiable and the sources on the emission times used have a common speed margin below one;
- **(F1)** holds for every continuation in which all positions are continuous and all members stay within $\gamma/4$ of their positions at $T_{\max}$ for a common positive time: no root is then emitted at or after $T_{\max}$.

The rate $\beta_i=\mathbf u_0\cdot\mathcal G_i(T_{\max},u_i(T_{\max}))$ at which the speed of an arriving member reaches one is nonnegative. Whether it is positive is not decided. What a positive rate would give, and in which class of continuations, is stated after the proof; it is not a literal application of the curved-path theorem.

*Proof.* By the remark after Theorem 1, either the displacement supremum is $1/2$, which is (X), or it is $\bar\rho<1/2$ and the speed supremum over $[0,T_{\max})$ is one. In the second case every delay is at least $\gamma$. For $T\in[T_{\max}-\gamma/2,T_{\max})$ every emission used precedes $T_{\max}-\gamma/2$, where the solution is in a chart $(\bar\rho,\bar\varpi)$ with $\bar\varpi<1$. Call $T_p=T_{\max}-\gamma/2$ the end of this *prefix*. Proposition 4, applied on $(-\infty,T_p]$ in that chart with some $\nu>\nu_*(\bar\rho,\bar\varpi)$, gives $w_j\lvert u_j(s)\rvert\le\lVert u\rVert_a\theta(s)$ and $w_j\lvert u_j'(s)\rvert\le\nu\lVert u\rVert_a\theta(s)$ for all $s\le T_p$, with $\theta(s)=e^{as}$ for $s\le0$ and $e^{\nu s}$ for $s\ge0$. The row bound of Lemma 1 involves the speed of the source and not of the receiver, and on the last window every range is at least $\gamma r$. Multiplying the bracket bound by $w_i\le w_{i-d}\omega_d$ and splitting the sources: for the finitely many recent ones, $r\le T_{\max}+1$, use $\theta(s)\le e^{\nu T_{\max}}$; for the ancient ones, $r>T_{\max}+1$, the emission time is negative and $\theta(s)\le e^{a(T_{\max}+1)}e^{-ar}$. This gives, for $T_p\le T<T_{\max}$,

$$
w_i\lvert u_i''(T)\rvert\le C_0\,w_i\lvert u_i(T)\rvert+C_1,\qquad C_0=g\,L_E(\bar\rho),
$$

$$
C_1=\frac{g\,\lVert u\rVert_a}{(1-\bar\varpi)^2}\Bigl\{e^{\nu T_{\max}}\!\!\sum_{r\le T_{\max}+1}\!\!e^{r/4}\Bigl[\frac{3}{\gamma^3r^3}+\frac{\nu}{\gamma^2r^2}\Bigr]+e^{a(T_{\max}+1)}\Bigl[\frac{3S_3(a-\tfrac14)}{\gamma^3}+\frac{\nu S_2(a-\tfrac14)}{\gamma^2}\Bigr]\Bigr\}.
$$

Both constants are fixed by the prefix, its chart and $T_{\max}$; neither presupposes a chart that reaches the endpoint. Gronwall's inequality on the window bounds $w_i\lvert u_i\rvert$, $w_i\lvert u_i'\rvert$ and $w_i\lvert u_i''\rvert$ uniformly in $i$ and $T<T_{\max}$. Bounded accelerations give limits of velocities and positions. With $m\ge1$ the weighted bound makes $\lvert u_i'\rvert\le1/2$ outside a bounded set of members, so the supremum of the speeds, which is one, is approached by one of finitely many members, whose limiting speed is therefore one; this is (W).

For (F2), fix $i\in A$ and a reception $(t,x)\in N_i$; then $\lvert x-i\rvert\le\bar\rho+\gamma/4<1/2$. For a source $j$ and $s<T_{\max}$ the incidence function $(t-s)-\lvert x-X_j(s)\rvert$ is strictly decreasing, positive in the remote past and, as $s\uparrow T_{\max}$, at most $\gamma/4-3\gamma/4<0$; with $\theta=T_{\max}-s$ the range is at most $\theta+\gamma/4$ and at least $3\gamma/4-\theta$, so $\theta\ge\gamma/4$ and the range is at least $\gamma/4$. The emission times used are thus before $T_{\max}-\gamma/4$, where the sources are in a chart with a speed margin, and Lemma 1 applies with that chart, the receiver displacement $x-i$ and the path before $T_{\max}-\gamma/4$: the reduction to $E$ plus the source brackets is valid for every receiver displacement below $1/2$, the resting block sum contributes $E(x-i)$, and the sum is bounded and Lipschitz. (F3) is part of the same statement. For (F1), under the stated condition two members at any two times of the common window after $T_{\max}$ are more than $\gamma/2$ apart, which exceeds the window's length when that is at most $\gamma/4$. Finally $\beta_i\ge0$ because the speed was below one before $T_{\max}$ and is continuously differentiable up to it. $\square$

**What a positive rate would give, and in what class.** The [curved-path obstruction](../../analysis/curved-path-wake-speed-obstructions.md) is stated for continuations in which the sum of all individual rows converges absolutely. That is not literally the present law: here the contribution of the other members is the prescribed grouped sum, whose resting part converges only block by block, so the theorem's class does not contain the lattice and no literal inclusion is claimed. The adapted class is the following. A continuation after $T_{\max}$ is *admitted* when all positions are continuous and satisfy the common-excursion condition of (F1); the velocity of member $i$ is continuous at $T_{\max}$ and absolutely continuous afterwards; and for almost every later time (a) the acceleration from the other members is the original block-prescribed grouped sum, which by (F1) and (F2) is the fixed field $B_i(t,x_i(t))$; (b) every positive-delay root of member $i$ on its own path is ordinary, and its own-path rows, with the unchanged kernel $g\,\mathbf n/(\tau^2\lvert D\rvert)$, sum absolutely; (c) $x_i''$ equals $B_i$ plus those own-path rows.

The proof of that note's Theorem U uses the rows of the other members only through their sum: in its Step 1 through the incoming equation $x''=B$, in its Steps 2 and 3 through the boundedness of $B$ and its continuity at the event along the continuation, which here follow from the joint Lipschitz property of Lemma 1. Its lemmas concern chords of the member's own path and do not involve the other members or the coupling. Replacing its absolutely summed partner rows by the grouped field $B_i$ therefore leaves the argument unchanged. The coupling enters only as the positive factor $g=16$ on each own-path row, so the forward component of a recent own row is at least $5g/\tau^2$ and the differential inequality for the speed excess $\epsilon$ becomes $\frac{d}{dt}\epsilon^2\ge5ga/(6t)$ with $a$ the approach rate; its divergence is the same. Hence: *if* an arrival (W) occurs with $\beta_i>0$, member $i$ has no admitted continuation. This is conditional twice over, on the positive rate and on the common-excursion condition, and it concerns the continuous-velocity class only. Nothing is claimed about velocity jumps or a measure form for the lattice, no differently ordered resting sum is considered, and since no arrival is established here, no obstruction is obtained.

**Reading of the three outcomes.** $T_{\max}=\infty$ is not excluded. (X) is the edge of the chart in which the equation was written as $E$ plus source brackets; at that edge two members may or may not be approaching contact, and a continuation in a different description may exist. It is not shown to be a physical boundary. (W) is the outcome to which the comparison's condition applies, and Theorem 5 verifies (F2) and (F3) there and reduces (F1) to a stated condition on the continuation; it does not establish that (W) occurs or that $\beta_i>0$.

## 8. What remains unproved, and what was tried

1. **A quantitative threshold.** $\delta_0$ and $T_1(\varepsilon)$ are existential. Making them numbers needs the derivative constants of $\Psi$ behind $C_N$ and $C_N'$ and a quantified contour neighbourhood for $\bar\Lambda_0$. Not attempted.
2. **Continuation to order-one amplitude.** Theorem 2 controls the solution only while the seed's norm is below $\delta_0$, a small constant. Beyond it, Theorem 1 continues the solution step by step, but the only quantitative control is Proposition 4, whose rate bounds growth from above and gives no lower bound. *Tried and insufficient:* (a) extending the contraction to larger amplitude fails at the Lipschitz constant of the remainder, which is proportional to the amplitude; (b) using Proposition 4 with $m=0$ as a growth bound gives a lower bound on the time spent in each chart, namely at least $\nu_*^{-1}\ln$ of the ratio of amplitudes, but no upper bound, so it cannot show that a chart is ever left; (c) Proposition 3's lower bound stops at $T_2(\varepsilon)$ where the second-order correction may be as large as the seed.
3. **Which ending.** Nothing here decides between $T_{\max}=\infty$, (X) and (W). The coherent branch's barrier against contact used the fact that only one partner approaches each member; a localized configuration has no such structure. The exact missing estimate is a bound that keeps $\sup_j\lvert u_j\rvert$ below $1/2$ up to the time some speed reaches one, or a mechanism that forces a speed to one in finite time.
4. **Positive rate.** At an arrival $\beta_i\ge0$ is automatic; $\beta_i>0$ is not shown.
5. **The comparison's E1 to E4.** E1 (forward continuation to order one in a weighted norm) is met up to the amplitude $\delta_0$ by Theorem 2 and qualitatively beyond it by Theorem 1 with Proposition 4; it is not met quantitatively to order one. E2 and E3 are items 3 and 4. E4, the full-field condition at an arrival, is established by Theorem 5 in the form (F2), (F3) and the conditional (F1), for arrivals reached inside a chart, with the grouped sum as the law's partner field.

## 9. Falsifiers

- Lemma 1: an ancient charted history and a trial displacement below $1/2$ for which a source has two roots or none before $T_0$ within the stated step, or for which the block-prescribed row sum differs from $\mathcal G_i$; an ancient charted history violating one of the three displayed tail bounds; or a reception domain of the stated kind on which the time derivative of a bracket exceeds the displayed bound.
- Theorem 1: two different twice continuously differentiable charted continuations of one ancient charted solution.
- Lemma 2 and Theorem 2: a real linear solution of norm at most $\delta_0$ with two corrections of norm at most $\varrho_0$; or a constructed history whose unique charted continuation violates item 2 or item 3 at some $T\le T_1(\varepsilon)$. A numerical run started at a finite time from the seed alone is a different history and does not test this.
- Proposition 3: a bump seed satisfying (i) and (ii) whose linear solution has $\sup_j\lvert\phi_j(T)\rvert e^{-(2a-\lambda_+)T}\to0$.
- Proposition 4: a charted solution with a weighted size exceeding $\lVert u\rVert_ae^{\nu T}$ at some time for some $\nu>\nu_*$.
- Theorem 5: a maximal continuation with $T_{\max}<\infty$, displacements bounded below $1/2$, and no member whose speed tends to one; or an arrival inside a chart at which the complete block-prescribed field is unbounded near the arriving member. For the conditional statement after the proof: an admitted continuation, in the adapted grouped-sum class, at an arrival with $\beta_i>0$; a differently ordered resting sum is outside the selected law and is not a counterexample.

## 10. Instrument and evidence

One session instrument, retained as `task-1-forward_constants.py`, evaluates the sums and the formula for $\nu_*$ in Proposition 4. It solves nothing. Its known cases, run first: a separable lattice sum against its closed form; a two-sided estimate for $Z_4$, required to contain the literature value $16.5323$; and the hand-majorant formula of the preparation note at $5.05$, which must dominate the direct sums and reproduce $0.04938$ and $0.04494$. **A defect found in review:** the instrument's upper estimate for $Z_4$ adds shell terms only up to $m=199999$ and calls the result an upper bound for the infinite sum. It is not: the omitted shells are positive, at most $26/199999$ in total. The instrument and its outputs are kept byte-for-byte as run, and the claim is withdrawn here and in the README: $16.79$ is a floating estimate, and the bound used in the proofs is the analytical $Z_4\le52$. Error sources: the exponential cube sums are truncated at half-width $60$ with tails below $10^{-60}$; the $Z_4$ tail is as just described; arithmetic is double precision with no roundoff enclosure; there is no history or continuous error because nothing is integrated. The table's values are therefore floating evaluations, quoted to three figures and used only qualitatively; they are not certified upper rates. The byte copy, its output and hashes are in the [evidence directory](../evidence/saturday-followups-2026-10-11/README.md); the output is also retained under `.local-data/master-equation-closure/saturday-followups/claude-task-1/` with a manifest. No job remains running.

No proof in this note depends on the instrument: the theorems use only that $S_p(a-\tfrac14)$ and $Z_4$ are finite, which is shown analytically.

## 11. Proposed propagation (not applied)

Shared trackers were not edited. Suggested text for the coordinator, for the lattice queue's localized-preparation task: "Forward evolution (Saturday follow-up, 2026-10-11, derived, under review): the constructed $g=16$ history continues uniquely by steps while displacements stay below $1/2$ and speeds below one; while its seed's norm is below an unevaluated threshold it equals the linear seed plus a second-order correction for a time of order $\ln(1/\varepsilon)$ with all preparation margins and all spatial decay orders; spatial localization persists in every chart; if regular evolution ends with displacements below $1/2$ it ends with finitely many members at wake speed and a fixed bounded Lipschitz grouped field from the others; no such ending is shown to occur. Open: a numerical threshold, continuation to order-one amplitude, which ending occurs, and a positive arrival rate."
