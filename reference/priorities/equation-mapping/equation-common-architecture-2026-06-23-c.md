# Equation Common Architecture 2026-06-23 C

## Workstream Metadata

- Kind: `priority`
- Status: `priority-only`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Prior pass: [Equation Closure Pass 2026-06-23 B](equation-closure-pass-2026-06-23-b.md)
- Claim level: second-pass common-architecture note for reusable equation components
- Edit boundary: this file only

## Purpose

This note identifies equation components that recur across the equation-mapping packets and could become useful equations, residuals, records, or operators in their own right. It is internal priority material. It does not promote any packet into reader-facing corpus prose and does not change any `6/23 b` score.

The packet set is already converging on one architecture:

$$
\text{retained causal-root and branch record}
\rightarrow
\text{Noether sea projection}
\rightarrow
\text{event or observer projection}
\rightarrow
\text{standard-equation residual}.
$$

The common components below should be treated as reusable mathematical objects, not as new gate proliferation. Each one earns its value only when it reduces hidden retuning, makes a shared carrier explicit, or supplies a first proof or simulation target for multiple equation groups.

## Source Basis

Packets inspected for this second pass:

- [EQ-01 And EQ-05 Root-Conservation Closure Packet](eq-01-05-root-conservation-packet.md)
- [EQ-02 Through EQ-04 Lorentz-Energy Closure Packet](eq-02-04-lorentz-energy-packet.md)
- [EQ-06, EQ-24, And EQ-25 Continuum, Medium, And Thermodynamic Closure Packet](eq-06-24-25-continuum-medium-thermo-packet.md)
- [EQ-07 Through EQ-10 And EQ-17 Through EQ-19 Effective Metric / Cosmology Packet](eq-07-10-17-19-effective-metric-cosmology-packet.md)
- [EQ-11 And EQ-20 Gravity / Dark-Energy Packet](eq-11-20-gravity-dark-energy-packet.md)
- [EQ-12 Through EQ-16A Photon, Quantum, Gauge, And Neutrino Packet](eq-12-16a-photon-quantum-gauge-neutrino-packet.md)
- [EQ-21 Through EQ-23 And EQ-32 Structure/CMB/BBN/RAR Packet](eq-21-23-32-structure-cmb-bbn-rar-packet.md)
- [EQ-21 Through EQ-23 And EQ-32 Shared Observation Residual Packet](eq-21-23-32-shared-observation-residual-packet.md)
- [EQ-26 Through EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md)
- [Equation-Map Bearing On Braid Configuration Search](../braid-retained-branch-closure/equation-map-bearing-on-braid-configuration-search.md)

The unpacketed inventory rows also matter architecturally:

- `EQ-01` supplies the native causal wake and causal-root dependency that later maps must not bypass.
- `EQ-05` supplies the finite-window conservation and event-ledger grammar.
- `EQ-11` is the Poisson/Einstein-limit consumer of the shared Noether sea constitutive state and observer-level metric projection.
- `EQ-20` is the pressure and effective $\Lambda$ consumer of the same constitutive state.

## Common Component 0: Compact Carrier And Row Projections

### Candidate Equation Form

For a tightly coupled packet $G$, define a compact carrier $\mathcal C_G$ before defining the full retained record $\Theta_G$:

$$
\mathcal C_G
=
\left(
\mathcal L_{\mathrm{branch}},
\mathcal N_{\mathrm{sea}},
\mathcal L_{\mathrm{root}},
\mathcal L_{\mathrm{wake}},
\mathcal L_{E\mathbf p\mathbf J}
\right)_G,
\qquad
\Theta_G
=
\left(
\mathcal C_G,
\mathcal E_G,
\mathcal M_G,
\Pi_{\mathrm{obs},G}
\right).
$$

Rows that are native to the branch or event ledger read from projections of $\mathcal C_G$; rows that need exposure, dressed medium response, or detector/readout rows read from projections of $\Theta_G$:

$$
\mathcal R_G(\Theta_G)
=
\left(
R_i\!\left[\Pi_i\mathcal C_G\right],
R_j\!\left[\Pi_j\Theta_G\right]
\right)_{i,j\in G}.
$$

The retune witness then has a simple first check: overlapping variables in $\Pi_i\mathcal C_G$ and $\Pi_j\mathcal C_G$ must be identical before any residual norm is interpreted as physical closure.

### Equations It Connects

- `EQ-02` through `EQ-04`: the translating-binary packet now specializes this as $\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)$ before assembling $\Theta_{02\text{-}04}^{\mathrm{bin}}(u)$.
- `EQ-07` through `EQ-11`, `EQ-17` through `EQ-20`, and `EQ-32`: weak-field, redshift, cosmology, and low-acceleration rows need the same compact Noether sea carrier before metric, pressure, and observation projections are compared.
- `EQ-12`, `EQ-16`, `EQ-26`, `EQ-28`, and `EQ-29`: photon, reaction, atomic, recoil, and radiation rows need a compact event carrier before source, path, receiver, remnant, and detector rows are allowed to differ.
- `EQ-14`, `EQ-25`, `EQ-30`, and `EQ-31`: probability, entropy, cross-section, and resonance rows need a finite-window measure carrier before statistical projections are interpreted as independent observables.

### AAA Carrier Variables

The reusable carrier variables are the branch label, active causal-root ledger, wake ledger, finite-window event ledger, local Noether sea state, retained branch chart, boundary history, exposure quotient, medium-response tensor, detector/readout kernel, and observer projection.

### Architectural Clarification

This factorization is a notation discipline with mathematical consequences. It keeps the common part visible before residuals are written, and it prevents a packet from hiding row-specific branch charts, Noether sea cells, speed conventions, exposure coefficients, or detector kernels behind a single large $\Theta$ symbol.

For the precision packet, the finite event or observation record $\mathsf e$ is the compact event carrier. Statistical rows then add the finite-window measure carrier from Common Component 8 before cross sections, detector rates, or resonance widths are interpreted as physical residuals.

Notation alone is never score evidence. For retained-domain rows, the populated projections must actually glue over the shared carrier; for finite-window rows, at least one refinement or covariance theorem must hold on the populated retained object.

### Proof Or Simulation Burden

Each grouped packet should identify its smallest useful $\mathcal C_G$ and list the projections consumed by each row. A packet should not receive a score increase merely for naming $\mathcal C_G$; the score rises only when the populated carrier, residuals, and split/retune witnesses reduce the actual closure burden.

## Common Component 0B: Retained Event Or Positive-Width Domain

### Candidate Equation Form

The current executable reducers all ask for the same intermediate object: a retained event or positive-width domain carrier that binds a row set before any projection residual is interpreted. For a row family $R$, use the working priority-only notation

$$
\mathfrak D_R
=
\left(
\mathsf D,\,
\Theta_D,\,
S_D,\,
\iota_D,\,
\{\Pi_r\}_{r\in R},\,
\mathcal R_D
\right),
$$

where $\mathsf D$ is either a finite event $\mathsf e$ or a positive-width retained window/domain, $\Theta_D$ is the retained record on that support, $S_D$ is the retained row set, $\iota_D$ preserves raw row identity, inventory, and role or quotient policy, $\Pi_r$ are the declared row projections, and $\mathcal R_D$ combines same-record, no-hidden-retune, conservation/projection, and lane residuals.

The row-identity predicate is then

$$
\operatorname{RowId}_R(\mathfrak D_R)
=1
\quad\Longleftrightarrow\quad
\forall r_i,r_j\in R,\;
\iota_D(r_i)=\iota_D(r_j)
\;\text{on every retained overlap row}
\;\text{and}\;
\mathcal R_D
\text{ has zero split and hidden-retune witnesses}
$$

with row-specific residuals read only after this predicate passes or after the missing rows are explicitly reported.

The current fail-closed reducers also expose the same acceptance-vector structure. For the row family $R$, use the working priority-only notation

