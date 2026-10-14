# Stage 3 Increment 1: Controller Review

Increment 1 is not accepted yet. Three independent controller probes reproduce gaps in continuation and admission. These do not refute the accepted enclosure theorem or establish incorrect true-history containment on the reported positive cases. They prevent acceptance of the claimed resumable accepted boundary and declared total-budget contract. Grouping, workers and persistence remain held pending closure and live qualification.

## Bound subject and instrument

**Measured:** `shasum -a 256 -c` verifies all seventeen entries of the [returned scratch packet](../evidence/matched-pair-stage-3-increment-1-receipt-2026-10-12.md) and its 90-file source inventory. Bounded reads of the complete controller/header and three-file difference verify the separate entry point, decimal time operations, explicit H1 cause, default-preserving seams and ordinary-controller exclusion. The source is controller `a5df0690ec8671e8dfc7e61b660fc41882bd1b4789a4e11c970c7c9c4363c637`; the linked scratch library measured by `shasum` is `ba8f01b4acbcb2dcf3d61b1bb5dc11310a9695666a1b89ec596a26510f6e4c86`.

The new [independent C++ probes](../evidence/matched-pair-review-stage3-increment1-probes.cpp) compile separately against that library, with compiler exit zero observed before execution. They use $c_f=1$, coupling zero and an exact moving prescribed source, so no candidate acceleration oracle is imported. A fixed-step cancellation/resume control passes before the adaptive target; a finite positive total-budget control passes before nonfinite budget targets; a valid zero-length history boundary passes before a mismatched boundary target. Raw source, compile results and stdout/stderr are retained under `.local-data/eom-matched-pair/2026-10-12/reviewer-targets/`.

The writer's checker reports 47 of 47. Its fixed-step resume control does not cover the adaptive case below. Its recorded wide aliasing tube is correctly distinguished from a narrower tube: containing the true bracket does not imply excluding every erroneous interval. The removed disjointness expectation and failure retention are reasonable; they do not close the new findings.

## I1-R1: adaptive continuation loses controller state

Take exact prescribed histories on $[-20,0]$: receiver $z=0$, source $z=-9+(S+20)/2$, both charge one, coupling zero. At current time zero the source is at one. Since the coupling is zero, the continuation is analytically $z_r(t)=0$ and $z_s(t)=1+t/2$. Use initial step `1.5`, minimum `0.0001`, end `3`, positive increment budgets `1e-6`, and the default four-step cooldown.

The uninterrupted driver first shortens the step to `0.75` and publishes four steps. Cancel after two accepted steps at exactly `1.5`; the returned controller step is `0.75`. Resume through the current request API using the returned histories and evidence and the original controls. The resumed driver takes one step of `1.5`, while the uninterrupted suffix takes two of `0.75`. The independently compared full history content chains differ. This is not a true-state error; it is a reproduced counterexample to general resumed/uninterrupted publication identity.

**Cause measured by source read:** the request carries no continuation step size, cooldown, accepted-step ordinal or prior ledger. The controller reconstructs step size from `initial_step`, cooldown from zero and ledger from empty. Carry the actual accepted in-process continuation state, including the cumulative ledger and controller state, and bind it to the population/evidence and execution controls. Test cancellation during a cooldown, after retries, and before the first resumed attempt. A genuine continuation must reproduce the uninterrupted suffix; an intentionally changed policy is a separate run. On immediate cancellation or rejection, return the previous accepted ledger rather than losing it. Disk serialization can remain increment 4; in-process resumability is an increment 1 obligation.

Falsifier for this finding: the unchanged adaptive probe resumes with identical publication chains and accepted-step boundaries under an API that actually restores the accepted controller state, plus tests that altered or foreign continuation state is refused.

## I1-R2: nonfinite total budgets bypass the declared constraint

After the finite positive known case, replacing both total-budget fields by NaN produces `completed`, one accepted step and issued evidence. Positive infinity is also accepted. The driver checks increment budgets for positivity and finiteness but does not check the optional total budgets. A comparison of a radius with NaN is false, so the producer's `radius > budget` branch cannot enforce that constraint.

Reject nonfinite or nonpositive declared total budgets before any attempt, callback or publication. Apply consistent validation to the public producer as well as the driver; optional absence already expresses no total constraint. Test each position/velocity field independently, including NaN, infinities, zero and negative values. This is admission validation, not a modification of the frozen mathematical reference. Falsifier: all such malformed requests are refused without new evidence or state mutation, while unchanged finite-positive known cases pass.

## I1-R3: early returns bypass initial boundary admission

After a valid zero-length request at zero passes, request `start_time=end_time=1` with the same histories ending at zero. The driver returns `completed`, `accepted_end_time=1`, but its returned history end is zero. The request's documented requirement that histories end exactly at the start is bypassed because no producer step runs. The same issue affects initial cancellation and step-limit returns, which preserve unvalidated incoming state and evidence without admission.

Validate the initial full population, exact history boundaries, common prefix, charges/coupling and supplied evidence bindings before a zero-length, cancellation or step-limit return can describe an accepted boundary. This need not invent a positive step or issue new evidence. Preserve a legitimate zero-length completion without an accepted step, but never report an accepted time inconsistent with its histories or carry foreign evidence as a resumable state. Falsifier: the unchanged mismatched zero-length probe refuses, with independent early-cancellation and foreign-evidence variants also refused, and the known valid zero-length case remains valid.

## Other decisions and next artifact

The shortened-step cooldown is an acceptable bounded controller choice; it creates no cost or narrowness claim. It must be part of continuation and future replay identity. Separate request/checkpoint policy binding may be completed in the later persistence increment, explicitly remaining open; this does not waive the in-process continuation binding required by I1-R1 or permit ordinary-controller substitution. The current capability is an opt-in library entry point, not application/transport parity.

Claude owns the corrections and returned versioned packet; Codex preserves the subject, independent probes and frozen truth references. Return all three dispositions, fresh source/library/output bindings, actual live application/qualification and unchanged positive controls. No successor runtime stage is released until the predecessor findings and live evidence are accepted. The existing cutoff and hard closeout remain 23:30:23Z and 23:50:23Z on October 12.
