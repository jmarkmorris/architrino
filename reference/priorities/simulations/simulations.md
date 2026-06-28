# Simulations, Regularization, and Noether Braid Numerics

## Workstream Metadata

- Kind: `priority`
- Rank: `2`
- Value: `24.88`
- Cost: `4.1`
- ROI: `6.07`
- Status: `active`

## Task Queue

1. `tier0_tier1_runs` — The $A_0$ self-root fold/splitting diagnostic now classifies all ready rows as `fold-layer`; the step-fraction controller, event-local fold-layer lock, and macro-stride packet brought the compact fixture under the $10^6$ attempt cap with `963815` retained steps. The May 18, 2026 direct fold-layer-locked one-period runner executed that plan without trajectory abort, preserved the two locked self-root keys in $\mathcal{R}_{\text{lock}}$, and failed closed on state return, root closure, phase closure, speed ordering, center drift, and energy-like speed closure. The new residual-balance ledger shows scalar branch-native relation weights over $B_{\text{self}}$, $B_{\text{partner}}$, and $B_{\text{inter}}$ leave relative acceleration residual about `0.755` against tolerance `0.02`. A May 22, 2026 regenerated corrected one-period packet reproduced the same boundary: default chart policy blocked as `blocked_chart_mode_dominated`; `--omit-modes none` emitted `correction_packet_ready` and `waveform_replay_ready`; the corrected run completed `963815` steps with center drift passing, but still failed closed with state-return residual `0.941735939861014`, root residual `40.11726413905969` against tolerance `0.000001`, phase residual `0.2805922799292434`, speed-ordering residual `1.5917288827774456`, energy-like speed residual `0.8721694814657742`, refined-basis residual `0.4262791208762879`, and I-phase-bin residual `0.3500173344435869`. The pre-rerun branch-chart checker rejects residual-surface splits as hidden fitting; the supported predeclared source declarations `prefit_branch_chart`, `active_roots`, `root_times`, and `corrected_carrier_state` all pass the source declaration guard but fail the held-out residual with `R_xval = 2.4537879974811028`. A low-degree scan over one-, two-, and three-mode subsets of modes `1..7` also fails, with best simple row mode `6` still at held-out residual about `1.094`. The runner now emits a root-transport source record with `512` root rows and `128` retained `I`-receiver inter-layer single-artifact transport slots for the first $J$ / delay shear coordinate. The source-declared coordinate-specific checker passes source, coordinate-construction, and degrees-of-freedom guards, but fails holdout with `R_xval = 1.712369148202459`; diagnostic signed-polarity and mixed M-Jacobian quotients are not source-declared and also fail held-out residual at `1.6156063295193552` and `1.944813346261963`. The root-transport feature-span scanner now tests eight fixed branch-geometric feature families over the same source record and still returns `root_transport_feature_span_no_go`: the best source-declared family is `source_layer_shear` at `1.712369148202459`, and the best diagnostic-only family is `source_layer_DJ_Dtau_no_phase_projection` at `1.2474273873652615`. A residual-spectrum diagnostic over the same sampled forcing reports `I`-layer residual norm `313.09723758998507`, dominant total cyclic mode `6` at energy fraction `0.20679763310995922`, and modes `4..7` carrying about `0.7552232385377363` of the one-sided cyclic energy. A mode-band source-eligibility diagnostic then finds lawful pre-fit source-direction evidence in reciprocal inter-layer transport and corrected-carrier motion: `transport:M:inter_layer:I:mean_D_J` has mode-band fraction `0.9944893706413693`, and `body:I:rel_vel:x` has `0.9353099187288153`. The reciprocal inter-layer branch-equation checker tests the smallest lawful version of that lead with three source channels projected along normalized `I` relative velocity; it passes degrees-of-freedom controls but fails held-out residual with maximum relative residual `1.4057625588588099`, so the source-direction evidence is not rerun authority. The carrier-frame residual spectrum then localizes the same target as primarily radial in the corrected `I` frame under declared linear time alignment, with radial energy fraction `0.5823726218116948` and radial mode-band fraction `0.7984257865887138`. The direct carrier-frame branch-coordinate checker then rules out the smallest source-side deformation ladder: `delta_radius * e_I,r` has maximum held-out residual `1.0492394121933206`, and radial-rate or radial/tangential companions worsen holdout to `1.5341171039338615` or `1.6498611276202226`. The reciprocal carrier-frame projection checker also rules out the remaining same-source projection ladder: radial, tangential, and radial/tangential reciprocal projections all pass degrees-of-freedom controls but fail held-out residual, with best held-out variant `tangential` still at `1.0546122909019986`. The root-loop branch-coordinate checker rules out the immediate two-edge active-root delay/J holonomy coordinate: all checked families fail held-out residual, with best row `tangential/im_loop_curl` still at `1.705996205813595`. The delayed source-direction branch-coordinate checker then rules out the root-specific line-of-action coordinate in the corrected `I` carrier frame: the receiver-polarity-signed `im_delayed_direction` row has the best held-out residual at `1.0408163198841647`, still about `52.0` times tolerance. The same root-transport path now keeps $R_{\mathrm{transport}}$ pending unless `transport_identity_refinement_stable`, `phase_origin_covariance_certified`, and raw-row root-ledger stability are true; the current identity-form source remains `root-transport-identity-not-refinement-stable`. The new `a0-root-transport-refinement-certificate/v1` script can compare two source records by root key and cyclic order without using `transport_id`, and can verify quotient-feature bucket covariance after cyclic reindexing only when the phase shift is declared; auto-detected shifts are diagnostic-only. A May 22, 2026 sidecar, `a0-root-transport-phase-origin-variant/v1`, now re-emits a declared bucket-shift variant from the raw `active_causal_root_ledger` rather than by copying the prior source record. Its first production-shaped pair passes the declared shift-`1` certificate with `matched_root_count = 512`, `feature_bucket_count = 16`, and `max_feature_relative_delta = 6.516707155123344e-15`, while the auto-shift run remains diagnostic-only. The checker now consumes that certificate through `--root-transport-certificate`. A separate `a0-root-ledger-refinement-stability-certificate/v1` discriminator compares `active_causal_root_ledger` rows directly, rejects the same phase-origin sidecar as `phase-origin-variant-not-root-ledger-refinement`, and now consumes a carrier-replay continuation source as non-phase-origin certificate-only root-ledger evidence with `matched_root_count = 512`, `max_field_relative_delta = 4.976849768509301e-7`, and `carrier-root-refinement-J-drift-reported`. Certificate-only root-ledger evidence is reported but is not corrected-rerun authority while the source row still says `root_ledger_stable_under_refinement = false`. The source-declared root-transport coordinate, reciprocal branch-equation, reciprocal carrier-frame projection ladder, root-loop branch-coordinate, delayed source-direction branch-coordinate, and corrected-carrier radial deformation ladder all fail held-out residual, $R_{\mathrm{transport}}$ remains pending, and no corrected rerun is authorized. Current boundary: branch-chart revision checker and anti-overfit coordinate tests may advance as pre-rerun simulation work, but no corrected $A_0$ branch may be promoted as accepted physics until `master-equation-closure` supplies the matching dynamics/branch-chart basis. $\Delta_k$ and eta-ladder persistence remain downstream until corrected one-period residuals pass. Status: `active`. Depends on: none for fail-closed checker work; accepted-branch promotion depends on the matching `master-equation-closure` branch-chart basis.
2. `field_speed_action_self_hit_scan` — Run the binary-delay approach-to-$c_f$ scan on the same branch rows used for the nested shell braid action-increment packet. Each row must report causal-root multiplicity, active-root identity, minimum accepted Jacobian floor, branch-selection verdict, particle-plus-wake energy functional value and drift under refinement, delayed-Noether status (`action-derived`, `quasi-Noether`, or `diagnostic-only`), stable-cycle action-increment cluster, and failure code while the branch approaches $c_f$ from below, at the boundary, and from any admitted super-field-speed interval. The scan is the first executable test of the action-spacing and self-hit well-posedness walls: no `candidate_h_recovery` promotion is allowed if root identity changes under refinement, the Jacobian floor collapses, the particle-plus-wake energy row is unbounded or nonconvergent, the Noether status remains `diagnostic-only`, stable increments split without a derived branch-class reason, or the v0 source row cannot bind to a named action-increment row with matching root-ledger and conservation-pullback hashes. Status: `source_row_binding_open; fixture_shape_only_packet_not_source`; execution and artifact hashes remain pending. Depends on: `tier0_tier1_runs`, `eta_positive_package`, and the nested shell braid action-increment protocol.
3. `convergence_and_provenance` — Publish convergence plots and $\mathbb{U}_{\text{now}}$ provenance logs. Status: `pending`. Depends on: `tier0_tier1_runs`.
4. `eta_positive_package` — Consolidate the formal $\eta > 0$ existence and continuation package. Status: `pending`. Depends on: `tier0_tier1_runs`.
5. `hydrogen_gamma_n_record_extraction` — The hydrogen $\Gamma_N$ spectral coefficient-row scan now derives $\Lambda_{ab}$, observer frequency, and replay envelope gap entries from recovered principal labels, `frequency_scale`, and `line_inferred_ln_Gamma_N`; the remaining proof/simulation burden is to derive or bound $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ from the same hydrogen spectral channel ledger, replace the scaffolded static response vector only with a constitutive response row for the same Noether sea cell, and replace the shared line-inferred cadence stretch only with electron-envelope gaps from the hydrogen branch. A May 22, 2026 inspection found no declared native $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ artifact in scope, so no scaffold input is safe to replace yet. Residual recoil, hyperfine structure, photon-channel propagation, and source-branch effects must remain outside $\Gamma_N$ unless a declared residual budget carries them. Status: `pending`. Depends on: `hydrogen_fermion_sea_boundary` and Noether sea response rows from `mass-map`.
6. `gw_public_waveform_packet` — Build a public-data gravitational-wave benchmark packet from GWOSC/LVK event records. The packet must replay GW150914-class short binary-black-hole strain, GW170817-class long binary-neutron-star inspiral and photon-channel speed timing, and current GWTC-4.0 catalog provenance with versioned strain files, detector masks, PE samples, waveform family, calibration notes, artifact hashes, and predeclared waveform/energy/speed residuals. A May 22, 2026 inspection fixes the first document-level packet manifest around `GW150914_short_bbh`, `GW170817_long_bns`, and `GW170817_GRB_speed`; executable artifact collection remains pending until GWOSC/LVK strain, PE, release-metadata, and hash files exist locally. Status: `pending`. Depends on: gravitational-wave effective-metric and event-ledger closure rows.
7. `direct_nucleon_assembly_monte_carlo` — Define the first finite-assembly nucleon simulation target with declared architrino inventory, causal-root ledger, Noether sea embedding, color-corridor event records, and lattice-QCD negative controls. Status: `pending`. Depends on: `tier0_tier1_runs`, standard-model `confinement_energetics`, and nuclear-binding closure.

