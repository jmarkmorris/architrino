# Theory Inheritance Discipline

This chapter states how inherited physics concepts may be used during
$\mathbb{A}\mathbb{A}\mathbb{A}$ development. Its central rule is simple:
successful mapping is not burden relief. A concept from a higher-level theory
may be accurate, useful, or even indispensable in its tested regime while still
failing to identify the substrate mechanism that produces the result.

The discipline here sits between the broad survey in [Theory Mapping](theory-mapping.md),
the classification catalog in [Theory Differentials](theory-differentials.md),
and the detailed per-framework mappings in [Theory Bridges](theory-bridges/README.md).
It does not own the substrate ontology, the Master Equation of Motion, assembly
definitions, validation gates, or parameter ledgers. Its job is to prevent
inherited concepts from entering the corpus with more authority than they have
earned.

## Core Claim

No inherited theory is trusted as ontology. Inherited theories are trusted only
as structured evidence, mathematics, benchmark records, or comparison pressure
after their regime and stack placement are declared.

The strongest safe use is therefore not "this maps to $\mathbb{A}\mathbb{A}\mathbb{A}$."
The stronger use is:

1. name the regime where the inherited concept is accurate,
2. state the mathematics or record that survives,
3. locate the corresponding $\mathbb{A}\mathbb{A}\mathbb{A}$ layer,
4. define the residual that would count as recovery,
5. name the failure mode that would show the mapping has overreached.

Plain language: the inherited theory can tell the program what must be
recovered, but it cannot tell the program what the world is made of.

## Transfer Record

For an inherited concept $C$, the comparison is disciplined only when the
corpus can state a transfer record
$$
\mathcal{T}_{\mathrm{inherit}}(C)
=
\left(
D_C,\,
M_C,\,
B_C,\,
\Pi_C^{\mathbb{A}\mathbb{A}\mathbb{A}},\,
\mathcal{R}_C,\,
P_C,\,
F_C
\right)
$$

The fields mean:

| Field | Meaning | Question it answers |
| --- | --- | --- |
| $D_C$ | Domain of validity | Where does the inherited concept work? |
| $M_C$ | Retained mathematics | Which equation, symmetry, statistic, or model form is still useful? |
| $B_C$ | Benchmark record | Which observed or validated data product must be recovered? |
| $\Pi_C^{\mathbb{A}\mathbb{A}\mathbb{A}}$ | Projection map | How does substrate or assembly data become the inherited observable? |
| $\mathcal{R}_C$ | Recovery residual | How close is the projected record to the benchmark? |
| $P_C$ | Reasoning provenance | Why is the equation believed, doubted, or kept directional? |
| $F_C$ | Failure mode | What would show the mapping is only verbal or overfitted? |

This is a methodology object, not a new validation gate. It is a compact way to
keep ontology, effective description, and inference separated while the theory
is being built.

A typical residual has the schematic form
$$
\mathcal{R}_C(\theta)
=
d_C\!\left(
B_C\!\left(\Pi_C^{\mathbb{A}\mathbb{A}\mathbb{A}}(\theta)\right),
B_C^{\mathrm{obs}}
\right)
$$
where $\theta$ is the candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ branch record,
$d_C$ is the comparison metric appropriate to the inherited concept, and
$B_C^{\mathrm{obs}}$ is the validated observer-level benchmark.

The important burden is the origin of $\theta$. If $\theta$ is selected after
seeing the benchmark, the result is benchmark fitting. If $\theta$ is generated
from the Master EOM, assembly closure, Noether sea response, and declared
record channel before comparison, then a small $\mathcal{R}_C$ can become
evidence of implementation closure.

## Transfer Classes

Inherited concepts enter the corpus in five different ways.

