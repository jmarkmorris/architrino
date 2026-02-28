# Gravitational Waves (Minimal Derivation Spine)

This chapter provides a minimal theorem-backed chain from the emergent-metric weak-field map to testable gravitational-wave observables.

Interface chapters:
- Effective metric map: [emergent-metric](./emergent-metric.md)
- PPN closure and refractive weak field: [ppn-parameters](./ppn-parameters.md)
- Constraint target: [constraint-ledger](../validation/constraint-ledger.md)

## Weak-Field Setup

Assume an effective metric
$$
g_{\mu\nu}^{\text{eff}}=\eta_{\mu\nu}+h_{\mu\nu},
\qquad
|h_{\mu\nu}|\ll1,
$$
with background medium state homogeneous/isotropic at leading order.

Define trace-reversed perturbation
$$
\bar h_{\mu\nu}=h_{\mu\nu}-\frac12\eta_{\mu\nu}h,\qquad
h=\eta^{\alpha\beta}h_{\alpha\beta},
$$
and impose Lorenz gauge
$$
\partial^\mu \bar h_{\mu\nu}=0.
$$

Assume constitutive closure supplies effective $(G_{\text{eff}},c_{\text{GW}})$ in this regime.

## Linear Wave Equation

**Theorem 1 (Linearized propagation equation).**  
Under weak-field, slow-background variation, and linear constitutive response, the transverse-traceless sector obeys
$$
\Box_{c_{\text{GW}}}\bar h_{\mu\nu}^{\text{TT}}
=
\frac{16\pi G_{\text{eff}}}{c_{\text{GW}}^4}\,T_{\mu\nu}^{\text{TT}},
\qquad
\Box_{c_{\text{GW}}}\equiv
-\frac{1}{c_{\text{GW}}^2}\partial_t^2+\nabla^2.
$$

*Proof sketch:* Linearize the effective field equations induced by the metric constitutive map around the homogeneous background, then project onto the TT sector.

**Corollary 1 (Vacuum waves).**  
For $T_{\mu\nu}^{\text{TT}}=0$:
$$
\Box_{c_{\text{GW}}}\bar h_{\mu\nu}^{\text{TT}}=0,
$$
so plane waves satisfy
$$
\omega^2=c_{\text{GW}}^2k^2
$$
to leading order (higher-order dispersive corrections are constitutive and model-dependent).

## Polarization Content

**Theorem 2 (Two-mode TT closure in isotropic limit).**  
If the low-energy constitutive response is parity-even and isotropic, residual gauge constraints leave exactly two propagating tensor modes:
$$
h_+(t,\mathbf{x}),\qquad h_\times(t,\mathbf{x}).
$$

*Proof sketch:* Standard counting in Lorenz gauge plus TT projection: 10 components $\to$ gauge/constraint reduction $\to$ two physical helicity-2 modes.

## Energy Flux

**Proposition 3 (Leading-order GW flux).**  
In the same regime, the cycle-averaged flux is
$$
\mathcal{F}_{\text{GW}}
=
\frac{c_{\text{GW}}^3}{32\pi G_{\text{eff}}}
\left\langle \dot h_+^2+\dot h_\times^2\right\rangle.
$$
This is the quantity used for binary-orbit energy-loss consistency checks.

## Validation and Failure Conditions

Required closure checks:
- **Speed:** 
$$
\left|\frac{v_{\text{GW}}-c}{c}\right|<10^{-15}
$$
in the calibrated weak-field regime (per constraint ledger).
- **Polarization:** no dominant extra scalar/vector modes in events consistent with GR-like tensor templates.
- **Backreaction consistency:** inferred flux from waveform amplitude must match source-energy accounting within stated numerical tolerance.

Failure of any item above breaks the minimal emergent-GW spine and requires revision of the constitutive map.
