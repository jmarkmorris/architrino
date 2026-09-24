# OPS-031 — Observer Framework review, 2026-09-21

## Scope and disposition

Report-only whole-chapter review of [Observer Framework](../../../../content/markdown/aaa/spacetime/observer-framework.md), lines 1–482, under the periodic review procedure and corpus-review skill. The chapter was read in full with numbered source reads. Whole-chapter coverage is complete; this is not scientific closure of its comparison scaffolds. No corpus source was changed. CRW-005 remains closed.

One low-severity explanatory proposal is recorded below. No new demonstrated mathematical defect was found beyond the already recorded open obligations. The previous D1 record-equivalence repair survives the independent mathematical check below. Existing O1–O5 and deferred E2 remain limitations, not newly discovered work or resolved obligations.

Reviewer: Codex delegated review agent `ops_031_observer`; no model migration or model-comparison conclusion is made. Review duration and operator burden were not measured.

## Source versions

`shasum -a 256` measured these source versions. Observer Framework had the same digest before and after the review; `git --no-optional-locks status --short -- content/markdown/aaa/spacetime/observer-framework.md` returned no source entry.

| Source | SHA-256 |
| --- | --- |
| Observer Framework, before and after | `a762461606eb437bb061399d0ffdc45b24ef14ee10e6fd53781d222f25a7e2ff` |
| Master Equation, consulted opening and well-posedness qualification | `c06a7076562258bd3aa3e7987044535e11c07e16740dd811915531dc32f7a8ac` |
| Emergent Metric, consulted opening and observer projection definition | `47441fb210ec54d13e64888c9aa85f0d7257cc8c3d68da97d8992b687ab659b0` |
| September 11 Observer Framework receipt, including accepted scope | `84235f497cfec7cb626b815339b50e032cda384820c4139db427746c749bdc1f` |

Current Architrino primitive definitions and the task-relevant time, coordinate and observer terminology were consulted for consistency. Such consistency is not independent proof. No external experimental bounds, causal-order theorem, or process-matrix benchmark was revalidated; those remain at the source-support scope of the historical receipt.

## OBS-20260921-01 — Clarify which covariance sum needs zero cross kernels

**Grade and importance:** inferred explanatory ambiguity, low severity; not a new false covariance equation.

**Passage:** lines 293–312 now display the complete nine-term covariance expansion, including all six cross kernels, but the next sentence says: “The displayed sum is valid when the cross-kernels vanish under the same joint conditional law; otherwise those kernels must be retained.” The displayed sum already retains them. Read as a sufficient condition, the sentence is true, but its reference obscures the distinction between the full expansion and the diagonal-only approximation.

**Independent justification:** for real centered residuals $y=b+d+e$ with finite second moments under one conditional law, expanding $\mathbb E[y_Ay_B]$ gives three diagonal and six cross terms without any zero-cross assumption. For an explicit two-state check, give $Z=1$ and $Z=-1$ equal weights and set $b=d=Z$, $e=0$. Then $\operatorname{Var}(y)=4$, the diagonal-only sum is 2, and the retained cross terms supply the other 2. This is elementary algebra on a declared epistemic example, not an imported substrate law or a simulation result.

**Smallest proposed change:** replace that sentence with “The full sum retains cross-covariances under the same joint conditional law. It reduces to the three component covariances only when all cross-kernels vanish.” Leave the equation unchanged.

**Consequence and falsifier:** the change would make the condition attach to the intended reduced approximation. Reject the proposal if the owner identifies another explicit nearby definition making “displayed sum” refer to the three-term reduction, or elects to retain the existing sufficient-condition wording. This is a clarity proposal, not an assertion of newly introduced scientific regression. No causal attribution to an editor or model has been established.

**Routing:** existing corpus/editorial owner for adjudication; no implementation authority inferred from this review. Historical D2's missing-cross-term defect remains repaired in the displayed formula.

## Previous repair recheck: D1 record equivalence

