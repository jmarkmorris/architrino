# Brownian Motion

## Standard-Theory Concept

Brownian motion is the random-looking motion of suspended particles driven by microscopic collisions. Standard theory connects diffusion, drag, temperature, and fluctuations through relations such as

$$
\langle x^2(t)\rangle
=
2Dt,
\qquad
D=\frac{kT}{\zeta}
$$

in one dimension for a simple overdamped limit. It historically established atomistic micro-to-macro reasoning and remains a benchmark for fluctuation-dissipation closure.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

This case is not a fundamental physics recovery target at the same level as Lorentz or Bell, but it is a useful template for coarse graining. $\mathbb{A}\mathbb{A}\mathbb{A}$ needs disciplined language for deterministic microdynamics producing statistical effective laws. Brownian motion gives a clean model for basin measures, transport coefficients, and fluctuation-dissipation without importing ontic randomness.

## Candidate Closure Steps

These rows decompose the case at draft grade. They are not executable queue authority; promote an accepted task into [work-queue.md](work-queue.md) before execution.

1. `deterministic_coarse_grain` — Define a deterministic microstate ensemble and projection that yields diffusion. Status: `draft`.
2. `transport_coefficients` — Derive or estimate $D$, drag coefficient, and temperature from substrate or material variables. Status: `draft`.
3. `fluctuation_dissipation_gate` — Test whether fluctuations and dissipative response share one ledger. Status: `draft`.

## Closure Objects

- Microstate ensemble or invariant measure $\mu_*$ over unresolved material states.
- Coarse position process $X_t$ and diffusion coefficient $D$.
- Dissipation coefficient $\zeta$ with an event/medium ledger.
- Temperature variable tied to the existing temperature priority lane.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [temperature](temperature.md) | Use Brownian motion to discipline temperature as a coarse-grained variable. |
| This file | mass-map/condensed-matter-medium-transport | Separate reversible medium-dressed inertia from dissipative transport. |
| This file | [quantum-closure/transfer-operator-basin-measure](../quantum-closure/transfer-operator-basin-measure.md) | Use diffusion as a low-risk analogy for deterministic measures producing effective statistics. |

## Failure Modes

- `brownian.ontic_randomness_import`: stochastic effective law is mistaken for fundamental randomness.
- `brownian.drag_mass_confusion`: dissipative drag is confused with the mass mechanism.
- `brownian.no_temperature_map`: $T$ is used as a fit parameter without a thermal-state definition.
- `brownian.no_fdt`: fluctuation and dissipation are modeled with unrelated coefficients.
