# VP-1 Receiver-Normal Tangential-Drive Target

Status. Receiver-normal restart target for the VP-1 weighted tangential-drive row on
the retained $P_1,P_2,P_3,S_1$ chart. This packet no longer supplies a
tangential pass, failure, pointwise sign certificate, or weighted-drive verdict.

Claim level. Restart target, not force/action evidence.

## Retained Chart

The candidate history and corridor remain the VP-1 root-geometry target:
$$
a=\frac{1}{10},
\qquad
b_\ast=\frac{7}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right].
$$

The active labels remain
$$
P_1,\ P_2,\ P_3,\ S_1.
$$

## Receiver-Normal Row

For each retained label $\alpha$, the tangential contribution must be recomputed
with
$$
W_{\alpha}^{\mathrm{rec}}
=
\left|D_{t,\alpha}/D_{s,\alpha}\right|
$$
on the same retained root box as the topology certificate. The weighted
tangential-drive row is then the outward interval integral of the recomputed
receiver-normal tangential sum over $I_\ast$.

The required packet must report:

| Evidence row | Required content |
| --- | --- |
| retained box | same root box used by the topology certificate |
| $D_s$ | source-normal interval and nonzero floor |
| $D_t$ | receiver-normal interval |
| $W^{\mathrm{rec}}$ | outward-rounded branch-strength interval |
| tangential contribution | recomputed interval using $W^{\mathrm{rec}}$ |
| weighted aggregation | receiver-normal drive interval on $I_\ast$ |
| negative control | row fails closed when $D_t$ is absent or mismatched |

## Promotion Rule

No VP-1 tangential-drive row may pass or fail until the weighted drive interval
is recomputed from same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows for all
retained labels.
