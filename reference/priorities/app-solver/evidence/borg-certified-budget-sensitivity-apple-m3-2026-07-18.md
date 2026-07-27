# Borg Certified-Budget Sensitivity — Apple M3 — 2026-07-18

This is the pre-ratification V6 measurement record. Amendment 2 was later
ratified and implemented in V7; the current implementation disposition is in
[the V7 validation record](borg-certified-budget-v7-implementation-validation-apple-m3-2026-07-18.md).

## Status And Adjudication

- Evidence id: `borg_certified_budget_sensitivity/apple-m3/2026-07-18`
- Protocol measured: `EOM_BORG_NATIVE_V6`
- Binding state: Amendment 2 is proposed and not ratified.
- Close-encounter impulse and position-moment budgets: unchanged at `1e-7`.
- Frozen binding edited: no.
- Preset registry, request schema, response provenance, Borg default, and UI changed: no.

The current live allocation is the proposed `Research certified budget`. The
only ordinary tolerance with a repeatable performance effect was receiver
acceleration: changing `0.1` to `0.3` raised the four-seed six-path mean wall
rate from `7.60` to `10.66` simulated seconds per wall second. The speedup came
with a certification-accounting defect: the current published position and
velocity radii do not carry the admitted acceleration allowance. Therefore the
`0.3` candidate is the provisional `Interactive certified budget` only after
that propagation defect is fixed, Amendment 2 is ratified, and independent
controls pass. It has no current run authority.

Claim grade: `measured` for the timing and interval comparison; `inferred` for
the mechanism attribution to added far-field enclosure. Falsifier: repeat the
four-seed sweep and obtain no acceleration-only rate change, or show that the
current published state radii already contain the complete acceleration-derived
position and velocity increments.

## Ledger And Proposed Presets

The dimensional derivation and every remainder slice are in
[the certified error-budget ledger](../contracts/certified-error-budget-ledger.md). The
pending authority change is in
the ratified run-selected certified-budget decision.

| Allocation | Interactive certified budget proposal | Research certified budget proposal |
| --- | ---: | ---: |
| top-level position increment $B_x$ | `2e-2` | `2e-2` |
| top-level velocity increment $B_v$ | `4e-2` | `3e-2` |
| root-time enclosure | `1e-3` | `1e-3` |
| receiver acceleration enclosure | `3e-1` | `1e-1` |
| far-field receiver fraction | `0.25` | `0.25` |
| correction acceleration residual | `1e-1` | `1e-1` |
| accepted-step position allowance | `1e-2` | `1e-2` |
| accepted-step velocity allowance | `1e-2` | `1e-2` |
| receiver-total event impulse | `1e-6` | `1e-7` |
| receiver-total event position moment | `1e-6` | `1e-7` |
| independent common-domain overlap allowance | `0` | `0` |
| causal width / core scale | `0.2 / 0.2` | `0.2 / 0.2` |
| regulator ratio / levels | `0.5 / 3` | `0.5 / 3` |
| source-normal floor | `1e-30` | `1e-30` |
| ordinary precision | outward binary64 | outward binary64 |
| difficult-row precision | `128–512` bits | `128–512` bits |
| reduction | fixed pairwise | fixed pairwise |

Common-domain overlap has no independent numerical budget. Its numerical and
Amendment 1 regulator-matching remainders are charged inside the impulse and
position-moment rows. A separate overlap number would spend the same remainder
twice.

Claim grade: `derived`. Falsifier: a valid common-domain proof requires a
remainder that cannot be charged to either impulse or position moment, or either
one-step ledger sum exceeds its displayed top-level bound.

## Live State Reverification

Current source still sets 3 electrinos plus 3 positrinos, zero initial velocity,
radius `0.5`, coupling `0.0005`, minimum step `0.0001`, maximum step `0.05`,
far-field fraction `0.25`, and the ordinary controls `1e-3`, `1e-1`, `1e-2`,
`1e-2`, `1e-1`. The native Borg request still fixes both event tolerances at
`1e-7`, and the producer and parser both identify V6.

Claim grade: `measured-current-tree`. Falsifier: the cited call-site inventory
below contains a different value or protocol token.

## Six-Path Tolerance-Performance Matrix

Each row contains four deterministic seeds, four `0.3` chunks per seed, and
`T=1.2`. All rows completed all four seeds with 96 accepted and zero rejected
steps. Median is the mean of the four per-run chunk medians; p95 and maximum are
the worst per-run values. Phase seconds are totals over the four seeds and are
nested, not additive.

