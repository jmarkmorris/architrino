# Multiple-period resonances and local noncircular boundary branches

Status: independently derived candidate, 2026-10-05, under the [frozen protocol](alternatives-screen-2026-10-05-time-symmetric-multiple-period-independent-protocol.md). The coordinator's prospective resonance source was not read before this source was frozen. The linear theorem and the nonlinear construction are distinguished below. No numerical target or physical variational principle is used. Independent assessment is required before integration.

For every sufficiently large fixed integer $k$, there is a unique sufficiently small speed $\beta_k$ at which the additional planar frequency satisfies $m_*(\beta_k)=1-1/k$. Its value is $\beta_k=\sqrt{2/k}\,[1+O(k^{-1})]$. The complete fixed-$k$-period Cartesian kernel has eight real dimensions: six Euclidean directions and the two resonant planar directions.

The nonlinear argument below constructs a local $C^1$ curve of actual noncircular periodic boundary solutions through each such circle, in an explicitly invariant planar, antipodal and reversible subspace of the full Cartesian equation. Every nonzero sufficiently small amplitude has labeled fundamental period equal to the nominated period near $k$ circle periods. This is an existence theorem in that symmetry class, not a classification of arbitrary three-dimensional branches or a causal-stability assertion.

## 1. Fixed law, exact circles and resonance sequence

The selected equation is exactly Section 14's equal past/future canonical radial acceleration, with opposite polarities and $K=c_f=1$. Define

$$
x=\beta\cos x,\quad c=\cos x,\quad s_x=\sin x,\quad D=1+\beta s_x,\quad R(\beta)=\frac1{4\beta^2cD},\quad \omega(\beta)=\frac\beta R.
$$

The complete balanced circle is $X_1(t)=R(\cos\omega t,\sin\omega t,0)$, $X_2(t)=-X_1(t)$, with physical period $T(\beta)=2\pi/\omega(\beta)$. Its complete partner roots are $t\pm2x/\omega$. Strict subfield speed excludes every nonzero-age self root. No instantaneous diagonal law is added.

The independently assessed [small-speed continuous-frequency theorem](alternatives-screen-2026-10-05-time-symmetric-planar-classification-independent.md) supplies, on some interval $0<\beta<\beta_s$, exactly the planar roots: common $m=\pm1$ double, opposite zero double and opposite $m=\pm m_*(\beta)$ simple. Its analytic branch obeys

$$
m_*(\beta)=1-\frac{\beta^2}{2}+O(\beta^4),\qquad m_*'(\beta)=-\beta+O(\beta^3)<0.
$$

The complete [normal frequency theorem](alternatives-screen-2026-10-05-time-symmetric-normal-bounded-independent.md) gives only the normal translation and tilt frequencies. The newer all-speed numerical certificate is not needed as a premise for the present sufficiently-small-speed argument.

Choose a smaller positive $\beta_s$ if needed so the displayed derivative is negative throughout. For every integer $k$ large enough that $1/k<1-m_*(\beta_s)$, monotonicity and continuity give exactly one $\beta_k\in(0,\beta_s)$ satisfying

$$
m_*(\beta_k)=1-\frac1k.
$$

The expansion gives $\beta_k^2=2/k+O(k^{-2})$, hence the stated asymptotic. Uniqueness is asserted in this fixed small-speed interval, not inferred globally from an unproved speed-monotonicity claim.

## 2. Exact multiple-period kernel and crossing

Fix one such $k$ from now on. Use the nominated period $P(\beta)=kT(\beta)$ and frequency $\nu(\beta)=\omega(\beta)/k$. The fixed phase is $s=\nu(\beta)t$, with period $2\pi$, and the circular profile is

$$
Y_\beta(s)=R(\beta)(\cos ks,\sin ks).
$$

In coordinates rotating with the base circle, a Fourier harmonic $j$ in $s$ has dimensionless rotating frequency $m=j/k$. At $\beta_k$ the nonsymmetry harmonic is $j=k-1$. The known complete continuous spectrum excludes every other nonsymmetry harmonic. The six Euclidean modes remain periodic, and the three planar and one normal polynomial generalized directions do not. Thus the full Cartesian fixed-$P(\beta_k)$ kernel is exactly eight-dimensional over the reals.

