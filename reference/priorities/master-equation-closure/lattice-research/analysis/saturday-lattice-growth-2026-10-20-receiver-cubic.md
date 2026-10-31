# The signed receiver cubic of the localized lattice family and a further barrier (2026-10-20)

## Result

**In words.** The [band-envelope note](saturday-lattice-growth-2026-10-20.md) continued the localized disturbance of the alternating lattice, with its complete nonlinear past, to the time $\tilde T(\varepsilon)$ at which its band seed-size bound $\tilde\Delta(t)=0.0983\,\varepsilon\,e^{2.8033t}$ reaches $0.0305$. Its assembled estimate contains a receiver term, the field of the resting lattice felt by a displaced member, bounded there by $57.346$ times the cube of the displacement. That constant adds the absolute values of every source's contribution. This note computes the cubic term itself. By the cubic symmetry of the lattice and the harmonicity of $1/r$, the cubic part of the resting field is fixed by one signed lattice sum, $H_{1111}\approx-85.9$, and its size is at most $\lvert H_{1111}\rvert/6\approx14.35$ times the cube of the displacement. The next term is of fifth order.

1. **The receiver field to fifth order (derived).** For a receiver displacement $\alpha$ with $\lvert\alpha\rvert\le\rho\le1/16$, the resting-lattice field is $E(\alpha)=\tfrac{H_{1111}}{12}\bigl(3\lvert\alpha\rvert^2\alpha-5\alpha^{\circ3}\bigr)+R(\alpha)$, where $\alpha^{\circ3}$ cubes each component, and $\lvert R(\alpha)\rvert\le6Z_7(1-\rho)^{-7}\lvert\alpha\rvert^5$ with $Z_7=\sum_{d\ne0}\lvert d\rvert^{-7}$ (Lemma R.1). The cubic part has size at most $\lvert H_{1111}\rvert\lvert\alpha\rvert^3/6$, attained along a lattice axis.
2. **The constants (derived; interval enclosure).** $-86.0810\le H_{1111}\le-85.6909$ and $Z_7\le7.46706$; on the chart of radius $1/16$ the receiver constant becomes $14.622$ in place of $57.346$ (Lemma R.2). This agrees with the preparation note's float measurement of $\lvert E(\alpha)\rvert/\lvert\alpha\rvert^3$ between $3.6$ and $14.4$ along symmetry directions, which is not used.
3. **A further barrier (derived; numbers by exact arithmetic).** With this constant, the band forward factor $\tilde\mu\le0.92274$ and the rest of the accepted summed signed estimate unchanged, the barrier holds on the chart $1/16$ at seed size $0.033$ with coefficient $12.5$: $C_LF\le0.0134328<0.0136125$. The same solution exists to
   $$
   \hat T(\varepsilon)=\frac1{2.8033}\ln\frac{0.033}{0.0983\,\varepsilon}\ \ge\ \tilde T(\varepsilon)+0.0281\ \ge\ T_N(\varepsilon)+0.1576,
   $$
   with $\lvert u-\varepsilon\phi\rvert<12.5\,\tilde\Delta^2$, displacements at most $0.046613$, speeds at most $0.16233$, separations at least $0.906775$, one causal root per ordered pair and no root on a member's own path (Theorem R.3). Smaller coefficients hold earlier: $5.5$, $7$ and $9.5$ while $\tilde\Delta\le0.020$, $0.025$ and $0.030$.
4. **Central growth (derived).** At $\hat T$ the central displacement is at least $0.010835$ for $\varepsilon=10^{-4}$, against at most $9.086\times10^{-6}$ anywhere at time zero, a growth factor of at least $1192$; the lower bound is positive for every $10^{-37}\le\varepsilon\le0.00646$ (Proposition R.4).
5. **Where it stops.** At the declared pair the chart condition on the chart $1/16$ leaves slack $0.002275$, and the largest chart-constrained seed size is not established, while the barrier inequality with the signed receiver cubic admits no coefficient at any seed size $d\ge0.0362$ (exact certificate). Half the odd sum is now about $61$ percent of the assembled bound at the endpoint, the receiver cubic about $7$ percent.

