# Six-pole path continuation, independent review: frozen reference (ramon-e-moore lens)

*Phase A freeze, written by the review role on 2026-10-20; drafting began after the clock read 21:00:05 UTC and the draft was complete at the clock read 21:01:33 UTC; the freeze time and this file's sha256 are reported to the PI at once. No Python was run. No file of this campaign written by another role has been opened. Once cited, this file is not edited; corrections go to a dated companion.*

## 0. Exposure disclosure

- **Old exposure (closed October 14 campaign).** The review role under this name wrote the October 14 adjudications 1–15, the instruments audit10 (`b2b90c7a6409973c68f0231765ef2ee31fe36d8b63f35655511470dd973117aa`) and ddl10 (`67a82d348edff01ebdbf0219d213c80910693f57d0aa92f1553161e34a3fc396`), and their records. This session has no memory of writing them; it read them as records.
- **Read in this session before the freeze:** AGENTS.md; the specialist charter and my role file; the common and review briefs; the plan (`e963f8aa…`, verified); synthesis sections 3, 5 and 7; adjudications 13, 14 and 15; the headers of audit10, ddl10 and audit9, and my audit8 `own_tau` bracket; the v4.4 step instrument lines 1–135 (`1bcc8a27…`, verified); the frozen steps9 bracket lines (D14, D15, `LOWER9`); the frozen `tau_point_wide` root search in steps6 (`df590c40…`, verified); the frozen `geom`, `hit` and `fixed_chord` in steps3; and, by a node one-liner (no Python), the last three rows of r5 (`7af61785…`, verified; r4 `8182cb08…` verified).
- **Not read:** the continuation and support wave-1 reports and manuscript sections 5.13–5.14 (time; the synthesis sections cover what I use). No file under `spherical-six-pole-path-continuation-claude-continuation-*` or `-support-*` has been opened; a directory listing of `analysis/` filtered on `six-pole` was printed and truncated before any path-continuation name.

## 1. Delay-root search bracket: validity condition (derived)

**Setting.** For receiver class $c$ at receiver time $t$ and receiver coordinate $q$, the delay $\tau$ solves $h(\tau)=0$ with $h(\tau)=\tau-r_c\big(q,\,q(t-\tau)\big)$, where $r_c$ is the class chord on the unit sphere and $q(\cdot)$ is the proved history (records from release, plus the complete stationary past before $t=0$). In the instrument, $t$ and $q$ are boxes (the uncertain clock origin, the end or start box, or the derivative box $Q_d$), and the history is read as boxes.

