# FSC-006b / FSC-005 — Event-Adjacent No-Cascade Lemma

**Date:** 2026-09-02 **Status:** thin activation accumulation excluded in the declared isolated mirror-collinear chart; no uniqueness or general event-atlas claim follows. **Owner:** FSC-006b/FSC-005.

## Question and verdict

Can infinitely many increasingly thin ordinary-root activations accumulate immediately to the right of the proposed exact-mirror event while velocity remains absolutely continuous?

No in the declared isolated mirror-collinear class. The earlier total-variation budget alone allowed a sufficiently thin measurable activation set, but the root equation supplies the missing estimate: after any positive-measure activation creates a positive speed deficit, exactly one ordinary partner root exists at every later nearby receiver time. The active set is therefore a terminal interval, not a dust or sequence of bursts. If its onset were the event itself, its acceleration would have the nonintegrable lower bound $K/(2t^2)$, contradicting the admitted absolutely continuous velocity. Every admitted solution consequently has a nonzero initial ordinary-active-root-free interval.

Plainly: one tiny braking burst cannot switch itself off and wait for another burst. As soon as it makes the receiver even slightly slower, the next partner wakefront keeps crossing at all later nearby times. Starting that continuous activity at the event would require infinite accumulated speed change, so the first activation must occur later or never occur on the local chart.

## 1. Declared event-adjacent class

Normalize $c_f=1$, put the exact-mirror event at $t=0$, and work only in the isolated two-label mirror-collinear right chart

$$
\mathbf X_1(t)=x(t)\mathbf e,
\qquad
\mathbf X_2(t)=-x(t)\mathbf e,
\qquad
x(t)=t-E(t),
$$

with $v=x'=1-m$, $E'=m$, $x(0)=E(0)=m(0)=0$, and coupling $K>0$. Position is continuously differentiable, velocity is absolutely continuous, and the restart equation holds almost everywhere. By continuity, restrict to a sufficiently short interval $[0,h]$ on which $x(t)>0$ for $t>0$ and $0\le m(t)<1$, so $0<v(t)\le1$. No external, transverse, unmatched, or atomic remainder contribution is admitted on this interval.

Plainly: immediately after coincidence the two labels move apart along one line. The variable $m$ measures how far their outward speed has fallen below the unit wake speed, and $E$ is the accumulated slowdown. The local interval ends before either label can stop, turn, meet another event, or leave this simple geometry.

The current event cap, frozen endpoint, received-clock plateaus, and same-transmitter families remain in the live state defined by the [future-equivalence quotient](future-equivalence-quotient-and-two-cycle.md). The proposed ownership rule gives them no repeated ordinary row. The only possible new ordinary rows are the two mirror-related post-event partner roots. A partner root is ordinary exactly when it has positive range and $D_t,D_r>0$; a frozen root, same-transmitter characteristic interval, zero-delay diagonal, clock jump, singular-continuous clock component, and the owned exact-mirror carrier are nonordinary and remain separately classified.

Plainly: the proof does not erase the old event family. It records that family in its existing nonordinary lane and asks only whether new partner wakefronts can begin crossing infinitely often near the event.

## 2. Activation and accumulation definitions

Let $A\subset(0,h)$ be the set of receiver times at which the partner clock has an absolutely continuous increasing part and the unique post-event partner root is ordinary. On $A$ the partner row is admitted and, by mirror symmetry and opposite polarity, decreases $v$ and increases $m$. Off $A$ the isolated ordinary ledger is zero almost everywhere. An **activation component** is a connected component of the open set $\{t:m(t)>0\}$; the root calculation below proves that this set agrees with $A$ up to null times. An **event-adjacent activation cascade** is an infinite family of distinct activation components with receiver-time endpoints tending to $0$.

The accumulation variable is absolute receiver time $t$, which is also the receiver clock on this chart. On an active branch the received source time $S(t)$ is a derived monotone clock; event count is discrete bookkeeping and is not used as the accumulation parameter. Source times approach zero whenever active receiver times approach zero, but source-time accumulation is a consequence rather than the definition.

Plainly: a cascade would be infinitely many on-off braking intervals packed closer and closer to coincidence. The theorem measures that packing using the ordinary absolute time seen by the receiver, then checks what the corresponding source clock does.

## 3. Root continuation after any acquired deficit

For a partner emission time $s\in[0,t]$, the causal equation is

$$
2s=E(t)+E(s).
$$

Define $H(s)=2s-E(s)$. On the local chart $H'(s)=2-m(s)>1$. If $E(t)>0$, then $H(0)=0<E(t)$, while

$$
H(t)-E(t)=2x(t)>0.
$$

The intermediate-value theorem and strict monotonicity therefore give exactly one root $S(t)\in(0,t)$. At that root,

$$
D_t=2-m(S(t))>1,
\qquad
D_r=m(t),
\qquad
r=t-S(t)>0.
$$

Thus the root is ordinary whenever $m(t)>0$.

Plainly: once any accumulated slowdown makes $E$ positive, the root equation starts below its target at source time zero and ends above it at the current time. Because the left side rises strictly, it crosses exactly once. If the current speed deficit $m$ is also positive, that crossing is a genuine wakefront sweep rather than a frozen contact.

