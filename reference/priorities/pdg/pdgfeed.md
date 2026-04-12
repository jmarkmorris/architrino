# PDG

## LLM Instructions

- Keep this document focused on PDG-specific ingest, normalization, proposal review, and handoff preparation.
- Do not restate pdgsolve solve behavior here except where the PDG layer depends on the explicit request boundary.
- Keep `Priorities` ordered as the active work queue.
- Keep `Design` about durable component boundaries, not speculative product sprawl.
- Treat downstream publication and staging as pdgsolve/pdgedit/pdgview concerns, not as part of PDG ingest logic.

## Purpose

The PDG component is the upstream Python layer that reads PDG reaction data, turns it into repo-owned proposal records, and emits explicit assembly-native `pdgsolve-request/v1` payloads when the channel is fully mappable.

It owns:

- PDG data access through the official Python ecosystem;
- normalization into explicit proposal and request records;
- upstream translation from PDG-facing particle/channel language into explicit admitted assemblies when that translation is supported;
- proposal generation and ranking;
- and PDG-side provenance metadata needed for review.

It does not own:

- solver search rules or solver internals;
- pdgsolve review/runtime behavior;
- pdgedit surface behavior;
- pdgview runtime behavior;
- downstream collapse of accepted assemblies back into composite/grouping display language;
- or downstream animation/export concerns.

## Current State

`pdgfeed` currently lives in `scripts/pdg/pdgfeed.py`. Root `pdgfeed.py` remains only as a compatibility shim for older commands and imports. The stable development path is the repo-owned PDG test reaction corpus under `content/contracts/examples/pdg/v1/`, with generated proposal and `pdgsolve-request/v1` artifacts written under `content/contracts/examples/pdg/v1/generated/`.

The CLI can list reactions, emit proposal and request artifacts, print pipe-safe request JSON to stdout, build frozen PDG reaction manifests, and export supported-reaction CSV summaries. Real PDG database reads through the local `pdg` package also exist, but they are still the secondary path. The regression baseline is the local PDG test corpus.

The export surface is intentionally narrow. `pdgfeed` uses a locked v1 mapping registry from canonical PDG ASCII particle names to explicit admitted `pdgsolve-request/v1` assemblies. Local aliases may canonicalize into those names, but they do not create new exportable vocabulary. If a particle or channel cannot be translated all the way into explicit admitted Standard Model assemblies, it stays upstream as proposal metadata and does not emit a solver request.

There is no dedicated PDG review surface yet, no stored alternative-candidate review flow yet, and no finalized accepted-publication path from `pdgfeed` through the downstream chain.

## Design

### Runtime Model

The normal ingest path should be local and offline once dependencies are installed.

The practical flow is:

1. connect to the local PDG database through the official `pdg` Python package;
2. retrieve the reaction data we actually use;
3. normalize that data into explicit proposal records;
4. emit `pdgsolve-request/v1` only when the channel is fully mappable;
5. otherwise keep the case upstream as proposal-only output.

Routine ingest should not depend on web calls to the PDG website.

### Program Structure

The Python program should keep these responsibilities distinct even if the implementation stays in one file:

- PDG adapter:
  uses `pdg.connect(...)` against a local SQLite database and exposes the PDG objects and metadata we actually consume;
- normalization:
  converts PDG particles, identifiers, decay products, multiplicities, and subdecay structure into repo-owned records;
- proposal assembly:
  builds proposal candidates and attaches ranking metadata;
- provenance:
  records the source information needed for later review;
- export boundary:
  emits explicit assembly-native request data for `pdgsolve` intake.

### Composite-To-Assembly Boundary

pdgfeed is the upstream owner of composite-to-assembly translation for PDG-facing language.

That means:

- PDG names such as `n` and `p` may be expanded into explicit emitted assembly occurrences before the request crosses into pdgsolve;
- unsupported or ambiguous higher-scale terms must remain un-mappable rather than leaking into solver-native request ids;
- if multiple upstream interpretations are plausible, that ambiguity belongs in PDG proposal/review state rather than in pdgsolve ontology;
- and the default architecture should use PDG-side translators and review artifacts rather than adding a new dedicated app between pdgfeed and pdgsolve.

### Implementation Baseline

The implementation assumes:

- Python 3 runtime;
- installed `pdg` package from `requirements.txt`;
- local SQLite database access through `pdg.connect(...)`;
- no PDG website dependency during normal ingest;
- and explicit JSON artifacts for PDG test reactions and debugging.

