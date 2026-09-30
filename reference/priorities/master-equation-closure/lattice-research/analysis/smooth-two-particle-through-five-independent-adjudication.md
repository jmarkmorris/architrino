# Independent assessment of the fixed-history continuation through five

**Accepted: complete-population continuation through $t=5$, with both selected architrinos rising and accelerating upward throughout $19/4\le t\le5$. The next upward maximum remains unfound.** This result retains the same supplied complete past, alternating infinite cubic lattice, $g=16$, $c_f=1$, stationary eight-source block prescription and unmodified Master Equation. The original environmental displacement ceiling remains $1/16$. The later numerical candidates near $5.022$ and $5.471$ remain uncertified.

All 1,174 physically affected identities through $5$ are covered within a numerical archive containing 1,350 identities. The infinite stationary complement remains in the exact stationary field. The independent review accepts the new residuals, source and population coverage, earlier-history compatibility, stopped-solution comparison, original-class margins and continuous target signs. This is a finite-interval theorem for the supplied preparation, not typical populated-universe behavior or a completed later excursion.

## 1. A sharper bound for the unchanged infinite stationary field


The infinite stationary contribution is not removed or replaced by a finite lattice. Write its local expansion as $S_0(y)=aT(y)+R(y)$, where the independently accepted coefficient satisfies

$$
14.301634301781185<a<14.327024926809749,
\qquad
T_i(y)=y_i^3-\frac32y_i\sum_{j\ne i}y_j^2.
$$

The following bounds improve an estimate of that same field. They change neither the coefficient nor the summation prescription. Fix a unit lattice direction $n$ and an orthonormal basis $e_1,e_2$ of its perpendicular plane. Set $e_\theta=e_1\cos\theta+e_2\sin\theta$. The solid harmonic of degree $l$ has the representation

$$
H_l(y)=|y|^lP_l\left(\frac{n\cdot y}{|y|}\right)
=\frac1{2\pi}\int_0^{2\pi}(n\cdot y+i e_\theta\cdot y)^l\,d\theta.
$$

This identity follows by expanding the integrand: odd powers of $\cos\theta$ integrate to zero and the average of $\cos^{2k}\theta$ is $\binom{2k}{k}/4^k$. Summing the resulting coefficients gives the generating function $(1-2t(n\cdot y)+t^2|y|^2)^{-1/2}$ that defines the Legendre polynomials. The formula extends to $y=0$ by its polynomial form.

For every real vector $x$,

$$
|n\cdot x+i e_\theta\cdot x|^2
=(n\cdot x)^2+(e_\theta\cdot x)^2\le |x|^2.
$$

Differentiate the finite polynomial inside the integral. The directional first derivative is bounded by $l|y|^{l-1}|x|$. The directional second derivative is bounded by $l(l-1)|y|^{l-2}|x|^2$. The Hessian is real symmetric, so its operator norm is the supremum of the absolute quadratic form over unit real vectors. Consequently,

$$
\|\nabla H_l(y)\|\le l|y|^{l-1},
\qquad
\|D^2H_l(y)\|\le l(l-1)|y|^{l-2}.
$$

Opposite lattice sites cancel odd potential degrees. The constant potential has zero gradient; the degree-two potential term vanishes by the accepted cubic-lattice symmetry, and degree four gives $aT$. The field remainder therefore starts at potential degree six. Using the previously established absolute shell bound $\sum_{n\ne0}|n|^{-7}\le65/2$, the differentiated tail is absolutely and uniformly convergent on $|y|\le B<1$. With $q=B^2$,

$$
\begin{aligned}
\|R(y)\|&\le C_5(B)|y|^5,
& C_5(B)&=\frac{65}{2}\left[\frac6{1-q}+\frac{2q}{(1-q)^2}\right],\\
\|DR(y)\|&\le C_D(B)|y|^4,
& C_D(B)&=\frac{65}{2}\left[\frac{30}{1-q}+\frac{22q}{(1-q)^2}+\frac{4q(1+q)}{(1-q)^3}\right].
\end{aligned}
$$

These are positive geometric-series sums of $(6+2j)$ and $(6+2j)(5+2j)$ respectively, not numerical fits.

