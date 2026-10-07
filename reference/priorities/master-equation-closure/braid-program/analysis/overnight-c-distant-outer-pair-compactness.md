# A distant outer pair requires a near-coincidence of the inner pairs

## Mathematical statement

Claim grade: derived, pending independent review. Use the same isolated three neutral antipodal circular pairs, complete histories, fixed logarithmic equation, $K_{\log}=c_f=1$, ordinary-root convention and strict subfield assumption as the [separated-radius necessary condition](overnight-c-separated-radius-necessary-condition.md). Normalize $r_1=1<r_2<r_3$, fix $\phi_1=0$, and write $u=|\omega|$. Let $d$ denote the smallest present separation among the four members of the two inner pairs.

For any constant $M\ge r_2$ with $r_3>M$, define

$$
H_M(s)=\frac{6M^2+8Ms}{(s-M)^2}+\frac{4M^2}{s^2},\qquad s=r_3.
$$

An exact circular solution must obey

$$
2\le\frac{12M^2}{(s-M)d}+H_M(s).
$$

Whenever $H_M(s)<2$, it consequently requires

$$
d\le\frac{12M^2}{(s-M)(2-H_M(s))}.
$$

This estimate excludes distant-outer configurations whose inner members remain farther apart than the displayed bound. It uses the inner four equations of the complete six-member system, with both outer sources retained. It is not a replacement four-member model.

For any hypothetical sequence of exact strictly subfield circular configurations with $r_3\to\infty$, the estimate and the preceding necessary condition imply

$$
r_2\to1,\qquad \operatorname{dist}(\phi_2,\pi\mathbb Z)\to0,
\qquad \limsup r_3d\le6.
$$

Thus sending the outer pair arbitrarily far away cannot leave two separated inner binaries. Any such exact sequence must approach coincident positions between members of the inner pairs. This is a necessary condition on a sequence of prescribed exact configurations, not a claim that such solutions exist, that an evolving assembly approaches coincidence, or that the ordinary law extends through coincidence.

## Static identity for the inner four members

At one reception time write $x_i=X_i(0)$ and $I$ for the four inner labels. Their polarities sum to zero. Define the instantaneous comparison acceleration using only inner sources,

$$
A_i^0=\sum_{j\in I\setminus\{i\}}q_iq_j\frac{x_i-x_j}{|x_i-x_j|^2}.
$$

This is an algebraic comparison, not the selected dynamical law. Grouping the two directed terms for each unordered pair gives

$$
\sum_{i\in I}x_i\cdot A_i^0
=\sum_{i<j\in I}q_iq_j
=\frac{(\sum_{i\in I}q_i)^2-\sum_{i\in I}q_i^2}{2}=-2.
$$

All present inner separations are positive because $r_2>1$ and each pair is antipodal. Strict subfield speed supplies exactly one ordinary hit per directed partner channel, and no positive self hit. The comparison therefore pairs each of the twelve directed internal rows with exactly one actual internal contribution.

## Complete internal causal correction

For one internal row let $y=x_i-x_j$ be the present chord, $z=x_i-X_j(-\tau)=\tau n$ its causal chord, and $\bar v=(X_j(0)-X_j(-\tau))/\tau$ the average source velocity. Then $y=\tau(n-\bar v)$ and $\bar D=1-n\cdot\bar v\ge1-u r_j>0$. If $\bar v_\perp$ is its component perpendicular to $n$, direct subtraction gives

$$
\left|\frac{n}{\tau\bar D}-\frac{y}{|y|^2}\right|
=\frac{|\bar v_\perp|}{\bar D|y|}
\le\frac{u r_j}{(1-u r_j)|y|}.
$$

The actual factor uses the emission velocity $v_e=\dot X_j(-\tau)$. Constant-radius circular kinematics gives $|\ddot X_j|=u^2r_j$, so integrating over the delay yields $|\bar v-v_e|\le u^2r_j\tau/2$. Both source factors are at least $1-u r_j$, and therefore

$$
\left|\frac{n}{\tau D}-\frac{n}{\tau\bar D}\right|
\le\frac{u^2r_j}{2(1-u r_j)^2}.
$$

