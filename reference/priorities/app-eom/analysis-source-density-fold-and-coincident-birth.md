# Source-Density Fold and Coincident-Birth Analysis

## Status

- Purpose: promotion analysis for singular causal events under the proposed source-density Master Equation
- Scope: ordinary interior transmitter-side folds and coincident same-source root birth
- Standing: priority analysis; not canon and not an EOM solver specification
- Result: ordinary folds have a finite sharp impulse; coincident same-source birth does not

## Finding in plain language

An ordinary fold and a coincident same-source birth must not share one treatment.

At an ordinary fold, two causal roots merge while their separation from the receiver remains nonzero. The pointwise acceleration becomes infinite like $1/\sqrt{|T_r-T_0|}$, but that singularity has a finite time integral. The finite-width equation therefore has a regulator-independent sharp impulse across the fold.

At coincident same-source birth, the root singularity and the inverse-square spatial singularity occur together. The proposed source-density equation then has a nonintegrable sharp acceleration. Fixed positive wake width and core scale make the event finite, but the complete post-crossing endpoint layer diverges as the core scale is removed. Isolating only the newborn noncoincident root also gives a divergent, refinement-path-dependent sharp limit. This is a no-go result for the sharp equation with generic smooth same-source field-speed crossing.

Claim classification: **derived on the local histories and nondegeneracy assumptions stated below**. The self-consistent outcome after the sharp-law failure remains unresolved.

## 1. Finite-width starting equation

For one transmitter-receiver pair, suppress the labels and write

$$
\mathbf H_{\epsilon_c}(T_r,T_t)
=
\kappa\,\sigma|q_tq_r|
\mathbf K_{\epsilon_c}(\mathbf r_t(T_r,T_t)).
$$

The finite-width acceleration is

$$
\mathbf A^{(\eta,\epsilon_c)}(T_r)
=
\int
c_f\mathbf H_{\epsilon_c}(T_r,T_t)
\delta_\eta(g(T_r,T_t))
\,dT_t.
$$

This equation is evaluated before any division by $D_t=\partial g/\partial T_t$. It therefore remains a well-defined finite-regulator expression when $D_t=0$.

## 2. Ordinary interior fold

Let $(T_0,S_0)$ be an interior causal event satisfying

$$
g(T_0,S_0)=0,
\qquad
\partial_Sg(T_0,S_0)=0.
$$

Assume the fold is nondegenerate:

$$
a\equiv\partial_Tg(T_0,S_0)\ne0,
\qquad
b\equiv\partial_S^2g(T_0,S_0)\ne0,
$$

and assume $r\ge r_{\min}>0$ on a neighborhood of the event. Since

$$
\partial_Tg=-D_r,
$$

the condition $a\ne0$ excludes a simultaneous receiver turning point. Such a simultaneous degeneracy requires a higher-order analysis.

### 2.1 Finite impulse theorem

Let $Q$ be a sufficiently small reception-time by emission-time rectangle around $(T_0,S_0)$ and define its acceleration impulse

$$
\mathbf I_Q^{(\eta,\epsilon_c)}
=
\iint_Q
c_f\mathbf H_{\epsilon_c}(T,S)
\delta_\eta(g(T,S))
\,dS\,dT.
$$

Because $\partial_Tg$ remains nonzero on a small enough $Q$, use $(g,S)$ as local coordinates. The zero set is a smooth curve $T=T_*(S)$ through the fold, even though it is not a smooth graph $S=S_*(T)$ there. The causal-width limit is

$$
\boxed{
\lim_{\eta\to0^+}
\mathbf I_Q^{(\eta,\epsilon_c)}
=
\int_{{S:(T_*(S),S)\in Q\}}
c_f
\frac{
\mathbf H_{\epsilon_c}(T_*(S),S)
}{
|\partial_Tg(T_*(S),S)|
}
\,dS
}.
$$

Every factor on the right is bounded on the compact fold segment. The distance floor also makes the core limit uniform, so

$$
\lim_{(\eta,\epsilon_c)\to(0,0)}
\mathbf I_Q^{(\eta,\epsilon_c)}
$$

