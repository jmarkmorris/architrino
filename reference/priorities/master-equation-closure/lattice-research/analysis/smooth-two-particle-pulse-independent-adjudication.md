# Independent adjudication of the fixed smooth pulse continuation

## Disposition

The two principal theorems in [the pulse-continuation analysis](smooth-two-particle-pulse-continuation.md) are accepted at their stated conditional scope. For the unchanged smooth input and $0<G/\ell\leq16$, the construction reaches $T=5\ell/16$, receives the entire first pulse at its actual moving receivers, and preserves the original population class. Exactly 24 labels have nonconstant future histories on that interval. For $G/\ell>2^{48}$, the integrated original jerk ceiling contradicts the exact acceleration equation before that pulse ends. This obstruction concerns preservation of the declared class; it establishes no nonexistence theorem in a larger regular domain.

One classification statement needs correction. The proof also excludes $G/\ell=2^{48}$: its strict projected acceleration bound is already greater than one at that endpoint, while the class permits at most one. Consequently the endpoint cannot be included in the manuscript's unresolved row. This is an omission from the parameter classification, not a defect in either stated sufficient theorem. The interval $16<G/\ell<2^{48}$ remains without a complete classification in this adjudication; neither displayed threshold is asserted sharp.

| Claim reviewed | Disposition | Reason and boundary |
| --- | --- | --- |
| Cubic stationary acceleration bound in the specified block sum | Accepted, derived | Finite centered cubes have vanishing Taylor coefficients through degree two; their third derivatives have an absolute summable majorant. |
| Common continuation through $5\ell/16$ for $0<G/\ell\leq16$ | Accepted, derived | An integrated acceleration bound prevents the first displacement exit; smooth bounded receiver equations supply continuation. |
| Original class and complete causal-root census | Accepted, derived | Complete speed and displacement bounds control every positive delay, including the self complement. |
| Exactly 24 nonconstant future histories | Accepted, derived | The shell timing excludes all other incoming corrections, and the accepted first-response coefficients establish motion of these 24 labels. |
| Moving support endpoints and pre-release emissions only | Accepted, derived | Endpoint residuals are strictly increasing; every cross-root emission satisfies $s\leq-21\ell/32$. |
| Obstruction for $G/\ell>2^{48}$ | Accepted, derived | The equation gives a projected acceleration greater than the maximum allowed by the integrated jerk bound. |
| The endpoint $G/\ell=2^{48}$ is unresolved | Rejected, derived | The same strict inequality contradicts the ceiling at equality. |
| Full intermediate classification, later continuation, or physical class selection | Unresolved or outside scope | The proved estimates do not supply those conclusions. |

The reviewer authored the earlier release and first-response adjudications but did not author this extension. Those unchanged prior results are declared dependencies, not a second independent review of themselves. The new acceptance rests on the reconstruction below, including a finite-cube proof of the stationary bound and an explicit derivative estimate for receiver feedback. The source's arithmetic receipts are not theorem evidence here. The hereditary-dynamics role guides the separation of complete history, root domain, continuation and class loss; the role itself supplies no authority.

## 1. The unchanged history and its dimensional reduction

Normalize $c_f=1$. Labels are $i\in\mathbb Z^3$, with anchors $\mathbf z_i=\ell i$, signs $\sigma_i=(-1)^{i_1+i_2+i_3}$ and coupling $G=\kappa q_0^2>0$. Only $E=\{0,e_1\}$ has nonstationary prescribed history, where $e_1=(1,0,0)$. Both targets have direction $\mathbf e=(0,0,1)$ and complete past

$$
\mathbf X_j(s)-\mathbf z_j
=\varepsilon\ell\mathbf e\,\psi\big(8(s/\ell+5/4)\big),
\qquad \varepsilon=2^{-16},\qquad s\leq0,
$$

where $\psi(v)=v(1-v^2)^4$ for $|v|<1$ and is zero elsewhere. Every other past is stationary. The source displacement is supported on $[s_a,s_b]=[-11\ell/8,-9\ell/8]$ and its first three derivatives vanish at both endpoints. These are prescribed complete pasts, with no requirement that they solve the equation before release.

The [release adjudication](finite-perturbation-release-independent-adjudication.md) supplies the exact old-history bounds: displacement at most $\varepsilon\ell$, speed at most $\nu=5/512$, acceleration at most $3/(8\ell)$ and jerk at most $27/(2\ell^2)$. The [original class](population-history-class.md) retains its environmental envelope $\ell/16$, target envelope $4\ell$, speed ceiling $4$, acceleration ceiling $256/\ell$, jerk ceiling $65536/\ell^2$, separation threshold $\ell/8$, and complete-past uniform position/velocity topology. No stronger broad history topology or physical summation assumption is adopted.

