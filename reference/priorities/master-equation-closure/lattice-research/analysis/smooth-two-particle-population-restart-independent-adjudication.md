# Independent assessment of a complete-population restart

## Scope and current status

**Accepted: the complete small population state at $13/4$, actual complete-population continuation through $15/4$, and strictly rising common target height through $15/4$. The requested next maximum has not been reached.** Actual complete-population existence through $13/4$ was already established by the [accepted preceding assessment](smooth-two-particle-next-maximum-independent-adjudication.md). The new certificate proves small position and velocity bounds for every affected architrino at that endpoint and uses them to restart the full hereditary problem. At $15/4$ the accumulated rise exceeds 2048 times the preceding completed fall. This is not a completed upward excursion or an all-time growth claim.

The substrate equation, $g=16$, $c_f=1$, infinite alternating cubic lattice, prescribed stationary eight-source block sum and complete supplied past remain unchanged. The two original target labels are $E=\{0,e_1\}$; their supplied vertical pulse starts at source time $-11/8$ and ends at $-9/8$, and all environmental supplied pasts are stationary. Every forward position and velocity initially vanishes in displacement coordinates. The original preparation restriction and comparison-class boundary remain in force.

This assessment derived its population inventory and sufficient comparison estimates before inspecting the new candidate or developing contributor subject. Final acceptance uses frozen numerical data, complete implicit-root and history coverage, continuous residual bounds, exact joins and an independent reconstruction of the state bounds. Existing accepted subjects and references remained read-only inputs.

## 1. Which histories comprise the complete affected population?

For an environmental lattice label $j$, define

$$
m_j=\min\{|j-c|^2:c\in E,\ |j-c|^2\ge2\}.
$$

The excluded unit-distance old pulse finished before release. Until an environmental receiver first moves, it remains exactly at its anchor. At the pulse's leading endpoint the original transmitter also occupies its anchor, so the first direct postrelease excitation front arrives at

$$
\tau_j=\sqrt{m_j}-11/8.
$$

A generated front must also be considered before using this old-pulse inventory as the complete population. If a source $j$ first moves at $\tau_j$, its generated front leaves the anchor $j$ at that instant. A receiver $i$ that has not yet moved receives that front at $\tau_j+|i-j|$. If $c$ is an original target responsible for that source's first old excitation, the triangle inequality gives

$$
|i-c|-11/8\le |j-c|+|i-j|-11/8=\tau_j+|i-j|.
$$

Thus a generated path cannot make a new environmental label move before its direct old front whenever $|i-c|^2\ge2$. The exceptional original unit neighbors have a direct postrelease front from the other target by $2-11/8=5/8$ at the latest, whereas every generated front arrives no earlier than $\sqrt2-3/8>1$. The original targets themselves form the separately retained set $E$. Applying the same first-excitation argument successively excludes an earlier indirect chain outside this inventory. It does not say that subsequent generated excitations can be discarded from an already affected history.

Consequently, at $H_0=13/4$, the complete affected set is

$$
\mathcal P(H_0)=E\cup\{j\notin E:m_j\le21\},
$$

because $(H_0+11/8)^2=(37/8)^2$ lies strictly between 21 and 22. No moving-receiver displacement margin is needed to select first-excitation identities: such a receiver was stationary until its first excitation. A displacement margin remains necessary for counting later directed receptions.

The separately authored exact census `census.py` passed known cubic-shell, radical-comparison, nearest-unit-exclusion and accepted 76-source-prefix controls before the target run. Its result is:

| Inventory through $13/4$ | Count |
|---|---:|
| Environmental affected identities | 504 |
| Original targets | 2 |
| Complete affected histories | 506 |
| Incoming histories needed through $73/32$ | 248 |
| Old directed pulse channels | 860 |
| Generated directed channels | 9812 |
| Generated channels into environmental receivers | 9692 |
| Generated channels into the two targets | 120 |
| Distinct generated receivers | 458 |
| Generated receivers outside the old first-excitation set plus $E$ | 0 |

The 248 incoming histories consist of the accepted 246 environmental paths and both target prefixes. Every later history reuses these persistent identities; it is not a new source copy. The infinite stationary complement is still present in the exact stationary block field.

### 1.1. Directed reception and delayed-history coverage

