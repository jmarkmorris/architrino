# Architrino Lattice Lab Work Queue

This is the canonical execution ledger for the exploratory display-only workstream. [priorities.md](priorities.md) owns the app purpose and claim boundary.

## Ranked Next Objects

1. LAT-015 — Increasing-strength compression coordinate.

## Queued

### LAT-015 — Increasing-strength compression coordinate

- **Status:** Next queued object after verified LAT-016; implementation not started
- **Acceptance:** Replace the user-facing $\lambda$ slider with a dimensionless static display coordinate $0\leq\beta<1$, where $\beta=0$ is uncompressed and $\lambda=\sqrt{1-\beta^2}=1/\gamma$ is computed exactly once at the model boundary. Use a documented near-one interactive maximum so $\lambda$ never reaches zero. Preserve existing internal $\lambda$-based geometry, neighbor classification, cancellation semantics, and the implemented site-ledger evidence hierarchy.
- **Checks:** Verify $\beta=0\mapsto\lambda=1$, monotone increasing compression, the near-one endpoint, and retained $\lambda$ outputs. The UI must not describe $\beta$ as physical motion or make an SR/GR claim.

### LAT-017 — Diamond-cubic projected-edge visual audit

- **Status:** Queued behind LAT-015; focused QA follow-up only
- **Observed issue:** The operator reports that purple Diamond-cubic nearest-neighbor links can appear to have unequal screen lengths in the three-dimensional view.
- **Implementation fact:** Both Lattice Lab views currently use orthographic cameras. The audit must therefore test view-direction foreshortening under orthographic projection rather than assume perspective scaling.
- **Acceptance:** Independently enumerate the Diamond-cubic nearest-neighbor graph from coordinates and prove that every edge consumed by both renderers has world-space length exactly $d$, with coordination number four at every ideal interior site. Compare the canonical identities with the clipped/rendered identities and reject every longer edge, including the $4d/\sqrt6$ next shell. Then measure projected screen lengths across representative camera orbits and establish whether orientation-dependent foreshortening alone explains the visual variation.
- **Polarity check:** Separately verify the declared two-sublattice polarity topology. A red site may be described as having blue nearest neighbors only where the coordinate-derived neighbor identities and polarity assignment establish that fact; do not infer it from the camera angle.
- **Scope:** Do not change either camera or add learner-facing copy unless the audit finds a real geometry or rendering defect. Record focused tests, browser screenshots, exact edge counts/identities, fresh-reload console state, and the result for operator handoff.

### LAT-014 — Minimal owned-tile presentation

- **Status:** Queued presentation correction
- **Acceptance issue:** A repeat-cell panel must not visually present its surrounding many-site periodic context as though that full context were the owned repeat cell. In FCC alternating planes, the owned tile is exactly two sites.
- **Acceptance:** The default repeat-cell view shows the minimal translational owned tile. Any surrounding translated copies are either absent or unmistakably marked as non-owned context and are never counted as owned sites. The accepted canonical coordinates, nearest-neighbor identities, and unique half-open site ownership remain unchanged.
- **Scope:** Do not alter the accepted neighbor geometry. Adjacent translated copies belong only in the separate optional LAT-013 teaching mode.

### LAT-013 — Visual tiling demonstration

- **Status:** Queued behind the LAT-014 default-view correction; design/prototype task only
- **Problem:** The current repeat-cell visualization correctly states translation tiling but still asks a learner to imagine how adjacent copies join.
- **Standard object:** Use crystallographic primitive-cell notation: the owned basis/sites, three labeled primitive lattice vectors $\mathbf a_1,\mathbf a_2,\mathbf a_3$, and their parallelepiped fundamental domain. Distinguish that primitive translation tile from both a conventional high-symmetry cell and a Wigner-Seitz/Voronoi cell; the latter may explain local-neighbor geometry but is not necessarily the primitive translation tile.
- **Goal:** Explore a restrained optional teaching view for at least the simple-cubic checkerboard, showing one adjacent translated copy with a clearly distinct but non-semantic treatment and the actual cross-boundary nearest-neighbor joins. Optional ghost copies may be generated only by integer combinations of the same three primitive vectors.
- **Pre-implementation gate:** A design note must name the standard primitive object used for every gallery case and independently verify that its three vectors reproduce both the occupied geometry and polarity assignment.
- **Acceptance:** A learner can see how the selected primitive cell and one translated neighbor reproduce the pattern and relationships. This is a separate optional teaching mode or toggle, not the default repeat-cell view. The owned tile and adjacent copy are unmistakably distinct. The view uses translation only, reuses the canonical periodic coordinates and edge graph, preserves unique architrino ownership, avoids visual clutter and a false finite-universe claim, and does not alter the accepted graph.
- **Scope:** Prototype/presentation work, not a validated mathematics claim. No rotation, color swapping, or ad hoc display cell.

### LAT-031 — Remove `currently shown` from Polarity count copy

