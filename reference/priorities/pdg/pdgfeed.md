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

## Design

### Environment And PDG Package

`pdgfeed` uses the official Python `pdg` package against a local SQLite database.

Assumptions:

- Python 3 runtime;
- installed `pdg` package from `requirements.txt`;
- local SQLite database access through `pdg.connect(...)`;
- for live PDG work in this workspace, the shared venv at `/Users/markmorris/vibe/.venv`;
- no PDG website dependency during normal ingest.

Policy:

- the local database is the SQLite file bundled with the installed `pdg` package unless a different database URL is supplied explicitly;
- package and database updates are a developer-maintained concern, not a runtime ingest concern;
- the primary integration path is the official Python API over the local SQLite database;
- direct SQL is secondary and should be used only when the Python API does not expose the needed traversal cleanly;
- and REST or website access is incidental only, for inspection or experiments, not for normal ingest.

### Runtime Model

`pdgfeed` implementation ownership is in `scripts/pdg/pdgfeed.py`. Root `pdgfeed.py` delegates CLI and module entry into that implementation.

The normal ingest path should be local and offline once dependencies are installed. `scripts/pdg/pdgfeed.py` connects to the local PDG database, performs PDG lookups, normalizes PDG objects into repo-owned records, builds ranked proposals, and emits solver-facing payloads plus sidecar proposal metadata.

The implementation exposes two primary runtime surfaces plus the root entrypoint:

- a library entrypoint in `scripts/pdg/pdgfeed.py` that returns normalized PDG-derived candidates;
- a CLI entrypoint in `scripts/pdg/pdgfeed.py` that reads local PDG data and writes JSON artifacts for inspection and tests;
- and the root `pdgfeed.py` entrypoint, which imports and delegates to `scripts/pdg/pdgfeed.py`.

Conceptually, `pdgfeed` does only five things:

1. list available reactions;
2. build a proposal for one reaction;
3. build a `pdgsolve-request/v1` for one reaction when its PDG participants transform fully into admitted assembly rows;
4. build PDG reaction output for multi-reaction work;
5. export a support summary for many reactions.

The CLI therefore supports listing, one-reaction proposal builds, one-reaction request builds, live-manifest builds, and support-summary exports. Output formats are plain text for lists, JSON for proposal/request/manifest payloads, and CSV for support summaries.

The canonical CLI surface should be only five subcommands. All calls below use the root `pdgfeed.py` entrypoint. Top-level `--output-dir DIR` and `--database-url URL` may be placed before the subcommand.

