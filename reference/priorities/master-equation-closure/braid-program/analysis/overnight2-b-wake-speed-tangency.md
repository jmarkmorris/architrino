# Necessary curvature at a tangential contact with wake speed

## Scope and mechanism

The independently accepted [wake-speed crossing theorem](overnight2-b-independent-wake-speed-crossing.md) assigns a locally constant sign to the recent self gap of an everywhere-ordinary exact history. That statement also constrains a history that touches unit speed without crossing it. At a touch, instantaneous speed alone gives a zero limit of the self gap; the next nonzero time derivative decides whether short past chords lie above or below the wake cone.

This is a derived subject awaiting independent analytical review. Retain the theorem's hypotheses: finitely many complete paths, collision-free simultaneous positions, a locally uniform finite complete-past delay bound, every positive-delay root ordinary, all self and partner roots included, positive self polarity, the absolute source divisor and a finite exact canonical acceleration sum. Set $K=c_f=1$. For the derivative statement, strengthen local path regularity to $C^3$. Bounded complete past positions are a sufficient remote hypothesis. No new event response or ceiling is selected.

Write $v=\dot X$, $a=\ddot X$, $j=X^{(3)}$, and $S=|v|^2$. All derivatives in the general argument use physical absolute time. At a reception $t_0$ with $S(t_0)=1$, let $\sigma\in\{-1,+1\}$ be the constant recent-gap sign on the connected exact interval. If that interval contains a strict above-wake speed, $\sigma=+1$; if it contains a strict below-wake speed, $\sigma=-1$.

## The local jet inequality

