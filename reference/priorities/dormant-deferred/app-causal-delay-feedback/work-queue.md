# Causal Delay Feedback Work Queue

This file tracks unresolved learner-facing Causal Delay Feedback work only. The immediate implementation lane is closed.

## Rules

1. Add a row only for a new operator-directed request or a reproducible current regression.
2. Use `Queued`, `In progress`, or `Awaiting verification` while work remains.
3. Require focused tests and any relevant current served-browser confirmation before calling work verified.
4. After verification, promote durable copy, architecture, interaction, or claim-boundary decisions into [v1-product-requirements.md](v1-product-requirements.md), then remove the row.
5. Keep routine fixes, superseded proposals, withdrawn ideas, and detailed verification narratives in Git history.

## Open Work

None.

## Safe Resume State

- Live surface: eight lessons followed by Laboratory.
- Accepted copy and durable requirements: [v1-product-requirements.md](v1-product-requirements.md).
- Active implementation owner: none.
- Pending operator visual acceptance: none.
- Solver task: none. The app can display a supplied recorded EOM dataset but does not run the EOM solver.
- Evidence boundary: all app fixtures, recorded-path display, local previews, and browser proofs remain display-only.

Plainly: a future agent should start from a new request or demonstrated regression, not reconstruct the completed CDF-001 through CDF-066 micro-fix history.
