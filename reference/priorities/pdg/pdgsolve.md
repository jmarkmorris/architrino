# pdgsolve App

## LLM Instructions

- Keep this document focused on pdgsolve as the solve/review app paired with [pdgedit](./pdgedit.md).
- Re-evaluate rules from first principles rather than preserving inherited UI artifacts, anchor conventions, or document structures by inertia.
- Keep `Design` about durable boundaries, solve-state concepts, and review/publication workflow ownership rather than temporary migration tactics.
- Keep `Priorities` ordered as the active work queue.
- Do not restate low-level PDG ingest internals or pdgedit tile-rendering internals except where pdgsolve depends on them.

## Purpose

pdgsolve is the dedicated solve-and-review app between upstream request sources and downstream pdgedit documents.

It owns:

- intake of explicit solve requests from upstream sources such as [pdgfeed](./pdgfeed.md), test cases, and direct developer input;
- normalization of those requests into a pdgsolve-owned solve problem expressed only in explicit admitted assemblies;
- combinatorial search over conservative solve candidates;
- review and acceptance of candidate solve outcomes;
- publication of accepted results into final `pdgedit/v1` documents;
- and the workflow state that connects upstream request choice to downstream pdgedit launch.

It does not own:

- PDG data access and normalization logic that belongs in [pdgfeed](./pdgfeed.md);
- pdgedit tile grammar, placement grammar, manifest consumption, or direct object editing that belong in [pdgedit](./pdgedit.md);
- observer-stage presentation/runtime behavior that belongs downstream of accepted pdgedit output;
- or downstream presentation/runtime behavior that belongs outside the solve/review boundary.

## Current State

- `pdgsolve.html` plus `src/apps/pdgsolve/main.js` now boot a dedicated solve-and-review runtime under `src/apps/pdgsolve/`.
- The runtime already separates request intake/bootstrap, request normalization, deterministic v1 solve search, candidate review, explicit acceptance, and accepted-record-to-pdgedit preview derivation instead of hiding that flow inside `app.js` or a shared root coordinator.
- The app already loads built-in corpus requests, `pdgfeed`-emitted requests, direct JSON requests, and reopened acceptance records, then derives ranked families and publication-ready accepted records against the versioned contracts.
- [pdgedit](./pdgedit.md) now defines the downstream authored-surface boundary clearly, and the accepted-record publication seam now emits final `pdgedit/v1` documents, durable manifest-entry updates, and in-memory launch payloads without pdgedit-side solver reconstruction.

## Design

### Foundational Stance

It should define its own reactant assemblies, reactant-side operators, intermediate assemblies, product-side operators, product assemblies, provenance/accounting model, request/result contracts, and review/publication workflow from first principles rather than inheriting accidental constraints from earlier surfaces or tooling splits.

Useful prior work may still inform:

- conserved-ledger semantics;
- operator family meaning;
- useful test cases;
- and examples of successful or failed closure families.

UI artifacts should not define pdgsolve's architecture.

### Runtime Process

The durable pdgsolve structure should separate:

- request intake;
- request normalization;
- solve-core search;
- candidate review;
- acceptance/publication;
- and downstream pdgedit launch or persistence.

Large coordinator files may assemble those pieces, but they should not become the long-term home of solver semantics.

### Composite And Higher-Scale Terms Are Out Of Scope.

Composite labels, higher-scale particle names, grouping interpretations, support tokens, residue labels, and similar terms are boundary-side language, not solver-native objects.

They do not enter pdgsolve as reactant assemblies, intermediate assemblies, product assemblies, operator inputs, operator outputs, or search symbols. If upstream language uses higher-scale terms, a boundary adapter must translate them into explicit admitted Standard Model assemblies before pdgsolve sees the request. If that translation cannot be completed, the source request is un-mappable and should remain upstream in `pdgfeed` rather than being emitted to pdgsolve. If downstream surfaces want higher-scale summaries, they may derive them only after pdgsolve has finished.

Post-solver grouping display may describe solved assemblies, but grouping metadata is not itself opened, gathered, dissociated, associated, or searched.

This is the controlling scope rule for the rest of the document.

### Core Ontology Boundary

pdgsolve core should be assembly-native and Standard-Model-assembly-only.

- every solver-native reactant assembly, intermediate assembly, and product assembly is one explicit $\mathbb{A}\mathbb{A}\mathbb{A}$ assembly corresponding to admitted Standard Model content;
- and once a request enters pdgsolve, the solver should operate only on explicit admitted assemblies until it hands the accepted result back to a boundary adapter.

For orientation, the visible pdgedit surface may be read as organized into `5` semantic stages:

- reactant assemblies;
- reactant-side operators;
- intermediate assemblies;
- product-side operators;
- product assemblies.

The strip uses a deliberately limited grammar:

- reactant-side operators: `Pass Thru` or `Dissociate`;
- product-side operators: `Pass Thru` or `Associate`.
- reactant assemblies, intermediate assemblies, and product assemblies contain assemblies only;
- reactant-side operators and product-side operators contain operators only;
- all normal solve progress moves from reactant side to product side through adjacent semantic stages only;
- and every solver-native assembly in those stages is one explicit admitted $\mathbb{A}\mathbb{A}\mathbb{A}$ assembly corresponding to Standard Model content.
- the solver does have a degree of freedom to add pro/anti Noether cores as pairs of reactant or product assemblies, although that pairing is not carried through the solving process – instead being techniques to add spacetime assemblies to enable solution closure.

In pdgsolve terminology, an **assembly** is one solver-native AAA assembly object that can participate in operator routing.

Inside pdgsolve, all routing, scoring, provenance, search symbols, and accepted output should use only individual assembly ids such as `pro_down_quark`, `pro_up_quark`, `electron`, and `electron_antineutrino`.

pdgsolve should treat this as a combinatorial state graph, not as screen geometry.

That means:

- position in this five-stage solve flow is semantic;
- assembly order may matter for deterministic identity and publication order;
- but solve legality must not depend on DOM layout, pixel coordinates, or render-time anchor inference.

### Operator Semantics

pdgsolve should keep the operator family deliberately small.

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

pdgsolve should model the nontrivial operators as finite law tables.

For dissociation, each operator-admissible assembly $a \in \mathcal{A}$ has a finite set

$$
\Delta(a) \subset \mathbb{N}^{\mathcal{A}},
$$

where each $d \in \Delta(a)$ is one legal dissociation output multiset for $a$.

For association, each operator-admissible assembly $a \in \mathcal{A}$ has a finite set

$$
\Gamma(a) \subset \mathbb{N}^{\mathcal{A}},
$$

where each $g \in \Gamma(a)$ is one legal gathered input multiset that can assemble into $a$.

`Pass Thru` is the identity law and therefore does not need a separate family table.

The important constraint is that $\Delta$ and $\Gamma$ are finite for a fixed solve family.

Every executable law should be local to one explicit assembly id. `Dissociate` rewrites one reactant assembly occurrence into an allowed output multiset of intermediate assemblies. `Associate` closes an allowed gathered input multiset of intermediate assemblies into one product assembly.

### First Test Case: Assembly-Level Beta Boundary

The familiar beta-decay channel is the first boundary example precisely because multiple descriptive scales may appear around the same event.

Applied to beta-decay, the same rule means the pdgsolve-core expression must be written only in explicit assemblies already present in the active assembly alphabet, for example:

- reactant assemblies: `pro_down_quark + pro_up_quark + pro_down_quark`;
- product assemblies: `pro_up_quark + pro_down_quark + pro_up_quark + electron + electron_antineutrino`.

From that point forward:

- the core search may use only explicit assembly ids from $\mathcal{A}$;
- and requests that arrive with higher-scale reactant or product terms are handled by the boundary rule stated above.

