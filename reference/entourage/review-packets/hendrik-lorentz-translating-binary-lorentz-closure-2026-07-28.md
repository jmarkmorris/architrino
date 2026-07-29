Closure goal:
Record what the Lorentz-lens review round established about the translating maximum-curvature binary, correct the one load-bearing algebraic step it stated incompletely, and convert the result into named corpus and priority changes plus one decisive small-drift continuation experiment.

# Research Findings And Proposed Changes: Translating-Binary Lorentz Closure

## Document Status

- **Artifact type:** research findings and proposed changes.
- **Review lens:** Hendrik Lorentz-style microphysical derivation of contraction and local time from finite-speed delayed interactions, with mechanism held apart from compensation.
- **Source disposition:** one review round received and integrated. The former consultation prompt is superseded; its self-contained substrate statement is retained in Appendix A so this document needs no external reading.
- **Claim authority:** conditional mathematical analysis, one independent recomputation performed here, and a proposed computation program.
- **Promotion classification:** priority-only, with five named reader-facing corpus corrections that are safe because each one adds a hedge, a grade, or a companion estimate rather than a new physical claim.
- **Not established:** existence of a translating branch, its stability, the values of the second-order clock and shape coefficients, or Lorentz recovery at any drift speed.

*Plainly: this file records what the review round proved, what it got slightly wrong, and what should change in the corpus and the priority lane. It does not claim that a moving bound orbit has been found.*

## Overall Finding

Exact Lorentz-shaped contraction and period dilation are **unlikely** for the stated delayed acceleration kernel, and the reason is more basic than the forward-root exponent mismatch the consultation packet led with.

The packet's implicit hope is that the translating branch is the rest branch acted on by

$$
\mathbf X_u(T)
=
uT\,\hat{\mathbf e}
+
A_u\mathbf X_0\!\left(\frac{T}{\gamma_f}\right),
\qquad
A_u=\operatorname{diag}\!\left(\gamma_f^{-1},1,1\right).
$$

That map is not a transformation of events. It is a contraction of positions at equal absolute time composed with a uniform rescaling of absolute time, and it lacks the position-dependent time term that the familiar event transformation carries. Consequently it does **not** send causal-root pairs to causal-root pairs, so no symmetry argument can generate the desired one-parameter family of bound orbits. Finding 1 gives the exact defect and its independent numerical check.

*Plainly: shrinking a moving orbit along its direction of travel and slowing its cycle is not enough to turn every old wake hit into a valid new wake hit. Each hit's timing shifts by an amount that depends on where the emitter and receiver were, and the shrink-and-slow recipe does not track that.*

The single most important missing step is therefore not a better shape guess but a **linearized continuation problem about the actual rest branch**, with every causal root differentiated implicitly. The candidate coefficients $a_2=\tfrac12$ and $g_2=-\tfrac12$ cannot be inferred from signal timing alone; they are outputs of a Fredholm solvability condition on a delayed boundary-value problem (Finding 3).

The most promising technique the program is not using is pseudo-arclength continuation of relative-periodic solutions of a state-dependent delay equation, with explicit continuation of each simple root, event detection on the $D_t=0$ fold set, an adjoint solvability calculation at $u=0$, and a regulator-removal study near folds. This extracts the $O(u^2)$ clock and shape coefficients directly and is far more informative per unit compute than long forward evolutions.

*Plainly: instead of running a long simulation and hoping it settles somewhere Lorentzian, follow the known rest solution continuously as you switch on a small drift, and read off how the period and shape respond to first and second order.*

Balance of judgment: exact closure is unlikely; approximate closure over a restricted low-drift chart remains **undecidable at present**; and no exact no-go has yet been proved against the two scalar observables agreeing accidentally. What would change the judgment is a converged $O(u^2)$ adjoint calculation returning $a_2=\tfrac12$, $g_2=-\tfrac12$, and a vanishing phase-resolved vector residual with no fitted parameters.

## Claim Map

Regrades of the consultation packet's own ledger, in the packet's labels (Appendix A restates each label):

- **(D1)–(D3) directional delays, symmetric-channel anisotropy, wake-density anisotropy.** Regrade from *derived properties available to the moving binary* to **derived only on the stated uniformly translating, fixed-separation kinematic chart**. They are not yet properties of the moving binary, whose separation is itself an unknown periodic function.
- **(D4) forward-root starvation bound.** Remains **derived**, conditionally on the declared $d_{\min}$. Its conclusion concerns delay length and finite-memory exclusion, **not** orbital period. See Finding 6.
- **(K1) closed-return axis-ratio selection.** Grading in the packet was already correct — conditional kinematics. Add: it is not a coarse-graining of the binary ledger until an actual root itinerary is named. See Finding 9.
- **(P1) coframe reciprocity test.** Regrade from *proposed circularity-proof test* to **presently underdefined**: the reciprocity product is normalization-dependent. See Finding 10.
- **(P2) no-retune as holonomy.** Regrade to **stale as stated**. It restates a drift-only holonomy reading that the 2026-06-24 Cartan-lens round already retired. See Finding 12.
- **(P3) branch-quantized Lorentz response.** Regrade from *proposed innovation* to **presently implausible for the unregularized kernel**. At a fold $D_t\to0$, so the newly born hits generically diverge rather than supplying a small ledger-indexed correction. See Finding 7.
- **(U1), (U2), (U3), (U5)** stand as unresolved. **(U4)** is sharpened: whether the two ratios come from one solution is decided by the unknown-versus-condition count in the $O(u^2)$ solvability system, which is checkable before any long evolution (Finding 4).

*Plainly: three of the theory's proposed innovations came back weaker than they were written, and one previously safe-looking group of results turns out to apply only to a simpler configuration than the one under study.*

New results established in this round:

- **Derived:** the active contract-and-slow map has a nonzero causal-root defect, vanishing exactly on pairs with zero longitudinal separation (Finding 1).
- **Derived:** the review round's stated defect omitted a quadratic term; the corrected identity is given and numerically checked here (Finding 2).
- **Derived formal reduction:** the $O(b^2)$ period coefficient is an adjoint projection ratio (Finding 3).
- **Derived:** each simple root's drift sensitivity is $\partial_b\tau_q=\tau_q(\hat{\mathbf e}\cdot\hat{\mathbf r}_q)/J_q$, singular as $J_q\to0$ (Finding 5).
- **Derived generic asymptotic:** newly born fold pairs contribute $\sim|u-u_\ast|^{-1/2}$, and the absolute value in $|D_t|$ prevents the cancellation that a signed denominator would give (Finding 7).
- **Derived:** the mass-shell residual is implied by, but does not imply, the pair of $\gamma$-shaped readouts (Finding 11).

*Plainly: three of the theory's own proposed innovations came back weaker than they were written, one already-known caveat got sharper, and six new pieces of algebra are now available.*

## Finding 1: The Contract-And-Slow Map Does Not Preserve The Causal-Root Relation

Take any rest-branch emission/reception pair with separation $\Delta\mathbf x_0=x_\parallel\hat{\mathbf e}+\mathbf x_\perp$ and absolute-time gap $\Delta t_0>0$ satisfying the root relation $\|\Delta\mathbf x_0\|=c_f\Delta t_0$. Under the active map above, the image pair has

$$
\Delta T=\gamma_f\Delta t_0,
\qquad
\Delta\mathbf X
=
u\gamma_f\Delta t_0\,\hat{\mathbf e}
+\frac{x_\parallel}{\gamma_f}\hat{\mathbf e}
+\mathbf x_\perp .
$$

Expanding, using $\gamma_f^2(c_f^2-u^2)=c_f^2$ and then eliminating $c_f^2\Delta t_0^2=x_\parallel^2+\|\mathbf x_\perp\|^2$, the root defect is

