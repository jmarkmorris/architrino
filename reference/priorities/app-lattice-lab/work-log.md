# Architrino Lattice Lab Work Log

This file records dated planning, implementation status, validation evidence, failed paths, and handoffs for `app-lattice-lab`. Keep strategy and claim boundaries in [priorities.md](priorities.md), accepted executable work in [work-queue.md](work-queue.md), and provisional concepts in [brainstorming.md](brainstorming.md).

## Log Entries

### 2026-08-01 — Selected-Edge Precedence, Compression Scale, and Full-3D Rotation

- Corrected selected-edge draw precedence for the accepted violet repeat-cell highlight. With the checkbox off, the main spherical crop rendered `312` clipped ordinary relationships and suppressed none. With it on, exactly the `15` selected main-edge identities were suppressed from the ordinary light-purple layer, `297` nonselected ordinary relationships remained, and the `15` violet canonical highlight identities rendered with zero exclusions. The operator accepted that no thin ordinary under-stroke remains through a selected violet edge.
- Replaced the reversed scale UI with **Uniaxial Deformation** and a simple $\beta\in[0,1]$ slider: $\beta=0$ is the undeformed baseline and $\beta=1$ is the maximum supported nondegenerate deformation. Internally $s_x=1-0.99\beta$, so the X-coordinate scale endpoints remain `1` and `0.01`. Visible copy no longer presents $\lambda$ or the prior compression-plus-parenthetical output; accessibility text defines both $\beta$ endpoints. The app-specific $\beta$ is a static display/control parameter, not relativistic $v/c$. At `1280 × 720`, both endpoints rendered without overflow; the checkerboard certificate remained exact at both mapped scales, and the repeat-miniature clipper safely hid segments shorter than the combined fixed marker radii instead of throwing at $\beta=1$.
- Replaced the constrained two-Euler-angle drag with an incremental virtual-trackball quaternion shared by the main and repeat-cell canvases. The lower-left key continues to project the same main-view quaternion. A live curved drag changed the Euler display from `-0.44000,0.66000,0.00000` to `-0.83584,0.39800,-0.31273`; the projected Y axis changed from screen-vertical to a `23.82px` horizontal endpoint separation. X/Y/Z label gaps remained approximately `10px`, no label intersected its axis line, and the key retained its `144 × 132` footprint and `18px` bottom inset. The operator accepted the full-3D trackball correction.
- Updated the Shared Display Conventions population sentence to `Every configuration in this curated gallery has equal numbers of electrinos and positrinos.` The following sentence still states that this is a population fact and does not establish acceleration balance or cancellation. At the operator viewport, the accessibly labeled card remained fully visible inside the scrolled left rail.
- Recorded—but did not prematurely implement—the future random fifty-fifty case's accepted control placement: a case-scoped custom circular-arrow action on the **Site Ledger** title row. The random case remains blocked on a declared reproducible assignment/seed rule and independent verifier; deterministic cases therefore render no such action.
- Final focused validation passed all `37` Lattice Lab tests; the independent stationary oracle passed `2/2`; `git diff --check` passed; and the fresh browser console had no warnings or errors.

### 2026-08-01 — Repeat-Cell Highlight Made Additive

- Corrected the spherical-crop highlight behavior so enabling `Highlight repeat cell` no longer hides the ordinary light-purple relationship layer. The violet repeat-cell emphasis is now an additive overlay only.
- Focused source coverage requires the runtime to leave `lineGroup.visible` untouched while checkbox state controls only the highlight objects. The existing canonical graph checks continue to require exact identity equality between the repeat-cell network and main highlight.
- At the live `1280 × 720` viewport, the default-off state showed the complete ordinary relationship network. Enabling the checkbox preserved that complete network and added the violet outline. Both states reported the same `15` canonical highlight edge identities; the enabled state reported zero excluded edges. The checkbox remained `8px` inside the bounded repeat-image subpanel at its left and bottom edges.
- The focused Lattice Lab command passed `35/35`, `git diff --check` passed, and the fresh browser console had no warnings or errors. This scoped rendering correction does not change selection, calculation, evidence, or geometry semantics.

### 2026-08-01 — Shared-Conventions, Highlight, and Outcome Follow-Ups Verified

