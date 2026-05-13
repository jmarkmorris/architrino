# Angular Momentum and Spin Closure

## Workstream Metadata

- Kind: `priority`
- Rank: `6`
- Value: `9`
- Cost: `5`
- ROI: `1.80`
- Status: `active`

## Task Queue

1. `fundamental_angular_momentum_ledger` — Promote the branch-resolved total-angular-momentum scaffold into a validated conserved functional for a Noether core whose binary frequencies change under momentum transfer, including self-hit branches, wake history, and action-functional self terms. Status: `scaffolded`; action derivation and validation pending. Depends on: none.
2. `tri_binary_partition_rule` — Derive the theorem-target equations that determine $\Delta I_{\text{inner}}$, $\Delta I_{\text{middle}}$, $\Delta I_{\text{outer}}$, and $\Delta I_{\text{wake}}$ for an accepted closed-cycle action transaction, including causal-wake angular momentum, root-ledger admissibility, phase-lock constraints, branch stability, and coupling geometry. Status: `theorem-target-scoped`; branch-selection law pending. Depends on: `fundamental_angular_momentum_ledger`.
3. `worked_three_layer_noether_transition` — Generalize explicit outer-coupled positive closed-cycle action transactions in a separated-scale Noether core. The minimal four-substep branch is solved; non-minimal branch coefficients still need derivation or simulation fits. Status: `minimal-branch-solved`; non-minimal family pending. Depends on: `fundamental_angular_momentum_ledger`, `tri_binary_partition_rule`.
4. `photon_planar_pair_transverse_ledger` — Derive photon Gate B for the coaxial contra-rotating pro/anti planar pair: transverse projector, helicity $\pm1$, analyzer coupling, Malus' law, no physical longitudinal free mode, and no-signaling polarization statistics. Status: `projector-and-measure-scaffolded`; substrate analyzer simulation pending. Depends on: `fundamental_angular_momentum_ledger`; external prerequisite: photon Gate A kinematics in [electroweak-bosons.md](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md).
5. `spinor_closure` — Connect the Noether-core angular-momentum ledger to the ordered-frame spinor closure target in [angular-momentum-and-spin.md](../../../content/markdown/aaa/theory-bridges/angular-momentum-and-spin.md). Status: `ordered-frame-target-scoped`; holonomy proof pending. Depends on: `tri_binary_partition_rule`, `worked_three_layer_noether_transition`.
6. `measurement_response` — Derive how a spin-measurement apparatus couples to the full Noether-core angular-momentum ledger rather than to an abstract preassigned spin label. Status: `reduced-basin-arithmetic-scaffolded`; effective spinor coordinate and concrete apparatus simulation pending. Depends on: `spinor_closure`.
7. `pair_provenance_measure` — Construct the singlet-like pair-provenance ledger and two local apparatus-response maps needed to test Bell correlations without reducing the model to preassigned opposite classical axes. Status: `pending`. Depends on: `measurement_response`, `spinor_closure`.
8. `orbital_quantization_recovery` — Recover observer-level orbital angular-momentum quantization, including $2\pi$ azimuthal single-valuedness, $\ell\in\mathbb N_0$, and $m\in\{-\ell,\ldots,\ell\}$, from the effective envelope of an assembly in an external potential without conflating orbital labels with internal Noether-core spin. Status: `pending`. Depends on: `fundamental_angular_momentum_ledger`, `tri_binary_partition_rule`.
9. `atomic_molecular_spin_revisit` — Revisit atomic and molecular spin once the quantum-level angular-momentum ledger is mature enough to distinguish internal rotational action, observer-level orbital quantum numbers, spin coupling, spin-orbit structure, hyperfine structure, molecular singlet/triplet states, and bonding/exclusion rules without importing them as unexplained quantum labels. Status: `pending`. Depends on: `spinor_closure`, `measurement_response`, `orbital_quantization_recovery`.
10. `component_resolved_causal_writhe_bridge` — Test whether component-resolved causal-writhe data can distinguish pro/anti ordered cores, horizon planar signs, and weak left/right exposure without collapsing those labels prematurely. Status: `discussion-scoped`; proof/simulation pass pending. Depends on: `fundamental_angular_momentum_ledger`, `spinor_closure`, [weak-mixing-ckm.md](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md).
11. `bell_rebuild` — Rebuild [bell-theorem.md](../../../content/markdown/aaa/theory-bridges/bell-theorem.md) from the completed angular-momentum, measurement-response, pair-provenance, and photon-polarization derivations. Status: `handoff-scaffolded`; correlation proof pending. Depends on: `measurement_response`, `pair_provenance_measure`, `photon_planar_pair_transverse_ledger`, [quantum-closure bell gate](../quantum-closure/quantum-closure.md).

## Scope

This workstream owns the transition from abstract quantum labels to the fundamental angular-momentum mechanics of $\mathbb{A}\mathbb{A}\mathbb{A}$. The immediate need is not to classify the theory under inherited "hidden variable" language. That phrase is a historical artifact of observer-level quantum formalism: the variables are not hidden from nature, but unresolved by the physicists' abstraction.

The priority is to descend to the architrino level. Before the corpus can give a serious account of spin, Bell correlations, Stern-Gerlach outcomes, photon helicity, weak chirality, or Pauli behavior, it must explain how total angular momentum is conserved in a Noether core when:

- inner, middle, and outer binary frequencies change during momentum transfer;
- one or more binaries participate through self-hit branches;
- causal wakes carry part of the history functional;
- accepted action is redistributed across binary layers;
- and the resulting branch remains phase-locked and stable.

Until that ledger is understood at the fundamental level, Bell's theorem should be treated as a severe observer-level test, not as the starting point for the ontology.

## Current State

The bridge [angular-momentum-and-spin.md](../../../content/markdown/aaa/theory-bridges/angular-momentum-and-spin.md) now does more than dictionary work:

- $h$ is reserved for closed-cycle action;
- $\hbar$ is reserved for radian-normalized angular momentum, spin, helicity, and rotation generators;
- $\mathbf{L}$, $\mathbf{S}$, and $\mathbf{J}$ are separated at the standard quantum layer;
- the branch-resolved $\mathbf{L}_{\text{mech}}+\mathbf{L}_{\text{wake}}$ Noether-core scaffold is explicit;
- the tri-binary partition theorem target is stated as a constrained solve;
- one minimal four-substep transaction is solved in a reduced chart;
- the ordered Noether-core frame is defined as the spinor closure target;
- photon Gate B has a projector / analyzer-measure scaffold; and
- Stern-Gerlach-like measurement response has reduced basin arithmetic plus Master-Equation origins for the apparatus impulse and record-cycle measure.

Those results upgrade several old `pending` items to scaffolded or minimal-solved status. They do not close the workstream. The remaining burden is to derive or simulate the conserved functional, prove branch selection, prove or falsify the ordered-frame lift, compute concrete apparatus/analyzer dynamics, construct pair provenance, and then test Bell.

## Corpus Coverage Audit 2026-05-12

The corpus now has enough scaffolding to move this workstream from a broad "spin later" placeholder into a sharper proof-and-ledger program.

### Strong Coverage

1. **Delayed-dynamics conservation scaffold.** [master-equation.md](../../../content/markdown/aaa/dynamics/master-equation.md) now gives the relevant mechanical / wake split:
   $$
   \mathbf{L}_{\text{tot}}(t)
   \equiv
   \mathbf{L}_{\text{mech}}(t)+\mathbf{L}_{\text{wake}}(t),
   $$
   with $\mathbf{L}_{\text{wake}}$ treated as the in-flight causal-wake contribution. [causal-action-functional.md](../../../content/markdown/aaa/dynamics/causal-action-functional.md) independently states that rotational symmetry in the delayed action gives conserved angular momentum as a history functional. This is the primary source signal for the first derivation.
