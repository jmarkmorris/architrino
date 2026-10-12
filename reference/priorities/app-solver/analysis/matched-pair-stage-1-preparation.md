# Matched-Pair Enclosure, Stage 1 Preparation: Scratch Implementation and Controls

This record reports the Stage 1 snapshot route as prepared outside the production tree. The implementation exists as three new source files and a guarded patch to five existing solver files; all of it was built and run in a scratch copy of the frozen baseline source. **No existing production file has been changed and nothing here is an integrated or accepted solver capability.** Integration waits on the operator's direct authorization in the implementing session, because that session's host refused a write to a shared file, and on independent review of this packet. The design is the [Stage 0 packet](matched-pair-stage-0-design.md) as amended by [addendum 1](matched-pair-stage-0-addendum-1.md) and by section 2 below. All numerical instances use $c_f=1$.

## 1. What was built

**New files**, retained read-only at `.local-data/eom-matched-pair/2026-10-11/stage1-prepared-source/new-files/`:

- `include/architrino/eom/MatchedPairEnclosure.hpp` and `src/MatchedPairEnclosure.cpp`: the certificate type, exact decimal token predicates, the shifted Bernstein bounds, the membership test, the radius, and a consumer-side recheck. The certifying function is pure: it reads three histories and the run tokens and returns a certificate whose status is `certified_enclosed`, `certified_absent` or `declined`.
- `native/eom_matched_pair_fixture_cli.cpp`: a manual fixture with three commands. `all` runs module-level controls. `snapshot-file` reads a line-based case file and prints one complete diagnostic object per snapshot, so a separately authored adapter can drive it. `evolution-guard` shows that the evolution entry points refuse the policy. The fixture prints and judges nothing.

**Guarded patch** to existing files, `stage1-integration-patch.py` in the same directory, with the resulting unified diff against the baseline in `stage1-against-baseline.diff`. Each edit is an exact-string replacement whose preimage must occur exactly once, and the script writes nothing unless every preimage matches. It touches `CMakeLists.txt`, `CertifiedAcceleration.hpp`, `CertifiedAcceleration.cpp`, `CoupledEvolution.hpp` and `CoupledEvolution.cpp`:

| File | Change |
| --- | --- |
| `CMakeLists.txt` | Adds the module to the library and one fixture target. No recurring test is enrolled. |
| `CertifiedAcceleration.hpp` | One optional pointer on the pair request naming its group certificate. |
| `CertifiedAcceleration.cpp` | Accepts the chart `matched_pair_enclosure`; rechecks each member request; emits the group interval in the leader's row and the additive identity in the follower's; verifies group ownership over the complete request matrix before any pair is evaluated. |
| `CoupledEvolution.hpp` | Request field `matched_pair_enclosure_policy`, default `disabled`; three snapshot fields listing every grouped attempt and counting present and absent groups. |
| `CoupledEvolution.cpp` | Route selection, the deterministic pairing helper, the member marker, both far-field scheduling paths calling the same helper, ledger and width accounting, and refusal of the policy at both evolution entry points. |

**Claim grade: measured**, by `python3 stage1-integration-patch.py . --check` against the live checkout at 2026-10-11T20:33Z, which reported every preimage unique and wrote nothing, and by a hash comparison showing the live solver source still equal to the Stage 0 inventory at that time. A falsifier is a preimage mismatch on a later check, which would mean concurrent work has changed one of the five files and the patch must be re-derived against the new bytes.

## 2. Coverage of earlier retained history: re-proved, not imported

Addendum 1 bound the snapshot's prefix-exclusion certificate by its tokens. The reviewer observed that matching tokens do not tie that proof to the actual member histories. The prepared module therefore imports no prefix evidence. When a member's retained history begins before the window start $S_0$, the module re-proves the exclusion from that member's own history: it takes the member's position hull $\mathcal P$ over the whole interval from its history start to $S_0$, including that history's reconstruction error radii, and requires

$$
\sup_{\mathbf y\in\mathcal R,\ \mathbf x\in\mathcal P}\|\mathbf y-\mathbf x\|<T_r-S_0 .
$$

