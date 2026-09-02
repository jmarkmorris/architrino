# Operations Work Queue

This is the canonical execution ledger for repo-wide deployment, hosting, cost, reliability, release, and public-app operations.

## Ranked Next Objects

1. `borg_record_byte_identity` — Status: `Awaiting verification`.
2. `deployment_budget_contract` — Status: `Queued`.

## Queued task records

- **OPS-001 — `deployment_budget_contract`.** Define `deployment-budget.v1` for bundle, transfer, browser heap/GPU/storage, Actions artifacts, generated output, and separately reported EOM throughput; apply it first to Borg. **Completion:** one measured contract is consumed by Borg without merging hosting and solver budgets.

## In progress

No rows.

## Awaiting verification

- **OPS-013 — `borg_record_byte_identity`.** The duration-scaled position grid collapses all 145 historical macOS/Ubuntu record pairs to byte identity, current regeneration passes 145-of-145 registry and collection hashes, and both Content Integrity and Pages now fail before upload on any mismatch. **Remaining verification:** pass the current branch on the GitHub Ubuntu Pages runner, deploy through the ordinary verified `main` workflow, confirm 145-of-145 public hashes, and load representative exact records in Borg.

## Verified

No rows.