2. **Tri-binary layer roles.** [tri-binary-dynamics.md](../../../content/markdown/aaa/dynamics/tri-binary-dynamics.md), [noether-core.md](../../../content/markdown/aaa/assemblies/noether-core.md), and [noether-core-geometry.md](../../../content/markdown/aaa/assemblies/noether-core-geometry.md) already separate the inner self-hit engine, middle $v=c_f$ hinge, and outer shielding / interface layer. That makes the partition problem concrete: each layer has a role, speed regime, phase window, and exposure channel.
3. **One-$h$ bookkeeping seed.** [energy.md](../../../content/markdown/aaa/dynamics/energy.md) contains a first explicit one-$h$ closed-cycle action table with $\Delta I$ bookkeeping across outer, middle, inner, and wake channels. It is not yet a derivation, but it gives the variables needed for the tri-binary partition equations: $\Delta I_{\text{inner}}$, $\Delta I_{\text{middle}}$, $\Delta I_{\text{outer}}$, and $\Delta I_{\text{wake}}$.
4. **Spinor and topology candidates.** [planck-scale-tri-binary-alignment.md](../../../content/markdown/aaa/theory-bridges/planck-scale-tri-binary-alignment.md), [quantum-statistics.md](../../../content/markdown/aaa/quantum/quantum-statistics.md), and [horizon-chirality.md](../../../content/markdown/aaa/spacetime/horizon-chirality.md) all point toward the same distinction: a 3D ordered Noether-core frame should be tested for $SU(2)$-type $4\pi$ closure, while planarized branches reduce toward $SO(2)$ / $U(1)$-like phase behavior. [causal-action-functional.md](../../../content/markdown/aaa/dynamics/causal-action-functional.md) adds causal writhe $Wr_c$ as the strongest current chirality / handedness invariant candidate.
5. **Standard quantum recovery contrast.** The integrated recovery checklist separates orbital angular momentum from electron spin, emphasizes $2\pi$ single-valued azimuthal closure for orbital $m$, regular finite angular solutions for $\ell$, the smeared chosen-axis projection picture, and the Stern-Gerlach two-channel result for electron spin. The Noether-core program should use that contrast to keep ordinary orbital closure separate from the fermion $4\pi$ spinor-lift target.
6. **Photon and vector-mode closure gates.** [electroweak-bosons.md](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) now cleanly separates photon Gate A from Gate B. Gate B is the angular-momentum/spin burden: transverse ledger, analyzer coupling, helicity $\pm1$, no longitudinal free photon mode, squared-amplitude capture, material analyzer projector, and invariant unresolved-material measure. [gluons.md](../../../content/markdown/aaa/assemblies/bosons/gluons.md) mirrors the vector-channel burden for color corridors.
7. **Bell placement is disciplined.** [bell-theorem.md](../../../content/markdown/aaa/theory-bridges/bell-theorem.md) now correctly treats Bell / CHSH / Tsirelson as a hard downstream test. It states the classical-axis failure mode and requires the response kernel to come from the angular-momentum ledger and detector coupling rather than from a preassigned spin label.

### Thin Or Missing Coverage

1. **The total angular-momentum functional has a solved minimal branch but not a general coefficient law.** The corpus has $\mathbf{L}_{\text{mech}}+\mathbf{L}_{\text{wake}}$, a branch-resolved Noether-core scaffold, and a solved minimal four-substep transition in [angular-momentum-and-spin.md](../../../content/markdown/aaa/theory-bridges/angular-momentum-and-spin.md). The exact coefficient law for arbitrary changes of $\omega_{\text{inner}},\omega_{\text{middle}},\omega_{\text{outer}}$ under an accepted action transaction remains open.
2. **The partition rule is still bookkeeping, not mechanics.** The energy chapter's table and the angular-momentum bridge identify short aliases $\Delta I_{\text{out}}$, $\Delta I_{\text{mid}}$, $\Delta I_{\text{in}}$, and $\Delta I_{\text{wake}}$. These should now be normalized to the bridge variables $\Delta I_{\text{outer}}$, $\Delta I_{\text{middle}}$, $\Delta I_{\text{inner}}$, and $\Delta I_{\text{wake}}$, but the closure conditions that determine those quantities are not yet derived from conservation, root-ledger admissibility, phase-lock constraints, branch stability, or coupling geometry.
3. **Spinor closure now has a target frame but lacks the lift proof.** The ordered Noether-core frame is defined below as a history-lifted triad of binary-plane normals and causal-root labels. The open burden is to prove or falsify the nontrivial $2\pi$ holonomy and $4\pi$ restoration.
4. **Measurement response now has derived reduced kernels, single-core basin arithmetic, and external apparatus-term origins, but not a concrete apparatus proof.** [angular-momentum-and-spin.md](../../../content/markdown/aaa/theory-bridges/angular-momentum-and-spin.md) now contains a Stern-Gerlach-like apparatus model, the deterministic kernels $K_{\pm}^{\text{SG}}$ as pullbacks of the two record-forming basins, a concrete reduced separatrix $\Sigma_{\hat{\mathbf m}}^{\text{SG,red}}$ whose unbiased record-phase measure gives the spin-$\tfrac{1}{2}$ half-angle law, a Master-Equation branch-sum formula for $\dot{\mathbf J}_{C}^{\text{app}}$, and an invariant-measure derivation for $d\nu_{\text{rec}}$ on the locked record cycle. The open work is to derive the effective spinor coordinate, evaluate the separatrix normal and apparatus impulse in a concrete Noether-core apparatus simulation, derive the substrate preparation measure, and compute the Bell pair-provenance measure.
5. **Weak chirality depends on unresolved spin/helicity geometry.** [weak-mixing-ckm.md](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md) proposes that left-handed helicity exposes the weak-coupling triad while right-handed helicity hides it. That is now a high-value test case for the angular-momentum ledger, not an independent weak-sector assumption.
6. **Reaction-level ledgers are consumers, not proofs.** [reaction-ledger.md](../../../content/markdown/aaa/validation/reaction-ledger.md), [reaction-cosmology-provenance-ledger.md](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md), [bremsstrahlung.md](../../../content/markdown/aaa/reactions/bremsstrahlung.md), and [synchrotron.md](../../../content/markdown/aaa/reactions/synchrotron.md) need angular-momentum, polarization, weak-handedness, and vector-channel bookkeeping fields. Those records should identify which proof they inherit rather than deriving spin, photon polarization, or weak chirality locally.
7. **Pauli / spin-statistics remains a geometry hypothesis.** [quantum-statistics.md](../../../content/markdown/aaa/quantum/quantum-statistics.md) gives a promising 3D-to-2D support distinction, but the exchange sign and exclusion rule still need the spinor and ordered-frame proof before they can become established closure.
8. **Hadron spin budgets are downstream consumers.** [nucleon-structure.md](../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md), [gluons.md](../../../content/markdown/aaa/assemblies/bosons/gluons.md), and [mesons.md](../../../content/markdown/aaa/assemblies/mesons/mesons.md) already ask for quark-core, orbital, color-corridor, flux-network, rho/Delta spin-channel, and Pauli/color-sector accounting. These should remain downstream until the single-core ledger, partition rule, and ordered-frame spinor proof exist.
9. **Atomic and molecular spin are downstream quantum consumers.** [atomic-structure.md](../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md), [atomic-spectra.md](../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md), and [molecular-geometry.md](../../../content/markdown/aaa/nuclear-atomic/molecular-geometry.md) contain useful atomic / molecular intuition, but they should not become the starting point for angular momentum. Atomic spin-orbit coupling, hyperfine structure, molecular singlet/triplet labels, bonding selection rules, and Pauli filling should be revisited only after the single-core spinor ledger and measurement-response model exist.

### Claim Map

- **Ontology:** angular momentum is not an added substance; it is organized motion plus active causal-wake history in the architrino / Noether-core substrate.
- **Derivation / closure targets:** conserved $\mathbf{L}_{\text{tot}}$ for delayed dynamics, the tri-binary partition theorem for one-$h$ closed-cycle action transactions, ordered-frame $4\pi$ spinor closure, the photon planar-pair transverse ledger, Stern-Gerlach basin-measure closure, and Bell correlations.
- **Effective summaries:** standard $\mathbf{L}$, $\mathbf{S}$, $\mathbf{J}$, $h$, $\hbar$, helicity, spin labels, and Bell variables remain useful observer-level or bridge-layer notation.
- **Speculative extensions:** weak-coupling-triad exposure by helicity, spin-statistics from 3D / 2D support transition, and Bell non-factorization from pair provenance plus contextual measurement coupling must stay marked as targets until the lower ledger is derived.

## Result 2026-05-12: Delayed Noether-Core Angular-Momentum Scaffold

The first usable result is a branch-resolved evaluation form for the delayed total-angular-momentum functional. It does not close the spin proof, but it turns the vague request "include the wake" into a concrete Noether-core variable set that can be computed or varied.

### Three-Layer Core Variables

Use layer labels
$$
\ell\in\{I,M,O\},
$$
for inner, middle, and outer. For a reduced six-architrino Noether-core chart, label the two members of layer $\ell$ by $\alpha\in\{+1,-1\}$ and write
$$
\theta_\ell(t)=\theta_{\ell,0}+\int_{t_0}^{t}\omega_\ell(s)\,ds,
$$
with radius $R_\ell(t)$, angular frequency $\omega_\ell(t)$, plane normal $\hat{\mathbf n}_\ell(t)$, and in-plane basis
$$
\mathbf u_\ell(t)\times\mathbf v_\ell(t)=\hat{\mathbf n}_\ell(t).
$$
The in-plane phase vector is
$$
\mathbf e_\ell(\theta)
=
\cos\!\big(\theta+\phi_\ell\big)\mathbf u_\ell
+
\sin\!\big(\theta+\phi_\ell\big)\mathbf v_\ell,
$$
where $\phi_\ell$ is the layer phase offset in the selected chart. A useful local position ansatz is
$$
\mathbf x_{\ell,\alpha}(t)
=
\mathbf X(t)+\mathbf c_\ell(t)+\alpha R_\ell(t)\mathbf e_\ell(\theta_\ell(t)),
$$
where $\mathbf X(t)$ is the core center and $\mathbf c_\ell(t)$ records any layer-center offset left after choosing the core gauge. The separated-scale internal gauge sets $\mathbf X=\mathbf 0$ and treats $\mathbf c_\ell$ and plane transport as slow corrections, but those corrections must remain in the ledger until a simulation or proof justifies dropping them.

