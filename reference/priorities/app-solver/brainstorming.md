# App Solver Brainstorming

This file preserves ideas and insights that are working toward promotion to an existing or new document or app.

## Routing Rules

- Keep loose solver ideas here until they have a concrete promotion target, claim level, and owner.
- Promote material into [priorities.md](priorities.md) only when it becomes a queue item, contract change, app task, validation target, or document/app destination.
- Keep speculative notes claim-limited and identify the existing or new document or app they may support.

## Ideas And Insights

### Dynamo Team Insights Mining

- Solver-side state model: the central solver should be able to represent the current state as a retained history object, active and inactive causal-root ledger, regulator state, and branch-strength rows rather than only instantaneous positions and velocities. Promote into [priorities.md](priorities.md) only if the existing bridge contract lacks fields needed by a live retained-history proof or simulation packet.
- Root-bifurcation diagnostic idea: near self-hit thresholds, solver output should expose root creation, root merger, Jacobian-floor loss, and branch identity changes as first-class diagnostics. Keep priority-only until a current simulation or proof packet names the exact rows it needs.
- Finite-memory pruning idea: when a stable assembly behaves as a finite-memory object, the solver should report the memory cutoff, omitted-tail bound, and failure code if the tail is still dynamically significant. This is a contract candidate, not a default runtime change.
