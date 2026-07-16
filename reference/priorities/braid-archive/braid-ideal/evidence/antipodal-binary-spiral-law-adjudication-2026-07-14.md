# Adjudication — Antipodal Binary Spiral Law Campaign — 2026-07-14

Adjudicates the [dispatch packet](../antipodal-binary-spiral-law-dispatch-packet.md) and the [execution evidence](antipodal-binary-spiral-law-2026-07-14.md).

**Instrument used by this adjudication:** [scripts/eom/antipodal-binary-hinge-oracle.py](../../../../../scripts/eom/antipodal-binary-hinge-oracle.py) — an independent 90-digit `mpmath` oracle written for this adjudication. It restates the hinge geometry from first principles and imports `mpmath` and nothing else: not `src/eom`, not the `scripts/eom/oracle` package, not any artifact of the campaign's C++ instrument. Complete positive root sets are found by float sign-change bracketing on $(0,2s]$ and polished by bisection at 90 decimal digits. Per [Evidence Independence](../../../../../AGENTS.md#evidence-independence), it is the second side; the campaign's native engine is the first.

```bash
python3 scripts/eom/antipodal-binary-hinge-oracle.py        # audit table, ~4 s
```

## Verdict

**The dispatched question was not answered. The campaign's status is not `executed`.**

The dispatch's target section is titled "does a prehistory-independent spiral exist at all," and its measurement is phase-plane collapse across **several materially different prehistories** at the same $(R_0,s_0)$. The evidence packet seeds **one** prehistory class — circular — in every evolution it reports. No collapse test was attempted, no seed spread against $t/h$ was reported, and no phase curve $s$ versus $R$ was plotted across seeds. The adjudication question is untouched.

Split disposition:

| Component | Level | Basis |
|---|---|---|
| Complete-root circular force law $F_r,F_\theta$ | **derivation-grade, independently confirmed** | reproduced exactly on the 90-digit oracle |
| $s_R=\pi/(2\sqrt2)$, rail asymptotics, self-root threshold | **derivation-grade, independently confirmed** | reproduced exactly on the 90-digit oracle |
| "The rail is a singular boundary" | **derivation-grade on the circular family only** | the formula that diverges is a circular-manifold identity |
| "Not a two-sided attractor" | **unsupported — withdraw** | no evolution establishes it; see below |
| $R(s)=R_0+0.1366559777\,(s-0.95)^3$ | **seed transient — demote, unbox** | fitted at $t/h\approx0.005$ |
| Does a prehistory-independent spiral exist | **open, not attempted** | one seed class |

## What reproduces

Every analytic result in the evidence packet reproduces on the independent oracle. This is the campaign's real yield and it is solid.

- Closed forms $F_r=1/(4\cos u)$, $F_\theta=\sin u/(4\cos^2u)$ with $s=u/\cos u$: residual $\le6\times10^{-42}$ at every sub-rail $s$ tested.
- One-partner/one-self sheet $F_r=1/(4\cos u)-1/(4\sin w)$, $F_\theta=\sin u/(4\cos^2u)+\cos w/(4\sin^2w)$: residual $\le3.5\times10^{-41}$ at $s=1.05,1.2,1.5,2$.
- $s_R=\pi/(2\sqrt2)=1.1107207345395915618$ with $F_r(s_R)=2.7\times10^{-51}$. The $F_r<0$ window is exactly $(1,s_R)$ on a $0.02$ grid.
- Rail asymptotics: $24\varepsilon F_\theta\to1$ ($1.0000071$ at $\varepsilon=10^{-6}$). Onset $\delta\simeq\sqrt{24(s-1)/s}$ to relative $1.5\times10^{-7}$ at $\varepsilon=10^{-6}$; exact root $0.0048989777709246$ against the packet's $0.0048989777706154322$.
- $\delta(1.05)=1.0768233446760229$ — 16 digits.
- $K=s^2/F_r$ at $s=1.2$ is $19.463737646797168$ against the packet's $19.463737646797217$ — 15 digits, confirming the packet's complete-root $F_r$ machinery matches this oracle's.
- $F_\theta>0$ on the **complete** root sums across the whole dispatched range $s\in[0.25,10]$, minimum $0.0638$ at $s=0.25$. **The headline T1 negative survives independent confirmation: no circular configuration of the antipodal binary is an equilibrium at any speed, and there is no field-speed pin on the bare binary.**

