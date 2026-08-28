# F5 certification diagnosis and successor admission boundary

Status: source-only diagnosis; no successor numerical work authorized or performed. The [completed ordinary-evolution experiment](2026-08-27-f5-ordinary-evolution-evaluation.md) remains independently accepted as a bounded unresolved experiment. Its failed scientific gates remain failed. This document neither reopens that experiment nor admits a new declaration.

## Historical identities and present ownership

The live [integrity audit](../../../../.local-data/braid-analysis/f5-certification-successor-20260828/historical-integrity-v1.json), SHA-256 `089b667b95cc8feea2c76aadb1c1ce06a964886dbe901939414459b1e3ddc582`, checked 260 distinct files totaling 170,531,097 bytes and 33 runtime aliases, with no mismatches. This is a source/record identity check, not a repeated numerical evaluation. The historical declaration, handoff and outcome review retain their identities:

| Record | SHA-256 |
| --- | --- |
| [Declaration](2026-08-27-f5-ordinary-evolution-declaration.v1.json) | `e908f1fc47acaeb0ba046818fc66a2781251492be2022cdb978e4727e0d72515` |
| [Accepted evaluator handoff](../../../../.local-data/braid-analysis/f5-ordinary-evolution-20260827/accepted-evaluator-handoff-v1.json) | `3d802021b53efa5c95f4dc213e0901a5f5aeb9f2aaa483e0f836a2f93993f96f` |
| [Independent outcome review](../../../../.local-data/braid-analysis/f5-ordinary-evolution-20260827/actual-evaluation-independent-outcome-review-v1.json) | `8af7fe88c538ac6684bfe85dd1ec080a060575c969893356e5e76757781c4847` |

Plainly: the saved evidence still has the bytes accepted by the previous reviewers. This does not confer that acceptance on changed code or a new run.

Benchmark task `01a045de-6a34-77f3-bac4-90f2362f6ccd` retains ownership of the F5 caller and its tests. It confirmed their historical hashes unchanged and is preparing an archival/source-binding arrangement before an operational extension. All EOM source/build bytes and scientific references remain untouched during that coordination. F6c task `01a045dc-2981-7e42-b970-4f659be06958` confirmed no EOM changes or rebuilds and released its idle compute reservation; this is not an F5 execution window. A fresh explicit handoff and host admission are still required. Shared readiness remains frozen at `04a889345ee7c4cd43b0f41bebb70cb2f176ac4d13af035204347f3c6904feaf`; shared queue, tracker and readiness were not edited.

## Producer obligation

**Derived from the bound source and recorded diagnostics:** the observed failing branch is a root-width obligation. In [ExactPairBatch.cpp](../../../../src/eom/src/ExactPairBatch.cpp), the interior monotone-root branch first obtains opposite residual signs on a containing interval. When a midpoint residual contains zero, lines 3013–3024 try strict-sign surrounding probes, then `enclose_mp_monotone_root`. Lines 2401–2426 require a nonzero transmitter factor, a nonempty intersection, and an enclosure no wider than the declared root tolerance. The transmitter factor is the derivative of the causal residual with respect to emission time.

Plainly: the code distinguishes finding a wider interval containing a root from locating that root accurately enough to accept it. Failure of the second requirement does not undo the local evidence for the first.

For a midpoint $m$, residual interval $G(m)$, positive derivative interval $D$, containing interval $I$, and tolerance $\varepsilon$, the mean-value construction is

$$
J=\bigl(m-G(m)/D\bigr)\cap I,
\qquad
\operatorname{width}(J)\leq\varepsilon.
$$

Plainly: the midpoint is an emission time inside the search interval. Dividing its possible residual values by the possible slopes gives a range of corrections to that time. Intersecting the corrected range with the containing interval gives the candidate root interval. Its width must fit the declared time tolerance.

**Conditional deduction:** all sixteen saved failure rows report negative/positive containing-interval signs, a midpoint residual straddling zero, and a strictly positive derivative interval. The census is five coarse, four medium and seven fine rows across nine rejected attempts; repeated pair identities are not deduplicated. Consequently the candidate correction contains zero, the candidate interval contains the midpoint, and the intersection cannot be empty. In this code branch, rejection of the mean-value construction therefore means that its computed width exceeds tolerance. This conclusion is conditional on the recorded bounds and the source path that emitted them; it does not independently re-establish the bounds from the unpublished trial history.

Plainly: the source and records identify which requirement refused the step. A wide computed enclosure is an upper bound on uncertainty, not proof that every possible enclosure must be that wide.

Opposite signs and a strictly positive derivative imply one root in that particular containing interval for each admissible continuously differentiable represented history, conditional on valid interval bounds. This statement does not prove that the admissible history family is nonempty. Different histories can place their roots at different times. This local statement does not supply the complete root census: classification stops when the pair attempt becomes incomplete, the incomplete result withholds `root_free_complement`, and [CertifiedAcceleration.cpp](../../../../src/eom/src/CertifiedAcceleration.cpp) requires the complete interior-root certificate before using the sharp acceleration contribution. The failed snapshot propagates through [CoupledEvolution.cpp](../../../../src/eom/src/CoupledEvolution.cpp) to `root_completeness_not_certified`; minimum-step exhaustion retains that halt code.

