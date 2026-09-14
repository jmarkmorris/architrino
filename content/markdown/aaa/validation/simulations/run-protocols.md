# Simulation Run Protocols

The mandatory runtime protocol standardizes the [absolute frame](../../foundations/constructing-the-absolute-frame.md)—fixed Euclidean coordinates governed by one universal time—together with logging requirements, provenance bookkeeping, metadata, and acceptance gates so that results from different simulations can be compared and audited coherently. The simulated objects are [architrinos](../../foundations/architrino.md), point transceivers of fixed polarity; each past position of an architrino emits a causal wake, an expanding disturbance that travels outward at the wake speed $c_f$, and a receiver is accelerated at a reception time only by the wakes that arrive exactly then, at the causal roots found by solving the delay condition of the [Master Equation](../../dynamics/master-equation.md) in stored history. A run therefore carries its own past: every acceleration depends on retained worldline history, and in the [self-hit](../../dynamics/master-equation.md#self-hit-condition) regime an architrino meets its own earlier wake. The protocol exists so that this history, and every root solved against it, is recorded well enough to be audited.

## Master Simulation Protocol (Absolute Frame)

1. **Coordinate Anchor**: All simulations run on a fixed Cartesian grid chosen as the coordinate scaffold for the Euclidean void. `Grid[x][y][z]` is a chart address, not an intrinsic label in the void. The grid is the chart and the sensor and cache scaffold; architrino worldlines are integrated as continuous paths in that chart and are not confined to grid nodes, and the authoritative record of a run is its retained worldline history, as [Architrino Simulation Tests](architrino.md#grid-based-history) requires.
2. **Clock Rate**: The simulator uses a global `Time` counter for absolute time $T$. No relativistic scaling is applied to the integration step itself: the step is not rescaled by the motion of any assembly or by an observer clock, because clock-rate effects are outputs read from assembly records against $T$, not inputs to the integration.
3. **$\mathbb{U}_{\text{now}}$ universe-state interface**: $\mathbb{U}_{\text{now}}\equiv S(T)$ is the complete state of the simulated universe on one absolute-time slice, including every architrino's position, velocity, polarity, and retained path history. Every run must instantiate an array of fixed virtual sensors to log $\Phi$ and $\nabla\Phi$ at declared absolute-frame grid addresses. The sensors read $\mathbb{U}_{\text{now}}$ directly and are simulation instruments, not physical observers. Here $\Phi$ is the mollified bookkeeping potential reconstructed from the superposed causal wakes of the run at its declared regularization width, and $\nabla\Phi$ is its spatial gradient; both are evaluation channels for comparison, while the substrate law remains the per-hit acceleration of the Master Equation.
4. **Noether sea Initialization**: A run that claims Noether sea response must declare its initialized braid inventory, branch status, and constitutive variables. A lattice of prescribed braid records is a model input, not evidence that those records form a retained Noether sea.
5. **Convergence**: $\Delta T$ refinement must be accompanied by history-resolution refinement: the time step and the history-sampling step are halved together, with the root residual and root-time tolerances tightened so that the certified root-time error stays below the reception step, while the retained-history horizon, the regulators, and the observation window are held fixed, in the order the [numerical recipe](action-energy/numerical-recipe-and-stability.md) prescribes. A delayed root is solved against stored transmitter history, so refining the step alone leaves the interpolation error of that history untouched, and a self-hit calculation whose emission-time error is not refined with the step cannot report a converged root. Joint refinement is a necessary condition for a convergence claim, checked by the ladders of [Convergence Tests](convergence-tests.md); it is not a stability guarantee for the chosen integrator.
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

[View →](../../../../../equation-mapping.html#corpus-equation-5f180b89feee6f9e)

Here $\mathsf{id}$ fixes the run identifier and source commit, $S_\eta$ is the state history of the run evolved at regularization width $\eta$, the subscript recording that width rather than any smoothing of the state itself, $\mathcal{G}_{\mathrm{mesh}}$ is the spatial and history mesh, $\Delta T$ is the absolute-time step, $\eta > 0$ is the causal-wake regularization width, $I_{\Delta H_{\mathrm{hist}}}^q$ is the declared order-$q$ history interpolation operator, which reconstructs stored transmitter history at any emission time from samples spaced $\Delta H_{\mathrm{hist}}$ apart using a polynomial of degree $q$, $\mathcal{L}_{\mathrm{root}}$ is the causal-root ledger, the record of which causal roots are active for each receiver, $\mathcal{T}_{\eta}$ is the transition-record family for fold-layer, separator, or active-root status windows, meaning reception windows in which a causal root is born, lost, or changes status, whether at a fold, where two causal roots meet at zero transmitter-side derivative, or at a separator crossing, where the branch chart's active-root ledger changes, $\mathcal{R}_{\mathrm{branch}}$ is the named branch-residual vector, $\Pi_{\mathbb{U}_{\text{now}}}$ is the provenance log, $\mathcal{E}_{\mathrm{conv}}$ is the convergence-measure vector, and $\mathcal{F}$ is the finite failure-code set.

When a campaign is used for a continuum, field-theory, or regulator-removal claim, it must also attach an extraction map: the regulated observables, test windows, volume or window trajectory when relevant, normalization and mixing rules, convergence topology, positivity or reconstruction condition when applicable, and the artifact hashes for the regulator ladder. If independent methods or benchmarks are used, the packet must expose their normalization conventions and error envelopes before comparing coordinates. These fields tell reviewers exactly what is claimed to survive the finite run and what remains only a regulator-level diagnostic.

For a QFT-like reconstruction claim, the campaign must also state the presentation being targeted, such as Wightman data, Osterwalder-Schrader data, a local observable net, or a weaker named comparison; the first two name theorems that recover a quantum field theory from correlation functions satisfying a stated list of conditions, and [Convergence Tests](convergence-tests.md#machine-checkable-convergence-output) lists the package such a claim must borrow. The packet must then list the hypotheses required by that presentation rather than using generic terms such as `continuum field` or `reconstructed field`.

The state history is
$$
S_\eta(T)
=
\{(\mathbf X_i(T),\mathbf V_i(T),q_i)\}_{i=1}^{N},
\qquad
S_{\eta,T}(\theta)=S_\eta(T+\theta),\quad \theta\in[-H_{\mathrm{hist}},0]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2fcf7a56df428c35)

Here $S_\eta(T)$ collects the position $\mathbf X_i(T)$, velocity $\mathbf V_i(T)$, and polarity $q_i$ of each of the $N$ architrinos, and $S_{\eta,T}$ is the history segment that the delayed problem needs at time $T$: the same state read back over the retained interval of length $H_{\mathrm{hist}}$ behind $T$. Tier 0 and Tier 1 name the first two stages of the [$A_0$ Branch Certificate Protocol](a0-branch-certificate-protocol.md): a Tier 0 packet records a reduced algebraic branch search that emits candidate rows, and a Tier 1 packet records a delayed-dynamics continuation run at $\eta>0$. A Tier 1 packet must state whether this history is evaluated in $C^1([-H_{\mathrm{hist}},0])$, $W^{1,\infty}([-H_{\mathrm{hist}},0])$, or a stricter history class. These classes refer to the position component, with velocity recorded consistently as its derivative and polarity fixed. The current EOM history contract requires continuously evaluable position and velocity: a $C^1$ position history supplies this. A generalized $W^{1,\infty}$ position history has only an almost-everywhere bounded derivative; it does not by itself specify velocity at every emission time or guarantee one-sided limits. Such a protocol must additionally declare a pointwise velocity representative, its admissible event set, one-sided values where they exist, and treatment or rejection of unresolved derivative evaluations. It remains a conditional extension, not current EOM acceptance. Applying $W^{1,\infty}$ to the full $(\mathbf X,\mathbf V,q)$ state would instead require the velocity component itself to be Lipschitz. The class matters because the transmitter-side factor $D_t=c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)$ at a causal root is evaluated from the velocity at the emission time: on the continuous-velocity class it has one value at every root; a root at a declared velocity discontinuity requires the separate event rule and cannot use an unspecified sharp value. Here $H_{\mathrm{hist}}>0$ is the retained-history horizon; it is distinct from the observer-level Planck benchmark $h$. A missing history class is an incomplete artifact, because the delayed transmitter-state evaluation cannot be audited without it.

The mesh and interpolation record is
$$
\mathcal{G}_{\mathrm{mesh}}=(\Omega_{\mathrm{sim}},\Delta X,\{\mathbf X_k\}_{k=1}^{K},\Theta_{\mathrm{hist}},\Delta H_{\mathrm{hist}},\mathsf{bc})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f8987fe2240989d2)

where $\Omega_{\mathrm{sim}}\subset\mathbb{R}^3$ is the Euclidean-void computational domain, $\Delta X$ is the spacing of the fixed Cartesian grid, $\{\mathbf X_k\}$ are the fixed $\mathbb{U}_{\text{now}}$ sample points, $\Theta_{\mathrm{hist}}\subset[-H_{\mathrm{hist}},0]$ is the stored path-history mesh, $\Delta H_{\mathrm{hist}}$ is the history resolution, and $\mathsf{bc}$ records boundary conditions. The interpolation operator $I_{\Delta H_{\mathrm{hist}}}^q$ is part of the packet; delayed transmitter states cannot be reconstructed by an implicit or undocumented lookup rule.

The path-history part of $\mathcal{G}_{\mathrm{mesh}}$ and $\Pi_{\mathbb{U}_{\text{now}}}$ should distinguish authoritative kinematic segments from attached audit rows. Authoritative segments reconstruct $\mathbf X_i(T)$ and $\mathbf V_i(T)$ over declared intervals with error bounds. Causal-root rows, delayed transmitter-state rows, assembly-membership intervals, reaction-event references, and display projections attach to those segments by identifier and time range. Chunking, compression, and broad-phase indices are allowed as storage or acceleration layers; they do not replace authoritative replay when a promoted claim depends on provenance.

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

[View →](../../../../../equation-mapping.html#corpus-equation-e6033146454ef60f)

where every component is a ratio with passing threshold $1$: each residual is divided by the tolerance declared for it before the run, so that a value at or below $1$ passes. The refinement, history, spatial, cross-integrator, and provenance components are built from the comparison metrics $E_{\mathrm{rel}}$, $D_W$, $D_{JS}$, and $E_{\mathrm{hist}}$ of [Convergence Tests](convergence-tests.md#comparison-metrics-required) divided by their declared thresholds. The observed-order gate is the one component whose raw quantity must be large rather than small; for an applicable smooth-window check, first require the observed order $p_{\mathrm{obs}}$ to be finite and strictly positive, then divide the required order by it. A zero, negative or nonfinite observed order fails and is assigned a diagnostic above $1$ without forming the quotient. An order estimate whose differences are below the error floor is unresolved, not a pass. A nonsmooth transition window is explicitly marked inapplicable for this estimate and must pass its declared transition diagnostic instead; it may not silently remove an applicable order check. The conservation gate uses the drifts constructed as in [Delay Dynamics Energy](action-energy/delay-dynamics-energy.md) with the same regulator, retained branches, and window-boundary account as the motion. The component meanings are:

| Component | Required role |
| --- | --- |
| $D_{\mathrm{branch}}$ | largest branch residual divided by its declared tolerance |
| $D_{\mathrm{ref}}$ | temporal refinement residual for $\Phi$, $\|\nabla\Phi\|$, and time-averaged self-root multiplicity |
| $D_{\mathrm{ord}}$ | observed-order gate for the retained primary potential channel, $\Phi$ or $\|\nabla\Phi\|$ |
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

[View →](../../../../../equation-mapping.html#corpus-equation-d554ab86f5f9ce0f)

$$
\Delta_{\mathrm{root}}(\Delta H_{\mathrm{hist}},\Delta H_{\mathrm{hist}}/2)=0,
\quad
\Delta_{\eta,\mathrm{root}}=0,
\quad
\mathsf{NullFail}=1,
\quad
\mathsf{Artifacts}=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0e40a08d19729731)

Here $R_0\in\mathsf{Candidate}_1$ means the Tier 0 packet carries the declared value `failure_code: "candidate"` in its `failure_codes.md` and passes its `tier0_continuation` gate, which is the Tier 0 pass condition of the [$A_0$ Branch Certificate Protocol](a0-branch-certificate-protocol.md): at least one candidate row with a finite causal-root ledger, nondegenerate quotient coordinates, retained scale separation, correct speed ordering, bounded carrier residuals, no unclassified separator term, and a complete residual surface. For two runs $A,B$, $\Delta_{\mathrm{root}}(A,B)$ is the number of unmatched active-root records after matching receiver, transmitter, root class, branch label, and transition status, the comparison being made on the coarser run's reception samples with the finer run restricted to that grid, as the comparison metrics of Convergence Tests restrict a finer run. The regulator version $\Delta_{\eta,\mathrm{root}}$ applies the same matching rule between adjacent $\eta$ values. Thus a zero value means identity-preserving root agreement, not merely equal root counts; a root whose status changes inside the window is compared through its transition record and the jump component $D_{\mathrm{jump}}$, not by demanding that its birth or loss fall on the same sample in both runs. Finally, $\mathsf{NullFail}=1$ means the negative control violates at least one required null-test margin, and $\mathsf{Artifacts}=1$ means every required artifact exists with a content hash and source commit.

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

[View →](../../../../../equation-mapping.html#corpus-equation-b00aeecb82963742)

It names the source certificate, initial history $S_{\eta,0}$, analysis window $W$, branch label $\Lambda$, expected active-root classes, branch tolerances $\tau_{\mathrm{branch}}$, convergence tolerances $\tau_{\mathrm{conv}}$, regulator-dependence tolerances $\tau_{\eta}$, one tolerance $\tau_{\eta,Y}$ for each promoted observable $Y$ compared across the declared regulator ladder, negative-control mutation, and required output channels before the run starts.

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

[View →](../../../../../equation-mapping.html#corpus-equation-88f09a895086b857)

A proof packet may cite a simulation only through this handoff. It must state whether every expected active root was matched under $\Delta T$, $\Delta H_{\mathrm{hist}}$, and $\eta$ refinement, which residual component controls the verdict, and which artifact contains each value.

**Lemma (simulation-promotion criterion).** Let $Q$ be a theory claim whose variables are contained in $\mathcal{C}_{\mathrm{sim}}$, and let $R_1$ be a Tier 1 continuation of a Tier 0 candidate $R_0$. If $R_0$ satisfies the Tier 0 acceptance criteria, $R_1$ satisfies the Tier 1 acceptance criteria, the negative control fails as required, and
$$
\max_a\frac{\mathcal{E}_{\mathrm{ref},a}}{\tau_{\mathrm{ref},a}}\le 1,
\qquad
\max_a\frac{\mathcal{E}_{\mathrm{prov},a}}{\tau_{\mathrm{prov},a}}\le 1,
\qquad
\max_a\frac{\mathcal{E}_{\mathrm{cons},a}}{\tau_{\mathrm{cons},a}}\le 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c243717f0feffac2)

$$
\max_a\frac{\mathcal{R}_{\mathrm{branch},a}}{\tau_{\mathrm{branch},a}}\le 1,
\qquad
\max_Y\frac{E_\eta(Y)}{\tau_{\eta,Y}}\le 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-909e0ce8a28038e2)

with all tolerances declared before the run, then the result may be promoted from numerical candidate to simulation-supported claim for $Q$. This lemma does not convert a simulation-supported claim into an analytic theorem; it authorizes the claim to enter a proof program only with artifact hashes and the failure-code ledger attached.

In this lemma, $\mathcal E_{\mathrm{ref},a}$ are temporal, history, spatial, and integrator-parity refinement errors; $\mathcal E_{\mathrm{prov},a}$ are causal-root and transmitter-provenance errors; $\mathcal E_{\mathrm{cons},a}$ are declared conservation-ledger residuals; $\mathcal R_{\mathrm{branch},a}$ are the owning branch protocol's residual components; and $E_\eta(Y)$ is the regulator-dependence error of the promoted observable $Y$ between adjacent rungs of the regulator ladder, defined in [Convergence Tests](convergence-tests.md#machine-checkable-convergence-output). Each $\tau_{\cdot,a}>0$ has the same units as its numerator and is frozen before execution.

Every hypothesis of the lemma compares the instrument with itself: the refinement, integrator-parity, provenance, conservation, and regulator conditions all test runs of the same code against one another, and the negative control tests only that the pipeline can fail. A pass therefore establishes that the declared observables are stable under refinement on the window and consistent with the packet's own ledgers; an error shared by every run, such as a wrong kernel or a root missed at every resolution, survives every hypothesis unchanged. Simulation-supported means exactly this refinement-stable, self-consistent support. A claim that the computed result is correct additionally requires the independent reference named in the packet's `independent_reference_report.md`: a closed form, a theorem, an analytically known case such as the fixed-center solutions in [Analytic Baselines](action-energy/analytic-baselines.md), or an instrument authored separately from the run, as the [global acceptance rule](convergence-tests.md#global-acceptance-rule) of Convergence Tests and the [numerical recipe](action-energy/numerical-recipe-and-stability.md) require.

## $A_0$ Branch-Certificate Protocol

The first target of the mass map, the program in [Particle Masses](../../assemblies/particle-masses.md) that seeks to derive what an observer calls mass from a stable assembly's retained internal history and its coupling to the surrounding Noether sea, has a specialized protocol in [$A_0$ Branch Certificate Protocol](a0-branch-certificate-protocol.md), with Tier 0 row semantics summarized in [$A_0$ Tier 0 Result Interpretation](a0-tier0-result-interpretation.md). That protocol separates four stages:

1. Tier 0 algebraic branch search for finite root-ledger candidates.
2. Tier 1 $\eta > 0$ delayed-dynamics continuation and Floquet diagnostics, meaning the multipliers of the return map of small perturbations over one candidate period, which remain sensitivity diagnostics of an approximate periodic history until its existence and approximation error are controlled.
3. Tier 2 internal-energy and shielding extraction.
4. Tier 3 Noether sea response tensor probes.

A rerun after a finite-coordinate no-go must include the predeclared branch-chart revision record; residual-selected coordinates, locked keys promoted into branch geometry, or benchmark-derived inputs invalidate the packet as hidden fitting.

After the compact scalar-basis no-go, an $A_0$ rerun must also predeclare the corrected one-period branch-equation basis, the non-circular carrier correction if used, the residual-balance ledger, held-out residual rule, and failure code before it can proceed to the Floquet gap $\Delta_{\mathbf{k}}$ or $\eta$-ladder persistence.

No simulation run should report the far-field shielding factor $\zeta(A_0)$, the internal energy $E_{\text{internal}}(A_0)$, or the Noether sea response tensor $\mathcal{M}_{\text{sea}}^{ab}$ as accepted outputs unless the preceding branch-certificate gates have passed.

## Cosmology Shared-Residual Protocol

The first cosmology-facing validation scaffold is [Cosmology Shared Residual Fit Protocol](cosmology-shared-residual-fit.md). It specializes the campaign-packet rule to the shared dark-energy and cosmology calibration gate. The packet tests whether the residuals of the observational families, supernova distances (SN), baryon acoustic oscillations (BAO), the cosmic microwave background (CMB), weak lensing, redshift-space distortion, big-bang nucleosynthesis (BBN), and the pre-BBN branch, can consume one $\theta_{\mathrm{sea}}$, the shared Noether sea state record projected into each family, without per-observable retuning. Each family is an observer-level data product against which the recovered effective description is compared; none enters the substrate dynamics as a premise.

No cosmology packet should report a promoted dark-energy, $H_0$, $S_8$, BBN, CMB, or growth closure, where $H_0$ is the present expansion rate and $S_8$ the amplitude of matter clustering as inferred in the effective chart, unless its ordinary residuals and cross-family projection penalty, the cost of projecting one shared record into every family at once, are both inside declared tolerances.

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

[View →](../../../../../equation-mapping.html#corpus-equation-5890b528aec32323)

Here $\mathcal{D}$ names the detectors, $\mathcal{S}_h$ names the strain files, $\mathcal{P}_{\mathrm{PE}}$ names posterior-sample and parameter-estimation records, $\mathcal{P}_{\mathrm{wave}}$ names the waveform-family or numerical-relativity provenance, $\mathcal{Q}_{\mathrm{det}}$ carries calibration, data-quality, injection-mask, down-sampling, and glitch-treatment records, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event conservation ledger, $\mathcal{R}_{\mathrm{GW}}$ is the residual vector, and $\Pi_{\mathrm{wave}}$ maps each fitted or plotted sample back to public artifacts.

The residual vector is
$$
\mathcal{R}_{\mathrm{GW}}
=
\big(
R_h,R_\phi,R_E,R_J,R_{c_g},R_{\mathrm{det}},R_{\mathrm{PE}},R_{\mathrm{prov}}
\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-28eb7c6ab9d0959c)

$R_h$ compares whitened or otherwise declared detector strain on the predeclared analysis window; $R_\phi$ compares unwrapped inspiral-merger phase on the declared frequency band; $R_E$ checks source masses, remnant mass, radiated energy, recoil, ejecta or heat-channel terms, and boundary exchange in one conservation ledger; $R_J$ checks angular-momentum accounting when the packet claims spin or recoil closure; $R_{c_g}$ is used only for multimessenger timing rows, its subscript labeling the gravitational-wave transport speed written $c_{\mathrm{GW}}$ elsewhere in the corpus; and the final three residuals are provenance-completeness checks.

For a multimessenger row,
$$
R_{c_g}
=
\frac{\Delta t_{\mathrm{eff,obs}}-\Delta t_{\mathrm{eff,src}}}{T_{\mathrm{prop}}},
\qquad
\Delta t_{\mathrm{eff,obs}}=t_{\mathrm{eff},\gamma}-t_{\mathrm{eff,GW}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fe7e80122ceb6452)

Here $t_{\mathrm{eff},\gamma}$ and $t_{\mathrm{eff,GW}}$ are arrival times in the detector's effective observer chart. The intrinsic lag $\Delta t_{\mathrm{eff,src}}$ is the source-emission lag propagated into that same detector-clock comparison, including any redshift or clock conversion; it is declared before fitting the gravity-channel speed. The positive normalization $T_{\mathrm{prop}}$ is the calibrated transport-time sensitivity of the declared path model to its fractional speed parameter $\delta_{\mathrm{GW}}$. Specifically, $T_{\mathrm{prop}}=\left.\partial_{\delta_{\mathrm{GW}}}(t_{\mathrm{eff},\gamma}-t_{\mathrm{eff,GW}})\right|_{\delta_{\mathrm{GW}}=0}$ at fixed intrinsic lag. The zero-mismatch model must reproduce the declared intrinsic-lag contribution; any additional baseline propagation offset is modeled and subtracted explicitly before this residual is used. The packet supplies a bound on the higher-order remainder. Then $R_{c_g}$ estimates $\delta_{\mathrm{GW}}$ to first order on that model. For a static common path of length $D$ with constant speeds, $\delta_{\mathrm{GW}}=(c_{\mathrm{GW}}-c_\gamma)/c_\gamma$, $T_{\mathrm{prop}}=D/c_\gamma$, and the exact normalized propagation delay is $\delta_{\mathrm{GW}}/(1+\delta_{\mathrm{GW}})$. In an evolving medium or cosmological chart, the path integral and parameterization must instead supply the sensitivity; luminosity distance $D_L$ is a flux-distance datum and $D_L/c_\gamma$ is not generally a travel time. A static or low-redshift approximation requires an error budget before comparison with the speed bounds in [Gravitational Waves](../../spacetime/gravitational-waves.md). A packet fails as hidden tuning if it absorbs photon/gravity timing into an undeclared source delay, changes the analysis band after inspecting residuals, substitutes a cleaned strain product without recording a new provenance row, or changes waveform family after comparing to the data.

The minimum artifact list is `event.json`, `strain_files.json`, `detector_quality.json`, `parameter_estimation.json`, `waveform_provenance.json`, `analysis_window.json`, `strain_residuals.csv`, `phase_residuals.csv`, `energy_ledger.csv`, `speed_residual.json` when applicable, `artifact_hashes.json`, and `failure_report.md`. For long binary-neutron-star inspirals the packet must also include a glitch/cleaning row, a low-frequency cutoff row, and a reason if any detector is excluded from a visible-strain comparison. For short binary-black-hole benchmarks the packet must include an inspiral-merger-ringdown window, detector arrival-time comparison, and ringdown handoff row.

The normalized public-data diagnostic is
$$
\mathcal{D}_{\mathrm{GW}}
=
\big(
D_h,D_\phi,D_E,D_J,D_{c_g},D_{\mathrm{det}},D_{\mathrm{PE}},D_{\mathrm{prov}}
\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a66d4ddde2fba4f7)

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

[View →](../../../../../equation-mapping.html#corpus-equation-2b476af8027a70db)

Here $\tau_h$, $\tau_\phi$, $\tau_E$, and $\tau_{c_g}$ are positive tolerances declared for the four residuals before the comparison. A packet claiming spin or recoil closure also includes $D_J=|R_J|/\tau_J$ with a positive predeclared angular-momentum tolerance $\tau_J$; otherwise $D_J$ is marked inapplicable and excluded explicitly from the maximum. Missing or nonfinite required residuals fail rather than receiving zero. The strain, phase and energy residuals are nonnegative norms or absolute balance defects in their declared units. $D_{\mathrm{det}}$, $D_{\mathrm{PE}}$, and $D_{\mathrm{prov}}$ are binary completeness ratios whose value is `0` only when detector masks/calibration, parameter-estimation release metadata, and artifact hashes are all present, and whose value exceeds $1$ otherwise, so that a missing item fails the maximum rule below rather than passing it at the threshold. A packet can support a promoted gravitational-wave claim only if
$$
\max_a\mathcal{D}_{\mathrm{GW},a}\le 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9ca0778f323eaef8)

and the public-data provenance row was fixed before waveform comparison.

The first benchmark triad is:

| Packet row | Required public-data role | Failure routed if missing |
| --- | --- | --- |
| `GW150914_short_bbh` | Short inspiral-merger-ringdown strain, two-detector arrival timing, radiated-energy ledger, numerical-relativity waveform provenance, and ringdown handoff | $\mathsf{artifact\_incomplete}$ or $\mathsf{hidden\_tuning}$ |
| `GW170817_long_bns` | Long inspiral strain, three-detector timing, glitch/cleaning provenance, chirp-mass phase benchmark, and parameter-estimation waveform-family record | $\mathsf{provenance\_discontinuity}$ or $\mathsf{mesh\_nonconvergence}$ |
| `GW170817_GRB_speed` | Photon/gravity timing residual with calibrated transport-time sensitivity, distance convention, observed delay, and observer-clock source-lag nuisance | $\mathsf{hidden\_tuning}$ or $\mathsf{conservation\_drift}$ |

This public benchmark packet is a success marker under the existing simulation provenance and conservation gates, not a new gate family. Its value is that public strain, parameter-estimation samples, waveform provenance, and multimessenger timing make strong-field radiation tests replayable without importing the success of general-relativistic (GR) waveform templates, the numerically solved GR predictions against which the public parameter estimates were made, as $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology. Those templates are comparison material at the observer level; the $\mathbb{A}\mathbb{A}\mathbb{A}$ prediction must come from the Noether sea response map, and the effective gravitational-radiation description is a recovery target rather than a premise.

## Tier 0 / Tier 1 Campaign Packet

Tier 0 and Tier 1 results are accepted only through an auditable campaign packet. The packet must include the source commit, pre-run tolerances, root ledger, branch residual vector, convergence table, $\eta$ ladder when a regulator claim is made, declared history interpolation, failure report, and artifact hashes. When a run crosses a fold-layer, separator, or active-root status transition, the packet must also include transition records for that window.

The minimum Tier 0 packet contains `campaign.json`, `mesh.json`, `state_vector.json`, `root_ledger.json`, `branch_residuals.json`, `candidate_rows.csv`, `failure_codes.md`, and `promotion_gate.md`. For corrected branch-equation reruns, `branch_residuals.json` must include the branch-native basis, predeclared coefficient rule, held-out residual rule, and pass/fail value for the residual-balance record. Corrected Master EOM branch reruns must also report same-record $D_t$, $D_r$, $D_r/D_t$, and $W^{\mathrm{acc}}$ records: the transmitter-side factor $D_t=c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)$, the receiver-side factor $D_r=c_f-\hat{\mathbf r}_t\cdot\mathbf V_r(T_r)$, the signed root-playback derivative $dT_t/dT_r=D_r/D_t$, and the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/|D_t|$ of the [Master Equation](../../dynamics/master-equation.md#the-master-equation-canonical-form), each evaluated on the same root record. A negative control must show that an acceleration claim is not advanced when $D_t$ or $W^{\mathrm{acc}}$ is absent or mismatched, while action and conserved-account claims are not advanced when their required $D_r/D_t$ playback record is absent or mismatched. The minimum Tier 1 packet adds `run_metadata.json`, $\mathbb{U}_{\text{now}}$ provenance data, `history_interpolation.json`, `convergence_table.csv` with the rows that [Convergence Tests](convergence-tests.md#machine-checkable-convergence-output) require, `eta_ladder.csv`, `conservation_ledger.csv`, `cross_integrator_report.md`, `negative_control_report.md`, `failure_report.md`, and `promotion_lemma_check.md`. A claim of numerical correctness also requires an `independent_reference_report.md` naming the closed form, theorem, analytically known case, or separately authored instrument used as the oracle. If a Tier 1 run claims a branch transition, it also emits `transition_records.json` with the status, regularization route, transition-window scale, root-ledger records, and promoted observables for each transition window.

The `cross_integrator_report.md` artifact must name the solver family, delayed interpolation polynomial or reconstruction rule, nonlinear solve residuals when implicit stages are used, small-delay or vanishing-delay encounters, and event or restart handling. Cross-integrator agreement is valid implementation-parity evidence only when branch identity and transition records match; it is not an independent correctness oracle.

A Tier 1 packet supports a proof or validation claim only when the branch residuals, convergence checks, provenance checks, conservation checks, regulator-dependence checks, and negative control all pass with tolerances declared before the run. If any promoted scalar, root count, branch label, stability gap, or tolerance is selected after inspecting output, the packet fails as hidden tuning.

## Runtime Instantiation

The [Master Simulation Protocol](#master-simulation-protocol-absolute-frame) is the single owner of absolute-frame, grid, Noether sea initialization, and campaign-packet requirements. A concrete run instantiates it by recording:

- fixed native chart coordinates $(X,Y,Z)$ and absolute time $T$ with step $\Delta T$;
- numerical wake-speed normalization $c_f=1$;
- the $\mathbb{U}_{\text{now}}$ sensor geometry, logged $\Phi$ and $\nabla_{\mathbf X}\Phi$ channels, and boundary conditions;
- authoritative transmitter-tagged worldline history, root identity with the transmitter identity recorded as `transmitter_id`, the emission time $T_t$ of each admitted root, and the compatibility field `t_emit`, which stores that same emission time under its legacy name;
- declared candidate Noether braid inventory and branch status only when Noether sea response is part of the run;
- integrator, interpolation rule, tolerances, history horizon, random seed when applicable, source commit, and artifact hashes.

A one- or two-architrino benchmark in an otherwise empty Euclidean void therefore uses the same coordinate and provenance protocol without loading a Noether braid lattice. Cross-integrator agreement remains an implementation-parity check; any correctness claim also needs the independent reference required by the campaign packet.
