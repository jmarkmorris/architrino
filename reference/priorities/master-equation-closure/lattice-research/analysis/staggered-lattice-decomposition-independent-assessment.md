# Independent assessment of the staggered lattice acceleration decomposition

**Accepted within the stated history and summation convention.** The three-term decomposition and the complete polarity allocation enclose the acceleration of the fixed, exact ancient branch at all nine named reception times and at its incoming first wake-speed event. Both complete polarity contributions are positive there. The opposite-polarity contribution is larger, accounting for between $88.66\%$ and $94.57\%$ at the event in the specified common-cube allocation. The exact scalar equation remains a history equation; a current displacement alone does not determine its acceleration. The outgoing own-history singularity is a contradiction to a hypothetical smooth continuation, not a finite jump or an adopted event update.

This assessment reviews the [displacement equation](staggered-lattice-displacement-equation.md) and the [numerical decomposition](staggered-lattice-acceleration-decomposition.md). The prior [first-event theorem](staggered-lattice-first-event.md), its [independent adjudication](staggered-lattice-first-event-independent-adjudication.md), the canonical equation, and every retained trajectory and error certificate remain fixed. No new trajectory was evolved.

**Claim grade:** derived summation and root statements; computer-assisted interval bounds for the fixed accepted branch; separate high-precision point comparisons as numerical corroboration. These evidence roles are distinguished below.

## 1. Population and the two different allocations

The population is the entire alternating cubic lattice, with unit lattice spacing, normalized wake speed $c_f=1$ and coupling $g=16$. Its exact symmetry family is

$$
X_i(t)=i+\sigma_iq(t)e_3,
\qquad \sigma_i=(-1)^{i_1+i_2+i_3}.
$$

The positive sublattice moves upward by $q$, and the negative sublattice downward by $q$. The accepted representative is the nonlinear complete-past solution with leading amplitude $2^{-40}$ and positive characteristic rate $\lambda$. Its exponentially small ancient displacement is nonzero at every finite past time. This is not a perturbation released at a finite time from an exactly stationary history.

Use the analytic subject's offset $d=i-j=(d_1,d_2,m)$, transverse squared distance $p=d_1^2+d_2^2$, and relative parity $\chi_d=(-1)^{d_1+d_2+m}$. At a reception time before or at the first event, the unique cross-source root satisfies

$$
r=t-s=\sqrt{p+[m+q(t)-\chi_dq(s)]^2},
\qquad
n=\frac{m+q(t)-\chi_dq(s)}r,
\qquad
D=1-\chi_dnq'(s)>0.
$$

The positive receiver's scalar acceleration row is $g\chi_dn/(r^2D)$. In the executable subject the offset is reversed, $d=j-i$; replacing $m$ by $-m$ gives exactly the same complete census and sum. The polarity multiplier is already included in its `changed` row and must not be applied a second time.

Subtract the corresponding stationary-source row before splitting by parity:

$$
C_\varepsilon[q](t)
=g\sum_{\chi_d=\varepsilon}\chi_d
\left[
\frac{n}{r^2D}
-\frac{m+q(t)}{[p+(m+q(t))^2]^{3/2}}
\right],
\qquad \varepsilon\in\{+1,-1\}.
$$

The complete equation on the incoming chart is

$$
q''(t)=gS(q(t))+C_+[q](t)+C_-[q](t).
$$

Here $S$ is the original stationary block sum. Each correction is absolutely convergent: its distant rows are bounded by a constant times $|q(s)|r^{-3}+|q'(s)|r^{-2}$, while the emission time tends to $-\infty$ with anchor distance and the accepted ancient history decays exponentially. The parity split of those corrections is therefore unambiguous. Neither correction alone is the complete acceleration from its source polarity.

The complete polarity allocation additionally specifies a common centered cube for the stationary subsets. With those limits denoted by $S_+$ and $S_-$,

$$
A_{\rm same}=gS_+(q)+C_+,
\qquad
A_{\rm opposite}=gS_-(q)+C_-,
\qquad
S_++S_-=S.
$$

This is a valid specified allocation of the original total. It is not a claim that a nonneutral bare sublattice has the same field under every possible source ordering.

