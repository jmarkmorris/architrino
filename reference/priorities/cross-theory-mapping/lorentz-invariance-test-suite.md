# Lorentz-Invariance Test Suite

## Standard-Theory Concept

The Michelson-Morley, Kennedy-Thorndike, and Ives-Stilwell experiments form a compact test suite for Lorentz behavior. Michelson-Morley tests two-way light-speed isotropy, Kennedy-Thorndike tests boost dependence across unequal arms and changing velocities, and Ives-Stilwell tests transverse Doppler/time-dilation behavior. Together they constrain preferred-frame leakage and enforce the Lorentz factor

$$
\gamma=(1-\beta^2)^{-1/2},
\qquad
\beta=v/c.
$$

In Robertson-Mansouri-Sexl language, use barred offsets from the special-relativistic values:
$$
a(\beta)=1+\left(-\frac12+\bar\alpha\right)\beta^2+O(\beta^4),
$$
$$
b(\beta)=1+\left(\frac12+\bar\beta\right)\beta^2+O(\beta^4),
\qquad
d(\beta)=1+\bar\delta\beta^2+O(\beta^4).
$$
The standard Lorentz result is
$$
(\bar\alpha,\bar\beta,\bar\delta)=(0,0,0).
$$
The three classic experiment families isolate the combinations
$$
R_{\mathrm{IS}}=\bar\alpha,
\qquad
R_{\mathrm{KT}}=\bar\beta-\bar\alpha,
\qquad
R_{\mathrm{MM}}=\bar\delta-\bar\beta.
$$
This is the useful lesson for $\mathbb{A}\mathbb{A}\mathbb{A}$: Michelson-Morley alone can be hidden by a ruler deformation, but Kennedy-Thorndike and Ives-Stilwell force the same closure record to retune clocks and rulers together.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

Lorentz symmetry is already a theorem target, not substrate ontology. The corpus signals name moving-assembly deformation, clock/ruler retuning, two-way signal synchronization, and bounded preferred-frame leakage. The Noether sea response object and nested shell braid causal closure should make absolute-frame dynamics operationally hidden in the tested regime.

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

## Source-Mined Residual Suite

Define the laboratory round-trip signal diagnostic in a homogeneous moving branch by
$$
\Delta_{\mathrm{tw}}(\beta,\hat{\mathbf n})
\equiv
\frac{
T_{\circlearrowleft}(\beta,\hat{\mathbf n})
-\langle T_{\circlearrowleft}(\beta,\hat{\mathbf n})\rangle_{\hat{\mathbf n}}
}{
\langle T_{\circlearrowleft}(\beta,\hat{\mathbf n})\rangle_{\hat{\mathbf n}}
},
$$
where $T_{\circlearrowleft}$ is the closed-path signal time measured by the same physical clock branch. A Michelson-Morley-style pass requires
$$
\sup_{\hat{\mathbf n}}|\Delta_{\mathrm{tw}}(\beta,\hat{\mathbf n})|
\le
\epsilon_{\mathrm{MM}},
$$
with the modern direct photon-sector target at the $10^{-18}$ fractional-frequency level when the projection is a two-cavity or two-oscillator comparison.

Kennedy-Thorndike closure requires no boost-dependent drift in the same branch:
$$
\Delta_{\mathrm{KT}}(\beta_1,\beta_2)
\equiv
\frac{T_{\circlearrowleft}(\beta_1)}{T_{\circlearrowleft}(\beta_2)}-1
-\left[\frac{T_{\circlearrowleft}^{\mathrm{SR}}(\beta_1)}{T_{\circlearrowleft}^{\mathrm{SR}}(\beta_2)}-1\right],
$$
with
$$
\Delta_{\mathrm{KT}}=R_{\mathrm{KT}}\,(\beta_1^2-\beta_2^2)+O(\beta^4).
$$
Ives-Stilwell closure requires the clock branch to supply
$$
\frac{\omega_{\text{clk}}(\beta)}{\omega_0}
=
1-\frac12\beta^2-\frac18\beta^4
+\Delta_{\mathrm{IS}}(\beta),
\qquad
\Delta_{\mathrm{IS}}(\beta)=\bar\alpha\,\beta^2+O(\beta^4).
$$
Thus the Lorentz theorem target is not merely $\xi\to1/\gamma$. It is the vector cancellation
$$
\mathbf{R}_{\mathrm{RMS}}
=
\begin{pmatrix}
R_{\mathrm{MM}}\\
R_{\mathrm{KT}}\\
R_{\mathrm{IS}}
\end{pmatrix}
\to\mathbf{0}
$$
using one moving-assembly deformation, clock-retuning, and signal-synchronization record.

