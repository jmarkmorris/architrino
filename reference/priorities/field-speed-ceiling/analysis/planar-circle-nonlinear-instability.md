# Local nonlinear instability of the sharp capped circular binary

**Date:** 2026-09-16. **Grade:** derived local theorem using the sharp-circle characteristic calculation and the state-dependent-delay solution-manifold and unstable-manifold theorems. The independent review by Claude is recorded in [the review](planar-circle-instability-independent-review.md); its proof-route, admissibility, uniqueness and wording corrections are integrated below. The finite-window numerical spectrum count is not a global spectral certificate. **Scope:** isolated antipodal planar electrino–positrino pair, $c_f=c_a=1$, zero self response, and the already stated least-change ceiling response. No smoothing, event update, or extra physical law is introduced.

## 1. Statement and meaning

The exact circular binary is locally nonlinearly unstable within smooth antipodal planar histories on the active unit-speed boundary. There exist physically consistent all-past solutions, arbitrarily close to the circular history initially, that subsequently leave a fixed sufficiently small neighborhood of the circular histories, even allowing a change of circular phase. The claim is local history-space instability. It does not specify escape, collision, an ellipse, or another eventual state, and it does not assert that every disturbance grows.

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

### Review correction: the backward-solution step

The [independent review](planar-circle-instability-independent-review.md), section 4.3, supplies the missing explicit proof route. Stumpf's Theorem 4.1 gives instability on the solution manifold $X_f=\{\phi:\phi'(0)=f(\phi)\}$ in the $C^1$ norm. This endpoint condition does not enforce the position/heading identity throughout stored history; physical instability does not follow from that theorem alone. Stumpf's introductory discussion is not itself the unstable-manifold theorem.

The extra mathematical input is the local unstable-manifold theorem for a $C^1$ map on a Banach space with a finite-dimensional expanding spectral subspace, invertible derivative on that subspace, and complementary spectrum of modulus at most one. Choose a sufficiently long time step $a>h$. The delay time map has the compact spectral structure and separation described in the survey's spectral framework; the nonempty expanding subspace comes from the positive characteristic root. The map-level theorem supplies a local graph and backward orbits $\psi_{-j}$ satisfying $F_a(\psi_{-j-1})=\psi_{-j}$ and converging geometrically to the equilibrium. Invertibility of the full time map is not required.

Each forward solution piece from $\psi_{-j-1}$ has history $\psi_{-j}$ at time $a$. These histories agree on overlap, and forward uniqueness makes the continued pieces agree. Their concatenation is a complete negative-time solution; endpoint compatibility makes it $C^1$ at the joins. Local continuous-dependence bounds over a fixed time interval transfer convergence at the discrete times to convergence at all intervening times. This is the backward-orbit patching argument needed here. The review gives the map-level construction explicitly; the cited survey supplies the time-map and spectral framework rather than an explicitly stated unstable-manifold theorem. Krisztin's 2003 paper was not read in that review and is not used as a checked substitute citation.

An arbitrary element of the open coordinate-history space need not satisfy the position/heading identity at every past time. The proof does not identify every such element with a physical history. Instead use a complete negative-time solution on the local unstable manifold. It satisfies $p'=e(\alpha)-\mathcal Jp$ at every past time, so its reconstructed inertial path has exactly unit speed throughout the past. It satisfies the heading equation there as well. It is therefore an actual sharp capped history, not a prescribed geometric perturbation.

Choose the neighborhood so that $|p|<1+\epsilon$ with $\epsilon<1/2$. For these complete negative-time solutions, and their nearby future until the local exit under consideration, any partner separation is less than $2(1+\epsilon)<4=h$. A source older than $h$ has a greater causal radius and cannot be a root. Thus the finite interval is an exact local history representation for these solutions; no finite-memory physical law has been introduced. The antipodal relation preserves the second receiver's equation by symmetry. Self response stays zero by premise. Strict margins keep the active projection and the one-root ledger valid in this local neighborhood.

