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

- `pdgfeed.py` now exists as a fixture-first local PDG pipeline.
- `requirements.txt` now exists at repo root and currently lists the external `pdg` package.
- A local fixture corpus now exists under `content/contracts/examples/pdg/v1/`.
- Generated proposal and candidate request artifacts now land under `content/contracts/examples/pdg/v1/generated/`.
- `pdgfeed.py` can list fixtures and emit proposal plus `solver-request/v1` artifacts from that local corpus.
- `pdgfeed.py` now also has stdout-only commands that print a single `solver-request/v1` JSON document for automation and piping into the solver CLI.
- `scripts/pdg-closure-sweep.mjs` now exists as a developer batch runner that feeds many PDG cases through the same request/result seam, writes per-case logs under `/tmp` by default, and emits a closure summary report.
- The current implementation now uses an explicit locked v1 PDG-to-solver mapping registry keyed by canonical PDG ASCII particle names.
- Local aliases may canonicalize into that registry for fixture convenience, but they do not widen the exportable solver surface.
- Exportable candidate requests currently exist for the neutron, muon, pion, kaon, and B-meson solver-facing particle sets that are in the locked v1 registry.
- Exportable live-read candidate requests now also exist for neutron beta, radiative neutron beta, muon decay, radiative muon decay, muon decay with an added electron-positron pair, muon-to-electron-photon, charged-pion-to-muon-neutrino, neutral-pion discovery cases, the first charged/neutral kaon discovery cases, and the first charged/neutral B-meson discovery cases when a local `pdg` installation is present.
- Charged and neutral pion, the four kaons, and the four B mesons now have explicit solver-facing mappings in the locked v1 registry, so those channels no longer stop at proposal-only classification merely because of particle vocabulary.
- Unsupported channels currently remain proposal-only rather than emitting invalid solver requests.
- Emitted candidate payloads are now checked against `solver-request/v1` rather than only by ad hoc required-key checks.
- Live PDG package access now exists as a guarded CLI path alongside fixtures, but fixtures remain the stable regression and day-to-day development path.
- There is no dedicated PDG review surface yet.
- There is no stored alternative-candidate review flow yet.
- The repository already has a solver seam that PDG should feed.
- There is not yet a finalized accepted-reaction payload path from PDG through Reaction into Composer handoff.
- The current local fixture corpus still uses canonical PDG ASCII particle names in `pdgId` fields for regression stability; live reads may additionally record a PDG Identifier in proposal `source` metadata when the API exposes one.

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
- installed `pdg` package from `requirements.txt`;
- local SQLite database access through `pdg.connect(...)`;
- no live PDG website dependency during normal ingest;
- and explicit JSON artifacts for fixtures and debugging.

Suggested local environment setup:

- `python3 -m venv .venv`
- `source .venv/bin/activate`
- `python -m pip install -r requirements.txt`
- `echo $VIRTUAL_ENV` to confirm the venv is active.

The first program should have two surfaces:

- a library entrypoint implemented first in `pdgfeed.py` that returns normalized PDG-derived candidates;
- and a CLI entrypoint in `pdgfeed.py` that reads local PDG data and writes JSON artifacts for inspection and tests.

The first implementation should start in one Python file:

- `pdgfeed.py`:
  connects to the local PDG database, performs the first PDG lookups, normalizes PDG objects into repo-owned records, builds ranked proposals, and emits solver-facing payloads plus sidecar proposal metadata.

If `pdgfeed.py` grows too large, later extractions may split out source, normalization, proposal, export, or fixture helpers. The initial implementation should not force a multi-file layout before the first working path exists.

The current CLI surface is:

- `python3 pdgfeed.py list-fixtures`
- `python3 pdgfeed.py emit-fixture <fixture-id>`
- `python3 pdgfeed.py emit-all-fixtures`
- `python3 pdgfeed.py print-fixture-proposal <fixture-id>`
- `python3 pdgfeed.py print-fixture-solver-request <fixture-id>`
- `python3 pdgfeed.py list-live-cases`
- `python3 pdgfeed.py emit-live-case <case-id>`
- `python3 pdgfeed.py emit-all-live-cases`
- `python3 pdgfeed.py print-live-proposal <case-id>`
- `python3 pdgfeed.py print-live-solver-request <case-id>`
- `python3 pdgfeed.py build-live-manifest`
- optional `--database-url <sqlalchemy-url>` for the live commands

