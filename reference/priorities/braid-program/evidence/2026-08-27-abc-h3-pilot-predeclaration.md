# A/B/C H3 Pilot Predeclaration

Status: draft fixed execution contract; not execution-ready until the named carrier, independent conformance, build, and ledger bindings are reviewed. This is a new narrow declaration, not an extension of the old H1/H2-only parallel manifest. It requires no new geometry choice for its sixteen fixed rows.

## Frozen subject and coverage

Use exactly the sixteen candidate/source rows, source hashes, member counts, and outward limits in the [independent root reference](2026-08-27-abc-subfield-root-reference.md). Preserve the literal center, `radiusU`, `radiusV`, phase, angular velocity, epoch, constituent identity, polarity, and source order. Set numerical wake speed to `1`. Do not substitute the narrower EOM radius/tilt circular factory unless exact equality to these literal vectors is separately established.

For phase count $N$, receptions are the exact decimal rational times $T_k=4+4k/N$, $0\le k<N$. Each reception owns a fresh retained carrier on `[T_k-2,T_k]`. This avoids extending any source beyond its existing `[0,8]` history. The complete census contains every ordered pair including self: `36` rows for each six-member candidate and `144` for each twelve-member candidate.

Plainly: every run tests the same approved prescribed histories at known times. It may refine the numerical representation, but it cannot silently change the paths or omit self rows.

## Shared carrier and acceptance prerequisite

