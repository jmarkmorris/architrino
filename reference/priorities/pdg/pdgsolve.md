# pdgsolve

## LLM Instructions

- Keep this document focused on `pdgsolve` as the Python solve, acceptance, and publication boundary upstream of `pdgedit`.
- Keep `Design` about durable request normalization, solver boundaries, assemblies, operators, acceptance locking, publication-graph construction, and JSON contracts.
- Keep `Priorities` ordered as the active work queue.
- Do not restate low-level PDG ingest internals except where the explicit request boundary from [pdgfeed](./pdgfeed.md) matters.

## Purpose

`pdgsolve` is the dedicated Python boundary between upstream request sources and downstream accepted-publication artifacts for `pdgedit`.

It owns:

- intake of explicit solve requests from upstream sources such as [pdgfeed](./pdgfeed.md), test cases, and direct developer input;
- normalization of those requests into a `pdgsolve`-owned solve problem expressed only in explicit admitted assemblies;
- deterministic exact-family construction and no-exact fallback emission for the current vertical slice;
- deterministic scoring, diagnostics, and review-state emission;
- locking one accepted exact family into an acceptance artifact;
- building a layout-neutral publication graph from the accepted solve graph;
- and publishing `pdgedit` documents plus manifest entries from accepted or review-ready inputs.

It does not own:

- PDG data access and normalization logic that belongs in [pdgfeed](./pdgfeed.md);
- free-form pdgedit authoring behavior that belongs in [pdgedit](./pdgedit.md);
- or downstream viewer staging behavior that belongs in `pdgview`.

## Current State

- The active implementation boundary is still one Python file, `scripts/pdg/pdgsolve.py`.
- The current CLI owns four concrete flows: `solve`, `accept`, `publish`, and `solve-manifest`.
- `solve` normalizes `pdgsolve-request/v1` into `pdgsolve-problem/v1`, emits `pdgsolve-result/v1`, and currently returns either one publication-ready exact family or one deterministic no-exact-closure family.
- `accept` locks one exact publication-ready family into `pdgsolve-acceptance/v1`.
- `publish` turns one acceptance record into a final `pdgedit/v1` document through the layout-neutral `pdgsolve-publication-graph/v2` seam carried inside the acceptance.
- `solve-manifest` solves every ready request in a live manifest, writes a `pdgsolve-result-corpus/v1` index, and optionally publishes exact and review `pdgedit` documents plus a `pdgedit-library-manifest/v1`.

## Design

### Foundational Stance

It should define its own reactant assemblies, reactant-side operators, intermediate assemblies, product-side operators, product assemblies, provenance/accounting model, request contracts, and solve-output contracts from first principles rather than inheriting accidental constraints from earlier surfaces or tooling splits.

Useful prior work may still inform:

- conserved-ledger semantics;
- operator family meaning;
- useful test cases;
- and examples of successful or failed closure families.

### Program Structure

The durable `pdgsolve` structure should separate:

- request intake;
- request normalization;
- solve-core law application;
- family scoring and diagnostics;
- acceptance locking;
- layout-neutral publication-graph construction;
- and pdgedit publication emission.

Large coordinator files may assemble those pieces temporarily, but they should not become the long-term home of solver semantics.

### Composite And Higher-Scale Terms Are Out Of Scope

Composite labels, higher-scale particle names, grouping interpretations, support tokens, residue labels, and similar terms are boundary-side language, not solver-native objects.

`Unbound Architrinos` is the one important exception. It is solver-native in exactly these roles:

- one and only one explicit counted `Unbound Architrinos` assembly in the intermediate stage;
- and one explicit counted `Unbound Architrinos` occurrence on the product side when either upstream already emitted it at the boundary or an intermediate-side `Pass Thru` routes to it.

The intermediate `Unbound Architrinos` assembly is a ledger object. It may appear only as the shared output target of reactant-side `Dissociate` operators. Multiple reactant-side `Dissociate` operators may route Electrinos and Positrinos into it within the same constructed candidate. It is not a wildcard well, and it is not replaced by multiple separate intermediate `Unbound Architrinos` objects. Its Electrino and Positrino counts are part of the solver state and are routed explicitly through `Associate` and `Pass Thru` operators.

Aside from that explicit `Unbound Architrinos` handling, higher-scale language does not enter `pdgsolve` as reactant assemblies, intermediate assemblies, product assemblies, operator inputs, operator outputs, or search symbols. If upstream language uses higher-scale terms, a boundary adapter must translate them into explicit admitted Standard Model assemblies before `pdgsolve` sees the request. If that translation cannot be completed, the source request is un-mappable and should remain upstream in `pdgfeed` rather than being emitted to `pdgsolve`. If downstream tools want higher-scale summaries, they may derive them only after `pdgsolve` has finished.

Post-solver grouping display may describe solved assemblies, but grouping metadata is not itself opened, gathered, dissociated, associated, or searched.

This is the controlling scope rule for the rest of the document.

### Core Ontology Boundary

`pdgsolve` core should be assembly-native and Standard-Model-assembly-only.

- every solver-native reactant assembly, intermediate assembly, and product assembly is one explicit $\mathbb{A}\mathbb{A}\mathbb{A}$ assembly corresponding to admitted Standard Model content;
- and once a request enters `pdgsolve`, the solver should operate only on explicit admitted assemblies until it hands back explicit solve results.

For orientation, the solve semantics are organized into `5` semantic stages:

- reactant assemblies;
- reactant-side operators;
- intermediate assemblies;
- product-side operators;
- product assemblies.

The strip uses a deliberately limited grammar:

- reactant-side operators: `Pass Thru` or `Dissociate`;
- product-side operators: `Pass Thru` or `Associate`;
- reactant assemblies, intermediate assemblies, and product assemblies contain assemblies only;
- reactant-side operators and product-side operators contain operators only;
- all normal solve progress moves from reactant side to product side through adjacent semantic stages only;
- every solver-native assembly in those stages is one explicit admitted $\mathbb{A}\mathbb{A}\mathbb{A}$ assembly corresponding to Standard Model content;
- `pdgfeed` may already have completed the boundary by adding explicit `pro_noether_core_I` and `anti_noether_core_I` rows on the reactant or product side;
- `pdgfeed` may also emit one explicit counted `Unbound Architrinos` product occurrence for the sub-pair primitive residue that remains after full Noether-pair completion;
- the intermediate stage may contain one and only one explicit counted `Unbound Architrinos` assembly, and multiple reactant-side `Dissociate` operators may route counts into that one ledger;
- that intermediate `Unbound Architrinos` assembly acts as the common Electrino/Positrino ledger for all intermediate-to-product routing;
- product-side `Associate` and product-side `Pass Thru` may each draw routed counts from that one intermediate ledger;
- and if product-side `Pass Thru` routes from the intermediate `Unbound Architrinos` assembly, its output must be a product-side `Unbound Architrinos` assembly;
- and for `pdgfeed`-emitted v1 requests the solver should treat `allowedBoundaryAugmentations: ["none"]` as the normal handoff because adding boundary material is not a solver job.

In `pdgsolve` terminology, an **assembly** is one solver-native AAA assembly object that can participate in operator routing.

Inside `pdgsolve`, all routing, scoring, provenance, search symbols, and emitted output should use only individual assembly ids such as `pro_down_quark_I`, `pro_up_quark_I`, `pro_electron_I`, and `anti_electron_neutrino_I`.

`pdgsolve` should treat this as a semantic solve graph, not as presentation geometry.

That means:

- position in this five-stage solve flow is semantic;
- assembly order may matter for deterministic identity and output order;
- but solve legality must not depend on layout artifacts or other non-semantic presentation detail.

### Operator Semantics

`pdgsolve` should keep the operator family deliberately small.

`Pass Thru` means:

- one assembly-side input continues forward as the same provenance-carrying block;
- no decomposition occurs;
- and no new assembly identity is created.

`Dissociate` means:

- exactly one explicit reactant assembly is accepted;
- that reactant assembly is opened into an allowed output multiset of explicit intermediate assemblies;
- the original provenance block is refined into smaller provenance blocks with the same union;
- and the total conserved ledger is preserved across the split.

