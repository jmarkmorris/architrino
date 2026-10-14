# Stage 3 Increment 1: Cost Measurement of the Serial Validated Driver — 2026-10-12

The [evolution design](../analysis/matched-pair-stage-3-evolution-design.md) left open what a validated step costs, and asked whether pair grouping should be attempted before that was measured. This receipt records a first measurement on the corrected live bytes of the [version 3 receipt](matched-pair-stage-3-increment-1-v3-receipt-2026-10-12.md). It is a timing of one machine and one build, and it changes no solver file. Every instance uses $c_f=1$.

## Instrument

[matched-pair-stage-3-increment-1-cost-probe.cpp](matched-pair-stage-3-increment-1-cost-probe.cpp) calls the library's public evolution entry point only and times it with a monotonic clock. It was compiled separately with the library's own flags and linked against the live version 3 build library `ff9207c0f7053da3…`. Its known case runs first: 16 steps of $1/128$ on two static paths must complete, accept exactly 16 steps and end at exactly $0.125$, or the program exits before any timing. It passed in both runs.

Populations are $N$ static exact histories on $[-20,0]$ on one axis at $0,1,2,\dots$ with charges alternating $+1,-1$, coupling $1/1000$, step $1/128$, increment budgets $10^{-8}$. Every run completed with no refusal and two enclosure iterations per step. The program ran twice in sequence under the owned-compute supervisor while other sessions were active on the machine, so the figures carry that noise; both runs are given. Outputs: [run 1](matched-pair-stage-3-increment-1-v3/cost-probe-run-1.jsonl), [run 2](matched-pair-stage-3-increment-1-v3/cost-probe-run-2.jsonl).

A first version of the probe spaced the paths 10 apart, so with three or more paths the farthest pair sat exactly at the edge of the retained past and every such run was refused on the lower sign with nothing published. That was a mistake in the probe's population, not in the driver. Those outputs are retained under `.tmp/eom-matched-pair/cost-probe/first-run-spacing-error/` and are not used.

## Measured

**Population size, 16 steps each.**

| Paths | Wall time per accepted step, run 1 | Run 2 |
| --- | --- | --- |
| 2 | 2.7 ms | 2.5 ms |
| 3 | 4.9 ms | 4.3 ms |
| 4 | 9.0 ms | 6.3 ms |
| 8 | 35.5 ms | 17.8 ms |
| 16 | 61.0 ms | 55.8 ms |

**History length, two paths.**

| Steps timed | Wall time per accepted step, run 1 | Run 2 |
| --- | --- | --- |
| First 16 | 2.6 ms | 2.5 ms |
| All of the first 240 | 18.6 ms | 17.9 ms |
| 16 steps after 240 generated segments | 38.7 ms | 38.0 ms |
| All of the first 496 | 36.4 ms | 37.2 ms |
| 16 steps after 496 generated segments | 79.6 ms | 143.2 ms |

The total for 240 steps was 4.5 s and 4.3 s; for 496 steps 18.0 s and 18.4 s. Doubling the number of steps multiplied the total by about four.

**Where the time goes.** A stack sample of the 496-step run, five seconds at one-millisecond intervals, has 3361 of its 4028 top-of-stack samples, 83 percent, in the SHA-256 routine: [excerpt](matched-pair-stage-3-increment-1-v3/cost-probe-sample-top-of-stack.txt). The driver and producer recompute the content chain of every whole history at every step, to bind the evidence to exactly the content supplied.

## Reading

**Measured:** the cost of a validated step grows in proportion to the number of segments already retained, so a run's total cost grows as the square of its step count. **Inferred**, from the stack sample: the growth is bookkeeping, the repeated whole-history content digest, and not the enclosure arithmetic. The enclosure arithmetic is the part visible at the start of a run: about 2.5 ms per step for two paths.

Two consequences.

- As built, increment 1 is correct on the cases checked and impractical for long runs. A content chain that extends by one record per accepted step, in place of a digest of the whole history, would remove the quadratic term. That changes how the accepted evidence unit computes its chain, so it is a design decision for the reviewer and the operator and belongs naturally with the persistence increment, whose integrity chain has the same shape. It is not done here.
- The size table does not isolate a per-pair cost. Between 2 and 16 paths the ordered pair count grows 120 times and the step time about 23 times, so per-path overhead dominates at these sizes. A measurement of grouping in increment 2 should compare the same population with and without grouping, not rely on this table.

**What this does not establish.** Nothing about the ordinary evolution carrier, which was not timed; nothing about moving populations, retries or larger sizes; and no cost of grouping, which is not built. Timings were taken with other work running and can move by tens of percent, as the two runs show. Falsifier for the main reading: a rerun in which the per-step time after 496 segments is not several times the per-step time at the start, or a stack sample of a long run that is not dominated by the digest.
