# The Master Equation — Going-Forward Proposal

Operator walkthrough. This document proposes the going-forward master equation while keeping the strengths of claim separate:

**Accepted (working decision).** The receiver-side crossing rate $D_r$ does not multiply the base acceleration. $D_r$'s established jobs are bookkeeping: the playback ratio and root tracking. The root-transport identity $D_r/D_t$ never justified using $|D_r|$ as an instantaneous acceleration factor.

**Strong candidate, conditional.** The base contribution $\kappa\,\sigma_{tr}\,|q_tq_r|\,(1/r^2)(c_f/|D_t|)\,\hat{\mathbf r}_t$ — derived from the candidate scalar action, conditional on the uniform emission measure (0.4).

**Outside the proposal.** The candidate term $\mathbf A_C$ is **not** part of the proposed master equation. Its accurate status: *a nonzero derivative produced by a candidate whole-path action; its interpretation as a physical, causal acceleration contribution is unproved.* Two gaps block it (Part 2): the action itself is assumed, not derived; and its full variation requires future worldline information, conflicting with a past-history-only law. Whether receiver velocity enters $\mathbf A_C$ is likewise open.

Promotion into canon and solver is a separate, explicit step — see the corpus migration plan at the end.

## Terminology

| Symbol / term | Meaning |
| --- | --- |
| $T$ | absolute time |
| transmitter | the emitting architrino; position $\mathbf X_t(T)$, velocity $\mathbf V_t$; polarity $q_t$ |
| receiver | the architrino being accelerated; position $\mathbf X_r(T)$, velocity $\mathbf V_r$; polarity $q_r$ |
| test point | a location and instant $(x,y,z,T)$, optionally with a stipulated velocity $\mathbf V_r$, at which one *calculates* the acceleration an architrino would feel if it were there. Not a participant: no worldline, no history, no back-reaction |
| $T_t$ | a transmitter (emission) time — an instant in the transmitter's past |
| $T_r$ | the receiver (reception) time — the present instant analyzed |
| wake shell | the sphere launched at $T_t$, centered on $\mathbf X_t(T_t)$, radius growing at $c_f$ forever; the wake is the continuous stream of all shells |
| $r$, $\hat{\mathbf r}_t$ | separation $\mathbf X_r(T_r)-\mathbf X_t(T_t)$: its length $r$, and the unit vector $\hat{\mathbf r}_t$ along the **emission ray** — from the emission point toward the receiver |
| root | a value of $T_t$ solving the hit condition: an emission time whose shell crosses the receiver now |
| $D_t = c_f - \hat{\mathbf r}_t\cdot\mathbf V_t(T_t)$ | wake-density factor: wake laid down per emission time occupies radial span $D_t\,dT_t$ toward the receiver |
| $D_r = c_f - \hat{\mathbf r}_t\cdot\mathbf V_r(T_r)$ | crossing rate of the shell stream over the receiver. Established jobs: playback ratio and root tracking — never a base-acceleration factor |
| fold | the event $D_t = 0$: roots created/destroyed in pairs |
| $\boldsymbol\beta_t$ | $\mathbf V_t/c_f$: the transmitter's velocity in shell-speed units (in Part 1 the drift is constant) |
| $\mathbf R$, $R$ | separation from the transmitter's **present** position: $\mathbf R = \mathbf X_r(T_r) - \mathbf X_t(T_r)$; $R = \|\mathbf R\|$ its length |
| $\hat{\mathbf r}_{\text{now}}$ | $\mathbf R/R$: the unit vector from the transmitter's present position toward the receiver — the **present ray**. A comparison coordinate only: nothing propagates from the present position (Part 1) |
| $p$ | $\hat{\mathbf r}_{\text{now}}\cdot\boldsymbol\beta_t$: the radial part of the transmitter drift (positive = transmitter approaching the receiver along the present ray) |
| $\boldsymbol\beta_{t\perp}$ | the transverse part of $\boldsymbol\beta_t$: $\boldsymbol\beta_t - p\,\hat{\mathbf r}_{\text{now}}$ — drift across the line of sight |
| grade | magnitude of the spatial rate of change of arriving wake potential; $1/r^2$ for a static transmitter |
| E/P/J | energy, momentum, angular momentum — the conserved accounts any master equation must balance |
| first / second order | term sizes $\propto (v/c_f)^1$ and $(v/c_f)^2$: at $v/c_f=0.01$, about $1\%$ and $0.01\%$ of the main term |
| $\mathbf A_C$ | the candidate accounting term: the causal-selection derivative of the candidate action kernel (Part 2). **Not part of the proposed equation** — its causal status is unresolved |