- Moved only gallery-wide facts out of the Active Case Record: equal electrino/positrino population for every currently shown curated configuration, the spherical main-display crop, and the meaning of light-purple relationship lines. The population copy explicitly says equal counts are a configuration fact and do not establish acceleration balance or cancellation. Geometry, polarity rule, shell counts, displayed local total, density, detailed boundary treatment, and calculation scope remain case-specific. Future random finite configurations are not presumed 50/50.
- Added the bottom-left **Shared Display Conventions** card after the Lattice Primer. It has one accessible title tied to the card region and no second title or subtitle. At `1280 × 720`, the card was fully visible within the scrolled left rail at `x=10..402.39px`, `y=430.14..709.83px`. Its computed title treatment exactly matched the **Active Case Record** kicker: light-purple `rgb(189, 174, 255)`, `10px`, weight `780`, `0.8px` letter spacing, and uppercase transformation.
- Refined the active repeat-cell highlight without changing its graph or control behavior: cylinder radius `0.022 → 0.0176` (20 percent thinner) and color `#c6b6ff → #b79cff` (slightly more violet). The checkbox remained default-off and `8px` inside the bounded repeat-image viewport at its left and bottom edges. Activating it still selected all and only the same `15` canonical edge identities with zero excluded edges.
- The certified green-check outcome now reads exactly `Net acceleration is zero at every site.` The live ledger retained `scope=certified-periodic`, `Magnitude 0 · Vector ⟨0, 0, 0⟩`, the declared repeating-pattern scope sentence, two local shell examples, and the calculation disclosure; no force, motion, stability, conservation, energy, or broader claim was added. Focused coverage gives the finite exact-zero state the finite-only label `Net acceleration is zero in this finite configuration.`
- Final validation: the focused Lattice Lab command passed `35/35`, the independent stationary oracle passed `2/2`, `git diff --check` passed, and the fresh browser console returned no warnings or errors.

### 2026-08-01 — LAT-018 through LAT-022 Focused Presentation Follow-Ups Verified

- LAT-018 removed `Copy this colored tile by translation to continue the pattern.` and its unused markup/runtime hook without replacement; the repeat-vector labels remain.
- LAT-019 moved the unchanged, accessibly labeled, default-off `Highlight repeat cell` checkbox into an overlay at the bounded repeat-image viewport's bottom-left. At `1280 × 720`, its bounds were fully inside that viewport with `8px` left and bottom insets. Activating it retained exact `15/15` identity equality between the canonical repeat-image edge set and the main highlighted edge set.
- LAT-020 consolidated the repeat-cell panel to one `How This Pattern Repeats` heading and tied the panel region's accessible label to it. The old `Polarity Repeat Cell` label is absent.
- LAT-021 doubled the lower-left XYZ key from `72 × 66` to `144 × 132`, preserved its `16px` left and `18px` bottom corner insets, and resolved the requested unit-circle idea as three centered equal-scale unit axes without adding a circle. Focused geometry tests require symmetric positive/negative endpoints and a `10px` outward label offset. Browser drags changed the main rotation from `-0.44000,0.66000,0.00000` to two distinct orientations; all three axes remained centered, every label stayed beyond its positive endpoint at approximately `10px`, and no label bounding box intersected its axis line. The runtime continues to update the key from the main root quaternion and copies that same quaternion to the repeat view.
- LAT-022 removed the redundant second `Site Ledger` subtitle. Exactly one visible all-caps purple `Site Ledger` heading remains, and the ledger region's accessible label points to it.
- The final focused command `node --test tests/lattice-lab-ledger-presentation.test.js tests/lattice-lab-runtime.test.js tests/lattice-lab-bcc-neighbor-graph.test.js` passed `35/35`; the independent stationary oracle passed `2/2`; `git diff --check` passed; and the fresh browser console had no warnings or errors.

### 2026-08-01 — LAT-011 Site-Ledger Hierarchy Implemented and Verification Evidence Acquired

