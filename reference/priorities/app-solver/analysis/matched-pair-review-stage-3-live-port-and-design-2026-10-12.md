# Live Library Port and Stage 3 Design: Independent Review

Codex review, October 12, window 2. The [live library port](../evidence/matched-pair-stage-3-live-library-port-receipt-2026-10-12.md) is accepted within its bounded producer and snapshot domain. The [Stage 3 design](matched-pair-stage-3-evolution-design.md) is accepted with the controller and restart requirements below. Increment 1, serial validated evolution without grouping, is released for implementation and qualification. This does not accept an evolution implementation or release dependent increments. Default disabled, ordinary grouped-evolution refusal, the canonical equation and the fixed window remain in force. Every numerical instance uses $c_f=1$.

## Live port evidence

**Measured:** `shasum -a 256 -c` verifies the returned fifteen-entry receipt list and all 87 live source entries. Separate `shasum` measurements of the live library and fixture equal the receipt: library `124616a44aea9d21ae474194bb24d699e8061438569034ab4d7e268e1d8567c1`, fixture `982076e94ba7caf0fb7cd04e18405772837488cd9a4f65ce29d0e4eac670fdf1`. Bounded reads of the build script, CMake link and compile flags establish that the returned build targets the live source in a separate directory with Command Line Tools. The writer reports that Op ran the guarded application script; Codex did not observe its execution and does not independently attribute the write.

The unchanged [reviewer C++ probes](../evidence/matched-pair-review-stage3-cpp-v2-probes.cpp) were compiled separately against this live library, with a temporary header providing only three API type aliases to the canonical producer. The compiler exited zero before execution. A known static acceleration and then genuine issued-evidence inheritance passed before the targets. The original three decimal-publication inputs and the large-epoch input pass; independent missing-evidence, changed-coupling, changed-charge, join-compatible changed-ancestor and misapplied-append probes refuse. The evidence type is not default-constructible by the unchanged compile-time assertion.

The frozen [exact checker](../evidence/matched-pair-review-stage3-cpp-v2-check.py), retargeted only to the new output directories, records known interior quadratic minima, a negative exclusion, an affine endpoint and SHA-256 `abc` before targets. It then verifies publication slack on 23 returned steps and 144 path axes, reconstructs the content chains, verifies exact time extent, contains the independently frozen aliasing bracket and excludes the aliased interval. Both grouped scheduling routes contain the independently derived three-path acceleration bracket. A separate exact cubic endpoint reconstruction passes a known case before comparing all nine path/time states with the unchanged [three-path reference](../evidence/matched-pair-review-stage3-three-path-brackets.json); every position and velocity bracket is contained.

**Measured:** six explicit `cmp` comparisons of the returned existing fixture outputs with `.local-data/eom-matched-pair/2026-10-11/live-stage2-outputs/` exit zero; the same six match the reviewed scratch library port. The writer's retained checker reports 95 of 95, including logical accounting, actual width debit and refusal/fallback controls. Parity checks establish compatibility, while the separately authored probes and mathematical brackets supply independent acceptance evidence. Raw reviewer compilation, probe and exact-check results are retained under `.local-data/eom-matched-pair/2026-10-12/reviewer-targets/`.

The guarded apply script also passed an independent mechanical control in copied directory fixtures: a known changed preimage refused before the positive target and added no producer; matching preimages then applied all ten exact postimages. No live solver file was written by that test. This checks application mechanics, not the enclosure theorem. An initial preimage-list command used the wrong working directory and failed to open six files; the corrected command encountered already-applied postimages. Those failures are not mathematical regressions and are not attributed to a writer.

Falsifiers for this acceptance are a changed bound source/library/output, a failed frozen probe or exact containment check on a matching rebuild, or a changed disabled fixture. It establishes neither evolution use nor cost, population scaling, worker parity or persistence.

## Whole-step pair extension

**Derived:** section 2's extension is sound under the stated far-step hypotheses and the complete tube hypotheses of the accepted Stage 2 pair theorem. Fix an arbitrary receiver event $(t,\mathbf x)$ with $t\in[T,T+h]$ and $\mathbf x$ in its enclosing box. At the common history start, uniform presence gives a strictly negative causal residual. At $T$, H2 gives distance greater than $h$, hence a strictly positive residual because $t-T\le h$. Sub-wake speed makes the residual strictly increasing along each true source path. Each member therefore has exactly one interior root in the common retained slab.