`Associate` means:

- an allowed gathered input multiset of explicit intermediate assemblies is closed into one explicit product assembly;
- exactly one output is emitted;
- the operation is legal only when the gathered material exactly satisfies the product assembly recipe;
- the gathered provenance blocks are coarsened into one larger provenance block with the same union;
- and the total conserved ledger is preserved across the associate step.

`pdgsolve` should model the nontrivial operators as finite law tables.

For dissociation, each operator-admissible assembly $a \in \mathcal{A}$ has a finite set $\Delta(a) \subset \mathbb{N}^{\mathcal{A}}$, where each $d \in \Delta(a)$ is one legal dissociation output multiset for $a$.

For association, each operator-admissible assembly $a \in \mathcal{A}$ has a finite set $\Gamma(a) \subset \mathbb{N}^{\mathcal{A}}$, where each $g \in \Gamma(a)$ is one legal gathered input multiset that can assemble into $a$.

`Pass Thru` is the identity law and therefore does not need a separate family table.

The important constraint is that $\Delta$ and $\Gamma$ are finite for a fixed solve family.

Every executable law should be local to one explicit assembly id. `Dissociate` rewrites one reactant assembly occurrence into an allowed output multiset of intermediate assemblies. `Associate` closes an allowed gathered input multiset of intermediate assemblies into one product assembly.

### First Test Case: Assembly-Level Beta Boundary

The familiar beta-decay channel is the first boundary example precisely because multiple descriptive scales may appear around the same event.

Applied to beta-decay, the same rule means the `pdgsolve` core expression must be written only in explicit assemblies already present in the active assembly alphabet, for example:

- reactant assemblies: `pro_down_quark_I + pro_up_quark_I + pro_down_quark_I`;
- product assemblies: `pro_up_quark_I + pro_down_quark_I + pro_up_quark_I + pro_electron_I + anti_electron_neutrino_I`.

From that point forward:

- the core search may use only explicit assembly ids from $\mathcal{A}$;
- and requests that arrive with higher-scale reactant or product terms are handled by the boundary rule stated above.

Candidate quality should be judged on assembly-native legality, conservation, provenance clarity, and deterministic ranking.

So the design rule is: the solver core reasons only over explicit admitted assemblies and explicit admitted operators.

### Noether-Pair Boundary Augmentation

`pdgsolve` should model the wildcard-like Noether freedom as a bounded boundary augmentation, not as a solver-native composite, grouping label, dissociation target, or association target.

Define one Noether-pair augmentation unit by the explicit two-assembly multiset $N_{\mathrm{Noether}} = \mathbf{1}_{\mathrm{pro\ Noether\ core}} + \mathbf{1}_{\mathrm{anti\ Noether\ core}}$.

A raw request still enters as requested boundary multisets $R_{\mathrm{req}}$ and $T_{\mathrm{req}}$.

If policy permits Noether-pair augmentation, normalization should derive a finite augmentation set $B(\Pi) \subset \mathbb{N} \times \mathbb{N}$, where one choice $b = (\alpha, \beta)$ means $R^{(b)} = R_{\mathrm{req}} + \alpha N_{\mathrm{Noether}}$ and $T^{(b)} = T_{\mathrm{req}} + \beta N_{\mathrm{Noether}}$.

For `pdgsolve` v1, one emitted family should augment at most one boundary side, so $\alpha \beta = 0$. That prevents redundant add-on-both-sides variants that do not add solve meaning.

After one augmentation choice $b$ is fixed:

- every added Noether core is just one ordinary assembly occurrence;
- the pair is not carried through the interior search as a composite symbol;
- `Dissociate` and `Associate` still act only on ordinary assembly laws, not on a special wildcard operator;
- and emitted families list the added Noether cores as assemblies in the chosen reactant or product boundary.

So the wildcard behavior is not a placeholder inside the solve core.

It is a bounded pre-search freedom over which explicit assemblies may be present at the boundary.

### Request Intake

`pdgsolve` should accept only explicit request-side data.

The concrete source inventory and request-contract field lists are collected under `Interfaces -> Inputs` near the end of this document.

`pdgsolve` should consume explicit request data rather than hidden process-local state.

`pdgsolve` should define one `pdgsolve`-owned solve problem model that is solver-native rather than presentation-native.

That solve problem model should describe reactant assemblies, product assemblies, the admitted intermediate-assembly alphabet, the permitted operator grammar, policy or theory gates, and provenance/accounting requirements.

That solve problem model must contain only explicit admitted assemblies.

Mathematically, `pdgsolve` should describe one solve instance as $Q = (\mathcal{A}, \mathcal{P}, \mu, R, T, \Delta, \Gamma, \Pi)$, where:

- $\mathcal{A}$ is the finite assembly alphabet of explicit admitted $\mathbb{A}\mathbb{A}\mathbb{A}$ assemblies for the active solve family;
- $\mathcal{P}$ is the basis of conserved primitive content;
- $\mu : \mathcal{A} \to \mathbb{N}^{\mathcal{P}}$ is the conserved-content map;
- $R, T \in \mathbb{N}^{\mathcal{A}}$ are the active reactant and product multisets for the solve instance after any admitted boundary augmentation has been fixed;
- $\Delta$ and $\Gamma$ are the dissociation and association law tables;
- and $\Pi$ is the active policy bundle.

By the time $R$ and $T$ exist, any higher-scale upstream description has already been translated into explicit assembly multisets or marked un-mappable at the boundary.

If boundary augmentation is enabled, $R$ and $T$ should be understood as one augmented solve instance derived from the requested boundary multisets under the active policy bundle $\Pi$.

For `pdgsolve` v1, the explicit conserved basis should be $\mathcal{P}_{0} = \{\mathrm{Electrino}, \mathrm{Positrino}\}$.

That means the first concrete interpretation of $\mu$ is:

- $\mu(a)_{\mathrm{Electrino}}$ = the number of Electrinos carried by assembly $a$;
- $\mu(a)_{\mathrm{Positrino}}$ = the number of Positrinos carried by assembly $a$.

The conserved-content map should extend linearly from assemblies to multisets: $\mu(x) = \sum_{a \in \mathcal{A}} x(a)\,\mu(a)$, for $x \in \mathbb{N}^{\mathcal{A}}$.

Every legal operator law should preserve this ledger.

That means:

- if $d \in \Delta(a)$, then $\mu(d) = \mu(a)$;
- if $g \in \Gamma(a)$, then $\mu(g) = \mu(a)$;
- and `Pass Thru` preserves $\mu$ trivially.

For shorthand, `pdgsolve` should define the primitive counts $N_{E}(x) = \mu(x)_{\mathrm{Electrino}}$ and $N_{P}(x) = \mu(x)_{\mathrm{Positrino}}$.

These are the first conserved sums that must match across the solve.

### Assembly Table

`pdgsolve` should use the full admitted Standard Model assembly alphabet for mapped PDG requests.

For `pdgsolve`, denote that alphabet by $\mathcal{A}_{\mathrm{v1}}$, where $\mathcal{A}_{\mathrm{v1}}$ is the complete canonical assembly table shared by `pdgfeed` translation and `pdgsolve` normalization.

The assembly table should list the full Standard Model inventory:

| Assembly family | Admitted Standard Model assemblies | Allowed stages in pdgsolve | note |
| --- | --- | --- | --- |
| charged leptons | electron, muon, tau, and their antiparticle variants | reactant assemblies, intermediate assemblies, and product assemblies | separate matter and antimatter assemblies remain explicit ids |
| neutrinos | electron neutrino, muon neutrino, tau neutrino, and their antineutrino variants | reactant assemblies, intermediate assemblies, and product assemblies | neutrino and antineutrino assemblies remain explicit ids |
| up-type quarks | up, charm, top, and their antiquark variants | reactant assemblies, intermediate assemblies, and product assemblies | quark and antiquark assemblies remain explicit ids |
| down-type quarks | down, strange, bottom, and their antiquark variants | reactant assemblies, intermediate assemblies, and product assemblies | quark and antiquark assemblies remain explicit ids |
| Noether cores | pro and anti variants | reactant assemblies, intermediate assemblies, and product assemblies | |

