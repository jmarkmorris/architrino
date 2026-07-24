# EOM Solver Code Review — 2026-07-24

> **Remediation status (three fix rounds, verified 2026-07-24).** Nearly every finding below is now closed in source. Verified FIXED: H1, H2 (structurally, via a new `PinnedSegment` owning handle that also retired the round-2 copy regression), H3, H5, H6 (both server and single-shot), M1 (barred, not repaired), M2, M4, M5 (all four self-pair predicates), M6, M7, M8, M9, M10 event path, M11 `-ffp-contract=off`, M12 (scoped + documented), plus `causal_domain_area` (now Interval ops), the Gaussian-tail bound (now a directed-rounding MPFR helper), `Interval::midpoint()` overflow, the precision-ladder wrap, the centered-form remainder, and both vacuous self-checks (one deleted, one replaced by a real input-vs-published predicate).
>
> **Still open after round three:** `monotone_finite_width_integral` remainder still assumes an exact midpoint (see §H4-monotone below); centered main term scaled by upward-rounded `width()`; M10 finite-width acceleration path still has no tail term or spec sentence; `long double` remains in `Interval.cpp` trig phase reduction (same cross-platform class as the fixed `causal_domain_area`); no sanitizer wiring; three dead `far_field_*` result fields; README missing three CLI modes; wall-clock still labelled `*_cpu_seconds`. New consequential items from the joint+event bar are recorded in §Round-three new findings.

Status: findings report, comments only. No source files were modified. Four parallel review lanes covered all 30,025 lines under `src/eom` (core evolution, certified-numerics kernel, history/traversal layer, CLIs/build/diagnostics). Every finding carries a severity, a file:line anchor, and a falsifier. Findings marked **[verified]** were independently re-read against the live source by the consolidating reviewer; the rest are graded as reviewed-once.

Plainly: four independent readers each took a quarter of the solver and hunted for real defects — places where a "certified" number could quietly be wrong, where output could differ between runs, or where the code has grown enough duplication to be a maintenance hazard. The most important claims were then re-checked a second time against the actual code before being written down here.

## Overall verdict

The solver's core disciplines hold up under adversarial reading: fail-closed statuses everywhere, no unordered containers on result paths, fixed pairwise reduction trees, no `fesetround` (so thread-invariant rounding by construction), correct MPFR directed rounding in the interval kernel, textbook atomic checkpoint publication, zero TODO/FIXME debt in the entire tree. The Krawczyk operator conditions, budget accounting (no double-spend or leak), traversal pair-coverage bitmap, and worker-pool determinism were all explicitly audited and found sound.

The defects cluster into four systemic families rather than scattered one-offs:

1. **Round-to-nearest scalars feeding certified bounds** — the one recurring anti-pattern. About a dozen sites compute a width, radius, or tail bound with ordinary double arithmetic and then treat it as an outward enclosure. Each is fixable with idioms the codebase already uses correctly elsewhere.
2. **Warm-start prefix reuse missing side conditions** — the stable-negative-prefix optimization transfers a "no root here" claim across snapshots without checking two of the theorem's hypotheses.
3. **Presentation-layer soundness** — fixture JSON truncated to 6 digits, a mid-response throw that corrupts the shadow-server protocol stream, locale-sensitive parsing/formatting on claim-carrying paths.
4. **Duplication drift hazards** — three double→text routines, four `outward_sum` copies (one wrong), triplicated timing structs, ~400–500 duplicated CLI JSON lines.

Plainly: the mathematical engine is in very good shape. The bugs live at the edges — tiny rounding shortcuts that violate the letter of the guarantee by a hair, a clever caching optimization missing two safety checks, and output code that throws away precision or can garble a response. None of it requires redesign; all of it is patchable with patterns the code already uses.

## HIGH findings (fix first, in this order)

### H1. Warm prefix reuse can skip an uncertified window — `ExactPairBatch.cpp:607-635` [verified]

The stable-negative-prefix reuse gate checks status, receiver subfield speed over the reception span, and transmitter token equality over `[search_lower, prior_prefix_upper]`, but never checks `prior.searched_lower <= request.search_lower`. The prior "residual < 0" claim holds only on the prior attempt's searched window. `CoupledEvolution.cpp:5930-5933` sets the current `search_lower` to the active bound when causal-prefix exclusion certifies, else to the history start token — so the window can extend backward between snapshots. When it does, reuse skips `[history_start, prior.searched_lower)` with no certificate over it, and a real root there vanishes from a certificate still reporting `root_free_complement = true`. Falsifier: proof that the effective search lower bound is monotone non-increasing across snapshots for a given source.