$$
\|\Delta\mathbf X\|^2-c_f^2\Delta T^2
=
2u\Delta t_0\,x_\parallel-\frac{u^2}{c_f^2}x_\parallel^2
=
\frac{u\,x_\parallel}{c_f^{2}}\left(2c_f^2\Delta t_0-u\,x_\parallel\right).
$$

Because $c_f\Delta t_0=\|\Delta\mathbf x_0\|\ge|x_\parallel|$ and $u<c_f$, the bracket satisfies $2c_f^2\Delta t_0-u x_\parallel\ge 2c_f^2\Delta t_0-c_f^2\Delta t_0>0$. The defect therefore vanishes **if and only if** $x_\parallel=0$.

*Plainly: the recipe maps wake hits correctly only when the emitter and receiver were side by side, with no separation along the direction of travel. Every other hit lands off the wake surface, so it is not a hit at all in the new configuration.*

> Claim grade: derived. Falsifier: none short of changing the active map, or restricting the retained ledger to roots with $x_\parallel=0$, which the maximum-curvature binary does not satisfy at generic phase.

The familiar event transformation that does preserve the null relation carries a position-dependent time term. Importing it here would not rescue the argument, because absolute $T$ is the evolution parameter and the receiver-local second derivative $d^2\mathbf X/dT_r^2$ is not covariant under such a change. Even granting a null-preserving event map, closure would additionally require the acceleration functional to satisfy an equivariance relation whose multiplier is velocity-dependent and anisotropic. The postulated kernel supplies a delayed radial direction and one scalar transmitter denominator, and contains neither the receiver-velocity dependence nor a transverse component that such a multiplier demands.

*Plainly: even if the expanding bubbles could be made to line up, the size and direction of the resulting kick would still come out wrong.*

> Claim grade: derived obstruction to *symmetry-generated* closure. It does **not** exclude an accidental family of solutions that happens to reproduce the same two measured ratios. Falsifier: a direct symbolic verification of the equivariance identity across all simple-root histories.

## Finding 2: Independent Recomputation Corrects The Review's Defect Expression

The review round reported the defect as $2u\Delta t_0\,x_\parallel$, stating that the remaining quadratic terms cancel through $\gamma_f^{-2}=1-u^2/c_f^2$. Recomputation here shows that the cancellation is incomplete: the surviving quadratic term $-\left(u^2/c_f^2\right)x_\parallel^2$ remains.

Numerical instantiation in normalized wake-speed units, $c_f=1$, $u=0.6$, $\gamma_f=1.25$, on the purely longitudinal pair $x_\parallel=1$, $\mathbf x_\perp=\mathbf 0$, $\Delta t_0=1$:

| quantity | value |
| --- | --- |
| $\Delta T=\gamma_f\Delta t_0$ | $1.25$ |
| $\Delta X=u\gamma_f\Delta t_0+x_\parallel/\gamma_f$ | $0.75+0.8=1.55$ |
| $\Delta X^2-\Delta T^2$ | $2.4025-1.5625=0.84$ |
| corrected formula $2ux_\parallel\Delta t_0-u^2x_\parallel^2$ | $1.2-0.36=0.84$ |
| review formula $2ux_\parallel\Delta t_0$ | $1.2$ |

*Plainly: plugging in one concrete pair of numbers shows the corrected expression matches the direct calculation exactly, and the review's version is off by the missing squared term.*

The conclusion is unchanged and slightly strengthened: the corrected defect is a product of $x_\parallel$ with a strictly positive bracket, so it is nonzero for **every** pair with nonzero longitudinal separation, without needing a sign argument on $\Delta t_0$.

> Claim grade: derived, with an independent numerical check at one point. Falsifier: any pair with $x_\parallel\neq0$ and $u\in(0,c_f)$ for which the direct evaluation of $\|\Delta\mathbf X\|^2-c_f^2\Delta T^2$ disagrees with the stated closed form.

## Finding 3: The Correct $O(b^2)$ Problem Is An Adjoint Solvability Equation

Write $b=u/c_f$ and pose the periodic-branch equation in orbital phase $\theta$, with $\boldsymbol\rho$ the relative coordinate and $\Omega$ the phase rate:

$$
\mathcal F(\boldsymbol\rho,\Omega,b)(\theta)
\equiv
\Omega^2\boldsymbol\rho''(\theta)
-\mathcal A[\boldsymbol\rho,\Omega,b](\theta)
=0,
$$

