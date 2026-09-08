# Call-Local State-Cache Equivalence

Status: separate reference successor prepared for independent review; not connected to an accepted consumer or launch plan. This artifact concerns reuse of immutable interval computations, not a new geometry, root proposal or measurement. All synthetic examples use normalized wake-speed units with $c_f=1$.

Plainly: the new module saves repeated intermediate answers during one calculation. It has not replaced the accepted F6c program or authorized another run.

## Exact Source Boundary

The accepted [baseline library](../../../../scripts/eom/oracle/continuous_reception_roots.py) remains unchanged at SHA-256 `f38657eedb585f6066bf233cef05508ef4d4336146dbf1e44501dfa9b669e04c`. The separate [cached successor](../../../../scripts/eom/oracle/continuous_reception_roots_cached.py), SHA-256 `daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf`, reproduces that source with only explicit private state-evaluator plumbing and a bounded call-local cache. The [dedicated controls](../../../../tests/test_eom_continuous_reception_roots_cached.py), SHA-256 `a5ac7c8b26c5d0a193f20305f4bdbad93939756780bdaefd9cbf569f42a487eb`, include a syntax-tree comparison that removes only the declared plumbing and requires the remaining source structures to agree.

Plainly: the formulas, guards and result fields have not been rewritten. The source comparison checks the narrowness of the implementation change; it is not independent proof of the underlying root mathematics.

The [independent exact-data comparison](../../../../scripts/eom/verify-f6c-continuous-reception-root-cover.py) remains `2d25103e0fb6ab584485b7954465afe0fa5de556b3a7e111c56d20156b7011fd`, the [existing consumer](../../../../scripts/eom/prepare-f6c-continuous-reception-root-cover.py) remains `4ce6436c09c445030192aeb5b894239b7fa04cee578e6067f1088151695a5e9e`, and the [governing predeclaration](2026-08-27-f6c-continuous-reception-root-cover-predeclaration.md) remains `765e6663cdd60323f84b9e1af52ba1399345322eb747727f2a0898b4dd0fd079`. Their current bindings still select the baseline, not this successor. Temporary coexistence is explicitly required to review the reference before any later, separate binding/protocol and consumer batches. This successor is either adopted through those separate batches or withdrawn; this artifact does not establish a second production path.

Plainly: the old evidence remains attached to exactly the programs that produced it. The new module cannot inherit that evidence merely because its answers agree on controls.

## Derived Equivalence

Let $H$ denote one validated history snapshot created inside a cover call, $I=[a,b]$ its requested absolute-time interval, and $S(H,I)$ the baseline `_history_state_over` result. A snapshot contains fresh immutable segment and coefficient tuples with exact finite Decimal leaves. The baseline state computation visits every intersecting closed segment, including both originals at a shared knot, performs the unchanged directed position/velocity evaluations, and retains the complete ordered piece tuple. Within the cover's fixed 90-digit arithmetic environment, its inputs and executed operations determine its returned endpoint representations and piece records.

Plainly: once the copied history and time interval are fixed, repeating this state calculation has no new information to discover. It traverses the same pieces and performs the same arithmetic in the same order.

The cache key consists of the snapshot's exact object identity, the sign/digits/exponent tuples of both Decimal endpoints, and the exact integer precision. Strong snapshot references live as long as the cache, so an object identity cannot be recycled into another history while an entry exists. A digest or member name alone is never a cache key. Decimal tuples distinguish `0`, `-0`, `0.0` and `-0.0`; no normalization or numerical-equality shortcut merges different operand representations. Each lookup first runs the unchanged time validation. Noninteger precision fields that compare equal to 90 follow the uncached baseline path, preserving its behavior without borrowing a prior integer-precision result.

Plainly: a saved answer can be reused only for the very same copied history and the same represented time operands. A changed history, signed zero, endpoint representation or precision cannot accidentally select it.

Claim grade: derived. On a miss, the successor executes $S(H,I)$ unchanged and stores its result only after successful completion. On a hit, the stored result came from those exact immutable operands; substituting it preserves every returned Decimal representation and ordered piece record. Failed evaluations are not stored. Induction through the unchanged ordered face and geometry calls therefore preserves the mathematical row values, strict-sign decisions, factor checks, self exclusions, and first unresolved-row prefix whenever the computation completes under the same arithmetic environment. Allocation identity of equal immutable result objects, execution time and resource exhaustion are not asserted equivalent.

Plainly: the proof is replacement of a repeated calculation by its already computed answer. It does not replace a failed calculation, skip a first evaluation, promise identical memory allocation, or turn a timeout into a successful result.

