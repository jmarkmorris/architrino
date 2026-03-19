# Composer Remaining Work Plan

## Purpose

This note tracks what still needs to be built in Composer.

It is not a migration pitch anymore. The Composer shell, the `composer-II` document path, and the first viewport/timeline/editor hooks already exist. This note should stay focused on the unfinished work.

---

## Current Baseline

Already implemented:

- the Archie composer entry and overlay shell;
- canonical `composer-II` scene document generation and canonical JSON export;
- browser-local save/load library for draft scenes;
- explicit assembly authoring instead of node-count bootstrapping;
- path editing, frame editing, camera waypoint authoring, timing lists, and scrub/play transport;
- primary assembly shell/core preview;
- additional assembly proxies with member lists;
- explicit assembly parenting and local positioning;
- first transfer-map authoring and preview lines;
- bridge preview through the current temporary `Scene-Diagram` host.

That baseline is good enough to stop planning Phase A or early Phase B work. The remaining plan starts after that point.

---

## Remaining Priorities

### 1. Native composed-animation runtime

The current preview still depends on a bridge `Scene-Diagram` scene.

What remains:

- add a dedicated composed-animation runtime boundary;
- make preview play the canonical document directly instead of converting through the temporary bridge;
- decide when the current host scene should stop pretending to be `Scene-Diagram` and become an explicit composed-animation or tool scene.

This is the next architectural threshold. Until this exists, preview semantics will keep carrying bridge compromises.

### 2. Real assembly structure

Assemblies now exist explicitly, but their internal structure is still shallow outside the primary shell/core demonstration.

What remains:

- explicit constituent placement inside assemblies, not just member ids in a list;
- parent/child nesting that can show subassemblies as actual local structures;
- assembly-level transforms beyond simple local offset;
- reusable assembly presets and instance overrides.

This is what will let the composer show true subassembly organization instead of only named containers.

### 3. Reaction objects and staged choreography

Transfers exist, but reactions do not yet exist as first-class authored objects.

What remains:

- introduce authored `ReactionSpec` objects on the shared timeline;
- group transfers into named reaction stages;
- define reactants, products, and stage boundaries explicitly;
- support disassembly, handoff, and reassembly as staged authored behavior rather than loose transfer lines;
- surface reaction timing in the timeline UI.

This is the most important missing theory-facing layer.

### 4. Provenance and member identity through change

Stable ids now exist, but provenance is still only lightly represented.

What remains:

- record where each transferred member came from and where it ends up;
- make provenance inspectable in the editor and visible in preview;
- distinguish persistent identity from temporary proxy visuals;
- support constituent continuity across reactions and regrouping.

Without this, reaction scenes will remain visually suggestive but not rigorously traceable.

### 5. History traces and exclusion envelopes

Schema hooks exist, but the viewport/editor still does not author or render these as real AAA structures.

What remains:

- author `historyTraces` in the UI;
- render path-history traces with window and fade semantics;
- author and render `envelopes` for shell/exclusion geometry;
- connect those displays to the delayed/path-history model rather than treating them as generic effects.

These are theory-critical and should not remain placeholders for too long.

### 6. Camera and editorial depth

The timeline exists, but the editorial layer is still light.

What remains:

- real camera shot objects, not only waypoint paths and guide previews;
- shot transitions and follow/framing behavior in the canonical runtime;
- overlays and callouts on tracks;
- track ordering and clip-level editorial control;
- section-level time-warp authoring that reads as a first-class timeline feature rather than textarea-only configuration.

This is what will turn the current preview player into an authored sequence editor.

### 7. Workspace reorganization

The current UI is usable, but it is still a transitional layout.

What remains:

- move toward a stable workspace grammar:
  - top context bar;
  - left structure rail;
  - central viewport;
  - right inspector;
  - bottom timeline;
- reduce remaining text-heavy controls in favor of visual authoring where possible;
- shift freeform textarea authoring toward structured list/item editors where that improves clarity.

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

1. Native composed-animation runtime.
2. Reaction objects with staged transfer choreography.
3. Member-level placement and subassembly structure.

### After that

1. Provenance visualization.
2. History traces and exclusion envelopes.
3. Camera/editorial depth.

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
- direct canonical runtime playback without the temporary bridge.

That is the remaining target.
