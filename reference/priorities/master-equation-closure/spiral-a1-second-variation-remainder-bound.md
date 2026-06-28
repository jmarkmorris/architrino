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
2.108902635160094\times10^{-4}
$$
on the degree-18 endpoint-slope-cancelled seed used by the tangent and
second-order diagnostics. With the declared material-improvement fraction
$10^{-2}$, the material floor is
$$
\Delta_{\mathrm{mat}}
\approx
2.108902635160094\times10^{-6}.
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

## Sampled Remainder-Constants Ladder Diagnostic

Claim level. The executable diagnostic
`finite_collar_remainder_constants_ladder` is sampled support only. It does not
replace an outward interval proof, an operator-norm bound for $D^2R$, or the
shared admissibility certificate for positivity, inactive gaps, Jacobian floors,
finite memory, tangential transport, and the retained $3+1$ ledger.

The first degree-18 ladder run used the endpoint-slope-cancelled retained
profile, the tangential transport profile, five collar samples on
$[0,0.02]$, twelve deterministic mixed rays, and central second differences at
amplitudes $a=0.005$ and $a=0.01$. It reports
$$
C_{1,\mathrm{samp}}\approx5.463516944683666\times10^{-12},
\qquad
C_{2,\mathrm{samp}}\approx6.607362310062648\times10^{-4},
$$
with analytic tangent effective rank $0$ and singular values
$$
5.9228758893664825\times10^{-12},\quad
1.534595750068976\times10^{-12},\quad
9.934560988615517\times10^{-15},\quad
4.127186041936003\times10^{-16},\quad
4.8539487664401915\times10^{-18}.
$$
The sampled base residual vector is
$$
(-1.2544053828666968\times10^{-5},\,
-2.2589733199266868\times10^{-5},\,
-5.587694391866356\times10^{-5},\,
-1.1705247469991076\times10^{-4},\,
-2.108902635160094\times10^{-4}).
$$

The radius ladder gives the following sampled derivative-form bounds:

| Radius $b$ | $C_{1,\mathrm{samp}}b$ | $\frac12 C_{2,\mathrm{samp}}b^2$ | Bound / material floor |
| --- | --- | --- | --- |
| $0.001$ | $5.463516944683666\times10^{-15}$ | $3.303681155031324\times10^{-10}$ | $1.566566296196018\times10^{-4}$ |
| $0.003$ | $1.6390550834050997\times10^{-14}$ | $2.973313039528192\times10^{-9}$ | $1.409894122425102\times10^{-3}$ |
| $0.01$ | $5.463516944683666\times10^{-14}$ | $3.303681155031324\times10^{-8}$ | $1.5665429799690465\times10^{-2}$ |
| $0.03$ | $1.6390550834050997\times10^{-13}$ | $2.9733130395281913\times10^{-7}$ | $1.4098871275570105\times10^{-1}$ |

Those ratios are numerically below the material floor through $b=0.03$, but
the diagnostic classifies the run as `sampled_remainder_constants_unstable`.
The sampled $C_2$ estimate changes from about
$6.607362310062648\times10^{-4}$ at $a=0.005$ to about
$1.7790916558534098\times10^{-4}$ at $a=0.01$, so the adjacent relative
change is about $0.7307410170100781$, above the current stability tolerance.
All twelve plus/minus ray evaluations preserved the sampled positivity bounds
and retained Jacobian floor in this run, with no candidate replay failures, but
that is still a sampled legality check rather than an outward admissibility
certificate.

The result narrows the next mathematical burden: stabilize or outward-certify
the $C_2$ row on the same retained A1 boxes, then compare the resulting
$C_1b+\frac12C_2b^2$ or direct $E_\ast(b)$ bound against both
$\Delta_{\mathrm{mat}}$ and $\rho_\ast$. Until that is done, the ladder is
evidence for an obstruction-side proof route, not an A1 no-go theorem.

The concrete outward-constants handoff is now specified in
[spiral-a1-outward-constants-certificate-target](spiral-a1-outward-constants-certificate-target.md).
That packet fixes the endpoint-slope-cancelled admissible perturbation class,
the retained A1 row set, the constants that must be emitted outward, the
material and theorem-grade obstruction inequalities, and the first failure modes
that distinguish failed admissibility from a legal finite-amplitude channel.

## Row-by-Row Bound Program

The proof packet has five controlled rows.

1. Retained-root row. Prove the retained roots remain in the certified A1
   windows and keep a lower denominator bound
   $|\partial_\Delta\Phi_\alpha|\ge d_\alpha>0$. This converts profile
   perturbations into root-offset bounds through the implicit equation.
2. Tangential-transport row. Bound $Q_p$ and its first two profile-coordinate
   variations on $I_c$ by a Gronwall estimate for the transported equation,
   using the retained branch-sum bounds as coefficients. The conditional row
   advance below converts branch-sum envelopes into transported-profile
   envelopes; it does not close independently of the branch-sum row.
