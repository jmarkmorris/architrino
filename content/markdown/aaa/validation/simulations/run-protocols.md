# Simulation Run Protocols

This chapter defines the mandatory runtime protocol for simulations carried out in the absolute-frame implementation of the theory. Its role is to standardize the frame, logging requirements, provenance bookkeeping, metadata, and acceptance gates so results from different runs can be compared and audited coherently.

The opening gives the top-level simulation rule set; the later sections unpack the absolute-frame interpretation and the required $\mathbb{U}_{\text{now}}$ instrumentation in more detail.

## Master Simulation Protocol (Absolute Frame)

1. **Coordinate Anchor**: All simulations run on a fixed Cartesian grid chosen as the coordinate scaffold for the Euclidean void. `Grid[x][y][z]` is a chart address, not an intrinsic label in the void.
2. **Clock Rate**: The simulator uses a global `Time` counter (absolute $t$). No relativistic scaling is applied to the integration step itself.
3. **$\mathbb{U}_{\text{now}}$ universe-state interface**: Every run must instantiate an array of fixed virtual sensors to log $\Phi$ and $\nabla\Phi$ at declared absolute-frame grid addresses.
4. **Noether Sea Initialization**: Low-excitation Noether-Sea runs must pre-populate the grid with a lattice of coupled pro/anti Noether swarms to simulate Noether-Sea influence on test particles.
5. **Convergence**: $\Delta t$ refinement must be accompanied by "History Resolution" refinement to ensure self-hit calculations are numerically stable.
6. **Campaign Packet**: Any run used for a proof certificate, branch-certificate gate, or promoted validation claim must emit a machine-checkable packet rather than only plots or summaries.

## Simulation Campaign Object

Every promoted numerical claim is carried by a campaign object, not by an isolated plot or best-fit table:
$$
\mathcal{C}_{\mathrm{sim}}
=
\big(
\mathsf{id},
S_\eta,
\mathcal{G}_h,
\Delta t,
\eta,
I_h^q,
\mathcal{L}_{\mathrm{root}},
\mathcal{T}_{\eta},
\mathcal{R}_{\mathrm{branch}},
\Pi_{\mathbb{U}_{\text{now}}},
\mathcal{E}_{\mathrm{conv}},
\mathcal{F}
\big).
$$
Here $\mathsf{id}$ fixes the run identifier and source commit, $S_\eta$ is the regularized state history, $\mathcal{G}_h$ is the spatial and history mesh, $\Delta t$ is the absolute-time step, $\eta > 0$ is the causal-wake regularization width, $I_h^q$ is the declared order-$q$ history interpolation operator, $\mathcal{L}_{\mathrm{root}}$ is the causal-root ledger, $\mathcal{T}_{\eta}$ is the transition-record family for fold-layer, separator, or active-root status windows, $\mathcal{R}_{\mathrm{branch}}$ is the named branch-residual vector, $\Pi_{\mathbb{U}_{\text{now}}}$ is the provenance log, $\mathcal{E}_{\mathrm{conv}}$ is the convergence-measure vector, and $\mathcal{F}$ is the finite failure-code set.

The state history is
$$
S_\eta(t)
=
\{(\mathbf{x}_i(t),\mathbf{v}_i(t),q_i)\}_{i=1}^{N},
\qquad
S_{\eta,t}(\theta)=S_\eta(t+\theta),\quad \theta\in[-h,0].
$$
A Tier 1 packet must state whether this history is evaluated in $C^1([-h,0])$, $W^{1,\infty}([-h,0])$, or a stricter history class. A missing history class is an incomplete artifact, because the delayed source-state evaluation cannot be audited without it.

The mesh and interpolation record is
$$
\mathcal{G}_h=(\Omega_h,\Delta x,\{x_k\}_{k=1}^{K},\Theta_h,\Delta h,\mathsf{bc}),
$$
where $\Omega_h\subset\mathbb{R}^3$ is the Euclidean-void computational domain, $\{x_k\}$ are the fixed $\mathbb{U}_{\text{now}}$ sample points, $\Theta_h\subset[-h,0]$ is the stored path-history mesh, $\Delta h$ is the history resolution, and $\mathsf{bc}$ records boundary conditions. The interpolation operator $I_h^q$ is part of the packet; delayed source states cannot be reconstructed by an implicit or undocumented lookup rule.

## Executable Diagnostic Contract

A campaign that disciplines a proof certificate must reduce its numerical status to predeclared scalar diagnostics. The default diagnostic vector is
$$
\mathcal{D}_{\mathrm{exec}}
=
\big(
D_{\mathrm{branch}},
D_{\mathrm{ref}},
D_{\mathrm{ord}},
D_{\mathrm{hist}},
D_{\mathrm{space}},
D_{\mathrm{cross}},
D_{\mathrm{prov}},
D_{\mathrm{cons}},
D_{\eta},
D_{\mathrm{jump}}
\big),
$$
where every component is a ratio with passing threshold $1$. The component meanings are:

| Component | Required role |
| --- | --- |
| $D_{\mathrm{branch}}$ | largest branch residual divided by its declared tolerance |
| $D_{\mathrm{ref}}$ | temporal refinement residual for $\Phi$, $\|\nabla\Phi\|$, and self-hit rate |
| $D_{\mathrm{ord}}$ | observed-order gate for the retained primary field channel |
| $D_{\mathrm{hist}}$ | history-resolution, interpolation, and provenance-distribution gate |
| $D_{\mathrm{space}}$ | spatial refinement and self-hit stability-window gate |
| $D_{\mathrm{cross}}$ | cross-integrator agreement with matching branch identity |
| $D_{\mathrm{prov}}$ | $\mathbb{U}_{\text{now}}$ causal-provenance residual |
| $D_{\mathrm{cons}}$ | energy, momentum, and angular-momentum drift gate |
| $D_{\eta}$ | regulator-dependence gate for promoted observables |
| $D_{\mathrm{jump}}$ | jump or branch-transition residual for nonsmooth windows |

The Tier 1 acceptance predicate is
$$
\mathsf{Accept}_1(\mathcal{C}_{\mathrm{sim}})
\Longleftrightarrow
R_0\in\mathsf{Candidate}_{1},
\quad
\max_a\mathcal{D}_{\mathrm{exec},a}\le 1,
\quad
\Delta_{\mathrm{root}}(\Delta t,\Delta t/2)=0,
$$
$$
\Delta_{\mathrm{root}}(\Delta h,\Delta h/2)=0,
\quad
\Delta_{\eta,\mathrm{root}}=0,
\quad
\mathsf{NullFail}=1,
\quad
\mathsf{Artifacts}=1.
$$
Here $\mathsf{NullFail}=1$ means the negative control violates at least one required null-test margin, and $\mathsf{Artifacts}=1$ means every required artifact exists with a content hash and source commit.

Failure routing is deterministic. Missing required artifacts, source commits, pre-run tolerances, or hashes route to $\mathsf{artifact\_incomplete}$. Changing a promoted observable, tolerance, branch label, or regulator ladder after output inspection routes to $\mathsf{hidden\_tuning}$. Unstable active-root identity routes to $\mathsf{branch\_root\_instability}$; failed refinement routes to $\mathsf{mesh\_nonconvergence}$; failed provenance routes to $\mathsf{provenance\_discontinuity}$; failed conservation routes to $\mathsf{conservation\_drift}$; failed regulator rows route to $\mathsf{regulator\_dependence}$; and exit from the admissible $\eta$ continuation set routes to $\mathsf{eta\_continuation\_failure}$.

## Proof-Certificate Handoff

The proof-to-simulation handoff for a finite certificate is
$$
\mathsf{H}_{\mathrm{proof}\to\mathrm{sim}}
=
\big(
\mathsf{certificate\_id},
S_{\eta,0},
W,
\Lambda,
\mathcal{L}_{\mathrm{root}}^{\mathrm{expected}},
\tau_{\mathrm{branch}},
\tau_{\mathrm{conv}},
\tau_{\eta},
\mathsf{Null},
\mathsf{Outputs}
\big).
$$
It names the source certificate, initial history, analysis window, branch label, expected active-root classes, branch tolerances, convergence tolerances, regulator ladder, negative-control mutation, and required output channels before the run starts.

The simulation-to-proof handoff is
$$
\mathsf{H}_{\mathrm{sim}\to\mathrm{proof}}
=
\big(
\mathsf{artifact\_hashes},
\mathcal{L}_{\mathrm{root}}^{\mathrm{matched}},
\mathcal{T}_{\eta},
\mathcal{R}_{\mathrm{branch}},
\mathcal{E}_{\mathrm{conv}},
\mathcal{D}_{\mathrm{exec}},
\mathsf{failure\_code},
\mathsf{promotion\_status}
\big).
$$
A proof packet may cite a simulation only through this handoff. It must state whether every expected active root was matched under $\Delta t$, $\Delta h$, and $\eta$ refinement, which residual component controls the verdict, and which artifact contains each value.

