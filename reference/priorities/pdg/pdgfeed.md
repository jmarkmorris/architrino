# PDG

## LLM Instructions

- Keep this document focused on PDG-specific ingest, normalization, proposal review, and handoff preparation.
- Do not restate pdgsolve solve behavior here except where the PDG layer depends on the explicit request boundary.
- Keep `Priorities` ordered as the active work queue.
- Keep `Design` about durable component boundaries, not speculative product sprawl.
- Treat downstream publication and staging as pdgsolve/pdgedit/pdgview concerns, not as part of PDG ingest logic.

## Purpose

The PDG component is the future upstream Python layer that reads PDG channel data, normalizes it into explicit `pdgsolve-request/v1` intake state, and produces candidate proposals for pdgsolve-side review.

It owns:

- PDG data access through the official Python ecosystem;
- normalization into the solver's abstract state model;
- proposal generation and ranking from PDG-sourced channels;
- and PDG-side provenance metadata needed for review.

It does not own:

- solver search rules or solver internals;
- pdgsolve review/runtime behavior;
- pdgedit surface behavior;
- pdgview runtime behavior;
- or downstream animation/export concerns.

## Current State

- `scripts/pdg/pdgfeed.py` now exists as the fixture-first local PDG pipeline implementation.
- Root `pdgfeed.py` remains as a compatibility shim for existing `python3 pdgfeed.py ...` calls and `import pdgfeed` tests/tooling.
- `requirements.txt` now exists at repo root and currently lists the external `pdg` package.
- A local fixture corpus now exists under `content/contracts/examples/pdg/v1/`.
- Generated proposal and candidate request artifacts now land under `content/contracts/examples/pdg/v1/generated/`.
- The PDG feed CLI can list fixtures and emit proposal plus `pdgsolve-request/v1` artifacts from that local corpus through either the root shim or the direct implementation path.
- The PDG feed CLI also has stdout-only commands that print a single `pdgsolve-request/v1` JSON document for automation and future pdgsolve intake.
- The PDG feed implementation marks proposal source metadata with an explicit upstream/downstream contract boundary for the request seam, including that pdgsolve owns review and acceptance while pdgedit and pdgview stay downstream.
- The current implementation now uses an explicit locked v1 PDG-to-`pdgsolve-request/v1` mapping registry keyed by canonical PDG ASCII particle names.
- Local aliases may canonicalize into that registry for fixture convenience, but they do not widen the exportable pdgsolve surface.
- Exportable candidate requests currently exist only for channels whose PDG particle names can be expanded into the present `pdgsolve-request/v1` assembly vocabulary: `n`, `p`, `e-`, and `anti-nu_e`.
- After removing the baked-in historical cases, there is no longer a built-in live-read case that crosses the full request boundary with the current locked mapping table.
- Muon, pion, kaon, B-meson, photon-bearing, and other broader PDG channels may still normalize into proposal records, but they remain proposal-only until `pdgsolve-request/v1` grows the needed assembly vocabulary.
- Proposal exports now carry an explicit source contract marker that says they are upstream-only and still require pdgsolve-side acceptance before any downstream handoff can be considered.
- Emitted `pdgsolve-request/v1` payloads now point `source.sourceDocumentId` back to the originating `pdg-proposal:<proposalId>` record so the downstream seam stays traceable to a PDG proposal rather than implying accepted pdgsolve publication.
- Those emitted `pdgsolve-request/v1` payloads remain explicit upstream request artifacts intended for pdgsolve intake.
- Unsupported channels currently remain proposal-only rather than emitting invalid solver requests.
- Emitted candidate payloads are now checked against `pdgsolve-request/v1` rather than only by ad hoc required-key checks.
- Live PDG package access now exists as a guarded CLI path alongside fixtures, but fixtures remain the stable regression and day-to-day development path.
- There is no dedicated PDG review surface yet.
- There is no stored alternative-candidate review flow yet.
- The repository already has an explicit request seam that PDG should feed.
- There is not yet a finalized accepted-publication payload path from PDG through pdgsolve into pdgedit and onward into pdgview staging.
- The current local fixture corpus still uses canonical PDG ASCII particle names in `pdgId` fields for regression stability; live reads may additionally record a PDG Identifier in proposal `source` metadata when the API exposes one.

## Design

### Runtime Model

The normal ingest path should be local and offline once dependencies are installed.

The intended program shape is:

1. connect to the local PDG database through the official `pdg` Python package;
2. retrieve particles, branching fractions, decay products, subdecays, and related metadata;
3. normalize that data into explicit request-side seed and proposal records;
4. rank or filter candidate proposals at the PDG layer;
5. hand normalized state and provenance into pdgsolve intake and the explicit upstream request seam.

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
  emits normalized data for pdgsolve intake and upstream review flow.

