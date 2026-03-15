# Absolute Time Defense

This chapter states the substrate-level case for absolute time as the fundamental evolution parameter of the theory. Its purpose is to distinguish the exact global time variable used by the master equation from the derived clock time experienced by physical assemblies, and to show why the framework treats foliation as real structure rather than coordinate gauge.

The opening establishes the core absolute-time claims. The later sections then connect those claims to universe-state description, proper time, and the deterministic flow of the full microstate.

## The Case for Absolute Time ($t$)

1. **Fundamental evolution parameter**: Absolute time $t$ is the unique global parameter of the master equation.
2. **Product substrate**: The kinematic background is the product manifold $\mathcal{M} = \mathbb{R} \times \mathbb{R}^3$ with global clock map $\pi_t:\mathcal{M}\to\mathbb{R}$.
3. **Unique foliation**: The simultaneity slice at fixed $t_0$ is the level set
   $$
   \Sigma_{t_0} = \pi_t^{-1}(t_0) = \mathbb{R}^3 \times \{t_0\}.
   $$
4. **Global time form**: The 1-form $dt$ is closed and exact, providing an intrinsic time orientation and eliminating foliation ambiguity.
5. **Derived clock time**: Proper time $\tau$ is not fundamental; it is a derived functional of tri-binary internal phase dynamics.

## Absolute Time, Global Foliation, and Proper Time

**Absolute time $t$ and universe state**
- The $\mathbb{U}_{\text{now}}$ perspective indexes the exact microstate as $S(t)$ on each slice $\Sigma_t$.
- On each $\Sigma_t$, the spatial metric is Euclidean: $h_{ij}=\delta_{ij}$.
- Absolute time is substrate structure, not a coordinate gauge choice.

**Deterministic evolution and basin selection**
- The delay-differential master equation is deterministic: a fully specified microstate $S(t_0)$ generates a unique trajectory $S(t)$ for $t>t_0$.
- Apparent branching is multistability, not stochastic evolution: near separatrices, infinitesimal perturbations in initial microstate direct trajectories into different attractor basins.
- Therefore the correct statement is basin selection under deterministic flow, not a "distribution of allowed configurations" from one exact state.

**Proper time $\tau$ for physical observers**

Physical clocks are tri-binary assemblies; ticks correspond to internal limit-cycle phase evolution. For a clock worldline $\mathbf{X}(t)$ with $\mathbf{v}(t)=d\mathbf{X}/dt$,

$$
d\tau = F\big(\rho_{\text{sea}}(\mathbf{X},t), \sigma_{ij}(\mathbf{X},t), \mathbf{v}(t)\big)\,dt,
$$

where $\rho_{\text{sea}}$ and $\sigma_{ij}$ are coarse-grained Noether-sea density and stress fields. Microscopically, $F$ summarizes delayed assembly-medium interactions; $\Phi$ and $\nabla\Phi$ are effective coarse-grained encodings of that same local state.

Equivalent phase-functional form:

$$
\tau(t_1)-\tau(t_0)=\int_{t_0}^{t_1}\Omega_{\mathrm{clk}}\!\left[\Gamma_{\mathrm{loc}}(s)\right]\,ds,
$$

with $\Omega_{\mathrm{clk}}$ the instantaneous internal oscillation rate determined by the local delayed interaction history $\Gamma_{\mathrm{loc}}$.

Required emergent limits:
- Homogeneous medium, low velocities:
  $$
  \frac{d\tau}{dt} \approx \sqrt{1 - v^2/c_f^2}.
  $$
- Weak field, low velocities:
  $$
  \frac{d\tau}{dt} \approx \sqrt{1 + 2\Phi_{\text{eff}}/c_f^2 - v^2/c_f^2}.
  $$

**Key point**

Relativity of simultaneity and time dilation are emergent observer-level effects of assembly dynamics. The $\mathbb{U}_{\text{now}}$ formalism evolves in absolute time $t$; proper time $\tau$ is a derived clock functional.