The implementation has two surfaces:

- a library entrypoint in `scripts/pdg/pdgfeed.py` that returns normalized PDG-derived candidates;
- and a CLI entrypoint in `scripts/pdg/pdgfeed.py` that reads local PDG data and writes JSON artifacts for inspection and tests.

The root path remains a compatibility layer:

- `pdgfeed.py`:
  imports and delegates to `scripts/pdg/pdgfeed.py` so old commands and Python imports keep working while new implementation ownership is explicit.

- `scripts/pdg/pdgfeed.py`:
  connects to the local PDG database, performs PDG lookups, normalizes PDG objects into repo-owned records, builds ranked proposals, and emits solver-facing payloads plus sidecar proposal metadata.

The current CLI surface is:

- `python3 pdgfeed.py list-pdg-test-reactions`
- `python3 pdgfeed.py emit-pdg-test-reaction <reaction-id>`
- `python3 pdgfeed.py emit-all-pdg-test-reactions`
- `python3 pdgfeed.py print-pdg-test-reaction-proposal <reaction-id>`
- `python3 pdgfeed.py print-pdg-test-reaction-pdgsolve-request <reaction-id>`
- `python3 pdgfeed.py list-pdg-reactions`
- `python3 pdgfeed.py emit-pdg-reaction <reaction-id>`
- `python3 pdgfeed.py emit-all-pdg-reactions`
- `python3 pdgfeed.py print-pdg-reaction-proposal <reaction-id>`
- `python3 pdgfeed.py print-pdg-reaction-pdgsolve-request <reaction-id>`
- `python3 pdgfeed.py build-pdg-reaction-manifest`
- `python3 pdgfeed.py emit-supported-reaction-csv [csv-path] [--source pdg-test-reactions|pdg-reactions]`
- optional `--database-url <sqlalchemy-url>` for the PDG reaction commands

Legacy `test-case`, `pdg-database`, and `live` command spellings remain accepted as compatibility aliases, but authored docs should use `PDG test reaction` and `PDG reaction` wording. Stdout-print commands must write only JSON to `stdout`; diagnostics belong on `stderr`.

PDG reaction multiplicities for concrete mapped particles may expand into repeated normalized participants. Those repetitions only cross the request seam when every repeated particle has an explicit `pdgsolve-request/v1` mapping.

For batch work over many exportable PDG reactions, first freeze a manifest:

- `VIRTUAL_ENV=/path/to/venv /path/to/venv/bin/python pdgfeed.py build-pdg-reaction-manifest > /tmp/pdg-reaction-manifest.json`

The manifest gives downstream tooling a frozen ordered list rather than relying on memory.

#### Frozen Manifest Workflow

When the goal is to inspect or batch-process many PDG reactions, the preferred path is the frozen manifest rather than the small PDG test reaction list.

Recommended workflow:

1. build a frozen PDG reaction manifest with the repo venv Python so the PDG environment is explicit and stable for the whole run;
2. use that manifest as the stable ordered batch surface for downstream tooling;
3. treat analyzable/exportable manifest entries as the current request-emission denominator;
4. separate unsupported-particle discovery from request-emission progress.

Example full-manifest run:

- `/path/to/repo/.venv/bin/python /path/to/repo/pdgfeed.py build-pdg-reaction-manifest > /tmp/pdg-reaction-manifest.json`

Interpretation:

- `analyzableReactions` means entries that successfully crossed the PDG-to-solver boundary and produced a valid `pdgsolve-request/v1`;
- in manifest mode, unsupported discoveries stay outside that denominator and are reported separately;
- and manifest counts should be read as request-emission progress, not as solve-core closure metrics.

Current PDG test reactions:

- `muon_decay`
- `radiative_muon_decay`
- `muon_decay_with_electron_positron_pair`
- `muon_to_electron_photon`
- `charged_pion_to_muon_neutrino`

The locked canonical v1 PDG-to-`pdgsolve-request/v1` mapping table defines the exportable vocabulary. Representative rows include:

| Canonical PDG ASCII name | Export status | pdgsolve request expansion                         | Request title pattern                      | Notes                                                          |
| ------------------------ | ------------- | -------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------- |
| `n`                      | exportable    | `pro_down_quark`, `pro_up_quark`, `pro_down_quark` | assembly titles from each emitted assembly | PDG particle name expanded to assemblies before solver handoff |
| `p`                      | exportable    | `pro_up_quark`, `pro_down_quark`, `pro_up_quark`   | assembly titles from each emitted assembly | PDG particle name expanded to assemblies before solver handoff |
| `e-`                     | exportable    | `electron`                                         | `Electron`                                 | charged lepton, generation 1                                   |
| `anti-nu_e`              | exportable    | `electron_antineutrino`                            | `Electron Antineutrino`                    | neutrino, generation 1                                         |

