> **Retained independent reference for a withdrawn side experiment; excluded from the active scenario on 2026-10-02.** This file proves results only for the extra quadratic receiver response. It is not evidence for the [current strict logarithmic equation](../manuscript.md#strict-domain-with-unchanged-logarithmic-acceleration). The historical phrase “canonical quadratic response” below refers to a modified inverse-square comparison, not to an accepted canonical multiplier. The original derivation and assessments are preserved below; reuse of the modification requires explicit selection for the new scenario. See the [occurrence audit](quadratic-response-occurrence-audit.md).

# Independent strict-ceiling logarithmic encounter derivation

## Scope and independence

**Claim grade: derived, conditional on the explicitly modified equation below.** This reference examines the quadratic receiver-speed factor as one implementation of a strict field-speed requirement. It does not infer that factor from the inequality, adopt a physical law, or establish the behavior of every strict-speed prescription. The derivation was written independently of the new primary ceiling comparison, using the existing [logarithmic formulation](causal-logarithmic-formulation.md), [uncapped incoming theorem](causal-collinear-first-event.md), and [canonical quadratic response](../../collinear-research/analysis/strict-speed-quadratic-response.md) only to fix the comparison's law and history conventions. The present emission-coordinate identity supplies a direct independent argument for the contact-speed limit.

Set $c_f=1$. Let the equal-magnitude opposite polarities have mirror positions $X_\pm(T)=\pm x(T)$ and inward speed $u(T)=-x'(T)$. The complete prepared past is

$$
x(T)=a-u_0T,\qquad u(T)=u_0\quad(T\le0),\qquad
a,K>0,\qquad 0\le u_0<1.
$$

The past is supplied initial data, not an interacting solution. For $T>0$, multiply the full logarithmic ordinary-root acceleration by $1-u(T)^2$. No self root is deleted, no lower speed bound is imposed as a cap, and no contact or jump rule is supplied. The result below concerns the classical mirror branch while $x>0$.

**Result:** a unique regular branch exists through every positive separation attained by the incoming evolution, with $0\le u<1$ and strictly increasing speed. It approaches $x=0$ at a finite time $T_c$, and $u(T)\to1$ as $T\uparrow T_c$. Thus the factor removes the separated speed-one event but does not supply a continuous endpoint obeying strict $u<1$. It establishes neither passage nor reflection.

## Complete roots and the local equation

For any strictly sub-wake-speed retained prefix, the partner emission time $S<T$ is determined by

$$
R=T-S=x(T)+x(S),\qquad
P(S)=Q(T),\qquad P(t)=t+x(t),\qquad Q(t)=t-x(t).
$$

Because $P'=1-u>0$, $P(S)\to-\infty$ on the affine past, and $P(T)-Q(T)=2x(T)>0$, there is exactly one partner root. Every possible same-label chord instead satisfies

$$
|X_i(T)-X_i(S)|\le\int_S^T u(t)\,dt<T-S.
$$

There are therefore no positive-delay self roots on this domain, by geometry rather than suppression. The full acceleration reduces to

$$
x'=-u,\qquad u'=(1-u^2)F,\qquad
F=\frac{K}{R[1-u(S)]}>0.
$$

The receiver-speed factor modifies response only. Root playback and delay still obey

$$
S'=\frac{1+u(T)}{1-u(S)},\qquad
R'=-\frac{u(T)+u(S)}{1-u(S)}\le0.
$$

At release $S_0=-2a/(1-u_0)$, $R_0=2a/(1-u_0)$, and $u'(0^+)=(1-u_0^2)K/(2a)>0$. A short interval samples only the supplied affine past, where the equation is a smooth ordinary differential equation. Subsequently a positive lower separation bound supplies a positive delay; the inverse map $P^{-1}$ is regular when its sampled earlier speeds stay below one. Steps shorter than that delay use already constructed histories and give ordinary local existence and uniqueness. The history join has continuous position and velocity and nonzero transmitter factor, so it does not interrupt this construction.

## Strict speed at positive separation

Define $z(T)=\operatorname{artanh}u(T)$ and $z_0=\operatorname{artanh}u_0$. On the regular branch,

$$
z(T)=z_0+\int_0^T F(t)\,dt.
$$

Suppose a first finite limiting time $T_*$ has $x(T)\ge\varepsilon>0$. Monotonicity of $x$ on the complete past gives $R\ge2\varepsilon$, so $S(T)\le T_*-2\varepsilon$. The source velocities are sampled from a compact earlier interval with maximum strictly below one. Consequently $F$ is bounded near $T_*$, the displayed integral is finite, and $u$ has a limit strictly below one. The positive-delay local construction then continues the solution. Hence a finite endpoint cannot occur at positive separation, whether by speed equality, a source fold, or loss of the ordinary partner root.

This is a continuation argument starting from the regular release, not an assumption that a finite $\operatorname{artanh}$ expression automatically makes every singular endpoint harmless. It simultaneously preserves the complete root census until $x$ tends to zero.

## Finite limiting contact time

Speed is nondecreasing on the entire prepared and evolved history. Since $R\le R_0$ and $1-u(S)\le1-u_0$,

$$
F\ge\frac{K}{R_0(1-u_0)}=\frac{K}{2a}=:g_0.
$$

It follows that

$$
u(T)\ge\tanh(z_0+g_0T),\qquad
x(T)\le a-\frac1{g_0}\ln\frac{\cosh(z_0+g_0T)}{\cosh z_0}.
$$

The right side reaches zero at a finite time. Together with continuation at every positive separation, this proves that the maximal separated branch has a finite limiting contact time satisfying

$$
\boxed{
a<T_c\le
\frac{\operatorname{arcosh}\!\left(e^{g_0a}\cosh z_0\right)-z_0}{g_0},
\qquad \lim_{T\uparrow T_c}x(T)=0.
}
$$

The lower bound follows from $a=\int_0^{T_c}u(T)\,dT<T_c$. For $u_0>0$, strict acceleration also gives $T_c<a/u_0$. There is no incoming turn because $u'>0$ at every positive separation.

## Exact emission-coordinate proof of the contact-speed limit

The monotone bounded speed has a limit $L\le1$. Also $S(T)\to T_c$: otherwise a limit $S_c<T_c$ would give $P(S_c)=P(T_c)$ from the partner equation at contact, contradicting

$$
P(T_c)-P(S_c)=\int_{S_c}^{T_c}[1-u(t)]\,dt>0.
$$

The integral is positive even when $L=1$, because the speed is strictly below one at every earlier time. Therefore $R\to0$, while the increasing emission time sweeps through all times up to $T_c$.

Use $S$ as the independent coordinate and write $T=T(S)$. Combining the modified response with root playback cancels the earlier source-speed factor exactly:

$$
\frac{d u(T(S))}{dS}
=\frac{(1-u^2)K}{R[1+u]}
=\frac{K(1-u)}{T(S)-S}.
$$

Hence

$$
\boxed{
\frac{d}{dS}\ln\frac{1-u_0}{1-u(T(S))}
=\frac{K}{T(S)-S}.
}
$$

Since $T(S)<T_c$, integration gives

$$
\ln\frac{1-u_0}{1-u(T(S))}
\ge K\ln\frac{T_c-S_0}{T_c-S}
\longrightarrow+\infty.
$$

It follows that $L=1$. This proof uses the logarithmic candidate's own delay geometry and its own evolving trajectory; it does not import a speed limit from the inverse-square comparison.

The actual modified acceleration has finite accumulated magnitude,

$$
\int_0^{T_c}u'(T)\,dT=1-u_0.
$$

Its unweighted counterpart has $\int_0^{T_c}F(T)\,dT=+\infty$, as required by $\operatorname{artanh}u\to+\infty$. These statements do not determine the pointwise limit of $u'$. A continuous endpoint extension would have $u(T_c)=1$, violating the strict requirement; lowering the endpoint velocity would introduce an additional jump law. Even admitting equality would not define the zero-range, zero-delay interaction at contact.

## Exact prepared-history identities and algebraic control

While $S\le0$, put $y=x+a-u_0T$. Then

$$
R=\frac{y}{1-u_0},\qquad
y'=-(u+u_0),\qquad
u'=\frac{K(1-u^2)}{y}.
$$

Eliminating time gives the exact first-interval relation

$$
\boxed{
y(u)=2a\left(\frac{1-u^2}{1-u_0^2}\right)^{1/(2K)}
\exp\!\left[-\frac{u_0}{K}
\left(\operatorname{artanh}u-\operatorname{artanh}u_0\right)\right].
}
$$

The associated parameterization is

$$
T(u)=\int_{u_0}^{u}\frac{y(v)}{K(1-v^2)}\,dv,
\qquad x(u)=y(u)-a+u_0T(u).
$$

For rest release this reduces to

$$
1-u^2=\left(\frac{x+a}{2a}\right)^{2K}.
$$

These expressions apply only while the selected emission belongs to the affine past. The join $S=0$ occurs once at $T=x+a$, strictly before contact: $S$ increases from $S_0<0$ to $T_c>0$ and remains an ordinary root at the join. Continuing the affine-source formula after that join would change the history problem.

An exact algebraic control uses $u_0=0$, $K=1/2$, and arbitrary $a>0$, with $c_f=1$. Before the join,

$$
u(T)=\frac{T}{4a},\qquad
x(T)=a-\frac{T^2}{8a},\qquad
S(T)=T-2a+\frac{T^2}{8a}.
$$

Direct substitution gives $x'=-u$, $T-S=x+a$, and $(1-u^2)K/(x+a)=1/(4a)=u'$, with the required initial data. Thus this prescribed expression actually solves the first-interval equation. The first history join is

$$
T_j=4a(\sqrt2-1),\qquad
u_j=\sqrt2-1,\qquad
x_j=a(4\sqrt2-5)>0.
$$

This control checks the early-interval formulas algebraically. It is not a simulation, an independent numerical instrument, or a solution beyond the history join.

## Comparison and falsifiers

The [canonical quadratic response](../../collinear-research/analysis/strict-speed-quadratic-response.md) gives the same qualitative endpoint for its separately evolved stationary preparation: speed remains below one at positive separation and tends to one at finite limiting contact. The present theorem supplies that endpoint for the logarithmic candidate and its complete affine family. The radial change alone therefore does not complete a strictly sub-wake-speed passage for this quadratic response. No ordering of the two models' contact times or trajectories is established here.

At the same supplied ordinary root and the same receiver velocity, the responses are $(1-u^2)K/[R(1-u(S))]$ and $(1-u^2)G/[R^2(1-u(S))]$. If $G=KL_*$, their ratio is $R/L_*$. This is an operator comparison on common input, not a relation between evolved histories.

Checkable falsifiers are a second partner or positive-delay self root on the stated strict history; a finite positive-separation endpoint despite the earlier-source compactness bound; a regular separated solution beyond the displayed finite time bound; or a contact limit below one satisfying the exact emission-coordinate identity. A different response factor, a discontinuous velocity rule, omitted roots, or a different prepared past changes the hypotheses and is not such a falsifier. A collision value or an outgoing solution remains absent from the examined law and is not supplied by the cancellation used before contact.

## Assessment after freezing the independent derivation — 2026-10-02

The derivation above was frozen before reading the new [primary comparison](ceiling-comparison.md). Its recorded SHA-256 was `1d29c5dc1d3eea780e7e47d3f6144f107000ce8abfe830d6b1f9a9d08af1edd0`, measured with `shasum -a 256`. This section is a subsequent assessment; the frozen mathematical text is unchanged.

**Assessment, derived by comparison of the displayed arguments:** the primary strict-branch result agrees with this reference, and no primary correction is required. In particular, its positive-separation continuation argument uses a genuinely earlier compact source interval; its lower bound $F\ge K/(2a)$ holds for the full affine family; and its stated upper bound on $T_c$ is the same bound derived here. The strict lower bound $T_c>a$ remains valid even though $u\to1$ at the endpoint, since $u<1$ throughout the nonempty incoming time interval.

The primary proves $u\to1$ by assuming a subunit limit $L$ and obtaining $F\ge K(1-L)/[2(T_c-T)]$. This is valid and differs from the emission-coordinate argument frozen above. Both correctly distinguish the finite accumulated modified acceleration from the infinite integral of the raw logarithmic response. Neither claims that the pointwise acceleration has a specified limit or that a classical endpoint with strict speed exists. The early stationary formula is stopped at the source-history join, so it is not improperly used to infer a subunit contact speed.

The primary also keeps the two inequalities separate from their chosen implementations: the inclusive comparison carries an explicit zero-self convention, whereas the strict quadratic branch excludes self arrivals by geometry. It does not promote either response factor or convention into adopted theory, and does not transfer a common-input radial ratio into an ordering of evolved trajectories.

As a supplemental check of the inclusive one-sided formulas, write $\epsilon=T_c-T$, $\delta=T_v-S$, and $A_v=F(T_v)>0$. The primary's incoming expansion yields $2\epsilon=(A_v/2)\delta^2+o(\delta^2)$, and therefore $\delta\sim2\sqrt{\epsilon/A_v}$, $D_t\sim2\sqrt{A_v\epsilon}$, and $R\to x_v$. Its displayed $F\sim K/[2x_v\sqrt{A_v\epsilon}]$ and finite precontact time integral follow. That integrability does not supply the input of the separate emission family arriving at the contact instant. The logarithmic carrier $I_\eta=(K/2)\ln(x_v/\eta)$ is divergent, so a theorem requiring finite input cannot be applied there. The strict-branch acceptance does not depend on assigning any value to that inclusive event.

For the proposed continuous outgoing inclusive passage, its bound $B_+\ge K/(2t)$ follows directly from $s\ge0$, $R=t-s\le t$, and $1+p_-(s)\le2$. This is nonintegrable and therefore inconsistent with finite continuous inherited velocity when the braking term is retained. It does not select stopping, reflection, or a jump. These one-sided checks support the primary's endpoint distinctions while leaving physical law selection and any additional contact prescription outside the assessed result.
