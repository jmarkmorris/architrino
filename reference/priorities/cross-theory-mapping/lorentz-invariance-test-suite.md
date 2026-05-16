# Lorentz-Invariance Test Suite

## Standard-Theory Concept

The Michelson-Morley, Kennedy-Thorndike, and Ives-Stilwell experiments form a compact test suite for Lorentz behavior. Michelson-Morley tests two-way light-speed isotropy, Kennedy-Thorndike tests boost dependence across unequal arms and changing velocities, and Ives-Stilwell tests transverse Doppler/time-dilation behavior. Together they constrain preferred-frame leakage and enforce the Lorentz factor

$$
\gamma=(1-\beta^2)^{-1/2},
\qquad
\beta=v/c.
$$

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

Lorentz symmetry is already a theorem target, not substrate ontology. The corpus signals name moving-assembly deformation, clock/ruler retuning, two-way signal synchronization, and bounded preferred-frame leakage. The Noether-Sea response object and tri-binary causal closure should make absolute-frame dynamics operationally hidden in the tested regime.

## Task Queue

1. `two_way_signal` — Derive the two-way signal-time cancellation condition $\Delta_{\mathrm{tw}}(\beta)\to0$. Status: `draft`.
2. `moving_assembly_deformation` — Derive $\xi\to1/\gamma$ for the longitudinal envelope ratio in the homogeneous weak-response limit. Status: `draft`.
3. `clock_ruler_retuning` — Show that clock frequency, ruler length, and signal synchronization use one closure record. Status: `draft`.
4. `leakage_bound` — Define $\epsilon_{\mathrm{LV}}$ against modern test-suite bounds without making the bound itself an input coefficient. Status: `draft`.

## Closure Objects

- Preferred-frame leakage: $\epsilon_{\mathrm{LV}}$.
- Two-way anisotropy diagnostic: $\Delta_{\mathrm{tw}}(\beta)$.
- Shape ratio: $\xi=R_{\parallel}/R_{\perp}$.
- Clock observable: $\omega_{\text{clk}}/\omega_0$.
- Constitutive coefficients: $(k_2,\ell_2,k_4,\ell_4)$ for stiffness-channel closure.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md) | Make Lorentz behavior consume moving-assembly deformation and clock/ruler retuning. |
| This file | [master-equation-closure](../master-equation-closure/master-equation-closure.md) | Tie the cancellation to causal-root and Jacobian structure rather than postulated Minkowski geometry. |
| This file | [validation-gates](../validation-gates/validation-gates.md) | Add preferred-frame leakage as a direct gravity/relativity acceptance predicate. |

## Failure Modes

- `lorentz.one_way_leakage`: a measurable one-way preferred-frame signal appears above permitted bounds.
- `lorentz.two_way_residual`: two-way round-trip timing retains orientation dependence in the weak homogeneous limit.
- `lorentz.coefficient_split`: clock, ruler, and signal tests require independently tuned coefficients.
- `lorentz.bridge_overclaim`: Lorentz symmetry is stated as fundamental ontology rather than recovered observer-level behavior.
