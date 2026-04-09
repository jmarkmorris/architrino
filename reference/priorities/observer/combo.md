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

### Request Intake

Combo should support a small number of explicit entry modes:

- built-in request manifests backed by canonical fixtures;
- PDG-backed requests emitted by [pdgfeed](./pdgfeed.md);
- direct load of explicit request JSON by a developer or advanced user;
- and later, reopened Combo work items or Xyzzy-originated authored solve requests if that workflow becomes necessary.

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

The exploratory note in [solver-network](./solver-network.md) is relevant here as a seed idea, not as a finished spec.

This limited geometry should be exploited aggressively.

In particular:

- each lane-1 assembly presents a small action set, typically `Pass Thru` or `Dissociate`;
- each lane-3 assembly or assembly-set presents a small action set, typically `Pass Thru` or `Associate`;
- candidate growth therefore comes from combinations of a bounded family of local choices rather than from unconstrained geometric routing;
- and that bounded choice structure makes branch scoring and pruning practical.

For lane 2, Combo should define the local reactant rewrite family

$$
\Lambda_{2}(a) = \{e_{a}\} \cup \Delta(a), \qquad a \in \mathcal{A},
$$

where \(e_{a}\) represents `Pass Thru` and each \(d \in \Delta(a)\) represents one legal `Dissociate` output.

For lane 4, Combo should define the local product-closure family

$$
\Lambda_{4}(a) = \{e_{a}\} \cup \Gamma(a), \qquad a \in \mathcal{A},
$$

where \(e_{a}\) represents `Pass Thru` and each \(g \in \Gamma(a)\) represents one legal lane-3 input multiset that can `Associate` into \(a\).

Given a full lane-1 inventory \(x_{1}\), the left-generated middle family is

$$
\mathfrak{L}(x_{1}) =
\left\{
\sum_{a \in \mathcal{A}} \sum_{i=1}^{x_{1}(a)} y_{a,i}
\;\middle|\;
y_{a,i} \in \Lambda_{2}(a)
\right\}.
$$

Given a full lane-5 inventory \(x_{5}\), the right-required middle family is

$$
\mathfrak{R}(x_{5}) =
\left\{
\sum_{a \in \mathcal{A}} \sum_{j=1}^{x_{5}(a)} z_{a,j}
\;\middle|\;
z_{a,j} \in \Lambda_{4}(a)
\right\}.
$$

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
5. expand that occurrence by one member of \(\Lambda_{2}(a)\) or \(\Lambda_{4}(a)\);
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

Because \(e_{a} \in \Lambda_{2}(a)\) and \(e_{a} \in \Lambda_{4}(a)\), these envelopes automatically include the pass-thru possibility.

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

For unresolved occurrences, the lower-bound future operator burden should treat pass-thru as zero additional non-identity cost unless a non-identity rewrite is provably forced.

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
- each reactant assembly occurrence contributes one finite choice from \(\Lambda_{2}(a)\);
- each product assembly occurrence contributes one finite choice from \(\Lambda_{4}(a)\);
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

### Review And Acceptance

Combo should own the review boundary between solve-core output and Xyzzy publication.

That means:

- Combo may show candidate alternatives, ambiguity, residue, and unsupported families;
- Combo should allow acceptance of one explicit publication candidate;
- Combo should keep acceptance separate from mere solve completion;
- and only accepted Combo state should become publishable downstream Xyzzy data.

Combo should not require Xyzzy to host solver review semantics.

### Translation Boundary To Xyzzy

The translation into `xyzzy/v1` should happen before Xyzzy reads the result.

That translation layer should own:

- mapping Combo-side assemblies and operators into explicit Xyzzy assemblies and operators;
- choosing explicit Xyzzy tile payloads from Xyzzy-owned catalogs and rules;
- converting solved connectivity into explicit Xyzzy links;
- and carrying any display-only composite labels or spans as explicit Xyzzy-side publication data rather than as solver-owned geometry.

Combo should treat `xyzzy/v1` as a publication boundary, not as an internal convenience sketch.

### Persistence And Launch

Combo should be able to hand accepted results downstream in one of two ways:

- publish a durable `xyzzy/v1` document plus any needed manifest/library entry;
- or launch Xyzzy with one explicit accepted in-memory document when persistence is not the goal.

The durable path should be the canonical reviewable path.

### App Boundary Rules

Combo should follow the dedicated-app rules in [app-architecture](app-architecture.md):

- explicit versioned data across app boundaries;
- no direct cross-app runtime imports for app-specific behavior;
- no hidden coupling through launcher-state assumptions;
- and one source of truth for solve semantics, publication semantics, and downstream document structure.

## Interfaces

### Inputs

- PDG-backed request data emitted by [pdgfeed](./pdgfeed.md);
- built-in Combo fixture requests;
- explicit developer-loaded request documents;
- Combo-owned solve policy and review state;
- and later, any intentionally supported Xyzzy-originated authored solve requests.

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
- duplicate PDG normalization logic locally;
- or let launcher/runtime concerns become the source of solve semantics.

### Neighboring Components

- [pdgfeed](./pdgfeed.md) owns upstream PDG normalization and request emission.
- [xyzzy](./xyzzy.md) owns the final tile surface, placement grammar, and Xyzzy-side document model.
- [solver-network](./solver-network.md) is an exploratory note related to combinatorial search ideas.
- [app-architecture](app-architecture.md) owns the cross-app boundary and modularity rules that apply here.

## Priorities

### 1. Freeze The Combo-Native Solve Problem Model From First Principles

Status: `active`

Current:

- upstream request sources exist;
- but Combo still has no native request/problem model of its own.

Objective:

- define the canonical Combo-side solve problem in solver-native terms rather than in inherited Reaction UI terms.

### 2. Define The Combinatorial Search Grammar And Branch-State Model

Status: `active`

Current:

- combinatorial search is an explicitly interesting direction;
- but the state model, expansion rules, pruning rules, and deterministic ranking rules are not yet written down in one Combo-owned place.

Objective:

- define the branch-state model, operator expansion grammar, pruning discipline, and candidate ranking model for the next-generation solver.

### 3. Define The Combo Review And Acceptance Boundary

Status: `next`

Current:

- it is clear that Combo must review and accept before Xyzzy publication;
- but the candidate-review shape, ambiguity handling, and acceptance semantics are not yet specified.

Objective:

- freeze Combo as the owner of candidate review, alternative selection, and publication acceptance.

### 4. Define The Canonical Publication Path Into `xyzzy/v1`

Status: `next`

Current:

- [xyzzy](./xyzzy.md) already fixes the downstream document boundary;
- but the canonical Combo-to-Xyzzy publication adapter is not yet defined.

Objective:

- define one explicit accepted-result-to-`xyzzy/v1` translation path and make it the only supported downstream publication route.

### 5. Define How Combo And Xyzzy Interact In Both Directions

Status: `pending`

Current:

- Combo clearly publishes to Xyzzy;
- but the reverse interaction, if any, is not yet frozen.

Objective:

- decide whether Xyzzy may originate authored solve requests back into Combo and, if so, define that boundary without pushing solver review into Xyzzy.

### 6. Build The First Combo Fixtures And Regression Surface

Status: `pending`

Current:

- prototype fixtures and prototype solver regressions exist;
- but Combo has no own regression denominator yet.

Objective:

- create the first Combo-native request fixtures, candidate expectations, and Xyzzy-publication regressions.

## Related Priorities

- [observer](./observer.md)
- [pdgfeed](./pdgfeed.md)
- [xyzzy](./xyzzy.md)
- [solver-network](./solver-network.md)
- [app-architecture](app-architecture.md)