where $\mathcal A$ is the total delayed acceleration contribution assembled from the causal-root ledger, each root $\tau_q$ solving $G_{\sigma\sigma'}=0$ and carrying weight $c_f/|D_{t,q}|$. Expand

$$
\boldsymbol\rho=\boldsymbol\rho_0+b\,\boldsymbol\rho_1+b^2\boldsymbol\rho_2+O(b^3),
\qquad
\frac{T_u}{T_0}=1+a_1b+a_2b^2+O(b^3),
$$

and let $L\equiv D_{\boldsymbol\rho}\mathcal F(\boldsymbol\rho_0,\Omega_0,0)$ be the linearized delayed operator about the rest branch, including the variation of every root location through implicit differentiation.

*Plainly: write the moving orbit as the rest orbit plus a small correction, substitute into the delayed law, and collect terms by powers of the drift.*

At first order one must show $\boldsymbol\rho_1=0$ and $a_1=0$. That is **not** automatic; it requires a symmetry and gauge-fixing argument combining the reflection $\hat{\mathbf e}\to-\hat{\mathbf e}$ with a phase shift and a choice of center. Granting it, second order reads

$$
L\boldsymbol\rho_2-a_2\Omega_0\mathcal F_\Omega=-\tfrac12\mathcal F_{bb},
$$

and for every adjoint nullvector $\psi\in\ker L^\ast$ the Fredholm alternative gives

$$
a_2=\frac{\bigl\langle\psi,\tfrac12\mathcal F_{bb}\bigr\rangle}{\bigl\langle\psi,\Omega_0\mathcal F_\Omega\bigr\rangle},
$$

provided the denominator is nonzero.

*Plainly: the period coefficient is a projection of the drift-induced acceleration defect onto the orbit's neutral clock mode. Nothing in the root geometry alone sets it to one half.*

> Claim grade: derived formal reduction, conditional on a simple-root rest ledger, on $\boldsymbol\rho_1=a_1=0$, and on the linearized delayed operator being Fredholm on the relevant space of $2\pi$-periodic vector fields. That Fredholm hypothesis is itself unestablished for a state-dependent delay operator with a variable root set and should be stated as a side condition wherever this reduction is used. Falsifier: an evaluated ratio differing from $\tfrac12$ outside numerical and regulator uncertainty refutes exact period dilation at $O(b^2)$.

The Lorentz candidate $a_2=\tfrac12$ with $\boldsymbol\rho_2^{L}(\theta)=-\tfrac12R_0\cos\theta\,\hat{\mathbf e}$ is a solution only if

$$
\mathcal E_2(\theta)
\equiv
L\boldsymbol\rho_2^{L}-\tfrac12\Omega_0\mathcal F_\Omega+\tfrac12\mathcal F_{bb}
$$

vanishes phase by phase, not merely in orbital average. The stated circular-chart root facts are insufficient to evaluate $\mathcal F_{bb}$, because that requires the complete rest root list with phases, polarities, and vector contributions. So the value of $a_2$ is **unresolved**, and in particular is not derivable from the directional-delay results (D1)–(D3).

*Plainly: one half and minus one half are test values to check, not consequences of the delay equation.*

## Finding 4: The Existence Question Is An Unknown-Versus-Condition Count, Checkable Before Any Evolution

The autonomous delayed system is invariant under time translation, so $\boldsymbol\rho_0'$ lies in $\ker L$; on a circular rest branch, rotational equivariance makes that same mode the phase mode. If the rest benchmark belongs to a continuous family — for example a one-parameter family indexed by orbital radius — each additional neutral direction contributes a further element of $\ker L^\ast$ and therefore a further solvability condition at $O(b^2)$.

The free constants at that order are $a_2$ together with whatever parameters of the neutral family are allowed to drift with $u$, such as a radius response $R(u)=R_0(1+r_2b^2)$. The translating branch exists at $O(b^2)$ only if the number of independent solvability conditions does not exceed the number of such free constants.

*Plainly: count the equations the drift forces on you, then count the dials the rest orbit gives you to turn. If there are more equations than dials, there is no nearby moving orbit and the whole program stops there, no simulation required.*

> Claim grade: plausible inference, resting on the Fredholm side condition of Finding 3 and on an unmeasured $\dim\ker L^\ast$. Falsifier: compute $\dim\ker L^\ast$ on the accepted rest ledger; a value exceeding the free-constant count is a local nonexistence result for the translating branch, and a value equal to it converts (U1) into a solvable linear problem.

This is the cheapest decisive test in the whole program and should be attempted before the continuation run of Finding 13.

## Finding 5: Root Drift Sensitivity Locates Where The Kernel Enters

For a simple root $\tau_q$, implicit differentiation of the root condition gives $G_\tau=-D_{t,q}=-c_fJ_q$ and $\partial_b\tau_q=-G_b/G_\tau$. Holding the shape perturbation aside,

$$
G_b\big|_{b=0}=c_f\tau_q\,\hat{\mathbf e}\cdot\hat{\mathbf r}_q,
\qquad\text{hence}\qquad
\partial_b\tau_q\big|_{b=0}
=\frac{\tau_q\,\hat{\mathbf e}\cdot\hat{\mathbf r}_q}{J_q}.
$$

Every derivative of the acceleration contribution then carries derivatives of $r_q^{-2}$, of $\hat{\mathbf r}_q$, and of the transmitter weight $W_q=c_f/|D_{t,q}|$.

*Plainly: switching on a drift changes not only how strong an old hit is, but also which earlier point of the orbit produced it. Near a root fold, where $J_q$ approaches zero, that second sensitivity blows up.*

> Claim grade: derived on a fixed simple-root chart. Falsifier: root finite differences that fail to converge to this derivative at drift values well away from any fold indicate an incorrect ledger or an incorrect derivative implementation, and would invalidate any continuation built on it.

## Finding 6: Delay Divergence Does Not Imply Period Divergence

A periodic delay equation may retain roots emitted many periods earlier, so

$$
\tau_{\mathrm{forward}}\sim(c_f-u)^{-1}
\qquad\text{does not imply}\qquad
T_u\sim(c_f-u)^{-1}.
$$

The missing companion estimate is the weight. On a chasing forward root, $r\sim c_f\tau\sim c_fd_{\min}/(c_f-u)$ and $D_t\sim c_f-u$, so the per-hit acceleration contribution scales as

$$
\frac{1}{r^2}\cdot\frac{c_f}{|D_t|}
\;\sim\;
\frac{(c_f-u)^2}{c_f^2d_{\min}^2}\cdot\frac{c_f}{c_f-u}
\;\sim\;
\frac{c_f-u}{c_f\,d_{\min}^{2}} .
$$

*Plainly: the oldest forward hit becomes arbitrarily delayed and, at the same time, arbitrarily weak. The orbit does not have to wait for it before completing another cycle — it simply stops mattering.*

Finite memory changes the reading. If retained history is part of the physical model, the forward channel disappears at or below $u_{\mathrm{crit}}$. If retained history is merely a numerical truncation, disappearance there is a numerical failure and not physics. The corpus currently states the delay divergence and the memory obligation without the weight-decay companion, which invites the stronger and unsupported reading.

> Claim grade: plausible asymptotic inference; the exact scaling depends on the orbital phase and the transmitter velocity at the root. Falsifier: compute the forward-root contribution against $c_f-u$ on a converged ledger. Failure of the predicted linear decay — in particular growth caused by a simultaneous approach of $J_q$ to zero — invalidates the smooth-shedding picture.

A high-drift regime carried entirely by rear-partner and self roots is kinematically possible, but its shape law is not constrained to $1/\gamma_f$ by anything shown so far. As $u\to c_f^-$ the surviving ledger becomes strongly one-sided, so longitudinal–transverse reciprocity would need a new, demonstrated cancellation rather than an assumed one.

> Claim grade: existence of the high-drift branch is unresolved. Falsifier: remove forward hits from a balanced low-drift ledger; a nonzero phase-averaged longitudinal or radial balance defect that cannot be corrected continuously means no rear-and-self-only continuation exists.

## Finding 7: Unregularized Folds Are Singular, Not Small Branch Corrections

At a fold, $G=0$ and $G_\tau=-c_fJ=0$ simultaneously. Generically $G_{\tau\tau}\neq0$ there, so near a control value $u_\ast$ the two roots born or destroyed satisfy

$$
\tau_\pm-\tau_\ast\sim\pm C\sqrt{|u-u_\ast|},
\qquad
|D_t|\propto|J|\sim\sqrt{|u-u_\ast|},
\qquad
W=\frac{c_f}{|D_t|}\sim|u-u_\ast|^{-1/2}.
$$

The sign structure is the crux. Across a fold $G_\tau$ changes sign, so the two newborn roots carry $D_t$ of **opposite** sign — but the postulated weight is $c_f/|D_t|$, so both weights are positive, and the two roots sit at nearly the same emission point and therefore share a direction $\hat{\mathbf r}$. Their singular parts **add** rather than cancel.

*Plainly: when a pair of new hits is born, this kernel makes the acceleration blow up instead of nudging it. The two new hits point the same way and both get very large, so they reinforce.*

> Claim grade: derived generic fold asymptotic. Falsifier: exhibit an analytic cancellation of the singular coefficients in the complete signed acceleration sum, or demonstrate regulator-independent finite continuation through a fold.

Two consequences follow. First, no finite universal bound on jumps in $\xi(u)$ or $T_u$ exists for the unregularized law, so the branch-quantized envelope reading of (P3) — small ledger-indexed corrections averaging into a smooth $\gamma$ — is not supported without a declared regulator. Second, the absolute value in $|D_t|$ is doing the damage: a signed denominator would produce the cancellation that is absent here. Whether the absolute value is the intended kernel definition or an artifact of transcription is a question for the operator, and it is not resolvable from the packet text alone.

*Plainly: the choice to take the size of the denominator rather than its signed value is exactly what turns a fold from a bump into a blow-up. That choice deserves an explicit statement of why it is right.*

## Finding 8: A Denominator Power Alone Cannot Restore Covariance

Consider the scalar-weight family

$$
\mathcal K_{n,p}
=
\frac{\hat{\mathbf r}}{r^2}
\left(1-\hat{\mathbf r}\cdot\boldsymbol\beta_t\right)^{-n}\left(1-b^2\right)^{p},
\qquad
\mu=\hat{\mathbf r}\cdot\hat{\mathbf e}.
$$

Its small-drift expansion, and the symmetric forward/backward average that a closed orbit samples, are

$$
\left(1-b\mu\right)^{-n}=1+n\mu b+\frac{n(n+1)}{2}\mu^2b^2+O(b^3),
$$

$$
\frac12\left[\left(1-b\mu\right)^{-n}+\left(1+b\mu\right)^{-n}\right]\left(1-b^2\right)^{p}
=1+\left[\frac{n(n+1)}{2}\mu^2-p\right]b^2+O(b^4).
$$

The postulated first-power kernel $n=1$, $p=0$ gives coefficient $\mu^2$; a third power gives $6\mu^2$.

*Plainly: the exponent $n$ sets one angular weight and the numerator exponent $p$ sets one direction-independent weight. That is two dials.*

The acceleration still points only along the delayed radial line. At $O(b^2)$ the defect $\mathcal F_{bb}$ generally carries independent projections onto at least the radial $m=0$, radial $m=2$, and tangential $m=2$ harmonics of the orbit, and a tangential component cannot be produced at all by a scalar reweighting of radial contributions unless the existing root directions happen to span it with the right relative magnitudes.

> Claim grade: **downgraded** from the review round's "derived structural obstruction." What is derived is the two-dial count and the expansion coefficients. That the defect's independent harmonic content exceeds two is a plausible inference, unverified without the rest ledger. Whether some orbit-specific $n$ closes $O(b^2)$ for the maximum-curvature binary specifically is unresolved. Falsifier: project the $O(b^2)$ residual onto the radial $m=0$, radial $m=2$, and tangential $m=2$ harmonics; a single $(n,p)$ that zeroes all independent projections at every phase — not merely after orbital averaging — would leave the scalar family alive at that order.

## Finding 9: The Closed-Return Argument Needs A Named Root Itinerary

Built from actual causal roots rather than an assumed round-trip signal, a two-hit return requires

$$
G_{-+}(\tau_{+-};\theta_1,u)=0,
\qquad
G_{+-}(\tau_{-+};\theta_1+\Omega_u\tau_{+-},u)=0,
$$

with phase closure $\Omega_u(\tau_{+-}+\tau_{-+})=2\pi k+\Delta\theta_{\mathrm{return}}$ for a declared integer itinerary $k$, and with weights $W_{+-}=c_f/|D_{t,+-}|$ and $W_{-+}=c_f/|D_{t,-+}|$ along that itinerary.

*Plainly: a real return cycle has to name two actual wake hits, the phases at which they occur, and how hard each one kicks. Equal travel times alone do not close anything.*

For fixed, non-orbiting, co-moving endpoints this reduction reproduces the kinematic selection $g(b)=\sqrt{1-b^2}$. For the orbiting binary, $\boldsymbol\rho_u(\theta-\Omega_u\tau)$ appears inside both root equations, so both delays depend on orbital phase and on the super-wake-speed internal motion, and no phase-independent scalar equation for $g$ survives in general.

> Claim grade: derived ledger formulation; survival of the Lorentz $g$ for the maximum-curvature binary is unresolved and not implied by (K1). Falsifier: evaluate the two-root return bracket on the Lorentz-deformed ellipse; any residual phase dependence at $O(b^2)$ after optimizing $T_u$ rejects (K1) as an exact reduction of that itinerary.

## Finding 10: The Coframe Reciprocity Product Is Normalization-Dependent

Under independent rescaling of the legs,

$$
e^0\mapsto a(u)e^0,
\qquad
e^\parallel\mapsto b(u)e^\parallel,
\qquad
e^\perp\mapsto c(u)e^\perp,
$$

the reciprocity product $e^0(\partial_T)\,e^\parallel/e^\perp$ changes by the factor $ab/c$. It can therefore be forced to equal one by rescaling a single leg.

*Plainly: as written, the test can be passed by choosing units, which is exactly the kind of hidden tuning it was invented to rule out.*

> Claim grade: derived gauge objection. Falsifier: two admissible ledger-based normalization rules that yield different reciprocity values on the same branch would confirm the objection concretely; a proof that the declared construction fixes $a$, $b$, $c$ uniquely would dissolve it.

The proposed repair is to declare six normalizations, each stated in ledger quantities only, before any moving branch is evaluated:

1. **Clock normalization.** One named internal return event increments $\tau$ by $T_0$, with $e^0=d\tau$ along the assembly center record.
2. **Longitudinal ruler normalization.** $e^\parallel(\Delta\mathbf X_\parallel)=1$ for a named pair of equal-$T$ boundary events selected by a declared ledger rule.
3. **Transverse ruler normalization.** $e^\perp(\Delta\mathbf X_\perp)=1$ for the corresponding transverse boundary events.
4. **Axis fixing.** $e^\parallel$ aligned with the drift inferred from the center record; $e^\perp$ in the declared transverse plane.
5. **Rest calibration.** All three legs reduce to the same designated $u=0$ clock and ruler standard.
6. **No post hoc rescaling.** Event-selection and normalization rules are frozen before any moving branch is evaluated.

With these in place the reciprocity product becomes an observable comparison against a rest standard — but it is then no more fundamental than the measured clock and ruler ratios it is built from. (P1) is therefore a useful packaging test, not an independent circularity-proof theorem.

*Plainly: the coframe has to be built out of specified clock ticks and specified ruler endpoints. Calling it "ledger-derived" does not by itself remove the freedom to choose units.*

## Finding 11: The Mass Shell Is Weaker Than The Pair Of $\gamma$-Shaped Readouts

There is no algebraic impossibility in $\gamma$-shaped energy and momentum, but the constraint on the wake channels is stiff and fully determined. With $\mathbf X_\sigma=uT\hat{\mathbf e}+\sigma\boldsymbol\rho_u$, the architrino bookkeeping terms are

$$
\sum_\sigma\tfrac12\mu_{\mathrm{arch}}\|\dot{\mathbf X}_\sigma\|^2
=\mu_{\mathrm{arch}}u^2+K_{\mathrm{int}}(u),
\qquad
\sum_\sigma\mu_{\mathrm{arch}}\dot{\mathbf X}_\sigma=2\mu_{\mathrm{arch}}u\,\hat{\mathbf e},
$$

the internal contribution to momentum cancelling exactly by the $\sigma$ antisymmetry. Matching the targets $E_{\mathrm{CM}}=M_0c_f^2\gamma_f$ and $\mathbf P=M_0\gamma_fu\hat{\mathbf e}$ order by order forces

$$
E_{\mathrm{wake}}(u)-E_{\mathrm{wake}}(0)
=\left(\frac{M_0}{2}-\mu_{\mathrm{arch}}\right)u^2
+\frac{3M_0}{8c_f^2}u^4+\cdots
-\bigl[K_{\mathrm{int}}(u)-K_{\mathrm{int}}(0)\bigr],
$$

$$
\mathbf P_{\mathrm{wake}}(u)
=\left(M_0-2\mu_{\mathrm{arch}}\right)u\,\hat{\mathbf e}
+\frac{M_0}{2c_f^2}u^3\,\hat{\mathbf e}+\cdots .
$$

*Plainly: the wake ledger and the reorganizing internal motion must together supply very particular coefficients at every even power of the drift. That is a demand placed on the wake accounting, not a derivation of it.*

Separately: the shell relation $E^2-c_f^2\|\mathbf p\|^2=M_0^2c_f^4$ is one scalar identity. It is implied by the pair of $\gamma$-shaped readouts, but it does not imply them — any reparameterization $u\mapsto w(u)$ applied to both readouts preserves the shell while destroying both target shapes. A shell residual is therefore a necessary check, never a sufficient one, and should not be read as certifying Lorentz closure on its own.

> Claim grade: derived necessary constraint on $E_{\mathrm{wake}}$ and $\mathbf P_{\mathrm{wake}}$, and derived weakness of the shell relative to the pair. Not evidence that a suitable conserved wake energy exists. Falsifier: construct $E_{\mathrm{wake}}$ and $\mathbf P_{\mathrm{wake}}$ independently from the wake record; if they fail either displayed equation on the same moving branch, the mass-shell claim fails.

## Finding 12: The Fold-Free Drift Interval Is Currently Uncertified

At fixed internal orbit, drift perturbs the transmitter denominator as

$$
D_t=c_f-\hat{\mathbf r}\cdot\left(u\hat{\mathbf e}+\mathbf V_{\mathrm{int}}\right).
$$

Because the rest benchmark has $\|\mathbf V_{\mathrm{int}}\|>c_f$, there are already phases at which the internal projection approaches $c_f$ with no drift at all. An $O(u)$ change can therefore drive $D_t$ through zero at drift speeds far below $c_f$, unless the rest ledger has a uniform margin

$$
d_J=\inf_{q,\theta}\left|D_{t,q}(0,\theta)\right|>0 .
$$

A fold-free interval requires both a measured $d_J$ and a Lipschitz constant covering the drift-induced change in $\hat{\mathbf r}$ and in root phase. Neither is presently measured, so **no positive fold-free drift interval is currently certified**, and Finding 7 says the response at a fold is singular rather than bounded.

*Plainly: an internal orbit that already outruns its own ripples can sit right on the edge of a root birth before the center moves at all. A tiny drift may then create or destroy hits, and the theory has not yet measured how much headroom there is.*

> Claim grade: derived local criterion; the fold location is unresolved. Falsifier: compute $d_J$ over the complete rest ledger. A value bounded well away from zero, maintained under continuation, excludes early branch changes and restores the smooth reading.

## Finding 13: The Drift-Only Holonomy Reading In (P2) Is Stale

The consultation packet restates the no-retune witness as loop holonomy over the one-dimensional drift base. The 2026-06-24 Cartan-lens round already established that curvature, loop holonomy, and the cocycle law are automatically trivial on a one-dimensional base with no noncontractible loops, and proposed replacing that reading with frozen-source held-out parallelism. The Lorentz-lens round reached the same conclusion independently.

Per the evidence-independence rule, this is agreement between two review lenses applied to the same corpus statement. It corroborates the *reading*, and it does not constitute independent evidence about the substrate. The action it licenses is editorial: stop restating the retired form.

*Plainly: two different reviewers noticed the same problem with the same sentence. That is a good reason to fix the sentence, not a new physical result.*

> Claim grade: derived, from the earlier round. Falsifier: an enlarged parameter base — drift crossed with relative phase, or with a second retained physical modulus — on which a genuine curvature or loop-holonomy test becomes nontrivial would restore a role for the original form on that larger base.

## Proposed Changes

### Batch A — reader-facing corpus corrections

Each item adds a grade, a hedge, or a companion estimate. None introduces a new physical claim.

1. **`content/markdown/aaa/spacetime/lorentz-kinematics.md`, closed-return derivation section.** Add an explicit `> Claim grade:` line. The section currently carries the correct caveat that the selection of $g(\beta_\star)=\sqrt{1-\beta_\star^2}$ "is still not a stability theorem," but the file's only three graded claims sit elsewhere. Grade the selection as *derived, conditional on a single-speed closed return and on orientation independence*, with the falsifier from Finding 9.
2. **Same file, closed-return derivation section.** Add the two-root itinerary condition of Finding 9 and the statement that the reduction is exact only for fixed, non-orbiting, co-moving endpoints; for the orbiting binary both delays depend on orbital phase, so no phase-independent scalar equation for $g$ survives without a named itinerary.
3. **Same file, residual-triple definition in the translating binary benchmark section.** Add a grade line recording that the triple is a *definition of a test*, and that no value of it has been produced by evolving the delayed law at any drift speed.
4. **Same file, causal-root ledger progression section.** Add the fold asymptotic of Finding 7 and regrade the branch-quantized Lorentz response accordingly: at an unregularized fold $|D_t|\sim|u-u_\ast|^{1/2}$, so the newly born pair contributes $\sim|u-u_\ast|^{-1/2}$, with the two same-sign weights adding because the kernel uses $|D_t|$. The envelope reading requires a declared regulator; without one the ledger progression is singular rather than a small correction.
5. **`content/markdown/aaa/dynamics/master-equation.md`, forward partner-root starvation proposition, and `content/markdown/aaa/dynamics/binary-dynamics.md`, translating binary handoff section.** Add the weight-decay companion of Finding 6. The starvation statement is correct as written, but the sentence contrasting the $(c_f-u)^{-1}$ delay divergence with the $(c_f-u)^{-1/2}$ Lorentz divergence invites the unsupported inference that the branch period must diverge at the faster rate. Record that the forward hit's acceleration contribution decays as $(c_f-u)$, so with unlimited retained history the channel fades smoothly, while a finite retained window deletes it abruptly at $u_{\mathrm{crit}}$ — and that distinguishing those two cases is the difference between physics and a memory-depth artifact.

### Batch B — priority corrections

1. **`reference/priorities/equation-mapping/eq-02-04-translating-binary-shared-record-instantiation.md`, connection and holonomy no-retune target section.** Add the six normalization conditions of Finding 10 as declared prerequisites of the reciprocity test, and record the $ab/c$ scaling. Note that neither existing negative control tests leg-rescaling freedom, and add a third: a `leg_rescaled_coframe` control that must fail the test.
2. **Same file.** Restate the no-retune witness per the accepted 2026-06-24 disposition — frozen-source held-out parallelism — and remove the drift-only loop-holonomy reading (Finding 13).
3. **`reference/priorities/equation-mapping/eq-02-04-lorentz-energy-packet.md`.** Add the adjoint solvability condition of Finding 3 as the derivation target for the clock and shape coefficients, with the Fredholm side condition stated explicitly, and add the unknown-versus-condition count of Finding 4 as the cheap existence pre-test. Add the shell-weakness note of Finding 11 so the shell residual row is not read as sufficient.
4. **Same file and `reference/priorities/equation-mapping/equation.md`.** Reconcile the two residual notations: the corpus uses the $\mathcal R_{\mathrm{bin}}$ triple including a shape residual, the priority lane uses the branch-indexed vector. Declare one canonical form and cross-reference the other as an alias.
5. **`reference/priorities/equation-mapping/work-queue.md`, the Lorentz envelope closure item.** Replace the current success marker with the small-drift continuation experiment below.
6. **`reference/priorities/equation-mapping/work-log.md`.** Record this round, the corrected root defect of Finding 2, and the regrades in the claim map.

### Non-changes — already present, do not duplicate

- The round-trip anisotropy budget through fourth order is **already derived** in the corpus, in a more general two-parameter gauge than the review round used, and already yields the required coefficients in the transverse gauge. The review's fixed-arm restatement adds nothing there and should not be promoted. What is genuinely new is the observation that the orbiting binary supplies additional fourth-order harmonics — phase, weight, root-shift, and non-elliptic shape contributions — so a single fitted axis ratio is generally insufficient at that order. Record only that decomposition, as a proposed ledger budget.
- The starvation proposition's kinematic content and its separator taxonomy are correct and appropriately hedged; only the weight-decay companion is missing.

*Plainly: one of the review's answers restated something the textbook already has, in a weaker form. That part gets dropped, and only the new piece is kept.*

## Decisive Next Computation

Work in normalized wake-speed units, $c_f=1$. The highest-information experiment is a small-drift continuation with an imposed-shape residual test, **not** a high-drift evolution.

**Order of operations.** Run the kernel-dimension count of Finding 4 first; it is far cheaper and can end the program locally on its own.

**Configuration.** Start from one numerically balanced $u=0$ circular maximum-curvature binary with a complete declared root ledger, including self-hits. Continue relative-periodic branches at

$$
u\in\{0,\pm0.025,\pm0.05,\pm0.075,\pm0.10\},
$$

stopping before any root reaches the declared Jacobian floor.

*Plainly: nudge the drift up in small steps from zero, following the same orbit rather than restarting, and back off before any hit is on the verge of being born or dying.*

**Measurements.** Fit both response series, and separately evaluate the phase-resolved residual of the imposed Lorentz candidate:

$$
\frac{T_u}{T_0}=1+a_1u+a_2u^2+a_3u^3+a_4u^4+\cdots,
\qquad
\frac{L_\parallel}{L_\perp}=1+g_1u+g_2u^2+g_3u^3+g_4u^4+\cdots,
$$

$$
\mathcal E_L(\theta,u)
=\Omega_L^2\boldsymbol\rho_L''(\theta)-\mathcal A[\boldsymbol\rho_L,\Omega_L,u](\theta).
$$

*Plainly: solve for the moving orbit the law actually permits, and separately test what the Lorentz guess demands. Matching only the fitted period, or only the fitted shape, proves nothing.*

**Convergence controls, all required.** Complete all-root enumeration including self-hits; both drift signs, to expose forbidden odd terms; retained-history depth increased until every reported root and observable is unchanged; phase resolution doubled at least twice; time and root tolerances tightened at least twice; regulator width reduced across at least three values with extrapolation; minimum $J_q$ reported for every root; independent root enumeration or analytically checked root cases; and no continuation across a fold unless regulator convergence is separately established.

*Plainly: every one of those controls exists to stop the answer from being an artifact of how long a history was kept, how finely the orbit was sampled, or how the near-singular hits were smoothed. If the number moves when you tighten any of them, it was never a measurement.*

**Clean pass at second order.** Simultaneously

$$
|a_1|,|g_1|<\varepsilon,
\qquad
\left|a_2-\tfrac12\right|<\varepsilon,
\qquad
\left|g_2+\tfrac12\right|<\varepsilon,
\qquad
\sup_\theta\|\mathcal E_L(\theta,u)\|\le Cu^4
$$

under refinement, with $\varepsilon=10^{-3}$ and reported numerical uncertainty below $3\times10^{-4}$.

**Clean failure.** Any one of: the $u=0$ balance does not converge; no nearby translating periodic branch exists; an unavoidable fold occurs arbitrarily close to $u=0$; the confidence interval for $a_2$ excludes $\tfrac12$; the interval for $g_2$ excludes $-\tfrac12$; the Lorentz-candidate residual converges to $C_2u^2$ with $C_2\neq0$; or the result changes under memory, root, regulator, or resolution refinement.

*Plainly: the sharpest possible negative result is a stable, nonzero, second-order acceleration defect sitting on the Lorentz-deformed path. It names the failure before stability or high-speed complications ever enter.*

> Claim grade: proposed falsifiable computation. A pass at second order would **nominate**, not certify, the program; fourth order, fold-free continuation, stability, and an independent oracle would all remain.

## Rejected And Not Promoted

- **The exponent mismatch as a stand-alone obstruction.** Rejected as stated (Finding 6). It survives only as a finite-memory statement, and only when retained history is declared physical rather than numerical.
- **The review round's root defect expression.** Rejected in favour of the corrected identity (Finding 2). The conclusion drawn from it stands.
- **The fixed-arm two-way budget as a new result.** Rejected as duplicative of existing corpus material.
- **(P1) as a circularity-proof theorem.** Not promoted. It may be retained as a packaging test once the six normalizations are declared.
- **(P3) as a mechanism for a smooth Lorentz envelope.** Not promoted for the unregularized kernel.

## Remaining Open Questions

1. Is the linearized delayed operator Fredholm on the relevant space, so that the solvability reduction of Finding 3 is legitimate? This gates everything downstream.
2. What is $\dim\ker L^\ast$ on the accepted rest ledger, and does it exceed the free-constant count (Finding 4)?
3. What is the measured margin $d_J$, and does any positive fold-free drift interval exist (Finding 12)?
4. Is the absolute value in the transmitter weight $c_f/|D_t|$ the intended kernel definition? A signed denominator would cancel the fold divergence of Finding 7, and the choice materially changes the theory's fold behaviour.
5. Is there an orbit-specific denominator power that closes the second-order balance for the maximum-curvature binary, or does the harmonic content of the defect exceed the available two dials (Finding 8)?
6. Do independently constructed wake energy and wake momentum satisfy both constraints of Finding 11 on the same moving branch?

---

## Stage 2 — Follow-On Prompt Issued

Reproduced verbatim below for the source record. It is self-contained: the reviewer needs no access to this file or to any other.

> Closure goal: settle whether the second-order solvability route of the first round is legitimate at all, whether the first-order response is forced to vanish, and whether the transmitter weight and its absolute value can be derived from the emission picture rather than postulated — the three places where the negative presumption could be either hardened into a theorem or overturned.
>
> This is a second round on the same system. Everything needed is restated here; do not reference or request any external document. Where something is missing, state the assumption you made and proceed.
>
> **The substrate, restated.** Space is a fixed flat Euclidean $\mathbb R^3$; time is one absolute parameter $T$ shared by all entities. The only primitive is a structureless point carrying polarity charge $q$ on a continuous path $\mathbf X(T)$. It has no mass, no rest energy, and no force acts on it; the law is acceleration-first. There is no field as a substance — no $\mathbf E$, no $\mathbf B$, no gauge potential. Each point continuously emits expanding spherical wake surfaces at universal speed $c_f$, and a receiver is accelerated only by surfaces sweeping across it at that instant, so contributing emission times solve $\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\|=c_f(T_r-T_t)$. Several roots can be active at once; that set is the causal-root ledger. With $\mathbf r_t=\mathbf X_r(T_r)-\mathbf X_t(T_t)$ and $D_t\equiv c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)$, the entire law is
>
> $$
> \frac{d^2\mathbf X_r}{dT_r^{2}}
> =\sum_{t}\sum_{T_t\in\mathcal C_{r\leftarrow t}(T_r)}
> \kappa\,\sigma_{tr}\,|q_tq_r|\,\frac{\hat{\mathbf r}_t}{r_t^{2}}\,\frac{c_f}{|D_t|},
> $$
>
> summed over all active roots including self-hits. Nothing else: no velocity term, no acceleration term, no transverse or magnetic-analog component, and receiver velocity does not enter the strength of a hit. Nothing caps a point's speed at $c_f$; points may exceed it, which is what makes self-hits possible.
>
> *Plainly: moving points spray expanding bubbles, you get a kick along the line to wherever the emitter was when it fired, falling off as inverse square, weighted by a factor that grows when the emitter was closing on you. That is the whole law.*
>
> **The object.** Two opposite-polarity points at opposite ends of a circle of radius $R_0$, orbiting the fixed midpoint at rate $\omega_0$, tangential speed $s_0=R_0\omega_0>c_f$ — so the constituents already outrun their own signals and are continually struck by their own past wake. Its balance is hypothesized to be opposite-polarity attraction inward against self-hit repulsion outward; attractor status is unproven. Give it a uniform center drift $u\hat{\mathbf e}$ with $0<u<c_f$ and ask whether the resulting periodic branch shows $T_u/T_0=\gamma_f$ and $L_\parallel/L_\perp=1/\gamma_f$ with $\gamma_f=(1-u^2/c_f^2)^{-1/2}$ extracted from the delay dynamics rather than inserted.
>
> **Ground rules, unchanged.** Do not assume special relativity anywhere in an argument; the invariance of a signal speed, the relativity principle, the Lorentz group, and mass-shell relations are targets, never premises. Do not substitute Liénard–Wiechert — the kernel is exactly as stated, and if you believe it is unphysical, say so and explain why rather than replacing it. Do not treat $c_f$ as a speed limit for matter. Do not introduce mass or force at the primitive level. Set $c_f=1$ in every numerical instantiation. Grade every claim as derived, plausible inference, proposed innovation, or unresolved, and state its falsifier. Follow each technical passage with a short plain-language gloss. A negative result with a named mechanism is as valuable as a positive one.
>
> **First: overall.** Before the specific questions, give three to five overall observations — including any correction to the corrections below, and anything from your first round you would now grade differently.
>
> **Then: four to six numbered comments**, each tagged `[DERIVATION]`, `[OBSTRUCTION]`, `[COUNTEREXAMPLE]`, `[FALSIFIER]`, `[REGRADE]`, or `[METHOD]`, with at least two `[DERIVATION]`. Then answer F1–F9 directly.
>
> ---
>
> **F1. A correction to your root-defect identity, and what it might repair.** You gave the defect of the active map $\mathbf X_u(T)=uT\hat{\mathbf e}+A_u\mathbf X_0(T/\gamma_f)$, $A_u=\operatorname{diag}(\gamma_f^{-1},1,1)$, as $2u\Delta t_0 x_\parallel$, with the remaining quadratic terms cancelling through $\gamma_f^{-2}$. Recomputation gives an incomplete cancellation:
>
> $$
> \|\Delta\mathbf X\|^2-c_f^2\Delta T^2
> =2u\Delta t_0\,x_\parallel-\frac{u^2}{c_f^2}x_\parallel^2
> =\frac{u x_\parallel}{c_f^2}\left(2c_f^2\Delta t_0-u x_\parallel\right).
> $$
>
> Checked at $c_f=1$, $u=0.6$, $x_\parallel=1$, $\mathbf x_\perp=0$, $\Delta t_0=1$: directly $\Delta X^2-\Delta T^2=1.55^2-1.25^2=0.84$; corrected form $1.2-0.36=0.84$; your form $1.2$. Confirm or refute. Then use the factorized structure: is there any map of the form $T\mapsto \alpha T+\lambda x_\parallel$, $x_\parallel\mapsto x_\parallel/\gamma_f+\beta T$, $\mathbf x_\perp\mapsto\mathbf x_\perp$ that preserves the root relation for all pairs? If yes, derive the multiplier it induces on $d^2\mathbf X/dT_r^2$ and on the weight $c_f/|D_t|$ explicitly, and say what kernel would have to replace the postulated one for the deformed family to close. Please derive rather than name the multiplier.
>
> **F2. Is the solvability reduction legitimate?** Your $a_2=\langle\psi,\tfrac12\mathcal F_{bb}\rangle/\langle\psi,\Omega_0\mathcal F_\Omega\rangle$ requires the linearized delayed operator $L$ to be Fredholm. But here the delay set has variable cardinality in the parameter, the delays are state-dependent, and the weights carry $|D_t|^{-1}$. On what function space, if any, is $L$ Fredholm? Does the standard sun-star framework on $C([-h,0];\mathbb R^n)$ apply when the number of delays is not fixed? If $L$ is not Fredholm, what replaces the projection formula — and does the whole second-order programme have to be reformulated?
>
> **F3. Must the first-order response vanish?** You flagged $\boldsymbol\rho_1=a_1=0$ as needing an argument. The exact substrate symmetry is only $E(3)\times\mathbb R_T$. The rest binary carries an orbital sense, so a reflection in the plane containing the drift and the orbital axis maps it to the counter-rotating configuration, not to itself. Does that permit a first-order response built from a pseudoscalar such as $\hat{\mathbf e}\cdot\hat{\mathbf L}$? Settle which holds: $a_1$ must vanish for all drift orientations; $a_1$ vanishes only for drift parallel or perpendicular to the orbital axis; or $a_1$ need not vanish. If $a_1\neq0$ for generic orientation, the period responds linearly in $u$ — non-Lorentzian at first order, and the cheapest falsifier in the whole programme.
>
> **F4. Is the fold singularity integrable?** You showed newborn fold pairs contribute acceleration $\sim|\Delta|^{-1/2}$. As a function of the drift parameter that is integrable. Along a trajectory crossing a fold in absolute time, is the singularity also integrable, so that velocity and position stay finite while acceleration is unbounded on a measure-zero set? Compute the time-integrated impulse across one fold crossing. If it is finite, does that rehabilitate a regulator-free reading in which a fold contributes a finite jump to time-averaged observables — which would partly restore the branch-quantized picture you graded implausible?
>
> **F5. Derive the transmitter weight, do not assume it.** Two roots born at a fold carry $D_t$ of opposite sign, but the postulated weight uses $|D_t|$, so their singular parts add; a signed denominator would cancel them. Rather than adjudicating between the two forms by preference, derive the weight from the emission picture alone: a point emits at a constant rate along its path, and the wake surfaces sweep across the receiver. What weight does the sweep rate of wake surfaces across a stationary receiver actually give, and does that derivation produce $|D_t|$, signed $D_t$, or some other power? If the derivation does not produce the postulated first power, say so plainly — that is a finding about the kernel, not about the reviewer.
>
> **F6. Is there a conserved energy at all?** The exact symmetry is $E(3)\times\mathbb R_T$, so Noether's theorem should supply conserved energy, momentum, and angular momentum — but only for a system derived from a variational principle. Is the postulated kernel derivable from any action over paths with delayed coupling? If it is not, does a conserved energy exist for it by any route? If no conserved energy exists, the mass-shell programme, which presumes a drift-independent $M_0$, fails at the root and should be said to fail. If one does exist, give the wake-channel expressions $E_{\mathrm{wake}}$ and $\mathbf P_{\mathrm{wake}}$ explicitly for this kernel rather than as unknowns to be constrained after the fact.
>
> **F7. Does the high-drift regime make a positive prediction?** You allowed a regime in which the ledger is carried entirely by rear-partner and self roots, with a shape law not constrained to $1/\gamma_f$. Is there a computable leading prediction for the axis ratio there, even asymptotically as $u\to c_f^-$? A distinctive non-Lorentzian shape law would be a positive falsifiable signature, which is worth more than the mere absence of the Lorentz one.
>
> **F8. How would you actually continue this numerically?** Standard pseudo-arclength continuation for delay equations assumes a fixed finite delay set. Here the ledger cardinality changes with the parameter and the delays are state-dependent. Be concrete: what discretization — collocation on the periodic orbit with roots solved to tolerance inside each residual evaluation, or something else? What happens to the smoothness of the continuation Jacobian as a root approaches birth, and how do you keep it usable? What is the stopping criterion on the smallest $|D_t|$?
>
> **F9. Restate your no-fold bound.** Your first-round sufficient condition read $u<d_J-C_{\mathrm{geom}}u$, which is self-referential in $u$ and mixes a speed margin with a geometric sensitivity. Please restate it as an explicit inequality in $u$ with each constant's dimensions given, and say what has to be measured on the rest ledger to evaluate it.
>
> ---
>
> *Plainly: I want to know whether the second-order argument is even allowed, whether the first-order term is forced to vanish or is a cheap way to kill the idea outright, and whether the weighting factor in the law can be derived from the bubbles instead of assumed. If any of those goes the wrong way, say so directly.*

