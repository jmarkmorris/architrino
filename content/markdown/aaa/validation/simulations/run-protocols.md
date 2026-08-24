# Simulation Run Protocols

This chapter defines the mandatory runtime protocol for simulations carried out in the absolute-frame implementation of the theory. Its role is to standardize the frame, logging requirements, provenance bookkeeping, metadata, and acceptance gates so results from different runs can be compared and audited coherently.

The opening gives the top-level simulation rule set; the later sections unpack the absolute-frame interpretation and the required $\mathbb{U}_{\text{now}}$ instrumentation in more detail.

## Master Simulation Protocol (Absolute Frame)

1. **Coordinate Anchor**: All simulations run on a fixed Cartesian grid chosen as the coordinate scaffold for the Euclidean void. `Grid[x][y][z]` is a chart address, not an intrinsic label in the void.
2. **Clock Rate**: The simulator uses a global `Time` counter for absolute time $T$. No relativistic scaling is applied to the integration step itself.
3. **$\mathbb{U}_{\text{now}}$ universe-state interface**: Every run must instantiate an array of fixed virtual sensors to log $\Phi$ and $\nabla\Phi$ at declared absolute-frame grid addresses.
4. **Noether sea Initialization**: A run that claims Noether sea response must declare its initialized braid inventory, branch status, and constitutive variables. A lattice of prescribed braid records is a model input, not evidence that those records form a retained Noether sea.
5. **Convergence**: $\Delta T$ refinement must be accompanied by history-resolution refinement to ensure self-hit calculations are numerically stable.
6. **Scope Envelope**: Every campaign declares the bounded simulation envelope: spatial domain, absolute-time span, entity count, resolution ladder, history depth, output channels, runtime-rate or cost budget, feedback or intervention mode, and threshold-event policy.
7. **Campaign Packet**: Any run used for a proof certificate, branch-certificate gate, or promoted validation claim must emit a machine-checkable packet rather than only plots or summaries.

The scope envelope is metadata for the existing campaign packet, not a separate gate family. It prevents a $\mathbb{U}_{\text{now}}$ run from being read as unlimited computation, unlimited observation, or unlimited control. A numerical result is valid only for the declared scale, resolution, feedback path, and observer layer.

## Simulation Campaign Object

Every promoted numerical claim is carried by a campaign object, not by an isolated plot or best-fit table:
$$
\mathcal{C}_{\mathrm{sim}}
=
\big(
\mathsf{id},
S_\eta,
\mathcal{G}_{\mathrm{mesh}},
\Delta T,
\eta,
I_{\Delta H_{\mathrm{hist}}}^q,
\mathcal{L}_{\mathrm{root}},
\mathcal{T}_{\eta},
\mathcal{R}_{\mathrm{branch}},
\Pi_{\mathbb{U}_{\text{now}}},
\mathcal{E}_{\mathrm{conv}},
\mathcal{F}
\big)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5f180b89feee6f9e)
Here $\mathsf{id}$ fixes the run identifier and source commit, $S_\eta$ is the regularized state history, $\mathcal{G}_{\mathrm{mesh}}$ is the spatial and history mesh, $\Delta T$ is the absolute-time step, $\eta > 0$ is the causal-wake regularization width, $I_{\Delta H_{\mathrm{hist}}}^q$ is the declared order-$q$ history interpolation operator, $\mathcal{L}_{\mathrm{root}}$ is the causal-root ledger, $\mathcal{T}_{\eta}$ is the transition-record family for fold-layer, separator, or active-root status windows, $\mathcal{R}_{\mathrm{branch}}$ is the named branch-residual vector, $\Pi_{\mathbb{U}_{\text{now}}}$ is the provenance log, $\mathcal{E}_{\mathrm{conv}}$ is the convergence-measure vector, and $\mathcal{F}$ is the finite failure-code set.

