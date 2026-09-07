# Architrino Lattice Lab Work Queue

This is the canonical execution ledger for the exploratory display-only workstream. [priorities.md](priorities.md) owns the app purpose and claim boundary.

## Current Status

| Status | Count |
| --- | ---: |
| Queued/requested | 4 |
| In progress | 0 |
| Awaiting verification | 0 |
| Explicitly deferred/blocked | 2 |
| **Unresolved total** | **6** |
| Verified historical entries | 33 |

The 2026-09-02 low-risk passes removed sixty-six unresolved rows: forty-eight verified rows are recorded in six consolidated entries, and eighteen stale or removed-surface requests are recorded in two supersession entries. These bounded passes changed no geometry or evidence authority; geometry-changing, topology-changing, calculation, certificate, and evidence-authority work remains unresolved.

## Ranked Next Objects

1. LAT-013 — Design and independently verify an optional primitive-cell tiling demonstration.
2. LAT-104 — Add verified periodic 50/50 polarity-pattern families.
3. LAT-105 — Add exact shared-vertex Platonic cell complexes and incidence ledgers.
4. LAT-063 — Supply independent periodic zero-acceleration proofs for every named deterministic case.

## Queued

### LAT-013 — Visual tiling demonstration

- **Status:** Next queued object after verified LAT-014; design/prototype task only
- **Problem:** The current repeat-cell visualization correctly states translation tiling but still asks a learner to imagine how adjacent copies join.
- **Standard object:** Use crystallographic primitive-cell notation: the owned basis/sites, three labeled primitive lattice vectors $\mathbf a_1,\mathbf a_2,\mathbf a_3$, and their parallelepiped fundamental domain. Distinguish that primitive translation tile from both a conventional high-symmetry cell and a Wigner-Seitz/Voronoi cell; the latter may explain local-neighbor geometry but is not necessarily the primitive translation tile.
- **Goal:** Explore a restrained optional teaching view for at least the simple-cubic checkerboard, showing one adjacent translated copy with a clearly distinct but non-semantic treatment and the actual cross-boundary nearest-neighbor joins. Optional ghost copies may be generated only by integer combinations of the same three primitive vectors.
- **Pre-implementation gate:** A design note must name the standard primitive object used for every gallery case and independently verify that its three vectors reproduce both the occupied geometry and polarity assignment.
- **Acceptance:** A learner can see how the selected primitive cell and one translated neighbor reproduce the pattern and relationships. This is a separate optional teaching mode or toggle, not the default repeat-cell view. The owned tile and adjacent copy are unmistakably distinct. The view uses translation only, reuses the canonical periodic coordinates and edge graph, preserves unique architrino ownership, avoids visual clutter and a false finite-universe claim, and does not alter the accepted graph.
- **Scope:** Prototype/presentation work, not a validated mathematics claim. No rotation, color swapping, or ad hoc display cell.

### LAT-104 — Periodic 50/50 polarity-pattern families

- **Status:** Queued by operator direction; active behind LAT-013.
- **Closure goal:** Extend the Lab from its present curated cases and LAT-008 finite random control to a reproducible family of global 50/50 electrino/positrino assignments on declared three-dimensional lattices.
- **Configuration families:** Preserve LAT-008 as the finite nonperiodic random owner. Add periodic families in bounded stages: simple-cubic alternating planes, the three-dimensional checkerboard, longer periodic supercell words, and source-defined two-species assignments on BCC, FCC, Diamond Cubic, and HCP point sets. Each case must identify the underlying point lattice and the polarity rule separately; a polarity pattern must not silently rename the lattice.
- **Global-ownership rule:** The lattice is one global architrino inventory. A fundamental translation tile owns each site exactly once under a declared half-open convention, while neighboring display copies are translated context rather than new architrinos. Cells, planes, and visible Platonic motifs may be many-to-many incidence overlays, but they do not acquire private copies of shared sites.
- **Acceptance:** For every periodic case, freeze primitive vectors, basis coordinates, polarity assignment, minimal polarity-preserving translation cell, exact 50/50 count in that cell, periodic boundary convention, and nearest-neighbor graph. A separately authored verifier must reconstruct the point set and assignment from the frozen rule and check unique site ownership, translation closure, count parity, edge identities, and deterministic case identity. Report pattern observables such as coordination, polarity correlation by neighbor shell, and motif incidence separately from acceleration.
- **Acceleration boundary:** A pattern may display a certified stationary acceleration result only when an independent calculation covers the declared periodic exhaustion and both polarity receiver classes. Otherwise the result is `Not calculated` or `Not established`. Equal population, geometric symmetry, or deterministic repetition establishes no motion, retention, stability, conservation, energy, or effective-spacetime claim.
- **Completion:** The gallery exposes at least one independently verified case from each accepted periodic family plus the unchanged LAT-008 random control, with exact provenance, accessible pattern/lattice separation, reproducible recalculation where applicable, and fail-closed evidence labels.