The concrete conserved-content rows for every admitted assembly in that table should be written here rather than deferred to a later phase. The running beta-boundary bookkeeping values already used elsewhere in this document include:

- $\mu(\mathrm{pro\_down\_quark\_I}) = (7, 5)$;
- $\mu(\mathrm{pro\_up\_quark\_I}) = (4, 8)$;
- $\mu(\mathrm{pro\_electron\_I}) = (9, 3)$;
- and $\mu(\mathrm{anti\_electron\_neutrino\_I}) = (6, 6)$.

`pdgsolve` should treat equality of $\mu$ as necessary for conservation, not as permission to identify assemblies.

### Rule Table

`pdgsolve` should use the full admitted assembly-native law tables needed to close PDG-mappable requests.

A specific assembly may still have an empty dissociation or association set when no legal dissociation or association exists for that assembly. Empty tables are not the intended global default.

`Pass Thru` remains the identity case inside those law tables, but it is not the only solver behavior the document is targeting.

For implementation, the abstract law-table placeholder should now be frozen as one concrete first-pass executable family:

### `pdgsolve-laws/v1-standard-model`

This first-pass law family is the machine-oriented rule set that `pdgsolve` should actually implement before wider refinement.

It should be expressed as:

- one universal `Pass Thru` identity law for every admitted assembly;
- one family of generation-aware `Dissociate` laws;
- one family of generation-aware `Associate` laws;
- one family of Noether-core ladder dissociation laws;
- and one shared counted `Unbound Architrinos` assembly in the intermediate stage.

This section is the executable interpretation of $\Delta$ and $\Gamma$ for v1.

#### One Shared Intermediate `Unbound Architrinos` Ledger

For the executable v1 law table, the intermediate stage should admit one and only one explicit counted `Unbound Architrinos` assembly.

That assembly carries exactly:

- an Electrino count;
- a Positrino count;
- and the corresponding $ \epsilon^- $ and $ \epsilon^+ $ display characters shown with those counts in the tile glyph.

This intermediate `Unbound Architrinos` assembly is not a wildcard well and not a composite label.

It is a shared ledger used only as:

- output of one or more reactant-side `Dissociate` operators;
- input to one or more product-side `Associate` operators;
- or input to a product-side `Pass Thru` whose output is a product-side `Unbound Architrinos` assembly.

Every constructed candidate must satisfy:

- Electrino count $\ge 0$;
- Positrino count $\ge 0$;
- routed counts may never drive either count below zero;
- an `Associate` operator consumes `Unbound Architrinos` to populate the polar charges of a fermion rather than reading those polar charges directly from an intact Noether core;
- and there may never be a second intermediate `Unbound Architrinos` assembly.

#### Universal Identity Law

For every admitted assembly $a \in \mathcal{A}_{\mathrm{v1}}$, $e_{a}: a \mapsto a$ is always legal.

So `Pass Thru` is globally available and must be included in every local action set.

#### Generation-Matched Noether-Core Decomposition

The first-pass executable law family should treat every visible Standard Model fermion assembly as:

- one generation-matched `pro Noether core` or `anti Noether core`;
- plus the required Electrino and Positrino counts carried by the one shared intermediate `Unbound Architrinos` ledger.

For v1, the generation-matched Noether cores are:

- generation I matter: `pro_noether_core_I`;
- generation I antimatter: `anti_noether_core_I`;
- generation II matter: `pro_noether_core_II`;
- generation II antimatter: `anti_noether_core_II`;
- generation III matter: `pro_noether_core_III`;
- generation III antimatter: `anti_noether_core_III`.

The first-pass `Unbound Architrinos` count classes are:

| Assembly family | Required `Unbound Architrinos` counts |
| --- | --- |
| charged matter lepton | `6` Electrinos, `0` Positrinos |
| charged antimatter lepton | `0` Electrinos, `6` Positrinos |
| neutrino or antineutrino | `3` Electrinos, `3` Positrinos |
| down-type matter quark | `4` Electrinos, `2` Positrinos |
| down-type antimatter quark | `2` Electrinos, `4` Positrinos |
| up-type matter quark | `1` Electrino, `5` Positrinos |
| up-type antimatter quark | `5` Electrinos, `1` Positrino |

These count classes match the current primitive counts already present in the admitted assembly table:

- `pro_electron_I = pro_noether_core_I + Unbound Architrinos (6 Electrinos, 0 Positrinos)`;
- `anti_electron_I = anti_noether_core_I + Unbound Architrinos (0 Electrinos, 6 Positrinos)`;
- `pro_electron_neutrino_I = pro_noether_core_I + Unbound Architrinos (3 Electrinos, 3 Positrinos)`;
- `anti_electron_neutrino_I = anti_noether_core_I + Unbound Architrinos (3 Electrinos, 3 Positrinos)`;
- `pro_down_quark_I = pro_noether_core_I + Unbound Architrinos (4 Electrinos, 2 Positrinos)`;
- `anti_down_quark_I = anti_noether_core_I + Unbound Architrinos (2 Electrinos, 4 Positrinos)`;
- `pro_up_quark_I = pro_noether_core_I + Unbound Architrinos (1 Electrino, 5 Positrinos)`;
- `anti_up_quark_I = anti_noether_core_I + Unbound Architrinos (5 Electrinos, 1 Positrino)`.

The same count classes should be reused across generations, with only the Noether-core generation changing.

So, for example:

- `pro_muon_II = pro_noether_core_II + Unbound Architrinos (6 Electrinos, 0 Positrinos)`;
- `anti_muon_II = anti_noether_core_II + Unbound Architrinos (0 Electrinos, 6 Positrinos)`;
- `pro_muon_neutrino_II = pro_noether_core_II + Unbound Architrinos (3 Electrinos, 3 Positrinos)`;
- `anti_muon_neutrino_II = anti_noether_core_II + Unbound Architrinos (3 Electrinos, 3 Positrinos)`;
- `pro_strange_quark_II = pro_noether_core_II + Unbound Architrinos (4 Electrinos, 2 Positrinos)`;
- `anti_strange_quark_II = anti_noether_core_II + Unbound Architrinos (2 Electrinos, 4 Positrinos)`;
- `pro_charm_quark_II = pro_noether_core_II + Unbound Architrinos (1 Electrino, 5 Positrinos)`;
- `anti_charm_quark_II = anti_noether_core_II + Unbound Architrinos (5 Electrinos, 1 Positrino)`;
- `pro_tau_III = pro_noether_core_III + Unbound Architrinos (6 Electrinos, 0 Positrinos)`;
- `anti_tau_III = anti_noether_core_III + Unbound Architrinos (0 Electrinos, 6 Positrinos)`;
- `pro_tau_neutrino_III = pro_noether_core_III + Unbound Architrinos (3 Electrinos, 3 Positrinos)`;
- `anti_tau_neutrino_III = anti_noether_core_III + Unbound Architrinos (3 Electrinos, 3 Positrinos)`;
- `pro_bottom_quark_III = pro_noether_core_III + Unbound Architrinos (4 Electrinos, 2 Positrinos)`;
- `anti_bottom_quark_III = anti_noether_core_III + Unbound Architrinos (2 Electrinos, 4 Positrinos)`;
- `pro_top_quark_III = pro_noether_core_III + Unbound Architrinos (1 Electrino, 5 Positrinos)`;
- `anti_top_quark_III = anti_noether_core_III + Unbound Architrinos (5 Electrinos, 1 Positrino)`.

This Noether-core-plus-`Unbound Architrinos` form is the first concrete v1 law-table basis.

#### Fermion Dissociation Laws

For every admitted visible fermion assembly $f$, the executable dissociation table should contain exactly the inverse of the corresponding association recipe.

In symbols, $\Delta(f) = \{\text{Noether core}(f) + \text{Unbound Architrinos counts}(f)\}$.

Concretely, the first-pass dissociation rules are:

- charged leptons:
  - `pro_electron_I -> pro_noether_core_I + Unbound Architrinos (6 Electrinos, 0 Positrinos)`
  - `anti_electron_I -> anti_noether_core_I + Unbound Architrinos (0 Electrinos, 6 Positrinos)`
  - `pro_muon_II -> pro_noether_core_II + Unbound Architrinos (6 Electrinos, 0 Positrinos)`
  - `anti_muon_II -> anti_noether_core_II + Unbound Architrinos (0 Electrinos, 6 Positrinos)`
  - `pro_tau_III -> pro_noether_core_III + Unbound Architrinos (6 Electrinos, 0 Positrinos)`
  - `anti_tau_III -> anti_noether_core_III + Unbound Architrinos (0 Electrinos, 6 Positrinos)`
- neutrinos:
  - `pro_electron_neutrino_I -> pro_noether_core_I + Unbound Architrinos (3 Electrinos, 3 Positrinos)`
  - `anti_electron_neutrino_I -> anti_noether_core_I + Unbound Architrinos (3 Electrinos, 3 Positrinos)`
  - `pro_muon_neutrino_II -> pro_noether_core_II + Unbound Architrinos (3 Electrinos, 3 Positrinos)`
  - `anti_muon_neutrino_II -> anti_noether_core_II + Unbound Architrinos (3 Electrinos, 3 Positrinos)`
  - `pro_tau_neutrino_III -> pro_noether_core_III + Unbound Architrinos (3 Electrinos, 3 Positrinos)`
  - `anti_tau_neutrino_III -> anti_noether_core_III + Unbound Architrinos (3 Electrinos, 3 Positrinos)`
- down-type quarks:
  - `pro_down_quark_I -> pro_noether_core_I + Unbound Architrinos (4 Electrinos, 2 Positrinos)`
  - `anti_down_quark_I -> anti_noether_core_I + Unbound Architrinos (2 Electrinos, 4 Positrinos)`
  - `pro_strange_quark_II -> pro_noether_core_II + Unbound Architrinos (4 Electrinos, 2 Positrinos)`
  - `anti_strange_quark_II -> anti_noether_core_II + Unbound Architrinos (2 Electrinos, 4 Positrinos)`
  - `pro_bottom_quark_III -> pro_noether_core_III + Unbound Architrinos (4 Electrinos, 2 Positrinos)`
  - `anti_bottom_quark_III -> anti_noether_core_III + Unbound Architrinos (2 Electrinos, 4 Positrinos)`
- up-type quarks:
  - `pro_up_quark_I -> pro_noether_core_I + Unbound Architrinos (1 Electrino, 5 Positrinos)`
  - `anti_up_quark_I -> anti_noether_core_I + Unbound Architrinos (5 Electrinos, 1 Positrino)`
  - `pro_charm_quark_II -> pro_noether_core_II + Unbound Architrinos (1 Electrino, 5 Positrinos)`
  - `anti_charm_quark_II -> anti_noether_core_II + Unbound Architrinos (5 Electrinos, 1 Positrino)`
  - `pro_top_quark_III -> pro_noether_core_III + Unbound Architrinos (1 Electrino, 5 Positrinos)`
  - `anti_top_quark_III -> anti_noether_core_III + Unbound Architrinos (5 Electrinos, 1 Positrino)`

Each such rule emits:

- exactly one Noether-core row;
- routed counts into the one shared intermediate `Unbound Architrinos` ledger;
- and no hidden extra material.

#### Fermion Association Laws

For every admitted visible fermion assembly $f$, the executable association table should contain exactly the inverse gather law.

In symbols, $\Gamma(f) = \{\text{Noether core}(f) + \text{Unbound Architrinos counts}(f)\}$.

Concretely, `Associate` may create $f$ if and only if the gathered inputs are exactly:

- the generation-matched Noether-core row of $f$;
- plus the required routed counts from the one shared intermediate `Unbound Architrinos` ledger.

So, for example:

- `Associate(pro_electron_I)` requires `pro_noether_core_I + Unbound Architrinos (6 Electrinos, 0 Positrinos)`;
- `Associate(anti_electron_neutrino_I)` requires `anti_noether_core_I + Unbound Architrinos (3 Electrinos, 3 Positrinos)`;
- `Associate(pro_muon_II)` requires `pro_noether_core_II + Unbound Architrinos (6 Electrinos, 0 Positrinos)`;
- `Associate(pro_strange_quark_II)` requires `pro_noether_core_II + Unbound Architrinos (4 Electrinos, 2 Positrinos)`;
- `Associate(anti_top_quark_III)` requires `anti_noether_core_III + Unbound Architrinos (5 Electrinos, 1 Positrino)`.

An `Associate` operator consumes `Unbound Architrinos` to populate the polar charges of a fermion. It does not read those polar charges directly from an intact Noether core row.

If a constructed candidate needs additional Electrinos or Positrinos in the ledger, it must first create them by lawful dissociation before the associated product is attempted.

The `Associate` tile should display the Electrino and Positrino counts it routes from the intermediate `Unbound Architrinos` ledger into the product assembly.

#### Noether-Core Ladder Laws

The generation ladder should be executable through explicit Noether-core dissociation rather than by invisible subtraction.

Specifically, this means a `Dissociate` operator may open a `pro Noether core` or `anti Noether core` into the next lower Noether-core form while routing `1` Electrino and `1` Positrino into the one shared intermediate `Unbound Architrinos` ledger. At the bottom of the ladder, a generation III Noether core may dissociate into routed `1` Electrino and `1` Positrino with no lower Noether-core output.

Open point: this one-binary-at-a-time Noether-core dissociation rule may not be sufficient to cover the full ready corpus. We still need to resolve whether lawful `Dissociate` behavior must also admit larger Noether-core openings in a single operator step rather than only this stepwise ladder.

For v1, the first-pass ladder laws are:

- `pro_noether_core_I -> pro_noether_core_II + Unbound Architrinos (1 Electrino, 1 Positrino)`
- `anti_noether_core_I -> anti_noether_core_II + Unbound Architrinos (1 Electrino, 1 Positrino)`
- `pro_noether_core_II -> pro_noether_core_III + Unbound Architrinos (1 Electrino, 1 Positrino)`
- `anti_noether_core_II -> anti_noether_core_III + Unbound Architrinos (1 Electrino, 1 Positrino)`
- `pro_noether_core_III -> Unbound Architrinos (1 Electrino, 1 Positrino)`
- `anti_noether_core_III -> Unbound Architrinos (1 Electrino, 1 Positrino)`

These rules make the Noether-core ladder explicit:

- tri-binary to bi-binary releases `1` Electrino and `1` Positrino into the shared intermediate `Unbound Architrinos` ledger;
- bi-binary to uni-binary releases `1` Electrino and `1` Positrino into the shared intermediate `Unbound Architrinos` ledger;
- uni-binary to fully unbound releases `1` Electrino and `1` Positrino into the shared intermediate `Unbound Architrinos` ledger.

This is the first lawful mechanism by which a constructed candidate can add neutral charge into the intermediate ledger for later associations.

#### No Hidden Direct-Use Rule

The executable law table should impose the following explicit constraint:

- product-side `Associate` may consume only intermediate ledger occurrences;
- every polar contribution must come from the one explicit intermediate `Unbound Architrinos` ledger;
- and product-side `Pass Thru` may route counts from that ledger only to a product-side `Unbound Architrinos` assembly.

So the following are illegal:

- treating an intact Noether core as a free polar source;
- reading Electrino or Positrino counts directly from reactant-side support rows on the product side;
- creating a second intermediate `Unbound Architrinos` assembly;
- or routing counts from the intermediate ledger so that either Electrinos or Positrinos would go negative.

The `Pass Thru` tile should display the Electrino and Positrino counts it routes when it carries `Unbound Architrinos` from the intermediate stage to the product stage.

#### Current Executable Law Slice

The shipped `pdgsolve` vertical slice currently freezes `pdgsolve-laws/v1-standard-model` as its executable law table.

That means the current deterministic solver assumes:

- one shared admitted assembly alphabet $\mathcal{A}_{\mathrm{v1}}$;
- universal pass-thru over the admitted assemblies;
- the Noether-core-plus-`Unbound Architrinos` dissociate/associate family above;
- the Noether-core ladder dissociation laws above;
- one shared intermediate `Unbound Architrinos` ledger, implemented as one residue accumulator with nonnegative counts;
- and no hand-authored reaction-specific solves or hidden shortcuts.

