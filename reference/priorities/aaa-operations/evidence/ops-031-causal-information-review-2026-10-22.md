# OPS-031 — Causal set and informational ambiguity review — 2026-10-22

## Scope and source versions

This report-only pass completes whole-source reviews of [Causal set and delay geometry](../../../../content/markdown/aaa/validation/simulations/action-energy/causal-set-and-delay-geometry.md) and [Informational ambiguity](../../../../content/markdown/aaa/validation/simulations/action-energy/informational-ambiguity.md), the coordinator's priority-4 sequences 161 and 163. The complete line-numbered reads cover lines 1–58 and 1–90 respectively, with no clipped target passage relied upon. The due batch explicitly authorizes these two chapters; it does not initiate a simulation or substantively edit their text.

Initial `shasum -a 256` measured the following source identities, preserved as disposable before snapshots under `.tmp/ops-031-oct22/causal/`:

| Chapter | Lines read | SHA-256 |
| --- | ---: | --- |
| Causal set and delay geometry | 58 | `41333b680399fdb172779b89990545991aaa65941dbb7a8eb30e849856a5f9f4` |
| Informational ambiguity | 90 | `f65783ae73a470fed7f1ab00bcce30f498c3c2d6dca855d8cd270d3af18d2388` |

Reviewer: delegated Codex agent `ops_031_causal_information_oct22`, continuing the current review lineage. Exact model build/settings were not independently exposed; no materially different model adoption or model-superiority claim is made. The live AGENTS, startup router, review skill and corpus-reviewer owner, periodic-review procedure, and relevant foundation, Master Equation, observer and style/terminology passages govern this pass. Mathematical references below are direct derivations independent of the target's wording, not agreement with another reviewer. Review time, resource consumption and operator burden were not measured.

## Disposition

No new actionable substantive defect was demonstrated in these inspected bytes. No substantive correction or optional rewrite is proposed. The no-change conclusion is inferred from whole-source reading and the explicit independent checks below; it is not a global theorem that these chapters contain no errors. A counterexample within the stated hypotheses, an uninspected passage, or changed source bytes would reopen the relevant conclusion. Existing dynamic continuation, coupled-history realization, inverse reconstruction and quantitative information obligations remain open at their existing owners.

## Causal set and delay geometry: complete coverage and independent checks

| Lines | Scope and disposition |
| --- | --- |
| 1–21 | Delayed set, omitted-history limits, positive-delay membership versus admitted acceleration contributions, and forward/backward search spheres: no change. The receiver label is explicitly suppressed rather than forgotten. |
| 23–29 | Local implicit branch and interval uniqueness/existence: no change. The target distinguishes a local simple-root result, an interval-wide speed assumption, and a separate existence bracket. |
| 31–35 | Characteristic family, super-field-speed nonexistence example and necessary self-hit history condition: no change. Neither speed threshold alone nor current receiver speed is used as a sufficient criterion. |
| 37–41 | Excluded diagonal and singular continuation: no change. Endpoint convention is not promoted into an event law or a controlled regulator limit. |
| 43–46 | Analogy and emission weight versus reception playback: no change. The analogy excludes water dynamics and does not calculate the primitive acceleration. |
| 48–58 | Four-event proposal: no change. It is explicitly guessed, distinguishes successive events from simultaneous roots, requires a full root census, and stops before dynamical realization. |

For fixed receiver event, independently differentiate the Euclidean norm: if the separation is positive, its emission-time derivative is minus the radial projection of transmitter velocity. Thus the derivative of range minus wake speed times delay is wake speed minus that projection, exactly the target's transmitter-side derivative. Differentiation with respect to reception time instead gives the receiver radial projection minus wake speed. Implicit differentiation therefore gives the signed playback ratio of receiver factor to transmitter factor. The delta collapse in transmitter time contributes the absolute inverse transmitter derivative exactly once; multiplying a receiver-speed factor would be a different law. These calculations agree with the inspected [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), lines 83–146, without taking its agreement as mathematical proof. A contrary norm derivative or a different declared emission measure would overturn the matching-law conclusion.

