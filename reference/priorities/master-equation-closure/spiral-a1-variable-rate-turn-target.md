# Spiral A1 Variable-Rate Turn Target

Status. Priority proof packet and promoted local continuation target for
`spiral_branch_chart_test`. This packet consumes
[spiral-a1-kinematic-gamma-closure](spiral-a1-kinematic-gamma-closure.md),
[spiral-a1-tangential-compatibility-no-go](spiral-a1-tangential-compatibility-no-go.md),
[spiral-a1-current-interval-rows](spiral-a1-current-interval-rows.json), and
[spiral-a1-interval-report](spiral-a1-interval-report.md). It turns the
constant-$\Omega$ A1 rejection into a concrete local angular-rate condition.

Claim level. Constructive turn-center continuation condition, not an existence
certificate for a nonconstant-time-law orbit. The same retained A1 branch chart
shows that constant angular rate fails, but it also fixes the angular
deceleration a variable-angular-rate continuation would have to carry at
$\theta_\ast=0$.

## Turn-Center Kinematics

Let
$$
\omega_\ast=\dot\theta(0)>0,
\qquad
\alpha_\ast=\ddot\theta(0),
$$
and keep the A1 radial curve
$$
r(\theta)=r_\ast\exp(a(1-\cos\theta)),
\qquad
a=a_{\mathrm{A1}}=0.204.
$$
At the turn center,
$$
r'(0)=0,
\qquad
\frac{r''(0)}{r_\ast}=a.
$$
Therefore
$$
\dot r(0)=0,
\qquad
\ddot r(0)=a r_\ast\omega_\ast^2.
$$
The polar acceleration components become
$$
a_r(0)
=
\ddot r(0)-r_\ast\omega_\ast^2
=
(a-1)r_\ast\omega_\ast^2,
$$
and
$$
a_\theta(0)
=
r_\ast\alpha_\ast+2\dot r(0)\omega_\ast
=
r_\ast\alpha_\ast.
$$

## Normalized Force Rows

Use the accepted equal-magnitude opposite-polarity normalization
$$
\Gamma_\ast
\equiv
\frac{r_\ast^3\omega_\ast^2}{\kappa q_1^2}.
$$
The retained turn-center branch sums satisfy
$$
a_r(0)
=
\frac{\kappa q_1^2}{r_\ast^2}B_r(C_{\mathrm{A1}};0),
\qquad
a_\theta(0)
=
\frac{\kappa q_1^2}{r_\ast^2}T_0(C_{\mathrm{A1}}).
$$
Thus exact turn-center balance gives the two local equations
$$
B_r(C_{\mathrm{A1}};0)
=
(a_{\mathrm{A1}}-1)\Gamma_\ast,
$$
and
$$
T_0(C_{\mathrm{A1}})
=
\Gamma_\ast\frac{\alpha_\ast}{\omega_\ast^2}.
$$
Equivalently,
$$
\frac{\alpha_\ast}{\omega_\ast^2}
=
\frac{T_0(C_{\mathrm{A1}})}{\Gamma_\ast}.
$$

## A1 Interval Target

The integrated A1 radial row gives
$$
\Gamma_\ast
\in
[0.007531050241046427,\ 0.007531144882881889],
$$
and the turn-center tangential row gives
$$
T_0(C_{\mathrm{A1}})
\in
[-0.007585901776635041,\ -0.007585740886803276].
$$
Outward interval division by the positive $\Gamma_\ast$ interval yields
$$
\frac{\alpha_\ast}{\omega_\ast^2}
\in
[-1.0072833846320208,\ -1.007249363114164].
$$

The constant-$\Omega$ history sets $\alpha_\ast=0$ and is therefore excluded.
A same-chart variable-angular-rate continuation would instead require a
negative angular acceleration at the turn center, with magnitude essentially
one angular-rate-squared.

## Scope And Failure Mode

This packet does not prove that the constant-$\Omega$ retained roots remain
valid after changing the time law. A real variable-angular-rate A1 continuation
must recompute the delayed roots, Jacobian weights, inactive gaps, and
root-transport row for the nonconstant map $t(\theta)$. The mathematical gain
is narrower and useful: the A1 no-go is not an endpoint. It supplies the local
target equation
$$
\frac{\ddot\theta(0)}{\dot\theta(0)^2}
=
\frac{T_0(C_{\mathrm{A1}})}{\Gamma_\ast}
$$
that the next retained-chart search must hit.

## Promotion Decision

- Ontology: none added.
- Derivation/closure target: A1 constant-$\Omega$ failure is converted into a
  local variable-angular-rate balance equation.
- Effective summary: the retained A1 chart points to a negative turn-center
  angular deceleration interval rather than to an arbitrary non-circular
  continuation.
- Speculation: none promoted.

Promotion decision. Promoted into the A1 benchmark paragraph and analytic
footholds summary in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md).
The priority workstream now treats recomputing the A1 branch chart under this
nonconstant time law as the next mathematical continuation, not as a new gate.
