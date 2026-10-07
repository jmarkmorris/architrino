# Wake-speed obstructions on curved paths

## Result

**In words.** An architrino moving on a curved path in two or three dimensions cannot pass through wake speed with continuous velocity when it reaches wake speed at a positive rate and the rows from every other source stay bounded. Coming down through wake speed, the path just before the event was traversed faster than its own wake, so immediately after the event the receiver meets a wake it emitted a moment earlier. That own-path row points forward, has vanishing delay, and its forward component is not integrable in time, so the speed cannot have fallen. Coming up to wake speed from below, the partners' rows carry the speed above one, the receiver then overtakes the wake it emitted just before the event, and the same forward row makes the square of the speed excess grow at least logarithmically toward the event, which is incompatible with any finite speed afterwards. Both arguments use one geometric fact that has no counterpart on a line: every own-path chord of short delay near the event points within a small angle of the direction of motion, so every such row is forward, whatever the number of such roots.

**Theorem D (downward crossing).** Place the event at $t=0$. Assume: (D1) the receiver's velocity is Lipschitz on $[-\eta,0]$ with constant $M$, $\lvert \mathbf x'(0)\rvert=1$, and $v(s)-1\ge a\lvert s\rvert$ on $[-\eta,0]$ for some $a>0$; (D2) the path continues on $[0,\delta)$ in the continuation class defined below (continuous velocity, velocity absolutely continuous on compact subintervals of $(0,\delta)$, equation holding almost everywhere with ordinary roots); (D3) the remainder $\mathbf R$, meaning all rows from other architrinos together with own-path rows emitted before $-\eta_1$, has an opposing projection $b=\max\{0,-\mathbf e\cdot\mathbf R\}$ with $\int_0^{\delta}b\,dt<\infty$. Then (a) there is no $\delta'>0$ with $v<1$ on $(0,\delta')$; and (b) if in addition $b\le B_0$ almost everywhere, then $v(t)\ge1$ for every $t$ in an explicit interval $[0,\delta_3)$, so the speed does not go below wake speed at all, even at isolated times or along an oscillating sequence. **Grade: derived.**

**Theorem U (arrival from below).** Assume: (U1) $v<1$ at every time before $0$, the velocity extends continuously to $t=0$ with $\lvert\mathbf x'(0)\rvert=1$, and $1-v(s)\ge a\lvert s\rvert$ on $[-\eta,0]$ for some $a>0$; (U2) on $(-\eta,0)$ the velocity is absolutely continuous on compact subintervals and $\mathbf x''=\mathbf B$ almost everywhere, where $\mathbf B$ is the sum of all rows from other architrinos, and $t\mapsto\mathbf B(t)$ is bounded near $0$ and continuous at $t=0$ along the path and its continuation. Then there is no continuation on any $[0,\delta)$ in the continuation class. No case distinction on the sign of $v-1$ after the event is needed: every continuation in the class is forced to have $v(t)\ge1+at/2$, and then $(v-1)^2$ would have to exceed $(5a/6)\ln(t_2/t_1)$ for all $0<t_1<t_2$ small. **Grade: derived.** The Lipschitz hypothesis and the upper approach bound $1-v(s)\le M\lvert s\rvert$ that one might expect to need are not needed for Theorem U; continuity of the incoming velocity up to the event suffices.

**Scope of the words "no continuation".** Both theorems exclude continuations in the stated class: velocity continuous at the event and absolutely continuous afterwards, the equation holding almost everywhere, ordinary roots. A velocity with a jump or a singular part, and degenerate roots on a set of times of positive length, are outside the class by definition and are not excluded. Theorem D excludes going below wake speed, not touching it. In Theorem D(b) the length of the interval on which $v\ge1$ depends on the continuation's own modulus of continuity $\omega_+$ and is not fixed by the incoming data alone. In Step 2 of the proof of Theorem U the working condition should read $t\,\omega_+(t)\le a\eta_1^2/4$ on $(0,\delta_2)$, in place of the condition displayed there. In the last sentence of Lemma 4, the interval of recent roots should read $[-\eta_1,0)$. The linear rate $a>0$ is what the proofs use and is not shown to be necessary: on a curved path a root fails to be born only for approaches as flat as $v-1=\beta r^2$ with $\beta<\kappa_0^2/8$, and for rates between linear and quadratic a root is born but the non-integrability bound is not established.