Related in the same gate: no receiver-history equality check through the prior reception. The negativity-transfer argument needs the receiver path unchanged at the prior reception time; the code checks only the current receiver's subfield speed. If accepted retained histories are append-only token-stable prefixes across snapshots this is discharged — but nothing asserts it. Cheap fix: a receiver-side token check symmetric to `same_transmitter_prefix_tokens`.

Plainly: the solver caches "I already proved there is no signal-arrival solution in this early time region" from one step to the next to save work. The proof it cached was for a specific region and a specific receiver path. The cache lookup forgets to confirm the new question asks about the same region and the same receiver — if either differs, it can reuse a proof that does not apply, and miss a real interaction.

### H2. Dangling segment references in disk-paged history mode — `History.cpp:845-884` with `ExactPairBatch.cpp:557, 872`

`HistorySegmentSequence::operator[]` returns a reference into a thread-local round-robin block cache that evicts after 16 distinct disk blocks. `ExactPairBatch` holds segment references across long walks over other segments (the correlated self-chord path walks every segment from emission to reception), so for histories longer than ~16 blocks the held reference is dereferenced after guaranteed eviction. Disk mode is live in production paths (`eom_borg_shadow_cli.cpp:2051`). Fix direction: copy segments held long-term, or return a block-pinning handle. Falsifier: retained windows in disk-mode runs capped below 64 × cached-blocks-per-thread segments per history.

### H3. Locale-sensitive `strtod` on a claim-carrying path — `CoupledEvolution.cpp:5936` [verified]

The warm-root-exclusion bound is parsed with `std::strtod(token.c_str(), nullptr)` while every other numeric parse in the module goes through `std::from_chars` or `Interval::decimal_token`. Under a non-"C" `LC_NUMERIC` locale, `"1.5"` parses as `1.0`, shifting the prefix-stability bound in the permissive direction. The same locale family issue affects `History.cpp:64-70, 202-207` (`decimal_token`/`parse_decimal` via default-locale streams and `strtod`), `ExactPairBatch.cpp:35-49`, `Checkpoint.cpp:43-48` (fingerprint formatting honors global-locale grouping), and 16 unchecked `strtod(..., nullptr)` calls in `eom_borg_shadow_cli.cpp` (lines 162-164, 227-246, 464-470, 774, 781, 1040) that also accept garbage suffixes. No binary currently sets a locale (verified: zero `setlocale`/`imbue`/`locale::global` hits), so this is latent — but any future embedding that touches the global locale silently corrupts tokens and fingerprints. Fix: `std::from_chars` everywhere, `imbue(std::locale::classic())` on every formatter stream.

Plainly: the code turns numbers into text and back constantly, and a few of those conversions use functions whose behavior changes with the computer's language settings. Today nothing changes those settings, so nothing is wrong — but one line of GUI code in some future host could flip a decimal point and quietly change physics.

### H4. Round-to-nearest arithmetic feeding certified bounds (cluster) [spot-verified]

All instances of one anti-pattern; each is ulp-scale except where noted:

- `CenteredAffine.cpp:11-13` [verified]: `radius_about` computes `max(center - lower, upper - center)` in plain RTN arithmetic backing a declared `_upper` remainder bound; can under-cover by ½ ulp. The correct outward idiom already exists at `JointSharpRow.cpp:262-264`. Blast radius today: fixture CLI only, but it is a certification API.
- `CertifiedAcceleration.cpp:702-717, 861-868` : centered-form remainders assume an exact midpoint; the computed midpoint can be off-center so that max|τ−m| exceeds width/2 — in few-ulp cells (exactly where bisection drives before exhaustion) the remainder term can be under-charged by ~25% of itself, not just an ulp. Also `:504-506`, `:1023-1025`, `:372-374` (RTN width/radius/`pow` remainder variants).
- `MultiprecisionAcceleration.cpp:549-551, 716-720` [verified]: binary64 RTN differences (`upper - lower`) converted to MPFR points and treated as exact cell widths inside the exact-fallback tier — defeats the purpose of the tier; fix is to subtract in MPFR, where it is exact.
- `CoupledEvolution.cpp:3953-3978` [verified]: `causal_domain_area` computed in `long double` (80-bit on x86-64, 64-bit on Apple ARM — a cross-platform determinism hazard on top of the containment gap) and returned as a point interval consumed as exact at `:4846` and `:4714-4715`.
- `CoupledEvolution.cpp:4701-4718, 4800-4828, 5024-5025`: Gaussian-tail bounds built with RTN `exp`/products used directly as certified enclosures in the binary64 event-impulse fast path, which is not MPFR-cross-checked when it certifies (`:5085-5087`).
- `CoupledEvolution.cpp:1231-1236, 2304-2309, 2379-2385, 528-548`; `JointState.cpp:116-121, 371-381`: RTN radius/token construction feeding published error radii.

