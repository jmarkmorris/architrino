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
