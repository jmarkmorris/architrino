# Tri-Binary Causal Closure Dependency Map

## Purpose

This is the active-development workbench for [tri-binary-causal-closure.md](tri-binary-causal-closure.md). Its job is to make the proof ladder explicit before the synthesis is promoted into deployed or textbook-facing material.

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
- Proof burden: certify allowed root-count jumps, especially parity and signed-degree conservation.
- Priority route: `breather-proof` certificate branch charts.
- Current disposition: `priority`.

### 4. Noether Core Architecture

- Inputs: nested binary assemblies, self-hit engine, middle fulcrum, outer shield.
- Mechanism: three mutually supporting binary layers distribute high-multiplicity internal closure, buffer phase stress, and regulate external coupling.
- Output: the tri-binary Noether core becomes the proposed stable matter unit.
- Proof burden: prove tri-binary universality, including why a two-layer construction cannot simultaneously isolate the self-hit engine, buffer phase stress, and present an isotropic far-field shield, or derive an $n$-layer generalization for assemblies that do not fit the three-layer template.
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

- Inputs: moving Noether core with center-of-mass velocity $\mathbf{V}_{\text{cm}}$.
- Mechanism: the delayed causal Jacobian skews forward and backward internal wake exchange; expanding $J=J_{\text{rest}}-(\mathbf{V}_{\text{cm}}\cdot\hat{\mathbf{r}})/c_f+O(\|\mathbf{V}_{\text{cm}}\|^2)$ leaves a first-order residual after the resting symmetric loop cancels.
- Output:
  $$
  \mathbf{p}_{\text{int}}
  \approx
  \frac{E_{\text{internal}}}{c_{\text{eff}}^2}\mathbf{V}_{\text{cm}}.
  $$
- Proof burden: compute the first-order momentum skew from the full delayed root sum around a closed tri-binary cycle, not by radiation-box analogy alone.
- Priority route: `master-equation-closure`, `mass-map`.
- Current disposition: `priority`.

### 7. Shielded Energy To Equivalence Principle

- Inputs: shielded ledger response $\alpha\zeta(A)E_{\text{internal}}(A)$.
- Mechanism: bulk acceleration and Noether-Sea gradients perturb the same internal causal lock.
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

- Inputs: local Noether-Sea rest frame, effective signal speed $c_{\text{eff}}$, assembly velocity $\mathbf{V}_{\text{cm}}$.
- Mechanism: internal wakes must spend axial budget tracking the moving receiver, leaving transverse budget
  $$
  c_{\perp}=c_{\text{eff}}\sqrt{1-\beta^2}.
  $$
- Output: one resource controls time dilation, length contraction, clock freeze, quantum-step admissibility, and photon/rest-frame separation.
- Proof burden: promote this from a synthesis subsection into a standalone dynamics lemma.
- Priority route: `master-equation-closure`.
- Current disposition: `priority`.

### 9. Quantum Step Selection

- Inputs: inner, middle, and outer binary radii, frequencies, phase lags, inter-layer paths, and $c_{\perp}$.
- Mechanism: simultaneous integer closure selects candidate states, with $\ell_i$, $\ell_{ij}$, $\Omega_i$, phase lags, and $c_{\perp}$ solved as coupled branch-dependent functions rather than fixed rest quantities.
- Output: accepted quantum states are integer-closure and stability-basin solutions.
- Proof burden: solve the coupled root-finding problem and add Floquet, Poincare-section, or Lyapunov diagnostics to distinguish stable basins from unstable integer-labeled solutions.
- Priority route: `master-equation-closure`, `quantum-closure`.
- Current disposition: `priority`.

### 10. Effective Lorentz Map

- Inputs: moving assembly clocks, rulers, and photon synchronization in a homogeneous Noether-Sea cell.
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

- Inputs: translation invariance, spatial isotropy, and Noether-Sea gradients.
- Mechanism: homogeneous locks coast; graded medium response bends the least-phase-distortion path.
- Output: Newtonian coasting and effective geodesic motion emerge as observer-level summaries.
- Proof burden: recover weak-field GR observables, including redshift, Shapiro delay, lensing, and PPN bounds.
- Priority route: `strong-field-closure`, `master-equation-closure`.
- Current disposition: `priority`.

### 12. Photon Planar Pair

