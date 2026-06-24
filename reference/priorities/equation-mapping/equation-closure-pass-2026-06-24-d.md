# Equation Closure Pass 2026-06-24 D

## Scope

This pass converts the retained-orbit action-unit target into a dedicated executable certificate for `EQ-12A`. It does not raise any scores.

The concrete implementation is [constant-delay-retained-orbit-certificate.mjs](../../../scripts/equation-mapping/constant-delay-retained-orbit-certificate.mjs), with attempt fixture [constant-delay-retained-orbit-certificate-attempt.v1.json](../../../scripts/equation-mapping/constant-delay-retained-orbit-certificate-attempt.v1.json).

## Certificate Target

The checker isolates the constant-delay retained-orbit family that had been embedded inside the broader Planck/alpha residual. It evaluates:

- a constant-delay nonlinear self-hit model row;
- the Hopf characteristic equation

$$
\Delta(\lambda)
=
\lambda^2+\gamma\lambda+\omega^2-g e^{-\lambda\tau};
$$

- simple imaginary crossing and transversality via $d\lambda/d\tau$;
- nonzero first Lyapunov coefficient;
- monodromy/Floquet gap with exactly one unit multiplier;
- Poincare section and Poincare-Cartan orbit integral;
- four action-unit readouts:

$$
h_E=\frac{E}{\nu},
\qquad
h_\Phi=\oint_{\gamma_0}p\,dq,
\qquad
h_p=\frac{2\pi p}{k},
\qquad
h_J=\frac{2\pi J}{n};
$$

- readout stability under collocation, section relocation, and retained-mode variation;
- parameter-sweep invariance while $E$ and $\nu$ move;
- history-energy throughput residual;
- non-resonance/small-divisor separation.

The angular-momentum readout is now explicit: $J=n\hbar_\vartheta$ is tested as $h_J=2\pi J/n$, so the same retained action period supplies the $h$ unit and the $\hbar$ angular-momentum unit.

## Executable Status

The attempt fixture is deliberately score-neutral. Its numerical diagnostics pass, but every certificate row is still `attempt`.

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
nextBlocker: missing_accepted_retained_orbit_reduction_row
constantDelayModelPass: true
hopfRetainedOrbitBirthPass: true
firstLyapunovCoefficientPass: true
monodromyFloquetPass: true
poincareSectionPass: true
poincareCartanOrbitIntegralPass: true
actionReadoutPass: true
readoutRefinementIndependencePass: true
parameterSweepActionInvariancePass: true
historyEnergyThroughputPass: true
nonResonancePass: true
hMean: 1
hbarMean: 0.15915494309189535
hopfResidual: 1.5265566588595902e-16
transversality: 0.04016945958113018
floquetGap: 0.28
negativeControlPassCount: 9
negativeControlCount: 9
```

The negative controls reject:

- state-dependent delay as the first model;
- detuned Hopf crossing;
- Bautin degeneracy $\ell_1=0$;
- extra near-unit Floquet multiplier;
- split action readouts;
- parameter-sweep fitting;
- history-throughput leakage;
- small-divisor resonance;
- carrier splitting.

## Score Disposition

No score changes follow from this pass. `EQ-12A` remains at `2`.

The value of this step is architectural and mathematical: the row family now has its own fail-closed certificate interface, and the first blocker is no longer hidden inside the broader Planck/alpha bundle.

## Next Closure Target

This target is refined by [Equation Closure Pass 2026-06-24 E](equation-closure-pass-2026-06-24-e.md). The constant-delay orbit remains useful, but now primarily as a scalar falsifier for rescalable action area rather than as sufficient positive evidence for the physical action unit.

Replace the attempt-level supplied fields with solver-generated evidence:

- compute the stable-root margin instead of supplying it;
- compute $\ell_1$ from the actual center-manifold or normal-form reduction;
- compute the finite-amplitude periodic orbit;
- compute the monodromy spectrum from the retained periodic orbit;
- compute $h_E$, $h_\Phi$, $h_p$, and $h_J$ from one orbit rather than a fixture;
- run a real $g$- or $\mu$-continuation showing that $h_\vartheta$ is locally constant while $E$ and $\nu$ move.

The breakthrough question is whether this action period is merely a scalable orbit area in a toy delay system, or whether the tri-binary Noether-braid geometry supplies a topological or symmetry-protected period that can survive as the physical $h$ unit.
