# The Master Equation — Going-Forward Proposal

Operator walkthrough (full technical backing: the dispatch packet, same directory). This document proposes the going-forward master equation. Receiver velocity does not alter acceleration; the receiver-side crossing rate $D_r$ is bookkeeping only (playback ratio, root tracking). Promotion into canon and solver is a separate, explicit step — see the corpus migration plan at the end.

## Terminology

| Symbol / term | Meaning |
| --- | --- |
| $T$ | absolute time |
| transmitter | the emitting architrino; position $\mathbf X_t(T)$, velocity $\mathbf V_t$; polarity $q_t$ |
| receiver | the architrino being accelerated; position $\mathbf X_r(T)$, velocity $\mathbf V_r$; polarity $q_r$ |
| $T_t$ | a transmitter (emission) time — an instant in the transmitter's past |
| $T_r$ | the receiver (reception) time — the present instant analyzed |
| wake shell | the sphere launched at $T_t$, centered on $\mathbf X_t(T_t)$, radius growing at $c_f$ forever; the wake is the continuous stream of all shells |
| $r$, $\hat{\mathbf r}$ | separation $\mathbf X_r(T_r)-\mathbf X_t(T_t)$; its length, and the unit vector along the **emission ray** (from emission point toward receiver) |
| root | a value of $T_t$ solving the hit condition: an emission time whose shell crosses the receiver now |
| $D_t = c_f - \hat{\mathbf r}\cdot\mathbf V_t(T_t)$ | wake-density factor: wake laid down per emission time occupies radial span $D_t\,dT_t$ toward the receiver |
| $D_r = c_f - \hat{\mathbf r}\cdot\mathbf V_r(T_r)$ | crossing rate of the shell stream over the receiver. **Bookkeeping only** — appears in the playback ratio and root tracking, never in acceleration |
| fold | the event $D_t = 0$: roots created/destroyed in pairs |
| $\boldsymbol\beta_t$ | $\mathbf V_t/c_f$: the transmitter's velocity in shell-speed units (in Part 1 the drift is constant) |
| $\mathbf R$, $R$ | separation from the transmitter's **present** position: $\mathbf R = \mathbf X_r(T_r) - \mathbf X_t(T_r)$; $R = \|\mathbf R\|$ its length |
| $\mathbf N$ | $\mathbf N = \mathbf R/R$: the unit vector pointing from the transmitter's present position toward the receiver — the **present ray**. Contrast $\hat{\mathbf r}$, which points from the *emission* position toward the receiver — the emission ray |
| $p$ | $\mathbf N\cdot\boldsymbol\beta_t$: the radial part of the transmitter drift (positive = receding along the present ray) |
| grade | magnitude of the spatial rate of change of arriving wake potential; $1/r^2$ for a static transmitter |
| E/P/J | energy, momentum, angular momentum — the conserved accounts the master equation must balance |
| first / second order | term sizes $\propto (v/c_f)^1$ and $(v/c_f)^2$: at $v/c_f=0.01$, about $1\%$ and $0.01\%$ of the main term |
| $\mathbf A_C$ | the accounting term: a velocity-dependent pair acceleration required for E/P/J closure (Part 2) |

## The Master Equation

$$
\boxed{\;
\mathbf A_r \;=\; \sum_{\text{roots}} \kappa\,\sigma_{tr}\,|q_tq_r|\;\frac{1}{r^2}\;\frac{c_f}{|D_t|}\;\hat{\mathbf r} \;\;+\;\; \mathbf A_C \;}
$$

with $\sigma_{tr} = \mathrm{sign}(q_tq_r)$: like polarities accelerate apart along the emission ray, unlike together. In words: the receiver's acceleration is the grade of the arriving wake at its location; the transmitter-side density factor $c_f/|D_t|$ raises or lowers that grade; the receiver's own velocity plays no role. Orientation of a crossing — a shell front sweeping over the receiver, or the receiver punching out through a front from inside — is invisible to acceleration; it survives only in the sign of the playback ratio. Status of $\mathbf A_C$: derived to exist and to balance the E/P/J accounts on the tested configurations (Part 2); its value on further configurations is the chief open computation.

## Part 0 — The Scene

### 0.1 Transceivers and wakes

An architrino is a point transceiver in the Euclidean void. As transmitter it launches a shell every instant — expanding at $c_f$ from its launch point, forever. As receiver it is crossed at every instant by old shells (others', or its own past's if that past was ever fast enough), each crossing contributing acceleration by the master equation. Crossed by nothing, it moves straight at constant velocity. At any field point the summed wake potential is the sum of every arriving wake's contribution — electrino wakes below the neutral level, positrino wakes above. A moving transmitter's wake redistributes around it: densest directly ahead of the motion, sparsest directly behind, unchanged exactly abeam of the emission point, graded in between by the angle $\theta$ between the emission ray and $\mathbf V_t$ — $D_t = c_f - \|\mathbf V_t\|\cos\theta$, arriving density $\propto 1/D_t$.

