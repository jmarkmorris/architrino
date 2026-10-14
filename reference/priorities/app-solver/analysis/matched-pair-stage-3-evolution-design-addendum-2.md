# Stage 3 Validated Evolution Design, Addendum 2: Corrections After the First Review of Increment 1

[Addendum 1](matched-pair-stage-3-evolution-design-addendum-1.md) records the serial validated evolution driver as first built. The independent review of that first subject found four defects, I1-R1 to I1-R4, recorded in the reviewer's [review](matched-pair-review-stage-3-increment-1-2026-10-12.md) and its [addendum](matched-pair-review-stage-3-increment-1-addendum-1-2026-10-12.md). All four are accepted as found. This addendum states what the driver and the step producer now do in their place. None of the four was a failed enclosure: every published tube in the first packet still contains the truth references. They are defects of admission, resumption and accounting. Every instance uses $c_f=1$. The measurements are in the [version 3 receipt](../evidence/matched-pair-stage-3-increment-1-v3-receipt-2026-10-12.md).

## 1. Resumption carries the controller state (I1-R1)

**The defect.** A run that was cancelled and then resumed from its returned population restarted its controller: the initial step, no cooldown, step ordinal zero and no ledger. On the reviewer's adaptive case the uninterrupted run takes four steps of $0.75$, while the resumed run took one step of $1.5$ after the cut, so the two published different histories.

**The correction.** Every admitted run returns a *continuation*: an object that holds the controls the run was produced under and the controller state it reached. The controls are the policy token, coupling, initial and minimum step, increment budget, total budget, attempt limits and cooldown length. The state is the accepted time, the controller's current step, the cooldown remaining, the number of accepted steps so far, the ledger of the last accepted step, the evidence, and the content chain of every accepted history. Only the evolution entry point can construct one, and it has no mutators, so within one process a continuation is always a state a run actually reached.

A request may carry a continuation. It is then a resumption and must match the continuation in every bound control, in its start time, in its evidence and in the content chain and charge of every path. Any mismatch refuses the request with the reason and publishes nothing. A request without a continuation is a new run with a fresh controller state, and is reported as such. A resumed run that accepts nothing returns the same continuation and the ledger it was given.

**What this does not do.** The continuation is not written to disk and is not bound into the ordinary request or the checkpoint identity. Both belong to the persistence increment. The seal is a property of one process.

## 2. Declared budgets must be finite and positive (I1-R2)

**The defect.** An optional total budget of not-a-number or infinity was accepted, because a comparison with not-a-number is false and the value was never validated.

**The correction.** The driver refuses a declared total budget unless both fields are finite and positive, before any attempt. The step producer applies the same rule to the increment budget and the total budget and declines with its admission code. An absent total budget still means no total constraint.

## 3. Admission precedes every early return (I1-R3)

**The defect.** A zero-length request, an immediate cancellation and a step limit of zero each returned before the initial population was checked. A request whose start time was not the end of its histories completed and reported that start time as accepted.

**The correction.** The producer's admission check, hypothesis H0 of the far-step theorem, is exposed as a callable check that takes no step: a nonempty population with distinct identifiers, one common history start, every history ending at exactly the start time, and, where any history declares a radius, evidence that binds every path's content and charge under this coupling. The driver runs it before anything else. A refused initial population returns no accepted time, no evidence, no ledger and no continuation. A genuine zero-length run at the histories' end still completes with no attempt and keeps its evidence.

## 4. The increment is the whole growth of the declared radius (I1-R4)

**The defect.** The increment budget is documented as the largest admissible growth of a declared radius in one step. The producer measured growth from the radius of its internal starting box, not from the radius the supplied history declares. The starting box is the history evaluated at the step start with outward rounding and then recentred on a binary64 value, so it is slightly wider than the declared radius. That extra width is published in the new declared radius but was not charged. On the reviewer's static case the published source radius is $5.33\times10^{-15}$, all of it new, and the reported growth was $2.4\times10^{-30}$, so a budget of $10^{-25}$ accepted a step that grew the declared radius by ten orders of magnitude more than the budget.

**The correction.** Write $d$ for the radius the supplied history declares at the step start, $\rho$ for the radius of the evaluated and recentred starting section, and $R$ for the published radius. The producer now reports and charges

$$g = \overline{R-d},$$

the upward-rounded difference, so that $d+g\ge R$ holds exactly for the reported binary64 values. The increment budget is compared with $g$. The two parts are reported beside it: the *section allowance* $\overline{\rho-d}$ and the *step growth* $\overline{R-\rho}$, which is the quantity the first subject charged. The declared radius $d$ is taken from the history's own radius token. Where that token is not a binary64 value the producer uses a binary64 value not above it, so the charge can only be overstated. The driver's ledger takes its inherited, increment and total entries from the producer's record and carries the two parts.

**Derived:** the ledger inequality $\text{inherited}+\text{increment}\ge\text{total}$ holds by construction, because the increment is the upward-rounded difference of the other two. **Measured:** on every accepted step of every run in the packet, 972 path-axis records, by exact rational comparison.

**What changes and what does not.** The published histories, coefficients, radii, evidence chains, step sequences and every controller decision of the earlier packet are unchanged; a row-by-row comparison finds differences only in the charge fields, each at least its former value, plus the new fields. A step is now refused where the newly declared radius exceeds the increment budget even though the growth over the step alone did not. For the cases in the packet that happens only in the new tight-budget cases.

**A consequence to carry forward.** Each step re-evaluates its starting section, so the declared radius grows by a rounding-sized amount per step even where the coupling is zero: at position $10$ about $5.3\times10^{-15}$ per step, measured on the two-step case. This is an honest part of the declared radius, and it sets a floor on any useful increment budget. It also means the accumulated radius has a term proportional to the number of steps, independent of step length. **Claim grade: measured** on one static configuration; the general size is **inferred** to be a few units in the last place of the coordinate.

## 5. Obligations that remain open

- Binding of the validated policy, its controls and the continuation into the ordinary request and the checkpoint identity, with the default fingerprint bytes preserved: persistence increment, with the checkpoint owner.
- Evidence and continuation are sealed within one process only.
- No grouping, no workers, no persistence, no cost measurement. The whole-step pair bound of increment 2 is derived and unimplemented.
- Unequal history starts are refused, not handled.

**Falsifiers.** A resumed adaptive run whose published content differs from the uninterrupted run; a continuation accepted with any bound control, start time, evidence or population content changed; a declared budget that is not finite and positive reaching an attempt; an early return that reports an accepted time for a refused initial population; an accepted step on which inherited plus increment is below the published total or the increment exceeds the increment budget; or the reviewer's unchanged tiny-budget target publishing a segment.
