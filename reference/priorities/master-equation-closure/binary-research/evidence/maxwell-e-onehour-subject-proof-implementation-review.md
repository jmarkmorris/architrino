# Implementation comparison against the frozen source-support theorem

Claim grade: derived for the source-support composition, measured for the stated source and receipt inspections. This record compares the one-hour subject implementation with the [frozen source-support theorem](../analysis/maxwell-e-onehour-source-split-2026-10-05.md). It is a post-freeze implementation review by the theorem author, not the separately authored independent mathematical reference or the target recurrence/domain audit. No new independent reference was opened for this review.

## Reviewed identities and instruments

The theorem was frozen at 23:47:16 UTC on 2026-10-05. Its SHA-256, measured with `shasum -a 256`, is `158af36d22eb8df9b1604264f28ac2c759280d8dee0a88afc87fea36fae262b5`. Its bytes remain unchanged.

The initial helper and driver were read in full using `cat`. The later record-only refinements and additional exact control were read using `cat` and `sed` before this record was written. The reviewed final identities measured by `shasum -a 256` are:

| Subject | SHA-256 |
| --- | --- |
| [Source-support helper](maxwell-e-onehour-subject-support.mjs) | `55e46ad51c53ea5efd443d237b3e42d16f42dc7a4da99933e9c2db6265d5ccba` |
| [Continuation driver](maxwell-e-onehour-subject-run.mjs) | `eebc76607259328f3a814deea91a4b072c9db5ca765c2f1ec006908e9e5e87f2` |

The recorded known-first output `subject/driver-known-v2.log` is retained under the established ignored one-hour evidence owner, `.local-data/master-equation-closure/binary-research/maxwell-e-onehour-2026-10-05/`. Its SHA-256 is `6d3176e77c58743d17f38a3a8c3e9d82ce25473fc8ca596e700ef98aa42e974b`. The full initial known-first log was read with `cat`; its scope is method controls, not a coupled target. The final known-first output includes the additional exact translated-root control described below. A separate independent reviewer retains authority over independent mathematical reconstruction.

## Mathematical correspondence

The driver's `family()` constructs physical support $P$ from a strict mirror upper face and a separately positive actual lower-face residual. Its radius premise is the prescribed receiving trial, `length(history.box(T,0)).lo - trialR`. The complete original no-prior-unit-speed premise supplies the actual speed/root census; the new code does not assert that a comparison box whose upper speed exceeds one is itself an actual subfield path. Its conditional character must survive every later report.

The lower residual is enclosed using the entire radial receiving box and a full aligned source-position offset. Those offsets use the complete $P$ inventory before the lower-face test. This is valid because the lower face belongs to completed physical history regardless of whether the chosen interval already contains the root. The positive residual then proves actual-root inclusion, using the original root census. Complete angular support is integrated from the lower face through the receiving trial, so its dependence on the current prescribed trial is explicit and noncircular.

The helper's `comparisonBracket()` enlarges its initial nominal bracket $J$ to contain both faces of $P$. The driver asserts this containment. The complete nominal endpoint signs and initial $R,D$ bounds are evaluated and stored in `bracketCertificate`. The existing [root instrument](maxwell-e-first-event-root-speed-floor.mjs) then contracts from that bracket with a positive nominal denominator at each iteration. This identifies the translated nominal root at the actual receiver with the already enclosed actual root; it does not merely find an unrelated nominal zero.

The nominal root derivative and the physical replacement denominator remain distinct. `unitClockDenominator()` uses the prescribed source velocity on $J$ during root contraction. `neutralFamily()` and `conditionalFrame()` subsequently retain both the nominal `Dclock` and the velocity-expanded `D`. Positivity is required for both. Actual source V/A offsets do not replace the prescribed acceleration/jerk in the nominal spatial derivative.

The complete prescribed history upper limit is enforced by `ExactReferenceHistory.box()` in the inherited [full-cell cache](maxwell-e-first-event-full-cell-history-cache-v2.mjs): it asserts that the entire query's upper face does not exceed the final comparison knot. Thus allowing $J$ or the contracted clock interval $C$ past the receiving left face does not extrapolate the stored comparison. All prescribed source X/V/A/J queries on $C$ remain explicit. The finite lower support restriction is checked separately.

