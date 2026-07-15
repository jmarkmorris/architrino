# Dispatch Packet — The Antipodal Binary Spiral Law, Below and Above $c_f$

**Date:** 2026-07-14
**Status:** **partially executed — the circular-manifold derivation is complete and independently confirmed; the dispatched adjudication question is untouched.** Every reported evolution seeds a circular prehistory, so the collapse test was not run. See the [execution evidence](evidence/antipodal-binary-spiral-law-2026-07-14.md) and the [adjudication](evidence/antipodal-binary-spiral-law-adjudication-2026-07-14.md).
**Claim level:** the hinge relations and the complete-root $F_r,F_\theta$ are derivation-grade and independently confirmed on a 90-digit oracle. The rail's singular character is derived **on the circular family only**. Whether a prehistory-independent spiral exists is **open and not attempted**; the near-rail cubic is a **seed transient** fitted at $t/h\approx0.005$, and no attractor verdict at the rail is supported by any evolution.
**Why now:** this is the cheapest direct test of the **field-speed pin** — 2 worldlines and 4 ordered pairs against §86's 6 and 36 — and it is not blocked by the §86 cost wall.

---

Closure goal: Derive and measure the **spiral law** of the antipodal binary — how radius and speed evolve from a circular start under the master equation — in both the sub-field-speed regime ($s<1$, partner force only) and the super-field-speed regime ($s>1$, self-hit active), and state it as a formula rather than a set of trajectories.

## Why this object matters

The corpus was corrected on 2026-07-14 to say that whether a released binary converges on the field-speed rail — **the pin's dynamical content** — is open and awaits direct evolution. The pin is the durable positive the entire spindle program inherits ("the speed pin is also the size pin"), and it is currently carrying no evolved evidence at all.

The antipodal binary is the smallest object that can answer it. It is also the smallest object in the theory that exhibits both channels: partner-only anti-damping below $c_f$, and the self-hit drain above.

## The object

Two architrinos, opposite charge, antipodal on a common circle: $x_2(\tau) = -x_1(\tau)$, radius $R$ (half-separation), angular rate $\omega$, speed $v=R\omega$, and

$$
s \;=\; v/c_f .
$$

Supply a genuine circular-arc prehistory over $[-h,0]$ with $h \ge$ the largest causal delay, from the provenance-bound native factory. Every position after $t=0$ is an output of the master equation; no motion is imposed.

## Every symbol

| Symbol | Meaning |
|---|---|
| $c_f$ | **Field speed.** The one speed at which every wake propagates. A constant of the theory, not of any object. Set to $1$ throughout. |
| $q$ | **Charge quantum**, $|e|/6$. The binary carries $q_1=+q$ and $q_2=-q$, so the partner product $q_1q_2=-q^2$ (attraction) and each self product $q_iq_i=+q^2$ (repulsion). |
| $\kappa$ | **Coupling constant** of the master equation. Units $L^3/T^2$, so that $\kappa q^2/r^2$ is an acceleration. There is no mass anywhere: force *is* acceleration. |
| $R$ | **Orbit radius** of each site about the common center. The two sites are antipodal, so the separation is $2R$. |
| $\omega$ | **Angular rate** of the circular configuration. |
| $v = R\omega$ | **Speed** of each site. |
| $s = v/c_f$ | **The control parameter.** Dimensionless speed. $s<1$ sub-field-speed; $s>1$ super. Everything below is a function of $s$ alone. |
| $\Delta$ | **Delay.** How long ago the wake now arriving left its source. Different for the partner and self channels. |
| $\varphi = \omega\Delta_{\rm partner}$ | **Partner delay as a swept angle** — how far around the circle the partner has travelled since it emitted the wake being received now. Radians, dimensionless. Solves $\varphi = 2s\lvert\cos(\varphi/2)\rvert$. |
| $\delta = \omega\Delta_{\rm self}$ | **Self delay as a swept angle** — how far *you* have travelled since emitting the wake now catching you. Solves $\delta = 2s\lvert\sin(\delta/2)\rvert$; exists only for $s>1$. The absolute value is load-bearing: the self separation is a chord magnitude, and dropping it silently discards every root with $\delta>2\pi$ — real from $s\approx4.61$. |
| $\hat r$ | **Unit vector from the source's delayed position to the receiver's present position.** The direction the wake travelled. |
| $r$ | **Separation** between those two points. Equals $c_f\Delta$ by the root condition — that *is* what the root condition says. |
| $v_{\rm src}$ | Source velocity **at emission time** $t-\Delta$, not now. |
| $v_{\rm recv}$ | Receiver velocity **at reception time** $t$. |
| $D_s = c_f - \hat r\cdot v_{\rm src}$ | **Source-normal.** The rate the root residual changes with emission time. $D_s\to0$ is a caustic — the wake piling up on itself. |
| $D_T = c_f - \hat r\cdot v_{\rm recv}$ | **Receiver-normal.** Same construction at the receiving end. |
| $W^{\rm rec} = \lvert D_T/D_s\rvert$ | **Wake amplification.** How much the delayed geometry concentrates or dilutes the arriving wake. **Exactly $1$ on this object** — see below. |
| $a_r$, $a_\theta$ | Acceleration components at the receiver: **radial** (outward positive) and **tangential** (forward, along the motion, positive). |
| $F_r(s)$, $F_\theta(s)$ | **Dimensionless shape functions.** All the $R$ and $\kappa$ dependence factors out, leaving functions of $s$ alone. This is why one calculation covers the whole family. |

