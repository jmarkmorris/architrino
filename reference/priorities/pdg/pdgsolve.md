# pdgsolve App

## LLM Instructions

- Keep this document focused on pdgsolve as the solve/review app paired with [pdgedit](./pdgedit.md).
- Re-evaluate rules from first principles rather than preserving inherited UI artifacts, anchor conventions, or document shapes by inertia.
- Keep `Design` about durable boundaries, solve-state concepts, and review/publication workflow ownership rather than temporary migration tactics.
- Keep `Priorities` ordered as the active work queue.
- Do not restate low-level PDG ingest internals or pdgedit tile-rendering internals except where pdgsolve depends on them.

## Purpose

pdgsolve is the solve-and-review app.

It sits between upstream request sources and downstream pdgedit documents.

It owns:

- intake of explicit solve requests from upstream sources such as [pdgfeed](./pdgfeed.md), fixtures, and direct developer input;
- normalization of those requests into a pdgsolve-owned solve problem;
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
- The app already loads frozen corpus requests, `pdgfeed`-emitted requests, direct JSON requests, and reopened acceptance records, then derives ranked families and publication-ready accepted records against the frozen contracts.
- [pdgedit](./pdgedit.md) now defines the downstream authored-surface boundary clearly, and the accepted-record publication seam now emits final `pdgedit/v1` documents, durable manifest-entry updates, and in-memory launch payloads without pdgedit-side solver reconstruction.

## Design

### Role In The Product

pdgsolve should become the dedicated solve-and-review app that mates with pdgedit.

The intended high-level flow is:

- `pdgfeed` or another upstream source emits a solve request;
- pdgsolve loads that request;
- pdgsolve runs the solve;
- pdgsolve reviews one or more candidate outcomes;
- pdgsolve accepts one outcome for publication;
- pdgsolve publishes a final `pdgedit/v1` document;
- and pdgedit renders or edits that final authored-surface document.

### Foundational Stance

pdgsolve should be designed from ground zero.

That means:

- pdgsolve should define its own lane widgets, anchor ids, operator UI shapes, request/result contracts, and review model based on solve semantics, reviewability, determinism, and the downstream pdgedit boundary;
- the internal design should not inherit accidental constraints from earlier surfaces or tooling splits;
- and every retained rule should justify itself in terms of solve semantics, reviewability, determinism, and the downstream pdgedit boundary.

Useful prior work may still inform:

- conserved-ledger semantics;
- operator family meaning;
- useful fixture cases;
- and examples of successful or failed closure families.

UI artifacts should not define pdgsolve's architecture.

### Runtime Shape

The durable pdgsolve shape should separate:

- request intake;
- request normalization;
- solve-core search;
- candidate review;
- acceptance/publication;
- and downstream pdgedit launch or persistence.

Large coordinator files may assemble those pieces, but they should not become the long-term home of solver semantics.

### Fundamental Solve Geometry

pdgsolve should start from one deliberately limited solve geometry.

The core ordered strip is:

- lane 1: reactant-side assemblies;
- lane 2: reactant-side operators;
- lane 3: intermediate assemblies;
- lane 4: product-side operators;
- lane 5: product-side assemblies.

The operator grammar is:

- lane 2: `Pass Thru` or `Dissociate`;
- lane 4: `Pass Thru` or `Associate`.

The assembly grammar is:

- lanes 1, 3, and 5 contain assemblies only;
- lanes 2 and 4 contain operators only;
- and all normal solve progress moves left-to-right through adjacent lanes only.

In pdgsolve terminology, an **assembly** means one 4-tile assembly row that can participate in operator routing.

pdgsolve should not use PDG particle-level names, display-grouping names, support-pair names, or support-quad names as solver-native assembly-row ids.

Those names belong on either side of the solver boundary:

- before pdgsolve, [pdgfeed](./pdgfeed.md) may know PDG particle names and expand them into individual 4-tile assembly rows;
- after pdgsolve, [pdgedit](./pdgedit.md) may inspect published lane-3 assembly rows and classify or group them as transient W/Z boson corridors where a dedicated downstream rule admits that reading;
- after pdgsolve, [pdgview](./pdgview.md) may later display grouping spans or labels over already-solved rows;
- inside pdgsolve, all routing, scoring, and provenance should use individual assembly ids such as `pro_down_quark`, `pro_up_quark`, `pro_noether_core`, and `anti_noether_core`.

pdgsolve should not solve over `W-`, `W+`, or `Z` bosons as native lane units in the v1 strip.

For the current boundary, W/Z boson language is a downstream interpretation of already-emitted lane-3 row assemblies. It is not a solver-native assembly id, operator id, dissociate target, associate source, or middle-lane search symbol.

pdgsolve should treat this as a combinatorial state graph, not as screen geometry.

That means:

- lane position is semantic;
- row order may matter for deterministic identity and publication order;
- but solve legality must not depend on DOM layout, pixel coordinates, or render-time anchor inference.

If Noether support material is permitted, it should enter through a deliberately limited row rule rather than as arbitrary free placement.

For the current working direction, that means:

- Noether support is added only as individual Noether core rows;
- support rows are added in balanced pairs, one `pro_noether_core` and one `anti_noether_core` at a time;
- the row-level beta family requires two `pro_noether_core` rows and two `anti_noether_core` rows;
- no paired, quad, or display-grouping support token is admitted as solver-native material;
- there is no separate solver action required to expose or open a grouping;
- pdgedit publication may omit any grouping label/span until the post-solver grouping contract is explicitly admitted;
- support rows are not lane-3 center assemblies;
- support rows are not arbitrary middle-lane insertions;
- and support rows are not free-floating geometry owned by the renderer.

For mathematical purposes, pdgsolve should model one solve family with a finite assembly alphabet \(\mathcal{A}\).

The current Noether-support family is the distinguished row-level subset

$$
\mathcal{A}_{\mathrm{st}} = \{\mathrm{pro\_noether\_core}, \mathrm{anti\_noether\_core}\} \subset \mathcal{A}.
$$

Those support symbols denote individual Noether core assembly rows.

They do not become `Dissociate` or `Associate` endpoints merely because they are present in \(\mathcal{A}\).

Each assembly lane should be represented as a multiset vector in \(\mathbb{N}^{\mathcal{A}}\).

If \(x_{\ell} \in \mathbb{N}^{\mathcal{A}}\) is the inventory at lane \(\ell \in \{1, 3, 5\}\), then \(x_{\ell}(a)\) is the multiplicity of assembly \(a\) in that lane.

For the current working support policy, pdgsolve should enumerate over the finite balanced-support family

$$
\mathcal{S} = \{0, e_{\mathrm{pro\_noether\_core}} + e_{\mathrm{anti\_noether\_core}}, 2e_{\mathrm{pro\_noether\_core}} + 2e_{\mathrm{anti\_noether\_core}}\}.
$$

A concrete solve attempt is therefore an augmented request

$$
(R, T, s^{-}, s^{+}) \in \mathbb{N}^{\mathcal{A}} \times \mathbb{N}^{\mathcal{A}} \times \mathcal{S} \times \mathcal{S},
$$

with effective reactant inventory \(R + s^{-}\) and effective product inventory \(T + s^{+}\).

This support family can later widen, but pdgsolve v1 should keep it finite and explicit.

### Operator Semantics

pdgsolve should keep the operator family deliberately small.

`Pass Thru` means:

- one assembly-side input continues forward as the same provenance-carrying block;
- no decomposition occurs;
- and no new assembly identity is created.

`Dissociate` means:

- exactly one input is accepted;
- that input must come from one 4-tile assembly reactant row, not from a grouping label or span;
- one reactant-side 4-tile assembly is opened;
- the resulting output is a constrained set of lane-3 assemblies determined by the decomposition law for that assembly family;
- the original provenance block is refined into smaller provenance blocks with the same union;
- and the total conserved ledger is preserved across the split.

`Associate` means:

- one or more lane-3 assemblies are gathered into one lane-5 assembly;
- exactly one output is emitted;
- that output must go to one 4-tile assembly product row, not to a grouping label or span;
- the operation is legal only when the gathered material exactly satisfies the product assembly recipe;
- the gathered provenance blocks are coarsened into one larger provenance block with the same union;
- and the total conserved ledger is preserved across the gather-and-assemble step.

So the operator shape is asymmetric but strict:

- a 4-tile assembly reactant may route to a lane-2 `Dissociate` operator;
- a lane-2 `Dissociate` operator has only one input;
- a lane-4 `Associate` operator has only one output;
- and that lane-4 `Associate` output must route to a 4-tile assembly product.

