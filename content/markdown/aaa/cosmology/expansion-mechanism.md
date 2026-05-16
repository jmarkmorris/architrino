# Expansion Mechanism

This chapter explains how cosmological expansion language is translated into a fixed-void ontology. Its purpose is to replace geometric container expansion with medium evolution, clock-rate comparison, and effective scale-factor bookkeeping while preserving contact with the standard observational vocabulary. It is the main cosmology bridge from [Cosmology Ontology](./cosmology-ontology.md) to [CMB](./CMB.md), [Structure Formation](./structure-formation.md), and [Dark Energy](./dark-energy.md).

The sections below move from the core idea to redshift, photon propagation, dark-energy language, tension interfaces, and the effective Friedmann comparison layer.

## Core Idea

The [Euclidean void](../foundations/euclidean-void.md) does not expand. What evolves is the Noether Sea and the state of assemblies moving through it.

## Effective Scale Factor in a Fixed Void

Define an effective scale history from medium structure:

$$
a(t)\propto \frac{\langle L_{\text{core}}(t)\rangle}{\langle L_{\text{core}}(t_{\text{ref}})\rangle},
$$

where $L_{\text{core}}$ is a representative assembly-separation scale.

This $a(t)$ is a summary of medium evolution inside fixed $(x,y,z)$, not geometric stretching of the container.

Equivalent bookkeeping choices can be used in the same ontology:

$$
a(t)\ \leftrightarrow\ \langle R_{\text{core}}(t)\rangle
\quad\text{or}\quad
a(t)\propto \rho_{\text{sea}}(t)^{-1/3}.
$$

These are effective parameterizations of medium state, not independent geometric claims.

## Clock-Rate Redshift Interpretation

Cosmological redshift is treated as cumulative propagation through a changing medium plus clock-rate mismatch between emitter and observer environments.

Use the proper-time map from [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md):

$$
\frac{d\tau}{dt}=F\!\left(\mathbf{v},\rho_{\text{core}}(\mathbf{x},t),n(\mathbf{x},t),\chi_{\text{sea}}(\mathbf{x},t),\Phi_{\text{eff}},\text{clock geometry}\right).
$$

