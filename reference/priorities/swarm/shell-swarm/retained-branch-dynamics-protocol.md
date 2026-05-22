# Retained Branch Dynamics Protocol

Promotion status: `priority-only`. This document specifies the retained-branch search protocol for same-level tri-binary dynamics. It is not a corpus migration document and does not promote any same-level branch into `content/markdown/aaa`. Its role is to turn the rigid octahedral failure in [octahedral-carrier-worked-example.md](octahedral-carrier-worked-example.md) into a disciplined search for deformed support-band candidates that can later populate the decision gate in [proof-program-and-decision-gate.md](proof-program-and-decision-gate.md).

The protocol is strict about one point: every accepted row must use the same state history, active causal-root ledger, regulator convention, endpoint convention, and branch label. A carrier that passes geometry on one root convention and energy on another is not a retained branch.

For the bounded speed factor model, the same rule applies with $\nu_i$ included in the branch state. A packet that uses bounded-speed roots but fixed-speed action, stability, or observer-export rows is a mixed-ledger packet, not a retained branch. The executable successor rows are stated in [bounded-speed-factor-executable-solver-protocol.md](bounded-speed-factor-executable-solver-protocol.md) and [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md).

---

## 1. Search Object

For branch class $q$ on a window $W=[t_0,t_1]$, the search produces a candidate packet

$$
\mathsf{D}_q(W)
=
\left(
X_q,
\mathcal{H}_q,
\mathcal{A}_q,
\mathcal{I}_q,
\Phi_q,
\mathcal{K}_q,
\mathcal{E}_{\mathrm{hist}}^{(q)},
\mathcal{L}_{E\mathbf{p}\mathbf{J}Q}^{(q)},
\mathcal{P}_{\mathrm{stab}}^{(q)},
\mathcal{R}_{\mathrm{tri}}^{(q)}
\right).
$$

The packet is retained as a search candidate only if the required residuals pass the thresholds in Section 9. Rows that are not computed must be marked `not_computed` and cannot support downstream claims.

Full promotion from a search candidate to a retained shell swarm branch candidate is governed by [retained-branch-promotion-theorem.md](retained-branch-promotion-theorem.md). Search retention is therefore only an intermediate status unless the promotion theorem's geometry, root, dynamics, convergence, action, conservation, stability, inventory, and event rows all close on one live-ledger convention.

---

## 2. State Variables And Parameterization

The state vector uses the branch chart from [shell-swarm-branch-mathematics.md](shell-swarm-branch-mathematics.md):

$$
X(t)=
\left(
(\mathbf{x}_i(t),\mathbf{v}_i(t),q_i)_{i=1}^N,
\mathbf{C}(t),\dot{\mathbf{C}}(t),
R(t),\delta(t),
\mathcal{I},
\Phi(t),
\mathcal{K}
\right).
$$

For the neutral Noether swarm search, take $N=6$ and index sites by $(a,\sigma)$ with $a\in\{1,2,3\}$ and $\sigma\in\{+,-\}$. The default polarity row is

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon.
$$

This neutral row carries the attraction/repulsion site inventory from [attraction-repulsion-inventory-theorem.md](attraction-repulsion-inventory-theorem.md): each receiver has $N_{\mathrm{attr}}=3$ opposite-polarity source sites and $N_{\mathrm{rep}}=2$ same-polarity source sites before root weights are applied.

The center-gauge variables are

$$
\mathbf{y}_i(t)=\mathbf{x}_i(t)-\mathbf{C}(t),
\qquad
\mathbf{u}_i(t)=\dot{\mathbf{x}}_i(t)-\dot{\mathbf{C}}(t),
$$

with

$$
\sum_i\omega_i\mathbf{y}_i(t)=\mathbf{0},
\qquad
\sum_i\omega_i\mathbf{u}_i(t)=\mathbf{0},
\qquad
\sum_i\omega_i=1.
$$

The search parameters are

$$
\mu=
\left(
\eta,
R,
\delta,
T,
\omega,
\phi_1,\phi_2,\phi_3,
\lambda_{\mathrm{def}},
M,
\mathcal{I},
\mathcal{K},
\mathsf{root\_policy}
\right),
$$

where $\eta$ is the regulator, $T$ is the candidate return time, $\lambda_{\mathrm{def}}$ is the deformation homotopy parameter, $M$ is the Fourier or collocation order, and $\mathsf{root\_policy}$ declares which partner, self, and cross-binary root rows are required.

### 2.1 Rigid Octahedral Seed

At $\lambda_{\mathrm{def}}=0$, use the rigid octahedral carrier

$$
\mathbf{y}_{a,+}(t)=R\mathbf{p}_a(\omega t+\phi_a),
\qquad
\mathbf{y}_{a,-}(t)=-R\mathbf{p}_a(\omega t+\phi_a),
\qquad
\omega=\frac{c_f}{R}.
$$

The zero-offset row has already screened as geometrically plausible but dynamically failed:

$$
\max_{i,\theta}
\left|
\widetilde{\mathcal{R}}_{\mathrm{tan},i}(\theta)
\right|
\approx
2.0636859695.
$$

The seed is therefore used only as a failed baseline with failure code `tangential-residual-open`.

### 2.2 Deformed Support-Band Coordinates

For $\lambda_{\mathrm{def}} > 0$, write

$$
\mathbf{y}_{a,\sigma}(t)
=
\rho_{a,\sigma}(\theta)\hat{\mathbf{r}}_{a,\sigma}(\theta),
\qquad
\theta=\frac{2\pi t}{T},
\qquad
R-\delta\le\rho_{a,\sigma}(\theta)\le R+\delta.
$$

Use a finite coefficient vector $\mathbf{a}$:

$$
\rho_{a,\sigma}(\theta)
=
R+
\sum_{m=1}^{M}
\left(
\alpha_{a,\sigma,m}^{c}\cos m\theta
+
\alpha_{a,\sigma,m}^{s}\sin m\theta
\right),
$$

and

$$
\hat{\mathbf{r}}_{a,\sigma}(\theta)
=
\frac{
\sigma\mathbf{p}_a(\theta+\phi_a)
+
\lambda_{\mathrm{def}}\Pi_{\sigma\mathbf{p}_a(\theta+\phi_a)}^{\perp}
\boldsymbol{\xi}_{a,\sigma}(\theta)
}{
\left\|
\sigma\mathbf{p}_a(\theta+\phi_a)
+
\lambda_{\mathrm{def}}\Pi_{\sigma\mathbf{p}_a(\theta+\phi_a)}^{\perp}
\boldsymbol{\xi}_{a,\sigma}(\theta)
\right\|
}.
$$