The [canonical master equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) assigns each admitted positive-delay root the acceleration $G\sigma_i\sigma_j\mathbf n/(r^2|D|)$, where $r=T-s$, $\mathbf n$ points from emission to reception, and $D=1-\mathbf n\cdot\dot{\mathbf X}_j(s)$. The receiver factor belongs to root playback and is not an additional acceleration multiplier. All positive roots are retained; the exact zero-delay diagonal is excluded without a numerical row.

Use dimensionless absolute reception time $t=T/\ell$, parameter $g=G/\ell$ and displacement $\mathbf y_i(t)=(\mathbf X_i(\ell t)-\mathbf z_i)/\ell$. This is a rescaling within the absolute-time layer, not an effective observer chart. Direct differentiation gives

$$
\dot{\mathbf X}_i=\mathbf y_i',\qquad
\ddot{\mathbf X}_i=\mathbf y_i''/\ell,\qquad
\mathbf X_i^{(3)}=\mathbf y_i'''/\ell^2.
$$

Thus multiplication of the physical acceleration equation by $\ell$ leaves precisely the coefficient $g$. No value of $G$ or $\ell$ has been substituted. The [accepted first response](smooth-two-particle-first-response-independent-adjudication.md) gives exact stationarity through $t_*=\sqrt2-11/8$, with zero first three time derivatives there. Its first receiving sets are $\mathcal S_j=\{i:\|i-j\|^2=2\}$ for $j\in E$. Each has 12 labels; their intersection is empty because equal squared distances require $2i_1-1=0$. Write $\mathcal S$ for their union.

Claim grade: derived for the rescaling and dependency use; measured for byte identity by `shasum -a 256` over the nine inputs listed in the review manifest. Falsifiers are a changed dependency digest, a different profile or amplitude, or a missing power of $\ell$ in the physical derivatives. Acceptance is conditional on this fixed mathematical input, not on its physical selection.

## 2. Independent reconstruction of cubic stationary cancellation

The stationary reference is summed in the original eight-source blocks $P_n=\{2n+\epsilon:\epsilon\in\{0,1\}^3\}$. Let $\mathbf K(\mathbf x)=\mathbf x/\|\mathbf x\|^3$. With the receiver's own stationary row omitted, its dimensionless acceleration is

$$
\mathbf S_i(\mathbf y)=
\sum_{j\ne i}^{\mathrm{blocks}}
\sigma_i\sigma_j\mathbf K(i+\mathbf y-j).
$$

The omitted row is finite and explicit; no singular self reference is evaluated. The accepted block finite-difference argument gives uniform convergence of this function and its first two receiver derivatives on $\|\mathbf y\|\leq b<1$.

It is useful to establish the Taylor cancellations before taking the limit. Translate a finite cube centered at $i$ to $m=j-i$, omit $m=0$, and sum $(-1)^{m_1+m_2+m_3}\mathbf K(\mathbf y-m)$. Call this finite function $\mathbf C_N(\mathbf y)$. Inversion pairs make it odd, hence $\mathbf C_N(0)=0$ and $D^2\mathbf C_N(0)=0$. Signed coordinate permutations preserve the cube and its signs, so $D\mathbf C_N(0)$ commutes with all coordinate reflections and permutations. It is therefore a scalar multiple of the identity. Each summand has divergence zero away from its source, since

$$
D\mathbf K(\mathbf x)=r^{-3}I-3r^{-5}\mathbf x\otimes\mathbf x,
\qquad \operatorname{tr}D\mathbf K=0,
\qquad r=\|\mathbf x\|.
$$

The scalar multiple must be zero. Every finite cube already has zero Taylor coefficients of degrees zero, one and two. This is a calculation about the verified stationary equilibrium and provides no stability verdict.

For a bound on the remaining derivative, direct component differentiation gives

$$
\begin{aligned}
\partial_b\partial_c\partial_d K_a
={}&-3r^{-5}(\delta_{ab}\delta_{cd}+\delta_{ac}\delta_{bd}+\delta_{ad}\delta_{bc})\\
&+15r^{-7}(\delta_{ab}x_cx_d+\delta_{ac}x_bx_d+\delta_{ad}x_bx_c
+\delta_{bc}x_ax_d+\delta_{bd}x_ax_c+\delta_{cd}x_ax_b)\\
&-105r^{-9}x_ax_bx_cx_d.
\end{aligned}
$$

Here $a,b,c,d$ are component indices and $\delta$ is the Kronecker delta. Contracting against three independent unit directions bounds the Euclidean vector norm by $(9+90+105)r^{-5}=204r^{-5}$. The lattice shell $\|m\|_\infty=n$ has $(2n+1)^3-(2n-1)^3=24n^2+2$ labels, and therefore

$$
\sum_{m\ne0}\|m\|^{-5}
\leq24\sum_{n\geq1}n^{-3}+2\sum_{n\geq1}n^{-5}
\leq24(1+1/2)+2(1+1/4)=77/2.
$$

The last bounds follow by integrating the decreasing tails. Since $\|m-\mathbf y\|\geq(1-b)\|m\|$, the third derivative of every finite cube is bounded by $7854/(1-b)^5$. Taylor's integral remainder then gives, uniformly in cube size,

$$
\|\mathbf C_N(\mathbf y)\|\leq C_b\|\mathbf y\|^3,
\qquad
\|D\mathbf C_N(\mathbf y)\|\leq3C_b\|\mathbf y\|^2,
\qquad C_b=\frac{1309}{(1-b)^5}.
$$

To identify the limit with the prescribed block sum, use the actual original pairs on each coordinate interval of the cube. There is one unpaired endpoint per coordinate. The leftover sources split into three faces, three edges and one corner. A signed face patch is a second finite difference of the kernel, an edge pair a first finite difference, and the corner a single row. After $k$ receiver derivatives their total bounds are respectively $O(N^2N^{-4-k})$, $O(NN^{-3-k})$ and $O(N^{-2-k})$. All differentiation segments stay on a distant boundary coordinate even for bounded $\mathbf y$. The discrepancy tends uniformly to zero for $k=0,1,2$.

Complete blocks in these cubes exhaust the original partition. Its absolute block convergence and the vanishing discrepancy prove that the cube limits and those derivatives equal $\mathbf S_i$. The translated finite cubes are independent of $i$, so their common limit is one function $\mathbf S$. Passing the displayed bounds to the limit proves the claimed cubic and derivative estimates. The absolute third-derivative majorant also justifies $C^3$ regularity. This argument uses equality of these specific exhaustions, not arbitrary regrouping of the conditionally convergent individual-source series.

Claim grade: derived; accepted. Falsifiers are a failure of the finite-cube symmetry or trace calculation, an incorrect tensor coefficient, or a boundary fragment that does not obey its finite-difference decay on the stated ball. No numerical lattice sum is used as evidence for these identities.

## 3. Uniform continuation through the pulse

Take $b=1/64$ and $H=5/16$ as proof bounds, leaving the input class unchanged. For distinct labels, at any receiver position $i+\mathbf y$ in this ball and $t\leq H$, the causal residual at source emission zero is at most $H-(1-b)<0$. It becomes positive in the distant past, and increases in positive delay at rate at least $1-\nu$. There is exactly one negative-emission root using only supplied history. A stationary extension used to define a function beyond the supplied history cannot change this root. Actual self-root exclusion is checked separately below.

Endpoint emission occurs at the source anchor. Moving the receiver by at most $b$ can shift each fixed-position endpoint reception by at most $b$. The elementary timing inequalities are

$$
-1/8+b<0,\qquad
H<\sqrt3-11/8-b,\qquad
\sqrt2-9/8+b<H.
$$

Thus the distance-one pulse has already passed before release, while distance-at-least-$\sqrt3$ pulses have not arrived by $H$, throughout the whole receiver ball. A label in $\mathcal S$ has precisely one potentially nonstationary source row, at distance $\sqrt2$. The other target contributes its stationary row. Outside $\mathcal S$, both target corrections vanish throughout this ball, with the receiver's own row omitted when the receiver is a target. Monotonicity in emission time supplies these conclusions without deleting any roots by a distance heuristic.

For $i\in\mathcal S$ and its unique first source $j$, write $\mathbf k=i-j$ and $u=(s-s_a)/\ell$. Exact substitution of the fixed profile gives

$$
p(u)=(-1+8u)u^4(1-4u)^4,
\quad 0\leq u\leq1/4,
\qquad p=0\text{ outside this interval}.
$$

Set $\mathbf R=\mathbf k+\mathbf y-p(u)\mathbf e$, $r=\|\mathbf R\|$, $\mathbf n=\mathbf R/r$ and $D=1-n_3p'(u)$. The root equation is $t+11/8-u=r$. Since these source and receiver signs agree, define the exact changed-source correction

$$
\mathbf Q_{\mathbf k}(t,\mathbf y)
=\frac{\mathbf K(\mathbf R)}{D}-\mathbf K(\mathbf k+\mathbf y).
$$

The receiver equation is $\mathbf y_i''=g[\mathbf S(\mathbf y_i)+\mathbf Q_{\mathbf k}(t,\mathbf y_i)]$, with zero displacement and velocity at $t_*$. It determines environmental motion. It is an ordinary differential equation on this interval because every contributing source emission lies in the fixed past; this reduction is not asserted after new emissions arrive.

Both the perturbed range and the segment to the reference row exceed one, since $\sqrt2-b-\varepsilon>1$. The spectral norm of $D\mathbf K$ is at most $2$ there. Subtracting the stationary row before estimating therefore yields

$$
\|\mathbf Q_{\mathbf k}\|
\leq\frac{2\varepsilon+\nu}{1-\nu},
\qquad
C_b b^3+\frac{2\varepsilon+\nu}{1-\nu}<\frac1{64},
\qquad 3C_bb^2<2,\quad C_b<2048.
$$

The middle comparisons involve rational numbers only. Integrating the resulting acceleration bound gives

$$
\|\mathbf y_i''\|\leq g/64,\qquad
\|\mathbf y_i'\|\leq g(t-t_*)/64,\qquad
\|\mathbf y_i\|\leq g(t-t_*)^2/128.
$$

For $g\leq16$ and $t\leq H$, these imply respectively $1/4$, $5/64$ and $25/2048<1/64$. A first exit from the displacement ball is impossible, because the integrated estimate puts that exit strictly inside the ball. The root denominator and ranges retain margins on a slightly larger ball. The stationary sum is $C^3$, and the compact source profile is $C^3$ across its endpoints, so the implicit root and the acceleration function are at least $C^2$. Bounded position and velocity on this compact time interval exclude an ordinary differential equation continuation failure. All 24 receiver equations therefore reach $H$.

Every other label has the constant solution: its corrections vanish and $\mathbf S(0)=0$. The acceleration functions have a label-uniform receiver Lipschitz bound, because the same stationary function occurs at every anchor, only two target corrections can occur, and their ranges and denominators have uniform positive lower bounds. Integral uniqueness therefore applies in the uniform position/velocity norm among classical continuations in the declared bounded domain. The complete-history verification below identifies the constructed solution with the full equation.

This uniformity does not rely on taking the minimum of infinitely many unspecified lifespans. There are only 24 nonconstant receiver equations, and all remaining labels share the constant solution and common local bounds. Continuous dependence for this fixed-source family can likewise be bounded uniformly over labels and $0\leq g\leq16$: if $A_0=1/64$ bounds the acceleration function before multiplication by $g$, and $L_0$ bounds its position derivative on the ball, the sum of displacement and velocity differences obeys the usual integral bound with coefficient $1+16L_0$ and parameter term $HA_0|g-\widetilde g|$. Its exponential bound is finite on $[0,H]$. This conditional comparison applies while the compared receiver solutions stay in the ball; it does not establish continuity for arbitrary independently perturbed complete population histories.

Claim grade: derived; accepted. Falsifiers are an additional target correction within the stated ball and time interval, failure of the rational acceleration comparison, or an actual first exit inconsistent with the integrated bound. No numerical trajectory or source-authored receipt is needed for this continuation proof.

## 4. Jerk, moving endpoints, and the exact support census

Differentiating the actual moving-receiver root retains both receiver motion and the source acceleration at the shifted emission. With $\mathbf v=\mathbf y_i'$, $\mathbf W=p'(u)\mathbf e$, $\mathbf A=p''(u)\mathbf e$ and $P=I-\mathbf n\otimes\mathbf n$,

$$
u'=\frac{1-\mathbf n\cdot\mathbf v}{D},\qquad
\mathbf R'=\mathbf v-\mathbf W u',\qquad
\mathbf n'=P\mathbf R'/r,\qquad
D'=-\mathbf W\cdot\mathbf n'-\mathbf n\cdot\mathbf A\,u'.
$$

Using the deliberately looser $\|\mathbf v\|\leq1/4$, the old bounds $\|\mathbf W\|\leq5/512$, $\|\mathbf A\|\leq3/8$ and $r>1$ gives $|u'|<4/3$, $\|\mathbf R'\|<17/64$, $|D'|<33/64$ and $D>63/64$. The derivative of the subtracted stationary row must also be retained. These bounds give

$$
\left\|\frac{d\mathbf Q_{\mathbf k}}{dt}\right\|
<\frac{34}{63}+\frac{2112}{3969}+\frac12<2.
$$

The stationary derivative contributes at most $\|D\mathbf S\|\|\mathbf v\|<1/2$. Hence $\|\mathbf y_i'''\|<3g\leq48$. The vanishing endpoint jets of $p$ make acceleration and its first time derivative continuous across pulse entry and exit. The accepted zero acceleration and jerk at $t_*$ give the required $C^3$ join to the stationary future segment, and that segment already joins the prescribed past at release. No event-specific boundary rule has been introduced.