$$
\mathbf A_R(\mathfrak D_R)
=
\left(
A_D,\,
A_{\iota},\,
\{A_r\}_{r\in R},\,
A_{\mathrm{src}},\,
A_{\mathrm{overlap}},\,
A_{\mathrm{split}},\,
A_{\mathrm{retune}},\,
A_{\mathrm{lane}}
\right),
$$

where $A_D$ is retained support acceptance, $A_{\iota}$ is raw row identity/inventory preservation, $A_r$ is row-level accepted concrete source-backed binding, $A_{\mathrm{src}}$ is durable evidence resolution, $A_{\mathrm{overlap}}$ is overlap-preimage consistency, $A_{\mathrm{split}}$ and $A_{\mathrm{retune}}$ are zero split and hidden-retune witnesses, and $A_{\mathrm{lane}}$ is the row-family residual after support and rows are accepted. The first-blocker operator

$$
B_R(\mathfrak D_R)
=
\min_{\prec_R}
\left\{
x\in\operatorname{coords}\mathbf A_R:
A_x(\mathfrak D_R)=0
\right\}
$$

uses the reducer's declared row order $\prec_R$. The same structure explains why $S_{\mathrm{eq}}$, $\Theta_{\mathrm{sea}}^{(\ell,W)}$, $\mathsf e_{\gamma e}^{0}$, and $\mathcal C_{\mathrm{stat}}^{W,T}$ can all fail closed without score movement while still giving a useful next row to populate.

### Equations It Connects

- `EQ-02` through `EQ-04`: $\mathfrak D_R$ carries $S_{\mathrm{eq}}$ and is the missing retained event or positive-width domain behind `same_branch_chart_identity`.
- `EQ-12`, `EQ-26`, `EQ-28`, and `EQ-29`: $\mathfrak D_R$ carries $\mathsf e_{\gamma e}^{0}$ and is the native Compton/recoil event ledger before photon, recoil, angular-momentum, and source-mechanism projections are read.
- `EQ-06`, `EQ-07` through `EQ-11`, `EQ-20`, `EQ-24`, and `EQ-32`: $\mathfrak D_R$ carries $\Theta_{\mathrm{sea}}^{(\ell,W)}$ and is the retained Noether sea window before a density-compression coefficient is allowed to project into speed, stress, metric, pressure, or low-acceleration outputs.

### AAA Carrier Variables

The shared carrier variables are event/domain identity, support interval or point-event certificate, retained raw labels, branch or channel inventory, causal-root ledger, path-history rows, wake-tail rows, energy/action rows, momentum and angular-momentum rows, Noether sea state, projection maps, explicit missing-output rows, and split/retune witnesses.

### Architectural Clarification

This component is a shared acceptance object, not a new ontology term. Its purpose is to stop current proxy alignment from masquerading as retained closure. A solver report may show that many reduced rows point to the same candidate row set; it still fails $\operatorname{RowId}_R(\mathfrak D_R)$ until the retained event or positive-width domain binds the row support and the split/retune witnesses vanish.

### Proof Or Simulation Burden

The first lemma target is a projection-identity lemma:

$$
\operatorname{RowId}_R(\mathfrak D_R)=1
\;\Longrightarrow\;
\Pi_a\Theta_D\cap\Pi_b\Theta_D
\text{ share the same preimage under }\iota_D
\text{ on every overlap row.}
$$

For the `S_eq` fixture this lemma has a cleaner fiber-product form. Let $\mathcal C_u$ be the common translating-binary carrier used by the clock, envelope, two-way signal, energy, momentum, phase, and Noether sea rows. The retained-domain record should be

$$
\Theta_D
=
\Theta_{\mathrm{clock}}
\times_{\mathcal C_u}
\Theta_{\mathrm{env}}
\times_{\mathcal C_u}
\Theta_{\mathrm{tw}}
\times_{\mathcal C_u}
\Theta_E
\times_{\mathcal C_u}
\Theta_{\mathbf p}
\times_{\mathcal C_u}
\Theta_{\mathrm{phase}}
\times_{\mathcal C_u}
\Theta_{\mathrm{sea}}.
$$

Then $A_{\mathrm{split}}=1$ is not just a separate bookkeeping witness. It is the assertion that the legs glue as the fiber product over $\mathcal C_u$ rather than as separately tuned projections inside a product space. In this interpretation, $\mathbf A_R(\mathfrak D_R)=\mathbf 1$ proves that the fiber-product legs are nonempty, source-backed, and bound to the same retained domain, which makes the row-identity conclusion a universal-property consequence rather than a row-label convention.

If the overlap preimage is absent or inconsistent, the run is a split-domain or hidden-retune failure. The first executable target is not another summary checker. It is a minimal retained input packet for one lane: either $S_{\mathrm{eq}}$ with a retained point event or positive-width domain, $\mathsf e_{\gamma e}^{0}$ with native photon/recoil rows, or $\Theta_{\mathrm{sea}}^{(\ell,W)}$ with a retained coefficient row. A failure of this object should name which row binding breaks first instead of lowering the score silently or allowing a private fit.

## Common Component 0A: Equation-Bearing Configuration Search Vector

### Candidate Equation Form

For a retained tri-binary candidate $\mathfrak a$ generated from a branch state $B_{3B}(q,v)$, route equation-map pressure into the branch-selection law through

$$
B_{3B}(q,v)
\longrightarrow
\mathcal A_N(B^-,\Gamma_{\mathrm{coupl}},W)
\longrightarrow
\operatorname{Sel}_B
\longrightarrow
\mathcal R_{\mathrm{cfg}}(\mathfrak a).
$$

The equation-bearing configuration residual is

$$
\mathcal R_{\mathrm{cfg}}(\mathfrak a)
=
\left(
R_{\mathrm{root}},
R_{\mathrm{geo/E}},
R_{\mathrm{phase}},
R_{\mathrm{event}},
R_{\mathrm{spin/exposure}},
R_{\mathrm{precision}},
R_{\mathrm{obs}}
\right).
$$

This vector is a solver-routing object, not a new score gate. Its job is to prevent a frequency-ratio match from being mistaken for retained-branch closure.

### Equations It Connects

- `EQ-01` and `EQ-05`: same-root identity, active-root coverage, Jacobian floors, finite-window conservation, and event-ledger checks.
- `EQ-02` through `EQ-04`: clock period, oblate geometry, two-way leakage, exposed mass, energy/radius, mass-shell, and retune rows.
- `EQ-16A`: common clock plus residual phase-operator checks for the equal-frequency candidate.
- `EQ-12`, `EQ-28`, and `EQ-29`: photon, recoil, radiation, wake, and same-event energy-routing rows.
- `EQ-15`, `EQ-27`, `EQ-30`, and `EQ-31`: later spinor, magnetic, scattering, and branch-stability discriminators once the root and event rows survive.

### Candidate Families

The active role-assigned frequency families are $(I,M,O)=(f+2,f,f-1)$, $(I,M,O)=(f+1,f,f-1)$, $(I,M,O)=(f,f,f)$, $(I,M,O)=(4f,2f,f)$, and $(I,M,O)=(nf,mf,f)$. These are inputs to the retained-record evaluator. They should not be ranked ahead of the retained root, geometry/energy, phase, event, wake/recoil, stability, and observation residuals.

### Architectural Clarification

This component keeps the solver general. The frequency family is an input coordinate; the architecture remains the velocity-deforming tri-binary Noether braid branch state with effective lever arms, phase offsets, branch angular momenta, wake rows, principal-direction rows, and coupling rows. Flattened circular rows are projection views of that object, not the model itself.

### Proof Or Simulation Burden

The first executable hook is now an `equationBearing` payload on each tri-binary candidate branch-chart projection. It reports the candidate family, raw binary frequency row, role-assigned $I:M:O$ row, root signature, geometry/energy residual, common-clock phase residual, event-ledger residual, stability residual, and precision/readout residual. Missing fields fail closed unless they are explicitly outside the candidate's declared comparison scope. The hook does not certify a retained branch; it makes the branch-selection solver consume the same residual architecture as the equation map.

## Common Component 1: Same-Record / No-Hidden-Retune Residual

### Candidate Equation Form

