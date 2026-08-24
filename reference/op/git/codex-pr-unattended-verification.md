# Codex PR Unattended-Execution Verification

This ledger measures the closed-loop acceptance requirement defined by [codex-pr-branch.md](codex-pr-branch.md). It records real completed PR lifecycles only. Tests, dry runs, simulations, and partial handoffs do not qualify.

## Status

- Corrective-action status: `open`
- Required consecutive qualifying runs: `3`
- Current consecutive qualifying runs: `0`
- Closure rule: do not mark this correction closed until three consecutive completed two-handoff lifecycles meet the zero/zero prompt budget and retain complete permission counters in both receipts.

## Counter Contract

Each handoff records:

- `operatorDecisionPromptCount`;
- `hostPermissionPromptCount`;
- `escalationInvocationCount`; and
- `reusedApprovalCount`.

`hostPermissionPromptCount: unknown` requires verification for advancement and does not qualify as zero. The count may come from host telemetry or an operator observation retained with the handoff receipt; do not ask for a separate third handoff only to collect it. A mandatory safety stop is excluded rather than passed. Any interactive operator decision prompt, interactive host permission prompt, unknown prompt count, missing counter, or false unattended claim resets the consecutive qualifying count to zero.

## Baseline Recurrence

| Date | PR | Completed branch | Successor | Observation | Verdict |
| --- | ---: | --- | --- | --- | --- |
| 2026-07-23 | 225 | `codex/diamond` | `codex/beryl` | Operator observed roughly ten host permission prompts; the transcript contains at least nineteen escalation-bearing lifecycle calls, and the exact first/second-handoff split was not retained. | `nonqualifying-baseline`; consecutive count `0` |

## Consecutive Verification Runs

Record exact integers for every counter. Do not replace an unobserved host prompt count with zero.

| Run | Date | PR | Completed branch | Successor | First handoff counters | Second handoff counters | Lifecycle evidence | Verdict |
| ---: | --- | ---: | --- | --- | --- | --- | --- | --- |
| 1 | pending | — | — | — | pending | pending | pending | `pending` |
| 2 | pending | — | — | — | pending | pending | pending | `pending` |
| 3 | pending | — | — | — | pending | pending | pending | `pending` |

For each qualifying row, `Lifecycle evidence` must identify the ready PR URL, reviewed `headRefOid`, publication base SHA, local and remote validation state, merge commit, synchronized `main` SHA, retired branch, and published successor branch.
