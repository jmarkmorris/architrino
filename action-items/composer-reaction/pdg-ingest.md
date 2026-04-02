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

## Available PDG Resources And API Options

The official PDG entry point is the 2026 API overview at <https://pdg.lbl.gov/2026/api/index.html>. That overview points to three main machine-readable access paths plus the underlying schema documentation:

- Python API docs: <https://pdgapi.lbl.gov/doc/pythonapi.html>
- REST API docs: <https://pdgapi.lbl.gov/doc/restapi.html>
- database schema docs: <https://pdgapi.lbl.gov/doc/schema.html>

There are also two supporting resource types worth treating as first-class inputs to our own ingest design:

- downloadable SQLite database files from the PDG API overview page;
- and PDG Identifiers, which give stable IDs for particles, properties, and decay modes and are the primary lookup key for both REST and lower-level database access.

### Option 1. Python API

The Python API is the highest-level official integration path and is explicitly described by PDG as the recommended machine-readable access path for most users. In our intended usage, this means the local `pdg` Python package reading from its bundled or explicitly pinned SQLite database file, not making routine network calls to the PDG website during ingest.

What it gives us:

- Python-native access through the `pdg` package;
- offline use after installation, because the installed package bundles a PDG SQLite database file for its default edition;
- straightforward navigation from particle name, Monte Carlo ID, or PDG Identifier into properties, branching fractions, measurements, decay products, and subdecays;
- and the ability to point the same API at a different downloaded database file when we want to pin a specific edition or use an expanded historical database.

Why it is attractive for us:

- our planned ingest layer is already Python-oriented because it needs to prepare data for `solver.py`;
- the API already exposes decay-oriented structures rather than forcing us to reconstruct them from raw tables;
- and it gives us a supported abstraction layer over PDG-specific flags, joins, and special cases that we do not want to rediscover inside our own ingest code.

Limits to keep in mind:

- PDG still documents ambiguity handling, and `pedantic=True` exists because some "best value" choices are not automatic;
- the API reflects PDG's domain model rather than our solver seed model, so we still need a normalization layer;
- and if we need data outside the API's higher-level affordances, we may still need direct SQL reads against the same database.

### Option 2. REST API

The REST API exposes JSON documents at `https://pdgapi.lbl.gov/PATH`, primarily via `/info`, `/summaries/PDGID`, and `/listings/PDGID`.

What it gives us:

- simple HTTP access without shipping a local PDG database file;
- direct JSON payloads that are convenient for prototypes, debugging, fixtures, and ad hoc lookups;
- access to summary-table data and listings data keyed by PDG Identifier;
- and explicit metadata such as edition, citation, release timestamp, and license in the response preamble.

Why it is less attractive as the main ingest path:

- PDG describes it as intended for incidental access rather than bulk or broad data download;
- PDG rate-limits it to under 2 requests per second;
- reaction ingest will likely need many related traversals over channels, decay products, and ranking metadata rather than isolated one-off lookups;
- and a network-bound API would make solver-adjacent ingest less reproducible, slower, and more operationally fragile than a local database-backed path.

Best use here:

- use REST for manual inspection, tiny experiments, or narrow fixture capture;
- do not make it the backbone of the production PDG-to-solver ingest path.

### Option 3. Direct Database Access

The database layer is the SQLite file documented at <https://pdgapi.lbl.gov/doc/schema.html>. PDG documents this as the lower-level access path behind the Python API.

What it gives us:

- the raw tables for particles, identifiers, decays, summary data, measurements, references, text, mappings, and metadata;
- complete local control over queries, caching, denormalization, and precomputation;
- the easiest route for bulk extraction or cross-edition analysis if we need to build our own ingest snapshots;
- and a durable substrate that can be queried directly when the Python API does not expose exactly the traversal we want.

Why it is not the best first integration surface:

- PDG explicitly describes the database path as relatively low-level;
- using it well requires understanding PDG-specific table relationships, flags, and special cases;
- and if we start here, we risk embedding PDG storage quirks directly into our ingest logic instead of keeping a cleaner adapter boundary.

Best use here:

- treat the SQLite schema as the fallback and validation layer under the Python API;
- use direct SQL only for gaps, performance-sensitive bulk jobs, or explicit precomputation steps once the seed contract is stable.

### Recommendation For `solver.py`

The best primary path for us is:

1. use the official Python API as the ingest-facing code interface;
2. run that API against a local SQLite database file, ideally a pinned downloaded edition for reproducibility and edition control;
3. normalize Python API objects into a small solver-owned seed/proposal schema;
4. and reserve direct SQL access for any missing traversal or bulk extraction that the Python API cannot express cleanly.

In other words, the normal ingest path should be local and offline once the package and database are installed. We should not design the main PDG-to-solver flow around live calls to the PDG website.

That recommendation follows from the shape of the task. We do not merely need PDG values; we need reaction-like channel structure that a Python program can traverse, interpret, and project into solver-ready seeds. The Python API already exposes branching fractions, decay products, and subdecays in Python-native objects, which is much closer to what `solver.py` needs than rate-limited REST JSON or hand-written SQL over raw tables.

Concretely, the ingest boundary should likely look like this:

- PDG adapter layer:
  use `pdg.connect(...)`, particle lookups, exclusive branching-fraction iteration, and decay-product traversal;
- normalization layer:
  convert PDG particle names, PDG Identifiers, multiplicities, subdecay structure, and ranking metadata into explicit solver seed records;
- provenance layer:
  preserve PDG edition, release timestamp, PDG Identifier, description text, and any confidence or limit semantics needed for review;
- fallback layer:
  allow direct database queries against the same local database for edge cases where the Python API is insufficient.

This keeps the solver isolated from PDG-specific transport and schema details while still giving us a credible escape hatch if we later discover that some published channel structures require lower-level access.

### Deferred Feature: Package And Database Maintenance

Routine PDG ingest should not require visiting the PDG website during normal solver use. In the near term, package and database maintenance should remain an explicit developer responsibility rather than a runtime concern.

That means:

- developers install and pin the `pdg` package version deliberately;
- developers choose whether to rely on the package-bundled database or point the API at a separately downloaded pinned SQLite file;
- and ingest code assumes that the required local package and database are already present.

Deferred future work may automate some of this maintenance, but it should stay outside the first production ingest path. Possible later automation includes:

- checking whether a newer PDG edition or package version exists;
- downloading or refreshing approved SQLite database files into a configured local cache;
- recording edition and schema metadata automatically for derived artifacts;
- and validating that local PDG resources match the version expected by the ingest pipeline.

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