Plainly: a locally identified root does not authorize an acceleration sum over the whole searched history. The complete-root and acceleration gates remain failed.

## Separate sources of limitation

| Category | Source/record conclusion | What remains unproved |
| --- | --- | --- |
| Starting-history uncertainty | The original component error tokens are preserved. MPFR recompiles those tokens; increasing arithmetic precision does not delete them. | That those admitted errors impose an unavoidable root-width lower bound. |
| Propagated uncertainty | `append_candidate_segments` transports position, velocity and acceleration radii; publication adds full/half-step discrepancies. | Independent validity and sharpness of the transported enclosure as a bound on the exact dynamical solution. |
| Ordinary correlation | Ordinary history evaluation includes same-path/shared-join contractions. | That all relevant dependence is represented, or that correlation loss is the cause here. |
| Optional joint histories | The saved run has zero joint paths/symbols; the optional cross-history fallback is unavailable. | That a physical history is missing or that enabling joint carriers would resolve the refusal. |
| Arithmetic precision | Saved producer failures reach the declared 512-bit cap after the 128/256/512 schedule. | Whether arithmetic rounding dominates any width; earlier precision-attempt intervals are not retained. |
| Root enclosure | The observed mean-value branch cannot satisfy the declared width requirement. | A singularity, missing physical root, or impossibility of a sharper certificate. |
| Observability | Failure output lacks exact trial-history inputs, reception/substep/correction identity and complete per-precision enclosure records. | A reproducible decomposition of the failed enclosure into data, arithmetic and dependency contributions. |

Plainly: a limit on input accuracy, a conservative calculation, discarded relationships between errors, and rounding can all widen a bound. The historical record does not yet separate their contributions. Diagnostic names are not cause estimates.

The ordinary candidate-radius formulas are visible in `CoupledEvolution.cpp` lines 1443–1475; later publication inflation is at lines 2585–2600. The [CLI failure serializer](../../../../src/eom/native/eom_borg_shadow_cli.cpp) at lines 1698–1788 merges failures from substep start and endpoint snapshots without their location labels. Rejected `rootAccounting` and `rootFailures` describe different snapshots. Empty local-error rows exclude final publication recertification but do not distinguish predictor from correction failure. These distinctions prevent an apparently complete starting census from being mistaken for a contradiction of a later candidate failure.

Plainly: the saved start state can pass while the attempted next state fails. The old output does not preserve enough context to reconstruct exactly which attempted state produced each failure.

## Independent-reference obligation

**Derived from frozen reference source:** [check-f5-evolution-dynamics.py](../../../../scripts/eom/check-f5-evolution-dynamics.py) lines 101–117 replace each three-component position/velocity error vector by its maximum across exact decimal values and their parsed binary64 values. The same scalar is applied to every axis. The nominal cubic coefficients remain the original decimal tokens. This enlarges the uncertainty set without changing the nominal polynomial. The frozen oracle uses 80 decimal digits; this is not the producer's adaptive 512-bit route.

Plainly: the independent checker asks its question using a broader, differently represented range of possible paths. Its refusal need not contradict the producer's acceptance of a narrower representation.

The reference additionally uses a different initial-center and uncertainty-transport construction. Its first-step comparison checks numerical compatibility, not the EOM uncertainty-transport rule. The final-snapshot calculation consumes the generated fine history with enlarged scalar radii. Its complete 144-pair census contains 58 certified and 86 uncertified rows, with 173 unresolved cells. The wrapper refuses comparison with partial acceleration totals at lines 281–285. Its `snapshot_summary` at lines 267–278 omits root brackets and the unresolved cells' intervals, segment indices and reason codes, retaining only counts and input digests.

Plainly: the final check finished and refused a scientific gate. It did not run out of its time budget, and its summary cannot identify the precise cell-level refusal. The failed comparison remains failed.

The frozen reference's uncertain-point probes and subsequent cell tests in [certified_history.py](../../../../scripts/eom/oracle/certified_history.py), lines 843–877 and 1200–1285, are a different enclosure route from the producer's mean-value fallback. The producer's localized width refusal therefore cannot be assigned to the 173 reference cells. A separate saved-record audit reconstructed all 144 pair input digests and found 12 certified self rows, 46 certified cross-worldline rows and 86 uncertified cross-worldline rows. Its source/counter argument excludes the reference's cell-count and recursion-depth exhaustion branches at the recorded limits; it does not identify a replacement cause. Partial receiver totals omit uncertified pair contributions and are not complete accelerations, including when an emitted component is zero.

Plainly: the two programs can fail for different reasons on differently represented uncertainty. The reference's counters rule out two resource explanations, but its missing cell records still prevent a precise diagnosis.

