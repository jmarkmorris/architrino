# Spiral A1 Receiver-Normal Restart Packet

Status: `active-restart`.

Claim level: priority-only branch restart target. This packet does not certify radial balance, tangential drive, tangential compatibility, action, power, wake-history closure, or a prescribed-history verdict.

## Retained Candidate And Topology Inputs

The retained A1 history is
$$
r(\theta)=r_\ast\exp(a(1-\cos\theta)),
\qquad
t(\theta)=\frac{\theta}{\Omega},
\qquad
a=0.204,
\qquad
b_\ast=\frac{7}{2},
$$
on
$$
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],
$$
with retained labels $P_1,P_2,P_3,S_1$.

The [root-window certificate](spiral-a1-root-window-certificate.md) supplies priority-level active-root, inactive-gap, Jacobian-floor, self-coincidence, and finite-memory rows. The [root-transport packet](spiral-a1-root-transport-interval-proof.md) supplies the differentiated causal-root identity and its residual contract. Those are conditional topology inputs only.

## Turn-Center Kinematic Demand

At $\theta_\ast=0$,
$$
r'(0)=0,
\qquad
\frac{r''(0)}{r_\ast}=a,
\qquad
\dot r(0)=0,
\qquad
\frac{\ddot r(0)}{r_\ast}=a\Omega^2,
$$
so the prescribed-history radial demand is
$$
a_r(0)=r_\ast\Omega^2(a-1).
$$
This is a kinematic row, not a force row.

## Required Receiver-Normal Branch Table

For every retained label $\alpha$, compute on the same retained box
$$
D_{s,\alpha}
=
c_f-\hat{\mathbf r}_\alpha\cdot\mathbf v_j(s_\alpha),
\qquad
D_{T,\alpha}
=
c_f-\hat{\mathbf r}_\alpha\cdot\mathbf v_i(t),
$$
and
$$
W_\alpha^{\mathrm{rec}}
=
\left|\frac{D_{T,\alpha}}{D_{s,\alpha}}\right|.
$$

| Required row | Content |
| --- | --- |
| retained identity | label, source/receiver ids, time row, and root box used by the topology packet |
| source-normal field | outward interval for $D_s$ and positive transversality floor |
| receiver-normal field | outward interval for $D_T$ on the same box |
| branch strength | outward interval for $W^{\mathrm{rec}}$ |
| radial projection | $B_{r,\alpha}^{\mathrm{rec}}$ from the same receiver-normal force row |
| tangential projection | $T_\alpha^{\mathrm{rec}}$ from the same receiver-normal force row |
| aggregation | exact retained-label list and outward branch sums |
| negative controls | fail closed for missing $D_T$, mismatched boxes or records, or a source-normal proxy |

The radial branch side is
$$
B_r^{\mathrm{rec}}(C_{\mathrm{A1}};0)
=
\sum_{\alpha\in\{P_1,P_2,P_3,S_1\}}
B_{r,\alpha}^{\mathrm{rec}}(0).
$$
Only after this interval exists may the normalized balance
$$
B_r^{\mathrm{rec}}(C_{\mathrm{A1}};0)
=
(a-1)\Gamma,
\qquad
\Gamma=\frac{r_\ast^3\Omega^2}{\kappa q_1^2}
$$
be tested against an independently justified $\Gamma$ interval.

Tangential compatibility for the constant-$\Omega$ history requires
$$
T_0^{\mathrm{rec}}(C_{\mathrm{A1}})
=
\sum_{\alpha\in\{P_1,P_2,P_3,S_1\}}
T_\alpha^{\mathrm{rec}}(0)
=0.
$$
A variable-rate turn may be tested only after the same receiver-normal radial and tangential sums are recomputed and then compared with its declared kinematic time law.

## Promotion Rule And Falsifiers

A1 remains a retained topology restart target until the branch table above is populated on one reproducible retained record. No A1 pass, no-go, prescribed-history rejection, outward constant, action result, or user-facing benchmark claim may be inherited from a source-normal or sampled drive row.

The restart fails if any retained topology row changes identity when $D_T$ is added, if $D_s$ loses its floor, if $D_T$ or $W^{\mathrm{rec}}$ is nonfinite or record-mismatched, if aggregation changes the retained label list, or if the result depends on a generated sidecar or sampled ladder that is no longer an active authority.
