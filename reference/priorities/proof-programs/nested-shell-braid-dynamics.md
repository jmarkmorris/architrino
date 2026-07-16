# Nested Shell Braid Dynamics — Mechanism and Certificate Targets

Status: requirements and theorem-target material relocated 2026-07-15 from the corpus chapter
`content/markdown/aaa/noether-braid/braid-families.md` per the braid-program
[corpus reconciliation plan](../braid-program/corpus-reconciliation.md). This is proof-program
tracking, not reader-facing prose. No result herein is relied on: certificate targets, diagnostics,
and roadmaps are obligations for the validated engine; any measured or status language surviving
from the relocation is historical and must be re-established before use. Legacy labels may appear
as citations only.

This section carries the nested family's mechanism and certificate-target material: how a nested shell braid could stay together as a moving delayed system, extending the two-body causal-wake problem into a three-band assembly whose inner, middle, and outer support bands must keep compatible branch records instead of behaving like three independent orbits. Stability is treated as same-record closure: the branch must carry the period, active-root ledger, deformation map, medium response, observer-export packet, and event ledger together, and a visually plausible frequency pattern or useful envelope shape is not enough unless it belongs to the same retained delayed record.

The realization-independent machinery first stated here now lives with the shared mathematics — the substrate levels, speed hierarchy, transverse causal budget lemma, spiral-helical motion picture, mass thesis, hinge equation sketch, and acceleration-gradient comparison are in [Braid Mathematics](../../../content/markdown/aaa/noether-braid/braid-mathematics.md#substrate-and-effective-levels — and the strong-field endpoint (the braid symmetry-breaking point, the local black-hole duality target, and the terminal-alignment label-count program) lives in the [Terminal Alignment](../../../content/markdown/aaa/proof-programs/terminal-alignment.md proof program. What remains below is the nested-specific mechanism scaffold, read together with [Binary Dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md and [Noether Braid Doubling-Frequency Resonance Lock](../../../content/markdown/aaa/noether-braid/braid-families.md#noether-braid-doubling-frequency-resonance-lock.

## Relation to Causal Closure

This chapter owns the dynamics baseline: the nested shell braid roles, speed-regime conventions, delay-envelope geometry, gradient response, local cycle-period diagnostics, and stability tests that define the nested shell braid mechanism. It does not try to close the full rest-mass, photon, or observer-inference proof program.

Proper time $\tau$ does not exist at this layer. The EOM is integrated exclusively over absolute substrate time $T$. A nested shell braid branch may output absolute periods, causal-root ledgers, deformation tensors, and stability residuals; later observer-inference chapters may translate those outputs into clock, ruler, signal, and effective-geometry language.

The stronger causal-closure program uses the mechanism defined here as an input. In this chapter, those stronger claims are included only where they clarify the dynamics baseline, and they are marked as reconstruction targets rather than completed theorems.

## Claim Scope

The claims in this chapter define a canonical dynamics baseline. They do not yet constitute a completed derivation of rest mass, photon behavior, or general relativity from first principles. The claims are organized into three classes:

| Class | Treatment in this chapter |
| --- | --- |
| Dynamics baseline | Nested shell braid roles, speed-regime conventions, delay-envelope geometry, spiral-helical motion, cycle-period diagnostics, and stability tests. |
| Reconstruction target | Mass response, photon-channel behavior, observer-inference exports, and weak-field matching inputs as quantities to be derived from the dynamics before downstream interpretation. |
| Open proof burden | Nested shell braid minimality, shielding extraction, momentum-skew derivation, Floquet stability, photon closure, equivalence-principle export bounds, and downstream observer-geometry closure. |

The chapter should therefore be read as the stable dynamics layer beneath the causal-closure program. It preserves the mechanism and the diagnostic quantities while leaving the full theorem burden explicit.

## Causal-Closure Certificate Target

The rest-mass, moving-deformation, photon, observer-export, and event-ledger rows should be populated by one retained branch record, not by separately tuned fits. Retention is the conclusion of the certificate, not an assumption made before the rows are checked. For a candidate nested shell braid chart $q$ over a test window $W$, the shared certificate target is

$$
\mathcal{C}_{\mathrm{NSH}}^{(q)}(W)
=
\left(
\mathcal{A}_q,
\nu_J^{(q)},
\nu_{\mathrm{rec}}^{(q)},
g_{\mathrm{inactive}}^{(q)},
h_{\mathrm{mem}}^{(q)},
\Delta_{\mathbf{k}}^{(q)},
\mathcal{D}_{\beta,q}^{\mathrm{mov}},
T_q(\mathbf V_{\text{trans}}),
\mathcal{M}_{\mathrm{sea},q}^{ab},
\mathcal{R}_{\mathrm{mov},q},
\theta_{\mathrm{obs}}^{(q)},
\mathfrak{S}^{(q)}(W),
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}
\right)
$$

Here $\mathcal{A}_q$ is the active causal-root ledger, $\nu_J^{(q)}$ the active source-normal Jacobian floor, $\nu_{\mathrm{rec}}^{(q)}$ the retained receiver-normal branch-strength floor or certified interval for $W_{ij}^{\mathrm{rec}}$, $g_{\mathrm{inactive}}^{(q)}$ the inactive-root gap, $h_{\mathrm{mem}}^{(q)}$ the finite memory depth, and $\Delta_{\mathbf{k}}^{(q)}$ the Floquet or branch-stability gap. The remaining rows record the moving deformation map, absolute branch period, medium-dressed mass-response tensor, moving-branch residual, observer-export packet, active sector residuals, and row-indexed event ledger. The observer-export packet is not an effective metric or clock law; it is the branch-certified data that later observer-inference chapters must consume.

The branch identity check is

$$
d_{\mathcal{A}}^{(q)}
=
d_{\mathcal{A}}
\left(
\mathcal{A}_{\mathrm{per}}^{(q)},
\mathcal{A}_{\mathrm{env}}^{(q)}
\right)
+
d_{\mathcal{A}}
\left(
\mathcal{A}_{\mathrm{env}}^{(q)},
\mathcal{A}_{\mathrm{sig}}^{(q)}
\right)
+
d_{\mathcal{A}}
\left(
\mathcal{A}_{\mathrm{sig}}^{(q)},
\mathcal{A}_{\mathrm{event}}^{(q)}
\right)
$$

