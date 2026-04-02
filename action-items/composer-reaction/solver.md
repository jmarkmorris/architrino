# Reaction Solver

## LLM Instructions

- Keep `Priorities` ordered as the current work queue, with the most important active item first.
- Keep `Design` descriptive and stable; move task-shaped material into `Priorities`.
- Distinguish clearly between current implemented behavior, intended architecture, and future expansion.
- Do not duplicate Reaction-to-Composer contract details here beyond what the solver must produce or consume; prefer the contract-owning document when it exists.
- Do not widen solver scope by turning authored app operators into generic planner primitives.

## Purpose

The Reaction solver is the Reaction-side solving component that turns authored participants into conservative candidate mappings and operator placements.

It owns:

- abstract solve-state construction;
- candidate generation and selection;
- operator insertion and row placement;
- projection back into live Reaction participants and mappings;
- and solver-specific constraints on provenance and conservation.

It does not own:

- Composer staging, observer work, or explanatory overlays;
- the final cross-app handoff contract;
- PDG channel ingest as its own concern;
- or broad UI/runtime policy outside the Reaction app.

## Design

### Solver

The main solver design is now the rearchitecture path, not the current browser implementation.

The next solver should be organized around a headless planning core plus app-side adapters. The browser should not remain the only place where solving can happen. The current JavaScript planner is still a useful behavioral reference and test source during migration, but it should become the old solver rather than the long-term center of gravity.

The intended solve flow remains:

1. build a solver-owned abstract solve state from authored inputs;
2. generate conservative candidate mappings and operator insertions over that state;
3. select among explicit candidate families using stable whole-product-first ranking;
4. place solve-generated operators through the shared surface-grid model or explicit placement hints;
5. project the selected plan back into live Reaction participants and mappings through an adapter layer.

Core architectural requirements:

- stay planner-first rather than DOM-first;
- reason over explicit solve-state entries instead of menu state, incidental render structure, or UI wiring;
- preserve provenance and conservation as first-order constraints;
- expose explicit, versioned solver inputs and outputs rather than depending on browser-local state;
- remain independent of Composer runtime code;
- remain reusable by future PDG ingest or other seed layers;
- feed the Reaction app's manual review and correction workflow rather than bypassing it;
- and avoid solving again inside Composer or smuggling cross-app behavior through shared runtime code.

Behavior that the new solver should preserve while migrating away from the old one:

- direct conservative reuse for identical standalone participants;
- full composite carry-through when the authored composite is itself the right answer;
- fragment-to-root reuse from dissociated composite structure into standalone products where conservation permits it;
- `Associate`-based reassembly for supported standalone and composite products;
- `Higgs Cluster -> Photon + Photon` through conservative dissociation plus two assembled outputs;
- support for authored center assemblies as source-side participants rather than solver-owned operators;
- repeated solve from a clean auto-solve baseline without duplicating solve-generated operators;
- stable preference for stronger whole-product solutions over residue-heavy alternatives;
- automatic reactant composite dissociation marking when internal rows are consumed;
- and preservation of manual operators and manual dissociated-composite state across reruns.

Operator semantics that should remain canonical:

- `Associate` is a gather-and-assemble operator;
- `Associate` may consume many inputs but produces exactly one assembled output;
- `Associate` must not become a generic weak-reaction junction, transform shim, or many-output routing node;
- the solver operator set is constrained by the Reaction app rather than expanded ad hoc by planner convenience;
- center assemblies such as `Noether core`, `W-`, `W+`, `Z`, and `Free Architrinos` are supported participants, not solver-defined operators;
- and the current solver operator vocabulary remains `Associate` plus `Dissociate`, even though explicit `Dissociate` placement is still a migration target rather than a finished planner behavior.

Composite and dissociation requirements that should move forward into the new architecture:

- preserve direct carry-through for the same composite when that is the correct solve;
- use `Associate` to build composite products unless the solve is that direct same-composite carry-through case;
- allow solver-created internal-row mappings to auto-dissociate a composite when the selected plan requires it;
- preserve manual dissociated-composite state as valid authored state;
- eventually represent selected dissociation explicitly at the plan level rather than only as an implicit projection-side effect;
- and do not assume that composite internals are available only when the user manually pre-dissociated the composite.

Primitive-first planning should remain the expansion rule. The planner should reason first in the primitive language of `Dissociate`, `Associate`, `Noether core`, `Free Architrinos`, direct mappings, and dissociated-composite access. If an exact solved primitive subgraph later matches a boson-like structure, that pattern may be recognized or collapsed for readability, but the solver should not become boson-first before primitive charge-routing is complete.

Conservative matching discipline that should remain explicit:

- direct mapping candidates must pass the conservative mapping gate;
- the gate requires known source and target inventories;
- the gate requires equal `electrino` / `positrino` ledger on both sides;
- and the gate forbids direct mapping between full tri-binary `Pro Noether Core` and `Anti Noether Core`.

Open weak-channel provenance question:

- future weak-channel solving depends on whether a `W^\pm` corridor should be treated as carrying pro/anti `Noether core` provenance into an outgoing lepton branch, or only as the charged transaction delta while final pro/anti cores are recruited from a local reservoir such as `4h` / Higgs-cluster or Noether-Sea content;
- this matters especially for `beta reaction` solves, where a `W-` corridor may plausibly supply anti-core provenance to the outgoing antineutrino while the electron still recruits a pro core from the local reservoir;
- and this question should be treated as theory-owned by [standard-model-closure](../standard-model-closure/standard-model-closure.md) rather than silently fixed by solver convenience.

Migration rule:

- treat the current browser solver as the old solver and the behavioral reference;
- build the new headless solver behind explicit request/result contracts;
- and keep extraction, parity checks, and projection adaptation incremental until the browser-specific runtime can be reduced to wiring and review support.

### External Solver Core

The intended rebuilt solver core is an external command-line tool, likely implemented in Python.

That core should own:

- normalized solve-request parsing;
- conservative candidate generation and search;
- scoring, ranking, and residue accounting;
- and emission of an explicit solve result that app runtimes can consume.

It should not own:

- DOM-driven geometry;
- Reaction menu state or interaction state;
- Composer staging or observer behavior;
- or hidden assumptions about one specific app shell.

Python is the right current direction because the main pressure is on correctness, robustness, testability, and speed of solver iteration rather than browser-local coupling. The important architectural point is the headless executable boundary, not Python for its own sake.

### Invocation Modes

The external solver should support two input modes:

- structured JSON for full-fidelity solving, regression fixtures, and app integration;
- and a compact command-line shorthand for quick experiments and batch runs.

The compact shorthand should stay intentionally short. The intended shape is:

- `--r [Pe2u3dW+2h4h...]`
- `--p [Pe2u3dW+2h4h...]`

Those concise reactant and product strings should be treated as a convenience syntax over the same normalized solver request, not as a second independent model.

The compact string should also allow optional benign separators between tokens so humans can make distinct assemblies easier to read. The parser should ignore `.`, `,`, and `_` when they appear between valid tokens.

Recommended human-facing separator:

| Separator | Status | Notes |
| --- | --- | --- |
| `.` | preferred | no shift key, shell-safe, visually light |
| `,` | allowed | also shell-safe and easy to scan |
| `_` | allowed | readable, but less pleasant to type |

Examples:

| Notation | Meaning |
| --- | --- |
| `Pe2v` | compact form with no separators |
| `P.e2.v` | same input with preferred separators |
| `P,e2,v` | same input with comma separators |
| `h2.W-.P` | distinct assemblies made easier to scan |
| `P.e.av` | proton, electron, anti-neutrino |
| `1:1@.P.e` | explicit `Free Architrinos` ledger plus proton and electron |

Example command, free neutron decay with an added `4h` reactant:

| Form | Command |
| --- | --- |
| compact | `solver --r N4h --p Peav` |
| separated | `solver --r N.4h --p P.e.av` |

Current compact notation:

| Notation | Meaning | Notes |
| --- | --- | --- |
| `d1` or `d` | down quark | generation I may omit the `1` |
| `d2` | strange quark | generation II down-family |
| `d3` | bottom quark | generation III down-family |
| `e1` or `e` | electron | generation I may omit the `1` |
| `e2` | muon | generation II charged lepton |
| `e3` | tau | generation III charged lepton |
| `h` | Noether core | base core symbol |
| `h2` | Bi Binary | reduced `Noether core` form |
| `h3` | Uni Binary | reduced `Noether core` form |
| `2h` | photon | two-core photon shorthand |
| `4h` | Higgs cluster | four-core Higgs-cluster shorthand |
| `e:p@` | `Free Architrinos` ledger | explicit electrino:positrino count, with both sides always present |
| `N` | neutron | aligns with existing `Pro Neutron` support |
| `P` | proton | aligns with existing `Pro Proton` support |
| `u1` or `u` | up quark | generation I may omit the `1` |
| `u2` | charm quark | generation II up-family |
| `u3` | top quark | generation III up-family |
| `v1` or `v` | neutrino | generation I may omit the `1` |
| `v2` | muon neutrino | generation II neutrino |
| `v3` | tau neutrino | generation III neutrino |
| `W+` | `W+` boson | two-character token |
| `W-` | `W-` boson | two-character token |
| `Z` | `Z` boson | direct match |