Here $\boldsymbol{\xi}_{a,\sigma}$ is expanded in the same order $M$ and $\Pi^\perp$ projects onto the tangent plane of the seed direction. The antipodal relation is measured by $\mathcal{R}_{\mathrm{anti}}$; it is not imposed unless the branch class declares it.

For a deformed branch, the physical clock should be the arclength clock from [arc-length-dynamics-reduction.md](arc-length-dynamics-reduction.md). Equivalently, the search may represent six curves

$$
\mathbf{Y}_i(\lambda),
\qquad
\|\mathbf{Y}_i'(\lambda)\|=1,
$$

and solve the intrinsic equation from [intrinsic-curve-dynamics-equation.md](intrinsic-curve-dynamics-equation.md):

$$
\mathbf{Y}_i''(\lambda)
=
\Gamma P_i^\perp(\lambda)\widetilde{\mathbf{F}}_i(\lambda),
\qquad
\mathbf{Y}_i'(\lambda)\cdot\widetilde{\mathbf{F}}_i(\lambda)=0.
$$

The older angle-clock parameterization remains useful for reproducing the rigid seed and for diagnostic screens, but it should not be the final acceptance chart for deformed support-band rows.

---

## 3. History Window And Collocation

The history segment is

$$
X_t(\theta)=X(t+\theta),
\qquad
\theta\in[-h_{\mathrm{mem}},0].
$$

For a bounded support band and center drift $\|\dot{\mathbf{C}}\| \le V_C < c_f$, the search window must satisfy

$$
h_{\mathrm{mem}}
\le
h_{\max}
=
\frac{2R_+}{c_f-V_C}.
$$

In the center-gauge rest search, this reduces to $h_{\max}=2R_+/c_f$. Root solving is performed on $s\in[t-h_{\mathrm{mem}},t)$ using interpolation from the same collocation grid that represents $X_t$. A candidate that requires a root outside the declared window fails `root-ledger-empty`.

For adaptive-memory intrinsic screens, distinguish an active-window certificate from support-complete memory. Let

$$
\eta_{\mathrm{act}}=\max_{a\in\mathcal{A}_q}\eta_a,
\qquad
m_{\mathrm{mem}}=\eta_{\max}-\eta_{\mathrm{act}}.
$$

If $m_{\mathrm{mem}}>0$ and all active brackets and excluded gaps pass, the emitted root ledger is inside the declared window. This active-window certificate does not prove support-complete memory by itself. The support-complete row additionally requires that every required in-window root be bracketed and isolated, and that either

$$
\eta_{\max}\ge2r_{\max}+m_{\eta},
$$

or a sharper interval certificate exclude every required root in the tail. Otherwise the run is only an active-window dynamics screen and cannot support action, energy, or observer-export claims without rerunning those rows on the same memory convention.

The minimum numerical packet must emit:

| Field | Payload |
| --- | --- |
| `time_grid` | collocation nodes on $[t_0-h_{\mathrm{mem}},t_1]$ |
| `history_window` | $h_{\mathrm{mem}}$, $h_{\max}$, and drift bound $V_C$ |
| `memory_policy` | fixed, active-window, or support-complete memory convention |
| `eta_active_max` | largest retained dimensionless delay and memory margin |
| `support_memory_bound` | $2r_{\max}$ or sharper interval certificate used for memory completeness |
| `tail_force_error_bound` | omitted-force bound for uncertified tails, using [unresolved-tail-force-error-bound.md](unresolved-tail-force-error-bound.md); retained rows require either zero tail or a recomputed full ledger |
| `tail_root_assimilation` | extended-ledger status from [tail-root-assimilation-theorem.md](tail-root-assimilation-theorem.md), required when tail roots are found |
| `m3_tail_resolution_protocol` | $\rho=0.8$ exact-antipodal $M=3$ tail exclusion-or-assimilation status from [support-complete-m3-tail-resolution-protocol.md](support-complete-m3-tail-resolution-protocol.md), required before a support-complete $M=3$ corrector |
| `m3_tail_interval_enclosures` | slab interval bounds from [support-complete-m3-tail-interval-enclosures.md](support-complete-m3-tail-interval-enclosures.md), required to make the tail-resolution status certified rather than sampled |
| `m3_tail_mesh_lift` | arclength-cell tail exclusion or root-sheet assimilation status from [support-complete-m3-tail-mesh-lift.md](support-complete-m3-tail-mesh-lift.md), required before nodewise tail evidence can support curve-level claims |
| `adaptive_memory_trust_radius` | active-window, support-memory, and tail-certificate continuation radii from [adaptive-memory-trust-radius-lemma.md](adaptive-memory-trust-radius-lemma.md) |
| `support_complete_obstruction_certificate` | cokernel obstruction status from [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md), required before using left-null evidence to open antipodal relaxation |
| `adjoint_cokernel_equations` | weighted adjoint basis, root-transfer margins, obstruction scalars, and projected relaxation-column status from [adjoint-cokernel-equations.md](adjoint-cokernel-equations.md) |
| `symmetry_block_decomposition` | row-aware pair sector, binary Fourier block, block cokernel, and block relaxation status from [symmetry-block-decomposition-theorem.md](symmetry-block-decomposition-theorem.md) |
| `support_complete_newton_closure` | range/cokernel Newton closure status from [support-complete-newton-closure-certificate.md](support-complete-newton-closure-certificate.md), required before treating descent as a dynamics candidate |
| `branch_event_classification` | first-event status from [branch-event-classification-theorem.md](branch-event-classification-theorem.md), required whenever a continuation row fails or changes ledger convention |
| `branch_event_normal_form` | event-surface transversality and reset rule from [branch-event-normal-forms.md](branch-event-normal-forms.md), required for a simple first event |
| `m3_successor_certificate` | composite decision object from [support-complete-m3-successor-certificate-target.md](support-complete-m3-successor-certificate-target.md), required for the next exact-antipodal $M=3$ support-complete claim |
| `m3_executable_solve_theorem` | ordered solve status from [support-complete-m3-executable-solve-theorem.md](support-complete-m3-executable-solve-theorem.md), required to report one exact-antipodal $M=3$ decision without collapsing proof-budget and obstruction failures |
| `m3_corrector_system` | exact-antipodal $M=3$ residual, derivative, Krawczyk, cokernel, action, and obstruction status from [support-complete-m3-corrector-system.md](support-complete-m3-corrector-system.md), required after tail resolution |
| `m3_action_scale_protocol` | post-tail $\Gamma_B$, virtual-work curl, scalar inertia, and fit/action status from [support-complete-m3-action-scale-protocol.md](support-complete-m3-action-scale-protocol.md), required before fitted $\Gamma_K$ can be promoted |
| `m3_krawczyk_proof_budget` | chart-radius, SVD range, derivative-envelope, cokernel, and obstruction budget from [support-complete-m3-krawczyk-proof-budget.md](support-complete-m3-krawczyk-proof-budget.md), required to distinguish proof-budget failure from true obstruction |
| `m3_augmented_root_corrector` | explicit-delay augmented residual and Schur-complement status from [support-complete-m3-augmented-root-corrector.md](support-complete-m3-augmented-root-corrector.md), optional but recommended for support-complete root/dynamics Krawczyk solves |
| `exact_antipodal_mode_refinement` | higher-mode exact-antipodal column status from [exact-antipodal-mode-refinement-certificate.md](exact-antipodal-mode-refinement-certificate.md), required before treating an $M=3$ defect as relaxation evidence |
| `coefficient_space_continuation` | tangent, pseudo-arclength corrector, and event margins from [coefficient-space-branch-continuation-theorem.md](coefficient-space-branch-continuation-theorem.md), required after a support-complete dynamics/action zero |
| `branch_switching_bifurcation` | extra-kernel, adjoint cokernel, Lyapunov-Schmidt, and symmetry-breaking status from [branch-switching-bifurcation-theorem.md](branch-switching-bifurcation-theorem.md) |
| `branch_tangent_sensitivity` | tangent derivatives from [branch-tangent-sensitivity-equations.md](branch-tangent-sensitivity-equations.md), required for Krawczyk, event, action, and Floquet rows |
| `root_dependent_variational_equation` | linearized root-delay, force, projected dynamics, and monodromy operator from [root-dependent-variational-equation.md](root-dependent-variational-equation.md) |
| `second_variation_action_stability` | action Hessian, second root sensitivities, Morse index, and Floquet-nullity compatibility from [second-variation-action-stability-theorem.md](second-variation-action-stability-theorem.md) |
| `conservative_monodromy_classification` | boundary two-form, reciprocal multiplier audit, conservative class, and dissipation/exchange status from [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md) |
| `noether_neutral_mode_reduction` | expected gauge, Noether, conserved-level, branch-family, Hessian-nullity, and unit-multiplier quotient status from [noether-neutral-mode-reduction-theorem.md](noether-neutral-mode-reduction-theorem.md) |
| `krein_elliptic_stability` | Krein forms, unit-multiplier semisimplicity, signatures, and collision scan from [krein-elliptic-stability-theorem.md](krein-elliptic-stability-theorem.md) |
| `energy_momentum_orbital_stability` | conserved-current leaf, augmented Hessian, symplectic slice, and orbital stability status from [energy-momentum-orbital-stability-theorem.md](energy-momentum-orbital-stability-theorem.md) |
| `antipodal_relaxation_column_certificate` | pair-midpoint projected-column status from [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md), required before opening antipodal relaxation |
| `gamma_fit_action_identifiability` | fit/action compatibility status from [gamma-fit-action-identifiability-lemma.md](gamma-fit-action-identifiability-lemma.md), required before promoting fitted $\Gamma_K$ |
| `collocation_refinement_error` | off-grid residual, root-ledger, excluded-gap, and projector-drift certificate from [collocation-refinement-error-certificate.md](collocation-refinement-error-certificate.md) |
| `finite_mode_convergence` | uniform-refinement status from [finite-mode-branch-convergence-theorem.md](finite-mode-branch-convergence-theorem.md), required before finite rows become curve-level branch evidence |
| `same_source_self_root_policy` | ordinary self-root exclusion, regularized fold-layer, or split-source decision from [same-source-self-root-exclusion-lemma.md](same-source-self-root-exclusion-lemma.md) |
| `fold_layer_regularization_action` | regulated fold-layer action and event status from [fold-layer-regularization-action-theorem.md](fold-layer-regularization-action-theorem.md), required before self/fold force retention |
| `medium_response_constitutive_closure` | medium-response constitutive and exchange-ledger status from [medium-response-constitutive-closure-theorem.md](medium-response-constitutive-closure-theorem.md), required before medium force retention |
| `delayed_force_lipschitz_envelope` | per-root force derivative envelope from [delayed-force-lipschitz-envelope.md](delayed-force-lipschitz-envelope.md), required by trust, refinement, closure, and curl certificates |
| `root_ledger_floquet_stability` | root-ledger-preserving monodromy and perturbation-recovery status from [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md) |
| `root_delay_variations` | $D_\xi\eta_a$ for every retained root label in the variational equation |
| `force_kernel_derivative` | $D_\xi\mathbf{f}_a$ and $D_\xi(P^\perp\widetilde{\mathbf{F}})$ with root motion included |
| `linear_history_operator` | finite-mode or operator representation of the root-dependent variational equation |
| `return_map_derivative` | $DP_B$ including the phase-section correction |
| `gauge_split` | declared gauge, neutral/tangent, and transverse subspaces used by the reduced monodromy |
| `noether_action_conservation_closure` | event conservation status from [noether-action-conservation-closure-theorem.md](noether-action-conservation-closure-theorem.md), required before event/action retention |
| `interpolant` | interpolation order and continuity class used for root and force rows |
| `endpoint_convention` | periodic, event-window, or finite-boundary endpoint rule |
| `regulator` | $\eta$ and the fold-layer convention if any |

---

## 4. Active Causal-Root Solver

For each ordered pair $(i,j)$ and each receiver time $t$, solve

$$
G_{ij}(t,s)
=
\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|-c_f(t-s)
=0,
\qquad
s<t.
$$

The solver must use a bracketed root pass followed by Newton or secant refinement inside each bracket. The root derivative is

$$
\frac{\partial G_{ij}}{\partial s}(t,s)=c_fJ_{ij}(t,s),
$$

where

$$
J_{ij}(t,s)
=
1-
\frac{\mathbf{v}_j(s)\cdot\hat{\mathbf{r}}_{ij}(t,s)}{c_f}.
$$

The root residual row is

$$
\mathcal{R}_{\mathrm{root}}
=
\sup_{(i,j,\alpha,t)\in\mathcal{A}_q}
\frac{|G_{ij}(t,s_{ij}^{\alpha}(t))|}{\epsilon_G}.
$$

The Jacobian row is

$$
J_{\min}^{(q)}
=
\inf_{(i,j,\alpha,t)\in\mathcal{A}_q}
\left|J_{ij}^{\alpha}(t)\right|,
\qquad
\mathcal{R}_{\mathrm{Jac}}
=
\frac{\epsilon_J}{J_{\min}^{(q)}}.
$$

