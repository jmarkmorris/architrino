# Scratch C++ Candidate, Version 2: Exact Publication, Exact Time Extent and Explicit Evidence

The [independent review](matched-pair-review-stage-3-cpp-candidate-2026-10-12.md) of the [first scratch candidate](matched-pair-stage-3-cpp-candidate.md) accepted the corrected velocity allowance, supplied an independent truth for the grouped three-path snapshot, and found two defects in what the producer publishes, CPP-P1 and CPP-P2. It also asked that the consumer's registry be replaced by evidence the producer actually issues. This record describes version 2, which is a second scratch tree under new paths; the first candidate's tree, sources and outputs are preserved. Evidence is in the [version 2 receipt](../evidence/matched-pair-stage-3-cpp-candidate-v2-receipt-2026-10-12.md).

No file under `src/eom` was edited. Stage 3 of the [integration scope](../contracts/matched-pair-enclosure-integration-scope.md) is not entered; production evolution still refuses the grouped policies, and nothing is persisted or transported. Every numerical instance uses $c_f=1$.

## 1. CPP-P1: the published curve was not the curve the radii were computed about

Version 1 computed its radii about binary centres and then published seventeen-digit decimal tokens of those centres. A seventeen-digit token round-trips to the same binary value, but its own decimal value differs from that binary value, and the history layer's exact arithmetic reads the token. The reviewer found exact slack of about $-2.5\times10^{-17}$ in position and $-3.5\times10^{-18}$ in velocity between the published tube, read exactly, and the theorem's set. My statement that "the published cubic has exactly the centres as coefficients" was false, and the two units I added to the radius did not pay for the difference. The sampled guard passed because it compared against the layer's padded evaluation. No true path was shown to escape; the defect was in the claimed proof of coverage.

Version 2 removes the difference at its source. Every finite binary64 value has a finite exact decimal expansion, and the producer now publishes that expansion for every coefficient and every radius. The published curve is then exactly the curve about which the radii were computed. One operation in the construction can round: halving the acceleration centre, when that centre is subnormal. The producer tests for it and, when it happens, debits the largest possible deviation from the position and velocity radii. Whole-step coverage is then certified without sampling. With $H$ an upper bound of the segment's extent, the position and velocity slack are a quadratic and a linear polynomial in elapsed time whose Bernstein coefficients on $[0,H]$ the producer bounds from below with outward arithmetic; a step whose bounds are not all nonnegative declines. The checker repeats the test in exact rational arithmetic from the published tokens, the inherited sections and the acceleration box, with no candidate code.

## 2. CPP-P2: the step end was computed in binary

Version 1 formed the end time as the binary sum of start and step. For histories ending at exactly $10^{10}$ and a step of $0.0002987$ the nearest binary value is $10^{10}+0.000299$, so the emitted segment was longer than the step the hypotheses had covered, by exactly $3\times10^{-7}$.

Version 2 computes the end as the exact decimal sum of the two tokens. Start and step must be plain decimal tokens; histories must end at exactly the start token and begin at one common token, compared as tokens. Every duration-dependent quantity, the isolation test, the latest reception time, the root window, the a priori enclosure and both radii, uses an upper bound of the emitted extent taken from the history layer's own enclosures of the start and end tokens, which is at least the exact step. In the reviewer's case the end token is `10000000000.0002987` and the bound used is $3.03\times10^{-4}$.

## 3. Evidence in place of the registry

The first candidate's consumer admitted declared radii for any population found in a process-wide list that anyone could append to. The reviewer observed that a caller's own registration then sufficed. Version 2 has no registry.

A certified step issues a `ValidatedPopulationEvidence` object. Its only constructor is private and the producer is its only friend, which the fixture confirms at compile time, and it has no mutators. It holds the coupling token, the step's start and end tokens, and for every path the identifier, the charge token and two SHA-256 chains over every token of every segment of that path's history: one for the history the step was generated from and one for the history it published. The digest implementation is checked against the standard test vector before any target.

The evidence is passed explicitly and rechecked wherever it is used.

- **Producer admission.** A population with any declared radius needs the evidence issued by the step that published it. The producer recomputes each history's chain and requires it to equal that evidence's published chain, with equal identifiers and charges and an equal coupling. A record of an earlier step, of another population, or none at all, declines.
- **Append.** The base histories must reproduce the generating chains and the appended result the published chains.
- **Consumer.** The module request and the snapshot request each carry an evidence field. Under the validated-tube policy, declared radii are admitted only when the evidence's coupling equals the request's and the receiver and both members reproduce its published chains with equal identifiers and charges. The certified group keeps the evidence, and the existing whole-matrix recheck re-certifies the group with it. Missing, stale or foreign evidence gives `MPE-EVIDENCE-01` and exact evaluation.

