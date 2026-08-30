# Borg Work Queue

This is the canonical execution ledger for accepted Borg work. `priorities.md` owns strategic ranking and rationale; `brainstorming.md` holds uncommitted ideas. A task enters this file only when it has an explicit acceptance outcome and an execution owner can take it.

## Rules

1. Promote a brainstorm item here only when it becomes an accepted, testable task; remove the promoted task from `brainstorming.md` in the same edit.
2. Keep the strategic priority in `priorities.md`, but do not duplicate changing status or evidence there.
3. Use `Queued`, `In progress`, `Awaiting verification`, `Verified`, `Superseded`, or `Withdrawn` as the lifecycle states; keep intentionally parked rows under `Deferred / blocked`.
4. Move a task to `Verified` only after its stated validation and any required operator acceptance.

## Next real work

`BORG-001` — native wake-history and boundary-residual fixture.

## Ranked Next Objects

1. `native_wake_history_and_boundary_residual_fixture` — [BORG-001](#borg-001--native-wake-history-and-boundary-residuals). Status: `Queued`.
2. `assembly_viewer_record_contract_carriers` — [BORG-002](#borg-002--assembly-viewer-record-contract-carriers). Status: `Queued`.
3. `assembly_registry_identity_and_taxonomy_browser` — [BORG-014](#borg-014--assembly-registry-durable-identity-and-taxonomy-browser). Status: `In progress`.
4. `borg_taxonomy_selection_canvas` — [BORG-015](#borg-015--taxonomy-selection-canvas). Status: `In progress`.
5. `borg_polarity_path_color_and_half_turn_fade` — [BORG-016](#borg-016--polarity-path-color-and-half-turn-fade). Status: `Queued`.
6. `velocity_scale_sampling_evidence` — [BORG-003](#borg-003--velocity-scale-sampling-evidence). Status: `Queued`.
7. `assembly_explorer_disposition` — [BORG-004](#borg-004--assembly-explorer-disposition). Status: `Queued`.
8. `borg_runtime_decomposition` — [BORG-005](#borg-005--borg-runtime-decomposition). Status: `Queued`.
9. `borg_prescribed_translation_tubes` — [BORG-006](#borg-006--prescribed-translation-and-causal-history-tubes). Status: `Queued`.
10. `borg_taxonomy_morph_lab` — [BORG-007](#borg-007--taxonomy-morph-lab). Status: `Deferred / blocked`.
11. `borg_braid_harmonics_studio` — [BORG-008](#borg-008--braid-harmonics-studio). Status: `Deferred / blocked`.
12. `borg_family_a_exclusion_geometry` — [BORG-009](#borg-009--family-a-exclusion-geometry). Status: `Deferred / blocked`.
13. `borg_gell_mann_pattern_atlas` — [BORG-010](#borg-010--gell-mann-pattern-atlas). Status: `Deferred / blocked`.
14. `borg_polarity_ledger_builder` — [BORG-011](#borg-011--polarity-ledger-builder). Status: `Deferred / blocked`.
15. `borg_conservation_flow_board` — [BORG-012](#borg-012--conservation-flow-board). Status: `Deferred / blocked`.
16. `borg_material_surface_routing` — [BORG-013](#borg-013--material-surface-routing). Status: `Deferred / blocked`.

## Awaiting verification

No rows.

## In progress

[BORG-014](#borg-014--assembly-registry-durable-identity-and-taxonomy-browser) and [BORG-015](#borg-015--taxonomy-selection-canvas); their full acceptance rows remain below in execution order.

## Queued

### BORG-001 — Native wake history and boundary residuals

- **Status:** Queued
- **Priority source:** [Ranked Next Objects item 1](priorities.md#ranked-next-objects)
- **Request / acceptance:** Extend the EOM contracts and native implementation so Borg receives retained wake/interaction rows, row-conservation counts, boundary-to-central residual rows, and required acceleration-contribution diagnostics. The app must consume these as EOM-owned data; no app-local physics or visual tuning may replace missing rows.
- **Evidence / blocker:** EOM solver and bridge capability work is required. Until these rows exist, replay-affected values remain fail-closed or display-only.
- **Completion:** Contract, native implementation, bridge schema, focused validation fixtures, and Borg consumer coverage pass; any learner/operator surface requiring these values is verified against current EOM output.

### BORG-002 — Assembly-viewer record-contract carriers

- **Status:** Queued
- **Priority source:** [Ranked Next Objects item 2](priorities.md#ranked-next-objects)
- **Request / acceptance:** Close the remaining record-contract carriers needed for Borg’s record-only assembly-view replay: ratified comparison time/unit transforms, an external collection carrier, required field-speed carrier, and spin/polarity-dipole vectors. Borg must consume sealed records and must not invent missing carriers.
- **Evidence / blocker:** Blocked on the Braid Program instrument-gate schema action.
- **Completion:** Required carriers are ratified and available in sealed records; record-only replay preserves its no-run/no-mutation boundary and passes focused/browser checks.

### BORG-014 — Assembly registry, durable identity, and taxonomy browser

- **Status:** In progress — seed-catalog visual demonstrator available; registry and migration remain open.
- **Selector audit:** [All twenty individual A/B/C representatives across seven dimensions](selector-assignment-audit.md), including assigned values, unassigned nesting/speed policy, and the source-derived common-spherical-surface candidates A1.2, A2, A3.2. The spherical browse definition is `discussion-scoped`; no spherical assignments were added. Menus now omit `Unavailable`, retain shape `Unclassified`, and use `1D` for the line/point bucket. Internal missing data remains distinct from false.
- **Source:** Operator direction and identity/taxonomy discussion on 2026-08-29; visual-first discovery and speed-policy selectors accepted on 2026-08-30.
- **Demonstrator:** [Assembly Library](../../../borg-library.html), served locally by the development server, now exposes all 24 sealed seed records through filters, marked groups, cursor pages, independently rotatable previews, and a hash-pinned inspector/open-in-Borg path. [Run instructions and scope](../../../src/apps/borg/library/README.md); [verification receipt](work-log.md#2026-08-30---visual-assembly-library-demonstrator). This is an in-memory seed provider using legacy catalog aliases and exact record hashes, not the accepted opaque-identity registry, taxonomy migration, or million-entry benchmark. The next foundation step remains the identity-relation/schema contract and independent recalculation plan.
- **Composition discussion / implementation:** The [composition contract](requirements-and-design.md#catalog-composition-classifications) and [versioned operator assignments](library-classifications.v1.json) confirm nested A1.1, A1.3, A1.4, A3.1, A3.3, A3.4, B1.3, C5, and C6; spindle B1.1, B1.2, C1, C2, C3, and C4. C5/C6 each contain two nested braids. The braid-count selector offers 1, 2, and 3, counting source-declared component membership; all Family C has two, including the C1/C2 index subsets, without asserting independent binding or changing top-level taxonomy. Exact record pins separate these mutable browse assignments from sealed geometry. The general nesting rule is still open: different binary layer radii also occur in A1, A3, B1.1, B1.2, and C1–C4. Until the operator resolves whether to include those cases, unlisted nesting remains unavailable, not false. [Focused verification](work-log.md#2026-08-30---nested-spindle-and-braid-count-filters).
- **Prompt:**

  Closure goal: Establish a scalable, migration-safe assembly identity and taxonomy foundation that can distinguish models, evolved occurrences, records, causal states, morphology, lineage, and mutable classifications across a catalog expected to grow from the current seed set to tens of thousands or millions of assemblies; then make every registered concrete assembly and every admitted taxonomy member discoverable, visually inspectable, and honestly animated in Borg.

  Replace the braid-only navigation assumption with a versioned assembly registry that can represent planar braids, spatial or three-dimensional braids, assemblies containing multiple top-level braids, and registered assemblies that do not belong to a named braid family. Preserve the taxonomy distinction between one top-level braid with component-braid rows, such as applicable Family-C records, and an assembly made from multiple separate top-level braid records. Classify dimensionality and composition from source-declared coordinates and inventory, never from visual appearance alone.

  Do not define one overloaded `same assembly` predicate. The registry and its comparison APIs must name the relation being asserted and keep at least these relations distinct:

  - exact sealed-record equality;
  - model-specification equality under a frozen set of explicitly declared symmetries and persistent-order rules;
  - future-sufficient causal-state equality, which remains unavailable until the EOM checkpoint and path-history state required for identical future discrete decisions has been established;
  - formation or reaction-lineage continuity, including source-carried merge and split provenance where applicable;
  - instantaneous morphology similarity under a declared metric and tolerance; and
  - taxonomy co-membership under a named taxonomy revision.

  Plainly: two records can have the same visible shape but different histories and different futures. One continuing occurrence can also change shape without becoming a new lineage. A comparison must say which kind of sameness it means, and no morphology, taxonomy, or hash agreement may silently stand in for causal-state or lineage equality.

  Separate the following identity and revision layers:

  1. a permanent opaque `assemblyId` for a repeatable registered assembly model, with no family, geometry, evidence, or version meaning;
  2. a separately named opaque identity for a particular evolved occurrence or formation lineage when the source carries that distinction; the schema must ratify the field name and merge, split, continuation, and supersession rules rather than overloading `assemblyId`;
  3. a full `modelRevisionSha256` computed from one canonical, versioned, identity-bearing assembly specification that includes inventory, persistent source order, component relations, coordinates, motion prescription, applicable speed policy and source-law version, units, and generator inputs while excluding mutable display names, taxonomy aliases, descriptions, and evidence status;
  4. versioned taxonomy-node and membership identities that remain separate from both model and occurrence identity; and
  5. a `recordSha256` for each sealed visual or evolved record, because byte identity of a produced record is different from semantic identity of its assembly model or evolved occurrence.

  Clean up the taxonomy even when this requires a one-time migration or recalculation. Represent it as a versioned relation graph rather than forcing every classification into one family tree. Taxonomy nodes receive stable, non-reused opaque identities separate from their primary names and codes; primary labels, synonyms, aliases, parentage, cross-memberships, merges, and supersessions remain revisable and historically traceable. A source-declared reference representative may anchor a name and migration, but it does not define the whole category or become the identity of every member. Separate the category concept from the evidence used to delimit or assign its members.

  Treat existing identifiers such as `A1.2`, `B1.3`, catalog ids, source ids, friendly names, and superseded taxonomy codes as searchable provenance-bearing aliases rather than canonical primary keys. New URLs, caches, selection state, comparison packets, exports, and cross-record references must use stable opaque identity plus the exact applicable revision hash rather than a mutable alias. Expose a short, collision-checked prefix of the model hash in selected-result details and the inspection viewport, with a one-action copy control for the full model identity, occurrence identity when present, full model hash, record hash, taxonomy revision, source specification, and sealed-record URL. Do not require hashes on every unselected preview card. The full hash remains authoritative; a short prefix is display shorthand only.

  Plainly: a human may rename “B1.3,” split or merge a category, or move an assembly to a better classification without changing which model, occurrence, or historical record a saved link means. A coordinate or motion change creates a new model-revision hash, while a recalculated record creates a new record hash. The screen always lets collaborators state exactly which object, occurrence, taxonomy revision, model revision, and record they are discussing.

  Build the registry for the expected scale rather than as an eagerly loaded JavaScript array or one monolithic browser bundle. Use canonical content-addressed model and record objects behind an indexed relational control plane and a storage-neutral, cursor-paginated query contract. The reference implementation must index exact opaque ids, full hashes, aliases and provenance, collision-checked hash-prefix ranges, taxonomy memberships, orthogonal facets, and descriptive text; load thumbnails, geometry, and sealed records lazily. Measure a deterministic synthetic one-million-entry engineering corpus for import time, database size, exact-id lookup, full- and prefix-hash lookup, alias ambiguity, facet filtering, text search, and cursor-page latency. This benchmark establishes software scalability only and supplies no scientific evidence about the synthetic assemblies.

  Build a visual-first, faceted **Assembly Library** rather than another flat `Starting geometry` list or name-led taxonomy tree. Independently rotatable assembly-preview spheres are the primary discovery surface for humans. Descriptive names, family/member codes, hashes, and other textual identifiers remain searchable and accessible but are secondary in the ordinary browse flow and may stay collapsed until a result is selected or copied. Provide orthogonal browse and filter facets at minimum for:

  - exact architrino count;
  - braids in the assembly, initially offering 1, 2, and 3, based on complete source-declared component membership rather than division of architrino count;
  - breathing, non-breathing, and unavailable motion classification;
  - nested, non-nested, and unavailable composition classification;
  - declared speed policy: uncapped, capped at $c_f$, or unavailable;
  - planar, spatial (3D), mixed, and degenerate/boundary geometry;
  - one or more nonexclusive visual-form descriptors, initially including `circular paths`, `multiple circular path groups`, `spherical distribution`, and `spindle-like envelope` once their meanings are frozen;
  - one top-level braid, multiple top-level braids, and registered non-family assembly;
  - prescribed chart, evolved record, translating, rotating, breathing, and static motion where the source declares that classification;
  - component braid count and component identities;
  - taxonomy family/member/variant aliases;
  - claim grade, evidence status, and visual-record availability.

  Every facet value must be source-carried, explicitly assigned in a versioned source classification, or produced by a versioned deterministic descriptor from source-declared inventory and geometry, with its owner/version and inspectable reason retained. The preview's circular clipping frame is never evidence that an assembly is circular or spherical. Visual-form descriptors may overlap. A missing value is `unavailable`, not `false`, and Borg must not infer breathing, nesting, dimensionality, or shape from a rendered image.

  Speed policy is an explicit source-model or run-policy declaration, not a threshold test on the current frame or recorded maximum speed. Retain the policy owner/version, applicable speed quantity and frame, and unit convention; distinguish constituent speed from assembly translation. Use $c_f=1$ in new numerical fixtures and recalculations without relabeling legacy records. Missing policy metadata remains unavailable. A changed speed law or imposed cap is identity-bearing model/run configuration, not a display preference; selecting this filter does not modify a model, clamp playback, authorize new EOM behavior, or establish that the declared cap was independently verified.

  Plainly: an uncapped model can happen to move below $c_f$. The selector tells us whether a cap was part of the declared model or run, not how fast one displayed frame happens to be moving.

  Default to one result sphere per registered model representative and show compact counts for attached model revisions, evolved occurrences, and sealed records. Evaluate revision- or record-specific facets at that exact level before grouping so a representative never hides a matching variant or misclassifies a nonmatching one. Open those lower layers only after selection. A broad query may return explicitly marked group spheres with member counts; selecting a group applies its represented facet or descends to a narrower result set, while a leaf sphere opens one exact registered model or record. A group sphere has its own result identity; a displayed representative remains identified as an example and does not establish the geometry, evidence status, or scientific standing of every group member.

  Return the total matching count and available facet counts before loading preview geometry. Use deterministic ordering, cursor pagination or virtualization, and lazy preview loading so tens of thousands or millions of matches never become millions of live spheres. Preserve the exact filter state in saved and shareable selection URLs. Each interactive result must expose through accessible DOM or an equivalent stable test contract its result kind, stable id, exact target id and revision when it is a leaf, facet values, member count, selected state, and unavailable reason. Human users may recognize geometry visually; automated and AI tests must never be required to infer identity or filter truth from pixels.

  Search must accept descriptive text, permanent assembly id, full or unambiguous short model-hash prefix, record hash, source id, legacy catalog id, and taxonomy alias. The selected view must expose a readable taxonomy breadcrumb, component inventory, source-defined geometry description, every known alias, and the exact identity block. An alias collision or ambiguous short hash must fail closed and ask for a longer identifier.

  Plainly: “planar versus 3D” and “one braid versus several braids” are independent questions, so the menu must not force them into one fragile family-name tree. A descriptive card explains what a viewer will see; the taxonomy badges and hashes say how the corpus and exact record identify it.

  Establish a coverage contract for visual collaboration. Every registered concrete assembly must have a deterministic poster view, a loadable 3D inspection scene, a declared default camera and scale, polarity and constituent visibility, component-braid isolation controls where applicable, and at least one clearly labeled animation mode. For a moving prescribed record, animate only its source-carried worldlines. For an evolved record, animate only accepted recorded history. For a truly static or degenerate record, provide a camera turntable or component-reveal animation explicitly labeled as camera or presentation motion; never invent assembly motion to satisfy the animation requirement. Preserve controls for play, pause, scrub, trail depth, axes, centers, binary pairing, top-level braid grouping, and component isolation whenever the record carries the required data.

  Inventory the live Braid Taxonomy, configuration chart, shared-circle assembly registry, existing Borg catalog, and other accepted assembly registries. The authoritative Borg registry must distinguish a taxonomy member from a concrete representative and from a parameter or history revision. Every admitted taxonomy member must have at least one source-declared representative before this object can be verified; every separately registered concrete assembly must have its own registry entry rather than borrowing the identity of a visually similar family member. Missing scientific coordinates remain a source-owner blocker and must appear as an explicit unavailable coverage row; Borg must not manufacture geometry or dynamics to fill it.

  Perform an explicit one-time migration rather than preserving an obsolete taxonomy or record representation as a parallel canonical path. Existing ids, URLs, saved links, and visible labels must resolve through provenance-bearing aliases or an explicit superseded state, but hash-pinned links must never be silently retargeted. Retain every old sealed record by its original `recordSha256` for historical access. When recalculation is required, create a new canonical record with a new hash and a migration row that binds old record to new record, reason, producer version, model revision, and independent verification receipt. Prove that changing a mutable display name or taxonomy assignment leaves model and occurrence identity unchanged; prove separately that changing an identity-bearing coordinate, component relation, persistent source order, motion prescription, or future-consumed state changes the applicable revision identity.

  Freeze the normative schema, identity-bearing field list, symmetry and persistent-order rules, and owner formulas before migration comparison. Build a separately authored recalculation and verification program, preferably in Python through the shared project environment, that independently reconstructs inventory, component relations, coordinates, positions, velocities, motion, units, canonical bytes, and expected hashes from the normative sources. It must not import the production canonicalizer, migration field list, worldline operator, record emitter, expected hashes, or production output as its oracle. Agreement between the production migration and this verifier tests the two implementations; any mathematical rule changed on both sides still requires a separately stated and checked rule.

  Optionally admit a construction-complexity descriptor inspired by Assembly Theory only after freezing its building-block alphabet $B$, allowed join operations $J$, algorithm/version, and whether the result is exact or bounded:

  $$
  a_{B,J}(x)=\min_{p\in\mathcal P_{B,J}(x)}|p|.
  $$

  Plainly: this number describes the shortest construction allowed by declared rules. It is not the actual formation lineage, does not decide whether two occurrences are the same, and establishes no evolution, selection, retention, stability, binding, or physical acceptance. Any copy count likewise depends on an explicitly named equivalence relation. Treat the biological-taxonomy and Assembly Theory comparisons as design heuristics only; do not import biological ranks or contested selection claims into $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology. Comparison sources: [ICZN nomenclature](https://code.iczn.org/introduction/), [NCBI Taxonomy data model](https://www.ncbi.nlm.nih.gov/books/NBK53758/?report=reader), [species conceptualization and delimitation](https://repository.si.edu/items/f603d210-0638-4c36-bc49-3399b8df6f0d), [Assembly Theory](https://www.nature.com/articles/s41586-023-06600-9), [molecular assembly index](https://www.nature.com/articles/s41467-021-23258-x), and [critical assessment](https://www.nature.com/articles/s41540-024-00403-y).

  Keep Borg's authority boundary intact. A poster, animation, taxonomy placement, similarity grouping, or hash match is display and identity infrastructure; none establishes acceleration balance, evolution, retention, stability, binding, physical identity, or scientific acceptance. Borg consumes source-defined specifications and sealed records and performs no app-local causal-root solving or forward physics.

- **Evidence / blocker:** The current `BorgBraidRecordCatalog.js` is a flat braid-oriented seed catalog whose ids and primary labels contain taxonomy semantics; it is not a sufficient storage, query, or visual-discovery architecture for millions of entries. The live taxonomy already separates assembly composition, individual braid, and individual binary, while assembly-view requirements already require immutable record navigation and source-defined parameter variants. Current source specifications do not yet carry every proposed identity-bearing field or visual facet consistently, and some admitted or separately studied assemblies lack a sealed Borg record or a source-owner-approved concrete representative. The first foundation artifact is therefore a discussion-ratified assembly-identity relation contract with examples and counterexamples. The first app-facing artifact is a low-fidelity visual-finder interaction contract over the current seed catalog, showing filter semantics, group-versus-leaf behavior, unavailable values, counts, pagination, machine hooks, and a worked path from a synthetic million-row result set to one exact record.
- **Completion:** The identity-relation contract fixes what `assemblyId` denotes, ratifies the separate occurrence/lineage identity and lifecycle rules, defines model, causal-state, morphology, record, and taxonomy equality without substitution, and provides worked examples and counterexamples. A versioned indexed assembly-registry schema, canonical model-hash procedure, taxonomy-relation graph, versioned facet-descriptor contract, alias/supersession contract, historical-record migration map, storage-neutral paginated query contract, and machine-readable coverage report are accepted. A separately authored verifier independently recalculates and checks the migrated seed corpus, and the deterministic one-million-entry benchmark reports the declared import, storage, lookup, ambiguity, filter, search, and pagination measurements. Focused tests cover typed sameness relations, identity stability, hash sensitivity, taxonomy rename/split/merge, model-versus-occurrence separation, recalculation provenance, old-record access, alias and short-hash ambiguity, component inventory, persistent source order, reproducible facet assignment, unavailable-versus-false semantics, group-versus-leaf identity, saved filter state, registry completeness, deep-link migration, cursor pagination, accessible machine hooks, and no-physics boundaries. The visual-first Assembly Library works at desktop and narrow widths; every admitted taxonomy member has at least one source-declared visual representative; every registered concrete assembly has a deterministic poster, a loadable inspection view, and an honest prescribed, evolved, or presentation-only animation. Browser QA verifies visual faceted discovery, taxonomy browsing, search by every identity form, model/occurrence/record identity copying, representative planar and spatial single-braid entries, representative multi-braid and non-family entries, visually similar models with different histories, differently named models with the same coarse shape, component isolation, playback/scrubbing, static turntable labeling, and zero missing or silently substituted registry rows.

### BORG-015 — Taxonomy selection canvas

- **Status:** In progress — bounded visual demonstrator implemented and browser-checked; full registry acceptance remains open.
- **Source:** Operator direction on 2026-08-29 and visual-first discovery decision on 2026-08-30.
- **Demonstrator:** [Assembly Library](../../../borg-library.html) implements seven selectors, alternative facet counts, query URLs, group descent, lazy 12-result pages, independent pointer/keyboard rotation, fixed framing, playback/scrubbing, exact-record inspection, and accessible identity/facet hooks. Versioned operator assignments confirm nine nested and six spindle records; source component membership supplies eighteen one-braid and six two-braid records. The selector also offers three with zero matches. Unlisted nesting and all current speed policies remain unavailable. General nesting/spindle evaluators, spherical-envelope classification, component isolation, complete taxonomy coverage, and model/occurrence identity depend on the remaining BORG-014 work. [Composition verification](work-log.md#2026-08-30---nested-spindle-and-braid-count-filters); [initial demonstrator verification and boundaries](work-log.md#2026-08-30---visual-assembly-library-demonstrator).
- **Request / acceptance:** Implement the visual-first faceted Borg selection canvas specified in [requirements-and-design.md](requirements-and-design.md#taxonomy-selection-canvas), using the BORG-014 registry, facet descriptors, identity layers, and paginated query contract. The primary workflow is filter, visually inspect independently rotatable assembly-preview spheres, narrow through explicitly marked group spheres when necessary, and select a leaf sphere that resolves to one exact model or record. Names and taxonomy codes remain searchable secondary metadata. The filter rail includes architrino count, braid count (initially 1, 2, and 3), breathing state, nesting state, declared speed policy (uncapped or capped at $c_f$), dimensionality (`1D` including lines/points, `2D`, `3D`), and nonexclusive visual-form descriptors. Menus omit `Unavailable`; shape retains `Unclassified`. Internal missing values remain distinct from `false` and visible as `Not assigned` in record details. Render only a deterministic paginated or virtualized working set in a responsive standard grid and load preview geometry lazily. Each sphere must expose accessible machine-readable result metadata, rotate independently in three dimensions, expose no zoom path, keep the complete assembly visible at every orientation, and contain only source-carried architrinos and their paths. Do not render Borg's dotted spherical-envelope or globe-dot overlay inside these selection spheres.
- **Evidence / blocker:** Depends on BORG-014 for durable model, occurrence, record, group-result, taxonomy, and facet identity; stable filter semantics; paginated queries; and complete source-declared preview geometry. A missing facet is visibly unavailable rather than false. A missing or incomplete representative remains an unavailable row; Borg may not infer identity or facets from pixels or invent coordinates to fill the canvas.
- **Completion:** Focused tests prove exact filter intersection and reset behavior, unavailable-versus-false handling, source-policy-versus-observed-speed separation without playback clamping, revision-specific facet filtering before grouping, deterministic order and pagination, total and facet counts, lazy preview loading, saved filter-state restoration, group descent, leaf resolution to exact identity, accessible machine hooks, no pixel-derived test identity, no zoom handlers or controls, rotation-invariant fixed framing, deterministic poster/reset orientation, source-only preview content, taxonomy-to-registry identity preservation, and fail-closed missing bounds. Browser QA at desktop and narrow widths performs the operator eye test across representative planar, spatial, breathing, non-breathing, nested, uncapped, capped-at-$c_f$, missing-speed-policy, multi-braid, boundary, visually similar/different-history, and same-shape/different-name entries: the grid matches canonical UI shell standards, the intended assembly can be reached without knowing its taxonomy name, each assembly remains fully visible through arbitrary rotations, wheel scrolling moves the grid rather than zooming a sphere, and no preview contains globe dots or any object other than architrinos and paths.

### BORG-016 — Polarity path color and half-turn fade

- **Status:** Queued
- **Source:** Operator direction on 2026-08-29.
- **Request / acceptance:** Repair Borg path styling so every path uses the exact standard color of its owning architrino—electrino blue `#0000ff`, positrino red `#ff0000`—and every rotating geometry trail fades from full intensity at the architrino to transparent at trailing phase $\pi$. Apply the rule across live rotational geometry, prescribed replay and chart pose, comparison views, taxonomy-preview spheres, exports, and every existing Borg geometry scene that uses the affected renderers. Preserve the no-future-path rule and keep optional diagnostics separate from the canonical base path.
- **Evidence / blocker:** Current Borg runtime styles use lighter `pathColor` values, prescribed paths use a shared purple constant, and current prescribed chart requirements record whole-period/light-purple trails. Rotating rows without a source-declared phase, period, axis, or equivalent parameterization cannot receive an app-inferred half-turn; they must expose the missing carrier.
- **Completion:** A renderer/scene inventory identifies every affected Borg path surface and records its disposition. Focused tests assert exact path-to-architrino color equality, full opacity at the current endpoint, monotonic linear fade, zero opacity and clipping at $\Delta\phi=\pi$, no future segments, correct wraparound, and fail-closed missing rotational carriers. Browser QA performs the operator eye test on representative live, prescribed, comparison, selection-canvas, and export scenes and finds no pastel, white, or purple base path and no visible rotational trail older than one half-turn.

### BORG-003 — Velocity-scale sampling evidence

- **Status:** Queued
- **Priority source:** [Ranked Next Objects item 6](priorities.md#ranked-next-objects)
- **Request / acceptance:** Produce measured velocity-scale-aware boundary-shell replay sampling evidence across the declared range using EOM-run rows, under the existing velocity-sampling protocol.
- **Evidence / blocker:** Depends on BORG-001 retained wake/history and residual rows. Affected boundary replay output remains display-only or fail-closed until measured evidence exists.
- **Completion:** Declared calibration and holdout evidence is produced with the protocol’s residual, tail-mass, correlation, seed-variance, patch-replay, and central-ball contribution checks.

### BORG-004 — Assembly Explorer disposition

- **Status:** Queued
- **Priority source:** [Ranked Next Objects item 7](priorities.md#ranked-next-objects)
- **Request / acceptance:** Decide whether the standalone Assembly Explorer can be retired or redirected after Borg replay reaches the declared parity for raw-record navigation, source ordering, optional source-carried $S_3$ grouping, and source-carried search diagnostics.
- **Evidence / blocker:** Depends on BORG-002.
- **Completion:** A documented disposition is accepted and any authorized retirement or redirect work is verified without losing the required replay capabilities.

### BORG-005 — Borg runtime decomposition

- **Status:** Queued
- **Source:** [Borg code review, A2](borg-code-review-2026-07-24.md)
- **Request / acceptance:** Decompose `BorgAppRuntime.js` into focused modules behind a behavior-preserving composition root. Preserve simulation/replay boundaries, authority labels, transport behavior, diagnostics, and current browser interaction.
- **Evidence / blocker:** `BorgAppRuntime.js` is 4,235 lines and rebuilds source/diagnostic rows after chunks. This is maintainability debt, not a measured performance or solver-correctness failure.
- **Completion:** The extraction preserves behavior, focused Borg tests and browser interaction pass, and any performance assertion is supported by a separate profile.

### BORG-006 — Prescribed translation and causal-history tubes

- **Status:** Queued
- **Source:** [Prescribed Translation and Causal-History Tubes](prescribed-translation.md)
- **Request / acceptance:** Add fixed/co-translating display transforms, finite path-history tubes, receiver selection, and source-matched prescribed-analysis overlays without app-local causal-root solving.
- **Evidence / blocker:** Borg must consume sealed prescribed records and canonical evaluator output; missing translation or analytical carriers remain unavailable.
- **Completion:** Switching display frames preserves record identity and analytical values, every overlay is provenance-bound, and no replay view implies evolution, stability, retention, or physical realization.

## Deferred / blocked

### BORG-007 — Taxonomy Morph Lab

- **Status:** Deferred / blocked
- **Request / acceptance:** Move one chart-owned coordinate at a time across Family A/B/C prescribed geometry.
- **Evidence / blocker:** Requires one selected bounded Borg teaching packet and source-carried coordinate availability.
- **Completion:** Unavailable coordinates remain disabled and no prescribed morph implies retention.

### BORG-008 — Braid Harmonics Studio

- **Status:** Deferred / blocked
- **Request / acceptance:** Teach declared frequency ratios and common-return periods as prescribed-period closure.
- **Evidence / blocker:** Requires source-carried cadence and return-period rows in a selected Borg packet.
- **Completion:** The surface makes no stability or resonance-selection claim.

### BORG-009 — Family-A Exclusion Geometry

- **Status:** Deferred / blocked
- **Request / acceptance:** Compare prescribed Family-A envelope overlap and flattening using sealed chart geometry.
- **Evidence / blocker:** Requires a bounded geometry-only packet.
- **Completion:** The display remains geometry-only and makes no exclusion, stability, or physical-realization inference beyond its declared predicate.

### BORG-010 — Gell-Mann Pattern Atlas

- **Status:** Deferred / blocked
- **Request / acceptance:** Teach octet/decuplet classification, pattern completion, and the boundary between observer-level classification and open assembly mechanism inside Borg's record-inspection surface.
- **Evidence / blocker:** Standard Model Closure retains scientific ownership; Borg needs a source-carried classification packet.
- **Completion:** Flavor classification remains distinct from color $SU(3)$ and unknown mechanism rows remain visible.

### BORG-011 — Polarity Ledger Builder

- **Status:** Deferred / blocked
- **Request / acceptance:** Display separate primitive-polarity, observer-charge, weak-exposure, hypercharge, and color-closure rows from a sealed source record.
- **Evidence / blocker:** Standard Model Closure owns the mappings; Borg may not manufacture them.
- **Completion:** Bookkeeping agreement never implies retention, confinement, or mass.

### BORG-012 — Conservation Flow Board

- **Status:** Deferred / blocked
- **Request / acceptance:** Visualize energy, momentum, angular momentum, and record-state routing with explicit source-carried residuals.
- **Evidence / blocker:** The owning theory lane must first supply compatible conserved-account rows.
- **Completion:** Every preset declares its input/output ledger and Borg performs no hidden reconstruction.

### BORG-013 — Material Surface Routing

- **Status:** Deferred / blocked
- **Request / acceptance:** Display coherent release, capture, scattering, heat, recoil, and retained excitation through active material components.
- **Evidence / blocker:** The material constitutive law remains unresolved; Borg can consume only an accepted producer record.
- **Completion:** The illustration preserves unresolved routes and does not imply a derived material response.

## Verified

No rows.

## Superseded / withdrawn

No rows.
