# Equation Closure Pass 2026-06-24 B

## Workstream Metadata

- Kind: `closure-pass`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Prior pass: [Equation Closure Pass 2026-06-24 A](equation-closure-pass-2026-06-24-a.md)
- Source prompt: [terence-tao-period-quantization-2026-06-24.md](../../entourage/review-packets/terence-tao-period-quantization-2026-06-24.md)
- Source response: [terence-tao-period-quantization-response-2026-06-24.md](../../entourage/review-packets/terence-tao-period-quantization-response-2026-06-24.md)
- Assigned IDs: `EQ-12A`, `EQ-22A`, `EQ-26A`
- Status: `score-neutral retained-orbit reduction refinement`
- Scope: priority-only; no reader-facing corpus promotion and no score changes
- Claim level: corrected theorem target, executable attempt residual, and solver-facing proof route

## Summary

This pass integrates the mathematical correction that the raw delay-history space is not the right place to assert an integral period. The first score-moving object is a finite-dimensional retained-orbit reduction, not an abstract Period Quantization Lemma.

The corrected theorem target is:

$$
\mathcal H
\xrightarrow{\;\Omega_h,\ker\Omega_h\;}
\mathcal M
\supset
\bar\gamma_0,
\qquad
h_\vartheta
=
\oint_{\bar\gamma_0}\vartheta.
$$

Here $\mathcal H$ is the delay-history function space, $\Omega_h$ is a Hessian-derived presymplectic density, $\ker\Omega_h$ is the history-mode kernel to quotient, $\mathcal M$ is the finite-dimensional retained reduction when it exists, and $\vartheta$ is the tautological action one-form on the reduced cotangent/contact object. Integrality is no longer the headline theorem; it is a retained-orbit selection condition after reduction.

## Corrected Proof Route

The weak first lemma is the Retained-Orbit Period Reduction Lemma:

1. The causal action has a $C^2$ compact-support delay kernel with the required time-translation and Euclidean symmetries.
2. A hyperbolic retained periodic orbit $\gamma_0$ exists, with Floquet spectrum separated from the unit circle except for the trivial multiplier.
3. The Hessian-derived $\Omega_h$ has a finite-dimensional non-degenerate quotient near $\gamma_0$.

Then $\mathcal M=\mathcal H/\ker\Omega_h$ carries the reduced symplectic/contact structure, $\bar\gamma_0$ is a closed orbit in $\mathcal M$, and $\oint_{\bar\gamma_0}\vartheta$ is chart-independent. Readout independence is therefore a consequence of the reduction. If energy, momentum, and angular-momentum readouts infer different periods, the reduction is wrong or a resonant/slaved history mode has not been controlled.

The resonance obstruction is explicit:

$$
\mathcal N_{\mathrm{res}}
=
\frac{\max(0,\delta_{\min}-\min_k|\Delta_k|)}
{\delta_{\min}+\varepsilon_\delta}.
$$

This is the non-resonance certificate for small-divisor splitting. A failure here explains $h_a\ne h_b$ without treating the disagreement as numerical noise.

## Fibration Correction

The shared carrier from the previous pass was too large. The Noether sea state and $c_\gamma$ are base/constitutive data, not part of the intrinsic carrier of $\vartheta$. The corrected object is a sea-state fibration:

$$
\pi:\mathcal M\to B_{\mathrm{sea}},
\qquad
\vartheta\in\Omega^1(\mathcal M/B_{\mathrm{sea}}).
$$

The Planck/action row uses the fiberwise period $h_\vartheta$. The blackbody row adds photon-channel transversality and thermal rows. The fine-structure row adds charge exposure, electromagnetic response, and threshold inventory. Running $\alpha(\mu)$ may change only $\mathcal K_{\mathrm{EM}}(\mu;\theta_{\mathrm{sea}})$ and $I_\mu$; it may not move the geometry-derived period.

## Executable Residual Refinement

[planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs) now requires these reduction-specific rows in addition to the photon, thermal, coupling, provenance, and retune rows:

- `retained_orbit_reduction_row`;
- `hessian_history_pairing_row`;
- `history_presymplectic_kernel_row`;
- `tautological_action_one_form_row`;
- `noether_action_balance_row`;
- `period_readout_independence_row`;
- `non_resonance_certificate`;
- `sea_state_fibration_row`;
- `geometry_derived_action_period_row`.

The attempt fixture [planck-alpha-braid-attempt.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-attempt.v1.json) carries illustrative residual-zero values for the reduction fields while every row remains `attempt`.

The checker now reports:

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
nextBlocker: missing_accepted_theta_gamma_packet
retainedOrbitReductionPass: true
periodUniquenessPass: true
nonResonancePass: true
geometryDerivedActionPass: true
negativeControlPassCount: 10
negativeControlCount: 10
```

The two new negative controls are:

- `small_divisor_resonance`, which fails the non-resonance certificate;
- `alpha_fitted_action_period`, which fails if $h_\vartheta$ is inferred from coupling data rather than derived from retained-orbit geometry.

## Toy Model Target

The next executable proof object should be the scalar state-dependent self-hit oscillator:

$$
\ddot x(t)
=
-\omega^2x(t)
+
g\,x(t-\tau(x(t))),
\qquad
\tau(x)=\tau_0+\beta x.
$$

The first three work steps are:

1. Write a variational action $S[x]$ whose Euler-Lagrange equation is the delay equation, then compute $w(\sigma)$ as the Hessian cross-term.
2. Identify $\ker\Omega_h$ and reduce near a Hopf-born periodic orbit $\gamma_0$.
3. Compute $\oint\vartheta$ in $(p,x)$ and in action-angle $(J,\phi)$ coordinates under time-step refinement; convergence to one value supports readout independence, while splitting exposes the resonance obstruction.

## Score Disposition

No score changes follow from this pass.

The new result is a sharper blocker map: the action period must be derived from orbit geometry before it is consumed by blackbody, de Broglie, atomic, or fine-structure rows. In particular, the $\alpha(\mu)$ falsifier is valid only after $h_\vartheta$ is geometry-derived and the charge-exposure scheme is pinned.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: this pass corrects the proof route and executable attempt surface, but it does not populate accepted retained evidence. Promotion waits for the retained-orbit reduction or the scalar self-hit oscillator certificate.

## Supersession Note

[Equation Closure Pass 2026-06-24 C](equation-closure-pass-2026-06-24-c.md) refines the first solver target. It replaces the state-dependent self-hit oscillator with a constant-delay nonlinear oscillator, demotes the Hessian/presymplectic rows from first causal-solver blockers to possible variational successor rows, and makes Hopf birth, first Lyapunov coefficient, monodromy/Floquet gap, Poincare-Cartan orbit integral, readout-refinement stability, and parameter-sweep invariance the first executable action-period route.