The physical source inventory, comparison norm multipliers, alignment angle, and component source frames all come from $P$. The derivative matrices come from the complete nominal family $C$ with frozen source offsets. This is a conservative product enclosure because the actual source time lies in both intervals. Both transformed and original E component projections use `history.box(P,0)` for the source axis. No source error from unfinished physical history is requested.

The imported q/H helpers retain the original unscaled coordinate $p=u+q$. The exact transformed source-acceleration contribution remains $(n\cdot u)Ba$, and original E reconstruction explicitly includes the physical delayed-acceleration error. Neither the alternative scaled coordinate from the earlier Hale reference nor an actual-jerk hypothesis enters this driver. Existing source component, signed current, radius and angular formulas receive the same mathematical quantities under the new interval separation.

## Exact control showing why the split matters

The added stationary root-geometry control sets the receiving time to $100.1$, the comparison member position to $(2,0)$, and the physical completed cursor to $100$. The actual mirror root is $96.1$ and lies in $P=[96,98.1]$. A conservative source-position offset of $3.95$ includes the relative vector $(0.05,0)$, whose translated nominal root is $100.05>100$. All roots remain causal, the complete relative range stays positive, and the prescribed source denominator is exactly one. The comparison is constant and complete on all queried times.

This exact example distinguishes the two obligations. A blanket nominal-root requirement $C<L$ rejects a harmless auxiliary member; clipping it by the mirror bound would omit a member required by the mean-value estimate. It is a geometric control, not a solution of the E dynamics. It proves no numerical improvement on the original target.

## Review disposition and remaining limits

No mismatch with the frozen source-support theorem was found in the inspected helper, driver, root enclosure and history-coverage paths. This is a mathematical composition review, not a claim that all future trial cylinders close. Before target use, the coordinator still requires its separate independent reference assessment and known-first record. Every target needs independent complete recurrence, source inventory, coefficient-domain and physical reconstruction checks.

The first inspected version did not store initial nominal face signs and initial denominator/range values. Those values were checked at runtime, so their omission was a receipt limitation rather than a mathematical rejection. The reviewed refinement stores them. It also preserves $P$, physical errors, source geometry, angular error, frozen offsets and proposed $J$ before invoking the nominal clock helper, so a failure there retains its reconstruction inputs.

Falsifiers are a changed reviewed source identity without reinspection, a target whose actual lower residual is nonpositive, a missing physical source seam, a nominal root outside the prescribed domain, loss of actual-root linkage, nonpositive nominal or offset denominator, missing physical source acceleration, or failure of any strict receiving trial. A failed sufficient condition carries no first-event or all-future-fate conclusion.

## Producer diagnostics after the source review

Claim grade: measured, limited to a direct author reading of producer output with `jq`, not independent numerical acceptance. A rational-string-to-decimal display filter first returned the exact known displays $3/4=0.75$, $-5/2=-2.5$ and $2=2$. Only after that recorded pass was it applied to the producer records below. These decimal values are explanatory displays; the retained rational records own every inequality.

At the same exact first new endpoint, $7599946539155641/140737488355328$, `sed -n '15679p'` of the original final Cartesian54 rows and `tail -n 1` of `subject/first-cell-v1.json.jsonl`, each followed by the same `jq` display filter, report:

| Quantity | Original shared guard | Broad actual-support split |
| --- | ---: | ---: |
| Physical receiving velocity error | 0.0386332914262 | 0.0436411810679 |
| Transformed-state error | 0.0251957788404 | 0.0276786237649 |
| q source forcing | 0.0110081363238 | 0.0135364290636 |
| H source forcing | 0.0146530687574 | 0.0184333209825 |
| Physical source radius error | 0.00339223844219 | 0.00557299521623 |
| Physical source velocity error | 0.00342055906441 | 0.00604223713856 |
| Physical source acceleration error | 0.00133154513199 | 0.00259149656001 |
| Source-to-receiver angular discrepancy | 0.0160606360935 | 0.0161056851644 |

