# A complete ordinary superfield chart with strictly forward tangential acceleration

## Result and declared geometry

Claim grade: derived, pending independent review. Under the unchanged logarithmic equation with $K_{\log}=c_f=1$, the following compact three-binary geometry has no exact circular balance:

$$
r_1=1,\quad r_2\in[26/25,53/50],\quad r_3\in[109/100,111/100],
$$

$$
\omega\in[51/50,26/25],\qquad \phi_1=0,\qquad
\phi_2,\phi_3\in[-1/1000,1/1000].
$$

The complete paths are $X_{a,s}(t)=s r_a e^{i(\omega t+\phi_a)}$ for every real $t$, with fixed pair identity $a=1,2,3$ and polarity $s=\pm1$. Each member moves above wake speed, with $1.02\le\omega r_a\le1.1544$. The radii are strictly unequal and the phases may vary independently. Positive endpoints occupy a narrow angular sector; their negative partners occupy the antipodal sector. Length/time scaling and common rotation remain gauges.

Every directed channel has exactly one ordinary positive-delay root. There are thirty partner roots and six positive-delay self roots, all with positive transmitter factors. At every one of these thirty-six hits, the received tangential acceleration has the same strictly positive sign. Circular kinematics requires zero tangential acceleration, so no member balances. This is a continuous exclusion of the displayed superfield box, not a continuation across a fold or an exclusion of all superfield geometries.

