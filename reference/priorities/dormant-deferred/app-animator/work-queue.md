# Animator Work Queue

This is the canonical execution ledger for accepted Animator work. [priorities.md](priorities.md) owns product direction; [brainstorming.md](brainstorming.md) holds uncommitted ideas.

## Rules

1. Keep accepted, testable tasks here and rank live objects by marginal ROI.
2. Use the standard lifecycle states and require focused validation before verification.
3. Preserve one Animator-owned runtime and canonical structure path.

## Ranked Next Objects

1. `runtime_cutover` — [ANIM-001](#anim-001--runtime-cutover). Status: `In progress`.
2. `observer_framing_ui` — [ANIM-002](#anim-002--observer-framing-ui). Status: `In progress`.
3. `timeline_observer_audio` — [ANIM-003](#anim-003--timeline-observer-and-audio). Status: `Queued`.
4. `canonical_structure_transforms` — [ANIM-004](#anim-004--canonical-structure-transforms). Status: `Queued`.

## In progress

### ANIM-001 — Runtime cutover

- **Status:** In progress
- **Priority object:** `runtime_cutover`
- **Request / acceptance:** Move remaining scene-shell behavior into the Animator-owned bootstrap and runtime without restoring root `app.js` as feature logic.
- **Evidence / blocker:** The entrypoint is thin, but substantial behavior remains in the shared scene-shell runtime.
- **Completion:** Animator owns the complete runtime path and focused interaction/regression checks pass.

### ANIM-002 — Observer framing UI

- **Status:** In progress
- **Priority object:** `observer_framing_ui`
- **Request / acceptance:** Let authors directly set and inspect framing intent, required or optional targets, autoscale behavior, and imported observer hints.
- **Evidence / blocker:** Framing math exists; compact author-facing controls do not.
- **Completion:** Authored framing round-trips through the canonical document and passes focused UI checks.

## Queued

### ANIM-003 — Timeline Observer and Audio

- **Status:** Queued
- **Priority object:** `timeline_observer_audio`
- **Request / acceptance:** Make `Observer` a real timeline object and either implement `Audio` as a real authored object or remove its placeholder insertion path.
- **Evidence / blocker:** Depends on ANIM-002.
- **Completion:** No placeholder block can enter an authored document.

### ANIM-004 — Canonical structure transforms

- **Status:** Queued
- **Priority object:** `canonical_structure_transforms`
- **Request / acceptance:** Route structure reads and edits through one canonical model so nesting, scale, and transfer staging remain coherent.
- **Evidence / blocker:** Depends on ANIM-001.
- **Completion:** Targeted authoring flows no longer rely on animator-local structural mutations.

## Verified

### ANIM-005 — Recorded EOM playback

- **Status:** Verified
- **Priority object:** `simulation_mode`
- **Request / acceptance:** Close the Animator recorded-output surface, provenance display, fail-closed handoff, and production-solver separation in [simulation-mode.md](simulation-mode.md).
- **Evidence:** Animator has no solve controls or JavaScript production-solver bridge; the versioned handoff pins the record and validates EOM, model, engine, run, claim, evidence, and completion identity; focused positive and stale/incompatible tests pass.
- **Completion:** Borg initiates or inspects supported runs, Animator displays accepted recorded output, and `src/eom` remains the sole production solver.

## Superseded / withdrawn

No rows.
