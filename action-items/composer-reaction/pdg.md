# PDG Ingest

## LLM Instructions

- Keep this document focused on PDG-specific ingest, normalization, proposal review, and handoff preparation.
- Do not restate generic Reaction solver behavior here except where the PDG layer depends on it.
- Keep `Priorities` ordered as the active work queue.
- Keep `Design` about durable component boundaries, not speculative product sprawl.
- Treat Composer as downstream of accepted Reaction output, not as a participant in PDG ingest logic.

## Purpose

The PDG ingest component is the future upstream Python layer that reads PDG channel data, normalizes it into solver-ready state, and produces candidate proposals for Reaction-side review.

It owns:

- PDG data access through the official Python ecosystem;
- normalization into the solver's abstract state model;
- proposal generation and ranking from PDG-sourced channels;
- and PDG-side provenance metadata needed for review.

It does not own:

- solver search rules or solver internals;
- Reaction UI/runtime behavior;
- Composer runtime behavior;
- or downstream animation/export concerns.

## Current State

- There is no PDG ingest pipeline yet.
- There is no dedicated PDG review surface yet.
- There is no stored alternative-candidate review flow yet.
- The repository already has a solver seam that PDG ingest should feed.
- There is not yet a finalized accepted-reaction payload path from PDG ingest through Reaction into Composer handoff.

## Design

### Runtime Model

The normal ingest path should be local and offline once dependencies are installed.

The intended program shape is:

1. connect to the local PDG database through the official `pdg` Python package;
2. retrieve particles, branching fractions, decay products, subdecays, and related metadata;
3. normalize that data into solver-owned seed and proposal records;
4. rank or filter candidate proposals at the PDG-ingest layer;
5. hand normalized state and provenance into Reaction and the solver seam.

Routine ingest should not depend on live calls to the PDG website.

### Program Structure

The Python program should be split into small layers:

- PDG adapter:
  uses `pdg.connect(...)` against a local SQLite database and exposes the PDG objects and metadata we actually consume;
- normalization:
  converts PDG particles, identifiers, decay products, multiplicities, and subdecay structure into explicit solver-facing records;
- proposal assembly:
  groups normalized PDG material into seed/proposal candidates and attaches ranking metadata;
- provenance:
  records PDG edition, schema/release metadata, PDG Identifier, descriptions, and any limit or confidence semantics needed for review;
- export boundary:
  emits normalized data for the solver and Reaction-side review flow.

### Implementation Baseline

The first implementation should assume:

- Python 3 runtime;
- installed `pdg` package;
- local SQLite database access through `pdg.connect(...)`;
- no live PDG website dependency during normal ingest;
- and explicit JSON artifacts for fixtures and debugging.

The first program should have two surfaces:

- a library entrypoint that returns normalized PDG-derived candidates;
- and a CLI entrypoint that reads local PDG data and writes JSON artifacts for inspection and tests.

The first module split should be:

- `pdg_source`:
  connects to the local PDG database and performs the limited set of PDG lookups needed by ingest;
- `pdg_normalize`:
  converts PDG objects into repo-owned intermediate records with stable IDs and provenance;
- `pdg_proposals`:
  builds ranked candidate proposals from normalized records;
- `pdg_export`:
  emits solver-facing payloads and any sidecar proposal metadata;
- and `pdg_fixtures`:
  stores small reproducible example inputs and outputs for tests.

The first solver-facing target should be one `solver-request/v1` document per candidate, with:

- `origin.sourceKind` set to `pdg-ingest`;
- participants normalized into the solver contract rather than passed through as raw PDG objects;
- empty `manualOperators` and `manualMappings` unless a later review stage adds them;
- explicit `policy` values chosen by ingest rather than left implicit;
- and PDG provenance kept either in `origin` fields or in sidecar proposal metadata, not hidden in ad hoc code paths.

### PDG Ecosystem

The surrounding PDG resources are:

- Python API docs: <https://pdgapi.lbl.gov/doc/pythonapi.html>
- REST API docs: <https://pdgapi.lbl.gov/doc/restapi.html>
- database schema docs: <https://pdgapi.lbl.gov/doc/schema.html>
- downloadable SQLite database files from the PDG API overview page;
- and PDG Identifiers as the stable IDs for particles, properties, and decays.

The integration options are:

- primary:
  the official Python API over a local SQLite database file;
- secondary:
  direct SQL against that same local database when the Python API does not expose the needed traversal cleanly;