- **Status:** Requested; implementation has not started or been reported
- **Request:** In `Shared Display Conventions` under `Polarity count`, remove `currently shown` so the sentence begins exactly `Every configuration in this curated gallery has equal numbers`. Retain the existing electrino/positrino species wording that completes the sentence.
- **Claim boundary:** Equal species counts are a configuration fact for the current curated gallery, not acceleration cancellation or balance. The copy must not imply that future random finite configurations inherit the same population rule.
- **Acceptance:** The old `currently shown` wording is absent, the new sentence prefix is exact, and the existing species wording and claim-boundary copy remain intact. Focused copy/accessibility checks must confirm one readable `Polarity count` statement and preserved accessible structure; operator-viewport browser verification must confirm the revised sentence renders completely without truncation, duplication, or changed meaning.
- **Scope:** Copy edit only. Do not change shared-panel contents, population data, calculations, gallery membership, styling, or evidence authority.

### LAT-032 — Use the selected gallery title for the Active Case Record heading

- **Status:** Requested; implementation has not started or been reported
- **Request:** Replace the static `Active Case Record` heading with the currently selected gallery item's title, updating it whenever the selected case changes. For example, the simple-cubic checkerboard case displays `Simple Cubic Checkerboard` as the heading.
- **Heading treatment:** The dynamic title must match the established comparable subpanel-heading treatment exactly: all-caps light purple with the same font size, weight, letter spacing, and casing behavior. Preserve one accessible heading/label for the panel and do not render a duplicate visible or accessible title.
- **Acceptance:** Focused case-switch checks must select representative gallery cases and confirm that the heading always matches the active gallery item, changes immediately with the case, and never retains a stale or static `Active Case Record` label. Accessibility checks must confirm one nonduplicate panel label whose accessible name follows the selected case. Style-parity checks must compare the computed color, font size, weight, letter spacing, and casing treatment with the established subpanel heading. Operator-viewport browser verification must confirm the dynamic headings are legible, correctly styled, complete, and free of duplication or layout regression across case switches.
- **Scope:** Heading copy, synchronization, style, and accessible labeling only. Do not change gallery titles, case data, selection behavior, panel contents, geometry, calculations, or evidence authority.

### LAT-033 — Match the Uniaxial Deformation heading to subpanel typography

- **Status:** Requested; implementation has not started or been reported
- **Request:** Style the existing `Uniaxial Deformation` title with the exact established all-caps light-purple subpanel-heading treatment.
- **Acceptance:** Preserve the approved visible wording `Uniaxial Deformation` and render exactly one visible and accessible title. Focused style-parity checks must confirm the same computed light-purple color, font size, weight, letter spacing, and casing treatment as comparable subpanel headings. Accessibility checks must confirm a single nonduplicate control-region label. Operator-viewport browser verification must confirm the title is legible, correctly styled, and free of duplication or layout regression.
- **Scope:** Heading presentation and accessible labeling only. Do not change LAT-029's approved title wording, deformation paragraph, `β=0` undeformed and `β=1` maximum-supported-deformation semantics, β-only readout, clipping prerequisite, static-geometry boundary, or any broader behavior or claim.

## In progress

### LAT-039 — Aggregate coincident site groups for the β=1 display

- **Status:** In progress; the endpoint appearance is operator-accepted, but the reported grouping basis does not yet satisfy the durable endpoint-equivalence boundary and focused validation is unreported
- **Implemented and accepted appearance:** The implementation worker reports that at `β=1` original markers in a display group become one purple marker, internal edges are suppressed, external group-to-group relationships are deduplicated, every source site ID remains in group metadata, and aggregation is disabled below the endpoint. The operator accepts that the endpoint is clearly aligned, legible under rotation, and contains no extra lines.
- **Grouping-rule discrepancy:** The worker currently reports forming groups from transformed `β=1` distances relative to rendered sphere diameter. The durable acceptance requires a documented rule from endpoint deformation geometry or exact endpoint equivalence and rejects marker-radius or loose visual-proximity grouping. This discrepancy must be resolved before verification.
- **Verification required:** Focused aggregation evidence must prove exact group membership; complete identity and polarity preservation; one purple marker per accepted group; suppression of all and only internal-group lines; correct deduplicated inter-group relationships; reversible ordinary markers and lines immediately below `β=1`; and Reset/reload behavior. The worker must also report the resolved endpoint-grouping rationale, fresh operator-viewport results, clean console, and `git diff --check` before `Verified`.
- **Scope:** Maximum-endpoint display aggregation only. Do not merge, delete, recolor, or otherwise mutate underlying site identities or polarities; do not change canonical geometry, calculations, ledgers, relationship identities, evidence boundaries, or acceleration, motion, stability, conservation, energy, or broader-physics claims. Preserve LAT-029 and LAT-038 semantics and existing clipping safeguards.

### LAT-041 — Add a lower-right canvas polarity legend

- **Status:** In progress; canvas marker-size parity is operator-confirmed, but corrected order/color pairing and fresh focused/browser validation remain pending
- **Implemented size evidence:** The implementation worker reports `16px` legend swatches tied to the renderer's `8px` site radius, and the operator confirms that the legend markers match the canvas marker size.
- **Required order and pairing:** In the lower-right canvas legend, place the red sphere labeled `Positrino` on top and the blue sphere labeled `Electrino` below. Colors must remain correctly paired with those labels. The legend markers need not reproduce canvas highlight, lighting, or shading treatments; equal visible size and correct base color/label identity are the required parity.
- **Verification required:** Focused checks must confirm the exact top-to-bottom order, red-`Positrino` and blue-`Electrino` pairing, equal `16px` marker dimensions tied to the site-radius convention, one accessible legend with correctly associated labels, and no change to rendered site identities or interaction data. Fresh responsive and operator-viewport verification must confirm the corrected legend remains fully inside the canvas, legible, and noncolliding with canvas content, controls, panels, captions, and other overlays across case changes, deformation, rotation, and representative narrow/resized layouts. Report a clean console and `git diff --check` before `Verified`.
- **Scope:** Display legend only. Do not change polarity assignments, sphere materials used by actual sites, picking/render identities, calculations, geometry, evidence boundaries, or claims. Preserve LAT-039's maximum-deformation purple aggregation as a separate endpoint display state; the purple group marker is not a third polarity and this legend must not alter or replace it.

