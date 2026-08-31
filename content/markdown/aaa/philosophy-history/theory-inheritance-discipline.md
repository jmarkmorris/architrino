# Theory Inheritance Discipline

This chapter states how inherited physics concepts may be used during $\mathbb{A}\mathbb{A}\mathbb{A}$ development. Its central rule is simple: successful mapping is not burden relief. A concept from a higher-level theory may be accurate, useful, or even indispensable in its tested regime while still failing to identify the substrate mechanism that produces the result.

The discipline here sits between the broad survey in [Theory Mapping](theory-mapping.md), the classification catalog in [Theory Differentials](theory-differentials.md), and the detailed per-framework mappings in [Theory Bridges](theory-bridges.md). It does not own the substrate ontology, the Master Equation of Motion, assembly definitions, validation gates, or parameter ledgers. Its job is to prevent inherited concepts from entering the corpus with more authority than they have earned.

## Core Claim

No inherited theory is trusted as ontology. Inherited theories are trusted only as structured evidence, mathematics, benchmark records, or comparison pressure after their regime and stack placement are declared.

The strongest safe use is therefore not "this maps to $\mathbb{A}\mathbb{A}\mathbb{A}$." The stronger use is:

1. name the regime where the inherited concept is accurate,
2. state the mathematics or record that survives,
3. locate the corresponding $\mathbb{A}\mathbb{A}\mathbb{A}$ layer,
4. define the residual that would count as recovery,
5. name the failure mode that would show the mapping has overreached.

Plain language: the inherited theory can tell the program what must be recovered, but it cannot tell the program what the world is made of.

## Transfer Record

For an inherited concept $C$, the comparison is disciplined only when the corpus can state the following transfer record.

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

