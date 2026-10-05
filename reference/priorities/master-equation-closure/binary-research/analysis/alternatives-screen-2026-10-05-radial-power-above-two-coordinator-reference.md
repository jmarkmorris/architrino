# Coordinator reconstruction for fixed radial exponents between two and three

## Independence and proposed claim

This reconstruction was developed before reading the separately assigned above-two derivation. Its inputs are the already assessed [fixed-power preparation](alternatives-screen-2026-10-05-radial-power-family-preparation.md), [transition](alternatives-screen-2026-10-05-radial-power-family-transition.md), [global equations](alternatives-screen-2026-10-05-radial-power-family-global.md) and [terminal-selection argument](alternatives-screen-2026-10-05-radial-power-family-zero-speed.md). Those frozen sources remain unchanged. **Grade: derived candidate extension, requiring comparison with a separately constructed argument before shared integration.** This note identifies the two points where simply replacing the exponent range in the old proof would be invalid, and supplies different arguments for them.

Fix $2<p<3$, $K=R_*=c_f=1$, the complete mirror circle-tail preparation with its exact endpoint patch, and sufficiently small positive physical release speed $\epsilon$. Put

$$
c=p-1\in(1,2),\quad k=3-p=2-c>0,\quad
A=2/k,\quad \ell=1/c\in(1/2,1),\quad
\nu=k/c\in(0,1).
$$

The intended result is the same explicit-family global uniformly subfield dispersal, finite total angle and radial terminal velocity, together with zero-speed parameters accumulating at zero. It is not uniform as $p\uparrow3$, does not include $p=3$, and does not change the law during a trajectory. No numerical threshold or positive-terminal-speed example is supplied.

## Local preparation and transition retain their smooth domain

The scale is $r_0=(2^p\epsilon^2)^{-1/c}$ and $s=\epsilon T/r_0$. The complete scaled history is the unit circle plus $B_p\phi_d$ on $[-d,0]$, where $d=\epsilon/16$, $\phi_d=(d^2/2)z_p^3(1-z_p)^2$, $z_p=1+s/d$, and

$$
B_p=(1,0)-\frac{(\cos\xi,-\sin\xi)}{\cos^p\xi(1+\epsilon\sin\xi)},
\qquad \xi=\epsilon\cos\xi.
$$

The release source is at $s=-2\xi<-d$. Position and velocity match the circle at release and the patch corrects the acceleration exactly. For every fixed exponent, $B_p=O_p(\epsilon)$; the complete preparation is separated, locally $C^{2,1}$ and has physical speed at most $\epsilon(1+C_p\epsilon^2)$. Constants in this paragraph are bounds, unrelated to the asymptotic radius coefficient also traditionally denoted $C_p$.

All local source and signed response expansions in the existing transition argument occur on a compact neighborhood of scaled radius one. There the exponent-dependent powers are smooth for this fixed $p$. Its central potential has second derivative $k>0$, its corrected launch seed is $J(0)=A\epsilon/\sqrt2+O_p(\epsilon^3)$, and its averaged squared-amplitude growth coefficient is

$$
\gamma_p=\frac{pc}{k}>0.
$$

Consequently its finite-transition inequalities carry over with new exponent-dependent constants: $a_b\asymp_p\epsilon^{-4/(pc)}$, $\delta_b\asymp_p\epsilon^{(p+2)/p}$ and $T_b\asymp_p\epsilon^{-2(p+2)/c}$. The proof still preserves a nonzero seed and arbitrarily many actual radial oscillations as $\epsilon\downarrow0$. This continuation of the local proof uses smoothness only near the nondegenerate central minimum, not at the later endpoint $z=0$.

## Actual complete-window equations

As before, let $h=Y\times Y'$, $a=h^{2/k}$, $x=|Y|/a$, $y=a^{c/2}|Y|'$, $\delta=\epsilon a^{-c/2}$, and set $z=x^{-c}$. The weighted time is defined by $d\chi/ds=a^{-(p+1)/2}x^{-p}$. On a fixed whole box containing the transition and its outward continuation, the exact complete-history response has

$$
z_\chi=-cy+Ac\delta z+O_p(\delta^2z),
$$

$$
y_\chi=z^\nu-1+C\delta y+O_p(\delta^2),
\qquad C=\frac{c(p-2)}k,
$$

$$
\delta_\chi=-\frac ck\delta^2+O_p(\delta^3),
\qquad (\log a)_\chi=A\delta+O_p(\delta^2).
$$