| Rung | root / accel / pos / vel / corr | Mean rate | Chunk median / p95 / max (s) | root cells / warm | root / correction / history-window / copy / accel (s) | Allocation hash |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| Research reference | `.001/.1/.01/.01/.1` | `7.52` | `.04009/.05232/.05232` | `77,714/77,714` | `.1328/.5310/.03382/.1654/.05091` | `9fd34891bef427a9be1825677c30b506af728de2cb9b2087c7ff21b548a686b8` |
| current baseline | `.001/.1/.01/.01/.1` | `7.60` | `.03987/.05273/.05273` | `77,714/77,714` | `.1299/.5251/.03375/.1641/.04944` | `9fd34891bef427a9be1825677c30b506af728de2cb9b2087c7ff21b548a686b8` |
| root `3x` | `.003/.1/.01/.01/.1` | `7.63` | `.03973/.05281/.05281` | `77,714/77,714` | `.1272/.5227/.03373/.1634/.04976` | `8aebc9eb4bc4a03257d2f7dc948a6ed83e71ed3f61bb4c64b47b40a4ba49f2a2` |
| acceleration `3x` | `.001/.3/.01/.01/.1` | `10.66` | `.02810/.04096/.04096` | `61,378/2,580` | `.04604/.3758/.03078/.09332/.04574` | `eb3a4c22e4d1504b1a2d4a702663cf61159afa51a18cd5fee682cdcb2a7e8c98` |
| position `3x` | `.001/.1/.03/.01/.1` | `7.61` | `.03975/.05249/.05249` | `77,714/77,714` | `.1295/.5247/.03367/.1646/.04958` | `a8c6cf17314f5568eb88402a0914bd917505a387dcc99daaf3282b687f9575b0` |
| velocity `3x` | `.001/.1/.01/.03/.1` | `7.61` | `.03985/.05235/.05235` | `77,714/77,714` | `.1296/.5237/.03379/.1643/.04952` | `40e9cddeaea979c48c41bd202e855a8fb93d123ac395d36db30bb87108088c23` |
| correction `3x` | `.001/.1/.01/.01/.3` | `7.56` | `.04009/.05358/.05358` | `77,714/77,714` | `.1309/.5283/.03402/.1646/.04976` | `2e1a3fde46236784950b4f5f36313e144233bf0489efdf329cd4978db31464d5` |
| combined `3x` | `.003/.3/.03/.03/.3` | `10.72` | `.02791/.04066/.04066` | `61,378/2,580` | `.04562/.3735/.03056/.09286/.04641` | `cc905d4130d82e5dac53eb1bc43c2d19d83851ff793170a2b8ed7bd1088d1fc9` |
| combined `10x` | `.01/1/.1/.1/1` | `11.02` | `.02712/.03671/.03671` | `60,504/0` | `.04195/.3627/.03035/.08664/.04522` | `1a4a97bb742bf6e2bc378fbd0a284a42df261ef0ef72b0adce080a2675f24adc` |
| combined `30x` | `.03/3/.3/.3/3` | `11.08` | `.02699/.03659/.03659` | `60,504/0` | `.04194/.3608/.03001/.08667/.04458` | `e827f560cd85e58112c29c86b7b0153384bf03da56bd09610cd9e2dc02d537e5` |

The OAT result is decisive: position, velocity, correction, and root `3x` do
not change the executed mechanism and their small timing differences are host
scatter. Acceleration `3x` changes the far-field route, reduces exact-root
work, and accounts for essentially all combined-rung gain. The `10x` and `30x`
combined rows are sensitivity diagnostics, not admissible preset selections.

Claim grade: `measured` for the table; `inferred` for the far-field mechanism
because enclosure and root-work counts changed together. Falsifier: repeat the
OAT matrix and observe a state/correction/root-only mechanism change or an
acceleration speedup without the enclosure/root-work change.

## Per-Seed Survival And Halt Rows

