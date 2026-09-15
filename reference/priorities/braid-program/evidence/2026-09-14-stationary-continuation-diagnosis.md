# Stationary Binary Continuation Diagnosis — 2026-09-14

Status: bounded diagnosis complete; the half-step prefix reaches the formerly rejected endpoint; full binary fate and Campaign 1 remain open.

## Decision and scope

The operator authorized a current reproduction of the retained-history continuation barrier and the smallest justified scoped advance. This record belongs to BP-001/BP-003. It changes no global rank, physical law, acceptance tolerance, historical reference or campaign admission. The [analytical treatment](../analysis/stationary-continuation-history-bound.md) explains the radial uncertainty bound and prospective endpoint-symbol experiment. The four-step plan and initial control order are recorded in the [work log](../work-log.md#2026-09-14--bounded-stationary-continuation-diagnosis-2-braid).

The selected calculation is the existing stationary held-prehistory binary: positions $x=\pm0.5$, zero initial velocities, history depth `20`, prehistory segment width `0.1`, charges represented by the existing decimal tokens for $\pm1/6$, and coupling computed by the fixture as `36.0 * 0.2862286103053385`. Wake speed is `1`; the sharp acceleration chart, `1e-5` root tolerance, 128–512-bit precision ladder and all position, velocity and correction tolerances remain the existing fixture values. Prefix steps range from `0.0025` to `0.02`; direct frontier steps are `0.005`.

The one-time diagnostics support the current continuation decision under the September 14 task authorization and testing regime. They create no recurring suite or publication requirement. Each compiled target is rebuilt before use. Numerical target runs have one four-thread request and a five-minute supervised wall limit; build parallelism is four. Existing memory, root-cell, correction, rejection and attempt limits remain unchanged. Run times below are individual observed process times on the operator's Mac, not performance forecasts.

## Current baseline reproduction

**Measured by the freshly built `eom_stationary_joint_frontier_fixture_cli`, with output fields inspected using `jq`:** the unchanged fixture completes its 179-step prefix, certifies the direct-atomic frontier through `1.394999999999996`, and rejects the next fixed step to `1.3999999999999959`. Its process returned zero in `33.012` seconds because both the accepted frontier and expected rejected next step match the fixture's assertions. This is reproduction of instrument behavior, not an independent evolution proof.

| Field | Both rejected cross rows |
| --- | --- |
| Failure | `numeric_precision_limit_exhausted` |
| Diagnostic | `interior_root_not_surrounded/joint_root/root_time_budget_exceeded` |
| Joint root-time width | `1.0205062366854167e-05` |
| Ordinary-box root-time width | `1.1399023121699673e-05` |
| Projected affine radius | `3.5572726500569751e-322` |
| Projected independent remainder radius | `3.8146835796385637e-06` |
| Nonlinear radius | `1.2593939873926716e-11` |
| Precision / attempts | `512` / `3` |
| Isolated roots / root-free complement | `0` / `false` |
| Rejected ordinary publication unchanged | `true` |

The baseline's exact diagnostic tokens match the [July 27 record](2026-07-27-refined-prefix-joint-frontier-extension.md). The independent remainder dominates the reported root-width budget. This table does not independently partition that remainder into inherited endpoint error, velocity transport and new-step error; historical percentages are not reasserted as current measurements.

The supervised build lease is `d84c97e4-2c75-4413-8d50-8409c2513b5f`, with `13.01` seconds and exit zero. The baseline run lease is `c44edec2-f647-45a9-bd3a-4ec6a2b03b06`, with process-group closure recorded. Raw JSON is `.local-data/owned-compute/logs/c44edec2-f647-45a9-bd3a-4ec6a2b03b06.stdout.log`; its stderr is empty. `stat -f` establishes that the built fixture postdates the inspected relevant sources. A failed sandbox-only supervisor start occurred before target spawn; elevated process access then ran the required supervisor successfully.

## Known controls and independent boundary

Before the stationary target, `eom_native_fixture_cli all` completed in `0.292` seconds and its output was retained at `.local-data/braid-program/2-braid-2026-09-14/known-controls.json`. The existing Python assertions below were then applied directly to this same fresh packet using the shared venv; all three passed in a `0.030`-second process, without rebuilding or rerunning unrelated fixtures:

- `NativeHistoryLayerTests.test_joint_root_time_budget_matches_independent_decimal_controls`;
- `NativeHistoryLayerTests.test_joint_consumption_passes_only_with_correlation_and_fallback_dominance`;
- `NativeHistoryLayerTests.test_traversal_exact_fallback_preserves_joint_carriers`.

The first two use independent Decimal radial/transverse formulas and explicit rejection controls. The third checks carrier transport through two routes using the same root implementation. Their authority is local enclosure arithmetic and carrier behavior. Neither independently reproduces the complete interacting stationary evolution.

## Source diagnosis and next experiment

`rg` and `sed` inspection of `ExactPairBatch.cpp`, `RootTimeBudget.cpp`, `JointEndpointCorrector.cpp` and `CoupledEvolution.cpp` establishes that asymmetric root enclosure and radial projection already exist. The corrector still publishes its correction image as independent coordinate radii. The evolution controller also has `lift_joint_endpoint_remainders`, which gives accepted endpoint remainders new independent symbols for subsequent propagation, while older segments retain their original remainders. The direct atomic frontier replay bypasses that controller entry point.

The scoped fixture change adds `--controller-continuation END_TIME` to test that existing controller from the same accepted prefix, using fixed `0.005` steps. It adds progress messages and reports terminal status, cross-root records, endpoint intervals, symbol counts and separate internal-step/public-result rejection checks. The no-argument historical fixture remains available as its control. This changes diagnostic access, not the production evolution algorithm.

The independent positive inertial controller control initially fails at `accepted_total_representation_hull_does_not_dominate_joint_acceleration`: the exact-zero acceleration joint projection extends to approximately `9.8813129168249309e-323`, while the ordinary accepted representation extends only to approximately `5.434722104253712e-323`. This is a measured representation rejection in the one-path control, not a physical acceleration. It remains an explicit capability limit; the control is not counted as a pass. Separate public affine-algebra and known-rejection checks are required before the controller diagnostic is applied to the stationary target.

**Known-case instrument validation before the new stationary target:** a separately authored C++ control at `.tmp/2-braid/endpoint-lift-control.cpp` passed in `0.32` seconds. It checks the independently specified inertial formula against ordinary evolution, exact cancellation of a common affine position offset, velocity-error transport within charged evaluation rounding, zero new-symbol coefficients in the older segment with its old remainder retained, intentional wide-root rejection and unchanged ordinary/joint publication. It also invokes the new diagnostic helper on that known rejection: the helper returns status `halted`, accepted end `0`, one rejected step, and `rejection_atomic: true`. Its source records the analytical expectations before execution. This validates the observer's negative case and affine algebra; the interacting evolution and the failed lifted-inertial route retain their separate evidence limits.

## Controller comparison and one prefix refinement

The same-prefix controller experiment completed in `32.716` seconds under lease `4954a877-1762-4e0f-b855-73219aa86028`, returning diagnostic exit `2` for `root_completeness_not_certified`. Its accepted boundary remains `1.394999999999996`, with 31 accepted continuation steps and one rejected step. Both internal-step and final public-state atomicity checks pass. At the rejection the positive-receiver row reports joint width `1.0205062414329176e-05`, projected affine radius `3.0046833912832777e-06`, and independent remainder `8.1000020610153181e-07`; the other cross row has the same disposition with final-rounding differences. The registry grew from 12 to 24 symbols. Thus endpoint lifting changes the decomposition but does not reduce the complete root budget enough to advance. The receipt's progress messages advance through accepted times; its process group is closed.

The final bounded comparison halves all prefix step-size controls, from initial/maximum `0.02` and minimum `0.0025` to initial/maximum `0.01` and minimum `0.00125`. It keeps the same end target and fixed `0.005` continuation. This is one new history construction, not a parameter campaign. The fixture exposes it through `--prefix-step-scale 0.5`, records the actual prefix controls, and rejects scales outside `(0,1]`. Before this target, the separately authored control was recompiled against the observer and passed again; its retained `/usr/bin/time -p` record reports `0.41` seconds. Output is retained at `.local-data/braid-program/2-braid-2026-09-14/endpoint-lift-control.stdout.jsonl`. The coupled-inertial-lift limitation remains explicit in that output.

**Measured result:** the half-step prefix comparison returns `completed` at `1.3999999999999959`, with 228 accepted prefix steps, 32 accepted continuation steps, zero rejected continuation steps, and passing atomic-state checks. The supervised run took `37.849` seconds and exited zero under lease `d0613e7e-606d-4598-9d31-664d4185b892`; the process group is closed. Both cross roots use `mpfr_directed_interval` at 128 bits with one root and a root-free complement. Their common emission interval is

`[0.822261169396923775832423437317751514837177, 0.822269337233113073748318933996447819725022]`.

Its width is approximately `8.1678361893e-6`, below the unchanged `1e-5` tolerance. The ordinary MPFR route suffices at this endpoint: joint-error cancellation is not required for these two accepted root rows. The positive-path endpoint position interval is `[0.17785991873050488, 0.17786512739778035]` and its x-velocity interval is `[-0.57962183961385416, -0.57959594372459755]`; the other path has the reflected intervals. These are recorded endpoint enclosures, not a classification of the complete encounter.

The comparison establishes that a finer earlier construction clears the specific numerical barrier. It does not isolate which prefix step contributes most, prove a global error theorem for the integrator, or establish that arbitrarily repeated refinement will complete the encounter. The baseline and same-prefix lift rejection remain valid results for their different numerical constructions.

## Reproduction and retained evidence

Raw output copies are retained under `.local-data/braid-program/2-braid-2026-09-14/` as `baseline.json`, `controller-same-prefix.json` and `controller-half-prefix.json`. The independently authored control source is retained there as `endpoint-lift-control.cpp`, SHA-256 `1662c14f67ca3dd5bfa8e5368d7ba13b7883b233e82ba19be21b0da6c9c02556`. It was copied without changing its reference equations or assertions; restore it to `.tmp/2-braid/endpoint-lift-control.cpp` before recompilation because its include path assumes that scratch location. The selected solver source/header hashes are retained in `solver-source-sha256.txt` as reproduction provenance, not an admission gate. The numerical runs preceded the final observer-only snapshot-selection fix described below.

Build and run each selected numerical comparison separately under its declared limit:

```bash
cmake -S src/eom -B .tmp/2-braid/build -DCMAKE_BUILD_TYPE=Release
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 120 --heartbeat-seconds 15 -- cmake --build .tmp/2-braid/build --target eom_stationary_joint_frontier_fixture_cli eom_native_fixture_cli --parallel 4
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 300 --heartbeat-seconds 15 -- .tmp/2-braid/build/eom_stationary_joint_frontier_fixture_cli
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 300 --heartbeat-seconds 15 -- .tmp/2-braid/build/eom_stationary_joint_frontier_fixture_cli --controller-continuation 1.3999999999999959
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 300 --heartbeat-seconds 15 -- .tmp/2-braid/build/eom_stationary_joint_frontier_fixture_cli --controller-continuation 1.3999999999999959 --prefix-step-scale 0.5
```

The default fixture returns zero when the historical accepted frontier and expected next rejection both hold. The controller diagnostic returns zero on requested-end completion and atomic-state agreement, or `2` for a halt. Thus the same-prefix controller's exit `2` is the expected negative experimental result, not evidence of an unsupervised crash.

The independently authored control compiles against the built library without changing the reference implementation:

```bash
/usr/bin/c++ -std=c++20 -O2 -I src/eom/include .tmp/2-braid/endpoint-lift-control.cpp .tmp/2-braid/build/libeom_native.a /opt/homebrew/lib/libmpfr.dylib /opt/homebrew/lib/libgmp.dylib -o .tmp/2-braid/endpoint-lift-control
/usr/bin/time -p .tmp/2-braid/endpoint-lift-control
```

Independent review found that the initial diagnostic selected only the last corrected endpoint snapshot for a rejected step. A failure in final history recertification could therefore be reported using an earlier successful root snapshot. The observer now selects the actual failed recertification, start or endpoint snapshot, and reports its stage and reception time; a non-root failure with no failed acceleration snapshot reports that absence explicitly. This correction changes reporting only. The measured same-prefix experiment had failed endpoint rows, and the refined comparison had no rejected step, so their reported root dispositions are unaffected.

## Final verification and disposition

The separately authored `rejection-snapshot-control.cpp` declares its expected records before execution and passes four synthetic cases: failed final recertification over an earlier successful endpoint; failed endpoint over successful start; failed start without an endpoint; and no failed snapshot. It checks record identity, stage and reception time, with `/usr/bin/time -p` reporting `0.35` seconds. Source, stdout and timing are retained in the same local evidence directory. This is an observer test; it runs no evolution and leaves the original endpoint-lift reference unchanged.

The final Release rebuild completed in `1.73` seconds under lease `cfdadc1c-5f8f-4c16-905b-03361973ecc6`. The no-argument fixture then passed in `33.19` seconds under lease `c64b0c27-a220-47af-baf0-c04ed5c55cb3`; `cmp` finds its stdout byte-identical to the initial current baseline. This verifies preservation of the original fixture's result and rejected-boundary assertions after the diagnostic additions. The final diagnostic source SHA-256 is `1c987b70af5b11a1a464bca66375aeb771c8c3659399eb1c88119dc703637ed5`, recorded as provenance only.

Scoped `git diff --check` passes for the fixture and Braid lane. `git diff --stat -- src/eom/src src/eom/include tests/test_eom_native_history_layer.py scripts/eom/oracle` is empty: the production library and those existing independent references were not changed. The lane's current strategy, BP-001/BP-003 blockers and work log link this result while preserving global rankings and concurrent edits. Supervisor `closeout --owner-task "$CODEX_SESSION_ID"` returns `clear`. No broad suite, fate campaign or Git publication ran.

The bounded diagnosis is complete: the historical obstruction is reproduced, endpoint lifting alone is rejected as an adequate remedy, and one genuinely finer history construction clears the exact endpoint. The remaining immediate implementation gap is the lifted-inertial exact-zero representation rejection. Its correction must preserve outward enclosure and the exact empty-root acceleration reference; a tolerance exception would not resolve it. Full interacting-evolution validation and event-directed continuation remain separate scientific obligations.

## Remaining classification requirements

A continuation result must still reach the complete close approach or another declared event needed to distinguish the binary's behavior. It must retain all applicable partner/self roots and law-domain stops, and satisfy independent evolution and refinement checks appropriate to the conclusion. A longer finite accepted prefix is not permanent binding, breathing, full Campaign 1 readiness or theory closure. A differing fresh fixed-control result would supersede this measured frontier; a valid tighter history construction may change the numerical obstruction without changing the law.
