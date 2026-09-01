# Braid-Assembly Taxonomy Migration

Status: ACTIVE PLAN. The operator accepted the direction on 2026-08-31. No corpus, Borg, source-record, label, filename, or generated-artifact migration is completed by this plan.

## Closure Goal

Replace ambiguous `shared` geometry terminology with explicit circle-occupancy and co-sphericity characteristics; make the existing Braid Taxonomy the single reader-facing definition owner; organize worked braid configurations by component-braid dimensionality; and give every specifically studied configuration an exact Borg record that remains referenceable across later label and filename changes.

Plainly: one taxonomy defines the characteristics, two worked chapters explain 2D and 3D braids, and Borg supplies an exact view of each studied configuration without turning names into parent categories.

## Accepted Direction

1. Retire `shared circle`, `shared sphere`, `Orbit sharing`, `Shared`, `Dedicated`, and `SC`/`SS` from the live taxonomy, Borg surfaces, source records, tests, filenames, and authored documentation. This is a development migration: do not retain compatibility aliases, redirects, or duplicate old-name routes.
2. Preserve the accepted flat catalog. Every concrete record is a peer. A label, filename, prefix, coordinate-set name, chapter, or filter result is never a parent identity.
3. Keep [Braid Taxonomy](../../../content/markdown/aaa/noether-braid/braid-taxonomy.md) as the one canonical reader-facing definition owner. Do not create a competing taxonomy chapter or retain a completed migration ledger.
4. Create worked chapters at `content/markdown/aaa/noether-braid/2d-braid-assemblies.md` and `content/markdown/aaa/noether-braid/3d-braid-assemblies.md`. They consume the canonical characteristic definitions and present actual coordinates, records, mathematics, evidence grades, and falsifiers.
5. A specifically studied configuration receives a Borg leaf when its complete inventory, polarity assignment, paths, parameters, and intended evidence relation are frozen. A parameter domain or uninstantiated equation need not become a leaf. An enumerated collection may remain a collection until an individual member is discussed, tabulated, or used as the subject of a claim.
6. Human-facing labels are mutable. Stable scientific identity and model revision remain separate from presentation, but the migration replaces labels and filenames directly throughout the live tree. Git history supplies development history; the product and corpus do not carry old labels forward.

## Facts-First Identity And Source Decision

`Family A`, `Family B`, and `Family C` do not state independent physical or mathematical characteristics. Remove them as taxonomy concepts. The current A-, B-, and C-derived braid labels and other opaque human-facing codes such as T-, F-, SD-, SC-, SS-, and PV-derived labels are temporary migration locators, not permanent scientific identities, Borg categories, parent templates, or reader-facing names.

Each configuration is identified in prose and Borg by:

- one opaque permanent `assemblyId` that carries no taxonomy meaning;
- one exact model revision;
- one descriptive label assembled from supported facts;
- one explicit characteristic row and path prescription.

Do not invent replacement letter or number families. When two records share facts, filters expose those common characteristics without creating a parent class. When a short display label cannot state every fact, the exact characteristic row and opaque identity disambiguate it. Opaque codes may remain only inside this active migration plan and its matrix long enough to locate current artifacts; they disappear when the migration closes and the plan is removed.

The current `braid-family-a.md`, `braid-family-b.md`, and `braid-family-c.md` chapters are migration sources, not permanent destinations. Redistribute their exact geometry, equations, and configuration-specific explanations into the canonical taxonomy, the 2D/3D worked chapters, and factually named specialist chapters; then remove the family-named files and repair all inbound links. Apply the same test to specialist filenames and headings derived from A-, B-, or C-codes.

Plainly: keep the coordinates and mathematics; remove the invented containers and the codes that merely point back to those containers.

## Factual Obligations Retained From The Deleted Ledger

The completed predecessor ledger is deleted. Only these current obligations carry forward:

1. Move content by mathematical concept, not by copying whole legacy sections.
2. Give each definition, equation, and derivation one canonical owner; other chapters summarize and link rather than duplicate it.
3. Preserve exact architrino inventories, polarity assignments, persistent member order, coordinates, path equations, component relations, and explicit coordinate-locus constraints.
4. Preserve every claim grade and falsifier. A prescribed geometry does not become a retained or stable EOM-solver branch during reorganization.
5. Keep generic geometry separate from particle mappings, observer-level interpretations, Noether-sea selection claims, and other downstream hypotheses unless a configuration-specific derivation establishes the connection.
6. Do not remove a source chapter until its factual material has complete destinations and its live inbound links have been migrated; once that condition passes, delete the emptied source rather than leaving a compatibility shell.

These obligations protect the mathematics without retaining old labels, migration history, deprecated records, or compatibility machinery.

## Canonical Characteristic Definitions

### Circle Occupancy

For a source-supported circular member $i$, let its complete circle carrier in one declared assembly frame be represented by its center history, unoriented plane-normal history, radius history, and any one explicitly declared common translation. Define $i\sim_{\circ}j$ only when those carriers describe the same geometric circle over the complete comparison interval. Phase, cadence, direction, circulation, polarity, and binary membership do not change circle equality.

For an equivalence class $[i]_{\circ}$, define its occupancy by

$$
o_{\circ}([i]_{\circ})=\lvert[i]_{\circ}\rvert.
$$

The assembly-level characteristic is

$$
O_{\circ}(\mathcal A)
=
\begin{cases}
\text{One per circle}, & o_{\circ}(C)=1\ \text{for every circle class }C,\\
\text{Multiple per circle}, & o_{\circ}(C)\ge 2\ \text{for every circle class }C,\\
\text{Mixed}, & \text{both class sizes occur},\\
\text{Not assigned}, & \text{the circular carriers or complete comparison are unavailable}.
\end{cases}
$$

Plainly: this characteristic counts how many architrinos travel each circle. It allows several distinct circles, including circles with different centers, planes, or radii. It does not mean that the whole assembly occupies one circle.

Use these terms:

| Meaning | Forward-facing term |
| --- | --- |
| Every member occupies one geometric circle | `single-circle assembly` or `single-circle chart` |
| Two or more members occupy a given circle | `multiply occupied circle` |
| Selector characteristic | `Circle occupancy` |
| Selector values | `One per circle`, `Multiple per circle`, `Mixed`, `Not assigned` |
| Every member remains on one spherical surface | `co-spherical assembly` or `co-spherical chart` |

Do not use `co-orbital`; it suggests an astronomical resonance rather than equality of complete geometric circles. Do not infer circle occupancy from equal radii, instantaneous crossings, independently recentered paths, rendered pixels, or labels.

### Component-Braid Dimensionality

Let $D(\mathcal B_k)$ be the affine dimension of the complete paths of declared component braid $\mathcal B_k$ in its declared braid frame. A component braid is `2D` when one fixed plane contains all its paths and `3D` when no such plane does. For a complete, disjoint component partition of assembly $\mathcal A$, define

$$
D_{\mathcal B}(\mathcal A)
=
\begin{cases}
\mathrm{2D}, & D(\mathcal B_k)=\mathrm{2D}\ \text{for every component }k,\\
\mathrm{3D}, & D(\mathcal B_k)=\mathrm{3D}\ \text{for every component }k,\\
\mathrm{Mixed}, & \text{both component dimensions occur},\\
\mathrm{Not\ assigned}, & \text{membership or complete path evidence is unavailable}.
\end{cases}
$$

Whole-assembly affine span is a separate characteristic named `Assembly span`. It must not substitute for component-braid dimensionality.

Plainly: two planar braids at different heights or orientations remain a 2D-braid assembly even when their union occupies three-dimensional space.

## Canonical Reader-Facing Architecture

### Braid Taxonomy

Refactor `content/markdown/aaa/noether-braid/braid-taxonomy.md` into this teaching order:

1. Scope and evidence boundary: peer records, mutable labels, exact identity, and no retention claim from classification.
2. Assembly, component braid, binary, and complete membership definitions.
3. Component-braid dimensionality and separate whole-assembly span.
4. Independent characteristics: architrino count; component-braid count; circular or noncircular paths; distinct-circle count; circle occupancy; radius relation; center, plane, and axis relations; frequency, phase, and circulation relations; breathing; polarity assignment; and motion prescription.
5. One exact-record characteristic table with no inherited parent rows and no inference from labels.
6. Remove A/B/C family and decimal-member identifiers. Retain their useful equations and coordinate loci under explicit factual constraints, not inherited names.
7. Borg correspondence: one definition per characteristic, exact record links, and the boundary between visualization and scientific evidence.

The taxonomy must absorb or supersede partial classification starts in `noether-braid.md`, `noether-braid-configuration-space.md`, Borg requirements and audits, `configuration-chart.md`, the candidate and circular-configuration registries, and the present circle/sphere documents. Those owners may retain mathematics, diagnostics, evidence, or operational obligations, but not competing characteristic definitions.

### Two-Dimensional Braid Assemblies

The 2D chapter owns actual assemblies whose every declared component braid is planar. Initial material includes:

- the general planar three-binary common-center chart currently labeled B1.3, including unequal binary radii;
- its equal-radius ladder and exact circular-solution material;
- T04 release and continuation boundaries at their existing claim grades;
- the current C5/C6 assemblies made entirely from planar three-binary components, even when the complete assembly span is 3D;
- clearly titled related planar configurations without assigned braid membership, including the regular alternating rings outside the exact B1.3 intersection.

### Three-Dimensional Braid Assemblies

The 3D chapter owns actual assemblies whose every declared component braid is spatial. Initial material comes from the spatial braid portions of the current taxonomy and the co-spherical research draft. Co-spherical geometry is an independent characteristic, not the chapter definition.

Platonic vertex sets, stationary point sets, and other spatial configurations without complete declared braid membership appear only in clearly titled related-configuration sections or a later non-braid geometry owner. Placement never assigns braid identity.

Each particular-configuration subsection in either chapter must carry:

- current descriptive label;
- stable Borg assembly identity and exact model revision;
- exact Borg link;
- complete characteristic summary;
- defining coordinates and path prescription;
- evidence owner, claim grade, scope, and falsifier.

## Borg Identity And Reference Contract

Identity foundation is the serial prerequisite for every broad rename.

1. Add an opaque permanent `assemblyId` for every concrete configuration. It contains no family, chapter, dimension, geometry, or label meaning.
2. Define a versioned canonical model serialization before assigning `modelRevisionSha256`. It must fix object-key order, persistent member order, number-token normalization, absent-versus-null handling, units, and source-law version so independent implementations hash identical scientific content to identical bytes.
3. Compute `modelRevisionSha256` over identity-bearing scientific content: inventory, persistent member order, component relations, coordinates, paths, units, motion policy, and source-law version. Exclude labels, prose descriptions, taxonomy membership, and evidence status.
4. Retain `recordSha256` for exact emitted bytes. A label-only re-emission creates the current record hash and replaces obsolete development output; no old record hash is exposed as an alias.
5. Treat labels, catalog IDs, specification IDs, filenames, and URLs as mutable development surfaces. Rename them directly and update every live consumer in the same migration. Do not add `compatibility.retainedIdentifiers`, alias tables, redirects, or parallel old-name routes.
6. Resolve corpus references by `assemblyId + modelRevisionSha256`; add `recordSha256` only when the exact visual artifact matters.
7. Remove the Library assumption that every label begins with a taxonomy code followed by an em dash.

One identity decision remains open and must close before Wave 0 assigns IDs: whether `assemblyId` denotes one exact scientific configuration or a configuration lineage that may contain scientifically different model revisions. Do not let implementation choose this boundary implicitly.

Plainly: the stable assembly and model revision identify the geometry. The repository does not need to preserve every temporary label used while the application is still under development.

### Evidence-Bound Rename Rule

Before changing a label, source ID, filename, route, or emitted record, freeze the canonical identity-bearing payload and `modelRevisionSha256` for every evidence-referenced configuration. After the rename, an independently authored comparison must establish byte equality of the canonical scientific payload and equality of `modelRevisionSha256`. A changed `recordSha256` is then presentation-byte change only.