### LAT-036 — Match Site Ledger outcome font size to the Lattice Primer case text

- **Status:** In progress; visible parity is operator-accepted, but terminal focused computed-style and browser validation evidence is not yet reported
- **Implemented result:** The implementation worker reports applying the Lattice Primer `Simple Cubic Checkerboard` text's explicit `14px` reference to the Site Ledger outcome while leaving its wording and green-check semantics unchanged. The operator accepts the visible font-size parity.
- **Verification required:** Terminal focused computed-style evidence must use the Lattice Primer `Simple Cubic Checkerboard` element as the explicit reference, require exact font-size parity, and confirm that `Net acceleration is zero at every site.` remains one accessible statement with its established hierarchy and evidence boundary. Operator-viewport browser evidence must confirm the two text sizes match and the outcome remains legible, complete, correctly aligned with its green check, and free of layout regression. Report a clean console and `git diff --check` before verification.
- **Scope:** Outcome font size only. Do not change the outcome copy, icon, calculation state, result hierarchy, residual or scope content, or any acceleration, motion, stability, conservation, energy, or broader-physics claim boundary.

### LAT-029 — Uniaxial Deformation β control semantics

- **Status:** In progress; the visible subpanel changes are operator-accepted, but terminal focused and browser validation evidence is not yet reported
- **Implemented and accepted presentation:** The implementation worker reports the live title `Uniaxial Deformation`, a deformation/undeformed explanatory paragraph with no compression terminology, and the compact readout containing only `β =` plus the slider value from `0` through `1`, with no parenthesized secondary number. The operator accepts those visible subpanel changes.
- **Required semantics:** The visible scale increases with deformation: `β=0` is the undeformed baseline, and `β=1` is the maximum supported nondegenerate X-axis deformation. The model boundary performs the visible-to-internal conversion exactly once.
- **Parameter boundary:** `β` is a dimensionless display/control parameter for a static X-axis geometry deformation. It is not a physical velocity and does not establish a relativistic, motion, stability, conservation, energy, or broader physics claim.
- **Clipping prerequisite:** Retain and validate the existing clipping correction through the full visible range, including the maximum supported endpoint and applicable narrow-resize/segment guards. Do not complete this item until the clipping fix is verified or if the semantic remap reintroduces clipped or invalid geometry.
- **Verification required:** Terminal focused evidence must cover exact visible values `0` and `1`, their internal mappings, an intermediate monotonicity case, retained geometry/clipping outputs, reload/default behavior, and copy/accessibility exposure of the `Uniaxial Deformation` control name and current value. Operator-viewport browser evidence must confirm that moving from `0` toward `1` visibly increases X-axis deformation, both endpoints remain unclipped and valid, reload preserves the intended default, and the accepted title, paragraph, and compact readout remain unambiguous. Report a clean console and `git diff --check` before verification.
- **Scope:** User-facing copy, scale direction, and boundary mapping only. Preserve accepted geometry, neighbor classification, ledger semantics, and claim boundaries. This remains distinct from LAT-015's broader coordinate implementation and from unfinished LAT-034 repeat-miniature rendering.

### LAT-027 — Keep relationship lines visible when repeat-cell highlight is enabled

- **Status:** In progress; corrected combined rendering is operator-accepted, but fresh terminal validation evidence for the LAT-028 correction is not yet reported
- **Request:** Make `Highlight repeat cell` additive without erasing the spherical-crop canvas's overall relationship network.
- **Implemented result:** The ordinary spherical-crop relationship group is decoupled from checkbox state, so the same ordinary network remains visible when the violet overlay is enabled. The checkbox remains accessible, default-off, and `8px` inside the bounded repeat-image viewport; canonical highlight identities are unchanged.
- **Operator failure:** Thin ordinary relationship strokes remain visible through the centers of the wider violet selected edges. The additive behavior is therefore not accepted as rendered.
- **Corrected live result:** The operator confirms that the selected violet edges no longer contain the thin ordinary under-stroke while the overall relationship network remains visible elsewhere.
- **Evidence required:** LAT-027 remains unfinished until the implementation worker reports fresh focused off/on identity-partition checks, live selected-edge inspection, clean console, and diff hygiene for the LAT-028 correction.
- **Scope:** Geometry, clipping, edge enumeration, selected repeat-cell identity, checkbox semantics, LAT-019 placement, LAT-024 styling, and evidence claims remain unchanged.

### LAT-028 — Give highlighted edges visual precedence over ordinary lines

