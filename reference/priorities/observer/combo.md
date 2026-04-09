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

- lane 1: source-side assemblies;
- lane 2: source-side operators;
- lane 3: intermediate assemblies;
- lane 4: product-side operators;
- lane 5: target-side assemblies.

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
- they may appear only at the outer source/product boundaries as lane-1 reactants or lane-5 products;
- they are beyond the current state of detection and should therefore carry explicit provenance rather than being treated as ordinary authored-visible assemblies;
- they are not lane-3 center assemblies;
- they are not arbitrary middle-lane insertions;
- and they are not free-floating geometry owned by the renderer.

### Operator Semantics

Combo should keep the operator family deliberately small.

`Pass Thru` means:

- one assembly-side input continues forward as the same conserved assembly-side material;
- no decomposition occurs;
- and no new assembly identity is created.

`Dissociate` means:

- one source-side assembly is opened;
- the resulting output is a constrained set of lane-3 assemblies determined by the decomposition law for that assembly family;
- and the total conserved ledger is preserved across the split.

`Associate` means:

- one or more lane-3 assemblies are gathered into one lane-5 assembly;
- the operation is legal only when the gathered material exactly satisfies the target assembly recipe;
- and the total conserved ledger is preserved across the gather-and-assemble step.

Combo should not widen the operator family casually.

The more precise the operator grammar is, the more tractable the search space becomes.

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

- source-side assemblies or inventories;
- target-side assemblies or inventories;
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

### Conserved Balance Equations

Combo should make the balance laws explicit at the assembly lanes.

The important balance checkpoints are lanes 1, 3, and 5.

At each of those lanes, Combo should maintain an explicit conserved ledger that accounts for:

- material present at that lane;
- material contributed by any explicit outer-boundary spacetime-derived assembly such as `2H` or `4H`;
- material consumed by the next operator stage;
- material forwarded to the next stage;
- and any unresolved residue.

An exact candidate should have no unexplained residue at those balance checkpoints.

A partial candidate may carry explicit residue, but that residue should be represented directly in the candidate state and score.

The conserved ledger should be fine-grained enough to score legality and strength.

At minimum, that means the solver should be able to distinguish:

- strict conservation failure;
- conservative but incomplete closure;
- exact closure with heavy auxiliary recruitment;
- and exact closure with minimal added machinery.

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

- exact conservation and exact target closure;
- zero unexplained residue at lanes 1, 3, and 5;
- fewer spacetime introductions or returns;
- fewer inserted operators;
- fewer dissociations when a less disruptive exact path exists;
- stronger provenance clarity;
- and stable deterministic tie-breaks over otherwise equal candidates.

For the current working spacetime family, equal candidates should prefer the lower auxiliary boundary burden in the concrete order `none -> 2H -> 4H`.

This means the limited lane/operator geometry is not just a legality constraint.

It is also the basis of a useful score function:

- how much material moved through each stage;
- how much auxiliary material was required;
- how much structure had to be opened;
- how much structure had to be rebuilt;
- and how directly the accepted product set was reached.

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
