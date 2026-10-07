# Mirror-pair angular momentum: second reading (2026-10-05)

Second reader's check of the hand proof that a sub-wake-speed mirror pair turning in one sense has strictly monotone angular momentum per member. The reading was done from the statement of the claim alone, without consulting other repository files. Units: wake speed 1, coupling 1.

## Verdict

**Accept with corrections.** The conclusion survives in full: for a mirror pair below wake speed that satisfies the equation on its whole past and turns in one sense, $dl/dt>0$ at every instant for opposite polarity and $dl/dt<0$ for like polarity, so no such history is periodic or relative periodic (derived). Three corrections are needed, none of which changes the result: the existence half of step (1) needs one more argument than "speed below 1"; the path-length bound in step (3) is correct but its stated justification ("through or around the origin") should be replaced by a first-crossing argument; and step (3) can be sharpened from $\lvert\Delta\rvert<\pi$ to $\lvert\Delta\rvert<\pi/2$. Step (4) should also state its scope: it excludes only histories that turn in one sense.

## Step-by-step check

**Setup and sign of the row (derived, correct).** The receiver is at $x(t)$ with polarity $s_i$, the partner emitted from $-x(s)$ with polarity $s_j=-s_i$. The separation vector is $r=x(t)+x(s)$, the causal delay is $\tau=\lvert r\rvert=t-s$, and the row is

$$
a=s_is_j\,\frac{r}{\tau^3\lvert D\rvert}=-\frac{x(t)+x(s)}{\tau^3\lvert D\rvert},\qquad D=1+n\cdot x'(s),\quad n=r/\tau .
$$

The row points from the receiver toward the partner's emission point, as it must for opposite polarity. The sign of $D$ uses $V_j(s)=-x'(s)$.

**Step (1), no own-path root (derived, correct).** An own-path root needs $t-s=\lvert x(t)-x(s)\rvert$ with $s<t$, but $\lvert x(t)-x(s)\rvert\le\int_s^t\lvert x'\rvert\,du<t-s$ because the speed is continuous and below 1 at every instant. No such root exists.

**Step (1), at most one partner root (derived, correct).** Put $g(s)=t-s-\lvert x(t)+x(s)\rvert$. For $s_1<s_2$, $g(s_1)-g(s_2)\ge(s_2-s_1)-\lvert x(s_2)-x(s_1)\rvert>0$, so $g$ is strictly decreasing in $s$ and has at most one zero. Speed below 1 is all this needs.

**Step (1), existence of the partner root (the offered step is incomplete).** $g(t)=-2\rho(t)<0$, so a root exists exactly when $G(t)=\lim_{s\to-\infty}g(s)>0$. Pointwise speed below 1 does not give this. Counterexample as a kinematic history (not a solution of the equation): $\rho(u)=\sqrt{1+u^2}$, $\theta(u)=\varepsilon\arctan u$ with $0<\varepsilon<1$ has $\rho>0$, $\theta'>0$ and speed$^2=(u^2+\varepsilon^2)/(1+u^2)<1$, yet $G(t)=t-\rho(t)\cos\!\big(\theta(t)+\varepsilon\pi/2\big)$, which is negative at early times, so the member receives no row there. The repair is given under Corrections: existence holds whenever $\rho$ is bounded on the past, whenever the speed is bounded away from 1 on the past, and (the case that matters) whenever the history satisfies the equation on its whole past.

**$D$ cannot vanish (derived, correct).** $D=1+n\cdot x'(s)\ge1-\lvert x'(s)\rvert>0$, so $\lvert D\rvert=D\in(0,2)$. Also $\tau>0$ at the root, since $\tau=0$ would need $x(t)=-x(t)$, impossible for $\rho>0$. The row is finite at every instant. $D$ is not bounded away from zero uniformly unless the speed is bounded away from 1, but only pointwise positivity is used.

**Step (2), the angular momentum rate (derived, correct, sign confirmed).** With $l=x\times x'$ (planar cross product $u\times v=u_1v_2-u_2v_1$), $dl/dt=x\times x''$, and the equation gives $x''$ directly as the row. Then

$$
\frac{dl}{dt}=x(t)\times\Big(-\frac{x(t)+x(s)}{\tau^3\lvert D\rvert}\Big)=\frac{x(s)\times x(t)}{\tau^3\lvert D\rvert}=\frac{\rho(t)\rho(s)\sin\big(\theta(t)-\theta(s)\big)}{\tau^3\lvert D\rvert}.
$$

