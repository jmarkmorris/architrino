# Later fate of the original logarithmic perturbation: two-hour investigation

**New bounded result, pending independent adjudication:** the original mirror-planar perturbation family has exactly one growing conjugate spectral pair, a simple axial-rotation zero and an actually attained local circle of limiting exit histories. Two independently authored frozen differential formulations, evaluated with distinct interval arithmetic but the same new contour method, both give a count of three in $\operatorname{Re}k>-0.01$; every other exponent lies strictly to its left. The derived nonlinear consequence removes the faster-mode ambiguity and proves that varying the original positive amplitude realizes every leading exit phase. Actual finite unit arrival and an actual all-future member remain unresolved; the missing step is nonlinear complete-history transport from this now identified circle.

## Research boundary and working record

This investigation began at 2026-10-06 21:55 UTC (17:55 EDT), with a planned end at 23:55 UTC and final verification beginning by 23:35 UTC. Its question is the later fate of a nonzero member of the original admitted logarithmic perturbation family. The selected law is the registered inverse-distance response with exponent and coefficient one, $K=R_*=c_f=1$, opposite polarities and the original mirror-planar complete histories. The remote held tail, polynomial completion, compactly supported modal variation, compatibility correction, causal roots and self treatment are unchanged. No numerical amplitude, alternative phase, new realization or equality continuation is selected.

The [source admission](authorized-cases-ten-hour-cd-source-admission.md), [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md), [original compatible-history adjudication](alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-adjudication.md), and [nonlinear departure](alternatives-screen-2026-10-05-logarithmic-spiral-nonlinear-departure.md) bind the case. The final [signed-gain assessment](authorized-cases-followup-reference-c-signed-gain-assessment.md) and [actual-exit assessment](authorized-cases-followup-reference-c-exit-assessment.md) govern the accepted follow-up status. Their local speed-budget shortfall is an input, not a new result of this investigation.

The initial attack is complete spectral coverage in the invariant mirror-planar sector that contains this family. The accepted [characteristic determinant](alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-growth.md) has an independently certified simple growing conjugate pair. Additional faster roots have not been excluded. A positive-half-plane count can close that particular ambiguity without presuming that a favorable exit reaches the unit-speed boundary. The full nonlinear later-fate question remains open until an actual-history transport or trapping proof is supplied.

## Pretarget analytical and instrument controls

The new [contour instrument](logarithmic-actual-fate-two-hour-spectrum.py) imports the unchanged rational interval arithmetic of the admitted original certificate. It introduces scaled complex exponentiation and an argument-principle contour enclosure; it does not change either frozen characteristic derivation or the independent Cartesian reference. The contour method encloses the determinant image of each entire boundary segment in a convex complex rectangle excluding zero. Rational representatives of adjacent endpoint images define a polygon. Straight homotopies inside the retained rectangles identify its winding with the actual determinant's winding. An exact rational ray-crossing count then counts interior zeros with multiplicity. This avoids inferring completeness from sampled roots.

Known controls preceded target use. The shared venv command `"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/analysis/logarithmic-actual-fate-two-hour-spectrum.py --out .local-data/master-equation-closure/binary-research/logarithmic-actual-fate/spectrum-known.json` returned exit zero and `passed: true`. Its analytical polynomials gave winding two for $z^2-1$ and $z^2$, zero for the outside root $z+3$, and minus two on a reversed contour; a boundary root was rejected. Scaled exponentials at $4$ and $4i$ and the frozen arithmetic/derivative/symmetry controls passed before any new characteristic contour was run. This is instrument validation against known cases, not an independent scientific review of the new target.

All target calculations were finite resource-bounded analytical certificates, not integrations of a manufactured physical member. The new sources fix a 600-second cooperative limit, 650-second CPU limit, 24,000 evaluation limit and 2 MiB receipt limit per run. Retained local evidence belongs under `.local-data/master-equation-closure/binary-research/logarithmic-actual-fate/`; it is reproducible from the tracked sources and is not a portable tracked prerequisite.

