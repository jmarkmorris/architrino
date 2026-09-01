# Borg Assembly Library demonstrator

Open [the library page](../../../../borg-library.html) through the local development server. Start it from the repository root:

```sh
EOM_BORG_SHADOW=0 node scripts/dev/start-local-dev.mjs
```

Plainly: visit `http://127.0.0.1:5173/borg-library.html` after starting the server. The read-only catalog and previews do not require an EOM solver build. The Borg workbench can replay a selected sealed record; live solver execution is disabled by this start command.

Try `Architrinos: 8` to see the current breather and non-breather together, or `Assembly span: 2D` to find records whose complete paths are planar. `Braid dimensionality` separately classifies complete source-declared component braids. Drag individual spheres, use arrow keys on a focused sphere, pause/scrub the previews, or inspect a record and copy its exact selection link. The default surface lists 45 Borg braid entries over 144 exact configurations. The one hundred source-declared equal-radius planar balance rows share one braid card marked `100 configurations`; opening it reveals the exact $\beta_f$ and $R/R_*$ records. Facets and search apply before grouping, and the displayed sphere is labeled as an example rather than as evidence for every member. Wheel scrolling does not zoom a sphere.

Try `Assembly radii: Iso-radii` for the equal-radius prescribed examples, including the circular-path and co-spherical configurations. Combine `Iso-radii` with `Assembly span: 3D` for equal-radius assemblies whose complete recorded geometry spans three dimensions. `Braids in assembly: 2` plus `Hetero-radii` returns the qualifying two-braid records. The braid-count selector offers 1, 2, and 3; three currently returns no records.

`Circle occupancy` compares complete circular carriers in one declared assembly frame. `Multiple per circle` means that every identified circle has at least two occupants, `One per circle` means every circle has one occupant, and `Both occupancy types` means both class sizes occur. Noncircular, incomplete, or unsupported records remain unassigned. Equal radii alone do not establish circle equality.

The menus omit `Unavailable`; `Any` includes records whose classification is missing, while a chosen value includes only confirmed matches. Shape retains `Unclassified`. Assembly span uses `1D` for the combined line/point bucket. Record details preserve missing values as `Not assigned`. Obsolete query keys are rejected rather than translated. See [the complete catalog assignment audit](../../../../reference/priorities/app-borg/selector-assignment-audit.md) for the source-derived geometry and composition characteristics. The audit excludes speed policy as an independently applicable constraint; the live speed-policy selector is unchanged.

The concrete examples are owned by the Borg catalog and identified by their current descriptive names and exact assembly identities. Borg's inspector shows that current name together with the source specification and record identity.

## Responsibilities

The catalog is `borg-assembly-record-catalog.v2`: a flat list with `assemblyId`, `modelRevisionSha256`, `label`, and `recordUrl` per entry. Borg's left panel shows Random architrinos followed by these records in catalog order, without taxonomy headings. The catalog rejects parent fields. Analytical geometry constraints remain source-owned and do not rebuild a navigation hierarchy. See [the repository decision](../../../../reference/architectural-decisions/flat-assembly-catalog.md).

- [BorgLibraryDescriptors.mjs](BorgLibraryDescriptors.mjs): versioned record facets and complete cubic-path bounds; preview positions are sampled exclusively through the shared history dataset. The cubic bound uses the Bernstein convex-hull property and a fixed display scale under rotations.
- [BorgOrbitGeometry.mjs](../BorgOrbitGeometry.mjs): circle equality and internal source-track groups, independent of trail length. Fixed circles compare center, plane and radius in a common translation frame. Noncircular, incomplete, or ambiguous carriers remain unassigned for circle occupancy.
- [BorgLibraryRadii.mjs](BorgLibraryRadii.mjs): whole-assembly-centered squared-radius formulas, full-window equality bounds, and unequal-time-slice witnesses. Never classifies from sampled agreement or per-orbit radius alone.
- [BorgLibraryVariants.mjs](BorgLibraryVariants.mjs): presentation-only variant sets from structured source schema and exact source-ledger identity. It never derives membership from labels, filenames, or preview similarity, and it preserves every exact assembly leaf beneath the set card.
- [BorgScientificStatus.mjs](../BorgScientificStatus.mjs): validates the versioned [Braid-owned adjudication projection](../../../../reference/priorities/braid-program/braid-candidate-adjudication-projection.v1.json), verifies exact or explicitly broader relation scope, and resolves scientific coverage by exact identity before grouping. The same evaluator supplies the Library and workbench; neither surface parses Markdown or performs scientific adjudication in the browser.
- [BorgScientificStatusView.mjs](../BorgScientificStatusView.mjs): renders the shared accessible `H1`--`H5` status panel, evidence boundaries, lifecycle, freshness, and stable machine-readable hooks on both exact-inspection surfaces.
- [BorgLibraryComposition.mjs](BorgLibraryComposition.mjs): source-membership partition checks for braid count and exact-record matching of [operator classifications](../../../../reference/priorities/app-borg/library-classifications.v4.json). Changing record bytes does not inherit a former classification.
- [BorgLibraryQuery.mjs](BorgLibraryQuery.mjs): intersection across facets, union within one facet, alternative facet counts, text/hash-prefix search, and grouping after record-level filtering. Hash search requires at least eight leading hexadecimal characters.
- [BorgLibraryService.mjs](../../../../scripts/dev/BorgLibraryService.mjs): read-only seed-catalog provider for `GET /api/borg/library` and `GET /api/borg/library/preview?assemblyId=…&modelRevisionSha256=…&recordSha256=…`. Pages hold at most 12 results. Cursors bind the query and record snapshot; changed record pins return an error. Summaries load before lazy preview data.