## The Proposed Master Equation

$$
\boxed{\;
\mathbf A_r \;=\; \sum_{\text{roots}} \kappa\,\sigma_{tr}\,|q_tq_r|\;\frac{1}{r^2}\;\frac{c_f}{|D_t|}\;\hat{\mathbf r}_t \;}
$$

conditional on uniform emission in transmitter time (0.4), with $\sigma_{tr} = \mathrm{sign}(q_tq_r)$: like polarities accelerate apart along the emission ray, unlike together. In words: the receiver's acceleration is the grade of the arriving wake at its location; the transmitter-side density factor $c_f/|D_t|$ raises or lowers that grade; the receiver's crossing rate $D_r$ never multiplies this contribution. For this base contribution, the orientation of a crossing — a shell front sweeping over the receiver, or the receiver punching out through a front from inside — is invisible to acceleration; it survives only in the sign of the playback ratio. Whether some *additional* term reintroduces receiver-velocity or orientation dependence is exactly the open $\mathbf A_C$ question (Part 2).

**Where $\mathbf A_C$ stands.** Not in the box. It is a candidate additional contribution produced by the variation of a candidate action, computed on two configurations, with an unresolved conflict with causality (Part 2). If it survives its audit — in particular, if a **past-history-only** derivation produces it — the box is amended then, explicitly.

## Part 0 — The Scene

### 0.1 Transceivers and wakes

An architrino is a point transceiver in the Euclidean void. As transmitter it launches a shell every instant — expanding at $c_f$ from its launch point, forever. As receiver it is crossed at every instant by old shells (others', or its own past's if that past was ever fast enough), each crossing contributing acceleration by the master equation. Crossed by nothing, it moves straight at constant velocity. At any field point the summed wake potential is the sum of every arriving wake's contribution — electrino wakes below the neutral level, positrino wakes above.

A moving transmitter's wake is misshapen everywhere: each shell stays a perfect sphere centered on its own launch point, but the launch points are strung along the drift, so the nested pattern is off-center in every direction. The radial density of the arriving stream follows the angle $\theta$ between the emission ray $\hat{\mathbf r}_t$ and $\mathbf V_t$: $D_t = c_f - \|\mathbf V_t\|\cos\theta$, arriving density $\propto 1/D_t$ — compressed ahead ($\theta = 0$), stretched behind ($\theta = 180^\circ$), varying smoothly as the cosine in between. At exactly $\theta = 90^\circ$ (emission ray orthogonal to the drift) the radial spacing of shells matches the static value, even though the pattern there is still off-center.

### 0.2 The hit condition

Fix the receiver's present ($T_r$, $\mathbf X_r$). For a candidate past instant $T_t$: the distance to that emission point is $r$; the shell launched then has radius $c_f(T_r-T_t)$. The difference $g = r - c_f(T_r-T_t)$ classifies the shell: not yet arrived ($g>0$), already passed ($g<0$), crossing now ($g=0$). A **root** is such a $T_t$ — an emission time, labeling the emission event whose shell acts now.

### 0.3 Root count, folds, pairs

A transmitter whose whole history is slower than $c_f$ has **exactly one root** — *given an eternal history*: scanning backward, the shell radius grows at $c_f$ while the distance to old emission points changes more slowly, so $g$ falls through zero once. A finite retained history weakens this: there can be no root at all, and roots can enter or leave through the history-window boundary without any interior fold pair. With that caveat: the interior count changing at all requires the *transmitter's* past to have exceeded $c_f$ radially. When it changes, it changes by two: plot $g$ against $T_t$; as $T_r$ advances the curve deforms smoothly, and new zeros appear only when a valley bottom of the curve **lowers through the zero level** — grazing contact at one instant, then the valley floor is below zero and both sides cross: two roots born from one grazing emission time. The grazing condition is $D_t=0$: the **fold**.