A retained root label $\alpha$ may continue across $W$ only while the root remains isolated, stays inside $[t-h_{\mathrm{mem}},t)$, and satisfies $|J_{ij}^{\alpha}| > \epsilon_J$. Root count changes are branch events. They require a new candidate branch label unless a declared $\eta > 0$ fold-layer rule assigns the row `regularized-fold-layer`.

The root solver emits one ledger entry per root:

| Entry | Meaning |
| --- | --- |
| `receiver` | index $i$ |
| `source` | index $j$ |
| `root_label` | continuation label $\alpha$ |
| `delay` | $\tau_{ij}^{\alpha}=t-s_{ij}^{\alpha}$ |
| `jacobian` | $J_{ij}^{\alpha}$ |
| `status` | `retained-positive-delay`, `regularized-fold-layer`, or `reject` |
| `force_used` | whether this root contributes to $\mathbf{F}_{ij}$ |

---

## 5. Residual Vector

The protocol uses the same residual vector as the branch-mathematics packet:

$$
\mathcal{R}_{\mathrm{tri}}
=
\left(
\mathcal{R}_{\mathrm{state}},
\mathcal{R}_{\mathrm{phase}},
\mathcal{R}_{\mathrm{root}},
\mathcal{R}_{\mathrm{Jac}},
\mathcal{R}_{\mathrm{speed/clock}},
\mathcal{R}_{\mathrm{dyn}},
\mathcal{R}_{\mathrm{inventory}},
\mathcal{R}_{E},
\mathcal{R}_{\mathrm{top}},
\mathcal{R}_{\mathrm{exposure}},
\mathcal{R}_{\mathrm{Lorentz}},
\mathcal{R}_{\mathrm{event}}
\right).
$$

The required search residuals are:

| Residual | Protocol definition |
| --- | --- |
| $\mathcal{R}_{\mathrm{state}}$ | support descriptor violation, center-gauge violation, noncollision floor, and endpoint consistency |
| $\mathcal{R}_{\mathrm{phase}}$ | phase-offset, winding, and return-section residuals |
| $\mathcal{R}_{\mathrm{root}}$ | root equation residual plus root completeness status |
| $\mathcal{R}_{\mathrm{Jac}}$ | Jacobian-floor ratio $\epsilon_J/J_{\min}^{(q)}$ |
| $\mathcal{R}_{\mathrm{speed/clock}}$ | branch-mode speed, clock, period, or winding closure |
| $\mathcal{R}_{\mathrm{dyn}}$ | branch-mode force/curvature closure |
| $\mathcal{R}_{\mathrm{speed}}$ | angle-clock diagnostic $\sup_{i,t}|\|\mathbf{u}_i(t)\|-c_f|/\epsilon_v$; replaced by $\mathcal{R}_L$ and $\mathcal{R}_T$ in an arclength chart |
| $\mathcal{R}_{L}$ | arclength period-compatibility row $L_i=L_*$ or declared rational winding data |
| $\mathcal{R}_{T}$ | unit-tangent row $\|\mathbf{Y}'_i\|=1$ for intrinsic curve searches |
| $\mathcal{R}_{\mathrm{tan}}$ | fixed-speed tangential force closure |
| $\mathcal{R}_{\mathrm{speedODE}}^\nu$ | bounded-speed tangent forcing zero-mean, primitive-excursion, speed-band, and clock/length closure |
| $\mathcal{R}_{\parallel}^{\nu}$ | bounded-speed tangential evolution row $\nu_i\nu_i'-\Gamma\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^\nu$ |
| $\mathcal{R}_{\perp}^{\nu}$ | bounded-speed normal row $\nu_i^2\mathbf{K}_i-\Gamma P_i^\perp\widetilde{\mathbf{F}}_i^\nu$ |
| $\mathcal{R}_{\mathrm{curv}}$ | force-versus-curvature closure $\mathbf{Y}_i''-\Gamma P_i^\perp\widetilde{\mathbf{F}}_i$ |
| $\mathcal{R}_{\mathrm{inventory}}$ | $(N_+,N_-;C_{\mathrm{cent}},S_{\mathrm{chor}},Q)$ consistency |
| $\mathcal{R}_{E}$ | history-dressed energy/action conservation using the retained active roots |
| $\mathcal{R}_{\mathrm{top}}$ | carrier label, winding, framed-wake, node-clearance, and parity rows |
| $\mathcal{R}_{\mathrm{exposure}}$ | exposure and Noether-Sea medium-response extraction, or `not_computed` |
| $\mathcal{R}_{\mathrm{Lorentz}}$ | moving-branch observer export, or `not_computed` |
| $\mathcal{R}_{\mathrm{event}}$ | event ledger for $E$, $\mathbf{p}$, $\mathbf{J}$, $Q$, source provenance, recoil, and medium update |

The fixed-speed tangential residual is

$$
\mathcal{R}_{\mathrm{tan},i}(t)
=
\mathbf{u}_i(t)\cdot
\left[
\sum_{(j,\alpha)\in\mathcal{A}_i(t)}
\mathbf{F}_{ij}\!\left(t,s_{ij}^{\alpha}(t)\right)
-
\ddot{\mathbf{C}}(t)
\right].
$$

In the arclength chart, the corresponding vector residual is

$$
\mathcal{R}_{\mathrm{curv},i}(\lambda)
=
\mathbf{Y}_i''(\lambda)
-\Gamma P_i^\perp(\lambda)
\widetilde{\mathbf{F}}_i(\lambda),
$$

with

$$
\mathcal{R}_{\mathrm{tan},i}(\lambda)
=
\mathbf{Y}_i'(\lambda)\cdot
\widetilde{\mathbf{F}}_i(\lambda).
$$

In the bounded speed factor chart, $\mathcal{R}_{\mathrm{tan}}=0$ is replaced by $\mathcal{R}_{\mathrm{speedODE}}^\nu$, $\mathcal{R}_{\parallel}^{\nu}$, and $\mathcal{R}_{\perp}^{\nu}$ on the same bounded-speed root ledger, with support/action exchange rows attached when free-support constraints are active.

For optimization and acceptance, use the dimensionless scalar

$$
r_{\mathrm{tri}}
=
\max_k
\frac{\|\mathcal{R}_{\mathrm{tri},k}\|}
{\epsilon_{\mathrm{tri},k}}.
$$

Rows marked `not_computed` are excluded from $r_{\mathrm{tri}}$ only if they are not used to support any claim. A retained branch candidate must still pass the root, carrier, inventory, history-energy, event/action, and stability rows.

---

## 6. Event And Action Ledger Hooks