Because an evidence object can be created only by a certified step, and a step with declared radii is certified only on evidence for its own input, the latest evidence binds the whole chain back to exact prescribed data. This replaces the first candidate's reliance on the sixty-four-bit history fingerprint with exact content binding. It remains in-process: nothing is persisted, and the type-level seal is not a signature.

## 4. Growth in the solver's own record

The producer now reports each step's radius growth in the solver's existing per-path local-error record, per axis and as the largest component, and applies the increment budget to that record. The inherited total stays where the solver already keeps it, in the history's declared radii. This maps the candidate's quantities onto the existing types. It does not connect them to the accepted-step certificate, which only a reviewed evolution integration could do.

## 5. What was checked

The [version 2 checker](../evidence/matched_pair_stage_3_cpp_candidate_v2_check.py) passes all 94 rows, with thirteen known rows first.

- **CPP-P1.** For every one of the 23 certified steps whose segments are in the outputs, the exact Bernstein coefficients of the slack polynomials are nonnegative; the smallest is positive. The producer's own certified lower bounds are nonnegative in every case.
- **CPP-P2.** Every end token equals the exact sum of start and step. The duration bound is at least the exact step everywhere. The reviewer's late-time case certifies with the exact end token; a start token in exponent form and a start that is not the histories' end both decline.
- **Evidence.** Every certified step carries evidence for its whole population; every declined step carries none and no ledger entry; across multi-step cases each step's generating chains equal the previous step's published chains. Missing evidence, another population's evidence and the previous step's evidence each decline at the producer. A certificate edited to look certified without evidence, and one carrying genuine evidence with other segments, are refused at append.
- **Unchanged from version 1 and repeated.** The static and three-path known cases, small and two-step budgets, the adversarial step, the 512-step run against the frozen bracket, the refusals for unequal starts, speed, isolation, lower sign, chart, enclosure and budgets, reception from generated segments, and the cross-language comparison.
- **Consumer.** One group certified from validated tubes under each scheduling route, with the evidence bound to it, the same accounting as before, and identical results on the two routes. The grouped receiver total and the disabled total both contain the reviewer's independent exact bracket of the true acceleration at $t=1/32$. With no evidence, stale evidence, another population's evidence or an altered member radius, no group is certified and the totals equal the disabled route's; with a changed coupling or charge no group is certified.
- **Existing routes.** The six existing fixture outputs from the second scratch build are byte-identical to the retained live outputs, although five solver files differ from live in that tree.

## 6. The live seam this implies

Nothing here is applied. The second scratch tree differs from live in five solver files and adds one header; the [difference](../evidence/matched-pair-stage-3-cpp-candidate-v2/solver-live-to-candidate-v2.diff) is retained. Reading it as a proposal:

1. `ValidatedEvidence.hpp`, new: the sealed evidence type and its content chain.
2. `MatchedPairEnclosure.hpp` and `.cpp`: the validated-tube policy, the tube bounds with the window-maximum velocity allowance, exact treatment of zero radii, an evidence field on the request and on the certificate, and the evidence refusal.
3. `CoupledEvolution.hpp`: one evidence field on the snapshot request. `CoupledEvolution.cpp` and `CertifiedAcceleration.cpp`: one line each, passing the evidence to the two places a group is certified.
4. The producer, as its own unit, is not in any of those files and would not enter evolution until a default-disabled evolution policy is reviewed.

Still required before this is more than a candidate: evidence that survives a process boundary and can be rechecked from retained records; connection of the growth record to the accepted-step certificate; a prefix proof before unequal retained starts can be admitted; and a cost measurement before any cost claim. The reviewer's entry classes the last two as extensions that do not block this qualification.

## 7. What this establishes and what it does not

**Claim grade: measured**, by the second scratch build and the checker identified in the receipt, on the listed cases. Version 2 publishes segments whose exact tubes cover the theorem's sets over the whole step, ends them at exact times, issues evidence that binds exact history content, and is consumed by the grouped route only with that evidence, while leaving every existing fixture output unchanged.

It does not establish a solver capability. The candidate is scratch, serial, first order and exercised on two and three paths. The evidence is sealed by the type system inside one process. The exact whole-step check and the reviewer's bracket are the two elements here that do not depend on candidate arithmetic; the rest of the qualification shares an author with the candidate. Falsifiers: a published segment with negative exact slack; an end token that is not the exact sum; a population with declared radii admitted, appended or consumed without evidence that reproduces its content; a grouped total that misses a correct bracket of the true acceleration; or a changed existing fixture output.