3. Branch-sum row. Bound the first and second profile-coordinate variations of
   $T_{Q,p}$ and $B_{Q,p}$ from the $\Delta_{\alpha,p}$, $Q_p(\theta-\Delta)$,
   $\Lambda_\alpha$, and $J_{\alpha,Q_p}$ bounds. The conditional row advance
   below turns retained-root and tangential-transport envelopes into the
   finite-amplitude and derivative branch-sum envelopes consumed by the
   transport and substituted-radial rows.
4. Substituted-radial row. Combine the $B_Q$, $T_Q$, and
   $\Gamma_\ast\sigma^3/Q_p^2$ bounds into $C_1$, $C_2$, or the
   finite-amplitude envelope $E_\ast(b)$. The conditional row advance below
   is the residual-envelope assembly step; it consumes the previous rows and
   is still subject to the shared admissibility row.
5. Admissibility row. Verify positivity, inactive gaps, Jacobian floors,
   finite memory, tangential transport, and the $3+1$ retained ledger on the
   same interval boxes and perturbation radius. The conditional row advance
   below is the legal-domain certificate that makes the previous four rows
   usable as an interval obstruction or channel detector.

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

## Tangential-Transport Row Advance

Claim level. This tangential-transport bound is priority-only and conditional.
It gives a Gronwall operator from retained branch-sum envelopes to
future-profile envelopes on $I_c$. It is not an A1 obstruction, not a closure
certificate, and not an independent proof that the admissible perturbation
class is small; the required branch-sum envelopes still have to be supplied by
the branch-sum row on the same retained windows and perturbation radius.

