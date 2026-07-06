# Nested Shell Braid Dynamics

This chapter asks how a nested shell braid could stay together as a moving delayed system. It extends the two-body causal-wake problem into a three-band assembly, where inner, middle, and outer support bands must keep compatible branch records instead of behaving like three independent orbits.

The focus is branch geometry, high-speed response, gradient response, alignment behavior, and diagnostic quantities needed to assess stability in absolute substrate time. Primitive architrino ontology supplies the transceivers, polarities, causal wakes, and causal-root law; this chapter studies the coupled stability mechanisms that may let those ingredients form a retained nested shell braid branch.

It should be read together with [Binary Dynamics](../dynamics/binary-dynamics.md), [Noether Braid Doubling-Frequency Resonance Lock](noether-braid-doubling-frequency-resonance-lock.md), [Mapping the Planck Scale](../philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md), [Nested Shell Braid](nested-shell-braid.md), and [Nested Shell Braid Geometry](nested-shell-braid-geometry.md), since those notes supply the binary precursor, lock structure, alignment target, assembly carrier, and exclusion-envelope geometry.

The central question is practical: can one six-architrino branch keep its inner, middle, and outer support records coordinated while moving through the Noether sea? If the answer is yes, the same retained branch becomes a candidate source for mass response, photon-channel behavior, Lorentz export, and strong-field alignment. If the answer is no, those downstream rows cannot be rescued by assigning them separately.

This chapter therefore treats stability as same-record closure. The branch must carry the period, active-root ledger, deformation map, medium response, observer-export packet, and event ledger together. A visually plausible frequency pattern or a useful envelope shape is not enough unless it belongs to the same retained delayed record.

## Document Role

This chapter is the nested shell braid mechanism and certificate-target chapter. It owns the coupled shell dynamics, speed-regime conventions, field-speed hinge response, causal-root ledgers, gradient response, stability/alignment diagnostics, and same-record certificate target for promoting a nested shell chart.

It does not prove that every Noether braid is a nested shell braid, select the general taxonomy, or turn downstream mass, photon, Lorentz, GR, or topological rows into independent branch IDs. Those rows are certification consumers unless the same retained nested shell braid record supplies them.

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

Here $\mathcal{A}_q$ is the active causal-root ledger, $\nu_J^{(q)}$ the active Jacobian floor, $g_{\mathrm{inactive}}^{(q)}$ the inactive-root gap, $h_{\mathrm{mem}}^{(q)}$ the finite memory depth, and $\Delta_{\mathbf{k}}^{(q)}$ the Floquet or branch-stability gap. The remaining rows record the moving deformation map, absolute branch period, medium-dressed mass-response tensor, moving-branch residual, observer-export packet, active sector residuals, and row-indexed event ledger. The observer-export packet is not an effective metric or clock law; it is the branch-certified data that later observer-inference chapters must consume.

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

The candidate chart may be promoted to a retained branch class $q$ only if the same ledger supplies a positive Jacobian floor, inactive-root gap, finite memory depth, positive stability gap, closed event ledger, and the normalized closure residual

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

## Substrate and Effective Levels

Nested shell braid dynamics uses four levels of description:

| Level | Meaning |
| --- | --- |
| Substrate ontology | Euclidean void, absolute substrate time $T$, architrinos, causal wakes, and causal-root branch structure. |
| Assembly dynamics | Nested shell braids, three coupled shell binaries, self-hit multiplicity, shielding, phase closure, and root-ledger transitions. |
| Observer-inference exports | Rest mass, photon propagation, reconstructed kinematics, geodesics, and horizon behavior as later reconstructed by assembly-built observers. |
| Inference and closure status | Mathematical closures that remain to be derived before effective claims can be treated as proved rather than reconstructed. |

The distinction matters because the Euclidean void is not being curved at the substrate level. Curvature, geodesic motion, lapse, and horizon language enter only as observer-level bookkeeping reconstructed downstream from Noether sea state variables and assembly response.

## Speed Hierarchy

Several speed symbols must remain separated:

| Symbol or phrase | Meaning |
| --- | --- |
| $c_f$ | Primitive wake propagation speed in the substrate. |
| $c_{\text{eff}}(\mathbf X,T)$ | Noether sea dressed assembly-channel propagation speed used only after a downstream observer-channel map has been declared. |
| $c_\gamma(\mathbf X,T)$ | Local photon-channel speed; equality with $c_{\text{eff}}(\mathbf X,T)$ is a photon-channel closure target for the working observer-level photon branch, not a definition. |
| Locally measured light speed | The operational speed reconstructed downstream from assembly periods, rulers, and photon synchronization. |

The primitive speed $c_f$ is used for wake-intersection and self-hit geometry. The effective speed $c_{\text{eff}}$ belongs to Noether sea dressed closure and observer-level comparisons. These are not interchangeable. Any diagnostic that moves from primitive wake geometry to observer-level periods, rulers, or photons must declare its dressing map outside the primitive branch calculation.

### Transverse Causal Budget Lemma

When a retained moving branch is exported to a clock, ruler, or photon-synchronization channel, the branch must declare the channel speed used by that export. The primitive branch chart solves causal roots with $c_f$. A dressed clock/ruler comparison uses $c_\star=c_{\text{eff}}(\mathbf X,T)$ after the Noether sea dressing map has been declared, while a photon synchronization comparison uses its declared photon-channel speed $c_\gamma(\mathbf X,T)$. The weak homogeneous measured limit may identify the declared channel speed with $c_0$ only after the clock, ruler, and photon rows collapse to one observer-accessible speed within the preferred-frame leakage budget.

For a branch whose response center drifts through the local Noether sea with material drift $\mathbf w$, the transverse budget is
$$
c_\star^2
=
\|\mathbf w\|^2+c_{\perp}^2,
\qquad
\beta_\star=\frac{\|\mathbf w\|}{c_\star},
\qquad
\gamma_\star=\frac{1}{\sqrt{1-\beta_\star^2}}
$$
Thus an observer-export clock or ruler row must extract
$$
\frac{c_{\perp}}{c_\star}
=
\frac{1}{\gamma_\star}
$$
from the same retained branch record, not append it as an independent Lorentz factor. The lemma fails as a citation target if a calculation solves primitive roots with $c_f$ and then reports an observer-level clock, ruler, or photon speed without the declared dressing map, or if the clock, ruler, and photon rows are sourced from different branch ledgers.

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

## Braid Symmetry-Breaking Point

The **braid symmetry-breaking point** is the braid-level version of the single-binary field-speed threshold. A single binary crosses the symmetry-breaking point when its branch reaches the $c_f$ hinge and same-source roots can turn on. A whole nested shell braid reaches its braid symmetry-breaking point only when the outer coupling layer is also driven into terminal alignment with the middle hinge while the inner binary remains in the self-hit interior row.

The working condition is

$$
s_I>c_f,
\qquad
s_M=c_f,
\qquad
s_O\to c_f,
\qquad
d_{\mathrm{align}}(q)\to0,
$$

with $d_{\mathrm{align}}$ measuring coplanarity, co-linearity, and precession cessation in the declared branch coordinates. This is not the statement that all three binaries become identical. Since

$$
s_\ell=\omega_\ell\rho_\ell,
$$

the middle and outer binaries can share the same threshold speed while retaining different frequencies, effective lever arms, energies, or action shares. Equality of speed is a causal-regime statement. Equality of radius, frequency, energy, or action would be additional branch structure that must be derived from the retained energy/action ledger.

At the braid symmetry-breaking point, the outer binary stops functioning as an ordinary sub-field-speed shielding envelope and becomes part of the interface row. The middle binary remains the hinge. The inner binary does not need to "reach" the hinge because it is already beyond it: it supplies the self-hit, maximal-curvature, history-supported row. This is why the threshold is the natural local precursor to horizon-interface language rather than a mere three-frequency coincidence.

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
- the photon channel, where two planarized pro/anti braid records form the coaxial contra-rotating pro/anti planar pair.

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

## Local Black-Hole Duality Target

The nested shell braid should also be read as carrying the local black-hole dual inside its branch structure. This is not the claim that every Noether braid is an astrophysical black hole, and it does not import conventional primordial-black-hole population models. The claim is narrower: the nested shell braid already contains the same regime split that a macroscopic black hole exposes at large scale.

| Nested shell braid row | Local branch condition | Black-hole dual row |
| :--- | :--- | :--- |
| Inner binary | $s_I>c_f$ with accepted same-source roots | interior self-hit and maximal-curvature row |
| Middle binary | $s_M=c_f$ in the accepted threshold limit | horizon-interface and symmetry-breaking row |
| Outer binary | $s_O<c_f$ in ordinary operation, with $s_O\to c_f$ under terminal strong-field alignment | exterior coupling row driven toward the interface during collapse |

In this precise sense, a nested shell braid contains a primordial black-hole analogue: a finite local version of the horizon/interior split before that split is amplified into an observer-level compact object. The middle binary supplies the threshold interface, while the inner self-hit binary supplies the beyond-threshold interior row. The phrase "primordial black-hole analogue" is therefore a statement about nested shell braid ontology, not a claim that the standard primordial-black-hole model supplies the source mechanism.

The exact-duality theorem target is to construct a map from one retained branch record to one strong-field horizon record,

$$
\mathcal{D}_{\mathrm{BH}}:
B_q
\longmapsto
\left(
\mathcal{B}_{H}^{(q)},
\mathcal{L}_{\mathrm{int}}^{(q)},
\mathcal{L}_{\mathrm{rel}}^{(q)}
\right),
$$

where $\mathcal{B}_{H}^{(q)}$ is the horizon-interface label set inherited from the branch, $\mathcal{L}_{\mathrm{int}}^{(q)}$ is the retained self-hit interior ledger, and $\mathcal{L}_{\mathrm{rel}}^{(q)}$ is the release or exterior-coupling ledger. A useful residual has to vanish on the same root ledger:

$$
\mathcal{R}_{q\leftrightarrow H}
=
\max\left(
\left|1-\frac{s_M}{c_f}\right|,
\max\left(0,1-\frac{s_I}{c_f}\right),
d_{\mathrm{align}}(q),
d_{\mathrm{led}}\left(\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)},0\right),
d_{\mathrm{rel}}\left(\mathcal{L}_{\mathrm{rel}}^{(q)},\mathcal{B}_{H}^{(q)}\right)
\right).
$$

Here $d_{\mathrm{align}}$ measures coplanarity, co-linearity, and precession cessation in the declared branch coordinates; $d_{\mathrm{led}}$ measures energy, momentum, and angular-momentum ledger closure; and $d_{\mathrm{rel}}$ measures whether the release or exterior-coupling rows are inherited from the same horizon-interface label set rather than added as a second story. The duality claim is retained only if this residual closes with the branch dynamics. Otherwise the black-hole comparison remains a suggestive regime analogy, not an exact result.

## Mass Thesis as a Dynamics Target

The conservative mass thesis is that rest mass is not primitive architrino substance. It is the externally measurable response of shielded, phase-locked internal causal history.

In roadmap form, the target relation is

$$
m_0(A)c_{\text{eff}}^2
\sim
\zeta(A)E_{\text{internal}}(A)
$$

where $E_{\text{internal}}(A)$ is the closed internal causal-history energy ledger of assembly $A$, and $\zeta(A)$ is the shielding or leakage factor that controls how much of that ledger couples to external probes. This is not yet a derived mass formula. It becomes a theorem only after the shielding factor, the internal energy ledger, and the first-order momentum-skew response are derived from the closed nested shell braid dynamics.

