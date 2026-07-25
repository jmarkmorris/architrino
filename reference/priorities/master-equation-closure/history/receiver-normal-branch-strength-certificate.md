# Receiver-Normal Branch-Strength Certificate

Status. Required certificate target for receiver-normal Master EOM force/action rows.
This is a priority certificate target, not a branch pass by itself.

Claim level. Minimum admissible branch-strength row for the receiver-normal
Master EOM. A retained branch cannot supply force balance, action, power,
Noether wake-history, A1 outward constants, breather margin, or pass/fail
evidence until it reports the rows below on the same retained record.

Pure changeover status. This file defines the certificate shape and a
priority-only retained branch-family first-derivative evidence target. It does
not yet populate an A1,
VP-1, breather, circular, eigen-braid, or assembly-closure branch pass. A
solver, vendor proposal, or proof packet satisfies a domain changeover only
when it fills this schema for its retained branch family and shows that the
force/action row uses receiver-normal $W^{\mathrm{rec}}$ rather than a
source-normal proxy.

Vendor/proof intake rule. A proposal may choose the smallest branch family that
can be reproduced independently, but its first force/action deliverable is this
certificate packet: branch identity, same-record $D_s$, $D_T$,
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
D_{T,\alpha}
=
c_f-\hat{\mathbf r}_{\alpha}\cdot\mathbf v_i(t),
$$
and
$$
W_{\alpha}^{\mathrm{rec}}
=
\left|D_{T,\alpha}/D_{s,\alpha}\right|.
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
separate. $D_s$ is the simple-root transversality field. $D_T$ is the receiver
sampling field. $W^{\mathrm{rec}}$ is the branch-strength field.

## Required Same-Record Fields

| Field | Requirement |
| --- | --- |
| Retained root id | Stable label for the causal-root row consumed by the force/action row. |
| Source and receiver ids | Ordered pair $(i,j)$ with polarity sign and charge magnitudes. |
| Time row | Receiver time $t$ and source time $s_\alpha(t)$ or bounded interval. |
| Geometry row | $r_\alpha$, $\hat{\mathbf r}_\alpha$, and the source-to-receiver convention. |
| Source-normal row | Interval for $D_{s,\alpha}$ and the active transversality floor. |
| Receiver-normal row | Interval for $D_{T,\alpha}$ on the same retained box. |
| Branch-strength row | Interval for $W_{\alpha}^{\mathrm{rec}}=\lvert D_{T,\alpha}/D_{s,\alpha}\rvert$. |
| Derivative row | First retained-branch derivative row for $D_s$, $D_T$, $W^{\mathrm{rec}}$, and the receiver-normal force/action kernel when a downstream packet consumes force, action, power, or wake-history derivatives. |
| Projection rows | Radial and tangential projections computed from the same force/action row. |
| Aggregation row | Branch-family sum that names exactly which retained rows were consumed. |
| Scalar statistic row | Any margin, constant, threshold, or pass/fail statistic derived from the aggregation row. |
| Negative controls | Controls required for advancement listed below. |
| Source artifact hash | Stable input artifact, solver version, or proof packet identifier. |
| Regulator state | Declared $\eta$, $\epsilon_c$, fold, caustic, or simple-root status. |

## Minimal Same-Record Derivative Target

Status. Required target for the first receiver-normal derivative row consumed by
force/action packets. This is a certificate target, not a branch pass by itself.
A packet that consumes derivatives must add the derivative row below on its own
retained branch record.

This section is the time-path specialization of
`receiver-normal-retained-branch-family-first-derivative/v0` with $v=t$ and
$D_v=d/dt$. The branch-family artifact below is the finite retained-list object
that derivative-consuming packets must checksum before aggregation.

For a retained simple-root record
$R_\alpha=(i,j,\alpha,t,s_\alpha(t))$, write
$$
\mathbf R_\alpha
=
\mathbf x_i(t)-\mathbf x_j(s_\alpha),
\qquad
r_\alpha=\|\mathbf R_\alpha\|,
\qquad
\hat{\mathbf r}_\alpha=\mathbf R_\alpha/r_\alpha.
$$
The same record must report
$$
D_{s,\alpha}
=
c_f-\hat{\mathbf r}_\alpha\cdot\mathbf v_j(s_\alpha),
\qquad
D_{T,\alpha}
=
c_f-\hat{\mathbf r}_\alpha\cdot\mathbf v_i(t),
\qquad
\dot s_\alpha
=
\frac{D_{T,\alpha}}{D_{s,\alpha}},
$$
and
$$
W_{\alpha}^{\mathrm{rec}}
=
\left|\frac{D_{T,\alpha}}{D_{s,\alpha}}\right|.
$$

