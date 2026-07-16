# Adjudication — the `spindle-braid.md` $\varrho$ Contradiction — 2026-07-14

Adjudicates the live contradiction flagged in the [antipodal-binary spiral-law dispatch](../antipodal-binary-spiral-law-dispatch-packet.md#consequence-for-the-corpus--a-live-contradiction) and carried unadjudicated in the [handoff prompt](../../../../op/jughead-adjudication-handoff-prompt.md).

## The contradiction

`content/markdown/aaa/noether-braid/spindle-braid.md` stated the field-speed pin twice, incompatibly, within one chapter:

- **line 108** — the edge is a two-sided attractor "precisely when $\varrho>1$, a condition the declared coincidence stratum satisfies with wide margin ($\varrho\approx50$)";
- **line 118** — the same-source channel's supply "caps near two-thirds of the rail pump, so no brake-equals-pump regime exists and the channel cannot hold its own rail" — i.e. $\varrho\approx0.67$.

$\varrho\approx50$ against $\varrho\approx0.67$, a factor of $75$, about the same channel of the same object.

## Verdict — $\varrho\approx50$ is retired; the pin is void

**The two numbers are not equal-weight.** Line 118's value is **regulator-converged**: it is what survives when the short-distance regulator is taken away. Line 108's value is quoted at "the **declared** coincidence stratum" — a *chosen* short-distance scale $d_0$. The chapter says so itself, two sentences later: *"the symmetric same-source click magnitude is a property of the short-distance scale $d_0$ rather than of the branch geometry, so this channel was never available as the load-bearing absorber of the pump."*

That is the disqualification, stated by the chapter about its own number. Per [Evidence Independence](../../../../../AGENTS.md#evidence-independence): *"A model swept over its own knobs is evidence about the model. Parameterized stand-ins for a medium, environment, or response law report whatever their author built in."* $\varrho\approx50$ is a $d_0$ reading. It cannot bear on whether the pin exists, at any magnitude.

**Line 118 already refuted line 108 and nobody propagated it.** The adjudication is less a discovery than a delivery.

## The independent third route

The bare antipodal binary is the smallest object in the theory carrying both channels, it has $W^{\mathrm{rec}}\equiv1$ exactly, and it is solved in closed form with **no regulator and no short-distance scale**. Its brake-to-pump ratio, on complete root sums, confirmed on the [90-digit oracle](../../../../../scripts/eom/antipodal-binary-hinge-oracle.py):

| $s$ | $F_\theta^{\rm partner}$ | $F_\theta^{\rm self}$ | $\varrho$ |
| ---: | ---: | ---: | ---: |
| $1.2$ | $+0.3919$ | $+0.1768$ | — (self is a **pump** below $s=\pi/2$) |
| $2$ | $+0.8082$ | $-0.0888$ | $0.1099$ |
| $3$ | $+1.3144$ | $-0.2818$ | $0.2144$ |
| $5$ | $+2.3386$ | $-0.6310$ | $0.2698$ |
| $10$ | $+4.8266$ | $-1.5062$ | $0.3121$ |
| $30$ | $+14.8413$ | $-4.8312$ | $0.3255$ |
| $60$ | — | — | $0.3298$ |

$\varrho$ rises monotonically and **saturates near $1/3$**. Supremum over $\pi/2\le s\le60$ is $0.3298$ — a factor of $3.03$ short of the $\varrho>1$ the pin requires. The self term is not even a brake below $s=\pi/2$; it is a *pump*.

**Two independent routes, both below unity, on opposite sides of the program**: this chapter's own regulator-converged booking ($0.67$) and a bare-point-charge closed form carrying no regulator at all ($\to0.33$). One knob-dependent route ($50$) says otherwise. The knob loses.

## Consequence — the pin is retired, not merely unconfirmed

Line 108 made the attractor **conditional on $\varrho>1$**. The condition is measured false. So the pin is void *by its own construction*, in the same way §97/§98's flutter was void rather than quarantined: where the stated precondition fails, the claim has no referent.

This is reinforced by an independent structural fact on the same object: $F_\theta>0$ at **every** speed from $s=0.25$ to $s=60$ on complete roots, so no circular configuration of the bare binary is a tangential equilibrium at any speed. There is nothing for a site to be pinned *to*. The chapter already carries the same fact at `binary-dynamics.md:786` ("the same-sheet per-hit $T>0$ result").

**Scope, stated honestly.** The bare binary is not the spindle's middle rail layer, which has two other layers pushing. The bare-binary route is therefore *corroborating*, not decisive, for the spindle. The decisive route is line 118 — same object, same channel, same chapter, regulator-converged. The bare binary's contribution is that it reaches the same verdict by a route with no regulator to converge, which is what makes the agreement evidence rather than a shared instrument.

Note also that no other layer *can* supply a rail pin: the pin's defining feature is that it switches exactly at $c_f$, and the same-source channel is the only channel with that switch. A brake supplied by the other layers would not know where the rail is.

## Corpus action taken

`spindle-braid.md` line 108 rewritten forward-only: the switching structure and the per-channel signs are preserved (they are derived and measured); $\varrho\approx50$ and the "declared coincidence stratum satisfies with wide margin" clause are removed; the two independent sub-unity routes are stated; the pin is marked retired with its condition named. The dependent clause "the balance bounds the stratum scale from above rather than leaving it free" is removed with it — it was a consequence of the pin.

## Escalation — a second, deeper contradiction the chapter carries

Line 118 says the channel **"cannot hold its own rail."** Line 120 then opens: **"The pin has one consequence important enough to state on its own,"** and derives clock dilation *from the pin*:

> **Clock dilation — and, through cadence-paced transactions, reaction-rate dilation — is derived from the closure landscape plus the pin**, rather than postulated.

The chapter refutes its pin at line 118 and uses it at line 120. That is a second contradiction, larger than the $\varrho$ one, and it has never been named.

The clock-dilation argument requires the total site speed to be **fixed at $c_f$**: only then does the speed-budget split $c=\sqrt{c_f^2-u^2}$ give $\omega^{\rm pin}(u)=\omega_0/\gamma$. The pin was the sole mechanism fixing it there, and it is the only mechanism in the theory that distinguishes $c_f$ dynamically. Without it, the budget split still holds arithmetically but has no reason to be evaluated at $c_f$, and the $1/\gamma$ scaling does not follow.

**This is not adjudicated here.** It is the theory's contact with special relativity and it is load-bearing for the whole program; it is escalated to the operator rather than retired unilaterally. Recorded so the dependency is visible rather than silently inherited. The honest default, absent another mechanism fixing the site speed at $c_f$, is to re-grade lines 120–128 from *derived* to *hypothesis pending a site-speed mechanism*.

## Terminology finding — `MCB` is canonical and this thread missed it

This adjudicator spent a session treating the operator's "maximum curvature binary" as a fresh proposal. **It is an established project term.** `content/markdown/aaa/dynamics/binary-dynamics.md:796` defines

$$
d_0 := R_{\rm MCB},\qquad T_0 := \frac{2\pi}{\omega_{\rm MCB}},
\qquad
R_*=\frac{\kappa\epsilon^2}{c_f^2}
$$

and $d_0$ — "the minimal binary radius" — is the theory's candidate fundamental length, carried downstream by `particle-masses.md`, `electroweak-bosons.md`, `mathematics-terminology.md`, `units-and-constants.md`, and `self-interaction-switch.md`.

AGENTS.md is explicit: *"use established project terminology whenever it exists,"* and *"resolve which one is the canonical project term before proceeding."* A single grep for "maximum curvature" at the start of the thread would have found it. The failure is the same shape as the others this session — reasoning forward from a clean statement of the problem instead of checking what the corpus already holds.

**Two corrections follow.**

1. **The natural unit was already there.** This thread's $L_0=\kappa q^2/c_f^2$ is the corpus's $R_*=\kappa\epsilon^2/c_f^2$, and the corpus already asks for exactly the quantity computed here: *"the first MCB outputs are the dimensionless ratios $R_{\rm MCB}/R_*$, $T_0/T_*$, $\beta_{\rm MCB}$ rather than additional fitted constants."* On the circular family that ratio is $R_\star/R_* = F_r(s)/s^2$ in closed form.

2. **This thread's "there is no maximum-curvature binary" was overreached and must be scoped.** The corpus's MCB is **not** asserted to be a circle: `binary-dynamics.md:788` calls it *"a caustic-grazing limit cycle"* and sets its stability target as a Conley index persisting under finite-$\eta$ continuation. A limit cycle is a periodic orbit on which $R$ and $s$ breathe — not a circular configuration. **The circular-family result excludes a circular MCB; it says nothing about a grazing limit cycle.** The correct statement of what is now established:

   - **No circular MCB, on two independent grounds.** $F_\theta>0$ at every $s\in[0.25,60]$ on complete roots — no circular tangential equilibrium at any speed (this is the corpus's own $T>0$ result at `binary-dynamics.md:786`, now certified across the full range on an independent oracle). And the radial-balance family has **no positive infimum of radius**: $R_\star/R_*$ falls to $0.3383$ as $s\to1^-$, the band $1<s<\pi/(2\sqrt2)$ admits no circular binary at any radius, and the super-rail branch runs to $R\to0$ at *both* ends ($s\to s_R^+$ and $s\to\infty$), peaking at only $0.0946$ near $s=2.99$. So even the balanced circular family has no tightest member.
   - **A non-circular grazing MCB is untouched by any of this** and remains the corpus's open target, correctly hedged there as *"If a stable MCB exists."*

   The sub-rail [phase-collapse negative](antipodal-binary-phase-collapse-2026-07-14.md) is weak evidence against a *sub-rail* limit cycle — the seeds escape rather than being captured — but the MCB is expected to graze the caustic, which is super-rail, where nothing has been run.

**Net effect on the corpus:** the corpus was correctly hedged and this thread's contribution is to sharpen "unverified" into "excluded for circles, open for grazing cycles," plus a closed form for $R_\star/R_*$ that the corpus explicitly asked for. No promotion is claimed here.
