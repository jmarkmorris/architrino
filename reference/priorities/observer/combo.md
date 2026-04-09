# Combo App

## LLM Instructions

- Keep this document focused on Combo as the next-generation solver app paired with [xyzzy](./xyzzy.md).
- Treat the current `reaction` app and current solver as prototypes and learning references only, not as compatibility targets.
- Re-evaluate rules from first principles rather than preserving legacy UI artifacts, anchor conventions, or document shapes by inertia.
- Keep `Design` about durable boundaries, solve-state concepts, and review/publication workflow ownership rather than temporary migration tactics.
- Keep `Priorities` ordered as the active work queue.
- Do not restate low-level PDG ingest internals or Xyzzy tile-rendering internals except where Combo depends on them.

## Purpose

Combo is the next-generation solve app.

It sits between upstream request sources and downstream Xyzzy documents.

It owns:

- intake of explicit solve requests from upstream sources such as [pdgfeed](./pdgfeed.md), fixtures, and direct developer input;
- normalization of those requests into a Combo-owned solve problem;
- combinatorial search over conservative solve candidates;
- review and acceptance of candidate solve outcomes;
- publication of accepted results into final `xyzzy/v1` documents;
- and the workflow state that connects upstream request choice to downstream Xyzzy launch.

It does not own:

- PDG data access and normalization logic that belongs in [pdgfeed](./pdgfeed.md);
- Xyzzy tile grammar, placement grammar, manifest consumption, or direct object editing that belong in [xyzzy](./xyzzy.md);
- observer-stage presentation/runtime behavior that belongs downstream of accepted Xyzzy output;
- or compatibility obligations to the prototype `reaction-flow/v1`, legacy Reaction canvas state, or legacy solver projection behavior unless those are intentionally re-adopted on their own merits.

## Current State

- There is no dedicated Combo app runtime yet.
- The current `reaction` app and current solver together act as the prototype solve/review flow.
- [xyzzy](./xyzzy.md) now defines the downstream authored-surface boundary more clearly than the old Reaction flow did.
- [pdgfeed](./pdgfeed.md) already exists as an upstream request-producing component.
- The old solver contracts, old Reaction surface grammar, and old projection adapters are useful learning references, but they should not dictate Combo structure by default.
- The next major design task is therefore not migration glue. It is defining Combo's native request model, native search model, native review boundary, and native publication path into Xyzzy.

## Design

### Role In The Product

Combo should become the dedicated solve-and-review app that mates with Xyzzy.

The intended high-level flow is:

- `pdgfeed` or another upstream source emits a solve request;
- Combo loads that request;
- Combo runs the solve;
- Combo reviews one or more candidate outcomes;
- Combo accepts one outcome for publication;
- Combo publishes a final `xyzzy/v1` document;
- and Xyzzy renders or edits that final authored-surface document.

Combo should therefore replace the current solver-app role.

Xyzzy should therefore replace the current Reaction-app role.

### Foundational Stance

Combo should be designed from ground zero.

That means:

- no obligation to preserve legacy Reaction lane widgets, anchor ids, operator UI shapes, or import/export conventions merely because they exist;
- no obligation to preserve the old split between browser solver behavior and external solver behavior;
- no obligation to preserve prototype request/result contracts unless they still serve the new architecture cleanly;
- and every retained rule should justify itself in terms of solve semantics, reviewability, determinism, and the downstream Xyzzy boundary.

Prototype behavior may still inform:

- conserved-ledger semantics;
- operator family meaning;
- useful fixture cases;
- and examples of successful or failed closure families.

Prototype UI artifacts should not define Combo's architecture.

### Runtime Shape

The durable Combo shape should separate:

- request intake;
- request normalization;
- solve-core search;
- candidate review;
- acceptance/publication;
- and downstream Xyzzy launch or persistence.

Large coordinator files may assemble those pieces, but they should not become the long-term home of solver semantics.

### Fundamental Solve Geometry

Combo should start from one deliberately limited solve geometry.

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

Combo should treat this as a combinatorial state graph, not as screen geometry.

That means:

- lane position is semantic;
- row order may matter for deterministic identity and publication order;
- but solve legality must not depend on DOM layout, pixel coordinates, or render-time anchor inference.

If spacetime material is permitted, it should enter through a deliberately limited boundary rule rather than as arbitrary free placement.

For the current working direction, that means:

- spacetime-derived composites such as `2H` and `4H` are legal assemblies;
- they may appear only at the outer reactant/product boundaries as lane-1 reactants or lane-5 products;
- they are beyond the current state of detection and should therefore carry explicit provenance rather than being treated as ordinary authored-visible assemblies;
- they are not lane-3 center assemblies;
- they are not arbitrary middle-lane insertions;
- and they are not free-floating geometry owned by the renderer.

For mathematical purposes, Combo should model one solve family with a finite assembly alphabet \(\mathcal{A}\).

The current spacetime-boundary family is the distinguished subset

$$
\mathcal{A}_{\mathrm{st}} = \{\mathrm{2H}, \mathrm{4H}\} \subset \mathcal{A}.
$$

Each assembly lane should be represented as a multiset vector in \(\mathbb{N}^{\mathcal{A}}\).

If \(x_{\ell} \in \mathbb{N}^{\mathcal{A}}\) is the inventory at lane \(\ell \in \{1, 3, 5\}\), then \(x_{\ell}(a)\) is the multiplicity of assembly \(a\) in that lane.

For the current working boundary policy, Combo should enumerate over the finite augmentation family

$$
\mathcal{B} = \{0, e_{\mathrm{2H}}, e_{\mathrm{4H}}\},
$$

where \(e_{a}\) is the unit multiset for assembly \(a\).

A concrete solve attempt is therefore an augmented request

$$
(R, T, b^{-}, b^{+}) \in \mathbb{N}^{\mathcal{A}} \times \mathbb{N}^{\mathcal{A}} \times \mathcal{B} \times \mathcal{B},
$$

with effective reactant inventory \(R + b^{-}\) and effective product inventory \(T + b^{+}\).

This boundary family can later widen, but Combo v1 should keep it finite and explicit.

### Operator Semantics

Combo should keep the operator family deliberately small.

`Pass Thru` means:

- one assembly-side input continues forward as the same provenance-carrying block;
- no decomposition occurs;
- and no new assembly identity is created.

`Dissociate` means:

- one reactant-side assembly is opened;
- the resulting output is a constrained set of lane-3 assemblies determined by the decomposition law for that assembly family;
- the original provenance block is refined into smaller provenance blocks with the same union;
- and the total conserved ledger is preserved across the split.

`Associate` means:

- one or more lane-3 assemblies are gathered into one lane-5 assembly;
- the operation is legal only when the gathered material exactly satisfies the product assembly recipe;
- the gathered provenance blocks are coarsened into one larger provenance block with the same union;
- and the total conserved ledger is preserved across the gather-and-assemble step.

Combo should not widen the operator family casually.

The more precise the operator grammar is, the more tractable the search space becomes.

Combo should model the nontrivial operators as finite law tables.

For dissociation, each assembly \(a \in \mathcal{A}\) has a finite set

$$
\Delta(a) \subset \mathbb{N}^{\mathcal{A}},
$$

where each \(d \in \Delta(a)\) is one legal dissociation output multiset for \(a\).

For association, each assembly \(a \in \mathcal{A}\) has a finite set

$$
\Gamma(a) \subset \mathbb{N}^{\mathcal{A}},
$$

where each \(g \in \Gamma(a)\) is one legal gathered input multiset that can assemble into \(a\).

`Pass Thru` is the identity law and therefore does not need a separate family table.

The important constraint is that \(\Delta\) and \(\Gamma\) are finite for a fixed solve family.

Unary assembly laws should remain the default.

But Combo may also introduce a small number of finite local cluster laws over explicit reactant-side multisets when exact provenance requires a jointly treated local support cluster.

That move is acceptable only when:

- the participating reactant-side assemblies remain explicit in the normalized solve problem;
- the cluster law has fixed explicit conserved-content meaning;
- and the cluster law removes ambiguity rather than hiding support inside a renamed unary symbol.

### First Worked Weak Law: Free Neutron Beta Reaction

The first concrete worked weak family should be the free neutron `beta reaction` (SM label: `free neutron decay`).

In the AAA ledger, one \(u\) and one \(d\) are spectators, while the second \(d\) is the active agent, and the reaction also relies on a minimal neutral weak-support environment.

Combo should therefore not claim that bare

$$
\Delta(\mathrm{neutron}) \ni \mathrm{proton} + e^- + \bar{\nu}_e
$$

unless the required weak-support inventory is also explicit in the normalized reactant multiset.

The clean Combo-v1 way to encode this is:

- during normalization, when the request and active policy justify the free-neutron beta family, make the minimal weak-support environment explicit as a reactant-side `Noether Pair`;
- represent the normalized reactant-side multiset as

$$
x_{1,\beta} = e_{\mathrm{neutron}} + e_{\mathrm{noether\_pair}};
$$

- and treat that pair as one admissible local weak-support cluster for a finite beta-family cluster law.

Then the first worked dissociation law is the explicit local cluster rule

$$
\Delta_{\beta}\!\left(
e_{\mathrm{neutron}} + e_{\mathrm{noether\_pair}}
\right)
=
\left\{
e_{\mathrm{proton}} + e_{e^-} + e_{\bar{\nu}_e}
\right\}.
$$

This law should carry the following provenance witness requirements:

- one spectator \(u\) from the neutron passes into the proton unchanged;
- one spectator \(d\) from the neutron passes into the proton unchanged;
- one active \(d\) from the neutron rewrites into the proton's active \(u\);
- the explicit `Noether Pair` dissociates into the minimal pro/anti weak-support carriers required by the accepted AAA beta ledger;
- the electron and electron-antineutrino receive explicit provenance from that reactant-side support assembly according to that ledger;
- and every product architrino is therefore traced either to the neutron or to the explicit `Noether Pair`.

In lane terms, the baseline exact family is:

- lane 1: two explicit reactant occurrences, `neutron` and `Noether Pair`;
- lane 2: one beta-family `Dissociate` choice over that local reactant cluster;
- lane 3: `proton + electron + electron-antineutrino`;
- lane 4: `Pass Thru` on each of those product assemblies;
- lane 5: `proton + electron + electron-antineutrino`.

This gives Combo its first fully readable weak worked example:

- one non-identity reactant-side operator;
- zero product-side associations;
- zero boundary `2H` / `4H` burden in the baseline exact family;
- one explicit spacetime-style support reactant via `Noether Pair`;
- explicit spectator carry-through;
- explicit active-agent rewrite;
- and explicit product provenance.

If normalization cannot justify that explicit `Noether Pair` support reactant under the active request and policy bundle, Combo should not promote the branch to an exact neutron-beta closure.

It should keep the case partial or unsupported until the missing support reactant or provenance assumptions are made explicit.

### Request Intake

Combo should support a small number of explicit entry modes:

- built-in request manifests backed by canonical fixtures;
- PDG-backed requests emitted by [pdgfeed](./pdgfeed.md);
- direct load of explicit request JSON by a developer or advanced user;
- and reopened Combo work items carried by Combo-owned ids or records.

Combo should consume explicit request data rather than hidden app-local state.

### Solve Problem Model

Combo should define one Combo-owned solve problem model that is solver-native rather than UI-native.

That solve problem model should describe:

- reactant-side assemblies or inventories;
- product-side assemblies or inventories;
- any explicit center material;
- any optional spacetime-derived boundary assemblies such as `2H` or `4H`;
- the permitted operator grammar;
- policy or theory gates;
- and provenance/accounting requirements.

That solve problem model should avoid:

- DOM-derived geometry;
- render-order assumptions;
- CSS-lane artifacts;
- UI-only node-key packing;
- and other state that exists only because an earlier app rendered something first.

Mathematically, Combo should describe one solve instance as

$$
Q = (\mathcal{A}, \mathcal{P}, \mu, R, T, \mathcal{B}, \Delta, \Gamma, \Pi),
$$

where:

- \(\mathcal{A}\) is the finite assembly alphabet for the active solve family;
- \(\mathcal{P}\) is the basis of conserved primitive content;
- \(\mu : \mathcal{A} \to \mathbb{N}^{\mathcal{P}}\) is the conserved-content map;
- \(R, T \in \mathbb{N}^{\mathcal{A}}\) are the requested reactant and product multisets;
- \(\mathcal{B}\) is the allowed spacetime-boundary augmentation family;
- \(\Delta\) and \(\Gamma\) are the dissociation and association law tables;
- and \(\Pi\) is the active policy bundle.

For Combo v1, the minimal explicit conserved basis should be

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

For shorthand, Combo should define the primitive counts

$$
N_{E}(x) = \mu(x)_{\mathrm{Electrino}}, \qquad N_{P}(x) = \mu(x)_{\mathrm{Positrino}}.
$$

These are the first conserved sums that must match across the solve.

### V1 Assembly Table

Before Combo implementation begins, the first executable family should freeze one minimal assembly alphabet.

For Combo v1, that alphabet should be

$$
\mathcal{A}_{\mathrm{v1}}
=
\{
\mathrm{2h},
\mathrm{4h},
\mathrm{electron},
\mathrm{electron\_antineutrino},
\mathrm{neutron},
\mathrm{noether\_pair},
\mathrm{proton}
\}.
$$