The force row, energy row, angular-momentum row, and event row must read the same active roots $\mathcal{A}_q$. The action hook records

| Hook | Required payload |
| --- | --- |
| `energy_action` | $E_{\mathrm{hist}}^{(q)}(t)$, action increments, regulator $\eta$, active roots, and endpoint convention |
| `angular_momentum` | $\mathbf{J}_{\mathrm{mech}}$, $\mathbf{J}_{\mathrm{wake}}$, $\mathbf{J}_{\mathrm{sea}}$, boundary torque if any, and $\mathcal{R}_{\mathbf{J}}^{(q)}$ |
| `event_ledger` | $\mathcal{L}_{E\mathbf{p}\mathbf{J}Q}^{(q)}$, source provenance, recoil, Noether-Sea update, and heat-channel status |
| `branch_identity` | label set, polarity set, $\mathcal{I}_q$, and root-ledger version |

For an isolated periodic branch, the event/action row is evaluated over one candidate return interval:

$$
\Delta X_q
=
X_q(t_0+T)-X_q(t_0),
\qquad
X\in\{E_{\mathrm{hist}},\mathbf{p},\mathbf{J},Q\}.
$$

For a reaction or transition event, use the out-minus-in convention:

$$
\Delta X_{\mathrm{branch}}(e)
=
\sum_{B\in\mathcal{B}_{\mathrm{out}}(e)}X(B;t_+)
-
\sum_{B\in\mathcal{B}_{\mathrm{in}}(e)}X(B;t_-).
$$

The event residual row is

$$
\mathcal{R}_{\mathrm{event}}(e)
=
\left(
\mathcal{R}_Q,
\mathcal{R}_E,
\mathcal{R}_{\mathbf{p}},
\mathcal{R}_{\mathbf{J}},
\mathcal{R}_{\mathrm{src}},
\mathcal{R}_{\mathrm{recoil}},
\mathcal{R}_{\mathrm{sea}},
\mathcal{R}_{\mathrm{heat}}
\right),
$$

with $\mathcal{R}_{\mathrm{heat}}$ included only when $B_{\mathrm{heat}}$ is named. Heat is never allowed to hide an unclosed event residual.

---

## 7. Optimization Objective

The optimizer searches over $\mathbf{a}$ and continuation parameters $\mu$, but acceptance is not based on the optimizer value alone. The objective is

$$
\mathcal{J}(\mathbf{a},\mu)
=
\sum_{k\in K_{\mathrm{soft}}}
w_k
\left\|
\frac{\mathcal{R}_k(\mathbf{a},\mu)}
{\epsilon_k}
\right\|_2^2
+
w_P
\left\|
\frac{P_\mu(Z)-Z}{\epsilon_P}
\right\|_{\mathscr{H}}^2
+
B_x+B_J+B_R+B_{\mathrm{root}},
$$

where $P_\mu$ is the return map, $Z$ is the return-section history state, and the barrier terms enforce:

$$
d_{\min}>\epsilon_x,
\qquad
J_{\min}^{(q)}>\epsilon_J,
\qquad
R-\delta\le\|\mathbf{y}_i\|\le R+\delta,
\qquad
|\mathcal{A}_q(t)|<\infty.
$$

The soft residual set is

$$
K_{\mathrm{soft}}
=
\{
\mathrm{phase},
\mathrm{speed},
\mathrm{length},
\mathrm{unitT},
\mathrm{tan},
\mathrm{curvature},
\mathrm{energy},
\mathrm{top},
\mathrm{event}
\}.
$$

The hard gates are noncollision, root completeness, Jacobian floor, root-status assignment, inventory consistency, and finite memory. A solution with low $\mathcal{J}$ but a hard-gate violation is rejected.

---

## 8. Continuation Parameters

Continuation must report the parameter path

$$
\Gamma_{\mathrm{cont}}
=
\left\{
\mu(\lambda):0\le\lambda\le1
\right\}.
$$

The minimal continuation coordinates are:

| Parameter | Role |
| --- | --- |
| $\lambda_{\mathrm{def}}$ | moves from rigid octahedral seed to deformed support-band row |
| $\delta/R$ | opens radial support-band thickness |
| $\phi_a$ | phase-offset search variables |
| $M$ | Fourier or collocation order |
| $\eta$ | regulator used for fold-layer and force regularity |
| $\omega$ or $T$ | carrier frequency or return time |
| $\mathsf{root\_policy}$ | required partner, self, and cross-binary root rows |
| $\mathcal{I}$ | neutral or charged central-inventory row |
| $\mathsf{medium\_response}$ | Noether-Sea update extraction status, if computed |

A continuation step is accepted only if the previous active root labels can be continued or a branch event is explicitly recorded. If root counts change without a declared regularized transition, the step terminates and a new branch label is required.

---

## 9. Stability Diagnostics

Define a return section $\Sigma_q$ by fixing the center gauge, branch inventory, root-status convention, and one phase gauge, for example $\theta_1=0\pmod{2\pi}$. The return map

$$
P_\mu:\Sigma_q\to\Sigma_q
$$

takes an admissible history state $Z=X_{t_*}$ to the next crossing with the same section. The return gap is

$$
g_P^{(q)}
=
\frac{
\left\|
\Pi_{\mathrm{ng}}\left(P_\mu(Z)-Z\right)
\right\|_{\mathscr{H}}
}
{\epsilon_P},
$$

where $\Pi_{\mathrm{ng}}$ removes declared gauge directions such as absolute phase and translation. The branch-return row passes only if $g_P^{(q)}\le1$ after mesh refinement.

The Lyapunov row reports finite-time exponents computed from tangent integration or root-ledger-preserving finite differences:

$$
\Lambda^{(q)}
=
\{\lambda_1,\ldots,\lambda_m\},
$$

with the split

$$
\lambda_\perp,
\qquad
\lambda_{\parallel}^-,
\qquad
\lambda_{\parallel}^+.
$$

The stability table must include:

| Row | Pass condition |
| --- | --- |
| `return_map` | $g_P^{(q)}\le1$ and the same root-status convention survives one return |
| `stable_limit_cycle` | one phase-neutral exponent within $\epsilon_\lambda$ of $0$ and all non-gauge transverse exponents $< -\epsilon_{\mathrm{stab}}$ |
| `quasiperiodic_carrier` | declared neutral torus directions within $\epsilon_\lambda$ of $0$ and all non-gauge transverse exponents $< -\epsilon_{\mathrm{stab}}$ |
| `nhim_domination` | $\max \operatorname{Re}(\lambda_{\perp}) < \min \operatorname{Re}(\lambda_{\parallel}^-) \le 0$ |
| `srb_target` | NHIM row plus $\max \operatorname{Re}(\lambda_{\parallel}^+) > 0$ and reported $h_{\mathrm{KS}}^{(q)}$ |
| `perturbation_recovery` | perturbed histories return to the same section, inventory, and root-status class within $\epsilon_P$ over the declared window |