The v1 un-mappable-particle policy is:

- only canonical PDG names with an explicit Standard Model assembly translation may be emitted into `pdgsolve-request/v1`;
- local aliases may canonicalize into those names, but aliases do not define new solver mappings;
- a particle explicitly marked un-mappable must remain in proposal metadata and notes only;
- any particle absent from the table is also un-mappable by default;
- decay products with concrete mapped particle identities may expand multiplicities into repeated normalized participants;
- and any decay product that arrives as a generic/textual PDG item or requires subdecay-specific interpretation stays un-mappable until an explicit assembly-native upstream translation rule exists.

Registry expansion should stay deliberate. New exportable vocabulary should enter only by adding an explicit canonical PDG-name row to the locked table with matching request expansion and regression coverage.

Each emitted `pdgsolve-request/v1` candidate should:

- `source.kind` set to `pdgfeed`;
- `source.sourceDocumentId` pointing back to the originating `pdg-proposal:<proposalId>` record;
- `reactants` and `products` emitted as explicit request occurrences with stable `id`, `assemblyId`, and `title` fields;
- set `policy` explicitly;
- and keep PDG provenance in `source` fields or sidecar proposal metadata.

A single PDG participant may expand into multiple emitted request occurrences. That expansion is a `pdgfeed` responsibility and must happen before `pdgsolve-request/v1` crosses into `pdgsolve`.

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
  the REST API for inspection or experiments, not for the normal ingest path.

### Database Policy

The local database is the SQLite file bundled with the installed `pdg` package.

The ingest program should assume that the required package and database are already installed locally. Package/database updates are a developer-maintained concern, not a runtime ingest concern.

### Normalization Contract

Normalization should target the explicit upstream solve-request boundary, not a UI-shaped structure.

The normalized output should include:

- participant identities;
- decay/channel structure;
- multiplicities and subdecay structure;
- ranking metadata;
- and provenance metadata needed for later review.

### Proposal And Request Boundary

The boundary should use two repo-owned layers:

- a normalized PDG proposal record used inside ingest;
- and one exported `pdgsolve-request/v1` candidate per exportable proposal.

Proposal records should carry stable identity, source provenance, normalized participants, ranking metadata, and notes about ambiguity or unsupported structure.

Requests should be emitted only from normalized proposal records, never directly from raw PDG objects. Each emitted request must:

- use schema `pdgsolve-request/v1`;
- set `source.kind` to `pdgfeed`;
- point `source.sourceDocumentId` to `pdg-proposal:<proposalId>`;
- contain only explicit assembly-native occurrences in `reactants` and `products`;
- and preserve unsupported or ambiguous PDG structure in proposal metadata rather than guessing a solver payload.

### Boundary Rules

- PDG feeds the explicit pdgsolve-intake solve seam; it does not define its own solve runtime.
- PDG owns upstream composite-to-assembly translation for the PDG-facing seam.
- PDG must not depend on pdgview runtime code.
- PDG must not bypass pdgsolve review and acceptance on the way to pdgedit or pdgview.
- PDG should talk to downstream code through explicit normalized contracts.

### Proposal Review

PDG needs an explicit upstream review boundary between proposal generation and `pdgsolve` acceptance. Ranking is only a provisional default. Unsupported or ambiguous alternatives may remain visible upstream, but they must not cross the solver seam.

## Interfaces

### Inputs

- local `pdg` package installation;
- local PDG SQLite database file;
- PDG particle/channel data and metadata exposed through the Python API.

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

## Priorities

### 1. Use Frozen Manifests As The Stable Batch Surface For PDG Support

Status: `active`

Current:

- `build-pdg-reaction-manifest` already freezes exportable/analyzable reactions into a stable ordered list separate from unsupported discovery reactions.

Objective:

- keep batch-oriented PDG work tied to the frozen-manifest denominator as particle coverage grows and pdgsolve-side tooling comes online.

### 2. Promote Remaining PDG Developer Notes Into `reference/`

Status: `pending`

Current:

- some PDG-adjacent development notes still live outside `reference/`;
- at least one covers the PDG package itself, while others are general development notes that should no longer live in AAA-facing locations.