| Control | seed | accepted time | terminal outcome | accepted / rejected | native wall (s) |
| --- | ---: | ---: | --- | ---: | ---: |
| Research reference | 0 | `1.2` | completed | `24/0` | `0.173` |
| Research reference | 1 | `1.2` | completed | `24/0` | `0.157` |
| Research reference | 2 | `1.2` | completed | `24/0` | `0.147` |
| Research reference | 3 | `1.2` | completed | `24/0` | `0.163` |
| acceleration `3x` | 0 | `1.2` | completed | `24/0` | `0.110` |
| acceleration `3x` | 1 | `1.2` | completed | `24/0` | `0.109` |
| acceleration `3x` | 2 | `1.2` | completed | `24/0` | `0.108` |
| acceleration `3x` | 3 | `1.2` | completed | `24/0` | `0.124` |
| strict-state negative | 0 | `1.2` | completed | `24/0` | `0.539` |
| strict-state negative | 1 | `1.2` | completed | `24/0` | `0.460` |
| strict-state negative | 2 | `1.2` | completed | `24/0` | `0.152` |
| strict-state negative | 3 | `0.375` | `minimum_step_exhausted`; terminal `numeric_step_budget_exceeded` | `10/11` | `78.607` |
| root/history halt | 0 | `0.1888671875` | `insufficient_history_depth` | `8/10` | `2.565` |
| finite-width control | 0 | `0.01015625` | terminal `numeric_step_budget_exceeded`; first large attempt hit `event_impulse_cell_limit_exhausted` | `5/6` | `34.825` |

The recorded operator `T=6.3` seed is not recoverable from the current tree:
the repository search found no matching seed, checkpoint, or accepted-end
record. It was not guessed or substituted.

Claim grade: `measured`. Falsifier: the JSON artifacts from the exact commands
below contain different status, accepted time, or step counts; or a repository
artifact names the missing `T=6.3` seed.

## Phase Timing And Population Scaling

The timers overlap. For example, correction contains root, history, event, and
other nested phases; rejected-candidate time can contain the entire regulator
ladder. Percentages below use native wall time as a common denominator and must
not be summed.

| Control | correction | root batch | copy/hash | acceleration | regulator ladder | rejected candidate |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| six-path Research/current ordinary aggregate | about `83%` | about `20%` | about `26%` | about `8%` | `0%` | `0%` |
| six-path acceleration `3x` aggregate | about `83%` | about `10%` | about `21%` | about `10%` | `0%` | `0%` |
| finite-width control | `99.99%` | `0.40%` | `0.04%` | `0.02%` | `99.46%` | `99.79%` |
| strict-state seed-3 negative | `99.99%` | `0.05%` | `0.05%` | `0.03%` | `99.32%` | `99.92%` |

The instrumented finite-width control measured `34.6358 s` in its regulator
ladder, `0.0200 s` in common-domain matching, `538,080` event cells across 36
level evaluations, and `34.7498 s` inside rejected-candidate work. Its maximum
emitted impulse width was `9.97774e-8`; maximum position-moment width was
`8.86206e-8`. The first event pair was `1004 <- 1005` on the attempted
`[0.01,0.0125]` window. Smaller windows produced three certified-complete state
records with common-domain overlap and exit passes before the eventual
not advanced terminal step.

Claim grade: `measured`. Falsifier: the regulator timer no longer encloses the
event-ladder calls or a repeated finite-width run assigns the wall time to a
different phase outside host-load variation.

| Population | baseline rate | acceleration `3x` rate | speed ratio | baseline / candidate root cells | baseline / candidate enclosed pairs |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 6 | `9.70` | `15.54` | `1.60x` | `2,290 / 1,194` | `18 / 30` |
| 16 | `1.55` | `2.21` | `1.42x` | `22,402 / 9,844` | `30 / 168` |
| 32 | `0.374` | `0.409` | `1.09x` | `97,979 / 82,055` | `0 / 172` |
| 64 | `0.0925` | `0.0933` | `1.01x` | `384,336 / 383,294` | `0 / 8` |

At 32 and 64 paths, the candidate remains dominated by the corrected substep
and exact-root path. Tolerance selection does not solve the population-scaling
bottleneck. That conclusion is measured from wall time; the cell counts only
identify the correlated mechanism.

## Accuracy And Interval Comparison

At seed 0 and common `T=1.2`:

| Candidate against Research reference | max position delta | max velocity delta | max position radius, reference / candidate | max velocity radius, reference / candidate | intervals overlap | visibly similar |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| Research reference | `0` | `0` | `1.519e-9 / 1.519e-9` | `6.030e-8 / 6.030e-8` | yes | yes |
| acceleration `3x` | `4.784e-3` | `8.027e-3` | `1.519e-9 / 1.599e-14` | `6.030e-8 / 2.225e-308` | no | no |

The acceleration candidate passed its current local certificate rows, but the
two emitted state intervals are disjoint and the candidate radius is smaller,
not larger. The derived complete Interactive ledger would allow at least
`0.010501` position and `0.030001` velocity per accepted step before other
remainders, so the trajectory delta is not evidence that the underlying EOM
solution is wrong. It is evidence that the current emitted segment radius is
not the complete declared top-level budget. No budget was widened to hide the
disjoint intervals.

