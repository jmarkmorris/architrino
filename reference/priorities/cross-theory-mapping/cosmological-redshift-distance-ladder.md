# Cosmological Redshift And Distance-Ladder Benchmarks

## Standard-Theory Concept

In Lambda-CDM-era cosmology, redshift is encoded by

$$
1+z=\frac{a(t_{\text{obs}})}{a(t_{\text{emit}})},
$$

with distances inferred through luminosity distance $D_L(z)$, angular-diameter distance $D_A(z)$, standard candles, standard rulers, BAO, CMB temperature scaling, and structure-growth observables. Supernova time dilation, image sharpness, CMB blackbody quality, and BAO consistency are hard constraints against naive tired-light explanations.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

$\mathbb{A}\mathbb{A}\mathbb{A}$ treats $a(t)$, $H(t)$, redshift, and CMB summaries as effective observer variables for Noether-Sea evolution, transport, and clock-rate comparison. The Euclidean void does not expand. The useful mapping is therefore a transfer-function problem: source state, path transport, thermalization, clock comparison, and observer calibration must all be recorded without creating unbalanced substrate content.

## Canonical $\mathbb{A}\mathbb{A}\mathbb{A}$ Mapping

The canon source for this topic is [Expansion Mechanism](../../../content/markdown/aaa/cosmology/expansion-mechanism.md), with terminology guarded by [Comparative Glossary](../../../content/markdown/aaa/archie/comparative-glossary.md). Cosmological redshift is `Clock-Rate Redshift`: medium evolution plus path-integrated clock-rate comparison between emission and observation environments in a fixed Euclidean void.

The operational comparison is

$$
1+z
=
\frac{\nu_e}{\nu_o}
=
\frac{(d\tau/dt)_o}{(d\tau/dt)_e},
$$

with the clock map depending on $\rho_{\text{core}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, $\Phi_{\text{eff}}$, velocity, and clock geometry. For modeling and diagnostics, the redshift map must keep at least three effective channels distinct:

- endpoint clock-rate comparison,
- source/observer relative-motion contribution,
- propagation through the traversed Noether-Sea state and gradients.

An effective scale factor $a(t)$ may summarize medium evolution, but it is not geometric stretching of the Euclidean void. A generic scattering-loss tired-light mechanism is excluded when it fails image sharpness or $(1+z)$ time-dilation consistency.

Directional residuals are part of the canon, not optional postprocessing. A redshift-distance fit must expose

$$
\Delta O_X(z,\hat{\mathbf{n}})
=
O_X^{\mathrm{obs}}(z,\hat{\mathbf{n}})
-
O_X^{\mathrm{iso}}(z),
$$

with monopole, dipole, and higher directional terms tested against the same Noether-Sea variables that determine the clock and transport maps. A residual dipole must not be hidden inside $H(z)$, $w(z)$, or calibration constants.

## Task Queue

1. `redshift_transfer_record` — Define a redshift map $z=\mathcal{Z}[\rho_{\text{core}},n,\chi_{\text{sea}},\Phi_{\text{eff}},\Gamma_{\text{path}},\Gamma_{\text{src}},\Gamma_{\text{obs}}]$ with explicit endpoint, relative-motion, and propagation terms. Status: `draft`.
2. `time_dilation_gate` — Require supernova light-curve dilation and spectral redshift to use the same $\mathcal{Z}$ record. Status: `draft`.
3. `distance_duality_gate` — Test whether $D_L=(1+z)^2D_A$ survives the effective transport map. Status: `draft`.
4. `cmb_bao_handoff` — Route CMB blackbody, BAO scale, and growth variables through one cosmology closure record. Status: `draft`.
5. `directional_residual_gate` — Decompose supernova, BAO, CMB-frame, and local $H_0$ residuals by direction and environment before accepting an isotropic Friedmann-like bridge. Status: `draft`.

## Closure Objects

- Transfer map: $\mathcal{Z}$ from source, path-history, and observer clock records to measured $z$.
- Channel decomposition: $\mathcal{Z}=\mathcal{Z}_{\mathrm{clock}}\oplus\mathcal{Z}_{\mathrm{motion}}\oplus\mathcal{Z}_{\mathrm{prop}}$ until a derivation proves a lower-dimensional representation.
- Cosmology acceptance vector: $(z,D_L,D_A,H(z),T_{\mathrm{CMB}},P(k),f\sigma_8)$.
- Shared medium variables: $\rho_{\text{core}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, and $\mathcal{M}_{\mathrm{sea}}^{ab}$.
- Frame-consistency record for CMB, matter dipoles, supernova directionality, BAO anisotropy, and local $H_0$ scatter.
- Shared-state residual gate: one $\theta_{\mathrm{sea}}$ must project into SN, BAO, CMB, weak-lensing, redshift-space-distortion, and BBN comparison packets without per-family replacement.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [cosmology-closure](../cosmology-closure/cosmology-closure.md) | Convert narrative cosmology into a component transfer-function queue. |
| This file | [validation-gates](../validation-gates/validation-gates.md) | Add cosmology failure witnesses for frame split, image blur, and incompatible transport limits. |
| This file | [tri-binary-causal-closure/radiation-gate-c-benchmarks](../tri-binary-causal-closure/radiation-gate-c-benchmarks.md) | Keep CMB photon loading tied to local radiation event ledgers. |

## Failure Modes

- `cosmology.tired_light_failure`: redshift loses supernova time dilation, surface-brightness, or image-sharpness constraints.
- `cosmology.channel_blend`: endpoint clock-rate comparison, relative motion, and propagation are collapsed into one fitted scalar before the shared transport law is derived.
- `cosmology.frame_split`: CMB, BAO, supernova, and local-Hubble corrections use incompatible rest-frame records.
- `cosmology.directional_absorption`: dipole or environment residuals are absorbed into $H(z)$, $w(z)$, or calibration constants instead of being derived from the shared Noether-Sea state.
- `cosmology.thermalization_gap`: CMB blackbody quality is asserted without a thermalization depth and photon-loading ledger.
- `cosmology.void_expansion_leak`: effective $a(t)$ is described as fundamental expansion of the Euclidean void.