- incidental only:
  the REST API for inspection, experiments, or fixture capture, not for the normal ingest path.

### Database Policy

The local database may be either:

- the SQLite file bundled with the installed `pdg` package;
- or an explicitly pinned downloaded SQLite file selected by the developer.

The ingest program should assume that the required package and database are already installed locally. Package/database updates are a developer-maintained concern, not a runtime ingest concern.

### Normalization Contract

Normalization should target the solver's abstract state boundary, not a UI-shaped structure.

The normalized output should include:

- participant identities;
- decay/channel structure;
- multiplicities and subdecay structure;
- ranking/proposal metadata;
- and provenance metadata needed for later review.

### Boundary Rules

- PDG ingest feeds the solver seam; it does not define a second solver.
- PDG ingest must not depend on Composer runtime code.
- PDG ingest must not bypass Reaction acceptance on the way to Composer.
- PDG ingest should talk to downstream code through explicit normalized contracts.

### Proposal Review

PDG ingest may eventually need an upstream review boundary with:

- multiple stored alternatives;
- ranking explanation;
- provenance visibility;
- and controls such as pin or forbid.

## Interfaces

### Inputs

- local `pdg` package installation;
- local PDG SQLite database file;
- PDG particle/channel data and metadata exposed through the Python API;
- and future operator or seed hints appropriate to the ingest layer.

### Outputs

- normalized seed data for the Reaction solver;
- candidate `solver-request/v1` payloads;
- ranked candidate proposals;
- proposal-review state;
- and provenance metadata attached to those artifacts.

### Neighboring Components

- [solver](./solver.md) is the planning core this component should feed.
- [reaction](./reaction.md) owns inspection, correction, manual override, and acceptance after PDG proposals are generated.
- [composer](./composer.md) remains downstream of accepted Reaction output only.
- [app-architecture](./app-architecture.md) defines the app-boundary rule this component must respect.

### Deferred Feature: Package And Database Maintenance

Routine PDG ingest should not require visiting the PDG website during normal solver use.

For now:

- developers install and pin the `pdg` package version deliberately;
- developers choose whether to rely on the package-bundled database or point the API at a separately downloaded pinned SQLite file;
- and ingest code assumes that the required local package and database are already present.

Possible future automation:

- checking whether a newer PDG edition or package version exists;
- downloading or refreshing approved SQLite database files into a configured local cache;
- recording edition and schema metadata automatically for derived artifacts;
- and validating that local PDG resources match the version expected by the ingest pipeline.

## Priorities

### 1. Freeze The Implementation Baseline

Status: `completed`

Work:

- keep the runtime model local/offline and database-backed;
- fix the initial module split and program surfaces;
- fix the first solver-facing output target as candidate `solver-request/v1` payloads plus proposal metadata;
- and keep the maintenance policy explicit so implementation can begin without open architectural ambiguity.

### 2. Define The PDG Seed Boundary

Status: `next`

Work:

- define the normalized seed/proposal shape that PDG ingest hands to the solver and review flow;
- identify the minimum PDG metadata required for ranking and provenance;
- keep the shape UI-independent.

### 3. Build The Local PDG Adapter And Fixtures

Status: `pending`

- build ingest around the official `pdg` package;
- connect to the local database through the Python API;
- choose a first fixture corpus of representative PDG channels;
- and add fixtures covering adapter reads and provenance capture.

### 4. Implement Normalization And Candidate Export

Status: `pending`

- normalize PDG channels into solver-owned intermediate records;
- export one or more candidate `solver-request/v1` payloads per ingest run;
- and attach ranking/provenance metadata needed for review and debugging.

### 5. Verify Against The Solver Boundary

Status: `pending`

- validate emitted candidate payloads against `solver-request/v1`;
- compare candidate shape against real solver needs before widening scope;
- and keep downstream integration based on explicit contracts only.

### 6. Add Proposal Review And Alternatives

Status: `pending`

- create a PDG-facing proposal-review flow with stored candidate alternatives;
- add review controls such as pin or forbid;
- keep proposal review upstream of Reaction acceptance.

### 7. Project Accepted Proposals Into Reaction

Status: `pending`

- project chosen proposals into Reaction through explicit normalized state;
- preserve useful provenance-review context;
- avoid direct shared runtime code across the boundary.

### 8. Stay Downstream-Compatible With Reaction Export

Status: `pending`

- align proposal material with the Reaction-owned handoff/export direction;
- avoid Composer-specific shortcut payloads;
- treat Composer integration as downstream of accepted Reaction output.