The v1 assembly table should be:

| Canonical id | Display label | Allowed lane roles in Combo v1 | \(\mu(a) = (N_E, N_P)\) | v1 note |
| --- | --- | --- | --- | --- |
| `neutron` | `Neutron` | lanes `1`, `3`, `5` | \((18, 18)\) | intact baryon carry-through is legal |
| `proton` | `Proton` | lanes `1`, `3`, `5` | \((15, 21)\) | intact baryon carry-through is legal |
| `electron` | `Electron` | lanes `1`, `3`, `5` | \((9, 3)\) | charged lepton assembly |
| `electron_antineutrino` | `Electron Antineutrino` | lanes `1`, `3`, `5` | \((6, 6)\) | neutral lepton assembly |
| `noether_pair` | `Noether Pair` | lane `1` explicit support reactant only | \((12, 12)\) | explicit weak-support carrier; not a lane-3 assembly in v1 |
| `2h` | `2H` | lane `1` or lane `5` boundary augmentation only | \((6, 6)\) | anonymous two-core spacetime supplement |
| `4h` | `4H` | lane `1` or lane `5` boundary augmentation only | \((12, 12)\) | anonymous four-core spacetime supplement |

The frozen v1 bookkeeping values should therefore include:

- \(\mu(\mathrm{proton}) = 2\mu(u) + \mu(d) = (15, 21)\);
- \(\mu(\mathrm{neutron}) = \mu(u) + 2\mu(d) = (18, 18)\);
- \(\mu(\mathrm{electron}) = (9, 3)\);
- \(\mu(\mathrm{electron\_antineutrino}) = (6, 6)\);
- \(\mu(\mathrm{noether\_pair}) = \mu(\mathrm{4h}) = (12, 12)\);
- and \(\mu(\mathrm{4h}) = 2\mu(\mathrm{2h}) = (12, 12)\).

Combo v1 should treat equality of \(\mu\) as necessary for conservation, not as permission to identify assemblies.

In particular:

- `noether_pair` and `4h` share the same primitive counts;
- but they remain different assemblies with different provenance meaning and lane-role rules;
- and no normalization or ranking rule should collapse them into one symbol merely because their primitive ledgers match.

### V1 Law Tables

Combo v1 should freeze a deliberately small executable law family.

For unary laws, the initial tables should be empty:

$$
\Delta(a) = \varnothing,
\qquad
\Gamma(a) = \varnothing,
\qquad
a \in \mathcal{A}_{\mathrm{v1}}.
$$

So in Combo v1, the only unary rewrite available for any lane-3-capable single assembly occurrence is `Pass Thru`.

The first and only non-identity executable law family should be the explicit neutron-beta support cluster rule

$$
\Lambda_{2}^{\mathrm{cl}}\!\left(
e_{\mathrm{neutron}} + e_{\mathrm{noether\_pair}}
\right)
=
\left\{
e_{\mathrm{proton}}
+ e_{\mathrm{electron}}
+ e_{\mathrm{electron\_antineutrino}}
\right\}.
$$

That law should be frozen as the following v1 record:

| Law id | Input multiset | Output multiset | Lane-2 operator tag | Lane-4 operator tags | Required provenance summary |
| --- | --- | --- | --- | --- | --- |
| `cluster.beta.neutron_noether_pair.v1` | `neutron + noether_pair` | `proton + electron + electron_antineutrino` | `Dissociate` | `Pass Thru`, `Pass Thru`, `Pass Thru` | spectator `u`, spectator `d`, active `d -> u`, and lepton-support provenance from `Noether Pair` |

Combo v1 should admit no other non-identity law family.

That means:

- there is no unary neutron dissociation rule in v1;
- there is no generic `Noether Pair -> ...` unary rule in v1;
- boundary-only assemblies such as `noether_pair`, `2h`, and `4h` do not receive unary pass-thru in v1 because they are not lane-3 assemblies;
- there is no association table yet beyond identity pass-thru;
- and any branch that requires another non-identity law family should terminate with an explicit unsupported-law diagnostic rather than a guessed closure.

### Normalization Rules

Combo should normalize every upstream request into one explicit `combo-problem/v1` record before search begins.

The raw request contract should remain small.

It should carry:

- `schema: "combo-request/v1"`;
- `requestId`;
- `source.kind`, for example `fixture`, `pdgfeed`, or `developer`;
- explicit reactant-side and product-side occurrence lists;
- and optional policy overrides.

Normalization should then do the following, in order:

1. canonicalize every upstream particle token into one Combo v1 assembly id, for example `n -> neutron`, `p -> proton`, `e- -> electron`, and `anti-electron-neutrino -> electron_antineutrino`;
2. preserve the resulting occurrence order so the search can assign stable occurrence indices later;
3. reject any assembly outside \(\mathcal{A}_{\mathrm{v1}}\) with `combo.request.unsupported_assembly`;
4. freeze the active primitive basis as \(\mathcal{P}_{0}\), the law table as `combo-laws/v1-beta-minimal`, and the augmentation family as \(\mathcal{B} = \{0, e_{\mathrm{2h}}, e_{\mathrm{4h}}\}\) unless the request narrows that family explicitly;
5. build the requested multisets \(R\) and \(T\);
6. preserve any explicit authored or request-side `noether_pair` reactant occurrence as authored support rather than rewriting it into `2h`;
7. when the raw request is the free-neutron beta family and policy `betaSupportMode = allow-implied-noether-pair`, add one normalized `noether_pair` reactant occurrence if one is not already explicit, mark it as normalized support, and emit `combo.normalization.support_added.noether_pair`;
8. when the raw request is the free-neutron beta family but policy `betaSupportMode = explicit-only`, do not synthesize support; keep \(R\) unchanged and emit `combo.normalization.support_required.noether_pair`;
9. keep explicit request-side `2h` and `4h` occurrences in \(R\) or \(T\) only when they already occupy boundary-side roles in the request contract;
10. keep `noether_pair` only as an explicit reactant-side support assembly in Combo v1;
11. reject any attempt to place `noether_pair`, `2h`, or `4h` outside their frozen v1 lane-role rules with `combo.request.invalid_boundary_role`; and
12. emit one solver-native problem record whose content is fully sufficient for search without any DOM or renderer lookup.

The normalized Combo problem contract should be:

- `schema: "combo-problem/v1"`;
- `problemId`;
- `requestId`;
- `source`;
- `reactants` and `products`, each as both ordered occurrence lists and multiset summaries;
- `assemblyAlphabetId: "combo-assemblies/v1-minimal"`;
- `primitiveBasisId: "combo-primitives/electrino-positrino/v1"`;
- `lawTableId: "combo-laws/v1-beta-minimal"`;
- `allowedBoundaryAugmentations`, with left and right values drawn from `none`, `2h`, and `4h`;
- `policy`;
- and `normalization`, containing explicit notes about added support material and normalization diagnostics.

### Conserved Balance Equations

Combo should make the balance laws explicit at assembly lanes 1, 3, and 5.

Because architrinos have provenance in \(\mathbb{A}\mathbb{A}\mathbb{A}\), the correct solve picture is not a disappearing flow ledger.

It is one fixed primitive carrier set viewed through three different lane-wise assembly partitions.

For a chosen boundary augmentation pair \((b^{-}, b^{+})\), define the full boundary inventories

$$
x_{1} = R + b^{-}, \qquad x_{5} = T + b^{+}.
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

In particular, Combo must preserve the Electrino and Positrino counts separately:

$$
N_{E}(x_{1}) = N_{E}(x_{3}) = N_{E}(x_{5}),
$$

$$
N_{P}(x_{1}) = N_{P}(x_{3}) = N_{P}(x_{5}).
$$

So the reaction does not merely conserve totals in the aggregate.

It preserves one underlying architrino population whose grouping changes from lane to lane.

If a request fails these equalities at the boundary, Combo should not silently repair that mismatch.

Instead, it should report the primitive imbalance vector

$$
\delta(Q; b^{-}, b^{+}) = \mu(x_{1}) - \mu(x_{5}) \in \mathbb{Z}^{\mathcal{P}_{0}},
$$

with the concrete components

$$
\delta_{E} = N_{E}(x_{1}) - N_{E}(x_{5}), \qquad
\delta_{P} = N_{P}(x_{1}) - N_{P}(x_{5}).
$$

If \(\delta(Q; b^{-}, b^{+}) \neq 0\), then exact closure is impossible for that augmentation pair.

So at the first primitive level, Combo should always be able to say:

- Electrinos balanced or imbalanced by \(\delta_{E}\);
- Positrinos balanced or imbalanced by \(\delta_{P}\);
- and whether any allowed boundary assemblies such as `2H` or `4H` remove that deficit exactly.

### Combinatorial Search Model

Combo should treat solving as an explicit combinatorial search problem.

The search design should specify:

- what one branch-state record contains;
- what counts as one candidate expansion;
- how operators such as `Pass Thru`, `Dissociate`, and `Associate` expand the state;
- how conservation and provenance prune illegal branches;
- how residue, ambiguity, and unsupported cases are represented explicitly;
- and how deterministic ranking chooses one accepted candidate over other legal candidates.

The search model should remain planner-first rather than surface-first.

The related search material in [solver](./solver.md) is relevant here as neighboring groundwork, not as a finished Combo spec.

This limited geometry should be exploited aggressively.

In particular:

- each lane-1 lane-3-capable assembly presents a small action set, typically `Pass Thru` or `Dissociate`;
- each lane-3 assembly or assembly-set presents a small action set, typically `Pass Thru` or `Associate`;
- candidate growth therefore comes from combinations of a bounded family of local choices rather than from unconstrained geometric routing;
- and that bounded choice structure makes branch scoring and pruning practical.

Let

$$
\mathcal{A}_{\mathrm{mid}} \subset \mathcal{A}
$$

be the subset of assemblies that are legal lane-3 assemblies in the active solve family.

For lane 2, Combo should define the unary local reactant rewrite family only on \(\mathcal{A}_{\mathrm{mid}}\):

$$
\Lambda_{2}(a) = \{e_{a}\} \cup \Delta(a), \qquad a \in \mathcal{A}_{\mathrm{mid}},
$$

where \(e_{a}\) represents `Pass Thru` and each \(d \in \Delta(a)\) represents one legal `Dissociate` output.

Boundary-only support or augmentation assemblies are therefore not given unary lane-2 pass-thru merely by belonging to \(\mathcal{A}\).

They enter the search only through approved cluster or boundary rules.

For a small finite set of worked weak families, Combo may also define explicit local reactant-cluster rewrites over a reactant multiset

$$
c \in \mathbb{N}^{\mathcal{A}},
$$

with a finite cluster family

$$
\Lambda_{2}^{\mathrm{cl}}(c).
$$

The free-neutron beta-family rule above is the first example:

$$
\Lambda_{2}^{\mathrm{cl}}\!\left(
e_{\mathrm{neutron}} + e_{\mathrm{noether\_pair}}
\right)
\ni
e_{\mathrm{proton}} + e_{e^-} + e_{\bar{\nu}_e}.
$$

Search should treat such a cluster as one assignable local lane-2 unit after reserving the participating reactant occurrences explicitly.

For lane 4, Combo should define the unary local product-closure family only on \(\mathcal{A}_{\mathrm{mid}}\):

$$
\Lambda_{4}(a) = \{e_{a}\} \cup \Gamma(a), \qquad a \in \mathcal{A}_{\mathrm{mid}},
$$

where \(e_{a}\) represents `Pass Thru` and each \(g \in \Gamma(a)\) represents one legal lane-3 input multiset that can `Associate` into \(a\).

Given a full lane-1 inventory \(x_{1}\) and a chosen reservation of any cluster-assigned reactant occurrences, the remaining unary left-generated middle family is

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

These unary families are understood after removing any occurrences already reserved into approved lane-2 cluster rewrites.

So in the beta-family case, the reserved cluster output is added into \(x_{3}^{L}\) before the meet-in-the-middle comparison is evaluated.

An exact solve for the augmentation pair \((b^{-}, b^{+})\) therefore requires

$$
\exists x_{3} \in \mathfrak{L}(x_{1}) \cap \mathfrak{R}(x_{5}),
$$

together with a provenance witness showing that the chosen left and right rewrite families act on the same fixed primitive carrier set \(\Omega\).

One useful branch-state record is

$$
s = (b^{-}, b^{+}, \phi_{2}, \phi_{4}, x_{3}^{L}, x_{3}^{R}, W),
$$

where:

- \(\phi_{2}\) is a partial assignment of lane-2 choices to reactant assembly occurrences;
- \(\phi_{2}\) may assign either unary reactant occurrences or one approved local reactant cluster;
- \(\phi_{4}\) is a partial assignment of lane-4 choices to product assembly occurrences;
- \(x_{3}^{L}\) is the partial middle inventory generated from lane 1;
- \(x_{3}^{R}\) is the partial middle inventory required by lane 5;
- and \(W\) is the current partial provenance witness.

Combo should execute this search as a bounded meet-in-the-middle enumeration.

The operational loop should be:

1. choose one augmentation pair \((b^{-}, b^{+})\);
2. reject that pair immediately if the primitive imbalance vector \(\delta(Q; b^{-}, b^{+})\) is nonzero and the current search mode requires exact closure;
3. initialize the empty branch state with no lane-2 or lane-4 assignments;
4. choose the next unassigned reactant or product assembly occurrence, preferring the side with fewer legal local rewrites or tighter middle-lane constraints;
5. expand that occurrence by one member of \(\Lambda_{2}(a)\) or \(\Lambda_{4}(a)\), or reserve one approved local reactant cluster when the active family allows it;
6. update the partial middle inventories \(x_{3}^{L}\) and \(x_{3}^{R}\), and update the partial provenance witness \(W\);
7. prune the branch if the remaining unassigned occurrences can no longer close the middle or provenance constraints;
8. continue until all reactant and product occurrences are assigned;
9. emit a terminal candidate when the completed branch has a complete provenance witness and a scored middle-lane outcome.

So the search does not guess full reactions in one jump.

It builds them one local operator choice at a time.

Each branch decision is therefore one small legal rewrite choice, and each completed branch is one fully specified candidate solve.

### Pruning Rules

Combo should prune partial branches aggressively.

At minimum, the search should prune a branch under the following conditions:

- primitive impossibility:
  the chosen augmentation pair already has nonzero primitive imbalance in an exact-closure search;
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

So Combo should not prune a branch merely because:

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
O_{\mathrm{raw}} = (b^{-}, b^{+}, \phi_{2}, \phi_{4}).
$$

From that raw option, Combo derives:

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

- there are only finitely many augmentation pairs \((b^{-}, b^{+}) \in \mathcal{B} \times \mathcal{B}\);
- each lane-3-capable reactant occurrence contributes one finite choice from \(\Lambda_{2}(a)\);
- each lane-3-capable product occurrence contributes one finite choice from \(\Lambda_{4}(a)\);
- each approved local reactant cluster contributes one finite choice from its cluster family;
- \(\mathfrak{L}(x_{1})\) and \(\mathfrak{R}(x_{5})\) are therefore finite;
- and provenance matching is performed over a finite primitive carrier set.

So yes, this limited geometry is not merely drawable. It is mathematically enumerable.

### Solve Output Model

Combo should return one Combo-owned review model from the search core.

That review model should be rich enough to carry:

- the selected candidate graph;
- any alternate candidate families worth surfacing;
- diagnostics and unsupported notes;
- explicit provenance/accounting summaries;
- and the information needed to publish into `xyzzy/v1` without making Xyzzy reconstruct omitted semantics.

Whether Combo keeps a distinct internal result model or reuses a versioned external result contract should be decided on first-principles clarity, not legacy compatibility.

### Option Family Identity

Combo review should surface option families rather than raw branches.

For completed raw options

$$
O_{\mathrm{raw}} = (b^{-}, b^{+}, \phi_{2}, \phi_{4}, W),
$$

two branches should belong to the same option family exactly when they agree on the full review-visible solve summary:

- the same augmentation pair \((b^{-}, b^{+})\);
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
b^{-},
b^{+},
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

### Combo Result Contract

Combo should freeze one external review/result contract named `combo-result/v1`.

At the top level, that contract should contain:

- `schema: "combo-result/v1"`;
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
- `augmentation`, with explicit left and right boundary choices;
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

Combo should score candidates explicitly rather than relying on ad hoc success/failure buckets alone.

The score model should prefer, in order:

- exact conservation and exact product closure;
- zero primitive imbalance and zero middle-lane mismatch;
- fewer spacetime introductions or returns;
- fewer non-identity operators;
- fewer dissociations when a less disruptive exact path exists;
- stronger provenance clarity;
- and stable deterministic tie-breaks over otherwise equal candidates.

For the current working spacetime family, equal candidates should prefer the lower auxiliary boundary burden in the concrete order `none -> 2H -> 4H`.

Combo should formalize that ranking as a lexicographic minimization problem.

For a terminal candidate

$$
C = (b^{-}_{C}, b^{+}_{C}, \phi_{2,C}, \phi_{4,C}, x_{3,C}^{L}, x_{3,C}^{R}, W_{C}),
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
- \(m_{\mathrm{prim}}(C) = \lVert \mu(R + b^{-}_{C}) - \mu(T + b^{+}_{C}) \rVert_{1}\);
- \(m_{\mathrm{mid}}(C) = \lVert x_{3,C}^{L} - x_{3,C}^{R} \rVert_{1}\), viewing the difference in \(\mathbb{Z}^{\mathcal{A}}\);
- \(m_{\mathrm{aux}}(C) = \alpha(b^{-}_{C}) + \alpha(b^{+}_{C})\);
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

Combo should score partial branches too, using an optimistic lower-bound score derived from the same tuple shape.

For a partial branch \(s\), the search should compute:

- whether exact closure is still possible;
- the unavoidable primitive imbalance already fixed by the chosen augmentation pair;
- the minimum possible eventual middle-lane mismatch after all remaining assignments;
- the current auxiliary burden;
- the minimum additional operator burden still forced, with unresolved pass-thru choices contributing zero unless non-identity is provably necessary;
- and the minimum remaining ambiguity/provenance penalty.

If that lower-bound branch score is already worse than the current incumbent exact candidate, the branch should be pruned.

This is the branch-and-bound bridge between search and scoring.

For the current boundary family, the auxiliary burden weight should be

$$
\alpha(0) = 0, \qquad \alpha(e_{\mathrm{2H}}) = 1, \qquad \alpha(e_{\mathrm{4H}}) = 2.
$$

This makes the current preference order exact in the math:

$$
\texttt{none} \prec \mathrm{2H} \prec \mathrm{4H}.
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

Combo should freeze the deterministic tie-break key \(\tau(C)\) rather than leaving it implicit.

For candidate comparison, define

$$
\tau(C)
=
\bigl(
\operatorname{ord}(b^{-}_{C}),
\operatorname{ord}(b^{+}_{C}),
\sigma_{2}(C),
\sigma_{4}(C),
\sigma_{3}(C),
\rho(C)
\bigr),
$$

with lexicographic comparison and the concrete orders:

- augmentation order: `none < 2h < 4h` on each side;
- canonical assembly order: lexicographic order of the canonical ids in \(\mathcal{A}_{\mathrm{v1}}\);
- reactant-occurrence order: normalized request order, with same-id duplicates numbered in first-seen order;
- product-occurrence order: normalized request order, with same-id duplicates numbered in first-seen order;
- lane-2 operator order: the sequence of operator assignments in reactant-occurrence order;
- lane-4 operator order: the sequence of operator assignments in product-occurrence order;
- and middle-inventory order: assembly counts listed in canonical assembly order.