If specific corpus channels require broader coverage, the next step should be to revise or extend this explicit law inventory and the constructive mapper that uses it, rather than to reintroduce per-channel solved reactions in code.

### Normalization Rules

`pdgsolve` should normalize every upstream request into one explicit `pdgsolve-problem/v1` record before search begins.

The concrete field inventories for `pdgsolve-request/v1` and `pdgsolve-problem/v1` are collected under `Interfaces -> Inputs` near the end of this document.

Normalization assumes those occurrence lists already contain explicit assemblies rather than higher-scale boundary terms. If `pdgfeed` cannot translate a source request into explicit Standard Model assemblies, it should classify that source request as un-mappable and should not emit a `pdgsolve` request for it.

Normalization should then do the following, in order:

1. receive only assembly ids from the upstream boundary adapter, such as `pro_down_quark_I`, `pro_up_quark_I`, `pro_electron_I`, and `anti_electron_neutrino_I`;
2. preserve the resulting occurrence order so the search can assign stable occurrence indices later;
3. reject any assembly outside $\mathcal{A}_{\mathrm{v1}}$ with `pdgsolve.request.unsupported_assembly`;
4. freeze the active primitive basis as $\mathcal{P}_{0}$ and the executable law table as `pdgsolve-laws/v1-standard-model`;
5. build the requested multisets $R_{\mathrm{req}}$ and $T_{\mathrm{req}}$;
6. normalize the finite Noether-pair boundary augmentation mode set implied by policy, defaulting to the singleton no-augmentation mode when augmentation is not allowed;
7. freeze one deterministic augmentation occurrence order, appending each admitted pair in the order pro Noether core then anti Noether core, with pair indices ascending;
8. emit one solver-native problem record whose content is fully sufficient for search without any presentation lookup, including the requested multisets and the finite augmentation modes to enumerate.

### Conserved Balance Equations

`pdgsolve` should make the balance laws explicit across reactant assemblies, intermediate assemblies, and product assemblies.

Because architrinos have provenance in $\mathbb{A}\mathbb{A}\mathbb{A}$, the correct solve picture is not a disappearing flow ledger.

It is one fixed primitive carrier set viewed through three different assembly partitions.

Define the explicit reactant assemblies and explicit product assemblies by $x_{1} = R$ and $x_{5} = T$.

An exact candidate must find:

- intermediate assemblies $x_{3} \in \mathbb{N}^{\mathcal{A}}$;
- a finite primitive carrier set $\Omega = \Omega_{E} \sqcup \Omega_{P}$;
- and assembly partitions $P_{1}, P_{3}, P_{5}$ of $\Omega$;

such that:

- $P_{1}$ realizes $x_{1}$;
- $P_{3}$ realizes $x_{3}$;
- $P_{5}$ realizes $x_{5}$;
- and the reactant-side operators and product-side operators are legal provenance-preserving rewrites from $P_{1}$ to $P_{3}$ and from $P_{3}$ to $P_{5}$.

Here, "realizes" means:

- each block in $P_{\ell}$ is labeled by some assembly $a \in \mathcal{A}$;
- the block contains exactly $\mu(a)_{\mathrm{Electrino}}$ Electrinos and $\mu(a)_{\mathrm{Positrino}}$ Positrinos;
- and the multiplicity of each label $a$ agrees with $x_{\ell}(a)$.

The primitive invariants across these assembly partitions are therefore $\mu(x_{1}) = \mu(x_{3}) = \mu(x_{5})$.

In particular, `pdgsolve` must preserve the Electrino and Positrino counts separately: $N_{E}(x_{1}) = N_{E}(x_{3}) = N_{E}(x_{5})$ and $N_{P}(x_{1}) = N_{P}(x_{3}) = N_{P}(x_{5})$.

So the reaction does not merely conserve totals in the aggregate.

It preserves one underlying architrino population whose grouping changes across reactant assemblies, intermediate assemblies, and product assemblies.

If a request fails these equalities at the boundary, `pdgsolve` should not silently repair that mismatch.

Instead, it should report the primitive imbalance vector $\delta(Q) = \mu(x_{1}) - \mu(x_{5}) \in \mathbb{Z}^{\mathcal{P}_{0}}$, with concrete components $\delta_{E} = N_{E}(x_{1}) - N_{E}(x_{5})$ and $\delta_{P} = N_{P}(x_{1}) - N_{P}(x_{5})$.

If $\delta(Q) \neq 0$, then exact closure is impossible for that request under the active assembly-native law table.

So at the first primitive level, `pdgsolve` should always be able to say:

- Electrinos balanced or imbalanced by $\delta_{E}$;
- Positrinos balanced or imbalanced by $\delta_{P}$;
- and whether the explicit admitted assembly request can possibly close without leaving the assembly-native ontology.

### Deterministic Construction Model

The shipped `pdgsolve.py` algorithm is not a combinatorial search engine. It is a deterministic constructive mapper over the normalized request.

The current exact-family path proceeds in one fixed order:

1. normalize the request into explicit ordered reactant and product occurrences plus primitive totals;
2. reject immediately when normalization yields blocking diagnostics or when the boundary primitive imbalance makes exact closure impossible;
3. pair same-assembly reactant/product occurrences first as catalyst-style `Pass Thru` mappings;
4. classify remaining product requirements into core-bearing closures and residue pass-through closures;
5. compute how many Noether-core rows must be carried directly, converted upward through the core ladder, or added as support occurrences;
6. dissociate remaining non-core reactants either into one required core plus residue or into residue only when no core is still needed;
7. allocate the single intermediate `Unbound Architrinos` accumulator across product-side `Associate` and residue `Pass Thru` operators;
8. reject the candidate if any required core input is unavailable or if any residue remains unmatched;
9. validate operator balances and intermediate-ledger conservation;
10. emit one exact family when the construction closes, otherwise emit one deterministic `no_exact_closure` family.

So the runtime does not enumerate alternative branches and then rank them. It builds one candidate according to a fixed core-first policy and either proves that candidate internally consistent or falls back explicitly.

### Deterministic Operator Construction

The constructive path still uses the five semantic stages:

- reactant assemblies;
- reactant-side operators;
- intermediate assemblies;
- product-side operators;
- and product assemblies.

But those stages are now filled by a deterministic mapping rather than by branch enumeration.

In the current vertical slice:

- `Pass Thru` is chosen first for same-assembly catalyst pairs;
- remaining non-core reactants are opened by deterministic `Dissociate` rules into one core plus residue, or residue only when no core is still needed;
- remaining product tasks are closed by deterministic `Associate` rules that consume one required core occurrence plus residue from the shared accumulator when the recipe needs it;
- and one residue product may be emitted by `Pass Thru` from that accumulator.

The important property is not that many legal rewrites exist and are searched. The important property is that the runtime applies one explicit law table and one fixed allocation policy to construct a candidate solve graph.

### Deterministic Failure Gates

Because the algorithm is constructive, failure is represented by explicit gates rather than by search exhaustion.

The current runtime fails the exact-family path when any of the following occurs:

- normalization reports blocking request diagnostics;
- the request primitive ledgers are imbalanced while exact closure is required;
- a product requirement cannot be translated into a supported deterministic task;
- the construction cannot supply a needed core input;
- the shared residue accumulator cannot satisfy the required product-side residue counts;
- residue remains unmatched after all product tasks are assigned;
- operator-balance validation fails;
- or intermediate-ledger conservation fails.

Those cases do not leave partially explored branches behind. They collapse directly into one deterministic `no_exact_closure` family with explicit diagnostics.

### How Rules Produce Solution Families

For the current implementation, one normalized problem produces at most one constructed exact family.

That family is determined by:

- the normalized occurrence order;
- the catalyst pairings selected by same-assembly first match;
- the fixed core-demand accounting;
- the fixed ladder-conversion and support-row policy;
- the deterministic residue allocation;
- and the fixed tie-break key `deterministic_core_first`.

