# Composer, Reaction App, and PDG Solver

## Workstream Metadata

- Kind: `priority`
- Rank: `3`
- Value: `9`
- Cost: `4`
- ROI: `2.25`
- Status: `active`

## Task Queue

1. `reaction_manual_workflow` — Finish the reaction app manual workflow for conservative dissociate / associate / transmute authoring. Status: `next`. Depends on: none.
2. `reaction_flow_schema` — Define the shared reaction flow JSON contract used between the reaction app, PDG solver, and composer. Status: `pending`. Depends on: `reaction_manual_workflow`.
3. `pdg_solver_ingest` — Build PDG channel ingest around the official PDG data path and normalize it into reaction-app inputs. Status: `pending`. Depends on: `reaction_flow_schema`.
4. `solved_reaction_handoff` — Route accepted reaction flows from the reaction app into the composer as staged animated scenes. Status: `pending`. Depends on: `reaction_flow_schema`.
5. `viewport_autoscale_authoring` — Finish composer observer framing and autoscale authoring so reaction flybys can keep required assemblies in view. Status: `active`. Depends on: `solved_reaction_handoff`.

## Scope

This workstream covers three linked app surfaces:

- [composer.md](./composer.md) — the final animation and observer-staging surface;
- [reaction.md](./reaction.md) — the conservative manual reaction-authoring surface;
- [pdg-solver.md](./pdg-solver.md) — the planned PDG-data ingestion and reaction-seeding surface.

## Brief Overview

The intended pipeline is:

1. the PDG solver reads a reaction channel and its metadata;
2. it sends the normalized reactants, products, energy, and channel context into the reaction app;
3. the reaction app resolves a conservative provenance-preserving reaction flow;
4. the resulting reaction flow JSON is handed to the composer;
5. the composer turns that flow into an authored animation with observer flybys and autoscale.

## Current State

### Composer app

- The composer is already a real app surface rather than a mockup.
- It can build scene documents, preview them, export JSON, save to browser-local library storage, and download repo-ready JSON files.
- It already has a real observer-framing runtime, but the full authoring UI for required versus optional viewport participation is still incomplete.
- It does not yet accept solved reaction flow JSON from the reaction app.

### Reaction app

- The reaction app already exists as the current manual provenance surface.
- It is lane-based and conservative: reactants on the left, products on the right, operator lanes in the middle.
- It already supports manual mapping, split-aware structure rendering, and operator-driven reaction editing.
- It does not yet export a settled reaction flow JSON contract for durable handoff into the composer.

### PDG solver app

- The PDG solver does not yet exist as a real runtime or scene in the web app.
- Its current state is architectural planning plus the PDG API reference note in `content/markdown/aaa/reactions/pdg-api.md`.
- The intended role is to fetch PDG reaction/channel data, normalize it, and seed the reaction app with the relevant reactants, products, energy, and channel metadata.

## Near-Term Direction

The immediate goal is not to make the PDG solver visually rich first. The immediate goal is to make the pipeline coherent:

- finish the manual reaction app workflow;
- define the reaction flow JSON contract;
- use that contract as the bridge from PDG ingest into reaction solving;
- and use the same contract again as the bridge from solved reactions into composer animation.

## Related Action Items

- [composer](./composer.md)
- [reaction](./reaction.md)
- [pdg-solver](./pdg-solver.md)
- [viewports](../viewports/viewports.md)
- [cruft-sprawl](../cruft-sprawl/cruft-sprawl.md)

## Related AAA Notes

- [about-the-webapp](../../content/markdown/aaa/archie/about-the-webapp.md)
- [scene-taxonomy](../../content/markdown/aaa/archie/scene-taxonomy.md)
- [navigation-and-controls](../../content/markdown/aaa/archie/navigation-and-controls.md)
- [pdg-api](../../content/markdown/aaa/reactions/pdg-api.md)
- [reaction-ledger](../../content/markdown/aaa/validation/reaction-ledger.md)
