# Collinear Breather Under the Ceiling: Feasibility Note

**Date:** 2026-08-02
**Status:** exploratory scratchpad; derivation sketches and route triage only;
no law adopted, no continuation advanced
**Origin:** operator question following
[FSC-001-EC1](elie-cartan-review-2026-08-02.md); extends the
[coincidence continuation scratchpad](coincidence-continuation-scratchpad.md)
and revisits the pre-ceiling collinear-breather obstruction ("head-on breather
does not close; needs a folded history") inside the proposed closed domain
$c_a=c_f=1$.

## Question

Can the idealized mirror-collinear opposite-polarity pair close into a
**breather**: a periodic bound solution that repeatedly falls together,
passes coincidence, separates, turns around, and returns?

## Verdict in one line

Not with the currently proposed laws: under swept-source reception plus the
zero-impulse coincidence update, the two-label collinear breather is
impossible, and the obstruction is localized to one missing object — a
backward delivery on the outbound leg. Three lawful routes could supply it;
they are triaged below.

## No-breather / one-bounce theorem sketch (two labels, in vacuo)

**Decoupling lemma.** Every admissible mirror emitter reaches the origin by
$T_{\mathrm c}=0$ at speed $\le1$, so its emission events satisfy

$$
|p|\le|s|
\qquad
(p=\text{emission position},\ s\le0=\text{emission time}).
$$

An outbound receiver at $\pm T$ (speed exactly $1$) meets the front
$p\pm(T-s)$ only at crossing time $T=\pm(p+s)/2$, and $|p|\le|s|$ forces
$T\le0$ in both channels. Hence **every wake crossing happens before or at
the coincidence**: pre-coincidence crossings are the ordinary incoming
ledger, the cap family is the coincidence atom, and after $T_{\mathrm c}$ the
outbound pair receives nothing, ever. Same-direction fronts hold constant
gaps because fronts and receivers share speed $c_f$. (Spot-checked over
$2\times10^5$ random admissible emissions: zero post-coincidence crossings.)

**Consequence.** Turnaround requires a retained backward delivery on the
outbound leg; the outbound leg is causally sealed; so no periodic return
exists. Further, if an external wake dips the pair below ceiling, partner
braking recaptures it, it falls back, coincides again, and exits at ceiling
speed into a configuration where the decoupling lemma applies afresh (all
cycle-one emissions again satisfy the reach-the-origin bound relative to the
second coincidence). So **one external backward input buys exactly one
additional bounce**. A self-sustained two-label collinear breather is
impossible under the current proposal set.

Claim grade: `derived theorem sketch under SSR + zero-impulse` in the mirror
class. Falsifier: an admissible mirror emission violating the reach bound, or
a post-coincidence crossing with positive crossing time.

Plainly: after the pass-through, both partners travel at exactly the speed of
their own signals. Everything either of them ever said arrives before the
breakup or never. A breather needs somebody to call them back, and in the
ideal vacuum nobody can.

## Where the obstruction actually lives

The breather fails at the **turnaround**, not at the coincidence. The
coincidence itself is now lawful (zero-impulse derived from the forward
atom); the outbound leg is what is sterile. Note also the ejection-speed
constraint: an event law that simply ejected the pair *below* ceiling at zero
separation would immediately meet the retained $\delta^{-2}$ braking row
(review finding EC-5) and fail BV. So sub-ceiling ejection is lawful only
from **positive separation**.

**Ceiling-exit refinement (upgrades EC-7 / review item II.8.3).** When a
ceiling rider first slows at $T_1$, its overtaking co-moving self family is
delivered as one atom exactly at $T_1$ — an instant at which the speed still
equals $c_f$, so the boundary response applies. The atom is forward
(same-polarity repulsion from behind), hence projected to zero under the
completion clause; and post-slowdown sub-ceiling motion has no further self
roots. **Ceiling exit is therefore lawful and free whenever a retained
backward row initiates it.** The wake shock does not forbid recapture; it is
washed at the exit instant.

Claim grade: `derived under SSR + completion clause`; simultaneity of the
self-family crossings at $T_1$ is exact on the straight cap segment.

## Route triage

1. **Finite-interval coincidence event (only self-contained route).** Replace
   the point event by a typed event that ejects the pair at separation
   $2\ell>0$ with symmetric sub-ceiling speed $v_+<c_f$ (Section 10.8's
   "finite coincidence interval" route, now *motivated* rather than listed).
   Then all outbound ranges are bounded below by $\sim\ell$, partner braking
   is finite and retained, the pair turns at some $x_{\max}$, falls back,
   reaches ceiling, coincides, and the event fires again: a closed cycle.
   The breather becomes a well-posed periodic boundary-value problem with a
   *bounded* retained-history window ($\le$ one period plus $2x_{\max}$,
   since all wakes exit the bounded region at $c_f$) — exactly the bounded
   delay window the FSC-007 program wants. Costs: new event data
   $(\ell,v_+)$ plus interval wake ownership. The theory already owns one
   derived length of the right class, $R_\ast=K/(4c_f^2D(1+\sin D))$, so
   $\ell$ need not be a free parameter if an action account ties it to $K$;
   and the ejection deficit $c_f-v_+$ is precisely shaped like the
   Section 14 action-shedding event ("backward-plus-inward chord", here
   backward-only). A breather, if wanted, is the natural *consumer* of that
   proposed retuning event.
2. **Sea-embedded driven breather.** The free-flight fate is a knife edge:
   marginally unbound, recaptured by any ambient backward row. In a Noether
   sea, ambient wakes supply the missing outbound braking continuously; with
   the ceiling-exit refinement above, exit is lawful, recapture follows, and
   the cycle repeats as long as the environment keeps braking. This is a
   driven-damped oscillation with cadence set by sea density, not a
   self-contained breather — consistent with the corpus's recurring
   environment-sink findings. Conjecture grade only.
3. **Orbital (radial) breather about the exact binary.** Off-axis, the bound
   alternative to a collinear breather is radial oscillation about
   $R_\ast$. The crude adiabatic read is unfavorable: at fixed ceiling speed
   the instantaneous curvature radius under the projected row is
   $\rho_{\mathrm{curv}}=R^2/R_\ast$, so $R<R_\ast$ over-turns (collapse) and
   $R>R_\ast$ under-turns (escape) — a separatrix, not a restoring well. A
   radial breather would need the neglected degrees of freedom
   (delay-angle dynamics off the Dottie chart, or sub-ceiling speed dips
   with interior recovery) to supply restoration. Open; this is the deferred
   Section 11.2 stability question in disguise, and the first honest test is
   the perturbed retained-history monodromy, not the adiabatic sign.

Non-routes, for the record: a same-polarity pair is anti-binding on both
legs (repulsion brakes the approach and boosts the separation); and a
rebound or backward-impulse coincidence cannot be *derived*, because the
delivered coincidence atom is exactly forward and the projection can only
remove components, never create a backward one — any rebound law would be
fresh event data with no supporting geometry.

Plainly: to breathe, the pair must leave the coincidence slower than its own
wakes, and it must do so at a finite standoff so the first backward row is
finite. That is a new typed event — the same species of event Section 14
already wants for action transfer. Absent that event, only an environment
can keep calling the pair back; and the orbiting version of the question is
the binary-stability problem, where the first crude sign points the wrong
way.

## Closure target

Specify the finite-interval coincidence event as a typed guard/reset pair
$(\ell,v_+)$ with interval wake ownership, then pose the mirror breather as
a periodic BVP with bounded delay window and solve or exclude it; separately,
test radial restoration about $R_\ast$ beyond the adiabatic sign via the
perturbed retained-history return map.
