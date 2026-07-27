# Recursive Block Exclusion Accelerating-Population Ladder

## Status

- Packet id: `eom_recursive_block_exclusion_accelerating_population_ladder/v0`
- Date opened: 2026-07-16
- Claim level: `derived-and-measured-bounded-cpu-evidence`
- Implementation status: `complete-for-declared-accelerating-population-ladder`
- Production authority: none
- Parent packet:
  [recursive-block-exclusion-moving-population-ladder.md](recursive-block-exclusion-moving-population-ladder.md)
- Evidence:
  [eom-recursive-block-exclusion-accelerating-population-apple-m3-2026-07-16.md](evidence/eom-recursive-block-exclusion-accelerating-population-apple-m3-2026-07-16.md)

## Closure Target

Measure the unchanged deterministic recursive causal index on accepted
accelerating piecewise-cubic retained histories. The round succeeds only if
the joined histories retain complete pair accounting, independent exclusion
correctness, deterministic membership, full-interval exact fallback, and a
measured sparse wall-time advantage over exhaustive exact certification where
the control fits the declared envelope.

## Accelerating-History Fixture Contract

Every receiver and source path contains two contiguous cubic segments over
$[0,1]$ and $[1,2]$. Position and velocity agree exactly at the join. Every
segment has a nonzero quadratic or cubic position coefficient, so no path is
stationary or merely linear. Receiver and source coefficients vary by path,
and the second segment changes the acceleration polynomial rather than
repeating the first segment.

The sparse fixture contains a small causally active accelerating source band
and a far accelerating root-free population. Its root node must remain
inconclusive and force deterministic receiver, source, and emission
subdivision. The dense fixture must remain noncompressible through the leaf
policy and route every admitted relationship to exact fallback or reject the
population at resource preflight.

## Unchanged Correctness And Approximation Boundary

- Build authoritative bounds only from histories explicitly marked accepted.
- Account for every ordered receiver-transmitter relationship, including self-pairs
  when receiver and source membership share an identity.
- Preserve
  `logical = excluded + exact + enclosed + unresolved`, with `enclosed = 0`
  for this path and `unresolved = 0` before acceptance.
- If any emission cell survives exclusion, search that pair's complete
  retained interval, including both sides of the segment join, exactly.
- Preserve causal ordering and the canonical coincident-endpoint convention.
- Treat every inconclusive block by subdivision, exact fallback, or unresolved
  rejection.
- Do not add a distance cutoff, sampled-residual decision, neighbor rule,
  density assumption, active aggregation, multipole, or other approximation.

## Independent Validation

Use the independently authored decimal interval and exact-pair oracle without
modifying it. On a nested small accelerating population:

- expand every `excluded` node into its ordered pairs and emission interval;
- require the decimal oracle to certify zero roots for every expanded row;
- require at least one independently certified active root among exact-
  fallback pairs over the complete $[0,2]$ interval;
- require at least one excluded or exact search interval to cross the segment
  join at $S=1$;
- retain coincident geometry and accelerating same-history self-pair controls;
- require identical membership and accounting under repeated runs and the
  permitted exact-batch thread counts.

## Performance Ladder

Rebuild before measurement and record source, library, and binary times. Run
accelerating sparse populations at $N=128$, $512$, $2{,}048$, and $10{,}000$.
The final stage has a declared 120-second wall and 2 GiB resident-memory
ceiling. Time traversal plus complete exact certification of every fallback
pair.

Run matched one-thread exhaustive controls at $N=128$ and $512$, then stop
exhaustive evaluation above its declared one-million-pair ceiling. Report wall
seconds, logical pairs, visited blocks, excluded pairs, exact fallback pairs,
exclusion ratio, exact-search reduction, peak resident memory, seconds per
logical pair, membership fingerprint, and complete-path speedup.

Run the accelerating dense control at $N=128$ and $512$, then apply the same
one-million-pair preflight at $N=2{,}048$. Stop the dense ladder at the first
resource rejection. Long runs emit heartbeats and remain observed. Cost claims
come only from matched end-to-end wall timing.

## Stop Conditions And Falsifiers

Stop without weakening the certificate if an independently detected root lies
in an excluded accelerating block, accounting overlaps or omits membership,
an accepted result has nonzero unresolved membership, a retained-history join
is not continuous, the sparse complete path fails to outperform matched
exhaustive certification, or the declared wall or memory ceiling is exceeded.

Correctness is overturned by any such observation or by any permitted-
schedule membership difference. Performance is overturned if the matched
sparse advantage disappears under the declared repeat protocol. This packet
cannot establish arbitrary evolved-history, million-path, GPU, distributed,
active-aggregation, or production-evolution performance.

## Deliverables

- scoped accelerating benchmark fixtures and tests;
- a focused evidence record under `evidence/`;
- a concise dated [work-log.md](work-log.md) entry;
- measured sparse and dense accelerating-population ladders;
- claim grades and explicit falsifiers.
