# Independent explicit positive-branch parameter interval

Claim grade: derived analytical reference, frozen before the coordinator's new interval candidate is disclosed. Put $e=2^{-200000}$. The original [case](authorized-cases-ten-hour-b-case.md), its [quantitative admission](authorized-cases-ten-hour-reference-b-adjudication.md), the [accepted initial and slow coefficients](authorized-cases-ten-hour-reference-b-input-slow-acceptance.md), and the [corrected zero-branch implication](authorized-cases-ten-hour-reference-b-zero-branch-adjudication.md) are the inputs. The already independently enclosed critical phase at $e$ has distance greater than $1.77$ from $2\pi\mathbb Z$. No new numerical evaluation is used here.

The explicit one-sided interval

$$
 \boxed{\quad e-2^{-30}e^{10}\le\varepsilon\le e\quad}
 \tag{1}
$$

is nonempty and belongs to the previously admitted range. Its width is $2^{-2000030}$. Every member uses the original compatible degree-five preparation rule, its original fixed cutoff and analytic compatibility branch, and the unchanged amplitude-gradient response with $K=c_f=1$. The conclusion below concerns this one-parameter family only.

## Holomorphic control of the finite expression

Only the finite comparison expression is complexified. No complex physical history or additional smoothness of an actual sixth-order seam is asserted. Write the accepted initial polynomials as

$$
 Q(z)=z^3 Z(z),\qquad \delta_0(z)=z d(z),\qquad
 Z(0)=-8i/3,\quad d(0)=1.
$$

The accepted sum of coefficient norms is below $2^{4096}$. Thus on $|z-e|\le e/4$, the higher parts obey $|Z+8i/3|\le2^{4096}|z|$ and $|d-1|\le2^{4096}|z|^2$. Let $Z_r,Z_i$ denote the polynomials with the real and imaginary coefficients of $Z$, evaluated at the complex argument $z$, and set

$$
 A(z)=Z_r(z)^2+Z_i(z)^2,\qquad I_0(z)=z^6A(z).
$$

This is the analytic continuation of the real squared amplitude, not complex conjugation of a variable argument. The displayed norm bounds imply $|A-64/9|<1/1000$, $|d-1|<1/1000$, and therefore

$$
 |I_0|>e^6,\qquad e/2<|\delta_0|<2e.
 \tag{2}
$$

Choose $x_0=z^2A(z)^{1/3}$ by the branch positive on the real interval. Then $e^2<|x_0|<4e^2$, $|\arg x_0|<3/5$, and $B=x_0^{-1}$ lies in a fixed right-hand sector. In particular $\Re B>(4/5)|B|$ and $|B|>10$.

Here is a uniform complex extension of the previously accepted slow-map majorant; it also controls differentiation with respect to the endpoint parameter. For fixed such $I_0$, use the straight path $b(u)=1+u(B-1)$, $0\le u\le1$. Then

$$
 |I_0b(u)^3|=|(1-u)x_0+u|^3\le1,\qquad
 |b(u)|\ge1,\qquad
 \int\frac{|db|}{|b|^2}<2.
 \tag{3}
$$

The last inequality follows by replacing $|b|$ by $\Re b$ and integrating: the result is $|B-1|/\Re B<2$. Also $\int |b|^2|db|<2|B|^3$. These are path estimates, so no real ordering of the complex endpoint is presumed.

For an auxiliary initial parameter $|\zeta|\le\rho=2^{-10000}$, solve the same retained slow equation

$$
 k_b=\frac{k}{b}F(I_0b^3,\zeta k/b),\qquad k(1)=1,
 \qquad F=1+\frac{3B_{\mathrm{normal}}}{2\Lambda}.
$$

The accepted coefficient norm on $|I|\le4$ gives, also for complex $|I|\le1$ and $|\delta|\le2\rho$,

$$
 |F(I,\delta)|\le2^{4100}|\delta|,\qquad
 \left|H(I,\delta)\right|<2,\qquad
 H=\frac{\Omega}{\Lambda/\delta^3}.
$$

