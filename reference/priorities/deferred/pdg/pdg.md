# PDG Workstream

## Workstream Metadata

- Kind: `deferred-priority`
- Rank: `3`
- Value: `9`
- Cost: `4`
- ROI: `2.25`
- Status: `deferred`

## Task Queue

- none. This workstream is deferred and kept as reference.

## Scope

This note preserves the deferred

`pdgfeed -> pdgsolve -> pdgedit`

workstream as a contract-first reference.

The important part is the stage boundary:

- `pdgfeed` owns PDG-side ingest and request emission;
- `pdgsolve` owns the assembly-native solve, acceptance, and publication boundary;
- `pdgedit` owns the final authored-surface document;
- and the stages exchange explicit versioned data rather than shared runtime state.

This document is no longer an active backlog. It is the compact orientation note for the frozen workstream shape that existed when the PDG project was deferred.

## Directory Guide

- [pdgapps](pdgapps.md) — cross-app and cross-boundary architecture rules for the deferred PDG workstream.
- [pdgfeed](pdgfeed.md) — upstream PDG ingest, normalization, and request-boundary reference.
- [pdgsolve](pdgsolve.md) — solve, acceptance, and publication-boundary reference.
- [pdgedit](pdgedit.md) — final authored-surface document and editor reference.

## Deferred State

- `pdgfeed` remained the upstream Python layer under `scripts/pdg/` plus the root `pdgfeed.py` delegate entrypoint.
- `pdgsolve` remained the Python solve, acceptance, and publication boundary centered on `scripts/pdg/pdgsolve.py`.
- `pdgedit` remained the standalone authored-surface runtime under `src/apps/pdgedit/` and `pdgedit.html`.
- Shared schemas, examples, and manifests under `src/contracts/` and `content/contracts/examples/` were the frozen boundary surface between stages.
- The main Architrino web app no longer routed archived PDG tools through the active launcher surface.

## Stable Rules

- Keep the workstream contract-first. Stage exchange happens through explicit JSON contracts, not through shared browser state or cross-app runtime imports.
- Keep `pdgsolve` assembly-native. Higher-scale composite language may exist at the PDG boundary or the authored-surface boundary, but not inside solver-core ontology.
- Keep `pdgedit` as the final authored-surface boundary. Published `pdgedit/v1` documents are the downstream record, not an intermediate scratch format.
- Keep the archived workstream thinly integrated with the main web app. Reentry should happen through explicit entrypoints and data seams, not by rebuilding old shared-runtime coupling.

## Workflow Snapshot

The deferred baseline workflow was:

1. Use `pdgfeed` to inspect PDG data and emit explicit `pdgsolve-request/v1` payloads when a channel is fully mappable.
2. Use `pdgsolve` to solve, review, accept, and publish a final `pdgedit/v1` document.
3. Use `pdgedit` to inspect or refine the published authored surface.

That is the reference sequencing to keep in mind if this workstream is ever reactivated.

## Reactivation Rule

If the PDG workstream is resumed:

- verify schemas, examples, manifests, and tests before changing any behavior;
- resume from the explicit stage boundaries documented in the component notes rather than from memory of the old queue;
- and introduce any new work as a small, explicit queue after the frozen baseline has been revalidated.
