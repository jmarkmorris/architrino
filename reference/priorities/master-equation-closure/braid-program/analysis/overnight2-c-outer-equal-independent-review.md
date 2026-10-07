# Independent review of the outer-equal radius bound

## Verdict and scope

**Derived verdict: supported; no mathematical defect found.** For distinct circular members with $r_1=1$, $r_2=r_3=b\ge9$, common angular rate, all speeds at most one and the selected $K_{\log}=c_f=1$ logarithmic acceleration law, the two positive outer receivers can be ordered so that their tangential acceleration difference exceeds $9/(160b)$. At least one tangential residual therefore exceeds $9/(320b)$ in absolute value. Such configurations cannot satisfy exact circular balance. All phases, zero speed and the outer wake-speed endpoint are covered.

The reviewed frozen subject is [the outer-equal note](overnight2-c-outer-equal-radius-bound.md), supplied SHA-256 `d70e9a476dc35c1fe4d03ea3a87655c40fe9659efdc1947f8a1329feeda0740f`. The independent reconstruction below uses the live Ramon E. Moore lens and the unchanged second C allocation, with exploration stop 13:55:15 UTC and deadline 15:25:15 UTC on October 7, 2026. This review alone is written. No numerical instrument, search or target was run.

## Scaling and source signs

Set $\mathbf x=b\widetilde{\mathbf x}$ and $t=b\widetilde t$. Then velocities, root directions and transmitter factors are unchanged, positive delays scale by $b$, and both the circular acceleration and every logarithmic row scale by $1/b$. Thus the scaled problem has two unit pair radii, one radius $a=1/b$, and angular rate $v=\omega b\in[0,1]$, with the same coefficient and wake speed. The required final acceleration bound must be divided by $b$, as in the subject.

For positive unit-radius receivers at phases $0$ and $-\beta$, $0<\beta<\pi$, the first receives the other neutral pair at clockwise arguments $\beta,\beta+\pi$, with contribution $Q_v(\beta)/2$. The second receives that pair at $2\pi-\beta,\pi-\beta$, with contribution $-Q_v(\pi-\beta)/2$. Each own antipode contributes $-B_v(\pi)/2$, which cancels on subtraction. Therefore the complete three-unit-source difference is

$$
L=\frac{Q_v(\beta)+Q_v(\pi-\beta)}2.
$$

Ordering the two positive labels chooses the separation below $\pi$; exact equality to zero or $\pi$ is excluded by distinct positions. No polarity is changed by this relabeling.

## Independent uniform derivative estimate

Write $\gamma=\alpha-2v\sin(\alpha/2)$, $c=\cos(\alpha/2)$, $D=1-vc$ and $B=c/(\sqrt{1-c^2}D)$. Differentiation using $d\alpha/d\gamma=1/D$ gives

$$
-B_v'(\gamma)=\frac{1-vc^3}{2(1-c^2)(1-vc)^3}.
$$

For $0\le c<1$, $c^3\le c$ and $D\le1$ imply $1-vc^3\ge D$ and consequently $-B'\ge1/[2(1-c^2)D^2]\ge1/2$. For $-1<c\le0$, put $x=-c$. The numerator is at least one and $D=1+vx\le1+x$, so

$$
-B'\ge\frac1{2(1-x)(1+x)^4}.
$$

The denominator polynomial without its factor two has derivative

$$
\frac{d}{dx}\{(1-x)(1+x)^4\}=(1+x)^3(3-5x).
$$

On $[0,1]$ this is positive before $3/5$ and negative afterward. Its global maximum is $(2/5)(8/5)^4=8192/3125$. Thus $-B'\ge3125/16384>3/16$, the last exact comparison being $3125>3072$. The two sectors exhaust all interior roots. At $v=1$, $D$ remains positive at every interior root; the excluded endpoint $\alpha=0$ is not needed for this bound.

Every interval $[x,x+\pi]$ with $0<x<\pi$ stays in the interior chart. Integration gives $Q_v(x)\ge3\pi/16>9/16$, and hence $L>9/16$. This argument is independent of the previous convexity theorem, its minimum location and any interval sign certificate.

## Contribution of the smaller pair

For one radius-$a$ source at delayed angle $\theta$ and a unit receiver, $\tau^2=1+a^2-2a\cos\theta$ and $|A_t|=a|\sin\theta|/(\tau^2D)$. The actual source speed is $va\le a<1$, giving $D\ge1-a$. This is a source-speed estimate: using $1-v$ instead would lose the needed bound at a wake-speed receiver.

Expanding both sides independently verifies

$$
\tau^4-(1-a^2)^2\sin^2\theta=((1+a^2)\cos\theta-2a)^2\ge0.
$$

Since $1-a^2>0$, this bounds a single row by $a/[(1-a)^2(1+a)]$. There are two smaller sources at each of the two selected receivers, so the magnitude of their difference is at most four times this number. The logarithmic derivative of the positive function is

$$
\frac1a+\frac2{1-a}-\frac1{1+a}=\frac{1+a+2a^2}{a(1-a)(1+a)}>0.
$$

For $a\le1/9$, the four-row cap is therefore at most

$$
\frac{4/9}{(8/9)^2(10/9)}=\frac{81}{160}.
$$

Even its most adverse signed contribution leaves the scaled difference strictly greater than $9/16-81/160=9/160$. Scaling back gives the asserted $9/(160b)$. The inequality $\max(|A_{2,t}|,|A_{3,t}|)\ge|A_{2,t}-A_{3,t}|/2$ supplies the maximum-component margin. Required circular acceleration is radial, so these tangential accelerations are precisely tangential balance residuals.

## Coverage, controls and falsifiers

The [independently reviewed root theorem](overnight2-c-root-bound-independent-review.md) applies to distinct simultaneous circular positions and both endpoint speeds at most one, including equal radii. It supplies exactly thirty ordinary positive partner roots and zero positive self roots over the complete delay domain. Each selected receiver retains all three same-radius sources and both smaller-radius sources. Equations at the other four receivers are not needed to disprove full balance, but their roots remain part of the model. Length/time scaling is a bijection of the full history and preserves this census.

Independent hand controls are the static derivative $-B_0'=1/[2\sin^2(\gamma/2)]\ge1/2$, the source arguments $\pi/3,2\pi/3$ for the difference at $\beta=\pi/3$, and the vanishing smaller-pair cap as $a\downarrow0$. These are analytical checks rather than numerical receipts. The decisive polynomial extremum and every displayed rational comparison above are exact.

The supported exclusion is restricted to the outer-equal boundary with $b\ge9$ and the selected complete-root law. It neither excludes $1<b<9$ nor asserts anything about superfield histories, stability or actual-time continuation. A wrong scale direction, failure of the derivative identity or its two-sector bound, an additional positive root, a different transmitter factor, or a source-sign error in the explicitly reconstructed inventory would invalidate the corresponding step. An exact configuration in the stated domain would falsify the exclusion. No correction to the frozen subject is required.