exists, is finite, and is independent of regulator-refinement path.

Plain language: the pointwise formula fails because it tries to use emission time as a coordinate exactly where that coordinate folds over. Integrating over reception time first uses a coordinate that remains regular and gives a finite velocity change.

Claim classification: **derived**. A nondegenerate distance-bounded fold whose finite-width impulse has no common limit would falsify the theorem.

### 2.2 Local normal form

Put

$$
\tau=T-T_0,
\qquad
x=S-S_0.
$$

To leading order,

$$
g(T,S)
=
a\tau+\frac12bx^2
+O(\tau^2+|\tau x|+|x|^3).
$$

On the side where $-2a\tau/b>0$, the two roots are

$$
x_\pm(\tau)
=
\pm\sqrt{-\frac{2a\tau}{b}}
+O(|\tau|).
$$

Their combined sharp acceleration has the leading form

$$
\boxed{
\mathbf A^{\sharp}_{\mathrm{fold}}(T_0+\tau)
=
\frac{\sqrt{2}\,c_f}{\sqrt{|ab|}}
\frac{\mathbf H_0}{\sqrt{|\tau|}}
+O(1)
},
$$

where

$$
\mathbf H_0
=
\kappa\,\sigma|q_tq_r|
\frac{\hat{\mathbf r}_0}{r_0^2}.
$$

Consequently, over an active-side interval of length $L$ inside the fold chart,

$$
\int_0^L
\mathbf A^{\sharp}_{\mathrm{fold}}(T_0+\tau)
\,d\tau
=
\frac{2\sqrt{2}\,c_f\sqrt{L}}{\sqrt{|ab|}}
\mathbf H_0
+O(L).
$$

The acceleration is infinite at the fold instant but locally integrable. Its position-update moment, obtained by multiplying by a bounded reception-time weight, is finite as well.

## 3. Coincident same-source birth

Let one smooth same-source history cross field speed at $T_0$. Put

$$
t=T_r-T_0,
\qquad
\tau=T_r-T_t>0,
$$

and assume the along-track speed satisfies

$$
u(T_0)=c_f,
\qquad
\alpha=\dot u(T_0)>0.
$$

With $\hat{\mathbf e}=\mathbf V(T_0)/c_f$, the local retained-history geometry is

$$
\mathbf r(t,\tau)
=
\hat{\mathbf e}
\left(c_f\tau+\alpha t\tau-\frac12\alpha\tau^2\right)
+O(t^2\tau+t\tau^2+\tau^3),
$$

and

$$
g(t,\tau)
=
\alpha\tau\left(t-\frac{\tau}{2}\right)
+O(t^2\tau+t\tau^2+\tau^3).
$$

Besides the excluded endpoint $\tau=0$, the newborn root is

$$
\tau_*(t)=2t+O(t^2),
\qquad
t>0.
$$

At this root,

$$
r_*(t)=2c_ft+O(t^2),
\qquad
D_t(t,\tau_*(t))=\alpha t+O(t^2).
$$

The root therefore approaches both the $D_t=0$ surface and coordinate coincidence.

### 3.1 Sharp no-go result

Collapsing the newborn root after keeping a positive core scale gives

$$
\mathbf A_{\mathrm{new}}^{(0,\epsilon_c)}(t)
=
\hat{\mathbf e}
K_i
\frac{2c_f^2}
{\alpha(4c_f^2t^2+\epsilon_c^2)^{3/2}}
+\text{lower-order terms},
$$

where $K_i=\kappa|q_i|^2$. Removing the core at fixed $t>0$ gives

$$
\boxed{
\mathbf A_{\mathrm{new}}^{\sharp}(t)
=
\hat{\mathbf e}
\frac{K_i}{4\alpha c_f}
t^{-3}
+O(t^{-2})
}.
$$

The time integral of $t^{-3}$ diverges at $t=0$. Thus the ordinary-fold impulse theorem cannot apply: its distance-floor assumption fails precisely where the root is born.

Every leading factor has the forward along-track sign. On a sufficiently small no-reversal neighborhood, the excluded-endpoint neighborhood has the same sign. Bounded contributions from other nonsingular roots cannot cancel this divergence. A cancellation would require a separately derived contribution with the same singular order and opposite sign.

