# PDG Workstream

## Workstream Metadata

- Kind: `priority`
- Rank: `3`
- Value: `9`
- Cost: `4`
- ROI: `2.25`
- Status: `active`

## Task Queue

1. `pdgsolve_pdgedit_publication_seam` — Freeze the accepted-family translation path so pdgsolve emits final `pdgedit/v1` documents, manifest entries, and launch payloads without pdgedit-side reconstruction. Status: `active`. Depends on: none.
2. `launcher_and_boundary_cleanup` — Add `pdgsolve` and `pdgedit` to standalone launch routing, thin `app.js`, and keep new app behavior inside `src/apps/*` instead of the shared root. Status: `active`. Depends on: none.
3. `pdgfeed_request_surface` — Keep `pdgfeed` explicit, frozen-manifest based, and relocated out of the repo root behind a compatibility shim. Status: `active`. Depends on: none.
4. `pdgedit_to_pdgview_handoff` — Freeze the downstream contract from accepted `pdgedit/v1` output into `pdgview` import, framing, preview, and export coverage. Status: `next`. Depends on: `pdgsolve_pdgedit_publication_seam`.
5. `regression_and_enforcement` — Expand contract fixtures, standalone boot smoke tests, and boundary checks so shared-runtime backsliding becomes harder to land than to avoid. Status: `active`. Depends on: `pdgsolve_pdgedit_publication_seam`, `launcher_and_boundary_cleanup`, `pdgfeed_request_surface`, `pdgedit_to_pdgview_handoff`.

## Scope

This workstream owns the forward app split

`pdgfeed -> pdgsolve -> pdgedit -> pdgview`

as one product with explicit versioned data boundaries between stages.

The active job is not to invent a different pipeline. It is to harden the accepted-record publication seam, launcher boundaries, and downstream handoff around the now-real dedicated `pdgsolve` and `pdgedit` apps while keeping `pdgfeed` explicit upstream, `pdgview` explicit downstream, and `app.js` on a path toward launcher-only ownership.

## Directory Guide

- [pdgapps](./pdgapps.md) — overall architecture for how dedicated apps fit into the Architrino web app.
- [pdgfeed](./pdgfeed.md) — PDG-facing ingest, normalization, proposal review, and upstream request emission.
- [pdgsolve](./pdgsolve.md) — pdgsolve app design as the request-intake, solve-review, acceptance, and pdgedit-publication surface.
- [pdgedit](./pdgedit.md) — final authored-surface document model, tile grammar, manifest behavior, and direct object editing.
- [pdgview](./pdgview.md) — downstream observer-stage scene staging, framing, overlays, playback, and export.

## Current State

- `src/contracts/` plus `content/contracts/examples/` now carry the request, result, acceptance, publication-graph, package, pdgedit library-manifest, and `pdgedit/v1` schemas and fixtures that freeze the shared JSON denominator across the PDG chain.
- `pdgedit.html` plus `src/apps/pdgedit/main.js` now boot the authored surface directly, while the catalog-review harness stays isolated under `src/apps/pdgedit/review/`; the manifest picker, home control, fixed-column strip, spline rendering, composite labels, and direct object editing now live under `src/apps/pdgedit/`.
- `pdgsolve.html` plus `src/apps/pdgsolve/main.js` now boot a dedicated solve-and-review app that loads frozen corpus requests, `pdgfeed`-emitted requests, direct JSON requests, and reopened acceptance records; it runs deterministic v1 family search, presents ranked families, locks accepted records, and derives downstream `pdgedit` previews from the accepted solve graph.
- `src/apps/navigator/StandaloneAppLaunchRuntime.js` still only knows `pdgview`, and `src/apps/pdgview/main.js` still imports `app.js`, so launcher cleanup and full dedicated-app routing remain open.
- `PdgsolvePdgeditPublicationRuntime.js` still needs the durable publish location, manifest-entry write path, and launch payload handoff that freeze the accepted `pdgsolve -> pdgedit` seam without browser-local reconstruction.
- `pdgfeed.py` already emits proposal and request artifacts and already has fixture/live-case regression coverage, but the implementation still lives at the repo root and is still the caller-facing entrypoint.

