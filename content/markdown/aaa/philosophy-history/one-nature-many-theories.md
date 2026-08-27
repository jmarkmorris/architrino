# One Nature, Many Theories

*Domain Models, Effective Bridges, and the Unfinished Work of Unification*

Physics studies one natural world through many frameworks, specific theories, effective theories, domain models, constitutive closures, and phenomenological approximations. These descriptions are not all rivals for fundamental status, and they are not all disconnected. Some are exact reformulations, some are controlled limits, some are linked by renormalization-group flow or effective-field-theory matching, and some depend on statistical inference or measured response laws. The central question is whether this network has been derived from one common physical history or only made mutually calculable where its predictions overlap.

The familiar statement that foundational physics must unify general relativity and quantum theory identifies a real and important incompatibility, especially where quantum fields and dynamical spacetime meet. It does not state the full unification burden. Reconciling those formalisms would be framework unification; a unified theory of nature must also derive the effective variables, domain boundaries, parameters, state spaces, and bridge maps used throughout physics.

Plainly: physics does not consist of two seamless theories with one missing joint. It consists of many successful regional descriptions connected by bridges of different kinds and strengths. Joining the two largest frameworks would be a major achievement, but it would not by itself show that the entire structure comes from one physical foundation.

This chapter complements the compact inventory in [Theory Mapping](theory-mapping.md), the rules for inherited concepts in [Theory Inheritance Discipline](theory-inheritance-discipline.md), and the historical cases in [Historical Context and Missed Opportunities](historical-context-and-missed-opportunities.md). It audits the network among theories; it does not take scientific ownership of the mechanisms inside the theories being compared.

## Central Thesis

The strongest defensible criticism is methodological:

> Contemporary physics is organized as a layered ecology of domain theories and approximations connected by bridges of unequal explanatory authority. Calculational compatibility among those descriptions is a major scientific achievement, but it is not full theory closure unless one common ontology and dynamical history generate the domains, their effective variables, and the bridges between them.

This thesis does not imply that every domain model asserts a separate ontology, that physicists are unaware of effective-theory pluralism, or that a useful theory is defective because it has a bounded domain. The criticism begins when success within domains, or matching between domains, is presented as though it had already supplied one constituent account of nature.

## What Counts as a Theory

The word *theory* covers several explanatory objects:

- A **framework** supplies a broad mathematical grammar, such as quantum mechanics, quantum field theory, or differential-geometric gravitation.
- A **specific theory** selects fields, symmetries, interactions, parameters, or state spaces within a framework, as the Standard Model does within quantum field theory.
- An **effective theory** describes a declared regime while suppressing unresolved detail whose influence is controlled or parameterized.
- A **domain model** specializes a theory to a class of systems, approximations, boundary conditions, or empirical scales.
- A **constitutive model** supplies material or medium response not fixed by kinematics alone.
- A **bridge** maps variables, states, parameters, or predictions from one description to another over an overlap domain.

These categories overlap in practice. Their purpose is not to impose a new taxonomy on physics, but to prevent a broad framework, a specific physical theory, a fitted domain model, and the map between them from being counted as the same explanatory object.

## An Evidence-Backed Bridge Network

A useful audit begins with edges rather than merely naming theory islands. The following representative network spans controlled matching, asymptotic reduction, statistical and constitutive closure, inverse inference, and an unresolved framework interface.

