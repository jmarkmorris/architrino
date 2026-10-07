# Independent review of the wake-speed crossing obstruction

## Verdict and precise hypotheses

**Derived and independently accepted:** the [frozen wake-speed crossing subject](overnight2-b-wake-speed-crossing.md) proves that an exact canonical history in its stated regular domain cannot have strict speeds below and above one on the same connected reception-time interval. Its nine-parameter periodic-family exclusion follows from the stated endpoint speed estimates. No numerical target or mathematical repair is required.

The proof requires finitely many complete $C^2$ paths, pairwise distinct simultaneous positions, inclusion of all ordinary positive-delay self and partner roots, positive self polarity, the absolute source divisor, positive kernel coefficient $K$, and a finite canonical root sum equal to the prescribed acceleration at every reception in the interval. The wake speed is normalized to one. The coefficient-box application uses $K=1$ too.

The past bound must supply a locally uniform finite upper bound on causal delays near every reception, with $C^2$ regularity on the corresponding compact lookback interval. Bounded complete past positions supply this: a bound for all earlier times combines with continuity on a short future interval, and there are only finitely many paths. A collection of pointwise finite delay cutoffs with no local uniform control would not support the compact-complement argument. The subject explicitly permits the equivalent locally uniform delay-bound hypothesis, and its bounded Fourier family meets the stronger bounded-position version.

The finite canonical sum has its ordinary mathematical meaning, with every indicated root included. No regularized subtraction of a divergent self series or nonordinary-event prescription is part of the statement. The result allows a history to remain entirely above one, or entirely below one, and does not by itself exclude touching one. It supplies no continuation rule through a collision, nonordinary root or divergent sum.

## Recent self contributions have a common positive projection

Fix member $i$ and a reception $t_0$ with $|\dot X_i(t_0)|=1$. Put $e=\dot X_i(t_0)$, a fixed unit vector. Continuity gives a sufficiently small open time neighborhood of $t_0$ on which
$$
e\cdot\dot X_i(s)\ge\frac12.
$$
After shrinking the reception neighborhood and choosing a recent-delay bound $\delta>0$, this holds on every segment $[t-d,t]$ with $t$ in the reception neighborhood and $0<d\le\delta$. Consequently
$$
Q(t,d)=X_i(t)-X_i(t-d)=\int_{t-d}^t\dot X_i(s)\,ds,
\qquad e\cdot Q(t,d)\ge d/2.
$$
Let $V$ bound source speed on that compact local time window. At any self causal root $|Q|=d$ the unit direction is $n=Q/d$, and the canonical source divisor obeys
$$
D(t,d)=1-n\cdot\dot X_i(t-d),\qquad 0<|D(t,d)|\le1+V.
$$
The strict lower inequality is ordinariness; no uniform lower divisor bound is needed for recent roots. The [live canonical law](../../../../../content/markdown/aaa/dynamics/master-equation.md) uses a positive self polarity and an absolute divisor, so
$$
a_{\mathrm{self},d}=K\frac{Q}{d^3|D|},\qquad
\boxed{e\cdot a_{\mathrm{self},d}\ge\frac{K}{2(1+V)d^2}>0.}
$$
The source velocity, rather than receiver velocity, occurs in $D$. A negative signed divisor does not reverse the acceleration weight. Every sufficiently recent self contribution therefore has a positive component along the same fixed $e$. Their transverse components may differ, but their diverging $e$ components cannot cancel one another. A small divisor only strengthens the lower bound.

This estimate follows from the canonical row and continuity. It does not assume a field-speed ceiling, an energy principle, or a finite root count in advance.

## Recent partner exclusion and finite nonrecent roots at a fixed reception

