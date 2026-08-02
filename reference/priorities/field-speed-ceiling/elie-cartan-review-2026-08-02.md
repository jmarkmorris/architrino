# Élie Cartan Field-Speed Ceiling Review: Section 10 Collinear Stress Test

**Review identifier:** `FSC-001-EC1-2026-08-02`
**Reviewer lens:** [Élie Cartan specialist role](../../research-office/specialists/roles-geometry-dynamics/elie-cartan.md)
**Review date:** 2026-08-02
**Scope:** Section 10 of the
[mathematics packet](mathematics-geometry-dynamical-system.md), its guard and
reset in Sections 5 and 9, the
[capped collinear endpoint reanalysis](capped-collinear-endpoint-reanalysis.md),
the [near-contact theorem target](near-contact-separating-trace-incompatibility-theorem-target.md),
and the [coincidence continuation scratchpad](coincidence-continuation-scratchpad.md).
Normalized units $c_f=1$ throughout; $K=\kappa|q_1q_2|$.
**Claim level:** review findings and a proposed solution program. No ceiling,
event law, continuation, measure, or canonical change is adopted or advanced by
this file.
**Role discipline:** this is a creative analytical lens, not theory or
acceptance authority. Every result below is graded where stated.

## Review method

The whole packet was read; the analysis below re-derives the Section 10.7
approach chart and both companion continuation calculations independently
before critiquing them. The central new step is to examine the coincidence
continuation with both partial derivatives of the causal-root function on an
equal footing, the way a moving-frames treatment would insist: the wake of an
emission is a hypersurface in $(T,\mathbf x)$, and a reception is an incidence
of the receiver worldline with that hypersurface. Incidence has two
transversality numbers, not one:

$$
\partial_s g = D_t,
\qquad
\partial_T g = -D_r,
\qquad
D_r = c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_r.
$$

Plainly: a wake front and a receiver path can be tangent in two independent
ways. The document's machinery watches the transmitter-side number $D_t$
everywhere; the receiver-side number $D_r$ appears only inside lemma
hypotheses. The Section 10 impasse turns out to live exactly on the
receiver-side degeneracy.

---

## Part I — Critique of Section 10

### EC-1. The event-stratum catalogue is transmitter-sided, and the continuation problem sits on a receiver-side stratum the catalogue cannot name

The Section 9 catalogue types every stratum by $g$, the delay sign, and $D_t$:
regular isolated root, degenerate isolated root ($D_t=0$), characteristic
interval, zero-delay diagonal, cross-channel simultaneity, open-domain fold.
No row of the table tests $D_r$. That was harmless in the canonical
sub-ceiling model, where

$$
D_r
=
c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_r
\ge
c_f-\|\mathbf V_r\|
>0
$$

automatically. At the ceiling with $c_a=c_f$, $D_r$ can vanish, and on the
mirror separating trace it does vanish identically (EC-3). The stress test
therefore fails on a stratum the document's own classification grid has no
cell for.

Plainly: the whole catalogue asks "does the wake family cross the
transmitter's history cleanly." Nobody asks "does the wake front cross the
*receiver* cleanly." Sub-ceiling, the second question answers itself. On the
ceiling it does not, and Section 10's unsolved case is precisely a
receiver-side tangency.

Claim grade: `derived` (inspection of the catalogue plus the $D_r$ identity).
Falsifier: a catalogue row or guard clause that already routes a
positive-delay, $D_t\ne0$, $D_r=0$ stratum.

### EC-2. The isolated-crossing reception rule's wording and its geometric rationale disagree on exactly the row that blocks continuation

The rule admits "an isolated, positive-delay causal root with $D_t\ne0$." The
straight-through obstruction row (the coincidence-time emission received at
every later instant) satisfies all three clauses: it is isolated in emission
time, has positive delay $\delta$, and has $D_t=2$. So the rule's *wording*
books it as ordinary, and the $\delta^{-2}$ obstruction follows.

But the rule's stated *rationale* — "an architrino travelling with its own
wake cannot be overtaken by that wake"; reception is a front sweeping across a
receiver — classifies the same row oppositely. That front never crosses the
receiver: the receiver rides it (EC-3). The rule's letter and its geometric
justification give opposite dispositions on the decisive row. That internal
tension, not a missing regularization, is the actual hinge of the Section 10
impasse.

