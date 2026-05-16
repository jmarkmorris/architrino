# Absolute Time Defense

This chapter states the substrate-level case for absolute time as the fundamental evolution parameter of the theory. Its purpose is to distinguish the exact global time variable used by the [master equation](../dynamics/master-equation.md) from the derived clock time experienced by physical assemblies, and to show why the framework treats foliation as real structure rather than coordinate gauge.

The opening establishes the core absolute-time claims. The later sections then connect those claims to universe-state description, proper time, and the deterministic flow of the full microstate. It is the argumentative companion to [Foundational Ontology](./ontology.md), [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md), and [Lorentz Kinematics](../spacetime/lorentz-kinematics.md).

## The Case for Absolute Time ($t$)

1. **Fundamental evolution parameter**: Absolute time $t$ is the unique global parameter of the master equation.
2. **Product substrate**: The kinematic background is the product manifold $\mathcal{M} = \mathbb{R} \times \mathbb{R}^3$ with global clock map $\pi_t:\mathcal{M}\to\mathbb{R}$.
3. **Unique foliation**: The simultaneity slice at fixed $t_0$ is the level set
   $$
   \Sigma_{t_0} = \pi_t^{-1}(\{t_0\}) = \{t_0\}\times \mathbb{R}^3.
   $$
4. **Global time form**: The substrate clock form $dt$ is exact, closed, and nowhere vanishing as the pullback from the $\mathbb{R}$ factor. Together with the chosen orientation of increasing $t$, it fixes the tangent planes to the slices $\Sigma_t$; foliation ambiguity is absent at the substrate level rather than removed by coordinate gauge.
5. **Derived clock time**: Proper time $\tau$ is not fundamental; it is a derived functional of tri-binary internal phase dynamics.

## Absolute Time, Global Foliation, and Proper Time

**Absolute time $t$ and universe state**
- The $\mathbb{U}_{\text{now}}$ perspective indexes the exact microstate as $S(t)$ on each slice $\Sigma_t$.
- On each $\Sigma_t$, the spatial metric is Euclidean: $h_{ij}=\delta_{ij}$.
- Absolute time is substrate structure, not a coordinate gauge choice.

**Deterministic evolution and basin selection**
- The delay-differential master equation is deterministic: a fully specified $\mathbb{U}_{\text{now}}\equiv S(t_0)$, including the required path-history and provenance ledger, generates a unique trajectory $S(t)$ for $t>t_0$.
- Apparent branching is multistability, not stochastic evolution: near separatrices, infinitesimal perturbations in initial microstate direct trajectories into different attractor basins.
- Therefore the correct statement is basin selection under deterministic flow, not a "distribution of allowed configurations" from one exact state.

**Proper time $\tau$ for physical observers**

Physical clocks are tri-binary assemblies; ticks correspond to internal limit-cycle phase evolution. For a clock worldline $\mathbf{X}(t)$ with $\mathbf{v}(t)=d\mathbf{X}/dt$,

$$
d\tau =
F\big(
\mathbf{v}(t),
\rho_{\text{core}}(\mathbf{X}(t),t),
n(\mathbf{X}(t),t),
\chi_{\text{sea}}(\mathbf{X}(t),t),
\Phi_{\text{eff}}(\mathbf{X}(t),t),
\nabla\Phi_{\text{eff}}(\mathbf{X}(t),t),
\sigma_{ij}(\mathbf{X}(t),t),
\text{clock geometry}
\big)\,dt,
$$

where $\rho_{\text{core}}(\mathbf{x},t)$ is physical Noether-core density, $n(\mathbf{x},t)\equiv\rho_{\text{core}}(\mathbf{x},t)/\rho_{\text{core},0}$ is normalized Noether-core density, $\chi_{\text{sea}}(\mathbf{x},t)\equiv c_f/c_{\text{eff}}(\mathbf{x},t)$ is the Noether-Sea delay factor, and $\sigma_{ij}$ denotes medium stress data. Microscopically, $F$ summarizes delayed assembly-medium interactions; $\Phi_{\text{eff}}$ and $\nabla\Phi_{\text{eff}}$ are effective coarse-grained encodings of that same local state.

Equivalent extracted clock-frequency form:

$$
\tau(t_1)-\tau(t_0)=\int_{t_0}^{t_1}\frac{\omega_{\text{clk}}(s)}{\omega_0}\,ds,
$$

where $\omega_{\text{clk}}(s)$ is the phase rate extracted from the declared tri-binary clock channel and $\omega_0$ is its rest-branch reference frequency. The dependencies hidden in $\omega_{\text{clk}}$ are the local causal-root ledger, the relevant path-history data, and the same Noether-Sea state variables used by the clock/ruler metric handoff.

Required emergent limits:
- Speed convention: $c_f$ is the primitive wake speed used inside delayed-root equations. Observer-level clock limits use the declared channel speed $c_\star$ from the [transverse causal budget lemma](../dynamics/tri-binary-dynamics.md#transverse-causal-budget-lemma): $c_\star=c_{\text{eff}}(\mathbf{X},t)$ for Noether-Sea dressed clocks and rulers, with $c_0\equiv c_{\text{eff}}(\infty)$ in the weak homogeneous comparison. Set $c_\star=c_f$ only for a primitive branch chart, or after deriving that a specific internal limit-cycle branch is governed directly by the undressed wake speed.
- Homogeneous medium, low velocities:
  $$
  \frac{d\tau}{dt} \approx \sqrt{1 - \|\mathbf{v}\|^2/c_\star^2},
  \qquad c_\star=c_0 \text{ in the weak homogeneous observer branch}.
  $$
- Weak field, low velocities, after the clock-channel potential has been matched to the Newtonian benchmark:
  $$
  \Phi_{\text{eff}}=\Phi_N+O(\Phi_N^2/c_0^2),
  \qquad
  \frac{d\tau}{dt} \approx \sqrt{1 + 2\Phi_{\text{eff}}/c_0^2 - \|\mathbf{v}\|^2/c_0^2}.
  $$

**Key point**

Relativity of simultaneity and time dilation are emergent observer-level effects of assembly dynamics. The $\mathbb{U}_{\text{now}}$ formalism evolves in absolute time $t$; proper time $\tau$ is a derived clock functional.
