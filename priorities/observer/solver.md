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

The main solver design is now a fresh headless implementation path, not an extension of the current browser implementation.

`solver.py` should be treated as a new solver designed on its own terms around a headless planning core plus app-side adapters. The browser should not remain the only place where solving can happen. The current JavaScript planner is still a useful behavioral reference, fixture source, and functionality checklist, but it is not the implementation to port and it should not define the architecture of the new solver.

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

Behavior that the new solver should preserve even though it is a fresh implementation:

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
- and the current solver operator vocabulary remains `Associate` plus `Dissociate`, even though explicit `Dissociate` placement is still an unfinished planner behavior rather than a committed implemented feature.

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

Resolved v1 weak-channel provenance convention:

- `W+` carries anti `Noether core` provenance;
- `W-` carries pro `Noether core` provenance;
- and v1 solver rules should use that convention explicitly rather than treating `W^\pm` corridor core provenance as unresolved.

Broader weak-channel theory may still need refinement in [standard-model-closure](../standard-model-closure/standard-model-closure.md), but the first solver should treat this boson-core assignment as settled working law rather than as an implementation guess.

Implementation stance:

- treat the current browser solver as a reference implementation for covered behavior, not as the codebase being ported;
- build the new headless solver behind explicit request/result contracts and cleaner internal architecture;
- and use fixture-based comparison and review to verify functional coverage without inheriting browser-specific design debt.

### Reference Behavior And Assets

The current browser solver should no longer drive architecture, but it still provides a narrow remaining reference value for `solver.py`:

- covered behavior that the new solver should preserve unless intentionally changed;
- and Reaction-side adapter expectations around rerun, layout, and projection.

Covered conservative solve families worth preserving as explicit reference behavior:

- direct root reuse for identical conservative standalone participants;
- full composite carry-through for identical composites;
- fragment-to-root reuse from composite children into supported standalone products;
- authored center-assembly direct mapping for currently supported product families;
- `Associate`-based standalone assembly from `Noether core` plus `Free Architrinos` where exact inventory closure holds;
- `Associate`-based composite reassembly from exact available source sets;
- `Associate`-based photon assembly from opposite-polarity `Noether core` sources where exact closure holds;
- and `Higgs Cluster -> Photon + Photon` through conservative dissociation plus two assembled photon outputs.

Reference rerun and adapter behavior worth preserving at the app boundary:

- rerun from a clean auto-solve baseline removes only solve-generated operators, not manual operators;
- manual dissociated-composite state remains valid authored state across reruns;
- auto-dissociation marks appear when selected mappings consume internal composite rows;
- operator layout happens after candidate selection rather than during early candidate generation;
- and projection materializes explicit operators, mappings, and dissociation effects back into live Reaction state rather than leaving them implicit.

### Solve Strategy And Search

This section is about the logic and algorithm of the new solver itself. It is upstream of implementation details such as schemas, CLI grammar, or Python packaging.

The recommended search stance is product-anchored rather than purely reactant-driven. In practice, the solver should work backward from unresolved products toward supporting source material, but always under forward conservation constraints from the available reactants, center assemblies, and any explicitly recruited spacetime material. The solver should not behave like an unconstrained reverse synthesizer. It should ask, for each unresolved product, "what exact conservative support plan could close this product from the currently available source pool?"

That means the solver should be neither:

- purely forward, where reactants spray out combinatorial possibilities and hope some later match a product;
- nor purely backward, where products invent support structure without tight accounting against the available source pool.

The better stance here is a constrained bidirectional solve with a product-first frontier:

- products drive what must be explained next;
- available reactants and already-created intermediates constrain what explanations are legal;
- and conservation, provenance, and operator cost prune the search before it explodes combinatorially.

The solver should not default to drilling through every combinatorial possibility and then scoring the whole universe of plans. Best practice here is staged candidate generation plus bounded search:

- generate only operator and mapping families that are legal for the current unresolved product and current source pool;
- rank those local candidate families by conservative strength before branching further;
- use branch-and-bound, beam search, or another bounded best-first strategy over partial solve states;
- memoize canonical partial states so equivalent subproblems are not re-solved repeatedly;
- and stop expanding branches that are already dominated by a better branch with equal or stronger closure.

Whole-product closure should stay the first ranking principle. A plan that closes a whole product exactly from conservative inputs should outrank a plan that creates extra residue or speculative structure, even if the latter is more creative. The search should therefore favor:

- exact whole-product closure first;
- fewer unresolved products next;
- fewer recruited auxiliary inputs next;
- fewer inserted operators next;
- less residue next;
- and only then finer-grained tie-breaks.

#### Suggested Solve Phases

The new solver should work in explicit phases rather than one undifferentiated search.

Recommended phase order:

1. Normalize the solve request into a planner-owned state with explicit source pool, target pool, authored operators, authored dissociation state, and any allowed recruitment policy.
2. Run a carry-through pre-pass for exact identical reactant/product participants.
3. Solve unresolved products from authored reactants, authored center assemblies, and already-available intermediates, preferring direct and conservative closure before introducing new operators.
4. Introduce explicit `Dissociate` steps only when opening a source-side assembly is required to expose needed constituents.
5. Introduce `Associate` steps only when multiple available source entries exactly assemble into one unresolved product.
6. Only after authored-source closure is exhausted, consider explicitly permitted recruited spacetime inputs such as `Higgs Cluster` if the request or policy allows them.
7. Run a late-stage normalization pass over completed candidate closures and collapse qualifying center-lane assembly groups into implied-operator `W` or `Z` bosons where the accepted rules allow it.
8. Treat synthetic `W` and `Z` intermediates as gated late-phase families rather than default search primitives unless authored directly or enabled by a theory-owned rule set.

#### Catalyst And Benign Carry-Through Pre-Pass

The first operational rule should be a carry-through pass for exact repeated participants. If a specified reactant is also a specified product with the same direct participant identity and conservative inventory, the default assumption should be that it is a catalyst, spectator, or benign carry-through participant.

That pre-pass should:

- pair exact carry-through reactant/product participants first;
- emit those mappings immediately;
- remove those paired participants from the remaining solve task;
- preserve their provenance as authored continuity rather than as solver-created transformation;
- and leave room for explicit authored overrides if the user has already indicated that an apparently identical participant should not be treated as simple carry-through.

This pre-pass matters because it shrinks the remaining search space before any deeper operator reasoning begins.

#### Dissociate, Associate, And Intermediate Material

`Dissociate` and `Associate` should enter the solve for different reasons and should not be treated as interchangeable generic graph nodes.

`Dissociate` should be introduced when:

- a needed constituent exists inside a currently unavailable composite source;
- a recruited spacetime assembly must be opened to expose useful primitive inventory;
- or the plan requires explicit release of intermediate source material such as `Free Architrinos` or `Noether core` constituents.

`Associate` should be introduced when:

- an unresolved product cannot be closed by direct carry-through;
- two or more already-available source entries exactly conserve into one assembled product;
- and the product is better represented as a gathered assembly than as a loose residue set.

Intermediates created by a `Dissociate` step should become explicit entries in the source pool for downstream search. They should not be treated as magical spontaneous material. If a `Dissociate` of a composite or recruited assembly yields `Free Architrinos`, `Noether core` forms, or other supported primitive units, those entries should be represented explicitly in the partial solve state and consumed explicitly by later steps.

#### W And Z Handling

`W` and `Z` need stricter discipline than first-pass `Associate` and `Dissociate`.

Recommended rule:

- authored `W` and `Z` participants remain valid source-side or center-assembly participants;
- direct conservative use of authored `W` and `Z` may remain supported where the mapping rules already justify it;
- synthetic `W` and `Z` insertion should not be a default early search family;
- and solver-created `W` / `Z` intermediates should stay behind an explicit theory and rule gate until their provenance semantics are pinned down strongly enough to avoid fake closure.

