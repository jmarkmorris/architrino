Closure goal: Implement Borg's solver-free prescribed-translation and causal-history-tube feature so a user can inspect Family-A, Family-B, and Family-C prescribed records that carry the required translation and analysis identities, their finite path histories, and certified causal-root arrivals without evolving the paths, duplicating the analytical evaluator, or implying stability, energy, photon identity, or physical realization.

# Objective

Extend Borg's existing assembly-view replay mode with a record-derived analysis
surface that makes prescribed translation and causal-delay geometry directly
visible.

## Packet Status

Status: `queued`; owner: Borg; queue row:
[BORG-006](work-queue.md#borg-006--prescribed-translation-and-causal-history-tubes).

The completed feature should let a user:

1. load a sealed B-family prescribed record;
2. switch between fixed-frame and co-translating-frame views of the same
   recorded paths;
3. see periodic internal paths swept into extended spiral strands by declared
   group translation;
4. control the finite path-history depth and freeze the display at an exact
   observation time;
5. select an architrino receiver or place a declared virtual probe;
6. display every certified causal root for that receiver event;
7. inspect root identity, emission time, delay, arrival direction, $D_t$,
   isolation status, and root-specific acceleration contribution;
8. see unresolved or not-evaluated cases explicitly rather than having them
   disappear; and
9. preserve the exact source, protocol, implementation, result, and compact
   campaign identities behind every displayed analytical row.

The visual inspiration is a translating object with circulating internal
filaments. Import only that visual grammar. Do not import any unsupported
claim about quantum superfluids, spacetime vortices, drag redshift, photon
lifetimes, Riemann-zeta trajectories, or superluminal internal fluids.

# Governing Sources

Read these live sources before editing:

- [Braid Analysis Methodology — Borg Analysis Surface](../../../content/markdown/aaa/noether-braid/braid-analysis-methodology.md#borg-analysis-surface)
- [Borg priorities](priorities.md)
- [Borg assembly-viewer requirements](assembly-viewer-requirements.md)
- [Software Architecture and Maintenance](../../../content/markdown/aaa/archie/software-architecture-and-maintenance.md)
- [Roots requirements and design](../dormant-deferred/app-causal-delay-feedback/roots-requirements-and-design.md)
- `src/apps/borg/BorgAppRuntime.js`
- `src/apps/borg/BorgAssemblyViewSession.js`
- `src/apps/borg/BorgEomRecordReplayRunner.js`
- `src/apps/borg/BorgBraidRecordCatalog.js`
- `src/apps/shared/EomHistoryDataset.mjs`
- `src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs`
- `src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs`
- `src/prescribed-path-analysis/database/CompactAnalyticalCampaignDatabase.mjs`
- the active prescribed-path analysis protocols and their validators
- the live Borg HTML, styles, scene configuration, tests, and browser entry
  points actually used by the deployed app

Use the implementation's current contracts rather than assuming that an older
prompt or design note still describes them exactly.

# Non-Negotiable Boundaries

## Solver-free meaning

This feature is solver-free in the following exact sense:

- it does not invoke the EOM solver;
- it does not numerically evolve any path;
- it does not extend recorded path coverage;
- it does not construct a retained physical branch;
- it does not turn a prescribed chart into an evolved record; and
- it does not create stability, retention, energy, quantization, photon, or
  physical-realization evidence.

The canonical prescribed-path analytical evaluator may enumerate causal roots
and compute the acceleration rows already defined by its protocol. That
analytical evaluation is not path evolution.

## Ownership

Keep one canonical implementation path per responsibility:

- sealed prescribed records own displayed paths and source provenance;
- `EomHistoryDataset.mjs` owns arithmetic sampling of recorded path segments;
- the canonical prescribed-path evaluator owns causal-root enumeration,
  certification, and analytical acceleration rows;
- the compact analytical control plane owns small campaign/case records,
  hashes, scores, gates, measured cost, receipts, and exact rerun recipes;
- Borg owns selection, time synchronization, display transforms, rendering,
  interaction, and visible status; and
- a thin adapter owns transport from an evaluator result to a browser-safe Borg
  analytical projection.

Do not add causal-root solving, an interaction law, or analytical acceleration
calculation to `EomHistoryDataset.mjs`, `BorgEomRecordReplayRunner.js`, or
`BorgAppRuntime.js`.

Do not create a browser-local second root finder. Do not port or approximate the
root algorithm merely to simplify rendering. Do not make the browser replay
runner an analytical producer.

Keep `BorgAppRuntime.js` a composition root. Put new state normalization,
projection, geometry construction, request coordination, and rendering behavior
in focused Borg modules with narrow tested interfaces.

## Record and storage authority

Preserve the current assembly-view replay boundary:

- `assembly-view-record.v0` remains sealed input;
- `engineId: "prescribed-geometry"` remains prescribed geometry;
- `claimGrade: "chart-hypothesis"` remains a chart hypothesis;
- `evidenceStatus: "display-only"` remains display-only; and
- replay or rendering creates no evidence.

Use `.local-data/braid-analysis/compact-campaigns.sqlite3` only through the
compact control-plane contract. Do not make the browser read SQLite directly.
Do not recreate the deleted BLOB-backed analytical database. Do not store raw
causal-root ledgers, event packets, compressed payload objects, or payload
BLOBs in the compact database.

An analytical overlay must bind to exact source, protocol, implementation, and
result identities. A missing or mismatched identity must produce an explicit
unavailable or invalidated state and no analytical glyphs.

## Theory layer

Use normalized numerical units with $c_f=1$.

Use acceleration language at the architrino level. Do not call analytical
contributions forces.

Treat Euclidean position and absolute time as the substrate coordinates. The
feature may be called `Causal History`, `Path History`, or `Prescribed
Translation`; do not label it a spacetime view or imply that the translucent
tube is a physical medium.

# Required User Experience

## 1. Prescribed translation

Add fixed-frame and co-translating-frame views of the same sealed record.

- The fixed frame shows the record's declared translation.
- The co-translating frame subtracts only a source-carried common translation
  for display.
- Switching frames changes only the display transform.
- Source positions, path identities, time, source hashes, protocol hashes, and
  analytical values remain unchanged.
- If the selected record does not carry enough information to define the
  transform, disable the control and name the missing carrier. Do not infer a
  translation velocity from rendered samples.

In the fixed frame, periodic internal paths should sweep into extended spiral
or braided strands. In the co-translating frame, the corresponding compact
internal orbit geometry should remain visible.

Provide:

- fixed/co-translating frame selection;
- a finite path-history-depth control;
- freeze/resume controls using the existing Borg timeline;
- a split or quickly reversible comparison between compact-orbit and translated
  views; and
- an exact readout of the current absolute time and display frame.

## 2. Path-history tubes

Render an optional translucent display tube around each selected prescribed
path strand.

Keep three visual objects explicitly distinct:

1. a **display tube** is a translucent display-only envelope around recorded
   path samples;
2. an **analytical wake-arrival link** joins a producer-carried emission event
   to its receiver event; and
3. an **EOM-retained wake stream** is available only when an EOM record carries
   the retained wake rows.

The tube:

- is a display-only envelope around recorded path samples;
- ends at the current architrino position;
- never runs ahead of the current time;
- respects the selected finite history depth;
- preserves stable worldline and binary colors;
- has a user-controllable display radius that does not change any source
  coordinate; and
- is explicitly distinguished from a wake stream.

Do not reuse Borg's EOM `wake-streams` layer for these tubes. That layer must
remain unavailable when the EOM solver has supplied no retained wake rows.

## 3. Receiver and probe selection

In prescribed replay mode, let the user:

- select an architrino as receiver by clicking its rendered point;
- optionally place or select a fixed virtual probe when the analytical provider
  supports it;
- choose the receiver polarity for a virtual probe;
- bind the receiver event to the current Borg time; and
- clear the selected event without changing the underlying record.

Selection must use stable source identities, not draw order or transient Three.js
object order.

## 4. Causal-root overlays

For the selected receiver event $(T_R,\mathbf X_R)$, obtain every certified
emission time $T_e$ satisfying

$$
\left\|
\mathbf X_R(T_R)-\mathbf X_j(T_e)
\right\|
=
c_f(T_R-T_e),
\qquad c_f=1.
$$

Render each root as:

- a highlighted emission point on the transmitter's path history;
- a line from the emission point to the receiver event;
- a receiver-side arrival-direction glyph;
- a stable transmitter/root-ordinal color and label;
- an optional contribution vector using the canonical analytical acceleration
  row; and
- a selection link between the glyph and its diagnostics-table row.

Multiple roots from one transmitter must remain distinct. Do not collapse them
into one transmitter row.

If the evaluator reports an interval in which root freedom or monotonicity
cannot be certified, show a bounded unresolved-history segment and the exact
failure reason. Do not draw an invented root.

## 5. Diagnostics

Add a compact prescribed-analysis diagnostics surface synchronized with the
existing timeline. At minimum show:

| Field | Required content |
| --- | --- |
| Receiver event | receiver/probe identity, polarity, $T_R$, and position |
| Transmitter | persistent source identity and binary membership |
| Root | root ordinal and root identity |
| Emission | $T_e$ and delay $T_R-T_e$ |
| Geometry | distance and arrival direction |
| Certification | isolation interval, root-completeness status, and $D_t$ |
| Contribution | root-specific analytical acceleration contribution |
| Status | evaluated, drawn-not-evaluated, unresolved, invalidated, or unavailable |
| Provenance | source, protocol, implementation, result/case, and campaign hashes |

Use the canonical evaluator's actual field names and definitions. The table
must not silently substitute a newly derived browser quantity for a missing
producer field.

Provide clear empty states:

- no receiver selected;
- no matching analytical result;
- analysis provider unavailable;
- source/protocol identity mismatch;
- drawn but not evaluated, with reason;
- unresolved possible root or fold interval;
- result invalidated by a changed source or protocol; and
- root-free event certified for a transmitter.

## 6. Root-branch inspection

When the supplied analytical result contains compatible observations at more
than one receiver time, add a compact root-branch plot or timeline:

- horizontal coordinate: receiver time;
- vertical coordinate: emission time;
- stable color: transmitter plus root ordinal;
- explicit discontinuity when identity cannot be matched;
- visible root births, deaths, or unresolved fold neighborhoods only when
  carried by the analytical result; and
- synchronized selection between the plot, table, and 3D scene.

Do not interpolate a root branch across an unevaluated time interval unless the
producer supplies a certified branch carrier authorizing that interpolation.

# Analytical Provider And Projection

Inspect the current evaluator packet and Borg transport paths before adding a
new schema.

Prefer the smallest browser-safe projection of an existing canonical result.
If no existing carrier can safely transport the required fields, define one
versioned Borg prescribed-analysis projection rather than extending the sealed
path record with large analytical objects.

The projection must:

- reference, not duplicate, the sealed source record;
- carry schema/version identity;
- carry source, protocol, implementation, result, case, and campaign hashes
  where applicable;
- carry the exact observation-event identity;
- preserve every transmitter/root ordinal;
- preserve evaluated, root-free, unresolved, and drawn-not-evaluated states;
- carry only fields consumed by Borg;
- exclude raw surface ledgers and unrelated campaign objects;
- be deterministic and canonical-hashable; and
- do not advance on unknown fields, duplicate identities, nonfinite values, broken
  hashes, and source/protocol mismatch.

Use one provider interface in Borg. Static precomputed projections and a local
on-demand analytical endpoint may be transport implementations behind that
interface, but they must consume the same projection and must not contain
separate analytical implementations.

For a static deployment, render only source-matched projections that were
generated ahead of time. For a local operator session, an on-demand endpoint
may invoke the canonical prescribed-path evaluator. Make provider capability
and provenance visible in the UI.

Do not recompute an entire complete-cycle campaign on every animation frame.
Request an event only after receiver/time selection settles, cancel stale
requests, and cache only by the complete source/protocol/receiver/time identity.

# Scope Across Candidates

The first acceptance fixtures should use B-family records because prescribed
translation and binary-train intuition are the feature's initial purpose.

Do not hardcode the implementation to catalog labels such as `B1` or `B1.3`.
Build against sealed worldline identities, declared group translation, and
canonical analytical packets so the same display layer accepts Family-A,
Family-B, and Family-C records whenever their source carriers satisfy the same
contract.

If a B-family record lacks a field required by the design, show the missing
carrier and remain not advanced. Do not add per-candidate browser constants.

The current Borg catalog contains twenty-one sealed prescribed records:
eleven Family-A members, four Family-B members, and six Family-C members.
The current Family-C source specifications, generated records, catalog labels,
and analytical routing are synchronized on the C1 through C6 identities.
Account explicitly for those identities:

- C1 and C2 are the general co-rotating and counter-rotating coaxial
  twelve-worldline records and are not required to decompose into B1
  components;
- C3 and C4 are the constrained coaxial two-B1 loci;
- C5 and C6 are the constrained coaxial two-B1.3 loci; and
- C1 through C6 retain their sealed record identities and source order.

Use C1 and C2 as cross-family contract checks after the first B-family
translation fixture. Keep their broader visual QA outside BORG-006 unless the
live Borg queue and current source state show that it is required for this
packet's acceptance.

B1 midpoint-dimension or train exploration and further coaxial Family-C
extensions are source-producing research lanes. Borg may replay sealed records
they later emit, but it must not author those geometries, add browser-side
candidate coordinates, or treat background analyzer output as app authority.

# Capability Staging

Prescribed Translation and Causal-History Tubes is the first Borg enhancement
slice. Keep these later capability stages out of its critical path unless they
can be implemented without diluting or delaying the first slice:

1. [BORG-007 — Taxonomy Morph Lab](work-queue.md#borg-007--taxonomy-morph-lab);
2. [BORG-008 — Braid Harmonics Studio](work-queue.md#borg-008--braid-harmonics-studio); and
3. [BORG-009 — Family-A Exclusion Geometry](work-queue.md#borg-009--family-a-exclusion-geometry).

If any later-stage display is included, it must reuse the same sealed-record,
stable-worldline, display-transform, and claim-boundary architecture. Do not
create a separate geometry producer or candidate-specific branch.

# Allowed Edit Scope

Inspect broadly, but keep implementation edits to this exact surface:

- `borg.html`;
- `src/apps/borg/BorgAppRuntime.js`;
- `src/apps/borg/BorgAssemblyViewControls.js`;
- `src/apps/borg/BorgAssemblyViewScene.js`;
- `src/apps/borg/BorgAssemblyViewSession.js`;
- new focused modules
  `src/apps/borg/BorgPrescribedTranslation.js`,
  `src/apps/borg/BorgPrescribedAnalysisProjection.js`,
  `src/apps/borg/BorgPrescribedAnalysisProvider.js`, and
  `src/apps/borg/BorgPrescribedAnalysisScene.js`;
- `tests/borg-assembly-view-scene.test.js`;
- `tests/borg-assembly-view-session.test.js`;
- `tests/borg-path-trails.test.js`;
- new focused tests
  `tests/borg-prescribed-translation.test.js` and
  `tests/borg-prescribed-analysis-projection.test.js`.

Do not edit `BorgEomRecordReplayRunner.js`, `EomHistoryDataset.mjs`,
`AnalyticalBraidEvaluator.mjs`, the compact database, prescribed records,
record generators, schemas, protocols, or the braid catalog merely to make the
feature convenient. If the live architecture proves that one of those owners
requires a change, stop and report the exact missing contract rather than
expanding scope.

# Coordination

- Before any C1/C2 browser pass, inspect the live Borg work queue and current
  browser evidence so the packet does not duplicate an already owned visual
  acceptance pass.
- Other workstreams may produce analyzer tooling, A1.3/C5 calibration, or
  Family-B/Family-C train findings. Their outputs are not app authority unless
  the completed artifacts are inspected and their evidence boundaries remain
  explicit.

# Implementation Sequence

1. Audit the live Borg replay, frame, trail, selection, diagnostics, HTML, CSS,
   and test paths. Name the minimal integration seam before editing.
2. Audit the current analytical result packet, compact case contract, compact
   database query/export interface, and exact rerun recipe.
3. Write the proposed data flow and claim boundary in the implementation notes:
   sealed record to canonical evaluator to compact projection to Borg renderer.
4. Implement and independently test the projection validator before rendering
   it.
5. Implement fixed/co-translating display transforms and path-history tubes
   using record data only.
6. Implement receiver selection and exact event identity.
7. Implement the provider interface and one real source-matched analytical
   provider path.
8. Implement root, unresolved-interval, arrival-direction, and contribution
   glyph modules.
9. Integrate the modules thinly into Borg's composition root.
10. Add the diagnostics table and, when supported by the result, the root-branch
    plot.
11. Add visible provenance, authority, unavailable, invalidated, and
    drawn-not-evaluated states.
12. Run unit, integration, browser, accessibility, performance, content, and
    generated-drift checks appropriate to the affected files.
13. Remove any prototype or duplicate path superseded by the accepted
    implementation. Do not leave two production providers or renderers for the
    same responsibility.

# Independent Verification

Agreement with the production evaluator is not by itself independent evidence
that the mathematical rule is correct. Reuse the independently authored cases
already present in the prescribed-path test suite and add Borg projection and
rendering checks around them.

At minimum cover:

1. a static source/receiver case with an analytically known causal root;
2. a uniformly translating closed-form case;
3. the independently bracketed super-wake-speed circular case with multiple
   roots, including a negative-$D_t$ branch;
4. a certified root-free transmitter;
5. an unresolved possible-root or fold interval;
6. a drawn-not-evaluated compact case with a null score and structured reason;
7. a deliberate source-hash mismatch;
8. a deliberate protocol-hash mismatch; and
9. a record without a declared common translation carrier.

The independent fixtures test the mathematics or identity obligations. Borg
tests then verify that the correct producer rows become the correct visible
glyphs and table rows.

# Acceptance Tests

## Data and architecture

- Borg contains no root-finding or analytical acceleration implementation.
- `EomHistoryDataset.mjs` and the replay runner remain viewer-only.
- The canonical evaluator remains the only causal-root producer.
- The compact control plane remains BLOB-free and raw-ledger-free.
- Projection validation rejects unknown schemas, nonfinite values, duplicate
  root identities, incomplete provenance, and hash mismatch.
- No generated artifact is edited manually.

## Translation and trails

- Fixed and co-translating views differ only by the declared display transform.
- Switching frames does not change source or analytical hashes.
- Every trail and display tube stops at the current architrino.
- No future sample becomes visible when scrubbing backward.
- Tube radius and opacity controls change rendering only.
- A missing translation carrier disables the frame switch visibly.

## Root display

- Every producer root has exactly one glyph and one diagnostics row.
- Root ordinals remain stable under selection and time navigation.
- A multiple-root transmitter is never collapsed.
- Root-free transmitters are distinguishable from unevaluated transmitters.
- Unresolved intervals remain visible with their structured reason.
- Arrival lines begin and end at the exact producer-carried positions.
- Contribution vectors use acceleration terminology and producer-carried
  values.

## Interaction

- Receiver selection uses persistent worldline identity.
- Timeline, scene, table, and branch plot remain synchronized.
- Stale analytical requests cannot overwrite the current selection.
- Clearing selection removes overlays without changing the record replay.
- Keyboard and pointer users can reach every new control and diagnostics row.
- Reduced-motion behavior preserves comprehension without requiring continuous
  animation.

## Claim boundary

- Prescribed mode remains visibly distinct from the simulation workspace.
- No control or label claims stability, binding, energy, retention,
  quantization, photon identity, or physical realization.
- Display tubes are not labeled wakes.
- Analytical wake-arrival overlays are not represented as EOM-retained wake
  streams.
- Rendering and replay do not upgrade producer authority.

## Performance

- Root evaluation is not triggered on every render frame.
- Display transforms and tube rendering do not allocate unbounded objects per
  frame.
- Analytical requests are cancellable and keyed by complete identity.
- Measure initial load, overlay load, timeline scrub latency, browser heap, and
  frame behavior on a representative B-family record.
- Report measured costs; do not use path counts or geometry complexity as cost
  claims.

# Validation

Determine the exact live commands from package scripts, tests, and repository
procedures. At minimum run:

- focused prescribed-path evaluator and compact-campaign tests;
- focused Borg replay, runtime-contract, frame/trail, selection, and rendering
  tests;
- new projection/provider/root-overlay tests;
- browser interaction on at least one ordinary B-family case and one
  super-wake-speed multiple-root fixture;
- accessibility checks for every added control and table;
- `git diff --check`;
- strict content validation;
- strict scene-graph checking; and
- generator check-only commands for affected generated artifacts.

Do not run generator `--write` commands during an ordinary implementation
batch. If a check reports generated drift, report the exact write command
unless the operator has explicitly authorized regeneration or the work is in
the final branch/PR process.

If ambient failures occur, distinguish them from feature failures with exact
commands and evidence. Scoped passing tests do not override a failing required
full gate.

# Required Deliverables

1. Focused Borg modules for prescribed translation, analytical projection,
   provider coordination, and causal-root rendering.
2. Thin integration into the live Borg composition root.
3. Fixed/co-translating and finite path-history-tube controls.
4. Receiver/probe selection and synchronized root overlays.
5. Compact diagnostics with full provenance and explicit Not advanced dispositions.
6. Independent mathematical fixtures and Borg projection/rendering tests.
7. Browser and performance measurements.
8. A concise implementation report naming:
   - the canonical data path;
   - every file changed;
   - every test and validator run;
   - measured performance;
   - any unavailable carrier;
   - claim boundaries;
   - generated drift; and
   - remaining work.

# Stop Conditions

Stop and request operator direction if completion would require:

- adding causal-root logic to Borg or the shared history adapter;
- changing the sealed prescribed-record schema without its owning schema
  authority;
- storing raw analytical objects or BLOB payloads in the compact database;
- introducing a second production solver or analytical evaluator;
- silently inventing a missing translation, field-speed, probe, or provenance
  carrier;
- weakening a root, convergence, hash, or identity gate to make a display pass;
- presenting interpolated roots without producer authorization; or
- changing the app's claim level.

# Reporting Format

Lead with the user-visible outcome. Then report:

1. architecture and ownership;
2. implemented controls and displays;
3. analytical-provider and provenance behavior;
4. independent verification;
5. browser and performance results;
6. cases with a Not advanced disposition;
7. files changed;
8. validation;
9. generated drift; and
10. remaining blockers.

Distinguish measured facts from inferences and design decisions. Attach an
operator-checkable falsifier to every substantive claim.

Closure goal: Deliver Borg prescribed translation and causal-history analysis as one source-provenance-preserving viewer capability, with the canonical evaluator as the sole causal-root producer and every unsupported physical conclusion excluded.