The single most useful intuition: $\varphi$ and $\delta$ are **angles the object swept while the wake was in flight**. $\delta>\pi$ means the wake took longer than half a turn to catch you.

## Analytic anchors — derived, and to be reproduced as gates

For the antipodal pair the delayed separation is exact:

$$
|x_1(t)-x_2(t-\Delta)| \;=\; |x_1(t)+x_1(t-\Delta)| \;=\; 2R\left|\cos(\omega\Delta/2)\right| .
$$

Setting this equal to $c_f\Delta$ and writing $\varphi=\omega\Delta$ gives the **partner hinge**

$$
\boxed{\;\varphi \;=\; 2s\left|\cos(\varphi/2)\right|\;}
$$

the companion of the known **self hinge** $\delta_s = 2s\lvert\sin(\delta_s/2)\rvert$ (binary-dynamics.md:323). Chord versus diameter; sine versus cosine.

Three consequences, each a gate the engine must reproduce:

1. **The self-hit exists if and only if $s>1$.** Since $\lvert\sin x\rvert\le x$ with equality only at $0$, no $\delta>0$ solves the self hinge for $s\le1$.
2. **Onset is a square-root branch.** Expanding $\delta = 2s\sin(\delta/2) \approx s\delta - s\delta^3/24$ gives

$$
\delta \;\simeq\; \sqrt{24(s-1)/s}\qquad (s\to1^+),
$$

   verified against the exact root to 5 significant figures at $s-1=10^{-6}$ and to 0.7% at $s=1.05$. The self separation is $r_{\rm self}=c_f\delta \sim \sqrt{s-1}$, so a self force $\sim 1/r^2$ **diverges as $s\to1^+$**. The brake switches on at the rail with infinite slope in $s$. This is the pin mechanism, stated analytically.
3. **Roots multiply with $s$, on a closed-form schedule.** Unique for $s\lesssim2$; at $s=3$ the partner roots are $\varphi \in \{2.340242, 5.326358, 5.876201\}$ and at $s=5$, $\{2.61288, 3.954766, 7.674934\}$ — the receiver sees several past positions of its partner at once. Root completeness must be certified, not assumed, and a missed root is a silent force error.

   **Certified in closed form (2026-07-14).** A root pair is born where the line $y=\delta$ goes tangent to $y=2s\lvert f(\delta/2)\rvert$; both tangencies sit at radius $2\sqrt{s^2-1}$ and differ only by the subtracted angle:

$$
\text{partner: }\;\sqrt{s^2-1}+\arcsin(1/s)=\pi m,
\qquad
\text{self: }\;\sqrt{s^2-1}-\arccos(1/s)=\pi m,
\qquad m\ge1 .
$$

   Since $\arcsin(1/s)+\arccos(1/s)=\pi/2$ the two families interleave. Counting is then free at any $s$: $n_P = 1+2\,\#\{m\ge1: s\ge s^\star_{P,m}\}$, and $n_S=0$ for $s\le1$ else $1+2\,\#\{m\ge1: s\ge s^\star_{S,m}\}$. Thresholds: partner $2.9716938707$, $6.2023952856$, $9.3713731865$; self $4.6033388488$, $7.7897057675$, $10.9498798698$. Confirmed against an independent bracket scan — every scan transition is the first grid point at or above its closed-form threshold, and no transition occurs elsewhere. **The self family was already in the corpus** at `binary-dynamics.md:868`; the partner family is its companion. Certify per row against this schedule rather than trusting a solver's count.

**Cross-check already passed.** At $s=2$ the self hinge gives $\delta_s = 3.7909885341$. The §86 theorem gate independently certified $\delta_s = 3.7909885379$ on the native engine with hinge residual $6.23\times10^{-9}$. Derivation and engine agree to 9 digits by separate routes.

## The circular-manifold force law — derived

$W^{\rm rec}\equiv1$ on this object, exactly, in both channels. At the receiver, $\hat r\cdot v_{\rm src} = \hat r\cdot v_{\rm recv}$ identically — partner and self alike — so $D_s = D_T$ and the amplification cancels. The whole force is geometry.

Partner: $\hat r = (\cos\tfrac\varphi2,-\sin\tfrac\varphi2,0)$, $r = 2R\cos\tfrac\varphi2$, $D_s = D_T = 1 + s\sin\tfrac\varphi2$.
Self: $\hat r = (\sin\tfrac\delta2,\cos\tfrac\delta2,0)$, $r = 2R\sin\tfrac\delta2$, $D_s = D_T = 1 - s\cos\tfrac\delta2$.

With $a_r = -(\kappa q^2/R^2)F_r(s)$ and $a_\theta = +(\kappa q^2/R^2)F_\theta(s)$:

$$
\boxed{\;
F_r(s) = \frac{s}{2\varphi} - \frac{s}{2\delta},
\qquad
F_\theta(s) = \frac{s^2\sin(\varphi/2)}{\varphi^2} + \frac{s^2\cos(\delta/2)}{\delta^2}
\;}
$$

the $\delta$ terms present only for $s>1$.

**Scope — this is the primary-root form, and it is only the whole force while both root sets are singletons, i.e. $s\lesssim2.99$.** Above that the roots multiply and the force is the complete root sum over $\mathcal P(s)$ and $\mathcal S(s)$; see the [evidence packet](evidence/antipodal-binary-spiral-law-2026-07-14.md). Root-set transitions $(n_P,n_S)$, confirmed on the 90-digit oracle: $(1,0)\to(1,1)$ at $s\approx1.01$, $\to(3,1)$ at $s\approx2.99$, $\to(3,3)$ at $s\approx4.61$, $\to(5,3)$ at $6.21$, $\to(5,5)$ at $7.79$, $\to(7,5)$ at $9.39$. Using this form above $s\approx3$ is a silent force error.

**Cross-checked:** at $s=0.5$, $R=1$, coupling $\kappa q^2 = 2s\varphi$ (which places radial balance at $R=1$), this gives $a_r=-0.25$ and $a_\theta=+0.120820385$. The §86 theorem gate independently measured $-0.2499946541$ and $+0.1208179726$ on the native engine. Two routes, agreement to the engine's own numerical error.

Radial balance therefore admits one radius per speed,

$$
R_\star(s) = \frac{\kappa q^2 F_r(s)}{s^2c_f^2},
$$

the speed-pin/size-pin identity made explicit.

### What the derivation already settles