**1.1 Global uniqueness from $h'=D_t>0$ (derived).** Differentiating, $h'(\tau)=1+\partial_{q'}r_c\,w(t-\tau)$. With the frozen geometry, $\partial_{q'}r_c=-k\,M/r$, so $h'(\tau)=1-k\,w'M/r=D_t$, the transmitter factor at that source instant (checked for the antipode: $r^2_{q'}=2\sin d$, $M=-\sin d$, $k=1$). The source moves at unit coordinate speed on a great circle of the unit sphere, so $|\partial_{q'}r_c|\le1$ and $D_t\ge1-|w'|$. Sub-wake motion on the whole history ($\sup|w|<1$, with $w=0$ in the stationary past) therefore gives $h'>0$ for every $\tau>0$ at which the history is defined. Also $h(0^+)=-r_c<0$ and $h(\tau)\ge\tau-2>0$ for $\tau>2$ (the chord of the unit sphere is at most 2). So for each fixed $(t,q)$ the root is UNIQUE on all of $(0,\infty)$ and lies in $(r_{\min},2]$. Consequence: any two brackets that each prove a straddle for the same parameter box enclose the same root set. Falsifier: a proved $|w'|\ge1$ anywhere in a read source range, or a proved $|M|>r$.

**1.2 Admissible lower end $a$ (derived).** Two conditions, both with full time uncertainty:
- **History domain.** $h(a)$ reads the history at $t-a$. The read must lie inside the GUARANTEED coverage: $\overline{t}-a\le t_G$, where $\overline t$ is the upper end of the receiver time box and $t_G$ is the lower endpoint of the last record's uncertain end time. A read in the possible-but-unguaranteed tail is not a proof. For a whole-step root, $\overline t$ is the upper end of the step span; for an end evaluation it is the upper end-instant time. So $a\ge \overline t-t_G$ (about $\Delta$ plus the origin width, $0.0100002$, for whole-step reads).
- **Minimum delay.** $a$ must lie below the root for every parameter in the box, which is exactly the proved statement $\sup h(a)<0$. Any $a<\inf r_c$ over the read set satisfies it automatically, but it must still be proved by evaluation.
The like root at the step-492 end is about $0.946$–$0.954$ (r5 `tau_box`), far above the history-domain floor $0.01$, so the lower end can be lowered by an order of magnitude more than the step-to-step fall (measured: r5 like `tau_box` falls about $0.0052$ per step, 491 to 492).

**1.3 What a bracket must prove at EACH call (derived).**
1. $\sup h(a)<0$ and $\inf h(b)>0$ over the whole current parameter box (time box, receiver box, history boxes), with outward rounding.
2. Both end reads inside proved history: $\overline t-a\le t_G$ (lookup refuses otherwise) and $\underline t-b$ inside the records or the stationary past.
3. $h'>0$ over the whole bracket: the sub-wake hull $\sup|w'|<1$ over the source range $[\underline t-b,\overline t-a]$ (the global hull of the covered history suffices).
4. Any narrowing keeps the invariants: a point replaces $a$ only when $\sup h<0$ is proved there, and replaces $b$ only when $\inf h>0$ is proved. The returned enclosure is $[a,b]$ (or its subset by such moves). Midpoint signs, the previous step's root, or a centre value are never results.
5. The delayed source state at the enclosed root lies in the admitted chart (receiver $q\in[1.45,2.10]$, source $q'\in[0,1.80]$, $w'\in[-0.10,0.45]$); this is a separate validity condition for the acceleration evaluation, not for the root.
6. A failed straddle REFUSES or widens within the admissible domain (1.2); it never clamps to an end.
An adaptive bracket (for example centred on the previous root, or lowered by a schedule) is valid exactly when 1–6 hold at the current call; adaptivity itself carries no proof. It must work for a rising root too: after the path turn the receiver moves back and $\tau_L$ need not keep falling. A simpler valid repair is the global bracket $[a_G,\,2+\epsilon]$ with $a_G=\overline t-t_G+\epsilon$; 1.1 guarantees it straddles whenever the history covers $\underline t-2-\epsilon$, at the cost of about one extra bisection.

**1.4 What could make a repaired bracket find a different root (derived).** By 1.1, nothing, when the premises hold. A disagreement (non-intersecting enclosures on the same state) can only come from:
- (i) a read beyond guaranteed coverage, a stale or extrapolated record, or the wrong history segment, so $h$ is not the proved function;
- (ii) a different parameter box (the centre instead of $Q_d$, the start time instead of the end time, a re-parsed box);
- (iii) a straddle test that is not a proof (lo and up swapped, a point evaluation, a strict inequality lost);
- (iv) a class mix-up (the like/unlike sign $k$ exchanged);
- (v) a failure of sub-wake motion, making $h'$ non-positive somewhere.
**Consistency check, not evidence.** On states where both the frozen bracket and the repaired one straddle (steps up to 492), their enclosures must intersect and agree to the bisection tolerance. Agreement there proves determinism of shared code only. It does not test (i)–(v) beyond 492.

**Controls I require of a repaired bracket (known and negative, before targets, saved separately):** known straddle at a frozen state with the repaired and frozen enclosures intersecting; the step-492 end state, where the frozen like bracket refuses and the repaired one encloses; negative: an upper end below the root refused; a lower end reading past $t_G$ refused, and one just inside accepted (as in the frozen D15); an injected $|w'|\ge1$ refuses uniqueness; an exchanged class sign detected; a rising-root case (a synthetic or reversed history) enclosed.

## 2. End-instant evaluation on a subdivided box: cover condition (derived)

**Setting.** The value $l'(t,q,w)$ is evaluated over $T_e\times Q\times W$, with $T_e=[\underline t_{k}+\Delta,\overline t_k]$ the end-instant time (outward-rounded), and $Q\times W$ the recorded end box. The true state at the true end time lies in that product, so an outer enclosure over the product proves the sign.

**2.1 Full cover (derived).** Let $Q=[x_0^*,x_n^*]$ and choose edges $x_0\le x_1\le\dots\le x_n$; sub-boxes $[x_{i-1},x_i]$. The union covers $Q$ if and only if $x_0\le x_0^*$, $x_n\ge x_n^*$ and each internal edge is used as BOTH the upper end of box $i$ and the lower end of box $i+1$ (or boxes overlap). Sufficient and simplest: $x_0$ and $x_n$ ARE the stored bounds (the same mp numbers as the interval actually used by the admitted consumers), and each internal edge is computed once and shared. The same for $W$; the product grid then covers $Q\times W$. Overlap is harmless; a gap is not. $T_e$ is used whole (if subdivided, the same rule applies).

**2.2 What breaks it (derived).**
- **Rounded outer edge.** If $x_n=x_0+\mathrm{wid}(Q)$ in round-to-nearest, $x_n$ can fall up to one unit of the last place short of $x_n^*$, leaving $[x_n,x_n^*]\times W$ uncovered (the October 14 gap). Same at the lower edge if computed as $x_n^*-\mathrm{wid}$.
- **Internal edges computed twice** by different formulae leave sub-ulp gaps inside.
- **A dropped edge or sub-box** leaves a macroscopic region (a third of the box) unevaluated; then no sign follows.
- **Inward parsing.** If the record's decimal strings are parsed to the working precision by round-to-nearest rather than outward, the box itself can be one ulp narrow before subdivision. The record strings are PAD-widened at write, which gives margin, but the parse must be outward (or the consumer must use the identical parse as the admitted evaluation).
- **Root ranges per sub-box.** Contracting each sub-box from the whole-box root range is valid (inclusion monotonicity); a sub-box root range from the centre is not.

**2.3 Sign rule.** The sign is proved when the hull of all sub-box enclosures excludes zero (equivalently every sub-box proves the same sign).

**2.4 Alternative route: sliver plus a rigorous Lipschitz bound (derived).** For a $q$-sliver $S=[x_n,x_n^*]\times W$ of width $\varepsilon_q$, $l'(t,q,w)\in E_n+[-L_q\varepsilon_q,\,L_q\varepsilon_q]$ for $(q,w)\in S$, where $E_n$ is the last sub-box enclosure (it contains the value at $q=x_n$) and $L_q\ge\sup|\partial_q l'|$ over $T_e\times[x_{n-1},x_n^*]\times W$ by interval evaluation. $\partial_q$ at fixed $t$ must include: the geometric partials of every class's tangent and canonical radial terms; the delay-root dependence $\tau_q=\partial_q r/D_t$ (bounded by $\sup|\partial_q r|/(1-\sup|w'|)$); and the history dependence through the chain rule, $\partial_q q'=-w'\tau_q$, $\partial_q w'=-a'\tau_q$, $\partial_q a'=-\dot a'\tau_q$. The last needs a bound on the source jerk $\dot a'$ over the whole read range, which exists only under the stored-rate premise (the records' `ap` boxes), with both one-sided bounds at any derivative seam. In $w$, $l'=-2wa-r'$ is affine (a, and the source part of $r'$, do not depend on $w$; $r'=\partial_q r\,w+\dots$), so $L_w=\sup|2a+\partial_q r|$. The corner sliver takes $L_q\varepsilon_q+L_w\varepsilon_w$. With $\varepsilon\approx10^{-30}$ and margins $\ge8.8\times10^{-5}$, ANY finite rigorous $L$ below $10^{25}$ closes the gap. An order-one INFERRED $L$, as on October 14, does not.