The first derivative row is evaluated along the same retained branch:
$$
\dot{\mathbf R}_\alpha
=
\mathbf v_i(t)-\mathbf v_j(s_\alpha)\dot s_\alpha,
\qquad
\dot r_\alpha
=
\hat{\mathbf r}_\alpha\cdot\dot{\mathbf R}_\alpha,
\qquad
\dot{\hat{\mathbf r}}_\alpha
=
\frac{(I-\hat{\mathbf r}_\alpha\hat{\mathbf r}_\alpha^{T})
\dot{\mathbf R}_\alpha}{r_\alpha}.
$$
With the same source and receiver acceleration rows, it must then report
$$
\dot D_{s,\alpha}
=
-\dot{\hat{\mathbf r}}_\alpha\cdot\mathbf v_j(s_\alpha)
-\hat{\mathbf r}_\alpha\cdot\mathbf a_j(s_\alpha)\dot s_\alpha,
\qquad
\dot D_{T,\alpha}
=
-\dot{\hat{\mathbf r}}_\alpha\cdot\mathbf v_i(t)
-\hat{\mathbf r}_\alpha\cdot\mathbf a_i(t).
$$
For the signed ratio $Q_\alpha=D_{T,\alpha}/D_{s,\alpha}$, the derivative row is
$$
\dot Q_\alpha
=
\frac{\dot D_{T,\alpha}D_{s,\alpha}
-D_{T,\alpha}\dot D_{s,\alpha}}
{D_{s,\alpha}^2}.
$$
If the retained interval for $Q_\alpha$ excludes zero, the branch-strength
derivative is
$$
\dot W_{\alpha}^{\mathrm{rec}}
=
\operatorname{sgn}(Q_\alpha)\dot Q_\alpha.
$$
If the retained interval for $Q_\alpha$ contains zero, a derivative-consuming
force/action packet must either declare a nonsmooth crossing row with a bounded
subgradient convention or do not advance for differentiable action use.

The smallest force/action derivative row derived from these fields is
$$
\mathbf B_{\alpha}^{\mathrm{rec}}
=
\frac{W_{\alpha}^{\mathrm{rec}}}{r_\alpha^2}\hat{\mathbf r}_\alpha,
\qquad
\dot{\mathbf B}_{\alpha}^{\mathrm{rec}}
=
\frac{\dot W_{\alpha}^{\mathrm{rec}}}{r_\alpha^2}\hat{\mathbf r}_\alpha
+
\frac{W_{\alpha}^{\mathrm{rec}}}{r_\alpha^2}\dot{\hat{\mathbf r}}_\alpha
-
2\frac{W_{\alpha}^{\mathrm{rec}}\dot r_\alpha}{r_\alpha^3}
\hat{\mathbf r}_\alpha.
$$
Radial and tangential derivative projections may be derived from
$\dot{\mathbf B}_{\alpha}^{\mathrm{rec}}$, but they are not independent rows
unless the consuming packet declares a projection basis and branch-family
aggregation.

Acceptance conditions:

- $D_s$, $D_T$, $W^{\mathrm{rec}}$, $\dot s$, $\dot D_s$, $\dot D_T$,
  $\dot W^{\mathrm{rec}}$, and $\dot{\mathbf B}^{\mathrm{rec}}$ use the same
  retained root id, source/receiver ids, source-to-receiver direction, receiver
  time, source time, retained box, and regulator state.
- The retained row has $r_\alpha>0$, finite velocities and accelerations, a
  nonzero source-normal floor for $D_{s,\alpha}$, and a declared simple-root or
  regulator status.
- The row states whether $Q_\alpha$ is sign-stable. Differentiable force/action
  use requires a sign-stable $Q_\alpha$ interval or an explicit nonsmooth
  crossing convention accepted by the consuming proof packet.
- The source artifact hash identifies the branch-strength row and derivative
  row together; a derivative row emitted from a different solver pass, proof
  packet, finite-difference table, or interpolation grid is not same-record
  evidence.
- Any aggregation, scalar statistic, margin, action residual, power row, or
  wake-history row names exactly the retained derivative rows it consumes.

Failure modes:

- missing $\dot s$, $\dot D_s$, $\dot D_T$, $\dot W^{\mathrm{rec}}$, or
  $\dot{\mathbf B}^{\mathrm{rec}}$ when the consuming packet requires a first
  derivative;
- derivative fields evaluated from a root id, source/receiver id, box,
  direction convention, regulator state, or artifact hash different from the
  branch-strength row;
- finite-difference or interpolated derivative rows without an outward error
  interval and same-record reconstruction of $D_s$, $D_T$, and
  $W^{\mathrm{rec}}$;
- $Q_\alpha$ crossing zero without a declared nonsmooth crossing convention for
  the consuming packet;