Objective:

- move the remaining PDG-specific and development-specific notes into `reference/` so the editorial and developer boundaries stay clean.

## Grammar Map

### Invocation Modes

The solver should support stdout text form PDG reactions for Op use, not for downstream consumption at this time.

The output will use compact strings and should also allow optional benign separators between tokens so humans can make distinct assemblies easier to read. The default separator should be `.`.

Examples:

| Notation | Meaning |
| --- | --- |
| `Pe2v` | compact form with no separators |
| `P.e2.v` | same input with preferred separators |
| `P,e2,v` | same input with comma separators |
| `h2.W-.P` | distinct assemblies made easier to scan |
| `P.e.av` | proton, electron, anti-neutrino |
| `1:1@.P.e` | explicit `Unbound Architrinos` ledger plus proton and electron |

Example command, free neutron decay with an added `hq` reactant:

| Form      | Command                       |
| --------- | ----------------------------- |
| compact   | `pdgfeed --r Nhq --p Peav`    |
| separated | `pdgfeed --r N.hq --p P.e.av` |


Anti-ness should be handled with `a` only:

| Notation form | Meaning |
| --- | --- |
| `x` | pro form is implied |
| `ax` | anti form |

For named mixed-core composites, use `hp` and `hq`. Do not spell those objects with raw concatenations of `h` and `ah`.

Current compact AAA notation:

| AAA Notation | Name                             | Notes                                                              | PDG API Notation |
| ------------ | -------------------------------- | ------------------------------------------------------------------ | ---------------- |
| `d1` or `d`  | down quark                       | generation I may omit the `1`                                      | `d`              |
| `d2`         | strange quark                    | generation II down-family                                          | `s`              |
| `d3`         | bottom quark                     | generation III down-family                                         | `b`              |
| `e1` or `e`  | electron                         | generation I may omit the `1`                                      | `e-`             |
| `e2`         | muon                             | generation II charged lepton                                       | `mu-`            |
| `e3`         | tau                              | generation III charged lepton                                      | `tau-`           |
| `N`          | neutron                          | aligns with existing `Pro Neutron` support                         | `n`              |
| `P`          | proton                           | aligns with existing `Pro Proton` support                          | `p`              |
| `u1` or `u`  | up quark                         | generation I may omit the `1`                                      | `u`              |
| `u2`         | charm quark                      | generation II up-family                                            | `c`              |
| `u3`         | top quark                        | generation III up-family                                           | `t`              |
| `v1` or `v`  | neutrino                         | generation I may omit the `1`                                      | `nu_e`           |
| `v2`         | muon neutrino                    | generation II neutrino                                             | `nu_mu`          |
| `v3`         | tau neutrino                     | generation III neutrino                                            | `nu_tau`         |
| `W+`         | `W+` boson                       | two-character token                                                | `W+`             |
| `W-`         | `W-` boson                       | two-character token                                                | `W-`             |
| `Z`          | `Z` boson                        | direct match                                                       | `Z`              |
| `h`          | Noether core                     | base core symbol                                                   | `n/a`            |
| `h2`         | Bi Binary                        | reduced `Noether core` form                                        | `n/a`            |
| `h3`         | Uni Binary                       | reduced `Noether core` form                                        | `n/a`            |
| `hp`         | Noether Pair or Photon           | mixed-core shorthand for `h.ah`                                    | `gamma`          |
| `hq`         | Noether Quad (aka Higgs Cluster) | mixed-core shorthand for `h.h.ah.ah`                               | `n/a`            |
| `e:p@`       | `Unbound Architrinos` ledger     | explicit electrino:positrino count, with both sides always present | `n/a`            |

The `PDG API Notation` column is a naming bridge for API alignment only. It is not a claim of exact one-to-one ontology, especially for solver-only constructs such as `h`, `h2`, `h3`, and the `e:p@` ledger token.

Generation numbers should be interpreted as family indices for fermions:

| Family letter | Generation I | Generation II | Generation III |
| --- | --- | --- | --- |
| `e` | electron | muon | tau |
| `u` | up quark | charm quark | top quark |
| `d` | down quark | strange quark | bottom quark |
| `v` | neutrino | muon neutrino | tau neutrino |

Examples:

| Notation | Name                |
| -------- | ------------------- |
| `P`      | pro proton          |
| `aP`     | anti proton         |
| `N`      | pro neutron         |
| `aN`     | anti neutron        |
| `e`      | pro electron        |
| `ae`     | anti electron       |
| `e2`     | pro muon            |
| `ae2`    | anti muon           |
| `v`      | pro neutrino        |
| `av3`    | anti tau neutrino   |
| `h`      | pro `Noether core`  |
| `ah`     | anti `Noether core` |

`Unbound Architrinos` are the exception to that anti-ness rule. They use explicit ledger tokens of the form `e:p@` with no anti form.

| Notation   | Meaning                               |
| ---------- | ------------------------------------- |
| `1:1@`     | one electrino and one positrino       |
| `227:120@` | `227` electrinos and `120` positrinos |
| `227:0@`   | `227` electrinos and zero positrinos  |
| `0:120@`   | zero electrinos and `120` positrinos  |

Both sides of the ledger should always be present. If one side is zero, the zero should still be written explicitly. The one excluded case is `0:0@`, which should be forbidden as a meaningless null ledger. That keeps the grammar single-reading and avoids special omission rules such as trying to infer whether `227@` means `227:0@`, `0:227@`, or something else.

The choice of `@` for `Unbound Architrinos` is now intentional rather than provisional. It works well at the shell level because it is safe in unquoted command-line arguments, but it also carries a useful visual and conceptual resonance. The symbol reads like a curling or spiraling enclosure, which fits the intuition that a unbound electrino and positrino meeting in isolation would tend toward a tighter orbital closure. At the same time, the historical bookkeeping meaning of the at sign ties neatly into the solver's conservation and provenance ledger: `@` already carries the feel of accounting, relation, and counted association. That makes it a rare symbol that is compact, typeable, shell-safe, visually suggestive, and semantically aligned with the solver's charge-routing and ledger language.

This direction is simpler for the intended audience because it avoids a large inventory of unrelated one-letter symbols. A small set of family letters plus generation indices covers the fermion families cleanly, while `h`, `ah`, and explicit `e:p@` ledgers preserve the assembly-side intuition.

For the `W` bosons, the preferred notation is the explicit two-character form `W+` and `W-` rather than encoding charge through case. That keeps the shorthand physically legible and consistent with the authored labels already used in the app and docs. `W+` and `W-` should be treated as atomic two-character tokens. Anti weak-boson forms should remain forbidden in this grammar: `W+` and `W-` already stand in antiparticle relation to each other, and `Z` is self-conjugate, so `aW+`, `aW-`, and `aZ` should not be introduced. For v1, the boson-core convention is fixed: `W+` carries anti `Noether core` provenance and `W-` carries pro `Noether core` provenance.

### Compact Grammar

The compact notation should be treated as a small lexer-first language rather than as ad hoc string guessing.

Preferred lexer rule:

- strip or ignore benign separators first: `.`, `,`, `_`, and whitespace;
- then tokenize left to right;
- use longest-match tokenization whenever two token families share a prefix;
- and reject the whole string if any character sequence cannot be consumed as exactly one valid token.

Current token families:

| Token family | Form | Notes |
| --- | --- | --- |
| fermion | `a? [eudv] [123]?` | `1` may be omitted only for generation I |
| nucleon | `a? P` or `a? N` | anti allowed for nucleons |
| weak boson | `W+`, `W-`, `Z` | `W+` and `W-` are atomic two-character tokens |
| core form | `a? h`, `a? h2`, `a? h3` | anti allowed only on these `Noether core` forms |
| named core composite | `hp`, `hq` | atomic mixed-core shorthand for Noether Pair and Noether Quad |
| unbound-architrino ledger | `[0-9]+:[0-9]+@` | explicit electrino:positrino ledger, both sides required |

Equivalent EBNF-style sketch:

```text
reaction_arg   := token { separator* token }
separator      := "." | "," | "_" | whitespace
token          := fermion | nucleon | weak_boson | core_form | named_core_composite | unbound_architrino_ledger
fermion        := anti? family generation?
anti           := "a"
family         := "e" | "u" | "d" | "v"
generation     := "1" | "2" | "3"
nucleon        := anti? ("P" | "N")
weak_boson     := "W+" | "W-" | "Z"
core_form      := anti? ("h" | "h2" | "h3")
named_core_composite := "hp" | "hq"
unbound_architrino_ledger := count ":" count "@"
count          := digit { digit }
```

Interpretation rules:

- `a` binds only to the single token immediately following it;
- `a` is currently valid for fermions, nucleons, and `Noether core` forms `h`, `h2`, and `h3`;
- generation digits belong only to the fermion families `e`, `u`, `d`, and `v`;
- `hp` and `hq` are dedicated atomic tokens for the Noether Pair and Noether Quad, rather than prefix-count variants of `h`;
- `Unbound Architrinos` use a dedicated two-sided ledger token `e:p@`;
- separators are optional for any adjacent token sequence whose left-to-right longest-match tokenization remains unambiguous;
- and a number must not try to play both a prefix-count role and a suffix-generation or suffix-core-form role on the same token.

### Ambiguity Discipline

The parser itself is not the hard part. The important requirement is that a human and a machine should see the same segmentation without guesswork.

The current grammar should therefore aim for:

- one obvious reading for every valid string;
- no silent reinterpretation through parser cleverness;
- no special omission rules that make zero or missing counts context-dependent;
- and explicit rejection of token shapes that would otherwise admit multiple readings.

Current recommended conflict checks:

| Potential conflict          | Why it is risky                                                           | Recommended rule |
| --------------------------- | ------------------------------------------------------------------------- | ---------------- |
| `hp2`, `hq3`, `ahp`, `ahq` | named core composites are atomic tokens and do not take suffixes or anti prefixes | forbid entirely  |
| `2h`, `4h`, `0h`, `3h`, `5h`, `12h` | numeric whole-core aggregate notation is retired; use `hp` or `hq` when appropriate | forbid entirely  |
| raw concatenations of `h` and `ah` for mixed-core composites | obscures anti scope and constituent boundaries; use `hp` or `hq` | forbid entirely  |
| `aae`, `aav2`, `aah`        | stacked anti prefixes add no meaning and create parser noise              | forbid entirely  |
| `aW+`, `aW-`, `aZ`, `a1:1@` | anti is not currently defined for these families                          | forbid entirely  |
| `e0`, `e4`, `u9`, `v7`      | generation outside `1`, `2`, `3`                                          | forbid entirely  |
| `0:0@`                      | null `Unbound Architrinos` ledger carries no usable content                  | forbid entirely  |
| `h23`, `u23`, `e12`         | visually suggests one token but leaves trailing digits ambiguous          | forbid entirely  |
| `@`, `2@`, `227@`           | omitted ledger side makes the unbound-architrino token ambiguous             | forbid entirely  |
| `:120@`, `227:@`            | omitted ledger side creates a special-case parse                          | forbid entirely  |
| `227:120@3`, `1:1@2`        | payload after `@` collides with the token boundary                        | forbid entirely  |

Operational lexer guidance:

- treat `W+` and `W-` as atomic two-character tokens;
- recognize `h2` and `h3` before bare `h`;
- recognize `hp` and `hq` as committed named core-composite tokens before testing bare `h`;
- recognize `[digits]:[digits]@` as one `Unbound Architrinos` ledger token that ends at `@`;
- do not require separators around any token family when the surrounding token boundaries are already unambiguous under longest-match tokenization;
- and reject any `@` form that does not contain both explicit ledger sides before the trailing `@`.

### Proposed Registry Table

Assemblies come first because they are the solver-native export surface. In the `Pro or Anti` column, `mixed` means the whole object is built from both pro and anti ingredients, while `self-conjugate` means the current shorthand is its own anti form.

For composites, the `AAA Notation` column uses the current atomic shorthand when one exists (`P`, `N`, `hp`, `hq`, `W+`, `W-`, `Z`). Otherwise it uses a constituent expression built from assembly-level AAA tokens.

#### Assemblies

