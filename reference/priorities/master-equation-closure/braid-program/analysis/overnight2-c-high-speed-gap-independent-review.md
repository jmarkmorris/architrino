# Independent reconstruction of the high-speed small-gap restriction

## Verdict and scope

**Derived verdict:** the [frozen high-speed small-gap proof](overnight2-c-high-speed-small-gap.md) is correct. Any exact distinct-member equal-radius configuration of three neutral antipodal unit-polarity pairs with $11/12\le v<1$, complete circular histories, $K_{\log}=c_f=1$, and the unchanged transmitter factor must satisfy

$$
\frac{d_{\min}}a<4(1-v)^{3/2}.
$$

The use of the previously independently reconstructed constructive separation floor is valid for equal radii. After normalizing $a=1$, its $R=35$ constant $\delta$ therefore gives the necessary strict bound

$$
v<1-\gamma,\qquad
\gamma=\min\left\{\frac1{12},\left(\frac\delta4\right)^{2/3}\right\}>0
$$

for every exact strictly subfield equal-radius configuration. The [separately reviewed wake-speed theorem](overnight2-c-wake-exclusion-independent-review.md) excludes $v=1$. No defect was found. This does not decide the remaining intermediate-speed equal-radius problem, general unequal radii, or stability. No numerical value or computational consequence of $\gamma$ was measured.

## Independent curvature cutoff

For present clockwise separation $\beta$, let $\alpha=H_v^{-1}(\beta)$, $c=\cos(\alpha/2)$, and $D=1-vc>0$. Direct differentiation of $R_v=1/D$ gives

$$
R_v''(\beta)=-\frac{vN_v(c)}{4D^5},\qquad N_v(c)=2vc^2+c-3v.
$$

For $0<v<1$ the quadratic roots are

$$
c_\pm=\frac{-1\pm\sqrt{1+24v^2}}{4v}.
$$

The positive root $c_*=c_+$ lies in $(0,1)$: positivity is immediate, and $c_*<1$ is equivalent, after squaring positive sides, to $8v^2<8v$. The negative root lies below $-1$. If $4v-1\le0$, then $\sqrt{1+24v^2}>4v-1$ trivially; otherwise the difference of squares is $8v^2+8v>0$. This proves $1+\sqrt{1+24v^2}>4v$, hence $c_-<-1$.

Since the quadratic opens upward, $N_v(c)<0$ for every physical $-1<c<c_*$. Put $\alpha_*=2\arccos c_*\in(0,\pi)$ and $b_*=H_v(\alpha_*)>0$. The map $H_v$ strictly increases, while $\cos(\alpha/2)$ strictly decreases on the physical emission interval. Therefore $R_v''(\beta)>0$ for $\beta>b_*$, with equality only at the cutoff inside this chart.

For $P_v(x)=R_v(x)-R_v(x+\pi)$ and $b_*\le x<\pi$, the fundamental theorem of calculus yields

$$
P_v'(x)=R_v'(x)-R_v'(x+\pi)
=-\int_x^{x+\pi}R_v''(y)\,dy<0.
$$

At $x=b_*$ only the first endpoint has zero curvature; the rest of the interval has positive curvature, so the inequality remains strict. This establishes a decreasing domain for $P_v$, not global convexity below wake speed. If $b_*\ge\pi$, every complementary gap is already below $b_*$ and the small-gap alternative needs no order argument. The subsequent quantitative estimate in fact gives $b_*<\pi$ in the stated speed range.

## Conditional order reversal and complete source coverage

Exact configurations must alternate by the independently reconstructed polarity-order theorem. Order the three positive endpoints counterclockwise and write $x_i=\pi-G_i>0$, with $x_1+x_2+x_3=\pi$. The complete five-source enumeration at receiver $i$ has clockwise present angles and signs

$$
\begin{array}{c|ccccc}
\text{source}&\text{previous positive}&\text{its antipode}&\text{next positive}&\text{its antipode}&\text{own antipode}\\
\beta&\pi-x_{i-1}&2\pi-x_{i-1}&\pi+x_i&x_i&\pi\\
q_iq_j&+1&-1&+1&-1&-1.
\end{array}
$$