After birth, the two roots separate with *opposite signs of $D_t$*, so their playback ratios (0.5) have opposite signs: **one root advances through the transmitter's history; the other runs backward into ever-older history.** Neither is locked; both move from the common birth instant. (A visualizer, `app-roots`, plotting root motion on the $(T_r,T_t)$ plane, is the planned tool for this.)

### 0.4 The density factor, before use

The wake is continuous — no gaps; "density" means how much wake stream occupies a unit of radial distance. Wake emitted during $dT_t$ spans $(c_f - \hat{\mathbf r}_t\cdot\mathbf V_t)\,dT_t = D_t\,dT_t$ toward the receiver: the later shell is smaller by $c_f\,dT_t$ but its center moved $\mathbf V_t\,dT_t$. Approach compresses ($D_t<c_f$: denser, a steeper arriving grade), recession stretches ($D_t$ up to $2c_f$: a flatter grade).

The factor $1/|D_t|$ is derived **conditional on one modeling choice**: that wake is laid down uniformly in transmitter time — the emission measure. Given that measure, the factor is the change-of-variables factor of the hit condition, ordinary calculus with no further freedom; the $c_f$ in the numerator is static normalization. The measure itself remains a choice of the model, on the inventory of Part 1.

### 0.5 The playback ratio (where $D_r$ lives)

Differentiating $g=0$: $\dfrac{dT_t}{dT_r} = \dfrac{D_r}{D_t}$ — seconds of transmitter history consumed per second of receiver present. Negative (receiver punching out through fronts, above $c_f$ only): history read in reverse. These — the playback ratio and root tracking — are $D_r$'s **established** jobs. Transport of roots is not transfer of acceleration: the identity $dT_t/dT_r = D_r/D_t$ never licensed $|D_r|$ as an instantaneous acceleration factor. Declaring these $D_r$'s *only possible* jobs would be premature until the moving-receiver variation of $K_C$ is computed (Part 2).

This is the actual justification for the accepted decision, and it deserves plain words: **transmitter motion changes the spatial density of deposited wake history; receiver motion changes how quickly a root label moves through that history; a playback rate is not an acceleration law.**

### 0.6 Rules of evidence; symmetries

Grades of claim: derived / measured / inferred / guessed / assumed, each with a falsifier. Tests for any candidate law: E/P/J accounts balance on the same records; a configuration exists where rivals predict differently, independently checkable. Observer-level physics (measured electrodynamics, magnetism) is *not* a test input at this level: it lives in the macro assembly world with the Noether sea between it and bare architrinos, and reproducing it must itself be **derived** — assemblies built in the sea on this master equation — an open obligation recorded in the blockers. A model whose adjustable parameters were tuned to a target is evidence only about itself.

Symmetries (acting on whole wake histories): polarity flip is exact ($q_tq_r$ unchanged) — any matter/antimatter imbalance must be built, not inherited. Translations/rotations exact; their conserved quantities are the E/P/J accounts. Time reversal is *not* a symmetry — only past shells act; the arrow of time is an axiom. No boost symmetry exists (absolute space and time): that absence is why the receiver-velocity question was a real question needing evidence, not symmetry, to settle. Superposition (contributions add; shells never act on shells) is a postulate on the watch list.

---

## Part 1 — A Uniform-Drift Diagnostic (not a justification)

**What this Part is and is not.** A closed-form diagnostic on the simplest moving case: one transmitter, constant velocity, evaluated at a resting test point. It **justifies nothing in the proposal**: at a resting test point $D_r = c_f$, so the historical base multiplier $|D_r/D_t|$ and the proposed $c_f/|D_t|$ coincide identically — both candidate laws give the same answer on every configuration in this Part. Its value is visibility: every quantity is closed-form, and one candidate cancellation can be exhibited exactly. It is kept in the body only because Part 2 refers to its computed coefficient; it could otherwise live in an appendix.