## Spiral-Helical Motion Picture

A resting nested shell braid is modeled as a nested, phase-locked structure with three coupled binary planes. When the braid moves with center-of-mass velocity $\mathbf{V}_{\text{cm}}$, the rest-state circular or near-circular binary motions are drawn into braided spiral-helical cable patterns through the Euclidean void.

The spiral-helical picture is not decorative. A causal wake sent between partners, or between the inner, middle, and outer layers, must now reach a receiver that has moved during the wake's travel time. The internal phase geometry must therefore retune its pitch, radius, tilt, and timing to preserve the same closure ledger. In dynamics language, bulk velocity is encoded as internal geometry.

This is the common mechanical basis for three later downstream readouts:

- branch-period stretch, because each completed internal cycle requires a different causal path in absolute time;
- longitudinal ruler contraction, because inter-assembly spacing must retune for forward and backward exchange;
- inertial response, because acceleration forces the internal causal ledger to re-close under a changing kinematic bias.

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

### Absolute Cycle-Stretch Theorem Target

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

### Mechanical Oblation From Receiver-Normal Wake-Flux Asymmetry

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

The first reduced validation model for this target is [Retuning-Map Toy Model](../validation/simulations/retuning-map-toy-model.md), with runtime script `scripts/nested-shell-braid/retuning-map-toy-model.mjs`. That model solves the linearized constrained compliance problem and reports the induced $J_\nu$ estimate. It is a branch-bookkeeping scaffold, not delayed-dynamics validation.

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

## Terminal Alignment Label-Count Target

The intuition is that a horizon-adjacent region should not be counted by arbitrary visual tiles. It should be counted by the retained branch labels that can actually sit next to one another without breaking layer closure, wake exchange, chirality, or the observer record. The formal set and transfer matrix below are a way to count only compatible branch records.

The black-hole entropy route requires a dynamics-side label calculation. Once a nested shell braid branch is driven to terminal alignment, the dynamics should output the admissible alignment-restricted closure labels and their neighbor-compatibility rules. For a connected block $U$ of horizon-adjacent alignment patches, the object is

$$
\mathcal{L}_U(\theta)
=
\left\{
\left(\Lambda_{\text{NS},a}^{\mathrm{align}}\right)_{a\in U}
:
\text{all layer ledgers close, edge wake ledgers match, and } \theta \text{ is preserved}
\right\}
/
\sim_{O,\theta,W}
$$

The first calculation route is a transfer-compatibility problem. Fix a local strip direction $\nu$ on the horizon-adjacent interface. Let $\Lambda_{\theta}^{\mathrm{loc}}$ be the set of one-patch labels $\lambda$ obtained from $\Lambda_{\text{NS}}^{\mathrm{align}}$ after imposing one-patch layer closure, terminal-alignment conditions, and the Physical Observer quotient for the declared record $\theta$. Each $\lambda\in\Lambda_{\theta}^{\mathrm{loc}}$ carries two edge projections $\mathcal{E}_{\nu}^{-}(\lambda)$ and $\mathcal{E}_{\nu}^{+}(\lambda)$: the active causal-root, winding, emission-order, Jacobian-branch, and wake-exchange data presented to the two neighboring patches in the $\nu$ direction.