- Implemented the operator-accepted [site-ledger presentation hierarchy](site-ledger-presentation-design.md) through the focused presentation model, live runtime, standalone markup, and compact inspector styling.
- The certified checkerboard now starts with `Net acceleration is zero at every site.`, `Magnitude 0 · Vector ⟨0, 0, 0⟩`, the declared repeating-pattern scope sentence, and two explicitly local shell examples. The `Show calculation` disclosure contains the 18 normalized contributions and their running local sum. The all-site result still comes from the separate declared certificate, not those two displayed shell rows.
- The finite nonperiodic presentation derives zero or nonzero by summing only acceleration rows included in the displayed finite calculation. It ignores stale aggregate residual fields, omits excluded rows from both summaries and disclosure, and uses finite-only scope language.
- Cases without a calculation show only `Acceleration has not been calculated for this geometry.` plus the two optional geometric shell descriptions. They expose no outcome icon, residual, zero, unavailable row, or calculation disclosure.
- Selection identifies the selected polarity without a raw coordinate and does not change the evidence state. The live checkerboard selection check retained `certified-periodic`, the certified net-acceleration-zero outcome, and the zero residual after selecting a positrino.
- Focused Node validation passed all `35` Lattice Lab presentation, runtime, and BCC graph tests. At the live `1280 × 720` viewport, the closed checkerboard ledger occupied `y=373.8px` through `613.8px` with no inspector scrolling and showed the outcome, residual, scope, two local examples, and closed disclosure.
- Opening `Show calculation` exposed exactly `18` normalized contribution rows; the last running local sum was `⟨0, 0, 0⟩`. Selecting a positrino preserved `certified-periodic`, the certified net-acceleration-zero outcome, and the zero residual without exposing a raw selected coordinate. Switching to BCC produced `not-established`, the calm no-calculation sentence, two geometric shell descriptions, and no icon, residual, or disclosure. The fresh browser console had no warnings or errors.
- Finite nonperiodic zero/nonzero and excluded-row behavior are covered by focused view-model tests because LAT-008 remains deferred and no live finite random case exists. Those tests derive the result only from included contribution rows, ignore a stale aggregate residual field, omit excluded rows, and keep finite-only scope language.
- Queue status reconciliation is delegated to the Lattice Lab bookkeeping worker; this log records implementation and verification evidence only.

### 2026-07-30 — LAT-001 Simple-Cubic Stationary-Release Contract Verified

- Selected the simple-cubic checkerboard as the first exact case and declared the ideal sites, parity polarity rule, $c_f=1$ convention, stationary retained history, visual crop, and receiver-centered inversion-symmetric calculation exhaustion.
- Added the generative canonical acceleration row $\mathbf A_{\mathbf n}/a_0=-\sigma(\mathbf n)\mathbf n/\|\mathbf n\|^3$, including the unique stationary partner root, $D_t=W^{\mathrm{acc}}=1$, and absence of a positive-delay stationary self root.
- Proved the sitewise inversion-pair theorem $\mathbf A_{-\mathbf n}=-\mathbf A_{\mathbf n}$ and exact zero at every finite admitted exhaustion stage.
- Added a structural verifier covering 48 cube/ball ledgers, 26,400 rows, both receiver polarities, and a tampered-numerator negative control.
- Added an independent high-precision check using the pre-existing EOM reference kernel without importing the JavaScript ledger implementation.
- Updated Lattice Lab to show the first two acceleration shells, the normalized scale $a_0=\kappa\epsilon^2/d^2$, the derived reference result, and a strict modified-configuration fallback that does not inherit the infinite-repeat certificate.
- Preserved the result boundary: no arbitrary-order infinite sum, stability, later EOM evolution, conservation, or physical-medium claim.

### 2026-07-30 — Requirements and Design Brief Added