## Development Plan

### 1. Freeze The `pdgsolve -> pdgedit` Publication Seam

- Keep `src/apps/pdgsolve/PdgsolvePdgeditPublicationRuntime.js` and the recipe catalog as the only translation boundary from accepted solve graphs into final `pdgedit/v1`.
- Add durable publish handling that writes one final pdgedit document plus one manifest entry, and add launch handling that opens pdgedit with that exact in-memory document.
- Decide one durable library location for solver-published pdgedit assets so solver output can appear in the same manifest-driven picker without mixing raw solver payloads into pdgedit.
- Keep reverse flow limited to reopen-by-pdgsolve-owned reference; do not treat arbitrary `pdgedit/v1` documents as solver inputs.
- Exit criterion: only accepted pdgsolve records can publish, publication never reruns search, and pdgedit never reconstructs solver meaning from partial data.

### 2. Finish Launcher And Architecture Cleanup Around The New Apps

- Extend `src/apps/navigator/StandaloneAppLaunchRuntime.js` beyond `pdgview` so the main app can route cleanly into `pdgsolve` and `pdgedit`.
- Add dedicated HTML entrypoints and independent boot paths for `pdgsolve`, `pdgedit`, and the already-existing `pdgview` runtime family.
- Keep new app logic under `src/apps/pdgsolve/`, `src/apps/pdgedit/`, and `src/apps/pdgview/`; do not add new app-specific behavior back into `app.js`.
- Continue pushing pdgview off `app.js` so the main web app becomes launcher/discovery shell only, consistent with [pdgapps](./pdgapps.md).
- Exit criterion: each dedicated app boots independently and the main app launches them without shared live runtime coupling.

### 3. Keep Upstream And Downstream Neighbors In Lockstep

- Move the real `pdgfeed.py` implementation under a PDG-owned scripts location while preserving a root compatibility shim until callers migrate.
- Keep frozen-manifest generation as the stable batch surface for PDG support and let pdgsolve consume that stable denominator rather than ad hoc case discovery.
- Land pdgview-side accepted-pdgedit import coverage, observer framing, and preview/export fixtures against the same accepted downstream contract.
- Exit criterion: the whole `pdgfeed -> pdgsolve -> pdgedit -> pdgview` chain can be exercised through fixtures and contracts without direct cross-app runtime imports.

### 4. Put Regression And Boundary Enforcement On The Critical Path

- Add standalone boot smoke tests for `pdgsolve`, `pdgedit`, and `pdgview`.
- Expand contract and fixture tests around request emission, solve results, accepted records, publication graphs, publication packages, pdgedit documents, manifests, and downstream pdgview imports.
- Tighten boundary checks so direct cross-app runtime imports and shared-root backsliding fail quickly.
- Exit criterion: contract drift or boundary regressions fail in automated checks rather than surfacing later during manual review.

## Subapp Workflow Overview

The intended pipeline is:

`pdgfeed -> pdgsolve -> pdgedit -> pdgview`

This is a data pipeline, not a shared-runtime pipeline. Each stage should accept explicit versioned input, do its own job, and emit explicit output for the next stage.

### Subapp Roles, Inputs, And Outputs

#### `pdgfeed`

Purpose:

- reads PDG-backed decay or channel data;
- normalizes that data into Architrino-owned proposal and request artifacts;
- and emits explicit upstream request data for pdgsolve.

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
- and explicit request JSON for pdgsolve intake.

Visual output:

- none.

#### `pdgsolve`

Purpose:

- loads explicit solve requests;
- normalizes them into a pdgsolve-owned solve problem;
- computes and reviews conservative candidate outcomes;
- accepts one outcome for publication;
- and publishes final `pdgedit/v1` documents.

Input:

- built-in request manifests backed by canonical fixtures;
- PDG-backed requests emitted by `pdgfeed`;
- direct load of explicit request JSON by a developer or advanced user;
- or reopened pdgsolve work items carried by pdgsolve-owned ids or records.

Output:

- reviewable solve results;
- accepted pdgsolve publication state;
- final `pdgedit/v1` documents;
- and launch-ready or manifest-ready downstream publication packages.