Define the pair-compatibility predicate $\mathcal{C}_{\theta,\nu}(\lambda,\lambda')$ to hold exactly when:

- $\mathcal{E}_{\nu}^{+}(\lambda)=\mathcal{E}_{\nu}^{-}(\lambda')$ up to the declared observer tolerance,
- the edge balance satisfies $(\Delta E,\Delta\mathbf{p},\Delta\mathbf{J},\Delta q)_{\lambda,\lambda'}=(0,\mathbf{0},\mathbf{0},0)$,
- the chirality entry $\chi_c$ and axial-frame orientation remain compatible under the coplanar/co-linear terminal-alignment condition,
- and the combined pair projects to the same observer record, $\mathcal{R}_{O,W}(\lambda,\lambda')=\mathcal{R}_{O,W}^{\theta}$.

The first counting matrix is therefore
$$
\left(\mathsf{T}_{\theta,\nu}\right)_{\lambda\lambda'}
=
\begin{cases}
1, & \mathcal{C}_{\theta,\nu}(\lambda,\lambda'),\\
0, & \text{otherwise},
\end{cases}
\qquad
\lambda,\lambda'\in\Lambda_{\theta}^{\mathrm{loc}}
$$
This is a counting matrix, not a thermodynamic weight. For an open strip of $N$ patches,
$$
\left|\mathcal{L}_{[1,N]}(\theta)\right|
=
\mathbf{1}^{T}
\mathsf{T}_{\theta,\nu}^{N-1}
\mathbf{1}
+
\mathcal{O}(\epsilon_{\mathrm{edge}})
$$
while a periodic strip uses $\mathrm{Tr}(\mathsf{T}_{\theta,\nu}^{N})$. If the label set is finite and the transfer rule is local, the strip entropy density is
$$
s_{\mathrm{align}}(\theta;\nu)
=
\lim_{N\to\infty}
\frac{1}{N}
\log\left|\mathcal{L}_{[1,N]}(\theta)\right|
=
\log\rho(\mathsf{T}_{\theta,\nu})
$$
where $\rho$ is the spectral radius. In a two-dimensional patch network the same target becomes the subadditive pressure
$$
s_{\mathrm{align}}(\theta)
=
\lim_{|U|\to\infty}
\frac{1}{|U|}
\log\left|\mathcal{L}_U(\theta)\right|
$$
with the limit taken over blocks whose boundary-to-area ratio vanishes.

One algebraic obstruction fixes the status of the raw label-density target. A single finite unweighted or algebraic-weighted transfer matrix cannot by itself yield an exact raw coefficient $s_{\mathrm{align}}=1/4$: the spectral radius $\rho(\mathsf{T}_{\theta,\nu})$ is algebraic, while $\log\rho=1/4$ would require $\rho=e^{1/4}$, which is transcendental by Lindemann-Weierstrass. The black-hole coefficient is therefore the area-normalized density, not the raw label density by itself. If $A_{\theta}(U)$ is the effective observer-level area represented by a block and $A_{\text{align}}$ is the alignment-area scale from the Planck-alignment map, define
$$
a_{\theta}
=
\lim_{|U|\to\infty}
\frac{A_{\theta}(U)}
{|U|A_{\text{align}}},
\qquad
\bar{\alpha}_{\mathrm{align}}(\theta)
=
A_{\text{align}}
\lim_{|U|\to\infty}
\frac{\log|\mathcal{L}_U(\theta)|}{A_{\theta}(U)}
=
\frac{s_{\mathrm{align}}(\theta)}{a_{\theta}}
$$
The horizon target is
$$
\bar{\alpha}_{\mathrm{align}}(\theta)
\longrightarrow
\frac{1}{4}
$$
The special raw statement $s_{\mathrm{align}}\to1/4$ is valid only when the terminal branch also derives $a_{\theta}\to1$. Exact recovery can therefore come from an asymptotic transfer system, a weighted pressure, a block-density limit with derived area normalization, or an explicitly approximate tolerance target rather than one fixed counting matrix. A finite computation should report a convergence criterion of the form
$$
\left|
\frac{s_N(\theta)}{a_N(\theta)}
-
\frac{1}{4}
\right|
\le
C\frac{|\partial U_N|}{|U_N|}
+
\epsilon_{\mathrm{branch}}
+
\epsilon_{\mathrm{quot}}
$$
where $a_N(\theta)=A_{\theta}(U_N)/(|U_N|A_{\text{align}})$. This tests the area coefficient as a controlled limit rather than hiding it inside one finite count.

**Finite-block coefficient enumerator.** A reduced enumerator can now report the coefficient target without pretending to solve the full terminal dynamics. For a finite connected block $U_N$ of candidate labels, compute
$$
s_N(\theta)
=
\frac{1}{|U_N|}
\log|\mathcal{L}_{U_N}(\theta)|,
\qquad
a_N(\theta)
=
\frac{A_{\theta}(U_N)}
{|U_N|A_{\text{align}}},
\qquad
\bar{\alpha}_N(\theta)
=
\frac{s_N(\theta)}{a_N(\theta)}
$$
The finite-block residual vector is
$$
\mathcal{R}_{\mathrm{coeff}}(U_N,\theta)
=
\left(
\left|\bar{\alpha}_N(\theta)-\frac{1}{4}\right|,
\frac{|\partial U_N|}{|U_N|},
\epsilon_{\mathrm{branch}},
\epsilon_{\mathrm{area}},
\epsilon_{\mathrm{quot}},
\epsilon_{\mathrm{cons}},
\epsilon_{\mathrm{var}}
\right)
$$
Here $\epsilon_{\mathrm{area}}$ records how much the patch-area assignment varies across the retained block, $\epsilon_{\mathrm{cons}}$ is the conservation-ledger residual, and $\epsilon_{\mathrm{var}}$ is the action-variation residual inherited from the terminal branch scaffold below. This object is the right simulation output: it can pass, fail, or converge under refinement without turning the coefficient into a definition.

**Reduced-adapter status.** The reduced circular packet family does not converge to the target coefficient. In the tested $3\le n\le5$ packets, the edge proxy gives
$$
\bar{\alpha}_8=0.22397,
\qquad
\bar{\alpha}_{16}=0.11198,
\qquad
\bar{\alpha}_{32}=0.05599
$$
while the widened $3\le n\le6$ packet gives
$$
\bar{\alpha}_{16}=0.14391,
\qquad
\bar{\alpha}_{32}=0.07196
$$
These values scale like a finite-label open-strip count divided by block length, with asymptotic proxy coefficient $0$, rather than trending toward $1/4$. Coarse and strict quotients coincide on these packets. The action-complete transfer has no accepted transfer edges, so its coefficient is undefined rather than near the target. This is a failure of the reduced adapter as a horizon-coefficient proof, not a failure of the coefficient target itself.

The next diagnostic transfer relation has now been made explicit. For each sampled terminal branch, pair the receiver impulse with the equal-and-opposite source recoil at the emission event and define
$$
\Delta\Pi_b^{\mathrm{pair}}
=
\Delta\Pi_{b,\mathrm{recv}}
+
\Delta\Pi_{b,\mathrm{src}},
\qquad
\Delta\Pi=(\Delta E,\Delta\mathbf{p},\Delta J,\Delta q)
$$
Also record the per-branch stationarity residual
$$
\epsilon_{\mathrm{stat}}(\lambda)
=
\max_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\left\|
\left.
\partial_{T_{\mathrm{em}}}
\left[
\frac{\hat{\mathbf r}_b(T_b,T_{\mathrm{em}})}
{r_b(T_b,T_{\mathrm{em}})J_b(T_b,T_{\mathrm{em}})}
\right]
\right|_{T_{\mathrm{em}}=T_b-\Delta_b}
\right\|
$$
The executable also records the branch-summed receiver residual after the direct inverse-square term is removed:
$$
\epsilon_{\mathrm{sum}}(\lambda)
=
\max_{\alpha}
\left\|
\sum_{b\to\alpha}
\frac{\operatorname{sign}(q_{j_b}q_{i_b})}{|J_b|}
\left.
\partial_{T_{\mathrm{em}}}
\left[
\frac{\hat{\mathbf r}_b(T_b,T_{\mathrm{em}})}
{r_b(T_b,T_{\mathrm{em}})J_b(T_b,T_{\mathrm{em}})}
\right]
\right|_{T_{\mathrm{em}}=T_b-\Delta_b}
\right\|
$$
where $\alpha$ ranges over sampled receiver phase keys. The dynamics-backed transfer predicate is therefore the earlier edge-match condition plus closure of the paired source-recoil ledger, the cycle residual, and $\epsilon_{\mathrm{sum}}$; $\epsilon_{\mathrm{stat}}$ remains an obstruction diagnostic. The current terminal-alignment enumerator packets report zero accepted `terminal_dynamic` transfer edges for the reduced concentric circular family across the tested $3\le n\le5$ and $3\le n\le6$ windows. The edge-only coefficient remains a proxy output, while the terminal-dynamic coefficient is undefined because no transfer edges pass the paired recoil, cycle-support, and branch-summed action-variation tests. Thus the obstruction is not merely the observer quotient or area normalization. The reduced concentric terminal ansatz fails the action-variation and cycle-support tests before it can become a horizon-interface transfer system. The run-level numerics belong in the strong-field terminal-alignment validation packet, not in this mechanism chapter.

The first bounded branch-family variation gives the same conclusion. The executable phase-offset family keeps the centers concentric but changes the layer phases by
$$
\phi_I=-2\pi f,
\qquad
\phi_M=2\pi f,
\qquad
\phi_O=0
$$
with tested offsets $f=1/8$ and $f=1/4$. These packets increase the delayed inter-layer root inventory but still produce zero terminal-dynamic transfer edges under both coarse and strict quotients. The edge-only coefficient remains a proxy result and the stationarity and branch-summed residuals remain large in the validation packet. A bounded phase offset therefore does not rescue the reduced circular terminal ansatz.

The first shifted-center branch family is negative as well. The executable `shifted-center` family keeps the circular speeds and layer phases fixed, but places the three circular centers at
$$
\mathbf{c}_I=(-\epsilon_c R_O,0),
\qquad
\mathbf{c}_M=\left(\frac{\epsilon_c R_O}{2},\frac{\sqrt{3}\epsilon_c R_O}{2}\right),
\qquad
\mathbf{c}_O=\left(\frac{\epsilon_c R_O}{2},-\frac{\sqrt{3}\epsilon_c R_O}{2}\right)
$$
where $R_O=1/\omega_O$ is the outer alignment radius and $\epsilon_c$ is the tested center-shift fraction. The tested shifted-center packets again produce zero terminal-dynamic transfer edges; larger center shifts are empty even at the edge-proxy level, while the smallest tested shift supplies only a widened edge-proxy edge with no terminal-dynamic transfer. The validation packet records large stationarity and branch-summed residuals throughout. Thus small shifted centers make the reduced chart more brittle rather than more entropy-bearing. The next useful variation must change the action kernel, the wake-memory ledger, or the observer quotient, not merely the first-order circular geometry.

At the present derivation level, the admissible one-patch labels can be enumerated as a finite branch-ledger schema, not yet as a numerical table. For a primitive outer-period closure, the integer-lock notation gives
$$
(k_I,k_M,k_O)=(n,m,1),
\qquad
1<m<n
$$
with longer closure periods represented by common integer multiples before reduction to the primitive label. For each layer $\ell\in\{I,M,O\}$, write $\beta_\ell=s_\ell/c_f$ in the circular reduced root chart. The binary root vocabulary supplies finite active branch sets on any resolved terminal branch:
$$
\mathcal{M}_{s,\ell}
=
\left\{
r\in\mathbb{Z}_{\ge0}
:
\tilde{\delta}_{s,\ell}+2\pi r
=
2\beta_\ell\sin(\tilde{\delta}_{s,\ell}/2)
\right\}
$$
$$
\mathcal{M}_{p,\ell}
=
\left\{
r\in\mathbb{Z}_{\ge0}
:
\tilde{\delta}_{p,\ell}+2\pi r
=
2\beta_\ell\cos(\tilde{\delta}_{p,\ell}/2)
\right\}
$$
Branch-birth or grazing cases, where a Jacobian ceases to be transversal, must be split into their own boundary class rather than silently folded into a smooth label.

Thus the current one-patch candidate has the form
$$
\lambda
=
\left(
(n,m,1);\,
(\mathcal{M}_{s,\ell},\mathcal{M}_{p,\ell},J_{\ell},\prec_{\ell})_{\ell=I,M,O};\,
\mathcal{G}_{IM}^{\mathrm{align}},\mathcal{G}_{IO}^{\mathrm{align}},\mathcal{G}_{MO}^{\mathrm{align}};\,
\chi_c;\,
\mathcal{E}_{\nu}^{-},\mathcal{E}_{\nu}^{+};\,
\mathcal{R}_{O,W}^{\theta}
\right)
$$
where $J_{\ell}$ collects the active branch Jacobians and $\prec_{\ell}$ records the emission-order relation within the layer. The finite candidate set is the subset of these labels satisfying exact one-patch phase closure, terminal-alignment conditions, edge conservation, inter-layer wake compatibility, and the observer quotient:
$$
\Lambda_{\theta}^{\mathrm{loc}}
\subseteq
\left\{
\lambda:
\Delta E=\Delta\mathbf{p}=\Delta\mathbf{J}=0,\;
\Delta q=0,\;
\mathcal{R}_{O,W}(\lambda)=\mathcal{R}_{O,W}^{\theta}
\right\}
/
\sim_{O,\theta,W}
$$

This makes the next missing equations precise. To turn the schema into an actual transfer matrix, the dynamics must supply: first, the terminal branch equations fixing $(s_\ell,R_\ell,\omega_\ell,\mathbf{A}_\ell)$ under $v_M=c_f$, $v_O\to c_f$, and coplanar/co-linear alignment; second, the inter-layer maps that reduce $\mathcal{G}_{IM}^{\mathrm{align}},\mathcal{G}_{IO}^{\mathrm{align}},\mathcal{G}_{MO}^{\mathrm{align}}$ to boundary wake data; and third, the observer-record quotient that decides which edge distinctions remain visible in $\theta$.

An edge-map scaffold can be written before the terminal branch is numerically solved. Let $\mathbf{n}_{\nu}$ be the outward unit normal for the chosen local edge direction, and let $\mathcal{B}_{\mathrm{term}}(\lambda)$ be the finite set of active layer and inter-layer causal branches retained by the terminal one-patch label. Each branch $b\in\mathcal{B}_{\mathrm{term}}(\lambda)$ has a source $j_b$, receiver $o_b$, emission time $T_{\mathrm{em},b}$, reception time $T_b$, winding or root index $r_b$, root type $\tau_b\in\{\text{self},\text{partner},\text{inter-layer}\}$, line of action
$$
\hat{\mathbf{r}}_b
=
\frac{\mathbf X_{o_b}(T_b)-\mathbf X_{j_b}(T_{\mathrm{em},b})}
{\left\|\mathbf X_{o_b}(T_b)-\mathbf X_{j_b}(T_{\mathrm{em},b})\right\|}
$$
and source-normal causal Jacobian
$$
J_b
=
1
-
\frac{\mathbf V_{j_b}(T_{\mathrm{em},b})\cdot\hat{\mathbf{r}}_b}{c_f}
$$
with
$$
D_{s,b}
=
c_f-\mathbf V_{j_b}(T_{\mathrm{em},b})\cdot\hat{\mathbf{r}}_b,
\qquad
D_{T,b}
=
c_f-\mathbf V_{o_b}(T_b)\cdot\hat{\mathbf{r}}_b,
\qquad
W_b^{\mathrm{rec}}
=
\left|\frac{D_{T,b}}{D_{s,b}}\right|.
$$
The branch is admissible only when its causal-root equation closes,
$$
\left\|\mathbf X_{o_b}(T_b)-\mathbf X_{j_b}(T_{\mathrm{em},b})\right\|
=
c_f(T_b-T_{\mathrm{em},b}),
\qquad
D_{s,b}\ne0
$$
and the terminal label also satisfies the integer-lock and alignment constraints
$$
\omega_O P_O=2\pi,\qquad
\omega_M P_O=2\pi m,\qquad
\omega_I P_O=2\pi n
$$
$$
s_M=c_f,\qquad
s_O\to c_f,\qquad
\max_{\ell,\ell'}\arccos(\hat{\mathbf{A}}_\ell\cdot\hat{\mathbf{A}}_{\ell'})\to0
$$

For such a branch, define the boundary-facing datum
$$
\mathfrak{d}_{\nu}^{\pm}(b)
=
\left[
\tau_b,\,
\ell(j_b),\ell(o_b),\,
r_b,\,
T_{\mathrm{em},b}\bmod P_O,\,
\operatorname{sgn}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}),\,
J_b,\,
\hat{\mathbf{r}}_b\cdot\mathbf{n}_{\nu},\,
\mathbf{a}_{o_b\leftarrow j_b}(T_b;T_{\mathrm{em},b})\cdot\mathbf{n}_{\nu}
\right]_{O,\theta,W}
$$
whenever $\pm(\hat{\mathbf{r}}_b\cdot\mathbf{n}_{\nu})>0$. Here $q^{\mathrm{pol}}$ denotes the architrino polarity bookkeeping unit carried by the source or receiver, not the branch-chart label $q$ or the terminal integer $k_\ell$, and $[\cdot]_{O,\theta,W}$ means that distinctions erased by the Physical Observer quotient for record $\theta$ are already identified. The edge maps are then the multisets after the observer quotient:
$$
\mathcal{E}_{\nu}^{\pm}(\lambda)
=
\left\{
\mathfrak{d}_{\nu}^{\pm}(b)
:
b\in\mathcal{B}_{\mathrm{term}}(\lambda),\,
\pm(\hat{\mathbf{r}}_b\cdot\mathbf{n}_{\nu})>0
\right\}
$$
This equation is the derived projection target: it reduces each terminal one-patch branch ledger to the wake data presented across one edge. The still-open numerical step is solving $\mathcal{B}_{\mathrm{term}}(\lambda)$ from the full three-layer state-dependent delayed equations, including the regularized action and energy ledger that assigns the conserved increments used in $\mathcal{C}_{\theta,\nu}$.

The reduced terminal branch system can be stated as a finite residual problem on the primitive outer period. Choose $P_O>0$ and integers $1<m<n$, set
$$
\omega_O=\frac{2\pi}{P_O},
\qquad
\omega_M=m\omega_O,
\qquad
\omega_I=n\omega_O
$$
and represent the aligned circular branch by
$$
\mathbf X_{\ell,\alpha}(T)
=
\mathbf{c}_{\ell}
+
\alpha R_{\ell}
\mathbf{e}\!\left(\omega_\ell T+\phi_\ell\right),
\qquad
\ell\in\{I,M,O\},
\qquad
\alpha\in\{+1,-1\}
$$
where $\mathbf{e}(\psi)$ is the unit vector in the common terminal plane. The phase-lock and terminal-alignment constraints are
$$
\phi_M-m\phi_O=\phi_{MO}^{\ast},
\qquad
\phi_I-n\phi_O=\phi_{IO}^{\ast}
$$
$$
R_\ell\omega_\ell=s_\ell,
\qquad
s_M=c_f,
\qquad
s_O\to c_f,
\qquad
\mathbf{A}_I=\mathbf{A}_M=\mathbf{A}_O
$$
up to the declared terminal-alignment tolerance. The intra-layer branches use the self-hit and partner-hit equations above. The inter-layer candidates are the delayed roots
$$
F_b(\Delta_b)
\equiv
\left\|
\mathbf X_{\ell_o,\alpha_o}(T_b)
-
\mathbf X_{\ell_j,\alpha_j}(T_b-\Delta_b)
\right\|
-
c_f\Delta_b
=
0
$$
with $0<\Delta_b\le H_{\lambda}$ for the finite history window assigned to $\lambda$, layer pair $(\ell_j,\ell_o)\in\{(I,M),(I,O),(M,I),(M,O),(O,I),(O,M)\}$, signs $\alpha_j,\alpha_o\in\{+1,-1\}$, and emission phase recorded modulo $P_O$. The branch is kept in $\mathcal{B}_{\mathrm{term}}(\lambda)$ only if it is transversal,
$$
J_b
=
1
-
\frac{\mathbf V_{\ell_j,\alpha_j}(T_b-\Delta_b)\cdot\hat{\mathbf{r}}_b}{c_f}
\ne0
$$
and belongs to the same integer-lock, emission-order, and observer-record class as $\lambda$.

The remaining dynamics are not another gate; they are the equations that decide whether a proposed branch label exists. For each terminal branch label, the cycle-averaged squared residual must vanish:
$$
\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}(\lambda)
=
\frac{1}{P_O}
\int_0^{P_O}
\left\|
\frac{d^2\mathbf X_{\ell,\alpha}}{dT^2}(T)
-
\sum_{b:\,o_b=(\ell,\alpha)}
\mathbf{a}_{o_b\leftarrow j_b}(T;T-\Delta_b)
\right\|^2
dT
=
0
$$
with the same branch set also satisfying the local conservation ledger
$$
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\left(
\Delta E_b,\Delta\mathbf{p}_b,\Delta\mathbf{J}_b,\Delta q_b
\right)
=
(0,\mathbf{0},\mathbf{0},0)
$$
This defines the reduced solve: $\mathcal{B}_{\mathrm{term}}(\lambda)$ is the finite set of intra-layer and inter-layer roots satisfying the terminal kinematics, transversality, cycle-averaged dynamics, conservation ledger, and observer quotient. A numerical enumeration targets these equations directly; if no solution has $|J_b|$ bounded away from zero, the label must be reclassified as a grazing boundary case rather than counted as an interior transfer-matrix state.

In the symmetric common-center specialization, the inter-layer root problem reduces to scalar root curves over the outer phase. Set
$$
\mathbf{c}_I=\mathbf{c}_M=\mathbf{c}_O,
\qquad
k_I=n,\quad k_M=m,\quad k_O=1,
\qquad
u=\omega_O T\pmod{2\pi}
$$
and introduce dimensionless layer radii
$$
x_\ell
=
\frac{\omega_O R_\ell}{c_f}
=
\frac{s_\ell/c_f}{k_\ell}
$$
For a branch from source layer $\ell_j$ and sign $\alpha_j$ to receiver layer $\ell_o$ and sign $\alpha_o$, write the outer-period delay as $\delta=\omega_O\Delta$. The phase separation is
$$
\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
(k_o-k_j)u
+
k_j\delta
+
\phi_o-\phi_j
$$
and the causal-root equation becomes
$$
\delta
=
\left[
x_o^2+x_j^2
-
2\alpha_o\alpha_j x_o x_j
\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
\right]^{1/2},
\qquad
0<\delta\le \omega_O H_{\lambda}
$$
The corresponding inter-layer Jacobian reduces to
$$
J_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
1
-
\alpha_o\alpha_j
\frac{(s_j/c_f)x_o}{\delta}
\sin\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
$$

Thus an inter-layer entry of $\mathcal{B}_{\mathrm{term}}(\lambda)$ is not an arbitrary phase sample. It is a smooth $2\pi$-periodic root curve $\delta_b(u)$ of the scalar equation above, with $|J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))|$ bounded away from zero and with the same emission-order class over the full outer period. The intra-layer pieces remain the self-hit and partner-hit equations already listed for each $\ell$. In this symmetric special case, the unknowns left for enumeration are therefore
$$
(m,n),\quad
(x_I,x_M,x_O),\quad
(\phi_{MO}^{\ast},\phi_{IO}^{\ast}),\quad
\{\delta_b(u)\}_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
$$
subject to $x_M=1/m$, $x_O\to1$, branch transversality, the cycle residual $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}=0$, and the conservation ledger. This is the first algebraic reduction of the terminal branch problem. It still does not select $(m,n)$ or prove existence; selection requires the residual and conservation equations to admit at least one branch set with a positive Jacobian floor.