| Transfer class | Authority level | Typical use | Burden |
| --- | --- | --- | --- |
| Native substrate commitment | Highest, but only when already part of $\mathbb{A}\mathbb{A}\mathbb{A}$ | Absolute time, Euclidean void, architrinos, causal wakes, path history | Must be stated by the native ontology and dynamics, not borrowed from a historical analogy |
| Direct mathematical tool | Formal, not ontological | Calculus, distributions, Jacobians, norms, variational language, residuals | Must not import the ontology of the theory where the tool was historically used |
| Validated benchmark record | Empirical and operational | SM spectra, QED precision rows, Lorentz tests, PPN bounds, BBN/CMB rows | Must be recovered as an output of one declared branch record |
| Effective-limit concept | Conditional | Wavefunction, thermodynamics, entropy, hydrodynamics, effective metric, cosmology variables | Must declare coarse-graining, regime, and residual |
| Directional comparison | Low to medium | Holography, MOND-like fits, inflationary language, string/LQG/SUSY programs, information/computation ontology | May guide questions, but cannot supply doctrine without a native derivation |

The transfer class can change by regime. A mathematical structure may be a
direct formal tool in one chapter, an effective-limit concept in another, and a
directional analogy in a third. The page or section using it must make the
local status visible.

## Canonical Direct-Use Audit

The current corpus uses prior-theory concepts directly only in controlled ways.
This list is the canonical audit level for the present corpus; individual
chapters still own their local details.

| Inherited concept family | Current corpus use | Transfer class | Scope discipline |
| --- | --- | --- | --- |
| Euclidean geometry and vector calculus | Spatial metric $h_{ij}$, norms, dot products, gradients, and spatial integration on $\Sigma_t$ | Native substrate commitment plus direct mathematical tool | Geometry is fundamental only as Euclidean void geometry; it does not license Newtonian force ontology or 4D spacetime ontology |
| Absolute-time parameterization | Global time $t$, worldlines, causal emission times $t_0$, and $\mathbb{U}_{\text{now}}\equiv S(t)$ | Native substrate commitment | Proper time, clock readout, and time dilation remain observer-level recovery targets |
| Distributional causal surfaces | Delta functions, Heaviside support, mollification, branch integrals, and weak limits | Direct mathematical tool | The distribution is a formal representation of causal wake support, not a continuum field substance |
| Jacobian and branch analysis | Causal-root weights, transversality floors, caustic handling, and multi-root bookkeeping | Direct mathematical tool | A root ledger records admissible delayed channels; it is not itself a force law or stability proof |
| Inverse-square surface dilution | Causal wake density over expanding surfaces | Native dynamics component | It supplies the microscopic kernel but still owes effective recovery of observer-level field laws |
| Conservation language | Energy, momentum, angular momentum, charge/polarity inventory, and event ledgers | Benchmark record plus native bookkeeping target | Observer-level conservation laws must be traced to event records rather than inserted as standalone axioms |
| Standard Model labels | Electric charge, color, weak isospin, hypercharge, chirality, generation, CKM/PMNS rows, and anomaly checks | Validated benchmark record | Labels may organize the assembly dictionary, but the gauge dynamics and couplings remain derivation targets |
| QED/QCD/EW precision formalisms | Loop-sensitive observables, confinement benchmarks, electroweak rates, branching ratios, and null-result bounds | Validated benchmark record | Perturbative and lattice successes fix recovery pressure; they do not establish virtual particles, continuum fields, or gauge primitives as substrate ontology |
| Lorentz and SR behavior | Time dilation, length contraction, invariant signal speed, two-way synchronization, and preferred-frame leakage bounds | Validated benchmark record and effective-limit concept | The closure target is moving-assembly deformation and clock/ruler retuning from causal-root dynamics, not a Lorentz postulate |
| GR and PPN behavior | Redshift, Shapiro delay, lensing, orbital precession, gravitational waves, black-hole ring/lensing scales, and PPN coefficients | Validated benchmark record and effective-limit concept | Effective metric language is retained only after a Noether sea response map supplies clock, ruler, signal, and weak-field channels without per-observable retuning |
| Quantum state language | Wavefunction, Born weights, uncertainty, operators, spin, entanglement, no-signaling, and Bell/CHSH benchmarks | Effective-limit concept plus benchmark record | The effective chart must derive basin measures, record formation, and apparatus kernels from deterministic path-history dynamics |
| Thermodynamics and statistical mechanics | Entropy, temperature, heat, irreversibility, kinetic theory, virial behavior, and ensemble closures | Effective-limit concept | The regime must declare the coarse-graining, access window, boundary flux, and measure; global cosmological extrapolation is not automatic |
| Radiation and reaction formulas | Larmor/Lienard, bremsstrahlung, synchrotron, Compton-like rows, pair thresholds, blackbody and polarization constraints | Validated benchmark record | Formulas are target limits for event ledgers with photon output, recoil, remnant, heat, reaction, and medium-update rows |
| Cosmology variables | $a(t)$, $H(t)$, redshift, CMB spectra, BAO rulers, BBN abundances, growth, $S_8$, and $\Omega$ summaries | Observer-inference benchmark record | These variables describe Noether sea evolution, transport, and clock-rate comparison; the Euclidean void does not expand |
| Information and computation | State distinction, encoding, measurement records, reset cost, algorithmic scaling, and simulation discipline | Directional comparison and methodological language | Useful for records and models, but not a substrate ontology |
| Holography, AdS/CFT, islands, MOND-like fits, string/LQG/SUSY/inflationary programs | Comparison pressure, candidate analogies, and boundary checks | Directional comparison | They may sharpen constraints, but they are not closure targets unless a tested observable or hard consistency condition requires them |

