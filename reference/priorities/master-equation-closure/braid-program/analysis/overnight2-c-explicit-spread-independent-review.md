# Independent reconstruction of the explicit radius-spread bound

## Verdict and precise domain

**Derived verdict:** the [frozen constructive spread proof](overnight2-c-explicit-radius-spread.md) is correct. Its root derivative, changing-emission-time velocity derivative, transmitter-factor derivative, row count, constants, and residual comparison independently reconstruct without defect. For exact strictly subfield ordered-radius logarithmic three-neutral-antipodal-pair circular configurations normalized by $r_1=1$, the result is

$$
r_3>1+\varepsilon_0,
$$

with exactly the proposed positive constant

$$
R=35,\quad u_0=\frac{\delta}{100R^2},\quad m=\frac{u_0}{16},\quad
t_0=\frac\delta4,\quad d_0=\frac{\delta^2}{512R^2},\quad
\varepsilon_0=\min\left\{\frac\delta4,\frac{m d_0^3t_0^2}{212}\right\}.
$$

Here $\delta$ is the previously independently reconstructed constructive separation floor at $R=35$, and $d_0$ bounds the dimensionless transmitter factor, not a present distance. The law remains $K_{\log}=c_f=1$ with persistent unit polarities, unchanged transmitter weighting, and complete infinite circular histories. The result is a mathematical width for simultaneous near-equality of all three radii; it does not exclude general unequal radii, either partial-equality boundary away from that neighborhood, or establish stability or a practical covering cost.

## Homotopy domain and complete-root preservation

Let $h=r_3-1>0$ for a hypothetical exact configuration with $h\le\varepsilon_0$. Keep its angular rate $\omega$ and all phases fixed, and set $r_k(q)=1+q(r_k-1)$ for $0\le q\le1$. At every fixed time, each persistent point has parameter derivative of norm $r_k-1\le h$. Its displacement from its $q=1$ position is at most $h$. Therefore the triangle inequality transfers the exact configuration's present separation floor to the entire homotopy:

$$
|X_i(q,0)-X_j(q,0)|\ge\delta-2h\ge\delta/2.
$$

Every radius stays in $[1,R]$, and every speed obeys $\omega r_k(q)\le\omega r_3<1$. This is a comparison through prescribed circular histories; intermediate configurations need not satisfy the acceleration equation. The previously checked closed-subfield root bounds are geometric bounds for such prescribed histories and do not require exact balance. Applied with the new separation floor, they give

$$
\tau\ge\frac{\delta/2}{2}=t_0,\qquad
D\ge\frac{(\delta/2)^2}{128R^2}=d_0>0.
$$

The complete circular census remains exactly one positive ordinary root per directed distinct partner and no positive self roots: thirty partner roots in all. No intermediate collision or root singularity is admitted. Uniqueness and the ordinary implicit-function theorem make the partner delays differentiable along the path, with one-sided derivatives at its endpoints if needed. Equal radii at $q=0$ cause no degeneracy because all six present positions remain separated. The earlier strictly ordered outer-radius theorem is used only for the starting exact configuration; decreasing its radii preserves that already known bound without reapplying it to intermediate equal radii.

## Independent root and velocity derivatives

Fix a receiver at reception time zero. Let $x(q)$ be its position, $y(q,t)$ the source path, and $v_s(q,t)=\partial_t y(q,t)$ the source velocity. Put

$$
p(q)=x(q)-y(q,-\tau(q)),\qquad |p|=\tau,\qquad n=p/\tau,\qquad
D=1-n\cdot v_s(q,-\tau(q)).
$$

A dot below means total $q$ derivative; a partial $q$ derivative of a source quantity holds its source time fixed. The chain rule gives

$$
\dot p=\partial_qx-\partial_qy+v_s\dot\tau,
\qquad
\dot\tau=n\cdot\dot p.
$$

Consequently

$$
D\dot\tau=n\cdot(\partial_qx-\partial_qy),\qquad
|\dot\tau|\le\frac{2h}{d_0}.
$$

The plus sign multiplying $v_s\dot\tau$ in $\dot p$ comes from differentiating the source's time argument $-\tau$ and the subtraction of its position. It is essential to the denominator $D=1-n\cdot v_s$. Since $|v_s|\le1$ and $d_0\le1$,

$$
|\dot p|\le2h+|\dot\tau|\le\frac{4h}{d_0}.
$$

Differentiation of the unit direction actually gives $\dot n=(I-nn^{\mathsf T})\dot p/\tau$. The weaker bound used by the subject is therefore valid:

$$
|\dot n|\le\frac{2|\dot p|}{\tau}\le\frac{8h}{d_0t_0}.
$$

The factor two is a conservative norm estimate, not a modification of the acceleration law. For circular motion at fixed rate, $|\partial_qv_s|\le\omega h\le h$, since $\omega r_3<1$ and $r_3\ge1$. Its source-time acceleration has magnitude $|\partial_t v_s|=\omega^2r_k(q)\le1$. The total source-velocity derivative is

$$
\dot v_s=\partial_qv_s-\partial_t v_s\,\dot\tau,
\qquad
|\dot v_s|\le h+|\dot\tau|\le\frac{3h}{d_0}.
$$

Thus the changing emission time is included here as well as in the chord derivative. Finally

$$
\dot D=-\dot n\cdot v_s-n\cdot\dot v_s,
\qquad
|\dot D|\le\frac{8h}{d_0t_0}+\frac{3h}{d_0}
\le\frac{11h}{d_0t_0},
$$