Plainly: the document already believes "no crossing, no ordinary row" — it
uses that belief to silence the self family. It just wrote the rule using the
transmitter-side test only, so the rule fails to notice that the outgoing
partner row is also a no-crossing row.

Claim grade: `derived` from EC-3 plus the rule text. Falsifier: a reading of
the crossing rationale under which a front the receiver permanently rides
counts as a crossing.

### EC-3. Exact normal form of the straight-through channel: a frozen root

For the mirror straight-through trial ($T_{\mathrm c}=0$,
$\mathbf X_1(T)=T\mathbf e$, $\mathbf X_2(T)=-T\mathbf e$ for $T>0$, cap
segment before), the partner root function for receiver 1 is exactly

$$
g_{1\leftarrow2}(T,s)=2s
\qquad\text{for }|s|<T .
$$

The positive-delay zero set on $T>0$ is the vertical line $s=0$: one emission
instant, received at every reception time. At that root,

$$
D_t=2,
\qquad
D_r=0,
\qquad
S(T)\equiv0,
\qquad
\frac{dS}{dT}=\frac{D_r}{D_t}=0 .
$$

Call this a **frozen root**: the received-emission-time function $S(T)$ is
constant. Geometrically, the front of the coincidence-time emission expands at
speed $1$ from the coincidence point while the receiver departs radially at
speed $1$; receiver and front co-move forever. The receiver-time row density
is the canonical $K/(2T^2)$, while the swept emission history per unit
receiver time is zero. The total-variation transfer identity of Section 5
fails here by construction — its $D_r>0$ hypothesis is violated, the branch
is not injective — and its failure is exactly the divergence: infinite
receiver-time variation is being charged against a single emission instant of
zero source measure.

Also record the mirror rebound trial ($\mathbf X_1(T)=-T\mathbf e$,
$\mathbf X_2(T)=+T\mathbf e$): there each receiver rides the collapsed cap
family of its *partner* — the incoming characteristic interval re-expands
through the coincidence point and the rebounding receiver co-moves with it,
$D_t=0$ throughout — plus the same frozen $s=0$ endpoint. Both candidate
collinear continuations are riding configurations; neither contains a genuine
outgoing crossing.

Plainly: after coincidence, nothing ever catches anybody. Both labels move at
exactly wake speed, so every wake emitted after coincidence chases its target
without gaining, and the only formally received object is a single instant's
front that the receiver surfs. The infinite row is the pointwise formula
billing that surfed front over and over.

Claim grade: `derived exact chart computation`. Falsifier: an on-trace
positive-delay partner root of the straight-through trial with $s\ne0$, or a
nonzero $D_r$ at the displayed root.

### EC-4. The principal-value cancellation route of Section 10.8 is structurally impossible; that bullet can be upgraded from "would require a new rule" to "cannot work"

The incoming and outgoing singular objects do not live on a common support.
On the incoming side, the pointwise-divergent old-partner row has *finite*
accumulated raw contribution on the open segment (proved in the endpoint
reanalysis), and the genuinely divergent object is concentrated at the single
instant $T_{\mathrm c}$ (the characteristic-family arrival; EC-9 computes it
as an atom). On the outgoing side, the retained obstruction is a
*nonintegrable density* on the open interval $(T_{\mathrm c},\cdot)$. A
symmetric principal-value pairing across $T_{\mathrm c}$ would pair a finite
left mass and a point atom against an infinite right mass; no
parameterization-independent pairing turns that into a finite object. More
basically, $BV$ requires finite *total variation* of $D\mathbf V$; signed
cancellation across disjoint time supports does not reduce total variation at
all. The bullet's current phrasing ("would require a separately stated
rule") undersells this: within the declared BV/vector-Radon class the route
is closed, not merely unspecified.

Plainly: even if the before-kick and after-kick were equal and opposite, the
speedometer still has to swing through both, and the swing itself is what BV
forbids. Opposite signs at different times cancel in the average, not in the
motion.

Claim grade: `derived within the declared solution class`. Falsifier: a
declared solution class for which total variation is not the finiteness
requirement.

### EC-5. The coincidence obstruction is not ceiling-specific, and the equality regime $c_a=c_f$ is the only regime with a candidate lawful escape

Run the same mirror separation for a lower ceiling $c_a<c_f$: outgoing trace
$x(T)=c_aT$. The partner root is a genuine moving root,