In other words, the new solver should stay primitive-first. It should first try to close products through direct mappings, dissociated constituents, `Associate`, `Dissociate`, `Noether core`, and `Free Architrinos`. Only after that primitive story is exact should it recognize or optionally introduce `W` / `Z` structure.

Once a branch already has a completed primitive closure, the solver may run a late-stage recognition pass over the center lane. In that pass:

- if a set of center-lane assemblies can be exactly associated into a `W` or `Z` boson under the accepted rule family;
- and the resulting boson representation does not break any already-established conservative closure;
- then the solver should replace that assembly group with the implied-operator `W` or `Z` form before final scoring.

This is a normalization and ranking pass, not a license to widen the early search space. The solver should not generate synthetic `W` / `Z` branches up front just because such a collapse might later be possible.

#### Spacetime Recruitment And Higgs-Cluster Closure

The solver should have an explicit policy for adding spacetime-derived material such as `Higgs Cluster` instead of smuggling it in as an invisible convenience.

Recommended rule:

- do not recruit spacetime inputs during the first authored-source closure pass;
- if authored sources plus their justified dissociations cannot close the remaining targets, compute the remaining exact ledger deficit;
- then ask whether the active solve policy permits recruitment from spacetime-like sources such as `Higgs Cluster`;
- if recruitment is allowed, add those recruited assemblies explicitly as solver-created inputs with a clear provenance tag and a real search cost;
- and require the resulting plan to close more exactly than the unrecruited alternative, rather than merely adding decorative completeness.

This means spacetime recruitment is neither forbidden nor free. It is a late explicit solve family for exact closure when the conservative ledger says more source material is genuinely required.

#### State Expansion And Scoring

The search state should be explicit and canonical. At minimum it should track:

- unresolved products;
- available source entries, including authored sources and solver-created intermediates;
- selected mappings and inserted operators;
- recruited auxiliary inputs such as spacetime-derived assemblies;
- unresolved residue on both source and target sides;
- and any active theory gates or unsupported-family markers.

Each branch expansion should choose one unresolved product, generate only the legal closure families for that product, and produce successor states. The solver should then score and prune those successors using branch-level and whole-plan criteria.

Recommended scoring posture:

- first maximize exact whole-product closure;
- then minimize unsupported or unresolved targets;
- then minimize recruited auxiliary inputs;
- then minimize inserted operators;
- then minimize leftover residue;
- then prefer more direct provenance over more indirect provenance;
- and finally use stable textual or structural tie-breaks so repeated runs stay deterministic.

#### Practical Search Discipline

The first version of `solver.py` should be designed for disciplined bounded search, not global exhaustive enumeration.

That means:

- use a canonical state key so equivalent partial branches collapse together;
- maintain an explicit frontier ordered by the scoring posture above;
- stop expanding branches whose upper bound cannot beat the current best complete branch;
- keep unsupported theory families gated rather than represented as low-confidence guesses;
- and prefer exact failure with explicit residue over pretending to solve by inserting unjustified intermediates.

### Internal State Model Options

Priority 2 is not abstract tooling talk. It is about choosing an internal representation that matches the actual solver rules above.

The core requirement is this: the solver needs to branch, compare, deduplicate, score, and explain partial closures without hidden mutation. That means the internal state model matters almost as much as the rule set.

#### Option A: Mutable Object Graph

One option is to represent the solve as a mutable object graph and rewrite that graph in place while searching.

Advantages:

- easy to picture conceptually;
- natural for trees of composites and constituents;
- and can feel close to the current UI/runtime shape.

Disadvantages:

- branch search becomes fragile because every branch must clone or carefully undo mutations;
- canonical state keys become harder to compute;
- debugging branch divergence gets harder;
- and hidden mutation is exactly the kind of thing this solver should avoid.

Recommendation:

- do not use a mutable in-place graph as the main planner state.

#### Option B: Pure Graph-Library Model

Another option is to model the whole solve as a graph problem and use a graph library heavily.

Advantages:

- good for explicit connectivity;
- potentially useful for subgraph recognition or late-stage boson collapse;
- and graph terminology can match mappings and operator wiring.

Disadvantages:

- the main hard part of this solver is not generic graph traversal;
- the branch state also needs inventories, consumption, residue, recruitment policy, and ranked partial closure;
- graph libraries often encourage mutation-heavy workflows or carry more machinery than the solver actually needs;
- and a graph-first representation can hide the fact that many rules are really constrained resource-allocation problems rather than pure connectivity problems.

Recommendation:

- do not make a graph library the primary state model for v1;
- use lightweight derived graph views only where they clearly help with recognition or reporting.

#### Option C: Pure Ledger / Multiset Model

Another option is to model everything as multisets of available units and target deficits.

Advantages:

- good for exact conservation accounting;
- naturally supports branch scoring around residue and deficits;
- easy to hash and memoize if the entries are canonical.

Disadvantages:

- provenance becomes too lossy if everything collapses into counts;
- composite structure matters for carry-through, dissociation, and center-lane recognition;
- and direct mapping decisions often depend on specific source identity, not just inventory totals.

Recommendation:

- do not use a pure ledger model by itself;
- but do keep explicit ledger summaries as part of each branch state and as part of candidate legality checks.

#### Option D: Hybrid Immutable Branch State

The strongest v1 option is a hybrid model:

- immutable or mostly-immutable branch-state records;
- explicit source-entry and target-entry records with stable ids;
- explicit operator-step records;
- explicit ledger summaries attached to entries and to the whole branch;
- and lightweight derived views for tree structure, matching, and late-stage recognition.

This fits the actual rulebook because the solver needs all of the following at once:

- identity-sensitive direct mapping;
- composite-aware dissociation;
- exact inventory checks;
- branch scoring and pruning;
- deterministic memoization;
- and human-readable diagnostics.

Recommended branch-state shape:

- `available_sources`: canonical tuple of source-entry records currently available for use;
- `unresolved_targets`: canonical tuple of remaining target-entry records;
- `selected_steps`: canonical tuple of direct-map, dissociate, associate, recruit, and late-stage-collapse steps chosen so far;
- `selected_mappings`: canonical tuple of explicit provenance mappings;
- `opened_sources`: canonical record of composites or recruited assemblies that have been dissociated;
- `consumed_source_ids`: canonical set of fully consumed source-entry ids;
- `residue`: explicit source-side and target-side leftover summaries;
- `ledger_summary`: whole-branch electrino/positrino and related conservative totals;
- `policy_flags`: recruitment and theory gates, plus `--i` / `--I` satisfaction state;
- and `diagnostics`: unsupported-family notes, skipped optional intermediates, and other review-facing explanations.

Recommended source-entry shape:

- stable entry id;
- origin kind: authored reactant, authored center, released intermediate, recruited source, operator output;
- participant or node family;
- polarity;
- explicit conservative inventory summary;
- explicit solver-visible internal-state summary when relevant;
- parent provenance reference when released from dissociation;
- and availability status.

#### Recommended Python Mechanics

For Python itself, the best first pass is likely:

- `dataclasses` with `slots=True` and `frozen=True` for internal immutable records;
- `Enum` for rule families, step kinds, and policy flags;
- `tuple`, `frozenset`, and sorted canonical records for stable hashing and memoization;
- `heapq` for the frontier;
- and standard-library structural helpers before reaching for a large external dependency.

Recommended boundary split:

- use plain frozen dataclasses or small typed records for hot-path internal search state;
- use schema validation only at the request/result boundary;
- and keep internal branch-state validation lightweight and explicit.

On libraries:

- `pydantic` may be useful at the request/result boundary, but I would not make it the core internal state engine for the search loop;
- `attrs` is viable if preferred, but standard-library dataclasses are probably enough for v1;
- `networkx` is probably too heavy and too graph-centric for the primary planner state;
- and bespoke graph helpers may still be useful for late-stage recognizers or structure matching without becoming the whole architecture.