Plainly: the server first reports what matches, then supplies only the previews the user reaches.

- [BorgSpherePreview.js](BorgSpherePreview.js): fixed-scale, independently rotatable canvas presentation. Only retained positions and past paths are drawn; there is no solver, zoom, dotted globe, or additional geometry. [The Borg trail policy](../BorgOrbitTrails.mjs) gives a two-occupant antipodal circle one red and one blue half-turn tail; co-rotating circles with three or more occupants give each member the preceding phase-gap arc; one-occupant circles have a solid full turn or source reconstruction cycle in their owner's color. Early coverage shows only the available past. Linear sources retain their recorded window; unresolved orbit carriers remain unavailable.
- [main.js](main.js): controls, saved filter/selection URLs, lazy previews, and the exact-record inspector. Leaf DOM metadata exposes identity, full record hash, facets, descriptor version, unavailable reasons, and selection state. Groups carry their own identity/count and separately identify the example preview.

Plainly: the page draws existing records and lets people find them. It neither generates assemblies nor establishes their scientific status.

## Scope and remaining work

This provider covers the 144 prescribed records in the [configuration display catalog](../../../../reference/priorities/braid-program/configuration-display-catalog.md), organized as 45 current braid entries, not the entire scientific taxonomy. The unified adjudication projection currently gives 136 exact configurations at least one active adjudication or finding-context relation; 23 current exact records have exact adjudication bindings, and one additional exact adjudication remains correctly bound to a display-withheld identity. `No active findings indexed yet` and `No adjudication linked` are coverage states, not evidence that no finding exists or that a candidate failed. A full record-byte hash pins a selection and is verified again when opening it in Borg; it is not a semantic model identity or causal-state identity. Changed records are rejected, not silently substituted.

Facet version `borg-record-facets.v12` counts persistent worldlines and source-declared component braids, computes assembly span and per-component braid dimensionality from complete retained cubic paths, assigns circle occupancy only from complete supported circular carriers, derives assembly-radius equality from source formulas, carries the separately versioned source-derived variant-set descriptor, and attaches the Braid-owned scientific-status projection. Iso-radii compares every architrino about the one source-declared whole-assembly center throughout the record window; Hetero-radii has an unequal-time-slice witness. Common breathing can be Iso-radii. Scientific classifications and evidence relations remain source-bound, and missing information remains unassigned or unindexed rather than false.

Plainly: editing a category assignment does not rewrite the assembly. The provider reloads the classification file and invalidates stale cached results and page cursors when it changes.

The server reads and caches the seed set in memory. Cursor pagination and lazy browser rendering exercise the interaction contract, not million-entry indexing or a scalability benchmark. Opaque model/occurrence identities, taxonomy migration, independent recalculation, indexed storage, complete taxonomy coverage, component isolation, and future live rotational-carrier acceptance remain open in [the Borg queue](../../../../reference/priorities/app-borg/work-queue.md).

## Verification

```sh
node scripts/check-borg-scientific-status-projection.mjs
node --test tests/borg-scientific-status.test.js tests/borg-circle-occupancy.test.js tests/borg-orbit-trails.test.js tests/borg-library-radii.test.js tests/borg-library-variants.test.js tests/borg-library.test.js tests/borg-library-preview.test.js tests/borg-assembly-record-catalog.test.js tests/borg-assembly-view-session.test.js tests/borg-eom-history-evaluation.test.js
```

Plainly: the tests check known polynomial answers and what the renderer draws. The descriptor controls use hand-derived values, not production-generated expected fixtures. Canvas-command checks establish display behavior only. Browser checks and known unrelated regression failures are recorded in [the work log](../../../../reference/priorities/app-borg/work-log.md#2026-08-30---visual-assembly-library-demonstrator).
