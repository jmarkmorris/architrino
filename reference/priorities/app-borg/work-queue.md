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
3. `assembly_registry_identity_and_taxonomy_browser` — [BORG-014](#borg-014--assembly-registry-durable-identity-and-taxonomy-browser). Status: `Queued`.
4. `velocity_scale_sampling_evidence` — [BORG-003](#borg-003--velocity-scale-sampling-evidence). Status: `Queued`.
5. `assembly_explorer_disposition` — [BORG-004](#borg-004--assembly-explorer-disposition). Status: `Queued`.
6. `borg_runtime_decomposition` — [BORG-005](#borg-005--borg-runtime-decomposition). Status: `Queued`.
7. `borg_prescribed_translation_tubes` — [BORG-006](#borg-006--prescribed-translation-and-causal-history-tubes). Status: `Queued`.
8. `borg_taxonomy_morph_lab` — [BORG-007](#borg-007--taxonomy-morph-lab). Status: `Deferred / blocked`.
9. `borg_braid_harmonics_studio` — [BORG-008](#borg-008--braid-harmonics-studio). Status: `Deferred / blocked`.
10. `borg_family_a_exclusion_geometry` — [BORG-009](#borg-009--family-a-exclusion-geometry). Status: `Deferred / blocked`.
11. `borg_gell_mann_pattern_atlas` — [BORG-010](#borg-010--gell-mann-pattern-atlas). Status: `Deferred / blocked`.
12. `borg_polarity_ledger_builder` — [BORG-011](#borg-011--polarity-ledger-builder). Status: `Deferred / blocked`.
13. `borg_conservation_flow_board` — [BORG-012](#borg-012--conservation-flow-board). Status: `Deferred / blocked`.
14. `borg_material_surface_routing` — [BORG-013](#borg-013--material-surface-routing). Status: `Deferred / blocked`.

## Awaiting verification

No rows.

## In progress

No rows.

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

- **Status:** Queued
- **Source:** Operator direction on 2026-08-29.
- **Prompt:**

  Closure goal: Make every registered concrete assembly and every admitted assembly-taxonomy member discoverable, identifiable, visually inspectable, and appropriately animated in Borg without making a mutable family label such as `B1.3` the identity of the underlying model.

  Replace the braid-only navigation assumption with a versioned assembly registry that can represent planar braids, spatial or three-dimensional braids, assemblies containing multiple top-level braids, and registered assemblies that do not belong to a named braid family. Preserve the taxonomy distinction between one top-level braid with component-braid rows, such as applicable Family-C records, and an assembly made from multiple separate top-level braid records. Classify dimensionality and composition from source-declared coordinates and inventory, never from visual appearance alone.

  Give every registry entry three separate identity layers:

  1. a permanent opaque `assemblyId` with no family, geometry, evidence, or version meaning;
  2. a full `modelRevisionSha256` computed from one canonical, versioned, identity-bearing assembly specification that includes inventory, persistent source order, component relations, coordinates, motion prescription, units, and generator inputs while excluding mutable display names, taxonomy aliases, descriptions, and evidence status; and
  3. a `recordSha256` for each sealed visual or evolved record, because byte identity of a produced record is different from semantic identity of its assembly model.

  Treat existing identifiers such as `A1.2`, `B1.3`, catalog ids, source ids, and friendly names as searchable aliases with declared provenance. Do not rename or remove any existing label in this task. New URLs, caches, selection state, comparison packets, exports, and cross-record references must use `assemblyId` plus the exact model-revision hash rather than a mutable alias. Display a short, collision-checked prefix of the model hash on each assembly card and in the viewport, with a one-action copy control for the full assembly id, full model hash, record hash, source specification, and sealed-record URL. The full hash remains authoritative; a short prefix is display shorthand only.

  Plainly: a human may rename “B1.3” or move it to a better taxonomy category without changing which mathematical assembly a saved link means. A coordinate or motion change creates a new model-revision hash, while a regenerated record creates a new record hash. The screen always lets collaborators state exactly which object and which revision they are discussing.

  Build a taxonomy-oriented **Assembly Library** rather than another flat `Starting geometry` list. Use descriptive names and thumbnail previews as the primary visible labels; show family/member codes as secondary alias badges. Provide orthogonal browse and filter facets at minimum for:

  - planar, spatial (3D), mixed, and degenerate/boundary geometry;
  - one top-level braid, multiple top-level braids, and registered non-family assembly;
  - prescribed chart, evolved record, translating, rotating, breathing, and static motion where the source declares that classification;
  - component braid count and component identities;
  - taxonomy family/member/variant aliases;
  - claim grade, evidence status, and visual-record availability.

  Search must accept descriptive text, permanent assembly id, full or unambiguous short model-hash prefix, record hash, source id, legacy catalog id, and taxonomy alias. The selected view must expose a readable taxonomy breadcrumb, component inventory, source-defined geometry description, every known alias, and the exact identity block. An alias collision or ambiguous short hash must fail closed and ask for a longer identifier.

  Plainly: “planar versus 3D” and “one braid versus several braids” are independent questions, so the menu must not force them into one fragile family-name tree. A descriptive card explains what a viewer will see; the taxonomy badges and hashes say how the corpus and exact record identify it.

  Establish a coverage contract for visual collaboration. Every registered concrete assembly must have a deterministic poster view, a loadable 3D inspection scene, a declared default camera and scale, polarity and constituent visibility, component-braid isolation controls where applicable, and at least one clearly labeled animation mode. For a moving prescribed record, animate only its source-carried worldlines. For an evolved record, animate only accepted recorded history. For a truly static or degenerate record, provide a camera turntable or component-reveal animation explicitly labeled as camera or presentation motion; never invent assembly motion to satisfy the animation requirement. Preserve controls for play, pause, scrub, trail depth, axes, centers, binary pairing, top-level braid grouping, and component isolation whenever the record carries the required data.

  Inventory the live Braid Taxonomy, configuration chart, shared-circle assembly registry, existing Borg catalog, and other accepted assembly registries. The authoritative Borg registry must distinguish a taxonomy member from a concrete representative and from a parameter or history revision. Every admitted taxonomy member must have at least one source-declared representative before this object can be verified; every separately registered concrete assembly must have its own registry entry rather than borrowing the identity of a visually similar family member. Missing scientific coordinates remain a source-owner blocker and must appear as an explicit unavailable coverage row; Borg must not manufacture geometry or dynamics to fill it.

  Migrate the current catalog without breaking its ids, URLs, records, saved links, or visible labels. Preserve those values as legacy aliases and prove that changing a mutable display name or taxonomy alias leaves `assemblyId`, model hash, record loading, saved selections, and deep links unchanged. Prove separately that changing an identity-bearing coordinate, component relation, source order, or motion prescription changes the model hash, and that changing only record serialization changes the record hash without silently changing the model hash.

  Keep Borg's authority boundary intact. A poster, animation, taxonomy placement, similarity grouping, or hash match is display and identity infrastructure; none establishes acceleration balance, evolution, retention, stability, binding, physical identity, or scientific acceptance. Borg consumes source-defined specifications and sealed records and performs no app-local causal-root solving or forward physics.

- **Evidence / blocker:** The current `BorgBraidRecordCatalog.js` is a flat braid-oriented catalog whose ids and primary labels contain taxonomy semantics. The live taxonomy already separates assembly composition, individual braid, and individual binary, while the assembly-view requirements already require immutable record navigation and source-defined parameter variants. Some admitted or separately studied assemblies may not yet have a sealed Borg record or a source-owner-approved concrete representative; those gaps must be inventoried before visual coverage can close.
- **Completion:** A versioned assembly-registry schema, canonical model-hash procedure, alias and migration contract, and machine-readable coverage report are accepted. The Assembly Library works at desktop and narrow widths; every admitted taxonomy member has at least one source-declared visual representative; every registered concrete assembly has a deterministic poster, a loadable inspection view, and an honest prescribed, evolved, or presentation-only animation. Focused tests cover identity stability, hash sensitivity, alias and short-hash ambiguity, component inventory, source order, registry completeness, deep-link migration, and no-physics boundaries. Browser QA verifies taxonomy browsing, search by every identity form, model/record hash copying, representative planar and spatial single-braid entries, representative multi-braid and non-family entries, component isolation, playback/scrubbing, static turntable labeling, and zero missing or silently substituted registry rows.

### BORG-003 — Velocity-scale sampling evidence

- **Status:** Queued
- **Priority source:** [Ranked Next Objects item 3](priorities.md#ranked-next-objects)
- **Request / acceptance:** Produce measured velocity-scale-aware boundary-shell replay sampling evidence across the declared range using EOM-run rows, under the existing velocity-sampling protocol.
- **Evidence / blocker:** Depends on BORG-001 retained wake/history and residual rows. Affected boundary replay output remains display-only or fail-closed until measured evidence exists.
- **Completion:** Declared calibration and holdout evidence is produced with the protocol’s residual, tail-mass, correlation, seed-variance, patch-replay, and central-ball contribution checks.

### BORG-004 — Assembly Explorer disposition

- **Status:** Queued
- **Priority source:** [Ranked Next Objects item 4](priorities.md#ranked-next-objects)
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
