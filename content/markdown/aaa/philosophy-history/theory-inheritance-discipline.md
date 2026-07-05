# Theory Inheritance Discipline

This chapter states how inherited physics concepts may be used during
$\mathbb{A}\mathbb{A}\mathbb{A}$ development. Its central rule is simple:
successful mapping is not burden relief. A concept from a higher-level theory
may be accurate, useful, or even indispensable in its tested regime while still
failing to identify the substrate mechanism that produces the result.

The discipline here sits between the broad survey in [Theory Mapping](theory-mapping.md),
the classification catalog in [Theory Differentials](theory-differentials.md),
and the detailed per-framework mappings in [Theory Bridges](theory-bridges.md).
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
| Euclidean geometry and vector calculus | Spatial metric $h_{ij}$, norms, dot products, gradients, and spatial integration on $\Sigma_T$ | Native substrate commitment plus direct mathematical tool | Geometry is fundamental only as Euclidean void geometry; it does not license Newtonian force ontology or 4D spacetime ontology |
| Absolute-time parameterization | Global time $T$, worldlines, causal emission times $T_{\mathrm{em}}$, and $\mathbb{U}_{\text{now}}\equiv S(T)$ | Native substrate commitment | Proper time, clock readout, and time dilation remain observer-level recovery targets |
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

The early quantum-origin examples should be read through this transfer
discipline as a connected benchmark bundle. Blackbody radiation tests whether
photon-channel emission, absorption, scattering, and medium exchange recover
detailed balance and the Planck occupation law without importing primitive mode
quantization. The photoelectric effect tests whether material capture
thresholds, recoil, heating, and bound-excitation rows close without treating
photon energy as a free-standing ontology. Hydrogen line spectra test whether
atomic envelope basins, shared spectral rows, and photon event ledgers recover
stable lines without adding a per-line clock factor. Double-slit and
wave-particle cases test whether unresolved path history remains live until a
localized record forms. Together these cases are inherited benchmark records:
they state what must be recovered, not what the substrate is.

## Foundational Formula Audit

The foundational layer uses a short list of formulas directly, but they do not
all have the same status. Some are substrate commitments, some are formal tools
used to state the substrate, some are accepted native dynamics, and some are
bookkeeping or proof scaffolds that remain subordinate to the native branch law.

The important correction is the status of the familiar $1/r$ potential. The
accepted primitive dynamics is not "a static $1/r$ field." The accepted
primitive dynamics is the causal-root, inverse-square, receiver-normal
acceleration law. A $1/r$ expression appears as a stationary/path-history
potential calibration and as a partial Fokker-type variational scaffold, but it
does not by itself relieve the burden of deriving or certifying the Master EOM.