**Review standing.** This note was written by a delegated analyst from a stated strategy. An [adjudication](curved-path-wake-speed-obstructions-independent-adjudication-2026-10-05.md) by a second delegated reviewer in the same session accepts both theorems with corrections to wording and to two subleading asymptotic coefficients; the corrections are applied in this text. It re-derived the forward-chord lemma and both root-existence lemmas, and tested the lemmas on prescribed circles, spirals and a path with a direction kink. Its reference derivation was written before the proofs were read, but its brief had disclosed the theorem statements, the shapes of the lemmas and their constants, so those were not found blind. It adds one statement of its own: under the hypotheses of Theorem D, any motion that touches wake speed and stays at or above it must have recent own-path roots on a set of times of positive length in every interval after the event, so the alternative left open is an intermittent motion and not a smooth rebound. Both documents were produced within one working session.

**Not covered.** (1) Continuations whose velocity jumps at the event; the one-dimensional measure-form argument (no atom at the event) is not reconstructed here. (2) Tangential arrival, $a=0$: in Theorem D a flat approach on a curved path can fail to produce any newborn root, because the chord defect is cubic in the time span and can exceed the excess path length; this is a real change from the line, not a proof artefact. (3) A descent to wake speed followed by speeds at or above one; Theorem D(b) shows this is the only continuous-velocity alternative left under bounded opposing rows, and does not exclude it. (4) Unbounded or discontinuous partner rows at the event: a partner root that is born, folds or has vanishing transmitter factor there. (5) Theorem D(a) with a merely integrable opposing projection excludes only strict crossing; the no-dip statement (b) needs a pointwise bound. (6) Any statement about which non-continuous continuation, if any, exists.

## Setting and notation

Units are $c_f=1$ and coupling $K=1$. The receiver's path is $\mathbf x(t)\in\mathbb R^d$ with $d=2$ or $3$ (the proofs hold for every $d\ge1$). Its velocity is $\mathbf x'$, its speed $v=\lvert\mathbf x'\rvert$, and where $v>0$ its direction of motion is $\mathbf e=\mathbf x'/v$. The event time is $t_0=0$ after a time translation, and $\mathbf u_0=\mathbf x'(0)$ is the unit velocity at the event.

An own-path root at reception time $t$ is an emission time $s<t$ with $g_t(s)=0$, where

$$
g_t(s)=(t-s)-\lvert\mathbf x(t)-\mathbf x(s)\rvert .
$$

Its delay is $\tau=t-s>0$, its direction is $\mathbf n=(\mathbf x(t)-\mathbf x(s))/\tau$, its transmitter factor is $D=1-\mathbf n\cdot\mathbf x'(s)$, and its row is $+\mathbf n/(\tau^2\lvert D\rvert)$. A root is ordinary when $D\ne0$.

The direction moduli are $\omega_-(\rho)=\sup_{-\rho\le r\le0}\lvert\mathbf x'(r)-\mathbf u_0\rvert$ and $\omega_+(t)=\sup_{0\le r\le t}\lvert\mathbf x'(r)-\mathbf u_0\rvert$. Both tend to zero when the velocity is continuous at the event. Fix $\eta_1\in(0,\eta]$ and $\delta_1>0$ with $\omega_-(\eta_1)\le1/8$ and $\omega_+(\delta_1)\le1/8$, and write $\theta=1/8$. Since $\lvert v-1\rvert\le\lvert\mathbf x'-\mathbf u_0\rvert$, the speed lies in $[7/8,9/8]$ on $[-\eta_1,\delta_1)$. For reception times $t\in(0,\delta_1)$ an own-path root is called recent when $s\in[-\eta_1,t)$ and remote when $s<-\eta_1$.

**Continuation class.** A continuation on $[0,\delta)$ is in the class when the velocity is continuous on $[0,\delta)$ with $\mathbf x'(0)=\mathbf u_0$ equal to the incoming limit, the velocity is absolutely continuous on every compact subinterval of $(0,\delta)$, and for almost every $t\in(0,\delta)$ every positive-delay causal root of every source is ordinary, the sum of rows converges absolutely, and $\mathbf x''(t)$ equals that sum. Write $\mathbf x''=\mathbf S+\mathbf R$, where $\mathbf S$ is the sum of recent own-path rows and $\mathbf R$ is everything else, and $b=\max\{0,-\mathbf e\cdot\mathbf R\}$.