Candidate quality should be judged on assembly-native legality, conservation, provenance clarity, and deterministic ranking.

So the design rule is:  the solver core reasons only over explicit admitted assemblies and explicit admitted operators;

### Request Intake

pdgsolve should accept only explicit request-side data and pdgsolve-owned reopen references.

The concrete source inventory and request-contract field lists are collected under `Interfaces -> Inputs` near the end of this document.

pdgsolve should consume explicit request data rather than hidden app-local state.

pdgsolve should define one pdgsolve-owned solve problem model that is solver-native rather than UI-native.

That solve problem model should describe reactant assemblies, product assemblies, the admitted intermediate-assembly alphabet, the permitted operator grammar, policy or theory gates, and provenance/accounting requirements.

That solve problem model must contain only explicit admitted assemblies.

Mathematically, pdgsolve should describe one solve instance as

$$
Q = (\mathcal{A}, \mathcal{P}, \mu, R, T, \Delta, \Gamma, \Pi),
$$

where:

- $\mathcal{A}$ is the finite assembly alphabet of explicit admitted $\mathbb{A}\mathbb{A}\mathbb{A}$ assemblies for the active solve family;
- $\mathcal{P}$ is the basis of conserved primitive content;
- $\mu : \mathcal{A} \to \mathbb{N}^{\mathcal{P}}$ is the conserved-content map;
- $R, T \in \mathbb{N}^{\mathcal{A}}$ are the requested reactant and product multisets;
- $\Delta$ and $\Gamma$ are the dissociation and association law tables;
- and $\Pi$ is the active policy bundle.

By the time $R$ and $T$ exist, any higher-scale upstream description has already been translated into explicit assembly multisets or marked un-mappable at the boundary.

For pdgsolve v1, the explicit conserved basis should be

$$
\mathcal{P}_{0} = \{\mathrm{Electrino}, \mathrm{Positrino}\}.
$$

That means the first concrete interpretation of $\mu$ is:

- $\mu(a)_{\mathrm{Electrino}}$ = the number of Electrinos carried by assembly $a$;
- $\mu(a)_{\mathrm{Positrino}}$ = the number of Positrinos carried by assembly $a$.

The conserved-content map should extend linearly from assemblies to multisets:

$$
\mu(x) = \sum_{a \in \mathcal{A}} x(a)\,\mu(a), \qquad x \in \mathbb{N}^{\mathcal{A}}.
$$

Every legal operator law should preserve this ledger.

That means:

- if $d \in \Delta(a)$, then $\mu(d) = \mu(a)$;
- if $g \in \Gamma(a)$, then $\mu(g) = \mu(a)$;
- and `Pass Thru` preserves $\mu$ trivially.

For shorthand, pdgsolve should define the primitive counts

$$
N_{E}(x) = \mu(x)_{\mathrm{Electrino}}, \qquad N_{P}(x) = \mu(x)_{\mathrm{Positrino}}.
$$

These are the first conserved sums that must match across the solve.

### Assembly Table

pdgsolve should use the full admitted Standard Model assembly alphabet for mapped PDG requests.

For pdgsolve, denote that alphabet by

$$
\mathcal{A}_{\mathrm{v1}}
$$

where $\mathcal{A}_{\mathrm{v1}}$ is the complete canonical assembly table shared by `pdgfeed` translation and pdgsolve normalization.

The assembly table should list the full Standard Model inventory:

| Assembly family | Admitted Standard Model assemblies | Allowed stages in pdgsolve | note |
| --- | --- | --- | --- |
| charged leptons | electron, muon, tau, and their antiparticle variants | reactant assemblies, intermediate assemblies, and product assemblies | separate matter and antimatter assemblies remain explicit ids |
| neutrinos | electron neutrino, muon neutrino, tau neutrino, and their antineutrino variants | reactant assemblies, intermediate assemblies, and product assemblies | neutrino and antineutrino assemblies remain explicit ids |
| up-type quarks | up, charm, top, and their antiquark variants | reactant assemblies, intermediate assemblies, and product assemblies | quark and antiquark assemblies remain explicit ids |
| down-type quarks | down, strange, bottom, and their antiquark variants | reactant assemblies, intermediate assemblies, and product assemblies | quark and antiquark assemblies remain explicit ids |
| Noether cores | pro and anti variants | reactant assemblies, intermediate assemblies, and product assemblies | |
The concrete conserved-content rows for every admitted assembly in that table should be written here rather than deferred to a later phase. The running beta-boundary bookkeeping values already used elsewhere in this document include:

- $\mu(\mathrm{pro\_down\_quark}) = (7, 5)$;
- $\mu(\mathrm{pro\_up\_quark}) = (4, 8)$;
- $\mu(\mathrm{electron}) = (9, 3)$;
- and $\mu(\mathrm{electron\_antineutrino}) = (6, 6)$.

pdgsolve should treat equality of $\mu$ as necessary for conservation, not as permission to identify assemblies.

### Rule Table

pdgsolve should use the full admitted assembly-native law tables needed to close PDG-mappable requests.

A specific assembly may still have an empty dissociation or association set when no legal dissociation or association exists for that assembly. Empty tables are not the intended global default.

`Pass Thru` remains the identity case inside those law tables, but it is not the only solver behavior the document is targeting.


### Normalization Rules

pdgsolve should normalize every upstream request into one explicit `pdgsolve-problem/v1` record before search begins.

The concrete field inventories for `pdgsolve-request/v1` and `pdgsolve-problem/v1` are collected under `Interfaces -> Inputs` near the end of this document.

Normalization assumes those occurrence lists already contain explicit assemblies rather than higher-scale boundary terms. If `pdgfeed` cannot translate a source request into explicit Standard Model assemblies, it should classify that source request as un-mappable and should not emit a pdgsolve request for it.

Normalization should then do the following, in order:

1. receive only assembly ids from the upstream boundary adapter, such as `pro_down_quark`, `pro_up_quark`, `electron`, and `electron_antineutrino`;
2. preserve the resulting occurrence order so the search can assign stable occurrence indices later;
3. reject any assembly outside $\mathcal{A}_{\mathrm{v1}}$ with `pdgsolve.request.unsupported_assembly`;
4. freeze the active primitive basis as $\mathcal{P}_{0}$ and the executable law table as `pdgsolve-laws/v1-standard-model`;
5. build the requested multisets $R$ and $T$;
6. emit one solver-native problem record whose content is fully sufficient for search without any DOM or renderer lookup.

### Conserved Balance Equations

pdgsolve should make the balance laws explicit across reactant assemblies, intermediate assemblies, and product assemblies.

Because architrinos have provenance in $\mathbb{A}\mathbb{A}\mathbb{A}$, the correct solve picture is not a disappearing flow ledger.

It is one fixed primitive carrier set viewed through three different assembly partitions.

Define the explicit reactant assemblies and explicit product assemblies

$$
x_{1} = R, \qquad x_{5} = T.
$$

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

The primitive invariants across these assembly partitions are therefore

$$
\mu(x_{1}) = \mu(x_{3}) = \mu(x_{5}).
$$

In particular, pdgsolve must preserve the Electrino and Positrino counts separately:

$$
N_{E}(x_{1}) = N_{E}(x_{3}) = N_{E}(x_{5}),
$$

$$
N_{P}(x_{1}) = N_{P}(x_{3}) = N_{P}(x_{5}).
$$

So the reaction does not merely conserve totals in the aggregate.

It preserves one underlying architrino population whose grouping changes across reactant assemblies, intermediate assemblies, and product assemblies.

If a request fails these equalities at the boundary, pdgsolve should not silently repair that mismatch.

Instead, it should report the primitive imbalance vector