| Call                                  | Options                                                            | Output content                                                                                                                                                                                                                        | Output format           | Output location                                                                                                                                                                                             |
| ------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pdgfeed.py list`                     | `--source pdg-reactions`                                           | Writes a Markdown table containing a `k/u` marker, exact `(mcid, pdgIdentifier)` provenance, reaction ids, titles, channel descriptions, and `pdgsolve` readiness status from the full live PDG decay database. Known reactions are printed first. | Markdown table          | `stats/pdgfeed.list.<source>.md` and prints that path to `stdout`                                                                                                                                           |
| `pdgfeed.py proposal REACTION_ID`     | `--source pdg-reactions`, `--write`                                | Emits one normalized `pdg-proposal/v1` record for the selected reaction. Without `--write`, print the proposal payload to stdout. With `--write`, write the proposal artifact under the generated output directory.                   | JSON                    | `stdout` or `--output-dir` (default `content/contracts/examples/pdg/v1/generated/`)                                                                                                                         |
| `pdgfeed.py request REACTION_ID`      | `--source pdg-reactions`, `--write`                                | Emits one `pdgsolve-request/v1` payload when the selected reaction transforms fully into admitted assembly rows. Without `--write`, print the request payload to stdout. With `--write`, write request-capable artifacts under the generated output directory. | JSON                    | `stdout` or `--output-dir` (default `content/contracts/examples/pdg/v1/generated/`)                                                                                                                         |
| `pdgfeed.py manifest`                 | none beyond top-level options                                      | Prints one `pdg-live-manifest/v1` payload with ready live-PDG entries, blocked-discovery counts, top blocked particles, and embedded proposal/request sidecars for ready entries.                                                  | JSON                    | `stdout`                                                                                                                                                                                                    |
| `pdgfeed.py supported-csv [CSV_PATH]` | `--source pdg-reactions`, optional `CSV_PATH`                      | Writes primitive-count summary rows for reactions that are ready for `pdgsolve` after transform, including a `k/u` marker plus exact `(mcid, pdgIdentifier)` provenance, and also writes a Markdown table sidecar under `stats/`. Known reactions are printed first. | CSV plus Markdown table | CSV at `CSV_PATH` or default `content/contracts/examples/pdg/v1/generated/supported_reaction_primitive_deltas.v1.csv`, Markdown at `stats/pdgfeed.supported.<source>.md`; both paths are printed to `stdout` |

The `pdgsolve` handoff surface is intentionally narrow. `pdgfeed` uses a locked v1 mapping registry from canonical PDG ASCII particle names to explicit admitted `pdgsolve-request/v1` assemblies. Local aliases may canonicalize into those names, but they do not create new handoff vocabulary. If a particle or channel cannot be translated all the way into explicit admitted Standard Model assemblies, it stays upstream as proposal metadata and does not emit a solver request.

`pdgfeed` is the upstream owner of composite-to-assembly translation for PDG-facing language.

That means:

- PDG names such as `n` and `p` may be expanded into explicit emitted assembly occurrences before the request crosses into pdgsolve;
- unsupported or ambiguous higher-scale terms must remain un-mappable rather than leaking into solver-native request ids;
- if multiple upstream interpretations are plausible, that ambiguity belongs in PDG proposal/review state rather than in pdgsolve ontology;
- and the default architecture should use PDG-side translators and review artifacts rather than adding a new dedicated app between pdgfeed and pdgsolve.

The proposal and request boundary should use two repo-owned layers:

- a normalized PDG proposal record used inside ingest;
- and one emitted `pdgsolve-request/v1` candidate per reaction that is ready for `pdgsolve` after transform.

PDG decay rows should be treated as effective local channel records, not as complete ontological histories. In AAA terms, a PDG row is usually the named parent assembly plus the reported observed channel after production, while the surrounding Noether Sea, local medium loading, and any upstream production chain are not encoded explicitly in the PDG boundary object.

Proposal records should carry stable identity, source provenance, normalized participants, ranking metadata, and notes about ambiguity or unsupported structure. Normalization should target the explicit upstream solve-request boundary, not a UI-shaped structure.

The normalized output should include:

- participant identities;
- decay/channel structure;
- multiplicities and subdecay structure;
- ranking metadata;
- and provenance metadata needed for later review.

When the PDG API marks a row as a `subdecay`, `pdgfeed` should treat that as decay-table hierarchy inside the same parent particle record, not as proof of a separate upstream reaction network. The current PDG boundary does not generally encode the full causal production history of the parent particle.

Requests should be emitted only from normalized proposal records, never directly from raw PDG objects. Each emitted request must:

- use schema `pdgsolve-request/v1`;
- set `source.kind` to `pdgfeed`;
- point `source.sourceDocumentId` to `pdg-proposal:<proposalId>`;
- contain only explicit assembly-native occurrences in `reactants` and `products`;
- and preserve unsupported or ambiguous PDG structure in proposal metadata rather than guessing a solver payload.

For v1, `pdgfeed` should also resolve any negative boundary ledger deficit on the request boundary before handoff. If the transformed product side exceeds the transformed reactant side in either electrinos or positrinos, `pdgfeed` should add the minimum number of explicit Noether-pair reactants, each pair being one `h` plus one `ah`, so both reactant-minus-product ledger deltas are nonnegative before the request crosses into `pdgsolve`.

This boundary balancing rule should be read as an explicit AAA translation policy for incomplete medium provenance, not as a claim that the underlying reaction took place in an empty vacuum. The working interpretation is that PDG gives an effective observed channel, while `pdgfeed` may need to account for omitted ambient Noether-Sea participation at the solver boundary. `pdgfeed` should still avoid inventing detailed medium microhistories or generic defect species unless and until the repository carries an explicit, ledger-stable upstream rule for them.

The practical flow is:

1. connect to the local PDG database;
2. retrieve reaction data, with the PDG adapter exposing the PDG objects and metadata the ingest layer actually consumes;
3. normalize PDG particles, identifiers, decay products, multiplicities, and subdecay structure into explicit repo-owned proposal records;
4. build proposal candidates, attach ranking metadata, record the source information needed for later review, and emit `pdgsolve-request/v1` only when the channel is fully mappable;
5. otherwise keep the case upstream as blocked proposal output.

PDG reaction multiplicities for concrete mapped particles may expand into repeated normalized participants. Those repetitions only cross the request seam when every repeated particle has an explicit `pdgsolve-request/v1` mapping.

#### Known Reactions

The only repo-owned reaction data kept in source is the exact known-reaction key list:

- `(13, "S004.1/2025")`
- `(13, "S004.2/2025")`
- `(13, "S004.7/2025")`
- `(13, "S004.4/2025")`
- `(211, "S008.1/2025")`

Each key is `(source.mcid, source.pdgIdentifier)`. No separate repo-owned reaction corpus, alias list, or copied reaction payload set should be kept alongside these keys.

Representative regression commands:

- `python pdgfeed.py list --source pdg-reactions`
- `python pdgfeed.py request mu_minus_s004_1 --source pdg-reactions > /tmp/mu_minus_s004_1.request.json`
- `python pdgfeed.py supported-csv /tmp/pdg-supported.csv --source pdg-reactions`
- `python pdgfeed.py manifest > /tmp/pdg-live-manifest.json`

Regression expectations:

- known reactions appear first in reaction listings and carry the `k` marker, while all others carry `u`;
- ready reactions continue to emit stable `pdg-proposal/v1` and `pdgsolve-request/v1` artifacts keyed by live `(mcid, pdgIdentifier)` provenance;
- blocked reactions stay blocked with explicit unsupported notes rather than guessed request output;
- and live discovery manifests report ready channels and blocked discoveries separately.

The detailed canonical-name export policy is summarized in the registry material below.

The v1 un-mappable-particle policy is:

- only canonical PDG names with an explicit Standard Model assembly translation may be emitted into `pdgsolve-request/v1`;
- local aliases may canonicalize into those names, but aliases do not define new solver mappings;
- a particle explicitly marked un-mappable must remain in proposal metadata and notes only;
- any particle absent from the table is also un-mappable by default;
- decay products with concrete mapped particle identities may expand multiplicities into repeated normalized participants;
- and any decay product that arrives as a generic/textual PDG item or requires subdecay-specific interpretation stays un-mappable until an explicit assembly-native upstream translation rule exists.

Registry expansion should stay deliberate. New transform coverage should enter only by adding an explicit canonical PDG-name row to the locked table with matching request expansion and regression coverage.

Each emitted `pdgsolve-request/v1` candidate should:

- `source.kind` set to `pdgfeed`;
- `source.sourceDocumentId` pointing back to the originating `pdg-proposal:<proposalId>` record;
- `reactants` and `products` emitted as explicit request occurrences with stable `id`, `assemblyId`, and `title` fields;
- set `policy` explicitly;
- and keep PDG provenance in `source` fields or sidecar proposal metadata.

A single PDG participant may expand into multiple emitted request occurrences. That expansion is a `pdgfeed` responsibility and must happen before `pdgsolve-request/v1` crosses into `pdgsolve`.

In v1, if a PDG particle identity denotes a superposition of fermion constituent states, `pdgfeed` emits the union of those already-supported constituent fermion rows in the translated reaction. Current examples include `pi0`, `eta`, `K0S`, and `K0L`. Future tooling may attach richer metadata, but the v1 request surface records explicit constituent rows only and does not carry superposition factors or amplitudes.

Before proposal normalization, `pdgfeed` also applies one deterministic generic-family charge-closure pass for product tokens `pi`, `N`, and `Nbar`. That pass may emit concrete `pi+`, `pi0`, `pi-`, `p`, `n`, `anti-p`, or `anti-n` only when the parent charge plus the already-concrete sibling products force exactly one unordered assignment. If zero or multiple valid assignments remain, the channel stays blocked upstream with explicit notes rather than guessing a `pdgsolve-request/v1` payload.

### Reporting And Audit Surfaces

The current `pdgfeed` implementation now exposes three generated Markdown reports under `stats/`:

- `pdgfeed.list.<source>.md` for the full live reaction list;
- `pdgfeed.supported.<source>.md` for ready reactions with AAA deltas;
- and `pdgfeed.summary.<source>.md` for total counts, category counts, and the top backlog particles.

Those reports are not just convenience output. They are the current operational audit surface for the upstream boundary. The summary split should be read as:

- `supported`: a concrete PDG row that transforms fully into explicit AAA rows;
- `AAAcomplete`: a PDG row that is incomplete at the PDG boundary but still reaches an explicit request under current deterministic AAA translation rules;
- `incomplete`: a blocked row where the PDG record remains partial, generic, inclusive, or otherwise omits medium/provenance detail needed for a fully explicit solver request;
- `backlog`: a blocked row that is concrete enough to read, but still lacks explicit v1 AAA particle coverage;
- `ready`: request-emitting rows;
- and `blocked`: all non-ready rows regardless of whether the cause is PDG incompleteness or missing AAA support.

This classification matters because it separates two different kinds of upstream limitation:

- the PDG record may be incomplete as an AAA boundary object even when the observed decay channel is physically real;
- or the PDG record may already be concrete enough, but the repository still lacks the corresponding explicit particle-to-AAA mapping.

The base registry and transform rules now also have dedicated audit coverage in the test suite. Those audits check constituent-sum consistency, declared charge consistency, conjugate-pair symmetry, request-transform references, and alias/canonical-name discipline. That audit layer is intended to keep low-level registry growth from silently drifting away from the solver boundary contract.

## Priorities

### 1. Expand V1 Coverage For The Top Backlog Particles

Status: `next`

Current:

- the current `pdgfeed` summary report separates blocked reactions into `incomplete` and `backlog`;
- the `backlog` class is the set of blocked reactions whose PDG records are concrete enough to read but whose particles still lack v1 AAA transform coverage;
- supported fermion-superposition particles now expand by emitting all enumerated constituent fermions rather than picking a representative branch, and `K0S`/`K0L` have dropped out of the top backlog set;
- and the current top backlog particles are:
  - `phi` — `255`
  - `Dbar0` — `253`
  - `D0` — `213`
  - `D+` — `212`
  - `D-` — `200`
  - `Sigma+` — `75`
  - `Xi-` — `72`
  - `Xi0` — `60`
  - `Sigma0` — `41`
  - `Sigma-` — `31`

Objective:

- use the backlog ranking from the generated report to drive the next wave of explicit v1 particle-to-AAA mapping work;
- start with the highest-count concrete particles rather than adding more generic or inclusive heuristics;
- and reduce the `backlog` count without reclassifying partial PDG records as complete.

Rules:

- add new coverage only through explicit canonical-name rows in the locked registry table;
- keep generic/inclusive PDG records in the `incomplete` class unless their structure truly becomes explicit at the PDG boundary;
- add regression coverage for every new particle mapping before treating its channels as ready;
- keep the distinction clear between a PDG row that is incomplete because the PDG record omits medium/provenance detail and a row that is blocked because a concrete particle still lacks AAA coverage;
- and prefer the highest-count backlog particles first unless there is a strong architectural reason to take a lower-count particle earlier.

Done when:

- the top backlog particle list has materially changed because at least one of the leading concrete particles now transforms into AAA;
- newly covered particles emit stable proposal/request artifacts with regression coverage;
- and the `backlog` count decreases without inflating the `incomplete` class through category drift.

### 2. Investigate Heuristic Transform Areas More Deeply

Status: `later`

Current:

- `pdgfeed` now contains a small set of deterministic upstream heuristics so more PDG channels can be normalized into explicit AAA rows;
- those heuristics are acceptable for v1 ingestion work, but they compress structure that should eventually receive a more detailed assembly-level analysis;
- and the current heuristic-analysis backlog includes:
  - reactions that involve quantum superpositions or mixed-flavor composites, even when v1 now emits all enumerated constituent fermions;
  - charge-conjugate reactions where product-side conjugation is inferred to restore charge closure;
  - generic-family charge-closure reactions for `pi`, `N`, and `Nbar`;
  - composite constituent expansions that suppress amplitude metadata, such as the current `eta -> u, anti-u, d, anti-d, s, anti-s` v1 transform;
  - and PDG channels that are treated as effective local decay records even though the surrounding Noether-Sea participation and production history are not encoded in the PDG boundary object.

Objective:

- identify which current heuristics are merely practical v1 normalizations and which should later be replaced by a deeper assembly-native derivation;
- document the exact assumptions each heuristic currently makes at the PDG-to-AAA boundary;
- and create a clearer path from today’s deterministic transforms to future theory-facing treatments.

Rules:

- do not remove working v1 transforms until a replacement rule is explicit and regression-covered;
- keep the current request surface explicit and deterministic even when the underlying theory-facing explanation is postponed;
- record the scope and limits of each heuristic in repository documentation rather than leaving them implicit in code alone;
- and separate “PDG record is incomplete” from “our current transform is approximate” because those are different upstream conditions.

Done when:

- each current heuristic transform family has a short written design note with examples and limits;
- the repo can distinguish between pragmatic v1 translation rules and theory-facing derivations still under investigation;
- and future mapping work can reference an explicit investigation queue rather than re-discovering these heuristic boundaries ad hoc.

### 3. Model Equilibrium Noether-Sea Boundary Participation

Status: `later`

Current:

- the current v1 boundary already assumes that many PDG rows are effective observed channels rather than full AAA ontological histories;
- omitted ambient participation is presently handled only through bounded Noether-pair augmentation and blocked/incomplete proposal notes;
- AAA theory suggests a surrounding equilibrium-like Noether Sea of coupled pro/anti Noether cores whose local state may be loaded, polarized, or disturbed by passing Standard Model assemblies and possibly by gravitational-wave-like medium disturbances;
- the current ingest layer does not yet distinguish clearly between equilibrium medium participation, local disequilibrium, localized Noether-Sea dissociation, catalytic defect-like behavior, or explicit upstream production history;
- and the current reports do not yet expose a formal vocabulary for these medium-side explanations beyond `incomplete`, `AAAcomplete`, and bounded Noether balancing.

Objective:

- define how `pdgfeed` should describe omitted ambient Noether-Sea participation at the PDG-to-AAA boundary without pretending to know the full microhistory;
- clarify when a channel should remain a generic equilibrium-medium case, when bounded explicit Noether-pair/core augmentation is enough, and when a richer future medium model would be required;
- record how passing Standard Model assemblies and medium disturbances such as gravitational-wave-like excitations are expected to interact with that equilibrium sea at the explanatory level;
- and keep the solver boundary physically honest while preserving the current strict explicit-assembly request surface.

Rules:

- do not introduce generic solver-native `defect`, `spacetime`, or other medium-label particles into `pdgsolve-request/v1`;
- keep `Noether Sea` as the canonical ontological label for ambient contents and keep `spacetime` as an emergent/effective term only;
- treat boundary balancing as a translation policy for omitted medium provenance, not as a claim that the event occurred in empty space;
- distinguish explicitly between observed PDG channel, current boundary augmentation policy, and any deeper speculative microhistory;
- and require explicit conserved ledgers, deterministic transforms, and regression coverage before admitting any new medium-side object or typed anomaly into the upstream boundary.

Done when:

- `pdgfeed` and adjacent boundary docs explain the current equilibrium-medium interpretation in one consistent vocabulary;
- the repository can discuss omitted Noether-Sea participation, local dissociation hypotheses, and medium disturbances without collapsing them into solver-native particles prematurely;
- report and review surfaces can distinguish unsupported concrete particles from unresolved medium/provenance questions;
- and any future medium-side construct admitted upstream has a clear ledger-stable AAA definition rather than a placeholder label.



## Grammar Map

### Invocation Modes



The reaction-string notation should use compact strings and should also allow optional benign separators between tokens so humans can make distinct assemblies easier to read. The default separator should be `.`.

Examples:

| Notation | Meaning |
| --- | --- |
| `Pe2v` | compact form with no separators |
| `P.e2.v` | same input with preferred separators |
| `P,e2,v` | same input with comma separators |
| `h2.W-.P` | distinct assemblies made easier to scan |
| `P.e.av` | proton, electron, anti-neutrino |
| `1:1@.P.e` | explicit `Unbound Architrinos` ledger plus proton and electron |

Example reaction strings, free neutron decay with an added `hq` reactant:

| Form      | Reactants | Products |
| --------- | --------- | -------- |
| compact   | `Nhq`     | `Peav`   |
| separated | `N.hq`    | `P.e.av` |

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
| `hq`         | Noether Quad (aka Higgs Cluster) | mixed-core shorthand for `h.ah.h.ah`                               | `n/a`            |
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

| Notation | Meaning                             |
| -------- | ----------------------------------- |
| `1:1@`   | one electrino and one positrino     |
| `7:12@`  | `7` electrinos and `12` positrinos  |
| `7:0@`   | `7` electrinos and zero positrinos  |
| `0:12@`  | zero electrinos and `12` positrinos |

Both sides of the ledger should always be present. If one side is zero, the zero should still be written explicitly. The one excluded case is `0:0@`, which should be forbidden as a meaningless null ledger. That keeps the grammar single-reading and avoids special omission rules such as trying to infer whether `7@` means `7:0@`, `0:7@`, or something else.

The choice of `@` for `Unbound Architrinos` is intentional. It works well at the shell level because it is safe in unquoted command-line arguments, but it also carries a useful visual and conceptual resonance. The symbol reads like a curling or spiraling enclosure, which fits the intuition that a unbound electrino and positrino meeting in isolation would tend toward a tighter orbital closure. At the same time, the historical bookkeeping meaning of the at sign ties neatly into the solver's conservation and provenance ledger: `@` already carries the feel of accounting, relation, and counted association. That makes it a rare symbol that is compact, typeable, shell-safe, visually suggestive, and semantically aligned with the solver's charge-routing and ledger language.

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

Assemblies come first because they are the solver-native export surface. In the `Pro or Anti` column, `mixed` means the whole object is built from both pro and anti ingredients, while `self-conjugate` means the current shorthand is its own anti form. Composites never cross directly into `pdgsolve`. The last column records whether `pdgfeed` currently has a fixed transform from the composite into admitted assembly rows before handoff.

For composites, the `AAA Notation` column uses the current atomic shorthand when one exists (`P`, `N`, `hp`, `hq`, `W+`, `W-`, `Z`). Otherwise it uses a constituent expression built from assembly-level AAA tokens.

#### Assemblies

| Canonical ID | Full Name | PDG Notation | AAA Notation | Type | Breakdown into AAA notation at Noether core and unbound architrinos layer | Total architrinos | Family | Generation | Pro or Anti | Transforms to pdgsolve rows |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `pro_noether_core_I` | Pro Noether Core | `n/a` | `h` | assembly | `h` | `3:3@` | Noether core | I | pro | yes |
| `anti_noether_core_I` | Anti Noether Core | `n/a` | `ah` | assembly | `ah` | `3:3@` | Noether core | I | anti | yes |
| `pro_noether_core_II` | Pro Bi-Binary | `n/a` | `h2` | assembly | `h2` | `2:2@` | Noether core | II | pro | yes |
| `anti_noether_core_II` | Anti Bi-Binary | `n/a` | `ah2` | assembly | `ah2` | `2:2@` | Noether core | II | anti | yes |
| `pro_noether_core_III` | Pro Uni-Binary | `n/a` | `h3` | assembly | `h3` | `1:1@` | Noether core | III | pro | yes |
| `anti_noether_core_III` | Anti Uni-Binary | `n/a` | `ah3` | assembly | `ah3` | `1:1@` | Noether core | III | anti | yes |
| `pro_electron_I` | Electron | `e-` | `e` | assembly | `h + 6:0@` | `9:3@` | charged lepton | I | pro | yes |
| `anti_electron_I` | Positron | `e+` | `ae` | assembly | `ah + 0:6@` | `3:9@` | charged lepton | I | anti | yes |
| `pro_electron_neutrino_I` | Electron Neutrino | `nu_e` | `v` | assembly | `h + 3:3@` | `6:6@` | neutrino | I | pro | yes |
| `anti_electron_neutrino_I` | Anti Electron Neutrino | `anti-nu_e` | `av` | assembly | `ah + 3:3@` | `6:6@` | neutrino | I | anti | yes |
| `pro_up_quark_I` | Up Quark | `u` | `u` | assembly | `h + 1:5@` | `4:8@` | up-type quark | I | pro | yes |
| `anti_up_quark_I` | Anti Up Quark | `anti-u` | `au` | assembly | `ah + 5:1@` | `8:4@` | up-type quark | I | anti | yes |
| `pro_down_quark_I` | Down Quark | `d` | `d` | assembly | `h + 4:2@` | `7:5@` | down-type quark | I | pro | yes |
| `anti_down_quark_I` | Anti Down Quark | `anti-d` | `ad` | assembly | `ah + 2:4@` | `5:7@` | down-type quark | I | anti | yes |
| `pro_muon_II` | Muon | `mu-` | `e2` | assembly | `h2 + 6:0@` | `8:2@` | charged lepton | II | pro | yes |
| `anti_muon_II` | Anti Muon | `mu+` | `ae2` | assembly | `ah2 + 0:6@` | `2:8@` | charged lepton | II | anti | yes |
| `pro_muon_neutrino_II` | Muon Neutrino | `nu_mu` | `v2` | assembly | `h2 + 3:3@` | `5:5@` | neutrino | II | pro | yes |
| `anti_muon_neutrino_II` | Anti Muon Neutrino | `anti-nu_mu` | `av2` | assembly | `ah2 + 3:3@` | `5:5@` | neutrino | II | anti | yes |
| `pro_charm_quark_II` | Charm Quark | `c` | `u2` | assembly | `h2 + 1:5@` | `3:7@` | up-type quark | II | pro | yes |
| `anti_charm_quark_II` | Anti Charm Quark | `anti-c` | `au2` | assembly | `ah2 + 5:1@` | `7:3@` | up-type quark | II | anti | yes |
| `pro_strange_quark_II` | Strange Quark | `s` | `d2` | assembly | `h2 + 4:2@` | `6:4@` | down-type quark | II | pro | yes |
| `anti_strange_quark_II` | Anti Strange Quark | `anti-s` | `ad2` | assembly | `ah2 + 2:4@` | `4:6@` | down-type quark | II | anti | yes |
| `pro_tau_III` | Tau | `tau-` | `e3` | assembly | `h3 + 6:0@` | `7:1@` | charged lepton | III | pro | yes |
| `anti_tau_III` | Anti Tau | `tau+` | `ae3` | assembly | `ah3 + 0:6@` | `1:7@` | charged lepton | III | anti | yes |
| `pro_tau_neutrino_III` | Tau Neutrino | `nu_tau` | `v3` | assembly | `h3 + 3:3@` | `4:4@` | neutrino | III | pro | yes |
| `anti_tau_neutrino_III` | Anti Tau Neutrino | `anti-nu_tau` | `av3` | assembly | `ah3 + 3:3@` | `4:4@` | neutrino | III | anti | yes |
| `pro_top_quark_III` | Top Quark | `t` | `u3` | assembly | `h3 + 1:5@` | `2:6@` | up-type quark | III | pro | yes |
| `anti_top_quark_III` | Anti Top Quark | `anti-t` | `au3` | assembly | `ah3 + 5:1@` | `6:2@` | up-type quark | III | anti | yes |
| `pro_bottom_quark_III` | Bottom Quark | `b` | `d3` | assembly | `h3 + 4:2@` | `5:3@` | down-type quark | III | pro | yes |
| `anti_bottom_quark_III` | Anti Bottom Quark | `anti-b` | `ad3` | assembly | `ah3 + 2:4@` | `3:5@` | down-type quark | III | anti | yes |

#### Composites

| Canonical ID           | Full Name            | PDG Notation | AAA Notation  | Type      | Breakdown into AAA notation at Noether core and unbound architrinos layer | Total architrinos | Family     | Generation | Pro or Anti    | Transforms to pdgsolve rows |
| ---------------------- | -------------------- | ------------ | ------------- | --------- | ------------------------------------------------------------------------- | ----------------- | ---------- | ---------- | -------------- | ---------------------- |
| `proton`               | Proton               | `p`          | `P`           | composite | `u.u.d = (h + 1:5@).(h + 1:5@).(h + 4:2@)`                                | `15:21@`          | baryon     | I          | pro            | yes                    |
| `anti_proton`          | Anti Proton          | `anti-p`     | `aP`          | composite | `au.au.ad = (ah + 5:1@).(ah + 5:1@).(ah + 2:4@)`                          | `21:15@`          | baryon     | I          | anti           | yes                    |
| `neutron`              | Neutron              | `n`          | `N`           | composite | `u.d.d = (h + 1:5@).(h + 4:2@).(h + 4:2@)`                                | `18:18@`          | baryon     | I          | pro            | yes                    |
| `anti_neutron`         | Anti Neutron         | `anti-n`     | `aN`          | composite | `au.ad.ad = (ah + 5:1@).(ah + 2:4@).(ah + 2:4@)`                          | `18:18@`          | baryon     | I          | anti           | yes                    |
| `photon`               | Photon               | `gamma`      | `hp`          | composite | `h.ah`                                                                    | `6:6@`            | boson      | `n/a`      | self-conjugate | yes                    |
| `higgs_cluster`        | Higgs Cluster        | `H`          | `hq`          | composite | `h.ah.h.ah`                                                               | `12:12@`          | boson      | `n/a`      | mixed          | no                     |
| `w_plus_corridor`      | W+ Boson             | `W+`         | `W+`          | composite | `h + 0:6@`                                                                | `3:9@`            | weak boson | `n/a`      | pro            | no                     |
| `w_minus_corridor`     | W- Boson             | `W-`         | `W-`          | composite | `ah + 6:0@`                                                               | `9:3@`            | weak boson | `n/a`      | anti           | no                     |
| `z_corridor`           | Z Boson              | `Z`          | `Z`           | composite | `h.ah`                                                                    | `6:6@`            | weak boson | `n/a`      | self-conjugate | no                     |
| `eta_meson`            | Eta Meson            | `eta`        | `u.au.d.ad.d2.ad2` | composite | `u.au.d.ad.d2.ad2`                                                   | `34:34@`          | meson      | `I+II`     | self-conjugate | yes                    |
| `short_neutral_kaon`   | Short Neutral Kaon   | `K0S`        | `d.ad2.ad.d2` | composite | `d.ad2.ad.d2`                                                             | `22:22@`          | meson      | `I+II`     | self-conjugate | yes                    |
| `long_neutral_kaon`    | Long Neutral Kaon    | `K0L`        | `d.ad2.ad.d2` | composite | `d.ad2.ad.d2`                                                             | `22:22@`          | meson      | `I+II`     | self-conjugate | yes                    |
| `positive_pion`        | Positive Pion        | `pi+`        | `u.ad`        | composite | `u.ad = (h + 1:5@).(ah + 2:4@)`                                           | `9:15@`           | meson      | I          | mixed          | yes                    |
| `neutral_pion`         | Neutral Pion         | `pi0`        | `u.au.d.ad`   | composite | `u.au.d.ad`                                                               | `24:24@`          | meson      | I          | self-conjugate | yes                    |
| `negative_pion`        | Negative Pion        | `pi-`        | `d.au`        | composite | `d.au = (h + 4:2@).(ah + 5:1@)`                                           | `15:9@`           | meson      | I          | mixed          | yes                    |
| `positive_kaon`        | Positive Kaon        | `K+`         | `u.ad2`       | composite | `u.ad2 = (h + 1:5@).(ah2 + 2:4@)`                                         | `8:14@`           | meson      | `I+II`     | mixed          | yes                    |
| `neutral_kaon`         | Neutral Kaon         | `K0`         | `d.ad2`       | composite | `d.ad2 = (h + 4:2@).(ah2 + 2:4@)`                                         | `11:11@`          | meson      | `I+II`     | mixed          | yes                    |
| `negative_kaon`        | Negative Kaon        | `K-`         | `au.d2`       | composite | `au.d2 = (ah + 5:1@).(h2 + 4:2@)`                                         | `14:8@`           | meson      | `I+II`     | mixed          | yes                    |
| `anti_neutral_kaon`    | Anti Neutral Kaon    | `anti-K0`    | `ad.d2`       | composite | `ad.d2 = (ah + 2:4@).(h2 + 4:2@)`                                         | `11:11@`          | meson      | `I+II`     | mixed          | yes                    |
| `positive_b_meson`     | Positive B Meson     | `B+`         | `u.ad3`       | composite | `u.ad3 = (h + 1:5@).(ah3 + 2:4@)`                                         | `7:13@`           | meson      | `I+III`    | mixed          | yes                    |
| `neutral_b_meson`      | Neutral B Meson      | `B0`         | `d.ad3`       | composite | `d.ad3 = (h + 4:2@).(ah3 + 2:4@)`                                         | `10:10@`          | meson      | `I+III`    | mixed          | yes                    |
| `negative_b_meson`     | Negative B Meson     | `B-`         | `au.d3`       | composite | `au.d3 = (ah + 5:1@).(h3 + 4:2@)`                                         | `13:7@`           | meson      | `I+III`    | mixed          | yes                    |
| `anti_neutral_b_meson` | Anti Neutral B Meson | `anti-B0`    | `ad.d3`       | composite | `ad.d3 = (ah + 2:4@).(h3 + 4:2@)`                                         | `10:10@`          | meson      | `I+III`    | mixed          | yes                    |