## 5. The growing mode belongs to this evolution

Reflection symmetry makes the reduced solution satisfy both receiver equations. Identifying it with the unique physical two-body evolution also uses the [regular-chart uniqueness theorem](regular-chart-history-to-ledger-well-posedness.md). Along these complete solutions, positive root and response margins, bounded derivatives and compatible traces permit sufficiently short contraction steps inside a smaller neighborhood. This is a local uniqueness application along the constructed solutions, not admission of every history in the earlier perturbative tube.

Linearizing the exact heading equations and eliminating the heading variation recovers the previous rotating-frame variational system. Specifically, at $\alpha_\ast=\pi/2$ a heading variation $\beta$ changes velocity by $-\beta\mathbf e_r$. The previous mode has radial velocity variation $q=-(1+z^2)$, so its coordinate eigenvector is

$$
(\delta p_r,\delta p_\theta,\delta\alpha)
=(-z,1,1+z^2)e^{z\tau}.
$$

It satisfies the linearized kinematic and heading equations precisely when the [characteristic equation](planar-circle-growing-mode.md) $F(z)=0$ holds. This provides the compatible tangent; it is not inserted independently of the nonlinear functional. The analytic facts $F(0)=0$, $F'(0)=1$, and $F(z)\to-\infty$ for positive real $z$ establish a positive real eigenvalue. No numerical growth estimate is needed to invoke instability.

The local unstable manifold has this growing direction in its tangent space and supplies nontrivial complete negative-time solutions. Taking earlier and earlier histories along one such solution gives arbitrarily close admissible initial states whose later evolution reaches a fixed nonzero nearby displacement.

Circular phase changes form a local curve of equilibria $(p,\alpha)=(Q(\gamma)(1,0),\pi/2+\gamma)$. Its tangent is $(0,1,1)$ and belongs to the zero mode. The positive-root eigenvector has radial component $-z\ne0$ and is transverse to that curve. A sufficiently small nonzero point on the unstable manifold in that tangent direction consequently has positive distance from the phase curve. Its backward trajectory approaches the original circle. Starting farther back gives the stated departure from a fixed neighborhood of the phase family, not merely a phase drift. This argument concerns local history distance; it is not an asserted global departure trajectory.

## 6. Exact scope of the conclusion

The topology is $C^1$ for the heading-state history $(p,\alpha)$ on dimensionless $[-4,0]$. Local Lipschitz continuity bounds derivative differences of complete solutions by their recent $C^0$ state-history differences. Thus whole-state closeness on a twice-longer window controls $C^1$ closeness on the final window. This includes heading; a positions-only corollary additionally needs a position-to-velocity/heading estimate. The proof does not obtain that strengthening merely by relabeling the state norm as a position norm.

**Derived local conclusion:** the isolated sharp capped circular binary is nonlinearly unstable within this active-boundary antipodal planar class, including when circular phase is ignored. Instability already within an invariant subset prevents Lyapunov stability under any larger admissible perturbation class that includes it. The exact circle remains an exact solution. This does not prove that every perturbation departs or that no other planar binary can be stable.

The construction does not establish what happens after departure, cover speed-interior histories with a switching cap regime, solve collinear coincidence, or prove the full FSC-011 perturbative theorem for every history in its earlier tube. It does not transfer the numerical linear amplitude factor to finite-amplitude trajectories. Ellipses and eventual collapse or separation remain unproved.

**Verification and falsifiers:** differentiation of the reconstruction verifies the exact ceiling response; substitution verifies the base equilibrium; the implicit derivative verifies the delay functional; derivative-extension inspection verifies the delay-theorem hypotheses; and the position bound verifies all-past root completeness for the unstable histories. No numerical evolution was run. A failure of any of these mappings, an error in the characteristic calculation, or failure of the cited unstable-manifold theorem under the stated smoothness hypotheses would overturn the theorem application. The independent review rederived these interfaces and supported the local conclusion. Its additional floating-point experiments have their own declared limits and are not premises of this analytical proof.
