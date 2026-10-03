# Fate after a smaller-family speed recrossing

## Question and current result

The accepted question is the fate of the smaller-trace sample B from the [upward-branch comparison](multiplier-free-linear-upward-branch-comparison.md), continuing through its downward speed recrossing rather than treating that event as a completed trajectory. The selected law is the uncapped multiplier-free signed linear-numerator interaction with every positive-delay partner and self root, absolute transmitter weights, $c_f=1$, and the same held preparation. No event impulse, receiver factor, root exclusion or physical branch selector is added.

The fate is not uniquely determined by the selected equation. The [independent derivation](multiplier-free-linear-recross-fate-independent-check.md) constructs two conditional futures after repeated smaller-family choices. One is global outward separation without a position turn, with $v\to-1$ and $x+T\to P_\infty$. The other reaches infinitely many events at a finite time, where continuation with a finite acceleration trace is impossible. Both retain every causal root. Neither result selects a physical future, classifies every possible family choice, or supplies a continuous enclosure of the exact held release.

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

These are measured approximations from the centered continuation, with startup cutoffs and history refinement recorded in its owner. The independent direct reception-time integral audit has maximum centered-clock mismatch $1.952\times10^{-18}$; its prefold residual stabilizes near $7.69\times10^{-9}$, while its postfold residual is approximately $3.34\times10^{-14}$ on the declared windows. The prefold plateau limits numerical certification and is retained, rather than converted into a proof of exact-history accuracy.

A controlled polynomial-profile checker bounds the saved original source profiles on $P_u\pm10^{-6}$, entirely inside one interpolation cell for each inverse source. It measures $\alpha\geq0.9237589592$ and $R(T_u,L)\geq7.6028703626$, against $2\sqrt{k}=1.0700067482$. These wide margins support application to that saved polynomial history. Floating-point profile bounds do not continuously enclose the exact held-release history, and the theorem's exact-solution incoming-curvature requirement must not be inferred from interpolation agreement alone.

## Completion boundary and falsifiers

The accepted fate investigation is complete at the conditional-theorem and supplied-history numerical grades: unique short downward continuation, complete inherited fold reception, later nonunique upward events, global no-turn existence, and finite accumulation obstruction in the finite-trace class. An exact held-release certificate and classification of every later family choice remain separate open questions. Sample B alone does not specify those choices, so its unique eventual fate cannot be assigned under the selected law.

Falsifiers include a missing root under the clock gaps, a wrong self acceleration sign, failure of the recross single-row bound, loss of the coupled minimum-fold passage, failure of the uniform saddle/endpoint estimates or nesting schedule, or a finite-trace continuation through the accumulation boundary satisfying the full punctured/integral equation. Numerical refinement and independently reconstructed clock/integral disagreement delimit application to the saved polynomial histories. The full independently derived estimates are in the linked proof, rather than inferred from numerical endpoint repetition.
