# Spiral A1 Retained-Memory First-Order Transport Lemma

Status. Priority proof packet for the first off-center transport consequence of
the A1 retained-memory inverse-rate witness. This packet consumes
[spiral-a1-retained-memory-profile](spiral-a1-retained-memory-profile.md) and
[spiral-a1-nonconstant-time-law-chart](spiral-a1-nonconstant-time-law-chart.md).
It is not a nonconstant A1 orbit certificate and not an interval branch chart.

Claim level. The retained-memory witness removes the first-order
root-transport obstruction at the turn center when it is interpreted as the
restriction of one smooth angular time law. The remaining burden is a finite
$\theta$-collar certificate: retained active roots, inactive gaps, source-speed
Jacobians, finite-memory depth, and force-balance residuals must still be
bounded on an interval.

## Time-Law Notation

Let
$$
f(\theta)=\log\dot\theta(\theta),
\qquad
k(\theta)=f'(\theta),
\qquad
s(\theta)=\frac{d}{d\theta}\log r(\theta)=a\sin\theta.
$$
For the A1 radial curve $a=a_{\mathrm{A1}}=0.204$ and $s(0)=0$. Define the
moving inverse-rate memory ratio
$$
q_\theta(u)
=
\frac{\dot\theta(\theta)}{\dot\theta(\theta-u)}
=
\exp\bigl(f(\theta)-f(\theta-u)\bigr),
$$
and
$$
H(\theta,\Delta)=\int_0^\Delta q_\theta(u)\,du,
\qquad
b(\theta)=\frac{\dot\theta(\theta)r(\theta)}{c_f}.
$$
The nonconstant A1 root equation is
$$
F_\alpha^{\mathrm{nc}}(\theta,\Delta)
=
\Lambda_\alpha(\theta,\Delta)-\frac{H(\theta,\Delta)}{b(\theta)}=0,
$$
where $\alpha$ is one retained partner or self row.

At the turn center the retained-memory witness supplies
$$
q_0(u)=q(u),
\qquad
k_\ast=q_0'(0)
=
\frac{T_0(C_{\mathrm{A1}})}{\Gamma_\ast},
$$
and, for each retained A1 delay $\Delta_\alpha$,
$$
H(0,\Delta_\alpha)=\Delta_\alpha,
\qquad
q_0(\Delta_\alpha)=1.
$$

## Memory-Derivative Cancellation

