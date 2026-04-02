# PDG

## LLM Instructions

- Keep this document focused on PDG-specific ingest, normalization, proposal review, and handoff preparation.
- Do not restate generic Reaction solver behavior here except where the PDG layer depends on it.
- Keep `Priorities` ordered as the active work queue.
- Keep `Design` about durable component boundaries, not speculative product sprawl.
- Treat Composer as downstream of accepted Reaction output, not as a participant in PDG ingest logic.

## Purpose

The PDG component is the future upstream Python layer that reads PDG channel data, normalizes it into solver-ready state, and produces candidate proposals for Reaction-side review.

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

- `pdg.py` now exists as a fixture-first local PDG pipeline.
- A local fixture corpus now exists under `content/contracts/examples/pdg/v1/`.
- Generated proposal and candidate request artifacts now land under `content/contracts/examples/pdg/v1/generated/`.
- `pdg.py` can list fixtures and emit proposal plus `solver-request/v1` artifacts from that local corpus.
- Live PDG package access is still represented as a helper path rather than the primary day-to-day development path.
- There is no dedicated PDG review surface yet.
- There is no stored alternative-candidate review flow yet.
- The repository already has a solver seam that PDG should feed.
- There is not yet a finalized accepted-reaction payload path from PDG through Reaction into Composer handoff.

## Design

### Runtime Model

The normal ingest path should be local and offline once dependencies are installed.

The intended program shape is:

1. connect to the local PDG database through the official `pdg` Python package;
2. retrieve particles, branching fractions, decay products, subdecays, and related metadata;
3. normalize that data into solver-owned seed and proposal records;
4. rank or filter candidate proposals at the PDG layer;
5. hand normalized state and provenance into Reaction and the solver seam.

Routine ingest should not depend on live calls to the PDG website.

### Program Structure

The Python program should keep these responsibilities distinct even in the first single-file implementation:

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

- a library entrypoint implemented first in `pdg.py` that returns normalized PDG-derived candidates;
- and a CLI entrypoint in `pdg.py` that reads local PDG data and writes JSON artifacts for inspection and tests.

The first implementation should start in one Python file:

- `pdg.py`:
  connects to the local PDG database, performs the first PDG lookups, normalizes PDG objects into repo-owned records, builds ranked proposals, and emits solver-facing payloads plus sidecar proposal metadata.

If `pdg.py` grows too large, later extractions may split out source, normalization, proposal, export, or fixture helpers. The initial implementation should not force a multi-file layout before the first working path exists.

The current CLI surface is:

- `python3 pdg.py list-fixtures`
- `python3 pdg.py emit-fixture <fixture-id>`
- `python3 pdg.py emit-all-fixtures`

The first local fixture corpus is:

- `free_neutron_beta_decay`
- `muon_decay`
- `charged_pion_to_muon_neutrino`

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

### Seed Boundary

The first PDG seed boundary should use two repo-owned layers:

- a normalized PDG proposal record used inside ingest;
- and one exported `solver-request/v1` candidate per proposal.

The normalized PDG proposal record should contain:

- `proposalId`:
  stable ingest-local identity for ranking, fixtures, and review;
- `source`:
  PDG provenance including edition, schema/release metadata, PDG Identifier, description text, and any branching or limit semantics used by the proposal;
- `reactants`:
  normalized participant records for the proposed source side;
- `products`:
  normalized participant records for the proposed target side;
- `centers`:
  optional authored center participants only when ingest has explicit grounds to include them;
- `ranking`:
  score inputs, rank, and brief reason codes explaining why the candidate exists and why it was ordered where it was;
- and `notes`:
  ambiguity flags, unsupported-generic-product notes, or reduction assumptions made during normalization.

Each normalized participant record should contain at minimum:

- stable ingest-local `id`;
- solver-facing `templateId` for every exportable candidate;
- human-readable `label`;
- explicit `side`;
- particle/composite flags;
- normalized inventory ledger fields required by the solver;
- a root node id and flat node list;
- and PDG-side identity fields needed for provenance and traceability.

Unsupported PDG particles may remain in proposal metadata and notes, but they must not be emitted into `solver-request/v1` payloads without a resolved solver-facing `templateId`.

The first exported `solver-request/v1` candidate should follow these rules:

- `schema` is always `solver-request/v1`;
- `origin.sourceKind` is `pdg-ingest`;
- `origin.sourceDocumentId` should identify the PDG proposal or source channel;
- `title` should be a concise channel label suitable for fixtures and review;
- `participants` are produced only from normalized proposal records, never from raw PDG objects at export time;
- `manualOperators` is empty in the first ingest version;
- `manualMappings` is empty in the first ingest version;
- `dissociation.manuallyOpenedParticipantIds` and `dissociation.manuallyOpenedNodeIds` are empty in the first ingest version;
- `dissociation.preserveManualState` is `true`;
- and `policy` is set explicitly by ingest, not inferred by the solver.

The first exported `policy` baseline should be:

- `recruitmentMode: "forbid"`
- `lateBosonCollapseMode: "allow-exact"`
- `weakChannelMode: "v1-core-provenance-only"`
- `carryThroughMode: "exact-first"`

The first PDG version should also stay within these scope limits:

- emit reactant and product participants directly supported by the normalization layer;
- emit center participants only when the ingest rule set explicitly supports them;
- avoid synthetic manual operators and mappings in v1;
- preserve unsupported or ambiguous PDG structure in proposal metadata rather than hiding it in guessed solver payloads;
- and prefer fewer exact candidate payloads over speculative broad export.

### Boundary Rules

- PDG feeds the solver seam; it does not define a second solver.
- PDG must not depend on Composer runtime code.
- PDG must not bypass Reaction acceptance on the way to Composer.
- PDG should talk to downstream code through explicit normalized contracts.

### Proposal Review

PDG may eventually need an upstream review boundary with:

- multiple stored alternatives;
- ranking explanation;
- provenance visibility;
- and controls such as pin or forbid.

## Interfaces

### Inputs

- local `pdg` package installation;
- local PDG SQLite database file;
- PDG particle/channel data and metadata exposed through the Python API;
- and future operator or seed hints appropriate to the PDG layer.

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

Routine PDG use should not require visiting the PDG website during normal solver use.

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

### 1. Verify Against The Solver Boundary

Status: `next`

- validate emitted candidate payloads against `solver-request/v1`;
- compare candidate shape against real solver needs before widening scope;
- and keep downstream integration based on explicit contracts only.

### 2. Add Proposal Review And Alternatives

Status: `pending`

- create a PDG-facing proposal-review flow with stored candidate alternatives;
- add review controls such as pin or forbid;
- keep proposal review upstream of Reaction acceptance.

### 3. Project Accepted Proposals Into Reaction

Status: `pending`

- project chosen proposals into Reaction through explicit normalized state;
- preserve useful provenance-review context;
- avoid direct shared runtime code across the boundary.

### 4. Stay Downstream-Compatible With Reaction Export

Status: `pending`

- align proposal material with the Reaction-owned handoff/export direction;
- avoid Composer-specific shortcut payloads;
- treat Composer integration as downstream of accepted Reaction output.