The candidate chart may be promoted to a retained branch class $q$ only if the same ledger supplies a positive source-normal Jacobian floor, positive receiver-normal branch-strength floor or certified interval, inactive-root gap, finite memory depth, positive stability gap, closed event ledger, and the normalized closure residual

$$
\mathcal{U}_{\mathrm{NSH}}^{(q)}(W)
=
\max\left(
\frac{d_{\mathcal{A}}^{(q)}}{\epsilon_{\mathcal{A}}},
\frac{\left\|\mathcal{R}_{\mathrm{mov},q}\right\|_W}{\epsilon_{\mathrm{mov}}},
\frac{\left\|\mathcal{M}_{\mathrm{sea},q}^{ab}-h^{ab}/c_{\text{eff}}^2\right\|_W}{\epsilon_{\mathrm{mass}}},
\frac{R_{\mathrm{div}T}^{(q)}+R_{\mathrm{Pois}}^{(q)}+R_{\mathrm{EFE}}^{(q)}+R_{\mathrm{var}}^{(q)}}{\epsilon_{\mathrm{GR}}},
\sup_{S\in\mathfrak{S}^{(q)}(W)}
\frac{\left\|\mathcal{R}_S^{(q)}\right\|_W}{\epsilon_S},
\frac{\left\|\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}\right\|_W}{\epsilon_{\mathrm{led}}}
\right)
\le1
$$

This is a certificate target, not an additional force law. It prevents a moving-deformation ratio, a mass-response average, a photon row, or an observer-export residual from being promoted unless the same causal-root branch supplies the period, envelope, signal, observer-export, mass, sector, and event-ledger data. If a row fails on $q$, the verdict is a rejected chart or continuation target under its declared hypotheses, not evidence against the broader neutral braid or shell braid class.

## Multi-Scale Layer Locking

The baseline nested shell braid is not a stack of three identical circular binaries. It is a nested causal lock whose shells operate in different speed regimes. Let $s_\ell$ denote the characteristic speed of one member of shell $\ell$ around that shell's center. In the ordinary weak-stress regime, the target ordering is

$$
s_I > c_f,
\qquad
s_M \approx c_f,
\qquad
s_O < c_f
$$

The inner binary is therefore self-hit and history-supported, the middle binary is the $\|\mathbf V\| = c_f$ hinge where root branches are most sensitive, and the outer binary is the sub-field-speed interface that controls shielding and boundary coupling. Their radii, cycle times, and history-window depths may differ by orders of magnitude. A reduced derivation can start with a separated-scale hypothesis such as $R_I \ll R_M \ll R_O$ and $T_I \ll T_M \ll T_O$, but the branch must report the actual hierarchy rather than hiding it in the notation.

This is why ordinary circular or elliptic orbit language is limited. A circular carrier can expose useful geometry and a separable shell ansatz can diagnose missing forces, but a tangential residual in that ansatz does not by itself settle the nested shell braid closure problem. In a coupled lock, inter-shell wakes, self-hit roots, and near-separator branch changes can supply phase corrections that are absent from a single isolated two-body chart.

The same distinction applies to compact nested shell braid carriers. A finite-coordinate no-go for one compact carrier rejects that branch chart and its declared coordinates; it does not falsify the $A_0$ branch program. Raw root-key splits, observation-phase bins, and fitted residual bases remain diagnostic unless they belong to a branch-native coordinate declared before fitting. A checker-cleared coordinate may seed only a rerun candidate; it is not physical branch structure until the same branch identity survives root-ledger transport, residual checks, and stability continuation.

The perturbation status should therefore be sorted before simplification:

| Perturbation class | Dynamics role |
| --- | --- |
| Nonresonant fast terms | Average over the closed nested shell braid cycle and mostly affect convergence or small far-field corrections. |
| Resonant and near-separator terms | Change phase closure, causal-root counts, Jacobians, or Floquet multipliers, so they remain part of the branch definition. |
| Leakage terms | May be small internally while surviving as far-field multipoles or anisotropy, so they control the shielding extraction. |

## Planar Reduced Noether Braid Chart

The **planar reduced Noether braid chart** is the simplest controlled chart for studying the braid symmetry-breaking point. It projects three declared branch rows into a common plane or near-plane and records, for each row $a\in\{1,2,3\}$ before role assignment,

$$
\Pi_{\mathrm{pl}}(B_{3B})
=
\left(
f_a,\phi_a,\rho_a,s_a,\sigma_a^{\mathrm{plane}},\mathcal{B}_a
\right)_{a=1}^{3}
$$

together with the causal-root, receiver-normal branch-strength, wake, angular-momentum, energy-routing, and stability ledgers that would make the projection admissible. Here $f_a$ is a frequency or integer phase-lock row, $\phi_a$ is the phase offset, $\rho_a$ is the effective lever arm, $s_a=\omega_a\rho_a$ is the local speed row, $\sigma_a^{\mathrm{plane}}$ is the planar circulation sign, and $\mathcal{B}_a$ is the oriented plane bivector used for sector classification.

This chart is a reduced proof bridge, not a replacement for the full three-dimensional branch. It connects three active searches:

- the $x:y:z$ frequency-pattern search, including iso-frequency, integer-ratio, and doubling-frequency families;
- the braid symmetry-breaking point, where the planar chart becomes the terminal-alignment slice of the nested shell braid;
- the photon channel, where two planarized polarity-conjugate braid records form the coaxial contra-rotating polarity-conjugate planar pair.

Taxonomically, this remains a chart label. It becomes `PL-NSH-0` evidence only when the local calculation is testing lower-rank nested shell retention on a declared branch record. It becomes `NSH-TERM` evidence only when the local calculation is the terminal hinge or braid symmetry-breaking boundary. In the photon-channel use, it is bridge evidence consumed by photon closure; it does not certify a Noether braid branch by itself.

The first planar discriminator is the reduced residual

$$
\mathcal{R}_{\mathrm{pl}}
=
\max\left(
d_{\mathrm{plane}},
d_{\mathrm{root}},
d_{\Theta},
d_{\mathbf{J}},
d_E,
d_{\mathrm{wake}},
d_{\mathrm{stab}}
\right),
$$