If the canonical payload or model revision changes, the migration must assign the disposition required by the identity decision above and rerun, withdraw, or re-scope every dependent evidence claim. It must not transfer an old result to scientifically different content merely because the display looks the same.

The operator has authorized a one-time development exception to the Braid Program's append-only work-log and write-once evidence-file rules solely for removing obsolete labels, paths, and exact-byte references. Numerical results, equations, claim grades, falsifiers, and execution facts may not change under that exception. The independent payload comparison and ordinary content checks must pass before the rewritten evidence is accepted.

Plainly: names and paths may change, but the mathematics underneath must either remain exactly the same or receive new evidence.

## Working Label And Filename Migration

Use descriptive primary labels rather than replacing one opaque prefix system with another:

| Current label | Replacement label |
| --- | --- |
| `SC-01`, `SC-02`, and `SC-04` through `SC-12` | `Alternating circular ring — 1:1`, `Alternating circular ring — 2:2`, and `Alternating circular ring — 4:4` through `Alternating circular ring — 12:12` |
| `SC-03` or `T04` | `Equal-radius 3:3 alternating circular ring — planar three-binary balance` |
| existing generic `B1.3` | `Unequal-radius planar three-binary reference` |
| `SS-C5` | `Co-spherical two-planar-braid display point — co-rotating` |
| `SS-C6` | `Co-spherical two-planar-braid display point — counter-rotating` |
| `PV-*` | descriptive rotating vertex-set display label |
| `SD3` | `Centered five-coordinate representative` |
| `F5` | `Phase-varying prescribed display representative` |
| `F6b` | `Co-spherical scoped-negative circular realization` |
| `F6c` | `Small asymmetric counter-breathing representative` |
| `T02` through `T200` | factual labels derived from each row's frozen inventory, geometry, and balance parameters during Wave 0 |

`SC-*`, `SS-*`, and superseded `PV-*` labels are removed after migration; they do not remain searchable aliases. Final labels may improve during the source-record batch, but every accepted change must update the catalog, source label, record title, documentation, tests, routes, queries, and visible filename-bearing links together.

Planned forward-facing filename directions include:

- `shared-circle-assemblies.md` to `2d-braid-assemblies.md`, followed by content-based reorganization;
- the priority-only `shared-sphere-assemblies.md` split by actual component-braid dimension rather than renamed wholesale;
- `shared-circle-assembly-registry.md` to `circular-configuration-registry.md`;
- `shared-geometry-display-catalog.md` to `configuration-display-catalog.md`;
- `shared-circle-NN-alternating.v2.json` to descriptive `alternating-circular-ring-NN.v2.json` source filenames;
- `shared-sphere-c5/c6-two-rings.v2.json` to descriptive co-spherical C5/C6 source filenames;
- `borg-orbit-sharing.test.js` to `borg-circle-occupancy.test.js`;
- `borg-shared-geometry-records.test.js` to `borg-configuration-geometry-records.test.js`.

Rename current evidence filenames and update current work-log references when they contain a replaced configuration label. The repository history retains the prior spelling; the live tree carries only the current label and route.

## Borg Coverage Rule And Initial Gap Set

Every exact configuration used as the subject of reader-facing study must have a matching Borg leaf; visually similar records do not satisfy this requirement.

| Studied material | Current Borg state | Planned disposition |
| --- | --- | --- |
| Regular alternating $N{:}N$ rings for $1\le N\le12$ | All twelve present | Relabel while preserving the exact geometry. |
| General planar B1.3 | Present | Preserve as the unequal-radius reference. |
| T04 | Present as `SC-03` | Use the single factual `Equal-radius 3:3 alternating circular ring — planar three-binary balance` label and regenerate the current record bytes. |
| Accepted T02 through T200 B1.3 ladder | Only T04 present | Add the other ninety-nine exact peer model revisions/records. |
| Fixed axial-translation T04 study | No exact display records | Add each exact named control or zero used by the corpus after its source point is frozen. |
| Orthogonal-plane weave study | Generic A1.2 is not an exact substitute | Add the named evidence-bound seed and control points that the corpus references. |
| Generic and co-spherical C5/C6 points | Four distinct records present | Preserve all four as distinct parameter points and relabel the co-spherical pair descriptively. |
| F6b co-spherical negative control | Present | Preserve its exact evidence relation. |
| Rigid-octahedral and stationary-six-site negative strata | Current `PV-06` is a different history | Add exact theorem-matching records; never reuse the visually similar record. |
| Platonic polarity enumeration | Five display choices cover one pattern per solid | Keep the collection-level result; add an individual leaf when a coloring/axis/history becomes the subject of a particular reader-facing claim. |

