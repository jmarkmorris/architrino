# EOM Review Remediation Prompt — round five

Hand the block below to an implementing thread. It inherits `reference/op/codex-goal-seeking-prompt-template.md` as its meta procedure.

---

Closure goal: Close every remaining finding in `reference/priorities/app-solver/archive/eom-code-review-2026-07-24.md` — land the mechanical soundness and consistency fixes (S1, S2, S4, S6, S7), profile before optimizing (S3, then S5), pin the untested halt code (S8), and return the two scope questions and the M10 contract question to the operator rather than deciding them unilaterally.

# Objective

Four remediation rounds have already landed against `reference/priorities/app-solver/archive/eom-code-review-2026-07-24.md`. Read that report first; the `Round-four findings` section (S1–S9) is the live work list, and the status header records what is already closed. Everything below refers to findings by their S-number.

No finding remaining is a soundness regression. The work is: one surviving instance of an already-fixed class, two tier/route consistency gaps, one lifetime-contract cleanup that closes two items at once, a measured-before-optimized performance question, and a set of small cleanups. Two items are operator decisions and one is a contract question — do not resolve those in code.

Success is: every S-item either fixed, measured, or returned to the operator with a specific question; the three Python oracle parity suites and the Borg refinement ladder green; and no new evidence-independence violations introduced.

# Execution strategy

Evaluate whether to split before starting. A reasonable default split, if you choose multiple workers, is by translation unit to avoid write collisions:

- Worker A: `CertifiedAcceleration.cpp` (S1), plus the `exact_difference_interval` documentation item in S9.
- Worker B: `ExactPairBatch.cpp` (S2, S6 first bullet, S7 partial), `RootTimeBudget.cpp` (S7).
- Worker C: `History.cpp` / `History.hpp` (S3 measurement, S4, S7 items).
- Worker D: `CoupledEvolution.cpp` / tests (S7 joint plumbing marks, S8 coverage).

S3 and S5 are sequenced, not parallel — S3's measurement decides whether S5 is worth doing at all. If you stay single-agent, do S1/S2/S4 first (they are independent and mechanical), then S3's measurement, then the rest.

# Work items

## Group 1 — mechanical, do these first

**S1. Close the last R4 width instance.** `CertifiedAcceleration.cpp`, the direct-cell fallback in `assemble_cell` (currently near :1068-1073) scales the pointwise box enclosure by `Interval::point(Interval(cell_lower, cell_upper).width())`. `width()` is upward-rounded, so the main term carries a one-sided loss the remainder does not cover. Replace with `exact_difference_interval(cell_upper, cell_lower)` — the same helper the centered route already uses. Do not touch the other `.width()` call sites in that file: they are contraction tests, refinement scores, and tolerance gates, where upward rounding is conservative and correct. Confirm that distinction before editing, and state in your report which sites you classified each way.

**S2. Make the MPFR uniform-circular self-pair predicate agree with binary64 at exactly `v = c_f`.** `ExactPairBatch.cpp`: the binary64 predicate (near :259-263) admits the exact-equality case via `(tangential_speed.lower() == field_speed.lower() && tangential_speed.upper() == field_speed.upper()) || tangential_speed.upper() <= field_speed.lower()`. The MPFR twin (near :2625-2626) has only the `<=` arm, so it rejects the sharp `v = c_f` rail the binary64 comment at :252-258 was written for. Add the equality branch in MPFR terms so the two tiers accept the same set. This must not widen acceptance beyond the binary64 predicate — the goal is agreement, not permissiveness. Add a fixture seeding `tangential_speed == field_speed` with forced precision escalation, so the two routes are pinned to agree; that fixture is the falsifier for this fix.

**S4. Give `PinnedSegment` one lifetime contract.** `History.cpp` `pin()` returns a self-owning handle on the disk path and a borrowing handle (`PinnedSegment(nullptr, ptr)`) on the in-memory path. `slot.memory` is already a `shared_ptr<const Block>`; pass it as `owner_` so the handle is uniformly self-owning for one refcount. Then reconsider the `const_iterator` item in S7: with a self-owning pin you can make the pin outlive `operator++` and keep `forward_iterator_tag` honest, rather than downgrading the tag to `input_iterator_tag`. Pick one and say why. Update the header comment that currently documents the asymmetry as deliberate.

## Group 2 — measure before optimizing

