# EOM Solver Code Review — 2026-07-24

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
