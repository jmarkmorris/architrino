# Spiral A1 Second-Variation / Finite-Amplitude Remainder Bound Target

Status. Priority proof packet for the endpoint-slope-cancelled A1 retained
chart after the analytic tangent, diagonal second-order, mixed second-order,
and widened mixed-ray audits. This packet consumes
[spiral-a1-radial-transport-jet-report](spiral-a1-radial-transport-jet-report.md)
and [spiral_a1_finite_memory_transport.py](spiral_a1_finite_memory_transport.py).
It is not an A1 no-go, not an isolated spiral certificate, and not a global
spiral theorem.

Claim level. The sampled diagnostics now make the next proof object explicit:
replace deterministic ray evidence with a bound on the finite-collar residual
map
$$
p\longmapsto
\mathcal R_R^{\mathrm{tr}}(\theta;p)
$$
over the endpoint-slope-cancelled admissible retained profile class. The packet
is successful only if it produces either an interval obstruction on a declared
class or an identified admissible finite-amplitude channel that the sampled
rays missed.

## Endpoint-Slope-Cancelled Chart

Use the past-lag coordinate $x=-\theta$ on $0\le x\le\Delta_R$, where
$\Delta_R=\Delta_{P_3}$. The retained endpoint-slope-cancelled seed has the
form
$$
q_0(x)
=
q_{\mathrm{base}}(x)+h_{\mathrm{esc}}(x),
$$
where $h_{\mathrm{esc}}$ is the sampled positive endpoint-slope cancellation
perturbation. A homogeneous finite-collar perturbation is written
$$
q_p(x)=q_0(x)+(Np)(x),
\qquad
p\in\mathbb R^m,
$$
where the columns of $N$ span the retained homogeneous constraint rows. For
each retained branch label $\alpha\in\{P_1,P_2,S_1,P_3\}$, write
$h_p(x)=(Np)(x)$. The locked rows are
$$
h_p'(0)=0,
\qquad
h_p(\Delta_\alpha)=0,
\qquad
\int_0^{\Delta_\alpha}h_p(x)\,dx=0,
$$
and the splice rows
$$
h_p'(\Delta_R)=0,
\qquad
h_p''(\Delta_R)=0.
$$
The endpoint-slope cancellation itself must also remain locked:
$$
\sum_\alpha C_\alpha h_p'(\Delta_\alpha)=0,
$$
where the coefficients $C_\alpha$ are the endpoint-slope coefficients in the
one-sided branch-sum derivative. These homogeneous rows preserve the seed's
center value, retained endpoint values, retained memory moments, $C^2$ splice,
and cancelled leading radial jet.

The admissible perturbation class for a declared radius $b$ is
$$
\mathcal A_b
=
\left\{
p:\ \|p\|\le b,\quad
0.2\le q_p(x)\le3.0\ \text{on }[0,\Delta_R],
\quad
\text{the retained }3+1\text{ ledger persists}
\right\}.
$$
For an interval proof, the sampled positivity check must be replaced by an
outward interval bound on $q_p$, the inactive gaps, the retained active root
windows, the finite memory depth, and the source-speed Jacobian floor.

## Residual Map

For $\theta$ in the finite collar $I_c=[0,\theta_c]$, with
$\theta_c=0.02$ in the current diagnostics, the future profile $Q_p$ is defined
by tangential transport:
$$
Q_p'(\theta)
=
2A\sin\theta\,Q_p(\theta)
-
\frac{Q_p(\theta)^3}{\Gamma_\ast\sigma(\theta)^3}
T_{Q,p}(\theta),
\qquad
Q_p(0)=1.
$$
For each retained row, the transported root is the simple root in the fixed A1
window of
$$
\Phi_\alpha(\theta,\Delta,Q_p)
=
\Lambda_\alpha(\theta,\Delta)
-
\frac{1}{b_\ast\sigma(\theta)}
\int_{\theta-\Delta}^{\theta}Q_p(u)\,du
=0.
$$
Denote this root by $\Delta_{\alpha,p}(\theta)$. The retained branch sums are
$$
T_{Q,p}(\theta)
=
\sum_\alpha
\frac{N^T_\alpha(\theta,\Delta_{\alpha,p})}
{\Lambda_\alpha(\theta,\Delta_{\alpha,p})^3
|J_{\alpha,Q_p}(\theta,\Delta_{\alpha,p})|},
$$
and
$$
B_{Q,p}(\theta)
=
\sum_\alpha
\frac{N^R_\alpha(\theta,\Delta_{\alpha,p})}
{\Lambda_\alpha(\theta,\Delta_{\alpha,p})^3
|J_{\alpha,Q_p}(\theta,\Delta_{\alpha,p})|}.
$$
The substituted radial residual is
$$
\mathcal R_R^{\mathrm{tr}}(\theta;p)
=
B_{Q,p}(\theta)
-
\Gamma_p(\theta)(A\cos\theta-A^2\sin^2\theta-1)
-
A\sin\theta\,T_{Q,p}(\theta),
$$
with
$$
\Gamma_p(\theta)
=
\Gamma_\ast\frac{\sigma(\theta)^3}{Q_p(\theta)^2}.
$$
For sampled diagnostics, define
$$
R_i(p)=\mathcal R_R^{\mathrm{tr}}(\theta_i;p),
\qquad
\theta_i\in I_c.
$$
For an interval proof, replace the sample points with collar boxes
$\Theta_i\subset I_c$ and bound $\mathcal R_R^{\mathrm{tr}}(\Theta_i;p)$
outward on each box.

