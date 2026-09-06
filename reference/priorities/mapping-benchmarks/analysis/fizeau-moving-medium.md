# Fizeau Moving-Medium Experiment

## Standard-Theory Concept

Fizeau's experiment measures light propagation through moving water and is classically summarized by Fresnel drag. In relativistic form, the observed speed follows velocity addition; the low-speed expansion gives

$$
u
\approx
\frac{c}{n}
 +
v\left(1-\frac{1}{n^2}\right),
$$

where $n$ is the refractive index of the material and $v$ is the medium velocity.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

This case is a guardrail against loose medium analogies. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the Noether sea is not a simple mechanically dragged medium, and $n(\mathbf{x},t)$ is reserved for normalized Noether braid density, not optical refractive index. The mapping must distinguish material-channel delay, Noether sea delay $\chi_{\text{sea}}$, and observer-level velocity addition.

## Candidate Closure Steps

These rows decompose the case at draft grade. They are not executable queue authority; promote an accepted task into [work-queue.md](../work-queue.md) before execution.

1. `material_delay_channel` — Define material-channel delay $\chi_{\gamma,\mathrm{mat}}$ without overloading $n(\mathbf{x},t)$. Status: `draft`.
2. `moving_material_handoff` — Recover the Fresnel coefficient from material rest-frame propagation plus effective velocity addition. Status: `draft`.
3. `noether_sea_distinction` — State which part belongs to material microstructure and which part belongs to Noether sea response. Status: `draft`.

## Closure Objects

- Material photon-channel speed: $c_{\gamma,\mathrm{mat}}$.
- Material delay factor: $\chi_{\gamma,\mathrm{mat}}=c_0/c_{\gamma,\mathrm{mat}}$.
- Medium motion record: material velocity $\mathbf{v}_{\mathrm{mat}}$.
- Noether sea background record: $\chi_{\text{sea}}(\mathbf{x},t)$, kept distinct from material refractive behavior.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | mass-map/condensed-matter-medium-transport | Add moving material as a transport benchmark for medium-dressed propagation. |
| This file | braid | Use Fizeau as a velocity-addition check tied to Lorentz closure. |
| This file | [validation-gates](../../dormant-deferred/validation-gates/priorities.md) | Prevent material refractive behavior from being mistaken for substrate drag. |

## Failure Modes

- `fizeau.drag_medium_leak`: Noether sea is treated as a simple mechanically dragged medium.
- `fizeau.notation_collision`: optical refractive index is confused with normalized Noether braid density $n(\mathbf{x},t)$.
- `fizeau.coefficient_split`: moving-medium propagation requires a different velocity-addition rule from Lorentz closure.
- `fizeau.material_no_ledger`: material recoil, heating, dispersion, and boundary handoff are not recorded.
