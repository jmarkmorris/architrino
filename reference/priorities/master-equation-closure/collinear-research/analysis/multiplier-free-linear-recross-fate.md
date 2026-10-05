# Fate after a smaller-family speed recrossing

## Question and current result

The accepted question is the fate of the smaller-trace sample B from the [upward-branch comparison](multiplier-free-linear-upward-branch-comparison.md), continuing through its downward speed recrossing rather than treating that event as a completed trajectory. The selected law is the uncapped multiplier-free signed linear-numerator interaction with every positive-delay partner and self root, absolute transmitter weights, $c_f=1$, and the same held preparation. No event impulse, receiver factor, root exclusion or physical branch selector is added.

The fate is not uniquely determined by the selected equation, including for the exact held preparation. The [independent derivation](multiplier-free-linear-recross-fate-independent-check.md), now connected to that preparation by the [independently accepted exact-release certificate](multiplier-free-linear-exact-release-independent-check.md), constructs two allowed futures after repeated smaller-family choices. One is global outward separation without a later position turn, with $v\to-1$ and $x+T\to P_\infty$. The other reaches infinitely many events at a finite time, where continuation with a finite acceleration trace at that boundary is impossible. Both retain every causal root. The result neither selects a physical future nor classifies every possible family choice. Exact membership of the saved numerical $c_0=-0.03$ sample remains a separate question; the certificate establishes generic smaller-family continuations of the exact preparation.

The [centered numerical continuation](multiplier-free-linear-recross-fate-continuation.md) passes sample B's downward birth and inherited minimum fold, reaching a second upward crossing. An expressly chosen larger-trace witness then receives older source folds and reaches a third upward crossing without a position turn. The [separate integral audit](multiplier-free-linear-recross-fate-integral-check.md) reconstructs velocity-clock profiles and complete roots independently. The analytical audit checks the global construction without using these numerical outputs as proof. Thus the completed investigation supplies allowed global fate and an exact finite-trace obstruction, rather than assigning one fate to a future that the law leaves unselected.

## Why the ledger must change again

Use $P(T)=T+x(T)$ and $Q(T)=T-x(T)$. The first upward crossing is a local minimum of $P$, and sample B's downward recross is a nearby local maximum. Immediately before that recross there is one negative-distance partner and two negative-distance self roots. Immediately after it, the newly born self root has its source between the preceding minimum and the recrossing maximum, so the ledger is one partner plus three self roots.

As the receiver moves with $v<-1$, $P$ decreases. When it reaches the old minimum, the two self sources straddling that minimum meet and disappear. Their acceleration contributions have the same negative sign. Their inverse-square-root singularity is integrable along the actual coupled receiver path and is resolved with a square-root clock coordinate. The remaining partner and original ascending self root have positive net acceleration in the local receiver neighborhood. They brake the superwake inward motion until another upward $v=-1$ event, at a lower $P$ minimum.

An upward branch from this new minimum has to retain all earlier history. If its increasing receiver $P$ returns to the old minimum, the old pair of self roots is created again. Passing to the old recrossing maximum would annihilate another pair. These are source-clock events at positive delay, not velocity kicks or permission to discard the preceding small excursion. The first larger-trace witness receives the old minimum pair while still moving inward and then recrosses before reaching the old maximum. Thus a naive two-root or three-root continuation would misstate its later geometry.

## Conditional no-turn accumulation

The independent report establishes sufficient hypotheses on an exact supplied history: two regular original source rows, their positive net acceleration in a receiver neighborhood, a strict two-trace threshold, and the single preminimum self row exceeding that positive acceleration at the chosen recross. Its derivative-cancelling source integral bounds the fold impulse and proves a full small excursion to a lower upward minimum. The free parameter at the next upward event permits another sufficiently small excursion whose whole clock range lies below the preceding minimum. Every old root remains retained; its absence from the new local chart follows from these clock ranges.

Choosing successively smaller durations and velocity excursions with summable bounds produces a finite accumulation time $T_*$, with $v\to-1$ and a negative position limit. No position turn occurs before $T_*$. Integrated absolute acceleration is finite. Each received self fold has negative unbounded acceleration on its approach, while the intervals after disappearance have positive regular acceleration. Hence no finite incoming trace exists at $T_*$.

A finite outgoing trace also fails. A negative trace would lower $P$ below its limiting minimum, where only the positive regular old acceleration remains. A positive trace would increase $P$ through old minimum levels accumulating at the limiting level, receiving infinitely close negative source-fold singularities. A zero trace cannot occupy the below-minimum region or a constant characteristic segment under the ordinary-root law, and motion above the minimum also receives the accumulating folds. This is an obstruction to finite-trace continuation, not a proof against every locally absolutely continuous history without such a trace. A root-count divergence is not used: nested small excursion ranges can be disjoint, leaving finitely many roots at each fixed nearby level.

## Conditional global separation

The original two regular rows are affine in receiver time: $R(T,L)=\alpha(L)T+\beta(L)$. Assume a compact clock interval containing every future minimum, regular original inverse source profiles there, bounded first and second derivatives, $\alpha\geq\alpha_0>0$, and $R(T_0,L)>2\sqrt{k}$. Then the positive incoming curvature $B$ grows at most linearly with time and remains above the two-trace threshold. These are hypotheses about an exact supplied history.

