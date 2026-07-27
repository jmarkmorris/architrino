# Animator

## LLM Instructions

- Keep `Task Queue` ordered as the current work queue, with the most important active item first.
- Keep [design-and-interfaces.md](design-and-interfaces.md) descriptive and stable; move task-shaped material into `Task Queue`.
- Keep animator focused on staging, observer work, overlays, playback, and scene output.
- Do not restate upstream ingest or solve plans here except where animator must interface with imported authored material.
- Keep cross-app handoff details brief here and prefer the contract-owning document when it exists.
- Keep cross-cutting app-boundary and modularity doctrine in the broader architecture notes; keep only animator-specific seams and boundaries here.

## Workstream Metadata

- Kind: `priority`
- Rank: `14`
- Value: `6.43`
- Cost: `4.3`
- ROI: `1.50`
- Status: `active`

## Purpose

Animator is the animation authoring surface for visualizing architrino assemblies.

Its job is to turn authored scene material into a staged scene with:

- assemblies and paths;
- reaction timing;
- observer motion and framing;
- overlays and supporting media;
- playback behavior;
- and repo-ready scene output.

It owns:

- spatial staging and choreography;
- observer-facing framing and autoscale behavior;
- explanatory overlays and media presentation;
- scene editing, preview, persistence, and export;
- and the final authored visual language of the composed scene.

It does not own:

- upstream ingest or solve workflows;
- imported-source acceptance or publication policy;
- or live cross-app runtime behavior.

## Current State

- Animator already has a substantial runtime surface rather than a placeholder shell.
- It can build a canonical scene document, generate preview scene data, export JSON, save browser-local drafts, and download repo-ready scene JSON.
- The main runtime already exposes scene-tree, path, orbit, preview, and export-style workflows through the current animator overlay.
- The timeline already supports pause, warp, image, video, and graphic items.
- `Audio` and `Observer` already appear in the add menu, but those paths are still placeholder authoring blocks rather than fully implemented timeline objects.
- User-facing language has started shifting toward `Observer`, but the underlying document path still uses `cameraPaths` and `cameraShots`.
- The current framing runtime already normalizes shot framing, required versus optional assembly participation, and autoscale target selection.
- A first-pass autoscale behavior already exists in code, but the authored framing UI is still missing.
- A canonical structure bridge exists, and a narrow live mutation path exists for `Split Group`, but animator-side structural editing is still incomplete.
- Imported staging data already carries observer framing, preview identifiers, and export scene data through a dedicated scene-staging contract without importing external app runtimes.
- Solver-derived simulation mode has moved under this workstream as [simulation-mode.md](simulation-mode.md), so Animator owns the authoring and playback surface while the EOM solver owns the forward solver contract.

## Work Queue

The locally ranked execution order, current-state notes, blockers, and acceptance boundaries live in [work-queue.md](work-queue.md).

## Detailed Priority Files

| File | Role | Primary promotion targets |
| --- | --- | --- |
| [design-and-interfaces.md](design-and-interfaces.md) | Stable animator design doctrine, viewport model, observer/framing model, media and overlay boundaries, structure editing direction, inputs, outputs, and app boundaries. | [about-the-webapp](../../../content/markdown/aaa/archie/about-the-webapp.md), [scene-taxonomy](../../design/scene-taxonomy.md), [navigation-and-controls](../../../content/markdown/aaa/archie/navigation-and-controls.md) |
| [simulation-mode.md](simulation-mode.md) | Detailed packet for solver-derived Animator simulation mode, dataset playback, field shells, delayed hits, authoring controls, offline/cache workflow, and production solver cleanup. | [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md), [about-the-webapp](../../../content/markdown/aaa/archie/about-the-webapp.md), and Animator runtime documentation. |

## Promotion Map

| Task | Detailed file | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `runtime_cutover` | [design-and-interfaces.md](design-and-interfaces.md) | Runtime architecture and scene app implementation. | Remaining animator scene-shell behavior moves into a fully app-owned bootstrap and runtime path without reintroducing root `app.js` as feature logic. |
| `observer_framing_ui` | [design-and-interfaces.md](design-and-interfaces.md) | Animator observer/framing UI and authored scene output. | Authors can directly edit framing intent, required/optional targets, autoscale behavior, and imported observer hints. |
| `timeline_observer_audio` | [design-and-interfaces.md](design-and-interfaces.md) | Animator timeline object model. | `Observer` becomes a true timeline object and `Audio` is either implemented as a real authored object or removed from placeholder insertion paths. |
| `canonical_structure_transforms` | [design-and-interfaces.md](design-and-interfaces.md) | Canonical scene structure transforms. | Structure reads and edits share one canonical model rather than animator-local mutation paths. |
| `simulation_mode` | [simulation-mode.md](simulation-mode.md) | Animator simulation authoring and playback mode. | Solver-derived scenes keep visible provenance, authoring controls, offline/cache behavior, and production solver cleanup without mixing authored paths with simulation output. |

## Related AAA Notes

- [about-the-webapp](../../../content/markdown/aaa/archie/about-the-webapp.md)
- [scene-taxonomy](../../design/scene-taxonomy.md)
- [navigation-and-controls](../../../content/markdown/aaa/archie/navigation-and-controls.md)