Generation numbers should be interpreted as family indices for fermions:

| Family letter | Generation I | Generation II | Generation III |
| --- | --- | --- | --- |
| `e` | electron | muon | tau |
| `u` | up quark | charm quark | top quark |
| `d` | down quark | strange quark | bottom quark |
| `v` | neutrino | muon neutrino | tau neutrino |

Polarity should be handled with `a` only:

| Notation form | Meaning |
| --- | --- |
| `x` | pro form is implied |
| `ax` | anti form |

Examples:

| Notation | Meaning |
| --- | --- |
| `P` | pro proton |
| `aP` | anti proton |
| `N` | pro neutron |
| `aN` | anti neutron |
| `e` | pro electron |
| `ae` | anti electron |
| `e2` | pro muon |
| `ae2` | anti muon |
| `v` | pro neutrino |
| `av3` | anti tau neutrino |
| `h` | pro `Noether core` |
| `ah` | anti `Noether core` |

`Free Architrinos` are the exception to that polarity rule. They use explicit ledger tokens of the form `e:p@` with no anti form.

The `h` notation now has two different numeric roles, and both should stay explicit:

| Notation form | Meaning |
| --- | --- |
| `nh` | `n` whole `Noether cores` |
| `hn` | a reduced `Noether core` form |

Current intended `h` family examples:

| Notation | Meaning |
| --- | --- |
| `h` | tri-binary `Noether core` |
| `h2` | Bi Binary |
| `h3` | Uni Binary |
| `2h` | two `Noether cores`, currently used as photon shorthand |
| `4h` | four `Noether cores`, currently used as Higgs-cluster shorthand |

For now, `2h` and `4h` are the only committed whole-core aggregate tokens. The grammar should not treat arbitrary `nh` forms as generally valid unless that aggregate family is expanded deliberately in a later revision.

`Free Architrinos` should be written with an explicit electrino:positrino ledger:

| Notation | Meaning |
| --- | --- |
| `1:1@` | one electrino and one positrino |
| `227:120@` | `227` electrinos and `120` positrinos |
| `227:0@` | `227` electrinos and zero positrinos |
| `0:120@` | zero electrinos and `120` positrinos |

Both sides of the ledger should always be present. If one side is zero, the zero should still be written explicitly. The one excluded case is `0:0@`, which should be forbidden as a meaningless null ledger. That keeps the grammar single-reading and avoids special omission rules such as trying to infer whether `227@` means `227:0@`, `0:227@`, or something else.

The choice of `@` for `Free Architrinos` is now intentional rather than provisional. It works well at the shell level because it is safe in unquoted command-line arguments, but it also carries a useful visual and conceptual resonance. The symbol reads like a curling or spiraling enclosure, which fits the intuition that a free electrino and positrino meeting in isolation would tend toward a tighter orbital closure. At the same time, the historical bookkeeping meaning of the at sign ties neatly into the solver's conservation and provenance ledger: `@` already carries the feel of accounting, relation, and counted association. That makes it a rare symbol that is compact, typeable, shell-safe, visually suggestive, and semantically aligned with the solver's charge-routing and ledger language.

This direction is simpler for the intended audience because it avoids a large inventory of unrelated one-letter symbols. A small set of family letters plus generation indices covers the fermion families cleanly, while `h`, `2h`, `4h`, and explicit `e:p@` ledgers preserve the assembly-side intuition.

For the `W` bosons, the preferred notation is the explicit two-character form `W+` and `W-` rather than encoding charge through case. That keeps the shorthand physically legible and consistent with the authored labels already used in the app and docs. `W+` and `W-` should be treated as atomic two-character tokens. Anti weak-boson forms should remain forbidden in this grammar: `W+` and `W-` already stand in antiparticle relation to each other, and `Z` is self-conjugate, so `aW+`, `aW-`, and `aZ` should not be introduced. The open question is not whether `W+` and `W-` are antiparticles, but whether a `W^\pm` corridor should be treated as carrying specific pro/anti `Noether core` provenance in the deeper solve ontology.

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
| whole-core aggregate | `2h`, `4h` | only these two aggregate forms are currently valid |
| free-architrino ledger | `[0-9]+:[0-9]+@` | explicit electrino:positrino ledger, both sides required |

Equivalent EBNF-style sketch:

```text
reaction_arg   := token { separator* token }
separator      := "." | "," | "_" | whitespace
token          := fermion | nucleon | weak_boson | core_form | whole_core_aggregate | free_architrino_ledger
fermion        := anti? family generation?
anti           := "a"
family         := "e" | "u" | "d" | "v"
generation     := "1" | "2" | "3"
nucleon        := anti? ("P" | "N")
weak_boson     := "W+" | "W-" | "Z"
core_form      := anti? ("h" | "h2" | "h3")
whole_core_aggregate := "2h" | "4h"
free_architrino_ledger := count ":" count "@"
count          := digit { digit }
```