Claim grade: derived for Lemma R.1, Theorem R.3 and Proposition R.4 by the hand arguments below; Lemma R.2 is an interval enclosure by a session instrument (conditional on the interval library's outward rounding, as all earlier lattice sums are), and the barrier numbers are exact rational arithmetic on declared values after known cases. Nothing is measured on solutions. Falsifiers are listed in Section 6.

The scenario is that of the band-envelope note: the unchanged Master Equation at $g=16$, unit spacing, $c_f=1$, every member dynamical, every causal root and tail retained, the original eight-source block summation, the contour of radius $1/10$, the accepted seed class, and the complete-past family $u^\varepsilon=\varepsilon\phi+v^\varepsilon$, $0<\varepsilon\le0.00646$, with its unique charted continuation. The receiver term concerns only absolutely convergent remainders; the resting rows and the receiver-linear rows keep their eight-source block cancellation.

## 1. The receiver term

Write $G(x)=x/\lvert x\rvert^3=-\nabla(1/\lvert x\rvert)$, $\sigma_d=(-1)^{d_1+d_2+d_3}$ and $r=\lvert d\rvert$. In the preparation note's reduction the field of the resting lattice at a member displaced by $\alpha$ is
$$
E(\alpha)=\sum_{d\ne0}\sigma_d\,f_d(\alpha),\qquad f_d(\alpha)=G(d+\alpha)-G(d)-\partial G(d)\,\alpha ,
$$
an absolutely convergent sum: the resting rows and the receiver-linear rows, which converge only as eight-source block sums, have already been removed by their block cancellations. The quantification note's Lemma Q2 bounds $E$ by $4Z_5(1-\rho)^{-5}\lvert\alpha\rvert^3$, summing the absolute values of each source's third-order Taylor remainder. That estimate is what the summed signed note calls $c_{E3}$; on the chart $1/16$ it is $57.346$.

**Lemma R.1 (derived).** Let $0<\rho\le1/16$ and $\lvert\alpha\rvert\le\rho$. Put
$$
H_{1111}=\sum_{d\ne0}\sigma_d\,\partial_1^4\frac1r\Big|_{x=d}=\sum_{d\ne0}\sigma_d\,\frac{3\,(35d_1^4-30d_1^2r^2+3r^4)}{r^9}.
$$
Then
$$
E(\alpha)=\frac{H_{1111}}{12}\bigl(3\lvert\alpha\rvert^2\alpha-5\,\alpha^{\circ3}\bigr)+R(\alpha),\qquad\lvert R(\alpha)\rvert\le\frac{6Z_7}{(1-\rho)^7}\lvert\alpha\rvert^5,
$$
where $(\alpha^{\circ3})_i=\alpha_i^3$. Moreover $\lvert3\lvert\alpha\rvert^2\alpha-5\alpha^{\circ3}\rvert\le2\lvert\alpha\rvert^3$, so
$$
\lvert E(\alpha)\rvert\le\frac{\lvert H_{1111}\rvert}6\lvert\alpha\rvert^3+\frac{6Z_7}{(1-\rho)^7}\lvert\alpha\rvert^5 .
$$

*Proof.* *Taylor expansion.* For each $d$, Taylor's formula to order four with integral remainder gives $f_d(\alpha)=\sum_{n=2}^4\frac1{n!}\partial^nG(d)[\alpha^n]+R_{5,d}(\alpha)$, with $\lvert R_{5,d}\rvert\le\frac1{5!}\sup_{0\le\theta\le1}\lVert\partial^5G(d+\theta\alpha)\rVert\,\lvert\alpha\rvert^5$. The component of $\partial^5G[h^5]$ along a unit vector $e$ is $-\partial^6(1/\lvert x\rvert)[e,h,h,h,h,h]$; the norm of a symmetric form on a Euclidean space is attained on a repeated vector, where $\partial^6(1/\lvert x\rvert)$ equals $720\,P_6(\cos)/\lvert x\rvert^7$ with $\lvert P_6\rvert\le1$. So $\lVert\partial^5G(x)\rVert\le720/\lvert x\rvert^7$, and on the segment $\lvert d+\theta\alpha\rvert\ge r-\rho\ge(1-\rho)r$ because $r\ge1$. Hence $\lvert R_{5,d}\rvert\le6\lvert\alpha\rvert^5/((1-\rho)r)^7$, which sums over $d$ to the stated bound on $R$.

*Even orders vanish.* $G$ is odd, so $\partial^nG$ is odd in $d$ for even $n$, while $\sigma_{-d}=\sigma_d$. The series $\sum_d\sigma_d\partial^nG(d)[\alpha^n]$ converge absolutely, since $\lVert\partial^nG(d)\rVert\le(n+1)!/r^{n+2}$ and $\sum r^{-4}<\infty$; pairing $d$ with $-d$ shows that the sums for $n=2$ and $n=4$ are zero. Therefore $E(\alpha)=\frac16\sum_d\sigma_d\partial^3G(d)[\alpha^3]+R(\alpha)$ with $R=\sum_d\sigma_dR_{5,d}$.

*The cubic tensor.* The $i$-th component of $\partial^3G(d)[\alpha^3]$ is $-\partial_i\partial_j\partial_k\partial_l(1/r)(d)\,\alpha_j\alpha_k\alpha_l$ (summation over repeated indices). Put $H_{ijkl}=\sum_d\sigma_d\,\partial_i\partial_j\partial_k\partial_l(1/r)(d)$, absolutely convergent because $\lVert\partial^4(1/r)\rVert\le24/r^5$. It is fully symmetric. It is invariant under the $48$ signed permutations of the coordinates, because these preserve the lattice, the polarity sign $\sigma_d$ and the summation of an absolutely convergent series, and $\partial^4(1/r)$ transforms as a tensor. A component with an index occurring an odd number of times changes sign under the reflection of that coordinate, so it vanishes; the remaining components are $H_{iiii}=h$ for every $i$ and $H_{iijj}=h'$ for every $i\ne j$, with their permutations. Since $1/r$ is harmonic away from the origin, $\sum_kH_{ijkk}=0$; with $i=j=1$ this gives $h+2h'=0$. Hence, for every $\alpha$,
$$
H_{ijkl}\alpha_j\alpha_k\alpha_l=h\,\alpha_i^3+3h'\alpha_i\sum_{j\ne i}\alpha_j^2=\frac h2\bigl(5\alpha_i^3-3\lvert\alpha\rvert^2\alpha_i\bigr),
$$
and the cubic part is $-\frac16H[\alpha^3]=\frac h{12}(3\lvert\alpha\rvert^2\alpha-5\alpha^{\circ3})$ with $h=H_{1111}$. The second form of $H_{1111}$ is the expansion $\partial_1^4(1/r)=3(35x_1^4-30x_1^2r^2+3r^4)/r^9$.

*The size of the cubic form.* With $x_i=\alpha_i^2/\lvert\alpha\rvert^2$, $\sum_ix_i=1$, $s_2=\sum_ix_i^2$ and $s_3=\sum_ix_i^3\le s_2^{3/2}$,
$$
\frac{\lvert3\lvert\alpha\rvert^2\alpha-5\alpha^{\circ3}\rvert^2}{\lvert\alpha\rvert^6}=\sum_ix_i(3-5x_i)^2=9-30s_2+25s_3\le9-30u^2+25u^3,\qquad u=s_2^{1/2}\in[3^{-1/2},1].
$$
The last function has derivative $15u(5u-4)$, so on that interval its maximum is at an endpoint: $4$ at $u=1$ and $25/(3\sqrt3)-1<3.82$ at $u=3^{-1/2}$. So the form is at most $2\lvert\alpha\rvert^3$, with equality on the axes. $\blacksquare$

*Mechanism.* Each source's cubic contribution is of size up to $24/r^5$ times $\lvert\alpha\rvert^3$, and the absolute estimate adds them. The signed sum is dominated by the six nearest neighbours: the nearest shell alone gives $H_{1111}=-84$ exactly (two axial neighbours contribute $24$ each and four transverse ones $9$ each, all with $\sigma=-1$). The next two shells contribute about $-7.42$ ($r^2=2$, like polarity) and $+4.79$ ($r^2=3$, unlike polarity), about $8.8$ and $5.7$ percent of $84$, and partly cancel; all shells beyond the nearest together change $-84$ by about $2.2$ percent.

**Lemma R.2 (constants; interval enclosure).** Over the cube of half-width $40$, grouped by $(d_1^2,r^2)$ and enclosed with `mpmath.iv` at $50$ digits, $H_{1111}$ lies in $[-85.88598,-85.88597]$ to the displayed digits. The sites outside the cube have largest coordinate $m\ge41$, number at most $26m^2$ per value of $m$, and each contributes at most $24/m^5$ in absolute value, so they change $H_{1111}$ by at most $624\sum_{m>40}m^{-3}\le312/40^2=0.195$. Hence $-86.0810\le H_{1111}\le-85.6909$. Likewise $Z_7\le7.46706$, with the tail $\sum_{m>40}(24m^2+2)m^{-7}\le24/(4\cdot40^4)+2/(6\cdot40^6)$ added. On the chart $\rho=1/16$:
$$
c_3:=\frac{\lvert H_{1111}\rvert}6\le14.3469,\qquad c_5:=\frac{6Z_7}{(15/16)^7}\le70.389,\qquad c_3+c_5\rho^2\le14.622 .
$$

Where Theorem L.4 of the summed signed note is applied, $d+2y\le\rho$, so the receiver factor $A=d+y$ satisfies $A\le\rho$, and the receiver displacement is at most $XA$ with $X=e^{aT}\le1$. Lemma R.1 then gives $\lvert E\rvert\le c_3X^3A^3+c_5X^5A^5\le X^2(c_3+c_5\rho^2)A^3$. So Theorem L.4, and its band version in the band-envelope note, hold with $c_{E3}$ replaced by $c_{E3}^{\rm s}:=14.622$ on the chart $1/16$. Write $F^{\rm s}$ for that polynomial, with $\tilde\mu=0.92274$; it has the same nonnegative coefficients as $F^{\tilde\mu}_{\rm sgn}$ except the smaller receiver coefficient.

## 2. A further barrier

**Theorem R.3 (derived, relying on the accepted notes and the band-envelope note).** On the chart $\rho=1/16$ let $\hat d=0.033$, $\hat K=12.5$, $\hat y=\hat K\hat d^2=0.0136125$ and $d_0=0.0006351$. In exact arithmetic on the declared values:

- (a) $\hat d+2\hat y=0.060225\le\rho$;
- (b) $C_LF^{\rm s}(\hat d,\hat y)\le0.0134328<\hat y$;
- (c) $C_LF^{\rm s}(d_0,31.9d_0^2)<31.9d_0^2$ and $d_0+2\times31.9d_0^2\le\rho$.

Consequently, for every $0<\varepsilon\le0.00646$ and with $\hat T(\varepsilon)=\ln(\hat d/(\tilde\Lambda\varepsilon))/\overline\lambda$, $\tilde\Lambda=0.0983$, $\overline\lambda=2.8033$:

1. the unique charted continuation of $u^\varepsilon$ exists on $(-\infty,\hat T(\varepsilon)]$, the same solution with the same complete past;
2. for $0\le T\le\hat T$, $\lvert u_j(T)-\varepsilon\phi_j(T)\rvert\le y(T)<12.5\,\tilde\Delta(T)^2$, with the first two derivatives of the difference below $2a$ and $(2a)^2$ times that;
3. on $(-\infty,\hat T]$: displacements are at most $0.046613$, speeds at most $0.16233$, accelerations at most $0.63530$, transmitter factors at least $0.83767$, separations at least $0.906775$, and each delay is within $0.093225$ of the anchor distance; each ordered pair of distinct members has exactly one causal root at every reception time, and no member has a root on its own path;
4. finite spatially weighted size for every weight exponent up to $\hat T$ (qualitative);
5. $\hat T(\varepsilon)-\tilde T(\varepsilon)=\ln(0.033/0.0305)/\overline\lambda\ge0.0281$, and $\hat T(\varepsilon)\ge T_N(\varepsilon)+0.1576$, with the difference from $T_N$ increasing in $\ln(1/\varepsilon)$.

The pairs $(0.020,5.5)$, $(0.025,7)$ and $(0.030,9.5)$ satisfy (a)–(c) as well, with $C_LF^{\rm s}$ at most $0.0020516$, $0.0042348$ and $0.0084413$ against $0.0022$, $0.004375$ and $0.00855$; so $y(T)<K\tilde\Delta(T)^2$ with these coefficients while $\tilde\Delta(T)$ is at most the corresponding seed size.

*Proof.* The proof of Theorem B.5 of the band-envelope note applies word for word with $F^{\rm s}$ in place of $F^{\tilde\mu}_{\rm sgn}$: the inequality $y(t)\le C_LF^{\rm s}(\tilde\Delta(t),y(t))$ holds at every $t\ge0$ with $\tilde\Delta(t)+2y(t)\le\rho$, by Lemma E.1, Lemma B.2, Corollary B.3 and the version of Theorem L.4 just stated; the scaling step uses only nonnegativity of the coefficients, which the instrument verifies; the start at $t=0$ uses $y(0)\le31.9\tilde\Delta(0)^2$, concavity and (b), (c); and the first-crossing argument with the forward note's maximal continuation gives existence and the bound. The items follow from $\hat d+\hat y=0.0466125$, $\bar a(\hat d+2\hat y)=0.16232444\ldots$, $\bar a^2(\hat d+4\hat y)=0.63529\ldots$ and the chart facts with radius $\hat d+\hat y$. For item 5, both times use the same rate $\overline\lambda$, so their difference is $\ln(\hat d/\tilde d)/\overline\lambda=0.02810\ldots$; the difference from $T_N$ is that of Theorem B.5 plus this constant. $\blacksquare$

## 3. Central growth

**Proposition R.4 (derived).** For $0<\varepsilon\le0.00646$ and $0\le T\le\hat T$ with $\tilde\Delta(T)\le d$, where $(d,K)$ is one of the pairs of Theorem R.3, $\lvert u_0(T)\rvert\ge\varepsilon p_0e^{\underline\lambda T}-K\tilde\Delta(T)^2$ with $p_0=0.0763$, $\underline\lambda=2.7872$. At $\hat T$ this lower bound is increasing in $\varepsilon$ and positive for every $10^{-37}\le\varepsilon\le0.00646$ (it is at least $0.002189$ at $10^{-37}$). At time zero $\sup_j\lvert u_j(0)\rvert\le\varepsilon\bar P+5.5(\tilde\Lambda\varepsilon)^2$, $\bar P=0.09085$.

*Proof.* As Proposition B.7 of the band-envelope note, with the coefficients of Theorem R.3; the time-zero bound uses the smallest ladder coefficient, whose start argument gives $y(0)<5.5\tilde\Delta(0)^2$. $\blacksquare$

| $\varepsilon$ | $\hat T\ge$ | linear term $\ge$ | $\lvert u_0(\hat T)\rvert\ge$ | $\sup_j\lvert u_j(0)\rvert\le$ | growth factor $\ge$ |
| ---: | ---: | ---: | ---: | ---: | ---: |
| $0.00646$ | $1.4092$ | $0.025039$ | $0.011427$ | $5.892\times10^{-4}$ | $19.3$ |
| $10^{-3}$ | $2.0747$ | $0.024772$ | $0.011160$ | $9.091\times10^{-5}$ | $122$ |
| $10^{-4}$ | $2.8961$ | $0.024447$ | $0.010835$ | $9.086\times10^{-6}$ | $1192$ |
| $10^{-6}$ | $4.5389$ | $0.023809$ | $0.010196$ | $9.086\times10^{-8}$ | $1.12\times10^5$ |
| $10^{-8}$ | $6.1817$ | $0.023187$ | $0.009575$ | $9.086\times10^{-10}$ | $1.05\times10^7$ |
| $10^{-12}$ | $9.4672$ | $0.021993$ | $0.008380$ | $9.086\times10^{-14}$ | $9.22\times10^{10}$ |

At the ladder point $\tilde\Delta=0.025$ (coefficient $7$) the central lower bound is at least $0.014422$, $0.014175$ and $0.013691$ for $\varepsilon=10^{-3}$, $10^{-4}$ and $10^{-6}$. The same limitation as in the band-envelope note remains: relative to the seed-size bound the central lower bound carries a factor proportional to $\varepsilon^{0.00574}$, so no growth uniform as $\varepsilon\to0$ is established.

## 4. Where this estimate stops

At the declared endpoint the three parts of $C_LF^{\rm s}$ are about $0.008198$ for half the odd sum, $0.004304$ for the source-difference brackets and $0.000930$ for the receiver cubic. The chart condition leaves slack $0.002275$. The concave-maximum certificate of Proposition B.8 of the band-envelope note, applied to $F^{\rm s}$ on the chart $1/16$, gives $\max_{y\ge0}[y-C_LF^{\rm s}(d,y)]\le-1.37\times10^{-4}<0$ at $d=0.0362$, and hence, by monotonicity in $d$, at every $d\ge0.0362$: no coefficient gives a barrier there. At $d=0.0361$ the certificate's upper bound is positive ($6.1\times10^{-6}$), which proves nothing either way.

The declared seed size $0.033$ is a passing choice, not the largest one the chart allows: for example, $d=0.0331$ with the same $K=12.5$ gives $d+2Kd^2=0.06049025<1/16$ and $C_LF^{\rm s}(0.0331,0.013695125)<0.013695125$ (the independent review's witness). The largest chart-constrained seed size on the chart $1/16$ is not established here; it lies below $0.0362$, where the fixed polynomial admits no barrier, so the time that the declared endpoint leaves unused on this chart is less than $\ln(0.0362/0.033)/2.8033<0.034$. This note does not decide what a chart above $1/16$ could reach: the comparison of Proposition B.8, case 2, which bounds every chart $\rho\ge1/16$ by lower-rounded chart-$1/16$ constants, is not carried out for the signed receiver constant here. The dominant obstacle to anything larger is the summed odd remainder of the pure-seed rows, which every version of the estimate bounds source by source in absolute value.

## 5. Instrument, evidence and the reference boundary

[`receiver_cubic.py`](../evidence/saturday-lattice-growth-2026-10-20/receiver_cubic.py), described in the [evidence README](../evidence/saturday-lattice-growth-2026-10-20/README.md), imports the band-envelope instrument `band_barrier.py` unchanged (frozen after its third run), and through it the frozen instruments of the accepted notes. It encloses $H_{1111}$, $Z_7$, and as known cases $Z_4$ and $Z_5$, over the cube of half-width $40$ with analytic tails, and replaces only the receiver coefficient of the imported parameter dictionary.

Known cases, run before any target: the lattice census against the classical numbers of representations of $n=1,\dots,12$ as sums of three squares and the total count; the enclosure of $Z_4$ against the literature value $16.5323$; the enclosure of $Z_5$ below the accepted $10.3824$; the nearest-shell value $-84$ of $H_{1111}$ by hand; a floating check, on a symmetric cube of half-width $10$ and five random unit vectors, that the direct sum $\frac16\sum\sigma_d\partial^3G(d)[\alpha^3]$ equals the reduced form $\frac{H}{12}(3\alpha-5\alpha^{\circ3})$ to a relative difference of about $6.1\times10^{-15}$; and a sample of $20000$ unit vectors on which $\lvert3\alpha-5\alpha^{\circ3}\rvert$ stays below $2$. The last two are floating samples: the first tests the symmetry reduction on a finite symmetric cube, the second the norm bound, and neither replaces the proof.

What the instrument establishes: interval enclosures of the two lattice sums, given the interval library's outward rounding, and exact evaluation of the barrier conditions, certificates and tables from declared values. It does not establish Lemma R.1, which is a hand derivation. Nothing is computed on a history.

## 6. Falsifiers

- Lemma R.1: a displacement $\lvert\alpha\rvert\le1/16$ at which $\lvert E(\alpha)-\frac{H_{1111}}{12}(3\lvert\alpha\rvert^2\alpha-5\alpha^{\circ3})\rvert>6Z_7(15/16)^{-7}\lvert\alpha\rvert^5$; a nonzero component $H_{iijk}$ with distinct $j,k$ or a violation of $H_{1111}+2H_{1122}=0$; a unit vector with $\lvert3\alpha-5\alpha^{\circ3}\rvert>2$.
- Lemma R.2: a correct enclosure placing $H_{1111}$ outside $[-86.0810,-85.6909]$ or $Z_7$ above $7.46706$; an error in the tail counts.
- Theorem R.3: an exact evaluation in which (a), (b) or (c) fails with the declared constants; a seed of the class and an amplitude whose complete-past solution, with its unique charted continuation, ceases to exist before $\hat T$, violates a bound of items 2 or 3, or has two roots for one ordered pair or a root on its own path. A finite-onset run from the seed alone does not test this.
- Proposition R.4: an exact evaluation contradicting a table entry.
- Section 4: a $y\ge0$ with $y>C_LF^{\rm s}(0.0362,y)$ on the chart $1/16$.

## 7. Limits

The statements inherit every limit of the band-envelope note: the complete-past solution and its unique charted continuation, the declared seed class and contour, $0<\varepsilon\le0.00646$, interval-library conditionality of the lattice sums and contour constants, qualitative spatial decay, a central lower bound that is not uniform as $\varepsilon\to0$, and no statement about order-one displacement, the ending of regular evolution or arrival at wake speed. The declared pair is a passing choice, not an optimum; the certificate bounds this estimate, not the solution.