The support endpoint is a causal event at the actual receiver position. Put $\beta=\sqrt2-9/8$ and

$$
F_i(t)=t+9/8-\|\mathbf k+\mathbf y_i(t)\|.
$$

The triangle inequality gives $|F_i(t)-(t-\beta)|\leq b$, while differentiation gives $F_i'\geq1-5/64=59/64$. Its unique zero therefore satisfies

$$
t_i^{\mathrm{end}}+9/8=\|\mathbf k+\mathbf y_i(t_i^{\mathrm{end}})\|,
\qquad
\beta-b\leq t_i^{\mathrm{end}}\leq\beta+b<H.
$$

The bracket lies inside the established interval; no future solution beyond $H$ is used to find the endpoint. The same positive receiver residual derivative holds for each fixed emission, and $u'>0$ along the active root. Reception starts at $t_*$, passes through the emitted support in order, and exits once. The fixed-anchor time $\beta$ is the center of an enclosure and is not assigned as an actual endpoint. After exit a receiver may retain velocity and stationary-background acceleration.

All labels outside $\mathcal S$ remain stationary by the equation and uniqueness. Every label in $\mathcal S$ has a nonconstant history by its accepted initial response: 16 labels first move at order $(t-t_*)^5$ and the other eight at order $(t-t_*)^6$, with nonzero coefficients for $g>0$. These initial intervals are contained in the extended solution by uniqueness. The exact support count thus means 24 nonconstant future histories; it does not mean nonzero velocity or acceleration at every later instant.