If the Lyapunov spectrum does not support the claimed stability class, the failure code is `nhim-domination-fail`. A branch may still be a weaker stable limit-cycle or quasiperiodic candidate if its corresponding row passes.

---

## 10. Acceptance Thresholds

The protocol has two acceptance levels.

### 10.1 Retained Search Candidate

A candidate may be retained for priority-side analysis only if all rows below pass:

| Gate | Threshold |
| --- | --- |
| finite memory | $h_{\mathrm{mem}}\le h_{\max}$ |
| memory completeness | active-window rows require $m_{\mathrm{mem}}>0$; retained action/export rows require support-complete memory or certified tail exclusion |
| noncollision | $d_{\min} > \epsilon_x$ |
| support descriptor | radial sector: $R-\delta\le\|\mathbf{y}_i(t)\|\le R+\delta$ for every active site; free-support sector: declared support functional with equivalent certified margins |
| root residual | $\mathcal{R}_{\mathrm{root}}\le1$ |
| Jacobian floor | $J_{\min}^{(q)} > \epsilon_J$ |
| root status | no required root is `reject` and no required row is absent |
| speed or arclength | angle-clock rows require $\mathcal{R}_{\mathrm{speed}}\le1$; arclength rows require $\mathcal{R}_L\le1$ and $\mathcal{R}_T\le1$; bounded-speed rows require $\mathcal{R}_{\nu\mathrm{band}}\le1$ and $\mathcal{R}_{\mathrm{speedODE}}^\nu\le1$ |
| tangential closure | fixed-speed rows require $\sup_{i,t}|\mathcal{R}_{\mathrm{tan},i}(t)|/\epsilon_{\mathrm{tan}}\le1$; bounded-speed rows require $\mathcal{R}_{\parallel}^{\nu}\le1$ |
| curvature closure | fixed-speed arclength rows require $\mathcal{R}_{\mathrm{curv}}\le1$; bounded-speed rows require $\mathcal{R}_{\perp}^{\nu}\le1$ |
| phase/winding | $\mathcal{R}_{\mathrm{phase}}\le1$ and winding rows match declared integers |
| inventory | $\mathcal{R}_{\mathrm{inventory}}\le1$ and $Q=\epsilon(N_+-N_-)$ |
| history energy | $\mathcal{R}_E\le1$ |
| event/action | $\mathcal{R}_{\mathrm{event}}\le1$ with the declared endpoint convention; no event or action claim may use `not_computed` |
| return map | $g_P^{(q)}\le1$ |
| stability class | at least one of `stable_limit_cycle`, `quasiperiodic_carrier`, `nhim_domination`, or `srb_target` passes |

### 10.2 Architecture Decision Candidate

A retained search candidate may be forwarded to the architecture decision gate only after the live-ledger certificate packet also reports:

| Gate | Required status |
| --- | --- |
| exposure medium | `passed`, `failed`, or `not_computed`; no mass claim from `not_computed` |
| Lorentz export | `passed`, `failed`, or `not_computed`; no clock/ruler claim from `not_computed` |
| photon transition | `passed`, `failed`, or `not_computed`; event ledger attached if `passed` |
| color scaffold | `passed`, `failed`, or `not_computed`; no continuous color claim from $\mathcal{S}_3$ alone |
| strong-field row | `passed`, `failed`, or `not_computed`; no finite-boundary claim from implication |
| NTB comparison | replaced, preserved, and fallback assumptions recorded |

---

## 11. Failure Codes

The protocol uses existing same-level failure vocabulary. A failed run must report the first hard failure and any later diagnostic failures reached before termination.