Post-solver grouping display can organize the rows that participate in these laws, but grouping metadata is not itself opened, gathered, dissociated, or associated.

pdgsolve should not widen the operator family casually.

The more precise the operator grammar is, the more tractable the search space becomes.

pdgsolve should model the nontrivial operators as finite law tables.

For dissociation, each operator-admissible 4-tile assembly \(a \in \mathcal{A}\) has a finite set

$$
\Delta(a) \subset \mathbb{N}^{\mathcal{A}},
$$

where each \(d \in \Delta(a)\) is one legal dissociation output multiset for \(a\).

For association, each operator-admissible 4-tile assembly \(a \in \mathcal{A}\) has a finite set

$$
\Gamma(a) \subset \mathbb{N}^{\mathcal{A}},
$$

where each \(g \in \Gamma(a)\) is one legal gathered input multiset that can assemble into \(a\).

`Pass Thru` is the identity law and therefore does not need a separate family table.

The important constraint is that \(\Delta\) and \(\Gamma\) are finite for a fixed solve family.

Unary assembly laws should remain the default.

But pdgsolve may also introduce a small number of finite local support-row laws over explicit reactant-side multisets when exact provenance requires jointly checked support rows.

That move is acceptable only when:

- the participating reactant-side assemblies remain explicit in the normalized solve problem;
- the support-row law has fixed explicit conserved-content meaning;
- and the support-row law removes ambiguity rather than hiding support inside a renamed unary symbol.

### First Worked Weak Law: Row-Level Beta Reaction

The first concrete worked weak family should be the row-level beta reaction emitted by the upstream PDG boundary adapter for the familiar beta-decay channel.

In the AAA ledger, one \(u\) and one \(d\) are spectators, while the second \(d\) is the active agent, and the reaction also relies on a minimal neutral weak-support environment.

pdgsolve should therefore not claim that the bare row-level request

$$
\Delta(2e_{\mathrm{pro\_down\_quark}} + e_{\mathrm{pro\_up\_quark}})
\ni
e_{\mathrm{pro\_down\_quark}} + 2e_{\mathrm{pro\_up\_quark}} + e^- + \bar{\nu}_e
$$

unless the required weak-support inventory is also explicit in the normalized reactant multiset.

The clean pdgsolve-v1 way to encode this is:

- require [pdgfeed](./pdgfeed.md) or an equivalent boundary adapter to expand PDG particle names before pdgsolve sees the request;
- during normalization, when the request and active policy justify the row-level beta family, make the minimal weak-support environment explicit as individual Noether core rows;
- represent the normalized reactant-side multiset as

$$
x_{1,\beta}
=
2e_{\mathrm{pro\_down\_quark}}
+ e_{\mathrm{pro\_up\_quark}}
+ 2e_{\mathrm{pro\_noether\_core}}
+ 2e_{\mathrm{anti\_noether\_core}};
$$

- and treat the two `pro_noether_core` rows plus the two `anti_noether_core` rows as explicit support rows for the beta-family rewrite.

Then the first worked dissociation law is a single-input row rewrite with explicit support rows:

$$
\Delta_{\beta}\!\left(
e_{\mathrm{pro\_down\_quark}}
\mid
2e_{\mathrm{pro\_noether\_core}}
+ 2e_{\mathrm{anti\_noether\_core}}
\right)
=
\left\{
e_{\mathrm{pro\_up\_quark}} + e_{e^-} + e_{\bar{\nu}_e}
\right\}.
$$

The lane-2 operator input remains exactly one 4-tile assembly reactant row: one `pro_down_quark`.

The Noether core support rows are law preconditions and provenance sources, not second lane-2 operator inputs and not things that get dissociated.

This law should carry the following provenance witness requirements:

- one spectator `pro_up_quark` row passes through unchanged;
- one spectator `pro_down_quark` row passes through unchanged;
- one active `pro_down_quark` row rewrites into one `pro_up_quark` row;
- the two `pro_noether_core` rows and two `anti_noether_core` rows provide the minimal pro/anti weak-support carriers required by the accepted AAA beta ledger;
- the electron and electron-antineutrino receive explicit provenance from those support rows according to that ledger;
- and every product architrino is therefore traced either to a row from the PDG-expanded reactant side or to the explicit Noether core support rows.

In lane terms, the baseline exact family is:

- lane 1: `pro_down_quark + pro_up_quark + pro_down_quark` plus two `pro_noether_core` rows and two `anti_noether_core` rows;
- lane 2: two spectator `Pass Thru` choices and one beta-family `Dissociate` choice with one incoming link from the active `pro_down_quark` row;
- lane 3: `pro_down_quark + pro_up_quark + pro_up_quark + electron + electron-antineutrino`;
- lane 4: `Pass Thru` on each of those product assemblies;
- lane 5: `pro_up_quark + pro_down_quark + pro_up_quark + electron + electron-antineutrino`.

This gives pdgsolve its first fully readable weak worked example:

- one non-identity reactant-side operator over a single active row;
- zero product-side associations;
- two balanced pro/anti Noether-core support pairs;
- explicit spectator carry-through;
- explicit active-agent rewrite;
- and explicit product provenance.

If normalization cannot justify those explicit Noether core support rows under the active request and policy bundle, pdgsolve should not promote the branch to exact beta closure.

It should keep the case partial or unsupported until the missing support rows or provenance assumptions are made explicit.

### Request Intake

pdgsolve should support a small number of explicit entry modes:

- built-in request manifests backed by canonical fixtures;
- PDG-backed requests emitted by [pdgfeed](./pdgfeed.md);
- direct load of explicit request JSON by a developer or advanced user;
- and reopened pdgsolve work items carried by pdgsolve-owned ids or records.

pdgsolve should consume explicit request data rather than hidden app-local state.

### Solve Problem Model

pdgsolve should define one pdgsolve-owned solve problem model that is solver-native rather than UI-native.

That solve problem model should describe:

- reactant-side assemblies or inventories;
- product-side assemblies or inventories;
- any explicit center material;
- any explicit Noether core support rows admitted by policy;
- the permitted operator grammar;
- policy or theory gates;
- and provenance/accounting requirements.

That solve problem model should avoid:

- DOM-derived geometry;
- render-order assumptions;
- CSS-lane artifacts;
- UI-only node-key packing;
- and other state that exists only because an earlier app rendered something first.

Mathematically, pdgsolve should describe one solve instance as

$$
Q = (\mathcal{A}, \mathcal{P}, \mu, R, T, \mathcal{S}, \Delta, \Gamma, \Pi),
$$

where:

- \(\mathcal{A}\) is the finite assembly alphabet for the active solve family;
- \(\mathcal{P}\) is the basis of conserved primitive content;
- \(\mu : \mathcal{A} \to \mathbb{N}^{\mathcal{P}}\) is the conserved-content map;
- \(R, T \in \mathbb{N}^{\mathcal{A}}\) are the requested reactant and product multisets;
- \(\mathcal{S}\) is the allowed finite support-row augmentation family;
- \(\Delta\) and \(\Gamma\) are the dissociation and association law tables;
- and \(\Pi\) is the active policy bundle.

For pdgsolve v1, the minimal explicit conserved basis should be

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

For shorthand, pdgsolve should define the primitive counts

$$
N_{E}(x) = \mu(x)_{\mathrm{Electrino}}, \qquad N_{P}(x) = \mu(x)_{\mathrm{Positrino}}.
$$

These are the first conserved sums that must match across the solve.

### V1 Assembly Table

Before pdgsolve implementation begins, the first executable family should freeze one minimal assembly alphabet.

For pdgsolve v1, that alphabet should be

$$
\mathcal{A}_{\mathrm{v1}}
=
\{
\mathrm{anti\_noether\_core},
\mathrm{electron},
\mathrm{electron\_antineutrino},
\mathrm{pro\_down\_quark},
\mathrm{pro\_noether\_core},
\mathrm{pro\_up\_quark}
\}.
$$

The v1 assembly table should be:

| Canonical id | Display label | Allowed lane roles in pdgsolve v1 | \(\mu(a) = (N_E, N_P)\) | v1 note |
| --- | --- | --- | --- | --- |
| `pro_down_quark` | `Pro Down Quark` | lanes `1`, `3`, `5` | \((7, 5)\) | individual 4-tile quark row |
| `pro_up_quark` | `Pro Up Quark` | lanes `1`, `3`, `5` | \((4, 8)\) | individual 4-tile quark row |
| `electron` | `Electron` | lanes `1`, `3`, `5` | \((9, 3)\) | charged lepton assembly |
| `electron_antineutrino` | `Electron Antineutrino` | lanes `1`, `3`, `5` | \((6, 6)\) | neutral lepton assembly |
| `pro_noether_core` | `Pro Noether Core` | lane `1` support row only | \((3, 3)\) | added only in balanced pro/anti support pairs |
| `anti_noether_core` | `Anti Noether Core` | lane `1` support row only | \((3, 3)\) | added only in balanced pro/anti support pairs |