If any of those steps cannot close legally, `pdgsolve` emits one deterministic fallback family instead of exploring alternates.

So the current family model is not "many raw branches canonicalized into one family." It is "one constructive candidate, or one explicit failure family."

### Solve Output Model

`pdgsolve` should return one `pdgsolve`-owned solve result model from the deterministic construction core.

That internal model should be solver-shaped rather than workflow-shaped.

It should be rich enough to carry:

- the current exact-family or deterministic no-exact family output for the shipped vertical slice;
- diagnostics and no-exact-closure notes;
- explicit review-state and acceptance-readiness information;
- explicit provenance/accounting summaries;
- and the information needed to emit downstream acceptance and publication artifacts without making other tools reconstruct omitted semantics.

At the batch boundary, this model should serialize into one `pdgsolve-result/v1` file per solved request plus the companion corpus and publication artifacts used by the manifest workflow.

### Solution Family Identity

`pdgsolve` should still surface solution families rather than low-level transient construction state, but in the current runtime a family is already the direct emitted product of one deterministic construction pass.

So family identity is presently frozen by the emitted solve summary itself:

- the boundary augmentation summary;
- the reactant, intermediate, and product assembly inventories;
- the ordered reactant-side and product-side operator choices;
- the provenance summary;
- the diagnostics;
- and the score tuple.

There is no separate raw-branch equivalence class in the shipped vertical slice because the runtime does not generate multiple equal-summary candidates first.

### pdgsolve Result Contract

`pdgsolve` should define one external solve/result contract named `pdgsolve-result/v1`.

That contract should be assembled from:

- the current normalized `pdgsolve` problem;
- the current emitted exact or deterministic fallback family;
- and the current top-level diagnostics.

The concrete field inventory for `pdgsolve-result/v1` and its family members is collected under `Interfaces -> Outputs` near the end of this document.

### Candidate Scoring

`pdgsolve` should score constructed candidates explicitly rather than relying on ad hoc success/failure buckets alone.

The score model should prefer, in order:

- exact conservation and exact product closure;
- zero primitive imbalance and zero intermediate-assemblies mismatch;
- fewer Noether-pair boundary augmentations;
- fewer non-identity operators;
- fewer dissociations when a less disruptive exact path exists;
- stronger provenance clarity;
- and stable deterministic tie-breaks over otherwise equal candidates.

`pdgsolve` should formalize that ranking as a lexicographic minimization problem.

For the emitted exact candidate $C = (x_{1}, \phi_{2,C}, x_{3}, \phi_{4,C}, x_{5})$, define

$$
\kappa(C) =
\bigl(
\epsilon(C),
m_{\mathrm{prim}}(C),
m_{\mathrm{mid}}(C),
n_{\mathrm{aug}}(C),
n_{\mathrm{op}}(C),
n_{\mathrm{diss}}(C),
n_{\mathrm{amb}}(C),
\tau(C)
\bigr),
$$

with smaller values preferred, where:

- $\epsilon(C) = 0$ when $x_{3,C}^{\mathrm{reactant}} = x_{3,C}^{\mathrm{product}}$ and $W_{C}$ is a complete provenance witness, and $1$ otherwise;
- $m_{\mathrm{prim}}(C) = \lVert \mu(R) - \mu(T) \rVert_{1}$;
- $m_{\mathrm{mid}}(C) = \lVert x_{3,C}^{\mathrm{reactant}} - x_{3,C}^{\mathrm{product}} \rVert_{1}$, viewing the difference in $\mathbb{Z}^{\mathcal{A}}$;
- $n_{\mathrm{aug}}(C)$ is the auxiliary support burden introduced by the constructive policy;
- $n_{\mathrm{op}}(C)$ is the total non-identity operator count in $\phi_{2,C}$ and $\phi_{4,C}$;
- $n_{\mathrm{diss}}(C)$ is the dissociation count in $\phi_{2,C}$;
- $n_{\mathrm{amb}}(C)$ is the explicit ambiguity/provenance penalty count;
- and $\tau(C)$ is a deterministic tie-break key.

Candidate comparison should be strictly lexicographic.

That means:

1. every exact candidate beats every non-exact candidate;
2. among exact candidates, lower primitive imbalance wins first;
3. then lower intermediate-assemblies mismatch wins;
4. then fewer Noether-pair boundary augmentations wins;
5. then fewer non-identity operators wins;
6. then fewer dissociations wins;
7. then lower ambiguity/provenance penalty wins;
8. and finally $\tau(C)$ breaks any remaining tie deterministically.

The current shipped runtime does not score partial branches because it does not maintain a live branch frontier.

Instead, it scores:

- the one constructed exact candidate when closure succeeds;
- or one deterministic fallback family when closure fails.

This means the limited reactant/intermediate/product assemblies and reactant-side/product-side operators geometry is not just a legality constraint.

It is also the basis of a useful score function:

- whether the reactant and product primitive budgets match exactly;
- whether the reactant-side-generated and product-side-required middle inventories meet exactly;
- how much structure had to be opened;
- how much structure had to be rebuilt;
- whether the construction stayed entirely within the admitted explicit assembly ontology;
- and how directly the product set was reached.

A solution family should inherit the score of its best canonical representative.

That means the emitted results can show:

- the best exact option first;
- and non-closing fallback output with explicit diagnostics when exact construction fails.

### Deterministic Tie-Break Rule

`pdgsolve` should freeze the deterministic tie-break key $\tau(C)$ rather than leaving it implicit.

For candidate comparison, define

$$
\tau(C)
=
\bigl(
\sigma_{2}(C),
\sigma_{4}(C),
\sigma_{3}(C),
\rho(C)
\bigr),
$$

with lexicographic comparison and the concrete orders:

- canonical assembly order: lexicographic order of the canonical ids in $\mathcal{A}_{\mathrm{v1}}$;
- reactant-occurrence order: normalized request order, with same-id duplicates numbered in first-seen order;
- product-occurrence order: normalized request order, with same-id duplicates numbered in first-seen order;
- reactant-side operator order: the sequence of operator assignments in reactant-occurrence order;
- product-side operator order: the sequence of operator assignments in product-occurrence order;
- and intermediate-assemblies order: assembly counts listed in canonical assembly order.

For `pdgsolve` v1, the operator symbol order inside $\sigma_{2}$ and $\sigma_{4}$ should be:

- `pass_thru`;
- then the remaining admitted law-family symbols in the fixed canonical order of the active law table.

The provenance signature $\rho(C)$ should summarize, in canonical product-occurrence order:

- whether each product occurrence is pure pass-thru or active rewrite output;
- and any explicit ambiguity marker bits.

This means repeated runs over the same normalized problem must produce the same emitted family representative because the construction order is fixed.

### Diagnostic Codes

`pdgsolve` should freeze the stable diagnostic ids now so later implementation and test-case work does not guess at naming.

The v1 set should be:

| Diagnostic id | Phase | Meaning | Required payload |
| --- | --- | --- | --- |
| `pdgsolve.request.unsupported_assembly` | request | the request names an assembly outside `pdgsolve` v1 | requested token and attempted canonical id |
| `pdgsolve.request.unmappable_request` | request | the source request cannot be translated into explicit admitted Standard Model assemblies and therefore should not become a solver-native request | source id or raw token set, attempted role set, and translator note |
| `pdgsolve.request.invalid_boundary_role` | request | a solver-native assembly was requested in a boundary role where that assembly family is not admitted | assembly id, attempted role, and allowed roles |
| `pdgsolve.request.unsupported_boundary_augmentation` | request | the request policy asks for a boundary augmentation mode outside the admitted v1 Noether-pair augmentation set | requested augmentation token and allowed augmentation set |
| `pdgsolve.search.primitive_imbalance` | search | $\delta(Q) \neq 0$ for the retained constructed candidate or retained request summary | request id and $(\delta_E, \delta_P)$ |
| `pdgsolve.search.middle_mismatch` | search | reactant-side-generated and product-side-required middle inventories do not close | request id and canonical mismatch vector |
| `pdgsolve.search.provenance_failure` | search | no complete provenance witness exists for the retained constructed candidate | retained operator summary and failing witness clause |
| `pdgsolve.search.no_exact_closure` | search | the request is assembly-native, but no exact closure was found inside the admitted explicit assembly ontology | request id and retained closure-failure summary |
| `pdgsolve.search.non_exact_candidate_retained` | search | a non-closing fallback family was kept with explicit failure context | family id and retained failure mode |