The cache is created only after the existing history capture and premise validation. It is cleared before each cell, has no global storage, and retains at most 32 successful state entries. On capacity contact it removes the oldest retained entry and recomputes later misses; this is a storage policy, not a new mathematical limit or reason to reject a root. Public standalone `history_state_over` and `unrestricted_residual` remain uncached and validate fresh generations. The public cover schema, existing finite member/segment/cell limits, 90-digit arithmetic, `1e-24` transmitter-factor floor, complete closed-piece unions and all five false authority flags remain unchanged.

Plainly: reuse ends at the cell and call boundaries. A full cache may make later work slower through recomputation, but cannot discard a row, relax a threshold or change what counts as covered.

## Independent Controls And Synthetic Cost

The independent mathematical controls use exact rational affine position and derivative bounds, stationary root curves with distance and both factors exactly known, common axial velocity with the two directional emission curves, and an explicitly constructed shared-knot uncertainty union. Separate controls exercise signed-zero and exponent separation, changed intervals and generations, precision rejection and fallback, failed evaluations, capacity eviction, immutable cached outputs, caller-owned list mutation before and after capture, failed-row prefixes, complete pair census and call/cell lifetime. Baseline serialized parity retains Decimal tuples and is labeled implementation-equivalence evidence only. Observation mocks appear only in controls, never in the successor.

Plainly: the known formulas check mathematical answers independently. Comparing old and new output separately checks that caching did not change the implementation's behavior.

The author-run focused command `"${AAA_VENV:-../.venv}/bin/python" -B -m unittest discover -s tests -p 'test_eom_continuous_reception_roots*.py' -v` passed 63 tests: all 35 unchanged baseline controls and 28 new controls. The shared-box eight-member control observed 448 baseline state evaluations versus 32 cache misses, with eight complete history validations in both versions and identical serialized results. This count is not a wall-time estimate.

Plainly: the expected repeated work is actually removed in that synthetic case, while validation remains present. The test count and operation count do not establish actual F6c performance.

Claim grade: measured, synthetic function-call timing only. A separate inline shared-venv profile constructed stationary histories $X_i(T)=i$ along one axis, each partitioned into 128 uniform pieces on `[-8,1]`, with reception `[0,0.001]` and emission `[-8,-0.05]`. Each variant ran three times without observation mocks. Preparation, imports and comparison were outside the timed cover call; a 60-second alarm and 15-second heartbeat watcher enclosed the entire profile. Exact static geometry and serialized implementation parity passed after each call. The profile closed normally after `4.538606500020251` seconds.

Plainly: these are small invented histories with known answers, not the saved F6c trajectories. The timings measure only the library call, not a complete launched attempt.

| Synthetic members | Baseline median seconds | Cached median seconds |
| --- | ---: | ---: |
| 2 | `0.044816665817052126` | `0.043015207862481475` |
| 8 | `1.1797350409906358` | `0.18471512501128018` |

Plainly: reuse helped this eight-member fixture substantially and the two-member fixture only slightly. Neither measurement predicts the actual F6c whole-attempt cost or overturns its accepted resource return.

## Falsifiers And Remaining Authority

The equivalence claim is falsified by a same-environment valid input producing different serialized mathematical rows or a different first unresolved prefix, by a cache hit across changed snapshot or endpoint operands, by a missed closed-knot piece, by mutable data altering a stored result, or by any changed formula/guard outside the declared plumbing. The named controls directly exercise these failure modes; an independent review must examine the source and proof rather than treat baseline parity as the independent reference. The synthetic timing claim is limited to the stated observed trials and supplies no capacity guarantee.

Plainly: disagreement on those concrete checks would invalidate this successor. No amount of synthetic speed improvement would excuse a changed bound or missing piece.

The existing F6c root-cover consumer is the intended later consumer, but its current plan and independent comparison still pin the baseline. This batch authorizes no binding change, actual-history evaluation, new pilot, full run, additional worker, larger 1,800-second allowance, EOM execution, acceleration/residual measurement, score, H3 claim or historical trajectory identity. The [accepted resource return](2026-08-27-f6c-root-cover-full-resource-plan.md) remains in force. Any eventual actual performance conclusion requires a separately reviewed successor composition and fresh bounded measured baseline.

Plainly: this is a candidate improvement to the reference calculation. F6c remains exactly where the accepted evidence left it until separate reviews and a permitted measurement establish more.

Closure goal: independently review the call-local equivalence and synthetic controls before any separate consumer or protocol update; preserve all accepted source and evidence bytes.