| Failure code | Trigger in this protocol |
| --- | --- |
| `inventory-mismatch` | integer inventory does not match the branch type or declared $Q$ |
| `projection-collision` | $d_{\min}\le\epsilon_x$ |
| `support-band-escape` | a radial-sector row leaves $[R-\delta,R+\delta]$ or a free-support descriptor margin fails |
| `phase-lock-drift` | phase, winding, or return-section residual exceeds tolerance |
| `root-ledger-empty` | a required partner, self, or cross-binary root row is absent |
| `memory-window-exit` | a required root continues outside the declared memory window |
| `memory-window-reset` | memory depth is raised after a regular memory-window exit and all ledger rows must be recomputed |
| `chart-speed-failure` | inverse arclength regularity or equal-period constraint qualification fails |
| `active-window-only` | memory depth contains emitted roots but does not certify the support-complete tail |
| `support-complete-memory-open` | support-bound or tail-complete memory has not yet been certified |
| `tail-interval-uncertified` | $\eta_{\max}<2r_{\max}$ and the tail interval lacks an excluded-root certificate |
| `tail-certificate-failure` | the declared tail slabs fail distance, monotone-endpoint, and Lipschitz exclusion rows |
| `tail-exclusion-restored` | tail slabs certify root absence after a tail-certificate rescreen |
| `tail-force-error-unbounded` | unresolved tail roots cannot be assigned a finite count/Jacobian envelope, so omitted-force error is not bounded |
| `tail-roots-found-rerun-required` | tail roots are found and promoted, but dynamics/action rows have not yet been recomputed |
| `tail-roots-assimilated` | tail roots are bracketed, isolated, and included in an extended ledger |
| `tail-assimilated-support-complete-memory` | old plus assimilated root brackets and root-free complements cover the support interval |
| `tail-assimilated-active-only` | some support tail remains unresolved after partial assimilation |
| `tail-root-policy-mismatch` | found tail roots require an ordered source row outside the declared source-pair policy |
| `tail-antipodal-closure-failed` | exact-antipodal tail roots are not closed under the antipodal pairing map |
| `tail-roots-found-action-rerun-required` | tail roots are found but force/action/$\Gamma$/curl rows have not been recomputed on the extended ledger |
| `extended-ledger-descent-lost` | recomputing on assimilated tail roots destroys the previous active-window residual descent |
| `extended-ledger-descent-survives` | recomputing on assimilated tail roots preserves the residual descent and permits successor-certificate evaluation |
| `ledger-rerun-required` | a memory, support, root, or action convention changed and all dependent rows must be recomputed before retention |
| `adaptive-memory-trust-radius-open` | no certified radius preserves the current active-root, support-memory, and tail-certificate convention |
| `newton-krawczyk-proof-budget-open` | sufficient Kantorovich or Krawczyk inequalities fail without a support-complete cokernel obstruction |
| `obstruction-certificate-open` | left-null/cokernel obstruction data are insufficient to declare exact-antipodal dynamics locally blocked |
| `support-complete-newton-closure-open` | range/cokernel Newton data are insufficient to declare a support-complete dynamics candidate |
| `range-krawczyk-failed` | Krawczyk range certificate fails on the declared support-complete chart |
| `range-kantorovich-failed` | Kantorovich range certificate fails on the declared support-complete chart |
| `cokernel-closure-failed` | cokernel residual plus tail and discretization errors exceed dynamics tolerance |
| `descent-without-closure` | residual decreases but range/cokernel support-complete closure is not certified |
| `m3-successor-certificate-open` | the exact-antipodal $M=3$ row has not emitted one composite memory, tail, refinement, Krawczyk, cokernel, $\Gamma$, and curl packet |
| `support-complete-dynamics-candidate` | support-complete $M=3$ range/cokernel dynamics closes to tolerance, but event/action conservation and stability are not yet fully retained |
| `exact-antipodal-obstructed` | the support-complete cokernel lower bound exceeds nonlinear, tail, discretization, and dynamics tolerances on the exact-antipodal chart |
| `antipodal-relaxation-column-certificate-open` | pair-midpoint columns have not been shown to address the exact-antipodal obstruction |
| `gamma-fit-action-identifiability-open` | fitted $\Gamma_K$ is not yet tied to an action-derived scale and scalar branch inertia |
| `gamma-fitted-not-derived` | $\Gamma_K$ is fitted only and no action-derived branch scale is available |
| `inertia-ledger-missing` | branch inertia or tensorial inertia row is absent |
| `inertia-not-scalar` | inertia row does not reduce to a scalar on a claimed scalar-$\Gamma$ branch |
| `history-one-form-curl-open` | finite-mode exterior curl of the delayed-force work one-form is above tolerance |
| `gamma-fit-action-mismatch` | fitted $\Gamma_K$ lies outside the action-derived compatibility band |
| `action-gamma-curl-obstruction` | support-complete dynamics data fail the finite-mode curl row, fitted/action $\Gamma$ compatibility, or root-ledger consistency between force and action |
| `collocation-refinement-certificate-open` | off-grid residual or root-ledger drift is not bounded between sampled nodes |
| `finite-mode-convergence-open` | no uniform refinement sequence has been certified for the proposed branch row |
| `local-dynamics-evidence-only` | finite evidence improves dynamics rows but does not satisfy the convergence theorem |
| `root-gap-collapse` | excluded root gaps shrink to zero in the refinement or continuation limit |
| `mesh-error-not-vanishing` | collocation or projection error does not tend to zero |
| `residual-not-vanishing` | continuous dynamics residual envelope does not tend to zero |
| `gamma-convention-drift` | fitted, reciprocal, and action-derived $\Gamma$ conventions change across the refinement sequence |
| `ordinary-self-root-excluded` | ordinary same-source roots cannot supply a retained positive-delay force row in the arclength chart |
| `fold-layer-action-row-open` | regularized fold-layer force lacks a certified action, weak-limit, or event ledger |
| `medium-response-constitutive-closure-open` | medium-response force lacks constitutive/action, exchange, or symmetry closure |
| `delayed-force-lipschitz-envelope-open` | delayed force derivative constants are not certified on the retained root ledger |
| `root-ledger-floquet-stability-open` | stability rows are missing or use a different root/memory/action convention |
| `floquet-root-ledger-mismatch` | monodromy uses a different root, memory, or action convention than dynamics |
| `floquet-gamma-fit-only` | stability uses a fitted $\Gamma$ instead of an action-derived scale |
| `gauge-multiplier-unresolved` | gauge-neutral multipliers are not identified or separated from transverse spectrum |
| `gamma-derivative-missing` | $D\Gamma_B$ is absent from the action/inertia ledger, so retained Floquet status cannot be claimed |
| `noether-conservation-closure-open` | event conservation has not been derived from one action, inventory, and endpoint convention |
| `action-gamma-rerun-required` | root or memory convention changes without recomputing $\Gamma$, action, energy, and event rows |
| `jacobian-floor-violation` | $J_{\min}^{(q)}\le\epsilon_J$ |
| `near-zero-self-root-unresolved` | tangent or near-zero same-source row lacks a retained or regularized status |
| `node-clearance-fail` | $\chi_x^n$, $\chi_t^n$, or $\chi_J^n$ falls below its declared floor |
| `jacobian-node-graze` | a node-adjacent active root violates the Jacobian floor |
| `tangential-residual-open` | fixed-speed carrier has tangential force residual above tolerance |
| `curvature-force-mismatch` | arclength force ledger is not parallel to the carrier curvature within tolerance |
| `period-length-mismatch` | deformed curves lack a common period length or declared rational winding relation |
| `energy-ledger-open` | $E_{\mathrm{hist}}$ fails the history-energy tolerance |
| `momentum-ledger-open` | momentum ledger is absent or fails the event-conservation tolerance |
| `angular-momentum-ledger-open` | $\mathcal{R}_{\mathbf{J}}^{(q)} > 1$ after wake and Noether-Sea updates |
| `torque-closure-open` | boundary torque row is absent or fails when boundary exchange is declared |
| `source-provenance-open` | outgoing labels lack incoming or Noether-Sea source provenance |
| `recoil-open` | recoil entries do not match named receiving objects or branches |
| `medium-update-open` | Noether-Sea update extraction is required but not computed |
| `medium-update-root-mismatch` | medium update uses different roots or event interval than the branch |
| `heat-channel-unjustified` | heat is named before nonheat channels are populated or ruled out |
| `nhim-domination-fail` | Lyapunov spectrum fails the claimed stability or SRB target |
| `exposure-quotient-open` | exposure or medium-response rows change under refinement beyond tolerance |
| `lorentz-export-overclaim` | clock/ruler/signal rows are asserted without passing export residuals |
| `color-connection-missing` | $\mathcal{S}_3$ slots are promoted without continuous connection data |
| `strong-field-continuation-open` | finite-boundary continuation is absent for strong-field claims |

---

## 12. Staged Algorithm From Rigid Failure To Deformed Candidates

The retained-branch search proceeds in stages. Each stage emits the packet fields even when it fails.

### Stage 0: Reproduce The Rigid Octahedral Baseline

