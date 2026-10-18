# Ordinary Integration, Gate O1: Scratch Candidate Receipt

This is the O1 candidate under the [O0 review and O1 scratch release](../analysis/matched-pair-review-ordinary-stage-0-2026-10-14.md): the ordinary typed evolution entry point, `evolve_native_coupled_histories`, can now run the accepted validated far-step driver when the caller selects it. It is a scratch candidate. Live `src/eom` is unchanged: its 93 files still match the [O0 baseline inventory](matched-pair-ordinary-stage-0-baseline-receipt-2026-10-14.md) by `shasum -a 256 -c`, observed at 10:34Z. Every instance uses $c_f=1$.

The evidence directory [matched-pair-ordinary-stage-1/](matched-pair-ordinary-stage-1/) holds the two new sources, the [whole library change against live](matched-pair-ordinary-stage-1/live-to-o1-library.diff), the fixture, the checker, the default-output comparison, the field-disposition tool, the build and run scripts, and their outputs. The scratch tree is `.tmp/eom-ordinary-integration-2026-10-14/o1-tree/src/eom`, inventoried in [scratch-o1-source-inventory.sha256](matched-pair-ordinary-stage-1/scratch-o1-source-inventory.sha256). Raw fixture outputs are under `.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o1-scratch/`.

## What changed

Seven files, against live preimages that equal the O0 inventory:

| File | Change |
| --- | --- |
| `CoupledEvolution.hpp` | Selection constant `kOrdinaryIntegrationSelection = "ordinary"`; struct `NativeValidatedExecution` with the driver's own controls at the driver's defaults; request fields `integration_method` (default `"ordinary"`) and `validated`; certificate members `validated_run` (the driver's full certificate) and `validated_continuation`; two declarations |
| `CoupledEvolution.cpp` | Bridge header include. At the evolution entry: the selection check, then for the validated method the named control refusal and the reusable-start-snapshot refusal, then the existing matched-pair check and `validate_request` unchanged, then dispatch. The atomic-step and snapshot entries refuse the selection first. The ordinary body is untouched |
| `ValidatedOrdinaryBridge.hpp`, `.cpp` (new) | The sealed `NativeValidatedContinuation`, control refusal, translation, growth estimate and the bridge run |
| `Checkpoint.cpp` | v7 create and resume refuse the selection, one line each |
| `ProviderTransport.cpp` | v8 create and resume refuse the selection, one line each. **This is a shared seam the O0 order placed in O2; the two lines are here so that no checkpoint path can silently take a validated run. I ask that the live O1 application include them explicitly, or that I drop them until O2.** |
| `CMakeLists.txt` | The new source, and the focused fixture target with no recurring-suite enrollment |

No accepted producer, driver, record, worker or snapshot source changed. No Surface-owned file was read for writing or written. The concurrent Surface session has `src/apps/surface/surface.css` modified at 10:34Z; it was left alone.

## Translation, as resolved for the review's conditions

**Selection.** `integration_method` admits only `"ordinary"` and the accepted policy token. Any other value, including empty, is refused `unsupported_execution_policy`. Under `"ordinary"`, any non-default member of `validated` is refused before any work. Selection is checked first in every public entry that takes the request.

**Admission order.** The validated method passes, in order: the named refusal of every unconsumed control; refusal of a supplied reusable start snapshot; the existing matched-pair check; the whole ordinary `validate_request`; the bridge's memory admission; then the driver's own admission before any of its early returns. The ordinary admission is not bypassed. It narrows the driver's domain in two places. A coupling of zero is refused, because ordinary admission requires a positive coupling. A zero-length invocation is refused, so resuming at an already-completed boundary is refused rather than returned as an empty run.

**Every ordinary field.** [field-dispositions.txt](matched-pair-ordinary-stage-1/field-dispositions.txt) is produced mechanically from the scratch header and bridge source. It covers all 103 request fields:

- 18 are translated.
- 4 are checked: `maximum_step`, the two restart counters and `equation_selection`.
- 81 are refused unless at their default, each by name.

That covers the joint, event, chart, far-field, snapshot-grouping, tolerance, budget-provenance, precision, adaptive, multirate, quarter-step, cost-feedback, traversal, diagnostic-candidate, adjudication, failed-substep-callback, Surface and continuation-carrier fields. A field with no disposition makes the tool fail. Its known case is a field removed from the bridge text.

**Counters and callbacks.** These are derived from the code and measured by the fixture:

| Ordinary field or behaviour | Validated method |
| --- | --- |
| `accepted_step_count`, `rejected_step_count` | Cumulative since the run's origin: the continuation's counts plus this invocation's |
| `initial_accepted_step_count`, `initial_rejected_step_count` | Not trusted. Each must equal the supplied continuation's count, or zero with no continuation; anything else is refused by name |
| Cumulative rejected count across invocations | Carried by the new sealed `NativeValidatedContinuation`, which wraps the driver's sealed continuation. Only the bridge can construct one (compile-time assertions in the fixture), so in this process it is always a state a run actually reached |
| `steps[i].step_index` | The cumulative attempt ordinal, as the ordinary controller numbers attempts. The driver's own certificate in `validated_run` keeps its accepted-step ordinal, unchanged |
| `accepted_step_callback` | Wrapped. The driver passes a zero-based ordinal; the ordinary callback receives the cumulative accepted-step count after the step, including the resumed base. The driver is unchanged |
| `status` | `completed`, or `halted`. The driver's `cancelled` becomes `halted` with `cancelled_at_accepted_boundary` |
| `diagnostic_maximum_accepted_steps` | Positive: the driver's per-invocation accepted-step limit, reported as `diagnostic_accepted_step_limit_reached`. Zero: no diagnostic cap, but the driver's own per-invocation ceiling of 1,000,000 accepted steps remains and halts as `step_limit_exhausted`. This is documented in the bridge header, not called unlimited |
| `maximum_step` | Empty is the ordinary convention for "equal to the initial step"; an explicit value is admitted only if exactly equal to it, because the validated controller never grows past its initial step |
| `controller_certificate_cost_cooldown_remaining`, `controller_consecutive_growth_headroom_steps` | Zero: those ordinary controllers are refused under the method |
| `schema`, `evidence_status`, other halt codes | The driver's, so no consumer sees the ordinary evidence grade on a validated run |

**Memory.** The ordinary estimate of the supplied population is computed by the existing estimator and kept. The bridge adds:

- the population's evidence and ledger;
- the growth this invocation can reach, which is every retained attempt's producer certificate plus two copies of the published histories, each up to the supplied segments plus one per reachable step.

The reachable steps are bounded by the span divided by the minimum step and by the accepted-step limit; attempts are bounded by the per-step attempt limit. **This is an admission estimate, not a measured resident-set bound, and it is loose.** For the receding-source case, with span 3 and minimum step $10^{-4}$, it is about $7.2\times10^{14}$ bytes. That is harmless under the ordinary default budget, which is the largest 64-bit value, but any realistic finite budget would refuse such a run. A wire default must not be set in O3 without deciding this.

Over budget, the bridge still runs the driver's zero-length admission:

- A population the driver refuses is reported as that refusal.
- An admitted one returns `halted` with `memory_budget_exhausted`, the input histories, its counters unchanged, and no validated run or continuation.

## Results

**Build.** CMake Release, two build workers, under the owned-compute supervisor, exit 0, no compiler warning or error. Library `libeom_native.a` SHA-256 `2a5bf02454a8599201acb0a5ebd3d8efa8d50a570f4919e92e41490ce8ff791c`; fixture `7e6ca71dc6a483e03cfecce2943257ae066f4e8b1a3f857141178bbead337ea5`.

**Fixture and checker.** The O1 fixture writes each validated run reached through the ordinary entry twice:

- in the accepted Stage 3 row format, from the driver certificate the entry returned;
- as one row of the ordinary view, with the counts and callbacks an ordinary caller observed.

The row-format helpers are copied unchanged from the accepted evolution fixture. The checker imports the accepted increment 4 version 2 checker unchanged and runs its known cases first. It then runs its own known cases: the ordinary controller's own row must satisfy every ordinary-view predicate, and zero-based ordinals must fail the callback predicate.

| Check | Result |
| --- | --- |
| [O1 checker](matched-pair-ordinary-stage-1/o1-check-output.txt) | 58 of 58 assertions, exit 0; known cases first |
| Accepted known cases, unchanged checker | exact halving and difference; closed-form static brackets; the reviewer's frozen three-path brackets at $t=1/128, 1/64, 1/32$ |
| Accepted bookkeeping over 26 ordinary-entry runs, 559 attempts | 22 admitted runs: exact time, atomic shape, whole-step slack by exact Bernstein coefficients, ledger, debit over 5928 path-axis records, evidence and digest chains, continuation, returned boundary; 4 refused-admission runs return no accepted time, evidence, ledger or continuation |
| Frozen brackets through the ordinary entry | inside the tubes ungrouped, grouped, and grouped at $h=1/256$ |
| Grouping | grouped intervals on every grouped step, none without the declaration; ungrouped and grouped runs equal the direct driver row for row |
| Ordinary view, 26 runs | cumulative counts, attempt numbering, callback counts and times, status and halt mapping, continuation counters, published state |
| Resumption | cancelled at the second callback and resumed with a different worker count equals the uninterrupted run, callbacks 3 and 4; a run with 7 rejections before the cut and 35 after equals the uninterrupted 214 accepted, 42 rejected |
| Diagnostic limit | per invocation: 1, 1, then 2 to completion, equal to the uninterrupted run |
| Memory | budgets of one byte, the estimate minus one, and a resumed run at one byte halt with no step, run or continuation and counters unchanged; a budget equal to the estimate completes unchanged |
| Driver admission through the ordinary entry | evidence issued for another population is refused before cancellation and before the memory halt; a continuation whose declaration was removed is refused |
| Refusals | 35 ordinary-only controls by name; 16 malformed, nonpositive, overflowing or nonfinite budget tokens; unknown and empty selections; validated controls under the ordinary selection; 3 inconsistent restart counters; 5 ordinary admissions; 7 entry points (atomic, snapshot, reusable start snapshot, v7 create and resume, v8 create and resume) |
| Workers | one and four workers byte-identical, 9,367,125 bytes, SHA-256 `e1e51598…` |

**Default compatibility.** The [comparison instrument](matched-pair-ordinary-stage-1/compare-default-outputs.mjs) passes five known cases first:

- identity;
- a digest-only change is equal after projection;
- a changed numerical token is a difference;
- a changed legacy fingerprint is a difference;
- a named path holding a non-digest is a difference.

It then compares all 84 frozen baseline outputs with the same commands and wire envelopes on the O1 build ([result](matched-pair-ordinary-stage-1/default-comparison.txt)):

- **73 are byte-identical.** These include every validated, far-step, record, ordinary, acceleration, evolution, matched-pair, Surface, provider transport and equation provider output, and the three wire rejections.
- **11 are equal after removing only named build-identity paths.** These are the two capabilities documents, three inspections, three evolutions and their three checkpoint files. Every coefficient, radius, time, counter, `legacyModelFingerprint` and the v7 bytes inside v8 is unchanged.
- **None differ.**

`build.configurationDigest` did not change.

**One difference the baseline receipt did not name: `binding`** in the v8 checkpoint and in the response's checkpoint data. The source, `ProviderTransport.cpp:181`, computes it as SHA-256 over the encoded request, the resolved model (which embeds the build digests) and the legacy numerical fingerprint. It therefore changes with build identity, as `modelDigest` does. I did not recompute it independently. The instrument lists it separately as needing a path the receipt did not name. Under the review's rule it needs your reviewed explanation before acceptance.

## Observations for review

1. **Above wake speed.** A source moving at speed 2 passes the driver's population admission and is refused at its first step, `VFS-H1-01`, publishing nothing. Its cancelled-before-first-attempt and diagnostic-limit early returns therefore issue a continuation of the unchanged population, as the accepted driver does directly. Resuming it again refuses at the first step. I did not add a speed refusal to the bridge, because that would put a new admission rule outside the driver's accepted owner. If you read "decline before any accepted early return" to require one here, it belongs in the driver's admission, as a separate reviewed change.
2. **Accepted end on a refused admission.** The driver reports an empty `accepted_end_time` when it refuses an initial population. The ordinary view passes it through rather than inventing a time.
3. **Callbacks in the accepted-format rows** are recovered from the observed ordinary counts as count − 1, so the accepted checker's callback row runs on a derived value. The measured ordinary claim is the separate ordinary-view row.
4. **Independence.** The bridge, fixture, checker and comparison instrument are mine. The independent elements are the reviewer's frozen bracket file and the accepted checker, both read unchanged.

## Proposed live application, on your release

1. Re-observe each of the seven live files against the O0 inventory and the Surface session's status.
2. Apply each change with the file-edit tools from these scratch bytes.
3. Confirm `diff -rq` of live `src/eom` against the scratch tree is empty.
4. Build into a separate live build directory under the supervisor.
5. Rerun the O1 fixture, checker, default comparison and field dispositions on that build.
6. Add a live receipt.

**Falsifiers.** Any of these falsifies the candidate:

- a live file differing from the scratch tree after application;
- a checker row failing on the live build;
- a default output differing outside the named paths;
- a selected request that runs the ordinary controller, or an ordinary one that runs the driver;
- an ordinary-view counter that is local where cumulative is promised;
- a restart counter accepted without matching its continuation;
- a resource halt that returns a continuation;
- any edit to a Surface-owned file.
