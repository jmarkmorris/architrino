# Spiral A1 Receiver-Normal Drive Target

Status. Current-law drive target for the A1 retained chart. This file carries no
active radial-threshold, tangential-drive, force/action, or pass/fail verdict.
It defines only the candidate row and the receiver-normal evidence needed before
drive rows can be recomputed.

Claim level. Restart target, not a certificate.

## Candidate Row

The retained A1 candidate row is
$$
a_{\mathrm{A1}}=0.204,
\qquad
b_\ast=\frac{7}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right].
$$

The retained active labels are
$$
P_1,\ P_2,\ P_3,\ S_1.
$$

The companion topology source is
[spiral-a1-root-window-certificate.md](spiral-a1-root-window-certificate.md).
It may provide active windows, inactive-gap rows, finite-memory control, and
source-normal floors, but it does not provide drive evidence by itself.

## Drive Rebuild Rule

For each retained label $\alpha$, recompute the radial and tangential
contribution rows from
$$
W_{\alpha}^{\mathrm{rec}}
=
\left|
\frac{c_f-\hat{\mathbf r}_{\alpha}\cdot\mathbf v_{\mathrm{recv},\alpha}}
{c_f-\hat{\mathbf r}_{\alpha}\cdot\mathbf v_{\mathrm{src},\alpha}}
\right|.
$$

The rebuilt drive packet must report:

| Evidence row | Required content |
| --- | --- |
| retained box | same $I_\ast\times W_\alpha$ box used by the topology row |
| $D_s$ | source-normal interval and floor |
| $D_t$ | receiver-normal interval |
| $W^{\mathrm{rec}}$ | outward-rounded receiver-normal strength interval |
| radial contribution | recomputed radial interval on the same box |
| tangential contribution | recomputed tangential interval on the same box |
| aggregation | branch-sum interval with no sampled-only promotion |
| negative control | row fails closed when $D_t$ is missing, mismatched, or nonfinite |

## Promotion Rule

No A1 drive row may pass, fail, or guide search until the table above is emitted
and consumed on the same retained record.