The radial remainder is proportional to $z$. Its derivation uses the same complete source comparison: small physical speed first compares source radius, positive delayed torque makes $h$ increasing, and $h'/h\le C_p\epsilon r^{-p}$ controls scale variation over the entire source interval. In particular $|\log(h(S)/h(T))|\le C_p\delta^2z$. The delayed transverse projection keeps its factor $\epsilon v$, rather than absorbing it into an unweighted acceleration error. None of those estimates uses $\ell\ge1$ or $\nu\ge1$; the latter inequalities mattered only for the old auxiliary differentiability and a later phase-error simplification. The physical speed in these coordinates is $\delta\sqrt{y^2+z^{2/c}}$ and remains uniformly small on the box.

## Continuous central flow suffices for complete-period comparison

Extend the central equation solely as a comparison system:

$$
z_\chi=-cy,\qquad
y_\chi=\operatorname{sgn}(z)|z|^\nu-1,
$$

with scalar

$$
e=\frac{y^2}{2}+W(z),\qquad
W(z)=\frac12|z|^{2/c}-\frac zc.
$$

Here $W$ is $C^1$, but its second derivative need not exist at zero. The vector field is continuous and is not locally Lipschitz there. Nevertheless the chain rule gives $e'=0$ for every classical solution. On any compact annulus of levels strictly above the unique minimum, the vector field is nonzero and each level is a regular closed $C^1$ curve. A trajectory on one such curve is uniquely determined by integrating inverse nonzero tangential speed along its arclength. This proves uniqueness even at $(z,y)=(0,0)$: the potential derivative there is $-1/c$, and the vector field there is $(0,-1)$, not zero. Local existence follows by the continuous-vector-field existence theorem or directly by this energy quadrature.

This also proves continuous dependence uniformly on compact portions of the annulus. Indeed a sequence of bounded solutions with converging initial points has an equicontinuous subsequence; its limit solves the integral equation for the continuous vector field, and uniqueness identifies the limit. Every subsequence has the same limit. The same compactness argument applies to uniformly vanishing additive perturbations. No derivative of the auxiliary flow is required.

The central period $Q(e)$ is continuous and bounded above and below by positive constants on a compact level interval away from the minimum. Energy quadrature proves this: the two turning points are simple and vary continuously, the endpoint singularities are bounded by constant multiples of the integrable inverse square root, and the interior integrand is uniformly continuous. The action integral $I(e)=\oint y^2\,d\chi$ is likewise continuous and strictly positive. A derivative of $Q$ or $I$ is unnecessary.

For the actual positive-$z$ equations,

$$
e_\chi=\delta F(z,y)+O_p(\delta^2),\qquad
F=Cy^2+A(|z|^{2/c}-z).
$$

On a central closed orbit, integration of $(zy)'=-cy^2+z(\operatorname{sgn}(z)|z|^\nu-1)$ gives

$$
\oint F\,d\chi=(C+Ac)I(e)=\gamma_p I(e)>0.
$$

Take a fixed compact level annulus with entry level separated from its lower boundary and with upper boundary at positive energy. Start an actual block at any point in this annulus and run for the central period $Q(e_{start})$, unless the physical endpoint $z=0$ occurs earlier. Since $\delta'=O(\delta^2)$, its change over a block is $O(\delta_{start}^2)$. Compactness and the preceding unique central flow show uniformly that the actual path differs by $o(1)$ from its central path as $\delta_{start}\to0$. The continuity of $F$ therefore gives

$$
e_{end}-e_{start}
=\delta_{start}\gamma_p I(e_{start})+o(\delta_{start})
\ge c_0\delta_{start}>0.
$$

This proof uses only the actual path before its endpoint. If a central path crosses into negative $z$, while an alleged actual path survives throughout the block in positive $z$, uniform convergence up to a fixed negative central sample yields a contradiction. There is no physical continuation through zero.

Within each block $|e-e_{start}|\le C_0\delta_{start}$, so a sufficiently small entry $\delta_b$ prevents a downward exit through the lower energy boundary. The endpoints increase. If infinitely many blocks stayed in the annulus, the period bounds would give $\chi_n\asymp n$, while the differential inequality for $\delta$ gives $\delta(\chi)\ge c_1/(1+C_1\chi)$. Thus $\sum_n\delta(\chi_n)$ diverges, contradicting the bounded energy and the positive block increments. In finite weighted time the solution therefore reaches $z=0$ or a fixed positive energy. In the latter case a central outgoing passage into negative $z$, over a bounded time with fixed negative sample, forces the actual positive-$z$ endpoint by the same continuous comparison. Enlarging the box once contains the compact central arcs and their small perturbations.

This replaces the old $C^1$ action corrector. Reusing that corrector without this replacement would be an unproved step for $2<p<3$.

## Physical endpoint and angle