**Controls I require of a repaired cover:** known: on $f(q,w)=q$ (or $w$) the hull upper end equals $x_n^*$ exactly, and on a sign-known test function whose extreme lies in the former sliver the sign is right; the repaired cover reproduces, on step 155 or another admitted end, an enclosure containing the admitted one's evaluation at the stored box bounds; negative: the old edge rule ($x_0+\mathrm{wid}$) on a box built so that it falls short is detected by an explicit cover verifier (sorted edges, $x_0=x_0^*$, $x_n=x_n^*$, shared internal edges); a dropped sub-box is detected; and a constructed function whose only zero-crossing lies in an uncovered sliver flips the verdict when the sliver is dropped.

## 3. Path-turn certificate (derived)

**3.1 Existence and bracket.** Let step ends $k<m$ be certified with $\inf w(t_k)>0$ and $\sup w(t_m)<0$ proved on their end boxes. $w$ is continuous, so a zero lies between. With full time uncertainty, the bracket is $(\underline t_k^{\,e},\,\overline t_m^{\,e})$, where $\underline t_k^{\,e}=\underline t_{\mathrm{int},k}+\Delta$ (outward) is the lower end of the step-$k$ END time and $\overline t_m^{\,e}=\overline t_{\mathrm{int},m}$ is the upper end of the step-$m$ end time. A record's `t_int` is the whole step span.