- **$F_\theta(s)>0$ at every $s$ from $0.25$ to $10$**, on the **complete** root sums, minimum $+0.0638$ at $s=0.25$ — independently confirmed on the 90-digit oracle. The tangential push is forward everywhere. **No circular configuration of the antipodal binary is an equilibrium at any speed, sub- or super-$c_f$** — a T1 negative on the circular family, needing no evolution.
- **The self-hit pumps at onset; it does not brake.** $F_\theta^{\rm self}\propto\cos(\delta/2)$, which is *positive* for $\delta<\pi$. At $s=1.05$ the self term is $+0.816$ against the partner's $+0.328$ — it pumps $2.5\times$ harder. The geometric reason: your past position is *behind* you, so repulsion from it drives you *forward*.
- **The self term becomes a brake only above $s=\pi/2\approx1.5708$**, where $\delta$ passes $\pi$ and your past position is angularly ahead. It never wins: at $s=10$ the complete-root self brake is $-1.506$ against a partner pump of $+4.827$.
- **A net-repulsive window just above the rail.** $F_r(1.05) = -0.142 < 0$: the self-repulsion briefly beats the partner attraction and the net radial force is *outward*. The window is exactly $(1,\;\pi/(2\sqrt2))$, closing at $s_R=1.1107207345$ where $u=w=\pi/4$.

**Corrected 2026-07-14 by the [adjudication](evidence/antipodal-binary-spiral-law-adjudication-2026-07-14.md).** This section originally quoted the primary-root formula at $s$ where the root sets are not singletons: $-2.95$ against $+12.14$ at $s=10$, and $F_r(3)=+0.312$. The complete-root values are $-1.506$, $+4.827$, and $F_r(3)=+0.849$. The conclusions are unaffected — $F_\theta>0$ everywhere and the self-brake never wins, both re-confirmed on complete roots — but every magnitude above $s\approx3$ was wrong, and the error propagated into the successor adjudication briefing as an oracle-verified result. The reasoning error is the durable part: a formula was carried past the regime where its own root-multiplicity caveat, stated three paragraphs earlier in this same packet, still held.

## The target — does a prehistory-independent spiral exist at all?

The closed form above is exact **on the circular manifold** only, and the circular manifold is a choice, not a fact.

This is a delay-differential system: the future is determined by the entire history on $[-h,0]$, and **any** history is admissible. The state is a *function*, not a point. So there is no "the spiral" — there is a spiral for every prehistory. A circular prehistory does not approximate the answer; it selects one. Every temporal result in this program that seeded a circular prehistory and reported what happened has this problem, and it has never been named.

**"The spiral" is only well-defined if it is an attractor.** Delay systems typically have finite-dimensional attractors; if one exists here, almost any prehistory converges to it and the late-time law is seed-independent. That is the question, and it is prior to any formula.

### The exponential ansatz is already dead

A logarithmic spiral is self-similar — the same shape at every scale — which forces the swept angles $\varphi,\delta$ to be constant. The hinge $\varphi=2s\cos(\varphi/2)$ is a bijection $\varphi\leftrightarrow s$, so constant $\varphi$ means **constant $s$**, hence constant $v$. But $\dot v = a_\theta = (\kappa q^2/R^2)F_\theta(s)$ with $F_\theta>0$ strictly and $R$ finite, so $\dot v>0$ strictly. Contradiction: **no self-similar spiral exists.**

A single fitted exponent therefore cannot be self-consistent, and a fixed-point iteration on one would fail to converge. Do not spend the campaign on it. (Scope: $F_\theta>0$ is proven on the circular family; extending it to a spiral is a conjecture with a clear proof route via the positive-tangential-work theorem. Hold it there.)

### The measurement — phase-plane collapse

Seed **several materially different prehistories** at the same $(R_0,s_0)$ at $t=0$: exactly circular; a log-spiral-in; a log-spiral-out; a perturbed/noisy variant. Evolve each well past the memory depth $h$ — the run is meaningless while the future is still being driven by the seeded segment.

Then plot each trajectory **not against $t$** — that is seed-dependent and tells you nothing — but as a **phase curve $s$ versus $R$**.

- **If the curves collapse onto one**, that curve *is* the spiral law: prehistory-independent, ansatz-free, and exactly the wanted formula $s(R)$. Fit it only after the collapse is shown, and the fit is then derived rather than seeded.
- **If they do not collapse**, there is no spiral — only a seed-indexed family — and that is equally the answer. Report it as such.

Report the collapse test itself: the spread between seeds versus $t/h$, and whether it shrinks.

### Then the crossing

If a collapse curve exists, evolve along it from $s<1$ and let the speed run up through the rail. Report what happens as $s\to1^+$ and the self-hit switches on with its square-root branch — including whether the derived net-repulsive window at $s\approx1.05$ appears in a true evolution.

### Why this is the template

