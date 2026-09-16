# Coincident position limit with rapidly reversing velocity

**Date:** 2026-09-16. **Grade:** derived kinematic limit and conditional sharp-root census; unresolved dynamical admission and event response. **Scope:** isolated opposite-polarity mirror pair, $c_f=1$, zero self acceleration, and the authorized FSC speed ceiling. No smoothing calculation is used as a sharp-law premise.

## 1. Position convergence does not imply velocity convergence

An exact mathematical example separates the two questions. For a positive time scale $\varepsilon$, prescribe

$$
x_\varepsilon(t)=\varepsilon\sin(t/\varepsilon),\qquad
v_\varepsilon(t)=\cos(t/\varepsilon),\qquad t\ge0.
$$

Set the partner position to $-x_\varepsilon$. Every path starts at the origin with A's velocity $+1$, obeys the speed cap, and remains within distance $\varepsilon$ of the origin. Hence position converges uniformly to zero on every bounded right interval. Velocity continues to range between $-1$ and $+1$; it has no limit as $\varepsilon\downarrow0$ at any fixed $t>0$. For example, choosing $\varepsilon=t/(2\pi n)$ or $t/((2n+1)\pi)$ gives velocities $+1$ or $-1$ at that time.

This is a prescribed kinematic example, not an FSC solution, a smoothed solution, or an asserted fit to the previous numerical runs. In particular it cannot evade the [continuous-launch obstruction](self-silent-partner-near-event-balance.md) by making its first reversal fast.

The example's acceleration is $-\sin(t/\varepsilon)/\varepsilon$. Its total absolute integral on a fixed interval grows without bound, although its signed time average against a smooth observation window supported strictly after crossover tends to zero. Fast positive and negative changes can cancel in that weak sense without becoming small individually.

More generally, if capped absolutely continuous positions satisfy $x_n\to0$ uniformly on $[0,T]$, then for every smooth test function $\psi$,

$$
\int_0^T v_n(t)\psi(t)\,dt
=[x_n(t)\psi(t)]_0^T-\int_0^T x_n(t)\psi'(t)\,dt\longrightarrow0.
$$

Thus their velocities converge to zero when tested by smooth time averages. This says neither that their instantaneous velocities converge nor that their nonlinear delayed acceleration converges to the acceleration evaluated on the limiting path.

## 2. Sharp causal census of the proposed resting path

Test the limiting candidate $x(t)=0$ for $t\ge0$, retaining the incoming cap history $x(s)=s$ on $[-L,0]$. For older history assume $|x(s)|<-s$ for $s<-L$, the same explicit exclusion used in the partner-only launch analysis. There are no external sources.

The sharp partner condition is

$$
|x(t)+x(s)|=t-s,\qquad s<t.
$$

For each fixed $t>0$:

- An incoming cap emission $s<0$ has distance $-s$, while its sphere radius is $t-s>-s$. The origin is strictly inside that sphere, not on its surface.
- An earlier emission satisfies $|x(s)|<-s<t-s$ and is also absent from the root set.
- A post-crossover emission $0\le s<t$ has distance zero but radius $t-s>0$, so it is not a root.
- The candidate equality at $s=t$ has zero delay and zero range. It is not an admitted ordinary positive-separation root.

**Derived census:** there are no ordinary positive-delay partner hits for this resting candidate at $t>0$. Its ordinary sum is empty and formally gives zero acceleration, consistent with rest on that open right interval. This is not a theorem admitting a persistently coincident configuration to the full law. The [canonical authority statement](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) supplies no coincidence law, and an empty ordinary sum cannot supply one by implication.

## 3. Joining the incoming history exposes a required event change

The complete candidate near crossover is

$$
x_*(t)=\begin{cases}t,&t<0,\\0,&t\ge0.\end{cases}
$$

It has incoming velocity $+1$ and outgoing velocity zero. Thus A requires $\Delta v_A=-1$, while B requires $\Delta v_B=+1$. In distributional notation the candidate's second derivative is

$$
x_*''=-\delta_0.
$$

This notation states the net velocity change required by the proposed path; it does not postulate a physical impulse, mass, or additional interaction. A classical velocity-continuous solution cannot have this join. Any broader solution concept must derive and justify that event response from the sharp partner interaction and ceiling, and must admit the subsequent coincident history.

The boundary change is not lost by rapid oscillations. Join the kinematic examples above to the same incoming path $x(t)=t$ for $t<0$. They converge uniformly to $x_*$; therefore their second derivatives converge to $-\delta_0$ as distributions on a neighborhood containing crossover. On intervals strictly after crossover the distributional limit is zero. These statements are compatible: averaging only after the event misses the boundary velocity change.

Neither distributional convergence of prescribed paths nor bounded speed proves the Master Equation is satisfied. One must separately show that the complete capped sharp acceleration has this same limit. In particular, when examining an auxiliary sequence, compare the actual velocity derivative after the cap response, not only the raw unprojected partner acceleration. Fixed-parameter numerical refinement supplies neither limit.

## 4. Disposition and next exact target

**Derived:** shrinking position excursions and increasingly rapid bounded reversals are mathematically compatible. If the position limit is persistent rest at crossover, the incoming history requires a net velocity change at the boundary. The ordinary right-hand root census does not supply that change or authorize contact residence.

**Unresolved:** whether any dynamically admissible sharp-law sequence has this limit, whether a canonical event response produces the required change, and whether persistent coincidence is admitted. The previous auxiliary trajectories establish none of these points under the accepted evidence rule. No sticking or rebound is selected.

The next exact target is the complete event balance for the candidate $\Delta v_A=-1$, $\Delta v_B=+1$, including the retained nonordinary incoming partner family and the ceiling response. The candidate must be rejected or left unresolved if this balance cannot be derived; the zero ordinary ledger after the event is insufficient.

**Verification and falsifiers:** the results follow by differentiation, integration by parts, and the three explicit root inequalities above; no numerical instrument was required. An admitted positive-delay root under the stated histories would overturn the census. A proof that uniform capped positions require pointwise velocity convergence would conflict with the explicit cosine subsequences. A justified sharp event/contact theorem would resolve the open admission question rather than follow from these kinematic observations.