Interpretation rules:

- `a` binds only to the single token immediately following it;
- `a` is currently valid for fermions, nucleons, and `Noether core` forms `h`, `h2`, and `h3`;
- generation digits belong only to the fermion families `e`, `u`, `d`, and `v`;
- prefix counts belong only to aggregate whole-core forms such as `2h` and `4h`;
- `Free Architrinos` use a dedicated two-sided ledger token `e:p@`;
- `Free Architrinos` ledger tokens do not require surrounding separators when the lexer can already disambiguate adjacency;
- and a number must not try to play both a prefix-count role and a suffix-generation or suffix-core-form role on the same token.

### Ambiguity Discipline

The parser itself is not the hard part. The important requirement is that a human and a machine should see the same segmentation without guesswork.

The current grammar should therefore aim for:

- one obvious reading for every valid string;
- no silent reinterpretation through parser cleverness;
- no special omission rules that make zero or missing counts context-dependent;
- and explicit rejection of token shapes that would otherwise admit multiple readings.

Current recommended conflict checks:

| Potential conflict | Why it is risky | Recommended rule |
| --- | --- | --- |
| `2h2`, `4h3`, `3h2` | mixes prefix-count and suffix-core-form roles on one token | forbid entirely |
| `a2h`, `a4h`, `2ah` | unclear whether anti applies to an aggregate or to a core token inside it | forbid entirely |
| `aae`, `aav2`, `aah` | stacked anti prefixes add no meaning and create parser noise | forbid entirely |
| `aW+`, `aW-`, `aZ`, `a1:1@` | anti is not currently defined for these families | forbid entirely |
| `e0`, `e4`, `u9`, `v7` | generation outside `1`, `2`, `3` | forbid entirely |
| `0h` | zero-count whole-core aggregate is not meaningful in the current grammar | forbid entirely |
| `3h`, `5h`, `12h` | only `2h` and `4h` are currently committed aggregate tokens | forbid entirely for now |
| `0:0@` | null `Free Architrinos` ledger carries no usable content | forbid entirely |
| `h23`, `u23`, `e12` | visually suggests one token but leaves trailing digits ambiguous | forbid entirely |
| `@`, `2@`, `227@` | omitted ledger side makes the free-architrino token ambiguous | forbid entirely |
| `:120@`, `227:@` | omitted ledger side creates a special-case parse | forbid entirely |
| `227:120@3`, `1:1@2` | payload after `@` collides with the token boundary | forbid entirely |

Operational lexer guidance:

- treat `W+` and `W-` as atomic two-character tokens;
- recognize `h2` and `h3` before bare `h`;
- recognize `2h` and `4h` as committed aggregate tokens before testing bare `h`;
- recognize `[digits]:[digits]@` as one `Free Architrinos` ledger token that ends at `@`;
- do not require separators around a `Free Architrinos` ledger token when the surrounding token boundaries are already unambiguous;
- and reject any `@` form that does not contain both explicit ledger sides before the trailing `@`.

### Result And Integration Contract

The rebuilt solver should return explicit structured output rather than mutating app state directly.

This section owns the solver-to-Reaction result shape. [reaction](./reaction.md) should reference this section rather than restating the payload.

That output should be rich enough to carry:

- solved participants and participant roles;
- selected mappings and provenance claims;
- explicit operator insertions and placements or placement hints;
- unresolved residue and ambiguity reporting;
- and enough staged structure to feed Reaction review and later downstream export.

The Reaction app should consume that output through a projection adapter that materializes the solve into live participants, mappings, dissociation state, and operator placement. Composer should remain downstream of accepted Reaction output through explicit versioned data such as `reaction-flow/v1`, rather than calling solver runtime code.

### Result Format

The solver result submitted to the Reaction app should be one structured solve-result document, not a stream of ad hoc UI mutations.

The intended top-level shape is:

- `request`: solver-normalized description of the authored reaction inputs that were solved;
- `summary`: overall solve outcome, including whether the solve is exact, partial, ambiguous, or unsupported;
- `participants`: the participant records the projection adapter needs to preserve source ids, target ids, roles, and any solver-created intermediate or operator-side entries;
- `mappings`: selected source-to-target provenance claims, with enough endpoint identity to recreate live Reaction mappings;
- `operators`: solve-created operator insertions and their intended produced outputs;
- `dissociation`: explicit or implicit dissociation decisions selected by the solve, including auto-dissociated composite sources;
- `placement`: lane, row, or placement-hint data for solve-created operators and other projection-side layout needs;
- `residue`: unresolved sources, unresolved targets, and other leftover inventory the solver could not close;
- and `diagnostics`: ambiguity notes, rule-family provenance, warnings, and other review-facing details that should remain visible in Reaction.