## 1. A complete dominant spectral pair in the original sector

**Computer-assisted derived result, self-reviewed and pending independent adjudication.** In the original invariant mirror-planar sector, the only characteristic exponents with real part at least $1/100$ are the already admitted simple conjugate pair $k_*=\alpha+i\beta$ and $\overline{k_*}$. Their accepted enclosure is

$$
0.0138698363660541\le\alpha\le0.0138898363660541,
\qquad
3.2269327188404713\le\beta\le3.2269527188404713.
\tag{1}
$$

Thus every other exponent in this sector has real part strictly below $0.01$. This is a census of the complete relevant half-plane, not a claim about the common or out-of-plane sectors. The original family is exactly mirror-planar, so those other sectors cannot be nonlinearly excited by its evolution.

For completeness, use the admitted chord-basis characteristic matrix

$$
M(k)=k^2I+k(I+2\Omega)+\Omega+\Omega^2
-K(I+\lambda^{k+1}P)
-\frac{\lambda^{k+2}}d E P[(k+1)I+\Omega],
\tag{2}
$$

where $\Omega=\omega J$, $J(x,y)=(-y,x)$, $P$ is rotation through $-\delta$, $E=\operatorname{diag}(1,0)$, $\lambda=e^{-\delta/\omega}$ and $d=1-\lambda$. The real symmetric matrix $K$ is defined by

$$
m=\frac{\lambda\cos\delta}{\omega d},\qquad
K_{11}=\frac{\lambda^2}{d^2}+\frac{\lambda^2\omega m}{d}
-\frac{\lambda^3m^2}{d^2},\quad
K_{12}=K_{21}=\frac{\lambda^2m}{d^2},\quad
K_{22}=-\frac\lambda{d^2}.
\tag{3}
$$

Equations (2)–(3) retain the full moving-clock and source-velocity differential. Their independent Cartesian derivation was accepted in the original perturbation adjudication; the new computation is the half-plane census, not a re-adjudication of that derivation. The full original rational parameter rectangle, rather than its midpoint, is propagated through the calculation.

### 1.1 Analytical exclusion outside a bounded disk

The rational parameter enclosures give $2.29<\omega<2.30$, $0.60<\lambda<0.62$, $d>0.38$, $|m|<0.72$, and $\|K\|_2\le\|K\|_\infty<8$. Symmetry of real $K$ justifies the displayed comparison with its row-sum norm. For $\operatorname{Re}k\ge0.01$ and $s=|k|$,

$$
\begin{aligned}
\|M(k)-k^2I\|_2
&\le (1+2\omega)s+(\omega+\omega^2)
+8(1+\lambda)+\frac{\lambda^2}{d}(s+1+\omega)\\
&<6.62s+23.926.
\end{aligned}
\tag{4}
$$

Here $\|P\|_2=\|E\|_2=1$ and $|\lambda^{k+j}|\le\lambda^j$ in this half-plane. At $s=10$, $s^2-(6.62s+23.926)=9.874>0$, and this difference increases for $s\ge10$. Therefore $M(k)$ is invertible for $|k|\ge10$ in the half-plane: factor out $k^2$ and use the norm-convergent geometric inverse of $I+k^{-2}(M-k^2I)$. This is an analytical tail exclusion, not a truncated search assumption.

### 1.2 Whole-contour count

The new instrument encloses $\det M(k)$ on the positively oriented rectangle with vertices $0.01-10i$, $10-10i$, $10+10i$ and $0.01+10i$. Each accepted edge image is a rational complex rectangle that excludes zero. Adaptive subdivision covers every point of the original four edges, retaining the endpoints and image enclosure for every accepted segment. The scalar determinant is entire in $k$ at each fixed parameter pair, so the argument principle applies without poles. Its winding is uniform over the full parameter rectangle because the enclosures are uniform there.