The original row is in `.local-data/master-equation-closure/binary-research/maxwell-e-first-event/fine-E-neutral-Cartesian54-T59p57-v1.json.jsonl`; the split row is in the established one-hour ignored owner named above. The nominal clock enclosures are nearly the same: approximately $[51.645894,51.736685]$ and $[51.646493,51.736093]$, respectively. The source inventory difference is therefore visible independently of any claim that the nominal root changed materially.

Claim grade: inferred. The larger physical source inventory increases the source-forcing inputs in this comparison. The substantially larger receiving error relative to the initial transferred physical error $0.0116837194367$ is not attributable wholly to the split: the original method already incurs most of that jump when it initializes $p$ with the triangle bound $e_u+|\delta q|$ and reconstructs physical velocity using another q-error allowance. The same-cell table identifies the incremental change from the split. A discrepancy in either source binding, the exact receiving endpoint, or the retained forcing definitions would overturn this comparison.

A later live-row reading at 23:56 UTC, from `tail -n 1` of `subject/bounded500-v1.json.jsonl`, reports the receiving endpoint approximately $54.5008680556$, a logarithmic-norm upper bound about $3.44164$, forcing about $0.252348$, angular discrepancy about $0.0602572$, transmitter denominator lower bound about $0.978363$, and range lower bound about $2.06179$. This is a completed producer row observed while the producer was running, not a final endpoint or an independent certificate. Its physical support was approximately $[52.010002,53.460955]$ while the nominal root family was approximately $[52.109004,52.422255]$.

Claim grade: inferred. These records make growth of error and angular bounds a concrete possible limitation before the displayed root-chart floors approach zero. They do not identify the next failed inequality because the inspected row had accepted its trial. The [finite support-refinement theorem](maxwell-e-onehour-subject-proof-support-refinement.md) can remove unnecessary source bins, but it does not remove the physical angular-error integral accumulated near reception. Its numerical effect requires its own complete application and independent audit.

## Finite-refinement implementation review

The [finite-refinement helper](maxwell-e-onehour-subject-refinement-v1.mjs), SHA-256 `941b5ae3a442a7ad531118e477f13a7b17469c18bbb089b10d9f926583119d6f`, was read in full with `cat`. A complete `diff -u` from the already inspected split driver to the [refined driver](maxwell-e-onehour-subject-refined-run-v1.mjs), SHA-256 `e1373ad3d8c2e7f4fd24948717796b9972a60d4d4339cd5574469cf53ffbd935`, establishes its scoped changes. Both identities were measured with `shasum -a 256`.

Each stage recomputes complete physical source errors, geometry and angular support from its already proved physical interval; freezes those values; proves a fresh nominal bracket containing that interval; and records the certified clock and its intersection with physical support. The original independent actual bracket is retained. The helper returns the physical support used by its final complete coefficient stage, not the further intersection that has not yet been recertified. If a later optional nominal certificate fails, it returns the complete preceding valid stage and retains the failure reason. Empty intersection and initial certificate failure reject the calculation. A new invocation of `family()` rebuilds the chain for each receiving trial, so trial growth does not reuse an old narrow support.

The known-only refinement receipt reports successful exact singleton, nonnested nominal interval, prior-stage fallback, empty-intersection rejection and first-stage-failure controls by `jq` inspection of `subject/refined-driver-known-v1.json`. These are implementation controls, not a new independently validated coupled interval.

No mathematical mismatch with the frozen refinement theorem was found in this comparison. One receipt interpretation needs to remain explicit: the top-level `physicalSupport.lowerResidual` still describes the original outer bracket's lower face, while `physicalSupport.P` identifies the final refined support. The correct lower-face binding is stored in `physicalSupport.actualBracket.P`. An independent refined audit must use that original bracket, rather than treating its residual as a newly strict sign at the final support face. A final support face can equal the actual root exactly. This is an explicit metadata distinction, not a missing root proof.

## Literal failed-step support replay

The complete [support-only replay source](maxwell-e-onehour-subject-failed-step-support-v1.mjs), measured SHA-256 `6c432963debbf01c92b7f79aeb4739dfc6559b8ee7622416df03814a23def171`, was read with `cat`. It binds the original final subject and all 15,832 completed rows to their preserved hashes, requires the independent recurrence/domain/tangential admission receipts, and reads the literal failed receiving cell and prescribed trials from that subject. Its comparison history remains bound to the original immutable input hash. The program does not propagate the receiving recurrence.