## 2. Independent verification of the stationary partition and tails

Every parity subset of a centered cube is invariant under inversion and coordinate permutations. The constant and quadratic terms of $K(d+ue_3)$ cancel by inversion. The linear coefficient is the sum of

$$
DK(d)=\frac{I-3\widehat d\widehat d^{\mathsf T}}{|d|^3}.
$$

Cubic symmetry makes that sum a scalar matrix; its trace is zero term by term, so the sum vanishes. Subtracting these three Taylor terms leaves an absolutely convergent remainder bounded by $C_B|u|^3|d|^{-5}$ on every fixed $|u|\le B<1$. This proves the existence and local uniformity of the separate common-cube limits. The accepted cube/block boundary estimate identifies their mixed sum with the original block field. The argument does not rearrange a bare conditional series arbitrarily.

An independent differentiation of the potential generating function gives

$$
\frac{d_3+u}{|d+ue_3|^3}
=\sum_{k\ge0}(-1)^k(k+1)
P_{k+1}(d_3/|d|)\frac{u^k}{|d|^{k+2}}.
$$

In each complete parity shell, all even powers cancel by inversion and the linear power cancels by the preceding Hessian argument. For $x=B/(N+1)$, the remaining omitted powers satisfy

$$
\sum_{j\ge0}(4+2j)x^{2j}
=\frac4{1-x^2}+\frac{2x^2}{(1-x^2)^2}.
$$

The shell of sup-norm radius $m$ contains $24m^2+2\le26m^2$ points. Consequently

$$
\sum_{|d|_\infty>N}|d|^{-5}
\le26\sum_{m>N}m^{-3}
\le\frac{13}{N^2},
$$

and either parity tail obeys the subject's bound

$$
|S_\varepsilon(u)-S_{\varepsilon,N}(u)|
\le\frac{13|u|^3}{N^2}
\left[\frac4{1-x^2}+\frac{2x^2}{(1-x^2)^2}\right].
$$

The new stationary evaluator retains degrees $3,5,\ldots,13$ in cube $N=32$. Its additional degree-$15$ and higher remainder is valid because

$$
\sum_{d\ne0}|d|^{-17}
\le26\sum_{m\ge1}m^{-15}
\le26\left(1+\frac1{14}\right)<28.
$$

Summing the odd higher powers therefore gives the stated bound $28B^{15}[16/(1-B^2)+2B^2/(1-B^2)^2]$. The interval implementation uses exact integer degrees, outward interval arithmetic for each recurrence and division, and an outward maximum $B$ of the entire receiver displacement interval. The original stationary interval for $S$ is kept separate, and $S_-=S-S_+$ is enclosed conservatively. Its dependence on $S_+$ is not ignored when asserting an exact total; the share bounds use only valid interval consequences of that identity.

## 3. Independent reference and actual-path enclosure audit

The retained pre-subject derivation records the correction formula, parity linearization and own-root coefficient before the new subjects were read. The new reference then passed analytically known controls before its target use: exact rational Bernstein reconstruction of a known quintic, zero-source cancellation, a uniform collinear source with root $s=-5/4$ and kernel $4/5$, literal cube-one count $26$, the six-neighbor cubic coefficient $14$, and the exact quadratic own-root calculation.

The comparison-path reference enumerates raw integer offsets independently of the subject's saved grouping. It reconstructs the comparison polynomial from exact binary endpoint jets in Bernstein form, evaluates by de Casteljau, solves the causal equation at $65$ decimal digits, and sums the unsimplified signed kernel differences. Its stationary field uses a separate high-precision Gaussian/Poisson evaluation. All nine independent point values fall within the subject's comparison intervals, as recorded by the exact receipt assertions in `reconcile-target.json`. The separate reference's arithmetic is a high-precision numerical check, not outward-rounded evidence of the actual motion.

For example, at $t=1191/128$, the independent comparison values are approximately

$$
gS=2.675427791054329,
\qquad C_+=0.3399855065823534,
\qquad C_-=3.356738907673958.
$$

