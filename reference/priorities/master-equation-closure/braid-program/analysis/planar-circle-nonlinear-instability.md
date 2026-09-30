# Local nonlinear instability of the sharp capped circular binary

**Date:** 2026-09-16; review integration and original-source verification 2026-09-26. **Grade:** derived local nonlinear instability and position-to-history estimate under the stated model and local-history hypotheses. Section 4 checks Krisztin–Walther–Wu Theorem I.3 against the time map and constructs physical all-past solutions. The [independent review](../../field-speed-ceiling/analysis/planar-circle-instability-independent-review.md) and [corrected reassessment](planar-circle-instability-review-reassessment.md) record the completed source check and its limits. The [analytic spectral bound](planar-circle-growing-mode.md#31-analytic-confinement-of-nonnegative-real-part-roots) confines nonnegative-real-part roots to $|z|<3$; the numerical winding count is not a global spectral certificate. **Scope:** isolated antipodal planar electrino–positrino pair, $c_f=c_a=1$, zero self response, and the already stated least-change ceiling response. No smoothing, event update, or extra physical law is introduced.

## 1. Statement and meaning

The exact circular binary is locally nonlinearly unstable within smooth antipodal planar histories on the active unit-speed boundary. The construction supplies physically consistent all-past solutions, arbitrarily close to the circular history initially, that subsequently leave a fixed sufficiently small neighborhood of the circular histories, even allowing a change of circular phase. Section 6 makes this departure visible in positions over a finite window. This local statement does not specify escape, collision, an ellipse, or another eventual state, and does not assert that every disturbance grows.

The main tasks are to express the exact capped dynamics in a smooth open coordinate domain, check the delay theorem's hypotheses, and ensure its unstable solutions are actual unit-speed histories rather than unrelated position/velocity records. The [positive characteristic root](planar-circle-growing-mode.md) alone did not complete those tasks.

## 2. Exact heading coordinates on the active boundary

Let $R_\ast=K/[4D(1+\sin D)]$, $D=\cos D$, and $\tau=t/R_\ast$. Let $Q(\theta)$ be planar rotation through $\theta$, and let $\mathcal J=Q(\pi/2)$. Write

$$
\mathbf X_A(t)=R_\ast Q(\tau)p(\tau),\qquad \mathbf X_B(t)=-\mathbf X_A(t),
\qquad e(\alpha)=(\cos\alpha,\sin\alpha).
$$

The heading variable $\alpha$ specifies A's inertial velocity as $Q(\tau)e(\alpha)$. It enforces unit speed exactly, not merely to first order. The base circular solution is the constant state $p_\ast=(1,0)$, $\alpha_\ast=\pi/2$.

For dimensionless delay $d$, define

$$
b=p(\tau)+Q(-d)p(\tau-d),\qquad |b|=d,\qquad n=b/|b|,
$$

$$
J_t=1+n\cdot Q(-d)e(\alpha(\tau-d)),\qquad
\mathcal A=-\frac{k n}{|b|^2J_t},\qquad k=K/R_\ast=4D(1+\sin D).
$$

Here $\mathcal A$ is the dimensionless raw sharp partner acceleration in the receiver's rotating coordinates. B's delayed velocity has the opposite sign, accounting for the plus sign in $J_t$. On the branch where $e(\alpha)\cdot\mathcal A>0$, the exact constrained dynamics becomes

$$
\boxed{p'=e(\alpha)-\mathcal Jp,\qquad
\alpha'=(\mathcal Je(\alpha))\cdot\mathcal A-1.}
$$

Indeed $d\mathbf X_A/dt=Q(\tau)e(\alpha)$, and differentiating this velocity gives $Q(\tau)\mathcal Je(\alpha)(1+\alpha')/R_\ast$. This is exactly the perpendicular projection of the sharp row. The removed component is only the forward component already removed by the ceiling. The base has $d=2D$, $J_t=1+\sin D$, and $\mathcal A=(-1,\tan D)$, so both boxed derivatives vanish at the base.

## 3. A genuine smooth local delay equation

Take a history interval $[-h,0]$ with $h=4$ in dimensionless time, and an open $C^1$ neighborhood of the constant base history $(p_\ast,\alpha_\ast)$, using a local real-valued lift of the heading angle. Define the functional on this open set through the implicit root

$$
G(\phi,d)=|\phi_p(0)+Q(-d)\phi_p(-d)|-d=0.
$$

At the base, $G_d=-(1+\sin D)<0$. Evaluation of a $C^1$ history at a varying time is continuously differentiable. The implicit-function theorem therefore supplies a unique $C^1$ delay functional near $2D$. Range, delay, $J_t$, and the positive forward raw component retain strictly positive margins after the neighborhood is made smaller. The rest of the finite source-time interval has a nonzero residual margin away from this root at the base; compactness and continuity preserve root exclusion there. No new partner branch is silently dropped.

For the exact functional $f$ defined by the boxed equations, a history variation $\chi$ changes the delay by

$$
Dd(\phi)\chi=-\frac{n\cdot[\chi_p(0)+Q(-d)\chi_p(-d)]}{G_d}.
$$

In differentiating later evaluations, terms such as $\phi_p'(-d)Dd(\phi)\chi$ and $\phi_\alpha'(-d)Dd(\phi)\chi$ occur. They use derivatives of the base history $\phi$, but no derivatives of the variation $\chi$. Thus $Df(\phi)$ extends to a bounded operator on continuous variations, jointly continuously in $\phi\in C^1$ and $\chi\in C$. The two required smoothness properties are verified: $f$ is $C^1$ on an open $C^1$ set, and its derivative has this continuous extension. The compatible-history set is nonempty because it contains the exact base.

The mathematical input is the solution-manifold framework and the linearized-instability principle: under these smoothness conditions, compatible histories generate differentiable local time maps, and positive-real-part spectrum gives instability on the solution manifold in its stated history norm; the physical-history conclusion requires the separate construction below. The unstable-manifold construction additionally supplies solutions defined for all negative times and approaching the equilibrium there. These are mathematical theorems about delay equations, not imported physical laws. See Stumpf, [*On differential equations with state-dependent delay: The principles of linearized stability and instability revisited*](https://www.math.u-szeged.hu/ejqtde/p5301.pdf), section 2, Theorem 4.1, with the backward-solution proof route stated in section 4 below rather than relying on the introductory unstable-manifold remark; and Hartung, Krisztin, Walther and Wu, [*Functional differential equations with state-dependent delays: theory and applications*](https://aimath.org/WWN/variabletimelag/sur0b.pdf), sections 3.2–3.5.

## 4. Recovering admissible all-past histories

### The checked backward-solution theorem

The [independent review](../../field-speed-ceiling/analysis/planar-circle-instability-independent-review.md), §4.3, and [reassessment](planar-circle-instability-review-reassessment.md#31-the-map-level-unstable-manifold-theorem-still-needs-a-checked-source) identify the distinction that matters. Stumpf's Theorem 4.1 gives instability on the solution manifold $X_f=\{\phi:\phi'(0)=f(\phi)\}$ in the $C^1$ norm. This endpoint condition does not enforce the position/heading identity throughout stored history; physical instability does not follow from that theorem alone. A local unstable manifold with complete backward solutions supplies the additional history consistency.

The required source is Krisztin, Walther and Wu, *Shape, Smoothness, and Invariant Stratification of an Attracting Set for Delayed Monotone Positive Feedback*, Fields Institute Monographs 11 (1999), DOI 10.1090/fim/011, **Appendix I, Theorem I.3, pp. 168–169**, with the standing hypotheses and equivalent norms on pp. 167–168. The original [page images](https://books.google.com/books?id=dZRjVZkPG2YC&pg=PA168) were inspected. The theorem applies to a local $C^1$ map on a Banach space with stable, center and unstable invariant subspaces. It permits a nonzero center space and supplies a tangent unstable graph, backward trajectories and a contracting inverse restricted to that graph. The hypothesis mapping is as follows.

Choose a fixed $a>0$. Let $\phi_\ast$ be the circular equilibrium history and $Y=T_{\phi_\ast}X_f$, a closed Banach subspace of $C^1$. Choose a local chart $K$ with $K(\phi_\ast)=0$ and inverse $R$. After shrinking its domain, $H=K\circ F_a\circ R$ is a $C^1$ map from an open neighborhood of zero in $Y$ into $Y$, with $H(0)=0$. Its derivative $\mathcal L=DH(0)$ is conjugate to the variational time map $T(a)$. These facts follow from the smoothness verification in §3 and survey Theorem 3.2.1 and §3.5. Neither a globally defined map nor higher differentiability is needed.

The survey's §3.4 and relation 3.4.1 give closed invariant subspaces $Y=E_s\oplus E_c\oplus E_u$, with time-map spectra inside, on and outside the unit circle, respectively. Both $E_c$ and $E_u$ are finite-dimensional; $E_u$ is nonzero by the actual positive-root eigenmode in §5. The phase direction belongs to $E_c$ and is retained. There are only finitely many generator eigenvalues to the right of any fixed vertical line. Consequently there is $\delta_s>0$ with every stable generator eigenvalue having real part below $-\delta_s$, while the finite nonempty unstable set has minimum real part $\delta_u>0$. Thus, writing $r_s=\sup|\sigma(\mathcal L|_{E_s})|$ and $r_u^-=\sup|\sigma((\mathcal L|_{E_u})^{-1})|$, choose

$$
r_s\le e^{-a\delta_s}<1,\qquad r_u^-=e^{-a\delta_u}<1,
\qquad \max\{r_s,r_u^-\}<\lambda<1.
$$

This verifies the spectral gap required on p. 167, including the stable gap explicitly used in survey §3.5. KWW Theorem I.1 supplies equivalent norms with $\|\mathcal L_u^{-1}\|_u<\lambda$ and $\|\mathcal L_{sc}\|_{sc}<1/\lambda$, where $E_{sc}=E_s\oplus E_c$. The complementary norm bound is not a claim that the center contracts. The map itself is unchanged, and no full-map inverse or numerical root count is assumed.

For graph points in the full space $Y$, use the equivalent norm $\|\xi\|_u=\max\{|P_u\xi|_u,|P_{sc}\xi|_{sc}\}$, where $P_u,P_{sc}$ are the spectral projections and $|\cdot|_u,|\cdot|_{sc}$ are the equivalent component norms just chosen. Apply Theorem I.3(i)–(iii) to $H$. Its graph has tangent space $E_u$ at zero. For a sufficiently small point $\xi_0$ on that graph, the restricted inverse gives iterates $H(\xi_{-j-1})=\xi_{-j}$ that remain in the local graph and satisfy

$$
\|\xi_{-j}\|_u\le\alpha_u^j\|\xi_0\|_u,
\qquad 0<\alpha_u<\lambda<1.
$$

In particular $\lambda^{-j}\xi_{-j}\to0$, exactly the negative-index weighting in I.3(ii). Norm equivalence and the locally Lipschitz chart inverse give geometric $C^1$ convergence of $\psi_{-j}=R(\xi_{-j})$ to $\phi_\ast$, with $F_a(\psi_{-j-1})=\psi_{-j}$. The [reassessment](planar-circle-instability-review-reassessment.md#31-the-map-level-unstable-manifold-theorem-still-needs-a-checked-source) records source identity and independent checks. The earlier source obligation is discharged.

Each forward solution piece from $\psi_{-j-1}$ has history $\psi_{-j}$ at time $a$. These histories agree on overlap, and forward uniqueness makes the continued pieces agree. Their concatenation is a complete negative-time solution; endpoint compatibility makes it $C^1$ at the joins. The survey's Proposition 3.5.3 bounds intermediate-time $C^1$ distance on a fixed time interval by a constant times initial distance. It transfers geometric convergence at the discrete times to convergence at all intervening times and keeps sufficiently small pieces in the local domain.

An arbitrary element of the open coordinate-history space need not satisfy the position/heading identity at every past time. The proof does not identify every such element with a physical history. Instead use a complete negative-time solution on the local unstable manifold. It satisfies $p'=e(\alpha)-\mathcal Jp$ at every past time, so its reconstructed inertial path has exactly unit speed throughout the past. It satisfies the heading equation there as well. It is therefore an actual sharp capped history, not a prescribed geometric perturbation.

Choose the neighborhood so that $|p|<1+\epsilon$ with $\epsilon<1/2$. For these complete negative-time solutions, and their nearby future until the local exit under consideration, any partner separation is less than $2(1+\epsilon)<4=h$. A source older than $h$ has a greater causal radius and cannot be a root. Thus the finite interval is an exact local history representation for these solutions; no finite-memory physical law has been introduced. The antipodal relation preserves the second receiver's equation by symmetry. Self response stays zero by premise. Strict margins keep the active projection and the one-root ledger valid in this local neighborhood.

## 5. The growing mode belongs to this evolution

Reflection symmetry makes the reduced solution satisfy both receiver equations. Identifying it with the unique physical two-body evolution also uses the [regular-chart uniqueness theorem](../../analysis/regular-chart-history-to-ledger-well-posedness.md). Along these complete solutions, positive root and response margins, bounded derivatives and compatible traces permit sufficiently short contraction steps inside a smaller neighborhood. This is a local uniqueness application along the constructed solutions, not admission of every history in the earlier perturbative tube.

Linearizing the exact heading equations and eliminating the heading variation recovers the previous rotating-frame variational system. Specifically, at $\alpha_\ast=\pi/2$ a heading variation $\beta$ changes velocity by $-\beta\mathbf e_r$. The previous mode has radial velocity variation $q=-(1+z^2)$, so its coordinate eigenvector is

$$
(\delta p_r,\delta p_\theta,\delta\alpha)
=(-z,1,1+z^2)e^{z\tau}.
$$

It satisfies the linearized kinematic and heading equations precisely when the [characteristic equation](planar-circle-growing-mode.md) $F(z)=0$ holds. This provides the compatible tangent; it is not inserted independently of the nonlinear functional. The analytic facts $F(0)=0$, $F'(0)=1$, and $F(z)\to-\infty$ for positive real $z$ establish a positive real eigenvalue. No numerical growth estimate is needed to invoke instability.

The local unstable manifold has this growing direction in its tangent space and supplies nontrivial complete negative-time solutions. Taking earlier and earlier histories along one such solution gives arbitrarily close admissible initial states whose later evolution reaches a fixed nonzero nearby displacement.

Circular phase changes form a local curve of equilibria $(p,\alpha)=(Q(\gamma)(1,0),\pi/2+\gamma)$. Its tangent is $(0,1,1)$ and belongs to the zero mode. The positive-root eigenvector has radial component $-z\ne0$ and is transverse to that curve. A sufficiently small nonzero point on the unstable manifold in that tangent direction consequently has positive distance from the phase curve. Its backward trajectory approaches the original circle. Starting farther back gives the stated departure from a fixed neighborhood of the phase family, not merely a phase drift. This argument concerns local history distance; it is not an asserted global departure trajectory.

## 6. Exact scope of the conclusion

The history topology is $C^1$ for $x=(p,\alpha)$ on dimensionless $[-h,0]$, with $h=4$. Use the product norm $|x|=|p|+|\alpha|$ and $\|x\|_{C^1}=\sup|x|+\sup|x'|$. The [reassessment](planar-circle-instability-review-reassessment.md#32-positions-only-instability-with-the-estimate-the-review-omitted) identifies the extra estimate needed to see departure in positions: positional closeness controls velocity through a curvature bound, velocity controls heading through the unit-circle chord inequality, and the local equation then controls the derivative of the full state.

**Position-to-history lemma.** Let a complete solution have its histories in a sufficiently small local neighborhood $U$ throughout $W=[\tau_1-2h,\tau_1]$. Let $\phi_\gamma=(p_\gamma,\alpha_\gamma)\in U$ be a circular equilibrium, with $p_\gamma=Q(\gamma)(1,0)$ and $\alpha_\gamma=\pi/2+\gamma$ in the same local heading lift. Require $|\alpha-\alpha_\gamma|\le\pi$ on $W$. Choose a finite $M_2>0$ bounding $|p''|$ and a uniform $L$ such that $|f(x_\tau)-f(\phi_\gamma)|\le L\|x_\tau-\phi_\gamma\|_{C^0}$ on the histories being compared. If $|p(\tau)-p_\gamma|\le\varepsilon$ throughout $W$, then

$$
\|x_{\tau_1}-\phi_\gamma\|_{C^1}
\le (1+L)\left(\varepsilon+\frac\pi2\omega(\varepsilon)\right),
\qquad
\omega(\varepsilon)=2\sqrt{\varepsilon M_2}+\frac{2\varepsilon}{h}+\varepsilon.
$$

Here the right-hand side tends to zero with the positional tolerance. The neighborhood can supply common finite bounds because $p''=\alpha'\mathcal Je(\alpha)-\mathcal Jp'$ and the local equation bounds $p'$ and $\alpha'$. The derivative extension from §3 supplies the local Lipschitz estimate after shrinking to a suitable convex coordinate neighborhood; the constants are uniform over a small phase arc.

*Proof.* Put $g=p-p_\gamma$ and first take $\varepsilon>0$. For every $\tau\in W$ and $0<\delta\le h$, at least one one-sided interval of length $\delta$ based at $\tau$ lies in $W$. Taylor's integral remainder gives

$$
|g'(\tau)|\le\frac{2\varepsilon}{\delta}+\frac{M_2\delta}{2}.
$$

With $\delta=\min\{h,2\sqrt{\varepsilon/M_2}\}$, the interior optimum gives $2\sqrt{\varepsilon M_2}$. When the minimum is $h$, one has $M_2h/2\le\sqrt{\varepsilon M_2}$. Both cases imply $|p'|\le2\sqrt{\varepsilon M_2}+2\varepsilon/h$. Subtracting the equilibrium kinematic equation gives $e(\alpha)-e(\alpha_\gamma)=p'+\mathcal J(p-p_\gamma)$, whose norm is at most $\omega(\varepsilon)$. For angular difference $d\in[0,\pi]$, the chord length is $2\sin(d/2)\ge2d/\pi$, by concavity of sine on $[0,\pi/2]$. Thus $|\alpha-\alpha_\gamma|\le(\pi/2)\omega(\varepsilon)$ on $W$. The full state is consequently within $\varepsilon+(\pi/2)\omega(\varepsilon)$ in $C^0$ on $W$. Each history ending in $[\tau_1-h,\tau_1]$ lies in $W$, so the local Lipschitz estimate bounds its endpoint derivative by $L$ times that quantity. Taking both suprema proves the lemma. The case $\varepsilon=0$ follows by taking positive tolerances to zero. $\square$

**Positional departure.** Choose the fixed nonzero point on the local unstable manifold from §5, small enough that its entire preceding backward trajectory remains in $U$. Its history distance from the local phase curve is some $\eta>0$. If

$$
(1+L)\left(\varepsilon+\frac\pi2\omega(\varepsilon)\right)<\eta,
$$

the positions on its preceding window of length $2h=8$ cannot remain within $\varepsilon$ of any one phase-shifted circle. Rotation symmetry gives uniform local constants; phase circles outside that local arc are already separated in position from a sufficiently small neighborhood of the base circle. Starting farther back along the same complete solution makes the initial physical history arbitrarily close to the circle while retaining this fixed later positional departure. A sufficiently small $\varepsilon=c\eta^2$, with constant $c>0$ chosen from $L$ and $M_2$, is sufficient. This is a window-based positional departure bound relative to one fixed circular phase, not a sharp growth law, pointwise departure at every time, or a claim about a freely varying phase.

**Derived local conclusion:** the isolated sharp capped circular binary is nonlinearly unstable within this active-boundary antipodal planar class, including when circular phase is ignored, with the positional-window consequence just proved. Instability already within an invariant subset prevents Lyapunov stability under any larger admissible perturbation class that includes it. The exact circle remains an exact solution. This does not prove that every perturbation departs or that no other planar binary can be stable.

The construction does not establish what happens after departure, cover speed-interior histories with a switching cap regime, solve collinear coincidence, or prove the full FSC-011 perturbative theorem for every history in its earlier tube. It does not transfer the numerical linear amplitude factor to finite-amplitude trajectories. Ellipses and eventual collapse or separation remain unproved.

**Verification and falsifiers:** differentiation verifies the reconstructed ceiling response, substitution verifies the base equilibrium, the implicit derivative and derivative-extension inspection verify the local functional's smoothness, and the spatial bound gives all-past root completeness for the constructed histories. Original-source inspection and the explicit chart, spectral-gap and inverse-iteration checks in §4 verify the map-theorem application. The Taylor estimate and chord inequality establish the positional lemma independently of a numerical evolution. An invalid mapping, characteristic calculation or lemma inequality would invalidate the corresponding deduction; failure of any stated theorem hypothesis would invalidate the all-past construction. A solution satisfying the lemma's local hypotheses but exceeding its stated $C^1$ bound would refute that estimate. The numerical count and departure diagnostics are not premises of this argument.