#### Current Recommendation

My first recommendation for `solver.py` is:

1. external request/result schemas for I/O;
2. frozen dataclass records for internal entries, steps, and branch state;
3. explicit ledger summaries attached to those records;
4. canonical tuples and frozensets for hashing and deduplication;
5. a best-first frontier built with `heapq`;
6. and no heavy graph library as the core representation.

That gives the solver:

- deterministic branching;
- cheap memoization;
- explicit provenance;
- strong testability;
- and enough structure to support direct mapping, dissociation, association, recruitment, and late-stage boson recognition without turning the whole solver into an opaque object graph.

#### Concrete Internal Record Definitions

The main solver design should now treat the following internal records as the default v1 shapes.

These are internal planner records, not the external JSON request/result schema. The external schema may be broader or friendlier, but it should normalize into these kinds of records before search starts.

##### `InventorySummary`

Purpose:

- hold the explicit conservative inventory used for legality checks, residue accounting, and branch scoring.

Recommended fields:

- `electrino_count: int`
- `positrino_count: int`
- `family_counts: tuple[tuple[str, int], ...]`
- `core_form_counts: tuple[tuple[str, int], ...]`
- `extra_flags: tuple[str, ...]`

Notes:

- keep the representation canonical and hashable;
- store zero-elided sorted tuples rather than mutable dicts in the final frozen record;
- and allow this record to represent both exact participant inventory and residual deficits.

##### `InternalStateSummary`

Purpose:

- hold solver-visible, physically meaningful internal structure when direct mapping or reassembly rules depend on it.

Recommended fields:

- `color_state: str | None`
- `polar_state: str | None`
- `binary_signature: tuple[str, ...]`
- `composite_signature: tuple[str, ...]`
- `extra_labels: tuple[str, ...]`

Notes:

- this record should stay sparse;
- if an internal distinction is not solver-visible and physically meaningful, it should not be encoded here merely for completeness;
- and intact color-neutral composites should not be forced into fake fixed internal labels just to populate this record.

##### `SourceEntry`

Purpose:

- represent one available source unit in the branch state.

Recommended fields:

- `entry_id: str`
- `origin_kind: SourceOriginKind`
- `participant_id: str | None`
- `node_id: str | None`
- `family: str`
- `template_id: str`
- `polarity: str | None`
- `inventory: InventorySummary`
- `internal_state: InternalStateSummary | None`
- `parent_entry_id: str | None`
- `provenance_path: tuple[str, ...]`
- `is_composite: bool`
- `is_center_lane: bool`
- `availability_state: AvailabilityState`
- `tags: frozenset[str]`

Notes:

- `entry_id` is the canonical planner identity for source consumption and deduplication;
- `participant_id` and `node_id` are references back to authored or projected structures when they exist;
- released intermediates from dissociation should become new `SourceEntry` records with their own `entry_id` values and a `parent_entry_id` link;
- and recruited material should also become explicit source entries rather than hidden branch metadata.

##### `TargetEntry`

Purpose:

- represent one unresolved target unit or product target in the branch state.

Recommended fields:

- `target_id: str`
- `participant_id: str | None`
- `node_id: str | None`
- `family: str`
- `template_id: str`
- `polarity: str | None`
- `inventory: InventorySummary`
- `internal_state: InternalStateSummary | None`
- `is_composite: bool`
- `is_center_lane_target: bool`
- `priority_bucket: str`
- `tags: frozenset[str]`

Notes:

- `priority_bucket` is where composite-first and late-state exceptions such as authored `Higgs Cluster` can be encoded explicitly for frontier ordering;
- and targets should remain explicit until resolved rather than being mutated in place.

##### `MappingRecord`

Purpose:

- represent one explicit provenance mapping chosen by the branch.

Recommended fields:

- `mapping_id: str`
- `source_entry_id: str | None`
- `source_endpoint_kind: str`
- `source_ref: str`
- `target_entry_id: str | None`
- `target_endpoint_kind: str`
- `target_ref: str`
- `mapping_kind: MappingKind`
- `provenance_mode: str`
- `score_hint: int`

Notes:

- keep mapping records separate from source and target entries;
- and make them fully explicit so projection and diagnostics do not need to reconstruct intent from branch mutation history.

##### `SolveStep`

Purpose:

- represent one selected branch step such as direct mapping, dissociation, association, recruitment, or late-stage boson collapse.

Recommended fields:

- `step_id: str`
- `step_kind: StepKind`
- `rule_family: str`
- `consumed_source_ids: tuple[str, ...]`
- `produced_source_ids: tuple[str, ...]`
- `resolved_target_ids: tuple[str, ...]`
- `created_mapping_ids: tuple[str, ...]`
- `created_operator_ids: tuple[str, ...]`
- `created_boson_ids: tuple[str, ...]`
- `score_hint: int`
- `diagnostic_labels: tuple[str, ...]`

Notes:

- `SolveStep` is the main audit trail of how the branch got where it is;
- every branch transition should be reconstructible from the ordered tuple of selected steps;
- and late-stage `W` / `Z` collapse should appear here as a real step kind rather than as hidden normalization.

##### `BranchResidue`

Purpose:

- hold explicit unresolved leftovers for branch comparison and final reporting.

Recommended fields:

- `unresolved_target_ids: tuple[str, ...]`
- `unused_optional_center_ids: tuple[str, ...]`
- `unsatisfied_required_center_ids: tuple[str, ...]`
- `unused_source_ids: tuple[str, ...]`
- `source_residue_inventory: InventorySummary`
- `target_residue_inventory: InventorySummary`
- `unsupported_notes: tuple[str, ...]`

Notes:

- residue must stay explicit even for "good" branches;
- and `--i` / `--I` status belongs here as well as in policy flags because it directly affects branch ranking and diagnostics.

##### `BranchState`

Purpose:

- represent one canonical search node in the best-first frontier.

Recommended fields:

- `available_sources: tuple[SourceEntry, ...]`
- `unresolved_targets: tuple[TargetEntry, ...]`
- `selected_steps: tuple[SolveStep, ...]`
- `selected_mappings: tuple[MappingRecord, ...]`
- `opened_source_ids: frozenset[str]`
- `consumed_source_ids: frozenset[str]`
- `ledger_summary: InventorySummary`
- `residue: BranchResidue`
- `policy_flags: frozenset[str]`
- `i_satisfied_ids: frozenset[str]`
- `I_satisfied_ids: frozenset[str]`
- `diagnostics: tuple[str, ...]`

Notes:

- this record should be frozen and hashable;
- all branch expansion should create a new `BranchState` rather than mutating an old one;
- and the frontier should order these records by a derived ranking key, not by ad hoc mutation-time heuristics.

#### Canonical Hash Key

The branch-state hash key should be derived from canonical semantic content, not from debug text or object identity.

Recommended hash components:

- sorted available source identities plus their availability-relevant semantic fields;
- sorted unresolved target identities plus their semantic fields;
- sorted consumed and opened source id sets;
- ordered selected-step semantic signatures;
- normalized `--i` / `--I` satisfaction sets;
- normalized residue signatures;
- and the active policy flags.

The hash key should explicitly exclude:

- transient frontier score values;
- human-readable diagnostic prose that does not change semantics;
- and any render-only or layout-only fields.

Two branches that are semantically equivalent should collapse to the same hash key even if they were discovered by different local candidate ordering.

#### Redundant Inventory Storage

For v1, inventory summaries should be stored redundantly on entries and on branch state rather than recomputed from scratch every time.

Recommendation:

- each `SourceEntry` and `TargetEntry` should carry its own canonical `InventorySummary`;
- each `BranchState` should also carry a cached whole-branch `ledger_summary`;
- and branch transitions should update these cached summaries explicitly.

