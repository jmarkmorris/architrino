# Simulation Run Protocols

This chapter defines the mandatory runtime protocol for simulations carried out in the absolute-frame implementation of the theory. Its role is to standardize the frame, logging requirements, provenance bookkeeping, metadata, and acceptance gates so results from different runs can be compared and audited coherently.

The opening gives the top-level simulation rule set; the later sections unpack the absolute-frame interpretation and the required $\mathbb{U}_{\text{now}}$ instrumentation in more detail.

## Master Simulation Protocol (Absolute Frame)

1. **Coordinate Anchor**: All simulations run on a fixed Cartesian grid. `Grid[x][y][z]` represents the Euclidean void.
2. **Clock Rate**: The simulator uses a global `Time` counter (absolute $t$). No relativistic scaling is applied to the integration step itself.
3. **$\mathbb{U}_{\text{now}}$ universe-state interface**: Every run must instantiate an array of fixed virtual sensors to log $\Phi$ and $\nabla\Phi$ at absolute addresses.
4. **Noether Sea Initialization**: Low-excitation Noether-Sea runs must pre-populate the grid with a lattice of coupled pro/anti tri-binary assemblies to simulate the medium's influence on test particles.
5. **Convergence**: $\Delta t$ refinement must be accompanied by "History Resolution" refinement to ensure self-hit calculations are numerically stable.

## $A_0$ Branch-Certificate Protocol

The first mass-map target has a specialized protocol in [$A_0$ Branch Certificate Protocol](a0-branch-certificate-protocol.md), with Tier 0 row semantics summarized in [$A_0$ Tier 0 Result Interpretation](a0-tier0-result-interpretation.md). That protocol separates four stages:

1. Tier 0 algebraic branch search for finite root-ledger candidates.
2. Tier 1 $\eta>0$ delayed-dynamics continuation and Floquet diagnostics.
3. Tier 2 internal-energy and shielding extraction.
4. Tier 3 medium-response tensor probes.

No simulation run should report $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, or $\mathcal{M}_{\text{sea}}^{ab}$ as accepted outputs unless the preceding branch-certificate gates have passed.

## Run Protocol: Absolute-Frame + $\mathbb{U}_{\text{now}}$ Logging

### Absolute frame rule
All simulations integrate dynamics in the absolute Euclidean frame:
- Fixed Cartesian coordinates (x,y,z) representing the Euclidean void
- Global absolute time $t$ with step $\Delta t$
- No relativistic time dilation applied to the integration clock (proper time is derived only in post-processing)

### Void vs medium terminology (simulation-facing)
- "Euclidean void" = the coordinate container / grid indices
- "Noether Sea" = coupled pro/anti cores instantiated as objects or fields in the void

### Mandatory $\mathbb{U}_{\text{now}}$ universe-state perspective ($\mathbb{U}_{\text{now}}$) grid
Every run must instantiate $\mathbb{U}_{\text{now}}$ sensors:
- $\mathbb{U}_{\text{now}}$ grid definition: points/worldlines, spacing, bounds, boundary conditions
- Logged channels (minimum): $\Phi$, $\nabla\Phi$
- Optional: medium state variables (for example, $\rho_{\text{core}}$ and alignment metrics)
- Provenance tables: `receiver_id`, $t$, `emitter_id`, $t_{\text{emit}}$, `contribution_strength` when feasible

### Causal wake surface bookkeeping requirement
When a potential wake surface intersects a $\mathbb{U}_{\text{now}}$ sensor or contributes to $\Phi(x,t)$, the code must:
- Solve for emission time $t_{\text{emit}}$ using $\lVert x - x_{\text{emitter}}(t_{\text{emit}})\rVert = c_f (t - t_{\text{emit}})$
- Record emitter identity plus $t_{\text{emit}}$ (provenance logging)

### Metadata (required)
Each run must store:
- $c_f$, kernel parameters, $\Delta t$, integrator name/order, tolerances
- history-window/compression settings (if any)
- initial conditions seed
- version hash / commit id

### Acceptance gate
No major physical claim is accepted without:
- $\mathbb{U}_{\text{now}}$ logs
- $\Delta t$ convergence
- history-resolution convergence
- cross-integrator comparison (for critical results)


### $\mathbb{U}_{\text{now}}$ universe-state perspective Implementation & Grid Protocols

1. **Grid Initialization**: All simulations run on a rigid Cartesian grid representing the **Euclidean void**. The grid is pre-loaded with a lattice of coupled Noether cores to instantiate the Noether Sea.
2. **Fiducial Observer Array**: Instantiate a grid of virtual sensors at fixed $(x,y,z)$. Each records $\Phi$ and $\nabla\Phi$.
3. **Causal Time Lookup**: When a causal isochron intersects a sensor, the simulator uses the grid history to "look back" to the emitter's position at $t_{history}$.
4. **Logging Standard**: All runs must log $\mathbb{U}_{\text{now}}$ channels ($\Phi$, $\nabla\Phi$, provenance tables) to allow cross-run convergence auditing.


### $\mathbb{U}_{\text{now}}$ universe-state perspective Grid

* **Grid:** Initialize rigid Cartesian `Grid[x][y][z]` for the Euclidean void.
* **Sea Initialization:** Pre-load the grid with coupled Noether cores for low-excitation Noether-Sea runs.
* **Logging:** Record $\Phi$ and $\nabla\Phi$ at fixed nodes ($\mathbb{U}_{\text{now}}$ universe-state sensors).
* **Time:** Global step $\Delta t$ (absolute time).
