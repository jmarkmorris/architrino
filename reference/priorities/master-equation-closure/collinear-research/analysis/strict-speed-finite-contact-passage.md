# A strict-speed equation with finite contact response

> **Quarantined special examination — inactive.** This study combines an added quadratic receiver multiplier, a softened spatial response and a contact extension. Its passage and length-sweep results belong to that complete modified equation, not to a radial change or strict inequality alone. It is not the active or default collinear response. The original calculations, recommendations and reproduction instructions remain historical records; further use requires explicit operator re-selection for a named scenario. See the [collinear quarantine disposition](../README.md#quarantined-quadratic-response-examinations).

## Experimental setup and meanings of the terms

These are numerical experiments on a proposed equation, not physical experiments and not runs of the unchanged Master Equation. Every run uses two isolated, opposite-polarity architrinos on one line. Their positions are mirror images, initially $+0.5$ and $-0.5$, so the initial separation is one length unit. Both have zero velocity, with stationary histories supplied from $T=-20$ to $T=0$. At zero we start evolving that preparation. No other architrinos or external influences are included. The mirror symmetry is imposed by the reduced calculation; these runs do not test transverse disturbances.

Wake propagation speed is $c_f=1$. One time unit is therefore the time a wake takes to traverse the initial separation. Each step finds the partner's earlier emission time whose wake reaches the current position, calculates acceleration from that emission and the receiver's present speed, and advances the motion. The past produced by the calculation is retained. The labels are followed through each other without resetting velocity. All five lengths were run through $T=24$; extra short, finely resolved runs at the smallest length concentrate on first passage. Braking, turning and return are measured outcomes, not programmed events.

Only the added length $\ell$ changes between the five physical specifications. Numerical time steps are separately reduced to check resolution. The original preparation, charge tokens, coupling, speed factor, causal delay equation and contact rule remain fixed.

| $\ell$ | Fraction of the initial separation | Meaning of the change |
| --- | --- | --- |
| 1 | All of it | Substantial weakening already at the initial causal distance of one |
| 0.5 | One half | The original finite-contact example; substantial changes over a smaller distance |
| 0.25 | One quarter | Strongest changes concentrated closer to coincidence |
| 0.125 | One eighth | A narrower distance range of strong modification |
| 0.0625 | One sixteenth | The narrowest tested range; the most demanding passage calculation |

The length is not a hard boundary: the formula changes the interaction at every finite distance, with a diminishing relative change far from $\ell$. It is neither a particle radius, a prescribed closest separation, a lower speed cap nor a width assigned to the wake in time. It is an introduced distance parameter in the acceleration formula. No physical derivation currently selects its value.

The equation below has four multiplicative parts for each partner: a receiver-speed factor, polarity and coupling, a distance-and-direction term, and a source-motion factor. The sum adds the contributions; here there is just one other architrino and one causal partner arrival at each separated reception.

| Symbol or term | Meaning in this experiment |
| --- | --- |
| $i$, $j$ | Receiver label and source label: whose acceleration is being calculated, and whose emitted wake contributes |
| $T$, $S$ | Current reception time and earlier emission time |
| $\mathbf X_i(T)$, $\mathbf X_j(S)$ | Receiver's position now and source's position when it emitted the arriving wake |
| $\mathbf V_i(T)$, $\mathbf V_j(S)$ | Receiver's current velocity and source's emission-time velocity; velocity includes direction |
| $v_i=\lVert\mathbf V_i\rVert$ | Receiver speed, a nonnegative magnitude |
| $\mathbf A_i=d\mathbf V_i/dT$ | Receiver acceleration, the change of velocity per unit time |
| $\mathbf r_{ij}=\mathbf X_i(T)-\mathbf X_j(S)$ | Vector from the past emission position to the current receiver position |
| $R=\lVert\mathbf r_{ij}\rVert$ | Distance traveled by that arriving wake, generally different from the two architrinos' simultaneous separation |
| $\widehat{\mathbf r}_{ij}$ | Unit vector along the wake's travel direction when $R>0$ |
| $T-S=R/c_f$ | Arrival condition: elapsed time equals travel distance divided by wake speed |
| $q_i$, $q_j$ | Signed polarity-charge values; their product is negative for this attracting pair |
| $\kappa$ | Fixed positive coupling coefficient setting the strength of the interaction |
| $G=\kappa\lvert q_iq_j\rvert$ | Positive magnitude of that coupling product, about 0.2862286103053385 in this calculation |
| $1-v_i^2/c_f^2$ | Proposed receiver-speed multiplier: one at rest, smaller as speed grows, and tending to zero as speed approaches $c_f$ |
| $\mathbf r_{ij}/(R^2+\ell^2)^{3/2}$ | Proposed finite distance-and-direction response replacing $\mathbf r_{ij}/R^3$ |
| $\widehat{\mathbf r}_{ij}\cdot\mathbf V_j(S)$ | Source velocity component along the direction of the arriving wake |
| $c_f/[c_f-\widehat{\mathbf r}_{ij}\cdot\mathbf V_j(S)]$ | Original source-motion weight: larger when the source moves toward the receiver along that direction, smaller when it moves oppositely |
| $\sum_{j\ne i}$ | Add contributions from other labels; in this binary there is one partner |

For example, the proposed receiver multiplier is 0.75 at speed $0.5c_f$ and 0.19 at $0.9c_f$. It changes acceleration, not existing velocity, and supplies no reversal by itself. It is not a proof that every singular situation is avoided; the incoming bound and contact definition below address this particular experiment.

The modified distance term has magnitude $R/(R^2+\ell^2)^{3/2}$. Far from the added length it approaches the original $1/R^2$ magnitude. At $R=\ell$ it is only $1/(2\sqrt2)$, about 35%, of that original value. As $R$ tends to zero, it tends to zero like $R/\ell^3$, instead of diverging. Thus the finite contact response comes from an explicit change of interaction, not from the strict speed inequality alone. At exact coincidence the unit direction itself is undefined; the complete partner contribution is assigned its continuous zero limit under the positive speed gap.

The source-motion weight describes one part of the wake bunching. For a source velocity component $0.9c_f$ toward the receiver it is 10. The actual rate at which different emission times reach a moving receiver also depends on receiver motion through the causal arrival equation. These calculations keep that delayed geometry; they do not prescribe a separate wake pulse for the pair to cross.

In the scalar calculation, $x$ is the signed position of the member that started at $+0.5$, and the other position is $-x$. After first passage, $x$ is negative: the labels have crossed rather than bounced. The scalar $v=x'$ is signed velocity, unlike the nonnegative speed $|v|$. The auxiliary variable $z=\operatorname{artanh}v$ is just a numerical change of variable with inverse $v=\tanh z$; it is not an additional physical quantity. A prime means differentiation with respect to $T$. The signed causal displacement is $d=x(T)+x(S)$; $\operatorname{sgn}(d)$ is its direction, plus or minus. The numerical step $h$ is the time between stored states, not a physical parameter of the equation.

A first passage is the first sign change of $x$ through zero. Braking is decreasing speed after departure. A turn is a change in the sign of velocity at nonzero separation. A return crossing is the next sign change of $x$ through zero. No turn by $T=24$ is a finite observation; the separate sufficient escape condition below states what would establish no later turn for an exact outgoing state. In that condition $r=-x>0$ is the outgoing half-separation, $w=r'>0$ the outward speed, and $(r_0,w_0)$ their values at a chosen outgoing time. The quantity $B=w_0^2-2G/r_0$ is a derived lower bound for later squared speed when positive; it is not a conserved energy or an additional rule.

## Question and equation

The target is passage through the partner's arriving wake and coincidence, followed by calculating the outgoing motion. This 2026-09-26 experiment supplies one explicit modified equation. It does not prescribe a bounce, velocity jump, outgoing path or braking time.

Let $\mathbf r_{ij}=\mathbf X_i(T)-\mathbf X_j(S)$, $R=\|\mathbf r_{ij}\|$, and $\widehat{\mathbf r}_{ij}=\mathbf r_{ij}/R$. Keep the causal condition $T-S=R/c_f$ and the original polarities and coupling. At each ordinary partner root use

$$
\mathbf A_i=
\left(1-\frac{\|\mathbf V_i\|^2}{c_f^2}\right)
\sum_{j\ne i}\kappa q_iq_j
\frac{\mathbf r_{ij}}{(R^2+\ell^2)^{3/2}}
\frac{c_f}{c_f-\widehat{\mathbf r}_{ij}\cdot\mathbf V_j(S)},
\qquad \|\mathbf V_i\|<c_f.
$$

For a history satisfying the strict-speed condition, positive-delay self arrivals are absent by the displacement-versus-path-length inequality. Their absence here follows from the geometry, rather than discarding an existing self contribution. At exact partner coincidence define the contribution by its continuous limit, zero, provided the nearby source speed has a positive gap below $c_f$. The numerator tends to zero and the denominator remains bounded away from zero under that condition. The root then reaches $S=T$; this zero-distance extension is explicitly part of the proposed equation, beyond the original ordinary-root formula.

There are two changes to the Master Equation: the receiver-speed multiplier, and replacement of $\mathbf r/R^3$ by $\mathbf r/(R^2+\ell^2)^{3/2}$. The latter removes the short-distance divergence and introduces a length $\ell$. This is a softened interaction; no limit removing the softening is claimed. It also changes acceleration before contact. The speed factor alone, examined in [row 10's analysis](strict-speed-quadratic-response.md), was insufficient.

For this one experiment set $c_f=1$ and $\ell=0.5$, equal to the initial half-separation. This is an exploratory fixed parameter, not a derived length or a new universal constant. The same equation could be evaluated on braid histories, but this experiment concerns only the collinear mirror pair.

## Same stationary preparation

Use $X_+(T)=0.5$, $X_-(T)=-0.5$, zero velocity and the retained stationary history $-20\le T\le0$. The charge and coupling tokens are those in the [original stationary encounter](stationary-binary-first-interval.md#scope-and-model): their exact product is converted once to binary64 for the numerical instrument, giving $G=0.2862286103053385$. The preparation is unchanged; the initial acceleration changes because the equation changes.

Write $X_+=x$, $X_-=-x$, $v=x'$ and $z=\operatorname{artanh}v$. Keeping the sign of $x$ preserves the labels through crossing. The reduced equation is

$$
x'=\tanh z,\qquad
z'=-\frac{Gd}{(d^2+\ell^2)^{3/2}[1+\operatorname{sgn}(d)v(S)]},
\qquad d=x(T)+x(S),\quad T-S=|d|.
$$

The value of $z'$ is zero at $d=0$. The source velocity of the other member is $-v(S)$, which explains the plus sign in the denominator. Using $z$ is a variable change, not numerical velocity clipping. Finite $z$ implies $|v|<1$, but a computation must still check whether $z$ becomes unbounded. No reflection or reset is performed when $x$ crosses zero.

## What happens to the incoming wake

Before first coincidence, set $u=-v>0$ and $w=\operatorname{artanh}u$. Both $u$ and $w$ increase. The partner arrival relation gives

$$
\frac{dS}{dT}=\frac{1+u(T)}{1-u(S)},\qquad
dw=\frac{G k(R)}{1+u(T)}\,dS,\qquad
k(R)=\frac{R}{(R^2+\ell^2)^{3/2}}.
$$

Unlike the original inverse-square magnitude, $k(R)$ has a finite maximum $M=2/(3\sqrt3\ell^2)$. Starting with $S(0)=-1$, the exact change of variable yields

$$
0\le w(T)\le GM[S(T)+1]\le GM(T+1).
$$

This bound prevents speed equality at any finite incoming time, including the limiting coincidence time. After any small positive time the inward speed is positive and increasing, so the remaining positive separation is traversed in finite time. At positive separation the causal delay keeps the source in an earlier regular interval, permitting continuation of this smooth separated equation. The bound controls the approach to its first contact endpoint. Thus incoming contact has finite speed strictly below one, and the acceleration tends to zero there. This analytical incoming argument is self-checked, not independently reviewed.

The causal root is unique while the strict speed gap holds: the derivative of $T-S-|x(T)+x(S)|$ with respect to $S$ is negative on each side of zero distance. Near contact the arriving emission time tends continuously to the contact time. There is no entire straight equality-speed emission interval arriving at one instant. Earlier emissions are received before coincidence; immediately afterward the unique root lies after the partner's crossing. Thus the phrase “bunched wake, then coincidence” is a sequence of increasingly compressed arrivals in this model, rather than an assumed separate instantaneous event.

## Outgoing motion and numerical evidence

Immediately after passage, $x<0$ and $v<0$, while the partner is on the positive side. The calculated acceleration is positive, opposing the outgoing velocity: braking follows from the delayed equation, without choosing a braking-start time. This sign argument alone does not prove a later turn. The following turn and return are numerical observations.

The retained [exploratory instrument](../../../../../scripts/collinear-research/strict-speed-finite-contact-exploration.py) uses scalar causal-root bisection/Brent solving, stored position and rapidity interpolation, and four Runge–Kutta stages. Within a stage, any source time newer than the accepted history uses a linear interpolation to that stage's proposed state. Consequently nominal four-stage stepping does not establish fourth-order accuracy for this delayed problem. All runs retain the generated history, and negative-time roots use the stationary preparation. For a strict-speed history the emission time increases with reception time, starting at $S=-1$. Thus the constant negative-time history used by the instrument supplies the same required preparation; no earlier emission is required by this causal geometry.

Before the target run, known controls passed: an affine-history causal root matched its analytical value exactly to binary64 precision, and the stationary-source first interval matched independently evaluated quadrature to $1.44\times10^{-15}$ in endpoint position at $T=0.5$. The quadrature uses the exact early-interval relation

$$
1-u^2=\exp\left\{2G\left[
\frac1{\sqrt{(2a)^2+\ell^2}}-
\frac1{\sqrt{(x+a)^2+\ell^2}}
\right]\right\},\qquad a=0.5.
$$

The first control attempt encountered cancellation in quadrature near its integration endpoint; a rationalized expression repaired that control before any target run. A separate contact-limit control checked decay of the kernel at fixed strict source speed. These controls check particular formulas and instrument behavior. They do not independently validate the full future trajectory.

| Step size | First coincidence time | Speed at first coincidence | First turn time | Position of positive-starting label at turn | Return coincidence time |
| --- | --- | --- | --- | --- | --- |
| $1/512$ | 2.054357421 | 0.580407346 | 11.768542769 | −1.726573486 | 22.190928918 |
| $1/1024$ | 2.054357455 | 0.580408467 | 11.768422328 | −1.726558241 | 22.190678261 |
| $1/2048$ | 2.054357466 | 0.580409110 | 11.768426242 | −1.726558735 | 22.190686393 |

These are measured event estimates from linear interpolation between saved samples, not error enclosures. The two finest runs differ by about $1.09\times10^{-8}$ in first-crossing time, $3.91\times10^{-6}$ in first-turn time and $8.13\times10^{-6}$ in return-crossing time. Refinement is not monotone at every event. A preliminary $1/256$ run through $T=12$ also passed through coincidence and turned.

In the finest run through $T=24$, the largest sampled speed is approximately 0.662823143, reached near the return crossing. At that second crossing the speed is about 0.662822971, different from the first crossing's speed. The run therefore shows passage, braking, a turn and return for this particular model and parameter; it does not establish a periodic cycle, long-time boundedness or stability. No result is claimed as $\ell\to0$.

## What the turn and return mean

“Turns and returns” describes motion after the first passage, not a bounce at first coincidence. In the $\ell=0.5$ run the sequence is:

1. At $T\approx2.054357$, both labels reach the midpoint and pass through each other. The member that started at $+0.5$ continues leftward, and the other continues rightward.
2. Attraction then opposes their outgoing velocities. Their speeds decrease while separation continues to grow.
3. At $T\approx11.768426$, they stop momentarily at opposite positions approximately $\pm1.726559$, then reverse direction. This is the turn, at positive separation.
4. They approach again and pass through the midpoint a second time at $T\approx22.190686$. This is the return through coincidence. The calculation continues beyond that second passage to $T=24$.

This sequence is measured by the retained instrument; it was not inserted as an event rule. It establishes one outward excursion and return for this modified equation, not a demonstrated breather. A breather claim would require sustained bounded expansion and contraction generated by the retained-history dynamics. A periodic breather would additionally require recurrence of the state that determines future motion, allowing any declared label or spatial symmetry; repetition of positions alone is insufficient. Stability against perturbations is a further question.

The original runs through $T=24$ did not establish those properties. At $\ell=0.5$, first- and second-crossing speed magnitudes differ: approximately $0.580409$ and $0.662823$. At $\ell=1$, two successive turn distances from the midpoint grow from approximately $0.798321$ to $1.596005$, and crossing speeds also differ. These are evolving excursions, not evidence of an already established repeating cycle. Those early records did not decide eventual settling or escape; the extended runs below examine subsequent motion. The smaller-length examples instead support continued separation under the conditional escape analysis.

## Review of the added short-distance interaction

The finite interaction replaces a singular contact problem by a specified smooth spatial response. At fixed positive $\ell$, its acceleration magnitude rises during approach, reaches a maximum as a function of causal distance at $R=\ell/\sqrt2$, and then falls to zero at contact. This statement concerns the distance factor alone; the complete acceleration also contains the speed and source-motion factors. The partner contribution changes direction after crossing, supplying outgoing braking without prescribing a braking-start time.

This is a useful exploratory construction because it makes passage calculable and exposes sensitivity to the short-distance law. It is also a substantive new assumption: it weakens acceleration before coincidence, changes the contact response, and introduces an undetermined length. It is not implied by $v<c_f$, derived from the Master Equation, or justified by the observation of a numerical return. The tested return is therefore evidence about this chosen modified equation. A physical justification of the short-distance response and its length, an independent trajectory check, and a long-time bounded-motion result are separate outstanding questions. The present review selects none of these assumptions as canonical.

## Sensitivity to the short-distance length

The follow-up holds the stationary preparation, coupling, speed factor, causal arrival rule and contact extension fixed, and changes only $\ell$. Thus it examines the same modified equation family. The command-line option `--ell` exposes the former constant; the numerical scheme and analytical quadrature control were unchanged. The pre-parameterization instrument is preserved in the local sensitivity directory. Each of the five lengths passed the known controls before its target run.

| Length $\ell$ | First passage time | First passage speed, in units of $c_f$ | Subsequent behavior measured |
| --- | --- | --- | --- |
| 1 | 3.068746 | 0.316359 | First turn near 7.812359; return crossing near 12.361005 |
| 0.5 | 2.054357 | 0.580409 | First turn near 11.768426; return crossing near 22.190686 |
| 0.25 | 1.775418 | 0.817592 | No turn through 24; still separating at speed about 0.297107 |
| 0.125 | 1.702256 | about 0.9566 | No turn through 24; still separating at speed about 0.536 |
| 0.0625 | 1.683689 | about 0.9968 | No turn in the runs through 24; separately refined through 3, with outward speed about 0.753 there |

The $\ell=1$ and $0.25$ entries use step $1/4096$, compared with $1/1024$ and $1/2048$. The $\ell=0.5$ entry is the original $1/2048$ run. For $\ell=0.125$ and $0.0625$, additional $1/16384$ runs through 24 check the stronger time-step sensitivity. The smallest length was then examined through time 3 at steps $1/32768$ and $1/65536$, concentrating resolution on first passage and early departure. Its tabled first-passage speed uses the finest early run, not the less resolved long run.

The larger changes in the smaller-length runs must not be hidden by printing excessive precision. For $\ell=0.125$, the outgoing speed at 24 changes from 0.536819 at step $1/1024$ to 0.535679 at $1/4096$ and 0.535926 at $1/16384$. For $\ell=0.0625$, the corresponding values are 0.699647, 0.674002 and 0.688431. This is not monotone convergence. The two finest early runs at the smallest length differ by about $5.8\times10^{-7}$ in first-passage speed and $2.98\times10^{-4}$ in speed at time 3. Their first-passage times differ by about $4.1\times10^{-11}$. Accurate crossing time alone therefore does not establish an accurate outgoing trajectory. All these comparisons are consistency measurements, not independent error bounds.

**Measured conclusion:** passage persists across these tested positive lengths, but the return seen at $\ell=0.5$ is not a robust conclusion across the tested family. Smaller lengths give faster first passage and substantially different outgoing motion. The calculations do not locate the transition between return and escape, nor establish monotonic behavior for every possible length.

### A sufficient condition for no later turn

Waiting longer is not the only way to examine the missing turns. The following inequality is derived directly from the modified equation. After first passage let $r=-x>0$ and $w=r'>0$ be outward position and speed. As long as this first outward motion continues, the unique partner emission lies after first coincidence; its outward speed $w(S)$ is nonnegative. The acceleration satisfies

$$
-w'=\frac{G(1-w^2)R}{(R^2+\ell^2)^{3/2}[1+w(S)]}
\le\frac{G}{r^2},\qquad R=r(T)+r(S)\ge r(T).
$$

Choose an outgoing state $(r_0,w_0)$ after first passage. Using $r'=w$ and integrating in $r$ gives

$$
w(r)^2\ge w_0^2-2G\left(\frac1{r_0}-\frac1r\right).
$$

Consequently, if an exact state and its retained history satisfy

$$
B=w_0^2-\frac{2G}{r_0}>0,
$$

then $w\ge\sqrt B>0$ for the entire subsequent outward motion. A first turn is impossible, separation grows without bound, and the separated equation remains regular. This uses the stated first-outgoing history and equation, not an imported energy-conservation law. It is a self-checked sufficient condition; failure of the inequality would not prove a return.

For the $\ell=0.25$ numerical state at time 24, $B\approx0.0156814$. For $\ell=0.125$ at time 24, the finest recorded run gives $B\approx0.241813$. The finest early $\ell=0.0625$ run also gives positive $B$ at time 3. These values support escape as the interpretation of the absent turns. They are conditional on the numerical states being accurate enough to preserve the positive margin and the required history. They do not certify the exact released trajectory: that requires independently validated state and history error bounds. The arithmetic extraction first passed a known case with result 0.15.

### Applying the escape check after a later crossing

The same argument applies to any uninterrupted outward excursion after a crossing, using $r=|x|$ and outward speed $w>0$. For a strict-speed history, $|x(T)|<T-T_c$ after the latest crossing at $T_c$, so that crossing is earlier than the unique current partner emission. Thus the partner source time also lies in the current outward excursion. This is why the bound can be used after the second crossing in the extended $\ell=0.5$ run.

A known upper bound $\bar w<1$ on speed throughout the current outward excursion strengthens the estimate. Since $r(T)-r(S)\le\bar w R$ and $R=r(T)+r(S)$, one has $R\ge2r(T)/(1+\bar w)$. Hence

$$
-w'\le\frac{G(1+\bar w)^2}{4r^2},\qquad
w^2\ge w_0^2-\frac{G(1+\bar w)^2}{2}\left(\frac1{r_0}-\frac1r\right).
$$

A positive value of $w_0^2-G(1+\bar w)^2/(2r_0)$ is sufficient for no later turn under those exact-state and history assumptions. For the numerical runs, any use of their computed positions, velocities or speed upper bounds remains conditional on their errors. This strengthens the sufficient condition; it is not a new evolution rule.

### What this says about removing the new length

The incoming proof works for each fixed $\ell>0$, but its bound contains $M=2/(3\sqrt3\ell^2)$ and becomes unbounded as $\ell$ decreases to zero. It supplies no common positive speed gap in that limit. The measured first-passage speeds approach one across the tested sequence. Together these facts explain why finite-length passage cannot be promoted to a passage of the zero-length equation. The earlier quadratic-response analysis already finds speed tending to one at the coincidence endpoint when the short-distance modification is absent. This sweep demonstrates sensitivity of the modified model; it does not resolve that endpoint or justify a physical value of $\ell$.

Raw sensitivity receipts, histories, known controls and the pre-change instrument are in `.local-data/collinear-research/finite-contact/sensitivity/`. For example, reproduce the $\ell=0.25$ comparison with `--ell 0.25 --h 0.000244140625 --end 24`, running its `--known` control first. No new routine test suite or production EOM change is introduced.

## Extended runs and the first two turns

On 2026-09-27 the $\ell=0.5$ case was extended first, followed by the requested lengths 0.3, 0.4, 0.6, 0.7, 0.8 and 0.9 and the length-1 reference. Every case was evolved to $T=200$ at both $h=1/1024$ and $h=1/2048$. Known controls passed for each length before target use. The only instrument change was a ten-second progress report; a direct diff against the saved pre-change script confirms that its equation, numerical stepping, root solve and analytical control formulas were unchanged.

Speeds are the magnitudes for either member. Turn distances are each member’s distance from the midpoint; the pair separation is twice the listed distance. Initial separation is one, with $c_f=1$. A dash means that event was not observed by $T=200$, not a zero distance or speed. The first turn follows first coincidence; the second turn, when present, follows second coincidence.

| Length $\ell$ | First crossing speed $v/c_f$ | Distance at first turn | Second crossing speed $v/c_f$ | Distance at second turn |
| --- | --- | --- | --- | --- |
| 0.3 | 0.7628 | — | — | — |
| 0.4 | 0.6643 | 3.379 | 0.7352 | — |
| 0.5 | 0.5804 | 1.727 | 0.6628 | — |
| 0.6 | 0.5093 | 1.274 | 0.5976 | — |
| 0.7 | 0.4489 | 1.062 | 0.5385 | 6.349 |
| 0.8 | 0.3976 | 0.938 | 0.4846 | 2.944 |
| 0.9 | 0.3538 | 0.856 | 0.4358 | 2.025 |
| 1.0 | 0.3164 | 0.798 | 0.3917 | 1.596 |

The two step sizes give matching crossing and turn counts through 200 for every length. Across the requested entries, the largest crossing-speed discrepancy is about $1.20\times10^{-6}$ and the largest turn-distance discrepancy is about $8.14\times10^{-5}$, both in the length-0.4 comparison. Values above are rounded from the finer run. These are numerical consistency checks, not certified error bounds or an independently authored future-trajectory calculation.

### What the longer length-0.5 run changes

There is no second turn through $T=200$. After its second coincidence at $T\approx22.190686$, the positive-starting label moves outward on the positive side, reaching $x\approx45.902568$ with outward speed approximately $0.238873$ at 200. Its two crossings and single turn agree under the two step sizes. Thus the extension does not add several breathing cycles; it supports departure after one return.

The extended length-1 run does show another excursion: its first three turn distances are approximately 0.798321, 1.596005 and 7.011885, with four crossings through 200. The growing excursions do not establish bounded periodic motion. At lengths 0.7, 0.8 and 0.9, the second turn is also farther from the midpoint than the first.

### Missing turns and conditional escape evidence

Using the stronger sufficient condition above, the final outgoing states and conservative rounded sampled speed bounds give positive margins for lengths 0.3 through 0.8. For example, the numerical length-0.6 history stays below the proposed upper bound $\bar w=0.60$, and its time-200 state gives a sufficient margin of approximately 0.002070. For length 0.5, using $\bar w=0.67$ gives approximately 0.048365. The bound is applied to the uninterrupted excursion after the most recent crossing, not across an earlier turn.

These calculations support escape after the last recorded crossing, conditional on state and history errors preserving the inequalities. A rounded sampled maximum is not itself a certified continuous upper bound. The same test is inconclusive for lengths 0.9 and 1 at time 200; a negative margin proves neither return nor escape. The observed finite sequences and the conditional inequalities therefore remain distinct. No breather has been established by these runs.

### Reproduction and retained records

The numerical source remains [strict-speed-finite-contact-exploration.py](../../../../../scripts/collinear-research/strict-speed-finite-contact-exploration.py). For each listed length run its known controls, then the two steps through 200; for example:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/strict-speed-finite-contact-exploration.py --ell 0.4 --known
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/strict-speed-finite-contact-exploration.py --ell 0.4 --h 0.00048828125 --end 200 --out .local-data/collinear-research/finite-contact/extended/ell-0.4-h2048-t200.json
```

Long-running invocations use the repository compute supervisor. The two supervised batches completed with exit code zero and closed process groups: coarse run a5cee53c-9c22-43e0-8bf0-4d231675cad1 and fine run ad7bb437-6112-48c5-9534-555034247b50. Their wall times were approximately 120 and 228 seconds, respectively; these are batch observations, not general performance claims. Receipts, sampled histories, known controls, the pre-change script, launch commands and the table extraction are retained under `.local-data/collinear-research/finite-contact/extended/`. The event extractor passed a known example with signed velocities, signed turn positions and an absent second turn before reading the target receipts. It reports positive speed and distance magnitudes and preserves missing events as missing.

## Acceleration versus received potential: audit of the implemented rule

The 2026-09-27 question is whether the increasing excursion sizes arise from using a potential value as acceleration instead of its spatial slope. Inspection of the retained numerical source shows that it directly evaluates the softened acceleration expression, with the transmitter factor and receiver-speed multiplier. It does not sample a scalar potential and use that scalar as acceleration. On this separated, strict-speed, single-root chart, the expression also has the following exact scalar-gradient representation.

For one opposite-polarity partner, hold the source history and reception time $T$ fixed, vary the receiver position $\mathbf X$, and define

$$
\Phi(\mathbf X,T)=-\frac{G}{\sqrt{R(\mathbf X,T)^2+\ell^2}},\qquad
R=\|\mathbf X-\mathbf X_j(S)\|,\qquad S=T-R/c_f.
$$

The source emission time must change when the receiver position changes. Differentiating the arrival condition therefore gives

$$
\nabla_{\mathbf X}R=\frac{c_f\widehat{\mathbf r}}{c_f-\widehat{\mathbf r}\cdot\mathbf V_j(S)},\qquad
-\nabla_{\mathbf X}\Phi=
-\frac{G\mathbf r}{(R^2+\ell^2)^{3/2}}
\frac{c_f}{c_f-\widehat{\mathbf r}\cdot\mathbf V_j(S)}.
$$

The denominator is positive on the strict-speed chart, so it agrees with the absolute transmitter factor used by the Master Equation there. Multiplying this expression by $1-v_i^2/c_f^2$ gives exactly the proposed acceleration used by the experiment. In the code, the auxiliary variable $z=\operatorname{artanh}v$ removes this multiplier from the equation for $z'$; conversion back to $v$ restores it. Its absence from the displayed line assigning `zprime` is not an omitted factor.

Thus the source-motion factor already includes the change in emission time needed for the spatial gradient. Omitting that dependence would omit a real factor; differentiating the already calculated acceleration again would change the equation. A potential value, a spatial gradient at fixed reception time, and a time derivative along a moving receiver are different quantities. The normals to scalar equal-value surfaces give the gradient direction; the unnormalized gradient supplies magnitude. Fixed-emission wake fronts supply the causal geometry. A plotted wake intensity should not be assumed to be the scalar potential whose gradient gives acceleration. The [Master Equation's gradient discussion](../../../../../content/markdown/aaa/dynamics/master-equation.md) preserves the same limitation: a local gradient representation does not establish an action or conservation account.

The [separate gradient-check instrument](../../../../../scripts/collinear-research/strict-speed-potential-gradient-check.py) evaluates the scalar by independently solving its delayed distance, then takes a centered receiver-position difference at fixed time. Its stationary-source analytical control passed before the moving-source comparisons. Three affine moving-source comparisons on both sides of the source then agreed with the proposed acceleration expression to absolute discrepancies below $6.84\times10^{-12}$. The retained output is `.local-data/collinear-research/finite-contact/gradient-check.jsonl`. This checks the gradient identity on these prescribed histories, not the accuracy of the full evolved trajectory, a global potential or a singular zero-length limit. The simulated trajectory instrument was not modified in this audit.

### What the growing excursions do and do not diagnose

The table supports increasing crossing speeds and excursion sizes in the returning examples. Several cases subsequently stop returning and support escape under the conditional state checks. It does not establish indefinitely many increasingly large passes in every case.

For the mirror approach, the transmitter factor is $1/[1-u(S)]$ with positive inward source speed $u(S)$. Immediately after passage during outward separation, it is $1/[1+w(S)]$ with outward source speed $w(S)$. The former enhances the incoming contribution and the latter reduces the outgoing contribution at otherwise equal distance and source-speed magnitude. Actual delayed distances and histories differ too, so these factors alone are not a quantitative derivation of the observed speed gain. They identify a concrete asymmetry to audit; equal-potential endpoints do not imply equal speed when the source history is changing.

The unresolved issue is therefore broader than potential value versus slope. The proposed equation adds a receiver-speed multiplier and a softened spatial interaction without deriving a corresponding conserved source-plus-wake account. A local scalar gradient is insufficient to supply that account for a moving delayed source. The calculations establish behavior of the chosen modified equation; a return is not evidence that those modifications correctly describe a physical bound pair. The next useful investigation is the accumulated inward and outward acceleration and the source/wake accounting that would support the chosen response, rather than tuning the introduced length to obtain a desired breather. The present audit finds no raw-potential-as-acceleration error and does not rule out other numerical or modeling defects.

The subsequent [accumulated-acceleration audit](strict-speed-acceleration-balance.md) carries out that comparison on the saved length-0.5 histories. It finds that the source-motion weighting reverses a distance-only balance that otherwise favors braking; the added speed factor reduces the resulting excess. The changing-potential identity accounts for the observed gain within the proposed equation, while its source/wake conservation account remains unresolved.

## Reproduction and limits

Raw JSON receipts and sampled histories are retained under `.local-data/collinear-research/finite-contact/`; the source and this result table are durable repository artifacts. Run the known controls before repeating the target:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/strict-speed-finite-contact-exploration.py --known
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/strict-speed-finite-contact-exploration.py --h 0.00048828125 --end 24 --out .local-data/collinear-research/finite-contact/h2048.json
```

The equation is a proposed modification; the incoming strict-speed and contact-limit statements are derived under the stated mirror assumptions; the full passage, turn and return sequence is measured by this instrument. An independently authored delayed solver or continuous trajectory enclosure could challenge the numerical sequence. Changing $\ell$, the response, or the preparation is a different experiment. No EOM solver implementation, canonical law change, or permanent-binding claim follows.