When a campaign is used for a continuum, field-theory, or regulator-removal claim, it must also attach an extraction map: the regulated observables, test windows, volume or window trajectory when relevant, normalization and mixing rules, convergence topology, positivity or reconstruction condition when applicable, and the artifact hashes for the regulator ladder. If independent methods or benchmarks are used, the packet must expose their normalization conventions and error envelopes before comparing coordinates. These fields tell reviewers exactly what is claimed to survive the finite run and what remains only a regulator-level diagnostic.

For a QFT-like reconstruction claim, the campaign must also state the presentation being targeted, such as Wightman data, Osterwalder-Schrader data, a local observable net, or a weaker named comparison. The packet must then list the hypotheses required by that presentation rather than using generic terms such as `continuum field` or `reconstructed field`.

The state history is
$$
S_\eta(T)
=
\{(\mathbf X_i(T),\mathbf V_i(T),q_i)\}_{i=1}^{N},
\qquad
S_{\eta,T}(\theta)=S_\eta(T+\theta),\quad \theta\in[-H_{\mathrm{hist}},0]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2fcf7a56df428c35)
A Tier 1 packet must state whether this history is evaluated in $C^1([-H_{\mathrm{hist}},0])$, $W^{1,\infty}([-H_{\mathrm{hist}},0])$, or a stricter history class. Here $H_{\mathrm{hist}}>0$ is the retained-history horizon; it is distinct from the observer-level Planck benchmark $h$. A missing history class is an incomplete artifact, because the delayed transmitter-state evaluation cannot be audited without it.

The mesh and interpolation record is
$$
\mathcal{G}_{\mathrm{mesh}}=(\Omega_{\mathrm{sim}},\Delta X,\{\mathbf X_k\}_{k=1}^{K},\Theta_{\mathrm{hist}},\Delta H_{\mathrm{hist}},\mathsf{bc})
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f8987fe2240989d2)
where $\Omega_{\mathrm{sim}}\subset\mathbb{R}^3$ is the Euclidean-void computational domain, $\{\mathbf X_k\}$ are the fixed $\mathbb{U}_{\text{now}}$ sample points, $\Theta_{\mathrm{hist}}\subset[-H_{\mathrm{hist}},0]$ is the stored path-history mesh, $\Delta H_{\mathrm{hist}}$ is the history resolution, and $\mathsf{bc}$ records boundary conditions. The interpolation operator $I_{\Delta H_{\mathrm{hist}}}^q$ is part of the packet; delayed transmitter states cannot be reconstructed by an implicit or undocumented lookup rule.

The path-history part of $\mathcal{G}_{\mathrm{mesh}}$ and $\Pi_{\mathbb{U}_{\text{now}}}$ should distinguish authoritative kinematic segments from attached audit rows. Authoritative segments reconstruct $\mathbf X_i(T)$ and $\mathbf V_i(T)$ over declared intervals with error bounds. Causal-root rows, delayed source-state rows, assembly-membership intervals, reaction-event references, and display projections attach to those segments by identifier and time range. Chunking, compression, and broad-phase indices are allowed as storage or acceleration layers; they do not replace authoritative replay when a promoted claim depends on provenance.

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
\big)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e6033146454ef60f)
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
\max_{D\in\mathcal{D}_{\mathrm{exec}}}D\le 1,
\quad
\Delta_{\mathrm{root}}(\Delta T,\Delta T/2)=0
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-d554ab86f5f9ce0f)
$$
\Delta_{\mathrm{root}}(\Delta H_{\mathrm{hist}},\Delta H_{\mathrm{hist}}/2)=0,
\quad
\Delta_{\eta,\mathrm{root}}=0,
\quad
\mathsf{NullFail}=1,
\quad
\mathsf{Artifacts}=1
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0e40a08d19729731)
Here $R_0\in\mathsf{Candidate}_1$ means the Tier 0 packet has `failure_code: "candidate"` and its `tier0_continuation` gate passes. For two runs $A,B$, $\Delta_{\mathrm{root}}(A,B)$ is the number of unmatched active-root records after matching receiver, transmitter, root class, branch label, and transition status. The regulator version $\Delta_{\eta,\mathrm{root}}$ applies the same matching rule between adjacent $\eta$ values. Thus a zero value means identity-preserving root agreement, not merely equal root counts. Finally, $\mathsf{NullFail}=1$ means the negative control violates at least one required null-test margin, and $\mathsf{Artifacts}=1$ means every required artifact exists with a content hash and source commit.

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
\big)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-b00aeecb82963742)
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
\big)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-88f09a895086b857)
A proof packet may cite a simulation only through this handoff. It must state whether every expected active root was matched under $\Delta T$, $\Delta H_{\mathrm{hist}}$, and $\eta$ refinement, which residual component controls the verdict, and which artifact contains each value.

