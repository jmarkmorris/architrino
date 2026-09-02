# Operations Work Queue

This is the canonical execution ledger for repo-wide deployment, hosting, cost, reliability, release, and public-app operations.

## Ranked Next Objects

1. `deployment_budget_contract` — Status: `Queued`.

## Queued task records

- **OPS-001 — `deployment_budget_contract`.** Define `deployment-budget.v1` for bundle, transfer, browser heap/GPU/storage, Actions artifacts, generated output, and separately reported EOM throughput; apply it first to Borg. **Completion:** one measured contract is consumed by Borg without merging hosting and solver budgets.

## In progress

No rows.

## Awaiting verification

- **OPS-009 — `incident_and_rollback_runbook`.** The runbook, isolated last-known-good reconstruction, same-environment byte repeatability, and communication-field test pass. **Remaining verification:** one controlled full Actions re-run must deploy and pass public identity checks; the 91-byte cross-environment drift across 40 generated Borg records needs an owning disposition before byte-parity can be claimed.

## Verified

No rows.