At the finite weighted endpoint, the bounded equations give finite limits, with $a_\infty\in(0,\infty)$, $\delta_\infty>0$ and $y_\infty\ge0$. If $y_\infty>0$, then $z\asymp\Delta$, where $\Delta=\chi_\infty-\chi$. If $y_\infty=0$, the equation for $y$ gives $y\asymp\Delta$ and then $z\asymp\Delta^2$. The physical time integral diverges in both cases because $dT/d\chi$ has factor $z^{-p/c}$. Radius tends to infinity and the physical velocity tends to the outward radial vector, zero in the second case. Areal rate tends to the positive finite value $H_\infty=\epsilon r_0a_\infty^{k/2}$.

The angular equation is

$$
\theta_\chi=z^{(2-p)/(p-1)}=z^{-\kappa},\qquad
\kappa=\frac{p-2}{p-1}\in(0,1/2).
$$

It is integrable at both endpoints: like $\Delta^{-\kappa}$ at positive speed and $\Delta^{-2\kappa}$ at zero speed. This is the precise place where the strict upper exponent bound matters. Consequently total polar angle is finite, the velocity limit is Cartesian, and the actual complete speed margin certifies one partner root and no positive-delay self root at every physical time. The [conditional exact radial asymptotics](alternatives-screen-2026-10-05-radial-zero-speed-asymptotics.md) then apply to any zero-speed member once existence is independently established.

## The weighted phase requires a different error estimate

Let $x_\delta=1+O_p(\delta^2)$ be the smooth local corrected center inherited from the transition calculation, and define

$$
\mathcal W=U+iV
=\sqrt{k}(1-x_\delta z^\ell)
+i\big(z^\ell y-A\delta z^{\ell+1}\big).
$$

For the central parts $U_0=\sqrt{k}(1-z^\ell)$ and $V_0=z^\ell y$, direct differentiation gives

$$
U_0V_0'-V_0U_0'
=-\sqrt{k}\left[z^{\ell-1}y^2+
z^\ell(z^\ell-1)(z^\nu-1)\right].
$$

The bracket is positive away from the central minimum. For $z\le1/2$, it is at least $z^{\ell-1}y^2+c_2z^\ell$ for a fixed positive $c_2$. On the remaining compact region the scalar gap away from the minimum provides strict positivity.

The previous proof simplified all determinant errors to $O(\delta z^\ell)$ using $\ell\ge1$. That simplification is false in the present range. Retain instead

$$
\left|(UV'-VU')-(U_0V_0'-V_0U_0')\right|
\le C_2\left(\delta z^\ell+
\delta^2z^{2\ell-1}y^2\right).
$$

To see the weights, $U-U_0=O(\delta^2z^\ell)$, $V-V_0=O(\delta z^{\ell+1})$, $U'-U_0'=O(\delta z^\ell+\delta^2z^{\ell-1}|y|)$ and $V'-V_0'=O(\delta z^\ell|y|+\delta^2z^\ell)$ on the whole bounded box. Products with the central derivatives give exactly the displayed bound. The second error divided by the leading $z^{\ell-1}y^2$ is at most $C_2\delta^2z^\ell$; the first is absorbed by $c_2z^\ell$. Thus sufficiently small fixed $\delta_b$ preserves a strictly decreasing lifted phase throughout the outer interval. The blockwise scalar gap also keeps $\mathcal W$ nonzero. Its limit at either endpoint is the positive real number $\sqrt{k}$.

The local transition supplies a diverging number of phase turns as $\epsilon\downarrow0$. The outer phase cannot reverse them. The finite endpoint limit supplies an integer terminal winding count tending to negative infinity. At every positive-terminal-speed parameter, the same finite physical-history continuity and positive terminal strip used in the earlier selection proof give local constancy of this integer. Those arguments take place at $z>0$ and use only bounded endpoint rows, not a derivative of the central field at zero. If a whole interval of sufficiently small launches had positive terminal speed, connectedness would force its integer constant, contradicting divergence. Zero-terminal-speed parameters therefore accumulate at zero, subject to the independently checked global extension.

## Limits and falsifiers

No negative auxiliary coordinate represents a physical radius. No argument differentiates the fractional central field at zero, assumes a conserved physical energy, or replaces the complete delayed source by a current source. The result is existential for each fixed exponent. Constants may diverge at either excluded endpoint, and $p=3$ changes the minimum, the weighted scaling and the angular integrability. Positive-terminal-speed existence, located zero parameters, density, discreteness, uniform convergence rates and nonmirror robustness remain open.

Falsifiers are an omitted source-scale term in the proportional radial remainder, failure of uniqueness on a regular central energy oval, failure of uniform block comparison or the strictly positive averaged increment, an erroneous weighted determinant estimate, or a zero-speed endpoint whose angular integral diverges for $p<3$. Each is a concrete mathematical step above. Validation is analytical; there is no numerical target or background process in this construction.