Collision freedom and finiteness of the member set give a positive minimum simultaneous partner separation at $t_0$. Continuity preserves a positive lower bound for nearby receptions. Source velocities on a compact recent time window are uniformly bounded. The triangle inequality then makes every partner distance-minus-delay gap positive for sufficiently small positive delays, uniformly near $t_0$. Thus only self roots can occur in the recent interval used above. A global separation floor is unnecessary; this local floor suffices.

The locally uniform remote cutoff confines all other roots to a compact delay interval away from zero. For each source use the squared gap
$$
G_j(t,d)=|X_i(t)-X_j(t-d)|^2-d^2.
$$
It is continuously differentiable jointly in reception and delay. At a positive root,
$$
\partial_dG_j=2Q_j\cdot\dot X_j(t-d)-2d=-2dD_j.
$$
Ordinariness makes this derivative nonzero, hence every positive root is isolated in delay. The root set on a closed compact delay interval is closed. If it were infinite, it would have an accumulation point in that interval; continuity would make that point another root, contradicting its isolation. There are therefore finitely many nonrecent roots at $t_0$, over all finitely many sources, and their individual canonical contributions are finite.

Suppose self roots at $t_0$ approached zero. An infinite subsequence $d_n\downarrow0$ would have projected contributions at least $K/[2(1+V)d_n^2]$. These terms do not even tend to zero, and the sufficiently recent projected sum has only positive terms. Adding finitely many nonrecent contributions cannot make it finite. This contradicts the assumed well-defined finite canonical acceleration. Conditional rearrangement cannot rescue the projection: all but finitely many potentially problematic terms are nonnegative in this fixed direction.

It follows that a positive recent-root gap exists at $t_0$. This is a consequence of finite canonical acceleration, not a root truncation imposed on the law. In particular, a unit-speed straight history segment generating a continuum of recent self roots is not an unhandled exception: its positive roots are nonordinary and violate the theorem's domain.

## Uniformity of the nonrecent sum and the exact-acceleration argument

Choose $\eta>0$ strictly inside the root-free gap at $t_0$, small enough for both the projected estimate and partner exclusion. Choose a remote endpoint $d_+$ strictly beyond the locally uniform bound on all roots. There are no roots on these two delay boundaries at $t_0$.

The finite root set in $[\eta,d_+]$ consists of ordinary roots. Around each choose a disjoint compact delay neighborhood with its derivative bounded away from zero. The implicit function theorem continues that root uniquely to nearby receptions. Shrinking the reception neighborhood preserves the positive delay bound, the nonzero divisor and bounded numerator for every continued branch.

The complement of these root neighborhoods inside $[\eta,d_+]$ is compact and has no zero of the gap at $t_0$. The absolute gap therefore has a strictly positive minimum there. Uniform continuity excludes any new root in that complement for sufficiently nearby receptions. No additional root can enter through either chosen delay endpoint after the neighborhood is shrunk. This proves a locally complete finite branch list, rather than merely showing that the original roots continue.

Hence the complete contribution from roots with $d\ge\eta$, including all partners, is locally bounded in norm by a constant $B_{\mathrm{far}}$. For example, a finite branch count, a positive lower delay and a positive lower absolute divisor bound each row norm by $K/(d^2|D|)$. Opposite partner polarities can cancel parts of this bounded sum, but cannot make it unbounded in this neighborhood. Ordinariness and compactness are essential here; pointwise finiteness of the far sum alone would not establish a uniform bound near a positive-delay fold.

The prescribed acceleration $\ddot X_i(t)$ is locally bounded by $B_{\mathrm{kin}}$ because the path is $C^2$. Exact balance yields
$$
\sum_{0<d<\eta}e\cdot a_{\mathrm{self},d}
=e\cdot\ddot X_i(t)-e\cdot A_{\mathrm{far}}(t)
\le B_{\mathrm{kin}}+B_{\mathrm{far}}.
$$
All terms on the left are positive. The same argument excludes an infinite divergent recent-root list at any nearby reception, and every individual term is at most the right-hand bound. Let $C> B_{\mathrm{kin}}+B_{\mathrm{far}}$ be positive, and write $c=K/[2(1+V)]>0$. Every such root would satisfy $c/d^2<C$. Choosing
$$
0<\eta_*<\min\{\eta,\sqrt{c/C}\}
$$
therefore excludes every root with $0<d\le\eta_*$ throughout one common reception neighborhood. Using a strict smaller cutoff avoids any endpoint-equality issue.