The independent proof rescales the small excursion by $a(1-a)=k/B^2$, $0<a<1/2$. Its saddle has unstable and stable eigenvalues $1-2a$ and $-1-a$. An exact limiting unstable orbit reaches the recross with source ratio $z_e=B^2/k$ and incoming negative acceleration magnitude $B_d=k/B$. Uniform estimates with $B\delta$ sufficiently small persist through downward birth, the inherited fold and the return to a lower minimum. Quantitative gaps ensure that each new excursion's entire clock range lies below the preceding minimum, so the old sources are excluded by their actual levels. The weighted spectral gap is maintained as $a\to0$; the endpoint uses a receiver-time chart because the logarithmic source chart is singular there.

Choose excursion durations proportional to $1/[(n+N)\log(n+N)]$, small enough for the uniform bounds. Their sum diverges, while their squares have a finite sum. The event times therefore go to infinity; the total downward clock displacement remains finite. Along the resulting complete-history solution,

$$
P(T)\to P_\infty,\qquad v(T)\to-1,\qquad x(T)+T\to P_\infty.
$$

The mirrored pair's separation $-2x(T)$ grows asymptotically at rate two in $c_f=1$ units. No position turn occurs. This is a derived existence result for deliberately chosen smaller-family members, not a universal prediction or an added physical selector. Summable choices instead produce the finite accumulation already described.

## Numerical application and independent checks

| Event on supplied refined history | Receiver time | Receiver clock relative to the original upward minimum |
| --- | --- | --- |
| Sample B downward recross | 16.16863799277284 | $3.967587666\times10^{-10}$ |
| First received minimum fold | 16.16864146916219 | $0$ |
| Second upward crossing | 16.16878722957892 | $-8.078713171\times10^{-8}$ |
| Larger-trace witness downward recross | 16.16893410527653 | $1.361608659\times10^{-10}$ |
| Third upward crossing | 16.16908621247332 | $-8.241676911\times10^{-8}$ |

These are measured approximations from the centered continuation, with startup cutoffs and history refinement recorded in its owner. The earlier direct reception-time audit recorded centered-clock mismatch $1.952\times10^{-18}$ and a prefold residual near $7.69\times10^{-9}$. The [conditioned independent audit](multiplier-free-linear-conditioned-recross-audit.md) now separates serialization density from evolution tolerance and checks all ten later positive-cutoff windows. Its completed 64001/16001 density run reduces clock disagreement to $3.70\times10^{-19}$ and the first prefold residual to $-3.47\times10^{-12}$. Its largest finest-window residual is $7.04\times10^{-12}$. Holding other settings fixed and tightening upstream flow gives a first residual $+1.21\times10^{-11}$, so the remaining numerical discrepancy is of order $10^{-11}$ and is not a certified accuracy bound. The historical plateau is therefore a resolved conditioning limit of that earlier representation, while the remaining numerical discrepancy and singular endpoint cutoffs stay explicit. None of these measurements is an exact-release error bound.

A controlled polynomial-profile checker bounds the saved original source profiles on $P_u\pm10^{-6}$, entirely inside one interpolation cell for each inverse source. It measures $\alpha\geq0.9237589592$ and $R(T_u,L)\geq7.6028703626$, against $2\sqrt{k}=1.0700067482$. These wide margins support application to that saved polynomial history. Floating-point profile bounds do not continuously enclose the exact held-release history, and the theorem's exact-solution incoming-curvature requirement must not be inferred from interpolation agreement alone.

## Exact-release follow-up and disposition

The accepted follow-up completes the exact-release connection. The [exact-release enclosure treatment](multiplier-free-linear-exact-release-enclosure.md), [polynomial-defect continuation](multiplier-free-linear-exact-release-defect.md) and [independent transfer analysis](multiplier-free-linear-exact-release-independent-check.md) certify the ordinary exact-decimal release through $T=12.4$. Independent rational receipt checks pass all 6352 cells, with frozen source and input identities, strict map inclusion, source isolation and contraction. The endpoint has $x\in[0.873598339044,0.873671699962]$ and $v\in[-0.992910216726,-0.992869612297]$. A separately checked 120-cell partner-only auxiliary, initialized from that certified history, proves the exact full-law first speed event at $T_c\in[12.411829310011,12.411934787688]$. The auxiliary agrees with the full law until that event; its postevent portion only brackets the event. The accepted actual birth/contact/fold certificate constructs the bounded-past germ, proves finite unique contact and passes through the inherited unequal-curvature fold with continuous position and velocity. Correlated source bounds and separately restricted incoming sectors sharpen the folded deficit to $W=-1-v\in[0.441817116811,1.795272213830]$. Earlier independently accepted prefixes, quantified wrapping limits and rejected bridge premises remain in their evidence owners.

