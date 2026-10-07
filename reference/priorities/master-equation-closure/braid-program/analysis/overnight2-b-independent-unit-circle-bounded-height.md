# Independent review of the bounded-height unit-circle exclusion

## Verdict and domain

**Derived and accepted without repair.** The [frozen subject](overnight2-b-unit-circle-bounded-height.md) excludes every member of its complete bounded-height class from everywhere-ordinary exact canonical balance on an unbounded future, for every $R>0$. The conclusion includes bounded aperiodic heights with uniformly bounded second derivative on that future, not just periodic profiles. The proof separately disposes of nonconstant future height, nonzero constant future height and the flat circle.

The hypotheses remain essential. The histories are

$$
X_j(t)=R x_j(\tau),\qquad
x_j(\tau)=\bigl(\cos(\tau+j\pi/3),\sin(\tau+j\pi/3),(-1)^jz(\tau)\bigr),
\qquad \tau=t/R,
$$

with complete $C^2$ height $z$, bounded over the entire past and future, and $|\ddot z|\le B_2<\infty$ on the exact future $[\tau_0,\infty)$. Dots below denote normalized-time derivatives unless explicitly identified as physical. The selected law is $K=c_f=1$, unit polarity magnitudes, positive self polarity, absolute source divisors, every ordinary positive-delay self and partner root included, and a well-defined finite canonical sum equal to prescribed acceleration. No speed ceiling, extra response factor or singular-event continuation is added.

The proof uses the unchanged [independent unit-planar-speed theorem](overnight2-b-independent-unit-planar-speed.md) and [independent recent-gap theorem](overnight2-b-independent-wake-speed-crossing.md). The Ramon E. Moore role is an analytical lens rather than authority. The following reconstruction verifies that the additional limiting-root and total-acceleration arguments are sufficient; it does not treat growth of an individual row alone as divergence of the complete sum.

## Complete-past cutoff and monotone limit

Set $Z=\sup_{\mathbb R}|z|<\infty$. Every normalized position lies in a ball of radius $\sqrt{1+Z^2}$. A causal root has separation equal to its normalized delay, so all roots satisfy $d\le2\sqrt{1+Z^2}$. Fix one strict exterior bound $d_+>2\sqrt{1+Z^2}$. This bound controls the entire earlier history, not just the future. Simultaneous partner planar separation is at least one, so collision freedom is automatic.

Physical planar speed is exactly one, independently of $R$. If $z$ is nonconstant on the connected exact future, the accepted projection theorem makes it strictly monotone there. Boundedness gives $z(\tau)\to L$ for a finite $L$. Its derivative has one weak sign, and the fundamental theorem of calculus gives a finite absolute integral of $\dot z$ on the future.

The bound on $\ddot z$ makes $\dot z$ uniformly Lipschitz. If $B_2>0$ and $|\dot z(\tau_n)|\ge\epsilon>0$ at arbitrarily late times, then throughout the forward interval of length $\epsilon/(2B_2)$ after each such time its magnitude is at least $\epsilon/2$. A subsequence of these intervals is disjoint, and each contributes at least $\epsilon^2/(4B_2)$ to the absolute integral, a contradiction. If $B_2=0$, the height is affine on the future and boundedness makes it constant, contrary to this case. Therefore

$$
z(\tau)\longrightarrow L,\qquad \dot z(\tau)\longrightarrow0.
$$

For any fixed finite delay window $[0,d_+]$, both convergences are uniform in the source argument $\tau-d$ as reception tends to infinity. This is simply the definition of a tail limit, since $\tau-d\ge\tau-d_+\to\infty$. No convergence of $\ddot z$ is claimed or needed for the limiting partner geometry.

## Independent limiting gap equations

Rotate the plane to receiver zero's reception angle and write $s=(-1)^j$, $\alpha=j\pi/3-d$. Actual normalized separation and delayed source velocity are

$$
Q_j=(1-\cos\alpha,-\sin\alpha,z(\tau)-s z(\tau-d)),
$$

$$
V_j=(-\sin\alpha,\cos\alpha,s\dot z(\tau-d)).
$$

Thus

$$
G_j(\tau,d)=2(1-\cos\alpha)+[z(\tau)-s z(\tau-d)]^2-d^2,
$$

$$
\partial_dG_j=-2\sin\alpha
+2[z(\tau)-s z(\tau-d)]s\dot z(\tau-d)-2d.
$$

These formulas follow by differentiating the delay while holding reception fixed; $\partial_dQ_j$ is the delayed source velocity. Uniform bounded-window convergence gives