Why:

- legality checks for direct mapping, dissociation, association, and recruitment are inventory-heavy;
- recomputing inventory from deep structure repeatedly will make the search loop slower and harder to reason about;
- and explicit cached summaries make diagnostics easier.

Guardrail:

- cached summaries must be treated as derived semantic state, not loose optional optimization;
- add invariant checks in tests so branch-level `ledger_summary` matches the inventories implied by the branch contents.

### Solver Rules

This is the first-draft normative rule set for the new solver. The point of this section is to make implementation decisions explicit enough that `solver.py` can be designed deliberately instead of filling gaps by convenience.

#### Rule Scope

These rules are for the first supported solver generation.

They should:

- govern what the solver is allowed to consider;
- govern the order in which solve families are explored;
- define what counts as exact closure, partial closure, residue, recruitment, and unsupported behavior;
- and provide a deterministic basis for implementation and fixtures.

They should not:

- silently settle theory-owned questions;
- force the new solver to inherit browser-side architectural debt;
- or widen the search space with convenience intermediates that have not been justified by explicit rules.

#### Rule 1: Normalize Into A Canonical Planner State

Before any search begins, the solver must normalize the request into one canonical planner-owned state.

That state must distinguish:

- authored reactants;
- authored products;
- authored center assemblies;
- authored operators;
- authored dissociation state;
- already-authored mappings if any are part of the request;
- and the active policy gates for recruitment and theory-dependent families.

No solve rule may depend on DOM shape, render order, menu state, or browser-local incidental structure.

Authored center-lane material is part of this canonical state, but only for supported center-assembly families. In particular:

- authored middle-lane inputs constrain the solve just like authored reactants and products do;
- the center lane should admit supported authored `W+`, `W-`, `Z`, `Free Architrinos`, and supported `Noether core` forms;
- the center lane should not be a generic slot for arbitrary composites;
- and `Higgs Cluster` should not be treated as a default center-lane family in v1, because it belongs either on the reactant side when explicitly authored or in the separate spacetime-recruitment rule family when solver-added.

The command-line and normalized-request model should distinguish two strengths of authored center-lane input:

- `--i` means authored middle-lane material that the solver may use or skip if a better closure exists without it;
- `--I` means stronger authored middle-lane material that the solver should use if any closure exists that accounts for it.

Both forms may appear in the same solve request. When they do:

- `--I` constraints take precedence over `--i` preferences;
- the solver should first rank branches by whether they satisfy the authored `--I` material;
- then, among branches that tie on `--I` satisfaction, treat clean use of authored `--i` material as a weaker preference;
- and diagnostics should report separately which authored center-lane inputs came from `--I` and which came from `--i`.

For supported `--i` material:

- the solver should consider branches that use it;
- but it may skip that material if a stronger closure exists without consuming or carrying it through;
- skipped `--i` material should remain visible in diagnostics so the user can see that it was not part of the chosen closure;
- and among branches that already tie on exact closure, `--I` satisfaction, and major residue or unsupported-state criteria, clean use of authored `--i` material should receive a weak ranking bonus.

For supported `--I` material:

- the solver should first prefer branches that consume or carry through that material in a supported way;
- if at least one full closure exists that accounts for the authored `--I` material, the chosen solution should come from that class of branches;
- if no full closure exists that accounts for the authored `--I` material but an alternate full closure exists without it, the solver may return that alternate closure and report that the `--I` constraint could not be satisfied;
- and if no alternate full closure exists, the solver should show the best partial progress it can make while still keeping the authored `--I` intermediaries explicit in the reported branch.

Among full closures, a branch that satisfies authored `--I` constraints should outrank a branch that does not, even if the `--I`-satisfying branch is somewhat more complex in operators or intermediate structure. The point of `--I` is to express a strong authored preference over the reaction story, not merely a weak hint.

#### Rule 2: Carry Through Exact Repeated Participants First

If an authored reactant and authored product have the same direct participant identity and the same conservative inventory, the solver must try to treat them as benign carry-through before exploring deeper operator logic.

This carry-through pass must:

- pair exact repeated participants first;
- emit direct continuity mappings for those pairs;
- remove those paired participants from the remaining unresolved solve task;
- and preserve them as authored continuity rather than as solver-created transformation.

The solver may skip this rule only when an explicit authored override says that an apparently identical participant must be transformed rather than carried through.

#### Rule 3: Choose One Unresolved Product As The Next Frontier

After carry-through, each branch expansion must select one unresolved product as the next target to explain.

The frontier product should be chosen by a stable rule such as:

- unresolved composite products before unresolved non-composite products;
- except authored `Higgs Cluster` products, which should be deferred as late-state targets unless they were already closed by exact carry-through;
- then products with the fewest legal closure families;
- then products with the strongest exact direct-closure candidates;
- then products with the largest unresolved inventory;
- then stable document order as a final tie-break.

The solver must not expand arbitrary reactant-side possibilities that are not being asked for by some unresolved product.

This composite-first rule reflects a conservative planning preference: complete assembled targets usually constrain the solve more strongly than standalone leftovers do, while unnecessary spacetime source or sink balancing should remain a late-state concern rather than the first thing the solver optimizes.

#### Rule 4: Try Direct Conservative Closure Before Adding Operators

For each frontier product, the solver must first try direct conservative closure from currently available source entries.

Direct closure is legal only if:

- source and target inventories are known;
- the direct conservative mapping gate passes;
- provenance is not contradicted by the move;
- and the candidate does not require hidden recruitment or hidden intermediate creation.

The direct conservative mapping gate is intentionally strict. Direct mapping is allowed only when the mapped unit preserves exact conservative identity, not merely its coarse participant label.

For v1, that means direct mapping requires:

- the same participant or node family where direct identity is being claimed;
- the same polarity;
- the same resolved conservative inventory for the mapped unit;
- and the same resolved internal conservative configuration for any internal degrees of freedom that the solver models explicitly and treats as physically meaningful.

This strict internal-configuration rule applies only to solver-visible, physically meaningful internal structure. The solver must not block direct mapping merely because some deeper internal detail is unknown or not represented in the active model. If an internal distinction is not solver-visible in the request and not part of the current conservative rule set, it is not yet a direct-mapping blocker. If the distinction is solver-visible and physically meaningful, then an exact match is required.

This matters especially for quark color inside color-neutral bound composites such as proton and neutron states. In the modern QCD picture, constituent quarks inside a hadron exchange gluons and continually reshuffle individual color labels while the bound state remains overall color-neutral. The solver should therefore avoid treating per-quark color labels inside an intact color-singlet composite as fixed direct-identity markers unless the active model explicitly promotes those labels to stable solver-visible structure for that case. In practice:

- a standalone or explicitly exposed constituent with a solver-visible color or polar configuration may require exact internal match for direct mapping;
- but an intact authored proton or neutron should not fail direct whole-composite carry-through merely because one imagined internal quark color assignment differs from another equivalent color-neutral realization of the same bound state.

Therefore, a same-name source and target do not automatically qualify for direct closure. For example, an `up quark` source with one resolved color or polar configuration must not map directly to an `up quark` target with a different resolved color or polar configuration. That would be an unmodeled internal change with no mechanism. In such a case, direct closure is forbidden and the solver must instead seek an explicit mechanism through supported dissociation, intermediate-material, and reassembly rules. If no supported mechanism exists, the branch remains unresolved rather than being waved through as direct continuity.

Direct closure families include:

- identical whole-composite carry-through for a composite frontier product;
- root-to-root carry-through or direct mapping for a standalone frontier product;
- center-assembly direct mapping where the source is already authored;
- and fragment-to-root reuse where an already-available constituent exactly closes a standalone target.