Claim classification: **derived local no-go result**. A finite sharp impulse from the same local equation, without an additional singular cancellation, would falsify it.

### 3.2 Newborn-root part of the finite-width treatment

For $t>0$, the endpoint root at $\tau=0$ and the newborn root near $\tau=2t$ have a stationary point between them at $\tau=t$. To measure the newborn root without assigning the excluded endpoint to it, define the newborn part by $\tau\ge t$. The complementary interval $0<\tau<t$ contains the endpoint layer. This split changes an order-one coefficient while the two finite-width lobes overlap, so it is a diagnostic partition rather than a new physical rule.

For fixed $\eta>0$ and $\epsilon_c>0$, the newborn contribution is

$$
\mathbf A_{\mathrm{new}}^{(\eta,\epsilon_c)}(t)
=
\hat{\mathbf e}K_ic_f
\int_t^h
\frac{c_f\tau}
{(c_f^2\tau^2+\epsilon_c^2)^{3/2}}
\delta_\eta\!\left(
\alpha\tau\left(t-\frac{\tau}{2}\right)
\right)
\,d\tau
+\text{lower-order terms}.
$$

This expression and its finite-window impulse are finite at fixed positive widths. Define the two event scales

$$
\ell_\eta=\sqrt{\frac{\eta}{\alpha}},
\qquad
\ell_c=\frac{\epsilon_c}{c_f},
\qquad
\rho=\frac{\ell_c}{\ell_\eta}.
$$

For a Gaussian wake profile, the newborn-cell impulse has leading form

$$
\boxed{
J_{\eta,\epsilon_c}^{(0)}
\sim
\frac{K_i}{c_f\eta}
\mathcal C_\varphi^{(0)}(\rho)
},
$$

where

$$
\mathcal C_\varphi^{(0)}(\rho)
=
\int_0^\infty
\int_z^\infty
\frac{
y\,\varphi\!\left(y(z-y/2)\right)
}{(y^2+\rho^2)^{3/2}}
\,dy\,dz.
$$

For every fixed $\rho>0$, this coefficient is positive and finite. In the two separated-scale limits,

$$
\mathcal C_\varphi^{(0)}(\rho)
\sim
\frac{1}{\rho^2}
\qquad
(\rho\to\infty),
$$

and

$$
\mathcal C_\varphi^{(0)}(\rho)
=
\varphi(0)\log\frac{1}{\rho}+O(1)
\qquad
(\rho\to0^+).
$$

Therefore the core-dominated impulse behaves as

$$
J_{\eta,\epsilon_c}^{(0)}
\sim
\frac{K_ic_f}{\alpha\epsilon_c^2},
$$

while the width-dominated impulse behaves as

$$
J_{\eta,\epsilon_c}^{(0)}
\sim
\frac{K_i}{c_f\eta}
\left[
\varphi(0)
\log\!\left(
\frac{c_f}{\epsilon_c}
\sqrt{\frac{\eta}{\alpha}}
\right)
+O(1)
\right].
$$

Matched refinement at fixed positive $\rho$ diverges as $\eta^{-1}$. The joint sharp limit is therefore divergent and refinement-path dependent. Positive wake width alone is not sufficient because removing the core leaves logarithmic core sensitivity.

Because every leading factor in both the newborn part and the complementary endpoint layer has the same forward sign, the endpoint layer cannot cancel this result. The unpartitioned calculation below makes the stronger complete-cell statement.

### 3.3 Unpartitioned post-crossing treatment

Do not split the two finite-width lobes. Integrate the same leading local equation over $0<t<L$ and $0<\tau<h$, where $L$ and $h$ remain inside the local history chart. In the small-width limit, the rescaled bounds tend to infinity and the velocity impulse has the form

$$
\boxed{
J_{\eta,\epsilon_c}^{\mathrm{full}}
\sim
\frac{K_i}{c_f\eta}
\mathcal C_{\varphi}^{\mathrm{full}}(\rho)
},
$$

where