$$
G_j\longrightarrow G_j^L=2(1-\cos\alpha)+(1-s)^2L^2-d^2,
\qquad
\partial_dG_j\longrightarrow -2\sin\alpha-2d
$$

uniformly on every fixed compact delay interval, in particular on $[\eta,d_+]$ for $\eta>0$. This explicitly verifies the squared-gap and derivative convergence used for the later complement argument.

## Exactly five ordinary limiting partner roots

For the constant-height limiting geometry, use the unsquared gap $g_j(d)=|Q_j^L(d)|-d$ to prove uniqueness. If $d_2>d_1$, the two source positions have the same constant height and planar chord length $2|\sin((d_2-d_1)/2)|<d_2-d_1$. Triangle inequality yields

$$
|Q_j^L(d_2)|\le|Q_j^L(d_1)|+2|\sin((d_2-d_1)/2)|,
\qquad g_j(d_2)<g_j(d_1).
$$

For a partner, $g_j(0)>0$ by simultaneous planar separation and $g_j(d_+)<0$ by the complete-position bound. Continuity and strict decrease give exactly one positive root for each of the five partners. For self,

$$
g_0(d)=2|\sin(d/2)|-d<0\qquad(d>0),
$$

so there are no positive self roots in the limiting geometry.

Strict decrease alone would not prove a nonzero derivative at the root. Ordinariness is a separate geometric step. At a limiting causal root, $n=Q_j^L/d$ and $V_j=(-\sin\alpha,\cos\alpha,0)$ both have unit norm. Hence $D=1-n\cdot V_j\ge0$. If $D=0$, equality in the unit-vector scalar-product inequality forces $n=V_j$. The receiving planar position would equal the source planar position plus $d$ times its unit tangent. Its squared radius would be $1+d^2$, contradicting the unit receiving radius for $d>0$. Thus every limiting partner root has $D>0$, and its squared-gap derivative is $G_d^L=-2dD<0$.

This establishes a complete ordinary five-root limiting chart for each fixed finite $L$. No common positive divisor bound over every possible $L$ is needed; the later argument concerns the fixed limit of a given hypothetical history.

## Complete late partner bounds, including complements

Choose a fixed $\eta>0$ below one and below all five limiting partner delays. Around each limiting partner root choose a small protected interval, disjoint from $0$ and $d_+$, with strictly negative squared-gap derivative and opposite endpoint squared-gap signs. On the compact complement of that interval in $[\eta,d_+]$, the corresponding limiting squared gap has a positive minimum absolute value. The limiting self squared gap is strictly negative throughout that compact delay interval and has a strictly negative maximum there.

Uniform convergence of $G_j$ and $G_{j,d}$ now preserves the endpoint signs, a negative derivative floor on each protected partner interval, the absence of partner roots on each compact complement, and the absence of self roots on $[\eta,d_+]$. The intermediate-value theorem plus strict derivative sign gives exactly one actual partner root per protected interval at every sufficiently late reception. Its delay has a fixed positive lower bound. Since $D=-G_d/(2d)$ at a root and delays are at most $d_+$, each partner's divisor has a fixed positive lower bound too.

Recent partner roots are uniformly excluded separately. From $\dot z\to0$, choose a late tail with every member's source speed at most two. Simultaneous planar separation is at least one, so for a reception and a source segment wholly in that tail,

$$
|Q_j(\tau,d)|-d\ge1-3d\qquad(j\ne0).
$$

Shrink $\eta$ below $1/6$ if needed and take receptions late enough that their segments of length $\eta$ lie in the tail. Then there are no partner roots for $0<d\le\eta$. The global remote guard excludes $d\ge d_+$. Together with the protected intervals and all compact complements, these arguments prove the complete late list of exactly five partner roots, not just continuation of five selected roots.

Taking the minimum of the five positive delay and divisor floors gives a finite uniform bound on the entire late partner sum, for example $5/(d_{\min}^2D_{\min})$ in norm. Its tangential projection is therefore uniformly bounded as well. Every sufficiently late self root lies below the chosen $\eta$. Because the same compact-convergence argument works for any fixed positive $\eta$, all self roots eventually lie below any prescribed positive delay threshold.

## Self roots and the justified tangential contradiction

Nonconstant height on the exact future supplies a reception with $\dot z\ne0$, hence physical speed squared $1+\dot z^2>1$. The accepted recent-gap theorem gives positive self gap for sufficiently small positive delays at every reception on that connected exact future. The gap is negative at $d_+$. Continuity therefore gives at least one actual positive self root at each such reception.