$$
s=\frac{1-c_a}{1+c_a}T,
\qquad
r=\frac{2c_a}{1+c_a}T,
\qquad
D_t=1+c_a,
\qquad
D_r=1-c_a>0 .
$$

Every admission test in the document — current rules *and* any
crossing-based repair — books this row as ordinary: the front transversally
sweeps the receiver. Its magnitude is still $\Theta(T^{-2})$ and its direction
is backward, so the EC-6 exclusion integral applies verbatim: **no BV mirror
separation exists for any $c_a<c_f$.** The lower-ceiling regime's coincidence
is terminal (or demands a genuinely new event law), and the same holds for
any sub-ceiling outgoing speed in the $c_a=c_f$ model. Only at exact
$c_a=c_f$ can the separating pair outrun each other's wakes, which is what
degenerates the obstruction row into the frozen ($D_r=0$) stratum of EC-3 —
the one stratum where a repair is even conceivable.

Two consequences for the packet's framing:

1. The regime table's remark that the $c_a<c_f$ gap "does not by itself
   resolve coincidence" can be sharpened: the gap makes the coincidence
   strictly *worse*, because the obstruction row there is unambiguously
   ordinary and no reclassification can silence it.
2. This is a new structural argument bearing on regime selection: the mirror
   coincidence admits a complete candidate history only in the equality
   regime. The document currently treats $c_a=c_f$ as the awkward boundary
   case; on this axis it is the only survivable case.

Plainly: below the wake speed, the wake from the moment of coincidence always
catches the fleeing partner and hauls it back with unbounded strength — there
is no way out. Exactly at wake speed the chase is a dead heat forever, and
"dead heat" is the loophole everything below exploits.

Claim grade: `derived conditional result` (mirror class, declared trace
classes). Falsifier: a lower-ceiling mirror separating trace whose complete
near-coincidence ledger has a leading cancellation of the displayed row.

### EC-6. The mirror-class case of the FSC-005 theorem target is provable now, under the current rules, in two lines

Work in the mirror class: $\mathbf X_1=x(T)\mathbf e=-\mathbf X_2$,
$x(0)=0$, $u=\dot x\le1$, Lipschitz paths, BV velocity, strict separation
$x(T)>0$ for $T>0$, current admission rules (frozen root booked as
ordinary), and the FSC-006 routing for the coincidence strata.

**Root census near $0^+$.** Write $\epsilon(T)=T-x(T)\ge0$, nondecreasing.
The unique partner root solves $2s=\epsilon(T)+\epsilon(s)$, so
$s\in[\tfrac12\epsilon(T),\epsilon(T)]$ and the range obeys
$r=T-s\le T$. Pre-threshold emissions give no root
($q_2(s)<|s|$ strictly, by the sub-ceiling incoming speed), the partner cap
family is owned by the coincidence event, and the self family is the
characteristic stratum. The near-coincidence ordinary ledger is exactly the
one partner row per receiver.

**Sign and size.** The transmitter's delayed position lies behind the
receiver, polarity is attractive, so the row is backward with

$$
|\dot u|
=
\frac{K}{r^2\,(1+u(s))}
\ge
\frac{K}{2T^2},
$$

and backward rows are retained by the response both in the interior and at
the boundary. Hence for $0<\eta<T$,

$$
u(\eta)
\ge
u(T)+\frac{K}{2}\left(\frac1\eta-\frac1T\right)
\longrightarrow
+\infty
\quad(\eta\downarrow0),
$$

contradicting $u\le1$. If instead $u\equiv1$ near $0^+$ (free flight), the
frozen row is booked ordinary and backward with density $K/(2T^2)$,
contradicting both $\dot u=0$ and finite variation. Therefore **no separating
mirror BV continuation exists under the current admission rules.** The
theorem target's nine-lemma program remains the right scaffold for the
general (non-mirror) class, but its mirror case should be recorded as proved:
the sign lemma, root-location lemma, and complete-leading-ledger lemma all
collapse to the census above by symmetry.

Plainly: in the exact mirror problem there is only one candidate row and its
sign is forced, so the big conditional program shrinks to one integral. The
integral says the braking is too strong for any escape — as long as the
frozen row is treated as a real received row.

Claim grade: `derived mirror-class theorem sketch` conditional on the stated
class and current admission rules; the general $C^{1,\alpha}$ non-mirror case
remains the open FSC-005. Falsifier: a mirror-class trace in the stated class
admitting a competing same-order stratum that the census above misses.