Claim grade: measured, by author `jq` inspection of the producer receipt `subject/failed-step-support-v1.json`, SHA-256 `940512df474843fa4897563371b960d26c9dfe4941380392ee0a05b53367ad28`. The producer reports a complete support/coefficient pass on the literal failed interval $[7674713329844545,7675202001679113]/140737488355328$, with exactly the original radius and physical-velocity trials. Conservative decimal displays from its retained rational bounds are:

| Obligation | Producer result |
| --- | --- |
| Actual physical support $P$ | $[52.0478661451,53.4999776203]$ approximately |
| Actual lower-face residual | Greater than $0.11609$ |
| Full nominal bracket $J$ | $[50.7552624797,53.8613820138]$ approximately |
| Nominal lower-face residual | Greater than $1.54528$ |
| Nominal upper-face residual | Less than $-1.40550$ |
| Nominal denominator over $J$ | Greater than $0.66819$ |
| Contracted nominal family $C$ | $[52.1493783201,52.4626746176]$ approximately |
| Range over $C$ | Greater than $2.05703$ |
| Physical source-V/A replacement denominator | Greater than $0.97748$ |
| Nominal-clock denominator over $C$ | Greater than $1.01520$ |

The q/H coefficient family and original E reconstruction coefficients use the same complete $C$ and frozen physical source offsets. The final nominal bracket in this particular replay also happens to precede the receiving cursor; the theorem permits that outcome and does not require a nominal interval to cross it. The improvement is that the physical inventory is no longer enlarged to satisfy an auxiliary shared search-window rule.

This literal replay addresses the recorded source-guard failure directly. The broad-support continuation begun at the earlier time-54 transfer changes intervening error bounds and therefore answers a different numerical question. Neither comparison substitutes for the other. This author reading found no mismatch with the frozen theorem, but independent arithmetic/domain assessment of the replay remains a separate requirement. A support pass alone does not establish that the failed receiving cell's transformed-state, radius and physical-velocity trials close.

## Literal receiving-recurrence source review

The [same-coordinate endpoint theorem](maxwell-e-onehour-subject-proof-endpoint-continuation.md) was frozen before reading the new [literal failed-cell recurrence source](maxwell-e-onehour-subject-failed-step-recurrence-v1.mjs). The complete source was then read with `cat` and measured by `shasum -a 256` as `a9cd8201812cca021b39bbcea31990bf7008fe7f0bb8e24674dcb096e0716d63`.

The instrument explicitly loads the raw admitted final row's `Wend`, `nu` and radius error, and computes the proved maximum-of-one metric adjustment. It asserts equality of its new metric with the literal stored next-trial metric. The recorded radius, transformed-state and physical-velocity trials are not enlarged. The original comparison, defect and source-row hashes are retained; complete physical source and angular history are preserved. Its raw and two-refinement modes each construct a fresh complete source certificate for that same fixed problem.

No mismatch with the endpoint, source-split and finite-refinement proofs was found in the complete source read. The calculation's `passed` flag means that the calculation completed; `recurrence.accepted` separately records whether all three strict receiving inequalities passed. Physical acceleration and component outputs remain conditional calculations when any strict trial fails. Neither flag is independent numerical admission.

The source does not build a new angular-density/cumulative-angular-error history row. That omission is consistent with a single-cell replay that does not act as a new restart inventory. Reusing an accepted replay for further propagation would require the normal physical-component and angular-history row completion plus independent admission. This review grants no target authority and precedes reading a target outcome from this recurrence instrument.

## Observed effect of finite refinement on the first receiving cell

Claim grade: measured, limited to author `tail`/`jq` inspection of `subject/refined-first-cell-v1.json.jsonl`. At the same exact first endpoint used in the earlier comparison, the three-stage finite refinement narrows actual source support from approximately $[51.6331633,52.8614357]$ to $[51.6507157,51.7319111]$. The producer's physical velocity error is approximately $0.0381802100$, transformed-state error $0.0249832012$, q forcing $0.0108020793$, and H forcing $0.0137419724$. The angular discrepancy remains approximately $0.0160447182$. These figures use the previously checked display conversion and do not replace the rational receipt.

