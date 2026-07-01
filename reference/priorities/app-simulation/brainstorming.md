# App Simulation Brainstorming

This file preserves ideas and insights that are working toward promotion to an existing or new document or app.

## Routing Rules

- Keep loose ideas here until they have a concrete promotion target, claim level, and owner.
- Promote material into the control file only when it becomes a queue item, proof route, app task, or document/app destination.
- Keep speculative notes claim-limited and identify the existing or new document or app they may support.

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
