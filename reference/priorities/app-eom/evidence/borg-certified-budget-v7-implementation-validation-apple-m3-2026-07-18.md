# Borg Certified-Budget V7 Implementation Validation — Apple M3 — 2026-07-18

## Disposition

- Evidence id: `borg_certified_budget_v7_implementation_validation/apple-m3/2026-07-18`
- Protocol: `EOM_BORG_NATIVE_V7`
- Binding: ratified
  the ratified run-selected certified-budget decision
- Preset schema: `borg_certified_budget/v1`
- Implementation acceptance: `blocked-research-parity`

The V7 implementation is fail-closed and its independent controls pass, but it
does not pass the complete Amendment 2 acceptance gate. The reason is concrete:
publishing the acceleration-derived state width changes the retained-history
intervals, and the ratified Research preset no longer reproduces the historical
certified track. All four Research seeds now halt on root completeness before
the former `T=1.2` endpoint.

This is not evidence that the width propagation is wrong. The old V6 output
omitted that width. It is evidence that `Research certified budget` has not yet
been shown to be a drop-in parity record after correcting the output contract.
The implementation remains uncommitted and has no completed runtime-acceptance
claim.

Research remains the Borg default. Interactive is selectable for controlled
validation, but the explicit parity prerequisite withholds its requested default
authority until Research parity passes.

Claim grade: `measured-current-binary`. Falsifier: the exact V7 four-seed
command below reaches the historical Research endpoints while retaining the
corrected position and velocity radii and every fail-closed gate.

## Ratified Presets

Both presets are atomic contracts. The Borg UI does not expose the former
independent tolerance or step knobs.

| Allocation | Interactive certified budget | Research certified budget |
| --- | ---: | ---: |
| preset id | `interactive-certified-v1` | `research-certified-v1` |
| allocation SHA-256 | `11f005592d4636dec0cec8a062ce95ac7ab84bf51da36961fefcffa74705d33f` | `9fb413d991d7bc31457af7c062f32a3cacef94b6830a1cc8beb59227c9911b36` |
| $B_x$ / $B_v$ | `2e-2 / 4e-2` | `2e-2 / 3e-2` |
| root time | `1e-3` | `1e-3` |
| acceleration / far-field fraction | `3e-1 / 0.25` | `1e-1 / 0.25` |
| correction acceleration residual | `1e-1` | `1e-1` |
| step position / velocity | `1e-2 / 1e-2` | `1e-2 / 1e-2` |
| receiver event impulse / moment | `1e-6 / 1e-6` | `1e-7 / 1e-7` |
| independent overlap | `0` | `0` |
| $\eta_0$ / $\epsilon_{c,0}$ / ratio / levels | `0.2 / 0.2 / 0.5 / 3` | `0.2 / 0.2 / 0.5 / 3` |
| row fractions: quadrature / causal regulator / core regulator / state / matching | `0.35 / 0.15 / 0.15 / 0.15 / 0.20` | same |
| state subfractions: history / interpolation / rounding / shortcut | `0.04 / 0.04 / 0.02 / 0.05` | same |
| binary / difficult precision | outward binary64 / `128–512` bits | same |
| initial / minimum / maximum step | `0.05 / 0.0001 / 0.05` | same |
| reduction / receiver allocation | fixed pairwise / equal routed pair | same |
| root / quadrature / event cells | `500000 / 200000 / 200000` | same |
| correction iterations / attempts / rejected | `12 / 1000 / 100` | same |
| worker threads / request memory | `4 / 67108864` bytes | same |

Claim grade: `derived-ratified`. Falsifier: the canonical serialization hashes
to a different value, any request field differs from the selected allocation,
or either displayed top-level one-step inequality fails.

## Pre-Ratification Tolerance Matrix

The complete V6 sensitivity record is
[Borg Certified-Budget Sensitivity](borg-certified-budget-sensitivity-apple-m3-2026-07-18.md).
It used fixed `1e-7` event rows and established which ordinary control changed
cost before implementation.

