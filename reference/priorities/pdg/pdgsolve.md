# pdgsolve

## LLM Instructions

- Keep this document focused on `pdgsolve` as a solve-only Python tool.
- Keep `Design` about durable solver boundaries, assemblies, operators, search, scoring, and JSON contracts.
- Keep `Priorities` ordered as the active work queue.
- Do not restate low-level PDG ingest internals except where the explicit request boundary from [pdgfeed](./pdgfeed.md) matters.

## Purpose

`pdgsolve` is the dedicated solving tool between upstream request sources and downstream solve-result artifacts.

It owns:

- intake of explicit solve requests from upstream sources such as [pdgfeed](./pdgfeed.md), test cases, and direct developer input;
- normalization of those requests into a `pdgsolve`-owned solve problem expressed only in explicit admitted assemblies;
- combinatorial search over conservative solve candidates;
- deterministic scoring and ranking of exact and partial solution families;
- and emission of JSON solve outputs.

It does not own:

- PDG data access and normalization logic that belongs in [pdgfeed](./pdgfeed.md);
- or downstream document-generation steps that belong outside the solve boundary.

## Current State

- The active target is a solve-only Python implementation.
- The implementation boundary should be one Python file, `scripts/pdg/pdgsolve.py`.
- The tool should consume explicit `pdgsolve-request/v1` JSON and emit JSON solve outputs containing all exact solution families, the top three partial solution families, and the scores for all emitted families.

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
- solve-core search;
- scoring and family canonicalization;
- and solve-output emission.

Large coordinator files may assemble those pieces temporarily, but they should not become the long-term home of solver semantics.

### Composite And Higher-Scale Terms Are Out Of Scope

Composite labels, higher-scale particle names, grouping interpretations, support tokens, residue labels, and similar terms are boundary-side language, not solver-native objects.

`Unbound Architrinos` is the one important exception. It is solver-native in exactly these roles:

- one and only one explicit counted `Unbound Architrinos` assembly in the intermediate stage;
- and one explicit counted `Unbound Architrinos` occurrence on the product side when either upstream already emitted it at the boundary or an intermediate-side `Pass Thru` routes to it.

The intermediate `Unbound Architrinos` assembly is a ledger object. It may appear only as the shared output target of reactant-side `Dissociate` operators. Multiple reactant-side `Dissociate` operators may route Electrinos and Positrinos into it within the same branch. It is not a wildcard well, and it is not replaced by multiple separate intermediate `Unbound Architrinos` objects. Its Electrino and Positrino counts are part of the solver state and are routed explicitly through `Associate` and `Pass Thru` operators.

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

`pdgsolve` should treat this as a combinatorial state graph, not as presentation geometry.

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

For dissociation, each operator-admissible assembly \(a \in \mathcal{A}\) has a finite set

$$
\Delta(a) \subset \mathbb{N}^{\mathcal{A}},
$$

where each \(d \in \Delta(a)\) is one legal dissociation output multiset for \(a\).

For association, each operator-admissible assembly \(a \in \mathcal{A}\) has a finite set

$$
\Gamma(a) \subset \mathbb{N}^{\mathcal{A}},
$$

where each \(g \in \Gamma(a)\) is one legal gathered input multiset that can assemble into \(a\).

`Pass Thru` is the identity law and therefore does not need a separate family table.

The important constraint is that \(\Delta\) and \(\Gamma\) are finite for a fixed solve family.

Every executable law should be local to one explicit assembly id. `Dissociate` rewrites one reactant assembly occurrence into an allowed output multiset of intermediate assemblies. `Associate` closes an allowed gathered input multiset of intermediate assemblies into one product assembly.

### First Test Case: Assembly-Level Beta Boundary

The familiar beta-decay channel is the first boundary example precisely because multiple descriptive scales may appear around the same event.

Applied to beta-decay, the same rule means the `pdgsolve` core expression must be written only in explicit assemblies already present in the active assembly alphabet, for example:

- reactant assemblies: `pro_down_quark_I + pro_up_quark_I + pro_down_quark_I`;
- product assemblies: `pro_up_quark_I + pro_down_quark_I + pro_up_quark_I + pro_electron_I + anti_electron_neutrino_I`.

From that point forward:

- the core search may use only explicit assembly ids from \(\mathcal{A}\);
- and requests that arrive with higher-scale reactant or product terms are handled by the boundary rule stated above.

Candidate quality should be judged on assembly-native legality, conservation, provenance clarity, and deterministic ranking.

So the design rule is: the solver core reasons only over explicit admitted assemblies and explicit admitted operators.

### Noether-Pair Boundary Augmentation

`pdgsolve` should model the wildcard-like Noether freedom as a bounded boundary augmentation, not as a solver-native composite, grouping label, dissociation target, or association target.

Define one Noether-pair augmentation unit by the explicit two-assembly multiset

$$
N_{\mathrm{Noether}}
=
\mathbf{1}_{\mathrm{pro\ Noether\ core}}
+
\mathbf{1}_{\mathrm{anti\ Noether\ core}}.
$$

A raw request still enters as requested boundary multisets \(R_{\mathrm{req}}\) and \(T_{\mathrm{req}}\).

If policy permits Noether-pair augmentation, normalization should derive a finite augmentation set

$$
B(\Pi) \subset \mathbb{N} \times \mathbb{N},
$$

where one choice \(b = (\alpha, \beta)\) means:

$$
R^{(b)} = R_{\mathrm{req}} + \alpha N_{\mathrm{Noether}}, \qquad
T^{(b)} = T_{\mathrm{req}} + \beta N_{\mathrm{Noether}}.
$$

For `pdgsolve` v1, one emitted family should augment at most one boundary side, so \(\alpha \beta = 0\). That prevents redundant add-on-both-sides variants that do not add solve meaning.

After one augmentation choice \(b\) is fixed:

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

Mathematically, `pdgsolve` should describe one solve instance as

$$
Q = (\mathcal{A}, \mathcal{P}, \mu, R, T, \Delta, \Gamma, \Pi),
$$

where:

- \(\mathcal{A}\) is the finite assembly alphabet of explicit admitted \(\mathbb{A}\mathbb{A}\mathbb{A}\) assemblies for the active solve family;
- \(\mathcal{P}\) is the basis of conserved primitive content;
- \(\mu : \mathcal{A} \to \mathbb{N}^{\mathcal{P}}\) is the conserved-content map;
- \(R, T \in \mathbb{N}^{\mathcal{A}}\) are the active reactant and product multisets for the solve instance after any admitted boundary augmentation has been fixed;
- \(\Delta\) and \(\Gamma\) are the dissociation and association law tables;
- and \(\Pi\) is the active policy bundle.

By the time \(R\) and \(T\) exist, any higher-scale upstream description has already been translated into explicit assembly multisets or marked un-mappable at the boundary.

If boundary augmentation is enabled, \(R\) and \(T\) should be understood as one augmented solve instance derived from the requested boundary multisets under the active policy bundle \(\Pi\).

For `pdgsolve` v1, the explicit conserved basis should be

$$
\mathcal{P}_{0} = \{\mathrm{Electrino}, \mathrm{Positrino}\}.
$$

That means the first concrete interpretation of \(\mu\) is:

- \(\mu(a)_{\mathrm{Electrino}}\) = the number of Electrinos carried by assembly \(a\);
- \(\mu(a)_{\mathrm{Positrino}}\) = the number of Positrinos carried by assembly \(a\).

The conserved-content map should extend linearly from assemblies to multisets:

$$
\mu(x) = \sum_{a \in \mathcal{A}} x(a)\,\mu(a), \qquad x \in \mathbb{N}^{\mathcal{A}}.
$$

Every legal operator law should preserve this ledger.

That means:

- if \(d \in \Delta(a)\), then \(\mu(d) = \mu(a)\);
- if \(g \in \Gamma(a)\), then \(\mu(g) = \mu(a)\);
- and `Pass Thru` preserves \(\mu\) trivially.

For shorthand, `pdgsolve` should define the primitive counts

$$
N_{E}(x) = \mu(x)_{\mathrm{Electrino}}, \qquad N_{P}(x) = \mu(x)_{\mathrm{Positrino}}.
$$

These are the first conserved sums that must match across the solve.

### Assembly Table

`pdgsolve` should use the full admitted Standard Model assembly alphabet for mapped PDG requests.

For `pdgsolve`, denote that alphabet by

$$
\mathcal{A}_{\mathrm{v1}}
$$

where \(\mathcal{A}_{\mathrm{v1}}\) is the complete canonical assembly table shared by `pdgfeed` translation and `pdgsolve` normalization.

The assembly table should list the full Standard Model inventory:

| Assembly family | Admitted Standard Model assemblies | Allowed stages in pdgsolve | note |
| --- | --- | --- | --- |
| charged leptons | electron, muon, tau, and their antiparticle variants | reactant assemblies, intermediate assemblies, and product assemblies | separate matter and antimatter assemblies remain explicit ids |
| neutrinos | electron neutrino, muon neutrino, tau neutrino, and their antineutrino variants | reactant assemblies, intermediate assemblies, and product assemblies | neutrino and antineutrino assemblies remain explicit ids |
| up-type quarks | up, charm, top, and their antiquark variants | reactant assemblies, intermediate assemblies, and product assemblies | quark and antiquark assemblies remain explicit ids |
| down-type quarks | down, strange, bottom, and their antiquark variants | reactant assemblies, intermediate assemblies, and product assemblies | quark and antiquark assemblies remain explicit ids |
| Noether cores | pro and anti variants | reactant assemblies, intermediate assemblies, and product assemblies | |

The concrete conserved-content rows for every admitted assembly in that table should be written here rather than deferred to a later phase. The running beta-boundary bookkeeping values already used elsewhere in this document include:

- \(\mu(\mathrm{pro\_down\_quark\_I}) = (7, 5)\);
- \(\mu(\mathrm{pro\_up\_quark\_I}) = (4, 8)\);
- \(\mu(\mathrm{pro\_electron\_I}) = (9, 3)\);
- and \(\mu(\mathrm{anti\_electron\_neutrino\_I}) = (6, 6)\).

`pdgsolve` should treat equality of \(\mu\) as necessary for conservation, not as permission to identify assemblies.

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

This section is the executable interpretation of \(\Delta\) and \(\Gamma\) for v1.

#### One Shared Intermediate `Unbound Architrinos` Ledger

For the executable v1 law table, the intermediate stage should admit one and only one explicit counted `Unbound Architrinos` assembly.

That assembly carries exactly:

- an Electrino count;
- a Positrino count;
- and the corresponding \( \epsilon^- \) and \( \epsilon^+ \) display characters shown with those counts in the tile glyph.

This intermediate `Unbound Architrinos` assembly is not a wildcard well and not a composite label.

It is a shared ledger used only as:

- output of one or more reactant-side `Dissociate` operators;
- input to one or more product-side `Associate` operators;
- or input to a product-side `Pass Thru` whose output is a product-side `Unbound Architrinos` assembly.

Every branch must satisfy:

- Electrino count \(\ge 0\);
- Positrino count \(\ge 0\);
- routed counts may never drive either count below zero;
- an `Associate` operator consumes `Unbound Architrinos` to populate the polar charges of a fermion rather than reading those polar charges directly from an intact Noether core;
- and there may never be a second intermediate `Unbound Architrinos` assembly.

#### Universal Identity Law

For every admitted assembly \(a \in \mathcal{A}_{\mathrm{v1}}\),

$$
e_{a}: a \mapsto a
$$

is always legal.

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

For every admitted visible fermion assembly \(f\), the executable dissociation table should contain exactly the inverse of the corresponding association recipe.

In symbols:

$$
\Delta(f) = \{\text{Noether core}(f) + \text{Unbound Architrinos counts}(f)\}.
$$

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

For every admitted visible fermion assembly \(f\), the executable association table should contain exactly the inverse gather law.

In symbols:

$$
\Gamma(f) = \{\text{Noether core}(f) + \text{Unbound Architrinos counts}(f)\}.
$$

