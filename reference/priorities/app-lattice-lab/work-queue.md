# Architrino Lattice Lab Work Queue

This is the canonical execution ledger for the exploratory display-only workstream. [priorities.md](priorities.md) owns the app purpose and claim boundary.

## Ranked Next Objects

1. LAT-015 — Increasing-strength compression coordinate.

## Queued

### LAT-015 — Increasing-strength compression coordinate

- **Status:** Next queued object after verified LAT-016; implementation not started
- **Acceptance:** Replace the user-facing $\lambda$ slider with a dimensionless static display coordinate $0\leq\beta<1$, where $\beta=0$ is uncompressed and $\lambda=\sqrt{1-\beta^2}=1/\gamma$ is computed exactly once at the model boundary. Use a documented near-one interactive maximum so $\lambda$ never reaches zero. Preserve existing internal $\lambda$-based geometry, neighbor classification, and cancellation semantics; keep the ledger placeholder and design pause unchanged.
- **Checks:** Verify $\beta=0\mapsto\lambda=1$, monotone increasing compression, the near-one endpoint, and retained $\lambda$ outputs. The UI must not describe $\beta$ as physical motion or make an SR/GR claim.

### LAT-017 — Diamond-cubic projected-edge visual audit

- **Status:** Queued behind LAT-015; focused QA follow-up only
- **Observed issue:** The operator reports that purple Diamond-cubic nearest-neighbor links can appear to have unequal screen lengths in the three-dimensional view.
- **Implementation fact:** Both Lattice Lab views currently use orthographic cameras. The audit must therefore test view-direction foreshortening under orthographic projection rather than assume perspective scaling.
- **Acceptance:** Independently enumerate the Diamond-cubic nearest-neighbor graph from coordinates and prove that every edge consumed by both renderers has world-space length exactly $d$, with coordination number four at every ideal interior site. Compare the canonical identities with the clipped/rendered identities and reject every longer edge, including the $4d/\sqrt6$ next shell. Then measure projected screen lengths across representative camera orbits and establish whether orientation-dependent foreshortening alone explains the visual variation.
- **Polarity check:** Separately verify the declared two-sublattice polarity topology. A red site may be described as having blue nearest neighbors only where the coordinate-derived neighbor identities and polarity assignment establish that fact; do not infer it from the camera angle.
- **Scope:** Do not change either camera or add learner-facing copy unless the audit finds a real geometry or rendering defect. Record focused tests, browser screenshots, exact edge counts/identities, fresh-reload console state, and the result for operator handoff.

### LAT-014 — Minimal owned-tile presentation

- **Status:** Queued behind LAT-011; presentation correction only
- **Acceptance issue:** A repeat-cell panel must not visually present its surrounding many-site periodic context as though that full context were the owned repeat cell. In FCC alternating planes, the owned tile is exactly two sites.
- **Acceptance:** The default repeat-cell view shows the minimal translational owned tile. Any surrounding translated copies are either absent or unmistakably marked as non-owned context and are never counted as owned sites. The accepted canonical coordinates, nearest-neighbor identities, and unique half-open site ownership remain unchanged.
- **Scope:** Do not alter the accepted neighbor geometry. Adjacent translated copies belong only in the separate optional LAT-013 teaching mode.

### LAT-013 — Visual tiling demonstration

- **Status:** Queued behind LAT-011 and the LAT-014 default-view correction; design/prototype task only
- **Problem:** The current repeat-cell visualization correctly states translation tiling but still asks a learner to imagine how adjacent copies join.
- **Standard object:** Use crystallographic primitive-cell notation: the owned basis/sites, three labeled primitive lattice vectors $\mathbf a_1,\mathbf a_2,\mathbf a_3$, and their parallelepiped fundamental domain. Distinguish that primitive translation tile from both a conventional high-symmetry cell and a Wigner-Seitz/Voronoi cell; the latter may explain local-neighbor geometry but is not necessarily the primitive translation tile.
- **Goal:** Explore a restrained optional teaching view for at least the simple-cubic checkerboard, showing one adjacent translated copy with a clearly distinct but non-semantic treatment and the actual cross-boundary nearest-neighbor joins. Optional ghost copies may be generated only by integer combinations of the same three primitive vectors.
- **Pre-implementation gate:** A design note must name the standard primitive object used for every gallery case and independently verify that its three vectors reproduce both the occupied geometry and polarity assignment.
- **Acceptance:** A learner can see how the selected primitive cell and one translated neighbor reproduce the pattern and relationships. This is a separate optional teaching mode or toggle, not the default repeat-cell view. The owned tile and adjacent copy are unmistakably distinct. The view uses translation only, reuses the canonical periodic coordinates and edge graph, preserves unique architrino ownership, avoids visual clutter and a false finite-universe claim, and does not alter the accepted graph.
- **Scope:** Prototype/presentation work, not a validated mathematics claim. No rotation, color swapping, or ad hoc display cell.

## In progress

### LAT-011 — Ledger visibility and hierarchy redesign

- **Status:** Design awaiting operator acceptance; rendered mathematical content remains temporarily cleared
- **Observed problems:** The prior ledger was a dense tight-text audit trail and did not meet the at-a-glance teaching goal at the live narrow viewport.
- **Current safe state:** The rendered panel now says only `Site ledger is being redesigned.` It displays no mathematical zero, shell row, vector, magnitude, or stale certification status while the replacement is unfinished. The panel footprint remains stable.
- **Design gate:** [site-ledger-presentation-design.md](site-ledger-presentation-design.md) maps the certified periodic, finite nonperiodic, and not-established states to a learner-facing hierarchy. Do not expose the replacement UI until the operator accepts that design.
- **Acceptance:** Restore a large icon-plus-text outcome, relative magnitude and vector where available, and two readable shell summaries, with individual contributions behind `Show calculation`. Certified checkerboard may use `In this ideal repeating pattern, matching pulls cancel at every site at release.` Non-certified cases must not inherit that sentence or a zero result.

## Awaiting verification

No rows.

## Verified

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
- **Request / acceptance:** Before implementation, define the finite randomization rule and whether it preserves equal red/blue population, then verify that rule independently. `Random configuration` is first in the gallery selector as the teaching starting point. Its ledger-adjacent `Randomize again` action creates a new finite, nonperiodic configuration; its repeat-cell panel states `Not applicable — this is not a repeating lattice.` The ledger computes the actual displayed finite-configuration acceleration contributions and residual, including a normalized vector magnitude with clear finite scope/units. Its status uses icon plus text and color: green `zero residual in stated scope` or red `nonzero residual in stated scope`. A nonzero residual means nonzero initial acceleration only under that displayed ledger. Do not infer an all-space result, animate motion, or claim stability or conservation. Keep population balance distinct from acceleration cancellation.

### LAT-009 — Polarity-edit interaction

- **Status:** Removed from the first-version UI; deferred
- **Request / acceptance:** The earlier two-site polarity swap, its card, explanatory copy, and runtime interaction are absent from the active Lab. Do not replace it with a one-site flip or another non-reference editing control. Reconsider editing only after LAT-008 supplies an independently checked assignment class and result.

## Superseded / withdrawn

No rows.