No source-only diagnosis upgrades the 72 passed first-step predicates or the 96 combined adjacent-rung sensitivity predicates. The latter cover only zero and each common prefix endpoint; all positive declared grid times are unreachable. None supplies continuous-time convergence, the requested horizon, or independently validated motion.

## Recommended successor, pending explicit admission

**Recommendation:** one producer-observability extension, followed by one complete three-rung evaluation. Preserve the approved geometry, exact 612-piece past-only history and its uncertainty, $K=0.002$, $q_0=1$, coupling $0.002$, $c_f=1$, release at zero, target $T=0.5$, all existing numerical controls, thresholds and acceptance predicates. Keep the existing independent dynamics and geometry references byte-identical. Do not widen root tolerance, raise precision, reduce history errors, tune strength, or substitute prescribed positive-time motion.

Plainly: the successor would ask the same scientific question while recording enough of a rejected calculation to inspect it independently. Another bounded unresolved result is admissible; a more favorable verdict is not the purpose.

The proposed diagnostic contract is limited to failed pair evaluations and records: exact evaluated receiver/source histories or independently reconstructible accepted-base-plus-trial tokens; attempt/substep/correction/reception identity; source segment and search bounds; original uncertainty radii; ordinary boxes before and after existing contractions; every executed precision attempt; strict-sign probe disposition; residual/derivative intervals; mean-value candidate before and after clipping; and the precise refusal predicate. Captures must have declared record/byte limits, stable identities and explicit truncation. Observations may not change any mathematical decision or silently omit a failed gate. Full capture details and the independent reconstruction procedure must be frozen before launch.

Plainly: a useful failure report must preserve the actual input that failed, not merely its name. If capture is incomplete, the diagnosis must say so rather than reconstructing missing values from a different state.

The independent diagnostic review must keep three proof burdens separate. Arithmetic attribution compares the same represented uncertainty at the already declared precision attempts. Enclosure slack requires a separately justified tighter enclosure of the same admissible inputs, not an undocumented smaller input set. An irreducible uncertainty-floor claim would require a lower-bound argument, such as two admissible continuous histories with independently certified roots separated by more than tolerance; a wide upper enclosure alone is insufficient. No such witness has been constructed in this phase.

Plainly: more digits can test rounding, a sharper calculation can test excess conservatism, and two allowed histories with demonstrably different root times can test unavoidable input ambiguity. These are different tests and must not be substituted for one another.

The operator admission question proposes one scientific process, 2 GiB sampled aggregate RSS, 1 GiB aggregate output, ten minutes total for builds/tests, thirty minutes per EOM rung, fifteen minutes per checker, two hours for the complete caller, and a hard campaign deadline four hours after approval. These are proposed ceilings, not measured successor costs. The historical invocation took 1261 seconds externally, which is evidence about that invocation only. No approval or deadline from the completed campaign transfers here.

Plainly: the new run needs a new budget and stop time. The expected scale of the old run does not guarantee the cost of additional recording or review.

Before launch, obtain the explicit operator decision, source-owner release, an independent review of the changed producer and unchanged reference boundary, a fresh bounded build, exact source/runtime/build identities, exact request bytes, a new declaration at a new path, its independent review, the complete invocation with fresh output/log paths, and an explicit compute handoff plus host admission. The historical declaration must never be edited or used to authorize changed live code. No executable successor invocation is asserted yet: the future build and declaration have not been frozen.

## Validation and remaining proof burden

This phase contains source reading, hash verification, saved-record inspection and independent source review only. It performs no new root calculation, model evaluation, build, heavy process test, commit, push, regeneration or historical-evidence deletion. The separate [producer-obligation audit](../../../../.local-data/braid-analysis/f5-certification-successor-20260828/producer-obligations-v1.md), [reference-obligation audit](../../../../.local-data/braid-analysis/f5-certification-successor-20260828/reference-obligations-v1.md), and [independent diagnosis review](../../../../.local-data/braid-analysis/f5-certification-successor-20260828/diagnosis-review-v1.md) preserve source locations, exact bindings, census methods, conditional deductions and exclusions. The independent challenge found and corrected an initial count of fifteen failure rows to sixteen. No historical record was changed. Focused Markdown link checks and `git diff --check` pass.

The conditional diagnosis is falsified by a conflicting sealed failure row, different emitting branch, factor interval containing zero, midpoint outside the containing interval, or source/input identity mismatch. Any later claim attributing width to input uncertainty, rounding or lost correlation requires an independent calculation from the captured exact trial, with its own scope and counterexample condition. Full-history root completeness, final acceleration agreement, independently validated uncertainty transport, full-horizon convergence, stability, permanent retention and physical realization remain open. A completed independently checked successor outcome is still required to complete the operator's overall request.

Plainly: this source audit narrows the question but does not finish the requested experiment. The next action is explicit successor admission, not numerical execution under the old approval.

Closure goal: preserve the completed unresolved experiment, independently locate the certification refusal, and admit one reproducible successor before further numerical work.
