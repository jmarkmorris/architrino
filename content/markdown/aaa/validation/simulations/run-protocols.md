# Simulation Run Protocols

This chapter defines the mandatory runtime protocol for simulations carried out in the absolute-frame implementation of the theory. Its role is to standardize the frame, logging requirements, provenance bookkeeping, metadata, and acceptance gates so results from different runs can be compared and audited coherently.

The opening gives the top-level simulation rule set; the later sections unpack the absolute-frame interpretation and the required $\mathbb{U}_{\text{now}}$ instrumentation in more detail.

## Master Simulation Protocol (Absolute Frame)

1. **Coordinate Anchor**: All simulations run on a fixed Cartesian grid chosen as the coordinate scaffold for the Euclidean void. `Grid[x][y][z]` is a chart address, not an intrinsic label in the void.
2. **Clock Rate**: The simulator uses a global `Time` counter (absolute $t$). No relativistic scaling is applied to the integration step itself.
3. **$\mathbb{U}_{\text{now}}$ universe-state interface**: Every run must instantiate an array of fixed virtual sensors to log $\Phi$ and $\nabla\Phi$ at declared absolute-frame grid addresses.
4. **Noether Sea Initialization**: Low-excitation Noether-Sea runs must pre-populate the grid with a lattice of coupled pro/anti tri-binary assemblies to simulate the medium's influence on test particles.
5. **Convergence**: $\Delta t$ refinement must be accompanied by "History Resolution" refinement to ensure self-hit calculations are numerically stable.
6. **Campaign Packet**: Any run used for a proof certificate, branch-certificate gate, or promoted validation claim must emit a machine-checkable packet rather than only plots or summaries.

## $A_0$ Branch-Certificate Protocol

The first mass-map target has a specialized protocol in [$A_0$ Branch Certificate Protocol](a0-branch-certificate-protocol.md), with Tier 0 row semantics summarized in [$A_0$ Tier 0 Result Interpretation](a0-tier0-result-interpretation.md). That protocol separates four stages:

1. Tier 0 algebraic branch search for finite root-ledger candidates.
2. Tier 1 $\eta>0$ delayed-dynamics continuation and Floquet diagnostics.
3. Tier 2 internal-energy and shielding extraction.
4. Tier 3 medium-response tensor probes.

A rerun after a finite-coordinate no-go must include the predeclared branch-chart revision record; residual-selected coordinates, locked keys promoted into branch geometry, or benchmark-derived inputs invalidate the packet as hidden fitting.

No simulation run should report $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, or $\mathcal{M}_{\text{sea}}^{ab}$ as accepted outputs unless the preceding branch-certificate gates have passed.

## Cosmology Shared-Residual Protocol

The first cosmology-facing validation scaffold is [Cosmology Shared Residual Fit Protocol](cosmology-shared-residual-fit.md). It specializes the campaign-packet rule to the shared dark-energy and cosmology calibration gate. The packet tests whether SN, BAO, CMB, weak-lensing, redshift-space-distortion, BBN, and pre-BBN branch residuals can consume one $\theta_{\mathrm{sea}}$ without per-observable retuning.

No cosmology packet should report a promoted dark-energy, $H_0$, $S_8$, BBN, CMB, or growth closure unless its ordinary residuals and cross-family projection penalty are both inside declared tolerances.

## Public Gravitational-Wave Benchmark Protocol

A public gravitational-wave benchmark packet tests the effective gravitational-radiation limit against versioned open strain and parameter-estimation records. The packet is not evidence for a fundamental metric ripple in the Euclidean void. It is an observer-level validation object: the $\mathbb{A}\mathbb{A}\mathbb{A}$ simulation must predict detector strain, phase, event-ledger energy balance, and any photon/gravity timing residual through its Noether-Sea response map and then compare those predictions to public artifacts.