**Lemma (simulation-promotion criterion).** Let $Q$ be a priority-theory claim whose variables are contained in $\mathcal{C}_{\mathrm{sim}}$, and let $R_1$ be a Tier 1 continuation of a Tier 0 candidate $R_0$. If $R_0$ satisfies the Tier 0 acceptance criteria, $R_1$ satisfies the Tier 1 acceptance criteria, the negative control fails as required, and
$$
\max_a\frac{\mathcal{E}_{\mathrm{ref},a}}{\tau_{\mathrm{ref},a}}\le 1,
\qquad
\max_a\frac{\mathcal{E}_{\mathrm{prov},a}}{\tau_{\mathrm{prov},a}}\le 1,
\qquad
\max_a\frac{\mathcal{E}_{\mathrm{cons},a}}{\tau_{\mathrm{cons},a}}\le 1,
$$
$$
\max_a\frac{\mathcal{R}_{\mathrm{branch},a}}{\tau_{\mathrm{branch},a}}\le 1,
\qquad
\max_Y\frac{E_\eta(Y)}{\tau_{\eta,Y}}\le 1,
$$
with all tolerances declared before the run, then the result may be promoted from numerical candidate to simulation-supported priority claim for $Q$. This lemma does not convert a simulation-supported priority claim into an analytic theorem; it authorizes proof-program routing only with artifact hashes and the failure-code ledger attached.

## $A_0$ Branch-Certificate Protocol

The first mass-map target has a specialized protocol in [$A_0$ Branch Certificate Protocol](a0-branch-certificate-protocol.md), with Tier 0 row semantics summarized in [$A_0$ Tier 0 Result Interpretation](a0-tier0-result-interpretation.md). That protocol separates four stages:

1. Tier 0 algebraic branch search for finite root-ledger candidates.
2. Tier 1 $\eta > 0$ delayed-dynamics continuation and Floquet diagnostics.
3. Tier 2 internal-energy and shielding extraction.
4. Tier 3 Noether-Sea response tensor probes.

A rerun after a finite-coordinate no-go must include the predeclared branch-chart revision record; residual-selected coordinates, locked keys promoted into branch geometry, or benchmark-derived inputs invalidate the packet as hidden fitting.

After the current compact scalar-basis no-go, an $A_0$ rerun must also predeclare the corrected one-period branch-equation basis, the non-circular carrier correction if used, the residual-balance ledger, held-out residual rule, and failure code before it can proceed to $\Delta_{\mathbf{k}}$ or $\eta$-ladder persistence.

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

The normalized public-data diagnostic is
$$
\mathcal{D}_{\mathrm{GW}}
=
\big(
D_h,D_\phi,D_E,D_{c_g},D_{\mathrm{det}},D_{\mathrm{PE}},D_{\mathrm{prov}}
\big),
$$
with
$$
D_h=\frac{R_h}{\tau_h},
\qquad
D_\phi=\frac{R_\phi}{\tau_\phi},
\qquad
D_E=\frac{R_E}{\tau_E},
\qquad
D_{c_g}=\frac{|R_{c_g}|}{\tau_{c_g}}.
$$
$D_{\mathrm{det}}$, $D_{\mathrm{PE}}$, and $D_{\mathrm{prov}}$ are binary completeness ratios whose value is `0` only when detector masks/calibration, parameter-estimation release metadata, and artifact hashes are all present. A packet can support a promoted gravitational-wave claim only if
$$
\max_a\mathcal{D}_{\mathrm{GW},a}\le 1
$$
and the public-data provenance row was fixed before waveform comparison.

The first benchmark triad is:

| Packet row | Required public-data role | Failure routed if missing |
| --- | --- | --- |
| `GW150914_short_bbh` | Short inspiral-merger-ringdown strain, two-detector arrival timing, radiated-energy ledger, numerical-relativity waveform provenance, and ringdown handoff | $\mathsf{artifact\_incomplete}$ or $\mathsf{hidden\_tuning}$ |
| `GW170817_long_bns` | Long inspiral strain, three-detector timing, glitch/cleaning provenance, chirp-mass phase benchmark, and parameter-estimation waveform-family record | $\mathsf{provenance\_discontinuity}$ or $\mathsf{mesh\_nonconvergence}$ |
| `GW170817_GRB_speed` | Photon/gravity timing residual with luminosity distance, observed delay, and intrinsic source-emission lag nuisance | $\mathsf{hidden\_tuning}$ or $\mathsf{conservation\_drift}$ |

This public benchmark packet is a success marker under the existing simulation provenance and conservation gates, not a new gate family. Its value is that public strain, parameter-estimation samples, waveform provenance, and multimessenger timing make strong-field radiation tests replayable without importing GR waveform success as $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

## Tier 0 / Tier 1 Campaign Packet

Tier 0 and Tier 1 results are accepted only through an auditable campaign packet. The packet must include the source commit, pre-run tolerances, root ledger, branch residual vector, convergence table, $\eta$ ladder when a regulator claim is made, declared history interpolation, failure report, and artifact hashes. When a run crosses a fold-layer, separator, or active-root status transition, the packet must also include transition records for that window.