The scalar reduction does, however, give an exact no-grazing certificate for a proposed inter-layer branch. Define the squared residual
$$
F_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
x_o^2+x_j^2
-
2\alpha_o\alpha_j x_o x_j
\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
-
\delta^2
$$
The causal-root equation is equivalent to $F_{jo}^{\alpha_j\alpha_o}(u,\delta)=0$ with $\delta>0$, and, using $k_jx_j=s_j/c_f$, its delay derivative is
$$
\partial_{\delta}F_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
-2\delta\,
J_{jo}^{\alpha_j\alpha_o}(u,\delta)
$$
Thus the branch Jacobian is exactly the implicit-function denominator for the scalar root. Any nonzero root with $|J_{jo}^{\alpha_j\alpha_o}|>0$ continues locally as a smooth delay curve, and along such a curve
$$
\frac{d\delta_b}{du}
=
\frac{
\alpha_o\alpha_j x_o x_j(k_o-k_j)
\sin\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}{
\delta_b(u)
J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}
$$

This turns the symmetric terminal branch problem into a compact root-curve test before the force residual is evaluated. Any inter-layer root must lie in the geometric delay strip
$$
|x_o-x_j|
\le
\delta
\le
\min\{x_o+x_j,\omega_OH_{\lambda}\}
$$
For fixed $(m,n)$, radii, and relative phases, an interior inter-layer ledger is admissible only if its initial roots at one outer phase continue around the full $2\pi$ period as closed curves $\delta_b(u)$ that remain inside this strip, satisfy a uniform floor
$$
\delta_b(u)\ge\epsilon_{\delta}>0,
\qquad
\left|
J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
\right|
\ge
\epsilon_J>0
$$
and preserve the declared emission-order and observer-record class. Failure of the delay strip rejects the candidate kinematically; failure of the Jacobian floor places it in the grazing boundary class; failure of closed return changes the root ledger over one outer period. Passing this scalar certificate is still not terminal-branch existence, because $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}=0$ and the conservation ledger must still close, but it is the first finite rejection and continuation criterion for candidate $(m,n)$ branch labels.

The same chart projects the force residual once a certified root curve and same-record receiver-normal branch-strength row are supplied. Let $q_{\ell,\alpha}^{\mathrm{pol}}=\sigma_{\ell,\alpha}\epsilon$ denote the polarity bookkeeping unit carried by the architrino on layer $\ell$ and sign $\alpha$, distinguishing it from the layer frequency integer $k_\ell$. Write the signed coefficient inherited from the canonical per-hit law as
$$
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
=
\kappa\,
\operatorname{sign}(q_{\ell_j,\alpha_j}^{\mathrm{pol}}q_{\ell_o,\alpha_o}^{\mathrm{pol}})
\left|q_{\ell_j,\alpha_j}^{\mathrm{pol}}q_{\ell_o,\alpha_o}^{\mathrm{pol}}\right|
\frac{\omega_O^2}{c_f^2}
$$
For a certified inter-layer curve $\delta_b(u)$, the circular-frame radial component, positive outward from the common center of the receiver layer, is
$$
a_{jo,r}^{\alpha_j\alpha_o}(u)
=
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
W_{jo}^{\mathrm{rec},\alpha_j\alpha_o}(u)
\frac{
x_o-\alpha_o\alpha_j x_j
\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}{
\left(\delta_b(u)\right)^3
}
$$
and the tangential component, positive in the receiver's instantaneous direction of motion, is
$$
a_{jo,\tau}^{\alpha_j\alpha_o}(u)
=
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
W_{jo}^{\mathrm{rec},\alpha_j\alpha_o}(u)
\frac{
\alpha_o\alpha_j x_j
\sin\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}{
\left(\delta_b(u)\right)^3
}
$$
These formulas are the current canonical line-of-action acceleration projected onto the two circular-frame basis vectors. The source-normal denominator remains part of $W^{\mathrm{rec}}$ through $D_s$, so the formulas are not active closure evidence until the same retained row supplies $D_s$, $D_T$, and $W^{\mathrm{rec}}$. The intra-layer self-hit and partner-hit pieces use the same projection after substituting their own certified delay roots from the binary branch chart.

For each receiver $(\ell_o,\alpha_o)$, sum all admitted branch contributions into
$$
\mathcal{A}_{\ell_o,\alpha_o}^{r}(u)
=
\sum_{b:\,o_b=(\ell_o,\alpha_o)}
a_{b,r}(u),
\qquad
\mathcal{A}_{\ell_o,\alpha_o}^{\tau}(u)
=
\sum_{b:\,o_b=(\ell_o,\alpha_o)}
a_{b,\tau}(u)
$$
On the symmetric terminal circle, with $\mathbf{e}_{\perp}(\psi)=d\mathbf{e}(\psi)/d\psi$, the target acceleration has only inward radial component,
$$
\frac{d^2\mathbf X_{\ell_o,\alpha_o}}{dT^2}(T)
\cdot
\alpha_o\mathbf{e}(k_{\ell_o}u+\phi_{\ell_o})
=
-R_{\ell_o}(k_{\ell_o}\omega_O)^2,
\qquad
\frac{d^2\mathbf X_{\ell_o,\alpha_o}}{dT^2}(T)
\cdot
\alpha_o\mathbf{e}_{\perp}(k_{\ell_o}u+\phi_{\ell_o})
=
0
$$
Thus the vector residual $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}$ reduces in this chart to the two scalar residual functions
$$
\mathcal{R}_{\ell_o,\alpha_o}^{r}(u)
=
-R_{\ell_o}(k_{\ell_o}\omega_O)^2
-
\mathcal{A}_{\ell_o,\alpha_o}^{r}(u),
\qquad
\mathcal{R}_{\ell_o,\alpha_o}^{\tau}(u)
=
-
\mathcal{A}_{\ell_o,\alpha_o}^{\tau}(u)
$$
Equivalently,
$$
\mathcal{Q}_{\ell_o,\alpha_o}^{\mathrm{term}}
=
\frac{1}{2\pi}
\int_0^{2\pi}
\left[
\left(\mathcal{R}_{\ell_o,\alpha_o}^{r}(u)\right)^2
+
\left(\mathcal{R}_{\ell_o,\alpha_o}^{\tau}(u)\right)^2
\right]
du
$$
Since the integrand is non-negative on a smooth certified branch, $\mathcal{Q}_{\ell_o,\alpha_o}^{\mathrm{term}}=0$ is equivalent to $\mathcal{R}_{\ell_o,\alpha_o}^{r}(u)=0$ and $\mathcal{R}_{\ell_o,\alpha_o}^{\tau}(u)=0$ for the full outer period. This is the residual projection that can select or reject candidate integer locks after the scalar root curves are known. The remaining missing closure is the signed branch-strength and conservation assignment: without the polarity factors, regularized intra-layer branch weights, and conserved increments $(\Delta E_b,\Delta\mathbf{p}_b,\Delta\mathbf{J}_b,\Delta q_b)$, the chart can reject kinematic and force-residual failures but cannot yet prove that a particular $(m,n)$ is the terminal solution.