The complete-sector reference independently sums the physical-space even-parity field directly in cube $32$, without using the subject's Legendre recurrence or polynomial coefficients. Known controls first recover its exact nearest-even cubic coefficient $7/(4\sqrt2)$ and the tail/share formulas. Direct evaluations at $t=0,9,1191/128$ lie inside the corresponding stationary and complete-sector intervals. An exact rational audit verifies every reported cube and polynomial remainder bound and all $22$ sample/cell share calculations, followed by the event-hull calculation.

The stronger actual-path claim comes from the enclosure argument, not from these point agreements. The primary subject forms the receiver intervals $\bar q+[-P,P]$ and $\bar q'+[-V,V]$ using the previously accepted error tables. Its source function does the same at each queried emission interval, taking the next certified endpoint and the cumulative acceleration bound. Negative-time queries retain the ancient-branch error and the exact-versus-binary characteristic-rate error; intervals crossing zero inherit the accepted cumulative bound. The new receipt audit authenticates the complete frozen error record and checks the receiver lookup at every sample and event-cell endpoint.

Root intervals start with the previously certified complete displacement box and contract by intersection with the causal equation. Source speed remains strictly below one, so the transmitter factor is positive and the unique incoming root cannot disappear from the enclosure. The retained finite cube has $24388$ distinct sources, with multiplicity applied once; the absolute omitted-source estimate bounds either polarity subset. Adding that full tail to each separate correction is conservative, while the total receives the full tail only once. The original stationary remainder is evaluated independently of that source tail. These steps justify the actual intervals using the frozen first-event proof and IEEE-754 outward interval operations already assessed there.

The four contiguous event cells of width $1/256$ cover $[1191/128,1193/128]$. Their auxiliary cross-equation intervals enclose the incoming endpoint at the unknown $t_*$, because the actual full equation and that auxiliary equation agree through arrival and the own-root fiber is still empty there. They do not supply actual full-law motion after $t_*$. The earlier nine point rows do not prove nonlinear sign or monotonicity at every time between samples.

## 4. Accepted signs, proportions and their limits

The linear shell calculation is separately verified. Each fixed-distance shell has one parity, and its directional second moment is one third of its cardinality. The source-position Hessian term cancels and the velocity term survives with the same sign in both parities:

$$
DC_\varepsilon[0]h(t)
=\frac{16}{3}\sum_{\chi_d=\varepsilon}
\frac{h'(t-|d|)}{|d|^2}.
$$

Thus the leading growing-mode fractions are

$$
f_+=\frac{16}{3\lambda}\sum_{\chi_d=+1}
\frac{e^{-\lambda|d|}}{|d|^2}
\simeq0.2405948533177663,
\qquad f_-=1-f_+.
$$

The independent raw-offset finite sums agree with the certified fraction intervals. The omitted contribution to either fraction is below $3.264\times10^{-17}$; the exact characteristic equation supplies the identity $f_++f_-=1$. These are leading small-amplitude proportions, not constants of the nonlinear motion.

At all nine named times, the exact-path intervals certify $gS>0$, $C_+>0$, $C_->0$, and $C_-$ larger than either other component. At the incoming event, they certify

$$
0.2971479<C_+<0.4044955,
\qquad
2.8326635<C_-<4.6550152,
\qquad
2.5178409<gS<3.4969309.
$$

Both larger terms exceed $C_+$ there. Their separate ranges do not resolve the order of $C_-$ versus $gS$ at that unknown event time. This limitation does not affect the complete polarity allocation, for which the accepted bounds are

$$
0.4581682<A_{\rm same}<0.6566054,
\qquad
5.1359458<A_{\rm opposite}<7.9642080.
$$

The complete opposite-polarity contribution therefore dominates in the stated common-cube convention. Since $A/(A+B)$ increases with positive $A$ and decreases with positive $B$, its interval bounds follow from the corresponding endpoint fractions. The exact rational replay confirms

$$
0.0543989<\frac{A_{\rm same}}{q''}<0.1133535,
\qquad
0.8866465<\frac{A_{\rm opposite}}{q''}<0.9456011.
$$

The small-amplitude and event fractions differ substantially, but their endpoint comparison alone does not prove monotone change of a fraction between them. All claims concern this exact coherent ancient branch and do not establish the response of a localized perturbation or a typical populated universe.

## 5. Scalar regularity and the outgoing singularity

The scalar equation contains the full earlier history through both the source values and the implicit emission times. It is not a universal relation $q''=A(q)$, even though one monotone branch may be plotted with $q$ as its horizontal coordinate. Differentiating the causal residual $t-s-r$ gives

$$
\frac{ds}{dt}=\frac{1-nq'(t)}D,
\qquad
\delta s=-\frac{n[h(t)-\chi_dh(s)]}D.
$$

The transmitter denominator $D$ is the factor in the canonical acceleration weight. A zero receiver numerator with $D\ne0$ merely makes $ds/dt=0$; it does not multiply the acceleration by zero or make that weight divergent. The apparent poles of a stationary-reference term at an anchor must likewise not be confused with a physical cross-range collapse: only the complete unsplit received row determines that physical boundary.

For an independent own-root control, let $h=t-t_*$ be elapsed reception time and $\delta=t-s$ be delay. Assume hypothetically a $C^3$ continuation with $q'(t_*)=1$ and $\alpha=q''(t_*)>0$. The divided chord equation and its delay derivative give

$$
\delta=2h+O(h^2),
\qquad D=\alpha h+O(h^2),
\qquad
A_{\rm own}=\frac{g}{4\alpha h^3}+O(h^{-2}).
$$

The exact quadratic $q(t_*+u)=q_*+u+\alpha u^2/2$ yields $\delta=2h$ and $D=\alpha h$ identically, verifying the sign and coefficient without a trajectory solver. In terms of delay, the same leading expression is $2g/(\alpha\delta^3)$; substituting delay for elapsed time without this factor change would be incorrect.

At $t_*$ itself, every positive-length incoming own chord is shorter than its elapsed time, so there is no positive-delay own root. Under a proposed smooth extension, compact old-source exclusion and the bounded ancient history localize own roots to the displayed branch. In the accepted uniform outgoing anchor neighborhood $B=1/3$, every distinct-label range is at least $1/3$. Receptions within $1/6$ after the event therefore sample a fixed earlier subunit cross-source prefix. The exponentially small remote correction and regular stationary field keep the complete cross remainder bounded. It cannot cancel the positive $h^{-3}$ contribution, nor can that contribution equal a smooth bounded acceleration.

The conclusion is a contradiction to the hypothetical continuation. It does not predict a realized infinite acceleration. The singularity is not locally integrable and supplies no finite instantaneous impulse. The previously accepted continuous-velocity and direct positive-history-measure exclusions retain their stated regularity, measure and uniform-neighborhood hypotheses; this assessment adopts no alternative outgoing law, cap, reflection or regulator.

## 6. Evidence, preservation and falsifiers

The new independent evidence is retained under `.local-data/master-equation-closure/sublattice-decomposition/independent/`: pre-subject derivation; independent reference source and known-case receipt; nine point receipts; linear-fraction receipt; exact receipt reconciliation; direct-sector reference and exact tail/share audit; presentation controls; source snapshots and `manifest.sha256`. Known-case receipts precede target use. The point and sector target receipts record runtimes below three seconds each; the tool completion records and retained closeout report no owned computation remaining. The prior first-event manifest and the nine frozen evaluator inputs verify unchanged with `shasum -a 256 -c`, with the command outputs retained in this new evidence directory.

The mathematical acceptance would be overturned by a missing polarity or multiplicity factor, a failure of a finite-shell cancellation, a cube/block mismatch, a source root outside its complete enclosure, an error lookup smaller than the accepted prefix error, an inward tail/share bound, or an omitted source contribution. The frozen subjects, independent point/reference receipts and exact rational assertions provide concrete checks for those failure modes. A different offset sign convention is harmless only when transformed consistently.

An arbitrary reordering of a bare sublattice, a claim of nonlinear signs between all earlier samples, a full-law outgoing trajectory inferred from an auxiliary post-event value, or a finite impulse substituted for the nonintegrable own-root term would go beyond this accepted result. The scoped mathematical and numerical review has no remaining blocker.
