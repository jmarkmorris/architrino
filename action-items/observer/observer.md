# Composer / Reaction Workstream

## Workstream Metadata

- Kind: `priority`
- Rank: `3`
- Value: `9`
- Cost: `4`
- ROI: `2.25`
- Status: `active`

## Directory Guide

- [app-architecture](./app-architecture.md) — overall architecture for how dedicated apps fit into the Architrino web app.
- [reaction](./reaction.md) — Reaction app design and Reaction-owned priorities.
- [solver](./solver.md) — Reaction-side solver design, limits, and solver-owned priorities.
- [pdgfeed](./pdgfeed.md) — PDG-facing ingest, normalization, and proposal-review work.
- [composer](./composer.md) — Composer design and Composer-owned priorities.

## Current Cross-Doc Queue

1. [reaction](./reaction.md): finish the manual provenance workflow and keep Reaction as the primary conservative authoring surface.
2. [reaction](./reaction.md) and [composer](./composer.md): keep the `reaction-flow/v1` boundary honest as Reaction export hardens and Composer stays data-first downstream.
3. [composer](./composer.md): finish authored observer framing and autoscale UI on top of the now-working Reaction handoff intake.
4. [pdgfeed](./pdgfeed.md): build `pdgfeed.py`, fixtures, and the first normalized candidate export path into `solver-request/v1`.
5. [app-architecture](./app-architecture.md), [reaction](./reaction.md), and [composer](./composer.md): keep shrinking shared roots such as `app.js` and oversized app coordinators while protecting the explicit app boundary.