This is the needed locally uniform recent-root gap. Its constants may depend on the member, reception and fixed physical scale. The proof does not require a single global gap over an unbounded time interval or over all $R>0$ simultaneously.

## The recent-gap sign is locally constant, including plateaus

Define for $d>0$
$$
F(t,d)=\frac{|X_i(t)-X_i(t-d)|^2}{d^2}-1.
$$
The integral representation gives the jointly continuous extension
$$
F(t,d)=\left|\int_0^1\dot X_i(t-sd)\,ds\right|^2-1,
\qquad F(t,0)=|\dot X_i(t)|^2-1.
$$
This formula directly justifies joint continuity at zero delay. It also prevents an invalid inference from speed at one point to a finite chord without a small-delay estimate.

At a unit-speed reception the preceding argument supplies a common root-free interval $0<d\le\eta_*$ for all nearby receptions. The function $F(t,\eta_*)$ is continuous and nonzero, so its sign is constant on a sufficiently small connected reception neighborhood. For each such $t$, continuity in $d$ and absence of any positive root force the same sign for every $0<d\le\eta_*$. At a reception where speed is strictly above or below one, joint continuity of the extension supplies such a local uniform root-free interval directly, with the sign matching $|\dot X_i(t)|^2-1$.

At every reception define $\sigma(t)\in\{-1,+1\}$ by the sign of $F(t,d)$ for sufficiently small positive $d$. It is well-defined: any two valid recent-root-free intervals overlap near zero, and a continuous nonzero function cannot change sign inside either one. The common-delay argument proves that $\sigma$ is locally constant in reception time at every point, including unit-speed points. For closed or half-open reception intervals this statement uses their relative topology and one-sided neighborhoods at endpoints.

A locally constant map on a connected interval is constant. At every strict-speed reception its sign equals the strict speed side. Hence a strict speed below one and a strict speed above one cannot both occur anywhere in that interval. This global sign argument covers unit-speed plateaus, disconnected closed sets of unit-speed receptions and arbitrarily flat approaches to one; it does not assume a single transverse crossing. At unit speed the limit $F(t,0)=0$ need not determine the sign, but the positive-delay gap does.

This establishes the claimed obstruction on the everywhere-ordinary exact domain. It does not assert existence of the permitted touching cases, nor extend the law through a nonordinary event.

## Exact nine-parameter coefficient-box check