## Open Simulation-Side Questions

This section collects the main open simulation-side questions that remain after the current protocols and diagnostics are in place. Its purpose is to keep unresolved strong-field and Planck-scale issues visible without pretending they are already part of the validated stack.

### Planck-Scale Framing

- Clarify how **event-horizon alignment conditions** (nested shell braid coplanarity/co-linearity at $v=c_f$) map to conventional Planck units.
- Identify observables that distinguish **alignment-driven strong-field effects** from inner-binary maximal-curvature dynamics.
- Specify which parameters control alignment onset (Noether sea density, compression, external field gradients).

### Simulation Scope Envelope

Each simulation campaign should declare a bounded scope envelope before any result is interpreted. The envelope includes the Euclidean-void domain, absolute-time span, entity inventory, assembly inventory, Noether sea initialization, path-history depth, spatial and temporal resolution ladder, $\mathbb{U}_{\text{now}}$ logging channels, detector-synthetic channels, feedback/intervention mode, and runtime-rate or cost budget. This is not another promotion gate; it is the pre-run declaration that makes the existing campaign packet auditable.

The durable target is to separate four questions that are often conflated:

- What portion of $S(t)$ is being integrated?
- What portion of $S(t)$ is being logged?
- What observer-level quantity is being reconstructed from those logs?
- Which perturbations or interventions are allowed during the run?

Threshold-sensitive events should be reported as deterministic basin-boundary questions, not as substrate randomness. For an event region $\Omega_E$ in the declared state coordinates and unresolved perturbation scale $\|\delta S_t\|_{\mathrm{unres}}$, a useful diagnostic margin is

$$
m_E(t)
=
\frac{d(S_t,\partial\Omega_E)}
{\|\delta S_t\|_{\mathrm{unres}}+\varepsilon_0}
$$

Rows with $m_E(t)\le 1$ are threshold-sensitive. They can guide reruns, perturbation sweeps, and detector-synthetic caution flags, but they do not promote one branch, reaction, or record outcome without the ordinary root-ledger, residual, convergence, and provenance rows.

### Provenance-Scale Simulation Utility

A provenance-rich simulation is valuable only when retained path histories answer a question that a coarse field, aggregate ledger, or detector-synthetic export cannot. The working question is: for which domains does all-entity provenance reduce replay ambiguity enough to justify path-history storage and query cost?

Candidate utility classes:

- reaction balancing: trace incoming and outgoing architrino, Noether-braid, wake, and Noether sea inventory through one event;
- branch replay: recover which source history and causal-root branch generated a retained hit;
- process demographics: count source classes, routing classes, and retained products through outflows, thermalization, jets, or radiation cascades over a declared domain;
- visualization and debugging: show path trails and expanding causal wakes as display-only projections while preserving authoritative segment records separately.

The smallest quantitative object is a provenance-value heuristic:

$$
R_{\mathrm{prov,value}}(Q;E)
=
\frac{
N_{\mathrm{amb}}^{\mathrm{coarse}}(Q;E)
-
N_{\mathrm{amb}}^{\mathrm{prov}}(Q;E)
}{
C_{\mathrm{store}}(E)+C_{\mathrm{query}}(E)+\varepsilon_0
}.
$$

Here $Q$ is the scientific question, $E$ is the declared simulation envelope, $N_{\mathrm{amb}}^{\mathrm{coarse}}$ is the admissible replay or explanation count after coarse summaries, $N_{\mathrm{amb}}^{\mathrm{prov}}$ is the count after retained provenance, and $C_{\mathrm{store}}+C_{\mathrm{query}}$ is the storage/query cost. This is a priority heuristic for simulation design, not a promotion gate.

### Direct Nucleon Assembly Monte Carlo

The lattice-QCD comparison source suggests a concrete simulation target: a finite-assembly nucleon run should attempt the hadron problem from declared architrino provenance rather than from a lattice gauge-field configuration. The target is not to replace lattice QCD by assertion. It is to build the smallest native run whose outputs can be compared against lattice-QCD and experimental rows.

The first campaign object should include

$$
\mathcal{C}_{\mathrm{nuc}}^{\mathrm{MC}}
=
\left(
\mathcal{I}_{36},
S_{\eta},
\mathcal{L}_{\mathrm{root}},
\mathcal{N}_{\mathrm{sea}},
\mathcal{L}_{\mathrm{color}},
\mathcal{O}_{\mathrm{QCD}},
\mathcal{R}_{\mathrm{ctrl}}
\right),
$$

where $\mathcal{I}_{36}$ is the declared 36-architrino candidate inventory for the three-quark nucleon picture, $S_{\eta}$ is the regularized state history, $\mathcal{L}_{\mathrm{root}}$ is the causal-root ledger, $\mathcal{N}_{\mathrm{sea}}$ is the local Noether sea embedding, $\mathcal{L}_{\mathrm{color}}$ records color-corridor closure, $\mathcal{O}_{\mathrm{QCD}}$ lists the hadronic observables being compared, and $\mathcal{R}_{\mathrm{ctrl}}$ records negative controls. Required outputs should include mass, form-factor, spin-decomposition, and scattering or matrix-element comparisons before any claim of QCD recovery is made.

### Wake-Pattern Return Diagnostic

A visualization pass may render a candidate binary, shell-braid, or nested-shell branch as an effective standing wake pattern only after the raw causal-root ledger is preserved. For a declared branch window $W$, period $T$, and quotient map $Q$ that removes center drift, global rotation, and the declared cycle phase, reconstruct a finite-window wake or potential map $\Phi_Q(\mathbf{y}, t)$ from the same $\Pi_{\mathbb{U}_{\text{now}}}$ provenance rows used by the branch residuals. A diagnostic return residual is

$$
R_{\mathrm{wake}}(W,T)
=
\frac{
\|\Phi_Q(\cdot, t+T)-\Phi_Q(\cdot, t)\|_{L^2(W)}
}{
\|\Phi_Q(\cdot, t)\|_{L^2(W)}+\varepsilon_0
}.
$$

Small $R_{\mathrm{wake}}$ is useful for visualization mining and branch-chart intuition, but it is not a promotion gate by itself. If a continuum potential map is not part of the run, the same residual can be applied to a root-weighted wake-event density with the channel named explicitly. The diagnostic can only support a rerun or chart-selection argument when root closure, phase closure, energy/action closure, speed ordering, and the Floquet or return-map stability rows are still reported on the same retained branch record.

## Hydrogen Native Extractor Boundary

The May 22, 2026 hydrogen inspection did not find a native $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ derivation packet. The missing row is
$$
\mathsf{N}_{\mathrm H,\mathrm{spec}}^{(\ell)}
:
\left(
S(t)|_{\Omega_{\mathrm H}},
\mathcal A_{\mathrm H}(t),
C_{\ell,\mathrm{spec}},
\Pi_{\mathrm{spec}}
\right)
\mapsto
\left(
\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)},
D_{p,\mathrm{spec}}^{(\ell)},
D_{e,\mathrm{spec}}^{(\ell)},
\mathbf g_{N,\mathrm H}^{(\ell)},
\{\Delta E_{\mathrm{env}}^{(\ell)}(a,b)\},
\{\nu_{a\to b}^{\mathrm{obs},(\ell)}\},
\mathbf a^G_{\mathrm H}
\right).
$$
Its response decomposition must be native to the same hydrogen spectral channel ledger:
$$
\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}
=
\Theta_{\mathrm{bg},\mathrm{spec}}^{(\ell)}
+
\delta\Theta_{p(uud),\mathrm{spec}}^{(\ell)}
[\mathcal W_{p,\mathrm{spec}}^{\mathrm{locked}},D_{p,\mathrm{spec}}]
+
\delta\Theta_{e\text{-env},\mathrm{spec}}^{(\ell)}
[\mathcal B_e,D_{e,\mathrm{spec}}].
$$
The smallest executable target is two admissible atomic resolutions and at least two isolated hydrogen transitions emitted from one $S(t)|_{\Omega_{\mathrm H}}$ provenance ledger, with $\mathbf g_{N,\mathrm H}^{(\ell)}$, envelope gaps, observer frequencies, and $\mathbf a^G_{\mathrm H}$ all coming from that same ledger.