## Advancement — a closed-form root-count certificate for both channels

The dispatch requires that "root completeness must be certified, not assumed, and a missed root is a silent force error," and both packets discharge it **per row, numerically**. It can be discharged **analytically, at every $s$ at once**, and half of it was already in the corpus.

New root pairs are born at tangency of the line $y=\delta$ with $y=2s\lvert f(\delta/2)\rvert$: the two conditions are $g(\delta)=\delta$ and $g'(\delta)=1$.

**Self channel** ($f=\sin$). On a branch with $\sin(\delta/2)<0$: $g=-2s\sin(\delta/2)$, $g'=-s\cos(\delta/2)$, so tangency needs $\cos(\delta/2)=-1/s$, whence $\delta=2s\sqrt{1-1/s^2}=2\sqrt{s^2-1}$ and $\delta/2=\pi m+\arccos(1/s)$. Therefore

$$
\boxed{\;\sqrt{s^2-1}-\arccos(1/s)=\pi m\;}\qquad m\ge1 .
$$

This is exactly the higher-winding threshold already carried at `content/markdown/aaa/dynamics/binary-dynamics.md:868`.

**Partner channel** ($f=\cos$) — its companion, by the same route. On a branch with $\cos(\delta/2)<0$: $g=-2s\cos(\delta/2)$, $g'=s\sin(\delta/2)$, tangency needs $\sin(\varphi/2)=1/s$, whence $\varphi=2\sqrt{s^2-1}$ and $\varphi/2=\pi m-\arcsin(1/s)$. Therefore

$$
\boxed{\;\sqrt{s^2-1}+\arcsin(1/s)=\pi m\;}\qquad m\ge1 .
$$

Both families share the radius $\varphi=\delta=2\sqrt{s^2-1}$ at birth and differ only by the angle subtracted; since $\arcsin(1/s)+\arccos(1/s)=\pi/2$, the partner and self thresholds **interleave**. Counting is then closed form: $n_P=1+2\,\#\{m\ge1:s\ge s^\star_{P,m}\}$, and $n_S=0$ for $s\le1$, else $1+2\,\#\{m\ge1:s\ge s^\star_{S,m}\}$.

**Independently confirmed, by two separate routes.** The closed forms above against this adjudication's bracket-scan transitions on a $0.02$ grid:

| | $m=1$ | $m=2$ | $m=3$ |
|---|---:|---:|---:|
| partner threshold, closed form | $2.971693870713802$ | $6.202395285573132$ | $9.371373186453026$ |
| partner, first grid point with $n_P$ raised | $2.99$ | $6.21$ | $9.39$ |
| self threshold, closed form | $4.6033388487517$ | $7.789705767492725$ | $10.94987986982627$ |
| self, first grid point with $n_S$ raised | $4.61$ | $7.79$ | — |