A photon that traverses regions with different $\rho_{\text{core}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, and $\Phi_{\text{eff}}$ is read by clocks with different local rates. The observed $z$ is then an emergent comparison of those rates along the path history.

Operationally:

$$
1+z = \frac{\nu_e}{\nu_o}
= \frac{(d\tau/dt)_o}{(d\tau/dt)_e},
$$

so redshift is treated as path-integrated medium evolution plus endpoint clock-rate comparison.

For modeling and diagnostics, separate at least three effective channels:

- endpoint clock-rate comparison,
- source/observer relative-motion (Doppler-like) contribution,
- propagation contribution from traversed medium state and gradients.

### Noether-Sea Core Factorization Target

A sharper closure target rewrites the endpoint clock-rate comparison in terms of the local Noether-Sea core cadence itself. Let $\Omega_N(\mathbf{x},t)$ denote a representative local Noether-Sea core cadence and $T_N(\mathbf{x},t)=2\pi/\Omega_N(\mathbf{x},t)$ its cycle period. Relative to a weak homogeneous reference core, define

$$
\Gamma_N(\mathbf{x},t)
\equiv
\frac{T_N(\mathbf{x},t)}{T_{N0}}
=
\frac{\Omega_{N0}}{\Omega_N(\mathbf{x},t)}.
$$

The factor $\Gamma_N$ is not a new time variable. It records how strongly the local Noether-Sea core cadence is stretched relative to the weak homogeneous reference. In a validated homogeneous Lorentz-closure branch, $\Gamma_N$ should reduce to the corresponding moving-core deformation factor; outside that limit it remains a medium-state diagnostic to be derived from Noether-core geometry and clock extraction.

For a spectral transition family $X$, the working redshift factorization is

$$
1+z_X
\approx
\frac{\Gamma_{N,E}}{\Gamma_{N,R}}\,
\frac{\mathcal{P}_{E\to R}}
{B_X(E)\,\mathcal{L}_{E\to R}(\hat{\mathbf{k}})}.
$$

Here $\Gamma_{N,E}/\Gamma_{N,R}$ is the emitter-to-receiver Noether-Sea core cadence ratio, $\mathcal{P}_{E\to R}$ is the path-history propagation factor through the intervening Noether Sea, $B_X(E)$ records any real source-branch shift in the emitting transition, and $\mathcal{L}_{E\to R}(\hat{\mathbf{k}})$ records directional launch geometry from relative motion. The clean reference case has $B_X(E)=1$ and negligible path accumulation. Strong local-gradient redshift is dominated by $\Gamma_{N,E}/\Gamma_{N,R}$; gentle deep-space redshift may instead accumulate mainly through $\mathcal{P}_{E\to R}$.

The logarithmic budget makes the scale hierarchy explicit:

$$
\ln(1+z_X)
\approx
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
+\ln\mathcal{P}_{E\to R}
-\ln B_X(E)
-\ln\mathcal{L}_{E\to R}(\hat{\mathbf{k}}).
$$

A factor may be set to $1$ only when its logarithmic contribution is small relative to the dominant contribution and to the observational tolerance. This prevents the same redshift record from silently switching between gravitational, relative-motion, source-branch, and propagation explanations.

### Limiting Recovery Cases

The factorization must recover familiar redshift regimes by controlled limits. The purpose is not to treat those inherited regimes as final ontology, but to show which Noether-Sea term carries each observational effect.

For weak-field gravitational redshift, take $B_X(E)=1$, $\mathcal{L}_{E\to R}=1$, and $\mathcal{P}_{E\to R}=1$. If the endpoint Noether-Sea core cadence satisfies

$$
\frac{\Omega_N}{\Omega_{N0}}
\approx
1+\frac{\Phi_N}{c_0^2},
\qquad
\Gamma_N
\approx
1-\frac{\Phi_N}{c_0^2},
$$

then

$$
\ln(1+z_X)
\approx
\ln\Gamma_{N,E}-\ln\Gamma_{N,R}
\approx
\frac{\Phi_N(R)-\Phi_N(E)}{c_0^2}.
$$

A source deeper in the potential has $\Phi_N(E) < \Phi_N(R)$, so the endpoint ratio produces redshift. This is the local strong-gradient limit of the same cadence map.

For relative-motion redshift in a nearly homogeneous medium, take $\Gamma_{N,E}\approx\Gamma_{N,R}$, $\mathcal{P}_{E\to R}=1$, and $B_X(E)=1$. Let $\hat{\mathbf{k}}$ point from emitter to receiver. In the low-speed line-of-sight limit, the launch factor should reduce to

$$
\mathcal{L}_{E\to R}(\hat{\mathbf{k}})
\approx
1+\frac{(\mathbf{v}_E-\mathbf{v}_R)\cdot\hat{\mathbf{k}}}{c_0},
$$

so

$$
1+z_X
\approx
\frac{1}{\mathcal{L}_{E\to R}(\hat{\mathbf{k}})}.
$$

Motion that compresses the emitted phase train toward the receiver gives $\mathcal{L}_{E\to R} > 1$ and a blueward shift; motion that stretches the phase train gives $\mathcal{L}_{E\to R} < 1$ and a redward shift.

For clean source spectroscopy, $B_X(E)=1$ means the source transition itself remains on its reference branch. If high acceleration, strong gravity, plasma, magnetic environment, tidal distortion, or other local conditions alter the transition gap, then $B_X(E)\neq1$. That contribution is not propagation redshift. It records a changed emission branch before the packet begins its path-history through the Noether Sea.

For gentle deep-space accumulation, take $\Gamma_{N,E}\approx\Gamma_{N,R}$, $\mathcal{L}_{E\to R}\approx1$, and $B_X(E)=1$. Then

$$
1+z_X
\approx
\mathcal{P}_{E\to R}.
$$

A useful continuous form is

$$
\ln\mathcal{P}_{E\to R}
=
\int_{\gamma_{E\to R}}
\alpha_{\mathrm{prop}}\!\left(
\rho_{\text{core}},n,\chi_{\text{sea}},\Phi_{\text{eff}},
\hat{\mathbf{k}},X
\right)\,d\ell,
$$

where $\alpha_{\mathrm{prop}}$ is a path-local propagation-rate functional along the Euclidean path element $d\ell$. Any nonzero $\alpha_{\mathrm{prop}}$ must preserve image sharpness, spectral coherence, and $(1+z)$ time-dilation consistency; otherwise it degenerates into an excluded tired-light mechanism.

## Directional Residuals in the Redshift Map

An effective redshift-distance relation cannot be accepted only as an all-sky average. The same data must also be decomposed by direction and environment:

$$
\Delta O_X(z,\hat{\mathbf{n}})
=
O_X^{\mathrm{obs}}(z,\hat{\mathbf{n}})
-
O_X^{\mathrm{iso}}(z)
=
O_{X,0}(z)
+
\mathbf{O}_{X,1}(z)\cdot\hat{\mathbf{n}}
+
O_{X,2}(z,\hat{\mathbf{n}})
+\cdots,
$$

where $X$ may denote supernova distance modulus, BAO scale, CMB-frame correction, or another expansion observable. The monopole $O_{X,0}$ records the isotropic fit offset, $\mathbf{O}_{X,1}$ records the dipole, and higher terms record quadrupole and mask-dependent structure.

The Friedmann-like bridge below is usable only after these directional residuals are either within survey tolerance or derived from the same Noether-Sea variables that determine the clock-rate and transport maps. A residual dipole should not be absorbed silently into $H(z)$, $w(z)$, or calibration constants.

## Photon-Propagation Contribution

Beyond endpoint clock comparison, the same transport picture can include path-dependent photon energy evolution in medium transit ("redshift toll").

In this reading, effective redshift accumulation may depend on photon energy, traversed medium state, and path environment, so redshift is modeled as a transport kernel rather than a single universal linear rule.

Line-of-sight medium flow and local contraction/expansion regions can, in principle, contribute signed shifts, so local blueward and redward biases should be treated within one transport kernel rather than as disconnected exceptions.

Propagation channels must preserve image sharpness and $(1+z)$ time-dilation consistency; models requiring generic scattering-loss redshift are excluded.

## Dissipation and Rescaling Picture

Apparent expansion is interpreted as relaxation of medium state:

- high-curvature source regions inject energy into outbound assembly flows,
- lower-density regions evolve toward larger characteristic assembly scales and lower effective temperatures,
- observer-level expansion summaries track this rescaling history.

## Dark-Energy Language in This Frame

The parameter

$$
w=\frac{p}{\rho}
$$

remains useful as an effective descriptor, but its physical content is medium stress and relaxation state, not an independent vacuum-fluid ontology.

## Hubble-Tension Link

Early-inferred and local-inferred expansion rates probe different medium states:

- Early probes sample a more uniform, less-relaxed sea history.
- Local probes sample pockets that are further along relaxation and dissipation trajectories.

So the $H_0$ split is interpreted as state-dependent inference from one ontology, not two incompatible universes.

In this framing, $H_0$ is not expected to be strictly universal at all environments; local scatter is read as part of medium-state dependence.

Quasar redshift distributions are interpreted in the same transport-and-source framework, separating source-population evolution from path-history accumulation within one model.

## Timescape-Style Bridge, $\mathbb{A}\mathbb{A}\mathbb{A}$ Mechanism

Conceptually, this layer is adjacent to inhomogeneous/clock-calibration cosmologies, but the implementation here remains one explicit medium-state model:

- clock-rate mapping is computed from shared Noether-Sea state variables,
- expansion-like inference shifts are environment-conditioned readouts, not ontology splits,
- local-ladder versus early-time differences are modeled as distinct sampling of one evolving medium.

## Effective Friedmann Bridge (Comparison Layer)

For data-comparison work, one may retain a Friedmann-like summary:

$$
H^2 = \frac{8\pi G_{\text{eff}}}{3}\left(\rho_m+\rho_r+\rho_{\text{sea}}\right)-\frac{k_{\text{eff}}}{a^2},
$$

with $a(t)$ interpreted as a medium-state parameter and $G_{\text{eff}},k_{\text{eff}}$ as effective summaries of assembly-medium response.

This equation is a comparison layer for the homogeneous and isotropic limit. It does not by itself justify the assumption that supernovae, BAO, CMB distances, and local-ladder calibrations all share one isotropic background. That shared background must be recovered as a limit of the medium-state model or replaced by an explicitly directional effective map.

## Expansion-Module Interface

In the modular cosmology map, this page provides:

- ontic inputs: medium density/stress state, clock-rate map, and transport environment,
- effective outputs: inferred $a(t)$, $H(z)$, and redshift-distance behavior,
- shared bridge variables used by [dark-energy.md](./dark-energy.md), [hubble-s8-tensions.md](./hubble-s8-tensions.md), and [CMB.md](./CMB.md).