### EC-7. Section 10.4's re-entry clause is ungated against the co-moving self family

"Re-entry into the interior" asserts that once an effective backward
component exists, speed falls below $c_f$ and ordinary dynamics resumes. But
a ceiling rider that slows is overtaken, at once, by its *entire* co-moving
self wake family: every emission of the straight ceiling segment satisfies
$g=0$ at the slowdown instant and $g<0$ after it. Whether one books that as
an unclassified characteristic stratum (current rules) or as a delivered atom
(Part II), the family includes a zero-range tail
$\int K/(r^2 D_r)\,ds$ with $r\to0$, hence divergent, and its direction —
same-polarity repulsion from behind — is forward. Exit from the ceiling is
therefore itself a nonordinary event needing law; it is not a return to the
ordinary chart. Section 10.8's stop-case bullet already gestures at this, but
10.4 does not cross-reference it, and the calculation ladder in 10.5 (step 1
"recheck ... through its conditional first boundary") inherits the same gap.

Plainly: riding your own wake is free only while you keep riding. The moment
you slow down, everything you emitted while riding lands on you at once, and
it pushes you forward. Leaving the ceiling is an event, not a lane change.

Claim grade: `derived stratum identification`; the divergence of the tail is
exact, its disposition is open. Falsifier: a classification under which the
overtaking self family delivers a finite ordinary contribution.

### EC-8. Mechanical and terminological defects

1. **Broken link (fixed in this pass):** Section 10.7 linked
   `near-coincidence-separating-trace-incompatibility-theorem-target.md`; the
   file is `near-contact-...`. Corrected to the existing filename.
2. **Dual naming, operator decision needed:** the main packet says
   *coincidence* (Minimal Collinear Partner-Coincidence Postulate); the
   endpoint reanalysis and the theorem target say *contact*
   (Partner-Contact Postulate, "outgoing contact one-jet") for the same
   object. One term should own the concept corpus-wide; this review uses
   *coincidence* to match the main packet but does not rename anything.
3. **Typos (fixed in this pass):** "pre-threshincoming" →
   "pre-threshold incoming"; "classificationes" → "classifications";
   "position-and-velocity datas" → "data"; duplicated
   "same-transmitter same-transmitter"; "A immediate" → "An immediate ...
   record". The phrase "immediate position-and-velocity data" itself reads as
   an incomplete find-and-replace of "one-jet" and deserves a single ratified
   term.

### EC-9. What Section 10 gets right

The typed-measure discipline (source vs receiver vs event objects), the
refusal to let the zero-impulse coefficient masquerade as a distributional
limit, the guard's demand that every competing stratum be routed, and the
honesty of 10.8's "none is presently a derived continuation law" are all
correct and are exactly what makes the repair below stateable. Most
importantly, the **root monotonicity theorem** of Section 9 — per ordered
channel, $s\mapsto g$ nondecreasing, so the received-emission-time function
$S(T)$ is monotone wherever defined — is the enabling structure for Part II.
That theorem holds only under the ceiling; in the open model $S$ can fold.
This is a point in the proposal's favor that the document has not yet
exploited.

---

## Part II — Solution attempt: swept-source reception and the unique mirror continuation

The findings above localize the impasse to one question: *is the frozen root
a reception?* Part II proposes the geometric law that answers it, derives the
existing conventions from that law, upgrades the zero-impulse postulate to a
conditional theorem, and produces a unique mirror continuation.

### II.1 The received-history clock

Fix an ordered channel $i\leftarrow j$ on a ceiling-admissible chart. By root
monotonicity, the positive-delay zero set of $g$ at each reception time is
empty, one point, or one interval, and the received-emission-time function

$$
S_{i\leftarrow j}:T\longmapsto S(T),
\qquad
\frac{dS}{dT}=\frac{D_r}{D_t}\ \ge 0
\ \ \text{on simple charts},
$$

is nondecreasing. Extend $S$ across characteristic arrivals by taking the
upper endpoint of the received interval. A nondecreasing function has a
Lebesgue–Stieltjes measure $dS$ with a unique decomposition

$$
dS
=
dS_{\mathrm{ac}}
+
dS_{\mathrm{jump}}
+
dS_{\mathrm{sc}} .
$$