For member phases, use
$$
\vartheta_{\ell,\alpha}(t)
=
\theta_\ell(t)+\frac{1-\alpha}{2}\pi.
$$
For a branch from source $(m,\beta)$ at emission time $t_0^{(b)}$ to receiver $(\ell,\alpha)$ at time $t$, define the phase-closure residual
$$
\Psi_{\ell\alpha\leftarrow m\beta}^{(b)}(t)
=
\vartheta_{\ell,\alpha}(t)
-
\vartheta_{m,\beta}(t_0^{(b)})
+
\phi_{\ell m}^{(b)}
-
2\pi k_{\ell m}^{(b)}.
$$
An active branch must satisfy both the causal-root equation and the appropriate phase window, schematically
$$
t_0^{(b)}\in\mathcal C_{\ell\alpha,m\beta}(t),
\qquad
\Psi_{\ell\alpha\leftarrow m\beta}^{(b)}(t)\equiv0\pmod{2\pi}
$$
inside the tolerance of the regularized chart.

### Active Root and Self-Hit History

For this chart,
$$
\mathcal C_{\ell\alpha,m\beta}(t)
=
\left\{
t_0<t:
\left\|\mathbf x_{\ell,\alpha}(t)-\mathbf x_{m,\beta}(t_0)\right\|
=
c_f(t-t_0)
\right\}.
$$
The active root ledger is
$$
\mathcal R(t)
=
\left\{
(\ell,\alpha;m,\beta;b):
t_0^{(b)}\in\mathcal C_{\ell\alpha,m\beta}(t)
\right\}.
$$
Self-hit history is the diagonal part with the trivial instantaneous branch excluded:
$$
\mathcal H_{\ell,\alpha}(t)
=
\left\{
t_0\in\mathcal C_{\ell\alpha,\ell\alpha}(t):
t_0<t,\ H(t-t_0)=1
\right\},
$$
with the physical self-hit branch requiring the emitting history to have outrun its own wake on the relevant segment. The important point is that $\mathcal H_{\ell,\alpha}(t)$ is a path-history object, not a function only of the current speed.

### Branch-Resolved Torque Functional

For each active branch define
$$
\mathbf r_{\ell\alpha,m\beta}^{(b)}(t)
=
\mathbf x_{\ell,\alpha}(t)-\mathbf x_{m,\beta}(t_0^{(b)}),
\qquad
r_{\ell\alpha,m\beta}^{(b)}=\left\|\mathbf r_{\ell\alpha,m\beta}^{(b)}\right\|,
$$
$$
\hat{\mathbf r}_{\ell\alpha,m\beta}^{(b)}
=
\frac{\mathbf r_{\ell\alpha,m\beta}^{(b)}}{r_{\ell\alpha,m\beta}^{(b)}},
\qquad
J_{\ell\alpha,m\beta}^{(b)}
=
1-\frac{\mathbf v_{m,\beta}(t_0^{(b)})\cdot
\hat{\mathbf r}_{\ell\alpha,m\beta}^{(b)}}{c_f}.
$$
The force-like bookkeeping contribution is
$$
\mathbf F_{\ell\alpha\leftarrow m\beta}^{(b)}(t)
=
\mu_{\text{arch}}\kappa\sigma_{\ell\alpha,m\beta}
\frac{|q_{\ell,\alpha}q_{m,\beta}|}
{\left(r_{\ell\alpha,m\beta}^{(b)}\right)^2
\left|J_{\ell\alpha,m\beta}^{(b)}\right|}
\hat{\mathbf r}_{\ell\alpha,m\beta}^{(b)}.
$$
The corresponding branch torque about the chosen origin is
$$
\boldsymbol{\tau}_{\ell\alpha\leftarrow m\beta}^{(b)}(t)
=
\mathbf x_{\ell,\alpha}(t)\times
\mathbf F_{\ell\alpha\leftarrow m\beta}^{(b)}(t).
$$

With these definitions, the master-equation split becomes an explicit core functional:
$$
\mathbf L_{\text{wake}}^{\text{core}}(t)
=
\mathbf L_{\text{wake}}^{\text{core}}(t_\ast)
-
\int_{t_\ast}^{t}
\sum_{(\ell,\alpha;m,\beta;b)\in\mathcal R(s)}
\boldsymbol{\tau}_{\ell\alpha\leftarrow m\beta}^{(b)}(s)\,ds.
$$
The mechanical part is
$$
\mathbf L_{\text{mech}}^{\text{core}}(t)
=
\sum_{\ell,\alpha}
\mathbf x_{\ell,\alpha}(t)\times
\mu_{\text{arch}}\dot{\mathbf x}_{\ell,\alpha}(t).
$$
In the separated-scale circular-layer gauge this reduces to
$$
\mathbf L_{\text{mech}}^{\text{core}}(t)
=
\sum_{\ell\in\{I,M,O\}}
2\mu_{\text{arch}}R_\ell^2(t)\omega_\ell(t)\hat{\mathbf n}_\ell(t)
+
\mathbf L_{\text{tr}}(t),
$$
where $\mathbf L_{\text{tr}}$ is the explicit transport remainder from $\mathbf X$, $\mathbf c_\ell$, changing plane frames, and non-circular corrections. Dropping $\mathbf L_{\text{tr}}$ is a separated-scale approximation, not a theorem.

The resulting delayed total-angular-momentum scaffold is
$$
\boxed{
\mathbf L_{\text{tot}}^{\text{core}}(t)
=
\sum_{\ell\in\{I,M,O\}}
2\mu_{\text{arch}}R_\ell^2(t)\omega_\ell(t)\hat{\mathbf n}_\ell(t)
+
\mathbf L_{\text{tr}}(t)
+
\mathbf L_{\text{wake}}^{\text{core}}(t)
}
$$
with
$$
\frac{d}{dt}\mathbf L_{\text{tot}}^{\text{core}}(t)=\mathbf 0
$$
only for isolated solutions of a symmetry-preserving delayed action. In working regularized models, this is a validation diagnostic and a closure target.

### Linearized Transaction Ledger

For a small accepted transition, the layer contribution changes as
$$
\Delta \mathbf I_\ell^{\text{mech}}
\simeq
2\mu_{\text{arch}}
\left(
2R_\ell\omega_\ell\Delta R_\ell
+
R_\ell^2\Delta\omega_\ell
\right)\hat{\mathbf n}_\ell
+
2\mu_{\text{arch}}R_\ell^2\omega_\ell\,\Delta\hat{\mathbf n}_\ell,
$$
plus the corresponding transport remainder if the core center, layer centers, or plane frames move appreciably during the transaction. The wake part is not optional:
$$
\Delta\mathbf L_{\text{wake}}^{\text{core}}
=
-
\int_{t_i}^{t_f}
\sum_{\mathcal R(s)}
\boldsymbol{\tau}^{(b)}(s)\,ds.
$$
For the scalar one-$h$ bookkeeping used by the bridge, project the vector equation onto the transaction axis $\hat{\mathbf a}$:
$$
\hat{\mathbf a}\cdot
\left(
\sum_{\ell}\Delta\mathbf I_\ell^{\text{mech}}
+
\Delta\mathbf L_{\text{tr}}
+
\Delta\mathbf L_{\text{wake}}^{\text{core}}
\right)
=
\Delta I_{\text{accepted}},
$$
where a positive one-cycle accepted transaction has $\Delta I_{\text{accepted}}=+\hbar$ in the core ledger convention.

### Closure Targets Left Open

This scaffold leaves the following items as proof or simulation closure targets:

1. Derive $\mathbf L_{\text{wake}}^{\text{core}}$ directly from the regularized nonlocal causal action, not merely from the work-integral reconstruction.
2. Determine the allowed jumps in $\mathcal R(t)$ and $\mathcal H_{\ell,\alpha}(t)$ at causal-root folds, including the raw self-root parity rule $\Delta N\in2\mathbb Z$ with $\Delta D=0$ where that chart applies.
3. Derive the phase-window equation for $\Psi_{\ell\alpha\leftarrow m\beta}^{(b)}$ from the delay dynamics rather than imposing it as a lock condition.
4. Prove which solutions have a positive Floquet basin-robustness gap and therefore count as stable post-transaction branches.
5. Show how the vector ledger above descends to observer-level spin, helicity, or orbital labels without conflating those labels with the internal tri-binary rotational action.

## Result 2026-05-12: Tri-Binary Partition Theorem Target

The one-$h$ table in [energy.md](../../../content/markdown/aaa/dynamics/energy.md) should now be read as the seed of a constrained theorem target, not as the final partition. The $f_{\psi}$ row records the initial bookkeeping gauge for an outer-coupled positive transaction: the hit is first logged as $\Delta I_{\text{outer}}^{(0)}=+\hbar$. The final $f$ row asks for the stable post-redistribution branch. The unknown scalar partition is:

$$
\boldsymbol{\Delta I}
=
\left(
\Delta I_{\text{inner}},
\Delta I_{\text{middle}},
\Delta I_{\text{outer}},
\Delta I_{\text{wake}}
\right).
$$

Normalize the energy-table aliases to the bridge convention before using the table as a proof target:

| Energy-table alias | Theorem-target variable | Role |
| --- | --- | --- |
| $\Delta I_{\text{in}}$ | $\Delta I_{\text{inner}}$ | Self-hit / super-field-speed reconfiguration channel. |
| $\Delta I_{\text{mid}}$ | $\Delta I_{\text{middle}}$ | Field-speed separator or fulcrum channel. |
| $\Delta I_{\text{out}}$ and $\Delta I_o$ | $\Delta I_{\text{outer}}$ | Sub-field-speed external interface channel. |
| $\Delta I_{\text{wake}}$ | $\Delta I_{\text{wake}}$ | Causal-wake angular-momentum exchange projected onto the active generator. |

For a pre-transaction stable branch $B$, a candidate post-transaction branch $B'$, a transaction sign $\sigma\in\{+1,-1\}$, and a transaction axis $\hat{\mathbf a}$ supplied by the coupling geometry, the theorem target is the following constrained solve.

1. **Closed-cycle action and scalar rotational action.**
   $$
   \Delta A_{\text{cycle}}=\sigma h,
   \qquad
   \Delta I_{\text{inner}}
   +\Delta I_{\text{middle}}
   +\Delta I_{\text{outer}}
   +\Delta I_{\text{wake}}
   =
   \sigma\hbar.
   $$
   The sign-consistency rule in the energy table is only an admissibility inequality for a net positive or net negative transaction. It does not determine the partition.

2. **Vector angular-momentum conservation.**
   The scalar equation must descend from the vector ledger above:
   $$
   \sum_{\ell\in\{I,M,O\}}
   \Delta\mathbf I_\ell^{\text{mech}}
   +
   \Delta\mathbf L_{\text{tr}}
   +
   \Delta\mathbf L_{\text{wake}}^{\text{core}}
   =
   \Delta\mathbf J_{\text{coupl}}.
   $$
   In the first separated-scale circular scaffold, set $\Delta\mathbf L_{\text{tr}}=0$ and define
   $$
   \Delta I_{\text{inner}}
   =
   \hat{\mathbf a}\cdot\Delta\mathbf I_I^{\text{mech}},
   \quad
   \Delta I_{\text{middle}}
   =
   \hat{\mathbf a}\cdot\Delta\mathbf I_M^{\text{mech}},
   \quad
   \Delta I_{\text{outer}}
   =
   \hat{\mathbf a}\cdot\Delta\mathbf I_O^{\text{mech}},
   \quad
   \Delta I_{\text{wake}}
   =
   \hat{\mathbf a}\cdot\Delta\mathbf L_{\text{wake}}^{\text{core}}.
   $$
   Outside that scaffold, the transport remainder must remain in the vector equation instead of being hidden inside a scalar partition.

3. **Energy conservation.**
   $$
   \omega_I^{\ast}\Delta I_{\text{inner}}
   +
   \omega_M^{\ast}\Delta I_{\text{middle}}
   +
   \omega_O^{\ast}\Delta I_{\text{outer}}
   +
   \Delta E_{\text{wake}}
   =
   \Delta E_{\text{coupl}},
   $$
   with
   $$
   \Delta E_{\text{coupl}}
   =
   f_{\text{coupl}}\Delta A_{\text{cycle}}
   =
   \omega_{\text{coupl}}\sigma\hbar.
   $$
   The $\omega_\ell^{\ast}$ terms are branch-local effective angular frequencies across the discrete step. A full derivation must replace them with the appropriate cycle integral if $\omega_\ell$ changes appreciably during the transition.

4. **Root-ledger admissibility.**
   The candidate branch must move from one admissible causal-root ledger to another:
   $$
   \mathcal R(t_i)\longrightarrow\mathcal R(t_f),
   \qquad
   \mathcal H_{\ell,\alpha}(t_i)\longrightarrow\mathcal H_{\ell,\alpha}(t_f).
   $$
   On a raw self-root separator chart, the known parity guardrail is $\Delta N\in2\mathbb Z$ with $\Delta D=0$; on a grouped channel ledger, the same event may be recorded as one newly active channel. The partition theorem must state which chart is being used and which ledger jump produces each $\Delta I_\ell$.

5. **Phase-lock constraints.**
   The post-transaction branch must close the active causal roots over a full tri-binary cycle:
   $$
   \Psi_{\ell\alpha\leftarrow m\beta}^{(b)}(t_f)
   \equiv0\pmod{2\pi},
   \qquad
   \Phi_\ell(B')-\Phi_m(B')=2\pi k_{\ell m}.
   $$
   The phase functions must include geometric phase, wake-return delay, and causal-root ledger contribution for the chosen branch chart.

6. **Coupling geometry.**
   The external or internal transaction supplies boundary data:
   $$
   \left(
   \Delta E_{\text{coupl}},
   \Delta\mathbf J_{\text{coupl}},
   \hat{\mathbf a}
   \right)
   =
   \mathrm{Geom}_{\text{coupl}}
   (\text{exposed layer},\text{incidence direction},\text{impact parameter},\text{orientation data},\text{wake recoil channel}).
   $$
   For the first worked transition, use the outer-exposed case from the energy table. The outer-first entry is an initial condition, not a license to assign the final $\hbar$ entirely to $\Delta I_{\text{outer}}$.