### 0.2 The hit condition

Fix the receiver's present ($T_r$, $\mathbf X_r$). For a candidate past instant $T_t$: the distance to that emission point is $r$; the shell launched then has radius $c_f(T_r-T_t)$. The difference $g = r - c_f(T_r-T_t)$ classifies the shell: not yet arrived ($g>0$), already passed ($g<0$), crossing now ($g=0$). A **root** is such a $T_t$ — an emission time, labeling the emission event whose shell acts now.

### 0.3 Root count, folds, pairs

A transmitter whose whole history is slower than $c_f$ has **exactly one root, always**: scanning backward, the shell radius grows at $c_f$ while the distance to old emission points changes more slowly, so $g$ falls through zero once. The count changing at all requires the *transmitter's* past to have exceeded $c_f$ radially. When it changes, it changes by two: plot $g$ against $T_t$; as $T_r$ advances the curve deforms smoothly, and new zeros appear only when a valley bottom of the curve **lowers through the zero level** — grazing contact at one instant, then the valley floor is below zero and both sides cross: two roots born from one grazing emission time. The grazing condition is $D_t=0$: the **fold**.

After birth, the two roots separate with *opposite signs of $D_t$*, so their playback ratios (0.5) have opposite signs: **one root advances through the transmitter's history; the other runs backward into ever-older history.** Neither is locked; both move from the common birth instant. (A visualizer, `app-roots`, plotting root motion on the $(T_r,T_t)$ plane, is the planned tool for this.)

### 0.4 The density factor, before use

The wake is continuous — no gaps; "density" means how much wake stream occupies a unit of radial distance. Wake emitted during $dT_t$ spans $(c_f - \hat{\mathbf r}\cdot\mathbf V_t)\,dT_t = D_t\,dT_t$ toward the receiver: the later shell is smaller by $c_f\,dT_t$ but its center moved $\mathbf V_t\,dT_t$. Approach compresses ($D_t<c_f$: denser, a steeper arriving grade), recession stretches ($D_t$ up to $2c_f$: a flatter grade). The factor $1/|D_t|$ in the master equation is *forced* — the change-of-variables factor of the hit condition, ordinary calculus.

### 0.5 The playback ratio (where $D_r$ lives)

Differentiating $g=0$: $\dfrac{dT_t}{dT_r} = \dfrac{D_r}{D_t}$ — seconds of transmitter history consumed per second of receiver present. Negative (receiver punching out through fronts, above $c_f$ only): history read in reverse. This ratio, and root tracking, are $D_r$'s only jobs.

### 0.6 Rules of evidence; symmetries

Grades of claim: derived / measured / inferred / guessed, each with a falsifier. Tests for any candidate law: E/P/J accounts balance on the same records; observer-level correspondence preserved (with the caveat of Part 1); a configuration exists where rivals predict differently, independently checkable. A model whose adjustable parameters were tuned to a target is evidence only about itself.

Symmetries (acting on whole wake histories): polarity flip is exact ($q_tq_r$ unchanged) — any matter/antimatter imbalance must be built, not inherited. Translations/rotations exact; their conserved quantities are the E/P/J accounts. Time reversal is *not* a symmetry — only past shells act; the arrow of time is an axiom. No boost symmetry exists (absolute space and time): that absence is why the receiver-velocity question was a real question needing evidence, not symmetry, to settle. Superposition (contributions add; shells never act on shells) is a postulate on the watch list.

---

## Part 1 — The Single Drifting Architrino

One electrino moving with constant velocity $\mathbf V_t$ forever. Below $c_f$ it has no self-roots and no partners: the master equation itself makes its motion exactly uniform — nothing prescribed. Everything is closed-form at any $(x,y,z,T)$.

**The virtual observer.** At any field point ask: if a receiver popped into existence here, now, at rest, with no history — what acceleration does the master equation assign? (At rest there is no receiver-side anything; this mode probes the transmitter side alone.) The unique root gives, in closed form,

$$
\frac{r}{R} = \frac{p + \sqrt{1-\beta_t^2+p^2}}{1-\beta_t^2},
$$

and the assigned acceleration is the master equation evaluated there: main-term magnitude $\kappa|q_tq_r|\,(c_f/D_t)/r^2$, direction **exactly along the emission ray $\hat{\mathbf r}$** — from the emission point to the observer.

