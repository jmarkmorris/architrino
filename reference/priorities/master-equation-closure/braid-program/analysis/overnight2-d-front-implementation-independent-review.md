# Independent review of the increment-defined front implementation

## Disposition

**Derived disposition:** the frozen [front-aligned reference instrument](overnight2-d-front-aligned-reference.py) implements the local-displacement representation and exact-arithmetic restriction consistently. Its relative numerical state, endpoint derivative transfer, and shared velocity nodes define a coherent continuous comparison path. Retained residual evaluations use the original comparison history for every channel, rather than the analytic trial extension.

**Two concrete defects remain.** First, restart at a just-crossed source front does not explicitly select the outgoing acceleration trace; it delegates to a history evaluator whose source-time-zero convention is the incoming trace. Second, the output dependency list omits the literal preparation JSON and one transitively imported module. These findings were returned to the parent before final disposition. The parent will preserve the frozen source and pilot evidence and repair them separately. This review does not accept an uninspected future repair.

The source is an unvalidated numerical comparison, not an exact trajectory or residual enclosure. Its absolute-node array is a floating evaluation cache for a separately declared increment-defined path. Cache error, root error, and event localization remain explicit obligations. The [mathematical front review](overnight2-d-front-alignment-independent-review.md) retains the conditional branch theorem and its joined birth-point interpretation.

## 1. Increment-defined joins and relative integration

Let the stored initial position be $\mathbf x_0$, the encoded cell increments be $\Delta\mathbf x_k$, and the shared encoded node velocities be $\mathbf v_k$. Define exact mathematical nodes by

$$
\mathbf x_k=\mathbf x_0+\sum_{\ell<k}\Delta\mathbf x_\ell.
$$

On cell $k$, the position is that exact node plus a local Hermite polynomial from zero to $\Delta\mathbf x_k$, with endpoint time derivatives $\mathbf v_k,\mathbf v_{k+1}$, plus the factored endpoint-vanishing correction. Consequently its right position is exactly $\mathbf x_k+\Delta\mathbf x_k=\mathbf x_{k+1}$ and its right velocity is exactly the next cell's left velocity. This proves a $C^1$ positive-time path in the mathematical representation, independent of the accuracy of the floating absolute cache.

The code stores `DX` directly and passes local positions `0, DX` to `anchored`. It therefore avoids reconstructing a small displacement by subtracting separately rounded large coordinates. `solver_at` sets the numerical displacement to zero at each restart while retaining the current velocity; the right-hand side reconstructs an absolute receiver query by adding the current cached node. The history is unchanged during a trial step, including its dense-output stage evaluations, so the reference point for this displacement remains fixed during that step.

The accepted increment is the integrator's relative endpoint position. On a cut cell it is instead the restricted polynomial's local displacement, with velocity taken from the derivative of that same polynomial. The saved velocity-adjustment diagnostic compares that derivative with the separate dense velocity-state interpolant. Shared node velocities, rather than an unacknowledged velocity reset, define the next comparison cell.

The cache update is a floating addition. If $\widehat{\mathbf x}_k$ is the cached node, its discrepancy from the exact cumulative node satisfies

$$
\widehat{\mathbf x}_{k+1}-\mathbf x_{k+1}
=(\widehat{\mathbf x}_k-\mathbf x_k)
+\left[\operatorname{fl}(\widehat{\mathbf x}_k+\Delta\mathbf x_k)
-(\widehat{\mathbf x}_k+\Delta\mathbf x_k)\right].
$$

Exact rational accumulation of encoded increments can bound or determine that discrepancy. The current code does not perform this audit. `IncrementHistory.raw` evaluates using the cache and then adds a locally evaluated polynomial, so its returned position approximates the declared exact path. Its velocity is the local polynomial derivative, without a source projection. Small cache mismatches at adjacent cells are evaluation errors to enclose; they are not proof that the exact increment-defined reference is discontinuous.

## 2. Earliest front and polynomial restriction