The [September 11 receipt](../../aaa-corpus-rewrite/evidence/crw-005-observer-framework-review-2026-09-11.md#d1--tolerance-agreement-is-not-an-equivalence-relation) preserved the defect: readouts 0, 0.75 and 1.5 at tolerance 1 yield neighboring matches without an endpoint match, so pairwise closeness is not transitive. Current lines 223–236 instead identify histories by equality of their declared finite-precision records, $q(R(\mathcal B_1))=q(R(\mathcal B_2))$, on a declared alternative-history domain.

**Derived independent check:** put $f=q\circ R$. For any histories $a,b,c$ in that domain, $f(a)=f(a)$ establishes reflexivity; $f(a)=f(b)$ implies $f(b)=f(a)$; and $f(a)=f(b)$ with $f(b)=f(c)$ implies $f(a)=f(c)$. Thus the inverse images of record labels form a partition. No reviewer agreement or execution replay is used as evidence. The old tolerance witness cannot break this equality relation.

**Disposition:** mathematical correctness of the relation survives; the intended observer coarse-graining meaning survives; explanatory usefulness improves because the page expressly distinguishes a partition from a tolerance neighborhood. This does not establish a finite label count, a canonical choice of $q$, a probability law, or entropy recovery. The quotient numerator remains compact notation interpreted through the explicit alternative-history prose. Falsifier: a consumer uses pairwise tolerance matching instead of the same fixed record map, or changes that map between pairs while continuing to claim the same quotient.

## Whole-chapter coverage and remaining limits

| Inspected portion | Disposition and scope |
| --- | --- |
| Lines 1–129: complete-state perspective, physical observers, apparatus and photon-distance records | No new repair proposed. Definitions distinguish ontic state, finite access, endpoint separation, path length and inferred distance. The path integral needs an admitted path, as implied by its stated packet; it is not an empirical distance derivation. |
| Lines 131–187: boundary history and local evolution | Incoming normal condition, accumulated crossings, fixed-domain restriction and singular-chart warning survive inspection. With $c_f=1$, a ray through a unit ball from $(-2,0,0)$ gives dot products $-1$ on entry and $+1$ on exit, so the current condition excludes the old D3 outgoing witness. The evolution expression remains schematic; existing O1 well-posedness qualification is still an open issue. |
| Lines 189–236: ambiguity and record quotient | The ambiguity indicator correctly uses only the one-way inference from two compatible candidates with different global claims. A zero indicator is not used as an existence certificate. D1 repair survives as proved above. |
| Lines 238–346: boundary features, covariance and probabilities | Linear feature map repairs set subtraction. The covariance quadratic form equals the expectation of a square for real square-integrable channels, hence is nonnegative under those conditions. All cross kernels are present; OBS-20260921-01 is wording only. Existing O2 probability-space, factorization and conditioning obligations remain. |
| Lines 348–381: simultaneity | No new correction proposed. Absolute equal-$T$ slices are distinct from operational synchronization and the latter is not claimed to derive Lorentz behavior by finite signaling alone. |
| Lines 383–434: causal order, metric diameter and process comparisons | Scaffolds are explicitly comparison targets. Existing O3–O5 coverage, nonempty candidate-family, gauge/distance and setting-aggregation limitations remain. In particular a zero diameter of a singleton is not general uniqueness; no new uniqueness certification is made here. |
| Lines 436–482: clocks, preferred-frame requirement and closing navigation | No new repair proposed. Derived clock time is separated from substrate time, and metric/clock recovery is routed to its actual owners. The page does not supply or certify experimental thresholds. Existing E2 reader-flow/abbreviation concerns remain deferred. |

The historical receipt explicitly left O1–O5 open; `rg` on the live corpus board identifies the chapter as bounded repairs complete with open obligations retained. This review does not silently convert those into acceptance, duplicate their original findings, or reopen CRW-005. No new checker, test, renderer, numerical experiment or source-acquisition campaign was run. The no-change judgment outside the one wording proposal is an inspected-snapshot judgment, overturned by a concrete contradiction or failed independently specified consumer at the cited lines; it is not proof that no other error exists.

Only this evidence receipt was authored. Parent coordination owns the coverage cursor and any referral record. Substantive source changes require the established adjudication path.