Plainly: this object studies one repeating lattice with different red/blue population rules. The sites belong to the global pattern once; the repeating tile is an accounting device, not a box that owns duplicate particles.

### LAT-105 — Shared-vertex Platonic cell-complex gallery

- **Status:** Queued by operator direction; active behind LAT-104.
- **Closure goal:** Represent exact tiled or interleaved Platonic-derived structures as periodic cell complexes over one shared lattice inventory, while exposing which lattice sites participate in which cells and which sites remain unused by the selected overlay.
- **Initial exact objects:** Begin with the cubic honeycomb and the tetrahedral-octahedral honeycomb. Treat the two alternate tetrahedra on cube corners as the stella-octangula compound, not as a space tiling. Admit any additional mixed, interleaved, dodecahedral, or icosahedral pattern only after an exact periodic coordinate and incidence construction establishes what repeats; resemblance to a Platonic solid is insufficient.
- **Incidence and unused-site ledger:** For every case, freeze the periodic site set, cell types, cell vertices, face/edge incidence, primitive translations, and polarity assignment. Report for each owned site the complete set of incident cells and whether it is unused by the selected Platonic overlay. Report coverage and incidence counts separately: a cell decomposition may cover space while an ambient lattice contains extra sites that are not vertices of that decomposition. Never duplicate a coordinate so that adjacent cells can each claim a private copy.
- **Display acceptance:** Show cell boundaries as an optional geometric overlay distinct from the nearest-neighbor or acceleration-contribution graph. Make shared vertices, adjacent translated context, owned fundamental-domain sites, and unused overlay sites visually and accessibly distinguishable without changing their identities. Provide a finite inspection crop only as a view of the declared periodic object.
- **Scientific boundary:** These are tiled-lattice configurations and collective member inventories, not packings of independent braids. Platonic cell incidence does not assign a braid, and a stationary cancellation certificate does not establish retention, stability, binding, or an effective-spacetime model. Private-vertex packing and cross-assembly history belong to [BP-017](../braid-program/work-queue.md#bp-017--packed-platonic-assembly-history-program).
- **Completion:** Independent reconstruction verifies periodic closure, exact regular-cell geometry, shared-coordinate incidence, no duplicated site ownership, cell-volume coverage for every claimed tiling, and the complete used/unused-site ledger. Browser checks verify the overlay/graph distinction and the finite-crop boundary.

Plainly: adjacent cells in this gallery meet through the same architrinos. The ledger must show both reuse and omission explicitly, so a beautiful cell overlay cannot hide duplicated or unused lattice sites.

### LAT-063 — Prove periodic zero acceleration for every deterministic curated geometry

- **Status:** Requested; the prior deterministic finite displayed-site/crop direction is rejected, and genuine per-geometry periodic calculation/certificate evidence has not yet been reported
- **Request:** Body-Centered Cubic, Face-Centered Cubic, Hexagonal Close-Packed, Simple Cubic Alternating Planes, and Diamond Cubic must each receive a green zero-acceleration Site Ledger result only if a genuine case-specific periodic repeating-pattern calculation or certificate proves zero acceleration at every site of that canonical infinite pattern. The spherical envelope is strictly a display-only viewing crop and must not define, truncate, approximate, or supply calculation rows for any deterministic curated repeating case. For each named geometry, either provide the independently validated periodic proof or retain `not established` with the exact missing canonical input, convergence rule, certificate, orbit coverage, or verifier blocker and no green result. The prior finite displayed-site/crop calculation direction is explicitly rejected and must not be used as evidence or exposed as a deterministic outcome.
- **Acceptance:** Each named geometry requires its own recorded periodic domain, inequivalent target-site orbit coverage, canonical interaction inputs, complete periodic contribution accounting and convergence/exhaustion rule, and independently validated calculation or certificate proving zero at every site. Only after that proof may its Site Ledger show the green zero result, residual `Magnitude 0` and zero vector, exact repeating-pattern scope language, and a `Show calculation` disclosure containing the certificate basis and exact contribution or symmetry/shell accounting needed to reproduce the zero result; selection and disclosed target orbit must remain consistent. Focused tests must reject green/zero presentation when any case-specific certificate is absent, reject residuals derived from the spherical viewing crop or finite displayed-site rows, reject stale or excluded periodic data, cover every inequivalent target-site orbit, and verify reload and case-switch behavior. An independent verifier, separately authored from the gallery/runtime path, must validate each case's canonical periodic inputs, completeness/convergence rule, contribution arithmetic, orbit coverage, and zero magnitude/vector; deterministic replay of the same path is insufficient. Equal electrino/positrino population never establishes cancellation. Fresh operator-viewport verification must inspect all five cases' green periodic result or exact no-green blocker state, scope, disclosure, accessibility, layout, and clean console. No named geometry may be marked calculated or zero until all corresponding implementation and validation evidence is recorded.
- **Scope:** Genuine periodic-scope acceleration calculations/certificates and their Site Ledger evidence presentation for deterministic curated repeating geometries. The spherical envelope remains display-only and has no calculation authority. Random 50/50 remains the separate finite, nonperiodic case governed by its finite included-row calculation and independent sampling boundary. Preserve existing validated periodic evidence where applicable, and never infer acceleration from equal population or claim force, motion, stability, conservation, energy, or broader physics. Keep this independent of LAT-061 endpoint presentation, LAT-062 status-circle styling, and unrelated statuses.

## Verified

### LAT-008, LAT-014, LAT-064, LAT-065, LAT-072, LAT-073, LAT-074, LAT-076, LAT-082, and LAT-097 — Final low-risk implementation reconciliation

- **Status:** Verified on 2026-09-02 from the existing canonical implementation, one strengthened HCP endpoint identity/partition test, completed focused checks, and fresh operator-viewport evidence.
- **Verified result:** Random is a reproducible exact-50/50 finite case with a complete 87-row finite Ledger and genuinely new recalculation. Every repeat-capable case owns exactly two sites; FCC exposes 18 additional continuation sites through its 12-edge owned-cell boundary and accessible structure while retaining uniform ordinary styling. The shared semantic-X deformation copy correctly diverges only where HCP's β>0 certificate boundary requires it. HCP uses periodic-zero authority only at β=0, is fail-closed for β>0, renders purple-only endpoint groups at β=1, and maps its 63 canonical repeat links to 19 true distinct group-pair highlights with one purple selection circle and no radial or duplicate-circle substitute. Every case uses exact `2.75d` crop/framing and exact main/repeat marker and ordinary-edge parity.
- **Validation:** The five focused files passed `76/76`. The [final low-risk reconciliation audit](evidence/final-low-risk-reconciliation-audit-2026-09-02.md) records the crop and companion inventories, deformation/certificate matrix, HCP source-identity and relationship partitions, FCC ownership structure, Random seed/fingerprint transition, rendered pixel/style measurements, visual inspections, and empty warning/error log.
- **Scope:** Implementation reconciliation, one test-strengthening change, and evidence capture only. App geometry, topology, coordinates, polarity data, cameras, rendering behavior, controls, calculations, certificates, and evidence authority are unchanged.
- **Completion:** Satisfied.

### LAT-017, LAT-027, LAT-028, LAT-030, and LAT-066 — Low-risk geometry and presentation verification

- **Status:** Verified on 2026-09-02 from the unchanged canonical implementation, independently authored geometry/projection checks, and fresh operator-viewport evidence.
- **Verified result:** Highlight-off ordinary identities partition exactly into retained ordinary and selected suppressed identities when highlighting is on; the suppressed set equals the canonical violet-highlight set, so nonselected relationships remain while selected edges have no ordinary under-stroke. Incremental quaternion trackball drag permits nonvertical projected Y and shared orientation across the main, unpolarized, polarized-repeat, and key consumers. Diamond has exactly four opposite-polarity nearest neighbors at world distance $d$ per ideal basis orbit; its $4d/\sqrt6$ next shell never enters the nearest graph. All cases retain exact world-space distance $d$ while their orthographic screen projections vary with edge orientation.
- **Validation:** The five focused files passed `75/75`. The [low-risk geometry and presentation audit](evidence/low-risk-geometry-presentation-audit-2026-09-02.md) records the exact Diamond identities/counts, all-case projected pixel ranges, default/reset/reload camera contract, highlight identity partition, browser drag/wheel evidence, screenshots, and empty fresh warning/error log.
- **Scope:** Verification and independent test coverage only. App geometry, topology, coordinates, polarity, cameras, rendering behavior, controls, calculations, certificates, and evidence authority are unchanged.
- **Completion:** Satisfied.

### LAT-042, LAT-047, LAT-051, LAT-052, LAT-055, LAT-056, LAT-057, LAT-058, LAT-061, LAT-062, LAT-067, LAT-077, LAT-090, LAT-091, and LAT-092 — Fourth low-risk presentation completion

- **Status:** Verified by operator direction and completed focused/browser evidence on 2026-09-02.
- **Verified result:** The canonical app has the exact certified `architrino` outcome, no Translation Rule or visible Random provenance row, polarity-colored target selection, gallery-wide polarity-neutral rule language, matched `2px` status and selection-circle outlines, sequential Random `Contribution N` rows, BCC polarity endpoints, shared status styling, one shared-conventions presentation, individual HCP neighbor-row labels without calculation-group headings, the established one-step positive-Z Alternating Planes default representative, the exact Alternating Planes repeating-pattern outcome sentence, and the corrected Checkerboard `alternating polarity` Geometry wording. The sole implementation change in this pass was the LAT-091 outcome sentence; the other rows reconciled already-present behavior.
- **Validation:** The five focused Lattice Lab test files passed after the LAT-091 correction. Fresh browser verification covered all seven cases at the operator viewport and representative beta states, confirmed the exact outcome and case naming, exercised Random recalculation and deterministic calculation disclosure, inspected responsive HCP and Diamond layouts, and found no horizontal overflow or console error. The LAT-095 source/DOM/style absence checks also cover the removed Translation Rule and overview/Primer hooks.
- **Scope:** Presentation copy, naming, style, selection cue, and already-implemented default identity only. Geometry, topology, calculations, certificates, evidence authority, deformation semantics, and unrelated controls are unchanged.
- **Completion:** Satisfied.

### LAT-079, LAT-083, LAT-093, LAT-101, and LAT-103 — Third low-risk presentation reconciliation

- **Status:** Verified on 2026-09-02 from the canonical implementation, one bounded HCP terminology correction, the completed focused suite, and fresh operator-viewport evidence
- **Verified result:** HCP's exposed Geometry explanation now uses exact sentence-medial `ABAB stacking`, while its exposed case name remains exact `Hexagonal Close-Packed`; Diamond's exposed case name is exact `Diamond Cubic` with no user-facing or accessible sublattice terminology; exactly one shared `Boundary treatment` row states that the main display includes site centers within a spherical radius of lowercase `2.75d`; and no case-fact `Calculation scope` row, hook, accessible copy, or reserved gap remains. Necessary periodic certificate methods and Random's finite/nonperiodic method remain only in the expanded Ledger disclosure.
- **Validation:** The five focused Lattice Lab test files passed `72/72`. Their existing coordinate-derived crop inventory checks confirmed exact `2.75d` constants, all seven before/after membership and relationship counts, proportional framing, Random's reproducible 88-site exact-50/50 configuration, 87 included contribution rows, genuinely new recalculation, and deterministic periodic certificates independent of the display crop. Fresh browser checks exercised all seven cases at β values `0`, `0.5`, and `1`; every state retained one shared Boundary treatment row, no Calculation scope case fact, exact exposed names, no scoped stale terms or radii, and no desktop horizontal overflow. Random recalculation changed its finite residual and reload restored the reproducible baseline. Expanded Random and BCC Ledgers retained their distinct finite and periodic methods. Narrow HCP and Diamond inspections confirmed clean wrapping and the console was clean.
- **Dependency boundary:** LAT-083's presentation dependency is satisfied by the live exact-`2.75d` implementation and focused inventory/Random evidence. This closure does not close LAT-082, whose broader historical before/after pixel-measurement and full operator-acceptance receipt remain separately unresolved.
- **Scope:** HCP terminology and four existing presentation states only. Coordinates, site and relationship identities, polarity assignments, crop radius, camera/framing, deformation behavior, calculations, certificates, controls, and all evidence authority are unchanged; internal HCP/Diamond identifiers and sublattice metadata remain intact.
- **Completion:** Satisfied.

### LAT-069, LAT-085, LAT-089, LAT-096, and LAT-098 — Second low-risk presentation reconciliation

- **Status:** Verified on 2026-09-02 from the canonical implementation, completed focused suite, and fresh all-case operator-viewport evidence
- **Verified result:** No user-visible or accessible phrase contains `finite spherical`, while Random 50/50 retains its independent finite/nonperiodic evidence boundary; every deformation panel uses exact `β = 1 is the maximum deformation.` with the internal endpoint safeguard unchanged; Simple Cubic Geometry no longer duplicates static X-deformation copy; the exposed BCC case name is exact `Body-Centered Cubic` with no user-facing sublattice terminology; and the exposed FCC case name is exact `Face-Centered Cubic` while its factual FCC and alternating-plane explanatory prose remains intact.
- **Validation:** The five focused Lattice Lab test files passed `72/72`, including the unchanged periodic geometry, relationship, density, and certificate checks. Fresh browser passes selected all seven cases and exercised β=1 at `1280 × 720` and `800 × 900`; they confirmed the exact replacement copy and names, absence of all scoped stale phrases from rendered and accessible presentation, no horizontal overflow, and a clean console. Desktop BCC and narrow FCC visual inspections confirmed clean wrapping and retained geometry/polarity descriptions.
- **Scope:** Presentation copy and exposed case naming only. Geometry, site and edge identities, polarity data, deformation mapping and endpoint safeguard, calculations, certificates, finite-versus-periodic authority, controls, and broader claim boundaries are unchanged; internal BCC/sublattice machine identifiers remain intact.
- **Completion:** Satisfied.

### LAT-031, LAT-032, LAT-033, LAT-044, LAT-050, LAT-068, LAT-071, and LAT-102 — Low-risk copy and heading reconciliation

- **Status:** Verified on 2026-09-02 from the canonical implementation, completed focused suite, and fresh operator-viewport evidence
- **Verified result:** `Polarity counts` begins `Every configuration in this curated gallery`; the selected case title is the single accessible case-region heading and follows all seven gallery selections; `Uniaxial Deformation`, the case title, and `Shared Display Conventions` share the exact established kicker treatment; `Main display shape` uses the exact viewing-crop sentence; Random 50/50 reports exact `Non-zero acceleration in this configuration.`; the single panel name is `Ledger`; all seven selector and case titles use their canonical title case; and the shared boundary statement retains exact lowercase `2.75d` with no spelled-out parenthetical.
- **Validation:** The five focused Lattice Lab test files passed `72/72`. A fresh `1280 × 720` browser pass selected all seven cases, confirmed exact selector/title synchronization and one `aria-labelledby` case region per case, measured matching heading styles (`rgb(189, 174, 255)`, `10px`, weight `780`, `0.8px` tracking, uppercase), confirmed the Random finite-nonperiodic red-alert copy, and found no stale `currently shown`, `Active Case Record`, `calculation exhaustion rule`, `Site Ledger`, or `two and three-quarters times d` presentation. A second all-case pass at `800 × 900` confirmed the canonical titles and exact `2.75d` sentence remained visible with no rail or app horizontal overflow. The console was clean.
- **Scope:** Copy, heading synchronization, heading presentation, and accessible naming only. Geometry, selections, calculations, certificates, finite-versus-periodic authority, and all broader claim boundaries are unchanged.
- **Completion:** Satisfied.

### LAT-054 — Use the polarity-colored selection circle for every gallery item

- **Status:** Verified; operator accepted the gallery-wide behavior
- **Verified result:** Every one of the seven gallery cases uses the same outer polarity-colored selection circle: blue for a selected electrino and red for a selected positrino. The circle follows the exact selected identity and Site Ledger linkage where applicable, and the former competing emissive/brightness cue is removed without changing marker material, shading, size, polarity data, interactions, calculations, geometry, accessibility, or evidence authority.
- **Validation:** The post-change focused suite passed `50/50`; the independent random verifier, syntax check, and `git diff --check` passed. Fresh `1280×720` browser validation exercised all seven gallery cases, confirmed the circle's visible identity/polarity/color state and accessible label, checked nondefault blue/red selection behavior, preserved Random 50/50 recalculation-to-ledger synchronization, and returned a clean console. The operator accepts the outer selection circle across every gallery member.
- **Scope:** Gallery-wide selection rendering only. Preserve selected identity, calculation-target and ledger linkage, selection interactions, polarity and coordinate data, calculations, geometry, relationship graphs, accessibility state, and all evidence and claim boundaries.

### LAT-039 — Aggregate visually coincident site groups for the β=1 display

- **Status:** Verified; operator accepted
- **Authoritative endpoint contract:** At exactly `β=1`, the desired display is visually entirely planar/aligned in all dimensions. Form display groups from the true transformed endpoint geometry using a documented rendering/equivalence threshold appropriate to visually coincident markers; literal coordinate equality is not required. No aggregation occurs for `β<1`, including immediately below the endpoint and after Reset/reload.
- **Verified result:** The live rule uses the transformed geometry and the rendered marker-diameter threshold `2 * markerWorldRadius + 1e-9`. Each visually coincident group renders as one purple sphere; source site identities and polarities remain in group metadata; internal-group lines are suppressed; external group-to-group relationships are deduplicated; and the underlying calculations, geometry evidence, and claims are unchanged. Ordinary markers and relationships return below `β=1` and after Reset/reload.
- **Validation:** The focused suite passed `41/41`; the independent stationary oracle passed `2/2`; `git diff --check` passed; and the fresh browser console was clean. Focused aggregation checks cover group membership, internal-line partition, external deduplication, endpoint-only activation, and restoration. The operator accepts the planar/aligned purple endpoint, absence of extra lines, and legibility under rotation.
- **Scope:** Maximum-endpoint display aggregation only. The purple marker is not a new site, polarity, species, cancellation result, or physical claim. LAT-029/LAT-038 semantics and clipping safeguards are unchanged.
- **Completion:** Satisfied.

### LAT-041 — Add a lower-right canvas polarity legend

- **Status:** Verified; operator accepted
- **Verified result:** The lower-right legend renders red `Positrino` above blue `Electrino`, with exact color-label pairing, one accessible label, accepted `16px` marker size, and no collision across case changes, deformation, or rotation. Live Three.js swatches share the main canvas sphere geometry, polarity materials, color space, camera, and lights, producing the accepted subtle above-right highlight direction and intensity.
- **Validation:** The focused suite passed `41/41`; the independent stationary oracle passed `2/2`; `git diff --check` passed; and the fresh browser console was clean. DOM/rendered checks confirm order, size, material/light sharing, accessibility, bounds, and noncollision. The operator accepts the corrected lighting.
- **Scope:** Display legend only. Polarity assignments, actual-site materials, picking/render identities, calculations, geometry, evidence boundaries, claims, and LAT-039 purple aggregation are unchanged.
- **Completion:** Satisfied.

### LAT-029 — Uniaxial Deformation β control semantics

- **Status:** Verified; operator accepted
- **Verified result:** The live title is `Uniaxial Deformation`; its paragraph uses deformation/undeformed language without compression terminology; and the compact readout contains only `β =` plus the value from `0` through `1`. `β=0` is the undeformed baseline and `β=1` is the maximum supported nondegenerate semantic-X deformation, with the visible-to-internal mapping applied once and clipping safeguards retained.
- **Validation:** The terminal focused suite passed `41/41`; the fresh browser console was clean; and `git diff --check` passed. The independent stationary oracle passed `2/2` as a separate regression check. The operator accepts the title, paragraph, β-only readout, and endpoint semantics.
- **Scope:** Static display/control semantics only. `β` is not velocity and establishes no relativistic, motion, stability, conservation, energy, or broader-physics claim.
- **Completion:** Satisfied.

### LAT-034 — Preserve repeat-miniature joining lines across deformation

- **Status:** Verified; operator accepted
- **Verified result:** The repeat miniature retains all `15` canonical connector identities at `β=0`, `β=0.5`, and `β=1`, with no extra identities. Geometrically short endpoint connectors use their actual deformed endpoints and remain visible without invented replacement geometry.
- **Validation:** The terminal focused suite passed `41/41`; the fresh browser console was clean; and `git diff --check` passed. The independent stationary oracle passed `2/2` as a separate regression check. The operator accepts that all intended repeat-miniature lines remain shown throughout deformation.
- **Scope:** Repeat-miniature line retention only. Canonical geometry, identities, β semantics, clipping safeguards, and claim boundaries are unchanged.
- **Completion:** Satisfied.

### LAT-036 — Match Site Ledger outcome font size to the Lattice Primer case text

- **Status:** Verified; operator accepted
- **Verified result:** The Site Ledger outcome retains `Net acceleration is zero at every site.` and its green-check hierarchy while matching the Lattice Primer `Simple Cubic Checkerboard` text's `14px` font size. Accessibility and the existing evidence boundary remain intact.
- **Validation:** The terminal focused suite passed `41/41`; the fresh browser console was clean; and `git diff --check` passed. The independent stationary oracle passed `2/2` as a separate regression check. The operator accepts the visible font-size parity.
- **Scope:** Outcome font size only; no result, hierarchy, calculation, or broader-claim change.
- **Completion:** Satisfied.

### LAT-040 — Rename the second left-panel subpanel to `What You Are Seeing`

- **Status:** Verified; operator accepted
- **Verified result:** The second left-panel subpanel displays exactly `What You Are Seeing`; the old contraction is absent, the accessible label matches, and the contents and typography are preserved.
- **Validation:** The terminal focused suite passed `41/41`; the fresh browser console was clean; and `git diff --check` passed. The operator accepts the exact title correction.
- **Scope:** Title copy only.
- **Completion:** Satisfied.

### LAT-038 — Keep uniaxial deformation on one fixed semantic axis

- **Status:** Verified; operator accepted
- **Verified result:** The underlying geometry deforms only semantic X monotonically across the supported `β` range. The repeat-cell miniature now retains its undeformed reference fit instead of recomputing a β-dependent bounding-sphere scale, so unchanged Y/Z dimensions no longer appear to stretch and the apparent deformation axis no longer switches.
- **Validation:** Component-wise fixed-semantic-X and retained-reference-scale checks passed within the final `41/41` focused suite. The independent stationary oracle passed `2/2`; the fresh browser console was clean; and `git diff --check` passed. The operator accepts that only X deforms from the start, with no early two-axis stretch or later axis switch.
- **Scope:** Static display-transform and repeat-miniature fit correction only. `β=0` remains undeformed, `β=1` remains the maximum supported nondegenerate endpoint, and semantic model axes, canonical identities, evidence boundaries, and clipping safeguards are unchanged.
- **Completion:** Satisfied.

### LAT-035 — Make Z upward in the default display orientation

- **Status:** Verified; operator accepted
- **Verified result:** The positive semantic Z axis points upward in the default main lattice view and synchronized lower-left XYZ key. The same display quaternion is restored on initial load, case reset, and reload; unrestricted trackball rotation remains available afterward. Semantic X/Y/Z model definitions, key anchoring and labels, and existing controls are unchanged.
- **Validation:** Default/reset/reload/key-synchronization checks passed within the final `41/41` focused suite. The worker reports live main-view/key synchronization through initial/default display, arbitrary trackball rotation, case reset, and reload; the fresh browser console was clean; and `git diff --check` passed. The operator accepts that Z is up in the default display.
- **Scope:** Display-default orientation only; no coordinate relabeling or data remapping.
- **Completion:** Satisfied.

### LAT-037 — Align spherical overlay polar caps with semantic ±Z

- **Status:** Verified; operator accepted
- **Verified result:** The dotted spherical overlay is authored with its north and south caps on semantic `+Z` and `−Z`, replacing the prior semantic-±Y pole construction. The overlay already inherits the same root quaternion as the lattice and key, so all three now remain synchronized without relabeling model coordinates.
- **Validation:** The final `41/41` focused suite includes an explicit independent geometry check that the envelope poles are semantic `±Z`. The worker reports live cap alignment and shared-quaternion behavior through trackball rotation, case reset, and reload; the fresh browser console was clean; and `git diff --check` passed. The operator accepts the polar axes as vertical in the Z-up default.
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
- **Artifacts:** [certificate](analysis/simple-cubic-checkerboard-cancellation-certificate.md), `src/apps/lattice-lab/SimpleCubicStationaryLedger.js`, and `scripts/verify-lattice-lab-simple-cubic-checkerboard.mjs`.
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

### LAT-009 — Polarity-edit interaction

- **Status:** Removed from the first-version UI; deferred
- **Request / acceptance:** The earlier two-site polarity swap, its card, explanatory copy, and runtime interaction are absent from the active Lab. Do not replace it with a one-site flip or another non-reference editing control. Reconsider editing only after LAT-008 supplies an independently checked assignment class and result.

### LAT-075 — Establish an all-space periodic HCP Ledger for nonzero β

- **Status:** Deferred; do not begin implementation or research without renewed operator authorization
- **Future obligation:** For deformed HCP at β>0, derive an all-space periodic Ledger result from the canonical deformed repeating pattern. Declare the complete periodic contribution accounting and convergence/exhaustion rule, cover every inequivalent target-site orbit, and validate the result with an independently authored verifier. The spherical display crop and any finite truncation have no calculation authority and cannot substitute for the periodic proof.
- **Current boundary:** Preserve the certified periodic HCP result at β=0 and the verified not-established Ledger state for every β>0 until this future obligation is completed and independently verified. Equal population, purple endpoint aggregation, visual symmetry, or deterministic replay does not establish acceleration cancellation or any force, motion, stability, conservation, energy, or broader physics claim.

## Superseded / withdrawn

### LAT-015, LAT-094, and LAT-100 — Later accepted deformation and companion-panel designs

- **Status:** Superseded and closed on 2026-09-02.
- **Reason:** LAT-015's $\lambda=\sqrt{1-\beta^2}$ proposal conflicts with LAT-029's accepted static coordinate $s_x=1-0.99\beta$. LAT-094's request to duplicate established zero-result copy inside Uniaxial Deformation conflicts with the accepted separation that keeps outcomes in the Ledger and uses only HCP's necessary β>0 blocker in the deformation panel. LAT-100's title, edge-free design, and Random exclusion conflict with the accepted `Unpolarized Repeat Pattern`, its honest represented-endpoint nearest-neighbor networks, and Random's conventional simple-cubic companion.
- **Validation boundary:** Focused tests deliberately require the current β map, reject zero-result duplication in the deformation panel, require the current companion title and exact conventional-cell networks, and retain Random's finite/nonperiodic calculation boundary. The [final low-risk reconciliation audit](evidence/final-low-risk-reconciliation-audit-2026-09-02.md) records the live copy and inventory matrix.
- **Completion:** Satisfied by supersession; no app source, geometry, calculation, certificate, or evidence-authority change was made.

### LAT-043, LAT-045, LAT-046, LAT-048, LAT-053, LAT-059, LAT-060, LAT-070, LAT-078, LAT-080, LAT-081, LAT-084, LAT-086, LAT-095, and LAT-099 — Primer and overview removal reconciliation

- **Status:** Superseded and closed on 2026-09-02.
- **Reason:** LAT-095 removed the `Lattice Primer` surface, and the later overview cleanup removed `What You Are Seeing`. These rows exclusively requested edits, ordering, or deletions within one or both removed surfaces, so implementing them against dead UI would recreate obsolete content or hooks.
- **Migration audit:** [lattice-primer-removal-audit-2026-09-02.md](evidence/lattice-primer-removal-audit-2026-09-02.md) inventories every former Primer paragraph, its factual/authority class, the surviving owner search, and its disposition. No paragraph qualified for migration: required facts remain in Geometry, Boundary treatment, Shared Display Conventions, `How This Pattern Repeats`, Uniaxial Deformation, or the Site Ledger; density repetition, chemistry analogies, and unnecessary disclaimers remain absent.
- **Validation boundary:** Canonical-source tests prove the Primer and overview case fields, DOM, runtime hooks, style hooks, labels, and ARIA references are absent. Fresh all-case desktop and responsive browser inspection found no reserved gap, truncation, collision, stale text, overflow, or console error.
- **Completion:** Satisfied by supersession; no geometry, calculation, certificate, control, or evidence-authority change was made.