The branch-strength closure data can be stated without adding another gate. For every admitted branch $b$, the terminal ledger must record
$$
b
\mapsto
\left(
j_b,o_b,\tau_b,\delta_b(u),\hat{\mathbf{r}}_b(u),J_b(u),
D_{s,b}(u),D_{T,b}(u),W_b^{\mathrm{rec}}(u),
q_{j_b}^{\mathrm{pol}},q_{o_b}^{\mathrm{pol}},w_b^{(\eta)}(u)
\right)
$$
where $j_b$ and $o_b$ are the source and receiver architrinos, $\tau_b$ is the hit type, $D_{s,b}$ is the source-normal denominator, $D_{T,b}$ is the receiver-normal numerator, $W_b^{\mathrm{rec}}=\lvert D_{T,b}/D_{s,b}\rvert$, and $w_b^{(\eta)}$ is the regularized inverse-square receiver-normal weight assigned to that branch. On a sharp transversal inter-layer branch,
$$
w_b^{(0)}(u)
=
\frac{\omega_O^2}{c_f^2}
\frac{W_b^{\mathrm{rec}}(u)}
{\left(\delta_b(u)\right)^2}
$$
while intra-layer self-hit and partner-hit entries use the corresponding binary-root delay, source-normal denominator, and receiver-normal numerator. The branch acceleration is then the canonical per-hit law in ledger form,
$$
\mathbf{a}_b^{(\eta)}(u)
=
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
w_b^{(\eta)}(u)
\hat{\mathbf{r}}_b(u)
$$
The sharp limit is acceptable only when the positive delay and Jacobian-floor certificate above holds; otherwise the branch must retain its regularized weight and remain a boundary case rather than an interior terminal label.

The conservation increments attached to a branch must separate mechanical exchange from wake-history bookkeeping. Over one outer period,
$$
\Delta E_{b}^{\mathrm{mech}}
=
\frac{\mu_{\mathrm{act}}}{\omega_O}
\int_0^{2\pi}
\mathbf{a}_b^{(\eta)}(u)\cdot\mathbf V_{o_b}(u)\,du
$$
$$
\Delta\mathbf{p}_{b}^{\mathrm{mech}}
=
\frac{\mu_{\mathrm{act}}}{\omega_O}
\int_0^{2\pi}
\mathbf{a}_b^{(\eta)}(u)\,du,
\qquad
\Delta\mathbf{J}_{b}^{\mathrm{mech}}
=
\frac{\mu_{\mathrm{act}}}{\omega_O}
\int_0^{2\pi}
\mathbf X_{o_b}(u)\times\mathbf{a}_b^{(\eta)}(u)\,du
$$
Here $\mu_{\mathrm{act}}$ is an action-scaffold normalization that converts the variational ledger back into the acceleration units used by the Master EOM. It is not a primitive mass assigned to an architrino.

Because delayed momentum and energy are not purely instantaneous mechanical quantities, the full ledger entries are
$$
\Delta E_b
=
\Delta E_b^{\mathrm{mech}}
+
\Delta E_b^{\mathrm{wake}},
\qquad
\Delta\mathbf{p}_b
=
\Delta\mathbf{p}_b^{\mathrm{mech}}
+
\Delta\mathbf{p}_b^{\mathrm{wake}}
$$
$$
\Delta\mathbf{J}_b
=
\Delta\mathbf{J}_b^{\mathrm{mech}}
+
\Delta\mathbf{J}_b^{\mathrm{wake}}
$$
For an internal causal-wake hit, $\Delta q_b=0$ because no architrino identity is created, destroyed, or transferred; nonzero charge-bookkeeping entries belong only to a declared provenance crossing of the patch boundary. The terminal conservation ledger is therefore the simultaneous closure condition
$$
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta E_b
=
0,
\qquad
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta\mathbf{p}_b
=
\mathbf{0}
$$
$$
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta\mathbf{J}_b
=
\mathbf{0},
\qquad
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta q_b
=
0
$$
This completes the local bookkeeping needed for terminal enumeration: a candidate $(m,n)$ must pass scalar root continuation, force-residual cancellation, and the history-aware conservation ledger on the same branch set. What remains unsolved is not another requirement artifact but the derivation of $w_b^{(\eta)}$ and the wake-history increments from a time-translation- and Euclidean-invariant regularized action for the coupled three-layer branch.