**The test point.** Nothing pops into existence. Pick a location and instant $(x,y,z,T)$ and *calculate* the acceleration an architrino would feel if it were there, at rest ($\mathbf V_r=0$). A test point is a field evaluation, not a participant: no worldline, no history, no back-reaction. (At rest, every receiver-velocity effect is switched off, so the evaluation isolates transmitter-side structure.)

**Causality, first.** Whatever acts at the test point comes from a past emission event, full stop. Nothing at the transmitter's present position reaches back and modifies the arriving shell. The present position enters below only as a **comparison coordinate**: for constant velocity it is algebraically reconstructible from the emission event,

$$
\mathbf X_t(T_r) = \mathbf X_t(T_t) + \mathbf V_t\,(T_r - T_t),
$$

the way a delayed radar return tells you where the aircraft *was*, and known constant velocity lets you compute where it *is now*. Performing that reconstruction adds no information to the received signal and gives the shell no knowledge of the present position.

**Two rays.** The wake crossing the test point now was launched a flight time $r/c_f$ ago, from the emission point $\mathbf X_t(T_t)$ — behind the transmitter's present position. So two directions matter: the emission ray $\hat{\mathbf r}_t$ (emission point → test point — the direction the base contribution pushes along) and the present ray $\hat{\mathbf r}_{\text{now}}$ (present position → test point). During the flight the transmitter moved $\mathbf V_t\,(r/c_f)$; the part of that motion *across* the line of sight opens an angle $\approx \beta_{t\perp}$ between the rays. At $\beta_t = 0.1$ abeam, that is about $0.1$ rad $\approx 6^\circ$ — a first-order angle.

**The geometry, exactly.** Straight-line motion plus the hit condition ($r = c_f(T_r - T_t)$) gives a quadratic in $r$ whose one physical solution is

$$
\frac{r}{R} = \frac{p + \sqrt{1-\beta_t^2+p^2}}{1-\beta_t^2}.
$$

In words: how much farther or nearer the emission point is than the present position. Approaching ($p>0$): the transmitter used to be farther away, so $r > R$. Receding ($p<0$): $r < R$. On-axis checks: test point dead ahead of the drift, $r = R/(1-\beta_t)$; dead behind, $r = R/(1+\beta_t)$.

**What the base contribution gives.** Magnitude $\kappa|q_tq_r|\,(c_f/D_t)/r^2$, direction $\sigma_{tr}\hat{\mathbf r}_t$. Work the dead-ahead case exactly: density gain $c_f/D_t = 1/(1-\beta_t)$, but distance loss $1/r^2 = (1-\beta_t)^2/R^2$ — the product is $(1-\beta_t)/R^2$. The emission-distance loss *beats* the density gain: the base contribution alone is **weaker on the approach side**, and by the mirror computation $(1+\beta_t)/R^2$ **stronger behind**. (Note the contrast with 0.1: the arriving wake is *densest* ahead — but acceleration also carries $1/r^2$ from the farther emission point, and that wins.) To first order at any angle, as a vector:

$$
\mathbf A_{\text{base}} \approx \sigma_{tr}\,\frac{\kappa|q_tq_r|}{R^2}\Big[(1-p)\,\hat{\mathbf r}_{\text{now}} + \boldsymbol\beta_{t\perp}\Big].
$$

In words: compared to a static transmitter sitting at the present position, the base contribution is weakened by $p$ on the approach side (strengthened behind), and tilted off the present ray by the transverse drift $\boldsymbol\beta_{t\perp}$ — the push leans toward where the transmitter is heading, because it comes from the emission point behind.

**The candidate term evaluated here — with its truncation stated.** The one-way, receiver-side variation of the ordered-pair kernel (Part 2), evaluated on this configuration (`analysis-accounting-term-drift-chart.md`, 2026-07-18), assigns the additional coefficient

$$
\mathbf A_C \approx \sigma_{tr}\,\frac{\kappa|q_tq_r|}{R^2}\Big[p\,\hat{\mathbf r}_{\text{now}} - \boldsymbol\beta_{t\perp}\Big]
\quad\text{(equivalently } 2p\,\hat{\mathbf r}_{\text{now}}-\boldsymbol\beta_t\text{)}.
$$

