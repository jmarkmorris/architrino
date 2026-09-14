# Simulation README

This chapter indexes the simulation protocols of the [validation program](../validation-protocols.md). Direct dynamical simulations numerically integrate the [Master Equation](../../dynamics/master-equation.md), the delayed acceleration law under which each [architrino](../../foundations/architrino.md), a point transceiver of fixed polarity, is accelerated only by the causal wakes, the expanding disturbances emitted from past positions of itself and of other architrinos, that arrive at it at the current instant. The directory also contains prescribed branch searches, reduced models, bookkeeping replays, and arithmetic fixtures. Each is evidence about its declared model and does not by itself establish Master Equation dynamics. The protocols state how each run is set up, logged, refined, and compared. Correctness evidence requires the independent reference its protocol names, such as a separately derived closed form or an independently measured observer-level benchmark. Refinement tests measure resolution sensitivity but are not independent references: every rung can share the same wrong kernel. Agreement with earlier output or a replay establishes repeatability. No entry below is itself a physical acceptance; each protocol carries its own acceptance conditions and claim grades. The simulation protocols share an [absolute-frame](../../foundations/constructing-the-absolute-frame.md) execution model, meaning fixed Euclidean coordinates and one universal time, together with a virtual $\mathbb{U}_{\text{now}}$ universe-state perspective, a bookkeeping view of the complete modeled state at one absolute time that no physical observer holds, and a strict separation between raw microstate logs and detector-level synthetic observables. The protocols are grouped by responsibility:

- common execution and interpretation: [Simulation Run Protocols](run-protocols.md), [Convergence Tests for Non-Markovian Dynamics](convergence-tests.md), [Architrino Simulation Tests](architrino.md), and [Simulation Perspective and Closure Targets](perspective.md);
- detector-facing and statistical outputs: [Synthetic Observables and $\mathbb{U}_{\text{now}}$ Logging](synthetic-observables.md), [Bell-Family Record-Measure Harness](bell-family-record-measure.md), and [Thermodynamic Residual](thermodynamic-residual.md);
- protocols and toy models toward mass-map and action closure targets: [$A_0$ Branch Certificate Protocol](a0-branch-certificate-protocol.md), [$A_0$ Tier 0 Result Interpretation: Reduced Branch Search](a0-tier0-result-interpretation.md), [Coincident-Midpoint Orthogonal-Axis Action-Increment Protocol](coincident-midpoint-orthogonal-axis-action-increment-protocol.md), [Retuning-Map Toy Model](retuning-map-toy-model.md), and the [Action Model Comparison](action-energy/action-model.md) with its [sibling derivation notes](action-energy/action-model.md#sibling-derivation-notes);
- cosmology and response scaffolds: [Cosmology Shared Residual Fit Protocol](cosmology-shared-residual-fit.md), [Redshift-Budget Toy Model](redshift-budget-toy-model.md), [Static Response Vector Toy Model](static-response-vector-toy-model.md), and [Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan](hydrogen-gamma-n-spectral-row-toy-scan.md).

## Simulation Frame and the $\mathbb{U}_{\text{now}}$ Universe-State Perspective

Direct dynamical runs use the following absolute-frame specification; its presence here does not certify an implementation. Reduced models and replays declare which state variables and operations they actually represent:

- **Spatial frame:** fixed Cartesian grid in the [Euclidean void](../../foundations/euclidean-void.md), the flat and unmoving spatial container, with $(X,Y,Z)$ constant in time; a grid address is a chart label for a point of the void, not a structure in it.
- **Temporal frame:** global absolute time $T$, advanced in discrete steps $\Delta T$.
- **Microdynamics:** architrino positions and velocities updated according to the Master Equation; causal wakes, which carry the potential each architrino emits, propagate at the wake speed $c_f$, normalized to $c_f=1$ in every numerical run.

In a direct dynamical run, the logging specification uses the **$\mathbb{U}_{\text{now}}$ universe-state perspective**:

- It records the complete modeled state $S(T)$, meaning the position, velocity, polarity, and retained path history of every modeled architrino and assembly, at each time step.
- It computes the superposed wake potential $\Phi$, its gradient $\nabla\Phi$, and the [Noether sea](../../spacetime/noether-sea.md) state, the ambient assembly medium that occupies the void, anywhere in the declared domain.

To connect a direct dynamical run to experiment:

- Embed **model detectors**, represented by the worldlines of assemblies (bound configurations of architrinos), in this frame.
- Compute the wake potential and gradient they experience along their paths, their derived clock time $\tau$, the readout of a physical clock, relative to $T$, and the arrival times, redshifts, and intensity patterns they register.
- Synthetic observables are derived from these detector responses, not from raw $S(T)$ directly.

This enforces a clean separation between:

- Fundamental dynamics in the absolute frame (what the simulation integrates),
- Emergent observational physics (what real experiments would see).

## Simulation Scope Envelope

A simulation is a bounded experiment on the model, not a complete copy of $\mathbb{U}_{\text{now}}$. Every run should declare its scope before outputs are interpreted, marking inapplicable dynamical entries explicitly for reduced models and replays:

- spatial domain and boundary conditions;
- absolute-time span, $\Delta T$, and retained history depth;
- entity count, assembly inventory, and Noether sea initialization;
- spatial, temporal, and path-history resolution ladders;
- logged $\mathbb{U}_{\text{now}}$ channels and detector-synthetic channels;
- runtime-rate or cost budget when feasible replay matters;
- feedback or intervention mode, including whether the run is passive replay, diagnostic probing, controlled perturbation, or detector post-processing.

Near-threshold events need a margin report. If an unresolved perturbation, sampling choice, or detector context can flip a reaction, branch, or record classification, the simulation should report the threshold margin and alternate-outcome band. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is not substrate randomness; it is unresolved state sensitivity inside a deterministic causal-history model.

## Path-History Provenance

Path-history provenance lets a simulation record support replay and audit, not merely trajectory display. A provenance-rich run keeps stable identities for modeled architrinos and assemblies, authoritative path segments for position and velocity, causal-root records, delayed transmitter-state records, assembly-membership intervals, and reaction or record-forming event references. Those records let a later audit ask which transmitter history, emitted causal wake, receiver state, Noether sea context, and outgoing assembly record produced a synthetic observation.

This does not make the simulator a physical observer and does not require unbounded storage of $\mathbb{U}_{\text{now}}$. The scope envelope decides how much provenance is retained, at what resolution, for which entities, and under which replay or compression authority. Full path retention is valuable only where it changes the scientific claim: reaction balancing, branch replay, process demographics, detector-synthetic output, or failure analysis.