With the accepted population displacement margin $B=1/64$, the old directed radius-21 front lies strictly before $H_0-B$, while radius 22 lies after $H_0+B$. The old directed inventory is therefore unambiguous here. For generated environmental source class $m$, the admitted squared receiving ranges are

| First source squared radius $m$ | Generated squared ranges |
|---|---|
| 2 | $1,2,3,4,5,6,8,9,10$ |
| 3 | $1,2,3,4,5,6,8$ |
| 4 | $1,2,3,4,5,6$ |
| 5 | $1,2,3,4,5$ |
| 6 | $1,2,3,4$ |
| 8 | $1,2,3$ |
| 9, 10 | $1,2$ |
| 11, 12, 13 | $1$ |

The two target futures admit squared ranges $1,2,3,4$. Exact radical comparisons with both signs of the displacement margin give identical possible and definite sets. This enumeration accounts for the 9812 channels above.

For the small complete-population comparison radius $1/2000$ and accepted incoming radius $1/40000$, every queried future source time through $H_0$ is at most

$$
H_0-1+1/2000+1/40000=90021/40000<73/32.
$$

Thus the new complete-population residual can use the already accepted incoming paths. Section 3.1 closes this small comparison radius against the new polynomial norms and solution-error bound; actual existence to $H_0$ alone would not establish it.

## 2. Independent residual propagation for a small population state

At the already accepted cut $a_2=73/32$, the 248 incoming histories comprise every then-affected identity. All newly added histories are exactly zero there. The earlier independent delayed-error calculation therefore supplies a common initial position error below $2.019\times10^{-8}$ and velocity error below $8.291\times10^{-8}$ for the enlarged population, conditional on exact inherited polynomial prefixes.

The new receiving equation has at most 146 generated rows in squared ranges $1,2,3,4,5,6,8,9,10$ and at most two old-pulse rows. On this suffix an active old-pulse reception has range $t-s\ge a_2+9/8>3$; its stationary-subtraction segment also exceeds three. Using that late range is substantially sharper than retaining the first pulse's range floor.

For the comparison radius $1/2000$, incoming position bound $1/40000$, speed $1/8000$ and acceleration $1/400$, the independently computed receiver-position Lipschitz coefficient is below $2.985544<3$. This uses the conservative stationary derivative coefficient $3g(1500)b_P^2$. The coefficient includes the stationary-field derivative and the implicit source-time contribution. The positive error comparison thus uses

