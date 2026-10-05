# Independent reference and adjudication for the regular amplitude-gradient pair

The bounded amplitude-gradient candidate has a well-defined partner row on a separated, uniformly subfield ordinary-root chart. Its receiver derivative contains delayed source acceleration. An affine source has no term linear in its velocity, but this cancellation does not erase every circular tangential residual: an independently evaluated prescribed circular pair still has a positive residual, beginning at cubic order in its speed ratio.

**Current disposition: accept the separately frozen regular-pair investigation at its bounded scope, including its constants $256$ and $5\beta^5$. Claim grade: derived, conditional on the newly selected candidate and the mathematical domains below.** The independent reference was constructed before reading the separately authored investigation. It begins from an inverse-range emission-time delta density rather than assuming an implicit-root gradient formula. Stationary and affine analytical controls preceded the accelerated-source and circular comparisons. The full first-stage reference remains preserved in its pre-comparison snapshot; the final adjudication below followed the coordinator's explicit handoff.

## Candidate, root admission and the self-diagonal distinction

The [declared proposal](research-alternatives-assessment-2026-10-03.md#the-amplitude-gradient-proposal-an-exact-kinematic-control) changes an ordinary per-hit row to $-\sigma K\nabla_x[1/(R|D|)]$, with source history and absolute reception time fixed and emission time following its causal root. Here $K>0$ is the inverse-square coupling, $\sigma$ is the polarity product, $R>0$ is delayed range and $D=1-n\cdot V_j(S)$ in units $c_f=1$. This investigation does not alter the baseline, establish a physical wake-energy density or select an event rule.

The gradient must be interpreted on an already admitted positive-delay branch, followed by the branch sum. On the finite uniformly subfield pair chart, a distinct source has one such branch. A receiver's own history has none: its chord speed is strictly smaller than wake speed. The same-time endpoint remains excluded by the [canonical admission law](../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation). This is an empty ordinary self sum, not deletion of an active root.

That branchwise interpretation is different from differentiating a global all-root scalar through the self diagonal. For a stationary own source, the scalar at a receiver point displaced from the source is $1/|x-X_i|$; at the actual same-label position its sole same-time endpoint is excluded. No differentiable scalar extends those values through $x=X_i$. Uniformly subfield moving histories have the same short-delay problem off their own diagonal. Thus absence of an ordinary self root at the actual receiver does not prove differentiability of a global self scalar in a surrounding spatial neighborhood. The accepted regular-pair formulation must retain the branchwise interpretation; the global interpretation is undefined here.

For distinct members with complete source speed bounded by $v_*<1$ and present separation $r$ in $[r_-,r_+]$, causal geometry gives one root and

$$
\frac{r_-}{1+v_*}\le R=T-S\le\frac{r_+}{1-v_*},
\qquad D\ge1-v_*>0.
$$

The minimum delay, positive range and transmitter margin are quantitative parts of the domain. They make a finite emission window sufficient for local evaluation; they do not permit discarding the complete past when proving existence and uniqueness of the root.

## Independent derivative from the emission-time density

Let $X_j$ be twice continuously differentiable near the sampled emission time. At fixed reception $(T,x)$ put $R(S,x)=|x-X_j(S)|$, $n=(x-X_j(S))/R$, $v=X_j'(S)$, $a=X_j''(S)$ and

$$
g(S,x)=R(S,x)-(T-S),\qquad D=g_S=1-n\cdot v.
$$

Choose a smooth compact emission cutoff $\chi$ equal to one near the root for every receiver point in a small regular neighborhood. There is no cutoff edge at the root. Define the local scalar by

$$
\Psi(T,x)=\int \chi(S)\frac{\delta(g(S,x))}{R(S,x)}\,dS.
$$

The nonzero $D$ makes this delta pullback well defined, and ordinary root collapse gives $\Psi=1/(RD)$. The cutoff localizes the derivation without altering that branch's value. Its derivatives give no boundary term because $\chi'=0$ on the root neighborhood. There is no product of undefined singular distributions or diagonal extension in this construction.

Differentiate before collapsing the root. At fixed emission time, $\nabla_xR=n$ and $\nabla_xg=n$, so

$$
\nabla_x\Psi
=\int\chi\left[-\frac n{R^2}\delta(g)
+\frac nR\delta'(g)\right]dS.
$$

Since $\delta'(g)=D^{-1}\partial_S\delta(g)$, integration by parts and root collapse give

$$
-\nabla_x\Psi
=\frac n{R^2D}+\frac1D\partial_S\left(\frac n{RD}\right)
\quad\text{at the root}.
$$

Write $P=I-nn^{\mathsf T}$ and $b=n\cdot v$. Differentiation with receiver fixed gives $R_S=-b$, $n_S=-Pv/R$ and $D_S=|Pv|^2/R-n\cdot a$. Substitution therefore yields the independent row formula

$$
\boxed{
A_{i\leftarrow j}
=\frac{\sigma K}{R^2D^3}
\left[D(n-Pv)-n|Pv|^2+Rn(n\cdot a)\right].
}
$$

The last term is $\sigma K\,nn^{\mathsf T}a/(RD^3)$. It samples source acceleration at emission and is part of the candidate, even though the baseline samples only source position and velocity. A receiver playback factor has not been inserted. The derivation uses only ordinary-root geometry and distributional differentiation, not a standard field-theory premise.

## Controls fixed before accelerated comparisons

For a stationary source, $v=a=0$ and $D=1$, so the row is exactly $\sigma K n/R^2$. This is the stationary canonical control.

For a complete affine source, use present displacement $r=x-X_j(T)$ and constant velocity $w$, $|w|<1$. The causal root is the positive solution of $\tau=|r+w\tau|$. Its discriminant gives

$$
R D=L:=\sqrt{(r\cdot w)^2+(1-|w|^2)|r|^2}.
$$

Consequently

$$
\Psi=\frac1L,\qquad
-\sigma K\nabla_x\Psi
=\sigma K\frac{(1-|w|^2)r+(r\cdot w)w}{L^3}.
$$

This independent closed form is even in $w$, so it contains no term linear in velocity. Substituting $a=0$ and the affine causal relations into the boxed distributional result gives this same vector. These two analytical controls are fixed before using the boxed formula on accelerated histories; no numerical target is used for their acceptance.

## Accelerated-source control and the required regularity

Choose a complete prescribed source $X_j(S)=\alpha[1-\cos(\omega S)]e/\omega^2$ with $\alpha/\omega<1$. It is uniformly subfield and smooth, with $X_j(0)=0$, $v(0)=0$ and $a(0)=\alpha e$. At reception $T=R_0$, $x=R_0e$ in units $c_f=1$, the unique root is $S=0$, $D=1$. The independent formula gives

$$
A_{i\leftarrow j}=\sigma K\left(\frac1{R_0^2}+\frac\alpha{R_0}\right)e.
$$

One can check the acceleration coefficient without the boxed formula: along the collinear branch, $x=X_j(S)+T-S$ and $\Psi=[(T-S)(1-X_j'(S))]^{-1}$. Differentiating this scalar parametrically at $S=0$ gives $-d\Psi/dx=R_0^{-2}+\alpha/R_0$. This confirms the nonzero acceleration term and its sign. A transverse acceleration at an instant of zero source velocity has $n\cdot a=0$ and gives no additional term at that instant.

Source position $C^2$ on the sampled window is sufficient for this spatial derivative to exist and be continuous. A locally Lipschitz acceleration, equivalently a $C^{2,1}$ position on the window, is a convenient sufficient condition for the row to be locally Lipschitz in receiver position and time. A common bound on that acceleration Lipschitz constant also makes the row locally Lipschitz under $C^2$ perturbations of histories. A general continuously differentiable row map or Fréchet history derivative needs further source regularity; it does not follow merely from a Lipschitz acceleration.

Bounded acceleration with jumps is insufficient to define the spatial gradient at every regular root. For example, let the source be collinear and have $X_j(S)=\alpha S^2e/2$ for $S<0$ and $X_j(S)=\beta S^2e/2$ for $S>0$, joined with continuous position and velocity, where $\alpha\ne\beta$. Extend smoothly away from zero to keep speed uniformly subfield. At a receiver whose root is $S=0$, the two spatial derivative limits are proportional to $R^{-2}+\alpha/R$ and $R^{-2}+\beta/R$. The scalar is not differentiable there. A bounded velocity-derivative step therefore needs either compatibility removing the acceleration jump or an explicitly different weak/seam interpretation; it is not harmless for the pointwise gradient law.

## A regular finite-pair local solution map

Take complete uniformly subfield supplied pair histories that are $C^{2,1}$ on every sampled recent window. Require positive present separation and strict margins for speed and root geometry. At release require the supplied acceleration traces to equal the candidate rows evaluated on the supplied earlier histories. This compatibility makes the joined acceleration continuous. Matching jerk is unnecessary for a $C^{2,1}$ solution: bounded one-sided jerk steps preserve Lipschitz acceleration.

Enlarge the initial speed bound slightly while staying below one, and choose a small current-position ball preserving separation and the delay floor. On a future step shorter than that floor, every partner source point and its acceleration lie in already retained history. The boxed row is then a locally Lipschitz function of reception time and current receiver position. Its delayed-acceleration term is known data on that step. It does not require solving for two simultaneous present accelerations.

The position–velocity integral map is a contraction on a sufficiently short step and a closed state ball, because the acceleration and its local state Lipschitz constant are finite. This proves local existence and uniqueness. The row's time Lipschitz bound makes the constructed acceleration Lipschitz, hence the future position is $C^{2,1}$. Release compatibility joins it to the supplied history in that same class. Later method-of-steps seams match automatically because both sides evaluate the same continuous functional on the same retained records.

This is a local regular-domain theorem, extendible only while its separation, speed, sampled-history and root margins persist. No bound on the delayed-acceleration coefficient by a number below one is needed for one short step: the sampled acceleration is already known. Such a coefficient bound can matter for longer-time uniform estimates, which are not supplied here. An incompatible prescribed circular past is a valid kinematic comparison but is not automatically admissible initial data for this globally $C^{2,1}$ solution map.

The compatible class is nonempty. Take a pair stationary at $\pm Re$ before a short terminal past window $[-a,0]$, with $a<R$. In that window add mirrored smooth terms $cT^2\chi(T)e/2$, where $\chi=0$ near $-a$, $\chi=1$ near zero and $c=-K/(4R^2)$ for the positive member. At release the positions are still $\pm Re$ and velocities are zero, while the acceleration traces are $\pm ce$. The partner root is $S=-2R$, outside the edited window, and samples a stationary source, so its candidate row is exactly that acceleration trace. Taking $a$ sufficiently small preserves separation and uniform subfield speed. This supplies a complete smooth compatible preparation for the local theorem; it does not claim the prescribed pre-release paths solve the candidate equation.

## A local small-speed comparison with the acceleration hypothesis retained

Let a source speed ratio be at most $\epsilon\le1/8$ on its complete causal interval, let its acceleration be bounded by $A_*$ there, and let present separation be $r>0$. Put $\eta=A_*r$ in units $c_f=1$. Define $p=[X_j(T)-X_j(S)]/r$, $w=v(S)$ and $w_0=v(T)$. Source-velocity integration gives

$$
|p|\le\frac\epsilon{1-\epsilon},\quad
|p-w_0|\le\frac{\epsilon^2}{1-\epsilon}
+\frac\eta{2(1-\epsilon)^2},\quad
|w-w_0|\le\frac\eta{1-\epsilon}.
$$

In these variables, the velocity part of the boxed row has zero-order value $n_0$ and first differential

$$
(I-3n_0n_0^{\mathsf T})(p-w).
$$

The source-displacement and velocity contributions cancel at equal present-velocity arguments. The acceleration term has dimensionless magnitude at most $2\eta$, since $|n_0+p|\ge6/7$ and $D\ge7/8$.

A conservative Taylor bound supplies a quantitative comparison. Write the velocity part as the sum of $H D^{-2}$, $-|z|^{-2}PwD^{-2}$ and $-H|Pw|^2D^{-3}$, with $z=n_0+p$, $H=z/|z|^3$ and $D=1-n(z)\cdot w$. In the joint norm $|p|+|w|$, direct product differentiation bounds their second derivatives by $110$, $50$ and $25$, respectively. One sufficient inventory is $\|H\|<1.4$, $\|DH\|<3.2$, $\|D^2H\|<45$, $\|DP\|<2.4$, $\|D^2P\|<20$, $\|D(D^{-2})\|<3$, $\|D^2(D^{-2})\|<20$, $\|D(D^{-3})\|<5.2$ and $\|D^2(D^{-3})\|<40$. These follow from $|z|\ge6/7$, $D\ge7/8$, $|w|\le1/8$ and elementary derivatives of the direction map.

Thus $200$ bounds the total Hessian, and Taylor's remainder is at most $100(15\epsilon/7)^2$. The first differential contributes at most $2|p-w|$. Adding the acceleration term and the displayed history errors gives

$$
\boxed{
\left|A_{i\leftarrow j}-\frac{\sigma K}{r^2}n_0\right|
\le512\frac K{r^2}(\epsilon^2+\eta).
}
$$

In particular, a near-circular source acceleration satisfying $A_*r=O(\epsilon^2)$ removes the baseline's first-order velocity contribution on this actual local history chart. A mere finite acceleration bound does not imply that scaling. This estimate is local and supplies no controlled long-time drift or total-energy account.

## Exact prescribed circular-pair residual

An accelerated complete circular control distinguishes suppression of the first-order term from removal of every tangential residual. Let the pair have member radius $R$, constant speed ratio $0<\beta<1$ and opposite polarities. At one reception put the positive member at $(R,0)$ with velocity $(0,\beta)$. If the angular delay is $2u$, the unique partner root obeys

$$
u=\beta\cos u,\qquad
L=2R\cos u,\qquad D=1+\beta\sin u.
$$

Here $L$ denotes delayed range in this subsection. The source direction, velocity and acceleration are

$$
n=(\cos u,-\sin u),\quad
v=-\beta(\sin2u,\cos2u),\quad
a=\frac{\beta^2}{R}(\cos2u,-\sin2u).
$$

Their scalar products are $n\cdot v=-\beta\sin u$, $|Pv|^2=\beta^2\cos^2u$ and $L(n\cdot a)=2\beta^2\cos^2u$. Substituting into the independent candidate row gives the radial and forward tangential components

$$
A_r=-\frac K{4R^2\cos u\,D^3}
(1+2\beta\sin u+\beta^2),
\qquad
A_t=\frac K{4R^2\cos^2u\,D^3}
(\sin u-\beta\cos2u).
$$

The tangential term is strictly positive. The subfield root has $0<u<\pi/4$, and

$$
\cos u\,(\sin u-\beta\cos2u)
=\tfrac12\sin2u-u\cos2u>0.
$$

The last function vanishes at zero and has derivative $2u\sin2u>0$. Consequently the prescribed circular motion fails tangential balance under this candidate for every $0<\beta<1$. This is a residual comparison, not a stability linearization about an equilibrium.

For small $\beta$, the root expansion $u=\beta-\beta^3/2+O(\beta^5)$ gives

$$
A_t=\frac K{3R^2}\beta^3
+O\left(\frac K{R^2}\beta^5\right),
\qquad
A_r=-\frac K{4R^2}\left[1+\frac12\beta^2+O(\beta^4)\right].
$$

The analytic implicit root near zero justifies these expansions; the exact formulas decide the signs without relying on their remainders. The candidate suppresses the baseline circular push from linear to cubic order in speed on this prescribed control. It does not make a subfield uniform circle an exact solution, and it does not by itself decide any evolved pair's eventual fate.

## Pre-comparison history: independent-reference boundary

This construction is fixed before examining the new investigation. The accepted independent facts are the branchwise regular derivative, stationary and affine controls, nonzero delayed-acceleration term, a compatible $C^{2,1}$ local method-of-steps domain, the acceleration-dependent local cancellation estimate and the exact circular residual. The global self scalar and pointwise gradients at acceleration jumps are excluded from that mathematical domain.

Falsifiers are failure of the delta pullback or integration by parts on a positive-margin branch; an accelerated collinear source whose parametric derivative disagrees with the boxed row; a compatible regular supplied pair for which the local contraction construction fails despite all margins; an admissible local history violating the $512$ bound; or circular substitution yielding a different residual or sign. A new singular-event law, weak seam interpretation, action account, infinite population or superfield chart would require a separate investigation, not an extension of this report's acceptance.

Only this new working document and `.tmp/amplitude-gradient-review/` scratch are written. The canonical and proposal inputs were inventoried locally with `shasum -a 256`; their observed states are not repinned or modified by this assignment. No production evolution, Python run, source-physics import, shared queue, corpus, baseline equation or generated artifact is changed. The coordinator must authorize comparison with a separately frozen writer subject before this report makes a verdict on that subject.

## Adjudication of the separately frozen investigation

**Final disposition: accept the [regular-pair investigation](amplitude-gradient-regular-pair-investigation.md) at its stated bounded scope.** The pending-comparison remarks above record the preserved first-stage independent reference. That reference was fixed and copied to `.tmp/amplitude-gradient-review/independent-reference-before-comparison.md` before the coordinator authorized reading the writer's subject. The comparison below was made afterwards, against a separately inventoried subject. No mathematical conclusion or control from the independent stage was revised to fit the subject.

The subject's compact derivative is algebraically equal to the independent distributional construction: $D(n-Pv)-n|Pv|^2=(1-|v|^2)n-Dv$. Its normalization also agrees when dimensions are restored: $D=D_t/c_f$, so the scalar is $c_f/(R|D_t|)$ and the acceleration coefficient is $\sigma K\,nn^{\mathsf T}/(c_f^2RD^3)$. The stationary, affine and accelerated controls are accepted. The supplied accelerated quadratic control has a complete uniformly subfield smooth extension for sufficiently small cutoff and coefficient, and tests the same acceleration term as the independent harmonic control.

### Sharper local comparison constant

The writer's $256$ local bound is accepted independently, rather than replaced by the reference's more conservative $512$. Compare the actual source to the affine source anchored at its present position and velocity. With $\eta=A_*r$ and $\epsilon\le1/8$, evaluating the affine residual at the actual root gives

$$
|R-R_{\rm aff}|\le\frac{A_*r^2}{2(1-\epsilon)^3}<A_*r^2.
$$

Only the actual root interval is used for the source Taylor estimate, so no acceleration bound on an unvisited affine interval is hidden in this step. The corresponding vector and normalized-direction comparison gives

$$
|n-n_{\rm aff}|\le\frac{1+\epsilon}{(1-\epsilon)^3}\eta<2\eta,
\qquad |v-v(T)|\le\frac\eta{1-\epsilon}<2\eta.
$$

For the nonacceleration row $B=[(1-|v|^2)n-Dv]/(R^2D^3)$, use its smooth ambient extension on the convex segment of actual and affine arguments. There $R\ge8r/9$, $|n|\le1$, $|v|\le1/8$ and $D\ge7/8$. Its numerator $N$ obeys $|N|<6/5$, $\|\partial_nN\|\le1$ and $\|\partial_vN\|\le3/2$. Differentiating the denominator as well gives

$$
\|\partial_nB\|
\le\frac{81}{64r^2}\left[(8/7)^3
+\frac{9}{20}(8/7)^4\right]<\frac3{r^2},
$$

$$
\|\partial_vB\|
\le\frac{81}{64r^2}\left[\frac32(8/7)^3
+\frac{18}{5}(8/7)^4\right]<\frac{12}{r^2},
\qquad
\|\partial_RB\|<\frac6{r^3}.
$$

Consequently $|B-B_{\rm aff}|\le36A_*/r$. The explicit sampled-acceleration term contributes less than $2A_*/r$. In the affine formula, the normalized numerator differs from the present unit direction by at most $2\epsilon^2$, and its scalar multiplier is $(1-|v(T)_\perp|^2)^{-3/2}$. For $0\le z\le1/64$, $(1-z)^{-3/2}<33/32$ and its derivative is less than $8/5$. Thus the affine row error is less than $4K\epsilon^2/r^2$. Combining these separate bounds gives

$$
\left|A_{i\leftarrow j}-\frac{\sigma K}{r^2}n_0\right|
\le\frac K{r^2}(4\epsilon^2+38\eta)
\le\frac{256K}{r^2}(\epsilon^2+\eta).
$$

The dimensional acceleration parameter is $A_*r/c_f^2$. The bound retains that parameter and does not infer its smallness from speed alone. No numerical replay supplies any of these constants.

### Cubic coefficient and the controlled fifth-order remainder

The exact circular tangent formula and strict sign match the independent result. Its coefficient $K\beta^3/(3R_0^2)$ is accepted. The writer's error bound $5K\beta^5/R_0^2$ for $0<\beta\le1/8$ is also accepted by a separate Taylor estimate.

Write $x$ for the root angle, so $x=\beta\cos x$ and $0<x<\beta$. Let $E=x-\beta+\beta^3/2$. The cosine Taylor remainder and $0\le\beta-x\le\beta^3/2$ give

$$
0\le E\le\frac{13}{24}\beta^5.
$$

For $N=\sin x-\beta\cos2x$, subtract $4\beta^3/3$ before taking absolute values. The five contributions are $E$, $2\beta(x^2-\beta^2)$, $-(x^3-\beta^3)/6$, the sine fifth-order remainder and minus $\beta$ times the cosine fourth-order remainder. They are bounded, respectively, by $13\beta^5/24$, $2\beta^5$, $\beta^5/4$, $\beta^5/120$ and $2\beta^5/3$. Hence

$$
|N-4\beta^3/3|\le\frac{52}{15}\beta^5.
$$

Put $q=\cos^{-2}x(1+\beta\sin x)^{-3}$. Since $\cos x\ge1-\beta^2/2\ge127/128$, one has $q<4/3$. Also $\cos^{-2}x-1=\tan^2x\le(4/3)\beta^2$ and $1-(1+\beta\sin x)^{-3}\le3\beta^2$, giving $|q-1|\le(16/3)\beta^2$. Therefore

$$
\left|\frac{KqN}{4R_0^2}-\frac{K\beta^3}{3R_0^2}\right|
\le\frac{44K}{15R_0^2}\beta^5
<\frac{5K}{R_0^2}\beta^5.
$$

This stricter independent estimate verifies the claimed constant without changing the writer's subject or fitting a sampled circle. The negative radial component also agrees: its numerator simplifies to $\cos x(1+2\beta\sin x+\beta^2)$, which is positive before the opposite-polarity sign is applied. The prescribed circle is not an equilibrium; the result remains a residual calculation.

### History topology, compatibility and local evolution verdict

The subject's first-step construction is accepted. It evaluates roots directly in the supplied past, rather than relying on an undefined future source. In a receiver-position ball of radius $r_0/4$, its $g(0)>0$ and complete past speed margin give one root with $R>3r_0/8$; for a step shorter than $r_0/8$, that emission lies strictly before the release time. Bounded denominators and the common source-acceleration Lipschitz constant then justify the contraction map and its finite-window $C^2$ continuous-dependence estimate.

The compatible-data construction is nonempty and matches the independent terminal-jet construction. Position and velocity at release do not change, the earlier stationary roots remain outside the modified interval, and the acceleration traces equal the candidate rows exactly. Sampling acceleration across a subsequent seam is valid because the joined acceleration is continuous and locally Lipschitz. Its almost-everywhere derivative may have bounded jumps without violating the asserted $C^{2,1}$ topology. No differentiable history semiflow or dependence in the stronger acceleration-Lipschitz norm is inferred.

The subject explicitly distinguishes the branchwise ordinary self sum from the undefined full self-diagonal scalar. That distinction is accepted and necessary. Its complete subfield root census excludes ordinary self hits without subtracting the divergent off-path self potential. Its local theorem is appropriately conditional on regularity, compatibility and strict speed, range and transmitter margins. It does not continue a jump in sampled acceleration by an unselected rule or extend through a lost margin.

### Final accepted and unresolved scope

| Subject claim | Independent verdict |
| --- | --- |
| Accelerated-source derivative, normalization and controls | Accepted by the independent emission-time distribution and scalar controls. |
| Complete one-partner/no-self-root census | Accepted under the complete uniform subfield speed and separation assumptions. |
| Compatible $C^{2,1}$ local coupled evolution and stated $C^2$ dependence | Accepted on common strict margins and a common sampled-acceleration Lipschitz bound. |
| Global self-inclusive scalar gradient at the receiver diagonal | Undefined; the subject correctly excludes this interpretation. |
| Local remainder constant $256$ | Accepted by the independent affine comparison above. |
| Positive circle residual, cubic coefficient and $5\beta^5$ error constant | Accepted by exact geometry and the separate controlled Taylor estimate. |
| Exact isolated subfield mirror circle | Excluded by its nonzero tangential residual; no stability spectrum about such a circle is assigned. |
| Controlled coupled long-time fate, physical account or singular continuation | Unproved and outside the bounded investigation. |

The full first-stage independent reference is preserved in its local snapshot. The durable report adds this comparison section and clarifies the opening status and pre-comparison heading; its mathematical reference is unchanged. The frozen writer subject's identity is recorded independently in `.tmp/amplitude-gradient-review/frozen-subject.sha256` and checked after drafting; no digest is substituted to erase a mismatch. The known-control-first Markdown/KaTeX check and scoped whitespace check verify document syntax, not mathematical acceptance. The separate proofs above provide the acceptance. No numerical target, subject, reference instrument, shared queue, corpus or baseline law was edited by this assignment.
