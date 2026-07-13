# Independent Dynamical Acceptance Oracle

## Status

- Oracle id: eom_independent_oracle/v0
- Stage: completed-reference-phase-4-v0
- Mathematical binding: frozen
- Numeric certification contract: frozen
- Retained-history representation: certified-piecewise-cubic-v0
- Root-completeness certificate: implemented-piecewise-cubic-v0
- Certified acceleration reconstruction: implemented-piecewise-cubic-v0
- Coupled history evolution: implemented-cubic-corrector-step-doubling-v0
- Phase 4 acceptance layer: implemented-reference-controls-v0
- Production block-exclusion engine: not begun
- Production authority: none

## Independence Boundary

The oracle is an independently authored correctness implementation. It may read
the frozen EOM contracts, but it must not import, link, translate, or call:

- the current central solver;
- the future production EOM kernel;
- a production root finder, history interpolator, reduction, or integrator;
- production-generated expected outputs;
- app-prescribed future paths.

The oracle environment is Python. Its equation reference uses mpmath
arbitrary-precision arithmetic, while its certification path uses exact-decimal
directed-rounding intervals. This is an oracle choice, not the
production-language decision. Its value is implementation independence,
readable equations, adjustable precision, and a separate failure surface.

## Implemented Layers

The independent equation reference lives in
[scripts/eom/oracle/reference_kernel.py](../../../scripts/eom/oracle/reference_kernel.py).
It implements directly from the frozen equations:

- continuous inertial history functions;
- causal residual evaluation;
- source-normal and receiver-normal factors;
- the sharp per-root acceleration;
- the smooth radial core kernel;
- the zero-extended finite-width receiver-normal integrand;
- arbitrary-precision refinement of one declared sign-changing simple-root
  bracket.

The certified retained-history and root layer lives in
[scripts/eom/oracle/certified_history.py](../../../scripts/eom/oracle/certified_history.py),
with directed-rounding arithmetic in
[scripts/eom/oracle/decimal_interval.py](../../../scripts/eom/oracle/decimal_interval.py).
For `eom_independent_oracle/v0` it provides:

- exact-decimal intake that rejects binary floating-point inputs;
- contiguous, nominally $C^1$ piecewise-cubic retained histories with explicit
  position and velocity reconstruction-error radii;
- outward interval evaluation of position, velocity, separation, the causal
  residual, and $D_s$;
- complete partition of the declared retained search interval by source
  history segment;
- certified exclusion when the residual interval omits zero or strict $D_s$
  monotonicity and endpoint signs prove a cell root free;
- unique simple-root brackets no wider than the declared tolerance, including
  exact endpoint and segment-boundary roots;
- a root-free-complement claim only when every non-root cell is certified;
- explicit unresolved routes for tangencies, folds, reconstruction uncertainty,
  search-depth exhaustion, and search-cell exhaustion;
- memory-boundary contact and excluded coincident-endpoint status;
- open-cell proofs for a coincident $H(0)$ endpoint under uniform sub-$c_f$
  speed or a uniform super-$c_f$ velocity-component bound, while the exact
  $c_f$ rail remains unresolved;
- a durable `eom_root_completeness_certificate/v0` record with exact decimal
  tokens, history identities and digests, input digest, root brackets, excluded
  cells, unresolved cells, and search-resource provenance.

This is an exhaustive certificate for the declared piecewise-cubic v0 history
representation and searched interval. It is not a claim that every continuous
history can be certified by this representation. A fold, tangent root, exact
rail degeneracy, or enclosure too wide for a discrete decision fails closed and
must proceed through a later finite-width or higher-order certification route.

The certified acceleration layer lives in
[scripts/eom/oracle/certified_acceleration.py](../../../scripts/eom/oracle/certified_acceleration.py).
For `eom_independent_oracle/v0` it provides:

- sharp-chart acceleration rows only from a `certified_complete` root ledger
  whose retained search reaches the receiver time;
- independent re-evaluation and intersection of each source-normal enclosure,
  with a positive declared transversality floor;
- receiver-normal strength $|D_T/D_s|$, signed charge product, and the frozen
  unregularized inverse-square vector law without a velocity clamp;
- a finite-width pair row obtained by adaptive interval quadrature over the
  complete declared retained interval using the frozen Gaussian causal
  mollifier and smooth radial core kernel;
- the complete-vector zero extension at coordinate coincidence, bounded by
  $|D_T| \leq c_f+\|\mathbf V_i\|$ without evaluating an undefined direction;
- fail-closed memory-boundary, provenance, quadrature-depth, and
  quadrature-cell routes;
- final enclosure-width checks against declared quadrature and acceleration
  tolerances, rather than acceptance from local error allocation alone;
- an explicit $N^2$ ordered-pair reconstruction domain including self-pairs,
  with structural rejection of missing, duplicate, or extraneous pairs;
- batch consistency checks for precision, coupling, field speed, receiver
  times, path-history digests, and charges;