Plainly: $S(T)$ is the channel's odometer — how far into the transmitter's
emission history the receiver has listened. Under the ceiling it can only
roll forward. It rolls smoothly (ordinary reception), or sticks (nothing new
arrives), or jumps (a whole stretch of history lands at once). The proposal
below is that the physics of the channel *is* this odometer.

### II.2 Proposed Swept-Source Reception Law (SSR)

> **Swept-Source Reception Law (proposed).** The receiver-time update measure
> of ordered channel $i\leftarrow j$ is
>
> $$
> \boldsymbol{\mathsf M}_{i\leftarrow j}(dT)
> =
> \frac{\mathbf K_{ij}\big(T,S(T)\big)}{D_r\big(T,S(T)\big)}\;dS(T),
> $$
>
> equivalently: an emission instant contributes only where its wake front
> crosses the receiver worldline (a sign change of $T\mapsto g(T,s)$), it
> contributes exactly once, and the channel update is the image of the
> kernel-weighted source-time measure under the crossing-time map.

The complete-ledger ordering, the tangent-cone response, and every event
guard of the packet are unchanged; SSR replaces only the *per-channel row
semantics*. Where the jump part is present, the delivered object is an atom
in receiver time whose coefficient is the transferred integral
$\int\mathbf K/D_r\,ds$ over the jumped emission interval; such atoms are
event-typed inputs, not ordinary rows, and remain subject to event guards.
The singular-continuous part $dS_{\mathrm{sc}}$ is declared a separately
typed stratum with no disposition proposed here.

Claim grade: `proposed foundational refinement`. It is a genuine postulate:
at degenerate strata the incidence measure $\mathbf K\,\delta(g)\,ds\,dT$ has
inequivalent marginals, and SSR selects the emission-side (crossing)
accounting as primitive.

Plainly: the canonical formula bills by the receiver's clock; SSR bills by
the transmitter's history actually delivered. Wherever wakes genuinely sweep
the receiver, the two bills agree to the penny. They disagree only where a
front and a receiver ride together — and there SSR bills nothing, because
nothing new was delivered.

### II.3 Exact compatibility with the canonical law

**Theorem (regular-chart equivalence).** On any simple-root chart with
$D_t>0$ and $D_r>0$, along the branch

$$
\frac{ds}{D_r}
=
\frac{dT}{D_t},
$$

hence
$\boldsymbol{\mathsf M}(dT)
=\frac{\mathbf K}{D_r}\,\frac{dS}{dT}\,dT
=\frac{\mathbf K}{D_t}\,dT$:
SSR reproduces the canonical ordinary row identically. In particular, on the
entire canonical sub-ceiling domain, where $D_r\ge c_f-\|\mathbf V_r\|>0$
holds automatically, SSR is not a modification at all but a reformulation.
This identity is the Section 5 total-variation transfer identity read as a
definition rather than an estimate.

Claim grade: `derived`. Falsifier: any regular sub-ceiling chart on which the
two densities differ.

### II.4 The existing conventions become theorems of SSR

1. **Isolated-crossing rule, $D_t=0$ clause.** On a straight ceiling-speed
   segment the co-moving self family has $g\equiv0$ on a two-dimensional
   region: no sign change ever, $dS=0$ on the family, delivered measure zero.
   The "inactive co-moving family" convention is no longer a stipulation; it
   is SSR's output, with the family still recorded (provenance untouched).
2. **Frozen root.** $S\equiv\mathrm{const}$, $dS=0$: the straight-through
   obstruction row delivers nothing. The EC-2 tension is resolved on the side
   of the geometric rationale.
3. **Incoming coincidence.** Every cap-family partner emission's front
   crosses the receiver at exactly $T_{\mathrm c}$ (computed: for emission
   lag $\sigma$, $g=2\tau>0$ before, $g<0$ after). So $S$ jumps by the cap
   length at $T_{\mathrm c}$, and SSR delivers one atom with coefficient

   $$
   \int_{0}^{q_\ast}
   \frac{K}{2\,\sigma^{2}}\,d\sigma
   \;=\;
   +\infty
   \quad\text{(direction: }+\hat{\mathbf v}_r\text{, exactly forward)} .
   $$

   Both the divergence and the direction are exact: the delayed partner
   position sits ahead of each incoming receiver, and opposite polarity makes
   the atom attractive, hence forward, for both labels, by mirror symmetry
   with no transverse component.