Do not invent a representative for a parameterized negative class. An exact point enters Borg only when its source owner freezes the point, history, polarity word, and evidence relation.

## Versioned Borg Facet Migration

Do not rename existing fields in place.

1. Split the current track-grouping implementation into an internal neutral `sourceTrackGroups` helper and a reader-facing `Circle occupancy` descriptor. Trails may use track grouping even where the circle-specific facet is unavailable.
2. Replace the saved-query key `orbitSharing` with `circleOccupancy`; increment the facet schema version. Clear old saved filters with an explanation because `Dedicated` is not semantically equivalent to `One per circle`.
3. Rename internal trail presentation from `shared-arc` to `multi-occupant-arc`, `shared binary orbit` to `two-occupant antipodal circle`, and `dedicated orbit` to `single-occupant circle` or `single-occupant path` according to the actual carrier.
4. Preserve current whole-record `dimension` semantics under the explicit name `assemblySpan`. Add a separate `braidDimension` derived only from complete declared component-braid membership.
5. Keep incomplete, unsupported, noncircular, or mixed circular/noncircular records `Not assigned`. Never infer a false negative.

The initial 43-record expectation is 22 `Multiple per circle`, 19 `One per circle`, zero `Mixed`, and two `Not assigned` records (`SD3` and `F6c`). The proposed braid-dimensionality expectation is six 2D, twenty-one 3D, zero Mixed, and sixteen Not assigned. These are migration expectations to be re-derived and checked against the final source inventory, not scientific measurements.

## Coordinated Execution Waves

One coordinator owns the plan, dependency graph, integration, generated-artifact timing, and final validation. Shard agents report before editing and receive disjoint write sets.

### Wave 0 — Freeze The Migration Matrix

Serial coordinator work:

- enumerate every authored, source, test, scene, generated, evidence, route, and query consumer in the live tree;
- freeze current path, current label, permanent identity, replacement label, replacement path, record status, characteristic values, and evidence owner for every row;
- resolve whether each current C-coded record describes one assembly or a component grouping before braid dimensionality is assigned;
- extract the useful equations and constraints from every current A/B/C chart while assigning no replacement family code.

Acceptance: no destination, identity, or semantic cell remains implicit.

### Wave 1 — Identity Foundation

Serial Borg-owner work; no corpus or bulk label edits:

- implement `assemblyId`, model revision, direct path migration, and exact-link resolution;
- replace old catalog IDs, URLs, specification IDs, and record hashes throughout the live tree;
- add identity, exact-link, and stale-label absence tests.

Acceptance: a label and filename can change without changing model identity, every current exact reference resolves, and no obsolete label or route remains live.

### Wave 2 — Parallel Non-Overlapping Batches

After Wave 1 passes, run these shards in parallel:

| Shard | Exclusive write set | Deliverable |
| --- | --- | --- |
| Taxonomy and corpus | `content/markdown/aaa/noether-braid/**` plus authored Noether-braid scene sources | Refactored canonical taxonomy, reader-ready 2D/3D worked chapters, redistributed family-source content, and factually named specialist chapters; no Borg code or source specifications. |
| Scientific source and record coverage | `reference/priorities/braid-program/configurations/**`, the prescribed-record generator, catalog source, and record migration map | Descriptive source paths and labels, missing exact studied configurations, and reproducible record targets; no Library facets or corpus prose. |
| Borg facets and presentation | `src/apps/borg/library/**`, `BorgOrbitGeometry.mjs`, `BorgOrbitTrails.mjs`, `borg-library.html`, Borg requirements/audit, and focused facet/trail tests | Circle occupancy, assembly span, braid dimensionality, saved-query migration, and UI copy; no configuration files or corpus prose. |