| Rung | root / accel / pos / vel / corr | mean rate | root cells / warm | nested root / correction / copy (s) |
| --- | --- | ---: | ---: | ---: |
| Research reference | `.001/.1/.01/.01/.1` | `7.52` | `77,714/77,714` | `.1328/.5310/.1654` |
| current baseline | `.001/.1/.01/.01/.1` | `7.60` | `77,714/77,714` | `.1299/.5251/.1641` |
| root `3x` | `.003/.1/.01/.01/.1` | `7.63` | `77,714/77,714` | `.1272/.5227/.1634` |
| acceleration `3x` | `.001/.3/.01/.01/.1` | `10.66` | `61,378/2,580` | `.0460/.3758/.0933` |
| position `3x` | `.001/.1/.03/.01/.1` | `7.61` | `77,714/77,714` | `.1295/.5247/.1646` |
| velocity `3x` | `.001/.1/.01/.03/.1` | `7.61` | `77,714/77,714` | `.1296/.5237/.1643` |
| correction `3x` | `.001/.1/.01/.01/.3` | `7.56` | `77,714/77,714` | `.1309/.5283/.1646` |
| combined `3x` | `.003/.3/.03/.03/.3` | `10.72` | `61,378/2,580` | `.0456/.3735/.0929` |
| combined `10x` diagnostic | `.01/1/.1/.1/1` | `11.02` | `60,504/0` | `.0420/.3627/.0866` |
| combined `30x` diagnostic | `.03/3/.3/.3/3` | `11.08` | `60,504/0` | `.0419/.3608/.0867` |

Only acceleration changed the executed mechanism and produced a repeatable
gain. The `10x` and `30x` rows were sensitivity diagnostics outside the
ratified top-level ledger, not preset candidates.

Claim grade: `measured-V6-sensitivity-control`; mechanism attribution is
`inferred`. Falsifier: repeat the OAT matrix and observe a state, correction, or
root-only mechanism change, or no acceleration-correlated root-work reduction.

## V7 Four-Seed Survival Matrix

Each row requested four `0.3` chunks through `T=1.2` with six paths. Every halt
was atomic: the rejected candidate was not merged into the published history.

| Seed | Research accepted time / outcome | Interactive accepted time / outcome | Research / Interactive wall (s) | Research / Interactive accepted-rejected |
| ---: | --- | --- | ---: | ---: |
| 0 | `0.3485375`, `root_completeness_not_certified` | `0.3994140625`, same halt | `0.698215 / 0.182735` | `12-10 / 14-10` |
| 1 | `0.3924828125`, `root_completeness_not_certified` | `0.708203125`, same halt | `0.894724 / 0.205576` | `13-10 / 17-10` |
| 2 | `0.3588890625`, `root_completeness_not_certified` | `1.2`, completed | `0.590417 / 0.152719` | `12-10 / 24-0` |
| 3 | `0.3186546875`, `root_completeness_not_certified` | `0.29140625`, same halt | `0.809299 / 0.293397` | `13-10 / 9-10` |

Interactive improves accepted extent on seeds 0–2 and worsens it on seed 3.
Research does not reproduce the V6 four-seed `T=1.2` control. Therefore the
measured survival result is mixed and the Research-parity acceptance row fails.

Claim grade: `measured-current-binary`. Falsifier: the exact sweep emits a
different accepted extent, terminal row, or publication count.

## Common-Time Accuracy And Widths

Seed 0 gives a common completed endpoint at `T=0.3`:

| Comparison | max position delta | max velocity delta | max position radius, Research / Interactive | max velocity radius, Research / Interactive | intervals overlap | visibly similar diagnostic |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| Interactive against Research | `2.97049e-4` | `1.98138e-3` | `2.50198e-4 / 6.19690e-4` | `1.67118e-3 / 4.14718e-3` | yes | no |

The two certified intervals overlap. The separate visible-similarity diagnostic
fails its absolute `1e-3` velocity threshold. Neither fact implies the other.
Runs that stop at different final times are not compared as though their final
frames shared a common time.

Claim grade: `measured-current-binary`. Falsifier: the one-chunk command reports
disjoint intervals, a different common time, or a maximum velocity delta no
larger than the stated diagnostic threshold.

## Measured Phase Shares

The shares below use native wall time as a common denominator. They are nested
or overlapping and must not be summed.

| Seed-0 `T=0.3` phase | Research | Interactive |
| --- | ---: | ---: |
| correction | `85.91%` | `83.96%` |
| root batch | `77.18%` | `10.07%` |
| copy/hash | `9.34%` | `18.79%` |
| acceleration | `4.60%` | `20.28%` |
| worker idle/orchestration | `2.12%` | `8.26%` |
| recertification | `12.17%` | `10.68%` |
| regulator / finite-width / rejected candidate | `0%` | `0%` |

The pre-ratification finite-width control remains the event hot-spot evidence:
`34.6358 s` of `34.8246 s`, or `99.46%`, was inside the regulator ladder;
`34.7498 s`, or `99.79%`, was inside rejected-candidate work. It visited
`538,080` event cells. These are overlapping timers, not additive costs.

Claim grade: `measured`. Falsifier: repeated phase timers move the dominant wall
time to another phase outside ordinary host-load variation.

## Independent Controls

The fixture now supplies a Research event control, an Interactive event control,
and a deliberately under-budget event control against the unchanged Decimal
oracle. Both selectable native enclosures contain the independent value. The
`1e-12` under-budget case rejects under bounded depth and cell limits. The
Decimal oracle and its certified integration implementation were not edited in
this change.