In the opposite planar block, write $H_-=(a,if;-if,d)$. Near zero speed its resonant null vector can be chosen as $(1,ib_k)$ with real $b_k\to2$. The real resonant profile is

$$
\phi(s)=Q(ks)\begin{pmatrix}\cos((k-1)s)\\-b_k\sin((k-1)s)\end{pmatrix},
$$

up to a nonzero normalization. Its other real phase is obtained by taking the imaginary part of the complex mode. The physical Cartesian harmonics of $\phi$ are $1$ and $2k-1$ in $s$, with nonzero coefficients for all sufficiently large $k$, because $b_k$ stays away from $\pm1$. Their greatest common divisor is one. Therefore each nonzero resonant real variation has labeled fundamental period $2\pi/\nu=kT$, not merely a period dividing that number.

Parameter transversality is an exact consequence of the simple moving root. Let $F_-(m,\beta)=\det H_-(m,\beta)$ and $m_k=1-1/k$. At the resonant point,

$$
\partial_\beta F_-(m_k,\beta_k)=-\partial_mF_-(m_k,\beta_k)m_*'(\beta_k)>0.
$$

The positive sign of $\partial_mF_-$ follows from the small-speed simple-root proof; its limiting value is two. The other eigenvalue of $H_-$ equals its trace because the critical eigenvalue is zero; it tends to $-5$ and remains negative. The derivative of the zero eigenvalue is therefore $\partial_\beta F_-/\operatorname{tr}H_-<0$. Thus the critical eigenvalue crosses zero transversely.

In physical normalization the linear operator is multiplied by $\omega(\beta)^2$. The derivative of this prefactor contributes zero on the null vector, so it cannot remove transversality. The fixed phase factor $Q(ks)$ is independent of $\beta$. Consequently, for an $L^2$-normalized real resonant vector $\phi$,

$$
\langle\phi,L'_{\beta_k}\phi\rangle\ne0,
$$

where $L_\beta$ is the linearization about $Y_\beta$ at nominated frequency $\nu(\beta)$.

## 3. Exact invariant symmetry space and complete nonlinear roots

The nonlinear existence construction imposes three explicit symmetries: $X_2=-X_1$, $X_{1z}=0$, and

$$
Y(-s)=E Y(s),\qquad E=\operatorname{diag}(1,-1).
$$

Thus the first planar component is even and the second odd. These conditions are not imposed on the preceding full Cartesian kernel theorem. They select a sufficient invariant space in which a nonlinear branch can be constructed without unresolved Euclidean range equations.

For a periodic profile $Y$, extend it to the full real line. The positive phase age $d_\varepsilon(s)$ of the partner root solves

$$
d_\varepsilon=\nu\,|Y(s)+Y(s+\varepsilon d_\varepsilon)|.
$$

Choose a neighborhood of $(Y_{\beta_k},\beta_k)$ with $\min_s|Y(s)|>r_0>0$, bounded $\|Y\|_{C^0}$, positive bounded $\nu$, and physical speed $\nu\|Y'\|_\infty<b<1$. The complete root function is strictly increasing in its age, starts negative and tends to positive infinity. Its monotonicity follows from the global chord bound, even at intermediate ages where the norm might vanish. Hence there is exactly one positive partner root in each direction. At the root,

$$
\frac{2\nu r_0}{1+b}\le d_\varepsilon\le2\nu\|Y\|_\infty,\qquad
D_\varepsilon=1-\varepsilon\nu n_\varepsilon\cdot Y'(s+\varepsilon d_\varepsilon)\ge1-b>0,
$$

where $n_\varepsilon=[Y(s)+Y(s+\varepsilon d_\varepsilon)]/\ell_\varepsilon$ and $\ell_\varepsilon=d_\varepsilon/\nu$. Self roots are absent at every positive age because the physical self chord is strictly shorter than its age. This covers all repeated periods and both complete source half-lines; it does not truncate the source history.

Define

$$
\mathcal F(Y,\beta)=\nu(\beta)^2Y''+\frac12\sum_{\varepsilon=\pm1}\frac{n_\varepsilon}{\ell_\varepsilon^2D_\varepsilon}.
$$

