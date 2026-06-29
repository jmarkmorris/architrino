# Spiral A1 Nonconstant Time-Law Chart

Status. Priority proof packet for the A1 variable-angular-rate continuation.
This packet consumes [spiral-a1-variable-rate-turn-target](spiral-a1-variable-rate-turn-target.md)
and derives the finite-memory root equations that replace the constant-$\Omega$
chart. It is a theory advancement under the existing `spiral_branch_chart_test`,
not a new gate. The retained-root turn-center follow-on is recorded in
[spiral-a1-retained-memory-profile](spiral-a1-retained-memory-profile.md).

Claim level. The local A1 angular-deceleration target is not enough to define a
branch chart. A nonconstant time law changes the delayed-root equation through
an integral over the whole branch memory interval. Retaining or replacing A1
therefore requires a finite-memory time-law calculation, not a perturbative
substitution of the turn-center value of $\ddot\theta/\dot\theta^2$.

## Nonconstant Root Equation

Let the same A1 radial curve be parameterized by angle,
$$
r(\theta)=r_\ast\exp(a(1-\cos\theta)),
\qquad
a=a_{\mathrm{A1}}=0.204,
$$
but allow a monotone angular time law $\theta(t)$ near the turn. At receiver
angle $\theta$, define the dimensionless inverse-rate memory integral
$$
H(\theta,\Delta)
\equiv
\dot\theta(\theta)
\int_{\theta-\Delta}^{\theta}
\frac{d\phi}{\dot\theta(\phi)}.
$$
The constant-$\Omega$ chart is the special case $H(\theta,\Delta)=\Delta$.
With
$$
b(\theta)=\frac{\dot\theta(\theta)r(\theta)}{c_f},
$$
the nonconstant-time-law root equations are
$$
F_{P}^{\mathrm{nc}}(\theta,\Delta)
=
\Lambda_P(\theta,\Delta)-\frac{H(\theta,\Delta)}{b(\theta)}=0,
$$
and
$$
F_{S}^{\mathrm{nc}}(\theta,\Delta)
=
\Lambda_S(\theta,\Delta)-\frac{H(\theta,\Delta)}{b(\theta)}=0.
$$
At $\theta=0$ this becomes
$$
H(\Delta)
\equiv
\omega_\ast
\int_{-\Delta}^{0}
\frac{d\phi}{\dot\theta(\phi)},
\qquad
b_\ast=\frac{\omega_\ast r_\ast}{c_f},
$$
so the retained turn-center equation is
$$
\Lambda_{P/S}(0,\Delta)=\frac{H(\Delta)}{b_\ast}.
$$

## Source Jacobian

Let
$$
u_0(\Delta)
\equiv
\frac{\dot\theta(-\Delta)}{\omega_\ast},
\qquad
p_0=p(-\Delta),
\qquad
\rho=\frac{r(-\Delta)}{r_\ast}.
$$
Then the source-speed factor in the Jacobian is no longer $b_\ast$ but
$b_\ast u_0$. The partner and self Jacobians become
$$
J_P
=
1+
b_\ast u_0\frac{\rho}{\Lambda_P}
\left[
\sin\Delta-p_0(\cos\Delta+\rho)
\right],
$$
and
$$
J_S
=
1-
b_\ast u_0\frac{\rho}{\Lambda_S}
\left[
\sin\Delta+p_0(\rho-\cos\Delta)
\right].
$$
Because $H'(\Delta)=1/u_0(\Delta)$, direct differentiation gives the same
simple-root identity in the new variables:
$$
J_{P/S}
=
-b_\ast u_0\,\partial_\Delta F_{P/S}^{\mathrm{nc}}
$$
on an active root. Thus the old root-transport proof does not transfer by
name, but its mechanism does: a nonconstant chart remains transportable when
the new roots have positive Jacobian floors.

## Local Slope Invariant

The turn-center condition from the A1 no-go is
$$
k_\ast
\equiv
\left.
\frac{d}{d\theta}\log\dot\theta
\right|_{\theta=0}
=
\frac{\ddot\theta(0)}{\dot\theta(0)^2}
=
\frac{T_0(C_{\mathrm{A1}})}{\Gamma_\ast}.
$$
Using the accepted A1 intervals,
$$
k_\ast
\in
[-1.0072833846320208,\ -1.007249363114164].
$$
This is invariant under constant rescaling of absolute time. It is also only a
local slope. The delayed roots depend on the memory integral $H(\Delta)$.

