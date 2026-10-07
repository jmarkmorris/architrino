# Independent review of the linked neutral-pair response equations

## Verdict, domain and frozen identity

**Derived verdict: supported; no mathematical defect found.** The proposed neutral-pair response, four inner scalar equations, two outer scalar equations, reciprocal static ellipse and positive-speed limitation of the independent-row cap all reconstruct consistently from the six persistent circular paths. The result is a faithful balance formulation and a limitation of one enclosing estimate. It establishes neither a new exclusion nor an exact reference in the remaining region.

The frozen subject is [the linked-response note](overnight2-c-partial-equality-next-step.md). Its SHA-256 measured with `shasum -a 256` is `739813ccaf68980e9e89c37affb8250026b016a7043a45a476cbb5e65a8e1c22`, matching the supplied identity. The scope is three distinct neutral antipodal pairs with radii $1,1,b$, $1<b<4$, common angular rate $\omega\ge0$, all speeds at most one, and the unchanged coefficient-one logarithmic law $K_{\log}=c_f=1$. Complete circular histories retain thirty ordinary positive partner roots and no positive self roots. The response formulas themselves also apply wherever these geometric root hypotheses hold outside the remaining-region restriction.

The clock tool returned 2026-10-07 09:37:15 UTC at review start. The live report retains launch 03:25:15 UTC, exploration stop 13:55:15 UTC and hard deadline 15:25:15 UTC. This bounded review uses the live Ramon E. Moore lens, writes only this new review and runs no numerical instrument or target.

## Reconstructing one ordered source row

At reception time zero, rotate the receiver frame so that a positive receiver is at $x=(a,0)$. Define the counterclockwise phase difference unambiguously as source phase minus receiver phase. A positive source of radius $c$ at present difference $\theta$ has emission position and velocity

$$
y(-\tau)=c(\cos\psi,\sin\psi),\qquad
v_s(-\tau)=\omega c(-\sin\psi,\cos\psi),\qquad
\psi=\theta-\omega\tau.
$$

The causal chord is $p=x-y=(a-c\cos\psi,-c\sin\psi)$, with $\tau=|p|$. Thus

$$
\tau^2=a^2+c^2-2ac\cos\psi,\qquad
n\cdot v_s=-\frac{\omega ac\sin\psi}{\tau},
$$

$$
D=1-n\cdot v_s=1+\frac{\omega ac\sin\psi}{\tau}.
$$

This independently fixes the plus sign in the factor and the minus sign in the tangential numerator. A same-polarity logarithmic row $n/(\tau D)$ is exactly

$$
U_{a,c}(\theta;\omega)=\frac{(a-c\cos\psi,-c\sin\psi)}{\tau^2D}.
$$

The source's negative antipode has phase difference $\theta+\pi$ and opposite polarity, hence the neutral-pair contribution is $G_{a,c}(\theta)=U_{a,c}(\theta)-U_{a,c}(\theta+\pi)$. The two delays are solved separately. Antipodal simultaneous positions do not make the two distinct emission events share a delay. When $a=c$, admissibility of a full neutral pair requires both channels to avoid present coincidence; the distinct-member assumption excludes $\theta=0$ and $\theta=\pi$ modulo $2\pi$.

## Clockwise conversion and all six component equations

The equal-radius chart uses clockwise present angle $\gamma=-\theta\pmod{2\pi}$. With emission clockwise angle $\alpha$, its complete root obeys $\gamma=\alpha-2v\sin(\alpha/2)$, and a positive same-polarity row at radius $a$ is $(R_v(\gamma),B_v(\gamma))/(2a)$, where $v=\omega a$. This conversion agrees with the direct counterclockwise row above: for emission angle $\psi=-\alpha$, the tangential numerator is positive $a\sin\alpha$.

Choose positive phases $0,-\beta,\chi$, with $0<\beta<\pi$, for the two unit pairs and the radius-$b$ pair. At the first unit receiver, the other inner positive and negative sources have clockwise angles $\beta,\beta+\pi$. At the second, the other inner positive and negative sources have clockwise angles $2\pi-\beta,\pi-\beta$. Their signed contributions are respectively $(P_v(\beta),Q_v(\beta))/2$ and $-(P_v(\pi-\beta),Q_v(\pi-\beta))/2$. Each receiver's own negative antipode contributes $-(R_v(\pi),B_v(\pi))/2$, with $v=\omega$.

The same outer pair is seen at counterclockwise angles $\chi$ and $\chi+\beta$. Subtracting the just-enumerated three inner rows from the required vector $(-\omega^2,0)$ gives exactly

$$
G_{1,b}(\chi;\omega)=\left(-\omega^2+\frac{R_v(\pi)-P_v(\beta)}2,\ \frac{B_v(\pi)-Q_v(\beta)}2\right),
$$

$$
G_{1,b}(\chi+\beta;\omega)=\left(-\omega^2+\frac{R_v(\pi)+P_v(\pi-\beta)}2,\ \frac{B_v(\pi)+Q_v(\pi-\beta)}2\right).
$$

In particular, subtracting the first required radial response from the second gives $[P_v(\beta)+P_v(\pi-\beta)]/2$. It is strictly positive for $v>0$: differentiating $R_v=1/D$ through the complete root gives $R_v'=-v\sin(\alpha/2)/(2D^3)<0$, so $P_v(x)=R_v(x)-R_v(x+\pi)>0$. At $v=0$ this difference is zero, correctly excluded from the strict assertion.