**Step by step: where the net acceleration points.** (1) The wake acting now was launched a delay $r/c_f$ ago, from $\mathbf X_t(T_t)$ — behind the transmitter's present position. (2) The main term points along the emission ray. (3) During the delay the transmitter moved $\mathbf V_t\,(r/c_f)$; the component of that motion *across* the line of sight tilts the present ray away from the emission ray by an angle $\approx \beta_{t\perp}$ (the transverse part of $\boldsymbol\beta_t$) — a first-order angle. (4) The main-term magnitude is modulated by the density factor: expanded, $\dfrac{R^2}{\kappa|q_tq_r|}|\mathbf A| = 1-2p+\dots$ — stronger on the side the transmitter approaches, weaker behind, a first-order modulation. (5) The accounting term, computed at the architrino level from the action on this configuration (`analysis-accounting-term-drift-chart.md`, 2026-07-18), is exactly $\mathbf A_C = 2p\mathbf N-\boldsymbol\beta_t+O(\beta_t^2)$, so main term $+\;\mathbf A_C = \mathbf N + O(\beta_t^2)$. In words: at first order the two pieces of the master equation combine so the net acceleration points along the present ray $\mathbf N$ with the static magnitude — derived entirely at the base level. Remaining gap: a second-order residual $+p\boldsymbol\beta_t$.

**Observer-level correspondence — stated with its caveat.** Measured electrodynamics lives in the macro assembly world, with a Noether sea between it and bare architrinos; whether it constrains a bare pair directly is itself an open mapping question. It enters here only as a correspondence *target*, never as a derivation input. That target: a uniformly moving charge accelerates a resting test charge exactly along the present ray, magnitude $\propto (1-\beta_t^2)/\big(R^2(1-\beta_t^2+p^2)^{3/2}\big) = \big(1+\tfrac12\beta_t^2-\tfrac32p^2+\dots\big)/R^2$ — no first-order terms. The base-level result of step (5) meets this target at first order. The second-order comparison (magnetic sector) stays open.

**And magnetism?** At observer level magnetism is *not* "the field is changing" — it is defined by its effect: an *additional acceleration on a moving test charge, proportional and perpendicular to that charge's velocity, doing no work*. A resting observer detects none, by definition. So the probe's second mode pops the observer in *with velocity*: the correspondence target is then the specific second-order term $\propto \mathbf V_r\times(\mathbf V_t\times\mathbf N)/c_f^2$. The master equation's main term has no receiver-velocity coupling at all — so whether $\mathbb{A}\mathbb{A}\mathbb{A}$ meets this target rests entirely on $\mathbf A_C$ at second order and on Part 4's recomputation. The changing arriving wake is real; whether it *acts* like observer-level magnetism is exactly that computation. Same caveat as above: the target is assembly-world; the derivation must stand at the architrino level.

**Bulk consequence.** Each uniformly drifting transmitter's contribution to any collection, after the forced change of variables, is independent of its own drift; so no assembly-free collection of drifting architrinos produces drift-dependent acceleration anywhere. Derived, exact. Magnetism, if recovered, is not made of free drift.

**Forced vs proposed inventory:** forced — $1/|D_t|$, the playback ratio, the $1/r^2$ grade. Proposed — no receiver-velocity factor; the accounting term $\mathbf A_C$ (derived from the action, Part 2). Still open choices — density coupling (vs its spatial derivative: excluded by inverse-square statics); no transverse response; superposition.

---

## Part 2 — The Accounting Derivation and $\mathbf A_C$

