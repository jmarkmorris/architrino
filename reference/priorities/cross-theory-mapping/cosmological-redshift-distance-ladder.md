# Cosmological Redshift And Distance-Ladder Benchmarks

## Standard-Theory Concept

In Lambda-CDM-era cosmology, redshift is encoded by

$$
1+z=\frac{a(t_{\text{obs}})}{a(t_{\text{emit}})},
$$

with distances inferred through luminosity distance $D_L(z)$, angular-diameter distance $D_A(z)$, standard candles, standard rulers, BAO, CMB temperature scaling, and structure-growth observables. Supernova time dilation, image sharpness, CMB blackbody quality, and BAO consistency are hard constraints against naive tired-light explanations.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

$\mathbb{A}\mathbb{A}\mathbb{A}$ treats $a(t)$, $H(t)$, redshift, and CMB summaries as effective observer variables for Noether-Sea evolution, transport, and clock-rate comparison. The Euclidean void does not expand. The useful mapping is therefore a transfer-function problem: source state, path transport, thermalization, clock comparison, and observer calibration must all be recorded without creating unbalanced substrate content.

## Task Queue

1. `redshift_transfer_record` — Define a redshift map $z=\mathcal{Z}[\rho_{\text{core}},\chi_{\text{sea}},\mathcal{H},\Gamma_{\text{src}},\Gamma_{\text{obs}}]$. Status: `draft`.
2. `time_dilation_gate` — Require supernova light-curve dilation and spectral redshift to use the same $\mathcal{Z}$ record. Status: `draft`.
3. `distance_duality_gate` — Test whether $D_L=(1+z)^2D_A$ survives the effective transport map. Status: `draft`.
4. `cmb_bao_handoff` — Route CMB blackbody, BAO scale, and growth variables through one cosmology closure record. Status: `draft`.

## Closure Objects

- Transfer map: $\mathcal{Z}$ from source, path-history, and observer clock records to measured $z$.
- Cosmology acceptance vector: $(z,D_L,D_A,H(z),T_{\mathrm{CMB}},P(k),f\sigma_8)$.
- Shared medium variables: $\rho_{\text{core}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, and $\mathcal{M}_{\mathrm{sea}}^{ab}$.
- Frame-consistency record for CMB, matter dipoles, supernova directionality, BAO anisotropy, and local $H_0$ scatter.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [cosmology-closure](../cosmology-closure/cosmology-closure.md) | Convert narrative cosmology into a component transfer-function queue. |
| This file | [validation-gates](../validation-gates/validation-gates.md) | Add cosmology failure witnesses for frame split, image blur, and incompatible transport limits. |
| This file | [tri-binary-causal-closure/radiation-gate-c-benchmarks](../tri-binary-causal-closure/radiation-gate-c-benchmarks.md) | Keep CMB photon loading tied to local radiation event ledgers. |

## Failure Modes

- `cosmology.tired_light_failure`: redshift loses supernova time dilation, surface-brightness, or image-sharpness constraints.
- `cosmology.frame_split`: CMB, BAO, supernova, and local-Hubble corrections use incompatible rest-frame records.
- `cosmology.thermalization_gap`: CMB blackbody quality is asserted without a thermalization depth and photon-loading ledger.
- `cosmology.void_expansion_leak`: effective $a(t)$ is described as fundamental expansion of the Euclidean void.