The zero equation is the first label's exact Cartesian acceleration equation. Inversion gives the second label's negative equation; planarity makes both normal rows vanish. Under $s\mapsto-s$ and $Y\mapsto EY$, the source signs interchange, $d_\varepsilon(-s)=d_{-\varepsilon}(s)$, $n_\varepsilon(-s)=E n_{-\varepsilon}(s)$, and source velocity changes to its negative reflection. The denominator is preserved after the sign interchange. Therefore $\mathcal F(Y,\beta)(-s)=E\mathcal F(Y,\beta)(s)$ whenever $Y$ is reversible. A zero in this symmetry space is consequently a zero of every original full Cartesian row.

The imposed reversal removes the phase direction: its rotating tangential constant is not odd. Antipodality removes common translations; planarity removes tilts. Exactly one of the two real resonant directions survives reversal, namely $\phi$. This is an actual invariant-space restriction, not deletion of unsatisfied equations.

## 4. Actual differentiability levels

Let $X_r$ be the reversible real $C^{r+2}_{\rm per}$ planar profiles and $Z_r$ the reversible $C^r_{\rm per}$ profiles, with the usual uniform derivative norms. We need $r=0,1$. Positive range and denominator margins hold on an open neighborhood in these spaces.

The following three mapping statements are sufficient and are justified separately:

$$
\mathcal F:X_0\times\mathbb R\longrightarrow Z_0\text{ is }C^1,
\qquad
\mathcal F:X_1\times\mathbb R\longrightarrow Z_1\text{ is }C^1,
$$

$$
\mathcal F:X_1\times\mathbb R\longrightarrow Z_0\text{ is }C^2.
$$

No $C^2:X_0\to Z_0$ assertion is made. The acceleration samples the physical source velocity, so a second variation at the low level would generally require a third derivative of the base profile.

For the low-level first derivative, the composition map $(f,z)\mapsto f(s+z(s))$ from $C^1\times C^0$ into $C^0$ has derivative $h(s+z)+f'(s+z)v$. Its remainder is bounded by the modulus of continuity of $f'$ times $\|v\|_\infty$, plus $\|h'\|_\infty\|v\|_\infty$. The derivative is continuous in the indicated operator norms. Apply this to positions and to $f=Y'$. The root residual has derivative in the age graph equal to multiplication by $D_\varepsilon$, whose inverse is bounded. The implicit root graph is therefore $C^1$ into $C^0$, and all subsequent range, direction and denominator operations are smooth.

For the high-level first derivative, use the composition map $C^2\times C^1\to C^1$. Differentiating its displayed first variation once in $s$ uses $f''$, $h'$ and the first derivatives of the shift functions. The same Taylor-remainder estimate, now also applied to the differentiated expression, proves continuous Fréchet differentiability. Apply it to $f=Y'\in C^2$ when $Y\in C^3$. The root graph is obtained in $C^1$; multiplication by $D_\varepsilon$ and its inverse are bounded there. Thus the second mapping statement follows.

For two derivatives into $C^0$, the composition map $C^2\times C^0\to C^0$ has second derivative

$$
D^2E[(h_1,v_1),(h_2,v_2)]=h_1'(s+z)v_2+h_2'(s+z)v_1+f''(s+z)v_1v_2.
$$

The Taylor remainder and continuity follow from uniform continuity of the fixed $f''$ and bounded $C^2$ increments. With $Y\in C^3$, this applies to the sampled velocity. The root residual is also twice continuously differentiable into $C^0$, and its age derivative is invertible; differentiating its implicit equation twice gives a $C^2$ root graph into $C^0$. These formulas prove the third mapping statement, including mixed derivatives in $\beta$ through the smooth positive frequency $\nu(\beta)$.

The physical source variation at the first step is, explicitly,

$$
\delta V_j=\delta\nu\,Y_j'(S)+\nu h_j'(S)+\varepsilon\nu Y_j''(S)\delta d_\varepsilon.
$$

The last term is the shifted source acceleration. Retaining it is essential to both the derivative and the previously derived Fourier block. The higher regularity argument does not replace that term by a frozen source value.

## 5. Closed range, complement inverse and its regularity gain

