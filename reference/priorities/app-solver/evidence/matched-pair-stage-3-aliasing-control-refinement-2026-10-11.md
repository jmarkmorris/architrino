# Aliasing Control, Refinement Cross-Check — 2026-10-11

This note supplements the [aliasing control receipt](matched-pair-stage-3-aliasing-control-receipt-2026-10-11.md), whose bytes are unchanged. It answers one question about the instruments: do the exact-rational bracket and the solver describe the same problem? If the bracket had a wrong sign, geometry or change of variable, the solver would disagree with it at every step size and the exclusion reported in the receipt would say nothing about aliasing. The check runs the same control with steps short enough to resolve the source's motion and compares the published end state with the same bracket. Every instance uses $c_f=1$.

## Runs

The driver is [matched-pair-stage-3-aliasing-control-v2.cpp](matched-pair-stage-3-aliasing-control-v2.cpp), SHA-256 prefix `978a3e0dcbe7bd50`. It differs from the receipt's driver only by an optional end-time argument, an echoed end-time field and a larger step-attempt limit; its pinned step-2 output equals the receipt's run 6 in every field apart from the added one. It links the same library, compiled as in the receipt. Inputs are the receipt's, with coupling $0.001$, root and acceleration tolerances $10^{-7}$, end time $2$, and initial, minimum and maximum step equal to the stated step. The runs executed under the owned-compute supervisor with exit status 0 and closed process groups. Outputs are concatenated in [matched-pair-stage-3-aliasing-control-refinement-runs.jsonl](matched-pair-stage-3-aliasing-control-refinement-runs.jsonl), SHA-256 prefix `50ed469812e16a9e`.

| Amplitude | Step | Result | Receiver end velocity | Receiver end position |
| --- | --- | --- | --- | --- |
| $0$ | $1/64$ | Known case. Completed, 128 accepted steps. | $[-1.999997333380,\,-1.999997333258]\times10^{-5}$ | $[-1.999998666710,\,-1.999998666587]\times10^{-5}$ |
| $0.2$ | $1/32$ | **Retained failure.** Halted at $t=0.84375$ after 27 accepted steps, `minimum_step_exhausted`; the next step's velocity discrepancy was $1.19\times10^{-8}$, above the tolerance $10^{-8}$. | — | — |
| $0.2$ | $1/64$ | Completed, 128 accepted steps. | $[-1.9627776,\,-1.9589650]\times10^{-5}$ | $[-1.7681011,\,-1.7653327]\times10^{-5}$ |
| $0.2$ | $1/128$ | Completed, 256 accepted steps. | $[-1.9613459,\,-1.9603964]\times10^{-5}$ | $[-1.7670251,\,-1.7663353]\times10^{-5}$ |
| $0.2$ | $2$, pinned | The receipt's run 6, repeated. | $[-2.0000920,\,-2.0000460]\times10^{-5}$ | $[-2.0000613,\,-2.0000153]\times10^{-5}$ |

## Comparison

The frozen bracket instrument, SHA-256 prefix `e822aea060538e98`, was applied with the interval length set to the end time; its output is [matched-pair-stage-3-aliasing-control-refinement-bound-output.txt](matched-pair-stage-3-aliasing-control-refinement-bound-output.txt). The instrument reads the interval length from the record's step field, so the records were copied with that field set to $2$ and the substep size kept under another name. A first invocation on the unconverted records used the substep size as the interval length and produced a meaningless comparison; that output is retained locally as `misapplied-bound-output-h-from-step.txt` and is not evidence.

The true brackets at $t=2$ are $[-1.9634236,\,-1.9583208]\times10^{-5}$ for velocity and $[-1.7681221,\,-1.7652198]\times10^{-5}$ for position. Both fine-step runs publish intervals that lie inside those brackets, and their midpoints, $-1.96087\times10^{-5}$ in velocity, agree with the fixed-receiver value $-\kappa hI=-1.96087\times10^{-5}$ to the digits shown. The static fine-step interval contains the second-order analytic value $-1.9999973333\times10^{-5}$. The pinned step-2 interval is disjoint from the bracket and from both fine-step intervals.

## What this establishes and what it does not

**Claim grade: measured**, by the driver and library above on the five runs listed. When the step resolves the source's motion, the solver and the bracket agree; when the step's nodes alias the source's period, the solver publishes a narrower interval somewhere else. That supports reading the receipt's exclusion as an effect of the step's alignment and not of an error in the bracket.

It is not independent evidence that the bracket is right: refinement agreement is the solver agreeing with itself, and the bracket's correctness rests on its two derived bounds and on review. It also does not show that fine-step tubes are enclosures. The fine-step intervals lie inside the bracket here, and nothing proves they must contain the true state. Falsifier for the note's reading: a fine-step run from these inputs whose published interval is disjoint from the bracket.