Concretely, `Associate` may create \(f\) if and only if the gathered inputs are exactly:

- the generation-matched Noether-core row of \(f\);
- plus the required routed counts from the one shared intermediate `Unbound Architrinos` ledger.

So, for example:

- `Associate(pro_electron_I)` requires `pro_noether_core_I + Unbound Architrinos (6 Electrinos, 0 Positrinos)`;
- `Associate(anti_electron_neutrino_I)` requires `anti_noether_core_I + Unbound Architrinos (3 Electrinos, 3 Positrinos)`;
- `Associate(pro_muon_II)` requires `pro_noether_core_II + Unbound Architrinos (6 Electrinos, 0 Positrinos)`;
- `Associate(pro_strange_quark_II)` requires `pro_noether_core_II + Unbound Architrinos (4 Electrinos, 2 Positrinos)`;
- `Associate(anti_top_quark_III)` requires `anti_noether_core_III + Unbound Architrinos (5 Electrinos, 1 Positrino)`.

An `Associate` operator consumes `Unbound Architrinos` to populate the polar charges of a fermion. It does not read those polar charges directly from an intact Noether core row.

If a branch needs additional Electrinos or Positrinos in the ledger, it must first create them by lawful dissociation before the associated product is attempted.

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

This is the first lawful mechanism by which a branch can add neutral charge into the intermediate ledger for later associations.

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

#### First Coding Target

The first real `pdgsolve` implementation should code exactly this `pdgsolve-laws/v1-standard-model` law family before adding refinements.

That means the first executable solver should assume:

- one shared admitted assembly alphabet \(\mathcal{A}_{\mathrm{v1}}\);
- universal pass-thru;
- the Noether-core-plus-`Unbound Architrinos` dissociate/associate family above;
- the Noether-core ladder laws above;
- one shared intermediate `Unbound Architrinos` ledger with nonnegative counts;
- and no hidden reaction-specific shortcuts.

If this first-pass law family proves insufficient for specific corpus channels, the next step should be to revise this table explicitly here rather than to reintroduce hand-authored solved reactions in code.

### Normalization Rules

`pdgsolve` should normalize every upstream request into one explicit `pdgsolve-problem/v1` record before search begins.

The concrete field inventories for `pdgsolve-request/v1` and `pdgsolve-problem/v1` are collected under `Interfaces -> Inputs` near the end of this document.

Normalization assumes those occurrence lists already contain explicit assemblies rather than higher-scale boundary terms. If `pdgfeed` cannot translate a source request into explicit Standard Model assemblies, it should classify that source request as un-mappable and should not emit a `pdgsolve` request for it.

Normalization should then do the following, in order:

1. receive only assembly ids from the upstream boundary adapter, such as `pro_down_quark_I`, `pro_up_quark_I`, `pro_electron_I`, and `anti_electron_neutrino_I`;
2. preserve the resulting occurrence order so the search can assign stable occurrence indices later;
3. reject any assembly outside \(\mathcal{A}_{\mathrm{v1}}\) with `pdgsolve.request.unsupported_assembly`;
4. freeze the active primitive basis as \(\mathcal{P}_{0}\) and the executable law table as `pdgsolve-laws/v1-standard-model`;
5. build the requested multisets \(R_{\mathrm{req}}\) and \(T_{\mathrm{req}}\);
6. normalize the finite Noether-pair boundary augmentation mode set implied by policy, defaulting to the singleton no-augmentation mode when augmentation is not allowed;
7. freeze one deterministic augmentation occurrence order, appending each admitted pair in the order pro Noether core then anti Noether core, with pair indices ascending;
8. emit one solver-native problem record whose content is fully sufficient for search without any presentation lookup, including the requested multisets and the finite augmentation modes to enumerate.

### Conserved Balance Equations

`pdgsolve` should make the balance laws explicit across reactant assemblies, intermediate assemblies, and product assemblies.

Because architrinos have provenance in \(\mathbb{A}\mathbb{A}\mathbb{A}\), the correct solve picture is not a disappearing flow ledger.

It is one fixed primitive carrier set viewed through three different assembly partitions.

Define the explicit reactant assemblies and explicit product assemblies

$$
x_{1} = R, \qquad x_{5} = T.
$$

An exact candidate must find:

- intermediate assemblies \(x_{3} \in \mathbb{N}^{\mathcal{A}}\);
- a finite primitive carrier set \(\Omega = \Omega_{E} \sqcup \Omega_{P}\);
- and assembly partitions \(P_{1}, P_{3}, P_{5}\) of \(\Omega\);

such that:

- \(P_{1}\) realizes \(x_{1}\);
- \(P_{3}\) realizes \(x_{3}\);
- \(P_{5}\) realizes \(x_{5}\);
- and the reactant-side operators and product-side operators are legal provenance-preserving rewrites from \(P_{1}\) to \(P_{3}\) and from \(P_{3}\) to \(P_{5}\).

Here, "realizes" means:

- each block in \(P_{\ell}\) is labeled by some assembly \(a \in \mathcal{A}\);
- the block contains exactly \(\mu(a)_{\mathrm{Electrino}}\) Electrinos and \(\mu(a)_{\mathrm{Positrino}}\) Positrinos;
- and the multiplicity of each label \(a\) agrees with \(x_{\ell}(a)\).

The primitive invariants across these assembly partitions are therefore

$$
\mu(x_{1}) = \mu(x_{3}) = \mu(x_{5}).
$$

In particular, `pdgsolve` must preserve the Electrino and Positrino counts separately:

$$
N_{E}(x_{1}) = N_{E}(x_{3}) = N_{E}(x_{5}),
$$

$$
N_{P}(x_{1}) = N_{P}(x_{3}) = N_{P}(x_{5}).
$$

So the reaction does not merely conserve totals in the aggregate.

It preserves one underlying architrino population whose grouping changes across reactant assemblies, intermediate assemblies, and product assemblies.

If a request fails these equalities at the boundary, `pdgsolve` should not silently repair that mismatch.