where $d_{\mathrm{plane}}$ measures coplanar sector support from the bivector Gram matrix, $d_{\mathrm{root}}$ measures same-row causal-root identity, $d_{\Theta}$ measures phase-bundle or return-period closure, $d_{\mathbf{J}}$ measures angular-momentum ledger closure, $d_E$ measures energy/action routing, $d_{\mathrm{wake}}$ measures causal-wake pullback and provenance closure, and $d_{\mathrm{stab}}$ measures branch stability over the declared event or positive-width branch domain. A planar frequency pattern is only a candidate until this residual closes on one retained row set.

## All-Layer Translating Branch Response

A translating nested shell braid is not described by one outer radius alone. The hidden state includes all three shell radii, frequencies, characteristic speeds, axes, active causal roots, and wake exchange:
$$
B_q(v)
=
\left(
R_I,R_M,R_O;\,
\omega_I,\omega_M,\omega_O;\,
s_I,s_M,s_O;\,
\mathbf{A}_I,\mathbf{A}_M,\mathbf{A}_O;\,
\mathcal{L}_{\mathrm{root}};\,
\mathcal{L}_{\mathrm{wake}}
\right)_q
$$

The moving-branch extraction starts with a primitive drift band
$$
\mathcal{D}_{\beta_f}=\{\,0\le \|\mathbf V_{\text{trans}}\|/c_f\le\beta_{\max}<1\,\}
$$
All causal roots in the branch ledger are solved with $c_f$ and absolute time $T$. No dressed observer-channel speed is allowed inside this branch calculation.

The strict upper end of this drift band is kinematic. A leading-side partner row must be caught by a causal wake emitted from a source behind the receiver in the co-moving branch chart. If the center drift reaches $\|\mathbf V_{\text{trans}}\|\ge c_f$, that forward partner row has no positive-delay root, and the causal-root ledger starves on the leading side. The resulting speed-limit statement applies to sustained center translation of an internally bound branch; it does not prohibit inner-shell self-hit histories or other internal components from entering super-field-speed regimes relative to the primitive wake speed.

For the same admitted branch $q$, extract semiaxes from the cycle-averaged nested shell braid shape tensor
$$
Q_{ab}^{(q)}(\mathbf V_{\text{trans}})
=
\frac{1}{6}
\left\langle
\sum_{i=1}^{6}r_{i,a}r_{i,b}
\right\rangle_{\mathrm{cyc},q}
$$
The uniform factor reflects the six equivalent primitive architrinos in the retained branch; it is not a primitive mass weighting.
With drift direction $\hat{\mathbf e}_{\parallel}$ and transverse projector $P_{\perp}^{ab}=\delta^{ab}-\hat e_{\parallel}^{a}\hat e_{\parallel}^{b}$, define
$$
R_{\parallel,q}(\mathbf V_{\text{trans}})
=
\sqrt{\hat e_{\parallel}^{a}Q_{ab}^{(q)}\hat e_{\parallel}^{b}},
\qquad
R_{\perp,q}(\mathbf V_{\text{trans}})
=
\sqrt{\frac{1}{2}P_{\perp}^{ab}Q_{ab}^{(q)}}
$$
The physical branch period is extracted from a declared layer or composite phase on that same branch ledger:
$$
T_q(\mathbf V_{\text{trans}})
=
\frac{2\pi}{\langle\dot{\theta}_{q}\rangle_{\mathrm{cyc}}},
\qquad
T_{q,0}=T_q(\mathbf{0})
$$
where the dot means $d/dT$ with respect to absolute substrate time.

## Absolute Cycle-Stretch Theorem Target

Let
$$
N_{\text{hits},q}
=
\left(
N_{\ell\rho}^{(q)}
\right)_{\ell\in\{I,M,O\},\,\rho\in\{\mathrm{self},\mathrm{partner},\mathrm{inter}\}}
\in\mathbb{N}^{m_q}
$$
be the integer ledger of causal roots required to complete one primitive branch rotation. Its total hit count is
$$
|N_{\text{hits},q}|_1
=
\sum_{\ell,\rho}N_{\ell\rho}^{(q)}
$$
Preserving the same branch means preserving this integer ledger, the source identities of the roots, their emission-order classes, the positive Jacobian floor, and the phase-return condition over the whole cycle.
Equivalently, let $\mathcal{H}_q$ be the ordered multiset of retained hit rows represented by $N_{\text{hits},q}$.

For a retained transverse closure row $a$ with rest closure length $\ell_a>0$, a translating receiver must intercept the wake after both the internal closure displacement and the center translation have occurred. In the reduced orthogonal row,
$$
c_f^2\left(\Delta T_a\right)^2
=
\ell_a^2
+
\|\mathbf V_{\text{trans}}\|^2\left(\Delta T_a\right)^2
$$
so
$$
\Delta T_a(\mathbf V_{\text{trans}})
=
\frac{\ell_a}{\sqrt{c_f^2-\|\mathbf V_{\text{trans}}\|^2}}
=
\frac{\Delta T_a(\mathbf{0})}
{\sqrt{1-\|\mathbf V_{\text{trans}}\|^2/c_f^2}}
$$
Thus any retained ledger that requires nonzero transverse closure rows has a larger absolute-time delay per such row when $\mathbf V_{\text{trans}}\ne\mathbf{0}$, unless the internal geometry retunes. A branch-period decomposition has the schematic form
$$
T_q(\mathbf V_{\text{trans}})
=
\sum_{a\in \mathcal{H}_q}
\Delta T_a(\mathbf V_{\text{trans}})
+
\mathcal{R}_{\mathrm{phase},q}
$$
where $\mathcal{R}_{\mathrm{phase},q}$ records finite-memory, inter-layer, and phase-return corrections on the same retained branch chart. The theorem target is:
$$
N_{\text{hits},q}(\mathbf V_{\text{trans}})=N_{\text{hits},q}(\mathbf{0}),
\quad
\nu_J^{(q)}>0,
\quad
\Delta_{\mathbf{k}}^{(q)}>0
\quad\Longrightarrow\quad
T_q(\mathbf V_{\text{trans}})\ge T_{q,0}
$$
with strict inequality for nonzero translation unless a compensating shape retuning changes the relevant $\ell_a$ rows. This is an absolute-time period theorem target, not a statement about observer clock time.