May 22, 2026 promotion note: safe reader-facing protocol material from this bucket was promoted into `content/markdown/aaa/validation/simulations/run-protocols.md`, `content/markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md`, `content/markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md`, `content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md`, `content/markdown/aaa/validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md`, `content/markdown/aaa/validation/simulations/static-response-vector-toy-model.md`, `content/markdown/aaa/nuclear-atomic/atomic-spectra.md`, `content/markdown/aaa/spacetime/proper-time-and-time-dilation.md`, `content/markdown/aaa/validation/simulations/README.md`, and `content/markdown/aaa/spacetime/gravitational-waves.md`. The promotions cover the generic campaign object $\mathcal{C}_{\mathrm{sim}}$, executable diagnostic vector $\mathcal{D}_{\mathrm{exec}}$, proof/simulation handoff maps, simulation-promotion lemma, formal $\mathsf{Reg}_\eta$ continuation contract, $A_0$ corrected one-period residual boundary $\mathcal{R}_{\mathrm{1per}}$, hydrogen $\Gamma_N$ certificate residual $\mathcal R_{\mathrm H}^{\Gamma}$, and normalized public gravitational-wave diagnostic $\mathcal{D}_{\mathrm{GW}}$. These promotions do not complete the queue items: they make the pass/fail surfaces reader-facing while the actual corrected $A_0$ rerun, convergence artifacts, native hydrogen branch inputs, and public GWOSC/LVK packet execution remain pending.

## Scope

Lock the simulation and numerics side tightly enough to support the analytic closure program. This includes tier-0 / tier-1 runs, convergence, maximum-curvature orbit behavior, and the formal $\eta > 0$ package.

This file remains the control surface for the simulations workstream. No sibling detailed priority file is needed yet; concrete campaign packets can be added later if a run family becomes too large for this queue.

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `tier0_tier1_runs` | This file | [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md) and [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) | Tier 1 runs classify self-root surplus events, emit root ledgers, branch residuals, regularization data, and explicit failure codes rather than generic instability summaries. |
| `field_speed_action_self_hit_scan` | This file and [nested-shell-braid-action-increment-protocol](../../../content/markdown/aaa/validation/simulations/nested-shell-braid-action-increment-protocol.md) | [nested-shell-braid-action-increment-protocol](../../../content/markdown/aaa/validation/simulations/nested-shell-braid-action-increment-protocol.md) and [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) | The binary approach-to-$c_f$ scan reports causal-root multiplicity, root-ledger stability, Jacobian floor, and action-increment clustering on the same rows before any `candidate_h_recovery` promotion. |
| `convergence_and_provenance` | This file | [convergence-tests](../../../content/markdown/aaa/validation/simulations/convergence-tests.md) and [synthetic-observables](../../../content/markdown/aaa/validation/simulations/synthetic-observables.md) | Convergence plots and $\mathbb{U}_{\text{now}}$ provenance logs are reproducible enough to audit a promoted result. |
| `eta_positive_package` | This file | [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) | The formal $\eta > 0$ package states existence, uniqueness, continuation criteria, and no-runaway bounds for the relevant causal-wake model. |
| `hydrogen_gamma_n_record_extraction` | This file | [hydrogen-gamma-n-spectral-row-toy-scan](../../../content/markdown/aaa/validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md), [atomic-spectra](../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md), and [proper-time-and-time-dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md) | The scaffolded hydrogen row is promoted beyond scaffold status only when $\mathbf{g}_{N,\mathrm H}^{(\ell)}$, envelope gaps, observer frequencies, and static response inputs come from one declared hydrogen spectral channel record and the same clock-rate conversion survives refinement. |
| `gw_public_waveform_packet` | [gravitational-waves](../cross-theory-mapping/gravitational-waves.md) | [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md) and future strong-field validation rows | A public gravitational-wave packet compares predicted detector strain, phase, event energy ledger, photon/gravity timing, and provenance against versioned GWOSC/LVK records rather than against unversioned plots or hand-tuned templates. |

## Field-Speed Action Self-Hit Scan Packet

The priority-side campaign target for `field_speed_action_self_hit_scan` is the non-promotional packet
$$
\mathcal{C}_{c_f}^{\mathrm{self/action}}
=
\left(
\mathcal{C}_{\mathrm{sim}},
\mathcal{B}_{\Delta I},
\mathcal{S}_{c_f},
\mathcal{R}_{c_f},
\mathcal{N}_{\mathrm{dN}},
\mathcal{E}_{\mathrm{p+w}},
\mathcal{P}_{c_f}
\right),
$$
where $\mathcal{B}_{\Delta I}$ is the retained branch-row set from the nested shell braid action-increment protocol, $\mathcal{S}_{c_f}$ is the binary approach-to-$c_f$ scan grid, $\mathcal{R}_{c_f}$ is the retained root-ledger and branch-selection row family, $\mathcal{N}_{\mathrm{dN}}$ records the delayed-Noether status, $\mathcal{E}_{\mathrm{p+w}}$ is the particle-plus-wake energy row, and $\mathcal{P}_{c_f}$ is the promotion-blocker ledger. This packet is priority-only until executable artifacts exist and pass the same source-commit, refinement, negative-control, and artifact-hash rules as $\mathcal{C}_{\mathrm{sim}}$.

The scan variables are declared before output inspection:

| Variable | Meaning | Pre-run declaration |
| --- | --- | --- |
| $\mathsf{branch\_row\_id}$ | Nested shell braid endpoint or transition row consumed from $\mathcal{B}_{\Delta I}$ | Must match the row identifiers used by `action_increment_rows.csv`; no scan-only branch row may vote on `candidate_h_recovery`. |
| $a$ | Scanned layer or speed coordinate | Must name the layer speed ratio being varied while all unscanned branch labels, plane normals, endpoint charges, and transaction axis remain declared. |
| $\beta_a=s_a/c_f$ | Dimensionless field-speed coordinate | The only scan coordinate for approach-to-$c_f$ status; fitted reparameterizations are diagnostic-only. |
| $W=[t_0,t_1]$ and $T$ | Analysis window and declared cycle or certificate period | Must match the action-increment packet window when the row contributes to stable-cycle clustering. |
| $(\Delta t,\Delta h,\Delta x,\eta)$ | Temporal, history, spatial, and regulator resolutions | Must include at least one refinement pair for each active gate: $(\Delta t,\Delta t/2)$, $(\Delta h,\Delta h/2)$, $(\Delta x,\Delta x/2)$, and $(\eta,\eta/2)$ when the run makes a regulator claim. |
| $\nu_{\min}$ and $B_{\max}$ | Minimum accepted Jacobian floor and active-root count bound | Must be declared before the scan; rows that choose these after seeing near-boundary behavior route to $\mathsf{hidden\_tuning}$. |
| $\tau_{E,\mathrm{p+w}}$ and $\tau_{\Delta I}$ | Energy-drift and action-cluster tolerances | Must be no looser than the tolerances in the action-increment packet that consumes the row. |

The binary scan grid is
$$
\mathcal{S}_{c_f}
=
\left\{
1-2^{-m}:m\in\{6,7,8,9\}
\right\}
\cup
\mathcal{S}_{=}
\cup
\mathcal{S}_{+},
$$
with
$$
\mathcal{S}_{=}
=
\begin{cases}
\{1\},&\text{if the finite-}\eta\text{ continuation reaches }\beta_a=1\text{ without leaving }\mathcal{A}_\eta,\\
\varnothing,&\text{otherwise,}
\end{cases}
$$
and
$$
\mathcal{S}_{+}
=
\begin{cases}
\{1+2^{-9},1+2^{-8},1+2^{-7},1+2^{-6}\},&\text{if the declared branch chart admits that super-field-speed interval,}\\
\varnothing,&\text{otherwise.}
\end{cases}
$$
The below-boundary rows are mandatory for the first artifact. The boundary and super-field-speed rows are retained as explicit `not-admitted` or `eta-continuation-failure` rows when the declared continuation cannot lawfully enter them; omitting them silently makes the artifact incomplete.

Each retained row in `field_speed_approach_scan.csv` must contain:

| Column family | Required entries |
| --- | --- |
| Identity | `scan_family_id`, `branch_row_id`, source commit, run id, protocol version, $\beta_a$, speed-window label `below_cf` / `at_cf` / `above_cf`, and refinement level. |
| Root ledger | Active partner-root count, active self-root count, active inter-layer-root count, excluded near-zero self-root count, separator count, active-root identity hash, root-ledger refinement match flag, and transition-record hash when a fold-layer, separator, or active-root status window is crossed. |
| Jacobian and branch status | Minimum accepted $|J|$, declared $\nu_{\min}$, branch-selection verdict, branch-status label, and failure code if the row is rejected. |
| Action and energy | $\Delta I_{\mathrm{ME}}$, cluster id, cluster spread contribution, $E_{\mathrm{p+w}}^{(\eta)}(t_0)$, $E_{\mathrm{p+w}}^{(\eta)}(t_1)$, and $\epsilon_{E,\mathrm{p+w}}$. |
| Noether status | Delayed-Noether status `action-derived`, `quasi-Noether`, or `diagnostic-only`, plus the artifact that justifies the status. |
| Promotion blockers | Boolean columns for root identity change, Jacobian floor loss, unbounded or nonconvergent particle-plus-wake energy, `diagnostic-only` Noether status, nonuniform action spacing, missing negative-control failure, missing artifact hash, and hidden tuning. |