The coordinator alone edits cross-lane indexes, migration tables, queue state, and files touched by more than one shard.

### Wave 3 — Routing And Terminology Integration

Coordinator-led serial integration:

- migrate `binary-dynamics.md`, all three `braid-family-*.md` sources, code-derived specialist sources, Braid Program registries, active queues, and all authored inbound links;
- migrate source `geometryOwner` and `canonSource` routes;
- update scenes, stable scene-label locks, catalog documentation, exact Borg links, and renamed tests;
- update current work logs, evidence references, and routes to the replacement labels; rely on repository history rather than compatibility names;
- verify no geometry-taxonomy use of `shared` remains, while leaving unrelated ordinary uses such as a shared clock, helper, residual, or renderer intact.

### Wave 4 — Generated Closure

Run generator writes only in this authorized final migration wave:

```text
node scripts/eom/generate-prescribed-braid-record.mjs --all --write
node scripts/validate-content.mjs --write --strict
node scripts/build-scene-graph.mjs --write --strict
node scripts/build-textbook-md-pdf.mjs --write
```

Do not regenerate the iOS textbook package unless the operator separately requests iOS packaging.

### Wave 5 — Validation And Independent Review

Minimum validation:

```text
node scripts/eom/generate-prescribed-braid-record.mjs --all --check
node scripts/validate-content.mjs --check --strict
node scripts/build-scene-graph.mjs --check --strict
node scripts/build-textbook-md-pdf.mjs --check
git diff --check
```

Also run the focused Borg catalog, identity, Library, circle-occupancy, braid-dimensionality, trail, record-geometry, source-generation, scene, link, and browser tests selected by the implemented batches. Independent review must compare the final migration matrix against the actual repository, not merely replay the migration code.

After the migration passes, remove this migration-only plan and the BP-016 queue entry after transferring the current definitions and maintenance rules into their permanent owners. Do not retain an old-label migration document as historical product documentation.

## Acceptance Criteria

The migration closes only when:

1. `braid-taxonomy.md` is the sole reader-facing owner of assembly-identification characteristics.
2. The 2D/3D classification uses declared component braids; whole-assembly span remains separately visible.
3. No live geometry-taxonomy artifact depends on the word `shared` or on SC/SS labels.
4. No live taxonomy, catalog, chapter, filename, route, source ID, or selector uses Family A/B/C or an A/B/C-derived configuration code.
5. No catalog, chapter, or selector uses a parent/member hierarchy or inherited characteristic row.
6. Every specifically studied configuration has an exact Borg record or one explicit collection-level/non-instantiated reason why a leaf does not apply.
7. Every reader-facing configuration subsection links to its exact Borg identity and separately cites its scientific evidence owner.
8. No obsolete label, compatibility identifier, redirect, parallel route, or old-name saved query remains in the live tree.
9. Borg and corpus assign identical characteristics from the same source definitions, including fail-closed `Not assigned` outcomes.
10. All authored filenames, headings, anchors, links, catalog labels, source labels, tests, and visible filenames agree with the new terminology.
11. Generated checks and focused tests pass, an independent route audit finds no stale authored consumer, and migration-only planning artifacts containing the replaced labels are removed after their current rules reach permanent owners.

## Falsifiers And Stop Conditions

- If one exact record receives different characteristic values in Borg and the corpus, stop and repair the common definition or source data.
- If a label-derived parent is still required to identify or classify a record, the flat taxonomy migration has failed.
- If removing an A/B/C code makes a configuration impossible to identify, its factual characteristic row or exact identity is incomplete; repair that data rather than restoring the family code.
- If a source lacks complete component membership, do not assign braid count or braid dimensionality.
- If circle equality is supported only by samples, rendering, equal radius, or independent recentering, leave circle occupancy `Not assigned`.
- If an obsolete label remains in a live authored, source, code, test, evidence, generated, route, or query artifact, the migration is incomplete.
- If two shards need to edit the same file, stop parallel editing for that file and return it to the coordinator.

Plainly: ambiguity closes a classification; it never licenses the app or corpus to manufacture one.