For intact composites, the default rule is conservative whole-composite carry-through. If an intact source composite and an intact target composite are the same authored composite kind, the solver should directly match them by default unless the active model sees a real physically meaningful mismatch in solver-visible structure, polarity, inventory, or other explicit conservative state. The solver should not open and rebuild such a composite merely because some hidden internal realization could differ.

Direct closure exploration should obey the following order:

1. exact whole-product carry-through for the frontier product;
2. exact direct root closure from one currently available source entry;
3. exact authored center-assembly direct closure where applicable;
4. exact fragment-to-root closure for standalone targets only.

Additional direct-closure rules:

- if the frontier product is composite, exact whole-composite closure must be attempted before any branch that breaks source composites open for fragments;
- fragment-to-root reuse must not cannibalize a stronger exact composite closure that is still available for another unresolved composite target;
- direct closure may consume only material already present in the branch state;
- and direct closure must not smuggle in late recruited material, hidden operator behavior, or hidden source opening.

If an exact whole-product direct closure exists, it should outrank any branch that needs additional operators or recruited material.

#### Rule 5: Introduce `Dissociate` Only To Expose Needed Constituents

`Dissociate` is legal only when it exposes source material that is needed for some unresolved product and is not otherwise available in the current source pool.

The solver may introduce `Dissociate` when:

- the needed constituent exists inside an authored composite source;
- the needed constituent exists inside an explicitly recruited assembly that has already been admitted into the branch;
- or the supported primitive solve language requires explicit release of intermediate material such as `Free Architrinos` or `Noether core` forms.

The solver should choose `Dissociate` only after it can name the target-side need that justifies the opening. In particular:

- the branch should identify which unresolved product or product node requires the released constituent;
- the selected dissociation should be the narrowest one that exposes the needed material;
- and the solver should prefer dissociating authored source composites before dissociating any recruited spacetime assembly.

The solver must not introduce `Dissociate`:

- as a speculative exploratory move with no target-side need;
- merely because dissociation is possible;
- or when a stronger exact non-dissociative closure already exists for the same frontier product.

When `Dissociate` is selected:

- the released constituents must become explicit new source entries in the branch state;
- the parent source must be marked as consumed, partially consumed, or opened according to the selected plan rather than remaining silently fully available;
- any released `Free Architrinos`, `Noether core` forms, or other supported primitive units must be counted explicitly as available downstream material;
- and dissociation must not automatically count as product closure by itself; it only changes the source pool.

This matters for color-neutral bound composites such as proton and neutron states. An intact color-neutral composite may carry through as one bound state without requiring the solver to freeze an internal quark-color assignment. But once the solver explicitly dissociates that composite, the released constituents become explicit solver-visible entries and may be individually color-charged or otherwise internally non-neutral in the solver sense. After dissociation:

- the branch must track the exposed constituent states explicitly rather than continuing to treat them as one hidden neutral bound object;
- the released constituent set may still be neutral in aggregate even though the individual exposed entries are not;
- and any later direct mapping or reassembly involving those exposed constituents must respect their now-visible internal configuration and closure requirements.

#### Rule 6: Introduce `Associate` Only For Exact Gather-And-Assemble Closure

`Associate` is legal only when two or more available source entries exactly conserve into one unresolved assembled product.

`Associate` may be introduced when:

- no stronger direct whole-product closure exists for that target;
- the chosen source entries are all available in the branch state;
- the chosen source entries together match the target inventory exactly;
- and the target is better represented as one assembled output than as unrelated residue.

`Associate` exploration should obey the following order:

1. exact assembly of an unresolved composite product from already-available source entries;
2. exact assembly of an unresolved supported standalone product from already-available primitive or released source entries;
3. only later, if separately enabled, more specialized derived recognizers layered on top of primitive exact closure.

Additional `Associate` rules:

- if unresolved non-`Higgs Cluster` composite products exist, `Associate` branches for those products should be explored before `Associate` branches for standalone products;
- authored `Higgs Cluster` products should remain late-state exceptions unless they close by direct carry-through or become the only remaining exact unresolved targets;
- the chosen source set must be minimal with respect to exact closure, meaning the branch should not include extra source entries that merely happen to conserve after cancellation;
- and the same source entry must not feed two different `Associate` outputs within one branch.

`Associate` must not be used:

- as a generic weak-reaction routing node;
- as a many-output transform;
- or to hide unresolved residue that should remain explicit.

Every selected `Associate` step must name:

- the consumed source entries;
- the produced output participant;
- the mapping endpoints into and out of the operator;
- and the exact inventory equality that justified the assembly.

#### Rule 7: Treat Intermediates As Real Branch-State Material

Any intermediate produced or released by a selected solve step must become explicit material in the branch state.

This includes:

- constituents released by `Dissociate`;
- `Free Architrinos` released from opened sources;
- `Noether core` forms released from opened sources;
- and any other supported primitive intermediate.

The solver must not:

- consume intermediates that were never made explicit;
- let one released unit be consumed twice across the same branch;
- or pretend that released material remains available after it has been consumed by a later step.

#### Rule 8: Keep `W` And `Z` Behind A Strong Gate

Authored `W` and `Z` participants are valid input material where their current conservative uses are already supported. Solver-created `W` and `Z` intermediates are not part of the default early search space.

For v1:

- authored `W` and `Z` may participate as authored sources or center assemblies;
- direct conservative mappings involving authored `W` and `Z` may be considered where the rules already justify them;
- solver-created `W` or `Z` intermediates must remain gated behind explicit rule enablement;
- and any branch that depends on unresolved `W^\pm` provenance theory must be rejected or marked unsupported rather than guessed.

Primitive exact closure remains the default priority over boson-shaped shorthand.

Late-stage boson collapse rule:

- after the solver has built completed candidate closures, it should run a late-stage pass over each candidate closure;
- if a closure contains center-lane assemblies that can be exactly associated into a `W` or `Z` boson under the accepted rule family, that closure should be rewritten to use the implied-operator boson form before final scoring;
- this rewrite should happen only when it preserves or improves exact closure and does not hide unresolved residue;
- and completed closures that include justified center-lane `W` or `Z` bosons should rank higher than equivalent closures that leave the same center-lane content uncollapsed.

This rule is meant to reward cleaner recognized closure, not to authorize speculative boson invention earlier in search.

The late-stage boson pass applies only to already completed closures. It must not be used to rescue an otherwise unclosed branch, invent missing closure, or convert a near-complete branch into a falsely complete one. Primitive conservative closure has to be established first; only then may the solver rewrite eligible center-lane material into recognized `W` or `Z` boson form.

For v1, this late-stage pass should use a strict exact recognizer, not a fuzzy readability heuristic. A center-lane group may collapse into a boson only when it matches an accepted exact pattern. "Looks close enough" is not sufficient.

Accepted exact recognizers so far:

- `W+` = anti `Noether core` plus six free positrinos;
- `W-` = pro `Noether core` plus six free electrinos;
- `Z` = pro `Noether core` plus anti `Noether core`.

Free-architrino-ledger interaction rule:

- a late-stage `W+` collapse may consume six positrinos from a center-lane `Free Architrinos` ledger tile;
- a late-stage `W-` collapse may consume six electrinos from a center-lane `Free Architrinos` ledger tile;
- that ledger tile should be understood as one aggregate bucket of available free architrinos, not as three solver-significant binary-linked subtiles with fixed per-slot identity;
- the source ledger tile must then be rewritten to the decremented remaining ledger rather than left unchanged;
- for example, a center-lane ledger tile of `11:7@` plus a pro `Noether core` may collapse to `W-` plus a remaining ledger of `5:7@`;
- likewise, a center-lane ledger tile of `11:7@` plus an anti `Noether core` may collapse to `W+` plus a remaining ledger of `11:1@`;
- and no `W` collapse is legal unless the required six-unit ledger decrement can be paid exactly from the available center-lane ledger content.