For a retained record $\Theta$ and observable rows $X_i$, define a shared-record residual

$$
\mathcal R_{\mathrm{shared}}(\Theta;\{X_i\})
=
\sum_i
w_i
\left\|
F_i[\Pi_i\Theta]-X_i^{\mathrm{obs}}
\right\|_{C_i^{-1}}^2
+
\lambda_{\mathrm{retune}}
\mathcal S_{\mathrm{retune}}(\Theta)
+
\lambda_{\mathrm{split}}
\sum_{i<j}
d_{\mathrm{shared}}
\left(
\Pi_i\Theta,
\Pi_j\Theta
\right).
$$

Here $\Pi_i$ is the declared projection consumed by observable row $i$, $\mathcal S_{\mathrm{retune}}$ penalizes independent retuning of branch, Noether sea, clock, response, or detector rows, and $d_{\mathrm{shared}}$ measures whether overlapping carrier variables actually agree.

### Equations It Connects

- `EQ-02` through `EQ-04`: clock, oblate spheroidal envelope, two-way signal, energy, momentum, mass-shell, rest-invariance, and Noether sea response residuals.
- `EQ-07` through `EQ-11` and `EQ-17` through `EQ-20`: weak-field metric, redshift factorization, PPN, effective FRW, Friedmann, continuity, Poisson/Einstein-limit, and pressure rows.
- `EQ-12` through `EQ-16A`: photon, Maxwell, Born-current, spinor, gauge, and neutrino rows through one finite-window sector record.
- `EQ-21` through `EQ-23` and `EQ-32`: growth, CMB, BBN, and RAR/BTFR projections through the split-state witness.
- `EQ-26` through `EQ-31`: precision rows where one event or observation record must feed the benchmark residual vector. In particular, `EQ-27` compares $\{\boldsymbol\mu_\ell,\omega_c,\omega_L,a_\ell\}$, `EQ-30` compares $\{\sigma_{a\to b},F_{\mathbb{A}\mathbb{A}\mathbb{A}}(\mathbf q)\}$, and `EQ-31` compares $\{\Gamma,\tau,B_k,\sigma(E)\}$ only after the shared carrier is declared.
- `EQ-06`, `EQ-24`, and `EQ-25`: continuum, medium, and thermodynamic rows where the same retained Noether sea record must support density, cadence, response, and statistical laws.

### AAA Carrier Variables

The shared carriers are branch label $q$, retained branch ledger $\mathcal L_{\mathrm{branch}}$, local Noether sea state $\mathcal N_{\mathrm{sea}}$, $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, $\Gamma_N$, $\mathbf u_{\mathrm{sea}}$, $\mathcal M_{\mathrm{sea}}^{ab}$, event ledger $\mathcal L_{E\mathbf p\mathbf J}$, sector projection $\Pi_S$, quotient $Q_S$, detector/readout kernel $K_{\mathrm{det}}$, source-window record $\Theta_{\mathrm{src}}$, readout record $\Theta_{\mathrm{read}}$, and thermal/provenance residual $\mathcal R_{\mathrm{therm/prov}}$ where applicable.

### Architectural Clarification

This is the strongest common equation. It says equation recovery is not formula matching. A standard equation row becomes meaningful only when the same retained record feeds all observables that claim to be one physical regime. It also gives a single place to express `equation_map.hidden_retune`.

### Proof Or Simulation Burden

The coordinator should first define $d_{\mathrm{shared}}$ for overlapping variables and $\mathcal S_{\mathrm{retune}}$ for changed records. The first executable tests should be:

- the translating binary residual for `EQ-02` through `EQ-04`;
- a weak solar-system window plus one spectral family for `EQ-07` through `EQ-10` and `EQ-17`;
- a shared growth/CMB/BBN/RAR record for `EQ-21` through `EQ-23` and `EQ-32`, with [shared-observation-residual.mjs](../../../scripts/equation-mapping/shared-observation-residual.mjs) now serving as the score-neutral first-blocker checker;
- a Compton/recoil event record for the precision packet.

## Common Component 2: Projection And Refinement Residual

### Candidate Equation Form

For a retained finite window $W(t)$, smoothing scale $\ell$, and projection $\Pi_a^\ell$, let

$$
M_a^\ell=\Pi_a^\ell\Theta_W,
\qquad
J_a^\ell=\Pi_{J,a}^\ell\Theta_W,
$$

and define

$$
\mathcal E_a^\ell
=
\partial_tM_a^\ell
+
\nabla\cdot J_a^\ell
-
S_a^\ell.
$$

The reusable projection residual is

$$
\mathcal R_{\mathrm{proj}}^X(\Theta_W,\ell)
=
\max_a
\frac{
\left\|\mathcal E_a^\ell\right\|
}{
\left\|\partial_tM_a^\ell\right\|
+
\left\|\nabla\cdot J_a^\ell\right\|
+
\left\|S_a^\ell\right\|
+
\varepsilon
}.
$$

A refinement row should report whether $\mathcal R_{\mathrm{proj}}^X$ decreases when $\ell$, retained braid inventory, causal-wake memory, and boundary/event records are refined.

### Equations It Connects

- `EQ-06`: density, cadence, and moment continuity.
- `EQ-24`: acoustic, elastic, stress-strain, and metric-like medium coefficients.
- `EQ-25`: deterministic pushforward, Boltzmann-like operator, entropy balance, and fluctuation rows.
- `EQ-14`, `EQ-30`, and `EQ-31`: record-current, cross-section, form-factor, and resonance-width statistics as projections of deterministic branch ensembles.
- `EQ-21` through `EQ-23`: transfer functions, CMB spectra, BBN yields, and growth residuals as projections of one source/path/thermal record.
- `EQ-07` through `EQ-10`: effective metric rows as projections from Noether sea state, not as substrate geometry.

### AAA Carrier Variables

The carriers are $\Theta_{\mathrm{sea}}^{(\ell,W)}$, $W_\ell$, $\Lambda_k$, $\mathbf X_k$, $\dot{\mathbf X}_k$, $E_k$, $\nu_{N,k}$, causal-wake histories $\mathcal H_k$, boundary history $\mathcal H_{\partial W}$, deterministic flow $\Phi_{\Delta t}$, projection $\Pi_{\mathcal Q,W}$, finite-window measure $\mu$, and detector/readout kernel $K_{\mathrm{det}}$.

### Architectural Clarification

This component separates substrate variables from observer variables. Continuum fields, probability densities, cross sections, transfer functions, thermodynamic laws, and metric variables are accepted only as declared projections with residuals and refinement behavior.

### Proof Or Simulation Burden

The first burden is the density-and-cadence projection lemma from `EQ-06`, because it feeds medium response, redshift clocks, CMB thermalization, and thermodynamic transport. A second burden is one finite-window pushforward calculation where the projected residual decreases under refinement rather than merely changing notation.

## Common Component 3: Finite-Window Event Ledger And Conservation Residual

### Candidate Equation Form

For an event or finite observation record $\mathsf e$, use

$$
\mathcal L_{E\mathbf p\mathbf J}(\mathsf e)
=
\left(
\Delta_E,
\Delta_{\mathbf p},
\Delta_{\mathbf J},
\Delta_{\mathrm{pol}},
\Delta_{\mathrm{arch}},
\Delta_{\mathrm{path}},
\Delta_{\mathrm{med}},
\Delta_{\mathrm{rem}}
\right)(\mathsf e).
$$

The finite-window conservation residual can be stated as

$$
\mathcal R_{\mathrm{evt}}(\mathsf e)
=
\left\|
\mathcal L_{E\mathbf p\mathbf J}(\mathsf e)
\right\|_W
+
\mathcal R_{\mathrm{boundary}}
+
\mathcal R_{\mathrm{identity}}
+
\mathcal R_{\mathrm{wake}}.
$$

For pure conservation rows, the `EQ-05` energy residual is the same pattern:

$$
\mathcal R_E
=
\frac{
\left|
E(t_f)-E(t_i)-W_{\partial\Omega}-W_{\mathrm{event}}
\right|
}{
|E(t_i)|+|E(t_f)|+\varepsilon_E
}.
$$