Instead, it should report the primitive imbalance vector

$$
\delta(Q) = \mu(x_{1}) - \mu(x_{5}) \in \mathbb{Z}^{\mathcal{P}_{0}},
$$

with the concrete components

$$
\delta_{E} = N_{E}(x_{1}) - N_{E}(x_{5}), \qquad
\delta_{P} = N_{P}(x_{1}) - N_{P}(x_{5}).
$$

If \(\delta(Q) \neq 0\), then exact closure is impossible for that request under the active assembly-native law table.

So at the first primitive level, `pdgsolve` should always be able to say:

- Electrinos balanced or imbalanced by \(\delta_{E}\);
- Positrinos balanced or imbalanced by \(\delta_{P}\);
- and whether the explicit admitted assembly request can possibly close without leaving the assembly-native ontology.

### Combinatorial Search Model

`pdgsolve` should treat solving as an explicit combinatorial search problem.

The search design should specify:

- what one branch-state record contains;
- what counts as one candidate expansion;
- how operators such as `Pass Thru`, `Dissociate`, and `Associate` expand the state;
- how conservation and provenance prune illegal branches;
- how mismatch, ambiguity, and no-exact-closure cases are represented explicitly;
- and how deterministic ranking chooses one exact or partial solution family over another.

The search model should remain solution-focused.

This limited geometry should be exploited aggressively.

If policy admits Noether-pair augmentation, the search should enumerate the finite augmentation set \(B(\Pi)\) before ordinary operator assignment begins.

For each augmentation mode \(b = (\alpha, \beta) \in B(\Pi)\), the search should define

$$
x_{1}^{(b)} = R_{\mathrm{req}} + \alpha N_{\mathrm{Noether}}, \qquad
x_{5}^{(b)} = T_{\mathrm{req}} + \beta N_{\mathrm{Noether}},
$$

and then run the ordinary meet-in-the-middle operator search on that augmented boundary pair.

That augmentation choice belongs to candidate identity, scoring, and output, but it is not itself a reactant-side or product-side operator.

In particular:

- each reactant assembly that is allowed to feed intermediate assemblies presents a small action set, typically `Pass Thru` or `Dissociate`;
- each intermediate assembly or assembly-set presents a small action set, typically `Pass Thru` or `Associate`;
- each `Dissociate` choice consumes exactly one assembly reactant input;
- each `Associate` choice emits exactly one assembly product output;
- candidate growth therefore comes from combinations of a bounded family of local choices rather than from unconstrained geometric routing;
- and that bounded choice structure makes branch scoring and pruning practical.

Let

$$
\mathcal{A}_{\mathrm{mid}} \subset \mathcal{A}
$$

be the subset of assemblies that are legal in the intermediate assemblies of the active solve family.

For the reactant-side operators, `pdgsolve` should define the one-assembly reactant rewrite family only on \(\mathcal{A}_{\mathrm{mid}}\):

$$
\Lambda_{2}(a) = \{e_{a}\} \cup \Delta(a), \qquad a \in \mathcal{A}_{\mathrm{mid}},
$$

where \(e_{a}\) represents `Pass Thru` and each \(d \in \Delta(a)\) represents one legal `Dissociate` output.

For the product-side operators, `pdgsolve` should define the one-assembly product-closure family only on \(\mathcal{A}_{\mathrm{mid}}\):

$$
\Lambda_{4}(a) = \{e_{a}\} \cup \Gamma(a), \qquad a \in \mathcal{A}_{\mathrm{mid}},
$$

where \(e_{a}\) represents `Pass Thru` and each \(g \in \Gamma(a)\) represents one legal intermediate-assemblies input multiset that can `Associate` into \(a\).

Given full reactant assemblies \(x_{1}\), the reactant-side-generated intermediate family from one-assembly choices is

$$
\mathfrak{M}_{\mathrm{reactant}}(x_{1}) =
\left\{
\sum_{a \in \mathcal{A}_{\mathrm{mid}}} \sum_{i=1}^{x_{1}(a)} y_{a,i}
\;\middle|\;
y_{a,i} \in \Lambda_{2}(a)
\right\}.
$$

Given full product assemblies \(x_{5}\), the product-side-required intermediate family from one-assembly choices is

$$
\mathfrak{M}_{\mathrm{product}}(x_{5}) =
\left\{
\sum_{a \in \mathcal{A}_{\mathrm{mid}}} \sum_{j=1}^{x_{5}(a)} z_{a,j}
\;\middle|\;
z_{a,j} \in \Lambda_{4}(a)
\right\}.
$$

An exact solve therefore requires

$$
\exists x_{3} \in \mathfrak{M}_{\mathrm{reactant}}(x_{1}) \cap \mathfrak{M}_{\mathrm{product}}(x_{5}),
$$

together with a provenance witness showing that the chosen reactant-side and product-side rewrite families act on the same fixed primitive carrier set \(\Omega\).

One useful branch-state record is

$$
s = (b, \phi_{2}, \phi_{4}, x_{3}^{\mathrm{reactant}}, x_{3}^{\mathrm{product}}, W),
$$

where:

- \(b \in B(\Pi)\) is the active Noether-pair boundary augmentation choice;
- \(\phi_{2}\) is a partial assignment of reactant-side operator choices to reactant assembly occurrences;
- \(\phi_{4}\) is a partial assignment of product-side operator choices to product assembly occurrences;
- \(x_{3}^{\mathrm{reactant}}\) is the partial intermediate assemblies generated from the reactant assemblies;
- \(x_{3}^{\mathrm{product}}\) is the partial intermediate assemblies required by the product assemblies;
- and \(W\) is the current partial provenance witness.

`pdgsolve` should execute this search as a bounded meet-in-the-middle enumeration.

The operational loop should be:

1. enumerate the finite boundary augmentation mode set derived from policy, defaulting to the no-augmentation mode only;
2. for each augmentation mode, reject that mode immediately if the primitive imbalance vector \(\delta(Q)\) is nonzero and the current search mode requires exact closure;
3. initialize the empty branch state for that augmentation mode with no reactant-side or product-side operator assignments;
4. choose the next unassigned reactant or product assembly occurrence, preferring the side with fewer legal local rewrites or tighter intermediate-assemblies constraints;
5. expand that occurrence by one member of \(\Lambda_{2}(a)\) or \(\Lambda_{4}(a)\);
6. update the partial middle inventories \(x_{3}^{\mathrm{reactant}}\) and \(x_{3}^{\mathrm{product}}\), and update the partial provenance witness \(W\);
7. prune the branch if the remaining unassigned occurrences can no longer close the middle or provenance constraints;
8. continue until all reactant and product occurrences are assigned;
9. emit a terminal candidate when the completed branch has a complete provenance witness, a scored intermediate-assemblies outcome, and one explicit boundary augmentation summary.

So the search does not guess full reactions in one jump.

It builds them one local operator choice at a time.

Each branch decision is therefore one small legal rewrite choice, and each completed branch is one fully specified candidate solve.

### Pruning Rules

`pdgsolve` should prune partial branches aggressively.

At minimum, the search should prune a branch under the following conditions:

- primitive impossibility:
  the request already has nonzero primitive imbalance in an exact-closure search;
- middle oversupply:
  the current reactant-side-generated intermediate assemblies already exceed the maximum possible product-side-required intermediate assemblies for some assembly coordinate;
- middle undersupply:
  the current product-side-required intermediate assemblies already exceed the maximum possible reactant-side-generated intermediate assemblies for some assembly coordinate;
- recipe impossibility:
  the remaining unassigned reactant occurrences cannot generate the assembly ingredients still required by unresolved product-side closures;
- absorption impossibility:
  the remaining unassigned product occurrences cannot absorb the middle assemblies already forced by the reactant-side choices;
- provenance impossibility:
  the partial provenance witness \(W\) can no longer be extended to a full carrier partition consistent with the chosen dissociate/associate laws;
- dominance:
  another branch with the same unresolved occurrence set is already no worse on middle mismatch, operator count, dissociation count, and provenance penalty;
- and bound failure:
  the optimistic lower-bound score for the partial branch is already worse than the current best emitted exact candidate or worse than the retained top-three partial threshold.

These pruning rules are what make the search practical.

The raw Cartesian product of all local rewrite choices may still be large, but most branches should die early because they cannot possibly meet in the middle or preserve provenance.

### Pass-Thru Safety

`Pass Thru` must be treated as a live fallback option until a specific assembly occurrence has actually been assigned a different rewrite.

So `pdgsolve` should not prune a branch merely because:

- a reactant assembly has not yet been dissociated;
- a product assembly has not yet been associated;
- or the current partial branch looks non-minimal if unresolved occurrences were later allowed to pass straight through.

Safe pruning therefore requires bounds that still include pass-thru.

For a partial branch \(s\), let \(U_{2}(s)\) be the unresolved reactant occurrences and \(U_{4}(s)\) the unresolved product occurrences.

For each intermediate-assemblies coordinate \(m \in \mathcal{A}\), define the pass-thru-safe envelopes

$$
M^{-}_{\mathrm{reactant},s}(m)
=
x_{3}^{\mathrm{reactant}}(m)
+
\sum_{\rho \in U_{2}(s)}
\min_{y \in \Lambda_{2}(a_{\rho})} y(m),
$$

$$
M^{+}_{\mathrm{reactant},s}(m)
=
x_{3}^{\mathrm{reactant}}(m)
+
\sum_{\rho \in U_{2}(s)}
\max_{y \in \Lambda_{2}(a_{\rho})} y(m),
$$

$$
M^{-}_{\mathrm{product},s}(m)
=
x_{3}^{\mathrm{product}}(m)
+
\sum_{\pi \in U_{4}(s)}
\min_{z \in \Lambda_{4}(a_{\pi})} z(m),
$$

$$
M^{+}_{\mathrm{product},s}(m)
=
x_{3}^{\mathrm{product}}(m)
+
\sum_{\pi \in U_{4}(s)}
\max_{z \in \Lambda_{4}(a_{\pi})} z(m).
$$

Here \(a_{\rho}\) and \(a_{\pi}\) are the assemblies attached to those unresolved occurrences.

For every unresolved occurrence whose assembly lies in \(\mathcal{A}_{\mathrm{mid}}\), the corresponding family still contains the identity element \(e_{a}\).

So these envelopes automatically include the pass-thru possibility for every unresolved occurrence that is actually eligible for pass-thru.

So an intermediate-assemblies prune is safe only if one of the coordinatewise intervals is already disjoint:

$$
M^{-}_{\mathrm{reactant},s}(m) > M^{+}_{\mathrm{product},s}(m)
\quad\text{or}\quad
M^{-}_{\mathrm{product},s}(m) > M^{+}_{\mathrm{reactant},s}(m)
$$

for some \(m \in \mathcal{A}\).

In plain language:

- if the reactant side is already guaranteed to overproduce some middle assembly even after giving the product side every remaining legal chance to absorb it, prune;
- if the product side is already guaranteed to demand some middle assembly that the reactant side can no longer produce even after giving the reactant side every remaining legal chance, prune;
- otherwise keep the branch alive, because pass-thru may still rescue it.

The same conservatism should apply to operator-count bounds.

For unresolved occurrences that are eligible for pass-thru, the lower-bound future operator burden should treat pass-thru as zero additional non-identity cost unless a non-identity rewrite is provably forced.

### How Rules Produce Solution Families

The rules lead to solution families in a direct way.

A raw option is one complete assignment

$$
O_{\mathrm{raw}} = (b, \phi_{2}, \phi_{4}).
$$

From that raw option, `pdgsolve` derives:

- the active boundary augmentation summary attached to \(b\);
- the reactant-side-generated intermediate assemblies \(x_{3}^{\mathrm{reactant}}\);
- the product-side-required intermediate assemblies \(x_{3}^{\mathrm{product}}\);
- the completed provenance witness \(W\), if one exists;
- and the candidate score tuple \(\kappa\).

A raw option becomes an exact solve candidate when:

- \(x_{3}^{\mathrm{reactant}} = x_{3}^{\mathrm{product}}\);
- the primitive imbalance is zero;
- and \(W\) closes as a complete provenance witness.

A raw option becomes a partial solve candidate when:

- the branch is complete;
- but middle closure, primitive balance, or provenance closure still fails in an explicit diagnosable way.

Multiple raw options may canonicalize to the same solution family.

That should happen when they emit the same boundary augmentation summary, the same reactant assemblies, intermediate assemblies, and product assemblies, the same reactant-side and product-side operator choices, and the same effective provenance/accounting summary.

So the emitted solve outputs should not show every raw branch separately.

They should show ranked solution families, each with:

- one canonical representative candidate;
- its score tuple;
- a summary of why it ranks where it does;
- and the count or description of equivalent raw branches folded into that family.

This yields a finite branch graph for any finite request.

The key reason is:

- each reactant occurrence that can feed intermediate assemblies contributes one finite choice from \(\Lambda_{2}(a)\);
- each product occurrence that can be matched from intermediate assemblies contributes one finite choice from \(\Lambda_{4}(a)\);
- \(\mathfrak{M}_{\mathrm{reactant}}(x_{1})\) and \(\mathfrak{M}_{\mathrm{product}}(x_{5})\) are therefore finite;
- and provenance matching is performed over a finite primitive carrier set.

So yes, this limited geometry is not merely drawable. It is mathematically enumerable.

### Solve Output Model

`pdgsolve` should return one `pdgsolve`-owned solve result model from the search core.

That internal model should be solver-shaped rather than workflow-shaped.

It should be rich enough to carry:

- all exact solution families;
- the retained top three partial solution families;
- diagnostics and no-exact-closure notes;
- explicit provenance/accounting summaries;
- and the information needed to emit downstream JSON artifacts without making other tools reconstruct omitted semantics.

At the batch boundary, this model should serialize into one `pdgsolve-result/v1` summary JSON and may also serialize into additional per-family JSON artifacts if that helps inspection or regression tests.

### Solution Family Identity

`pdgsolve` should surface solution families rather than raw branches.

For completed raw options

$$
O_{\mathrm{raw}} = (b, \phi_{2}, \phi_{4}, W),
$$

two branches should belong to the same solution family exactly when they agree on the full emitted solve summary:

- the same boundary augmentation summary;
- the same reactant assemblies, intermediate assemblies, and product assemblies;
- the same ordered reactant-side operator assignments after canonical reactant-occurrence ordering;
- the same ordered product-side operator assignments after canonical product-occurrence ordering;
- the same score tuple \(\kappa\);
- the same emitted provenance summary;
- and the same diagnostic id set.

Two completed raw branches should not split into different solution families merely because they:

- rename primitive carriers inside the witness;
- permute indistinguishable assembly occurrences with the same canonical occurrence index class;
- or differ only in low-level witness detail that leaves the emitted assembly inventories, operator choices, diagnostics, and provenance summary unchanged.

The family key should therefore be

$$
\operatorname{fam}(O_{\mathrm{raw}})
=
\bigl(
x_{1},
x_{3},
x_{5},
\sigma_{2},
\sigma_{4},
\rho,
\kappa
\bigr),
$$

where \(\sigma_{2}\) and \(\sigma_{4}\) are the canonical ordered operator signatures and \(\rho\) is the canonical emitted provenance summary.

Differing provenance-witness detail should create a different solution family only when it changes \(\rho\).

So:

- witness detail that changes which assembly occurrence is the active rewrite source, spectator source, or ambiguous source does change family identity;
- but witness detail that only renames equivalent primitive carriers does not.

The canonical representative of a solution family should be the member with minimal deterministic tie-break key \(\tau\) inside that family.

### pdgsolve Result Contract

`pdgsolve` should define one external solve/result contract named `pdgsolve-result/v1`.

That contract should be assembled from:

- the current normalized `pdgsolve` problem;
- the current ranked exact solution families;
- the current ranked retained partial solution families;
- and the current top-level diagnostics.

The concrete field inventory for `pdgsolve-result/v1` and its family members is collected under `Interfaces -> Outputs` near the end of this document.

### Candidate Scoring

`pdgsolve` should score candidates explicitly rather than relying on ad hoc success/failure buckets alone.

The score model should prefer, in order:

- exact conservation and exact product closure;
- zero primitive imbalance and zero intermediate-assemblies mismatch;
- fewer Noether-pair boundary augmentations;
- fewer non-identity operators;
- fewer dissociations when a less disruptive exact path exists;
- stronger provenance clarity;
- and stable deterministic tie-breaks over otherwise equal candidates.

`pdgsolve` should formalize that ranking as a lexicographic minimization problem.

For a terminal candidate

$$
C = (b_{C}, \phi_{2,C}, \phi_{4,C}, x_{3,C}^{\mathrm{reactant}}, x_{3,C}^{\mathrm{product}}, W_{C}),
$$

define

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

- \(\epsilon(C) = 0\) when \(x_{3,C}^{\mathrm{reactant}} = x_{3,C}^{\mathrm{product}}\) and \(W_{C}\) is a complete provenance witness, and \(1\) otherwise;
- \(m_{\mathrm{prim}}(C) = \lVert \mu(R) - \mu(T) \rVert_{1}\);
- \(m_{\mathrm{mid}}(C) = \lVert x_{3,C}^{\mathrm{reactant}} - x_{3,C}^{\mathrm{product}} \rVert_{1}\), viewing the difference in \(\mathbb{Z}^{\mathcal{A}}\);
- \(n_{\mathrm{aug}}(C)\) is the number of Noether pairs added by the chosen boundary augmentation mode;
- \(n_{\mathrm{op}}(C)\) is the total non-identity operator count in \(\phi_{2,C}\) and \(\phi_{4,C}\);
- \(n_{\mathrm{diss}}(C)\) is the dissociation count in \(\phi_{2,C}\);
- \(n_{\mathrm{amb}}(C)\) is the explicit ambiguity/provenance penalty count;
- and \(\tau(C)\) is a deterministic tie-break key.