- $r_\alpha=0$, nonfinite velocity or acceleration rows, a closed
  source-normal floor, fold/caustic status consumed as a simple-root derivative,
  or a branch exchange inside the retained box;
- radial, tangential, action, power, or wake-history derivative projections that
  consume a derivative row but aggregate a different retained branch list.

## Retained Branch-Family First-Derivative Evidence Artifact

Status. Priority-only evidence target for the first retained branch-family
derivative row. This is the smallest concrete object that can make a
receiver-normal derivative-consuming force/action packet more than prose. It is
not a branch pass by itself and does not promote any A1, VP-1, breather,
circular, eigen-braid, or assembly-closure row.

Artifact id. `receiver-normal-retained-branch-family-first-derivative/v0`.

Claim level. `certificate-target`. The artifact certifies only same-record
binding for the receiver-normal first derivative on a declared retained branch
family. It does not certify force balance, action stationarity, stability,
observer export, or retained-branch promotion.

For a retained branch family $\mathcal{A}_{\mathcal B}$ and a declared
variation $v$, the evidence object is the finite row bundle
$$
\mathcal{E}_{\mathcal B}^{(1)}(v)
=
\left\{
\left(
R_a,
D_{s,a},
D_{T,a},
\zeta_{s,a},
\zeta_{t,a},
W_a^{\mathrm{rec}},
D_vD_{s,a},
D_vD_{T,a},
D_vW_a^{\mathrm{rec}}
\right)
\right\}_{a\in\mathcal{A}_{\mathcal B}},
$$
where $R_a$ is the same retained record consumed by the force/action row:
branch-family id, retained root id, branch label, source/receiver ids,
source-to-receiver direction, receiver time, source time or delay row,
retained box, regulator state, source artifact hash, and the declared variation
coordinate $v$.

On each retained row, fixed sign labels must satisfy
$$
\zeta_{s,a}=\operatorname{sign}D_{s,a},
\qquad
\zeta_{t,a}=\operatorname{sign}D_{T,a},
$$
and
$$
\zeta_{s,a}D_{s,a}\ge D_{s,0}>0,
\qquad
\zeta_{t,a}D_{T,a}\ge D_{T,0}>0
$$
on the same retained box. The receiver-normal branch-strength derivative is
then not an independent fit; it is reconstructed on the same record as
$$
D_vW_a^{\mathrm{rec}}
=
\frac{\zeta_{t,a}\zeta_{s,a}}{D_{s,a}^2}
\left(
D_{s,a}D_vD_{T,a}
-
D_{T,a}D_vD_{s,a}
\right).
$$
Equivalently, on the fixed sign stratum,
$$
D_vW_a^{\mathrm{rec}}
=
W_a^{\mathrm{rec}}
\left(
\frac{D_vD_{T,a}}{D_{T,a}}
-
\frac{D_vD_{s,a}}{D_{s,a}}
\right).
$$

Lemma target: same-record receiver-normal derivative reconstruction. If the
retained row fixes $\zeta_s,\zeta_T$ on its box and emits $D_s$, $D_T$,
$D_vD_s$, and $D_vD_T$ on the same retained record, then the only admissible
receiver-normal branch-strength derivative for a differentiable consumer is the
reconstructed $D_vW^{\mathrm{rec}}$ above. A derivative interval that does not
contain this value exits as
`receiver-normal-derivative-reconstruction-failed`; a derivative interval
computed from another record, box, variation, regulator state, or source
artifact exits as `receiver-normal-derivative-record-mismatch`.

The smallest derivative-consuming force kernel row is
$$
\mathbf B_a^{\mathrm{rec}}
=
\frac{W_a^{\mathrm{rec}}}{r_a^2}\hat{\mathbf r}_a,
$$
with first variation
$$
D_v\mathbf B_a^{\mathrm{rec}}
=
\frac{D_vW_a^{\mathrm{rec}}}{r_a^2}\hat{\mathbf r}_a
+
\frac{W_a^{\mathrm{rec}}}{r_a^2}D_v\hat{\mathbf r}_a
-
2\frac{W_a^{\mathrm{rec}}D_vr_a}{r_a^3}\hat{\mathbf r}_a.
$$
Shell-braid arclength packets use the specialization $r_a=\eta_a$ and
$\hat{\mathbf r}_a=\widehat{\mathbf R}_a$.

