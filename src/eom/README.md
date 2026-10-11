# EOM Solver

This directory is the C++20 host implementation for EOM, the endorsed solver and sole forward production target. EOM is the only engine in the repo.

The executable layer currently contains:

- piecewise-cubic continuous retained histories with reconstruction-error enclosures and continuity checks;
- outward-rounded binary64 interval arithmetic for regular rows;
- a general moving-history receiver-source-time block certificate that either excludes every ordered pair in the declared memberships or sends the entire block to exact fallback;
- a deterministic hierarchical moving-history traversal with disjoint full pair coverage, bounded node work, compact exact tiles, and a bounded native exact-pair fallback that now supplies coupled acceleration snapshots;
- a deterministic multithreaded exact-pair retained-history/root batch;
- complete simple-root brackets with transmitter-side and receiver-side enclosures, retained-history provenance fingerprints, segment identity, memory-boundary status, an inward-rounded MPFR tolerance-edge probe, and the canonical coincident self-endpoint rule;
- a provenance-bound uniform-circular history factory whose strict chord certificate excludes the complete open self-search interval at $0<v\le c_f$, while verification of arbitrary straight $v=c_f$ histories remains incomplete and those histories are not advanced;
- local difficult-row replay using MPFR/GMP directed interval arithmetic; and
- Verification incomplete outcomes at caustic/rail and precision ceilings;
- certified sharp-law acceleration reconstruction that consumes only complete root certificates covering the full emission domain through reception;
- certified binary64 finite-width acceleration reconstruction that budgets error on the globally summed interval integral and refines the active time cell with the largest enclosure-width contribution, while retaining caller-bounded depth and cell exhaustion;
- a provenance-gated analytic pinned-fold specialization for self-pairs whose factory-certified circular-prefix speed equals $c_f$: a second-order Taylor enclosure preserves the vanishing causal-residual derivative, and a midpoint integral with a certified first-derivative remainder encloses the model-bound retained-history finite-width integral; arbitrary histories retain the generic finite-width route. This certificate does not claim the unrepresented interval before the retained-history boundary or an infinite-past master-equation integral;
- a provenance-gated pinned-fold temporal onset step for the same exact $v=c_f$ circular endpoint: the certified sharp-chart value at the single onset instant is excluded from the positive-duration acceleration integral, the implicit right-endpoint acceleration advances the eligible path, and a certificate binds the history fingerprint, root-free open search, coincident-endpoint exclusion, memory boundary, start chart, and temporal rule;
- one auditable acceleration contribution per admitted root, including the transmitter-side factor, receiver-side factor, branch orientation, acceleration strength, polarity, root precision route, and interval-vector contribution; and
- complete ordered receiver-source matrices, including self-pairs, with a fixed pairwise interval reduction tree whose result is independent of worker scheduling;
- correctness-first coupled cubic acceleration correction in which every path advances from one immutable accepted-history view;
- full-step versus two-half-step local position and velocity error estimates, with the pinned-fold onset rule applied consistently to the full step and first half-step, exact step halving after rejection, and root-topology subdivision controls; and
- atomic in-memory publication that exposes either every recertified fine history or the unchanged input histories, never a partially advanced path set, with corrected endpoint accelerations required to lie within the recertified inflated-history intervals up to the declared correction tolerance;
- tamper-evident checkpoint serialization, including factory revalidation of circular-prefix certificates, atomic durable file publication, and restart continuity that reproduces uninterrupted history fingerprints; and
- a persistent Borg shadow worker protocol that accepts continuous cubic histories and returns only atomically published history extensions; and
- a pinned exact-history segment API that keeps disk blocks alive for the complete lifetime of every borrowed segment while value access remains the safe default; and
- Borg controls for retained-history population count, requested duration, automatic fixed-size chunks, progress, cancellation, and clean restart; and
- binary64 scheduling-tail detection that preserves the explicitly requested decimal endpoint when absolute-time subtraction leaves only a rounding-scale remainder. This is not the still-open split-absolute-time implementation.

The native fixtures are independently checked against the Python 90-decimal-digit oracle by `tests/test_eom_native_history_layer.py` and `tests/test_eom_native_acceleration.py`. Coupled evolution and atomic publication are checked against the same oracle by `tests/test_eom_native_coupled_evolution.py`.

