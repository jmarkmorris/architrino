# Simulation Perspective and Closure Targets

This chapter separates the mechanisms already defined by the [Master Equation](../../dynamics/master-equation.md) from the recovery claims that simulation must still test. An [architrino](../../foundations/architrino.md) is a point transceiver of fixed polarity, one of two signs; it emits a causal wake, an expanding spherical surface that travels outward at the primitive wake speed $c_f$, and it is accelerated only by the wakes that reach it. The primitive inputs are the [two architrino polarities](../../foundations/architrino.md), which set the sign of each interaction; delayed line-of-action acceleration, directed from the transmitter's past emission point to the receiver; transmitter-side causal-surface weighting, which scales each arriving contribution by the spacing of the transmitter's emitted surfaces; and same-transmitter causal-root branches, the self-hits in which an architrino meets its own earlier wake, a causal root being an emission time whose wake reaches the receiver exactly at the reception time. Stability, scale selection, inertia, gauge-sector behavior, and quantum-like statistics are downstream closure targets rather than consequences licensed by naming those inputs.

General relativity and quantum mechanics supply observer-level recovery targets: the clock, ruler, orbit, and light-bending behavior that general relativity describes, and the interference, correlation, and measurement statistics that quantum mechanics describes, are outputs the substrate dynamics must eventually reproduce, never premises of the simulation. A simulation supports such a recovery only when an independently specified observable map and benchmark residual pass; resemblance of internal geometry is not evidence by itself.

We work in normalized wake-speed units with $c_f=1$ throughout; the symbol $c_f$ is retained in the factors displayed below only so that their dependence stays visible. Per-hit accelerations are directed along $\hat{\mathbf{r}}$, the unit vector from the transmitter's emission point to the receiver, are weighted by the transmitter-side acceleration weight, and superpose linearly.

---

## Delayed Emission and Transmitter-Side Acceleration

- What we assume:
  - Transmitters emit potential on expanding causal wake surfaces with surface density $\propto 1/r^2$, represented distributionally by $\delta(r-c_f\Delta)$ with $\Delta=T_r-T_t$, where $T_t$ is the emission time, $T_r$ the reception time, and $r$ the distance from the emission point to the receiver.
  - Each causal hit is directed along $\hat{\mathbf{r}}$ from the transmitter's emission point to the receiver, with received magnitude weighted by $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$, where $D_t=c_f-\mathbf V_t(T_t)\cdot\hat{\mathbf r}$ is the transmitter-side wake-spacing factor and $D_r=c_f-\mathbf V_r(T_r)\cdot\hat{\mathbf r}$ is the receiver-side root-playback factor, $\mathbf V_t(T_t)$ being the transmitter velocity at emission and $\mathbf V_r(T_r)$ the receiver velocity at reception.

- Why it matters:
  - Gauss-like behavior follows immediately ($1/r^2$ on causal wake fronts): the surface density falls as the inverse square of the distance while the surface area grows as its square, so the total emission crossing any sphere about the emission point is the same at every radius, which is the property that Gauss's law states for a static charge in classical electrostatics.
  - Moving histories can generate tangential components relative to an assembly-centered chart because the line of action points to the transmitter’s past position. Transmitter motion changes $D_t$, while receiver motion changes $D_r$ and future geometry.

- Closure target:
  - Determine whether retained assembly histories reproduce specific magnetic observables, the deflection of moving charges and the circulation patterns that classical electrodynamics attributes to a magnetic field, through delayed geometry alone. The simulation must name the observable, effective map, benchmark, and falsifying residual; the radial substrate law by itself does not establish circulation, axial vortices, or flux tubes.

---

## Constant per-wavefront emission

- What we assume:
  - Emission cadence and per-wavefront amplitude are constant at the transmitter.