### Core Regression Test-Case Set

Before `pdgsolve` implementation is considered trustworthy, the core regression denominator should be:

| Test-case id | Raw request | Key policy | Minimum expected outcome |
| --- | --- | --- | --- |
| `explicit_beta_request_exact_closure` | `2 pro_down_quark_I + pro_up_quark_I -> pro_down_quark_I + 2 pro_up_quark_I + pro_electron_I + anti_electron_neutrino_I` | default | at least one exact assembly-native family exists; no composite or non-native symbol is introduced |
| `primitive_imbalance_row_beta_source_to_target` | `2 pro_down_quark_I + pro_up_quark_I -> pro_down_quark_I + 2 pro_up_quark_I` | default | retained diagnostics include `pdgsolve.search.primitive_imbalance` with $(\delta_E, \delta_P) = (3, -3)$; no exact family exists |
| `pass_thru_row_beta_source` | `2 pro_down_quark_I + pro_up_quark_I -> 2 pro_down_quark_I + pro_up_quark_I` | default | three exact pass-thru assemblies; zero non-identity operators; zero ambiguity penalty |
| `representative_multi_option_exact` | one mapped PDG request that yields at least two distinct exact solution families | default | at least two exact solution families remain after canonicalization, with stable score order and stable family representatives |
| `noether_pair_boundary_augmentation_exact` | one curated assembly-native request whose only exact closure requires one Noether pair on one boundary side | `exactClosureRequired=true`, `allowedBoundaryAugmentations=["noether_pair"]`, `maxNoetherPairsPerSide=1` | at least one exact family exists; the emitted family lists the pro Noether core and anti Noether core as ordinary assemblies on the chosen boundary side, carries an explicit `boundaryAugmentation` summary, and introduces no composite or wildcard placeholder id |

Positive regression coverage for PDG-to-assembly translation and un-mappable classification belongs in [pdgfeed](./pdgfeed.md), not in `pdgsolve`.

`pdgsolve` should keep only assembly-native solve regressions plus boundary rejection coverage for direct developer-loaded inputs.

## Interfaces

### Inputs

#### Source Inventory

- canonical test-case requests;
- PDG-backed requests emitted by [pdgfeed](./pdgfeed.md);
- and direct load of explicit request JSON by a developer.

#### Raw Request Contract: `pdgsolve-request/v1`

- `schema: "pdgsolve-request/v1"`;
- `requestId`;
- `source.kind`, for example `pdgfeed`, `developer`, or `pdgsolve-reopen`;
- explicit reactant-side and product-side occurrence lists;
- optional `electrinoCount` and `positrinoCount` on the one admitted `Unbound Architrinos` product occurrence;
- and policy fields, with `pdgfeed` v1 requests normally carrying `allowedBoundaryAugmentations: ["none"]`.

#### Example `pdgfeed` Requests

The following frozen JSON blocks show the handoff shape that `pdgsolve` should accept from [pdgfeed](./pdgfeed.md). The neutron beta examples remain the clearest boundary reference because they show how composite neutron and proton terms are expanded into explicit request-side assemblies before solve.

##### Free neutron beta decay from a local PDG test case

```json
{
  "schema": "pdgsolve-request/v1",
  "requestId": "free_neutron_beta_decay",
  "source": {
    "kind": "pdgfeed",
    "title": "Free neutron beta decay",
    "sourceDocumentId": "pdg-proposal:free_neutron_beta_decay"
  },
  "reactants": [
    {
      "id": "reactant_neutron_1.row.1",
      "assemblyId": "pro_down_quark_I",
      "title": "Down Quark"
    },
    {
      "id": "reactant_neutron_1.row.2",
      "assemblyId": "pro_up_quark_I",
      "title": "Up Quark"
    },
    {
      "id": "reactant_neutron_1.row.3",
      "assemblyId": "pro_down_quark_I",
      "title": "Down Quark"
    }
  ],
  "products": [
    {
      "id": "product_proton_1.row.1",
      "assemblyId": "pro_up_quark_I",
      "title": "Up Quark"
    },
    {
      "id": "product_proton_1.row.2",
      "assemblyId": "pro_down_quark_I",
      "title": "Down Quark"
    },
    {
      "id": "product_proton_1.row.3",
      "assemblyId": "pro_up_quark_I",
      "title": "Up Quark"
    },
    {
      "id": "product_pro_electron_2",
      "assemblyId": "pro_electron_I",
      "title": "Electron"
    },
    {
      "id": "product_anti_electron_neutrino_3",
      "assemblyId": "anti_electron_neutrino_I",
      "title": "Anti Electron Neutrino"
    }
  ],
  "policy": {
    "exactClosureRequired": true,
    "allowedBoundaryAugmentations": [
      "none"
    ]
  }
}
```

##### Free neutron beta decay from a PDG database read

```json
{
  "schema": "pdgsolve-request/v1",
  "requestId": "free_neutron_beta_decay.live-pdg",
  "source": {
    "kind": "pdgfeed",
    "title": "Free neutron beta decay",
    "sourceDocumentId": "pdg-proposal:free_neutron_beta_decay.live-pdg"
  },
  "reactants": [
    {
      "id": "reactant_neutron_1.row.1",
      "assemblyId": "pro_down_quark_I",
      "title": "Down Quark"
    },
    {
      "id": "reactant_neutron_1.row.2",
      "assemblyId": "pro_up_quark_I",
      "title": "Up Quark"
    },
    {
      "id": "reactant_neutron_1.row.3",
      "assemblyId": "pro_down_quark_I",
      "title": "Down Quark"
    }
  ],
  "products": [
    {
      "id": "product_proton_1.row.1",
      "assemblyId": "pro_up_quark_I",
      "title": "Up Quark"
    },
    {
      "id": "product_proton_1.row.2",
      "assemblyId": "pro_down_quark_I",
      "title": "Down Quark"
    },
    {
      "id": "product_proton_1.row.3",
      "assemblyId": "pro_up_quark_I",
      "title": "Up Quark"
    },
    {
      "id": "product_pro_electron_2",
      "assemblyId": "pro_electron_I",
      "title": "Electron"
    },
    {
      "id": "product_anti_electron_neutrino_3",
      "assemblyId": "anti_electron_neutrino_I",
      "title": "Anti Electron Neutrino"
    }
  ],
  "policy": {
    "exactClosureRequired": true,
    "allowedBoundaryAugmentations": [
      "none"
    ]
  }
}
```

##### Minimal future exportable `pdgfeed` request template

```json
{
  "schema": "pdgsolve-request/v1",
  "requestId": "<proposal-id>",
  "source": {
    "kind": "pdgfeed",
    "title": "<channel title>",
    "sourceDocumentId": "pdg-proposal:<proposal-id>"
  },
  "reactants": [
    {
      "id": "<reactant occurrence id>",
      "assemblyId": "<solver assembly id>",
      "title": "<solver title>"
    }
  ],
  "products": [
    {
      "id": "<product occurrence id>",
      "assemblyId": "<solver assembly id>",
      "title": "<solver title>"
    }
  ],
  "policy": {
    "exactClosureRequired": true,
    "allowedBoundaryAugmentations": [
      "none"
    ]
  }
}
```

#### Normalized Problem Contract: `pdgsolve-problem/v1`

- `schema: "pdgsolve-problem/v1"`;
- `problemId`;
- `requestId`;
- `source`;
- `reactants` and `products`, each as both ordered occurrence lists and multiset summaries;
- `boundaryAugmentationModes`, carrying the finite normalized Noether-pair augmentation choices derived from policy;
- `assemblyAlphabetId: "pdgsolve-assemblies/v1-standard-model"`;
- `primitiveBasisId: "pdgsolve-primitives/electrino-positrino/v1"`;
- `lawTableId: "pdgsolve-laws/v1-standard-model"`;
- `policy`;
- and `normalization`, containing explicit notes about boundary translation assumptions and normalization diagnostics.

