# Legacy Five-Lane Prototype Flow

## LLM Instructions

- Keep `Transition Plan` ordered as the current work queue, with the most important active item first.
- Keep `Target Model` descriptive and stable; move task-shaped material into `Transition Plan`.
- Treat this document as a legacy prototype reference for the former five-lane solve/render transition.
- Prefer describing the prototype contract and rendering consequences over local implementation detail.

## Purpose

This document records the former transition from a forward-only-but-skip-capable prototype flow grammar to a strict five-lane handoff grammar in which every connection advances exactly one lane.

It remains useful as migration history and prototype reference material.

It does not define the forward `pdgfeed -> combo -> xyzzy -> composer` process. For the intended active path, see [combo](./combo.md), [xyzzy](./xyzzy.md), and [observer](./observer.md).

The target lane sequence is:

- lane 1 to lane 2 only;
- lane 2 to lane 3 only;
- lane 3 to lane 4 only;
- lane 4 to lane 5 only;
- and no connection may skip a lane.

## Target Model

### Canonical Lane Grammar

The solved reaction image must always use all five visible lanes:

- lane 1: reactant-side assembly groups and source participants;
- lane 2: left-side operators;
- lane 3: center-lane groups and middle-lane participants;
- lane 4: right-side operators;
- lane 5: product-side assembly groups and destination participants.

Allowed connection pattern:

- `lane 1 -> lane 2`;
- `lane 2 -> lane 3`;
- `lane 3 -> lane 4`;
- `lane 4 -> lane 5`.

Forbidden connection pattern:

- any `lane 1 -> lane 3/4/5`;
- any `lane 2 -> lane 4/5`;
- any `lane 3 -> lane 5`;
- any backward route;
- and any same-lane route.

### Lane-1 Composite Rule

Lane-1 whole composites do not move forward as composites.

Instead:

- a lane-1 composite title tile is only a visual summary of the lane-1 source object;
- it is not itself a moving flow endpoint;
- the solver must expose the relevant lane-1 row-level `assembly.group` entries explicitly;
- and only those row-level `assembly.group` entries may route from lane 1 into lane 2.

This transition removes the idea that a lane-1 composite is first carried forward as one intact moving composite and later opened. The moving units are the lane-1 row groups from the start.

### Composite Title Rule

Composite title tiles are no longer used to indicate opened or dissociated state.

That means:

- no modified title-border styling for opened composites;
- no special visual “opened composite” title treatment;
- and no legacy solve-core or legacy review-runtime state whose purpose is to decorate a composite title tile as dissociated.

If a composite contributes flow, that fact is shown by the explicit lane-1 row groups and their downstream connections, not by a modified title shell.

### Operator Set

The operator vocabulary becomes:

- lane 2: `Dissociate` or `Pass Thru`;
- lane 4: `Associate` or `Pass Thru`.

`Pass Thru` is a single-tile operator with one input and one output. It carries one standalone participant or one `assembly.group` forward unchanged into the next lane.
`Pass Thru` is not a transform, gather, split, or many-output junction. It is only the explicit one-lane continuity operator required by the strict five-lane grammar.

### Carry-Through / Catalyst Pattern

A catalyst-like or unchanged carry-through participant must still traverse all five lanes.

Canonical pattern:

- `assembly.group -> Pass Thru -> assembly.group -> Pass Thru -> assembly.group`.

Examples:

- `electron -> Pass Thru -> electron -> Pass Thru -> electron`;
- `Noether Pair pro subassembly.group -> Pass Thru -> lane-3 pro subassembly.group -> Pass Thru -> lane-5 pro subassembly.group`;
- `Noether Pair anti subassembly.group -> Pass Thru -> lane-3 anti subassembly.group -> Pass Thru -> lane-5 anti subassembly.group`.

The solver must emit the full chain explicitly in solved JSON. The Reaction app should not invent or infer any skipped middle steps.

### Dissociation Pattern

If a lane-1 row-level assembly group must open further, the lane-2 operator is `Dissociate`.

Canonical pattern:

- lane 1 source assembly group routes to a lane 2 `Dissociate`;
- lane 2 `Dissociate` routes to either one or two lane 3 groups;
- if a surviving core/group remains, it routes to the appropriate lane 3 core/group;
- if released polar architrinos exist, they route to a lane 3 `Unbound Architrinos` group;
- the `Unbound Architrinos` group updates its ledger there, in lane 3;
- downstream product building then begins from lane 3 into lane 4 only.

In Xyzzy, that same middle-lane participant should appear as the four-tile `Unbound | Electrinos | Positrinos | Architrinos` group rather than as a one-tile ledger label.

Allowed dissociate outcomes:

- one lane-3 group when a pro or anti `Noether core` dissociates fully into `Unbound Architrinos`;
- two lane-3 groups when an assembly group yields both a surviving lane-3 core/group and a lane-3 `Unbound Architrinos` group.

### Association Pattern

