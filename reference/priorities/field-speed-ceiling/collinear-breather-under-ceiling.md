# Collinear Breather Under the Ceiling: Feasibility Note

**Date:** 2026-08-02; reconciled with the delayed-ignition theorem on 2026-09-02 **Status:** exploratory FSC-local scratchpad; one sufficient first-chart turnaround theorem derived, autonomous braking and a regular breather not established; no law adopted and no continuation advanced **Origin:** operator question following [FSC-001-EC1](elie-cartan-review-2026-08-02.md); extends the [coincidence continuation scratchpad](coincidence-continuation-scratchpad.md) and revisits the pre-ceiling collinear-breather obstruction ("head-on breather does not close; needs a folded history") inside the proposed closed domain $c_a=c_f=1$.

## Question

Can the idealized mirror-collinear opposite-polarity pair close into a **breather**: a periodic bound solution that repeatedly falls together, passes coincidence, separates, turns around, and returns?

## Verdict in one line

The minimal autonomous wake-crossing state selects straight escape and therefore supplies neither braking nor a breather. If a positive delayed-braking onset is supplied separately, however, the existing FSC-local branch equation can reach a regular positive-separation turnaround; repeating the same selected lobe would give a formal spatial breather, but no autonomous wake-state rule currently selects or repeats that onset.

## Minimal autonomous crossing-state: straight selection and no breather

Take the smallest FSC-local autonomous wake state suggested by source-swept reception: every emission remains source labeled, each received-source clock advances only when a wakefront geometrically crosses the receiver, frozen clock plateaus contribute no repeated ordinary row, and the matched coincidence family is owned once. Add no maturity timer, spontaneous activation variable, or prescribed waiting time. On the isolated exact-mirror straight trace the partner clocks remain on their $s=0$ plateaus. Because the partner channels cannot create the slowdown needed to make their own first crossing, the complete post-event ledger remains zero and the trace stays straight.

**Decoupling lemma.** Every admissible mirror emitter reaches the origin by $T_{\mathrm c}=0$ at speed $\le1$, so its emission events satisfy

$$
|p|\le|s|
\qquad
(p=\text{emission position},\ s\le0=\text{emission time}).
$$

An outbound receiver at $\pm T$ (speed exactly $1$) meets the front $p\pm(T-s)$ only at crossing time $T=\pm(p+s)/2$, and $|p|\le|s|$ forces $T\le0$ in both channels. Hence **every wake crossing happens before or at the coincidence**: pre-coincidence crossings are the ordinary incoming ledger, the cap family is the coincidence atom, and after $T_{\mathrm c}$ the outbound pair receives nothing, ever. Same-direction fronts hold constant gaps because fronts and receivers share speed $c_f$. (Spot-checked over $2\times10^5$ random admissible emissions: zero post-coincidence crossings.)

**Consequence for the minimal autonomous state.** Turnaround requires a retained backward delivery on the outbound leg, but the crossing state supplies no first backward crossing from its plateau. Hence it selects the exact straight continuation. If an external row or separately supplied onset dips the pair below ceiling, partner braking can recapture it; after the next coincidence the same minimal state again selects straight escape. One supplied activation can buy one returning lobe, but it does not create an autonomous repeating breather.

Claim grade: `derived theorem sketch under source-swept reception, zero impulse, and the no-self-activation crossing state` in the mirror class. The earlier stronger wording under source-swept reception plus zero impulse alone is withdrawn because the delayed-ignition theorem proves that the broader almost-everywhere continuation relation also admits positive-waiting braking branches. The current statement is falsified by an independently generated crossing from the declared plateau state without an external row, trigger variable, or self-bootstrap.

Plainly: after the pass-through, both partners travel at exactly the speed of their own signals. Everything either of them ever said arrives before the breakup or never. A breather needs somebody to call them back, and in the ideal vacuum nobody can.

## Conditional first-chart braking and turnaround

The [delayed-ignition theorem](trailing-front-activation-dichotomy.md) supplies a different question. Choose a positive onset time $u_*>0$ and let the post-onset branch satisfy

$$
E'=m,
\qquad
m'=\frac{K}{2(t-E/2)^2},
\qquad
E(u_*)=m(u_*)=0,
$$

where $v=1-m$. Define the active partner range

$$
y=t-\frac{E}{2}=t-s(t).
$$

Then