Candidate comparison should be strictly lexicographic.

That means:

1. every exact candidate beats every non-exact candidate;
2. among exact candidates, lower primitive imbalance wins first;
3. then lower intermediate-assemblies mismatch wins;
4. then fewer Noether-pair boundary augmentations wins;
5. then fewer non-identity operators wins;
6. then fewer dissociations wins;
7. then lower ambiguity/provenance penalty wins;
8. and finally \(\tau(C)\) breaks any remaining tie deterministically.

`pdgsolve` should score partial branches too, using an optimistic lower-bound score derived from the same tuple structure.

For a partial branch \(s\), the search should compute:

- whether exact closure is still possible;
- the unavoidable primitive imbalance already fixed by the explicit request;
- the minimum possible eventual intermediate-assemblies mismatch after all remaining assignments;
- the boundary augmentation burden already fixed by the chosen augmentation mode;
- the minimum additional operator burden still forced, with unresolved pass-thru choices contributing zero unless non-identity is provably necessary;
- and the minimum remaining ambiguity/provenance penalty.

If that lower-bound branch score is already worse than the current incumbent exact candidate, the branch should be pruned.

This is the branch-and-bound bridge between search and scoring.

This means the limited reactant/intermediate/product assemblies and reactant-side/product-side operators geometry is not just a legality constraint.

It is also the basis of a useful score function:

- whether the reactant and product primitive budgets match exactly;
- whether the reactant-side-generated and product-side-required middle inventories meet exactly;
- how much structure had to be opened;
- how much structure had to be rebuilt;
- whether the branch stayed entirely within the admitted explicit assembly ontology;
- and how directly the product set was reached.

A solution family should inherit the score of its best canonical representative.

That means the emitted results can show:

- the best exact option first;
- alternate exact options next, in score order;
- and partial or non-closing options after that, also in score order with explicit diagnostics.

### Deterministic Tie-Break Rule

`pdgsolve` should freeze the deterministic tie-break key \(\tau(C)\) rather than leaving it implicit.

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

- canonical assembly order: lexicographic order of the canonical ids in \(\mathcal{A}_{\mathrm{v1}}\);
- reactant-occurrence order: normalized request order, with same-id duplicates numbered in first-seen order;
- product-occurrence order: normalized request order, with same-id duplicates numbered in first-seen order;
- reactant-side operator order: the sequence of operator assignments in reactant-occurrence order;
- product-side operator order: the sequence of operator assignments in product-occurrence order;
- and intermediate-assemblies order: assembly counts listed in canonical assembly order.

For `pdgsolve` v1, the operator symbol order inside \(\sigma_{2}\) and \(\sigma_{4}\) should be:

- `pass_thru`;
- then the remaining admitted law-family symbols in the fixed canonical order of the active law table.

The provenance signature \(\rho(C)\) should summarize, in canonical product-occurrence order:

- whether each product occurrence is pure pass-thru or active rewrite output;
- and any explicit ambiguity marker bits.

This means repeated runs over the same normalized problem must produce the same best-family representative even when the raw search explores equal-score branches in a different transient order.

### Diagnostic Codes

`pdgsolve` should freeze the stable diagnostic ids now so later implementation and test-case work does not guess at naming.

The v1 set should be:

| Diagnostic id | Phase | Meaning | Required payload |
| --- | --- | --- | --- |
| `pdgsolve.request.unsupported_assembly` | request | the request names an assembly outside `pdgsolve` v1 | requested token and attempted canonical id |
| `pdgsolve.request.unmappable_request` | request | the source request cannot be translated into explicit admitted Standard Model assemblies and therefore should not become a solver-native request | source id or raw token set, attempted role set, and translator note |
| `pdgsolve.request.invalid_boundary_role` | request | a solver-native assembly was requested in a boundary role where that assembly family is not admitted | assembly id, attempted role, and allowed roles |
| `pdgsolve.request.unsupported_boundary_augmentation` | request | the request policy asks for a boundary augmentation mode outside the admitted v1 Noether-pair augmentation set | requested augmentation token and allowed augmentation set |
| `pdgsolve.search.primitive_imbalance` | search | \(\delta(Q) \neq 0\) for the retained branch or retained request summary | request id and \((\delta_E, \delta_P)\) |
| `pdgsolve.search.middle_mismatch` | search | reactant-side-generated and product-side-required middle inventories do not close | request id and canonical mismatch vector |
| `pdgsolve.search.provenance_failure` | search | no complete provenance witness extends the retained branch | retained operator summary and failing witness clause |
| `pdgsolve.search.no_exact_closure` | search | the request is assembly-native, but no exact closure was found inside the admitted explicit assembly ontology | request id and retained closure-failure summary |
| `pdgsolve.search.non_exact_candidate_retained` | search | a partial or non-closing family was kept among the emitted retained partial solutions with explicit failure context | family id and retained failure mode |

### Core Regression Test-Case Set

Before `pdgsolve` implementation is considered trustworthy, the core regression denominator should be:

| Test-case id | Raw request | Key policy | Minimum expected outcome |
| --- | --- | --- | --- |
| `explicit_beta_request_exact_closure` | `2 pro_down_quark_I + pro_up_quark_I -> pro_down_quark_I + 2 pro_up_quark_I + pro_electron_I + anti_electron_neutrino_I` | default | at least one exact assembly-native family exists; no composite or non-native symbol is introduced |
| `primitive_imbalance_row_beta_source_to_target` | `2 pro_down_quark_I + pro_up_quark_I -> pro_down_quark_I + 2 pro_up_quark_I` | default | retained diagnostics include `pdgsolve.search.primitive_imbalance` with \((\delta_E, \delta_P) = (3, -3)\); no exact family exists |
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

- `pdgsolve`-owned solve policy.

#### Input Boundary Conditions

