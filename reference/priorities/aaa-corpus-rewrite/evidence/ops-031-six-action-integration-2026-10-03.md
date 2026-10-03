# OPS-031 Action Model and Braid Recovery integration — October 3, 2026

## Scope and disposition

The operator's “do 1” approved the six-group proposal and its independent review. This receipt covers only groups 5–6: items 4–9 of the [September 26 proposal](../analysis/ops-031-repair-proposal-2026-09-26.md). All six items are accepted and implemented as the exact prepared replacements. The [Action Model Comparison](../../../../content/markdown/aaa/validation/simulations/action-energy/action-model.md) defines the receiver acceleration record and derived unoriented axis, states that the transmitter acceleration weight is applied once, qualifies two comparative-cost claims, and repairs the Pros hierarchy. [Braid Recovery Requirements](../../../../content/markdown/aaa/noether-braid/braid-recovery-requirements.md) declares effective observer velocity, its sea-flow subtraction, calibrated speed, and weak-field/low-speed domain.

No equation-viewer identity, displayed equation, heading, scientific receipt, solver code or generated artifact was changed. No scientific obligation O1–O3 is discharged. CRW-005 remains closed; this is the bounded OPS-031 repair follow-through, not new scheduled coverage. Shared control updates belong to the coordinating agent.

## Source identity and bindings

The before snapshots are retained in `.tmp/ops-031-six-repairs/action/`; durable SHA-256 identities, measured by `shasum -a 256`, are:

| Source | Before | After |
| --- | --- | --- |
| Action Model | `2d413668871bbd536249ba6e358964ad112977dcc26c147e1a94f7f78d3fea4f` | `70e720b3c1d46b18ec74ed0a4476707d1defe8aaca42b45ac107952eaf6d1ed3` |
| Braid Recovery Requirements | `fa44f6a09ffd2f0a61b4d46bb5022164590f03e95c6d76174a488193ac5ca3b2` | `0c92b4355082869f7dee573ab2b989d79538d0c8e2a2bd19ba8acc347cb82e24` |

A pre-edit literal basename search using `rg` found no matches under `scripts/`, `tests/`, `src/` or `.github/`; matches under the two review/operations priority owners are historical reviews, the coverage inventory and current proposals. Direct inspection of `scripts/build-equation-mapping-corpus.mjs` confirms its scan-based equation registry is an additional consumer despite the absence of literal basename matches. Existing display links are preserved; source-context regeneration remains for the authorized publication process, with `node scripts/build-equation-mapping-corpus.mjs --write` if its check reports drift. This task did not invoke regeneration or a corpus-wide freshness check.

`git --no-optional-locks status --short` restricted to the two targets emitted no pre-edit changes. Each before excerpt matched exactly once. The task-local replacement script checked that source bytes remained identical between preparation and write, preventing an intervening edit from being silently overwritten.

## Mathematical and editorial verification

The full two target documents were read, including the unchanged comparison formulas, operator diagnostics, requirements ladder and certificate. Their direct owners were checked at the affected passages: [Simulation Perspective](../../../../content/markdown/aaa/validation/simulations/perspective.md#effective-observables-and-states-quantum-like-layer) separates the received vector from the inferred axis and hidden transmitter provenance; the Action Model's own explicit canonical per-hit equation uses one weight; [Proper Time and Time Dilation](../../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md) defines the effective velocity and chain rule separately from native velocity. These owners were not changed by this worker.

Independent mathematical references for the narrow repairs are elementary identities, not agreement between edited passages. A nonzero vector spans one line, while zero spans a zero-dimensional subspace; the vectors $(1,0,0)$ and $(0,1,0)$ sum to $(1,1,0)$, whose line matches neither contributor. With $c_f=1$ and $D_t=1/2$, one prescribed weight is two and its accidental square is four. Rescaling effective spatial coordinates and the calibrated speed together leaves the squared speed ratio invariant. The first-order Taylor identity $\sqrt{1-2u-b}=1-u-b/2+O((2u+b)^2)$, for small $u=U/c_0^2$ and $b=\|\mathbf w_{\mathrm{eff}}\|^2/c_0^2$, verifies the retained weak-clock coefficients as a comparison target. None of these identities proves a recovered clock mechanism, EOM trajectory, numerical performance ranking or implementation error.

No extra substantive correction was introduced during self-review. Known scientific obligations remain with their existing owners. This author self-review does not substitute for the separate consequential-change review requested in the six-group approval.

## Focused checks and limits

- The task-local proposal extractor first returned the expected two blocks on a known before/after example; only then was it run on the proposal. All six replacements matched uniquely and were applied exactly.
- The task-local syntax checker first passed known inline-math and nested-list cases. It then rendered all 18 inserted inline formula occurrences with installed KaTeX using `throwOnError: true` and `strict: error`; all passed. Installed Marked rendered the actual Method 1 Pros and Cons as parent items with nested children.
- The inserted chapter link targets were directly read. The Perspective heading and clock chapter title were inspected; no existing links or anchors were renamed.
- Scoped `git diff --check` on both corpus targets emitted no diagnostics. `git diff --stat` reported exactly six inserted and six removed lines across these targets, consistent with the six replacements.

The checks establish source application, bounded syntax and Markdown structure. No browser visual audit, solver run, benchmark, external-source re-verification, generated write or publication was performed. A changed source hash, a governing observation contract assigning independent data to the axis, a changed canonical acceleration weight, or a different effective-coordinate convention would invalidate the corresponding closure statement and require reassessment.

Coordinator closure: separate verification is complete at the final hashes and limitations in the [six-group closure receipt](ops-031-six-group-closure-2026-10-03.md). This addendum supersedes any pending-review wording above.