If phase-plane collapse works here — on the cheapest object in the theory — it is the method every quarantined T3 temporal claim needs: §83 release, §60 expansion, the collinear breather. Each of those currently means "we chose a prehistory and reported what happened." That is the same error at larger scale, and it has never been stated.

## Coverage

- **Sub-$c_f$ family:** $s \in \{0.25, 0.5, 0.75, 0.95\}$. No self-hit, no folds — these are cheap. The $s=0.5$ case has a datum: the §86 theorem gate evolved $R:1\to1.1532465269$ and $v:0.5\to0.6886482862$ through $T=2$ with 200 accepted steps and zero rejections, ending at radial velocity $+0.2150273963$. Reproduce it as the anchor before extending.
- **Super-$c_f$ family:** $s \in \{1.05, 1.2, 1.5, 2.0, 3.0\}$. The self-hit is active; $s=3$ exercises multi-root partner completeness.
- **Near the rail:** $s = 1 \pm \{10^{-1}, 10^{-2}, 10^{-3}\}$, approached from both sides. Expect this to be the expensive part — the square-root branch means the self force varies infinitely fast in $s$ at the rail, and a step controller will feel it.
- **Horizon:** long enough for $R$ and $s$ to move a measurable fraction, on both sides. Report cycles reached, not just $t$.

## Discipline

- Convergence in step size, memory depth $h$, and prehistory segment width, on at least one case per family. A spiral rate that moves under refinement is not a rate.
- Root completeness certified at every $s$; multi-root cases fail closed rather than taking the first root.
- Report the object: charges, radius, speed, $s$, coupling, prehistory depth, field speed, steps attempted vs accepted.
- `src/eom` as-is; architrino-level, no mass and no $mv$ — $a_r$ and $a_\theta$ are accelerations, and "centripetal need" means $v^2/R$, not a force on a mass; "delayed", never the disallowed variant; KaTeX.

## The refuted prediction, recorded

This packet originally sealed an adjudicator prediction: that the self-hit is the only sink, diverges as $s\to1^+$, and therefore makes $s=1$ a two-sided attractor — the field-speed pin on the smallest possible object.

**That prediction is refuted by the derivation above, before any run.** The self-hit does not brake at onset; it pumps, and harder than the partner. The error was assuming that "self-repulsion is the only sink" (true in the collinear head-on case, where the geometry is one-dimensional) carries over to a curved orbit. It does not: on a circle your past position sits *behind* you, so repulsion from it is a forward push. The sink only appears past $\delta=\pi$, and it never overcomes the partner pump.

It is recorded rather than deleted because it is the reason the derivation was worth doing, and because the same reasoning error — importing a sign from a different geometry — is available to anyone reading this next.

**Nothing is now predicted about the evolved trajectory.** The circular-manifold tendency is derived; where the true evolution goes is open, and no expectation should be read into the run.

## Consequence for the corpus — a live contradiction

`content/markdown/aaa/noether-braid/spindle-braid.md` states the field-speed pin twice, incompatibly:

- **line 108** — the edge is a two-sided attractor "precisely when $\varrho>1$, a condition the declared coincidence stratum satisfies with wide margin ($\varrho\approx50$)";
- **line 118** — the same-source channel's "supply caps near two-thirds of the rail pump, so no brake-equals-pump regime exists and the channel cannot hold its own rail" — i.e. $\varrho\approx0.67$.

$\varrho\approx50$ and $\varrho\approx0.67$ in one chapter. This derivation gives $\varrho = |F_\theta^{\rm self}|/F_\theta^{\rm partner} \approx 0.11$ at $s=2$ and $\approx0.31$ at $s=10$ on complete roots — an independent third route, on the brake-loses side. ($\varrho$ rises monotonically over the dispatched range but does not approach $1$: $0.21$ at $s=3$, $0.27$ at $s=5$.)

Scope: this is the *isolated* binary; the corpus means the spindle's middle rail layer, which has two other layers pushing, and line 108's $\varrho\approx50$ invokes a regulated click channel at a declared coincidence stratum with a short-distance scale that the bare point-charge calculation does not carry. Different objects. But two independent routes now say the self-brake is weak and one says it is overwhelming, and the $\varrho\approx50$ line appears superseded by the later regulator-converged measurement in its own chapter without ever being reconciled. Flagged for adjudication; not corrected here.

