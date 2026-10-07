# Intrinsic phase transport for the admitted nonplanar history ball

**Derived extension candidate, awaiting the nominal proof and independent assessment.** The [nominal phase-fate subject](overnight2-a-nominal-phase-fate.md) uses a planar angle to compare the radial direction with a corrected eccentricity direction. An instantaneous orbital plane can rotate under a nonplanar perturbation. This note derives a way to make that comparison in a parallel-transported orthonormal frame, preserving every normal term. It is a finite-branch argument and does not assume a limiting physical plane.

The selected physical class is exactly the already admitted full spatial ball in the [finite-radius owner](authorized-cases-followup-d-finite-radius-bootstrap.md), equations (29)–(31), with its [independent assessment](authorized-cases-followup-reference-d-finite-radius-assessment.md). Fix each original complete nominal extension with complete speed bound $b_0<1$. Perturb both supplied histories independently, with their original regularity and

$$
\|\delta X\|_{\mathcal H}<\delta_*=
\min\{10^{-20},(1-b_0)/(2\epsilon)\},
$$
$$
\|\delta X\|_{\mathcal H}
=\max_i\left\{|\delta X_i(0)|
+\epsilon^{-1}\|\delta X_i'\|_{L^\infty(-\infty,0]}
+\epsilon^{-2}\|\delta X_i''\|_{L^\infty([-7,0])}\right\},
$$

with $R_0=c_f=1$. This norm controls the entire past, including remote velocity and recent acceleration; present-state closeness alone does not meet it. The original literal $w,\Delta,q,\kappa$ and canonical equation remain those of the nominal subject. No source completion, response law or geometry population is added.

## A frame that keeps normal motion explicit

Use $Y=(X_+-X_-)/2$, $s=\epsilon T$, $r=|Y|$, $h=|Y\times Y_s|$, $n=Y/r$, $\ell=(Y\times Y_s)/h$ and $t=\ell\times n$. On the retained negative branch, the angular lower bound makes all these variables regular. Define the strictly increasing angular clock by $\theta_s=h/r^2$. The [independent spatial-frame derivation](overnight2-a-reference-spatial-seed.md) gives

$$
n_\theta=t,\qquad t_\theta=-n+\zeta\ell,
\qquad \ell_\theta=-\zeta t,
\qquad \zeta=r^3A_\ell/h^2.
\tag{1}
$$

The normal term is not set to zero. Let $a,b$ be the orthonormal frame in $\ell^\perp$ obtained from $a(0)=n(0)$, $b(0)=t(0)$ and

$$
a_\theta=-\ell(\ell_\theta\cdot a),\qquad
b_\theta=-\ell(\ell_\theta\cdot b).
\tag{2}
$$

Differentiation verifies preservation of all inner products, orthogonality to $\ell$ and orientation $b=\ell\times a$. Bounded one-sided coefficients suffice, so the earlier release seam causes no difficulty. On any finite regular interval this linear ODE has a unique orthonormal solution. It is a coordinate frame for the same physical solution, not a new source history or dynamical response.

For an in-plane vector $v$, define its developed coordinates by $\widetilde v=(v\cdot a,v\cdot b)\in\mathbb R^2$. Since $a_\theta,b_\theta$ are normal,

$$
\widetilde v_\theta=
((\Pi v_\theta)\cdot a,(\Pi v_\theta)\cdot b),
\qquad \Pi=I-\ell\ell^{\mathsf T}.
\tag{3}
$$

In particular (1) implies $\widetilde n_\theta=\widetilde t$ and $\widetilde t_\theta=-\widetilde n$. With the chosen initial frame,

$$
\widetilde n=(\cos\theta,\sin\theta),\qquad
\widetilde t=(-\sin\theta,\cos\theta).
\tag{4}
$$

This is exact even if the physical plane accumulates a large rotation. Curvature of the frame path can change its orientation relative to external axes, but both vectors being compared use the same frame. The proof never identifies that transported orientation with a fixed physical plane.

## The scalar and corrected-vector identities survive

Put $P=hp$, $p=Y_s\cdot n$, $Q=h^2/r$, $\alpha=\epsilon/h$ and $e=(Q-1)n-Pt$. For $a_r=r^2A\cdot n$ and $b_t=r^2A\cdot t$, direct differentiation gives

$$
h_\theta=hb_t/Q,\quad
P_\theta=Pb_t/Q+Q+a_r,\quad
Q_\theta=2b_t-P.
\tag{5}
$$

Normal acceleration changes $\ell$ but cancels from these scalar derivatives. Thus the corrected account $I(P,Q,h)$ and phase relation $\Theta(\theta,P,Q,h)$ have exactly the nominal subject's derivatives and response sensitivities. The [spatial seventh-order theorem](overnight2-a-reference-spatial-seventh-order.md) supplies the required radial/tangential allowances on the actual spatial history; its separate isotropic $2\nu$ term is retained.