The smooth and tolerance sweeps are same-engine sensitivity controls. They are
not independent correctness evidence. The Decimal oracle was neither modified
nor claimed as executed here. No close-encounter impulse or moment comparison
against the unchanged oracle was possible before run-selected event budgets
exist; that control remains an acceptance gate after ratification.

Claim grades: current-row acceptance is `measured`; interval disjointness is
`measured`; the state-propagation diagnosis is `inferred` from the declared
ledger and emitted radii. Falsifier: an independent interval reconstruction
shows the candidate state radius includes the acceleration contribution and
the reported disjointness came from the profiler rather than the EOM output.

## Selected Interactive Proposal And Remaining Bottlenecks

The selected proposal is acceleration `0.3` with all current ordinary controls
otherwise unchanged, receiver-total event budgets `1e-6`, top-level
`B_x=0.02`, and `B_v=0.04`. It is selected because acceleration was the only
OAT field with measured gain and because `3x` captured nearly all of the gain
available at `10x` and `30x`. It is not authorized or implemented.

The authorization blockers are:

1. operator ratification of Amendment 2;
2. complete state-radius propagation of acceleration, correction, event,
   retained-history, interpolation, rounding, and shortcut remainders;
3. explicit run-selected event budgets and receiver-total allocation checks;
4. unchanged-oracle or analytic containment plus deliberate under-budget
   rejection for both selectable event budgets;
5. Research parity on the recorded finite-width control;
6. one forward protocol revision, registry, provenance, and UI change after
   those mathematical gates pass.

The measured non-tolerance bottlenecks are the nested correction/root path at
32 and 64 paths and the event regulator ladder on finite-width failures.
Tolerance-independent throughput optimization remains out of scope for this
packet.

Claim grade: `inferred-selection` from the measured matrix. Falsifier: the
propagation fix eliminates the acceleration gain, independent containment
fails, or another admissible OAT field produces a larger repeatable gain.

## Touched Call-Site And Protocol Inventory

- `src/apps/borg/BorgInteractiveDefaults.js`: live coupling, far-field,
  population, and placement defaults; inspected, unchanged.
- `src/apps/borg/BorgBootstrap.js`: live ordinary Borg controls and step range;
  inspected, unchanged.
- `src/apps/borg/BorgEomShadowRunner.js`: constructs the V6 control request and
  merges published histories; inspected, unchanged.
- `scripts/eom/BorgNativeEomProcessClient.mjs`: V6 producer and exact ordered
  control fields; inspected, unchanged.
- `src/eom/native/eom_borg_shadow_cli.cpp`: V6 parser, fixed event budgets, and
  response serialization; only existing timing fields plus the two new
  profiling timers were forwarded.
- `src/eom/include/architrino/eom/CoupledEvolution.hpp`: event defaults remain
  `1e-7`; timing records gained regulator-ladder and common-domain wall fields.
- `src/eom/src/CoupledEvolution.cpp`: numerical semantics unchanged; timers now
  surround existing regulator and common-domain calls and aggregate them.
- `scripts/eom/profile-borg-incremental-chunks.mjs`: now accepts coherent
  candidate controls, emits complete allocation provenance and stable SHA-256,
  reports separate position/velocity radii, controller tracks, event-cell
  counts, existing timing fields, and non-additive shares.
- `scripts/eom/profile-borg-certified-budget-sweep.mjs`: deterministic seed,
  population, OAT, combined-rung, Research-reference, and comparison driver.
- `master-eom-binding-v0.md`: untouched.
- Protocol field count: unchanged V6 20-field `RUN`; no producer, parser, or
  fixture format changed.

Claim grade: `measured-current-tree`. Falsifier: `git diff` or the cited files
show a semantic, protocol, event-budget, default, or UI change not listed here.

## Ready Implementation Prompt After Ratification

Use this only after the operator explicitly ratifies Amendment 2:

```text
Closure goal: implement the ratified two-preset certified error-budget contract end to end while preserving the EOM publication policy—verification required for advancement—and proving independent containment for both event budgets.

Operator decision: Amendment 2 and the proposed Interactive and Research records in reference/priorities/app-solver/contracts/certified-error-budget-ledger.md are ratified. Treat that ledger and the ratified amendment as binding input.

Implement one canonical budget registry; make Borg default to Interactive certified budget; add the plain-language selector and Custom certified budget advanced path; validate the complete dimensional ledger; propagate every acceleration, correction, event, retained-history, interpolation, rounding, and shortcut remainder into published position and velocity intervals; carry receiver-total impulse and position-moment budgets explicitly; preserve zero independent overlap allowance; record the complete allocation and deterministic hash in request and response provenance; advance V6 once with one exact producer and parser and no compatibility route; update every fixture and call site; keep all FWC gates, Amendment 1 matching, outward rounding, sharp-chart prohibitions, atomic publication, and behavior for a Not advanced disposition unchanged.

Do not modify the Decimal oracle. Add unchanged-oracle or analytic containment for each selectable event budget, deliberate under-budget rejection, Research parity on the recorded finite-width control, and Interactive seed/population acceptance. Stop if emitted state intervals remain disjoint beyond their complete declared remainders.
```