| Formula family | Foundational expression | Current status | What it does not license |
| --- | --- | --- | --- |
| Absolute timespace: absolute time + Euclidean void | $\mathcal{M}=\mathbb{R}\times\mathbb{R}^3$, $\Sigma_T=\{T\}\times\mathbb{R}^3$ | Native substrate commitment | A fundamental 4D metric, spacetime curvature, or relativistic interval |
| Substrate clock and Euclidean metric | $dT$, $h_{ij}=\delta_{ij}$, $\nabla dT=0$, $\nabla h=0$ | Native substrate commitment plus direct mathematical tool | Curvature of the Euclidean void or observer proper time as a substrate interval |
| Worldline kinematics | $\mathbf X_a(T)$, $\mathbf V_a=d\mathbf X_a/dT$, $\mathbf A_a=d\mathbf V_a/dT$ | Native absolute-time kinematics | Particle-specific inertial mass or $\mathbf{F}=m\mathbf{a}$ as primitive law |
| Complete state and path history | $\mathbb{U}_{\text{now}}\equiv S(T)$ with history ledger $H_T$ and branch data $\mathcal{B}_T$ | Native bookkeeping requirement for deterministic delayed dynamics | A history-free Markov state or observer-accessible complete state |
| Polarity and sign bookkeeping | $q_a=\sigma_a\epsilon$, $\sigma_a\in\{-1,+1\}$, $\sigma_{ij}=\mathrm{sign}(q_iq_j)$ | Native polarity bookkeeping with observer-charge calibration | A completed derivation of electric, weak, color, or generation structure |
| Causal wake support | $\lVert\mathbf X-\mathbf X_{\mathrm{em}}\rVert=c_f(T-T_{\mathrm{em}})$ with $T>T_{\mathrm{em}}$ | Native causal support rule | A filled light cone, Lorentzian metric cone, or instantaneous action |
| Causal-root set | $F_{ij}(T,T_{\mathrm{em}})=\lVert\mathbf X_i(T)-\mathbf X_j(T_{\mathrm{em}})\rVert-c_f(T-T_{\mathrm{em}})$ and $\mathcal{C}_{ij}(T)=\{\,T_{\mathrm{em}}<T:F_{ij}(T,T_{\mathrm{em}})=0\,\}$ | Native branch-selection geometry | Treating all past source points as active, or treating root existence as stability proof |
| Causal surface density | $\rho(T,\mathbf X)=\dfrac{q}{4\pi r^2}\delta(r-c_f\tau)H(\tau)$ | Distributional representation of causal wake support | A permanent filled $1/r$ near field or autonomous field substance |
| Heaviside endpoint rule | $H(0)=0$ and $t_0<t$ in the causal-root set | Native endpoint convention | Instantaneous self-kick or zero-delay self-force |
| Root Jacobian and transversality | $D_{s,ij}=c_f-\mathbf{v}_j(s)\cdot\hat{\mathbf{r}}_{ij}$ with positive branch floor | Direct source-normal branch-analysis tool in the native law | Replacing branch strength by source-normal data alone, speed magnitude, or ignoring caustic/fold regimes |
| Per-hit acceleration | $\mathbf{a}_{ij}=\kappa\sigma_{ij}\dfrac{\lvert q_iq_j\rvert W_{ij}^{\mathrm{rec}}}{r_{ij}^2}\hat{\mathbf{r}}_{ij}$ with $W_{ij}^{\mathrm{rec}}=\lvert D_{T,ij}/D_{s,ij}\rvert$ | Accepted native dynamical law on certified branch charts | Cross-product forces, primitive magnetic fields, source-normal-only branch strength, or a mass-based force ontology |
| Total acceleration | $\dfrac{d^2\mathbf X_i}{dT^2}=\sum_j\sum_{T_{\mathrm{em}}\in\mathcal{C}_{ij}(T)}\mathbf A_{ij}(T;T_{\mathrm{em}})$ | Accepted native branch sum | Bulk equations, convergence for infinite populations, or assembly stability without added branch records |
| Superposition | Source contributions add linearly on the declared branch chart | Native source-addition rule and effective reconstruction tool | Wake-wake interaction as an independent substance law |
| Regularized wake surface | $\delta(r-c_f\tau)\to\delta_\eta(r-c_f\tau)$, with optional core scale $\epsilon_c$ in proof models | Formal regularization and simulation/proof tool | A new substrate substance, a hidden fit parameter, or a completed $\eta\to0$ proof |
| Potential reconstruction | $\Phi_{\text{net}}(\mathbf X,T)=\sum_o\Phi_o(\mathbf X,T)$ and $U_{o'}=q_{o'}\Phi_{\text{net}}[\text{history}]$ | Fixed-history bookkeeping and effective diagnostic | Static electrostatic ontology or source-position-only potential |
| Gradient force identity | $\mathbf{F}_{o'}=-\nabla_{\mathbf{s}_{o'}}U_{o'}$ for mollified fixed-history channels | Conditional diagnostic equivalent after normalization and fixed-history convention | Replacement of the Master EOM by an unrestricted potential theory |
| Work and kinetic bookkeeping | $dK/dt=\mu_K(\lVert\mathbf{v}\rVert)\mathbf{a}\cdot\mathbf{v}$ and optional $\mathbf{F}=\mu_{\text{arch}}\mathbf{a}$ | Energy bookkeeping after a kinetic proxy is declared | Primitive particle-specific mass or universal quadratic kinetic energy by assumption |
| $1/r$ potential/action scaffold | $\delta(g_{ij})/r_{ij}$ in path-history or Fokker-type action calculations | Calibration and partial variational scaffold | A universal proof that the scalar $1/r$ action alone derives the Master EOM |

The $1/r$ item therefore belongs below the accepted acceleration law in the
trust gradient. In a stationary emitter calibration, the path-history potential
may take the familiar form

$$
\phi(r,t)=\frac{q_0}{4\pi r}
$$

and taking a spatial gradient connects that amplitude to inverse-square force
scaling. In the full delayed dynamics, however, the accepted branch law remains

$$
\frac{d^2 \mathbf X_i}{dT^2}
=
\sum_j\sum_{T_{\mathrm{em}}\in\mathcal{C}_{ij}(T)}
\kappa\sigma_{ij}
\frac{\lvert q_iq_j\rvert W_{ij}^{\mathrm{rec}}(T;T_{\mathrm{em}})}
{R_{ij}^2(T;T_{\mathrm{em}})}
\hat{\mathbf R}_{ij}(T;T_{\mathrm{em}}).
$$

The pure scalar $1/r$ action scaffold is not yet an unconditional foundation
because its variation leaves a receiver-side constraint residual on generic
branches unless a stationarity condition or invariant counterterm closes the
Euler derivative. That failure does not demote the Master EOM. It demotes the
claim that the scalar $1/r$ scaffold alone explains the Master EOM.

### Reliance-Risk Rating

Risk here means the risk of relying on the formula as foundational before its
scope, proof status, and failure mode are controlled. It is not a measure of
importance. A formula can be central and still carry high reliance risk because
the branch, convergence, regularization, or recovery burden is heavy.

Risk scores:

- 1: low risk; mostly definitional or purely formal.
- 2: controlled risk; explicit postulate or convention with clear boundaries.
- 3: medium risk; usable, but easy to overextend into a stronger claim.
- 4: high risk; requires branch, regularization, or recovery discipline before
  broad use.
- 5: very high risk; should not be treated as foundational without a narrow
  certificate or separate proof.

| Formula family | Risk score | Main reliance risk | Required discipline |
| --- | --- | --- | --- |
| Absolute timespace: absolute time + Euclidean void | 2 | The fixed absolute time + Euclidean void background is an explicit ontology postulate with total-theory consequences if effective relativistic recovery fails | Keep curvature, expansion, and Lorentz behavior at the recovered-effect layer |
| Substrate clock and Euclidean metric | 2 | The formulas are stable substrate data, but overuse can turn observer proper time or effective metric behavior into background structure | Keep $dt$ and $h_{ij}$ separate from $\tau$ and $g_{\mu\nu}^{\text{eff}}$ |
| Worldline kinematics | 2 | The definitions are direct, but smoothness assumptions can exceed the branch or mollified regime | State regularity, impulse, and mollification assumptions before differentiating freely |
| Complete state and path history | 4 | The object is necessary but large; omitting path-history or branch data makes the state falsely Markovian | Specify retained history, provenance ledger, Noether sea sample, and branch chart |
| Polarity and sign bookkeeping | 3 | Polarity is native, but the observer-level charge normalization $\epsilon=\lvert e\rvert/6$ and gauge labels are not fully derived here | Treat $\epsilon$ and charge labels as observer bookkeeping until assembly closure supplies the map |
| Causal wake support | 3 | The equality surface can be misread as a filled cone, light cone, or effective metric primitive | Keep support on causal wake surfaces and distinguish $c_f$ from observer-channel speeds |
| Causal-root set | 4 | Root existence is exact but branch completeness, multiplicity, and fold handling are hard | Record active roots, inactive gaps, memory depth, and branch-chart boundaries |
| Causal surface density | 4 | The $1/r^2$ surface law can be mistaken for a permanent filled field and does not by itself solve convergence in large populations | Use it as distributional wake support with normalization, screening, or cancellation conditions |
| Heaviside endpoint rule | 2 | Endpoint exclusion is clear, but regulator choices can reintroduce ambiguous self-contact behavior | Keep $H(0)=0$ and match any mollified endpoint convention to the same branch packet |
| Source-normal transversality and receiver-normal strength | 4 | The source-normal denominator is essential and easy to misread as total branch strength; small denominators mark branch failure, not ordinary force amplification | Use $D_s$ for transversality floors, caustic routing, and root diagnostics; use $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$ for force/action strength |
| Per-hit acceleration | 4 | This is the accepted native law, but relying on it globally without branch certification overclaims exact closure | Attach use to certified causal roots, Jacobian floors, endpoint rules, and regularization status |
| Total acceleration | 5 | The branch sum can hide missing roots, divergent far populations, or unproved infinite-system convergence | Declare finite horizons, summation prescriptions, cancellation estimates, or convergence proof targets |
| Superposition | 4 | Linear source addition is native on a branch chart, but far-field accumulation and incoherent cancellation are nontrivial | Pair superposition with convergence, screening, finite-window, or mean-field controls |
| Regularized wake surface | 4 | A regulator can stabilize calculations while changing the branch behavior being claimed | State $\eta$, any core scale, refinement behavior, and whether the claim is finite-regulator only |
| Potential reconstruction | 4 | Potential notation can smuggle in static-field ontology or source-position-only dependence | Treat $\Phi_{\text{net}}$ and $U$ as fixed-history diagnostics unless a stronger action proof is supplied |
| Gradient force identity | 4 | The identity is conditional and can incorrectly replace the receiver-local Master EOM | Use only on mollified, fixed-history channels with declared normalization |
| Work and kinetic bookkeeping | 4 | Primitive mass and quadratic kinetic energy are not native; energy bookkeeping depends on the chosen kinetic proxy and wake term | Declare $K$, $\mu_K$, or $\mu_{\text{arch}}$ and keep observer mass as an assembly-level recovery |
| $1/r$ potential/action scaffold | 5 | It is useful for calibration and variational scaffolding, but the scalar scaffold alone does not generically derive the Master EOM | Treat it as conditional until the receiver-side residual, counterterm, or stationarity condition closes |

The highest-risk rows are not rejected. They are the rows where the formula is
too valuable to use casually. The correct response is narrower authority:
branch certificates for root formulas, convergence controls for sums,
finite-regulator labels for regularized claims, and explicit diagnostic status
for potential and action scaffolds.

## Regime And Scale Chart

The corpus should read inherited accuracy by regime, not by reputation.

A historical audit of prize-recognized discoveries reinforces the same rule: middle-scale instruments and effective records may remain almost entirely valid, while the smallest and largest regimes carry the strongest pressure to separate benchmark success from substrate ontology.

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
Y_{\mathcal{Q},W}(T)
=
\mathcal{P}_{\mathcal{Q},W}
\left(
\{\Gamma_A(T),\mathcal{H}_A(T)\}_{A\in \mathcal{A}_W},
\rho_{\text{NS}}(\mathbf X,T)
\right),
$$

where $\rho_{\text{NS}}$ is the Noether sea state sampled by the same window.
In residuals below, $\Gamma(T)$ abbreviates the full sampled collection of
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
\frac{d}{dT}\mathcal{P}_{\mathcal{Q},W}(\Gamma(T))
-
F_{\mathrm{bulk}}\!\left(Y_{\mathcal{Q},W}(T)\right)
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

[Theory Bridges](theory-bridges.md) should remain the detailed bridge
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
