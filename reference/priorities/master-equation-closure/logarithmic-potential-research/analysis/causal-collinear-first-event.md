# Causal logarithmic approach: the incoming first event

## Result and declared histories

**Claim grade: derived for the stated candidate and preparations.** Two mirror-symmetric opposites, released from a stationary or uniformly inward supplied past, reach individual wake speed in finite time at positive separation. The whole incoming solution has one simple partner root per receiver and no positive-delay self root, including at the endpoint. Delay changes the trajectory, but it does not make contact precede wake-speed equality in this family. This theorem stops at that equality and supplies no outgoing branch.

Set $c_f=1$, let $K>0$ be the logarithmic coupling of dimension squared speed, and choose $a>0$ and $0\le u_0<1$. The complete prepared past is

$$
X_\pm(T)=\pm x(T),\qquad x(T)=a-u_0T,\qquad u(T)=u_0\quad(T\le0).
$$

For future times, $u=-\dot x$ is the individual inward speed and $x=|X_+-X_-|/2$ is the positive half-separation before contact. The positive sign of $x$ describes a distance, not polarity. The preparation is prescribed data; it is not claimed to solve the interacting equation at negative times. The stationary baseline is $u_0=0$; $u_0=1/4$ is a controlled inward-history variation, with the same $a$ and $K$.

The [formulation](causal-logarithmic-formulation.md) specifies all simple positive-delay roots, including self reception, with the per-hit inverse-distance response and the absolute transmitter weight. No cap, cutoff, collision rule, environment, or self-root suppression is imposed. All statements below follow on its mirror-symmetric incoming sector.

## Complete root census and reduced equation

For a right-hand receiver, the opposite source was on the left. Its emission time $S(T)$ and reception distance $R(T)$ satisfy

$$
T-S=x(T)+x(S)=R>0.
$$

Define $P(T)=T+x(T)$ and $Q(T)=T-x(T)$. While the entire retained history has $u<1$, $P'=1-u>0$, and the root equation is $P(S)=Q(T)$. Moreover, $P(S)\to-\infty$ as $S\to-\infty$ in the affine preparation, while $P(T)-Q(T)=2x(T)>0$. There is exactly one partner root and it is strictly earlier than reception. This argument surveys the complete supplied past, rather than a finite search window.

A self root would require $|X_i(T)-X_i(S)|=T-S$. In the incoming history,

$$
|X_i(T)-X_i(S)|=\int_S^T u(v)\,dv<T-S.
$$

Thus there are no positive-delay self roots. The same strict inequality holds when $u(T)=1$ for the first time, because every earlier velocity is less than one. The diagonal $S=T$ remains excluded by the model.

The partner direction gives $D_t=1-u(S)>0$ and $D_r=1+u(T)>0$. Consequently the full sum reduces, without deleting any admitted contribution, to

$$
\boxed{\dot x=-u,\qquad
\dot u=\frac{K}{R[1-u(S)]},\qquad
S=P^{-1}(Q(T)),\qquad R=T-S.}
$$

Root playback and the change of delay are

$$
\dot S=\frac{1+u(T)}{1-u(S)}>0,\qquad
\dot R=-\frac{u(T)+u(S)}{1-u(S)}\le0.
$$

At release, $S_0=-2a/(1-u_0)$ and $R_0=2a/(1-u_0)$. Since $u$ increases strictly, it has no incoming-to-outgoing turn. Local existence and uniqueness follow by solving successive ordinary differential equations using already determined histories: positive $R$ keeps the source time strictly behind reception, and positive $1-u(S)$ makes its inverse map regular. The formulation gives the initial segment explicitly and states the regularity of this construction at the history join.

## Finite-time endpoint and exclusion of contact

Before individual speed reaches one, $R\le R_0$ and $1-u(S)\le1-u_0$. Therefore

$$
\dot u\ge\frac{K}{R_0(1-u_0)}=\frac{K}{2a}.
$$

The incoming sector cannot persist beyond $2a(1-u_0)/K$. The only possible first limiting boundaries are $u=1$ or $x=0$: on a finite interval with both $x$ bounded away from zero and $u$ bounded below one, the delay stays positive, the source factor stays positive, and the local construction extends. Position and speed have one-sided limits because $x$ decreases and $u$ increases.

