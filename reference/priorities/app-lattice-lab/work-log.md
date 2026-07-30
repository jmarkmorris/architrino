# Architrino Lattice Lab Work Log

This file records dated planning, implementation status, validation evidence, failed paths, and handoffs for `app-lattice-lab`. Keep strategy and claim boundaries in [priorities.md](priorities.md), accepted executable work in [work-queue.md](work-queue.md), and provisional concepts in [brainstorming.md](brainstorming.md).

## Log Entries

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
