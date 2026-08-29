# Singularity Resolution

This chapter explains what replaces a singularity in the strong-field part of the model. The guiding idea is not that an infinite-density point is hidden behind better coordinates. It is that compact Noether braid assemblies enter a finite maximum-curvature or horizon-interface regime whose boundary data must close. This is the canonical strong-field bridge for [Noether Braid](../noether-braid/noether-braid.md), [A1 Dynamics](../noether-braid/braid-a1-dynamics.md#a1-dynamics), and [Black Holes](./black-holes.md).

The important conversion is from an infinite-endpoint question to a finite-boundary-data question. The strong-field model must say what assembly state is packed, what exterior records remain readable, what boundary data determine continuation, and why no zero-volume or arbitrary branch endpoint is required.

## Canonical Strong-Field Alignment Condition

This chapter is the canonical source for the strong-field event-horizon alignment condition used across spacetime documents. The condition marks the assembly-level state that the effective horizon description is trying to summarize.

Use the following regime definition near the horizon:
$$
v_2=c_f,\qquad v_3\to c_f
$$

[View →](../../../../equation-mapping.html#corpus-equation-c6fce30f92818c9a)
The arrow records approach from ordinary exterior coupling in this declared source record. At terminal alignment, binary 3 reaches the same field-speed threshold as binary 2, all three indexed binary axes become coplanar and co-linear, and precession ceases in that limit. These speed assignments are source-record constraints, not taxonomy-assigned roles.

This condition is a constitutive boundary condition on Noether sea state, not an isolated metric ansatz imported from an asymptotically flat solution. The horizon is therefore treated as an interface problem: what packed assembly state is allowed, what boundary data reach the exterior, and which continuation labels remain finite? In schematic form, the horizon-interface closure problem is
$$
F_H\!\left[
\rho_{\text{NS}}(\mathbf X,T),
\Sigma_{\text{sea}}(\mathbf X,T),
\mathbf u_{\text{sea}}(\mathbf X,T),
\{\lambda_\alpha^{\mathrm{cont}}\}_{\alpha\in I_H};
\partial\Omega
\right]
=0,
\qquad
v_2=c_f,\quad v_3\to c_f
$$

[View →](../../../../equation-mapping.html#corpus-equation-4f383f79d8aeec74)
The boundary data $\partial\Omega$ record the surrounding Noether sea state and effective exterior state, while the finite index set $I_H$ labels the retained strong-field continuations $\{\lambda_\alpha^{\mathrm{cont}}\}_{\alpha\in I_H}$ selected by that record. This is a local generic label slot, not a new Noether braid taxonomy. Specific chapters instantiate it with their own ensembles; for example, [Black Holes](./black-holes.md) uses its horizon-interface label ensemble $\{\lambda_i^H\}$. This display is the canonical statement of the horizon-interface closure problem: other chapters should cite this section and write the shorthand $F_H=0$ rather than restating the argument list. A viable singularity replacement must solve the alignment condition with finite boundary data in embedded, non-isolated settings, rather than relying on asymptotic flatness as an implicit support.

### Observer-Time Boundary

A maximum-curvature interior is not assigned an ordinary physical-observer clock unless a recoverable clock channel survives. At the horizon-interface boundary, exterior records remain ordered by absolute time and by the observer-level clocks recovered outside the compact region. Inside a hard packed regime, the local Noether braid cadence, signal access, and material ruler channels may no longer supply a Physical Observer state. The safe statement is therefore:
$$
\mathrm{Clock}_{\mathrm{PO}}(\Omega_{\mathrm{int}})=\varnothing
$$

[View →](../../../../equation-mapping.html#corpus-equation-359a0483fe300833)
This boundary statement holds while $T$ still orders exterior and boundary records. It prevents a singularity replacement from smuggling in an interior observer time where the required clock-and-ruler carrier has already failed. Absolute time still orders the ontology; a readable interior clock is a separate recovered channel.

### Trapped-Surface Comparison Pressure

Penrose-style singularity theorems are useful here because they remove a misleading loophole: collapse failure cannot be dismissed merely by abandoning exact spherical symmetry. At the effective GR comparison layer, a trapped surface is detected by both future-directed null expansions becoming negative,
$$
\theta_+^{\mathrm{eff}}<0,\qquad \theta_-^{\mathrm{eff}}<0
$$

[View →](../../../../equation-mapping.html#corpus-equation-aaaa15c9e3871b88)
That is a standard-theory warning that weak-field continuation has entered a generic strong-collapse regime. The warning is useful even though the native ontology is not a curved spacetime manifold.

The useful Penrose comparison assumption vector is
$$
\mathcal{A}_{\mathrm{P}}^{\mathrm{eff}}
=
\left(
\theta_+^{\mathrm{eff}}<0,\,
\theta_-^{\mathrm{eff}}<0,\,
\mathrm{NullComplete}^{\mathrm{eff}}_+,\,
T_{\mu\nu}^{\mathrm{eff}}k^\mu k^\nu\ge 0,\,
\mathcal{C}^{\mathrm{eff}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-e11aea80498af2c5)
where $\mathrm{NullComplete}^{\mathrm{eff}}_+$ records future null completeness, $T_{\mu\nu}^{\mathrm{eff}}k^\mu k^\nu\ge 0$ records the non-negative local energy condition along null directions, and $\mathcal{C}^{\mathrm{eff}}$ records the comparison assumption that the effective spacetime is the future development of an initial Cauchy surface with the required global orientation. Penrose's disjunction is then the pressure point: once a trapped surface forms under the local energy and global continuation assumptions, at least one assumption in $\mathcal{A}_{\mathrm{P}}^{\mathrm{eff}}$ must fail if a physical endpoint is to remain nonsingular.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ response is not to import the singularity as ontology. The comparison target is instead
$$
\theta_+^{\mathrm{eff}}<0,\quad \theta_-^{\mathrm{eff}}<0
\quad\Longrightarrow\quad
F_H=0,\qquad \mathcal{R}_H(\Omega)<\infty
$$

[View →](../../../../equation-mapping.html#corpus-equation-f9e38d953cf846d8)
for the corresponding compact strong-field region $\Omega$, after the effective variables are translated into native Noether sea boundary data. In plain terms, whenever the observer-level GR description says collapse has passed the generic trapped-surface threshold, the native model must enter a finite maximum-curvature or horizon-interface regime rather than requiring symmetry, a zero-volume endpoint, or an arbitrary branch choice.

Let $\mathcal B_H$ denote the finite set of horizon-interface closure labels selected by that compact region's retained boundary-wake, path-history, and Noether sea record. It is an output of the strong-field continuation, not an independently chosen microstate inventory.

Equivalently, let the trapped-region premise be
$$
\mathcal{P}_{H}^{\mathrm{trap}}(\Omega)
=
\left(
\theta_+^{\mathrm{eff}}<0,\,
\theta_-^{\mathrm{eff}}<0,\,
T_{\mu\nu}^{\mathrm{eff}}k^\mu k^\nu\ge 0,\,
\mathcal{C}^{\mathrm{eff}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-4c76456466669c24)
When this premise holds, the finite-boundary-data replacement target is not to preserve future null completeness as a substrate axiom. It is to supersede that effective global-completeness failure with
$$
F_H=0,\qquad
\mathcal{R}_H(\Omega)<\infty,\qquad
0<\left|\mathcal{B}_{H}\right|<\infty
$$

[View →](../../../../equation-mapping.html#corpus-equation-45bcbe749873a7df)
The theorem burden is not to deny the trapped-surface comparison result. It is to show exactly which effective global-completeness assumption is superseded by compact Noether sea boundary data, while preserving the non-negative local energy comparison and producing a finite, labeled strong-field continuation.

Critical collapse adds a sharper threshold benchmark. In the Choptuik scalar-collapse comparison, a one-parameter family of effective initial data has a critical value $p_*$ separating dispersal from black-hole formation. Near that threshold the standard comparison exhibits mass scaling
$$
M_{\mathrm{BH}}\propto(p-p_*)^\gamma
$$

[View →](../../../../equation-mapping.html#corpus-equation-ba3c43afd2c58cf9)
and discrete self-similarity,
$$
Z(\tau+\Delta,x)=Z(\tau,x),
$$

[View →](../../../../equation-mapping.html#corpus-equation-cc3067a4576727a3)
for the effective fields $Z$ in logarithmic collapse coordinates. Recent large-$D$ analytic work (Emparan-class) is useful because it turns part of that threshold structure from a purely numerical GR pattern into a formula-controlled comparison family. The $\mathbb{A}\mathbb{A}\mathbb{A}$ recovery target is not a literal crystallization of substrate spacetime. It is to show that the finite-boundary-data transition has a controlled threshold, a repeatable echoing or cadence row when the effective comparison requires one, and a finite continuation family on the compact-region side of the threshold.

### Finite-Boundary-Data Regularity

The useful comparison lesson from analytic singularity-removal programs is not an imported mirror boundary or complex-time ontology. It is the regularity criterion. A candidate strong-field replacement must keep the native variables finite and the continuation rule unambiguous in the regime where the effective metric description would otherwise diverge.

For a compact strong-field region $\Omega$, declared positive reference scales $\rho_{\text{NS},0}$ and $\Sigma_0$, and field speed $c_f$, a minimal dimensionless diagnostic at absolute time $T$ is
$$
\mathcal{R}_H(\Omega,T)
=
\max\left\{
\sup_{\mathbf X\in\Omega}
\frac{\left|\rho_{\text{NS}}(\mathbf X,T)\right|}{\rho_{\text{NS},0}},
\sup_{\mathbf X\in\Omega}
\frac{\left\|\Sigma_{\text{sea}}(\mathbf X,T)\right\|}{\Sigma_0},
\sup_{\mathbf X\in\Omega}
\frac{\left\|\mathbf u_{\text{sea}}(\mathbf X,T)\right\|}{c_f}
\right\}
<\infty
$$

[View →](../../../../equation-mapping.html#corpus-equation-030889988c444778)
A windowed statement writes $\sup_{T\in W}\mathcal{R}_H(\Omega,T)<\infty$; the shorthand $\mathcal{R}_H(\Omega)<\infty$ means this rowwise normalized diagnostic is finite on the declared single-time or windowed comparison. It is used together with the horizon-interface condition $F_H=0$ and a finite Noether braid closure-label ensemble. This is a theorem target, not a definition of success. The strong-field model must show that finite boundary data determine a finite maximum-curvature replacement rather than a zero-volume endpoint or an arbitrary branch choice.

The packed-state replacement must also keep interior storage distinct from interface exposure. A dense interior may carry a large finite energy inventory while only the surface, defect, or horizon-interface rows couple efficiently to exterior clock, ruler, lensing, release, or dark-sector readouts. In ordinary terms, not everything stored inside is automatically visible outside. For a compact region $\Omega$, write the exposed response schematically as
$$
E_{\mathrm{ext}}(\Omega)
=
\Pi_{\mathrm{surf}}
\!\left[
E_{\mathrm{pack}}(\Omega),
\partial\Omega,
\mathcal{D}_{\mathrm{defect}},
\theta_{\mathrm{sea}}
\right],
$$

[View →](../../../../equation-mapping.html#corpus-equation-cd057f234b5e164c)
where $\Pi_{\mathrm{surf}}$ is an exposure projection rather than an energy source. The closure burden is to derive this projection from packing, interface, and Noether sea boundary data. Without that split, a model risks counting hidden packed energy as ordinary exterior mass in one paragraph and shielding it in the next.

A sharper endpoint criterion is that those same finite data admit a continuation map
$$
\mathcal{T}_{\Omega}:
\left(
X_\Omega(T_i),
\mathcal{H}_{\Omega}^{<T_i},
\mathcal{B}_{\partial\Omega}|_{[T_i,T_f]},
\mathcal N_{\text{sea}}|_{\Omega\times[T_i,T_f]}
\right)
\longmapsto
X_\Omega(T_f)
$$

[View →](../../../../equation-mapping.html#corpus-equation-52a62bd8b42d6296)
with
$$
F_H=0,\qquad
\mathcal{R}_H(\Omega)<\infty,\qquad
0<\left|\mathcal{B}_{H}\right|<\infty
$$

[View →](../../../../equation-mapping.html#corpus-equation-45bcbe749873a7df-2)
This is the singularity-resolution form of the black-hole endpoint gate. The replacement must be finite, ledger-preserving, and non-arbitrary using compact boundary data, without importing a remnant, bounce, or asymptotic boundary condition as doctrine.

### Cauchy-Horizon Comparison Pressure

GR Cauchy-horizon and cosmic-censorship language is useful here only as comparison pressure. It asks whether an effective initial-data surface has a unique global continuation or whether the observer-level spacetime description admits extensions not determined by that surface. In $\mathbb{A}\mathbb{A}\mathbb{A}$ the substrate answer is not to import global hyperbolicity as an axiom. The native answer must show that the finite region record selects a finite admissible continuation family.

Write $\mathcal L_{E\mathbf p\mathbf J}$ for the same-record ledger of observer-calibrated energy, linear momentum, and angular momentum transfers across the compact-region boundary. Saying that it closes means that every retained interior, interface, and exported channel is accounted for within the declared tolerance.

For the same compact region $\Omega$ and interval $W=[T_i,T_f]$, define the accepted strong-field continuation family
$$
\mathfrak{S}_H(\theta_{\partial\Omega,W})
=
\left\{
\left(X_\Omega(T_f),\mathcal{B}_H(T_f)\right)
:
F_H=0,\quad
\sup_{T\in W}\mathcal{R}_H(\Omega,T)<\infty,
\quad
\mathcal{L}_{E\mathbf{p}\mathbf{J}}\ \text{closes}
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-370a86843d895ea2)
The Cauchy-horizon comparison burden is
$$
0<\left|\mathfrak{S}_H(\theta_{\partial\Omega,W})\right|<\infty
$$

[View →](../../../../equation-mapping.html#corpus-equation-907efe847cf3ef62)
with every element carrying a closure label, finite horizon-interface ledger, and event-ledger accounting. The count matters. An empty family means no native continuation has been supplied. An infinite or unlabeled family means the endpoint remains arbitrary. A finite labeled family is admissible only if later observer-level release, entropy, and exterior $(M,\mathbf{J},Q)$ records are computed from those same finite boundary data.

Stationary regularity is only the first test. A horizon construction may keep curvature invariants finite in an eternal or stationary comparison metric while still failing during collapse, merger, evaporation, or embedding in a time-dependent Noether sea. The dynamical gate is therefore stronger:
$$
\theta_+^{\mathrm{eff}}<0,\quad \theta_-^{\mathrm{eff}}<0
\quad\Longrightarrow\quad
F_H(T)=0,\qquad
\sup_{T\in[T_i,T_f]}\mathcal{R}_H(\Omega,T)<\infty,
\qquad
0<\left|\mathcal{B}_{H}(T_f)\right|<\infty
$$

[View →](../../../../equation-mapping.html#corpus-equation-a685629d5b5b6a62)
with the same finite boundary data driving the transition across the whole interval. A result that proves regularity only for an isolated stationary exterior remains a comparison result until it supplies this dynamical continuation.

Recent regular-horizon cosmological-coupling constructions (Croker–Farrah-class) sharpen this warning. They show that horizon regularity in an embedded compact-object model depends on handling the cosmological background, apparent-horizon condition, and local/cosmological mass split together; a nonsingular core or stationary exterior is not enough by itself. The native lesson is not to import an anisotropic-fluid metric as ontology. The lesson is that the continuation map above must carry embedding-state backreaction inside $\theta_{\partial\Omega,W}$ and must not evaluate $\mathcal{R}_H(\Omega,T)$ only in an isolated stationary chart.

## Maximal Curvature vs Planck Scale

In the working indexed chart, **binary 1** is assigned the maximal-curvature self-hit regime as a proposed outward barrier against continued collapse. Circular self-hit does not supply centripetal support; any stabilized outcome requires the complete partner, self, wake-boundary, and return-map ledger. **Binary 2** is constrained to the field-speed row ($v_2=c_f$), with **scale and cadence retuning**, as a candidate energy-storage channel for transfers across the candidate braid record. Neither role selects a taxonomy member or is established as a retained mechanism.

In the same working source record, strong-field conditions increase **binary 3's frequency** and drive $v_3$ toward field speed, while **binary 2** remains at $v_2=c_f$ as its radius and frequency shift. The full indexed row is
$$
v_1=v_1^{\mathrm{br}}(T),\qquad
v_2=c_f,\qquad
v_3\to c_f,
$$

[View →](../../../../equation-mapping.html#corpus-equation-b4b86991e381dff4)
where the branch-measured $v_1^{\mathrm{br}}$ carries no universal field-speed assignment and the proposed binary-1 interior mechanism separately requires an admissible same-transmitter self-hit root. At the horizon-interface limit, binaries 2 and 3 reach $c_f$, all three indexed axes align, and precession ceases. This is a prescribed closure target, not a retained-branch result.

One preserved intuition, to be read only as a heuristic, is that this alignment limit may correspond to a temporary **planar horizon state** rather than to the final interior shape. In that picture, the horizon is the point of strongest flattening, while deeper interior self-hit response can reopen the suppressed polar degree of freedom so the Family-A braid returns to a finite 3D configuration instead of terminating in a zero-volume endpoint. This is compatible with the maximum-curvature replacement logic, but it is not yet a derived mechanism; compare [Horizon Chirality and Planar Spin](./horizon-chirality.md).

**Mapping rule:** "Planck-scale" references and the **event-horizon alignment condition** are separate comparison objects unless an explicit derivation supplies their scale map. The field-speed rows are necessary alignment indicators, not a Planck-scale identification or a self-hit proof by themselves; the admitted branch still needs same-transmitter root existence, transversality/Jacobian control, transmitter-side acceleration weight, and retained ledger closure.