- **Status:** In progress; corrected rendering is visibly operator-accepted, but fresh terminal focused validation evidence is not yet reported
- **Operator failure:** The earlier LAT-027 additive rendering left thin ordinary relationship strokes visible through the centers of the wider violet highlighted edges. That live result was rejected.
- **Request:** When `Highlight repeat cell` is enabled, retain ordinary relationship lines on every nonselected edge but suppress the ordinary line on each selected highlighted edge, so no thin light-purple or white center line runs through the wider violet highlight.
- **Current implementation evidence:** The implementation worker changed ordinary relationship rendering at the edge-identity level so selected ordinary segments are excluded while nonselected ordinary segments remain. The operator confirms the live selected violet edges no longer show the thin under-stroke.
- **Operator acceptance:** The corrected highlighted-edge appearance is accepted.
- **Verification required:** Fresh focused tests must verify the off/on identity partition and reject both missing nonselected lines and dual-rendered selected lines. The implementation worker must report live inspection of every selected edge, exact selected identities, retained control placement/default, clean console, and `git diff --check` before this item can be verified.
- **Scope:** Draw precedence only. Geometry, clipping, edge enumeration, selected repeat-cell identity, checkbox semantics, LAT-019 placement, LAT-024 styling, and evidence claims remain unchanged.

### LAT-030 — Restore unrestricted synchronized three-dimensional rotation

- **Status:** In progress; trackball implementation is live and operator-accepted, but focused full-3D and browser validation evidence is not yet reported
- **Operator-reported defect:** The prior main-view interaction used only two Euler angles with clamped pitch, constraining Y to remain screen-vertical; the synchronized lower-left key faithfully mirrored that restricted quaternion.
- **Implemented correction:** Drag now uses an incremental quaternion trackball rotation shared by the main lattice, repeat view, and XYZ key. The operator confirms the new trackball rotation works.
- **Operator acceptance:** The corrected unrestricted trackball interaction is accepted.
- **Verification required:** Focused rotation/camera checks must exercise independent rotations that tilt each projected axis, include a demonstrably nonvertical Y case, verify quaternion/orientation equality across synchronized consumers, and reject restoration of the old Euler/pitch constraint. Fresh operator-viewport evidence must confirm Y tilt, label separation, retained key dimensions and lower-left anchor, working drag/selection/highlight/wheel controls, clean console, and `git diff --check` before this item can be verified.
- **Scope:** Rotation and camera interaction only. Lattice geometry, axis identity, key labels, key styling, repeat-cell synchronization, compression mapping, and evidence claims are unchanged.

## Awaiting verification

### LAT-034 — Preserve repeat-miniature joining lines across deformation

- **Status:** Awaiting verification; implementation and focused evidence are reported and the rendered result is operator-accepted, but the worker's fresh terminal browser evidence is still pending
- **Operator-reported defect:** In the top-right `How This Pattern Repeats` image, intended joining/repeat lines disappeared at some supported `β` values.
- **Implemented correction:** The implementation worker reports preserving the same canonical repeat-relationship identities at every `β` and using a draw-safe fallback for geometrically short connectors at the maximum endpoint, based on their actual deformed endpoints rather than invented replacement lines.
- **Validation and acceptance:** The expanded focused suite passes `38/38`. It covers all `15` canonical repeat connectors at `β=0`, `β=0.5`, and `β=1` with no extra identities. The operator accepts that all intended lines remain shown throughout uniaxial deformation.
- **Verification still required:** Before `Verified`, the worker must report its pending fresh operator-viewport pass at `β=0`, `β=0.5`, and `β=1`, including exact rendered identity counts, no missing or spurious connectors, continuously visible and correctly connected lines, clean console, and `git diff --check`.
- **Scope:** Repeat-miniature line retention and rendering only. Preserve LAT-029's `β=0` undeformed baseline, `β=1` maximum supported nondegenerate X-axis deformation, monotone mapping, β-only presentation, static-geometry/no-broader-physics boundary, and all existing clipping and narrow-resize safeguards. Do not change canonical geometry or accepted line identities. Polar-cap work remains separate under LAT-037.

### LAT-040 — Rename the second left-panel subpanel to `What You Are Seeing`

- **Status:** Awaiting verification; the visible title is operator-accepted, but implementation-worker focused copy and accessibility evidence is not yet reported
- **Accepted visible result:** The left panel's second subpanel displays exactly `What You Are Seeing`; the operator accepts the title correction.
- **Verification still required:** Focused copy evidence must confirm the exact new title, absence of `What You’re Seeing`, and unchanged subpanel contents. Accessibility evidence must confirm the same single nonduplicate subpanel label exposes the new accessible name. The implementation worker must report operator-viewport typography/layout results, clean console, and `git diff --check` before this item can be Verified.
- **Scope:** Title copy only. Preserve the established typography, accessible structure, subpanel order, contents, behavior, and evidence authority.

## Verified

### LAT-038 — Keep uniaxial deformation on one fixed semantic axis