---

## Appendix A — Substrate Statement As Issued

Retained so this document is self-contained. The consultation prompt's persona framing, reply-format instructions, and ground rules are superseded and omitted.

### A.1 Background and primitive

Space is a fixed, flat, three-dimensional Euclidean void $\mathbb R^3$ with no metric degrees of freedom. Time is a single absolute parameter $T$ shared by all entities; there is no proper time and no relativity of simultaneity at this layer. Clock readings are outputs that assemblies must be shown to produce.

The only primitive entity is an architrino: a structureless point carrying a polarity charge $q$ and following a continuous path $\mathbf X(T)$. It has no mass and no rest energy; mass is emergent bulk bookkeeping, and the one permitted universal conversion constant $\mu_{\mathrm{arch}}$ does not appear in the equation of motion. There is no force at this level and no field as a substance. For the two-body problem, $q_1=-\epsilon$ and $q_2=+\epsilon$.

*Plainly: the stage is ordinary three-dimensional space plus one universal clock, and a particle is a moving point with a sign. Everything relativistic has to be built on top rather than assumed underneath.*

### A.2 The causal wake and the delayed hit

Each architrino continuously emits an expanding spherical causal wake surface from every point of its path; a wake emitted at $T_t$ from $\mathbf X_t(T_t)$ is the sphere of radius $c_f(T-T_t)$ about that point. A receiver at $\mathbf X_r(T_r)$ is accelerated only by wake surfaces passing through its location at that instant, so contributing emission times are the roots of

