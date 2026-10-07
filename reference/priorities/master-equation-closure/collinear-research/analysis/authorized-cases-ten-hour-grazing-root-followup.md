# Later root regularity after an isolated speed touch

**Derived candidate; independent assessment pending.** This note follows the [ordinary-root grazing continuation](authorized-cases-ten-hour-grazing-continuation-candidate.md) without assigning that event to the selected logarithmic spiral perturbation. The acceleration law is unchanged. The argument is geometric and applies to the canonical and registered logarithmic rows separately; it defines no equality response or speed ceiling.

## A fixed emitted point

Translate the possible touching time to zero. At that instant a mirror pair has positions $x_0,-x_0$, velocities $v_0,-v_0$, and $|v_0|=1$, with $x_0\ne0$. Consider a later receiver path $x(t)$ starting at $x_0$ and satisfying $|x'(s)|\le1$ on $[0,t]$. A partner root emitted at time zero obeys

$$
t=|x(t)+x_0|,
\qquad n=\frac{x(t)+x_0}{t},
\qquad D=1+n\cdot v_0.
\tag{1}
$$

The root is nonordinary only if $D=0$. Since both $n$ and $v_0$ are unit vectors, this requires $n=-v_0$, and hence

$$
x(t)=-x_0-tv_0.
\tag{2}
$$

On the other hand the speed bound gives $|x(t)-x_0|\le t$. Substitution of (2) yields the necessary condition

$$
|2x_0+tv_0|^2\le t^2,
\qquad |x_0|^2+t\,x_0\cdot v_0\le0.
\tag{3}
$$

Consequently, if $x_0\cdot v_0\ge0$, the emitted unit-speed point can never create a later nonordinary partner root while the receiver remains at or below unit speed. This conclusion uses the entire displacement bound, rather than only a velocity sample at the later reception.

If $x_0\cdot v_0<0$, (3) instead gives the necessary delay threshold $t\ge |x_0|^2/(-x_0\cdot v_0)$. Equality would require a straight receiver segment traversed at unit speed almost everywhere. If every nonempty interval contains a subinterval of strictly subfield motion, the chord inequality is strict and the threshold becomes strict. Neither condition establishes existence of such a later root.

## The positive-angular-motion grazing case

At an ordinary partner root of the mirror pair, write the earlier partner-coordinate point as $x_s=r_s e_s$, the receiver as $x_0=r e$, and their positive angular lag as $\delta=\theta-\theta_s\in(0,\pi/2)$. Put

$$
n=\frac{x_0+x_s}{R},\qquad R=|x_0+x_s|,
$$

and let $J$ denote rotation by $+\pi/2$ in the plane. Suppose the geometric angular quantity $h=x_0\times v_0$ is positive, $|v_0|=1$, and $n\cdot v_0=0$. Because

$$
x_0\cdot n=\frac{r^2+rr_s\cos\delta}{R}>0,
$$

positive $h$ selects $v_0=Jn$. It follows exactly that

$$
x_0\cdot v_0
=\frac{rr_s\sin\delta}{R}>0.
\tag{4}
$$

Thus the unit-speed point at such a grazing event is moving radially outward, and (3) excludes its producing a later nonordinary partner root during any continued subfield or inclusive-domain evolution. This is a statement about one fixed emitted point. It does not supply a uniform denominator bound for all future roots, exclude other future boundary events, or prove that the actual selected perturbation reaches the grazing event.

## Complete self and partner census

For any complete path with speed at most one, if every interval contains a positive-measure set where speed is strictly below one, then

$$
|x(t)-x(s)|\le\int_s^t|x'(u)|\,du<t-s
\qquad(s<t).
\tag{5}
$$

Equation (5) excludes every self root at positive delay. The same strict chord inequality makes $s+|x(t)-x_j(s)|$ strictly increasing as a function of source time. With a remote uniform subfield margin and positive reception separation, its endpoint signs give exactly one partner root. A unique root need not be ordinary; its derivative may vanish at an isolated unit-speed source point. Equations (3)–(4) supply the additional exclusion for the particular touching point considered here.

The strict-domain comparison still terminates when equality is first reached. The inclusive-domain-only comparison admits only continuations actually proved under the unchanged equation. This geometric follow-up does not select one when the grazing curvature test is degenerate or fails.

## Scope and falsifiers

No numerical instrument or new physical preparation is used. A violation of the mirror endpoint identity, the complete displacement bound, positive angular lag, or ordinary-root grazing hypothesis removes the corresponding implication. An actual later root emitted at this touching point with $D=0$ and $x_0\cdot v_0\ge0$, while the receiver obeys the stated speed bound, would contradict (3) and falsify the claimed exclusion. The independently checkable mathematical core is the exact squared-distance identity in (3).