- **Status:** Verified; operator accepted
- **Verified result:** The underlying geometry deforms only semantic X monotonically across the supported `β` range. The repeat-cell miniature now retains its undeformed reference fit instead of recomputing a β-dependent bounding-sphere scale, so unchanged Y/Z dimensions no longer appear to stretch and the apparent deformation axis no longer switches.
- **Validation:** The focused suite passed `40/40`, including component-wise fixed-semantic-X and retained-reference-scale checks across endpoint and intermediate values. The operator accepts that only X deforms from the start, with no early two-axis stretch or later axis switch.
- **Scope:** Static display-transform and repeat-miniature fit correction only. `β=0` remains undeformed, `β=1` remains the maximum supported nondegenerate endpoint, and semantic model axes, canonical identities, evidence boundaries, and clipping safeguards are unchanged.
- **Completion:** Satisfied.

### LAT-035 — Make Z upward in the default display orientation

- **Status:** Verified; operator accepted
- **Verified result:** The positive semantic Z axis points upward in the default main lattice view and synchronized lower-left XYZ key. The same display quaternion is restored on initial load, case reset, and reload; unrestricted trackball rotation remains available afterward. Semantic X/Y/Z model definitions, key anchoring and labels, and existing controls are unchanged.
- **Validation:** The focused suite passed `39/39`. The implementation worker reports live main-view/key synchronization through initial/default display, arbitrary trackball rotation, case reset, and reload. The operator accepts that Z is up in the default display.
- **Scope:** Display-default orientation only; no coordinate relabeling or data remapping.
- **Completion:** Satisfied.

### LAT-037 — Align spherical overlay polar caps with semantic ±Z

- **Status:** Verified; operator accepted
- **Verified result:** The dotted spherical overlay is authored with its north and south caps on semantic `+Z` and `−Z`, replacing the prior semantic-±Y pole construction. The overlay already inherits the same root quaternion as the lattice and key, so all three now remain synchronized without relabeling model coordinates.
- **Validation:** The `39/39` focused suite includes an explicit independent geometry check that the envelope poles are semantic `±Z`. The implementation worker reports live cap alignment and shared-quaternion behavior through trackball rotation, case reset, and reload. The operator accepts the polar axes as vertical in the Z-up default.
- **Scope:** Spherical-overlay display basis only. Model coordinates, lattice data, trackball behavior, key anchoring and labels, overlay meaning, and controls are unchanged.
- **Completion:** Satisfied.

### LAT-023 — Shared Display Conventions subpanel

- **Status:** Verified; operator accepted
- **Verified result:** The bottom-left panel contains only facts audited as common to every current curated case: equal electrino/positrino population, spherical display crop, and light-purple relationship-line meaning. Case-specific facts remain in the Active Case Record. Equal population is explicitly a configuration fact, not acceleration cancellation or balance, and the panel is scoped to current curated-gallery conventions rather than future random finite configurations.
- **Validation:** The accessible single-title structure and migration boundaries passed the `35/35` focused suite. At `1280 × 720`, card bounds `x=10..402.39`, `y=430.14..709.83` were fully inside the left panel; the console was clean. The independent stationary oracle passed `2/2`, and `git diff --check` passed.
- **Operator acceptance:** The shared-conventions contents and panel are accepted.
- **Scope:** Information architecture and wording only. This does not establish an acceleration result, change gallery geometry, or prescribe future random finite-configuration rules.
- **Completion:** Satisfied.

### LAT-024 — Refine spherical-crop repeat-cell highlight styling

- **Status:** Verified; operator accepted
- **Verified result:** The active highlight radius changed from `0.022` to `0.0176`, exactly `20%` thinner, and the color changed from `#c6b6ff` to the more-violet `#b79cff`. The accessible checkbox remains default-off and `8px` inside the bounded repeat-image viewport at the left and bottom. Enabled state retains all `15/15` canonical edge identities and includes `0` excluded identities.
- **Validation:** Identity and control behavior passed the `35/35` focused suite and fresh `1280 × 720` browser check with a clean console. The independent stationary oracle passed `2/2`, and `git diff --check` passed.
- **Operator acceptance:** The thinner, more-violet treatment is accepted.
- **Scope:** Styling refinement only. Repeat-cell geometry, clipping, ownership, edge enumeration, and LAT-019 placement and interaction behavior are unchanged.
- **Completion:** Satisfied.

### LAT-026 — Style the Shared Display Conventions title

- **Status:** Verified; operator accepted
- **Verified result:** Exactly one accessible `Shared Display Conventions` title remains. At `1280 × 720`, its computed style matches the comparable Active Case Record heading: `rgb(189, 174, 255)`, `10px`, weight `780`, `0.8px` tracking, and uppercase. The rejected larger white title and duplicate subtitle are absent.
- **Validation:** Title count and style parity passed the `35/35` focused suite and fresh browser check with a clean console. The independent stationary oracle passed `2/2`, and `git diff --check` passed.
- **Operator acceptance:** The title's exact visual parity with comparable subpanel headings is accepted.
- **Scope:** Title styling only; distinct from LAT-023's information architecture and migration audit.
- **Completion:** Satisfied.

### LAT-025 — Clarify Site Ledger zero-outcome language