For every emission time $S$ in the prefix this gives $\|\mathbf X_r-\mathbf X(S)\|<T_r-S_0\le T_r-S$, so the residual $g(S)$ is strictly negative there and the prefix holds no causal root of this receiver event. The test uses no monotonicity and no speed bound on the prefix, and the prefix may span several segments. If the inequality is not certified the route declines with `MPE-WINDOW-02`. The certificate records `whole_retained_history` when neither member has earlier history and `member_prefix_reproved` otherwise, with each member's history start and prefix residual interval.

**Claim grade: derived.** Falsifier: an admitted member with a causal root at an emission time between its history start and the window start.

The corresponding controls are a window starting at $-14$ in the quadratic pair, whose roots are $-12.5$ and $-11.25$, which is admitted with both prefix residuals strictly negative; a window starting at $-12$, which leaves the leader's root in the prefix and is declined; and a window starting at $-11$, which leaves both roots in the prefix and is declined.

## 3. Results in the scratch build

The scratch tree is the read-only baseline snapshot plus the new files and the patch. It was built Release with two workers under the compute supervisor, with no compiler warning or error, by the same pinned SDK setting as the baseline.

### Disabled route against the frozen baseline

**Claim grade: measured**, by `cmp` and by a field-by-field comparison. With the new code compiled in and the policy at its default, the native `all`, acceleration `all` and evolution `all` fixture outputs are byte-identical to the frozen baseline outputs. The dispersal output has the same keys in the same order and equal values in every field that is not a wall-clock time. No field was filtered other than the four wall-clock fields, and no schema or source-identity difference appeared in these outputs. This shows the disabled route is unchanged on those fixtures. It is not evidence that any enclosure is correct.

### Module-level controls

Twenty-eight certificates, one token-predicate line and one consumer-recheck line, from `eom_matched_pair_fixture_cli all`. Admitted: the static pair; the receiver box with a uniform strict sign; the 7-24-25 affine pair; the quadratic pair; the quadratic pair on an interior window with the prefix re-proved; equivalent charge token forms; exponent and sign token forms; negative coupling; and a budget just inside two slices. Both-absent is certified with zero width. Declined, each with its own code: one member missing (`MPE-MEMBER-01`); an exact endpoint root and a receiver box crossing the sign boundary (`MPE-MEMBER-02`); a member root in the prefix and both roots in the prefix (`MPE-WINDOW-02`); a two-segment window (`MPE-WINDOW-01`); same polarity, unequal magnitudes and zero magnitude (`MPE-CHARGE-01`); a field speed other than one (`MPE-MODEL-01`); a disabled policy (`MPE-POLICY-01`); a nonzero error token and a uniform-circular factory history (`MPE-HISTORY-01`); a speed bound reaching one (`MPE-SPEED-01`); a receiver inside the source domain (`MPE-GEO-01`); a self member and a repeated member (`MPE-ID-01`); and a budget just outside two slices (`MPE-BUDGET-01`). The consumer recheck accepts the leader and the follower and refuses a foreign member, a wrong member history, a wrong reception time, a tampered status and a widened interval.

### Snapshot-level controls

Forty-five snapshots from [the case file](../evidence/matched-pair-stage-1-snapshot-cases.txt), covering three-path and six-path populations, the direct and traversal scheduling paths with tile limits 1, 4 and 4096, one and four workers, and repeats.

| Observation | Result |
| --- | --- |
| Static pair, policy enabled | One present group for the far receiver; two relationships counted enclosed, seven exact; receiver total $[-2.003\times10^{-5},\,2.003\times10^{-5}]$ on the pair's axis |
| Static pair, policy disabled | Nine exact relationships; receiver total $[2.00000099998\times10^{-5},\,2.00000100002\times10^{-5}]$ |
| Both absent | One absent group, two relationships counted excluded, zero width, total zero; under traversal the same sources are excluded by blocks first and no group is attempted |
| One missing | Group declined; totals equal the disabled totals bit for bit |
| Endpoint root | Group declined as ambiguous; the snapshot outcome is the existing uncertified outcome, identical with the policy disabled |
| Six-path population | Three present groups across the six receivers out of twelve attempts; six relationships enclosed, thirty exact; identical in all nine scheduling variants |
| Evolution guard | Both evolution entry points and an unknown policy string are refused with `unsupported_execution_policy` |

