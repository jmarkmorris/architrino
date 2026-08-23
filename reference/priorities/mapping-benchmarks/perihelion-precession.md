# Perihelion Precession

## Standard-Theory Concept

Perihelion precession is the relativistic advance of an orbit's closest approach. For a test body orbiting mass $M$ with semi-major axis $a$ and eccentricity $e$, GR gives the leading correction

$$
\Delta\varpi
=
\frac{6\pi GM}{a(1-e^2)c^2}
$$

per orbit. Mercury is the classic benchmark, but the same logic extends to relativistic binary timing and PPN tests.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

This case is a compact weak-field closure test. It requires the effective metric, clock/ruler retuning, and source mass response to yield the correct orbital phase correction without adding a separate nonconservative force. It also guards against ordinary dissipative drag being mistaken for the mass or gravity mechanism.

## Candidate Closure Steps

These rows decompose the case at draft grade. They are not executable queue
authority; promote an accepted task into [work-queue.md](work-queue.md) before
execution.

1. `effective_orbit_hamiltonian` — Derive a weak-field effective orbital Hamiltonian from $\mathcal{M}_{\mathrm{sea}}^{ab}$. Status: `draft`.
2. `ppn_beta_gamma` — Extract $\beta_{\text{PPN}}$ and $\gamma_{\text{PPN}}$ and compute the precession coefficient. Status: `draft`.
3. `no_drag_gate` — Verify that stable precession is conservative to the required order. Status: `draft`.

## Closure Objects

- Effective potential expansion: $U_{\Phi}=U+O(U^2/c_f^2)$.
- PPN coefficients: $\beta_{\text{PPN}}$, $\gamma_{\text{PPN}}$, and preferred-frame coefficients $\alpha_i$.
- Orbital phase residual: $\delta\varpi_{\mathbb{A}\mathbb{A}\mathbb{A}}-\delta\varpi_{\mathrm{obs}}$.
- Conservation ledger for orbital energy and angular momentum at the weak-field order.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [validation-gates](../dormant-deferred/validation-gates/priorities.md) | Use precession as a weak-field metric benchmark alongside Shapiro and lensing. |
| This file | [master-equation-closure](../master-equation-closure/priorities.md) | Derive orbital correction from delayed dynamics and effective metric handoff. |
| This file | mass-map | Connect source mass exposure to orbital response. |

## Failure Modes

- `precession.drag_substitution`: observed precession is reproduced by dissipative drag rather than conservative effective geometry.
- `precession.ppn_split`: precession needs PPN values inconsistent with Shapiro and lensing.
- `precession.source_mass_gap`: the source mass exposure is not derived from assembly response.
- `precession.phase_instability`: the predicted orbital phase drifts outside benchmark tolerance over many orbits.
