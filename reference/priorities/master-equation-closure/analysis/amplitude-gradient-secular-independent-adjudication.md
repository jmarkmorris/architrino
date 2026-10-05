# Independent slow-history reconstruction for the amplitude-gradient pair

The bounded amplitude-gradient law suppresses the canonical term linear in source velocity, but its actual coupled evolution still depends on how slowly the acceleration changes across a delay. The first nonzero slow-history correction contains source acceleration at second order and source jerk at third order. Jerk is the time derivative of acceleration. A prescribed circular history tests these coefficients, but supplies neither compatible coupled initial data nor a long-time secular theorem.

**Current disposition: accept the separately frozen controlled finite secular theorem on its compatible $C^{5,1}$ preparation class. Claim grade: derived at that bounded scope.** The independent reference below was constructed and fixed before reading the separately authored subject. It uses the emission-density representation and present-time vector differentiation, and preserves the accepted [regular-pair domain](amplitude-gradient-regular-pair-investigation.md) and its [independent adjudication](amplitude-gradient-independent-adjudication.md). Its complete pre-comparison snapshot remains fixed. The final adjudication follows the reference and distinguishes the accepted growing-horizon theorem from the reference's initially conditional long-time estimate and inferred circular target.

## 1. Selected law and analytical controls

Only the finite opposite-polarity pair is considered. Set $c_f=1$. The complete supplied histories are uniformly subfield, the members remain separated, the sole partner root is simple, and ordinary positive-delay self roots are absent. The candidate acts branchwise on admitted partner roots. It does not differentiate a global scalar through the receiver's self diagonal.

For a sampled source position, velocity and acceleration, write $R=T-S$, $n=[x-X_j(S)]/R$, $v=X_j'(S)$, $a=X_j''(S)$ and $D=1-n\cdot v$. The accepted exact row is

$$
A=\frac{\sigma K}{R^2D^3}
\left[(1-|v|^2)n-Dv+Rn(n\cdot a)\right].
$$

Here $K>0$ is the inverse-square coupling and $\sigma=-1$ for the pair. All slow expansions must reproduce the following controls before being used on a coupled trajectory.

- A stationary source gives $A=\sigma K n/R^2$ exactly.
- For an affine source, put $q=x-X_j(T)$, $r=|q|$ and $w=X_j'(T)$. Its exact scalar denominator is $L=[(q\cdot w)^2+(1-|w|^2)r^2]^{1/2}$, and its row is $\sigma K[(1-|w|^2)q+(q\cdot w)w]/L^3$. It is even in $w$ and has no first-order velocity term.
- If the sampled source has $v=0$ and $a=\alpha n$, the exact row is $\sigma K(R^{-2}+\alpha/R)n$. This control prevents omission of the delayed-acceleration term.
- For the accepted prescribed mirror circle of member radius $R_0$ and speed ratio $\beta$, the exact tangent row begins at $K\beta^3/(3R_0^2)$, and its radial row is $-K[1+\beta^2/2+O(\beta^4)]/(4R_0^2)$. These are prescribed-path residuals, not equilibrium data.

These analytical identities are the independent controls used below. No numerical target or production evolution is run.

## 2. Present-source expansion from the emission density

At fixed reception time and point the branch scalar is

$$
\Psi(T,x)=\int\frac{\delta(T-S-|x-X_j(S)|)}{|x-X_j(S)|}\,dS
=\frac1{RD}.
$$

The integral is localized by a smooth cutoff equal to one on the unique root neighborhood. Positive range and $D>0$ justify this delta pullback. Define present-source quantities $q=x-X_j(T)$, $r=|q|$, $n_0=q/r$, $w=X_j'(T)$, $a_0=X_j''(T)$, $j_0=X_j'''(T)$ and $P_0=I-n_0n_0^{\mathsf T}$. The spatial derivative holds the present-source jets fixed.

To obtain the coefficients independently, insert the source point density $\varrho(S,z)=\delta(z-X_j(S))$ into the exact arrival representation $\Psi(T,x)=\int \varrho(T-|x-z|,z)/|x-z|\,dz$, and Taylor expand its time argument. Interchanging the emission and spatial delta integrals gives the same ordinary-root scalar. The coefficient of order $m$ is $(-1)^m\partial_T^m r^{m-1}/m!$, because the spatial integral of $|x-z|^{m-1}\varrho(T,z)$ equals $r^{m-1}$. This statement is a local distributional coefficient calculation, not an infinite convergent series. Through third slow order it yields

$$
\Psi=\frac1r+\frac12\partial_T^2r
-\frac16\partial_T^3r^2+O(\text{slow}^4),
$$

because $\partial_T1=0$. Since the source moves while the receiver point is held fixed,

$$
\partial_T^2r=\frac{|P_0w|^2}{r}-n_0\cdot a_0,
\qquad
\partial_T^3r^2=6w\cdot a_0-2q\cdot j_0.
$$