$$
\delta(Q) = \mu(x_{1}) - \mu(x_{5}) \in \mathbb{Z}^{\mathcal{P}_{0}},
$$

with the concrete components

$$
\delta_{E} = N_{E}(x_{1}) - N_{E}(x_{5}), \qquad
\delta_{P} = N_{P}(x_{1}) - N_{P}(x_{5}).
$$

If $\delta(Q) \neq 0$, then exact closure is impossible for that request under the active assembly-native law table.

So at the first primitive level, pdgsolve should always be able to say:

- Electrinos balanced or imbalanced by $\delta_{E}$;
- Positrinos balanced or imbalanced by $\delta_{P}$;
- and whether the explicit admitted assembly request can possibly close without leaving the assembly-native ontology.

### Combinatorial Search Model

pdgsolve should treat solving as an explicit combinatorial search problem.

The search design should specify:

- what one branch-state record contains;
- what counts as one candidate expansion;
- how operators such as `Pass Thru`, `Dissociate`, and `Associate` expand the state;
- how conservation and provenance prune illegal branches;
- how mismatch, ambiguity, and no-exact-closure cases are represented explicitly;
- and how deterministic ranking chooses one accepted candidate over other legal candidates.

The search model should remain planner-first rather than surface-first.

Related search material elsewhere in the observer workstream remains useful neighboring groundwork, but it is not a finished pdgsolve spec.

This limited geometry should be exploited aggressively.

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

For the reactant-side operators, pdgsolve should define the one-assembly reactant rewrite family only on $\mathcal{A}_{\mathrm{mid}}$:

$$
\Lambda_{2}(a) = \{e_{a}\} \cup \Delta(a), \qquad a \in \mathcal{A}_{\mathrm{mid}},
$$

where $e_{a}$ represents `Pass Thru` and each $d \in \Delta(a)$ represents one legal `Dissociate` output.

For the product-side operators, pdgsolve should define the one-assembly product-closure family only on $\mathcal{A}_{\mathrm{mid}}$:

$$
\Lambda_{4}(a) = \{e_{a}\} \cup \Gamma(a), \qquad a \in \mathcal{A}_{\mathrm{mid}},
$$

where $e_{a}$ represents `Pass Thru` and each $g \in \Gamma(a)$ represents one legal intermediate-assemblies input multiset that can `Associate` into $a$.

Given full reactant assemblies $x_{1}$, the reactant-side-generated intermediate family from one-assembly choices is

$$
\mathfrak{M}_{\mathrm{reactant}}(x_{1}) =
\left\{
\sum_{a \in \mathcal{A}_{\mathrm{mid}}} \sum_{i=1}^{x_{1}(a)} y_{a,i}
\;\middle|\;
y_{a,i} \in \Lambda_{2}(a)
\right\}.
$$

Given full product assemblies $x_{5}$, the product-side-required intermediate family from one-assembly choices is

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

together with a provenance witness showing that the chosen reactant-side and product-side rewrite families act on the same fixed primitive carrier set $\Omega$.

One useful branch-state record is

$$
s = (\phi_{2}, \phi_{4}, x_{3}^{\mathrm{reactant}}, x_{3}^{\mathrm{product}}, W),
$$

where:

- $\phi_{2}$ is a partial assignment of reactant-side operator choices to reactant assembly occurrences;
- $\phi_{4}$ is a partial assignment of product-side operator choices to product assembly occurrences;
- $x_{3}^{\mathrm{reactant}}$ is the partial intermediate assemblies generated from the reactant assemblies;
- $x_{3}^{\mathrm{product}}$ is the partial intermediate assemblies required by the product assemblies;
- and $W$ is the current partial provenance witness.

pdgsolve should execute this search as a bounded meet-in-the-middle enumeration.

The operational loop should be:

1. reject the request immediately if the primitive imbalance vector $\delta(Q)$ is nonzero and the current search mode requires exact closure;
2. initialize the empty branch state with no reactant-side or product-side operator assignments;
3. choose the next unassigned reactant or product assembly occurrence, preferring the side with fewer legal local rewrites or tighter intermediate-assemblies constraints;
4. expand that occurrence by one member of $\Lambda_{2}(a)$ or $\Lambda_{4}(a)$;
5. update the partial middle inventories $x_{3}^{\mathrm{reactant}}$ and $x_{3}^{\mathrm{product}}$, and update the partial provenance witness $W$;
6. prune the branch if the remaining unassigned occurrences can no longer close the middle or provenance constraints;
7. continue until all reactant and product occurrences are assigned;
8. emit a terminal candidate when the completed branch has a complete provenance witness and a scored intermediate-assemblies outcome.

So the search does not guess full reactions in one jump.

It builds them one local operator choice at a time.

Each branch decision is therefore one small legal rewrite choice, and each completed branch is one fully specified candidate solve.

### Pruning Rules

pdgsolve should prune partial branches aggressively.

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
  the partial provenance witness $W$ can no longer be extended to a full carrier partition consistent with the chosen dissociate/associate laws;
- dominance:
  another branch with the same unresolved occurrence set is already no worse on middle mismatch, operator count, dissociation count, and provenance penalty;
- bound failure:
  the optimistic lower-bound score for the partial branch is already worse than the current best exact candidate or worse than the review threshold for retained alternates.

These pruning rules are what make the search practical.

The raw Cartesian product of all local rewrite choices may still be large, but most branches should die early because they cannot possibly meet in the middle or preserve provenance.

### Pass-Thru Safety

`Pass Thru` must be treated as a live fallback option until a specific assembly occurrence has actually been assigned a different rewrite.

So pdgsolve should not prune a branch merely because:

- a reactant assembly has not yet been dissociated;
- a product assembly has not yet been associated;
- or the current partial branch looks non-minimal if unresolved occurrences were later allowed to pass straight through.

Safe pruning therefore requires bounds that still include pass-thru.

For a partial branch $s$, let $U_{2}(s)$ be the unresolved reactant occurrences and $U_{4}(s)$ the unresolved product occurrences.

For each intermediate-assemblies coordinate $m \in \mathcal{A}$, define the pass-thru-safe envelopes

$$
M^{-}_{\mathrm{reactant},s}(m)
=
x_{3}^{\mathrm{reactant}}(m)

+ \sum_{\rho \in U_{2}(s)}
\min_{y \in \Lambda_{2}(a_{\rho})} y(m),
$$

$$
M^{+}_{\mathrm{reactant},s}(m)
=
x_{3}^{\mathrm{reactant}}(m)

+ \sum_{\rho \in U_{2}(s)}
\max_{y \in \Lambda_{2}(a_{\rho})} y(m),
$$

$$
M^{-}_{\mathrm{product},s}(m)
=
x_{3}^{\mathrm{product}}(m)

+ \sum_{\pi \in U_{4}(s)}
\min_{z \in \Lambda_{4}(a_{\pi})} z(m),
$$

$$
M^{+}_{\mathrm{product},s}(m)
=
x_{3}^{\mathrm{product}}(m)

+ \sum_{\pi \in U_{4}(s)}
\max_{z \in \Lambda_{4}(a_{\pi})} z(m).
$$

Here $a_{\rho}$ and $a_{\pi}$ are the assemblies attached to those unresolved occurrences.

For every unresolved occurrence whose assembly lies in $\mathcal{A}_{\mathrm{mid}}$, the corresponding family still contains the identity element $e_{a}$.

So these envelopes automatically include the pass-thru possibility for every unresolved occurrence that is actually eligible for pass-thru.

So an intermediate-assemblies prune is safe only if one of the coordinatewise intervals is already disjoint:

$$
M^{-}_{\mathrm{reactant},s}(m) > M^{+}_{\mathrm{product},s}(m)
\quad\text{or}\quad
M^{-}_{\mathrm{product},s}(m) > M^{+}_{\mathrm{reactant},s}(m)
$$