- **Status:** Verified; operator accepted
- **Verified result:** The live certified-periodic Site Ledger displays exactly `Net acceleration is zero at every site.` while retaining the zero magnitude/vector and bounded evidence hierarchy. Focused finite-zero coverage remains finite-only; not-established states remain outcome-free and finite cases do not inherit the repeating-pattern all-site claim.
- **Claim boundary:** The wording reports the calculated net acceleration in the declared configuration and scope. It does not establish force, later motion, stability, conservation, energy, or any broader physical conclusion.
- **Validation:** The focused suite passed `35/35`, the independent stationary oracle passed `2/2`, `git diff --check` passed, and the fresh `1280 × 720` browser console had no warnings or errors.
- **Operator acceptance:** The exact visible text `Net acceleration is zero at every site.` is accepted.
- **Scope:** Learner-facing outcome wording only. Calculations, certificates, icons, selection semantics, and claim authority are unchanged.
- **Completion:** Satisfied.

### LAT-011 — Site-ledger presentation hierarchy

- **Status:** Verified from reported focused checks and fresh operator-viewport browser evidence
- **Verified result:** The certified view reports `Zero at every site`, the zero magnitude/vector, the repeating-pattern scope, and two compact local examples. `Show calculation` exposes 18 normalized rows ending at zero, selection identifies polarity without coordinates or changing the certified state, and BCC shows only the not-established presentation. Focused finite-case tests derive outcomes only from included rows and reject stale aggregate residuals; no live finite case is claimed while LAT-008 remains deferred.
- **Viewport check:** At `1280 × 720`, the closed ledger occupied `y=373.8..613.8px` with no inspector scrolling. The browser console had no warnings or errors.
- **Validation:** The focused Lattice Lab suite passed `35/35`, the independent stationary oracle passed `2/2`, and `git diff --check` passed.
- **Scope:** Presentation and evidence hierarchy only. This does not advance LAT-008 or broaden any acceleration, stability, conservation, energy, or physical-medium claim.
- **Completion:** Satisfied.

### LAT-018 — Remove repeat-cell instructional sentence

- **Status:** Verified
- **Verified result:** `Copy this colored tile by translation to continue the pattern.` and its obsolete markup/runtime hook are absent; the repeat vectors remain and the rendered panel is compact.
- **Validation:** Covered by the `35/35` focused Lattice Lab suite and the fresh `1280 × 720` browser pass with a clean console.
- **Scope:** Presentation cleanup only; separate from LAT-011.
- **Completion:** Satisfied.

### LAT-019 — Relocate repeat-cell highlight control

- **Status:** Verified; operator accepted
- **Acceptance condition:** The existing `Highlight repeat cell` checkbox is a bottom-left overlay inside the bounded repeat-image/canvas subpanel itself; placement merely elsewhere in the larger repeat-cell card is insufficient.
- **Verified result:** The same accessible checkbox defaults off and its bounds remain inside the repeat-image viewport with `8px` left and bottom insets at `1280 × 720`. When checked, the canonical and highlighted edge counts are both `15`, with exact edge-identity equality.
- **Validation:** Covered by the `35/35` focused Lattice Lab suite and the fresh operator-viewport browser pass with a clean console.
- **Operator acceptance:** Accepted on 2026-08-01 after the corrected canvas-overlay placement was shown.
- **Completion:** Satisfied.

### LAT-020 — Consolidate repeat-cell panel heading

- **Status:** Verified
- **Verified result:** The panel has one accessible `How This Pattern Repeats` heading in the prominent treatment; the old `Polarity Repeat Cell` heading and duplicate secondary line are absent.
- **Validation:** Covered by the `35/35` focused Lattice Lab suite and the fresh `1280 × 720` browser pass with a clean console.
- **Scope:** Heading consolidation only; separate from LAT-011, LAT-018, and LAT-019.
- **Completion:** Satisfied.

### LAT-021 — Enlarge and center the XYZ orientation key

- **Status:** Verified; operator accepted
- **Verified result:** The lower-left key renders at `144 × 132`, with `16px` left and `18px` bottom insets. All X/Y/Z endpoints are symmetric about `(72, 66)`. In the initial view and two dragged rotations, labels stayed approximately `10px` beyond their positive endpoints and no label/axis bounding boxes overlapped. The key consumes the same root quaternion used by the main and repeat views.
- **Validation:** The centered-axis geometry test passed within the `35/35` focused Lattice Lab suite; the fresh `1280 × 720` browser rotation audit and console check passed.
- **Operator acceptance:** Accepted on 2026-08-01; no further design iteration is required.
- **Completion:** Satisfied.

### LAT-022 — Remove duplicate Site Ledger subtitle

- **Status:** Verified
- **Verified result:** Exactly one visible all-caps `Site Ledger` heading remains as a `span`; the ledger region's `aria-labelledby` points to it, the duplicate `h2` is absent, and the operator viewport shows no layout regression.
- **Validation:** Covered by the `35/35` focused Lattice Lab suite and the fresh `1280 × 720` browser pass with a clean console.
- **Scope:** Heading cleanup only; its result and status remain distinct from LAT-011.
- **Completion:** Satisfied.

### LAT-016 — BCC two-sublattice visual-neighbor audit