Pending channels use the analytic extension of the translated rigid negative comparison branch. Crossed channels use the ordinary completed history. Every right-hand-side sum includes all seven partners and excludes self response. The monitor uses `H.X[0,j]`, the declared comparison birth node, consistent with the parent's clarification of the mathematical proposal. Floating computation of the negative joining shift still needs a representation allowance.

For each pending channel, an endpoint sign transition triggers a bracketed zero search on the declared trial polynomial. The smallest encoded zero determines the cut, and exactly equal encoded zeros share that node. This is a numerical earliest-front selector; endpoint signs do not prove a complete census without a whole-cell speed or monitor argument. A previous root-region certificate for a different reference cannot be inherited without accounting for the changed nodes and representation.

`restrict` reconstructs the degree-four through degree-seven coefficients from the old factored correction, multiplies each by $\theta^k$, and applies the anchoring identities. Together with the restricted endpoint displacement and time derivative, this is exactly the restriction proved in the mathematical review. The original cell's cubic contributes no degree-four-or-higher coefficient, so it need not be included in this conversion. The new factored representation is equal to the restriction in exact arithmetic; floating coefficient conversion and the relation between $\theta h$ and the encoded new width need separate allowances.

The code stops for a retained front cell of width at most $10^{-9}$. It also has a distinct node-level catch-up path: a pending monitor already nonnegative but below $10^{-10}$ is switched and recorded with a zero-width event record. That is a numerical branch-state correction, not a proved simultaneous event or an interval localization certificate. Its use must retain the recorded monitor error and an eventual lower clock-slope bound. Together with cache and evaluation errors, those data determine the needed event-time allowance. A zero-width record does not mean the actual uncertainty interval has zero width.

## 3. Unresolved outgoing trace at restart

After a hit, the pair is removed from `pending`, and `solver_at` creates a fresh integrator. This correctly discards the old future trial and its cached right-hand side. However, its first ordinary row uses `hist.raw`; at a returned source time $s\le0$, that evaluator returns the prescribed negative velocity trace. There is no explicit just-crossed-channel selector for the positive trace at the initial stage. Depending on numerical root localization and subtraction, the first stage can therefore receive the incoming trace or a roundoff-selected outgoing trace.

An independent row control makes the distinction concrete. At reception time two, use a receiver at coordinate two and a source born at zero with source velocity $-1/2$ before zero and $+1/2$ after zero, with continuous piecewise-linear position. The unique causal source time is zero, range is two, and the positive-polarity one-sided row values are

$$
a^- =\frac1{2^2(1+1/2)}=\frac16,
\qquad
a^+ =\frac1{2^2(1-1/2)}=\frac12.
$$

An outgoing-stage selector must supply $1/2$ for that crossed channel, while the retained incoming limit remains $1/6$. No receiver velocity jump occurs. The current scalar piecewise-quadratic control checks an arithmetic solution formula; it does not exercise the actual branch dispatch and therefore cannot resolve this defect.

This missing trace selection does not prevent the output from being an arbitrary numerical comparison path whose original-law residual can be measured. It does leave a stated front-alignment requirement unresolved and can create a new first-stage defect. A repair needs explicit right-trace dispatch for every just-crossed channel, including simultaneous channels, and a known control of that actual selector. Subsequent ordinary evaluations should retain their normal source-time branch rule. The parent has acknowledged this repair; the frozen source was not changed here.

## 4. Retained residuals and completeness limits

After accepting a cell, the residual loop calls `d.row(hist.raw, ...)` for every partner, irrespective of pending state. It does not pass the rigid trial extension there. Thus the recorded values are floating samples of the original comparison-history residual, subject to cached positions, polynomial evaluation, and root error. The derivative used on the receiver side is the derivative of the same local position polynomial used for the reference.

Receiver and selected-source speed guards reject queried values at or above the diagnostic threshold. They do not bound speed between queries, prove unique roots, or exclude a monitor crossing and return between endpoint samples. The root routine also retains its conservative completed-history restriction. Complete domain admission and a residual enclosure need the increment-defined representation, including cumulative-node error, rather than treating cached `X` values as exact independent endpoints.