These are finite-speed inequalities for the full delay; no truncated series or change of source weighting is used. They are the same algebraic cancellation proved in the [curvature-refined treatment](overnight-c-curvature-refined-exclusion.md#exact-cancellation-using-the-average-source-velocity), with the source radius left explicit.

Since $r_i,r_j\le M$, $|y|\ge d$, and $uM<1$, the difference between the actual internal scalar contraction and $-2$ is bounded by

$$
E_{\mathrm{int}}
\le\frac{12M^2u}{(1-Mu)d}
+\frac{6M^2u^2}{(1-Mu)^2}.
$$

The multiplicities are twelve directed internal rows. Multiplication by each receiver radius supplies one factor $M$; each source radius supplies the other. The one-half in the curvature term converts twelve into six. This estimate intentionally ignores all possible cancellations.

## Both outer sources remain in the estimate

For each inner receiver of radius $a\le M$ and either outer source of radius $s$, the delayed chord has length at least $s-M$. The circle-height identity gives the source factor floor $D\ge1-u a\ge1-uM$. Thus the magnitude of each outer row is at most $1/((s-M)(1-uM))$.

There are eight such directed contributions to the four inner receivers. After multiplication by receiver radius, their entire scalar contraction has absolute value at most

$$
E_{\mathrm{outer}}\le\frac{8M}{(s-M)(1-uM)}.
$$

This bound remains useful even when the outer source speed tends to one from below, because it uses the receiver radius in the projected source-factor estimate. It retains every outer contribution rather than treating the outer pair as absent.

## Necessary separation estimate

The four exact circular equations require

$$
\sum_{i\in I}x_i\cdot A_i=-u^2\sum_{i\in I}|x_i|^2,
\qquad \sum_{i\in I}|x_i|^2\le4M^2.
$$

Combining this requirement with the static identity and the two absolute error bounds gives

$$
2\le E_{\mathrm{int}}+E_{\mathrm{outer}}+4M^2u^2.
$$

The outer strict subfield condition gives $u<1/s$. Each right-hand expression increases with $u$ on $0\le u<1/M$, so replacing $u$ by $1/s$ gives precisely

$$
2\le\frac{12M^2}{(s-M)d}
+\frac{6M^2}{(s-M)^2}
+\frac{8Ms}{(s-M)^2}
+\frac{4M^2}{s^2}.
$$

When the last three terms sum to less than two, solving this inequality for the positive quantity $d$ yields the stated necessary upper bound. Failure of that bound is a continuous exclusion with unrestricted phases.

## Consequence for a hypothetical unbounded sequence

The [preceding radius condition](overnight-c-separated-radius-necessary-condition.md#constraint-when-the-outermost-pair-becomes-distant) implies $\limsup r_2\le5$ for any exact sequence with $s=r_3\to\infty$. Hence $r_2\le6$ eventually. Taking $M=6$ gives $H_6(s)\to0$, and the necessary separation bound forces $d\to0$.

For the inner antipodal pairs, put $\rho=\operatorname{dist}(\phi_2,\pi\mathbb Z)\in[0,\pi/2]$. Their minimum separation is exactly

$$
d=\min\left\{2,\sqrt{(r_2-1)^2+4r_2\sin^2(\rho/2)}\right\}.
$$

The same-pair separations are two and $2r_2\ge2$, and the displayed cross-pair value chooses the smaller of the two opposite-endpoint chords. Once $d<2$, its square is the expression under the radical. Therefore $d\to0$ forces $r_2\to1$ and $\rho\to0$.

Now fix any $\epsilon>0$. Eventually $r_2\le1+\epsilon$, so the same inequality applies with the fixed constant $M=1+\epsilon$. Multiplying the separation bound by $s$ and taking the upper limit gives $\limsup sd\le6(1+\epsilon)^2$. Letting $\epsilon$ decrease to zero proves $\limsup r_3d\le6$. This order of limits avoids choosing a moving constant inside an unproved uniform estimate.

## Limits and falsifiers

The theorem assumes separated ordinary configurations at every member of the hypothetical sequence. Its limiting coincidence is outside the law's ordinary domain and is not assigned an acceleration or continuation rule. No claim is made about superfield histories, noncircular motion, actual-time escape or contact, stability, or the existence of an exact sequence. The proof uses only the selected delayed equation, circular kinematics, and Euclidean identities.

Falsifiers are a failed causal comparison inequality, an incorrect count of internal or outer directed rows, a wrong source-factor floor, a static contraction other than $-2$, an invalid monotonic replacement of $u$, a flaw in the sequence argument, or an exact solution violating the displayed finite separation bound. Independent reconstruction is pending; no numerical sample or interval cover is a premise.