The frozen v1 bookkeeping values should therefore include:

- \(\mu(\mathrm{pro\_down\_quark}) = (7, 5)\);
- \(\mu(\mathrm{pro\_up\_quark}) = (4, 8)\);
- \(\mu(\mathrm{electron}) = (9, 3)\);
- \(\mu(\mathrm{electron\_antineutrino}) = (6, 6)\);
- \(\mu(\mathrm{pro\_noether\_core}) = (3, 3)\);
- and \(\mu(\mathrm{anti\_noether\_core}) = (3, 3)\).

pdgsolve v1 should treat equality of \(\mu\) as necessary for conservation, not as permission to identify assemblies.

In particular, no normalization or ranking rule should collapse rows into a particle-level grouping merely because their primitive ledgers match.

### V1 Law Tables

pdgsolve v1 should freeze a deliberately small executable law family.

For unary laws, the initial tables should be empty:

$$
\Delta(a) = \varnothing,
\qquad
\Gamma(a) = \varnothing,
\qquad
a \in \mathcal{A}_{\mathrm{v1}}.
$$

So in pdgsolve v1, the only unary rewrite available for any lane-3-capable single assembly occurrence is `Pass Thru`.

The first and only non-identity executable law family should be the explicit row-level beta support rule

$$
\Lambda_{2}\!\left(
e_{\mathrm{pro\_down\_quark}}
\mid
2e_{\mathrm{pro\_noether\_core}} + 2e_{\mathrm{anti\_noether\_core}}
\right)
=
\left\{
e_{\mathrm{pro\_up\_quark}}
+ e_{\mathrm{electron}}
+ e_{\mathrm{electron\_antineutrino}}
\right\}.
$$

That law should be frozen as the following v1 record:

| Law id | Lane-2 operator input | Required support rows | Output multiset | Lane-2 operator tag | Lane-4 operator tags | Required provenance summary |
| --- | --- | --- | --- | --- | --- | --- |
| `row.beta.pro_down_quark_to_pro_up_quark.v1` | `pro_down_quark` | `2 x pro_noether_core`, `2 x anti_noether_core` | `pro_up_quark + electron + electron_antineutrino` | `Dissociate` | row-level `Pass Thru` on each final row | spectator rows pass through, active `pro_down_quark -> pro_up_quark`, and lepton-support provenance from individual Noether core rows |

The support rows are not second input edges into the `Dissociate` operator.

pdgsolve v1 should admit no other non-identity law family.

That means:

- there is no unary particle-level dissociation rule in v1;
- there is no W/Z boson production or absorption rule in v1;
- there is no generic `Noether core -> ...` unary rule in v1;
- Noether support rows do not receive unary pass-thru in v1 because they are support rows, not lane-3 assemblies;
- there is no association table yet beyond identity pass-thru;
- and any branch that requires another non-identity law family should terminate with an explicit unsupported-law diagnostic rather than a guessed closure.

### Normalization Rules

pdgsolve should normalize every upstream request into one explicit `pdgsolve-problem/v1` record before search begins.

The raw request contract should remain small.

It should carry:

- `schema: "pdgsolve-request/v1"`;
- `requestId`;
- `source.kind`, for example `fixture`, `pdgfeed`, or `developer`;
- explicit reactant-side and product-side occurrence lists;
- and optional policy overrides.

Normalization should then do the following, in order:

1. receive only row-level assembly ids from the upstream boundary adapter, such as `pro_down_quark`, `pro_up_quark`, `electron`, and `electron_antineutrino`;
2. preserve the resulting occurrence order so the search can assign stable occurrence indices later;
3. reject any assembly outside \(\mathcal{A}_{\mathrm{v1}}\) with `pdgsolve.request.unsupported_assembly`;
4. freeze the active primitive basis as \(\mathcal{P}_{0}\), the law table as `pdgsolve-laws/v1-beta-minimal`, and the support family as balanced pro/anti Noether core row pairs unless the request narrows that family explicitly;
5. build the requested multisets \(R\) and \(T\);
6. when the row-level request matches the beta source signature and policy `betaSupportMode = allow-implied-noether-core-support`, add two `pro_noether_core` rows and two `anti_noether_core` rows if those rows are not already explicit, mark them as normalized support, and emit `pdgsolve.normalization.support_added.noether_core_rows`;
7. when the row-level request matches the beta source signature but policy `betaSupportMode = explicit-only`, do not synthesize support; keep \(R\) unchanged and emit `pdgsolve.normalization.support_required.noether_core_rows`;
8. reject any particle-level or grouping-level id that reaches pdgsolve as if it were one assembly row with `pdgsolve.request.unsupported_assembly`; and
9. emit one solver-native problem record whose content is fully sufficient for search without any DOM or renderer lookup.

The normalized pdgsolve problem contract should be:

- `schema: "pdgsolve-problem/v1"`;
- `problemId`;
- `requestId`;
- `source`;
- `reactants` and `products`, each as both ordered occurrence lists and multiset summaries;
- `assemblyAlphabetId: "pdgsolve-assemblies/v1-minimal"`;
- `primitiveBasisId: "pdgsolve-primitives/electrino-positrino/v1"`;
- `lawTableId: "pdgsolve-laws/v1-beta-minimal"`;
- `allowedSupportAugmentations`, with values drawn from `none`, `one_balanced_noether_core_pair`, and `two_balanced_noether_core_pairs`;
- `policy`;
- and `normalization`, containing explicit notes about added support material and normalization diagnostics.

### Conserved Balance Equations

pdgsolve should make the balance laws explicit at assembly lanes 1, 3, and 5.

Because architrinos have provenance in \(\mathbb{A}\mathbb{A}\mathbb{A}\), the correct solve picture is not a disappearing flow ledger.

It is one fixed primitive carrier set viewed through three different lane-wise assembly partitions.

For chosen support augmentations \((s^{-}, s^{+})\), define the full lane-1 and lane-5 inventories

$$
x_{1} = R + s^{-}, \qquad x_{5} = T + s^{+}.
$$

An exact candidate must find:

- a lane-3 inventory \(x_{3} \in \mathbb{N}^{\mathcal{A}}\);
- a finite primitive carrier set \(\Omega = \Omega_{E} \sqcup \Omega_{P}\);
- and lane partitions \(P_{1}, P_{3}, P_{5}\) of \(\Omega\);

such that:

- \(P_{1}\) realizes \(x_{1}\);
- \(P_{3}\) realizes \(x_{3}\);
- \(P_{5}\) realizes \(x_{5}\);
- and the lane-2 and lane-4 operators are legal provenance-preserving rewrites from \(P_{1}\) to \(P_{3}\) and from \(P_{3}\) to \(P_{5}\).

Here, "realizes" means:

- each block in \(P_{\ell}\) is labeled by some assembly \(a \in \mathcal{A}\);
- the block contains exactly \(\mu(a)_{\mathrm{Electrino}}\) Electrinos and \(\mu(a)_{\mathrm{Positrino}}\) Positrinos;
- and the multiplicity of each label \(a\) agrees with \(x_{\ell}(a)\).

The lane-wise primitive invariants are therefore

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

It preserves one underlying architrino population whose grouping changes from lane to lane.

If a request fails these equalities at the boundary, pdgsolve should not silently repair that mismatch.

Instead, it should report the primitive imbalance vector

$$
\delta(Q; s^{-}, s^{+}) = \mu(x_{1}) - \mu(x_{5}) \in \mathbb{Z}^{\mathcal{P}_{0}},
$$

with the concrete components

$$
\delta_{E} = N_{E}(x_{1}) - N_{E}(x_{5}), \qquad
\delta_{P} = N_{P}(x_{1}) - N_{P}(x_{5}).
$$

If \(\delta(Q; s^{-}, s^{+}) \neq 0\), then exact closure is impossible for that support choice.

So at the first primitive level, pdgsolve should always be able to say:

- Electrinos balanced or imbalanced by \(\delta_{E}\);
- Positrinos balanced or imbalanced by \(\delta_{P}\);
- and whether any allowed balanced Noether core support rows remove that deficit exactly.

### Combinatorial Search Model

pdgsolve should treat solving as an explicit combinatorial search problem.

The search design should specify:

- what one branch-state record contains;
- what counts as one candidate expansion;
- how operators such as `Pass Thru`, `Dissociate`, and `Associate` expand the state;
- how conservation and provenance prune illegal branches;
- how residue, ambiguity, and unsupported cases are represented explicitly;
- and how deterministic ranking chooses one accepted candidate over other legal candidates.

The search model should remain planner-first rather than surface-first.

Related search material elsewhere in the observer workstream remains useful neighboring groundwork, but it is not a finished pdgsolve spec.

This limited geometry should be exploited aggressively.

In particular:

- each lane-1 lane-3-capable assembly presents a small action set, typically `Pass Thru` or `Dissociate`;
- each lane-3 assembly or assembly-set presents a small action set, typically `Pass Thru` or `Associate`;
- each `Dissociate` choice consumes exactly one 4-tile assembly reactant input;
- each `Associate` choice emits exactly one 4-tile assembly product output;
- support rows can constrain which row-level rewrite is available, but they are not local operator inputs;
- candidate growth therefore comes from combinations of a bounded family of local choices rather than from unconstrained geometric routing;
- and that bounded choice structure makes branch scoring and pruning practical.

Let

$$
\mathcal{A}_{\mathrm{mid}} \subset \mathcal{A}
$$

be the subset of assemblies that are legal lane-3 assemblies in the active solve family.

For lane 2, pdgsolve should define the unary local reactant rewrite family only on \(\mathcal{A}_{\mathrm{mid}}\):

$$
\Lambda_{2}(a) = \{e_{a}\} \cup \Delta(a), \qquad a \in \mathcal{A}_{\mathrm{mid}},
$$

where \(e_{a}\) represents `Pass Thru` and each \(d \in \Delta(a)\) represents one legal `Dissociate` output.

Noether support rows are therefore not given unary lane-2 pass-thru merely by belonging to \(\mathcal{A}\).

They enter the search only as explicit support-row requirements for approved row-level laws.

For a small finite set of worked weak families, pdgsolve may also define explicit support-row rewrites over a single operator input and a required reactant-side support multiset

$$
c \in \mathbb{N}^{\mathcal{A}},
$$

with a finite row-level family

$$
\Lambda_{2}(c).
$$

The row-level beta-family rule above is the first example:

$$
\Lambda_{2}\!\left(
e_{\mathrm{pro\_down\_quark}}
\mid
2e_{\mathrm{pro\_noether\_core}} + 2e_{\mathrm{anti\_noether\_core}}
\right)
\ni
e_{\mathrm{pro\_up\_quark}} + e_{e^-} + e_{\bar{\nu}_e}.
$$

Search should treat this as one assignable local lane-2 unit with one operator input after reserving the required support occurrences explicitly.

For lane 4, pdgsolve should define the unary local product-closure family only on \(\mathcal{A}_{\mathrm{mid}}\):

$$
\Lambda_{4}(a) = \{e_{a}\} \cup \Gamma(a), \qquad a \in \mathcal{A}_{\mathrm{mid}},
$$

where \(e_{a}\) represents `Pass Thru` and each \(g \in \Gamma(a)\) represents one legal lane-3 input multiset that can `Associate` into \(a\).

Given a full lane-1 inventory \(x_{1}\) and a chosen reservation of any support-row law occurrences, the remaining unary left-generated middle family is

$$
\mathfrak{L}(x_{1}) =
\left\{
\sum_{a \in \mathcal{A}_{\mathrm{mid}}} \sum_{i=1}^{x_{1}(a)} y_{a,i}
\;\middle|\;
y_{a,i} \in \Lambda_{2}(a)
\right\}.
$$

Given a full lane-5 inventory \(x_{5}\), the unary right-required middle family is

$$
\mathfrak{R}(x_{5}) =
\left\{
\sum_{a \in \mathcal{A}_{\mathrm{mid}}} \sum_{j=1}^{x_{5}(a)} z_{a,j}
\;\middle|\;
z_{a,j} \in \Lambda_{4}(a)
\right\}.
$$

These unary families are understood after removing any occurrences already reserved into approved lane-2 support-row rewrites.

So in the beta-family case, the reserved support-row rewrite output is added into \(x_{3}^{L}\) before the meet-in-the-middle comparison is evaluated.

An exact solve for the support choices \((s^{-}, s^{+})\) therefore requires

$$
\exists x_{3} \in \mathfrak{L}(x_{1}) \cap \mathfrak{R}(x_{5}),
$$

together with a provenance witness showing that the chosen left and right rewrite families act on the same fixed primitive carrier set \(\Omega\).

One useful branch-state record is

$$
s = (s^{-}, s^{+}, \phi_{2}, \phi_{4}, x_{3}^{L}, x_{3}^{R}, W),
$$

where:

- \(\phi_{2}\) is a partial assignment of lane-2 choices to reactant assembly occurrences;
- \(\phi_{2}\) may assign either unary reactant occurrences or one approved support-row law;
- \(\phi_{4}\) is a partial assignment of lane-4 choices to product assembly occurrences;
- \(x_{3}^{L}\) is the partial middle inventory generated from lane 1;
- \(x_{3}^{R}\) is the partial middle inventory required by lane 5;
- and \(W\) is the current partial provenance witness.

pdgsolve should execute this search as a bounded meet-in-the-middle enumeration.

The operational loop should be:

1. choose one support augmentation \((s^{-}, s^{+})\);
2. reject that choice immediately if the primitive imbalance vector \(\delta(Q; s^{-}, s^{+})\) is nonzero and the current search mode requires exact closure;
3. initialize the empty branch state with no lane-2 or lane-4 assignments;
4. choose the next unassigned reactant or product assembly occurrence, preferring the side with fewer legal local rewrites or tighter middle-lane constraints;
5. expand that occurrence by one member of \(\Lambda_{2}(a)\) or \(\Lambda_{4}(a)\), or reserve one approved support-row law when the active family allows it;
6. update the partial middle inventories \(x_{3}^{L}\) and \(x_{3}^{R}\), and update the partial provenance witness \(W\);
7. prune the branch if the remaining unassigned occurrences can no longer close the middle or provenance constraints;
8. continue until all reactant and product occurrences are assigned;
9. emit a terminal candidate when the completed branch has a complete provenance witness and a scored middle-lane outcome.

So the search does not guess full reactions in one jump.

It builds them one local operator choice at a time.

Each branch decision is therefore one small legal rewrite choice, and each completed branch is one fully specified candidate solve.

### Pruning Rules

pdgsolve should prune partial branches aggressively.

At minimum, the search should prune a branch under the following conditions:

- primitive impossibility:
  the chosen support augmentation already has nonzero primitive imbalance in an exact-closure search;
- middle oversupply:
  the current left-generated middle inventory already exceeds the maximum possible right-required middle inventory for some assembly coordinate;
- middle undersupply:
  the current right-required middle inventory already exceeds the maximum possible left-generated middle inventory for some assembly coordinate;
- recipe impossibility:
  the remaining unassigned reactant occurrences cannot generate the assembly ingredients still required by unresolved product-side closures;
- absorption impossibility:
  the remaining unassigned product occurrences cannot absorb the middle assemblies already forced by the reactant-side choices;
- provenance impossibility:
  the partial provenance witness \(W\) can no longer be extended to a full carrier partition consistent with the chosen dissociate/associate laws;
- dominance:
  another branch with the same unresolved occurrence set is already no worse on middle mismatch, auxiliary burden, operator count, dissociation count, and provenance penalty;
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

For a partial branch \(s\), let \(U_{2}(s)\) be the unresolved reactant occurrences and \(U_{4}(s)\) the unresolved product occurrences.

For each middle-lane assembly coordinate \(m \in \mathcal{A}\), define the pass-thru-safe envelopes

$$
L^{-}_{s}(m)
=
x_{3}^{L}(m)

+ \sum_{\rho \in U_{2}(s)}
\min_{y \in \Lambda_{2}(a_{\rho})} y(m),
$$

$$
L^{+}_{s}(m)
=
x_{3}^{L}(m)

+ \sum_{\rho \in U_{2}(s)}
\max_{y \in \Lambda_{2}(a_{\rho})} y(m),
$$

$$
R^{-}_{s}(m)
=
x_{3}^{R}(m)

+ \sum_{\pi \in U_{4}(s)}
\min_{z \in \Lambda_{4}(a_{\pi})} z(m),
$$

$$
R^{+}_{s}(m)
=
x_{3}^{R}(m)

+ \sum_{\pi \in U_{4}(s)}
\max_{z \in \Lambda_{4}(a_{\pi})} z(m).
$$

Here \(a_{\rho}\) and \(a_{\pi}\) are the assemblies attached to those unresolved occurrences.

