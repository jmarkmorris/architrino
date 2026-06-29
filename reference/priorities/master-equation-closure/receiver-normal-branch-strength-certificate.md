# Receiver-Normal Branch-Strength Certificate

Status. Required certificate target for receiver-normal Master EOM force/action rows.
This is a priority certificate target, not a branch pass by itself.

Claim level. Minimum admissible branch-strength row for the receiver-normal
Master EOM. A retained branch cannot supply force balance, action, power,
Noether wake-history, A1 outward constants, breather margin, or pass/fail
evidence until it reports the rows below on the same retained record.

Pure changeover blocker. This file defines the certificate shape; it does not
yet populate an accepted retained branch. A solver, vendor proposal, or proof
packet satisfies the changeover only when it fills this schema for one retained
A1, VP-1, breather, circular, or equivalent branch and shows that the
force/action row uses receiver-normal $W^{\mathrm{rec}}$ rather than a
source-normal proxy.

Vendor/proof intake rule. A proposal may choose the smallest branch family that
can be reproduced independently, but its first force/action deliverable is this
certificate packet: branch identity, same-record $D_s$, $D_t$,
$W^{\mathrm{rec}}$, sign/fold status, retained/rejected branch status, and a
negative control that fails if receiver-normal branch strength is replaced.

## Branch Row

For source $j$, receiver $i$, retained branch label $\alpha$, and causal root
$s_\alpha(t)$, define
$$
D_{s,\alpha}
=
c_f-\hat{\mathbf r}_{\alpha}\cdot\mathbf v_j(s_\alpha),
\qquad
D_{t,\alpha}
=
c_f-\hat{\mathbf r}_{\alpha}\cdot\mathbf v_i(t),
$$
and
$$
W_{\alpha}^{\mathrm{rec}}
=
\left|D_{t,\alpha}/D_{s,\alpha}\right|.
$$
The corresponding branch acceleration row has the form
$$
\mathbf a_{i,\alpha}^{\mathrm{rec}}
=
\frac{\kappa\,\sigma_{ij}|q_iq_j|}{\mu_{\mathrm{arch}}}
\frac{W_{\alpha}^{\mathrm{rec}}}{r_{\alpha}^2}
\hat{\mathbf r}_{\alpha}.
$$

This row keeps the source-normal denominator and receiver-normal numerator
separate. $D_s$ is the simple-root transversality field. $D_t$ is the receiver
sampling field. $W^{\mathrm{rec}}$ is the branch-strength field.

## Required Same-Record Fields

| Field | Requirement |
| --- | --- |
| Retained root id | Stable label for the causal-root row consumed by the force/action row. |
| Source and receiver ids | Ordered pair $(i,j)$ with polarity sign and charge magnitudes. |
| Time row | Receiver time $t$ and source time $s_\alpha(t)$ or bounded interval. |
| Geometry row | $r_\alpha$, $\hat{\mathbf r}_\alpha$, and the source-to-receiver convention. |
| Source-normal row | Interval for $D_{s,\alpha}$ and the active transversality floor. |
| Receiver-normal row | Interval for $D_{t,\alpha}$ on the same retained box. |
| Branch-strength row | Interval for $W_{\alpha}^{\mathrm{rec}}=\lvert D_{t,\alpha}/D_{s,\alpha}\rvert$. |
| Projection rows | Radial and tangential projections computed from the same force/action row. |
| Aggregation row | Branch-family sum that names exactly which retained rows were consumed. |
| Scalar statistic row | Any margin, constant, threshold, or pass/fail statistic derived from the aggregation row. |
| Negative controls | Fail-closed controls listed below. |
| Source artifact hash | Stable input artifact, solver version, or proof packet identifier. |
| Regulator state | Declared $\eta$, $\epsilon_c$, fold, caustic, or simple-root status. |

## Fail-Closed Controls

The certificate must reject:

- a row with missing $D_t$;
- a row where $D_s$, $D_t$, and $W^{\mathrm{rec}}$ come from different retained
  records or different boxes;
- a row that substitutes a source-normal denominator for branch strength;
- a topology-only row used as force/action evidence;
- a stationary-receiver reduction that was not derived by direct substitution
  inside the declared retained row;
- an aggregation row whose retained-row list differs from the scalar statistic
  row.

## Restart Order

The first certificate target may come from a breather row, an A1/VP-1 retained
label, or another retained candidate. The circular benchmark is not the preferred
target unless it emits the same-record receiver-normal rows above.

Promotion rule. No force/action conclusion, radial or tangential verdict,
outward constant, breather recapture margin, action row, power row, or Noether
wake-history row may promote without this same-record certificate.