1. Set $\lambda_{\mathrm{def}}=0$, $\delta=0$, $\phi_1=\phi_2=\phi_3=0$, and $\omega=c_f/R$.
2. Recompute $d_{\min}=R$, the antipodal partner root $y_*\approx1.4781702664$, the cross-binary root screen, and $J_{\min,\mathrm{cross}}\approx0.7284199113$ on the declared grid.
3. Compute $\widetilde{\mathcal{R}}_{\mathrm{tan}}$ using the retained partner and cross-binary roots.
4. Record failure code `tangential-residual-open`.

Exit criterion: the numerical packet reproduces the known failure within declared refinement tolerance. If not, stop and fix the root or force implementation before searching.

### Stage 1: Rigid Phase-Offset Continuation

1. Keep the great-circle carrier rigid and vary $\phi_a$ and $T$.
2. Track partner and cross-binary root labels across the phase-offset path.
3. Minimize $\mathcal{R}_{\mathrm{tan}}$, $\mathcal{R}_{\mathrm{phase}}$, and $g_P$ while enforcing $d_{\min} > \epsilon_x$ and $J_{\min} > \epsilon_J$.
4. Reject any row that closes only by changing required root count without a branch event.

Exit criterion: either a rigid phase-offset row passes the carrier and return-map thresholds, or the best rigid row remains `tangential-residual-open` or `phase-lock-drift`.

### Stage 2: Radial Support-Band Deformation

1. Open $\delta/R$ from $0$ by continuation and enable the radial coefficients $\alpha_{a,\sigma,m}^{c,s}$.
2. Convert deformed rows to the arclength clock; treat the old angle-clock speed residual as diagnostic unless the branch deliberately remains in a constant-speed angle chart.
3. Track $h_{\mathrm{mem}}$, root labels, and $J_{\min}$ after every continuation step.
4. Add node-clearance rows if the deformed path still passes near octahedral nodes.

Exit criterion: fixed-speed rows retain only with $\mathcal{R}_{L} \le 1$, $\mathcal{R}_{T} \le 1$, $\mathcal{R}_{\mathrm{tan}} \le 1$, $\mathcal{R}_{\mathrm{curv}} \le 1$, $d_{\min} > \epsilon_x$, and no unresolved same-source tangent row. Bounded-speed rows instead require $\mathcal{R}_{\nu\mathrm{band}} \le 1$, $\mathcal{R}_{\mathrm{speedODE}}^\nu \le 1$, $\mathcal{R}_{\parallel}^{\nu} \le 1$, $\mathcal{R}_{\perp}^{\nu} \le 1$, and the same root/support/event guardrails.

### Stage 3: Nonplanar Direction Deformation

1. Enable $\boldsymbol{\xi}_{a,\sigma}$ and allow the carrier to become a nonplanar support-band choreography.
2. Re-extract phases from the return section or carrier chart; do not reuse rigid great-circle phase as an assumption.
3. Recompute $\mathcal{K}_q$, winding rows, framed-wake data, and node-clearance diagnostics.
4. Run the same root solver and event/action hooks on the deformed histories.

Exit criterion: the candidate must pass root, Jacobian, noncollision, support descriptor, arclength or bounded-speed clock, dynamics, phase, and history-energy rows before any spin, color, mass, or Lorentz row is interpreted.

### Stage 4: Root-Ledger And Regulator Continuation

1. Continue $\eta$ toward the declared target while preserving active root labels.
2. Assign every same-source row one of `retained-positive-delay`, `regularized-fold-layer`, or `reject`.
3. Verify weak-limit obligations if $\eta\to0$ is claimed.
4. Stop at `near-zero-self-root-unresolved` if no controlled fold-layer rule exists.

Exit criterion: $J_{\min}^{(q)} > \epsilon_J$, root count remains finite, and all required roots have retained or regularized status.

### Stage 5: Return Map And Lyapunov Classification

1. Build $P_\mu$ on $\Sigma_q$ using the same history window and root ledger.
2. Solve $P_\mu(Z)=Z$ or the declared invariant-curve target.
3. Compute $\Lambda^{(q)}$, $h_{\mathrm{KS}}^{(q)}$ when relevant, and perturbation recovery.
4. Assign the weakest supported stability class: stable limit cycle, quasiperiodic carrier, NHIM target, or SRB target.

Exit criterion: $g_P^{(q)}\le1$ and the Lyapunov row supports the claimed class. Otherwise stop with `nhim-domination-fail`.

### Stage 6: Event, Action, Exposure, And Export Rows

1. Compute $E_{\mathrm{hist}}$, action increments, $\mathbf{p}$, $\mathbf{J}$, $Q$, source provenance, recoil, and Noether-Sea update rows on the retained root convention.
2. Mark exposure, Lorentz, photon, color, and strong-field rows as `passed`, `failed`, or `not_computed`.
3. Reject any observer export promoted by implication.
4. Emit an NTB comparison row before any migration decision.

Exit criterion: the branch is a retained priority-side candidate only if the core retained rows pass. It is an architecture decision candidate only if the observer-export and comparison rows are explicitly populated as statuses.

---

## 13. Required Output Packet

Each run must emit this compact artifact list:

| Artifact | Required content |
| --- | --- |
| `metadata` | source commit, code version, tolerances, $\eta$, search stage, and continuation path |
| `state_vector` | $X_q$, $\mathcal{H}_q$, full-precision finite coefficients, support descriptor, center gauge, polarities, and inventory |
| `root_ledger` | $\mathcal{A}_q$, delays, Jacobians, statuses, root residual, and memory depth |
| `residuals` | complete $\mathcal{R}_{\mathrm{tri}}$ values, tolerances, statuses, and failure codes |
| `optimization` | $\mathcal{J}$, active constraints, weights, barriers, trust directions, retraction corrections, and refinement result |
| `return_map` | section definition, $P_\mu$, $g_P^{(q)}$, and gauge directions removed |
| `lyapunov` | spectrum, split into $\lambda_\perp$, $\lambda_{\parallel}^-$, $\lambda_{\parallel}^+$, and stability class |
| `event_action` | $E_{\mathrm{hist}}$, action increments, $\mathcal{L}_{E\mathbf{p}\mathbf{J}Q}^{(q)}$, source provenance, recoil, and medium update |
| `observer_exports` | exposure, Lorentz, photon, color, and strong-field rows marked `passed`, `failed`, or `not_computed` |
| `decision_gate` | retained-candidate status, architecture-decision status, first hard failure, and NTB comparison status |

The immediate next mathematical artifact is not another broad architecture note. It is a run packet that starts at Stage 0, reproduces `tangential-residual-open`, and then continues through Stage 2 or Stage 3 until either a deformed support-band candidate satisfies the retained search thresholds or the failure table gives a stable rejection reason.