This is **not** the Euler equation of a complete two-transceiver system. A real architrino at the test point would also be a transmitter, and the complete variation would include the effect of its present emission on the partner's *future* reception — precisely the future-dependence problem of Part 2. What is displayed is the receiver side of one selected ordered-pair kernel, nothing more.

**The cancellation.**

$$
\mathbf A_{\text{base}} + \mathbf A_C = \sigma_{tr}\,\frac{\kappa|q_tq_r|}{R^2}\,\hat{\mathbf r}_{\text{now}} + O(\beta_t^2).
$$

In words: within that truncated calculation, the two delayed terms cancel their first-order aberration when expressed in present-separation coordinates — the sum happens to align with the mathematically reconstructed present position, at static magnitude. A statement about how two terms combine on this special history, **not** about causation, and not evidence for the action: both displayed pieces come from the receiver side of the same selected kernel, so the cancellation is internal consistency of a truncated variation. Remaining at second order: a residual $+p\boldsymbol\beta_t$.

**Why compute present-ray alignment at all?** Because observer-level electrodynamics exhibits a corresponding uniform-motion cancellation. Checking whether the candidate action happens to reproduce that pattern is a **downstream recovery comparison** — worth recording, but per 0.6 not evidence at this level, and it is not established that a bare architrino pair must reproduce the observer-level result directly (the sea and assemblies may alter the mapping). The result would gain real significance only if a complete, past-history-only two-transceiver calculation reproduced the same cancellation without prescribing future motion.

**Claim grades for this Part.**

| Claim | Grade |
| --- | --- |
| Constant-velocity delayed geometry ($r/R$ closed form) | derived |
| Base contribution at a resting test point | derived, conditional on the emission measure |
| $\mathbf A_C$ coefficient on this configuration | derived, for the one-way receiver-side variation only |
| First-order cancellation | derived algebra within that truncation |
| The cancellation validates the action | unsupported |
| Present-position alignment is physically required | unsupported |
| Result applies to a real reciprocal pair | unsupported |

**And magnetism?** Magnetism, wherever it appears, is defined by its effect: an *additional acceleration on a moving receiver, proportional and perpendicular to that receiver's velocity, doing no work*. A resting test point registers none, by definition — hence the diagnostic's second mode evaluates the test point *with a stipulated velocity* $\mathbf V_r$. That cross-product form is an **observer-level recovery target, not an architrino-level premise**. The proposed base contribution has no receiver-velocity coupling, so whether any such effect emerges rests on the moving-receiver variation of $K_C$ (uncomputed) and on Part 4's recomputation. The changing arriving wake at a resting test point is real, but it is not magnetism; magnetism requires the receiver-velocity-coupled acceleration, which is exactly the open computation.

**Derived vs chosen inventory:** derived, conditional on the emission measure — $1/|D_t|$ (change of variables), the playback ratio, the $1/r^2$ grade. Chosen — the uniform emission measure itself (0.4). Accepted decision — the $D_r$ removal from the base multiplier (justified in 0.5, not here). Still open choices — density coupling (vs its spatial derivative: excluded by inverse-square statics); no transverse response; superposition.

---

## Part 2 — Action-Scaffold Audit: the Candidate Term $\mathbf A_C$ (unresolved)

This Part audits a candidate derivation; it does not deliver a master-equation term. Two independent gaps are identified below: the action is assumed, not derived (first missing premise), and its complete variation requires future worldline information (second problem). Until at least the second is resolved, $\mathbf A_C$ stays outside the proposed equation.

