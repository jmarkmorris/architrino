# $A_0$ Branch Certificate Protocol

This protocol defines the simulation-facing handoff for the $A_0$ reference attractor described in [Particle Masses](../../assemblies/particle-masses.md#reference-attractor-gate), [Nested Shell Braid Dynamics](../../noether-braid/braid-families.md#nested-shell-braid-dynamics), and [Energy](../../dynamics/energy.md). It specializes the general [Simulation Run Protocols](run-protocols.md) to the first neutral rest-branch nested shell braid mass-map target.

The protocol does not treat $A_0$ as a particle label. It treats $A_0$ as a calibration-free branch certificate problem: find a finite, stable, multi-scale causal-root ledger before energy, shielding, Noether sea response, or mass comparisons enter.

## Master-Equation Handoff Boundary

If a run consumes a master-equation branch-chart object $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$, the consumed data must remain branch-certificate data: active roots, inactive gaps, transmitter-side Jacobian floors, same-record transmitter-side acceleration-weight intervals $W^{\mathrm{acc}}$, receiver-side factors $D_r$, signed root-playback intervals $D_r/D_t$, memory depth, returned-section residual, section stability, and the refinement schedule that preserves the same branch identity. These fields may support Tier 0 and Tier 1 certification only.

The same packet must keep downstream extraction fields separate. `energy_ledger`, `far_field_shielding`, `medium_response`, and `mass_summary` remain not-computed until their tiers pass. A run fails the handoff if $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, or $\mathcal{M}_{\text{sea}}^{ab}$ changes under root-ledger refinement, inactive-gap refinement, history-window extension, or controlled $\eta$ refinement while the branch label and quotient row are claimed to be unchanged.

## Certificate Packet Schema

An auditable $A_0$ branch certificate should preserve one top-level packet shape across all tiers. Fields that are not computed at a given tier must remain present with an explicit status, role, and note rather than disappearing from the packet.

| Field | Required content | Promotion role |
| --- | --- | --- |
| `metadata` | run identifier, code or derivation version, source commit, integrator, tolerances, $\eta$, sampling schedule, and history-window rule | makes the packet reproducible |
| `sea_cell` | $u^i_{\text{sea}}$, $G_{\text{grad}}$, $n$, $\chi_{\text{sea}}$, declared $c_\star$, and boundary conditions | fixes the homogeneous Noether sea cell and prevents mixing $c_f$ with $c_{\text{eff}}$ |
| `branch_label` | layer windings, inter-layer closure integers, handedness, carrier ellipticity, and active root-branch summary | identifies the branch being certified |
| `z_lambda` | quotient-coordinate row $z_\Lambda$: $\varepsilon_{IM}$, $\varepsilon_{MO}$, $T_I/T_M$, $T_M/T_O$, $\delta_M$, layer ellipticities, $G_{\ell m}$, $\chi_N$, $H_I,H_M,H_O$, $\Phi_{\text{rel}}$, removed gauges $SO(3)$, $S^1_{\mathbf{k}}$, $\Gamma_\Lambda$, branch class $[\Lambda]$, and quotient-degeneracy status | records the reduced moduli coordinate rather than an unquotiented carrier representative |
| `branch_chart_revision` | conditional pre-rerun record for any revised reduced branch coordinate, including source fields, equality map, equation and coefficient counts, held-out residual rule, phase-origin rule when a phase split is used, symmetry or quotient behavior, locked-key exclusion, benchmark exclusion, and `accepted_history_boundary: false` | prevents residual-selected coordinates or post-fit added columns from masquerading as branch geometry |
| `state_vector` | six architrino labels, polarities, reduced geometry, frequencies, phase offsets, carrier chart, history segment, and center gauge | gives the reduced Noether braid state vector |
| `closure_system` | active variables, causal-root equations, layer phase closure, inter-layer closure, center-gauge closure, speed-ordering inequalities, and tolerances | ties closure labels to equations rather than only to names |
| `root_ledger` | active and raw partner, self, and inter-layer root classes with delays, branch Jacobians, separator flags, root-count changes across separators, parity events, and excluded near-zero self roots separated | verifies finite causal-root bookkeeping |
| `term_classification` | terms assigned to averaging, locking, and leakage channels, with measured or derived residual size | prevents internal corrections from being hidden before promotion |
| `residuals` | complete branch-row residual surface $\mathcal{R}_{A_0}$, with $\mathcal{R}_{\text{state}}$, $\mathcal{R}_{\text{root}}$, $\mathcal{R}_{\text{phase}}$, $\mathcal{R}_{E}$, $\mathcal{R}_{\text{drift}}$, $\mathcal{R}_{\text{speed}}$, $\mathcal{R}_{\text{avg}}$, $\mathcal{R}_{\text{lock}}$, $\mathcal{R}_{\text{leak}}$, and $\mathcal{R}_{\text{Floquet}}$, each with value, tolerance, status, role, and note fields | gives a machine-checkable promotion surface with later-tier omissions explicit |
| `residual_values` | numeric mirror of $\mathcal{R}_{A_0}$ values, with Tier 0 omissions recorded as null rather than hidden | gives scripts a stable audit surface without erasing row semantics |
| `Delta_k` | $\Delta_{\mathbf{k}}$ value, status, role, nonpositive-gap failure code, and note; Tier 0 emits null with `not_computed_in_tier0` | keeps the Floquet handoff visible before Tier 1 computes the return map |
| `stability` | monodromy or finite-difference return map, excluded symmetry modes, non-symmetry Floquet multipliers, and the computed $\Delta_{\mathbf{k}}$ once Tier 1 exists | separates integer closure from attractor stability |
| `group_velocity_anisotropy` | $\mathbf{V}_{\text{cm}}$, declared $c_\star$, $\beta_\star$, envelope ratio, forward/backward delay ratio, tensor $\mathcal{A}_{\mathrm{gv}}^{ij}$, refinement status, and whether the entry is rest residue, small-velocity response, or probe-induced drift | keeps motion-induced deformation separate from shielding leakage |
| `energy_ledger` | sign-resolved kinetic content, interaction terms, wake/history terms, layer totals $E_I,E_M,E_O$, $E_{\text{internal}}(A_0)$, delayed-Noether status (`action-derived`, `quasi-Noether`, or `diagnostic-only`), the running retained-history energy-like functional across active self-hit crossings, and action per closed cycle after bounded-energy status | supplies the unshielded energy reservoir after Tier 1 passes |
| `far_field_shielding` | extraction radii, angular grid, selected wake channel, $\mathcal{L}(\hat{\mathbf{R}})$, naive constituent sum, leading isotropic projection, $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, and convergence status | turns shielding into an extracted far-field quantity after Tier 1 passes |
| `medium_response` | acceleration probes, gradient probes, extracted $\mathcal{M}_{\text{sea}}^{ab}$ baseline, symmetric tensor part, antisymmetric residue, and response anisotropy | compatibility field for testing Noether sea inertial and gravitational response after shielding passes |
| `mass_summary` | $\zeta(A_0)E_{\text{internal}}(A_0)/E_0$, unresolved constants, response-map assumptions, and explicitly excluded particle benchmarks | records only calibration-free mass-facing output |
| `certificate_gates` | pass/fail/not-computed gates for quotient nondegeneracy, scale separation, speed ordering, phase closure, carrier residuals, root residual, active root-ledger stability, active separator-root handling, near-zero self-root handling, residual semantics, Floquet handoff, and Tier 0 continuation | controls promotion between branch search, attractor, shielding, and response claims |
| `failure_code` | reason the row or packet failed, or the next allowed promotion status | prevents failed packets from being read as mass-map results |

The `residuals` field is the complete branch-row surface
$$
\mathcal{R}_{A_0}
=
\left(
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
\right)
$$
Tier 0 may compute only part of this surface. The row must still emit every component. Missing later-tier components use explicit `not_computed_in_tier0` status, null value, null tolerance when no tolerance exists yet, a promotion role, and a note that names the tier responsible for computing the entry.

### Self-Hit Energy And Action-Spacing Order

For any row that claims an active self-hit branch, the certificate must report the branch invariants in the required order. First, it reports the active causal-root count by class and the root-count change across separators; any creation or annihilation event must state whether the count changes by an even number rather than hiding the transition inside interpolation. Second, it reports the transversality floor

$$
J_{\min}
=
\min_{\text{active }(t,t_0)}
\left|
1-\frac{\mathbf{v}_j(t_0)\cdot\hat{\mathbf{r}}_{o'j}(t;t_0)}{c_f}
\right|
$$

On the same active records the certificate must also report the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$ on its certified floor or bounded interval. It must report the receiver-side factor $D_r=1-\mathbf v_{o'}(t)\cdot\hat{\mathbf r}_{o'j}(t;t_0)/c_f$ separately for signed root playback. A healthy transversality floor $J_{\min}$ alone does not certify the branch's acceleration or action contribution.

Third, it reports a running retained-history energy-like functional and its variation across self-hit or separator crossings under $\Delta t$, $\eta$, and history-window refinement. A bounded-energy claim fails if the apparent bound disappears under refinement.

The same row must state whether the energy object is action-derived, quasi-Noether, or diagnostic-only. A diagnostic-only energy row may reject a branch by showing runaway, regulator dependence, or nonconvergent drift, but it cannot promote closed-cycle action spacing or no-runaway conservation as theorem-level output.

Only after those well-posedness rows pass may the packet promote closed-cycle action spacing. The closed-cycle action entry records $\mathcal{A}_{\text{cycle}}(A_0)$, its branch label $\Lambda$, period $T_{\mathbf{k}}$, and spacing relative to neighboring accepted branches. This ordering prevents a numerically periodic carrier with an unbounded self-hit energy ledger from being read as evidence for a derived $h$.

The group-velocity anisotropy entry uses the reduced centered covariance of the six-worldline state. With
$$
\mathbf{C}_{A_0}(T)=\frac{1}{6}\sum_{a\in A_0}\mathbf X_a(T)
$$
define
$$
D^{ij}_{A_0}(\mathbf{V}_{\text{cm}})
=
\left\langle
\sum_{a\in A_0}
\left(X_a^i-C_{A_0}^i\right)
\left(X_a^j-C_{A_0}^j\right)
\right\rangle_{T_{\mathbf{k}}}
$$
$$
Q^{ij}_{A_0}
=
\frac{D^{ij}_{A_0}}{h_{mn}D^{mn}_{A_0}},
\qquad
\mathcal{A}_{\mathrm{gv}}^{ij}
=
Q^{ij}_{A_0}-\frac{1}{3}h^{ij}
$$
This tensor measures motion-induced or probe-induced Noether braid deformation. It is not the same object as the far-field leakage residue $\mathcal{L}_{\text{aniso}}$, which is extracted from cycle-averaged wake coefficients in Tier 2.

## Tier 0: Algebraic Branch Search

Tier 0 is a reduced branch-search pass. It samples diagnostic carrier charts, solves delayed root equations on those charts, classifies internal terms, and emits candidate rows. It does not claim a physical attractor.

Required inputs:

- homogeneous Noether sea cell with $u^i_{\text{sea}}=0$, $G_{\text{grad}}=0$, $n=1$, $\chi_{\text{sea}}=1$, and primitive wake speed $c_f$;
- layer labels $\ell\in\{I,M,O\}$ and polarity labels $\sigma\in\{+,-\}$;
- scale ratios $\varepsilon_{IM}=R_I/R_M$ and $\varepsilon_{MO}=R_M/R_O$;
- speed offsets enforcing $s_I > c_f$, $s_M \approx c_f$, and $s_O < c_f$;
- candidate handedness tuple and carrier ellipticity;
- $\eta > 0$, sampling resolution, and history-window rule.

Required outputs:

| Output | Meaning |
| --- | --- |
| `branch_label` | layer windings, inter-layer closure integers, handedness, and active root-branch summary |
| `closure_labels` | declared $T_{\mathbf{k}}$, winding integers, inter-layer closure integers, and active root classes |
| `z_lambda` | reduced quotient-coordinate row $z_\Lambda$, including radius ratios, period ratios, $\delta_M$, layer ellipticities, plane Gram data $G_{\ell m}$, $\chi_N$, handedness labels, phase-offset quotient status, removed gauges, branch class $[\Lambda]$, and `quotient_degenerate` |
| `state_vector` | reduced geometry, frequencies, phase offsets, carrier chart, and center gauge |
| `closure_system` | active causal-root, phase-closure, inter-layer-closure, center-gauge, and speed-ordering equations used by the row |
| `root_ledger` | active and raw partner, self, and inter-layer root counts with delays, branch Jacobians, separator flags, root-count changes across separators, parity events, and excluded near-zero self roots separated |
| `term_classification` | terms assigned to averaging, locking, and leakage channels |
| `residuals` | every component of $\mathcal{R}_{A_0}$, each with value, tolerance, status, role, and note fields; $\mathcal{R}_{E}$ and $\mathcal{R}_{\text{Floquet}}$ are explicit Tier 0 omissions unless supplied by a later diagnostic |
| `residual_values` | numeric value mirror for the same $\mathcal{R}_{A_0}$ components, with omitted components recorded as null |
| `Delta_k` | $\Delta_{\mathbf{k}}$ status object; Tier 0 sets value to null and status to `not_computed_in_tier0` until Tier 1 constructs the monodromy or finite-difference return map |
| `group_velocity_anisotropy` | rest-branch residue if computed, or an explicit not-computed Tier 0 status; no Tier 0 row may use this as shielding evidence |
| `certificate_gates` | pass/fail/not-computed gates for quotient coordinates, scale separation, speed ordering, phase closure, carrier residuals, root residual, active root ledger, active separator roots, near-zero self roots, residual vector semantics, $\Delta_{\mathbf{k}}$, and Tier 0 continuation |
| `failure_code` | reason the row failed, or `candidate` if it survives Tier 0 |

Tier 0 passes only if at least one row has a finite causal-root ledger, nondegenerate quotient coordinates, retained scale separation, correct speed ordering, bounded carrier residuals, no unclassified separator term, and a complete residual surface. Passing Tier 0 only authorizes Tier 1 continuation.

### Tier 0 Failure-Code Enum

The row-level `failure_code` field is a machine-readable enum. The accepted values are:

| Code | Trigger | Promotion consequence |
| --- | --- | --- |
| `candidate` | all Tier 0 promotion gates pass | row may seed Tier 1 continuation only |
| `quotient-degenerate` | $z_\Lambda$ has degenerate plane-normal Gram or orientation data after quotienting global rotations | reject the row as a reduced moduli coordinate |
| `scale-separation-collapse` | radius or period ratios violate the declared separated-scale Tier 0 regime | reject the row or widen the scan only as a controlled scale-separation test |
| `speed-order-collapse` | $\mathcal{R}_{\text{speed}}$ fails the intended $s_I > c_f$, $s_M \approx c_f$, $s_O < c_f$ ordering | reject the row before attractor continuation |
| `phase-closure-open` | $\mathcal{R}_{\text{phase}}$ fails layer winding closure over $T_{\mathbf{k}}$ | reject the row until integer closure is restored |
| `carrier-residual-open` | $\mathcal{R}_{\text{state}}$ or $\mathcal{R}_{\text{drift}}$ fails the Tier 0 carrier chart tolerance | reject the row as an unclosed diagnostic carrier |
| `root-residual-open` | $\mathcal{R}_{\text{root}}$ fails on candidate active causal-root branches | reject the row until active roots solve within tolerance |
| `averaging-residual-open` | $\mathcal{R}_{\text{avg}}$ fails its declared averaging tolerance | keep the term in the branch equations or reject the row |
| `locking-residual-open` | $\mathcal{R}_{\text{lock}}$ fails its declared locking tolerance | keep the near-separator or resonance term in Tier 1 or reject the row |
| `separator-singularity-unresolved` | active near-separator roots exceed the configured allowance without a locking continuation rule | reject the row until separator handling is explicit |
| `near-zero-self-root-excluded` | excluded near-zero self roots exceed the configured allowance under $H(0)=0$ | reject the row until a positive-delay self branch or regularized fold-layer rule exists |
| `root-ledger-instability` | the active causal-root ledger is empty or lacks partner, self, or inter-layer classes | reject the row as a finite-ledger failure |
| `nonpositive-floquet-gap` | Tier 1 computes $\Delta_{\mathbf{k}}\le0$ | reject the branch as a non-attractor even if integer closure holds |

At Tier 0, `nonpositive-floquet-gap` appears only as the reserved `Delta_k.failure_code_if_nonpositive` and `certificate_gates.floquet_gap.failure_code`, because Tier 0 does not compute $\Delta_{\mathbf{k}}$.

### Near-Zero Self Roots

Tier 0 must distinguish raw self-root sightings from active self-hit branches. A self root at the configured near-zero delay threshold is recorded in the raw ledger but excluded from the active ledger as an instantaneous self-kick artifact under the convention $H(0)=0$.

Such a root may not count as self-hit closure merely because a fold-layer diagnostic preserves the locked self-root keys. The current fold-layer row is a transition candidate only; it promotes after a corrected one-period branch-equation attempt passes the declared residual surface, with $\Delta_{\mathbf{k}}$ and $\eta$-ladder persistence still downstream.

The reader-facing interpretation of these rows is in [$A_0$ Tier 0 Result Interpretation](a0-tier0-result-interpretation.md).

## Tier 1: $\eta > 0$ Continuation

Tier 1 promotes a surviving Tier 0 row into direct delayed dynamics with the regularized wake kernel still active. It must preserve the absolute-frame logging standard.

Required checks:

1. direct evolution over at least one declared $T_{\mathbf{k}}$;
2. root-ledger stability under $\Delta t$ and history-window refinement;
3. persistence of averaging, locking, and leakage classifications;
4. no secular center drift after symmetry modes are removed;
5. monodromy or finite-difference return-map estimate with symmetry modes quotiented;
6. positive non-symmetry Floquet gap $\Delta_{\mathbf{k}}>0$;
7. convergence under the standards in [Convergence Tests](convergence-tests.md);
8. a Floquet or monodromy report stating whether the state-dependent delay derivative term was included in the variational operator;
9. `transition_records.json` whenever the run crosses a fold-layer, separator, or active-root status transition.

### Branch-Chart Revision Checkpoint

If a Tier 1 diagnostic or corrected carrier attempt reaches a finite-coordinate no-go and proposes a revised branch chart, the revision is admissible only as a pre-rerun record. The proposed reduced coordinate $z_\Lambda^\star$ or finer branch partition $\mu^\star$ must be declared from branch geometry, causal-root data, quotient-row data, or corrected carrier state before residual fitting. It may not be selected from residual-sign binning, particle benchmarks, fitted weights, or post-fit cancellation.

The pre-rerun record must report `coordinate_source_fields`, `equality_map`, `equation_count`, `coefficient_count`, held-out residual checks, phase-origin checks when a phase split is used, locked-key exclusions, symmetry quotients, benchmark exclusions, and `accepted_history_boundary: false`. The design must remain overdetermined after quotienting, for example by satisfying $N_{\mathrm{eq}}>N_{\mathrm{coef}}$ or $R_{\mathrm{df}}>0$, and the same branch identity must survive the refinement checks in [Convergence Tests](convergence-tests.md).

Such a row is a revision candidate only. A branch-chart checker may authorize only a new Tier 1 rerun path; it does not accept history. If the checker rejects the packet for a hidden fit split, inadequate degrees of freedom, or held-out residual failure, then the compact-coordinate no-go remains a controlled chart failure. If the checker passes, the branch still requires corrected one-period residuals, quotient-row identity, monodromy or $\Delta_{\mathbf{k}}$, and $\eta$-ladder persistence with the same branch identity.

Tier 1 passes only if the same branch remains stable before any $\eta\to0^+$ extrapolation.

### Corrected One-Period Branch-Equation Boundary

The current fold-layer-locked compact fixture is a controlled negative result, not an accepted attractor and not a broad falsification of the $A_0$ program. The direct one-period runner can preserve the locked self-root keys in $\mathcal{R}_{\text{lock}}$ without solving the branch equations: state return, root closure, phase closure, speed ordering, center drift, and energy-like speed closure still fail. The scalar branch-native relation basis over $B_{\text{self}}$, $B_{\text{partner}}$, and $B_{\text{inter}}$ leaves a relative acceleration residual far above the Tier 1 tolerance, so the next allowed rerun must predeclare either a non-circular carrier correction $\mathbf{d}_\ell(t)$ or a richer branch-native interaction basis before residual fitting.

For a declared period window $W=[T_0,T_0+T_{\mathbf{k}}]$, the corrected carrier has the form
$$
\mathbf X_{a,\ell}^{\star}(T)
=
\mathbf X_{a,\ell}^{(0)}(T)+\mathbf D_\ell(T),
\qquad
\mathbf D_\ell(T+T_{\mathbf{k}})=\mathbf D_\ell(T),
\qquad
\left\langle\mathbf D_\ell\right\rangle_W=0
$$
The one-period residual is
$$
\mathcal{R}_{\mathrm{1per}}
=
\frac{
\left(
\int_W
\sum_a
\left\|
\mathbf A^{\mathrm{ME}}_a(T;\mathbf D)
-
\sum_{B\in\{B_{\text{self}},B_{\text{partner}},B_{\text{inter}}\}}
\alpha_B\,\mathbf A_{a,B}(T;\mathbf D)
\right\|^2 dT
\right)^{1/2}
}{
\left(
\int_W
\sum_a
\|\mathbf A^{\mathrm{ME}}_a(T;\mathbf D)\|^2 dT
\right)^{1/2}
+\varepsilon_0
}
$$
The rerun may proceed toward monodromy only if
$$
\mathcal{R}_{\mathrm{1per}}\le 0.02
$$
with $\mathbf D_\ell(T)$, the basis terms $\mathbf A_{a,B}$, the coefficient rule for $\alpha_B$, and any held-out interval declared before fitting. A scalar-basis no-go is therefore a chart or basis failure; it does not become an attractor failure unless every admissible corrected carrier and branch-native basis inside the declared search class fails the same residual boundary.

## Tier 2: Energy and Shielding

Tier 2 begins only after Tier 1 passes. It computes the internal-energy ledger and far-field shielding extraction described in [Energy](../../dynamics/energy.md). The required outputs are:

- $E_I$, $E_M$, $E_O$, and $E_{\text{internal}}(A_0)$;
- interaction and wake/history bookkeeping with no double counting;
- far-field wake coefficients $\mathcal{L}(\hat{\mathbf{R}})$ over extraction radii and angular grids;
- the naive constituent sum $\mathcal{L}_{\text{naive}}$ and the leading isotropic projection $\Pi_0\mathcal{L}$;
- $\zeta(A_0)$ from the leading isotropic projection;
- anisotropic leakage $\mathcal{L}_{\text{aniso}}=(1-\Pi_0)\mathcal{L}$ retained as a separate tensor or channel list;
- convergence status under extraction radius, angular resolution, $\Delta t$, history-window, and $\eta$ refinement.

Tier 2 fails if particle masses, charged-lepton ratios, electron radius, or measured $\alpha$ enter as inputs.

## Tier 3: Medium-Response Probe

Tier 3 begins only after Tier 2 passes. It applies small acceleration and gradient probes to the accepted branch and extracts the homogeneous baseline for $\mathcal{M}_{\text{sea}}^{ab}$. The probe must report whether the acceleration and gradient channels share the same shielded-energy coefficient to first order, and it must report response anisotropy separately from both $\mathcal{A}_{\mathrm{gv}}^{ij}$ and $\mathcal{L}_{\text{aniso}}$.

## Runtime Artifact

The first reduced Tier 0 artifact is `scripts/mass-map/a0-tier0-branch-search.mjs`, with default grid `scripts/mass-map/a0-tier0-default-grid.json`. It is an algebraic branch-search scaffold, not a production simulator. Its required role is to emit candidate rows with parameter choices, quotient-coordinate rows, carrier diagnostics, root ledgers, term classifications, residual surfaces, $\Delta_{\mathbf{k}}$ handoff status, leakage placeholders, certificate gates, and failure codes matching this protocol.

The Tier 1 handoff scaffold is `scripts/mass-map/a0-tier1-continuation-scaffold.mjs`. It consumes Tier 0 JSON rows and emits the $\eta > 0$ continuation contract, reduced-coordinate chart, symmetry-quotiented monodromy plan, $\Delta_{\mathbf{k}}$ acceptance boundary, and required output artifact list. It is not a delayed-dynamics solver and cannot certify the branch without a later Tier 1 run.

The companion audit is `scripts/audit-a0-mass-map-promotion.mjs`. It scans $\mathbb{A}\mathbb{A}\mathbb{A}$ and mass-map priority prose for premature statements that treat $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, or $\mathcal{M}_{\text{sea}}^{ab}$ as accepted before the Tier gates pass.

## Acceptance Boundary

The $A_0$ branch is not an attractor until Tier 1 passes. It is not a mass-map result until Tier 2 passes. It is not an inertial-response result until Tier 3 passes. A reported group-velocity anisotropy tensor is a deformation diagnostic, not a shielding extraction and not a substitute for the Noether sea response probe.