Combining existence with the complete exclusion away from zero produces receptions $\tau_n\to\infty$ and positive self roots $d_n\to0$. For example, choose successively later receptions after the complement exclusion has put every self root below $1/n$. The conclusion concerns actual causal roots, not roots of the limiting zero-height difference or an unverified numerical enumeration.

The normalized acceleration bound is

$$
|\ddot x_j|=\sqrt{1+\ddot z^2}\le M:=\sqrt{1+B_2^2}.
$$

At a sufficiently late self root its source segment lies wholly in this bounded-acceleration future. The unit chord direction is the average normalized velocity. Comparison to the emission velocity gives

$$
0<|D_n|=|1-n_n\cdot V(\tau_n-d_n)|\le Md_n/2.
$$

The velocities in this formula equal physical velocities; the derivative bound and delay are consistently expressed in normalized time, so no factor of $R$ is missing. The canonical row being bounded is the dimensionless sum before division by $R^2$.

For a self root the relative angle is $-d$, so the receiving-frame tangential separation is exactly $\sin d$. Its unit-direction component is $\sin d/d$. For $0<d<\eta<1$, this is positive and at least $1/2$; for example the elementary bound $\sin d/d\ge1-d^2/6>5/6$ is stronger. Positive self polarity and the absolute divisor then give

$$
a_{t,d_n}=\frac{\sin d_n/d_n}{d_n^2|D_n|}
\ge\frac1{Md_n^3}\longrightarrow+\infty.
$$

Every other self root at these late receptions also has $d<\eta$ and a positive tangential contribution. Let $C$ be the previously proved uniform bound on the complete partner sum. The complete tangential sum satisfies

$$
A_t(\tau_n)\ge\frac1{Md_n^3}-C\longrightarrow+\infty.
$$

This is a justified statement about the total tangential sum: all potentially opposing partner rows were bounded first, all other self rows have the same sign, and the complete root list is retained. It does not rely on an individual row norm alone. Prescribed unit-radius constant-rate planar motion has identically zero tangential acceleration. The normalized exact equation is $R\ddot x=A$, so exactness requires $A_t=0$ for every $R>0$. This contradiction excludes the nonconstant-future case.

## Constant future height and erasure of older-past effects

If $z$ is constant on the exact future, say $z=L$, the older past may still differ. However the complete-past delay cutoff is uniform. At any reception later than $\tau_0+d_+$, every contributing source time lies in the constant future. All root gaps and source velocities are then exactly those of the constant-height limiting geometry, with five ordinary partners and no positive self root. An older source excursion cannot survive this cutoff.

For $L\ne0$, even offsets have zero axial separation. Odd offsets have separation $2L$ and polarity multiplier $-1$, so each contributes

$$
-\frac{2L}{d^3D},\qquad D>0,
$$

to receiver zero's axial acceleration. The three odd contributions have the same nonzero sign opposite to $L$, whereas prescribed axial acceleration is zero. Thus no nonzero constant future height is exact. It remains to check the flat limiting circle $L=0$.

## Independent flat-circle tangential bound

For $L=0$ the limiting argument already proves the complete list: one ordinary root for each $j=1,\ldots,5$, no positive self root, and $D_j>0$. Put $\alpha_j=j\pi/3-d_j$. At each root,

$$
d_j=2|\sin(\alpha_j/2)|,\qquad
D_j=1+\frac{\sin\alpha_j}{d_j},\qquad
a_{t,j}=\frac{-(-1)^j\sin\alpha_j}{d_j^3D_j}.
$$

All roots have $d_j\le2$. The following bounds independently control each of the five rows.

1. For $j=1$, the strictly decreasing gap is negative at $d=\pi/3$ and positive at zero, so $0<\alpha_1<\pi/3$. Since $d_1=2\sin(\alpha_1/2)\le\alpha_1=\pi/3-d_1$, one has $d_1\le\pi/6$ and $\alpha_1\ge\pi/6$. Thus $\sin\alpha_1\ge1/2$ and $D_1\le2$, giving $a_{t,1}\ge54/\pi^3$.

2. For $j=2$, the root lies before $2\pi/3$, so $0<\alpha_2<2\pi/3$. On $0\le x\le\pi/2$, concavity gives $\sin x\ge2x/\pi$. Applying it at $x=\alpha_2/2$ gives $d_2\ge2\alpha_2/\pi$ and therefore $d_2\ge4\pi/[3(\pi+2)]$. Here $x_2:=\sin\alpha_2/d_2=\cos(\alpha_2/2)\in(0,1)$, so the negative row magnitude is $x_2/[d_2^2(1+x_2)]\le1/(2d_2^2)\le9(\pi+2)^2/(32\pi^2)$.

