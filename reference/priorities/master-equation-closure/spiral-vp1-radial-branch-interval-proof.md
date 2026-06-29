# VP-1 Receiver-Normal Radial Branch Target

Status. Receiver-normal restart target for the VP-1 radial branch row at
$\theta_\ast=0$ on the retained $P_1,P_2,P_3,S_1$ chart. This packet no longer
supplies a radial pass, failure, branch-sum interval, or force-ratio decision.

Claim level. Restart target, not force/action evidence.

## Retained Root Geometry

The retained VP-1 topology remains useful:
$$
P_1,\ P_2,\ P_3,\ S_1,
\qquad
a=\frac{1}{10},
\qquad
b_\ast=\frac{7}{2},
\qquad
\theta_\ast=0.
$$

The existing root-window and Jacobian-floor packets may still constrain the
retained chart. They do not determine radial force strength by themselves.

## Receiver-Normal Row

For each retained label $\alpha$, the radial contribution must be recomputed
from the same retained record using
$$
W_{\alpha}^{\mathrm{rec}}
=
\left|D_{t,\alpha}/D_{s,\alpha}\right|.
$$

The required radial packet must report:

| Evidence row | Required content |
| --- | --- |
| retained box | same root box used by the topology certificate |
| $D_s$ | source-normal interval and nonzero floor |
| $D_t$ | receiver-normal interval |
| $W^{\mathrm{rec}}$ | outward-rounded branch-strength interval |
| radial contribution | recomputed interval using $W^{\mathrm{rec}}$ |
| aggregation | $B_r^{\mathrm{rec}}(0)$ interval |
| negative control | row fails closed when $D_t$ is absent or mismatched |

## Promotion Rule

No VP-1 radial-turn row may pass, fail, or enter a force-ratio comparison until
the retained chart emits $B_r^{\mathrm{rec}}(0)$ from same-record $D_s$, $D_t$,
and $W^{\mathrm{rec}}$ intervals.