Translate the trivial family by defining $\widetilde{\mathcal F}(u,\beta)=\mathcal F(Y_\beta+u,\beta)$. Then $\widetilde{\mathcal F}(0,\beta)=0$. At $\beta_k$, write $L=D_u\widetilde{\mathcal F}(0,\beta_k)$. Its leading term is $\nu_k^2\partial_s^2$; its remainder uses only perturbation positions and first derivatives at current or fixed shifted phases, with smooth coefficients. Thus the remainder is bounded $C^1\to C^0$ and compact $C^2\to C^0$.

More explicitly, conjugation by $Q(ks)$ gives the opposite Hermitian blocks at frequencies $j/k$. Reversal selects radial cosine and tangential sine coefficients. The zero harmonic contains only the radial component and is invertible; the phase null vector is excluded by oddness. At $j=k-1$ there is one real null vector; every other harmonic is invertible by the complete small-speed frequency theorem. For large $|j|$, the tensor norm estimate gives inverse size $O(j^{-2})$ at fixed $k$. These statements cover every harmonic, not a truncation.

Let $\langle\cdot,\cdot\rangle$ be the normalized real $L^2$ pairing on $[0,2\pi]$, normalize $\phi$ to unit norm, and put $Pu=\langle\phi,u\rangle\phi$. The Hermitian blocks make $L$ symmetric in this pairing. Solving its Fourier blocks for $f\perp\phi$ gives a unique $H^2$ solution $u\perp\phi$, with an $H^2$ bound by $\|f\|_{L^2}$. In one periodic dimension, the Fourier Cauchy–Schwarz estimate embeds $H^2$ into $C^1$: the derivative series is absolutely summable because $\sum_{j\ne0}j^{-2}<\infty$. The equation then gives

$$
u''=\nu_k^{-2}(f-\mathcal B u)\in C^0,
$$

where $\mathcal B$ is the smooth lower-order shift operator. Thus $u\in C^2$ and $\|u\|_{C^2}\le C\|f\|_{C^0}$. Conversely every range element is orthogonal to $\phi$. This proves closed range, one-dimensional kernel and cokernel, and a bounded inverse

$$
L:\{u\in X_0:\langle\phi,u\rangle=0\}\longrightarrow\{f\in Z_0:\langle\phi,f\rangle=0\}.
$$

If $f\in C^1$, then $u\in C^2$ implies $\mathcal B u\in C^1$, so the same equation gives $u\in C^3$ and $\|u\|_{C^3}\le C_1\|f\|_{C^1}$. This supplies the corresponding high-level inverse from the $Z_1$ complement to the $X_1$ complement. All constants are finite for the selected fixed $k$; no uniform bound in $k$ is asserted.

## 6. Projected nonlinear reduction with two regularity levels

Write $u=a\phi+w$ with $\langle\phi,w\rangle=0$, and solve the range equation

$$
\mathcal R(w,a,\beta):=(I-P)\widetilde{\mathcal F}(a\phi+w,\beta)=0.
$$

At $(0,0,\beta_k)$ its derivative in $w$ is the complement inverse problem just proved. At the low level, the map $w\mapsto w-L^{-1}\mathcal R(w,a,\beta)$ has derivative norm less than $1/2$ after shrinking a neighborhood, because the derivative of $\mathcal R$ is continuous and equals $L$ at the base point. For sufficiently small parameters it maps a small closed ball into itself. Contraction gives a unique local solution $w(a,\beta)$, and difference quotients of the equation, using the bounded nearby inverse, give continuous first derivatives into $X_0$.

Apply the same argument at the high level using the $X_1\to Z_1$ derivative and inverse. Its solution is also a low-level solution and lies in the low-level uniqueness ball after shrinking the parameter neighborhood. Therefore it is the same function $w$, now proved $C^1$ into $X_1=C^3$. Since the trivial family solves the full equation, $w(0,\beta)=0$ throughout this neighborhood. At the resonant base point, $w_a(0,\beta_k)=0$ because $L\phi=0$.

The remaining step is not an unsupported smoothness upgrade. Let $p=(a,\beta)$ and denote the low-level derivative in $w$ along the projected solution by $B(p)$. It is continuously invertible from the low complement of $Z_0$ to that of $X_0$. First differentiation gives $B(p)w_i(p)+\mathcal R_i(p)=0$. Subtract this equation at $p$ and $p+he_j$ to obtain