If $q_0$ comes from a single smooth time law, then differentiating
$q_\theta(u)=\exp(f(\theta)-f(\theta-u))$ at $\theta=0$ gives
$$
\left.\partial_\theta q_\theta(u)\right|_{\theta=0}
=
k_\ast q_0(u)-q_0'(u),
$$
because $q_0'(u)=q_0(u)f'(-u)$. Therefore, at each retained endpoint,
$$
\left.\partial_\theta H(\theta,\Delta_\alpha)\right|_{\theta=0}
=
\int_0^{\Delta_\alpha}\bigl(k_\ast q_0(u)-q_0'(u)\bigr)\,du
=
k_\ast\Delta_\alpha-\bigl(q_0(\Delta_\alpha)-q_0(0)\bigr)
=
k_\ast\Delta_\alpha.
$$
Since
$$
\left.\frac{b'(\theta)}{b(\theta)}\right|_{\theta=0}
=
k_\ast+s(0)=k_\ast,
$$
the time-law contribution to the root equation has zero first
$\theta$-derivative at every retained endpoint:
$$
\left.
\partial_\theta\left(\frac{H(\theta,\Delta_\alpha)}{b(\theta)}\right)
\right|_{\theta=0}
=
\frac{k_\ast\Delta_\alpha}{b_\ast}
-
\frac{\Delta_\alpha k_\ast}{b_\ast}
=0.
$$
Thus
$$
\partial_\theta F_\alpha^{\mathrm{nc}}(0,\Delta_\alpha)
=
\partial_\theta\Lambda_\alpha(0,\Delta_\alpha).
$$
Also
$$
\partial_\Delta H(0,\Delta_\alpha)=q_0(\Delta_\alpha)=1,
$$
so
$$
\partial_\Delta F_\alpha^{\mathrm{nc}}(0,\Delta_\alpha)
=
\partial_\Delta\Lambda_\alpha(0,\Delta_\alpha)-\frac{1}{b_\ast},
$$
the same first derivative used by the retained constant-rate chart. Equivalently,
the active A1 source-speed Jacobians and simple-root denominators are unchanged
at $\theta=0$.

Equivalently, write the same sliding-window memory in absolute inverse-rate
form:
$$
Q(\theta)=\frac{\omega_\ast}{\dot\theta(\theta)},
\qquad
\sigma(\theta)=\frac{r(\theta)}{r_\ast}=\exp(a(1-\cos\theta)),
$$
and
$$
K_Q(\theta,\Delta)=\int_{\theta-\Delta}^{\theta}Q(\phi)\,d\phi.
$$
Then
$$
\frac{H(\theta,\Delta)}{b(\theta)}
=
\frac{K_Q(\theta,\Delta)}{b_\ast\sigma(\theta)},
$$
and the transported root equation can be written as
$$
F_{\alpha,Q}(\theta,\Delta)
=
\Lambda_\alpha(\theta,\Delta)
-
\frac{K_Q(\theta,\Delta)}{b_\ast\sigma(\theta)}=0.
$$
At the retained turn-center offsets,
$$
K_Q(0,\Delta_\alpha)=\Delta_\alpha,
\qquad
\partial_\theta K_Q(0,\Delta_\alpha)
=
Q(0)-Q(-\Delta_\alpha)=0.
$$
Thus the moving-window memory obstruction begins at second order:
$$
K_Q(\theta,\Delta_\alpha)-\Delta_\alpha
=
\frac12\bigl(-k_\ast+q_0'(\Delta_\alpha)\bigr)\theta^2
+O(\theta^3).
$$
This formula is not a no-go; it identifies the first curvature term that a
finite-collar evaluator must bound.

## First-Order Transport Consequence

On any retained simple root,
$$
\Delta_\alpha'(\theta)
=
-
\frac{\partial_\theta F_\alpha^{\mathrm{nc}}}
{\partial_\Delta F_\alpha^{\mathrm{nc}}}.
$$
The cancellation above implies that, at $\theta=0$, the nonconstant retained
profile inherits the same first-order root-offset transport row as the
constant-rate A1 branch:
$$
\Delta_\alpha'(0)
=
-
\frac{\partial_\theta\Lambda_\alpha(0,\Delta_\alpha)}
{\partial_\Delta\Lambda_\alpha(0,\Delta_\alpha)-1/b_\ast}.
$$

The physical velocity form of the same row is slightly modified away from the
turn center by the endpoint speed ratio
$$
q_\alpha(\theta)=q_\theta(\Delta_\alpha(\theta)).
$$
With
$$
\beta_{i,\alpha}
=
\frac{\hat{\mathbf r}_\alpha\cdot\mathbf v_i}{c_f},
\qquad
\beta_{j,\alpha}
=
\frac{\hat{\mathbf r}_\alpha\cdot\mathbf v_{j_\alpha}}{c_f},
\qquad
J_\alpha=1-\beta_{j,\alpha},
$$
differentiating the physical causal-delay equation gives
$$
q_\alpha J_\alpha\bigl(1-\Delta_\alpha'(\theta)\bigr)
-
\bigl(1-\beta_{i,\alpha}\bigr)
=0.
$$
At $\theta=0$, the retained endpoint condition $q_\alpha(0)=1$ reduces this to
the already-certified A1 transport identity.

In the $Q$ notation, if
$$
u_s(\theta,\Delta)=\frac{\dot\theta(\theta-\Delta)}{\omega_\ast}
=
\frac{1}{Q(\theta-\Delta)},
$$
then the nonconstant source-speed Jacobian identity is
$$
J_{\alpha,Q}
=
-
b_\ast\sigma(\theta)u_s(\theta,\Delta)\,
\partial_\Delta F_{\alpha,Q}.
$$
On an active root,
$$
\Delta_\alpha'(\theta)
=
\frac{b_\ast\sigma(\theta)u_s(\theta,\Delta_\alpha)}
{J_{\alpha,Q}}\,
\partial_\theta F_{\alpha,Q}.
$$

## Force-Balance Collar Still Open

The first-order transport lemma does not close the nonconstant A1 history.
For an isolated two-body branch on a finite $\theta$ interval, the force rows
must satisfy the nonconstant kinematic balances
$$
B_r^{\mathrm{nc}}(\theta)
=
\Gamma(\theta)
\left(s'(\theta)+s(\theta)^2+s(\theta)k(\theta)-1\right),
$$
and
$$
T^{\mathrm{nc}}(\theta)
=
\Gamma(\theta)\bigl(k(\theta)+2s(\theta)\bigr),
$$
where
$$
\Gamma(\theta)
=
\frac{r(\theta)^3\dot\theta(\theta)^2}{\kappa q_1^2},
\qquad
\frac{\Gamma'(\theta)}{\Gamma(\theta)}=3s(\theta)+2k(\theta).
$$
In $Q$ notation this is
$$
\Gamma(\theta)=\Gamma_\ast\frac{\sigma(\theta)^3}{Q(\theta)^2}.
$$
The tangential balance can be read as a transport equation for $Q$:
$$
Q'(\theta)
=
2s(\theta)Q(\theta)
-
\frac{Q(\theta)^3}{\Gamma_\ast\sigma(\theta)^3}
T_Q(\theta).
$$
After that tangential equation chooses the local inverse-rate slope, the radial
row becomes the residual check
$$
\mathcal R_R(\theta)
=
B_Q(\theta)
-
\Gamma(\theta)
\left(s'(\theta)+s(\theta)^2-1-s(\theta)\frac{Q'(\theta)}{Q(\theta)}\right).
$$
At $\theta=0$ these reduce to the retained-memory witness equations. Off the
turn center, the branch certificate must recompute the active delays
$\Delta_\alpha(\theta)$, the source-speed Jacobians, inactive gaps, and force
residual intervals using the same $q_\theta$ family.

## Next Certificate Target

The next closure artifact is a finite-collar A1 retained-memory certificate on
some interval $I_\delta=[-\delta,\delta]$. It should report:

1. a positive $C^2$ time law whose turn-center restriction is the retained
   polynomial witness;
2. retained active root windows for $P_1,P_2,P_3,S_1$ under
   $F_\alpha^{\mathrm{nc}}=0$;
3. positive active Jacobian floors using the nonconstant source-speed factors;
4. inactive partner and self root gaps below the declared memory horizon;
5. the generalized root-transport residual
   $q_\alpha J_\alpha(1-\Delta_\alpha')-(1-\beta_{i,\alpha})$;
6. interval radial and tangential balance residuals for the two equations above.

A pass would convert A1 from a turn-center witness into a local nonconstant
branch candidate. A failure would be valuable only if it isolates one of these
rows with an outward interval obstruction over a stated function class.

## Promotion Decision

- Ontology: none added.
- Derivation/closure target: the retained-memory witness now has a
  first-order off-center transport lemma at $\theta=0$.
- Effective summary: A1 is no longer blocked at the pointwise memory equations
  or at first-order root transport; the open burden is the finite $\theta$-collar
  branch chart.
- Speculation: no orbit stability, interval existence, or global non-circular
  closure is claimed.

Promotion decision. Promote the scoped first-order transport consequence into
[master-equation](../../../content/markdown/aaa/dynamics/master-equation.md).
Keep the finite-collar certificate target priority-only until an interval
packet supplies retained windows, inactive gaps, Jacobian floors, and force
residual intervals.