Thus

$$
\Psi=\frac1r+\frac12\left(\frac{|P_0w|^2}{r}-n_0\cdot a_0\right)
-w\cdot a_0+\frac13q\cdot j_0+O(\text{slow}^4).
$$

Spatial differentiation gives the candidate acceleration

$$
\boxed{
A=\sigma K\left[
\frac{n_0}{r^2}
+\frac{n_0|P_0w|^2}{2r^2}
+\frac{(n_0\cdot w)P_0w}{r^2}
+\frac{P_0a_0}{2r}
-\frac{j_0}{3}
\right]+O\left(\frac K{r^2}\text{slow}^4\right).
}
$$

The acceleration correction is transverse at this order. The exact delayed radial acceleration has not vanished from the law: it combines with the delay and range corrections when the row is written using present-time jets. The term $-w\cdot a_0$ in the scalar has zero receiver gradient, whereas $q\cdot j_0/3$ yields the jerk term. A scalar expansion that keeps acceleration but drops this third-order source derivative cannot determine the circular cubic residual.

The affine expansion agrees with its exact control: $a_0=j_0=0$, and expanding the exact denominator yields $n_0|P_0w|^2/(2r^2)+(n_0\cdot w)P_0w/r^2$. The accelerated radial control also agrees after converting its sampled jets to present jets: the difference between its sampled and present ranges contributes $\alpha/R$, while the present radial acceleration has no transverse component. On a circle $P_0a_0=0$, and $j_0$ is tangent, giving the accepted positive cubic row.

Two additional direct root controls isolate the new coefficients without circular geometry. At reception zero let $x=r e_1$ and let the source near its causal interval be $X_j(S)=aS^2e_2/2$, where $e_1$ and $e_2$ are orthogonal unit vectors. To first order in $a$, the range is $R=r+O(a^2r^3)$, the direction is $n=e_1-ar e_2/2+O(a^2r^2)$, the sampled velocity is $-ar e_2+O(a^2r^2)$ and $D=1+O(a^2r^2)$. Substitution into the exact row gives the transverse correction $\sigma Ka e_2/(2r)$, testing $P_0a_0/(2r)$. Next take $X_j(S)=jS^3e_2/6$. Its sampled direction is $e_1+jr^2e_2/6+O(j^2r^4)$, its sampled velocity is $jr^2e_2/2+O(j^2r^4)$ and the sampled-acceleration projection has no linear contribution. The exact row's tangent correction is therefore $-\sigma Kj e_2/3$, testing the jerk coefficient independently. Smooth cutoffs outside the causal intervals give complete uniformly subfield source histories when the coefficients are small. These are prescribed controls, not mutually evolved pairs.

### Remainder domain

The meaning of slow order must be stated quantitatively. On a compact separated reception chart, introduce a length $R_0$, a small speed parameter $\epsilon$, and slow time $s=\epsilon T/R_0$. Suppose the source is $X_j(T)=R_0z(s)$ and has bounded derivatives through order four on every causal interval, with bounds independent of $\epsilon$. Its successive physical jets scale as $\epsilon$, $\epsilon^2/R_0$, $\epsilon^3/R_0^2$ and $\epsilon^4/R_0^3$. For a fixed compact range of the dimensionless present separation, the boxed row has a uniform remainder $C K\epsilon^4/R_0^2$, where $C$ depends on those chart and derivative bounds, not on $\epsilon$.

One direct justification avoids assuming convergence of the distributional series. Taylor expand the source position to cubic order, its velocity to quadratic order and its acceleration to linear order around reception. Their integral remainders are bounded by the source fourth-derivative bound. The ordinary-root residual has derivative bounded away from zero, so the root and its normalized direction are smooth functions of these finite jets on the compact chart. Substitute these finite Taylor expansions into the exact row. All denominators retain positive margins; the fourth-order remainder is bounded by the finite maximum of the required ordinary derivatives on that compact set. The delta-density coefficient calculation identifies its first four coefficients. No numerical coefficient is claimed for $C$ in this reference.

The regular local existence theorem requires only compatible $C^{2,1}$ histories, namely continuous acceleration with a local Lipschitz bound. Such histories do not imply the slow fourth-derivative assumptions above. They must not be used to justify this higher-order remainder without additional control.

## 3. Mirror-pair equation and its delayed highest derivative

Use the exact mirror preparation and write

$$
X_+(T)=R_0y(s),\qquad X_-(T)=-R_0y(s),\qquad
s=\frac{\epsilon T}{R_0},\qquad K=4\epsilon^2R_0.
$$

This choice makes the instantaneous comparison $y''=-y/|y|^3$, with primes denoting slow-time derivatives. Let $\rho=|y|$ and let $\zeta$ denote the delayed slow emission time. Put $L=|y(s)+y(\zeta)|$, $n=[y(s)+y(\zeta)]/L$ and $D=1+\epsilon n\cdot y'(\zeta)$. The exact root and equation are

