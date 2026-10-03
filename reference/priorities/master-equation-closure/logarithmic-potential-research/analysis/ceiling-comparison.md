> **Retained side-study record; quadratic branch withdrawn from the active scenario on 2026-10-02.** The equations and assessments below preserve the earlier comparison, not the currently selected strict model. Its quadratic branch must not supply assumptions, event ordering or endpoint conclusions for the active logarithmic scenario. Use the [current strict equation](../manuscript.md#strict-domain-with-unchanged-logarithmic-acceleration) and [occurrence audit](quadratic-response-occurrence-audit.md). The separate inclusive derivation is unchanged and its discussion remains deferred.

# Strict and inclusive wake-speed ceilings for logarithmic collinear attraction

## Scope and result

A speed inequality restricts admissible paths; an acceleration prescription determines whether paths obey it. This assessment separates those two choices for the logarithmic opposite-polarity pair. All calculations use $c_f=1$. The logarithmic ordinary-root response, complete affine preparation and unchanged incoming theorem are those of the [causal formulation](causal-logarithmic-formulation.md) and [first-event proof](causal-collinear-first-event.md).

The inclusive comparison applies the existing [constrained response](../../analysis/field-speed-ceiling-definition-and-shared-results.md#13-the-velocity-constraint-and-response-order) to logarithmic partner acceleration, including that model's explicit zero-self-response clause at and below the ceiling. The strict comparison applies the previously examined [quadratic receiver-speed factor](../../collinear-research/analysis/strict-speed-quadratic-response.md) to the logarithmic causal sum. Both are additional hypotheses. Neither is adopted as a primitive law, and neither represents every possible implementation of its inequality.

| Requirement and implementation | Established incoming result | Obstruction or missing result |
| --- | --- | --- |
| Require $u<1$ but retain the unmodified logarithmic acceleration | Reaches $u=1$ at positive separation | The incoming law violates the strict requirement in finite time. |
| Require $u\le1$ without specifying a boundary response or self-family convention | Same first arrival at $u=1$ | The inequality alone supplies no dynamics; straight capped motion also creates nonordinary self families. |
| Inclusive projected response, with the explicit zero-self clause | Reaches one at positive separation, then coasts to finite-time coincidence | The partner emission family has infinite logarithmic event input; ordinary outgoing braking has an infinite integral. |
| Strict quadratic response $(1-u^2)A_{\log}$ | Stays below one at every positive separation; approaches coincidence in finite time with $u\to1$ | No continuous endpoint respects the strict inequality; contact and departure are not defined. |

These are conditional derived results. They classify the stated equations and histories, not all ceiling models or all geometries.

## Shared preparation and ordinary incoming equation

For $T\le0$, supply the complete past $X_\pm(T)=\pm(a-u_0T)$, where $a,K>0$ and $0\le u_0<1$. Future mirror motion before contact is $X_\pm=\pm x(T)$ with inward speed $u=-x'$. The single partner root and its positive transmitter factor satisfy

$$
R=T-S=x(T)+x(S),\qquad D_t=1-u(S),\qquad
\frac{dS}{dT}=\frac{1+u(T)}{1-u(S)}.
$$

On a strict-speed incoming interval, $P(S)=S+x(S)$ is increasing, so the partner root is unique. Every same-label chord is shorter than its elapsed time, excluding positive-delay self roots. The raw inward logarithmic acceleration is therefore

$$
F(T)=\frac{K}{R[1-u(S)]}>0.
$$

The unmodified law is $x'=-u$, $u'=F$. It reaches $u=1$ at some $T_v>0$ with $x_v=x(T_v)>0$, and its limiting acceleration $A_v=F(T_v)$ is finite and positive. Simply appending a strict inequality does not change this theorem. Likewise, an inclusive inequality does not specify what acceleration to use when that boundary is reached.

## Inclusive ceiling with the declared constrained response

### The self-response clause is necessary to identify this model

The inclusive implementation uses the total finite input first and then removes its positive component along the boundary velocity. In the inward scalar coordinate, while speed remains nonnegative, this reads

$$
u'=\begin{cases}F,&u<1,\\\min(F,0),&u=1.\end{cases}
$$

This formula is used only when the declared input is defined. The referenced ceiling model also sets self acceleration to zero for speeds at or below one. That clause is explicit, not a consequence of $u\le1$: a straight unit-speed segment has a whole interval of positive-delay same-label causal equalities, with $D_t=0$. If the logarithmic model retains its unrestricted self-reception rule instead, the ordinary simple-root sum gives no value for those families. A bare cap therefore does not establish the following capped segment under the original full-self rule.

Under the specified zero-self convention, the incoming path up to $T_v$ is unchanged. Its finite inward partner input is removed by the boundary response after that instant, giving

$$
u(T)=1,\qquad x(T)=x_v-(T-T_v)=T_c-T,\qquad
T_c=T_v+x_v.
$$

The pair coasts to coincidence. Its wakes and partner contributions persist; zero net acceleration at the cap does not delete them.

### The ordinary input before contact remains integrable

On $T_v<T<T_c$, the partner root still samples the pre-cap incoming history. Indeed $S+x(S)=T-x(T)=2T-T_c<T_c=P(T_v)$, so $S<T_v$. Let $\epsilon=T_c-T$ and $\delta=T_v-S$. The endpoint expansion $u(T_v-h)=1-A_vh+o(h)$ gives

$$
2\epsilon=P(T_v)-P(S)
=\int_S^{T_v}[1-u(v)]\,dv
=\frac{A_v}{2}\delta^2+o(\delta^2).
$$

Consequently

$$
\delta\sim2\sqrt{\frac\epsilon{A_v}},\qquad
D_t\sim2\sqrt{A_v\epsilon},\qquad R\to x_v,
\qquad
F(T)\sim\frac{K}{2x_v\sqrt{A_v(T_c-T)}}.
$$

This divergence has finite time integral before contact. The projected inward acceleration is zero throughout the cap segment. Neither fact supplies the input at contact itself.

### A whole partner emission interval arrives at coincidence

At $T=T_c$, every partner emission $S\in[T_v,T_c)$ reaches the common position. Its range is $T_c-S>0$, while its transmitter factor is zero. This is an emission interval, not a collection of ordinary simple roots.

The emission-time representation of the logarithmic response diagnoses the missing event input without assigning a value to $1/|D_t|$ at zero. For a continuous-velocity passage retaining the incoming velocity, each fixed emission in this interval has reception derivative magnitude $D_r=2$ at coincidence. Thus the positive inward event carrier on the truncated emission interval $[T_v,T_c-\eta]$ is

$$
I_\eta=\frac K2\int_{T_v}^{T_c-\eta}\frac{dS}{T_c-S}
=\frac K2\ln\left(\frac{x_v}{\eta}\right)
\longrightarrow+\infty\qquad(\eta\downarrow0).
$$

The cutoff $\eta$ is an analytical device, not a minimum physical delay. All retained terms have the same inward sign. The logarithmic response weakens the canonical inverse-square carrier's divergence by one distance power, but the complete event input still is not finite. The finite-input projection theorem cannot be applied to an undefined or infinite event input. Assigning a balancing singular constraint reaction or a chosen velocity jump would require a separately specified event law.

### Omitting the contact instant does not repair continuous passage

Even granting a continuous-velocity passage provisionally, the ordinary equation immediately afterwards gives a second obstruction. The tested local integral class has velocity continuous through contact, velocity absolutely continuous on every compact subinterval strictly after contact, and the full modified equation holding almost everywhere on that outgoing interval. Thus velocity changes on each such compact interval equal integrated acceleration; integrability across contact is not assumed. Shift contact to $t=0$ and write the crossed positions as $X_+(t)=-a_+(t)$ and $X_-(t)=a_-(t)$. A continuous continuation inherits $a_\pm(0)=0$ and $p_\pm(t)=a_\pm'(t)\to1$. On a short outgoing interval, $0<p_\pm\le1$.

For the positive label's receiver, the unique partner emission satisfies

$$
s+a_-(s)=t-a_+(t)\ge0.
$$

The left side is strictly increasing after contact. To exclude every older partner emission, write its time as $S=T_c-h<T_c$. The complete incoming speed bound gives $0<x(S)\le h$, and the outgoing bound gives $0<a_+(t)\le t$. Therefore the source-to-receiver distance satisfies $|x(S)-a_+(t)|<h+t$, strictly less than the elapsed time, regardless of chord orientation. No old root exists. Hence the displayed equation supplies the unique root, with $0\le s<t$, and continuity gives $s=o(t)$. The range and transmitter factor obey $R=t-s\sim t$ and $D_t=1+p_-(s)\to2$. The partner acceleration opposes separation, with

$$
B_+(t)=\frac{K}{(t-s)[1+p_-(s)]}
\sim\frac K{2t}.
$$

More directly, $s\ge0$ and $p_-\le1$ give $B_+\ge K/(2t)$. The other receiver has the same lower bound. The ceiling retains this braking because it reduces speed. The velocity equation would require an infinite decrease between birth and every later time, contradicting the inherited finite continuous velocity in the local integral class.

The exact ballistic trial has $a_\pm=t$, fixed emission $s=0$, $D_t=2$, $D_r=0$ and braking $K/(2t)$. A zero playback derivative does not make this simple emission root inactive. Deleting it would add the frozen-contact suppression rule that the present model does not include. Instantaneous rebound or stopping instead needs a velocity jump whose event law has not been supplied. No physical halt, rebound or annihilation is selected by these obstructions.

## Strict ceiling implemented by a quadratic receiver response

### Equation and strict-speed preservation

Use the explicit additional response

$$
\dot{\mathbf V}_i=(1-\|\mathbf V_i\|^2)\mathbf A_i^{\log},
\qquad \|\mathbf V_i\|<1,
$$

where $\mathbf A_i^{\log}$ is the complete ordinary logarithmic causal sum on the evolving history. This multiplier is an examined hypothesis, not an imported relativistic law. It differs from projecting a finite acceleration at the boundary of the inclusive domain. No lower fixed cap, self deletion or contact update is introduced.

The incoming reduction is

$$
x'=-u,\qquad u'=(1-u^2)F(T),\qquad
z(T):=\operatorname{artanh}u(T)
=z_0+\int_0^T F(t)\,dt,\qquad z_0=\operatorname{artanh}u_0.
$$

The inverse hyperbolic tangent is $\operatorname{artanh}u=\tfrac12\ln[(1+u)/(1-u)]$; it diverges as $u\uparrow1$. At any finite positive-separation endpoint $x\ge\varepsilon>0$, the root has $R\ge2\varepsilon$ and $S\le T-2\varepsilon$. Its source speed therefore belongs to an earlier compact strict-speed history with a positive margin below one. Both factors in $F$ are bounded away from zero. Thus the integral remains finite, $u<1$, and ordinary local history continuation remains available. There is no positive-delay self root anywhere on this incoming path.

### Finite-time contact

Inward speed increases, and differentiation of the causal relation gives

$$
R'=-\frac{u(T)+u(S)}{1-u(S)}\le0.
$$

Initially $R_0=2a/(1-u_0)$, and all source speeds are at least $u_0$. Hence $R[1-u(S)]\le2a$, so $F\ge f_0:=K/(2a)$. It follows that

$$
u(T)\ge\tanh(z_0+f_0T),\qquad
x(T)\le a-\frac1{f_0}\ln\left[\frac{\cosh(z_0+f_0T)}{\cosh z_0}\right].
$$

The right side reaches zero at a finite time. Since positive separation cannot be a terminal obstruction, the incoming solution approaches coincidence at some finite $T_c$, satisfying

$$
a<T_c\le\frac{\operatorname{arcosh}(e^{f_0a}\cosh z_0)-z_0}{f_0}.
$$

The lower bound uses $a=\int_0^{T_c}u(T)\,dT$ and $u<1$. No earlier braking or reversal occurs, because $u'>0$ on the separated branch.

### The limiting speed is one

Let $L=\lim_{T\uparrow T_c}u(T)\le1$, which exists by monotonicity. If $L<1$, every earlier speed is at most $L$, and the chord relation gives

$$
2x=R-\int_S^T u(v)\,dv\ge(1-L)R,
\qquad
F\ge\frac K R\ge\frac{K(1-L)}{2x}.
$$

Since $x(T)=\int_T^{T_c}u(v)\,dv\le T_c-T$, this lower bound makes $\int F\,dT$ diverge at least logarithmically. The exact $z$ identity would then force $u\to1$, contradicting $L<1$. Therefore

$$
x\to0,\qquad u\to1,\qquad
\int_0^{T_c}u'(T)\,dT=1-u_0.
$$

The actual modified acceleration has finite incoming integral even though the raw response has an infinite integral. A continuous velocity extension at this finite contact time would equal one, violating the strict domain. Moreover, the zero factor does not assign a value to an undefined contact input. The model supplies no passage, bounce or return.

For a stationary preparation, the early segment whose partner emission still satisfies $S\le0$ has the exact control

$$
1-u^2=\left(\frac{x+a}{2a}\right)^{2K}.
$$

Differentiation recovers $u'=(1-u^2)K/(x+a)$ and the initial value $u=0$. This formula must stop when the source emission enters the released history; extending it to contact would incorrectly predict a subunit endpoint speed. The full delayed argument above samples the evolving source history.

## Comparison and evidence boundaries

The inclusive model reaches the velocity boundary at a positive gap and then reaches a nonordinary partner event. Its explicit self convention is essential during the straight capped segment. The strict quadratic model avoids both that straight unit-speed interval and all incoming self reception, but reaches the forbidden speed in its finite coincidence limit. Logarithmic radial weakening therefore does not complete either tested encounter.

This conclusion is not a theorem about every response enforcing either inequality. A different strict multiplier, a different distance law, a derived collective response or a new contact prescription changes the problem and requires its own analysis. A global conserved account, numerical trajectory, general nonsymmetric incoming theorem and transverse continuation are not asserted.

The two companion references independently derive the [strict comparison](strict-ceiling-independent-check.md) and the [inclusive comparison](inclusive-ceiling-independent-check.md). The source equations and proofs supply the analytical evidence; document checks supply only syntax and organization evidence. Concrete falsifiers are a positive-separation speed-one event under the strict quadratic equation, a solution remaining separated past the displayed time bound, a subunit contact limit satisfying its full delayed equation, a finite inclusive family carrier retaining the displayed positive weights, or a continuous outgoing passage satisfying the complete logarithmic partner input with finite integrated braking. Merely imposing a different event value or removing a causal contribution is a changed premise, not such a counterexample.