### Equations It Connects

- `EQ-05`: finite-window energy, momentum, angular momentum, action, wake flux, Noether sea exchange, recoil, and boundary residuals.
- `EQ-12`, `EQ-13`, and `EQ-28`: photon energy, null transport, Maxwell summary, Compton, photoelectric, pair-threshold, and recoil rows.
- `EQ-22`, `EQ-23`, and `EQ-25`: CMB thermalization, BBN source windows, photon loading, neutrino handoff, entropy, and thermalization depth.
- `EQ-26` through `EQ-31`: atomic transitions, magnetic precession, radiation source packets, scattering statistics, resonance widths, and branching fractions.
- `EQ-16`: reaction provenance for Standard Model-facing events.
- `EQ-17`: segment-level frequency-transfer energy exchange.

### AAA Carrier Variables

The carriers are active causal roots, wake ledger $\mathcal L_{\mathrm{wake}}$, source depletion, receiver capture, recoil, remnant, medium update, Noether sea state, identity routing, polarity rows, photon Gate A/B/C rows, branch-event provenance, and boundary flux.

### Architectural Clarification

This component makes conservation and identity routing the common precondition for precision equations. Standard formulas such as $E=h\nu$, Compton shift, radiation power, blackbody recovery, cross sections, and resonance widths become benchmark readouts only after the finite event ledger closes.

### Proof Or Simulation Burden

The best first simulation is a replayable Compton/recoil packet. It is compact, uses photon Gate A/B, exposed mass response, recoil, angular momentum, and event balance, and it also checks whether the same $h$, $c_\gamma$, and exposed mass response used by atomic spectra survive in an event ledger.

The main child components to keep synchronized with this row are `same_root_conservation_checksum`, `flux_boundary_balance_equation`, `wake_energy_crosswalk_residual`, `ledger_transition_gauge_matching`, and the photon Gate A/B/C handoff rows. They remain child components of the finite-window event and conservation residual, not separate score gates.

The score-neutral executable checker is now [finite-window-conservation-residual.mjs](../../../scripts/equation-mapping/finite-window-conservation-residual.mjs). Its current attempt fixture [finite-window-conservation-attempt.v1.json](../../../scripts/equation-mapping/finite-window-conservation-attempt.v1.json) reports `blocked_missing_rows`, `scoreDecision: no_score_increase`, and first blocker `missing_accepted_branch_chart` while the same-root, energy, momentum, angular-momentum, event-ledger, boundary-flux, wake-crosswalk, and no-double-count numeric diagnostics pass. This is the intended current disposition: the conservation residual is executable, but `EQ-05` cannot reach `5` until the branch chart and row provenance are accepted.

The Compton/recoil replay checker now also exposes the `EQ-13` effective EM gate projection on the same event carrier. Its `effectiveEmGate` block reports `blocked_missing_native_event_rows` and first blocker `missing_accepted_photon_gate_A_input_output` while the numeric gate residuals pass. This keeps Maxwell-level continuity, stress, gauge, and Gate C language downstream of the finite event ledger rather than letting an imported field equation bypass the photon/recoil record.

## Common Component 4: Source-Path-Receiver Frequency Transfer

### Candidate Equation Form

The redshift packet already supplies the reusable signed transfer operator:

$$
Z_X[\Theta]
\equiv
\ln(1+z_X)
=
\ln\Gamma_{N,E}
-
\ln\Gamma_{N,R}
+
Y_{X,E\to R}
-
\ln B_X(E)
-
\ln D_v.
$$

Equivalently,

$$
\nu_R
=
\nu_E\exp(-Z_X[\Theta])
+
r_{\nu,X}.
$$

### Equations It Connects

- `EQ-17`: gravitational, Doppler, source, and path-history redshift factorization.
- `EQ-12`: photon packet source-path-receiver transfer, $E=h\nu$, and null/eikonal comparison.
- `EQ-22`: CMB source-to-observer thermal, frame, path, and blackbody transfer rows.
- `EQ-26`: atomic transition frequency readout, local clock/rate conversion, and photon-channel speed.
- `EQ-28` and `EQ-29`: recoil and radiation frequency changes with event-ledger closure.
- `EQ-07` and `EQ-08`: endpoint clock and cadence extraction through $\Gamma_N$.

### AAA Carrier Variables

The carriers are endpoint cadence rows $\Gamma_{N,E}$ and $\Gamma_{N,R}$, source branch factor $B_X(E)$, launch or relative-motion factor $D_v$, path-history propagation $Y_{X,E\to R}$, photon-channel delay $\chi_\gamma$, Noether sea delay factor $\chi_{\text{sea}}$, source/remnant rows, receiver coupling, and segment energy-exchange residuals.

### Architectural Clarification

This component prevents frequency change from collapsing into one fitted redshift factor or phenomenological photon frequency loss. It also connects local precision rows to cosmology: an atomic line, a photon transfer, a CMB path, and a Compton event all need compatible clock, source, path, and receiver rows.

### Proof Or Simulation Burden

The first proof route should choose one clean case: endpoint gravitational redshift, Doppler launch, or Compton/recoil. The record must show which terms belong to endpoint cadence, source branch shift, launch geometry, path-history transport, recoil, remnant, and Noether sea update.

The score-neutral executable checker is now [signed-frequency-transfer-ledger.mjs](../../../scripts/equation-mapping/signed-frequency-transfer-ledger.mjs). Its current attempt fixture [signed-frequency-transfer-attempt.v1.json](../../../scripts/equation-mapping/signed-frequency-transfer-attempt.v1.json) reports `blocked_missing_rows`, `scoreDecision: no_score_increase`, and first blocker `missing_accepted_theta_transfer` while the signed budget, receiver-frequency, segment-energy, path-quality, and no-hidden-retune numeric diagnostics pass. This is the intended current disposition: the transfer equation is executable, but `EQ-17` cannot rise until one source-backed transfer record binds endpoint cadence, source branch, launch geometry, path-history propagation, event ledger, and path-quality rows.

## Common Component 5: Common Clock Plus Residual Phase Operator

### Candidate Equation Form

For rows where a large common clock is not directly observable, use

$$
H_X(\Theta)
=
\omega_{\mathrm{clk}}C_X\mathbf 1
+
\delta H_X(\Theta),
\qquad
\bar H_X
=
\delta H_X
-
\frac{1}{N_X}\operatorname{tr}(\delta H_X)\mathbf 1,
\qquad
\Delta\omega_{ij}
=
\lambda_i(\bar H_X)
-
\lambda_j(\bar H_X).
$$

For the neutral-lepton packet this specializes to

$$
H_{3B}^{(\nu)}
=
\omega_f C_0\mathbf 1
+
\delta H_{3B}
\left(
\rho_a,\phi_a,W_a,L_{\mathrm{wake}},L_{\mathrm{coupling}},\mathcal L_{\mathrm{root}}
\right).
$$

A reusable residual is

$$
\mathcal R_{\mathrm{phase}}
=
w_{\mathrm{gap}}
\left|
\frac{
|\Delta\lambda_{3\ell}|/\Delta\lambda_{21}
-33
}{33}
\right|
+
w_{\mathrm{add}}
\left|
\Delta\lambda_{31}
-
\Delta\lambda_{32}
-
\Delta\lambda_{21}
\right|
+
w_{\mathrm{zero}}
\left\|\bar H_X\right\|_{\mathrm{fail}}
+
w_{\mathrm{inv}}
\mathcal I_{\mathrm{hidden}}.
$$

The hidden-frequency invariance check $\mathcal I_{\mathrm{hidden}}$ requires observable gaps and probabilities to be invariant under

$$
H_X\mapsto H_X+\alpha\mathbf 1,
$$

while still rejecting the all-zero residual case $\bar H_X=0$ when measured beat frequencies exist.

### Equations It Connects

