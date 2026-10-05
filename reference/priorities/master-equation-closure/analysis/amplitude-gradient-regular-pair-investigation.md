# Amplitude-gradient response on a regular finite-pair history domain

The selected bounded investigation changes one response row while keeping the causal support, source identities and positive-delay admission rule. It yields three results: an explicit accelerated-source row, a local coupled evolution theorem on compatible regular histories, and a controlled comparison in which the canonical circle's linear tangential push is removed but a cubic forward push remains. These are derived results, analytically self-reviewed here and awaiting a separate mathematical adjudication. They establish no conserved physical account, global fate or singular-event continuation.

The [canonical Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) remains the baseline and independent comparison. The new operator is selected only for this regular finite-pair investigation through the [response-law decision](../work-queue.md#decide-whether-to-investigate-additional-response-law-proposals); selection is not adoption as canon. Its formulation responds to the [bounded proposal](research-alternatives-assessment-2026-10-03.md#a-bounded-amplitude-gradient-investigation-for-selection). All numerical conventions below set $c_f=1$.

## 1. Selected equation and dimensions

Let $\mathbf X_i(T)$ be the position of member $i\in\{+,-\}$, with opposite polarities. Let $K=\kappa|q_iq_j|>0$, and write $\sigma_{ij}=\operatorname{sign}(q_iq_j)$. Every admitted ordinary root solves

$$
R=\|\mathbf x-\mathbf X_j(S)\|=c_f(T-S)>0,
\qquad
\mathbf n=\frac{\mathbf x-\mathbf X_j(S)}R,
\qquad
D=1-\mathbf n\cdot\frac{\mathbf V_j(S)}{c_f}.
$$

Here $T$ is reception time, $S$ is emission time and $\mathbf x$ is the reception position. The selected acceleration contribution is

$$
\mathbf A_{i\leftarrow j}
=-\sigma_{ij}K\nabla_{\mathbf x}\frac1{R|D|},
\qquad
\mathbf X_i''(T)=\sum_{j,S}\mathbf A_{i\leftarrow j}(T,\mathbf X_i(T)).
$$

The spatial derivative holds $T$ and the complete source history fixed while following the implicit root $S(T,\mathbf x)$. It does not hold the emission event fixed. The sum retains the self channel and all positive-delay roots. On the domain proved below there is one partner root and no positive-delay self root, so no root is deleted by convention. There is no cap, debit, depletion, primitive mass or supplementary event rule.

The dimensional coupling is $[K]=L^3T^{-2}$. The scalar $1/(R|D|)$ has dimension $L^{-1}$ and its spatial derivative has dimension $L^{-2}$, giving acceleration dimension $LT^{-2}$. Equivalently the scalar is $c_f/(R|D_t|)$ with $D_t=c_f-\mathbf n\cdot\mathbf V_j$. Using $1/(R|D_t|)$ without the factor $c_f$ would change the dimensional normalization. No action or energy coefficient has been introduced.

## 2. Known controls before accelerated-source use

These controls are exact analytic references, not numerical replays.

### Stationary source

If $\mathbf X_j(S)$ is constant, then $S=T-r/c_f$, $R=r=\|\mathbf x-\mathbf X_j\|$ and $D=1$. Differentiating $1/r$ directly gives

$$
\mathbf A_{i\leftarrow j}=\frac{\sigma_{ij}K}{r^2}\mathbf n.
$$

Thus the stationary inverse-square response is retained. Changing its sign or coefficient would falsify the selected normalization.

### Affine source

Suppose $\mathbf X_j(S)=\mathbf X_j(T)+\mathbf v(S-T)$ with $\|\mathbf v\|<c_f$. Define the present-separation vector $\mathbf q=\mathbf x-\mathbf X_j(T)$, $r=\|\mathbf q\|>0$ and $\mathbf b=\mathbf v/c_f$. The causal equation gives

$$
(1-\|\mathbf b\|^2)R^2-2(\mathbf q\cdot\mathbf b)R-r^2=0,
\qquad
RD=\sqrt{(1-\|\mathbf b\|^2)r^2+(\mathbf q\cdot\mathbf b)^2}=L.
$$

This is obtained by expanding $\|\mathbf q+R\mathbf b\|^2=R^2$ and taking its positive root. Differentiating $1/L$ at fixed source history therefore gives

$$
\mathbf A_{\rm aff}
=\sigma_{ij}K
\frac{(1-\|\mathbf b\|^2)\mathbf q+(\mathbf q\cdot\mathbf b)\mathbf b}{L^3}.
$$

All corrections are even in $\mathbf b$. In particular there is no term linear in source velocity. This control establishes cancellation only for an affine source; an accelerated source must be tested separately.

## 3. Accelerated-source derivative

Work first with $c_f=1$ and a simple positive-$D$ root. Let $\mathbf v=\mathbf X_j'(S)$, $\mathbf a=\mathbf X_j''(S)$ and $P=I-\mathbf n\mathbf n^{\mathsf T}$. Differentiation of the causal equation yields $\nabla S=-\mathbf n/D$ and $\nabla R=\mathbf n/D$. Differentiation of the unit direction and then $D=1-\mathbf n\cdot\mathbf v$ gives

$$
\nabla D=-\frac{P\mathbf v}{R}
-\frac{\mathbf n\|P\mathbf v\|^2}{RD}
+\frac{\mathbf n(\mathbf n\cdot\mathbf a)}D.
$$

Consequently the selected row is exactly

$$
\boxed{
\mathbf A_{i\leftarrow j}
=\frac{\sigma_{ij}K}{R^2D^3}
\left[(1-\|\mathbf v\|^2)\mathbf n-D\mathbf v
+R\mathbf n(\mathbf n\cdot\mathbf a)\right].
}
$$

For example, multiply the derivative numerator $D(\mathbf n-P\mathbf v)-\mathbf n\|P\mathbf v\|^2+R\mathbf n(\mathbf n\cdot\mathbf a)$ out. Its first two terms become $(1-\|\mathbf v\|^2)\mathbf n-D\mathbf v$, which verifies the compact form without dropping a direction derivative. Restoring dimensions replaces $\mathbf v$ by $\mathbf v/c_f$ and $\mathbf a$ by $\mathbf a/c_f^2$ inside the bracket.

The sampled-acceleration coefficient is

$$
\frac{\sigma_{ij}K}{c_f^2RD^3}\mathbf n\mathbf n^{\mathsf T}.
$$

This coefficient is dimensionless. Its norm need not be less than one. The new law samples the highest derivative at a strictly earlier time; the canonical position/velocity history theorem cannot establish its evolution by substitution alone.

### A distinct accelerated control

Take $c_f=1$. Near $S=0$, prescribe $\mathbf X_j(S)=aS^2\mathbf e/2$, with $a\ne0$ and $\|\mathbf e\|=1$. At reception $(T,\mathbf x)=(d,d\mathbf e)$, $d>0$, the root is $S=0$, $R=d$, $\mathbf v=0$, $\mathbf a=a\mathbf e$ and $D=1$. The boxed row gives

$$
\mathbf A_{i\leftarrow j}=\sigma_{ij}K\left(\frac1{d^2}+\frac a d\right)\mathbf e.
$$

An independent one-dimensional differentiation verifies the acceleration term: near this reception the scalar denominator is $(T-S)(1-aS)$, while implicit differentiation gives $dS/dx=-1$ at the target. Thus $d(RD)/dx=1+da$ and $-\sigma K\,d[1/(RD)]/dx=\sigma K(1+da)/d^2$. A smooth compact cutoff of the quadratic source, with $|a|$ sufficiently small, produces a complete uniformly subfield history agreeing with these jets. This construction supplies a regular accelerated prescribed control rather than a solution of the mutually coupled law.

The three controls precede the slow-circle target below. They test the derivative, dimensions and delayed-acceleration contribution. No new numerical instrument has been run on a target.

## 4. Complete root census and finite history domain

Assume the complete past and the short continuation satisfy $\|\mathbf V_j\|\le(1-\eta)c_f$, with $0<\eta<1$, and that present pair separation lies in $[r_{\min},r_{\max}]$, where $r_{\min}>0$. For fixed reception $(T,\mathbf x)$ the source-time residual is $g(S)=\|\mathbf x-\mathbf X_j(S)\|-c_f(T-S)$. For $S_2>S_1$, the chord bound gives $g(S_2)-g(S_1)\ge\eta c_f(S_2-S_1)$, including times where the source passes the spatial reception point and the norm itself is not differentiable. At positive range its derivative is $c_fD\ge\eta c_f$. At $S=T$ the residual is the positive present separation. The chord bound also gives $g(T-u)\le r_{\max}-\eta c_fu$, hence it is negative for sufficiently large $u$. There is exactly one partner root. The triangle inequalities at that root give

$$
\frac{r_{\min}}{(2-\eta)c_f}\le T-S\le\frac{r_{\max}}{\eta c_f},
\qquad
\frac{r_{\min}}{2-\eta}\le R\le\frac{r_{\max}}\eta,
\qquad D\ge\eta.
$$

For a self root, the complete speed bound gives $\|\mathbf X_i(T)-\mathbf X_i(S)\|\le(1-\eta)c_f(T-S)<c_f(T-S)$ for every $S<T$. Therefore there is no positive-delay self root. The zero-delay coincidence is not an ordinary hit. These are full-root statements about the complete histories, not finite-horizon omissions.

The delay upper bound confines all required source values to a finite segment of the complete past. The unused older past remains part of the preparation; its complete speed bound is what excludes older roots.

The selected differentiation is branchwise on already admitted ordinary positive-delay hits. For the off-diagonal scalar made from the other member's roots, summing and differentiating commute on this finite chart, and give exactly the row above. They do not define the gradient of an all-source scalar at the receiver's own location. At neighboring spatial points a uniformly subfield self history has a short positive root, whose inverse-range amplitude diverges as the point approaches $\mathbf X_i(T)$. The full self-inclusive scalar is therefore singular at that location even though there is no ordinary positive-delay self hit on the path. Its gradient there is undefined. The absence of an ordinary self row follows from the admitted-hit census; it is not a subtraction or a regularization of that singular off-path scalar. Extending the proposal to such a global scalar would require an additional definition outside this selected domain.

## 5. Local coupled existence, uniqueness and seam propagation

Set $c_f=1$. Supply two complete histories $\boldsymbol\phi_i:(-\infty,0]\to\mathbb R^3$ that are locally $C^{2,1}$: twice continuously differentiable with locally Lipschitz acceleration. Suppose their complete speeds are at most $1-\eta$, and $r_0=\|\boldsymbol\phi_+(0)-\boldsymbol\phi_-(0)\|>0$. Require endpoint compatibility

$$
\boldsymbol\phi_i''(0)=F_i(0,\boldsymbol\phi_i(0);\boldsymbol\phi_j),
$$

where $F_i$ is the boxed partner row, using the complete other history. These are supplied preparations, not claims that the equation holds throughout their past.

This compatible class is nonempty. Start from two constant separated pasts at positions $\pm r_0\mathbf e/2$. Their partner roots at reception zero have emission time $-r_0$. Inside a much shorter recent interval $[-\delta,0]$, modify each history by $T^2\mathbf a_i\chi(T)/2$, where $\chi$ is a smooth cutoff equal to one near zero and zero before $-\delta$, and $\mathbf a_i$ is that member's stationary opposite-polarity acceleration. Endpoint positions and velocities are unchanged, endpoint accelerations now equal $\mathbf a_i$, and the roots at $-r_0$ sample unmodified pasts. Taking $\delta$ sufficiently small bounds the added velocity below the chosen subfield margin. Monotonicity gives the same unique root, so endpoint compatibility holds exactly.

**Theorem.** Such data have a unique short $C^{2,1}$ continuation solving the selected coupled equation. The continuation remains uniformly subfield, separated and on the complete one-partner/no-self-root chart. On families with common strict margins, bounded finite-window $C^2$ norms and a common acceleration-Lipschitz bound, solutions depend locally Lipschitz continuously in finite-window $C^2$ norm on the supplied histories over a sufficiently short common interval. No differentiable semiflow or extension through a failed margin is asserted.

**Proof.** Choose candidate future paths with speeds at most $1-\eta/2$ and pair separation at least $r_0/2$. Their full histories then satisfy the preceding census with margin $\eta/2$. Every partner delay is at least $r_0/[2(2-\eta/2)]>r_0/4$. On an interval $0\le T\le h<r_0/8$, each root therefore satisfies $S<-r_0/8$. Only supplied past values are sampled. Taking a compact reception-position neighborhood and a slightly larger past interval than the root upper bound supplies fixed range and transmitter margins throughout that neighborhood.

This first-step right side can be constructed without guessing the other member's future. Restrict $\mathbf x$ to a ball of radius $r_0/4$ about $\boldsymbol\phi_i(0)$. Then $q_0=\|\mathbf x-\boldsymbol\phi_j(0)\|\ge3r_0/4$ and $g(0)=q_0-T>0$ for $T\le h<r_0/8$. On the supplied past $g$ is strictly increasing, tends to a negative value towards the complete past and has one root. The past chord bound gives $R\ge q_0/(2-\eta)>3r_0/8$, so $S=T-R<-r_0/4$. Its range upper bound follows from $\eta R\le q_0-(1-\eta)T\le q_0$, using $R=T-S$. Every evaluation therefore lies in a fixed compact portion of the supplied past. Once the future solution exists with the stated speed and separation margins, the complete census proves that this constructed root is the only admitted root.

For that first step, $F_i(T,\mathbf x;\boldsymbol\phi_j)$ is an explicitly prescribed function of $T$ and $\mathbf x$. The implicit root is locally Lipschitz with constants bounded by the transmitter margin. The source position and velocity are locally Lipschitz and its acceleration is Lipschitz on the compact sampling interval. The boxed row is therefore locally Lipschitz in $(T,\mathbf x)$, with bounded denominators. The first-order system

$$
\mathbf X_i'=\mathbf V_i,\qquad
\mathbf V_i'=F_i(T,\mathbf X_i;\boldsymbol\phi_j)
$$

has a unique solution by the direct Picard contraction of its integral form on a small sup-norm position/velocity ball. To make that elementary argument explicit, choose a ball with speed and position slack, let $M$ bound the right side and $L$ be its Lipschitz constant there, and take $h$ small enough that $Mh$ stays inside the slack and $Lh<1$. Integration then preserves the ball and contracts differences. Although the initial steps decouple after the complete pasts are supplied, both members satisfy the mutually specified equation, with no frozen-host replacement.

The right side is Lipschitz in $T$ along the resulting $C^1$ position path, so the new acceleration is Lipschitz. Compatibility makes its value agree with the old acceleration at $T=0$. A function Lipschitz on each side of a seam and continuous at the seam is Lipschitz across it, using the sum of the two side estimates. Thus the joined history is $C^{2,1}$. At any later restart while the speed, separation and finite-history regularity margins hold, choose a step shorter than half the common minimum delay. All sampled accelerations again belong to already determined history. Positions and velocities agree at the restart by integration; acceleration agrees because it is the same continuous complete-root functional on both sides. When a sampled emission time crosses an earlier seam, the globally continuous, locally Lipschitz acceleration remains available. No matching of a third derivative is needed for $C^{2,1}$, and its almost-everywhere derivative may have finite jumps.

For continuous dependence, let two complete preparations share the margins and acceleration-Lipschitz bound. On their common compact sampling interval, implicit-root displacement is bounded by the $C^0$ source difference divided by the transmitter margin. Sampled position, velocity and acceleration differences are bounded by their direct $C^2$ differences plus the common Lipschitz constants times that root displacement. The right-side difference is consequently bounded by $C(\|\phi-\widetilde\phi\|_{C^2}+\|X-\widetilde X\|_{C^0})$. Subtraction of the two integral equations, or iteration of their contraction estimates, bounds position and velocity differences; the row bound then bounds acceleration differences. This gives the stated $C^2$ dependence. Dependence in the stronger acceleration-Lipschitz norm and differentiability of the history map have not been proved. $\square$

A bare $C^2$ history defines the row but need not make its sampled acceleration Lipschitz, so that class is not covered by the uniqueness argument. Conversely the acceleration coefficient need not be small: strict positive delay permits the method of steps even when that coefficient is large. Reaching $D=0$, coincidence, loss of the speed margin, or an unbounded local history norm ends this theorem's guarantee rather than selecting an outgoing continuation.

## 6. Controlled slow-source estimate

Take one reception and let $\mathbf q=\mathbf x-\mathbf X_j(T)$, $r=\|\mathbf q\|>0$ and $\mathbf n_0=\mathbf q/r$. Throughout the entire causal interval assume $\|\mathbf V_j\|\le\epsilon c_f$ with $\epsilon\le1/8$, and $\|\mathbf X_j''\|\le A_*$. Define the dimensionless acceleration bound $\alpha=A_*r/c_f^2$. Then

$$
\boxed{
\mathbf A_{i\leftarrow j}
=\frac{\sigma_{ij}K}{r^2}\mathbf n_0+\mathbf R_{\rm ag},
\qquad
\|\mathbf R_{\rm ag}\|\le\frac{256K}{r^2}(\epsilon^2+\alpha).
}
$$

This estimate does not assume that acceleration is negligible merely because speed is small.

**Proof of the bound.** Set $c_f=1$. Compare the actual source with the affine history anchored at its present position and velocity $\mathbf p=\mathbf V_j(T)$. At its actual delay $R$, Taylor's integral bound gives source-position error at most $A_*R^2/2$. Both actual and affine ranges lie in $[r/(1+\epsilon),r/(1-\epsilon)]$. Monotonicity of the affine causal residual, with slope magnitude at least $1-\epsilon$, gives $|R-R_{\rm aff}|\le A_*r^2/[2(1-\epsilon)^3]<A_*r^2$. Comparing the two emission-to-reception vectors then gives $\|\mathbf n-\mathbf n_{\rm aff}\|\le2A_*r$; the sampled velocity satisfies $\|\mathbf v-\mathbf p\|\le A_*r/(1-\epsilon)<2A_*r$.

Write the nonacceleration part as $B(R,\mathbf n,\mathbf v)=[(1-\|\mathbf v\|^2)\mathbf n-D\mathbf v]/(R^2D^3)$. On the convex segment between the actual and affine arguments, $R\ge8r/9$, $\|\mathbf n\|\le1$, $\|\mathbf v\|\le1/8$ and $D\ge7/8$. Direct differentiation bounds the three partial-derivative norms by $3/r^2$, $12/r^2$ and $6/r^3$ for direction, velocity and range respectively. These follow by bounding the numerator by $1.2$, its direction derivative by $1.04$, its velocity derivative by $1.5$, and then differentiating $D^{-3}$ and $R^{-2}$. Thus $\|B-B_{\rm aff}\|\le36A_*/r$. The acceleration term is at most $A_*/(RD^3)<2A_*/r$. Finally the affine formula gives $\|\mathbf A_{\rm aff}-\sigma K\mathbf n_0/r^2\|\le4K\epsilon^2/r^2$, since its numerator differs from $\mathbf n_0$ by at most $2\epsilon^2$ and its normalized denominator is $(1-\|\mathbf p_\perp\|^2)^{3/2}$. These bounds are dominated by the displayed conservative constant $256$. Restoring $c_f$ gives $\alpha=A_*r/c_f^2$. $\square$

If $\alpha\le B\epsilon^2$ for a fixed preparation bound $B$, the row differs from the instantaneous radial comparison only at second order. There is no canonical first-order tangential push on this acceleration-controlled slow chart. If the source acceleration scales at first order, the estimate does not justify that cancellation. This is a bound for an actual row and can be applied to a coupled solution satisfying its interval hypotheses; it is not yet a long-time comparison theorem.

## 7. Exact accelerated circle: the push is cubic, not absent

A prescribed mirror circle supplies a sharper analytic target than the general remainder. Set $c_f=1$ and

$$
\mathbf X_+(T)=R_0(\cos\omega T,\sin\omega T,0),
\qquad \mathbf X_-(T)=-\mathbf X_+(T),
\qquad \beta=R_0\omega\in(0,1).
$$

These complete uniformly subfield paths have no self roots and one partner root. At $T=0$, let $\xi=\omega(T-S)/2$. The causal equation is $\xi=\beta\cos\xi$, with $0<\xi<\beta$. Its unique solution also satisfies $\xi<\pi/4$: at $\pi/4$ the left side is greater than $\cos(\pi/4)$, and $\beta<1$. At the partner hit,

$$
R=2R_0\cos\xi,\quad
\mathbf n=\cos\xi\,\mathbf e_r-\sin\xi\,\mathbf e_\theta,\quad
D=1+\beta\sin\xi,
$$

$$
\mathbf v=-\beta(\sin2\xi\,\mathbf e_r+\cos2\xi\,\mathbf e_\theta),\qquad
\mathbf a=\frac{\beta^2}{R_0}(\cos2\xi\,\mathbf e_r-\sin2\xi\,\mathbf e_\theta),\qquad
R(\mathbf n\cdot\mathbf a)=2\beta^2\cos^2\xi.
$$

The source is accelerated, so the final identity must be retained. Substituting into the exact gradient gives the opposite-polarity tangential contribution

$$
A_\theta
=\frac{K[\sin\xi-\beta\cos(2\xi)]}
{4R_0^2\cos^2\xi(1+\beta\sin\xi)^3}>0.
$$

To establish the sign without a numerical scan, substitute $\beta=\xi/\cos\xi$. The numerator becomes $[\tfrac12\sin(2\xi)-\xi\cos(2\xi)]/\cos\xi$. The square-bracket expression vanishes at zero and its derivative is $2\xi\sin(2\xi)>0$ for $0<\xi<\pi/4$. Thus it is strictly positive. An exact uniform circle would require zero tangential acceleration, so there is no such finite mirror-pair circle at any strictly subfield speed under this selected law.

For a controlled small-speed coefficient, Taylor bounds give, for $0<\beta\le1/8$,

$$
\left|A_\theta-\frac{K\beta^3}{3R_0^2}\right|
\le\frac{5K\beta^5}{R_0^2}.
$$

Indeed $0\le\beta-\xi\le\beta^3/2$ from $\xi=\beta\cos\xi$, and $|\xi-\beta+\beta^3/2|\le(\beta^5/2+\beta^5/24)<\beta^5$. The sine and cosine Taylor remainders give $|\sin\xi-\beta\cos2\xi-4\beta^3/3|\le5\beta^5$. Also $|\cos^{-2}\xi(1+\beta\sin\xi)^{-3}-1|\le6\beta^2$, with that factor at most $2$. Combining the numerator and denominator bounds gives a coefficient at most $(10+8)/4=4.5$, dominated by $5$ in the displayed estimate.

The radial contribution has numerator

$$
(1+\beta^2\cos2\xi)\cos\xi+(1+\beta\sin\xi)\beta\sin2\xi>0
$$

before multiplication by $\sigma=-1$, so it is inward. Since $\alpha=2\beta^2$ on this circle, the general bound in Section 6 applies as well. Its leading radial term is $-K/(4R_0^2)$; the difference is second order. The tangential term is cubic, compared with the canonical circle's linear term $K\beta/(4R_0^2)$. The ratio of the leading tangential contributions is $4\beta^2/3$. This is an exact prescribed-history residual comparison, not a stability calculation about a nonexistent equilibrium, a coupled secular orbit or a proof of binding.

## 8. Interpretation and falsifiers

The bounded investigation has a concrete positive result and a concrete negative result. The accelerated operator admits a compatible regular local evolution, and it suppresses the canonical linear tangential correction when acceleration is of slow-circle scale. It nevertheless leaves a strictly positive circular residual, so the cancellation does not establish an exact finite circular pair. A new secular calculation would be needed to determine whether the remaining cubic drive produces expansion and over which controlled time interval. There is no basis here to transfer the canonical secular formula unchanged.

The domain deliberately excludes folds, coincidence, wake-speed crossing, superfield paths, infinite populations and physical account closure. The positive minimum delay and endpoint compatibility are genuine hypotheses, not hidden continuation rules. A prescribed affine or circle control is a reference for the row; it is not a retained evolved assembly.

The independently checkable falsifiers are:

- A fixed-time spatial differentiation of the affine scalar that yields a linear velocity term overturns Section 2.
- A differentiation of the quadratic control that omits $a/d$ overturns the delayed-acceleration coefficient.
- A uniformly subfield complete history with a second partner root or positive-delay self root overturns the complete census.
- A compatible $C^{2,1}$ separated history giving two short solutions inside the strict margins overturns the local theorem; bare $C^2$ counterexamples do not contradict its stated class.
- A row satisfying the causal-interval speed and acceleration hypotheses but exceeding the Section 6 remainder bound overturns the comparison estimate.
- An exact evaluation of the complete circular partner row with $A_\theta\le0$ at $0<\beta<1$, or a small-speed coefficient different from $1/3$, overturns the circular conclusion.

## Development and validation record

This treatment is authored through the hereditary-dynamics lens specified in the assignment; that lens confers no evidence independence. The stationary and affine controls were derived before the accelerated quadratic control and prescribed-circle target. The complete-root inequalities, implicit gradient, short-step integral equation, compatibility and seam propagation, Taylor remainder and circle sign were then analytically self-reviewed. No external physical law, energy functional, production solver or numerical evolution was used.

The input inventory was recorded with Node SHA-256 in `.tmp/amplitude-gradient-domain/input-inventory.json`, after the known `abc` SHA-256 control passed. It measures the inspected startup, charter, role, proposal/queue, ontology and canonical-equation inputs at startup; it does not declare those shared documents immutable during coordinated integration. The only durable file written by this assignment is this treatment. Separate mathematical adjudication is required before promoting its new conclusions beyond self-reviewed derived grade.

The scoped document check `node .tmp/amplitude-gradient-domain/check.mjs` passed after its fenced-code/math-link, four-delimiter and invalid-TeX controls passed first. It rendered every mathematical span with KaTeX and checked the local Markdown destinations and fragments in this treatment. This is measured document validation, not independent verification of the theorem. The analytical self-review explicitly checked global residual monotonicity across possible zero-range non-root source times, first-step sampling from supplied pasts without undefined future evaluations, nonempty endpoint-compatible preparations, seam propagation and the conservative Taylor constants.