Thus radial balance is exactly

$$
P_v(\pi-x_{i-1})-P_v(x_i)=C_v,\qquad C_v=R_v(\pi)-2v^2.
$$

Suppose all three $x_i\ge b_*$. Their complementary arguments $\pi-x_i$ are sums of the other two gaps, also in $[b_*,\pi)$. Every comparison therefore occurs in the same strictly decreasing domain of $P_v$. At the three occurring gap values the relation defines a unique successor $f(t)=P_v^{-1}(P_v(\pi-t)-C_v)$, with the inverse restricted to that domain's image. The right side lies in its image at each orbit point because it equals the actual successor's $P_v$ value. Increasing $t$ increases $P_v(\pi-t)$ and thus decreases $f(t)$.

A three-cycle for this finite strictly decreasing successor relation must be constant. For example, $x_1<x_2$ would imply $x_2>x_3$, then $x_3<x_1$, then $x_1>x_2$, a contradiction; the opposite starting order is equally impossible. Equality propagates by the single-valued relation. Hence all gaps equal $\pi/3$. No global inverse range, unmatched branch, or additional causal angle is assumed.

Every source in the table supplies exactly one ordinary partner root by the complete angle theorem. There are fifteen positive-receiver rows, thirty directed rows by antipodal symmetry, and zero positive self roots for $v\le1$. In particular the small complementary gap $x_i$ in the fourth column is an actual simultaneous separation angle between a positive receiver and a distinct negative endpoint; it is not merely a parameter of a reduced equation.

## Reconstructing the high-speed regular-case obstruction

For the regular alternating hexagon let $R_k=R_v(k\pi/3)$. Complete radial summation gives

$$
S:=2aA_r=-R_1+(R_2-R_3)+(R_4-R_5)>-R_1,
$$

using strict decrease of $R_v$ for every $v>0$. The exact trigonometric bounds needed to control $R_1$ follow from $\sqrt2>7/5$, which is the squared rational comparison $2>49/25$:

$$
\sin^2(3\pi/8)=\frac{2+\sqrt2}{4}>\frac{17}{20}>\frac{81}{100},
\qquad
\cos^2(3\pi/8)=\frac{2-\sqrt2}{4}<\frac3{20}<\frac4{25}.
$$

Both trigonometric functions are positive at this angle, so $\sin(3\pi/8)>9/10$ and $\cos(3\pi/8)<2/5$. For $v\ge11/12$, using $\pi<22/7$ gives

$$
H_v(3\pi/4)-\pi/3
=5\pi/12-2v\sin(3\pi/8)
<\frac{55}{42}-\frac{33}{20}
=-\frac{143}{420}<0.
$$

The root for present separation $\pi/3$ therefore has emission angle $\alpha_1>3\pi/4$, so $\cos(\alpha_1/2)<2/5$. Accordingly

$$
R_1<\frac1{1-2v/5}\le\frac53,
\qquad S>-\frac53.
$$

Exact circular balance would require $S=-2v^2\le-121/72$, but $121/72-5/3=1/72>0$. More precisely the dimensionless radial residual obeys $S+2v^2>1/72$. This excludes the regular configuration uniformly for $11/12\le v\le1$ and checks the inequality direction and strictness.

The constant-gap consequence is therefore impossible for an exact configuration in the stated high-speed range. At least one $x_i<b_*$. The actual opposite-polarity endpoints identified in the inventory have chord length $2a\sin(x_i/2)$, giving

$$
\frac{d_{\min}}a\le2\sin(x_i/2)<x_i<b_*.
$$

The strict chord inequality uses $x_i>0$; distinctness excludes its equality endpoint.

## Independent bound on the exceptional angular interval

Set $e=1-v>0$ and $t=1-c_*\in(0,1)$. Substituting $c_*=1-t$ into $N_v(c_*)=0$ gives the exact identity

$$
e=t(1+4v-2vt)\ge t(1+2v).
$$