- Added [requirements-design.md](requirements-design.md) from the operator's stated educational purpose and the earlier `aaa-lattice-lab` exploration.
- Captured candidate cubic, BCC, FCC, HCP, diamond-style, and editable-supercell views as proposed gallery material, not as accepted cancellation or stability results.
- Defined the first build as a display-only case viewer pending the LAT-001 geometry and evidence contract.
- Added the stationary infinite-history, synchronous-release thought experiment; solid red/blue spheres; light-purple geometry lines; 3D orientation aids; and the dotted Borg-sphere display envelope, explicitly not a physical boundary.
- Added a collapsible left control rail using the established shared collapse/expand treatment and a lower-right acceleration-ledger panel for the selected site.
- Added a top-left dynamic **What You're Seeing** card, inspired by the explanatory role of Causal Wake lessons but scoped as a case-specific live explanation rather than a story sequence.
- Made exact 50/50 electrino/positrino population a Lab constraint. Polarity experimentation will preserve it through two-site swaps and report any resulting nonzero initial acceleration as broken cancellation, not instability.
- Simplified the learner-facing case state to `reference configuration` or `modified configuration`; detailed scope remains in internal case records rather than a list of evidence grades in the interface.
- Specified the swap interaction as choose A, choose opposite-polarity B, then immediately exchange their polarities.
- Removed the first-version user-defined supercell/editor idea. The Lab will use a canned gallery and named variants only.
- Added a local neighbor-shell table requirement for each canned case: nearest, next-nearest, further useful local shells, and their declared local total.
- Moved the first/next-shell and selected-local-total fields into the gallery table itself at the operator's request; each canned case will supply its actual counts and distances.
- Filled the standard geometry counts for the first two local shells, using nearest-neighbor spacing $d$ and marking the ideal-close-packed HCP convention. These are geometry facts, not cancellation or stability results.
- Sorted the gallery by increasing nearest-shell count, then increasing selected local total; exact ties retain alphabetical order.
- Moved chemical structure names out of candidate labels: CsCl-type ordering is a BCC teaching example, and zincblende-type ordering is a diamond-cubic teaching example.
- Added the geometric site-density measure $n=C/d^3$ to the gallery and Lattice Primer, with equal per-polarity density for the 50/50 cases. It is explicitly not a physical or mass-density claim.
- Specified that light-purple geometry lines end at endpoint sphere surfaces and are occluded by solid spheres rather than visibly passing through their centers.
- Adopted the Borg fixed-screen-size marker convention: every architrino sphere keeps the same visible size, with depth communicated through non-size cues.
- Replaced the ambiguous `display cell` label with the technically precise `polarity repeat cell`, explicitly distinguishing it from a geometry-only unit cell, a supercell, and the dotted display crop.
- Added a compact Polarity Repeat Cell miniature above the lower-right ledger as a repeating-motif orientation aid.
- Clarified that a finite display crop alone cannot establish a global result, while a canned ideal infinite repeat may state an all-lattice conclusion when its declared symmetry construction covers every site.
- Bound the repeat-cell miniature to the main canvas's exact camera rotation, with no mirroring or flipping, a shared Reset action, and no independent orbit.
- Selected the guided order: simple-cubic checkerboard, BCC two-sublattice, FCC, then HCP, with simple-cubic alternating planes and diamond-cubic as later named variants. The gallery table remains independently sorted by local-shell counts.
- Chose the Applications scene as the first test route rather than a standalone-only page.
- Removed the unrecognized `PCC` placeholder after the operator confirmed it was a voice-transcription artifact, not a selected geometry term.
- Reclassified visual differentiation among local shells, ledger results, and declared scope as an Applications-scene tuning pass after first render, not an open design blocker.
- Rewrote the non-goals in plain language: the Lab may show no initial acceleration for an exact ideal configuration, while not testing small disturbances or making energy/conservation calculations.
- Replaced the EOM-evolution jargon with the direct first-version rule: no Play/evolution mode or time animation presented as EOM-solver motion.
- Added the Reuse and Potential Migration section: concrete Borg camera, spherical-guide, picking, marker-size-convention, and Applications-scene reuses; Causal Wake explanatory-panel inspiration; and a bounded future path into a Borg workspace only after many-architrino retained-history, ledger, and evolution support exists.
- Updated the confirmed left-panel reuse: Equation Mapping owns the existing local collapse treatment; the core implementation is extracting it into a shared runtime surface for both Equation Mapping and Lattice Lab.
- Added the standard top-right five-control navigation strip from Borg and the shared standalone-app runtime: Table of Contents, Back, Forward, Home, and Search. Borg's diagnostics toggle remains Borg-specific.
- Chose alphabetical Applications-scene ring ordering by displayed app title, with Greek to Me filed under G; the ring's visual start position is not prescribed. Lattice Lab is the new fourteenth entry.
- Added a lower-left collapsible Lattice Primer for geometry classification, standard notation, cells, bases, stacking, coordination, and compact visual keys.

### 2026-07-30 — Priority Packet Seeded

- Created the `app-lattice-lab` priority packet at the operator's request.
- Established **Architrino Lattice Lab** as the display name and the first task as a geometry-and-certificate contract, not an implementation commitment.
- Preserved the boundary that an ideal red/blue pattern is not automatically a zero-acceleration configuration, physical void model, or stability result.