Interval uniqueness does not need differentiability of distance at a zero separation. For emission times a < b, the reverse triangle inequality bounds the change of range below by minus the transmitter displacement; that displacement is bounded by the integral of speed. A continuous speed strictly below wake speed on the closed subinterval [a,b] makes that integral strictly smaller than wake speed times (b−a). Consequently the root function strictly increases. Continuity and a sign bracket then give existence and uniqueness, whereas no bracket gives no existence assertion. This independently verifies lines 25–29, including the stationary range-two example: in normalized wake-speed units the root function is 2+s and its zero is −2, outside the displayed searched interval.

For the straight same-transmitter paths at reception time zero, with wake speed one, the receiver position is zero. The path −s times a fixed unit vector has range −s and delay −s, so every negative emission in the declared interval is a root and its transmitter derivative is zero. The path −2s times that vector has range −2s and delay −s, so the root function is −s > 0 for negative s. The first example establishes degeneracy and the second disproves sufficiency of super-field speed, not their realization by the coupled EOM.

For a self-root on an interval with continuous velocity bounded by wake speed, equality of chord length with wake speed times duration forces equality in both the integral speed bound and the triangle inequality. Continuity then forces speed equal to wake speed everywhere and velocity direction constant along the chord; otherwise one of the inequalities is strict on a neighborhood. Every intermediate emission lies on the same characteristic chord and the derivative vanishes. A simple self-root therefore needs a strict super-field-speed segment somewhere in its intervening history. A simple positive-delay self-root under the bounded-speed hypothesis would refute this conclusion. No current-speed restriction or dynamical stability statement follows.

The four-crossing construction supplies no actual path and properly says so. With emission held fixed, the reception derivative of its root function is minus the receiver factor; requiring that factor nonzero is therefore a condition for the proposed transverse crossings, not an added acceleration multiplier. The remaining numerical realizability burden is explicit and does not justify rewriting the proposal as a demonstrated maneuver.

## Informational ambiguity: complete coverage and independent checks

| Lines | Scope and disposition |
| --- | --- |
| 1–18 | Primitive acceleration record, vector-sum degeneracy, fixed polarity magnitude, and complete-state versus observer-record distinction: no change. |
| 20–50 | One-event stationary surrogate, signed vector versus magnitude/unoriented axis, and side/polarity construction: no change. |
| 52–79 | Single stationary hit, fixed matching radius and emission time, exactly two side/polarity choices, moving-hit recast and zero-vector exception: no change. |
| 81–90 | Conditional extra records, moving-transmitter array limitations, discarded provenance and probability-free information meaning: no change. No entropy or coding theorem is inferred. |

Independent algebra gives the two-choice result. Write K = coupling times squared primitive polarity magnitude, with K positive, and prescribe a nonzero vector A times u with A positive and u a unit vector. A stationary transmitter at receiver position minus lambda times u produces K times sigma times sign(lambda) times u divided by lambda squared. Its magnitude equals A exactly when |lambda| = sqrt(K/A), and its direction matches exactly when sigma times sign(lambda) = 1. Therefore only the positive-distance/like-polarity and negative-distance/unlike-polarity choices remain, for the stated stationary single-hit class and fixed receiver polarity. The root delay is this positive distance divided by wake speed; changing an emission epoch cannot compensate an arbitrary stationary distance. For normalized wake speed and K equal to one, distances one and two give amplitudes one and one quarter, as stated. A third side/polarity choice within these assumptions or a different matching radius would refute the result; adding other transmitters changes the comparison class.

For a resolved moving hit of weight W, matching K W/r² with K/r-star² gives r-star = r/sqrt(W). The root-domain assumption makes W positive and finite. Zero net acceleration cannot be reproduced by one finite stationary transmitter with K positive, while two opposite vectors can cancel. These elementary checks do not establish an original transmitter inventory, any future acceleration or self-consistent surrogate dynamics.

