# AAA Work Threads Work Queue

This is the canonical cross-workstream routing queue. It does not replace any owner’s execution ledger and is not independently ranked.

## Rules

1. Keep only cross-workstream actions whose owner and acceptance boundary are already declared.
2. Route implementation to the owning directory’s `work-queue.md`.
3. Remove an item when the owner queue closes it or when the unified ranking no longer selects it.

## Ranked Next Objects

1. `eom_bounded_population_acceptance_stack` — Route to [App Solver](../app-solver/work-queue.md). Status: `In progress`.
2. `braid_campaign_1_execution` — Route to [Braid Program](../braid-program/work-queue.md). Status: `Deferred / blocked`.
3. `causal_wake_update_law_joint_acceptance` — Route to [Master-Equation Closure](../master-equation-closure/work-queue.md). Status: `In progress`.
4. `pressure_dependent_noether_sea_response` — Route to Master-Equation Closure. Status: `Deferred / blocked`.
5. `atomic_nuclear_review_cleanup` — Status: `Deferred / blocked`.
6. `spacetime_review_cleanup` — Status: `Deferred / blocked`.
7. `lorentz_composition_target` — Status: `Deferred / blocked`.
8. `branch_spectrum_transport_map` — Status: `Deferred / blocked`.
9. `terrestrial_transported_clock_target` — Status: `Deferred / blocked`.
10. `full_ppn_completion` — Status: `Deferred / blocked`.
11. `horizon_diagnostics_consumer` — Status: `Deferred / blocked`.
12. `speed_symbol_consolidation` — Status: `Deferred / blocked`.
13. `unbooked_session_item_recovery` — Status: `Deferred / blocked`. Owner assignment is the first action.

## In progress

### AWT-001 — EOM bounded-population acceptance stack

- **Status:** In progress
- **Request / acceptance:** Close retained-history residency, refinement and precision ladders, deterministic CPU/SIMD evidence, and the first claim-ready binary run packet under the App Solver queue.
- **Evidence / blocker:** App Solver owns execution; scientific fate remains with Braid Program.
- **Completion:** The owner queue closes its bounded-population acceptance object with independent validation.

### AWT-004 — Causal wake update joint acceptance

- **Status:** In progress
- **Request / acceptance:** Close the causal wake update, finite coincident same-transmitter continuation, and all three conserved accounts on the same update.
- **Evidence / blocker:** Master-Equation Closure owns the derivation and joint acceptance.
- **Completion:** The owner queue records a jointly accepted update and accounts, or a decisive no-go.

## Deferred / blocked

### AWT-002 — Braid Campaign 1

- **Status:** Deferred / blocked
- **Request / acceptance:** Execute the frozen Campaign 1 workload without changing the production instrument in the same change.
- **Evidence / blocker:** Blocked on instrument reacceptance and certified close-approach root completeness.
- **Completion:** Braid Program books one accepted fate or a declared failure under the frozen gate.

### AWT-005 — Pressure-dependent Noether sea response

- **Status:** Deferred / blocked
- **Request / acceptance:** Produce one accepted-branch response row shared by clock, signal, inertia, effective-metric, material, and cosmology consumers.
- **Evidence / blocker:** Requires an accepted branch carrying causal wake-state closure.
- **Completion:** One source-bound response record satisfies the shared packet’s acceptance boundary.

### AWT-006 — Atomic and nuclear review cleanup

- **Status:** Deferred / blocked
- **Request / acceptance:** Normalize remaining Noether sea stress notation where ownership is clear and verify the review-reported composite-braid and bare-time notation drift before editing.
- **Evidence / blocker:** Review notes are routing signals, not proof evidence; the nucleon item lacks enough local context for an immediate edit.
- **Completion:** Each reviewed occurrence is corrected, rejected, or assigned to a named owner.

### AWT-007 — Spacetime review cleanup