**3.2 Uniqueness and strictness.** $a<0$ proved on EVERY WHOLE STEP $k+1,\dots,m$ (whole-step boxes over the step span and the whole-step state, not end values) makes $w$ strictly decreasing on $[t_k,t_m]$; then the zero $t_\star$ is unique, the crossing is strict, $q$ has a strict local MAXIMUM at $t_\star$ ($q''=a<0$), and $|w|$ has a zero there. It is NOT a speed maximum. Every step in the bracket must be certified; a refused step inside breaks the chain.

**3.3 Positive side.** For the turn to be the FIRST since release, $w>0$ must hold at every instant of $(0,t_k]$. Through the step-491 end it is admitted (October adjudication 15). For 492 to $k$: $a<0$ on every whole step plus $\inf w(t_k)>0$ gives $w(t)>w(t_k)>0$ for every earlier $t$ in that range (derived). End signs alone do not suffice.

**3.4 Negative side.** $\sup w(t_m)<0$ on a CERTIFIED end box (attained: the true state at that instant has $w<0$). An undecided end does not count; neither does a midpoint or an extrapolation.

**3.5 Transmitter factor and source velocity after the sign change (derived, with one inference).**
- For identical motion, every delayed read is $w'=w(t-\tau_c)$ with $\tau_c>0$. Because $w>0$ on $(0,t_\star)$, every delayed source speed is still POSITIVE for receiver times $t<t_\star+\tau_{\min}$, where $\tau_{\min}$ is the smallest class delay (like, about $0.95$ at 492 and falling). So the transmitter domain is UNCHANGED at the path turn and for about $\tau_{\min}$ after it; the certificate's ends $k$ and $m$ need only lie in that window.
- Later, $w'$ goes negative. Then $D_t=1-k\,w'M/r$ moves to the other side of 1 for each class (approach and recession exchange roles) and stays $\ge1-|w'|$, so $D_t\ge0.55$ on the admitted chart. Nothing becomes singular, but $w'<-0.10$ leaves the admitted chart and must REFUSE; a new chart needs its own subdivision certificate.
- The receiver's own $w$ enters $l=-w^2-r$ and the geometric normal acceleration only through $w^2$, and the step map through the Taylor form; neither has a sign assumption. Any code that tests a sign of $w$, uses $|w|$ as speed, or assumes monotone $q$ (for example in the history lookup or a chart test) must be read for the change.
- **Chart margin (inferred, rough).** Near 492 the like source coordinate is $q'_L\approx1.48$–$1.49$ (r5) and rises as $\tau_L$ falls. Extrapolating $w\approx0.199$, $a\approx-0.21$ and the October jerk (about $-0.15$ per unit $t$), $w$ reaches zero roughly $0.75$ in $t$ after 492 (about 75 steps, so near step 565; the October "roughly 40 more steps" is inconsistent with the recorded $a$) and $q$ peaks near $1.82$–$1.83$. The like source then reaches about $1.75$ at the turn and passes $1.80$ roughly $\tau_L$ after it. So the source chart edge $q'\le1.80$ may bind on the NEGATIVE side, a few steps after the turn. Falsifier: the continued slices themselves.