**S3. Bracket `correlated_position_hull` — but profile first.** `History.cpp` (near :1436-1467) pins every segment before testing overlap, with no `break` and no bracketing, though the `time` argument is a reception point so at most two segments contribute. Before changing it: measure. Build a disk-mode run with a retained window past 1024 segments and record wall time and block-load counts with the current code. Then bracket the loop using `segment_index_at(time.lower())` / `segment_index_at(time.upper())` (both already binary-search) and re-measure the same run. Report both numbers. Per the repo's cost rule, geometry and segment counts alone do not establish cost — only the profile does.

**S5. Decide the warm cell-reuse path on S3's evidence.** Warm *cell* reuse is defeated by `retained_suffix` index shifting: `ExactPairBatch.cpp` (near :713-721 and :3682-3695) counts the leading index-aligned run from 0, and the Borg cache trims on every accepted step, so `aligned_equal_segments` is 0 on exactly the runs the optimization targets. The *prefix* bound in the same function is correctly time-rebased and does fire. Two options: rebase the cell path the same way the prefix path is rebased, or delete the cell-reuse path and keep only prefix reuse. Choose on measured evidence from S3 plus a warm-reuse hit-rate count — if the cell path never fires and S3 was the dominant cost, deleting it is the honest outcome. Do not rebase on the assumption that it will pay.

## Group 3 — consistency and cleanup

**S6. Name the load-bearing strictness at both sites.** Two predicates hold today only because a different condition elsewhere is strict. (a) The prefix walk's second block (`ExactPairBatch.cpp` near :1162-1187, MPFR twin near :3514-3527) publishes `stable_negative_prefix_upper == search_upper` for a self-pair with no bracketed roots, asserting `residual < 0` on a closed interval whose right endpoint has `residual == 0` under the coincident-endpoint rule; it survives only because the consuming gate's `receiver_stays_subfield` uses strict `<`. (b) S2's tier disagreement is the same class. Add a comment at each site naming the strictness it depends on, so a future relaxation reads as a soundness decision rather than a style edit. Comments only — do not change the predicates.

**S7. Clear the leftovers.**

- `CoupledEvolution.cpp` (near :3244-3260): `event_joint_receiver` / `event_joint_transmitter` are unconditionally `nullptr` under the joint+event bar. Either delete the dead resolution or mark both it and the first-pass/refinement regulator asymmetry with a comment saying they are unreachable while the bar stands. If the bar is ever lifted, the refinement call silently dropping joint state relative to the first pass becomes a real bug — say so in the comment.
- `CertifiedAcceleration.cpp` (near :1893): `complete_ordered_pair_domain = true` ships on a path that throws before reaching it — the same tautology class as the already-deleted `reconstruction_matches`. Delete it, or make it an independent predicate. If you delete it, check the fixture CLI emitter, the header declaration, and the Python oracle for schema impact, and pin the removal in a test the way `reconstruction_matches` was pinned.
- `History.cpp`: `retained_suffix` recomputes the fingerprint over the suffix and silently drops `uniform_circular_endpoint_certificate_`, while `appended()` carries the certificate through. Either revalidate and carry it over, or comment both sites explaining the asymmetry and its fail-closed consequence (a trimmed self-pair loses the fast path and degrades into extra bisection).
- `RootTimeBudget.cpp`: `nonnegative_point` is a no-op alias of `Interval::point` asserting an invariant it never checks, on eight published-radius call sites. Add `if (!(value >= 0.0)) throw` or rename it.
- `History.cpp`: dead `limit = 16U` initializer overwritten inside the lock; join validation pins each segment twice then walks the sequence a third time — carry `right` forward into `left`.
- `CertifiedTraversal.cpp` (near :204-208): the causality gate uses token-interval midpoints while `BlockExclusion.cpp:53` uses directed bounds. Align them on directed bounds, or comment why the conservative disagreement is intended.

**S8. Pin the untested halt code and mark the redundant arm.** `caustic_transit_uncertified` appears only at its two emission sites in `CoupledEvolution.cpp` — nothing in `tests/`, no fixture key, no ladder script. Add coverage that drives a joint-seeded run into an ordinary finite-width event and asserts the halt code. Separately, the ladder arm added for `unsupported_caustic_or_singular_chart` is now unreachable because the short-circuit fires first on every rejected step; keep it as defence-in-depth but comment which of the two is primary.

**S9 documentation item. Name the compensated-arithmetic dependency.** `exact_difference_interval` in `CertifiedAcceleration.cpp` is a Shewchuk Two-Diff whose validity requires strict IEEE-754 binary64 with no excess precision and no contraction. `-ffp-contract=off` is set on all targets and covers FMA fusion, but nothing names the dependency — under `-ffast-math`, `-Ofast`, or an x87 target the error term computes as zero and the routine returns a width that does not contain `b − a`, silently. Add a comment above the helper naming the requirement and a `static_assert(std::numeric_limits<double>::is_iec559)`. Consider whether a build-time guard against `-ffast-math` is worth adding.