**Act 1 — test configuration, caveat first.** Two opposite polarities on a circular orbit, both forever below $c_f$ (hence no self-roots — that is the velocity qualifier), one root each. Caveat (operator's, correct): it is not established that an isolated opposite pair can sustain a circle. No matter: this interrogates the candidate action on *stated* worldlines; it does not claim the worldlines are dynamical. On the spiral question, what is actually derived (2026-07-18): on the imposed circular history, the base contribution has positive instantaneous tangential power on each worldline; the candidate $\mathbf A_C$ here is radial and does no instantaneous work; so the initial energy flow points outward. "The pair does not bind" would require evolving a self-consistent history and checking the orbit-averaged result — an inference beyond this calculation, and open. Falsifier for the unbinding inference: a self-consistent evolved pair with nonpositive orbit-averaged power, or a bounded return history.

**Act 2 — the leftover, and the live possibilities.** Varying the candidate action on this configuration does not reproduce the base contribution alone: a leftover acceleration term survives on each worldline, second order ($\beta^2$) relative to the main term, radial here. The pair's leftovers cancel jointly, but a valid derivation must close each worldline separately. The live possibilities are wider than "broken method or physical term": the scalar action may be a useful diagnostic but not the fundamental action; ordinary stationary-action variation may be unsuitable for a delayed-only law; omitted future or endpoint terms may change the result; the physical master equation may be acceleration-first and not come from any such action; or a different action may produce the base contribution with no leftover at all. The remainder of this Part examines the leftover on the working assumption that the kernel is taken seriously — and records exactly where that assumption fails.

**Act 3 — what the leftover is: the causal-selection derivative.** Start from the regularized scalar kernel

$$
K_0^{(\eta)} = \frac{\delta_\eta(g)}{r},
$$

in words: a shell of width $\eta$ concentrated on the hit condition $g=0$, weighted by $1/r$. Its variation splits exactly in two — algebra, nothing added:

$$
DK^{(\eta)}_{\text{scale}} = -\frac{\delta_\eta(g)}{r^2},
\qquad
DK^{(\eta)}_C = -\frac{\delta'_\eta(g)}{c_f\,r}.
$$

In words, this is the chain rule on a delayed interaction. The kernel depends on the receiver's path in two ways: through the amplitude $1/r$ at the selected emission event, and through *which* past emission event the causal constraint $g=0$ selects. Varying the path therefore produces two terms:

$$
d\!\left(\frac{\delta(g)}{r}\right)
= \underbrace{\delta(g)\,d\!\left(\frac1r\right)}_{\text{scale contribution}}
\;+\; \underbrace{\frac1r\,\delta'(g)\,dg}_{\text{causal-selection contribution}}.
$$

An engineering analogue: a variable-delay system $y(x) = a\big(x,\tau(x)\big)$ differentiates to $\dfrac{dy}{dx} = \dfrac{\partial a}{\partial x} + \dfrac{\partial a}{\partial\tau}\dfrac{d\tau}{dx}$ — the direct amplitude change, plus a second term because the selected delay itself shifts as the geometry changes. $\mathbf A_C$ is a term of the second kind. But note what the chain rule does and does not prove: it proves the selected action has two derivatives. **It does not prove both derivatives are physical acceleration mechanisms.** Differentiating a proposed score assigned to whole paths tells us how that score changes; it becomes an acceleration law only after the theory justifies the score as its physical action.

After the emission-time delta collapse, the scale piece yields the inverse-square density-factor contribution; the $K_C$ piece yields precisely the leftover. On the tested scope — branch-preserving regular neighborhoods (no folds, positive separation), endpoint-clear or period-matched boundary conventions — each piece carries its own E/P/J accounts and they balance. A solitary resting architrino feels nothing from its own emission — isotropy cancels it; the candidate $\mathbf A_C$ is a pair term, zero for static pairs, growing as $(v/c_f)^2$ on this configuration; its coefficient on the drifting-transmitter configuration is computed (Part 1).

**Act 4 — the split itself is unambiguous.** The split used an arbitrary dividing point in an integral. If the leftover depended on that choice it would be bookkeeping fiction. It does not: the difference between any two choices depends only on the flight time $T_r-T_t$, and any such term differentiates to zero in every direction that produces acceleration. The only thing the choice sets is the additive constant of stored wake energy, which has no dynamical effect. Derived — this finding survives whatever verdict the audit reaches.

**The first missing premise — why this action?** The kernel $K_0 = \delta_\eta(g)/r$ is *selected*, not derived: nothing in the wake ontology or the accepted primitives forces it, and the canonical action chapter itself calls the construction a Fokker-type **scaffold**, not an established fundamental action. Its $1/r$ amplitude is attractive precisely because varying $1/r$ produces $1/r^2$ — which creates a circularity risk: (1) want inverse-square acceleration; (2) choose a $1/r$ action; (3) vary it, recover an inverse-square term; (4) call the recovery a derivation. That is an action selected partly for having the desired derivative. Every "derived" in this Part is conditional on this unproved premise.

**The second problem — future dependence.** The interaction action is schematically

$$
S_{\mathrm{int}} = \tfrac12\sum_{i\ne j}\int dT\,dT'\;\Theta(T-T')\;K\big(\mathbf X_i(T),\mathbf X_j(T')\big),
$$

each link running from an earlier emission $T'$ to a later reception $T$. Now vary $\mathbf X_i(s)$ — architrino $i$'s position at one instant $s$. It appears in the action in **two roles**: as a receiver at $s$ (responding to $j$'s emissions at $T'<s$) and as a transmitter at $s$ (whose shell reaches $j$ at receptions $T>s$). So the complete derivative has the structure

$$
\frac{\delta S}{\delta \mathbf X_i(s)}
= \underbrace{\int_{T'<s}(\text{past-source contribution})}_{\text{causal}}
\;+\; \underbrace{\int_{T>s}(\text{future-reception contribution})}_{\text{requires the future path}}.
$$

The step function $\Theta$ makes each individual link causal — emission before reception — but does not make the *variation* causal: the Euler equation at the present instant still depends on where the partner **will be** when it receives the shell emitted now. The circular-pair computation of $\mathbf A_C$ in fact uses that future-reception geometry (its supporting calculation includes the transposed future-source contribution). As it stands, then, $\mathbf A_C$ is not a causal initial-value contribution and cannot be handed to the EOM solver.

What would rescue it — at least one required, **none currently present**: (1) a proof that the future-looking contribution cancels or can be rewritten entirely in retained past wake state; (2) additional stored wake variables whose current state already contains everything needed, making the evolution causal; (3) a doubled-history or nonconservative variational construction built specifically for delayed dynamics; (4) a derivation of $\mathbf A_C$ directly from past wake mechanics, independent of the whole-path action.

**What the E/P/J closure does and does not say.** Any translation-, rotation-, and time-translation-invariant action generates Noether accounts; their balancing proves consistency among the chosen action, its equations, and its own definitions of stored interaction quantities. It does not prove the action describes nature, and it does not rank this action against rivals. Moreover the stored wake quantities are defined through cross-cut integrals that involve future reception times: valid global accounting once a complete solution is known, but not obviously operational state variables available to a causal solver at the current instant.

**Claim grades for this Part.**

| Claim | Grade |
| --- | --- |
| Chain-rule split of $K_0$ | derived |
| Split independence of the dividing point (tested neighborhood) | derived |
| Noether accounts for each action piece | derived internally, under boundary assumptions |
| $K_0$ is the fundamental action | assumed |
| $\mathbf A_C$ is a physical acceleration contribution | inferred from the assumed action |
| $\mathbf A_C$ is computable from retained past history | not established |
| Circular-pair $\mathbf A_C$ defines causal dynamics | not established — uses future-reception geometry |
| E/P/J accounts independently select the law | false |
| General master equation = base + $\mathbf A_C$ | open |

**Closure goal of this Part:** determine whether any past-history-only derivation produces $\mathbf A_C$. Until one does, $\mathbf A_C$ stays outside the proposed master equation.

**Open blockers:** a past-history-only derivation (or refutation) of $\mathbf A_C$; justification of $K_0$ as physical action rather than diagnostic scaffold; the moving-receiver variation of $K_C$ — does receiver velocity enter?; the $c_f$-crossing singularity (Part 3 — a promotion blocker); the Part 4 recomputation; E/P/J closure spot-checks on further configurations; the observer-level derivation — build assemblies in the Noether sea on the master equation and derive measured electrodynamics, including magnetism, from them; instruments — the single-transmitter diagnostic (resting mode: transmitter-side terms; moving mode: the magnetism-definition test) and the `app-roots` visualizer.

---

## Part 3 — The Width of a Shell

Shell width and the smoothing of $1/r^2$ at zero separation are normally scaffolding: sent to the infinitesimal limit, every physical answer required to converge — a delta driven to the limit by calculus. Finding: at one event the limit fails. When an accelerating architrino's speed passes $c_f$, it begins **overtaking, from inside and behind them, the shell fronts it launched moments earlier — punching outward through its own recent wake**. The impulse from those first overtaken fronts has a limit-stable direction but a magnitude that grows without bound as width goes to zero, and grows differently along different limiting paths: calculus returns no answer at that event. The proposed base contribution makes this *worse* than the historical form did — the vanishing $D_r$ numerator that once softened the coincident-endpoint event is gone. And the analysis so far is a frozen-history, newborn-root reduction; a self-consistent treatment of the transition could still change the verdict. Either the width is a real physical scale (the crossing impulse becomes a finite prediction), or the self-consistent feedback of the crossing tames it (uncomputed), or that event needs added structure. Below $c_f$ the *source-normal fold* is excluded — but that alone does not clear coordinate collisions, finite-history endpoints, or every regulator question; "clean everywhere" is claimed only for the eternal-history sharp limit away from coincident points. **This is a promotion blocker, not a side note** — see the migration gate.

## Part 4 — Shells Carrying a Velocity Record

A candidate per-hit route to receiver-velocity-coupled acceleration: each shell carries a record of $\mathbf V_t(T_t)$ (written $\mathbf V_{t,\text{rec}}$), and the receiver couples to it. The cross-product target here is observer-level, a recovery goal — not an architrino-level premise. Computed verdict so far: the simplest coupling fails (wrong direction structure); the coupling $\propto \mathbf V_r\times(\mathbf V_{t,\text{rec}}\times\hat{\mathbf r}_t)/c_f^2$ — which never changes the receiver's speed — passes the bulk comparison; but demanding consistency across all geometries of the two-architrino configuration forces one coefficient to equal 2, 1, and 0 simultaneously: contradiction. That verdict predates this proposal and must be recomputed against the proposed base contribution (and against $\mathbf A_C$ if it survives its audit). Until then this route is neither open nor closed.

---

## Corpus Migration Plan — First Draft

Migration is a separate, explicit step; nothing below is executed by this document.

**Documents.** Canon chapters stating the equation of motion adopt the proposed master equation *once the gate below is met*; any statement using a receiver-side crossing-rate factor in the base acceleration is replaced. Terminology is a **separate policy decision**, not bundled with the physics: current canon uses $D_s$ and $D_T$; this document uses $D_t$/$D_r$, $\hat{\mathbf r}_t$/$\hat{\mathbf r}_{\text{now}}$, and "grade." Until the terminology decision is made, canon keeps its symbols and this document maps onto them at the point of contact. A canon section on $\mathbf A_C$ is written only if it survives the causality audit of Part 2.

**Self-containment obligation.** This walkthrough is the proposal source. It is not yet fully self-contained: the regularized kernel manipulations, the wake-history transfer definitions behind Part 2's E/P/J accounts, and the branch/endpoint conventions are stated here only in outline. Folding those derivations in, so a reader can check Part 2 from this document alone, is part of the documents workstream.

**Apps.** EOM solver: implements the proposed base contribution. $\mathbf A_C$ does not enter the solver in any form until it has a **past-history-only** definition — evaluable from current state plus retained past history on arbitrary admissible histories (including moving receivers and branch transitions), with no prescribed future path and no chart-specific formulas; if it enters, it enters as a derived pair term, never a tunable. Display/replay stack (shared adapter, Borg replay): consumes recorded EOM datasets, so no change at migration time; fixtures are regenerated after the solver lands, stale ones archived rather than upgraded in place. `app-roots`: built against the $(T_r,T_t)$ root-tracking bookkeeping of 0.3/0.5.

**Working files.** Claims ledger and memory entries updated to point at this proposal. E/P/J spot-check computations promoted into a repeatable harness. Any working file still using a receiver-side crossing-rate factor in the base acceleration is corrected or archived.

**Gate.** Nothing migrates until: $K_0 = \delta_\eta(g)/r$ is justified as the physical action rather than a diagnostic scaffold, **or** the base contribution is established on independent grounds; $\mathbf A_C$ has a past-history-only derivation or is formally excluded; E/P/J closure spot-checks pass on further configurations; the $c_f$-crossing (coincident-endpoint) transition has a finite, regulator-independent resolution (Part 3); Part 4 is recomputed.