Since $v\ge11/12$, this yields $t\le6e/17$. Let $\theta=\arccos(1-t)\in(0,\pi/2)$. The concavity chord bound $\sin z\ge2z/\pi$ on $[0,\pi/2]$, applied at $z=\theta/2$, gives $t=2\sin^2(\theta/2)\ge2\theta^2/\pi^2$. As $\alpha_*=2\theta$, and $\pi^2<(22/7)^2=484/49<10$,

$$
\alpha_*^2\le2\pi^2t<\frac{120}{17}e.
$$

The elementary inequality $\sin z\ge z-z^3/6$ on this nonnegative interval then implies

$$
\begin{aligned}
b_*&=\alpha_*-2v\sin(\alpha_*/2)\\
&\le e\alpha_*+\frac{v\alpha_*^3}{24}\\
&\le\alpha_*\left(e+\frac{\alpha_*^2}{24}\right)\\
&<\frac{22}{17}\sqrt{\frac{120}{17}}e^{3/2}<4e^{3/2}.
\end{aligned}
$$

The coefficient $22/17$ is $1+120/(17\cdot24)$, and the last strict comparison follows by squaring positive sides: $22^2\cdot120=58080<16\cdot17^3=78608$. These are exact hand arithmetic checks, not floating estimates. Since $e\le1/12$ and $\sqrt e\le1$, the resulting bound also gives $b_*<4e^{3/2}\le1/3<\pi$, validating the nonempty convexity domain used above. Combining it with the physical chord bound proves the stated small-separation restriction.

## Applicability of the existing separation constant

The live [constructive separation theorem](overnight2-c-explicit-global-separation.md) explicitly assumes minimum radius one, maximum radius at most $R\ge1$, distinct simultaneous positions, common positive angular rate, and strictly subfield speeds. It does not require strict inequalities between the three pair radii. Its proof uses lower bounds on radii and distances, endpoint speed bounds, complete rows, and antipodal geometry; the closest-pair split and its two polarity cases do not require unequal radii. Its prior [independent reconstruction](overnight2-c-explicit-separation-independent-review.md) has the same scope.

Thus, after logarithmic scaling sets the common radius to one, an exact equal-radius configuration satisfies this theorem with $R=35$ simply because its actual maximum radius is one. This use does not import the older strictly ordered radius-ratio theorem into an equal-radius class. It uses the general constructive separation theorem with an allowed loose radius bound. All endpoint speeds are $v<1$, so the strict-subfield hypothesis holds and the result is $d_{\min}\ge\delta>0$.

For $v\ge11/12$, combining the inequalities gives $\delta\le d_{\min}<4(1-v)^{3/2}$ and hence $1-v>(\delta/4)^{2/3}\ge\gamma$. For $v<11/12$, one has $1-v>1/12\ge\gamma$. Equality at $v=11/12$ belongs to the first case, so no endpoint is missed. In both cases $v<1-\gamma$ strictly. The separately established wake-speed exclusion is needed for $v=1$, which is outside this separation theorem's strict-subfield hypothesis.

## Falsifiers and execution record

The conclusion would be overturned by a wrong location or sign of the curvature zero, failure of the decreasing paired response on its stated restricted domain, a nonconstant three-cycle on that domain, an incorrect row-to-gap identification, or a regular high-speed radial residual failing the $1/72$ lower bound. The final speed gap would separately fail if the reused constructive separation theorem required strict radial ordering or otherwise did not cover the normalized equal-radius histories. Its live assumptions and proof were checked specifically for that possible defect.

The subject SHA-256 measured with `shasum -a 256` was `93b589f56fe0438fbbb4500b58ea9ebbfd7a18b958c4ba834e216ed80a48f71d`, matching the frozen identity supplied by the parent. The clock tool returned 2026-10-07 06:36:48 UTC while this final assigned review was in progress. The original launch 03:25:15 UTC, exploration stop 13:55:15 UTC, and hard deadline 15:25:15 UTC remain unchanged.

Only this new review Markdown file was written for this task. No subject, existing review, main report, shared owner, or other agent's file was changed. No numerical grid, Python instrument, background worker, Git mutation, or recursive delegation was used. The hand controls and derivations above are the independent reference. This completes the assigned review queue; parent integration and any later research selection remain separate.