$$
g_{r\leftarrow t}(T_r;T_t)
\equiv
\bigl\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\bigr\|-c_f(T_r-T_t)=0 .
$$

Several roots can be active simultaneously; the active set is the causal-root ledger.

*Plainly: every point sprays out expanding bubbles, and you feel a bubble only at the instant its surface sweeps across you. An emitter that has been moving in a complicated way can have several old bubbles reach you at once.*

### A.3 The acceleration law

With $\mathbf r_t=\mathbf X_r(T_r)-\mathbf X_t(T_t)$, $r_t=\|\mathbf r_t\|$, $\hat{\mathbf r}_t=\mathbf r_t/r_t$, transmitter velocity at emission $\mathbf V_t(T_t)$, and transmitter-side root denominator $D_t\equiv c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)$:

$$
\frac{d^2\mathbf X_r}{dT_r^{2}}
=
\sum_{t}\;\sum_{T_t\in\mathcal C_{r\leftarrow t}(T_r)}
\kappa\,\sigma_{tr}\,|q_tq_r|\;
\frac{\hat{\mathbf r}_t}{r_t^{2}}\;
\frac{c_f}{|D_t|},
$$

with $\kappa$ universal, $\sigma_{tr}=\operatorname{sign}(q_tq_r)$, and the inner sum over all active roots including self-hits. Two structural facts matter. The kernel is a bare radial inverse-square line of action times the transmitter-side weight $c_f/|D_t|$ and nothing else — no velocity term, no acceleration term, no transverse or magnetic-analog component. And receiver velocity does not enter the strength of a hit; it enters only the playback rate $m_{r\leftarrow t}=D_r/D_t$.