- accept explicit upstream request data only after successful higher-scale-to-assembly translation;
- if `pdgfeed` cannot translate a source request into explicit admitted Standard Model assemblies, classify that source request as un-mappable and do not emit a `pdgsolve` request for it;
- accept higher-scale composite terms only at the boundary adapter, never as solver-native request ids;
- allow wildcard-like boundary freedom only through explicit Noether-pair augmentation modes derived from policy, never through placeholder wildcard ids or composite boundary terms;
- keep solver-native request content assembly-native, with no presentation-only state;
- and treat downstream authored documents as downstream artifacts rather than invertible `pdgsolve` requests.

### Outputs

#### Search-Core And Solve Outputs

- `pdgsolve`-owned internal search results;
- ranked exact solution families;
- ranked retained partial solution families, capped at the top three;
- and developer-facing diagnostics about solve completeness, ambiguity, and non-closing families.

#### Solve Result Contract: `pdgsolve-result/v1`

- `schema: "pdgsolve-result/v1"`;
- `problemId`;
- `requestId`;
- `searchStatus`, with values `exact_available`, `partial_only`, or `no_exact_closure`;
- `bestFamilyId`, nullable only when no family is emitted;
- top-level `diagnostics`;
- `scoreOrder`, carrying the concrete comparison order for \(\kappa\);
- `exactFamilies`, containing every emitted exact solution family;
- and `partialFamilies`, containing only the top three emitted partial solution families.

Each member of `exactFamilies` and `partialFamilies` should contain:

- `familyId`;
- `kind`, with values `exact` or `partial`;
- `rank`;
- `score`, carrying the concrete components of \(\kappa\);
- `boundaryAugmentation`, carrying the chosen augmentation kind, side, pair count, and the added occurrence ids;
- `reactantAssemblies`, carrying the canonical reactant assemblies;
- `reactantSideOperators`, carrying the canonical reactant-side operator choices;
- `intermediateAssemblies`, carrying the canonical intermediate assemblies;
- `productSideOperators`, carrying the canonical product-side operator choices;
- `productAssemblies`, carrying the canonical product assemblies;
- `provenanceSummary`, carrying the family-level witness summary;
- `diagnostics`, carrying family-local diagnostics;
- `rawBranchCount`, the number of raw branches folded into the family;
- and `canonicalCandidate`, the fully specified representative candidate.

When `pdgsolve` emits more than one JSON artifact for a run, the preferred layout is:

- one `pdgsolve-result/v1` summary JSON carrying all exact families and the retained top three partial families;
- and optionally one per-family detailed JSON file for each emitted family.

#### Output Boundary Conditions

- own solve normalization, search, scoring, and output emission inside the explicit assembly-native ontology;
- emit exact and partial solution families in explicit admitted assemblies only;
- when Noether-pair augmentation is used, emit the added Noether cores as explicit assemblies plus an explicit boundary augmentation summary;
- include the scores for all emitted families;
- do not ask downstream tools to infer missing solve semantics;
- do not duplicate PDG normalization logic locally;
- and do not let launcher or presentation concerns become the source of solve semantics.

### Neighboring Components, Each with Related Priorities

- [pdgfeed](./pdgfeed.md) owns upstream PDG normalization and request emission.
- [pdgapps](pdgapps.md) owns the cross-boundary modularity rules that still apply where relevant.

## Priorities

### 1. Enforce The Assembly-Native Composite Boundary

Status: `active`

Current:

- higher-scale beta language still has enough historical weight in the surrounding workstream that it can leak into solver discussions as if it were native ontology;
- that creates risk that request ids, search symbols, or emitted family units drift away from explicit admitted assemblies and toward composite placeholders;
- and the document set still needs stronger regression and diagnostic framing around the rule that higher-scale reactant and product terms belong to boundary translation only.

Objective:

- keep every solver-native input, intermediate, operator law, search symbol, and emitted output expressed only in explicit admitted Standard Model assemblies;
- keep `pdgfeed` responsible for classifying source requests as un-mappable when translation into explicit Standard Model assemblies fails, while keeping malformed direct `pdgsolve` inputs explicit in diagnostics;
- keep solve-output contracts free of composite ids;
- make downstream grouping or naming clearly adapter-owned rather than solver-owned;
- and keep the regression set centered on proving that composites are expanded or collapsed only outside the solve core.

### 2. Freeze The Solve-Only Python Boundary

Status: `active`

Current:

- the target tool boundary is now one Python process;
- the intended implementation file is `scripts/pdg/pdgsolve.py`;
- and the document still needs the surrounding workstream to treat `pdgsolve` primarily as JSON-in, JSON-out solving machinery.

Objective:

- keep `pdgsolve` as a solve-only Python tool;
- keep intake, normalization, search, scoring, and output emission in that boundary;
- prefer explicit CLI and pipe-safe JSON workflows over hidden process state;
- and avoid reintroducing presentation-driven requirements into the solver definition.

### 3. Freeze The Solve Output Contract

Status: `active`

Current:

- the output boundary now needs to center on exact solution families, retained partial solution families, and explicit scores;
- the previous solve-state and downstream-oriented contracts carried more workflow detail than the solving boundary now needs;
- and the summary-versus-per-family emission layout should stay deterministic and simple.

Objective:

- keep `pdgsolve-result/v1` centered on solving output;
- emit all exact solution families;
- emit only the top three partial solution families;
- include stable scores and diagnostics for all emitted families;
- and keep canonical family identity and tie-break behavior frozen enough for regression tests.

### 4. Keep Solver Correctness On The Active Priority Queue

Status: `active`

Current:

- computed assembly-level result construction is now the center of gravity;
- the core boundary is intentionally stricter than some earlier beta-family drafts;
- and correctness now depends on disciplined law tables, pruning rules, provenance constraints, and deterministic family ranking.

Objective:

- keep correctness work focused on assembly legality, primitive conservation, provenance closure, and exact-versus-partial family ranking;
- expand regression coverage whenever the admitted assembly table or law table grows;
- and make it harder to land solver drift than to keep the boundary clean.

Active work queue:

1. Run corpus-level evaluation on the ready set.
   Track exact count, partial count, unsolved count, and the dominant blocking diagnostics so law-table work can be prioritized against the real `pdgfeed` corpus.
