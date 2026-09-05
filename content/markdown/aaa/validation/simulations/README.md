# Simulation README

The simulation protocols share an [absolute-frame](../../foundations/constructing-the-absolute-frame.md) execution model, meaning fixed Euclidean coordinates and one universal time, together with a virtual $\mathbb{U}_{\text{now}}$ universe-state perspective for complete-state bookkeeping and a strict separation between raw microstate logs and detector-level synthetic observables. The protocols are grouped by responsibility:

- common execution and interpretation: [Simulation Run Protocols](run-protocols.md), [Convergence Tests](convergence-tests.md), [Architrino Simulation Record](architrino.md), and [Simulation Perspective](perspective.md);
- detector-facing and statistical outputs: [Synthetic Observables](synthetic-observables.md), [Bell-Family Record Measure](bell-family-record-measure.md), and [Thermodynamic Residual](thermodynamic-residual.md);
- mass-map and action closure: [$A_0$ Branch Certificate Protocol](a0-branch-certificate-protocol.md), [$A_0$ Tier 0 Result-Schema Interpretation](a0-tier0-result-interpretation.md), [Coincident-Midpoint Orthogonal-Axis Action-Increment Protocol](coincident-midpoint-orthogonal-axis-action-increment-protocol.md), [Retuning-Map Toy Model](retuning-map-toy-model.md), and the [Action-Energy Model](action-energy/action-model.md) with its sibling derivation notes;
- cosmology and response scaffolds: [Cosmology Shared Residual Fit Protocol](cosmology-shared-residual-fit.md), [Redshift-Budget Toy Model](redshift-budget-toy-model.md), [Static Response Vector Toy Model](static-response-vector-toy-model.md), and [Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan](hydrogen-gamma-n-spectral-row-toy-scan.md).

## Simulation Frame and the $\mathbb{U}_{\text{now}}$ Universe-State Perspective

All simulation tiers are implemented in the absolute frame:

- **Spatial frame:** fixed Cartesian grid in the Euclidean void, $(X,Y,Z)$ constant in time.
- **Temporal frame:** global absolute time $T$, advanced in discrete steps $\Delta T$.
- **Microdynamics:** architrino positions and velocities updated according to the master equation; potentials propagated at speed $c_f$.

The simulator occupies the **$\mathbb{U}_{\text{now}}$ universe-state perspective**:

- It records $S(T)$, including all modeled architrinos and assemblies, at each time step.
- It computes fields and Noether sea state anywhere in the declared domain.

To connect to experiment:

- Embed **model detectors**, represented by assembly worldlines, in this frame.
- Compute the fields they experience along their paths, their internal clock readings $\tau$ relative to $T$, and the arrival times, redshifts, and intensity patterns they register.
- Synthetic observables are derived from these detector responses, not from raw $S(T)$ directly.

This enforces a clean separation between:

- Fundamental dynamics in the absolute frame (what the simulation integrates),
- Emergent observational physics (what real experiments would see).

## Simulation Scope Envelope

A simulation is a bounded experiment on the model, not a complete copy of $\mathbb{U}_{\text{now}}$. Every run should declare its scope before outputs are interpreted:

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
