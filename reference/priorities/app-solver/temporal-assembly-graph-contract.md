# Temporal Assembly Graph Contract

Historical naming: **zombie-solver (then called the central solver)**.

## Status

- Kind: `priority-detail`
- Workstream: `app-solver`
- Task id: `temporal_assembly_graph_contract`
- Status: `closed-design-capture`
- Depends on: [virtual-observer-path-record-contract](virtual-observer-path-record-contract.md)
- Promotion decision: `priority-only`

This note defines the temporal assembly graph as a standalone solver contract.
It closes the design substance for `temporal_assembly_graph_contract` and the
main solver queue records the task as complete.

The contract defines how architrino path histories join to assembly-state
history, membership intervals, parent-child hierarchy intervals, and assembly
events. It keeps assembly state normalized in graph records rather than
duplicated into every path row.

## Purpose

The zombie-solver needs to represent assemblies, subassemblies, unstable
membership, threshold crossings, and self-action events across time. A path row
is the elementary architrino history record. An assembly graph record is the
time-indexed context that says which assembly a path belongs to, what state that
assembly had, and how that assembly sits inside a hierarchy.

The temporal assembly graph is therefore a compact temporal relational graph
over architrino histories:

- architrino path histories store kinematic and dynamic path facts;
- assembly-state history stores one assembly state per assembly interval;
- membership history stores path-to-assembly intervals;
- hierarchy history stores parent-to-child assembly intervals;
- event history stores discrete changes that explain interval boundaries.

The solver may add faster indices, deeper stores, or derived views later, but
the authoritative contract is the row set plus manifest metadata, not any one
object tree built from those rows.

## Contract Boundary

The temporal assembly graph owns these obligations:

- define assembly-state history intervals and their stable identities;
- define membership intervals from architrino paths to assemblies;
- define parent-child hierarchy intervals between assemblies;
- preserve split, merge, exchange, threshold, self-action, and ambiguous
  membership events;
- provide stable ids and graph indices for path, assembly, parent, child, time,
  and byte-range readback;
- provide deterministic hierarchy replay rules for reconstructing graph state at
  a selected time;
- define join rules from path-history records to assembly records without
  copying full assembly state into every path row.

The graph does not own:

- the force law, root solver, or integration method;
- numeric serialization details that belong to
  [numeric-serialization-contract.md](numeric-serialization-contract.md);
- path-history chunking and spill policy that belong to
  [path-history-stream-contract.md](path-history-stream-contract.md);
- admission limits that belong to
  [simulation-envelope-contract.md](simulation-envelope-contract.md);
- app rendering, authored Animator structure editing, or UI hierarchy layout.

## Required Record Families

The contract has four authoritative row families. Their first bridge-aligned
layout ids are `assembly_state.v1`, `assembly_membership.v1`,
`assembly_hierarchy.v1`, and `assembly_events.v1`.

| Record family | Required identity | Required interval or time | Required meaning |
| --- | --- | --- | --- |
| Assembly-state history | `assemblyKey`, `assemblyStateKey` | `timeStart`, `timeEnd` | One assembly-level state over one finite interval: center, velocity, phase, cycle index, model version, status flags, and fidelity flags. |
| Membership history | `membershipKey`, `pathKey`, `assemblyKey`, `assemblyStateKey` | `timeStart`, `timeEnd` | One architrino path's membership in one assembly interval, including local role, binding state, confidence, membership version, and status flags. |
| Hierarchy history | `hierarchyKey`, `parentAssemblyKey`, `childAssemblyKey` | `timeStart`, `timeEnd` | One parent-child assembly relation over one interval, including relation type, hierarchy version, and status flags. |
| Assembly event ledger | `eventKey`, affected ids, prior and next state keys | `eventTime` | A discrete graph change: membership entry, membership leave, membership change, hierarchy change, split, merge, threshold, self-action, or ambiguous membership. |