$$
\mathcal C_{\varphi}^{\mathrm{full}}(\rho)
=
\int_0^\infty\int_0^\infty
\frac{
y\,\varphi\!\left(y(z-y/2)\right)
}{(y^2+\rho^2)^{3/2}}
\,dy\,dz.
$$

Integrating over $z$ first gives the one-dimensional positive expression

$$
\mathcal C_{\varphi}^{\mathrm{full}}(\rho)
=
\int_0^\infty
\frac{F_\varphi(y)}{(y^2+\rho^2)^{3/2}}
\,dy,
$$

with

$$
F_\varphi(y)
=
\int_{-y^2/2}^{\infty}\varphi(u)\,du.
$$

For the symmetric Gaussian profile, $F_\varphi(0)=1/2$ and $F_\varphi(y)\to1$ as $y\to\infty$. Dominated rescaling then gives

$$
\mathcal C_{\varphi}^{\mathrm{full}}(\rho)
\sim
\frac{1}{2\rho^2}
\qquad
(\rho\to0^+),
$$

and

$$
\mathcal C_{\varphi}^{\mathrm{full}}(\rho)
\sim
\frac{1}{\rho^2}
\qquad
(\rho\to\infty).
$$

In fact, $1/2\le F_\varphi(y)\le1$ for every $y\ge0$, while

$$
\int_0^\infty
\frac{dy}{(y^2+\rho^2)^{3/2}}
=
\frac{1}{\rho^2}.
$$

Therefore the complete coefficient obeys the explicit bounds

$$
\frac{1}{2\rho^2}
\le
\mathcal C_{\varphi}^{\mathrm{full}}(\rho)
\le
\frac{1}{\rho^2}.
$$

Since $\rho^2=\alpha\epsilon_c^2/(c_f^2\eta)$, every matched refinement with fixed $0<\rho<\infty$ has the physical scale

$$
\boxed{
J_{\eta,\epsilon_c}^{\mathrm{full}}
=
\Theta\!\left(
\frac{K_ic_f}{\alpha\epsilon_c^2}
\right)
}.
$$

The displayed coefficient uses the limit in which the fixed physical reception-time and delay bounds become infinite after rescaling by $\ell_\eta$. That limit is not uniform on extreme paths where $\epsilon_c$ vanishes so much faster than $\eta$ that the finite reception-time boundary is reached before the complete core layer is sampled. On those paths the power of the divergence changes, but the divergence does not disappear. Section 3.5 gives a finite-window lower bound that covers every joint path.

Thus the complete post-crossing cell is finite for fixed positive $\eta$ and $\epsilon_c$, but it has no finite joint sharp limit. The causal width resolves the root merger; it does not regularize the inverse-square same-source diagonal by itself. The newborn-only logarithm in the width-dominated regime is not the complete-cell answer because the endpoint layer supplies the stronger finite-window divergence.

Claim classification: **derived within the local frozen-history, dual-width equation on the stated matched-refinement limit**. A bounded complete-cell impulse on any joint path is excluded separately by the finite-window lower bound in Section 3.5.

### 3.4 Consequence for self-consistent evolution

The calculation assumes a smooth crossing with finite $\alpha>0$. The resulting nonintegrable acceleration is incompatible with that assumed continuation under the sharp equation. This proves that a generic smooth crossing is not an admissible sharp-law solution of the base same-source equation.

It does not prove what replaces the crossing. A self-consistent positive-width history could turn, accelerate away, or enter another retained-history regime. Determining that outcome requires solving the same finite-width delayed equation, not replaying a prescribed crossing history.

Claim classification: **derived incompatibility of the assumed smooth crossing; unresolved self-consistent outcome**. A self-consistent sharp solution with finite velocity through the stated crossing geometry would overturn the incompatibility result.

### 3.5 Acceptance audit against the current primitives

The complete endpoint-layer divergence can be bounded on a fixed physical transition window without choosing a regulator-refinement path. In the leading local normal form, integrate reception time over $0<t<L$ first. The complete impulse is

