# Gravitational Lensing

## Standard-Theory Concept

Gravitational lensing is the deflection, magnification, and time-delay distortion of light by mass-energy. In the weak-field point-mass limit, the leading deflection is

$$
\alpha
\approx
\frac{4GM}{c^2 b},
$$

where $b$ is impact parameter. Lensing also underwrites mass inference in galaxies and clusters, weak-lensing shear maps, and strong-lensing time delays.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

The case pressures the mass map and effective metric at the same time. $\mathbb{A}\mathbb{A}\mathbb{A}$ must distinguish internal assembly mass from the externally exposed response of trapped internal causal history, shielding, and Noether-Sea coupling. Lensing sees an effective geometry or propagation map, not the full internal ledger directly.

## Task Queue

1. `deflection_integral` — Define a Noether-Sea optical-path or effective-geodesic deflection integral. Status: `draft`.
2. `mass_exposure_map` — Connect lensing mass to the exposure quotient and medium-response tensor. Status: `draft`.
3. `shear_time_delay_join` — Use the same response object for angular deflection and lensing time delay. Status: `draft`.

## Closure Objects

- Lensing response map: $\mathcal{B}_{\mathrm{lens}}(\Theta_{\mathrm{map}})=(\alpha,\kappa,\gamma_{\mathrm{shear}},\Delta t)$.
- Exposure quotient: sector-visible mass response from internal assembly ledgers.
- Effective metric response: $\mathcal{M}_{\mathrm{sea}}^{ab}\to g_{\mu\nu}^{\text{eff}}$.
- PPN coefficient: $\gamma_{\text{PPN}}$ consistency with Shapiro delay.
- Strong-field shadow/ring response:
  $$
  \mathcal{B}_{\mathrm{shadow}}(\Theta_{\mathrm{map}})
  =
  \left(
  D_{\mathrm{ring}},
  \delta_{\mathrm{sh}},
  C_{\mathrm{dep}},
  f_w,
  \mathcal{V}_{ij},
  \Phi^{\mathrm{cl}}_{ijk},
  A^{\mathrm{cl}}_{ijkl}
  \right),
  $$
  where $D_{\mathrm{ring}}$ is the bright-ring diameter, $\delta_{\mathrm{sh}}$ is the fractional deviation from the comparison shadow diameter when an independent mass-to-distance prior is available, $C_{\mathrm{dep}}$ is the central brightness-depression contrast, $f_w$ is the fractional ring width, and the last three entries retain visibility-domain amplitudes and closure quantities.

## Strong-Field Shadow Benchmark

The EHT image family turns lensing from a weak-field deflection benchmark into a strong-field photon-capture and photon-path benchmark. The safe comparison quantity is not the event horizon itself. It is the observer-level ring/shadow scale produced when near-horizon synchrotron emission is lensed, partially captured, scattered, and reconstructed through VLBI.

For an independently supplied angular gravitational radius $\theta_g=GM/(Dc_0^2)$, the first comparison residual is
$$
\delta_{\mathrm{sh}}
=
\frac{D_{\mathrm{ring}}}{6\sqrt{3}\,\theta_g}
-1,
$$
with the understanding that spin, inclination, emission geometry, scattering, and reconstruction calibrations enter the declared tolerance. Sgr A$^*$ is the cleaner current use of this residual because stellar-orbit and maser data give a strong mass-to-distance prior; the EHT metric paper reports the observed image size within roughly ten percent of Kerr predictions. M87$^*$ supplies the stronger image-stability and visibility-domain crescent benchmark, but its horizon-scale mass estimate is more directly tied to the EHT ring calibration itself.

This benchmark should be promoted only with an image-vs-model separation:

| Observable layer | Retained quantity | Interpretation guardrail |
| --- | --- | --- |
| raw interferometry | $\mathcal{V}_{ij}(u,v,t)$, $\Phi^{\mathrm{cl}}_{ijk}$, $A^{\mathrm{cl}}_{ijkl}$ | Visibility-domain closure must pass before a visual ring is treated as a physical constraint. |
| reconstructed image | $D_{\mathrm{ring}}$, $f_w$, azimuthal brightness, $C_{\mathrm{dep}}$ | Image features are reconstruction outputs from sparse coverage, not direct photographs of ontology. |
| lensing comparison | $\delta_{\mathrm{sh}}$ and photon-path transfer | Tests the effective metric and mass-to-distance map, not a primitive curved Euclidean void. |
| plasma environment | brightness variability, polarization, Faraday rotation, scattering, jet-base emission | Environment-facing terms may vary while the compact lensing scale remains stable. |

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [mass-map](../mass-map/mass-map.md) | Route lensing mass through exposure and shielding rather than treating mass as primitive substance. |
| This file | [validation-gates](../validation-gates/validation-gates.md) | Add lensing to the shared gravity acceptance set. |
| This file | [cosmology-closure](../cosmology-closure/cosmology-closure.md) | Use weak lensing as a growth and structure benchmark without importing Lambda-CDM ontology. |

## Failure Modes

- `lensing.mass_visibility_gap`: internal mass ledger cannot project to lensing-visible response.
- `lensing.gamma_split`: light deflection and Shapiro delay require inconsistent $\gamma_{\text{PPN}}$.
- `lensing.dark_fit_only`: missing mass is fit by an ad hoc sector without exposure, transport, or event-ledger constraints.
- `lensing.no_time_delay`: angular deflection is matched while lensing time delays fail.
- `lensing.shadow_scale_split`: weak-field mass-to-distance inference and horizon-scale ring/shadow diameter require inconsistent effective metric records.
- `lensing.image_visibility_split`: reconstructed image features look acceptable while visibility amplitudes, closure phases, closure amplitudes, or visibility minima fail.
- `lensing.plasma_geometry_confusion`: source emissivity, scattering, or Faraday terms are used to tune the compact lensing diameter instead of only the allowed brightness, width, polarization, and variability channels.