Required contract rules:

- the result must be self-sufficient enough for the Reaction projection adapter to materialize the solve without rereading planner-internal state;
- mappings, operators, dissociation, and residue must use stable participant or node identities rather than DOM-derived positions;
- placement data may be advisory, but semantic solve claims must not depend on render-order inference;
- manual authored Reaction state that the solver did not create must remain distinguishable from solve-created additions;
- and the solve-result format is upstream of `reaction-flow/v1`: the solver submits to Reaction in this format, then accepted Reaction state exports downstream through the separate Reaction-owned handoff contract.

### Direct Composer Path

The external solver should eventually make a fast path possible in which a headless solve can feed Composer without first opening the Reaction UI.

That path is useful for rapid iteration and batch generation, but it should still respect the app boundary:

- solve outside Composer;
- hand off through explicit structured data;
- and keep Composer focused on staging rather than on replanning the reaction.

Even with a direct Composer path, the Reaction app still matters. It remains the natural review and correction surface for provenance, and it remains the likely source of reaction-app imagery or other visual artifacts that Composer can reuse in final animation products.

### Geometry And Modularity

The shared surface grid must remain the source of truth for solver placement.

Do not:

- duplicate lane geometry across CSS and JS;
- infer centers from ad hoc rendered offsets;
- or collapse new solve logic back into the UI runtime.

The long-term target is for the solver UI runtime to become composition and wiring only, with domain logic staying in focused runtimes.

### File Boundaries

On the browser side, the current solver file boundaries should remain the basis for extension during the transition:

- `ReactionSolveStateRuntime.js`
- `ReactionSolveProposalRuntime.js`
- `ReactionSolveSelectionRuntime.js`
- `ReactionSolveMatchRuntime.js`
- `ReactionSolveAssociateRuntime.js`
- `ReactionSolveProjectionRuntime.js`
- `ReactionSolveLayoutRuntime.js`

Those runtimes should increasingly act as:

- the reference implementation for current behavior;
- the projection and layout adapters for Reaction;
- and the bridge layer to a future external solver contract.

Likely durable boundaries in the rearchitected system are:

- a normalized solve-request schema;
- a compact-notation parser for command-line use;
- a headless external solve core;
- a structured solve-result schema;
- a Reaction projection adapter;
- a Reaction surface-grid placement adapter;
- and an export or import adapter for downstream Composer flow.

Likely next extraction targets from the current UI runtime remain:

- a surface-grid placement runtime;
- a menu and picker runtime;
- a route-render runtime;
- and a participant-interaction runtime.

## Interfaces

### Inputs

- authored Reaction participants;
- normalized headless solve requests;
- compact reactant and product shorthand for command-line solving;
- current authored mappings and manual operator placements;
- current dissociated-composite state;
- and future normalized seeds from PDG ingest or other upstream sources.

### Outputs

- selected conservative mappings;
- solve-generated operator placements;
- structured solve results suitable for app adapters;
- projected live Reaction-side participants and mappings;
- unresolved residue reporting;
- and, downstream of Reaction, material that can later feed the Reaction-owned handoff document.

### Neighboring Components

- [reaction](./reaction.md) owns manual authoring, review, and the broader app workflow around the solver.
- [pdg-ingest](./pdg-ingest.md) should eventually feed normalized seeds and candidate-review context into this solver rather than replacing it.
- [composer](./composer.md) is downstream and should consume accepted Reaction output rather than invoke solver runtime code.
- [app-architecture](./app-architecture.md) defines the app-boundary rule that prohibits direct Composer/Reaction runtime coupling.
- [app-architecture](./app-architecture.md) owns the cross-cutting app-boundary and modularity rules that apply here.

## Priorities

### 1. Define Versioned Solver Request And Result Schemas

Status: `active`

Goal:

- define one canonical JSON request schema for solver input and one canonical JSON result schema for solver output before `solver.py` is written.

Why it matters:

- the Python core needs a stable boundary for authored inputs and projected solve output, or the Python/JS seam will drift immediately.

Next steps:

- define `solver-request/v1` around participants, mappings, manual operators, dissociation state, and center assemblies;
- promote the solver-to-Reaction result shape into a real versioned schema rather than prose only;
- and keep the solver-result contract distinct from the downstream Reaction-owned `reaction-flow/v1` export.

### 2. Freeze A Golden Parity Corpus From The Current JS Solver

Status: `next`

Goal:

- freeze the current supported conservative cases as request/result fixtures before the Python port begins.

