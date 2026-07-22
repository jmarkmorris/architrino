# Ontology

Ontology asks a simple question: what is actually there before an observer names it, measures it, or compresses it into a model?

For $\mathbb{A}\mathbb{A}\mathbb{A}$, the answer has layers. At the bottom are absolute time, the Euclidean void, and architrinos. Above that are assemblies, causal wakes, and the Noether sea. Above that are effective fields, particles, clocks, rulers, metrics, and observer records. The main rule of this chapter is that those layers must not be mixed.

This chapter is the bedrock map. It says what exists at the substrate level, what emerges from assembly and medium behavior, and which terms must stay level-aware for the rest of the corpus to remain coherent.

---

## Purpose and Scope

This document establishes the ontological bedrock of $\mathbb{A}\mathbb{A}\mathbb{A}$: what fundamentally exists, what is emergent, and what Physical Observers reconstruct from inside the system.

It defines six foundation routes:

1. **The Substrate**: [absolute time](./absolute-time.md), [Euclidean void](./euclidean-void.md), and [absolute timespace](./absolute-timespace.md).
2. **The Fundamental Entity**: [architrino](./architrino.md), the point transceiver of potential-bearing causal wakes.
3. **The Physical Medium**: [Noether sea](../spacetime/noether-sea.md), the emergent physical medium formed by coupled neutral Noether braid assemblies.
4. **The Observer Framework**: [complete-state versus Physical Observer access](../spacetime/observer-framework.md).
5. **Terminology Discipline**: [canonical level-aware terminology](../archie/terminology-usage.md).
6. **Parameter Ledger**: [fundamental postulates versus derived quantities](../validation/parameter-ledger.md).

The point is not to make every later result true by definition. The point is to keep the starting inventory clean. Dynamics, assembly mappings, particle families, effective spacetime, and cosmology all depend on these foundations. If the level assignment is wrong here, the error propagates everywhere else.

The teaching order uses four levels:

| Level | Plain meaning | Typical examples |
|:---|:---|:---|
| Substrate ontology | What exists before observer reconstruction. | Absolute time, Euclidean void, architrino identities, intrinsic polarity, causal-wake support. |
| Assembly and medium behavior | What organized architrino configurations do. | Noether braids, stable branches, Noether sea density, stress, flow, and response. |
| Effective description | What observers can summarize as familiar physics. | Metric, field, particle, mass, charge, clock, ruler, and potential language. |
| Observer inference | What embedded Physical Observers can actually record. | Detector records, clock readings, coincidence windows, spectra, quantum states, and coarse histories. |

This ontology also has a boundary. It states the internal bedrock of $\mathbb{A}\mathbb{A}\mathbb{A}$. It does not claim to explain why absolute time, the Euclidean void, the architrino identity set, $c_f$, or $\kappa$ exist rather than not exist. Those are primitive postulates inside the present theory unless a separate meta-ontological account is supplied.

That distinction matters. Deriving particles, fields, clock behavior, and effective spacetime from architrino dynamics is one kind of explanation. Explaining why the substrate itself exists is a different kind of claim.

The same level discipline can be read through the canonical symbol map:

| Level | Canonical variables or records | Owning chapters |
|:---|:---|:---|
| Substrate ontology | $T$, $\Sigma_T$, $h_{ij}$, $\mathbf X_a(T)$, $q_a$, causal-wake support | [Absolute Time](./absolute-time.md), [Euclidean Void](./euclidean-void.md), [Absolute Timespace](./absolute-timespace.md), [Architrino](./architrino.md) |
| Assembly and medium behavior | assembly branch records, $\Lambda_{\text{NS}}$, $\rho_{\text{NS}}(\mathbf X,T)$, $\Sigma_{\text{sea}}(\mathbf X,T)$, $\mathbf u_{\text{sea}}(\mathbf X,T)$ | [Noether Braid](../noether-braid/noether-braid.md), [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md), [Noether sea](../spacetime/noether-sea.md) |
| Effective description | $A(\mathcal{N}_{\mathrm{sea}})$, $B_{ij}(\mathcal{N}_{\mathrm{sea}})$, $u^i_{\mathrm{sea,eff}}$, $g^{\text{eff}}_{\mu\nu}$, $\Phi_{\text{eff}}$ | [Emergent Metric](../spacetime/emergent-metric.md), [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md), [Particle Masses](../assemblies/particle-masses.md) |
| Observer inference | $\Pi_{\mathrm{obs}}:S(T)\to\bar S(T)$, Physical Observer records $\Theta_A^{(O,W)}$, detector and measurement records | [Observer Framework](../spacetime/observer-framework.md), [Wavefunction Ontology](../quantum/wavefunction-ontology.md), [Measurement Ontology](../quantum/measurement-ontology.md) |