Visual output:

- yes: pdgsolve is the solve-and-review surface.

#### `pdgedit`

Purpose:

- renders and edits final authored-surface documents;
- provides the direct object-editing surface for assemblies, operators, splines, and composite-label effects;
- and manages manifest-driven selection of final `pdgedit/v1` documents.

Input:

- published `pdgedit/v1` documents;
- manifest-backed authored-surface selections;
- and direct surface edits to assemblies, operators, links, and composite labels.

Output:

- final `pdgedit/v1` documents with stable object ids and placements;
- explicit spline link records;
- and manifest-ready authored-surface assets for downstream staging.

Visual output:

- yes: the final tile-based authored surface.

#### `pdgview`

Purpose:

- stages the downstream observer-facing scene;
- turns accepted authored-surface content into framing, overlays, timing, playback, and media presentation;
- and exports scene output or recorded presentation material.

Input:

- accepted pdgedit documents;
- or explicit downstream staging contracts derived from accepted pdgedit output;
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

- every PDG-selected case should be normalized into explicit request data before entering pdgsolve.

Workflow:

1. Run `pdgfeed.py` from the command line.
2. Choose a built-in fixture, a built-in live PDG case, or a user-specified PDG reaction or channel.
3. Inspect the generated proposal JSON artifacts.
4. Emit an explicit request artifact for pdgsolve intake.
5. Load that request into pdgsolve.
6. Review candidate solve families in pdgsolve and accept one outcome.
7. Publish the accepted result into final `pdgedit/v1`.
8. Open the published document in pdgedit for authored-surface inspection or editing.
9. Hand accepted authored-surface content into pdgview when observer-stage staging is needed.

Short form:

- choose PDG channel -> emit request -> solve and review in pdgsolve -> publish pdgedit -> stage in pdgview.

### B. Start With `pdgsolve`

Audience:

- developer
- advanced user

Use this when you already know the request you want to solve and do not need PDG ingest first.

Boundary rule:

- pdgsolve should consume explicit request data rather than hidden app state or inferred browser-local structure.

Workflow:

1. Open pdgsolve.
2. Choose a built-in request, reopen a pdgsolve work item, or load explicit request JSON.
3. Run the solve.
4. Inspect and compare the candidate families.
5. Accept one family for publication.
6. Publish the accepted result into final `pdgedit/v1`.
7. Open the published document in pdgedit.
8. Hand accepted authored-surface content into pdgview if downstream scene staging is needed.

Short form:

- choose request -> solve and review in pdgsolve -> publish pdgedit -> stage in pdgview.

### C. Start With `pdgedit`

Audience:

- developer
- user

Use this when you want to work directly at the final authored-surface level.

Workflow:

1. Open pdgedit.
2. Choose a manifest entry that points to a final `pdgedit/v1` document.
3. Inspect or edit assemblies, operators, links, and composite-label effects directly on the surface.
4. Save or persist the resulting authored-surface document as needed.
5. Open the accepted authored-surface content in pdgview if observer-stage work is the next step.

Short form:

- open pdgedit document -> edit authored surface -> hand downstream to pdgview when needed.

### D. Start With `pdgview`

Audience:

- developer
- user

Use this when the immediate task is scene staging, observer framing, playback, overlays, or presentation work.

Workflow:

1. Open pdgview.
2. Load accepted pdgedit output or an explicit downstream staging contract derived from it.
3. Inspect the imported assemblies, paths, labels, and timing.
4. Adjust observer framing, overlays, media, pacing, and scene structure.
5. Preview the live visualization.
6. Export composed scene JSON or record presentation output.

Short form:

- load accepted authored-surface content -> stage in pdgview -> preview -> export or record.

## Workflow Rule

If work begins from PDG data, the workflow should be:

- choose PDG reaction or channel;
- normalize it in `pdgfeed`;
- emit explicit request data;
- solve and review it in pdgsolve;
- publish accepted output into final `pdgedit/v1`;
- inspect or refine the authored surface in pdgedit as needed;
- and only then hand accepted authored-surface content into pdgview.

That keeps flexibility high without collapsing the app boundaries.
