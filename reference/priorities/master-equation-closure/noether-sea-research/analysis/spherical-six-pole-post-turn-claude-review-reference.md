# Six-pole post-turn campaign, independent review: frozen reference addendum (ramon-e-moore lens)

*Frozen before opening any new post-turn subject file. Written 2026-10-21; drafting began after the clock read 02:27:21 UTC. No Python was run. It adds to my path-continuation [reference](spherical-six-pole-path-continuation-claude-review-reference.md) (`91751abc…`), which still binds. Once cited it is not edited; corrections go to a dated companion.*

**Exposure.** Before freezing I read the [post-turn plan](spherical-six-pole-post-turn-plan.md) (`b0391731…`, verified) and October correlated-continuation review adjudication 2 (the G1 chart). A directory listing filtered on `post-turn` showed only the plan. Everything else I know comes from my own path-continuation adjudications 1–15.

## 1. Chart extension beyond source $q'=1.80$ (and below $w'=-0.10$)

**1.1 What the chart is for (derived from the code read in the path-continuation campaign).**
- The v4.4 step refuses when the receiver, the delayed source coordinate or the delayed source speed leaves `BOX`, the `in_box` tests in `accel_parts`.
- The admitted G1 census (receiver $[1.45,2.10]$, $q'\in[0,1.80]$, $w'\in[-0.10,0.45]$) established four things:
  - $M<0$ on every cell;
  - the sign map of $N$ (tangent numerator), with reversals only in a far region;
  - positive chord floors for each class;
  - positive transmitter factors.
- With $M<0$, each factor's side of 1 follows the sign of that class's source speed.
- An extension must re-establish every property that any certificate uses, on the new cells. Silent widening of `BOX` is forbidden.

**1.2 How much extension is needed (derived).** Every source is the same history: $q'(s)=q(s)$ for $s\le t$.
- **Source coordinate.** After the path turn, $q$ decreases while $w<0$. So $q'\le\max_{s\le t}q(s)=q(t_\star)\le1.817731$ (adjudication 11), until a later turn takes $q$ above that value, which cannot happen while $w<0$. The extension in $q'$ therefore needs only $[1.80,\,1.8178]$ plus a pad, say up to 1.83. It must also be checked step by step against the actual source boxes.
- **Source speed.** While $a<0$, $w$ decreases, so $w'=w(s)\ge w(t)$. The extension below $w'=-0.10$ is needed only after the current $w$ itself has fallen below $-0.10$ (near step 581, inferred) and then one delay later (about 0.7 in $t$). That is roughly step 650 (inferred).
- **Receiver.** The receiver box $[1.45,2.10]$ already contains the return path until $q$ falls below 1.45.

**1.3 Required properties on every new cell (receiver $q$, source $q'$, source $w'$).** All by outward interval evaluation, by subdivision until decided, with undecided cells listed and never dropped:
- (a) **$M$ sign.** $M<0$ on every cell, or else the cells with $M\ge0$ or undecided are listed. Every rule that uses "factor side follows the sign of $w'$" must then refuse on those cells.
- (b) **$N$ sign map.** This is the tangent-contribution sign. Reversal cells must be flagged and checked against the actual path, step by step.
- (c) **Separation floors.** $r_c>0$ for each class, with a proved positive lower bound on every cell. The like class matters most, because its floor shrinks as $q+q'$ grows.
- (d) **Transmitter factor.** $D_c=1-k\,w'M/r\ge1-|w'|>0$; this follows from $|M|\le r$ (derived in my reference 1.1). The census must still show the enclosure of $D_c$ per class.
- (e) **Root uniqueness.** Uniqueness of each class root is global under sub-wake history ($h'=D_t\ge1-\sup|w'|>0$, reference 1.1). The census need not redo it, but the step must keep its sub-wake proof over the read range.