## Regime And Scale Chart

The corpus should read inherited accuracy by regime, not by reputation.

| Regime or scale | Inherited framework with high accuracy | What $\mathbb{A}\mathbb{A}\mathbb{A}$ should inherit | What it must not inherit |
| --- | --- | --- | --- |
| Microscopic substrate scale | No inherited framework has direct confirmed access | Formal tools for causal roots, distributions, branch charts, and simulation | Continuum fields, metric spacetime, quantum randomness, or information as primitive |
| Stable assembly scale | Standard Model phenomenology and bound-state quantum labels | Charge, color, weak, spin, generation, mass, lifetime, and reaction benchmarks | Point-particle ontology, primitive gauge fields, primitive spin, or free mass parameters |
| Atomic and molecular scale | Nonrelativistic QM, QED corrections, spectroscopy, thermodynamics | Spectral lines, selection rules, uncertainty benchmarks, loop-sensitive residuals, heat and record costs | Literal wavefunction ontology or virtual-particle substrate narratives |
| Laboratory relativistic scale | SR, QFT, accelerator SM, precision clocks | Lorentz behavior, cross sections, rates, anomalies, null results, clock/ruler constraints | Minkowski spacetime as substrate or independent Lorentz postulates |
| Weak-field astronomical scale | GR, PPN, lensing, orbital dynamics, gravitational waves | Redshift, Shapiro delay, lensing, orbital precession, gravitational-wave speed and waveform benchmarks | Fundamental curvature of the Euclidean void or freely tuned metric coefficients |
| Strong-field compact-object scale | GR black-hole phenomenology, EHT, merger/ringdown inference, black-hole thermodynamics | Horizon-interface benchmarks, compact lensing scales, area/entropy pressure, release-channel ledgers | Singularities, event horizons, or holographic duals as direct substrate ontology |
| Thermal and bulk matter scale | Thermodynamics, kinetic theory, hydrodynamics, plasma physics | Coarse-grained equations, transport coefficients, virial behavior, entropy-production constraints | A universal entropy slogan detached from window, boundary, and coarse-graining |
| Cosmological inference scale | Lambda-CDM-era CMB, BBN, BAO, SN, lensing, growth, and distance-ladder pipelines | Data-product constraints and shared-state residuals for Noether sea evolution and photon transport | Expansion of the Euclidean void, independent per-observable fits, or cosmological constants as substrate inputs |
| Beyond-tested speculative scale | Inflationary, holographic, string, LQG, SUSY, MOND-like, multiverse, and landscape programs | Comparison pressure and occasional mathematical tools | New doctrine, new particles, hidden dimensions, or new closure burdens without empirical or mathematical necessity |

## Non-Relief Lemma