$$
B(p+he_j)\frac{w_i(p+he_j)-w_i(p)}h
=-\frac{B(p+he_j)-B(p)}h\,w_i(p)-\frac{\mathcal R_i(p+he_j)-\mathcal R_i(p)}h.
$$

Here $w_i(p)$ is a fixed vector in the high space $X_1$, and the solution curve is $C^1$ into that high space. The third mapping statement in Section 4, namely $C^2:X_1\to Z_0$, makes both right-hand difference quotients converge in $Z_0$. It does not require differentiability of $B$ in the operator norm $X_0\to Z_0$. Applying the continuous low inverse proves existence and continuity of $w_{ij}$ into $X_0$. Thus $w$ is $C^2$ into $C^2$, while its first derivatives are continuous into $C^3$.

It follows by the same add-and-subtract argument that the scalar residual

$$
h(a,\beta)=\langle\phi,\widetilde{\mathcal F}(a\phi+w(a,\beta),\beta)\rangle
$$

is $C^2$. Its second derivative uses the high-space first derivatives in $D^2\widetilde{\mathcal F}$ and the low-space second derivative of $w$ in $D\widetilde{\mathcal F}$. Every one of these maps has been justified at the regularity at which it is used.

## 7. Scalar crossing gives actual nonlinear zeros

The identities $w(0,\beta)=0$ and $\widetilde{\mathcal F}(0,\beta)=0$ give $h(0,\beta)=0$. Factor it without a singular quotient by defining

$$
g(a,\beta)=\int_0^1 h_a(ta,\beta)\,dt,\qquad h(a,\beta)=a g(a,\beta).
$$

Because $h$ is $C^2$, $g$ is $C^1$. At the base point, $g=0$, and

$$
g_\beta(0,\beta_k)=h_{a\beta}(0,\beta_k)=\langle\phi,L'_{\beta_k}\phi\rangle\ne0.
$$

Terms containing $w_a$ vanish at the base point. The term $\langle\phi,Lw_{a\beta}\rangle$ vanishes by the range orthogonality proved above. Thus the nonzero coefficient is exactly the previously checked parameter crossing, not an assumed nonlinear coefficient.

Continuity keeps $g_\beta$ bounded away from zero nearby. The intermediate value theorem and strict monotonicity in $\beta$ therefore give, for each sufficiently small $a$, one nearby root $\beta=\beta(a)$, with $\beta(0)=\beta_k$. Difference quotients of $g(a,\beta(a))=0$ give $\beta'(a)=-g_a/g_\beta$, so this curve is $C^1$. Consequently

$$
Y(a)=Y_{\beta(a)}+a\phi+w(a,\beta(a))
$$

solves both the range equation and scalar equation, hence the entire nonlinear boundary equation. Together with $X_2=-X_1$ and zero normal coordinates it solves every original Cartesian row. The map is $C^1$ into $C^3$. Each individual solution is smooth: if $Y\in C^r$, $r\ge2$, the complete source graph is $C^r$ in phase, the acceleration is $C^{r-1}$, and the equation improves $Y$ to $C^{r+1}$; iteration applies.

The physical solution is $X_1(t;a)=Y(a)(\nu(\beta(a))t)$ with $X_2=-X_1$. Here $\beta(a)$ parameterizes the reference circle frequency; it is not a claim that the noncircular path has constant speed. Its actual physical speed remains uniformly below one by the open $C^1$ chart, and its complete separation and source-root census persist. The law itself is fixed throughout.

## 8. Noncircular shape, exact period and limitations

Since $w_a(0,\beta_k)=0$ and $w_\beta(0,\beta_k)=0$, along the branch $w(a,\beta(a))=o(a)$ in $C^2$. The resonant vector has a nonzero rotating radial component proportional to $\cos((k-1)s)$. The $(k-1)$-st Fourier coefficient of $|Y(a)(s)|^2$ is therefore a nonzero constant times $a+o(a)$.