**1.4 Required controls (before any target, in a saved record).**
- Known: an exact vector check against independent direct-vector geometry at a point inside the new region, for example $q=1.81$, $q'=1.81$, all three classes. The $q=\pi/2$ oracle must still pass.
- Negative: a sign-flipped $M$ or an exchanged class label is detected.
- Negative: the OLD box refuses a state with $q'=1.81$, and the new box accepts it.
- Known: a numerical prescribed TURNING history, with $q$ peaking and then falling and $w'$ changing sign. This is labelled a consistency check.
- Census coverage: every cell of the declared box was evaluated, and the declared box is covered with no gap. The same edge rules as in my reference 2.1 apply.

**1.5 What the step must do with it.** The step uses the extended `BOX` only through the same `in_box` refusals. It records the actual source and receiver boxes per step, and it refuses outside the extension. The review checks those per-step boxes against the census.

## 2. Proving $l''<0$ on whole steps 531–556, and obligations for a sharper instrument

**2.1 The obstacle (measured, adjudication 12).** At $K=4$, my $l''$ hulls on 494–533 are 0.10–0.20 wide and straddle zero. Their centres are near $-0.03$ to $-0.04$ (inferred from hull midpoints). The rough budget, read from the measured accounts, is:
- $-2a^2\approx-0.23$ to $-0.33$;
- $-2wa'$ is small and positive, at most about 0.04, and falls to 0 at the turn;
- $-r''\approx+0.15$ to $+0.2$ ($r'$ falls from about 0.05 to about 0.005 over the band).

So $l''\approx-0.05$ to $-0.1$, which is negative but with a margin smaller than the present hull widths. The width comes from the input boxes, not from $K$: the state width in $q$ and $w$ is about $6\times10^{-3}$, and the history includes the source jerk boxes `ap` that enter $r''$.

**2.2 My route (proposal; each part on grants).**
1. **Instant-wise sign map of $l'$ from refined end values.** Combine the support's receval v7 refined end enclosures at many ends in 531–556 (Q4) with my ddl10 $[L,U]$ rows. Use these lemmas:
   - $l'\ge A+\min(L,0)\Delta$ on a step to prove positivity;
   - $\sup l'\le\min(A_u+\max(U,0)\Delta,\;B_u+\max(-L,0)\Delta)$ to prove negativity.

   This proves $l'>0$ at every instant up to some end $k$, and $l'<0$ at every instant from some end $m$ to 556. Only the steps $k+1,\dots,m$ remain. Since $|L|\Delta\approx0.0013$ and $l'$ falls about 0.001 per step (inferred), that should be about 2–4 steps.
2. **On the remaining steps only:** either
   - $l''<0$ on each whole step, from a sharper or correlated $l''$ evaluation; this proves uniqueness and strictness; or
   - the strongest delimitation: sub-interval enclosures of $l'$ (receval's sub-step route, or ddl10 refined pieces) that prove signs on sub-intervals. All zeros of $l'$, and hence all local maxima of $l$ after the first support turn up to $t_{556}$, then lie in a stated interval of width at most one sub-interval. That is delimitation, NOT uniqueness, and it must be called so.

**2.3 Obligations for any sharper or correlated $l''$ instrument (binding for my admission).**
- (a) **Containment theorem first.**
  - State it with explicit dimensions, following October adjudication 2. The latent symbols cover the anchor or state, the common origin offset (one true number, its own column) and any reconstructed-history latents.
  - Use a Clarke mean-value hypothesis on a Lipschitz map, with seams included as one-sided limits.
  - The delay-root dependence must enter: $\tau_q=\partial_qr/D_t$ and the time dependence through the delayed reads.
  - No widths or costs may be compared before this theorem holds.