- **Status:** Verified with the strengthened no-orphan-context rule
- **Finding:** Each of the two owned BCC sites has exactly eight opposite-polarity nearest incidences at $d$, for `16` directed incidences and `15` unique segments because the in-tile segment is shared. The larger finite context contains `27` induced exact-$d$ pairs, but its outer red/blue copies visually implied additional omitted relationships. The apparent four top plus four bottom square-perimeter links join same-polarity corner sites at the longer next-shell distance $2d/\sqrt3$ and therefore must not enter the purple nearest-neighbor graph.
- **Fix:** The default BCC miniature now renders only the two owned red/blue architrino spheres. All `15` exact-$d$ segments incident to those sites remain, while `14` small light-purple endpoint markers indicate continuation into adjacent translated cells without presenting those endpoints as orphaned context architrinos. The main highlight consumes the same coordinate-derived `15` edge identities. The panel explains both continuation markers and the excluded longer same-color square edges. The shared main-highlight clipping pass retains its narrow-resize segment guard.
- **Independent check:** `tests/lattice-lab-bcc-neighbor-graph.test.js` enumerates the exact 16 owned incidences, independently reconstructs all `27` pairs in the larger audit context, verifies the `4 + 4` same-color top/bottom perimeter pairs at $2d/\sqrt3$, proves those longer identities are absent from the nearest set, and requires the default graph to contain exactly the `15` owned-incident identities at both $\lambda=1$ and $\lambda=0.01$.
- **Fresh browser check:** Separate cache-busted checks at $\lambda=1$ and $\lambda=0.01$ each showed `0` visible context-site spheres, `14` continuation markers, `15/15` canonical-to-clipped repeat-cell edges, and `15/15` canonical-to-clipped main-highlight edges with exact identity equality. Both retained uniform `8px` owned spheres, the neutral ledger placeholder, and a clean console. The ordinary main spherical crop remains the complete finite-crop BCC graph.
- **Completion:** Satisfied.

### LAT-012 — Gallery-wide static uniaxial compression

- **Status:** Verified as a geometry/view diagnostic; non-checkerboard cancellation remains unestablished
- **Verified result:** The fixed-X one-slider control is enabled for all six curated cases. Main and repeat-cell positions and nearest-neighbor lines transform with $\lambda$, translation-vector readouts show the transformed vectors, red/blue counts are unchanged, and the existing fixed-screen-size sphere path remains common to every case.
- **Evidence boundary:** Only simple-cubic checkerboard displays the independently checked zero outcome. BCC, FCC, HCP, simple-cubic alternating planes, and diamond-cubic show `Static transformed geometry only`, `No acceleration result`, and `Magnitude not established`; no per-case periodic cancellation checker is attached.
- **Browser check:** At $\lambda=0.4$, all six sliders remained enabled and their miniature relationship incidences remained `12, 16, 24, 24, 12, 8`. Checkerboard alone reported `certificatePassed=true` / `outcome=zero`; all five other cases reported `false` / `unavailable`.
- **Scope:** Static display transform only. No EOM evolution, stability, conservation, physical-medium, Lorentz, or non-checkerboard cancellation claim.
- **Completion:** Satisfied.

### LAT-010 — Half-open cell ownership, complete nearest-neighbor graph, and central highlight

- **Status:** Verified
- **Verified result:** Every repeat cell uses a half-open fundamental-domain ownership record with exactly one owned representation per actual site. The panel uses one plain translation sentence plus the three declared vectors and no jargon legend. One coordinate-and-distance-derived canonical edge enumeration feeds both the miniature and the main-canvas highlight. The miniature constructs the displayed site set from the owned sites plus their immediate periodic images, and both renderers consume the identical qualified edge identities. `Highlight repeat cell` is off by default and affects only the main canvas: ordinary relationship lines are hidden while the thick established light-purple highlighted set is shown. Every main and miniature sphere uses the same fixed on-screen radius; ownership, continuation, selection, and highlighting never resize sphere geometry.
- **Independent check:** A separately written enumeration reconstructs every main-crop site pair, every owned-site periodic incidence, and every pair in the repeat cell's displayed site set. It requires exact equality with the rendered relationship sets and checks every segment against the one case-specific nearest-neighbor distance. The uncompressed displayed edge counts are `15, 27, 63, 63, 15, 7` for checkerboard, BCC, FCC, HCP, alternating-plane simple cubic, and diamond-cubic. The checkerboard canonical set contains exactly `15` fixed-distance edges, including the four continuation-to-continuation edges identified by visual QA; a negative test rejects diagonal $\sqrt{2}d$ bridges. Under X compression at $\lambda=0.4$, both views use the same `7` current-shortest edge identities at `0.4d`, while the `8` longer deformed reference edges at `d` are explicitly excluded rather than mislabeled as one equal nearest-neighbor shell.
- **Scope:** Cell repetition is by translation only. Periodic image spheres are display cues, not additional owned architrinos. No second-shell line, decorative bridge, rotational tiling rule, or acceleration claim is included.
- **Completion:** Satisfied.

### LAT-001 — Ideal lattice-case contract