For Combo v1, the operator symbol order inside \(\sigma_{2}\) and \(\sigma_{4}\) should be:

- `pass_thru`;
- then `dissociate(cluster.beta.neutron_noether_pair.v1)`;
- then any later law-family symbol in the order those law ids are admitted into Combo.

The provenance signature \(\rho(C)\) should summarize, in canonical product-occurrence order:

- whether each product occurrence is pure pass-thru, active rewrite output, or support-derived output;
- the support source class, ordered as `none < noether_pair < 2h < 4h`;
- and any explicit ambiguity marker bits.

This means repeated runs over the same normalized problem must produce the same best-family representative even when the raw search explores equal-score branches in a different transient order.

### Diagnostic Codes

Combo should freeze the first stable diagnostic ids now so later UI and fixture work does not guess at naming.

The initial v1 set should be:

| Diagnostic id | Phase | Meaning | Required payload |
| --- | --- | --- | --- |
| `combo.request.unsupported_assembly` | request | the request names an assembly outside Combo v1 | requested token and attempted canonical id |
| `combo.request.invalid_boundary_role` | normalization | a boundary-only assembly was requested in a non-boundary role | assembly id and attempted role |
| `combo.normalization.support_added.noether_pair` | normalization | normalization added one implied `Noether Pair` support reactant | request id and added occurrence id |
| `combo.normalization.support_required.noether_pair` | normalization | exact beta-family closure needs explicit or policy-allowed `Noether Pair` support | request id and policy mode |
| `combo.search.primitive_imbalance` | search | \(\delta(Q; b^{-}, b^{+}) \neq 0\) for the retained branch or retained request summary | augmentation pair and \((\delta_E, \delta_P)\) |
| `combo.search.middle_mismatch` | search | left-generated and right-required middle inventories do not close | augmentation pair and canonical mismatch vector |
| `combo.search.provenance_failure` | search | no complete provenance witness extends the retained branch | retained operator summary and failing witness clause |
| `combo.search.unsupported_law_family` | search | exact closure would require a law family not admitted into Combo v1 | missing law family id or descriptive token |
| `combo.search.non_exact_candidate_retained` | search | a partial or unsupported family was kept for review with explicit failure context | family id and retained failure mode |
| `combo.review.missing_xyzzy_publication_recipe` | review | the accepted family cannot yet be translated because one locked solve-graph unit has no admitted Xyzzy publication recipe | family id and missing recipe id or unit id |
| `combo.review.not_publication_ready` | review | a family may be visible in review but is not publishable | family id and blocking reason |

### Review And Acceptance

Combo should own the review boundary between solve-core output and Xyzzy publication.

That means:

- Combo may show candidate alternatives, ambiguity, residue, and unsupported families;
- Combo should allow acceptance of one explicit publication candidate;
- Combo should keep acceptance separate from mere solve completion;
- and only accepted Combo state should become publishable downstream Xyzzy data.

Combo should not require Xyzzy to host solver review semantics.

### Review Workflow State

Combo should keep one explicit review-state machine for each current `combo-result/v1` snapshot.

That review object should have

- `schema: "combo-review-state/v1"`;
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

When the state becomes `stale`, Combo should clear `acceptedFamilyId`, `acceptedRecord`, and any downstream `publication` object derived from them.

So Combo must never quietly carry an old acceptance across a changed solve.

### Review Actions

Combo should expose a small operator-facing review action set.

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

Combo should allow at most one accepted family at a time.

Accepting one family must therefore replace any earlier accepted family for that same result snapshot.

### Publication-Readiness Gates

Combo should define `publicationReady` as an explicit derived gate, not as a vague UI hint.

For Combo v1, an option family \(F\) is publication-ready if and only if:

- `kind(F) = exact`;
- the current result snapshot is not `stale`;
- the family's canonical representative has \(\epsilon(F) = 0\);
- the family's primitive imbalance is zero;
- the family's middle mismatch is zero;
- the family's provenance witness is complete at the review-summary level;
- every assembly and operator unit in the family's canonical accepted-candidate graph, meaning the graph that would become `acceptedRecord.lockedSolveGraph` upon acceptance, has one admitted Xyzzy publication recipe;
- the family has no blocking diagnostic among:
  `combo.request.unsupported_assembly`,
  `combo.request.invalid_boundary_role`,
  `combo.normalization.support_required.noether_pair`,
  `combo.search.primitive_imbalance`,
  `combo.search.middle_mismatch`,
  `combo.search.provenance_failure`,
  `combo.search.unsupported_law_family`,
  `combo.review.missing_xyzzy_publication_recipe`,
  or any later diagnostic explicitly marked `blocking`;
- and the family already carries the locked lane inventories, operator assignments, provenance summary, and accepted-solve graph needed for downstream translation without re-running search.

If any of those clauses fails, Combo should set `publicationReady = false`.

In that case:

- the family may still appear in review;
- the operator may still inspect its diagnostics and provenance summary;
- but `accept_family` must fail with `combo.review.not_publication_ready`.

### Accepted Record

Acceptance should lock one Combo-owned record before any Xyzzy translation happens.

That record should have

- `schema: "combo-acceptance/v1"`;
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
- `lockedSolveGraph`, which for publishable v1 families must obey `schema: "combo-publication-graph/v1"` and must be the Combo-owned accepted candidate graph that downstream publication will translate rather than reconstruct;
- and optional operator metadata such as `acceptedAt`, `acceptedBy`, and `acceptanceNote` when the runtime has them.

The accepted record should not contain the full raw-branch search tree.

It should contain exactly the information that must remain invariant once the operator says, "this is the candidate we mean."

So the accepted record is the review-side lock point.

The downstream publication step should read only from that lock record, not from a fresh search rerun and not from Xyzzy-side heuristics.

### Translation Boundary To Xyzzy

The translation into `xyzzy/v1` should happen before Xyzzy reads the result.

That translation layer should own:

- mapping Combo-side assemblies and operators into explicit Xyzzy assemblies and operators;
- choosing explicit Xyzzy tile payloads from Xyzzy-owned catalogs and rules;
- converting solved connectivity into explicit Xyzzy links;
- and carrying any display-only composite labels or spans as explicit Xyzzy-side publication data rather than as solver-owned geometry.

Combo should treat `xyzzy/v1` as a publication boundary, not as an internal convenience sketch.

### Canonical Publication Pipeline

Combo should support exactly one downstream publication pipeline:

1. start from one `combo-acceptance/v1` lock record;
2. validate that the lock record is still fresh and publication-ready;
3. translate `acceptedRecord.lockedSolveGraph` into one final `xyzzy/v1` document;
4. validate that `xyzzy/v1` document against the Xyzzy boundary rules;
5. either publish the document durably with a manifest entry or launch Xyzzy with that exact in-memory document;
6. and record the publication outcome back into the Combo-side `publication` object.