The cubic derivative also admits a sharper elementary bound. Its symmetric matrix is

$$
DT(y)=\frac{15}{2}\operatorname{diag}(y_1^2,y_2^2,y_3^2)-\frac32|y|^2I-3yy^{\mathsf T}.
$$

For unit $x,y$, put $d=x\cdot y$ and $u=\sum_i x_i^2y_i^2$. The identity

$$
1+d^2-2u=\sum_{i<j}(x_i y_j+x_j y_i)^2\ge0
$$

gives $u\le(1+d^2)/2$, while Cauchy gives $u\ge d^2/3$. Thus $-2\le x^{\mathsf T}DT(y)x\le3$. Homogeneity proves $\|DT(y)\|\le3|y|^2$. Combining this result with the remainder gives

$$
\|DS_0(y)\|\le\left[3a_++C_D(B)B^2\right]|y|^2,
\qquad a_+=14.327024926809749.
$$

At $B=1/16$, exact rational evaluation with outward decimal conversion gives

$$
C_5<196.020608,
\quad C_D<982.154265,
\quad \|DS_0(y)\|<46.817615|y|^2.
$$

In the acceleration equation the stationary remainder is at most $16C_5|y|^5<0.002991038$ on that whole radius, and the stationary receiver derivative is at most $2.926101$. The older conservative factors $900$ and $188$ remain valid but are unnecessary for this new comparison.

The separate reference at the literal path `.tmp/mec-008-through-five/moore/stationary-sharp.py` was fixed before its use by the new subject. Its known controls compare the solid-harmonic integral coefficients at degrees two, four and six against explicit rational polynomials, verify the quadratic-form identity, and verify the zero-radius constants $195$ and $975$. The controls passed before radius evaluation. The mathematical proof above is the independent reference for the improved rule; agreement between later implementations tests their arithmetic, not an independent proof of that rule. Earlier subjects and references remain unchanged.

### Small-radius consequence for the unchanged earlier target history

The same cubic derivative proof gives $\|T(y)\|\le|y|^3$ by integrating $DT(ty)y$ from $t=0$ to $1$. Hence, on the smaller radius $B=1/500$,

$$
\|S_0(y)\|\le[a_++197B^2]|y|^3<15|y|^3.
$$

A new residual on the unchanged earlier target history may therefore omit the stationary center and add the full stationary acceleration bound $240|y|^3$, provided its continuous vector norm is verified below $1/500$. This is a new enclosure of the original infinite field, not a revised evolution law or a modification of any earlier reference.


## 2. Archive, residual and population coverage

The separate known-controlled reference `.tmp/mec-008-through-five/moore/archive-census.py` authenticates the saved population archive by SHA-256 `b8c445020bbfe88dc3cd13830841050f7d056a81945692df0755e127866ca988`. It contains 1,350 represented identities, including all 1,174 admitted by the original first-front census through $5$. The remaining represented paths are a numerical superset, not additional physically admitted population. All 1,069 incoming source paths preserve all 4,865 incoming nodes bitwise, the 280 newly represented environmental paths have zero incoming prefixes, both targets retain reflection, and the right target is an exact copy of the frozen target-through-five archive on the required prefix. The preceding independently proved shared-node Hermite identities give continuous position, velocity and acceleration at every join.

The independent outward Bernstein instrument bounds the complete represented population's numerical interpolants on $[17/4,5]$ by

$$
\widetilde P<0.059304651518,\qquad
\widetilde V<0.160487753439,\qquad
\widetilde A<0.510067999046.
$$

These are polynomial bounds, before solution errors are added. The contributor's separately controlled per-path bounds agree within their different outward padding. Prefix and local bounds every $1/64$ are retained for the final comparison. Additional $1/256$ norm receipts were prepared as a reserve and were not required for acceptance.

The independent exact selector matches all 71,884 environmental trial edges in the [new full-law population residual](smooth-two-particle-through-five-population-certificate.py), including every selected row index. Its 64 reception cells of width $4/1024$ cover $[19/4,5]$ continuously, with eight complete per-receiver time bins. The residual is below $0.004498696520$; the latest enclosed emission is below $4.061041970<131/32<17/4$. Old supplied pulse rows and the full infinite stationary contribution are retained. The subject uses the independently proved fifth-order factor 197.