The author's consistency instrument, `stage1-consistency-check.py`, first passed known cases for its two predicates and the known static source at distance two, whose receiver total contains $-1/4$. It then passed eighteen further checks: the ledger identity in every snapshot; one leader row carrying the group interval and one follower identity row per admitted group, with no interval on declined groups; receiver enclosed width within the far-field allocation; identical decisions and identical intervals across all scheduling variants of each family; containment of the disabled-route totals in the grouped totals for every receiver and axis; and containment of four exact rational totals, for the static pair, the six-path receiver, the quadratic pair with magnitude $17/10125$, and the affine pair on all three axes.

**Claim grade: measured**, by that instrument over the retained outputs. It was written by the implementer, so it is a development check. Containment of the disabled-route totals compares two routes of the same build and is consistency, not independent correctness. Independent acceptance belongs to the reviewer's separately authored reference.

### The reviewer's frozen inputs

An adapter read only the input fields of the reviewer's frozen controls, namely identifiers, window bounds, tokens and paths, and wrote [sixteen cases](../evidence/matched-pair-stage-1-reviewer-input-cases.txt): each of the four fixtures with the policy enabled and disabled on both scheduling paths. It read no expected root, acceleration or total, and no output was compared with them. The adapter chose an acceleration tolerance of 0.01 and a far-field fraction of 0.5; those are not part of the reference. Dispositions observed: the two complete fixtures each admit one present group; the mixed-window fixture declines its group with `MPE-MEMBER-01` and returns the exact route; the lower-boundary fixture declines with `MPE-MEMBER-02`, and the snapshot is uncertified with `root_completeness_not_certified`, identically with the policy disabled. The reference treats a root at the lower boundary of a closed window as present, while the solver's exact route refuses to certify it; that difference is the existing endpoint convention of the exact route and is unchanged by this work. In every enabled case the second attempt, with the receiver's own partner as a member, declines with `MPE-GEO-01` because the receiver lies inside that pair's source domain.

## 4. Two observations the reviewer should weigh

**Grouping is not always tighter.** In the affine 7-24-25 control the pair is close to the receiver and widely separated. With a very loose tolerance the individual enclosures already admit both members with a total half-width of about 2.58, while the grouped radius is about 2.77. The grouped route is attempted first, so there it spends more of the same budget than the individual route would. The result is still a valid enclosure. A rule that declines a group whenever both individual enclosures would be admitted at no greater total width would remove the regression; it is not implemented, because it changes admission order and has not been reviewed.

**Pairing is by path order.** For a receiver that is itself one member of a tight binary, the first attempt can pair its partner with a distant source, and that attempt declines on geometry or budget. Each source is offered once per receiver event, so a declined attempt is not retried with a better partner. This is the deterministic rule the scope asks for; it limits how often the route applies and never affects correctness.

## 5. Identities and retention

| Item | Location and identity |
| --- | --- |
| Prepared sources, patch and diff | `.local-data/eom-matched-pair/2026-10-11/stage1-prepared-source/`, read-only; SHA-256 list `stage1-prepared-source.sha256` |
| Scratch outputs | `stage1-scratch-outputs/` in the same directory; SHA-256 list `stage1-scratch-output-identities.sha256` |
| Scratch binaries and case files | SHA-256 list `stage1-scratch-binary-and-case-identities.sha256` |
| Consistency instrument and its output | `stage1-consistency-check.py` and `stage1-scratch-outputs/consistency-check.txt` |
| Build log | `stage1-scratch-build.log` |

Raw outputs are local retention under the accepted local-storage boundary and are not a backup. The scratch tree and build directories under `.tmp/eom-matched-pair/` are disposable; everything needed to rebuild them is the read-only baseline snapshot, the three new files and the patch.

## 6. What is established and what is open

Established in scratch: the module and both scheduling paths behave as designed on every listed control; the disabled route reproduces the frozen baseline; group ownership and the single debit hold in every snapshot; and decisions are independent of scheduling.

Open: the operator's direct authorization for this session to edit existing shared files; application of the patch to the live checkout and a rebuild there; the shared far-field contract correction; independent comparison of these outputs with the reviewer's frozen reference; review of the two observations above; and all of Stages 2 and 3. Stage 1 as prepared is snapshot-only on single-segment, error-free cubic source windows. It reports no cost result.