Geometric check of the sign: put $x(t)$ on the positive horizontal axis; the partner's emission point $-x(s)$ sits at angle $\pi-\Delta$ with $\Delta=\theta(t)-\theta(s)$, which is in the upper half plane for $0<\Delta<\pi$, so the row has a positive vertical component and turns the receiver counterclockwise. The formula uses only the positions $x(s)$ and $x(t)$, so in step (2) it makes no difference whether $\Delta$ is the swept angle or any representative mod $2\pi$.

**Swept angle versus angle mod $2\pi$ in step (3) (derived).** Step (3) does need the swept angle. The hypothesis $\theta'>0$ fixes the sign of the swept angle, $\Delta>0$; the sign of $\sin\Delta$ is then decided only if the swept angle is known to lie in $(0,\pi)$ rather than in $(\pi,2\pi)$, $(2\pi,3\pi)$ and so on. Positions alone cannot decide this, because they see $\Delta$ only mod $2\pi$ and carry no record of the sense of turning. What positions alone do give is a different and complementary fact, used in the sharpening below: $\cos\Delta>0$.

**Step (3), the bound $\lvert\Delta\rvert<\pi$ (derived, conclusion correct, justification to be replaced).** The path from $x(s)$ to $x(t)$ has length $L\le\int_s^t\lvert x'\rvert\,du<\tau$. The claimed lower bound $L\ge\rho(s)+\rho(t)$ when the swept angle has magnitude at least $\pi$ is right, although the path never passes through the origin. Proof: the swept angle $\varphi(u)=\theta(u)-\theta(s)$ is continuous with $\varphi(s)=0$ and $\lvert\varphi(t)\rvert\ge\pi$, so there is a first $u^*\in(s,t]$ with $\lvert\varphi(u^*)\rvert=\pi$. There $x(u^*)$ lies on the ray opposite to $x(s)$, so $\lvert x(u^*)-x(s)\rvert=\rho(s)+\rho(u^*)$. The remaining piece has length at least $\lvert x(t)-x(u^*)\rvert\ge\rho(t)-\rho(u^*)$. Adding, $L\ge\rho(s)+\rho(t)$. Since $\tau=\lvert x(t)+x(s)\rvert\le\rho(s)+\rho(t)$, this gives $\rho(s)+\rho(t)\le L<\tau\le\rho(s)+\rho(t)$, a contradiction. The step does not use $\theta'>0$ and holds for any sub-wake-speed mirror history.

**Step (4), strict monotonicity (derived, correct given the repaired step (1)).** With $\theta'>0$ on the history the swept angle is positive, with step (3) it is below $\pi$, so $\sin\Delta>0$; $\rho(t)\rho(s)>0$, $\tau^3>0$ and $0<\lvert D\rvert<2$ are finite and positive, so $dl/dt>0$ at every instant at which the row exists, which by the repaired step (1) is every instant.

**Step (4), exclusion of periodic and relative periodic histories (derived, correct).** $l=\rho^2\theta'$ depends only on $\rho$ and $\theta'$ and is unchanged by any rotation of the plane. In a relative periodic history $\rho$ and $\theta'$ are periodic with some period $T$, so $l(t+T)=l(t)$, which contradicts strict increase. Passing to a frame rotating uniformly at rate $\Omega$ replaces $\theta'$ by $\theta'-\Omega$, so periodicity in that frame again makes $\rho$ and $\theta'$ periodic and the same contradiction applies. The circular mirror orbit is the special case of constant $\rho$ and $\theta'$ and is excluded with the rest.

**Like polarity (derived, correct).** $s_is_j=+1$ reverses the row and nothing else, so $dl/dt=-\rho(t)\rho(s)\sin\Delta/(\tau^3\lvert D\rvert)<0$ for $\theta'>0$. Steps (1) and (3) do not involve polarity. $l$ is then strictly decreasing and the same exclusion follows.

**Numerical spot check (measured).** Instrument: one script on the shared venv (numpy, scipy `brentq`), double precision, on a prescribed kinematic history $\rho=1+0.3\sin(0.7u)$, $\theta=0.5u+0.2\sin u$ (maximum speed 0.904), 2000 random receive times in $[-50,50]$ per polarity. Domain: this tests the algebra and geometry of steps (1) to (3) on one bounded history; it is not a solution of the equation and is not independent evidence for the dynamics. Results: $g$ strictly decreasing on every sampled window and one root found each time; the cross product of $x(t)$ with the row agrees with the step (2) formula to $8\times10^{-17}$; the swept angle ranged over $[0.455,1.304]$, inside $(0,\pi/2)$; minimum $D$ was 0.867; the torque sign was $+$ in every opposite-polarity sample and $-$ in every like-polarity sample. For the counterexample history with $\varepsilon=0.3$, $g$ at $s=-10^6$ was $-4.2145$, $-0.8910$, $-0.0754$ at $t=-2,0,1$ (no root) and $+1.7640$, $+20.3618$ at $t=5,50$ (root exists), matching the closed-form limit $G(t)$ to about $10^{-6}$.