$$
s-\zeta=\epsilon L,
$$

$$
y''(s)=-\frac4{L^2D^3}
\left[(1-\epsilon^2|y'(\zeta)|^2)n
+\epsilon D y'(\zeta)-\epsilon^2L n(n\cdot y''(\zeta))\right].
$$

The equation contains a delayed acceleration, hence a delayed highest derivative of the position. Its coefficient is

$$
B(s)=\frac{4\epsilon^2}{LD^3}nn^{\mathsf T}.
$$

On a compact slow chart with $L$ bounded below and $|y'|$ bounded, $\|B\|\le C\epsilon^2$. Positive delay establishes local evolution independently of this small coefficient. The small coefficient becomes useful when bounding derivative feedback over many delay steps.

Differentiating the exact causal equation gives

$$
\zeta'=
\frac{1-\epsilon n\cdot y'(s)}{1+\epsilon n\cdot y'(\zeta)}.
$$

Thus $\zeta'=1+O(\epsilon)$ on the compact chart. Writing the nonacceleration row as $F$, one differentiation of $y''=F+B y''(\zeta)$ gives $y'''=F'+B'y''(\zeta)+B\zeta'y'''(\zeta)$. A second differentiation has highest delayed term $B(\zeta')^2y''''(\zeta)$. After bounds on lower derivatives are fixed, all other terms depend only on those lower derivatives and bounded ordinary coefficient derivatives.

If $C\epsilon^2<1$, taking suprema up to any regular time inside the compact chart absorbs these highest delayed terms. A bounded acceleration follows first from the undifferentiated equation; a bounded jerk follows next; the fourth derivative follows last. The supplied past norms must be included in each supremum. This is the mechanism for propagating slow derivative bounds; a repeated method-of-steps assertion without these estimates does not supply a uniform bound over a secular number of steps.

This derivative argument requires a globally matched sufficient smoothness class. For example, $C^4$ supplied histories, matching acceleration, jerk and fourth derivative at release, yield a $C^4$ joined trajectory while the margins persist. Merely matching acceleration yields $C^{2,1}$ and permits jumps in jerk. A jump in jerk becomes relevant to the fourth-order remainder when an emission root crosses that seam. A theorem using only bounded one-sided fourth derivatives must either account explicitly for every jerk-jump remainder or prove that its jump sizes have the required slow order.

## 4. Polar reduction and a conditional monotonic proxy

Restrict to a plane with positive angular motion. Write $y=\rho e_r$, $y'=u e_r+w e_\theta$, where $u=\rho'$ and $w=\rho\theta'$ are radial and tangential slow velocities. Let $q_r=y''\cdot e_r$, $q_t=y''\cdot e_\theta$, and define $h=\rho w$, the signed planar determinant of position and velocity.

Substituting the present-source expansion into the mirror equation gives, before eliminating its present derivative terms,

$$
y''=-\frac{e_r}{\rho^2}
+\epsilon^2\left[-\frac{w^2}{2\rho^2}e_r
-\frac{uw}{\rho^2}e_\theta+\frac{q_t}{\rho}e_\theta\right]
-\frac43\epsilon^3y'''+O(\epsilon^4).
$$

All remainders here are uniform only on the slow derivative chart just stated. Differentiating the second-order comparison, with a bounded fourth derivative, gives

$$
y'''=\frac{2u}{\rho^3}e_r-\frac w{\rho^3}e_\theta+O(\epsilon^2).
$$

Solving the tangential equation for $q_t$ is permitted when $1-\epsilon^2/\rho$ has a positive margin. The reduced components are therefore

$$
q_r=-\frac1{\rho^2}-\frac{\epsilon^2w^2}{2\rho^2}
-\frac83\frac{\epsilon^3u}{\rho^3}+O(\epsilon^4),
$$

$$
q_t=-\frac{\epsilon^2uw}{\rho^2}
+\frac43\frac{\epsilon^3w}{\rho^3}+O(\epsilon^4).
$$

The second-order tangential term is a radial-change term, whereas the third-order term is positive when $w>0$. Since $h'=\rho q_t$, define the corrected determinant

$$
\ell=h\exp(-\epsilon^2/\rho).
$$

Differentiation cancels the second-order radial-change term and yields

$$
\boxed{
\frac{\ell'}{\ell}=\frac43\frac{\epsilon^3}{\rho^3}+O(\epsilon^4).
}
$$

This estimate assumes $\ell$ is bounded away from zero as well as the compact slow chart. It is an actual differential comparison on any coupled solution satisfying those hypotheses, not an orbit average. In particular, for sufficiently small $\epsilon$ depending on the fixed chart bounds, $\ell$ increases strictly. Its integrated form is

$$
\log\frac{\ell(s)}{\ell(0)}
=\frac43\epsilon^3\int_0^s\rho(v)^{-3}\,dv
+O(\epsilon^4s).
$$

If a solution stays in that chart until $s=O(\epsilon^{-3})$, the integral has an $O(\epsilon)$ controlled error. That is a conditional long-interval estimate. It does not establish that a supplied family actually remains there until that time, nor does determinant growth alone prove monotonic separation or eventual escape.

A second useful scalar is the geometrical proxy

$$
E=\frac12(u^2+w^2)-\frac1\rho
-\frac{\epsilon^2h^2}{2\rho^3}.
$$

It is defined here by its derivative cancellation, not as a physical conserved account. Direct differentiation using the displayed components gives

$$
E'=\frac43\frac{\epsilon^3(w^2-2u^2)}{\rho^3}+O(\epsilon^4).
$$

The second-order correction removes the $-3\epsilon^2uw^2/(2\rho^2)$ derivative of the uncorrected proxy. Its third-order sign is positive near a circle but is not fixed on arbitrary eccentric motion. Controlling radial oscillations and the evolving compact chart remains a separate bootstrap or averaging problem.

### A finite coupled comparison that follows without secular averaging

Fix an orbital-time horizon $H<\infty$ independent of $\epsilon$. Let the instantaneous solution with the declared endpoint position and velocity stay inside a separated compact planar chart on $[0,H]$, with its determinant bounded away from zero. Supply complete uniformly subfield mirror histories with uniform slow $C^4$ bounds on a fixed recent slow-time window and the three release-jet compatibilities described below. Then, for sufficiently small $\epsilon$ depending on those bounds, chart slack and $H$, the exact candidate pair exists on $[0,H]$, stays $O(\epsilon^2)$ close in position and velocity to the instantaneous comparison, and satisfies the corrected determinant estimate above with a uniform $O(\epsilon^4)$ derivative error.

Here is the continuation argument. First locate the root using the bounded recent slow velocity: at reception its residual has positive range, while at a sufficiently large fixed multiple of $\epsilon$ slow time into the past the delay exceeds $|y(s)+y(\zeta)|$. Both evaluations lie inside the recent supplied or evolved window. The complete uniform subfield census excludes any additional older root. This gives the $O(\epsilon)$ sampling window without presupposing a bound on the unknown root interval. On the expanded compact chart, absorb $B$, $B\zeta'$ and $B(\zeta')^2$ successively to bound acceleration, jerk and fourth derivative by constants independent of $\epsilon$ and the number of delay steps. The local method-of-steps theorem then continues the solution until either the horizon or the compact chart boundary is reached. On each such interval the acceleration differs from the instantaneous radial row by at most $C\epsilon^2$. Subtract the two position–velocity integral equations; the instantaneous vector field is Lipschitz on the chart, so iteration or the scalar integral inequality bounds their difference by $C_H\epsilon^2$. For small enough $\epsilon$ this difference is smaller than the chart slack, excluding boundary exit before $H$. The physical speed is $\epsilon$ times the bounded slow velocity, so the complete uniform subfield margin also persists. The sampling window lies inside the declared supplied window at release. This proves the finite theorem and supplies the hypotheses of the polar expansion on that horizon.

This is controlled coupled evolution over a fixed number of orbital time units. It is weaker than a secular horizon growing like $\epsilon^{-3}$. The constant $C_H$ obtained from a generic integral inequality is not uniform at that growing horizon. A theorem at that scale needs additional cancellation or a radial-action bootstrap, rather than substituting a growing $H$ into this estimate.

## 5. Compatible slow preparations and the limits of the generic class

The compatible-data class of the local theorem is nonempty, but its stationary-terminal-jet construction does not automatically provide the derivative hierarchy needed here. A terminal change confined to a physical time shorter than one delay is confined to $O(\epsilon)$ slow time. Acceleration may stay $O(1)$ in slow units while jerk becomes $O(\epsilon^{-1})$. That construction establishes compatibility, not slow secular preparation.

A genuinely slow compatible smooth family can instead be constructed through terminal jets on a fixed slow-time interval. Choose fixed endpoint position and velocity and a smooth finite-parameter interpolation of the past whose free endpoint jets are acceleration, jerk and fourth derivative. Extend it to an older smooth bounded-velocity past while retaining separation. At $\epsilon=0$, the compatibility conditions are the instantaneous acceleration and its first two differentiated identities. Their Jacobian with respect to the three terminal jets is triangular with identity diagonal: the instantaneous acceleration depends on position, its first derivative on position and velocity, and its second derivative on those quantities and acceleration. The implicit function theorem supplies matching jets for sufficiently small positive $\epsilon$. The root is smooth and approaches the endpoint as $\epsilon\to0$, the delayed highest-jet coefficients vanish like $\epsilon^2$, and the finite-dimensional compatibility map has the stated smooth extension. With interpolation width fixed in slow time, all derivatives through order four remain bounded independently of $\epsilon$.

This gives lawful supplied preparations, not an all-past solution of the selected equation. The endpoint state can be chosen near the instantaneous circular comparison, and the matching terminal acceleration includes its actual candidate corrections. A complete past circle without such matching is only a residual control.

The generic $C^{2,1}$ class cannot be promoted to the cubic law. To see the obstruction, begin with a slow near-circular prescribed past and put a smooth source bump around its sampled emission time. Make the bump vanish in position at that root while changing its physical tangential velocity there by $O(\epsilon^2)$. Choose its physical support width of order $R_0$, keep it disjoint from reception, and set its sampled acceleration perturbation to zero at the root. The partner root and range stay unchanged, its sampled velocity changes, and the exact velocity derivative of the row gives a tangential contribution of order $K\epsilon^2/R_0^2$ with either sign. The source speed remains $O(\epsilon)$ and its acceleration remains $O(\epsilon^2/R_0)$ throughout the bump, but the slow jerk becomes $O(\epsilon^{-1})$. An additional still shorter terminal modification can match the release acceleration without touching that earlier root. Mirror the history for the other member.

These are compatible, smooth, uniformly subfield preparations with the local theorem's ordinary root margins. Their near-circular endpoint state does not force a positive $O(\epsilon^3)$ tangent term. They violate the uniform slow-derivative hypothesis rather than the local existence theorem. Exact all-past dynamics or a separately derived preparation restriction might exclude them, but neither is included in that generic theorem.

## 6. Formal circular secular target

If a slowly changing nearly circular coupled solution remains in the controlled chart, its radial balance gives $h^2=\rho+O(\epsilon^2)$, and the corrected determinant law suggests

$$
\rho'=\frac83\frac{\epsilon^3}{\rho^2}+	ext{higher-order and oscillatory terms},
\qquad
\frac{d(\rho^3)}{ds}=8\epsilon^3+	ext{remainder}.
$$

Restoring symbolic wake speed gives the candidate averaged target

$$
\boxed{
\frac{d(R^3)}{dT}=\frac{K^2}{2c_f^3}
\quad\text{at leading slow near-circular order}.
}
$$

The relation uses $K=4v_0^2R_0$ and the member radius $R$, not pair separation. Its associated physical secular scale is $R_0c_f^3/v_0^4$, equivalently $R_0/(\epsilon^4c_f)$. This is inferred formal averaging, not a controlled fate theorem. It requires proof that the radial oscillations and history derivative bounds remain controlled over $O(\epsilon^{-3})$ slow time and that the averaged remainder is smaller than the proposed drift. The accepted cubic circle residual alone proves none of those steps.

## 7. Pre-comparison history: independent-reference disposition and falsifiers

The independently derived local results are the full present-jet correction through jerk, the mirror-pair polar components, the corrected determinant differential law on a controlled chart, and the derivative-feedback mechanism needed to propagate that chart's smoothness. Generic compatible $C^{2,1}$ data are too broad for the cubic secular claim. A finite coupled theorem must state its preparation, seam conditions, derivative bounds, state bootstrap, horizon and remainder. An infinite escape claim needs an additional global argument.

Falsifiers are an affine or accelerated control disagreeing with the present-jet coefficients; exact slow-circle substitution giving a different cubic coefficient; a $C^4$ bounded slow history violating the local remainder with the specified chart margins; a differentiated delayed equation with a highest-derivative coefficient not equal to $B\zeta'$ or $B(\zeta')^2$; or a controlled coupled solution violating the corrected determinant estimate. A high-jerk preparation from the explicit generic-class construction falsifies an unconditional cubic claim but not the bounded slow-history comparison.

## Development and preservation record

This independent reference is written before reading the separately authored secular subject. The observed accepted local sources were inventoried with `shasum -a 256` in `.tmp/amplitude-gradient-secular-review/observed-inputs.sha256`; no source digest is asserted by the assignment or substituted for a changed input. Only this new report and `.tmp/amplitude-gradient-secular-review/` scratch are written. No earlier proof, reference instrument, shared owner, canonical law or production solver is modified. The role is an analytical lens and supplies no evidence independence; the independent coefficient construction and explicit controls supply the mathematical reference.

The first-stage document check `node .tmp/amplitude-gradient-secular-review/check.mjs` passed after its fenced-code/math-link, inline/display, invalid-TeX and heading controls passed first. It checks Markdown destinations and KaTeX syntax, not mathematical truth. The scoped whitespace check `git diff --no-index --check /dev/null` on this new file returned no diagnostics. Both accepted local input identities still matched their startup observations by `shasum -a 256 -c` at the independent-reference freeze. The full reference is copied to `.tmp/amplitude-gradient-secular-review/independent-reference-before-comparison.md` and bound locally before any authorized target comparison. No numbers from an author's new subject were used in this construction.

## 8. Independent adjudication of the frozen secular subject

**Final disposition: accept the [controlled secular comparison](amplitude-gradient-controlled-secular-comparison.md) at its explicitly finite, preparation-dependent scope.** Its present-source coefficients agree with the fixed independent emission-density construction above. The following separate estimates verify its mixed remainder, uniform delayed-derivative propagation and moving-center radial bootstrap. No numerical replay or unchanged-equation drift is used as acceptance evidence.

The subject proves more than the first-stage fixed-orbital-horizon reference: it closes persistence until $s=c\epsilon^{-3}$ for a specially matched class and obtains actual finite expansion at the endpoint. The accepted instantaneous derivative concerns the corrected slow radius, not the actual oscillating radius. Constants are finite functions of the preparation bounds and neighborhood choices; the result supplies no evaluated practical speed threshold for an existing run.

### 8.1 Weighted mixed remainder through sixth derivatives

The subject's $W^{2,\infty}$ fourth-order remainder is accepted by the independent weighted finite Taylor construction below. Here $W^{2,\infty}$ means bounded value and first time derivative, with bounded second derivative almost everywhere. It must not be justified by differentiating the whole accelerated row four times in the auxiliary delay parameter and then twice in time. For example, four parameter derivatives of $\lambda^2y''(s_d(\lambda))$ can contain $\lambda^2y^{(6)}(s_d)(\partial_\lambda s_d)^4$, whose two time derivatives can reach $y^{(8)}$. That unweighted argument is invalid under the stated sixth-derivative hypothesis. The subject's brief derivative-count explanation must be read through the weighted component interpretation; it does not justify whole-row parameter differentiation. The reconstruction below supplies the checkable sixth-jet proof rather than relying on that shorthand.

For a separate valid construction put $d=s-s_d$, with $\lambda$ the auxiliary delay coefficient and $0\le\lambda\le\epsilon$. On the fixed geometry and derivative box,

$$
|d|+|d'|+|d''|\le C\lambda.
$$

The delay bound gives the value estimate. The implicit-root formula gives $s_d'=1+O(\lambda)$, hence $d'=O(\lambda)$. Differentiating it once gives $d''=O(\lambda)$ because position, velocity and acceleration are bounded and its denominator has a positive floor. These constants depend only on the declared box.

Expand position to degree three in $d$, velocity to degree two, and acceleration to degree one. The three integral remainders have the forms

$$
\int_0^d\frac{(d-v)^3}{6}y^{(4)}(s-v)\,dv,
\qquad
\int_0^d\frac{(d-v)^2}{2}y^{(4)}(s-v)\,dv,
\qquad
\int_0^d(d-v)y^{(4)}(s-v)\,dv,
$$

up to signs that do not affect their bounds. After two time derivatives their respective $W^{2,\infty}$ norms are bounded by $C\lambda^4$, $C\lambda^3$ and $C\lambda^2$. Terms differentiating the integrand use at most $y^{(6)}$; terms differentiating the integration limit use $d',d''=O(\lambda)$ and retain the same total parameter order. The velocity remainder enters the exact row multiplied by $\lambda$, and the acceleration remainder by $\lambda^2$. Both therefore contribute only $O_{W^{2,\infty}}(\lambda^4)$.

The implicit delay itself has a cubic polynomial expansion with a $W^{2,\infty}$ fourth-order error. One may obtain it by substituting that polynomial into $d=\lambda L(s,d)$: the weighted position expansion gives a fourth-order residual and the residual derivative in $d$ is bounded away from zero. Subtraction and two time differentiations of this residual identity preserve the fourth-order estimate. This construction uses bounded ordinary derivatives of $L$ and the already stated source jets; it does not take four parameter derivatives of the entire accelerated row.

Finite product and inverse expansions preserve these estimates. In the $W^{2,\infty}$ norm, the product rule bounds each factor product by a fixed multiple of the product of its norms. Inverse powers of $L$ and $D$ have uniformly bounded ordinary derivatives on their positive-margin intervals. Replace their arguments by the finite polynomial approximations and expand the inverse powers to the needed degree. The resulting remainder is uniformly fourth order. This proves the mixed row estimate stated in the subject, with a constant fixed by the geometry and sixth-jet bounds.

The seam regularity is sufficient. A $C^{5,1}$ joined history has continuous derivatives through order five and a bounded sixth derivative almost everywhere. The integral Taylor identities hold across its seams because the fifth derivative is Lipschitz. The source-time map is increasing with both upper and positive lower derivative bounds, so compositions with the source sixth derivative preserve almost-everywhere estimates. No delta contribution is created by a permitted sixth-derivative jump. A jerk jump allowed in $C^{2,1}$ would invalidate this argument; the subject's stronger preparation excludes it.

### 8.2 Uniform highest-delayed-derivative control

The exact equation and root derivative in the subject match Section 3 of the fixed reference. For the $k$th differentiated equation, $0\le k\le4$, the only source derivative of order $k+2$ has coefficient $B(s)(s_d')^k$. Every remaining derivative has order at most $k+1$. In particular, root derivatives and derivatives of $B$ involve lower position jets; they do not introduce a second undisposed highest derivative.

The subject's constant $64$ is conservative. Its bounds give

$$
\|B(s)(s_d')^k\|
\le\frac92\left(\frac87\right)^3
\left(\frac97\right)^4\epsilon^2
<20\epsilon^2<64\epsilon^2.
$$

The bound uses $L\ge8/9$, $D\ge7/8$ and $|s_d'|\le9/7$. The corresponding positive lower bound $s_d'\ge7/9$ also verifies the change-of-variable property used for almost-everywhere sixth derivatives. At fixed lower-jet bounds each nonhighest part has a finite supremum $N_k$, uniformly for the small parameter interval. Choosing $M_{k+2}$ as the maximum of the supplied past bound and $2N_k$ closes the inequality $N_k+\tfrac12M_{k+2}\le M_{k+2}$. Applying this first to acceleration, then successively to the next four derivatives, establishes the asserted inventory without an elapsed-time exponential factor.

Only earlier accelerations and higher jets are sampled because the delay remains strictly positive. On each short step, ordinary smoothness follows from the supplied past row; the integral evolution produces the new derivatives. Matching terminal jets through order five joins those steps in $C^{5,1}$. When a sampled root crosses an earlier seam, the jets through fifth order are still continuous and the sixth derivative remains bounded almost everywhere. This verifies the derivative induction in its actual history topology.

### 8.3 Coupled coefficients and moving radial center

Write $u=r'$ and $w_t=h/r$ for the radial and tangent velocities. The accepted reduced components are

$$
q_r=-\frac1{r^2}-\frac{\epsilon^2w_t^2}{2r^2}
-\frac83\frac{\epsilon^3u}{r^3}+O(\epsilon^4),
\qquad
q_t=-\frac{\epsilon^2u w_t}{r^2}
+\frac43\frac{\epsilon^3w_t}{r^3}+O(\epsilon^4).
$$

They agree with the fixed independent polar calculation. The stronger mixed remainder and derivative inventory now supply their uniform $W^{1,\infty}$ error. Therefore $H=h e^{-\epsilon^2/r}$ obeys $H'=4\epsilon^3H/(3r^3)+q_H$, with $q_H$ and $q_H'$ bounded by $C\epsilon^4$. Inserting the exact relation $h=H e^{\epsilon^2/r}$ into $r''=h^2/r^3+q_r$ gives precisely the subject's radial equation and its comparison potential.

At zero parameter the radial minimum is $r=H^2$ and its curvature is $H^{-6}>0$. In a sufficiently small fixed neighborhood of $H=1$, this minimum and a positive curvature floor persist. Expanding its defining equation gives

$$
\mathcal R(H,\epsilon)=H^2+\frac32\epsilon^2+O(\epsilon^4).
$$

The initial choice $h(0)=(1-\epsilon^2/2)^{-1/2}$ makes $\mathcal R(H(0),\epsilon)=1$ exactly, not only asymptotically: substitute $H(0)=h(0)e^{-\epsilon^2}$ into the minimum equation at $r=1$. This removes an initial quadratic radial mismatch. It does not declare a circle to be an exact solution.

For an independent centered estimate put $z=r-\mathcal R(H,\epsilon)$ and $p=r'-\mathcal R_HH'$. Then $z'=p$. Subtract the moving-center acceleration from the radial equation. Since

$$
|H''|\le C\epsilon^3|r'|+C\epsilon^6+C\epsilon^4,
$$

the resulting equation is $p'=-V_z+F$, where $|F|\le C\epsilon^3|p|+C\epsilon^4$. The potential difference $V$ has positive quadratic bounds in $z$. Moreover $V_H=O(z^2)$: its value and its first $z$ derivative vanish at $z=0$ for every $H$, so differentiating those identities in $H$ and using the Taylor remainder proves this estimate.

For the mathematical centered scalar $E_c=p^2/2+V$, cancellation of $pV_z$ gives

$$
E_c'=pF+V_HH'
\le C\epsilon^3E_c+C\epsilon^4\sqrt{E_c}.
$$

Regularizing the square root and integrating yields

$$
\sqrt{E_c(s)}
\le e^{C\epsilon^3s}
\left[\sqrt{E_c(0)}+C\epsilon^4s\right].
$$

Initially $z=0$ and $p=O(\epsilon^3)$. Thus, on $s\le c\epsilon^{-3}$, both $z$ and $p$ are $O(\epsilon)$ for fixed sufficiently small $c$. The angular rate changes $H$ by at most $C c$ on that interval. Choose $c$ first to preserve its fixed neighborhood, then choose $\epsilon_0$ to preserve the radial and speed slacks and the derivative-feedback inequality. This ordering is legitimate because all derivative and remainder constants have already been fixed uniformly on the expanded geometry box.

Consequently $r$ stays bounded away from zero, the slow speed stays below two, the complete physical speed is subfield, and the sampled derivative inventory survives. The regular method-of-steps theorem can restart before any hypothetical first exit. This proves finite persistence to the growing horizon and closes the geometric and delayed-history estimates together. No conserved physical account is assumed in the centered scalar calculation.

### 8.4 Nonempty preparations and endpoint expansion

The fixed-width polynomial preparation is accepted. At zero auxiliary parameter its compatibility equations reduce to the instantaneous row and its first three differentiated identities. The unknown terminal jets $J_2,\ldots,J_5$ have a triangular compatibility Jacobian with identity diagonal: each equation determines its own jet from lower already specified receiver jets. At small positive parameter the finite polynomial and ordinary auxiliary root vary smoothly, so this nonsingular finite system has a bounded smooth solution. A fixed recent interval and smooth older cutoff keep sixth-jet and speed bounds independent of $\epsilon$. The matching conditions are through fifth order; a jump in sixth derivative is permitted and is already covered by the mixed remainder proof. The supplied histories need not solve the candidate equation before release.

The centered estimate gives $r=H^2+O(\epsilon)$. Therefore

$$
(H^6)'=8\epsilon^3\frac{H^6}{r^3}+O(\epsilon^4)
=8\epsilon^3+O(\epsilon^4).
$$

At the endpoint, integration yields $H^6=1+8c+O(\epsilon)$, and hence $r^3=1+8c+O(\epsilon)$. For fixed $0<c\le1/100$, a further small choice of $\epsilon_0$ makes the terminal error less than $c$. Then $r^3\ge1+7c>(1+c)^3$, verifying the stated actual finite expansion. This conclusion is compatible with radial oscillations during the interval; it does not assert pointwise monotonic actual radius.

Restoring $K=4v_0^2R_0$, $\epsilon=v_0/c_f$ and $s=v_0T/R_0$ gives

$$
\frac{d(R_0^3H^6)}{dT}
=8R_0^2v_0\epsilon^3[1+O(\epsilon)]
=\frac{K^2}{2c_f^3}[1+O(\epsilon)],
$$

and the endpoint time is $cR_0c_f^3/v_0^4$. Both dimensions and the factor $1/2$ are correct. The differentiated cube is the corrected radius $R_0H^2$ cubed. The actual member radius differs from it by $O(R_0\epsilon)$, which does not license the same instantaneous derivative bound for that oscillating radius.

### 8.5 Accepted scope, falsifiers and preservation

| Claim | Independent verdict |
| --- | --- |
| Present-source second-order and jerk coefficients | Accepted against the fixed density construction and known controls. |
| Fourth-order mixed remainder with two time derivatives | Accepted by weighted integral Taylor remainders through sixth jets; the unweighted whole-row parameter argument is excluded. |
| Uniform delayed-derivative inventory and $C^{5,1}$ seams | Accepted with strict geometry margins, small highest-derivative coefficients and compatibility through fifth order. |
| Nonempty fixed-width compatible preparation family | Accepted by its finite triangular compatibility map and smooth extension. |
| Persistence to $c\epsilon^{-3}$ and actual finite endpoint expansion | Accepted by the separately reconstructed centered radial estimate. |
| Corrected cubic-radius derivative and physical time scale | Accepted at the stated uniform finite, preparation-dependent grade. |
| Every slow binary, monotonic actual radius or infinite escape | Unproved; none follows from this theorem. |

The checkable falsifiers are a bounded sixth-jet history violating the weighted mixed remainder, a highest delayed coefficient or seam term not represented in the derivative induction, failure of the finite compatibility Jacobian, or a supplied preparation satisfying the declared bounds whose centered radial solution exits before the stated small finite horizon. A source with sharp shrinking-scale acceleration or incompatible jets does not falsify this theorem; it lies outside its preparation class. The high-jerk counterexample in the preserved independent reference continues to reject an extension to generic $C^{2,1}$ data.

The full pre-comparison reference snapshot remains unchanged and locally digest-bound. The durable mathematical reference is preserved; only current adjudication framing and this section are added. The author subject was independently inventoried immediately before reading and is checked against that same identity after drafting. No prior source, reference snapshot, author subject, instrument or shared owner is modified by this adjudication. The final known-control-first Markdown/KaTeX and scoped whitespace checks verify syntax and placement, while the separate estimates above supply mathematical acceptance.