Take the union of both members' complete root windows over all these receiver events. A convex source-position domain, a distance floor against the entire receiver box, a speed ceiling below one, and the Stage 2 separation and velocity-tube allowances must hold throughout that union. For this fixed event the accepted pair proof then gives the same radius $B$. Since neither the event nor its roots were selected specially, the union of all pair contributions lies in $[-B,B]^3$. Summing disjoint groups once and ungrouped individual enclosures gives a uniform acceleration enclosure for H4. Uniform absence gives zero; mixed or unresolved membership supplies no cancellation certificate. No nominal polynomial acceleration may replace an unspecified true-history error. A future implementation violating any coverage, membership or ancestry condition would overturn its admission, even if endpoint snapshots agree.

This establishes a mathematical route, not its implementation. Increment 2 remains dependent on accepted increment 1. Its correctness work need not wait for a cost measurement: the operator selected it already. Report measured widths and any timings honestly; a wider box, fewer evaluations or successful grouping alone is not a cost benefit.

## Controller requirements for increment 1

The general retry language in design section 7 is replaced by this code-specific disposition, based on bounded reads of `ValidatedFarStep.cpp`:

| Refusal | Required response |
| --- | --- |
| `VFS-H0-01` | Halt; invalid tokens, population, chart or evidence are not repaired by shortening a step. |
| `VFS-H1-01` | Halt for a retained-past speed failure; a prospective step-speed failure may retry with a shorter step. Distinguish these causes explicitly rather than guessing from one shared code. |
| `VFS-H2-01` | Bounded retry for step-box separation; never change the accepted histories. |
| `VFS-H3-01` | A shorter reception interval may decide the lower sign, but deficient retained coverage can remain undecided. Retry within declared attempt/minimum-step limits; halt without publication when unresolved. |
| `VFS-H4-01`, `VFS-H5-01` | Bounded retries from unchanged inputs; numerical overestimation or failed self-inclusion does not license ordinary fallback. |
| `VFS-PUB-01` | Halt and retain the failure. Do not silently treat a publication or append defect as an adaptive-step signal. |
| `VFS-BUDGET-01` | Bounded retry for increment growth. |
| `VFS-BUDGET-02` | Halt if the inherited total already exhausts the budget; otherwise bounded retry for new growth, with the same total constraint. |

The actual controller currently tracks time in binary64 and forms intermediate tokens with `decimal_token(current_time + attempted_step)`. The validated branch must carry exact decimal boundary tokens and compare/advance them exactly, including remaining-time selection and final termination. Preserve the large-epoch case at the controller level, not only inside the producer. Shrinking to minimum step must terminate within exact time and attempt bounds.

Reuse the existing certificate shape only with an explicit validated controller dispatch. Empty snapshots and substeps must not flow through ordinary root-pressure, corrector-discrepancy, cost-feedback or step-growth heuristics that assume those objects exist. Every rejected attempt and accepted-boundary cancellation must retain the previous full population, issued evidence and cumulative ledger together. Increment and total radii are separate constraints. Record per-axis inherited totals, increments and accepted totals; check publication and callback semantics with actual run results. Keep the implementation in a focused module behind thin composition seams.

## Policy and restart requirements

**Design decision:** replay is an acceptable revalidation method; no new trust-anchor project is required. Integrity chains alone remain insufficient. Replay must begin with an admitted exact prescribed prefix and re-certify each full population layer with the recorded exact boundaries, coupling, charges, policy, grouping/reduction rules, precision/version and increment/total budgets. Compare every published coefficient, radius, history chain and cumulative ledger. Reject altered controls and foreign or incomplete layers; never reconstruct issued evidence by merely parsing disk bytes. Without successful replay there is no validated continuation. Ordinary continuation, if selected explicitly as a separate run, cannot inherit validated status.

Bind the new numerical execution policy and its controls in the existing request/checkpoint identity, preserving the default fingerprint bytes. This is an execution-method change, not a change to the substrate law. Workers and persistence remain later serial increments and require actual repeated worker/restart evidence, not producer-only parity.

## Release

Claude may implement and qualify increment 1 now against freshly observed live sources under the accepted design and the requirements above. Return an actual evolution packet containing the known-first controls, frozen three-path and aliasing containment, refusal/atomicity/cancellation results, exact large-epoch controller extent, full ledgers and default compatibility. Update the design's stale application statements and retry meanings. Preserve actual receiving-host restrictions; do not bypass a refusal. Independent acceptance of the returned increment precedes grouping, workers and persistence. The cutoff is 2026-10-12T23:30:23Z; hard closeout is 23:50:23Z.
