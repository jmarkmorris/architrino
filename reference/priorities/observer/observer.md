# Observer Workstream

## Workstream Metadata

- Kind: `priority`
- Rank: `3`
- Value: `9`
- Cost: `4`
- ROI: `2.25`
- Status: `active`

## Directory Guide

- [app-architecture](./app-architecture.md) — overall architecture for how dedicated apps fit into the Architrino web app.
- [pdgfeed](./pdgfeed.md) — PDG-facing ingest, normalization, proposal review, and upstream request emission.
- [combo](./combo.md) — Combo app design as the request-intake, solve-review, acceptance, and Xyzzy-publication surface.
- [xyzzy](./xyzzy.md) — final authored-surface document model, tile grammar, manifest behavior, and direct object editing.
- [composer](./composer.md) — downstream observer-stage scene staging, framing, overlays, playback, and export.
- [viewports](./viewports.md) — observer-view and design-view guidance for downstream scene authoring.

## Current Cross-Doc Queue

1. [pdgfeed](./pdgfeed.md) and [combo](./combo.md): keep upstream request emission explicit, proposal-aware, and ready for Combo intake.
2. [combo](./combo.md) and [xyzzy](./xyzzy.md): freeze the accepted publication path from reviewed solve state into final `xyzzy/v1`.
3. [xyzzy](./xyzzy.md) and [composer](./composer.md): define the downstream handoff from accepted Xyzzy output into observer-stage scene work.
4. [composer](./composer.md) and [viewports](./viewports.md): finish observer framing, autoscale, overlays, and preview behavior on top of imported authored-surface content.
5. [app-architecture](./app-architecture.md): keep these boundaries contract-first and prevent shared-runtime backsliding.

## Subapp Workflow Overview

The intended pipeline is:

`pdgfeed -> combo -> xyzzy -> composer`

This is a data pipeline, not a shared-runtime pipeline. Each stage should accept explicit versioned input, do its own job, and emit explicit output for the next stage.

### Subapp Roles, Inputs, And Outputs

#### `pdgfeed`

Purpose:

- reads PDG-backed decay or channel data;
- normalizes that data into Architrino-owned proposal and request artifacts;
- and emits explicit upstream request data for Combo.

Input:

- PDG fixture data stored in the repo;
- or live PDG data through the local Python `pdg` package and local SQLite access.

Current run method:

- command line through `pdgfeed.py`.

Current CLI examples:

- `python3 pdgfeed.py list-fixtures`
- `python3 pdgfeed.py emit-fixture <fixture-id>`
- `python3 pdgfeed.py list-live-cases`
- `python3 pdgfeed.py emit-live-case <case-id>`

Output:

- proposal-review JSON artifacts for inspection;
- and explicit request JSON for Combo intake.

Visual output:

- none.

#### `combo`

Purpose:

- loads explicit solve requests;
- normalizes them into a Combo-owned solve problem;
- computes and reviews conservative candidate outcomes;
- accepts one outcome for publication;
- and publishes final `xyzzy/v1` documents.

Input:

- built-in request manifests backed by canonical fixtures;
- PDG-backed requests emitted by `pdgfeed`;
- direct load of explicit request JSON by a developer or advanced user;
- or reopened Combo work items carried by Combo-owned ids or records.

Output:

- reviewable solve results;
- accepted Combo publication state;
- final `xyzzy/v1` documents;
- and launch-ready or manifest-ready downstream publication packages.

Visual output:

- yes: Combo is the solve-and-review surface.

#### `xyzzy`

Purpose:

- renders and edits final authored-surface documents;
- provides the direct object-editing surface for assemblies, operators, splines, and composite-label effects;
- and manages manifest-driven selection of final `xyzzy/v1` documents.

Input:

- published `xyzzy/v1` documents;
- manifest-backed authored-surface selections;
- and direct surface edits to assemblies, operators, links, and composite labels.

Output:

- final `xyzzy/v1` documents with stable object ids and placements;
- explicit spline link records;
- and manifest-ready authored-surface assets for downstream staging.

Visual output:

- yes: the final tile-based authored surface.

#### `composer`

Purpose:

- stages the downstream observer-facing scene;
- turns accepted authored-surface content into framing, overlays, timing, playback, and media presentation;
- and exports scene output or recorded presentation material.

Input:

- accepted Xyzzy documents;
- or explicit downstream staging contracts derived from accepted Xyzzy output;
- plus authored scene, timing, and media data.

Output:

- composed scene JSON;
- preview state and local drafts;
- and recorded or exported observer-stage output.

Visual output:

- yes: live scene preview and final presentation-oriented output.

## Start Points

These are the practical entry workflows, with the intended audience called out for each one.

### A. Start With `pdgfeed`

Audience:

- developer
- advanced user

Use this when the source of truth is PDG data and you want to begin upstream.

Boundary rule:

- every PDG-selected case should be normalized into explicit request data before entering Combo.

Workflow:

1. Run `pdgfeed.py` from the command line.
2. Choose a built-in fixture, a built-in live PDG case, or a user-specified PDG reaction or channel.
3. Inspect the generated proposal JSON artifacts.
4. Emit an explicit request artifact for Combo intake.
5. Load that request into Combo.
6. Review candidate solve families in Combo and accept one outcome.
7. Publish the accepted result into final `xyzzy/v1`.
8. Open the published document in Xyzzy for authored-surface inspection or editing.
9. Hand accepted authored-surface content into Composer when observer-stage staging is needed.

Short form:

- choose PDG channel -> emit request -> solve and review in Combo -> publish Xyzzy -> stage in Composer.

### B. Start With `combo`

Audience:

- developer
- advanced user

Use this when you already know the request you want to solve and do not need PDG ingest first.

Boundary rule:

- Combo should consume explicit request data rather than hidden app state or inferred browser-local structure.

Workflow:

1. Open Combo.
2. Choose a built-in request, reopen a Combo work item, or load explicit request JSON.
3. Run the solve.
4. Inspect and compare the candidate families.
5. Accept one family for publication.
6. Publish the accepted result into final `xyzzy/v1`.
7. Open the published document in Xyzzy.
8. Hand accepted authored-surface content into Composer if downstream scene staging is needed.

Short form:

- choose request -> solve and review in Combo -> publish Xyzzy -> stage in Composer.

### C. Start With `xyzzy`

Audience:

- developer
- user

Use this when you want to work directly at the final authored-surface level.

Workflow:

1. Open Xyzzy.
2. Choose a manifest entry that points to a final `xyzzy/v1` document.
3. Inspect or edit assemblies, operators, links, and composite-label effects directly on the surface.
4. Save or persist the resulting authored-surface document as needed.
5. Open the accepted authored-surface content in Composer if observer-stage work is the next step.

Short form:

- open Xyzzy document -> edit authored surface -> hand downstream to Composer when needed.

### D. Start With `composer`

Audience:

- developer
- user

Use this when the immediate task is scene staging, observer framing, playback, overlays, or presentation work.

Workflow:

1. Open Composer.
2. Load accepted Xyzzy output or an explicit downstream staging contract derived from it.
3. Inspect the imported assemblies, paths, labels, and timing.
4. Adjust observer framing, overlays, media, pacing, and scene structure.
5. Preview the live visualization.
6. Export composed scene JSON or record presentation output.

Short form:

- load accepted authored-surface content -> stage in Composer -> preview -> export or record.

## Workflow Rule

If work begins from PDG data, the workflow should be:

- choose PDG reaction or channel;
- normalize it in `pdgfeed`;
- emit explicit request data;
- solve and review it in Combo;
- publish accepted output into final `xyzzy/v1`;
- inspect or refine the authored surface in Xyzzy as needed;
- and only then hand accepted authored-surface content into Composer.

That keeps flexibility high without collapsing the app boundaries.
