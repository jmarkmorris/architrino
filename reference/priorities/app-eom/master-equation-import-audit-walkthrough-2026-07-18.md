# Import-Audit Walkthrough: The Master Equation on Trial

Operator walkthrough for the 2026-07-18 import-audit campaign (technical backup: the dispatch packet in this directory — consult only if you want the full derivations; this document stands alone). Nothing here is ratified. Everything is stated in terms of architrinos, wakes, absolute space and time, and the master equation's own symbols. No metaphors from other physics; observer-level comparisons with measured electrodynamics are labeled as exactly that.

## Terminology

| Symbol / term | Meaning |
| --- | --- |
| $T$ | absolute time |
| transmitter | the emitting architrino; position $\mathbf X_t(T)$, velocity $\mathbf V_t$ |
| receiver | the architrino being accelerated; position $\mathbf X_r(T)$, velocity $\mathbf V_r$ |
| $T_t$ | a transmitter (emission) time — some instant in the transmitter's past |
| $T_r$ | the receiver (reception) time — the present instant being analyzed |
| wake shell | the spherical surface launched at one instant $T_t$, centered on $\mathbf X_t(T_t)$, radius growing at $c_f$ forever. The wake is the continuous stream of all such shells |
| $r$, $\hat{\mathbf r}$ | separation $\mathbf X_r(T_r)-\mathbf X_t(T_t)$: its length and unit vector (from emission point toward receiver) |
| root | a value of $T_t$ solving the hit condition (Section 0.2): an emission time whose shell is crossing the receiver right now |
| $D_t = c_f - \hat{\mathbf r}\cdot\mathbf V_t(T_t)$ | transmitter factor: how densely the wake was laid down toward the receiver (Section 0.4) |
| $D_r = c_f - \hat{\mathbf r}\cdot\mathbf V_r(T_r)$ | receiver factor: the rate at which the shell stream sweeps across the receiver (Section 0.4) |
| fold | the event $D_t = 0$: where roots are created or destroyed in pairs (Section 0.3) |
| grade / steepness | the magnitude of the spatial rate of change of the wake's potential at a point; for one static architrino at distance $r$ it is $1/r^2$ |
| E/P/J | energy, momentum, angular momentum — the three conserved quantities whose bookkeeping any acceptable law must balance |
| first order / second order | the size class of a correction: first order means proportional to $(v/c_f)^1$, second order to $(v/c_f)^2$. At $v/c_f = 0.01$, a first-order term is ~1% of the main term, a second-order term ~0.01% |
| sweep reading / ramp reading | the two candidate meanings of a wake crossing (Section 0.6) |

## Part 0 — The Scene

### 0.1 Transceivers and wakes

An architrino is a point transceiver in the Euclidean void, moving in absolute time. As a transmitter it continuously launches wake shells — each expanding at $c_f$ from the point where it was launched, forever. As a receiver it is, at every instant, being crossed by shells launched in the past (by others, or by its own past self if its history was ever fast enough — Section 0.3), and each crossing contributes acceleration. An architrino crossed by nothing moves in a straight line at constant velocity.

Your figure of the twelve $1/r$ potential curves is the standing picture: each curve is one static architrino's accumulated wake potential — electrinos dipping below the neutral plane, positrinos rising above it. The **summed surface** means: at each point of space, add up the potential contributions of every architrino's wake arriving there — for a single architrino it is just that one curve. A *moving* transmitter's curve is distorted: its wake is denser on the side it moves toward, sparser behind (Section 0.4).

### 0.2 The hit condition

Fix the receiver's present: absolute time $T_r$, position $\mathbf X_r(T_r)$. Pick any candidate past instant $T_t$ of the transmitter. Two lengths:

- how far the receiver now stands from where that emission happened: $r = \|\mathbf X_r(T_r) - \mathbf X_t(T_t)\|$;
- how far that shell has expanded: $c_f\,(T_r - T_t)$.