Contact cannot be that endpoint, even if speed tends to one there. Suppose contact occurred at a finite $T_c$ with $u(T)\le1$ on the incoming branch. The monotonicity of $P$ implies $S(T)\to T_c$: a limit $S_c<T_c$ would give

$$
P(T_c)-P(S_c)=\int_{S_c}^{T_c}[1-u(v)]\,dv>0,
$$

whereas the root equation and $x(T_c)=0$ require equality. Thus $R\to0$ and the emission coordinate sweeps to $T_c$.

Invert the increasing playback to write reception time as $T=T(S)$. The acceleration equation then gives the exact identity

$$
\frac{d}{dS}\left(u(T(S))+\frac12u(T(S))^2\right)
=\frac{K}{T(S)-S}.
$$

Here the factor $1-u(S)$ cancels through playback; no conservation principle is assumed. Since $T(S)<T_c$,

$$
\int_{S_0}^{S}\frac{K}{T(v)-v}\,dv
\ge K\log\!\left(\frac{T_c-S_0}{T_c-S}\right)\longrightarrow+\infty.
$$

The quantity on the left of the differential identity is at most $3/2$ when $u\le1$. The divergence is a contradiction. Therefore the first endpoint satisfies

$$
\boxed{0<T_v\le\frac{2a(1-u_0)}{K},\qquad
u(T_v)=1,\qquad x(T_v)>0.}
$$

At this event $R_v\ge2x(T_v)>0$, $S_v<T_v$, and $u(S_v)<1$. The partner acceleration has a finite positive limit, its transmitter factor is positive, and $D_r=2$. Thus the event is neither contact nor a positive-delay transmitter fold. It is the first boundary of the incoming below-wake-speed history class, not a divergence of the admitted partner row at that instant.

## What delay changes relative to the instantaneous control

The causal chord identity is

$$
2x(T)=\int_{S(T)}^T[1-u(v)]\,dv.
$$

Since speed is nondecreasing along the whole retained history, $1-u(v)\le1-u(S)$. Therefore $2x\le R[1-u(S)]$. The inequality is strict for every $T>0$, because the interval contains part of the strictly accelerating released trajectory. Consequently

$$
\dot u<\frac{K}{2x}\quad(T>0),\qquad
u^2-u_0^2<K\ln(a/x)\quad(0<T\le T_v).
$$

The second inequality follows by multiplying the acceleration inequality by $2u$ and integrating with $\dot x=-u$; rest release follows by the same time-integral argument, without division by the initial zero speed. Relative to the [instantaneous logarithmic control](instantaneous-collinear-first-event.md) with the same $a,K,u_0$, the delayed pair therefore reaches speed one at a smaller positive separation:

$$
\boxed{0<x_v^{\mathrm{causal}}<a\exp[-(1-u_0^2)/K]=x_v^{\mathrm{instantaneous}}.}
$$

It also takes longer to reach that speed. At every common positive separation attained after release, its inward speed is lower than the instantaneous value; integrating $dT=-dx/u$ to the instantaneous threshold therefore takes longer, and the causal pair still has further distance to travel before its own threshold. These comparisons concern the two logarithmic models. They do not order the evolved logarithmic candidate against the delayed inverse-square control.

The effect is geometric. Although the transmitter weighting increases as the emitted source speed rises, the longer source-to-receiver distance and its history relation keep the combined denominator above the current equal-time separation throughout this monotone incoming family.

## Prepared-history reception and its join

While the active emission time lies in the supplied affine past, $S\le0$, put $y=x+a-u_0T$. Then

$$
R=\frac{y}{1-u_0},\qquad
S=T-\frac{y}{1-u_0},\qquad
\dot u=\frac{K}{y},\qquad \dot y=-(u+u_0).
$$

The exact parametrization by the increasing speed is

$$
y(u)=2a\exp\!\left[-\frac{(u+u_0)^2-4u_0^2}{2K}\right],
$$

$$
T(u)=\frac{2a}{K}e^{2u_0^2/K}
\int_{u_0}^{u}e^{-(v+u_0)^2/(2K)}\,dv,
\qquad x(u)=y(u)-a+u_0T(u).
$$