Every scan transition is the first grid point at or above its closed-form threshold, and no scan transition occurs anywhere else. A closed form and a sign-change scan are the independent reference [Evidence Independence](../../../../../AGENTS.md#evidence-independence) asks for, and they agree.

**Two consequences.** First, root completeness on the circular family is now certified by formula rather than per row, at any $s$, for free. Second — and this is the uncomfortable one — the corpus already had the self half, at the file the dispatch cites as its source for the self hinge (`binary-dynamics.md:323`). The dispatch restated that file's principal branch as if it were the whole equation and dropped the winding family sitting 500 lines below it. The campaign's multi-root surprises at $s=3$ and $s=5$ were not discoveries; they were a regression against material already promoted.

## Defect 1 — the cubic is a seed transient, boxed as a law

The evidence packet boxes

$$
R(s)=R_0+0.1366559777\,(s-0.95)^3
$$

as the near-rail run's "measured path." At that launch $s_0=0.95$, $R_0=0.33070936489917174$, so $\omega=2.872612937$ and $\varphi(0.95)=1.432881171$, giving a **partner delay of $0.4988076023$**. The run terminates at $t=0.0205$.

$$
\frac{t_{\rm final}}{\Delta_{\rm partner}}=0.0411,
\qquad
\frac{t_{\rm final}}{h}\approx0.005\!-\!0.008
$$

against the packet's own declared $h\in[2.5,4]$. The fit lives inside **4% of a single causal delay** — the entire window is still being driven by the seeded segment. The dispatch's discipline is explicit: *"No exponent fitted below one memory depth."* This is a direct violation, and the packet concedes the mechanism in its own next sentence: *"The cubic onset follows the balanced launch conditions $\dot R(0)=\ddot R(0)=0$."* That is the statement that the cubic is the leading Taylor coefficient of the seed's launch transient. The $9.5\times10^{-5}$ relative-span residual measures how cleanly a cubic fits a cubic-by-construction launch, not how well a law fits the object.

**Action:** unbox, demote to `seed transient`, and state the launch-condition origin as its explanation rather than as its corroboration. Compare the standing precedent in the work log: $0.60113$ was already classed a seed transient for the same reason.

## Defect 2 — no run clears a memory depth except one, and it is one seed

| Run | duration | delay at launch | late-time delay | verdict |
|---|---:|---:|---:|---|
| $s=0.5$, $T=2$ anchor | 2 | 1.8007344 | — | 1.11 delays |
| $s=0.5$, $T=6$ extension | 6 | 1.8007344 | 4.9164908 | $\approx1.2$ **late-time** delays; $1.5h$ |
| $s=0.95$ near-rail | 0.0205 | 0.4988076 | — | 0.041 delays |
| $s=1.2$ super-field control | $10^{-4}$ | — | — | one step; packet correctly calls it directional |

The $T=6$ extension is the only run that clears one memory depth, and only just: as $R$ grows to $2.874$ and $s$ falls to $0.637$ the partner delay grows to $4.92$, so six time units buy roughly one *late-time* delay. It is also a single circular seed. The claim that the $s=0.5$ path "never reaches the field-speed rail" is therefore a statement about one prehistory, not about the object.

## Defect 3 — the dispatch's $s=5$ and $s=10$ figures are single-root and wrong

The dispatch's "What the derivation already settles" quotes the primary-root formula at $s$ where the root sets are not singletons. Complete-root transitions on the oracle: $(n_P,n_S)$ goes $(1,0)\to(1,1)$ at $s\approx1.01$, $\to(3,1)$ at $s\approx2.99$, $\to(3,3)$ at $s\approx4.61$, $\to(5,3)$ at $6.21$, $\to(5,5)$ at $7.79$, $\to(7,5)$ at $9.39$.

| $s$ | quantity | dispatch (primary root) | complete roots |
|---:|---|---:|---:|
| 3 | $F_r$ | $+0.3118$ | $+0.8487$ |
| 3 | $\varrho=\lvert F_\theta^{\rm self}\rvert/F_\theta^{\rm partner}$ | $0.1862$ | $0.2144$ |
| 5 | $F_\theta^{\rm partner}$ | $+3.5346$ | $+2.3386$ |
| 5 | $F_\theta^{\rm self}$ | $-0.7928$ | $-0.6310$ |
| 10 | $F_\theta^{\rm partner}$ | $+12.1419$ | $+4.8266$ |
| 10 | $F_\theta^{\rm self}$ | $-2.9452$ | $-1.5062$ |
| 10 | $\varrho$ | $0.2426$ | $0.3121$ |

The **conclusions survive** — $F_\theta>0$ everywhere and the self-brake never wins — but every quoted magnitude above $s\approx3$ is wrong, and the corpus-contradiction adjudication in the dispatch's final section rests on $\varrho\approx0.24$ at $s=10$, which should read $\varrho\approx0.31$. Still on the brake-loses side; the contradiction verdict is unchanged.

The evidence packet is not at fault here: it carries the complete-root sums and correctly limits its positivity claim to "through $s=3$," which is exactly its native coverage. The defect is in the dispatch packet and in everything downstream that copied it, including the successor adjudication briefing.

## Defect 4 — the dispatch states the self hinge without its absolute value

The dispatch and the [handoff prompt](../../../../op/jughead-adjudication-handoff-prompt.md) both give the self hinge as $\delta=2s\sin(\delta/2)$. The self separation is a chord magnitude, $\lvert x_1(t)-x_1(t-\Delta)\rvert=2R\lvert\sin(\omega\Delta/2)\rvert$, so the hinge is

$$
\delta = 2s\left\lvert\sin(\delta/2)\right\rvert .
$$

Without the absolute value every self root with $\delta>2\pi$ is invisible, because $\sin(\delta/2)<0$ there. Those roots are real: at $s=5$ the oracle finds $\delta\in\{5.1914781593,\,8.2092397011,\,9.8125903017\}$, the last two of which the unsigned form silently drops. The forms agree only for $s\lesssim4.61$. The evidence packet has the correct form; the dispatch does not.

## Defect 5 — the declared $s=0.5$ coupling is not the balance coupling

The evidence packet declares $K=32.4125179963575/36=0.90034772212104166667$ for a start it calls radially balanced at $s=0.5$, $R=1$. Radial balance there requires

$$
K_\star=\frac{s^2c_f^2}{F_r(0.5)}=0.90036722258974714607 = 2s\varphi,
$$

exactly the dispatch's own prescription $\kappa q^2=2s\varphi$. The declared coupling misses it by $2.17\times10^{-5}$ relative, leaving a residual radial acceleration of $+5.41\times10^{-6}$ at a launch declared balanced. The same packet computes $K=s^2/F_r$ correctly to 15 digits at $s=1.2$, so this reads as a legacy number carried forward rather than recomputed. $R_0=0.33070936489917174$ for the $s=0.95$ start is self-consistent with the declared $K$ to 15 digits, so that launch *is* balanced — on a coupling $2.2\times10^{-5}$ away from its stated definition. Small, but it is the anchor every other row inherits, and a launch condition quoted to 17 digits should be the condition it names.

## Defect 6 — an independence smell on the $\delta(2)$ cross-check

The dispatch calls this the campaign's proof of independence: *"At $s=2$ the self hinge gives $\delta_s=3.7909885341$. The §86 theorem gate independently certified $\delta_s=3.7909885379$ … Derivation and engine agree to 9 digits by separate routes."*

The oracle's exact root is $\delta_s(2)=3.790988534073$.

| route | value | error vs exact |
|---|---|---:|
| packet's analytic value | $3.7909885341$ | $\approx3\times10^{-11}$ |
| campaign's native engine | $3.7909885373523533$ | $3.3\times10^{-9}$ |
| §86 theorem gate | $3.7909885379$ | $3.8\times10^{-9}$ |

The packet's pencil-and-paper value is the accurate one. The two *engine-side* routes are each wrong by $\approx3.5\times10^{-9}$ and agree **with each other** to $6\times10^{-10}$ — roughly five times better than either agrees with the truth. That is the shape of a shared error, not of two independent routes: a common root-finder tolerance is the obvious candidate. It is inside the declared $6.23\times10^{-9}$ hinge residual, so nothing downstream breaks, and the agreement is real evidence — but it is evidence about the root-finder, and the claim should read "agree to 8 digits" rather than 9. This is the [Evidence Independence](../../../../../AGENTS.md#evidence-independence) pattern in miniature: *"when a result is convenient, is precise, and has only one instrument behind it, treat the precision as a warning rather than a reassurance."* Two instruments here, one tolerance.

## Claim-level correction — "not a two-sided attractor"

The evidence disposition tag reads `field_speed_rail_is_a_singular_boundary_not_a_two_sided_attractor`. The second half must be withdrawn. What was actually established:

1. **The original prediction's *mechanism* is refuted.** The self-hit pumps at onset; it does not brake. The dispatch already records this and the oracle confirms it. But refuting a mechanism is not refuting its conclusion.
2. **"Two-sided" is vacuous from above.** The packet's own finding is that no classical through-rail continuation exists, and the only super-rail evolution is a single $10^{-4}$ step. There is no above-rail dynamics to be attracted or repelled.
3. **From below, the two seeds disagree and neither is decisive.** The $s=0.95$ start runs *toward* the rail ($\dot s>0$ throughout, reaching $0.99916$) — which is what attraction from below looks like. The $s=0.5$ start peaks at $s=0.7015$ and falls away. Two different $(R_0,s_0)$, one seed class each, one of them 4% of a delay long.

The honest statement is: *the prediction that the rail is a two-sided attractor is refuted at its mechanism; whether the rail attracts is unmeasured, and the instrument that would measure it — the collapse test — was not run.*

Similarly, `field_speed_rail_is_a_singular_boundary` is derivation-grade **on the circular family**. The divergence $F_\theta\sim1/(24\varepsilon)$ is an identity of the circular hinge, and the hinge is a circular-motion statement. The mechanism that makes it plausibly generic is the caustic named in the dispatch: $D_s^{\rm self}=1-s\cos(\delta/2)\to1-s\to0$ as $s\to1^+$, because $\delta\to0$. That is a genuine caustic — the self-wake goes tangential — and it does not obviously depend on the path being a circle. But "does not obviously depend" is a conjecture with a proof route, not a result. Hold it at: *derived on the circular family; the caustic mechanism is expected to be generic and that has not been shown.*

## This adjudicator's inherited error, recorded

The successor briefing that opened this thread carried, as "WHAT IS ALREADY DERIVED … verified on the independent 90-digit oracle," both the unsigned self hinge $\delta=2s\sin(\delta/2)$ and the single-root $s=10$ figures ($-2.95$ against $+12.14$). Neither is right, and neither had been verified on the oracle at the stated coverage — they were carried from the dispatch's primary-root section and re-labelled as oracle-verified in transit. The role's own [watch-for](../../../../op/jughead-adjudication-handoff-prompt.md) says each past error was caught by measuring rather than by reasoning; this one is the same, and the specific failure is that a handoff summary promoted its source's claim level by paraphrase. Recorded rather than deleted, per the packet's own convention.

## Required before this campaign can be called executed

1. **Run the collapse test as dispatched.** Four seeds minimum at one $(R_0,s_0)$ — exactly circular, log-spiral-in, log-spiral-out, perturbed — evolved past $h$, phase-plotted $s$ versus $R$, with seed spread reported against $t/h$ and whether it shrinks. Use $s=0.5$, $R=1$: it is the cheapest corner, it has an anchor, and it is the only launch that has demonstrably run past a memory depth.
2. **Fix the coupling** to $K_\star=2s\varphi=0.90036722258974714607$, or state plainly why the anchor uses a coupling $2.2\times10^{-5}$ off balance.
3. **Correct the dispatch packet** — the self hinge's absolute value, the $s>3$ magnitudes, $\varrho(10)=0.31$.
4. **Do not touch the rail crossing until 1 collapses.** If there is no collapse curve there is nothing to run up to the rail, and the near-rail row is the most expensive in the campaign.

The prize is unchanged and it is not the binary. If collapse works on two worldlines and four ordered pairs, it is the method the entire quarantined T3 tier needs — §83 release, §60 expansion, the collinear breather — every one of which currently means "we picked a prehistory and reported what happened." That was the point of the dispatch, and it is still ahead of us.
