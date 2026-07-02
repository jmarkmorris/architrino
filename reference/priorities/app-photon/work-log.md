# App Photon Work Log

This file is the chronological work log for the `app-photon` priority area. Use it for dated agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use `brainstorming.md` for provisional ideas, insights, conceptual maps, and draft corpus-promotable text when this priority area has one. Use the main priority tracker in this directory for the compact current queue, blockers, promotion routing, and next action. Keep focused proof packets, certificates, app specs, and requirement notes in their own sibling files when they need a stable structure.

## Log Entries

### 2026-07-02 Moving-Circular Native Row Production

Resumed the paused Photon #1 solver-row work after the priority-directory split and kept the live tracker concise. Current branch state already carries the fourth-pass implementation: Photon remains the app-level constrained source-history provider, while the central solver C ABI owns moving-circular source-root rows, source velocity rows, source phase-at-hit rows, observer-field contribution rows, and observer-field summary rows when WebAssembly is loaded.

Verification recorded for the completed row-production pass: `node scripts/build-solver-smoke.mjs native`, `node --test tests/photon-runtime.test.js`, `node scripts/check-solver-wasm-bridge.mjs`, `node scripts/check-solver-app-bridge.mjs`, `node scripts/check-solver-contract-fixtures.mjs`, and `git diff --check`.

The current blocker is no longer source-to-observer native row production. The next app-photon solver action is to promote the helical same-source moving-circular facade into native/WASM ABI row production and then deepen rejected-root reasons for same-source rows.

### 2026-07-02 Photon Guide Promotion Note

Migrated from `photon-app.md` so the app tracker keeps current implementation and queue material separate from promotion history.

Promotion note: the named preset descriptions, Virtual Observer branch-sum equations, and analyzer-fit formulas have been promoted into the reader-facing Photon Guide. The remaining app-specific control ranges, verification checklist, and open work queue stay priority-only.
