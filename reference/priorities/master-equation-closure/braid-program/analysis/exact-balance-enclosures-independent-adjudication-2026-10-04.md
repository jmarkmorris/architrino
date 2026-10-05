# Independent adjudication of two exact-balance enclosures: the six-member balance below wake speed and the charged trimer above it

Date: 2026-10-04. Adjudicator: a separate session that built its own certificate from a written statement of the two claims. Scenario: unchanged Master Equation, every positive-delay causal root included (own-path roots among them), no speed cap, no event rule, wake speed $c_f=1$ and coupling $K=1$. Subjects: the interval-enclosure sections of [the six-member balance](six-member-balance-below-wake-speed.md#interval-enclosure) and of [the charged trimer](charged-trimer-above-wake-speed.md#interval-enclosure-of-the-trimer).

## Verdict and scope

**Claim A, the six-member balance with every member below wake speed: accept, with corrections that do not touch the result.** In the box of half-width $2.1\times10^{-6}$ in each of the six unknowns about the printed values, which contains the claimed box of half-width $2\times10^{-6}$, the six balance conditions have exactly one solution (computer-assisted derived). All six unknowns are enclosed with radius below $4\times10^{-76}$, and every printed digit of the claim is correct. The three speeds are enclosed near $0.5271$, $0.9713$ and $0.5609$ and are certified below $1$ at the solution and at every point of the box. Each receiver has exactly one causal root from each of the five other members and none from its own path (derived, with the speed bound as its only numerical side condition). The corrections are one of wording, about how close the printed values are to the solution, and four last-digit entries in the supporting row table; they are listed under [Discrepancies and corrections](#discrepancies-and-corrections).

**Claim B, the charged trimer above wake speed: accept.** For speeds within $1.1\times10^{-6}$ of the printed value, an interval that contains the claimed one, the tangential balance of a circling member has exactly one zero, at $\beta=1.2757465737106885974517971\ldots$, and the radial balance then gives the single radius $R=0.1719910075160478920991440\ldots$ (computer-assisted derived). Both are enclosed with radius below $10^{-76}$, and every printed digit of the claim is correct. A circling member receives exactly one causal root from its partner, exactly one from its own past path and the static row from the centre; this census is derived for every speed in $1<\beta<\beta_p$ with $\beta_p=2.97169387\ldots$, a wider range than the claim states. The centre is at rest (derived).

**What "accept" covers.** It covers existence of each balance, its uniqueness inside the stated box, the enclosures of the unknowns, the speed bounds and the root census. It covers nothing about stability, about balances outside the boxes, or about how such a state could arise. The grades used below are: derived (a written proof), computer-assisted derived (a hypothesis of a theorem checked in outward-rounded interval arithmetic), and measured (floating-point evaluation, named with its instrument).

**Independence.** The row components, the root conditions, the census proofs, the formulation, the test and all code were made from the written statement of the claims before either claim document was read. The claimant's enclosure code `enclose.py` and its outputs were never read. The formulation differs from the claimant's in each main choice: the claimant reduced the rows to radial and tangential parts, eliminated each delay implicitly and tested six unknowns (claim A) or one unknown (claim B); this record keeps every delay as an unknown, works in Cartesian components in the inertial frame, and tests 21 unknowns (claim A) or 3 and 4 unknowns (claim B). After the certificates had passed, the two claim documents were read to compare digits and tables. Three additions were made at that point and none changes a certificate: the certified boxes were widened slightly so that they contain the claimed box whatever digits its centre has beyond the printed ones, larger boxes were tried, and per-row components were printed for comparison.

## Row components and root census

### The row and its root condition

An architrino $i$ of polarity $s_i=\pm1$ sits at position $x$ at reception time $T$. Another architrino $j$, or $i$ itself, follows the path $X_j$. A causal root is a delay $\tau>0$ with $\tau=\lvert x-X_j(T-\tau)\rvert$: the wake emitted at time $T-\tau$ from $X_j(T-\tau)$ has expanded at wake speed $1$ to radius $\tau$ and is passing through $x$. Write $d=x-X_j(T-\tau)$ for the separation from the emission point to the receiver, $n=d/\tau$ for its unit vector, $V=\dot X_j(T-\tau)$ for the source velocity at emission, $\sigma=s_is_j$ for the polarity product, and $D=1-n\cdot V$. The claim documents call $D$ the transmitter factor. The acceleration row of that root is

$$
a=\frac{\sigma\,d}{\tau^{3}\,\lvert D\rvert},
$$

so like polarity ($\sigma=+1$) pushes the receiver away from the emission point. The total acceleration of $i$ is the sum of the rows over every source and every root. This is the path-history sum of the [Master Equation chapter](../../../../../content/markdown/aaa/dynamics/master-equation.md) with $c_f=1$, where the inverse-square direction factor is $n/\tau^2$ and the transmitter-side weight is $1/\lvert D\rvert$; that match was checked by reading the chapter's path-history section and is not otherwise audited here.

Define the root function $g(\tau)=\tau-\lvert x-X_j(T-\tau)\rvert$. Its positive zeros are the causal roots. Differentiating the distance along the path gives $\frac{d}{d\tau}\lvert x-X_j(T-\tau)\rvert=n\cdot V$, so

$$
g'(\tau)=1-n\cdot V=D .
$$

The same roots are the positive zeros of the smooth function $G(\tau)=\tau^{2}-\lvert x-X_j(T-\tau)\rvert^{2}$, which is the form the certificate uses because it has no square root.

### Census below wake speed (Lemma 1, derived)

**Statement.** If the source speed satisfies $\lvert V\rvert\le v<1$ on its whole past path, then a receiver at a different position from the source at time $T$ has exactly one causal root from that source, a receiver has no causal root from its own path, and $D\ge1-v>0$ on every row.

**Proof.** Since $\lvert n\cdot V\rvert\le v$, $g'(\tau)\ge1-v>0$, so $g$ is strictly increasing and $D\ge1-v$. For a different source $g(0)=-\lvert x-X_j(T)\rvert<0$ and $g(\tau)\ge g(0)+(1-v)\tau$ grows without bound, so $g$ has exactly one positive zero. For the receiver's own path $g(0)=0$, and a strictly increasing function that vanishes at $0$ has no positive zero. $\blacksquare$

### Uniform rotation

In claim A three pairs turn rigidly at angular rate $w$ about the origin. Pair $k$ has polarity $s_k$ with $(s_1,s_2,s_3)=(+1,+1,-1)$, radius $R_k$, and members at angles $\phi_k$ and $\phi_k+\pi$ at time $0$, with $\phi_1=0$. Take reception time $T=0$. The representative receiver of pair $k$ is at $x_k=R_k(\cos\phi_k,\sin\phi_k)$. A source member of pair $j$, with $\epsilon=+1$ for the member at $\phi_j$ and $\epsilon=-1$ for the antipodal one, was at emission at

$$
X=\epsilon R_j\bigl(\cos(\phi_j-w\tau),\ \sin(\phi_j-w\tau)\bigr),\qquad V=\epsilon wR_j\bigl(-\sin(\phi_j-w\tau),\ \cos(\phi_j-w\tau)\bigr).
$$

Uniform circular motion of the receiver has acceleration $-w^2x_k$, so the balance condition for pair $k$ is the vector equation

$$
\sum_{\text{rows}}a+w^{2}x_k=0 ,
$$

whose radial and tangential parts are the two conditions of the claim: radial acceleration equal to $-w^2R_k$, tangential acceleration zero. Three receivers give six scalar conditions on the six unknowns $p=(R_1,R_2,R_3,w,\phi_2,\phi_3)$.

**Why six conditions at one instant suffice (derived).** The configuration at time $T$ is the configuration at time $0$ turned by the angle $wT$, and the row rule is unchanged by a rotation of the plane and by a shift of time. The total acceleration of each member therefore turns with the configuration, and a balance at $T=0$ is a balance at every time. A half turn maps the configuration to itself and exchanges the two members of each pair, so the second member of each pair balances when the first does. The statement assumes the rigid rotation has lasted for the whole past; at the solution the longest delay is $6.745$, so only that much history is actually used.

**Reduced form, used here only for a floating-point cross-check (derived).** In the receiver's frame, with $r$ the receiver radius, $\rho$ the source radius, $\alpha$ the receiver's angle minus the source's angle at reception time and $\psi=\alpha+w\tau$, the root condition is $\tau^2=r^2+\rho^2-2r\rho\cos\psi$, the factor is $D=1-wr\rho\sin\psi/\tau$, and the row has radial part $\sigma(r-\rho\cos\psi)/(\tau^3D)$, positive outward, and tangential part $\sigma\rho\sin\psi/(\tau^3D)$, positive forward. This agrees with the formula printed in the claim document.

**Census for claim A.** By Lemma 1, wherever all three speeds $R_kw$ are below $1$ each receiver has exactly one causal root from each of the five other members and none from its own path: fifteen rows for the three representative receivers, thirty over all six members. The side condition is certified in interval arithmetic on the whole box of half-width $2.1\times10^{-6}$: the speeds lie in $[0.527082,0.527095]$, $[0.971327,0.971348]$ and $[0.560854,0.560866]$ (computer-assisted derived). A float64 grid scan of $g$ with four million points per receiver-source pair also counts one root from every other member and none from the own path (measured; the scan can miss a pair of roots closer together than its step and adds nothing to the proof).

### The trimer

In claim B a member of polarity $-1$ is at rest at the origin and two members of polarity $+1$ circle at radius $R$ and angular rate $w$, at angles $0$ and $\pi$ at time $0$, with speed $\beta=wR$. The receiver is the member at $(R,0)$. Components are written as (radial outward, tangential forward). For a delay $\tau$ put $u=w\tau/2$, half the angle a circling member turns through during the delay.

**Centre row.** The centre is at rest at distance $R$, so its only root is $\tau=R$ with $D=1$, and its row is the inverse-square row $(-1/R^2,\ 0)$.

**Partner row.** The partner's emission point is at distance $2R\lvert\cos u\rvert$, so the root condition is $u=\beta\lvert\cos u\rvert$. At a root with $0<u<\pi/2$ the unit vector is $n=(\cos u,-\sin u)$, the delay is $\tau=2R\cos u$ and $D=1+\beta\sin u$, which is positive. The row is

$$
\frac{(\cos u_p,\ -\sin u_p)}{4R^{2}\cos^{2}u_p\,(1+\beta\sin u_p)} ,
$$

outward and backward: the partner brakes.

**Own-path row.** The receiver's own emission point is at distance $2R\lvert\sin u\rvert$, so the root condition is $u=\beta\lvert\sin u\rvert$. At a root with $0<u<\pi$ the unit vector is $n=(\sin u,\cos u)$, the delay is $\tau=2R\sin u$ and $D=1-\beta\cos u=1-u\cot u$, which is positive on $(0,\pi)$. The row is

$$
\frac{(\sin u_s,\ \cos u_s)}{4R^{2}\sin^{2}u_s\,(1-\beta\cos u_s)} ,
$$

outward, and forward when $\cos u_s>0$, which holds at the solution ($u_s=1.179<\pi/2$): the member's own wake pushes it forward.

**Scaling (derived).** At fixed $\beta$ the positions and delays are proportional to $R$, the velocities and the factors $D$ do not depend on $R$, and every row is proportional to $R^{-2}$. The tangential balance is therefore a condition on $\beta$ alone. If $S_r(\beta)$ denotes the radial sum at $R=1$, the radial balance $S_r/R^2=-\beta^2/R$ gives the single radius $R=-S_r(\beta)/\beta^2$, which must be positive.

**Census for claim B (Theorem 2, derived, with two thresholds enclosed in interval arithmetic).** Every root satisfies $u\le\beta$, because $\lvert\cos u\rvert\le1$ and $\lvert\sin u\rvert\le1$.

- *Partner, first branch.* On $(0,\pi/2]$ the function $u-\beta\cos u$ increases strictly from $-\beta$ to $\pi/2$, so there is exactly one root there for every $\beta>0$.
- *Partner, later branches.* On $(\pi/2,3\pi/2)$ the root condition is $h(u)=-\beta\cos u-u=0$. The function $h$ is strictly concave there and negative at both ends. For $\beta\le1$ it is decreasing and has no zero. For $\beta>1$ its maximum is at $u_m=\pi-\arcsin(1/\beta)$, where $h(u_m)=-\cot u_m-u_m$. As $\beta$ rises from $1$, $u_m$ rises from $\pi/2$ toward $\pi$, and $-\cot u-u$ increases on $(\pi/2,\pi)$ from $-\pi/2$ without bound. So there is one value $u_p^{*}$, the zero of $u\sin u+\cos u$ in $(\pi/2,\pi)$, at which the maximum reaches zero, and $h<0$ on the whole interval exactly when $\beta<\beta_p=\sqrt{1+u_p^{*2}}$. A root with $u\ge3\pi/2$ needs $\beta\ge3\pi/2>\beta_p$.
- *Own path, first branch.* On $(0,\pi)$ the ratio $\sin u/u$ decreases strictly from $1$ to $0$, so $u=\beta\sin u$ has exactly one root when $\beta>1$ and none when $\beta\le1$.
- *Own path, later branches.* On $(\pi,2\pi)$ the condition is $k(u)=-\beta\sin u-u=0$, with $k$ strictly concave and negative at both ends. Its maximum is at $u_m=\pi+\arccos(1/\beta)$ with value $\tan u_m-u_m$, which increases on $(\pi,3\pi/2)$ from $-\pi$ without bound. With $u_s^{*}$ the zero of $\sin u-u\cos u$ in $(\pi,3\pi/2)$, $k<0$ on the whole interval exactly when $\beta<\beta_s=\sqrt{1+u_s^{*2}}$. A root with $u\ge2\pi$ needs $\beta\ge2\pi>\beta_s$.

Interval bisection on the two monotone functions gives $u_p^{*}=2.798386045783887\ldots$, $\beta_p=2.971693870713802\ldots$ and $u_s^{*}=4.493409457909064\ldots$, $\beta_s=4.603338848751700\ldots$ (computer-assisted derived). The census is therefore:

| Speed | Partner roots | Own-path roots |
| --- | --- | --- |
| $0<\beta\le1$ | exactly one | none |
| $1<\beta<\beta_p$ | exactly one | exactly one |
| $\beta_p<\beta<\beta_s$ | at least three | exactly one |

The claimed census, one partner root and one own-path root, holds for every $1<\beta<\beta_p\approx2.9717$. At $\beta=\beta_p$ a double partner root appears with $D=0$ and the row is unbounded. The claimed speed and its whole interval lie in $(1,\pi/2)$, where the first sentence alone already confines every root to the first branches. A float64 grid scan at the solution counts one partner root and one own-path root (measured).

**The centre stays at rest (derived).** Each circling member is at distance $R$ from the origin at every time, so the centre receives exactly one root from each, with delay $R$, $n$ radial, $n\cdot V=0$ and $D=1$. The two rows are $X(-R)/R^3$ for emission points $X(-R)$ that are antipodal, and they cancel exactly.

**Reduced balance, used here only for a floating-point cross-check (derived).** With $u_p=\beta\cos u_p$ and $u_s=\beta\sin u_s$, the tangential balance is

$$
\frac{\cos u_s}{\sin^{2}u_s\,(1-\beta\cos u_s)}=\frac{\sin u_p}{\cos^{2}u_p\,(1+\beta\sin u_p)} ,
$$

and the radius is

$$
R=\frac{1}{\beta^{2}}\left[1-\frac14\left(\frac{1}{\cos u_p\,(1+\beta\sin u_p)}+\frac{1}{\sin u_s\,(1-\beta\cos u_s)}\right)\right].
$$

The claim document's delay angle is $\theta=2u$.

## Certificate

### The theorem invoked

Interval arithmetic carries a lower and an upper bound through every operation and rounds them outward, so the interval it returns contains the exact result for every choice of inputs inside the input intervals. A box is a product of intervals.

**Krawczyk test (Krawczyk 1969; Moore 1977; nonsingularity and uniqueness as in Rump 1983).** Let $f$ be continuously differentiable on a box $X\subset\mathbb R^{n}$, let $m$ be a point of $X$, let $C$ be any real $n\times n$ matrix, and let $A$ be an interval matrix that contains the Jacobian $f'(x)$ for every $x\in X$. Put

$$
K=m-C\,f(m)+(I-C\,A)(X-m).
$$

- (a) Every zero of $f$ in $X$ lies in $K$.
- (b) If $K$ and $X$ are disjoint, $f$ has no zero in $X$.
- (c) If $K$ lies in the interior of $X$, then $C$ and every matrix in $A$ are nonsingular and $f$ has exactly one zero in $X$.

**Proof sketch.** For $x\in X$ the mean value theorem, applied to each component of $f$ on the segment from $m$ to $x$, gives $f(x)=f(m)+J(x-m)$ with a matrix $J$ whose rows are Jacobian rows at points of $X$, so $J\in A$. Then $x-Cf(x)=m-Cf(m)+(I-CJ)(x-m)\in K$. A zero satisfies $x=x-Cf(x)$, which gives (a) and (b). Under (c) the continuous map $x\mapsto x-Cf(x)$ sends $X$ into itself and has a fixed point by Brouwer's theorem. For any $J\in A$ the affine map $y\mapsto m-Cf(m)+(I-CJ)(y-m)$ sends the box into its own interior; an affine map that sends a compact convex set with interior into its interior has a linear part of spectral radius below $1$, so $CJ$ is nonsingular, hence so are $C$ and $J$. The fixed point is then a zero. Two zeros $x_1,x_2$ in $X$ would satisfy $0=J(x_1-x_2)$ with $J\in A$ nonsingular, so they coincide. $\blacksquare$

The test certifies existence and uniqueness in $X$ together. It also shows that the Jacobian is nonsingular at the zero, so the balance is an isolated, nondegenerate solution. Applied to a tiny box it gives the tight enclosure $K$; applied to the claimed box it gives uniqueness there.

### What was computed

**Unknowns and equations.** Every causal delay is kept as an unknown. For claim A the system has $21$ unknowns, the six parameters $p$ and the fifteen delays, and $21$ equations: the six Cartesian balance components $\sum a+w^2x_k=0$ and the fifteen root conditions $G=\tau^2-\lvert x-X\rvert^2=0$. For claim B the main system is scale-free, at $R=1$ and $w=\beta$: unknowns $(\beta,\tau_p,\tau_s)$, equations the tangential sum and the two root conditions. A second system for claim B uses the physical unknowns $(R,w,\tau_p,\tau_s)$ and the equations radial sum plus $w^2R$, tangential sum, and the two root conditions; it checks the scaling step.

**Evaluation.** One generic routine evaluates a row from the receiver position, the emission position, the emission velocity, the polarity product and the delay, exactly as in the displayed row formula; it refuses to return a value unless the delay is certainly positive and the sign of $D$ is certain, so every system is smooth on every box on which it was evaluated. The same routine serves the controls and both claims. The interval Jacobian $A$ comes from forward-mode automatic differentiation carried out in interval arithmetic, which by the inclusion property contains $f'(x)$ for every $x$ in the box. The matrix $C$ is a floating-point inverse of the Jacobian at the midpoint. Arithmetic is `mpmath.iv` (mpmath 1.3.0) at 260 bits.

**From the balance conditions to the system with delays (bridge, computer-assisted derived).** Uniqueness of the zero of the larger system in a box $P\times T$, with $P$ the parameter box and $T$ a box of delays, gives uniqueness of the balance in $P$ once each row's causal delay is known to lie in its interval of $T$ for every parameter point of $P$. That is checked directly: for each row, $G<0$ at the lower end of the delay interval and $G>0$ at the upper end, both for the whole of $P$ in interval arithmetic. A root therefore lies in the interval, and by the census it is the only causal root of that row. The delay intervals have half-widths between $4.2\times10^{-5}$ and $1.7\times10^{-4}$ in claim A and $4.4\times10^{-6}$ (at $R=1$) in claim B.

### Claim A results (computer-assisted derived)

| Box | Half-width in the parameters | Bound on $\lVert I-CA\rVert_\infty$ | Largest radius of $K$ | $K$ in the interior of $X$ |
| --- | --- | --- | --- | --- |
| Tight | $10^{-45}$ about the Newton-refined point | $1.1\times10^{-41}$ | $4.2\times10^{-76}$ | yes, first pass |
| Claimed | $2.1\times10^{-6}$ about the printed values | $0.071$ | $7.4\times10^{-7}$ | yes, first pass |

The tight enclosure lies inside the claimed box, so the two certificates concern the same zero. Each value below is the enclosure midpoint rounded to 40 significant digits; the certified radius of every enclosure is below $4\times10^{-76}$.

| Unknown | Enclosure midpoint | Printed in the claim |
| --- | --- | --- |
| $R_1$ | $2.436258599385893611529337578105363818797$ | $2.4362585993858936115$ |
| $R_2$ | $4.489625138713379489560271005999548533510$ | $4.4896251387133794896$ |
| $R_3$ | $2.592353959287255790418337446318195984088$ | $2.5923539592872557904$ |
| $w$ | $0.2163516275643780011830956867313018651460$ | $0.21635162756437800118$ |
| $\phi_2$ | $0.9790751535762778202186736471110294416712$ | $0.97907515357627782022$ |
| $\phi_3$ | $1.427457134629667711448342017598359566351$ | $1.4274571346296677114$ |
| speed $R_1w$ | $0.5270885131448500423898170486385329620438$ | about $0.5271$ |
| speed $R_2w$ | $0.9713377059145860010832299729201978186415$ | about $0.9713$ |
| speed $R_3w$ | $0.5608599983147570965238039533442525581083$ | about $0.5609$ |

All three speeds are certified below $1$, at the solution and over the whole claimed box. The fifteen rows at the solution, with member $0$ of a pair the one at angle $\phi_j$ and member $1$ the antipodal one:

| Receiver | Source | Delay $\tau$ | $D$ | Radial | Tangential |
| --- | --- | --- | --- | --- | --- |
| Pair 1 | Pair 1, member 1 | $4.3442968887$ | $1.2386866519$ | $+0.0381386806$ | $-0.0193706471$ |
| Pair 1 | Pair 2, member 0 | $2.5047312057$ | $1.4000022153$ | $-0.0741439903$ | $-0.0864028104$ |
| Pair 1 | Pair 2, member 1 | $6.7449093275$ | $1.1620750348$ | $+0.0179988868$ | $-0.0058162916$ |
| Pair 1 | Pair 3, member 0 | $2.2723250007$ | $1.4841217928$ | $-0.0516051279$ | $+0.1198562389$ |
| Pair 1 | Pair 3, member 1 | $4.9489006877$ | $0.9035756566$ | $-0.0444249068$ | $-0.0082664899$ |
| Pair 2 | Pair 1, member 0 | $6.4748003678$ | $0.7477651492$ | $+0.0308050655$ | $+0.0082835569$ |
| Pair 2 | Pair 1, member 1 | $4.3256675162$ | $1.5149894792$ | $+0.0299101960$ | $-0.0187030408$ |
| Pair 2 | Pair 2, member 1 | $6.7135516286$ | $1.6450323410$ | $+0.0100840073$ | $-0.0089563723$ |
| Pair 2 | Pair 3, member 0 | $1.9014644237$ | $1.0489828958$ | $-0.2633311728$ | $+0.0132962568$ |
| Pair 2 | Pair 3, member 1 | $6.3831176664$ | $1.3168437657$ | $-0.0176185896$ | $+0.0060795994$ |
| Pair 3 | Pair 1, member 0 | $4.7323586746$ | $0.8161463182$ | $-0.0516881729$ | $-0.0179347172$ |
| Pair 3 | Pair 1, member 1 | $2.6969796442$ | $1.4583502992$ | $-0.0543303775$ | $+0.0770417006$ |
| Pair 3 | Pair 2, member 0 | $5.1808940729$ | $0.5139741895$ | $-0.0361738288$ | $-0.0628136645$ |
| Pair 3 | Pair 2, member 1 | $5.1854867802$ | $1.4855958382$ | $-0.0125262293$ | $+0.0216740840$ |
| Pair 3 | Pair 3, member 1 | $4.5652191559$ | $1.2658566764$ | $+0.0333756350$ | $-0.0179674029$ |

The radial totals are $-0.114036457689$, $-0.210150493589$ and $-0.121342973471$, equal to $-w^2R_k$ within the enclosures, and the tangential totals are enclosed within $4\times10^{-76}$ of zero. Every $D$ is positive; the smallest is $0.51397$.

### Claim B results (computer-assisted derived)

| System and box | Half-width | Bound on $\lVert I-CA\rVert_\infty$ | Largest radius of $K$ | $K$ in the interior of $X$ |
| --- | --- | --- | --- | --- |
| Scale-free, tight | $10^{-45}$ about the Newton-refined point | $6.8\times10^{-44}$ | $9.2\times10^{-78}$ | yes, first pass |
| Scale-free, claimed interval | $1.1\times10^{-6}$ in $\beta$ about the printed value | $1.8\times10^{-4}$ | $5.5\times10^{-10}$ | yes, first pass |
| Physical unknowns, tight | $10^{-45}$ | $2.1\times10^{-40}$ | $4.8\times10^{-76}$ | yes, first pass |

The radial sum at $R=1$ is $S_r=-0.279920407566249869730514\ldots$, negative, so the radius $-S_r/\beta^2$ is positive. The physical-unknown system encloses the same $R$ and the same $\beta=Rw$. Each value below is an enclosure midpoint rounded to 40 significant digits, with certified radius below $10^{-75}$.

| Quantity | Enclosure midpoint | Printed in the claim |
| --- | --- | --- |
| $\beta$ | $1.275746573710688597451797110580018989212$ | $1.2757465737106885975$ |
| $R$ | $0.1719910075160478920991440088464452119842$ | $0.17199100751604789210$ |
| $w=\beta/R$ | $7.417519044370113665299621811319758253301$ | not stated |
| partner delay | $0.2280807927299372004104199082158694399164$ | not stated |
| own-path delay | $0.3179362088841720940495860188963449361636$ | not stated |
| $u_p$, $u_s$ | $0.845896811864670875575027339$, $1.179148942146590516693875246$ | not stated |
| $D$ on the partner row, own-path row | $1.954980577819123513439837106$, $0.513032760271147248616714549$ | not stated |

### Larger boxes (computer-assisted derived, beyond the claims)

Iterating $X\leftarrow K(X)\cap X$ keeps every zero of the starting box by part (a), and once part (c) holds the starting box contains exactly one zero. With this, the six-member balance is the only solution in the box of half-width $3\times10^{-4}$ in each parameter, 150 times the claimed half-width, and the trimer's tangential zero is the only one for $\beta$ within $10^{-3}$ of the printed value, 1000 times the claimed half-width. At half-width $10^{-3}$ for the six-member balance and $10^{-2}$ for the trimer the test does not decide; that is a limit of the test at that box size and is not evidence of a second balance.

## Controls

All controls ran before the targets, and the script does not run the targets unless they pass.

**Row evaluator against closed forms (computer-assisted derived).** For a source in uniform motion $X(s)=X_0+Vs$ below wake speed and a receiver at $x$ at time $0$, with $d_0=x-X_0$, the delay solves the quadratic $(1-V^2)\tau^2-2(d_0\cdot V)\tau-\lvert d_0\rvert^2=0$, so $\tau=\bigl(d_0\cdot V+S\bigr)/(1-V^2)$ with $S=\sqrt{(d_0\cdot V)^2+(1-V^2)\lvert d_0\rvert^2}$, and since $\tau D=S$ the row is $\sigma(d_0+V\tau)/(\tau^2S)$. For a source at rest this is $\tau=\lvert d_0\rvert$ and the inverse-square row $\sigma d_0/\lvert d_0\rvert^3$. The evaluator under test does not use these formulas: it encloses the delay implicitly, by the Krawczyk test on $G$ in one unknown, and then calls the generic row routine. In every case its intervals and the closed-form intervals overlap, as they must if both contain the true value, and both are of rounding width.

| Case | Source speed | Largest interval width, delay and two components |
| --- | --- | --- |
| Source at rest, opposite polarity | $0$ | $7.6\times10^{-78}$ |
| Source at rest, like polarity | $0$ | $1.3\times10^{-77}$ |
| Uniform motion | $0.814$ | $2.3\times10^{-76}$ |
| Uniform motion, approaching | $0.971$ | $8.5\times10^{-75}$ |
| Uniform motion, receding | $0.971$ | $5.3\times10^{-76}$ |

**Krawczyk machinery on known cases (computer-assisted derived).** On $x^2+y^2=1$, $x=y$ the test certifies one zero in a box of half-width $10^{-3}$ and its enclosure contains $1/\sqrt2$. On a box with no zero it returns an empty intersection. On $x^2-1$ over $[-2,3]$, which holds two zeros, it does not report uniqueness.

**Further checks (measured unless stated).**

- The automatic-differentiation Jacobian agrees with central differences at step $10^{-25}$ to $2\times10^{-47}$ (claim A), $5\times10^{-50}$ and $8\times10^{-46}$ (claim B systems), in 260-bit floating point.
- The reduced radial and tangential formulas of this record, evaluated in 260-bit floating point with their own bisection for each delay, leave a balance residual of $5\times10^{-79}$ at the claim A solution and a tangential residual of $1.4\times10^{-77}$ at the claim B solution, and reproduce $R$. This checks the Cartesian systems against separately written formulas by the same author; it is not independent of the derivation.
- The interval sine and cosine satisfy $\sin^2+\cos^2\ni1$ at a test point, and a sine computed at twice the working precision lies in its interval.
- At the printed 20-digit values of the claim the 21-equation residual is $1.9\times10^{-20}$ and the trimer residual is $1.0\times10^{-19}$, the size expected from rounding to 20 digits.

## Discrepancies and corrections

**No discrepancy in any printed digit of the claims.** The 20-digit values in the adjudication request are the correct roundings of the enclosed solution in all eight quantities. The longer strings in the two claim documents (28 significant digits for claim A, 26 for claim B) are also correct to their last printed digit.

**Correction of wording, both claims.** The request says the solution is within $10^{-30}$ of the listed values, and the six-member document says the zero lies within $5\times10^{-39}$ of the values in its table. Neither holds for the values as printed, which carry too few digits: the 20-digit values differ from the solution by between $9\times10^{-22}$ and $4.8\times10^{-20}$, and the 28-digit table values by up to $4.0\times10^{-28}$. The statement that is true, and presumably intended, is that the solution lies within that distance of the centre the instrument used, whose leading digits are the printed ones. The six-member document should say so, or print its bound next to digits of matching length. The trimer document prints its values with an ellipsis and says they are enclosed to better than $10^{-39}$; that wording is consistent, and this record's enclosures, of radius below $10^{-75}$, do not contradict it.

**Uniqueness box.** Confirmed as claimed, and it holds on much larger boxes (previous section). The claim document reports that its own test failed at half-width $10^{-5}$ because one delay enclosure did not contract; in this formulation that box and boxes up to $3\times10^{-4}$ pass, so the failure was a limit of that delay enclosure.

**Row table of the six-member document, four last-digit entries.** Fifty-six of the sixty entries of that table agree with the rows above. Four are one unit off in the last printed place: the delay of pair 2 from the nearer member of pair 3 is $1.90146$ and rounds to $1.901$, printed $1.902$; the delay of pair 3 from the farther member of pair 2 is $5.18549$ and rounds to $5.185$, printed $5.186$; the radial part of pair 1 from the farther member of pair 3 is $-0.0444249$ and rounds to $-0.04442$, printed $-0.04443$; the tangential part of pair 3 from the nearer member of pair 1 is $-0.0179347$ and rounds to $-0.01793$, printed $-0.01794$. The three radial totals printed there are correct. These entries are not part of the enclosure claim.

**Census range for the trimer.** The claim document proves its census for $1<\beta<\pi/2$. That proof is correct. Theorem 2 above extends the same census to $1<\beta<\beta_p=2.97169387\ldots$ and identifies what changes at each end.

**Claimed transmitter-factor and delay-angle values.** The trimer document's $\theta_p=1.691793623729\ldots$, $\theta_s=2.358297884293\ldots$, and factors $1.954980577819\ldots$ and $0.513032760271\ldots$ equal $2u_p$, $2u_s$, and the two values of $D$ above.

## Limits and falsifiers

**What the certificate does not cover.**

- Stability. Nothing here bears on the growing characteristic roots reported in the claim documents, which remain floating-point measurements.
- Anything outside the certified boxes. Other balances of the same families may exist elsewhere in parameter space.
- Any motion other than rigid uniform rotation in a plane with the stated polarities, and the question of how such a state could be reached from other initial histories. The solution assumes the rotation has lasted for the whole past.
- For the trimer, other speeds. The statement is about the one tangential zero near $\beta=1.2757$; the census above shows where the row count changes but no balance is sought there.

**What the certificate rests on.**

- The outward rounding of `mpmath.iv` in mpmath 1.3.0 for addition, subtraction, multiplication, division, square root, sine, cosine, and the conversion of decimal strings. The library is not formally verified. One spot check of sine and cosine was made.
- The correctness of about twelve hundred lines of code written for this adjudication: the automatic differentiation, the Krawczyk evaluation and the two systems. The controls bound this risk; they do not remove it.
- The row rule as stated in the adjudication request. It was compared by reading with the path-history sum of the Master Equation chapter and matches at $c_f=1$; no further audit of the corpus equation was made. Both this certificate and the claimant's would concern a different equation if the row rule were different.
- The census proofs above, in particular the reduction of the trimer's root conditions to $u=\beta\lvert\cos u\rvert$ and $u=\beta\lvert\sin u\rvert$.

**Agreement between the two certificates.** The two share the problem statement and the library `mpmath.iv`, and nothing else: the formulations, the code and the bridge from balance conditions to tested system are separate. Agreement of the digits is therefore evidence about the equations as stated, not evidence that the library is sound.

**What would overturn the verdict.**

- A correct interval evaluation of the six balance conditions of claim A, or of the trimer's tangential sum, that excludes zero on the enclosures tabulated above.
- A parameter point of the claimed box at which some row has a second positive-delay root, or a member reaches speed $1$. By Lemma 1 the first requires the second, and the interval speed bounds exclude it, so this would expose an error in the bounds.
- A demonstrated case in which `mpmath.iv` at 260 bits returns an interval for a sine, cosine or square root that does not contain the true value.
- A row rule in the Master Equation that differs from the one stated at the top of the previous section.
- A defect in the control closed forms, for instance a uniformly moving source for which the quadratic delay above is wrong. The first place to look is the log's Control 1 block.

## Reproduction

Files, all under `.local-data/master-equation-closure/geometry-session-20261004/enclosure/independent/` (ignored local evidence, relative to the repository root):

| File | Content |
| --- | --- |
| `independent_certificate.py` | Controls, both certificates, larger-box exploration. SHA-256 `e94d2e649c5548492cffa5931377df0254e052e2c769a614f84a0d9b6b00330a`. |
| `independent_certificate.log` | Full output of the run recorded here. |
| `independent_certificate.json` | Enclosure endpoints, statuses and flags. |
| `compare_printed_digits.py` | Comparison of printed strings and of the six-member row table with the enclosures. SHA-256 `ff9c0eb8dce489ad12efe94768133c0d5ff9ecfbd98997625e5498db8c8a412e`. |
| `compare_printed_digits.log` | Its output. |

Commands, run from the repository root with the shared virtual environment (Python 3.13, mpmath 1.3.0, numpy 2.2.4); each script writes its outputs next to itself:

```bash
"${AAA_VENV:-../.venv}/bin/python" .local-data/master-equation-closure/geometry-session-20261004/enclosure/independent/independent_certificate.py
"${AAA_VENV:-../.venv}/bin/python" .local-data/master-equation-closure/geometry-session-20261004/enclosure/independent/compare_printed_digits.py
```

The first takes about four seconds. It passes when both control blocks print `PASS` and the last lines print `"existence_and_uniqueness_in_claimed_box": true` for claim A and `"existence_and_uniqueness_in_claimed_interval": true` for claim B. No file of the claimant was modified, and nothing was staged or committed.