$$
y'=1-\frac{m}{2},
$$

and eliminating $t$ gives the exact first integral

$$
\boxed{
2m-\frac{m^2}{2}
=
K\left(\frac{1}{u_*}-\frac{1}{y}\right).
}
$$

At a turnaround $m=1$, so

$$
\frac{3}{2}
=
K\left(\frac{1}{u_*}-\frac{1}{y_{\mathrm{turn}}}\right).
$$

A finite formal turnaround on this chart therefore requires $K/u_*>3/2$. The stronger condition

$$
\boxed{K\ge3u_*}
$$

is sufficient to keep the turnaround inside the stored straight-source segment. Indeed, it gives $y_{\mathrm{turn}}\le2u_*$. Since $s'=m/2$, $y'=1-m/2$, and $0\le m\le1$ before turnaround,

$$
\frac{ds}{dy}=\frac{m}{2-m}\le1.
$$

Hence $s_{\mathrm{turn}}<y_{\mathrm{turn}}-u_*\le u_*$, with strict inequality because $m<1$ before the endpoint. The active source time remains in the stored straight interval, the root factors are positive, and

$$
x_{\mathrm{turn}}
=
y_{\mathrm{turn}}-s_{\mathrm{turn}}
>0.
$$

Thus the branch reaches zero speed smoothly at positive separation before leaving the chart on which its ODE was derived.

Claim grade: `derived sufficient first-chart turnaround theorem conditional on a supplied positive onset and the proposed FSC event completion`. It does not select $u_*$, adopt the ceiling, or prove a global periodic solution. It is falsified by a failure of the displayed first integral, by $s_{\mathrm{turn}}\ge u_*$ under $K\ge3u_*$, or by a missing root in the declared first-chart census.

Plainly: once an early enough positive braking time is chosen, the delayed partner wake is strong enough to stop the outbound motion before its source root leaves the known straight history. The mathematics can turn the pair; it still does not decide when braking begins.

## Conditional return and the missing periodic selector

At the positive-separation turnaround, the attractive partner contribution remains directed toward the origin, so it changes the velocity sign and starts the return. While $x(t)>0$ and $|v|<1$, the mirror root equation can be written

$$
s+x(s)=t-x(t).
$$

The left side is nondecreasing because its derivative is $1+v(s)\ge0$, and it is strictly increasing off a $v=-1$ cap segment. A partner root therefore persists and remains unique on each ordinary sub-field chart. If $x_{\max}$ is the turnaround radius, then $r\le2x_{\max}$ and $D_t\le2$, so every ordinary attractive row obeys the lower magnitude bound

$$
\left|A_{\mathrm{partner}}\right|
\ge
\frac{K}{8x_{\max}^2}.
$$

Conditional on no intervening untyped stratum, the returning speed therefore reaches the inward ceiling in finite time or reaches coincidence sooner. On the inward ceiling segment the proposed projection removes only further speed increase, so the pair coasts to the next coincidence. A nonordinary partner family can reappear there and must be owned by the same proposed event completion.

This gives a conditional brake-turn-return lobe, not yet a breather theorem. After the return event, the minimal autonomous crossing state again has plateaued partner clocks and selects straight escape in the opposite direction. The multivalued continuation relation can instead be made to trace a reflected second lobe by choosing the same positive $u_*$ again. Two reflected lobes would return each label to the coincidence point with its original velocity direction, but that construction externally chooses the same onset after every event. The FSC state contains no derived phase, maturity, or reset functional that makes those choices autonomously.

Claim grade: `derived conditional return argument` up to the declared ordinary/event boundaries and `formal periodic construction` for repeated equal onset choices. A regular autonomous breather remains `Not advanced`. Spatial return alone is insufficient for a delay system unless the labeled received-history clocks, event ownership, and future-relevant wake state are also shift-periodic.

Plainly: a chosen braking branch can make one complete excursion back to coincidence. Repeating that excursion is easy to prescribe by hand, but the proposed autonomous wake state does not contain the clock that would prescribe it. That missing selector, not the braking strength, is now the primary breather obstruction.

## Where the obstruction actually lives

For the minimal autonomous crossing state, the breather fails at **activation**, before turnaround. For a separately supplied onset with $K\ge3u_*$, braking and positive-separation turnaround are available, and the remaining failure is autonomous repetition after the return event. Note also the ejection-speed constraint: an event law that simply ejected the pair *below* ceiling at zero separation would immediately meet the retained $\delta^{-2}$ braking row (review finding EC-5) and fail BV. So sub-ceiling ejection is lawful only from **positive separation**.

