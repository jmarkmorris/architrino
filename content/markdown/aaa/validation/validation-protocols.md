# Validation Protocols

Validation connects claims in Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$, to evidence that can support or overturn them. An observer-level record is a physical measurement, such as a frequency ratio or detector count. A native history describes the underlying paths of [architrinos](../foundations/architrino.md), the polarity-bearing point entities whose delayed interactions determine acceleration through the [Master Equation](../dynamics/master-equation.md). A branch is a specified family of candidate histories. Validation asks whether those histories obey the dynamics and whether their predicted measurements meet the applicable empirical constraints.

A visual resemblance, a deterministic replay, or agreement between two implementations of the same rule is not enough: a correctness claim needs an independent closed form, theorem, analytically known case, or separately authored instrument. A demonstrated contradiction rejects the claim and domain to which it applies. Missing evidence leaves verification incomplete; rejecting a tested candidate does not establish that every admissible branch fails.

The chapter proceeds in scene order from unit and parameter declarations to event provenance, empirical constraints, formal failure logic, no-go results, unresolved tensions, dedicated massive-superposition tests, executable simulation protocols, and the closure scorecard.

## Chapter Map

1. [Architrino and SI Base Units](architrino-si-base-units.md) separates exact SI definitions from adjusted observer benchmarks and declares the unit-map burden.
2. [Parameter Ledger](parameter-ledger.md) owns primitive inputs, conversion conventions, constitutive coefficients, and branch-derived quantities.
3. [Reaction Ledger](reaction-ledger.md) requires constituent, energy, momentum, and channel provenance for reaction records.
4. [Reaction-Cosmology Provenance Ledger](reaction-cosmology-provenance-ledger.md) extends the same-record discipline across source loading, thermalization, and cosmological observables.
5. [Constraint Ledger](constraint-ledger.md) records empirical tolerances and the shared records that must satisfy them.
6. [Failure Criteria](failure-criteria.md) defines incompatibility witnesses, promotion conditions, and Not advanced dispositions.
7. [No-Go Theorems](no-go-theorems.md) classifies whether a theorem applies directly, imposes a replacement constraint, or depends on assumptions absent from the substrate theory.
8. [Known Tensions](known-tensions.md) collects unresolved recovery burdens without treating them as solved mechanisms.
9. [Massive-Superposition Gravity](massive-superposition-gravity.md) defines a focused observer-level discriminator for gravity-linked record formation.
10. [Simulation Protocols](simulations/README.md) owns executable packet schemas, convergence tests, negative controls, synthetic observables, and branch-specific fixtures.
11. [Closure Scorecard](closure-scorecard.md) distinguishes validated closure from readiness under its declared assessment rubric. Diagnostics and fixtures can support category-specific readiness credit, but do not by themselves establish recovered coefficients, fixed parameters, or empirical agreement. Adding a document does not automatically change a score.

This map follows the chapter reading order; the linked documents supply the detailed definitions. A residual measures a mismatch between a claim's prediction and its required result, while an acceptance condition specifies how small that mismatch must be and which evidence must accompany it. Definitions of parameters, records, residuals, acceptance conditions, and failure codes belong with their respective subject documents.

## Promotion Standard

A validation claim states its grade, premises, tested domain, and falsifier: the observation or counterexample that would overturn it. A derived claim supplies its reasoning; a measured claim names its instrument and reach; an inferred claim identifies the additional inference; and a guessed claim remains a hypothesis. A mathematical lemma can be established without an observer map, while an instrument check can be established without a physical assembly. Neither result alone establishes an observable or a persistent physical branch.

For a simulation-backed physical recovery claim, the applicable evidence must refer to one declared history, or to a matched family of histories when several preparations or experiments are compared:

- the worldlines, meaning paths parameterized by absolute time, and causal roots, meaning past emission times whose expanding wakes reach a receiver, together with the retained history, boundary conditions, and identities needed to reproduce the result;
- the observer map that turns native quantities into the tested measurement through the declared apparatus, calibration, and reference channel;
- the parameter and unit declarations, tested time window, comparison statistic, uncertainty treatment, and tolerances fixed before evaluating the test result;
- convergence under the relevant temporal, history, regulator, and spatial refinements, with remaining numerical uncertainty small enough to resolve the claimed tolerance;
- an independent correctness reference when correctness is claimed;
- controls that establish the instrument's reach before it is used on the target: a known valid case and a negative control that fails for the intended reason, including a known nonzero signal when a null result is interpreted;
- an explicit verification outcome and the applicable reason or failure code when a required condition cannot be established.

New numerical instantiations use normalized wake-speed units with $c_f=1$, where $c_f$ is the primitive wake propagation speed. The mapping to laboratory units is a separate declaration, not a derivation of a measured constant. An inapplicable check requires a scope reason; an unperformed required check cannot be treated as passed. A finite simulation also declares its spatial domain and history coverage: it does not contain the complete universe state.

Verification is incomplete when a required record or calculation is unavailable, and failed when a completed check supplies a contradiction or a resolved tolerance miss. An unresolved refinement sequence leaves the limit claim incomplete; an established divergent limit refutes a claim requiring that limit. Both incomplete and failed verification leave the dependent claim Not advanced. The [failure criteria](failure-criteria.md) distinguish these dispositions from a proof that no admissible shared record can satisfy the required constraints.

Cross-integrator agreement is implementation-parity evidence. A replay of a saved record proves deterministic reproduction. Neither is an independent oracle for the mathematical rule being implemented.

## Preferred-Frame Leakage as One Protocol Family

The absolute-frame question is one important family inside the broader validation chapter. [Absolute time](../foundations/absolute-time.md) supplies a universal ordering parameter, and the [Euclidean void](../foundations/euclidean-void.md) supplies fixed three-dimensional geometry. A [Physical Observer](../spacetime/observer-framework.md) is an apparatus built from assemblies, accessing measurements through its own clocks, rulers, and signals. Lorentz recovery means deriving the tested special-relativistic comparisons of moving clocks, lengths, and signal timing from those assemblies. Preferred-frame leakage is an observable dependence on motion relative to the substrate rest frame beyond the applicable experimental bound. The [Noether sea](../spacetime/noether-sea.md) is the ambient population of neutral assemblies; its flow is distinct from the rest frame of the fixed container.

### Complete-State and Observational Proxies