The minimal action-level scaffold is the pullback of the exact causal-delay action in [Master Equation](../dynamics/master-equation.md#exact-nonlocal-lagrangian) to the certified terminal branch chart. For branch $b$, set
$$
T_b(u)=\frac{u}{\omega_O},
\qquad
T_b^0(u)=T_b(u)-\Delta_b(u),
\qquad
r_b(u)=\frac{c_f}{\omega_O}\delta_b(u)
$$
The sharp branch density inherited from the exact $1/r$ causal kernel is
$$
\mathcal{I}_b^{(0)}(u)
=
\frac{1}{c_f}
\frac{1}{r_b(u)|J_b(u)|}
=
\frac{\omega_O}{c_f^2}
\frac{1}{\delta_b(u)|J_b(u)|}
$$
A regularized terminal action for the branch set should therefore have the form
$$
S_{\lambda}^{(\eta)}
=
\int_0^{2\pi}
\frac{du}{\omega_O}
\sum_o
\frac{1}{2}\mu_{\mathrm{act}}
\left\|\mathbf V_o(u)\right\|^2
-
\frac{1}{2}
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\int_0^{2\pi}
\frac{du}{\omega_O}
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
\mathcal{I}_b^{(\eta)}(u)
$$
with $\mathcal{I}_b^{(\eta)}\to\mathcal{I}_b^{(0)}$ weakly on any branch satisfying the positive-delay and Jacobian-floor certificate. Its branch variation must reproduce the terminal acceleration weight,
$$
\left[
\frac{1}{\mu_{\mathrm{act}}}
\frac{\delta S_{\lambda}^{(\eta)}}{\delta\mathbf X_{o_b}}
\right]_{\!b}
\longrightarrow
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
\,w_b^{(0)}(u)
\hat{\mathbf{r}}_b(u)
$$
up to the sign convention fixed by writing the interaction term with a minus sign in the action. In other words, $w_b^{(\eta)}$ is not an independent fitting weight. It is the Euler-Lagrange pullback of the regularized causal kernel on a certified branch chart.

The strongest current action-kernel candidate is not the diagnostic same-support inverse-square adapter. Pull back the delayed-interior characteristic-tail kernel from [Master Equation](../dynamics/master-equation.md#exact-nonlocal-lagrangian) before reducing to a one-period branch density. In this subsection, $\tilde F_b$ denotes the time-normalized branch constraint
$$
\tilde F_b=-\frac{g_b^{\mathrm{ME}}}{c_f}
$$
where $g_b^{\mathrm{ME}}=r_b-c_f(T_1-T_{\mathrm{em}})$ is the length-valued Master Equation causal constraint on the same branch. This convention keeps the time-kernel prefactors explicit and prevents the local branch variable from being confused with the canonically length-valued $g_{ij}$. For the two-time branch, define the local characteristic coordinate
$$
u_b^{\mathrm{c}}(T_1,T_{\mathrm{em}})
=
\tilde F_b(T_1,T_{\mathrm{em}})
+
\frac{r_b(T_1,T_{\mathrm{em}})}{c_f}
$$
After endpoint-clear normalization, the candidate branch kernel is
$$
K_{b,\mathrm{eff}}^{(\eta)}(T_1,T_{\mathrm{em}})
=
\int_{-\infty}^{\tilde F_b(T_1,T_{\mathrm{em}})}
\frac{\delta_\eta(s)}
{c_f\left(u_b^{\mathrm{c}}(T_1,T_{\mathrm{em}})-s\right)^2}
ds
$$
or the finite-endpoint version with lower limit $-h_{+}$ when the endpoint-clearance term is cancelled by the characteristic gauge. Its receiver-gradient identity is
$$
\left(
\partial_{r_b}
-
\frac{1}{c_f}\partial_{\tilde F_b}
\right)
K_{b,\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(\tilde F_b)}{r_b^2}
$$
This is the action-level object that can replace the diagnostic inverse-square adapter once the Noether boundary terms below are computed from the same kernel. Until then, terminal enumerator rows using $w_b^{(\eta)}\hat{\mathbf{r}}_b$ remain diagnostic branch-force rows rather than a completed action derivation.

The sharp receiver-side variation can be separated before the root is integrated out. Write the two-time branch kernel as
$$
\mathcal{L}_b^{(0)}(T_1,T_{\mathrm{em}})
=
\frac{1}{c_f}
\Theta(T_1-T_{\mathrm{em}})
\frac{\delta(\tilde F_b(T_1,T_{\mathrm{em}}))}{r_b(T_1,T_{\mathrm{em}})}
$$
with
$$
\tilde F_b(T_1,T_{\mathrm{em}})
=
T_1-T_{\mathrm{em}}
-
\frac{r_b(T_1,T_{\mathrm{em}})}{c_f},
\qquad
r_b(T_1,T_{\mathrm{em}})
=
\|\mathbf X_{o_b}(T_1)-\mathbf X_{j_b}(T_{\mathrm{em}})\|
$$
For a receiver variation at fixed source history,
$$
\delta r_b
=
\hat{\mathbf{r}}_b\cdot\delta\mathbf X_{o_b}(T_1),
\qquad
\delta \tilde F_b
=
-
\frac{1}{c_f}
\hat{\mathbf{r}}_b\cdot\delta\mathbf X_{o_b}(T_1)
$$
Therefore
$$
\delta\!\left(\frac{\delta(\tilde F_b)}{r_b}\right)
=
-
\left[
\frac{\delta(\tilde F_b)}{r_b^2}
+
\frac{\delta'(\tilde F_b)}{c_f r_b}
\right]
\hat{\mathbf{r}}_b\cdot\delta\mathbf X_{o_b}(T_1)
$$
The first term gives the source-normal part of the terminal branch scale after the causal root is selected:
$$
\int dT_{\mathrm{em}}\,
\Theta(T_1-T_{\mathrm{em}})
\frac{\delta(\tilde F_b(T_1,T_{\mathrm{em}}))}{r_b^2(T_1,T_{\mathrm{em}})}
=
\frac{1}{r_b^2(T_1,T_b^0)|D_{s,b}(T_1,T_b^0)|}
=
\frac{\omega_O^2}{c_f^2}
\frac{1}{\delta_b^2(u)|D_{s,b}(u)|}
=
w_{b,\mathrm{src}}^{(0)}(u)
$$

The active force-law branch strength still requires the receiver-normal numerator, so the terminal ledger must promote $w_b^{(0)}=(\omega_O^2/c_f^2)W_b^{\mathrm{rec}}/\delta_b^2$ only after $D_{T,b}$ is recorded on the same retained branch. The second term is the nontrivial root-constraint variation. It cannot be dropped after the branch has been pulled back to $\delta_b(u)$. The terminal-chart variation proof closes exactly when the regularized two-time action satisfies, for every compactly supported or period-matched receiver variation,
$$
\lim_{\eta\to0}
\left[
\int dT_{\mathrm{em}}\,
\Theta(T_1-T_{\mathrm{em}})
\frac{\delta_\eta'(\tilde F_b(T_1,T_{\mathrm{em}}))}{c_f r_b(T_1,T_{\mathrm{em}})}
\hat{\mathbf{r}}_b(T_1,T_{\mathrm{em}})
\right]_{\mathrm{int}}
=
\mathbf{0}
$$
where the subscript $\mathrm{int}$ means after the source-side variation, integration by parts on the root-selected chart, and the Noether boundary term have been accounted for. Equivalently, all interior force density left by varying the causal constraint must cancel into the boundary wake increments rather than adding a second independent line-of-action force. This is the exact missing identity for a complete terminal-chart variation proof. The direct $1/r$ variation supplies the source-normal scale coefficient $w_{b,\mathrm{src}}^{(0)}$; the remaining proof burden is to show that the $\delta_\eta'(\tilde F_b)$ contribution is a boundary/source-side term, vanishes under a local stationarity condition, or is cancelled by a declared counterterm under the same symmetry-preserving regularization used for the conservation ledger while the same branch records $D_{T,b}$ for $W_b^{\mathrm{rec}}$.

This identity can be narrowed one step further. On a transversal branch,
$$
\partial_{T_{\mathrm{em}}}\tilde F_b(T_1,T_{\mathrm{em}})
=
-J_b(T_1,T_{\mathrm{em}})
$$
so
$$
\delta_\eta'(\tilde F_b)
=
-
\frac{1}{J_b}
\partial_{T_{\mathrm{em}}}\delta_\eta(\tilde F_b)
$$
Substituting this into the unresolved term and integrating by parts in $T_{\mathrm{em}}$ gives
$$
\int dT_{\mathrm{em}}\,
\Theta(T_1-T_{\mathrm{em}})
\frac{\delta_\eta'(\tilde F_b)}{c_f r_b}
\hat{\mathbf{r}}_b
=
\mathcal{B}_{b}^{(\eta)}(T_1)
+
\int dT_{\mathrm{em}}\,
\delta_\eta(\tilde F_b)
\partial_{T_{\mathrm{em}}}
\left[
\Theta(T_1-T_{\mathrm{em}})
\frac{\hat{\mathbf{r}}_b}{c_f r_b J_b}
\right]
$$
where $\mathcal{B}_{b}^{(\eta)}(T_1)$ is the endpoint contribution at the history-window, period, or excluded coincidence boundary. The coincidence term is removed by $H(0)=0$; the remaining endpoint term vanishes only for compactly supported variations or for period-matched terminal histories.

Thus the smallest unresolved object is no longer the raw $\delta_\eta'(\tilde F_b)$ term. It is the root-chart interior derivative
$$
\mathbf{C}_{b}^{(\eta)}(T_1)
=
\int dT_{\mathrm{em}}\,
\delta_\eta(\tilde F_b)
\partial_{T_{\mathrm{em}}}
\left[
\Theta(T_1-T_{\mathrm{em}})
\frac{\hat{\mathbf{r}}_b}{c_f r_b J_b}
\right]
$$
The terminal action derives the claimed line-of-action branch law exactly only if
$$
\lim_{\eta\to0}
\left[
\mathbf{C}_{b}^{(\eta)}
+
\mathbf{C}_{b,\mathrm{src}}^{(\eta)}
+
\mathbf{C}_{b,\mathrm{bdry}}^{(\eta)}
\right]
=
\mathbf{0}
$$
where $\mathbf{C}_{b,\mathrm{src}}^{(\eta)}$ is the source-side variation of the same two-time kernel and $\mathbf{C}_{b,\mathrm{bdry}}^{(\eta)}$ is the Noether boundary contribution assigned to the wake-history ledger. This is the precise local closure condition that would be needed for the pure scalar kernel to derive the terminal line-of-action force without an added term. If this cancellation fails, the action-derived terminal force law must include an additional regularized counterterm rather than using $w_b^{(\eta)}\hat{\mathbf{r}}_b$ alone.

The source-side calculation shows why this is a real condition rather than a notational cancellation. Holding the receiver history fixed and varying the emission point gives
$$
\delta r_b
=
-\hat{\mathbf{r}}_b\cdot\delta\mathbf X_{j_b}(T_{\mathrm{em}}),
\qquad
\delta \tilde F_b
=
\frac{1}{c_f}
\hat{\mathbf{r}}_b\cdot\delta\mathbf X_{j_b}(T_{\mathrm{em}})
$$
and therefore
$$
\delta_{\mathrm{src}}\!\left(\frac{\delta_\eta(\tilde F_b)}{r_b}\right)
=
\left[
\frac{\delta_\eta(\tilde F_b)}{r_b^2}
+
\frac{\delta_\eta'(\tilde F_b)}{c_f r_b}
\right]
\hat{\mathbf{r}}_b\cdot\delta\mathbf X_{j_b}(T_{\mathrm{em}})
$$
On a future-reception chart for the same branch,
$$
\partial_{T_1}\tilde F_b(T_1,T_{\mathrm{em}})
=
1-\frac{\hat{\mathbf{r}}_b(T_1,T_{\mathrm{em}})\cdot\mathbf V_{o_b}(T_1)}{c_f}
$$
so the source-side derivative-of-delta contribution becomes
$$
\int dT_1\,
\Theta(T_1-T_{\mathrm{em}})
\frac{\delta_\eta'(\tilde F_b)}{c_f r_b}
\hat{\mathbf{r}}_b
=
\widetilde{\mathcal{B}}_{b}^{(\eta)}(T_{\mathrm{em}})
-
\int dT_1\,
\delta_\eta(\tilde F_b)
\partial_{T_1}
\left[
\Theta(T_1-T_{\mathrm{em}})
\frac{\hat{\mathbf{r}}_b}
{c_f r_b\left(1-\hat{\mathbf{r}}_b\cdot\mathbf V_{o_b}/c_f\right)}
\right]
$$
This is the coefficient of $\delta\mathbf X_{j_b}(T_{\mathrm{em}})$, not the coefficient of $\delta\mathbf X_{o_b}(T_1)$. For arbitrary compactly supported interior variations, the source and receiver variations are independent. The source-side term therefore does not cancel $\mathbf{C}_{b}^{(\eta)}$ pointwise in the receiver Euler-Lagrange equation. Noether boundary terms can cancel endpoint contributions or enforce global time-translation, spatial-translation, and rotation charges, but they cannot remove an interior receiver coefficient for compactly supported variations.

In the sharp positive-delay, transversal limit, the receiver-side interior object reduces to
$$
\mathbf{C}_{b}^{(0)}(T_1)
=
\frac{1}{|J_b(T_1,T_b^0)|}
\left.
\partial_{T_{\mathrm{em}}}
\left[
\frac{\hat{\mathbf{r}}_b(T_1,T_{\mathrm{em}})}
{c_f r_b(T_1,T_{\mathrm{em}})J_b(T_1,T_{\mathrm{em}})}
\right]
\right|_{T_{\mathrm{em}}=T_b^0}
$$
Thus the pure regularized $1/r$ causal kernel is promoted to an exact branch-weight derivation only under the sufficient local stationarity condition
$$
\left.
\partial_{T_{\mathrm{em}}}
\left[
\frac{\hat{\mathbf{r}}_b(T_1,T_{\mathrm{em}})}
{r_b(T_1,T_{\mathrm{em}})J_b(T_1,T_{\mathrm{em}})}
\right]
\right|_{T_{\mathrm{em}}=T_b^0}
=
\mathbf{0}
$$
on each admitted interior branch, or under an explicit action-level counterterm whose receiver Euler derivative is
$$
\left[
\frac{1}{\mu_{\mathrm{act}}}
\frac{\delta S_{b,\mathrm{ct}}^{(\eta)}}{\delta\mathbf X_{o_b}(T_1)}
\right]_{\!b}
=
-
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
\mathbf{C}_{b}^{(\eta)}(T_1)
$$
with the same endpoint convention used for the wake-history ledger. Such a counterterm is admissible only when derived from the same symmetry-preserving action-level mechanism, not when inserted as a fit to the accepted branch law. This is the smallest correction exposed by the variation: it preserves the direct inverse-square branch law when the stationarity condition holds, and otherwise records exactly the residual force density that the scalar kernel leaves behind.

For the same causal-surface local scalar class, this counterterm route is ruled out. A scalar term $a(r_b,J_b)\delta_\eta(\tilde F_b)$ must choose $a=-1/r_b$ to cancel the derivative-of-delta coefficient, but that same choice changes the direct source-normal scale contribution. The finite local delta-jet extension has the same obstruction. In the common-center inter-layer chart, the stationarity option is also ruled out by the lemma below. The terminal branch proof should therefore test branch-summed residual closure directly with $D_s$, $D_T$, and $W^{\mathrm{rec}}$ on the same retained rows; otherwise the remaining action-level option is the nonlocal characteristic-tail repair target from [Master Equation](../dynamics/master-equation.md#exact-nonlocal-lagrangian), or a richer velocity/history-dependent invariant mechanism. Neither option is a fitted scalar patch.

**Lemma (common-center inter-layer stationarity obstruction).** In the symmetric common-center terminal chart, no positive-delay, non-grazing inter-layer branch with nonzero layer radii and nonzero source speed satisfies the per-branch stationarity condition above. Define the dimensionless separation vector
$$
\mathbf{Y}_b(u,\delta)
=
\alpha_o x_o\mathbf{e}(k_o u+\phi_o)
-
\alpha_j x_j\mathbf{e}(k_j(u-\delta)+\phi_j),
\qquad
\rho_b(u,\delta)
=
\|\mathbf{Y}_b(u,\delta)\|
$$
Since $r_b=(c_f/\omega_O)\rho_b$ and $\hat{\mathbf{r}}_b=\mathbf{Y}_b/\rho_b$, the branch stationarity condition is equivalent up to a nonzero scale to
$$
\left.
\partial_\delta
\left[
\frac{\mathbf{Y}_b(u,\delta)}
{\rho_b^2(u,\delta)J_b(u,\delta)}
\right]
\right|_{\delta=\delta_b(u)}
=
\mathbf{0}
$$
The vector derivative can vanish only if $\partial_\delta\mathbf{Y}_b$ is parallel to $\mathbf{Y}_b$. But
$$
\partial_\delta\mathbf{Y}_b
=
\alpha_j k_j x_j\,
\mathbf{e}_{\perp}(k_j(u-\delta)+\phi_j)
$$
so parallelism forces the separation to be tangent to the source circle:
$$
\mathbf{Y}_b\cdot\mathbf{e}(k_j(u-\delta)+\phi_j)
=
0
\quad\Longleftrightarrow\quad
\alpha_o x_o\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
\alpha_j x_j
$$
On this tangent subcase, $\rho_{b,\delta\delta}=0$ and $J_b=1-\rho_{b,\delta}$. The remaining scalar stationarity condition reduces to
$$
\partial_\delta(\rho_bJ_b)
=
\rho_{b,\delta}(1-\rho_{b,\delta})
=
0
$$
The first factor would require $\rho_{b,\delta}=0$; with $k_jx_j=s_j/c_f\ne0$ and the tangent condition, that collapses the separation to $\rho_b=0$ and violates the positive-delay floor. The second factor gives $J_b=0$, which violates the Jacobian floor. Therefore per-branch stationarity is not the terminal inter-layer closure mechanism on this chart. The remaining action-level route is branch-summed residual closure over the signed admitted branch set, or a richer invariant action mechanism whose Euler derivative supplies the missing residual without fitting the force law.

**Branch-summed residual closure.** The terminal action scaffold can still close without per-branch stationarity if the receiver-side interior residual cancels across the signed admitted branch set. Define the dimensionless branch residual vector
$$
\mathbf{A}_b(u)
=
\left.
\partial_\delta
\left[
\frac{\mathbf{Y}_b(u,\delta)}
{\rho_b^2(u,\delta)J_b(u,\delta)}
\right]
\right|_{\delta=\delta_b(u)}
$$
Using $T_{\mathrm{em}}=T_1-\delta/\omega_O$, $r_b=(c_f/\omega_O)\rho_b$, and $\hat{\mathbf{r}}_b=\mathbf{Y}_b/\rho_b$, the sharp receiver-side interior term becomes
$$
\mathbf{C}_{b}^{(0)}(u)
=
-
\frac{\omega_O^2}{c_f^2}
\frac{\mathbf{A}_b(u)}{|J_b(u)|}
$$
After the common nonzero scale is removed, the necessary pointwise receiver-side closure equation is
$$
\sum_{b:\,o_b=(\ell_o,\alpha_o)}
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
\frac{\mathbf{A}_b(u)}{|J_b(u)|}
=
\mathbf{0}
\qquad
\text{for all }u
$$
This is a different equation from the force residuals $\mathcal{R}_{\ell_o,\alpha_o}^{r}=\mathcal{R}_{\ell_o,\alpha_o}^{\tau}=0$ and from the conservation-ledger sums. The force residual tests whether the accepted Master EOM supplies the terminal circular acceleration. The conservation ledger tests Noether bookkeeping over the same branch set. The branch-summed residual equation tests whether the scalar action scaffold has no leftover Euler derivative on that receiver after the direct inverse-square term has already been accounted for.

The regularization is admissible only if it preserves the symmetries that supply the conservation ledger. In action form this means
$$
\delta_{\tau}S_{\lambda}^{(\eta)}=0,
\qquad
\delta_{\mathbf{b}}S_{\lambda}^{(\eta)}=0,
\qquad
\delta_{\boldsymbol{\Omega}}S_{\lambda}^{(\eta)}=0
$$
for global time translations, spatial translations, and spatial rotations. A sufficient local form is to regularize only the causal scalar
$$
\tilde F_{ij}(T,T')
=
T-T'
-
\frac{\|\mathbf X_i(T)-\mathbf X_j(T')\|}{c_f}
$$
by a normalized $\delta_\eta(\tilde F_{ij})$, while keeping $H(0)=0$ and excluding the trivial coincidence self-branch. Such a regularizer depends on Euclidean distance and absolute-time difference, not on a coordinate origin, absolute phase convention, or observer record.

The wake-history increments are then the Noether boundary terms of this same action. For the time-translation channel, a branch contribution across a time boundary $T_\ast$ has the form
$$
E_{b}^{\mathrm{wake}}(T_\ast)
=
\frac{1}{2}
\int_{\{(T_1,T_{\mathrm{em}})\in b:\,T_{\mathrm{em}}\le T_\ast<T_1\}}
\partial_{T_1}
\mathcal{K}_{b}^{(\eta)}(T_1,T_{\mathrm{em}})\,
dT_{\mathrm{em}}\,dT_1
$$
where $\mathcal{K}_{b}^{(\eta)}$ is the weighted regularized causal kernel restricted to branch $b$,
$$
\mathcal{K}_{b}^{(\eta)}(T_1,T_{\mathrm{em}})
=
\frac{\kappa\,\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|}{c_f}
\Theta(T_1-T_{\mathrm{em}})
\frac{\delta_\eta(\tilde F_b(T_1,T_{\mathrm{em}}))}
{r_b(T_1,T_{\mathrm{em}})}
$$
for the pure scalar scaffold. For the delayed-interior characteristic-tail candidate, the branch kernel is instead
$$
\mathcal{K}_{b,\mathrm{eff}}^{(\eta)}(T_1,T_{\mathrm{em}})
=
\frac{\kappa\,\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|}{c_f}
\Theta(T_1-T_{\mathrm{em}})
K_{b,\mathrm{eff}}^{(\eta)}(T_1,T_{\mathrm{em}})
$$
with the trivial self-coincidence branch excluded in either case. Over one outer period,
$$
\Delta E_b^{\mathrm{wake}}
=
E_{b}^{\mathrm{wake}}(T)-E_{b}^{\mathrm{wake}}(0)
$$
The momentum and angular-momentum wake increments are the corresponding spatial-translation and rotation boundary terms:
$$
\Delta\mathbf{p}_b^{\mathrm{wake}}
=
\mathbf{P}_b^{\mathrm{wake}}(T)-\mathbf{P}_b^{\mathrm{wake}}(0),
\qquad
\Delta\mathbf{J}_b^{\mathrm{wake}}
=
\mathbf{J}_b^{\mathrm{wake}}(T)-\mathbf{J}_b^{\mathrm{wake}}(0)
$$
They are fixed by the coefficients of the boundary variations
$$
\delta_{\mathbf{b}}S_b^{(\eta)}
=
\mathbf{b}\cdot
\Delta\mathbf{p}_b^{\mathrm{wake}},
\qquad
\delta_{\boldsymbol{\Omega}}S_b^{(\eta)}
=
\boldsymbol{\Omega}\cdot
\Delta\mathbf{J}_b^{\mathrm{wake}}
$$
with the mechanical increments already written above. Therefore a terminal branch proof has a precise action-level target: derive $\mathcal{I}_b^{(\eta)}$ from the normalized delayed-interior kernel, prove that its branch variation gives $w_b^{(\eta)}$ with the derivative-of-constraint residual cancelled by the receiver-gradient identity, and show that the Noether boundary terms close over the same certified branch set. Until those three steps are complete, the action scaffold supplies a constrained proof route and a rejection test, not a solved terminal $(m,n)$ selection.

The Master Equation fixes the normalized delayed-interior kernel and its energy, momentum, and angular-momentum wake-history boundary increments. The terminal-alignment proof must pull those increments back to the finite terminal branch chart, evaluate the resulting $\Delta E_b^{\mathrm{wake}}$, $\Delta\mathbf{p}_b^{\mathrm{wake}}$, and $\Delta\mathbf{J}_b^{\mathrm{wake}}$, and prove that the mechanical plus wake ledger closes on the same rows that pass the force-residual and root-ledger tests. Until that branch-summed evaluation passes, the terminal rows remain a diagnostic action packet rather than a solved terminal $(m,n)$ selection.

The concrete terminal-chart conservation test is the pullback of the Master Equation charges to $\mathcal{B}_{\mathrm{term}}(\lambda)$. Each retained row must emit
$$
\left(
j_b,o_b,\tau_b,\ell(j_b),\ell(o_b),T_{\mathrm{em},b},T_b,\Delta_b,
r_b,\hat{\mathbf r}_b,\tilde F_b,u_b,J_b,
K_{b,\mathrm{eff}}^{(\eta)},
\partial_{T_b}\mathcal{K}_{b,\mathrm{eff}}^{(\eta)},
\nabla_{\mathbf X_{o_b}(T_b)}\mathcal{K}_{b,\mathrm{eff}}^{(\eta)}
\right)
$$
using the action-level causal scalar
$$
\tilde F_b(T_b,T_{\mathrm{em},b})
=
T_b-T_{\mathrm{em},b}
-
\frac{r_b(T_b,T_{\mathrm{em},b})}{c_f}
$$
The chart then reports the endpoint totals
$$
\mathcal{E}_{\mathrm{term}}^{(\eta)}
=
K_{\mu,\lambda}
+
E_{\mathrm{wake,eff},\lambda}^{(\eta)},
\qquad
\boldsymbol{\mathcal{P}}_{\mathrm{term}}^{(\eta)}
=
\mathbf{P}_{\mathrm{mech},\lambda}
+
\mathbf{P}_{\mathrm{wake,eff},\lambda}^{(\eta)}
$$
$$
\boldsymbol{\mathcal{J}}_{\mathrm{term}}^{(\eta)}
=
\mathbf{J}_{\mathrm{mech},\lambda}
+
\mathbf{J}_{\mathrm{wake,eff},\lambda}^{(\eta)}
$$
The terminal label is conserved only when the increments of all three totals vanish within the declared branch tolerance, after subtracting the Euler-residual and endpoint-leakage terms. The projected action increment $\Delta I_{\mathrm{ME}}$ and any torque integral remain numerical diagnostics until these three totals close on the same $\mathcal{B}_{\mathrm{term}}(\lambda)$ rows.

This scaffold identifies the smallest missing dynamics. The delayed equations must enumerate $\Lambda_{\theta}^{\mathrm{loc}}$ and derive the edge maps $\mathcal{E}_{\nu}^{\pm}$ from the terminal aligned branch. [Noether Braid Doubling-Frequency Resonance Lock](noether-braid-doubling-frequency-resonance-lock.md) supplies the candidate integer phase lattice, and [Binary Dynamics](../dynamics/binary-dynamics.md#self-hit-definition-and-diagnostics) supplies the self-hit and partner-hit root vocabulary, but neither document yet computes the terminal aligned edge projections from the full three-layer dynamics.

The local-horizon coefficient requires the area-normalized terminal density
$$
\bar{\alpha}_{\mathrm{align}}(\theta)
=
\frac{s_{\mathrm{align}}(\theta)}{a_{\theta}}
\longrightarrow
\frac{1}{4}
$$
in the equilibrium weak-field horizon-interface limit. This is the precise missing dynamics calculation. It fails if terminal alignment admits many inequivalent local labels with long-range constraints that restore volume or history-length scaling, if the observer quotient erases the labels needed for Page-compatible release accounting, or if the transfer rule must be retuned separately for entropy, flux, and downstream observer-geometry recovery.

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

## Regime Map for Speed Statements (CFT / Horizon / AdS)

To keep speed claims consistent across documents, all binary-speed statements should be read as **regime-qualified**:

| Regime | Inner binary | Middle binary | Outer binary | Operational meaning |
| --- | --- | --- | --- | --- |
| **Partner/exterior comparison regime** (CFT bridge label) | Typically in self-hit branch ($\|\mathbf V\| \gtrsim c_f$ history-supported) | Near the hinge scale ($\|\mathbf V\| \approx c_f$) in working models | Typically $\|\mathbf V\| < c_f$ | Hierarchical nested shell braid operation and ordinary ladder behavior |
| **Terminal-alignment interface** (holographic bridge label) | Forward-sector components approach $c_f$ | Forward-sector components approach $c_f$ | Forward-sector components approach $c_f$ | 3D precessing structure collapses toward planar lock |
| **Self-hit interior comparison regime** (AdS bridge label) | Self-hit dominated; effective closure may involve super-field effective speed | Strongly coupled to inner/outer delay closure | Can participate in states where combined in-plane effective speed satisfies $v_{\text{eff}} > c_f$ | Mach-wedge-like causal geometry and interior recycling hypotheses |

**Notation guardrail:** "$\|\mathbf V\| < c_f$" or "$\|\mathbf V\| = c_f$" in role summaries refers to a component/regime statement, while $v_{\text{eff}} > c_f$ refers to the **combined in-plane effective motion** used in wake-geometry closure.

**Geometry speed guardrail:** Primitive envelope and closure diagnostics use the causal speed $c_f$. Downstream observer-channel dressing is not part of this branch scan. The corresponding kinematic parameter is
$$
\beta_f=\frac{v_{\text{trans}}}{c_f}
$$
Primitive dynamics scans must not mix $c_f$ and $c_{\text{eff}}$ in the same diagnostic. Any $c_{\text{eff}}$ comparison belongs to a downstream observer-channel map.

---

## Geometry Focus

### A) High Group Velocity Geometry (Oblate Spheroidal Envelope)

**Assumption (testable):** The outer binary moving at translational speed $v_{\text{trans}}$ generates a causal interaction envelope that is oblate and flattens along the direction of motion as $v_{\text{trans}} \to c_f$ on the primitive branch chart.

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

### B) High Gravitational Gradient Geometry

**Coupling caveat:** Whether $v_{\text{trans}}$ is independent of the radial infall speed $v_r$ is unresolved. Use the independent form by default, or adopt a coupling $v_{\text{trans}} = f(R_\perp)$ and substitute to test specific scenarios.

**Assumption (testable):** A strong external gradient (tidal field or effective curvature) perturbs the delay loop, altering phase closure and stability of rungs.

**Origin of the gradient (model definition):** Gravitation is implemented as an emergent Noether sea response gradient, not as fundamental curvature of the Euclidean void. Dense collections of standard-model assemblies perturb Noether sea density, compliance, stress, effective potential, and terminal-alignment state. The effective gravitational field in this delay-geometry model is the observer-level reconstruction of those coupled gradients.

**Geometry inputs:** Represent this gradient as a scalar control parameter $G_{\text{grad}}$ only in reduced scans, for example a magnitude extracted from Noether sea density/compliance/stress gradients, $\partial_r\Phi_{\text{eff}}$, or a tidal tensor. In simulations, treat $G_{\text{grad}}$ as a declared proxy around the outer-binary orbit and record which Noether sea response channel it compresses.

**Expected effects to test:**
- Differential path delays across the outer orbit (forward vs backward sector).
- Drift in precession cone angle and inter-plane tilt under increasing $G_{\text{grad}}$.
- Shifts in the stability sign $\partial \Phi_n/\partial r$ or loss of plateau behavior.
**Prediction:** Increasing $G_{\text{grad}}$ shifts stable $n$ values and narrows or removes plateaus; strong gradients can pull the terminal alignment inward or erase it.

### C) Exclusion Volume Under Precession (Caveat)

**Implication:** Outer-binary precession sweeps an exclusion region that is larger than a static orbit. The effective exclusion volume is the union of the orbit's causal envelope over a precession cycle, not just a single instantaneous envelope.
This union geometry sets packing and overlap limits by construction, rather than relying on point-particle exclusion rules.

**Modeling at $v>0$:** Use the oblate spheroidal envelope as a time-dependent exclusion region whose axis precesses. The exclusion volume becomes anisotropic and typically increases with precession cone angle.

**As $v_{\text{trans}} \to c_f$:** The envelope flattens toward a disk, so the exclusion volume becomes a thin, swept annulus dominated by the equatorial plane. This tends to amplify planar alignment constraints and reduce accessible 3D configurations.
At sufficiently high stress, this suggests the terminal-rung failure mode to test: further increases may fail to support a stable 3D mode and may force a planar aligned state.

**Status:** This precession-expanded exclusion volume is not explicitly modeled in the minimal system; treat results as lower bounds until the swept-volume effect is added.

### D) Local Cycle-Period Diagnostic

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

### Nested Shell Braid Baseline (Inner + Middle Fixed)

**Focus:** Treat the inner and middle binaries as a formed subsystem with fixed (or slowly varying) center of mass. Track convergence of phase relations and extract $R_{\text{braid}}$, $\omega_{\text{braid}}$, and stable phase offsets. Check repeatability across nearby initial conditions and whether any subsystem element rides $\|\mathbf V\| = c_f$ continuously.

### Outer-Binary Delay Loop Model with Formed Subsystem

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

### Alignment Invariants and Configuration Diagnostics

**Diagnostics (operational):**
- **Inter-plane angles:** $\theta_{ij} = \arccos(\hat{n}_i \cdot \hat{n}_j)$ for $(i,j)\in\{\text{inner, mid, outer}\}$. Track $\max(\theta_{ij})$ over an outer period.
- **Planarity threshold:** Declare “planar aligned” if $\max(\theta_{ij}) < \epsilon_\theta$ for $N$ consecutive outer periods.
- **Precession cone angle:** Let $\hat{n}_{\text{net}}$ be the normalized sum of plane normals. Define $\theta_{\text{cone}} = \max_t \arccos(\hat{n}_{\text{net}}(T)\cdot\langle\hat{n}_{\text{net}}\rangle)$ over one outer period.
- **Rotation test ($SU(2)$ vs $U(1)$):** Evolve the same state under an imposed $2\pi$ spatial rotation and compare the causal configuration $\mathcal{C}(T)$ to the unrotated one (e.g., phase-closure residuals and relative plane phases). If $\mathcal{C}(T)$ matches only after $4\pi$, treat as $SU(2)$-like; if after $2\pi$, treat as $U(1)$-like.
- **Diagnostic hypothesis:** As alignment strengthens, $\theta_{ij}$ and $\theta_{\text{cone}}$ should decrease monotonically; the rotation test should be checked for a possible transition from $4\pi$ to $2\pi$ return.
As alignment increases and planes coincide, the remaining degree of freedom may reduce to a single in-plane phase ($U(1)$-like), consistent with a boson-like terminal configuration only after the rotation test passes.

### Floquet and Grazing Diagnostics

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

## Acceleration-Gradient Branch Comparison

The local dynamics burden behind later equivalence-principle recovery is a substrate comparison, not an observer postulate. A uniformly accelerated assembly and a stationary assembly placed in a matched Noether sea gradient should output compatible delay-geometry records on the same kind of branch packet:
$$
\mathcal{D}_{\mathrm{NSH}}^{\mathrm{accel}}(W)
\sim
\mathcal{D}_{\mathrm{NSH}}^{\mathrm{grad}}(W)
$$
with the comparison made from phase-closure residuals, anisotropy ratios, branch-period records, stability thresholds, and cycle-averaged causal-work or phase-slip variance.

The ambient Noether sea must participate in this comparison. Deforming the assembly alone is not enough, because the gradient-driven case changes the Noether sea response record while the accelerated case changes how the same retained causal-root ledger is transported through absolute time. The downstream observer-inference question is whether those exported packets recover the usual local equivalence behavior. This chapter only asks whether the substrate packets match before that translation.

---

## Routed Extensions

The following items are retained here only as dynamics-facing boundary conditions. Their full proof burdens belong to the broader causal-closure program, not to this chapter.

### Nested Shell Braid Role Hypotheses

An electrino:positrino binary is the most primitive assembly considered in the architecture. The $\mathbb{A}\mathbb{A}\mathbb{A}$ architecture posits that three binaries can become coupled into a nested shell braid, with each binary playing a distinct dynamical role.

Nested shell braid minimality is a theorem target: the working claim is that three coupled shell binaries are the minimal stable closure architecture capable of preserving inner memory, commensurability buffering, and boundary coupling under combined kinematic and gradient stress.

- **Inner binary** (MCB, partner/exterior comparison role): typically in/near self-hit branch ($v \gtrsim c_f$ by history), and would define fundamental units if MCB attractor is confirmed.
- **Middle binary** (partner/exterior comparison role): near the symmetry hinge ($v \approx c_f$), with shell scale and cadence retuning; energy-storage fulcrum and coupling bridge.
- **Outer binary** (partner/exterior comparison role): typically $v < c_f$ with expansion/contraction modes; couples strongly to Noether sea gravitational/cosmological response.
At the terminal-alignment interface, the three binaries are treated as a different regime where forward-sector components approach $c_f$ together; in self-hit interior comparison hypotheses, wake-closure can be described with combined $v_{\text{eff}} > c_f$ without requiring every component speed to exceed $c_f$.

The stronger claim that this architecture supplies the basis for rest mass, observer clock behavior, photon behavior, and standard-model particle families remains a theorem burden for the broader causal-closure program.

### Hinge Equation Sketch

**Equation of motion near the hinge ($v \approx c_f$)** For each architrino $i$ interacting with its partner $j$:
$$
\frac{d^2\mathbf X_i}{dT^2}(T)=\mathbf{a}_{i,j}(T;\{T_{p,k}\})+\mathbf{a}_{i,i}^{\mathrm{active}}(T;\{T_{s,m}\})+\mathbf{a}_{\text{ext}}(T)
$$
with delay constraints (causal roots):
$$
\|\mathbf X_j(T_{p,k})-\mathbf X_i(T)\|=c_f\,(T-T_{p,k}), \quad
\|\mathbf X_i(T_{s,m})-\mathbf X_i(T)\|=c_f\,(T-T_{s,m})
$$
where $\mathbf{a}_{i,i}^{\mathrm{active}}$ is a shorthand for the sum over retained self-hit roots in $\mathcal{C}_{ii}(T)$, not an instantaneous switch $H(s-1)$. Self-hit remains path-history dependent: roots emitted during an earlier super-field-speed interval can stay active after the current speed has changed.
The second constraint is the native small-scale bridge-like causal structure in this sketch: the receiver at $\mathbf X_i(T)$ is linked to an earlier point on the same worldline by its own causal wake. The connectedness is path-history closure in the causal-root ledger, not a tunnel in the Euclidean void. Any connected-geometry translation belongs only after coarse-graining into an effective horizon-interface or metric description.

and $s=\|\mathbf V\|/c_f$. For symmetric, non-translating circular geometry, the delay angles satisfy
$$
\delta_p=2s\cos(\delta_p/2), \qquad \delta_s=2s\sin(\delta_s/2)
$$
with no self-hit solution for $s\le 1$ and a small-root branch $\tilde{\delta}_s\to 0^+$ for $s>1$. The radial/tangential split then reads
$$
\ddot r-r\dot\theta^2=A_{\text{rad}}(\delta_p,\delta_s), \qquad r\ddot\theta+2\dot r\dot\theta=T(\delta_p,\delta_s)
$$
The symmetry breaking at the hinge is geometric: as $\tilde{\delta}_s\to 0^+$ the self-hit radial factor scales like $1/\sin(\tilde{\delta}_s/2)$, turning on a large outward term while the state remains continuous.

The working guess that the self-hit regime may change the effective action-step scale from $\Delta L_c$ to $2\Delta L_c$ is a theorem burden for the broader causal-closure program. This chapter keeps only the local hinge geometry needed to state the dynamical branch condition.

### Black-Hole Regime Note

The detailed black-hole treatment now lives in [../spacetime/black-holes.md](../spacetime/black-holes.md). For the purposes of this dynamics chapter, only the regime summary is needed:

- at the horizon interface, forward-sector components approach terminal alignment near $c_f$;
- in the interior, maximum-curvature and recycling dynamics dominate;
- outward release may later appear as jets, diffuse outflow, or dark-sector radiation channels.

This chapter therefore keeps only the nested shell braid regime map and leaves the ontology, recycling logic, and observer-facing strong-field interpretation to the canonical spacetime chapters.

In the nested shell braid picture, each nested shell braid is a nested stack of three coupled binaries whose internal frequencies and radii are locked by self-hit geometry. This chapter uses that mechanism to define the local dynamics and diagnostics. The coarse-grained metric, observer-clock, and strong-field ontology belong to the spacetime chapters and the causal-closure proof synthesis.

For the strong-field continuation of that story, see [Black Holes](../spacetime/black-holes.md) and [Horizon Chirality](../spacetime/horizon-chirality.md).