for some $m \in \mathcal{A}$.

In plain language:

- if the reactant side is already guaranteed to overproduce some middle assembly even after giving the product side every remaining legal chance to absorb it, prune;
- if the product side is already guaranteed to demand some middle assembly that the reactant side can no longer produce even after giving the reactant side every remaining legal chance, prune;
- otherwise keep the branch alive, because pass-thru may still rescue it.

The same conservatism should apply to operator-count bounds.

For unresolved occurrences that are eligible for pass-thru, the lower-bound future operator burden should treat pass-thru as zero additional non-identity cost unless a non-identity rewrite is provably forced.

### How Rules Produce Options

The rules lead to options in a direct way.

A raw option is one complete assignment

$$
O_{\mathrm{raw}} = (\phi_{2}, \phi_{4}).
$$

From that raw option, pdgsolve derives:

- the reactant-side-generated intermediate assemblies $x_{3}^{\mathrm{reactant}}$;
- the product-side-required intermediate assemblies $x_{3}^{\mathrm{product}}$;
- the completed provenance witness $W$, if one exists;
- and the candidate score tuple $\kappa$.

A raw option becomes an exact review candidate when:

- $x_{3}^{\mathrm{reactant}} = x_{3}^{\mathrm{product}}$;
- the primitive imbalance is zero;
- and $W$ closes as a complete provenance witness.

A raw option becomes a partial review candidate when:

- the branch is complete;
- but middle closure, primitive balance, or provenance closure still fails in an explicit diagnosable way.

Multiple raw options may canonicalize to the same review option family.

That should happen when they publish the same reactant assemblies, intermediate assemblies, and product assemblies, the same reactant-side and product-side operator choices, and the same effective provenance/accounting summary.

So the review surface should not show every raw branch separately.

It should show ranked option families, each with:

- one canonical representative candidate;
- its score tuple;
- a summary of why it ranks where it does;
- and the count or description of equivalent raw branches folded into that family.

This yields a finite branch graph for any finite request.

The key reason is:

- each reactant occurrence that can feed intermediate assemblies contributes one finite choice from $\Lambda_{2}(a)$;
- each product occurrence that can be matched from intermediate assemblies contributes one finite choice from $\Lambda_{4}(a)$;
- $\mathfrak{M}_{\mathrm{reactant}}(x_{1})$ and $\mathfrak{M}_{\mathrm{product}}(x_{5})$ are therefore finite;
- and provenance matching is performed over a finite primitive carrier set.

So yes, this limited geometry is not merely drawable. It is mathematically enumerable.

### Solve Output Model

pdgsolve should return one pdgsolve-owned internal search result model from the search core.

That internal model should be solver-shaped rather than review-workflow-shaped.

It should be rich enough to carry:

- the selected candidate graph;
- any alternate candidate families worth surfacing;
- diagnostics and no-exact-closure notes;
- explicit provenance/accounting summaries;
- and the information needed to materialize downstream surface documents without making those downstream apps reconstruct omitted semantics.

pdgsolve should not reuse the external `pdgsolve-result/v1` document as the native in-memory search-core structure.

Instead:

- the search core should return its own internal result model;
- the review layer should hold review workflow state such as selected family, accepted family, accepted record, and stale/published status;
- the publication layer should hold downstream publication state;
- and the app boundary should assemble `pdgsolve-result/v1` from those pieces.

This means:

- the search core does not own `review.state`, `acceptedFamilyId`, or `publication`;
- `pdgsolve-result/v1` is the external review/result contract, not the internal solver contract;
- the internal search result may be serialized if another boundary genuinely needs it;
- but pdgsolve should not force that internal model to become a public versioned JSON contract prematurely.

For accepted outcomes, pdgsolve should also be able to materialize one compact accepted-solution description that is:

- surface-agnostic rather than pdgedit-specific;
- explicit about requested assemblies, accepted operators, accepted inventories, provenance, and diagnostics;
- capable of describing unknown or newly introduced spacetime reactants or products when the accepted solve needs them;
- small enough to be useful to downstream tools other than pdgedit;
- and free of tile payloads, screen coordinates, manifest entries, or renderer-specific layout rules.

That compact accepted-solution description is the right candidate for any shared or standardized downstream solve boundary.

### Option Family Identity

pdgsolve review should surface option families rather than raw branches.

For completed raw options

$$
O_{\mathrm{raw}} = (\phi_{2}, \phi_{4}, W),
$$

two branches should belong to the same option family exactly when they agree on the full review-visible solve summary:

- the same reactant assemblies, intermediate assemblies, and product assemblies;
- the same ordered reactant-side operator assignments after canonical reactant-occurrence ordering;
- the same ordered product-side operator assignments after canonical product-occurrence ordering;
- the same score tuple $\kappa$;
- the same review-visible provenance summary;
- and the same diagnostic id set.

Two completed raw branches should not split into different option families merely because they:

- rename primitive carriers inside the witness;
- permute indistinguishable assembly occurrences with the same canonical occurrence index class;
- or differ only in low-level witness detail that leaves the published assembly inventories, operator choices, diagnostics, and provenance summary unchanged.

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

where $\sigma_{2}$ and $\sigma_{4}$ are the canonical ordered operator signatures and $\rho$ is the canonical review-visible provenance summary.

Differing provenance-witness detail should create a different option family only when it changes $\rho$.

So:

- witness detail that changes which assembly occurrence is the active rewrite source, spectator source, or ambiguous source does change family identity;
- but witness detail that only renames equivalent primitive carriers does not.

The canonical representative of an option family should be the member with minimal deterministic tie-break key $\tau$ inside that family.

### pdgsolve Result Contract

pdgsolve should define one external review/result contract named `pdgsolve-result/v1`.

That contract should be assembled from:

- the current internal pdgsolve search result;
- the current review-state record;
- and the current publication-state record.

The concrete field inventory for `pdgsolve-result/v1` and its `optionFamilies` members is collected under `Interfaces -> Outputs` near the end of this document.

So acceptance and publication are not the same state transition.

Acceptance should populate `review.acceptedRecord`.

Publication should populate `publication`.

### Candidate Scoring

pdgsolve should score candidates explicitly rather than relying on ad hoc success/failure buckets alone.

The score model should prefer, in order:

- exact conservation and exact product closure;
- zero primitive imbalance and zero intermediate-assemblies mismatch;
- fewer non-identity operators;
- fewer dissociations when a less disruptive exact path exists;
- stronger provenance clarity;
- and stable deterministic tie-breaks over otherwise equal candidates.

pdgsolve should formalize that ranking as a lexicographic minimization problem.

For a terminal candidate

$$
C = (\phi_{2,C}, \phi_{4,C}, x_{3,C}^{\mathrm{reactant}}, x_{3,C}^{\mathrm{product}}, W_{C}),
$$

define

