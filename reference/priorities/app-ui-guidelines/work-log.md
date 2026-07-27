# App UI Guidelines Work Log

This file is the chronological work log for the `app-ui-guidelines` priority area. Use it for dated agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use `brainstorming.md` for provisional ideas, insights, conceptual maps, and draft app-facing guidance. Use `priorities.md` for strategy, status, blockers, and promotion routing, and use `work-queue.md` for accepted executable tasks and their local order. Keep focused standards, app specs, and requirement notes in their own sibling files when they need a stable structure.

## Log Entries

### 2026-07-21 - Canonical transport controls

- Accepted `Play`, `Pause`, `First frame`, `Rewind`, `Reset`, and `Stop` as the canonical transport-control set.
- Added one shared SVG/presentation runtime and migrated Borg, Animator, Causal Delay Feedback, Ideal Braid, and Photon away from local paths, CSS drawings, and text glyphs.
- Preserved the distinction between transport Reset and camera, preset, or parameter resets.
- Promoted the durable visual and interaction rule into the reader-facing UI guide; retained the implementation contract and migration inventory in [transport-controls.md](transport-controls.md).
- Focused app/runtime validation passed 230 tests. Browser checks exercised Play/Pause state changes in all five migrated apps and found no console errors; Borg's new two-stroke Pause presentation was visually inspected.
- Scene-graph and textbook reading-copy checks passed. Strict content validation reached one unrelated generated-index warning for the concurrently added `content/markdown/aaa/noether-braid/braid-taxonomy.md`; this batch did not regenerate another agent's index work.