Consider the six-member family
$$
\rho=1+a\cos2\phi+b\sin2\phi,\quad
p=c\cos2\phi+d\sin2\phi,\quad
z=H\cos\phi+e\cos3\phi+f\sin3\phi,
\qquad \phi=\kappa t/R,
$$
with
$$
|a|,|b|,|c|,|d|,|e|,|f|\le\frac1{200},\quad
H\in[3/4,17/20],\quad
\beta\in[4/5,17/20],\quad
\kappa\in[1,11/10].
$$
The physical speed is independent of $R$ and member label:
$$
|V|^2=(\kappa\rho')^2+\rho^2(\beta+\kappa p')^2+(\kappa z')^2.
$$
At phase zero, $\rho=1+a$, $\rho'=2b$, $p'=2d$ and $z'=3f$. Therefore
$$
|V(0)|^2\le\left(\frac{11}{1000}\right)^2+
\left(\frac{201}{200}\frac{861}{1000}\right)^2+
\left(\frac{33}{2000}\right)^2
=\frac{29965839721}{40000000000}<\frac{81}{100}.
$$
The exact numerator difference from $81/100$ at that denominator is
$$
32400000000-29965839721=2434160279>0.
$$
Thus $|V(0)|<9/10<1$ throughout the closed box. The bounds use absolute radial/axial components and a positive upper tangential speed; no phase-average estimate is substituted.

At phase $\pi/2$, $\rho=1-a$, $p'=-2d$ and $z'=-H+3e$. The tangential rate is at least $4/5-11/1000=789/1000>0$. Since $\kappa\ge1$ and $H-3e\ge3/4-3/200=147/200>0$, the axial speed magnitude is at least $147/200$. Ignoring the nonnegative radial squared component gives
$$
|V(\pi/2)|^2\ge
\left(\frac{199}{200}\frac{789}{1000}\right)^2+
\left(\frac{147}{200}\right)^2
=\frac{46261454121}{40000000000}>\frac{23}{20}>1.
$$
The exact numerator difference from $23/20$ at that denominator is
$$
46261454121-46000000000=261454121>0.
$$
These are direct integer comparisons. No numerical instrument, transcendental approximation or sampled parameter point is used.

Uniformly in phase, $99/100\le\rho\le101/100$ and $|z|\le17/20+2/200=43/50$. Thus the complete physical positions are bounded for every fixed $R>0$. Positive radius makes every simultaneous planar partner chord nonzero, so the paths are collision-free. The Fourier profiles are $C^\infty$ and complete, and every member has the two proved strict speed sides. The two reception times $0$ and $\pi R/(2\kappa)$ lie in a connected finite interval at every positive scale.

If any member of this family were exact, finite and ordinary at every reception, the established sign theorem would forbid those two speeds. Therefore the entire closed coefficient box is excluded from exact bounded collision-free everywhere-ordinary canonical histories for all $R>0$. A member may already violate ordinariness at a positive-delay root; that case lies outside the theorem's regular domain and does not supply an alternative accepted evolution rule. No ordinary full-period root census is asserted for the box.

## Verification, falsifiers and preservation

The evidence is the independent analytical reconstruction above, including the positive projection, fixed-reception root finiteness, compact-complement continuation, exact-acceleration bound, locally constant sign argument and exact rational endpoint comparisons. The live canonical source-weight discussion was read to confirm the absolute transmitter divisor and the absence of a receiver acceleration factor. The Moore role is an analytical lens rather than proof authority.

A nearby partner root approaching zero despite local collision freedom would refute the recent-partner argument. A positive-delay root escaping every locally uniform compact lookback would violate the remote hypothesis and defeat that proof step. An infinite ordinary compact root set would contradict isolation; a nonordinary accumulation root is explicitly outside the hypotheses. Recent self contributions with negative projection under the stated positive self polarity and absolute divisor would refute the key estimate. An unbounded far sum near an ordinary compact chart would defeat the continuation argument. A discontinuity of the recent-gap sign despite a common root-free interval would defeat the topological step. An exact finite everywhere-ordinary mixed-speed history satisfying all stated bounds would directly falsify the theorem. Renormalized sums, omitted self roots, signed-divisor weights, collisions or nonordinary-event continuations change its premises.

Native `shasum -a 256` identifies the frozen subject as `359cdf6205f95cc2a1fa9c1077a31ec99f7455c800cfbaa893a380fb12e1f8c0`. Final hashing checks that identity and identifies this new report. Native `git diff --no-index --check /dev/null` checks this report's whitespace; exit one without diagnostics denotes the new-file difference. No numerical companion or runtime evidence was necessary, and the parent's numerical slot remained untouched.

Only this new independent Markdown report was authored. All subjects, earlier proofs, instruments, receipts, parent account, shared owners and corpus files remained read-only. No Git mutation, generator, delegation, sidebar action, new physical premise or root-selection modification was used. Parent integration of the accepted scoped theorem and its coefficient-box consequence is the remaining disposition step. This bounded review is complete.