If $h(\phi)=\omega_\ast/\dot\theta(\phi)$, then retaining any old constant-rate
A1 root $\Delta_\alpha$ at the same offset would require
$$
H(\Delta_\alpha)=\Delta_\alpha,
$$
or equivalently
$$
\int_{-\Delta_\alpha}^{0}(h(\phi)-1)\,d\phi=0.
$$
Thus a retained-root variable-rate continuation has to satisfy zero-mean
inverse-rate constraints over the branch memory intervals. Since
$$
h(0)=1,
\qquad
h'(0)=-k_\ast\approx 1,
$$
the local target pushes $h(\phi)<1$ just to the past of the turn. Any same-root
continuation must compensate farther back in the memory interval. This is the
native finite-memory obstruction exposed by the A1 no-go.

## Representative One-Parameter Continuations

The following probes are diagnostics, not theorem-grade branch certificates.
They fix the local slope $k_\ast=-1.0072663738$ and extend it across the memory
window by one simple rule.

| Time-law representative | Root count on $[1/2,4\pi]$ | Branch sum $B_r$ | Tangential sum $T_0$ | Radial implication |
| --- | ---: | ---: | ---: | --- |
| First-order inverse-rate memory, $H_1(\Delta)=\Delta+\frac12 k_\ast\Delta^2$ | $0+0$ | undefined | undefined | No active roots; all constant-rate A1 windows have $H_1<0$. |
| Linear angular rate, $\dot\theta(\theta)=\omega_\ast(1+k_\ast\theta)$ | $2+3$ | $+0.16043490391513504$ | $-0.06262796291257705$ | Requires negative $\Gamma$ through the radial row. |
| Log-rate law, $\dot\theta(\theta)=\omega_\ast e^{k_\ast\theta}$ | $0+3$ | $+0.0014882771586324736$ | $-0.003657123786202083$ | Requires negative $\Gamma$ through the radial row. |
| Constant absolute angular acceleration at the turn | $2+3$ | $+0.10270207422077164$ | $-0.06608310776190418$ | Requires negative $\Gamma$ through the radial row. |

For the radial row
$$
B_r=(a_{\mathrm{A1}}-1)\Gamma,
$$
and $a_{\mathrm{A1}}-1<0$, a positive $\Gamma$ requires $B_r<0$. The three
exact one-parameter representatives above all give $B_r>0$ after recomputing
the delayed roots, so they cannot be isolated positive-$\Gamma$ A1
continuations.

## Advancement

The A1 continuation problem has moved from a local turn-center target to a
finite-memory time-law problem. A viable nonconstant A1 history must satisfy
both:
$$
\left.
\frac{d}{d\theta}\log\dot\theta
\right|_{\theta=0}
\in
[-1.0072833846320208,\ -1.007249363114164],
$$
and the branch-memory root equations
$$
\Lambda_{P/S}(0,\Delta)=\frac{1}{b_\ast}
\omega_\ast
\int_{-\Delta}^{0}
\frac{d\phi}{\dot\theta(\phi)}.
$$
The simple monotone one-parameter continuations fail as topology diagnostics
because they either lose the constant-rate roots or move to a branch ledger
with the wrong radial sign before receiver-normal force rows are recomputed. A more
flexible retained-memory polynomial profile does satisfy the turn-center
moment, endpoint, radial, and tangential equations; see
[spiral-a1-retained-memory-profile](spiral-a1-retained-memory-profile.md).
[spiral-a1-retained-memory-transport-lemma](spiral-a1-retained-memory-transport-lemma.md)
then proves that the retained endpoint constraints cancel the first off-center
memory derivative at the turn center. The next mathematical search is
therefore not a new requirement row; it is to solve or constrain the finite
$\theta$-collar inverse-rate transport and test radial balance on the same
retained branch chart.

## Promotion Decision

- Ontology: none added.
- Derivation/closure target: the variable-rate A1 problem is now a
  finite-memory integral equation for the angular time law.
- Effective summary: simple one-parameter continuations fail the same-window or
  positive-$\Gamma$ test, but a retained-root turn-center memory witness exists.
- Speculation: none promoted.

Promotion decision. Promote the invariant local slope and finite-memory
constraint into [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md).
Keep the representative root-count table priority-only unless a later interval
packet certifies a whole nonconstant time-law family.