One patch series ("outward width/radius helpers used everywhere + subtract in MPFR + one nextafter per transcendental product") closes the whole family. Falsifier for the family: a documented global ulp budget covering token/bound construction — none was found, and the certificate comments claim strict containment.

### H5. Fixture JSON emitted at 6 significant digits — `eom_native_fixture_cli.cpp` [verified]

Only five printers set `max_digits10` (and restore it, e.g. `:272-273`); `print_block` (`:78-79`), `print_pair` (`:106-107`), `print_root_time_budget`, `print_krawczyk`, `print_delayed_root_sensitivity`, and `print_traversal` stream interval bounds at default precision 6, discarding ~11 digits of certified enclosure bounds. The other two fixture CLIs set precision 17 globally. Falsifier: the Python oracle deliberately compares these blocks at ≤6 digits. One-line fix (global `setprecision`) plus removal of the local set/restore dance.

### H6. Shadow server can emit corrupted concatenated JSON — `eom_borg_shadow_cli.cpp:1836-1837` [verified]

The response streams incrementally from line 1108; a `throw` inside the `publishedExtensions` emission loop (`published history lost retained segments`) is caught at `:2069-2080`, which appends a second complete JSON error object directly after the half-written response. The client receives one garbled logical response — the response itself is not atomically published. Fix: buffer the response and write once, or hoist all invariant checks before the first output byte. Falsifier: proof that no exception can fire after the first response byte.

Plainly: the worker starts talking before it has finished checking its answer. If a check fails halfway through the sentence, it starts a new sentence without finishing the old one, and the listener gets gibberish. The fix is to compose the whole message first, then send it.

## MEDIUM findings