The particle-plus-wake energy row is
$$
E_{\mathrm{p+w}}^{(\eta)}(t)
=
K_{\mu}(t)+E_{\mathrm{wake}}^{(\eta)}(t),
\qquad
\epsilon_{E,\mathrm{p+w}}
=
\frac{
\sup_{t\in W}\left|E_{\mathrm{p+w}}^{(\eta)}(t)-E_{\mathrm{p+w}}^{(\eta)}(t_0)\right|
}{
\left|E_{\mathrm{p+w}}^{(\eta)}(t_0)\right|+\varepsilon_0
}.
$$
If $E_{\mathrm{wake}}^{(\eta)}$ lacks a lower bound on the same branch row, the scan status is `energy-row-unbounded` and no action-spacing promotion may consume the row.

Failure routing is fail-closed:

| Condition | Status or failure code |
| --- | --- |
| Required campaign metadata, source commit, declared tolerance, or artifact hash is missing | $\mathsf{artifact\_incomplete}$ |
| $\beta_a$, $\nu_{\min}$, $\tau_{E,\mathrm{p+w}}$, $\tau_{\Delta I}$, branch labels, or promoted observables are changed after output inspection | $\mathsf{hidden\_tuning}$ |
| Active-root identity changes under $\Delta t$, $\Delta h$, $\Delta x$, or $\eta$ refinement without a certified separator or fold-layer explanation | $\mathsf{branch\_root\_instability}$ |
| A boundary or super-field-speed row is not admitted by the declared branch chart | `not-admitted` |
| The minimum accepted $|J|$ falls below $\nu_{\min}$ on a retained near-boundary row | `jacobian-floor-loss` |
| $E_{\mathrm{p+w}}^{(\eta)}$ is unbounded or lacks a lower bound on the same branch row | `energy-row-unbounded` |
| $E_{\mathrm{p+w}}^{(\eta)}$ is nonconvergent or exceeds $\tau_{E,\mathrm{p+w}}$ | $\mathsf{conservation\_drift}$ |
| The finite-$\eta$ continuation leaves $\mathcal{A}_\eta$ before completing the declared row | $\mathsf{eta\_continuation\_failure}$ |
| The delayed-Noether row remains `diagnostic-only` | `noether-diagnostic-only` |
| Stable-cycle $\Delta I_{\mathrm{ME}}$ rows split into multiple clusters without a derived branch-class reason | `nonuniform-action-spacing` |
| The negative control also passes the scan gates | $\mathsf{null\_control\_passed}$ |
| All declared rows pass with artifact hashes and the action-increment packet also passes its own gates | `candidate_h_recovery-eligible` |

The minimal first executable artifact is `field_speed_action_self_hit_scan/v0`: one declared scan family over one already-retained nested shell braid action-increment branch row, the four mandatory below-$c_f$ values in $\mathcal{S}_{c_f}$, one temporal refinement pair, one history-resolution refinement pair, the active-root identity hash at both refinements, $J_{\min}$, $\Delta I_{\mathrm{ME}}$, $E_{\mathrm{p+w}}^{(\eta)}$, delayed-Noether status, a wrong-$c_f$ negative control, `field_speed_approach_scan.csv`, and `failure_report.md`. This v0 artifact may only produce `diagnostic-only`, one of the fail-closed statuses above, or `candidate_h_recovery-eligible` priority statuses; it may not assert accepted physics or theorem-level conservation.

### V0 Source-Row Binding

The first v0 row must bind to an action-increment source before any scan output
is interpreted. The binding object is

$$
\mathcal{B}_{c_f}^{v0}
=
\left(
\mathsf{branch\_row\_id},
\mathsf{endpoint\_eligibility},
\mathsf{action\_row\_hash},
\mathsf{root\_ledger\_hash},
\mathsf{conservation\_pullback\_hash},
\mathsf{source\_verdict}
\right).
$$

The `endpoint_eligibility` value is inherited from the nested shell braid
action-increment protocol. Because that protocol sets
$\mathcal{T}_{\mathrm{acc}}=\varnothing$ until both endpoint packets have
matching ledger identity, matching active-root convention, positive Jacobian
floors, inactive-root or tail status, $\Delta_{\mathbf{k}}>0$, conservation
pullback, and refinement records, the field-speed scan has only two legal
pre-acceptance modes:

| Source verdict | Meaning | Allowed v0 interpretation |
| --- | --- | --- |
| `accepted_transition_source` | The named `branch_row_id` is an accepted action-increment transition row with source hashes for the same root ledger and conservation pullback. | May test `candidate_h_recovery-eligible`, subject to all scan gates. |
| `diagnostic_rejected_endpoint_source` | The named `branch_row_id` is present in the action-increment packet but rejected by endpoint eligibility or conservation pullback. | May emit only `diagnostic-only` or a fail-closed status. |
| `source_row_binding_open` | No named action-increment row and matching hashes exist. | The scan artifact is incomplete and cannot vote on action spacing, self-hit well-posedness, or `candidate_h_recovery`. |

This binding rule is not an additional promotion gate. It is the row-identity
bridge between `action_increment_rows.csv` and `field_speed_approach_scan.csv`.
If a run only has a visual branch, an unversioned notebook row, or a row whose
root ledger and conservation pullback hashes differ, the correct v0 result is
`source_row_binding_open` before any near-$c_f$ behavior is interpreted.

Current fixture boundary, 2026-06-28. The repository contains the shape-only
fixture packet under
`scripts/nested-shell-braid/fixtures/action-increment-packet/`. Its
`action_increment_rows.csv` includes two fixture rows with `status=accepted`,
but `cluster_summary.json` declares `promotion_status:
fixture-shape-only`. Therefore those rows may validate parser shape and
failure-code plumbing only. They do not satisfy `accepted_transition_source`,
do not bind to a retained branch certificate, and do not authorize
`field_speed_action_self_hit_scan/v0` to vote on `candidate_h_recovery`.
Current live v0 status remains `source_row_binding_open` until a non-fixture
action-increment packet emits matching root-ledger and conservation-pullback
hashes.

Shared H39 provider boundary, 2026-06-28. The
[branch-provider evidence report](../solver/branch-provider-evidence-report.md)
maps the H39 aggregate-$P$ construction attempt to this rank as
`target_only_not_accepted_source`. Its
`branch_provider_candidate_source_contract_readout/v0` verifies the five-cell
boundary replay and now records a non-authorizing source-provenance refinement:
the signed-radius subinterval primitive, projected source-term producer-image
fields, and lambda terminal witness branch intervals are present, but
source-map provider-object branch intervals remain unavailable. The shared
report still returns
`provider_verdict=same_domain_branch_provider_missing` and
`first_failure=accepted_non_fixture_source_missing`. The remaining H39
blockers are `source_term_provider_directed_source_certification_open` and
`source_term_provider_term_width_realization_open`; rank 2 also still requires
`conservation_pullback_hash` on the same accepted transition source. Therefore
this readout is not an `accepted_transition_source` and does not authorize
`candidate_h_recovery`.

Minimum non-fixture `accepted_transition_source` object:

| Field | Required content | Fixture packet reading |
| --- | --- | --- |
| `transition_source_ref` | Path or generated artifact id for the branch-emitted transition source. | fixture-only |
| `branch_certificate_ref` | Retained branch certificate that owns the source row. | absent |
| `root_ledger_hash` | Hash of the active-root ledger consumed by the action-increment row. | absent for live binding |
| `conservation_pullback_hash` | Hash of the conservation-pullback row consumed by the same action-increment row. | absent for live binding |
| `action_increment_row_id` | Named non-fixture action-increment row with accepted status. | fixture row only |
| `negative_control_ref` | Fail-closed control showing mismatched root or conservation hashes reject. | absent |
| `candidate_h_recovery_vote` | May be emitted only after every row above binds on the same retained branch record. | not authorized |

Current source-binding report object: `field_speed_action_self_hit_scan_source_binding_report/v0`.
It now embeds the priority-only acceptance artifact
`field_speed_action_self_hit_scan_source_acceptance_contract/v0`, which orders
the same-record source requirements and reports the first blocking field before
any scan output is interpreted.

| Field | Current reading | Verdict |
| --- | --- | --- |
| `transition_source_ref` | `scripts/nested-shell-braid/fixtures/action-increment-packet/` | first required source field; blocked by `fixture_shape_only_packet_not_source` |
| `action_increment_row_id` | fixture row `fixture-B12-B13-a` | blocked by `fixture_action_increment_row_not_source` |
| `branch_certificate_ref` | absent | next branch-ownership blocker after a non-fixture source exists |
| `action_row_hash` | fixture row `fixture-B12-B13-a` now hashes to `sha256:0f6bab71d0aec1882afcbd9dcbe40f97f19a90ef928f85f392ed5602160d7bb9`; absent for a non-fixture row | `source_row_binding_open` |
| `root_ledger_hash` | absent for live binding | `source_row_binding_open` |
| `conservation_pullback_hash` | absent for live binding | `source_row_binding_open` |
| `source_verdict` | fixture rows have `status=accepted`, but `promotion_status=fixture-shape-only` | `diagnostic_rejected_endpoint_source` for closure purposes |
| `negative_control_ref` | absent | fail-closed hash mismatch control still required |
| `candidate_h_recovery_vote` | not authorized | no simulation vote |