All intervals are finite and use half-open replay semantics:
`timeStart <= t < timeEnd`. When a run needs a final inclusive display frame,
the manifest may define a display-time convention, but replay and validation use
half-open interval logic. Open-ended membership is represented by closing the
interval at the declared run horizon or active-window horizon, not by using
non-finite numeric sentinels.

## Stable Id Rules

Stable ids are run-scoped unless a future manifest explicitly promotes them to a
cross-run namespace.

| Id | Stability rule |
| --- | --- |
| `pathKey` | Stable key for one architrino path identity inside a run. A path may change assemblies without changing `pathKey`. |
| `assemblyKey` | Stable key for one assembly identity inside a run. A split or merge does not silently reuse a prior identity unless the model contract declares identity continuation. |
| `assemblyStateKey` | Stable key for one versioned assembly state interval. A changed center, phase, cycle, model version, or fidelity claim gets a new state key. |
| `membershipKey` | Stable key for one path-to-assembly interval. A role change, binding-state change, confidence change, or assembly-state reference change gets a new membership key. |
| `hierarchyKey` | Stable key for one parent-child relation interval. A changed parent, child, relation type, or hierarchy version gets a new hierarchy key. |
| `eventKey` | Stable key for one discrete graph event. Events are append-only and never rewrite closed intervals. |

Numeric keys may be generated from stable textual identities through a declared
keying function, but the manifest must preserve enough provenance to detect
collisions and schema-version changes. Keys are never reused for a different
logical identity inside the same run.

## Assembly-State History

An assembly-state row stores the state of an assembly once per interval. It is
not copied into member path rows.

Minimum logical fields:

```text
assemblyState:
  layout: assembly_state.v1
  assemblyKey: integer
  assemblyStateKey: integer
  timeStart: finite number
  timeEnd: finite number
  center: vector
  velocity: vector
  phase: optional number
  cycleIndex: optional integer
  modelVersion: optional integer
  statusFlags: optional integer
  fidelityFlags: optional integer
```

Assembly-state intervals must be non-overlapping for the same
`assemblyStateKey`. Multiple assembly states for the same `assemblyKey` may
touch at boundaries, and they may overlap only when status flags state that one
state is a projection, broad-phase approximation, or ambiguous candidate rather
than the authoritative state for the same claim level.

The `modelVersion` identifies the assembly model used to interpret phase,
cycle, local coordinates, and internal degrees of freedom. The `fidelityFlags`
state whether the row is authoritative for dynamics, approximate for replay,
broad-phase-only, or display-only.

## Membership Intervals

A membership row says that one architrino path belongs to one assembly over one
interval. Membership is not a property copied across every path sample; it is a
time-indexed relation that path readers join when they need assembly context.

Minimum logical fields:

```text
membership:
  layout: assembly_membership.v1
  membershipKey: integer
  pathKey: integer
  assemblyKey: integer
  assemblyStateKey: integer
  timeStart: finite number
  timeEnd: finite number
  confidence: number in [0, 1]
  localRole: optional integer
  bindingState: optional integer
  membershipVersion: optional integer
  eventKind: optional integer
  statusFlags: optional integer
```

Membership intervals for one `pathKey` may not overlap as authoritative rows for
the same membership role unless the model contract explicitly permits
multi-assembly membership. Ambiguous or inferred rows use `confidence < 1` or
status flags and cannot be consumed as authoritative dynamic context unless the
request permits inferred membership.

An architrino changes assemblies by closing the prior membership interval and
opening a new membership interval. The path history keeps the same `pathKey`;
the graph records the changed `assemblyKey`, `assemblyStateKey`, local role,
binding state, and event linkage. No path sample needs a full copy of the
assembly state.

## Parent-Child Hierarchy Intervals

A hierarchy row says that one assembly contains, owns, or otherwise stands in a
declared parent-child relation to another assembly over one interval.

Minimum logical fields:

```text
hierarchy:
  layout: assembly_hierarchy.v1
  hierarchyKey: integer
  parentAssemblyKey: integer
  childAssemblyKey: integer
  timeStart: finite number
  timeEnd: finite number
  relationType: optional integer
  hierarchyVersion: optional integer
  statusFlags: optional integer
```