**Lemma (simulation-promotion criterion).** Let $Q$ be a priority-theory claim whose variables are contained in $\mathcal{C}_{\mathrm{sim}}$, and let $R_1$ be a Tier 1 continuation of a Tier 0 candidate $R_0$. If $R_0$ satisfies the Tier 0 acceptance criteria, $R_1$ satisfies the Tier 1 acceptance criteria, the negative control fails as required, and
$$
\max_a\frac{\mathcal{E}_{\mathrm{ref},a}}{\tau_{\mathrm{ref},a}}\le 1,
\qquad
\max_a\frac{\mathcal{E}_{\mathrm{prov},a}}{\tau_{\mathrm{prov},a}}\le 1,
\qquad
\max_a\frac{\mathcal{E}_{\mathrm{cons},a}}{\tau_{\mathrm{cons},a}}\le 1
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c243717f0feffac2)
$$
\max_a\frac{\mathcal{R}_{\mathrm{branch},a}}{\tau_{\mathrm{branch},a}}\le 1,
\qquad
\max_Y\frac{E_\eta(Y)}{\tau_{\eta,Y}}\le 1
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-909e0ce8a28038e2)
with all tolerances declared before the run, then the result may be promoted from numerical candidate to simulation-supported priority claim for $Q$. This lemma does not convert a simulation-supported priority claim into an analytic theorem; it authorizes proof-program routing only with artifact hashes and the failure-code ledger attached.

In this lemma, $\mathcal E_{\mathrm{ref},a}$ are temporal, history, spatial, and integrator-parity refinement errors; $\mathcal E_{\mathrm{prov},a}$ are causal-root and transmitter-provenance errors; $\mathcal E_{\mathrm{cons},a}$ are declared conservation-ledger residuals; and $\mathcal R_{\mathrm{branch},a}$ are the owning branch protocol's residual components. Each $\tau_{\cdot,a}>0$ has the same units as its numerator and is frozen before execution.

## $A_0$ Branch-Certificate Protocol

The first mass-map target has a specialized protocol in [$A_0$ Branch Certificate Protocol](a0-branch-certificate-protocol.md), with Tier 0 row semantics summarized in [$A_0$ Tier 0 Result Interpretation](a0-tier0-result-interpretation.md). That protocol separates four stages:

1. Tier 0 algebraic branch search for finite root-ledger candidates.
2. Tier 1 $\eta > 0$ delayed-dynamics continuation and Floquet diagnostics.
3. Tier 2 internal-energy and shielding extraction.
4. Tier 3 Noether sea response tensor probes.

A rerun after a finite-coordinate no-go must include the predeclared branch-chart revision record; residual-selected coordinates, locked keys promoted into branch geometry, or benchmark-derived inputs invalidate the packet as hidden fitting.

After the compact scalar-basis no-go, an $A_0$ rerun must also predeclare the corrected one-period branch-equation basis, the non-circular carrier correction if used, the residual-balance ledger, held-out residual rule, and failure code before it can proceed to $\Delta_{\mathbf{k}}$ or $\eta$-ladder persistence.

No simulation run should report $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, or $\mathcal{M}_{\text{sea}}^{ab}$ as accepted outputs unless the preceding branch-certificate gates have passed.

## Cosmology Shared-Residual Protocol