- **Complete-state diagnostic:** The $\mathbb{U}_{\text{now}}$ universe state includes the histories required for delayed evolution. With transmitter identity, emission times, and sufficiently resolved wake geometry, the diagnostic in [Detecting the Absolute Frame](../foundations/detecting-the-absolute-frame.md) reconstructs emission centers and tests their concentricity, meaning whether the centers coincide. Its data assumptions belong to complete-state bookkeeping; they are not supplied by ordinary laboratory measurements.
- **CMB rest-frame proxy:** The cosmic microwave background (CMB) supplies an observer-level radiation-frame comparison through its dipole, the leading opposite-direction temperature variation. Interpreting the dipole-free frame as Noether sea rest is a hypothesis requiring a source, transport, and observer-response map. It identifies neither local sea flow nor the Euclidean-void rest frame by itself; the [CMB frame-consistency discussion](../cosmology/CMB.md#cmb-dipole-and-matter-dipole-gate) states the additional burden.
- **Protocol:** Compare synthetic observer records with CMB-frame summaries only through that declared map and its uncertainties. Agreement supports the tested large-scale consistency claim, not an independent measurement of the substrate or sea rest frame.

### Null Tests for Absolute-Frame Group velocity

- **Protocol:** A Michelson-Morley comparison measures interference between light sent along differently oriented round trips; a resonator comparison measures frequencies selected by physical cavities. Simulate a matched family with a fixed preparation rule, apparatus definition, calibration, and model of nuisance effects such as temperature changes. Declare the apparatus center used to define group velocity, the velocity relative to the Euclidean-void frame, and the local Noether sea flow. Rotations are compared with a physical direction such as nonzero group velocity or medium anisotropy, not with arbitrarily labeled coordinate axes. Different group velocities require a separate boost comparison; a rotation test alone does not cover it.
- **Success criterion:** The declared round-trip phase difference or frequency ratio has no excess orientation or boost dependence beyond the predeclared bound, with numerical and measurement uncertainty resolved. A benchmark must identify the observable, reference channel, experimental source, regime, and uncertainty convention; a bound on inferred propagation anisotropy is not automatically a bound on every frequency record.
- **Mechanism target:** In a homogeneous reference cell, [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) requires the longitudinal ruler response relative to its rest reference and the normalized clock-rate response to approach $1/\gamma_{\mathrm{eff}}$. Here $\gamma_{\mathrm{eff}}=(1-\beta_{\mathrm{eff}}^2)^{-1/2}$ and $\beta_{\mathrm{eff}}=v/c_{\mathrm{eff}}$, with $v$ the declared assembly group speed relative to the reference medium and $c_{\mathrm{eff}}$ its dressed clock-and-ruler channel speed, for $0\le v<c_{\mathrm{eff}}$. The clock rate is $d\tau/dt_{\mathrm{eff}}$, where $\tau$ is a physical clock readout and $t_{\mathrm{eff}}$ is the calibrated observer coordinate time. The substrate-to-observer map, rest normalization, and relation of medium flow to the absolute frame must be stated. The same history must also supply photon transport; equality of its speed with $c_{\mathrm{eff}}$ is a recovery condition. These are conditional targets, not deformations inserted into prescribed trajectories as evidence.
- **Failure condition:** A resolved excess residual rejects the proposed hiding mechanism for the tested family and conditions. Missing apparatus response or insufficient sensitivity leaves its verification incomplete. Neither outcome alone proves a universal rejection across untested branches.

### Precision Atomic Comparison

- **Protocol:** Use the hydrogen $1S$-$2S$ transition, a frequency associated with the ground and first excited S states, as an observer-level recovery target. For matched apparatus histories with different orientations and group velocities, derive its measured frequency relative to a declared reference clock or transition. The hydrogen and reference-channel responses both belong to the prediction; calling the line derived does not supply either response.
- **Success criterion:** The same unit map, photon transport, assembly response, and calibration rule keep the predicted frequency-ratio modulation within the applicable bound. Sidereal variation means modulation over Earth's rotation relative to the stars. The [Constraint Ledger](constraint-ledger.md) routes the comparison, but its generic clock bound is not automatically a hydrogen $1S$-$2S$ limit: the actual reference, source, protocol, and sensitivity must match. A missing channel-specific comparison leaves this test unevaluated.
- **Failure condition:** Independently adjusting sea response, line mapping, or calibration after inspecting each residual is hidden tuning. State changes predicted by one fixed constitutive law, or measured environmental inputs handled by a predeclared nuisance model, are legitimate variations and must retain their provenance. A fit used to set a parameter is reported as calibration, not as independent validation of that parameter's prediction.

## Reading a Null Result

A null result constrains a declared observable map only at demonstrated sensitivity. An instrument that always returns zero also returns a null result, which is why a known nonzero control must establish that the analysis can detect the excluded signal. For statistical records, compare the declared distributions or estimators with their uncertainty treatment: equality of means alone does not establish equality of distributions, and two individual outcomes do not establish either. A central residual near zero with an uncertainty interval wider than the claimed bound does not resolve that bound.

Such a result does not show that the underlying absolute frame is absent. Conversely, naming a Noether sea mechanism does not explain a null result until one common dynamical and calibration account produces the clock, ruler, propagation, and apparatus responses within tolerance across the matched histories. A complete-state reconstruction, an analytical benchmark, a simulation check, and empirical recovery each retain their own scope; none confers the others by implication.
