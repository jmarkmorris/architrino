# Open Problems Work Queue

This is the canonical execution ledger for the deployed “Solving the Crisis” paper and its claim controls.

## Ranked Next Objects

1. `claim_level_audit` — [OP-001](#op-001--claim-level-audit). Status: `Queued`.
2. `test_contracts` — [OP-002](#op-002--test-contracts). Status: `Queued`.
3. `paper_skeleton` — [OP-003](#op-003--paper-skeleton). Status: `In progress`.

## Queued

### OP-001 — Claim-level audit

- **Status:** Queued
- **Priority object:** `claim_level_audit`
- **Request / acceptance:** Classify every chapter as `architecture-ready`, `direction-ready`, `appendix-watch`, or `exclude-for-now`; demote any chapter without a native mechanism.
- **Evidence / blocker:** The deployed paper shell exists.
- **Completion:** Every chapter has exactly one classification and an owner for any unresolved scientific burden.

### OP-002 — Test contracts

- **Status:** Queued
- **Priority object:** `test_contracts`
- **Request / acceptance:** Attach a recovery target, source family, observable, simulation variable, or falsifier to every architecture-ready chapter.
- **Evidence / blocker:** Depends on OP-001.
- **Completion:** Any chapter without a defensible test surface is demoted.

## In progress

### OP-003 — Paper skeleton

- **Status:** In progress
- **Priority object:** `paper_skeleton`
- **Request / acceptance:** Maintain the deployed draft as a readable technical-paper shell while scientific proof and source work remain with their owners.
- **Evidence / blocker:** Maintenance cannot outrank OP-001 or OP-002.
- **Completion:** The deployed draft reflects accepted classifications and test contracts without importing priority-only claims.

## Awaiting verification

No rows.

## Verified

No rows.