The [authorized equation definition](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) and [assignment](overnight-braid-research-plan-2026-10-06.md#c-logarithmic-planar-three-binary-geometry) supply the unchanged response and the ordinary-superfield fallback scope. No ceiling, receiver factor, coefficient adjustment or root exclusion is used. The same-time self endpoint remains outside the equation.

## Delay functions on the entire past

Fix any receiver radius $a$ and source radius $b$, and write $\epsilon$ for the difference between their binary positive-endpoint phases. In every channel $|\epsilon|\le1/500$. All radii lie between $1$ and $111/100$. Distinct pair radii differ by at least $3/100$. A same-polarity channel has present relative phase $\epsilon$, while an opposite-polarity channel has relative phase $\pi+\epsilon$ modulo $2\pi$.

Every causal delay obeys $0<\tau\le L:=a+b$, because the chord is no longer than the sum of radii. Define $\eta=\omega\tau-\epsilon$. Squaring the causal equation, which is equivalent for positive $\tau$, gives

$$
G_+(\tau)=\tau^2-a^2-b^2+2ab\cos\eta
=\tau^2-(a-b)^2-4ab\sin^2(\eta/2)
$$

for same-polarity channels, and

$$
G_-(\tau)=\tau^2-a^2-b^2-2ab\cos\eta
$$

for opposite-polarity channels. The subscripts identify polarity products. For self, $a=b$ and $\epsilon=0$ exactly. The delay origin is not an admitted self hit.

The transmitter factor on either causal root is $D=G_\pm'(\tau)/(2\tau)$. Thus root simplicity and its source-weight sign can be checked directly from the appropriate squared gap. Root counting below covers the whole interval $(0,L]$, and bounded geometry excludes its entire complement. Rotation covariance then makes the chart valid at every reception time.

## No roots in the initial delay strip

Take $t_0=1/4$. On $0\le\tau\le t_0$,

$$
|\eta|\le\frac{131}{500},\qquad
|\eta/2|\le\frac{131}{1000}.
$$

The elementary bound $\sin x\ge x-x^3/6$ for $0\le x\le131/1000$, together with oddness, gives

$$
\sin^2(\eta/2)\ge\frac{99}{100}(\eta/2)^2.
$$

Indeed $(1-(131/1000)^2/6)^2>99/100$, an exact rational inequality. In a same-polarity interpair channel, $ab\ge26/25$, so $(99/100)ab>1$. Therefore

$$
G_+(\tau)
\le\tau^2-(a-b)^2-(\omega\tau-\epsilon)^2
\le\frac{\epsilon^2}{\omega^2-1}-(a-b)^2
\le\frac1{10100}-\frac9{10000}<0.
$$

The middle inequality is the exact maximum of a concave quadratic in $\tau$. It is valid for all real $\tau$, so no small positive interval is missed. For a self channel, the same sine bound instead gives

$$
G_+(\tau)\le\tau^2\left[1-\frac{99}{100}a^2\omega^2\right]<0
\qquad(0<\tau\le t_0),
$$

because $(99/100)(51/50)^2>1$. The endpoint $\tau=0$ is exactly the excluded same-time self root.

In an opposite-polarity channel, $\cos\eta\ge1-(131/500)^2/2>0$ throughout this strip. Hence $G_-(\tau)<\tau^2-a^2-b^2\le1/16-2<0$. No positive causal root of either kind lies in this initial strip.

## Exactly one later root in every channel

For $t_0\le\tau\le L$, the angular gap satisfies

$$
\frac{253}{1000}\le\eta\le\frac{5777}{2500}<3<\pi.
$$

The lower bound is $(51/50)(1/4)-1/500$, and the upper bound is $(26/25)(222/100)+1/500$. Thus $\sin\eta>0$ everywhere in this interval.

For the same-polarity gap,

$$
G_+'(\tau)=2\tau-2\omega ab\sin\eta,\quad
G_+''(\tau)=2-2\omega^2ab\cos\eta,\quad
G_+'''(\tau)=2\omega^3ab\sin\eta>0.
$$

At the strip endpoint, $\eta\in[253/1000,131/500]\subset(0,\pi/2)$, so

$$
G_+'(t_0)
\le\frac12-2\frac{51}{50}
\left[\frac{253}{1000}-\frac{(253/1000)^3}{6}\right]<0.
$$

Here $ab\ge1$ and the sine is increasing on this short interval. At the opposite endpoint,

$$
G_+'(L)\ge2(a+b-\omega ab)
\ge2\left[2-\frac{26}{25}\left(\frac{111}{100}\right)^2\right]>0.
$$

Since $G_+'''$ is positive, $G_+'$ is strictly convex. Starting negative and ending positive, it has exactly one zero on this interval: a convex function's nonpositive sublevel set is an interval, and strict convexity prevents another crossing after its first positive exit. Equivalently, the strictly increasing $G_+''$ makes $G_+'$ first decrease and then increase, or increase throughout. Consequently $G_+$ first decreases and then increases. It starts negative, while

$$
G_+(L)=2ab(1+\cos(\omega L-\epsilon))>0.
$$

It therefore has exactly one zero, on its strictly increasing part. At this root $G_+'>0$ and $D>0$. This includes the one positive-delay self root in each self channel.

For opposite polarity,

$$
G_-'(\tau)=2\tau+2\omega ab\sin\eta>0
\qquad(t_0\le\tau\le L),
$$

and $G_-(L)=2ab(1-\cos(\omega L-\epsilon))>0$. Since it starts negative, it also has exactly one positive root, with $D>0$.

There are six receivers and six source channels per receiver. Each receiver has one self channel, two same-polarity partner channels and three opposite-polarity partner channels. The complete census is therefore thirty-six ordinary roots, including all six self hits. The proof gives a positive range floor $\tau>1/4$ and excludes every fold inside the closed parameter box: every root lies on a strictly increasing gap branch. Compactness and smooth dependence then supply a uniform positive transmitter-factor floor, although its numerical value is not required for the sign argument below and is not asserted here.

## Strict tangential sign

At a causal hit the receiver-frame logarithmic tangential row is

$$
A_t=-\sigma\frac{b\sin\theta}{\tau^2|D|},
$$

where $\sigma$ is the polarity product and $\theta$ the source's delayed relative phase. In same-polarity channels, $\sigma=1$ and $\theta=-\eta$, so $A_t=b\sin\eta/(\tau^2D)>0$. In opposite-polarity channels, $\sigma=-1$ and $\theta=\pi-\eta$, yielding the identical positive expression. Every root has $\eta\in(0,\pi)$, $\tau>0$ and $D>0$ by the complete chart.

Thus every individual admitted hit contributes strictly forward tangential acceleration. Summing all six hits at any receiver gives $A_t>0$, whereas its prescribed circular history has $\ddot X\cdot e_t=0$. No cancellation is available from another pair, an older root, or a self channel: the all-past census already includes all of them. This contradiction proves the bounded exclusion.

## Falsifiers and verification boundary

An error in the initial-strip bounds, a second zero of a gap on its declared monotone pieces, a missing positive-delay self root, a nonpositive transmitter factor, or a zero or negative tangential row inside the stated parameter box would falsify the corresponding step. Numerical search results do not enter this derivation. The elementary trigonometric inequalities can be checked by integrating the usual derivative bounds; they are not standard-physics premises. Independent analytical adjudication and exact-rational checks of the constants remain pending. Neither the regular alternating-hexagon census nor an unbalanced-state spectrum is used.