The first cosmology-facing validation scaffold is [Cosmology Shared Residual Fit Protocol](cosmology-shared-residual-fit.md). It specializes the campaign-packet rule to the shared dark-energy and cosmology calibration gate. The packet tests whether SN, BAO, CMB, weak-lensing, redshift-space-distortion, BBN, and pre-BBN branch residuals can consume one $\theta_{\mathrm{sea}}$ without per-observable retuning.

No cosmology packet should report a promoted dark-energy, $H_0$, $S_8$, BBN, CMB, or growth closure unless its ordinary residuals and cross-family projection penalty are both inside declared tolerances.

## Public Gravitational-Wave Benchmark Protocol

A public gravitational-wave benchmark packet tests the effective gravitational-radiation limit against versioned open strain and parameter-estimation records. The packet is not evidence for a fundamental metric ripple in the Euclidean void. It is an observer-level validation object: the $\mathbb{A}\mathbb{A}\mathbb{A}$ simulation must predict detector strain, phase, event-ledger energy balance, and any photon/gravity timing residual through its Noether sea response map and then compare those predictions to public artifacts.

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
\big)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5890b528aec32323)
Here $\mathcal{D}$ names the detectors, $\mathcal{S}_h$ names the strain files, $\mathcal{P}_{\mathrm{PE}}$ names posterior-sample and parameter-estimation records, $\mathcal{P}_{\mathrm{wave}}$ names the waveform-family or numerical-relativity provenance, $\mathcal{Q}_{\mathrm{det}}$ carries calibration, data-quality, injection-mask, down-sampling, and glitch-treatment records, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event conservation ledger, $\mathcal{R}_{\mathrm{GW}}$ is the residual vector, and $\Pi_{\mathrm{wave}}$ maps each fitted or plotted sample back to public artifacts.

The residual vector is
$$
\mathcal{R}_{\mathrm{GW}}
=
\big(
R_h,R_\phi,R_E,R_J,R_{c_g},R_{\mathrm{det}},R_{\mathrm{PE}},R_{\mathrm{prov}}
\big)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-28eb7c6ab9d0959c)
$R_h$ compares whitened or otherwise declared detector strain on the predeclared analysis window; $R_\phi$ compares unwrapped inspiral-merger phase on the declared frequency band; $R_E$ checks source masses, remnant mass, radiated energy, recoil, ejecta or heat-channel terms, and boundary exchange in one conservation ledger; $R_J$ checks angular-momentum accounting when the packet claims spin or recoil closure; $R_{c_g}$ is used only for multimessenger timing rows; and the final three residuals are provenance-completeness checks.

For a multimessenger row,
$$
R_{c_g}
=
\frac{\Delta t_{\mathrm{eff,obs}}-\Delta t_{\mathrm{eff,src}}}{D_L/c_\gamma},
\qquad
\Delta t_{\mathrm{eff,obs}}=t_{\mathrm{eff},\gamma}-t_{\mathrm{eff,GW}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-fe7e80122ceb6452)
The intrinsic effective-chart source-emission delay $\Delta t_{\mathrm{eff,src}}$ must be declared before fitting the gravity-channel speed. A packet fails as hidden tuning if it absorbs photon/gravity timing into an undeclared source delay, changes the analysis band after inspecting residuals, substitutes a cleaned strain product without recording a new provenance row, or changes waveform family after comparing to the data.

The minimum artifact list is `event.json`, `strain_files.json`, `detector_quality.json`, `parameter_estimation.json`, `waveform_provenance.json`, `analysis_window.json`, `strain_residuals.csv`, `phase_residuals.csv`, `energy_ledger.csv`, `speed_residual.json` when applicable, `artifact_hashes.json`, and `failure_report.md`. For long binary-neutron-star inspirals the packet must also include a glitch/cleaning row, a low-frequency cutoff row, and a reason if any detector is excluded from a visible-strain comparison. For short binary-black-hole benchmarks the packet must include an inspiral-merger-ringdown window, detector arrival-time comparison, and ringdown handoff row.