**Lemma (methodological):** A mapping from an inherited concept $C$ to an
$\mathbb{A}\mathbb{A}\mathbb{A}$ descriptor $A_C$ does not reduce the proof
burden unless the same branch record $\theta$ also supplies the implementation
map $\Pi_C^{\mathbb{A}\mathbb{A}\mathbb{A}}$, keeps
$\mathcal{R}_C(\theta)$ below the declared tolerance in $D_C$, and avoids the
known failure mode $F_C$ with a reasoning provenance $P_C$ appropriate to the
claim level.

Proof route: a verbal or diagrammatic mapping establishes only a relation
between labels. Benchmark recovery requires an output comparison. Implementation
closure requires a generator. If the generator is not declared, the concept
still sits at the comparison layer. If the generator changes between benchmark
families, the result is hidden tuning. If the generator is native and shared
across the relevant sectors, then the inherited concept has been recovered as
an effective limit rather than merely named.

Plain language: a map is not a mechanism. A mechanism is a native record that
keeps working after the comparison target changes.

## Reasoning Provenance Below Existing Theory

The hardest inheritance cases appear when an inherited theory works above the
level where $\mathbb{A}\mathbb{A}\mathbb{A}$ needs to reason. A formula may
describe bulk matter, a detector record, or an ensemble statistic with high
accuracy while still saying little about the motion of one assembly, one
causal-root branch family, or one event ledger. In that zone, the solution is
not yet sharp enough for doctrine. The corpus must record why an equation is
being trusted, doubted, or used only as a directional guide.

This record is not a progress diary. It is reasoning provenance: the active
chain of reasons that explains why a candidate equation is allowed to carry its
current claim level. A useful provenance note contains:

1. the inherited trigger, meaning the equation, regularity, or benchmark that
   motivated the deeper search,
2. the native candidate, meaning the $\mathbb{A}\mathbb{A}\mathbb{A}$ equation,
   branch condition, residual, or simulation target proposed underneath it,
3. the reason for belief, such as a symmetry, dimensional match, conservation
   channel, branch-counting identity, limiting case, or shared generator,
4. the reason for doubt, such as hidden coarse-graining, missing branch
   admissibility, ensemble dependence, caustic sensitivity, boundary flux, or a
   record channel that has not been generated natively,
5. the level of the claim: individual assembly, finite assembly family, bulk or
   statistical population, observer inference, or analogy,
6. the first falsifier that would demote the equation.

The central question is therefore not merely "does this equation map?" The
central question is "what makes this equation believable at this level?"

| Equation status | What makes it believable | What would demote it |
| --- | --- | --- |
| Native definition or postulate | It is part of the declared substrate ontology or Master EOM and survives internal consistency checks | It conflicts with the ontology, event bookkeeping, or another accepted native equation |
| Exact branch derivation | It follows from one declared causal-root chart with admissible roots, transversality control, and a shared branch record | A missing branch, caustic, branch-switching ambiguity, or hidden parameter change is needed |
| Individual assembly law | It predicts an assembly observable from that assembly's path history and event ledger | It only works after averaging over assemblies or after importing a bulk variable |
| Finite assembly family law | It is stable over a declared family, boundary condition, and access window | It changes when the family membership, boundary flux, or causal-root support changes |
| Bulk or statistical law | It follows from an explicit coarse-graining map, measure, and residual tolerance | It is applied to one assembly without proving that the projection preserves the relevant observable |
| Observer-inference formula | It correctly relates projected records to detector or survey data products | It is treated as substrate dynamics rather than an inference layer |
| Directional analogy | It suggests a question, invariant, or comparison target without supplying doctrine | It is used as if it were a native generator or closure proof |

## Bulk Versus Individual Assembly Behavior

Bulk formulas are not automatically wrong. They are often the most accurate
description available at the observer scale. The error is to treat a bulk
formula as if it already describes one assembly unless the projection from
assembly records to bulk variables has been shown.

