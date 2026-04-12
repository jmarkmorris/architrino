# PDG Workstream

## Workstream Metadata

- Kind: `priority`
- Rank: `3`
- Value: `9`
- Cost: `4`
- ROI: `2.25`
- Status: `active`

## Task Queue

1. `regression_and_enforcement` — Expand contract test cases, standalone boot smoke tests, and boundary checks so shared-runtime backsliding becomes harder to land than to avoid. Status: `active`. Depends on: none.

## Scope

This workstream owns the forward app split

`pdgfeed -> pdgsolve -> pdgedit -> pdgview`

as one product with explicit versioned data boundaries between stages.

Within that split, higher-scale composite language should be handled only at the boundaries:

- upstream boundary translation may expand composite or PDG-facing terms into explicit assembly-native request data before pdgsolve;
- pdgsolve core remains assembly-native only;
- and downstream publication or staging may collapse explicit accepted assemblies back into composite/grouping language only after solve.

The active job is not to invent a different pipeline. It is to keep hardening launcher boundaries, upstream request handling, and downstream handoff around the now-real dedicated `pdgsolve` and `pdgedit` apps while keeping the accepted-record publication seam frozen, `pdgfeed` explicit upstream, `pdgview` explicit downstream, and `app.js` on a path toward launcher-only ownership.

## Directory Guide

- [pdgapps](./pdgapps.md) — overall architecture for how dedicated apps fit into the Architrino web app.
- [pdgfeed](./pdgfeed.md) — PDG-facing ingest, normalization, proposal review, and upstream request emission.
- [pdgsolve](./pdgsolve.md) — pdgsolve app design as the request-intake, solve-review, acceptance, and pdgedit-publication surface.
- [pdgedit](./pdgedit.md) — final authored-surface document model, tile grammar, manifest behavior, and direct object editing.
- [pdgview](./pdgview.md) — downstream observer-stage scene staging, framing, overlays, playback, and export.

## Current State

- `src/contracts/` plus `content/contracts/examples/` now carry the request, result, acceptance, publication-graph, package, pdgedit library-manifest, and `pdgedit/v1` schemas and test cases that freeze the shared JSON denominator across the PDG chain.
- `pdgedit.html` plus `src/apps/pdgedit/main.js` now boot the authored surface directly, while the catalog-review harness stays isolated under `src/apps/pdgedit/review/`; the manifest picker, home control, fixed-column strip, spline rendering, composite labels, and direct object editing now live under `src/apps/pdgedit/`.
- `pdgsolve.html` plus `src/apps/pdgsolve/main.js` now boot a dedicated solve-and-review app that loads explicit request URLs, pdgfeed-manifest requests, direct JSON requests, and reopened acceptance records; it runs deterministic v1 family search, presents ranked families, locks accepted records, and derives downstream `pdgedit` previews from the accepted solve graph.
- `src/apps/pdgsolve/PdgsolvePdgeditPublicationRuntime.js` now freezes accepted-record publication into final `pdgedit/v1` documents, durable manifest-entry upserts, and pdgedit launch payloads; `pdgedit` consumes those launch payloads as explicit final documents instead of reconstructing solver meaning.
- `content/contracts/examples/pdgedit/manifest.v1.json` now includes solver-published final pdgedit documents in the same manifest-driven picker without admitting raw solver request/result payloads into pdgedit.
- `src/apps/navigator/StandaloneAppLaunchRuntime.js` now routes `pdgview`, `pdgsolve`, and `pdgedit` into dedicated standalone HTML entrypoints; the main Applications scene carries launcher scene stubs for all three, root `app.js` is thin entry glue, and `src/apps/pdgview/main.js` now enters through the app-owned scene-shell module instead of importing the root entrypoint.
- `scripts/pdg/pdgfeed.py` now owns the PDG feed implementation, and root `pdgfeed.py` delegates CLI and Python module entry into it.
- `src/contracts/pdgview-staging/v1/schema.json` and `src/apps/pdgview/PdgviewPdgeditImportRuntime.js` now freeze accepted `pdgedit/v1` import into pdgview-owned staging, observer framing, preview, and export data without importing pdgsolve or pdgedit app runtimes.

## Development Plan

### 1. Put Regression And Boundary Enforcement On The Critical Path

- Add standalone boot smoke tests for `pdgsolve`, `pdgedit`, and `pdgview`.
- Expand contract validation and test cases around request emission, solve results, accepted records, publication graphs, publication packages, pdgedit documents, manifests, and downstream pdgview imports.
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
- normalizes that data into Architrino-owned proposal artifacts plus explicit assembly-native request artifacts;
- expands admitted higher-scale source terms into explicit assemblies before solver handoff;
- and emits explicit upstream request data for pdgsolve.

Input:

- PDG test reaction data stored in the repo;
- or PDG reaction data through the local Python `pdg` package and local SQLite access.

Current run method:

- command line through root `pdgfeed.py`, or directly through `scripts/pdg/pdgfeed.py`.

Current CLI examples:

- `python3 pdgfeed.py list --source pdg-test-reactions`
- `python3 pdgfeed.py proposal <reaction-id> --source pdg-test-reactions`
- `python3 pdgfeed.py request <reaction-id> --source pdg-test-reactions`
- `python3 pdgfeed.py manifest`

Output:

- proposal-review JSON artifacts for inspection;
- and explicit assembly-native request JSON for pdgsolve intake.

Visual output:

- none.

#### `pdgsolve`

Purpose:

- loads explicit solve requests;
- normalizes them into a pdgsolve-owned solve problem expressed only in explicit assemblies;
- computes and reviews conservative candidate outcomes;
- accepts one outcome for publication;
- and publishes final `pdgedit/v1` documents.

Input:

- built-in request manifests backed by canonical PDG test reactions;
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
- explicit composite-label/grouping records for downstream display only;
- and manifest-ready authored-surface assets for downstream staging.

Visual output:

- yes: the final tile-based authored surface.

#### `pdgview`

Purpose:

- stages the downstream observer-facing scene;
- turns accepted authored-surface content into framing, overlays, timing, playback, and media presentation;
- may add observer-facing grouping or composite language over explicit assemblies after import;
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
2. Choose a PDG test reaction or a user-specified PDG reaction or channel.
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
