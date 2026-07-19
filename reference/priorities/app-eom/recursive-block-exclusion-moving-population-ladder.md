# Recursive Block Exclusion Moving-Population Ladder

## Status

- Packet id: `eom_recursive_block_exclusion_moving_population_ladder/v0`
- Date opened: 2026-07-16
- Claim level: `derived-and-measured-bounded-cpu-evidence`
- Implementation status: `complete-for-declared-moving-population-ladder`
- Production authority: none
- Parent packet:
  [recursive-block-exclusion-first-path.md](recursive-block-exclusion-first-path.md)
- Evidence:
  [eom-recursive-block-exclusion-moving-population-apple-m3-2026-07-16.md](evidence/eom-recursive-block-exclusion-moving-population-apple-m3-2026-07-16.md)

## Closure Target

Measure the existing deterministic recursive causal index on accepted
nonstationary retained histories without changing its exclusion implication,
relationship accounting, exact-fallback rule, or prohibited-approximation
boundary. The round succeeds only if moving sparse populations retain complete
pair accounting, independent exclusion correctness, deterministic membership,
and a measured wall-time advantage over exhaustive exact certification where
that control fits the declared envelope.

## Moving-History Fixture Contract

Every receiver and source path has a continuous accepted retained history with
nonzero velocity over the searched interval. The primary ladder uses distinct
linear histories, which are exact degree-one members of the existing
piecewise-cubic representation. Receiver and source velocities vary by path so
the block position hulls and exact causal residuals genuinely depend on
emission time; a translated stationary population does not satisfy this
packet.

The sparse fixture contains a small causally active moving source band and a
far moving root-free population. Its root block must be inconclusive, forcing
recursive receiver, source, and emission subdivision before the index can
separate exclusions from complete exact fallback. The dense fixture keeps the
declared leaf population inconclusive and must either send all relationships
to exact fallback or reject the population at resource preflight.

## Unchanged Correctness Boundary

- Build authoritative bounds only from histories explicitly marked accepted.
- Account for every ordered receiver-transmitter relationship, including self-pairs
  when receiver and source membership share an identity.
- Preserve
  `logical = excluded + exact + enclosed + unresolved`, with `enclosed = 0`
  for this path and `unresolved = 0` before acceptance.
- If any emission cell survives exclusion, search that pair's complete
  declared retained interval exactly.
- Preserve causal ordering and the canonical coincident-endpoint convention.
- Treat every inconclusive block by subdivision, exact fallback, or unresolved
  rejection.
- Do not add a distance cutoff, sampled-residual decision, neighbor rule,
  density assumption, active aggregation, multipole, or other approximation.

## Independent Validation

Use the independently authored decimal-interval and exact-pair oracle without
modifying it. On a nested small moving population:

- expand every `excluded` block into its covered ordered pairs and emission
  interval;
- require the decimal oracle to certify zero roots for every expanded row;
- require at least one independently certified active root among the pairs
  promoted to exact fallback;
- include moving coincident geometry and a moving same-history self-pair in the
  retained regression set;
- require byte-identical membership and accounting across repeated runs and
  the permitted exact-batch thread counts.

## Performance Ladder

Rebuild before measurement and record source, library, and binary times. Run
moving sparse populations at $N=128$, $512$, $2{,}048$, and $10{,}000$, with a
declared 90-second wall and 2 GiB resident-memory ceiling for the final stage.
Time the complete path: recursive traversal plus complete exact certification
of every fallback pair.

Run matched one-thread exhaustive exact-pair controls at $N=128$ and $512$,
then stop exhaustive evaluation when its declared one-million-pair ceiling is
exceeded. Report wall seconds, logical pairs, visited blocks, excluded pairs,
exact fallback pairs, exclusion ratio, exact-search reduction, peak resident
memory, seconds per logical pair, membership fingerprint, and complete-path
speedup.

Run the moving dense control at $N=128$ and $512$, then apply the same
one-million-pair preflight at $N=2{,}048$. Stop the dense ladder at the first
resource rejection and do not launch a later dense stage.

Long runs emit a heartbeat and remain observed. Cost conclusions come only
from matched end-to-end wall timing.

## Stop Conditions And Falsifiers

Stop without weakening the certificate if an independently detected root lies
in an excluded moving block, pair accounting overlaps or omits membership, an
accepted result has nonzero unresolved membership, the moving sparse complete
path fails to outperform matched exhaustive certification, or the declared
wall or memory ceiling is exceeded.

Correctness is overturned by any such observation or by any difference in
membership under a repeated permitted schedule. Performance is overturned if
the matched moving sparse advantage disappears under the declared repeat
protocol. No result from this packet establishes arbitrary accelerating-
history, million-path, GPU, distributed, or production-evolution performance.

## Deliverables

- scoped moving-population benchmark fixtures and tests;
- a focused evidence record under `evidence/`;
- a concise dated [work-log.md](work-log.md) entry;
- measured sparse and dense moving-population ladders;
- claim grades and explicit falsifiers.