$$
E''(t)\le3E(t)+\rho_P+g\sum_j[C_{P,j}E_2(s_j^+(t))+C_{V,j}E_2'(s_j^+(t))],
$$

where $\rho_P$ is the new complete-population acceleration residual, $E_2$ is the independently bounded incoming error profile, and $s_j^+(t)$ is a range-dependent emission-time upper bound. The source coefficients are

$$
C_P(v,A,r)=\frac{2r^{-3}}{(1-v)^2}+\frac{vr^{-3}+Ar^{-2}}{(1-v)^3},
\qquad C_V(v,r)=\frac{r^{-2}}{(1-v)^2}.
$$

The term containing $A$ accounts for source velocity sampled at differing implicit emission times. The independent `population_error.py` retains each preceding certified residual interval, applies exact positive hyperbolic series with geometric tail bounds, and uses outward arithmetic on cells of width $1/2048$. Known analytic controls precede the target. With conditional residual budgets $\rho_P\le10^{-6}$ through $89/32$ and $\rho_P\le2\times10^{-6}$ afterward it gives

| Cut | Position error | Velocity error | Acceleration error |
|---|---:|---:|---:|
| $89/32$ | $<2.633\times10^{-7}$ | $<1.066\times10^{-6}$ | $<3.464\times10^{-6}$ |
| $13/4$ | $<1.584\times10^{-6}$ | $<5.678\times10^{-6}$ | $<1.944\times10^{-5}$ |

Error bounds alone do not certify a small state: the polynomial norms plus errors must fit the comparison tube. Section 3.1 verifies that strict fit for the entire population. The two targets alone would not determine a complete-population norm.

## 3. Independent restart comparison and source envelopes

Let $c=13/4$, $H=15/4$, and let $\beta_j(s)$ bound the displacement of source $j$ at emission time $s$. A convenient validated envelope is a nondecreasing step function, formed from continuous polynomial norm bounds on source-time intervals plus the solution error. Its first and second primitives are

$$
B_{1,j}(s)=\int_{-\infty}^{s}\beta_j(u)\,du,
\qquad B_{2,j}(s)=\int_{-\infty}^{s}B_{1,j}(u)\,du.
$$

The already derived vector-source integration identity retains both endpoint terms when restarted at $c$. For anchor-distance brackets $d\le|i-j|\le\bar d$, a population radius $B$, a source radius $b_s$, and $S^+(t)=t-d+B+b_s$, $S^-=c-\bar d-B-b_s$, its displacement contribution is bounded by

$$
g\{J[B_{2,j}(S^+(H))-B_{2,j}(S^+(c))-(H-c)B_{1,j}(S^-)]
+D[B_{1,j}(S^+(H))-B_{1,j}(S^+(c))+(H-c)\beta_j(S^+(c))]\}.
$$

The corresponding velocity increment is bounded by

$$
g\{J[B_{1,j}(S^+(H))-B_{1,j}(S^-)]+D[\beta_j(S^+(H))+\beta_j(S^+(c))]\}.
$$

Here $J,D$ are the vector-row constants in the accepted preceding assessment, recomputed for the proposed receiver speed and acceleration bounds. The subtraction involving $S^-$ retains the lower emission endpoint. Each source's identity and complete history remain fixed. These bounds can be summed source by source, or by equal envelopes within distance shells when that weaker estimate suffices. Their monotone integrands let an endpoint bound control the whole restart interval.

An initial independent exact calculation found a sufficient restart under a hypothetical environmental prefix radius $1/30000$ through $89/32$, a target prefix radius $1/8000$, initial complete-population position $1/3000$ and speed $1/800$, with proof envelope $Y(c+u)=1/3000+0.03u$, receiver speed $1/16$ and acceleration $1/4$. The numerical contributor subsequently reported an environmental polynomial displacement about $0.0001125589$ on that source prefix, which already exceeds $1/30000$ before adding any error. **That sufficient restart is not discharged.** Its conditional arithmetic is retained as `restart-target.json`; the earlier insufficient trial is retained separately. Neither result establishes actual motion beyond $c$.

The two-target envelope split alone therefore does not solve the present restart. The full certificate retains the environmental time dependence. Future receiver roots at $15/4$ remain below $89/32$ for population radius $1/64$ and incoming radius $1/8000$, so the required source envelope is shorter than the complete population-state history through $13/4$. The latter initializes every receiver, while the earlier prefix supplies its future incoming rows. These are distinct obligations.

### 3.1. Independent polynomial bounds and the sixteen-bin restart

The frozen population archive has SHA-256 `c9dcef9578f2cc3a745dc9c258b20317d327e40c642b2aec1fcf48a371def8fb`. It contains 505 source histories and the separately stored right target, all through $13/4$. The independently authored `polynomial.py` constructs the six quintic Bernstein control vectors directly from exact dyadic endpoint position, velocity and acceleration; it imports neither the producer nor the residual polynomial evaluator. For example the first three controls are $y_0$, $y_0+hv_0/5$, $y_0+2hv_0/5+h^2a_0/20$, with the other three obtained at the right endpoint. Differencing gives the derivative controls. Convexity bounds the continuous vector norm by the largest control-vector norm. Every arithmetic operation and square root is enclosed outward.

Known controls first check an arbitrary exact dyadic quintic through its second derivative, a stationary vector, a $3$-$4$-$5$ norm and the error-profile ceiling lookup. The subsequent target audit authenticates the archive, checks all 248 incoming histories bit for bit, verifies that 258 added histories are zero through $73/32$, and verifies exact preservation of the entire right-target history. A failed first target attempt only exposed a dictionary-versus-list error-profile lookup and produced no acceptance receipt; the corrected lookup passed its own known case before the successful rerun.

Conditional on Section 2's residual budgets, the independent continuous bounds give full-population endpoint position below $0.000418435$ and speed below $0.000983849$. They strictly discharge $p_0=1/2000$ and $v_0=1/1000$. The same calculation encloses every source-prefix position at the sixteen cuts $n/32$, $n=74,\ldots,89$, below the following actual ceilings in units $10^{-6}$:

$$
(25,25,27,32,37,42,47,53,58,64,70,76,85,94,104,114).
$$

It also encloses the complete received-source prefix by $b_s=1/8000$, $v_s=1/2500$, $A_s=1/400$. The earlier accepted levels remain $5\times10^{-6}$ through $41/32$, $10^{-5}$ through $57/32$, and $25\times10^{-6}$ through $73/32$.

The separately authored exact-rational `profile_restart.py` inserts these step envelopes into the integrated formulas above, using $B=1/64$, $V=1/16$, $A=1/2$ and $Y(c+u)=1/2000+(29/1000)u$. Its known primitive and stationary-coefficient controls precede target arithmetic. All 202 possible generated shell positions are retained. It finds

| Restart quantity | Independent bound |
|---|---:|
| Generated displacement $G_P$ | $<0.012645595$ |
| Generated velocity $G_V$ | $<0.040688579$ |
| Old-row velocity $O_V$ | $<0.000014460$ |
| Stationary displacement | $0.001083525$ |
| Stationary velocity | $0.010474125$ |
| Positive displacement-slope margin | $>0.000527301$ |
| Positive speed margin | $>0.010322837$ |
| Acceleration bound | $<0.419783873<1/2$ |
| Endpoint displacement envelope | $0.015<1/64$ |

These independent sufficient conditions prove actual full-population continuation after Section 5.1 discharges the frozen-archive and residual premises. No polynomial representation of the entire population beyond $13/4$ is required for this restart: every newly received source time lies in the already represented prefix. The actual new environmental identities are included in the continuation even when their later paths are not stored numerically.

## 4. Target census and delayed comparison through $15/4$

The independent exact-radical `target_census.py` confirms 674 environmental first-excitation identities and two targets through $15/4$. For either target it finds exactly 85 generated source channels: multiplicities $6,12,8,6,24,24,4,1$ at squared anchor ranges $1,2,3,4,5,6,8,9$. Possible and definite inventories agree even with receiver margin $1/64$. A complete-population upper inventory need not equal this smaller target inventory.

For the complete population the same independent instrument finds 1160 old directed pulse channels, 17204 certainly admitted generated channels and 336 additional possible channels from the 56 first-class-17 sources to their six unit neighbors. The 17540-row possible inventory is complete; the endpoint admission of those 336 rows remains unresolved by the coarse geometry margin and no exact admission count is claimed. All received futures belong to 360 environmental identities plus the two targets, a total of 362 incoming histories. The 170 new environmental identities after $13/4$ first excite in squared classes 22, 24, 25 and 26. They have zero restart state and their complete equations are included in the continuation theorem.

For a target comparison radius $1/500$, source bounds $b_s,v_s,A_s$ above and the 85 rows, the independently computed receiver Lipschitz constant is below $2.478692<3$, including the stationary derivative. No original negative-time pulse remains active at a target in this interval. The source emission-time ceiling is below $89/32$. With new target residual at most $10^{-4}$, the independent `target_error.py` starts from Section 2's actual target error at $13/4$ and propagates each delayed incoming source profile. Known positive-series and exact arithmetic controls precede the target computation. Its uniform error allowances are

$$
\varepsilon_P<2.438\times10^{-5},\quad
\varepsilon_V<1.029\times10^{-4},\quad
\varepsilon_A<3.358\times10^{-4}.
$$

These also independently justify the looser subject allowances $7.4\times10^{-5}$, $3.1\times10^{-4}$ and $1.2\times10^{-3}$, with the full residual premise certified in Section 5.2. Continuous velocity signs and the endpoint amplitude comparison are separate checks, completed in Section 4.1; a proof of existence alone would not establish them.

### 4.1. Continuous sign and accumulated rise

The frozen target archive has SHA-256 `b0964b2d7a819cbe8f208eb6bd4ecee2f6a10abe09429027f60e454b6d7e9e5b`. The independent `signs.py` uses the direct Bernstein derivative controls and the subject's larger allowances $\varepsilon_P=7.4\times10^{-5}$, $\varepsilon_V=3.1\times10^{-4}$. Its exact rising-quadratic, rational-enclosure and shared-trough ratio controls passed before the target run. Conditional on the residual and existence premises, it yields

$$
\begin{aligned}
z'(t)&>0.0005698356935688\quad(13/4\le t\le15/4),\\
z(15/4)&\in[0.0015120317369886377,\ 0.0016600317369886378],\\
z'(15/4)&\in[0.004375373595767277,\ 0.004995373595767278].
\end{aligned}
$$

Let $m$ be the accepted fourth-trough height, $M$ the preceding maximum and $z$ the new endpoint height. The ratio of accumulated rise to preceding completed fall is $(z-m)/(M-m)$. Because $z>M>m$, it increases in $z$ and $m$ and decreases in $M$. The exact rational calculation therefore uses the same trough endpoint in each ratio bound, preserving that correlation. It gives

$$
2048.7749787433<\frac{z(15/4)-m}{M-m}<2810.2998886514.
$$

This compares a rise accumulated so far with the preceding completed fall. The rising excursion is not complete. Combining the new strict continuous sign with the accepted preceding intervals excludes the requested next maximum through $15/4$; it does not imply a later maximum exists or exclude one after that horizon.

## 5. Review of the frozen subjects

The new continuation derivation was read only after the independent inventory, source-time cuts, delayed errors and integrated restart arithmetic had been written. Its staged environmental residual term includes the additional $10^{-6}A_3(t-89/32)$ after the source-prefix cut. The preceding accepted proofs, numerical data and residual primitives remain untouched. The subject's more conservative sum-of-positive-kernels error construction and all 202-row target majorant give weaker allowances than the independent profile calculation; the independently smaller bounds suffice to justify those allowances.

The complete population remains inside radius $1/64$ with speed below $1/16$. Every cross range is at least $31/32$; the positive-delay root residual is strictly increasing with slope at least $15/16$. Each cross channel has one positive root and the positive self-root set is empty. The original root-tube and complement-gap inequalities therefore retain strict margins. The complete received source acceleration remains at most $3/8$, including the original pulse, even though the new receiver proof bound is $1/2$. The inherited row time-derivative bound below six depends on received acceleration, speed and range and still applies; at most 204 changed rows give jerk below 19600, inside the original class ceiling 65536. First-entry paths with tied anchor length cannot cancel the direct pulse's leading term, by the inherited onset expansion. A positive cross-delay lower bound also excludes an infinite first-entry chain in finite time.

The new parent residual subject keeps the accepted implicit-root and Taylor-jet primitive. Its new scatter procedure groups the ordinal incoming edge for each receiver. Within a group every receiver index is unique, and successive groups retain each receiver's original addition order. Low and high arrays are distinct, and every addition rounds in its appropriate outward direction. The recorded exact mixed-sign unequal-degree fixture, including an empty receiver, is the correctness reference; equality with the frozen scatter loop is only a separate consistency check. The continuous residual uses a center value and first derivative plus a whole-cell second-derivative remainder, then adds the full stationary cubic norm bound. Old supplied-pulse rows and generated future rows are both retained.

The separate numerical contributor's `exact_population_joins.py` imports neither the producer nor the residual path class. Its exact integer-dyadic Hermite matrix satisfies the endpoint interpolation identity, checked on an independent quadratic before its target run. Its frozen receipt authenticates the population archive and records 9,026,370 exact endpoint equalities and 4,508,640 adjacent-cell $C^2$ equalities across all 505 stored source paths, including the inherited guard cell. The separately stored right target is unchanged from its accepted history. This is accepted compatibility evidence, alongside the independent bitwise prefix and Bernstein checks; it is not evidence about the full-law residual by itself.

### 5.1. Accepted population residual and restart

The frozen population receipt is `.local-data/master-equation-closure/population-restart/check/population-residual.json`, SHA-256 `428a8c392c46377a34b0fb1f636509b4be433a78b9520d0cf65a690bd2a681ad`. Its full continuous residual is below $1.622542\times10^{-6}$; the stationary part is below $1.622523\times10^{-6}$. Through $89/32$, the new environmental residual is below $3.197\times10^{-8}$; afterward it remains below $2\times10^{-6}$. The inherited target residual is below $10^{-6}$ on the relevant interval. The latest enclosed source emission is below $2.250392<73/32$.

The independent `audit.py` passed exact boundary-inclusion, zero-cut-exclusion and self-exclusion controls first. Its population run authenticated the archive, matched every one of the 9692 environmental generated edges to the independently enumerated physical identity pairs, excluded duplicates, and checked all 31 residual bins for complete interval coverage and the stipulated staged budgets. The residual covers 3968 continuous cells. These observations discharge Section 2's residual and source-coverage premises. The independent polynomial bounds then close the small comparison tube, endpoint state and sixteen source-prefix hypotheses; the exact restart margins establish actual complete-population continuation through $15/4$.

This acceptance concerns all 676 affected histories at $15/4$, including the 170 environmental identities that start moving after the restart. The archive represents all 506 affected histories through $13/4$ and the received prefixes needed for the next interval; it does not claim to store all 676 future trajectories through $15/4$.

### 5.2. Accepted target residual, continuous sign and final disposition

The frozen target receipt is `.local-data/master-equation-closure/population-restart/check/target-residual.json`, SHA-256 `f0a7743fa5ea0d7bca480426a2addd10f09ffdc5620400b4828b74c32b041cb1`. Its full-law residual on $[13/4,15/4]$ is below $8.936836\times10^{-5}<10^{-4}$, with stationary contribution below $8.936833\times10^{-5}$. It covers 2048 continuous cells and has latest enclosed source emission below $2.751660<89/32$. The independent receipt audit matches all 85 selected identities to the exact target census, verifies exact retained target and all 361 numerical source prefixes, authenticates both archives and ties the target receipt to the accepted population receipt.

The final sign receipt is `.local-data/master-equation-closure/population-restart/check/signs.json`, SHA-256 `ec89471632f11d78ccf1f7865ae61ae9d5170032ec0bbcce1e4d1edb72855b96`. Its continuous vertical-velocity lower bound is above $0.0005698356935690$, and its endpoint-height enclosure is

$$
z(15/4)\in[0.0015120317369886366,\ 0.0016600317369886391].
$$

The receipt's correlated accumulated-rise ratio is $[2048.7749787433127,2810.299888651361]$. The separate Bernstein and exact-rational calculation in Section 4.1 independently supports these signs and amplitude conclusions. The new residual therefore discharges the last conditional premise of that calculation. The accepted preceding signs and this continuous positive-velocity interval exclude the next maximum through $15/4$.

**Final disposition: accepted in the unchanged fixed supplied-history problem and original comparison class.** This includes the complete affected-population census and continuation, the small state and required source-prefix bounds, full causal-root and source-history coverage, continuous full-law residuals, strict common-height increase and the stated accumulated-rise comparison. There are no remaining acceptance blockers for this finite extension. The next maximum, a completed later upward excursion, motion after $15/4$, and typical populated-universe behavior remain outside the result. The preparation assumption has not been relaxed.

Subject provenance, measured at final review: continuation `2e3f14c3e85697b4720a2d9f002af9da045f22111e668edcba759c391b89853c`; residual certificate `42701da4e0e4f919c20bbf4fc9585f014278753017b497fbff7250d185c8cc3e`; sign certificate `dd0c098a211353249c77121284cbce387e82cfdbad8a21b4848f5efa3ef3846e`. These script hashes record reviewed provenance, not a mathematical self-authentication condition.

## Independent evidence and falsifiers

Known and target census receipts reside in `.tmp/mec-008-population-restart/moore/census-{known,target}.json`. Script hashes record provenance only. Numerical archive identity, exact preserved prefixes and complete source-time coverage were checked as acceptance conditions. The shared venv used for these checks is Python 3.13.2.

The complete small state bounds, delayed residual propagation, restart comparison and target signed motion are accepted. The final independent reconciliation receipt is `.tmp/mec-008-population-restart/moore/audit-target.json`. Falsifiers include an omitted first-excitation path, an uncovered emission time, a changed inherited history, an invalid interval operation, a residual exceeding its staged budget, a failed state-comparison tube, a failed restart first-exit margin or a nonpositive continuous velocity bound. The linked subjects and named receipts give operator-checkable locations for each condition. A failed sufficient estimate is not evidence that the actual population leaves the tube or that the Master Equation fails.