## Corrections

**Correction 1, existence of the root in step (1).** Replace "exactly one row because the speed is below 1" by: speed below 1 gives no own-path root and at most one partner root; the root exists if and only if $G(t)=\lim_{s\to-\infty}\big(t-s-\lvert x(t)+x(s)\rvert\big)>0$. This holds if $\rho$ is bounded on the past (then $\lvert x(t)+x(s)\rvert$ is bounded while $t-s\to\infty$), which covers every periodic and relative periodic history, and it holds if the speed is at most some $v_{\max}<1$ on the past (then $g(s)\ge(1-v_{\max})(t-s)-2\rho(t)$). It also holds for every history that satisfies the equation on its whole past (derived): for $t_1<t_2$ and every $s$, $g(s;t_2)-g(s;t_1)\ge(t_2-t_1)-\lvert x(t_2)-x(t_1)\rvert>0$, so if there is no root at time $t$ there is none at any earlier time; the member then receives no row on $(-\infty,t]$, moves uniformly at a constant speed $v<1$ there, and then $g(s;t)\ge(1-v)(t-s)-2\rho(t)\to+\infty$, which forces a root. So the conclusion "exactly one row" survives for solutions, but the reason is this argument, not the pointwise speed bound.

**Correction 2, wording of the path-length bound in step (3).** Replace "the path would pass through or around the origin so its length would be at least $\rho(s)+\rho(t)$" by the first-crossing argument above: the path must cross the ray opposite to $x(s)$ at some first time $u^*$, and the two pieces have lengths at least $\rho(s)+\rho(u^*)$ and $\rho(t)-\rho(u^*)$. The bound $\rho(s)+\rho(t)$ and the conclusion are unchanged.

**Correction 3, sharpening of step (3).** The chord is no longer than the path, so $\lvert x(t)-x(s)\rvert<\tau=\lvert x(t)+x(s)\rvert$; squaring gives $x(t)\cdot x(s)>0$, that is $\cos\Delta>0$ (derived, from positions alone). Combined with $\lvert\Delta\rvert<\pi$ for the swept angle this gives

$$
\lvert\theta(t)-\theta(s)\rvert<\frac{\pi}{2}.
$$

This is optional for the sign of $dl/dt$ but it is the true bound, and it shows the division of labour: positions alone give $\cos\Delta>0$, the swept-angle argument removes the windings, and only $\theta'>0$ gives the sign of $\sin\Delta$.

**Correction 4, scope of step (4).** State that the hypothesis can be weakened to $\theta(t)>\theta(s)$ at every causal pair $(s,t)$ (for example $\theta'\ge0$ with isolated zeros), and that the exclusion covers only one-sense histories. In general the sign of $dl/dt$ equals the sign of the swept angle $\Delta\in(-\pi/2,\pi/2)$ for opposite polarity, so a history whose turning sense reverses (including the collinear case $\theta'\equiv0$, where $l\equiv0$) is not excluded by this argument.

## Limits

This reading checks the logic of the proof from its statement; it does not show that any sub-wake-speed one-sense mirror history satisfying the equation on its whole past exists, so the result is a non-existence statement about periodic and relative periodic members of a class that may be empty or may contain only non-periodic histories. The argument uses exact mirror symmetry through the origin, planar motion, $\rho>0$, a continuously differentiable path and speed strictly below wake speed at every instant; it says nothing about pairs that are not exact mirror images, about three or more architrinos, about histories that reach or exceed wake speed (where own-path rows appear and $D$ can vanish), or about histories that start at a finite time. Falsifier: any sub-wake-speed mirror pair history with $\rho>0$ and a causal pair $(s,t)$ whose swept angle has magnitude $\pi/2$ or more would break step (3) as sharpened; any solution of the equation on the whole past with a receive time lacking a partner root would break Correction 1. The numerical spot check shares no code with other repository work but tests only identities on prescribed kinematic histories, so it confirms the algebra and not the dynamics.