The Borg response identifies its deterministic payload scope as `claim-fields-and-published-extensions/v1`. Wall-clock timing and live disk-storage statistics remain measured diagnostics and are intentionally outside that byte-stability scope; replay comparisons must select the claim-carrying fields and `publishedExtensions`, not compare the complete JSON response byte for byte. An atomic joint-affine step that meets a finite-width event fails closed as `unsupported_caustic_or_singular_chart` because no certified affine event map exists yet. Under `sharp_with_finite_width_fallback`, the evolution controller retries that same width through the independently certified ordinary finite-width route, permanently dropping optional joint state; if the retry cannot certify, the run still fails closed. `caustic_transit_uncertified` remains the terminal classification for callers that do not take the controller fallback. The native evolution certificate records an actual degradation as `joint_state_fallback_applied`; the Borg response exposes the same fact as `jointStateFallbackApplied`.

This is not yet the complete production EOM application. It accepts and publishes correctness-first coupled sharp and finite-width steps, persists single-host atomic checkpoints, and can drive an opt-in Borg shadow run. The hierarchical traversal now drives coupled acceleration snapshots and records certified exclusions versus exact fallback. Excluded pairs are still materialized for the existing deterministic receiver reducer, so compressed million-path reduction remains open. The persistent worker still receives the full retained-history request at each atomic chunk. GPU, multi-GPU, distributed histories, split absolute time, multirate scheduling, and the production million-path run remain open. Borg uses a certified artificial retained history as part of its randomized initial condition and publishes accepted EOM extensions from $T=0$ with conditional provenance. The one-path subset refinement control passes at `0.01`, `0.005`, and `0.0025`, with byte-identical one-thread/four-thread output at `0.0025`. The strict six-path full-population control currently fails closed at coarse step `0.01` on `krawczyk_image_not_strictly_interior`, so the full Borg consumer gate remains open alongside the broader correctness and scale obligations above.

Build and run the native fixture:

```bash
cmake -S src/eom -B /tmp/architrino-eom-build -DCMAKE_BUILD_TYPE=Release
cmake --build /tmp/architrino-eom-build --parallel 8
/tmp/architrino-eom-build/eom_native_fixture_cli all
/tmp/architrino-eom-build/eom_native_acceleration_fixture_cli all
/tmp/architrino-eom-build/eom_native_acceleration_fixture_cli \
  pinned-fold-benchmark
/tmp/architrino-eom-build/eom_native_evolution_fixture_cli all
/tmp/architrino-eom-build/eom_native_evolution_fixture_cli \
  far-field-dispersal
/tmp/architrino-eom-build/eom_native_evolution_fixture_cli \
  certified-correction-retry
/tmp/architrino-eom-build/eom_borg_shadow_cli print-protocol-version
/tmp/architrino-eom-build/eom_borg_shadow_cli borg-shadow-v0
/tmp/architrino-eom-build/eom_borg_shadow_cli borg-shadow-server-v0
/tmp/architrino-eom-build/eom_recursive_block_benchmark_cli \
  traversal moving_sparse 64 8 100000
node scripts/eom/run-borg-eom-refinement-ladder.mjs \
  /tmp/architrino-eom-build/eom_borg_shadow_cli
node scripts/eom/run-borg-eom-refinement-ladder.mjs \
  /tmp/architrino-eom-build/eom_borg_shadow_cli 6
```

Configure a sanitizer build with `-DEOM_ENABLE_SANITIZERS=ON`; the option enables AddressSanitizer and UndefinedBehaviorSanitizer on the library and every native fixture/CLI target.

## Equation providers and read-only inspection

