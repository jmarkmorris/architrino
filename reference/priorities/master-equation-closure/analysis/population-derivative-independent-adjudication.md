# Independent adjudication of population history sensitivity

## Decisions and scope

The full finite-root history derivative, the uniform relaxed root census, and the distant finite-perturbation obstruction in [the subject](population-history-derivative.md) are accepted at their declared scope. The exact perturbation sequence proves more than growing derivative norms: acceleration fails to be continuous at the stationary history in the unchanged uniform position/velocity norm, even on a subset where every specified complete-block sum exists. Any extension that preserves the canonical acceleration change under finite source modifications inherits that discontinuity.

This is the independent mathematical review for [current effort 2](../work-queue.md#effort-contracts). The subject, the [population class](population-history-class.md), its [prior adjudication](population-independent-adjudication.md), and the subject's frozen references are read-only inputs. The proofs below reconstruct the required implications from their definitions. Neither the subject author's conclusions nor an instrument pass is used as mathematical acceptance. The concurrent delayed-summation review is not an input.

| Claim | Decision | Accepted scope or reason for rejection |
| --- | --- | --- |
| Full derivative of a regular row and every finite retained sum | Accept | Includes moving emission time, direct source-velocity variation, and sampled source acceleration times the emission-time shift; both signs of the transmitter factor are covered. |
| Uniform relative first-order remainder | Accept | Along differences of admitted histories, with fixed class constants; the jerk bound controls the change of the perturbation's sampled velocity. |
| Complete root persistence with common relaxed margins | Accept | At release, over all channels and the entire past, including the separately controlled self near-diagonal sector. |
| Exact original constants for every sufficiently small ambient perturbation | Reject | This is not the subject's claim. Original margins require common slack, and smallness in the position/velocity norm does not enforce the higher regularity constraints. |
| Exact-class admission of the displayed finite-shell perturbations | Accept | All labels and channels satisfy the original constants with common slack independent of shell radius. |
| Vanishing derivative tails in the declared operator norm | Reject | Actual finite-shell derivative norms have a lower bound proportional to radius; complete-block radial tails fail the same Cauchy criterion. This accepts the subject's negative theorem. |
| Discontinuity of the complete-block acceleration on the stationary history and its finite modifications | Accept | An exact finite increment, without a Taylor remainder or exchange of infinite limits, stays uniformly positive along histories converging to the stationary member. |
| Continuous or locally Lipschitz extension respecting finite source changes | Reject | Already impossible at receiver zero on the displayed subset. The finite-change condition is stated explicitly below. |
| Every possible set-theoretic extension is discontinuous without any consistency condition | Reject | Continuity of an arbitrarily assigned map is not excluded; such a map need not represent the canonical acceleration changes. |
| Existence of an individual coupled population solution, or nonexistence of all such solutions | Unresolved | This review establishes an obstruction to the proposed functional on its full declared history domain, not a theorem about every EOM trajectory. |
| Positive lifespan, density preservation, dense contact, genericity, or same-transmitter birth | Unresolved | No coupled future, invariant region, or boundary-lineage argument is supplied. |

Claim grade: derived for the decisions established below. Falsifiers are attached to the individual arguments. No mathematical correction to the subject's central formulas or witness is required; the extension hypothesis must accompany every downstream use of its discontinuity conclusion.

## Fixed domain and canonical row

Set the wake speed to $c_f=1$ and reception time to zero. Fix $ell=L/100>0$, labels $a\in\mathbb Z^3$, anchors $\mathbf z_a=\ell a$, charges $q_a=q_0(-1)^{a_1+a_2+a_3}$ with $q_0>0$, and coupling $\kappa>0$. Labels $0,e_1$ are targets. Environmental histories remain within $b=\ell/16$ of their anchors; target histories have bound $B=4\ell$. Every prescribed past $\mathbf X_a:(-\infty,0]\to\mathbb R^3$ is $C^3$, with speed bound $V_*=4$, acceleration-of-input bound $A_*=256/\ell$, and jerk bound $J_*=65536/\ell^2$. Distinct labels have release separation at least $d_*=\ell/8$. The input acceleration is a time derivative of the prescribed history; it is not asserted to solve the EOM.

For two such histories let $\mathbf h=\widetilde{\mathbf X}-\mathbf X$ and define

$$
p=\sup_{a,s\le0}\frac{\|\mathbf h_a(s)\|}{\ell},\qquad
v_h=\sup_{a,s\le0}\|\dot{\mathbf h}_a(s)\|,\qquad
\varepsilon=\|\mathbf h\|_{\mathcal H}=p+v_h.
$$

This is the prescribed uniform complete-past position/velocity norm on displacement differences. It neither suppresses old times nor constrains different labels to preserve cancellation moments. The population class is a relative subset of this ambient $C^1$ space. In this review, a relative derivative is a bounded linear expression whose error is $o(\|\mathbf h\|_{\mathcal H})$ along admitted differences. No ambient open set of $C^3$ histories is presumed.

For receiver $i$ and source $j$, the positive-delay residual is

$$
f_{ij}(\tau)=\tau-\|\mathbf X_i(0)-\mathbf X_j(-\tau)\|,\qquad \tau>0.
$$

Every positive root has a disjoint centered closed tube of half-width $w=\ell/256$, entirely in positive delay. Range is at least $w$ and the signed transmitter factor has magnitude at least $\delta=1/4$ throughout the tube. Ordinary complements have $|f|\ge\gamma=w/4$. In a self channel, $0<\tau\le\tau_0=2w$ instead has $|f_{ii}|\ge\eta\tau$ with $\eta=1/4$, and no root tube meets that sector. All positive roots are retained; there are at most $M=2050$ per channel. The exact zero-delay diagonal is excluded without an assigned acceleration.

At one root with emission time $s=-\tau$, write

$$
\mathbf R=\mathbf X_i(0)-\mathbf X_j(s),\quad r=\|\mathbf R\|=-s,\quad
\mathbf n=\mathbf R/r,\quad
\mathbf V=\dot{\mathbf X}_j(s),\quad
\mathbf A=\ddot{\mathbf X}_j(s),\quad
D=1-\mathbf n\cdot\mathbf V,\quad C=\kappa q_iq_j.
$$

The [canonical regular acceleration row](../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation) is $\mathbf a=C\mathbf n/(r^2|D|)$. Its source factor is an absolute transmitter Jacobian. Receiver playback is a different derivative and is not a multiplier of this row. The argument uses this acceleration law and Euclidean causal geometry; no observer-level mechanical premise is imported.

## Independent finite-root differentiation

A change in a history changes the selected emission time as well as the values sampled there. Let $\mathbf q=\mathbf h_i(0)-\mathbf h_j(s)$ be the direct displacement change evaluated at the original root, and let $\mathbf P=\mathbf I-\mathbf n\otimes\mathbf n$. The bold symbol $\mathbf q$ denotes a displacement variation; scalar charges remain fixed.

Differentiate $G=\|\mathbf X_i(0)-\mathbf X_j(s)\|+s=0$. The partial derivative of $G$ with respect to $s$ is $D$, while its direct history variation is $\mathbf n\cdot\mathbf q$. Therefore

$$
\sigma=\delta s=-\frac{\mathbf n\cdot\mathbf q}{D},\qquad
\mathbf U=\delta\mathbf R=\mathbf q-\mathbf V\sigma.
$$

Taking the radial projection gives $\delta r=\mathbf n\cdot\mathbf U=-\sigma$, because $\mathbf n\cdot\mathbf q=-D\sigma$ and $D+\mathbf n\cdot\mathbf V=1$. The remaining changes are

$$
\delta\mathbf n=\frac{\mathbf P\mathbf U}{r},\qquad
\delta\mathbf V=\dot{\mathbf h}_j(s)+\mathbf A\sigma,\qquad
\delta D=-\mathbf V\cdot\delta\mathbf n-\mathbf n\cdot\big(\dot{\mathbf h}_j(s)+\mathbf A\sigma\big).
$$

The term $\mathbf A\sigma$ is required because the original source velocity is evaluated at a different time. There is no direct receiver-velocity variation at fixed reception. For a positive-delay self root, both receiver and source evaluations vary as values of the same history; the formula retains both, with no independent-source assumption at that row.

The derivative of $1/|D|$ is $-\delta D/(|D|D)$ on either fixed-sign chart. Applying the product rule to $\mathbf R/(r^3|D|)$ gives

$$
\boxed{
\mathcal L_{ijb}[\mathbf h]
=\frac{C}{|D|}
\left[
\frac{\mathbf U}{r^3}-\frac{3\mathbf R(\mathbf R\cdot\mathbf U)}{r^5}
-\frac{\delta D}{D}\frac{\mathbf R}{r^3}
\right]
=\frac{C}{r^2|D|}
\left[\delta\mathbf n-\mathbf n\left(\frac{2\delta r}{r}+\frac{\delta D}{D}\right)\right].
}
$$

This independently obtained expression is the subject's formula. Holding the source history fixed reduces it to the [complete receiver gradient](receiver-wake-gradient-closure.md#complete-one-root-receiver-gradient). That agreement is a restriction check, while the causal constraint and product rule above supply the derivation. This is differentiation of an update on prescribed histories, not a stability spectrum about an asserted equilibrium.

To check the constants, put $K=1+V_*/\delta=17$. Then $|\sigma|\le2\ell p/\delta$, $\|\mathbf U\|\le2\ell pK$, and

$$
|\delta D|\le\frac{2\ell pV_*K}{r}+v_h+\frac{2\ell pA_*}{\delta}.
$$

The linear map $D(\mathbf R/r^3)$ has radial eigenvalue $-2/r^3$ and transverse eigenvalues $1/r^3$, so its operator norm is $2/r^3$. Substitution yields precisely

$$
\|\mathcal L_{ijb}[\mathbf h]\|
\le\kappa q_0^2\left[
\frac{2448\ell p}{r^3}
+\frac{16v_h+32768p}{r^2}
\right].
$$

Here $2K(2/\delta+V_*/\delta^2)=2448$, $1/\delta^2=16$, and $2\ell A_*/\delta^3=32768$. The resulting bound is uniform for one row at fixed class constants. Its failure to be a summable majorant is not itself a population obstruction; an actual lower bound is proved below.

### Relative remainder

For an admitted difference, $\|\mathbf h^{(3)}\|_\infty\le2J_*$. Taylor's formula for $\dot{\mathbf h}$ on a backward interval of length $t>0$ gives

$$
\left\|\ddot{\mathbf h}(s)-\frac{\dot{\mathbf h}(s)-\dot{\mathbf h}(s-t)}{t}\right\|\le J_*t,
\qquad
\|\ddot{\mathbf h}\|_\infty\le\frac{2v_h}{t}+J_*t.
$$

Every such interval is available on the complete past, including at release. Minimizing in $t$ proves $\|\ddot{\mathbf h}\|_\infty\le2\sqrt{2J_*v_h}$; if $v_h=0$, the same conclusion follows directly. Thus small norm controls the modulus of continuity of the velocity perturbation through the fixed jerk constraint, although the norm itself does not include acceleration.

The root estimates in the next section give $|\Delta s|=O(\varepsilon)$ uniformly. Expanding the perturbed root equation around $s$ gives

$$
0=\mathbf n\cdot\mathbf q+D\Delta s+O(\varepsilon^2),\qquad
\Delta s=\sigma+O(\varepsilon^2).
$$

For this expansion, the position Taylor error is bounded by $A_*|\Delta s|^2/2$, the extra perturbation evaluation by $v_h|\Delta s|$, and the range Hessian by the reciprocal of a positive common range floor. At the velocity level the two additional remainders satisfy

$$
\|\dot{\mathbf h}_j(s+\Delta s)-\dot{\mathbf h}_j(s)\|
\le2\sqrt{2J_*v_h}|\Delta s|=O(\varepsilon^{3/2}),
$$

$$
\|\mathbf V_j(s+\Delta s)-\mathbf V_j(s)-\mathbf A\Delta s\|
\le\tfrac12J_*|\Delta s|^2=O(\varepsilon^2).
$$

Range, direction, and reciprocal transmitter factors are smooth with uniformly bounded derivatives on the relaxed positive-range chart. Combining these estimates leaves an $O(\varepsilon^{3/2})$ row remainder. Every fixed finite retained sum therefore has the sum of the displayed row derivatives and a relative $o(\varepsilon)$ remainder. The constant may grow with the number of rows; no infinite summation or interchange of limits is justified by this statement.

Claim grade: derived. Falsifier: a fixed-sign regular row violating the boxed product rule, or admitted history differences violating the displayed interpolation or Taylor estimates, would refute the derivative claim. A finite-difference discrepancy outside a simple-root chart would not test it.

## Uniform root persistence and exact-constant limitations

At each fixed delay, $|\widetilde f-f|\le2\ell p$. On an original root tube, range remains at least $w/2$ if $2\ell p<w/2$. The normalization inequality $\|\mathbf u/\|\mathbf u\|-\mathbf v/\|\mathbf v\|\|\le2\|\mathbf u-\mathbf v\|/\|\mathbf v\|$ gives

$$
\|\widetilde{\mathbf n}-\mathbf n\|\le4\ell p/w,\qquad
|\widetilde D-D|\le V_*4\ell p/w+v_h=16\ell p/w+v_h.
$$

The subject's five sufficient inequalities are

$$
2\ell p<w/2,\quad
16\ell p/w+v_h<\delta/2,\quad
2\ell p<\gamma/2,\quad
v_h<\eta/2,\quad
2\ell p/\delta<w/4.
$$

They all follow from $\varepsilon<1/65536$. For the potentially largest expression, $16\ell p/w+v_h=4096p+v_h\le4096\varepsilon<1/16<\delta/2$. The residual perturbation is below $\ell/32768$, while $\gamma/2=\ell/2048$; the root-shift bound is below $\ell/8192$, while $w/4=\ell/1024$.

The unperturbed endpoint residuals have opposite signs and magnitude at least $\delta w$. The perturbed endpoint signs therefore persist. On the whole tube, $\widetilde D$ retains the old sign and magnitude at least $\delta/2$, so exactly one root remains. Evaluating the old residual at the new zero and using the old slope gives $|\Delta\tau|\le2\ell p/\delta<w/4$. The old ordinary complements remain nonzero with magnitude at least $\gamma/2$, including every sufficiently old delay. This excludes a new root anywhere in the ordinary complement, rather than only in a finite search interval.

For self channels, the same history occurs at both arguments. Consequently $\|\mathbf h_i(0)-\mathbf h_i(-\tau)\|\le\tau v_h$, and

$$
|\widetilde f_{ii}(\tau)|\ge(\eta-v_h)\tau\ge\eta\tau/2
\quad(0<\tau\le\tau_0).
$$

This excludes roots in the near-diagonal sector without assigning a row to the exact diagonal. Recenter the new tubes with half-width $w/2$. Each lies strictly inside its old tube because its center moved by less than $w/4$. At points in the old tube outside the new tube, monotonicity from the new zero gives residual magnitude at least $(\delta/2)(w/2)=\delta w/4$. Thus the complete perturbed census has common margins

$$
w_{\rm new}=w/2,\quad r_{\rm floor}=w/2,\quad
|D|_{\rm floor}=\delta/2,\quad
\gamma_{\rm new}=\min(\gamma/2,\delta w/4),\quad
\eta_{\rm new}=\eta/2.
$$

The tubes remain disjoint and avoid the self sector; the count in every channel is unchanged and still at most $M$. These are relaxed bounds, not a change to the class under adjudication. Exact admission of a general perturbation still requires the original inequalities. To infer that admission from a neighborhood argument, the base needs uniform slack in the original range, transmitter, complement, tube-spacing, displacement, and separation constraints, while higher derivative bounds must also be enforced. Pointwise strictness over infinitely many channels supplies no common slack. Even with slack, the ambient $C^1$ norm alone does not guarantee $C^3$ regularity or a jerk bound.

Claim grade: derived. Falsifier: a perturbation meeting the five inequalities that loses a tube root, produces an ordinary or near-diagonal complement root, or violates a displayed relaxed floor. Loss of an original saturated inequality is not a counterexample to the relaxed result. No positive-time preservation statement is established.

## Exact admission of the distant perturbations

Use the existing stationary member $\mathbf X_a^0(s)=\mathbf z_a$. Fix receiver $i=0$, direction $\mathbf e=(1,0,0)$, and a finite shell

$$
S_R=\{j:R\le d_j<2R\},\qquad d_j=\|\mathbf z_j\|,\quad
\mathbf n_j=-\mathbf z_j/d_j,\quad
\beta_j=\mathbf n_j\cdot\mathbf e,\quad
\chi_j=(-1)^{j_1+j_2+j_3},\qquad R\ge40\ell.
$$

Both target labels are outside the shell. Each stationary source has its unique root at $s_j=-d_j$. Retain the subject's emission-centered profile and histories exactly:

$$
\psi(t)=
\begin{cases}
t(1-t^2)^4,& |t|<1,\\
0,& |t|\ge1,
\end{cases}
\qquad
\mathbf h_j^R(s)=
\begin{cases}
\ell\chi_j\beta_j\mathbf n_j\psi((s+d_j)/\ell),&j\in S_R,\\
\mathbf0,&j\notin S_R.
\end{cases}
$$

The fourth-order endpoint zeros make the zero extension $C^3$. Expanding $\psi=t-4t^3+6t^5-4t^7+t^9$ proves $\psi(0)=0$, $\psi'(0)=1$ and the coefficient-sum bounds

$$
\|\psi\|_\infty\le1,\quad
\|\psi'\|_\infty\le1+12+30+28+9=80,\quad
\|\psi''\|_\infty\le24+120+168+72=384,\quad
\|\psi'''\|_\infty\le24+360+840+504=1728.
$$

Therefore $\|\mathbf h^R\|_{\mathcal H}\le81$, uniformly in $R$. At the original emission, the position variation vanishes exactly and $\dot{\mathbf h}_j^R(s_j)=\chi_j\beta_j\mathbf n_j$. Each support lies before $-39\ell<0$, so all release positions and velocities remain stationary. Translating the pulses to different emission times is permitted by the complete-past norm; a recent common-time pulse would miss the remote roots.

For $|\theta|\le1/1024$, put $\mathbf X^{R,\theta}=\mathbf X^0+\theta\mathbf h^R$. Its environmental displacement is at most $\ell/1024<b$, speed at most $5/64<1/4$, acceleration-of-input at most $3/(8\ell)<A_*$, and jerk at most $27/(16\ell^2)<J_*$. Targets do not move. Distinct-label release separation is at least $\ell>d_*$. These bounds have slack independent of shell size.

The channel checks apply to every receiver, including labels whose pasts were modified. All receiver positions at release equal their anchors. In a cross channel, for every delay, range is at least $\ell-\ell/1024=(1023/1024)\ell>w$. Every source has Lipschitz constant at most $5/64$, hence

$$
f_{ij}(\tau_2)-f_{ij}(\tau_1)\ge(59/64)(\tau_2-\tau_1)\ge(3/4)(\tau_2-\tau_1).
$$

The residual is negative at zero and tends to positive infinity, so it has exactly one positive root. That root has delay at least $(1023/1024)\ell>w$, its full original width-$w$ tube stays at positive range, and $D\ge59/64>\delta$. Outside the tube, the residual magnitude is at least $3w/4>\gamma$ by the same monotonicity estimate. There is no zero-range differentiability assumption hidden in the monotonicity argument.

In a self channel, $r_{ii}(\tau)\le(5/64)\tau$ by the source speed bound, so $f_{ii}(\tau)\ge(59/64)\tau$. There are no positive self roots. This verifies the normalized margin and, for $\tau\ge\tau_0=2w$, the ordinary gap, since $3\tau_0/4>\gamma$. Root multiplicity is one in each cross channel and zero in each self channel. No tube-spacing problem remains. The displacement assumptions also retain the class's spatial and delayed-root counts; no charge, moment, symmetry, partition, or topology amendment is involved.

Claim grade: derived. Falsifier: any one of these exact histories, at any allowed shell and amplitude, violating an original class constraint. Every necessary bound is uniform over labels and all past times. These are admissible prescribed pasts; no EOM compatibility or future evolution is assumed.

## A lower bound for actual derivative tails

At the stationary base, $D=1$, $\mathbf V=\mathbf A=0$. For the displayed direction at a perturbed source, $\mathbf q=0$ and hence $\sigma=\mathbf U=\delta r=\delta\mathbf n=0$. Only $\delta D=-\chi_j\beta_j$ survives. Since $q_0q_j=q_0^2\chi_j$, the finite-row derivative is exactly

$$
\mathcal L_{0j}[\mathbf h^R]=\kappa q_0^2\frac{\mathbf n_j\beta_j}{d_j^2},\qquad
\mathbf e\cdot\mathcal L_{0j}[\mathbf h^R]=\kappa q_0^2\frac{\beta_j^2}{d_j^2}\ge0.
$$

Alternating charge signs cancel against the chosen velocity signs. There is no cancellation of the resulting projected variations. To reconstruct the needed shell count independently, partition space into anchor cubes of side $\ell$. Every point of a cube is within $\sqrt3\ell/2<5\ell$ of its anchor. With $D_0=5\ell$ and $R\ge40\ell$, the annulus $(R+D_0,2R-D_0)$ is covered, apart from null boundaries, by cubes whose anchors belong to $S_R$. Consequently

$$
|S_R|\ge\frac{4\pi}{3\ell^3}\big[(2R-D_0)^3-(R+D_0)^3\big]\ge4\pi\ell^{-3}R^3,
$$

because the dimensionless cubic difference is at least $(15^3-9^3)/512=2646/512>3$. Coordinate permutations preserve the spherical lattice shell, so its three coordinate projection sums are equal. Their sum is $\sum_{S_R}d_j^{-2}$, giving

$$
\sum_{j\in S_R}\frac{\beta_j^2}{d_j^2}
=\frac13\sum_{j\in S_R}\frac1{d_j^2}
\ge\frac{|S_R|}{12R^2}
\ge\frac\pi3\ell^{-3}R.
$$

The operator norm is the supremum over input directions of norm at most one. Testing with $\mathbf h^R/81$ therefore proves the subject's bound

$$
\left\|\sum_{j\in S_R}\mathcal L_{0j}\right\|_{\mathcal H\to\mathbb R^3}
\ge\frac{\pi\kappa q_0^2}{243}\ell^{-3}R.
$$

This is a growing lower bound for the operator itself, not for an upper estimate. The normalized directions are admissible tangent directions because the exact histories above allow both signs of sufficiently small $\theta$ uniformly in $R$.

The same conclusion holds for the fixed eight-label blocks $2n+\epsilon$, $\epsilon\in\{0,1\}^3$, already used by the class. Their centers lie within $a=\sqrt3\ell/2$ of each vertex. Every block meeting $S_R$ has center distance in $[R-a,2R+a]$. The difference of complete-block radial partial sums with cutoff radii $R-2a$ and $2R+2a$ therefore includes every modified label. Extra labels have zero history variation and the receiver is unchanged, so their derivative is zero. This radial difference, tested on $\mathbf h^R/81$, has the same lower bound. It cannot tend to zero as its inner cutoff tends to infinity, which is necessary for operator-norm Cauchy convergence.

No differentiation of an infinite sum occurred. Moreover, if a proposed bounded relative derivative of an extension respects finite source modifications, its value on each $\mathbf h^R$ must equal this finite derivative: take $\theta\to0$ with $R$ fixed. The diverging norm lower bound then contradicts boundedness directly, without interchanging $R\to\infty$ and $\theta\to0$.

Claim grade: derived. Falsifier: failure of exact-class admission, the stationary transmitter derivative, the shell cube inclusion, or the finite coordinate-permutation identity would refute the lower bound. Convergence of the unperturbed signed block values does not test convergence of these operators.

## Exact discontinuity and the finite-modification hypothesis

Growing derivatives alone do not prove failure of continuity: a continuous function can have an unbounded or nonexistent derivative. The subject supplies an independent nonlinear argument, reconstructed here using exactly its histories.

First establish that the stationary complete-block reference exists. For $\mathbf K(\mathbf y)=\mathbf y/\|\mathbf y\|^3$, the alternating sum on an eight-vertex block is, up to sign, the integral of $\partial_1\partial_2\partial_3\mathbf K$ over that block, by three applications of the fundamental theorem of calculus. Let $C_3=\sup_{\|\mathbf y\|=1}\|D^3\mathbf K(\mathbf y)\|_{\rm op}<\infty$. Homogeneity and compactness give a bound $C_3\|\mathbf y\|^{-5}$. A block at center distance $R_c\ge2a$ therefore has acceleration norm at most

$$
\frac{\kappa q_0^2C_3\ell^3}{(R_c-a)^5}\le32\kappa q_0^2C_3\ell^3R_c^{-5}.
$$

There are $O(S^3\ell^{-3})$ block centers in a dyadic shell of radius $S$, by their disjoint cubes of side $2\ell$. Summing the resulting $O(S^{-2})$ shell bounds over dyadic radii proves absolute complete-block convergence. The finitely many nearby blocks remain finite after excluding the receiver diagonal. This derivation concerns the specified stationary partition, not general nonstationary summation or equality between partitions.

At receiver zero, each $\mathbf X^{R,\theta}$ changes only finitely many source histories and leaves the receiver fixed. Every block outside a finite set is therefore exactly unchanged. Its block series still converges absolutely, and subtracting the stationary series leaves exactly the finite sum of changed canonical rows.

For $j\in S_R$, $\psi(0)=0$ keeps the emission position at $s_j=-d_j$ unchanged for every allowed amplitude. Strict monotonicity makes this the unique root, without an approximation. Its direction and range are still $\mathbf n_j,d_j$, while

$$
D_j^{R,\theta}=1-\theta\chi_j\beta_j>0.
$$

Let $\mathcal A_0$ denote the complete-block acceleration on this subset. Exact subtraction gives

$$
\mathcal A_0(\mathbf X^{R,\theta})-\mathcal A_0(\mathbf X^0)
=\kappa q_0^2\theta\sum_{j\in S_R}
\frac{\mathbf n_j\beta_j}{d_j^2(1-\theta\chi_j\beta_j)}.
$$

For $0<\theta\le1/1024$, every projected summand is nonnegative and its denominator is at most $1+\theta$. Thus

$$
\mathbf e\cdot[\mathcal A_0(\mathbf X^{R,\theta})-\mathcal A_0(\mathbf X^0)]
\ge\frac{\pi\kappa q_0^2\theta}{3(1+\theta)}\ell^{-3}R.
$$

Take exactly $R_m=2^m\ell$, $\theta_m=2^{-m}=\ell/R_m$, with $m\ge10$. These are finite-shell histories in the original class. They satisfy

$$
\|\mathbf X^{R_m,\theta_m}-\mathbf X^0\|_{\mathcal H}\le81\,2^{-m}\longrightarrow0,
\qquad
\mathbf e\cdot[\mathcal A_0(\mathbf X^{R_m,\theta_m})-\mathcal A_0(\mathbf X^0)]
\ge\frac{\pi\kappa q_0^2}{6\ell^2}>0.
$$

Hence the acceleration is discontinuous at the stationary member even relative to this convergent-sum subset. A locally Lipschitz map or a map with a bounded relative first-order derivative would be continuous there, so both are excluded.

### Exact scope for a general extension

Let $F_0$ be a proposed finite acceleration value at receiver zero, defined at least on $\mathbf X^0$ and the displayed finite-modification histories. The condition needed for the preceding contradiction is

$$
F_0(Y)-F_0(X)=\sum_{j\in E}
\left[\mathbf a_{0j}(Y)-\mathbf a_{0j}(X)\right],
$$

whenever the two inputs in question have the same receiver history and differ only on a finite source-label set $E\subset\mathbb Z^3\setminus\{0\}$. Here $\mathbf a_{0j}$ denotes the complete finite sum over that channel's retained roots. For this impossibility theorem it is enough to require this identity only for the pairs $X=\mathbf X^0$, $Y=\mathbf X^{R_m,\theta_m}$, $E=S_{R_m}$. The baseline value $F_0(\mathbf X^0)$ can be any finite vector; it cancels from the contradiction.

Keeping the receiver fixed is essential to the formulation: changing its reception position can change infinitely many untouched source rows, so the displayed finite-difference identity is not asserted for such a change. The witnesses keep the entire receiver history fixed, which is stronger than necessary.

An extension agreeing with the convergent complete-block sums satisfies this condition automatically. So does any fixed summation prescription whose convergent partial sums eventually include every member of the finite changed set, with the same prescription on both histories. The condition does not follow merely from defining a function on the class, or from agreeing with canonical finite-population values on a different domain: finite populations are not members of this infinite class. A history-dependent rule that changes the contribution assigned to the untouched population must state that extra prescription and its effect on finite source changes. No such rule is selected or assessed as a repair here.

Claim grade: derived. Falsifier: an admitted member of the displayed sequence with a different unique-root row increment, a failure of the stationary complete-block convergence proof, or a continuous map satisfying the stated finite-increment identity would contradict the argument. A continuous map that abandons this identity is outside the rejected class of extensions.

## Downstream disposition and proposed integration

The compatible acceleration and bounded-derivative premise required by current effort 4 cannot hold on the entire unchanged history class in this norm for an acceleration extension respecting finite source modifications. This remains true even if summation is restricted to the fixed eight-source grouping at the stationary input. It is an independently established failure of that proposed route at release, before any future preservation argument.

This result does not assert that every nonstationary block series diverges, that the stationary input evolves as an equilibrium, or that all infinite population EOM solutions fail to exist. A solution might occupy a more restricted set of histories, and discontinuity of an acceleration functional does not logically exclude every individual solution. Establishing such solutions, a compatible domain, or an amended topology requires additional work. Neither root regularity nor a finite-row derivative supplies that work.

The current dependency consequences are precise: effort 4 cannot consume a positive class-wide continuity/derivative theorem from effort 2; efforts 5–8 retain their dependency on a valid coupled evolution and approximation framework; efforts 6–7 receive no contact or rank theorem. Effort 3's literal same-transmitter reachability question and the event/account owners receive no boundary value, invariant exclusion, continuation, or conservation result. The concurrent summation adjudication retains its own independent scope and is not inferred from this report.

Proposed coordinator integration: “Current effort 2 independently accepts the full regular finite-root history derivative and the quantitative relative root-persistence theorem with common relaxed margins. The original class admits the emission-centered finite-shell witnesses with exact-constant slack. Their finite complete-block derivative tails grow at least linearly with radius. More strongly, the exact finite-modification sequence converges to the stationary history in the unchanged uniform position/velocity norm while its acceleration increments stay uniformly nonzero. Therefore no continuous, locally Lipschitz, or boundedly differentiable acceleration extension respecting canonical finite source changes exists on the full declared domain at that member. This blocks the positive coupled-population route on those assumptions; it does not establish nonexistence of every population solution, dense contact, or same-transmitter birth.”

The strongest next mathematical question is which already justified restriction or update-domain obligation can remove the displayed witnesses while retaining the intended population problem. Changing the class, changing the norm, or changing the response to finite source modifications is a substantive assumption change; no choice is made here and none has a sufficiency theorem from this review. The present independent adjudication is complete without that decision. The coordinator owns shared queue and synthesis integration.

## Frozen evidence and validation record

The following six inputs were copied into `.tmp/population-derivative-adjudication/frozen/` and measured with `shasum -a 256` before independent reconstruction and numerical checking. The frozen copies retain the exact input bytes. The five reference digests equal those recorded by the subject at dispatch.

| Input | SHA-256 |
| --- | --- |
| `analysis/population-history-derivative.md` | `dfa023617ed8ecdc939ad619a475636ac7f1867ad50f2d8592233772af352163` |
| `analysis/population-history-class.md` | `dbe3b4f14a7253747863a4d3979aaf3b43d24b6eb1843b3264d11e2640184c2e` |
| `analysis/population-independent-adjudication.md` | `3a816dd737b6517e8e4e0839314604bbb144c2dcd718a3ebb753b1250fb131d9` |
| `analysis/receiver-wake-gradient-closure.md` | `b570f79f1c276a8ff3652c5d1d31885e213ff6128759886db411faccfb071339` |
| `content/markdown/aaa/dynamics/master-equation.md` | `6a9675f6a6e193e939f20e78f11ed65a881b75bafde695677604656ab145d865` |
| `scripts/equation-mapping/verify-receiver-wake-gradient.mjs` | `f62d06f094be9f85cf9b8018e20fce8332d07285f0d66548aa0f3193c4a2bd9d` |

The independent mathematical evidence is the causal-constraint differentiation, signed absolute-factor product rule, relative Taylor estimates, complete complement proof, all-channel witness admission, cube count, coordinate symmetry identity, stationary threefold block difference, and exact nonlinear increment. These proofs do not use numerical agreement as an infinite-population certificate.

The scratch instrument `verify.mjs` exposes `canonicalAcceleration` and `bracketedRoot` through an adapter made from the frozen evaluator plus an export declaration. Their function bodies remain unchanged, and they do not import the candidate derivative. The scratch derivative is a separate implementation of this report's formula. Before a target run, `node .tmp/population-derivative-adjudication/verify.mjs known` passed the static source at zero and receiver at range two: the analytic derivative was exactly $(-1/4,0,0)$ and centered differences at step $10^{-4}$ gave $(-0.25000000125022237,0,0)$, within $2\times10^{-9}$. That pass was recorded in the scratch validation record before target execution.

The subsequent `target` run reused the frozen evaluator's circular control: radius $0.7$, angular speed $0.4$, height $0.15$, declared emission $s=-1.1$, direction $(0.4,-0.3,\sqrt{0.75})$, and signed coupling $-0.9$, with $c_f=1$. It used the subject's direct receiver perturbation $(0.2,-0.3,0.1)$ and source perturbation $(0.1\sin s,0.07\cos s,0.03\sin2s)$. Centered differences after re-solving the causal row at steps $10^{-3}$, $3\times10^{-4}$, $10^{-4}$, and $3\times10^{-5}$ had vector errors $8.12\times10^{-8}$, $7.31\times10^{-9}$, $8.11\times10^{-10}$, and $7.18\times10^{-11}$. Removing the sampled source-acceleration term changed the derivative by $0.0121101$. The subject's finite pulse control at range two and amplitude $0.001$ retained emission time $-2.000000000000006$ and returned acceleration $-0.2502502502502503$, equal to $-1/[4(1-0.001)]$ at displayed precision.

Claim grade: measured by the named scratch instrument and unchanged frozen canonical evaluator on those finite regular controls. These checks exercise signs, moving roots, and source acceleration; they are not population histories or proofs of an infinite estimate. Failure to reproduce the declared finite tolerances would falsify the numerical record while requiring separate diagnosis of the analytical formulas.

Only this exclusive output and `.tmp/population-derivative-adjudication/` are authored by this review. No subject, reference instrument, class, norm, shared tracker, work log, brainstorming, synthesis, or sibling analysis is edited. No Python, EOM future run, generated write, Git index/publication operation, or downstream dispatch is used.

Before inspecting this document with the syntax instrument, `node .tmp/population-derivative-adjudication/check.mjs known` passed a two-formula/one-file-link case, ignored a fenced unclosed-dollar example, and rejected both an invalid macro and trailing whitespace. This task-local copy changes only the target path of the prior class adjudication's checker; that earlier instrument is unchanged. The known-case pass was recorded before the target run.

Measured validation: `node .tmp/population-derivative-adjudication/check.mjs target` passed 234 KaTeX expressions, six relative file targets, balanced dollar delimiters, and no trailing whitespace in this adjudication. File-target checks do not validate anchors or browser layout. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/population-derivative-independent-adjudication.md` returned 1 for the new-file difference with no whitespace diagnostic. `node scripts/validate-content.mjs --check --strict` completed with zero errors, zero warnings, and 30 notes. Final `shasum -a 256` on the six live inputs returned the frozen digests above. These commands establish their scoped syntax/content checks and input byte identity; the explicit proofs carry the mathematical verdict.