3. For $j=3$, the root lies before $\pi$, hence $0<\alpha_3<\pi$. Its odd-polarity numerator is positive, so its row is positive and may be omitted in a lower bound.

4. For $j=4$, the gap at $d=\pi/3$ is $2-\pi/3>0$, hence $d_4>\pi/3$. Also $d_4\le2$ and $4\pi/3>4>2$, giving $0<\alpha_4<\pi$. The same positive-sine ratio bound as for source two gives a negative row of magnitude at most $1/(2d_4^2)<9/(2\pi^2)$.

5. For $j=5$, $d_5\le2<2\pi/3$, so $\pi<\alpha_5<5\pi/3$ and its row is negative. At $d=\sqrt3$, the angle $5\pi/3-\sqrt3$ lies in $(2\pi/3,4\pi/3)$: the lower comparison uses $\pi>\sqrt3$, and the upper uses $\pi/3<\sqrt3$. Both follow from $3<\pi<22/7$; for the latter, $(22/21)^2=484/441<3$. Its planar chord is therefore strictly larger than $\sqrt3$, so strict gap monotonicity gives $d_5>\sqrt3$. At the root, $y=-\sin\alpha_5/d_5=-\cos(\alpha_5/2)=\sqrt{1-d_5^2/4}<1/2$. Thus $|a_{t,5}|=y/[d_5^2(1-y)]<1/3$.

The source signs, chord branches and positive divisors are now explicit; no root solve is used. Adding the lower bounds gives

$$
A_t\ge\frac{54}{\pi^3}-\frac{9(\pi+2)^2}{32\pi^2}-\frac9{2\pi^2}-\frac13.
$$

Using $\pi<22/7$ gives $54/\pi^3>9261/5324$. Using $\pi>3$ gives $(\pi+2)/\pi<5/3$ and $9/(2\pi^2)<1/2$. Consequently

$$
A_t>\frac{9261}{5324}-\frac{25}{32}-\frac12-\frac13
=\frac{15959}{127776}>\frac1{10},
$$

where the last exact comparison is $159590>127776$. This completes the flat-circle exclusion for every positive scale. The ignored positive source-three contribution can only strengthen the result.

## Falsifiers, qualifications and scoped verification

An exact member satisfying every displayed assumption would directly refute the theorem. Earlier proof failures would include a monotone bounded height with uniformly Lipschitz derivative that does not decay, an additional limiting partner root, a limiting ordinary-divisor failure, an extra late root surviving a certified compact complement, or a late partner sum unbounded despite its proved delay/divisor floors. A late self row with negative tangential projection at delay below one would contradict the explicit circular chord formula. Errors in any of the five flat-circle sign or magnitude bounds would defeat that separate last case.

The theorem relies on complete bounded old history to obtain a uniform remote cutoff, not just future boundedness. Uniform boundedness of the second derivative is an additional assumption, not a consequence of being $C^2$ pointwise. The limiting partner argument uses first-derivative convergence and a separate proof of simple roots; strict monotonicity of the unsquared gap is not used as a substitute for ordinariness. The conclusion is not transferred unchanged to a different planar rate, varying radius, unbounded second derivative, omitted roots or a nonordinary continuation. It gives no actual exact solution, stability spectrum or finite-time event rule.

Scoped verification was analytical after a full read of the frozen subject: derivative decay, the complete limiting root census, compact complements, delayed-source derivative convergence, total tangential contradiction, older-past cutoff and all five flat-circle inequalities were independently reconstructed above. Native `shasum -a 256` identifies the frozen subject as `88861c39bb562b36683e5c4b4954cfdde46d326a030dc05d589f6f555dea68e3`; final hashing confirms that identity and identifies this report. Native `git diff --no-index --check /dev/null` is the scoped new-file whitespace check; exit one without diagnostics denotes the new-file difference. No numerical target, companion or runtime evidence was necessary, and the parent's numerical slot was not used.

Only this new report was authored. Frozen subjects, earlier independent reports and instruments, receipts, the parent account and shared owners remain unchanged by this review. No Git mutation, generator, delegation, other-chat message, evidence deletion or relocation occurred. Local evidence remains retained without an archive-recovery or remote-backup claim. Parent integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md) is the remaining receiving action. This bounded review is complete.