- `EQ-16A`: equal-frequency tri-binary candidate, neutrino oscillation phase gaps, and PMNS readout.
- `EQ-08` and `EQ-17`: clock/cadence extraction and endpoint redshift.
- `EQ-12` and `EQ-26`: photon frequency, atomic transition rates, and local clock/rate conversion.
- `EQ-14` and `EQ-15`: record-facing phase evolution and spinor/ordered-frame rows when observer wave equations are used as downstream charts.

### AAA Carrier Variables

The carriers are retained equal-frequency row set $S_{\mathrm{eq}}$, common frequency $\omega_f$, phase offsets $\phi_a$, effective lever arms $\rho_a$, retained weights $W_a$, wake/coupling angular-momentum transfer, causal-root ledger, $\Gamma_N$, $f_N$, $\chi_{\text{sea}}$, weak-coupling exposure, PMNS readout, and local Noether sea matter response $V_{\mathrm{sea}}(n(\mathbf x,t))$.

### Architectural Clarification

This component distinguishes common phase or clock rows from observable beat rows. It protects the equal-frequency idea from three errors: treating three absolute clocks as observables, allowing exact cancellation to erase the residual phase operator needed for measured gaps, or confusing static phase offsets with phase-rate gaps.

### Proof Or Simulation Burden

The first burden is a retained neutral-lepton phase-operator packet that produces a doublet-plus-singlet residual spectrum without fitting three absolute frequencies. It must keep source flavor, propagation eigenbasis, detector readout, weak exposure, energy, momentum, angular momentum, wake/coupling transfer, and Noether sea state on one branch record.

## Common Component 6: Noether Sea Constitutive State And Response Kernel

### Candidate Equation Form

Use a single constitutive state map

$$
\mathcal C_{\mathrm{sea}}:
\Theta_{\mathrm{sea}}
\mapsto
\left(
\chi_{\text{sea}},
\Gamma_N,
\mathcal M_{\mathrm{sea}}^{ab},
\Sigma_{\mathrm{sea},X}^{ab},
\chi_{AB},
N,
e^a{}_i,
\gamma_{ij},
\Phi_{\mathrm{eff}},
G_{\mathrm{eff}},
P_{\mathrm{eff}},
\Lambda_{\mathrm{eff}},
a_\star,
c_X
\right),
$$

where

$$
\Theta_{\mathrm{sea}}
=
\left(
\rho_{\text{NS}},
n,
\mathbf u_{\mathrm{sea}},
e_{\mathrm{sea}},
\boldsymbol\theta_{\mathrm{sea}},
f_N,
\mathcal L_{E\mathbf p\mathbf J}^{(W)}
\right).
$$

For perturbation and material channels, the local response kernel is

$$
\delta Y_A(\omega,\mathbf k)
=
\sum_B
\chi_{AB}(\omega,\mathbf k)
\delta X_B(\omega,\mathbf k)
+
R_A^\chi.
$$

The delayed-support or causal-analyticity residual remains

$$
\mathcal R_{\mathrm{KK}}(\chi_{AB})
=
\frac{
\left\|
\operatorname{Re}\chi_{AB}(\omega)
-
\mathcal H(\operatorname{Im}\chi_{AB})(\omega)
\right\|_\omega
}{
\left\|\operatorname{Re}\chi_{AB}\right\|_\omega
+
\left\|\mathcal H(\operatorname{Im}\chi_{AB})\right\|_\omega
+
\varepsilon
}.
$$

The gravity/dark-energy packet uses the same constitutive component through

$$
\mathcal R_{11\text{-}20}(\Theta;W_{\mathrm{weak}},W_{\Lambda})
=
\lambda_\Phi
\left\|R_\Phi^{11}\right\|^2
+
\lambda_{\mathrm{curv}}
\left\|R_{\mu\nu}^{11}\right\|^2
+
\lambda_p
\left\|R_p^{20}\right\|^2
+
\lambda_G
\left\|R_G^{\mathrm{shared}}\right\|^2
+
\lambda_{\mathrm{retune}}
\mathcal S_{\mathrm{retune}}^{11\text{-}20}.
$$

Here $R_G^{\mathrm{shared}}$ and $\mathcal S_{\mathrm{retune}}^{11\text{-}20}$ are not independent cosmology handles. They are checks that local gravity, pressure, growth, CMB lensing, RAR/BTFR, and Friedmann bookkeeping consume one compatible $\mathcal C_{\mathrm{sea}}$ record.

### Equations It Connects

- `EQ-04`: mass, rest response, moving energy, and $\mathcal M_{\mathrm{sea}}^{ab}$.
- `EQ-06` and `EQ-24`: density/cadence continuity, acoustic/elastic coefficients, stress-strain, and response kernels.
- `EQ-07` through `EQ-11`: lapse, spatial compliance, PPN, Poisson, and Einstein-limit recovery targets.
- `EQ-18` through `EQ-20`: effective FRW, Friedmann bookkeeping, pressure law, and effective $\Lambda$.
- `EQ-21`, `EQ-22`, and `EQ-32`: growth, CMB lensing, RAR/BTFR, local recovery, and large-scale force-law checks.
- `EQ-27` and `EQ-29`: magnetic-state and synchrotron/radiation response rows where observer-level fields are comparison variables.

### AAA Carrier Variables

The carriers are $\rho_{\text{NS}}$, $n$, $\mathbf u_{\mathrm{sea}}$, $e_{\mathrm{sea}}$, $\boldsymbol\theta_{\mathrm{sea}}$, $f_N$, $J_\nu$, $\chi_{\text{sea}}$, $\Gamma_N$, $\mathcal M_{\mathrm{sea}}^{ab}$, $\Sigma_{\mathrm{sea},X}^{ab}$, stress/compliance tensors, orientation/strain rows, effective pressure $P_{\mathrm{eff}}$, effective coupling $G_{\mathrm{eff}}$, pressure/tension/relaxation rows, $K(a)$, $S(a)$, $\zeta_{\text{bulk}}(a)$, $\eta(a)$, $m_L(a)$, $g_m(a)$, and $M_L(a)$ when the linear medium-response approximation is used.

### Architectural Clarification

This is the common Noether sea source behind mass response, metric response, Poisson handoff, curvature readout, acoustic response, growth response, galaxy low-acceleration response, dark-energy pressure, and observer-level field dressing. It prevents each comparison surface from receiving its own private medium coefficient.

The effective-FRW handoff checker [effective-frw-handoff-residual.mjs](../../../scripts/equation-mapping/effective-frw-handoff-residual.mjs) is the current executable slice of this common component for `EQ-18` and `EQ-19`. It keeps $a_{\mathrm{eff}}$, $H_{\mathrm{eff}}$, $\rho_{\mathrm{eff}}$, $P_{\mathrm{eff}}$, $G_{\mathrm{eff}}$, $\Lambda_{\mathrm{eff}}$, $k$, and $\mathcal S_{\mathrm{eff}}$ tied to one `theta_cos` carrier before the downstream shared-observation residual consumes them.

The pressure/$\Lambda_{\mathrm{eff}}$ producer side is now executable in [eq20-pressure-effective-lambda-residual.mjs](../../../scripts/equation-mapping/eq20-pressure-effective-lambda-residual.mjs). It keeps $p_{\mathrm{DE,eff}}$, $w_{\mathrm{eff}}$, $\Lambda_{\mathrm{eff}}$, $G_{\mathrm{eff}}$, pressure provenance, relaxation, and the FRW handoff tied to one $\Theta_{11\text{-}20}$ carrier while still blocking on the accepted $\rho_{\text{NS}}$ row.

### Proof Or Simulation Burden

The first burden is one single-channel coefficient extraction where the same $\Theta_{\mathrm{sea}}$ predicts a perturbation speed and a stress/strain or metric response without changing rows. The conservative first route is speed plus one longitudinal or bulk stress/strain coefficient; metric, weak-gravity, pressure, and low-acceleration outputs should remain explicit missing outputs unless the same retained window actually projects them. The speed must also pass an acoustic/elastic consistency residual $\mathcal R_{\mathrm{ac/el}}^X$ comparing the low-$k$ dispersion slope to $C_{1111}^X/\rho_{\text{NS}}$ within refinement error. The second burden is a response-kernel check with delayed support or $\mathcal R_{\mathrm{KK}}$ behavior. A later burden is deriving $G_{\mathrm{eff}}$, $a_\star$, and $P_{\mathrm{eff}}$ as outputs of this same state rather than independent fits.