A front can be slightly mislocalized, and its retained reference residual may then have a localized discrepancy between the numerical branch change and the true reference front. Three interior sample points are not guaranteed to observe that interval. The code does not enclose that event contribution or establish an integral upper bound. At very short cells, distinct real interior points can also round to the same representable time or an endpoint; this implementation has no explicit strictly-interior-time assertion in its residual loop. None of these limitations licenses an exact-history or nominal smooth-order claim.

## 5. Missing dependency identities

The output `deps` list omits `.local-data/master-equation-closure/geometry-session-20261004/results/0186.json`, although the preparation reader obtains the rigid radii, angular rate, phases, heights, and polarities from it. It also omits the transitively imported `overnight-d-finite-geometry-screen.py`, which supplies the imported chain linking the shared history implementation. The earlier dense-reference instrument lists both. They should be retained with the existing pilot receipt and included in the repaired dependency list.

Direct `shasum -a 256` reads during this review measured:

| Dependency | SHA-256 |
| --- | --- |
| Literal `0186.json` preparation | `d937eee01771c6a75b49b07ed1f6d1125ed1a91c82fbb4a9b76bf2f529c6d56d` |
| `overnight-d-finite-geometry-screen.py` | `8e877ce4245643d2c3114fb3d187bfcf18b4b34c5d090c8149d9851bd10e6768` |
| Current imported `overnight2-d-dense-reference.py` | `b3bc24f26f99ac3c0224913d3ee16a63f17dc6e47605a6c950c08e9dcaeca740` |

These reads identify the files inspected in this review. The parent owns binding the first two unchanged startup identities to the earlier pilot record; this reviewer did not edit that record or infer its input bytes solely from current filesystem state.

## 6. Known controls, falsifiers, and validation

The following controls passed in the shared venv during this review:

- Degree-five restriction, with $P(q)=q^5$, cut $\theta=1/2$, retained position $u^5/32$, velocity $5u^4/16$, and acceleration $5u^3/2$ for the retained width $1/2$.
- The piecewise-quadratic arithmetic example with incoming acceleration two, event time $3/4$, outgoing acceleration minus one, continuous event velocity $3/2$, and final position $1.65625$ at time two.
- The approaching straight-receiver front $t=|3-t/2|$, whose first positive solution is two.
- A constant-velocity small displacement at width $2^{-20}$ beside coordinate $2^{30}$. The rounded absolute endpoint loses that displacement, while the local representation retains its known position, velocity, and zero acceleration within the control tolerances.
- Imported dense polynomial, anchoring, causal quadratic, oscillator, and conservative delay-floor controls. The oscillator discrepancy was `1.1695899804209375e-10`.

These test local algebra and selected utilities; they do not test full pending-state dispatch, earliest-front completeness, simultaneous restart traces, exact cumulative-cache error, or an eight-member trajectory. The actual outgoing-row control described in Section 3 remains required.

The executed command was:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 PYTHONDONTWRITEBYTECODE=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-front-aligned-reference.py controls
```

It returned exit zero and both reported control groups passed. No target or heavy computation ran in this review.

The increment-join claim is falsified by a mismatch of exact adjacent node values or shared time derivatives under the declared local representation. Restriction is falsified by changing the exact polynomial on the retained interval. Outgoing dispatch is falsified by returning the incoming $1/6$ in the known right-trace case above. Original-history residual evaluation is falsified if any retained residual call uses the trial extension after a source-zero front. A whole-cell domain or residual claim is invalid without the required cache, root, speed, and localization bounds, even if all listed controls pass.

Only this new review companion was authored. The parent owns the receiving [research account](overnight2-d-followup-and-research-2026-10-07.md), pilot preservation, source repairs, and further interpretation. The subject and earlier reviews remain frozen. Actual finite-history admission is unresolved.

Final editorial receipt: `shasum -a 256` before and after the review measured the unchanged subject identity `0d9cd673318a68a6adff945a6d191b1cc05b3ec61c9ac27c3b5b69555fae81e1`. Explicit `test -f` checks passed for the three distinct relative-link destinations in this companion; none uses a fragment. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-front-implementation-independent-review.md` emitted no whitespace diagnostics; its difference exit status is expected for a new file.
