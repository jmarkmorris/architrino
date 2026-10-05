# Alternating-ring frequency, scale and rung labels

Status: frozen specialist derivation and measured arithmetic projection, prepared for separate adjudication on 2026-10-03. This account does not independently recompute any inherited balance or certify stability.

## Scenario and sources

The scenario is the unchanged emission-site Master Equation, with every positive-delay self root included and no cap, response multiplier, root exclusion or event rule. All numerical values below use $K=c_f=1$, where $K=\kappa\epsilon^2$ is the positive coupling magnitude for equal polarity magnitudes. The two-label row uses the same magnitude convention. The angular rate is $\Omega>0$; reversing circulation reverses the angular-momentum vector while preserving the displayed magnitudes.

The live [Accepted Foundation](../campaigns/planar-three-binary-work-queue.md#accepted-foundation) determines the ladder's current theorem boundary. The [ladder evidence](../evidence/2026-08-29-planar-three-binary-circular-balance-ladder.md) supplies the measured T02 through T200 values, root identities and leading radius law; the [global-tail theorem](../evidence/2026-09-02-planar-three-binary-global-tail-calculus-reduction.md) owns the infinite-cell extension; the [fold-boundary correction](../evidence/2026-09-02-bp011-fold-boundary-balance-correction.md) supplies the already-derived fractional next speed term. The older [fold precursor](../evidence/2026-09-02-bp011-higher-order-fold-precursor.md) is not the current owner of that next balance term.

The [circular registry](../configurations/circular-configuration-registry.md), [N:N evidence](../evidence/2026-08-29-planar-co-rotating-n-n-circular-balance.md), its [compact receipt](../evidence/2026-08-29-planar-co-rotating-n-n-circular-balance.receipt.v1.json), and the [24-member evidence](../evidence/2026-08-29-planar-co-rotating-12-12-alternating.md) supply the other measured inventories. The two-member baseline root law and measured first zero are owned by [Master Equation, circular self-hit](../../../../../content/markdown/aaa/dynamics/master-equation.md#super-field-speed-single-architrino-uniform-circular-self-hit). The [BP-014 boundary-layer theorem](../evidence/2026-09-02-bp014-boundary-layer-balance-theorem.md) supplies the separate growing-inventory limit. The [Master Equation proxy definition](../../../../../content/markdown/aaa/dynamics/master-equation.md#aggregate-kinetic-energy) and [causal-action statistic](../../../../../content/markdown/aaa/dynamics/causal-action-functional.md#core-functional-definitions) keep the numerical diagnostics distinct from physical energy and action.

All transformations here are either derived from these stated equations or measured arithmetic on the inherited decimal records. A recorded zero is not rerun by this instrument. Exact means the exact complete-ledger history satisfies the equation for every time; stable means nearby admissible histories remain close or return. Neither the tables nor the asymptotics supply the latter.

## Units and exact kinematic identities

Define dimensionless radius, angular frequency and period by

$$
R_* = \frac{K}{c_f^2},\qquad
T_* = \frac{K}{c_f^3},\qquad
r=\frac{R}{R_*},\qquad
w=\Omega T_*,\qquad
p=\frac{P}{T_*}.
$$

Derived, for every rigid circular history:

$$
w=\frac{\beta}{r},\qquad p=\frac{2\pi r}{\beta},\qquad
R v=\frac{K}{c_f}r\beta,\qquad v=c_f\beta.
$$

The dimensional restorations are $R=(K/c_f^2)r$, $v=c_f\beta$, $\Omega=(c_f^3/K)w$, $P=(K/c_f^3)p$ and $Rv=(K/c_f)r\beta$. Here $[K]=L^3/T^2$, so $K/c_f$ has the dimensions of angular momentum without a mass factor, $L^2/T$. For the centered six-member ring, the instantaneous sum of the six lever-arm cross velocities has magnitude $6Rv$. Calling this angular momentum per member follows the selected convention; no theorem says that the particle-only sum is conserved for a disturbed delayed history.

For a fixed dimensionless balance and fixed $c_f$, multiplying $K$ by a factor multiplies both $R$ and $P$ by that factor and divides $\Omega$ by it. This scale relation changes the coupling parameter; it does not generate a continuous radius family at fixed $K,c_f$. At fixed coupling, the tangential equation selects $\beta$ and radial compatibility then fixes $R$.

Domain and falsifier: these identities apply to the declared uniform circles and units. A failed $v=\Omega R$ identity, period convention or radial scaling in an independently evaluated circular history refutes the affected expression.

## Radius and speed as functions of allowed frequency

Set $a=3/2$ and $b=3\log2/\pi$. The inherited derived six-member radius law is

$$
r=\frac a\beta+\frac b{\beta^2}+o(\beta^{-2}).
$$

Consequently $r\beta=a+b/\beta+o(\beta^{-1})$, and

$$
w=\frac{\beta^2}{a}-\frac b{a^2}\beta+o(\beta).
$$

To invert this, put $y=\sqrt{aw}$. The last equation first implies $y/\beta\to1$, and the difference of squares gives $\beta-y=b/(2a)+o(1)$. Dividing by $w$ then yields the next radius term. Thus, derived on the allowed high rungs,

$$
\boxed{\beta=\sqrt{\frac32w}+\frac{\log2}{\pi}+o(1)},\qquad
\boxed{r=\sqrt{\frac{3}{2w}}+\frac{\log2}{\pi w}+o(w^{-1})}.
$$

In dimensional form,

$$
\boxed{v(\Omega)=\sqrt{\frac{3K\Omega}{2c_f}}+\frac{c_f\log2}{\pi}+o(c_f)},
$$

$$
\boxed{R(\Omega)=\sqrt{\frac{3K}{2c_f\Omega}}+\frac{c_f\log2}{\pi\Omega}+o(c_f/\Omega)}.
$$

The limits hold with fixed $K,c_f$ as rung number tends to infinity. These are an asymptotic envelope evaluated at $\Omega=\Omega_n$. They do not supply exact circles at other frequencies, a continuously adjustable oscillator, or a dynamical radius response to torque. No $O(\Omega^{-1/2})$ speed remainder or $O(\Omega^{-3/2})$ radius remainder is established here: those would require a stronger compatible-radius expansion than the current owner supplies. The proved fractional correction to the speed-vs-rung expansion alone cannot repair that missing radius precision.

Measured by the source-projection instrument, the leading square-root formulas evaluated at the exact recorded T02 frequency underestimate both $R$ and $v$ by $8.2672667893\%$. Adding the displayed next term overestimates both by $3.8128832094\%$. At T200 the corresponding errors are $-0.2057610469\%$ and $+0.0028537019\%$. The discussion estimate “about 4% off at T02” therefore describes the next-order approximation, not the leading square-root law. These finite errors use recorded values, not certified remainder bounds on all intervening or higher rungs.

Domain and falsifier: the derived inversion depends on the inherited $o(\beta^{-2})$ radius law. A separately verified sequence for which $\beta-\sqrt{3w/2}$ fails to tend to $\log2/\pi$, or $w[r-\sqrt{3/(2w)}]$ fails to tend to that value, refutes it. A failure in the inherited uniform radius law also invalidates this consequence.

## Discrete frequency gaps

Number the six-member balances by $n\ge1$, with rung T$_{2n}$, and put $A_n=\pi(n+1)/3$. The current inherited speed expansion is

$$
\beta_n=A_n-\frac1{2A_n}-\frac{17}{72A_n^3}
-\frac{\eta(1/2)}{27\sqrt{\pi/3}}A_n^{-9/2}+o(A_n^{-9/2}).
$$

This consumes the established fractional term; it is not rederived here. The spacing obeys the inherited $\Delta\beta_n\to\pi/3$. Substitution into the frequency law gives, derived,

$$
w_n=\frac{2\pi^2}{27}(n+1)^2-\frac{4\log2}{9}(n+1)+o(n).
$$

Taking adjacent differences of the leading square term and retaining the legitimate remainder scope gives

$$
\boxed{\frac{w_{n+1}-w_n}{n+1}\longrightarrow\frac{4\pi^2}{27}},\qquad
\boxed{\frac{w_{n+1}-w_n}{\beta_n}\longrightarrow\frac{4\pi}{9}}.
$$

The absolute angular-frequency gap tends to infinity; its relative size tends to zero, with $n\,\Delta w_n/w_n\to2$. The cyclic-frequency gap is $\Delta f=(c_f^3/K)\Delta w/(2\pi)$, and $\Delta f/(n+1)\to(c_f^3/K)2\pi/27$. The linear term in $w_n$ does not by itself establish a constant next term in $\Delta w_n$: adjacent differences of an unrestricted $o(n)$ remainder can remain unbounded. Such a constant is deliberately unclaimed.

For reference, the period law follows directly from $p=2\pi r/\beta$:

$$
p_n=\frac{27}{\pi(n+1)^2}+\frac{162\log2}{\pi^3(n+1)^3}+o(n^{-3}),
\qquad (n+1)^3(p_{n+1}-p_n)\to-\frac{54}{\pi}.
$$

Measured finite jumps are retained for all 99 adjacent pairs in the [machine-readable projection](ring-frequency-table-2026-10-03.json). The first jump T02 to T04 is $(\Delta\beta,\Delta r,\Delta w)=(1.14787621146261,-0.414244731730400,3.42350092283453)$. The last recorded jump T198 to T200 is $(1.047244830989995,-0.000143011119459117,146.639502829459)$. A disturbance reaching a neighboring reference circle would need the full corresponding radius, rate and retained-history change. These differences are necessary endpoint differences, not impulse amplitudes, transition barriers or an evolved path connecting the endpoints.

Domain and falsifier: the gap statements concern adjacent accepted regular six-member rungs at fixed coupling. A complete independent ladder with a different speed-spacing limit, or a source-bound frequency sequence violating these normalized limits, refutes them. Finite-table monotonic signs are checked with outward-rounded arithmetic on the printed input decimals, not asserted as a new exact-balance interval theorem.

## What one hertz would require

One hertz means one complete labeled revolution per physical second, $f=\Omega/(2\pi)=1\,\mathrm{s}^{-1}$. For selected rung $n$, its dimensional conversion requires

$$
\boxed{K=\frac{c_f^3w_n}{2\pi f}},\qquad
\frac{K}{c_f^3}=\frac{w_n}{2\pi f}.
$$

For one hertz the required ratio is $K/c_f^3=0.297840712919957\,\mathrm{s}$ on T02 and $1181.95508130031\,\mathrm{s}$ on T200. These are measured conversions of inherited dimensionless frequencies; no physical value of $K$ is derived. A numerical SI value of $K$ additionally needs the physical wake speed in length/time units; the normalized choice $c_f=1$ does not supply that calibration. Once physical $K$ and $c_f$ are fixed, all rung frequencies are fixed together; one cannot choose one hertz separately for every rung under the same parameters.

Domain and falsifier: ordinary cyclic frequency uses a full $2\pi$ revolution. A different declared observable cadence must state its symmetry factor. Independent dimensional calibration inconsistent with the displayed conversion refutes that calibration, not the dimensionless ladder.

## Angular momentum, root census and proxy quantities

Derived on the high six-member rungs,

$$
Rv=\frac K{c_f}\left[\frac32+\frac{3\log2}{\pi\beta}+o(\beta^{-1})\right].
$$

Measured arithmetic on all hundred recorded rungs gives a decreasing sequence from $1.78255357581579$ to $1.50619193573387$, a $15.5036933437\%$ endpoint fall. The endpoints lie respectively $18.8369050544\%$ and $0.4127957156\%$ above the limiting value $3/2$. Thus “nearly constant” is accurate for sufficiently high rungs, while exact constancy or a small change across the whole finite ladder is false. Finite monotonicity does not establish eventual monotonicity from the displayed little-o law alone.

The root census distinguishes the reference histories discretely even when their $Rv$ values are close. The inherited total is $24(n+1)$ directed roots. The self-channel exceptional root at $\beta=1$ contributes one per member; an ordinary fold belongs to the self channel precisely when its integer level is a multiple of six. Therefore, derived on T$_{2n}$,

$$
N_{\mathrm{self}}=6\left[1+2\left\lfloor\frac{2n-1}{6}\right\rfloor\right],\qquad
N_{\mathrm{cross}}=24(n+1)-N_{\mathrm{self}}.
$$

T02 has 48 total hits, 6 self hits and 42 cross hits. T200 has 2424 total hits, 402 self hits and 2022 cross hits. Each adjacent accepted rung adds 24 total hits. Self hits stay unchanged for two steps and then increase by 12; the cross count supplies the rest. These identities refer to ordered receiver-transmitter receptions, not a count of material quanta or a physical action increment.

For the expressly declared unit quadratic bookkeeping proxy $Q_i=\|\mathbf V_i\|^2/2$, derived circular identities are

$$
Q_i=\frac{c_f^2\beta_n^2}{2},\qquad
\frac{dQ_i}{dT}=\mathbf V_i\cdot\mathbf A_i=0,\qquad
\int_0^{P_n}Q_i\,dT=\pi R_nv_n.
$$

The zero gain holds at every instant of an exact circle because its acceleration is radial and its velocity tangential. It does not show zero total delayed interaction energy, zero externally radiated energy or a conserved general action. Measured proxy values per member are $1.66792503432471$ on T02 and $5592.82412870548$ on T200. The proxy cycle integrals are $5.60005721841311$ and $4.73184152019771$ in the selected $K/c_f$ unit. Their limit is $3\pi K/(2c_f)$ per member. The six-member total has six times these values.

The unit $K/c_f$ is exactly the same parameter combination on every rung; numerically it is one in this report. Multiplying root count by that unit does not derive an action. The sign-blind receiver-average statistic in the causal-action owner has inverse-area units and requires actual root distances and weights, which this arithmetic projection does not tabulate; a root count alone cannot supply it. No identification with $\hbar$ is made. A physical conserved charge would require the delayed-action and wake-boundary account that remains open in the owning program.

Domain and falsifier: a source ledger with different self-channel ownership refutes the census; a nonzero $\mathbf V\cdot\mathbf A$ on the exact circle refutes the proxy-gain identity. An independent action derivation assigning a different charge does not refute these kinematic proxies; it would replace their tentative physical interpretation, which is unclaimed here.

## Other recorded inventories and the growing-inventory limit

The following table projects the recorded representative for each member count; the six-member N:N source row is T04 rather than its first rung T02. These are selected measured balances, not all rungs for all inventories. In particular, the recorded two-member first row and the single 24-member row do not establish their whole frequency ladders. More decimal places in arithmetic do not improve their inherited binary64 balance precision.

| Members | Recorded beta | R | Omega | Period | R v per member | Directed hits | Self hits |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 2 | 3.0703566254 | 0.086941673474 | 35.315131429 | 0.17791765322 | 0.26694194317 | 8 | 2 |
| 4 | 2.1472456589 | 0.41618280831 | 5.1593809644 | 1.2178176705 | 0.89364672845 | 24 | 4 |
| 6, T04 | 2.9743071761 | 0.56173170007 | 5.2948893141 | 1.1866509259 | 1.6707626266 | 72 | 6 |
| 8 | 1.6595117715 | 1.7441728749 | 0.95146060079 | 6.6037262099 | 2.8944754174 | 80 | 8 |
| 10 | 1.5556550244 | 2.7040642783 | 0.57530253143 | 10.921532522 | 4.2065911809 | 120 | 10 |
| 12 | 1.4840959616 | 3.8429710355 | 0.38618452958 | 16.269904219 | 5.7033377942 | 168 | 12 |
| 24 | 1.2908408414 | 13.982496760 | 0.092318336524 | 68.059992670 | 18.049177883 | 624 | 24 |

Each listed speed lies between one and $\pi$. The self equation $\xi=\beta|\sin\xi|$, $0<\xi\le\beta$, therefore lies wholly in the first sine half-wave and has exactly one positive self root per member, by the strict decrease of $\sin\xi/\xi$ on $(0,\pi)$. The binary additionally has three partner roots per member at its recorded all-root point, giving eight ordered hits. The other total counts are inherited from their frozen evidence. The six-member T04 representative has 72 hits; its first T02 balance would have 48. Consequently this table's change with inventory must not be read as a same-rung comparison across every row.

There is nevertheless an already-derived asymptotic member-count law for first-birth balances. With $2N$ members, write $a_{\mathrm{inv}}=(3\pi/2)^{1/3}$ to distinguish this constant from the earlier $a=3/2$. The first fold and the selected first-birth zero obey the inherited limits

$$
\beta_{1,N}^{\mathrm{fold}}=1+\frac{a_{\mathrm{inv}}^2}{2}N^{-2/3}+o(N^{-2/3}),\qquad
N^2(\beta_N-\beta_{1,N}^{\mathrm{fold}})\to\frac2{\pi^2},
$$

$$
\frac{R_N}{R_*}\sim\frac{a_{\mathrm{inv}}}{6}N^{5/3}.
$$

By exact kinematics, derived consequences are

$$
v_N\to c_f,\qquad
\Omega_N\sim\frac{6c_f^3}{a_{\mathrm{inv}}K}N^{-5/3},\qquad
P_N\sim\frac{\pi a_{\mathrm{inv}}K}{3c_f^3}N^{5/3},\qquad
R_Nv_N\sim\frac{a_{\mathrm{inv}}K}{6c_f}N^{5/3}.
$$

Thus increasing the rung at fixed six-member inventory shrinks the radius, drives the frequency upward and leaves $Rv$ approaching a constant. Increasing inventory on the first-birth branch grows the radius and $Rv$, drives frequency downward and brings speed toward wake speed from above. These are different limits, with different fixed quantities. The source theorem proves existence of at least one selected boundary-layer zero for sufficiently large $N$ and its leading radius coefficient; it does not prove uniqueness throughout every finite-$N$ first-birth cell, a sharp finite threshold, or stability. The complete first-birth count is $2N(2N+2)$ ordered hits with $2N$ self hits; the table's first-birth rows, except the six-member T04 row, match that census.

Domain and falsifier: the member-count laws inherit the first-fold decomposition and uniform background theorem. A missing root family, an order-$N^2$ term outside the newborn/background cancellation, or a separately enclosed first-birth sequence violating the source limits refutes them. Stability and inter-inventory formation are not inferred.

## Reproduction, independence and remaining scope

The instrument [ring_frequency_account_20261003.py](../../../../../scripts/braid-program/ring_frequency_account_20261003.py) is an arithmetic projector, not a root solver. The frozen local input is `.local-data/braid-analysis/b13-velocity-search/2026-08-29-b13-equal-radius-100-point-arbitrary-precision.v1.json`, with expected SHA-256 `cd2745bffbe792e7d8030d6382ee7f6b76d3f7670d3292559567c46217c70c6b`. It reads the 120-decimal run in each record, checks its index and root counts, and writes the [machine-readable table](ring-frequency-table-2026-10-03.json). The source contains printed high-precision decimal values, not exact-zero interval enclosures. The output's outward bounds include one last printed input unit and arithmetic rounding; they do not claim to bound the unknown inherited difference between each approximate source root and the mathematical exact balance.

The required known control ran before the first target and before every target after a script change. The exact control $\beta=2,R=1/2$ gave $\Omega=4$, $P=\pi/2$, $Rv=1$, $Q=2$ and cycle proxy $\pi$. Controls also checked an outward interval around the printed value $0.500$, directed-rounding decimal serialization, synthetic precision-run selection, a known Markdown row, and a separately symbolic series inversion of $a/\beta+b/\beta^2$. The shared venv returned PASS for `--control`, then PASS for `--target` on all 100 inherited records. The receipts live at `.local-data/ring-exploration/frequency/control.json` and `summary.json`; scratch presentation is under `.tmp/ring-frequency/`. No existing balance instrument or oracle was changed. Control agreement verifies these transformations and their implementation; it is not an independent recalculation of the source's balances.

Reproduce in that order with the shared venv:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_frequency_account_20261003.py --control
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_frequency_account_20261003.py --target
```

Derived here: dimensional restoration, next-order frequency inversion with honest little-o errors, gap limits, period law, self-channel census, circular proxy identities and kinematic consequences of the inherited growing-inventory theorem. Measured here: projection values, finite-table signs inside outward arithmetic boxes for the printed source inputs, approximation errors and necessary adjacent endpoint differences. Inferred: sufficiently high rungs are poorly separated by particle-only angular momentum compared with their root counts and frequencies. Unresolved: conservation of a complete history-aware angular momentum or action charge; full ladders for the other inventories; any actual impulse, torque or rung-transition trajectory; all stability questions; and tighter radius remainders.

The new derivation is frozen for separately constructed adjudication before any “independently checked” theorem label is attached. The coordinator owns shared queue, manuscript, work-log and cross-geometry index integration. No rank, score, qualification rule, equation selection, deferred task or Git publication is changed by these files.

## All hundred recorded six-member rungs

Measured by the declared arithmetic projector with $K=c_f=1$. Display rounding is for reading; the linked machine table retains 35-digit arithmetic values, all adjacent jumps and outward decimal bounds. The inherited source grade remains measured balance evidence. Directed hits include every positive-delay self hit and exclude only zero-delay self coincidence.

| Rung | beta | R | Omega | Period | R v | Directed hits | Self hits |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| T02 | 1.826430965 | 0.9759764318 | 1.871388391 | 3.35749935 | 1.782553576 | 48 | 6 |
| T04 | 2.974307176 | 0.5617317001 | 5.294889314 | 1.186650926 | 1.670762627 | 72 | 6 |
| T06 | 4.066086233 | 0.4011517526 | 10.13603009 | 0.6198862133 | 1.631117619 | 96 | 6 |
| T08 | 5.138808174 | 0.3128385708 | 16.42638937 | 0.3825055626 | 1.607617405 | 120 | 18 |
| T10 | 6.202638876 | 0.2565924382 | 24.1731164 | 0.2599245046 | 1.591550232 | 144 | 18 |
| T12 | 7.261566125 | 0.2175504398 | 33.37877015 | 0.1882389698 | 1.579756904 | 168 | 18 |
| T14 | 8.317491541 | 0.1888427476 | 44.04453783 | 0.1426552671 | 1.570697956 | 192 | 30 |
| T16 | 9.371441912 | 0.1668375361 | 56.17106397 | 0.1118580433 | 1.563508278 | 216 | 30 |
| T18 | 10.42402201 | 0.1494296274 | 69.75873651 | 0.09007022807 | 1.557657725 | 240 | 30 |
| T20 | 11.4756118 | 0.1353131544 | 84.8078064 | 0.07408734613 | 1.552801232 | 264 | 42 |
| T22 | 12.52646231 | 0.1236345694 | 101.3184449 | 0.06201422963 | 1.548703774 | 288 | 42 |
| T24 | 13.57674612 | 0.1138122061 | 119.2907736 | 0.05267117578 | 1.545199428 | 312 | 42 |
| T26 | 14.62658588 | 0.1054359223 | 138.724882 | 0.04529241773 | 1.542167572 | 336 | 54 |
| T28 | 15.67607116 | 0.09820817517 | 159.6208374 | 0.03936318973 | 1.539518342 | 360 | 54 |
| T30 | 16.72526892 | 0.09190784249 | 181.9786916 | 0.03452703859 | 1.537183382 | 384 | 54 |
| T32 | 17.77423025 | 0.08636715771 | 205.7984854 | 0.03053076554 | 1.535109747 | 408 | 66 |
| T34 | 18.82299476 | 0.08145652713 | 231.0802513 | 0.02719049019 | 1.533255783 | 432 | 66 |
| T36 | 19.8715937 | 0.07707425416 | 257.8240156 | 0.02437005449 | 1.531588264 | 456 | 66 |
| T38 | 20.92005203 | 0.07313941432 | 286.0297997 | 0.02196689056 | 1.530080353 | 480 | 78 |
| T40 | 21.96838991 | 0.06958680843 | 315.6976216 | 0.01990254243 | 1.52871014 | 504 | 78 |
| T42 | 23.01662384 | 0.06636331924 | 346.827496 | 0.01811616835 | 1.527459556 | 528 | 78 |
| T44 | 24.06476741 | 0.06342523645 | 379.4194356 | 0.01655999856 | 1.526313563 | 552 | 90 |
| T46 | 25.11283197 | 0.0607362623 | 413.4734509 | 0.01519610339 | 1.525259549 | 576 | 90 |
| T48 | 26.16082701 | 0.05826600406 | 448.9895512 | 0.01399405686 | 1.524286853 | 600 | 90 |
| T50 | 27.20876059 | 0.05598882006 | 485.9677442 | 0.01292922294 | 1.523386401 | 624 | 102 |
| T52 | 28.25663954 | 0.05388292619 | 524.4080368 | 0.01198148172 | 1.522550423 | 648 | 102 |
| T54 | 29.30446974 | 0.05192969671 | 564.310435 | 0.01113427099 | 1.521772226 | 672 | 102 |
| T56 | 30.35225624 | 0.05011311191 | 605.6749439 | 0.01037385708 | 1.521046014 | 696 | 114 |
| T58 | 31.40000342 | 0.04841931765 | 648.5015681 | 0.009688774271 | 1.52036674 | 720 | 114 |
| T60 | 32.44771509 | 0.04683627145 | 692.7903116 | 0.009069389687 | 1.519729992 | 744 | 114 |
| T62 | 33.49539458 | 0.04535345567 | 738.541178 | 0.008507562603 | 1.519131893 | 768 | 126 |
| T64 | 34.54304483 | 0.04396164363 | 785.7541706 | 0.007996375383 | 1.518569027 | 792 | 126 |
| T66 | 35.59066842 | 0.04265270737 | 834.4292922 | 0.00752991939 | 1.518038365 | 816 | 126 |
| T68 | 36.63826764 | 0.04141945887 | 884.5665454 | 0.007103123377 | 1.517537219 | 840 | 138 |
| T70 | 37.68584452 | 0.04025551798 | 936.1659324 | 0.006711614992 | 1.517063192 | 864 | 138 |
| T72 | 38.73340088 | 0.03915520204 | 989.2274554 | 0.006351608291 | 1.516614137 | 888 | 138 |
| T74 | 39.78093833 | 0.03811343309 | 1043.751116 | 0.00601981182 | 1.516188131 | 912 | 150 |
| T76 | 40.82845834 | 0.03712565953 | 1099.736917 | 0.005713353087 | 1.515783444 | 936 | 150 |
| T78 | 41.87596221 | 0.03618778963 | 1157.184858 | 0.005429716145 | 1.515398511 | 960 | 150 |
| T80 | 42.92345113 | 0.0352961349 | 1216.094942 | 0.005166689778 | 1.515031921 | 984 | 162 |
| T82 | 43.97092616 | 0.03444736159 | 1276.46717 | 0.004922324251 | 1.514682393 | 1008 | 162 |
| T84 | 45.01838828 | 0.03363844906 | 1338.301543 | 0.004694895063 | 1.514348761 | 1032 | 162 |
| T86 | 46.06583836 | 0.03286665386 | 1401.598062 | 0.004482872427 | 1.514029964 | 1056 | 174 |
| T88 | 47.11327722 | 0.03212947866 | 1466.356728 | 0.004284895473 | 1.513725035 | 1080 | 174 |
| T90 | 48.16070557 | 0.03142464523 | 1532.577543 | 0.004099750344 | 1.513433087 | 1104 | 174 |
| T92 | 49.2081241 | 0.03075007095 | 1600.260506 | 0.003926351543 | 1.513153307 | 1128 | 186 |
| T94 | 50.25553341 | 0.03010384825 | 1669.405619 | 0.003763725985 | 1.512884951 | 1152 | 186 |
| T96 | 51.30293408 | 0.02948422658 | 1740.012882 | 0.003610999304 | 1.512627333 | 1176 | 186 |
| T98 | 52.35032662 | 0.02888959663 | 1812.082297 | 0.00346738408 | 1.51237982 | 1200 | 198 |
| T100 | 53.3977115 | 0.02831847631 | 1885.613863 | 0.003332169661 | 1.512141828 | 1224 | 198 |
| T102 | 54.44508918 | 0.02776949844 | 1960.607582 | 0.003204713358 | 1.511912819 | 1248 | 198 |
| T104 | 55.49246006 | 0.02724139985 | 2037.063453 | 0.003084432788 | 1.511692293 | 1272 | 210 |
| T106 | 56.53982452 | 0.02673301166 | 2114.981478 | 0.002970799211 | 1.511479788 | 1296 | 210 |
| T108 | 57.5871829 | 0.02624325061 | 2194.361657 | 0.002863331706 | 1.511274873 | 1320 | 210 |
| T110 | 58.63453554 | 0.02577111142 | 2275.203991 | 0.002761592074 | 1.511077148 | 1344 | 222 |
| T112 | 59.68188273 | 0.02531565985 | 2357.508479 | 0.002665180365 | 1.510886242 | 1368 | 222 |
| T114 | 60.72922476 | 0.02487602655 | 2441.275122 | 0.002573730937 | 1.510701808 | 1392 | 222 |
| T116 | 61.77656189 | 0.02445140155 | 2526.503921 | 0.002486908987 | 1.510523522 | 1416 | 234 |
| T118 | 62.82389437 | 0.02404102922 | 2613.194876 | 0.002404407481 | 1.510351081 | 1440 | 234 |
| T120 | 63.87122242 | 0.02364420384 | 2701.347986 | 0.002325944432 | 1.510184202 | 1464 | 234 |
| T122 | 64.91854627 | 0.02326026549 | 2790.963254 | 0.002251260492 | 1.510022622 | 1488 | 246 |
| T124 | 65.9658661 | 0.02288859647 | 2882.040678 | 0.002180116802 | 1.50986609 | 1512 | 246 |
| T126 | 67.0131821 | 0.02252861791 | 2974.58026 | 0.002112293083 | 1.509714374 | 1536 | 246 |
| T128 | 68.06049447 | 0.02217978679 | 3068.581998 | 0.002047585924 | 1.509567256 | 1560 | 258 |
| T130 | 69.10780335 | 0.02184159322 | 3164.045895 | 0.00198580726 | 1.509424529 | 1584 | 258 |
| T132 | 70.15510891 | 0.02151355792 | 3260.971949 | 0.001926782998 | 1.509285999 | 1608 | 258 |
| T134 | 71.20241129 | 0.02119523001 | 3359.360161 | 0.001870351795 | 1.509151484 | 1632 | 270 |
| T136 | 72.24971063 | 0.02088618486 | 3459.210531 | 0.001816363951 | 1.509020812 | 1656 | 270 |
| T138 | 73.29700706 | 0.02058602228 | 3560.52306 | 0.001764680414 | 1.508893821 | 1680 | 270 |
| T140 | 74.3443007 | 0.02029436475 | 3663.297748 | 0.001715171886 | 1.508770356 | 1704 | 282 |
| T142 | 75.39159168 | 0.02001085585 | 3767.534594 | 0.001667718013 | 1.508650273 | 1728 | 282 |
| T144 | 76.43888009 | 0.01973515878 | 3873.2336 | 0.001622206651 | 1.508533436 | 1752 | 282 |
| T146 | 77.48616605 | 0.01946695507 | 3980.394764 | 0.001578533206 | 1.508419713 | 1776 | 294 |
| T148 | 78.53344965 | 0.01920594332 | 4089.018088 | 0.001536600028 | 1.508308983 | 1800 | 294 |
| T150 | 79.58073099 | 0.01895183808 | 4199.103572 | 0.001496315868 | 1.508201128 | 1824 | 294 |
| T152 | 80.62801015 | 0.01870436881 | 4310.651215 | 0.001457595383 | 1.508096039 | 1848 | 306 |
| T154 | 81.67528722 | 0.01846327892 | 4423.661017 | 0.001420358676 | 1.507993609 | 1872 | 306 |
| T156 | 82.72256227 | 0.01822832487 | 4538.13298 | 0.001384530893 | 1.507893739 | 1896 | 306 |
| T158 | 83.76983538 | 0.01799927537 | 4654.067103 | 0.001350041838 | 1.507796335 | 1920 | 318 |
| T160 | 84.81710663 | 0.01777591061 | 4771.463385 | 0.001316825636 | 1.507701306 | 1944 | 318 |
| T162 | 85.86437608 | 0.01755802156 | 4890.321828 | 0.001284820412 | 1.507608566 | 1968 | 318 |
| T164 | 86.9116438 | 0.0173454093 | 5010.642431 | 0.001253968008 | 1.507518034 | 1992 | 330 |
| T166 | 87.95890985 | 0.01713788443 | 5132.425195 | 0.001224213714 | 1.507429632 | 2016 | 330 |
| T168 | 89.00617428 | 0.01693526653 | 5255.670119 | 0.001195506028 | 1.507343285 | 2040 | 330 |
| T170 | 90.05343716 | 0.0167373836 | 5380.377204 | 0.001167796433 | 1.507258922 | 2064 | 342 |
| T172 | 91.10069854 | 0.01654407157 | 5506.546449 | 0.001141039191 | 1.507176476 | 2088 | 342 |
| T174 | 92.14795847 | 0.01635517388 | 5634.177855 | 0.001115191155 | 1.507095883 | 2112 | 342 |
| T176 | 93.19521699 | 0.01617054103 | 5763.271422 | 0.001090211591 | 1.50701708 | 2136 | 354 |
| T178 | 94.24247416 | 0.01599003021 | 5893.82715 | 0.001066062025 | 1.506940008 | 2160 | 354 |
| T180 | 95.28973002 | 0.01581350489 | 6025.845039 | 0.001042706088 | 1.506864612 | 2184 | 354 |
| T182 | 96.33698461 | 0.01564083454 | 6159.325089 | 0.001020109381 | 1.506790837 | 2208 | 366 |
| T184 | 97.38423798 | 0.01547189424 | 6294.267301 | 0.0009982393513 | 1.50671863 | 2232 | 366 |
| T186 | 98.43149015 | 0.01530656441 | 6430.671673 | 0.0009770651693 | 1.506647944 | 2256 | 366 |
| T188 | 99.47874118 | 0.01514473054 | 6568.538207 | 0.000956557625 | 1.506578729 | 2280 | 378 |
| T190 | 100.5259911 | 0.01498628291 | 6707.866902 | 0.0009366890248 | 1.506510942 | 2304 | 378 |
| T192 | 101.5732399 | 0.01483111633 | 6848.657759 | 0.0009174330983 | 1.506444537 | 2328 | 378 |
| T194 | 102.6204877 | 0.01467912994 | 6990.910777 | 0.0008987649117 | 1.506379474 | 2352 | 390 |
| T196 | 103.6677345 | 0.01453022697 | 7134.625957 | 0.0008806607866 | 1.506315711 | 2376 | 390 |
| T198 | 104.7149803 | 0.01438431452 | 7279.803298 | 0.0008630982254 | 1.506253211 | 2400 | 390 |
| T200 | 105.7622251 | 0.0142413034 | 7426.442801 | 0.0008460558407 | 1.506191936 | 2424 | 402 |