The carrier must preserve arbitrary literal `C/U/V` vectors and materialize `CubicHistorySegment` histories without modifying the production root API. Each retained history has exactly 1,000 rational segments of width `0.002`; every adjacent endpoint token must agree exactly. The implementation binding must preserve every local-time coefficient token and the parsed binary64 endpoint bit patterns. The independently proved [circular construction contract](2026-08-27-abc-subfield-root-reference.md#circular-carrier-construction-reference) fixes positive per-coordinate errors at $\epsilon_x=2^{-37}$ and $\epsilon_v=2^{-22}$, serialized as the exact decimal strings `0.0000000000072759576141834259033203125` and `0.0000002384185791015625`. An independent analytic circular-path reference must certify the actual serialized cubic position and velocity error boxes continuously, including endpoint-construction error. No zero-width nominal history is admissible. The reference and its theorem must be frozen before the carrier implementation batch.

For every nominal segment $[a,b]$, prove the same saved polynomial and its derivative on the slightly expanded interval whose endpoints are the immediate binary64 predecessor of the parsed $a$ and successor of the parsed $b$. This covers the actual EOM evaluation domains; it does not extend the retained-history search window. The proof uses exact endpoint lifts, directed-interval recentering of the unchanged polynomial, a maximum expanded width `0.00200000000001`, and endpoint position/tangent error reserves `1e-13` and `1e-12`. The source-bound per-coordinate fourth derivative $|\omega|^4(|U_k|+|V_k|)$ must not exceed `104`. The final proof receipt and whole-manifest coverage must be bound before the first root call. A width that prevents the predeclared root tolerance from being certified returns the carrier for repair; it does not license a wider root tolerance. The single-segment reference and conditional budget alone do not accept an actual complete history.

Plainly: the reusable bridge must prove that its saved curves enclose the literal circles. The root search cannot certify a different, more convenient curve.

## Cost pilot and fixed ladder

Run the cost pilot serially by candidate with one EOM worker. It uses $N=2$ at reception times `4` and `6`, retaining every raw certificate and history identity. Across all sixteen candidates this is `2,448` ordered-pair certificates, with `2,184` ordinary nonself roots and `264` excluded self endpoints expected by the independent theorem.

After independent pilot acceptance and a reviewed resource measurement, the proposed scientific ladder is `8/32/128`. Its complete certificate totals across all sixteen candidates are respectively `9,792`, `39,168`, and `156,672`. These are derived row counts, not runtime forecasts. An unpassed earlier rung prevents later rungs for that candidate; failures must remain visible rather than being dropped from the cohort.

Plainly: first measure the real root workload on two phases. Only then choose concurrency for the larger, already fixed census.

The root controls are tolerance `1e-8`, maximum subdivision depth `192`, maximum visited cells `300000`, and directed precision escalation `128/256/512` bits after the initial binary64 route. A visited-cell count equal to the limit is not automatically a failure; an incomplete certificate is. Disable warm-start, joint, and deferred routes for this pilot. The entire serial pilot has a 1,800-second wall ceiling, beginning before its first carrier construction and ending after final output. Each later candidate/rung has its own 1,800-second wall ceiling on the same end-to-end basis. An outer watchdog must enforce the deadline and fifteen-second heartbeat during a synchronous root call; checks only between calls are insufficient. Record wall time, CPU time, peak resident memory, output bytes, and precision escalation by candidate.

For each candidate, estimate its 128-phase wall time as `128 * max(phaseWallAt4, phaseWallAt6)`. Each phase timer includes carrier construction, independent conformance, all ordered-pair certification, and flushed output. Shared preparation and finalization are timed separately and remain inside the total pilot ceiling. A projection above 1,800 seconds returns that candidate for a separately reviewed resource plan before further work. This is a declared estimate, not a runtime guarantee. Neither the reference's eleven-second calculation nor an older diagnostic fixture determines EOM throughput.

Plainly: the cost comparison includes preparing and checking the saved curves, not just the fast part of a root call. A supervising process must still stop an overlong run.

Concurrency beyond the serial pilot is deliberately not assigned before measurement. A machine-readable dispatch plan must state the total candidate processes and total EOM worker budget, avoid nested oversubscription, and preserve candidate-specific output isolation. Any increase beyond the reviewed measured budget requires a new resource declaration before launch.

## Required result and stopping rules

Every row, including self, must be `certified_complete`, have an empty failure code, own its root-free complement, and have no `memory_boundary_contact`. Every nonself row must contain exactly one strictly positive-delay ordinary root. Both emitted transmitter and receiver factor intervals must have strictly positive lower endpoints and overlap the respective analytic interval $[1-v_{\max},1+v_{\max}]$. A conservative emitted interval may extend below the analytic lower bound; overlap, not interval containment, is the consistency test. Every self row must contain no ordinary root and explicitly own zero-delay endpoint exclusion. Its source and receiver must have identical history identity and fingerprint, and the actual inflated velocity intervals through reception must have norm strictly below one. The generic self-exclusion route does not require the narrower circular factory.

Plainly: an empty self-root list is not enough: the solver must certify that the missing roots are genuinely excluded. The permitted excluded reception endpoint is distinct from prohibited contact with the lower retained-history boundary.

The ledger must bind actual history fingerprints, exact original manifest bytes, every request control, and every raw certificate, and check the complete pair/time census. Serialize and compare root-bracket widths by exact decimal arithmetic. For a repeated candidate/reception time across rungs, require identical carrier tokens and fingerprints and overlapping corresponding root brackets; timings and other operational measurements are excluded from equality. A complete explicit `root_free_cells` list is not required where the generic self or MPFR route legitimately certifies the complement without populating that list. A separate build receipt must identify the compiled adapter, compiler, root API, EOM library, and independently frozen references.

During the serial pilot, the first failed row, source mismatch, missing identity, invalid factor, interpolation escape, unexpected root count, incomplete complement, retained-boundary contact, resource limit, or inconsistent repeated phase aborts the entire pilot; preserve the rejected packet and mark every unvisited row `not-run`. Use one-row pair calls or one-row batches and flush each result: the batch API otherwise continues after an uncertified row, and an exception can prevent delivery of partial results. During the later ladder, a scientific or candidate-local resource failure stops that candidate's remaining rungs; shared source/reference/build drift aborts the entire dispatch. Preserve every exact cause. Do not tune geometry, relax thresholds, exclude difficult members, borrow another candidate's result, or reinterpret silence as a passed check.

Plainly: the independent theorem tells us what roots must exist; the raw solver ledger must account for them without omissions. A failed numerical certificate is an instrument or representation result until its cause is determined, not a rejection of the creative geometry family.

Artifacts belong in new candidate/run directories under `.local-data/braid-analysis/abc-h3-root-pilot-20260827-v1/`. Reserve output paths create-exclusively, emit flushed progress every fifteen seconds, retain raw certificates and history bytes, and permit no worker database writes. Only the coordinator may integrate accepted receipts. No old report or output directory may be overwritten.

## Claim boundary

A passed pilot measures feasibility and verifies its two-phase ledger only. A passed fixed ladder establishes only its source-bound H3 certificate, subject to the existing gate definition and independent review. Neither establishes ordinary EOM evolution, equilibrium, binding, return, retention, stability, a score increase, particle identity, Borg approval, or physical realization. Those remain separate existing obligations.

Closure goal: bind and independently accept the shared circular-history carrier, measure the two-phase EOM pilot, and only then scale the fixed sixteen-candidate root ladder.