## Mechanical Oblation From Receiver-Normal Wake-Flux Asymmetry

Receiver-normal branch strength is the dynamics-side mechanism behind the wake-flux change that standard field language would otherwise distribute across the effective electromagnetic connection, current/displacement terms, vector-potential curl, and the Noether sea response. For a retained root row $a=(i,j,T_{\mathrm{em}})$,
$$
D_{s,a}
=
c_f-\mathbf V_j(T_{\mathrm{em}})\cdot\hat{\mathbf r}_{ij}(T;T_{\mathrm{em}}),
\qquad
D_{T,a}
=
c_f-\mathbf V_i(T)\cdot\hat{\mathbf r}_{ij}(T;T_{\mathrm{em}}),
\qquad
W_a^{\mathrm{rec}}
=
\left|\frac{D_{T,a}}{D_{s,a}}\right|,
\qquad
w_a
=
\frac{W_a^{\mathrm{rec}}}{r_a^2}.
$$
The branch force contribution is proportional to $w_a\hat{\mathbf r}_a$. Decompose the transceiver velocities into center translation plus internal motion,
$$
\mathbf V_j(T_{\mathrm{em}})
=
\mathbf V_{\text{trans}}
+
\mathbf{u}_j(T_{\mathrm{em}}),
\qquad
\mathbf V_i(T)
=
\mathbf V_{\text{trans}}
+
\mathbf{u}_i(T).
$$
On a retained chart away from grazing, translation enters both $D_{s,a}$ and
$D_{T,a}$. A longitudinal denominator effect is therefore not an oblation proof
unless the same retained row also carries the receiver-normal numerator. The
retained-row target is the receiver-normal anisotropy
$$
\Delta_w
\equiv
\left\langle \frac{W_a^{\mathrm{rec}}}{r_a^2}\right\rangle_{\parallel}
-
\left\langle \frac{W_a^{\mathrm{rec}}}{r_a^2}\right\rangle_{\perp}
\sim
\mathcal{R}_{\mathrm{rec}}
$$
on the same causal-root ledger. Here $\mathcal{R}_{\mathrm{rec}}$ records internal-motion, unequal-radius, finite-memory, unpaired-row, and receiver/source-normal correction terms.

For attractive partner rows, a positive receiver-normal longitudinal anisotropy would increase the cycle-averaged longitudinal restoring stiffness. If $K_{\parallel}^{(q)}$ and $K_{\perp}^{(q)}$ denote the Hessian projections of the retained branch potential reconstructed from the same receiver-normal rows, the oblation target is
$$
K_{\parallel}^{(q)}
>
K_{\perp}^{(q)}
\quad\Longrightarrow\quad
\frac{R_{\parallel,q}}{R_{\perp,q}}
\sim
\sqrt{\frac{K_{\perp}^{(q)}}{K_{\parallel}^{(q)}}}
<1
$$
The physical squash into an oblate $R_{\parallel}<R_{\perp}$ branch is therefore not imported from a relativistic metric. In the canonical Master EOM it must be read as the mechanical response to receiver-normal wake-flux asymmetry created by translating the same causal-root ledger through the Euclidean void; any stiffness estimate that lacks same-record $D_T/D_s$ branch strength is a restart target.