## On return — adjudicated 2026-07-14

Verdict: **the derivation lands; the dispatched question was not attempted.** Full record in the [adjudication](evidence/antipodal-binary-spiral-law-adjudication-2026-07-14.md). Summary:

- **Confirmed on an independent 90-digit oracle** (closed forms to $\le6\times10^{-42}$; $s_R=\pi/(2\sqrt2)$ to $2.7\times10^{-51}$; $24\varepsilon F_\theta\to1$; $F_\theta>0$ on complete roots across $[0.25,10]$). The T1 negative — no circular equilibrium at any speed, no field-speed pin on the bare binary — stands independently confirmed.
- **Not attempted:** the collapse test. Every reported evolution seeds a circular prehistory. Zero materially different seeds, no $s$-versus-$R$ phase curves across seeds, no seed spread against $t/h$.
- **Demoted:** $R(s)=R_0+0.1366559777(s-0.95)^3$ is a **seed transient**, not a law. Its window is $t=0.0205$ against a partner delay of $0.4988$ — $4.1\%$ of one delay, $t/h\approx0.005$. The packet's own explanation ($\dot R(0)=\ddot R(0)=0$) is the concession: it is the leading Taylor coefficient of the launch.
- **Withdrawn:** "not a two-sided attractor." The prediction's *mechanism* is refuted (the self-hit pumps), but no evolution bears on whether the rail attracts, and "two-sided" is vacuous while no through-rail continuation exists.
- **Held at the circular family:** the rail's singular character. The caustic $D_s^{\rm self}=1-s\cos(\delta/2)\to1-s\to0$ is expected to be generic; that has not been shown off the circular manifold.

The remaining work is item 1 below, and it is the whole point of the packet.

Closure goal (next): run the dispatched collapse test at $s_0=0.5$, $R_0=1$ — four materially different prehistories (circular, log-spiral-in, log-spiral-out, perturbed), evolved past $h$, plotted as $s$ versus $R$, with seed spread reported against $t/h$ — and fix the anchor coupling to $K_\star=2s\varphi=0.90036722258974714607$. Do not run the rail crossing until the collapse verdict is in: if the curves do not collapse there is no spiral to run up to the rail, and that row is the campaign's most expensive. If the pin later holds on the binary, carry $F_r$, $F_\theta$, and $R_\star(s)$ into the spindle's rail layer, where the same pin is asserted and currently unevidenced.

## On return — sub-field collapse test executed 2026-07-14

Verdict: **the curves do not collapse.** The [four-seed phase-collapse
evidence](evidence/antipodal-binary-phase-collapse-2026-07-14.md) evolves the
circular, log-spiral-in, log-spiral-out, and perturbed histories to at least
$2h$ at $s_0\in\{0.25,0.5,0.75\}$, with the corrected $K_\star$ and no
rail-crossing row. The $s_0=0.25$ family was then extended unchanged through
$t=65=6.5h$ as the slow-attractor overturn test.

At common post-memory radius, the seed spread $\Delta s(R)$ for $s_0=0.25$
dips only from $0.13881$ to $0.13604$ and then grows to $0.14399$ across
$R\in[4.4067,8.6568]$. It grows from $0.0477$ to $0.0536$ for $s_0=0.5$ and
from $0.0289$ to $0.0311$ for $s_0=0.75$. At $s_0=0.25$ the relative
synchronized speed spread is $39.4\%$ at $2.5h$ and $38.1\%$ at $6.5h$.
The apparent radius convergence is a catch-up crossing: $\Delta R$ reaches
$0.35984$ at $t=28.68$ and then reopens to $6.9339$ at $t=65$. All production
evolutions remain below $c_f$, keep the analytic source-normal floor positive,
and complete with zero rejected steps. Step, segment-width, memory-depth, and
live-engine parity refinements leave the negative unchanged.

Therefore no prehistory-independent spiral law $s(R)$ is measured on the
antipodal binary. The answer is the seed-indexed family. No exponent was fitted.
The rail-caustic and token-dominance/MPFR discrimination test was not attempted
and is stopped by operator direction.