Measured by `logarithmic-actual-fate-two-hour-spectrum.py` and retained in the fresh local `spectrum-target.json`, the count is exactly two, using 164 accepted whole-edge enclosures and 814 recorded evaluation/checkpoint calls. The owned run completed in 8.469 seconds of supervisor wall time, with exit zero and `processGroupClosed: true`, under lease `1064b506-84f0-4099-a138-a7c45b58ed5e`. The two known simple roots in (1) lie inside that contour. Together with (4), this leaves no room for another exponent with real part at least $0.01$.

The source-count command was:

```bash
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID/logarithmic_actual_fate" --deadline-seconds 700 --heartbeat-seconds 15 -- "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/analysis/logarithmic-actual-fate-two-hour-spectrum.py --target --known .local-data/master-equation-closure/binary-research/logarithmic-actual-fate/spectrum-known.json --out .local-data/master-equation-closure/binary-research/logarithmic-actual-fate/spectrum-target.json
```

The first supervisor attempt was refused before target spawn because the sandbox blocked its loopback control socket. The authorized retry used the same command and finite limits outside that restriction. No failed target result was replaced. Receipt filenames are exclusive-create outputs; reproduction should use fresh names.

### 1.3 Complete instability coverage, including the symmetry boundary

A subsequent [frozen-instrument extension](logarithmic-actual-fate-two-hour-full-spectrum.py) moved the left contour edge to $-0.01$, leaving the right and imaginary edges at $10$ and $\pm10$. Its known polynomial control preceded target use, as recorded below. The analytical tail exclusion extends to this wider half-plane. Indeed $\lambda>0.60$ gives $|\lambda^k|<1.007$ there: $\log(5/3)<0.6$ follows already from $e^{0.6}>1+0.6+0.6^2/2>5/3$, and $e^{0.006}\le1/(1-0.006)<1.007$. Thus $|\lambda^{k+1}|<0.625$ and $|\lambda^{k+2}|/d<1.02$. Replacing (4) by $\|M-k^2I\|<6.62|k|+23.966$ retains an invertibility margin $9.834$ at radius ten.

Measured by the extension on the same full parameter rectangle, the reduced determinant has winding three with 126 whole-edge enclosures; the independently authored Cartesian differential and its distinct arithmetic have winding three with 168 enclosures. At the actual exact balance, the two roots (1) and the exact axial-rotation root $k=0$ account for all three multiplicities. Therefore $k=0$ is simple and every remaining mirror-planar exponent satisfies $\operatorname{Re}k<-0.01$. In particular there is no slower additional growing mode or other imaginary-axis mode in this sector. The exact time-origin exponent $-1$ is consistent with this statement.

The stronger count is not needed to replace any step of the dominance argument below, which deliberately keeps the original conservative complement bound (6). It strengthens the reported spectral classification. The extended run's supervisor lease `43b59095-82a3-45f1-b8d2-9dfa25f8e79e` records normal exit, 19.903 seconds of wall time and `processGroupClosed: true`; its heartbeat advanced during execution.

## 2. What the spectral gap changes for the actual family

**Derived local bridge, conditional on the new spectral certificate and pending independent adjudication.** Fix the original realization of the admitted complete compatible family. For a sufficiently small earlier local checkpoint of that same family, the leading-mode amplitude grows monotonically through a fixed radius, and its phase visits every angle as the positive preparation amplitude tends to zero. No different initial modal phase is selected. Every point of a circle on the local two-dimensional strong unstable manifold is a limit of these actually attained checkpoint histories.

The term strong unstable manifold here means the local set of complete backward similarity-time trajectories approaching the exact spiral faster than $e^{0.012\tau}$ as $\tau\to-\infty$. It is a mathematical set of limiting generated histories, not an alternative complete physical preparation. Its precise construction is given below. The result identifies an attained local circle; it does not prove any point of the circle enters the later unit-event region or stays in an all-future invariant region.

### 2.1 Phase space, clocks and spectral separation