7. **Branch stability.**
   A candidate $B'$ counts as an accepted partition only if it is stable under the delayed dynamics. The certificate should report a Floquet or interval-equivalent condition such as
   $$
   \rho(D\mathcal P_{B'})<1,
   $$
   together with positive root-existence, inactive-root gap, and phase-lock margins.

The theorem target is: solve these constraints over admissible post-branches $B'$. If one stable branch satisfies them, the partition is unique for the supplied coupling geometry. If several stable branches satisfy them, the partition is branch-dependent and the later measurement-response model must carry the branch-selection rule. If no stable branch satisfies them, the transaction is forbidden, reflected, or routed into wake exchange.

## Result 2026-05-12: Solved Minimal Four-Substep Transition

The bridge now contains one solved separated-scale transition rather than only a symbolic ledger. The solved branch is deliberately narrow: fixed projected normals, no transport remainder, no retained wake angular momentum after closure, one outer substep, one middle hinge substep, and two equal inner self-hit substeps. It is a branch certificate, not the general partition theorem.

Let the common substep be $\iota$. The branch rule is

$$
\Delta I_{\text{outer}}=\iota,
\qquad
\Delta I_{\text{middle}}=\iota,
\qquad
\Delta I_{\text{inner}}=2\iota,
\qquad
\Delta I_{\text{wake}}=0.
$$

The accepted positive transaction fixes the scalar ledger:

$$
\iota+\iota+2\iota=\hbar,
\qquad
\iota=\frac{\hbar}{4}.
$$

The solved partition is therefore

$$
\boxed{
\Delta I_{\text{outer}}=\frac{\hbar}{4},
\qquad
\Delta I_{\text{middle}}=\frac{\hbar}{4},
\qquad
\Delta I_{\text{inner}}=\frac{\hbar}{2},
\qquad
\Delta I_{\text{wake}}=0.
}
$$

Using the linearized mechanical scaffold, the fixed-radius outer retune is

$$
\Delta R_O=0,
\qquad
\Delta\omega_O
=
\frac{\hbar}{8\mu_{\text{arch}}\left(R_O^-\right)^2},
$$

with admissibility condition

$$
R_O^-\left(
\omega_O^-
+
\frac{\hbar}{8\mu_{\text{arch}}\left(R_O^-\right)^2}
\right)<c_f.
$$

The middle hinge remains on $R_M\omega_M=c_f$ to first order:

$$
\Delta R_M
=
\frac{\hbar}
{8\mu_{\text{arch}}R_M^-\omega_M^-},
\qquad
\Delta\omega_M
=
-
\frac{\hbar}
{8\mu_{\text{arch}}\left(R_M^-\right)^2},
$$

so

$$
R_M^-\Delta\omega_M+\omega_M^-\Delta R_M=0.
$$

The fixed-radius inner two-substep retune is

$$
\Delta R_I=0,
\qquad
\Delta\omega_I
=
\frac{\hbar}
{4\mu_{\text{arch}}\left(R_I^-\right)^2},
$$

with self-hit admissibility condition

$$
s_I^+
=
\frac{R_I^-\left(
\omega_I^-
+
\frac{\hbar}{4\mu_{\text{arch}}\left(R_I^-\right)^2}
\right)}
{c_f}
>1,
$$

and self-delay condition

$$
\delta_{\text{self}}^+
=
2s_I^+\sin\!\left(\frac{\delta_{\text{self}}^+}{2}\right).
$$

On a raw simple-root separator chart, the two inner substeps correspond to the minimal even self-root jump

$$
\Delta N_{\text{self}}=+2,
\qquad
\Delta D=0,
$$

provided the active roots remain simple through the regularized transition.

The energy condition is also explicit. In the first action-angle approximation with no retained wake energy and no residual root-energy term, the accepted source channel must have branch-local frequency

$$
\omega_{\text{tx}}
=
\omega_{\ast}
\equiv
\frac{\omega_O^{\ast}+\omega_M^{\ast}+2\omega_I^{\ast}}{4}.
$$

If

$$
\Delta E_{\text{mismatch}}
=
\left(\omega_{\text{tx}}-\omega_{\ast}\right)\hbar
$$

does not vanish, the clean four-substep branch is not energy-closed. For $\omega_{\text{tx}}<\omega_{\ast}$, a low-frequency outer hit cannot produce this positive inner self-hit retune without drawing energy from a root reconfiguration or the wake/internal ledger. For $\omega_{\text{tx}}>\omega_{\ast}$, the surplus must be routed into wake recoil, transport, or another admissible branch.

This result is useful because it gives the first explicit failure gate as well as the first explicit success branch. The transition is allowed in the clean minimal chart only when the angular ledger, speed-regime inequalities, self-root parity, self-delay equation, and energy-frequency condition all hold.

## Result 2026-05-12: Ordered Noether-Core Frame For Spinor Closure

This section defines the ordered-frame target only. It does not prove spin-$\tfrac{1}{2}$ behavior. Use it as the spinor closure target until the holonomy calculation is derived from the delayed dynamics.

The dynamics scaffold above uses $\ell\in\{I,M,O\}$ for inner, middle, and outer. The ordered-frame and chirality literature also uses $\{H,M,L\}$, where $H$ is high / inner, $M$ is middle, and $L$ is low / outer. These are two labels for the same three binary roles, not two different triads.

For each ordered layer $a\in\{H,M,L\}$, let $P_a(t)$ be the instantaneous binary plane and let $\hat{\mathbf n}_a(t)$ be the oriented unit normal selected by that binary's circulation. In the ordinary 3D regime the ordered normal triad is non-coplanar:

$$
\det\!\big[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L\big]\ne0.
$$

The candidate ordered Noether-core frame is the history-lifted object

$$
F_{\text{NC}}(t)=
\big(
\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L;\
\mathcal{G}_H,\mathcal{G}_M,\mathcal{G}_L,\
\mathcal{G}_{HM},\mathcal{G}_{HL},\mathcal{G}_{ML};\
\chi_c
\big).
$$

Here $\mathcal{G}_a$ is the causal-root ledger for layer $a$: active self-hit and partner-hit branches, root multiplicities, winding or phase branch, emission-order data, and separator history over the chosen closure period. The inter-layer ledgers $\mathcal{G}_{ab}$ record delayed exchange roots and phase-lock constraints between binary layers. The branch label $\chi_c$ records ordered core chirality, currently the `HML/HLM` datum, with $Wr_c$ or a multi-component causal-writhe parity as the leading formal candidate.

The configuration-space quotient must remove only genuine gauge redundancy: center-of-mass translation, time-origin choice, smooth phase reparameterization inside a closed root-ledger cell, and small deformations that preserve the ordered layer labels, root ledgers, and chirality branch. It must not quotient away permutations of $H,M,L$, reversal of the oriented normals, or branch-changing causal-root relabelings. With those restrictions, the frame has an $SO(3)$ orientation projection but may carry a two-sheet history lift:

$$
\pi:\widetilde{\mathcal Q}_{\text{NC}}^{\text{ord}}
\to
\mathcal Q_{\text{NC}}^{\text{ord}},
\qquad
\mathrm{fiber}\simeq\mathbb{Z}_2.
$$

The spinor closure target is to show that a physical $2\pi$ rotation closes the base frame but transports the history-lifted state to the opposite sheet, while a $4\pi$ rotation closes both:

$$
\tilde q \xrightarrow{2\pi} -\tilde q,
\qquad
\tilde q \xrightarrow{4\pi} \tilde q.
$$

Equivalently, derive a nontrivial holonomy homomorphism

$$
\mu:\pi_1(SO(3))\cong\mathbb{Z}_2
\to
\mathrm{Aut}(\mathcal{G},\chi_c)
$$

from delayed causal-root transport. If $\mu$ is trivial, the ordered-frame route does not supply fermion spinor closure. In the planar alignment limit,

$$
\det\!\big[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L\big]\to0,
$$

the ordered 3D frame leaves the spinor-test domain and should reduce to the $SO(2)$ / $U(1)$ phase branch described in the Planck-alignment and horizon-chirality notes.

### Next Proof Obligations For Spinor Closure

1. **Branch-certificate extraction:** for one stable separated-scale Noether-core branch, extract $P_a$, $\hat{\mathbf n}_a$, $\mathcal{G}_a$, $\mathcal{G}_{ab}$, $\chi_c$, phase offsets, and the total angular-momentum ledger over a common closure period.
2. **Quotient lemma:** prove that the branch-preserving quotient above has an $SO(3)$ frame projection while retaining any nontrivial history sheet; state exactly which deformations are gauge and which are physical branch changes.
3. **Holonomy calculation:** transport $F_{\text{NC}}$ around a controlled $2\pi$ rotation path and compute the induced action on causal-root ledgers, causal-writhe parity, and phase-closure residuals. The result must come from delayed root transport, not from the usual spinor analogy.
4. **$4\pi$ restoration test:** show that the same transport over $4\pi$ restores the full history-lifted state, not only the visible normal triad. Failure to restore falsifies the proposed lift; restoration after $2\pi$ collapses the target back to ordinary $SO(3)$ behavior.
5. **Angular-momentum compatibility:** show that the history lift preserves the conserved $\mathbf{L}_{\text{tot}}=\mathbf{L}_{\text{mech}}+\mathbf{L}_{\text{wake}}$ ledger and does not hide unbalanced torque in the quotient.
6. **Planar degeneration check:** drive the same branch toward $\det[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L]\to0$ and verify whether the rotation test transitions from $4\pi$ to $2\pi$ return as the configuration reduces toward the planar $SO(2)$ / $U(1)$ branch.
7. **Measurement handoff:** only after the lift is proved, define how an apparatus axis couples to this full ordered-frame ledger to produce the two observed spin outcomes.

## Downstream Consumers Audit 2026-05-12

These documents should inherit the single-core angular-momentum ledger and ordered-frame spinor proof rather than supplying separate explanations:

1. **[nucleon-structure.md](../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md).** The proton spin decomposition, the use of $J=\frac{1}{2}$ for a coupled tri-core, and the split into quark-core spinor structure, strong-sector orbital circulation, and flux-network angular momentum depend on the reusable single-core ledger plus the later hadron-level color-corridor ledger.
2. **[gluons.md](../../../content/markdown/aaa/assemblies/bosons/gluons.md).** The gluon spin-1/vector-channel paragraph, the helicity limit, and the claim that the rotating vortex link carries spin and orbital angular momentum between quark cores depend on the vector-mode descent from the same ledger.
3. **[mesons.md](../../../content/markdown/aaa/assemblies/mesons/mesons.md).** The pion boson/Pauli statement, rho spin-1 alignment shorthand, Delta spin-$\tfrac{3}{2}$ and parallel-spin shorthand, Delta Pauli/color-sector explanation, dense-matter packing argument, excitation ladder, lifetime notes, and $J^P$ summary are all hadron-level validation surfaces. They should not be used as independent support for spin-statistics or single-core spinor closure.
4. **[quantum-statistics.md](../../../content/markdown/aaa/quantum/quantum-statistics.md).** The 3D exclusion-envelope account, the 2D coherent-channel account, the fermionic exchange sign, Pauli exclusion, and bosonic symmetric occupation remain a spin-statistics proof program. Volume exclusion alone is not enough until the ordered-frame spinor proof supplies the exchange phase.
5. **[angular-momentum-and-spin.md](../../../content/markdown/aaa/theory-bridges/angular-momentum-and-spin.md).** The bridge is the notation and mapping layer. It should keep downstream spin labels, helicity labels, and orbital labels classified as effective summaries or closure targets until this priority supplies the proof.
6. **[measurement-ontology.md](../../../content/markdown/aaa/quantum/measurement-ontology.md).** The spin / discrete-outcome section may define measurement as finite-time basin resolution, but the Stern-Gerlach half-angle response inherits the ordered-core spinor coordinate, record-cycle invariant measure, and Master-Equation apparatus branch-sum impulse from this workstream.
7. **[bell-theorem.md](../../../content/markdown/aaa/theory-bridges/bell-theorem.md).** Bell / CHSH / Tsirelson material is the final correlation test. Its local response kernels, singlet-pair provenance, and photon-polarization Bell handoff depend on the single-core measurement response, pair-provenance measure, and Gate B transverse-ledger proof.
8. **[atomic-structure.md](../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md).** Atomic orbitals, exclusion-volume packing, Pauli filling, spin-orbit coupling, and hyperfine structure should be treated as atomic validation targets. They inherit observer-level orbital quantum number recovery, ordered-core spinor closure, and measurement-response closure rather than defining the angular-momentum ledger.
9. **[atomic-spectra.md](../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md).** Rydberg-scale spectra can remain a medium-sensitive resonance target, but fine structure, spin-orbit splitting, Zeeman/Stark spin response, and hyperfine splitting depend on the unresolved angular-momentum and measurement-response proofs.
10. **[molecular-geometry.md](../../../content/markdown/aaa/nuclear-atomic/molecular-geometry.md).** Bond angles, exclusion costs, phase compatibility, singlet/triplet chemistry labels, and bonding selection rules should inherit atomic spin/statistics closure. A corridor-plus-exclusion functional is not by itself a spin-statistics proof.
11. **[electroweak-bosons.md](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md).** Photon Gate B, W/Z spin-1 vector-channel language, longitudinal/mixed-axis separation, and Higgs scalar comparison are vector-mode consumers of this workstream. Gate B supplies the photon-specific transverse ledger only after Gate A kinematics and the fundamental angular-momentum ledger are available.
12. **[mode-taxonomy.md](../../../content/markdown/aaa/interactions/mode-taxonomy.md).** Reaction-level planar-mode and corridor-mode language may record which ledger must close, but it should not make reaction taxonomy appear to derive photon polarization, vector spin, or Pauli/statistics by itself.
13. **[particle-masses.md](../../../content/markdown/aaa/assemblies/particle-masses.md).** The mass-channel split between massless photon, massive W/Z corridor, and Higgs scalar mode depends on Gate A/B and vector-mode closure. It should stay a category discipline, not a completed spin/helicity derivation.
14. **[reaction-ledger.md](../../../content/markdown/aaa/validation/reaction-ledger.md).** Weak-corridor provenance, beta-reaction handedness, antineutrino orientation, and event-level angular-momentum bookkeeping inherit the weak exposure proof, ordered-core spinor/helicity proof, and tri-binary partition ledger. The reaction ledger records the required fields; it does not prove weak chirality or spin response.
15. **[reaction-cosmology-provenance-ledger.md](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).** Photon-output, polarization, CMB, and cascade records consume Gate B as an acceptance filter. They should record the transverse-ledger fields needed by radiation and cosmology arguments without treating that record as a derivation of photon spin or polarization statistics.
16. **[bremsstrahlung.md](../../../content/markdown/aaa/reactions/bremsstrahlung.md)** and **[synchrotron.md](../../../content/markdown/aaa/reactions/synchrotron.md).** Emitted photon energy, direction, polarization basis, synchrotron polarization limits, angular-momentum balance, and pair-production handoffs are photon-channel validation surfaces. The emission chapters own source and provenance bookkeeping; photon polarization and helicity closure still belongs to Gate B and the shared angular-momentum ledger.
17. **[weak-mixing-ckm.md](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md).** The left/right helicity exposure criterion for weak-coupling-triad docking depends on the unresolved spin/helicity geometry. It is a high-value vector/fermion test case, not an independent weak-sector proof of handedness.
18. **[architrino-si-base-units.md](../../../content/markdown/aaa/validation/architrino-si-base-units.md).** The Cesium hyperfine clock target depends on atomic spin-orbit and nuclear-spin coupling. It can remain an SI validation target, but it inherits atomic angular-momentum, nuclear spin, and measurement-response closure.
19. **[quantum-summary.md](../../../content/markdown/aaa/quantum/quantum-summary.md)** and **[constraint-ledger.md](../../../content/markdown/aaa/validation/constraint-ledger.md).** These are summary ledgers. Their Gate B and spin-statistics rows should point to the active proof programs and avoid implying closure by summarization.
20. **[horizon-chirality.md](../../../content/markdown/aaa/spacetime/horizon-chirality.md).** Boundary-helicity and axial left/right language is already marked as proxy language. It should remain a geometric hypothesis until the single-core angular-momentum and spinor proof shows how observer-level helicity descends from the delayed ledger.

### Op-Discussion Hypothesis: Component-Resolved Causal Writhe Bridge

Status: hypothesis from the 2026-05-12 Op-discussion pass, not established doctrine and not yet a canon definition.

The working result is that scalar $Wr_c[\gamma]$ is a strong chirality signal but is probably too compressed to carry all three labels by itself. It can plausibly detect handedness of a single causal self-interaction pattern, but a scalar total can alias or vanish when the tri-binary has multiple role-labeled components, balanced pro/anti pairings, mixed planar rows, or a weak-coupling-triad exposure state that depends on wake geometry rather than only on intrinsic handedness.

The stronger candidate is a component-resolved causal-writhe data set, kept as separate projections rather than collapsed into one sign:

$$
\mathcal{W}_{c}^{\text{core}}
=
\left(
\{Wr_c^a\}_{a\in\{H,M,L\}},
\{Wr_c^{ab}\}_{a<b},
\chi_{HML}^{(c)},
\{s_a^{\text{plane}}\}_{a\in\{H,M,L\}},
s_{\text{axial}},
\Sigma_{\mathrm{WCT}}
\right).
$$

Here $Wr_c^a$ records self-causal writhe on a labeled binary layer, $Wr_c^{ab}$ records cross-component causal writhe / linking on the delayed locus between two labeled layers, $\chi_{HML}^{(c)}$ records the ordered 3D `HML/HLM` chirality candidate, $s_a^{\text{plane}}$ records the planar angular-momentum sign of each layer relative to the chosen exterior normal, $s_{\text{axial}}=\operatorname{sgn}(\mathbf{J}_{\text{net}}\cdot\hat{\mathbf V})$ records the high-velocity axial branch when a translation direction exists, and $\Sigma_{\mathrm{WCT}}$ records which weak-coupling-triad sites are forward-exposed rather than wake-hidden.

This tuple gives the desired non-collapse discipline:

- `pro/anti` should be tested against the ordered 3D causal-writhe / cross-link pattern, especially the `HML/HLM` branch history.
- horizon planar signs should be tested against $\{s_a^{\text{plane}}\}$ and the eight-row `CW/CCW` table, with the two uniform rows treated as endpoint candidates rather than forced identifications with `pro/anti`.
- weak left/right exposure should be tested against $s_{\text{axial}}$ plus $\Sigma_{\mathrm{WCT}}$, because the weak gate depends on forward exposure and wake shielding, not on planar boundary helicity alone.

The labels may collapse only under additional proved conditions: axialization drives $\mathbf{J}_{\text{net}}\parallel\pm\hat{\mathbf V}$, the horizon state relaxes to a uniform planar row, and the same sign choice reliably exposes or hides the weak-coupling triad. Until those three conditions are derived or simulated, the bridge should preserve `pro/anti`, `CW/CCW`, and weak `L/R` as related but distinct readouts.

Missing evidence:

1. Evaluate $Wr_c^a$ and $Wr_c^{ab}$ on controlled pro-core and anti-core tri-binary trajectories to see whether the ordered `HML/HLM` distinction survives smooth deformation and flips only through causal-locus reconnection.
2. Test whether scalar $Wr_c[\gamma]$ aliases distinct ordered cores or balanced pro/anti pairings; if it aliases, require the component-resolved data set before using causal writhe as a spin bridge.
3. In horizon-adjacent simulations, track $\{s_a^{\text{plane}}\}$, $\mathbf{J}_{\text{net}}\cdot\hat{\mathbf V}$, mixed-row lifetimes, and branch persistence after re-expansion.
4. In weak-sector exposure tests, verify whether the same $\Sigma_{\mathrm{WCT}}$ that gates left-handed docking also supplies the CKM overlap domain and reaction-provenance payload.
5. Tie every sign to the conserved history-aware angular-momentum ledger, including $\mathbf{L}_{\text{wake}}$, so the bridge is not merely a kinematic normal-vector convention.

Decision question for Op: Should the next proof pass define the bridge object as component-resolved causal-writhe data first, instead of trying to promote scalar $Wr_c$ as the direct `pro/anti` / planar-sign / weak-exposure identifier?

## Focus Areas From The Audit

1. **Promote the delayed total-angular-momentum scaffold into a validated functional.** The 2026-05-12 scaffold above evaluates $\mathbf{L}_{\text{tot}}=\mathbf{L}_{\text{mech}}+\mathbf{L}_{\text{wake}}$ in three-layer Noether-core variables. The remaining work is to derive the wake term from the regularized nonlocal action, verify the branch sums numerically, and decide when the separated-scale reduction may drop $\mathbf L_{\text{tr}}$.
2. **Turn the one-$h$ bookkeeping table into a partition theorem target.** Use the constrained solve above to determine $\Delta I_{\text{inner}}$, $\Delta I_{\text{middle}}$, $\Delta I_{\text{outer}}$, and $\Delta I_{\text{wake}}$ from conservation, root-ledger admissibility, phase-lock constraints, branch stability, and coupling geometry, instead of assigning the split by narrative role.
3. **Generalize the solved worked transition.** Use the solved minimal four-substep branch in [angular-momentum-and-spin.md](../../../content/markdown/aaa/theory-bridges/angular-momentum-and-spin.md) as the first branch certificate, then derive or simulate the coefficient equations for non-minimal middle-hinge retunes, inner self-hit branch updates, wake exchange, and final partitions.
4. **Prove or falsify the ordered-frame spinor lift.** Use the ordered-frame definition above to test whether causal-root history supplies a nontrivial $2\pi$ holonomy and $4\pi$ restoration, or whether the Noether-core frame closes as an ordinary $SO(3)$ object.
5. **Use orbital quantization as the contrast gate for spinor closure.** Treat $e^{im\phi}$ single-valuedness, $m\in\mathbb Z$, and regular spherical-harmonic labels $\ell\in\mathbb N_0$, $-\ell\le m\le\ell$, as observer-level orbital recovery targets. The fermion proof must instead supply the ordered-core $2\pi$ sheet change, $4\pi$ restoration, and Stern-Gerlach $\pm\hbar/2$ projection response.
6. **Use causal writhe as the chirality bridge candidate.** Test whether $Wr_c$ or a multi-component extension can distinguish pro/anti ordered cores, horizon planar signs, and weak left/right exposure without collapsing those labels prematurely.
7. **Evaluate the substrate Stern-Gerlach-like basin-measure law.** Starting from the kernels $K_{\pm}^{\text{SG}}$, reduced separatrix $\Sigma_{\hat{\mathbf m}}^{\text{SG,red}}$, record-cycle measure $d\nu_{\text{rec}}$, and branch-sum apparatus impulse $\dot{\mathbf J}_{C}^{\text{app}}$ in [angular-momentum-and-spin.md](../../../content/markdown/aaa/theory-bridges/angular-momentum-and-spin.md), derive the effective spinor coordinate, compute the separatrix normal $\mathcal{N}_{\hat{\mathbf m}}^{\text{SG,red}}$ in a concrete apparatus model, evaluate the substrate preparation measure $\mu_\alpha$, and compute the pair-provenance measure needed to lift the single-core half-angle arithmetic into a Master-Equation Bell test.
8. **Route photon helicity through the same ledger.** Derive the planar-pair transverse ledger, material analyzer projector, invariant unresolved-material measure, and analyzer coupling needed for helicity $\pm1$, Malus' law, no longitudinal free photon mode, and no-signaling in polarization tests.
9. **Keep Bell as the final hard gate.** After the response kernel exists, revisit Bell with the explicit pair-provenance ledger and test whether the resulting kernel reaches $E(\hat{m}_A,\hat{m}_B)=-\cos\theta_{AB}$ while preserving no-signaling and measurement independence.
10. **Delay hadron and Pauli claims until the core proof is reusable.** Nucleon spin decomposition, gluon spin accounting, meson and Delta spin/parity assignments, Delta Pauli/color-sector explanations, dense-hadron packing claims, and spin-statistics should inherit the single-core and vector-channel results instead of inventing separate explanations.
11. **Revisit atomic and molecular spin after the quantum ledger stabilizes.** Treat atomic and molecular spin as validation surfaces for the lower derivation: recover observer-level orbital quantum numbers, spin-orbit and hyperfine couplings, molecular singlet/triplet states, and bonding / exclusion rules from the reusable angular-momentum ledger rather than using those labels to define the ledger.
12. **Add a proof-hygiene gate for action and conservation claims.** Before any downstream spin, photon, weak-handedness, Pauli, or Bell chapter treats the angular-momentum ledger as closed, audit the exact status of the nonlocal action, the wake angular-momentum term, and the conservation claims. The current corpus has real branch geometry, torque integrals, partition equations, and a solved narrow certificate, but the wake term can still read like a reconstruction of missing torque unless it is derived from a symmetry-preserving regularized action or independently validated in simulations. This gate should classify each claim as theorem-backed, definition/bookkeeping, reduced-chart arithmetic, simulation diagnostic, or speculation; tighten any language that says the master equation has already delivered standard spin or Bell correlations; and require explicit hypotheses whenever global energy-momentum or angular-momentum conservation is invoked.

## Photon Gate B Dependencies And Closure Tests

This workstream owns photon Gate B only. Gate A remains the kinematics and optics packet in [electroweak-bosons.md](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md); Gate C remains the vertices and transitions packet in reaction and electroweak material. Gate B starts after Gate A has supplied the admissible photon branch.

### Exact Dependencies

1. **Gate A input contract.** Gate B may use $\hat{\mathbf{e}}$, $c_\gamma$, $\omega$, $d(\omega,\delta_\gamma)$, $\phi_{\text{geom}}$, the null relation $E_\gamma^2-\|\mathbf{p}_\gamma\|^2c_\gamma^2=0$, no rest proper-time branch, and acceptable nondispersion/leakage residuals. If any of those fail, the failure belongs to Gate A, not to polarization/spin closure.
2. **Fundamental angular-momentum ledger.** Gate B depends on the conserved history-aware ledger $\mathbf{L}_{\text{tot}}=\mathbf{L}_{\text{mech}}+\mathbf{L}_{\text{wake}}$ so photon helicity is a projection of the same conserved ledger used for Noether cores, not a separate photon-only rule.
3. **Planar-pair geometry.** Gate B depends on the coaxial contra-rotating pro/anti planar pair: the pro/anti static exposures must cancel while a transverse oscillatory action ledger survives.
4. **Analyzer material ledger.** Gate B must define how a polarizing analyzer supplies a transverse acceptance axis, why the accepted material channel is rank one inside $P_{\perp}$, how accepted and rejected components route into material ledger updates, and how apparatus/wake/Noether-Sea recoil close locally.
5. **Invariant analyzer measure.** The squared-amplitude result depends on the quantum-closure invariant-measure program. Gate B now has a reduced origin scaffold: $\Theta_{\hat{\mathbf a}}$ is the calibrated analyzer record-window quotient, $d\nu_{\hat{\mathbf a}}$ is the invariant occupation measure of the material return map $T_s$, and $\eta_{\hat{\mathbf a}}$ is the pass-basin threshold coordinate. The open substrate proof is to compute those objects from concrete analyzer assembly dynamics and prove or bound the detector-bias function $\Delta_{\text{pol}}(\rho)$.
6. **Bell / no-signaling handoff.** Photon-polarization Bell tests depend on this Gate B ledger plus the quantum-closure pair-provenance measure. They are distinct from spin-$\tfrac{1}{2}$ singlet tests and should use the photon polarization angle law rather than the spinor half-angle law.

### Closure Tests

1. **Rank-two transverse support.** Derive
   $$
   P_{\perp}^{ab}=h^{ab}-\hat{e}^a\hat{e}^b
   $$
   and show that the free photon ledger lives in $\operatorname{im}P_{\perp}$. The longitudinal candidate $P_{\parallel}^{ab}=\hat{e}^a\hat{e}^b$ must not be an accepted free photon mode.
2. **Helicity eigenstates.** In a transverse basis $(\hat{\mathbf u},\hat{\mathbf v})$, derive circular states $\boldsymbol{\epsilon}_{\pm}=(\hat{\mathbf u}\pm i\hat{\mathbf v})/\sqrt{2}$ and recover
   $$
   J_{\gamma,\parallel}=\lambda_{\text{hel}}\hbar,
   \qquad
   \lambda_{\text{hel}}\in\{+1,-1\}.
   $$
3. **Linear analyzer coupling.** For analyzer axis $\hat{\mathbf a}=P_{\perp}\hat{\mathbf a}$ and incoming linear axis $\hat{\mathbf e}_\gamma$, recover
   $$
   \mathcal A_{\text{pass}}\propto\hat{\mathbf e}_\gamma\cdot\hat{\mathbf a}=\cos\theta.
   $$
4. **Material analyzer projector.** Derive the accepted material relocking family
   $$
   \mathcal{C}_{\text{pass}}(\hat{\mathbf a})
   =
   \{\xi\,\hat a^a:\xi\in\mathbb{C}\}
   \subset\operatorname{im}P_{\perp}
   $$
   from the oriented analyzer assembly. The resulting projector must satisfy
   $$
   A^2=A,
   \qquad
   A^\dagger=A,
   \qquad
   \operatorname{tr}_{\perp}A=1,
   \qquad
   A^a{}_{b}=\hat a^a\hat a_b.
   $$
   The rejected complement is $R^a{}_{b}=P_{\perp}^{a}{}_{b}-A^a{}_{b}$ and must route locally into reflection, absorption, scattering, heat, or another material ledger update.
5. **Malus / squared-amplitude rule.** The native capture-measure scaffold is now:
   $$
   \mathcal{I}_{\perp}=h_{ab}\,\overline{a_\perp^a}a_\perp^b,
   \qquad
   A^a{}_{b}=\hat a^a\hat a_b,
   \qquad
   \mu_{\text{pass}}
   =
   \frac{\overline{a_\perp^a}\,\hat a_a\hat a_b\,a_\perp^b}
   {\mathcal{I}_{\perp}}.
   $$
   For linear input $a_\perp^a=\hat e_\gamma^a$, this gives $\mu_{\text{pass}}=\cos^2\theta$ and $\mu_{\text{rej}}=\sin^2\theta$. The remaining proof obligation is to derive the positive action norm and projector from planar-pair and material ledger dynamics, not to import Malus' law as an observer-level postulate.
6. **Invariant unresolved-material measure.** Derive the analyzer microstate space as the record-window quotient
   $$
   \Theta_{\hat{\mathbf a}}
   =
   \mathcal{P}_{\hat{\mathbf a}}/\!\sim_{\hat{\mathbf a}},
   $$
   the local material return map $T_s$, and the invariant occupation measure $d\nu_{\hat{\mathbf a}}$ satisfying
   $$
   \nu_{\hat{\mathbf a}}(\Theta_{\hat{\mathbf a}})=1,
   \qquad
   T_{s*}d\nu_{\hat{\mathbf a}}=d\nu_{\hat{\mathbf a}}.
   $$
   For the pass-basin filtration $\mathcal{B}_{\text{pass}}(\rho;\hat{\mathbf a})$, define
   $$
   \eta_{\hat{\mathbf a}}(\zeta)
   =
   \inf\left\{
   \rho\in[0,1]:
   \zeta\in\mathcal{B}_{\text{pass}}(\rho;\hat{\mathbf a})
   \right\}.
   $$
   The ideal-analyzer closure target is
   $$
   (\eta_{\hat{\mathbf a}})_*d\nu_{\hat{\mathbf a}}=d\eta.
   $$
   Then the deterministic pass kernel
   $$
   K_{\text{pass}}
   =
   H\!\left(\mu_{\text{pass}}-\eta_{\hat{\mathbf a}}(\zeta)\right)
   $$
   must satisfy $\int K_{\text{pass}}\,d\nu_{\hat{\mathbf a}}=\mu_{\text{pass}}$ for a successful material record.
7. **Detector-bias diagnostic.** If the pushforward is not uniform, record
   $$
   \Delta_{\text{pol}}(\rho)
   =
   \nu_{\hat{\mathbf a}}
   \left(
   \{\zeta:\eta_{\hat{\mathbf a}}(\zeta)<\rho\}
   \right)
   -\rho.
   $$
   A nonzero $\Delta_{\text{pol}}$ is a material calibration or analyzer-model failure, not a new photon polarization rule.
8. **No longitudinal free photon mode.** A longitudinal or mixed-axis response must be classified as a massive $W/Z$-like corridor, material recoupling, gauge redundancy, or Gate A failure mode. It must not appear as a third free photon polarization.
9. **Single-photon statistics.** Repeated single-photon analyzer tests must converge to the same $\cos^2\theta$ pass frequency while each event closes energy, momentum, angular momentum, and local apparatus ledger balance.
10. **No-signaling in polarization tests.** For entangled photon preparations and analyzer settings $\alpha,\beta$, recover
   $$
   \sum_{b=\pm}P(a,b\mid\alpha,\beta)=P(a\mid\alpha),
   \qquad
   \sum_{a=\pm}P(a,b\mid\alpha,\beta)=P(b\mid\beta).
   $$
   The correlation target is the standard photon-polarization $\cos 2(\alpha-\beta)$ dependence up to state sign and phase convention, not the spin-$\tfrac{1}{2}$ $-\cos\theta$ curve.

## Fundamental Questions

1. What is the exact total angular-momentum functional for the delayed architrino dynamics, including active causal-wake history?
2. How does that functional decompose across inner, middle, and outer binary layers in a Noether core?
3. When an external interaction transfers momentum or action into one layer, what determines the frequency shifts of the other layers?
4. How does self-hit feedback alter the angular-momentum ledger without creating or destroying total angular momentum?
5. Which coupling-geometry data determine $\Delta E_{\text{coupl}}$, $\Delta\mathbf J_{\text{coupl}}$, and the transaction axis $\hat{\mathbf a}$ for the first outer-exposed worked transition?
6. What branch constraints decide whether a redistribution is stable, transient, or forbidden?
7. Which part of the ledger becomes observer-level orbital angular momentum, which part becomes spin, and which part remains hidden inside assembly structure?
8. What measured operation actually counts as a spin measurement in substrate terms?
9. How does the same conserved ledger reduce to the planar-pair transverse photon ledger without importing a rest-frame spin representation?
10. Once the quantum-level ledger exists, how do atomic and molecular spin labels emerge from it without conflating internal tri-binary rotational action with observer-level orbital angular momentum or molecular term symbols?

## Bell's Theorem Placement

Bell's theorem remains an important test, but it should not be allowed to dictate the ontology before the angular-momentum ledger exists. The theorem rules out a specific class of observer-level models: local factorizable response functions over variables that are statistically independent of detector settings. It does not by itself explain what angular momentum is, what spin is, or how a Noether core responds to a measuring apparatus.

For $\mathbb{A}\mathbb{A}\mathbb{A}$, the Bell question should be postponed until the lower-level work is clear enough to answer these questions concretely:

- What architrino-level structure carries the singlet angular-momentum ledger?
- How is $\mathbf{J}_A+\mathbf{J}_B=0$ represented in the full pair provenance, not merely as an abstract quantum label?
- How does each local apparatus couple to the full spin ledger of its target assembly?
- Which part of the Bell abstraction fails when the actual angular-momentum and measurement-response mechanism is compressed into variables $\lambda$?
- Why do the observer-level correlations look mysterious when the underlying conservation and path-history structure is not resolved?

Once angular momentum and spin are understood at the Noether-core level, [bell-theorem.md](../../../content/markdown/aaa/theory-bridges/bell-theorem.md) must be revisited in exhaustive detail. The final Bell chapter should explain how nature works, why the inherited abstraction made the situation confusing, and why the "hidden variable" label misdescribes a theory in which the relevant variables were hidden by coarse formalism rather than hidden in the ontology.

## Near-Term Development For The Bridge

- Validate the derivation scaffold for the total angular-momentum functional in delayed dynamics.
- Promote the one-$h$ action table into the tri-binary partition theorem target by carrying the normalized variables $\Delta I_{\text{inner}}$, $\Delta I_{\text{middle}}$, $\Delta I_{\text{outer}}$, and $\Delta I_{\text{wake}}$ through conservation, root-ledger, phase-lock, stability, and coupling-geometry constraints.
- Generalize the solved minimal four-substep branch into a family of admissible branches with coefficient values derived from the master equation or extracted from simulations.
- Prove or falsify the ordered-frame spinor lift by extracting one stable branch certificate, proving the branch-preserving quotient lemma, and computing the $2\pi$ / $4\pi$ delayed-root holonomy.
- Separate observer-level orbital quantization from internal Noether-core spin by deriving the effective far-zone envelope and its $(\ell,m)$ angular content before revisiting atomic and molecular spin labels.
- Test the component-resolved causal-writhe bridge before promoting scalar $Wr_c$ into any direct `pro/anti`, planar-sign, or weak left/right identifier.
- Lift the photon Gate B analyzer-measure origin scaffold into a substrate proof by computing the analyzer projector, record-window quotient $\Theta_{\hat{\mathbf a}}$, material return map $T_s$, invariant measure $d\nu_{\hat{\mathbf a}}$, pass-threshold coordinate $\eta_{\hat{\mathbf a}}$, detector-bias diagnostic $\Delta_{\text{pol}}(\rho)$, and no-signaling polarization statistics from the planar-pair ledger and material analyzer dynamics.
- Evaluate the Master-Equation branch-sum and record-cycle realization of the reduced Stern-Gerlach basin-measure law for $K_{\pm}^{\text{SG}}$, keeping the Bell response function as a closure target until the pair-provenance measure is calculated.
- Construct the singlet-like pair-provenance ledger and two local apparatus-response maps before attempting the Bell correlation proof.
- Rebuild the Bell account from the completed angular-momentum ledger, measurement-response kernel, pair-provenance measure, and no-signaling proof.

## Related Priorities

- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md)
- [quantum-closure](../quantum-closure/quantum-closure.md)
- [standard-model-closure](../standard-model-closure/standard-model-closure.md)

## Related AAA Notes

- [angular-momentum-and-spin](../../../content/markdown/aaa/theory-bridges/angular-momentum-and-spin.md)
- [bell-theorem](../../../content/markdown/aaa/theory-bridges/bell-theorem.md)
- [measurement-ontology](../../../content/markdown/aaa/quantum/measurement-ontology.md)
- [wavefunction-ontology](../../../content/markdown/aaa/quantum/wavefunction-ontology.md)
- [planck-scale-tri-binary-alignment](../../../content/markdown/aaa/theory-bridges/planck-scale-tri-binary-alignment.md)
- [noether-core](../../../content/markdown/aaa/assemblies/noether-core.md)
- [noether-core-geometry](../../../content/markdown/aaa/assemblies/noether-core-geometry.md)
- [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md)
- [causal-action-functional](../../../content/markdown/aaa/dynamics/causal-action-functional.md)
- [energy](../../../content/markdown/aaa/dynamics/energy.md)
- [horizon-chirality](../../../content/markdown/aaa/spacetime/horizon-chirality.md)
- [quantum-number-mapping](../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md)
- [weak-mixing-ckm](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md)
- [nucleon-structure](../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md)
- [gluons](../../../content/markdown/aaa/assemblies/bosons/gluons.md)
- [mesons](../../../content/markdown/aaa/assemblies/mesons/mesons.md)
- [quantum-statistics](../../../content/markdown/aaa/quantum/quantum-statistics.md)
- [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md)
- [mode-taxonomy](../../../content/markdown/aaa/interactions/mode-taxonomy.md)
- [particle-masses](../../../content/markdown/aaa/assemblies/particle-masses.md)
- [reaction-ledger](../../../content/markdown/aaa/validation/reaction-ledger.md)
- [reaction-cosmology-provenance-ledger](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md)
- [bremsstrahlung](../../../content/markdown/aaa/reactions/bremsstrahlung.md)
- [synchrotron](../../../content/markdown/aaa/reactions/synchrotron.md)
- [architrino-si-base-units](../../../content/markdown/aaa/validation/architrino-si-base-units.md)
- [quantum-summary](../../../content/markdown/aaa/quantum/quantum-summary.md)
- [constraint-ledger](../../../content/markdown/aaa/validation/constraint-ledger.md)
- [atomic-structure](../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md)
- [atomic-spectra](../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md)
- [molecular-geometry](../../../content/markdown/aaa/nuclear-atomic/molecular-geometry.md)
