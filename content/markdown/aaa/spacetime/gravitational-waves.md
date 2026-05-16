# Gravitational Waves

This chapter provides a conditional closure chain from the emergent-metric weak-field map to testable gravitational-wave observables. It is one branch of the observational closure stack summarized in [GR Phenomenology](./gr-phenomenology.md) and constrained by [Constraint Ledger](../validation/constraint-ledger.md).

Interface chapters:
- Effective metric map: [emergent-metric](./emergent-metric.md)
- PPN closure and refractive weak field: [ppn-parameters](./ppn-parameters.md)
- Phenomenology summary: [gr-phenomenology](./gr-phenomenology.md)

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

**Conditional Lemma 1 (linearized propagation equation).**
Under weak-field, slow-background variation, and linear constitutive response, the transverse-traceless sector obeys
$$
\Box_{c_{\text{GW}}}\bar h_{\mu\nu}^{\text{TT}}
=
\frac{16\pi G_{\text{eff}}}{c_{\text{GW}}^4}\,T_{\mu\nu}^{\text{TT}},
\qquad
\Box_{c_{\text{GW}}}\equiv
-\frac{1}{c_{\text{GW}}^2}\partial_t^2+\nabla^2.
$$

*Derivation sketch:* If the effective field equations induced by the metric constitutive map exist in this regime, linearize them around the homogeneous background, then project onto the TT sector.

**Corollary 1 (source-free effective waves).**
For $T_{\mu\nu}^{\text{TT}}=0$:
$$
\Box_{c_{\text{GW}}}\bar h_{\mu\nu}^{\text{TT}}=0,
$$
so plane waves satisfy
$$
\omega^2=c_{\text{GW}}^2k^2
$$
to leading order (higher-order dispersive corrections are constitutive and model-dependent).

Finite-range comparison models may introduce gravitational-wave dispersion, but here that is only a deviation diagnostic. Define the group speed
$$
v_{\mathrm{g,GW}}\equiv\frac{\partial\omega}{\partial k}.
$$
In validated frequency bands the constitutive map must satisfy
$$
\left|\frac{v_{\mathrm{g,GW}}-c_0}{c_0}\right|<\epsilon_{\mathrm{GW}},
\qquad
\left|\frac{\partial^2\omega}{\partial k^2}\right|_{\mathrm{band}}\leq\epsilon_{\mathrm{disp}},
$$
with the integrated phase drift across the source distance below the detector residual bound. A finite-range cosmological response is not acceptable if it leaks into already-tested gravitational-wave timing as measurable dispersion.

The same finite-range comparison must also supply a low-frequency forecast rather than leaving drift unconstrained below current ground-based event bands. For a declared pulsar-timing or space-interferometer band $\mathcal{B}_{\mathrm{low}}$, define the accumulated phase drift
$$
\Delta\phi_{\mathrm{GW,low}}^{\theta}(f)
=
\int_{\Gamma}
\left[
k_{\theta}(f,\mathbf{x},t)
-
k_{\mathrm{GR}}(f,\mathbf{x},t)
\right]\,d\ell,
$$
where $\Gamma$ is the observer-level propagation path used by the comparison. A useful low-frequency residual is
$$
\mathcal{R}_{\mathrm{GW,low}}(\theta)
=
\sup_{f\in\mathcal{B}_{\mathrm{low}}}
\frac{
\left|\Delta\phi_{\mathrm{GW,low}}^{\theta}(f)\right|
}{\epsilon_{\phi}(f)}
+
\sup_{f\in\mathcal{B}_{\mathrm{low}}}
\frac{
\left|v_{\mathrm{g,GW}}^{\theta}(f)-c_0\right|
}{c_0\,\epsilon_{v}(f)}.
$$
This is a forecast and comparison gate. It does not license a massive-graviton ontology; it only says that any cosmological-scale weakening channel must remain compatible with the low-frequency strain and timing residuals that would test long-wavelength dispersion.

## Polarization Content

In the repo-wide spin taxonomy, this is the effective **spin-2 / tensor** channel: the wave is not a scalar breathing mode or a single-axis vector mode, but a transverse-traceless deformation carrying quadrupolar shape data.

**Conditional Lemma 2 (two-mode TT closure in isotropic limit).**
If the low-energy constitutive response is parity-even and isotropic, residual gauge constraints leave exactly two propagating tensor modes:
$$
h_+(t,\mathbf{x}),\qquad h_\times(t,\mathbf{x}).
$$

*Derivation sketch:* Standard counting in Lorenz gauge plus TT projection gives 10 components $\to$ gauge/constraint reduction $\to$ two physical helicity-2 modes, provided the effective-metric gauge structure is recovered by the constitutive map.

Any scalar, vector, or longitudinal gravitational-wave response is therefore an effective deviation to be bounded, not a new default channel:
$$
\frac{\mathcal{P}_{\mathrm{extra}}}{\mathcal{P}_{\mathrm{TT}}}<\epsilon_{\mathrm{pol}}.
$$
The numerator collects non-TT detector power after known instrumental and astrophysical residuals are removed.

## Detector-Side Inference Gate

