# App UI Guidelines Work Log

This file is the chronological work log for the `app-ui-guidelines` priority area. Use it for dated agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use `brainstorming.md` for provisional ideas, insights, conceptual maps, and draft app-facing guidance. Use `priorities.md` for strategy, status, blockers, and promotion routing, and use `work-queue.md` for accepted executable tasks and their local order. Keep focused standards, app specs, and requirement notes in their own sibling files when they need a stable structure.

## Log Entries

### 2026-09-01 — Page exception policy accepted

- Closed UI-006 by assigning one disposition to every current non-full-standard surface class in [top-dynamic-control-bar.md](top-dynamic-control-bar.md).
- Classified `website-stats.html` as a lightweight public-utility header and `solver-gpu-harness.html` as a lightweight developer-harness header. Both retain compact Home navigation while utility, benchmark, and diagnostic controls remain local.
- Classified `pdgedit-review.html` and children's-book review outputs as exempt review artifacts, generated textbook reading copies as exempt generated content, and the iOS `ReaderShell.html` and `SearchSnippetShell.html` mounts as native-shell parity surfaces owned by SwiftUI navigation.
- Recorded explicit promotion triggers so an exception cannot silently become public product chrome. All other public interactive apps and workbenches in the current surface audit remain full-standard migration targets.
- Claim boundary: this closes the page-classification policy only. It does not implement lightweight headers, migrate a full-standard surface, or establish that any currently partial surface already conforms.
- Validation passed: priority-rank alignment, `git diff --check`, strict content validation, and strict scene-graph checking all completed without errors or warnings.

### 2026-07-21 - Canonical transport controls

- Accepted `Play`, `Pause`, `First frame`, `Rewind`, `Reset`, and `Stop` as the canonical transport-control set.
- Added one shared SVG/presentation runtime and migrated Borg, Animator, Causal Delay Feedback, Ideal Braid, and Photon away from local paths, CSS drawings, and text glyphs.
- Preserved the distinction between transport Reset and camera, preset, or parameter resets.
- Promoted the durable visual and interaction rule into the reader-facing UI guide; retained the implementation contract and migration inventory in [transport-controls.md](transport-controls.md).
- Focused app/runtime validation passed 230 tests. Browser checks exercised Play/Pause state changes in all five migrated apps and found no console errors; Borg's new two-stroke Pause presentation was visually inspected.
- Scene-graph and textbook reading-copy checks passed. Strict content validation reached one unrelated generated-index warning for the concurrently added `content/markdown/aaa/noether-braid/braid-taxonomy.md`; this batch did not regenerate another agent's index work.