- Why it matters:
  - It isolates delay and self-interaction as candidate stability and scale-selection mechanisms. Transmitter motion supplies the transmitter-side factor, receiver motion supplies the receiver-side factor, and the signed instantaneous specific power, the rate of change of the receiver's bookkeeping kinetic energy per unit of the bulk conversion $\mu_{\mathrm{arch}}$, is $(\mathbf A\cdot\hat{\mathbf r})V_r$, where $V_r=\mathbf V_r\cdot\hat{\mathbf r}$ is the radial component of the receiver velocity; the transverse component does no instantaneous work because every per-hit acceleration is radial.
  - With $\eta$-mollification ($\delta\to\delta_\eta$, replacing the zero-thickness causal wake surface by a Gaussian of width $\eta$), the calculation can define the mollified potential $\Phi_\eta$ reconstructed from the superposed wakes, the potential-energy bookkeeping $U=q_r\Phi_\eta$ for a receiver of polarity $q_r$, and the kinetic proxy $E_k=\tfrac12\mu_{\mathrm{arch}}\|\mathbf V_r\|^2$, where $\mu_{\mathrm{arch}}$ is the universal bulk bookkeeping conversion and not a mass, and can test $\Delta E_k=-\Delta U$ on resolved intervals. That identity is the static-potential form. A potential reconstructed from delayed wakes depends explicitly on absolute time, so on an interval where the acceleration sum equals $-\nabla U/\mu_{\mathrm{arch}}$ the kinetic rate is $-\nabla U\cdot\mathbf V_r$ while $dU/dT=\nabla U\cdot\mathbf V_r+\partial_TU$; the test therefore compares $\Delta E_k$ with $-\Delta U$ plus the integrated explicit-time term $\int\partial_TU\,dT$ over the interval, or with the history-aware construction of [Delay Dynamics Energy](action-energy/delay-dynamics-energy.md). A work-integral energy that balances kinetic change by construction is an arithmetic consistency check, not conservation evidence. A sharp-impulse claim additionally requires stable root identity and weak convergence as $\eta\to0$.

---

## Self-Hit Root Onset

- What we assume:
- Same-transmitter self-hit is accepted only when the same-transmitter causal set, the set of emission times at which architrino $a$ emitted a wake that reaches its own later position $\mathbf X_a(T_r)$ exactly at $T_r$,
  $$
  \mathcal{C}_{aa}(T_r)=\{\,T_t<T_r:\|\mathbf X_a(T_r)-\mathbf X_a(T_t)\|=c_f(T_r-T_t)\,\}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-c1c370d5a364709f)

  is nonempty and the active root passes the transversality/Jacobian floor, a declared lower bound $\lvert D_t\rvert\ge\nu_t>0$ on the transmitter-side factor at the root, and carries a retained transmitter-side acceleration weight. A speed excursion above $c_f$ is a necessary warning condition for simple nontrivial roots, not a sufficient criterion.
- Self-hits are always repulsive (like-on-like): the interaction sign of a transmitter with itself is $\operatorname{sign}(q_aq_a)=+1$.

- Why it matters:
  - Strictly sub-field-speed interval history rules out nontrivial self-hit roots on that interval, while super-field-speed curved history can open a repulsive channel. Whether that channel balances inward contributions on a retained branch is a simulation and proof question.
  - The scale-selection target is to derive a smallest sustainable orbital radius $d_0$ and fastest natural period $P_0$ from a retained balance, not to assume them from root onset.

---

## Superposition with causal wake surfaces and $\eta$-regularization

- What we assume:
  - All wake contributions superpose linearly at the level of distributions (causal wake surfaces add).
  - We use a narrow Gaussian causal wake surface $\delta_\eta$ when continuous-time derivatives are needed.

- Why it matters:
  - Locality: inverse-square geometric weighting together with finite-speed branch selection makes nearby coherent roots dominant, but infinite populations still require an explicit cutoff, screening rule, cancellation estimate, sampled mean field, or principal-value/mean-field subtraction.
  - Bookkeeping: with $\delta_\eta$, delayed-history solvers can integrate smooth contributions; with $\delta$, the analysis can reason about impulses and events. Agreement in the $\eta\to0$ limit is a required convergence result, not an automatic property of the two representations.

---