Claim grade: derived; accepted. Falsifiers are a missing source-acceleration or stationary-subtraction term in jerk differentiation, a second zero of the endpoint residual despite its positive derivative, or an additional nonconstant label satisfying the same zero-data receiver equation. No claim that pulse completion stops the receivers is accepted.

## 5. Complete roots and preservation of the original class

Join the constructed future to the entire unchanged past. The complete displacement is below $b\ell$, and complete speed is at most $5/64$, for every label through $H\ell$. At any distinct-label reception and earlier emission,

$$
r_{ij}(T,s)\geq\ell\|i-j\|-2b\ell\geq31\ell/32.
$$

Write the positive delay as $\Delta=T-s$ and the complete residual as $f_{ij,T}(\Delta)=\Delta-\|\mathbf X_i(T)-\mathbf X_j(T-\Delta)\|$. In a cross channel this is differentiable with $f'_{ij,T}=D\geq59/64$. It starts negative at zero and tends to positive values because the complete displacement is bounded. Therefore there is precisely one root on the entire positive-delay domain. This is an all-earlier-time proof, not a finite root search.

The root delay is at least $31\ell/32$, so its original half-width $w=\ell/256$ tube lies strictly at positive delay. The same range and transmitter bounds hold throughout the tube, exceeding the original floors $w$ and $\delta=1/4$. Monotonicity gives $|f|\geq59w/64>\gamma=w/4$ outside it. The original complete root window and multiplicity bound are retained because the stronger displacement estimate implies the original one and there is only one cross root.

