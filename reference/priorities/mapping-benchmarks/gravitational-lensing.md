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

The case pressures the mass map and effective metric at the same time. $\mathbb{A}\mathbb{A}\mathbb{A}$ must distinguish internal assembly mass from the externally exposed response of trapped internal causal history, shielding, and Noether sea coupling. Lensing sees an effective geometry or propagation map, not the full internal ledger directly.

## Candidate Closure Steps

These rows decompose the case at draft grade. They are not executable queue
authority; promote an accepted task into [work-queue.md](work-queue.md) before
execution.

1. `deflection_integral` — Define a Noether sea optical-path or effective-geodesic deflection integral. Status: `draft`.
2. `mass_exposure_map` — Connect lensing mass to the exposure quotient and medium-response tensor. Status: `draft`.
3. `shear_time_delay_join` — Use the same response object for angular deflection and lensing time delay. Status: `draft`.

## Closure Objects

- Lensing response map: $\mathcal{B}_{\mathrm{lens}}(\Theta_{\mathrm{map}})=(\alpha,\kappa,\gamma_{\mathrm{shear}},\Delta t)$.
- Exposure quotient: sector-visible mass response from internal assembly ledgers.
- Effective metric response: $\mathcal{M}_{\mathrm{sea}}^{ab}\to g_{\mu\nu}^{\text{eff}}$.
- PPN coefficient: $\gamma_{\text{PPN}}$ consistency with Shapiro delay.
- MIT weak-field metric scaffold:
  $$
  ds_{\mathrm{eff}}^2
  =
  -\left(1+\frac{2\Phi_{\mathrm{eff}}}{c_0^2}\right)c_0^2dt^2
  +
  \left(1-\frac{2\gamma_{\mathrm{eff}}\Phi_{\mathrm{eff}}}{c_0^2}\right)d\ell^2
  +O(c_0^{-4}),
  $$
  with one shared $\Phi_{\mathrm{eff}}$ and $\gamma_{\mathrm{eff}}$ for deflection, Shapiro delay, and Newtonian acceleration.
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

## MIT 8.962 Weak-Field Deflection Scaffold

Lecture 12 identifies the Newtonian correspondence $h_{00}=-2\Phi_N$ and fixes the field equation against $\nabla^2\Phi_N=4\pi G\rho$ (`https://web.mit.edu/sahughes/www/8.962/lec12.pdf`). Lecture 14 supplies the weak-field static line element with matching time and spatial potential coefficients (`https://web.mit.edu/sahughes/www/8.962/lec14.pdf`). For this priority packet, the source-mined requirement is that light bending and time delay are not independent curve fits: both must come from the same effective potential, spatial compliance coefficient, photon-channel delay factor, and exposed mass map.

For an unperturbed comparison ray $\Gamma_0$ with tangent $\hat{\mathbf{k}}$, define the perpendicular gradient
$$
\nabla_\perp^i
=
\left(\delta^{ij}-\hat{k}^i\hat{k}^j\right)\partial_j.
$$
The weak-field deflection target is
$$
\alpha_\theta^i
=
\frac{1+\gamma_{\mathrm{eff}}}{c_0^2}
\int_{\Gamma_0}
2\nabla_\perp^i\Phi_{\mathrm{eff}}(\mathbf{x})\,ds
+O(c_0^{-4}),
$$
which reduces to $4GM/(b c_0^2)$ for a point-mass comparison when $\gamma_{\mathrm{eff}}=1$. The paired path-time row is
$$
\Delta t_\theta
=
\frac{1}{c_0}
\int_{\Gamma_0}
\left[
\bar{\chi}_{\text{sea}}(\mathbf{x})-1
\right]ds,
\qquad
\bar{\chi}_{\text{sea}}
=
1-(1+\gamma_{\mathrm{eff}})
\frac{\Phi_{\mathrm{eff}}}{c_0^2}
+O(c_0^{-4}).
$$
The shear and convergence rows use the transverse Hessian and projected Laplacian of the same $\Phi_{\mathrm{eff}}$ rather than a separately fitted mass surface:
$$
\mathcal{H}_{\perp,ij}^{\theta}
=
\nabla_{\perp i}\nabla_{\perp j}\Phi_{\mathrm{eff}},
\qquad
\kappa_\theta
\propto
\int_{\Gamma_0}\Delta_\perp\Phi_{\mathrm{eff}}\,ds.
$$

The first closure residual for this file is therefore
$$
\mathcal{R}_{\mathrm{lens\text{-}Shap}}(\theta)
=
w_\alpha
\frac{\|\boldsymbol{\alpha}_\theta-\boldsymbol{\alpha}_{\mathrm{obs}}\|}{\sigma_\alpha+\varepsilon}
+
w_t
\frac{|\Delta t_\theta-\Delta t_{\mathrm{obs}}|}{\sigma_t+\varepsilon}
+
w_\gamma
\left|\gamma_{\mathrm{lens}}(\theta)-\gamma_{\mathrm{Shap}}(\theta)\right|.
$$
This residual is low-maintenance because it strengthens the existing `deflection_integral` and `shear_time_delay_join` tasks rather than adding a new gate. It also protects the mass-map program: $\Phi_{\mathrm{eff}}$ must be computed from exposed response, shielding, and Noether sea coupling, not from a primitive mass substance inserted only for lensing.

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
| This file | mass-map | Route lensing mass through exposure and shielding rather than treating mass as primitive substance. |
| This file | [validation-gates](../dormant-deferred/validation-gates/priorities.md) | Add lensing to the shared gravity acceptance set. |
| This file | [cosmology-closure](../cosmology-closure/priorities.md) | Use weak lensing as a growth and structure benchmark without importing Lambda-CDM ontology. |

## Failure Modes

- `lensing.mass_visibility_gap`: internal mass ledger cannot project to lensing-visible response.
- `lensing.gamma_split`: light deflection and Shapiro delay require inconsistent $\gamma_{\text{PPN}}$.
- `lensing.dark_fit_only`: missing mass is fit by an ad hoc sector without exposure, transport, or event-ledger constraints.
- `lensing.no_time_delay`: angular deflection is matched while lensing time delays fail.
- `lensing.shadow_scale_split`: weak-field mass-to-distance inference and horizon-scale ring/shadow diameter require inconsistent effective metric records.
- `lensing.image_visibility_split`: reconstructed image features look acceptable while visibility amplitudes, closure phases, closure amplitudes, or visibility minima fail.
- `lensing.plasma_geometry_confusion`: source emissivity, scattering, or Faraday terms are used to tune the compact lensing diameter instead of only the allowed brightness, width, polarization, and variability channels.
- `lensing.path_integral_split`: deflection, shear, convergence, and path-time delay are computed from different $\Phi_{\mathrm{eff}}$, $\gamma_{\mathrm{eff}}$, $\chi_{\text{sea}}$, or exposure-map records.