The speed ceiling gives $m\ge0$. Because $m$ is absolutely continuous, $m'=0$ almost everywhere on the level set $\{m=0\}$. On $\{m>0\}$, the unique root is ordinary and the restart equation gives $m'=K/(r^2D_t)>0$ almost everywhere. Hence $m'\ge0$ almost everywhere and $m$ is nondecreasing without assigning a pointwise disposition to isolated $D_r=0$ tangencies. If $m(t_0)>0$ once, then $m(t)>0$ and $E(t)>0$ for every later $t>t_0$. The preceding root calculation then makes the partner channel ordinary at almost every later time while the local chart persists. The received clock satisfies

$$
S'(t)=\frac{D_r}{D_t}=\frac{m(t)}{2-m(S(t))}>0
$$

almost everywhere there. Consequently $A$, up to null sets, is either empty or one terminal interval $(u_*,h)$ for some $u_*\ge0$.

Plainly: braking never reverses sign in this outward local chart. Once the speed deficit becomes positive it stays positive, and the root remains an ordinary crossing with a clock that keeps advancing. That rules out a return to an inactive plateau and therefore rules out separated later bursts.

## 4. Exclusion of onset at the event

Assume for contradiction that $u_*=0$. Then the channel is active almost everywhere on every interval $(0,t)$. Since $S(t)\ge0$, its range obeys $r=t-S(t)\le t$, and $D_t=2-m(S(t))\le2$. The scalar braking equation therefore gives

$$
m'(t)
=
\frac{K}{r(t)^2D_t(t)}
\ge
\frac{K}{2t^2}
$$

for almost every sufficiently small $t>0$.

Plainly: an active wakefront very near the event has a range no larger than the elapsed time, while its transmitter factor is no larger than two. Its braking contribution must therefore be at least the displayed inverse-square amount.

For $0<a<b<h$, integration yields

$$
m(b)-m(a)
\ge
\frac K2\left(\frac1a-\frac1b\right).
$$

Letting $a\downarrow0$ contradicts the finite continuous value $m(0)=0$ and absolute continuity of velocity. Hence $u_*>0$ whenever activation occurs.

Plainly: moving the lower integration limit toward coincidence makes the required speed change grow without bound. An absolutely continuous bounded velocity cannot supply that change, so continuous ordinary activation cannot begin at the event.

> **Event-adjacent no-cascade lemma.** Every solution in the declared isolated mirror-collinear exact-mirror class has an $\varepsilon>0$ such that its post-event partner ordinary census is empty on $(0,\varepsilon)$. More strongly, on the local outward chart its partner-active set is, up to null sets, either empty or a single interval $(u_*,h)$ with $u_*>0$. Therefore no infinite family of distinct activation components accumulates at the event in receiver time or absolute time, and no corresponding component cascade accumulates in source time or event count. One ordinary active component still sweeps a continuum of source times after its positive onset.

**Claim grade:** `derived conditional theorem inside the proposed FSC model`. It is falsified by an admissible isolated mirror-collinear solution with absolutely continuous velocity whose ordinary partner-active set has infinitely many components accumulating at zero, by a later loss of the unique root while $m,E>0$ and $x>0$, or by failure of the displayed inverse-square lower bound on the declared ordinary row.

Plainly: one valid counterexample with infinitely many genuine on-off crossings near coincidence would overturn the result. A numerical trace that merely fails to display such crossings would not prove it; the proof rests on monotonicity and the analytic lower bound.

## 5. Boundary of the theorem

The proof uses all of the following hypotheses: exact mirror-collinearity; only the opposite-polarity partner row can change velocity; absolute continuity and no undeclared velocity atom; $x>0$ and $0\le m<1$ on the local chart; the ordinary inverse-square row with positive range; the complete-ledger-before-response rule; one-time ownership of the old event family; and no external or unmatched event contribution. It does not classify symmetry-broken paths, transverse roots, simultaneous third-party channels, clock jumps, singular-continuous received clocks created by a broader law, or general event strata. Those remain FSC-012 questions.

Plainly: this is the smallest honest chart containing the already proved straight and delayed-braking branches. Adding another wake, breaking the mirror symmetry, or permitting a different kind of clock measure can change the argument and needs a separate theorem.

The result also cannot restore uniqueness. For every prescribed $u_*>0$, the delayed-ignition theorem supplies a local solution that is ordinary-root-free on $(0,u_*]$ and active immediately afterward. The straight trace remains root-free. The no-cascade lemma excludes only $u_*=0$ and fragmented on-off activation; it does not select one member of the continuum $u_*\in(0,\infty]$.

Plainly: the theorem says the alarm cannot ring infinitely often at the initial instant. It does not say when the one allowed alarm rings. Every positive waiting time and never ringing remain compatible with the proposed relation.

## 6. Claim boundary

No numerical silence is used as evidence. No field-speed ceiling, swept-source law, exact-mirror event law, continuation selector, unique restart, breather, conservation account, stability result, physical realization, or canonical dynamics is adopted. The theorem closes only the thin event-adjacent cascade obligation in the declared mirror-collinear chart.

## Closure goal

Use the now-classified exact-mirror boundary only as a separate event result; advance FSC-007 on its atom-free positive-floor regular chart without claiming that the regular theorem contains or selects this margin-zero continuation.