Claim grade: inferred. On this single receiving cell the refinement removes the additional forcing associated with the broad actual interval and gives a modestly smaller producer bound than the original shared-guard calculation. It supports the proposed inventory mechanism; it does not establish a general speedup, better asymptotic error growth, or a later physical event. Independent numerical audit and a complete later receiving interval remain separate obligations.

## Literal failed-cell recurrence receipts

Claim grade: measured, by author `jq` inspection of the producer receipts `subject/failed-step-recurrence-refine0-v1.json` and `subject/failed-step-recurrence-refine2-v1.json`. Their SHA-256 identities, measured with `shasum -a 256`, are `18f86a05210278aaaf444a48826bbe6192515a16005411a4678ee2e21d0d87aa` and `483019b2ae90e4542bea7a2a6e8609bc3ac313e782ef29f93fec5a03f21f13a4`. Both report successful calculation and all three strict receiving inequalities accepted on the literal old failed trial. Decimal displays use the previously checked rational display conversion.

| Quantity | Raw split | Two refinements |
| --- | ---: | ---: |
| Transformed-state trial slack | 0.0255594987 | 0.0257884803 |
| Radius trial slack | 0.0100346679 | 0.0100562851 |
| Physical velocity trial slack | 0.0509956490 | 0.0580361372 |
| Physical velocity error | 0.2191034912 | 0.2120630031 |
| Physical acceleration error | 0.0804590782 | 0.0703582119 |
| Transformed-state error | 0.1439700321 | 0.1437410505 |

The raw split alone therefore reports removal of the recorded shared-guard obstruction and closure of that same proposed receiving trial. This remains a producer result until the independent reviewer admits its arithmetic, whole root/source domain, physical reconstruction and inherited endpoint bindings. The two-refinement result addresses the same literal trial and gives additional margin. Neither receipt independently certifies a subsequent receiving cell or an event. A failed independent recurrence/domain audit, an altered input hash, or a mismatch of literal trial or endpoint state would overturn this reading.

## Same-coordinate continuation adapter

The complete [endpoint continuation adapter](maxwell-e-onehour-subject-endpoint-continue-v1.mjs), SHA-256 `eb42a93322b2ec5bd8fc547ded01cf7e4ae16fea65484bc6ac891f1ab1b9df8e` measured with `shasum -a 256`, was read using `cat` and `nl -ba` to recover the long source lines. It loads the admitted final row's exact `p`, `W`, `Wend` and `nu` onto the retained final physical/angular row, applies the proved metric adjustment, and preserves the original complete physical and angular prefix. It requires all three old admission receipts. The first receiving trial is exactly the recorded failed trial, with enlargement prohibited; subsequent receiving trials retain the existing adaptive policy and each builds a fresh physical/nominal support proof.

The adapter completes physical velocity/acceleration components, angular density and cumulative angular error before adding a newly accepted row to the reusable source inventory. This supplies the row-completion obligation intentionally absent from the single-cell recurrence replay. No mathematical mismatch with the frozen split, refinement or endpoint-continuation theorem was found in this source review. Independent numerical/domain admission remains separate. The earlier metadata distinction still applies: the original lower-face residual belongs to `actualBracket.P`, while the final narrowed physical support is recorded separately.

## Continuation growth diagnosis while the producer is running

Claim grade: measured, limited to `tail -n 1` and the checked `jq` display conversion on `subject/endpoint-continuation-v1.json.jsonl`. A completed row at approximately $T=54.5668402778$ has physical velocity error $0.250521$, transformed error $0.170617$, logarithmic-norm bound $4.06728$, source forcing $0.289083$, and angular discrepancy $0.0676761$. It accepted its trial in one iteration; its range lower bound exceeds $2.04087$ and its source denominator lower bound exceeds $0.97536$. This is an inspected live row, not the final producer endpoint or an independent admission.

A subsequent inspected row at approximately $T=54.5703125001$ has intrinsic source errors approximately $(0.00476182,0.00503163,0.00208973)$ in position, velocity and acceleration. Its angular discrepancy $0.0685647$ expands those errors to approximately $(0.0946557,0.0320729,0.0112645)$ after fixed-reception alignment. Its physical velocity error $0.255646$ is the sum of transformed error about $0.174238$, position-to-q allowance about $0.022697$, and q source allowance about $0.058711$.