SME-style tables add a broader coefficient-space discipline. The effective residual exported by an $\mathbb{A}\mathbb{A}\mathbb{A}$ branch should be recorded as
$$
\mathbf{R}_{\mathrm{SME}}^{\mathrm{eff}}
=
\left(
\tilde\kappa_{e-}^{\mathrm{eff}},
\tilde\kappa_{o+}^{\mathrm{eff}},
\tilde\kappa_{\mathrm{tr}}^{\mathrm{eff}},
\bar{s}^{\mu\nu}_{\mathrm{eff}},
\mathbf{c}_{\mathrm{matter}}^{\mathrm{eff}}
\right),
$$
where the photon-sector rows compare against two-way cavity, clock-comparison, and birefringence tests; $\bar{s}^{\mu\nu}_{\mathrm{eff}}$ compares against gravitational Lorentz tests; and $\mathbf{c}_{\mathrm{matter}}^{\mathrm{eff}}$ compares against matter-clock and spin-precession tests. These are not new fit knobs. They are a named projection of one candidate branch into the same Sun-centered comparison frame used by the SME data tables.

## Bound Rows To Consume

| Source family | Residual row | AAA closure use |
| --- | --- | --- |
| Will PPN table | $|\gamma_{\mathrm{PPN}}-1|\le2.3\times10^{-5}$, $|\beta_{\mathrm{PPN}}-1|\le8\times10^{-5}$, $|\alpha_1|\le4\times10^{-5}$, $|\alpha_2|\le2\times10^{-9}$, $|\alpha_3|\le4\times10^{-20}$ | Weak-field effective metric cannot match Shapiro delay while leaving preferred-frame rows free. |
| Direct terrestrial photon tests | $\Delta\nu/\nu$ and two-way orientation residuals at $\sim10^{-18}$ | $\Delta_{\mathrm{tw}}$ is a real null-test residual, not a narrative claim that observers cannot see the Euclidean-void rest frame. |
| SME data tables | photon, matter, neutrino, and gravity coefficients in the standard Sun-centered frame, with no confirmed violation | Export $\mathbf{R}_{\mathrm{SME}}^{\mathrm{eff}}$ from the candidate branch and compare coefficient by coefficient rather than collapsing all bounds into one scalar. |
| RMS test theory | $(R_{\mathrm{MM}},R_{\mathrm{KT}},R_{\mathrm{IS}})$ | Separates ruler anisotropy, boost dependence, and clock retuning so coefficient splits are visible. |

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [braid](../braid/braid.md) | Make Lorentz behavior consume moving-assembly deformation and clock/ruler retuning. |
| This file | [master-equation-closure](../master-equation-closure/master-equation-closure.md) | Tie the cancellation to causal-root and Jacobian structure rather than postulated Minkowski geometry. |
| This file | [validation-gates](../validation-gates/validation-gates.md) | Add preferred-frame leakage as a direct gravity/relativity acceptance predicate. |

## Failure Modes

- `lorentz.one_way_leakage`: a measurable one-way preferred-frame signal appears above permitted bounds.
- `lorentz.two_way_residual`: two-way round-trip timing retains orientation dependence in the weak homogeneous limit.
- `lorentz.coefficient_split`: clock, ruler, and signal tests require independently tuned coefficients.
- `lorentz.bridge_overclaim`: Lorentz symmetry is stated as fundamental ontology rather than recovered observer-level behavior.
