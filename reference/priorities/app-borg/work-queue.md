# Borg Work Queue

This is the canonical execution ledger for accepted Borg work. `priorities.md` owns strategic ranking and rationale; `brainstorming.md` holds uncommitted ideas. A task enters this file only when it has an explicit acceptance outcome and an execution owner can take it.

## Rules

1. Promote a brainstorm item here only when it becomes an accepted, testable task; remove the promoted task from `brainstorming.md` in the same edit.
2. Keep the strategic priority in `priorities.md`, but do not duplicate changing status or evidence there.
3. Use `Queued`, `In progress`, `Awaiting verification`, `Verified`, `Superseded`, or `Withdrawn` as the lifecycle states.
4. Move a task to `Verified` only after its stated validation and any required operator acceptance.

## Next real work

`BORG-001` — native wake-history and boundary-residual fixture.

## Awaiting verification

No rows.

## In progress

No rows.

## Queued

### BORG-001 — Native wake history and boundary residuals

- **Status:** Queued
- **Priority source:** `native_wake_history_and_boundary_residual_fixture` in [priorities](priorities.md)
- **Request / acceptance:** Extend the EOM contracts and native implementation so Borg receives retained wake/interaction rows, row-conservation counts, boundary-to-central residual rows, and required acceleration-contribution diagnostics. The app must consume these as EOM-owned data; no app-local physics or visual tuning may replace missing rows.
- **Evidence / blocker:** Native EOM and bridge capability work is required. Until these rows exist, replay-affected values remain fail-closed or display-only.
- **Completion:** Contract, native implementation, bridge schema, focused validation fixtures, and Borg consumer coverage pass; any learner/operator surface requiring these values is verified against current EOM output.

### BORG-002 — Assembly-viewer record-contract carriers

- **Status:** Queued
- **Priority source:** `assembly_viewer_replay_mode` in [priorities](priorities.md)
- **Request / acceptance:** Close the remaining record-contract carriers needed for Borg’s record-only assembly-view replay: ratified comparison time/unit transforms, an external collection carrier, required field-speed carrier, and spin/polarity-dipole vectors. Borg must consume sealed records and must not invent missing carriers.
- **Evidence / blocker:** Blocked on the Braid Program instrument-gate schema action.
- **Completion:** Required carriers are ratified and available in sealed records; record-only replay preserves its no-run/no-mutation boundary and passes focused/browser checks.

### BORG-003 — Velocity-scale sampling evidence

- **Status:** Queued
- **Priority source:** `velocity_scale_sampling_research` in [priorities](priorities.md)
- **Request / acceptance:** Produce measured velocity-scale-aware boundary-shell replay sampling evidence across the declared range using EOM-run rows, under the existing velocity-sampling protocol.
- **Evidence / blocker:** Depends on BORG-001 retained wake/history and residual rows. Affected boundary replay output remains display-only or fail-closed until measured evidence exists.
- **Completion:** Declared calibration and holdout evidence is produced with the protocol’s residual, tail-mass, correlation, seed-variance, patch-replay, and central-ball contribution checks.

### BORG-004 — Assembly Explorer disposition

- **Status:** Queued
- **Priority source:** `assembly_explorer_surface_disposition` in [priorities](priorities.md)
- **Request / acceptance:** Decide whether the standalone Assembly Explorer can be retired or redirected after Borg replay reaches the declared parity for raw-record navigation, source ordering, optional source-carried $S_3$ grouping, and source-carried search diagnostics.
- **Evidence / blocker:** Depends on BORG-002.
- **Completion:** A documented disposition is accepted and any authorized retirement or redirect work is verified without losing the required replay capabilities.

### BORG-005 — Borg runtime decomposition

- **Status:** Queued
- **Source:** [Borg code review, A2](borg-code-review-2026-07-24.md)
- **Request / acceptance:** Decompose `BorgAppRuntime.js` into focused modules behind a behavior-preserving composition root. Preserve simulation/replay boundaries, authority labels, transport behavior, diagnostics, and current browser interaction.
- **Evidence / blocker:** `BorgAppRuntime.js` is 4,235 lines and rebuilds source/diagnostic rows after chunks. This is maintainability debt, not a measured performance or solver-correctness failure.
- **Completion:** The extraction preserves behavior, focused Borg tests and browser interaction pass, and any performance assertion is supported by a separate profile.

## Verified

No rows.

## Superseded / withdrawn

No rows.