Allowed direct `Z`-mapping targets for v1:

- pro neutrino;
- anti neutrino;
- and photon.

If a closure contains an authored or late-stage-recognized `Z`, the solver may consider direct conservative mapping from that `Z` only into those supported target families unless a later rule expansion explicitly adds more.

Multiple late-stage boson collapses are allowed in the same completed closure, but only when each collapse uses disjoint center-lane material and each one independently satisfies the exact recognizer. One recognized `W` or `Z` must not consume ledger content, `Noether core` content, or other center-lane material that another recognized boson in the same closure also claims.

#### Rule 9: Recruit Spacetime Material Only As An Explicit Late Solve Family

The solver may recruit spacetime-derived material such as `Higgs Cluster` only after authored-source closure and justified dissociation have failed to close the remaining targets exactly.

Recruitment is legal only when:

- the active solve policy permits that recruitment family;
- the current branch has an exact remaining ledger deficit that authored material cannot close;
- the recruited material is added explicitly to the branch state with solver-created provenance;
- and the recruited branch scores better than the best unrecruited branch by achieving stronger exact closure.

Spacetime recruitment is not allowed merely because it makes a branch cleaner, shorter, or more visually elegant. If authored material can already close the reaction exactly, the solver must prefer that authored-material closure over a recruited alternative.

Recruitment must not be:

- invisible;
- free in score;
- or introduced before simpler authored-source closure families have been exhausted.

#### Rule 10: Mutate The Branch State Explicitly After Every Selected Step

After any selected direct map, `Dissociate`, `Associate`, or recruitment event, the branch state must be updated explicitly.

The update must record:

- which source entries were consumed;
- which products or product nodes were resolved;
- which intermediates were added;
- which operators were inserted;
- which sources became dissociated or partially consumed;
- and what residue remains on both sides.

No rule may rely on implicit side effects or "obvious" availability.

#### Rule 11: Prefer Exact Closure Over Creative Closure

The solver must prefer plans that achieve exact conservative whole-product closure using fewer special moves.

The branch and plan ranking order should be:

1. more exactly closed whole products;
2. fewer unresolved targets;
3. fewer unsupported targets;
4. more recognized justified center-lane `W` / `Z` closures after the late-stage normalization pass;
5. fewer recruited auxiliary inputs;
6. fewer inserted operators;
7. less leftover source or target residue;
8. more direct provenance continuity;
9. stable deterministic tie-breaks.

A plan that looks elegant but recruits unjustified material or hides residue must lose to a plainer exact conservative plan.

#### Rule 12: Unsupported Cases Must Stay Explicit

If a branch requires a rule family that has not been accepted into this solver rule set, the solver must not guess. It must either reject that branch or return it as unsupported with explicit diagnostics.

This applies especially to:

- weak-channel cases whose `W^\pm` provenance semantics are still theory-owned;
- synthetic `W` / `Z` insertion without an accepted rule family;
- recruitment families that are not enabled by policy;
- and any candidate that depends on ambiguous notation, ambiguous identity, or ambiguous inventory.

The first supported solver should prefer honest partial closure plus explicit residue over false complete closure.

When the solver emits a partial result, that result may still be exported for Reaction-side review, inspection, and manual correction. It must not become a continuation state for the next solver run. Any further solve attempt after review or editing must start from a fresh authored request assembled from the current Reaction participant state, not from prior partial-solve branch state.

#### Rule 13: Determinism Is Required

Repeated runs on the same normalized request and same enabled rule set must produce the same chosen result.

This requires:

- canonical state keys;
- canonical ordering of candidate families;
- stable scoring;
- and stable textual or structural final tie-breaks.

If two branches are truly equivalent, the solver must still pick one deterministically.

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
- `--i [h.W-.1:1@...]`
- `--I [h.W-.1:1@...]`
- `--p [Pe2u3dW+2h4h...]`

Here:

- `--r` supplies authored reactants;
- `--i` supplies optional or preferred authored center-lane intermediates or center assemblies that may be skipped if a better closure exists without them;
- `--I` supplies stronger authored center-lane intermediates or center assemblies that the solver should use if any closure exists that can account for them;
- and `--p` supplies authored products.

`--i` and `--I` may be used together in one solver call. In that case, `--I` is the stronger constraint layer and `--i` remains a weaker preference layer.

Those concise strings should be treated as a convenience syntax over the same normalized solver request, not as a second independent model.

The authored middle lane should constrain the solve just like authored reactants and products do, but it should not admit arbitrary assembly kinds. For v1, both `--i` and `--I` should be limited to explicitly supported center-assembly families rather than "anything the user can name."

Recommended initial `--i` / `--I` families:

- authored `W+`, `W-`, and `Z`;
- authored `Free Architrinos` ledgers;
- and authored `Noether core` forms that the active model already supports as center assemblies.

Recommended non-goal for v1:

- do not let `--i` or `--I` become a generic slot for arbitrary composites or arbitrary recruited source material;
- do not treat `Higgs Cluster` as a default middle-lane `--i` or `--I` family;
- instead, treat authored `Higgs Cluster` as a reactant-side input via `--r` when the user really wants it authored, or as a solver-recruited spacetime source when the active recruitment policy permits it.

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

| Notation    | Meaning                   | Notes                                                              | PDG API Notation |
| ----------- | ------------------------- | ------------------------------------------------------------------ | ---------------- |
| `d1` or `d` | down quark                | generation I may omit the `1`                                      | `d`              |
| `d2`        | strange quark             | generation II down-family                                          | `s`              |
| `d3`        | bottom quark              | generation III down-family                                         | `b`              |
| `e1` or `e` | electron                  | generation I may omit the `1`                                      | `e-`             |
| `e2`        | muon                      | generation II charged lepton                                       | `mu-`            |
| `e3`        | tau                       | generation III charged lepton                                      | `tau-`           |
| `h`         | Noether core              | base core symbol                                                   | `n/a`            |
| `h2`        | Bi Binary                 | reduced `Noether core` form                                        | `n/a`            |
| `h3`        | Uni Binary                | reduced `Noether core` form                                        | `n/a`            |
| `2h`        | photon                    | two-core photon shorthand                                          | `gamma`          |
| `4h`        | Higgs cluster             | four-core Higgs-cluster shorthand                                  | `n/a`            |
| `e:p@`      | `Free Architrinos` ledger | explicit electrino:positrino count, with both sides always present | `n/a`            |
| `N`         | neutron                   | aligns with existing `Pro Neutron` support                         | `n`              |
| `P`         | proton                    | aligns with existing `Pro Proton` support                          | `p`              |
| `u1` or `u` | up quark                  | generation I may omit the `1`                                      | `u`              |
| `u2`        | charm quark               | generation II up-family                                            | `c`              |
| `u3`        | top quark                 | generation III up-family                                           | `t`              |
| `v1` or `v` | neutrino                  | generation I may omit the `1`                                      | `nu_e`           |
| `v2`        | muon neutrino             | generation II neutrino                                             | `nu_mu`          |
| `v3`        | tau neutrino              | generation III neutrino                                            | `nu_tau`         |
| `W+`        | `W+` boson                | two-character token                                                | `W+`             |
| `W-`        | `W-` boson                | two-character token                                                | `W-`             |
| `Z`         | `Z` boson                 | direct match                                                       | `Z`              |

The `PDG API Notation` column is a naming bridge for API alignment only. It is not a claim of exact one-to-one ontology, especially for solver-only constructs such as `h`, `h2`, `h3`, and the `e:p@` ledger token.

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
- do not require separators around any token family when the surrounding token boundaries are already unambiguous under longest-match tokenization;
- and reject any `@` form that does not contain both explicit ledger sides before the trailing `@`.

