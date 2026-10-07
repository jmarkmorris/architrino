# Compact slow families cannot escape through scale degeneration

## Statement and scope

Claim grade: derived, initially self-reviewed. Consider exact canonical six-member histories with $K=c_f=1$, all ordinary positive-delay roots, and
$$
X_j(t)=R\bigl(\rho(\phi)\cos[\epsilon b t/R+p(\phi)+j\pi/3],\,
\rho(\phi)\sin[\epsilon b t/R+p(\phi)+j\pi/3],\,(-1)^j\zeta(\phi)\bigr),
\qquad \phi=\epsilon k t/R.
$$
Let $\epsilon\to0^+$ along a sequence. Suppose the real $2\pi$-periodic profiles have a common $C^2$ bound, a common positive radius floor $r_->0$, and upper bounds $\rho\le r_+$ and $|\zeta|\le Z$. Suppose also $b$ and $k$ stay in fixed compact subsets of $(0,\infty)$. No waveform truncation is imposed.

Then $\lambda_\epsilon=R\epsilon^2$ lies in a compact subinterval of $(0,\infty)$ for all sufficiently small $\epsilon$. Thus every such sequence has a subsequence with a finite positive scale limit. If the profiles and rates additionally converge in $C^2$ and ordinarily, respectively, the limit satisfies the previously derived normalized radial/axial equation and both necessary period conditions. The scale hypothesis is therefore a consequence of these compact-family assumptions, rather than an independent escape route.

This statement does not supply uniformity when radius collapses, amplitudes or derivatives diverge, or the mean rotation rate tends to zero. It addresses hypothetical exact slow families, not the existence of any such family.

## Uniform acceleration and the absence of a simultaneous zero

Write the dimensionless canonical acceleration as $A_\epsilon$. Bounded profile derivatives and rates make every source's physical speed $O(\epsilon)$ uniformly. For sufficiently small $\epsilon$, the complete-past monotonic-gap argument supplies precisely the five partner roots and no positive self roots. Uniform separation and bounded acceleration give
$$
A_\epsilon=A^{(0)}+O(\epsilon)
$$
uniformly in phase and throughout the family, by the [independent row expansion](overnight2-b-independent-slow-mean.md). Only this zeroth-order convergence is required here.

The simultaneous acceleration is
$$
A_r^{(0)}=\frac1{\sqrt3\,\rho^2}
-\frac{\rho}{(\rho^2+4\zeta^2)^{3/2}}
-\frac{\rho}{4(\rho^2+\zeta^2)^{3/2}},
\qquad
A_z^{(0)}=-\frac{4\zeta}{(\rho^2+4\zeta^2)^{3/2}}
-\frac{\zeta}{4(\rho^2+\zeta^2)^{3/2}},
$$
and $A_t^{(0)}=0$. If $A_z^{(0)}=0$, its strict restoring sign forces $\zeta=0$. At that point
$$
A_r^{(0)}=-\frac{5/4-1/\sqrt3}{\rho^2}<0.
$$
Consequently $A^{(0)}$ never vanishes on the compact rectangle $[r_-,r_+]\times[-Z,Z]$. Continuity gives constants
$$
m=\min|A^{(0)}|>0,\qquad B=1+\max|A^{(0)}|<\infty.
$$
Choose $\epsilon$ small enough that the uniform difference is below $\min(m/2,1)$. Then $|A_\epsilon|\ge m/2$ and $|A_\epsilon|\le B$ everywhere. These are existence bounds from a continuous function on a declared compact set; no numerical value for the threshold is claimed.

## Lower and upper scale bounds

