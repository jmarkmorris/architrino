# Spiral A1 Receiver-Normal Restart Report

Status. Current-law restart report for the A1 retained chart. This file carries
no radial-turn, tangential-drive, tangential-compatibility, force/action, or
pass/fail verdict. The retained topology inputs may be reused only as
conditional inputs until the same retained boxes emit receiver-normal branch
rows.

Claim level. Restart target, not a certificate. A1 can move again only after a
same-box receiver-normal branch table exists for every retained label.

## Retained Inputs

The retained candidate labels remain
$$
P_1,\ P_2,\ P_3,\ S_1.
$$

The retained topology sources are:

| Source | Conditional input allowed |
| --- | --- |
| [spiral-a1-current-interval-rows.json](spiral-a1-current-interval-rows.json) | retained label inventory and sidecar schema only |
| [spiral-a1-root-window-certificate.md](spiral-a1-root-window-certificate.md) | active-root windows, inactive-gap rows, source-normal floors, self-coincidence clearance, and finite-memory rows |
| [spiral-a1-root-transport-interval-proof.md](spiral-a1-root-transport-interval-proof.md) | root-offset transport on the retained chart |

None of these rows is a force/action certificate until paired with
receiver-normal branch strength.

## Required Receiver-Normal Table

For each retained label $\alpha\in\{P_1,P_2,P_3,S_1\}$, the restart table must
report on the same retained box:
$$
D_{s,\alpha}
=
c_f-\hat{\mathbf r}_{\alpha}\cdot\mathbf v_{\mathrm{src},\alpha},
\qquad
D_{t,\alpha}
=
c_f-\hat{\mathbf r}_{\alpha}\cdot\mathbf v_{\mathrm{recv},\alpha},
\qquad
W_{\alpha}^{\mathrm{rec}}
=
\left|\frac{D_{t,\alpha}}{D_{s,\alpha}}\right|.
$$

The table must also include:

| Row | Required status before use |
| --- | --- |
| $D_s$ interval | positive source-normal floor on the same box |
| $D_t$ interval | declared receiver-normal numerator interval on the same box |
| $W^{\mathrm{rec}}$ interval | outward-rounded factor interval derived from those two rows |
| branch contribution | radial and tangential contribution intervals recomputed with $W^{\mathrm{rec}}$ |
| negative control | fail-closed row proving that a missing or mismatched $D_t$ invalidates the branch contribution |

## Verdict

A1 is a restart target. The retained chart is not accepted or rejected as a
force-balance row until the receiver-normal table above is emitted and checked
on the same retained boxes.