Why it matters:

- parity should be measured against stable fixtures and expectations, not by rereading browser-side code during the port.

Next steps:

- choose the initial supported cases from the current proposal, layout, and projection tests;
- capture those cases as golden request/result fixtures;
- and use that corpus as the first acceptance bar for `solver.py`.

### 3. Lock Down Identity, Selection, And Tie-Break Semantics

Status: `pending`

Goal:

- make the winning-plan rules and identity conventions explicit before the Python implementation starts.

Why it matters:

- a Python port can appear correct while still disagreeing with the current solver on ids, node references, operator refs, or which candidate family should win.

Next steps:

- define stable participant ids, node-key rules, and synthetic operator refs such as `associate:1`;
- write the candidate-selection and set-selection tie-break order as compact normative rules;
- and keep those rules aligned with the current whole-product-first selection behavior.

### 4. Decide The Python / JS Boundary For Layout And Projection

Status: `pending`

Goal:

- decide exactly which responsibilities stay in the headless solver and which stay in the Reaction app adapters.

Why it matters:

- `solver.py` should return semantic solve output through a stable contract, not accidentally absorb UI-side layout and projection behavior that already has a clear local seam.

Next steps:

- decide whether Python returns semantic solve output plus placement hints or fully resolved operator placements;
- keep actual Reaction-side row-slot layout in JS unless a stronger reason appears;
- and keep projection into live participants, mappings, and dissociation state as an explicit adapter boundary.

### 5. Finish The Compact CLI Grammar As A Testable Lexer Spec

Status: `pending`

Goal:

- turn the shorthand notation into a fully testable lexer contract rather than an examples-only description.

Why it matters:

- the command-line form should be a convenience syntax over the same request schema, and the implementation will go faster if valid and invalid forms are frozen in fixtures first.

Next steps:

- add positive and negative fixture strings for every committed token family and ambiguity rule;
- keep longest-match, separator, and rejection rules explicit;
- and keep the compact grammar subordinate to the canonical normalized request format.

### 6. Resolve Or Explicitly Gate Theory-Dependent Weak-Channel Cases

Status: `pending`

Goal:

- keep `solver.py` from silently guessing on theory-owned weak-channel provenance questions.

Why it matters:

- the current open `W^\pm` provenance question is real, and the first headless solver should not hard-code an answer by implementation convenience.

Next steps:

- either decide the currently open weak-channel provenance cases or mark them unsupported in v1;
- keep the unsupported boundary explicit in the request/result contracts and parity corpus;
- and treat theory-owned resolution as upstream of broader weak-channel expansion.

### 7. Shrink The Solver UI Runtime

Status: `pending`

Goal:

- keep `ReactionSolverUiRuntime.js` moving toward composition-only wiring.

Why it matters:

- this is still the biggest solver-side readability, testability, and regression hotspot on the browser side, even if it is no longer the first blocker before `solver.py`.

Next steps:

- continue moving domain logic into focused runtimes;
- keep layout, proposal, projection, and interaction seams explicit;
- and avoid adding new solve behavior directly to the UI runtime.

Execution rule:

- when a newly reported solve bug appears, add a targeted regression test before or with the fix.

### 8. Extend Primitive Charge Routing

Status: `pending`

Goal:

- move beyond the current `Associate`-centered families so the solver can reason through authored or generated `Dissociate`, `Noether core`, and `Free Architrinos` paths.

Why it matters:

- this is the main missing capability before boson recognition or broader PDG-facing work becomes well-founded.

Next steps:

- add focused candidate families with targeted tests;
- represent selected composite dissociation more explicitly at the plan level;
- and keep manual dissociated-composite behavior stable while the planner grows.

Dependency note:

- do not hard-code final-state weak-corridor core provenance until the `W^\pm` provenance question above is settled.

### 9. Improve Residue And Dissociation Reporting

Status: `pending`

Goal:

- make unresolved residue and solve-created dissociation legible in the plan and projection layers.

Why it matters:

- solver behavior is easier to trust and debug when leftover fragments and auto-dissociation are explicit.

Next steps:

- improve residue reporting in proposal output;
- preserve clean projection of solve-created dissociation into the live Reaction surface;
- and add regression tests around those cases.

Stability constraint:

- direct center-boson mapping for currently supported product cases should remain stable while residue and dissociation reporting improve.

### 10. Add Exact Boson Recognition On Top Of Primitive Solves

Status: `pending`

Goal:

- recognize exact boson-shaped subgraphs only after primitive charge-routing is working.

Why it matters:

- this preserves the primitive-first planning model while still allowing readable derived shorthand later.

Next steps:

- define exact recognizers over primitive solved subgraphs;
- keep authored source-side bosons valid;
- and avoid widening the first-pass solve search space with free synthetic boson insertion.

### 11. Stay Ready For PDG Seeds Without Becoming PDG-Specific

Status: `pending`

Goal:

- keep the solver reusable as the normalized planning core for future PDG ingest.

Why it matters:

- PDG work should reuse this seam rather than create a parallel solver.

Next steps:

- keep the abstract solve state as the planner boundary;
- keep solver inputs normalized and UI-independent;
- and let PDG ingest talk to the solver through explicit seed/proposal shapes rather than shared UI code.

### 12. Solver Rearchitecture

Objective:

- rearchitect the solver around a fast external headless core with explicit JSON and compact CLI inputs, while preserving clean Reaction review and Composer handoff boundaries.

## Note On The Old Solver

The current browser-side JavaScript solver remains the migration reference until the new headless solver reaches parity on the conservative cases that already work. This note keeps the old solver specifics available without making them the design center.

### Current State

- The repository already has a real solver seam rather than a placeholder plan.
- The current solve path includes dedicated runtimes for solve state, proposal building, candidate selection, matching, associate construction, layout, projection, and UI wiring.
- The solver already supports several important conservative solve families, including direct reuse, composite carry-through, fragment reuse, and `Associate`-based reassembly.
- The solver can rerun from a clean auto-solve baseline while preserving manual operators and manual dissociated-composite state.
- Automated coverage already exists for solve state, proposal logic, layout, projection, and the solver UI.
- The main remaining technical risk is that the UI runtime is still too large and still carries too much subsystem behavior.

Current implementation inventory:

- `src/apps/reaction/ReactionSolveStateRuntime.js`
- `src/apps/reaction/ReactionSolveProposalRuntime.js`
- `src/apps/reaction/ReactionSolveSelectionRuntime.js`
- `src/apps/reaction/ReactionSolveMatchRuntime.js`
- `src/apps/reaction/ReactionSolveAssociateRuntime.js`
- `src/apps/reaction/ReactionSolveLayoutRuntime.js`
- `src/apps/reaction/ReactionSolveProjectionRuntime.js`
- `src/apps/reaction/ReactionSolverUiRuntime.js`

Current test coverage inventory:

- `tests/reaction-solve-state.test.js`
- `tests/reaction-solve-proposal.test.js`
- `tests/reaction-solve-layout.test.js`
- `tests/reaction-solve-projection.test.js`
- `tests/reaction-solver-ui.test.js`

### Current Solve Pipeline

- solve state separates reactants, products, operators, and center assemblies;
- the current proposal layer builds plans over explicit candidate families and reports unresolved reactants and products;
- layout uses explicit surface-row centers plus row-bias heuristics when operators compete for nearby lane regions;
- projection creates solve-generated operators, resolves deferred endpoints, and materializes mappings back into the live Reaction UI;
- and the UI runtime removes only solve-generated operators before rerunning solve, clears auto-dissociation markers, and keeps manual operators and manual dissociated-composite state intact.

### Current Rule Order

The current implemented solve order is:

1. Build solve state from live participants.
2. Partition entries into `reactants`, `products`, `center assemblies`, `operators`, and `unsupported`.
3. Treat `reactants` plus `center assemblies` as the current source pool for proposal building.
4. Build source sub-pools for special rules:
5. `associateSourceEntries` contains full `Noether core` roots, full `Free Architrinos` roots, and top-level `Noether core` children pulled from composite sources.
6. `compositeChildSourceEntries` contains top-level constituent children from composite sources.
7. `standaloneRootSourceEntries` contains non-composite standalone roots.
8. For each source/product pair, try base candidate families in this order:
9. `composite-carry-through` first;
10. then `direct-root`;
11. then `center-root-direct`.
12. Build `fragment-root-direct` candidates from composite-child source entries into standalone product roots.
13. Build `associate-photon` candidates from pairs of opposite-polarity `Noether core` sources into photon products.
14. For each product that does not already have an identical direct reactant, try `Associate` reassembly in this order:
15. `associate-standalone` first;
16. then `associate-composite`.
17. Run the main candidate-set selector across base, fragment, and associate candidates together.
18. Build `partial-composite-direct` candidates only after the main selection pass, and only from still-unresolved reactant/product pairs.
19. Run a second selector for those partial-composite candidates, excluding already-used source fragments.
20. Run the `product-child-direct` selection pass last, but the current proposal builder does not populate that candidate family yet, so this pass is effectively inactive today.
21. Mark a composite reactant auto-dissociated if the selected mappings consume one of its internal child rows instead of its root.
22. Place solve-generated operators onto the shared surface grid.
23. Project solve-generated operators, mappings, and auto-dissociation markers back into live Reaction state.