- **M1. Joint-state × finite-width event route incoherence** — `CoupledEvolution.cpp:3092, 3268-3269, 3295-3299, 3472-3473`. When joint histories are supplied and event pairs fire, the joint endpoint contraction runs against pre-event candidates, then the event loop replaces them; the contracted joint centers encode the non-event cubic while published paths took the event impulse, and nothing downstream detects a wrong joint center (radius dominance only). Multirate+joint is barred at `:6464-6467`; this combination is not. Either bar it the same way or move contraction after event settlement.
- **M2. Checkpoint model fingerprint omits result-relevant controls** — `Checkpoint.cpp:258-331`. Event budgets/fractions, increment budgets, traversal limits, and `use_warm_root_exclusion` are not hashed; a resume with any of these changed passes `checkpoint_model_matches` and silently continues under a different acceptance regime. Confirm whether Borg-side provenance already hashes the full request before fixing.
- **M3. Quarter-step publication changes the acceptance signal its own header denies** — `CoupledEvolution.cpp:6420-6459` vs `CoupledEvolution.hpp:125-129`. With the flag on, only |two-half − four-quarter| (≈1/8 the nominal signal for an h³ method) is gated; |full − two-half| is never compared, so steps run ~2× larger at nominally unchanged tolerances. Gate both differences or fix the contract comment.
- **M4. Negative-prefix continuity walk bridges 64·eps gaps** — `ExactPairBatch.cpp:1100-1116`. Cells partition exactly, so the tolerance can only bridge unrecorded content — and surround-based root brackets can be narrower than the bridge. Feeds H1's skip mechanism. Recommendation: require exact continuity.
- **M5. Self-pair endpoint exclusions key on `history_id` equality only** — `ExactPairBatch.cpp:196-202, 887-901, 2564-2603`, while `same_retained_history` also requires fingerprint equality. One-line hardening at the batch boundary.
- **M6. MPFR prefix token parsed round-to-nearest** — `ExactPairBatch.cpp:3444-3472`. `parse_double` of an RNDD token can land above the true root by up to ½ ulp; next snapshot's warm search starts past it. One `nextafter` down.
- **M7. Traversal double-budget failure miscounts exclusions** — `CertifiedTraversal.cpp:425-443`. Never-visited pairs land in `excluded_pairs` when both budgets fail. Certificate is `uncertified` either way, so gating holds, but the emitted evidence counts are wrong.
- **M8. Exception taxonomy aborts whole reconstruction batches** — `CertifiedAcceleration.cpp:1578-1600` catches `runtime_error` but not the `logic_error` children that `Interval` throws on overflow/division (`Interval.cpp:28-42, 150`); one bad pair kills the batch instead of yielding one uncertified certificate.
- **M9. Single-nextafter inflation over non-correctly-rounded libm** — `Interval.cpp:179-259`. Sound only if `exp`/`erf`/`sin`/`cos` are ≤1 ulp on every deployment platform; Apple's libm publishes no such guarantee, and the MPFR tier never audits these bounds. Recommend 2-ulp steps for transcendentals or a written platform accuracy contract.
- **M10. No Gaussian-tail charge below `searched_lower`** — `CertifiedAcceleration.cpp:902-925, 927-1196`. Fine if the certified quantity is defined as the integral over retained history; if it stands in for the infinite-past master-equation integral, a tail term is missing. Needs one line of spec either way.
- **M11. Build: no `-ffp-contract=off`** — `CMakeLists.txt`. GCC defaults to fast contraction at -O2; enclosure soundness survives (single-op directed idioms), but emitted fixture bytes can differ across compilers/platforms — a byte-stability hazard. One line converts an implicit toolchain assumption into a stated invariant. Also: no sanitizer wiring, and no test target at all for `eom_borg_shadow_cli` (`print-protocol-version` is a free smoke test).
- **M12. Nondeterministic bytes inside the shadow response** — `eom_borg_shadow_cli.cpp:1161-1258` (timing, disk-stat fields). The passed 1-thread/4-thread byte-identity gate presumably hashes only `publishedExtensions`; that assumption is undocumented at the emission site.

## LOW findings

`CoupledEvolution.cpp:3086-3087` hard-coded `1e-13` joint settle threshold overriding `correction_tolerance`; `Checkpoint.cpp:500-524` post-rename fsync failure reports failure though the file is published, and pid-suffixed temp collides with a crashed predecessor; `CoupledEvolution.cpp:6275-6277` token collapse at extreme t/step ratios escapes as an uncaught exception instead of a fail-closed halt code (admission check `minimum_step > absolute_time_rounding_envelope(...)` closes it); `Interval.cpp:65-67` midpoint overflow for sign-straddling wide intervals fail-closes with a misleading message; `CertifiedAcceleration.cpp:1453-1475` precision ladder can wrap on absurd configs; `ExactPairBatch.cpp:797-811` binary64 `memory_boundary_contact` flag unreachable (dead path, extra MPFR escalations); `CertifiedTraversal.cpp:204-210` causality gate uses token midpoints while `BlockExclusion.cpp:53` uses directed bounds (conservative disagreement); `History.cpp:1296-1308` `retained_suffix` silently drops the uniform-circular endpoint certificate; `eom_native_evolution_fixture_cli.cpp:949-957` temp checkpoint leak window on throw; `eom_recursive_block_benchmark_cli.cpp:482` `stoull("-1")` wraps and disables the pair cap; `ShadowAffineDiagnostic.cpp:197, 1164` unchecked append-stream writes and a missing `.empty()` guard its twin at `:961` has; fixture CLIs interpolate strings into JSON unescaped (latent — all current values are internal constants).

## Vacuous self-checks (delete or make independent)

- `CoupledEvolution.cpp:6519-6522, 3822-3823`: `publication_atomic` fingerprints the same vector twice — tautologically true, and burns a full history hash pass per step.
- `CertifiedAcceleration.cpp:1538-1548, 1832-1834`: `reconstruction_matches` compares values byte-identical by construction; `:1832-1834` compares a pairwise sum with itself.

These matter beyond wasted cycles: under the evidence-independence rule they present as checks while checking nothing. Either compare against an independently ordered reduction or remove them.