Executable report status, 2026-06-28:
`scripts/nested-shell-braid/field-speed-action-self-hit-scan-source-binding-report.mjs`
emits and validates the source-binding report object. Running it on the fixture
packet with `--branch-row-id fixture-B12-B13-a` produces
`source_verdict=diagnostic_rejected_endpoint_source`,
`first_failure=source_row_binding_open`,
`first_required_source_field=transition_source_ref`,
`first_missing_or_rejected_failure_code=fixture_shape_only_packet_not_source`,
`source_acceptance_contract.status=blocked`, and
`candidate_h_recovery_vote=not_authorized`.

The fixture packet, blocked source-contract fixture, and rank-2 transition-source
attempt at
`scripts/nested-shell-braid/fixtures/action-increment-source-contract-rank2-transition-source-attempt.json`
can test parser, failure-code, and source-binding behavior, but they do not
satisfy `accepted_transition_source`. The rank-2 attempt intentionally provides
a populated transition shell with no accepted branch-state source; the checker
therefore fails at the accepted-source boundary while keeping the benchmark
policy clean. The first executable closure move is a non-fixture action-increment
row with a retained branch certificate, matching active-root and
conservation-pullback hashes, and a failing negative control for mismatched
hashes.

Related torque/wake diagnostic status, 2026-06-28:
`scripts/nested-shell-braid/torque-wake-same-row-diagnostic-report.mjs` emits
and validates `torque_wake_same_row_diagnostic_report/v0` for the angular
momentum same-row payload. The current fixture records sampled same-row
force/partition/torque/wake ids on `selected_case_id=index-ratio:f2`, but it
returns `first_failure=branch_certificate_ref_missing`, keeps
`same_record_source_binding=false`, and records the retained-row upgrade as
missing. It is useful dependency-routing evidence only; it is not an
`accepted_transition_source` and cannot authorize `candidate_h_recovery`.

Rank 2 / rank 6 branch-source join status, 2026-06-28:
`scripts/nested-shell-braid/rank2-rank6-branch-source-join-report.mjs` compares
the current rank 2 source-binding report, rank 6 moving-certificate candidate,
and torque/wake same-row diagnostic. The fixture set passes only the torque/wake
same-row id check; it returns `first_failure=source_row_binding_open` because no
non-fixture accepted transition source is present. Its
`same_record_provider_intake` now names the needed same-record fields:
non-fixture `accepted_transition_source`, accepted branch chart,
`moving_retained_branch_certificate/v0`, common branch certificate, active-root
ledger identity, conservation-pullback hash, and a common negative-control
reference. It also records bounded-speed live ledger, Photon Gate A, Lorentz
rows, and observer export as missing or not authorized, and its negative-control
guard rejects cross-report or synthetic mismatches. The report keeps
`candidate_h_recovery`, `moving_retained_branch_certificate`, bounded-speed live
ledger, Photon Gate A, Lorentz rows, and observer export unauthorized.

The remaining promotion blockers are executable, not editorial: no current artifact has shown same-row active-root identity under refinement, a positive Jacobian floor through the approach-to-$c_f$ scan, bounded particle-plus-wake energy on the retained branch rows, delayed-Noether status above `diagnostic-only`, stable one-cluster $\Delta I_{\mathrm{ME}}$ behavior, and a failing negative control with content hashes.

## Simulation Campaign Object

A simulation campaign is the typed object
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
\big),
$$
where $\mathsf{id}$ fixes the run identifier and source commit, $S_\eta$ is the regularized state history, $\mathcal{G}_h$ is the spatial mesh and history mesh, $\Delta t$ is the absolute-time step, $\eta > 0$ is the causal-wake regularization width, $I_h^q$ is the declared order-$q$ history interpolation operator, $\mathcal{L}_{\mathrm{root}}$ is the causal-root ledger, $\mathcal{T}_{\eta}$ is the finite-$\eta$ transition-record family when the run crosses fold, separator, or active-root status windows, $\mathcal{R}_{\mathrm{branch}}$ is the named branch-residual vector, $\Pi_{\mathbb{U}_{\text{now}}}$ is the provenance log, $\mathcal{E}_{\mathrm{conv}}$ is the convergence-measure vector, and $\mathcal{F}$ is the finite failure-code set.

The regularized state history is
$$
S_\eta(t)
=
\{(\mathbf{x}_i(t),\mathbf{v}_i(t),q_i)\}_{i=1}^{N}
\quad\text{with}\quad
S_{\eta,t}(\theta)=S_\eta(t+\theta),\ \theta\in[-h,0],
$$
and every tier-1 run must declare whether $S_{\eta,t}$ is evaluated in $C^1([-h,0])$, $W^{1,\infty}([-h,0])$, or a stricter history class.

The mesh object is
$$
\mathcal{G}_h=(\Omega_h,\Delta x,\{x_k\}_{k=1}^{K},\Theta_h,\Delta h,\mathsf{bc}),
$$
where $\Omega_h\subset\mathbb{R}^3$ is the Euclidean-void computational domain, $\{x_k\}$ are the fixed $\mathbb{U}_{\text{now}}$ sample points, $\Theta_h\subset[-h,0]$ is the stored path-history mesh, $\Delta h$ is the history resolution, and $\mathsf{bc}$ records boundary conditions.

The interpolation operator $I_h^q$ must be declared before delayed source states are evaluated. Its history-resolution diagnostic is
$$
E_{\mathrm{hist}}(S_\eta;\Delta h,\Delta h/2;W)
=
\frac{
\left(\sum_{m\in W}\|I_{\Delta h/2}^qS_\eta(t_{\mathrm{emit},m})-I_{\Delta h}^qS_\eta(t_{\mathrm{emit},m})\|^2w_m\right)^{1/2}
}{
\left(\sum_{m\in W}\|I_{\Delta h/2}^qS_\eta(t_{\mathrm{emit},m})\|^2w_m\right)^{1/2}+\varepsilon_0
}.
$$
When a nonsmooth state-dependent delay row appears, disappears, or crosses a fold-layer, the campaign must also emit a jump/transition ledger
$$
\mathcal{D}_{\mathrm{jump}}
=
\{(\xi_a,k_a,\ell_a,\xi_{\pi(a)},R_{\mathrm{jump},a})\},
\qquad
R_{\mathrm{jump},a}
=
\frac{|t_{0,\ell_a}(\xi_a)-\xi_{\pi(a)}|}
{\max(\Delta t,\Delta h,\eta/c_f,\varepsilon_0)}.
$$

For each receiver-source pair $(i,j)$ at absolute time $t$, the root ledger is
$$
\mathcal{L}_{\mathrm{root}}(t)
=
\{(i,j,\ell,t_{0,\ell},r_{ij,\ell},J_{ij,\ell},\mathsf{class}_{\ell},\mathsf{status}_{\ell})\},
$$
with
$$
g_{ij}(t_{0,\ell};t)
=
\|\mathbf{x}_i(t)-\mathbf{x}_j(t_{0,\ell})\|-c_f(t-t_{0,\ell}),
\qquad
J_{ij,\ell}=1-\frac{\mathbf{v}_j(t_{0,\ell})\cdot\hat{\mathbf{r}}_{ij,\ell}}{c_f}.
$$

Root-ledger completeness means
$$
\mathcal{L}_{\mathrm{raw}}
=
\mathcal{L}_{\mathrm{active}}
\sqcup
\mathcal{L}_{\mathrm{excluded}}
\sqcup
\mathcal{L}_{\mathrm{separator}},
$$
where near-zero self roots excluded by $H(0)=0$ must appear in $\mathcal{L}_{\mathrm{excluded}}$ and may not be counted as active self-hit closure.

The branch-residual vector is
$$
\mathcal{R}_{\mathrm{branch}}
=
\big(
\mathcal{R}_{\text{state}},
\mathcal{R}_{\text{root}},
\mathcal{R}_{\text{phase}},
\mathcal{R}_{E},
\mathcal{R}_{\text{drift}},
\mathcal{R}_{\text{speed}},
\mathcal{R}_{\text{avg}},
\mathcal{R}_{\text{lock}},
\mathcal{R}_{\text{leak}},
\mathcal{R}_{\text{Floquet}}
\big),
$$
and a campaign must publish a tolerance vector $\tau_{\mathrm{branch}}$ with the same component order before any branch row is promoted.

The root residual component is normalized as
$$
\mathcal{R}_{\text{root}}
=
\max_{t,i,j,\ell}
\frac{|g_{ij}(t_{0,\ell};t)|}
{\max(c_f\Delta t,\eta,\varepsilon_0)},
\qquad
\varepsilon_0=10^{-12}.
$$

The provenance log is
$$
\Pi_{\mathbb{U}_{\text{now}}}
=
\{(\mathsf{receiver}_m,t_m,\mathsf{emitter}_m,t_{\mathrm{emit},m},
\mathsf{contribution}_m,\rho_m,\theta_m)\}_{m=1}^{M},
$$
where
$$
\rho_m
=
\frac{\left|\|x_{\mathsf{receiver}_m}-x_{\mathsf{emitter}_m}(t_{\mathrm{emit},m})\|-c_f(t_m-t_{\mathrm{emit},m})\right|}
{\max(c_f\Delta t,\varepsilon_0)},
\qquad
\theta_m=\frac{t_{\mathrm{emit},m}-t_m}{\Delta t}.
$$

The convergence-measure vector is
$$
\mathcal{E}_{\mathrm{conv}}
=
\big(
E_{\mathrm{rel}}(\Phi),
E_{\mathrm{rel}}(\|\nabla\Phi\|),
D_W,
D_{JS},
p_{\mathrm{obs}},
\epsilon_{\mathrm{self}},
\epsilon_H,
\epsilon_P,
\epsilon_L,
E_\eta,
\Delta_{\eta,\mathrm{root}},
E_{\mathrm{hist}},
E_{\mathrm{jump}}
\big),
$$
with $\epsilon_H$, $\epsilon_P$, and $\epsilon_L$ denoting declared relative drifts of total energy, total momentum, and total angular momentum on the analysis window.