## Assembly Grammar to Candidate Braids and Flux Tubes

- What we assume:
  - Binary orbits are the base motif; binaries can occupy widely separated radii; a three-binary candidate is hypothesized to be dynamically robust, but this statement does not assign a taxonomy member.
  - Persistent axial structures and inter-assembly coupling are hypotheses to test on retained branch records.

- Why it matters:
  - The three-index geometry, one persistent index per binary, nominates a color-sector mapping, but an effective $\mathfrak{su}(3)$ algebra (the Lie algebra of the color gauge group of quantum chromodynamics, whose eight generators and commutation relations the mapping must reproduce at the effective level), confinement-facing transport, and absence of extra channels remain recovery burdens.
  - A flux-tube-like interpretation requires a retained geometric linkage and a benchmarked confinement observable; it is not established by the candidate picture.

---

## Observer Charge Calibration

- What we assume:
  - The substrate carries primitive polarity magnitude $\epsilon$. The observer-level calibration target is $|e|=6\epsilon$, so quark electric-charge labels become integer multiples of $\epsilon$.

- Why it matters:
  - Observed quark fractions ($\pm1/3$ and $\pm2/3$ of $e$) become $\pm2\epsilon$ and $\pm4\epsilon$. This is a compact effective ledger convention; it does not derive the quark spectrum or gauge sector.

---

## Candidate Consequences and Proof Burdens

- Stability without fine-tuned potentials:
  - Same-transmitter roots can add an outward channel. A retained operating point still requires net-acceleration balance, branch floors, and nonlinear stability; $\|\mathbf V\|=c_f$ alone is not a switch or a collapse-prevention theorem.
- Scale emergence:
  - $d_0$ and $P_0$ are branch-derived targets. They become physical scales only after a retained binary family establishes attraction/self-hit balance, stability, and regulator persistence.
- Shielding and apparent inertia:
  - Far-zone cancellation is a shielding diagnostic. Inertial response additionally requires a same-record external acceleration/gradient probe and cannot be inferred from a small wake signature alone.
- Magnetic-observable recovery:
  - Tangential delayed geometry nominates an effective magnetic-like mapping. The mapping remains open until retained assemblies reproduce declared observer-level observables without importing cross-product dynamics into the substrate.

---

## What the model explicitly does not use

- No Lorentzian spacetime metric, the four-dimensional metric of relativity that combines time and space in one line element, at the fundamental level (the background is [absolute time](../../foundations/absolute-time.md) and the [Euclidean void](../../foundations/euclidean-void.md), the fixed flat spatial container; emergent cones are effective, not kinematic).
- No right-hand-rule magnetism or $\mathbf V\times\mathbf B$ acceleration term at the substrate level; every per-hit acceleration is along $\hat{\mathbf{r}}$.
- No gauge field inventory beyond architrino causal wakes; interaction carriers are the geometry of delayed causal wake surfaces and their couplings.

---

## Validation and next steps (concrete)

1) Far-field cancellation and the zero-potential axis
- Compute the time-averaged multipole expansion of a high-frequency binary; show leading terms cancel along the rotation axis and decay rapidly off-axis. For an equal-radius opposite-polarity binary and a receiver at rest on the axis, the on-axis cancellation of the potential is exact at every instant, not only in leading order: every point of the orbit circle is at the same distance from an axis point, so both transmitters have the same emission time and the same transmitter-side factor $D_t=c_f$, and their contributions are equal and opposite.
- Observable: a “quiet line” (near-zero net potential) threading the binary. The line is quiet in potential and in orbit-averaged acceleration, not in instantaneous acceleration: on the axis the two per-hit accelerations point along different lines of action, and their sum is transverse, of magnitude $2\kappa\epsilon\lvert q_r\rvert a/(z^2+a^2)^{3/2}$ for orbit radius $a$, axial distance $z$, receiver polarity $q_r$, coupling $\kappa$, and $c_f=1$; it rotates with the binary, so its orbit average vanishes.