Reference lexer fixtures for this grammar now live in [`content/contracts/examples/solver-compact-lexer/v1/index.json`](../../content/contracts/examples/solver-compact-lexer/v1/index.json), with the JS reference lexer in [`src/apps/reaction/ReactionSolverArgumentLexerRuntime.js`](../../src/apps/reaction/ReactionSolverArgumentLexerRuntime.js) and regression coverage in [`tests/reaction-solver-argument-lexer.test.js`](../../tests/reaction-solver-argument-lexer.test.js).

### Result And Integration Contract

The rebuilt solver should return explicit structured output rather than mutating app state directly.

This section owns the solver input/output boundary. The canonical machine-readable contracts now live in:

- [`solver-request/v1`](../../src/contracts/solver-request/v1/schema.json)
- [`solver-result/v1`](../../src/contracts/solver-result/v1/schema.json)

Reference fixtures for the frozen v1 boundary now live in:

- [`carry_through_neutron.v1.json`](../../content/contracts/examples/solver-request/carry_through_neutron.v1.json)
- [`carry_through_neutron_result.v1.json`](../../content/contracts/examples/solver-result/carry_through_neutron_result.v1.json)

[reaction](./reaction.md) should reference this section rather than restating the payload.

That output should be rich enough to carry:

- solved participants and participant roles;
- selected mappings and provenance claims;
- explicit operator insertions and placements or placement hints;
- unresolved residue and ambiguity reporting;
- and enough staged structure to feed Reaction review and later downstream export.

The Reaction app should consume that output through a projection adapter that materializes the solve into live participants, mappings, dissociation state, and operator placement. Composer should remain downstream of accepted Reaction output through explicit versioned data such as `reaction-flow/v1`, rather than calling solver runtime code.

The reviewed v1 boundary is now:

- `solver.py` returns semantic `solver-result/v1` data keyed by stable `participantId`, `anchorId`, `operatorId`, and dissociation ids;
- the Reaction-side result adapter resolves those semantic ids into live participant objects and node keys at projection time;
- solve-created operator placements cross the boundary only as advisory lane / row / slot records under `placement.operatorPlacements`;
- and Reaction keeps ownership of live operator creation, node-key packing, auto-dissociation marking, and any local row-slot fallback behavior.

### Request Format

The solver input submitted to the headless core should be one normalized `solver-request/v1` document, not a browser-state dump and not a CLI-specific ad hoc shorthand.

The intended top-level shape is:

- `schema`: fixed version tag `solver-request/v1`;
- `requestId`: stable request identity for fixtures, diagnostics, and result correlation;
- `origin`: optional source metadata such as `reaction`, `cli`, `pdg-ingest`, or fixture provenance;
- `participants`: all authored non-operator participants, with explicit `side` values `reactant`, `product`, or `center`;
- `manualOperators`: authored `Associate` or `Dissociate` operators that already exist in the request;
- `manualMappings`: authored mappings that must remain visible to the solver rather than being rediscovered from UI state;
- `dissociation`: authored dissociated-composite state that is already open and must be preserved;
- and `policy`: explicit recruitment, late-boson-collapse, weak-channel, and carry-through gates.

Required participant rules:

- every participant must carry a stable `id`, `templateId`, `label`, canonical `inventory`, `rootNodeId`, and explicit flat `nodes`;
- the request must carry solver-visible structure explicitly rather than asking the solver to infer node identities from rendered DOM or menu state;
- center-lane inputs belong in `participants` with `side: "center"` and optional `centerUsage: "optional" | "required"` to encode the `--i` / `--I` distinction;
- participant and node inventory must already be normalized into explicit conservative ledger fields;
- and the request must remain Reaction-independent enough that future CLI or PDG seeds can produce the same shape without importing browser runtime code.

Required request boundary rules:

- manual operators, manual mappings, and manual dissociation state must remain explicit top-level request data rather than hidden projection assumptions;
- the compact CLI grammar should normalize into this contract rather than becoming a second canonical input shape;
- the request may include source metadata, but solve semantics must not depend on browser-only identifiers, DOM order, or render geometry;
- and unsupported theory families must be expressed through `policy` gates rather than through silent omission or convenience guessing.

### Result Format

The solver result submitted to the Reaction app should be one structured `solver-result/v1` document, not a stream of ad hoc UI mutations.

The intended top-level shape is:

- `schema`: fixed version tag `solver-result/v1`;
- `resultId`: stable result identity for fixtures and review;
- `request`: back-reference to the solved `solver-request/v1` request id;
- `summary`: overall solve outcome, including whether the solve is exact, partial, ambiguous, or unsupported;
- `participants`: the participant records the projection adapter needs to preserve source ids, target ids, roles, and any solver-created intermediate or operator-side entries;
- `steps`: the ordered audit trail of selected carry-through, direct-map, `Dissociate`, `Associate`, recruitment, or late-collapse steps;
- `mappings`: selected source-to-target provenance claims, with enough endpoint identity to recreate live Reaction mappings;
- `operators`: solve-created operator insertions and their intended produced outputs;
- `dissociation`: explicit or implicit dissociation decisions selected by the solve, including auto-dissociated composite sources;
- `placement`: lane, row, or placement-hint data for solve-created operators and other projection-side layout needs;
- `residue`: unresolved sources, unresolved targets, and other leftover inventory the solver could not close;
- and `diagnostics`: ambiguity notes, rule-family provenance, warnings, and other review-facing details that should remain visible in Reaction.

Required contract rules:

- the result must be self-sufficient enough for the Reaction projection adapter to materialize the solve without rereading planner-internal state;
- result participants and steps must preserve authored versus solve-generated provenance explicitly rather than relying on naming convention alone;
- mappings, operators, dissociation, and residue must use stable participant or node identities rather than DOM-derived positions;
- placement data may be advisory, but semantic solve claims must not depend on render-order inference;
- manual authored Reaction state that the solver did not create must remain distinguishable from solve-created additions;
- partial results may be emitted to Reaction for review, but they are review artifacts rather than resumable solver state; any new solve must begin from a fresh authored request built from the current accepted/authored Reaction state;
- and the solve-result format is upstream of `reaction-flow/v1`: the solver submits to Reaction in this format, then accepted Reaction state exports downstream through the separate Reaction-owned handoff contract.

### Identity And Tie-Break Semantics

Before `solver.py` starts, the identity and selection rules need to be treated as normative rather than as scattered browser behavior.

External identity rules:

- authored participant ids in `solver-request/v1` are canonical and must pass through unchanged into `solver-result/v1` whenever the solver is still referring to the same authored participant;
- node or anchor identity in the external request/result contracts stays unpacked as `participantId` plus `anchorId`, not as one packed node-key string;
- the packed Reaction adapter key remains `participantId::nodeId` through [`ReactionNodeKeyRuntime`](../../src/apps/reaction/ReactionNodeKeyRuntime.js), but that packing is a Reaction-side adapter concern rather than the external solver contract;
- solve-generated operator ids in `solver-result/v1` should use compact deterministic ids such as `associate:1`, `associate:2`, and later `dissociate:1`, assigned in selected-step order within the final result;
- and the current browser solver's verbose structural refs are acceptable browser-local reference behavior, but they should not become the canonical external operator-id scheme for `solver.py`.

Deterministic candidate identity rules:

- if a candidate creates a solve-generated operator, the first `participantAdditions[].ref` is its deterministic candidate identity for ordering purposes;
- otherwise the fallback identity is the tuple `(candidate type, source participant id, source node id, target participant id, target node id)`;
- lexical ordering over that deterministic identity is the final tie-break when stronger semantic ranking terms tie;
- and the solver should treat that identity as an ordering device, not as a semantic excuse to encode browser-only detail into the public contract.

Current JS candidate ranking order that the Python solver should preserve unless intentionally revised:

1. more fully resolved products;
2. more matched target nodes;
3. fewer partial products;
4. higher candidate score;
5. lexical candidate identity.