At the positive outer receiver, the two inner positive phases relative to it are $-\chi$ and $-\beta-\chi$. Their complete neutral-pair contributions are $G_{b,1}(-\chi)$ and $G_{b,1}(-\beta-\chi)$. Its own negative antipode contributes $-(R_{\omega b}(\pi),B_{\omega b}(\pi))/(2b)$. Adding the required circular residual term $(\omega^2b,0)$ therefore gives precisely

$$
0=\omega^2b-\frac{R_{\omega b}(\pi)}{2b}+G_{b,1,r}(-\chi;\omega)+G_{b,1,r}(-\beta-\chi;\omega),
$$

$$
0=-\frac{B_{\omega b}(\pi)}{2b}+G_{b,1,t}(-\chi;\omega)+G_{b,1,t}(-\beta-\chi;\omega).
$$

There are five signed partner rows at each of these three receivers, for fifteen rows. Simultaneously rotating both members of an ordered interaction by $\pi$ reverses its vector, preserves the polarity product, delay and factor, and reverses the local component basis. Thus the three negative receivers have exactly the same local component equations. This accounts for all thirty directed partner roots. The geometric complete-root theorem excludes additional positive self roots and older-history branches, including at outer speed one. Within this prescribed circular ansatz, solving the six linked equations is equivalent to complete circular balance, rather than merely a subset of its necessary equations. No solution of those equations is claimed here.

## Static reciprocal ellipse as an independent control

At $\omega=0$, $D=1$ and the source positions are instantaneous. Encode a row as radial plus $i$ times tangential. For $a=1$, the same-polarity row is

$$
\frac{1-be^{i\theta}}{|1-be^{i\theta}|^2}=\frac1{1-be^{-i\theta}}.
$$

Subtracting its opposite-polarity antipode gives $G=2be^{-i\theta}/(1-b^2e^{-2i\theta})$. For $b>1$, neither the denominator nor $G$ vanishes. Taking its reciprocal gives

$$
\frac1G=\frac{e^{i\theta}}{2b}-\frac{be^{-i\theta}}2
=-\frac{b^2-1}{2b}\cos\theta+i\frac{b^2+1}{2b}\sin\theta.
$$

This is the stated nondegenerate ellipse. Hand checks at $\theta=0$ and $\theta=\pi/2$ give $G=-2b/(b^2-1)$ and $G=-2bi/(b^2+1)$, respectively, verifying the real and tangential signs. It is an analytic control for a future evaluator, not an exact static six-member solution. Nothing in the algebra establishes that the ellipse, its convexity or any other static response property persists at positive angular rate.

## Exact positive-speed limitation of the separate-row cap

For $b=2$, $v=1/8$ and $\beta=\pi/2$, the outer speed is $1/4<1$, so the fibre satisfies the speed assumptions. The two-receiver inner-only difference is $L=Q_{1/8}(\pi/2)>0$. The existing phase-independent four-row cap is

$$
C=\frac{4b}{(b^2-1)(1-v)}=\frac{64}{21}.
$$

The root identity $\alpha=\gamma+2v\sin(\alpha/2)$ bounds each root between $\gamma$ and $\gamma+1/4$. At $\gamma=\pi/2$, this interval lies below $\pi$, so its cotangent is positive and at most one, while $D\ge7/8$; hence $B\le8/7$. At $\gamma=3\pi/2$, the interval lies above $\pi$ and below $2\pi$, so $D\ge1$ and

$$
-B\le\tan(\pi/4+1/8).
$$

The elementary bounds $\sin t\le t$ and $\cos t\ge1-t^2/2$ at $t=1/8$ give $\tan t\le16/127<1$. Applying the tangent addition identity with its positive denominator gives $\tan(\pi/4+t)\le(1+16/127)/(1-16/127)=143/111$. Therefore

$$
0<L\le\frac87+\frac{143}{111}=\frac{1889}{777},\qquad
C=\frac{2368}{777},\qquad C-L\ge\frac{479}{777}>0.
$$

The independent-cap interval $[L-C,L+C]$ contains zero strictly. Thus that interval cannot certify a sign at these exact parameters. This says nothing about whether the linked outer response curve reaches the required value, much less whether the radial or outer-receiver equations also vanish. The phrase “limitation of the estimate” is mathematically accurate. No numerical approximation is involved in this demonstration.

## Scope and falsifiers

This review supports the six-equation reduction, its complete inventory and the two analytical reference facts. It does not support a global exclusion in $1<b<4$, a numerical-search proposal, an exact reference, stability or a superfield extension. The already reviewed phase-gap condition may be added only with its $r_1=r_2=1$, $b>1$, distinct-position and complete-root assumptions. It supplies no arbitrary fixed phase cutoff.

A wrong sign in $n\cdot v_s$, use of receiver-minus-source for the counterclockwise angle, omission of either emission delay within $G$, failure of antipodal covariance, an additional positive root, or disagreement with the two explicit static-axis controls would falsify the corresponding reduction. A violation of the exact root brackets or tangent estimate would invalidate the cap limitation. An enclosing interval containing zero is not a falsifier of exclusion by more correlated information. The frozen subject, previous reviews, main report and shared owners were not edited; parent integration remains separate. This completes the assigned review.