Let $\Gamma_A(t)$ denote the retained state of assembly $A$, and let
$\mathcal{H}_A(t)$ denote its path-history and event record over an access
window $W$. Let $\mathcal{A}_W$ be the assembly family sampled by that window,
and let $\mathcal{P}_{\mathcal{Q},W}$ be the declared projection that keeps only
the observables $\mathcal{Q}$ relevant to the inherited comparison. A bulk
variable has the schematic form
$$
Y_{\mathcal{Q},W}(t)
=
\mathcal{P}_{\mathcal{Q},W}
\left(
\{\Gamma_A(t),\mathcal{H}_A(t)\}_{A\in \mathcal{A}_W},
\rho_{\text{NS}}(\mathbf{x},t)
\right),
$$
where $\rho_{\text{NS}}$ is the Noether sea state sampled by the same window.
In residuals below, $\Gamma(t)$ abbreviates the full sampled collection of
assembly states, path histories, and Noether sea state.

A proposed bulk equation
$$
\dot{Y}_{\mathcal{Q},W}
=
F_{\mathrm{bulk}}\!\left(Y_{\mathcal{Q},W}\right)
$$
is credible only as a bulk equation until its projection residual is controlled:
$$
\mathcal{R}_{\mathrm{bulk}}
=
\left\|
\frac{d}{dt}\mathcal{P}_{\mathcal{Q},W}(\Gamma(t))
-
F_{\mathrm{bulk}}\!\left(Y_{\mathcal{Q},W}(t)\right)
\right\|_{\mathcal{Q},W}.
$$

It becomes credible as an individual-assembly guide only after a separate
assembly-level residual is controlled:
$$
\mathcal{R}_{\mathrm{assembly}}
=
\sup_{A\in \mathcal{A}_W}
\left\|
\Pi_A\!\left(\varphi_t(\Gamma_A,\mathcal{H}_A)\right)
-
\Pi_A^{\mathrm{bulk}}\!\left(Y_{\mathcal{Q},W}(t)\right)
\right\|_A.
$$
Here $\varphi_t$ is the native evolution of the assembly record, $\Pi_A$ is the
assembly-level observable projection, and $\Pi_A^{\mathrm{bulk}}$ is the
individual-assembly value inferred from the bulk equation. If
$\mathcal{R}_{\mathrm{bulk}}$ is small while
$\mathcal{R}_{\mathrm{assembly}}$ is large, the formula remains a population
law. If both residuals are small in the declared regime, the bulk equation may
serve as an effective assembly-level guide, but only in that regime.

This distinction is why virial, thermodynamic, hydrodynamic, cosmological, and
detector-level formulas need special care. They may be accurate descriptions of
records after projection while still being incomplete descriptions of the
assembly behavior that produced those records.

## Use With Existing Comparison Documents

[Theory Mapping](theory-mapping.md) should remain the compact reader map of
major frameworks. It tells readers what the inherited theory says and how
$\mathbb{A}\mathbb{A}\mathbb{A}$ expects to recover, reinterpret, or reject it.

[Theory Differentials](theory-differentials.md) should remain the classification
catalog. It locates each concept in the comparative stack and the
$\mathbb{A}\mathbb{A}\mathbb{A}$ stack, names its relation type, and records the
mapping target.

[Theory Bridges](theory-bridges/README.md) should remain the detailed bridge
lane. A bridge may use this chapter's transfer record to keep its mathematical
handoff disciplined, but the bridge still has to point back to the domain
chapters that own the underlying mechanism.

[Failure Criteria](../validation/failure-criteria.md), [Parameter Ledger](../validation/parameter-ledger.md),
and [Constraint Ledger](../validation/constraint-ledger.md) remain the places
where validation records, benchmark families, and null-result pressure are
made operational. This chapter should not duplicate those ledgers.

## Writing Rule

When a corpus page relies on inherited theory, the prose should answer five
questions before the concept carries weight:

1. What exactly is inherited: mathematics, data, benchmark, analogy, or method?
2. What is the $\mathbb{A}\mathbb{A}\mathbb{A}$ layer that generates the same
   observable or regularity?
3. What residual or failure mode would show that the inheritance has not closed?
4. What reasoning provenance makes the equation believable, doubtful, or only
   directional?
5. Is the equation about an individual assembly, a finite assembly family, a
   bulk or statistical population, or observer inference?

This rule keeps the force of inherited successes while preserving the deeper
burden: $\mathbb{A}\mathbb{A}\mathbb{A}$ must still find the better metric,
principle, or native mechanism when the inherited theory only supplies a successful
effective summary.
