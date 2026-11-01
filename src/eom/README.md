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

The built-in `canonical-surface/v1` provider supplies [Stage B constrained evolution](../../reference/priorities/app-solver/analysis/equation-provider-stage-b-2026-10-10.md). [Stage C](../../reference/priorities/app-solver/analysis/equation-provider-stage-c-2026-10-11.md) adds inclusive/strict domain admission with halt policies, v2 transport and provider-aware v8 persistence. Analytical/implicit providers, dynamic loading and a general stage interpreter remain later capabilities. The manually invoked provider/Surface/transport fixtures supply focused qualification without adding recurring CTest entries.

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

This numerical route requires sharp ordinary charts, coherent solution speeds strictly below the normalized wake speed and partner roots wholly inside already accepted history. These are certification-domain conditions, with no speed modification. The default selector remains unrestricted; explicit inclusive/strict selectors require `halt`. Joint/finite-width/event Surface routes and optional publication modes reject. v7 checkpoint creation/resume and canonical requests reject Surface carriers; provider-aware v8 restart revalidates chronological publications and restores the immutable carriers. A complete acceleration snapshot belongs to its selected model and cannot be reused across modes.

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

## Provider-aware v2 transport and v8 checkpoints

The [v2 implementation contract](../../reference/priorities/app-solver/contracts/evolution-contract-v2.md) documents request fields, limits, response ledgers, speed domains and restart. Include `ProviderTransport.hpp` for typed persistence or execute the existing CLI's `eom-v2`/`eom-v2-server` dispatch. Build dependencies now include Boost.JSON and Boost property-tree entry headers in addition to MPFR/GMP. Readiness/progress are separate stderr JSON events. A trusted launcher may supply `--checkpoint-file PATH`; request JSON cannot select a filesystem path. Durability requires file and directory fsync; size/storage exhaustion returns accepted coverage with an explicit non-durable receipt.

The local dev server exposes `/api/eom/v2/` through the shared EOM executable. `scripts/eom/EomV2ProcessClient.mjs` owns watched workers/server-generated checkpoint identities; `src/apps/shared/EomV2HttpClient.js` supplies consumer-neutral inspection, run, generation-scoped cancellation and restart. Borg shares their JSON POST/error adapter and retains its own grading/retention rules. These interfaces do not deliver the Surface UI or qualify interacting 3:3 physics. V8 rejects typed joint preparation until its full affine binding exists; existing supported v7 joint continuation remains with its owner.

Manual Stage C qualification, after rebuilding:

```bash
.tmp/eom-provider-stage-a/build/eom_provider_transport_fixture_cli
node scripts/eom/fixtures/eom-v2-qualification.mjs .tmp/eom-provider-stage-a/build/eom_borg_shadow_cli
```

Use the repository compute supervisor for these commands and builds. The qualification fixture uses retained ignored local checkpoint storage and loopback HTTP; it is not enrolled in recurring tests. On the current machine, SDK 27 linking failed with the installed compiler; this qualification configured `CMAKE_OSX_SYSROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk`. Select a compatible installed toolchain/SDK rather than assuming that path exists elsewhere.

## Optional matched-pair acceleration snapshots

`NativeCoupledEvolutionRequest::matched_pair_enclosure_policy` defaults to `"disabled"`. The optional `"canonical_snapshot_single_slab/v1"` policy groups two eligible opposite, equal-magnitude source charges during canonical acceleration snapshots, preserving two logical source identities and emitting one numerical interval with one debit against their two budget slices. It requires complete common-window coverage, exact error-free cubic sources, outward distance/speed bounds and certified member presence or absence. The `"canonical_snapshot_piecewise_exact/v1"` policy extends the same snapshot capability across several exact cubic segments: it partitions the window at every boundary of either member and uses the history layer's exact position/velocity join continuity. Source segments within the admitted search window must have zero reconstruction radii, and analytic factory histories decline grouping. Earlier retained history must be re-proved root free; unresolved geometry, arithmetic or budget admission takes the existing exact fallback. Enable a positive `far_field_enclosure_fraction` to reserve the acceleration-width allocation; numerical requests use `field_speed="1"`.

Use either policy with `certify_native_acceleration_snapshot`; both evolution entry points reject a non-disabled matched-pair policy as `unsupported_execution_policy`. Typed snapshot controls do not expose a grouped evolution, checkpoint or transport capability. The [single-slab live review](../../reference/priorities/app-solver/analysis/matched-pair-review-stage-1-live-2026-10-11.md) and [piecewise live review](../../reference/priorities/app-solver/analysis/matched-pair-review-stage-2-live-2026-10-11.md) record bounded containment, accounting, mutation and compatibility evidence, together with their limitations. Generated-history true-solution and derivative inclusion remains an independent obligation before evolution admission. Pairing is deterministic, can be looser than individual enclosures, and has no accepted speed-benefit result.

The manually invoked fixture is not enrolled in recurring CTest:

```bash
cmake --build .tmp/eom-matched-pair/build-live --target eom_matched_pair_fixture_cli --parallel 2
.tmp/eom-matched-pair/build-live/eom_matched_pair_fixture_cli all
.tmp/eom-matched-pair/build-live/eom_matched_pair_fixture_cli snapshot-file reference/priorities/app-solver/evidence/matched-pair-stage-1-snapshot-cases.txt
.tmp/eom-matched-pair/build-live/eom_matched_pair_fixture_cli matrix-negatives
.tmp/eom-matched-pair/build-live/eom_matched_pair_fixture_cli piecewise
.tmp/eom-matched-pair/build-live/eom_matched_pair_fixture_cli snapshot-file reference/priorities/app-solver/evidence/matched-pair-stage-2-snapshot-cases.txt
.tmp/eom-matched-pair/build-live/eom_matched_pair_fixture_cli matrix-negatives-piecewise
.tmp/eom-matched-pair/build-live/eom_matched_pair_fixture_cli evolution-guard
```

Configure the chosen build directory first and use the live compute owner for builds or prolonged fixture runs. The recorded live qualification used per-process `DEVELOPER_DIR=/Library/Developer/CommandLineTools` with the installed 26.5 SDK; it left system toolchain selection unchanged.

## Logarithmic provider

Select `model.compositionId: "logarithmic/v1"` through the shared v2 request/CLI. `model.coupling` is positive $\kappa_{\log}$, `fieldSpeed` is exactly `"1"`, constraint is `"none"`, method is `"numerical"`, and error-bound checking is `"strict"`. Canonical interaction and unrestricted speed remain the defaults. Shared Node and browser clients provide `modelOptions({constraint, method})` and `selectModel(selection)` using the host capability record. They discover choices; EOM performs actual preparation/domain admission. A surface-filtered list does not advertise logarithmic support.

This provider implements the inverse-distance acceleration in the [scientific definition](../../reference/priorities/master-equation-closure/equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement), including the unchanged transmitter weight, causal geometry, polarity and positive-delay self/partner clauses. The [solver manuscript](../../reference/priorities/app-solver/manuscript.md#logarithmic-provider-and-its-bounded-ordinary-root-domain) derives the interval Jacobian, whole-slab publication conditions and independent controls. Its first numerical chart is coherent histories strictly below wake speed, separated simple partner roots strictly before each accepted step start, and one exact affine initial segment or certified circular-factory history. Insufficient history, unresolved roots, speed-chart exit or exhausted numerical budgets halt without publishing the candidate. Inclusive/halt and strict/halt selectors add existing domain checks within this narrower numerical chart; they do not add a speed response or admit equality-speed evolution.

The ordinary host supplies stepping and correction; `RetainedPublication` validates the full continuous segment and retains true source-acceleration bounds. Surface uses the same validator with its additional constraint/geometry obligations. Unsupported surface combinations, joint/implicit evolution, finite-width/events, canonical far-field/grouped certificates, v3 far-step execution and exploratory point evolution decline explicitly. Root precision escalation is shared; logarithmic acceleration currently uses outward binary64 intervals and refuses an unmet tolerance. V7 is canonical-only. Logarithmic v8 checkpoints reconstruct chronological publication proofs and retain model/preparation/numerical identities. Complete ledgers use `ordinarySolutions`; retained record views include `acceptedOrdinary`. Numerical acceptance is separate from physical acceptance.

Build and run the explicit-use qualification through the [compute supervisor](../../reference/op/long-running-test-heartbeats.md):

```bash
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 180 -- cmake -S src/eom -B .tmp/logarithmic-provider/build -DCMAKE_BUILD_TYPE=Release
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 180 -- cmake --build .tmp/logarithmic-provider/build --target eom_borg_shadow_cli eom_logarithmic_fixture_cli --parallel 4
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 120 -- .tmp/logarithmic-provider/build/eom_logarithmic_fixture_cli
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 180 -- node scripts/eom/fixtures/logarithmic-provider-qualification.mjs .tmp/logarithmic-provider/build/eom_borg_shadow_cli
```

Select a compatible installed SDK if required by the local toolchain; the November 1 qualification used `-DCMAKE_OSX_SYSROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk`. The Node fixture contains a complete runnable v2 request: opposite polarities initially at rest at $\pm0.1$, coupling `"0.0001"`, evolution to `"0.25"`, step `"0.03125"`, and explicit attempt/error/memory budgets. It writes original requests/results, checkpoints and retained records under `.local-data/eom/logarithmic-provider-2026-11-01/`. Pass another output directory as its second argument for a separate evidence generation. It is not enrolled in recurring discovery or CI. The C++ fixture first checks independent stationary and moving-source formulas, then computed-history evolution, refinement and restart; client parity/replay alone are engineering checks. The browser-client fixture uses an in-process fetch adapter to the real EOM worker and does not establish rendered-browser or deployed-HTTP behavior.
