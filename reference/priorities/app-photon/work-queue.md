# Photon Work Queue

This is the canonical execution ledger for remaining Photon work. [priorities.md](priorities.md) owns the app contract and claim boundary.

## Ranked Next Objects

1. `reusable_absolute_history_solver` — [PHO-001](#pho-001--reusable-absolute-history-solver). Status: `In progress`.
2. `local_c_parameterization` — [PHO-002](#pho-002--local-c-parameterization). Status: `In progress`.
3. `shared_visual_extraction` — [PHO-007](#pho-007--shared-visual-extraction). Status: `Deferred / blocked`.
4. `runtime_module_decomposition` — [PHO-008](#pho-008--runtime-module-decomposition). Status: `Deferred / blocked`.

## In progress

### PHO-001 — Reusable absolute-history solver

- **Status:** In progress
- **Priority object:** `reusable_absolute_history_solver`
- **Request / acceptance:** Generalize the shared facade beyond Photon circular histories, expose receiver phase records, deepen phase-spread and rejected-root diagnostics, and harden observer-field reconstruction for local-$c$ translation.
- **Evidence / blocker:** Existing Photon circular-history facades are compatibility/reference capabilities; general solver ownership routes to App Solver.
- **Completion:** The generalized capability has explicit ownership, independently checked root/field fixtures, and no Photon-only assumption in its reusable contract.

### PHO-002 — Local-c parameterization

- **Status:** In progress
- **Priority object:** `local_c_parameterization`
- **Request / acceptance:** Replace or supplement provisional $\gamma$ mapping with declared Noether sea state variables when available and explain no-catch-up or stale-root regimes.
- **Evidence / blocker:** Blocked on a source-bound local-$c$ theory input for final authority.
- **Completion:** Inputs, mapping, diagnostics, and claim boundary are explicit and focused tests pass.

## Queued

No rows.

## Deferred / blocked

### PHO-007 — Shared visual extraction

- **Status:** Deferred / blocked
- **Priority object:** `shared_visual_extraction`
- **Request / acceptance:** Extract shared marker, orbit, tint, and trail helpers only when cross-app maintenance demonstrates the need.
- **Evidence / blocker:** No duplication-only abstraction is authorized.
- **Completion:** One shared visual implementation preserves both apps’ behavior.

### PHO-008 — Runtime module decomposition

- **Status:** Deferred / blocked
- **Priority object:** `runtime_module_decomposition`
- **Request / acceptance:** Split formula and app runtimes into focused modules behind the existing behavior-preserving composition roots.
- **Evidence / blocker:** Wait until reviewed correctness boundaries stabilize.
- **Completion:** No parallel implementation or compatibility path is introduced; focused tests and browser behavior pass.

## Awaiting verification

No rows.

## Verified

### PHO-006 — Configuration Search comparison

- **Status:** Verified
- **Priority object:** `configuration_search_absolute_history_comparison`
- **Request / acceptance:** Add a background deep-comparison path, local-$c$/phase-family filters, and independently produced summaries for export.
- **Evidence:** The [deep-comparison contract](configuration-search-deep-comparison.md) defines the shared-engine execution boundary, pre-evaluation local-$c$ filter, post-evaluation phase-family filter, responsive yield and progress behavior, and versioned export provenance. `PhotonSearchRuntime.js` evaluates both co-moving and absolute-history modes for every deep candidate, `PhotonRuntime.js` dispatches from a cloned normalized state, and the controls expose both filters.
- **Completion:** Verified 2026-09-02. `node --test tests/photon-runtime.test.js tests/photon-runtime-orchestration.test.js` passed 62/62, including candidate filtering, progress, event-loop yields, both history modes, and export/import provenance retention. The UI-independent state snapshot is not an independent scientific oracle; no physical-photon, phase-lock-retention, stability, helicity, or Malus-law claim follows.

### PHO-003 — Moving-apparatus delta-x mapping

- **Status:** Verified
- **Priority object:** `moving_apparatus_delta_x_mapping`
- **Request / acceptance:** Make absolute-history translation the authoritative $\Delta x$ diagnostic and define clearer stale-root aging thresholds.
- **Evidence:** The [moving-apparatus $\Delta x$ packet](moving-apparatus-delta-x-mapping.md) declares absolute history authoritative, co-moving output comparison-only, exact braid-center offsets, and retained-root age bands of fresh through one, aging above one through two, and stale above two reference cycles. `PhotonFormulaRuntime.js` emits `photon-moving-apparatus-delta-x.v1`; the diagnostics panel exposes authority, age counts, and oldest retained-root age while preserving separate bounded no-catch-up and stale-window classifications.
- **Completion:** Verified 2026-09-02. `node --test tests/photon-runtime.test.js tests/photon-runtime-orchestration.test.js` passed 60/60. The result remains display-only-visualization evidence and supplies no photon retention, stability, physical-separation, or constitutive-law result.

### PHO-005 — Substrate mapping refinement

- **Status:** Verified
- **Priority object:** `substrate_mapping_refinement`
- **Request / acceptance:** Refine I/M/O branch-sum mapping to transverse observer-field amplitudes while separating co-moving diagnostics from absolute-history results.
- **Evidence:** The [source-bound mapping packet](substrate-mapping-refinement.md) fixes $W^{\mathrm{acc}}=c_{\mathrm{sig}}/|D_t|$, keeps $D_r/D_t$ as root-playback data, defines exact I/M/O sample and harmonic ledgers, declares both mode identities and all inputs, and supplies algebraic, fit, root-solve, and coverage residuals with operator-checkable falsifiers. `PhotonFormulaRuntime.js` emits `photon-substrate-mapping-refinement.v1`; focused tests cover both modes, the I/M/O partition, coefficient-level closure, and fail-closed causal-factor rows.
- **Completion:** Verified 2026-09-02. `node --test tests/photon-runtime.test.js` passed 54/54. This is display-only-visualization evidence and supplies no photon retention, stability, physical-field, helicity, Malus-law, or Noether sea constitutive result.

### PHO-004 — Absolute-source-history self-hit

- **Status:** Verified
- **Priority object:** `absolute_source_history_self_hit`
- **Request / acceptance:** Deepen rejected-root reasons and extend sweeps only when new transmitter-history families are introduced.
- **Evidence:** The [self-hit admission packet](absolute-source-history-self-hit-admission.md) gives every numerical helical root candidate an ordered disposition: `singular_root`, `jacobian_floor_failure`, `transversality_not_certified`, or `admitted_regular_root`. Runtime and sweep summaries expose candidate, admitted, rejected, and reason counts; phase families retain singular candidates only as non-promotable diagnostics. No new transmitter-history family was introduced, so the provenance-bound [756-case receipt](helical-self-hit-phase-lock-sweep.receipt.v1.json) was not regenerated or expanded.
- **Completion:** Verified 2026-09-02. `node --test tests/photon-runtime.test.js tests/photon-runtime-orchestration.test.js` passed 61/61, including a twelve-row boundary fixture with three roots in each disposition and sweep count closure. No self-interaction, phase-lock, stability, retention, or physical-photon result follows.

## Superseded / withdrawn

No rows.