#### Supporting Runtime Inputs

- `pdgsolve`-owned solve policy;
- accepted result records used by the `accept` command;
- acceptance records used by the `publish` command;
- and live-manifest payloads whose `readyEntries[*].pdgsolveRequest` records drive the `solve-manifest` batch path.

#### Input Boundary Conditions

- accept explicit upstream request data only after successful higher-scale-to-assembly translation;
- if `pdgfeed` cannot translate a source request into explicit admitted Standard Model assemblies, classify that source request as un-mappable and do not emit a `pdgsolve` request for it;
- accept higher-scale composite terms only at the boundary adapter, never as solver-native request ids;
- allow wildcard-like boundary freedom only through explicit Noether-pair augmentation modes derived from policy, never through placeholder wildcard ids or composite boundary terms;
- keep solver-native request content assembly-native, with no presentation-only state;
- and treat downstream authored documents as downstream artifacts rather than invertible `pdgsolve` requests.

### Outputs

#### Solve, Acceptance, And Publication Outputs

- `pdgsolve-problem/v1` normalized solve problems inside the runtime;
- `pdgsolve-result/v1` solve and review outputs;
- `pdgsolve-acceptance/v1` locked accepted records;
- `pdgsolve-publication-graph/v2` solve-graph publication payloads embedded in acceptances;
- `pdgedit/v1` documents emitted from accepted or review publication paths;
- `pdgedit-library-manifest/v1` manifests for batch publication;
- and `pdgsolve-result-corpus/v1` indexes summarizing manifest solves.

#### Solve Result Contract: `pdgsolve-result/v1`

- `schema: "pdgsolve-result/v1"`;
- `problemId`;
- `searchStatus`, currently `exact_available` or `no_exact_closure` in the shipped vertical slice;
- `requestId`;
- `bestFamilyId`;
- `acceptedFamilyId`, currently `null` until an explicit acceptance is created;
- top-level `diagnostics`;
- `optionFamilies`, currently one exact family or one deterministic no-exact family;
- `review`, carrying review state, the selected family id, and blocking diagnostics;
- and `publication`, currently `null` until downstream publication packaging is requested.

Each member of `optionFamilies` currently contains:

- `familyId`;
- `kind`, currently `exact` or `no_exact_closure`;
- `score`, carrying the concrete components of $\kappa$;
- `augmentation`, carrying the chosen boundary augmentation mode;
- `reactantAssemblies`, carrying the canonical reactant assemblies;
- `reactantSideOperators`, carrying the canonical reactant-side operator choices;
- `intermediateAssemblies`, carrying the canonical intermediate assemblies;
- `productSideOperators`, carrying the canonical product-side operator choices;
- `productAssemblies`, carrying the canonical product assemblies;
- `provenanceSummary`, carrying the family-level witness summary;
- `diagnostics`, carrying family-local diagnostics;
- `rawBranchCount`, currently `1` for the shipped exact-family path and `0` for the deterministic fallback family;
- `publicationReady`, indicating whether the family is eligible for acceptance and publication;
- `addedSupportOccurrences`, when extra support rows were introduced during normalization;
- and `canonicalCandidate`, the fully specified representative candidate.

For the current implementation, the exact family path also carries `canonicalCandidate.solveGraph`, which is the layout-neutral publication graph source used by acceptance and pdgedit publication.

#### Acceptance Contract: `pdgsolve-acceptance/v1`

- `schema: "pdgsolve-acceptance/v1"`;
- `problemId`;
- `familyId`;
- `resultDigest`;
- `acceptedScore`;
- `acceptedDiagnostics`;
- `acceptedState: "accepted"`;
- `lockedNormalizationSummary`;
- `lockedPolicySummary`;
- `lockedReactantAssemblies`;
- `lockedReactantSideOperators`;
- `lockedIntermediateAssemblies`;
- `lockedProductSideOperators`;
- `lockedProductAssemblies`;
- `lockedProvenanceSummary`;
- and `lockedSolveGraph`, which currently uses `pdgsolve-publication-graph/v2`.

#### Publication Contracts

- `pdgsolve-publication-graph/v2` is the layout-neutral seam between accepted solve structure and downstream pdgedit layout. It freezes five semantic stages as graph units and edges rather than asking pdgedit to reconstruct solver meaning from ad hoc rows.
- `pdgedit/v1` is the final emitted document shape produced either from an acceptance record or from a request-review fallback in the manifest batch path.
- `pdgsolve-pdgedit-package/v1` exists as a package helper for carrying a pdgedit document together with its manifest entry and source acceptance digest.
- `pdgsolve-result-corpus/v1` summarizes batch solve outcomes and records the written result and pdgedit document paths.

When `pdgsolve` emits more than one JSON artifact for a batch run, the preferred layout is:

- one `pdgsolve-result/v1` file per solved ready request;
- one `pdgsolve-result-corpus/v1` index summarizing the run;
- zero or more published `pdgedit/v1` documents for exact and review entries;
- and one `pdgedit-library-manifest/v1` describing the emitted pdgedit documents.

#### Output Boundary Conditions

- own solve normalization, search, scoring, and output emission inside the explicit assembly-native ontology;
- emit exact and no-exact families in explicit admitted assemblies only;
- when Noether-pair augmentation is used, emit the added Noether cores as explicit assemblies plus an explicit boundary augmentation summary;
- include the scores and diagnostics for every emitted family;
- freeze accepted solve structure before publication rather than asking downstream tools to infer it;
- do not duplicate PDG normalization logic locally;
- and keep pdgedit layout derivation downstream of the layout-neutral publication graph rather than inside solve laws.

### Neighboring Components, Each with Related Priorities

- [pdgfeed](./pdgfeed.md) owns upstream PDG normalization and request emission.
- [pdgapps](pdgapps.md) owns the cross-boundary modularity rules that still apply where relevant.

## Priorities

The boundary, CLI, acceptance seam, and publication contracts above are now baseline assumptions rather than active queue items.

### 1. Expand Solver Coverage Against The Ready Corpus

Status: `active`

Current:

- the local ready-corpus baseline is `1354` solved requests, with `16` `exact_available`, `0` `partialOnly`, and `1338` `no_exact_closure`;
- the dominant blocking diagnostic is `pdgsolve.request.unsupported_assembly`, which means most failures still occur at the admitted-assembly boundary rather than deep inside the constructive mapper;
- the most common unsupported assemblies in the current corpus are `anti_up_quark_I`, `anti_down_quark_I`, `pro_strange_quark_II`, `anti_strange_quark_II`, `pro_charm_quark_II`, `anti_charm_quark_II`, `pro_bottom_quark_III`, `anti_bottom_quark_III`, `pro_tau_III`, `anti_tau_III`, `pro_tau_neutrino_III`, and `anti_tau_neutrino_III`;
- and the current code already carries residue-count rules for many of those assemblies, so the main gap is alignment between the admitted assembly alphabet and the executable law inventory.

Objective:

- align the admitted assembly alphabet, request acceptance surface, and executable law inventory so the ready corpus can actually enter the deterministic solver;
- rerun corpus evaluation after each admitted-surface expansion and track exact count, no-exact count, and dominant blocking diagnostics;
- extend law-table coverage only in explicit assembly-native form, without reintroducing composite terms or hand-authored per-channel solved reactions;
- and, after alphabet alignment, determine whether the current Noether-core ladder needs broader lawful opening rules to improve exact closure.

Active work queue:

1. Expand the admitted request/product alphabet to include the unsupported assemblies already implied by the current Standard Model law inventory.
2. Keep `ASSEMBLY_DISPLAY`, request-side admission sets, and the dissociate/associate law inventory synchronized so admitted assemblies are also solver-legal.
3. Rerun `solve-manifest` on the ready corpus after each admitted-surface expansion and record exact count, no-exact count, and dominant diagnostics.
4. If exact coverage remains low after admitted-alphabet alignment, revise the explicit law table, starting with the Noether-core ladder and related opening rules, rather than adding channel-specific solves.
