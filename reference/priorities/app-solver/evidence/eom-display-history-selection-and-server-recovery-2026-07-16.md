# Borg Display-Grade History Selection and Server Recovery — 2026-07-16

## Outcome

The seed-0 3:3 display-grade run now passes the former $[2.00,2.05]$ failure interval and completes the requested $T=3$ measurement horizon. The former exception came from the binary64 segment-join root bracket: after the bracket grew beyond the segment immediately to the right of a join, it kept evaluating through that one segment object. The corrected path evaluates the bracket through `RetainedHistory`, which selects every segment covering the requested interval. It does not clamp a time into a non-covering segment.

Claim grade: `measured` for the reproduced fault and completed passage; `derived` for the covering-segment obligation. Falsifier: the recorded request still raises `history evaluation lies outside segment`, or inspection finds an evaluation in the corrected join path that bypasses retained-history segment selection.

## Fault capture

The reproduction used `scripts/eom/profile-borg-incremental-chunks.mjs` with seed 0, the 3:3 default population, display grade, 0.05-time chunks, and `h_initial=h_max=0.025`. Zero-based request 40 covered $[2.00,2.05]$. Context added at the strict history boundary identified this row:

```text
exact-pair row 1003/1002/2.05
(borg-eom-shadow/1003 <- borg-eom-shadow/1002)
initial root cell segment=97 cell=[1.4019531249999999,1.4023437499999998]
requested evaluation=[1.4024687499999999,1.4024687499999999]
selected adjacent segment interval=[1.4023437499999996,1.4024414062500001]
selected adjacent segment tokens=[1.4023437499999998,1.4024414062499999]
```

The requested time is strictly beyond the selected segment's upper endpoint. The join bracket had crossed into another short post-encounter segment, so the selected segment was wrong even though the requested time remained inside the retained history as a whole. The crash pair was `1003 <- 1002`; the warned encounter pair was `1003 <-> 1006`. Warned-pair persistence therefore exposed the longer trajectory but did not mis-select the segment. Retained-window trimming and routed-pair pinning were also not the selecting caller.

Claim grade: `measured`. Falsifier: a fault capture from the same source state names a different caller, shows the requested time outside the full retained history, or identifies the warned pair as the failing pair.

## Correction and regression shape

`surround_double_segment_join_root` now evaluates source position and velocity through the complete retained history, collects every source segment crossed by the certified root interval, and does not advance if coverage or the normal cannot be certified. The strict condition in `CubicHistorySegment::require_time` is unchanged; its exception now reports the requested and segment intervals.

The native history fixture includes short consecutive segments whose combined width is smaller than the join-bracket growth. The regression asserts that the certified join root crosses and reports more than two source segments. The Borg protocol regression combines display grade, cumulative warned-pair provenance, and a trimmed post-encounter history suffix.

Claim grade: `derived` for exact covering selection and `measured` for the two regressions. Falsifier: the join evaluator reads a `CubicHistorySegment` outside its coverage, the strict guard is weakened, or either regression passes after restoring the single-adjacent-segment evaluation.

## Server exception boundary

Persistent server mode now catches an engine exception at the request boundary, clears incremental request state, consumes the rest of an unconsumed request through `END`, and returns a structured response with a Not advanced disposition with `haltCode="engine_exception"`, diagnostic detail, no accepted endpoint, and no published extensions. The same process then accepts the next request. One-shot mode retains its process-error behavior.

The server regression sends a post-`END` invalid-resource request, verifies the structured response and empty publication, then sends a valid request through the same worker and verifies completion.

Claim grade: `derived-design` and `measured-regression`. Falsifier: an engine exception kills persistent server mode, the failed response contains a published extension or accepted endpoint, or the next valid request cannot be served by that process.

## Seed-0 continuation

Command:

```text
node scripts/eom/profile-borg-incremental-chunks.mjs \
  .tmp/eom-native-dev/eom_borg_shadow_cli \
  --chunks=60 --seed=0 --initial-step=0.025 --maximum-step=0.025 \
  --summary-only=true --omit-regulators=true
```

| Chunk interval | Accepted end | EOM wall seconds | Cumulative warnings |
| --- | ---: | ---: | ---: |
| $[1.30,1.35]$ | 1.35 | 0.0423222 | 0 |
| $[1.35,1.40]$ | 1.40 | 0.935966 | 0 |
| $[1.40,1.45]$ | 1.45 | 5.286 | 38 |
| $[1.45,1.50]$ | 1.50 | 0.696389 | 38 |
| $[1.50,1.55]$ | 1.55 | 1.43621 | 38 |
| $[1.95,2.00]$ | 2.00 | 0.11091 | 38 |
| $[2.00,2.05]$ | 2.05 | 0.0984191 | 38 |
| $[2.05,2.10]$ | 2.10 | 0.121859 | 38 |
| $[2.45,2.50]$ | 2.50 | 0.116157 | 38 |
| $[2.95,3.00]$ | 3.00 | 0.0690362 | 38 |

The first warning time remained `1.4023437499999998`. No second encounter was reported through $T=3$; the run ended only because the requested measurement horizon was reached. All post-warning segments retained the display-grade demotion marker.

Claim grade: `measured`. Falsifier: the command does not accept $T=3$, the $[2.00,2.05]$ chunk halts, the warning ledger changes before a new encounter, or any post-warning segment loses its demotion marker. The absence of a second encounter is bounded to $T \le 3$ and is falsified by a warning in that range.

## Build and parity controls

The Release EOM solver executable was built at `2026-07-17 00:01:30 -0400`, after the last relevant source changes at `00:00:02` and `00:01:26`. Its SHA-256 was `59167a5abf6787307a93db40e79220facab8fb0d6e77a8acaf6215800f609c5d`.

The certified deterministic fixture SHA-256 remained `589b086b96ed3f441eaae30c8fcce177103e8d2c22b6c0fa862c1c53749deacc`, equal to the retained run-grade baseline. This is a bit-identity regression control, not independent evidence for the mathematical law. The Decimal oracle was not modified.

Claim grade: `measured`. Falsifier: a relevant source timestamp postdates the executable, the fixture digest differs, or the change set includes a Decimal oracle file.

## Validation

- EOM Python: 144 tests passed.
- Borg JavaScript: 67 tests passed.
- The repository pre-commit hook passed content/reference validation, scene graph validation, foundational-reference validation, receiver-normal and notation checks, and animator wiring.

Claim grade: `measured`. Falsifier: any named suite or hook fails on the same source state.