because $t_0\le1$. The inequalities $d_0,t_0\le1$ follow directly from $0<\delta<1$ and $R=35$; no implicit large-scale normalization is used beyond the stated $r_1=1$ gauge.

## Checking the constants through the full residual

For one signed complete logarithmic hit, $A=\sigma n/(\tau D)$ with $\sigma=\pm1$. The factor is positive throughout the homotopy, so ordinary differentiation gives

$$
\dot A=\sigma\left(
\frac{\dot n}{\tau D}
-\frac{n\dot\tau}{\tau^2D}
-\frac{n\dot D}{\tau D^2}
\right).
$$

The three norm contributions are bounded, respectively, by

$$
\frac{8h}{d_0^2t_0^2},\qquad
\frac{2h}{d_0^2t_0^2},\qquad
\frac{11h}{d_0^3t_0^2}.
$$

Their sum is $(10d_0+11)h/(d_0^3t_0^2)\le21h/(d_0^3t_0^2)$. This verifies the constant 21 without omitting a denominator derivative or changing polarity dependence.

At each positive receiver there are exactly five partner rows. Its required circular term has derivative norm $\omega^2(r_k-1)\le h$. The local radial/tangential basis is fixed along $q$ because the reception phase is fixed. Orthogonal change to this basis does not increase the vector norm, so the two-component residual obeys

$$
|\dot F_i|\le\frac{5\cdot21h}{d_0^3t_0^2}+h
\le\frac{106h}{d_0^3t_0^2}.
$$

The last inequality uses $d_0^3t_0^2\le1$. Each scalar component is bounded by the same vector norm. Integrating over a unit-length parameter interval and using exactness at $q=1$ gives the six-component maximum bound

$$
\|F(0)\|_\infty
\le\frac{106h}{d_0^3t_0^2}
\le\frac m2,
$$

where the last step is exactly $h\le m d_0^3t_0^2/212$ and $212=2\cdot106$. The separate minimum condition $h\le\delta/4$ is what ensured the root-domain bounds; neither condition substitutes for the other.

## Contradiction from both possible polarity orders

At $q=0$, all radii equal one, all six positions remain distinct, and the common speed is $v=\omega\in(u_0,1)$. Every such six-point antipodal arrangement is either alternating or nonalternating; the independently checked polarity-order classification does not assume that this comparison configuration balances.

If it is nonalternating, the previously checked arbitrary-configuration radial margin gives $\|F(0)\|_\infty>v/16>u_0/16=m$. If it is alternating, the [independently reconstructed alternating residual margin](overnight2-c-alternating-margin-independent-review.md) gives $\|F(0)\|_\infty\ge23/6400$. The latter exceeds $m$, since

$$
m=\frac{\delta}{1600R^2}<\frac1{1600}=\frac4{6400}<\frac{23}{6400}.
$$

Both cases contradict the upper bound $m/2$. The arbitrary-configuration nature of the two margins is essential: the equal-radius comparison is not itself assumed exact, so a mere nonexistence theorem there would not provide this quantitative contradiction. The checked margins supply precisely the needed lower bounds.

Thus no exact configuration in the declared ordered class has $0<h\le\varepsilon_0$. Equality at the proposed cutoff is included in the contradiction, so the resulting bound is strict. The already excluded case $h=0$ adds no loophole. Positivity of $\varepsilon_0$ follows from positivity of all its named constants; no floating evaluation is required.

## Independent hand controls and falsifiers

As an elementary control of the root and row derivatives, take a static opposite pair with radius $r(q)=1+q\eta$ and fixed direction. Then $\tau=2r$, $D=1$, $n$ is constant, and its own-antipode radial row is $-1/(2r)$. Direct differentiation gives $\dot\tau=2\eta$ and $\dot A_r=\eta/(2r^2)$. The reconstructed formulas give the same values from $\partial_qx-\partial_qy=2\eta n$, with no emission-time velocity term at zero speed. This is a hand-known control of the identities, not a target configuration or an exact six-member reference.

The exact arithmetic checks $8+2+11=21$, $5\cdot21+1=106$, $212=2\cdot106$, and $1/1600=4/6400<23/6400$ separately verify the accumulation and final margin comparison. The moving-source derivation explicitly retains both time-composition terms, so the static control is not used as a substitute for that derivation.

The proof would be falsified by a homotopy losing its $\delta/2$ separation floor, an omitted positive causal root, a factor below $d_0$, a missing emission-time term in either derivative, an incorrect five-row residual count, or failure of either arbitrary equal-radius margin. An exact configuration in the selected class with $r_3\le1+\varepsilon_0$ would falsify the conclusion. The reused compact angular-rate bound is needed to keep the nonalternating comparison margin uniformly above $m$; dropping it would invalidate this explicit construction.

## Provenance and execution boundary

The subject SHA-256 measured with `shasum -a 256` was `3e82f40c0af96a747adceb63d20fa316e8fe817ffc68652eeed141b76dd9d336`, matching the frozen identity supplied by the parent. The clock tool returned 2026-10-07 07:47:42 UTC at review start. The allocation retains launch 03:25:15 UTC, exploration stop 13:55:15 UTC, and hard deadline 15:25:15 UTC.

Only this new independent-review Markdown file was written. The subject, prior reviews, numerical certificate and its receipts, main report, shared owners, and other agents' files were preserved. No new numerical instrument, target, process, Git mutation, or recursive delegation was used. This completes the assigned proof review; the parent owns integration.