Their difference $g = r - c_f(T_r - T_t)$ tells the shell's status: $g>0$, the shell hasn't reached the receiver; $g<0$, it already swept past; $g=0$, it is crossing the receiver at this instant. A **root** is a value of $T_t$ with $g=0$ — an emission *time*, labeling an emission *event* (that time plus the transmitter's position then). The acceleration the receiver feels now is built entirely from its roots.

### 0.3 How many roots, and how the count changes

If the transmitter's entire history is slower than $c_f$, there is **exactly one root, always, and the count never changes.** Reason: as $T_t$ scans backward, the shell radius $c_f(T_r-T_t)$ grows steadily at rate $c_f$, while the distance $r$ to the old emission points changes at most at the transmitter's speed — slower. So $g$ falls steadily through zero exactly once. One shell crossing the receiver, per transmitter, at every instant.

Multiple roots require the *transmitter's* history (not the receiver's) to have exceeded $c_f$ radially — only then can the distance term outrun the radius term and bend the $g$-curve back to touch zero again. And when the count does change, it changes by two: plot $g$ against $T_t$; roots are the curve's zero-crossings; as $T_r$ advances the curve deforms smoothly, and a smooth curve gains crossings only when a valley bottom (a local minimum of $g$) **lowers through the zero level** — grazing contact at one instant, then the valley floor sits below zero and its two sides each cross: two new roots where there were none. In wake terms: a whole stretch of the transmitter's past, whose shells had all been missing the receiver, comes into range at once — first the single nearest shell of that stretch grazes the receiver, then shells from slightly earlier and slightly later in that stretch are both crossing it: two roots, from two nearby eras of the same path. The grazing condition works out to $D_t = 0$ — the **fold**. This is why the solver certifies $|D_t|$ floors on every root: it is certifying "no fold nearby, root count stable."

### 0.4 The two factors, defined before use

The wake is continuous — there are no gaps between shells. Talk of "spacing" is shorthand for *density*: how much of the wake stream occupies a unit of radial distance.

**$D_t$ — the transmitter factor (wake density).** The wake laid down during a short emission interval $dT_t$ occupies, along the direction toward the receiver, a radial span $(c_f - \hat{\mathbf r}\cdot\mathbf V_t)\,dT_t = D_t\,dT_t$: the shell launched at the interval's end has a radius smaller by $c_f\,dT_t$, but its center moved by $\mathbf V_t\,dT_t$. A transmitter moving toward the receiver compresses its wake ahead ($D_t < c_f$: same emission crammed into less span — denser); receding stretches it ($D_t$ up to $2c_f$). The mathematics *forces* a factor $1/|D_t|$ into every root's contribution — it is the change-of-variables factor of the hit condition, ordinary calculus, undisputed.

**$D_r$ — the receiver factor (crossing rate).** A shell's surface moves outward along $\hat{\mathbf r}$ at $c_f$; the receiver's radial velocity is $\hat{\mathbf r}\cdot\mathbf V_r$; the difference $D_r$ is the rate at which the wake stream sweeps across the receiver. $D_r > 0$: the fronts overtake the receiver (it passes from outside each shell to inside — the ordinary case). $D_r = 0$: the receiver rides along with one front. $D_r < 0$: the receiver moves outward faster than the fronts and punches through them **from the inside** — possible only above $c_f$.

**Inside versus outside crossings — your question, now a section.** The *orientation* of a crossing is exactly the sign of $D_r$. Does orientation matter to the acceleration? The canonical master equation says no — it uses $|D_r|$, every crossing acting identically. The alternative says yes — a crossing taken from the inside acts with reversed sign. These agree everywhere below $c_f$ and differ ontologically above it (reversed sign turns self-repulsion into self-attraction on overtaking crossings). Nothing yet decides this; it is the open sign question of Part 6, and you arrived at it independently by asking about inside/outside.

### 0.5 The playback ratio

The hit condition ties $T_t$ to $T_r$: as the receiver's time advances, the emission time it is "hearing" advances too. Differentiating $g=0$ (a related-rates computation) gives

$$
\frac{dT_t}{dT_r} = \frac{D_r}{D_t}.
$$

Meaning: the transmitter wrote its wake into space at density $D_t$ per unit of its time; the receiver reads it at crossing rate $D_r$; the ratio is how many seconds of the transmitter's past scroll past per second of the receiver's present. Negative ratio (only above $c_f$): the receiver crosses the wake in reverse order — the transmitter's history is read backward.

### 0.6 The central question: ramp versus sweep

The grade of one architrino's wake potential at distance $r$ is $1/r^2$ — a magnitude, no sign needed. Orientation of the curve needs the transmitter's polarity (electrino: dip; positrino: rise); the *direction* of the receiver's acceleration needs both polarities — that is $\sigma_{tr} = \mathrm{sign}(q_tq_r)$ in the master equation: like polarities accelerate apart, unlike together, along $\hat{\mathbf r}$. When the transmitter moves, its wake is denser toward the compression side, and the grade of the *arriving* wake is scaled by the density factor: grade $\propto \dfrac{1}{r^2}\cdot\dfrac{c_f}{|D_t|}$. (Above $c_f$, multiple roots each contribute their own grade and orientation; "steepness" remains each root's magnitude, and the sign question of 0.4 decides how orientations combine.)