- receiver totals reconstructed solely by summing the emitted certified rows;
- durable `eom_pair_acceleration_certificate/v0` and
  `eom_acceleration_reconstruction_certificate/v0` records with exact-decimal
  bounds, numeric policy, and input-sensitive provenance digests.

This layer is correctness-first oracle code. It performs explicit ordered-pair
evaluation and is not the production block-exclusion, heterogeneous batch, or
distributed-history engine.

The coupled retained-history evolution layer lives in
[scripts/eom/oracle/certified_evolution.py](../../../scripts/eom/oracle/certified_evolution.py).
Its executable v0 nucleus provides:

- rejection of any input history extending beyond the requested evolution
  start, so a future path cannot enter as initial data;
- one immutable coupled-history view for every attempted step;
- simultaneous cubic acceleration correctors for all paths, with predictor
  histories confined to the correction iteration;
- independent complete ordered-pair root and acceleration snapshots at every
  consumed receiver time;
- full-step versus two-half-step local position and velocity error estimates;
- operational correction, position, and velocity tolerances that reject the
  complete coupled candidate when exceeded;
- exact step halving after rejection down to a declared minimum step;
- root-count and source-normal-sign topology signatures that force subdivision
  when a branch event crosses an attempted substep;
- propagation of the accepted step-doubling estimate into the appended dense
  history enclosure, followed by root and acceleration recertification on that
  exact published history;
- all-or-nothing publication: a rejected step returns the unchanged input
  history digests, while an accepted step publishes every path together;
- durable acceleration-snapshot, corrected-substep, atomic-step, and coupled
  evolution certificate records with resolved numeric policy and
  input-sensitive provenance.

The method is an independent reference integrator and reports `reference`
evidence, not `canonical` production evidence. Step doubling supplies an
operational local-error estimate; it is not asserted to be an analytic proof
of the exact delayed-system solution. Production block exclusion, distributed
history, heterogeneous execution, production checkpoint storage, accelerated
root continuation, and production authority remain outside this layer.

The Phase 4 acceptance layer lives in
[scripts/eom/oracle/phase4_acceptance.py](../../../scripts/eom/oracle/phase4_acceptance.py).
For `eom_independent_oracle/v0` it provides:

- reception-time slab certificates that give persistent identities to simple
  causal-root branches only after disjoint root tubes, uniform nonzero $D_s$,
  boundary sign separation, and a root-free slab complement are certified;
- explicit fold/caustic event routing when root count changes, source-normal
  sign changes, or a continuation tube loses transversality;
- joint reception/emission exact-decimal interval quadrature of the
  finite-width law over the complete triangular causal domain, producing a
  bounded event impulse without division by $D_s$;
- content-hashed checkpoints containing exact retained-history coefficients,
  reconstruction errors, charges, controller step, numeric policy, resource
  policy, cumulative counts, and prefix provenance;
- checkpoint deserialization with history and content-digest verification,
  followed by continuation that reproduces uninterrupted accepted history;
- four-or-more-level exact-halving refinement certificates for coupled
  histories, with endpoint position and velocity deltas required to be
  nonincreasing;
- `eom_independent_oracle_phase4_acceptance/v0`, which requires the complete
  declared control set, reference-only evidence, nonempty evidence digests,
  and no dependency on the current central solver, a production EOM backend,
  or a prescribed future path.

These are independent-oracle controls. The checkpoint is an exact reference
record, not the distributed production checkpoint store, and root-continuation
certification is not the production search accelerator.

## Current Controls

The equation-reference test file
[tests/test_eom_oracle_reference_kernel.py](../../../tests/test_eom_oracle_reference_kernel.py)
covers:

1. the analytic stationary-source root and inverse-square acceleration;
2. an exact-$c_f$ receiver-normal null with a present but silent branch;
3. a super-$c_f$ receiver accepted without a speed clamp;
4. the absence of a nontrivial same-path root for constant straight
   super-$c_f$ motion;
5. the core kernel and complete integrand's zero extension at coordinate
   coincidence;
6. convergence of finite-width quadrature to the core-regularized simple-root
   value.

These are success markers under the existing oracle requirement. They do not
create a new physics gate or certify full EOM evolution.

The certified-history test file
[tests/test_eom_oracle_root_certification.py](../../../tests/test_eom_oracle_root_certification.py)
covers exact-decimal rejection, directed interval containment, one and two
simple roots, close-root separation, root-free histories, segment-boundary
deduplication, field-speed sensitivity, reconstruction uncertainty, tangent
roots, memory-boundary contact, contiguous-history validation, coincident
endpoints below and above field speed, the exact-$c_f$ rail, resource
exhaustion, full certificate records, and reproducible input-sensitive digests.