**3.6 Support at the turn (derived; conditional prediction).** $l=-w^2-r$ and $l'=-2wa-r'$. At $t_\star$, $w=0$, so $l=-r$ and $l'=-r'$: the opposing term $-2wa$ (positive while $w>0$, $a<0$) has vanished. If $r'(t_\star)>0$ is proved (the canonical radial acceleration still increasing, as from step 409 to 491), then $l'(t_\star)<0$, and since $l'>0$ at every instant through the step-491 end (adjudication 15), $l'$ has a zero in $(t_{491},t_\star)$: a SECOND support turn, a local MAXIMUM of $l$ (a minimum of the inward magnitude), BEFORE the path turn. Falsifier: $l'>0$ proved at every instant up to a proved $w<0$ end, or a proved $r'\le0$ at the turn.

## 4. My audit instruments (proposals; nothing runs before a PI grant)

**audit11 (end and whole-step audit of new slices).** A new file executing audit10's base (audit9 v5 frozen, `b1aca358…`, verified in-script) WHOLE, with r1–r5 and the new slices appended through audit9's checked path (alignment, continuity, frozen meet through 436). It uses my own end evaluation (own lookup, own formulas), whose delay bracket is $\pm0.02$ about the subject's recorded root and proves its own straddle (by 1.1 the guess only centres it; a wrong guess refuses, it cannot give a wrong root), with one retry at $\pm0.10$. It adds:
- a whole-step sign of $a$ by the lemma $\sup_{\text{step}}a\le\min\big(A_s+\max(J^+,0)\Delta,\;A_e+\max(-J^-,0)\Delta\big)$, with $A_s,A_e$ the upper ends of MY end enclosures of $a$ at the step's start and end and $[J^-,J^+]$ the step's jerk box (the stored-rate premise, named);
- the path-turn logic of 3.1–3.4 and the support quantities at each end.
**Controls (before targets, separate record):** all audit9/audit10 controls including P1–P3 (synthetic path turn; a turn without proved negative $a$ not called unique) and I1–I4; known: lemma on an exact constant-jerk path; negative: a step with $J^+$ inflated so that the bound crosses zero is not called negative; known: the own bracket encloses the r5 step-492 like root, which the frozen fixed bracket refuses; negative: own bracket with the guess shifted by $0.05$ refuses (no straddle) rather than returning a different root; negative: a source read past $t_G$ refuses.
**ddl11.** ddl10's end-plus-second-derivative lemma for $l'$ extended to the new band, for the second support turn of 3.6.

**Shared premises (not independent of the subject):** the stored-rate premise, the frozen step instrument, the admitted correlated inclusion of v4.4, the intersection premise. Agreement on these is cross-code consistency.

## 5. What I will rule on, and how

- **Q3 cover:** certified only if 2.1 holds by reading the code, the controls of section 2 ran first and passed, and the 412 and 431 reruns prove the signs ($l'(t_{412})<0$, $l'(t_{431})>0$). With $l''>0$ on every whole step 374–437 (October C23, C25), the bracket $(5.986684593623649597167969,\,6.176684709182828044891357)$ is then certified, unique and strict. Otherwise it stays conditional, with the failing item named.
- **Q2 bracket:** admitted only if 1.3 holds at every call by code reading, with controls first; the equivalence replay is consistency only.
- **Slices:** audit11 on each slice (on grants), the frozen-meet chain, and a no-refused-step check.
- **Path turn:** 3.1–3.4 on proved enclosures; the bracket with full time uncertainty.

## 6. Falsifiers of this reference

- A proved $|\partial_{q'}r_c|>1$ or $D_t\ne h'$ in the frozen geometry (1.1).
- A root of $h$ outside $(0,2]$ for the unit sphere chord.
- A sign of $l'$ proved over a covered box that the true value contradicts (2).
- A delayed source speed proved non-positive at a receiver time before $t_\star+\tau_{\min}$ (3.5).