Plainly: SSR converts the three separately stipulated dispositions — self
family silent, coincidence owns the cap family, coincidence delivered at one
instant — into one accounting principle plus one computation. The price is
that the computed coincidence atom is infinite and points forward; the next
step handles it.

Claim grade: `derived under SSR` for all three items; the atom computation is
exact on the declared mirror chart.

### II.5 The zero-impulse postulate becomes a conditional theorem

Extend the boundary response to event atoms by the same least-change
principle, completed on the closed forward ray:

> **Projective completion clause (proposed).** At a boundary event whose
> delivered atom is $\lambda\hat{\mathbf v}$-directed with
> $\lambda\in(0,\infty]$, the event velocity update is
> $\mathcal P_{\mathbf V}(\lambda\hat{\mathbf v})=\mathbf0$, the common value
> of the projection along the entire ray.

Under SSR + this clause, the mirror coincidence event update is *derived*:

$$
\Delta\mathbf V_{i,\mathrm{coincidence}}
=
\mathcal P_{\mathbf V_i(T_{\mathrm c}^-)}\!\big(\text{forward atom}\big)
=
\mathbf0 .
$$

The Minimal Collinear Partner-Coincidence Postulate stops being an arbitrary
coefficient choice and becomes the unique response consistent with the
crossing accounting and the ceiling projection. The clause is honest new
data — the packet's axiom explicitly refuses infinite ledgers, and this
extends the response to one ray-directed infinite atom class only. A
transverse or backward divergent atom remains undefined (correctly: such an
event *should* fail the guard until more is known).

Claim grade: `derived conditional theorem` (conditional on SSR and the
completion clause). Falsifier: an admissible mirror history whose delivered
coincidence atom acquires a transverse or backward component.

### II.6 Unique mirror continuation theorem (sketch)

Under SSR, the completion clause, and the derived zero-impulse update, in the
mirror class of EC-6:

1. **Existence.** The straight-through trace
   $\mathbf X_1(T)=T\mathbf e=-\mathbf X_2(T)$ is an exact solution on
   $(0,\infty)$: the full outgoing census gives, per receiver, the frozen
   partner root (delivered zero), the co-moving self family (delivered zero),
   no cap-emitted or pre-threshold roots (ranges strictly inside past
   fronts), and no future roots ever (both labels at exactly $c_f$, all
   chasing fronts hold a constant gap). The effective ledger is empty; the
   motion is straight at constant ceiling speed; consistent.
2. **Uniqueness.** Any mirror continuation with $u<1$ somewhere near $0^+$
   activates a genuinely crossing partner root ($D_r>0$), delivered by SSR
   with the same $K/(2T^2)$ lower bound, and the EC-6 integral excludes it;
   in addition the overtaking self family of EC-7 delivers a divergent
   forward atom off the boundary, where no projection is available. The
   rebound trace is ledger-quiet but violates the *derived* velocity-
   preserving update of II.5. Hence the straight-through trace is the unique
   continuation in the class.
3. **Causal-decoupling corollary.** After coincidence the two labels never
   receive from each other again. The idealized mirror pair coincides,
   passes through with no impulse, and separates forever at exactly field
   speed, each permanently riding the other's coincidence-shell front.
4. **Knife-edge remark.** The solution is exact but sits on a degenerate
   equilibrium of the admission geometry: any externally caused sub-ceiling
   dip (a third wake) re-activates delivered partner braking of size
   $\sim K/(2T_1^2)$ at dip time $T_1$ and pulls the pair back together —
   repeated coincidences and a candidate bound collinear oscillator. That is
   a conjecture target, not a result; it would also immediately meet the
   EC-7 ceiling-exit event.

Plainly: with honest delivery accounting, the answer to Section 10's question
is almost anticlimactic — the pair passes through and coasts apart forever,
and nothing else is lawful. All the drama is displaced into two places where
it belongs: the derived zero-impulse event, and the still-lawless moment any
ceiling rider slows down.

Claim grade: `derived continuation theorem sketch under SSR` in the mirror
class; formalization in the declared history phase space, and any statement
outside mirror symmetry, remain open obligations. Falsifier: a mirror-class
trace in the declared class, admissible under SSR, distinct from the
straight-through trace.

### II.7 The resulting dichotomy, and what it does to Section 10.8

