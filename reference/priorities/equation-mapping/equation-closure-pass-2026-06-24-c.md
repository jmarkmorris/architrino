# Equation Closure Pass 2026-06-24 C

## Workstream Metadata

- Kind: `closure-pass`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Prior pass: [Equation Closure Pass 2026-06-24 B](equation-closure-pass-2026-06-24-b.md)
- Source prompt: [henri-poincare-retained-orbit-reduction-2026-06-24.md](../../entourage/review-packets/henri-poincare-retained-orbit-reduction-2026-06-24.md)
- Source response: [henri-poincare-retained-orbit-reduction-response-2026-06-24.md](../../entourage/review-packets/henri-poincare-retained-orbit-reduction-response-2026-06-24.md)
- Assigned IDs: `EQ-12A`, `EQ-22A`, `EQ-26A`
- Status: `score-neutral Poincare/monodromy retained-orbit refinement`
- Scope: priority-only; no reader-facing corpus promotion and no score changes
- Claim level: corrected first solver route, executable attempt residual, and obstruction map

## Summary

This pass integrates the nonlinear-dynamics correction that the first solver model should not be state-dependent delay and should not require a global symplectic/Hessian reduction. The first executable proof object is now a constant-delay retained orbit with Hopf birth, first-Lyapunov, and monodromy/Floquet certificates. The Poincare-Cartan orbit integral supplies the first action-period readout on the retained orbit:

$$
h_\vartheta
=
\oint_{\gamma_0}\vartheta_{\mathrm{PC}}
=
\int_0^T p(t)\dot q(t)\,dt.
$$

The state-dependent delay $\tau(x)=\tau_0+\beta x$ is deferred until the constant-delay orbit is hyperbolic-modulo-time-shift and can be continued by persistence.

## Corrected Toy Model

The first retained-orbit model is:

$$
\ddot x(t)
=
-\omega^2x(t)
+
g\,x(t-\tau)
-
\gamma\dot x(t)
+
\mu x(t)\left(1-x(t)^2\right).
$$

The constant delay keeps the history flow on a differentiability class suitable for the first solver. The cubic term isolates the orbit; without nonlinearity, the Hopf point can leave a continuum of non-isolated cycles and make the action period a projection artifact.

## First Theorem Target

The first row is a retained-orbit birth and action-readout lemma.

Let the characteristic equation be:

$$
\Delta(\lambda)
=
\lambda^2+\gamma\lambda+\omega^2-g e^{-\lambda\tau}=0.
$$

At $\tau=\tau_\star$, require a simple crossing $\lambda=\pm i\Omega_0$, transversality, all other roots stable, and nonzero first Lyapunov coefficient $\ell_1\ne0$. Then continue the bifurcated periodic orbit and compute the monodromy operator $\mathcal U=D\Phi_T$. The retained orbit is acceptable only if:

$$
\mathrm{spec}(\mathcal U)
=
\{1\}\cup\{\mu_k\},
\qquad
|\mu_k|\le\rho<1,
\qquad
1-\rho\ge\delta_{\mathrm{gap}}.
$$

The single unit multiplier is the time-shift direction. Extra near-unit multipliers mean the orbit is not isolated and the action-period row fails.

## Readout And Artifact Tests

The first two action readouts are:

$$
h_E=\frac{E_\gamma}{\nu},
\qquad
h_\Phi=\oint_{\gamma_0}p\,dq.
$$

The score-moving readout claim is not accepted until $h_E$ and $h_\Phi$ converge under collocation refinement, Poincare-section relocation, and retained-mode variation. The parameter-sweep falsifier is:

$$
\left|\frac{\partial h_\vartheta}{\partial g}\right|_{\mathrm{fam}}\to0
\quad
\text{or}
\quad
\left|\frac{\partial h_\vartheta}{\partial \mu}\right|_{\mathrm{fam}}\to0
$$

over a family where $E$ and $\nu$ move substantially. If $h_\vartheta$ must be refit at each parameter value, it is not a geometry-derived action unit.

## Executable Residual Refinement

[planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs) now treats these rows as first-class requirements before score movement:

- `constant_delay_self_hit_model_row`;
- `hopf_retained_orbit_birth_row`;
- `first_lyapunov_coefficient_row`;
- `monodromy_floquet_certificate`;
- `poincare_section_reduction_row`;
- `poincare_cartan_orbit_integral_row`;
- `energy_clock_readout_row`;
- `phase_loop_area_readout_row`;
- `readout_refinement_independence_row`;
- `parameter_sweep_action_invariance_row`;
- `history_energy_throughput_row`.

The previous Hessian/presymplectic rows are no longer the first causal solver blocker. They remain possible stronger successor rows for a variational advanced-plus-causal-delay replacement, but the causal-delay model is disciplined first by Poincare-map and monodromy data.

The checker now reports:

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
nextBlocker: missing_accepted_theta_gamma_packet
constantDelayModelPass: true
hopfRetainedOrbitBirthPass: true
firstLyapunovCoefficientPass: true
monodromyFloquetPass: true
poincareCartanOrbitIntegralPass: true
readoutRefinementIndependencePass: true
parameterSweepActionInvariancePass: true
negativeControlPassCount: 15
negativeControlCount: 15
```

The new negative controls are:

- `state_dependent_delay_first_model`;
- `hopf_degeneracy_bautin`;
- `floquet_extra_neutral_multiplier`;
- `action_readout_projection_artifact`;
- `parameter_sweep_fitted_action`.

## Score Disposition

No score changes follow from this pass.

The result is a sharper first blocker map, not accepted retained evidence. `EQ-12A`, `EQ-22A`, and `EQ-26A` remain at `2`. This pass made the constant-delay retained-orbit certificate the first executable action-period scaffold. [Equation Closure Pass 2026-06-24 E](equation-closure-pass-2026-06-24-e.md) refines its role: the scalar orbit is now the falsifier for rescalable action area, while the positive unit-source target moves to locked equal-frequency Noether braid branch evidence.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promotion waits for the scalar continuation falsifier and, if the scalar action area is rescalable as expected, a locked equal-frequency Noether braid branch whose winding plateau, four readouts, and Floquet margin close on one retained branch.
