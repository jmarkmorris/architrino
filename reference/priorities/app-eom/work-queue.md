# EOM Work Queue

This is the canonical execution ledger for accepted app-EOM work. `priorities.md` remains the strategic program; this file tracks concrete implementation and verification items.

## Next real work

`EOM-001` — refresh or redesign the Master-EOM binding receipt.

## Awaiting verification

No rows.

## In progress

No rows.

## Queued

### EOM-001 — Master-EOM binding hash drift

- **Status:** Queued
- **Source:** [Borg code review A1](../app-borg/borg-code-review-2026-07-24.md)
- **Request / acceptance:** Repair the app-EOM provenance binding so the declared Master Equation source snapshot and recorded digest remain synchronized under an explicit owning procedure. Either refresh the binding through that procedure or replace the repeatedly drifting whole-document pin with a stable, explicitly owned source snapshot and enforced update rule.
- **Current evidence:** `reference/priorities/app-eom/master-eom-binding-v1.md` pins `9ec3045d316bcbcc60dc3e61fcfaad4642b83af857024856f6684364ef7cab4d`, while the live `content/markdown/aaa/dynamics/master-equation.md` currently hashes to `f1ae1137484b7c5367eb094ad49a0bfdfb72161d21aa06556de4e0ba2d99d72c`. `tests/borg-eom-migration.test.js:492-516` therefore leaves the Borg family at 164/165.
- **Boundary:** This is an app-EOM provenance-contract repair, not a Borg runtime regression or an acceptance claim for solver output.
- **Completion:** The recorded digest equals a fresh SHA-256 of its declared source under the adopted binding rule, and `node --test tests/borg-*.test.js` passes 165/165.

## Verified

No rows.

## Superseded / withdrawn

No rows.