**Ceiling-exit refinement (upgrades EC-7 / review item II.8.3).** When a ceiling rider first slows at $T_1$, its overtaking co-moving self family is delivered as one atom exactly at $T_1$ — an instant at which the speed still equals $c_f$, so the boundary response applies. The atom is forward (same-polarity repulsion from behind), hence projected to zero under the completion clause; and post-slowdown sub-ceiling motion has no further self roots. **Ceiling exit is therefore lawful and free whenever a retained backward row initiates it.** The wake shock does not forbid recapture; it is washed at the exit instant.

Claim grade: `derived under SSR + completion clause`; simultaneity of the self-family crossings at $T_1$ is exact on the straight cap segment.

## Route triage

1. **Finite-interval coincidence event (only self-contained route).** Replace the point event by a typed event that ejects the pair at separation $2\ell>0$ with symmetric sub-ceiling speed $v_+<c_f$ (Section 10.8's "finite coincidence interval" route, now *motivated* rather than listed). Then all outbound ranges are bounded below by $\sim\ell$, partner braking is finite and retained, the pair turns at some $x_{\max}$, falls back, reaches ceiling, coincides, and the event fires again: a closed cycle. The breather becomes a well-posed periodic boundary-value problem with a *bounded* retained-history window ($\le$ one period plus $2x_{\max}$, since all wakes exit the bounded region at $c_f$) — exactly the bounded delay window the FSC-007 program wants. Costs: new event data $(\ell,v_+)$ plus interval wake ownership. The theory already owns one derived length of the right class, $R_\ast=K/(4c_f^2D(1+\sin D))$, so $\ell$ need not be a free parameter if an action account ties it to $K$; and the ejection deficit $c_f-v_+$ is precisely shaped like the Section 14 action-shedding event ("backward-plus-inward chord", here backward-only). A breather, if wanted, is the natural *consumer* of that proposed retuning event.
2. **Sea-embedded driven breather.** The free-flight fate is a knife edge: marginally unbound, recaptured by any ambient backward row. In a Noether sea, ambient wakes supply the missing outbound braking continuously; with the ceiling-exit refinement above, exit is lawful, recapture follows, and the cycle repeats as long as the environment keeps braking. This is a driven-damped oscillation with cadence set by sea density, not a self-contained breather — consistent with the corpus's recurring environment-sink findings. Conjecture grade only.
3. **Orbital (radial) breather about the exact binary.** Off-axis, the bound alternative to a collinear breather is radial oscillation about $R_\ast$. The crude adiabatic read is unfavorable: at fixed ceiling speed the instantaneous curvature radius under the projected row is $\rho_{\mathrm{curv}}=R^2/R_\ast$, so $R<R_\ast$ over-turns (collapse) and $R>R_\ast$ under-turns (escape) — a separatrix, not a restoring well. A radial breather would need the neglected degrees of freedom (delay-angle dynamics off the Dottie chart, or sub-ceiling speed dips with interior recovery) to supply restoration. Open; this is the deferred Section 11.2 stability question in disguise, and the first honest test is the perturbed retained-history monodromy, not the adiabatic sign.

Non-routes, for the record: a same-polarity pair is anti-binding on both legs (repulsion brakes the approach and boosts the separation); and a rebound or backward-impulse coincidence cannot be *derived*, because the delivered coincidence atom is exactly forward and the projection can only remove components, never create a backward one — any rebound law would be fresh event data with no supporting geometry.

Plainly: to breathe, the pair must leave the coincidence slower than its own wakes, and it must do so at a finite standoff so the first backward row is finite. That is a new typed event — the same species of event Section 14 already wants for action transfer. Absent that event, only an environment can keep calling the pair back; and the orbiting version of the question is the binary-stability problem, where the first crude sign points the wrong way.

## Closure target

First decide whether the FSC-local autonomous crossing state is intended to select straight passage or whether an additional derived state variable may select a positive onset. If a positive onset is allowed, extend the $K\ge3u_*$ branch through its complete return census and test shift-periodicity of the labeled wake state across two reflected lobes. Retain the finite-interval event route and radial restoration test as separate alternatives rather than using either to supply the missing onset silently.