These formulas solve the released motion only until its source time reaches zero or speed reaches one, whichever occurs first. The source-history join is determined by $S(u)=0$, equivalently $T=x+a$. The function $S(u)$ increases strictly, so there is at most one such join. If the formal affine-source value $S(1)$ is negative, speed equality occurs before the join; if it is zero the two are simultaneous; if positive there is one earlier join. In that last case the formula after the join is only a diagnostic extension of the affine-source expression, and the actual motion must use its solved released history. Contact cannot intervene before this classification: on the affine segment, $x=0$ with $u<1$ implies $T>a$ and hence $S=(T-a)/(1-u_0)>0$, contradicting remaining in $S\le0$.

At a join the source position and velocity agree on both sides of zero, so $D_t=1-u_0>0$ and the acceleration is continuous. Source acceleration can jump because the held or uniformly moving past was preparation data. The join changes which history is read and is not a physical collision or root fold.

For an exact illustrative rest preparation $a=1$, $K=2$, $u_0=0$ and $c_f=1$, the first event remains in the stationary-source segment:

$$
x_v=2e^{-1/4}-1>0,\qquad
T_v=\int_0^1e^{-v^2/4}\,dv<1,
\qquad R_v=2e^{-1/4}>1,\qquad S_v=T_v-R_v<0.
$$

The half-separation is strictly smaller than the instantaneous value $e^{-1/2}$. This example is exact and requires no trajectory integrator. The general theorem also covers histories whose active emission passes the release time before speed equality.

## Separately normalized current-law control

Keep the same prepared histories and choose the fixed matching length $L_*=2a$. Write the inverse-square coefficient as $G=K L_*=2aK$, of dimension length cubed per time squared. The canonical-law incoming control is then

$$
\dot x=-u,\qquad \dot u=\frac{G}{R^2[1-u(S)]}.
$$

It has its own evolved history and roots. At rest release its acceleration equals the logarithmic candidate's $K/(2a)$. In the inward affine variation its initial acceleration is $K(1-u_0)/(2a)$, while the logarithmic value remains $K/(2a)$. Matching at the initial delayed distance in every variant would require retuning $L_*$; that is not done here.

The complete root census holds separately for this control. The preceding endpoint argument changes only to

$$
\dot u\ge\frac{G}{R_0^2(1-u_0)},\qquad
\frac{d}{dS}\left(u+\frac12u^2\right)=\frac{G}{[T(S)-S]^2}.
$$

The emission-coordinate integral again diverges at hypothetical contact with $u\le1$. Thus this control also reaches speed one at positive separation, with $T_v\le2a/K$ under the declared matching. This is a derived comparison of first-event order, not equality of trajectories or an ordering of their event positions. Its post-threshold result is not transferred to the logarithmic candidate by changing one power.

## Endpoint ledger, scope, and falsifiers

| Event or object | Derived incoming disposition |
| --- | --- |
| Individual wake-speed equality | First limiting event; simultaneous for the mirror pair at positive separation |
| Partner roots | Exactly one per receiver throughout the complete incoming history and at the endpoint |
| Positive-delay self roots | None before or at the endpoint; excluded by the strict chord inequality |
| Partner transmitter fold | Not reached on this interval; $1-u(S)>0$ including at the endpoint |
| Emission at speed one | Occurs at $T_v$; it is not yet the emission read by the partner at $T_v$ |
| Source-history join | At most one ordinary join, classified by the affine-source formula; no singularity there |
| Contact or turning | Neither occurs on the certified incoming interval |
| Zero-delay self-root birth | Boundary to examine for any outgoing extension; the exact diagonal remains excluded and no positive-delay self row exists yet at $T_v$ |
| Passage, reflection, or repeated motion | No continuation established by this incoming theorem |

The [earlier self-birth obstruction](inverse-distance-collinear-obstructions.md) is conditional on a suitable speed-crossing continuation. The theorem here establishes its previously missing incoming event for the specified candidate and histories, but an endpoint analysis must still check the outgoing hypotheses and the complete receiver sum. No integration past this boundary is used as evidence.

A counterexample to the root census must exhibit a second partner root or a positive-delay self root satisfying the declared complete history and $u<1$. A counterexample to the first-event theorem must invalidate the emission-coordinate identity, its positive integral bound, or regular extension away from $x=0$ and $u=1$. A counterexample to the instantaneous comparison must violate the displayed chord inequality on a monotone incoming history. Altered prehistories, unequal couplings, off-axis motion, a speed multiplier, or removed self roots are different hypotheses and do not test this theorem.