For each self channel the complete speed bound gives

$$
f_{ii,T}(\Delta)
\geq(1-5/64)\Delta=59\Delta/64>0.
$$

There are no positive self roots. The normalized gap on $0<\Delta\leq2w$ exceeds $\eta=1/4$; on $\Delta\geq2w$ the ordinary gap exceeds $\gamma$. The exact diagonal is never evaluated. Thus every original root constant survives with slack at every cut through the common horizon.

At each actual cross root,

$$
s=T-r\leq\ell(5/16-31/32)=-21\ell/32<0.
$$

This completes the identification with the full equation: no newly generated environmental or target emission arrives anywhere in the population during the proved interval. Environmental histories have been solved, but their future portions cannot yet contribute received rows. The fixed stationary block reference and finite old-source corrections therefore give the full prescribed sum.

The old and future derivative bounds combine to

$$
\begin{gathered}
\sup\|\mathbf X_i-\mathbf z_i\|<\ell/64,\qquad
\sup\|\dot{\mathbf X}_i\|\leq5/64,\\
\sup\|\ddot{\mathbf X}_i\|\leq\max(3/8,g/64)/\ell,\qquad
\sup\|\mathbf X_i^{(3)}\|\leq\max(27/2,3g)/\ell^2.
\end{gathered}
$$