## First and Second Variation Rows

The first tangent is already implemented at sampled level. For a direction
$v$, the root variation satisfies
$$
\left(
\partial_\Delta\Lambda_\alpha
-
\frac{Q(\theta-\Delta_\alpha)}{b_\ast\sigma(\theta)}
\right)
\delta\Delta_\alpha
=
\frac{1}{b_\ast\sigma(\theta)}
\int_{\theta-\Delta_\alpha}^{\theta}\delta Q(u)\,du.
$$
The tangent transport row is
$$
\delta Q'
=
2A\sin\theta\,\delta Q
-
\frac{3Q^2T_Q}{\Gamma_\ast\sigma^3}\delta Q
-
\frac{Q^3}{\Gamma_\ast\sigma^3}\delta T_Q,
$$
and the substituted radial tangent row is
$$
\delta\mathcal R_R^{\mathrm{tr}}
=
\delta B_Q
-
A\sin\theta\,\delta T_Q
+
2\Gamma(\theta)(A\cos\theta-A^2\sin^2\theta-1)
\frac{\delta Q(\theta)}{Q(\theta)}.
$$
The sampled analytic tangent has effective rank $0$ at the $10^{-9}$ floor.
An interval proof must replace this sampled nullity with a first-variation
bound. For a declared radius $b$, define constants $C_1$ and $C_2$ so that
for every $p\in\mathcal A_b$,
$$
\|DR(0)p\|_\infty\le C_1\|p\|,
$$
and
$$
\sup_{0\le s\le1}\|D^2R(sp)[p,p]\|_\infty
\le
C_2\|p\|^2.
$$
Equivalently, the finite-amplitude integral form is
$$
R(p)-R(0)
=
\int_0^1DR(sp)p\,ds
=
DR(0)p
+
\int_0^1(1-s)D^2R(sp)[p,p]\,ds.
$$
Therefore
$$
\|R(p)-R(0)\|_\infty
\le
C_1\|p\|+\frac12 C_2\|p\|^2.
$$

## Obstruction Criterion

Let $\theta_\ast$ be a collar row or interval box where the base
endpoint-slope-cancelled residual is bounded away from zero:
$$
\rho_\ast
\le
|\mathcal R_R^{\mathrm{tr}}(\theta_\ast;0)|.
$$
The current sampled base value is
$$
\max|\mathcal R_R^{\mathrm{tr}}|
\approx
2.1103915491651765\times10^{-4}
$$
on the degree-18 endpoint-slope-cancelled seed used by the tangent and
second-order diagnostics. With the declared material-improvement fraction
$10^{-2}$, the material floor is
$$
\Delta_{\mathrm{mat}}
\approx
2.1103915491651764\times10^{-6}.
$$

A local finite-amplitude obstruction on $\mathcal A_b$ follows if the interval
proof establishes
$$
C_1 b+\frac12 C_2 b^2
\le
\Delta_{\mathrm{mat}}
<
\rho_\ast.
$$
Then no admissible profile in $\mathcal A_b$ can materially reduce the radial
residual on the certified row, and in particular the row cannot vanish. A
stronger theorem-grade obstruction replaces the material floor by any bound
strictly below $\rho_\ast$:
$$
C_1 b+\frac12 C_2 b^2<\rho_\ast.
$$

