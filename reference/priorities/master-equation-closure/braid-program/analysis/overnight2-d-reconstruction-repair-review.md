# Independent review of the repaired quintic residual diagnostic

## Disposition and evidence boundary

**Derived implementation disposition:** the repaired [quintic diagnostic](overnight2-d-quintic-reference.py) correctly groups equal encoded event times, replaces every grouped channel in the complete acceleration traces, evaluates the declared cubic side directly, uses the left cubic trace at the terminal reconstruction endpoint, and rejects returned rows whose raw source velocity violates its strict-interior guard. Receiver velocities are also guarded at the declared acceleration and residual evaluations. These changes resolve the three concrete defects in the [preceding review](overnight2-d-reconstruction-independent-review.md) for the stated floating diagnostic.

**Measured control result:** the command recorded below ran the repaired script's controls in the shared venv with one numerical thread and returned `PASS`, exit zero, with polynomial discrepancy `3.552713678800501e-15`. This review independently derived their expected mathematical outcomes before interpreting that pass. No target was run or numerical trajectory result inspected. The frozen source hash before review was `0954fc7b9f635c16e6f753a2b338f3334666466cfc8f23624208514d61dda7c2`.

One event-boundary qualification remains: the discovery condition `f(end)>0` omits a source-zero front exactly at the requested endpoint. Its terminal acceleration then relies on the inherited numerical root's choice of source trace unless that endpoint case is handled explicitly. This is a source-code edge case, not a measured defect of a retained target. The diagnostic remains a dependent sampled residual comparison. Whole-reference speed, complete root admission, interval residual bounds, and actual finite-history admission are not established by these repairs or controls.

## 1. Equal-time events and complete trace replacement

`group_events` maps each encoded time to a list of all channel pairs at that time. It no longer discards earlier pairs. `replace_fronts` starts with independent copies of the complete ordinary acceleration sum and, for every listed channel, adds its left-row replacement minus the nominal row to one copy and its right-row replacement minus the nominal row to the other. Algebraically, for a receiver with front-channel set $J$,

$$
\mathbf A^- = \mathbf A+\sum_{j\in J}(\mathbf a_j^- -\mathbf a_j^{\mathrm{nom}}),
\qquad
\mathbf A^+ = \mathbf A+\sum_{j\in J}(\mathbf a_j^+ -\mathbf a_j^{\mathrm{nom}}).
$$

This is the correct complete-trace operation: unaffected channels remain in the sum, and every affected channel is replaced exactly once. The event-discovery loop visits each ordered pair once, so it does not introduce duplicate copies of a channel. The front callback retains the original signs and ordinary kernel and guards both prescribed source velocity traces.

The simultaneous-front control uses two channels reaching the same receiver at the same encoded time. Their left contributions are $(1,0,0)$ and $(2,0,0)$, and their right contributions are $(0,1,0)$ and $(0,2,0)$. The independently expected totals are therefore $(3,0,0)$ and $(0,3,0)$, which the control checks exactly. This specifically exercises the previous overwrite defect.

Grouping remains by equality of encoded times. It does not prove that two nearby floating roots represent distinct mathematical events or that two unequal encodings cannot represent the same mathematical event. The added strictly interior Gauss-point assertion prevents silently sampling a cell endpoint when a cell is too narrow in floating arithmetic, but stopping on such a cell would leave event localization unresolved. A validated event treatment still needs enclosures and a treatment of uncertain ordering or coincidence.

At the requested final time, `f(end)==0` does not enter the event list because the condition is strict. The grid still includes that endpoint, and the final bubble uses its computed left acceleration target. If the inherited numerical root evaluates the source slightly to the right of zero, that target can use the right source velocity trace. An explicit endpoint-front control and endpoint inclusion rule would remove this ambiguity. Alternatively an application can independently establish that the requested endpoint is separated from every source-zero front. No such separation is inferred from this review.

## 2. Declared cubic-side evaluation and terminal reconstruction

The new `cubic_trace` selects the requested original cubic by `searchsorted` with an explicit left or right convention, then evaluates its position, velocity, and acceleration polynomial at the requested time itself. It no longer substitutes an adjacent floating time. At a newly inserted point strictly inside one original cubic, both conventions select that same cubic; at an original breakpoint they select the appropriate adjacent polynomial. At zero, the explicit left request returns the prescribed joined negative-time trace, while a right request selects the first positive cubic.

The discrepancy arrays now subtract the right trace at each cell's left endpoint and the left trace at its right endpoint. Thus they correspond to the exact-side construction of the mathematical reconstruction theorem, subject to ordinary floating evaluation and subtraction error. The earlier deterministic displacement error from `nextafter` is removed.

For positive queries at the final reconstruction endpoint, `Quintic.raw` explicitly requests the left original-cubic trace before adding the final cell's endpoint bubble correction. Both pieces therefore refer to the same limiting cell. Queries beyond the reconstruction endpoint are rejected. At internal positive nodes, the method consistently returns the right trace; at source time zero it preserves the earlier declared negative-time convention.

The terminal control has old positions $0,1,3$ at times $0,1,2$ and zero endpoint velocities. On the first old cell the cubic is $3t^2-2t^3$, with left terminal acceleration $-6$. On the second cell, in local coordinate $q=t-1$, the cubic is $1+6q^2-4q^3$, with right initial acceleration $12$. A final bubble acceleration correction of $2$ must therefore produce terminal left acceleration $-4$, not $14$. The control checks $-4$ and independently exposes the other trace as $12$. This resolves the previous mixed-trace defect for the constructed case.