$$
\kappa(C) =
\bigl(
\epsilon(C),
m_{\mathrm{prim}}(C),
m_{\mathrm{mid}}(C),
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
- $n_{\mathrm{op}}(C)$ is the total non-identity operator count in $\phi_{2,C}$ and $\phi_{4,C}$;
- $n_{\mathrm{diss}}(C)$ is the dissociation count in $\phi_{2,C}$;
- $n_{\mathrm{amb}}(C)$ is the explicit ambiguity/provenance penalty count;
- and $\tau(C)$ is a deterministic tie-break key.

Candidate comparison should be strictly lexicographic.

That means:

1. every exact candidate beats every non-exact candidate;
2. among exact candidates, lower primitive imbalance wins first;
3. then lower intermediate-assemblies mismatch wins;
4. then fewer non-identity operators wins;
5. then fewer dissociations wins;
6. then lower ambiguity/provenance penalty wins;
7. and finally $\tau(C)$ breaks any remaining tie deterministically.

pdgsolve should score partial branches too, using an optimistic lower-bound score derived from the same tuple structure.

For a partial branch $s$, the search should compute:

- whether exact closure is still possible;
- the unavoidable primitive imbalance already fixed by the explicit request;
- the minimum possible eventual intermediate-assemblies mismatch after all remaining assignments;
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
- and how directly the accepted product set was reached.

An option family should inherit the score of its best canonical representative.

That means the review surface can show:

- the best option first;
- alternate exact options next, in score order;
- and partial or non-closing options after that, also in score order with explicit diagnostics.

### Deterministic Tie-Break Rule

pdgsolve should freeze the deterministic tie-break key $\tau(C)$ rather than leaving it implicit.

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

For pdgsolve v1, the operator symbol order inside $\sigma_{2}$ and $\sigma_{4}$ should be:

- `pass_thru`;
- then the remaining admitted law-family symbols in the fixed canonical order of the active law table.

The provenance signature $\rho(C)$ should summarize, in canonical product-occurrence order:

- whether each product occurrence is pure pass-thru or active rewrite output;
- and any explicit ambiguity marker bits.

This means repeated runs over the same normalized problem must produce the same best-family representative even when the raw search explores equal-score branches in a different transient order.

### Diagnostic Codes

pdgsolve should freeze the stable diagnostic ids now so later UI and test-case work does not guess at naming.

The v1 set should be:

| Diagnostic id | Phase | Meaning | Required payload |
| --- | --- | --- | --- |
| `pdgsolve.request.unsupported_assembly` | request | the request names an assembly outside pdgsolve v1 | requested token and attempted canonical id |
| `pdgsolve.request.unmappable_request` | request | the source request cannot be translated into explicit admitted Standard Model assemblies and therefore should not become a solver-native request | source id or raw token set, attempted role set, and translator note |
| `pdgsolve.request.invalid_boundary_role` | request | a solver-native assembly was requested in a boundary role where that assembly family is not admitted | assembly id, attempted role, and allowed roles |
| `pdgsolve.search.primitive_imbalance` | search | $\delta(Q) \neq 0$ for the retained branch or retained request summary | request id and $(\delta_E, \delta_P)$ |
| `pdgsolve.search.middle_mismatch` | search | reactant-side-generated and product-side-required middle inventories do not close | request id and canonical mismatch vector |
| `pdgsolve.search.provenance_failure` | search | no complete provenance witness extends the retained branch | retained operator summary and failing witness clause |
| `pdgsolve.search.no_exact_closure` | search | the request is assembly-native, but no exact closure was found inside the admitted explicit assembly ontology | request id and retained closure-failure summary |
| `pdgsolve.search.non_exact_candidate_retained` | search | a partial or non-closing family was kept for review with explicit failure context | family id and retained failure mode |
| `pdgsolve.review.missing_pdgedit_publication_recipe` | review | the accepted family cannot yet be translated because one locked solve-graph unit has no admitted pdgedit publication recipe | family id and missing recipe id or unit id |
| `pdgsolve.review.not_publication_ready` | review | a family may be visible in review but is not publishable | family id and blocking reason |

### Review And Acceptance

pdgsolve should own the review boundary between solve-core output and pdgedit publication.

That means:

- pdgsolve may show candidate alternatives, ambiguity, and non-closing families;
- pdgsolve should allow acceptance of one explicit publication candidate;
- pdgsolve should keep acceptance separate from mere solve completion;
- and only accepted pdgsolve state should become publishable downstream pdgedit data.

pdgsolve should not require pdgedit to host solver review semantics.

### Review Workflow State

pdgsolve should keep one explicit review-state machine for each current `pdgsolve-result/v1` snapshot.

That review object should have

- `schema: "pdgsolve-review-state/v1"`;
- `state`;
- `selectedFamilyId`, nullable;
- `acceptedFamilyId`, nullable;
- `acceptedRecord`, nullable;
- and `blockingDiagnostics`, carrying any review-time blockers that are not already family-local.

The review states should be:

- `stale`:
  the current solve result is no longer trusted for acceptance because the normalized problem, policy bundle, law-table id, or canonical family representatives have changed;
- `review_ready`:
  the current solve result is fresh and ranked, and the operator may inspect or accept eligible families;
- `accepted`:
  one explicit family has been locked as the accepted candidate for this exact result snapshot;
- and `published`:
  the accepted record has already been dispatched downstream, either durably or as an in-memory launch payload.

The required transitions should be:

1. `stale -> review_ready` when search completes for the current normalized problem and produces the current ranked family set;
2. `review_ready -> accepted` only by explicit operator acceptance of one publication-ready family;
3. `accepted -> published` only by explicit publish or launch action over the locked accepted record;
4. `accepted -> review_ready` or `published -> review_ready` by explicit reopen action;
5. and any state -> `stale` whenever the normalized problem, policy bundle, law-table id, family key set, canonical representative, or score ordering changes.

When the state becomes `stale`, pdgsolve should clear `acceptedFamilyId`, `acceptedRecord`, and any downstream `publication` object derived from them.

So pdgsolve must never quietly carry an old acceptance across a changed solve.

### Review Actions

pdgsolve should expose a small operator-facing review action set.

The core actions should be:

- `select_family(familyId)`:
  mark one visible family as the current inspection target without changing acceptance state;
- `accept_family(familyId)`:
  attempt to lock that family as the sole accepted candidate for the current result snapshot;
- `reopen_acceptance(reason)`:
  clear the current accepted lock and return to `review_ready`;
- `publish_accepted(mode)`:
  send the locked accepted record into the downstream publication path, where `mode` is either durable publish or in-memory launch;
- and `reject_all_for_now(note)`:
  leave the state in `review_ready` with no accepted family while preserving the reviewed result set and any operator note.

pdgsolve should allow at most one accepted family at a time.

Accepting one family must therefore replace any earlier accepted family for that same result snapshot.

### Publication-Readiness Gates

pdgsolve should define `publicationReady` as an explicit derived gate, not as a vague UI hint.

For pdgsolve v1, an option family $F$ is publication-ready if and only if:

- `kind(F) = exact`;
- the current result snapshot is not `stale`;
- the family's canonical representative has $\epsilon(F) = 0$;
- the family's primitive imbalance is zero;
- the family's middle mismatch is zero;
- the family's provenance witness is complete at the review-summary level;
- every assembly and operator unit in the family's canonical accepted-candidate graph, meaning the graph that would become `acceptedRecord.lockedSolveGraph` upon acceptance, has one admitted pdgedit publication recipe;
- the family has no blocking diagnostic among:
  `pdgsolve.request.unsupported_assembly`,
  `pdgsolve.request.unmappable_request`,
  `pdgsolve.request.invalid_boundary_role`,
  `pdgsolve.search.primitive_imbalance`,
  `pdgsolve.search.middle_mismatch`,
  `pdgsolve.search.provenance_failure`,
  `pdgsolve.search.no_exact_closure`,
  `pdgsolve.review.missing_pdgedit_publication_recipe`,
  or any later diagnostic explicitly marked `blocking`;
- and the family already carries the locked assembly inventories, operator assignments, provenance summary, and accepted-solve graph needed for downstream translation without re-running search.

If any of those clauses fails, pdgsolve should set `publicationReady = false`.

In that case:

- the family may still appear in review;
- the operator may still inspect its diagnostics and provenance summary;
- but `accept_family` must fail with `pdgsolve.review.not_publication_ready`.

### Accepted Record

Acceptance should lock one pdgsolve-owned record before any pdgedit translation happens.

The concrete field inventory for `pdgsolve-acceptance/v1` is collected under `Interfaces -> Outputs` near the end of this document.

The accepted record should not contain the full raw-branch search tree.

It should contain exactly the information that must remain invariant once the operator says, "this is the candidate we mean."

So the accepted record is the review-side lock point.

The downstream publication step should read only from that lock record, not from a fresh search rerun and not from pdgedit-side heuristics.

### Translation Boundary To pdgedit

pdgsolve should not treat `pdgedit/v1` as its primary downstream meaning.

The preferred downstream order is:

1. pdgsolve accepts one solve family;
2. pdgsolve materializes one compact accepted-solution description;
3. a downstream adapter targets one concrete consumer such as `pdgedit/v1`;
4. that adapter materializes the consumer-specific document;
5. and the target app reads only its own final document contract.

For pdgedit specifically, the translation into `pdgedit/v1` should happen before pdgedit reads the result.

That translation layer should own:

- mapping accepted solver-side meaning into explicit pdgedit-side objects;
- collapsing explicit accepted assemblies into any target-specific higher-scale descriptions only when the target explicitly calls for that translation;
- applying pdgedit-owned materialization rules for assemblies, operators, links, and any admitted grouping effects;
- and producing one final `pdgedit/v1` document before pdgedit reads the result.

pdgsolve should therefore treat `pdgedit/v1` as one downstream publication target, not as the native expression of solver output.

### Canonical Publication Pipeline

pdgsolve should support exactly one downstream publication pipeline:

1. start from one `pdgsolve-acceptance/v1` lock record;
2. validate that the lock record is still fresh and publication-ready;
3. materialize one compact accepted-solution description from the accepted record;
4. translate that accepted-solution description into one final target document such as `pdgedit/v1` when a downstream target is requested;
5. validate that target document against the target app's boundary rules;
6. either publish the target document durably with any needed catalog entry or launch the target app with that exact in-memory document;
7. and record the publication outcome back into the pdgsolve-side `publication` object.

No other route should be supported.

In particular:

- pdgsolve should not publish straight from a raw branch;
- pdgsolve should not publish straight from a non-accepted option family;
- pdgsolve should not ask downstream apps to infer missing assemblies, tiles, links, labels, or other surface objects from solver-native data;
- and pdgsolve should not rerun search during publication.

### Accepted Solution Graph Contract

For publishable v1 families, the accepted-solution graph should use `schema: "pdgsolve-publication-graph/v1"` or a successor compact accepted-solution graph schema.

The concrete unit and edge field inventory for that graph contract is collected under `Interfaces -> Outputs` near the end of this document.

So the accepted solution graph is still pdgsolve-owned, and it should be explicit about:

- which accepted units exist;
- how those accepted units connect;
- and any provenance/accounting facts needed by downstream adapters.

During the current transition, an accepted graph may still carry adapter-facing fields such as `recipeId` so the existing pdgedit translator can stay deterministic. Those fields should be treated as downstream adapter metadata rather than as the core solver meaning.

### Downstream Adapter Responsibilities

Any downstream adapter that targets a concrete surface or document family should own:

- the mapping from accepted solver units into target-specific object types;
- target-specific display payload selection;
- target-specific placement and link endpoint rules;
- and any catalog or manifest integration required by that target.

Those are downstream document and surface concerns. They should not define pdgsolve's primary output contract.

### Current pdgedit Package Contract

The compact accepted-solution description should remain the preferred solver-owned downstream meaning.

However, the current pdgedit publication path already has one explicit package contract, and that contract should remain documented here because it is a boundary artifact rather than a surface-layout rule.

For the current pdgedit adapter, the translation output is one package named `pdgsolve-pdgedit-package/v1`.

The concrete field inventory for `pdgsolve-pdgedit-package/v1` and its durable `manifestEntry` payload is collected under `Interfaces -> Outputs` near the end of this document.

This package is current implementation boundary, not the long-term solver-owned semantic ideal.

In other words:

- the compact accepted-solution description is the preferred stable solver output;
- `pdgsolve-pdgedit-package/v1` is the current adapter/package boundary for the pdgedit target;
- and target-specific package contracts may later be refactored once the solver/output rewrite is ready.

### Durable Publish And Launch

pdgsolve should support two downstream actions over the same accepted-solution description.

For `publish_accepted("durable")`, pdgsolve should:

- generate the compact accepted-solution description;
- invoke the requested downstream adapter;
- write the adapter's final target document to the durable asset path selected by the publication runtime;
- write or update any matching downstream catalog entry required by that target;
- and then set the pdgsolve review state to `published`.

For `publish_accepted("launch")`, pdgsolve should:

- generate the same accepted-solution description;
- invoke the requested downstream adapter without durable persistence;
- omit any durable catalog write;
- hand the in-memory target document directly to the chosen downstream launch path;
- and still set the pdgsolve review state to `published` for that accepted snapshot.

So durable publish and launch differ only in destination handling, not in translation semantics.

### Persistence And Launch

pdgsolve should be able to hand accepted results downstream in one of two ways:

- publish a durable downstream document plus any needed catalog/library entry;
- or launch a downstream app with one explicit accepted in-memory document when persistence is not the goal.

The durable path should be the canonical reviewable path.

### Reverse Boundary From pdgedit

For pdgsolve v1, pdgedit should be downstream-only.

That means:

- a final downstream surface document such as `pdgedit/v1` is a publication artifact, not a pdgsolve solve request;
- editing a downstream document does not implicitly create or mutate pdgsolve solve state;
- pdgsolve should not reverse-parse arbitrary downstream surface objects back into solver-native meaning;
- and pdgedit should not host candidate ranking, ambiguity handling, acceptance state, or other pdgsolve review semantics.

So the v1 answer is:

- pdgsolve publishes to pdgedit;
- but pdgedit does not originate a new pdgsolve solve request from arbitrary authored surface state.

The only admitted reverse-adjacent operation in pdgsolve v1 should be **reopen by pdgsolve-owned reference**.

That means:

- if the runtime still has a pdgsolve work item id, accepted-record digest, or equivalent pdgsolve-owned publication reference for the current pdgedit document, it may offer a launcher-level action that reopens that pdgsolve work item;
- pdgsolve must then reload its own normalized problem, accepted record, or stored review state from pdgsolve-owned persistence;
- and the pdgedit document itself is not the source of truth for the reopened solve.

If that pdgsolve-owned reference is missing, the pdgedit document alone is not sufficient to reconstruct the pdgsolve problem.

So a published pdgedit artifact may be viewable or editable as a pdgedit document even when no reversible pdgsolve session still exists.

### Future pdgedit-To-pdgsolve Gate

If a true pdgedit-to-pdgsolve authoring loop is ever admitted later, it should require a separate versioned transform contract rather than reverse use of raw `pdgedit/v1`.

That future transform should be accepted only if all of the following are true:

- the source document is intentionally marked as request-shaped rather than publication-shaped;
- only explicit boundary-side authored assemblies are treated as request inputs and targets;
- pdgedit-only placement, link-routing, and grouping-label details are ignored as non-solver semantics;
- the transform runs outside the pdgedit renderer;
- and the output is an explicit pdgsolve-owned request contract such as `pdgsolve-request/v1`, not an in-process callback into pdgsolve review state.

Until such a contract is explicitly admitted, arbitrary `pdgedit/v1` documents should be treated as non-invertible downstream artifacts.

### App Boundary Rules

pdgsolve should follow the dedicated-app rules in [pdgapps](pdgapps.md):

- explicit versioned data across app boundaries;
- no direct cross-app runtime imports for app-specific behavior;
- no hidden coupling through launcher-state assumptions;
- and one source of truth for solve semantics, publication semantics, and downstream document structure.

### Core Regression Test-Case Set

Before pdgsolve implementation is considered trustworthy, the core regression denominator should be:

| Test-case id | Raw request | Key policy | Minimum expected outcome |
| --- | --- | --- | --- |
| `explicit_beta_request_exact_closure` | `2 pro_down_quark + pro_up_quark -> pro_down_quark + 2 pro_up_quark + electron + electron_antineutrino` | default | at least one exact assembly-native family exists; no composite or non-native symbol is introduced |
| `primitive_imbalance_row_beta_source_to_target` | `2 pro_down_quark + pro_up_quark -> pro_down_quark + 2 pro_up_quark` | default | retained diagnostics include `pdgsolve.search.primitive_imbalance` with $(\delta_E, \delta_P) = (3, -3)$; no exact family exists |
| `pass_thru_row_beta_source` | `2 pro_down_quark + pro_up_quark -> 2 pro_down_quark + pro_up_quark` | default | three exact pass-thru assemblies; zero non-identity operators; zero ambiguity penalty |
| `representative_multi_option_exact` | one mapped PDG request that yields at least two distinct exact option families | default | at least two exact option families remain after canonicalization, with stable score order and stable family representatives |

Positive regression coverage for PDG-to-assembly translation and un-mappable classification belongs in [pdgfeed](./pdgfeed.md), not in pdgsolve.

pdgsolve should keep only assembly-native solve regressions plus boundary rejection coverage for direct developer-loaded or request-URL-loaded inputs.

## Interfaces

### Inputs

#### Source Inventory

- built-in request manifests backed by canonical test cases;
- PDG-backed requests emitted by [pdgfeed](./pdgfeed.md);
- direct load of explicit request JSON by a developer or advanced user;
- and reopened pdgsolve work items carried by pdgsolve-owned ids or records.

#### Raw Request Contract: `pdgsolve-request/v1`

- `schema: "pdgsolve-request/v1"`;
- `requestId`;
- `source.kind`, for example `test_case`, `pdgfeed`, or `developer`;
- explicit reactant-side and product-side occurrence lists;
- and optional policy overrides.

#### Example `pdgfeed` Requests

The following frozen JSON blocks show the handoff shape that pdgsolve should accept from [pdgfeed](./pdgfeed.md). The neutron beta examples remain the clearest boundary reference because they show how composite neutron and proton terms are expanded into explicit request-side assemblies before solve.

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
      "assemblyId": "pro_down_quark",
      "title": "Pro Down Quark"
    },
    {
      "id": "reactant_neutron_1.row.2",
      "assemblyId": "pro_up_quark",
      "title": "Pro Up Quark"
    },
    {
      "id": "reactant_neutron_1.row.3",
      "assemblyId": "pro_down_quark",
      "title": "Pro Down Quark"
    }
  ],
  "products": [
    {
      "id": "product_proton_1.row.1",
      "assemblyId": "pro_up_quark",
      "title": "Pro Up Quark"
    },
    {
      "id": "product_proton_1.row.2",
      "assemblyId": "pro_down_quark",
      "title": "Pro Down Quark"
    },
    {
      "id": "product_proton_1.row.3",
      "assemblyId": "pro_up_quark",
      "title": "Pro Up Quark"
    },
    {
      "id": "product_pro_electron_2",
      "assemblyId": "electron",
      "title": "Electron"
    },
    {
      "id": "product_anti_electron_neutrino_3",
      "assemblyId": "electron_antineutrino",
      "title": "Electron Antineutrino"
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

##### Free neutron beta decay from a live PDG read

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
      "assemblyId": "pro_down_quark",
      "title": "Pro Down Quark"
    },
    {
      "id": "reactant_neutron_1.row.2",
      "assemblyId": "pro_up_quark",
      "title": "Pro Up Quark"
    },
    {
      "id": "reactant_neutron_1.row.3",
      "assemblyId": "pro_down_quark",
      "title": "Pro Down Quark"
    }
  ],
  "products": [
    {
      "id": "product_proton_1.row.1",
      "assemblyId": "pro_up_quark",
      "title": "Pro Up Quark"
    },
    {
      "id": "product_proton_1.row.2",
      "assemblyId": "pro_down_quark",
      "title": "Pro Down Quark"
    },
    {
      "id": "product_proton_1.row.3",
      "assemblyId": "pro_up_quark",
      "title": "Pro Up Quark"
    },
    {
      "id": "product_pro_electron_2",
      "assemblyId": "electron",
      "title": "Electron"
    },
    {
      "id": "product_anti_electron_neutrino_3",
      "assemblyId": "electron_antineutrino",
      "title": "Electron Antineutrino"
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
- `assemblyAlphabetId: "pdgsolve-assemblies/v1-standard-model"`;
- `primitiveBasisId: "pdgsolve-primitives/electrino-positrino/v1"`;
- `lawTableId: "pdgsolve-laws/v1-standard-model"`;
- `policy`;
- and `normalization`, containing explicit notes about boundary translation assumptions and normalization diagnostics.

#### Supporting Runtime Inputs

- pdgsolve-owned solve policy and review state.

#### Input Boundary Conditions

- accept explicit upstream request data only after successful higher-scale-to-assembly translation;
- if `pdgfeed` cannot translate a source request into explicit admitted Standard Model assemblies, classify that source request as un-mappable and do not emit a pdgsolve request for it;
- accept higher-scale composite terms only at the boundary adapter, never as solver-native request ids;
- keep solver-native request content assembly-native, with no DOM-derived geometry, render-order artifacts, or other UI-only state;
- and treat arbitrary `pdgedit/v1` documents as downstream artifacts rather than invertible pdgsolve requests.

### Outputs

#### Search-Core And Review Outputs

- pdgsolve-owned internal search results suitable for review;
- pdgsolve-owned candidate families, diagnostics, and provenance/accounting summaries;
- accepted pdgsolve publication state;
- and developer-facing diagnostics about solve completeness, ambiguity, non-closing families, and publish readiness.

#### Review Result Contract: `pdgsolve-result/v1`

- `schema: "pdgsolve-result/v1"`;
- `problemId`;
- `searchStatus`, with values `exact_available`, `partial_only`, or `no_exact_closure`;
- `bestFamilyId`;
- `acceptedFamilyId`, nullable summary field mirroring `review.acceptedFamilyId`;
- top-level `diagnostics`;
- `optionFamilies`;
- `review`, carrying the explicit review-state machine and any accepted lock record for the current result snapshot;
- and nullable `publication`, carrying downstream publication state only after an accepted record has actually been published or launched.

Each member of `optionFamilies` should contain:

- `familyId`;
- `kind`, with values `exact`, `partial`, or `no_exact_closure`;
- `score`, carrying the concrete components of $\kappa$;
- `reactantAssemblies`, carrying the canonical reactant-assemblies;
- `reactantSideOperators`, carrying the canonical reactant-side-operator choices;
- `intermediateAssemblies`, carrying the canonical intermediate-assemblies;
- `productSideOperators`, carrying the canonical product-side-operator choices;
- `productAssemblies`, carrying the canonical product-assemblies;
- `provenanceSummary`, carrying the family-level witness summary that review must see;
- `diagnostics`, carrying family-local diagnostics;
- `rawBranchCount`, the number of raw branches folded into the family;
- `publicationReady`, a boolean derived from exactness plus review-policy gates;
- and `canonicalCandidate`, the fully specified representative candidate used for publication if accepted.

#### Acceptance Record: `pdgsolve-acceptance/v1`

- `schema: "pdgsolve-acceptance/v1"`;
- `problemId`;
- `familyId`;
- `resultDigest`, which is a deterministic digest of the normalized problem id, policy bundle, law-table id, family key, and canonical representative key;
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
- `lockedSolveGraph`, which for publishable families must obey `schema: "pdgsolve-publication-graph/v1"` and must be the pdgsolve-owned accepted candidate graph that downstream publication will translate rather than reconstruct;
- and optional operator metadata such as `acceptedAt`, `acceptedBy`, and `acceptanceNote` when the runtime has them.

#### Accepted-Solution Description And Graph

- compact accepted-solution documents suitable for downstream adapters, still expressed in explicit admitted assemblies;
- `schema: "pdgsolve-publication-graph/v1"` or a successor compact accepted-solution graph schema;
- `units`;
- and `edges`.

Each `unit` record should contain:

- `id`;
- `kind`, with values `assembly` or `operator`;
- `stage`, with values `reactantAssemblies`, `reactantSideOperators`, `intermediateAssemblies`, `productSideOperators`, or `productAssemblies`;
- `occurrenceKey`, the stable accepted occurrence identity from the locked solve;
- one solver-native semantic symbol id or equivalent canonical assembly/operator identifier;
- for `kind: "assembly"`, that symbol id must be one explicit admitted assembly id;
- `title`, the accepted semantic title before any downstream surface-specific title expansion;
- the accepted primitive/provenance/accounting data needed for audit;
- and any downstream-adapter metadata in a clearly separated adapter field rather than in the solver-core identity fields.

Each `edge` record should contain:

- `id`;
- `fromUnitId`;
- `fromPortId`;
- `toUnitId`;
- and `toPortId`.

#### Downstream Adapter Outputs

- adapter-produced downstream documents such as `pdgedit/v1`;
- downstream catalog-ready publication entries or equivalent launch-ready selection state;
- and `pdgsolve-pdgedit-package/v1`.

The current `pdgsolve-pdgedit-package/v1` payload should contain:

- `schema: "pdgsolve-pdgedit-package/v1"`;
- `sourceAcceptanceDigest`;
- `publicationMode`, with values `durable` or `launch`;
- `documentId`, with the default stable form `<problemId>--<familyId>`;
- `documentTitle`, with a stable accepted-publication title derived from the request title or accepted family summary;
- `pdgeditDocument`, which must already satisfy `schema: "pdgedit/v1"`;
- and nullable `manifestEntry`, which is present only for durable publication and `null` for launch-only publication.

When `manifestEntry` is present, it should already satisfy the pdgedit-side `pdgedit-library-manifest/v1` entry rules:

- `id`, which should default to `documentId`;
- `title`;
- `displayTitle`;
- and `documentPath`.

#### Output Boundary Conditions

- own solve normalization, search, review, and publication inside the explicit assembly-native ontology;
- materialize compact accepted-solution descriptions for accepted outcomes in explicit admitted assemblies only;
- hand target-specific downstream documents to adapters only after that accepted-solution step, allowing those adapters to collapse explicit assemblies into higher-scale descriptions when a target explicitly requires it;
- do not ask pdgedit to parse raw solver-native problem or result data;
- do not duplicate PDG normalization logic locally;
- and do not let launcher/runtime concerns become the source of solve semantics.

### Neighboring Components, Each with Related Priorities

- [pdgfeed](./pdgfeed.md) owns upstream PDG normalization and request emission.
- [pdgedit](./pdgedit.md) owns the final tile surface, placement grammar, pdgedit-side document model, and pdgedit-specific materialization rules for solver publications that target pdgedit.
- [pdgapps](pdgapps.md) owns the cross-app boundary and modularity rules that apply here.

## Priorities

### 1. Enforce The Assembly-Native Composite Boundary

Status: `active`

Current:

- higher-scale beta language still has enough historical weight in the surrounding workstream that it can leak into solver discussions as if it were native ontology;
- that creates risk that request ids, search symbols, or accepted-graph units drift away from explicit admitted assemblies and toward composite placeholders;
- and the document set still needs stronger regression and diagnostic framing around the rule that higher-scale reactant and product terms belong to boundary translation only.

Objective:

- keep every solver-native input, intermediate, operator law, search symbol, and accepted output expressed only in explicit admitted Standard Model assemblies;
- keep `pdgfeed` responsible for classifying source requests as un-mappable when translation into explicit Standard Model assemblies fails, while keeping malformed direct pdgsolve inputs explicit in diagnostics;
- keep accepted-solution graphs and downstream handoff contracts free of composite ids;
- make downstream grouping or naming clearly adapter-owned rather than solver-owned;
- and keep the regression set centered on proving that composites are expanded or collapsed only outside the solve core.

### 2. Build The Dedicated Review Console UI

Status: `active`

Current:

- the standalone `pdgsolve` app already has its own UI shell with request intake, diagnostics, candidate-family selection, accepted-family summary, and downstream preview;
- but that shell still behaves more like a thin status dashboard than a true solve-review console;
- the current family cards and accepted summary still expose internal stage-field drift rather than the canonical terminology `reactant assemblies`, `reactant-side operators`, `intermediate assemblies`, `product-side operators`, and `product assemblies`;
- and the current layout does not yet present the accepted review workflow as a clear multi-pane console with distinct windows for request context, candidate families, accepted lock state, provenance/diagnostics, and publication output.

Objective:

- keep `pdgsolve` as a dedicated solve-and-review app with its own UI boundary rather than treating review and acceptance as hidden runtime state;
- evolve the current standalone shell into a multi-pane review console whose windows map directly onto the solver-owned review tasks;
- replace internal stage-field drift in the review UI with the canonical stage terminology already defined in this document;
- make candidate selection, accepted-family locking, provenance inspection, and publication preview readable in one console without requiring raw JSON as the primary review surface;
- add a downstream preview path that can materialize clickable `pdgedit`-rendered `.png` images for the selected candidate family so review can inspect the likely surface result before disposition, while keeping that image strictly advisory rather than solver-owned source of truth;
- and preserve the existing versioned contract boundaries while improving the review-facing presentation layer.

### 3. Move Solver-Publication Adapter Ownership Upstream

Status: `active`

Current:

- `pdgsolve` already claims ownership of accepted records, compact accepted-solution descriptions, downstream adapters, and final publication into `pdgedit/v1`;
- but `pdgedit.md` had accumulated detailed solver-publication recipe-family, accepted-unit mapping, and adapter-emission rules that describe upstream translation work more than downstream surface rendering;
- that drift makes `pdgedit` look more responsible for solve-publication expansion than it should be;
- and it weakens the intended architecture in which `pdgedit` receives a final `pdgedit/v1` document while `pdgsolve` owns the accepted-solution-to-target translation path.

Objective:

- keep detailed accepted-solution translation, recipe-family ownership, adapter package contracts, and accepted-graph expansion rules with `pdgsolve`;
- keep `pdgedit` focused on the final `pdgedit/v1` boundary, tile grammar, surface placement grammar, and direct object editing;
- document in `pdgsolve` the exact upstream adapter responsibilities required to turn accepted solver output into final pdgedit documents;
- make it unambiguous that `pdgedit` should have a fairly easy job: read final `pdgedit/v1`, render it, edit it, and export it without reconstructing solver intent;
- and continue trimming downstream documents when solver-owned publication logic drifts into them.

### 4. Keep Solver Correctness On The Active Priority Queue

Status: `active`

Current:

- computed assembly-level result construction is now in place;
- the core boundary is now intentionally stricter than some earlier beta-family drafts;
- and solver correctness remains active until full PDG-mappable exact closure and deterministic ranking are under regression across the admitted assembly-native law set.

Objective:

- keep pdgsolve solver correctness active until the remaining active priorities are resolved against explicit assembly-native results;
- keep every admitted law entirely inside the explicit assembly ontology;
- and expand regression coverage across representative exact and multi-option exact PDG requests so deterministic ranking and explanation are proven on the full intended scope.