The reduction from a signed vector to its magnitude and an unoriented axis maps two opposite nonzero vectors to the same record. It therefore discards sign information even when the distinct transmitter hypotheses already reproduce the same signed vector. For a proposed observable to factor through any reduced record, that observable must be constant on the record's fibers, up to its declared accuracy. This elementary map condition supports the final sufficiency test without a probability distribution. The chapter explicitly refrains from deriving entropy, compression rates or statistical error bounds. No imported information-theory weighting or unproved prior is used as a primitive law.

The bounded observer dependency read, [Observer Framework](../../../../content/markdown/aaa/spacetime/observer-framework.md), lines 3–59, distinguishes complete retained history from finite physical records. Its distinction matches the target's assumptions; no complete observer chapter credit is claimed.

## Required previous no-change recheck

The actual September 25 [Action Model Comparison receipt](ops-031-action-model-review-2026-09-25.md), under “Other unchanged statements checked directly,” explicitly retained the distance derivative, moving-source absolute Jacobian and absence of a receiver-speed multiplier. This is a real prior claim-level no-change disposition, not a newly invented historical verdict. The current [Action Model Comparison](../../../../content/markdown/aaa/validation/simulations/action-energy/action-model.md), lines 154–176, retains those same scoped identities.

The independent derivative and transmitter-time delta-collapse calculation above rechecks that prior claim against current bytes. In the wave comparison's time-normalized root convention, the derivative is minus one plus the transmitter radial velocity divided by wake speed; its absolute value is the displayed denominator. In the canonical range-normalized convention, the derivative differs by wake speed, and the emission measure supplies the corresponding numerator. No receiver multiplier appears in either collapse. Correctness survives at this simple positive-range branch scope; the distinction between canonical acceleration and a scalar wave comparison remains preserved and explanatory. No replacement text is proposed: before and proposed after are the same claim, “The receiver-side factor is retained separately for signed root playback; it does not multiply the instantaneous acceleration.” A different chosen measure or a failed derivative under the same definitions would reopen the claim. This check does not credit a whole Action Model rereview or certify singular continuation.

The coordinator/other worker owns the batch's two accepted-repair samples. This receipt supplies one previous no-change recheck and two whole-path reviews only; it does not claim those additional samples were performed here.

## Validation, limits and handoff

The existing check-only instrument `node .tmp/ops-031-effective-proposal-oct12/validate.mjs <two target paths>` passed its known math/code/blockquote/fenced-link and valid/invalid TeX controls before processing the targets. It then reported 92 math spans, one display, one viewer link and five existing local-file targets for Causal Set, and 46 math spans, four displays, four viewer links and ten existing local-file targets for Informational Ambiguity. This is strict KaTeX syntax and local-file existence checking; it does not verify fragments, browser rendering, scientific mathematics or external URLs. No checker was authored or modified this pass.

Dependency hashes by `shasum -a 256`: Master Equation `a3fa7047b1347c8743d385a12e38c9994dc1d25dcf63037a53a727670db95267`; Action Model Comparison `70e720b3c1d46b18ec74ed0a4476707d1defe8aaca42b45ac107952eaf6d1ed3`; September 25 Action Model receipt `63f11063c4ab7ae77e39e37ada9460121a78f148156eddf6b97ece52f23a6aa4`. These dependencies received bounded reads, not whole-path coverage.

No corpus text, shared control record, independent reference implementation or historical receipt was edited. No solver/model execution, generated write or publication occurred. The coordinator retains coverage, cursor and next-date authority, with CRW-005 closed. No new owner follow-up is required for these two inspected chapters; singular continuation and inverse reconstruction remain scientific obligations, not newly introduced scan repairs. Final source identity is checked separately at receipt completion against the initial hashes above.

At receipt completion, final `shasum -a 256` returned exactly `41333b680399fdb172779b89990545991aaa65941dbb7a8eb30e849856a5f9f4` and `f65783ae73a470fed7f1ab00bcce30f498c3c2d6dca855d8cd270d3af18d2388`, respectively, matching both initial snapshots. These checks establish byte preservation of the reviewed sources, not their scientific completeness.