The minimum Tier 0 packet contains `campaign.json`, `mesh.json`, `state_vector.json`, `root_ledger.json`, `branch_residuals.json`, `candidate_rows.csv`, `failure_codes.md`, and `promotion_gate.md`. For corrected branch-equation reruns, `branch_residuals.json` must include the branch-native basis, predeclared coefficient rule, held-out residual rule, and pass/fail value for the residual-balance row. The minimum Tier 1 packet adds `run_metadata.json`, $\mathbb{U}_{\text{now}}$ provenance data, `history_interpolation.json`, `convergence_table.csv`, `eta_ladder.csv`, `conservation_ledger.csv`, `cross_integrator_report.md`, `negative_control_report.md`, `failure_report.md`, and `promotion_lemma_check.md`. If a Tier 1 run claims a branch transition, it also emits `transition_records.json` with the status, regularization route, transition-window scale, root-ledger rows, and promoted observables for each transition window.

The `cross_integrator_report.md` artifact must name the solver family, delayed interpolation polynomial or reconstruction rule, nonlinear solve residuals when implicit stages are used, small-delay or vanishing-delay encounters, and event or restart handling. Cross-integrator agreement is evidence only when the branch identity and transition records match, not merely when plotted observables are close.

A Tier 1 packet supports a proof or validation claim only when the branch residuals, convergence checks, provenance checks, conservation checks, regulator-dependence checks, and negative control all pass with tolerances declared before the run. If any promoted scalar, root count, branch label, stability gap, or tolerance is selected after inspecting output, the packet fails as hidden tuning.

## Run Protocol: Absolute-Frame + $\mathbb{U}_{\text{now}}$ Logging

### Absolute frame rule
All simulations integrate dynamics in the absolute Euclidean frame:
- Fixed Cartesian coordinates (x,y,z) in a chosen scaffold representing the Euclidean void
- Global absolute time $t$ with step $\Delta t$
- No relativistic time dilation applied to the integration clock (proper time is derived only in post-processing)

### Void and Noether-Sea Terminology (Simulation-Facing)
- "Euclidean void" = the fixed spatial container represented by the chosen coordinate chart / grid indices
- "Noether Sea" = coupled pro/anti swarms instantiated as objects or response variables in the void

### Mandatory $\mathbb{U}_{\text{now}}$ universe-state perspective ($\mathbb{U}_{\text{now}}$) grid
Every run must instantiate $\mathbb{U}_{\text{now}}$ sensors:
- $\mathbb{U}_{\text{now}}$ grid definition: chart points/worldlines, spacing, bounds, boundary conditions
- Logged channels (minimum): $\Phi$, $\nabla\Phi$
- Optional: Noether-Sea state variables (for example, $\rho_{\text{NS}}$ and alignment metrics)
- Provenance tables: `receiver_id`, $t$, `emitter_id`, $t_{\text{emit}}$, `contribution_strength` when feasible

### Causal wake surface bookkeeping requirement
When a potential wake surface intersects a $\mathbb{U}_{\text{now}}$ sensor or contributes to $\Phi(x,t)$, the code must:
- Solve for emission time $t_{\text{emit}}$ using $\| x - x_{\text{emitter}}(t_{\text{emit}})\| = c_f (t - t_{\text{emit}})$
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

1. **Grid Initialization**: All simulations run on a rigid Cartesian grid chosen as the coordinate scaffold for the **Euclidean void**. The grid is pre-loaded with a lattice of coupled Noether swarms to instantiate the Noether Sea.
2. **Fiducial Sensor Array**: Instantiate a grid of virtual sensors at fixed chart locations $(x,y,z)$. Each records $\Phi$ and $\nabla\Phi$.
3. **Causal Time Lookup**: When a causal isochron intersects a sensor, the simulator uses the grid history to "look back" to the emitter's position at $t_{history}$.
4. **Logging Standard**: All runs must log $\mathbb{U}_{\text{now}}$ channels ($\Phi$, $\nabla\Phi$, provenance tables) to allow cross-run convergence auditing.


### $\mathbb{U}_{\text{now}}$ universe-state perspective Grid

* **Grid:** Initialize rigid Cartesian `Grid[x][y][z]` as the chosen chart for the Euclidean void.
* **Sea Initialization:** Pre-load the grid with coupled Noether swarms for low-excitation Noether-Sea runs.
* **Logging:** Record $\Phi$ and $\nabla\Phi$ at fixed nodes ($\mathbb{U}_{\text{now}}$ universe-state sensors).
* **Time:** Global step $\Delta t$ (absolute time).