Claim grade: inferred. The angular contribution dominates the aligned source-position allowance in this inspected row, and the logarithmic-norm term is larger than the direct source forcing in the transformed differential bound. Finite physical-support refinement removes unnecessary source bins but cannot discard the accumulated source-to-receiver angular-error integral. The present numerical pressure therefore comes from error and alignment growth while the displayed root-chart floors remain positive. These observations neither identify a future failed inequality nor establish actual physical instability. Recomputed coefficients or an independent domain/recurrence audit that changes these retained bounds would falsify the diagnosis.

## Precise missing data for a stronger phase estimate

Claim grade: derived from Euclidean polar differentiation, with positive actual and comparison radii and the same intrinsic radial/tangential orientation already used by the admitted comparison. Write $\delta r=r_a-r_c$ and $\delta u_t=u_{a,t}-u_{c,t}$. On continuous angle lifts of those unchanged histories,

$$
\delta\theta(T)-\delta\theta(S)
=\int_S^T\left(\frac{\delta u_t}{r_a}-\frac{u_{c,t}\delta r}{r_a r_c}\right)d\tau
=\int_S^T\frac{r_c\delta u_t-u_{c,t}\delta r}{r_a r_c}\,d\tau.
$$

The current [component angular theorem](maxwell-e-first-event-component-angular-density-theorem.md) bounds the absolute value of each term, and the [angular primitive](maxwell-e-first-event-angular-primitive.mjs) integrates nonnegative whole-cell upper densities. The saved `omega` and `angularPrefix` values therefore retain no sign or cancellation data. They cannot alone justify a stronger signed integral estimate.

The missing mathematical data are a rigorous joint signed enclosure, or an equivalent rigorous signed primitive, for the combined expression $r_c\delta u_t-u_{c,t}\delta r$ with its positive denominator. Its domain must include every completed cell and both partial endpoint cells, every possible actual emission $S\in P$, and the whole receiving trial through $T$. Bounds at the receiving endpoints alone do not supply this information. The source identity, prescribed history and intrinsic orientation must remain fixed; a phase reset would change the compared quantity.

An exact kinematic control explains why correlation matters. Set $r_c=1$, $u_{c,t}=1/4$, $\delta r=\varepsilon$ with $0<\varepsilon<1$. If $\delta u_t=\varepsilon/4$, the signed angular-rate difference is zero, although both error magnitudes are nonzero. If $\delta u_t=-\varepsilon/4$, its magnitude is $\varepsilon/[2(1+\varepsilon)]$, equal to the sum of the two absolute allowances. Independent magnitude data admit both cases and cannot select the cancelling one. This is a control of the geometric identity, not a claimed solution of the E equation.

One concrete successor criterion is to establish, independently, a uniform signed-integral enclosure with absolute upper bound $\psi_{\mathrm{new}}<\psi_{\mathrm{old}}$ and then close all three strict transformed-state, radius and physical-velocity inequalities on the literal next failed receiving trial after rebuilding its complete source/clock/coefficient families with that stronger allowance. No such signed transport instrument is launched here. Loss of sign/correlation or whole-interval coverage falsifies the phase claim; failure of any strict receiving inequality after complete recertification falsifies sufficiency for that trial. Until a new actual failure is recorded, phase-error growth remains a measured-bound diagnosis and an inferred method mechanism, not a proved next obstruction.

## Author-scope closure

The coordinator requested closure before the scientific cutoff and reported independent acceptance of the repaired literal cell. This addendum preserves the author's source-applicability review and explicitly scoped producer readings; the independent reviewer owns numerical acceptance and the coordinator owns the final endpoint and campaign conclusion. The signed phase estimate is a proposed next method investigation under the same law and history, not an established bottleneck or a physical result.

The author created only the source-split analysis and the three mathematical addenda linked here. The three theorem files remain at their frozen hashes. No subject or reference implementation was edited by this author, no target job was launched, no job remains owned by this author, and no Git publication or shared-owner edit was performed. Source review and the exact controls establish the stated mathematical interfaces; the producer receipt readings do not substitute for independent arithmetic/domain audit. No further research was undertaken after this closure request.
