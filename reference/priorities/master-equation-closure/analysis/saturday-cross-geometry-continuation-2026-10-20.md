# Fixed-past field control for an infinite alternating lattice: a light-cone condition

## Result

**In words.** For a finite population, an architrino that reaches wake speed while it is a positive distance from every other member receives, for a short time afterwards, only wakes that the others emitted before the event; their rows add to a fixed field that is bounded and Lipschitz, and the existing wake-speed obstruction then applies as soon as the incoming rate of speed increase is positive. That is the finite-population lemma of the [cross-geometry comparison](saturday-cross-geometry-comparison-2026-10-10.md#4-the-arrival-obstruction-is-local-needs-two-numbers-and-is-stable). This note carries that control to the infinite alternating cubic lattice, which is the population of the lattice research line, with its own summation prescription: the original eight-source block sum for the resting part and an absolutely convergent changed-source correction.

Positive separation alone does not survive the passage to infinitely many members. The field from the far members is a sum over a three-dimensional population of rows that fall off only as the inverse square of distance, so whether it converges depends on how the far members move. The condition that makes it converge is a statement about the receiver's past light cone, that is, about each far member at the time it emitted the wake that reaches the receiver now. Write $R_j$ for the anchor distance of member $j$ from the receiver, $E_j$ and $V_j$ for the largest displacement and speed of member $j$ during the short window of emission times that can reach the receiver near the event, and $L_j$ for the Lipschitz constant of its velocity on that window. Suppose that every member stays within a fixed distance $b<1/2$ of its anchor (hypothesis (H1) below) and that the far members' speeds at the emission times are bounded by some $w<1$ (hypothesis (H2)). If in addition

$$
\sum_j\frac{E_j}{R_j^{3}}+\frac{V_j}{R_j^{2}}<\infty ,
$$

then the prescribed sum of the partner rows is a bounded continuous field fixed by the past (Theorem A). The first two hypotheses alone already give every other member exactly one ordinary causal root at every reception near the event, emitted a fixed time before it. If in addition $\sum_jL_j/R_j^2<\infty$, the field is Lipschitz. The constants and the infinite tails are explicit. At an arrival of member $i$ at wake speed with positive incoming rate, the hypotheses of the curved-path obstruction and of the jump exclusion then hold, so their conclusions hold for every continuation that keeps all members in a uniform ball about their anchors (Theorem A′).

Two sufficient forms of the condition are checked directly. An exponential envelope in time, which is the form in which the coherent branch and the localized lattice family are bounded, makes the light-cone factor $e^{-\mu R_j}$ appear and gives geometric tails (Corollary A.2). A power decay in space, uniform in time, works when the displacement decays at any positive power and the velocity faster than the inverse first power (Corollary A.3). The [sharpness companion](saturday-cross-geometry-continuation-2026-10-20-sharpness.md) shows that neither threshold can be lowered for histories in general: with polarity-correlated pulses of the type already accepted for the population class, a non-summable light-cone velocity or displacement profile makes the prescribed sum diverge.

**Statements and grades.**

| Statement | Grade | Where |
| --- | --- | --- |
| Lemma R. Pointwise and Lipschitz bounds on one changed-source row in terms of $E_j$, $V_j$, $L_j$ and the range floor | derived | [Section 3](#3-one-changed-source-row) |
| Theorem A. Under a uniform anchor ball and a speed margin on emission times, every other member has one ordinary root per reception near the event, emitted at least $\gamma$ earlier; under light-cone summability in addition, the prescribed sum is a bounded continuous (Lipschitz under the second sum) field determined by the past before $T_*-\gamma$ | derived | [Section 4](#4-theorem-a-the-far-members-act-as-a-fixed-field) |
| Theorem A′. At a positive-rate arrival in such a history, the hypotheses of the curved-path obstruction and of the jump exclusion hold for the arriving member, for every continuation keeping all members in the anchor ball | derived; the conclusions carry the grades and classes of the cited theorems | [Section 5](#5-theorem-a-the-obstruction-at-an-arrival) |
| Corollary A.2. Exponential-in-time envelopes give explicit geometric tails | derived | [Section 6](#6-explicit-tails) |
| Corollary A.3. Spatial decay with displacement exponent above $0$, velocity exponent above $1$ (and velocity-Lipschitz exponent above $1$ for the Lipschitz bound) suffices | derived | Section 6 |
| Proposition C. Under uniform spatial decay of speeds, an approach of the speed supremum to one is attained by a member; without decay a prescribed history can approach it with no member arriving | derived | [Section 7](#7-attainment-and-what-does-not-transfer) |
| The coherent staggered branch satisfies the hypotheses of Theorem A with explicit exponential tails | derived from the accepted bounds of its certificate | [Section 8](#8-the-coherent-branch-as-a-check) |

Everything is for the unchanged Master Equation with every positive-delay causal root kept, $c_f=1$, the full alternating population with every member dynamical, and the original eight-source block prescription. No continuation, update, event rule or changed law is selected, and no conserved account is used. A history in this note is any family of paths satisfying the stated regularity; a statement about histories is not a statement that they solve the equation, except where solving is stated as a hypothesis.

## 1. Scope and what was read

The assignment is the first open obligation recorded in the [final review of the comparison](saturday-cross-geometry-comparison-codex-review-2026-10-10.md#final-disposition--initiative-4-accepted-at-its-bounded-comparison-scope): transfer of the finite-population fixed-past field control to the infinite population, with explicit tail bounds. The comparison itself stated a sufficient condition, (F1) to (F3) of its [Section 6](saturday-cross-geometry-comparison-2026-10-10.md#6-the-lattice-what-carries-over-to-a-localized-preparation), as an abstract hypothesis on the full field. This note replaces that hypothesis by explicit inequalities on the history and proves the field conclusions from them.

Read in full before deriving: the comparison and its full review; the [staggered first event](../lattice-research/analysis/staggered-lattice-first-event.md) and its [adjudication](../lattice-research/analysis/staggered-lattice-first-event-independent-adjudication.md), which fix the prescription and supply the coherent case; the [population history class](population-history-class.md) and the [delayed-summation obstruction](population-delayed-summation.md); the [curved-path obstruction](curved-path-wake-speed-obstructions.md) and the [jump exclusion](curved-path-wake-speed-jump-exclusion.md), whose hypotheses Theorem A′ verifies; and the canonical [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) with its definition of causal emission times. Read in part: the stationary block reconstruction of the [population adjudication](population-independent-adjudication.md#independent-reconstruction-of-stationary-block-convergence) and the decision table and stationary-baseline section of the [summation adjudication](population-summation-independent-adjudication.md); hypothesis H2 and Fact 2 of the [class-level adjudication](../collinear-research/analysis/class-level-first-exit-independent-adjudication-2026-10-03.md); the opening and setting of the [summed signed lattice remainder](../lattice-research/analysis/saturday-summed-signed-lattice-remainder-2026-10-18.md). Nothing in the partly read documents is used beyond the passages named.

This note does not continue any lattice history, does not touch the growth or later fate of the localized family, which belongs to the lattice research line, and does not construct a passage through a ring fold.

## 2. Setting

**Population.** Labels are $j\in\mathbb Z^3$ with anchors $\mathbf p_j=j$ (unit spacing), polarities $\sigma_j=(-1)^{j_1+j_2+j_3}$ and coupling $g>0$; the lattice research uses $g=16$. A *history up to* $T_*$ is a family of paths $\mathbf X_j:(-\infty,T_*]\to\mathbb R^3$, each continuously differentiable with locally Lipschitz velocity. The displacement is $\mathbf u_j=\mathbf X_j-\mathbf p_j$.

**Rows and roots.** For a receiver at reception time $t$ and position $\mathbf x$, a root of source $j$ is an emission time $s<t$ with $t-s=\lvert\mathbf x-\mathbf X_j(s)\rvert$; this is the canonical causal constraint with $c_f=1$. With $\mathbf R=\mathbf x-\mathbf X_j(s)$, $r=\lvert\mathbf R\rvert$, $\mathbf n=\mathbf R/r$ the unit vector from the emission point to the receiver, $\mathbf v=\mathbf X_j'(s)$ and $D=1-\mathbf n\cdot\mathbf v$, the row received by member $i$ is $g\sigma_i\sigma_j\Psi(\mathbf R,\mathbf v)$, where

$$
\Psi(\mathbf R,\mathbf v)=\frac{\mathbf R}{r^{2}\,(r-\mathbf R\cdot\mathbf v)}=\frac{\mathbf n}{r^{2}D},\qquad \mathbf K(\mathbf y)=\Psi(\mathbf y,\mathbf 0)=\frac{\mathbf y}{\lvert\mathbf y\rvert^{3}} .
$$

Here $\Psi$ is the canonical per-hit row of the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#per-hit-acceleration) for $D>0$, divided by $g\sigma_i\sigma_j$, and $\mathbf K$ is the row of a source at rest. A root is *ordinary* when $D\ne0$ and it is isolated. The equation gives acceleration directly; no force is involved.

**The prescription.** The partner contribution received by member $i$ at $(t,\mathbf x)$ is

$$
\mathbf B_i(t,\mathbf x)=g\sigma_i\Bigl[\mathbf S_i(\mathbf x)+\sum_{j\ne i}\sigma_j\,\mathbf c_j(t,\mathbf x)\Bigr],\qquad \mathbf c_j(t,\mathbf x)=\sum_{s\ \text{root of}\ j}\Psi\bigl(\mathbf x-\mathbf X_j(s),\mathbf X_j'(s)\bigr)-\mathbf K(\mathbf x-\mathbf p_j).
$$

The *stationary field* $\mathbf S_i(\mathbf x)$ is the sum over the complete eight-source blocks $\{2\mathbf n+\boldsymbol\epsilon:\boldsymbol\epsilon\in\{0,1\}^3\}$, $\mathbf n\in\mathbb Z^3$, of $\sum_{j\in\text{block},\,j\ne i}\sigma_j\mathbf K(\mathbf x-\mathbf p_j)$. The *changed-source correction* $\sum_{j\ne i}\sigma_j\mathbf c_j$ is required to converge absolutely. This is the prescription of equation (6) of the [first-event note](../lattice-research/analysis/staggered-lattice-first-event.md#2-full-scalar-equation-and-source-orbits), written for a general receiver position and a general history. When the correction converges absolutely, the complete-block sum of the actual rows converges, in every order of the complete blocks, to the same $\mathbf B_i$, because it is the sum of an absolutely convergent block series and an absolutely convergent series. When the correction diverges, the prescription assigns no value.

**Hypotheses at an end time.** Fix a receiver $i$, a time $T_*$, a number $b\in(0,1/2)$ and a window half-width $h\in(0,(1-2b)/2)$. Put

$$
\gamma=1-2b-2h>0,\qquad c_W=2b+2h,\qquad \beta=b+h,\qquad \rho_j=R_j-2b-h,\qquad R_j=\lvert\mathbf p_j-\mathbf p_i\rvert .
$$

The *reception neighbourhood* is $N_h=\{(t,\mathbf x):\lvert t-T_*\rvert<h,\ \lvert\mathbf x-\mathbf X_i(T_*)\rvert<h\}$, and the *emission window* of source $j$ is $W_j=[T_*-R_j-c_W,\ T_*-R_j+c_W]$. Since $R_j\ge1=c_W+\gamma$, the window lies in $(-\infty,T_*-\gamma]$.

- **(H1) Uniform anchor ball.** $\lvert\mathbf u_j(s)\rvert\le b$ for every $j$ and every $s\le T_*$.
- **(H2) Speed margin on emission times.** $\lvert\mathbf X_j'(s)\rvert\le w$ for every $j\ne i$ and every $s\le T_*-\gamma$, with some $w<1$.
- **(H3) Light-cone profile.** For $j\ne i$ put $E_j=\sup_{W_j}\lvert\mathbf u_j\rvert$, $V_j=\sup_{W_j}\lvert\mathbf u_j'\rvert$, and let $L_j$ be the Lipschitz constant of $\mathbf u_j'$ on $W_j$.

The two light-cone sums are

$$
\Sigma_0=\sum_{j\ne i}\Bigl[\frac{2E_j}{\rho_j^{3}}+\frac{V_j}{(1-w)\rho_j^{2}}\Bigr],\qquad
\Sigma_1^{x}=\sum_{j\ne i}\Lambda_j^{x},\qquad \Sigma_1^{t}=\sum_{j\ne i}\Lambda_j^{t},
$$

with $\Lambda_j^x$, $\Lambda_j^t$ the row Lipschitz constants of Lemma R below. Every $\rho_j\ge1-2b-h=\gamma+h>0$, and $\rho_j\ge(1-2b-h)R_j$ because $R_j\ge1$.

The ball of (H1) is the same uniform-neighbourhood device that the [first-event adjudication](../lattice-research/analysis/staggered-lattice-first-event-independent-adjudication.md#14-consequence-for-unchanged-law-continuation) uses with radius $1/3$. It is a hypothesis on the history and, in Theorem A′, a restriction on admitted continuations; it is not derived here.

## 3. One changed-source row

The far members enter only through the correction rows $\mathbf c_j$, so the whole argument rests on a bound for one such row that is linear in the source's displacement, speed and velocity-Lipschitz constant at emission. The mechanism is simple: a source displaced by $\mathbf u$ changes the static row by at most the derivative of the inverse-square kernel times $\lvert\mathbf u\rvert$, an inverse-cube quantity; a source moving with velocity $\mathbf v$ changes the transmitter weight $1/D$ by a factor of order $\lvert\mathbf v\rvert$, which multiplies an inverse-square row. That second effect is one power of distance weaker in its decay, and it is the one the [delayed-summation obstruction](population-delayed-summation.md#exact-causal-rows-and-the-common-sign-correction) exploits.

Two derivative facts are used. First, $D\mathbf K(\mathbf z)=(I-3\hat{\mathbf z}\hat{\mathbf z}^{\mathsf T})/\lvert\mathbf z\rvert^{3}$ has eigenvalues $1,1,-2$ divided by $\lvert\mathbf z\rvert^3$, so $\lVert D\mathbf K(\mathbf z)\rVert=2/\lvert\mathbf z\rvert^3$; and $\lVert D^2\mathbf K(\mathbf z)\rVert\le24/\lvert\mathbf z\rvert^4$, the bound reconstructed in Section 7 of the [first-event adjudication](../lattice-research/analysis/staggered-lattice-first-event-independent-adjudication.md#7-independent-review-of-the-scalar-derivative-and-infinite-tails). Second, differentiating $\Psi=\mathbf R/(r^3D)$ with $\partial(r^3D)[\boldsymbol\delta]=r^2[(1+2D)\,\mathbf n\cdot\boldsymbol\delta-\mathbf v\cdot\boldsymbol\delta]$ gives

$$
\partial_{\mathbf R}\Psi[\boldsymbol\delta]=\frac{\boldsymbol\delta}{r^{3}D}-\frac{\mathbf n\,\bigl[(1+2D)\,\mathbf n\cdot\boldsymbol\delta-\mathbf v\cdot\boldsymbol\delta\bigr]}{r^{3}D^{2}},\qquad
\partial_{\mathbf v}\Psi[\boldsymbol\delta]=\frac{\mathbf n\,(\mathbf n\cdot\boldsymbol\delta)}{r^{2}D^{2}} .
$$

At $\mathbf v=\mathbf 0$ the first formula is $D\mathbf K$. For $\lvert\mathbf v\rvert\le w<1$ one has $D\in[1-w,1+w]$, $\lvert1/D-1\rvert\le\lvert\mathbf v\rvert/(1-w)$, and $(1+2D)/D^2-3=(1-D)(1+3D)/D^2$ of magnitude at most $\lvert\mathbf v\rvert(4+3w)/(1-w)^2$. Hence

$$
\lVert\partial_{\mathbf R}\Psi(\mathbf R,\mathbf v)\rVert\le\frac{c_R(w)}{r^{3}},\quad
\lVert\partial_{\mathbf R}\Psi(\mathbf R,\mathbf v)-\partial_{\mathbf R}\Psi(\mathbf R,\mathbf 0)\rVert\le\frac{c_v(w)\,\lvert\mathbf v\rvert}{r^{3}},\quad
\lVert\partial_{\mathbf v}\Psi\rVert\le\frac{1}{(1-w)^{2}r^{2}},
$$

$$
c_R(w)=\frac1{1-w}+\frac{3+3w}{(1-w)^2},\qquad c_v(w)=\frac1{1-w}+\frac{5+3w}{(1-w)^2}.
$$

The constant $c_R$ is not used in what follows; it is recorded because $c_v$ is obtained from the same expansion.

**Lemma R (one changed-source row).** *Assume (H1), (H2), and that source $j\ne i$ has exactly one root $s_j(t,\mathbf x)\in W_j$ at every $(t,\mathbf x)\in N_h$, with $D\ge1-w$. Then on $N_h$*

$$
\lvert\mathbf c_j(t,\mathbf x)\rvert\le\frac{2E_j}{\rho_j^{3}}+\frac{V_j}{(1-w)\rho_j^{2}},
$$

*and for $(t,\mathbf x),(t',\mathbf x')\in N_h$*

$$
\lvert\mathbf c_j(t,\mathbf x)-\mathbf c_j(t',\mathbf x')\rvert\le\Lambda_j^{x}\lvert\mathbf x-\mathbf x'\rvert+\Lambda_j^{t}\lvert t-t'\rvert ,
$$

$$
\Lambda_j^{x}=\frac{24E_j}{\rho_j^{4}}+\Bigl[c_v(w)+\frac{c_v(w)\,w+2}{1-w}\Bigr]\frac{V_j}{\rho_j^{3}}+\frac{L_j}{(1-w)^{3}\rho_j^{2}},\qquad
\Lambda_j^{t}=\frac{c_v(w)\,w+2}{1-w}\,\frac{V_j}{\rho_j^{3}}+\frac{L_j}{(1-w)^{3}\rho_j^{2}} .
$$

*Proof.* Write $\mathbf y=\mathbf x-\mathbf p_j$, $\mathbf u=\mathbf u_j(s_j)$, $\mathbf v=\mathbf X_j'(s_j)$ and $\mathbf R=\mathbf y-\mathbf u$. Since $\lvert\mathbf x-\mathbf p_i\rvert<\beta$ and $\lvert\mathbf u\rvert\le b$, every point of the segment from $\mathbf y$ to $\mathbf R$ has norm at least $R_j-\beta-b=\rho_j$. Split

$$
\mathbf c_j=\underbrace{\bigl[\Psi(\mathbf R,\mathbf v)-\Psi(\mathbf R,\mathbf 0)\bigr]}_{\mathbf I}+\underbrace{\bigl[\mathbf K(\mathbf y-\mathbf u)-\mathbf K(\mathbf y)\bigr]}_{\mathbf{II}} .
$$

The first term equals $(\mathbf n/r^2)(\mathbf n\cdot\mathbf v)/D$, of magnitude at most $V_j/((1-w)\rho_j^2)$. The second is at most $\sup\lVert D\mathbf K\rVert\,\lvert\mathbf u\rvert\le2E_j/\rho_j^3$ by the mean-value inequality on the segment. This is the pointwise bound.

For the Lipschitz bound, the root map is continuously differentiable on $N_h$: the incidence function $G=t-s-\lvert\mathbf x-\mathbf X_j(s)\rvert$ is continuously differentiable near the root, $\partial_sG=-D\le-(1-w)$, and the implicit-function theorem gives $\partial_ts_j=1/D$ and $\partial_{\mathbf x}s_j=-\mathbf n^{\mathsf T}/D$, both of norm at most $1/(1-w)$. Since $N_h$ is convex, along the segment joining two of its points $\lvert\Delta s\rvert\le(\lvert\Delta t\rvert+\lvert\Delta\mathbf x\rvert)/(1-w)$, and the source quantities change by $\lvert\Delta\mathbf u\rvert\le V_j\lvert\Delta s\rvert$ and $\lvert\Delta\mathbf v\rvert\le L_j\lvert\Delta s\rvert$, because $s_j$ stays in $W_j$. The function $\boldsymbol\Phi(\mathbf R,\mathbf v)=\Psi(\mathbf R,\mathbf v)-\Psi(\mathbf R,\mathbf 0)$ has $\partial_{\mathbf R}\boldsymbol\Phi$ of norm at most $c_v\lvert\mathbf v\rvert/r^3$ and $\partial_{\mathbf v}\boldsymbol\Phi=\partial_{\mathbf v}\Psi$. The straight segment between the two values of $(\mathbf R,\mathbf v)$ stays where $r\ge\rho_j$ and $\lvert\mathbf v\rvert\le w$, because $\mathbf R$ is a receiver point of the convex ball $\lvert\mathbf x-\mathbf p_i\rvert\le\beta$ minus a source point of the convex ball $\lvert\mathbf X-\mathbf p_j\rvert\le b$, and both balls are convex. With $\Delta\mathbf R=\Delta\mathbf x-\Delta\mathbf u$,

$$
\lvert\Delta\mathbf I\rvert\le\frac{c_vV_j}{\rho_j^{3}}\Bigl(\lvert\Delta\mathbf x\rvert+\frac{V_j(\lvert\Delta t\rvert+\lvert\Delta\mathbf x\rvert)}{1-w}\Bigr)+\frac{L_j(\lvert\Delta t\rvert+\lvert\Delta\mathbf x\rvert)}{(1-w)^{3}\rho_j^{2}} .
$$

For the second term, $\mathbf F(\mathbf x,\mathbf u)=\mathbf K(\mathbf x-\mathbf p_j-\mathbf u)-\mathbf K(\mathbf x-\mathbf p_j)$ has $\lVert\partial_{\mathbf x}\mathbf F\rVert\le\sup\lVert D^2\mathbf K\rVert\,\lvert\mathbf u\rvert\le24E_j/\rho_j^4$ and $\lVert\partial_{\mathbf u}\mathbf F\rVert\le2/\rho_j^3$, on the same convex set, so $\lvert\Delta\mathbf{II}\rvert\le24E_j\lvert\Delta\mathbf x\rvert/\rho_j^4+2V_j(\lvert\Delta t\rvert+\lvert\Delta\mathbf x\rvert)/((1-w)\rho_j^3)$. Adding, and using $V_j\le w$ in the quadratic term, gives $\Lambda_j^x$ and $\Lambda_j^t$. $\square$

> Claim grade: derived. The derivative formulas are exact differentiation of $\Psi$; the bounds follow from the mean-value inequality on convex sets on which the range floor $\rho_j$ and the speed bound $w$ hold. Falsifier: a source configuration in the stated sets violating one of the displayed inequalities, for example a moving source at range $r\ge\rho_j$ with $\lvert\Psi(\mathbf R,\mathbf v)-\Psi(\mathbf R,\mathbf 0)\rvert>\lvert\mathbf v\rvert/((1-w)r^2)$, or an error in the expansion of $\partial_{\mathbf R}\Psi$.

## 4. Theorem A: the far members act as a fixed field

**Theorem A.** *Assume (H1) and (H2). Then (a) and (d) hold; if also $\Sigma_0<\infty$, (b) holds; if also $\Sigma_1^x,\Sigma_1^t<\infty$, (c) holds.*

*(a) For every $(t,\mathbf x)\in N_h$ and every $j\ne i$ there is exactly one root $s_j(t,\mathbf x)$. It lies in $W_j$, satisfies $s_j\le T_*-\gamma$, has range at least $\rho_j\ge\gamma+h$, and has $D\ge1-w$.*

*(b) If $\Sigma_0<\infty$, the correction converges absolutely and uniformly on $N_h$. The prescribed sum $\mathbf B_i$ is continuous on $N_h$ and satisfies*

$$
\lvert\mathbf B_i(t,\mathbf x)\rvert\le g\Bigl[\sup_{\lvert\mathbf x-\mathbf p_i\rvert\le\beta}\lvert\mathbf S_i(\mathbf x)\rvert+\Sigma_0\Bigr].
$$

*It depends only on the paths on $(-\infty,T_*-\gamma]$.*

*(c) If also $\Sigma_1^x,\Sigma_1^t<\infty$, then $\mathbf B_i$ is Lipschitz on $N_h$, with constants at most $g[\operatorname{Lip}_\beta(\mathbf S_i)+\Sigma_1^x]$ in position and $g\Sigma_1^t$ in time, where $\operatorname{Lip}_\beta(\mathbf S_i)$ is the Lipschitz constant of the stationary field on the closed ball $\lvert\mathbf x-\mathbf p_i\rvert\le\beta$.*

*(d) Let all paths be continued to $[T_*,T_*+h)$ with continuous positions and with $\lvert\mathbf u_j(s)\rvert\le b$ for every $j$ and every $s$ in that interval. Then there is $\delta>0$ such that for $T_*\le t<T_*+\delta$ the roots of member $i$ in the other members' paths at $(t,\mathbf X_i(t))$ are exactly the $s_j(t,\mathbf X_i(t))$, and, when $\Sigma_0<\infty$, the partner contribution received is $\mathbf B_i(t,\mathbf X_i(t))$.*

*Proof.* (a) Take $(t,\mathbf x)\in N_h$, so $\lvert\mathbf x-\mathbf p_i\rvert<\beta$. For every $s$ at which the path of $j$ is defined, $\lvert\mathbf x-\mathbf X_j(s)\rvert\ge R_j-\beta-b=\rho_j$. At a root the delay equals the range, so $t-s\ge\rho_j$ and $s\le T_*+h-\rho_j=T_*-R_j+c_W$; and $t-s=\lvert\mathbf x-\mathbf X_j(s)\rvert\le R_j+\beta+b$ gives $s\ge T_*-R_j-c_W$. So every root lies in $W_j$, hence at or before $T_*-\gamma$. On $(-\infty,T_*-\gamma]$ the function $G_j(s)=t-s-\lvert\mathbf x-\mathbf X_j(s)\rvert$ is locally Lipschitz with derivative at most $-(1-w)$ almost everywhere, so it is strictly decreasing; it tends to $+\infty$ as $s\to-\infty$ because displacements are bounded; and at $s=T_*-\gamma$ it is at most $(h+\gamma)-\rho_j\le h+\gamma-(\gamma+h)=0$, with equality excluded because $\lvert t-T_*\rvert<h$ strictly. Hence exactly one root, with $D=1-\mathbf n\cdot\mathbf X_j'(s_j)\ge1-w$.

(b) Lemma R applies to every $j\ne i$, so $\lvert\mathbf c_j\rvert\le2E_j/\rho_j^3+V_j/((1-w)\rho_j^2)$ on $N_h$. These numbers are summable by hypothesis, and each $\mathbf c_j$ is continuous on $N_h$ because the root map is continuous. The Weierstrass test gives absolute and uniform convergence and a continuous sum. The stationary field is continuous and bounded on the closed ball $\lvert\mathbf x-\mathbf p_i\rvert\le\beta$, which contains no anchor other than $\mathbf p_i$ because $\beta<1$, and from which $\mathbf p_i$ is excluded by the omission $j\ne i$ (Section 6 gives explicit bounds). Every root used is emitted at or before $T_*-\gamma$, so nothing after that time enters.

(c) Lemma R gives the Lipschitz constants of each correction row; summing them and adding the stationary field's Lipschitz constant gives the claim.

(d) By continuity of $\mathbf X_i$ choose $\delta\le h$ with $\lvert\mathbf X_i(t)-\mathbf X_i(T_*)\rvert<h$ for $T_*\le t<T_*+\delta$, so $(t,\mathbf X_i(t))\in N_h$. A root emitted at $s\in[T_*,t)$ would need $t-s=\lvert\mathbf X_i(t)-\mathbf X_j(s)\rvert\ge\rho_j\ge\gamma+h$, but $t-s<\delta\le h$. So every root is emitted before $T_*$; the argument of (a), which used only (H1) and (H2) on $(-\infty,T_*-\gamma]$ and the anchor ball up to the emission time, shows that these roots are exactly the $s_j$. $\square$

The proof needs three things that a finite population supplies automatically and an infinite one does not: a range floor common to all sources (from the uniform anchor ball), a transmitter floor common to all sources (from the speed margin), and summability of the correction (from the light-cone sums). The first two are uniform versions of the finite lemma's hypotheses. The third has no finite counterpart, and the sharpness companion shows that it is not implied by the first two.

> Claim grade: derived; parts (a) and (d) from (H1) and (H2) alone, parts (b) and (c) from the light-cone sums and Lemma R in addition. Falsifier: a history satisfying (H1) and (H2) with a reception in $N_h$ at which some other member has no root, two roots or a root later than $T_*-\gamma$; a history satisfying also $\Sigma_0<\infty$ at which the correction series diverges; or, under the second hypothesis, a pair of receptions violating the stated Lipschitz bound. The places to look are the sign of $G_j$ at $T_*-\gamma$ and the monotonicity argument.

## 5. Theorem A′: the obstruction at an arrival

The curved-path theorems are stated for a population whose partner rows sum absolutely. In the lattice the partner rows do not sum absolutely; the stationary part converges only block by block. The proofs of those theorems use the partner sum only through the decomposition of the receiver's acceleration into its own-path rows and one partner field $\mathbf B$ that is bounded near the event and continuous at it. Their own-path lemmas (forward recent chords, newborn roots, no remote own roots, no own root below wake speed) concern the receiver's own path alone. The *population reading* of their continuation classes therefore replaces "the sum of rows converges absolutely and the acceleration equals it" by "own-path rows sum absolutely, the partner contribution is the prescribed sum $\mathbf B_i$, and the acceleration equals their total". The same replacement applies to clause (M2) of the measure form and to the phrase "rows sum absolutely" in hypothesis (P) of the jump exclusion.

**Theorem A′.** *Assume (H1), (H2) and $\Sigma_0<\infty$ at $(i,T_*)$. Assume that member $i$ has speed below one at every time before $T_*$ and that on $(T_*-h,T_*)$ its path solves the unchanged equation with the prescribed partner sum. Then its velocity has a limit $\mathbf u_0$ at $T_*$. If $\lvert\mathbf u_0\rvert=1$, then $\beta_i=\mathbf u_0\cdot\mathbf B_i(T_*,\mathbf X_i(T_*))\ge0$. If $\beta_i>0$, then hypotheses (U1), (U2) of the [curved-path obstruction](curved-path-wake-speed-obstructions.md) and (P) of the [jump exclusion](curved-path-wake-speed-jump-exclusion.md), in its corrected neighbourhood form and in the population reading, hold for member $i$ for every* admitted continuation: *one in which every member keeps continuous position and stays within $b$ of its anchor on $[T_*,T_*+h)$. Consequently, for admitted continuations: there is none in which the velocity of member $i$ is continuous at $T_*$, absolutely continuous afterwards, and satisfies the equation almost everywhere with ordinary roots (Theorem U); in the measure form its velocity cannot jump at $T_*$ (Theorem J); and there is none of bounded variation satisfying the measure form with its direction rule (Theorem BV).*

*Proof.* Below wake speed member $i$ has no own-path root (Lemma 0 of the jump exclusion), and for $T_*-h<t<T_*$ its position is within $h$ of $\mathbf X_i(T_*)$ because its speed is below one, so $(t,\mathbf X_i(t))\in N_h$ and $\mathbf X_i''=\mathbf B_i(t,\mathbf X_i(t))$. By Theorem A(b) the right side is bounded and continuous, so the velocity has a limit and the speed $v$, which is positive near the event when $\lvert\mathbf u_0\rvert=1$, is continuously differentiable up to $T_*$ with $v'\to\beta_i$. Since $v<1$ before $T_*$, $\beta_i\ge0$. If $\beta_i>0$, then $1-v(s)=\int_s^{T_*}v'\ge(\beta_i/2)(T_*-s)$ near $T_*$, which with the subunit past is (U1). For (U2), the equation $\mathbf X_i''=\mathbf B_i$ holds on $(T_*-h,T_*)$, and $t\mapsto\mathbf B_i(t,\mathbf X_i(t))$ is bounded and continuous at $T_*$ along any admitted continuation by Theorem A(b) and (d). For (P): at every reception in $N_h$, for every admitted continuation, every root in another member's path is ordinary ($D\ge1-w$), isolated (one per source), emitted at or before $T_*-\gamma$, and the partner contribution is the prescribed sum, bounded and continuous at the event (Theorem A(a), (b), (d)); the set of partner emission times received at one instant is countable, hence of zero length. $\square$

The finite-population theorem allows the other members any continuation with continuous positions. With infinitely many members that is not enough: continuity of each path separately gives each member its own time before it can approach the receiver, and the infimum of those times over infinitely many members can be zero. The uniform anchor ball supplies one time for all. The [first-event adjudication](../lattice-research/analysis/staggered-lattice-first-event-independent-adjudication.md#14-consequence-for-unchanged-law-continuation) restricts continuations in the same way for the coherent branch.

> Claim grade: derived from Theorem A; the conclusions are those of the cited theorems, with their grades (derived, each with a same-session adjudication) and their classes, read for the population as stated above; Theorem BV is conditional on the direction rule (M4). The case $\beta_i=0$ and continuations leaving the uniform anchor ball are not covered. Falsifier: an admitted continuation, in one of the named classes, at an arrival satisfying the hypotheses with $\beta_i>0$; the place to look is a contribution received by member $i$ that is neither an own-path row nor part of $\mathbf B_i$, which Theorem A(d) excludes.

## 6. Explicit tails

**The stationary field.** For a block with centre $\mathbf c_{\mathbf n}=2\mathbf n+(\tfrac12,\tfrac12,\tfrac12)$, every corner is at distance $a=\sqrt3/2$ from the centre. The alternating corner sum is a threefold first difference, which the fundamental theorem of calculus writes as an integral of a mixed third derivative of $\mathbf K$ over a unit cube; this is the argument of the [population adjudication](population-independent-adjudication.md#independent-reconstruction-of-stationary-block-convergence). Applied to $\mathbf K$ and to $D\mathbf K$ it gives, for a receiver $\mathbf x$ with $\lvert\mathbf x-\mathbf p_i\rvert\le\beta$ and $R_{\mathbf n}=\lvert\mathbf c_{\mathbf n}-\mathbf p_i\rvert>\beta+a$,

$$
\lvert\mathbf B^{0}_{\mathbf n}(\mathbf x)\rvert\le\frac{C_3}{(R_{\mathbf n}-\beta-a)^{5}},\qquad
\lVert D\mathbf B^{0}_{\mathbf n}(\mathbf x)\rVert\le\frac{C_4}{(R_{\mathbf n}-\beta-a)^{6}},
$$

where $\mathbf B^0_{\mathbf n}$ is the block's contribution to $\mathbf S_i$, $C_3=\sup_{\lvert\mathbf y\rvert=1}\lVert D^3\mathbf K(\mathbf y)\rVert\le204$, and $C_4=\sup_{\lvert\mathbf y\rvert=1}\lVert D^4\mathbf K(\mathbf y)\rVert\le2220$. The bound on $C_3$ is the adjudication's. The bound on $C_4$ follows the same method: with $\varphi(\mathbf y)=\lvert\mathbf y\rvert^{-3}$, differentiating the adjudication's third-derivative expression

$$
D^3\varphi[\mathbf u,\mathbf v,\mathbf w]=15\bigl[(\mathbf u\cdot\mathbf v)(\mathbf y\cdot\mathbf w)+(\mathbf u\cdot\mathbf w)(\mathbf y\cdot\mathbf v)+(\mathbf v\cdot\mathbf w)(\mathbf y\cdot\mathbf u)\bigr]\lvert\mathbf y\rvert^{-7}-105(\mathbf y\cdot\mathbf u)(\mathbf y\cdot\mathbf v)(\mathbf y\cdot\mathbf w)\lvert\mathbf y\rvert^{-9}
$$

once more gives three terms with absolute coefficients $15+105$ and one group with $3\cdot105+945$, so $\lVert D^4\varphi\rVert\le(360+1260)\lvert\mathbf y\rvert^{-7}=1620\lvert\mathbf y\rvert^{-7}$ for unit arguments; the product rule for $\mathbf K=\mathbf y\varphi$ adds four terms $\lVert D^3\varphi\rVert\le150\lvert\mathbf y\rvert^{-6}$, so $C_4\le1620+600=2220$.

For $R\ge\max\{2\sqrt3,\,2(\beta+a)\}$ every block with $R_{\mathbf n}\ge R$ has $R_{\mathbf n}-\beta-a\ge R_{\mathbf n}/2$. The block centres with $R_{\mathbf n}\in[S,2S)$, $S\ge2\sqrt3$, have disjoint cubes of side $2$ inside the ball of radius $5S/2$, so there are fewer than $3\pi S^3$ of them. Summing over $S=2^kR$,

$$
\sum_{R_{\mathbf n}\ge R}\sup_{\lvert\mathbf x-\mathbf p_i\rvert\le\beta}\lvert\mathbf B^0_{\mathbf n}(\mathbf x)\rvert\le\frac{128\pi C_3}{R^{2}},\qquad
\sum_{R_{\mathbf n}\ge R}\sup_{\lvert\mathbf x-\mathbf p_i\rvert\le\beta}\lVert D\mathbf B^0_{\mathbf n}(\mathbf x)\rVert\le\frac{1536\pi C_4}{7R^{3}},
$$

the coefficients being $3\pi\cdot32\cdot\frac43$ and $3\pi\cdot64\cdot\frac87$. Each of the finitely many nearer blocks is bounded source by source: a source $j\ne i$ in it contributes at most $(\lvert\mathbf p_j-\mathbf p_i\rvert-\beta)^{-2}$ to the bound and $2(\lvert\mathbf p_j-\mathbf p_i\rvert-\beta)^{-3}$ to the Lipschitz constant, each finite because $\lvert\mathbf p_j-\mathbf p_i\rvert\ge1>\beta$. So $\mathbf S_i$ is bounded and Lipschitz on the closed $\beta$-ball, with explicit constants for every choice of the near radius $R$. The value of $\mathbf S_i$ at the anchor is not used and is not claimed here: the reflection through an anchor does not map the block partition to itself.

> Claim grade: derived. The $C_3$ bound and the counting argument are reconstructed from the adjudication; the $C_4$ bound is new and is obtained by the same coefficient count. Falsifier: a unit vector $\mathbf y$ and unit arguments with $\lvert D^4\mathbf K(\mathbf y)[\cdot]\rvert>2220$, or a block-count shell exceeding $3\pi S^3$.

**Corollary A.2 (exponential envelope).** *Suppose that for all $j\ne i$ and all $s,s'\le T_*-\gamma$*

$$
\lvert\mathbf u_j(s)\rvert\le M_0e^{\mu(s-T_*)},\quad \lvert\mathbf u_j'(s)\rvert\le M_1e^{\mu(s-T_*)},\quad \lvert\mathbf u_j'(s)-\mathbf u_j'(s')\rvert\le M_2e^{\mu(\max\{s,s'\}-T_*)}\lvert s-s'\rvert,
$$

*with $\mu>0$. Then $E_j\le M_0e^{-\mu(R_j-c_W)}$, $V_j\le M_1e^{-\mu(R_j-c_W)}$, $L_j\le M_2e^{-\mu(R_j-c_W)}$, and for every integer $N\ge0$, with $c_N=1-(2b+h)/(N+1)$, the part of the light-cone sums over labels with $\lVert j-i\rVert_\infty>N$ satisfies*

$$
\Sigma_0^{>N}\le26\,e^{\mu c_W}\Bigl[\frac{2M_0}{c_N^{3}(N+1)}+\frac{M_1}{(1-w)c_N^{2}}\Bigr]\frac{e^{-\mu(N+1)}}{1-e^{-\mu}},
$$

$$
\Sigma_1^{x,>N}\le26\,e^{\mu c_W}\Bigl[\frac{24M_0}{c_N^{4}(N+1)^{2}}+\frac{k_x(w)M_1}{c_N^{3}(N+1)}+\frac{M_2}{(1-w)^{3}c_N^{2}}\Bigr]\frac{e^{-\mu(N+1)}}{1-e^{-\mu}},
$$

*and the same expression for $\Sigma_1^{t,>N}$ with $24M_0$ replaced by $0$ and $k_x$ by $k_t$, where $k_t(w)=(c_v(w)w+2)/(1-w)$ and $k_x(w)=c_v(w)+k_t(w)$. With $N=0$ these are bounds for the complete sums.*

*Proof.* On $W_j$, $s-T_*\le c_W-R_j$. The labels with $\lVert j-i\rVert_\infty=m\ge1$ number $(2m+1)^3-(2m-1)^3=24m^2+2\le26m^2$, have $R_j\ge m$, hence $e^{-\mu R_j}\le e^{-\mu m}$ and $\rho_j\ge m-2b-h\ge c_Nm$ for $m\ge N+1$. Then $m^2\cdot m^{-3}\le(N+1)^{-1}$, $m^2\cdot m^{-4}\le(N+1)^{-2}$, $m^2\cdot m^{-2}=1$, and $\sum_{m\ge N+1}e^{-\mu m}=e^{-\mu(N+1)}/(1-e^{-\mu})$. $\square$

The light-cone sums are linear in $(E_j,V_j,L_j)$, so a bound that is a sum of envelopes with different rates gives the sum of the corresponding tails. The structure is that of the first-event tail (18): $26$ labels per unit squared shell radius, the position factor $2$ and the transmitter factor $1/(1-w)$, and a geometric series in the shell index. The light-cone factor $e^{-\mu R_j}$ is what converts growth in time into decay in space: a member at distance $R$ is seen as it was a time $R$ ago, when an exponentially growing motion was smaller by $e^{-\mu R}$.

> Claim grade: derived. Falsifier: an error in the shell count $24m^2+2$, in the floor $\rho_j\ge c_Nm$, or in the geometric sum.

**Corollary A.3 (power decay in space).** *Suppose that for some centre $\mathbf c\in\mathbb R^3$, all $j\ne i$ and all $s,s'\le T_*-\gamma$, with $\langle\mathbf y\rangle=(1+\lvert\mathbf y\rvert^2)^{1/2}$,*

$$
\lvert\mathbf u_j(s)\rvert\le M_0\langle\mathbf p_j-\mathbf c\rangle^{-k_0},\quad\lvert\mathbf u_j'(s)\rvert\le M_1\langle\mathbf p_j-\mathbf c\rangle^{-k_1},\quad\lvert\mathbf u_j'(s)-\mathbf u_j'(s')\rvert\le M_2\langle\mathbf p_j-\mathbf c\rangle^{-k_2}\lvert s-s'\rvert .
$$

*If $k_0>0$ and $k_1>1$, then $\Sigma_0<\infty$. If also $k_2>1$, then $\Sigma_1^x,\Sigma_1^t<\infty$.*

*Proof.* Each term has the form $M\langle\mathbf p_j-\mathbf c\rangle^{-k}\rho_j^{-p}$ with $(k,p)\in\{(k_0,3),(k_1,2),(k_0,4),(k_1,3),(k_2,2)\}$. For $R_j\ge2\lvert\mathbf c-\mathbf p_i\rvert$ the triangle inequality gives $\lvert\mathbf p_j-\mathbf c\rvert\ge R_j/2$, so the term is at most $M2^{k}(1-2b-h)^{-p}R_j^{-k-p}$; the shell count $26m^2$ with $R_j\ge m$ makes the sum finite when $k+p>3$. The remaining labels are finitely many. The five conditions $k+p>3$ reduce to $k_0>0$, $k_1>1$ and $k_2>1$. $\square$

A time-uniform spatial decay is a natural hypothesis for a localized history, but it is not the form in which the lattice research bounds its localized family; those bounds are exponential in time and fit Corollary A.2. Corollary A.3 is recorded because the sharpness companion shows that its thresholds $k_0>0$ and $k_1>1$ are exactly where the prescribed sum can begin to diverge.

> Claim grade: derived. Falsifier: an error in the reduction $\lvert\mathbf p_j-\mathbf c\rvert\ge R_j/2$ or in the shell summation criterion $k+p>3$.

## 7. Attainment, and what does not transfer

For a finite population whose regular evolution ends at a finite time with every distance positive, Proposition 2 of the comparison concludes that some member reaches speed one. With infinitely many members the speeds can approach one along a sequence of members that recedes to infinity, while no member reaches it. Theorem A′ is a statement about one member and says nothing at such an end.

**Proposition C.** *(a) Let a history on $(-\infty,T_*)$ have speeds below one and satisfy $\lvert\mathbf u_j'(s)\rvert\le M\langle\mathbf p_j-\mathbf c\rangle^{-k}$ for all $j$ and $s<T_*$, with $k>0$. If $\sup_j\limsup_{s\uparrow T_*}\lvert\mathbf X_j'(s)\rvert=1$, then some member has $\limsup_{s\uparrow T_*}\lvert\mathbf X_j'(s)\rvert=1$. (b) Without such a decay, there are histories, each path continuously differentiable with speed below one up to and including $T_*$, for which the supremum of the speeds at $T_*$ equals one.*

*Proof.* (a) Only the finitely many members with $M\langle\mathbf p_j-\mathbf c\rangle^{-k}\ge1/2$ can have speed above $1/2$; the supremum over the others is at most $1/2$, so the supremum is a maximum over a finite set of $\limsup$ values, which is attained. (b) Put $\kappa_j=1-1/(2+\lvert\mathbf p_j\rvert)$ and $\mathbf X_j(s)=\mathbf p_j+\tfrac14\kappa_je^{4(s-T_*)}\mathbf e_1$ for $s\le T_*$. Each path is smooth, its displacement is at most $1/4$, and its speed $\kappa_je^{4(s-T_*)}$ increases to $\kappa_j<1$ at $T_*$. The supremum of the $\kappa_j$ is one and no member attains it. $\square$

The example in (b) is a prescribed history, not a solution; whether a solution of the unchanged lattice equation can end regular evolution in this unattained way is open. The proposition shows only that the finite trichotomy (regular for all time, contact, arrival of a member) is not inherited by an infinite population without an additional uniform estimate, and that a uniform spatial decay of speeds is one such estimate.

> Claim grade: derived for (a) and for the existence of the prescribed histories in (b). Falsifier for (a): a history with the stated decay in which every member stays at speed below some $1-\epsilon_j$ while the supremum tends to one; the finiteness of the set of members allowed above $1/2$ excludes it.

Two further finite-population results do not transfer as stated.

- **Persistence under perturbation.** Theorem 2 of the comparison measures pasts in the uniform norm of position and velocity. In that norm the prescribed lattice sum is not defined on any neighbourhood of the resting history; this is the accepted [delayed-summation obstruction](population-delayed-summation.md#ordering-and-partition-scope). A persistence statement for lattice arrivals therefore needs additional summability control, through a stronger topology, for example one built on the exponential envelope of Corollary A.2, or through a suitably restricted admissible domain; the accepted obstruction excludes only the unrestricted uniform neighbourhood and does not single out a remedy. Such a statement must also handle simultaneous arrival of infinitely many members, where the perturbed first event is an infimum over infinitely many crossing times that Proposition C(b) shows need not be attained. No such statement is proved here.
- **Contact first.** The coherent branch excludes contact before arrival by its one-partner barrier; for a general lattice history no such barrier is available, exactly as for a general finite population.

## 8. The coherent branch as a check

The coherent staggered branch $\mathbf X_j(t)=\mathbf p_j+\sigma_jq(t)\mathbf e_3$ of the [first-event note](../lattice-research/analysis/staggered-lattice-first-event.md#1-the-exact-incoming-history) is a known case for Theorem A, because its field control at the event is already accepted in [Section 14 of its adjudication](../lattice-research/analysis/staggered-lattice-first-event-independent-adjudication.md#14-consequence-for-unchanged-law-continuation). Take $b=1/3$ and $h=1/12$, so $\gamma=1/6$, $c_W=5/6$, $\beta=5/12$; these are the adjudication's ball radius and its reception increment.

(H1) holds because the certified event displacement is below $0.2456<1/3$ and $q$ increases on the whole past. (H2) holds with $w=q'(t_*-1/6)$: the certificate gives $q''>0$ on the whole incoming history, so $q'$ is increasing, and $q'<1$ before $t_*$, so $w<1$. No numerical value of this $w$ is claimed here. The certificate's source-speed bound $0.0697$ concerns emissions up to $8.5909$, used at receptions up to $t_*$ with the actual ranges; the cruder geometry of $b=1/3$ admits emission times up to $t_*-1/6>9.13$, where only $w<1$ is available. Explicit constants for this case therefore need a certified value of $q'(t_*-1/6)$, or a smaller $b$ matched to the certified ranges. For (H3), every member with $R_j\ge t_*+c_W$, that is with emission window entirely before time zero, obeys the incoming bounds $\lvert q^{(k)}(s)\rvert\le\lambda^ka e^{\lambda s}+(2\lambda)^kK_0a^2e^{2\lambda s}$ for $k\le2$, $s\le0$, $a=2^{-40}$, $K_0=150000$, and integrating the $k=2$ bound over the window gives the velocity-Lipschitz component, so no third derivative is needed; the finitely many others have bounded jets on the certified prefix. So an envelope of the type of Corollary A.2 holds for each of the two terms, with rates $\lambda$ and $2\lambda$ and amplitudes proportional to $a e^{\lambda T_*}$ and $K_0a^2e^{2\lambda T_*}$, after enlarging the constants to cover the finitely many recent sources; applying the corollary to each term and adding gives the tails, exactly as in the first-event tail (18). Theorem A then gives the bounded, Lipschitz, fixed-past field on $N_{1/12}$, and Theorem A′ applies to every label, because exact sublattice symmetry gives every label the same speed one and the same rate $q'q''>5.97$ at $t_*$.

This reproduces the adjudication's conclusion from general hypotheses. It is a consistency check of Theorem A against an accepted case, not independent evidence for the coherent result, since it uses the same certified bounds.

> Claim grade: derived from the accepted certificate bounds. Falsifier: a certified bound quoted here that differs from the first-event note or its adjudication, or an emission time used at reception within $1/12$ of the event that is later than $t_*-1/6$.

## 9. What remains open, with the precise missing estimate

1. **For a localized lattice history at an event.** Theorem A reduces the full-field condition (F1) to (F3) of the comparison to three checkable estimates at the event time $T_*$: the uniform anchor ball (H1), the speed margin (H2) on emission times, and an envelope of the type of Corollary A.2, with velocity and velocity-Lipschitz components, holding up to $T_*-\gamma$. The accepted localized estimates are exponential in time and are proved on an interval ending at the lattice line's latest barrier, with no event there. Whether an envelope with all three components, including the velocity-Lipschitz one, follows from those accepted bounds on that interval is a check for the lattice owners; it is not made here. Whether it persists to an actual event is part of the lattice line's open forward problem (E1 to E3 of the comparison).
2. **Persistence.** A weighted-norm version of Theorem 2 for the lattice, with an attainment argument for simultaneous arrivals.
3. **Solutions with non-summable light-cone profiles.** The sharpness companion's divergent histories are prescribed pasts. Whether an actual solution of the lattice equation can carry polarity-correlated motion on a receiver's past light cone with a non-summable profile is open.
4. **The other two obligations of the comparison.** An evolved passage through a ring fold and global fate are untouched.

## 10. Evidence

This is an analytical note. No instrument run is used as evidence for any claim in Sections 3 to 8. The [evidence directory](../evidence/saturday-cross-geometry-2026-10-20/README.md) records the review rounds and an arithmetic sanity check of the derivative constants. That check samples points and does not prove the bounds; the proofs are the hand derivations above.