Put $\omega=b+kp'$ and define the base acceleration
$$
L_0=(k^2\rho''-\rho\omega^2,\,
2k\rho'\omega+\rho k^2p'',\,k^2\zeta'').
$$
The exact equation is
$$
\lambda_\epsilon L_0=A_\epsilon.
$$
The common profile and rate bounds give a finite $L_*>0$ with $|L_0|\le L_*$. Therefore
$$
\lambda_\epsilon\ge \frac{m}{2L_*}>0.
$$
Taking $L_*$ larger than the supremum avoids any need to assume that this supremum itself is positive.

For the opposite inequality, let angle brackets denote a uniform full-phase average. Periodic integration by parts gives
$$
\langle\rho L_{0,r}+\zeta L_{0,z}\rangle
=-\langle k^2(\rho')^2+\rho^2\omega^2+k^2(\zeta')^2\rangle.
$$
The nonnegative expression on the right has mean at least $r_-^2b_-^2$, where $b_->0$ is the common lower rotation-rate bound. Indeed, $\langle\omega\rangle=b$ because $p$ is real periodic, and Cauchy–Schwarz gives $\langle\omega^2\rangle\ge b^2$. Exact balance and the acceleration bound now imply
$$
\lambda_\epsilon r_-^2b_-^2
\le-\langle\rho A_{\epsilon,r}+\zeta A_{\epsilon,z}\rangle
\le \sqrt{r_+^2+Z^2}\,B,
$$
hence
$$
\lambda_\epsilon\le
\frac{\sqrt{r_+^2+Z^2}\,B}{r_-^2b_-^2}<\infty.
$$
The first inequality also shows that the middle average must be positive for an exact history. No sign assumption on the simultaneous primitive was needed to obtain these bounds.

## Consequences for the limiting angular motion and height

For a subsequence with $\lambda_\epsilon\to\lambda>0$ and $C^2$ profile convergence, use the already checked normalization $\chi=\epsilon t/(R\sqrt\lambda)$. The limiting base tangential equation gives
$$
\ell=r^2\frac{d\theta}{d\chi}
=\sqrt\lambda\,\rho^2(b+kp')
$$
constant. Averaging the equivalent identity $b+kp'=\ell/(\sqrt\lambda\,\rho^2)$ yields
$$
\ell=\frac{\sqrt\lambda\,b}{\langle\rho^{-2}\rangle}>0.
$$
Thus a positive mean rotation rate excludes the $\ell=0$ limiting branch within these hypotheses.

The necessary torque condition becomes
$$
0=M_\chi=\ell\left\langle\frac{C(z/r)}{r^2}\right\rangle_\chi,
\qquad
C(h)=\frac{2-4h^2}{(1+4h^2)^2}-\frac23+\frac1{4(1+h^2)}.
$$
Writing $x=h^2$ gives exactly
$$
C(h)=\frac{19-72x-192x^2-128x^3}{12(1+4x)^2(1+x)}.
$$
The numerator is strictly decreasing for $x\ge0$, so it has one positive zero $x_C$. Put $h_C=\sqrt{x_C}$. Direct rational substitution puts
$$
\frac25<h_C<\frac12.
$$
Every nonzero periodic axial solution changes sign: the equation $\ddot z=-z\,a(r,z)$ has $a>0$, and a nonzero fixed-sign periodic $z$ would contradict $\langle\ddot z\rangle=0$. Such an orbit crosses $h=0$ and spends a nonempty interval where $C>0$. Since $\ell>0$, the torque mean can vanish only if another nonempty interval has $C<0$. Therefore
$$
\max_\chi |z/r|>h_C.
$$
The planar case $z\equiv0$ has strictly positive torque mean and is likewise excluded as a limit of exact slow families in this compact class.

Together with the [negative-first-integral confinement theorem](overnight2-b-limit-height-confinement.md), this confines any admissible limiting shape to
$$
h_C<\max_\chi|z/r|<h_U,\qquad
\frac25<h_C<\frac12,\qquad \frac{11}{10}<h_U<\frac98.
$$
The upper inequality is strict because the periodic orbit attains its maximum and the pointwise confinement is strict. This is a necessary height range; it asserts neither existence nor full-vector balance.

## Verification boundary and falsifiers

Independent review is pending. The compactness argument requires the complete ordinary chart and a uniform small-speed acceleration estimate. A failure of that uniform estimate, a simultaneous zero of the displayed acceleration on positive radius, an incorrect integration-by-parts sign, or loss of the positive lower mean rotation rate would invalidate the corresponding scale argument. The limit equation requires the stated derivative convergence; compact scale bounds alone do not assert $C^2$ subsequential compactness. The angular and height consequences additionally require the independently checked torque condition and confinement theorem. None of these statements addresses finite speeds, unbounded profile families, vanishing-radius sequences or vanishing mean rotation.

No numerical target or production solver was run for this derivation. The parent will integrate the independent disposition into the second-allocation report while preserving this frozen subject and prior evidence.
