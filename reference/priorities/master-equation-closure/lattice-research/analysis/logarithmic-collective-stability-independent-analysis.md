# Independent logarithmic checkerboard response and collective linear instability

The declared alternating cubic checkerboard has a restoring response when one receiver moves and its sources remain fixed. Releasing the sources produces a different result: the complete delayed linear equation admits a positive staggered growth rate for every positive logarithmic coupling. The receiver response and the collective verdict are compatible because delayed source displacement and transmitter velocity contribute additional terms.

**Claim grade: derived, conditional on the inverse-distance candidate, the complete-past class and the summation prescription below.** This note independently reconstructs and accepts the [static response proof](logarithmic-static-checkerboard-response.md), whose source is preserved unchanged. The collective operator and its spectral consequence are new derivations in this note and have received analytical self-review, not a separate mathematical adjudication. The bounded numerical comparison provides corroboration, not a certified sign or a nonlinear trajectory. Falsifiers are identified in the final section.

## Equation, equilibrium and permitted histories

Use the [shared logarithmic definition](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement): retain the [canonical causal-root law](../../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation), polarity, direction and transmitter factor, and replace only inverse-square reception by inverse-distance reception. Set $c_f=1$, put $K=\kappa_{\log}q^2>0$, and use lattice spacing $\ell>0$. There is no speed cap, receiver multiplier, contact prescription, root deletion or altered event rule. Standard-physics laws supply no premise.

At receiver $i\in\mathbb Z^3$, the anchors and polarities are $\ell i$ and $\sigma_i=(-1)^{i_1+i_2+i_3}$. For a source $j=i-d$, write $s_d=\sigma_i\sigma_j=(-1)^{d_1+d_2+d_3}$. A regular arriving row is

$$
K s_d\frac{R}{|R|^2}\frac1{|1-n\cdot V_j(E)|},
\qquad R=X_i(T)-X_j(E),\quad n=R/|R|,\quad |R|=T-E>0.
$$

Here $E<T$ is its emission time. At the stationary complete past $X_j(T)=\ell j$, every distinct source has exactly one root $E=T-\ell|d|$, with transmitter denominator one. A stationary label has no positive-delay own-history root. Own-history rows therefore contribute nothing at this equilibrium; they are not deleted from the law.

For the static background, group sites into the eight-site cells $d=2m+e$, $m\in\mathbb Z^3$, $e\in\{0,1\}^3$, omit the origin row, and sum complete signed cells. The cell containing the origin is a finite exceptional cell. For perturbations with ancient displacement and velocity tending to zero exponentially, the difference from this static background is absolutely summable row by row. Thus the physical prescription is a grouped stationary background plus an absolutely convergent history correction. The Gaussian identities used below evaluate that prescription; they do not select arbitrary rearrangements or a new population law.

An explicit domain for the derivative is a complete history $u_j(\theta)$, $\theta\le0$, with