For containment-like relation types, the hierarchy active at any time must be a
directed acyclic graph. A cycle is a validation failure unless the relation type
is explicitly non-containment and the consumer has declared support for that
relation. A hierarchy interval change is represented by closing the prior
hierarchy row, opening the new row, and emitting a hierarchy event.

Hierarchy rows support stable structures and short-lived exchanging structures
with the same mechanism. A proton-like assembly, a molecule-like assembly, and a
temporary subassembly are all intervals with model versions and fidelity claims;
none require a hardcoded permanent containment rule.

## Event Ledger

Events explain why interval boundaries exist. A reader can reconstruct the graph
from rows alone, but the event ledger preserves the reason for each transition
and lets validation check that no hidden mutation occurred.

Minimum logical fields:

```text
event:
  layout: assembly_events.v1
  eventKey: integer
  primaryId: integer
  secondaryId: integer
  priorStateKey: integer
  nextStateKey: integer
  relatedPathKey: integer
  relatedAssemblyKey: integer
  branchTransitionKey: integer
  eventTime: finite number
  eventKind: integer
  speedRegime: integer
  statusFlags: integer
```

Required event kinds:

| Event kind | Contract meaning |
| --- | --- |
| `membership_enter` | A path begins membership in an assembly. |
| `membership_leave` | A path ends membership in an assembly. |
| `membership_changed` | A path remains in an assembly but changes role, binding state, local-coordinate mapping, confidence, or assembly-state reference. |
| `hierarchy_changed` | A parent-child relation opens, closes, or changes relation type. |
| `split` | One assembly identity produces two or more successor assembly identities or child memberships. Prior intervals close before successor intervals open. |
| `merge` | Two or more assembly identities produce one successor identity or declared surviving identity. Inputs are preserved as closed histories. |
| `threshold` | A speed-regime, field-speed, phase, branch, or model threshold changes the valid graph interpretation. |
| `self_action` | A same-path or same-assembly causal contribution changes membership, binding, hierarchy, or branch structure. |
| `ambiguous_membership` | The solver records an inferred or unresolved membership candidate that is not authoritative without an explicit consumer policy. |

The bridge enum names these same numeric event families in
`src/solver/include/architrino/solver/AssemblyGraph.hpp`.
Textual names in this note are the priority-contract labels; numeric encodings
belong to the bridge schema and native ABI.

## Split, Merge, And Exchange Rules

Splits and merges never mutate prior rows. They close prior intervals and open new
intervals.

For a split:

1. Close the prior assembly-state interval for the source assembly at
   `eventTime`.
2. Close affected membership and hierarchy intervals at `eventTime`.
3. Open successor assembly-state intervals and membership intervals at
   `eventTime`.
4. Emit one `split` event with prior and next state references, plus additional
   membership or hierarchy events when needed for replay clarity.

For a merge:

1. Close all contributing assembly-state, membership, and hierarchy intervals at
   `eventTime`.
2. Open the successor assembly-state interval at `eventTime`.
3. Reattach memberships and hierarchy edges to the successor identity according
   to the declared identity-continuation policy.
4. Emit one `merge` event and any derived membership or hierarchy events needed
   to explain local roles and binding changes.

For exchange:

1. Close the prior membership interval for each moving `pathKey`.
2. Open the new membership interval under the receiving `assemblyKey`.
3. Preserve the path's `pathKey` and path-history continuity.
4. Emit `membership_leave`, `membership_enter`, or `membership_changed` events
   at the exchange boundary.

If identity continuation is ambiguous, the solver allocates a new successor
`assemblyKey` and records the ambiguity in event status flags rather than
choosing a silent survivor.

## Threshold And Self-Action Events

