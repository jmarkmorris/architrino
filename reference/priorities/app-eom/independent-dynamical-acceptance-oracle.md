# Independent Dynamical Acceptance Oracle

## Status

- Oracle id: eom_independent_oracle/v0
- Stage: active-certified-acceleration-layer
- Mathematical binding: frozen
- Numeric certification contract: frozen
- Retained-history representation: certified-piecewise-cubic-v0
- Root-completeness certificate: implemented-piecewise-cubic-v0
- Coupled history evolution: not implemented
- Production authority: none

## Independence Boundary

The oracle is an independently authored correctness implementation. It may read
the frozen EOM contracts, but it must not import, link, translate, or call:

- the current central solver;
- the future production EOM kernel;
- a production root finder, history interpolator, reduction, or integrator;
- production-generated expected outputs;
- app-prescribed future paths.

The initial oracle environment is Python with mpmath arbitrary-precision
arithmetic. This is an oracle choice, not the production-language decision.
Its value is implementation independence, readable equations, adjustable
precision, and a separate failure surface.

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

## Completed Oracle Phase

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

## Remaining Oracle Phases

### Phase 2: Certified Acceleration Layer

- Evaluate sharp rows only on certified simple roots.
- Evaluate the finite-width law by independent adaptive quadrature with
  arbitrary-precision enclosure.
- Accumulate every ordered pair, including self-pairs, under a fixed
  stricter-precision or ball enclosure.
- Reconstruct the total acceleration from the emitted rows.

### Phase 3: Coupled History Evolution

- Implement a correctness-first method of steps on continuous retained
  histories.
- Advance all paths from one immutable accepted history, generate dense output
  with an enclosure, and accept or reject the coupled step atomically.
- Subdivide at root, caustic, memory-boundary, and controller events.
- Return the extended history functions and numeric ledger required by the
  frozen contracts.

### Phase 4: Acceptance Matrix

- Run inertial exactness and manufactured known-history forcing.
- Run independent multiprecision two-body controls.
- Run sub-$c_f$, exact-$c_f$, and super-$c_f$ partner and self-history cases.
- Perturb field speed and retained history depth.
- Refine timestep, interpolation, root tolerance, precision, $\eta$, and
  $\epsilon_c$.
- Exercise deliberate precision and resource exhaustion.
- Reject the current solver's instantaneous calculation and false canonical
  evidence status.

## Completion Boundary

The oracle priority is complete only when one versioned run packet demonstrates:

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

This packet is priority-only. The executable nucleus is a reference success
marker, not a production solver, physical trajectory certificate, or corpus
closure result.