A one-$h_{\mathrm{act}}$ closed-cycle action transaction is a candidate map between stable branch states,
$$
B_q(\mathbf V_{\text{trans}})
\longrightarrow
B_{q'}(\mathbf V_{\text{trans}}+\Delta\mathbf V)
$$
subject to the all-layer action and energy ledgers
$$
\Delta A_{\mathrm{cyc}}\equiv\Delta A_{\text{cycle}}=s_{\mathrm{act}}h_{\mathrm{act}},
\qquad
\Delta I_I+\Delta I_M+\Delta I_O+\Delta I_{\text{wake}}=s_{\mathrm{act}}\hbar_{\mathrm{act}},
\qquad
s_{\mathrm{act}}\in\{-1,+1\}
$$
$$
\sum_{\ell\in\{I,M,O\}}
\int_{B_q\to B_{q'}}\omega_\ell\,dI_\ell
+
\Delta E_{\text{wake}}
=
\Delta E_{\text{coupl}}
$$
Thus acceleration, absorption, or any accepted transaction can change all three $\omega_\ell$, all three $R_\ell$, and all three $s_\ell$. The outer binary is the leading envelope projector because it is the exposed boundary layer. The middle binary remains the separator-sensitive hinge, and the inner binary remains the self-hit/history-supported engine. Dropping the middle or inner layer is therefore a reduced observable model, not a proof of translating-branch closure.

## Cadence-Scale Retuning Closure

The retuning-map problem is the local dynamics version of the one-$h_{\mathrm{act}}$ transaction. On a branch chart $q$, define

$$
\mathbf{y}_q
=
\left(
\ln\nu_I,\ln\nu_M,\ln\nu_O,\,
\ln R_I,\ln R_M,\ln R_O,\,
\ln\lambda,\ln\xi
\right)^{T},
\qquad
\omega_\ell=2\pi\nu_\ell
$$

The layer-speed identities give the first kinematic constraint:

$$
\Delta\ln s_\ell
=
\Delta\ln R_\ell
+
\Delta\ln\nu_\ell,
\qquad
\ell\in\{I,M,O\}
$$

The simple inverse rule $\Delta\ln R_\ell=-\Delta\ln\nu_\ell$ is therefore valid only on a sub-branch where $\Delta\ln s_\ell=0$. The ordinary nested shell braid speed hierarchy instead imposes inequalities and hinge tolerances:

$$
s_I'>c_f,
\qquad
\left|s_M'-c_f\right|\le\epsilon_M c_f,
\qquad
s_O'<c_f
$$

where primed quantities are evaluated after retuning and $\epsilon_M$ is the declared middle-hinge tolerance. A transaction that violates these conditions is not a smooth retuning inside the same regime; it is a branch event at the speed-regime boundary.

The first calculable closure can be written as a constrained compliance problem. Let $\mathcal{C}_q(\mathbf{y},\mathcal{G})=0$ collect the phase-closure, causal-root, separator, inter-layer exchange, and stability constraints. Let $\mathbf{K}^{\mathrm{ret}}_q$ be the positive semidefinite local compliance matrix for retuning costs on the declared branch chart. Then the candidate increment is

$$
\Delta\mathbf{y}_{q,s_{\mathrm{act}}}
=
\underset{\Delta\mathbf{y}}{\operatorname{arg\,min}}\;
\frac{1}{2}
\Delta\mathbf{y}^{T}
\mathbf{K}^{\mathrm{ret}}_q
\Delta\mathbf{y}
$$

subject to

$$
D A_{\mathrm{cyc},q}[\Delta\mathbf{y}]
+
\Delta A_{\mathrm{wake}}
=
s_{\mathrm{act}}h_{\mathrm{act}},
\qquad
D\mathcal{C}_q[\Delta\mathbf{y}]
+
\Delta\mathcal{C}_{\mathcal{G}}
=0
$$

and to the post-retuning speed-regime inequalities above. The matrix $\mathbf{K}^{\mathrm{ret}}_q$ is not a new force law. It is the local second-variation record of how costly it is for the accepted branch to place the action increment into cadence, layer scale, envelope shape, orientation, or wake exchange. In a simulation, it should be estimated from the linearized return map or from finite retuning trials around an admitted branch.

The cadence-scale retuning map is then the projection

$$
\mathcal{R}_{\mathrm{cyc}}^{(q,s_{\mathrm{act}})}
=
\Pi_{\mathrm{ret}}
\left(
\Delta\mathbf{y}_{q,s_{\mathrm{act}}},
\Delta\mathcal{G}_{q,s_{\mathrm{act}}}
\right)
$$

with

$$
\Pi_{\mathrm{ret}}
\left(
\Delta\mathbf{y},
\Delta\mathcal{G}
\right)
=
\left(
\Delta\nu_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi
\right)
$$

This map is falsifiable at the branch level. It fails if no admissible minimizer exists, if the minimizer crosses a separator while being treated as same-branch drift, if the middle hinge leaves its declared tolerance, if the envelope projection and branch-period stretch come from different retained ledgers, or if the wake-ledger residual is large enough to survive hierarchy averaging. These are not bookkeeping nuisances; they are the diagnostics that decide whether the same one-$h_{\mathrm{act}}$ transaction can become the Noether sea cadence current used in cosmology.

The first reduced validation model for this target is [Retuning-Map Toy Model](../../../content/markdown/aaa/validation/simulations/retuning-map-toy-model.md, with runtime script `scripts/nested-shell-braid/retuning-map-toy-model.mjs`. That model solves the linearized constrained compliance problem and reports the induced $J_\nu$ estimate. It is a branch-bookkeeping scaffold, not delayed-dynamics validation.

## Observer-Inference Export Boundary

This dynamics chapter exports branch-certified substrate records, not observer geometry. The reusable export packet is
$$
\mathcal{E}_{q}^{\mathrm{obs}}
=
\left(
N_{\text{hits},q},
T_q,
Q_{ab}^{(q)},
K_{\parallel}^{(q)},
K_{\perp}^{(q)},
\nu_J^{(q)},
\Delta_{\mathbf{k}}^{(q)},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}
\right)
$$
Every entry is computed in absolute time from the retained causal-root chart. Later observer-inference chapters may ask whether this packet recovers clock behavior, ruler behavior, photon synchronization, or effective geometry. Those are downstream recovery tests. They are not definitions, assumptions, or integration variables in nested shell braid dynamics.

## Dynamics-Side Roadmap

The dynamics chapter contributes the stable pieces needed by the larger theorem program:

1. Define the speed hierarchy and the causal-speed guardrails.
2. Model the nested shell braid as inner engine, middle fulcrum, and outer shielding/interface shell.
3. Track how motion deforms the rest-state lock into braided spiral-helical geometry.
4. Derive local cycle-period diagnostics from the absolute cycle-stretch theorem target.
5. Solve all-layer branch updates for one-$h_{\mathrm{act}}$ transactions and extract the branch-indexed period-stretch and envelope-oblation records.
6. Compute the terminal-alignment area-normalized label density $\bar{\alpha}_{\mathrm{align}}=s_{\mathrm{align}}/a_{\theta}$ from alignment-restricted closure labels, patch-area normalization, and edge wake compatibility.
7. Output alignment, closure, Floquet, grazing, branch-residual, and observer-export diagnostics.
8. Keep mass, photon, equivalence-principle, and full observer-geometry matching claims outside the primitive dynamics layer until their proof burdens close.

## Working Hypotheses

1. The formed nested shell braid has stable invariants ($R_{\text{braid}}$, $\omega_{\text{braid}}$, fixed phase offsets).
2. The outer-binary delay loop yields discrete plateaus and a terminal aligned mode under increasing stress.
3. High group velocity may produce an oblate causal envelope that drives planar alignment in the terminal rung; this remains a working hypothesis until the swept-volume and branch-stability tests close.
4. High gravitational gradient modifies phase closure through tidal or differential delay effects, shifting or destabilizing rungs.

---

## Geometry Focus

## A) High Group Velocity Geometry (Nested-Family Oblate Spheroidal Envelope)

**Nested-family assumption (testable):** The outer binary of a moving nested shell braid generates a causal interaction envelope that is oblate and flattens along the direction of motion as $v_{\text{trans}} \to c_f$ on the primitive branch chart. This law is not the spindle family's rest-envelope law: the spindle is fusiform at rest, and its moving-envelope projection remains an explicit open obligation in [Braid Envelope Geometry](../../../content/markdown/aaa/noether-braid/braid-envelope-geometry.md#retuning-projection-to-envelope-variables.

**Geometry:** Let the motion define the $z$-axis. Model the envelope as an oblate spheroidal envelope
$$
\frac{x^2 + y^2}{R_\perp^2} + \frac{z^2}{R_\parallel^2} = 1
$$
with transverse radius $R_\perp$ and longitudinal radius $R_\parallel$.

Use the kinematic contraction law as a theorem target to be derived from branch dynamics:
$$
\beta_f = \frac{v_{\text{trans}}}{c_f},
\qquad
R_\parallel = R_\perp\sqrt{1-\beta_f^2}
$$
As $\beta_f \to 1$, $R_\parallel \to 0$ and the envelope collapses toward a disk.
**Right-triangle link:** Treat $c_f$ as the primitive causal propagation speed and decompose it into orthogonal components: one leg is the group translation $v_{\text{trans}}$, the other leg is the longitudinal closure speed $v_\parallel$. Then
$$
c_f^2 = v_{\text{trans}}^2 + v_\parallel^2 \quad \Rightarrow \quad v_\parallel = c_f\sqrt{1-\beta_f^2}
$$
Mapping causal speed to closure length gives $R_\parallel = R_\perp (v_\parallel/c_f) = R_\perp\sqrt{1-\beta_f^2}$, which is the triangle form of the oblate spheroidal envelope theorem target rather than a completed recovery.

**Impact on delay locking:** The round-trip delay $\Delta T_{\text{rt}}$ is the absolute-time interval between an outer-binary architrino's emission and the moment its wake returns to influence that same architrino, approximating the inner and middle binaries as a compact subsystem at the center. For a ray at polar angle $\theta$ relative to the $z$-axis, the intersection radius with the oblate spheroidal envelope is
$$
R(\theta) = \left(\frac{\sin^2\theta}{R_\perp^2} + \frac{\cos^2\theta}{R_\parallel^2}\right)^{-1/2}
$$
Then $\Delta T_{\text{rt}}(\theta) \approx 2 R(\theta)/c_f$, and the phase condition generalizes to
$$
\Phi_n(\theta, \mathbf V_{\text{trans}}) = \omega_n\,\Delta T_{\text{rt}}(\theta) + \phi_{\text{geom}}(n)
$$
**Conjecture (velocity convergence):** As translational speed increases, delay-closure constraints drive the orbital degree of freedom to adjust (e.g., by shrinking radius and raising $v_{\text{orb}}^{\text{tan}}$) so that both $v_{\text{trans}}$ and $v_{\text{orb}}^{\text{tan}}$ converge toward $c_f$ at the planar transition.

**Exclusion volume (instantaneous):**
$$
V(v_{\text{trans}}) = \frac{4\pi}{3} R_\perp^2 R_\parallel
= \frac{4\pi}{3} R_\perp^3 \sqrt{1-\left(\frac{v_{\text{trans}}}{c_f}\right)^2}
$$
If the outer radius is infalling, treat $R_\perp = R_\perp(T)$ so
$$
V(T) = \frac{4\pi}{3} R_\perp(T)^3 \sqrt{1-\left(\frac{v_{\text{trans}}(T)}{c_f}\right)^2}
$$
This expression belongs to the primitive branch chart; downstream dressed-channel variants must be rebuilt from an explicit observer-inference map.

---

## B) High Gravitational Gradient Geometry

**Coupling caveat:** Whether $v_{\text{trans}}$ is independent of the radial infall speed $v_r$ is unresolved. Use the independent form by default, or adopt a coupling $v_{\text{trans}} = f(R_\perp)$ and substitute to test specific scenarios.

**Assumption (testable):** A strong external gradient (tidal field or effective curvature) perturbs the delay loop, altering phase closure and stability of rungs.

**Origin of the gradient (model definition):** Gravitation is implemented as an emergent Noether sea response gradient, not as fundamental curvature of the Euclidean void. Dense collections of standard-model assemblies perturb Noether sea density, compliance, stress, effective potential, and terminal-alignment state. The effective gravitational field in this delay-geometry model is the observer-level reconstruction of those coupled gradients.

**Geometry inputs:** Represent this gradient as a scalar control parameter $G_{\text{grad}}$ only in reduced scans, for example a magnitude extracted from Noether sea density/compliance/stress gradients, $\partial_r\Phi_{\text{eff}}$, or a tidal tensor. In simulations, treat $G_{\text{grad}}$ as a declared proxy around the outer-binary orbit and record which Noether sea response channel it compresses.

**Expected effects to test:**
- Differential path delays across the outer orbit (forward vs backward sector).
- Drift in precession cone angle and inter-plane tilt under increasing $G_{\text{grad}}$.
- Shifts in the stability sign $\partial \Phi_n/\partial r$ or loss of plateau behavior.
**Prediction:** Increasing $G_{\text{grad}}$ shifts stable $n$ values and narrows or removes plateaus; strong gradients can pull the terminal alignment inward or erase it.

## C) Exclusion Volume Under Precession (Caveat)

**Implication:** Outer-binary precession sweeps an exclusion region that is larger than a static orbit. The effective exclusion volume is the union of the orbit's causal envelope over a precession cycle, not just a single instantaneous envelope.
This union geometry sets packing and overlap limits by construction, rather than relying on point-particle exclusion rules.

**Modeling at $v>0$:** Use the oblate spheroidal envelope as a time-dependent exclusion region whose axis precesses. The exclusion volume becomes anisotropic and typically increases with precession cone angle.

**As $v_{\text{trans}} \to c_f$:** The envelope flattens toward a disk, so the exclusion volume becomes a thin, swept annulus dominated by the equatorial plane. This tends to amplify planar alignment constraints and reduce accessible 3D configurations.
At sufficiently high stress, this suggests the terminal-rung failure mode to test: further increases may fail to support a stable 3D mode and may force a planar aligned state.

**Status:** This precession-expanded exclusion volume is not explicitly modeled in the minimal system; treat results as lower bounds until the swept-volume effect is added.

## D) Local Cycle-Period Diagnostic

**Goal:** Define local cycle-period change as a geometric effect in the delay loop, not as distortion of substrate time or as a relativistic postulate.

**Reference cadence:** Use a declared reference assembly cadence $T_{\mathrm{ref}}$; the terminal-alignment normalization may specialize this to the outer-binary Planck cadence $T_{\mathrm{ref}}=1/f_P$, where $f_P$ is the Planck-frequency normalization used only after the Planck-scale mapping is declared.

The cadence $T_{\mathrm{ref}}$ is a reference assembly cadence, not the absolute substrate time itself. Absolute time $T$ remains the uniform ordering parameter for causal-hit evaluation. The local dynamics diagnostic compares assembly cycle counts to this reference cadence:
$$
C_{\text{cyc}}(\mathbf X)
\equiv
\frac{T_{\mathrm{ref}}}{T_{\text{local}}(\mathbf X)}
$$
in the rest branch of the local Noether sea cell. This quantity is a dynamics-side period ratio, not a time coordinate.

**Sector-delay diagnostic from delay geometry:** Define a reference round-trip delay $\Delta T_{\text{rt,ref}}$ and a local delay $\Delta T_{\text{rt}}(\theta, G_{\text{grad}})$. Then
$$
\alpha(\theta, G_{\text{grad}}) = \frac{\Delta T_{\text{rt}}(\theta, G_{\text{grad}})}{\Delta T_{\text{rt,ref}}}
$$
and, for the oblate-envelope-only case with no gradient,
$$
\alpha(\theta) = \frac{R(\theta)}{R_{\text{ref}}}
$$
measures how one sector's phase-closure period compares to the reference cadence:
$$
T_{\text{local}}(\theta) = T_{\mathrm{ref}} \, \alpha(\theta, G_{\text{grad}})
$$
When $\alpha > 1$, local cycles are longer relative to $T_{\mathrm{ref}}$; when $\alpha < 1$, they are shorter. This sector-delay diagnostic remains an absolute-time branch-period record. It can be exported downstream only after the accepted branch functional $T_q(v,G_{\text{grad}})$ is derived from the full cycle and matched to the retained causal-root ledger.

**Geometric source of period shift:** The causal envelope shape sets $\Delta T_{\text{rt}}$. As the nested shell braid tilts out of planar alignment and loses energy, the envelope becomes less oblate (larger $R_\parallel/R_\perp$), increasing some path lengths and stretching $T_{\text{local}}$; as it flattens, $R_\parallel$ shrinks and the corresponding delays contract. Gradients ($G_{\text{grad}}$) further skew delays across the orbit.

**Primitive translation parameter:** For the branch scan, use
$$
\beta_f=\frac{v_{\text{trans}}}{c_f},
\qquad
R_\parallel = R_\perp \sqrt{1-\beta_f^2}
$$
Geometrically, $\beta_f$ is the primitive axis-squash control: as $\beta_f \to 1$, the causal envelope collapses along the motion axis, shrinking longitudinal path lengths and altering the delay.

**Where it enters phase closure:** In scans, treat the local cycle frequency as $\omega_n/\alpha$ inside $\Phi_n$ for the sector under consideration. Longer causal loops (larger $\alpha$) yield lower cycle frequency at fixed absolute-time reference; any redshift interpretation belongs downstream.

---

## Minimal Models

## Nested Shell Braid Baseline (Inner + Middle Fixed)

**Focus:** Treat the inner and middle binaries as a formed subsystem with fixed (or slowly varying) center of mass. Track convergence of phase relations and extract $R_{\text{braid}}$, $\omega_{\text{braid}}$, and stable phase offsets. Check repeatability across nearby initial conditions and whether any subsystem element rides $\|\mathbf V\| = c_f$ continuously.

## Outer-Binary Delay Loop Model with Formed Subsystem

**Focus:** Characterize the discrete ladder / top-rung behavior in a minimal delay system and quantify geometry at high $v_{\text{trans}}$ and high $G_{\text{grad}}$.

**Model ingredients:**
- Inner and middle binaries modeled as a rigid subsystem with fixed timescales.
- Outer binary orbits that subsystem with non-coplanar planes initially.
- Translational speed $\mathbf V_{\text{trans}}$ and gradient $G_{\text{grad}}$ are control parameters.
- Use oblate-envelope-based $\Delta T_{\text{rt}}(\theta)$ for high-velocity geometry.

**Phase condition:**
$$
\Phi_n(\theta, \mathbf V_{\text{trans}}, G_{\text{grad}}) = \omega_n\,\Delta T_{\text{rt}}(\theta) + \phi_{\text{geom}}(n)
$$
and track when $\partial \Phi_n/\partial r$ changes sign.
Quantization here is emergent: only delay-locked, stable closures persist as discrete rungs, not imposed eigenmodes.

## Alignment Invariants and Configuration Diagnostics

**Diagnostics (operational):**
- **Inter-plane angles:** $\theta_{ij} = \arccos(\hat{n}_i \cdot \hat{n}_j)$ for $(i,j)\in\{\text{inner, mid, outer}\}$. Track $\max(\theta_{ij})$ over an outer period.
- **Planarity threshold:** Declare “planar aligned” if $\max(\theta_{ij}) < \epsilon_\theta$ for $N$ consecutive outer periods.
- **Precession cone angle:** Let $\hat{n}_{\text{net}}$ be the normalized sum of plane normals. Define $\theta_{\text{cone}} = \max_t \arccos(\hat{n}_{\text{net}}(T)\cdot\langle\hat{n}_{\text{net}}\rangle)$ over one outer period.
- **Rotation test ($SU(2)$ vs $U(1)$):** Evolve the same state under an imposed $2\pi$ spatial rotation and compare the causal configuration $\mathcal{C}(T)$ to the unrotated one (e.g., phase-closure residuals and relative plane phases). If $\mathcal{C}(T)$ matches only after $4\pi$, treat as $SU(2)$-like; if after $2\pi$, treat as $U(1)$-like.
- **Diagnostic hypothesis:** As alignment strengthens, $\theta_{ij}$ and $\theta_{\text{cone}}$ should decrease monotonically; the rotation test should be checked for a possible transition from $4\pi$ to $2\pi$ return.
As alignment increases and planes coincide, the remaining degree of freedom may reduce to a single in-plane phase ($U(1)$-like), consistent with a boson-like terminal configuration only after the rotation test passes.

## Floquet and Grazing Diagnostics

Two nonlinear-dynamics diagnostics extend the standard alignment invariants and connect this chapter to the broader causal-closure program.

**Floquet basin-robustness gap:** For a periodic nested shell braid state $\mathcal{S}_{\mathbf{k}}$ with integer winding $\mathbf{k}$ and period $T_{\mathbf{k}}$, linearize the delay system around the periodic orbit and compute the leading Floquet multipliers $\{\mu_i\}$ off the symmetry directions. Define
$$
\Delta_{\mathbf{k}} = 1 - \max_{i\notin G}\|\mu_i(\mathbf{k})\|
$$
Track $\Delta_{\mathbf{k}}$ along scans in declared $\beta_f = v_{\text{trans}}/c_f$ and $G_{\text{grad}}$. Stable rungs have $\Delta_{\mathbf{k}}>0$; rung termination, separator cycle-period divergence, and gradient-driven failure should all coincide with $\Delta_{\mathbf{k}}\to 0^+$.

**Grazing-bifurcation diagnostics at the separator:** Near $\|\mathbf V\|=c_f$, the post-crossing trajectory deviation is predicted to scale as $\sqrt{T-T_*}$ along the eigenvector of the newly activated self-hit root when the crossing parameter satisfies $s(T)-1\sim (ds/dT)(T_*)(T-T_*)$ with $(ds/dT)(T_*)\ne0$. Two simulation tests follow:

- log-log fit of phase-deviation versus time-since-crossing, expected to yield slope $1/2$;
- parameter sweep across the separator looking for a period-adding cascade in the integer ledger, with each adding event respecting $\Delta N\in 2\mathbb{Z}$.

These diagnostics belong here as observational quantities for the dynamics chapter. Their proof burdens include Floquet-spectrum discreteness for state-dependent self-hit path-history delays and grazing-normal-form derivation.

---

## Observer-Export Diagnostics

Each dynamics scan should output the substrate records needed by later reconstruction chapters without forming an effective line element in this file. The scan-level packet is
$$
\mathcal{D}_{\mathrm{NSH}}(W)
=
\left(
N_{\text{hits},q},
T_q,
Q_{ab}^{(q)},
K_{\parallel}^{(q)},
K_{\perp}^{(q)},
\nu_J^{(q)},
\Delta_{\mathbf{k}}^{(q)},
G_{\text{grad}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}
\right)_W
$$
The spacetime and observer-inference chapters may convert this packet into lapse, ruler, signal, connection, and weak-field comparison variables. This chapter's obligation is narrower: certify that the packet comes from one retained causal-root branch chart in absolute time.

## Observables and Diagnostics (Summary)

- Compatibility scale invariants: $R_{\text{braid}}$, $\omega_{\text{braid}}$, phase offsets.
- Ladder records: $R_{\text{out}}(T)$, $\omega_{\text{out}}(T)$, plateau stability.
- Geometry records: anisotropy ratio $A = R_\parallel/R_\perp$, forward vs backward delay ratio.
- Orientation records: inter-plane angles, precession cone angle.
- Stability records: sign of $\partial \Phi_n/\partial r$, phase-closure residuals.
- Gradient record: $G_{\text{grad}}$ and its effect on stability thresholds.
- Observer-export records: $N_{\text{hits},q}$, $T_q$, $Q_{ab}^{(q)}$, $K_{\parallel}^{(q)}$, $K_{\perp}^{(q)}$, $\nu_J^{(q)}$, $\Delta_{\mathbf{k}}^{(q)}$, and $\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}$.

---

## Revision Triggers (Failure Modes)

1. **Subsystem stability:** Unstable or non-repeatable invariants undermine outer-binary claims.
2. **Discrete rungs:** If plateaus do not exist or terminate, the top-rung thesis must be revised.
3. **High-velocity geometry:** If oblate geometry does not improve phase closure, the envelope model fails.
4. **High-gradient behavior:** If strong gradients erase alignment, record the boundary conditions and revise the alignment narrative.

---

## Routed Extensions

The following items are retained here only as dynamics-facing boundary conditions. Their full proof burdens belong to the broader causal-closure program, not to this chapter.

## Nested Shell Braid Role Hypotheses

An electrino:positrino binary is the most primitive assembly considered in the architecture. The $\mathbb{A}\mathbb{A}\mathbb{A}$ architecture posits that three binaries can become coupled into a nested shell braid, with each binary playing a distinct dynamical role.

Nested shell braid minimality is a theorem target: the working claim is that three coupled shell binaries are the minimal stable closure architecture capable of preserving inner memory, commensurability buffering, and boundary coupling under combined kinematic and gradient stress.

- **Inner binary** (MCB, partner/exterior comparison role): typically in/near self-hit branch ($v \gtrsim c_f$ by history), and would define fundamental units if MCB attractor is confirmed.
- **Middle binary** (partner/exterior comparison role): near the symmetry hinge ($v \approx c_f$), with shell scale and cadence retuning; energy-storage fulcrum and coupling bridge.
- **Outer binary** (partner/exterior comparison role): typically $v < c_f$ with expansion/contraction modes; couples strongly to Noether sea gravitational/cosmological response.
At the terminal-alignment interface, the three binaries are treated as a different regime where forward-sector components approach $c_f$ together; in self-hit interior comparison hypotheses, wake-closure can be described with combined $v_{\text{eff}} > c_f$ without requiring every component speed to exceed $c_f$.

The stronger claim that this architecture supplies the basis for rest mass, observer clock behavior, photon behavior, and standard-model particle families remains a theorem burden for the broader causal-closure program.

## Black-Hole Regime Note

The detailed black-hole treatment now lives in [../spacetime/black-holes.md](../../../content/markdown/aaa/spacetime/black-holes.md. For the purposes of this dynamics chapter, only the regime summary is needed:

- at the horizon interface, forward-sector components approach terminal alignment near $c_f$;
- in the interior, maximum-curvature and recycling dynamics dominate;
- outward release may later appear as jets, diffuse outflow, or dark-sector radiation channels.

This chapter therefore keeps only the nested shell braid regime map and leaves the ontology, recycling logic, and observer-facing strong-field interpretation to the canonical spacetime chapters.

In the nested shell braid picture, each nested shell braid is a nested stack of three coupled binaries whose internal frequencies and radii are locked by self-hit geometry. This chapter uses that mechanism to define the local dynamics and diagnostics. The coarse-grained metric, observer-clock, and strong-field ontology belong to the spacetime chapters and the causal-closure proof synthesis.

For the strong-field continuation of that story, see [Black Holes](../../../content/markdown/aaa/spacetime/black-holes.md and [Horizon Chirality](../../../content/markdown/aaa/spacetime/horizon-chirality.md.