- **Status:** In progress
- **Request / acceptance:** Resolve the $c_0^2$ versus $c_f^2$ convention, deduplicate derivations by owner reference, repair named imports, and audit the listed symbol collisions.
- **Evidence / blocker:** The speed-factorization lemma in [Lorentz Kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md#weak-homogeneous-speed-factorization-lemma) now proves the role split: primitive causal-root equations use $c_f$, observer formulas use $c_0$, and $c_0/c_f=1/\chi_{\mathrm{sea},0}$. The remaining blocker is an accepted same-record constitutive and photon branch that decides whether $\chi_{\mathrm{sea},0}=1$ or $\chi_{\mathrm{sea},0}>1$, plus the outstanding owner-by-owner derivation deduplication, named-import repairs, and symbol-collision audit.
- **Completion:** Every named drift class has one canonical owner and no unresolved occurrence in the scoped files.

### AWT-008 — Lorentz composition target

- **Status:** Deferred / blocked
- **Request / acceptance:** Derive nested closed-return velocity composition from the same causal-root ledger that supplies $\xi=1/\gamma_\star$, then test the existing $R_u^{(q)}$ row.
- **Evidence / blocker:** Requires the accepted moving-branch ledger.
- **Completion:** A source-bound derivation and residual replace the bare imported target.

### AWT-009 — Branch-spectrum transport map

- **Status:** Deferred / blocked
- **Request / acceptance:** Map within-chart even-power residuals and separator/resonance sidebands to existing chromaticity, clock/signal, image-variance, and directional-transport rows on one branch ledger.
- **Evidence / blocker:** No separately fitted diagnostic family is allowed.
- **Completion:** One retained branch ledger drives all mapped residuals.

### AWT-010 — Terrestrial transported-clock target

- **Status:** Deferred / blocked
- **Request / acceptance:** Derive the local $\mathbf u_{\mathrm{sea}}(\mathbf X,T)$ profile for portable-clock, fiber-loop, and Sagnac comparisons.
- **Evidence / blocker:** Constitutive flow must be declared before comparing candidate profiles; CMB-comoving velocity is not a substrate premise.
- **Completion:** One accepted flow row predicts all three comparison families.

### AWT-011 — Full PPN completion

- **Status:** Deferred / blocked
- **Request / acceptance:** Attach primary sources and numerical tolerances to the Lense-Thirring, $\xi_{\mathrm W}$, and $\zeta_{1,2,3,4}$ rows.
- **Evidence / blocker:** The current reduced synthetic likelihood cannot close them.
- **Completion:** Each added channel has a versioned benchmark and residual.

### AWT-013 — Horizon diagnostics consumer

- **Status:** Deferred / blocked
- **Request / acceptance:** Route the six horizon-chirality diagnostics into an existing strong-field packet only if one instrument consumes the same source-record horizon condition.
- **Evidence / blocker:** Do not create a stub validator without a consumer.
- **Completion:** An existing packet adopts the rows or they remain non-executable prose.

### AWT-014 — Speed-symbol consolidation

- **Status:** Deferred / blocked
- **Request / acceptance:** Audit ownership and collapse theorems before placing the listed speed symbols in one canonical Lorentz/effective-metric table.
- **Evidence / blocker:** Preserve provenance-bound legacy values and $c_f=1$ numerical instantiation.
- **Completion:** Every symbol has one owner, scope, and collapse relation.

### AWT-015 — Unbooked session-item recovery, 2026-09-03

- **Status:** Deferred / blocked
- **Priority object:** `unbooked_session_item_recovery`
- **Request / acceptance:** Assign one declared owner to each row in the table below, then route it to that owner's `work-queue.md` and delete the row here. This object exists because the items were generated in operator sessions and were never booked anywhere; it is a routing backlog, not a result.
- **Provenance:** Recovered on 2026-09-03 from a review of five idle operator session transcripts. The transcripts themselves are not repository artifacts and are not citable evidence; every row below must be re-derived or re-authored by its owner before it carries any grade. Nothing in this row is graded, and no row licenses a claim.

| # | Recovered item | Nearest owner | Routing status |
| ---: | --- | --- | --- |
| 1 | Hermann Weyl gauge episode for [historical-context-and-missed-opportunities.md](../../../content/markdown/aaa/philosophy-history/historical-context-and-missed-opportunities.md), plus the Weyl, Yang, Mills, and Wilson absences from `archie/major-thinkers.md`. The corpus cites Weyl only as a symbol; the man, the 1918–1929 episode, and the origin of the term are absent. | **None declared.** No `reference/priorities` workstream owns `philosophy-history`. Nearest by content is [mapping-one-nature-many-theories](../mapping-one-nature-many-theories/work-queue.md). | Owner assignment required first. |
| 2 | Non-decoupling channels as discriminating falsifier targets: anomaly matching and the colour count from $\pi^0\to\gamma\gamma$, the dimension-5 neutrino operator, the symmetry-breaking pattern, light-species counting, and the two naturalness failures. Proposed as the places where the inverse problem is not many-to-one, sited near the existing gauge recovery gate. | [mapping-standard-model](../mapping-standard-model/work-queue.md), which owns gauge recovery targets. | Not routed. |
| 3 | Terminology hazard: treating an emitted wake's spatial period as an assembly extent conflates pitch with radius. `reactions/radiation.md` currently avoids the term entirely, which is the correct default to preserve rather than a gap to fill. | Archie canon; controlled reference, so propose wording before editing. | Not routed. |
| 4 | Photon formation-geometry relaxation: whether the geometry an emitted assembly takes in the dense near-zone wake environment differs from its free-flight geometry. Distinct from, and must not be confused with, distance-accumulating expansion, which the photon-transport burden in [treasure-physics-overlooked.md](../../../content/markdown/aaa/philosophy-history/treasure-physics-overlooked.md) and [euclidean-void.md](../../../content/markdown/aaa/foundations/euclidean-void.md) already bars. Falsifier: identical relaxed geometry in dense and ambient backgrounds retires it. | [app-photon](../app-photon/work-queue.md) or [mapping-electromagnetism](../mapping-electromagnetism/work-queue.md). | Not routed. |
| 5 | Near-field magnitude lemma promotion. [MEC-008](../master-equation-closure/work-queue.md#mec-008--same-transmitter-coincidence-domain-reachability) records the result in its 2026-09-03 progress block, but there is no Promotion Map row and no reader-ready standalone document, so promotion today would require the rewrite that promotion policy forbids. | [master-equation-closure](../master-equation-closure/work-queue.md). | Needs a Promotion Map row and an independent-authorship gate. |
| 6 | `force row` survives in eight live files against the deprecation in [AGENTS.md](../../../AGENTS.md): `mapping-equations/eq-01-05-root-conservation-packet.md`, `mapping-equations/eq-02-04-translating-binary-shared-record-instantiation.md`, `master-equation-closure/spiral-vp1-inactive-memory-proof.md`, `master-equation-closure/spiral-vp1-root-transport-interval-proof.md`, `app-solver/work-log.md`, `mapping-benchmarks/casimir-effect.md`, and two files under `master-equation-closure/history/` that are already revoked and arguably inert. | Each owning directory. | Not routed. |
| 7 | `lane` carries two meanings. Operator prose uses it for a workstream, where `workstream` is already canonical; reader-facing prose in `content/markdown/aaa` uses it for a corpus section, where a reader has no way to resolve it. | [aaa-corpus-rewrite](../aaa-corpus-rewrite/work-queue.md) for the reader-facing sense. | Not routed. |

- **Evidence / blocker:** Row 1 is blocked on owner assignment, which is an operator decision rather than a technical one. Rows 2 through 7 are blocked only on routing. Nothing here is blocked on a derivation.
- **Deliberately excluded:** `node scripts/build-textbook-md-pdf.mjs --write` is not a lost item. Generator `--write` runs only on explicit operator request or in the branch/PR process, so its standing-pending state is the policy working, not a backlog.
- **Completion:** Every row above is either routed to an owner queue or rejected with a stated reason, and this object is removed.

## Awaiting verification

No rows.

## Verified

No rows.

## Superseded / withdrawn

No rows.