The regulator-dependence observable for any promoted channel $Y$ is
$$
E_\eta(Y;\eta,\eta/2)
=
\frac{\|R(Y_{\eta/2})-Y_{\eta}\|_{L^2(W,\{x_k\})}}
{\|R(Y_{\eta/2})\|_{L^2(W,\{x_k\})}+\varepsilon_0},
$$
and the branch-regulator defect $\Delta_{\eta,\mathrm{root}}$ is the number of unmatched active root-ledger entries after matching $(i,j,\ell,\mathsf{class}_{\ell})$ between $\eta$ and $\eta/2$ runs.

The history and jump components use the declared interpolation operator and transition ledger:
$$
E_{\mathrm{hist}}\le\tau_{\mathrm{hist}},
\qquad
E_{\mathrm{jump}}
=
\max_a R_{\mathrm{jump},a}
\le\tau_{\mathrm{jump}}.
$$
Missing interpolation rows route to $\mathsf{artifact\_incomplete}$; unstable branch or jump identity routes to $\mathsf{branch\_root\_instability}$; unresolved interpolation convergence routes to $\mathsf{mesh\_nonconvergence}$.

The failure-code set is
$$
\mathcal{F}
=
\{\mathsf{pass},
\mathsf{mesh\_nonconvergence},
\mathsf{branch\_root\_instability},
\mathsf{provenance\_discontinuity},
\mathsf{conservation\_drift},
\mathsf{regulator\_dependence},
\mathsf{hidden\_tuning},
\mathsf{null\_control\_passed},
\mathsf{eta\_continuation\_failure},
\mathsf{artifact\_incomplete}\}.
$$

## Public Gravitational-Wave Benchmark Campaign