The residual formula integrates the first derivative of the defect across each receiver cell. Since the exact Hermite interpolant is $C^2$, its acceleration defect is continuous and piecewise $C^1$, hence absolutely continuous. The hull includes both one-sided jerk values at every crossed knot and every crossed source interval. The earlier independent knot-jump control remains the reference for this formula; a second-order midpoint shortcut across a jerk jump would not be valid.

The [new earlier target residual](smooth-two-particle-through-five-early-target-certificate.py) rechecks the unchanged target history on $[13/4,15/4]$. All 85 selected rows, retained target nodes, 361 incoming source prefixes and exact zero cuts match the independent audit. The full source norm is below $1/2000$, which first gives source time below $15/4-1+1/500+1/2000=1101/400<89/32$. The accepted prefix norm there is below $1/8000$, validating the narrower final root enclosure. The earlier target residual is below $1.090400859\times10^{-6}$ across 2,048 cells and 16 complete bins, with latest source emission below $2.751659560$. It encloses the full stationary field by the small-radius bound $240|y|^3$ proved above. No trajectory was changed.

The independent reconciliation receipts are `residual-reconcile-target.json` and `early-target-reconcile.json` in the literal directory `.tmp/mec-008-through-five/moore/`. The population residual SHA-256 is `43960c378c2a6d738c215054e7c90f9bd0a5e5fa22002cf28075aef0fe38fdfe`; the earlier target residual SHA-256 is `2ca4383e1dab639455e3700fa66429c90009404e8337206d7e0c93e54ebf515c`. The new earlier target subject explicitly checks the safe $1/2000$ coarse source bound after review corrected its inherited, unsupported $1/2500$ bootstrap value. The resulting residual values are unchanged.

For the horizon-wide auxiliary receiver radius $1/16$ and source radius $1/100$, an independent exact census gives 71,368 actual possible generated edges and 72,000 edges in the actual/trial union over the 1,174 physically affected receivers. Including all 1,350 numerical receivers gives conservative counts 71,544 and 72,200. The maximum receiver degrees are 154 actual and 158 in the union. The smaller time-dependent tubes use subsets of these conservative sets. Trial-only source rows remain in the received-error forcing even when the exact physical row is zero.

## 3. A stopped-solution comparison for every receiver

The final [continuation subject](smooth-two-particle-through-five-continuation.md) uses 112 intervals of width $1/64$ from $13/4$ to $5$, covering all 1,350 numerical receivers. The numerical history is unchanged. The accepted common initial errors at $13/4$ apply to the 506 already affected histories; later histories have exact zero initial error. At an earlier residual stage, an omitted receiver is handled by its identical zero actual and numerical prefixes, not by claiming that its numerical acceleration defect vanishes. Both the first-front condition and archived zero cutoff are explicitly checked.

Let $\delta y_i=y_i-\widetilde y_i$ be the vector position error, and let $P_i,V_i$ be nonnegative scalar bounds for its position and velocity norms. On a fixed time bin, the unchanged acceleration equation gives

$$
\|\delta y_i''(t)\|\le L_i\|\delta y_i(t)\|+q_i(t),
$$

where $q_i$ contains the full-law residual and the received position and velocity errors of every source in the actual/trial union. The actual source rows determine the receiver derivative $L_i$. Integrating the vector equation and using the triangle inequality yields

$$
\begin{aligned}
\|\delta y_i(t)\|&\le P_i(a)+(t-a)V_i(a)+\int_a^t(t-u)[L_i\|\delta y_i(u)\|+q_i(u)]\,du,\\
\|\delta y_i'(t)\|&\le V_i(a)+\int_a^t[L_i\|\delta y_i(u)\|+q_i(u)]\,du.
\end{aligned}
$$

Positive Volterra comparison therefore bounds these norms by the scalar majorant satisfying $P_i''=L_iP_i+q_i$. No second derivative of a Euclidean norm at zero is assumed. Positive hyperbolic series, with explicit geometric tails, propagate the majorant on steps of width $1/2048$.