For every unresolved occurrence whose assembly lies in \(\mathcal{A}_{\mathrm{mid}}\), the corresponding family still contains the identity element \(e_{a}\).

So these envelopes automatically include the pass-thru possibility for every unresolved occurrence that is actually eligible for pass-thru.

So a middle-lane prune is safe only if one of the coordinatewise intervals is already disjoint:

$$
L^{-}_{s}(m) > R^{+}_{s}(m)
\quad\text{or}\quad
R^{-}_{s}(m) > L^{+}_{s}(m)
$$

for some \(m \in \mathcal{A}\).

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
O_{\mathrm{raw}} = (s^{-}, s^{+}, \phi_{2}, \phi_{4}).
$$

From that raw option, pdgsolve derives:

- the left-generated middle inventory \(x_{3}^{L}\);
- the right-required middle inventory \(x_{3}^{R}\);
- the completed provenance witness \(W\), if one exists;
- and the candidate score tuple \(\kappa\).

A raw option becomes an exact review candidate when:

- \(x_{3}^{L} = x_{3}^{R}\);
- the primitive imbalance is zero;
- and \(W\) closes as a complete provenance witness.

A raw option becomes a partial review candidate when:

- the branch is complete;
- but middle closure, primitive balance, or provenance closure still fails in an explicit diagnosable way.

Multiple raw options may canonicalize to the same review option family.

That should happen when they publish the same lane-1/lane-3/lane-5 assembly inventories, the same lane-2/lane-4 operator choices, and the same effective provenance/accounting summary.

So the review surface should not show every raw branch separately.

It should show ranked option families, each with:

- one canonical representative candidate;
- its score tuple;
- a summary of why it ranks where it does;
- and the count or description of equivalent raw branches folded into that family.

This yields a finite branch graph for any finite request.

The key reason is:

- there are only finitely many support augmentations \((s^{-}, s^{+}) \in \mathcal{S} \times \mathcal{S}\);
- each lane-3-capable reactant occurrence contributes one finite choice from \(\Lambda_{2}(a)\);
- each lane-3-capable product occurrence contributes one finite choice from \(\Lambda_{4}(a)\);
- each approved support-row law contributes one finite choice from its support-row family;
- \(\mathfrak{L}(x_{1})\) and \(\mathfrak{R}(x_{5})\) are therefore finite;
- and provenance matching is performed over a finite primitive carrier set.

So yes, this limited geometry is not merely drawable. It is mathematically enumerable.

### Solve Output Model

pdgsolve should return one pdgsolve-owned internal search result model from the search core.

That internal model should be solver-shaped rather than review-workflow-shaped.

It should be rich enough to carry:

- the selected candidate graph;
- any alternate candidate families worth surfacing;
- diagnostics and unsupported notes;
- explicit provenance/accounting summaries;
- and the information needed to publish into `pdgedit/v1` without making pdgedit reconstruct omitted semantics.

pdgsolve should not reuse the external `pdgsolve-result/v1` document as the native in-memory search-core shape.

Instead:

- the search core should return its own internal result model;
- the review layer should hold review workflow state such as selected family, accepted family, accepted record, and stale/published status;
- the publication layer should hold downstream publication state;
- and the app boundary should assemble `pdgsolve-result/v1` from those pieces.

This means:

- the search core does not own `review.state`, `acceptedFamilyId`, or `publication`;
- `pdgsolve-result/v1` is the external review/result contract, not the internal solver contract;
- the internal search result may later be serialized if another boundary genuinely needs it;
- but pdgsolve v1 should not force that internal model to become a public versioned JSON contract prematurely.

### Option Family Identity

pdgsolve review should surface option families rather than raw branches.

For completed raw options

$$
O_{\mathrm{raw}} = (s^{-}, s^{+}, \phi_{2}, \phi_{4}, W),
$$

two branches should belong to the same option family exactly when they agree on the full review-visible solve summary:

- the same support augmentation \((s^{-}, s^{+})\);
- the same lane-1, lane-3, and lane-5 assembly inventories;
- the same ordered lane-2 operator assignments after canonical reactant-occurrence ordering;
- the same ordered lane-4 operator assignments after canonical product-occurrence ordering;
- the same score tuple \(\kappa\);
- the same review-visible provenance summary;
- and the same diagnostic id set.

Two completed raw branches should not split into different option families merely because they:

- rename primitive carriers inside the witness;
- permute indistinguishable assembly occurrences with the same canonical occurrence index class;
- or differ only in low-level witness detail that leaves the published lane inventories, operator choices, diagnostics, and provenance summary unchanged.

The family key should therefore be

$$
\operatorname{fam}(O_{\mathrm{raw}})
=
\bigl(
s^{-},
s^{+},
x_{1},
x_{3},
x_{5},
\sigma_{2},
\sigma_{4},
\rho,
\kappa
\bigr),
$$

where \(\sigma_{2}\) and \(\sigma_{4}\) are the canonical ordered operator signatures and \(\rho\) is the canonical review-visible provenance summary.

Differing provenance-witness detail should create a different option family only when it changes \(\rho\).

So:

- witness detail that changes which assembly occurrence is the active rewrite source, spectator source, support source, or ambiguous source does change family identity;
- but witness detail that only renames equivalent primitive carriers does not.

The canonical representative of an option family should be the member with minimal deterministic tie-break key \(\tau\) inside that family.

### pdgsolve Result Contract

pdgsolve should freeze one external review/result contract named `pdgsolve-result/v1`.

That contract should be assembled from:

- the current internal pdgsolve search result;
- the current review-state record;
- and the current publication-state record.

At the top level, that contract should contain:

- `schema: "pdgsolve-result/v1"`;
- `problemId`;
- `searchStatus`, with values `exact_available`, `partial_only`, or `unsupported`;
- `bestFamilyId`;
- `acceptedFamilyId`, nullable summary field mirroring `review.acceptedFamilyId`;
- top-level `diagnostics`;
- `optionFamilies`;
- `review`, carrying the explicit review-state machine and any accepted lock record for the current result snapshot;
- and nullable `publication`, carrying downstream publication state only after an accepted record has actually been published or launched.

Each member of `optionFamilies` should contain:

- `familyId`;
- `kind`, with values `exact`, `partial`, or `unsupported`;
- `score`, carrying the concrete components of \(\kappa\);
- `augmentation`, with explicit left and right support choices;
- `laneInventories`, carrying canonical lane-1, lane-3, and lane-5 assembly multisets;
- `lane2Operators` and `lane4Operators`, each already ordered canonically by occurrence;
- `provenanceSummary`, carrying the family-level witness summary that review must see;
- `diagnostics`, carrying family-local diagnostics;
- `rawBranchCount`, the number of raw branches folded into the family;
- `publicationReady`, a boolean derived from exactness plus review-policy gates;
- and `canonicalCandidate`, the fully specified representative candidate used for publication if accepted.

So acceptance and publication are not the same state transition.

Acceptance should populate `review.acceptedRecord`.

Publication should populate `publication`.

### Candidate Scoring

pdgsolve should score candidates explicitly rather than relying on ad hoc success/failure buckets alone.

The score model should prefer, in order:

- exact conservation and exact product closure;
- zero primitive imbalance and zero middle-lane mismatch;
- fewer policy-added support rows;
- fewer non-identity operators;
- fewer dissociations when a less disruptive exact path exists;
- stronger provenance clarity;
- and stable deterministic tie-breaks over otherwise equal candidates.

For the current working support family, equal candidates should prefer the lower auxiliary support burden in the concrete order `none -> one_balanced_noether_core_pair -> two_balanced_noether_core_pairs`.

pdgsolve should formalize that ranking as a lexicographic minimization problem.

For a terminal candidate

$$
C = (s^{-}_{C}, s^{+}_{C}, \phi_{2,C}, \phi_{4,C}, x_{3,C}^{L}, x_{3,C}^{R}, W_{C}),
$$

define

$$
\kappa(C) =
\bigl(
\epsilon(C),
m_{\mathrm{prim}}(C),
m_{\mathrm{mid}}(C),
m_{\mathrm{aux}}(C),
n_{\mathrm{op}}(C),
n_{\mathrm{diss}}(C),
n_{\mathrm{amb}}(C),
\tau(C)
\bigr),
$$

with smaller values preferred, where:

- \(\epsilon(C) = 0\) when \(x_{3,C}^{L} = x_{3,C}^{R}\) and \(W_{C}\) is a complete provenance witness, and \(1\) otherwise;
- \(m_{\mathrm{prim}}(C) = \lVert \mu(R + s^{-}_{C}) - \mu(T + s^{+}_{C}) \rVert_{1}\);
- \(m_{\mathrm{mid}}(C) = \lVert x_{3,C}^{L} - x_{3,C}^{R} \rVert_{1}\), viewing the difference in \(\mathbb{Z}^{\mathcal{A}}\);
- \(m_{\mathrm{aux}}(C) = \alpha(s^{-}_{C}) + \alpha(s^{+}_{C})\);
- \(n_{\mathrm{op}}(C)\) is the total non-identity operator count in \(\phi_{2,C}\) and \(\phi_{4,C}\);
- \(n_{\mathrm{diss}}(C)\) is the dissociation count in \(\phi_{2,C}\);
- \(n_{\mathrm{amb}}(C)\) is the explicit ambiguity/provenance penalty count;
- and \(\tau(C)\) is a deterministic tie-break key.

Candidate comparison should be strictly lexicographic.

That means:

1. every exact candidate beats every non-exact candidate;
2. among exact candidates, lower primitive imbalance wins first;
3. then lower middle-lane mismatch wins;
4. then lower auxiliary burden wins;
5. then fewer non-identity operators wins;
6. then fewer dissociations wins;
7. then lower ambiguity/provenance penalty wins;
8. and finally \(\tau(C)\) breaks any remaining tie deterministically.

pdgsolve should score partial branches too, using an optimistic lower-bound score derived from the same tuple shape.

For a partial branch \(s\), the search should compute:

- whether exact closure is still possible;
- the unavoidable primitive imbalance already fixed by the chosen support augmentation;
- the minimum possible eventual middle-lane mismatch after all remaining assignments;
- the current auxiliary burden;
- the minimum additional operator burden still forced, with unresolved pass-thru choices contributing zero unless non-identity is provably necessary;
- and the minimum remaining ambiguity/provenance penalty.

If that lower-bound branch score is already worse than the current incumbent exact candidate, the branch should be pruned.

This is the branch-and-bound bridge between search and scoring.

For the current support family, the auxiliary burden weight should be

$$
\alpha(0) = 0, \qquad
\alpha(e_{\mathrm{pro\_noether\_core}} + e_{\mathrm{anti\_noether\_core}}) = 1, \qquad
\alpha(2e_{\mathrm{pro\_noether\_core}} + 2e_{\mathrm{anti\_noether\_core}}) = 2.
$$

This makes the current preference order exact in the math:

$$
\texttt{none}
\prec
\texttt{one\_balanced\_noether\_core\_pair}
\prec
\texttt{two\_balanced\_noether\_core\_pairs}.
$$

This means the limited lane/operator geometry is not just a legality constraint.

It is also the basis of a useful score function:

- whether the lane-1 and lane-5 primitive budgets match exactly;
- whether the left-generated and right-required middle inventories meet exactly;
- how much auxiliary material was required;
- how much structure had to be opened;
- how much structure had to be rebuilt;
- and how directly the accepted product set was reached.

An option family should inherit the score of its best canonical representative.

That means the review surface can show:

- the best option first;
- alternate exact options next, in score order;
- and partial or unsupported options after that, also in score order with explicit diagnostics.

### Deterministic Tie-Break Rule

pdgsolve should freeze the deterministic tie-break key \(\tau(C)\) rather than leaving it implicit.

For candidate comparison, define

$$
\tau(C)
=
\bigl(
\operatorname{ord}(s^{-}_{C}),
\operatorname{ord}(s^{+}_{C}),
\sigma_{2}(C),
\sigma_{4}(C),
\sigma_{3}(C),
\rho(C)
\bigr),
$$

with lexicographic comparison and the concrete orders:

- support augmentation order: `none < one_balanced_noether_core_pair < two_balanced_noether_core_pairs` on each side;
- canonical assembly order: lexicographic order of the canonical ids in \(\mathcal{A}_{\mathrm{v1}}\);
- reactant-occurrence order: normalized request order, with same-id duplicates numbered in first-seen order;
- product-occurrence order: normalized request order, with same-id duplicates numbered in first-seen order;
- lane-2 operator order: the sequence of operator assignments in reactant-occurrence order;
- lane-4 operator order: the sequence of operator assignments in product-occurrence order;
- and middle-inventory order: assembly counts listed in canonical assembly order.

For pdgsolve v1, the operator symbol order inside \(\sigma_{2}\) and \(\sigma_{4}\) should be:

- `pass_thru`;
- then `dissociate(row.beta.pro_down_quark_to_pro_up_quark.v1)`;
- then any later law-family symbol in the order those law ids are admitted into pdgsolve.

The provenance signature \(\rho(C)\) should summarize, in canonical product-occurrence order:

- whether each product occurrence is pure pass-thru, active rewrite output, or support-derived output;
- the support source rows, ordered first by canonical assembly id and then by normalized occurrence index;
- and any explicit ambiguity marker bits.

This means repeated runs over the same normalized problem must produce the same best-family representative even when the raw search explores equal-score branches in a different transient order.

### Diagnostic Codes

pdgsolve should freeze the first stable diagnostic ids now so later UI and fixture work does not guess at naming.

The initial v1 set should be:

| Diagnostic id | Phase | Meaning | Required payload |
| --- | --- | --- | --- |
| `pdgsolve.request.unsupported_assembly` | request | the request names an assembly outside pdgsolve v1 | requested token and attempted canonical id |
| `pdgsolve.request.invalid_support_role` | normalization | a support-only row was requested in a non-support role | assembly id and attempted role |
| `pdgsolve.normalization.support_added.noether_core_rows` | normalization | normalization added balanced `pro_noether_core` and `anti_noether_core` support rows | request id and added occurrence ids |
| `pdgsolve.normalization.support_required.noether_core_rows` | normalization | exact beta-family closure needs explicit or policy-allowed balanced Noether core support rows | request id and policy mode |
| `pdgsolve.search.primitive_imbalance` | search | \(\delta(Q; s^{-}, s^{+}) \neq 0\) for the retained branch or retained request summary | support choice and \((\delta_E, \delta_P)\) |
| `pdgsolve.search.middle_mismatch` | search | left-generated and right-required middle inventories do not close | support choice and canonical mismatch vector |
| `pdgsolve.search.provenance_failure` | search | no complete provenance witness extends the retained branch | retained operator summary and failing witness clause |
| `pdgsolve.search.unsupported_law_family` | search | exact closure would require a law family not admitted into pdgsolve v1 | missing law family id or descriptive token |
| `pdgsolve.search.non_exact_candidate_retained` | search | a partial or unsupported family was kept for review with explicit failure context | family id and retained failure mode |
| `pdgsolve.review.missing_pdgedit_publication_recipe` | review | the accepted family cannot yet be translated because one locked solve-graph unit has no admitted pdgedit publication recipe | family id and missing recipe id or unit id |
| `pdgsolve.review.not_publication_ready` | review | a family may be visible in review but is not publishable | family id and blocking reason |

### Review And Acceptance

pdgsolve should own the review boundary between solve-core output and pdgedit publication.

That means:

- pdgsolve may show candidate alternatives, ambiguity, residue, and unsupported families;
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

For pdgsolve v1, an option family \(F\) is publication-ready if and only if:

- `kind(F) = exact`;
- the current result snapshot is not `stale`;
- the family's canonical representative has \(\epsilon(F) = 0\);
- the family's primitive imbalance is zero;
- the family's middle mismatch is zero;
- the family's provenance witness is complete at the review-summary level;
- every assembly and operator unit in the family's canonical accepted-candidate graph, meaning the graph that would become `acceptedRecord.lockedSolveGraph` upon acceptance, has one admitted pdgedit publication recipe;
- the family has no blocking diagnostic among:
  `pdgsolve.request.unsupported_assembly`,
  `pdgsolve.request.invalid_support_role`,
  `pdgsolve.normalization.support_required.noether_core_rows`,
  `pdgsolve.search.primitive_imbalance`,
  `pdgsolve.search.middle_mismatch`,
  `pdgsolve.search.provenance_failure`,
  `pdgsolve.search.unsupported_law_family`,
  `pdgsolve.review.missing_pdgedit_publication_recipe`,
  or any later diagnostic explicitly marked `blocking`;
- and the family already carries the locked lane inventories, operator assignments, provenance summary, and accepted-solve graph needed for downstream translation without re-running search.

If any of those clauses fails, pdgsolve should set `publicationReady = false`.

In that case:

- the family may still appear in review;
- the operator may still inspect its diagnostics and provenance summary;
- but `accept_family` must fail with `pdgsolve.review.not_publication_ready`.

### Accepted Record