| Source description | Target description | Established forward authority | Reverse-reading limit | Technical source |
| --- | --- | --- | --- | --- |
| Electroweak Standard Model | Fermi four-fermion theory | Controlled low-energy matching | $G_F$ alone does not reconstruct the resolved weak sector | [Particle Data Group electroweak review](https://pdg.lbl.gov/2024/reviews/rpp2024-rev-standard-model.pdf) |
| Relativistic quantum electrodynamics (QED) | Nonrelativistic QED (NRQED) and nonrelativistic bound states | Matched effective expansion | A finite coefficient set does not select one ultraviolet completion | [Caswell and Lepage](https://doi.org/10.1016/0370-2693(86)91297-9) and [Labelle](https://arxiv.org/abs/hep-ph/9209266) |
| Quantum chromodynamics (QCD) | Chiral nuclear effective field theory | Symmetry-constrained power counting with matched or fitted low-energy constants | Nuclear data do not uniquely recover quark-gluon histories | [Epelbaum, Hammer, and Meißner](https://arxiv.org/abs/0811.1338) |
| Boltzmann kinetic theory | Hydrodynamics | Rigorous or asymptotic limits in declared regimes, plus constitutive closure | Fluid fields represent many distributions and microhistories | [Bardos, Golse, and Levermore](https://doi.org/10.1007/BF01026608) and [Golse](https://doi.org/10.1016/S1874-5717(06)80006-X) |
| Joint quantum dynamics | Decohered apparatus description and definite-record interface | Exact reduced-state map and model-dependent decoherence; outcome handoff unresolved | A reduced state neither fixes the global state nor selects one outcome by itself | [Schlosshauer](https://arxiv.org/abs/quant-ph/0312059) |
| General relativity | Newtonian and post-Newtonian gravity | Controlled weak-field and slow-motion expansion | Finite-order motion does not fix the full metric or source interior | [Einstein, Infeld, and Hoffmann](https://edition-open-sources.org/sources/10/17/index.html) and [Blanchet](https://arxiv.org/abs/1310.1528) |
| Relativistic cosmology and matter inputs | Cosmic microwave background (CMB) spectra and parameter posterior | Numerical transfer plus model-conditional statistical inference | Priors and degeneracies prevent unique source-history reconstruction | [Lewis, Challinor, and Lasenby](https://arxiv.org/abs/astro-ph/9911177) and [Planck Collaboration](https://doi.org/10.1051/0004-6361/201833910) |
| Quantum fields on curved spacetime plus classical gravity | Semiclassical or stochastic gravity and the quantum-gravity interface | Controlled semiclassical approximation in restricted regimes; full handoff unresolved | Mean and noise records do not reconstruct quantum geometry | [Hu and Verdaguer](https://link.springer.com/article/10.12942/lrr-2008-3) |

Plainly: these islands have real and powerful connections. The unresolved point is narrower: a reliable forward bridge can coexist with a non-unique reverse reconstruction, and an intermediate bridge can succeed without reaching a common microscopic account.

Fermi's beta theory is the cleanest first example. At energies far below the $W$-boson scale, the four-fermion coefficient $G_F$ compresses the mediator structure into one low-energy parameter. At tree level in the electroweak theory,

$$
\frac{G_F}{\sqrt{2}}=\frac{g^2}{8M_W^2}.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b44957fa1f24bad8)

Plainly: $G_F$ is the effective low-energy interaction coefficient, $g$ is the electroweak coupling, and $M_W$ is the $W$-boson mass. The coefficient carries an effect of the higher-energy theory, but it does not contain enough information to infer uniquely that the hidden completion contains a spin-$1$ mediator with that structure. Prediction survived the compression; the detailed structure did not.

## Bridges Have Unequal Authority

| Bridge type | What it establishes | What it does not establish by itself |
| --- | --- | --- |
| Exact equivalence or reformulation | Two mathematical descriptions encode the same declared content | That either description is fundamental ontology |
| Symmetry reduction or special solution | A restricted sector follows from a broader equation set under explicit assumptions | That nature selects those assumptions |
| Controlled asymptotic limit | One description approximates another with bounded or vanishing error in a declared regime | Constituent continuity outside that regime |
| Renormalization-group flow | Couplings and operators change coherently with resolution | Unique microscopic reconstruction or persistent carrier identity |
| Effective-theory matching | Selected low-energy coefficients reproduce higher-resolution effects | Recovery of all eliminated variables or a unique ultraviolet completion |
| Statistical coarse-graining | Macroscopic variables and distributions summarize many microscopic states | A unique microhistory or, without further work, definite record selection and irreversible dynamics |
| Constitutive closure | A response law is specified well enough to solve the effective equations | Derivation of that law from underlying constituents |
| Phenomenological calibration | A model reproduces observations over a tested domain | Mechanism, ontology, or authority outside that domain |
| Heuristic analogy | A pattern becomes easier to imagine or compare | A derivation, mechanism, or acceptance result |

The scientific value of a bridge is not reduced by naming its authority correctly. Effective matching can be exact to a declared order; phenomenological laws can be extraordinarily accurate; constitutive models can support reliable engineering. The classification matters because predictive reliability and ontological derivation answer different questions.

## A Formal Audit of the Theory Network

Represent the current organization of physics provisionally by a directed graph

$$
\mathcal{G}_{\mathrm{phys}}=(V,E)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a45e8630687b0793)

where each node $v_i\in V$ is a declared theory or domain description and each directed edge $e_{j\leftarrow i}\in E$ is a bridge from description $i$ to description $j$. A bridge certificate is

$$
\mathcal{B}_{j\leftarrow i}
=
\left(
\mathcal{D}_i,
\mathcal{D}_j,
M_{j\leftarrow i},
\mathcal{R}_{ij},
\epsilon_{ij},
\mathcal{I}_{ij},
\mathcal{L}_{ij},
\mathcal{F}_{ij}
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-db1aa95de946f160)

where $\mathcal{D}_i$ and $\mathcal{D}_j$ are the source and target state domains, $M_{j\leftarrow i}$ is the bridge map, $\mathcal{R}_{ij}$ is its validity regime, $\epsilon_{ij}$ is its declared error or residual bound, $\mathcal{I}_{ij}$ is the information preserved, $\mathcal{L}_{ij}$ is the information discarded or left unresolved, and $\mathcal{F}_{ij}$ is an independently checkable failure condition.

Plainly: a line between two theories is not enough. The bridge must state what is translated, where the translation works, how accurately it works, what survives, what disappears, and what result would show that the bridge has failed.

The reverse direction is generally a compatibility fiber rather than an inverse function. For an effective record $y\in\mathcal D_j$, define

$$
\mathfrak F_{i\mid y}^{(\epsilon)}
=
\left\{
x\in\mathcal D_i:
d_j\!\left(M_{j\leftarrow i}(x),y\right)\leq\epsilon_{ij}
\right\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b41ebfc1333e648f)

Here $d_j$ is a declared distance or residual measure in the target record space. Plainly: an effective record may exclude many possible fine histories without identifying one. Forward prediction and reverse reconstruction are separate achievements.

Graph connectivity is not full unification. A common-source theory requires one physical history space $\mathcal H$ and independently specified projections $P_i:\mathcal H\to\mathcal O_i$ into the observer-level record space of every required domain. On an overlap regime, the bridge must commute with those projections within tolerance:

$$
\Delta_{ij}(H)
=
d_j\!\left(
M_{j\leftarrow i}(P_i(H)),
P_j(H)
\right)
\leq
\epsilon_{ij}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9a8a84e6187eb564)

For three nested descriptions, direct and staged reduction must also agree within a declared composition tolerance:

$$
M_{k\leftarrow j}\circ M_{j\leftarrow i}
\simeq
M_{k\leftarrow i}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-00f9558afc861775)

Plainly: one history should be readable in several scientific languages. Translating its fine description into a coarse description should agree with reading the coarse record directly from the same history, and an intermediate route should not silently change the answer.

Scale change adds a constituent-continuity obligation. Let $C_{\ell_2\leftarrow\ell_1}$ be a declared coarse-graining map, let $H$ be a retained physical history on a window $W$, let $\Pi_I$ extract constituent identity and provenance, and let $\Phi_I(\partial W)$ record actual constituent flow through the window boundary. The candidate minimum condition is

$$
C_{\ell_3\leftarrow\ell_2}\circ C_{\ell_2\leftarrow\ell_1}
=
C_{\ell_3\leftarrow\ell_1},
\qquad
\Pi_I\!\left(C_{\ell_2\leftarrow\ell_1}H\right)
=
\Pi_I(H)-\Phi_I(\partial W)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-8b30dc678926f3e6)

Plainly: changing resolution in two steps must agree with changing it directly. Coarse-graining may discard descriptive detail, but it may not create a different constituent inventory merely because the language changed; any actual gain or loss must be accounted for at the physical boundary.

> **Claim grade: guessed.** These composition and inventory equations are a candidate minimum closure target, not an achieved result. **Falsifier:** a declared common-history and coarse-graining construction for which direct and staged projection disagree beyond tolerance, or for which the inventory mismatch cannot be accounted for by the boundary-flow record.

The exact, zero-tolerance scale specialization of the general compatibility fiber is

$$
P_\ell:\mathcal{H}\longrightarrow\mathcal{O}_\ell,
\qquad
\mathcal{F}_\ell(o)=\left\{H\in\mathcal{H}:P_\ell(H)=o\right\}.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-4514a1f4aead3177)

Here $o$ is the observed effective record, and $\mathcal F_\ell(o)$ is not a competing inverse notation; it is the $\epsilon=0$ scale case of the general fiber $\mathfrak F_{i\mid y}^{(\epsilon)}$. A protected cross-scale quantity $I_a$ must factor through the effective record:

$$
I_a(H)=\overline I_{a,\ell}\!\left(P_\ell(H)\right),
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e897dc3f23a715e5)

for every admissible history in the declared domain, where $\overline I_{a,\ell}$ reads the protected quantity from the scale-$\ell$ effective record.

Plainly: all fine histories that look identical at one resolution must agree on a genuinely protected quantity. The invariant narrows the possible histories; it does not normally reconstruct one history uniquely.

## What Survives Coarse-Graining

Information loss is not uniform. Anomaly matching, topology, symmetry-breaking patterns, and selected low-dimension operators can preserve exact or unusually sensitive constraints through a change of scale. Scalar masses and vacuum-energy terms can remain sensitive to high-scale matching, while confinement reorganizes the useful degrees of freedom rather than merely deleting a heavy field. These channels are stronger probes of a proposed common source than a generic low-energy coefficient, but they still do not usually identify a unique microscopic history.

The correct foundational requirement is therefore not that every coarse observation have one inverse. It is that one retained history reproduce all mandatory coarse records, shared coefficients, protected invariants, and boundary ledgers without changing ontology or privately retuning each domain.

Plainly: most microscopic distinctions disappear when physics zooms out, but some leave non-negotiable marks. Those marks can rule out candidate histories even when they cannot identify one history by themselves.

## Gauge Agreement Versus Gauge Origin

Gauge covariance provides a particularly clear distinction between descriptive agreement and physical origin. Gauge-equivalent representatives describe one observer-level state, while curvature, holonomy, charge compatibility, anomaly cancellation, and reaction records carry invariant content. The historical change from Weyl's failed length calibration to successful phase calibration is developed in [Weyl's Gauge: Calibration Survived Its Object](historical-context-and-missed-opportunities.md#weyls-gauge-calibration-survived-its-object).

Gauge theory rigorously prevents arbitrary local bookkeeping from changing a prediction. It does not by that achievement alone derive why nature supplies this gauge group, these representations, these couplings, this topology, or one physical history behind every admissible representative. The mechanism burden belongs to [Gauge Structure Emergence](../assemblies/gauge-structure-emergence.md#gauge-covariance-recovery-target), while [Gauge Symmetries](../assemblies/gauge-symmetries.md#gauge-redundancy-and-anomaly-ledger) owns the formal Standard Model recovery gates.

Plainly: mathematical consistency among descriptions is indispensable. A unified substrate account must additionally generate the invariant physical record those descriptions share.

## Logarithmic Chutes and Ladders

Scale segregation was not an oversight. Renormalization-group flow and effective field theory explain why long-distance observables often become insensitive to short-distance detail. Wilson's [account of many length scales](https://www.nobelprize.org/uploads/2018/06/wilson-lecture-2.pdf) made the relation between microscopic fluctuation and macroscopic law explicit. The [Appelquist-Carazzone decoupling theorem](https://doi.org/10.1103/PhysRevD.11.2856) established, within its stated renormalizable-theory conditions, that heavy fields decouple from low-momentum behavior apart from renormalization effects and suppressed corrections. These methods are major mathematical and predictive achievements.

The scale structure can be pictured as a board whose vertical coordinate is logarithmic resolution, such as $\log\mu$ or $\log\ell^{-1}$. The ladders are controlled relations carrying selected quantities between neighboring landings: renormalization-group flow, matching equations, decoupling results, asymptotic expansions, and coarse-graining maps. The chutes are thresholds and reorganizations at which the active variables or useful carriers change: symmetry breaking, confinement, collective-mode formation, phase transitions, and changes in constitutive regime.

Zooming does not move the physical event. It changes which distinctions an observer-level description can resolve. A photon emitted in a small region is not automatically a probe of every smaller structure there; its wavelength and wavepacket determine the interaction's available resolution. Multiple fine histories may therefore project to one coarse record even while protected quantities continue to constrain the possible histories.

The metaphor must not replace the mathematics. Each ladder requires a bridge certificate, and each chute requires an account of what changed physically, what changed only descriptively, what information survived, and what became inaccessible. Gauge covariance is a different operation: it changes descriptive basis at a fixed physical state, whereas logarithmic chutes and ladders concerns a succession of effective descriptions in which the active degrees of freedom may change.

Plainly: physics has learned how to move reliably around much of the board. The unfinished unification problem is whether every landing and transition can be shown to be a view of the same pieces and the same continuous physical history.

The relevant historical sequence does not show that effective field theory is wrong or incomplete within its domain. It identifies a stronger burden for any substrate program that claims one persistent ontology across domains. Renormalization-group flow among couplings is not, by itself, transport of a constituent inventory.

## The Two-Theory Compression

The phrase “unify general relativity and quantum theory” is legitimate when it names the conflict between dynamical spacetime geometry and quantum description. It becomes misleading when it is allowed to stand for complete unification. Quantum theory is a framework realized through many specific and effective theories. General relativity depends on matter models, equations of state, boundary conditions, approximations, and cosmological constructions when applied across domains. Neither side is one indivisible theory package in scientific practice.

The wider problem includes at least these handoffs:

- quantum fields to stable particle and detector records;
- gauge and representation data to assembly or constituent structure;
- QCD variables to hadrons, nuclei, and residual nuclear interactions;
- quantum many-body dynamics to chemistry and material response;
- microscopic dynamics to thermodynamics, kinetic theory, and hydrodynamics;
- matter and signal behavior to effective metric geometry;
- local gravitational theory to global cosmological inference;
- and domain constants and fitted parameters to one shared physical account.

Some of these bridges are much more developed than others. Full theory closure does not require abolishing the effective autonomy of higher-level science or calculating every macroscopic event from microscopic initial data. It requires explaining why the higher-level variables and laws arise, why their regimes exist, why their parameters have the values they do, and how their errors are controlled by the common underlying state.

## Framework Unification Versus Full Theory Closure

A framework can be unified while its applications remain domain-plural. A foundational proposal carries the stronger burden of:

1. **Common ontology:** one declared inventory of what exists physically.
2. **Common dynamics:** one compatible evolution law or closed family of laws, with no privately introduced mechanism at a later domain.
3. **Derived domain projections:** explicit maps from the common state to the variables used in every mandatory effective theory.
4. **Derived bridges:** controlled relations among overlapping descriptions rather than separately fitted compatibility.
5. **Parameter provenance:** masses, couplings, constitutive coefficients, and boundary terms derived or explicitly measured rather than hidden as unrelated inputs.
6. **Information accounting:** a statement of what coarse-graining preserves, discards, or renders non-identifiable.
7. **Residual control:** declared domains, tolerances, and falsifiers for every recovery claim.
8. **No ontological substitution:** changes of variables, scale, symmetry realization, or collective organization must not silently replace the constituent inventory.

This standard is intentionally demanding. A theory can be excellent, predictive, and indispensable without meeting it. The standard applies to a theory that claims to be a unified account of nature rather than an effective description of a bounded regime.

One retained constituent record must survive successive projections while reproducing the laws that make domain-specific descriptions useful. The requirement is stronger than a complaint that physics built different models at different scales: effective autonomy is real, and universality or scale separation can explain why microscopic detail becomes irrelevant to named predictions. A common-source theory must preserve that economy while deriving the effective variables, regimes, parameters, bridge residuals, and protected records. Merely renaming an effective field as an assembly does not supply the derivation.

## Fairness Boundaries and Claim Grades

The criticism fails if it caricatures the actual state of physics. Domain theories are not automatically rival ontologies. Effective field theory is a principled response to scale separation. Renormalization-group flow connects real mathematical structures. Statistical mechanics, hydrodynamic limits, homogenization, perturbation theory, and weak-field reductions provide genuine derivations in declared settings. Constitutive and phenomenological models remain legitimate when their measured inputs and domains are explicit. Working physicists generally understand that gauge transformations are redundancies of description, not physical operations among competing worlds. Multiple descriptions can reflect computational tractability and emergent autonomy rather than disunity in nature.

The narrower criticism survives these concessions: a connected network of successful theories does not by itself establish descent from one common constituent ontology.

> **Claim grade: inferred.** The “general relativity plus quantum theory” slogan compresses a many-domain structure into two framework-level poles and therefore understates the full burden of ontological unification. **Falsifier:** an auditable dependency map showing that all empirically indispensable domain theories already descend through controlled projections from one common physical state space, with parameters, regimes, information loss, and bridge residuals accounted for.

> **Claim grade: inferred.** Gauge covariance, renormalization-group flow, effective matching, and phenomenological calibration can establish cross-description consistency without establishing persistent constituent identity. **Falsifier:** an applicable theorem or completed physical construction showing that the relevant consistency maps uniquely preserve and reconstruct the same constituent provenance across the domains in question.

> **Claim grade: guessed.** Requiring one retained constituent history across the theory network will produce explanatory compression beyond independently matched effective descriptions. **Falsifier:** a completed common-history construction that reproduces the domain records but yields no shared parameter constraints, no reduction in independent assumptions, no new consistency relations, and no discriminating predictions.

## Relation to $\mathbb{A}\mathbb{A}\mathbb{A}$

$\mathbb{A}\mathbb{A}\mathbb{A}$ accepts the stronger unification burden. General relativity, quantum theory, the Standard Model, thermodynamics, and cosmological observation models enter as effective recovery targets rather than substrate premises. One architrino inventory, delayed path-history dynamics, assembly organization, and Noether sea record must project into those domains without privately changing ontology at each landing.

That commitment is not evidence that the recovery has been achieved. It increases the proof burden. A successful account must derive the projections, bridge maps, protected invariants, parameter relations, and residual bounds while retaining the predictive economy that makes effective theories useful. Renaming a field as an assembly, a metric as a sea response, or a quantum state as hidden history does not satisfy the requirement.

No new measured $\mathbb{A}\mathbb{A}\mathbb{A}$ result is claimed here. The bridge network establishes that forward control, reverse reconstruction, parameter provenance, and common-history continuity are separate questions. The scientific chapters that own each recovery must answer them with independent derivations and declared falsifiers.