### Implementation Baseline

The implementation assumes:

- Python 3 runtime;
- installed `pdg` package from `requirements.txt`;
- local SQLite database access through `pdg.connect(...)`;
- no live PDG website dependency during normal ingest;
- and explicit JSON artifacts for fixtures and debugging.

Suggested local environment setup:

- `python3 -m venv .venv`
- `source .venv/bin/activate`
- `python -m pip install -r requirements.txt`
- `echo $VIRTUAL_ENV` to confirm the venv is active.

The implementation has two surfaces:

- a library entrypoint in `scripts/pdg/pdgfeed.py` that returns normalized PDG-derived candidates;
- and a CLI entrypoint in `scripts/pdg/pdgfeed.py` that reads local PDG data and writes JSON artifacts for inspection and tests.

The root path remains a compatibility layer:

- `pdgfeed.py`:
  imports and delegates to `scripts/pdg/pdgfeed.py` so old commands and Python imports keep working while new implementation ownership is explicit.

- `scripts/pdg/pdgfeed.py`:
  connects to the local PDG database, performs PDG lookups, normalizes PDG objects into repo-owned records, builds ranked proposals, and emits solver-facing payloads plus sidecar proposal metadata.

If `scripts/pdg/pdgfeed.py` grows too large, later extractions may split out source, normalization, proposal, export, or fixture helpers.

The current CLI surface is:

- `python3 pdgfeed.py list-fixtures`
- `python3 pdgfeed.py emit-fixture <fixture-id>`
- `python3 pdgfeed.py emit-all-fixtures`
- `python3 pdgfeed.py print-fixture-proposal <fixture-id>`
- `python3 pdgfeed.py print-fixture-pdgsolve-request <fixture-id>`
- `python3 pdgfeed.py list-live-cases`
- `python3 pdgfeed.py emit-live-case <case-id>`
- `python3 pdgfeed.py emit-all-live-cases`
- `python3 pdgfeed.py print-live-proposal <case-id>`
- `python3 pdgfeed.py print-live-pdgsolve-request <case-id>`
- `python3 pdgfeed.py build-live-manifest`
- `python3 pdgfeed.py emit-supported-reaction-csv [csv-path] [--source fixtures|live]`
- optional `--database-url <sqlalchemy-url>` for the live commands

The intended handoff modes are:

- file-based artifact emission as the normal manual and regression workflow, for example `python3 pdgfeed.py emit-fixture muon_decay`;
- CSV primitive-count summaries for supported rows, for example `python3 pdgfeed.py emit-supported-reaction-csv /tmp/pdg-supported-reactions.csv --source live`;
- and stdout-only request emission as the automation workflow when an exportable case exists, for example `python3 pdgfeed.py print-live-pdgsolve-request <case-id>`.

The stdout-print commands must write only JSON to `stdout`; any diagnostics belong on `stderr` so the request output stays pipe-safe for automation and future pdgsolve intake.

Live PDG multiplicities for concrete mapped particles are now expanded into repeated normalized proposal participants instead of being rejected wholesale. Those repetitions only cross the request seam when every repeated particle has an explicit `pdgsolve-request/v1` mapping.

Active PDG work should treat request emission and manifest building as the live responsibilities until pdgsolve-side solve and review tooling exists.

For batch work over every exportable discovered live decay, first freeze a manifest:

- `VIRTUAL_ENV=/path/to/venv /path/to/venv/bin/python pdgfeed.py build-live-manifest > /tmp/pdg-live-manifest.json`

The manifest assigns sequential `batchId` values and records the PDG decay identifier for each exportable discovery, so downstream tooling can work from a frozen ordered list rather than agent memory.

#### Frozen Manifest Workflow

When the goal is to inspect or batch-process many live PDG decays, the preferred path is the frozen manifest rather than the small built-in live-case list.

Recommended workflow:

1. build a frozen live manifest with the repo venv Python so the PDG environment is explicit and stable for the whole run;
2. use that manifest as the stable ordered batch surface for downstream tooling;
3. treat analyzable/exportable manifest entries as the current request-emission denominator;
4. separate unsupported-particle discovery from request-emission progress.

Example full-manifest run:

- `/path/to/repo/.venv/bin/python /path/to/repo/pdgfeed.py build-live-manifest > /tmp/pdg-live-manifest.json`

How to read the denominator:

- `analyzableReactions` means entries that successfully crossed the PDG-to-solver boundary and produced a valid `pdgsolve-request/v1`;
- in manifest mode, unsupported discoveries stay outside that denominator and are reported separately;
- and manifest counts should be read as request-emission progress, not as solve-core closure metrics.