Current JS whole-set selection ranking order that the Python solver should preserve unless intentionally revised:

1. more fully resolved products across the selected set;
2. more matched target nodes across the selected set;
3. fewer partial products;
4. more matched source nodes;
5. higher total score;
6. lexical ordering over the ordered selected-candidate identities.

Current JS solve-phase ordering that also matters for selection semantics:

1. direct-root, composite carry-through, fragment-root-direct, and associate families compete in the first base selection pass;
2. partial-composite-direct families are selected only after the base pass has already claimed whole participants, whole products, and fragment ownership;
3. product-child-direct families run after that on the remaining unclaimed source fragments and target fragments;
4. and automatic composite dissociation is currently inferred from selected mappings that consume internal rows, not from an earlier explicit selected `Dissociate` step.

The new solver may eventually re-express these rules more cleanly, but any intentional deviation must be visible in fixtures and review rather than emerging as accidental Python drift.

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
- or collapse new solve logic back into the Reaction app adapter layer.

### File Boundaries

Likely durable boundaries in the rearchitected system are:

- a normalized solve-request schema;
- a compact-notation parser for command-line use;
- a headless external solve core;
- a structured solve-result schema;
- a Reaction result-to-projection adapter;
- a Reaction projection adapter;
- a Reaction surface-grid placement adapter;
- and an export or import adapter for downstream Composer flow.

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
- [pdgfeed](./pdgfeed.md) should eventually feed normalized seeds and candidate-review context into this solver rather than replacing it.
- [composer](./composer.md) is downstream and should consume accepted Reaction output rather than invoke solver runtime code.
- [app-architecture](./app-architecture.md) defines the app-boundary rule that prohibits direct Composer/Reaction runtime coupling.
- [app-architecture](./app-architecture.md) owns the cross-cutting app-boundary and modularity rules that apply here.

## Priorities

### 1. Solver Rearchitecture

Status: `in_progress`

Objective:

- build the new solver as a fast external headless core with explicit JSON and compact CLI inputs, while preserving clean Reaction review and Composer handoff boundaries.

Current state:

- the `solver-request/v1` / `solver-result/v1` seam is in place and Reaction UI already solves through that boundary;
- Node-side contract solves default to the external CLI path in [`solve-reaction.mjs`](../../scripts/solve-reaction.mjs);
- the external CLI accepts either a request file path or one raw `solver-request/v1` JSON document on `stdin`, so file-based and pipe-based handoff can use the same contract boundary;
- the external CLI now runs the fresh Python core in [`reaction_solver_core.py`](../../scripts/reaction_solver_core.py) instead of the old JS bridge;
- the PDG closure sweep in [`pdg-closure-sweep.mjs`](../../scripts/pdg-closure-sweep.mjs) now distinguishes unsupported-input cases from supported-but-unsolved solver cases and reports exact-closure percentage only over analyzable reactions;
- the external core now closes the current supported generated PDG weak-channel request set exactly through a generic weak-channel operator path, and pion lepton-only channels now emit explicit meson provenance steps with solve-generated quark constituents, `Noether core` intermediates, a shared `Free Architrinos` pool, and a `Higgs cluster` supplement when the requested lepton multiplicity exceeds the meson's own core supply;
- charged and neutral pion support plus repeated-particle expansion now promote a larger frozen live manifest into the analyzable denominator: the current recomputed manifest reaches `64` exportable reactions with `37` exact, `2` partial, and `25` no-solution in the sweep;
- the top unsupported-particle pressure has therefore shifted away from pion vocabulary and toward kaons, heavier mesons/baryons, and generic textual hadron tokens such as bare `pi`, while the solver-completion pressure has shifted toward the newly analyzable pion-bearing families that still return `partial` or `no-solution`;
- the extracted JS bridge remains available as a shrinking in-process fallback and reference path;
- and regression coverage exists for the current supported golden-corpus families plus authored manual operators, manual mappings, and manual dissociation accounting/preservation in [`reaction-external-solver-core.test.js`](../../tests/reaction-external-solver-core.test.js) and [`reaction-solver-contract-runtime.test.js`](../../tests/reaction-solver-contract-runtime.test.js).

Next focus:

- treat every newly added supported particle assembly that fails the sweep as a concrete implementation gap in the fresh solver core and add focused regression tests for each family as it is closed;
- keep expanding external-core coverage beyond the current supported PDG request set and golden-corpus families while keeping the `solver-request/v1` / `solver-result/v1` seam stable;
- keep unsupported-particle cases out of the solver-completion denominator and use the sweep report's unsupported-particle counts to prioritize future mapping work without conflating it with solver behavior;
- use the extracted JS bridge only as a shrinking reference path while the external core reaches the remaining accepted solver behavior exposed by the sweep;
- and then remove the remaining browser-safe in-process fallback once the external path closes the supported reaction set through the stable `solver-request/v1` / `solver-result/v1` boundary.

Deferred idea:

- add a command-line option that emits all exact full-closure alternatives for review instead of only the final selected closure, so ranking and late-stage `W` / `Z` preference can be inspected directly when needed.

### 2. Close The Newly Analyzable Pion Families

Status: `in_progress`

Objective:

- close the newly analyzable pion-bearing solver families so the sweep turns current `partial` / `no-solution` pion cases into exact closures.

Why it matters:

- adding charged-pion and neutral-pion mapping already promoted a broader live manifest into the analyzable denominator, which exposed the next solver gaps concretely instead of hiding them behind unsupported-input classification;
- the remaining uncovered pion cases are now solver-behavior gaps rather than PDG vocabulary gaps;
- and pion content is still simple enough to extend without reopening the larger boson-policy questions.

Required particle content:

- `pi+` is now supported as `u + anti-d`;
- `pi-` is now supported as `d + anti-u`;
- `pi0` now exports through one canonical PDG-facing form and the solver treats `u + anti-u` and `d + anti-d` authored options as equivalent for closure purposes.

Next steps:

- add focused external-solver rules and tests for the remaining newly analyzable charged-pion side channels now visible in the sweep, such as radiative charged-pion decay, `pi+ -> e+ nu_e + pi0`, and pion-pair-bearing proton-decay products;
- carry the new meson provenance technique into the remaining neutral-pion electromagnetic side channels still open in the sweep, especially `pi0 -> 3gamma` and `pi0 -> 4gamma`, without falling back to PDG-id-specific shortcuts;
- decide whether the remaining `3gamma` and `4gamma` neutral-pion channels should be solved through a more general repeated-photon meson rule or left as later electromagnetic-family work;
- and use the closure sweep to confirm that each added pion family improves exact-closure percentage rather than merely increasing the analyzable denominator.

### 3. Add Kaon Support After The Pion Family

Status: `pending`

Objective:

- add the four kaons as supported light-meson content, using the same explicit particle-mapping discipline that just expanded pion coverage.

Why it matters:

- the sweep pressure has already shifted toward kaons once charged-pion support moved more reactions into the analyzable denominator;
- kaons are the next small, concrete meson family that can expand supported input vocabulary without jumping immediately to broader heavier-hadron policy;
- and the neutral kaon pair shares charge while differing by strangeness, so the solver contract and closure logic need explicit identity handling rather than a single neutral-kaon placeholder.

Required particle content:

- `K+` as `u + anti-s`;
- `K-` as `s + anti-u`;
- `K0` as `d + anti-s`;
- and `anti-K0` as `s + anti-d`.

Next steps:

- add kaon particle mappings and request/result support so kaon-bearing reactions move from unsupported-input classification into the analyzable denominator;
- make charge and strangeness distinctions explicit in the solver path, especially for the neutral `K0` / `anti-K0` pair;
- add focused external-solver rules and tests for the first kaon-bearing channels exposed by the sweep;
- and use the closure sweep to measure whether kaon support improves exact or partial closure rather than only increasing supported-input count.