| Canonical ID | Full Name | PDG Notation | AAA Notation | Type | Breakdown into AAA notation at Noether core and unbound architrinos layer | Total architrinos | Family | Generation | Pro or Anti | Exportable to pdgsolve |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `pro_noether_core_I` | Pro Noether Core | `n/a` | `h` | assembly | `h` | `3:3@` | Noether core | I | pro | yes |
| `anti_noether_core_I` | Anti Noether Core | `n/a` | `ah` | assembly | `ah` | `3:3@` | Noether core | I | anti | yes |
| `pro_noether_core_II` | Pro Bi-Binary | `n/a` | `h2` | assembly | `h2` | `2:2@` | Noether core | II | pro | yes |
| `anti_noether_core_II` | Anti Bi-Binary | `n/a` | `ah2` | assembly | `ah2` | `2:2@` | Noether core | II | anti | yes |
| `pro_noether_core_III` | Pro Uni-Binary | `n/a` | `h3` | assembly | `h3` | `1:1@` | Noether core | III | pro | yes |
| `anti_noether_core_III` | Anti Uni-Binary | `n/a` | `ah3` | assembly | `ah3` | `1:1@` | Noether core | III | anti | yes |
| `pro_electron_I` | Electron | `e-` | `e` | assembly | `h + 6:0@` | `9:3@` | charged lepton | I | pro | yes |
| `anti_electron_I` | Positron | `e+` | `ae` | assembly | `ah + 0:6@` | `3:9@` | charged lepton | I | anti | yes |
| `pro_electron_neutrino_I` | Electron Neutrino | `nu_e` | `v` | assembly | `h` | `3:3@` | neutrino | I | pro | yes |
| `anti_electron_neutrino_I` | Anti Electron Neutrino | `anti-nu_e` | `av` | assembly | `ah` | `3:3@` | neutrino | I | anti | yes |
| `pro_up_quark_I` | Up Quark | `u` | `u` | assembly | `h + 1:5@` | `4:8@` | up-type quark | I | pro | yes |
| `anti_up_quark_I` | Anti Up Quark | `anti-u` | `au` | assembly | `ah + 5:1@` | `8:4@` | up-type quark | I | anti | yes |
| `pro_down_quark_I` | Down Quark | `d` | `d` | assembly | `h + 4:2@` | `7:5@` | down-type quark | I | pro | yes |
| `anti_down_quark_I` | Anti Down Quark | `anti-d` | `ad` | assembly | `ah + 2:4@` | `5:7@` | down-type quark | I | anti | yes |
| `pro_muon_II` | Muon | `mu-` | `e2` | assembly | `h2 + 6:0@` | `8:2@` | charged lepton | II | pro | yes |
| `anti_muon_II` | Anti Muon | `mu+` | `ae2` | assembly | `ah2 + 0:6@` | `2:8@` | charged lepton | II | anti | yes |
| `pro_muon_neutrino_II` | Muon Neutrino | `nu_mu` | `v2` | assembly | `h2` | `2:2@` | neutrino | II | pro | yes |
| `anti_muon_neutrino_II` | Anti Muon Neutrino | `anti-nu_mu` | `av2` | assembly | `ah2` | `2:2@` | neutrino | II | anti | yes |
| `pro_charm_quark_II` | Charm Quark | `c` | `u2` | assembly | `h2 + 1:5@` | `3:7@` | up-type quark | II | pro | yes |
| `anti_charm_quark_II` | Anti Charm Quark | `anti-c` | `au2` | assembly | `ah2 + 5:1@` | `7:3@` | up-type quark | II | anti | yes |
| `pro_strange_quark_II` | Strange Quark | `s` | `d2` | assembly | `h2 + 4:2@` | `6:4@` | down-type quark | II | pro | yes |
| `anti_strange_quark_II` | Anti Strange Quark | `anti-s` | `ad2` | assembly | `ah2 + 2:4@` | `4:6@` | down-type quark | II | anti | yes |
| `pro_tau_III` | Tau | `tau-` | `e3` | assembly | `h3 + 6:0@` | `7:1@` | charged lepton | III | pro | yes |
| `anti_tau_III` | Anti Tau | `tau+` | `ae3` | assembly | `ah3 + 0:6@` | `1:7@` | charged lepton | III | anti | yes |
| `pro_tau_neutrino_III` | Tau Neutrino | `nu_tau` | `v3` | assembly | `h3` | `1:1@` | neutrino | III | pro | yes |
| `anti_tau_neutrino_III` | Anti Tau Neutrino | `anti-nu_tau` | `av3` | assembly | `ah3` | `1:1@` | neutrino | III | anti | yes |
| `pro_top_quark_III` | Top Quark | `t` | `u3` | assembly | `h3 + 1:5@` | `2:6@` | up-type quark | III | pro | yes |
| `anti_top_quark_III` | Anti Top Quark | `anti-t` | `au3` | assembly | `ah3 + 5:1@` | `6:2@` | up-type quark | III | anti | yes |
| `pro_bottom_quark_III` | Bottom Quark | `b` | `d3` | assembly | `h3 + 4:2@` | `5:3@` | down-type quark | III | pro | yes |
| `anti_bottom_quark_III` | Anti Bottom Quark | `anti-b` | `ad3` | assembly | `ah3 + 2:4@` | `3:5@` | down-type quark | III | anti | yes |

#### Composites

