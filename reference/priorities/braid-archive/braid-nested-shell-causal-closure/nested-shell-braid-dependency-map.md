# Nested Shell Braid Dependency Map

## Purpose

This is the active-development workbench for [Nested Shell Braid Causal Closure](priorities.md). Its job is to make the proof ladder explicit before the synthesis is promoted into deployed or textbook-facing material.

The deployed dynamics baseline is [nested shell braid dynamics](../../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md#nested-shell-braid-dynamics). That chapter owns the mechanism definitions; this map owns the proof burdens that determine whether those mechanisms can carry the causal-closure synthesis.

Each claim is tracked as:

$$
\text{inputs}
\quad\to\quad
\text{mechanism}
\quad\to\quad
\text{output}
\quad\to\quad
\text{proof burden}.
$$

During active development, open proof burdens may remain here. Before deployment, every unresolved item must either be closed in the synthesis or routed into the priority system as an explicit task.

## Deployment Rule

No unresolved claim should remain as a loose sentence in the deployed version. Each open item must be tagged as one of:

- `closed`: supported by an accepted derivation, certificate, simulation, or validated reduction.
- `roadmap`: intentionally retained as a theorem target inside the document.
- `priority`: moved to an active or deferred priority workstream with a concrete task.
- `cut`: removed from deployed prose because it is not yet supported enough to carry.

The deployment gate is passed only when every non-closed item in this map has a `roadmap`, `priority`, or `cut` disposition.

## Logical Spine

### 0. Nested Shell Braid Dynamics Baseline

- Inputs: [nested shell braid dynamics](../../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md#nested-shell-braid-dynamics), [Noether Braid](../../../../content/markdown/aaa/noether-braid/noether-braid.md), and [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md).
- Mechanism: use the AAA dynamics chapter as the canonical source for Noether braid roles, speed-regime conventions, delay-envelope geometry, gradient response, local clock diagnostics, and alignment/stability tests.
- Output: a stable baseline vocabulary and mechanism set for the causal-closure synthesis.
- Proof burden: keep the priority synthesis from silently redefining the mechanism; any stronger claim about mass, proper time, photons, measurement, or relativistic limits must be carried as a theorem target, priority route, or cut item here.
- Current disposition: `roadmap`.

### 1. Substrate And Speed Conventions

- Inputs: Euclidean void, absolute substrate time, architrinos, causal wakes, primitive wake speed $c_f$.
- Mechanism: finite-speed causal wake propagation creates delayed hit roots and a substrate branch structure.
- Output: a root-ledger setting in which effective space, time, and particle behavior can be derived rather than postulated.
- Proof burden: keep $c_f$, $c_{\text{eff}}$, $c_\gamma$, and locally measured light speed distinct in every derivation.
- Current disposition: `roadmap`.

### 2. Inner Energy Zero

- Inputs: attractive two-body interaction with a causal inner wall $r_{\min}$.
- Mechanism: set $U(r_{\min})=0$ so inward attraction terminates at a finite maximum-curvature boundary instead of an infinite negative-energy convention.
- Output: negative-energy bookkeeping becomes an effective convention rather than an ontological sea of negative particles.
- Proof burden: connect the inner-boundary convention to existing energy chapter notation without changing tested Coulomb limits.
- Current disposition: `roadmap`.

### 3. Field-Speed Separator

- Inputs: primitive wake speed $c_f$ and component velocity relative to causal wakes.
- Mechanism: crossing $\|\mathbf{v}\|=c_f$ changes the active delayed-root count by separator events.
- Output: active partner-hit and self-hit ledgers become integer-valued branch data.
- Proof burden: certify allowed root-count jumps, especially parity and signed-degree conservation. Use the collinear-breather certificate as the first finite routing test: a pre-ledger failure rejects the chosen candidate or itinerary; a branch-chart failure means finite-root-ledger claims in higher-dimensional synthesis need stronger no-proliferation, Jacobian-floor, and inactive-gap gates; a topology failure blocks promotion of branch sums through separator layers until the $\eta>0$ well-posedness package is tightened.
- Priority route: `breather-proof` certificate branch charts.
- Current disposition: `priority`.

### 3b. Grazing Bifurcation Classification

- Inputs: separator function $h(\mathbf{x},\dot{\mathbf{x}}) = \|\dot{\mathbf{x}}\|^2 - c_f^2$, smooth pre-separator trajectory, and second-order causal Jacobian.
- Mechanism: causal-cone tangency at $h=0$ produces a non-smooth grazing bifurcation; post-separator deviation scales as $\sqrt{t-t_*}$ along the eigenvector of the newly active self-hit root.
- Output: classification of the separator as a square-root grazing event with predicted period-adding cascade signatures and a thin-strip Lyapunov-exponent profile on the self-hit side.
- Proof burden: derive the normal form; verify square-root scaling and period-adding cascades in simulation; connect $\Delta N\in 2\mathbb{Z}$ to fold-pair adding events in the cascade.
- Priority route: `breather-proof`, `simulations`.
- Current disposition: `priority`.

### 4. Noether Braid Architecture

- Inputs: nested binary assemblies, self-hit engine, middle fulcrum, outer shield.
- Mechanism: three mutually supporting binary layers distribute high-multiplicity internal closure, buffer phase stress, and regulate external coupling.
- Output: the Noether braid becomes the proposed stable matter unit.
- Proof burden: prove the slow-fast Noether braid minimality theorem. Show that under simultaneous kinematic stress $\beta>0$ and Noether sea gradient stress $G>0$, the stable slow manifold of an $n$-layer nested assembly persists for $n\ge 3$ and loses normal hyperbolicity for $n\le 2$ on a codimension-one set in $(\beta,G)$. Equivalently, derive the corresponding $n$-layer closure law with explicit role-counting in the slow-fast decomposition; universality is a consequence only if the same three-role law covers the admitted matter branches.
- Priority route: `mass-map`, `master-equation-closure`.
- Current disposition: `priority`.

### 5. Stored Geometric History To Rest Energy

- Inputs: active self-hit and partner-channel multiplicities trapped in a stable closure cycle.
- Mechanism: kinetic, interaction, and wake-mediated path-history content remains localized by resonant branch closure.
- Output: $E_{\text{rest}}\sim E_{\text{internal}}$.
- Proof burden: derive the internal-energy ledger from a concrete branch chart and show how shielding exposes the observed rest-energy footprint.
- Priority route: `mass-map`.
- Current disposition: `priority`.

### 6. Momentum Skew To Inertia

- Inputs: moving Noether braid with center-of-mass velocity $\mathbf{V}_{\text{cm}}$.
- Mechanism: the delayed causal Jacobian skews forward and backward internal wake exchange; expanding $J=J_{\text{rest}}-(\mathbf{V}_{\text{cm}}\cdot\hat{\mathbf{r}})/c_f+O(\|\mathbf{V}_{\text{cm}}\|^2)$ leaves a first-order residual after the resting symmetric loop cancels.
- Renormalization gap: the primitive Jacobian is written with $c_f$, while the macroscopic inertia coefficient is written with $c_{\text{eff}}^{-2}$. The Noether sea dressing of the closed root sum must explicitly convert primitive wake-delay weighting into the effective inverse-speed-squared response.
- Output:
  $$
  \mathbf{p}_{\text{int}}
  \approx
  \frac{E_{\text{internal}}}{c_{\text{eff}}^2}\mathbf{V}_{\text{cm}}.
  $$
- Proof burden: compute the first-order momentum skew from the full delayed root sum around a closed rank-three cycle, including the medium response tensor that reduces to $h^{ab}/c_{\text{eff}}^2$ in a homogeneous isotropic Noether sea cell, with $h^{ab}$ the inverse Euclidean spatial metric, not by radiation-box analogy alone.
- Priority route: `master-equation-closure`, `mass-map`.
- Current disposition: `priority`.

### 7. Shielded Energy To Equivalence Principle

- Inputs: shielded ledger response $\alpha\zeta(A)E_{\text{internal}}(A)$.
- Mechanism: bulk acceleration and Noether sea gradients perturb the same internal causal lock.
- Output:
  $$
  m_{\text{inertial}}(A)\approx m_{\text{gravitational}}(A).
  $$
- Proof burden: show composition-dependent residuals satisfy
  $$
  \eta_{AB}\lesssim10^{-13}
  $$
  across tested material pairs.
- Priority route: `master-equation-closure`, `strong-field-closure`.
- Current disposition: `priority`.

### 8. Transverse Causal Budget

- Inputs: local Noether sea rest frame, effective signal speed $c_{\text{eff}}$, assembly velocity $\mathbf{V}_{\text{cm}}$.
- Mechanism: internal wakes must spend axial budget tracking the moving receiver, leaving transverse budget
  $$
  c_{\perp}=c_{\text{eff}}\sqrt{1-\beta^2}.
  $$
- Effective-metric bridge: the same budget should be expressible through the ADM/Cartan bookkeeping fields $N$, $u^i_{\mathrm{sea,eff}}$, and $\gamma_{ij}^{\mathrm{eff}}$, without promoting that metric to substrate ontology.
- Output: one resource controls time dilation, length contraction, clock freeze, quantum-step admissibility, photon/rest-frame separation, and the local Lorentz map.
- Proof burden: promote this from a synthesis subsection into a standalone dynamics lemma, including the metric diagonalization that yields $\gamma_{\text{eff}}$ and the residual preferred-frame null tests.
- Priority route: `master-equation-closure`.
- Current disposition: `priority`.

### 8b. Moving Noether-Core Deformation Map (Provisional)

- Inputs: rest rank-three layer planes $\Pi_i^{(0)}$, rest layer paths $C_i^{(0)}$, inter-layer paths $C_{ij}^{(0)}$, branch label $q$, local medium drift $\mathbf{u}_{\text{sea}}$, and effective drift $\mathbf{w}=\mathbf{V}_{\text{cm}}-\mathbf{u}_{\text{sea}}$.
- Mechanism: construct a branch-indexed deformation map
  $$
  \mathcal{D}_{\beta,q}^{\mathrm{mov}}
  =
  \lambda_q(\beta)
  \left(
  P_{\perp}
  +
  \xi_q(\beta)P_{\parallel}
  \right)
  +
  \mathcal{E}_q(\beta),
  $$
  with $\xi_q=R_{\parallel,q}/R_{\perp,q}$, $\lambda_q=R_{\perp,q}/R_{\perp,q}(0)$, and $\mathcal{E}_q$ restricted to branch-sourced residuals. The map sends rest layer planes to moving spiral-helical layer geometry and must make the deformed path lengths $\ell_i(\beta,q)$ and $\ell_{ij}(\beta,q)$ close under the same transverse causal budget $c_{\perp}=c_{\text{eff}}\sqrt{1-\beta^2}$.
- Output: a single geometry object whose projections give layer-plane deformation, clock-rate reduction, longitudinal ruler contraction, and the preferred-frame leakage residual.
- Closure equation:
  $$
  \Omega_i(\beta,q)
  \frac{\ell_i(\beta,q)}{c_{\perp}(\beta)}
  =
  2\pi k_i,
  \qquad
  \Delta\Phi_{ij}\!\left(
  \frac{\ell_{ij}(\beta,q)}{c_{\perp}(\beta)}
  \right)
  =
  2\pi q_{ij},
  $$
  on the same inner, middle, outer, and inter-layer causal-root ledger.
- Proof burden: derive $\mathcal{D}_{\beta,q}^{\mathrm{mov}}$ from a completed moving branch chart rather than fitting $\xi_q$, $T_q$, and $\Delta_{\text{tw}}^{(q)}$ independently; verify positive Floquet gap and
  $$
  \mathcal{R}_{\mathrm{PF}}^{(q)}(\beta)
  =
  \max\left(
  \left|
  \frac{d\tau_q}{dt}
  -
  \sqrt{1-\beta^2}
  \right|,
  \left|
  \xi_q(\beta)
  -
  \sqrt{1-\beta^2}
  \right|,
  \sup_{\theta}|\Delta_{\text{tw}}^{(q)}(\beta,\theta)|
  \right)
  \le
  \epsilon_{\text{LV}}.
  $$
- First coefficient test: on a reduced neutral branch, expand
  $$
  \mathcal{D}_{\beta,q}^{\mathrm{mov}}
  =
  I+d_2\beta^2P_{\parallel}
  +
  O(\beta^4),
  \qquad
  \Omega_M(\beta,q)
  =
  \Omega_M^{(0)}
  \left(
  1+s_2\beta^2
  \right)
  +
  O(\beta^4),
  $$
  and require the same returned-section residual to give
  $$
  d_2=-\frac{1}{2},
  \qquad
  s_2=-\frac{1}{2},
  $$
  while keeping inter-layer phase residuals and $\Delta_{\text{tw}}^{(q)}$ inside the declared leakage scale.
- Failure mode: if layer deformation, clock-rate reduction, ruler contraction, and preferred-frame leakage cannot be traced to one branch ledger without separate tuning, then the effective Lorentz map fails at the moving-core stage.
- Priority route: `master-equation-closure`, `simulations`.
- Current disposition: `priority`.

### 9. Quantum Step Selection

- Inputs: inner, middle, and outer binary radii, frequencies, phase lags, inter-layer paths, and $c_{\perp}$.
- Mechanism: simultaneous integer closure selects candidate states, with $\ell_i$, $\ell_{ij}$, $\Omega_i$, phase lags, and $c_{\perp}$ solved as coupled branch-dependent functions rather than fixed rest quantities. The phase conditions should be treated as the native $\mathbb{A}\mathbb{A}\mathbb{A}$ analogue of Wilson-loop or Bohr-Sommerfeld closure: a causal-loop holonomy must wind by $2\pi k$.
- Output: accepted quantum states are integer-closure and stability-basin solutions.
- Proof burden: solve the coupled root-finding problem, identify the integer winding numbers as topological data, and add Floquet, Poincare-section, or Lyapunov diagnostics to distinguish stable basins from unstable integer-labeled solutions.
- Priority route: `master-equation-closure`, `quantum-closure`.
- Current disposition: `priority`.

### 9b. Floquet Stability Functional

- Inputs: candidate accepted state $\mathcal{S}_{\mathbf{k}}$ from Node 9, closed-cycle period $T_{\mathbf{k}}$, and linearized delay-differential operator around the periodic orbit.
- Mechanism: monodromy operator $\mathcal{M}_{\mathbf{k}}$ on the tangent bundle of delay state space; spectral radius off the symmetry directions controls basin robustness.
- Output: spectral gap $\Delta_{\mathbf{k}} = 1 - \max_{i\notin G}\|\mu_i(\mathbf{k})\|$ as the quantitative basin-robustness functional; accepted states are those with $\Delta_{\mathbf{k}}>0$.
- Proof burden: establish discreteness of the Floquet spectrum off the unit circle for state-dependent self-hit delays; compute leading multipliers for representative rank-three cycles; verify that the spectral gap closes precisely at the transverse-budget separator $\beta\to 1$ and at gradient-driven structural failure thresholds. A breather monodromy failure is the minimal warning case: a closed integer ledger with $\Delta_{\mathrm{mon}}\le0$ remains a diagnostic orbit, not a stable basin, and the same distinction must be enforced for rank-three quantum-step and mass-map claims.
- $A_0$ handoff: the first reduced mass-map branch certificate supplies the concrete test case: finite root ledger, branch label $\Lambda$, residual vector $\mathcal{R}_{A_0}$, and quotient stability gap $\Delta_{\mathbf{k}}$ for a neutral rest-branch rank-three candidate.
- Priority route: `master-equation-closure`, `quantum-closure`, `simulations`.
- Current disposition: `priority`.

### 10. Effective Lorentz Map

- Inputs: moving assembly clocks, rulers, and photon synchronization in a homogeneous Noether sea cell.
- Mechanism: operational observers reconstruct Lorentz coordinates from deformed physical clocks and rulers, not by transforming absolute substrate time.
- Output:
  $$
  T
  =
  \gamma_{\text{eff}}
  \left(
  t_{\text{sea}}-\frac{V X_{\parallel}}{c_{\text{eff}}^2}
  \right),
  \qquad
  X'_{\parallel}
  =
  \gamma_{\text{eff}}(X_{\parallel}-Vt_{\text{sea}}).
  $$
- Proof burden: suppress preferred-frame anisotropy to tested limits.
- Priority route: `master-equation-closure`.
- Current disposition: `priority`.

### 11. Coasting And Geodesic Motion

- Inputs: translation invariance, spatial isotropy, and Noether sea gradients.
- Mechanism: homogeneous locks coast; graded medium response bends the least-phase-distortion path.
- Output: Newtonian coasting and effective geodesic motion emerge as observer-level summaries.
- Proof burden: recover weak-field GR observables, including redshift, Shapiro delay, lensing, and PPN bounds.
- Priority route: `strong-field-closure`, `master-equation-closure`.
- Current disposition: `priority`.

### 11b. Effective Metric And Cartan Connection

- Inputs: Noether sea density, compliance, stress, drift $u^i_{\mathrm{sea,eff}}$, local clock response $N$, spatial frame fields $e^a{}_i$, spatial compliance metric $\gamma_{ij}^{\mathrm{eff}}=\delta_{ab}e^a{}_i e^b{}_j$, and rank-three orientation fields.
- Mechanism: reconstruct the observer-level bookkeeping metric
  $$
  ds_{\mathrm{eff}}^2
  =
  -N^2c_0^2dt_{\mathrm{eff}}^2
  +
  \gamma_{ij}^{\mathrm{eff}}
  \left(dx_{\mathrm{eff}}^i-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
  \left(dx_{\mathrm{eff}}^j-u^j_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right),
  $$
  and derive the Levi-Civita connection in the GR-matching regime, with torsion and nonmetricity tracked as deviation observables.
- Output: explicit observer-level fields for lapse, medium drift, spatial compliance, frame orientation, geodesics, redshift, lensing, Shapiro delay, horizon null surfaces, and PPN matching.
- Proof burden: derive $N$, $u^i_{\mathrm{sea,eff}}$, $e^a{}_i$, and $\gamma_{ij}^{\mathrm{eff}}$ from Noether sea state variables and Noether braid response; recover $N=1+\Phi_N/c_0^2+O(c_0^{-4})$, $\gamma_{ij}^{\mathrm{eff}}=(1-2\Phi_N/c_0^2)h_{ij}+O(c_0^{-4})$, $u^i_{\mathrm{sea,eff}}=O(c_0^{-3})$, and PPN coefficients within current bounds while suppressing preferred-frame, torsion, nonmetricity, birefringence, and dispersion residuals.
- Priority route: `master-equation-closure`, `strong-field-closure`, `standard-model-closure`.
- Current disposition: `priority`.

### 12. Photon Coaxial Contra-Rotating Polarity-Conjugate Planar Pair

- Inputs: massive-clock transverse-budget failure at $c_{\text{eff}}$, pro/anti Noether braid orientations, and primitive wake speed $c_f$.
- Mechanism: a photon is a coaxial contra-rotating polarity-conjugate planar pair with axial pair communication rather than volumetric transverse clock closure. The transition from a three-dimensional Noether braid invariant to a planar photon invariant must be treated as separator-mediated dimensional reduction, not as a smooth flattening of an orthogonal braid.
- Output: a massless measurement channel with energy, momentum, transverse polarization, and no rest proper-time clock.
- Proof burden: photon gate A must recover masslessness, no rest branch, no static charge leakage, no birefringence, no unacceptable dispersion, no rest proper-time clock, and the topological surgery rule that destroys the volumetric clock invariant before the photon channel is used as an empirical measurement basis.
- Priority route: `standard-model-closure`, `quantum-closure`, `planar-bridge-closure`.
- Current disposition: `priority`.

### 13. Photon Axial Delay Closure

- Inputs: leading/trailing planar cores separated by $d$, photon-channel speed $c_\gamma$, primitive speed $c_f$.
- Mechanism:
  $$
  \tau_{T\to L}\approx\frac{d}{c_f-c_\gamma}
  $$
  creates an asymmetric catch-up channel.
- Output: relative phase closure for a propagating planar pair.
- Proof burden: close
  $$
  \omega d/(c_f-c_\gamma)=O(1)
  $$
  on the resolved branch without violating dispersion, birefringence, photon mass, or preferred-frame bounds. The primary branch to test is proportional collapse,
  $$
  d(\omega,\delta_\gamma)\sim\Lambda_\gamma\frac{c_f-c_\gamma}{\omega},
  $$
  so fixed free-space photon speed is compatible with $d\propto\lambda$ and the weak homogeneous Noether sea limit sends $d\to0$ as $c_\gamma\to c_f$. A strict residual catch-up margin remains a null-test branch.
- Priority route: `planar-bridge-closure`, `standard-model-closure`.
- Current disposition: `priority`.

### 14. Polarization And Measurement

- Inputs: transverse photon ledger orientation and analyzer acceptance geometry.
- Mechanism: coupling amplitude is a projection through the transverse tensor $P_{\perp}=I-\hat{\mathbf{k}}\hat{\mathbf{k}}^T$; pass probability is the squared overlap.
- Output: Malus' law and a measurement-channel account based on ledger transitions.
- Proof burden: photon gate B must derive the squared-amplitude rule from native topological ledger capture, recover Born-rule probabilities, prove helicity $\pm1$ with exactly two transverse modes and no longitudinal mode, and preserve no signaling in entangled-polarization tests.
- Priority route: `quantum-closure`, `standard-model-closure`.
- Current disposition: `priority`.

### 15. QED And Optical Phenomenology

- Inputs: photon coaxial contra-rotating polarity-conjugate planar pair ontology, emission/absorption ledger transitions, and charged assembly overlaps.
- Mechanism: effective Maxwell/QED behavior must arise as the validated limit of planar-pair interactions.
- Output: $E=h\nu$, $p=h/\lambda$, $U(1)$-like phase behavior, Aharonov-Bohm shifts, transition rates, pair production, Compton scattering, blackbody spectra, and $\alpha$.
- Proof burden: photon gate C must map emission, absorption, pair production, transition rates, and $\alpha$ as allowed topological surgery between massive Noether braids and coaxial contra-rotating polarity-conjugate planar pairs, while recovering QED without extra modes, dispersion, birefringence, or wrong statistics.
- Priority route: `standard-model-closure`.
- Current disposition: `priority`.

### 16. Horizon And Strong-Field Interface

- Inputs: $c_{\text{eff}}(\mathbf{x})$, Noether sea density, compliance, stress, tidal gradients, and phase-closure variables.
- Mechanism: observer-level redshift/phase-lock and local assembly failure are distinct; local failure requires a strain or gradient threshold.
- Output: exterior GR behavior plus a substrate failure condition when transverse closure is locally exhausted.
- Proof burden: define observer-level horizons as null surfaces of $g^{\rm eff}_{\mu\nu}$, for example $\gamma_{ij}^{\mathrm{eff}}u_\perp^i u_\perp^j=N^2c_0^2$ in stationary flow form, while keeping local structural failure as a separate strain/tidal threshold.
- Priority route: `strong-field-closure`, `cosmology-closure`.
- Current disposition: `priority`.

### 17. Topological Certification

- Inputs: architrino strands, binary layers, active partner/self/inter-layer channels, and separator events.
- Mechanism: define closure graphs $G_A$, braid/framing data, root-ledger intersection counts, and allowed causal surgery moves.
- Output: computable invariants for branch preservation, emission, absorption, annihilation, decay, and transverse-rank collapse.
- Proof burden: construct a certification language compatible with the finite certificate packet and later simulations. The collinear-breather pass/fail ledger should be treated as the prototype: each failure row must preserve the exact obstruction rather than being converted into a vague roadmap sentence.
- $A_0$ handoff: use the reduced branch graph $\mathcal{G}_{A_0}$ as the first finite closure graph, with partner, self, and inter-layer edges, separator parity events, phase windings, and leakage channels recorded before any shielding or mass interpretation.
- Branch-certificate handoff: the same certification language must populate $\mathcal{C}_{\mathrm{NSH}}^{(q)}(W)$ in the priority control file, including the finite closure graph, declared speed conventions, active causal-root ledger, branch-Jacobian floor, inactive-root gap, finite memory depth, stability gap, moving deformation map, mass-response tensor, Lorentz residual, effective-metric export, sector residual rows, and event ledger. A topological certificate that cannot populate those rows remains a local closure-graph diagnostic rather than a causal-closure certificate.
- Priority route: `breather-proof`, `simulations`.
- Current disposition: `priority`.

## Critical Path

1. Floquet stability functional for rank-three integer-closure states, with basin-robustness gap $\Delta_{\mathbf{k}}$.
2. Grazing-bifurcation classification of the separator, with square-root scaling and period-adding diagnostics.
3. Photon gate A, kinematics and optics, with proportional-collapse selection theorem.
4. Photon gate B, polarization and spin.
5. Photon gate C, vertices and transitions.
6. Moving Noether braid deformation map with the $d_2=s_2=-1/2$ first coefficient test.
7. Transverse causal budget lemma with Floquet-gap closure at $\beta\to 1$.
8. Slow-fast Noether braid minimality theorem, with universality only after admitted matter branches share the three-role law.
9. Momentum skew with Noether sea dressing tensor.
10. Effective metric and Cartan connection reconstruction.
11. Equivalence and weak-field GR matching.
12. Topological certification and shared branch-certificate population.

## Deployment Handoff Table

| Open item | If unresolved at deploy | Priority route |
| --- | --- | --- |
| Photon gate A, kinematics and optics | keep as roadmap and create task | `planar-bridge-closure`, `standard-model-closure` |
| Photon gate B, polarization and spin | keep as roadmap and create task | `quantum-closure`, `standard-model-closure` |
| Photon gate C, vertices and transitions | keep as roadmap and create task | `standard-model-closure`, `planar-bridge-closure` |
| Floquet stability functional | create task | `master-equation-closure`, `quantum-closure`, `simulations` |
| $A_0$ reduced branch certificate | route as the first finite rank-three test case for Floquet and closure-graph diagnostics | `mass-map`, `simulations`, `master-equation-closure` |
| Grazing-bifurcation separator classification | create task | `breather-proof`, `simulations` |
| Slow-fast Noether braid minimality theorem | create task | `mass-map`, `master-equation-closure` |
| Effective metric and Cartan connection | create task | `master-equation-closure`, `strong-field-closure` |
| Moving Noether braid deformation map | create task | `master-equation-closure`, `simulations` |
| Transverse causal budget lemma | extract or create task | `master-equation-closure` |
| Momentum skew derivation | create task | `mass-map`, `master-equation-closure` |
| Equivalence-principle residual bound | create task | `master-equation-closure`, `strong-field-closure` |
| Effective Lorentz map and preferred-frame suppression | create task | `master-equation-closure` |
| Strong-field horizon local/global distinction | create task | `strong-field-closure` |
| Topological certification layer | create task | `breather-proof`, `simulations` |

## Next Revision Pass

The next pass over [Nested Shell Braid Causal Closure](priorities.md) should check the chapter against this dependency map in order:

1. Confirm every section advances one dependency node.
2. Move any sentence that belongs only to a proof burden into the theorem roadmap or this map.
3. Check that every symbol introduced in a later node is already defined in an earlier node.
4. Verify that all photon claims are separated into kinematics and optics, polarization and spin, and vertices and transitions.
5. Verify that every unresolved deployment item appears either as an inline theorem-roadmap tag in the synthesis or in the deployment handoff table above.