- Inputs: massive-clock transverse-budget failure at $c_{\text{eff}}$, pro/anti Noether-core orientations, and primitive wake speed $c_f$.
- Mechanism: a photon is a planar pro/anti pair with axial pair communication rather than volumetric transverse clock closure.
- Output: a massless measurement channel with energy, momentum, transverse polarization, and no rest proper-time clock.
- Proof burden: photon gate A must recover masslessness, no rest branch, no static charge leakage, no birefringence, no unacceptable dispersion, and no rest proper-time clock before the photon channel is used as an empirical measurement basis.
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
  on the resolved branch without violating dispersion, birefringence, photon mass, or preferred-frame bounds; the first branch to test is proportional collapse or rescaling of $d$, while a strict residual catch-up margin remains a null-test branch.
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

- Inputs: photon planar-pair ontology, emission/absorption ledger transitions, and charged assembly overlaps.
- Mechanism: effective Maxwell/QED behavior must arise as the validated limit of planar-pair interactions.
- Output: $E=h\nu$, $p=h/\lambda$, $U(1)$-like phase behavior, Aharonov-Bohm shifts, transition rates, pair production, Compton scattering, blackbody spectra, and $\alpha$.
- Proof burden: photon gate C must map emission, absorption, pair production, transition rates, and $\alpha$ as allowed topological surgery between massive Noether cores and planar pro/anti pairs, while recovering QED without extra modes, dispersion, birefringence, or wrong statistics.
- Priority route: `standard-model-closure`.
- Current disposition: `priority`.

### 16. Horizon And Strong-Field Interface

- Inputs: $c_{\text{eff}}(\mathbf{x})$, Noether-Sea density, compliance, stress, tidal gradients, and phase-closure variables.
- Mechanism: observer-level redshift/phase-lock and local assembly failure are distinct; local failure requires a strain or gradient threshold.
- Output: exterior GR behavior plus a substrate failure condition when transverse closure is locally exhausted.
- Proof burden: recover smooth local infall for large black holes in weak tidal regions while retaining structural failure in genuine high-strain regimes.
- Priority route: `strong-field-closure`, `cosmology-closure`.
- Current disposition: `priority`.

### 17. Topological Certification

- Inputs: architrino strands, binary layers, active partner/self/inter-layer channels, and separator events.
- Mechanism: define closure graphs $G_A$, braid/framing data, root-ledger intersection counts, and allowed causal surgery moves.
- Output: computable invariants for branch preservation, emission, absorption, annihilation, decay, and transverse-rank collapse.
- Proof burden: construct a certification language compatible with the finite certificate packet and later simulations.
- Priority route: `breather-proof`, `simulations`.
- Current disposition: `priority`.

## Critical Path

1. Photon gate A, kinematics and optics: masslessness, $c_\gamma\to c_f$, finite-phase closure, and nondispersion.
2. Photon gate B, polarization and spin: transverse projector, helicity $\pm1$, two physical modes, no longitudinal mode, and Malus/Born recovery.
3. Photon gate C, vertices and transitions: emission, absorption, pair production, transition rates, and $\alpha$.
4. Transverse causal budget is the reusable dynamics lemma.
5. Momentum skew is the mass/inertia bridge.
6. Equivalence and weak-field GR matching are the observer-level consistency gate.
7. Topological certification is the computable invariant layer.

## Deployment Handoff Table

| Open item | If unresolved at deploy | Priority route |
| --- | --- | --- |
| Photon gate A, kinematics and optics | keep as roadmap and create task | `planar-bridge-closure`, `standard-model-closure` |
| Photon gate B, polarization and spin | keep as roadmap and create task | `quantum-closure`, `standard-model-closure` |
| Photon gate C, vertices and transitions | keep as roadmap and create task | `standard-model-closure`, `planar-bridge-closure` |
| Transverse causal budget lemma | extract or create task | `master-equation-closure` |
| Momentum skew derivation | create task | `mass-map`, `master-equation-closure` |
| Equivalence-principle residual bound | create task | `master-equation-closure`, `strong-field-closure` |
| Effective Lorentz map and preferred-frame suppression | create task | `master-equation-closure` |
| Strong-field horizon local/global distinction | create task | `strong-field-closure` |
| Topological certification layer | create task | `breather-proof`, `simulations` |

## Next Revision Pass

The next pass over [tri-binary-causal-closure.md](tri-binary-causal-closure.md) should check the chapter against this dependency map in order:

1. Confirm every section advances one dependency node.
2. Move any sentence that belongs only to a proof burden into the theorem roadmap or this map.
3. Check that every symbol introduced in a later node is already defined in an earlier node.
4. Verify that all photon claims are separated into kinematics and optics, polarization and spin, and vertices and transitions.
5. Verify that every unresolved deployment item appears either as an inline theorem-roadmap tag in the synthesis or in the deployment handoff table above.
