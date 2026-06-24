Closure goal:
Find the shortest rigorous path, or the decisive obstruction, for turning a constant-delay retained-orbit action period into a geometry-derived $h$ and $\hbar$ unit shared by energy, momentum, and angular momentum.

# Self-Contained Review Packet: Constant-Delay Action-Period Certificate

## Desired Response

Please first give overall insights, corrections, and advancements. Then answer the specific breakthrough questions below.

Aim for 12-15 substantive comments total. Prioritize analysis, normal forms, delay equations, invariant periods, proof strategy, counterexamples, and the smallest certificate that would change the score from plausible architecture to mathematically serious evidence.

## Reviewer Lens

Use a Terence Tao-style analysis lens: be precise about hypotheses, genericity, scaling, compactness, normal forms, perturbation stability, and which claims are invariant versus coordinate artifacts.

## Context

We are developing a deterministic tri-binary Noether-braid theory. A Noether braid is a retained closed assembly with three coupled binary substructures, causal-delay wake channels, self-hit, energy/momentum/angular-momentum ledgers, and a surrounding Noether sea state.

The current target is the origin of the action unit $h$ and $\hbar=h/(2\pi)$. We do not want to insert Planck's constant independently into photon energy, de Broglie momentum, angular momentum, blackbody occupancy, and fine-structure coupling. The working proposal is that a retained periodic orbit supplies one action period:

$$
h_\vartheta
=
\oint_{\gamma_0}\vartheta_{\mathrm{PC}},
\qquad
\hbar_\vartheta=\frac{h_\vartheta}{2\pi}.
$$

Here $\gamma_0$ is a retained periodic orbit after reducing the delay-history dynamics, and $\vartheta_{\mathrm{PC}}$ is the local Poincare-Cartan one-form on the retained carrier.

## Current First Model

The current first executable model is intentionally modest: a scalar constant-delay nonlinear self-hit oscillator,

$$
\ddot x(t)
=
-\omega^2x(t)
+g\,x(t-\tau)
-\gamma\dot x(t)
+\mu x(t)(1-x(t)^2).
$$

State-dependent delay is deferred until the constant-delay orbit is isolated and hyperbolic modulo time shift.

The Hopf characteristic equation is

$$
\Delta(\lambda)
=
\lambda^2+\gamma\lambda+\omega^2-g e^{-\lambda\tau}.
$$

The intended first certificate checks:

- simple imaginary Hopf crossing for $\lambda=\pm i\Omega$;
- transversality via $d\lambda/d\tau$;
- all other characteristic roots stable;
- first Lyapunov coefficient $\ell_1\ne0$;
- a finite-amplitude retained periodic orbit;
- monodromy/Floquet spectrum with exactly one unit multiplier and a positive gap;
- a Poincare section;
- a Poincare-Cartan orbit integral;
- readout stability under refinement and section relocation;
- parameter-sweep invariance while energy and frequency move.

## Readout Target

The same retained action period should be recovered from four readouts:

$$
h_E=\frac{E}{\nu},
\qquad
h_\Phi=\oint_{\gamma_0}p\,dq,
\qquad
h_p=\frac{2\pi p}{k},
\qquad
h_J=\frac{2\pi J}{n}.
$$

Thus the angular-momentum unit is not separate: $J=n\hbar_\vartheta$ should be the same claim as $h_\vartheta=2\pi\hbar_\vartheta$.

The parameter-sweep falsifier is:

$$
\left|\frac{\partial h_\vartheta}{\partial g}\right|_{\mathrm{fam}}\to0
\quad
\text{or}
\quad
\left|\frac{\partial h_\vartheta}{\partial \mu}\right|_{\mathrm{fam}}\to0
$$

over a family where $E$ and $\nu$ move substantially. If $h_\vartheta$ must be refit at each parameter value, it is not a geometry-derived action unit.

## Current Attempt-Level Result

A score-neutral checker now verifies a toy certificate with these diagnostics:

```text
constantDelayModelPass: true
hopfRetainedOrbitBirthPass: true
firstLyapunovCoefficientPass: true
monodromyFloquetPass: true
poincareCartanOrbitIntegralPass: true
actionReadoutPass: true
parameterSweepActionInvariancePass: true
hMean: 1
hbarMean: 1/(2*pi)
```

This is not accepted evidence. The stable-root margin, first Lyapunov coefficient, finite-amplitude orbit, monodromy spectrum, and readouts are still supplied certificate fields rather than solver-derived consequences. The checker is useful because it states exactly what future solver evidence must produce and which negative controls must fail.

## Breakthrough Questions

1. Is a scalar constant-delay Hopf-born orbit capable, even in principle, of supporting a geometry-derived action unit, or is its action period generically rescalable and therefore only a toy obstruction test?
2. What extra structure would make $h_\vartheta=\oint\vartheta_{\mathrm{PC}}$ invariant rather than merely an orbit-area normalization: topology, a circle-bundle holonomy, an index, a symplectic capacity, a Maslov-type class, a Noether charge, or tri-binary symmetry?
3. What is the weakest theorem that would justify local constancy of $h_\vartheta$ under a $g$- or $\mu$-continuation while $E$ and $\nu$ move?
4. Does a dissipative constant-delay equation admit a meaningful Poincare-Cartan one-form, or must the first model be replaced by a variational, contact, or doubled causal-delay system before action-period language is legitimate?
5. What computable normal-form data would be enough to replace the supplied $\ell_1$ field with a trustworthy proof or interval-certified computation?
6. What monodromy/Floquet certificate is strong enough for a delay equation: finite collocation spectrum plus tail bound, Evans-function enclosure, interval arithmetic, validated continuation, or another method?
7. Which small-divisor or resonance obstruction is most likely to split $h_E$, $h_\Phi$, $h_p$, and $h_J$ even when the Hopf and Floquet checks pass?
8. The tri-binary theory now treats equal-frequency triples $(f,f,f)$ as high priority: different binaries may share a clock while having different radii/speed relations and phase offsets. Could this equal-clock, different-radius structure be exactly what protects the angular-momentum unit, or is that mathematically unlikely?
9. If the scalar model is only a scaffold, what is the minimal tri-binary model whose symmetry is rich enough to test $J=n\hbar_\vartheta$ seriously?
10. What decisive counterexample should we try to construct first to show that the action period is a fitted constant rather than a derived invariant?
11. What would be the most compact solver output that would make this program hard to dismiss by a skeptical analyst?
12. If you had to choose one next mathematical artifact, should it be a theorem statement, a validated numerical certificate, a variational replacement model, a tri-binary symmetry reduction, or a counterexample?
