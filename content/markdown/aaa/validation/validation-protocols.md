# Validation Protocols

Validation is the accountability layer of $\mathbb{A}\mathbb{A}\mathbb{A}$. It states which observer-level records the theory must recover, which native histories may support those records, and which failures reject a branch or the theory. A visual resemblance, a deterministic replay, or agreement between two implementations of the same rule is not enough: a correctness claim needs an independent closed form, theorem, analytically known case, or separately authored instrument.

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
11. [Closure Scorecard](closure-scorecard.md) summarizes accepted closure only; candidate, diagnostic, and fixture-level progress does not raise the score.

This map is normative for reading order, not a substitute for the owning documents. Each parameter, tuple, residual, gate, and failure code should be defined by one owner and cited elsewhere.

## Promotion Standard

A validation claim is promotable only when all of the following are tied to one declared record:

- the native worldline and causal-root provenance needed to reproduce the result;
- the observer map that turns native quantities into the tested observable;
- tolerances fixed before the run;
- convergence under the relevant temporal, history, regulator, and spatial refinements;
- an independent correctness reference when correctness is claimed;
- a negative control that fails for the intended reason;
- an explicit failure code when any required entry is absent or unstable.

Cross-integrator agreement is implementation-parity evidence. A replay of a saved record proves deterministic reproduction. Neither is an independent oracle for the mathematical rule being implemented.

## Preferred-Frame Leakage as One Protocol Family

The absolute-frame question is one important family inside the broader validation chapter. The substrate uses absolute time and the Euclidean void, while Physical Observers must recover Lorentz-compatible clock, ruler, and signal behavior to the measured precision.

### Complete-State and Observational Proxies

- **Complete-state diagnostic:** The $\mathbb{U}_{\text{now}}$ universe-state perspective can use the transmitter-tagged wake-concentricity diagnostic in [Detecting the Absolute Frame](../foundations/detecting-the-absolute-frame.md). This is complete-state bookkeeping, not an operational laboratory protocol for Physical Observers.
- **CMB rest-frame proxy:** The CMB dipole-free frame is an empirical large-scale proxy for Noether sea rest. It is not an identification of the Euclidean-void rest frame.
- **Protocol:** Compare simulation outputs with CMB-frame summaries only as a large-scale consistency check for the declared Noether sea state and cosmological transport record.

### Null Tests for Absolute-Frame Drift

- **Protocol:** Run a simulated Michelson-Morley or resonator experiment through a declared Noether sea state.
- **Success criterion:** The observer-level interference or frequency record remains invariant, within the predeclared leakage bound, as the apparatus rotates relative to the Euclidean-void frame.
- **Mechanism target:** Verify whether the retained assembly branch produces the required $\gamma^{-1}$ ruler deformation and matching clock-rate response. The contraction is not assumed merely because the target has Lorentz form.
- **Failure condition:** A residual orientation or boost dependence above the applicable bound rejects the proposed hiding mechanism.

### Precision Atomic Comparison

- **Protocol:** Compare the derived hydrogen $1S$-$2S$ observer record for apparatus histories with different orientations and drifts relative to the Euclidean-void frame.
- **Success criterion:** The same unit map, photon branch, assembly deformation, and clock channel keep sidereal variation below the bound recorded in the [Constraint Ledger](constraint-ledger.md).
- **Failure condition:** Per-run retuning of the Noether sea state, line map, or clock calibration is a hidden-tuning failure rather than a successful null result.

## Reading a Null Result

A null result constrains a declared observable map; it does not show that the underlying absolute frame is absent. Conversely, naming a Noether sea mechanism does not explain the null result until the same retained record produces the clock, ruler, propagation, and apparatus response within tolerance. The decisive object is therefore the shared record and its falsifiable residual, not the verbal compatibility of two pictures.