The same proof can be phrased without explicit derivatives. Define a
finite-amplitude envelope $E_\ast(b)$ by
$$
|\mathcal R_R^{\mathrm{tr}}(\theta_\ast;p)
-
\mathcal R_R^{\mathrm{tr}}(\theta_\ast;0)|
\le
E_\ast(b)
\qquad(p\in\mathcal A_b).
$$
An interval obstruction follows from
$$
E_\ast(b)<\rho_\ast.
$$
The derivative form is preferred when it decomposes cleanly through the root,
transport, branch-sum, and radial rows; the finite-amplitude envelope is
preferred when direct interval propagation gives a sharper bound.

## Row-by-Row Bound Program

The proof packet has five controlled rows.

1. Retained-root row. Prove the retained roots remain in the certified A1
   windows and keep a lower denominator bound
   $|\partial_\Delta\Phi_\alpha|\ge d_\alpha>0$. This converts profile
   perturbations into root-offset bounds through the implicit equation.
2. Tangential-transport row. Bound $Q_p$ and its first two profile-coordinate
   variations on $I_c$ by a Gronwall estimate for the transported equation,
   using the retained branch-sum bounds as coefficients.
3. Branch-sum row. Bound the first and second profile-coordinate variations of
   $T_{Q,p}$ and $B_{Q,p}$ from the $\Delta_{\alpha,p}$, $Q_p(\theta-\Delta)$,
   $\Lambda_\alpha$, and $J_{\alpha,Q_p}$ bounds.
4. Substituted-radial row. Combine the $B_Q$, $T_Q$, and
   $\Gamma_\ast\sigma^3/Q_p^2$ bounds into $C_1$, $C_2$, or the
   finite-amplitude envelope $E_\ast(b)$.
5. Admissibility row. Verify positivity, inactive gaps, Jacobian floors,
   finite memory, tangential transport, and the $3+1$ retained ledger on the
   same interval boxes and perturbation radius.

The existing mixed-ray evidence supplies only a warning about likely scale:
the tested second-order numerators remain near $10^{-8}$ and the best replay is
far below the material floor. It is not a substitute for any row above.

## Retained-Root Row Advance

Claim level. This retained-root bound is priority-only. It certifies only the
branch-chart persistence needed by the later transport, branch-sum, and
radial-envelope rows; by itself it is not an A1 obstruction, not a closure
certificate, and not evidence for a finite-amplitude repair channel.

The retained-root row can be stated as a conditional lemma. Fix one retained
branch label $\alpha$ and its certified A1 window
$W_\alpha=[\ell_\alpha,u_\alpha]$. Let $\Delta_{\alpha,0}(\theta)$ be the
endpoint-slope-cancelled seed root and assume it has window clearance
$$
\kappa_\alpha
=
\inf_{\theta\in I_c}
\min\{\Delta_{\alpha,0}(\theta)-\ell_\alpha,\,
u_\alpha-\Delta_{\alpha,0}(\theta)\}>0.
$$
For an admissible perturbation $p$, put
$$
D_{\alpha,p}(\theta,\Delta)
=
\partial_\Delta\Phi_\alpha(\theta,\Delta,Q_p)
=
\partial_\Delta\Lambda_\alpha(\theta,\Delta)
-
\frac{Q_p(\theta-\Delta)}{b_\ast\sigma(\theta)}.
$$
The source-speed Jacobian convention used by the executable diagnostic gives
the exact denominator identity
$$
D_{\alpha,p}(\theta,\Delta)
=
-
\frac{Q_p(\theta-\Delta)}
{b_\ast\sigma(\theta)}
J_{\alpha,Q_p}(\theta,\Delta).
$$
Thus the retained-root denominator floor does not need a new independent
gate. It follows from the same positivity, source-speed Jacobian, and collar
radius bounds already required by the admissibility row. If
$$
Q_p(\theta-\Delta)\ge q_{\min}>0,\qquad
|J_{\alpha,Q_p}(\theta,\Delta)|\ge\nu_\alpha>0,\qquad
\sigma(\theta)\le\sigma_{\max},
$$
on $I_c\times W_\alpha$, then
$$
|D_{\alpha,p}(\theta,\Delta)|
\ge
d_\alpha
:=
\frac{q_{\min}\nu_\alpha}{b_\ast\sigma_{\max}}.
$$
For the current diagnostic admissibility convention, the sampled lower profile
floor is $q_{\min}=0.2$; an interval proof must replace that sampled floor and
the sampled Jacobian floor by outward-certified bounds on the same boxes.

