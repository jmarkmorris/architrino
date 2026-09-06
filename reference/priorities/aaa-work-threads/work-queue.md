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
13. `data_file_layout_completion` — Owner: this queue. Status: `In progress`.

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

### AWT-015 — Data-file layout completion

- **Status:** In progress
- **Request / acceptance:** File the 32 machine-readable data files still at the top level of nine active lanes into their layout subdirectories, updating every consumer that references them by path. Scope, destinations, consumers, hazards, and validation are in [campaigns/data-file-layout-completion.md](campaigns/data-file-layout-completion.md).
- **Evidence / blocker:** Stage A is complete: six files with no code consumer are filed. Stage B is the remaining 26, whose consumers span `scripts/`, `tests/`, and `src/`; three of them feed the content-integrity gate. Stage B is blocked on that gate being green, because `scripts/build-equation-mapping-corpus.mjs --build` currently fails for a pre-existing reason unrelated to this work, and a red gate cannot show whether a consumer edit broke something.
- **Completion:** No data file remains at the top level of an active lane, no reference to a former path survives, and the content-integrity gate, the priority validator, and the Node and Python suites pass.

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

## Awaiting verification

No rows.

## Verified

No rows.

## Superseded / withdrawn

No rows.