The detector does not observe the effective tensor mode as a bare ontological object. It records a processed strain channel whose interpretation depends on calibration, background rejection, waveform matching, and coincidence checks across instruments. For a candidate gravitational-wave record $\theta_{\mathrm{GW}}$, keep the residual vector explicit:

$$
\mathbf{R}_{\mathrm{GW}}(\theta_{\mathrm{GW}})
=
\left(
\frac{v_{\mathrm{g,GW}}-c_0}{c_0},\;
\left.\frac{\partial^2\omega}{\partial k^2}\right|_{\mathrm{band}},\;
\frac{\mathcal{P}_{\mathrm{extra}}}{\mathcal{P}_{\mathrm{TT}}},\;
\mathrm{FAR},\;
R_{\mathrm{cal}}
\right),
$$

where $\mathrm{FAR}$ is the false-alarm-rate estimate and $R_{\mathrm{cal}}$ is the retained calibration residual for the strain channel and timing model. Promotion from a candidate disturbance to an accepted gravitational-wave data product requires

$$
\max_i \frac{|R_{\mathrm{GW},i}|}{\epsilon_{\mathrm{GW},i}}\le 1
$$

with the tolerances fixed by the validation band. This gate protects the separation between the observable data product and the ontology: the data product is a calibrated, coincident, low-residual strain record, while the $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation must still earn the claim that the record is the tensor-sector response of the effective metric induced by Noether-Sea constitutive dynamics.

When $\theta_{\mathrm{GW}}$ is also used to support a finite-range or dark-energy comparison, $\mathcal{R}_{\mathrm{GW,low}}(\theta)$ must be carried beside this detector residual. Passing a high-frequency event-timing gate alone is not enough to promote a long-wavelength dispersion claim.

## Merger and Ringdown Horizon-Interface Gate

Stationary no-hair agreement is not enough to close the dynamical strong-field problem. If a black-hole model changes the horizon-interface boundary condition during formation, merger, or evaporation, the change must be tested against the detector-facing waveform packet and the same final compact-object labels used by exterior GR.

For a candidate horizon-interface record $\theta_H$, let $h_{\ell m}^{\theta_H}(t)$ be the effective strain modes predicted after projection through the detector response, and let $D_{\mathrm{merge}}^{\mathrm{obs}}$ collect the observed inspiral, merger, ringdown, calibration, and covariance packet. A compact residual is
$$
\mathcal{R}_{\mathrm{merge}}(\theta_H)
=
\left\lVert
D_{\mathrm{merge}}^{\mathrm{obs}}
-
\mathcal{P}_{\mathrm{det}}\{h_{\ell m}^{\theta_H}\}
\right\rVert_{C_{\mathrm{merge}}^{-1}}^2
+
d_{\mathrm{nohair}}\!\left(
(M_f,\mathbf{J}_f,Q_f)^{\theta_H},
(M_f,\mathbf{J}_f,Q_f)^{\mathrm{obs}}
\right)
+
d_{\mathrm{shared}}(\theta_H,\theta_{\mathrm{GW}},\theta_{\mathrm{BH}}).
$$
Here $\mathcal{P}_{\mathrm{det}}$ is the detector projection and $d_{\mathrm{shared}}$ penalizes any fit that uses one state record for the strain channel, another for the horizon-interface label, and another for the black-hole entropy or release ledger. The gate is satisfied only if $\mathcal{R}_{\mathrm{merge}}(\theta_H)$ is below the declared tolerance while preserving the validated inspiral limit, the two tensor polarizations, and the final exterior no-hair coarse-graining. A predicted deviation is admissible only as a bounded residual or a falsifiable template, not as permission to loosen already-tested gravitational-wave recovery.

## Early-Universe Stochastic Background Gate

A stochastic gravitational-wave background is a data product before it is an ontology claim. If an early-universe or pre-BBN comparison branch predicts a background, retain the detector-facing spectrum and its cosmology linkage, not the branch interpretation that generated it. For a candidate branch $X$, define
$$
\mathcal{R}_{\mathrm{GW,early}}(\theta_X)
=
\sup_{f\in\mathcal{B}_{\mathrm{det}}}
\frac{\Omega_{\mathrm{GW}}^X(f)}
{\Omega_{\mathrm{GW}}^{\max}(f)}
+
d_{\mathrm{shared}}\!\left(\theta_{\mathrm{GW}},\theta_{\mathrm{BBN}},\theta_{\mathrm{CMB}},\theta_{\mathrm{growth}}\right),
$$
where $\mathcal{B}_{\mathrm{det}}$ is the validated detector band and $d_{\mathrm{shared}}$ penalizes any branch that requires a gravitational-wave source record inconsistent with the BBN, CMB, or structure-formation records. A positive stochastic signal would become observational pressure on the early medium history; a null result closes only the corresponding branch amplitude, not the whole cosmology program.

## Energy Flux

**Closure Target 3 (leading-order GW flux).**
In the same regime, the cycle-averaged flux is
$$
\mathcal{F}_{\text{GW}}
=
\frac{c_{\text{GW}}^3}{32\pi G_{\text{eff}}}
\left\langle \dot h_+^2+\dot h_\times^2\right\rangle.
$$
This is the quantity used for binary-orbit energy-loss consistency checks.