2) Scale selection for $d_0$ and $P_0$
- With $\delta\to\delta_\eta$, compute the mean inward radial acceleration from the partner versus the mean outward radial self-hit acceleration across one orbit; a radial fixed point nominates $d_0$ and the maximum orbital frequency $2\pi/P_0$ only when the tangential acceleration also vanishes at every instant of the circular candidate, as [Binary Dynamics](../../dynamics/binary-dynamics.md#requirements-for-true-circular-orbit-working-hypothesis) requires; a radial balance with nonzero tangential drive is not a circular branch and defines no scale.
- Prediction: the same $d_0$ appears across binaries with the same $\kappa$, $\epsilon$, and $c_f$, independent of initial conditions after sufficient relaxation. All three inputs enter because the per-hit acceleration scales as $\kappa\epsilon^2/r^2$, so the only length the law supplies is $\kappa\epsilon^2/c_f^2$, which is $\kappa\epsilon^2$ in normalized units, and $d_0$ is a branch-determined multiple of it. The independence from initial conditions is a hypothesis under test, not a derived result: it fails if certified binary branches with the same three inputs settle at different radii, or if no mechanism carries the binary to a common branch, since the principal partner circular branch is anti-damped rather than dissipative.

3) Energy consistency across a same-transmitter root-onset window
- Use $\Phi_\eta$ to evaluate $U=q_r\Phi_\eta$ and test $\Delta E_k=-\Delta U$, with the explicit-time term stated above included, across a certified root-birth or fold window, a fold being a reception interval in which two causal roots meet at zero transmitter-side factor. A speed crossing $\|\mathbf V\|=c_f$ is not by itself that event. The $\eta\to0$ claim additionally requires stable transition metadata and weak convergence of the integrated work.