For solve-core progress reporting after each solve-rate change:

- rebuild the manifest;
- rerun the sweep;
- compare `exactClosureCount`, `exactClosurePercent`, and case-level movements from `no-solution` to `partial` or `exact`;
- and do not count unsupported-particle discoveries as solver failures.

The first local fixture corpus is:

- `muon_decay`
- `charged_pion_to_muon_neutrino`

The first built-in live PDG cases are:

- `muon_decay`
- `radiative_muon_decay`
- `muon_decay_with_electron_positron_pair`
- `muon_to_electron_photon`
- `charged_pion_to_muon_neutrino`

The locked canonical v1 PDG-to-`pdgsolve-request/v1` mapping table is currently:

| Canonical PDG ASCII name | Export status | pdgsolve request expansion | Request title pattern | Notes |
| --- | --- | --- | --- | --- |
| `n` | exportable | `pro_down_quark`, `pro_up_quark`, `pro_down_quark` | assembly titles from each emitted assembly | PDG particle name expanded before solver handoff |
| `p` | exportable | `pro_up_quark`, `pro_down_quark`, `pro_up_quark` | assembly titles from each emitted assembly | PDG particle name expanded before solver handoff |
| `e-` | exportable | `electron` | `Electron` | charged lepton, generation 1 |
| `anti-nu_e` | exportable | `electron_antineutrino` | `Electron Antineutrino` | neutrino, generation 1 |

The v1 unsupported-particle policy is:

- only canonical PDG names in the exportable rows above may be emitted into `pdgsolve-request/v1`;
- local aliases may canonicalize into those names, but aliases do not define new solver mappings;
- a particle explicitly marked proposal-only must remain in proposal metadata and notes only;
- any particle absent from the table is also proposal-only by default;
- decay products with concrete mapped particle identities may expand multiplicities into repeated normalized participants;
- and any decay product that arrives as a generic/textual PDG item or requires subdecay-specific interpretation stays proposal-only until an explicit solver-facing rule exists.

Registry expansion should stay deliberate rather than opportunistic.

That means:

- new exportable particle vocabulary enters only by adding an explicit canonical PDG-name row to the locked table;
- each new row must name the pdgsolve request expansion, the request title pattern, and any note needed to keep provenance conventions explicit;
- local aliases may improve ingest convenience, but they must never create exportability on their own;
- every proposal-only to exportable transition should land with fixture or live-case coverage that proves the new row crosses the `pdg-proposal/v1` to `pdgsolve-request/v1` seam cleanly;
- sweep reporting should then measure solver closure on those newly exportable cases rather than silently mixing vocabulary growth with solver progress;
- and until that package of mapping, provenance, and regression coverage exists, the particle remains proposal-only by design.

The first solver-facing target should be one `pdgsolve-request/v1` document per candidate, with:

- `source.kind` set to `pdgfeed`;
- `source.sourceDocumentId` pointing back to the originating `pdg-proposal:<proposalId>` record;
- `reactants` and `products` emitted as explicit request occurrences with stable `id`, `assemblyId`, and `title` fields;
- explicit `policy` values chosen by ingest rather than left implicit;
- and PDG provenance kept either in `source` fields or in sidecar proposal metadata, not hidden in ad hoc code paths.

A single PDG participant may expand into multiple emitted request occurrences.

That expansion is a pdgfeed responsibility and must happen before `pdgsolve-request/v1` crosses into pdgsolve.

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

Normalization should target the explicit upstream solve-request boundary, not a UI-shaped structure.

The normalized output should include:

- participant identities;
- decay/channel structure;
- multiplicities and subdecay structure;
- ranking/proposal metadata;
- and provenance metadata needed for later review.

### Seed Boundary

The first PDG seed boundary should use two repo-owned layers:

- a normalized PDG proposal record used inside ingest;
- and one exported `pdgsolve-request/v1` candidate per proposal.

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
- PDG particle/grouping flags used only inside ingest;
- normalized inventory ledger fields required by the solver;
- a root node id and flat node list;
- and PDG-side identity fields needed for provenance and traceability.

Unsupported PDG particles may remain in proposal metadata and notes, but they must not be emitted into `pdgsolve-request/v1` payloads without a resolved pdgsolve request expansion and request title pattern.

For consistency with the current local corpus:

- fixture participant `pdgId` fields presently carry canonical PDG ASCII particle names;
- live reads may additionally record a PDG Identifier in proposal `source` metadata when the API exposes one;
- and changing the participant-side identity field shape is out of scope for the present v1 lock.

The first exported `pdgsolve-request/v1` candidate should follow these rules:

- `schema` is always `pdgsolve-request/v1`;
- `source.kind` is `pdgfeed`;
- `source.sourceDocumentId` should identify the originating `pdg-proposal:<proposalId>` record rather than a pdgview or accepted authored-surface document;
- `source.title` should be a concise channel label suitable for fixtures and review;
- `reactants` and `products` are produced only from normalized proposal records, never from raw PDG objects at export time;
- each emitted request occurrence carries stable `id`, `assemblyId`, and `title` fields;
- and `policy` is set explicitly by ingest, not inferred by the solver.

The first exported `policy` baseline should be:

- `exactClosureRequired: true`
- `allowedBoundaryAugmentations: ["none"]`

The first PDG version should also stay within these scope limits:

- emit reactant and product participants directly supported by the normalization layer;
- emit center participants only when the ingest rule set explicitly supports them;
- avoid synthetic manual operators and mappings in v1;
- preserve unsupported or ambiguous PDG structure in proposal metadata rather than hiding it in guessed solver payloads;
- and prefer fewer exact candidate payloads over speculative broad export.

### Boundary Rules

- PDG feeds the explicit pdgsolve-intake solve seam; it does not define its own solve runtime.
- PDG must not depend on pdgview runtime code.
- PDG must not bypass pdgsolve review and acceptance on the way to pdgedit or pdgview.
- PDG should talk to downstream code through explicit normalized contracts.

### Proposal Review

PDG needs an explicit upstream review boundary between raw proposal generation and pdgsolve acceptance.

That boundary should let ingest keep more than one normalized interpretation of the same PDG channel without pretending that rank alone is acceptance. The top-ranked candidate may be the default exportable choice, but review must still be able to preserve the rest of the candidate set, explain why the default was chosen, and mark certain alternatives as intentionally preferred or intentionally excluded.

The first durable shape should be a repo-owned `pdg-review/v1` record with:

- a stable `reviewId` for one source channel or decay selection;
- source provenance copied from the PDG proposal layer rather than re-derived later;
- an `alternatives` array stored in stable rank order;
- explicit review state such as `selectedAlternativeId`, `pinnedAlternativeId`, and `forbiddenAlternativeIds`;
- and enough summary fields to understand the choice without re-querying PDG.

Each stored alternative should carry:

- its normalized `proposalId`;
- whether it is exportable to `pdgsolve-request/v1`;
- ranking score, rank, and reason codes;
- proposal notes, especially unsupported-particle or ambiguity notes;
- a concise reactant/product summary suitable for CLI or future UI review;
- and either the embedded `pdgsolve-request/v1` candidate or a stable reference to the generated request artifact.

The first review semantics should be:

- ranking provides the provisional default, not final acceptance;
- `pin` makes one alternative the explicit preferred export while leaving siblings visible;
- `forbid` removes an alternative from default selection without erasing its provenance trail;
- reranking after new ingest should preserve explicit review decisions where they still apply;
- and unsupported alternatives may remain visible in review but must not cross the solver seam.

This review layer is still upstream of pdgsolve. It chooses among PDG-derived alternatives and preserves provenance; it does not author solve-review state, pdgedit publication data, or pdgview-facing output.

## Interfaces

### Inputs

- local `pdg` package installation;
- local PDG SQLite database file;
- PDG particle/channel data and metadata exposed through the Python API;
- and future operator or seed hints appropriate to the PDG layer.

### Outputs

- normalized seed data for pdgsolve intake;
- candidate `pdgsolve-request/v1` payloads;
- ranked candidate proposals;
- proposal-review state;
- and provenance metadata attached to those artifacts.

### Neighboring Components

- [pdgsolve](./pdgsolve.md) is the solve-review and acceptance app this component should feed.
- [pdgedit](./pdgedit.md) remains downstream of accepted pdgsolve publication only.
- [pdgview](./pdgview.md) remains downstream of accepted authored-surface output only.
- [pdgapps](pdgapps.md) defines the app-boundary rule this component must respect.

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

### 1. Use Frozen Manifests As The Stable Batch Surface For PDG Support

Status: `active`

Current:

- `build-live-manifest` already freezes exportable/analyzable cases into a stable ordered list separate from unsupported discovery cases.

Objective:

- keep batch-oriented PDG work tied to the frozen-manifest denominator as particle coverage grows and pdgsolve-side tooling comes online.

### 2. Promote Remaining PDG Developer Notes Into `reference/`

Status: `pending`

Current:

- some PDG-adjacent development notes still live outside `reference/`;
- at least one covers the PDG package itself, while others are general development notes that should no longer live in AAA-facing locations.

Objective:

- move the remaining PDG-specific and development-specific notes into `reference/` so the editorial and developer boundaries stay clean.