**Act 1 — test configuration, caveat first.** Two opposite polarities on a circular orbit, both forever below $c_f$ (hence no self-roots — that is the velocity qualifier), one root each. Caveat (operator's, correct): it is not established that an isolated opposite pair can sustain a circle. No matter: like Part 1, this interrogates the equation on stated worldlines; it does not claim the worldlines are dynamical. On the spiral question itself, the computed verdict on this configuration (dispatch packet; drift-chart analysis): $\mathbf A_C$ is inward and radial but cannot cancel the main term's forward first-order power; the leading secular tendency is outward — an isolated opposite pair does not bind by itself, and binding remains an environment/structure question.

**Act 2 — the leftover.** Deriving the equation of motion from the theory's action on this configuration does not reproduce the density-factor row alone: a leftover acceleration term survives on each worldline, second order ($\beta^2$) relative to the main term, radial here. The pair's leftovers cancel jointly, but a valid derivation must close each worldline separately. Either the method is broken or the term is physical.

**Act 3 — the leftover is lawful: $\mathbf A_C$.** The action's kernel splits exactly in two — algebra, nothing added: $K_0 = K_{\text{scale}} + K_C$. The scale piece yields the inverse-square density-factor row; $K_C$ yields precisely the leftover. The second piece is a legitimate part of the same action, so the conservation machinery applies to it alone: it carries its own E/P/J accounts, and they balance. So the leftover is the **accounting term** $\mathbf A_C$: an acceleration (units and role identical to the main term) required so that energy and momentum bookkeeping closes in a delayed-interaction world. A solitary resting architrino feels nothing from its own emission — isotropy cancels it; $\mathbf A_C$ is a pair term, zero for static pairs, growing as $(v/c_f)^2$ on this configuration. Its first-order content on the drifting-transmitter configuration of Part 1 is computed: $2p\mathbf N - \boldsymbol\beta_t$ (Part 1, step 5).

**Act 4 — the split is unambiguous.** The split used an arbitrary dividing point in an integral. If $\mathbf A_C$ depended on that choice it would be bookkeeping fiction. It does not: the difference between any two choices depends only on the flight time $T_r-T_t$, and any such term differentiates to zero in every direction that produces acceleration. The only thing the choice sets is the additive constant of stored wake energy, which has no dynamical effect. Derived.

**Act 5 — convergence.** The action derivation produces the master equation with $\mathbf A_C$ on its own, at the architrino level. Independently, the observer-level correspondence target of Part 1 — subject to the assembly-world caveat — selects the same form: a receiver-velocity factor would produce a sign-odd first-order structure that no sign-even measurement-side effect can mimic. Two unrelated lines, one equation: that convergence is why this document proposes it.

**Open blockers:** the $\mathbf A_C$ computation on general configurations (the drifting-transmitter and circular-pair configurations are computed; everything else is open); the $c_f$-crossing singularity (Part 3); the Part 4 recomputation; E/P/J closure spot-checks on further configurations; instruments — the single-electrino probe (resting mode: transmitter-side terms; moving mode: the magnetism-definition test) and the `app-roots` visualizer.

---

## Part 3 — The Width of a Shell

Shell width and the smoothing of $1/r^2$ at zero separation are normally scaffolding: sent to the infinitesimal limit, every physical answer required to converge — a delta driven to the limit by calculus. Finding: at one event the limit fails. When an accelerating architrino's speed passes $c_f$, it begins **overtaking, from inside and behind them, the shell fronts it launched moments earlier — punching outward through its own recent wake**. The impulse from those first overtaken fronts has a limit-stable direction but a magnitude that grows without bound as width goes to zero, and grows differently along different limiting paths: calculus returns no answer at that event. Either the width is a real physical scale (the crossing impulse becomes a finite prediction), or the self-consistent feedback of the crossing tames it (uncomputed), or that event needs added structure. Below $c_f$ the sharp limit is clean everywhere.

## Part 4 — Shells Carrying a Velocity Record

The one per-hit route to observer-level magnetism left open by Part 1's bulk result: each shell carries a record of $\mathbf V_t(T_t)$ (written $\mathbf V_{t,\text{rec}}$), and the receiver couples to it. Computed verdict so far: the simplest coupling fails (wrong direction structure); the coupling $\propto \mathbf V_r\times(\mathbf V_{t,\text{rec}}\times\hat{\mathbf r})/c_f^2$ — which never changes the receiver's speed, matching magnetism's defining property — passes the bulk comparison; but demanding consistency across all geometries of the two-architrino configuration forces one coefficient to equal 2, 1, and 0 simultaneously: contradiction. That verdict predates this proposal and must be recomputed against the master equation with $\mathbf A_C$. Until then this route is neither open nor closed.

---

## Corpus Migration Plan — First Draft

Migration is a separate, explicit step; nothing below is executed by this document.

**Documents.** Canon chapters stating the equation of motion adopt the master equation above; any statement carrying a receiver-velocity factor in the acceleration is replaced. Terminology propagates with it: $\mathbf V_t/\boldsymbol\beta_t$ subscript convention, "grade", emission ray vs present ray, $D_r$ as bookkeeping. This walkthrough remains the proposal source; the dispatch packet (P4, P10, P13, P16, P20) remains the technical backing. A canon derivation section for $\mathbf A_C$ (Acts 2–4) is written once the general-configuration computation lands.

**Apps.** EOM solver: implements the master equation; $\mathbf A_C$ enters as a derived pair term, never a tunable — blocked until $\mathbf A_C$ is computable beyond the tested configurations. Display/replay stack (shared adapter, Borg replay): consumes recorded EOM datasets, so no change at migration time; fixtures are regenerated after the solver lands, stale ones archived rather than upgraded in place. `app-roots`: built against the $(T_r,T_t)$ root-tracking bookkeeping of 0.3/0.5.

**Working files.** Claims ledger and memory entries updated to point at this proposal. E/P/J spot-check computations promoted from the dispatch packet into a repeatable harness. Any working file still stating a receiver-velocity acceleration factor is corrected or archived.

**Gate.** Nothing migrates until: $\mathbf A_C$ is computed on general configurations; E/P/J closure spot-checks pass on further configurations; Part 4 is recomputed.