Let
$$
z_p(\theta)=Q_p(\theta)-Q_0(\theta),
\qquad
\tau_p(\theta)=T_{Q,p}(\theta)-T_{Q,0}(\theta).
$$
Subtracting the seed transport equation from the perturbed transport equation
gives
$$
z_p'
=
2A\sin\theta\,z_p
-
\frac{Q_p^3T_{Q,p}-Q_0^3T_{Q,0}}
{\Gamma_\ast\sigma^3},
\qquad
z_p(0)=0,
$$
with the exact splitting
$$
Q_p^3T_{Q,p}-Q_0^3T_{Q,0}
=
Q_p^3\tau_p
+
(Q_p^3-Q_0^3)T_{Q,0}.
$$
Assume that on the collar and on the declared admissible class,
$$
0<q_{\min}\le Q_p(\theta),Q_0(\theta)\le q_{\max},
\qquad
\sigma(\theta)\ge\sigma_{\min}>0,
$$
and define the branch-sum coefficient envelopes
$$
T_0^\#=\sup_{\theta\in I_c}|T_{Q,0}(\theta)|,
\qquad
E_T(b)=
\sup_{p\in\mathcal A_b}\|T_{Q,p}-T_{Q,0}\|_{L^\infty(I_c)}.
$$
Then
$$
|Q_p^3-Q_0^3|
\le
3q_{\max}^2|z_p|,
$$
so
$$
|z_p'|
\le
L_T(\theta)|z_p|
+
M_T E_T(b),
$$
where one may take
$$
L_T(\theta)
=
2|A||\sin\theta|
+
\frac{3q_{\max}^2T_0^\#}
{\Gamma_\ast\sigma_{\min}^3},
\qquad
M_T
=
\frac{q_{\max}^3}{\Gamma_\ast\sigma_{\min}^3}.
$$
With
$$
L_T^\#=\sup_{\theta\in I_c}L_T(\theta),
$$
Gronwall gives the transported-profile envelope
$$
\|Q_p-Q_0\|_{L^\infty([0,\theta_c])}
\le
K_Q E_T(b),
$$
where
$$
K_Q
=
\begin{cases}
M_T\frac{e^{L_T^\#\theta_c}-1}{L_T^\#},
& L_T^\#>0,\\[4pt]
M_T\theta_c,& L_T^\#=0.
\end{cases}
$$
This is the finite-amplitude row needed by the retained-root estimate: once
the branch-sum row supplies $E_T(b)$, the transport equation supplies the
future part of the memory envelope $\varepsilon_Q(b)$.

A sharper branch-sum-coupled form separates the direct past-profile
perturbation from future-transport feedback. Define
$$
E_Q^+(\theta)
=
\sup_{0\le u\le\theta}|Q_p(u)-Q_0(u)|,
\qquad
H_b
=
\sup_{p\in\mathcal A_b}
\sup_{-\Delta_R\le u\le0}|q_p(u)-q_0(u)|.
$$
If the branch-sum row supplies constants $\mathsf C_T^-$ and
$\mathsf C_T^+$ such that
$$
|T_{Q,p}(\theta)-T_{Q,0}(\theta)|
\le
\mathsf C_T^-H_b+\mathsf C_T^+E_Q^+(\theta),
\qquad
0\le\theta\le\theta_c,
$$
then the transport difference satisfies
$$
|z_p'|
\le
\left(
a_+
+
3c_+q_+^2\mathsf T_0
+
c_+q_+^3\mathsf C_T^+
\right)E_Q^+(\theta)
+
c_+q_+^3\mathsf C_T^-H_b,
$$
where
$$
\mathsf T_0=\sup_{I_c}|T_{Q,0}|,
\qquad
c_+=\frac{1}{\Gamma_\ast\sigma_{\min}^3},
\qquad
q_+=\sup_{\mathcal A_b,I_c}|Q_p|,
\qquad
a_+=2|A|\sin\theta_c.
$$
Writing
$$
\mu
=
a_+
+
3c_+q_+^2\mathsf T_0
+
c_+q_+^3\mathsf C_T^+,
$$
another Gronwall estimate gives
$$
\sup_{I_c}|Q_p-Q_0|
\le
c_+q_+^3\mathsf C_T^-H_b
\begin{cases}
\dfrac{e^{\mu\theta_c}-1}{\mu},& \mu>0,\\[6pt]
\theta_c,& \mu=0.
\end{cases}
$$

One clean target for the branch-sum row is to prove the two constants above
from branchwise summand derivatives. Put
$$
t_\alpha
=
\frac{N^T_\alpha}{\Lambda_\alpha^3|J_\alpha|},
$$
and let
$$
\mathsf M_{\alpha,\Delta}
=
\sup|\partial_\Delta t_\alpha|,
\qquad
\mathsf M_{\alpha,s}
=
\sup|\partial_{q_s}t_\alpha|,
\qquad
\mathsf Q'_{s,\alpha}
=
\sup|Q_p'(\theta-\Delta_\alpha)|.
$$
Using the retained-root offset bound, one possible branch-sum coefficient
contract is
$$
\mathsf C_T^-
=
\sum_\alpha
\left[
\mathsf M_{\alpha,s}
+
\left(
\mathsf M_{\alpha,\Delta}
+
\mathsf M_{\alpha,s}\mathsf Q'_{s,\alpha}
\right)
\frac{\Delta_{\alpha,\max}}{q_{\min}\nu_\alpha}
\right],
$$
and
$$
\mathsf C_T^+
=
\sum_\alpha
\left[
\mathsf M_{\alpha,s}
+
\left(
\mathsf M_{\alpha,\Delta}
+
\mathsf M_{\alpha,s}\mathsf Q'_{s,\alpha}
\right)
\frac{\theta_c}{q_{\min}\nu_\alpha}
\right].
$$
All suprema in these coefficient definitions must be taken outward on the
same retained A1 windows, active-root inclusion boxes, positivity floor,
source-speed Jacobian floors, and perturbation radius $b$ as the retained-root
row. These formulas are not a substitute for the branch-sum row; they specify
what that row must certify so that tangential transport becomes a closed
profile-envelope estimate.

The first profile-coordinate variation has the same form as the implemented
analytic tangent backend. For a direction $v$, write
$\eta_v=\delta Q[v]$ and $\tau_v=\delta T_Q[v]$. Then
$$
\eta_v'
=
a_Q(\theta)\eta_v
-
\frac{Q^3}{\Gamma_\ast\sigma^3}\tau_v,
\qquad
\eta_v(0)=0,
$$
with
$$
a_Q(\theta)
=
2A\sin\theta
-
\frac{3Q(\theta)^2T_Q(\theta)}
{\Gamma_\ast\sigma(\theta)^3}.
$$
Thus any branch-sum first-variation envelope
$$
E_T^{(1)}(b)
=
\sup_{p\in\mathcal A_b}
\sup_{\|v\|=1}
\|\delta T_{Q,p}[v]\|_{L^\infty(I_c)}
$$
produces a corresponding bound
$$
\|\delta Q[v]\|_{L^\infty(I_c)}
\le
K_Q^{(1)}E_T^{(1)}(b),
$$
with $K_Q^{(1)}$ obtained from the same Gronwall integral after replacing
$L_T^\#$ by a uniform upper bound for $|a_Q|$ on the admissible collar.

For two profile-coordinate directions $v,w$, write
$\xi_{vw}=\delta^2Q[v,w]$. Differentiating the transport equation twice gives
the bilinear second-variation row
$$
\xi_{vw}'
=
a_Q\xi_{vw}
-
\frac{Q^3}{\Gamma_\ast\sigma^3}\delta^2T_Q[v,w]
-
\frac{1}{\Gamma_\ast\sigma^3}
\left(
6QT_Q\,\eta_v\eta_w
+
3Q^2\eta_v\,\delta T_Q[w]
+
3Q^2\eta_w\,\delta T_Q[v]
\right),
$$
with $\xi_{vw}(0)=0$. Hence the second-variation row needs the branch-sum
envelope
$$
E_T^{(2)}(b)
=
\sup_{p\in\mathcal A_b}
\sup_{\|v\|=\|w\|=1}
\|\delta^2T_{Q,p}[v,w]\|_{L^\infty(I_c)}
$$
together with uniform bounds for $Q$, $T_Q$, $\delta Q$, and $\delta T_Q$.
It can then bound $\delta^2Q$ by one Gronwall integral whose forcing terms are
$E_T^{(2)}(b)$ and the quadratic products of the first-variation envelopes.

The branch-sum data required by this row are therefore:

1. $T_0^\#$ and, for derivative rows, a uniform
   $T_b^\#=\sup_{p\in\mathcal A_b}\|T_{Q,p}\|_{L^\infty(I_c)}$.
2. The finite-amplitude perturbation envelope $E_T(b)$.
3. The first-variation envelope $E_T^{(1)}(b)$.
4. The second-variation envelope $E_T^{(2)}(b)$.
5. The shared collar constants $q_{\min}$, $q_{\max}$, $\sigma_{\min}$,
   $\theta_c$, and $\Gamma_\ast$, using the same retained-root windows and
   admissibility radius as the root row.

Use of the row. A successful tangential-transport row should report bounds for
$Q_p$, $\delta Q$, and $\delta^2Q$ on $I_c$ on the same interval boxes and
radius $b$ used by the retained-root row. These constants become inputs to the
branch-sum row for $T_{Q,p}$ and $B_{Q,p}$, and then to the substituted-radial
row for $C_1$, $C_2$, or $E_\ast(b)$. They are not standalone promotion
material.

The row cannot be closed independently. The retained-root row gives
$E_\Delta\le K_\Delta\varepsilon_Q$, while the branch-sum row must still bound
$E_T(b)$ from source-profile perturbations, retained-root offsets, and the
Jacobian-weighted branch summands. In a Lipschitz form, the coupled proof has
the schematic structure
$$
E_Q^+\le K_QE_T,
\qquad
E_\Delta\le K_\Delta\varepsilon_Q,
\qquad
E_T\le E_{T,\mathrm{past}}(b)+K_{T,Q}E_Q^+
+K_{T,\Delta}E_\Delta,
$$
where $E_Q^+$ is the future transported-profile envelope and
$E_{T,\mathrm{past}}(b)$ is the direct source-profile contribution from the
declared endpoint-slope-cancelled past perturbation class. Closing the row
therefore requires either a direct outward interval propagation of these three
quantities or a small-gain inequality for the feedback part, for example
$$
K_Q(K_{T,Q}+K_{T,\Delta}K_\Delta)<1
$$
after the branch-sum row has supplied concrete constants. Until that happens,
this row is a conditional transport estimate and not a standalone A1 verdict.

## Branch-Sum Row Advance

Claim level. This branch-sum row is priority-only and conditional. It states
the interval contract that would bound the retained sums $T_{Q,p}$ and
$B_{Q,p}$, together with their first and second profile-coordinate variations,
from retained-root offsets and source-profile envelopes. It does not close the
substituted radial residual by itself; it supplies the coefficients needed by
the tangential-transport and substituted-radial rows.

For $X\in\{T,B\}$, write the retained branch summand as
$$
x_\alpha^X(\theta,\Delta,q_s)
=
\frac{N_\alpha^X(\theta,\Delta)}
{\Lambda_\alpha(\theta,\Delta)^3
|J_\alpha(\theta,\Delta,q_s)|},
$$
where $N_\alpha^T$ is the tangential numerator and $N_\alpha^B$ is the radial
numerator. The source profile value is
$$
q_{\alpha,p}^s(\theta)
=
Q_p(\theta-\Delta_{\alpha,p}(\theta)),
$$
and the retained sums are
$$
X_{Q,p}(\theta)
=
\sum_\alpha
x_\alpha^X(\theta,\Delta_{\alpha,p}(\theta),
q_{\alpha,p}^s(\theta)).
$$
The active boxes for this row are
$$
\theta\in I_c,\qquad
\Delta\in W_\alpha,\qquad
q_s\in[q_{\min},q_{\max}],
$$
with the same inactive-gap, positivity, source-speed Jacobian, and retained
window floors required by the retained-root and admissibility rows.

Define first-derivative summand envelopes
$$
M_{\alpha,\Delta}^X
=
\sup|\partial_\Delta x_\alpha^X|,
\qquad
M_{\alpha,s}^X
=
\sup|\partial_{q_s}x_\alpha^X|,
$$
and a source-slope envelope
$$
Q'_{s,\alpha}
=
\sup|Q_p'(\theta-\Delta)|
$$
on the same boxes. If the retained-root row supplies
$$
|\Delta_{\alpha,p}-\Delta_{\alpha,0}|
\le
\frac{\Delta_{\alpha,\max}}{q_{\min}\nu_\alpha}H_b
+
\frac{\theta_c}{q_{\min}\nu_\alpha}E_Q^+,
$$
then the source-value perturbation satisfies
$$
|q_{\alpha,p}^s-q_{\alpha,0}^s|
\le
H_b+E_Q^+
+
Q'_{s,\alpha}|\Delta_{\alpha,p}-\Delta_{\alpha,0}|.
$$
Consequently each retained sum has a finite-amplitude envelope
$$
\|X_{Q,p}-X_{Q,0}\|_{L^\infty(I_c)}
\le
C_X^-H_b+C_X^+E_Q^+,
$$
with
$$
C_X^-
=
\sum_\alpha
\left[
M_{\alpha,s}^X
+
\left(
M_{\alpha,\Delta}^X
+
M_{\alpha,s}^XQ'_{s,\alpha}
\right)
\frac{\Delta_{\alpha,\max}}{q_{\min}\nu_\alpha}
\right],
$$
and
$$
C_X^+
=
\sum_\alpha
\left[
M_{\alpha,s}^X
+
\left(
M_{\alpha,\Delta}^X
+
M_{\alpha,s}^XQ'_{s,\alpha}
\right)
\frac{\theta_c}{q_{\min}\nu_\alpha}
\right].
$$
For the tangential sum, $C_T^-$ and $C_T^+$ are the coefficients consumed by
the tangential-transport feedback estimate. For the radial sum, $C_B^-$ and
$C_B^+$ are inputs to the substituted-radial residual envelope.

The first profile-coordinate variation is a direct chain-rule row. For a
direction $v$, the retained-root denominator is
$$
D_\alpha
=
\partial_\Delta\Lambda_\alpha(\theta,\Delta_\alpha)
-
\frac{Q_p(\theta-\Delta_\alpha)}{b_\ast\sigma(\theta)}.
$$
This is the implicit-root denominator from the retained-root row; it is
distinct from the branch-weight denominator $|J_\alpha|$ inside
$x_\alpha^X$. With
$$
M_{\alpha,v}
=
\int_{\theta-\Delta_\alpha}^{\theta}\eta_v(u)\,du,
$$
the first root variation is
$$
\delta\Delta_\alpha[v]
=
\frac{M_{\alpha,v}}
{b_\ast\sigma(\theta)D_\alpha}.
$$
For two directions $v,w$, let
$$
M_{\alpha,vw}
=
\int_{\theta-\Delta_\alpha}^{\theta}\xi_{vw}(u)\,du.
$$
Differentiating the implicit root equation twice gives
$$
\delta^2\Delta_\alpha[v,w]
=
\frac{
\dfrac{1}{b_\ast\sigma}M_{\alpha,vw}
+
\dfrac{1}{b_\ast\sigma}
\left(
\eta_v(\theta-\Delta_\alpha)\delta\Delta_\alpha[w]
+
\eta_w(\theta-\Delta_\alpha)\delta\Delta_\alpha[v]
\right)
-
\left(
\partial_{\Delta\Delta}\Lambda_\alpha
+
\dfrac{Q_p'(\theta-\Delta_\alpha)}{b_\ast\sigma}
\right)
\delta\Delta_\alpha[v]\delta\Delta_\alpha[w]
}
{D_\alpha}.
$$
These root-variation rows are consumed by the first and second branch-sum
chain rules below.

For a direction $v$, let
$$
y_{\alpha,v}
=
\left(
\delta\Delta_\alpha[v],\,
\eta_v(\theta-\Delta_\alpha)
-
Q_p'(\theta-\Delta_\alpha)\delta\Delta_\alpha[v]
\right).
$$
Then
$$
\delta X_Q[v]
=
\sum_\alpha
\nabla_{\Delta,q_s}x_\alpha^X\cdot y_{\alpha,v}.
$$
Thus any first-variation bounds for the retained roots and transported profile
give
$$
\|\delta X_Q[v]\|_{L^\infty(I_c)}
\le
\sum_\alpha
\left(
M_{\alpha,\Delta}^X|\delta\Delta_\alpha[v]|
+
M_{\alpha,s}^X
|\eta_v(\theta-\Delta_\alpha)
-
Q_p'(\theta-\Delta_\alpha)\delta\Delta_\alpha[v]|
\right).
$$
In envelope form, the row should report constants $C_X^{(1),-}$ and
$C_X^{(1),+}$ such that
$$
\|\delta X_Q[v]\|_{L^\infty(I_c)}
\le
C_X^{(1),-}H_v+C_X^{(1),+}E_v^+,
$$
where $H_v$ is the past-profile direction envelope and $E_v^+$ is the future
transported tangent envelope. The $X=T$ instance gives
$E_T^{(1)}(b)$; the $X=B$ instance gives $E_B^{(1)}(b)$.

The second profile-coordinate variation uses the Hessian of the same summand
map. Let
$$
H_{\alpha,\Delta\Delta}^X,\qquad
H_{\alpha,\Delta s}^X,\qquad
H_{\alpha,ss}^X
$$
be outward envelopes for the corresponding second partials of
$x_\alpha^X$. With
$$
y_{\alpha,vw}
=
\left(
\delta^2\Delta_\alpha[v,w],\,
\delta^2q_{\alpha}^s[v,w]
\right),
$$
where
$$
\delta^2q_{\alpha}^s[v,w]
=
\xi_{vw}(\theta-\Delta_\alpha)
-
\eta_v'(\theta-\Delta_\alpha)\delta\Delta_\alpha[w]
-
\eta_w'(\theta-\Delta_\alpha)\delta\Delta_\alpha[v]
-
Q_p'(\theta-\Delta_\alpha)\delta^2\Delta_\alpha[v,w]
+
Q_p''(\theta-\Delta_\alpha)
\delta\Delta_\alpha[v]\delta\Delta_\alpha[w],
$$
the second-variation identity is
$$
\delta^2X_Q[v,w]
=
\sum_\alpha
\left(
\nabla x_\alpha^X\cdot y_{\alpha,vw}
+
y_{\alpha,v}^T
D^2x_\alpha^X
y_{\alpha,w}
\right).
$$
The branch-sum row therefore needs first and second retained-root variation
envelopes, transported profile envelopes for $\eta_v$, $\eta_w$, and
$\xi_{vw}$, and source derivative bounds for $Q_p'$, $Q_p''$, $\eta_v'$, and
$\eta_w'$ on the same boxes. Once those are supplied, the row should report
constants $C_X^{(2),-}$, $C_X^{(2),+}$, and $C_X^{(2),\mathrm{quad}}$ such that
$$
\|\delta^2X_Q[v,w]\|_{L^\infty(I_c)}
\le
C_X^{(2),-}H_{vw}
+
C_X^{(2),+}E_{vw}^+
+
C_X^{(2),\mathrm{quad}}
(H_v+E_v^+)(H_w+E_w^+).
$$
The $X=T$ instance gives $E_T^{(2)}(b)$ for tangential transport; the $X=B$
instance gives $E_B^{(2)}(b)$ for the radial residual.

Use of the row. A successful branch-sum row should report, for both $T$ and
$B$, finite-amplitude envelopes $C_X^-,C_X^+$ and derivative envelopes
$E_X^{(1)}(b),E_X^{(2)}(b)$ on the same interval boxes and perturbation radius
$b$. The tangential instances feed back into the transport row; the radial
instances feed forward into the substituted-radial row. This row becomes
closed only after the summand derivative boxes avoid Jacobian-null loss and
the retained-root variation envelopes are certified. It remains priority-only
until the substituted-radial and admissibility rows convert these envelopes
into either $E_\ast(b)<\rho_\ast$ or a named finite-amplitude channel.

## Substituted-Radial Row Advance

Claim level. This substituted-radial row is priority-only and conditional. It
is the first row that assembles the retained-profile, transport, and branch-sum
envelopes into a bound for
$\mathcal R_R^{\mathrm{tr}}(\theta;p)-\mathcal R_R^{\mathrm{tr}}(\theta;0)$.
It does not by itself certify an A1 obstruction, because the constants must
still be made outward on the same admissible interval boxes and checked against
the base residual floor.

Write
$$
S_R(\theta)
=
A\cos\theta-A^2\sin^2\theta-1,
\qquad
\Gamma_p(\theta)
=
\Gamma_\ast\frac{\sigma(\theta)^3}{Q_p(\theta)^2}.
$$
The substituted radial residual is
$$
\mathcal R_R^{\mathrm{tr}}(\theta;p)
=
B_{Q,p}(\theta)
-
\Gamma_p(\theta)S_R(\theta)
-
A\sin\theta\,T_{Q,p}(\theta).
$$
Thus the finite-amplitude difference is exactly
$$
\mathcal R_R^{\mathrm{tr}}(\theta;p)
-
\mathcal R_R^{\mathrm{tr}}(\theta;0)
=
(B_{Q,p}-B_{Q,0})
-
A\sin\theta\,(T_{Q,p}-T_{Q,0})
-
S_R(\theta)(\Gamma_p-\Gamma_0).
$$
On a box where
$$
0<q_{\min}\le Q_p,Q_0\le q_{\max},
\qquad
\sigma(\theta)\le\sigma_{\max},
$$
the force-ratio difference satisfies
$$
|\Gamma_p-\Gamma_0|
\le
K_\Gamma |Q_p-Q_0|,
\qquad
K_\Gamma
=
\Gamma_\ast\sigma_{\max}^3
\frac{2q_{\max}}{q_{\min}^4}.
$$
With
$$
S_\#=\sup_{I_c}|S_R(\theta)|,
\qquad
s_\#=\sup_{I_c}|A\sin\theta|,
$$
and finite-amplitude envelopes
$$
E_Q(b)=\|Q_p-Q_0\|_{L^\infty(I_c)},
\quad
E_T(b)=\|T_{Q,p}-T_{Q,0}\|_{L^\infty(I_c)},
\quad
E_B(b)=\|B_{Q,p}-B_{Q,0}\|_{L^\infty(I_c)},
$$
the residual-envelope output is
$$
E_\ast(b)
\le
E_B(b)+s_\#E_T(b)+S_\#K_\Gamma E_Q(b).
$$
If the branch-sum row supplies
$$
E_T(b)\le C_T^-H_b+C_T^+E_Q^+,
\qquad
E_B(b)\le C_B^-H_b+C_B^+E_Q^+,
$$
and tangential transport supplies $E_Q^+\le K_QE_T(b)$ or a direct propagated
bound, then this row is the algebraic assembly that can be compared to the
base residual lower bound $\rho_\ast$.

The first-variation assembly gives the constant $C_1$. For a profile direction
$v$,
$$
\delta\mathcal R_R^{\mathrm{tr}}[v]
=
\delta B_Q[v]
-
A\sin\theta\,\delta T_Q[v]
+
2\Gamma(\theta)S_R(\theta)
\frac{\delta Q[v]}{Q(\theta)}.
$$
If
$$
E_Q^{(1)}(b)=\sup_{\|v\|=1}\|\delta Q[v]\|_\infty,
$$
then
$$
C_1
\le
E_B^{(1)}(b)
+
s_\#E_T^{(1)}(b)
+
2\Gamma_\ast\sigma_{\max}^3q_{\min}^{-3}
S_\#E_Q^{(1)}(b).
$$
Here $E_T^{(1)}(b)$ and $E_B^{(1)}(b)$ are the branch-sum first-variation
envelopes supplied by the previous row.

The second-variation assembly gives the constant $C_2$. For directions $v,w$,
$$
\delta^2\mathcal R_R^{\mathrm{tr}}[v,w]
=
\delta^2B_Q[v,w]
-
A\sin\theta\,\delta^2T_Q[v,w]
+
2\Gamma S_R\frac{\delta^2Q[v,w]}{Q}
-
6\Gamma S_R
\frac{\delta Q[v]\delta Q[w]}{Q^2}.
$$
Therefore
$$
C_2
\le
E_B^{(2)}(b)
+
s_\#E_T^{(2)}(b)
+
2\Gamma_\ast\sigma_{\max}^3q_{\min}^{-3}
S_\#E_Q^{(2)}(b)
+
6\Gamma_\ast\sigma_{\max}^3q_{\min}^{-4}
S_\#
\left(E_Q^{(1)}(b)\right)^2,
$$
where $E_Q^{(2)}(b)$ is the transported second-variation envelope and
$E_T^{(2)}(b),E_B^{(2)}(b)$ are the branch-sum second-variation envelopes.
Substituting this into
$$
\|R(p)-R(0)\|_\infty
\le
C_1\|p\|+\frac12C_2\|p\|^2
$$
gives the derivative-form residual envelope, while the finite-amplitude
inequality above gives the direct propagation form.

Use of the row. A successful substituted-radial row should report one of two
outputs on the same boxes and perturbation radius $b$: either a direct
$E_\ast(b)$ or derivative constants $C_1,C_2$. The row is obstruction-ready
only if the reported constants satisfy
$$
E_\ast(b)<\rho_\ast
$$
or, in derivative form,
$$
C_1b+\frac12C_2b^2<\rho_\ast.
$$
If the inequality fails because the branch-sum or transport terms are too
large, the failure is a concrete finite-amplitude channel candidate. If it
fails because $q_{\min}$, $J$, $D_\alpha$, or inactive gaps cannot be kept
outward-certified, the blocker belongs to the admissibility row rather than to
the residual algebra.

## Admissibility Row Advance

Claim level. This admissibility row is priority-only and conditional. It is the
shared legality certificate for the retained perturbation class, not a residual
estimate by itself. It becomes theorem-useful only when it is paired with the
retained-root, tangential-transport, branch-sum, and substituted-radial
constants on the same interval boxes and perturbation radius $b$.

The admissibility contract has one input class and one box system. The input
class is
$$
\mathcal A_b
=
\left\{
p:\ \|p\|\le b,\quad q_p=q_0+Np,\quad
p\text{ satisfies the homogeneous endpoint-slope-cancelled rows}
\right\},
$$
where the homogeneous rows are
$$
h_p'(0)=0,\qquad
h_p(\Delta_\alpha)=0,\qquad
\int_0^{\Delta_\alpha}h_p(x)\,dx=0,
$$
$$
h_p'(\Delta_R)=0,\qquad
h_p''(\Delta_R)=0,\qquad
\sum_\alpha C_\alpha h_p'(\Delta_\alpha)=0.
$$
The box system consists of collar boxes $\Theta_i\subset I_c$, retained root
windows $W_\alpha$, source intervals
$[\theta-\Delta,\theta]$, and inactive complement boxes
$G_\beta$ covering the non-retained root search region.

First, positivity must hold on the past and future parts of the transported
profile. If
$$
H_b
=
\sup_{p\in\mathcal A_b}
\|q_p-q_0\|_{L^\infty([-\Delta_R,0])},
\qquad
E_Q^+
=
\sup_{p\in\mathcal A_b}
\|Q_p-Q_0\|_{L^\infty(I_c)},
$$
then a sufficient positivity contract is
$$
\inf_{[-\Delta_R,0]}q_0-H_b\ge q_{\min}>0,
\qquad
\inf_{I_c}Q_0-E_Q^+\ge q_{\min}>0,
$$
with corresponding upper bounds
$$
\sup_{[-\Delta_R,0]}q_0+H_b\le q_{\max},
\qquad
\sup_{I_c}Q_0+E_Q^+\le q_{\max}.
$$
This supplies the $q_{\min}$ and $q_{\max}$ used by all denominator and
force-ratio estimates above. The current sampled diagnostic convention uses
$q_{\min}=0.2$ and $q_{\max}=3.0$; the interval row must replace those sampled
checks by outward-certified bounds.

Second, the retained active roots must stay in their declared windows. If
$E_{\Delta,\alpha}(b)$ is the root-offset envelope from the retained-root row
and
$$
\kappa_\alpha
=
\inf_{\theta\in I_c}
\min\{\Delta_{\alpha,0}(\theta)-\ell_\alpha,\,
u_\alpha-\Delta_{\alpha,0}(\theta)\},
$$
then the active-window condition is
$$
E_{\Delta,\alpha}(b)<\kappa_\alpha
\qquad
(\alpha\in\{P_1,P_2,S_1,P_3\}).
$$
This preserves the retained labels and prevents active-root migration out of
the branch-sum boxes.

Third, inactive roots must remain absent. On every inactive complement box
$G_\beta$, define the seed gap
$$
g_\beta
=
\inf_{(\theta,\Delta)\in G_\beta}
|\Phi_\beta(\theta,\Delta,Q_0)|.
$$
The profile-memory perturbation bound on that box is
$$
\eta_\beta(b)
=
\frac{\Delta_{\beta,\max}}{b_\ast\sigma_{\min}}
\varepsilon_Q(b),
$$
where $\varepsilon_Q(b)$ is the same memory-segment profile envelope used by
the retained-root row. A sufficient inactive-gap condition is
$$
\eta_\beta(b)<g_\beta
\qquad
\text{for every inactive complement }G_\beta.
$$
Equivalently, the row may report separate partner and self inactive gaps
$$
|\Phi_{\mathrm{partner}}|\ge g_P>0,
\qquad
|\Phi_{\mathrm{self}}|\ge g_S>0,
$$
or an interval no-root sign/bracketing certificate on the full complement of
the retained windows.
Together with the active-window condition, this certifies the retained $3+1$
ledger on the declared collar.

Fourth, the source-speed Jacobian and retained-root denominator floors must be
kept on the same boxes. If the seed branch-weight Jacobian has floor
$j_{\alpha,0}$ and the branch-sum row supplies Lipschitz envelopes
$L_{\alpha,\Delta}^J$ and $L_{\alpha,s}^J$, then a sufficient floor condition
is
$$
j_{\alpha,0}
-
L_{\alpha,\Delta}^J E_{\Delta,\alpha}(b)
-
L_{\alpha,s}^J
\left(E_Q^+ + H_b+Q'_{s,\alpha}E_{\Delta,\alpha}(b)\right)
\ge
\nu_\alpha>0.
$$
The retained-root denominator floor then follows from the identity
$$
|D_{\alpha,p}|
\ge
\frac{q_{\min}\nu_\alpha}{b_\ast\sigma_{\max}}.
$$

Fifth, finite memory and transport well-posedness must be certified. The finite
memory condition is
$$
\theta-\Delta_{\alpha,p}(\theta)\in[-\Delta_R,\theta]
\qquad
(\theta\in I_c,\ \alpha\in\{P_1,P_2,S_1,P_3\}),
$$
with all inactive search boxes also covered by the declared profile domain.
Tangential transport is well-posed on $I_c$ once the previous positivity,
Jacobian, and branch-sum bounds make the right-hand side of
$$
Q_p'
=
2A\sin\theta\,Q_p
-
\frac{Q_p^3}{\Gamma_\ast\sigma^3}T_{Q,p}
$$
bounded and locally Lipschitz on the same boxes, and the positivity inequalities
prevent the solution from leaving $[q_{\min},q_{\max}]$.

Finally, the retained ledger itself must be reported on every collar box:
$$
\#\{\text{partner roots}\}=3,
\qquad
\#\{\text{self roots}\}=1,
$$
with labels matching $P_1,P_2,P_3,S_1$ and no retained-row failures.

Use of the row. A successful admissibility row should report the largest
declared radius $b$ or a tested radius ladder for which all inequalities above
hold on the same outward boxes used by the residual-envelope constants. If the
row passes and the substituted-radial row gives $E_\ast(b)<\rho_\ast$, the A1
collar has an interval obstruction on $\mathcal A_b$. If the row passes but
the residual inequality fails through a specific large term, the failure is a
legal finite-amplitude channel candidate. If the row fails, the failure should
be classified as one of: positivity loss, root-window escape, inactive-gap
birth, Jacobian-floor loss, finite-memory escape, or transport exit from the
declared profile bounds.

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
