# A closed position–velocity error bound for the first circular-departure interval

**Date:** 2026-09-26. **Scope:** the sharp Master Equation with the authorized field-speed ceiling, $c_f=1$, no self action, and the supplied radius-$1.001$ circular past. **Grade:** a derived finite-interval theorem with outward-rounded evaluation of its sufficient inequalities, conditional on the stated derivation, the earlier defect calculation and the interval backend. It has not received independent mathematical or implementation review. No smoothing or additional physical rule is introduced.

The released solution exists uniquely through $0\le t\le1$ in the absolutely continuous velocity class and remains close to the precisely defined comparison curve from the [first-window defect calculation](sharp-circle-first-window-defect.md). Throughout this interval its Euclidean position and velocity errors satisfy

$$
|X(t)-\widetilde X(t)|<0.0000450,
\qquad |V(t)-\widetilde V(t)|<0.0001342.
$$

These are bounds on the actual released motion, rather than only bounds on how accurately the comparison curve satisfies the equation. The solution remains at field speed, with a positive raw forward acceleration component. The result supplies a short initial segment of the finite history needed by the [conditional escape criterion](sharp-circle-braking-continuation.md#6-stronger-escape-criterion-and-corrected-finite-target); it establishes neither the time-300 hypotheses nor eventual escape.

## 1. Data and the distinction between a comparison curve and a solution

The pair has opposite positions and velocities. Write the first member's supplied past as

$$
P(s)=r_0(\cos(s/r_0),\sin(s/r_0)),\quad
U(s)=(-\sin(s/r_0),\cos(s/r_0)),\quad r_0=1001/1000,
\qquad s\le0.
$$

The other member has past $-P(s)$ and velocity $-U(s)$. At release the first member has $X(0)=(r_0,0)$ and $V(0)=(0,1)$. The circular past is supplied initial history: it is not asserted to satisfy the acceleration equation before release. In particular, this result does not resolve the separate construction of dynamically admissible all-past perturbations of the compatible circle.

For a receiver at $z$ and time $t$, an emission at $s$ satisfies

$$
g(t,s,z)=|z+P(s)|-(t-s)=0.
$$

At an ordinary root define the hit range $\ell=|z+P(s)|$, direction $n=(z+P(s))/\ell$, transmitter factor $J=1+n\cdot U(s)$ and sharp partner acceleration

$$
A(t,z)=-\frac{k n}{\ell^2J},\qquad
k=4D(1+\sin D),\quad D=\cos D,\quad 0<D<1.
$$

Here $J>0$ will be proved throughout the region used. There is one partner root and no self contribution. The ceiling is expressed as $\dot V+\nu=A$, with $\nu\in N_{\overline B_1}(V)$, the outward normal cone to the unit velocity ball. Thus $\nu=0$ below the ceiling; on $|V|=1$, a positive forward component is removed while the transverse acceleration remains. This is the existing authorized response law.

The comparison curve $(\widetilde X,\widetilde V)$ is the exact concatenation of 128 unit-speed arcs whose decimal angular rates are fixed in the [defect receipt](../evidence/sharp-circle-first-window-defect-receipt.json). It has the exact same initial position and velocity. Its velocity is continuous across joins and its acceleration is piecewise continuous. For its admissible normal reaction $\widetilde\nu$, the complete residual is

$$
\mathcal R=\dot{\widetilde V}+\widetilde\nu-A(t,\widetilde X),\qquad
|\mathcal R|\le\delta=0.000053736821978284
\quad\text{almost everywhere on }[0,1].
$$

The earlier evaluator establishes, throughout all 512 time boxes, comparison-root bounds $\ell_0>1.4780$, $J_0>1.6706$, $s_0<-0.4798$ and $\widetilde V\cdot A(t,\widetilde X)>0.8995$. It also encloses $k<4.947768$. The new instrument checks these conservative decimal bounds against every retained binary box, rather than treating nearest-rounded summary digits as certified endpoints. The comparison curve is only an aid to proving a solution bound; prescribing these arcs is not a new dynamical rule.

## 2. A complete ordinary root throughout the proposed position region

Fix $t\in[0,1]$. Consider all receiver positions with $|z-\widetilde X(t)|\le\rho=0.01$, and source times within $\eta=0.02$ of the comparison root $s_0(t)$. Since $|U|=1$ and $|U'|=1/r_0$, the hit-vector difference is at most $d=\rho+\eta=0.03$. Consequently

$$
\ell\ge\ell_*=1.4780-d=1.4480,
\qquad
|n-n_0|\le\frac{2d}{1.4780},
\qquad
|U(s)-U(s_0)|\le\frac{\eta}{r_0}.
$$

The normalized-vector inequality follows by adding and subtracting the perturbed vector divided by its reference length and applying the reverse triangle inequality. It does not require the two vectors to have the same length. These estimates give

$$
J\ge J_*:=1.6706-\frac{2(\rho+\eta)}{1.4780}-\frac{\eta}{r_0}
>1.610024580831888003.
$$

At $s=s_0$, changing the receiver changes $g$ by at most $\rho$. Throughout the source buffer, $\partial_sg=J\ge J_*$. Therefore

$$
g(t,s_0-\eta,z)\le\rho-J_*\eta<0,
\qquad
g(t,s_0+\eta,z)\ge J_*\eta-\rho>0.
$$

The positive sign margin exceeds 0.022200491616637760. The intermediate-value theorem provides a root inside the buffer and strict positivity of $J$ makes it ordinary and unique there. Every buffered source remains negative, since $s_0+\eta<-0.4598$. The circular source history is therefore applicable to the entire argument.

This is also the complete partner-root census, not merely a local selection. For any source path of speed at most one, $s\mapsto |z-X_{\mathrm{partner}}(s)|-(t-s)$ is nondecreasing, by the triangle inequality. The strict negative buffer-end gap excludes every earlier source; the strict positive buffer-end gap excludes every later source, including any unknown speed-capped continuation after zero. No additional root can occur outside the buffer. The prescribed no-self-action condition applies at and below field speed throughout.

## 3. Receiver-position sensitivity of the acceleration

At fixed $t$, the ordinary root depends smoothly on $z$. Differentiating the root equation in a receiver displacement $h$ yields

$$
D_zs[h]=-\frac{n\cdot h}{J},\qquad
|D_zs[h]|\le\frac{|h|}{J_*}.
$$

Set

$$
C_r=1+\frac1{J_*},\qquad
C_J=\frac{C_r}{\ell_*}+\frac1{r_0J_*}.
$$

For $r=z+P(s(z))$, the chain rule gives $|D_zr[h]|\le C_r|h|$. Differentiating its length and unit direction gives $|D_z\ell[h]|\le C_r|h|$ and $|D_zn[h]|\le(C_r/\ell_*)|h|$. Finally, differentiating $J=1+n\cdot U(s)$ gives $|D_zJ[h]|\le C_J|h|$. These bounds include the source-time shift; holding the emission time fixed would omit part of the sensitivity.

Differentiating $A=-kn/(\ell^2J)$ now gives the operator-norm bound

$$
\|D_zA\|\le
\frac{4.947768}{\ell_*^2J_*}
\left(\frac{3C_r}{\ell_*}+\frac{C_J}{J_*}\right)
\le L=6.506751907827792756.
$$

The factor three combines one unit-direction derivative and two range derivatives. This bound is conservative; no cancellation is needed. The ball $|z-\widetilde X(t)|\le\rho$ is convex, and the root construction applies to every point in it, so integrating the derivative along a line segment proves

$$
|A(t,z)-A(t,\widetilde X(t))|\le L|z-\widetilde X(t)|.
$$

The acceleration itself is bounded by $M=4.947768/(\ell_*^2J_*)<1.465682$. On the reference curve, $|A(t,\widetilde X)|\le M_0=4.947768/(1.4780^2\,1.6706)$. In the combined position–velocity region $|z-\widetilde X|\le\rho$ and $|v-\widetilde V|\le\sigma=0.01$, with $|v|=1$, the forward component obeys

$$
v\cdot A(t,z)\ge0.8995-M_0\sigma-L\rho>0.8208.
$$

Thus the whole proposed boundary-velocity region lies on the active ceiling branch. This strict inequality will justify local existence there and prevent an unproved assumption about ceiling retention.

## 4. Propagating the equation defect and closing the bounds

Write $p(t)=|X(t)-\widetilde X(t)|$ and $q(t)=|V(t)-\widetilde V(t)|$. The two solutions of the position equation give $p'\le q$ almost everywhere. Subtracting their acceleration equations and using monotonicity of the normal cone gives

$$
q'\le |A(t,X)-A(t,\widetilde X)|+|\mathcal R|
\le Lp+\delta.
$$

For completeness, the monotonicity step uses $(V-\widetilde V)\cdot(\nu-\widetilde\nu)\ge0$. Multiply the difference equation by $V-\widetilde V$ and divide by its norm where nonzero. At zeros of the absolutely continuous nonnegative function $q$, its derivative is zero wherever it exists, so the inequality also holds almost everywhere there. Since the comparison velocity has no jumps, its arc joins contribute no impulses. Both initial errors vanish.

The cooperative scalar comparison system $\bar p'=\bar q$, $\bar q'=L\bar p+\delta$, with zero initial data, has the explicit solution

$$
\bar p(t)=\frac{\delta}{L}\bigl(\cosh(\sqrt L\,t)-1\bigr),\qquad
\bar q(t)=\frac{\delta}{\sqrt L}\sinh(\sqrt L\,t).
$$

Its nonnegative integral kernel, or iteration of $p(t)\le\int_0^tq$ and $q(t)\le\int_0^t(Lp+\delta)$, gives $p\le\bar p$ and $q\le\bar q$ while the solution remains in the proposed region. These scalar functions are error bounds derived from the sharp equation; they are not substitute motion equations for the pair. They increase with time. Outward-rounded evaluation gives

$$
\bar p(1)\le0.000044992163416492<\rho,
\qquad
\bar q(1)\le0.000134190370747611<\sigma.
$$

It remains to establish that there is a solution to compare and that the estimate reaches time one. On the active branch put $V=(-\sin\theta,\cos\theta)$ and $N=(-\cos\theta,-\sin\theta)$. The equations become

$$
\dot X=V(\theta),\qquad \dot\theta=N(\theta)\cdot A(t,X),\qquad \theta(0)=0.
$$

The complete-root construction makes this an ordinary smooth local differential equation in $(X,\theta)$: all sources are the fixed analytic past, and positive $\ell_*$ and $J_*$ exclude singularities. The positive-forward inequality ensures that its unit-speed solution solves the authorized normal-cone equation. Local existence therefore starts at the supplied data. If this solution first reached either error boundary before time one, the comparison estimates would put it strictly inside both boundaries at that time, a contradiction. Moreover, $|\dot X|=1$ and $|\dot\theta|\le M$ give finite limiting states at any putative earlier maximal time. They remain inside the ordinary-root region, so local continuation extends the solution. This proves existence through time one without assuming the desired interval in advance.

Uniqueness holds in the absolutely continuous capped class. For two solutions starting at the same state, the same normal-cone argument with zero residual gives zero position and velocity difference on their common local interval. Continuity and continuation extend this equality through the constructed interval. For the full pair, reflection exchanges the two source histories and preserves the equations. Applying this uniqueness to the two receiver equations identifies the antipodal reduction with the two-body motion. On this first window each receiver uses only its partner's fixed negative-time history, so this identification does not presume a future-history approximation.

Using the closed error bounds in the forward-component estimate improves the result to $V\cdot A(t,X)>0.8990253$ throughout. Hence the actual pair remains at exactly field speed on $[0,1]$; it has not yet reached the numerically observed braking release.

## 5. Arithmetic evidence and scope

The explicit-use [tube instrument](../../../../scripts/field-speed-ceiling/sharp-circle-first-window-tube.py) uses `mpmath.iv` 1.3.0 at 180 bits in the shared repository virtual environment. It leaves the earlier defect evaluator unchanged, checks its source digest and the raw 128-arc evidence digest, and verifies the range, transmitter, source-time, forward-component and residual assumptions against all 512 binary interval boxes. Exact integer arithmetic rounds displayed decimal endpoints outward. The [receipt](../evidence/sharp-circle-first-window-tube-receipt.json) retains commands, inputs, binary bounds, endpoint boxes, source identities and the control results.

Before any target evidence was read by this instrument, it passed independent analytic comparison controls: $L=0$, $\delta=3$, $t=2$ gives $\bar p=\bar q=6$; and $L=\delta=1$, $t=\log2$ gives $\bar p=1/4$, $\bar q=3/4$. It also passed signed binary-endpoint reconstruction and positive/negative directed-decimal controls. The target then verified the sufficient inequalities above. These controls test the arithmetic implementation against known formulas. They do not independently review the receiver-sensitivity proof or formally verify the interval library.

At time one, outward-rounded rectangular enclosures for the actual first member are

| Component | Lower endpoint | Upper endpoint |
| --- | ---: | ---: |
| $X_x(1)$ | 0.541949658372256496 | 0.542039642699089480 |
| $X_y(1)$ | 0.841964697088240975 | 0.842054681415073959 |
| $V_x(1)$ | -0.840654448484836297 | -0.840386067743341075 |
| $V_y(1)$ | 0.541645927112190048 | 0.541914307853685271 |

The second member has the reflected enclosure. Rectangular boxes discard correlations and may include velocities with norm different from one; the actual trajectory satisfies the separately proved unit-speed constraint. The all-time Euclidean error bounds are stronger information than these endpoint boxes alone.

**Remaining boundary.** The result proves only this supplied-history initial-value problem through time one, subject to the stated proof and computational dependencies. It proves no eventual separation, no ceiling-release time, no fate of the contracting input and no all-past nonlinear-instability theorem. Beyond the analytic-source interval, position and velocity errors in the evolving source history must also enter the acceleration bound. The next bounded extension should retain the nonzero endpoint errors and cover a further interval while verifying whether each received emission is still in the analytic past; it must not restart with zero error.

**Falsifiers.** A missed causal root, a source outside the negative-time buffer, a missing derivative in $D_zA$, an invalid normal-cone comparison, a failed continuation hypothesis, an excluded analytic control or invalid interval rounding would defeat the affected conclusion. The receipt exposes the strict inequalities and input files needed to check each computational premise. Failure of a later error bound would limit continuation of the certificate, not refute the sharp motion or prove a physical transition.