A gravitational-wave benchmark campaign is a specialization of $\mathcal{C}_{\mathrm{sim}}$:
$$
\mathcal{C}_{\mathrm{GWOSC}}
=
\big(
\mathsf{event\_id},
\mathsf{catalog},
\mathsf{event\_version},
\mathcal{D},
\mathcal{S}_{h},
\mathcal{P}_{\mathrm{PE}},
\mathcal{P}_{\mathrm{wave}},
\mathcal{Q}_{\mathrm{det}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
\mathcal{R}_{\mathrm{GW}},
\Pi_{\mathrm{wave}},
\mathcal{F}
\big),
$$
where $\mathcal{D}$ is the detector set, $\mathcal{S}_{h}$ is the versioned public strain-file set, $\mathcal{P}_{\mathrm{PE}}$ names posterior samples and parameter-estimation lifecycle rows, $\mathcal{P}_{\mathrm{wave}}$ names the waveform family or numerical-relativity provenance used for comparison, $\mathcal{Q}_{\mathrm{det}}$ carries calibration, data-quality, injection-mask, down-sampling, and glitch-treatment records, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event conservation ledger, $\mathcal{R}_{\mathrm{GW}}$ is the predeclared waveform residual vector, and $\Pi_{\mathrm{wave}}$ maps each plotted or fitted sample back to public artifacts.

The executable diagnostic is
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
$D_{\mathrm{det}}$, $D_{\mathrm{PE}}$, and $D_{\mathrm{prov}}$ are binary completeness ratios whose value is `0` only when detector masks/calibration, PE release metadata, and artifact hashes are all present. A packet can support a promoted gravitational-wave claim only if
$$
\max_a\mathcal{D}_{\mathrm{GW},a}\le 1
$$
and the public-data provenance row was fixed before the waveform comparison. If a packet reweights posterior samples, changes waveform family, excludes a detector, changes the analysis band, or substitutes cleaned data after seeing the residuals, the change must appear as a new event-version row rather than an in-place correction.

The first benchmark triad is:

| Packet row | Required public-data role | Failure routed if missing |
| --- | --- | --- |
| `GW150914_short_bbh` | Short inspiral-merger-ringdown strain, two-detector arrival timing, radiated-energy ledger, numerical-relativity waveform provenance, and ringdown handoff. | $\mathsf{artifact\_incomplete}$ or $\mathsf{hidden\_tuning}$ |
| `GW170817_long_bns` | Long inspiral strain, three-detector timing, glitch/cleaning provenance, chirp-mass phase benchmark, and PE waveform-family record. | $\mathsf{provenance\_discontinuity}$ or $\mathsf{mesh\_nonconvergence}$ |
| `GW170817_GRB_speed` | Photon/gravity timing residual with luminosity distance, observed delay, and intrinsic source-emission lag nuisance. | $\mathsf{hidden\_tuning}$ or $\mathsf{conservation\_drift}$ |

This campaign is a success marker under the existing simulation provenance and conservation gates, not a new gate family. Its incremental value is that public strain, PE samples, waveform provenance, and multimessenger timing make strong-field radiation tests replayable without importing GR waveform success as $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

## Executable Diagnostic Contract

A campaign that is intended to discipline a proof certificate must reduce its numerical status to predeclared scalar diagnostics. Define
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
where every component is a ratio whose passing threshold is $1$:
$$
D_{\mathrm{branch}}
=
\max_a\frac{\mathcal{R}_{\mathrm{branch},a}}{\tau_{\mathrm{branch},a}},
$$
$$
D_{\mathrm{ref}}
=
\max\left(
\frac{E_{\mathrm{rel}}(\Phi;\Delta t,\Delta t/2)}{0.02},
\frac{E_{\mathrm{rel}}(\|\nabla\Phi\|;\Delta t,\Delta t/2)}{0.03},
\frac{|\Delta\lambda_{\text{self}}|}{0.05(\lambda_{\text{self}}+\varepsilon_0)}
\right),
$$
$$
D_{\mathrm{ord}}
=
\frac{0.8}{\max(p_{\mathrm{obs}}(\Phi),p_{\mathrm{obs}}(\|\nabla\Phi\|),\varepsilon_0)},
$$
$$
D_{\mathrm{hist}}
=
\max\left(
\frac{E_{\mathrm{rel}}(\Phi)}{0.02},
\frac{E_{\mathrm{rel}}(\|\nabla\Phi\|)}{0.03},
\frac{E_{\mathrm{hist}}}{\tau_{\mathrm{hist}}},
\frac{D_W}{0.05},
\frac{D_{JS}}{0.02}
\right),
$$
$$
D_{\mathrm{space}}
=
\max\left(
\frac{E_{\mathrm{rel}}(\Phi\text{-map})}{0.03},
\frac{E_{\mathrm{rel}}(\nabla\Phi\text{-map})}{0.05},
\frac{\Delta_{\mathrm{self}}}{0.05}
\right),
$$
$$
D_{\mathrm{cross}}
=
\max\left(
\frac{E_{\mathrm{rel}}(\Phi)}{0.03},
\frac{E_{\mathrm{rel}}(\|\nabla\Phi\|)}{0.05},
\frac{D_W}{0.08},
\frac{D_{JS}}{0.03}
\right),
$$
$$
D_{\mathrm{prov}}
=
\max\left(
\frac{\#\{m:\rho_m>10^{-2}\}}{10^{-3}M},
\frac{\max_m\rho_m}{5\times10^{-2}},
\frac{\#\{m:\theta_m>10^{-9}\}}{10^{-6}M}
\right),
$$
$$
D_{\mathrm{cons}}
=
\max\left(
\frac{\epsilon_H}{\tau_H},
\frac{\epsilon_P}{\tau_P},
\frac{\epsilon_L}{\tau_L}
\right),
\qquad
D_{\eta}
=
\max_Y\frac{E_\eta(Y)}{\tau_{\eta,Y}},
\qquad
D_{\mathrm{jump}}
=
\frac{E_{\mathrm{jump}}}{\tau_{\mathrm{jump}}}.
$$

The executable Tier 1 acceptance predicate is
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
Here $\Delta_{\mathrm{self}}$ is the larger relative shift of self-hit counts and stability-window boundaries under spatial refinement. $\mathsf{NullFail}=1$ means the negative control violates at least one required null-test margin, and $\mathsf{Artifacts}=1$ means every required artifact in the output contract exists with a content hash and source commit.

Failure routing is deterministic. The first violated row in the following order supplies the campaign failure code:

| Route condition | Failure code |
| --- | --- |
| required artifact, source commit, pre-run tolerance, or hash is missing | $\mathsf{artifact\_incomplete}$ |
| a promoted observable, tolerance, branch label, or regulator ladder is changed after output inspection | $\mathsf{hidden\_tuning}$ |
| $R_0\notin\mathsf{Candidate}_{1}$ or active roots are unstable under root-ledger refinement | $\mathsf{branch\_root\_instability}$ |
| $D_{\mathrm{jump}}>1$ or jump identities are unstable under refinement | $\mathsf{branch\_root\_instability}$ |
| $D_{\mathrm{ref}}>1$, $D_{\mathrm{ord}}>1$, $D_{\mathrm{hist}}>1$, $D_{\mathrm{space}}>1$, or $D_{\mathrm{cross}}>1$ | $\mathsf{mesh\_nonconvergence}$ |
| $D_{\mathrm{prov}}>1$ | $\mathsf{provenance\_discontinuity}$ |
| $D_{\mathrm{cons}}>1$ | $\mathsf{conservation\_drift}$ |
| $D_{\eta}>1$ or $\Delta_{\eta,\mathrm{root}}>0$ | $\mathsf{regulator\_dependence}$ |
| the continuation exits $\mathcal{A}_\eta$ or crosses $\partial\mathcal{A}_\eta$ without a stricter replacement bound | $\mathsf{eta\_continuation\_failure}$ |
| the negative control also passes all convergence gates | $\mathsf{null\_control\_passed}$ |
| every row above passes | $\mathsf{pass}$ |

## Tier-0 Acceptance Criteria

A tier-0 row is an algebraic branch-certificate row
$$
R_0=(S_{\mathrm{red}},\mathcal{L}_{\mathrm{root}},\mathcal{R}_{\mathrm{branch}},\tau_{\mathrm{branch}},\mathcal{F})
$$
that searches finite causal-root branches without claiming a physical attractor.

Tier 0 accepts only if every active branch satisfies
$$
\mathcal{R}_{\text{root}}\le \tau_{\text{root},0},
\qquad
\min_{t,i,j,\ell\in\mathcal{L}_{\mathrm{active}}}|J_{ij,\ell}(t)|\ge \nu_0>0,
\qquad
\sup_{t,i,j}B_{ij}^{\mathrm{active}}(t)\le B_0<\infty.
$$

Tier 0 accepts a speed-ordered nested shell braid row only if the row declares the ordering inequalities used by the branch label and verifies them as strict inequalities, for example
$$
s_I>c_f,\qquad |s_M-c_f|\le \tau_{\mathrm{speed},0},\qquad s_O<c_f.
$$

Tier 0 accepts a branch row only if
$$
\mathcal{R}_{\mathrm{branch},a}\le \tau_{\mathrm{branch},a}
\quad\text{for every component }a,
$$
and every nonzero residual component has role metadata assigning it to averaging, locking, leakage, speed ordering, phase closure, root closure, drift, energy, or Floquet diagnostics.

Tier 0 rejects a row if
$$
\mathcal{L}_{\mathrm{separator}}\ne\varnothing
$$
and any separator entry lacks a signed sheet label, a fold or inactive-gap status, and an explicit reason it is not being counted as a simple active root.

Tier 0 rejects a row if any near-zero self root enters $\mathcal{L}_{\mathrm{active}}$ without a named regularized fold-layer condition, because $H(0)=0$ excludes instantaneous self-kicks from active self-hit closure.

Tier 0 promotion means only
$$
R_0\in\mathsf{Candidate}_{1},
$$
where $\mathsf{Candidate}_{1}$ is the set of rows eligible for tier-1 $\eta > 0$ delayed-dynamics continuation.

## Tier-1 Acceptance Criteria

A tier-1 run is a direct delayed-dynamics continuation
$$
R_1=(R_0,S_\eta,W,\eta,\Delta t,\Delta h,\mathcal{G}_h,\Pi_{\mathbb{U}_{\text{now}}},\mathcal{E}_{\mathrm{conv}},\mathcal{F})
$$
over an analysis window $W=[t_a,t_b]$ with fixed $\eta > 0$ and at least one declared cycle or certificate period when the claim is periodic.

Tier 1 requires admissible continuation on $W$:
$$
\sup_{t\in W}\|\mathbf{v}(t)\|\le V_{\max},
\qquad
\inf_{t\in W,i,j,\ell}r_{ij,\ell}(t)\ge d_{\min}>0,
\qquad
\inf_{t\in W,i,j,\ell}|\partial_\tau g_{ij,\ell}(t)|\ge \nu_1>0,
$$
and
$$
\sup_{t\in W,i,j}B_{ij}^{\mathrm{active}}(t)\le B_1<\infty.
$$

Tier 1 requires temporal convergence
$$
E_{\mathrm{rel}}(\Phi;\Delta t,\Delta t/2)\le 0.02,
\qquad
E_{\mathrm{rel}}(\|\nabla\Phi\|;\Delta t,\Delta t/2)\le 0.03,
\qquad
\frac{|\Delta\lambda_{\text{self}}|}{\lambda_{\text{self}}+\varepsilon_0}\le 0.05,
$$
with
$$
p_{\mathrm{obs}}(\Phi)\ge 0.8
\quad\text{or}\quad
p_{\mathrm{obs}}(\|\nabla\Phi\|)\ge 0.8.
$$

Tier 1 requires history-resolution convergence
$$
E_{\mathrm{rel}}(\Phi)\le 0.02,
\qquad
E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.03,
\qquad
D_W\le 0.05,
\qquad
D_{JS}\le 0.02.
$$

Tier 1 requires spatial convergence
$$
E_{\mathrm{rel}}(\Phi\text{-map})\le 0.03,
\qquad
E_{\mathrm{rel}}(\nabla\Phi\text{-map})\le 0.05,
$$
and self-hit counts plus stability-window boundaries must have relative shift at most $0.05$.

Tier 1 requires cross-integrator agreement
$$
E_{\mathrm{rel}}(\Phi)\le 0.03,
\qquad
E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.05,
\qquad
D_W\le 0.08,
\qquad
D_{JS}\le 0.03.
$$

Tier 1 requires provenance validity
$$
\#\{m:\rho_m\le 10^{-2}\}\ge 0.999M,
\qquad
\max_m\rho_m\le 5\times10^{-2},
\qquad
\frac{\#\{m:\theta_m>10^{-9}\}}{M}\le 10^{-6}.
$$

Tier 1 requires conservation control
$$
\epsilon_H\le \tau_H,
\qquad
\epsilon_P\le \tau_P,
\qquad
\epsilon_L\le \tau_L,
$$
where $\tau_H$, $\tau_P$, and $\tau_L$ are campaign-declared before the run and must be no looser than the tolerances used in the promoted claim packet.

Tier 1 requires branch persistence under refinement:
$$
\Delta_{\mathrm{root}}(\Delta t,\Delta t/2)=0,
\qquad
\Delta_{\mathrm{root}}(\Delta h,\Delta h/2)=0,
$$
except for entries explicitly classified as separator or fold-layer rows with nonzero inactive-gap certificates.

Tier 1 requires $\eta > 0$ continuation stability on a declared ladder $\eta_{m+1}=\eta_m/2$:
$$
E_\eta(Y;\eta_m,\eta_{m+1})\le \tau_{\eta,Y}
\quad\text{for every promoted observable }Y,
\qquad
\Delta_{\eta,\mathrm{root}}(\eta_m,\eta_{m+1})=0,
$$
unless the run is explicitly labeled as a finite-$\eta$ result and barred from $\eta\to0^+$ claims.

Tier 1 rejects a pipeline if the negative control also passes the convergence gates, because the null run must violate at least one expected invariant, provenance stability condition, or stability-window boundary by the margins named in [convergence-tests](../../../content/markdown/aaa/validation/simulations/convergence-tests.md).

## Proof-Certificate Handoff Contract

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
It must name the source certificate, initial history, analysis window, branch label, expected active-root classes, branch tolerances, convergence tolerances, regulator ladder, negative-control mutation, and required output channels before the run starts.

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
where $\mathcal{T}_{\eta}$ is present whenever the run crosses a fold-layer, separator, or active-root status window. Proof packets may consume a transition-sensitive run only if the simulation handoff carries the same transition record required by the run protocol.
It must state whether every expected active root was matched under $\Delta t$, $\Delta h$, and $\eta$ refinement, which residual component controls the verdict, and which artifact contains each value. A proof-program packet may cite a Tier 1 run only through this handoff; a plot, best-fit branch, or un-hashed table is not simulation support for a theorem target.

## Numerical Promotion Lemma

**Lemma (Simulation-promotion criterion).** Let $Q$ be a priority-theory claim whose variables are contained in $\mathcal{C}_{\mathrm{sim}}$, and let $R_1$ be a tier-1 continuation of a tier-0 candidate $R_0$. If $R_0$ satisfies the tier-0 acceptance criteria, $R_1$ satisfies the tier-1 acceptance criteria, the negative control fails as required, and the campaign satisfies
$$
\max_a\frac{\mathcal{E}_{\mathrm{ref},a}}{\tau_{\mathrm{ref},a}}\le 1,
\qquad
\max_a\frac{\mathcal{E}_{\mathrm{prov},a}}{\tau_{\mathrm{prov},a}}\le 1,
\qquad
\max_a\frac{\mathcal{E}_{\mathrm{cons},a}}{\tau_{\mathrm{cons},a}}\le 1,
\qquad
\max_a\frac{\mathcal{R}_{\mathrm{branch},a}}{\tau_{\mathrm{branch},a}}\le 1,
\qquad
\max_Y\frac{E_\eta(Y)}{\tau_{\eta,Y}}\le 1,
$$
with all tolerances declared before the run, then the result may be promoted from numerical candidate to simulation-supported priority claim for $Q$.

The vectors in the promotion lemma are
$$
\mathcal{E}_{\mathrm{ref}}=(E_{\mathrm{rel}}(\Phi),E_{\mathrm{rel}}(\|\nabla\Phi\|),p_{\mathrm{obs}},\epsilon_{\mathrm{self}}),
\qquad
\mathcal{E}_{\mathrm{prov}}=(D_W,D_{JS},\max_m\rho_m,\#\{m:\theta_m>10^{-9}\}/M),
\qquad
\mathcal{E}_{\mathrm{cons}}=(\epsilon_H,\epsilon_P,\epsilon_L).
$$

The promotion lemma does not convert a simulation-supported priority claim into an analytic theorem; it permits the claim to support proof-program routing, mass-map gating, master-equation closure tests, or validation-gate decisions only with the artifact hashes and failure-code ledger attached.

The promotion lemma fails if a promoted scalar, tensor, root count, branch label, stability gap, conservation quantity, or provenance distribution is selected after inspecting the output without a logged pre-run declaration, because that is $\mathsf{hidden\_tuning}$.

## $\eta > 0$ Regularization Package

The $\eta > 0$ package is the continuation contract
$$
\mathsf{Reg}_\eta=(\delta_\eta,\mathcal{A}_\eta,\mathsf{WP}_\eta,\mathsf{NR}_\eta,\mathsf{Cont}_\eta,\partial\mathcal{A}_\eta),
$$
where $\delta_\eta$ is the mollified causal-wake kernel, $\mathcal{A}_\eta$ is the admissible history set, $\mathsf{WP}_\eta$ is the existence-uniqueness statement, $\mathsf{NR}_\eta$ is the no-runaway bound, $\mathsf{Cont}_\eta$ is the continuation criterion, and $\partial\mathcal{A}_\eta$ is the failure boundary.

The admissible history set on $[0,T]$ is
$$
\mathcal{A}_\eta(T;V,d,\nu,B)
=
\left\{
S_{\eta,t}:
\sup_{t\le T}\|\mathbf{v}(t)\|\le V,\quad
\inf r_{ij,\ell}(t)\ge d,\quad
\inf|\partial_\tau g_{ij,\ell}(t)|\ge \nu,\quad
\sup B_{ij}^{\mathrm{active}}(t)\le B
\right\}.
$$

Existence and uniqueness for a campaign mean that for every declared initial history $S_{\eta,0}\in\mathcal{A}_\eta(T;V,d,\nu,B)$, the $\eta$-regularized delayed system has a unique solution $S_\eta(t)$ on $[0,T]$ in the declared history class, and the emitted root ledger is the ledger generated by that solution rather than by a post-hoc branch choice.

The no-runaway condition is
$$
E_{\text{tot}}^{(\eta)}(t)
=
K_{\mu}(t)+E_{\text{wake}}^{(\eta)}(t),
\qquad
E_{\text{wake}}^{(\eta)}(t)\ge U_{\min}^{(\eta)}>-\infty,
$$
which implies
$$
K_{\mu}(t)\le E_{\text{tot}}^{(\eta)}(0)-U_{\min}^{(\eta)}
$$
on every isolated run whose regularization preserves the relevant time-translation symmetry.

The continuation criterion is
$$
S_\eta([0,T])\subset\mathcal{A}_\eta(T;V,d,\nu,B)
\quad\Longrightarrow\quad
\text{the run may be extended past }T
$$
by the same local well-posedness constants after refreshing the history segment at $T$.

The failure boundary is
$$
\partial\mathcal{A}_\eta
=
\{\|\mathbf{v}\|=V\}
\cup
\{r_{ij,\ell}=d\}
\cup
\{|\partial_\tau g_{ij,\ell}|=\nu\}
\cup
\{B_{ij}^{\mathrm{active}}=B\}
\cup
\{E_{\text{wake}}^{(\eta)}\downarrow -\infty\},
$$
and crossing any component of $\partial\mathcal{A}_\eta$ changes the promotion status from pass to $\mathsf{eta\_continuation\_failure}$ unless a stricter replacement bound is proved in the same artifact packet.

The $\eta\to0^+$ claim boundary is
$$
\limsup_{\eta\to0^+}E_\eta(Y;\eta,\eta/2)=0
\quad\text{and}\quad
\limsup_{\eta\to0^+}\Delta_{\eta,\mathrm{root}}=0
$$
for every promoted observable and active branch ledger; otherwise the result remains finite-$\eta$ evidence only.

## Falsifiers

Mesh nonconvergence is the falsifier
$$
\mathsf{mesh\_nonconvergence}
\Longleftrightarrow
E_{\mathrm{rel}}(\Phi),\ E_{\mathrm{rel}}(\|\nabla\Phi\|),\ p_{\mathrm{obs}},
\text{ or stability-window shifts violate their tier threshold}.
$$

Branch-root instability is the falsifier
$$
\mathsf{branch\_root\_instability}
\Longleftrightarrow
\Delta_{\mathrm{root}}>0
\text{ under }\Delta t,\ \Delta h,\ \text{or }\eta\text{ refinement without a certified separator or fold-layer explanation}.
$$

Provenance discontinuity is the falsifier
$$
\mathsf{provenance\_discontinuity}
\Longleftrightarrow
D_W,\ D_{JS},\ \rho_m,\ \text{or }\theta_m
\text{ violates the provenance threshold}.
$$

Conservation drift is the falsifier
$$
\mathsf{conservation\_drift}
\Longleftrightarrow
\epsilon_H>\tau_H
\text{ or }
\epsilon_P>\tau_P
\text{ or }
\epsilon_L>\tau_L.
$$

Regulator dependence is the falsifier
$$
\mathsf{regulator\_dependence}
\Longleftrightarrow
\exists Y\ \text{promoted with}\ E_\eta(Y)>\tau_{\eta,Y}
\text{ or }\Delta_{\eta,\mathrm{root}}>0.
$$

Hidden tuning is the falsifier
$$
\mathsf{hidden\_tuning}
\Longleftrightarrow
\eta,\ \Delta t,\ \Delta h,\ \tau_{\mathrm{branch}},\ \tau_\eta,\ \mathsf{bc},\ \text{or promoted observable selection changes after output inspection without a logged pre-run declaration}.
$$

## Output Artifact Contract

A tier-0 artifact packet must contain `campaign.json`, `mesh.json`, `state_vector.json`, `root_ledger.json`, `branch_residuals.json`, `candidate_rows.csv`, `failure_codes.md`, and `promotion_gate.md`.

The tier-0 `root_ledger.json` must contain raw roots, active roots, excluded near-zero self roots, separator rows, branch Jacobians, branch classes, branch statuses, and the finite active count $B_{ij}^{\mathrm{active}}$ for each receiver-source pair.

The tier-0 `branch_residuals.json` must contain every component of $\mathcal{R}_{\mathrm{branch}}$, its tolerance, its role, its pass/fail status, and the exact failure code for any failed component.

A tier-1 artifact packet must contain the tier-0 packet hash, `run_metadata.json`, `u_now_provenance.csv` or `u_now_provenance.parquet`, `observables/phi_timeseries.csv`, `observables/grad_phi_timeseries.csv`, `convergence_table.csv`, `eta_ladder.csv`, `conservation_ledger.csv`, `cross_integrator_report.md`, `negative_control_report.md`, `failure_report.md`, and `promotion_lemma_check.md`.

The tier-1 plot contract requires `plots/convergence_phi.png`, `plots/convergence_grad_phi.png`, `plots/provenance_t_emit_distribution.png`, `plots/eta_ladder.png`, `plots/conservation_drift.png`, and one branch-ledger stability plot whose axes are the refinement level and matched active root count.

The tier-1 `failure_report.md` must exist even on pass and must report $\mathcal{F}=\mathsf{pass}$, the null-control verdict, the artifact hashes, the declared tolerances, and the statement that no promoted observable or tolerance was selected after output inspection.

The promotion artifact `promotion_lemma_check.md` must list the exact priority-theory claim $Q$, the variables of $Q$, the artifacts containing those variables, each inequality in the numerical promotion lemma, the pass/fail value of each inequality, and the resulting promotion status.

## Main Work

- Use the collinear-breather finite certificate as the smallest solver benchmark for candidate-cycle input, root enumeration, $\eta > 0$ continuation, monodromy, returned-history residuals, and topology reporting, with every failed row assigned one element of $\mathcal{F}$ and the exact failed inequality.
- Implement tier-0 and tier-1 simulations by instantiating $\mathcal{C}_{\mathrm{sim}}$ and satisfying the tier acceptance criteria above before any result is used in [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md) or the `validation/simulations/action-energy/*` material.
- Lock the maximum-curvature orbit, history resolution, and binary / nested shell braid stability numerically only when the branch-root ledger is stable under $\Delta t$, $\Delta h$, and $\eta$ refinement.
- Publish convergence plots and $\mathbb{U}_{\text{now}}$ provenance logs only as promotion artifacts paired with `convergence_table.csv`, `u_now_provenance.*`, `failure_report.md`, and `promotion_lemma_check.md`.
- Consolidate the formal $\eta > 0$ package by verifying $\mathsf{WP}_\eta$, $\mathsf{NR}_\eta$, $\mathsf{Cont}_\eta$, and $\partial\mathcal{A}_\eta$ for each promoted run family.
- Tie the Planck mapping back to the master equation only through simulation-supported priority claims whose variables are present in $\mathcal{C}_{\mathrm{sim}}$ and whose regulator-dependence row passes.
- Build any quick intuition tool for escaping potential versus frequency only as a non-promotional diagnostic unless it emits the campaign object, root ledger, convergence table, provenance log, and failure report.

## Related Priorities

- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [mass-map](../braid-mass-response-map/braid-mass-response-map.md)
- [dyadic-lock](../braid-dyadic-lock/braid-dyadic-lock.md)
- [quantum-closure](../quantum-closure/quantum-closure.md)
- [strong-field-closure](../strong-field-closure/strong-field-closure.md)

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md)
- [convergence-tests](../../../content/markdown/aaa/validation/simulations/convergence-tests.md)
- [synthetic-observables](../../../content/markdown/aaa/validation/simulations/synthetic-observables.md)
- [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md)
- [planck-scale-nested-shell-braid-alignment](../../../content/markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md)