$$
\|u\|_{\eta,2}
=\sup_{j,\,\theta\le0}e^{-\eta\theta}
\bigl(|u_j(\theta)|+|u_j'(\theta)|+|u_j''(\theta)|\bigr)<\infty,
\qquad \eta>0.
$$

Histories are twice continuously differentiable in time, with displacement and velocity related by differentiation. The weighted continuity needed for uniform difference quotients can be imposed by taking the weighted derivatives uniformly continuous. No spatial decay is required in this declared bounded spatial class. The linear operator itself needs only the displacement and velocity part of this norm. A sufficiently small neighborhood satisfies $|u_j|<\ell/4$ and $|u_j'|<1/2$ throughout the complete past.

Those inequalities imply distinct-label separation at equal times, a positive root-transversality margin and exactly one distinct-source root. For fixed reception time, the causal gap $|X_i(T)-X_j(E)|-(T-E)$ has derivative $1-n\cdot V_j(E)>1/2$ in $E$, is positive at $E=T$, and tends to minus infinity as $E\to-\infty$. It therefore has one simple root. For $j=i$, the strict bound $|X_i(T)-X_i(E)|\le\sup|V_i|(T-E)<T-E$ excludes every positive-delay own-history root. These facts justify the ordinary-root derivative without any singular-event continuation assumption.

## Independent static summation and derivative

For a displaced receiver and stationary sources, put $f(z)=z/|z|^2$. Its acceleration is

$$
A(x)=K\sum_{d\ne0}^{\rm cells}s_d f(x-\ell d).
$$

The signed sum in a distant cell is the product of three coordinate finite differences. Applying the fundamental theorem of calculus three times expresses it as the integral of a mixed third derivative over a fixed cube. Since $f$ is homogeneous of degree minus one, its third derivatives are bounded by a constant times $r^{-4}$; the receiver derivative of that expression is bounded by a constant times $r^{-5}$. These estimates hold uniformly for $|x|<\ell/2$ outside finitely many cells. There are $O(r^2)$ cells in a unit radial layer, so both cell sums are absolutely and locally uniformly convergent. The derivative may therefore be taken after grouping.

The Gaussian interchange requires an integrated absolute bound, rather than cancellation at each value of the Gaussian parameter. For the scalar $1/|z|^2$, use

$$
\frac1{|z|^2}=\int_0^\infty e^{-t|z|^2}\,dt.
$$

The mixed third derivative of the Gaussian is $-8t^3z_1z_2z_3e^{-t|z|^2}$. At a distant cell, every point in the finite-difference cube has norm comparable to its radius $r$. Integrating its absolute bound gives $O(r^3\int_0^\infty t^3e^{-c t r^2}dt)=O(r^{-5})$. The vector Gaussian $z e^{-t|z|^2}$ has mixed-third-derivative bounds of the form $C(t^2r^2+t^3r^4)e^{-c t r^2}$; their integrated bound is $O(r^{-4})$. An additional receiver derivative gives $O(r^{-5})$. All three integrated cell bounds are summable.

Consequently the grouped Gaussian integral equals the grouped scalar, vector and derivative sums by absolute summability of the integrated cell contributions. At fixed $t>0$ the ungrouped Gaussian sum is absolutely convergent, so it may be factored and transformed. Removing a Gaussian cutoff is also legitimate: replacing $\int_0^\infty$ by $\int_\epsilon^\infty$ preserves the same cell bounds, and dominated convergence over cells then gives the original result as $\epsilon\downarrow0$. For the vector, this cutoff is precisely multiplication by $e^{-\epsilon|z|^2}$. This argument also controls the derivative of that cutoff; it is not an unproved interchange of a derivative with an ungrouped lattice sum.

At fixed Gaussian parameter the origin-excluded vector sum at $x=0$ is odd under $d\mapsto-d$, while the derivative is invariant under coordinate permutations and sign changes. Passing through the justified integral preserves those symmetries. Thus $A(0)=0$: the stationary checkerboard is an actual equilibrium in this prescription. Define $n_d=d/|d|$. Direct differentiation gives

$$
J=\frac K{\ell^2}\sum_{d\ne0}^{\rm cells}
\frac{s_d}{|d|^2}(I-2n_dn_d^{\mathsf T})
=\frac{K S}{3\ell^2}I,
\qquad
S=\sum_{d\ne0}^{\rm cells}\frac{s_d}{|d|^2}.
$$

The dyad sum is $SI/3$ by the established cubic symmetry; alternatively each diagonal is equal and the trace is $S$. The full matrix therefore has trace $KS/\ell^2$, rather than the zero trace of the inverse-square derivative. These statements reconstruct the row and its symmetry before making a stability claim.

Define three one-dimensional Gaussian sums for $t>0$:

$$
\vartheta_3(t)=\sum_{m\in\mathbb Z}e^{-tm^2},\qquad
\vartheta_4(t)=\sum_{m\in\mathbb Z}(-1)^m e^{-tm^2},\qquad
\vartheta_2(t)=\sum_{m\in\mathbb Z}e^{-t(m+1/2)^2}.
$$

The justified scalar interchange yields

$$
S=\int_0^\infty[\vartheta_4(t)^3-1]\,dt.
$$

Pairing successive decreasing terms in the alternating series gives $\vartheta_4(t)<1$. Positivity follows independently from the Gaussian Fourier series,

$$
\vartheta_3(t)=\sqrt{\pi/t}\,\vartheta_3(\pi^2/t),\qquad
\vartheta_4(t)=\sqrt{\pi/t}\,\vartheta_2(\pi^2/t)>0.
$$

To obtain these identities, periodize $e^{-t x^2}$ on unit intervals, with or without the factor $(-1)^m$. The Fourier frequencies are respectively integers or half-integers. The coefficient at frequency $\xi$ is $\int_{\mathbb R}e^{-t x^2}e^{-2\pi i\xi x}dx=\sqrt{\pi/t}e^{-\pi^2\xi^2/t}$, found by the Gaussian Fourier integral. Every periodized sum and Fourier series is absolutely convergent for fixed $t>0$. This is a mathematical transform, not a standard-physics premise.

As $t\downarrow0$, $\vartheta_4(t)$ is bounded by a constant times $t^{-1/2}e^{-\pi^2/(4t)}$. As $t\to\infty$, $\vartheta_4(t)^3-1=O(e^{-t})$. The integral is finite and strictly negative, because its integrand is negative at every $t>0$. Therefore the original fixed-source verdict is accepted:

$$
S<0,\qquad J=-\omega_{\rm p}^2 I,\qquad
\omega_{\rm p}^2=-KS/(3\ell^2)>0.
$$

This is a restoring receiver derivative with all other sources fixed. It is not a collective stability theorem.

## Full derivative of the delayed row

Write $X_i(T)=\ell i+\epsilon u_i(T)$, $j=i-d$, $r_d=\ell|d|$ and $n_d=d/|d|$. At equilibrium $R_0=r_dn_d$ and $E_0=T-r_d$. Differentiating the causal gap with respect to $\epsilon$ gives the emission-time shift

$$
\delta E=-n_d\cdot[u_i(T)-u_j(E_0)].
$$

The source position evaluated at the shifted root has first variation $u_j(E_0)$: its background velocity is zero, so the product of root shift with background velocity vanishes. The same argument removes a root-shift contribution to the source velocity, because background acceleration is zero. The direction variation inside $n\cdot V_j$ also vanishes at first order because background velocity is zero. Hence

$$
\delta R=u_i(T)-u_j(T-r_d),\qquad
\delta D_t=-n_d\cdot u_j'(T-r_d),\qquad
\delta(D_t^{-1})=n_d\cdot u_j'(T-r_d).
$$

The absolute value has no extra sign on this chart, since $D_t=1$ at the base point and remains positive nearby. Define

$$
H_d=\frac{I-2n_dn_d^{\mathsf T}}{r_d^2},\qquad
B_d=\frac{n_dn_d^{\mathsf T}}{r_d}.
$$

The complete row derivative and the resulting lattice equation are

$$
\delta A_{i\leftarrow j}
=K s_d\{H_d[u_i(T)-u_j(T-r_d)]+B_d u_j'(T-r_d)\},
$$

$$
\boxed{
u_i''(T)=\frac{KS}{3\ell^2}u_i(T)
+K\sum_{d\ne0}s_d
\{-H_d u_{i-d}(T-r_d)+B_d u_{i-d}'(T-r_d)\}.
}
$$

The receiver coefficient retains its neutral-cell meaning. The two delayed source sums are absolutely convergent in the declared exponentially decaying ancient class: $H_d=O(r_d^{-2})$, $B_d=O(r_d^{-1})$ and delayed histories carry $e^{-\eta r_d}$. The row derivation identifies every first-order term; receiver velocity changes the causal playback but does not multiply acceleration. No omitted root exists in the small-history chart.

The infinite correction can also be differentiated as a whole. Split the nonlinear row into its stationary-source value at the current receiver position and its moving-history correction. The first part is controlled by the preceding locally uniform cell bounds. In the second part, the root differs from $T-r_d$ by at most a constant times $\epsilon\|u\|_{\eta,2}$, so the source displacement, velocity and their difference quotients at that root are bounded by a constant times $e^{-\eta r_d}$. Uniform separation and transversality bound the remaining row factors. The resulting summable bounds justify passing the first variation through the source correction; they do not justify nondecaying arbitrary pasts.

Two exact controls expose the sign and factor structure. A receiver-only displacement has derivative $H_d$, with longitudinal eigenvalue $-r_d^{-2}$ and transverse eigenvalues $+r_d^{-2}$. A common time-independent translation has $u_i-u_j=0$ and zero velocity in every individual row, so the complete grouped zero-frequency operator annihilates it. The latter control lies outside the exponentially decaying ancient class and is used only as a separately declared grouped static comparison. It is not an evaluation of the right-half-plane symbol at a generally undefined boundary.

## Wavevector symbol and its convergence domain

Use normalized variables $t=T/\ell$, $v_i(t)=u_i(\ell t)/\ell$ and $\rho_d=|d|$. With $c_f=1$, the dimensionless coupling is $g=K/c_f^2=K>0$. Put

$$
\mathcal H_d=\frac{I-2n_dn_d^{\mathsf T}}{\rho_d^2},\qquad
\mathcal B_d=\frac{n_dn_d^{\mathsf T}}{\rho_d},\qquad Q=(\pi,\pi,\pi).
$$

A spatial mode has a phase $e^{ik\cdot i}$ from site to site. Substitute $v_i(t)=Ue^{\lambda t+ik\cdot i}$, with real $k$ understood modulo $2\pi$ in each component. Then

$$
F(k,\lambda)U=0,\qquad
F(k,\lambda)=\lambda^2I-\frac{gS}{3}I-gM(k,\lambda),
$$

$$
M(k,\lambda)=\sum_{d\ne0}
e^{-\lambda\rho_d-i(k+Q)\cdot d}
[-\mathcal H_d+\lambda\mathcal B_d].
$$

For real $k$ and $\operatorname{Re}\lambda>0$, the matrix sum and every finite derivative are absolutely and locally uniformly convergent. Polynomial powers from differentiation are dominated by exponential decay. Complex $k$ is admitted locally when $|\operatorname{Im}k|_2<\operatorname{Re}\lambda$. The matrix is analytic on that domain. For real $k$ and $\lambda>0$, inversion pairing gives a real symmetric matrix. These claims concern the declared right half-plane; they do not supply imaginary-axis or left-half-plane continuation for nondecaying or growing ancient histories.

At $k=Q$, the phase becomes one, and complete cubic shells give $\sum nn^{\mathsf T}=(\#\text{shell})I/3$. Absolute convergence makes this regrouping legal. Consequently

$$
M(Q,a)=m(a)I,\qquad
m(a)=\frac{aP_1(a)-P_2(a)}3,\qquad a>0,
$$

$$
P_p(a)=\sum_{d\ne0}\frac{e^{-a\rho_d}}{\rho_d^p}.
$$

This is the logarithmic special-mode control. For just the six unit-axis sources it becomes $2(a-1)e^{-a}I$, which also follows by adding their three diagonal dyads directly. The [inverse-square wavevector note](checkerboard-linear-wavevectors.md) has a different special-mode equation; its source-velocity matrix scales as $\rho_d^{-2}$ rather than $\rho_d^{-1}$ and its receiver derivative vanishes. Its growth-rate formula is not imported here.

## A convergent comparison of the small-growth-rate limit

The two positive sums $P_1(a)$ and $P_2(a)$ diverge separately as $a\downarrow0$. Their combination must therefore be controlled before taking the limit. Introduce an auxiliary convergent Gaussian integral,

$$
p(t)=(\pi/t)^{3/2},\qquad
R(t)=\vartheta_3(t)^3-1-p(t),\qquad
C_0=\int_0^\infty R(t)\,dt.
$$

Near zero, the Gaussian transform gives $R(t)=-1+O(t^{-3/2}e^{-\pi^2/t})$. Near infinity, $R(t)=-p(t)+O(e^{-t})$. Thus $R\in L^1(0,\infty)$. The continuum term $p(t)$ is an algebraic device inside an exact identity, not a subtracted acceleration or a selected counterterm in the physical law.

For $a,r>0$, the positive Gaussian-mixture identity is

$$
\frac{e^{-ar}}{r^2}
=\int_0^\infty w_a(t)e^{-t r^2}\,dt,
\qquad
w_a(t)=\operatorname{erfc}\!\left(\frac{a}{2\sqrt t}\right),
$$

where $\operatorname{erfc}(x)=(2/\sqrt\pi)\int_x^\infty e^{-y^2}dy$. One direct proof differentiates the integral in $a$ and uses

$$
J(a)=\int_0^\infty t^{-1/2}e^{-r^2t-a^2/(4t)}dt
=\frac{\sqrt\pi}{r}e^{-ar}.
$$

Indeed, changing $t$ to $a^2/(4r^2t)$ shows $J'(a)=-rJ(a)$ for $a>0$, while $J(0)=\sqrt\pi/r$ by the ordinary Gaussian integral. Differentiating the mixture therefore gives $-e^{-ar}/r$, and its value at $a=0$ is $1/r^2$. Integrating that derivative proves the mixture. The integrands are nonnegative, and the fixed-$a$ differentiated integrals are convergent, so these operations have their usual dominated or positive-integral justification.

Positive-integral interchange over the lattice now gives

$$
P_2(a)=\int_0^\infty w_a(t)[\vartheta_3(t)^3-1]dt
=\frac{4\pi}{a}+\int_0^\infty w_a(t)R(t)dt.
$$

The first term follows by integrating the same positive mixture over $\mathbb R^3$: $\int_{\mathbb R^3}e^{-a|x|}|x|^{-2}dx=4\pi/a$, and $\int_{\mathbb R^3}e^{-t|x|^2}dx=p(t)$. This proves the continuum normalization without a divergent formal subtraction. Since $|w_a|\le1$ and $R\in L^1$, dominated convergence gives $P_2(a)-4\pi/a\to C_0$.

To control the derivative as well, use $P_2'(a)=-P_1(a)$ on $a>0$ and differentiate the convergent remainder on each compact positive interval. Put $x=a/(2\sqrt t)$ and

$$
z_a(t)=-a\partial_a w_a(t)-w_a(t)
=\frac{2x}{\sqrt\pi}e^{-x^2}-\operatorname{erfc}(x).
$$

The continuum term cancels exactly in $-aP_2'(a)-P_2(a)$, leaving

$$
aP_1(a)-P_2(a)=\int_0^\infty z_a(t)R(t)dt.
$$

The bound $|z_a(t)|\le1+\sqrt{2/(\pi e)}$ is uniform in $a,t>0$. On a compact positive $a$ interval, $|\partial_a w_a|\le C/a$ supplies the derivative domination by $|R|$. For each fixed $t>0$, $z_a(t)\to-1$ as $a\downarrow0$. A second dominated-convergence argument therefore proves

$$
\lim_{a\downarrow0}[aP_1(a)-P_2(a)]=-C_0,
\qquad \lim_{a\downarrow0}m(a)=-C_0/3.
$$

The control concerns the limit of the absolutely convergent $a>0$ symbol. It does not assert that its source sum at $a=0$ is absolutely convergent or that an arbitrary stationary population has acquired a new summation convention.

## Strict comparison of the two Gaussian integrals

The decisive inequality is $C_0<S$, not merely the separate negativity of either number. It follows from an explicit Gaussian-series identity. Write $A=\vartheta_3(t)$, $B=\vartheta_2(t)$ and $C=\vartheta_4(t)$. The coordinate change $(m,n)\mapsto((m+n)/2,(m-n)/2)$ preserves the appropriate integer or half-integer parity classes and gives

$$
A(t)^2=A(2t)^2+B(2t)^2,\qquad
B(t)^2=2A(2t)B(2t),\qquad
C(t)^2=A(2t)^2-B(2t)^2.
$$

For the first formula, the new pair is either two integers or two half-integers, and $m^2+n^2$ is twice its squared norm. For the second, begin with two half-integer coordinates: the new pair is one integer and one half-integer, in either order. In the third, the sign $(-1)^{m+n}$ is positive for the integer pair and negative for the half-integer pair. All these double sums are absolutely convergent, so the bijections and products are legitimate. Squaring the first two identities and subtracting yields the quartic identity

$$
A(t)^4-B(t)^4=C(t)^4.
$$

Since $B,C>0$ and $0<C<1$, the strict concavity of $x^{3/4}$ on positive numbers gives

$$
A(t)^3-B(t)^3
=[B(t)^4+C(t)^4]^{3/4}-[B(t)^4]^{3/4}
<[C(t)^4]^{3/4}=C(t)^3<1.
$$

The concavity step can be checked by differentiating $(x+y)^{3/4}-x^{3/4}$ in $x>0$: it decreases strictly from $y^{3/4}$. Applying the Gaussian transforms with $u=\pi^2/t$ gives the pointwise negative integrand

$$
\vartheta_3(t)^3-\vartheta_4(t)^3-p(t)
=p(t)[\vartheta_3(u)^3-\vartheta_2(u)^3-1]<0.
$$

Its integral equals $C_0-S$. Both original integrals are finite by the already established bounds, so there is no subtraction of undefined quantities. Its strict negativity at every $t>0$ proves

$$
C_0<S<0.
$$

This separately reconstructs the inequality needed for the collective verdict; a negative fixed-source response alone would not prove it.

## Positive staggered growth for every coupling

At $k=Q$, the characteristic matrix is the scalar matrix

$$
F(Q,a)=f_g(a)I,\qquad
f_g(a)=a^2-\frac{gS}{3}-g m(a),\qquad a>0.
$$

The convergent comparison proves

$$
\lim_{a\downarrow0}f_g(a)=\frac{g(C_0-S)}3<0.
$$

At infinity $m(a)\to0$. For example, $a e^{-a\rho}\le(2/(e\rho))e^{-a\rho/2}$ and $\rho\ge1$ give a summable domination for the two source terms on $a\ge1$, followed by dominated convergence. Hence $f_g(a)\to+\infty$. It is continuous on $a>0$, so it has at least one positive zero $a_g$ for every $g>0$. No uniqueness, numerical growth-rate interval or simplicity is needed or claimed.

Every nonzero real vector $U$ therefore gives an exact solution of the full linearized equation,

$$
v_i(t)=(-1)^{i_1+i_2+i_3}Ue^{a_g t}.
$$

It is bounded in space, tends to zero exponentially through its complete ancient past, and belongs to the normalized history space for every $0<\eta<a_g$ (or $0<\eta<a_g/\ell$ in original time); its first two time derivatives have the same decay. Its amplitude on $t\le0$ can be chosen arbitrarily small, giving a first variation within the one-root, positive-transversality, no-self-root chart. The solution grows exponentially in the bounded spatial norm of the linearized equation. Thus the equilibrium is linearly unstable in this declared ancient-history class for every positive coupling. The physical growth rate is $a_g/\ell$ in the chosen wake-speed units.

This solution is an infinite-support spatial perturbation. It is not an exact nonlinear logarithmic trajectory, an unforced nonlinear preparation or a finite disturbance. Linear growth cannot be extrapolated through loss of small displacement, a wake-speed event, coincidence or a singular root. The theorem does not manufacture a generalized continuation at any such event.

There is also an open neighborhood of staggered wavevectors with positive real characteristic roots. Choose $0<a<b$ so that $F(Q,a)$ is negative definite and $F(Q,b)$ positive definite; the preceding limits ensure such choices. Continuity of the absolutely convergent matrix sum preserves both signs for real $k$ sufficiently close to $Q$. The ordered eigenvalues of the real symmetric matrix $F(k,\lambda)$ are continuous in real $\lambda$. Each moves from a negative value at $a$ to a positive value at $b$ and therefore has a zero in $(a,b)$. This gives positive real crossings in that neighborhood without assuming eigenvector branches, a simple root or a monotonic matrix derivative. It does not calculate all roots or all wavevectors.

The bounded linear equation has a directly checkable finite-time construction: its shortest source delay is one in normalized variables, so on each interval of length at most one all delayed source values are already given. The current receiver term is a constant-coefficient ordinary equation with continuous forcing. At each finite horizon the remote delayed tail is still exponentially bounded by the supplied ancient history, while only finitely many source distances reach the newly constructed interval. Successive intervals therefore give a unique finite-time linear continuation for continuous displacement/velocity histories, with the usual physical compatibility. A full generator spectrum in a selected strongly continuous phase-space realization, a square-summable localized nonlinear instability theorem and nonlinear well-posedness remain separate obligations; the explicit growing linear solution does not require those results.

## Checks, disposition and limits

The separately authored [bounded comparison instrument](../../../../../scripts/lattice-research/logarithmic-collective-independent-controls.py) was run with the executable shared interpreter, `${AAA_VENV:-../.venv}/bin/python`, which reported Python 3.13.2. The controls were selected and recorded before the target command: a stationary row at range two has transverse derivative $1/4$ and longitudinal derivative $-1/4$; the single-Gaussian mixture at $a=1,r=2$ equals $e^{-2}/4$; and the six-axis staggered symbol at $a=2$ equals $2e^{-2}I$. The local control receipt (`.local-data/logarithmic-lattice/independent-controls.json`, ignored runtime evidence) reports a maximum stationary-row difference error of $6.25\times10^{-26}$ and zero reported 50-digit errors for the other two controls. The target refuses to run without a passing control receipt from the same instrument bytes.

**Claim grade: measured.** The local target receipt (`.local-data/logarithmic-lattice/independent-target.json`, ignored runtime evidence), from non-interval 50-digit `mpmath` quadrature of the convergent transformed integrals, reports $S\approx-2.5193561520894453$, $C_0\approx-8.9136329175851513$, and $C_0-S\approx-6.3942767654957060$. The same instrument reports negative and positive sampled $f_1$ values at $a=0.5$ and $a=1$, and negative and positive sampled $f_{16}$ values at $a=1$ and $a=2$. Those decimals and sampled brackets are corroborative measurements, not interval certificates; the all-coupling sign and existence theorem is the analytical proof above. The receipt binds the instrument, passing controls and preserved static subject by SHA-256. A different independent evaluation of these same convergent integrals outside the reported precision would refute the measured values without automatically refuting the analytical inequalities.

Reproduction commands, in order, are:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/lattice-research/logarithmic-collective-independent-controls.py controls
"${AAA_VENV:-../.venv}/bin/python" scripts/lattice-research/logarithmic-collective-independent-controls.py target
```

The assigned mathematical task is complete at its declared scope: an independent static adjudication, a full ordinary-root collective linear operator, an explicit convergence/history domain and an all-positive-coupling linear instability consequence are supplied. The coordinator owns queue closure and integration. No source proof, shared queue, corpus, production solver, regular test inventory or generated file was changed, and no Git mutation was performed. Scoped file and whitespace validation is recorded separately with the completion report.

The remaining obligations are precise. A nondecaying arbitrary complete past needs its own source and derivative-tail summation argument. Boundary values at $\operatorname{Re}\lambda=0$ and left-half-plane roots need a declared analytic or distributional realization; the present absolute convergence domain does not provide one. Uniqueness and multiplicity of staggered growth rates, the entire characteristic spectrum, a localized square-summable growth construction, nonlinear logarithmic evolution and later event ordering are not established. No constituent assembly qualification, stable Noether sea or physical adoption of the logarithmic kernel follows.

Falsifiers are a nonsummable integrated neutral-cell bound; failure of the Gaussian identities in this exact prescription; a missing term in the root variation; failure of the six-axis or rigid-translation controls; failure of the Gaussian-mixture remainder domination; an error in the parity bijections or strict concavity inequality; or a failure of the explicit mode to satisfy the full displayed linear equation. Each can be checked at the corresponding formula above. Changing the summation, history class, radial exponent, transmitter weight or root-admission rule changes the scenario and cannot overturn this theorem without identifying which assumption was replaced.