*Plainly: when a bubble hits you, you get a kick straight along the line from where the emitter was when it fired, falling off as inverse square, multiplied by a factor that grows when the emitter was moving toward you at emission. That is the entire law.*

### A.4 Speeds

Nothing caps an architrino's speed at $c_f$; architrinos may exceed it, which is what makes self-hits possible. The theory keeps $c_f$ (primitive wake speed), $c_\gamma$ (photon-assembly propagation speed), $c_{\mathrm{eff}}$ (effective signal speed in a dressed medium), and $c_0$ (observed light speed) distinct pending proof. This document works at the primitive level with $c_f$ only.

### A.5 Rest benchmark

The maximum-curvature binary places two opposite-polarity architrinos at diametrically opposite points of a circle of radius $R_0$, orbiting the fixed midpoint at angular rate $\omega_0$, tangential speed $s_0=R_0\omega_0$, period $T_0=2\pi/\omega_0$, with no center translation. On the unregularized simple-root circular chart, same-sheet self-hits at winding index $m$ satisfy

$$
2s\sin(\delta/2)-\delta-2\pi m=0,\qquad\delta\in(0,\pi],
$$

with the principal branch turning on at $s_0^\star=1$ and higher branches at tangency speeds obeying

$$
\cos(\delta_m^\star/2)=\frac1s,
\qquad
\sqrt{(s_m^\star)^2-1}-\arccos\!\left(\frac{1}{s_m^\star}\right)=\pi m,
$$