The certified-acceleration test file
[tests/test_eom_oracle_certified_acceleration.py](../../../tests/test_eom_oracle_certified_acceleration.py)
covers outward exponential enclosure, analytic stationary sharp acceleration,
an exact-$c_f$ silent row, an unclamped super-$c_f$ receiver, multiple-root
summation, explicit inactive self-pairs, tangent-root sharp failure, finite-width
tangent handling, memory-boundary failure, provenance mismatch, finite-width
quadrature and resource exhaustion, a complete two-path ordered-pair matrix,
row-to-total reconstruction, missing self-pairs, duplicate pairs, and
inconsistent per-path data.

The coupled-evolution test file
[tests/test_eom_oracle_certified_evolution.py](../../../tests/test_eom_oracle_certified_evolution.py)
covers exact inertial self-history evolution, unclamped super-$c_f$ evolution,
complete binary ordered-pair snapshots, symmetric coupled binary motion,
step-budget rejection, correction exhaustion, memory-boundary rejection,
adaptive step halving, branch-topology event subdivision, prohibited
future-history input, and unchanged-history publication on every rejected
route.

The Phase 4 test file
[tests/test_eom_oracle_phase4_acceptance.py](../../../tests/test_eom_oracle_phase4_acceptance.py)
covers persistent root identities across consecutive certified slabs,
root-count event routing, certified finite-width tangent-event impulse,
event-quadrature exhaustion, exact checkpoint roundtrip and tamper rejection,
sub-$c_f$ curved-history falsification of prescribed future curvature,
four-level inertial and interacting-binary refinement ladders, the complete
reference-only acceptance matrix, missing controls, forbidden current-solver
dependencies, and false canonical evidence rejection.

## Completed Oracle Phases

### Phase 1: Certified History And Root Layer

- Completed for exact-decimal, contiguous piecewise-cubic retained histories
  with declared position and velocity reconstruction-error radii.
- Every searched cell is classified as certified root free, a unique simple
  root bracket, an excluded coincident endpoint, or unresolved.
- Root completeness is asserted only when the full retained complement has no
  unresolved cell and the earliest retained boundary is not itself a root.
- Multiple simple roots and segment-boundary roots are retained; folds,
  persistent tangencies, exact rail degeneracies, wide error enclosures, and
  exhausted resource budgets fail closed.

### Phase 2: Certified Acceleration Layer

- Completed for the certified piecewise-cubic v0 retained-history
  representation.
- Sharp rows consume only certified simple roots and preserve all admitted
  branches, including present-but-silent receiver-normal rows.
- Finite-width rows use independent adaptive exact-decimal interval quadrature
  over the complete declared retained interval.
- Every ordered pair, including self-pairs, is structurally required and its
  emitted rows reconstruct the receiver totals exactly as interval objects.
- Discrete uncertainty, provenance disagreement, memory-boundary contact, or
  exhausted quadrature resources fails closed.

### Phase 3: Coupled History Evolution Executable Nucleus

- Implemented one immutable-history coupled cubic corrector with step doubling,
  operational local-error rejection, and exact halving.
- Predictor and correction histories remain unpublished; only the recertified
  fine history is appended, and every path is committed atomically.
- Root topology changes trigger subdivision; unresolved roots, memory-boundary
  contact, correction exhaustion, and minimum-step exhaustion fail closed.
- Returned records bind input histories, root and acceleration snapshots,
  correction iterations, local errors, appended histories, reduction order,
  resolved policy, and reference evidence status.

### Phase 4: Acceptance Matrix And Event Controls

- Completed the declared matrix across the equation reference, certified
  history, certified acceleration, coupled evolution, and Phase 4 suites.
- Certified persistent identities only for event-free simple-root slabs; root
  births, deaths, and lost transversality route to the finite-width event law.
- Certified finite-width fold/caustic impulse by joint two-dimensional interval
  quadrature and exercised deliberate depth and cell exhaustion.
- Demonstrated exact-decimal checkpoint serialization, content verification,
  restart equivalence, and tamper rejection at accepted-step boundaries.
- Demonstrated four-level exact inertial refinement and strictly decreasing
  position and velocity deltas for a nonzero interacting binary control.
- Demonstrated that an admitted curved retained history does not prescribe its
  future curvature: the evolved self-only sub-$c_f$ control departs from the
  analytic continuation of the input cubic.
- Required every successful matrix row to remain `reference` evidence and
  rejected current-solver, production-backend, prescribed-future, missing,
  failed, empty-digest, and false-canonical routes.

## Completion Boundary

The `eom_independent_oracle_phase4_acceptance/v0` packet and its executable
controls satisfy the reference-oracle completion boundary by demonstrating:

- certified root count or an explicit unresolved failure for every ordered
  pair;
- independent sharp and finite-width agreement on their common simple-root
  domain;
- accepted coupled history extension with a propagated numeric enclosure;
- complete reconstruction of the consumed acceleration;
- all required velocity, history, regulator, precision, and negative controls;
- no import or output dependency on either the current solver or production
  EOM implementation.

## Priority Disposition

This completed packet remains priority-only. It is a reference success marker,
not a production solver, physical trajectory certificate, production
checkpoint system, million-path result, or corpus closure result. The
production block-exclusion engine has not begun.
