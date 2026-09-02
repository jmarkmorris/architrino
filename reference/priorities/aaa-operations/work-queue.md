# Operations Work Queue

This is the canonical execution ledger for repo-wide deployment, hosting, cost, reliability, release, and public-app operations.

## Ranked Next Objects

1. `borg_record_byte_identity` — Status: `Queued`.
2. `deployment_budget_contract` — Status: `Queued`.

## Queued task records

- **OPS-013 — `borg_record_byte_identity`.** Resolve the platform-dependent numeric serialization that makes 143 of 145 deployed Borg record files disagree with the exact `recordSha256` values in their deployed registry. **Completion:** the same source generates portable sealed bytes, the Pages build rejects registry/record disagreement before publication, all 145 live records match their deployed registry hashes, and representative exact-record loading passes in Borg.
- **OPS-001 — `deployment_budget_contract`.** Define `deployment-budget.v1` for bundle, transfer, browser heap/GPU/storage, Actions artifacts, generated output, and separately reported EOM throughput; apply it first to Borg. **Completion:** one measured contract is consumed by Borg without merging hosting and solver budgets.

## In progress

No rows.

## Awaiting verification

No rows.

## Verified

No rows.