Keep the original similarity time $\tau=\log(1+T)$, rotating coordinates and state $Z=(U,U')$. On the invariant mirror-planar sector there are four real state components. Use the same regular compatible $C^1([-H,0])$ solution-manifold chart as the admitted nonlinear departure theorem, with $H>h_*=-\log\lambda$ and a fixed generated entry time $\tau_e>H$. Let $\phi_*$ be its equilibrium and $\xi=Z-\phi_*$. The linear equation at this equilibrium has the form

$$
\xi'(\tau)=A_0\xi(\tau)+A_1\xi(\tau-h_*),
\tag{5}
$$

where $A_0,A_1$ are the four-dimensional real matrices supplied by the accepted Cartesian differential. The physical source velocity is a state component. Source acceleration appears only as a fixed coefficient in the clock differential, so (5) has no derivative of the delayed state as an input. This is the same functional equation used in the original compact time-map proof.

Choose a time step $a>H$. Its derivative time map is compact in the accepted $C^1$ tangent space. The spectral census gives a real two-dimensional leading subspace $E_u$ and an invariant complement $E_s$. In a complex coordinate $u$ on $E_u$, the leading map is multiplication by $e^{k_*a}$; on the complement an equivalent norm gives

$$
\|A_s\|\le b=e^{0.011a}<\gamma=e^{0.012a}<m=e^{\alpha a}.
\tag{6}
$$

This uses no unscreened spectral sector. To see why a characteristic census suffices, every nonzero spectral subspace of the compact time map is finite dimensional and invariant under the commuting continuous linear time maps. On it the continuous semigroup is a matrix exponential. An eigenvector of its generator gives an exponential solution of (5), hence a characteristic exponent, with time-map modulus $e^{a\operatorname{Re}k}$. Conversely each characteristic mode supplies that multiplier. Simplicity of the admitted pair excludes a generalized vector in its generator eigenspaces. Therefore no extra time-map multiplier above $e^{0.01a}$ is omitted by (1).

Choose a local manifold chart whose leading coordinate is the actual linear eigenfunctional applied to $\xi_\tau$; this is possible by the inverse-function theorem because its differential is the leading spectral projection. Write the complementary chart coordinate as $s$. The time-$a$ map then has

$$
P(u,s)=(A_u u,A_s s)+R(u,s),\qquad
R(0)=0,\quad DR(0)=0.
\tag{7}
$$

The original solution-manifold regularity gives (7) in $C^1$. Thus both $\|R(z)\|\le\varepsilon\|z\|$ and a local Lipschitz bound $\varepsilon$ for $R$ hold on a sufficiently small convex chart ball. No quadratic remainder or unproved extra smoothness is required.

### 2.2 An arbitrarily thin cone for the unchanged family

For any desired $\delta_c>0$, choose the chart and $\varepsilon$ so that

$$
b\delta_c+\varepsilon\max(1,\delta_c)
<\delta_c\big[m-\varepsilon\max(1,\delta_c)\big].
\tag{8}
$$

The cone $\|s\|\le\delta_c|u|$ is then invariant at sample times: the lower bound on $|u_+|$ is the bracketed factor times $|u|$, while the upper bound on $\|s_+\|$ is the left side times $|u|$. The original fixed-realization entry family has

$$
u_\eta=\eta c+o(\eta),\qquad s_\eta=o(\eta),\qquad c\ne0,
\quad\eta>0,
\tag{9}
$$

so every sufficiently small positive member starts in this cone. This is where the full spectral census matters: the complement now has a strictly smaller growth bound than this particular modal pair, rather than containing an unexcluded faster direction.

Between samples, uniform differentiability of the fixed finite-time maps and invariance of the linear splitting give

$$
|u(t)|\ge(e^{\alpha t}-\varepsilon_a)|u_n|,
\qquad
\|s(t)\|\le(B_a\delta_c+\varepsilon_a)|u_n|,
\quad0\le t\le a,
\tag{10}
$$

after shrinking the chart; $B_a$ is a finite complementary linear-flow bound and $\varepsilon_a$ can be made arbitrarily small. The factors from $\max(1,\delta_c)$ can be absorbed into $\varepsilon_a$. Uniformity follows on the compact time interval from the same integral-equation and derivative estimates used for the original between-sample bound. More explicitly, subtract the linear variational solution with tangent input $z$ from the nonlinear solution with compatible input $\Psi(z)$. Their initial difference is $\Psi(z)-\phi_*-z=o(\|z\|)$ in $C^1$, and their subsequent error solves $e'=Le_t+g(\xi_t)$, with $|g(\xi_t)|\le\varepsilon C_a\|z\|$. Both inputs have their respective endpoint compatibility, so the error has no derivative seam. Gronwall bounds its values uniformly over $[0,a]$, and this equation bounds its derivative by the same small multiple of the initial norm. Composing with the $C^1$ chart and its inverse preserves the uniform remainder in (10). In particular $|u|$ never vanishes, the whole history norm is bounded by a constant times $|u|$, and the continuous-time cone can be made arbitrarily thin. Complete source coverage, strict speed and ordinary-root margins remain those of the smaller original chart.

### 2.3 The exact leading-coordinate differential

Let $\Delta(k)=kI-A_0-A_1e^{-kh_*}$, and choose right and left vectors $v,p$ for its simple zero $k_*$, normalized by $p\Delta'(k_*)v=1$. Products with $p$ are complex bilinear. The leading coordinate of a real history is

$$
u(\tau)=p\xi(\tau)
+pA_1\int_{-h_*}^0e^{-k_*(s+h_*)}\xi(\tau+s)\,ds.
\tag{11}
$$

On a generated actual history write the nonlinear equation as (5) plus $g(\xi_\tau)$, where $g(0)=Dg(0)=0$ in the original history norm. Differentiating (11), integrating the integral once by parts and using $p(A_0+A_1e^{-k_*h_*})=k_*p$ gives

$$
u'=k_*u+p\,g(\xi_\tau).
\tag{12}
$$

As a known analytical control, on $\xi=e^{k_*\tau}v$ the integral is $h_*e^{-k_*h_*}v$, so (11) equals $e^{k_*\tau}$ by the normalization, and (12) gives the exact known modal growth. On a distinct exponential eigenmode, direct substitution in (12) makes (11) vanish unless its exponent is $k_*$. These controls fix the normalization and delayed integral sign before (12) is used for the nonlinear conclusion.

Write $u=\rho e^{i\vartheta}$ with a continuously lifted phase. Because the complete history norm is at most $C\rho$ in (10), $g=o(\|\xi\|_{C^1})$ yields

$$
\frac{d\log\rho}{d\tau}=\alpha+\operatorname{Re}\epsilon(\tau),
\qquad
\frac{d\vartheta}{d\tau}=\beta+\operatorname{Im}\epsilon(\tau),
\qquad
\epsilon=\frac{p\,g(\xi_\tau)}{u}=o(1)
\tag{13}
$$

uniformly as the checkpoint radius tends to zero. Choose that radius so small that $|\epsilon|<0.001$. Then $d\log\rho/d\tau>\alpha-0.001>0.012$, and $d\vartheta/d\tau>\beta-0.001>0$. This choice changes only the local proof checkpoint, not the family or its frozen original exit.

For a fixed sufficiently small radius $r_u$, let $\widehat\tau_\eta$ be the first generated time with $\rho=r_u$. Monotone radial growth, the invariant cone and ordinary local continuation guarantee that it exists in the smaller chart for all sufficiently small $\eta>0$: while $\rho<r_u$, the whole history remains within a fixed multiple of $r_u$, which is chosen inside all original chart margins, so an earlier chart exit cannot interrupt the argument. It tends to infinity as $\eta\downarrow0$. Continuity of the original family and transverse crossing make $\eta\mapsto\widehat\tau_\eta$ and its lifted exit phase continuous.

Equation (13) proves the sharper local asymptotics

$$
\frac{\widehat\tau_\eta}{\log(1/\eta)}\longrightarrow\frac1\alpha,
\qquad
\frac{\vartheta(\widehat\tau_\eta)}{\log(1/\eta)}
\longrightarrow\frac\beta\alpha.
\tag{14}
$$

Indeed integrate $d\tau/d\log\rho=1/(\alpha+o(1))$ and $d\vartheta/d\log\rho=(\beta+o(1))/(\alpha+o(1))$ from $\rho_\eta=|c|\eta+o(\eta)$ to $r_u$. The part above any fixed smaller radius has bounded length. Below it the errors are uniformly as small as desired, which proves (14) by first taking $\eta\downarrow0$ and then shrinking that smaller radius. A bounded phase error is not asserted; $C^1$ regularity alone need not give one.

The continuous lifted exit phase tends to positive infinity. Consequently for every target angle $\varphi$ there are positive amplitudes $\eta_j\downarrow0$ for which $u(\widehat\tau_{\eta_j})=r_u e^{i\varphi}$. This follows from the intermediate-value theorem on the original positive-amplitude parameter interval. Neither monotonicity in amplitude nor a new initial phase is needed. It is an existence statement, not an identified numerical amplitude.

## 3. The actual limiting checkpoint set is a complete local circle

The spectral gap also identifies the otherwise unspecified attained limit histories. In (7), consider backward sequences $z_n=(u_n,s_n)$, $n\le0$, with norm $\sup_{n\le0}\gamma^{-n}\|z_n\|<\infty$, where $\gamma=e^{0.012a}$ is fixed in (6). For a prescribed sufficiently small $u_0$, their recurrence is equivalent to

$$
\begin{aligned}
u_n&=A_u^n u_0-\sum_{j=n}^{-1}A_u^{n-1-j}R_u(z_j),\\
s_n&=\sum_{j=-\infty}^{n-1}A_s^{n-1-j}R_s(z_j).
\end{aligned}
\tag{15}
$$

The second formula follows by sending the earlier endpoint to minus infinity: its homogeneous remainder vanishes because $b<\gamma$. In the weighted maximum norm, the two sums have Lipschitz bounds at most $\varepsilon/(m-\gamma)$ and $\varepsilon/(\gamma-b)$. On a sufficiently small closed sequence ball, (15) is a contraction and maps the ball into itself for sufficiently small $u_0$. It gives a unique sequence and a continuous local graph $s_0=G(u_0)$, with $G(0)=0$ and $G(u_0)=o(|u_0|)$. Applying the same contraction to derivatives gives $C^1$ dependence; continuity and uniqueness already suffice for the circle result. The intervening histories are uniquely filled by the original local semiflow. Shifting a resulting complete backward orbit by any sufficiently short time preserves its exponential bound and local margins, so its shifted sampled sequence satisfies the same uniqueness condition. Consequently the graph is locally invariant under the continuous semiflow, not only under the time-$a$ map. This constructs the local strong unstable manifold directly from the accepted time map.

Shift each actual trajectory to its checkpoint $\widehat\tau_\eta$. For any fixed longer history window, for example $[-H_c,0]$ with $H_c>\max(H,\log40+1)$, that window is wholly generated when $\eta$ is sufficiently small. The same regular-chart derivative bounds used in the accepted [attained-exit construction](authorized-cases-ten-hour-c-spiral-attained-exit-set.md) give precompactness in $C^1$. Integrating the lower radial rate in (13) backward from the checkpoint gives

$$
\|\xi_{\widehat\tau_\eta+t}\|_{C^1}
\le C r_u e^{(\alpha-0.001)t},\qquad t\le0,
\tag{16}
$$

on each fixed generated backward interval, once $\eta$ is small enough. Passing to a diagonal limit produces a complete backward orbit. Since $\alpha-0.001>0.012$, its sampled sequence is in the uniqueness class of (15). Every checkpoint limit therefore lies on $G$ and has $|u_0|=r_u$.

Conversely, the phase-surjectivity conclusion after (14) supplies a sequence for each $\varphi$. Any of its compact subsequential limits has $u_0=r_u e^{i\varphi}$ and hence must have $s_0=G(r_u e^{i\varphi})$ by (15). The actual limiting checkpoint set is therefore exactly

$$
\widehat K_{r_u}
=\{\Psi(r_u e^{i\varphi},G(r_u e^{i\varphi})):\ 0\le\varphi<2\pi\},
\tag{17}
$$

where $\Psi$ is the compatible-history chart. The unique backward orbit also determines its longer complete sampled window, so (17) is not only a statement about present coordinates. Every sufficiently small actual checkpoint approaches this compact circle. Otherwise a sequence remaining outside one of its neighborhoods would have a compact limit contradicting (17).

This is an attained set for an earlier, continuously defined checkpoint of the original family. It does not silently replace the frozen sampled exit set $K_{\rm exit}$, its threshold or its already recorded source identities. Transport from (17) to that later section or to a unit-event region is a further dynamical statement.

## 4. The remaining fate obstruction is now nonlinear transport

The earlier faster-mode ambiguity is removed in this sector, and arbitrary leading phase is now realized by limiting checkpoints of the original positive-amplitude family. The new theorem does not infer speed gain from that phase. The accepted exact angular gain retains its complete moving source clock:

$$
\frac{d|v|^2}{d\theta}
=\frac{2[\kappa\sin\delta-y(1+\kappa\cos\delta)]}{d^2D}.
\tag{18}
$$

Here $y$ is radial velocity divided by tangential velocity, $\kappa=r(S)/r(T)$, $\delta=\theta(T)-\theta(S)$, $d=|x(T)+x(S)|/r(T)$ and $D=1+n\cdot v(S)$. They are actual-history quantities. A phase on (17) does not specify the sign of the later integral of (18), nor does linear dominance supply an invariant future region.

The precise newly reduced task is to prove finite-time transport of at least one history on the actual circle (17) through a regular strict complete-history tube into an accepted open event region. The existing attained-neighborhood transfer theorem would then give arbitrarily small nonzero actual members with finite unit endpoints. Covering the entire circle by such open transports would give all sufficiently small members. An actual-member invariant-region proof would instead establish an infinite member; existence of a viable limiting orbit on this manifold still would not imply that conclusion, because finite members can have arbitrarily long normalized survival.

No such transport or attained invariant region has been proved here. The new closed bridge is spectral dominance, actual phase coverage and the identification (17), rather than another conditional event criterion with the same unverified entry premise. The remaining obstruction is a concrete finite-amplitude nonlinear history problem on this identified circle. No numerical member, finite unit endpoint or infinite original-family member has been certified.

## 5. Falsifiers and review boundary

The spectral result fails if the admitted characteristic matrix omits a clock term; the rational contour enclosure misses any boundary point or allowed parameter; its homotopy rectangle contains zero; the winding count or disk bound is incorrect; or the already certified pair is not simple. The phase theorem fails if the original realization is not a continuous compatible positive-amplitude family with tangent (9), if the complementary spectrum has a root at or above $0.01$, if the projected identity (12) fails, or if the local uniform finite-time differentiability used in (10) does not hold. The circle identification fails if generated complete-history compactness or the weighted backward contraction (15) fails. Each is checkable in the cited owner, retained edge receipt, or displayed derivation.

The new certificate and nonlinear implications have author self-review only. The original Cartesian differential and the original simple pair were separately adjudicated before this task, but that prior review is not an independent adjudication of this new count or theorem. No scientific acceptance, corpus promotion or later-fate closure is claimed. Shared queues, ledgers, frozen subjects, original/reference instruments and the other active canonical and ceiling investigations remain outside this worker's edit scope.

## Verification continuation

Before a second target, the new [Cartesian reconstruction and receipt auditor](logarithmic-actual-fate-two-hour-cartesian.py) passed its known controls under the shared venv, with the exclusive-create `cartesian-known.json` receipt reporting exit zero and `passed: true`. Its new negative-ray count gives one for a counterclockwise square, minus one for its reverse and zero when translated away from the origin. The Cartesian response reconstruction encloses the analytically known radial-control matrices in both exchange sectors; scaled exponentials at $4$ and $4i$ pass, as do the frozen independent reference's original controls. This pass precedes its target audit and half-plane recount.

This reconstruction uses the frozen independently authored Cartesian differential and a distinct rational interval/transcendental implementation, while sharing the new subject's contour subdivision algorithm. It is useful implementation evidence, not an independent mathematical review of that shared contour method or of Sections 2–3. Neither frozen instrument is modified.

The reconstruction target completed with winding two and 216 whole-edge enclosures. Its exact negative-ray audit separately checked the subject receipt's directed boundary coverage, adjacent endpoint identity, all zero exclusions and winding two across all 164 subject edges. The supervisor lease `65e39666-a64d-4922-a503-496f5e8bfc11` records exit zero, 20.316 seconds of wall time and `processGroupClosed: true`. Its heartbeat advanced during the run. Both target receipts retain full rational edge data and source identities.

The functional-analytic self-review also checked the [primary mathematical source](https://aimath.org/WWN/variabletimelag/sur0b.pdf), Theorem 3.2.1 and Section 3.4, against the inherited local-flow assumptions. It supplies differentiable fixed-time maps on the compatible solution manifold and identifies the linearization with the fixed-delay variational equation on its tangent space. The cone, projected-coordinate identity, phase-surjectivity and weighted backward construction above are the new case-specific derivations; the paper supplies no logarithmic-family fate theorem.

Before the final wider spectral target, the frozen-instrument extension passed all inherited controls and counted exactly the two known roots $0,1$ of $k(k-1)(k+1)$ inside the proposed rectangle with left edge $-0.01$, right edge $10$ and imaginary edges $\pm10$. The exclusive-create `full-spectrum-known.json` records this pass before the characteristic recount. The extension changes no earlier instrument or receipt; Section 1.3 gives its wider analytical tail bound and completed result.

The remaining reproduction commands, using fresh receipt names if these already exist, are:

```bash
"${AAA_VENV:-../.venv}/bin/python" -B reference/priorities/master-equation-closure/binary-research/analysis/logarithmic-actual-fate-two-hour-cartesian.py --out .local-data/master-equation-closure/binary-research/logarithmic-actual-fate/cartesian-known.json
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID/logarithmic_actual_fate" --deadline-seconds 700 --heartbeat-seconds 15 -- "${AAA_VENV:-../.venv}/bin/python" -B reference/priorities/master-equation-closure/binary-research/analysis/logarithmic-actual-fate-two-hour-cartesian.py --target --known .local-data/master-equation-closure/binary-research/logarithmic-actual-fate/cartesian-known.json --subject-receipt .local-data/master-equation-closure/binary-research/logarithmic-actual-fate/spectrum-target.json --out .local-data/master-equation-closure/binary-research/logarithmic-actual-fate/cartesian-target.json
"${AAA_VENV:-../.venv}/bin/python" -B reference/priorities/master-equation-closure/binary-research/analysis/logarithmic-actual-fate-two-hour-full-spectrum.py --out .local-data/master-equation-closure/binary-research/logarithmic-actual-fate/full-spectrum-known.json
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID/logarithmic_actual_fate" --deadline-seconds 700 --heartbeat-seconds 15 -- "${AAA_VENV:-../.venv}/bin/python" -B reference/priorities/master-equation-closure/binary-research/analysis/logarithmic-actual-fate-two-hour-full-spectrum.py --target --known .local-data/master-equation-closure/binary-research/logarithmic-actual-fate/full-spectrum-known.json --out .local-data/master-equation-closure/binary-research/logarithmic-actual-fate/full-spectrum-target.json
```
