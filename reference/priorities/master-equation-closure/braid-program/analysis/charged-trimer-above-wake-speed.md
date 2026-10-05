# Charged assemblies with a central member: an exact trimer above wake speed, two five-member balances, and their instability

## Result

Two architrinos of one polarity can circle a third of the opposite polarity, which stays at rest between them, and satisfy the unchanged Master Equation exactly. The balance exists at one speed and one radius:

$$
\frac{v}{c_f}=1.275746573711,\qquad \frac{R}{R_*}=0.171991007516,\qquad R_*=\frac{K}{c_f^2}.
$$

It is the smallest exact assembly on record with a net polarity: three members, two of one sign and one of the other. Below wake speed the two circling members only brake each other and no balance exists. Just above wake speed each member also receives its own wake, which pushes it forward, and at the speed above the two effects cancel.

The balance is unstable. The delayed first variation has fifteen characteristic roots with positive real part, three real and six complex pairs, the largest at $4.0$ times the angular rate.

Two five-member balances of the same kind were also found, each a central member with two like pairs of opposite polarity at different radii. In one of them the inner pair moves below wake speed. Both are unstable.

**Claim grade:** computer-assisted derived for the existence and local uniqueness of the trimer balance, by the [interval enclosure](#interval-enclosure-of-the-trimer) of 2026-10-04, after measurement by exact root finding in float arithmetic with a known-case control and reproduction by a separate construction; measured for the five-member balances; measured for the characteristic roots, likewise reproduced, which are formal growing modes of the first variation and carry no nonlinear statement. The equation is unchanged: every positive-delay root is included, own-path roots among them, with no speed cap. Values use $c_f=1$ and $K=1$.

This configuration is not one of the alternating rings studied by the ring research. It was found while examining three-member arrangements with two members of one polarity, after the [slow rotor analysis](slow-rigid-rotor-first-order-torque.md) showed that the slow version of this shape contracts.

## Setting

The central member has polarity $-1$ and is at rest at the origin. The two circling members have polarity $+1$ and positions $\pm R\,(\cos\omega T,\sin\omega T)$, with $\beta=\omega R/c_f$. Each circling member receives three kinds of contribution.

- **From the center.** A source at rest gives an exactly static row, $K/R^2$ toward the center, with no component along the motion.
- **From its partner.** The partner has the same polarity and repels along the line from its emission point.
- **From itself.** When $\beta>1$ the member overtakes its own earlier wake. Its own emission has the same polarity and repels along the chord from the emission point to the present position.

A member at angle $0$ receives from a source that was at angle $\phi$ at the reception time, with $\phi=0$ for itself and $\phi=\pi$ for the partner, whenever the delay angle $\theta=\omega\tau>0$ satisfies

$$
\theta=2\beta\,\Bigl\lvert\sin\frac{\theta-\phi}{2}\Bigr\rvert .
$$

The central member receives from both circling members at equal delays and from opposite directions, so its acceleration is zero and it stays at rest.

## Why a balance appears just above wake speed

Below wake speed there is one root, from the partner, and no own-path root. The partner's row has a component against the motion at every speed below one, for the reason given in the rotor analysis: a like-polarity member on the same circle brakes. The tangential sum is $-0.071$, $-0.127$ and $-0.171$ in units of $K/R^2$ at $\beta=0.3$, $0.6$ and $0.9$. No balance exists.

Above wake speed the own-path root appears. At its birth the transmitter factor vanishes and its forward push is unbounded; as speed rises the push falls. The tangential sum is therefore large and positive just above $\beta=1$, and it passes through zero once in the first speed cell:

| $\beta$ | Tangential sum | Radial sum, center included |
| --- | --- | --- |
| $1.10$ | $+1.835$ | $+1.087$ |
| $1.20$ | $+0.258$ | $-0.034$ |
| $1.2757466$ | $0$ | $-0.279920$ |
| $1.35$ | $-0.114$ | $-0.404$ |
| $1.50$ | $-0.222$ | $-0.530$ |

Both sums are in units of $K/R^2$, positive outward and forward. At the zero the radial sum is inward, so a circular motion with $\beta^2c_f^2/R=0.279920\,K/R^2$ exists, which gives the radius stated above.

At the balance each circling member has exactly two roots:

| Source | Delay as a fraction of a turn | Transmitter factor | Radial part | Tangential part |
| --- | --- | --- | --- | --- |
| Its own path | $0.3753$ | $+0.5130$ | $+0.5272$ | $+0.2177$ |
| The partner | $0.2693$ | $+1.9550$ | $+0.1929$ | $-0.2177$ |

The own-path push and the partner's braking cancel. The central attraction, $-1$, outweighs the two outward radial parts.

## Other tangential zeros are not balances

The tangential sum vanishes again in higher speed cells, at $\beta=3.0025$, $4.6130$, $6.2066$, $7.7919$, $9.3727$ and $10.9507$ within the range $\beta\le12$ searched. The first search of this analysis found three of these six; the independent check found all six. At each of these the radial sum is outward, so no circular motion exists there. Without the central member the tangential zeros are the same and every one is outward: two like members cannot circle each other unaided.

Three or four like members about a central opposite one have tangential zeros too, at $\beta=1.1803$ and $1.1336$ in the first cell and others above, and every one of them is outward: the mutual repulsion of the circling members exceeds the central attraction. The two-member case is the only balance of this centered family found.

## Five members: a center with two like pairs

A wider family was searched: a central member at rest, a like pair of one polarity at radius $R_a$, and a like pair of the other polarity at radius $R_b$, turned from the first by an angle $\phi$, all at one angular rate. The central member is at rest by symmetry for any $\phi$. Four conditions, tangential and radial for one member of each pair, fix the four unknowns. The instrument `conc.py` solves them from random starts with every causal root evaluated exactly; its control is the alternating four-member ring without a center, whose recorded radius and speed give residuals below $10^{-11}$.

Two balances were found, each also recovered independently from other starts in its polarity-reversed copy. In both, the pair whose polarity is opposite to the center's is the inner one.

| Inner pair radius | Outer pair radius | Angular rate | Angle between pairs | Inner speed | Outer speed | Roots per inner and outer member, the center's included |
| --- | --- | --- | --- | --- | --- | --- |
| $1.4544408157$ | $2.4488910441$ | $0.5742964074$ | $0.81790\,\pi$ | $0.835280$ | $1.406389$ | 4 and 5 |
| $0.1982407637$ | $0.2905013058$ | $9.2239550692$ | $0.49681\,\pi$ | $1.828564$ | $2.679571$ | 7 and 7 |

Lengths are in units of $R_*$ and speeds in units of $c_f$. The residuals of all four conditions are below $10^{-14}$. These are five-member exact balances with a net polarity equal to the center's.

The first is notable for its speeds: its inner pair moves below wake speed, at $0.835\,c_f$, and receives nothing from its own wake, while its outer pair moves above wake speed. It is the first finite balance on record in which a moving member is below wake speed.

Both are unstable under the delayed first variation. The argument-principle count is eleven growing roots for the first, the largest at $1.80\,\omega$, and twenty-four for the second, the largest at $2.75\,\omega$; each count is the same on three nested rectangles reaching to $120\,\omega$ and starting at real part $0.02\,\omega$. For the second balance the independent check found one more complex pair just left of that edge, at $(0.0135\pm2.9386\,i)\,\omega$, so it has twenty-six roots with positive real part in all.

The search used 150 random starts in each of six runs and is not exhaustive. A separately constructed check, written from a description alone, confirmed both balances: with its own solver it refined the same parameters to ten digits, reduced the residuals below $10^{-38}$ in 40-digit arithmetic, found each zero isolated, and reproduced the stability counts with the qualification just stated. Its record is retained at `.local-data/master-equation-closure/geometry-session-20261003/independent/five-member-balances.md`.

## Stability of the trimer

The balance is a solution, so its first variation is defined. Each member is displaced by a small vector in its own co-rotating frame that grows as $e^{\lambda T}$, including displacement out of the plane, and the central member is free to move. The variation of one row is the formula of the [rotating ladder analysis](../../lattice-research/analysis/rotating-alternating-ladder.md#delayed-linear-stability), extended to allow a transmitter factor of either sign by replacing $D$ with $\lvert D\rvert$ in the row and carrying the sign of $D$ through its derivative. Summing over the eight ordered roots gives a nine-by-nine characteristic matrix.

Its zeros with positive real part were counted by the argument principle on four nested rectangles reaching to $5$, $20$, $60$ and $150$ times the angular rate $\omega$, each starting at real part $0.02\,\omega$ to leave out the neutral roots on the imaginary axis. The count is fifteen on every rectangle. All fifteen were located:

| Root divided by $\omega$ | Kind |
| --- | --- |
| $4.0153$ | Real |
| $1.6786$ | Real |
| $1.5774$ | Real |
| $0.7911\pm3.1908\,i$ | Complex pair |
| $0.4506\pm3.2300\,i$ | Complex pair |
| $0.4395\pm1.4830\,i$ | Complex pair |
| $0.2676\pm2.9154\,i$ | Complex pair |
| $0.2021\pm4.9620\,i$ | Complex pair |
| $0.0890\pm1.9864\,i$ | Complex pair |

Here $\omega=7.4175$ in units of $c_f/R_*$, a period of $0.847$.

These are formal growing modes. Connecting them to growth of actual nearby solutions needs a history-flow argument such as the one supplied for the [six-member ring](t02-admissible-nonlinear-history-connection.md); none has been made here.

## Instruments and controls

Both instruments are retained in `.local-data/master-equation-closure/geometry-session-20261003/`.

- **Balance:** `centered.py` finds every root of the delay equation on a fine grid and sums the rows. Its control is the opposite-polarity two-member circle above wake speed, for which it returns $\beta=3.070356625390$ and $R/R_*=0.086941673474$, the [recorded values](../configurations/circular-configuration-registry.md).
- **Stability:** `circ_delay.py` builds the characteristic matrix for any uniformly rotating planar assembly. Three controls ran before the target. A finite-difference test of the row variation at a root with transmitter factor $-0.93$ agreed to $8\times10^{-11}$. The full determinant vanishes at the ring research's [certified growth rates](ring-other-inventories-stability-2026-10-03.md): $0.859629068$ and $10.658424174$ for the six-member ring, $2.462963059$ and $20.064543015$ for the four-member ring, $17.370511518$ and $74.472461432$ for the two-member circle, each to ten digits or better. The trimer's own balance residual in the assembly code is $3\times10^{-14}$.

The ring research's certificates were used as known cases only. Nothing in its files was changed.

## Independent check of the trimer

A separately constructed analysis, made from a description of the configuration alone and with its own code, reproduced the trimer. It obtained $\beta=1.2757465737107$ and $R/R_*=0.171991007516048$, the same two roots with the same delays and transmitter factors, and the same result that every other tangential zero up to $\beta=12$ is outward. It derived in closed form that the tangential sum is negative at every speed below wake speed. Its argument-principle count is exactly fifteen growing roots on contours from $5\,\omega$ to $160\,\omega$, with a derived bound confining all such roots within $34\,\omega$, and its fifteen roots agree with the table above to six digits. It classified them: three in the common radius-and-phase sector with the center fixed, eight antisymmetric in the plane, four out of the plane. Its controls were the two-member circle's balance, a finite-difference test of the row variation including negative transmitter factors, and the two certified growth rates of the two-member circle. Its record is retained at `.local-data/master-equation-closure/geometry-session-20261003/independent/charged-trimer.md`. Both analyses were produced within one working session.

## Interval enclosure of the trimer

On 2026-10-04 the trimer balance was enclosed in interval arithmetic, which bounds every rounding error outward so that a reported inclusion is a statement about the exact equations.

**What is proved.** Among speeds within $10^{-6}$ of the value below, the tangential balance of a circling member has exactly one zero, and the radial balance then fixes the radius:

$$
\frac{v}{c_f}=1.2757465737106885974517971\ldots,\qquad\frac{R}{R_*}=0.1719910075160478920991440\ldots,
$$

each enclosed to better than $10^{-39}$. The central member stays at rest because a half turn about it maps the assembly to itself and reverses any in-plane acceleration it could have.

**The root census is derived.** Let $\theta=\omega\tau$ be the angle a source turns through during the delay $\tau$. The partner is then at distance $2R\lvert\cos(\theta/2)\rvert$ and the member's own earlier position at distance $2R\lvert\sin(\theta/2)\rvert$, so a partner root requires $\theta=2\beta\lvert\cos(\theta/2)\rvert$ and an own-path root requires $\theta=2\beta\lvert\sin(\theta/2)\rvert$, with $\beta=v/c_f$. Both require $\theta\le2\beta$, and $2\beta<\pi$ here. On $(0,\pi)$ the function $\theta-2\beta\cos(\theta/2)$ increases strictly from $-2\beta$ to $\pi$, so there is exactly one partner root. The function $\theta-2\beta\sin(\theta/2)$ vanishes at zero, starts downward because $\beta>1$, and is strictly convex on $(0,2\pi)$, so it has exactly one positive zero, the own-path root. The argument holds for every $1<\beta<\pi/2$; the independent adjudication below extends the same census to $1<\beta<2.9717$, above which further partner roots appear. The central member is at rest and contributes the static inverse-square row. The enclosed delay angles at the balance are $\theta_p=1.691793623729\ldots$ for the partner and $\theta_s=2.358297884293\ldots$ for the own path, with transmitter factors $1.954980577819\ldots$ and $0.513032760271\ldots$, both positive.

**Method.** With $D_p=1+\beta^2\sin\theta_p/\theta_p$ and $D_s=1-\beta^2\sin\theta_s/\theta_s$, the tangential sum on a circling member, in units of $\beta^3K/R^2$, is

$$
t(\beta)=-\frac{\sin\theta_p}{\theta_p^3D_p}+\frac{\sin\theta_s}{\theta_s^3D_s}.
$$

The first term is the partner's braking and the second is the forward push of the member's own wake. Each delay angle was enclosed over the speed interval by an interval Newton step and differentiated implicitly. On the interval the derivative $t'$ has one sign and $t$ changes sign between the ends, so the zero is unique there; one interval Newton step on $t$ gives the enclosure. The radius follows from the radial sum in closed form.

**Instrument and limits.** The instrument is `enclose.py` in `.local-data/master-equation-closure/geometry-session-20261004/enclosure/`, using the interval arithmetic of mpmath at 40 digits; the certificate rests on that library's outward rounding. It covers existence and local uniqueness of this one balance. The statement that no other speed up to $12\,c_f$ gives a balance remains a float scan, and the stability count remains a float measurement.

**Separately constructed certificate.** An [independent adjudication](exact-balance-enclosures-independent-adjudication-2026-10-04.md), written from the problem statement without this instrument, accepts the claim with no correction. It solves a scale-free system for the speed and the two delays and, as a check, a second system in the physical variables; both enclose the same speed and radius, with every printed digit above confirmed, and its formulation certifies uniqueness of the tangential zero for speeds within $10^{-3}$ of the balance. The two certificates share the problem statement and the interval library, and were produced within one working session.

## What it means

- **A net polarity is compatible with an exact balance.** Every other exact assembly on record is neutral. The trimer has two members of one sign and one of the other, and the five-member balances have three of one sign and two of the other.
- **A finite balance can include moving members below wake speed.** In one five-member balance the inner pair moves at $0.835\,c_f$. The forward push it needs comes from the faster outer pair, not from its own wake.
- **It follows the pattern of the rings.** It exists only above wake speed, in the first cell after the own-path root is born, and it has growing modes. Its instability is not a surprise; the zero-delay version of the same shape is unstable at $2.5$ times its angular rate.
- **The mechanism is the same as in the slow regime, with one new term.** Like-polarity neighbours brake; the forward push that balances them comes here from the member's own wake, where in the [rotating ladder](../../lattice-research/analysis/rotating-alternating-ladder.md) it comes from the opposite-polarity partner.

## Limits and falsifiers

The trimer balance is enclosed; the five-member balances are float measurements. The search covered $0.05\le\beta\le12$ on a grid of 2400 speeds and can miss a pair of zeros closer together than the grid. The stability count excludes roots with real part below $0.02\,\omega$. Only uniform circular motion with the central member at rest was considered. The search for five-member balances is random and not exhaustive.

A root census at the stated speed with a root other than the two listed, a nonzero tangential sum there under tighter arithmetic, or an outward radial sum would refute the balance. A characteristic matrix whose determinant does not vanish at the tabulated roots, or a different count on a larger contour, would refute the stability result.