Now define the profile-memory envelope consumed by this row:
$$
\varepsilon_Q(b)
=
\sup_{p\in\mathcal A_b}
\sup_{\theta\in I_c,\ \Delta\in W_\alpha}
|Q_p-Q_0|_{[\theta-\Delta,\theta]},
$$
where the inner norm is the supremum over the integration segment. At the seed
root,
$$
\Phi_\alpha(\theta,\Delta_{\alpha,0},Q_p)
-
\Phi_\alpha(\theta,\Delta_{\alpha,0},Q_0)
=
-
\frac{1}{b_\ast\sigma(\theta)}
\int_{\theta-\Delta_{\alpha,0}}^{\theta}
(Q_p(u)-Q_0(u))\,du.
$$
Therefore
$$
\left|
\Phi_\alpha(\theta,\Delta_{\alpha,0},Q_p)
\right|
\le
\eta_\alpha(b)
:=
\frac{\Delta_{\alpha,\max}}{b_\ast\sigma_{\min}}
\varepsilon_Q(b),
$$
where $\Delta_{\alpha,\max}=\sup W_\alpha$ and
$\sigma_{\min}=\inf_{I_c}\sigma(\theta)$. If
$$
\eta_\alpha(b)<d_\alpha\kappa_\alpha,
$$
then the implicit root for $Q_p$ remains in $W_\alpha$ and satisfies
$$
|\Delta_{\alpha,p}(\theta)-\Delta_{\alpha,0}(\theta)|
\le
\frac{\eta_\alpha(b)}{d_\alpha}
\le
\frac{\Delta_{\alpha,\max}\sigma_{\max}}
{\sigma_{\min}q_{\min}\nu_\alpha}
\varepsilon_Q(b).
$$
Equivalently, using the Jacobian-floor form locally along the same retained
root segment gives the cleaner estimate
$$
|\Delta_{\alpha,p}(\theta)-\Delta_{\alpha,0}(\theta)|
\le
\frac{1}{q_{\min}\nu_\alpha}
\int_{\theta-\Delta_{\alpha,0}}^{\theta}
|Q_p(u)-Q_0(u)|\,du
\le
\frac{\Delta_{\alpha,\max}}{q_{\min}\nu_\alpha}
\varepsilon_Q(b).
$$
Endpoint-slope cancellation constrains which profile perturbations are
admissible, but it does not change the denominator identity. It only changes
which $Q_p-Q_0$ envelopes are legal. This is the
profile-envelope-to-root-offset conversion needed by the transport and
branch-sum rows.

Use of the row. A successful row should report the retained A1 windows,
active-root inclusion boxes, inactive-gap lower bounds, and denominator floors
$|\partial_\Delta\Phi_\alpha|\ge d_\alpha>0$ on the same declared perturbation
radius $b$ used by the remainder envelope. Those constants become inputs to
the tangential-transport and branch-sum rows, not standalone promotion
material. The retained-root row is therefore closed only after four interval
data items are available on the same boxes:

1. A profile envelope $\varepsilon_Q(b)$ on every integration segment entering
   the retained roots.
2. A positive profile floor $q_{\min}$ for $Q_p(\theta-\Delta)$.
3. A source-speed Jacobian floor $\nu_\alpha$ on each retained A1 window.
4. A seed-root window clearance $\kappa_\alpha$ large enough that
   $\eta_\alpha(b)<d_\alpha\kappa_\alpha$.

Failure of this row is informative. If the denominator floor fails, the proof
route must tighten positivity or Jacobian control before using the retained
chart. If the clearance inequality fails while the denominator stays bounded,
the missing finite-amplitude channel is root migration inside or out of the
declared retained windows, and the next packet should target that migration
rather than another sampled repair direction.

## Failure Modes

This packet has three acceptable outcomes.

- Obstruction-ready. The row bounds give
  $E_\ast(b)<\rho_\ast$ on a declared admissible class. The next step is an
  interval obstruction attempt for that class.
- Missing finite-amplitude channel. One row cannot be bounded below the
  material floor because a specific admissible perturbation family has large
  root, transport, branch-sum, or radial-row leverage. The next step is a
  targeted existence or repair packet for that family, not a blind ray search.
- Insufficient interval control. The equations are right, but current branch,
  inactive-gap, Jacobian, or transport bounds are too loose. The next step is
  to strengthen those native bounds, not to add another sampled diagnostic.

Promotion decision. This packet is priority-only until it supplies an interval
bound or a theorem-ready lemma. It may later promote a reader-facing theorem
target saying that A1 finite-collar closure after endpoint-slope cancellation
reduces to a controlled residual-envelope bound on the admissible retained
profile class, but the present document does not promote an A1 no-go.