The intended handoff modes are:

- file-based artifact emission as the normal manual and regression workflow, for example `python3 pdgfeed.py emit-fixture free_neutron_beta_decay` followed by `node scripts/solve-reaction.mjs content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.solver-request.v1.json`;
- and stdout-only request emission as the automation workflow, for example `python3 pdgfeed.py print-fixture-solver-request free_neutron_beta_decay | node scripts/solve-reaction.mjs`.

The stdout-print commands must write only JSON to `stdout`; any diagnostics belong on `stderr` so the pipe into `solve-reaction.mjs` stays reliable.

Live PDG multiplicities for concrete mapped particles are now expanded into repeated normalized participants instead of being rejected wholesale. That means channels like `pi0 -> 2gamma` can cross the request seam as two photon participants, while generic/textual items still remain proposal-only.

For developer closure sweeps across many cases, use `node scripts/pdg-closure-sweep.mjs`. The sweep runner can either enumerate fixture/live cases directly or consume a frozen manifest built by `python3 pdgfeed.py build-live-manifest`. In direct mode it classifies unsupported-input cases from `pdg-proposal/v1` before solving, feeds only exportable requests through `pdgfeed.py` plus `solve-reaction.mjs`, writes a per-run log directory under `/tmp` by default, and finishes with a report containing reactions tested, analyzable reactions, exact-closure percentage over analyzable reactions only, reactions not yet analyzable, and the top unsupported particles ranked by appearance count in unsupported reactions.

For batch work over every exportable discovered live decay, first freeze a manifest, then advance through it with a cursor:

- `VIRTUAL_ENV=/path/to/venv /path/to/venv/bin/python pdgfeed.py build-live-manifest > /tmp/pdg-live-manifest.json`
- `node scripts/pdg-closure-sweep.mjs --manifest /tmp/pdg-live-manifest.json --cursor /tmp/pdg-live-cursor.json --limit 20`
- `node scripts/pdg-closure-sweep.mjs --manifest /tmp/pdg-live-manifest.json --cursor /tmp/pdg-live-cursor.json --limit 34`

The manifest assigns sequential `batchId` values and records the PDG decay identifier for each exportable discovery. The cursor stores the next `batchId`, so phrases like "the first 20" and "the next 34" can map to a frozen ordered list rather than agent memory.

The first local fixture corpus is:

- `free_neutron_beta_decay`
- `muon_decay`
- `charged_pion_to_muon_neutrino`

The first built-in live PDG cases are:

- `free_neutron_beta_decay`
- `radiative_free_neutron_beta_decay`
- `muon_decay`
- `radiative_muon_decay`
- `muon_decay_with_electron_positron_pair`
- `muon_to_electron_photon`
- `charged_pion_to_muon_neutrino`

The locked canonical v1 PDG-to-solver mapping table is:

| Canonical PDG ASCII name | Export status | Solver templateId | Normalized label | Notes |
| --- | --- | --- | --- | --- |
| `n` | exportable | `neutron` | `Neutron` | baryon |
| `p` | exportable | `proton` | `Proton` | baryon |
| `e-` | exportable | `electron` | `Pro Electron` | charged lepton, generation 1 |
| `e+` | exportable | `electron` | `Anti Electron` | charged lepton, generation 1 |
| `mu-` | exportable | `electron` | `Pro Muon` | charged lepton, generation 2 |
| `mu+` | exportable | `electron` | `Anti Muon` | charged lepton, generation 2 |
| `nu_e` | exportable | `neutrino` | `Pro Electron Neutrino` | neutrino, generation 1 |
| `anti-nu_e` | exportable | `neutrino` | `Anti Electron Neutrino` | neutrino, generation 1 |
| `nu_mu` | exportable | `neutrino` | `Pro Muon Neutrino` | neutrino, generation 2 |
| `anti-nu_mu` | exportable | `neutrino` | `Anti Muon Neutrino` | neutrino, generation 2 |
| `gamma` | exportable | `photon` | `Photon` | boson |
| `pi+` | exportable | `pi_plus` | `Positive Pion` | meson, `u + anti-d` |
| `pi-` | exportable | `pi_minus` | `Negative Pion` | meson, `d + anti-u` |
| `pi0` | exportable | `upi0` | `Neutral Pion` | PDG ingest normalizes neutral pion to one canonical authored form, while the solver treats `upi0` and `dpi0` as equivalent |
| `K+` | exportable | `k_plus` | `Positive Kaon` | meson, `u + anti-s` |
| `K-` | exportable | `k_minus` | `Negative Kaon` | meson, `s + anti-u` |
| `K0` | exportable | `dk0` | `Neutral Kaon (d anti-s)` | meson, `d + anti-s` |
| `anti-K0` | exportable | `sk0` | `Neutral Kaon (s anti-d)` | meson, `s + anti-d` |
| `B+` | exportable | `b_plus` | `Positive B Meson` | meson, `u + anti-b` |
| `B-` | exportable | `b_minus` | `Negative B Meson` | meson, `b + anti-u` |
| `B0` | exportable | `dB0` | `Neutral B Meson (d anti-b)` | meson, `d + anti-b` |
| `anti-B0` | exportable | `bB0` | `Neutral B Meson (b anti-d)` | meson, `b + anti-d` |

The v1 unsupported-particle policy is:

- only canonical PDG names in the exportable rows above may be emitted into `solver-request/v1`;
- local aliases may canonicalize into those names, but aliases do not define new solver mappings;
- a particle explicitly marked proposal-only must remain in proposal metadata and notes only;
- any particle absent from the table is also proposal-only by default;
- decay products with concrete mapped particle identities may expand multiplicities into repeated normalized participants;
- and any decay product that arrives as a generic/textual PDG item or requires subdecay-specific interpretation stays proposal-only until an explicit solver-facing rule exists.

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

For consistency with the current local corpus:

- fixture participant `pdgId` fields presently carry canonical PDG ASCII particle names;
- live reads may additionally record a PDG Identifier in proposal `source` metadata when the API exposes one;
- and changing the participant-side identity field shape is out of scope for the present v1 lock.

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

### 1. Lock The V1 Mapping Table And Unsupported-Particle Policy

Status: `completed`

- decide the canonical v1 PDG-to-solver mapping table that `pdgfeed.py` is allowed to export;
- keep unsupported particles proposal-only until a solver-facing mapping exists;
- and make the supported/unsupported boundary explicit in the note and in code.

### 2. Verify Against The Solver Boundary

Status: `completed`

- validate emitted candidate payloads against `solver-request/v1`;
- compare candidate shape against real solver needs before widening scope;
- and keep downstream integration based on explicit contracts only.

### 3. Add Live PDG Package Reads Alongside Fixtures

Status: `completed`

- add real `pdg.connect(...)` reads for the first supported channel lookups;
- keep the local fixture corpus as the stable development and regression path;
- and ensure live reads normalize into the same proposal and export shapes as fixtures while preserving live PDG provenance fields.

### 4. Add Proposal Review And Alternatives

Status: `pending`

- create a PDG-facing proposal-review flow with stored candidate alternatives;
- add review controls such as pin or forbid;
- keep proposal review upstream of Reaction acceptance.

### 5. Project Accepted Proposals Into Reaction

Status: `pending`

- project chosen proposals into Reaction through explicit normalized state;
- preserve useful provenance-review context;
- avoid direct shared runtime code across the boundary.

### 6. Stay Downstream-Compatible With Reaction Export

Status: `pending`

- align proposal material with the Reaction-owned handoff/export direction;
- avoid Composer-specific shortcut payloads;
- treat Composer integration as downstream of accepted Reaction output.
