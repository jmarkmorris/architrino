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

Open weak-channel provenance question:

- future weak-channel solving depends on whether a `W^\pm` corridor should be treated as carrying pro/anti `Noether core` provenance into an outgoing lepton branch, or only as the charged transaction delta while final pro/anti cores are recruited from a local reservoir such as `4h` / Higgs-cluster or Noether-Sea content;
- this matters especially for `beta reaction` solves, where a `W-` corridor may plausibly supply anti-core provenance to the outgoing antineutrino while the electron still recruits a pro core from the local reservoir;
- and this question should be treated as theory-owned by [standard-model-closure](../standard-model-closure/standard-model-closure.md) rather than silently fixed by solver convenience.

Implementation stance:

- treat the current browser solver as a reference implementation for covered behavior, not as the codebase being ported;
- build the new headless solver behind explicit request/result contracts and cleaner internal architecture;
- and use fixture-based comparison and review to verify functional coverage without inheriting browser-specific design debt.

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

Once a branch already has a completed or near-completed primitive closure, the solver may run a late-stage recognition pass over the center lane. In that pass:

- if a set of center-lane assemblies can be exactly associated into a `W` or `Z` boson under the accepted rule family;
- and the resulting boson representation does not break any already-established conservative closure;
- then the solver should replace that assembly group with the implied-operator `W` or `Z` form before final scoring.

This is a normalization and ranking pass, not a license to widen the early search space. The solver should not generate free synthetic `W` / `Z` branches up front just because such a collapse might later be possible.

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

For supported `--i` material:

- the solver should consider branches that use it;
- but it may skip that material if a stronger closure exists without consuming or carrying it through;
- and skipped `--i` material should remain visible in diagnostics so the user can see that it was not part of the chosen closure.

For supported `--I` material:

- the solver should first prefer branches that consume or carry through that material in a supported way;
- if at least one full closure exists that accounts for the authored `--I` material, the chosen solution should come from that class of branches;
- if no full closure exists that accounts for the authored `--I` material but an alternate full closure exists without it, the solver may return that alternate closure and report that the `--I` constraint could not be satisfied;
- and if no alternate full closure exists, the solver should show the best partial progress it can make while still keeping the authored `--I` intermediaries explicit in the reported branch.

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

For v1, this late-stage pass should use a strict exact recognizer, not a fuzzy readability heuristic. A center-lane group may collapse into a boson only when it matches an accepted exact pattern. "Looks close enough" is not sufficient.

Accepted exact recognizers so far:

- `W+` = pro `Noether core` plus six free positrinos;
- `W-` = anti `Noether core` plus six free electrinos;
- `Z` = pro `Noether core` plus anti `Noether core`.

Free-architrino-ledger interaction rule:

- a late-stage `W+` collapse may consume six positrinos from a center-lane `Free Architrinos` ledger tile;
- a late-stage `W-` collapse may consume six electrinos from a center-lane `Free Architrinos` ledger tile;
- the source ledger tile must then be rewritten to the decremented remaining ledger rather than left unchanged;
- for example, a center-lane ledger tile of `11:7@` plus an anti `Noether core` may collapse to `W-` plus a remaining ledger of `5:7@`;
- likewise, a center-lane ledger tile of `11:7@` plus a pro `Noether core` may collapse to `W+` plus a remaining ledger of `11:1@`;
- and no `W` collapse is legal unless the required six-unit ledger decrement can be paid exactly from the available center-lane ledger content.

Allowed direct `Z`-mapping targets for v1:

- pro neutrino;
- anti neutrino;
- and photon.

If a closure contains an authored or late-stage-recognized `Z`, the solver may consider direct conservative mapping from that `Z` only into those supported target families unless a later rule expansion explicitly adds more.

#### Rule 9: Recruit Spacetime Material Only As An Explicit Late Solve Family

The solver may recruit spacetime-derived material such as `Higgs Cluster` only after authored-source closure and justified dissociation have failed to close the remaining targets exactly.

Recruitment is legal only when:

- the active solve policy permits that recruitment family;
- the current branch has an exact remaining ledger deficit that authored material cannot close;
- the recruited material is added explicitly to the branch state with solver-created provenance;
- and the recruited branch scores better than the best unrecruited branch by achieving stronger exact closure.

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

### 2. Choose The Core Solver State Model And Python Implementation Mechanics

Status: `next`

Goal:

- choose the data structures, state-transition model, and Python-side implementation mechanisms that make the new solver tractable, testable, and robust before too much rule logic hardens around a weak representation.

Why it matters:

- the difficulty of this solver is not just the rule set; it is also the representation of partial states, available source pools, consumed fragments, operator insertions, and canonical branch identity.
- a poor state model will make correct search, pruning, determinism, and diagnostics much harder than they need to be.
- Python may offer libraries or built-in capabilities that make this much more manageable if chosen deliberately rather than by habit.

First thoughts:

- prefer immutable or mostly-immutable planner-state records so branch expansion is easier to reason about and compare safely;
- use canonical structural keys for memoization and branch deduplication rather than ad hoc mutable objects;
- keep normalized request and result schemas separate from internal search-state structures;
- consider whether `dataclasses`, `pydantic`, `attrs`, `frozenset`, structural hashing, or small graph/search helper libraries would materially improve clarity and correctness;
- prefer standard-library-first where possible, but stay open to a small dependency if it meaningfully improves state validation, pattern matching, or search bookkeeping;
- and evaluate whether some rule families are better modeled as graph rewrites, multiset ledger transitions, or explicit operator-state transitions rather than as loose object mutation.

Next steps:

- write down candidate internal state shapes for branch state, source entries, unresolved targets, and operator steps;
- compare a few implementation styles such as immutable dataclass state, graph-based state, and multiset-ledger-plus-provenance state;
- identify any Python libraries worth using deliberately rather than defaulting to hand-rolled structures;
- and choose the representation before `solver.py` rule implementation gets far enough that changing it becomes expensive.

### 3. Freeze A Golden Coverage Corpus From The Current JS Solver

Status: `next`

Goal:

- freeze the current supported conservative cases as request/result fixtures before the Python implementation begins.

Why it matters:

- coverage should be measured against stable fixtures and expectations, not by rereading browser-side code while the new solver is being built.

Next steps:

- choose the initial supported cases from the current proposal, layout, and projection tests;
- capture those cases as golden request/result fixtures;
- and use that corpus as the first acceptance bar for `solver.py`.

### 4. Lock Down Identity, Selection, And Tie-Break Semantics

Status: `pending`

Goal:

- make the winning-plan rules and identity conventions explicit before the Python implementation starts.

Why it matters:

- a new Python solver can appear correct while still disagreeing with the covered browser behavior on ids, node references, operator refs, or which candidate family should win.

Next steps:

- define stable participant ids, node-key rules, and synthetic operator refs such as `associate:1`;
- write the candidate-selection and set-selection tie-break order as compact normative rules;
- and keep those rules aligned with the current whole-product-first selection behavior.

### 5. Decide The Python / JS Boundary For Layout And Projection

Status: `pending`

Goal:

- decide exactly which responsibilities stay in the headless solver and which stay in the Reaction app adapters.

Why it matters:

- `solver.py` should return semantic solve output through a stable contract, not accidentally absorb UI-side layout and projection behavior that already has a clear local seam.

Next steps:

- decide whether Python returns semantic solve output plus placement hints or fully resolved operator placements;
- keep actual Reaction-side row-slot layout in JS unless a stronger reason appears;
- and keep projection into live participants, mappings, and dissociation state as an explicit adapter boundary.

### 6. Finish The Compact CLI Grammar As A Testable Lexer Spec

Status: `pending`

Goal:

- turn the shorthand notation into a fully testable lexer contract rather than an examples-only description.

Why it matters:

- the command-line form should be a convenience syntax over the same request schema, and the implementation will go faster if valid and invalid forms are frozen in fixtures first.

Next steps:

- add positive and negative fixture strings for every committed token family and ambiguity rule;
- keep longest-match, separator, and rejection rules explicit;
- and keep the compact grammar subordinate to the canonical normalized request format.

### 7. Resolve Or Explicitly Gate Theory-Dependent Weak-Channel Cases

Status: `pending`

Goal:

- keep `solver.py` from silently guessing on theory-owned weak-channel provenance questions.

Why it matters:

- the current open `W^\pm` provenance question is real, and the first headless solver should not hard-code an answer by implementation convenience.

Next steps:

- either decide the currently open weak-channel provenance cases or mark them unsupported in v1;
- keep the unsupported boundary explicit in the request/result contracts and coverage corpus;
- and treat theory-owned resolution as upstream of broader weak-channel expansion.

### 8. Shrink The Solver UI Runtime

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

### 9. Extend Primitive Charge Routing

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

### 10. Improve Residue And Dissociation Reporting

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

### 11. Add Exact Boson Recognition On Top Of Primitive Solves

Status: `pending`

Goal:

- recognize exact boson-shaped subgraphs only after primitive charge-routing is working.

Why it matters:

- this preserves the primitive-first planning model while still allowing readable derived shorthand later.

Next steps:

- define exact recognizers over primitive solved subgraphs;
- keep authored source-side bosons valid;
- and avoid widening the first-pass solve search space with free synthetic boson insertion.

### 12. Stay Ready For PDG Seeds Without Becoming PDG-Specific

Status: `pending`

Goal:

- keep the solver reusable as the normalized planning core for future PDG ingest.

Why it matters:

- PDG work should reuse this seam rather than create a parallel solver.

Next steps:

- keep the abstract solve state as the planner boundary;
- keep solver inputs normalized and UI-independent;
- and let PDG ingest talk to the solver through explicit seed/proposal shapes rather than shared UI code.

### 13. Solver Rearchitecture

Objective:

- build the new solver as a fast external headless core with explicit JSON and compact CLI inputs, while preserving clean Reaction review and Composer handoff boundaries.

## Note On The Current Browser Solver

The current browser-side JavaScript solver remains a functionality reference for already covered conservative cases while the new headless solver is designed and built. This note keeps the current browser solver specifics available without making them the design center or implying that the new solver should be a direct port.

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