The normalized public-data diagnostic is
$$
\mathcal{D}_{\mathrm{GW}}
=
\big(
D_h,D_\phi,D_E,D_{c_g},D_{\mathrm{det}},D_{\mathrm{PE}},D_{\mathrm{prov}}
\big)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a66d4ddde2fba4f7)
with
$$
D_h=\frac{R_h}{\tau_h},
\qquad
D_\phi=\frac{R_\phi}{\tau_\phi},
\qquad
D_E=\frac{R_E}{\tau_E},
\qquad
D_{c_g}=\frac{|R_{c_g}|}{\tau_{c_g}}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2b476af8027a70db)
$D_{\mathrm{det}}$, $D_{\mathrm{PE}}$, and $D_{\mathrm{prov}}$ are binary completeness ratios whose value is `0` only when detector masks/calibration, parameter-estimation release metadata, and artifact hashes are all present. A packet can support a promoted gravitational-wave claim only if
$$
\max_a\mathcal{D}_{\mathrm{GW},a}\le 1
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-9ca0778f323eaef8)
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

The minimum Tier 0 packet contains `campaign.json`, `mesh.json`, `state_vector.json`, `root_ledger.json`, `branch_residuals.json`, `candidate_rows.csv`, `failure_codes.md`, and `promotion_gate.md`. For corrected branch-equation reruns, `branch_residuals.json` must include the branch-native basis, predeclared coefficient rule, held-out residual rule, and pass/fail value for the residual-balance record. Corrected Master EOM branch reruns must also report same-record $D_t$, $D_r$, $D_r/D_t$, and $W^{\mathrm{acc}}$ records. A negative control must show that acceleration does not advance when $D_t$ or $W^{\mathrm{acc}}$ is absent or mismatched, while action and conserved-account claims do not advance when their required $D_r/D_t$ playback record is absent or mismatched. The minimum Tier 1 packet adds `run_metadata.json`, $\mathbb{U}_{\text{now}}$ provenance data, `history_interpolation.json`, `convergence_table.csv`, `eta_ladder.csv`, `conservation_ledger.csv`, `cross_integrator_report.md`, `negative_control_report.md`, `failure_report.md`, and `promotion_lemma_check.md`. A claim of numerical correctness also requires an `independent_reference_report.md` naming the closed form, theorem, analytically known case, or separately authored instrument used as the oracle. If a Tier 1 run claims a branch transition, it also emits `transition_records.json` with the status, regularization route, transition-window scale, root-ledger records, and promoted observables for each transition window.

The `cross_integrator_report.md` artifact must name the solver family, delayed interpolation polynomial or reconstruction rule, nonlinear solve residuals when implicit stages are used, small-delay or vanishing-delay encounters, and event or restart handling. Cross-integrator agreement is valid implementation-parity evidence only when branch identity and transition records match; it is not an independent correctness oracle.

A Tier 1 packet supports a proof or validation claim only when the branch residuals, convergence checks, provenance checks, conservation checks, regulator-dependence checks, and negative control all pass with tolerances declared before the run. If any promoted scalar, root count, branch label, stability gap, or tolerance is selected after inspecting output, the packet fails as hidden tuning.

## Runtime Instantiation

The [Master Simulation Protocol](#master-simulation-protocol-absolute-frame) is the single owner of absolute-frame, grid, Noether sea initialization, and campaign-packet requirements. A concrete run instantiates it by recording:

- fixed native chart coordinates $(X,Y,Z)$ and absolute time $T$ with step $\Delta T$;
- numerical wake-speed normalization $c_f=1$;
- the $\mathbb{U}_{\text{now}}$ sensor geometry, logged $\Phi$ and $\nabla_{\mathbf X}\Phi$ channels, and boundary conditions;
- authoritative transmitter-tagged worldline history, root identity, $T_t$, and the compatibility field `t_emit`;
- declared candidate Noether braid inventory and branch status only when Noether sea response is part of the run;
- integrator, interpolation rule, tolerances, history horizon, random seed when applicable, source commit, and artifact hashes.

A vacuum one- or two-architrino benchmark therefore uses the same coordinate and provenance protocol without loading a Noether braid lattice. Cross-integrator agreement remains an implementation-parity check; any correctness claim also needs the independent reference required by the campaign packet.