$$
J_{\eta,\epsilon_c}^{\mathrm{full}}(L,h)
=
\frac{K_ic_f^2}{\alpha}
\int_0^h
\frac{
\Phi\!\left(\alpha\tau(L-\tau/2)/\eta\right)
-
\Phi\!\left(-\alpha\tau^2/(2\eta)\right)
}
{(c_f^2\tau^2+\epsilon_c^2)^{3/2}}
\,d\tau,
$$

where $\Phi$ is the cumulative function of an even, nonnegative wake profile that is positive on a neighborhood of zero, including the Gaussian profile used above. Choose $\epsilon_c$ small enough that $2\epsilon_c/c_f<\min(L,h)$. On the core interval

$$
\frac{\epsilon_c}{c_f}
\le\tau\le
\frac{2\epsilon_c}{c_f},
$$

the denominator is bounded by a fixed multiple of $\epsilon_c^3$. The cumulative-function difference spans zero and is bounded below by a profile-dependent positive constant times

$$
\min\!\left(
1,
\frac{\alpha\epsilon_c L}{c_f\eta}
\right).
$$

Therefore there is a constant $C_\varphi>0$, independent of $\eta$ and $\epsilon_c$, such that

$$
\boxed{
J_{\eta,\epsilon_c}^{\mathrm{full}}(L,h)
\ge
C_\varphi K_i
\min\!\left(
\frac{c_f}{\alpha\epsilon_c^2},
\frac{L}{\eta\epsilon_c}
\right)
}.
$$

Both quantities inside the minimum diverge on every path with $(\eta,\epsilon_c)\to(0,0)$. The complete finite-window impulse therefore has no finite joint regulator limit. On matched paths the first term gives the $\epsilon_c^{-2}$ result of Section 3.3. On extreme paths where the finite reception window cuts off that matched scaling, the second term still diverges.

This independent finite-window bound makes the acceptance problem direct: changing the relative refinement rate of the wake thickness and core scale cannot produce a finite transition.

The present ontology defines an architrino as a point transceiver. The positive core scale $\epsilon_c$ is presently a mathematical control on the near-origin kernel, not a physical architrino radius or an accepted wake-saturation length. The current regularization rule therefore requires a finite, common observable as both regulators are removed. The displayed lower bound proves that this requirement fails.

A fixed positive $\epsilon_c$ would make the transition finite, but accepting it as physical would require a new derived near-origin wake law and a fixed value from existing primitives. Dimensional availability of a candidate length would not be sufficient: it would not determine the kernel shape, its dimensionless coefficient, or why the point-transceiver law saturates in precisely that form. The current primitives also supply no positive minimum self-hit delay and no rule that permanently excludes a root born from the coincident endpoint.

Claim classification: **derived no-go result for acceptance under the current point-transceiver and removable-core rules**. It does not prove that every possible extension fails. It is falsified by an Architrino-native derivation that fixes a positive near-origin scale and kernel, or by a different same-source rule whose complete transition has a finite regulator-independent impulse.

## 4. Promotion consequences

| Event | Sharp source-density status | Promotion consequence |
| --- | --- | --- |
| Interior simple root | finite pointwise acceleration | mathematical reduction passes |
| Ordinary interior fold with $r>0$ and $D_r\ne0$ | pointwise divergence but finite impulse | use the fold impulse, not point sampling |
| Receiver turning point with $D_t\ne0$ | no acceleration singularity | preserve root transport through the turning point |
| Coincident same-source birth | nonintegrable impulse | sharp equation fails without another rule |
| Retained-history boundary crossing | boundary event, not an interior fold | require complete history or fail closed |

The coincident event has only three currently visible resolution classes:

1. retain positive physical wake width and positive core scale, with both values independently constrained;
2. derive a different near-diagonal same-source rule or exclusion from architrino-native principles;
3. derive a causal past-history contribution that cancels the complete transition at the same singular order.

Selecting among those classes changes the dynamics and is not justified by the current primitives. The acceptance audit above closes the present route negatively: fixed mathematical regulators do not become a finite accepted transition merely by being kept nonzero. Until a near-origin rule is derived, the proposed sharp Master Equation cannot be promoted as a globally complete same-source law.

Promotion classification: **ordinary fold promote now within the priority proposal; coincident birth defer with a fundamental blocker**.