- **Status:** Verified
- **Priority object:** `ideal_lattice_case_contract`
- **Request / acceptance:** Select the first idealized arrangement case and declare its sites, polarity assignment, scale convention, finite/infinite boundary treatment, full acceleration ledger, and independent check for sitewise cancellation or non-cancellation.
- **Verified result:** The simple-cubic checkerboard stationary-release case uses sites $\mathbf X_{\mathbf g}=dL_{j,\lambda}\mathbf g$, parity-alternating polarities, $c_f=1$, a stationary retained history, one-axis factor $0<\lambda\leq1$, and receiver-centered inversion-symmetric exhaustion. Its generative row is $\mathbf A_{\mathbf n}/a_0=-\sigma(\mathbf n)L_{j,\lambda}\mathbf n/\|L_{j,\lambda}\mathbf n\|^3$. Every offset $\mathbf n$ has the same polarity sign and transformed distance as $-\mathbf n$, so the pair cancels exactly at every finite exhaustion stage and the declared exhaustion result is zero at every receiver.
- **Artifacts:** [certificate](simple-cubic-checkerboard-cancellation-certificate.md), `src/apps/lattice-lab/SimpleCubicStationaryLedger.js`, and `scripts/verify-lattice-lab-simple-cubic-checkerboard.mjs`.
- **Independent check:** `tests/test_lattice_lab_stationary_oracle.py` reconstructs stationary roots and acceleration rows through the pre-existing high-precision EOM reference kernel without importing the JavaScript implementation. The structural verifier checks 192 cube/ball ledgers, 105,600 rows, both receiver polarities, four axis/factor transforms, and a tampered-row negative control.
- **Scope:** Derived exact initial acceleration only for the stationary reference repeat and named exhaustion. No arbitrary-order infinite sum, perturbative stability, later evolution, conservation, or physical-medium result.
- **Completion:** Satisfied.

### LAT-002 through LAT-006 — Repeat-cell interaction and geometry presentation

- **Status:** Verified
- **Verified result:** Every gallery case now uses a minimal neutral two-site polarity-preserving translation cell. The translation check maps central ideal sites by all three declared vectors and independently confirms occupied-site and polarity agreement, including the skew HCP cell. Each miniature shows every outgoing nearest-neighbor relationship with thin solid light-purple lines and immediate periodic-image endpoints. Browser checks confirm gallery fit, reciprocal same-handed miniature drag, and miniature wheel control of full-lattice zoom. The UI has no named-view or Reset presets.
- **Scope:** The cell tiles by translation only. Camera orbit is visual inspection and is not a rotational tiling rule.
- **Completion:** Satisfied.

### LAT-013 — Canvas-control and caption simplification

- **Status:** Verified
- **Verified result:** The entire named-view row (`Cell`, `Plane`, `Shell`, `Selected`, `Front`, `Side`, `Top`, and `Reset`) and its runtime state/tests are removed. Direct canvas orbit/drag and wheel zoom remain. The bottom canvas crop caption is removed; Boundary Treatment in the left rail is the single crop explanation. The Curated Case Gallery retains its typography and dimensions while one solid dropdown triangle replaces the overlapping-gradient arrow that produced a black vertical artifact.
- **Completion:** Satisfied.

### LAT-007 — One-slider uniaxial compression

- **Status:** Verified
- **Verified result:** The checkerboard exposes one fixed-X compression slider. Moving it transforms main and minimal-repeat-cell coordinates while keeping sphere markers fixed in screen size. The positive all-site message appears only when the runtime exact-zero ledgers pass for both checkerboard polarity receiver classes under the displayed $\lambda$.
- **Independent check:** The structural verifier covers x/y/z transforms including $\lambda=10^{-6}$; the pre-existing high-precision EOM oracle independently checks transformed stationary rows and inversion partners. Browser inspection confirms visible X-axis compression and the exact scope message.
- **Scope:** Static geometry and initial-acceleration cancellation under the named receiver-centered exhaustion only; no motion, Lorentz, stability, conservation, energy, medium, or EOM-evolution claim.
- **Completion:** Satisfied.

## Deferred / blocked

### LAT-008 — Curated neutral tilings versus random finite configurations

- **Status:** Deferred pending a declared and independently verified randomization rule
- **Teaching / math goal:** Contrast the curated neutral translation cells with random finite, nonperiodic configurations at the same displayed site spacing.
- **Recalculation-control placement:** For the random 50/50 distribution only, place one custom curved/circular-arrow repeat icon on the same title row as `Site Ledger`. Give it an accessible recalculate label such as `Recalculate random configuration`. It is not a global action and must be absent or unavailable for deterministic curated cases. Placement approval does not satisfy the randomization-rule gate or make the task implementation-ready.
- **Request / acceptance:** Before implementation, declare a reproducible finite 50/50-preserving randomization rule, independently verify its population and sampling behavior, and define what seed or provenance makes a displayed configuration reproducible. `Random configuration` is first in the gallery selector as the teaching starting point. Activating the Site Ledger title-row recalculate control creates a new finite, nonperiodic configuration under that verified rule; its repeat-cell panel states `Not applicable — this is not a repeating lattice.` The ledger computes the actual displayed finite-configuration acceleration contributions and residual, including a normalized vector magnitude with clear finite scope/units. Its status uses icon plus text and color: green `zero residual in stated scope` or red `nonzero residual in stated scope`. A nonzero residual means nonzero initial acceleration only under that displayed ledger. Do not infer an all-space result, animate motion, or claim stability or conservation. Keep population balance distinct from acceleration cancellation.

### LAT-009 — Polarity-edit interaction

- **Status:** Removed from the first-version UI; deferred
- **Request / acceptance:** The earlier two-site polarity swap, its card, explanatory copy, and runtime interaction are absent from the active Lab. Do not replace it with a one-site flip or another non-reference editing control. Reconsider editing only after LAT-008 supplies an independently checked assignment class and result.

## Superseded / withdrawn

No rows.