4) Numerical recipe (robust, minimal assumptions)
- For each reception time $T_r$: (i) root-find causal emission times $T_t$ for all transmitters (and self), (ii) discard non-physical roots: the coincident emission $T_t=T_r$ is excluded by the convention $H(0)=0$, and no accepted sharp root has $r=0$, because $r=c_f(T_r-T_t)$ makes $r=0$ that same excluded case; the direction $\hat{\mathbf r}$ is undefined there and receives no symmetry-cancellation contribution, so a positive separation approaching zero is handled by the declared core scale of the [numerical recipe](action-energy/numerical-recipe-and-stability.md), not by symmetry, (iii) sum $\mathbf A_{o'\leftarrow o}(T_r;T_t)$, the per-hit acceleration of receiver $o'$ from transmitter $o$, over all transmitters and admitted roots, (iv) integrate velocity and position with an event-aware scheme. Use $\eta$-mollification for smooth integration when needed, in the finite-neighborhood form of the recipe rather than by evaluating the sharp root formula at broadened roots.

---

## Comparisons and falsifiable edges

- Classical electromagnetism:
  - Recovery target: reproduce declared far-zone radiation observables from retained coherent assemblies, then test whether near-zone residuals differ near transmitter-side folds or admitted self-hit windows.
- QCD phenomenology:
  - Hypothesis: retained axial linkage supplies confinement-like behavior. It fails if the same branch record cannot reproduce the declared hadron reaction and energy-distribution benchmarks without per-channel retuning.
- Inertia/apparent mass:
  - Hypothesis: shielding may produce phase-dependent inertial response. It must be tested by applying the same external acceleration/gradient probe to independently prepared branch phases and is falsified if no reproducible phase dependence survives refinement.

---

## Open Closure Questions

- Exact analytic forms for $d_0$ and $P_0$ in the symmetric binary with the canonical transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$.
- Rigorous conditions for uniqueness/multiplicity of causal roots in accelerated motion and their contribution to stability.
- Statistical mechanics of many-body wake structures: when and how do coherent, Lorentz-consistent effective cones emerge, cones whose speed is the same for every moving assembly at leading order, so that clocks and rulers deform in the way special relativity describes and no preferred frame is detectable at that order, from moving-assembly deformation, clock/ruler retuning, and the response of the Noether sea, the ambient population of neutral assemblies that fills the void, and with what characteristic speed, the dressed channel speed $c_{\mathrm{eff}}$, relative to the primitive wake speed $c_f$?

Radial hits, causal delay, constant per-wavefront amplitude, and admitted self-hit roots define the simulation mechanism. Stable branches, natural scales, inertial response, and magnetic-like observables are results that the mechanism must still earn.

---

## Effective observables and states (quantum-like layer)

Premise: single-hit information is sparse. At an instant, the receiver-local dynamical datum is the signed acceleration vector $\mathbf A$. That vector fixes the net acceleration direction but not the transmitter ray and polarity assignment: attraction from one ray and repulsion from the opposite ray can produce the same $\mathbf A$. The corresponding unoriented axis is therefore an inference quotient over transmitter hypotheses, not the raw received datum. The $\mathbb{U}_{\text{now}}$ universe-state perspective, the complete state of every architrino on one absolute-time slice, can include the full transmitter-tagged emission ledger as complete-state bookkeeping, but a local receiver or Physical Observer, an assembly inside the Noether sea whose detectors are themselves dynamical outputs, cannot infer that hidden ledger from a single hit.

- Emission ledger (microstate): the provenance ledger of the arriving hits, the set of tuples $(T_t,\mathbf X_j(T_t),\mathbf V_j(T_t),q_j)$ of emission time, emission position, transmitter velocity at emission, and polarity over all transmitters $j$ that causally affect the receiver; it is bookkeeping read off the path-history record, not a separate content carried by the wake.
- Observational map: ledgers map to histories of receiver-local acceleration vectors $\{\mathbf A(T_k)\}$ across one or more receivers and over time.
- Observational equivalence: two ledgers are equivalent if they induce indistinguishable hit histories at the chosen resolution (including mollifier width $\eta$, temporal sampling, and receiver geometry).


- Coarse-grained PDE observables (Method 1, the whole-field grid method of the [Action Model](action-energy/action-model.md#cross-method-selection), whose symbols are used here):
  - Number density $n(\mathbf X,T)$: count-per-volume of architrinos; in this coarse-grained use it is distinct from the canonical normalized Noether sea density that the mathematics terminology also writes $n$.
  - Polarity density $\rho(\mathbf X,T)$: net polarity per unit volume, counting $+\epsilon$ for each positrino and $-\epsilon$ for each electrino; natural source term in continuum PDE variants, and distinct from the causal wake surface distribution that the mathematics style guide writes $\rho$.
  - Energy density $\mathcal{E}(\mathbf X,T)$: a declared assembly-level or diagnostic energy channel for validation and conservation checks; it is not primitive architrino mass-energy.
  - Use: these fields are the natural inputs/targets for grid-based PDE runs and for validating event-driven simulations in aggregate.

Observability axioms:
- A1 A single-hit receiver record contains $\mathbf A$. Its magnitude and direction are observable, but transmitter identity, transmitter ray, polarity assignment, distance $r$, and transmitter speed $\|\mathbf{V}_t\|$ are not individually recoverable at an instant. Quotienting the opposite-ray/opposite-polarity hypotheses produces an unoriented inference axis $L$.
- A2 All practical observables are functionals of hit histories across time and receivers; unique micro inversion is generically impossible.
- A3 An effective “state” is a probability measure over observationally equivalent ledger classes, updated as new hits arrive.

Bayesian operational stance:
- State update = conditioning on new hit histories; active interventions (changing receiver geometry/filters) alter future histories and thus the posterior over ledger classes.

A receiver never sees the full transmitter ledger; it sees only a time series of acceleration vectors. The appropriate description is therefore statistical over transmitter and polarity histories that fit those vectors.

---

## $\mathbb{U}_{\text{now}}$ Note: Limits of Perfect Clocks and Frames

Absolute time and Euclidean frames remove coordinate ambiguity (synchronization and alignment) but not physical ambiguity:
- Sign/side ambiguity: for a receiver of polarity $-\epsilon$, attraction from $+\epsilon$ on one side versus repulsion from $-\epsilon$ on the opposite side along the same line remain indistinguishable at an instant; for a receiver of polarity $+\epsilon$ the two species exchange roles.
- Baseline distance scaling and branch geometry: $\|\mathbf A\|\propto W^{\mathrm{acc}}/r^2$; transmitter motion sets $D_t$ and the arriving acceleration weight, while receiver motion enters root playback through $D_r/D_t$ and changes future geometry.
- Collinear superposition: several transmitters on the two rays of one inference axis can sum to the same instantaneous $\mathbf A$.
- Self-hit aliasing: self-intersections can mimic external transmitters along $L$.
- Surrogate location recast: any instantaneous hit may be recast to a stationary surrogate transmitter placed somewhere along $L$ with an adjusted emission time; useful for inference and visualization, but it does not resolve the sign/side ambiguity or fix distance without temporal data.

Consequence: embedded observers and synthetic detector records must reason statistically over ledger classes. The $\mathbb{U}_{\text{now}}$ universe-state perspective can compare those classes against the complete ledger, but the observer-accessible data remain many-to-one; “quantum-like” observability is not a contradiction but a necessity.

---

## Single-transmitter multi-hit nuance vs universal superposition

Even for a single transmitter, the receiver cannot be sure that a given acceleration did not come from multiple distinct emission times $T_t\in\mathcal{C}_{r\leftarrow t}(T_r)$ on that same transmitter, where $\mathcal{C}_{r\leftarrow t}(T_r)$ is the causal set of emission times of transmitter $t$ whose wakes reach receiver $r$ at $T_r$, the set written $\mathcal{C}_{aa}(T_r)$ above when transmitter and receiver are the same architrino. When the transmitter has a super-field-speed history interval or its trajectory curves, several roots of $r=c_f(T_r-T_t)$ can occur and arrive in close succession along one acceleration axis, contributing separate per-hit accelerations whose emission-time origins are not recoverable from the net vector alone.

However, this is not the dominant practical difficulty. The governing issue is global superposition: at any instant the net acceleration is the linear sum of contributions from all architrinos in the universe whose causal wake surfaces intersect the receiver now. While inverse-square surface dilution and transmitter-side acceleration weight usually make nearby transmitters dominate, the mapping from the universal emission ledger to observed hit histories remains vastly many-to-one. Consequently, inference must be temporal, statistical, and multi-view, not a frame-perfect instantaneous inversion.

---

## Operational noncommutativity and contextuality (emergent)

Measurement procedures are interventions that condition future hit histories:
- Let $F,G$ be experimental contexts (e.g., planar-mode analyzers, path blockers, timing gates), where a planar mode is the coaxial contra-rotating polarity-conjugate planar pair proposed as the photon carrier in [Electroweak Bosons](../../assemblies/bosons/electroweak-bosons.md#photon-referent-status), a referent whose acceleration-balance closure remains open. Because they modify trajectories and thus the set of future causal roots, their composition generally satisfies $F\circ G\ne G\circ F$ at the level of observed statistics.
- Contextuality: the distribution over ledger classes that best explains data depends on which filters were applied and in what order; the outcomes are context-dependent without invoking microscopic cross-product acceleration terms.

A present intervention changes which acceleration contributions will be recorded later; applying $F$ and then $G$ is therefore not generally equivalent to applying $G$ and then $F$.

---

## Planar-Mode Interference Closure Target

Linear wake superposition nominates, but does not derive, an effective complex-amplitude description:
- A detector map must define how transmitter-tagged path histories become a complex $A_{\mathrm{mode}}$ over a declared aperture and time window.
- The Born-like target is to derive an intensity proportional to $|A_{\mathrm{mode}}|^2$ from that detector map and an independently specified ensemble measure.
- The polarization target is to recover Malus’s $\cos^2\theta$ benchmark, the observer-level law that the intensity transmitted by an ideal polarization analyzer varies as the squared cosine of the angle $\theta$ between the analyzer axis and the incident polarization, from a retained planar-mode and analyzer interaction record. Geometric projection alone is implementation scaffolding until the record-forming dynamics supply the measure.

Planar-mode overlap supplies a candidate geometry for interference, while the amplitude-squared measure and analyzer statistics remain explicit recovery tests.

---

## Reconstruction Under Information Bounds

Instantaneous inversion is ill-posed; reconstruction is temporal, multi-view, and prior-guided:
- Multi-receiver geometry: use separated receivers to triangulate unoriented lines at the same $T$; intersecting rays yield two-sided candidate loci.
- Time-series constraints: track $L(T)$ and timing-derived $r(T)$ proxies; curvature and rotation of $L$ constrain transmitter paths.
- Active probing: vary receiver motion/filters to sample different roots and break degeneracies.
- Priors: charge inventories, speed bounds, assembly templates (e.g., binaries, planar-mode statistics) shrink the hypothesis space.
- Estimation: run Bayesian filters or particle sets over ledger classes; update with each hit; report identifiability and uncertainty, not single-point transmitters.

---

## Worked micro-to-effective examples

- Two-planar-mode interference:
  - Setup: two coherent photon planar modes reach a screen. Their geometric overlap and path-history phase define a candidate complex-amplitude map. An observed intensity proportional to its squared norm is obtained only if the independently specified detector and ensemble record passes the Born-like closure residual above.
  - Which-way intervention: inserting a context that disrupts one planar mode's coherence changes the ledger classes and removes the overlap term, flattening the pattern.

- Polarization analyzer:
  - The analyzer projects the planar mode's transverse ledger onto its axis. Geometric projection supplies the candidate $\cos\theta$ amplitude factor; transmission $\propto\cos^2\theta$ remains a recovery result that requires the same record-forming measure and analyzer residual used by the polarization target above.

- Sequential filters (order matters):
  - Two non-parallel analyzers $F(\theta_1)$ and $G(\theta_2)$ applied in different orders yield different transmitted patterns because they recondition future causal roots differently: $F\circ G \ne G\circ F$.

---

## Falsifiable edges and tests (observability-focused)

- Context order test: demonstrate order-dependent transmission with sequential analyzers on coherent planar modes; quantify the asymmetry $F\circ G$ vs. $G\circ F$.
- Planar-mode interference robustness: map how partial decoherence (deliberate jitter in transmitter paths) suppresses the overlap term; compare to predicted $|A_{\mathrm{mode}}|^2$ decay with coherence length.
- Multi-receiver triangulation under ambiguity: show that two-sided localization from unoriented lines plus time series reduces, but does not eliminate, sign/side and distance–speed degeneracies—matching the limits stated under [Reconstruction Under Information Bounds](#reconstruction-under-information-bounds).
- Bell-type correlation target (open): assess whether planar-mode phase models with absolute time can reproduce observed $\cos(2\theta)$ correlations across separated analyzers without hidden cross-product acceleration terms; treat Tsirelson-like bounds as a stringent benchmark. Bell-type experiments correlate analyzer outcomes at two separated stations; the tested quantum prediction for polarization-correlated pairs varies with the relative analyzer angle as $\cos(2\theta)$, Bell inequalities bound what any account with settings independent of the hidden state and a factorizable local response can produce, and the Tsirelson bound is the largest violation quantum theory allows. Absolute time and a finite wake speed do not by themselves evade the theorem: a candidate must name the Bell hypothesis that its record-forming dynamics fail, and the route the corpus selects rejects factorizability through a $c_f$-mediated coordination channel while keeping measurement independence and observer-level no-signaling, as [No-Go Theorems](../no-go-theorems.md#applicability-map) and the [Bell nonlocality placement](../../foundations/ontology.md#bell-nonlocality-placement) state; the [Bell-family record-measure harness](bell-family-record-measure.md) supplies the residuals such a candidate must pass.

Together these tests check order effects, the weakening of interference under disrupted coherence, and the information gained from multiple receivers. Reproducing quantum correlations is the most demanding target and remains explicitly open.
