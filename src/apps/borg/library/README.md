# Borg Assembly Library demonstrator

Open [the library page](../../../../borg-library.html) through the local development server. Start it from the repository root:

```sh
EOM_BORG_SHADOW=0 node scripts/dev/start-local-dev.mjs
```

Plainly: visit `http://127.0.0.1:5173/borg-library.html` after starting the server. The read-only catalog and previews do not require an EOM solver build. The Borg workbench can replay a selected sealed record; live solver execution is disabled by this start command.

Try `Architrinos: 8` to see the current breather and non-breather together, or `Dimensions: 2D` to find the planar record without its taxonomy alias. Drag individual spheres, use arrow keys on a focused sphere, pause/scrub the previews, or inspect a record and copy its exact selection link. Grouping narrows to members; it never selects the representative on behalf of the whole group. Wheel scrolling does not zoom a sphere.

Try `Braids in assembly: 2` plus `Nesting: Nested` for C5/C6, or two braids plus the spindle shape for C1–C4. The braid-count selector always offers 1, 2, and 3; three currently returns no records.

## Responsibilities

- [BorgLibraryDescriptors.mjs](BorgLibraryDescriptors.mjs): versioned record facets and complete cubic-path bounds; preview positions are sampled exclusively through the shared history dataset. The cubic bound uses the Bernstein convex-hull property and a fixed display scale under rotations.
- [BorgLibraryComposition.mjs](BorgLibraryComposition.mjs): source-membership partition checks for braid count and exact-record matching of [operator classifications](../../../../reference/priorities/app-borg/library-classifications.v1.json). Aliases never assign a facet, and changing record bytes does not inherit a former classification.
- [BorgLibraryQuery.mjs](BorgLibraryQuery.mjs): intersection across facets, union within one facet, alternative facet counts, text/hash-prefix search, and grouping after record-level filtering. Hash search requires at least eight leading hexadecimal characters, so short aliases do not match incidental digest bytes.
- [BorgLibraryService.mjs](../../../../scripts/dev/BorgLibraryService.mjs): read-only seed-catalog provider for `GET /api/borg/library` and `GET /api/borg/library/preview?id=…&sha256=…`. Pages hold at most 12 results. Cursors bind the query and record snapshot; changed record pins return an error. Summaries load before lazy preview data.

Plainly: the server first reports what matches, then supplies only the previews the user reaches.

- [BorgSpherePreview.js](BorgSpherePreview.js): fixed-scale, independently rotatable canvas presentation. Only retained positions and past paths are drawn; there is no solver, zoom, dotted globe, or additional geometry. Declared constant angular rate permits a half-turn trail; the linear source uses its recorded window, and unsupported phase carriers expose missing trails.
- [main.js](main.js): controls, saved filter/selection URLs, lazy previews, and the exact-record inspector. Leaf DOM metadata exposes identity, full record hash, facets, descriptor version, unavailable reasons, and selection state. Groups carry their own identity/count and separately identify the example preview.

Plainly: the page draws existing records and lets people find them. It neither generates assemblies nor establishes their scientific status.

## Scope and remaining work

This provider covers the existing 24 prescribed seed records, not the entire scientific taxonomy. Catalog IDs remain legacy aliases. A full record-byte hash pins a selection and is verified again when opening it in Borg; it is not a semantic model identity or causal-state identity. Changed records are rejected, not silently substituted; historical byte-addressed storage remains future work.

Facet version `borg-record-facets.v2` counts persistent worldlines and source-declared braid groups, computes affine dimensionality from retained cubic control points, recognizes fixed-center circular operators and declared radial/axial harmonics, and retains an inspectable explanation. Versioned operator classifications confirm nine nested and six spindle records; the inspector exposes their source and revision. Every Family-C record has two declared groups, including C1/C2's component index subsets; this count makes no separate binding claim. The broader nesting predicate remains open as described in [the composition contract](../../../../reference/priorities/app-borg/requirements-and-design.md#catalog-composition-classifications), and unlisted nesting remains unavailable rather than false. Speed policy and spherical-envelope classification remain unavailable. The optional source declaration checks are demonstrator rules, not ratification of new record-schema fields.

Plainly: editing a category assignment does not rewrite the assembly. The provider reloads the classification file and invalidates stale cached results and page cursors when it changes.

The server reads and caches the seed set in memory. Cursor pagination and lazy browser rendering exercise the interaction contract, not million-entry indexing or a scalability benchmark. Opaque model/occurrence identities, taxonomy migration, independent recalculation, indexed storage, complete taxonomy coverage, component isolation, and the full BORG-016 renderer migration remain open in [the Borg queue](../../../../reference/priorities/app-borg/work-queue.md).

## Verification

```sh
node --test tests/borg-library.test.js tests/borg-library-preview.test.js tests/borg-braid-record-catalog.test.js tests/borg-assembly-view-session.test.js tests/borg-eom-history-evaluation.test.js
```

Plainly: the tests check known polynomial answers and what the renderer draws. The descriptor controls use hand-derived values, not production-generated expected fixtures. Canvas-command checks establish display behavior only. Browser checks and known unrelated regression failures are recorded in [the work log](../../../../reference/priorities/app-borg/work-log.md#2026-08-30---visual-assembly-library-demonstrator).