Threshold events preserve graph changes caused by field-speed, branch, phase,
cycle, or model-regime boundaries. The event row must carry `speedRegime` and,
when available, `branchTransitionKey`. If a threshold changes membership or
hierarchy, the corresponding membership or hierarchy rows still close and open
normally; the threshold event explains why.

Self-action events preserve cases where a path or assembly changes because of
its own retained source history or same-assembly causal structure. A
`self_action` event must identify the affected path or assembly, the prior and
next state references when available, and the branch transition reference when
the event arises from branch structure. A self-action event is not a substitute
for membership or hierarchy rows; it is the causal explanation attached to their
boundary.

## Ambiguous Membership Records

Ambiguous membership is a first-class row state, not a missing data condition.
The solver uses ambiguous membership records when membership is inferred,
multiple assignments remain possible, confidence is below the requested claim
level, or the current precision path cannot decide the boundary.

Rules:

- ambiguous rows carry `confidence < 1` or an ambiguity status flag;
- ambiguous rows may coexist with candidate alternatives only when their
  statuses make the alternatives explicit;
- authoritative dynamic replay must fail closed if it requires a unique
  membership and only ambiguous records are available;
- display or broad-phase consumers may opt into ambiguous records only when the
  request manifest declares that weaker claim level;
- resolving ambiguity closes the ambiguous interval and opens the authoritative
  membership interval with a new `membershipKey`.

The event ledger must include `ambiguous_membership` when ambiguity first
appears, when it changes candidate set, or when it resolves.

## Join Rules From Path Records

Path records join to assembly graph records through compact keys and time
intervals. The path row may carry a cached `assemblyKey`, `assemblyStateKey`,
membership version, or local role for fast reading, but those cached values are
not authoritative unless they match the membership and state rows.

Required path-to-graph join:

```text
path row P at time interval `src/solver/app/SolverAppBridgeContract.d.ts`. |
| Store manifest and indexed readback | `SolverAssemblyGraphStoreManifest`, `SolverAssemblyGraphStoreIndex`, `SolverAssemblyGraphStoreReadF64Request`, and `SolverAssemblyGraphStoreReadF64Response`. |
| Row layouts | `SolverAssemblyStateF64`, `SolverAssemblyMembershipF64`, `SolverAssemblyHierarchyF64`, and `SolverAssemblyEventF64`. |
| Native event families | `AssemblyEventKind` in `src/solver/include/architrino/solver/AssemblyGraph.hpp`. |
| Fixture coverage | `scripts/check-solver-contract-fixtures.mjs` validates `assembly_state.v1`, `assembly_membership.v1`, `assembly_hierarchy.v1`, and `assembly_events.v1` fixture buffers. |

This priority artifact defines the semantics of those rows. It does not require
new bridge methods, new runtime files, or edits to solver queue text.

## Validation Obligations

Validation for this contract must prove:

1. all graph rows have supported layout ids, finite times, valid key fields, and
   nonnegative row counts;
2. authoritative intervals for one key do not overlap unless the status flags
   declare projection, broad-phase, or ambiguity semantics;
3. membership rows reference existing path keys and assembly keys;
4. membership rows with `assemblyStateKey` reference an assembly-state row whose
   interval overlaps the membership interval;
5. containment hierarchy rows are acyclic at each replay time;
6. split and merge events close prior intervals and open successor intervals at
   the same boundary;
7. threshold and self-action events carry enough path, assembly, speed-regime,
   and branch-transition data to explain the graph change they annotate;
8. ambiguous membership cannot satisfy authoritative dynamic replay unless the
   request explicitly permits an inferred or lower-claim graph;
9. graph indices return the same rows as a full scan for representative path,
   assembly, parent, child, time-range, row-range, and byte-range queries;
10. path-history replay remains unchanged when hierarchy indices are added,
    rebuilt, or bypassed.

## Completion Criteria

`temporal_assembly_graph_contract` is closed as the standalone priority
artifact. Remaining implementation work belongs to broader solver tasks,
especially `solver_contract` and [path-history-stream-contract](path-history-stream-contract.md);
it does not block completion of this isolated contract.