### First Surface Slice

The first score-neutral constitutive advance is a density-compression surface slice, not a new gate. For one retained window $\Theta_{\mathrm{sea}}^{(\ell,W)}$ and one declared channel $X$, define

$$
\mathbf y_{\mathrm{sea}}^X
=
\left(
c_X^2,\,
C_{ij}{}^{kl},\,
N,\,
\gamma_{ij},\,
G_{\mathrm{eff}},\,
P_{\mathrm{eff}},\,
a_\star
\right)^T,
$$

and require the first-order response

$$
\delta\mathbf y_{\mathrm{sea}}^X
=
\mathsf J_{\rho}^{X}
\left[
\Theta_{\mathrm{sea}}^{(\ell,W)}
\right]
\delta\ln n
+
\mathbf r_{\rho}^{X}.
$$

Here $N$, $\gamma_{ij}$, $G_{\mathrm{eff}}$, $P_{\mathrm{eff}}$, and $a_\star$ are observer-level projection outputs of the Noether sea constitutive state. They are not substrate geometry, fitted vacuum energy, or an imported low-acceleration ontology.

Accept the slice as populated only when the same $\mathsf J_{\rho}^{X}$ supplies a perturbation speed and at least one stress/strain or metric-compliance coefficient, while weak-gravity, effective-pressure, and low-acceleration outputs are either projected from the same row or explicitly reported as missing:

$$
\mathcal R_{\rho\to\mathrm{surf}}^X
=
\frac{
\left\|\mathbf r_{\rho}^{X}\right\|^2
}{
\left\|\delta\mathbf y_{\mathrm{sea}}^X\right\|^2
+
\left\|\mathsf J_{\rho}^{X}\delta\ln n\right\|^2
+
\varepsilon
}
+
\lambda_{\mathrm{KK}}\mathcal R_{\mathrm{KK}}(\chi_{AB}^{X})
+
\lambda_{\mathrm{ac/el}}\mathcal R_{\mathrm{ac/el}}^X
+
\lambda_{\mathrm{proj}}\mathcal R_{\mathrm{proj}}^X(\Theta_{\mathrm{sea}}^{(\ell,W)},\ell)
+
\lambda_{\mathrm{retune}}\mathcal S_{\mathrm{retune}}^X.
$$

This residual is a surface-slice report for the existing constitutive-response program. It supports `EQ-06`, `EQ-07` through `EQ-11`, `EQ-20`, `EQ-24`, and `EQ-32` only after a retained window is populated and the missing-output rows are explicit.

The executable score-neutral slice runner is [noether-sea-density-compression-surface-slice.mjs](../../../scripts/spacetime/noether-sea-density-compression-surface-slice.mjs). Its default mock reports `blocked_missing_rows`, `scoreDecision=no_score_increase`, and a partial declared surface vector while blocking on missing retained $\Theta_{\mathrm{sea}}$ row references, retained response rows, delayed-support/correlation evidence, and zero-retune evidence. The retained-attempt skeleton [noether-sea-density-compression-surface-slice-retained-attempt.v1.json](../../../scripts/spacetime/noether-sea-density-compression-surface-slice-retained-attempt.v1.json) has the intended field shape but still fails because `attempt` rows are not accepted retained rows. The runner now exposes `consumerReadiness` for the downstream projections: `EQ-24` sees the current retained-attempt coefficient outputs as `projected` but still blocked by `missing_accepted_theta_sea_rho_NS`, while `EQ-11`, `EQ-20`, and `EQ-32` remain blocked by declared missing outputs. This is the correct current disposition: it makes $\mathsf J_{\rho}^{X}[\Theta_{\mathrm{sea}}^{(\ell,W)}]\delta\ln n$ executable as a packet shape, but it does not populate the shared Noether sea constitutive state.

## Common Component 7: Observer-Level Metric Projection

### Candidate Equation Form

The metric projection should be a declared projection from a retained window:

$$
\Pi_{\mathrm{metric}}\Theta_W
\mapsto
\left(
N,
u^i_{\mathrm{sea}},
e^a{}_i,
\gamma_{ij},
\Phi_{\mathrm{eff}},
\chi_{\text{sea}},
\Gamma_N
\right),
$$

with observer-level line element

$$
ds_{\rm eff}^2
=
-N^2c_0^2dt^2
+
\gamma_{ij}
\left(dx^i-u^i_{\mathrm{sea}}dt\right)
\left(dx^j-u^j_{\mathrm{sea}}dt\right).
$$

A reusable metric-observable residual can extend the existing weak residual:

$$
\mathcal R_{\mathrm{metric\ obs}}(\Theta_W)
=
\left\|
\mathbf r_{\mathrm{weak}}(\Theta_W)
\right\|_{C_W^{-1}}^2
+
\lambda_{\mathrm{null}}
\mathcal R_{\mathrm{null}}
+
\lambda_{\mathrm{geo}}
\mathcal R_{\mathrm{geo}}
+
\lambda_{\mathrm{retune}}
\mathcal S_{\mathrm{retune}}(\Theta_W).
$$

### Equations It Connects

- `EQ-07` through `EQ-10`: ADM/Cartan metric, weak clocks, PPN, geodesic, and proper-time rows.
- `EQ-11`: Poisson and Einstein-limit recovery target.
- `EQ-12`: photon null/eikonal comparison.
- `EQ-17` through `EQ-19`: redshift, effective FRW, and Friedmann observer variables.
- `EQ-21`, `EQ-22`, and `EQ-32`: lensing, growth, CMB lensing, galaxy dynamics, and local recovery.
- `EQ-24`: acoustic metric and perturbation-channel metric comparisons.

### AAA Carrier Variables

The carriers are $N$, $u^i_{\mathrm{sea}}$, $e^a{}_i$, $\gamma_{ij}$, $\Phi_{\mathrm{eff}}$, $\chi_{\text{sea}}$, $\Gamma_N$, $\mathbf u_{\mathrm{sea}}$, $\rho_{\text{NS}}$, $n$, $\sigma_{ij}^{\mathrm{tf}}$, $\mathcal M_{\mathrm{sea}}^{ab}$, PPN rows, preferred-frame leakage rows, and photon-channel delay when the row is explicitly radiative.

### Architectural Clarification

This component states that scalar delay is not a full metric. Lensing, Shapiro delay, redshift, acceleration, null transport, and cosmology must read from lapse, drift, spatial compliance, and signal rows together. It also keeps effective metric language observer-level and prevents substrate-curvature level collapse.

### Proof Or Simulation Burden

The first proof route is a weak-field window where one $\Theta_W$ supplies redshift, Shapiro delay, lensing, acceleration, PPN coefficients, and preferred-frame leakage. The first failure test is scalar-delay-only recovery: matching clock or Shapiro rows while failing spatial compliance or light bending should fail the metric projection.

## Common Component 8: Finite-Window Measure And Statistical Pushforward

### Candidate Equation Form

For coarse-graining $\mathcal Q$, retained window $W$, and deterministic substrate flow $\Phi_{\Delta t}$, use

$$
\mu_{t+\Delta t}^{\mathcal Q,W}
=
\Pi_{\mathcal Q,W\,*}
\Phi_{\Delta t\,*}
\mu_t
+
\mathcal R_{\mathrm{coarse}}.
$$

For reuse across rows, the reducer-facing row payload is the finite-window statistical carrier

$$
\mathcal C_{\mathrm{stat}}^{W,T}
\equiv
\left(
W,
T,
\Phi_T,
\mu_{*,T},
\mathcal Q,
K_{\mathrm{det}},
\mathcal B,
\mathcal C,
\mathcal S_{\mathrm{retune}}
\right),
$$

