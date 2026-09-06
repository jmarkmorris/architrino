# Borg Work Queue

This is the canonical execution ledger for accepted Borg work. `priorities.md` owns strategic ranking and rationale; `brainstorming.md` holds uncommitted ideas. A task enters this file only when it has an explicit acceptance outcome and an execution owner can take it.

## Rules

1. Promote a brainstorm item here only when it becomes an accepted, testable task; remove the promoted task from `brainstorming.md` in the same edit.
2. Keep the strategic priority in `priorities.md`, but do not duplicate changing status or evidence there.
3. Use `Queued`, `In progress`, `Awaiting verification`, `Verified`, `Superseded`, or `Withdrawn` as the lifecycle states; keep intentionally parked rows under `Deferred / blocked`.
4. Move a task to `Verified` only after its stated validation and any required operator acceptance.

## Next real work

No active row. The remaining accepted Borg rows are intentionally parked under `Deferred / blocked`.

## Ranked Next Objects

1. `borg_taxonomy_morph_lab` — [BORG-007](#borg-007--taxonomy-morph-lab). Status: `Deferred / blocked`.
2. `borg_braid_harmonics_studio` — [BORG-008](#borg-008--braid-harmonics-studio). Status: `Deferred / blocked`.
3. `borg_orthogonal_axis_three_binary_exclusion_geometry` — [BORG-009](#borg-009--orthogonal-axis-three-binary-exclusion-geometry). Status: `Deferred / blocked`.
4. `borg_gell_mann_pattern_atlas` — [BORG-010](#borg-010--gell-mann-pattern-atlas). Status: `Deferred / blocked`.
5. `borg_polarity_ledger_builder` — [BORG-011](#borg-011--polarity-ledger-builder). Status: `Deferred / blocked`.
6. `borg_conservation_flow_board` — [BORG-012](#borg-012--conservation-flow-board). Status: `Deferred / blocked`.
7. `borg_material_surface_routing` — [BORG-013](#borg-013--material-surface-routing). Status: `Deferred / blocked`.

## Awaiting verification

No rows.

## In progress

No rows.

## Queued

### BORG-001 — Native wake history and boundary residuals

- **Status:** Verified — complete V11 retained-wake, shell-crossing, patch/time coverage, influence, replay-source, and paired residual contract accepted on 2026-09-01.
- **Priority source:** [Ranked Next Objects](priorities.md#ranked-next-objects)
- **Request / acceptance:** Extend the EOM contracts and native implementation so Borg receives retained wake/interaction rows, row-conservation counts, boundary-to-central residual rows, and required acceleration-contribution diagnostics. The app must consume these as EOM-owned data; no app-local physics or visual tuning may replace missing rows.
- **Implemented:** `EOM_BORG_NATIVE_V11` preserves the 60-field evolution request and adds typed shell-envelope, oriented equal-area partition, time-bin, replay-source, residual-specification, and paired interval-sample records before `END`. The EOM process extracts and brackets retained cubic-history crossings, certifies inbound or outbound direction from the interval normal projection, accounts for every patch/time cell as accepted or certified empty, binds path-derived influence rows to accepted acceleration contributions, preserves replay-source identity, and computes all three declared relative weighted-$L^2$ residual intervals. Borg validates the same request and response identities without recalculating dynamics.
- **Verification:** The exact two-path native fixture certifies one outbound crossing, eight complete patch/time coverage cells, one path-derived influence row, one replay-source row, and passing `shell_self_similarity`, `shell_replay_residual`, and `boundary_to_central_residual` decisions. The full EOM process suite passes 27/27; focused EOM/Borg/transport tests pass 44/44; CTest protocol and independent acceleration fixtures pass 2/2; `git diff --check` passes. The larger Borg migration suite passes 87/88, with its sole failure caused by an unrelated live Braid Program bootstrap-dependency addition.
- **Evidence boundary:** Verification establishes software transport, native extraction, complete accounting, interval comparison, and fail-closed validation. The fixture values are engineering inputs, not evidence that a production replay policy is physically adequate. The completed velocity-scale campaign measured the first candidate policy as precision-insufficient, so missing or non-passing production inputs remain fail-closed.
- **Completion:** Contract, native implementation, bridge schema, focused validation fixtures, and Borg consumer coverage pass; any learner/operator surface requiring these values is verified against current EOM output.

### BORG-014 — Assembly registry, durable identity, and taxonomy browser

- **Status:** Verified — indexed registry, identity/taxonomy contracts, complete seed migration, independent verification, visual coverage, and million-entry measurement accepted on 2026-09-01.
- **Implemented:** The canonical `borg-assembly-registry.v1` binds all 145 exact models and sealed records to 46 permanent opaque `braidId` values, explicit unavailable occurrence and future-causal-state dispositions, a versioned taxonomy-relation graph, the v13 facet contract, content-addressed source/record locations, deterministic poster/inspection/animation coverage, and zero missing or substituted rows. The Library service builds the validated manifest into the indexed `borg-assembly-registry-sqlite.v1` control plane and searches exact identities, full or collision-checked hash prefixes, source identities, descriptive text, taxonomy relations, and facets before cursor pagination. The exact inspector exposes braid, model, occurrence, record, taxonomy, source, and coverage identity; multi-braid records expose source-member component isolation.
- **Verification:** The separately authored Python verifier independently reconstructed canonical scientific bytes from every v3 source specification and checked all 145 model identities and sealed record hashes without importing the production canonicalizer, field list, operators, emitter, expected hashes, or registry output as an oracle. The deterministic one-million-entry benchmark imported 1,000,000 exact models and 4,000,000 facet rows into a 7,432,015,872-byte SQLite database in 264,139 ms on the recorded arm64 environment; integrity passed. Median exact-id, full-hash, text-search, cursor-page, facet-count, and collision-checked prefix lookup times were 0.018 ms, 0.008 ms, 0.032 ms, 0.015 ms, 23.059 ms, and 78.955 ms. These are engineering measurements, not scientific evidence. [Benchmark receipt](evidence/assembly-registry-million-entry-benchmark.2026-09-01.json).
- **Flat exact catalog:** The [accepted repository decision](../../architectural-decisions/flat-assembly-catalog.md) defines a parent-free catalog and property-based discovery. The current seed catalog contains 145 exact peer configurations, each bound by `assemblyId + modelRevisionSha256`; exact display bytes add `recordSha256`. The current [identity-relation contract](contracts/assembly-identity-relation-contract.md) organizes those exact configurations into 46 unique Borg braid entries: 45 singleton entries and one source-declared equal-radius planar three-binary balance entry containing 100 exact configurations.
- **Current geometry coverage:** Twelve alternating circular rings, one hundred equal-radius planar three-binary balance records, two co-spherical two-planar-braid displays, five generic rotating Platonic vertex sets, the exact antipodal-alternating sum-edge octahedral obstruction display, and the remaining frozen prescribed configurations are all emitted from exact v3 source specifications. [Source choices and explicit non-instantiated reasons](../braid-program/configurations/configuration-display-catalog.md).
- **Facts-first facets:** [The assignment audit](evidence/selector-assignment-audit.md) defines source-derived Circle occupancy, component-braid dimensionality, assembly span, radii, breathing, braid count, speed policy, and shape boundaries. Missing or unsupported values remain `Not assigned`. Circle occupancy permits several distinct circles and several radii.
- **Current-only navigation:** The workbench and Library open exact configurations by the identity pair, with an optional display-record hash. Unsupported query keys and translated saved filters are rejected.
- **Composition boundary:** Braid count and dimensionality use complete, disjoint source-declared component memberships. Neither member count nor visual grouping assigns a braid. Coaxial assemblies made from two planar component braids report braid dimensionality `2D` and assembly span `3D` when their planes are separated.
- **Evidence boundary:** Catalog, descriptor, renderer, and geometry tests establish source conformance and display behavior only. They do not establish acceleration balance, release, retention, stability, binding, or physical identity.
- **Scientific-coverage boundary:** `braid-candidate-adjudication-projection.2026-09-01.v1` links 138 current exact configurations across 39 braid entries to active exact adjudications or explicitly broader finding contexts. Each exact configuration contributes at most one to its braid's displayed finding-bearing configuration count, even when several relations match. The generic rotating octahedron has a slice-only pointer to the separately registered sum-edge obstruction and remains `No adjudication linked`. `No active findings indexed yet` and `No adjudication linked` are projection-coverage states, not scientific negatives. The projection performs no app-local physics and does not strengthen any source claim grade.
- **Prompt:**

  Closure goal: Establish a scalable, migration-safe assembly identity and taxonomy foundation that can distinguish models, evolved occurrences, records, causal states, morphology, lineage, and mutable classifications across a catalog expected to grow from the current seed set to tens of thousands or millions of assemblies; then make every registered concrete assembly and every admitted taxonomy member discoverable, visually inspectable, and honestly animated in Borg.

  Replace the braid-only navigation assumption with a versioned assembly registry that can represent planar braids, spatial or three-dimensional braids, assemblies containing multiple top-level braids, and other registered assemblies. Preserve the taxonomy distinction between one top-level braid with component-braid rows and an assembly made from multiple separate top-level braid records. Classify dimensionality and composition from source-declared coordinates and inventory, never from visual appearance alone.

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
  3. a full `modelRevisionSha256` computed from one canonical, versioned, identity-bearing assembly specification that includes inventory, persistent source order, component relations, coordinates, motion prescription, applicable speed policy and source-law version, units, and generator inputs while excluding mutable display names, descriptions, and evidence status;
  4. versioned taxonomy-node and membership identities that remain separate from both model and occurrence identity; and
  5. a `recordSha256` for each sealed visual or evolved record, because byte identity of a produced record is different from semantic identity of its assembly model or evolved occurrence.

  Represent classifications as versioned, independently assigned relations. Do not require a parent tree for assembly identity, registration, or navigation. Taxonomy nodes receive stable, non-reused opaque identities separate from their primary names; labels, cross-memberships, merges, and supersessions remain revisable. A source-declared reference representative may anchor a name, but it does not define the whole category or become the identity of every member. Separate the category concept from the evidence used to delimit or assign its members.

  URLs, caches, selection state, comparison packets, exports, and cross-record references must use stable opaque identity plus the exact applicable revision hash rather than a mutable display label. Search accepts the current descriptive name, permanent assembly identity, source identity, and hashes. Expose a short, collision-checked prefix of the model hash in selected-result details and the inspection viewport, with a one-action copy control for the full model identity, occurrence identity when present, full model hash, record hash, taxonomy revision, source specification, and sealed-record URL. Do not require hashes on every unselected preview card. The full hash remains authoritative; a short prefix is display shorthand only.

  Plainly: a human may rename a configuration, split or merge a category, or move an assembly to a better classification without changing which model, occurrence, or record a saved link means. A coordinate or motion change creates a new model-revision hash, while a recalculated record creates a new record hash. The screen always lets collaborators state exactly which object, occurrence, taxonomy revision, model revision, and record they are discussing.

  Build the registry for the expected scale rather than as an eagerly loaded JavaScript array or one monolithic browser bundle. Use canonical content-addressed model and record objects behind an indexed relational control plane and a storage-neutral, cursor-paginated query contract. The reference implementation must index exact opaque ids, full hashes, collision-checked hash-prefix ranges, taxonomy memberships, orthogonal facets, provenance, and descriptive text; load thumbnails, geometry, and sealed records lazily. Measure a deterministic synthetic one-million-entry engineering corpus for import time, database size, exact-id lookup, full- and prefix-hash lookup, facet filtering, text search, and cursor-page latency. This benchmark establishes software scalability only and supplies no scientific evidence about the synthetic assemblies.

  Use the flat `Starting geometry` list for direct workbench selection and the visual-first, faceted **Assembly Library** for discovery at scale. Neither surface requires hierarchical navigation. Independently rotatable assembly-preview spheres are the primary discovery surface for humans. Descriptive names, exact identities, and hashes remain searchable and accessible but are secondary in the ordinary browse flow and may stay collapsed until a result is selected or copied. Provide orthogonal browse and filter facets at minimum for:

  - exact architrino count;
  - braids in the assembly, initially offering 1, 2, and 3, based on complete source-declared component membership rather than division of architrino count;
  - breathing, non-breathing, and unavailable motion classification;
  - assembly-centered Iso-radii, Hetero-radii, and unavailable radius classification;
  - Circle occupancy as `One per circle`, `Multiple per circle`, or `Both occupancy types`, with noncircular and unresolved sources unassigned;
  - declared speed policy: uncapped, capped at $c_f$, or unavailable;
  - planar, spatial (3D), mixed, and degenerate/boundary geometry;
  - one or more nonexclusive visual-form descriptors, initially including `circular paths`, `multiple circular path groups`, `spherical distribution`, and `spindle-like envelope` once their meanings are frozen;
  - one top-level braid, multiple top-level braids, and registered assemblies with other compositions;
  - prescribed chart, evolved record, translating, rotating, breathing, and static motion where the source declares that classification;
  - component braid count and component identities;
  - claim grade, evidence status, and visual-record availability.

  Every facet value must be source-carried, explicitly assigned in a versioned source classification, or produced by a versioned deterministic descriptor from source-declared inventory and geometry, with its owner/version and inspectable reason retained. The preview's circular clipping frame is never evidence that an assembly is circular or spherical. Visual-form descriptors may overlap. A missing value is `unavailable`, not `false`, and Borg must not infer breathing, assembly radii, circle occupancy, braid dimensionality, assembly span, or shape from a rendered image.

  Speed policy is an explicit source-model or run-policy declaration, not a threshold test on the current frame or recorded maximum speed. Retain the policy owner/version, applicable speed quantity and frame, and unit convention; distinguish constituent speed from assembly translation. Use $c_f=1$ in new numerical fixtures and recalculations without relabeling legacy records. Missing policy metadata remains unavailable. A changed speed law or imposed cap is identity-bearing model/run configuration, not a display preference; selecting this filter does not modify a model, clamp playback, authorize new EOM behavior, or establish that the declared cap was independently verified.

  Plainly: an uncapped model can happen to move below $c_f$. The selector tells us whether a cap was part of the declared model or run, not how fast one displayed frame happens to be moving.

  Default to one result sphere per registered model representative and show compact counts for attached model revisions, evolved occurrences, and sealed records. Evaluate revision- or record-specific facets at that exact level before grouping so a representative never hides a matching variant or misclassifies a nonmatching one. Open those lower layers only after selection. A broad query may return explicitly marked group spheres with member counts; selecting a group applies its represented facet or descends to a narrower result set, while a leaf sphere opens one exact registered model or record. A group sphere has its own result identity; a displayed representative remains identified as an example and does not establish the geometry, evidence status, or scientific standing of every group member.

  Return the total matching count and available facet counts before loading preview geometry. Use deterministic ordering, cursor pagination or virtualization, and lazy preview loading so tens of thousands or millions of matches never become millions of live spheres. Preserve the exact filter state in saved and shareable selection URLs. Each interactive result must expose through accessible DOM or an equivalent stable test contract its result kind, stable id, exact target id and revision when it is a leaf, facet values, member count, selected state, and unavailable reason. Human users may recognize geometry visually; automated and AI tests must never be required to infer identity or filter truth from pixels.

  Search must accept descriptive text, permanent assembly id, full or unambiguous short model-hash prefix, record hash, and source id. The selected view must expose a readable taxonomy breadcrumb, component inventory, source-defined geometry description, and the exact identity block. An ambiguous short hash must fail closed and ask for a longer identifier.

  Plainly: “planar versus 3D” and “one braid versus several braids” are independent questions, so the menu must not force them into one fragile family-name tree. A descriptive card explains what a viewer will see; the taxonomy badges and hashes say how the corpus and exact record identify it.

  Establish a coverage contract for visual collaboration. Every registered concrete assembly must have a deterministic poster view, a loadable 3D inspection scene, a declared default camera and scale, polarity and constituent visibility, component-braid isolation controls where applicable, and at least one clearly labeled animation mode. For a moving prescribed record, animate only its source-carried worldlines. For an evolved record, animate only accepted recorded history. For a truly static or degenerate record, provide a camera turntable or component-reveal animation explicitly labeled as camera or presentation motion; never invent assembly motion to satisfy the animation requirement. Preserve controls for play, pause, scrub, trail depth, axes, centers, binary pairing, top-level braid grouping, and component isolation whenever the record carries the required data.

  Inventory the live Braid Taxonomy, configuration chart, circular-path assembly registry, existing Borg catalog, and other accepted assembly registries. The authoritative Borg registry must distinguish a taxonomy member from a concrete representative and from a parameter or history revision. Every admitted taxonomy member must have at least one source-declared representative before this object can be verified; every separately registered concrete assembly must have its own registry entry rather than borrowing the identity of a visually similar record. Missing scientific coordinates remain a source-owner blocker and must appear as an explicit unavailable coverage row; Borg must not manufacture geometry or dynamics to fill it.

  Perform an explicit one-time migration rather than preserving an obsolete taxonomy or record representation as a parallel canonical path. Current ids, URLs, saved links, and visible labels resolve only through the current identity contract; hash-pinned links must never be silently retargeted. When recalculation is required, create a new canonical record with a new hash and an independent verification receipt. Prove that changing a mutable display name or taxonomy assignment leaves model and occurrence identity unchanged; prove separately that changing an identity-bearing coordinate, component relation, persistent source order, motion prescription, or future-consumed state changes the applicable revision identity.

  Freeze the normative schema, identity-bearing field list, symmetry and persistent-order rules, and owner formulas before migration comparison. Build a separately authored recalculation and verification program, preferably in Python through the shared project environment, that independently reconstructs inventory, component relations, coordinates, positions, velocities, motion, units, canonical bytes, and expected hashes from the normative sources. It must not import the production canonicalizer, migration field list, worldline operator, record emitter, expected hashes, or production output as its oracle. Agreement between the production migration and this verifier tests the two implementations; any mathematical rule changed on both sides still requires a separately stated and checked rule.

  Optionally admit a construction-complexity descriptor inspired by Assembly Theory only after freezing its building-block alphabet $B$, allowed join operations $J$, algorithm/version, and whether the result is exact or bounded:

  $$
  a_{B,J}(x)=\min_{p\in\mathcal P_{B,J}(x)}|p|.
  $$

  Plainly: this number describes the shortest construction allowed by declared rules. It is not the actual formation lineage, does not decide whether two occurrences are the same, and establishes no evolution, selection, retention, stability, binding, or physical acceptance. Any copy count likewise depends on an explicitly named equivalence relation. Treat the biological-taxonomy and Assembly Theory comparisons as design heuristics only; do not import biological ranks or contested selection claims into $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology. Comparison sources: [ICZN nomenclature](https://code.iczn.org/introduction/), [NCBI Taxonomy data model](https://www.ncbi.nlm.nih.gov/books/NBK53758/?report=reader), [species conceptualization and delimitation](https://repository.si.edu/items/f603d210-0638-4c36-bc49-3399b8df6f0d), [Assembly Theory](https://www.nature.com/articles/s41586-023-06600-9), [molecular assembly index](https://www.nature.com/articles/s41467-021-23258-x), and [critical assessment](https://www.nature.com/articles/s41540-024-00403-y).

  Keep Borg's authority boundary intact. A poster, animation, taxonomy placement, similarity grouping, or hash match is display and identity infrastructure; none establishes acceleration balance, evolution, retention, stability, binding, physical identity, or scientific acceptance. Borg consumes source-defined specifications and sealed records and performs no app-local causal-root solving or forward physics.

- **Evidence / blocker:** The [seed assembly-identity relation contract](contracts/assembly-identity-relation-contract.md) now fixes the 45-braid/144-configuration relation, typed exact configuration and sealed-record identity, and a source-owned active-finding configuration count with examples and counterexamples. It does not yet supply permanent opaque braid identity, occurrence/lineage identity and lifecycle, future-sufficient causal-state equality, morphology metrics, taxonomy relation identities, or the indexed million-entry implementation. `BorgAssemblyRecordCatalog.js` remains an eager seed array rather than the required storage and query architecture, some source specifications still lack proposed identity-bearing fields or facets, and some admitted or studied assemblies still lack a sealed record or source-owner-approved representative.
- **Completion:** The identity-relation contract fixes what `assemblyId` denotes, ratifies the separate occurrence/lineage identity and lifecycle rules, defines model, causal-state, morphology, record, and taxonomy equality without substitution, and provides worked examples and counterexamples. A versioned indexed assembly-registry schema, canonical model-hash procedure, taxonomy-relation graph, versioned facet-descriptor contract, storage-neutral paginated query contract, and machine-readable coverage report are accepted. A separately authored verifier independently recalculates and checks the migrated seed corpus, and the deterministic one-million-entry benchmark reports the declared import, storage, lookup, filter, search, and pagination measurements. Focused tests cover typed sameness relations, identity stability, hash sensitivity, taxonomy rename/split/merge, model-versus-occurrence separation, recalculation provenance, short-hash ambiguity, component inventory, persistent source order, reproducible facet assignment, unavailable-versus-false semantics, group-versus-leaf identity, saved filter state, registry completeness, current deep links, cursor pagination, accessible machine hooks, and no-physics boundaries. The visual-first Assembly Library works at desktop and narrow widths; every admitted taxonomy member has at least one source-declared visual representative; every registered concrete assembly has a deterministic poster, a loadable inspection view, and an honest prescribed, evolved, or presentation-only animation. Browser QA verifies visual faceted discovery, taxonomy browsing, search by every current identity form, model/occurrence/record identity copying, representative planar and spatial single-braid entries, representative multi-braid entries, visually similar models with different histories, differently named models with the same coarse shape, component isolation, playback/scrubbing, static turntable labeling, and zero missing or silently substituted registry rows.

### BORG-015 — Taxonomy selection canvas

- **Status:** Verified — current facts-first selector contract, responsive visual canvas, exact group/leaf navigation, accessible rotation, and fail-closed unavailable states accepted on 2026-09-01.
- **Source:** Operator direction on 2026-08-29 and visual-first discovery decision on 2026-08-30.
- **Implemented surface:** [Assembly Library](../../../borg-library.html) implements nine factual selectors, alternative facet counts, query URLs, group descent, lazy 12-result pages, independent pointer/keyboard rotation, fixed framing, playback/scrubbing, exact-record inspection, source-member component isolation, and accessible registry/facet/scientific-coverage hooks. The default surface lists 46 unique Borg braid entries over 145 exact configurations. The unified Braid-owned projection links 138 current exact configurations across 39 braid entries and reports separate member-derived coverage without treating an unindexed relation as a scientific negative. Source-formula radius comparisons classify 26 braid entries as Iso-radii and 20 as Hetero-radii. Source membership supplies 20 one-braid and eight two-braid entries, with 18 unassigned; three is offered with zero matches. The separately versioned Platonic-relationship selector has six exact source assignments and 139 fail-closed unassigned models. The later accepted facts-first decision retired the redundant Shape selector instead of requiring general spindle or spherical visual-form browse labels; source metadata remains unchanged. All current speed policies remain unavailable and their explicit filter choices return zero matches rather than inferring policy from observed speed. [Identity and scientific-coverage contract](contracts/assembly-identity-relation-contract.md); [radius contract](contracts/requirements-and-design.md#catalog-composition-classifications); [BORG-018 verification](work-log.md#2026-09-01---borg-018-identity-bound-scientific-status-inspector).
- **Request / acceptance:** Implement the visual-first faceted Borg selection canvas specified in [requirements-and-design.md](contracts/requirements-and-design.md#taxonomy-selection-canvas), using the BORG-014 registry, facet descriptors, identity layers, and paginated query contract. The primary workflow is filter, visually inspect independently rotatable assembly-preview spheres, narrow through explicitly marked group spheres when necessary, and select a leaf sphere that resolves to one exact model or record. Descriptive labels and exact identities remain searchable secondary metadata. The current filter rail includes architrino count, braid count, breathing state, assembly-centered radius equality, circle occupancy, declared speed policy, separate braid dimensionality and assembly span, and the separately accepted Platonic relationship. Internal missing values remain distinct from `false` and visible as `Not assigned` in record details. Render only a deterministic paginated or virtualized working set in a responsive standard grid and load preview geometry lazily. Each sphere must expose accessible machine-readable result metadata, rotate independently in three dimensions, expose no zoom path, keep the complete assembly visible at every orientation, and contain only source-carried architrinos and their paths. Do not render Borg's dotted spherical-envelope or globe-dot overlay inside these selection spheres.
- **Verification:** Thirty-one focused registry, query, facet, variant, radius, occupancy, and preview tests pass. Live browser QA at desktop and 390-by-844 widths verified spatial two-braid heterogeneous multiple-occupancy intersection, a spatial breather, planar results, deterministic saved query URLs, the zero-result capped-speed disposition, keyboard rotation, wheel scrolling with unchanged preview dimensions, exact 100-configuration variant descent, 390-pixel document width, bounded card geometry, and empty warning/error logs. Current zero-count facet values are checked as honest empty results; they are not populated with inferred examples.
- **Completion:** Exact filter intersection and reset behavior, unavailable-versus-false handling, source-policy-versus-observed-speed separation without playback clamping, revision-specific facet filtering before grouping, deterministic order and pagination, total and facet counts, lazy preview loading, saved filter-state restoration, group descent, leaf resolution to exact identity, accessible machine hooks, no pixel-derived test identity, no zoom handlers or controls, rotation-invariant fixed framing, deterministic poster/reset orientation, source-only preview content, taxonomy-to-registry identity preservation, and fail-closed missing bounds are verified. The grid matches canonical UI shell standards, the intended available assembly can be reached without knowing its taxonomy name, each assembly remains fully visible through rotation, wheel input scrolls the grid rather than zooming a sphere, and no preview contains globe dots or anything beyond source-carried architrinos and paths.

### BORG-016 — Polarity path color and half-turn fade

- **Status:** Verified — all currently applicable catalog, workbench, Library, live-history, missing-carrier, and current-scene export paths accepted on 2026-09-01.
- **Source:** Operator direction on 2026-08-29, clarified 2026-08-30: two-occupant antipodal circles have one red and one blue half; one-occupant circles have their full owner's color.
- **Request / acceptance:** Every base path uses exact electrino blue `#0000ff` or positrino red `#ff0000`. Two-occupant antipodal opposite-polarity circles get a trailing half-turn per owner, with the accepted fade; single-occupant circles get a solid full preceding turn or declared reconstruction cycle. Apply consistently across workbench, chart pose, library, inspection, and export. Never infer circle occupancy solely from binary membership, use an alternate palette, or manufacture missing past motion.
- **Implemented:** One [source-based trail policy](../../../src/apps/borg/BorgOrbitTrails.mjs) serves the library and prescribed scene. All 145 exact catalog records, exposed through 46 default braid entries, have tested dispositions, including preceding phase-gap arcs for co-rotating multiply occupied circles with three or more occupants. Live retained/compacted paths now match endpoint colors; prescribed palettes and unowned chart-orbit overlays are removed. Exact pin selection and recorded motion remain unchanged. [Renderer inventory and verification](work-log.md#2026-08-30---polarity-owned-circle-trails).
- **Verification:** At the original BORG-016 acceptance, the 47-test focused trail, Library preview, replay, prescribed-translation, prescribed-analysis, and runtime-contract batch passed in full across the then-current 144 catalog dispositions. It covered exact endpoint colors, antipodal half-turns, one-occupant full turns, multi-occupant preceding-member arcs, fractional clipping, rewind, no future wrap, and unknown-polarity rejection. Browser QA confirmed exact red/blue half-turns in the Library and workbench, exercised the current-scene `Export image` action, and found no warning/error logs. EOM rows without source-carried rotational phase/ownership retain their ordinary past-history window without an orbital claim; comparison remains source-contract blocked and has no independent path renderer. A later source-carried live or comparison rotational carrier must satisfy this same policy before that new carrier is accepted.
- **Completion:** Exact colors, two-occupant half-turn fade, one-occupant full-turn/cycle visibility, clipping at fractional time boundaries, rewind, no future wrap, missing-carrier behavior, and applicable live/comparison/export scenes are checked at their actual source authority.

### BORG-017 — Platonic-relationship classification and facet

- **Status:** Verified — source contract, v13 descriptor, exact filter/detail paths, generated registry snapshot, independent verification, focused tests, and browser QA accepted on 2026-09-01.
- **Source:** Operator direction to mark Borg braid types and assemblies that have a source-established relationship to a Platonic solid.
- **Closure goal:** Add a versioned, nonexclusive Platonic-relationship classification that supports discovery without turning visual resemblance, member count, or a display record into braid or physics authority.
- **Classification contract:** Freeze controlled source-backed values that can distinguish at minimum `Exact Platonic vertex set`, `Platonic component`, `Platonic compound`, and `Platonic-cell complex`; retain `Not assigned` when no source-owned relation exists. Record the named solid or solids, source owner, assignment version, exact target identity and revision, and an inspectable reason. A braid-type tag is present only when [BP-016](../braid-program/work-queue.md#bp-016--platonic-braid-qualification-and-prescribed-history-program) has separately qualified the source object as a braid; otherwise Borg may show the geometric relationship on a registered assembly without calling it a braid.
- **False-positive controls:** Do not assign the facet from architrino count, co-sphericity, equal radius, a spherical distribution descriptor, a rendered silhouette, the preview frame, or a lattice motif that merely resembles a solid. Distinguish the stella octangula from one tetrahedron, a tetrahedral-octahedral cell complex from one privately owned packed assembly, and a Platonic vertex set from its unrelated path-history or stability status.
- **App acceptance:** Expose the relationship as an optional filter and selected-record detail in both the workbench and Assembly Library, preserve multi-value assignments, saved query state, accessible machine-readable hooks, exact revision-level filtering before grouping, and explicit unavailable reasons. The five generic rotating Platonic displays and the exact antipodal-alternating sum-edge octahedral obstruction display receive assignments only from their exact source specifications; all other current records remain unassigned unless the Braid Program supplies evidence.
- **Evidence boundary:** The facet describes a declared geometry or component relation. It establishes no acceleration balance, braid qualification, EOM evolution, retention, stability, binding, particle identity, or physical realization. Borg consumes the classification and never solves or reconstructs it locally.
- **Implemented:** The Braid-owned `borg-platonic-relationship-assignments.v1` projection pins six exact model revisions to `exact-vertex-set`, names the solid, source specification, owner, reason, assignment revision, and absent braid qualification, and defines one fail-closed unassigned disposition for every other exact model. The `borg-record-facets.v13` descriptor preserves controlled multi-value relationship and solid arrays. One shared renderer supplies accessible selected-record detail in the workbench and Assembly Library; indexed filtering occurs at exact model revision before braid-entry grouping.
- **Verification:** The authorized generator writes the v13 facet into the current 145-model, 46-braid registry, and its freshness check passes. The focused 41-test registry, Library, home/workbench, scene, scientific-status, and Platonic batch passes. The independently authored Platonic verifier reads the registry and source specifications without importing the production classifier and reports six exact source assignments plus 139 fail-closed unassigned rows; the independent registry-migration verifier separately reports 145 exact models, 46 braid entries, and 145 sealed records with a passing identity-and-byte reconstruction. Browser QA returns exactly six exact-vertex-set records, exposes the exact sum-edge record's octahedral assignment and absent braid qualification in both inspection surfaces, leaves the generic rotating octahedron `No adjudication linked` while showing its slice-only context, and reports no browser warning/error logs.
- **Completion:** A versioned descriptor and independently authored assignment verifier cover every current registry row, focused tests pass positive and adversarial near-match cases, workbench and Library filtering agree at exact identity/revision scope, and source-unavailable rows fail closed without borrowed classifications.

Plainly: Borg may say that a record uses the vertices of an octahedron, but it may call that record an octahedral braid only after the Braid Program has supplied the missing braid history and qualification.

## Deferred / blocked

### BORG-007 — Taxonomy Morph Lab

- **Status:** Deferred / blocked
- **Request / acceptance:** Move one chart-owned coordinate at a time across orthogonal-axis three-binary configurations/B/C prescribed geometry.
- **Evidence / blocker:** Requires one selected bounded Borg teaching packet and source-carried coordinate availability.
- **Completion:** Unavailable coordinates remain disabled and no prescribed morph implies retention.

### BORG-008 — Braid Harmonics Studio

- **Status:** Deferred / blocked
- **Request / acceptance:** Teach declared frequency ratios and common-return periods as prescribed-period closure.
- **Evidence / blocker:** Requires source-carried cadence and return-period rows in a selected Borg packet.
- **Completion:** The surface makes no stability or resonance-selection claim.

### BORG-009 — orthogonal-axis three-binary Exclusion Geometry

- **Status:** Deferred / blocked
- **Request / acceptance:** Compare prescribed orthogonal-axis three-binary envelope overlap and flattening using sealed chart geometry.
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

[BORG-014](#borg-014--assembly-registry-durable-identity-and-taxonomy-browser), [BORG-015](#borg-015--taxonomy-selection-canvas), [BORG-016](#borg-016--polarity-path-color-and-half-turn-fade), and [BORG-017](#borg-017--platonic-relationship-classification-and-facet).

## Superseded / withdrawn

No rows.
