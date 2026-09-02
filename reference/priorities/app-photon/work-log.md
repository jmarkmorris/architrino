# App Photon Work Log

This file is the chronological work log for the `app-photon` priority area. Use it for dated agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use `brainstorming.md` for provisional ideas, insights, conceptual maps, and draft corpus-promotable text when this priority area has one. Use `priorities.md` for strategy, status, blockers, and promotion routing, and use `work-queue.md` for accepted executable tasks and their local order. Keep focused proof packets, certificates, app specs, and requirement notes in their own sibling files when they need a stable structure.

## Log Entries

### 2026-09-02 PHO-006 Deep Configuration Comparison Closure

Closed PHO-006 with [configuration-search-deep-comparison.md](configuration-search-deep-comparison.md). The Photon configuration search now has a scheduled deep path over the full constructed candidate pool, with a pre-evaluation local-$c$ filter, a post-evaluation measured phase-family filter, progress updates, and event-loop yields between candidates. Both short and deep searches reuse the same candidate builder, prescribed-path analysis, scoring, and serializer.

Every retained deep result records `photon-configuration-deep-comparison.v1` provenance: producing path, analysis identity, normalized-state snapshot, UI independence after dispatch, explicit lack of an independent scientific oracle, both evaluated history modes, and normalized filters. JSON export and import preserve this record alongside the existing diagnostics and mode comparisons.

Focused validation passed 62/62 tests. The result establishes workflow behavior and provenance retention only; it does not establish phase-lock retention, stability, a physical photon branch, helicity recovery, or Malus-law recovery.

### 2026-09-02 PHO-004 Self-Hit Admission Closure

Closed PHO-004 with [absolute-source-history-self-hit-admission.md](absolute-source-history-self-hit-admission.md). Every numerical helical same-transmitter root now carries an ordered admission record with $D_t$, $|D_t|$, the $10^{-4}$ transversality floor, signed margin, and one of four dispositions: admitted regular root, singular root, Jacobian-floor failure, or uncertified transversality.

Runtime and sweep summaries now close candidate roots into admitted plus rejected counts and aggregate exact rejection reasons. The diagnostics panel distinguishes records with numerical candidates from regular roots and rejected roots. Singular candidates remain inspectable but cannot become phase-lock candidates or physical evidence.

No new transmitter-history family was added, so the existing provenance-bound 756-case sweep was intentionally not expanded or regenerated. Focused validation passed 61/61 tests, including a twelve-row fixture with three roots in each disposition and a sweep-summary count identity. The result remains display-only-visualization evidence.

### 2026-09-02 PHO-003 Moving-Apparatus Delta-X Closure

Closed PHO-003 with [moving-apparatus-delta-x-mapping.md](moving-apparatus-delta-x-mapping.md). `PhotonFormulaRuntime.js` now emits `photon-moving-apparatus-delta-x.v1`, labels absolute history as the authoritative $\Delta x$ diagnostic, labels co-moving output comparison-only, and records the normalized separation, reference radius, ratio, and braid-center offsets.

Every retained source root now carries an age in declared reference cycles: fresh through one cycle, aging above one through two, and stale above two. The diagnostics panel reports the three counts and oldest age while retaining `stale_history_window` and `no_catch_up_root` as separate bounded scan outcomes. The age bands are display-review thresholds rather than physical lifetimes.

Focused validation: `node --test tests/photon-runtime.test.js tests/photon-runtime-orchestration.test.js` passed 60/60. The threshold fixture exercised ages $0.8$, $1.5$, and $2.5$ reference cycles, while existing tests preserved co-moving/absolute-history separation and $\Delta x$ geometry. No photon retention, stability, physical-separation, or Noether sea constitutive claim follows.

### 2026-09-02 PHO-005 Source-Bound I/M/O Mapping Closure

Closed PHO-005 with [substrate-mapping-refinement.md](substrate-mapping-refinement.md). Corrected the stale priority-level observer acceleration formula from a receiver-playback ratio to the canonical transmitter-side weight $c_{\mathrm{sig}}/|D_t|$, retained $D_r/D_t$ solely as signed root-playback data, and aligned the ideal plane-wave comparison with the selected $c_{\mathrm{sig}}$.

`PhotonFormulaRuntime.js` now emits `photon-substrate-mapping-refinement.v1`. The record declares co-moving versus absolute-history identity, speed and observer inputs, common-period fit inputs, and active I/M/O transmitter counts; partitions every sampled field into I/M/O contributions; fits the same reference harmonic per layer and in total; and reports branch-sum, harmonic-closure, total-fit, root-solve, and coverage diagnostics. Incomplete root coverage remains visibly partial and cannot be mistaken for algebraic closure.

Focused validation: `node --test tests/photon-runtime.test.js` passed 54/54, including exact I/M/O sample closure, coefficient-level harmonic closure, distinct mode labels, and existing fail-closed causal-factor checks. The result remains measured only at display-only-visualization grade and supplies no physical photon or constitutive-law evidence.

### 2026-07-02 Moving-Circular Row Production

Resumed the paused Photon #1 row work after the priority-directory split and kept the live tracker concise. Current branch state carries the fourth-pass implementation: Photon is the app-level constrained source-history provider, and the shared analysis facades produce moving-circular source-root rows, source velocity rows, source phase-at-hit rows, observer-field contribution rows, and observer-field summary rows.

Verification recorded for the completed row-production pass: `node --test tests/photon-runtime.test.js` and `git diff --check`.

The next app-photon action is to deepen rejected-root reasons for same-source rows.

### 2026-07-02 Photon Guide Promotion Note

Migrated from `priorities.md` so the app tracker keeps current implementation and queue material separate from promotion history.

Promotion note: the named preset descriptions, Virtual Observer branch-sum equations, and analyzer-fit formulas have been promoted into the reader-facing Photon Guide. The remaining app-specific control ranges, verification checklist, and open work queue stay priority-only.
