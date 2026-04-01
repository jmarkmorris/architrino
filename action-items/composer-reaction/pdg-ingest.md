# PDG Ingest

## LLM Instructions

- Keep this document focused on PDG-specific ingest, normalization, proposal review, and handoff preparation.
- Do not restate generic Reaction solver behavior here except where the PDG layer depends on it.
- Keep `Priorities` ordered as the active work queue.
- Keep `Design` about durable component boundaries, not speculative product sprawl.
- Treat Composer as downstream of accepted Reaction output, not as a participant in PDG ingest logic.

## Purpose

The PDG ingest component is the future upstream layer that turns published channel data into normalized Reaction-side seeds and candidate proposals.

It owns:

- PDG-facing channel ingest;
- normalization into the abstract solve model used by the Reaction solver;
- proposal generation and ranking at the PDG-facing layer;
- and any dedicated review surface or proposal contract needed before a candidate enters normal Reaction authoring.

It does not own:

- the generic Reaction solver architecture itself;
- the final Reaction authoring workflow;
- the cross-app Composer runtime path;
- or final animation and observer design.

## Current State

- There is no PDG ingest pipeline yet.
- There is no dedicated PDG-facing proposal-review app or boundary yet.
- There is no stored alternative-candidate review flow with controls such as pin or forbid.
- The repository does already have a real Reaction solver seam that is suitable as the downstream planning core for future PDG work.
- The main present architectural value of this component is boundary clarity: PDG ingest should feed the existing solver seam instead of inventing a parallel solve architecture.
- There is not yet a durable accepted-reaction payload path that begins from PDG ingest and continues cleanly through Reaction into downstream Composer handoff.

## Design

### Role In The Pipeline

The intended long-term PDG-facing flow is:

1. ingest published channel data and related metadata;
2. normalize that material into the same abstract solve model the Reaction solver can use;
3. generate and rank candidate provenance plans;
4. project a selected or reviewed plan into Reaction for inspection, correction, and validation;
5. let Reaction own the accepted export that later feeds Composer.

This layer should feed Reaction. It should not replace Reaction authoring, and it should not bypass Reaction on the way to Composer.

### Downstream Boundary

The PDG-facing layer should stay downstream-compatible but not cross boundaries directly.

That means:

- no Composer runtime dependencies;
- no shared UI runtime code with Composer;
- no direct final-animation authoring concerns;
- and no separate solver architecture that drifts from the Reaction solver's abstract state model.

If the PDG-facing layer later becomes its own app or service, it should still talk to Reaction through a normalized seed or proposal contract.

### Normalization Contract

The critical design job here is normalization.

PDG ingest should convert published channel descriptions into:

- normalized participant identities;
- channel metadata relevant to provenance review;
- seed structures that the Reaction solver can reason over;
- candidate alternatives with ranking metadata;
- and reviewable proposal state that can be accepted, corrected, pinned, or partially overridden before normal Reaction authoring continues.

The normalization target should be the abstract solve-state boundary already used by the solver, not a separate canvas-shaped or UI-shaped format.

### Proposal Review

PDG ingest likely needs its own review step before final Reaction acceptance.

That review layer should support:

- one or more candidate alternatives;
- inspection of why a candidate was preferred;
- operator and provenance visibility at the proposal level;
- and future controls such as pin, forbid, or rerun-on-remainder.

Even if this review surface becomes substantial, it still remains upstream of Reaction's accepted authored result.

### Reuse Of The Existing Solver

The repository already has the right basic downstream seam:

- abstract solve-state construction;
- candidate generation and selection;
- row placement through the shared surface grid;
- and projection back into live Reaction structures.

PDG ingest should reuse that seam. It should not create a second planner with separate rules, separate geometry assumptions, or separate conservation logic.

### Contract And Handoff Discipline

PDG ingest may eventually need its own explicit contract, but it should still fit inside the broader Composer/Reaction boundary discipline.

The guiding rules are:

- PDG ingest seeds or proposals feed Reaction;
- Reaction owns accepted conservative authoring and export;
- Composer consumes accepted Reaction output through explicit versioned data;
- and live runtime behavior should not cross those boundaries.

## Interfaces

### Inputs

- published PDG channel data;
- related metadata needed for normalization and proposal ranking;
- and future operator or seed hints appropriate to the PDG-facing layer.

### Outputs

- normalized seed data for the Reaction solver;
- ranked candidate proposals;
- proposal-review state and controls;
- and, after Reaction acceptance, material that can participate in the normal Reaction-owned export path.

### Neighboring Components

- [solver](./solver.md) is the planning core this component should feed.
- [reaction](./reaction.md) owns inspection, correction, manual override, and acceptance after PDG proposals are generated.
- [composer](./composer.md) remains downstream of accepted Reaction output only.
- [app-architecture](./app-architecture.md) defines the app-boundary rule that keeps this layer from sharing live runtime logic across app seams.
- [app-architecture](./app-architecture.md) owns the cross-app boundary this component must respect, while [reaction](./reaction.md) and [composer](./composer.md) own the downstream app work it depends on.

## Priorities

### 1. Define The PDG Seed Boundary

Status: `next`

Goal:

- define the normalized seed/proposal shape that PDG ingest will hand to the Reaction solver and review flow.

Why it matters:

- without a clear normalization target, PDG ingest risks creating a second implicit solver model.

Next steps:

- anchor the seed shape to the solver's abstract solve-state boundary;
- identify the minimum PDG metadata needed for proposal ranking and review;
- and keep the shape UI-independent.

### 2. Build Official PDG Channel Ingest

Status: `pending`

Goal:

- add official PDG channel ingest around the intended `pdg` package path.

Why it matters:

- this is the upstream data source for the whole PDG-facing component.

Next steps:

- load channel and metadata inputs from the intended package path;
- normalize them into solver-ready seeds;
- and add fixtures that protect the ingest and normalization path.

### 3. Add Proposal Review And Alternatives

Status: `pending`

Goal:

- create a PDG-facing proposal-review flow with stored candidate alternatives and review controls.

Why it matters:

- PDG-sourced candidates should be inspectable and correctable before they become accepted Reaction results.

Next steps:

- store ranked alternatives;
- add review controls such as pin or forbid;
- and keep proposal review upstream of normal Reaction acceptance.

### 4. Project Accepted Proposals Into Reaction

Status: `pending`

Goal:

- hand reviewed PDG proposals into Reaction through explicit normalized state rather than UI coupling.

Why it matters:

- the accepted plan should enter the normal Reaction workflow cleanly, with the solver seam reused rather than bypassed.

Next steps:

- project chosen proposals into Reaction-side participants and mappings;
- preserve provenance-review context where useful;
- and avoid direct shared runtime code across the boundary.

### 5. Stay Downstream-Compatible With Reaction Export

Status: `pending`

Goal:

- make PDG ingest compatible with the future durable Reaction export path without taking ownership of it.

Why it matters:

- PDG ingest is only useful if accepted proposals can flow through Reaction into the normal downstream pipeline.

Next steps:

- align proposal material with the Reaction-owned handoff/export direction;
- avoid creating Composer-specific shortcut payloads;
- and treat Composer integration as downstream of accepted Reaction output.