Product construction must begin from lane 3 and must route through lane 4 operators before reaching lane 5.

Canonical pattern:

- lane 3 `Unbound Architrinos` route to one or more lane 4 `Associate` operators when assembled products need them;
- lane 3 `Noether core` or other lane-3 groups route to lane 4 `Associate` when they contribute to a built product;
- lane 3 unchanged groups or participants route to lane 4 `Pass Thru` when they simply survive forward unchanged;
- each lane 4 `Associate` produces exactly one lane 5 product assembly group.

### Solver / Reaction Boundary

The solver owns:

- the full five-lane map;
- operator choice;
- participant placement by lane and row;
- lane-1 row-group expansion for any composite source that contributes flow;
- all intermediate lane-3 groups required by the plan;
- and the full solved JSON connectivity.

The Reaction app owns:

- simple lane-to-lane rendering;
- validation that every connection advances exactly one lane;
- operator tiles and participant tiles on the correct lane;
- and direct route drawing from each lane to the lane immediately to its right.

The Reaction app should not solve the route pattern. It should simply connect each object to the objects in the next lane according to the solver-owned JSON.

## Transition Plan

### 1. Freeze The New Lane Law In Contracts

Status: `completed`

Goal:

- define the strict `1 -> 2 -> 3 -> 4 -> 5` law as the only valid lane progression;
- remove the older rule that allowed forward skipping;
- and make that law explicit in the legacy prototype docs and `reaction-flow/v1` / `solver-result/v1` validation.

Work:

- update the legacy solve-core flow contract so no solved mapping may skip a lane;
- update the legacy review-runtime validation so any skip is rejected immediately;
- update any connection-policy helpers that currently allow `1 -> 3`, `1 -> 5`, `2 -> 4`, or `3 -> 5`;
- update contracts so lane-1 whole composites are not valid moving source endpoints;
- and add a shared validation helper that checks lane delta equals exactly `+1`.

Done when:

- both legacy solve-core and legacy review-runtime treat lane skipping as invalid;
- solved library entries that skip lanes fail validation;
- and the lane rule is described consistently in one place.

Result:

- legacy `reaction-flow/v1` now requires explicit five-lane placement and adjacent-only mappings on the accepted prototype path;
- legacy prototype import/export and mapping validation reject skip-lane and same-lane routes;
- and temporary legacy compatibility is isolated to migration-only code rather than the accepted validation path.

### 2. Introduce `Pass Thru` As A First-Class Operator

Status: `completed`

Goal:

- add a new single-tile `Pass Thru` operator to the shared operator vocabulary for lane 2 and lane 4.

Work:

- add `Pass Thru` to the operator registry and picker/runtime catalogs;
- give it one input connector and one output connector;
- define its ledger behavior as identity carry-through rather than transform;
- define its export/import representation in solved JSON;
- and add rendering, accessibility label, and export tests alongside `Associate` and `Dissociate`.

Done when:

- `Pass Thru` can appear in solved JSON, in Reaction import/export, and on the canvas;
- and the solver can emit it deterministically for unchanged carry-through flow.

Result:

- `Pass Thru` now exists in the shared registry, canvas picker/runtime, import/export path, and accepted document fixtures;
- lane 2 now supports `Dissociate` and `Pass Thru`;
- and lane 4 now supports `Associate` and `Pass Thru`.

### 3. Redefine Solver Planning Around Mandatory Lane Completion

Status: `active`

Goal:

- make the solver produce explicit five-lane chains rather than shorter forward shortcuts.

Work:

- treat every solved branch as a lane-complete chain;
- if a lane-1 source is composite, expand it into explicit lane-1 row-level `assembly.group` sources before any downstream routing;
- if a lane-1 row group survives unchanged, insert `Pass Thru` in lane 2 and lane 4 with an explicit lane-3 middle participant;
- if a lane-1 row group opens further, insert `Dissociate` in lane 2 and emit explicit lane-3 outputs;
- require every lane-3 participant that contributes to a lane-5 product to route through a lane-4 operator;
- and ensure the solver chooses between `Associate` and `Pass Thru` based on whether the lane-4 step changes assembly identity.

Done when:

- no solved plan relies on direct `lane 1 -> lane 3/5` or `lane 3 -> lane 5` mapping;
- no solved plan routes a lane-1 whole composite forward as one moving unit;
- and unchanged catalyst-like flow still renders as a full five-lane story.

Current note:

- accepted legacy `reaction-flow/v1` examples now use explicit five-lane documents;
- the live prototype library no longer depends on pre-built solved artifacts and instead solves request fixtures on selection;
- and the raw prototype solve-core still needs a native lane-complete planning pass so request-backed library solves and accepted exports stay identical without any compatibility rewrite.

### 4. Define Lane-3 Identity Rules

Status: `active`

Goal:

- pin down what the lane-3 participant means in each family so the legacy solve-core can emit stable intermediate identities.

Work:

- define the lane-3 identity for unchanged carry-through participants;
- define whether lane-3 carry-through groups preserve the same participant id or receive a solve-generated intermediate id;
- define how lane-1 composite row groups are named in solved JSON before any lane-2 routing;
- define how row-derived center groups are named in solved JSON;
- and define how `Unbound Architrinos` ledger groups accumulate contributions from one or more lane-2 dissociations.

Done when:

- the legacy solve-core has one deterministic naming and identity rule for lane-3 intermediates;
- and the legacy prototype runtime only renders those ids instead of inventing local stand-ins.

Current note:

- the legacy prototype runtime now accepts explicit lane-3 identities and does not invent skipped middle participants during normal import/export;
- migration code currently generates stable `flow_migration_*` intermediates where legacy accepted documents lacked a strict lane-3 carry participant;
- native solve-core-owned naming for those carry-through intermediates still needs to replace the migration-era fallback names.

### 5. Simplify Legacy Prototype Rendering To Adjacent-Lane Routing

Status: `completed`

Goal:

- reduce the legacy prototype runtime to simple adjacent-lane connection rendering.

Work:

- make route rendering assume that every mapping is between adjacent lanes only;
- simplify path validation and connection affordances to “only look one lane right”;
- remove UI logic that keeps later-lane targets available from earlier lanes;
- remove UI logic and styling that mark composite title tiles as dissociated or opened;
- add `Pass Thru` to the lane-2 and lane-4 add/runtime flows;
- and keep the visible grammar panel aligned with the new five-lane-only law.

Done when:

- legacy prototype routing code no longer reasons about legal multi-lane jumps;
- and user-authored or solve-core-authored mappings both obey the same adjacent-lane rule.

Result:

- legacy prototype mapping affordances now treat the next lane to the right as the only legal forward target;
- target highlighting and validation are aligned with the adjacent-only rule;
- and composite title styling no longer carries special dissociation-state semantics.

### 6. Update Import / Export Schemas And Example Documents

Status: `completed`

Goal:

- make accepted legacy JSON documents fully reflect the five-lane model.

Work:

- update legacy solved-document import/export checks so `Pass Thru` is legal and skip-lane mappings are illegal;
- regenerate contract examples to use explicit lane-2 and lane-4 operators;
- regenerate composite-source examples so flow starts from lane-1 row groups rather than from whole-composite forward mappings;
- update fixture documents that currently use direct forward skips;
- and validate that every visible lane participant/operator has the required adjacent connection.

Done when:

- accepted legacy `reaction-flow/v1` documents carry the full five-lane path explicitly;
- and the accepted example set contains no legacy skip-lane examples.

Result:

- accepted document schema/layout now records explicit participant lane placement and operator lanes `2` / `4`;
- contract examples have been regenerated into explicit five-lane documents;
- the live prototype library now points at request fixtures rather than checked-in solved artifacts;
- and legacy accepted solved documents are migrated by regeneration rather than left in mixed skip-lane form.

### 7. Add Transition Regressions

Status: `completed`

Goal:

- keep the cutover safe while both legacy solve-core and legacy prototype runtime change together.

Required tests:

- reject any mapping whose source lane and target lane differ by anything other than `+1`;
- verify `Pass Thru` imports, renders, exports, and participates in legacy solve-core output;
- verify unchanged catalyst flow becomes `lane 1 -> lane 2 -> lane 3 -> lane 4 -> lane 5`;
- verify a lane-1 whole composite never appears as a forward-moving source endpoint;
- verify lane-1 composite flow starts from explicit row-level `assembly.group` entries;
- verify dissociation flows from lane 2 to lane 3 only and never directly to lane 4 or lane 5;
- verify `Unbound Architrinos` only leave lane 3 through lane-4 operators;
- verify all lane-5 products are fed only from lane 4;
- verify composite title tiles never receive special opened-composite border styling;
- and verify accepted example documents contain no lane-skipping edges.

Done when:

- the lane law, the new operator, and the updated flow families are all covered by focused tests in both legacy solve-core and legacy prototype-runtime layers.

Result:

- legacy prototype export, request-backed library solve/import, participant rendering, and Composer handoff tests now cover the adjacent-only lane law and explicit five-lane documents;
- and the accepted example fixtures are checked against the strict lane-complete contract.

## Implementation Notes

- Make the prototype solve-core transition first at the contract level, even if the first implementation temporarily emits more verbose intermediate groups than the final polished model.
- Keep the legacy prototype runtime simple: render the solve-core-owned map and reject invalid lane jumps rather than trying to repair them.
- Do not preserve old skip-lane compatibility in the final validation path. If temporary compatibility is needed during migration, keep it behind isolated conversion code and remove it once fixtures are regenerated.
- The current isolated compatibility path is the five-lane regeneration runtime used to migrate accepted legacy solved documents into strict legacy `reaction-flow/v1`.
- Composer imports the explicit five-lane graph by collapsing it back to outer reactant/product assemblies and traced transfers rather than by importing every intermediate helper node as a scene assembly.