Each source has its own cumulative polynomial norms and propagated errors. A received error is queried at an upward-rounded earlier grid endpoint; every required source prefix has already been certified before the current reception bin begins. Acceleration errors retain the cumulative inherited bound. An error is set to zero only on the intersection of an actual zero prefix and a numerical zero prefix. Exact-rational constants and outward-rounded radical floors enter the coefficient bounds. Grouped positive sums retain an explicit rounding allowance.

### The old pulse support matters to the derivative bound


The supplied pulse is supported on source times $[-11/8,-9/8]$, as is also explicit in the frozen pulse polynomial. On a reception interval $[a,b]$, consider a receiver anchored at $r$, a supplied-pulse center $e$, receiver displacement bound $B_r$ and pulse displacement bound $b_p=1/314928$. Every possible causal range lies between $|r-e|-B_r-b_p$ and $|r-e|+B_r+b_p$. Therefore the pulse row is identically zero throughout this interval if either

$$
|r-e|+B_r+b_p<a+9/8
\quad\hbox{or}\quad
|r-e|-B_r-b_p>b+11/8.
$$

The first inequality excludes an already completed reception; the second excludes one that has not yet begun. When either strict inequality is proved with outward range endpoints, the corresponding old-pulse receiver derivative may be zero in the comparison. Its stationary contribution remains in $S_0$. Every remaining pulse row retains the original derivative bound. For $a\ge13/4$, a pulse emission satisfies range at least $a+9/8\ge35/8>4$, so the derivative's existing range floor four remains conservative. This removes a provably absent contribution from a comparison bound without altering the equation, numerical history or residual.


The old-pulse exclusion above removes an unnecessarily charged derivative from the near receivers. In particular, both old pulse receptions have ended at the worst displacement label $(-1,0,0)$ throughout this new comparison. The final interval retains 192 possible old pulse rows over the entire numerical receiver set; an independent rational admission calculation verifies this count and checks every bin. No source row is deleted from the physical equation merely to improve the estimate.

The final instrument is the frozen `.tmp/mec-008-through-five/hale/pulse.py`, SHA-256 `24207bf6315a97fdf626d9d4abbcaafb3c1218a013adaa8d5734f3d855e16cf8`; its receipt is `pulse.json`, SHA-256 `0ca875b0223f7534121daf6e6e474e2cbdc1784b8e89683fdb8b7923fb81dedb`. Controls for exact forcing integrals, grouped sums, positive propagators, inherited acceleration bounds, joint zero prefixes and old pulse reception precede the target run. The independent reference is the Volterra argument, solid-harmonic bounds and pulse-support exclusion above, supplemented by separately authored archive, census, Bernstein and exact-rational reconciliation instruments. This is not a claim that a second forward trajectory integrator reproduced the solution.

All 112 tubes close strictly. Independent reconciliation of their coordinates, intervals, input hashes, bounds and source domains gives

$$
\boxed{
|y_i|<0.062304432625<1/16,\qquad
|y_i'|<0.177391004262,\qquad
|y_i''|<0.611649868358.}
$$

The remaining margin to the original environmental radius exceeds $0.000195567375$. The smallest strict margin inside an individual auxiliary tube exceeds $1.3658\times10^{-8}$. The largest received source time is below $4.065899209$, and the largest prefix used is $261/64<17/4$. These margins exclude a first departure from the stopped comparison tubes. Along with the complete original-class conditions below, they establish actual continuation of the coupled population through $5$.

Earlier sufficient comparisons that missed the displacement ceiling remain separate diagnostics. Their failures did not show a physical class exit. The accepted comparison refines bounds on the identical supplied-history problem; it introduces no new past or additional evolution.

## 4. Target motion and unfinished excursion

A separate known-controlled Bernstein and exact-rational instrument applies the final per-target population errors to the unchanged target history. It takes the larger error of the two reflected targets. The endpoint error bounds are

$$
(e_P,e_V,e_A)<(0.003140262446,\ 0.017517640791,\ 0.114827530826).
$$

The independently rounded endpoint enclosures are

$$
\begin{aligned}
y_{e_1,3}(5)&\in[0.0348881581352523,\ 0.0411686830263760],\\
\dot y_{e_1,3}(5)&\in[0.1180127268967976,\ 0.1530480084779596],\\
\ddot y_{e_1,3}(5)&\in[0.3819939490069206,\ 0.6116490106570376].
\end{aligned}
$$