## Geometric lemmas

**Lemma 1 (speed derivative).** On any interval where the velocity is absolutely continuous and $v\ge7/8$, the speed is absolutely continuous and $v'=\mathbf e\cdot\mathbf x''$ almost everywhere. *Proof.* The Euclidean norm is Lipschitz and smooth away from the origin; the chain rule gives $v'=\mathbf x'\cdot\mathbf x''/v$. $\square$ **Derived.**

**Lemma 2 (recent chords are forward).** Let the velocity be continuous on $[-\eta_1,\delta_1)$. For $t\in(0,\delta_1)$ and any recent own-path root $s$, $\lvert\mathbf n-\mathbf u_0\rvert\le\theta$, $\mathbf n\cdot\mathbf e(t)\ge3/4$, and $\lvert D\rvert\le\theta+\theta^2/2<1/7$. Consequently the forward component of its row satisfies

$$
\frac{\mathbf n\cdot\mathbf e(t)}{\tau^2\lvert D\rvert}\ \ge\ \frac{5}{\tau^2}.
$$

*Proof.* Every $r\in[s,t]$ has $\lvert\mathbf x'(r)-\mathbf u_0\rvert\le\theta$, so $\lvert\mathbf x(t)-\mathbf x(s)-\tau\mathbf u_0\rvert\le\tau\theta$. At a root the chord has length $\tau$, and dividing by $\tau$ gives $\lvert\mathbf n-\mathbf u_0\rvert\le\theta$. Both are unit vectors, so $\mathbf n\cdot\mathbf u_0=1-\lvert\mathbf n-\mathbf u_0\rvert^2/2\ge1-\theta^2/2$. For any $r\in[s,t]$, $\mathbf n\cdot\mathbf x'(r)=\mathbf n\cdot\mathbf u_0+\mathbf n\cdot(\mathbf x'(r)-\mathbf u_0)$ lies in $[1-\theta-\theta^2/2,\,1+\theta]$. With $r=s$ this gives $\lvert D\rvert\le\theta+\theta^2/2=17/128<1/7$. With $r=t$ and $v(t)\le1+\theta$ it gives $\mathbf n\cdot\mathbf e(t)\ge(1-\theta-\theta^2/2)/(1+\theta)=111/144>3/4$. The product bound follows. $\square$ **Derived.** The lemma does not ask on which side of the event $s$ lies, how many recent roots there are, or what sign $D$ has; that is what makes every recent own-path row forward. With $\theta$ replaced by the actual value $\max\{\omega_-(\lvert s\rvert),\omega_+(t)\}$ the same proof gives $\lvert D\rvert\to0$ as the root's emission and reception times both tend to the event.

**Lemma 3 (chord versus arc).** For $s<t$ in an interval where the velocity is continuous,

$$
\int_s^t\Bigl(v(r)-\tfrac12\lvert\mathbf x'(r)-\mathbf u_0\rvert^2\Bigr)dr\ \le\ \lvert\mathbf x(t)-\mathbf x(s)\rvert\ \le\ \int_s^t v(r)\,dr .
$$

*Proof.* The upper bound is the triangle inequality. For the lower bound project on $\mathbf u_0$: $\lvert\mathbf x(t)-\mathbf x(s)\rvert\ge\int_s^t\mathbf u_0\cdot\mathbf x'\,dr$, and $\mathbf u_0\cdot\mathbf x'=\tfrac12(v^2+1-\lvert\mathbf x'-\mathbf u_0\rvert^2)\ge v-\tfrac12\lvert\mathbf x'-\mathbf u_0\rvert^2$ because $v^2+1\ge2v$. $\square$ **Derived.** When the velocity is Lipschitz with constant $M$ on $[-\sigma,0]$ the defect over that span is at most $M^2\sigma^3/6$, cubic in the time span.

**Lemma 4 (newborn root, downward side).** Assume (D1) and a continuous velocity on $[0,\delta)$. Put $\sigma_D(t)=\sqrt{6t\,\omega_+(t)/a}$ and choose $\delta_2\le\delta_1$ so that $\sigma_D(t)\le\min\{\eta_1,a/M^2\}$ on $(0,\delta_2)$ (no second constraint if $M=0$). Then at every $t\in(0,\delta_2)$ with $v(t)<1$ there is an own-path root $s^*\in(-\sigma_D(t),t)$; it is recent, and its delay satisfies $\tau^2<2t\,(t+6\omega_+(t)/a)$. If moreover $v<1$ on $(0,t]$, every recent root lies in $(-\eta_1,0)$. *Proof.* Since $v(t)<1$, $\omega_+(t)>0$. As $s\uparrow t$, $g_t(s)/(t-s)\to1-v(t)>0$, so $g_t>0$ just below $t$. At $s=-\sigma$ with $\sigma=\sigma_D(t)$, Lemma 3 with (D1) gives $\int_{-\sigma}^0(\ldots)\ge\sigma+a\sigma^2/2-M^2\sigma^3/6\ge\sigma+a\sigma^2/3$, using $\sigma\le a/M^2$, and on $[0,t]$, where $v\ge1-\omega_+$, it gives $\int_0^t(\ldots)\ge t-t\omega_+-t\omega_+^2/2$. Hence

$$
\lvert\mathbf x(t)-\mathbf x(-\sigma)\rvert-(t+\sigma)\ \ge\ \frac{a\sigma^2}{3}-t\omega_+-\frac{t\omega_+^2}{2}=t\,\omega_+\Bigl(1-\frac{\omega_+}{2}\Bigr)>0 ,
$$

so $g_t(-\sigma)<0$. The function $g_t$ is continuous, and the intermediate value theorem gives a zero in $(-\sigma,t)$. Then $\tau<t+\sigma$ and $(t+\sigma)^2\le2t^2+2\sigma^2=2t(t+6\omega_+/a)$. If $v<1$ on $(0,t]$, the upper bound of Lemma 3 gives $g_t>0$ on $[0,t)$, so no root is emitted after the event. $\square$ **Derived.**

**Lemma 5 (newborn root, upward side).** Assume $1-v(s)\ge a\lvert s\rvert$ on $[-\eta,0]$ and a continuous velocity on $[0,\delta)$. For $t>0$ with $v(t)>1$ put $E(t)=\int_0^t\max\{v-1,0\}\,dr>0$ and $\sigma_U(t)=2\sqrt{E(t)/a}$. If $\sigma_U(t)\le\eta_1$ there is an own-path root $s^*\in(-\sigma_U(t),t)$, with $\tau<t+\sigma_U(t)$. *Proof.* As $s\uparrow t$, $g_t(s)/(t-s)\to1-v(t)<0$. At $s=-\sigma$ with $\sigma=\sigma_U(t)$ the upper bound of Lemma 3 gives $\lvert\mathbf x(t)-\mathbf x(-\sigma)\rvert\le(t+\sigma)-a\sigma^2/2+E(t)=(t+\sigma)-E(t)$, so $g_t(-\sigma)\ge E(t)>0$. The intermediate value theorem gives the root. $\square$ **Derived.** The root may be emitted before or after the event; on a curved path a root joining two outgoing times is not excluded, and Lemma 2 makes the distinction irrelevant.

**Lemma 6 (no remote own-path root, upward side).** Assume (U1). If $t\in(0,\delta_1)$ and $t\,\omega_+(t)<a\eta_1^2/2$, there is no own-path root with $s<-\eta_1$. *Proof.* For such $s$, $\int_s^tv\,dr\le(t-s)-\int_{-\eta_1}^0(1-v)\,dr+t\omega_+(t)\le(t-s)-a\eta_1^2/2+t\omega_+(t)<t-s$, using $v<1$ on the whole past, so the chord is shorter than the delay. $\square$ **Derived.**

## Proof of Theorem D

By Lemma 1 and the decomposition, for almost every $t\in(0,\delta_2)$,

$$
v'(t)=\mathbf e\cdot\mathbf S+\mathbf e\cdot\mathbf R\ \ge\ \sum_{\text{recent roots}}\frac{\mathbf n\cdot\mathbf e}{\tau^2\lvert D\rvert}-b(t).
$$

By Lemma 2 every term of the sum is positive, so $v'\ge-b$ at almost every time. At almost every time with $v(t)<1$, Lemma 4 supplies one recent root with $\tau^2<2t(t+6\omega_+(t)/a)$, and Lemma 2 gives

$$
v'(t)\ \ge\ L(t)-b(t),\qquad L(t)=\frac{5}{2t\,\bigl(t+6\omega_+(t)/a\bigr)} .
$$

Since $t+6\omega_+(t)/a\to0$, $tL(t)\to\infty$; shrink $\delta_2$ so that $L(t)\ge1/t$ on $(0,\delta_2)$.

*Part (a).* Suppose $v<1$ on $(0,\delta')$ and take $0<\epsilon<t_1<\min\{\delta',\delta_2\}$. Absolute continuity on $[\epsilon,t_1]$ gives $v(t_1)-v(\epsilon)\ge\ln(t_1/\epsilon)-\int_0^{t_1}b\,dt$. The left side is at most $1/8$ and the right side tends to $+\infty$ as $\epsilon\downarrow0$ by (D3). Contradiction.

*Part (b).* Let $b\le B_0$ and choose $\delta_3\le\delta_2$ with $L>B_0$ on $(0,\delta_3)$. Suppose $v(t_1)<1$ for some $t_1\in(0,\delta_3)$. The set $\{r\in[0,t_1]:v(r)\ge1\}$ is closed and contains $0$; let $t^*<t_1$ be its largest element. Then $v(t^*)=1$ by continuity and $v<1$ on $(t^*,t_1]$, where $v'\ge L-B_0>0$ almost everywhere. Hence $v(t_1)\ge v(\epsilon)$ for every $\epsilon\in(t^*,t_1)$, and letting $\epsilon\downarrow t^*$ gives $v(t_1)\ge1$. Contradiction. $\square$

The rate hypothesis enters only in Lemma 4, to make the excess path length $a\sigma^2/2$ beat the cubic chord defect before the event and the defect $t\omega_+$ after it. The Lipschitz hypothesis can be replaced by the weaker statement $\lvert\mathbf x'(r)-\mathbf u_0\rvert^2\le a\lvert r\rvert$ on $[-\eta,0]$, which gives $\mathbf u_0\cdot\mathbf x'(r)\ge1+a\lvert r\rvert/2$ and the same conclusion. The adjudication verified that the same $\sigma_D$ works unchanged, because the gain $a\sigma_D^2/4=1.5\,t\,\omega_+$ suffices, and that the condition $\sigma_D\le a/M^2$ then drops out (**derived**).

## Proof of Theorem U

*Step 1, the partners push forward at the event.* For $s\in(-\eta,0)$, (U2) and Lemma 1 give $1-v(s)=\int_s^0\mathbf e\cdot\mathbf B\,dr\ge a\lvert s\rvert$. The integrand tends to $\beta=\mathbf u_0\cdot\mathbf B(0)$ as $r\uparrow0$, so $\beta\ge a>0$.

*Step 2, a working interval.* By continuity of $\mathbf B$ and of the direction of motion at $0$, choose $\delta_2\le\delta_1$ with $\mathbf e(t)\cdot\mathbf B(t)\ge a/2$ on $[0,\delta_2)$ and $\delta_2\,\omega_+(\delta_2)<a\eta_1^2/2$, and so small that $\sigma_U\le\eta_1$ below.

*Step 3, the speed rises at once.* For almost every $t\in(0,\delta_2)$ the equation holds with ordinary roots. By Lemma 6 every own-path root is recent, and by Lemma 2 every recent row has positive forward component. Therefore $v'=\mathbf e\cdot\mathbf B+\mathbf e\cdot\mathbf S\ge a/2$ almost everywhere, with or without own-path roots and whatever the sign of $v-1$. Integrating on $[t_1,t_2]\subset(0,\delta_2)$ and letting $t_1\downarrow0$, the speed is strictly increasing and $\varepsilon(t)=v(t)-1\ge at/2>0$. This disposes of the case $v\le1$ after the event and of the case in which $v-1$ changes sign infinitely often: neither occurs in the class. A straight stretch at speed exactly one would carry a continuum of own-path roots with $D=0$ on a set of reception times of positive length, which the class excludes; Step 3 does not need to treat it separately.

*Step 4, the newborn root and its delay.* Since $\varepsilon$ is increasing, $E(t)\le t\varepsilon(t)$, so Lemma 5 gives a recent root with $\tau<t+2\sqrt{t\varepsilon/a}$. Using $t\le2\varepsilon/a$,

$$
\tau^2\le2t^2+\frac{8t\varepsilon}{a}\le\frac{12\,t\,\varepsilon(t)}{a}.
$$

*Step 5, the differential inequality.* Lemma 2 gives, for almost every $t\in(0,\delta_2)$,

$$
\varepsilon'(t)\ \ge\ \frac{5}{\tau^2}\ \ge\ \frac{5a}{12\,t\,\varepsilon(t)},\qquad\text{so}\qquad\frac{d}{dt}\varepsilon^2\ \ge\ \frac{5a}{6t}.
$$

Integrating on $[t_1,t_2]$, where $\varepsilon^2$ is absolutely continuous, $\varepsilon(t_2)^2\ge\varepsilon(t_1)^2+(5a/6)\ln(t_2/t_1)\ge(5a/6)\ln(t_2/t_1)$. Fix $t_2$ and let $t_1\downarrow0$: the right side is unbounded while $\varepsilon(t_2)\le1/8$. Contradiction. $\square$

The correct form of the inequality under the stated hypotheses is therefore $\varepsilon'\ge c/(t\varepsilon)$, not the form $((t-t_0)\varepsilon)^{-3/2}$ that a first heuristic suggests. The weaker exponent comes from bounding $\lvert D\rvert$ by a constant, which needs no control of the direction of motion after the event beyond continuity. A logarithmic divergence already suffices. The sharper form would need $\lvert D\rvert\lesssim\sqrt{t\varepsilon}$, which requires bounding the post-event turning of the path by the same quantity; that is an extra hypothesis and is not used.

## Asymptotics under extra smoothness

These are leading-order statements on a prescribed path, used as a control on the lemmas. The prescribed paths are not solutions. **Grade: derived as asymptotics for the prescribed path; inferred for any statement about an actual solution.** Let the path trace a $C^2$ curve with curvature $\kappa_0$ at the event, so that a chord spanning arc length $\ell$ has length $\ell-\kappa_0^2\ell^3/24+o(\ell^3)$ and makes angle $\kappa_0\ell/2+o(\ell)$ with the tangent at either end.

*Downward.* Take $v(s)=1+\alpha_-\lvert s\rvert$ before and $v(t)=1-\alpha_+t$ after. The root condition for $s=-\rho$ is $\alpha_-\rho^2/2-\alpha_+t^2/2=\kappa_0^2(t+\rho)^3/24+o(t^3)$, so with $\lambda=\sqrt{\alpha_+/\alpha_-}$,

$$
\rho=\lambda t\,(1+o(1)),\qquad\tau=(1+\lambda)\,t\,(1+o(1)),\qquad D=-\sqrt{\alpha_-\alpha_+}\;t\,(1+o(1)),
$$

and the row has magnitude $1/\bigl((1+\lambda)^2\sqrt{\alpha_-\alpha_+}\,t^3\bigr)(1+o(1))$. For $\alpha_-=\alpha_+=\alpha$ this is $\tau\approx2t$, $\lvert D\rvert\approx\alpha t$, row $\approx1/(4\alpha t^3)$, the one-dimensional control. Curvature enters only at relative order $t$: it shifts $\rho$ by $\kappa_0^2(1+\lambda)^3t^2/(24\lambda\alpha_-)$, and the net second-order term in $D$, including the effect of that shift, is $\kappa_0^2(1+\lambda)^2(2\lambda-1)t^2/(24\lambda)$. These two coefficients are the adjudication's corrections of the first version of this note, which had $12$ in place of $24$ and omitted the shift's contribution to $D$; the corrected values were confirmed numerically on a prescribed circle.

*Upward.* Take $1-v(s)=a\lvert s\rvert$ before and $v(t)-1=mt$ after. Then $\rho=t\sqrt{m/a}$, $\tau=t(1+\sqrt{m/a})$, $D=+t\sqrt{am}$ and the row is $1/\bigl(t^3(1+\sqrt{m/a})^2\sqrt{am}\bigr)$, each up to a factor $1+o(1)$, again the one-dimensional control.

*Transverse part.* The chord lags the tangent at reception by the angle $\kappa_0\tau/2$, so the row has a component of magnitude about $\kappa_0/(2\tau\lvert D\rvert)$, of order $t^{-2}$, directed away from the centre of curvature. The newborn row therefore also acts to straighten the path, at a rate one power of $t$ weaker than its forward part. The theorems do not use this.

*Self-consistent scaling (inferred).* If the outgoing excess behaved as $\varepsilon\sim t^p$ with $p<1$, the balance $a\rho^2/2\sim t^{p+1}$ gives $\tau\approx\rho\sim t^{(p+1)/2}$, $D\approx a\rho$, row $\sim t^{-3(p+1)/2}$, and matching $\varepsilon'\sim t^{p-1}$ gives $p=-1/5$, an unbounded speed, in agreement with the collinear dominant-balance exponent. Theorem U proves only the weaker rigorous statement $\varepsilon^2\ge(5a/6)\ln(t_2/t_1)$.

## Limits and falsifiers

| Statement | What would refute it, and where to look |
| --- | --- |
| Lemma 2, recent rows are forward | A path with continuous velocity near the event and an own-path root, both times within the window where the velocity is within $1/8$ of $\mathbf u_0$, whose chord makes an angle with the motion exceeding $\arccos(3/4)$ or whose transmitter factor exceeds $1/7$ in magnitude. |
| Lemma 4, root born on the downward side | A path satisfying (D1) and a time $t<\delta_2$ with $v(t)<1$ at which $g_t$ has no zero in $(-\sigma_D(t),t)$. Check the cubic defect bound $M^2\sigma^3/6$ and the choice $\sigma_D\le a/M^2$. |
| Lemma 5, root born on the upward side | A path with $1-v(s)\ge a\lvert s\rvert$ before and $v(t)>1$ after at which $g_t$ has no zero in $(-\sigma_U(t),t)$. |
| Theorem D | A solution of the unchanged equation satisfying (D1) to (D3) whose speed is below one on an interval after the event. A cancellation supplied by an opposing remainder that is not integrable is outside the hypotheses and is not a falsifier. |
| Theorem U | A solution satisfying (U1), (U2) with continuous velocity through the event. The place to look is a row with negative forward component that is neither a partner row nor a recent own-path row; Lemma 6 says there is none. |
| Applicability to the numerical releases | Measured events for which the approach rate $a$ is zero within resolution, or for which a partner root is singular at the event. Then the hypotheses fail and the theorems say nothing. |

The steps that deserve the closest independent reading are these. First, Lemma 2 carries both proofs; it relies on the chord having length exactly $\tau$ at a root, and on the absolute value in the row $+\mathbf n/(\tau^2\lvert D\rvert)$, so that the sign of $D$ never matters. Second, the continuation class requires roots to be ordinary at almost every reception time; a continuation that keeps degenerate roots on a set of positive length is excluded by definition, not by proof. Third, in Theorem U the continuity of $\mathbf B$ at the event along the continuation is used on both sides; it holds for regular partner roots because a partner row depends on the receiver's position and time and not on its velocity, but that is a hypothesis here. Fourth, Theorem D places remote own-path rows in the remainder; a receiver that has been above wake speed may have such roots, and their boundedness is assumed, not proved.

No numerical instrument was run. The asymptotic section is exact leading-order algebra on prescribed paths and agrees with the two collinear controls; that agreement tests the lemmas' geometry, not the theorems.

## Relation to the one-dimensional results

The [downward-crossing obstruction](downward-wake-speed-crossing-obstruction.md) on a line needs no rate hypothesis: the newborn root exists for an arbitrarily flat crossing, because on a line the chord equals the arc. On a curved path the chord defect competes with the excess path length, and Theorem D needs the linear rate $a>0$ together with a Lipschitz incoming velocity. The line proof integrates the row exactly by changing variable to the delay; the curved proof uses the cruder bound $\lvert D\rvert<1/7$ and $\tau^2\lesssim t\cdot o(1)$, which still gives a non-integrable forward row. Theorem D(b) has no stated one-dimensional counterpart: with bounded opposing rows the speed cannot dip below wake speed at any time just after the event.

The [class-level first-exit adjudication](../collinear-research/analysis/class-level-first-exit-independent-adjudication-2026-10-03.md) proves the collinear upward case by the same exact change of variable and also excludes velocity jumps through the measure form of the equation. Theorem U reproduces its continuous-velocity case ($U=1$) on curved paths with a different mechanism for the divergence: a differential inequality for $\varepsilon^2$ in place of the delay identity. The uniqueness of the newborn root, which holds on a line, is neither true in general nor needed on a curved path. The jump cases and the bounded-variation formulation are not extended here.