Plainly: two of the solver's internal "did I get the same answer twice?" tests are comparing a number with itself. They can never fail, so they provide zero assurance while looking like assurance — worse than no test.

## Reorg plan (no behavior change)

Priority order by drift-risk reduction per effort:

1. **Shared exact-decimal utility.** `parse_decimal`/`decimal_token`/`parse_double`/`double_token` exist in three copies (`History.cpp:72-190`, `ExactPairBatch.cpp:35-49`, plus per-CLI `token` variants) that must stay bit-identical and currently are not locale-hardened (H3). One header fixes H3 structurally.
2. **Shared outward-bound helpers.** `outward_sum` has four copies with diverging zero-shortcut behavior; `radius_about` has one wrong and several right variants (H4/CenteredAffine). A shared `outward_radius_about` + `outward_sum` fixes the CenteredAffine bug structurally.
3. **CLI JSON emission header** (`native/cli_json.hpp`): escape, precision-pinned printers, decimal token, fixture factories — ~400–500 duplicated lines across five CLIs; this is exactly where H5 happened. Constraint: preserve the two key-casing dialects (snake_case fixtures, camelCase Borg) — parameterize keys, do not unify them.
4. **Split `CoupledEvolution.cpp` (7,029 lines) along ten clean seams:** token utilities (:27-260), step controllers (:291-947), joint affine assembly (:392-743 + :2324-2635), Jet2 + common-domain chart (:1486-2248), candidate/publication (:1166-1398, :2250-2322, :2637-2791), corrected-substep engine (:2793-3554), validation (:3556-3807), fold-caustic impulse quadrature (:3869-5321 — biggest and most self-contained), far-field enclosure (:5323-5456), acceleration snapshot (:5458-6242), atomic step + controller (:6244-7027).
5. **Split `ExactPairBatch.cpp` (3,736 lines) into five TUs:** double geometry (:1-509), double attempt (:511-1149), reusable `MpInterval` kernel (:1151-1618 — nothing pair-specific in it), compiled MPFR history (:1620-2603), MPFR attempt + certificates + worker pool (:2605-3618). Independently: name the 270-line joint-root lambda-in-lambda at :2938-3211 as a function.
6. **Extract the History disk pager** (`History.cpp:531-930`) into `HistoryDiskStore.cpp` — self-contained, and the right home for the block-pinning fix (H2).
7. **Unify the triplicated timing structs** (`CoupledEvolution.hpp:273-295, 319-346, 544-575`) and their three field-by-field accumulators; ditto the three near-identical `ExactPairRequest` construction blocks (:5583-5611, :5751-5779, :5945-5982), where the exhaustive route already carries fields the other two silently lack.
8. **Promote `DeterministicParallelExecutor`** (`CertifiedAcceleration.cpp:40-135`) to a shared utility, replacing the ad-hoc pool at :1728-1759.

## Cleanup inventory

Zero TODO/FIXME/HACK markers in the tree. Dead/unwired items: `DisplayEvaluation.hpp:28-29` request fields parsed but never read, result fields (:52-54) never written; `CoupledEvolution.cpp:992-996` unused parameter, `:1016-1019` redundant forward declaration; `RootTimeBudget.cpp:23-26` no-op alias; `ExactPairBatch.cpp:3657-3661` wall time labeled `cpu_seconds`; `eom_borg_shadow_cli.cpp:978-982` uncommented `== 6U` joint-seed gate (a 4:4 run silently loses joint seeding); `eom_borg_shadow_cli.cpp:320` synthetic `rejected_step_count`. Magic constants worth naming: `220U` joint-symbol cap, `1e-13` joint settle, 8-iteration tube fixpoint, 12-step common-domain ladder, `64U`/`16U` split batch. README drift is additive only: `far-field-dispersal`, `certified-correction-retry`, `pinned-fold-benchmark`, `print-protocol-version`, and the entire benchmark CLI are undocumented; nothing listed is stale. Missing asserts on stated invariants: `finite_width_pairs` silently skips on index mismatch (fail-open in the impossible case — should throw), `error_token` maps negative radii to `DBL_MIN` silently, `subfield_suffix` index precondition, `locate_exact_history_segment` bounds.

## Round-three new findings

Filed after verifying the third fix round. Line anchors are current as of 2026-07-24 and will drift.