The current selection order inside the solver is also explicit:

- candidate profiles are presorted by more fully resolved whole products, then more matched target nodes, then fewer partial-product claims, then higher candidate score, then a stable text identity tie-break;
- the set-level selector then prefers more fully resolved whole products, then more matched target nodes, then fewer partial-product claims, then more matched source nodes, then higher total score, then a stable identity tie-break;
- this means the solver currently prefers stronger whole-product solutions over weaker residue-heavy plans even before any future chemistry or PDG-facing heuristics are added.

### Current Assembly And Operator Rules

Current implemented assembly and operator rules are:

- `composite-carry-through` applies only when source and product share direct participant identity and both top-level composite trees can be fully matched child-to-child;
- `direct-root` applies only when source and product share the same template id and polarity and the direct conservative mapping gate allows the root-to-root mapping;
- `center-root-direct` applies only when the source is a center assembly, the product is not a composite product, and the direct conservative mapping gate allows the root-to-root mapping;
- `fragment-root-direct` applies only when a top-level source child has the same template id as a standalone product root, polarity is compatible, and the direct conservative mapping gate allows the mapping;
- `partial-composite-direct` applies only when source and product share direct participant identity, some top-level child mappings are valid, and full composite carry-through was not possible;
- `Associate` is the only operator the solver currently inserts explicitly into the plan;
- explicit `Dissociate` operators are not inserted by the current planner;
- and dissociation is currently represented as an auto-dissociation mark on a composite reactant when the selected mappings consume internal child rows.

Current `Associate` rules are:

- `associate-photon` requires exactly two source entries that classify as `Noether core`, opposite core polarities, a photon product with both `pro` and `anti` child targets, and exact full-inventory equality between the two sources combined and the photon product;
- `associate-standalone` requires a non-photon, non-composite standalone product, at least one `Noether core` source, at least one `Free Architrinos` source, two different source participants, target polarity compatibility with the chosen core, and equality of the resulting `electrino` / `positrino` ledger with the product inventory;
- `associate-composite` requires a composite product with at least two target child nodes, at least as many source entries as target child nodes, a valid conservative mapping from each chosen source to its assigned target child, at least two distinct source entries in the finished plan, and exact full-inventory equality between all chosen sources combined and the composite product;
- when multiple `Associate` assignments are possible, the solver prefers assignments with more matched target nodes, then higher pair score, then a stable source-identity tie-break;
- and every solve-generated `Associate` currently uses operator lane `1` and produces exactly one assembled output participant.

Current special assembly-source rules are:

- `Noether core` and `Free Architrinos` are treated as source assemblies, not solver-defined operators;
- `Noether core`, `W-`, `W+`, `Z`, and `Free Architrinos` can appear as center assemblies in solve state;
- only `Noether core` and `Free Architrinos` currently participate in the special `Associate` construction rules;
- center assemblies may map directly into currently supported standalone products through `center-root-direct`;
- the current planner does not yet introduce new bosons as intermediate solve-generated participants during search;
- and broader weak-boson-mediated construction is still outside the implemented rule set.

Current placement and projection rules are:

- only solve-generated operators are removed before a fresh rerun;
- manual operators remain in the surface and also occupy lane rows for later layout;
- solve-generated operators are placed after candidate selection, not during candidate generation;
- placement prefers the target-side row center for `Associate` when available, otherwise the shared center of connected rows;
- placement avoids occupied rows inside the chosen operator lane by nearest-row search with a small direction bias;
- projection creates the solve-generated operator participants, resolves deferred operator endpoints into concrete node keys, applies the selected mappings, and marks any newly auto-dissociated composite reactants;
- and projection does not create an explicit `Dissociate` operator participant today.

### Present Capabilities

The current solver already supports:

- direct root matches for identical conservative standalone participants;
- direct standalone reuse for slot-based fermions;
- full composite carry-through for identical composites;
- fragment-to-root mapping from a composite child into a standalone product;
- `Associate`-based composite reassembly for composite products;
- `Associate`-based composite reassembly from mixed fragment and standalone inputs;
- `Associate` construction for supported standalone outputs from `Noether core` and `Free Architrinos`;
- `Higgs Cluster -> Photon + Photon` through auto-dissociation plus two `Associate` operators;
- supported center bosons as source-side participants when the user has already authored them;
- direct center-boson mapping to currently supported conservative standalone products;
- candidate selection that prefers stronger whole-product solutions over weaker partial residue paths;
- repeated `Solve` from a clean auto-solve baseline without duplicating solve-generated operators;
- automatic reactant composite dissociation marking when internal rows are mapped;
- and persistent manual dissociated-composite state alongside solve-created dissociation marks.
