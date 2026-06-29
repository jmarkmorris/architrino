# Spiral A1 Receiver-Normal Variable-Rate Turn Target

Status. Current-law continuation target for nonconstant angular-rate A1
histories. This file carries no pass/fail verdict.

Claim level. Restart target, not an existence certificate.

For a variable angular rate with
$$
\omega_\ast=\dot\theta(0)>0,
\qquad
\alpha_\ast=\ddot\theta(0),
$$
and retained radial curve
$$
r(\theta)=r_\ast\exp(a(1-\cos\theta)),
\qquad
a=0.204,
$$
the turn-center kinematics give
$$
a_r(0)=(a-1)r_\ast\omega_\ast^2,
\qquad
a_\theta(0)=r_\ast\alpha_\ast.
$$

The branch side must be recomputed with receiver-normal branch strengths:
$$
B_r^{\mathrm{rec}}(C_{\mathrm{A1}};0),
\qquad
T_0^{\mathrm{rec}}(C_{\mathrm{A1}}).
$$

Only after those intervals are emitted may the local continuation equations be
tested:
$$
B_r^{\mathrm{rec}}(C_{\mathrm{A1}};0)=(a-1)\Gamma_\ast,
\qquad
T_0^{\mathrm{rec}}(C_{\mathrm{A1}})
=
\Gamma_\ast\frac{\alpha_\ast}{\omega_\ast^2},
\qquad
\Gamma_\ast=\frac{r_\ast^3\omega_\ast^2}{\kappa q_1^2}.
$$

The nonconstant time-law chart must then recompute the delayed roots and
receiver-normal strengths for that time law; retaining constant-rate offsets is
not evidence by itself.