asymptotically $s_m^\star=\pi m+\pi/2+O(1/m)$. The active root count is therefore piecewise constant in speed, changing at folds where $g=0$ and $\partial_{T_t}g=0$ simultaneously. The balance is hypothesized to come from opposite-polarity attraction inward against self-hit repulsion outward; **attractor status is unproven**. Critically, $s_0>1$: the rest state's constituents already outrun their own signals.

*Plainly: the reference object is a pair of opposite charges whirling around each other faster than their own ripples travel, so each is constantly struck by its own past. That self-hitting is what holds the orbit open, and it is a very un-Newtonian little machine.*

### A.6 Translating ansatz and targets

Give the pair a uniform center drift and posit a periodic deformed orbit,

$$
\mathbf X_\sigma(T)=uT\hat{\mathbf e}+\sigma\boldsymbol\rho_u(\theta(T)),
\qquad
\theta(T+T_u)=\theta(T)+2\pi,
$$

to be substituted into the delayed root equation and solved in absolute time — not obtained by boosting the rest solution. Roots satisfy

$$
G_{\sigma\sigma'}(\tau;\theta,u)
\equiv
\Bigl\|u\tau\hat{\mathbf e}+\sigma\boldsymbol\rho_u(\theta)-\sigma'\boldsymbol\rho_u(\theta-\Omega_u\tau)\Bigr\|-c_f\tau=0,
\qquad
\Omega_u\equiv\frac{2\pi}{T_u},
$$

with branch Jacobian

$$
J_{\sigma\sigma'}(\tau;\theta,u)
=1-\frac{\bigl(u\hat{\mathbf e}+\sigma'\Omega_u\boldsymbol\rho_u'(\theta-\Omega_u\tau)\bigr)\cdot\hat{\mathbf r}_{\sigma\sigma'}}{c_f}.
$$

*Plainly: the root equation says when a bubble from one partner reaches the other, given that both are simultaneously orbiting and sliding sideways. The Jacobian says how fast that hit is sweeping past, and it going to zero is what marks a hit being born or dying.*

The residual triple is

$$
R^{\mathrm{bin}}_T(u)=\frac{T_u}{T_0}-\gamma_f(u),
\qquad
R^{\mathrm{bin}}_\xi(u)=\frac{L_\parallel(u)}{L_\perp(u)}-\frac{1}{\gamma_f(u)},
$$

$$
R^{\mathrm{bin}}_{\mathrm{shape}}(u)
=\inf_\varphi\frac{\bigl\|\boldsymbol\rho_u(\theta)-\boldsymbol\rho_L(\theta+\varphi;u)\bigr\|_{\mathrm{cyc}}}{R_0},
\qquad
\boldsymbol\rho_L(\theta;u)=R_0\left(\gamma_f^{-1}\cos\theta\,\hat{\mathbf e}+\sin\theta\,\hat{\mathbf e}_\perp\right).
$$

*Plainly: spin up the same little machine while sliding it sideways, and ask whether it gets shorter along the direction of motion by exactly the Lorentz factor, whether its cycle slows by exactly the same factor, and — the part that matters most — whether one calculation gives both answers rather than two separate fits.*

### A.7 The packet's own ledger, for reference

- **(D1)** one-way directional delays; **(D2)** symmetric-channel anisotropy with $\bar\tau$ depending on the line-of-sight cosine; **(D3)** wake-density anisotropy $\mathcal D_{\mathrm{wake}}=(1-\beta_f\cos\theta)^{-1}$; **(D4)** forward-root starvation, $(c_f-u)\Delta\ge d_{\min}$ and $u_{\mathrm{crit}}=c_f-d_{\min}/h_b^{\mathrm{lock}}$.
- **(K1)** closed-return axis-ratio selection forcing $g(\beta_\star)=\sqrt{1-\beta_\star^2}$, graded as a signal-timing consistency argument rather than a solution of the delay dynamics.
- **(P1)** the coframe reciprocity test; **(P2)** no-retune as a holonomy condition; **(P3)** branch-quantized Lorentz response.
- **(U1)** existence; **(U2)** stability; **(U3)** no confirmation from evolved dynamics at any drift speed; **(U4)** one solution or two fits; **(U5)** whether the kernel is capable of Lorentzian behaviour at all.

---

Closure goal: run the kernel-dimension count of Finding 4, then the small-drift continuation and Lorentz-candidate residual test above; these are the smallest decisive tests of whether this acceleration kernel can produce contraction and dilation from a single translating binary branch.
