# Bit-identical speed-ups for the Surface route

October 20, 2026. This record covers three changes to the EOM solver that make the Surface route (`canonical-surface/v1`) faster without changing any number it produces. They are items 1, 4 and 5 of the ranked list in the [Surface display-speed analysis](../../app-surface/analysis/display-speed-and-solver-cost-2026-10-20.md#where-the-surface-route-spends-time). The operator asked for these bit-identical items first. The changes that would alter certified numbers (items 3 and 6), and the parallel path certification (item 2), are out of scope and untouched. The claim tested here is "same results, faster", so the acceptance check is bit-identity against the unmodified binary, not agreement with an independent reference. All numerical instances use $c_f=1$.

## Result

All three changes are implemented, and none was stopped. With the build's source-digest receipt held equal, the changed solver reproduces the unmodified solver's output byte for byte:

- **Fixtures:** every CTest and manual EOM fixture matches (35 commands).
- **Surface responses:** both Surface responses match, the default preset at 53,416,798 bytes and the speed-0.5 run at 80,209 bytes.
- **Default preset:** the worker's CPU time falls by about 1.9×.
- **Speed 0.5:** one rejected attempt falls by about 12×, from about 18 s to about 1.5 s of CPU.

## What changed

### Item 1: inline interval rounding and operators

Interval arithmetic rounds every lower bound one step down and every upper bound one step up, so each computed interval encloses the true value. Before, each step was a call into the system maths library's `nextafter`. The interval constructor's finiteness check (`require_finite`) and the arithmetic operators were also separate function calls. Together these accounted for about 60% of profile samples at speed 0.01.

`Interval.hpp` now defines `interval_detail::downward`/`upward` inline. For a finite value they move to the adjacent representable double by adding or subtracting one in the binary64 bit pattern. A positive value's next-larger neighbour has its bit pattern plus one. A negative value's has its bit pattern minus one, because the pattern stores sign and magnitude separately. Either signed zero steps to the signed smallest subnormal. A non-finite input (an infinity or a NaN) still goes through `std::nextafter`. That keeps the old behaviour on that rare path exactly, including `downward(+inf)` returning the largest finite double and NaN payloads passing through. The constructor, `Interval::point`, `+`, `−`, `×`, `÷` and `interval_square` are now inline in the header, with their bodies unchanged. The two exception messages the constructor can raise are built in out-of-line helpers, with identical text. None of the inlined bodies has a product feeding a sum within one expression. Floating-point contraction (fusing a multiply and an add into one rounding) therefore cannot change their results in any translation unit that includes the header, whatever its contraction setting. Functions that do contain such a pattern (`midpoint`, `width`) stay out of line. The binary-search helpers, transcendental functions and vector helpers are unchanged.

**Equivalence of the rounding step, derived.** For finite binary64 values, the bit patterns of non-negative values increase with the value, and the patterns of non-positive values increase with the magnitude. Consecutive representable values therefore have consecutive patterns within each sign, and the two zeros sit between the smallest subnormals of each sign. Stepping the pattern by one in the stated direction is exactly IEEE 754 `nextafter` toward the matching infinity. That includes `±DBL_MAX` stepping to `±∞` and `±denorm_min` stepping to the zero of the same sign.

**Equivalence of the rounding step, measured.** Instrument: [`eom_interval_rounding_fixture_cli`](../../../../src/eom/native/eom_interval_rounding_fixture_cli.cpp), a manual fixture with no recurring enrollment. It compares the new functions bit for bit with the previous `Interval.cpp` definitions, copied verbatim, which call `std::nextafter`. It ran on the known case first. A deliberately wrong candidate with no signed-zero handling, compiled with `-DEOM_ROUNDING_FIXTURE_SELF_TEST`, reported `FAIL` with mismatches at exactly the signed zeros. The real run reported `PASS`, with zero mismatches in each of 3,512,583,012 comparisons:

| Input set | Comparisons | Mismatches |
| --- | ---: | ---: |
| Named edge cases, both signs: zeros, smallest and largest subnormals, smallest normal, 1 ± ulp, `DBL_MAX`, infinities, eight NaN patterns | 100 | 0 |
| Every sign, exponent and top-8 mantissa pattern, with six low-mantissa variants each | 12,582,912 | 0 |
| Uniform random 64-bit patterns ($10^9$) | 2,000,000,000 | 0 |
| Random products and differences of magnitudes $10^{-12}$ to $10^3$, including exact zeros | 1,500,000,000 | 0 |

This fixture establishes agreement on the inputs it visits. The derivation above covers the remainder. *Falsifier:* any finite double for which `interval_detail::downward(x)` or `upward(x)` differs in bits from `std::nextafter(x, ∓∞)`.

### Item 4: binary-search segment lookup

`segment_hull` encloses a retained history's position or velocity over a time interval. It previously scanned every segment from the first, pinning each, until it reached the requested interval. That cost grows with run length.

It now starts at `segment_index_at` (the existing binary search on nominal end times), clamped into the history's nominal span. It then steps back while the previous segment's outward end still reaches the requested lower bound, and runs the original loop body unchanged from there.

**Equivalence, derived.** Until the first segment is used, the loop changes neither its result nor its cursor. Any segment whose outward end interval lies below the requested lower bound is skipped there (`upper < cursor`). Validated joins make the segment end times strictly increasing:
- Every adjacent pair passes `validate_segment_join`, which requires the next start to equal the previous end as an exact rational.
- Every segment requires `t_start < t_end`.
- Decimal tokens are parsed with correctly rounded `from_chars`.

The outward ends are monotone functions of those times, so they increase too. Every segment before the chosen start therefore has an outward end below the requested lower bound, and the original scan would have skipped it. From the chosen start, the loop visits the same segments in the same order with the same arithmetic. `segment_index_at` and `correlated_position_hull` already rely on the same ordering.

### Item 5: validate the immutable request once per run

`evolve_native_coupled_histories` validates its request at entry. Each step attempt then called the public `certify_native_atomic_coupled_step`, which validated a per-attempt copy of the request again. For a Surface request, that repeated the dense surface certification of every prepared-past segment, about 10 s per attempt at speed 0.5. The public step function is unchanged and still validates every caller's request. The evolution loop now calls an internal entry that can skip only `validate_request`. It skips it when the attempt request equals the request already validated:
- The loop's copy differs from the validated request only in `joint_histories` and `adjudicated_finite_width_pairs`. This is the only code between the copy and the call; it was checked by listing every `step_request` assignment.
- The skip applies only when both fields are empty in both requests. Surface admission already requires both to be empty.
- In every other case the attempt is revalidated exactly as before.

**Equivalence, derived.** `validate_request` is a deterministic function of the request with no side effects. Applied to identical request data that has already passed, it passes again. Skipping it therefore cannot change any certificate, error or published history. The per-step `validate_step_inputs` check, the provider admission inside each acceleration snapshot, and publication still run on every attempt.

**Checked and left unchanged.** The two other repeats named in the brief stay as they are:
- **Provider `admit()` repeats** (`SurfaceEquationProvider.cpp:48`, which calls `admit_surface_preparation` in `SurfaceConstraint.cpp`). `admit()` reads per-attempt fields (`joint_histories`, `adjudicated_finite_width_pairs`, optional publication flags), so skipping it needs a new flag through the provider interface. Its cost is small. *Measured* (macOS `sample`, speed 0.01): `SurfaceEquationProvider::admit` appears in at most 21 and `admit_surface_preparation` in at most 16 of about 11,280 samples in any single call-graph line. These counts are per-branch lower bounds, so the total is *inferred* to be of order 1% or less.
- **Publication repeat** (`SurfacePublication.cpp:290`). It runs only while the input history still lacks surface evidence, so only during the attempts of the first step. Its cost is of the same small order.

Neither repeat justifies an interface change in a bit-identical pass.

## Bit-identity evidence

All builds use the same compiler (Apple clang 21.0.0), the same flags (CMake `Release`, `-O3 -DNDEBUG`, plus the project's `-ffp-contract=off`) and the same machine (Apple M3, 8 cores, macOS 27.0.1). The builds:
- **Baseline:** built from a `git archive` snapshot of commit `4e17f9aff` (HEAD), identical to the working tree's `src/eom` before editing by `diff -r`.
- **Stage builds:** stage 1 adds item 1, stage 2 adds item 4, and stage 3 adds item 5. Each was built from its own snapshot, so concurrent edits elsewhere could not enter.

The operator's preview binary in `.tmp/eom-native-dev` was not touched. The dev server rebuilds that directory at startup and cannot be pointed elsewhere, so instead of a second server, requests were sent through `scripts/eom/EomV2ProcessClient.mjs`, the client the dev service itself uses, pointed at these builds.

```bash
B=.tmp/eom-speedups-build
cmake -S $B/snap-<stage>/src/eom -B $B/build-<stage> -DCMAKE_BUILD_TYPE=Release
cmake --build $B/build-<stage> --parallel 4
node scripts/dev/owned-compute-supervisor.mjs run --owner-task claude-eom-speedups-a1c87fc1 \
  --deadline-seconds 10800 -- node $B/run-suite.mjs $B/build-<stage> <label>
node $B/compare-suite.mjs baseline-1 <label>
```

`run-suite.mjs` runs the seven CTest commands and 28 manual fixtures. It records each command's exit code and stdout SHA-256. `compare-suite.mjs` requires equal exit codes and equal stdout bytes. Where bytes differ, it retries with only the values of keys containing `wall` or `seconds` blanked, and names those keys. Before use, it passed two known cases: a one-character change in the Surface fixture output gave `FAIL`, and a wall-clock-only change was reported as such. `compare-response.mjs` likewise gave `PASS` on identical responses and `FAIL` naming a one-digit change in a published coefficient.

### Fixtures

Two baseline runs establish run-to-run variation. Only `eom_native_evolution_fixture_cli far-field-dispersal` varies, and only in its four wall-clock keys (`enabled_step_wall_seconds`, `enabled_final_step_wall_seconds`, `enabled_total_wall_seconds`, `disabled_step_wall_seconds`). Against baseline run 1:
- **Byte-identical at every stage:** 32 commands.
- **Wall-clock keys only:** the far-field dispersal fixture, as in the baseline-to-baseline comparison.
- **Build receipt only:** two commands differ in stages 1–3, by the descriptive build receipt (`resolvedModel.build.sourceDigest` and `buildDigest`) and data derived from it. That receipt is a hash of the `src/eom` source files, so any source edit changes it.
  - `eom_equation_inspect_cli capabilities` prints the receipt.
  - `eom_validated_persistence_fixture_cli` prints SHA-256 values of checkpoint files that embed it. Its retained checkpoint file differs only in `build.sourceDigest`, `build.buildDigest`, `binding` and `digest`, and the last two hash the resolved model, which contains the receipt.

To rule out anything else hiding in those hashes, stage 3 was built a second time (`build-stage3-receipt`) with the baseline's generated `EquationSourceIdentity.hpp` substituted after configuration. Its capabilities output matched the baseline's SHA-256 (`1f46b115…`), confirming the substitution held. With the receipt held, **all 35 commands match baseline run 1**: 34 byte for byte, and far-field dispersal after blanking only its four wall-clock keys.

The script `scripts/eom/fixtures/eom-v2-qualification.mjs` exits 1 identically on every build, including the unmodified baseline. Its first `capabilities` call is rejected by the client's response binding check (`EomResponseRecord.mjs:56`, "Unsupported EOM request schema undefined"). This is a pre-existing mismatch between that script and the JavaScript client. It is outside the solver and unrelated to these changes.

Digests (first 12 hex digits of stdout SHA-256; `=` means equal to baseline run 1):

| Command | Exit | baseline 1 | baseline 2 | stage 1 | stage 2 | stage 3 | stage 3, receipt held |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| `eom_native_fixture_cli all` | 0 | `b200c5d7ce96` | = | = | = | = | = |
| `eom_native_acceleration_fixture_cli all` | 0 | `736a9cbaaaff` | = | = | = | = | = |
| `eom_history_profile_cli pin-lifetime` | 0 | `0fa271a21174` | = | = | = | = | = |
| `eom_history_profile_cli terminal-state-equivalence` | 0 | `bb9b3cafb57f` | = | = | = | = | = |
| `eom_native_evolution_fixture_cli all` | 0 | `03ffc5bbf50c` | = | = | = | = | = |
| `eom_stationary_joint_frontier_fixture_cli` | 0 | `856067184baa` | = | = | = | = | = |
| `eom_borg_shadow_cli print-protocol-version` | 0 | `cbeb65bc7e79` | = | = | = | = | = |
| `eom_native_evolution_fixture_cli far-field-dispersal` | 0 | `8d43f335cbd3` | wall clock | wall clock | wall clock | wall clock | wall clock |
| `eom_native_evolution_fixture_cli certified-correction-retry` | 0 | `d01068bf6edd` | = | = | = | = | = |
| `eom_native_evolution_fixture_cli finite-width-post-event` | 0 | `8b4f5a704b32` | = | = | = | = | = |
| `eom_surface_fixture_cli` | 0 | `72ca14809d4e` | = | = | = | = | = |
| `eom_provider_transport_fixture_cli` | 0 | `9acba482ec16` | = | = | = | = | = |
| `eom_equation_provider_fixture_cli` | 0 | `153e2aa5f25b` | = | = | = | = | = |
| `eom_equation_inspect_cli identity-self-test` | 0 | `7310de10782a` | = | = | = | = | = |
| `eom_equation_inspect_cli capabilities` | 0 | `1f46b1155c09` | = | receipt | receipt | receipt | = |
| `eom_matched_pair_fixture_cli all` | 0 | `f93a61eb9c31` | = | = | = | = | = |
| `eom_validated_ordinary_fixture_cli` | 0 | `644c1ab8e826` | = | = | = | = | = |
| `eom_validated_persistence_fixture_cli 1 <dir>` | 0 | `0b56573a99b6` | = | receipt | receipt | receipt | = |
| `eom_validated_evolution_fixture_cli known` | 0 | `05b60ae53db8` | = | = | = | = | = |
| `… controller` | 0 | `a46691237d7e` | = | = | = | = | = |
| `… refusals` | 0 | `c508c66c75ad` | = | = | = | = | = |
| `… cancellation` | 0 | `5de66a0eba00` | = | = | = | = | = |
| `… aliasing` | 0 | `bdfede27e90f` | = | = | = | = | = |
| `… continuation` | 0 | `c67dbcf1d57c` | = | = | = | = | = |
| `… budgets` | 0 | `f89f2dbba038` | = | = | = | = | = |
| `… admission` | 0 | `5367fb9da3e6` | = | = | = | = | = |
| `… ledger` | 0 | `219483ca4844` | = | = | = | = | = |
| `… admission-b` | 0 | `1b863dd19b79` | = | = | = | = | = |
| `… grouping` | 0 | `3a974350ff4a` | = | = | = | = | = |
| `… workers` | 0 | `17726b2f3e7c` | = | = | = | = | = |
| `… record 1 <dir>` | 0 | `136a5e2141ae` | = | = | = | = | = |
| `eom_validated_far_step_fixture_cli producer` | 0 | `45dc80aa258d` | = | = | = | = | = |
| `… generated-source` | 0 | `51e77b045b87` | = | = | = | = | = |
| `… consumer` | 0 | `002cbfde497b` | = | = | = | = | = |
| `node scripts/eom/fixtures/eom-v2-qualification.mjs <build>/eom_borg_shadow_cli` | 1 | `d0a84c739be8` | = | = | = | = | = |

### Surface responses

Requests were built once by `createSurfaceExperiment()` (`src/apps/surface/SurfaceExperiment.js`), with fixed run identities, and every build received the same request bytes:
- **Default preset:** speed 0.01, 0→0.25, step 0.01, six members, sphere radius 0.1, coupling $10^{-6}$, `fieldSpeed` 1.
- **Speed 0.5:** speed 0.5, 0→0.02, the same numerics.

The default run completed 25 accepted steps on every build. The speed-0.5 run halted on every build with `minimum_step_exhausted` after four rejected attempts and no accepted step.

- **Raw solver output, measured.** The EOM binary was run directly with the client's stdin wire format (`{"operation":"evolve","request":…}`). The baseline and receipt-held stage-3 outputs are byte-identical: SHA-256 `8ab0554e72383c30…` (53,416,798 bytes) for the default run and `883b34673b19c2b5…` (80,209 bytes) for speed 0.5. Each build's output was also identical across its two timing rounds.
- **Client responses, measured.** Full responses through `EomV2ProcessClient` were compared leaf by leaf with `compare-response.mjs`: 1,751,492 leaves for the default run and 3,379 for speed 0.5. Stages 1, 2 and 3 each differ from the baseline in exactly nine leaves:
  - the run-identity field `checkpoint.id`, a random UUID the client assigns;
  - the build receipt `resolvedModel.build.{sourceDigest, buildDigest}`, in the response and in `checkpoint.data`;
  - the digests derived from the resolved model: `modelDigest`, `checkpoint.data.binding`, `checkpoint.data.digest` and `checkpoint.digest`.

  `modelDigest` and the checkpoint digest were recomputed on each side and are self-consistent. With those nine leaves removed, the responses hash identically. Two baseline runs differ only in `checkpoint.id`. Neither response contains a wall-clock field.

**Scope of these measurements.** They establish bit-identity on the 35 fixture commands and the two Surface requests above. They do not by themselves establish it for every input. That broader claim rests on the derivations above. *Falsifier:* any EOM request whose output from the receipt-held changed build differs from the unmodified build's output.

**Independent-reference check of the changed code, measured.** The Python oracle suites compare the EOM solver against a separately authored 90-decimal-digit reference. `tests/test_eom_native_history_layer.py`, `test_eom_native_acceleration.py` and `test_eom_native_coupled_evolution.py`, run under the shared venv against the working tree (equal to the stage-3 snapshot by `diff -r`), passed 90 tests in 500.6 s. They were not run on the baseline, because they build from the working tree.

## Timing

The machine was heavily loaded by other work throughout. The 1-minute load average was 12–15 in client round 1 and 19–52 afterwards on 8 cores, mostly from other agents' Python processes. Wall times are therefore noisy, and only the comparisons within one round are meaningful. CPU time of the worker process (`/usr/bin/time -l`, user seconds) is less sensitive to load and is the primary measure here. Every build ran single-threaded; no `threadCount` was sent. Each round ran baseline, stage 1, stage 2 and stage 3 back to back.

**Measured: default preset** (speed 0.01, 0→0.25, 25 accepted steps):

| Build | CPU user s, run 1 / run 2 | Wall s, direct run 1 / run 2 | Wall s through client, rounds 1 / 2 / 3 |
| --- | --- | --- | --- |
| Baseline | 39.0 / 34.1 | 56.9 / 44.0 | 38.8 / 47.9 / 73.8 |
| + item 1 (inline rounding) | 24.7 / 21.4 | 43.1 / 35.5 | 24.1 / 41.1 / 55.1 |
| + item 4 (segment search) | 20.6 / 18.0 | 36.8 / 28.2 | 27.5 / 56.4 / 51.4 |
| + item 5 (validate once) | 21.0 / 17.7 | 27.1 / 26.7 | 20.6 / 45.8 / 48.5 |

The receipt-held stage-3 build gave 18.8 s CPU in one further run. Mean CPU per accepted step fell from 1.46 s to 0.77 s.

**Measured: speed 0.5, one step attempt** (four rejected attempts per run; values are run totals ÷ 4):

| Build | CPU user s per attempt, run 1 / run 2 | Wall s per attempt through client, rounds 1 / 2 / 3 |
| --- | --- | --- |
| Baseline | 19.0 / 16.9 | 16.4 / 31.7 / 38.6 |
| + item 1 | 6.5 / 6.7 | 8.5 / 11.5 / 15.4 |
| + item 4 | 6.4 / 7.1 | 9.1 / 12.5 / 14.6 |
| + item 5 | 1.4 / 1.6 | 1.7 / 2.9 / 3.1 |

The baseline per-attempt figures exceed the analysis's 10 s, *inferred* to be the load, since CPU time is also inflated under contention on this machine.

**Inferred: contribution of each item.**
- **Item 1:** removes about 37% of CPU time at speed 0.01 (1.58×) and about 63% at speed 0.5. Its effect is larger at speed 0.5 because the repeated dense certification is almost all interval arithmetic.
- **Item 4:** removes about a further 16% at speed 0.01, consistent with the 17% profile share of the linear scan. It has no measurable effect at speed 0.5, where the history is short.
- **Item 5:** cuts the speed-0.5 attempt by about 4.5× after item 1. Its effect at speed 0.01 (about 3–4%, predicted) is within the noise of these runs.
- **Combined:** about 1.9× CPU at speed 0.01 and about 12× per rejected attempt at speed 0.5.

The analysis's guessed combined effect of items 1–5 (to 0.05–0.1 s per step) included items 2 and 3, which are not implemented here. *Falsifier:* repeated measurement on an unloaded machine giving a stage-3/baseline CPU ratio outside roughly 0.45–0.6 at speed 0.01, or outside roughly 0.06–0.12 per attempt at speed 0.5.

**Not changed:** which speeds certify. Every build accepts and rejects exactly the same steps.

## Files and retained evidence

Solver changes (working tree, not committed):
- `src/eom/include/architrino/eom/Interval.hpp` and `src/eom/src/Interval.cpp` (item 1).
- `src/eom/src/History.cpp` (item 4).
- `src/eom/src/CoupledEvolution.cpp` (item 5).
- The new manual fixture `src/eom/native/eom_interval_rounding_fixture_cli.cpp`, with its CMake target in `src/eom/CMakeLists.txt` (no `add_test`).

Compact evidence is retained in `.local-data/eom/surface-speedups-2026-10-20/`:
- the suite and comparison scripts, and the requests;
- every suite `summary.json`;
- the response comparison reports and the timing rows;
- the rounding-fixture receipt and the digest table.

The retained scripts are copies, and their relative imports assume they run from `.tmp/eom-speedups-build/`.

The bulky outputs (raw 53 MB responses, per-stage builds) remain in the disposable scratch folder `.tmp/eom-speedups-build/`. No server was started, and the operator's Surface preview, its lease and `.tmp/eom-native-dev` were not touched.