[View →](../../../../equation-mapping.html#corpus-equation-ad9a010be26d16b5)

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

This is a methodology object, not a new validation gate. It is a compact way to keep ontology, effective description, and inference separated while the theory is being built.

A typical residual has the following schematic form.

$$
\mathcal{R}_C(\theta)
=
d_C\!\left(
B_C\!\left(\Pi_C^{\mathbb{A}\mathbb{A}\mathbb{A}}(\theta)\right),
B_C^{\mathrm{obs}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5ea8979e8bfcf120)

Here $\theta$ is the candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ branch record, $d_C$ is the comparison metric appropriate to the inherited concept, and $B_C^{\mathrm{obs}}$ is the validated observer-level benchmark.

The important burden is the origin of both $\theta$ and the projection map. If either is selected after seeing the benchmark, the result is benchmark fitting. For a disciplined comparison, the projection is fixed on a calibration record $D_C^{\mathrm{cal}}$ that is disjoint from the recovery benchmark. The following expression states the calibration rule.

$$
\Pi_C^\star
=
\underset{\Pi\in\mathfrak{P}_C}{\operatorname{arg\,min}}\;
L_C^{\mathrm{cal}}\!\left(\Pi;D_C^{\mathrm{cal}}\right),
\qquad
D_C^{\mathrm{cal}}\cap B_C^{\mathrm{obs}}=\varnothing .
$$

[View →](../../../../equation-mapping.html#corpus-equation-21a383726edb6b76)

The frozen map $\Pi_C^\star$ must then be shared across every benchmark family that claims the same observer channel. A separate map for each clock type, spectral line, lensing observable, or detector family is hidden retuning, not recovery. If $\theta$ is generated from the Master EOM, assembly closure, Noether sea response, and declared record channel before comparison, and if $\Pi_C^\star$ is calibrated independently and frozen before the benchmark is opened, then a small $\mathcal{R}_C$ can become evidence of implementation closure.

## Transfer Classes

Inherited concepts enter the corpus in five different ways.

| Transfer class | Authority level | Typical use | Burden |
| --- | --- | --- | --- |
| Native substrate commitment | Highest, but only when already part of $\mathbb{A}\mathbb{A}\mathbb{A}$ | Absolute time, Euclidean void, architrinos, causal wakes, path history | Must be stated by the native ontology and dynamics, not borrowed from a historical analogy |
| Direct mathematical tool | Formal, not ontological | Calculus, distributions, Jacobians, norms, variational language, residuals | Must not import the ontology of the theory where the tool was historically used |
| Validated benchmark record | Empirical and operational | SM spectra, QED precision rows, Lorentz tests, PPN bounds, BBN/CMB rows | Must be recovered as an output of one declared branch record |
| Effective-limit concept | Conditional | Wavefunction, thermodynamics, entropy, hydrodynamics, effective metric, cosmology variables | Must declare coarse-graining, regime, and residual |
| Directional comparison | Low to medium | Holography, MOND-like fits, inflationary language, string/LQG/SUSY programs, information/computation ontology | May guide questions, but cannot supply doctrine without a native derivation |

The transfer class can change by regime. A mathematical structure may be a direct formal tool in one chapter, an effective-limit concept in another, and a directional analogy in a third. The page or section using it must make the local status visible. Compound transfer-class labels are not allowed. When a row has more than one role, the transfer class records its governing authority, while the separate ontology-placement and mathematical-use fields record the other distinctions.

### Claim-Grade Ceilings

Transfer class and claim grade are independent axes. Transfer class says why an inherited object is present; the claim grade says what the evidence establishes at the layer where the claim is made. The following ceilings apply unless a separate native derivation or independent measurement is named.

| Transfer class | Substrate claim ceiling | Assembly or effective-layer ceiling | Observer-record ceiling |
| --- | --- | --- | --- |
| Native substrate commitment | Guessed when postulated; derived only when a native theorem supplies it | Inferred through a declared projection | Measured only for the instrument record, never for the substrate commitment itself |
| Direct mathematical tool | No physical claim grade by itself | No physical claim grade by itself | No physical claim grade by itself |
| Validated benchmark record | Guessed as an account of substrate ontology | Inferred only when one independently fixed generator and projection predict the record | Measured for the declared instrument and uncertainty model |
| Effective-limit concept | Guessed if promoted to substrate ontology | Inferred after coarse-graining, domain, and residual are controlled | Measured only for the underlying record; the interpretation remains inferred |
| Directional comparison | Guessed | Guessed, or inferred only as a comparative constraint | Measured only when a separate benchmark record is named |

The mechanical audit requires verification before advancement: a lower-layer claim cannot inherit the grade of a higher-layer success. A measured spectrum is still only a measured spectrum; the proposed substrate mechanism beneath it remains inferred or guessed until an independent native prediction closes the projection and residual.

## Canonical Direct-Use Audit

The current corpus uses prior-theory concepts directly only in controlled ways. This list is the canonical audit level for the present corpus; individual chapters still own their local details.

| Inherited concept family | Current corpus use | Transfer class | Ontology placement | Mathematical-use status | Scope discipline |
| --- | --- | --- | --- | --- | --- |
| Euclidean geometry and vector calculus | Spatial metric $h_{ij}$, norms, dot products, gradients, and spatial integration on $\Sigma_T$ | Native substrate commitment | Substrate-native | Direct formal tool | Geometry is fundamental only as Euclidean void geometry; it does not license Newtonian force ontology or 4D spacetime ontology |
| Absolute-time parameterization | Global time $T$, worldlines, causal emission times $T_t$, and $\mathbb{U}_{\text{now}}\equiv S(T)$ | Native substrate commitment | Substrate-native | Native kinematics | Proper time, clock readout, and time dilation remain observer-level recovery targets |
| Distributional causal surfaces | Delta functions, Heaviside support, mollification, branch integrals, and weak limits | Direct mathematical tool | Formal only | Distributional representation | The distribution is a formal representation of causal wake support, not a continuum field substance |
| Jacobian and branch analysis | Causal-root weights, transversality floors, caustic handling, and multi-root bookkeeping | Direct mathematical tool | Formal only | Branch-analysis tool | A root ledger records admissible delayed channels; it is not itself an acceleration law or stability proof |
| Inverse-square surface dilution | Causal wake density over expanding surfaces | Native substrate commitment | Substrate-native | Native dynamics | It supplies the microscopic kernel but still owes effective recovery of observer-level field laws |
| Conservation language | Energy, momentum, angular momentum, polarity inventory, and event ledgers | Validated benchmark record | Assembly and observer target | Native bookkeeping target | Observer-level conservation laws must be traced to event records rather than inserted as standalone axioms |
| Standard Model labels | Electric charge, color, weak isospin, hypercharge, chirality, generation, CKM/PMNS rows, and anomaly checks | Validated benchmark record | Observer classification | Assembly-dictionary target | Labels may organize the assembly dictionary, but the gauge dynamics and couplings remain derivation targets |
| QED/QCD/EW precision formalisms | Loop-sensitive observables, confinement benchmarks, electroweak rates, branching ratios, and null-result bounds | Validated benchmark record | Observer inference | Precision-recovery target | Perturbative and lattice successes fix recovery pressure; they do not establish virtual particles, continuum fields, or gauge primitives as substrate ontology |
| Lorentz and SR behavior | Time dilation, length contraction, invariant signal speed, two-way synchronization, and preferred-frame leakage bounds | Effective-limit concept | Observer-effective | Shared projection target | The closure target is moving-assembly deformation and clock/ruler retuning from causal-root dynamics, not a Lorentz postulate |
| GR and PPN behavior | Redshift, Shapiro delay, lensing, orbital precession, gravitational waves, black-hole ring/lensing scales, and PPN coefficients | Effective-limit concept | Observer-effective | Shared response-map target | Effective metric language is retained only after a Noether sea response map supplies clock, ruler, signal, and weak-field channels without per-observable retuning |
| Quantum state language | Wavefunction, Born weights, uncertainty, operators, spin, entanglement, no-signaling, and Bell/CHSH benchmarks | Effective-limit concept | Observer-effective | Statistical reconstruction target | The effective chart must derive basin measures, record formation, and apparatus kernels from deterministic path-history dynamics |
| Thermodynamics and statistical mechanics | Entropy, temperature, heat, irreversibility, kinetic theory, virial behavior, and ensemble closures | Effective-limit concept | Bulk-effective | Coarse-grained reconstruction | The regime must declare the coarse-graining, access window, boundary flux, and measure; global cosmological extrapolation is not automatic |
| Radiation and reaction formulas | Larmor/Lienard, bremsstrahlung, synchrotron, Compton-like rows, pair thresholds, blackbody and polarization constraints | Validated benchmark record | Observer record | Event-ledger target | Formulas are target limits for event ledgers with photon output, recoil, remnant, heat, reaction, and medium-update rows |
| Cosmology variables | $a_{\mathrm{eff}}(t_{\mathrm{eff}})$, $H_{\mathrm{eff}}(t_{\mathrm{eff}})$, redshift, CMB spectra, BAO rulers, BBN abundances, growth, $S_8$, and $\Omega$ summaries | Validated benchmark record | Observer inference | Shared survey-projection target | These variables describe Noether sea evolution, transport, and clock-rate comparison; the Euclidean void does not expand |
| Information and computation | State distinction, encoding, measurement records, reset cost, algorithmic scaling, and simulation discipline | Directional comparison | Methodological comparison | Record-analysis language | Useful for records and models, but not a substrate ontology |
| Holography, AdS/CFT, islands, MOND-like fits, string/LQG/SUSY/inflationary programs | Comparison pressure, candidate analogies, and boundary checks | Directional comparison | Comparison only | Heuristic or formal analogy | They may sharpen constraints, but they are not closure targets unless a tested observable or hard consistency condition requires them |

The early quantum-origin examples should be read through this transfer discipline as a connected benchmark bundle. Blackbody radiation tests whether photon-channel emission, absorption, scattering, and medium exchange recover detailed balance and the Planck occupation law without importing primitive mode quantization. The photoelectric effect tests whether material capture thresholds, recoil, heating, and bound-excitation rows close without treating photon energy as a free-standing ontology. Hydrogen line spectra test whether atomic envelope basins, shared spectral rows, and photon event ledgers recover stable lines without adding a per-line clock factor. Double-slit and wave-particle cases test whether unresolved path history remains live until a localized record forms. Together these cases are inherited benchmark records: they state what must be recovered, not what the substrate is.

### Constants And Unit Conventions

Constants do not all inherit in the same way. A unit convention changes the coordinates used to report a record; a measured constant summarizes an observer-level relation; a dimensionless coupling is a recovery target; and a native parameter belongs to the substrate law only when the native ontology or dynamics declares it.

| Item | Transfer class | Permitted use | Prohibited promotion |
| --- | --- | --- | --- |
| $c_f$ | Native substrate commitment | Symbolic wake speed in derivations; every new numerical instantiation uses normalized wake-speed units with $c_f=1$ | Identifying $c_f$ with an observer-channel speed before clock, ruler, and signal recovery |
| SI and other unit systems | Direct mathematical tool | Reporting and converting observer records with a complete dimensional ledger | Treating metres, seconds, amperes, or their defining conventions as substrate objects |
| $\hbar$ | Validated benchmark record | Atomic, spectral, and quantum-statistical normalization target | Primitive quantization or uncertainty at the architrino layer |
| $G$ | Validated benchmark record | Weak-field, orbital, lensing, timing, and gravitational-radiation recovery target | Primitive gravitational coupling between architrinos |
| $\alpha$ | Validated benchmark record | Dimensionless precision target shared by spectroscopy, recoil, and lepton-moment records | A freely inserted substrate coupling |
| $k_B$ | Direct mathematical tool | Conversion between temperature units and energy units in a declared bulk ensemble | Thermodynamics or temperature assigned to one architrino |

Numerical recovery must state which constants were fitted, which were held out, and which are unit conventions. A fitted value cannot then serve as an independent prediction in the same record family. Dimensionless residuals are preferred because they expose hidden unit retuning, but forming a dimensionless quantity does not by itself make its physical interpretation native.

### Worked Transfer Record: Lorentz Clock Behavior

This example instantiates the seven-field record as a closure specification, not as a claim that Lorentz recovery has already been derived. The inherited target is the clock-rate relation $\Delta\tau/\Delta t=\sqrt{1-v^2/c_\gamma^2}$ in the inertial, weak-environment regime.

| Transfer-record field | Instantiation |
| --- | --- |
| $D_C$ | Matched clocks in uniform relative motion, away from strong environmental gradients, over a declared speed and acceleration window |
| $M_C$ | The dimensionless clock-rate curve $\Delta\tau/\Delta t=\sqrt{1-v^2/c_\gamma^2}$ and its low-speed expansion |
| $B_C$ | Withheld observer-level clock-comparison records from at least two independent clock constructions, with synchronization and environmental corrections included in their published uncertainty models |
| $\Pi_C^{\mathbb{A}\mathbb{A}\mathbb{A}}$ | One frozen map from assembly cycle counts, apparatus motion, signal exchange, and sampled Noether sea state to operational elapsed-time and speed records |
| $\mathcal{R}_C$ | A covariance-weighted residual over all withheld clock families, evaluated with one branch generator and no clock-specific parameter changes |
| $P_C$ | Effective-limit concept: Lorentz clock behavior is a validated observer-level regularity and a recovery target, not substrate geometry |
| $F_C$ | Failure occurs if different clock types require different projection maps, if the same map misses the shared rate curve beyond declared uncertainty, or if the construction imports a Lorentzian metric or proper-time law into the substrate dynamics |

The substrate prohibition is explicit: neither the Lorentz transformation nor a Minkowski metric may generate the architrino or assembly trajectory. The native generator must first produce moving-assembly and signal records. The projection is calibrated on stationary clock correspondences and frozen before the moving-clock benchmarks are opened. The benchmark is independent only when its moving-clock measurements, analysis pipeline, and uncertainty model were not used to choose the branch record or projection. Passing one clock family and failing another leaves the inheritance open even if a pooled fit looks good.

## Foundational Formula Audit

The foundational layer uses a short list of formulas directly, but they do not all have the same status. Some are substrate commitments, some are formal tools used to state the substrate, some are accepted native dynamics, and some are bookkeeping or proof scaffolds that remain subordinate to the native branch law.

The important correction is the status of the familiar $1/r$ potential. The accepted primitive dynamics is not "a static $1/r$ field." The accepted primitive dynamics is the causal-root, inverse-square, receiver-local acceleration law with a transmitter-side acceleration weight. A $1/r$ expression appears as a stationary/path-history potential calibration and as a partial Fokker-type variational scaffold, but it does not by itself relieve the burden of deriving or certifying the Master EOM.

| Formula family | Foundational expression | Current status | What it does not license |
| --- | --- | --- | --- |
| Absolute timespace: absolute time + Euclidean void | $\mathcal{M}=\mathbb{R}\times\mathbb{R}^3$, $\Sigma_T=\{T\}\times\mathbb{R}^3$ | Native substrate commitment | A fundamental 4D metric, spacetime curvature, or relativistic interval |
| Substrate clock and Euclidean metric | $dT$, $h_{ij}=\delta_{ij}$, $\nabla dT=0$, $\nabla h=0$ | Native substrate commitment plus direct mathematical tool | Curvature of the Euclidean void or observer proper time as a substrate interval |
| Worldline kinematics | $\mathbf X_a(T)$, $\mathbf V_a=d\mathbf X_a/dT$, $\mathbf A_a=d\mathbf V_a/dT$ | Native absolute-time kinematics | Particle-specific inertial mass or $\mathbf{F}=m\mathbf{a}$ as primitive law |
| Complete state and path history | $\mathbb{U}_{\text{now}}\equiv S(T)$ with history ledger $H_T$ and branch data $\mathcal{B}_T$ | Native bookkeeping requirement for deterministic delayed dynamics | A history-free Markov state or observer-accessible complete state |
| Polarity and sign bookkeeping | $q_a=\sigma_a\epsilon$, $\sigma_a\in\{-1,+1\}$, $\sigma_{ij}=\mathrm{sign}(q_iq_j)$ | Native polarity bookkeeping with observer-charge calibration | A completed derivation of electric, weak, color, or generation structure |
| Causal wake support | $\lVert\mathbf X-\mathbf X_{\mathrm{em}}\rVert=c_f(T-T_t)$ with $T>T_t$ | Native causal support rule | A filled light cone, Lorentzian metric cone, or instantaneous action |
| Causal-root set | $F_{ij}(T,T_t)=\lVert\mathbf X_i(T)-\mathbf X_j(T_t)\rVert-c_f(T-T_t)$ and $\mathcal{C}_{ij}(T)=\{\,T_t<T:F_{ij}(T,T_t)=0\,\}$ | Native branch-selection geometry | Treating all past source points as active, or treating root existence as stability proof |
| Causal surface density | $\rho(T,\mathbf X)=\dfrac{q}{4\pi r^2}\delta(r-c_f\tau)H(\tau)$ | Distributional representation of causal wake support | A permanent filled $1/r$ near field or autonomous field substance |
| Heaviside endpoint rule | $H(0)=0$ and $T_0<T$ in the causal-root set | Native endpoint convention | Instantaneous self-kick or zero-delay self-acceleration |
| Root Jacobian and transversality | $D_{t,ij}=c_f-\mathbf{v}_j(s)\cdot\hat{\mathbf{r}}_{ij}$ with positive branch floor | Direct transmitter-side branch-analysis tool in the native law | Replacing branch strength by transmitter-side data alone, speed magnitude, or ignoring caustic/fold regimes |
| Per-hit acceleration | $\mathbf{a}_{ij}=\kappa\sigma_{ij}\dfrac{\lvert q_iq_j\rvert W_{ij}^{\mathrm{acc}}}{r_{ij}^2}\hat{\mathbf{r}}_{ij}$ with $W_{ij}^{\mathrm{acc}}=c_f/\lvert D_{t,ij}\rvert$ | Accepted native dynamical law on certified branch charts | Cross-product forces, primitive magnetic fields, transmitter-side-only branch strength, or a mass-based force ontology |
| Total acceleration | $\dfrac{d^2\mathbf X_i}{dT^2}=\sum_j\sum_{T_t\in\mathcal{C}_{ij}(T)}\mathbf A_{ij}(T;T_t)$ | Accepted native branch sum | Bulk equations, convergence for infinite populations, or assembly stability without added branch records |
| Superposition | Source contributions add linearly on the declared branch chart | Native source-addition rule and effective reconstruction tool | Wake-wake interaction as an independent substance law |
| Regularized wake surface | $\delta(r-c_f\tau)\to\delta_\eta(r-c_f\tau)$, with optional core scale $\epsilon_c$ in proof models | Formal regularization and simulation/proof tool | A new substrate substance, a hidden fit parameter, or a completed $\eta\to0$ proof |
| Potential reconstruction | $\Phi_{\text{net}}(\mathbf X,T)=\sum_o\Phi_o(\mathbf X,T)$ and $U_{o'}=q_{o'}\Phi_{\text{net}}[\text{history}]$ | Fixed-history bookkeeping and effective diagnostic | Static electrostatic ontology or source-position-only potential |
| Potential-gradient bookkeeping identity | $\mathbf{F}_{o'}=-\nabla_{\mathbf X_{o'}}U_{o'}$ for mollified fixed-history channels | Conditional assembly-level bookkeeping equivalent after normalization and fixed-history convention | A substrate force law or replacement of the Master Equation by an unrestricted potential theory |
| Work and kinetic bookkeeping | $dK/dT=\mu_K(\lVert\mathbf V\rVert)\mathbf A\cdot\mathbf V$ and optional $\mathbf F=\mu_{\text{arch}}\mathbf A$ | Assembly-level energy bookkeeping after a kinetic proxy is declared | A substrate force law, primitive particle-specific mass, or universal quadratic kinetic energy by assumption |
| $1/r$ potential/action scaffold | $\delta(g_{ij})/r_{ij}$ in path-history or Fokker-type action calculations | Calibration and partial variational scaffold | A universal proof that the scalar $1/r$ action alone derives the Master EOM |

The $1/r$ item therefore belongs below the accepted acceleration law in the trust gradient. In a stationary emitter calibration, the path-history potential may take the following familiar form.

$$
\phi(r,T)=\frac{q_0}{4\pi r}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6bc66b01432d9c94)

Taking a spatial gradient connects that amplitude to inverse-square acceleration scaling under the declared fixed-history calibration. In the full delayed dynamics, however, the following equation remains the accepted branch law.

$$
\frac{d^2 \mathbf X_i}{dT^2}
=
\sum_j\sum_{T_t\in\mathcal{C}_{ij}(T)}
\kappa\sigma_{ij}
\frac{\lvert q_iq_j\rvert W_{ij}^{\mathrm{acc}}(T;T_t)}
{R_{ij}^2(T;T_t)}
\hat{\mathbf R}_{ij}(T;T_t).
$$

[View →](../../../../equation-mapping.html#corpus-equation-6dd1a98c25f53a45)

The pure scalar $1/r$ action scaffold is not yet an unconditional foundation because its variation leaves a receiver-side constraint residual on generic branches unless a stationarity condition or invariant counterterm closes the Euler derivative. That failure does not demote the Master EOM. It demotes the claim that the scalar $1/r$ scaffold alone explains the Master EOM.

### Reliance-Risk Rating

Risk here means the risk of relying on the formula as foundational before its scope, proof status, and failure mode are controlled. It is not a measure of importance. A formula can be central and still carry high reliance risk because the branch, convergence, regularization, or recovery burden is heavy.

Risk scores:

- 1: low risk; mostly definitional or purely formal.
- 2: controlled risk; explicit postulate or convention with clear boundaries.
- 3: medium risk; usable, but easy to overextend into a stronger claim.
- 4: high risk; requires branch, regularization, or recovery discipline before broad use.
- 5: very high risk; should not be treated as foundational without a narrow certificate or separate proof.

| Formula family | Risk score | Main reliance risk | Required discipline |
| --- | --- | --- | --- |
| Absolute timespace: absolute time + Euclidean void | 2 | The fixed absolute time + Euclidean void background is an explicit ontology postulate with total-theory consequences if effective relativistic recovery fails | Keep curvature, expansion, and Lorentz behavior at the recovered-effect layer |
| Substrate clock and Euclidean metric | 2 | The formulas are stable substrate data, but overuse can turn observer proper time or effective metric behavior into background structure | Keep $dT$ and $h_{ij}$ separate from $\tau$ and $g_{\mu\nu}^{\text{eff}}$ |
| Worldline kinematics | 2 | The definitions are direct, but smoothness assumptions can exceed the branch or mollified regime | State regularity, impulse, and mollification assumptions before differentiating freely |
| Complete state and path history | 4 | The object is necessary but large; omitting path-history or branch data makes the state falsely Markovian | Specify retained history, provenance ledger, Noether sea sample, and branch chart |
| Polarity and sign bookkeeping | 3 | Polarity is native, but the observer-level charge normalization $\epsilon=\lvert e\rvert/6$ and gauge labels are not fully derived here | Treat $\epsilon$ and charge labels as observer bookkeeping until assembly closure supplies the map |
| Causal wake support | 3 | The equality surface can be misread as a filled cone, light cone, or effective metric primitive | Keep support on causal wake surfaces and distinguish $c_f$ from observer-channel speeds |
| Causal-root set | 4 | Root existence is exact but branch completeness, multiplicity, and fold handling are hard | Record active roots, inactive gaps, memory depth, and branch-chart boundaries |
| Causal surface density | 4 | The $1/r^2$ surface law can be mistaken for a permanent filled field and does not by itself solve convergence in large populations | Use it as distributional wake support with normalization, screening, or cancellation conditions |
| Heaviside endpoint rule | 2 | Endpoint exclusion is clear, but regulator choices can reintroduce ambiguous self-contact behavior | Keep $H(0)=0$ and match any mollified endpoint convention to the same branch packet |
| Transmitter-side transversality and transmitter-side acceleration weight | 4 | The transmitter-side factor is essential and easy to misread as total branch strength; small denominators mark branch failure, not ordinary acceleration amplification | Use $D_t$ for transversality floors, caustic routing, and root diagnostics; use $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$ for per-hit acceleration strength |
| Per-hit acceleration | 4 | This is the accepted native law, but relying on it globally without branch certification overclaims exact closure | Attach use to certified causal roots, Jacobian floors, endpoint rules, and regularization status |
| Total acceleration | 5 | The branch sum can hide missing roots, divergent far populations, or unproved infinite-system convergence | Declare finite horizons, summation prescriptions, cancellation estimates, or convergence proof targets |
| Superposition | 4 | Linear source addition is native on a branch chart, but far-field accumulation and incoherent cancellation are nontrivial | Pair superposition with convergence, screening, finite-window, or mean-field controls |
| Regularized wake surface | 4 | A regulator can stabilize calculations while changing the branch behavior being claimed | State $\eta$, any core scale, refinement behavior, and whether the claim is finite-regulator only |
| Potential reconstruction | 4 | Potential notation can smuggle in static-field ontology or source-position-only dependence | Treat $\Phi_{\text{net}}$ and $U$ as fixed-history diagnostics unless a stronger action proof is supplied |
| Potential-gradient bookkeeping identity | 4 | The identity is conditional and can incorrectly replace the receiver-local Master Equation or introduce substrate force language | Use only as optional assembly-level bookkeeping on mollified, fixed-history channels with declared normalization |
| Work and kinetic bookkeeping | 4 | Primitive mass and quadratic kinetic energy are not native; energy bookkeeping depends on the chosen kinetic proxy and wake term | Declare $K$, $\mu_K$, or $\mu_{\text{arch}}$ and keep observer mass as an assembly-level recovery |
| $1/r$ potential/action scaffold | 5 | It is useful for calibration and variational scaffolding, but the scalar scaffold alone does not generically derive the Master EOM | Treat it as conditional until the receiver-side residual, counterterm, or stationarity condition closes |

The highest-risk rows are not rejected. They are the rows where the formula is too valuable to use casually. The correct response is narrower authority: branch certificates for root formulas, convergence controls for sums, finite-regulator labels for regularized claims, and explicit diagnostic status for potential and action scaffolds.

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

**Lemma (methodological):** A mapping from an inherited concept $C$ to an $\mathbb{A}\mathbb{A}\mathbb{A}$ descriptor $A_C$ does not reduce the proof burden unless the same branch record $\theta$ also supplies the implementation map $\Pi_C^{\mathbb{A}\mathbb{A}\mathbb{A}}$, keeps $\mathcal{R}_C(\theta)$ below the declared tolerance in $D_C$, and avoids the known failure mode $F_C$ with a reasoning provenance $P_C$ appropriate to the claim level.

Proof route: a verbal or diagrammatic mapping establishes only a relation between labels. Benchmark recovery requires an output comparison. Implementation closure requires a generator. If the generator is not declared, the concept still sits at the comparison layer. If the generator changes between benchmark families, the result is hidden tuning. If the generator is native and shared across the relevant sectors, then the inherited concept has been recovered as an effective limit rather than merely named.

Plain language: a map is not a mechanism. A mechanism is a native record that keeps working after the comparison target changes.

## Reasoning Provenance Below Existing Theory

The hardest inheritance cases appear when an inherited theory works above the level where $\mathbb{A}\mathbb{A}\mathbb{A}$ needs to reason. A formula may describe bulk matter, a detector record, or an ensemble statistic with high accuracy while still saying little about the motion of one assembly, one causal-root branch family, or one event ledger. In that zone, the solution is not yet sharp enough for doctrine. The corpus must record why an equation is being trusted, doubted, or used only as a directional guide.

This record is not a progress diary. It is reasoning provenance: the active chain of reasons that explains why a candidate equation is allowed to carry its current claim level. A useful provenance note contains:

1. the inherited trigger, meaning the equation, regularity, or benchmark that motivated the deeper search,
2. the native candidate, meaning the $\mathbb{A}\mathbb{A}\mathbb{A}$ equation, branch condition, residual, or simulation target proposed underneath it,
3. the reason for belief, such as a symmetry, dimensional match, conservation channel, branch-counting identity, limiting case, or shared generator,
4. the reason for doubt, such as hidden coarse-graining, missing branch admissibility, ensemble dependence, caustic sensitivity, boundary flux, or a record channel that has not been generated natively,
5. the level of the claim: individual assembly, finite assembly family, bulk or statistical population, observer inference, or analogy,
6. the first falsifier that would demote the equation.

The central question is therefore not merely "does this equation map?" The central question is "what makes this equation believable at this level?"

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

Bulk formulas are not automatically wrong. They are often the most accurate description available at the observer scale. The error is to treat a bulk formula as if it already describes one assembly unless the projection from assembly records to bulk variables has been shown.

Let $\Gamma_A(t)$ denote the retained state of assembly $A$, and let $\mathcal{H}_A(t)$ denote its path-history and event record over an access window $W$. Let $\mathcal{A}_W$ be the assembly family sampled by that window, and let $\mathcal{P}_{\mathcal{Q},W}$ be the declared projection that keeps only the observables $\mathcal{Q}$ relevant to the inherited comparison. The following expression gives a schematic bulk variable.

$$
Y_{\mathcal{Q},W}(T)
=
\mathcal{P}_{\mathcal{Q},W}
\left(
\{\Gamma_A(T),\mathcal{H}_A(T)\}_{A\in \mathcal{A}_W},
\rho_{\text{NS}}(\mathbf X,T)
\right),
$$

[View →](../../../../equation-mapping.html#corpus-equation-1a5f21ab71b6e120)

Here $\rho_{\text{NS}}$ is the Noether sea state sampled by the same window. In residuals below, $\Gamma(T)$ abbreviates the full sampled collection of assembly states, path histories, and Noether sea state.

A proposed bulk equation may have the following form.

$$
\dot{Y}_{\mathcal{Q},W}
=
F_{\mathrm{bulk}}\!\left(Y_{\mathcal{Q},W}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-2cf1f1125281cee5)

Its credibility remains at the bulk level until the following projection residual is controlled.

$$
\mathcal{R}_{\mathrm{bulk}}
=
\left\|
\frac{d}{dT}\mathcal{P}_{\mathcal{Q},W}(\Gamma(T))
-
F_{\mathrm{bulk}}\!\left(Y_{\mathcal{Q},W}(T)\right)
\right\|_{\mathcal{Q},W}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-eca6c7207590acf8)

It becomes credible as an individual-assembly guide only after the following separate assembly-level residual is controlled.

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

[View →](../../../../equation-mapping.html#corpus-equation-c5c02e4d173b2fab)

Here $\varphi_t$ is the native evolution of the assembly record, $\Pi_A$ is the assembly-level observable projection, and $\Pi_A^{\mathrm{bulk}}$ is the individual-assembly value inferred from the bulk equation. If $\mathcal{R}_{\mathrm{bulk}}$ is small while $\mathcal{R}_{\mathrm{assembly}}$ is large, the formula remains a population law. If both residuals are small in the declared regime, the bulk equation may serve as an effective assembly-level guide, but only in that regime.

This distinction is why virial, thermodynamic, hydrodynamic, cosmological, and detector-level formulas need special care. They may be accurate descriptions of records after projection while still being incomplete descriptions of the assembly behavior that produced those records.

## Use With Existing Comparison Documents

[Theory Mapping](theory-mapping.md) should remain the compact reader map of major frameworks. It tells readers what the inherited theory says and how $\mathbb{A}\mathbb{A}\mathbb{A}$ expects to recover, reinterpret, or reject it.

[Theory Differentials](theory-differentials.md) should remain the classification catalog. It locates each concept in the comparative stack and the $\mathbb{A}\mathbb{A}\mathbb{A}$ stack, names its relation type, and records the mapping target.

[Theory Bridges](theory-bridges.md) should remain the detailed bridge lane. A bridge may use this chapter's transfer record to keep its mathematical handoff disciplined, but the bridge still has to point back to the domain chapters that own the underlying mechanism.

[Failure Criteria](../validation/failure-criteria.md), [Parameter Ledger](../validation/parameter-ledger.md), and [Constraint Ledger](../validation/constraint-ledger.md) remain the places where validation records, benchmark families, and null-result pressure are made operational. This chapter should not duplicate those ledgers.

## Writing Rule

When a corpus page relies on inherited theory, the prose should answer five questions before the concept carries weight:

1. What exactly is inherited: mathematics, data, benchmark, analogy, or method?
2. What is the $\mathbb{A}\mathbb{A}\mathbb{A}$ layer that generates the same observable or regularity?
3. What residual or failure mode would show that the inheritance has not closed?
4. What reasoning provenance makes the equation believable, doubtful, or only directional?
5. Is the equation about an individual assembly, a finite assembly family, a bulk or statistical population, or observer inference?

This rule keeps the force of inherited successes while preserving the deeper burden: $\mathbb{A}\mathbb{A}\mathbb{A}$ must still find the better metric, principle, or native mechanism when the inherited theory only supplies a successful effective summary.