The continuous Bernstein bounds, after subtracting the corresponding time-dependent error ceilings, give

$$
\dot y_{e_1,3}(t)>0.0459339318,\qquad
\ddot y_{e_1,3}(t)>0.1925968116
\quad(19/4\le t\le5).
$$

Both targets therefore continue rising and speeding up vertically on this whole new interval. Reflection and uniqueness give their identical vertical motion. The preceding accepted signs combine with this interval to exclude the fifth vertical turn, the requested next maximum, through $5$.

Let $m$ be the preceding minimum, $M$ the preceding maximum, and $z$ the new height. The correlated comparison $(z-m)/(M-m)$ increases with $z$ and $m$ and decreases with $M$ when $z>M>m$. Keeping the shared minimum correlated yields

$$
47283.6691994659<\frac{z-m}{M-m}<69710.9688962221.
$$

This compares the rise accumulated so far with the preceding completed fall. It is not the amplitude of a completed new oscillation. The independent receipts are `final-signs-target.json` and `final-acceleration-target.json` under `.tmp/mec-008-through-five/moore/`; their quadratic and exact signed-interval controls passed before evaluating the target. A separate coarser target-only comparison also closes, but the complete-population errors give the sharper accepted bounds above.

## 5. Preservation of the original history class

The accepted bounds imply every displacement is below $1/16$ and whole-history speed is below $1/2$. Distinct simultaneous positions are separated by more than $7/8$. The causal residual slope is bounded away from zero by $1/2$, giving one simple positive causal root for each distinct-label channel. A root tube of radius $1/256$ has complement gap above $1/512$, exceeding the original $1/1024$ requirement. The normalized own-history gap is above $1/2$, exceeding the original $1/4$ requirement; positive own-history roots are absent.

The coarse source cutoff is $5-7/8=33/8<17/4$. The already accepted source position bound $1/100$ sharpens it to $5-1+1/16+1/100<131/32$. Independently combining the frozen polynomial and source-error bounds at that latter prefix gives

$$
(P_s,V_s,A_s)<(0.004229357,\ 0.015545035,\ 0.049340425).
$$

These fit the convenient values $(1/100,1/32,3/8)$; the acceleration allowance also covers the supplied old pulse. Receiver speed $1/2$, range $7/8$ and source speed $1/32$ bound each changed-row derivative by $3.738978<5$. At most 154 generated rows and two old pulse rows, together with the stationary derivative bound, give

$$
|y_i'''|<16\left(156\cdot5+47\,(1/16)^2(1/2)\right)=12481.46875<65536.
$$

The original displacement, speed, acceleration, jerk, root-complement, density and separation conditions are therefore retained. The independent physical reception census records 2,028 certain and 2,164 possible old channels, with uncertain admissions on squared shells 40 and 41, and 61,428 certain versus 71,368 possible generated channels. These counts concern the 1,174 physically affected receivers and differ from the larger numerical residual selector for the stated reasons.

The final class reference is `.tmp/mec-008-through-five/moore/class-reference.py`. The final comparison reconciliation is `population-reconcile-target.json` in the same directory. Combined with causal receiver uniqueness in the original regular class, the strict stopped-solution margins support actual local existence and uniqueness through the full accepted interval.

## 6. Acceptance boundary and falsifiers

There are no remaining acceptance blockers for this extension through $5$. The next maximum, a completed later upward excursion, the numerical environmental-radius candidate near $5.022$, the later numerical wake-speed candidate near $5.471$, and typical populated-universe behavior remain outside the result. The supplied preparation remains the same specifically prescribed past.

Falsifiers are an invalid stationary derivative theorem, omitted actual or trial source, changed retained history, unsupported zero prefix, uncovered source emission, incomplete residual bin, invalid outward operation, failed first-exit margin or original-class condition, or a nonpositive continuous sign enclosure. The named independent receipts and subjects provide checkable locations for those conditions. Failure of a future sufficient estimate alone would not establish failure of the unmodified Master Equation or the absence of a later maximum.