These follow from the leading cancellation in $F$, the leading denominator two, and the same absolute coefficient sums used in the [slow method admission](authorized-cases-ten-hour-reference-b-next-map-admission.md). On $|k-1|\le1/2$, integration using (3) bounds $|k-1|$ by $2^{4103}\rho<1/4$. This closes the bootstrap and proves holomorphic dependence. The normalized phase

$$
 T(I_0,\zeta)=I_0\int_1^B\frac32 b^2k^{-3}H\,db
$$

has modulus below $64$: use $|k|>3/4$, (3), and $|I_0||B|^3=1$. Its degree-thirteen Taylor polynomial in $\zeta$, evaluated at $\delta_0(z)$, consequently has modulus below $128$ by Cauchy's coefficient estimate and $2e/\rho<1/2$. The analogous degree-thirteen endpoint polynomial $k_{13}$ has $|k_{13}-1|<1/4$. The exact identities in the accepted slow audit identify these Taylor polynomials with the retained Laurent-logarithmic expressions, including their endpoint constants and logarithms. The branch of $\log x_0$ is fixed continuously in this disk.

The initial lifted phase is the analytic branch

$$
 \psi_0(z)=-\pi/2+\arctan\frac{Z_r(z)}{-Z_i(z)},
$$

whose modulus is below four. Thus the exact finite expression used by the independently accepted scalar calculation,

$$
 \Theta(z)=\psi_0(z)+\frac{T_{13}(I_0(z),\delta_0(z))}{I_0(z)\delta_0(z)^3}
 +\frac{5}{8\delta_0(z)x_0(z)k_{13}(I_0(z),\delta_0(z))}-\pi,
 \tag{4}
$$

is holomorphic throughout the disk and satisfies

$$
 |\Theta(z)|<2^{12}e^{-9}.
 \tag{5}
$$

Indeed the phase-increment term is at most $2^{10}e^{-9}$ by (2); the reciprocal endpoint correction is below $2e^{-3}$; the remaining terms are below eight. Cauchy's estimate on radius $e/8$ about any real point within $e/8$ of $e$ yields

$$
 |\Theta'(\varepsilon)|<2^{15}e^{-10}<2^{20}e^{-10}.
 \tag{6}
$$

This is a deliberately conservative bound on the full finite expression. It does not discard logarithms or infer a derivative from the leading phase alone.

## Uniform physical implication

Throughout (1), (6) gives $|\Theta(\varepsilon)-\Theta(e)|<2^{-10}$. Distance to $2\pi\mathbb Z$ is one-Lipschitz, so

$$
 \operatorname{dist}(\Theta(\varepsilon),2\pi\mathbb Z)>1.7.
 \tag{7}
$$

The original all-future dichotomy and quantitative admission hold for $0<\varepsilon\le e$. Their compatibility, layer, normal-map and phase estimates use the same coefficient bounds and constants, with positive powers of $\varepsilon$ in the smallness conditions. The initial amplitude and parameter bounds used in those estimates follow uniformly from the same coefficient norm above. Consequently the corrected zero-terminal-speed implication remains

$$
 |V_\infty|=0\quad\Longrightarrow\quad
 \operatorname{dist}(\Theta(\varepsilon),2\pi\mathbb Z)
 <2^{191000}\varepsilon^2\le2^{-209000}.
 \tag{8}
$$

Its domain is the parabolic chart retained by a hypothetical zero branch, not a claim that the physical chart survives to a transverse zero of $w$. Equations (7) and (8) contradict one another. Every member in (1) therefore has the positive-terminal-speed alternative of the accepted exact outgoing-tail theorem: its physical vector velocity has a nonzero limit, and its separation divided by physical time tends to twice that limit's magnitude.

No common numerical terminal speed is inferred here. This is an explicit interval in the original preparation parameter, not a neighborhood in the space of arbitrary complete histories. Its falsifiers are a failure of the accepted uniform parameter range, a missing coefficient in (4), a complex denominator zero contrary to the absolute bounds, or an error in the original independently enclosed phase gap. The sole newly written artifact is this reference; no evaluator, physical trajectory, or additional compute process was launched.