Acceptance should lock one pdgsolve-owned record before any pdgedit translation happens.

That record should have

- `schema: "pdgsolve-acceptance/v1"`;
- `problemId`;
- `familyId`;
- `resultDigest`, which is a deterministic digest of the normalized problem id, policy bundle, law-table id, family key, and canonical representative key;
- `acceptedScore`;
- `acceptedDiagnostics`;
- `acceptedState: "accepted"`;
- `lockedNormalizationSummary`;
- `lockedPolicySummary`;
- `lockedLaneInventories`;
- `lockedLane2Operators`;
- `lockedLane4Operators`;
- `lockedProvenanceSummary`;
- `lockedSolveGraph`, which for publishable v1 families must obey `schema: "pdgsolve-publication-graph/v1"` and must be the pdgsolve-owned accepted candidate graph that downstream publication will translate rather than reconstruct;
- and optional operator metadata such as `acceptedAt`, `acceptedBy`, and `acceptanceNote` when the runtime has them.

The accepted record should not contain the full raw-branch search tree.

It should contain exactly the information that must remain invariant once the operator says, "this is the candidate we mean."

So the accepted record is the review-side lock point.

The downstream publication step should read only from that lock record, not from a fresh search rerun and not from pdgedit-side heuristics.

### Translation Boundary To pdgedit

The translation into `pdgedit/v1` should happen before pdgedit reads the result.

That translation layer should own:

- mapping pdgsolve-side assemblies and operators into explicit pdgedit assemblies and operators;
- choosing explicit pdgedit tile payloads from pdgedit-owned catalogs and rules;
- converting solved connectivity into explicit pdgedit links;
- and deferring grouping labels or spans unless a dedicated post-solver display contract is admitted.

pdgsolve should treat `pdgedit/v1` as a publication boundary, not as an internal convenience sketch.

### Canonical Publication Pipeline

pdgsolve should support exactly one downstream publication pipeline:

1. start from one `pdgsolve-acceptance/v1` lock record;
2. validate that the lock record is still fresh and publication-ready;
3. translate `acceptedRecord.lockedSolveGraph` into one final `pdgedit/v1` document;
4. validate that `pdgedit/v1` document against the pdgedit boundary rules;
5. either publish the document durably with a manifest entry or launch pdgedit with that exact in-memory document;
6. and record the publication outcome back into the pdgsolve-side `publication` object.

No other route should be supported.

In particular:

- pdgsolve should not publish straight from a raw branch;
- pdgsolve should not publish straight from a non-accepted option family;
- pdgsolve should not ask pdgedit to infer missing rows, tiles, links, or labels from solver-native data;
- and pdgsolve should not rerun search during publication.

### Publication Graph Contract

For publishable v1 families, `acceptedRecord.lockedSolveGraph` should use the following exact top-level shape:

- `schema: "pdgsolve-publication-graph/v1"`;
- `units`;
- and `edges`.

Each `unit` record should contain:

- `id`;
- `kind`, with values `assembly` or `operator`;
- `lane`, with values `1`, `2`, `3`, `4`, or `5`;
- `recipeId`, naming the admitted pdgsolve-to-pdgedit publication recipe;
- `occurrenceKey`, the stable accepted occurrence identity from the locked solve;
- `title`, the accepted semantic title before pdgedit row-title expansion;
- and any recipe-required anchor or port-selection fields.

Each `edge` record should contain:

- `id`;
- `fromUnitId`;
- `fromPortId`;
- `toUnitId`;
- and `toPortId`.

So the accepted publication graph is still pdgsolve-owned, but it is already explicit about:

- which accepted units exist;
- which recipe expands each unit into pdgedit surface objects;
- and which accepted left-to-right connections must become pdgedit links.

### Admitted Publication Recipe Family

The first admitted recipe family should be `pdgsolve-pdgedit-recipes/v1-beta-minimal`.

That family should support exactly the current publishable beta-minimal row assemblies, composite recipes that expand into row assemblies, support rows, and operators:

| pdgsolve unit | Admitted recipe id | pdgedit row/composite type family | Expansion height | Display label text |
| --- | --- | --- | --- | --- |
| `neutron` | `pdgsolve.pdgedit.neutron.v1` | `pro-neutron-composite`; rows use quark `-assembly` types | `3` rows | `Neutron` |
| `pro_down_quark` | `pdgsolve.pdgedit.pro_down_quark.v1` | `pro-down-quark-assembly` | `1` row | `Pro Down Quark` |
| `pro_up_quark` | `pdgsolve.pdgedit.pro_up_quark.v1` | `pro-up-quark-assembly` | `1` row | `Pro Up Quark` |
| `pro_noether_core` | `pdgsolve.pdgedit.pro_noether_core.v1` | `pro-noether-core-assembly` | `1` row | `Pro Noether Core` |
| `anti_noether_core` | `pdgsolve.pdgedit.anti_noether_core.v1` | `anti-noether-core-assembly` | `1` row | `Anti Noether Core` |
| `noether_pair` | `pdgsolve.pdgedit.noether_pair.v1` | `noether-pair-composite`; rows use Noether Core `-assembly` types | `2` rows | `Noether Pair` |
| `2h` | `pdgsolve.pdgedit.2h.v1` | `noether-pair-composite`; rows use Noether Core `-assembly` types | `2` rows | `2H` |
| `4h` | `pdgsolve.pdgedit.4h.v1` | `noether-quad-composite`; rows use Noether Core `-assembly` types | `4` rows | `4H` |
| `proton` | `pdgsolve.pdgedit.proton.v1` | `pro-proton-composite`; rows use quark `-assembly` types | `3` rows | `Proton` |
| `electron` | `pdgsolve.pdgedit.electron.v1` | `pro-electron-assembly` | `1` row | `Pro Electron` |
| `electron_antineutrino` | `pdgsolve.pdgedit.electron_antineutrino.v1` | `anti-electron-neutrino-assembly` | `1` row | `Anti Electron Neutrino` |
| lane-2 `Dissociate` | `pdgsolve.pdgedit.operator.dissociate.v1` | `dissociate` | `1` row | none |
| lane-2 or lane-4 `Pass Thru` | `pdgsolve.pdgedit.operator.pass_thru.v1` | `pass-thru` | `1` row | none |
| lane-4 `Associate` | `pdgsolve.pdgedit.operator.associate.v1` | `associate` | `1` row | none |

No publication recipe in this family may publish a paired support token, a quad support token, or a particle-level grouping token as one pdgedit assembly row. Composite recipes must expand into explicit constituent row types.

If grouping labels, spans, or label tiles are later needed, they belong to the downstream display contract after solver publication, not to pdgsolve's internal assembly alphabet.

Likewise, if the published lane-3 assembly rows should be presented as `W-`, `W+`, or `Z` boson corridors, that reclassification or grouping belongs to pdgedit after publication. pdgsolve should emit the row-level lane-3 material and provenance only.

### Layout And Object Emission Rules

The publication adapter should materialize the final pdgedit surface deterministically from the accepted publication graph and the admitted recipe family.

The fixed pdgedit band origins are:

- reactant assemblies at `x = 2`;
- left operators at `x = 7`;
- intermediate assemblies at `x = 9`;
- right operators at `x = 14`;
- and product assemblies at `x = 16`.

Assembly emission should follow these rules:

- expand each assembly unit into the exact number of pdgedit assembly rows required by its recipe;
- assign the pdgedit assembly `role` from the pdgsolve lane: lane `1 -> reactant`, lane `3 -> intermediate`, lane `5 -> product`;
- place expanded rows contiguously in their band with no gaps;
- pack each assembly band independently in accepted lane order, top to bottom;
- emit row ids as `<unitId>.row.<n>` with `n` starting at `1`;
- emit row titles from the recipe row-title sequence;
- emit the exact `tiles` array from the admitted pdgedit recipe, not by rebuilding tiles from pdgsolve semantics at runtime;
- and leave grouping-label output empty until a downstream display contract admits it.

Operator emission should follow these rules:

- each operator unit becomes one pdgedit operator record;
- the pdgedit operator `type` comes directly from the admitted operator recipe;
- the visible operator `title` comes directly from that same recipe;
- `positrinoCount` and `electrinoCount` are the primitive counts of the exact accepted multiset carried by that operator unit;
- `x` comes from the fixed pdgedit operator band for that lane;
- and `y` is computed from the operator unit's explicit accepted anchor reference in `lockedSolveGraph`, not from ad hoc visual inference.

Operator links must preserve the same cardinality constraints as the solver graph:

- a lane-2 `Dissociate` object has exactly one incoming link, from one emitted 4-tile assembly reactant row;
- a lane-4 `Associate` object has exactly one outgoing link, to one emitted 4-tile assembly product row;
- and neither operator may use a grouping span as its endpoint.

### Link Emission Rules

The publication adapter should emit pdgedit links only from the accepted `edges` array plus the admitted port maps in the recipe family.

That means:

- assembly recipes must define the concrete emitted row ids associated with each accepted `fromPortId` or `toPortId`;
- operator recipes must define their concrete pdgedit endpoint id, which is the operator record id itself;
- one accepted publication edge may therefore expand into one or more pdgedit links when the accepted port map spans multiple emitted assembly rows;
- every emitted pdgedit link must already obey the neighboring-band rule and canonical left-to-right endpoint order;
- and no pdgedit link should be created by screen-geometry inference or by scanning nearby rows after the fact.

So the adapter's job is explicit expansion, not reconstruction.

### Publication Output Contract

The translation output should be one pdgsolve-owned package named `pdgsolve-pdgedit-package/v1`.

That package should contain:

- `schema: "pdgsolve-pdgedit-package/v1"`;
- `sourceAcceptanceDigest`;
- `publicationMode`, with values `durable` or `launch`;
- `documentId`, with the default stable form `<problemId>--<familyId>`;
- `documentTitle`, with a stable accepted-publication title derived from the request title or accepted family summary;
- `pdgeditDocument`, which must already satisfy `schema: "pdgedit/v1"`;
- and nullable `manifestEntry`, which is present only for durable publication.

When `manifestEntry` is present, it should already satisfy the pdgedit-side `pdgedit-library-manifest/v1` entry rules:

- `id`, which should default to `documentId`;
- `title`;
- `displayTitle`;
- and `documentPath`.

### Durable Publish And Launch

pdgsolve should support two downstream actions over the same `pdgsolve-pdgedit-package/v1` shape.

For `publish_accepted("durable")`, pdgsolve should:

- generate the final `pdgsolve-pdgedit-package/v1` package;
- write `pdgeditDocument` to the durable asset path selected by the publication runtime;
- write or update exactly one matching pdgedit manifest entry;
- and then set the pdgsolve review state to `published`.

For `publish_accepted("launch")`, pdgsolve should:

- generate the same final `pdgsolve-pdgedit-package/v1` package shape;
- omit any manifest write;
- hand the in-memory `pdgeditDocument` directly to the pdgedit launch path;
- and still set the pdgsolve review state to `published` for that accepted snapshot.

So durable publish and launch differ only in destination handling, not in translation semantics.

### Persistence And Launch

pdgsolve should be able to hand accepted results downstream in one of two ways:

- publish a durable `pdgedit/v1` document plus any needed manifest/library entry;
- or launch pdgedit with one explicit accepted in-memory document when persistence is not the goal.

The durable path should be the canonical reviewable path.

### Reverse Boundary From pdgedit

For pdgsolve v1, pdgedit should be downstream-only.

That means:

- a final `pdgedit/v1` document is a publication artifact, not a pdgsolve solve request;
- editing a pdgedit document does not implicitly create or mutate pdgsolve solve state;
- pdgsolve should not reverse-parse arbitrary pdgedit assemblies, operators, links, or grouping labels back into solver-native meaning;
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

### Minimum Regression Fixture Set

Before pdgsolve implementation is considered trustworthy, the first fixed regression denominator should be:

| Fixture id | Raw request | Key policy | Minimum expected outcome |
| --- | --- | --- | --- |
| `row_beta_exact` | `2 pro_down_quark + pro_up_quark -> pro_down_quark + 2 pro_up_quark + electron + electron_antineutrino` | implied beta support allowed | normalization adds two `pro_noether_core` rows and two `anti_noether_core` rows; best family is exact; auxiliary burden is `two_balanced_noether_core_pairs`; publication is ready after acceptance |
| `row_beta_support_disallowed` | `2 pro_down_quark + pro_up_quark -> pro_down_quark + 2 pro_up_quark + electron + electron_antineutrino` | `betaSupportMode = explicit-only` | no exact family; `pdgsolve.normalization.support_required.noether_core_rows` is present; retained best family is partial or unsupported |
| `primitive_imbalance_row_beta_source_to_target` | `2 pro_down_quark + pro_up_quark -> pro_down_quark + 2 pro_up_quark` | default | retained diagnostics include `pdgsolve.search.primitive_imbalance` with \((\delta_E, \delta_P) = (3, -3)\); no exact family exists |
| `pass_thru_row_beta_source` | `2 pro_down_quark + pro_up_quark -> 2 pro_down_quark + pro_up_quark` | default | three exact pass-thru rows; zero non-identity operators; zero ambiguity penalty |
| `first_multi_option_exact` | the first request admitted after the beta-minimal law set that yields at least two distinct exact option families | default | at least two exact option families remain after canonicalization, with stable score order and stable family representatives |

The last fixture is a gate on the first post-beta expansion.

So pdgsolve should not consider itself beyond the minimal single-family stage until that first genuine multi-option exact case exists and is under regression.

## Interfaces

### Inputs

- PDG-backed request data emitted by [pdgfeed](./pdgfeed.md);
- built-in pdgsolve fixture requests;
- explicit developer-loaded request documents;
- pdgsolve-owned solve policy and review state;
- and pdgsolve-owned reopened work-item references when one already exists.

### Outputs

- pdgsolve-owned candidate solve results suitable for review;
- accepted pdgsolve publication state;
- final `pdgedit/v1` documents;
- pdgedit manifest-ready publication entries or equivalent launch-ready selection state;
- and developer-facing diagnostics about solve completeness, ambiguity, unsupported families, and publish readiness.

### Upstream And Downstream Boundaries

pdgsolve should:

- accept explicit upstream request data;
- own solve normalization, search, review, and publication;
- and hand explicit final pdgedit documents downstream.

pdgsolve should not:

- ask pdgedit to parse raw solver-native problem or result data;
- treat arbitrary `pdgedit/v1` documents as invertible pdgsolve requests;
- duplicate PDG normalization logic locally;
- or let launcher/runtime concerns become the source of solve semantics.

### Neighboring Components

- [pdgfeed](./pdgfeed.md) owns upstream PDG normalization and request emission.
- [pdgedit](./pdgedit.md) owns the final tile surface, placement grammar, and pdgedit-side document model.
- [pdgapps](pdgapps.md) owns the cross-app boundary and modularity rules that apply here.

## Priorities

### 1. Replace The Fixture-Template Solver With Row-Level Search

Status: `active`

Current:

- `PdgsolveSolveRuntime.js` still classifies a small set of assembly-count scenarios and patches frozen result fixtures into returned results;
- that path preserves known examples, but it is not yet the row-level combinatorial solver described above;
- and current solver-quality issues make this the highest-priority pdgsolve risk.

Objective:

- implement the solver-native row-level search over explicit assembly rows, local lane-2 and lane-4 operator choices, support-row reservations, conserved inventories, provenance witnesses, pruning, and deterministic scoring;
- generate `pdgsolve-result/v1` option families from branch-state records rather than from patched result templates;
- keep the existing request, review, acceptance, and pdgedit publication seams unless the new solver proves a contract change is required.

### 2. Treat Frozen Result Fixtures As Regression Oracles

Status: `active`

Current:

- frozen `pdgsolve-result/v1` fixtures are currently imported by the runtime solver and used as result templates;
- those fixtures are valuable as regression examples, but they should not be the implementation of solving.

Objective:

- keep the current beta, support-disallowed, primitive-imbalance, pass-thru, and publication fixtures as expected-output oracles;
- change the runtime solver so it computes those results from the row-level model;
- update tests so fixture drift catches solver regressions without allowing fixture JSON to masquerade as solver logic.

### 3. Keep Solver Correctness On The Active Priority Queue

Status: `active`

Current:

- the prior priority list said there were no active pdgsolve items;
- that is no longer an honest status while the current solver is known to perform poorly on candidate solutions.

Objective:

- keep pdgsolve solver correctness active until the row-level search replaces fixture-template solving and passes the frozen beta-minimal regression set;
- promote the deferred `first_multi_option_exact` fixture only after the new search core can produce, canonicalize, score, and explain multiple exact option families deterministically.

## Related Priorities

- [pdg](./pdg.md)
- [pdgfeed](./pdgfeed.md)
- [pdgedit](./pdgedit.md)
- [pdgapps](pdgapps.md)

## Deferred Priorities

1. `first_multi_option_exact` — Add the first post-beta regression fixture that yields at least two distinct exact option families after canonicalization, then freeze its stable score order and stable family representatives under pdgsolve regression. Status: `deferred`.