The two candidate readings of a wake crossing — the continuous statement, no discrete kicks; the difference is one factor:

- **Ramp reading:** the receiver's acceleration is the grade of the arriving wake at its location: $\mathbf A \propto \dfrac{1}{r^2}\dfrac{c_f}{|D_t|}\hat{\mathbf r}$. The receiver's own velocity does not appear.
- **Sweep reading (canonical):** that same grade, multiplied by the receiver's crossing rate: extra factor $\dfrac{|D_r|}{c_f}$, giving the canonical $\left|\dfrac{D_r}{D_t}\right|\dfrac{1}{r^2}$.

The two differ at first order in $\mathbf V_r/c_f$ — i.e., by a term proportional to $(\hat{\mathbf r}\cdot\mathbf V_r)/c_f$ times the main acceleration. **Why the question is genuinely open here:** in a theory where absolute velocity is unmeasurable in principle, a velocity-dependent static acceleration is impossible from the start. The void has absolute space and time — a real rest frame — so nothing forbids either reading. Only two kinds of evidence can decide: what a derivation from the theory's own action produces, and observer-level comparison with measured electrodynamics. That is Part 2. (You said you are open on ramp versus sweep and don't yet see which is correct: that is precisely the right state — Part 2 presents the evidence and Part 8 states what remains undecided.)

### 0.7 Rules of evidence; symmetry notes

Claims are graded: **derived** (proven from stated assumptions), **measured** (a named instrument produced it), **inferred** (argued, unproven), **guessed** (a declared design choice). Candidate laws face three tests: E/P/J bookkeeping must balance on the same records; observer-level comparisons with measured physics must be preserved; and there must exist a configuration where rival laws predict different outcomes, checkable independently. A model whose adjustable parameters were tuned to produce a result is evidence only about itself.

Symmetries (acting on entire wake histories): flipping every polarity leaves every $q_tq_r$ product unchanged — exact symmetry, so any matter/antimatter imbalance must be built, not inherited. Translations and rotations of the void are exact; their conserved quantities are the E/P/J ledgers themselves. Time reversal is *not* a symmetry: only past shells act, by construction — the arrow of time is an axiom here. There is no symmetry connecting states of different uniform velocity (no boost symmetry): that absence is what makes ramp-versus-sweep a real question. Superposition — contributions of different roots and transmitters simply add, and shells never act on shells — is a *postulate*, not a symmetry, and is on the watch list.

---

## Part 1 — The Single Drifting Architrino: the Whole Story in One Configuration

One electrino moving with constant velocity $\mathbf u$ along a straight line in the void, forever. This is the unique rigorously self-consistent configuration: below $c_f$ it has no self-roots and no partners, so the master equation itself says it moves exactly uniformly — nothing is prescribed. Everything can be computed in closed form at any point $(x,y,z,T)$.

**The virtual observer.** At any field point, ask: if a receiver popped into existence here, right now, at rest, with no history of its own — what acceleration would the law assign it? (Popping in at rest removes every receiver-side effect: for $\mathbf V_r = 0$, $D_r = c_f$, and the ramp and sweep readings agree exactly. This mode probes the transmitter side alone.) The unique root solves the hit condition; writing $\mathbf R$, $R$, $\mathbf N$ for the separation from the transmitter's *present* position, $\boldsymbol\beta = \mathbf u/c_f$, $p = \mathbf N\cdot\boldsymbol\beta$, the closed-form root geometry is

$$
\frac{r}{R} = \frac{p + \sqrt{1-\beta^2+p^2}}{1-\beta^2},
\qquad
\hat{\mathbf r} = \mathbf N\left(1 - p + \tfrac12(p^2-\beta^2)\right) + \boldsymbol\beta + \dots
$$

and the assigned acceleration of the popped-in resting receiver, expanded to the orders shown, is

$$
\frac{R^2}{\kappa\, q_tq_r}\,\mathbf A \;=\; \mathbf N\,(1 - 2p + \dots) \;+\; \boldsymbol\beta\,(1 + \dots).
$$