where $\mathcal B$ is the basin or outcome partition and $\mathcal C$ is the exit-corridor family when the row concerns metastability. A statistical comparison row is then a projection

$$
O_{\alpha}^{\mathrm{stat}}
=
\Pi_{\alpha}^{\mathrm{stat}}
\mathcal C_{\mathrm{stat}}^{W,T}
+
\mathcal R_{\alpha}^{\mathrm{stat}},
$$

with the no-hidden-retune witness carried by the same $\mathcal C_{\mathrm{stat}}^{W,T}$ rather than rebuilt per observable.

Mathematically, this carrier should be read as a sheaf of path-history measures over refinement windows. Let $\mathscr W$ be the poset of finite windows ordered by $(W',\ell',T')\preceq(W,\ell,T)$ when $W'\subseteq W$, $\ell'\le\ell$, and $T'\le T$. The compatibility target is

$$
\Pi_{\mathcal Q,W'\,*}\operatorname{res}_{W\to W'}\Phi_{T\,*}\mu_{*,T}^{W,\ell}
=
\operatorname{res}_{W\to W'}\Pi_{\mathcal Q,W\,*}\Phi_{T\,*}\mu_{*,T}^{W,\ell}
+
\mathcal R_{\mathrm{coarse}}(W,W').
$$

Thus $\mathcal R_{\mathrm{coarse}}$ is the cocycle-defect row for refinement compatibility. Score movement requires more than a populated tuple: it requires a retained carrier whose defect decreases or vanishes under refinement, without changing $\Phi_T$, $\mu_{*,T}$, $\mathcal Q$, $K_{\mathrm{det}}$, or the event/domain support. The current executable carrier names the `EQ-14` projection diagnostics as `eq14.sameMeasureFlowPass`, `eq14.continuityPass`, `eq14.densityReferencePass`, and `eq14.currentReferencePass`; names the `EQ-30` projection diagnostics as `eq30.preparedFluxPass`, `eq30.detectorRefinementPass`, `eq30.crossSectionPass`, `eq30.formFactorCovariancePass`, and `eq30.regimePurityPass`; and names the `EQ-31` diagnostics as `corridorDiagnostics.firstExit`, `corridorDiagnostics.nullSeparatrix`, and `corridorDiagnostics.refinementCompatibility`. These are scalar guardrails for record-current same-measure binding, continuity, prepared-flux binding, detector refinement, rate normalization, form-factor covariance, elastic-regime purity, first-exit additivity before detector readout, null-separatrix mass, and sheaf/refinement compatibility.

Specific consumers are projections of the same object:

$$
\rho_{\mathrm{rec}}(\mathbf x,t)
=
(\pi_{\mathbf x})_\#
\left[
(\Phi_t)_\#\mu_{*,T}
\right],
\qquad
\mathbf J_{\mathrm{rec}}(\mathbf x,t)
=
(\pi_{\mathbf x})_\#
\left[
\mathbf v_{\mathrm{flow}}(\Phi_t)\mu_{*,T}
\right],
$$

$$
\sigma_{a\to b}^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\frac{1}{\Phi_{\mathrm{in}}T}
\int_{\Gamma_a}
\mathbf 1_b(\Phi_T(x))
K_{\mathrm{det}}(x)\,d\mu_a(x)
+
\mathcal R_\sigma,
$$

and

$$
\gamma_k^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\frac{1}{T}
\mu_T
\left\{
x\in B_\star:\Phi_T(x)\in C_k
\right\}.
$$

For resonance corridors, additivity should be defined before detector readout. Let

$$
\tau(x)=\inf\{t:\Phi_t(x)\notin B_\star\},
\qquad
e(x)=\Phi_{\tau(x)}(x)\in\partial B_\star.
$$

The admissible $C_k$ are measurable components of $\operatorname{image}(e)$ in the boundary collar. The detector kernel is a later pushforward on these already-additive escape measures, not the definition of the corridors.

### Equations It Connects

- `EQ-14`: Born-current continuity as record-facing basin flow.
- `EQ-25`: thermodynamic, Boltzmann, entropy, fluctuation, and record-locking equations.
- `EQ-30`: scattering cross sections and form factors.
- `EQ-31`: resonance widths, lifetimes, and branching fractions.
- `EQ-22` and `EQ-23`: CMB and BBN as source-window statistical transfer rows when thermal and reaction records are coarse-grained.

### AAA Carrier Variables

The carriers are deterministic branch flow $\Phi_t$, finite-window basin measure $\mu_{*,T}$, coarse-graining $\mathcal Q$, retained region $W(t)$, position projection $\pi_{\mathbf x}$, prepared branch ensemble $\Gamma_a$, outcome selector $\mathbf 1_b$, detector kernel $K_{\mathrm{det}}$, metastable branch $B_\star$, exit corridors $C_k$, entropy measure $\mu$, and record-locking apparatus/environment rows.

### Architectural Clarification

This component unifies probability, entropy, cross sections, detector statistics, and resonance widths as finite-window record projections from deterministic dynamics. It prevents probability fluids, collision operators, amplitudes, detector kernels, and widths from being imported as primitive ontology.

### Proof Or Simulation Burden

The first record-current test is now executable as [finite-window-statistical-carrier-eq14-born-current-toy.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq14-born-current-toy.v1.json): it computes same-measure/same-flow, finite-difference continuity, density-reference, and current-reference diagnostics from the same finite-window carrier, but remains score-neutral because the parent and record-current rows are toy. The first useful elastic scattering test is executable as [finite-window-statistical-carrier-eq30-elastic-toy.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-toy.v1.json): it computes the prepared-flux, detector-refinement, cross-section, form-factor covariance, and elastic-regime diagnostics from the same finite-window carrier, but remains score-neutral because the parent rows are toy/pending-source. The refined metastable test [finite-window-statistical-carrier-eq31-null-separatrix-refinement-toy.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-null-separatrix-refinement-toy.v1.json) computes $\gamma_k$, $\Gamma_{\mathrm{cmp}}$, $\tau_{\mathrm{cmp}}$, $B_k$, pre-detector first-exit additivity, null-separatrix epsilon behavior, and restriction-row refinement behavior from one toy carrier. It also remains score-neutral because the branch window and corridor family are not accepted retained evidence.

The first scalar calculation is the null-separatrix estimate

$$
\mu_{*,T}\!\left(N_\epsilon(\partial\mathcal B)\right)
\to0
\quad\text{as}\quad
\epsilon\to0.
$$

If a basin separatrix or corridor boundary has positive measure, $\gamma_k$ is detector-tuned and the statistical carrier cannot move scores no matter how many row fields are populated.

Defining $\mathcal C_{\mathrm{stat}}^{W,T}$ is score-neutral. It does not supply a retained branch, detector kernel, or escape measure; it only gives the shared object that `EQ-14`, `EQ-25`, `EQ-30`, and `EQ-31` must instantiate before their statistical readouts can rise.

Instantiating $\mathcal C_{\mathrm{stat}}^{W,T}$ means populating source-backed accepted rows for the window, transition map, finite measure, coarse-graining, detector kernel, outcome partition, corridor family when present, and no-hidden-retune witness. A retained label without durable source evidence does not make the carrier accepted.

## Common Component 9: Exposure And Sector Quotient

### Candidate Equation Form

For a retained assembly or branch ledger $\mathcal L_A$, use

$$
\mathcal E_S(A)
=
Q_S
\left[
\Pi_S\mathcal L_A
\right],
$$

with sector residual

$$
\mathcal R_S
=
d_S
\left(
\mathcal E_S(A),
O_S^{\mathrm{obs}}
\right)
+
\lambda_{\mathrm{leak}}
\mathcal L_S^{\mathrm{leak}}
+
\lambda_{\mathrm{retune}}
\mathcal S_{\mathrm{retune}}(\mathcal L_A).
$$

### Equations It Connects

- `EQ-04`: exposed mass response and shielding/exposure coefficient $\zeta(A)$.
- `EQ-15`: spinor, exchange, and angular-momentum rows as ordered-frame pullbacks.
- `EQ-16`: gauge, weak, color, vector, and Standard Model-facing sector projections.
- `EQ-16A`: weak-basis and propagation-basis split for neutrino source/detector readout.
- `EQ-27`: magnetic moment and precession as exposed internal-current response.
- `EQ-30`: form factors as exposure distributions rather than arbitrary profiles.

### AAA Carrier Variables

The carriers are $\mathcal L_A$, $\Pi_S$, $Q_S$, active-root rows, axial-layer geometry, polarity inventory, angular-momentum ledger, ordered-frame row, weak-coupling-triad domain, color-exceptionality labels, photon transverse support, vector corridors, exposed mass response, detector kernel, and leakage rows.

### Architectural Clarification

This component is the bridge between retained branch structure and observer-visible sectors. It prevents hidden handles: mass, weak chirality, gauge covariance, magnetic moment, and form factor rows cannot be scored by changing what part of the branch is exposed per observable.

The score-neutral executable checker is now [weak-gauge-exposure-domain.mjs](../../../scripts/equation-mapping/weak-gauge-exposure-domain.mjs). Its current attempt fixture [weak-gauge-exposure-domain-attempt.v1.json](../../../scripts/equation-mapping/weak-gauge-exposure-domain-attempt.v1.json) reports `blocked_missing_rows`, `scoreDecision: no_score_increase`, and first blocker `missing_accepted_weak_visible_branch_ledger` while same-domain, gauge-branch, covariance, `V-A`, CKM, PMNS, provenance, and retune diagnostics pass numerically. This is the intended current disposition: the weak/gauge exposure residual is executable, but `EQ-16` cannot rise until one source-backed weak-visible domain binds the branch ledger, weak projection, quotient, exposure, chirality, overlap, provenance, covariance, event-ledger, and Noether sea response rows.

For form factors, $Q_S$ is legitimate only when the quotient action preserves the spatial exposure measure. A comparison-grade exposure form factor

$$
F_{\mathbb{A}\mathbb{A}\mathbb{A}}(\mathbf q)
=
\int e^{i\mathbf q\cdot\mathbf x}\,d\mathcal E_S(\mathbf x)
$$

must be covariant under void-rotation conjugation of the quotient: $F_Q(\mathbf q)$ and $F_{gQg^{-1}}(g\mathbf q)$ should agree up to the declared residual point-group orbit. If the quotient is a non-isometric relabeling, the form factor is detector-tuned rather than an exposure invariant.

### Proof Or Simulation Burden

The first burden is one weak/gauge exposure packet where `V-A`, CKM/PMNS overlap, reaction provenance, and effective gauge covariance read from one weak-visible domain. A lower-risk sibling is a mass/exposure packet where $\zeta(A)$ and $M_\ell^{\mathrm{exp}}$ are computed once and reused by atomic, recoil, and magnetic rows. The `EQ-15`/`EQ-27` sibling is the score-neutral $\mathfrak C_{\mathrm{spin}\to\mu}$ checker: it requires the ordered-frame loop, spin lift, gauge-control row, angular-momentum ledger, moment-map magnetic row, leading $g=2$ row, and exposure-fiber residual to share one record before the magnetic moment can consume spinor support. For `EQ-30`, a sibling burden is one exposure quotient whose form factor passes the rotation-conjugacy covariance check before detector kernels are applied.

## Highest-Value Common Equations

The highest-value reusable equations to stabilize first are:

1. Compact carrier plus same-record residual $\mathcal C_G\to\Theta_G\to\mathcal R_{\mathrm{shared}}$. This is the coordinator-level equation pair that exposes the common branch, sea, event, or measure carrier before preventing independent fits across the whole inventory.
2. Retained event or positive-width domain carrier $\mathfrak D_R$ with $\operatorname{RowId}_R(\mathfrak D_R)$, acceptance vector $\mathbf A_R(\mathfrak D_R)$, and first-blocker operator $B_R(\mathfrak D_R)$. This is the acceptance object behind same-branch identity, native event ledgers, retained Noether sea coefficient windows, and finite-window carrier population.
3. Noether sea constitutive state $\mathcal C_{\mathrm{sea}}$. It is the shared source of metric, mass, acoustic, growth, RAR/BTFR, pressure, and field-response projections.
4. Finite-window event ledger $\mathcal L_{E\mathbf p\mathbf J}(\mathsf e)$. It is the common precision-equation carrier for photon, recoil, radiation, reaction, thermalization, and conservation rows.
5. Common clock plus residual phase operator $H_X=\omega_{\mathrm{clk}}C_X\mathbf 1+\delta H_X$. It is the smallest sharp object for `EQ-16A` and also clarifies clock, redshift, photon, and atomic-frequency rows; [neutrino-common-clock-phase-operator.mjs](../../../scripts/equation-mapping/neutrino-common-clock-phase-operator.mjs) is the current score-neutral executable instance.
6. Observer-level metric projection $\Pi_{\mathrm{metric}}\Theta_W$. It is the shared recovery interface for PPN, null transport, cosmology, lensing, and low-acceleration dynamics.
7. Equation-bearing configuration vector $\mathcal R_{\mathrm{cfg}}(\mathfrak a)$. It is the stable-braid search bridge that keeps frequency families subordinate to retained branch residuals.
8. Finite-window statistical carrier $\mathcal C_{\mathrm{stat}}^{W,T}$. It is the common object behind Born-current continuity, entropy, scattering rates, detector statistics, resonance widths, lifetimes, and branching fractions.

The projection/refinement residual and finite-window statistical pushforward should be developed alongside these because they supply the proof language that turns this set into controlled observer-level equations rather than new ontological assertions.

## Recommended Coordinator Actions

1. Treat `EQ-01`, `EQ-05`, `EQ-11`, and `EQ-20` as common-architecture rows before assigning them as isolated packets. `EQ-01` is the root dependency, `EQ-05` is the event-ledger equation, `EQ-11` is a metric/constitutive projection consumer, and `EQ-20` is a pressure/constitutive projection consumer.
2. Add a later coordinator pass that links packet residuals to this common architecture after concurrent edits settle. Do not edit [equation.md](equation.md) or [equation-mapping.md](equation-mapping.md) while other agents are changing them.
3. Instantiate the retained event or positive-width domain carrier $\mathfrak D_R$ first on $S_{\mathrm{eq}}$, $\mathsf e_{\gamma e}^{0}$, or $\Theta_{\mathrm{sea}}^{(\ell,W)}$; the first successful instance should show which row binding is easiest to certify.
4. Instantiate $\mathcal C_G\to\Theta_G\to\mathcal R_{\mathrm{shared}}$ first on the translating binary benchmark for `EQ-02` through `EQ-04`, because it is compact and already declares clock, envelope, mass-shell, rest-invariance, and Noether sea response projection slots.
5. Build the Noether sea constitutive state as the next shared target for `EQ-07` through `EQ-11`, `EQ-18` through `EQ-21`, `EQ-24`, and `EQ-32`. Require one coefficient extraction before any score increase.
6. Use Compton/recoil as the first finite-window event-ledger replay. It cross-checks photon packets, atomic spectra, exposed mass, recoil, angular momentum, and medium updates in one event.
7. Populate the neutral-lepton phase-operator packet as the focused `EQ-16A` follow-up. The executable checker now reports `missing_accepted_neutral_lepton_retained_branch`; its crisp falsifier remains that common-clock cancellation must not erase $\delta H_{3B}$, and the residual spectrum must not collapse into all-zero or equal-spacing gaps.
8. Keep the `equationBearing` payload attached to the stable tri-binary configuration search so $(f+2,f,f-1)$, $(f+1,f,f-1)$, $(f,f,f)$, $(4f,2f,f)$, and $(nf,mf,f)$ candidates are compared by retained residuals, not by ratio labels alone.
9. Defer reader-facing promotion. These components are architecture candidates and closure targets until a packet supplies a derived equation, coefficient extraction, executable residual, or retained branch calculation.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: each common component needs at least one retained-branch, retained-Noether-sea, or finite-window event calculation before it can become reader-facing corpus prose.