The accepted event-input enclosure sharpens the first-event position to $x_c\in[0.861705561636,0.861884898384]$ and its curvature to $B\in[0.599150936815,0.599281478417]$. Its outgoing acceleration magnitude is enclosed in $[1.390163542048,1.390762477869]$. The corrected postfold source bridge then reaches the fixed-profile entry with $T\in[13.329642778119,15.451137303461]$ and $W^2\in[0.660313926032,8.385850934652]$. Both the near-endpoint source derivative and its earliest source time enter that bridge; two earlier candidates missing those premises are not accepted.

The [accepted exact source-profile comparison](multiplier-free-linear-exact-prebirth-profiles.md) preserves the complete two-row ledger, proves strict inward support through clock $P=7.84$, and forces the first upward $v=-1$ event before the decreasing clock reaches $6.45$. Its event enclosure is

$$
P_u\in(6.45,7.84),\qquad T_u\in[14.470361503222,22.119421355512],\qquad x_u\leq-6.630361503222.
$$

Throughout that possible event band, the incoming acceleration satisfies $H\geq1.118562145186>2\sqrt{k}$, while the original-source affine coefficient satisfies $\alpha\geq0.266481041244>0$. Independent rational replay checks every negative-acceleration, strict support and positive-action panel, together with the widened source profiles, controls and immutable input chain. These are enclosures of the exact preparation, not numerical estimates of its event time.

The independent transfer analysis proves that continuously differentiable affine profiles with Lipschitz first derivatives, denoted $C^{1,1}$, suffice for the fate theorem by integral Taylor remainder bounds. Its selected inverse sources are regular and lie at positive times; their acceleration and jerk bounds establish the required bounded weak second derivatives. The original emission-time-zero acceleration jump and its two clock images are excluded. Strict event margins and continuity provide an interior compact source neighborhood satisfying the extended theorem. Thus its global smaller-family no-turn construction and finite-accumulation obstruction now apply to the exact held release. Later family choices remain mathematical data unselected by the equation.

The new numerical continuation separately varies the second downward startup cutoff and preserves dense raw $w=1+v$ and centered receiver times, avoiding cancellation from subtracting unit speed or adding the absolute event time. The [numerical owner](multiplier-free-linear-recross-fate-continuation.md) records its new controls, frozen refinements and source-density limits. The [conditioned independent audit](multiplier-free-linear-conditioned-recross-audit.md) checks later witness intervals, records exact source partitions, shared velocity joins and sampled off-diagonal delay margins, and isolates the earlier plateau's dependence on saved-profile density. The tighter ordinary-flow comparison is recorded separately from the exact certificate.

| Obligation | Disposition |
| --- | --- |
| Superseded numerical next-boundary and manuscript open-status passages | ✓ Done: reconciled; earlier evidence retained under its recorded grade |
| Exact held release connected continuously to the later fate hypotheses | ✓ Done: independently accepted ordinary prefix, birth, contact, fold, postfold crossing and strict source-profile hypotheses connect the exact preparation to both generic fate constructions |
| Second downward startup refinement | ✓ Done: numerical matrix completed; no physical selector inferred |
| Independent later-witness root/integral verification | ✓ Done: positive-cutoff windows of the supplied dense history; not an exact endpoint enclosure |
| Prefold conditioning plateau | ✓ Done at numerical scope: earlier representation limit resolved by controlled density refinement; residual numerical limits, positive cutoffs and tighter-flow audit remain explicit |
| Exact identification of the recorded numerical $c_0=-0.03$ member | ○ Not done, separate: generic exact-release fate alternatives do not identify that finite-cutoff numerical sample |
| Classification of every later family choice | ○ Not done, separate from the accepted exact-release certificate work |
| Weaker continuation through finite accumulation | ○ Not done, separate: finite-trace obstruction retains its narrower class |

## Completion boundary and falsifiers

The accepted reconciliation and exact-release work is complete. The independent exact-history construction now applies to the held preparation and gives admitted global separation after the first upward event without a later turn, as well as finite event accumulation with no finite acceleration trace at the accumulation boundary. The supplied-history numerical witnesses retain their measured grades and cutoff limits. Exact numerical-sample membership, classification of every later family choice and weaker continuation through accumulation remain separate questions. Sample B alone does not specify every later choice, so its unique eventual fate cannot be assigned under the selected law.

Falsifiers include a missing root under the clock gaps, a wrong self acceleration sign, failure of the recross single-row bound, loss of the coupled minimum-fold passage, failure of the uniform saddle/endpoint estimates or nesting schedule, or a finite-trace continuation through the accumulation boundary satisfying the full punctured/integral equation. Numerical refinement and independently reconstructed clock/integral disagreement delimit application to the saved polynomial histories. The full independently derived estimates are in the linked proof, rather than inferred from numerical endpoint repetition.

The exact-release connection additionally fails if any frozen source or input identity mismatches its accepted receipt, a whole-cell inclusion or source-floor inequality fails under rational replay, a comparison panel leaves a coverage gap, or an additional admissible root invalidates its two-row postfold census. The accepted input chain, strict support inequalities, forcing calculation and source-profile margins are retained in the independent transfer analysis and the frozen `final-transfer-221650` namespace. A finite-cutoff numerical member disagreeing with its refinement is not a falsifier of generic exact-history existence; identifying that member requires its separate bounded-past certificate.
