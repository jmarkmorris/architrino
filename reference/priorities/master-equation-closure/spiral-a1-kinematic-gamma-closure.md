# Spiral A1 Receiver-Normal Kinematic Balance Target

Status. Current-law kinematic-balance target for the A1 retained chart. This
file does not certify a radial-turn row. It records the kinematic demand that a
receiver-normal force row must satisfy after the A1 branch contributions are
redriven with $W^{\mathrm{rec}}$.

Claim level. Restart target, not closure evidence.

## Candidate Kinematics

The A1 candidate history is
$$
r(\theta)=r_\ast\exp(a(1-\cos\theta)),
\qquad
t(\theta)=\frac{\theta}{\Omega},
\qquad
a=0.204,
\qquad
\theta_\ast=0.
$$

At the turn center,
$$
r'(0)=0,
\qquad
\frac{r''(0)}{r_\ast}=a,
\qquad
\dot r(0)=0,
\qquad
\frac{\ddot r(0)}{r_\ast}=a\Omega^2.
$$

The polar radial acceleration demand is
$$
a_r(0)=r_\ast\Omega^2(a-1).
$$

This is only the prescribed-history kinematic demand. It is not a force row
until the retained A1 branch table supplies receiver-normal branch strengths.

## Required Force Row

The radial branch side must be recomputed as
$$
a_r^{\mathrm{branch}}(0)
=
\frac{\kappa q_1^2}{r_\ast^2}
B_r^{\mathrm{rec}}(C_{\mathrm{A1}};0),
$$
where $B_r^{\mathrm{rec}}$ is the radial branch sum obtained from the same-box
receiver-normal factors for $P_1,P_2,P_3,S_1$.

Only after $B_r^{\mathrm{rec}}$ is emitted may the normalized balance
$$
B_r^{\mathrm{rec}}(C_{\mathrm{A1}};0)=(a-1)\Gamma,
\qquad
\Gamma=\frac{r_\ast^3\Omega^2}{\kappa q_1^2}
$$
be tested.

## Promotion Rule

This packet cannot supply `gamma_source`, radial pass/fail status, or prescribed
history rejection by itself. It becomes usable only after
[spiral-a1-drive-interval-target.md](spiral-a1-drive-interval-target.md) emits
the receiver-normal branch table and the resulting $B_r^{\mathrm{rec}}$ interval
on the same retained record.