For the corrected vector $z=h^{-1}(Z_n n+Z_t t)$, equation (3) turns the spatial projected derivative into the full derivative of $\widetilde z$. The independent planar coefficient and error budgets consequently bound $|\widetilde z_\theta|$ with no omitted normal term. This extension is valid because the earlier response theorem bounded the full transverse vector, including normal history; scalar symmetry alone would not justify it.

The exact account inequality (3) in the nominal subject depends only on $g\le1$ and remains spatial. The inherited $h$, eccentricity, midpoint-history and root-generation bounds also already have full spatial scope. Therefore every late integral, endpoint coercivity bound and angle comparison in that subject can be applied to $\widetilde e,\widetilde n,\widetilde z$ once their finite release data have been compared.

## Finite release comparison in developed coordinates

The [accepted release assessment](overnight2-a-reference-adiabatic-release.md) compares the exact spatial member to the same ideal mirror release in Euclidean coordinates. Its initial error allowance $E(0)<1.411\times10^{-16}$ already includes this full ball, by the finite-radius owner. The same finite comparison through forty gives, throughout that interval,

$$
|\delta Y|<1.129\times10^{-15},\quad
|\delta Y_s|<1.695\times10^{-13},\quad
|\delta h|,|\delta P|<1.73\times10^{-13},\quad
|\delta Q|<3.48\times10^{-13}.
\tag{6}
$$

These compare rotation-invariant coordinates and therefore hold without assuming a common plane. Defining both angular clocks to start at zero, differentiation of $h/r^2$ on the short release tube gives

$$
\left|\frac{h}{r^2}-\frac{\bar h}{\bar r^2}\right|
<1.01|\delta h|+2.01|\delta Y|<1.78\times10^{-13}.
$$

The slow-time interval has length $40\epsilon$, so

$$
|\theta(40)-\bar\theta(40)|<2.4\times10^{-15}.
\tag{7}
$$

No external frame comparison is needed. In developed coordinates the vector at forty is explicitly

$$
\widetilde z=h^{-1}\operatorname{Rot}(\theta)(Z_n,Z_t).
$$

Its local coordinate derivative is bounded by the same conservative factor ten used in the nominal proof. The additional angular contribution from (7) is below $3\epsilon(2.4\times10^{-15})<3\times10^{-18}$. Hence the finite developed-vector discrepancy is still below $2\times10^{-12}$. The account transfer remains below $5\times10^{-16}$, and the phase-expression transfer below $6\times10^{-10}$, since its dominant derivative is $-1/\epsilon$ with respect to $h$.

For this spatial application use the exact nominal initial account and leading direction as a common comparison reference, rather than calling them the perturbed member's own initial values. The ideal initial state differs from that nominal reference only by the quadratic literal phase-radius defect already bounded in the release assessment. Equations (6)–(7) transfer the complete ideal release to the actual spatial member; they already pay for its independently perturbed initial positions and velocities. Thus the nominal proof's combined allowances, including the small monotone-$h$ overlap at the restart, remain unchanged with $z$ replaced by $\widetilde z$.

## Conditional consequence and independent controls

If the nominal phase-fate assembly is accepted, the same contradiction at $r=10^{16}$ applies to every member of this fixed ball. At that first hypothetical negative passage, $\widetilde e=(Q-1)\widetilde n-P\widetilde t$ must point almost opposite $\widetilde n$. The intrinsic angle comparison would require a common-reference phase gap below $.214$ radians, contradicting the same literal gap near $-.328063$. The existing first-zero and positive-terminal theorems already admit this spatial class, so their subsequent dispersal conclusion would transfer without another angular-floor or limiting-plane assumption.

This is a quantitative robustness neighborhood in the declared complete-history norm. It does not certify an arbitrary historical numerical record's membership, provide a uniform numerical lower terminal speed, or prove that the limiting physical plane exists. It does not enlarge the norm radius or alter its $b_0$ dependence.

Analytical controls are a fixed plane, where (2) is constant and (3) is the ordinary planar derivative; arbitrary pure normal frame rotation, which remains explicit in (1) but drops out of developed in-plane components by orthogonality; and the direct inner-product derivatives proving (2). Falsifiers include a missed tangential term in (2) or (3), a normal contribution to one of the scalar identities (5), loss of the complete spatial source hypotheses, or a finite developed-coordinate discrepancy exceeding (6)–(7). This note remains a candidate until a separate assessment checks both its intrinsic geometry and its dependence on the nominal final proof. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) owns integration.