To exclude a circle about any nearby center, rather than only the origin, take the circumcenter $C[Y]$ of the three profile points at $s=0,2\pi/(3k),4\pi/(3k)$. These points remain noncollinear near the base circle, so $C[Y]$ is a smooth function of their coordinates and is zero for every $Y_\beta$. Along the branch, $C[Y(a)]=aC_1+o(a)$. Subtracting this center changes the first-order squared-radius profile by $-2R(\beta_k)a\,e_R(ks)\cdot C_1$, which has only harmonic $k$. It cannot cancel the nonzero harmonic $k-1$. Hence $|Y(a)-C[Y(a)]|^2$ is nonconstant for every sufficiently small nonzero amplitude. If the path were any geometrical circle, its center would equal this circumcenter and the squared radius would be constant. This proves genuine noncircular shape even against arbitrary circle centers and nonuniform circle parameterizations.

The ordinary Cartesian first harmonic of $Y_\beta$ is zero because $k\ge2$, while that of $\phi$ is nonzero. The branch thus has nonzero first harmonic for every sufficiently small nonzero amplitude. Any period of a continuous nonconstant $2\pi$-periodic profile must act trivially on each of its nonzero Fourier coefficients; its first harmonic forces the fundamental period to be exactly $2\pi$. Hence the labeled physical fundamental period is exactly

$$
P(a)=\frac{2\pi}{\nu(\beta(a))}=k\,T(\beta(a)).
$$

The base member at $a=0$ has the smaller fundamental period $T(\beta_k)$; it is viewed as a $k$-fold profile only for the bifurcation problem. The nonzero branch members have the full nominated period. The parameterized period is permitted to vary; this proof does not assert that it varies strictly or that it remains fixed.

All neighborhoods and inverse constants depend on the chosen fixed integer $k$. No uniform amplitude interval as $k\to\infty$ is claimed. The theorem gives a reversible planar antipodal branch in the full Cartesian equation, not persistence under arbitrary nonmirror or nonplanar perturbations. It concerns complete periodic boundary solutions only. There is no causal initial-value theorem, stability classification, attraction statement or nonlinear global continuation.

The earlier local-circle classification at periods near the circle's fundamental period remains consistent: the present nonzero branch has period near $kT$, a distinct period neighborhood. A fixed-period kernel alone would not prove the new result; the complete source chart, range inverse, two-level differentiability argument and scalar crossing are essential.

## 9. Provenance and falsifiers

The mathematical antecedents are frozen: [small-speed complete planar classification](alternatives-screen-2026-10-05-time-symmetric-planar-classification-independent.md), SHA-256 `c6596505ad8b4acd6779205bf8beaf812c21f6bd59dd61388456abcbadaab00c`; [opposite-frequency continuation](alternatives-screen-2026-10-05-time-symmetric-planar-frequency-independent.md), SHA-256 `53ffa20c6583a0f8cd9c1bea532814cffd0a4c070fd0cd5b14d129839b0ccfae`; [bounded normal theorem](alternatives-screen-2026-10-05-time-symmetric-normal-bounded-independent.md), SHA-256 `f72f83f2d6f6c3da9d56b86242786ccba7bea94bde98ba77360367324b8d2fdb`; and the [earlier varying-period local operator construction](alternatives-screen-2026-10-05-time-symmetric-speed-family-local-classification.md), SHA-256 `0f1cb27cdd594471a4271b2c9a5a649486d8384e7d249c96e8edaf666b435ab4`. The current protocol has SHA-256 `d7f7577ef8720ccc18c633c0e19a36f6cb0a44cbc6e90e93f3537c474a4656ff`.

The linear resonance theorem uses independently assessed spectral antecedents and exact parameter differentiation. The nonlinear theorem is a new analytical candidate whose acceptance requires separate review of Sections 3–8, especially the finite-level differentiability argument. No new numerical evidence, solver or regular test suite is involved, and no frozen subject or shared owner was modified.

Falsifiers are an omitted ordinary source on the open subfield chart; failure of the reversible/inversion covariance; another periodic kernel component in the selected small-speed interval; a zero parameter crossing; failure of the high-level complement inverse; a false composition regularity statement; a nonconvergent difference quotient in Section 6; an omitted scalar range equation; a branch with vanishing leading radial or first-harmonic coefficient; or a nonlinear stability claim inferred from this boundary construction. Any such failure must be assigned to its exact step; the linear resonance count remains a separate theorem if the nonlinear bridge fails.