## Validation And Exact Commands

The binary timestamp was `2026-07-18 01:23:32 -0400`. The last C++ source/header
change was `2026-07-18 01:21:48 -0400`, so the measured binary was newer than
every compiled source change. The profiler scripts changed later but do not
enter the binary. Build and source times must be rechecked before any future
measurement. This campaign used:

```sh
cmake --build .tmp/eom-native-dev --target eom_borg_shadow_cli -j 8
ctest --test-dir .tmp/eom-native-dev --output-on-failure
node --test tests/borg-eom-migration.test.js \
  tests/borg-eom-runtime-contract.test.js
node --check scripts/eom/profile-borg-incremental-chunks.mjs
node --check scripts/eom/profile-borg-certified-budget-sweep.mjs
git diff --check

node scripts/eom/profile-borg-certified-budget-sweep.mjs \
  .tmp/eom-native-dev/eom_borg_shadow_cli \
  --seeds=0,1,2,3 --populations=6 --chunks=4 \
  > /tmp/borg-budget-sweep-n6-final3.json \
  2> /tmp/borg-budget-sweep-n6-final3.log

node scripts/eom/profile-borg-certified-budget-sweep.mjs \
  .tmp/eom-native-dev/eom_borg_shadow_cli \
  --seeds=0 --populations=6,16,32,64 --chunks=1 \
  --rungs=baseline,acceleration-3x,combined-3x \
  > /tmp/borg-budget-sweep-populations-final.json \
  2> /tmp/borg-budget-sweep-populations-final.log

node scripts/eom/profile-borg-certified-budget-sweep.mjs \
  .tmp/eom-native-dev/eom_borg_shadow_cli \
  --seeds=0 --populations=6 --chunks=4 \
  --rungs=research-reference,acceleration-3x \
  > /tmp/borg-budget-accuracy-seed0-final3.json \
  2> /tmp/borg-budget-accuracy-seed0-final3.log

node scripts/eom/profile-borg-incremental-chunks.mjs \
  .tmp/eom-native-dev/eom_borg_shadow_cli \
  --chunks=7 --seed=0 --chunk-duration=0.05 \
  --initial-step=.0025 --minimum-step=.0001 --maximum-step=.0025 \
  --adaptive-growth=false --coupling=.05 --root-tolerance=1e-8 \
  --position-tolerance=1e-8 --velocity-tolerance=1e-8 \
  --maximum-mpfr-bits=2048 --event-max-cells=200000 \
  --far-field-enclosure-fraction=0 --summary-only=true \
  --state-summary=true --budget-id=recorded-fwc-current-fixed-budget \
  > /tmp/borg-budget-fwc-control-final.json \
  2> /tmp/borg-budget-fwc-control-final.log

node scripts/eom/profile-borg-incremental-chunks.mjs \
  .tmp/eom-native-dev/eom_borg_shadow_cli \
  --chunks=1 --seed=0 --chunk-duration=0.3 --history-depth=0.1 \
  --summary-only=true --budget-id=root-history-halt-control \
  > /tmp/borg-budget-root-halt-final.json \
  2> /tmp/borg-budget-root-halt-final.log
```

The strict-state negative came from the same four-seed driver with
`--rungs=strict-state-negative`. The separate header-default negative used
`root=1e-12`, `acceleration=1e-9`, and
`position=velocity=correction=1e-8`; it halted on `FWC-STATE-01` at
`T=0.007593126992950852` after `343.813 s` and is not a preset candidate.

Validation status at packet close: build passed; all three configured native
fixtures passed; 33 targeted Borg migration/runtime/protocol tests passed; both
JavaScript syntax checks passed; `git diff --check` passed. The independent
Decimal oracle and full pre-commit suite were not run because the
ratification-gated implementation was not performed and the oracle was not
changed. The measurement artifacts remain in `/tmp` and are not durable
repository evidence; the tables above are their durable summary.

Claim grade: `measured`. Falsifier: rerunning the commands fails syntax/build,
changes the named terminal rows materially, or a full suite later exposes a
regression in the profiling-only changes.