Equivalently, the four levels form a tower of forgetting maps:
$$
S(T)
\xrightarrow{\Pi_{\mathrm{assembly}}}
\mathfrak B(T)
\xrightarrow{\Pi_{\mathrm{eff}}}
\big(A,B_{ij},g^{\mathrm{eff}},\Phi_{\mathrm{eff}}\big)
\xrightarrow{\Pi_{\mathrm{record}}}
\bar S(T).
$$
Here $\mathfrak B(T)$ denotes the retained assembly and branch records and $\Pi_{\mathrm{record}}$ is the final record-extraction arrow. The canonical observer projection is the composite $\Pi_{\mathrm{obs}}=\Pi_{\mathrm{record}}\circ\Pi_{\mathrm{eff}}\circ\Pi_{\mathrm{assembly}}:S(T)\to\bar S(T)$, matching the definition in [Architrino](./architrino.md#provenance-and-persistence). Pullback of retained information along the tower induces a decreasing filtration on $S(T)$. Each arrow keeps some information and discards some information. Individual provenance labels, path-history depth, inactive branch alternatives, fine assembly coordinates, medium microstate, and apparatus-inaccessible records may be lost at different stages.

A quantity is well-defined at a level only if it survives the corresponding forgetting map. A residual measures failure to survive that quotient. Examples include provenance leakage $\epsilon_{\mathrm{prov}}$, branch or record residuals $\mathcal R_{\mathcal Q}$, clock-composition residuals $\Delta^{\mathrm{comp}}$, and clock-universality residuals $\epsilon_{\mathrm{univ}}$. This is why level discipline is not only vocabulary discipline. It decides which invariants remain meaningful after a projection.

Many projections also need regularity. A reconstruction or projection map is locally usable only where its active inverse has a declared non-degeneracy floor. The root chart uses $|\partial_{T_t} F|\ge\kappa_{\mathrm{hit}}>0$, where $F$ is the causal-root function defined in The Fundamental Entity below and owned by [Master Equation](../dynamics/master-equation.md); frame construction uses a basis-conditioning floor such as $\sin\theta_{\min}>0$; wake-center reconstruction uses a finite solid-angle floor; basin partitions use separatrix regularity; and clock extraction requires a retained hyperbolic limit cycle with a unique rotation number.

The shared theorem target is a reconstruction-regularity lemma: away from the generically codimension-1 floor-failure locus, the relevant map has controlled local inverse behavior. At the floor failure, the theory must report a residual, branch jump, or reconfiguration event rather than silently reusing a smooth chart.

Two distinctions govern the rest of this hub.

First, primitive substance is not the same as emergent matter. The architrino is primitive substance. Matter begins only when assemblies acquire mass, exclusion, persistence, and organized branch behavior.

Second, physical reality is not the same as independent material inventory. Causal wakes are physically real, finite-speed, potential-bearing causal records. They are not an extra material ingredient floating in the void. Their content is fixed by transmitter identity, polarity, and path history.

A conservative entry criterion for emergent matter status is therefore two-part. A stable assembly $A$ must carry a nonzero closed internal causal-history energy ledger $E_{\text{internal}}(A) > 0$ as defined in [Energy](../dynamics/energy.md), and it must carry an assembly-level exclusion record protected by retained curve-configuration topology plus a branch-preserving action or energy barrier. The Euclidean void supplies no ambient topological superselection. The protected data must be carried by the assembly itself, for example by an oblate spheroidal exclusion envelope together with the ordered-frame, framed linking, or causal-writhe data needed for fermionic matter, and by a nonzero barrier $\Delta E_{\mathrm{excl}}>0$ against deformation through the forbidden branch. This is an entry criterion for the mass-map and exclusion programs, not a completed derivation of particle masses or spin-statistics.

## The Substrate

The substrate is what $\mathbb{A}\mathbb{A}\mathbb{A}$ treats as fundamental. It is not what a local observer necessarily sees. It is the underlying stage and primitive inventory from which observer-level physics must be reconstructed.

### Absolute Time

[Absolute Time](./absolute-time.md) is the canonical substrate-level specification of the universal time parameter $T$. It defines time as a one-dimensional, continuous, oriented, non-dynamical continuum $\mathbb{R}$ with absolute event ordering, no kinematic time dilation, no relativity of simultaneity, and no reparametrization freedom beyond unit choice and origin choice: constancy of $c_f$ and form-invariance of the receiving law pin $T$ to its affine class.

In this ontology hub, the key commitment is:

> **Postulate 1 (Absolute Time):** Time is an absolute, universal, one-dimensional continuum $\mathbb{R}$ with fixed orientation, a scale anchored by the constant primitive wake speed $c_f$ and the receiving law, frame-independent duration, non-dynamical status, and no substrate-level time dilation or relativity of simultaneity. Dynamics occur through finite-speed causal-wake propagation ($c_f$) in absolute time, with all interactions routed through path history rather than instantaneous action-at-a-distance or advanced effects; worldlines are parametrized directly by $T$, with no reparametrization freedom beyond unit choice and origin choice.

This postulate is not a claim that embedded clocks all read the same rate. Clock slowing, synchronization offsets, and proper-time readings belong to assembly and Noether sea dynamics at the observer-accessible level.

For the argumentative case, see [Absolute Time Defense](./absolute-time-defense.md). For observer-level clocks and dilation, see [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md).

### Euclidean Void

[Euclidean Void](./euclidean-void.md) is the canonical substrate-level specification of the fixed spatial container. It defines three-dimensional space as flat, homogeneous, isotropic, non-dynamical $\mathbb{R}^3$ with metric $h_{ij}=\delta_{ij}$, fixed coordinate identity, Euclidean distance, spatial operators, and Euclidean symmetry group $E(3)$.

In this ontology hub, the key commitment is:

> **Postulate 2 (Euclidean Void):** Space is an absolute, static, flat, homogeneous, isotropic container $\mathbb{R}^3$ with fixed Euclidean metric $h_{ij}=\delta_{ij}$. Curvature-like observations arise from contents, wakes, and dynamics inside the void, not from curvature of the void itself.

This is a container claim. It does not deny that observers can reconstruct curved effective geometry. The Noether sea is physical content within the void, not the void itself. For the Noether sea branch, see [Noether sea](../spacetime/noether-sea.md), [Noether Sea Pro/Anti Coupling](../spacetime/noether-sea-pro-anti-coupling.md), and [Emergent Metric](../spacetime/emergent-metric.md).

### Absolute Timespace

[Absolute Timespace](./absolute-timespace.md) is the canonical product-structure specification for the background arena $\mathcal{M}=\mathbb{R}\times\mathbb{R}^3$. It owns the foliation into simultaneous Euclidean slices, the separated clock-form/spatial-metric data $(dT,h)$, Galilean kinematic structure, product measures and spatial operators, and causal wake geometry.

In this ontology hub, the key commitment is:

> **Postulate 3 (Absolute Timespace):** The background arena is the product manifold $\mathcal{M}=\mathbb{R}\times\mathbb{R}^3$, equipped with the exact substrate clock form $dT$ and Euclidean spatial metric $h_{ij}=\delta_{ij}$, foliated by absolute-time slices $\Sigma_T$. The background is non-dynamical and non-curved; causality is ordered by $T$ and constrained by finite wake speed $c_f$. The product background preserves Galilean kinematic structure, while the interaction law, by fixing the wake speed $c_f$ relative to the void, structurally distinguishes the void rest frame.

The product notation packages the substrate clock and the spatial container. It does not introduce a non-degenerate four-dimensional metric as primitive ontology. Relativistic spacetime language enters only after medium response, clock/ruler behavior, and signal reconstruction have been derived or modeled.

For the factor-level specifications, see [Absolute Time](./absolute-time.md) and [Euclidean Void](./euclidean-void.md). For the observer-level metric bridge, see [Emergent Metric](../spacetime/emergent-metric.md).

---

## The Fundamental Entity

[Architrino](./architrino.md) is the canonical primitive-entity specification for $\mathbb{A}\mathbb{A}\mathbb{A}$. It defines the architrino as a point transceiver in absolute timespace with definite polarity, persistent identity, continuous causal-wake emission, universal wake reception, and non-creation/non-destruction at the ontological level.

The architrino is the sole primitive material substance of the theory. That does not make an isolated architrino a matter particle. Rest mass, spatial exclusion, fermionic behavior, and particle species are downstream assembly properties.

The same caution applies to exchange behavior. Fermion and boson exchange labels are assembly-level recovery targets, not inserted projector postulates. Any effective antisymmetric or symmetric exchange label must be routed through a retained branch record, currently the ordered-frame spinor program and the Noether braid closure label $\Lambda_{\text{NS}}$.

The hard wall is the two-assembly exchange loop. An exchange of two identical braids is a loop in the configuration space of retained assembly configurations, not in the topology of the ambient void. The ambient quotient does supply a candidate loop class: for two identical centers in $\mathbb{R}^3$, the unordered coincidence-free configuration space has fundamental group $\mathbb{Z}_2$ generated by the exchange loop, the Leinaas-Myrheim/Laidlaw-DeWitt class. What the void does not supply is superselection: nothing forces a recovered effective state to transform nontrivially around that loop. The fermionic route must therefore establish two facts about the retained dynamics. The dynamically retained framed two-assembly component must not trivialize the exchange class after the allowed quotient, and the recovered effective state bundle must carry holonomy $-1$ around it. If either fails, whether the class dies in the retained component or the holonomy is trivial, the antisymmetric projector has not been recovered from assembly dynamics and would have to be inserted at the effective level. The generic failure mode is trivial holonomy, not a missing loop class.

The architrino's intrinsic polarity is also not the full observer-level charge record. Electric, weak, color, and particle labels are effective bookkeeping to be recovered from assembly geometry and medium response.

The emitted causal wake is not another primitive substance, but it is real. It is the source-dependent, potential-bearing causal record by which path history becomes delayed interaction.

For an architrino $a$ with worldline $\mathbf X_a(T)$ on time domain $I_a$ and polarity $q_a$, the wake may be read schematically as a functional of that transmitter history:
$$
\mathcal{W}_a(\mathbf X,T)
=
\int_{\{T_t\in I_a:\ T_t<T\}}
q_a\,
K\!\left(\mathbf X,T;\mathbf X_a(T_t),T_t\right)
\,dT_t,
\qquad
\operatorname{supp}K
\subseteq
\left\{\|\mathbf X-\mathbf X_a(T_t)\|=c_f(T-T_t)\right\}
$$

The $dT_t$ integral is schematic because the support condition selects causal roots of $F_a(\mathbf X,T;T_t)=\|\mathbf X-\mathbf X_a(T_t)\|-c_f(T-T_t)$ rather than an ordinary interval of source times. In the Master Equation this is implemented by a surface-delta or root-sum expression with the simple-root transversality floor $\lvert\partial_{T_t}F_a\rvert \ge \kappa_{\mathrm{hit}} > 0$; if that floor fails, the contribution belongs to branch-chart or regularization analysis rather than to this ontology-level functional. The floor has a direct physical reading: on the wake support, $\partial_{T_t}F_a = c_f-\hat{\mathbf r}\cdot\mathbf V_a(T_t)$, the transmitter-side factor derived in [Absolute Timespace](./absolute-timespace.md#causal-wake-geometry), so floor failure is the caustic condition in which the source closes on the receiver at the wake speed along the line of sight: the same zero that makes the Lienard-Wiechert delayed-potential denominator diverge in classical electrodynamics, and a generic occurrence for super-wake-speed sources. In this ontology-level wake functional the kernel's source dependence is written through the emission-time position $\mathbf X_a(T_t)$ only; transmitter emission-velocity dependence enters through the root-sum Jacobian $1/\lvert\partial_{T_t}F_a\rvert$, i.e. the inverse transmitter-side factor, not through additional kernel arguments. The full transceiver acceleration law separately carries the transmitter-side acceleration weight $W_{ij}^{\mathrm{acc}}$; both factors are owned by the [Master Equation](../dynamics/master-equation.md).

This formula is a level assignment, not a replacement for the Master Equation. It states the dependency: once transmitter identity, polarity, and path history are fixed, no additional freely specifiable wake substance remains. Effective field language may summarize many wake contributions, but the substrate account remains source-provenanced causal-wake history.

In this ontology hub, the key commitment is:

> **Postulate 4 (Architrino):** The architrino is the sole primitive entity of $\mathbb{A}\mathbb{A}\mathbb{A}$: a point transceiver in absolute timespace with definite polarity, persistent identity, continuous causal-wake emission, universal wake reception, and non-creation/non-destruction at the ontological level. The set of architrino identities is fixed. Particles, effective fields, clock behavior, and emergent spacetime phenomena arise from architrino configurations, wake intersections, and assembly dynamics rather than from additional fundamental substances.

For the full primitive-entity page, see [Architrino](./architrino.md). For the receiving-law derivation, see [Master Equation](../dynamics/master-equation.md). For assembly emergence, see [Emergence](./emergence-of-structure.md) and [Noether Braid](../noether-braid/noether-braid.md).

---

## The Physical Medium

[Noether sea](../spacetime/noether-sea.md) is the canonical medium-ontology page. It defines the Noether sea as the emergent physical medium formed by coupled neutral Noether braid assemblies occupying the Euclidean void.

This is the first step away from primitive ontology. The Noether sea is physically real content, but its variables are medium and assembly variables rather than new container geometry.

In this ontology hub, the key commitment is:

> **Medium Commitment (Noether sea):** The Noether sea is physical content inside the Euclidean void, not the void itself. It carries density, stress, energy, orientation, flow, and response properties. Effective gravity, clock and ruler behavior, signal delay/refraction, inertia, and cosmological behavior are reconstructed from Noether sea dynamics and assembly coupling, not from curvature or expansion of the void.

The routing boundary is:

- [Noether sea](../spacetime/noether-sea.md) owns medium ontology, state variables, and terminology.
- [Noether Sea Pro/Anti Coupling](../spacetime/noether-sea-pro-anti-coupling.md) owns pro/anti coupling hypotheses and medium assembly motifs.
- [Emergent Metric](../spacetime/emergent-metric.md) owns the map from medium variables to effective metric language.
- [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md) owns clock and ruler behavior.
- [Cosmology Ontology](../cosmology/cosmology-ontology.md) owns the cosmology-level interpretation of Noether sea evolution.

## The Observer Framework

[Observer Framework](../spacetime/observer-framework.md) is the canonical page for the $\mathbb{U}_{\text{now}}$ universe-state perspective, Physical Observers, the ontic/epistemic distinction, and absolute-versus-operational simultaneity.

The complete ontic state is the absolute-time slice $\mathbb{U}_{\text{now}}\equiv S(T)$. A Physical Observer samples only a constrained record inside that state, using clocks, rulers, and signals whose behavior is itself produced by assembly and Noether sea dynamics.

In this ontology hub, the key commitment is:

> **Observer Commitment:** $\mathbb{A}\mathbb{A}\mathbb{A}$ distinguishes the complete ontic state on an absolute-time slice from the measurements available to embedded Physical Observers. Physical Observers are assemblies inside the Noether sea, so their clocks, rulers, synchronization procedures, and records are dynamical outputs. Effective relativity and quantum state descriptions belong to this observer-accessible layer, not to the primitive substrate itself.

There is no observer outside the ledger. A Physical Observer's records are themselves entries inside $S(T)$. Inference is therefore an internal subsystem reconstructing a coarse description from its own accessible records, not a second-level spectator reading the complete state without constraint.

Observer descriptions can be indispensable without being final ontology. Effective metric reconstruction, wave function transition, and particle records are inferential summaries of accessible interactions. They do not replace the substrate and assembly account.

### Bell Nonlocality Placement

Bell-family experiments are treated as a hard observer-level correlation constraint on any deterministic completion. They are not treated as evidence by themselves for ontological randomness, backward causation, or faster-than-$c_f$ signal transfer.

The complete state on $\Sigma_T$ remains definite in the $\mathbb{U}_{\text{now}}$ universe-state perspective. A Physical Observer has access only to pair records, detector settings, coincidence windows, and statistical summaries.

The no-go guardrail is strict. If measurement independence, no advanced influence, finite-speed local response, and local factorization over a complete past-state variable $\lambda$ are all retained, then the Bell-local factorization is restored and Bell violations cannot be recovered. The Bell bridge must choose and declare which Bell assumption fails. A foundation page may route that burden, but it must not imply that shared provenance alone solves Bell.

The placement is therefore level-specific. If $\mathbb{A}\mathbb{A}\mathbb{A}$ preserves measurement independence and no-signaling at the observer level, then Bell violation must come from an explicitly nonseparable substrate response, such as a $c_f$-mediated coordination channel outside effective light cones with no-signaling shielding, or another declared nonseparable mechanism.

A $c_f$-mediated option is a substantive hierarchy claim. The primitive coordination channel must lie outside the observer photon cone, so $c_f > c_0$ after the low-energy photon speed $c_0$ is calibrated. Any stronger hierarchy such as $c_f \gg c_0$ must be reconciled with photon dressing, moving-assembly Lorentz closure, and clock/ruler universality. It must also evade the finite-speed hidden-influence obstruction: finite superluminal influences with $c_0 < v < \infty$ can become operationally signaling in multipartite Bell scenarios.

The observer-level compression must fail the factorizable local-response form
$$
P(a,b\mid \hat{m}_A,\hat{m}_B,\lambda)
=
P(a\mid \hat{m}_A,\lambda)\,
P(b\mid \hat{m}_B,\lambda)
$$
without adding instantaneous causal influence between detectors. If instead measurement independence is relaxed, that relaxation must be stated quantitatively, and the text must not also claim exact measurement independence.

These options are mutually exclusive at the bridge level:

- **Substrate nonseparability:** retain strict measurement independence and no-signaling; Bell violation is recovered through nonfactorizable pair-provenance and apparatus-response coupling.
- **Controlled relaxation of measurement independence:** relax measurement independence in the declared substrate response variables; the relaxation must be bounded to prevent macroscopic backward causation or signaling claims.

Working selection, still provisional until the Bell derivation closes: $\mathbb{A}\mathbb{A}\mathbb{A}$ follows the substrate-nonseparability route. That means measurement independence and observer no-signaling are retained, while Bell nonfactorizability is carried by a live substrate-causal $c_f$ coordination channel, gated by pair provenance. Controlled measurement-independence relaxation remains a comparison or failure route, not the active ontology-hub selection.

A mere shared-source story is not enough. If the retained provenance screens the two detector wings into independent local laws, the account has fallen back into the Bell-local class. Any shared record, including a framed pair-braid or linking invariant, is part of the complete past-state variable $\lambda$; if each wing's response remains a local function of its own setting and that record, Bell factorization returns and the correlation stays inside the Bell-local bound. The active route therefore assigns the two roles explicitly: pair provenance gates the live $c_f$-mediated apparatus-response coupling, and the live channel carries the nonfactorizability. During the measurement window the coupled response law must fail the product form while leaving each one-wing marginal setting-independent. Coordination outside the effective photon cone is allowed when $c_f > c_0$; faster-than-$c_f$ influence and controllable observer signaling remain forbidden. This makes the finite-speed hidden-influence obstruction a real closure burden rather than a footnote: the route predicts either measurable degradation toward the Bell-local bound when the $c_f$ channel cannot connect the wings during the measurement window, or an $\mathbb{A}\mathbb{A}\mathbb{A}$-specific derivation showing why that obstruction is evaded while preserving no-signaling. The detailed derivation and residual tests belong to [Bell's Theorem](../philosophy-history/theory-bridges/bell-theorem.md) and [Entanglement and Nonlocality](../philosophy-history/theory-bridges/entanglement-nonlocality.md).

The routing boundary is:

- [Observer Framework](../spacetime/observer-framework.md) owns complete-state versus Physical Observer access.
- [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md) owns observer clocks, clock slowing, and $t\mapsto\tau$ extraction.
- [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) owns moving-assembly deformation, clock/ruler retuning, two-way signal synchronization, and preferred-frame leakage bounds.
- [Emergent Metric](../spacetime/emergent-metric.md) owns metric reconstruction from observer clocks, rulers, and signals.
- [Wavefunction Ontology](../quantum/wavefunction-ontology.md) and [Measurement Ontology](../quantum/measurement-ontology.md) own quantum-state and measurement descriptions at the observer-accessible layer.
- [Bell's Theorem](../philosophy-history/theory-bridges/bell-theorem.md) and [Entanglement and Nonlocality](../philosophy-history/theory-bridges/entanglement-nonlocality.md) own Bell-family correlation recovery, no-signaling, measurement-independence, pair-provenance closure tests, and the Bancal finite-speed-influence no-signaling obstruction.

## Terminology Discipline

Terminology discipline is controlled by the Archie canon, not by this hub. The relevant references are:

- [Terminology Usage](../archie/terminology-usage.md) for level-aware usage rules and examples.
- [Comparative Glossary](../archie/comparative-glossary.md) for standard-framework to $\mathbb{A}\mathbb{A}\mathbb{A}$ translation.
- [Mathematics Terminology](../archie/mathematics-terminology.md) for formal notation.
- [Academic Style Guide](../archie/academic-style-guide.md) for prose discipline.

This ontology hub keeps only the global rule:

> Use substrate-native terms for substrate ontology, medium terms for Noether sea contents, and effective/observer terms for emergent descriptions. Do not let `spacetime`, `field`, `charge`, `vacuum`, or `particle` silently cross levels without saying which level is being described.

## Parameter Ledger

The canonical parameter accounting lives in [Parameter Ledger](../validation/parameter-ledger.md). This ontology hub does not own tables of numerical inputs, closure targets, naturalness tests, or simulation regulators.

The ontology-level distinction is a level assignment, not a numerical claim:

- substrate commitments belong to [Absolute Time](./absolute-time.md), [Euclidean Void](./euclidean-void.md), [Absolute Timespace](./absolute-timespace.md), and [Architrino](./architrino.md);
- acceleration-law parameters and regulators belong to [Master Equation](../dynamics/master-equation.md) and the validation ledger;
- assembly radii, shielding factors, metric coefficients, and observer-level constants are closure targets, not primitive ontology.

For current open parameter status, see [Parameter Ledger](../validation/parameter-ledger.md) and [Known Tensions](../validation/known-tensions.md).

## Open Questions and Validation Routing

Open questions and closure burdens belong in [Known Tensions](../validation/known-tensions.md), [Closure Scorecard](../validation/closure-scorecard.md), and the relevant branch chapters. This ontology hub keeps only stable commitments.

For the current pressure ledger, see:

- [Known Tensions](../validation/known-tensions.md) for unresolved closure burdens.
- [Parameter Ledger](../validation/parameter-ledger.md) for open symbols and closure targets.
- [Wavefunction Ontology](../quantum/wavefunction-ontology.md) and [Measurement Ontology](../quantum/measurement-ontology.md) for quantum-ontology status.
- [Cosmology Ontology](../cosmology/cosmology-ontology.md) for universe-history framing.

---

## Summary

This ontology hub establishes six commitments:

1. **Substrate:** absolute time and Euclidean void form the fixed non-dynamical product background called absolute timespace.
2. **Primitive entity:** the architrino is the fixed-identity primitive point transceiver with polarity and persistent identity.
3. **Causal record:** causal wakes are real source-provenanced path-history records, not extra substances in the void.
4. **Medium:** the Noether sea is emergent physical content formed by coupled neutral Noether braid assemblies inside the Euclidean void.
5. **Observer framework:** complete-state bookkeeping is distinct from Physical Observer access.
6. **Routing discipline:** terminology, parameters, closure burdens, and open validation questions belong to their owning chapters once the topic moves beyond ontology.

All subsequent chapters build on these foundations. This hub intentionally points outward once a topic becomes dynamics, assembly structure, observer-clock extraction, terminology canon, parameter closure, or validation pressure.