No other route should be supported.

In particular:

- Combo should not publish straight from a raw branch;
- Combo should not publish straight from a non-accepted option family;
- Combo should not ask Xyzzy to infer missing rows, tiles, links, or labels from solver-native data;
- and Combo should not rerun search during publication.

### Publication Graph Contract

For publishable v1 families, `acceptedRecord.lockedSolveGraph` should use the following exact top-level shape:

- `schema: "combo-publication-graph/v1"`;
- `units`;
- and `edges`.

Each `unit` record should contain:

- `id`;
- `kind`, with values `assembly` or `operator`;
- `lane`, with values `1`, `2`, `3`, `4`, or `5`;
- `recipeId`, naming the admitted Combo-to-Xyzzy publication recipe;
- `occurrenceKey`, the stable accepted occurrence identity from the locked solve;
- `title`, the accepted semantic title before Xyzzy row-title expansion;
- and any recipe-required anchor or port-selection fields.

Each `edge` record should contain:

- `id`;
- `fromUnitId`;
- `fromPortId`;
- `toUnitId`;
- and `toPortId`.

So the accepted publication graph is still Combo-owned, but it is already explicit about:

- which accepted units exist;
- which recipe expands each unit into Xyzzy surface objects;
- and which accepted left-to-right connections must become Xyzzy links.

### Admitted Publication Recipe Family

The first admitted recipe family should be `combo-xyzzy-recipes/v1-beta-minimal`.

That family should support exactly the current publishable beta-minimal assemblies and operators:

| Combo unit | Admitted recipe id | Xyzzy type family | Expansion height | Boundary label text |
| --- | --- | --- | --- | --- |
| `neutron` | `combo.xyzzy.neutron.v1` | `pro-neutron-assembly` | `3` rows | `Neutron` |
| `noether_pair` | `combo.xyzzy.noether_pair.v1` | `noether-pair-assembly` | `2` rows | `Noether Pair` |
| `proton` | `combo.xyzzy.proton.v1` | `pro-proton-assembly` | `3` rows | `Proton` |
| `electron` | `combo.xyzzy.electron.v1` | `pro-electron-assembly` | `1` row | `Pro Electron` |
| `electron_antineutrino` | `combo.xyzzy.electron_antineutrino.v1` | `anti-electron-neutrino-assembly` | `1` row | `Anti Electron Neutrino` |
| lane-2 `Dissociate` | `combo.xyzzy.operator.dissociate.v1` | `dissociate` | `1` row | none |
| lane-2 or lane-4 `Pass Thru` | `combo.xyzzy.operator.pass_thru.v1` | `pass-thru` | `1` row | none |
| lane-4 `Associate` | `combo.xyzzy.operator.associate.v1` | `associate` | `1` row | none |

For Combo v1, the boundary augmentation assemblies `2h` and `4h` should not yet have admitted Xyzzy publication recipes.

So:

- they may still appear in solve search and review;
- but any accepted family that still depends on them is not publication-ready in the current Xyzzy publication family;
- and the review blocker should be `combo.review.missing_xyzzy_publication_recipe` until explicit Xyzzy publication recipes for those assemblies are admitted.

### Layout And Object Emission Rules

The publication adapter should materialize the final Xyzzy surface deterministically from the accepted publication graph and the admitted recipe family.

The fixed Xyzzy band origins are:

- reactant assemblies at `x = 2`;
- left operators at `x = 7`;
- intermediate assemblies at `x = 9`;
- right operators at `x = 14`;
- and product assemblies at `x = 16`.

Assembly emission should follow these rules:

- expand each assembly unit into the exact number of Xyzzy assembly rows required by its recipe;
- assign the Xyzzy assembly `role` from the Combo lane: lane `1 -> reactant`, lane `3 -> intermediate`, lane `5 -> product`;
- place expanded rows contiguously in their band with no gaps;
- pack each assembly band independently in accepted lane order, top to bottom;
- emit row ids as `<unitId>.row.<n>` with `n` starting at `1`;
- emit row titles from the recipe row-title sequence;
- emit the exact `tiles` array from the admitted Xyzzy recipe, not by rebuilding tiles from Combo semantics at runtime;
- and emit one `compositeLabels` record for every boundary-side assembly unit, with `side = left` for lane `1` and `side = right` for lane `5`, spanning that unit's full emitted row interval.

Operator emission should follow these rules:

- each operator unit becomes one Xyzzy operator record;
- the Xyzzy operator `type` comes directly from the admitted operator recipe;
- the visible operator `title` comes directly from that same recipe;
- `positrinoCount` and `electrinoCount` are the primitive counts of the exact accepted multiset carried by that operator unit;
- `x` comes from the fixed Xyzzy operator band for that lane;
- and `y` is computed from the operator unit's explicit accepted anchor reference in `lockedSolveGraph`, not from ad hoc visual inference.

### Link Emission Rules

The publication adapter should emit Xyzzy links only from the accepted `edges` array plus the admitted port maps in the recipe family.

That means:

- assembly recipes must define the concrete emitted row ids associated with each accepted `fromPortId` or `toPortId`;
- operator recipes must define their concrete Xyzzy endpoint id, which is the operator record id itself;
- one accepted publication edge may therefore expand into one or more Xyzzy links when the accepted port map spans multiple emitted assembly rows;
- every emitted Xyzzy link must already obey the neighboring-band rule and canonical left-to-right endpoint order;
- and no Xyzzy link should be created by screen-geometry inference or by scanning nearby rows after the fact.

So the adapter's job is explicit expansion, not reconstruction.

### Publication Output Contract

The translation output should be one Combo-owned package named `combo-xyzzy-package/v1`.

That package should contain:

- `schema: "combo-xyzzy-package/v1"`;
- `sourceAcceptanceDigest`;
- `publicationMode`, with values `durable` or `launch`;
- `documentId`, with the default stable form `<problemId>--<familyId>`;
- `documentTitle`, with a stable accepted-publication title derived from the request title or accepted family summary;
- `xyzzyDocument`, which must already satisfy `schema: "xyzzy/v1"`;
- and nullable `manifestEntry`, which is present only for durable publication.

When `manifestEntry` is present, it should already satisfy the Xyzzy-side `xyzzy-library-manifest/v1` entry rules:

- `id`, which should default to `documentId`;
- `title`;
- `displayTitle`;
- and `documentPath`.

### Durable Publish And Launch

Combo should support two downstream actions over the same `combo-xyzzy-package/v1` shape.

For `publish_accepted("durable")`, Combo should:

- generate the final `combo-xyzzy-package/v1` package;
- write `xyzzyDocument` to the durable asset path selected by the publication runtime;
- write or update exactly one matching Xyzzy manifest entry;
- and then set the Combo review state to `published`.

For `publish_accepted("launch")`, Combo should:

- generate the same final `combo-xyzzy-package/v1` package shape;
- omit any manifest write;
- hand the in-memory `xyzzyDocument` directly to the Xyzzy launch path;
- and still set the Combo review state to `published` for that accepted snapshot.

So durable publish and launch differ only in destination handling, not in translation semantics.

### Persistence And Launch

Combo should be able to hand accepted results downstream in one of two ways:

- publish a durable `xyzzy/v1` document plus any needed manifest/library entry;
- or launch Xyzzy with one explicit accepted in-memory document when persistence is not the goal.

The durable path should be the canonical reviewable path.

### Reverse Boundary From Xyzzy

For Combo v1, Xyzzy should be downstream-only.

That means:

- a final `xyzzy/v1` document is a publication artifact, not a Combo solve request;
- editing a Xyzzy document does not implicitly create or mutate Combo solve state;
- Combo should not reverse-parse arbitrary Xyzzy assemblies, operators, links, or composite labels back into solver-native meaning;
- and Xyzzy should not host candidate ranking, ambiguity handling, acceptance state, or other Combo review semantics.

So the v1 answer is:

- Combo publishes to Xyzzy;
- but Xyzzy does not originate a new Combo solve request from arbitrary authored surface state.

The only admitted reverse-adjacent operation in Combo v1 should be **reopen by Combo-owned reference**.

That means:

- if the runtime still has a Combo work item id, accepted-record digest, or equivalent Combo-owned publication reference for the current Xyzzy document, it may offer a launcher-level action that reopens that Combo work item;
- Combo must then reload its own normalized problem, accepted record, or stored review state from Combo-owned persistence;
- and the Xyzzy document itself is not the source of truth for the reopened solve.

If that Combo-owned reference is missing, the Xyzzy document alone is not sufficient to reconstruct the Combo problem.

So a published Xyzzy artifact may be viewable or editable as a Xyzzy document even when no reversible Combo session still exists.

### Future Xyzzy-To-Combo Gate

If a true Xyzzy-to-Combo authoring loop is ever admitted later, it should require a separate versioned transform contract rather than reverse use of raw `xyzzy/v1`.

That future transform should be accepted only if all of the following are true:

- the source document is intentionally marked as request-shaped rather than publication-shaped;
- only explicit boundary-side authored assemblies are treated as request inputs and targets;
- Xyzzy-only placement, link-routing, and composite-label details are ignored as non-solver semantics;
- the transform runs outside the Xyzzy renderer;
- and the output is an explicit Combo-owned request contract such as `combo-request/v1`, not an in-process callback into Combo review state.

Until such a contract is explicitly admitted, arbitrary `xyzzy/v1` documents should be treated as non-invertible downstream artifacts.

### App Boundary Rules

Combo should follow the dedicated-app rules in [app-architecture](app-architecture.md):

- explicit versioned data across app boundaries;
- no direct cross-app runtime imports for app-specific behavior;
- no hidden coupling through launcher-state assumptions;
- and one source of truth for solve semantics, publication semantics, and downstream document structure.

### Minimum Regression Fixture Set

Before Combo implementation is considered trustworthy, the first fixed regression denominator should be:

| Fixture id | Raw request | Key policy | Minimum expected outcome |
| --- | --- | --- | --- |
| `free_neutron_beta_exact` | `neutron -> proton + electron + electron_antineutrino` | implied beta support allowed | normalization adds one `noether_pair`; best family is exact; auxiliary burden is `none`; publication is ready after acceptance |
| `free_neutron_beta_support_disallowed` | `neutron -> proton + electron + electron_antineutrino` | `betaSupportMode = explicit-only` | no exact family; `combo.normalization.support_required.noether_pair` is present; retained best family is partial or unsupported |
| `primitive_imbalance_neutron_to_proton` | `neutron -> proton` | default | retained diagnostics include `combo.search.primitive_imbalance` with \((\delta_E, \delta_P) = (3, -3)\); no exact family exists |
| `pass_thru_neutron` | `neutron -> neutron` | default | one exact pass-thru family; zero non-identity operators; zero ambiguity penalty |
| `first_multi_option_exact` | the first request admitted after the beta-minimal law set that yields at least two distinct exact option families | default | at least two exact option families remain after canonicalization, with stable score order and stable family representatives |

The last fixture is a gate on the first post-beta expansion.

So Combo should not consider itself beyond the minimal single-family stage until that first genuine multi-option exact case exists and is under regression.

## Interfaces

### Inputs

- PDG-backed request data emitted by [pdgfeed](./pdgfeed.md);
- built-in Combo fixture requests;
- explicit developer-loaded request documents;
- Combo-owned solve policy and review state;
- and Combo-owned reopened work-item references when one already exists.

### Outputs

- Combo-owned candidate solve results suitable for review;
- accepted Combo publication state;
- final `xyzzy/v1` documents;
- Xyzzy manifest-ready publication entries or equivalent launch-ready selection state;
- and developer-facing diagnostics about solve completeness, ambiguity, unsupported families, and publish readiness.

### Upstream And Downstream Boundaries

Combo should:

- accept explicit upstream request data;
- own solve normalization, search, review, and publication;
- and hand explicit final Xyzzy documents downstream.

Combo should not:

- ask Xyzzy to parse raw solver-native problem or result data;
- treat arbitrary `xyzzy/v1` documents as invertible Combo requests;
- duplicate PDG normalization logic locally;
- or let launcher/runtime concerns become the source of solve semantics.

### Neighboring Components

- [pdgfeed](./pdgfeed.md) owns upstream PDG normalization and request emission.
- [xyzzy](./xyzzy.md) owns the final tile surface, placement grammar, and Xyzzy-side document model.
- [solver](./solver.md) carries related search-strategy and branch-state design material.
- [app-architecture](app-architecture.md) owns the cross-app boundary and modularity rules that apply here.

## Priorities

### 1. Build The First Combo Fixtures And Regression Surface

Status: `active`

Current:

- the minimum required regression fixture set is now frozen;
- but Combo still has no own request fixtures, expected-result fixtures, or Xyzzy-publication regressions.

Objective:

- create the first Combo-native request fixtures, candidate expectations, and Xyzzy-publication regressions.

## Related Priorities

- [observer](./observer.md)
- [pdgfeed](./pdgfeed.md)
- [xyzzy](./xyzzy.md)
- [solver](./solver.md)
- [app-architecture](app-architecture.md)