| Canonical ID | Full Name | PDG Notation | AAA Notation | Type | Breakdown into AAA notation at Noether core and unbound architrinos layer | Total architrinos | Family | Generation | Pro or Anti | Exportable to pdgsolve |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `proton` | Proton | `p` | `P` | composite | `u.u.d = (h + 1:5@).(h + 1:5@).(h + 4:2@)` | `15:21@` | baryon | I | pro | no |
| `anti_proton` | Anti Proton | `anti-p` | `aP` | composite | `au.au.ad = (ah + 5:1@).(ah + 5:1@).(ah + 2:4@)` | `21:15@` | baryon | I | anti | no |
| `neutron` | Neutron | `n` | `N` | composite | `u.d.d = (h + 1:5@).(h + 4:2@).(h + 4:2@)` | `18:18@` | baryon | I | pro | no |
| `anti_neutron` | Anti Neutron | `anti-n` | `aN` | composite | `au.ad.ad = (ah + 5:1@).(ah + 2:4@).(ah + 2:4@)` | `18:18@` | baryon | I | anti | no |
| `photon` | Photon | `gamma` | `hp` | composite | `h.ah` | `6:6@` | boson | `n/a` | self-conjugate | no |
| `higgs_cluster` | Higgs Cluster | `H` | `hq` | composite | `h.h.ah.ah` | `12:12@` | boson | `n/a` | mixed | no |
| `w_plus_corridor` | W+ Boson | `W+` | `W+` | composite | `ah.ah + 0:6@` | `6:12@` | weak boson | `n/a` | mixed | no |
| `w_minus_corridor` | W- Boson | `W-` | `W-` | composite | `h.h + 6:0@` | `12:6@` | weak boson | `n/a` | mixed | no |
| `z_corridor` | Z Boson | `Z` | `Z` | composite | `h.ah` | `6:6@` | weak boson | `n/a` | self-conjugate | no |
| `positive_pion` | Positive Pion | `pi+` | `u.ad` | composite | `u.ad = (h + 1:5@).(ah + 2:4@)` | `9:15@` | meson | I | mixed | no |
| `neutral_pion` | Neutral Pion | `pi0` | `u.au / d.ad` | composite | `u.au or d.ad` | `12:12@` | meson | I | self-conjugate | no |
| `negative_pion` | Negative Pion | `pi-` | `d.au` | composite | `d.au = (h + 4:2@).(ah + 5:1@)` | `15:9@` | meson | I | mixed | no |
| `positive_kaon` | Positive Kaon | `K+` | `u.ad2` | composite | `u.ad2 = (h + 1:5@).(ah2 + 2:4@)` | `8:14@` | meson | `I+II` | mixed | no |
| `neutral_kaon` | Neutral Kaon | `K0` | `d.ad2` | composite | `d.ad2 = (h + 4:2@).(ah2 + 2:4@)` | `11:11@` | meson | `I+II` | mixed | no |
| `negative_kaon` | Negative Kaon | `K-` | `au.d2` | composite | `au.d2 = (ah + 5:1@).(h2 + 4:2@)` | `14:8@` | meson | `I+II` | mixed | no |
| `anti_neutral_kaon` | Anti Neutral Kaon | `anti-K0` | `ad.d2` | composite | `ad.d2 = (ah + 2:4@).(h2 + 4:2@)` | `11:11@` | meson | `I+II` | mixed | no |
| `positive_b_meson` | Positive B Meson | `B+` | `u.ad3` | composite | `u.ad3 = (h + 1:5@).(ah3 + 2:4@)` | `7:13@` | meson | `I+III` | mixed | no |
| `neutral_b_meson` | Neutral B Meson | `B0` | `d.ad3` | composite | `d.ad3 = (h + 4:2@).(ah3 + 2:4@)` | `10:10@` | meson | `I+III` | mixed | no |
| `negative_b_meson` | Negative B Meson | `B-` | `au.d3` | composite | `au.d3 = (ah + 5:1@).(h3 + 4:2@)` | `13:7@` | meson | `I+III` | mixed | no |
| `anti_neutral_b_meson` | Anti Neutral B Meson | `anti-B0` | `ad.d3` | composite | `ad.d3 = (ah + 2:4@).(h3 + 4:2@)` | `10:10@` | meson | `I+III` | mixed | no |

The photon, Higgs-cluster, and weak-corridor rows above are still shorthand structural sketches, not closed microstate derivations. They belong in the composite half of the registry because the solver-native export surface should stay limited to the assembly rows only.
