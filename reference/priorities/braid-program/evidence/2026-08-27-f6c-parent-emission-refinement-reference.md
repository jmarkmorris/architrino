# F6c Parent-Specific Emission Refinement Reference

Status: derived conditional comparison contract for independent review, 2026-08-27. This document supplies neither an implemented comparison nor execution authorization. Its direct consumer is the parent-specific comparison identified by the [accepted four-request diagnostic](2026-08-27-braid-search-launch-readiness.md#independently-accepted-actual-first-four-genuine-requests).

## Scope And Preserved Owners

The [cell-zero declaration](2026-08-27-f6c-emission-refinement-predeclaration.md), SHA-256 `53f3398ba083218948c9efd93f10db09cbf5d617bc0270988f5adea24c48f037`, and its [pure comparison](../../../../scripts/eom/oracle/f6c_emission_refinement_conformance.py), SHA-256 `ec0eaaeae3da4ffb597ac92ff3ac1a5700a8cf88916144a7d994912270c4157a`, remain unchanged. The generic comparison must continue to use the independently authored [geometry reference](../../../../scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py), SHA-256 `19c57e9b638b0beb866c86b061b2325f9567add2a85608f0c42ef1f7612d9132`. No proposer, root library, history library, acceleration reference, adapter or existing control changes in this reference batch.

The first future actual consumer is original parent one, reception `[0.001,0.002]`, inherited emission `[-8,-0.049]`, in original frame zero. A generic reference may admit other explicitly identified original parents, but that interface is not authority to run all 160 parents. Preserve the same original eight histories and all coefficient, endpoint, per-axis and scalar allowance tokens. The existing compact piece-history digest is not a substitute for complete history-generation identity because it omits per-axis allowance tokens.

Plainly: check a different original interval without changing the saved geometry or uncertainty. The first interval's fixed endpoint rules cannot be copied onto every later interval.

## Conditional Restriction Rule

**Claim grade: derived, conditional.** Let the original reception interval be $I=[u,v]$ and one admitted pair's original emission interval be $E=[A,B]$, with $-8\le A<B<u<v\le0.13$. The original complete cover supplies the uniform guards and strict original face signs for the same coherent history family. The [uniform-face theorem](2026-08-27-f6c-continuous-reception-enclosure-contract.md#uniform-root-boxes-not-scalar-samples) supplies strict increase of the unrestricted distance-minus-delay residual with emission time. Retain normalized wake speed $c_f=1$, original speed bound `0.85`, clearance `0.27` and precision 90.

For each pair, begin the lower search with exploratory interval $[A,B]$ and retained face $L=A$. Exactly 32 times, form the exact midpoint and independently enclose the unrestricted whole-reception-cell residual there. Move $L$ only when the returned upper residual endpoint is strictly negative. Otherwise change only the exploratory interval. Restart the upper search from the original $[A,B]$, retain $U=B$, and perform exactly 32 queries, moving $U$ only when the lower residual endpoint is strictly positive. Use the same branch directions and complete query records as the cell-zero declaration. A non-strict sign is indeterminate, not a proof of absence; malformed bounds or failed arithmetic are failures, not indeterminate signs.

Plainly: a saved lower or upper face moves only after a proof that every permitted arrival remains on the correct side. The two searches have separate exploratory state and the same fixed work allowance.

Induction on retained faces gives $A\le L<U\le B<u$: every retained lower face precedes every permitted root and every retained upper face follows every permitted root. This statement depends on causality, not on $B<0$. An emission time may be positive while still preceding the entire reception interval. Final certification must independently recheck the oldest face at `-8`, both retained faces, all 56 nonself rows, eight explicit self exclusions and 112 complete closed-piece coverage records. Root-only distance/delay intersections remain forbidden while checking unrestricted face signs. The final root geometry and acceleration-factor checks retain their unchanged obligations.

Plainly: positive clock time is not a failure. Losing a root, skipping a shared endpoint or using the arrival equation to manufacture a face-sign proof is a failure.

## Exact Time Operands

**Claim grade: derived.** Restrict admitted original time tokens to finite decimals with at most 19 fractional places and magnitude at most eight; preserve their original tokens as identity. For any pair, let $s\le19$ bound the fractional places of both original emission endpoints. After $k\le32$ midpoint halvings, every proposed time has the form

$$
m=A+\frac{(B-A)n}{2^k}.
$$

Plainly: each proposed time lies on a finite halving grid between the exact original faces. No binary floating-point conversion is needed.

Its denominator divides $10^s2^k$, which divides $10^{s+k}$. Thus at most 51 fractional places and 52 significant digits suffice for every admitted original parent. Parent one's endpoints need $s=3$, so its corresponding bounds are 35 fractional places and 36 significant digits. These are time-token representability bounds, not bounds on polynomial or square-root rounding error. Those numerical operations still require the frozen directed enclosures. Do not reuse the cell-zero-only 34/35-place claim.

Plainly: the later intervals fit within precision 90, but their exact midpoint strings can be longer than the first interval's. Truncating those strings would silently change the test.

## Independent Reference Obligations

The pure comparison receives an explicit original parent index and frame, exact reception interval, original pair emission intervals, oldest time and complete source-generation identity. It takes bounded immutable snapshots before any progress callback, then independently reconstructs all 3,584 query enclosures and decisions, 64 final rows and 112 coverage records from original history polynomials. Original parent identity and local transcript numbering must remain distinct. All requested times, pair labels, interval precision and generation tokens must be checked exactly; caller injection is not authentication. Partial work reports only completed-prefix counts and never a positive final result.

For an independent stationary control with separation $d$, the unrestricted face interval is $[d+m-v,d+m-u]$. When the true face thresholds lie strictly inside the original emission interval, let $N=2^{32}$ and $\Delta=(B-A)/N$. The final certified lower grid index is $\lceil(u-d-A)/\Delta\rceil-1$, and the upper grid index is $\lfloor(v-d-A)/\Delta\rfloor+1$. These separately derived strict-grid answers test endpoint equality, nonzero reception times and positive causal emission upper endpoints without using a proposer or root library as the oracle. Additional controls must cover moving histories, original closed knots, unchanged indeterminate faces, malformed ownership, callback mutation and failed prefixes.

Plainly: the checker must earn its own known answers before it is used to approve the new producer. Matching the producer's saved output would only demonstrate replay.

## Execution And Claim Boundary

Freeze and independently review the new reference and its controls before implementing the separate proposer. A future parent-one attempt requires an independently reviewed source-bound invocation, new absent output paths and fresh watched closure under the existing inclusive 1,800-second, 2-GiB, output-size, heartbeat and shared-lock limits. The generic API grants no extra worker, full-history attempt, automatic retry, reception subdivision, budget reset or cap increase. The prior cell-zero run's measured 238.116677375 seconds does not establish cost for other parents or a parallel campaign.

All fifteen existing scientific-authority flags remain false. Conditional conformance authenticates neither the source generation nor the premises, and supplies no historical trajectory identity, metric, score, EOM execution, equilibrium, retention or physical claim. A missed original allowance or closed piece, wrong parent or time token, incorrect strict-grid branch, unconstrained face masquerading as proved, changed consumed source, or successful result after an incomplete prefix falsifies the corresponding comparison claim.

Plainly: this prepares one independently checkable refinement step. It does not declare F6c successful, unsuccessful or ready for a large parallel launch.

Closure goal: independently validate the generic parent comparison before a separate parent-one proposer and bounded execution.