Claim grade: `measured-independent-control`. Falsifier: either native interval
does not contain the Decimal result, the under-budget case publishes, or the
oracle files appear in the implementation diff.

## Protocol And Call-Site Inventory

- `src/apps/borg/BorgCertifiedBudgets.js`: one complete registry, canonical
  serialization, two stable hashes, ledger validation, and the fail-closed
  Research default while parity remains open.
- `borg.html`, `src/apps/borg/BorgAppRuntime.js`, and
  `src/apps/borg/BorgBootstrap.js`: two plain-language selector options; the
  selected preset atomically owns all numerical and controller allocations.
- `src/apps/borg/BorgEomShadowRunner.js`: resolved preset request and complete
  response-provenance verification; published-history merging remains atomic.
- `scripts/eom/BorgNativeEomProcessClient.mjs`: the sole V7 producer. `RUN` has
  exactly 54 fields, and producer-side checks reject allocation mismatch.
- `src/eom/native/eom_borg_shadow_cli.cpp`: the sole exact V7/54 parser,
  resource-envelope enforcement, and complete response provenance.
- `src/eom/include/architrino/eom/CoupledEvolution.hpp` and
  `src/eom/src/CoupledEvolution.cpp`: request allocations, receiver-total equal
  routed-pair division, charged regulator/common-domain rows, zero independent
  overlap, per-event certificates carrying every resolved pair weight and row
  allocation, and acceleration-width propagation into position and velocity.
- `src/eom/native/eom_native_evolution_fixture_cli.cpp` and
  `tests/test_eom_native_coupled_evolution.py`: unchanged-oracle selectable
  controls and deliberate under-budget rejection.
- `scripts/eom/profile-borg-incremental-chunks.mjs` and
  `scripts/eom/profile-borg-certified-budget-sweep.mjs`: preset-only profiling,
  complete provenance, phase timers, survival, widths, and common-time
  comparison. No old custom-tolerance rung remains.
- `tests/borg-eom-migration.test.js` and
  `tests/test_eom_borg_native_process.py`: registry hash, atomic preset, V7 exact
  format, response provenance, and fail-closed protocol controls.

There is one producer, one parser, one exact V7 format, and no V6 compatibility
path. `PATH` remains the exact six-field retained-history record.

Claim grade: `derived-current-tree`. Falsifier: repository search finds another
V7 producer/parser, a V6 parser path, a non-54-field accepted `RUN`, or a request
whose numerical values disagree with its preset record.

## Validation And Exact Commands

Commands executed from the repository root:

```text
cmake --build .tmp/eom-native-dev -j4
ctest --test-dir .tmp/eom-native-dev --output-on-failure
node --test tests/borg-*.test.js
PYTHONPATH=. VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" -m unittest discover -s tests -p 'test_eom*.py'
node scripts/eom/profile-borg-certified-budget-sweep.mjs .tmp/eom-native-dev/eom_borg_shadow_cli --rungs=research-certified,interactive-certified --seeds=0,1,2,3 --chunks=4 --populations=6
node scripts/eom/profile-borg-certified-budget-sweep.mjs .tmp/eom-native-dev/eom_borg_shadow_cli --rungs=research-certified,interactive-certified --seeds=0 --chunks=1 --populations=6
node scripts/validate-content.mjs --check --strict
node scripts/build-scene-graph.mjs --check --strict
node scripts/check-foundational-impact.mjs --staged --warn-only
node scripts/check-transmitter-factor-clean-slate.mjs
node scripts/angular-momentum/check-frequency-triplet-notation-drift.mjs
node scripts/check-polarity-notation-drift.mjs
node scripts/check-animator-runtime-wiring.mjs
```

Measured validation at this record's close: native build passed; CTest `3/3`;
Borg JavaScript `86/86`; EOM Python and unchanged oracle `150/150`; V7 process
protocol `12/12`; coupled evolution and independent controls `24/24`.
The measured `eom_borg_shadow_cli` was linked at `2026-07-18 07:53:18 -0400`,
after the latest participating C++ source change at
`2026-07-18 07:53:03 -0400`.

## Remaining Bottlenecks And Next Decision

Tolerance changes do not solve the 32- and 64-path corrected-substep/root path,
and event failure remains dominated by the regulator ladder. The immediate
mathematical blocker is earlier than performance work: determine whether the
newly propagated acceleration widths are intentionally part of later root
input, then derive or ratify a Research record whose root-completeness budget
can carry those widths without weakening fail-closed certification.

Claim grade: `inferred-next-target` from the measured parity failure. Falsifier:
code-path inspection shows propagated state widths must not enter later causal
root enclosures, or a corrected Research run passes parity without a budget
change.