- (b) **Same law.** Use $l''=-2a^2-2w\dot a-r''$, with $r''$ containing the source jerk at the delayed time and $(1-\dot\tau)^2$-type chain factors, and the history read padded (adjudication 3). Remainders are kept whole and never treated as parameters. The stored-rate premise is named wherever the source jerk enters.
- (c) **Known cases.**
  - The exact source-at-rest closed form for each class.
  - An exact affine-in-latent case with a known range.
  - Numerical prescribed-history cases: cubic paths, delays solved, Richardson second differences. These are labelled consistency checks.
  - A turning-history case where $w$ crosses zero.
- (d) **Negatives.**
  - $-2a^2$ dropped.
  - Source acceleration or jerk omitted.
  - Classes exchanged.
  - Origin column dropped.
  - Tied latent parameters missing a known admissible corner.
  - A remainder omitted.
- (e) **Independence.** It must not reuse the subject's $l''$ code and call the result independent. If it shares my ddl10 kernels, that is stated, and agreement with ddl10 is consistency only.
- (f) **Coverage.** Sub-intervals must cover each whole step exactly: first edge at the step's lower time, last at its upper time, edges shared, and the time uncertainty included as in reference 2.1.
- (g) **Sign rule.** $l''<0$ on a step only if the hull over all sub-intervals and all latent cells excludes zero.

## 3. Event criteria on the return path ($w<0$)

All events are derived from per-step proved enclosures, never from an instrument's event summary. The older detectors classify speed extrema only with $\dot q>0$ (audit8 controls E5/E6), so they do not apply on the return path. Brackets use the earlier end's lower time and the later end's upper time, with the padded reading. The order of two events uses step-end instants on the one history (adjudication 15).

- **Speed extremum with $w<0$.** $|w|=-w$, so $d|w|/dt=-a$.
  - A speed MAXIMUM on the return path is a sign change of $a$ from negative to positive (at proved ends), with $w<0$ proved at every instant of the bracket. It is also a MINIMUM of the signed $w$.
  - Uniqueness and strictness need a proved $\dot a>0$ on every whole step of the bracket.
  - A sign change of $a$ from positive to negative with $w<0$ is a speed MINIMUM.
  - A zero of $a$ whose bracket contains an undecided $w$ is not classified.
- **Second path turn ($w$ from negative to positive).** A strict local MINIMUM of $q$; uniqueness needs $a>0$ on every whole step of the bracket.
- **Support turns.** These are sign changes of $l'=-2wa-r'$.
  - With $w<0$ and $a<0$, $-2wa<0$ now FAVOURS stronger inward support. The October mechanism is reversed, so it must be re-derived from the measured account, not carried over.
  - $l'$ from negative to positive is a local minimum of $l$; from positive to negative, a local maximum.
  - While $l<0$, a minimum of $l$ is a maximum of the inward magnitude.
  - A zero of $l$ itself is a separate event, not a turn.
  - Uniqueness needs a proved $l''$ sign on every whole step of the bracket; otherwise existence only, with "every local extremum in the bracket" stated.
- **Canonical radial turns.** A sign change of $r'$ is a radial extremum. A sign change of $r$ is a radial zero.
- **Partner-class sign changes.** For each class, a proved sign change of:
  - its tangent contribution, through the $N$ sign or the factor;
  - its radial contribution;
  - its delayed source speed $w'_c$. When $w'_c$ turns negative, that class's transmitter factor crosses to the other side of 1 (with $M<0$).
- **First-event conditions.** An event is "the first X since Y" only if the opposite sign of the relevant rate is proved at EVERY instant from Y to the bracket start. That proof needs whole-step signs or the lower- and upper-bound lemmas; end signs alone do not suffice.
- **Refusals.** A refused step ends the certified history. The refusal's failing inequality is recorded. No event may be claimed across it.

## 4. Falsifiers of this addendum

- A certificate that uses a chart property not established on the cells it touches.
- A proved $q'>q(t_\star)$ at any time while $w<0$, which would falsify 1.2.
- A sharper $l''$ instrument whose known case fails, or whose hull does not contain the ddl10 hull's true value.