Combining EC-6 and II.6: **either** the frozen root is a reception (current
rule wording), and then the mirror coincidence has *no* continuation — a
theorem, no longer an impasse — **or** reception requires crossing (SSR),
and then the mirror coincidence has a *unique* continuation. Section 10.8
should be reorganized around this dichotomy. Of its nine listed routes:
passage becomes the SSR outcome; principal-value cancellation is closed
(EC-4); short-range cutoff and minimum-separation scales are unnecessary on
this chart under either horn; the finite coincidence interval and
third-architrino routes remain live but now answer a different (perturbed,
non-ideal) question; and the missing tenth route — reclassify the
receiver-side degenerate stratum — is the one this review proposes.

### II.8 Known costs and open obligations of SSR

1. **Trace-family discontinuity.** Along the sub-ceiling family
   $u\equiv1-\epsilon$, the delivered braking row does not tend to zero as
   $\epsilon\downarrow0$, while the frozen limit delivers zero: the SSR
   ledger is not weak-* continuous in the trace at the frozen stratum. This
   is tolerable — none of the nearby traces is a solution, and EC-5 shows
   they cannot be — but it forces a reformulation of the FSC-006
   perturbative weak-limit test: quantify over admissible *solutions* or
   declared regulator families, not arbitrary nearby traces.
2. **The completion clause is new data**, covering only forward ray-directed
   atoms; every other infinite atom class still (properly) fails the guard.
3. **Ceiling-exit event (EC-7)** becomes SSR's most urgent unclassified
   stratum: $dS_{\mathrm{jump}}$ of the *self* channel at slowdown, with a
   divergent forward coefficient and no boundary projection available.
4. **Singular-continuous $dS$** is typed but has no disposition.
5. **Off-mirror uniqueness** is untouched: kinematically, any radial
   unit-speed escape from the coincidence point rides the $s=0$ shell, so
   symmetry-breaking continuations exist at the admission level and only the
   event law (derived zero impulse ⇒ velocity preservation ⇒ straight-
   through) selects among them; a theorem covering non-mirror perturbed
   incomings is future work.
6. **Nothing is adopted.** SSR is a proposed law; its regular-chart
   equivalence (II.3) means adopting it costs the canonical model nothing on
   every chart the canonical model already owns, which is the strongest
   available compatibility statement short of adoption.

### II.9 Candidate queue items (numbers for the queue owner to assign)

1. Formalize SSR: the monotone clock $S$, its three-part decomposition, the
   crossing (sign-change) delivery primitive, and the II.3 equivalence
   theorem, as a proposed alternative to the ordinary-row semantics in the
   mathematics packet.
2. Record the EC-6 mirror-class no-continuation theorem under current rules
   as the resolved mirror case of FSC-005; keep the general case open.
3. Prove the II.5 derived zero-impulse theorem cleanly: atom direction from
   channel data, projective completion clause stated as one guard clause.
4. Write the II.6 uniqueness sketch as a theorem in the declared BV class.
5. Open the ceiling-exit event target (EC-7): disposition of the overtaking
   self family, off-boundary response to a divergent forward atom.
6. Add the EC-5 regime-discrimination note to the Section 5 regime
   catalogue: mirror coincidence is terminal for $c_a<c_f$ under every
   considered rule set.
7. Decide the coincidence/contact terminology split (EC-8.2) and the
   ratified replacement for "immediate position-and-velocity data".

## Claim boundary

This review adopts nothing. It establishes, at review grade: the
transmitter-sidedness gap in the event catalogue (EC-1); the letter-versus-
rationale conflict of the isolated-crossing rule on the frozen root (EC-2);
the exact frozen-root normal form $g=2s$, $D_t=2$, $D_r=0$ (EC-3); closure of
the principal-value route within the BV class (EC-4); the terminal character
of sub-ceiling mirror coincidence and the resulting equality-regime
discrimination (EC-5); a mirror-class proof sketch of the FSC-005
no-continuation statement under current rules (EC-6); the ceiling-exit
self-family stratum (EC-7). It proposes, without adopting: the Swept-Source
Reception Law with its regular-chart equivalence theorem, the projective
completion clause, the derived zero-impulse theorem, and the unique
straight-through mirror continuation with causal decoupling. It does not
supply the history phase space, any non-mirror result, a ceiling-exit law, a
stability statement, an action or conservation account, or any physical or
observer-level claim.
