# Composer Remaining Work Plan

## Purpose

This note tracks what still needs to be built in Composer.

It is not a migration pitch anymore. The Composer shell, the canonical scene-document path, and the first viewport/timeline/editor hooks already exist. This note should stay focused on the unfinished work.

---

## Current Baseline

Already implemented:

- the Archie composer entry and overlay shell;
- canonical scene document generation and canonical JSON export;
- browser-local save/load library for draft scenes;
- explicit assembly authoring instead of node-count bootstrapping;
- per-assembly path authoring in the canonical document/runtime;
- path-point dragging with visible lettered point markers and larger hit targets;
- camera waypoint authoring with visible camera markers and direct dragging;
- top-bar scrub/play transport instead of the old lower transport strip;
- markers, pauses, warps, reactions, and transfer data routed through the canonical scene model;
- primary assembly shell/core preview;
- additional assembly proxies with member lists;
- explicit assembly parenting and local positioning;
- parent reassignment with local-frame rebasing so nesting does not cause immediate jumps;
- first transfer-map authoring and preview lines;
- reaction authoring from timeline context menus;
- transfer authoring from assembly-handle context menus;
- history traces and envelopes represented in the canonical document/runtime;
- compact canvas context menus and a reduced left panel;
- bridge preview through the current temporary `Scene-Diagram` host.

That baseline is good enough to stop planning Phase A or early Phase B work. The remaining plan starts after that point.

---

## Remaining Priorities

### 1. Finish the canvas-first authoring migration

The composer has moved substantially toward canvas-first authoring, but the migration is not finished.

What remains:

- keep removing controls that still live in the left panel or old form-based UI but belong on canvas objects or timeline interactions;
- keep the left panel shrinking toward scene-level controls only;
- continue moving assembly-specific actions into the assembly center-handle context menu;
- continue moving path-specific actions into path-point or empty-canvas context menus;
- keep marker picking robust:
  - preserve larger click targets,
  - preserve visible labels/icons,
  - and resolve overlap cases such as assembly centers versus nearby path anchors;
- keep the canvas gaining screen space as authoring moves out of persistent panels.

This is the immediate UX priority because it directly affects whether the composer feels like a visual instrument or like a panel-heavy transitional tool.

### 2. Real assembly structure

Assemblies exist explicitly and are now edited mostly through their center handles, but their deeper internal authoring is still incomplete.

What remains:

- canvas-first member placement inside assemblies, not just member ids in a list;
- a replacement for the old dead advanced editor paths for:
  - subassembly authoring,
  - subassembly layout,
  - per-member offsets or constituent placement;
- parent/child nesting that can show subassemblies as actual local structures rather than only grouped ids;
- assembly-level transforms beyond simple local offset where theory-facing scenes need them;
- reusable assembly presets and instance overrides.

This is what will let the composer show true subassembly organization instead of only named containers.

### 3. Reaction objects and staged choreography

Transfers and timeline-authored reactions now exist, but the choreography layer is still shallow compared with the intended scene language.

What remains:

- deepen authored `ReactionSpec` behavior on the shared timeline;
- improve grouping of transfers into named reaction stages;
- make reactants, products, and stage boundaries more explicit in the editor and preview;
- support disassembly, handoff, and reassembly as clear staged authored behavior rather than only loose transfer lines;
- keep reaction timing and editing native to the timeline UI, not pushed back into panel text forms.

This is the most important missing theory-facing layer.

### 4. Provenance and member identity through change

Stable ids and canonical provenance fields now exist, but the editor and preview still expose too little of that information.

What remains:

- record where each transferred member came from and where it ends up;
- make provenance inspectable in the editor and visible in preview;
- distinguish persistent identity from temporary proxy visuals;
- support constituent continuity across reactions and regrouping.

Without this, reaction scenes will remain visually suggestive but not rigorously traceable.

### 5. History traces and exclusion envelopes

History traces and envelopes now exist in the canonical document/runtime, but the authoring and inspection workflow still needs refinement.

What remains:

- improve UI authoring for `historyTraces`;
- refine rendering and controls for path-history traces with window and fade semantics;
- improve UI authoring and editing for `envelopes` for shell/exclusion geometry;
- connect those displays to the delayed/path-history model rather than treating them as generic effects.

These are theory-critical and should not remain placeholders for too long.

### 6. Camera and editorial depth

The timeline exists and transport has been consolidated into the top scrub bar, but the editorial layer is still light.

What remains:

- real camera shot objects, not only waypoint paths and guide previews;
- shot transitions and follow/framing behavior in the canonical runtime;
- overlays and callouts on tracks;
- track ordering and clip-level editorial control;
- section-level time-warp authoring that reads as a first-class timeline feature rather than textarea-only configuration;
- finish stabilizing top-bar playback behavior so play, pause, restart, cue navigation, and scrubbing all behave consistently.
- tighten the current image/video overlay rectangle so the interaction boundary really hugs the visible item rather than extending wider as a transparent box;
- improve image/video asset entry so authors can browse or pick from a repo file tree in addition to direct typing or paste;
- simplify numeric timing entry:
  - make it easier to replace an entire existing value without awkward manual cursor work,
  - and present timings at tenths of a second in the UI rather than carrying more precision than authors usually need.

This is what will turn the current preview player into an authored sequence editor.

### 7. Workspace reorganization

The current UI is more compact than before, but it is still transitional.

What remains:

- keep the central viewport dominant;
- avoid reintroducing large persistent assembly-detail panels;
- continue turning repeated text-entry flows into structured or direct-manipulation authoring where that improves clarity;
- decide which minimal scene-level controls remain in the left panel versus the canvas menu or timeline;
- only add a right-side inspector if it stays lightweight and does not undo the canvas-first direction.

This is a usability pass, not the core runtime blocker.

### 8. Validation and persistence

The browser-local library is useful for drafts, but it is not the final persistence model.

What remains:

- structural validation for assemblies, transfers, reactions, and references;
- lint for malformed ids, missing members, impossible parent chains, and invalid transfer endpoints;
- repo-facing save path for authored scenes and reusable assemblies;
- library semantics for reusable motifs, presets, and overrides.

Draft persistence is solved. Authoritative content persistence is not.

---

## Recommended Order

### Next

1. Finish the canvas-first authoring migration.
2. Member-level placement and subassembly structure.
3. Reaction objects with staged transfer choreography.

### After that

1. Provenance visualization.
2. History traces and exclusion envelopes.
3. Native composed-animation runtime.
4. Camera/editorial depth.

### Later

1. Workspace reorganization.
2. Repo-facing save/library model.
3. Strong validation and lint.

---

## Stop Conditions

Composer should not be considered complete until it can do all of the following in one authored scene:

- multiple explicit assemblies and subassemblies;
- constituent continuity through at least one staged reaction;
- visible transfer/provenance semantics;
- path-history and exclusion-envelope rendering;
- canvas-first authoring for the key assembly/path/reaction interactions without dependence on a large detail panel;
- direct canonical runtime playback without the temporary bridge.

That is the remaining target.