The [Stage A provider boundary](../../reference/priorities/app-solver/manuscript.md#implemented-stage-a-provider-boundary) registers canonical acceleration evaluation through `EquationProvider`. `NativeCoupledEvolutionRequest::equation_selection` is optional: omission preserves legacy semantics; an explicit `EquationSelection{}` selects canonical/unrestricted/unconstrained numerical evaluation and requires exact `field_speed=1`. Public request-bearing operations reject unknown or unavailable selections before evolution/publication/checkpoint work. The immutable plan describes existing canonical dependencies; it is not an executable arbitrary stage graph.

The new CLI inspects selection and model identity, without certifying preparation/history admissibility or starting evolution:

```bash
cmake --build .tmp/eom-provider-stage-a/build --target eom_equation_inspect_cli
.tmp/eom-provider-stage-a/build/eom_equation_inspect_cli identity-self-test
.tmp/eom-provider-stage-a/build/eom_equation_inspect_cli capabilities
.tmp/eom-provider-stage-a/build/eom_equation_inspect_cli inspect --composition canonical/v1 --field-speed 1
```

Configure that build directory with the normal CMake command before building. Inspection accepts option/value pairs for composition, speed domain, boundary policy, constraint, method, field speed, coupling, chart policy, causal width and core scale. It rejects duplicate/unknown options and unavailable selections with an error code on stderr and nonzero exit. Exact parameter identities avoid binary64 rounding. Its model/plan digests and actual source/configuration receipt are descriptive; legacy v7 checkpoint identity/bytes and Borg protocol `EOM_BORG_NATIVE_V11` retain their existing meaning.

The built-in `canonical-surface/v1` provider now supplies [Stage B constrained evolution](../../reference/priorities/app-solver/analysis/equation-provider-stage-b-2026-10-10.md) through the typed C++ API. Restricted-speed compositions, full v2 transport, provider-aware checkpoints, analytical/implicit providers, dynamic loading and a general stage interpreter remain later capabilities. The manually invoked `eom_equation_provider_fixture_cli` supplies focused Stage A contract checks without adding a recurring CTest entry; the [migration receipt](../../reference/priorities/app-solver/analysis/equation-provider-stage-a-inventory-2026-10-10.md) records the bounded validation.

## Surface constrained evolution: Stage B

Include `SurfaceConstraint.hpp` for geometry, receiver-total diagnostics and solution certificates. Configure the existing request before calling `evolve_native_coupled_histories`:

```cpp
request.equation_selection = EquationSelection{
    "canonical-surface/v1", "unrestricted", "none", "surface", "numerical"};
request.field_speed = "1";
request.surface_geometry = SurfaceGeometryDefinition{}; // unit sphere
request.surface_numerics.position_tolerance = "1e-6";
request.surface_numerics.tangent_velocity_tolerance = "1e-6";
```

Geometry kinds are `sphere`, `oblate` and `ring-torus`. The oblate polar radius is `radius * flattening`, with `0 < flattening <= 1`; a ring torus requires `major_radius > radius > 0`. Center and exactly orthogonal orientation are exact decimal-token inputs. Geometry is fixed throughout the request. Select a surface-consistent `RetainedHistory::uniform_circular` preparation from the exactly admitted family; generic cubic histories, unproved preparation reconstruction and nonrepresentable mesh/certificate endpoint mismatches reject. The manual fixture supplies complete executable request examples.

The provider projects the canonical receiver sum into the tangent plane and adds the curvature acceleration required by the surface constraint. Discarded normal interaction, curvature and total support are recorded only after receiver superposition. The existing host predicts/corrects candidate cubics; a full-slab integral-map proof then validates solution/error inclusion, root completeness, contraction and continuous surface/tangency tolerances before atomic publication. Published paths carry immutable in-memory solution evidence, including true source-acceleration bounds for later delayed interactions. No endpoint projection repairs a failed proof.

This initial numerical route requires sharp ordinary charts, coherent solution speeds strictly below the normalized wake speed and partner roots wholly inside already accepted history. These are certification-domain conditions, with no speed modification. The selected speed regime remains unrestricted. Joint/finite-width/event routes and optional publication modes reject. v7 checkpoint creation/resume and canonical requests reject Surface carriers; continuation through the current evolution call is supported, persistent restart is deferred. A complete acceleration snapshot belongs to its selected model and cannot be reused across canonical/Surface modes.

```bash
cmake --build .tmp/eom-provider-stage-a/build --target eom_surface_fixture_cli
.tmp/eom-provider-stage-a/build/eom_surface_fixture_cli
.tmp/eom-provider-stage-a/build/eom_equation_inspect_cli inspect \
  --composition canonical-surface/v1 --constraint surface \
  --surface-kind oblate --surface-radius 1 --surface-q 0.5
```

The fixture checks independent exact circular solutions on all three shapes, geometry/derivative controls, dense-segment rejection and bounded interacting implementation controls. It is manually invoked rather than enrolled in recurring CTest. Its passing receipt establishes the tested implementation scope; six-member assembly dynamics, stability, physical confinement and energy laws require subsequent independent scientific qualification.

Run the independent parity test:

```bash
PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_native_history_layer.py -v
PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_native_acceleration.py -v
PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_native_coupled_evolution.py -v
```