The packet object is
$$
\mathcal{C}_{\mathrm{GW}}
=
\big(
\mathsf{event\_id},
\mathsf{catalog},
\mathsf{event\_version},
\mathcal{D},
\mathcal{S}_h,
\mathcal{P}_{\mathrm{PE}},
\mathcal{P}_{\mathrm{wave}},
\mathcal{Q}_{\mathrm{det}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
\mathcal{R}_{\mathrm{GW}},
\Pi_{\mathrm{wave}},
\mathcal{F}
\big).
$$
Here $\mathcal{D}$ names the detectors, $\mathcal{S}_h$ names the strain files, $\mathcal{P}_{\mathrm{PE}}$ names posterior-sample and parameter-estimation records, $\mathcal{P}_{\mathrm{wave}}$ names the waveform-family or numerical-relativity provenance, $\mathcal{Q}_{\mathrm{det}}$ carries calibration, data-quality, injection-mask, down-sampling, and glitch-treatment records, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event conservation ledger, $\mathcal{R}_{\mathrm{GW}}$ is the residual vector, and $\Pi_{\mathrm{wave}}$ maps each fitted or plotted sample back to public artifacts.

The residual vector is
$$
\mathcal{R}_{\mathrm{GW}}
=
\big(
R_h,R_\phi,R_E,R_J,R_{c_g},R_{\mathrm{det}},R_{\mathrm{PE}},R_{\mathrm{prov}}
\big).
$$
$R_h$ compares whitened or otherwise declared detector strain on the predeclared analysis window; $R_\phi$ compares unwrapped inspiral-merger phase on the declared frequency band; $R_E$ checks source masses, remnant mass, radiated energy, recoil, ejecta or heat-channel terms, and boundary exchange in one conservation ledger; $R_J$ checks angular-momentum accounting when the packet claims spin or recoil closure; $R_{c_g}$ is used only for multimessenger timing rows; and the final three residuals are provenance-completeness checks.

For a multimessenger row,
$$
R_{c_g}
=
\frac{\Delta t_{\mathrm{obs}}-\Delta t_{\mathrm{src}}}{D_L/c_\gamma},
\qquad
\Delta t_{\mathrm{obs}}=t_\gamma-t_{\mathrm{GW}}.
$$
The intrinsic source-emission delay $\Delta t_{\mathrm{src}}$ must be declared before fitting the gravity-channel speed. A packet fails as hidden tuning if it absorbs photon/gravity timing into an undeclared source delay, changes the analysis band after inspecting residuals, substitutes a cleaned strain product without recording a new provenance row, or changes waveform family after comparing to the data.

The minimum artifact list is `event.json`, `strain_files.json`, `detector_quality.json`, `parameter_estimation.json`, `waveform_provenance.json`, `analysis_window.json`, `strain_residuals.csv`, `phase_residuals.csv`, `energy_ledger.csv`, `speed_residual.json` when applicable, `artifact_hashes.json`, and `failure_report.md`. For long binary-neutron-star inspirals the packet must also include a glitch/cleaning row, a low-frequency cutoff row, and a reason if any detector is excluded from a visible-strain comparison. For short binary-black-hole benchmarks the packet must include an inspiral-merger-ringdown window, detector arrival-time comparison, and ringdown handoff row.

## Tier 0 / Tier 1 Campaign Packet

Tier 0 and Tier 1 results are accepted only through an auditable campaign packet. The packet must include the source commit, pre-run tolerances, root ledger, branch residual vector, convergence table, $\eta$ ladder when a regulator claim is made, declared history interpolation, failure report, and artifact hashes. When a run crosses a fold-layer, separator, or active-root status transition, the packet must also include transition records for that window.

The minimum Tier 0 packet contains `campaign.json`, `mesh.json`, `state_vector.json`, `root_ledger.json`, `branch_residuals.json`, `candidate_rows.csv`, `failure_codes.md`, and `promotion_gate.md`. The minimum Tier 1 packet adds `run_metadata.json`, $\mathbb{U}_{\text{now}}$ provenance data, `history_interpolation.json`, `convergence_table.csv`, `eta_ladder.csv`, `conservation_ledger.csv`, `cross_integrator_report.md`, `negative_control_report.md`, `failure_report.md`, and `promotion_lemma_check.md`. If a Tier 1 run claims a branch transition, it also emits `transition_records.json` with the status, regularization route, transition-window scale, root-ledger rows, and promoted observables for each transition window.

The `cross_integrator_report.md` artifact must name the solver family, delayed interpolation polynomial or reconstruction rule, nonlinear solve residuals when implicit stages are used, small-delay or vanishing-delay encounters, and event or restart handling. Cross-integrator agreement is evidence only when the branch identity and transition records match, not merely when plotted observables are close.

A Tier 1 packet supports a proof or validation claim only when the branch residuals, convergence checks, provenance checks, conservation checks, regulator-dependence checks, and negative control all pass with tolerances declared before the run. If any promoted scalar, root count, branch label, stability gap, or tolerance is selected after inspecting output, the packet fails as hidden tuning.

## Run Protocol: Absolute-Frame + $\mathbb{U}_{\text{now}}$ Logging

### Absolute frame rule
All simulations integrate dynamics in the absolute Euclidean frame:
- Fixed Cartesian coordinates (x,y,z) in a chosen scaffold representing the Euclidean void
- Global absolute time $t$ with step $\Delta t$
- No relativistic time dilation applied to the integration clock (proper time is derived only in post-processing)

### Void vs medium terminology (simulation-facing)
- "Euclidean void" = the fixed spatial container represented by the chosen coordinate chart / grid indices
- "Noether Sea" = coupled pro/anti cores instantiated as objects or fields in the void

### Mandatory $\mathbb{U}_{\text{now}}$ universe-state perspective ($\mathbb{U}_{\text{now}}$) grid
Every run must instantiate $\mathbb{U}_{\text{now}}$ sensors:
- $\mathbb{U}_{\text{now}}$ grid definition: chart points/worldlines, spacing, bounds, boundary conditions
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

1. **Grid Initialization**: All simulations run on a rigid Cartesian grid chosen as the coordinate scaffold for the **Euclidean void**. The grid is pre-loaded with a lattice of coupled Noether cores to instantiate the Noether Sea.
2. **Fiducial Sensor Array**: Instantiate a grid of virtual sensors at fixed chart locations $(x,y,z)$. Each records $\Phi$ and $\nabla\Phi$.
3. **Causal Time Lookup**: When a causal isochron intersects a sensor, the simulator uses the grid history to "look back" to the emitter's position at $t_{history}$.
4. **Logging Standard**: All runs must log $\mathbb{U}_{\text{now}}$ channels ($\Phi$, $\nabla\Phi$, provenance tables) to allow cross-run convergence auditing.


### $\mathbb{U}_{\text{now}}$ universe-state perspective Grid

* **Grid:** Initialize rigid Cartesian `Grid[x][y][z]` as the chosen chart for the Euclidean void.
* **Sea Initialization:** Pre-load the grid with coupled Noether cores for low-excitation Noether-Sea runs.
* **Logging:** Record $\Phi$ and $\nabla\Phi$ at fixed nodes ($\mathbb{U}_{\text{now}}$ universe-state sensors).
* **Time:** Global step $\Delta t$ (absolute time).