### R1 (HIGH, operational) — the joint+event bar reports the wrong halt code [verified]

M1 was closed by failing closed: `CoupledEvolution.cpp:3170-3184` returns failure code `unsupported_caustic_or_singular_chart` when `joint_enabled && !event_pairs.empty()`, before any contraction runs. Correct, and regression-tested. But that is a *step* failure, so the controller halves the step and retries until exhaustion, and the halt-code ladder at `:7104-7121` tests `failure_code.rfind("caustic_", 0U) == 0U` — the string starts with `unsupported_`, not `caustic_`, so it falls through every arm to the generic `halt_code = "minimum_step_exhausted"`. A joint run meeting any finite-width event burns the full rejection ladder and then misreports a step-size problem instead of the real chart limitation. Fix: give the code its own arm in the ladder.

Plainly: the solver now correctly refuses a combination it cannot certify, but the refusal is filed under the wrong reason code — so the log says "I ran out of step size" when the truth is "I don't support this combination yet." An operator debugging it would chase the wrong thing.

### R2 (HIGH, capability) — the bar makes the finite-width adjudication retry unreachable for Borg populations

The recovery route at `:7077-7102` answers a near-minimum-step `coupled_correction_failed` by inserting certified opposite-polarity core pairs into `adjudicated_finite_width_pairs` and retrying at the same width. Those pairs re-enter `event_pairs` at `:3151-3155`, so with joint state seeded the retry now returns immediately at the new bar. Since the borg CLI seeds joint histories for any population `>= 6U` paths, the sharp→finite-width fallback is dead for exactly the 3:3 and 4:4 populations Borg runs. Fail-closed and correct, but a whole recovery route silently stopped working; it belongs in the README note beside the bar.

### R3 (MEDIUM) — `monotone_finite_width_integral` remainder still assumes an exact midpoint [verified]

The centered route was fixed correctly (`CertifiedAcceleration.cpp:705-712` now charges `(m−a)²/2 + (b−m)²/2` from two outward endpoint radii, with the reasoning written down at `:717-718`). Its sibling three functions later was not — `:873-877` still computes `0.5 * emission.width() * mollifier_integral.upper()`, asserting `max|τ−m| ≤ |I|/2`. Because `width()` is upward-rounded, the bound is `h/2 + ulp(h)/2` while the true radius is `h/2 + ulp(a)/2`; for a narrow cell at large emission time `ulp(a) ≫ ulp(h)`, and in the degenerate `h < ulp(a)` case the midpoint collapses onto an endpoint and the true radius is `h` — a factor-2 shortfall, with no `lower < midpoint < upper` guard in this function. The correct idiom is already in the file; apply `left_radius`/`right_radius` here too.

### R4 (MEDIUM) — centered main term scaled by the upward-rounded width [verified]

`CertifiedAcceleration.cpp:703-704`: `const double width = emission.width(); result = scale(Interval::point(width), midpoint_value);`. The identity certified is `∫_I A = |I|·A(m) + R`, but `width()` is deliberately one ulp above `|I|`, so the main term carries a sign-dependent bias of up to `ulp(h)·|A(m)|` that the (now-correct) remainder does not cover. `left_radius + right_radius` is exactly `b − a` and is computed two lines below; build the main-term width from that, or from `Interval::point(upper) - Interval::point(lower)`. Same pattern at `:873-877`.

### R5 (MEDIUM) — `long double` survives in the interval trig phase reduction

`causal_domain_area` was migrated to Interval ops, closing its cross-platform drift. The same hazard remains in `Interval.cpp:224-256`: `contains_phase` and `periodic_range` reduce phases in `long double` (80-bit x86-64, 64-bit arm64 macOS, 128-bit aarch64 Linux), so an endpoint sitting within a rounding of a `π/2 + kπ` extremum can take the `upper = 1.0` branch on one platform and the tighter endpoint branch on another. `interval_sin`/`interval_cos` feed the analytic circular history states, so this is the same byte-drift class, relocated. Do the reduction in double/Interval with an outward margin.

### R6 (MEDIUM) — `memory_boundary_contact` "dead flag" was misdiagnosed in the original review