## Group 4 — return to the operator, do not decide in code

Bring these back as questions, one at a time, ranked with your recommendation first:

1. **Is the joint+event bar stricter than intended?** The S-round fix established that retrying without the optional joint correlation is a certified-safe degradation, but it is applied only when `adjudicated_finite_width_pairs` is non-empty. A joint-seeded run meeting an *ordinary* finite-width event still halts outright, where the same `joint_histories.clear()` retry would keep it alive. Present the trade-off; do not widen the bar's escape hatch on your own judgement.
2. **Should the joint-state fallback be recorded in the certificate?** Joint state is dropped permanently after fallback, and nothing in `NativeCoupledEvolutionCertificate` records that it happened — a consumer can only infer it from an empty `joint_histories` map, which is what the Borg CLI's `jointStateFallbackApplied` diagnostic does. Native-fixture consumers have no equivalent. Propose promoting the inference to a certificate field.
3. **M10 — the tail contract.** `require_finite_width_boundary_clearance` gates the boundary residual away from zero but adds no below-boundary Gaussian tail term, and no spec sentence defines the certified quantity. If the certified quantity is the retained-history integral, one sentence in the README or the function comment discharges it. If it stands in for the infinite-past master-equation integral, an explicit tail term is missing and the event path already has the machinery (`tail_impulse_bound`) to copy. This is a theory-contract question, not an implementation choice — ask before building either.

Also flag, without acting: `model_fingerprint` does not hash joint enablement, so a checkpoint from a joint-seeded run and one from a non-joint run over identical controls are fingerprint-identical and each resumes as the other. Whether `joint_histories` is a control or state is a judgement call the bar made load-bearing.

# Constraints

- Read the code path's actual obligation before proposing against it. Propose against the implementation and its declared contract, not a remembered model of either — several findings in this report were originally filed against a remembered model and had to be corrected (the `memory_boundary_contact` flag is reachable and must not be deleted; the `lower_bound`-over-pinning-iterator concern was misattributed).
- Do not introduce a check that cannot fail. Two constant-true certificate fields have already been removed from this codebase for exactly that reason; do not add a third, and do not "fix" a tautology by keeping the field and hardcoding it.
- A reference implementation or oracle must not be modified in the same change as its subject. If a fix requires both the native path and the Python oracle to change, say plainly that their agreement then tests implementations rather than the rule, and state the rule separately.
- Cost claims are empirical. S3 and S5 require profile numbers, not segment counts or geometry arguments.
- Keep one canonical implementation path per responsibility; do not add a compatibility shim or a second path for any of these fixes.
- Preserve the two JSON key-casing dialects (snake_case fixtures, camelCase Borg responses) if you touch any emitter — they are baked into checked fixtures.
- Git operations belong to the operator's Codex workflow. Use non-git tools to observe the working set, keep the write set scoped to the files each item owns, and treat a dirty tree as normal ambient state.

# Verification

Per-item, the falsifier is named above (a fixture for S2, profile numbers for S3/S5, a test for S8). Beyond that, before declaring completion:

- Build and run all three fixture CLIs in their `all` form, the Borg shadow modes, and the refinement ladder at the documented refinement levels, including the one-thread versus four-thread byte-identity comparison.
- Run the three Python oracle parity suites.
- For S1, S2, and S4 — the three changes that touch certified paths or lifetimes — arrange independent verification rather than self-review: a separate agent or thread that reads the changed code cold against the stated contract. Their agreement with you is evidence only if they did not inherit your reasoning.
- Confirm no emitted fixture bytes changed except where a fix is expected to change them, and name each expected change.

# Reporting

Follow `reference/op/operator-explanation-standard.md`: inline `Plainly:` interludes after every technical unit, never more than three consecutive technical paragraphs without one. A closing recap does not substitute.

On completion, report: executive summary; per-S-item disposition (fixed / measured / returned to operator, with evidence); the S3 profile numbers before and after; which verification suites ran and their results; key decisions, especially the S4 iterator-tag choice and the S5 rebase-or-delete choice with the evidence behind each; durable capture decision — update `reference/priorities/app-solver/archive/eom-code-review-2026-07-24.md` status header and note anything worth promoting; and a `Closure goal:` line naming the next objective or `none required`.

Update the review report's status header as you go, so it stays the live source of truth rather than a historical document.