Read it plainly: the pull is *not* toward the transmitter's present position, and not toward its emission position either — at first order in $u/c_f$ it is tilted by the term $\boldsymbol\beta$ (a component along the drift direction) and modulated by $-2p$ (stronger on the approach side, weaker behind — the wake-density effect).

**The observer-level comparison** (measured electrodynamics, entering only as the standard to be reproduced): a uniformly moving charge accelerates a resting test charge *exactly toward the mover's present position*, with corrections only at second order — the measured expression is

$$
\mathbf A_{\text{measured}} \propto \frac{\mathbf N\,(1-\beta^2)}{R^2\,(1-\beta^2+p^2)^{3/2}} = \frac{\mathbf N}{R^2}\left(1 + \tfrac12\beta^2 - \tfrac32 p^2 + \dots\right),
$$

no first-order terms at all, and no component along $\boldsymbol\beta$. So **both candidate readings of the master equation disagree with measured electrodynamics at first order in the transmitter's velocity, for a resting observer** — and these particular terms come from the *forced* parts of the law (the root geometry and the $1/|D_t|$ density factor), so no choice about $D_r$ can remove them. The candidate resolutions: shells carrying a record of the transmitter's velocity that the receiver couples to (repairs first order; provably fails at second — see Part 4); $c_f$ being much larger than assumed, shrinking every $u/c_f$ term below measurability; dressing by composite structure (open; outside this document's scope); or the ledger-closure term of Part 2 supplying exactly the missing $+2p\mathbf N - \boldsymbol\beta$ — structurally plausible, currently uncomputed, and the first item on the next calculation's list.

**And magnetism?** In Maxwell's equations, magnetism is *not* "the electric field is changing." The observer here certainly sees a changing field as the electrino passes — direction and magnitude both vary in time — but the magnetic field is defined by its effect: an additional acceleration on a *moving* test charge, proportional to and perpendicular to that test charge's velocity ($\mathbf V_r \times \mathbf B$), doing no work. A resting observer can detect no magnetism by definition. So the single-electrino probe has a second mode: pop the receiver into existence *with a velocity*. Measured electrodynamics then requires the specific additional term $\propto \mathbf V_r \times (\mathbf u \times \mathbf N)/c_f^2$ (second order: one factor of transmitter velocity, one of receiver velocity). The canonical law's corresponding terms, computed on the same configuration, have the wrong coefficients — including a first-order receiver term ($-(\hat{\mathbf r}\cdot\mathbf V_r)/c_f$ times the main acceleration) that measured physics flatly lacks even for a *static* transmitter. That last mismatch is the sharpest single strike against the sweep factor, and it is the subject of Part 2's fourth act.

**Bulk consequence** (one paragraph, no wires): because each transmitter's contribution to any large collection, after the forced change-of-variables, is independent of that transmitter's own drift, no assembly-free collection of uniformly drifting architrinos — whatever the arrangement of polarities and velocities — produces any acceleration on any receiver that depends on the drifts. Derived, exact. If magnetism exists in this theory, it is not made of freely drifting architrinos.

**Forced versus chosen, the inventory:** forced — the $1/|D_t|$ density factor, the playback ratio $D_r/D_t$, the $1/r^2$ grade. Chosen — the sweep factor $|D_r|$; density-coupling versus coupling to the density's spatial derivative (ruled out: it gives $1/r^3$ statics, contradicting the inverse-square observed at rest); any acceleration component transverse to $\hat{\mathbf r}$; the sign convention of 0.4.

---

## Part 2 — The Accounting Derivation, in Five Acts

The main finding: two independent lines — the theory's own least-action bookkeeping, and the observer-level comparisons of Part 1 — converge on the same law:

$$
\mathbf A_r \;=\; \kappa\,\sigma_{tr}|q_tq_r|\,\frac{1}{r^2}\,\frac{c_f}{|D_t|}\,\hat{\mathbf r} \;+\; \mathbf A_{C},
$$

the ramp reading plus one additional term $\mathbf A_C$ required by the bookkeeping. $D_r$ survives only inside the playback ratio, where the calculus put it.

**Act 1 — the test configuration, with its caveat stated first.** The bookkeeping test needs the simplest two-architrino situation with one root each: two opposite polarities placed on a circular orbit. *Caveat (operator's, correct):* it is not established that an isolated opposite pair actually sustains a circular orbit — prior work indicates outward spiraling. The test does not need it to: like Part 1, this is an interrogation of the equation on prescribed worldlines, not a claim the worldlines are dynamical. Both architrinos are below $c_f$ throughout, so neither has self-roots (that qualifier is the velocity condition you asked about: self-roots require the transmitter's own past to have exceeded $c_f$; these histories never do). *And the spiral question itself:* under the sweep reading, the radial part of the pair's motion obeys an equation containing a term $-\,(a_0/c_f)\,\dot R$ (with $a_0<0$ for attraction), which *feeds energy into* radial motion on both the in-leg and the out-leg — an outward-driving tendency, derived for that reduced equation. Under the ramp reading that term is absent. Whether the full law (with $\mathbf A_C$) spirals in, out, or closes is exactly the kind of question the pending recomputation must settle.

**Act 2 — the leftover.** Deriving the equation of motion from the theory's action on that configuration does *not* yield the canonical law. A leftover acceleration term survives on each worldline — proportional to $\beta^2$ (second order: $(v/c_f)^2$) relative to the main term, radial on this configuration. The two worldlines' leftovers cancel as a pair, but a valid derivation requires each worldline's equation to close separately. Either the derivation method is broken, or the leftover is physical.

**Act 3 — the leftover is a lawful term, not an error.** The action's kernel splits exactly in two — algebra, nothing added — one piece producing the inverse-square ramp, the other producing exactly the leftover. Because the second piece is itself a legitimate part of the same action, the conservation machinery applies to it alone: it carries its own E/P/J accounts, and they balance. So the leftover is a *bookkeeping-required acceleration term*, $\mathbf A_C$: the pair interaction's velocity-dependent correction that makes energy and momentum conservation come out exact in a delayed-interaction world. To your question: a solitary resting architrino feels nothing from its own emission — its wake is isotropic and the term vanishes; $\mathbf A_C$ is a *pair* term, zero for static pairs, growing as $(v/c_f)^2$. It is an acceleration (it enters $d^2\mathbf X_r/dT^2$ like everything else), derived from the accounting, and the earlier nickname "recoil" is retired.

**Act 4 — the split is unambiguous.** The split in Act 3 used an arbitrary dividing point (an integration limit — "the marker"). If $\mathbf A_C$ changed when the marker moved, it would be an artifact of bookkeeping. It does not: the difference between any two marker choices depends only on the shell flight time $T_r - T_t$, and any such term differentiates to zero in every direction that produces acceleration. The only thing the marker sets is the zero-point of the stored wake energy — an additive constant with no dynamical effect. Derived.

**Act 5 — the two confrontations.** (i) Observer-level: for a *static transmitter* — wake perfectly even, $D_t = c_f$ — the sweep factor predicts a receiver moving toward the transmitter feels a stronger acceleration, first order in $\mathbf V_r/c_f$. Measured electrodynamics: a static charge accelerates a test charge identically whatever the test charge's velocity; velocity corrections among charges begin at second order, $(v/c)^2$. Could composite measuring equipment mask the discrepancy? No: the discrepancy *changes sign* when the receiver's motion reverses (approach versus retreat), while every known measurement correction depends on $v^2$ and is identical under reversal. A sign-even correction cannot cancel a sign-odd error. (ii) Derivation: varying the frozen action directly produces the acceleration coefficient — and it is $c_f/|D_t|$, with **no receiver factor**, because nothing in the action's uniform emission measure supplies one; the receiver's crossing rate appears exactly once, in the playback ratio, where it belongs. To obtain the sweep factor one would have to *add* an explicit postulate ("acceleration is proportional to the receiver's crossing rate") that the action does not contain. Both confrontations, independently, select the same law — the boxed one above.

**Costs and blockers, plainly.** Adopting the boxed law kills the candidate speed-governor mechanism (which was built from the sweep factor); makes the moment of crossing $c_f$ *more* singular (Part 3); requires recomputing the velocity-record coupling verdict (Part 4); and retires the sign question to bookkeeping (Part 6). Blocking its adoption: your judgment on whether any independent justification exists for the sweep postulate; the crossing singularity; and the uncomputed items — above all whether $\mathbf A_C$, evaluated on the single-drifting-electrino configuration of Part 1, supplies the missing first-order terms $+2p\mathbf N-\boldsymbol\beta$ that would reconcile the law with the present-position fact. If it does, the boxed law passes Part 1's test outright and the canonical law (which has no $\mathbf A_C$) cannot.

---

## Part 3 — The Width of a Shell

The shells' width and the smoothing of $1/r^2$ at zero separation are normally treated exactly as you say: regulators sent to the infinitesimal limit by calculus, with every physical answer required to converge. The finding: at one specific event the limit *fails*. When an accelerating architrino crosses $c_f$, it begins **overtaking its own previously emitted shell fronts from behind — from inside them — punching outward through fronts it launched moments earlier** (your correction; the emission points lie behind it, the fronts just ahead). The acceleration contribution of those first overtaken fronts has a *direction* that is stable under the limit, but a *magnitude* that grows without bound as the width goes to zero — and grows differently along different limiting paths. Calculus does not return an answer there. Either the width is a real physical scale (making the crossing impulse a finite predicted number), or the self-consistent feedback of the crossing tames it (uncomputed), or the boxed law's treatment of that event needs different structure. Below $c_f$, nothing of this matters and the sharp limit is clean.

## Part 4 — Shells Carrying a Velocity Record

The one per-hit route to magnetism left open by Part 1's bulk result: let each shell carry, in addition to its potential, a *record of the transmitter's velocity at the launch instant*, and let the receiver's acceleration couple to that record. Computed verdict: the simplest such coupling fails immediately (wrong direction structure); one specific coupling — acceleration $\propto \mathbf V_r\times(\mathbf u_{\text{record}}\times\hat{\mathbf r})/c_f^2$, which never changes the receiver's speed, only its direction — matches the observer-level magnetic requirement in the bulk; but demanding consistency across *all* geometries of the two-architrino configuration forces contradictory coefficient values (one coefficient must equal 2, 1, and 0 simultaneously). Verdict on the canonical law's base: no velocity-record coupling works. The verdict must be recomputed on the boxed law of Part 2 (whose $\mathbf A_C$ term changes the comparison); until then this route is neither open nor closed.

## Part 5 — (removed)

The "what if $c_f$ is much larger than assumed" possibility is retained only as noted in Parts 1–2: it uniformly shrinks every first-order $v/c_f$ discrepancy below measurability, and nothing else in this document depends on it.

## Part 6 — The Sign Question

From 0.4: is a crossing's orientation (the sign of $D_r$ — front sweeping over the receiver, versus receiver punching out through the front from inside) physically meaningful? The canonical law says no ($|D_r|$); the alternative says an inside-out crossing acts with reversed sign. The two agree everywhere below $c_f$. Above it they differ ontologically: on overtaking crossings the reversed sign turns self-repulsion into self-attraction — which would *oppose* the excursion beyond $c_f$ rather than feed it. The strength of that opposition is exactly the ill-defined quantity of Part 3, so the questions are linked. Under the boxed law of Part 2 this entire dispute dissolves: the sign survives only in the playback ratio, which is bookkeeping, not acceleration. If the sweep factor survives your judgment instead, the sign question returns and two decisive tests are already designed (a conservation-bookkeeping comparison on one super-$c_f$ record, and a fresh native crossing computation).

## Part 7 — Established Negatives (each one sentence, no references to chase)

Free drifting architrinos cannot produce drift-dependent acceleration in bulk, in any arrangement or geometry — magnetism is not made of drift. The receiver-side sweep factor contradicts observer-level measured physics at first order and cannot be rescued by any measurement-side correction. The transmitter-side first-order tilt (Part 1) afflicts *both* candidate laws and awaits the $\mathbf A_C$ computation. The velocity-record coupling fails on the canonical law. The historical "speed pinned at $c_f$" measurement traced to the condemned legacy solver and is struck. The $c_f$-crossing impulse has no sharp-limit value. Two instrument designs (straight streams) were retired in favor of the single-electrino probe you proposed.

## Part 8 — The Decisions

1. **Ramp or sweep** — the gate for everything. Current evidence: the action derivation produces ramp; the observer-level static-transmitter comparison demands ramp or an enormous $c_f$; sweep has intuitive appeal and no derivation. You are undecided; the concrete next evidence is decision 2.
2. **Compute $\mathbf A_C$ on the single-drifting-electrino configuration** (first order, resting observer): does it restore the present-position result? This single computation could separate the two laws cleanly — and also settles the spiral-direction question of Part 2, Act 1.
3. **The crossing singularity:** physical shell width, or self-consistent feedback — one must eventually be chosen under either law.
4. **Instruments:** the single-electrino probe (resting mode: transmitter-side terms; moving mode: the magnetic-definition test), plus the solver bookkeeping it needs.
5. **Promotions:** which derived results, if any, move toward canon — all currently held.