Define the normalized recent self gap
$$
F(t,d)=\frac{|X(t)-X(t-d)|^2}{d^2}-1,\qquad d>0.
$$
Taylor expansion of the averaged velocity at fixed reception gives
$$
\frac{X(t_0)-X(t_0-d)}d
=v-\frac d2a+\frac{d^2}{6}j+o(d^2),
$$
and hence
$$
F(t_0,d)=S-1-\frac{S'}2d+
\frac{2S''-|a|^2}{12}d^2+o(d^2). \tag{1}
$$
Here $S'=2v\cdot a$ and $S''=2|a|^2+2v\cdot j$. Every quantity on the right is evaluated at $t_0$.

Suppose $t_0$ is an interior unit-speed contact on an interval with some strict above-wake speed. The crossing theorem prevents any speed below one, so $S$ has a local minimum at $t_0$ and $S'=0$. The recent-gap sign is positive. Dividing (1) by $d^2$ and taking $d\downarrow0$ therefore yields the necessary condition
$$
\boxed{2S''(t_0)\ge |a(t_0)|^2.} \tag{2}
$$
A strict reversed inequality rules out an everywhere-ordinary exact history. Equality is not acceptance: higher-order terms must still have the positive recent-gap sign. For an interval containing a strict below-wake speed, the analogous contact is a local maximum and $\sigma=-1$, giving $2S''-|a|^2\le0$; that inequality follows already from $S''\le0$, so the leading jet adds no comparable restriction there.

An above-wake exact interval cannot contain an open unit-speed plateau. Within such a plateau, every sufficiently short past chord has length at most its unit-speed arclength, giving $F\le0$. Equality would itself be a positive-delay root in the recent root-free interval; strict inequality has the wrong sign. This excludes a plateau but does not by itself exclude isolated or more complicated unit-speed contact sets.

## Constant planar radius at unit planar speed

Apply the result to the selected six-member class with $R>0$, $\tau=t/R$ and normalized paths
$$
X_\ell(t)=R\bigl(\cos(\tau+\ell\pi/3),\sin(\tau+\ell\pi/3),(-1)^\ell z(\tau)\bigr).
$$
The rotation parameter is exactly $\beta=1$, the radius is one in normalized coordinates, and $z$ is a complete bounded $C^3$ function. A dot in the rest of this section denotes normalized-time differentiation. Every member has
$$
S=1+\dot z^2.
$$
Assume $z$ is nonconstant on the connected interval of interest, so some reception has $S>1$. At an interior axial turning reception $\dot z=0$,
$$
\frac{d^2S}{dt^2}=\frac{2\ddot z^2}{R^2},\qquad
|a|^2=\frac{1+\ddot z^2}{R^2}.
$$
Condition (2) becomes
$$
\boxed{|\ddot z|\ge\frac1{\sqrt3}}. \tag{3}
$$
Every axial turn of an exact history in this class must meet that lower bound. In particular, a degenerate turn with $\dot z=\ddot z=0$ is excluded. The statement concerns the geometric turning acceleration; no architrino mass, force or observer-level law enters.

For a periodic nonconstant profile, maxima and minima supply turning receptions. Consequently any declared complete periodic family with $\|\ddot z\|_\infty<1/\sqrt3$ is excluded at every scale when $\beta=1$. The supremum bound is sufficient, not necessary for exclusion: one turn violating (3) suffices. The statement does not apply this threshold to a different rotation coefficient.

There is a simpler complementary restriction for constant planar rate $0<\beta<1$. At every axial turn, speed is $\beta<1$. If a complete periodic nonconstant profile were exact and everywhere ordinary, the crossing theorem would require
$$
\beta^2+\dot z(\tau)^2\le1
$$
at every reception in the connected interval containing the whole history. Thus $\|\dot z\|_\infty\le\sqrt{1-\beta^2}$ is a derived necessary condition for this particular constant-radius class. This is not a ceiling imposed on the canonical law or on arbitrary coupled profiles.

## Cosine equality boundary

For the explicit cosine profile $z(\tau)=H\cos(\kappa\tau)$, with $H,\kappa>0$ and $\beta=1$, the turning condition is
$$
H\kappa^2\ge1/\sqrt3.
$$
The complete histories are bounded and collision-free because of positive planar radius. A strict violation excludes every scale under the ordinary exactness hypotheses. Equality requires a further check.

At a height maximum, the self chord has planar squared length $4\sin^2(d/2)$ and vertical difference $H(1-\cos\kappa d)$ in normalized coordinates. Its exact recent gap is therefore
$$
F(d)=\frac{4\sin^2(d/2)+H^2(1-\cos\kappa d)^2}{d^2}-1.
$$
The first three nonconstant coefficients are
$$
F(d)=
\left(-\frac1{12}+\frac{H^2\kappa^4}{4}\right)d^2+
\left(\frac1{360}-\frac{H^2\kappa^6}{24}\right)d^4+
\left(-\frac1{20160}+\frac{H^2\kappa^8}{320}\right)d^6+
O(d^8). \tag{4}
$$
On the equality boundary $H^2\kappa^4=1/3$, the fourth-order coefficient becomes $(1-5\kappa^2)/360$. It is negative whenever $\kappa^2>1/5$, contradicting the required positive recent-gap sign. At the remaining endpoint $\kappa^2=1/5$, it vanishes, but the sixth-order coefficient is
$$
-\frac1{20160}+\frac1{24000}<0.
$$
Thus the closed equality portion
$$
\boxed{H\kappa^2=1/\sqrt3,\qquad \kappa\ge1/\sqrt5}
$$
is also excluded. When equality holds and $\kappa<1/\sqrt5$, the fourth-order coefficient is positive; this local test is consistent with the required sign and makes no existence claim. For $H\kappa^2>1/\sqrt3$, the leading coefficient is positive and this particular turning test supplies no exclusion.

## Meaning, checks and falsifiers

This is a local geometric necessary condition extracted from an independently proved exact-history theorem. It does not prove an ordinary full-period chart for any remaining cosine parameters, exclude all above-wake families, establish an exact reference or justify stability analysis. Failure of ordinary exactness is an obstruction within the declared canonical domain, not permission to omit a self root or select a singular continuation.

The proof uses Taylor's theorem, a finite-dimensional squared-norm identity and explicit sine/cosine series. Independent review must reconstruct the coefficient in (1), the time scaling in (3), the sixth-order coefficient in (4), and the use of a connected exact interval containing both the unit-speed contact and a strict above-wake reception. A counterexample satisfying all those hypotheses and violating (2), or a wrong nonzero coefficient at the cosine equality boundary, would refute the corresponding claim.

No numerical target or companion is required. Parent integration belongs in [the current research account](overnight2-b-followup-and-research-2026-10-07.md); this subject remains unaccepted until its separate review is read and integrated.
