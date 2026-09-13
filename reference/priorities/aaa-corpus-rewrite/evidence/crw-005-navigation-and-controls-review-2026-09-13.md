# CRW-005 Navigation and Controls review — 2026-09-13

Full 164-line review of [Navigation and Controls](../../../../content/markdown/aaa/archie/navigation-and-controls.md) and the bounded implementation passages below. Three factual corrections and one related precision improvement were made by the coordinator. Final source SHA-256 by `shasum -a 256`: `bb4ff055ede1f2763077e98f4b674608c13b862a25e38288eed774d5504e1064`.

- **NAV-01, medium, repaired:** Ordinary wheel input does not trigger scene zoom: `src/runtime/InteractionRuntime.js` lines 205–223 returns unless Ctrl is pressed. The guide now names Ctrl-wheel; the two-pointer pinch and drag descriptions match lines 120–202.
- **NAV-02, medium, repaired:** Document actions belong to the panel header, as directly inspected in `index.html` lines 105–176. Three obsolete references to global controls now identify that header, consistent with UI Guidelines.
- **NAV-03, low, repaired:** PDF action calls the browser print dialog in `src/runtime/MarkdownRuntime.js` lines 639–649. The guide now explains choosing a PDF destination rather than implying direct file export.
- **NAV-04, low, repaired:** Layout toggling switches between one column and the configured preferred count; the same runtime lines 630–636 permits two or three. The guide now names the configured multi-column mode; its separate two-column reading explanation remains valid in that mode.

The full source was read before editing. Scoped status was empty before edits; `git diff --check HEAD -- content/markdown/aaa/archie/navigation-and-controls.md` passes afterwards. A basename search in `scripts/config`, `content/graph` and the campaign evidence located scene-graph references and the historical term-lookup/conversion receipts; these are preserved. Generated content remains untouched. Both local guide links are unchanged and their targets were read during this campaign. No mathematical expressions, equations, or identifiers needed correction.

Unchanged controls were checked against concrete implementations: the persistent glossary action in `ArchitrinoSceneAppRuntime.js` lines 338–344; search shortcuts and first-result activation in `SceneSearchUiRuntime.js` lines 26–80; element navigation input exclusions and mini-map routing in `ElementNavigationRuntime.js` lines 310–350. Existing scene, history, section and two-column explanations retain their bounded reader-guide role.

This is source/DOM inspection, not browser interaction or an application-wide behavioral test. A change to the inspected event guard, action placement, print handler or layout toggle would reopen its corresponding finding. Joined content validation belongs to coordinator integration; no runtime or policy was edited.