The retained branch-family aggregation row is part of the evidence object, not
metadata outside it:
$$
\mathbf B_{\mathcal B}^{\mathrm{rec}}
=
\sum_{a\in\mathcal{A}_{\mathcal B}}\mathbf B_a^{\mathrm{rec}},
\qquad
D_v\mathbf B_{\mathcal B}^{\mathrm{rec}}
=
\sum_{a\in\mathcal{A}_{\mathcal B}}D_v\mathbf B_a^{\mathrm{rec}}.
$$
Every scalar statistic, margin, action residual, power row, wake-history row,
Lipschitz envelope, or provider handoff that consumes the derivative must name
this exact retained branch list and the exact source artifact hash. A row built
from a different branch list, interpolation grid, finite-difference pass,
terminal aggregate, or replay-only provider surface is not same-record
evidence.

### Required Rows

| Row | Required payload |
| --- | --- |
| `retained_record_key` | Branch-family id, retained root id, branch label, source/receiver ids, direction convention, receiver time, source time or delay row, retained box, regulator state, and source artifact hash. |
| `variation_key` | Declared variation $v$, coefficient norm or time-branch convention, and the consumer rows allowed to use the derivative. |
| `receiver_normal_fields` | $D_{s,a}$, $D_{T,a}$, $\zeta_{s,a}$, $\zeta_{t,a}$, $W_a^{\mathrm{rec}}$, and sign-stratum floors on the same retained box. |
| `receiver_normal_derivatives` | $D_vD_{s,a}$, $D_vD_{T,a}$, and reconstructed $D_vW_a^{\mathrm{rec}}$ with outward intervals. |
| `geometry_derivatives` | $D_vr_a$ and $D_v\hat{\mathbf r}_a$, or the shell-braid arclength equivalents $D_v\eta_a$ and $D_v\widehat{\mathbf R}_a$. |
| `force_kernel_derivative` | $\mathbf B_a^{\mathrm{rec}}$ and $D_v\mathbf B_a^{\mathrm{rec}}$ computed from the same rows. |
| `branch_family_checksum` | Exact retained branch list $\mathcal{A}_{\mathcal B}$, aggregation convention, and consumer checksum tying every downstream statistic to that list. |
| `negative_controls` | Controls required for advancement below, including aggregate-only and source-normal-diagnostic substitutions. |

### Verification Required for Advancement Ledger

The artifact fails with:

| Status | Meaning |
| --- | --- |
| `receiver-normal-first-derivative-row-missing` | A derivative-consuming packet lacks $D_vD_s$, $D_vD_T$, or $D_vW^{\mathrm{rec}}$ on the retained row. |
| `receiver-normal-derivative-record-mismatch` | $D_s$, $D_T$, $W^{\mathrm{rec}}$, $D_vD_s$, $D_vD_T$, or $D_vW^{\mathrm{rec}}$ come from different retained records, boxes, variation coordinates, regulator states, or source artifact hashes. |
| `receiver-normal-sign-stratum-open` | The retained row does not fix both $D_s$ and $D_T$ signs or does not declare an accepted nonsmooth crossing convention. |
| `receiver-normal-derivative-reconstruction-failed` | The emitted $D_vW^{\mathrm{rec}}$ interval does not contain the reconstructed value from $D_s$, $D_T$, $D_vD_s$, and $D_vD_T$. |
| `aggregate-only-branch-family-derivative-rejected` | A terminal aggregate, provider replay, lambda witness, scalar statistic, or finite-difference table is supplied after branch identity has been erased. |
| `source-normal-diagnostic-consumed-as-branch-strength` | A row consumes the source-normal transversality diagnostic as receiver-normal branch strength. |
| `branch-family-consumer-checksum-mismatch` | A force, action, power, wake-history, Lipschitz, or scalar row consumes a different retained branch list from the derivative artifact. |

## Verification Required for Advancement Controls

The certificate must reject:

- a row with missing $D_T$;
- a row where $D_s$, $D_T$, and $W^{\mathrm{rec}}$ come from different retained
  records or different boxes;
- a row that substitutes a source-normal diagnostic for receiver-normal branch
  strength;
- a topology-only row used as force/action evidence;
- a stationary-receiver reduction that was not derived by direct substitution
  inside the declared retained row;
- a derivative-consuming force/action row with missing or non-same-record
  variation key, $D_vD_s$, $D_vD_T$, $D_vW^{\mathrm{rec}}$, or
  $D_v\mathbf B^{\mathrm{rec}}$;
- a sign-changing $D_T/D_s$ derivative row treated as differentiable
  force/action evidence without an accepted nonsmooth crossing convention;
- an aggregation row whose retained-row list differs from the scalar statistic
  row.

## Restart Order

The first certificate target may come from a breather row, an A1/VP-1 retained
label, or another retained candidate. The circular benchmark is not the preferred
target unless it emits the same-record receiver-normal rows above.

Promotion rule. No force/action conclusion, radial or tangential verdict,
outward constant, breather recapture margin, action row, power row, or Noether
wake-history row may promote without this same-record certificate.
