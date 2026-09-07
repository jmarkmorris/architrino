# Codex PR Unattended-Execution Verification

This ledger recorded the closed-loop acceptance requirement for unattended execution of the lifecycle defined by [codex-pr-branch.md](codex-pr-branch.md). The corrective action is closed. The document is retained as the evidence record of how it closed, and it is no longer an open obligation on any handoff.

## Status

- Corrective-action status: `closed` on 2026-09-05 by operator disposition.
- Basis for closure: the operator confirmed that the standard instruction issued to Codex is now `run codex-pr-branch.md` followed by `merged, continue`, and that the lifecycle pauses only at PR review. The objective is satisfied in practice.
- Closure route actually used: operator acceptance, not the three-run measurement below. Do not describe this correction as verified by measurement.

## Claim Boundary

The original closure rule required three consecutive completed two-handoff lifecycles meeting the zero/zero prompt budget with complete permission counters in both receipts. That rule was never satisfied. No run, qualifying or not, was recorded between the 2026-07-23 baseline and the closure date, so the lifecycles completed in that window are unmeasured rather than passed. An absent record is not evidence of a qualifying run, and these lifecycles must not be reconstructed after the fact from memory or from a later receipt.

What closed this correction is the operator's observation that the intended workflow now runs as intended. What remains unestablished is the measured prompt budget of any individual lifecycle. Both statements are true and neither substitutes for the other.

The falsifier is direct: if a routine `run codex-pr-branch.md` or `merged, continue` invocation again produces interactive operator decision prompts or host permission prompts on the healthy path, this correction should reopen, and the counters defined under [Permission measurement](codex-pr-branch.md#permission-measurement) become the instrument for diagnosing it.

## Counter Contract

The four counters remain defined under [Permission measurement](codex-pr-branch.md#permission-measurement), which owns their names and meanings, and the handoff receipts in that procedure continue to carry them. They are diagnostic instrumentation for the lifecycle. With this correction closed, they no longer feed a consecutive-run acceptance count, and no handoff is blocked or invalidated by an `unknown` host prompt count.

## Historical Record

The single measured observation, retained as the baseline that motivated the correction:

| Date | PR | Completed branch | Successor | Observation | Verdict |
| --- | ---: | --- | --- | --- | --- |
| 2026-07-23 | 225 | `codex/diamond` | `codex/beryl` | Operator observed roughly ten host permission prompts; the transcript contains at least nineteen escalation-bearing lifecycle calls, and the exact first/second-handoff split was not retained. | `nonqualifying-baseline` |

The three consecutive verification runs required by the original rule were never recorded. Their table is removed rather than left showing three pending rows, which would misrepresent a closed correction as awaiting evidence.