The scalar quintic control is also mathematically correct. The cubic matching the endpoint positions and velocities of $t^5$ is $-2t^2+3t^3$, and the acceleration discrepancies $4,6$ give bubble $2t^2-3t^3+t^5$. Their sum is identically $t^5$, including its first two derivatives. The reported floating discrepancy measures evaluation of this known polynomial identity; it is not a numerical target accuracy result.

## 3. Source and receiver guards

The inherited row evaluator computes the raw source speed in metadata `L` before applying its optional feasible-velocity projection. `GuardedJoined.row` inspects that raw value and raises unless it is finite and below `0.99`. Therefore no successfully returned row from this subclass can silently rely on clipping a superunit source velocity. The guard occurs after the inherited calculation, but any such invalid result is rejected before the caller adds it to a residual. An earlier root or factor failure likewise stops the computation rather than authorizing that row.

The fixed threshold `0.99` is a diagnostic admission margin, not a change to the physical unit-speed ceiling: failing it aborts this strict-interior experiment. The receiver guard is used at acceleration-grid evaluations and at old/new residual sample evaluations. The explicit source-front callback guards both prescribed velocity traces. The new source-speed maxima record the speeds at the selected roots of accepted rows. They do not record or bound the velocity at every trial point used by the numerical root search, and they do not establish a maximum over the complete source history.

The repaired source-rejection control is valid. A prescribed circular source of radius three centered on a stationary receiver has causal distance exactly three at every source time. At reception zero its unique positive delay is therefore three, irrespective of its angular speed. With source speed $1.1$, its velocity is tangent to the circle and perpendicular to the causal normal, so the ordinary root factors at that evaluation remain positive. The inherited row can reach the guard, which must reject the raw superunit speed. This is a compatible position/velocity control deliberately outside the selected physical speed domain; it is not a candidate release.

The previously attempted unbounded superunit straight source could fail root existence before reaching the speed guard, so it did not isolate the intended implementation behavior. Replacing that control with the independently solvable circle changes the test input, not the selected dynamics. The supplied parent account records that the unsuccessful control occurred before target use; this review did not independently inspect that earlier execution receipt.

## 4. Remaining representation and numerical limitations

The source now checks finite positive endpoint coverage, increasing finite stored times starting at zero, finite matching eight-member position/velocity arrays, and a positive requested sample count. It asserts that each computed Gauss point is strictly inside its cell. It records dependency hashes, grouped event counts, minimum cell width, and the queried-source speed maxima. These changes improve the explicit execution contract and provenance; they do not convert samples into interval bounds.

The mathematical endpoint theorem is an exact-arithmetic statement. Direct cubic-side evaluation removes one avoidable trace mismatch, but the stored acceleration corrections still use floating kernel evaluations and floating subtraction. Exact $C^2$ continuity of a declared mathematical reference must be proved for its chosen representation or replaced by a bound on its remaining trace discrepancies. Similarly, floating root positions, trigonometric joins, polynomial evaluations, and front normals need enclosures before a rigorous residual statement can use them. At an approximate event time, dividing the receiver-to-birth vector by the approximate time does not make its normal exactly unit; the current front rows are floating approximations to the exact formula.

The [preceding review](overnight2-d-reconstruction-independent-review.md) derives whole-cell position and speed correction bounds. Combining outward evaluations of those bounds with a certified old-reference speed and separation region is a coherent next route to admitting the corrected reference. An old-cubic root certificate alone does not certify the quintic correction. Query guards only prove that the evaluated points passed their threshold in this execution; missing a violation between queries remains possible without the whole-cell bound.

Three interior Gauss samples per cell still do not bound the maximum or integral of a delayed residual. The residual norm contains state-dependent root times and nonpolynomial kernel factors. Full cell coverage identifies the quadrature domain, while partial coverage omits unsampled cells. Neither produces an error enclosure or a convergence order. The repaired old/new comparison remains dependent on the same history and root evaluation code.

## 5. Falsifiers and validation receipt

A complete-trace replacement is falsified by an equal-time multi-channel control whose result omits or duplicates a channel while preserving the declared input sum. The terminal repair is falsified by a node with distinct old acceleration traces where the returned terminal acceleration differs from the declared left trace plus final bubble correction. The source guard is falsified by a successfully returned row with metadata raw speed at least `0.99` or nonfinite. The circular source supplies a root-known superunit case for that check. Failure of a sampled guard or a root search does not establish failure of the physical release; it stops this diagnostic's application.

The sole execution performed by this review was:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 PYTHONDONTWRITEBYTECODE=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-quintic-reference.py controls
```

It returned exit zero and `PASS` for the degree-five polynomial, endpoint constraints, simultaneous fronts, terminal left trace, and superunit source rejection. The maximum reported polynomial discrepancy was `3.552713678800501e-15`. The command completed before any reviewer target use; this reviewer ran no target. It imported the frozen subject to exercise controls whose expectations were independently derived above, so this is a scoped implementation check rather than independent verification of any release trajectory.

Only this new repair-review companion was authored. The earlier reviews and the frozen subject were not edited. The parent owns the receiving [research report](overnight2-d-followup-and-research-2026-10-07.md), any endpoint-event disposition, and the remaining computation. Actual finite-history admission remains unresolved.

Final editorial receipt: `shasum -a 256` after the control run and report capture returned the unchanged subject identity `0954fc7b9f635c16e6f753a2b338f3334666466cfc8f23624208514d61dda7c2`. File-scoped `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-reconstruction-repair-review.md` emitted no whitespace diagnostics (difference exit status 1). Explicit `test -f` checks passed for the three distinct local link destinations; there are no fragment targets. No target computation or child agent was started.
