# Architrino Lattice Lab Work Queue

This is the canonical execution ledger for the exploratory display-only workstream. [priorities.md](priorities.md) owns the app purpose and claim boundary.

## Ranked Next Objects

No queued objects.

## Queued

No rows.

## In progress

### LAT-011 — Ledger visibility and hierarchy redesign

- **Status:** In progress; rendered mathematical content temporarily cleared
- **Observed problems:** The prior ledger was a dense tight-text audit trail and did not meet the at-a-glance teaching goal at the live narrow viewport.
- **Current safe state:** The rendered panel now says only `Site ledger is being redesigned.` It displays no mathematical zero, shell row, vector, magnitude, or stale certification status while the replacement is unfinished. The panel footprint remains stable.
- **Acceptance:** Restore a large icon-plus-text outcome, relative magnitude and vector where available, and two readable shell summaries, with individual contributions behind `Show calculation`. Certified checkerboard may use `In this ideal repeating pattern, matching pulls cancel at every site at release.` Non-certified cases must not inherit that sentence or a zero result.

## Awaiting verification

No rows.

## Verified

### LAT-012 — Gallery-wide static uniaxial compression

- **Status:** Verified as a geometry/view diagnostic; non-checkerboard cancellation remains unestablished
- **Verified result:** The fixed-X one-slider control is enabled for all six curated cases. Main and repeat-cell positions and nearest-neighbor lines transform with $\lambda$, translation-vector readouts show the transformed vectors, red/blue counts are unchanged, and the existing fixed-screen-size sphere path remains common to every case.
- **Evidence boundary:** Only simple-cubic checkerboard displays the independently checked zero outcome. BCC, FCC, HCP, simple-cubic alternating planes, and diamond-cubic show `Static transformed geometry only`, `No acceleration result`, and `Magnitude not established`; no per-case periodic cancellation checker is attached.
- **Browser check:** At $\lambda=0.4$, all six sliders remained enabled and their miniature relationship incidences remained `12, 16, 24, 24, 12, 8`. Checkerboard alone reported `certificatePassed=true` / `outcome=zero`; all five other cases reported `false` / `unavailable`.
- **Scope:** Static display transform only. No EOM evolution, stability, conservation, physical-medium, Lorentz, or non-checkerboard cancellation claim.
- **Completion:** Satisfied.

### LAT-010 — Half-open cell ownership, complete nearest-neighbor graph, and central highlight

- **Status:** Verified
- **Verified result:** Every repeat cell uses a half-open fundamental-domain ownership record with exactly one owned representation per actual site. The panel uses one plain translation sentence plus the three declared vectors and no jargon legend. The miniature constructs the displayed site set from the owned sites plus their immediate periodic images, then renders the complete nearest-neighbor graph induced by that set. This closes the previously omitted continuation-to-continuation relationships without adding decorative links. `Highlight repeat cell` is off by default and affects only the main canvas: ordinary relationship lines are hidden while the thick established light-purple highlighted set is shown; no diagonal frame, ghost trace, sphere resizing, or miniature mutation remains.
- **Independent check:** A separately written enumeration reconstructs every main-crop site pair, every owned-site periodic incidence, and every pair in the miniature's displayed site set. It requires exact equality with the rendered relationship sets and checks every segment against the one case-specific nearest-neighbor distance. The displayed miniature edge counts are `15, 27, 63, 63, 15, 7` for checkerboard, BCC, FCC, HCP, alternating-plane simple cubic, and diamond-cubic. The checkerboard adds exactly the four continuation-to-continuation links identified by visual QA; a negative test rejects diagonal $\sqrt{2}d$ bridges. Its central main-canvas highlight remains `12` owned-site incidences rendered as `11` unique physical links. Under X compression at $\lambda=0.4$, only the `4` incidences at the current shortest transformed distance `0.4d` are highlighted (`3` unique physical links), while the `8` longer deformed reference incidences at `d` are explicitly excluded rather than mislabeled nearest neighbors.
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