For $g\leq16$ these are strictly below all original ceilings. Equal-time separation is at least $31\ell/32$, greater than the class threshold. Its shell-density estimates follow from the unchanged anchor cube-volume proof, since all displacements obey the original envelopes. Global $C^3$ regularity was checked at the joins. This proves class membership of the complete history at every cut through $5\ell/16$ for this input; it does not make the original class invariant for arbitrary histories.

Claim grade: derived; accepted. A second cross root, a positive self root, or a received nonnegative emission under these complete-history inequalities would falsify the root or reduction claim. A history exceeding an original ceiling despite the displayed stronger bound would falsify class preservation. Root admissibility, summation and class membership have each been checked separately.

## 6. Independent large-coupling obstruction and the endpoint correction

The negative result must use the equation, not the failure of a sufficient continuation bound. Let $J=2^{16}$ be the unchanged dimensionless jerk ceiling and $\theta=t-t_*$. Suppose a globally $C^3$ solution remains in the original class through $\theta_0=2^{-16}$. The accepted stationary segment and its zero onset derivatives, followed by integration of $\|\mathbf y_i'''\|\leq J$, imply for every label

$$
\|\mathbf y_i''\|\leq J\theta,\qquad
\|\mathbf y_i'\|\leq J\theta^2/2,\qquad
\|\mathbf y_i\|\leq J\theta^3/6\leq\theta^2/6
\quad(0\leq\theta\leq\theta_0).
$$

These estimates are independent of $g$. Their maximum new displacement is $\theta_0^2/6<\varepsilon$ and maximum new speed is $\theta_0/2<\nu$. Hence complete speed is at most $\nu$ and complete displacement at most $\varepsilon\ell$ on this hypothesized interval. The same all-delay monotonicity and self-chord argument gives one root per cross channel and no self root. Since $t_*+\theta_0<1-2\varepsilon$, every received emission is still negative. This argument does not assume a 24-label future support or presuppose that any future source stays stationary.

Choose the receiver $\mathbf k=(1,0,1)$ relative to target zero. Its other target is at distance one, whose old pulse has passed throughout this much smaller receiver ball. Set $\mathbf n_0=\mathbf k/\sqrt2$, $\mathbf a=-2\mathbf n_0(n_0)_3$ and $\mathbf e_a=\mathbf a/\sqrt2$. Then $\|\mathbf a\|=\sqrt2$ and $\mathbf e_a$ is a unit vector. The exact anchor estimate from the accepted first-response derivation is

$$
\|\mathbf Q_{\mathbf k}(t_*+\theta,0)-\mathbf a\theta^3\|
\leq128\theta^4,
\qquad 0\leq\theta\leq1/128.
$$

This is a uniform inequality for the fixed profile, not a coupling-dependent asymptotic remainder. Its derivation uses the exact polynomial expansion $p=-u^4+24u^5-224u^6+1024u^7-2304u^8+2048u^9$, the implicit root, and kernel subtraction. The present review rechecked the inherited coefficient bounds and its declared interval; no source arithmetic output substitutes for that inequality.

Receiver displacement must be controlled more carefully than by a constant Lipschitz bound. For $0<\theta\leq\theta_0$, consider the segment from zero to any $\mathbf y$ satisfying $\|\mathbf y\|\leq J\theta^3/6$. At emission parameter $u=0$ the residual $\sqrt2+\theta-u-\|\mathbf k+\mathbf y-p(u)\mathbf e\|$ is positive. Its decrease with $u$ is at least $1-\nu$, so its root satisfies

$$
0<u\leq\frac{\theta+\|\mathbf y\|}{1-\nu}<2\theta.
$$

On this entire emission interval, exact factorization of the polynomial gives $|p|\leq u^4$, $|p'|\leq4u^3$ and $|p''|\leq14u^2$. The range exceeds one and $D\geq1/2$. Differentiating the implicit equation at fixed reception gives

$$
D_{\mathbf y}u=-\mathbf n/D,\qquad
D_{\mathbf y}\mathbf R=I-\mathbf W\otimes D_{\mathbf y}u,
\qquad
\|D_{\mathbf y}D\|\leq2(|p'|+|p''|).
$$

The source acceleration $p''$ enters because receiver variation shifts the sampled source velocity. The operator bounds $\|D_{\mathbf y}u\|\leq2$ and $\|D_{\mathbf y}\mathbf R\|\leq2$ follow on this small domain. To retain the vanishing correction, differentiate and then subtract the stationary derivative:

$$
\begin{aligned}
D_{\mathbf y}\mathbf Q
={}&[D\mathbf K(\mathbf R)-D\mathbf K(\mathbf k+\mathbf y)]\\
&+D\mathbf K(\mathbf R)(D_{\mathbf y}\mathbf R/D-I)
-\mathbf K(\mathbf R)\otimes D_{\mathbf y}D/D^2.
\end{aligned}
$$

The three terms are bounded by $24|p|$, $12|p'|$ and $8(|p'|+|p''|)$. The first uses $\|D^2\mathbf K\|\leq24$ on the range-one segment. For the second, $|D^{-1}-1|\leq2|p'|$ and $\|D_{\mathbf y}u\|/D\leq4$ give $\|D_{\mathbf y}\mathbf R/D-I\|\leq6|p'|$, followed by $\|D\mathbf K\|\leq2$. The third uses $\|\mathbf K\|\leq1$ and $D^{-2}\leq4$. Consequently

$$
\|D_{\mathbf y}\mathbf Q\|
\leq448\theta^2+640\theta^3+384\theta^4
<512\theta^2.
$$

This is the required uniform feedback estimate. Combining it with the anchor remainder and cubic stationary bound gives

$$
\begin{aligned}
\|\mathbf S(\mathbf y_i)+\mathbf Q(t_*+\theta,\mathbf y_i)-\mathbf a\theta^3\|
&\leq128\theta^4+512\theta^2\|\mathbf y_i\|+2048\|\mathbf y_i\|^3\\
&\leq\frac{640}{3}\theta^4+\frac{256}{27}\theta^6
<\frac14\theta^3.
\end{aligned}
$$

The last strict inequality holds throughout $0<\theta\leq2^{-16}$. Projection of the exact acceleration equation therefore yields

$$
\mathbf e_a\cdot\mathbf y_i''
>g(\sqrt2-1/4)\theta^3>g\theta^3.
$$

At $\theta_0$ the integrated jerk bound allows $\|\mathbf y_i''\|\leq J\theta_0=1$. If $g\geq2^{48}$, the projected acceleration is strictly greater than $g2^{-48}\geq1$. This is a contradiction, including equality at $g=2^{48}$. The manuscript's strict lower bound is why its unresolved row must exclude that endpoint. Keeping more of the coefficient could sharpen a sufficient obstruction threshold, but no optimal threshold or full intermediate classification is claimed here.

The contradictory time precedes pulse exit. At $t=t_*+\theta_0$ the end-emission residual satisfies

$$
t+9/8-\|\mathbf k+\mathbf y_i(t)\|
\leq-1/4+\theta_0+\theta_0^2/6<0.
$$

It is strictly increasing on the hypothesized short interval, since receiver speed stays below one. Exit cannot have occurred earlier and been followed by reentry. A continuation through this first pulse would necessarily include this impossible interior time.

Claim grade: derived; the stated $g>2^{48}$ obstruction is accepted, and the unresolved classification of $g=2^{48}$ is rejected. Falsifiers are an incorrect anchor remainder on its declared domain, failure of the subtracted position derivative estimate, or failure of integration of the fixed jerk ceiling from the accepted zero onset jets. This proof identifies incompatibility with the original class, not the first ceiling encountered, a root singularity, contact, or nonexistence of a regular solution in a larger class. Positive local class-preserving response for each finite $g$ remains consistent: its duration can shrink as $g$ grows.

## 7. Exact remaining mathematical frontier

The submitted sufficient theorem for $0<g\leq16$ is ready for integration at its conditional grade. Its parameter table needs the endpoint correction just proved. No complete classification of $16<g<2^{48}$ follows, and failure of the small-coupling estimate is not evidence of dynamical failure there. None of these parameter restrictions selects a physically preferred coupling or changes the original input.

For the accepted small-coupling regime, the immediate continuation question still concerns prescribed old emissions. The next anchor shell begins receiving at $t=\sqrt3-11/8$, beyond the current horizon, whereas any new postrelease emission requires $t\geq1-2d$ if a complete displacement bound $d\ell$ is maintained. A useful next theorem would extend the same fixed control through the next old-pulse shell while proving its moving-receiver timing, an expanded finite receiving set, and uniform class bounds. The first substantive estimate is a bound on the total finite old-source corrections at those receivers, combined with the cubic stationary term and a closed displacement estimate. The current first-pulse estimate alone does not provide that theorem.

If and when a nonnegative emission actually arrives, the present receiver-only reduction ends. The [complete-history derivative](population-history-derivative.md) then requires both source and receiver variations, including

$$
\delta s=-\frac{\mathbf n\cdot[\mathbf h_i(T)-\mathbf h_j(s)]}{D},
\qquad
\delta\mathbf V_j^{\mathrm{effective}}
=\dot{\mathbf h}_j(s)+\ddot{\mathbf X}_j(s)\delta s.
$$

Here $\mathbf h$ is a displacement variation of the complete histories. A later coupled theorem must control this shifted source evaluation, its complete root domain and its common lifespan. Finite source counting alone cannot supply those bounds. No target-contact law, regulator conclusion, global existence, genericity, arbitrary-history continuity, or physical choice of summation is accepted from the present pulse analysis.

## 8. Read coverage, preservation, and validation

The reviewed subject was read in full. Scientific dependencies are the original population class and complete-history derivative, stationary admissibility adjudication, finite-release theorem and adjudication, first-response theorem and adjudication, and canonical master equation. Their exact paths and SHA-256 digests are recorded in `.tmp/smooth-two-particle-pulse-review/inputs.txt` and `input-digests.sha256`, with frozen copies under `frozen/`. The eight inherited dependency digests match the versions used by the source author and reviewed earlier in this task, by direct comparison with the source's input manifest and this review's `shasum` output. The live class constraints, cube/block proof, explicit first-response remainder and canonical acceleration row were refreshed for this adjudication.

The live review skill, maintained owner, theorem-review procedure, specialist charter and hereditary-dynamics role were read. The working record in `.tmp/smooth-two-particle-pulse-review/progress.md` records read coverage, completed reconstruction and the next verification step. The source manuscript, earlier reports, input histories and trackers remain outside this review's write scope.

The mathematical evidence is the finite-cube Taylor calculation, absolute derivative majorant, exact row subtraction, continuation estimate, moving endpoint residual, complete-history root inequalities and uniform jerk contradiction. These establish the conditional results independently of arithmetic or syntax agreement.

Before target use, `node .tmp/smooth-two-particle-pulse-review/check.mjs known` passed two known formulas and one file link, a fenced-dollar exclusion, invalid-macro and whitespace rejections, exact-rational arithmetic and comparison controls, six known unit lattice neighbors and a known polynomial product. That pass was recorded in `known-check.txt` and the progress record before target validation.

Measured validation: `node .tmp/smooth-two-particle-pulse-review/check.mjs target` passed 257 KaTeX expressions and six relative file targets in this adjudication, exact rational comparisons for the continuation and contradiction constants, square comparisons for shell timing, the exact endpoint polynomial and the 24-label enumeration with its 16/eight split. The receipt is `validation.txt`. This checks syntax, file-target existence, finite arithmetic and enumeration; it does not inspect link anchors or browser layout, and does not establish the analytical theorems.

Measured preservation: `shasum -a 256 -c .tmp/smooth-two-particle-pulse-review/input-digests.sha256` passed all nine scientific inputs, recorded in `input-verification.txt`; `cmp` over each listed input and its frozen basename also returned success. `node scripts/validate-content.mjs --check --strict` completed with zero errors, zero warnings and 30 notes, recorded in `content-validation.txt`. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/smooth-two-particle-pulse-independent-adjudication.md` emitted no whitespace diagnostics and returned 1 for the new-file difference. A failed rerun within these command scopes falsifies the corresponding measured statement.

The required correction is recorded here without changing the frozen subject: remove the upper endpoint from its unresolved parameter row, since the proof excludes equality too. The coordinator owns that integration and the next mathematical assignment. This bounded review is complete; its result does not authorize a broader domain, later lifespan or physical interpretation.