The original LOW claimed the binary64 `memory_boundary_contact` path is unreachable. Re-derivation says otherwise: `ExactPairBatch.cpp:1011-1016` calls the setter with `point = cell.lower`, the first cell's lower is `max(incremental_search_lower, segment.t_start())` which equals `search_lower` on a cold search, and bisection preserves `cell.lower` on the left half. So the flag is attainable whenever the residual is exactly zero at the search floor and token-dominated. Do **not** delete it — `CoupledEvolution.cpp:1150-1151, 1476` and `CertifiedTraversal.cpp:188` all gate on this signal. This corrects the earlier report.

### R7 (LOW-MEDIUM) — leftovers and near-misses

- **Dead joint plumbing behind the bar**: `CoupledEvolution.cpp:3243-3259` still resolves `event_joint_receiver`/`event_joint_transmitter` and passes them to the regulator; both are unconditionally `nullptr` under the bar. The first-pass regulator call passes joint pointers while the refinement call at `:3357-3361` does not — harmless today, a latent asymmetry if the bar is ever lifted. Mark both sites.
- **Constant-true field pattern survives one level up**: `reconstruction_matches` was removed cleanly (and the removal is pinned by tests), but `CertifiedAcceleration.cpp:1858-1864` still ships `complete_ordered_pair_domain = true` on a path that throws before reaching it — same tautology class.
- **`const_iterator` declares `forward_iterator_tag`** (`History.hpp:222`) while `operator++` resets the pin (`History.cpp:1049-1054`), so `*i` does not survive increment and the multipass guarantee fails in disk mode. Current uses are safe; downgrade the tag to `input_iterator_tag` before an algorithm caches a reference across `++`.
- **Warm-start reuse is quietly defeated by retention**: `ExactPairBatch.cpp:713-718` and `:3664-3677` compare warm and current segments at the *same* index, but `retained_suffix` shifts indices by the retired count, so the first comparison fails and every warm cell is discarded. Safe and silent — measure this before attributing warm-start ineffectiveness elsewhere.
- **`retained_suffix` also changes `provenance_fingerprint()`**, so a suffix-trimmed self-pair now loses both the uniform-circular fast path and (if only one side is trimmed) `same_retained_history`. Correct fail-closed direction, undocumented; one comment at `History.cpp:1313-1318` would pay for itself.
- **Minor**: `History.cpp:865` dead initializer overwritten inside the lock; `RetainedHistory` construction pins each segment twice (`:1084-1088`) then walks the sequence again, three passes per construction; `std::lower_bound` over the pinning iterator (`CoupledEvolution.cpp:4194`) is O(n) advances with a cache scan each — now the dominant cost in that path since the copies are gone; `nonnegative_point` still a no-op alias asserting an invariant it never checks; wall-clock `steady_clock` still labelled `*_cpu_seconds` and propagated into three headers and the shadow CLI output.

### R8 (INFO) — schema and checkpoint-compat notes

The Python oracle still emits `reconstruction_matches` (and genuinely recomputes it), so native and oracle certificate schemas now differ by that field — field-by-field diffing tools will see a delta. Separately, `model_fingerprint` is now near-complete, which correctly invalidates checkpoints on any control change; confirm the two-call structure at `Checkpoint.cpp:365-369` still intends its fallback arm to accept checkpoints written before these controls were hashed.

## Suggested fix order

1. H1 + M4 + M6 (warm-prefix side conditions — one coherent patch to the reuse gate).
2. H6 (buffer shadow-server response) + H5 (fixture precision) — small, protocol-facing.
3. H2 (disk-mode segment pinning or copy).
4. H3 via reorg item 1 (shared locale-hardened decimal utility), sweeping the borg CLI `strtod` sites in the same pass.
5. H4 via reorg item 2 plus the per-site outward substitutions; add `-ffp-contract=off` (M11) in the same change.
6. M1–M3 (joint/event coherence, checkpoint fingerprint scope, quarter-step contract) — each needs an operator decision on intended semantics before code changes.
7. Vacuous self-checks, LOWs, and remaining cleanup opportunistically with the TU splits.

Every code-change recommendation above is a proposal graded from reading, not from execution; none has been run against the fixture suites. The falsifier for any of them is the corresponding test run — the three Python oracle parity suites and the Borg refinement ladder remain the acceptance authority.

Closure goal: convert this review into scoped patches beginning with the warm-prefix side conditions (H1/M4/M6), with the fixture suites and Borg ladder as the acceptance gate for each patch.
