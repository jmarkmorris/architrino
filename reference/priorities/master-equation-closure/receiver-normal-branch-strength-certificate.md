# Receiver-Normal Branch-Strength Certificate

Status. Required certificate target for receiver-normal Master EOM force/action rows.
This is a priority certificate target, not a branch pass by itself.

Claim level. Minimum admissible branch-strength row for the receiver-normal
Master EOM. A retained branch cannot supply force balance, action, power,
Noether wake-history, A1 outward constants, breather margin, or pass/fail
evidence until it reports the rows below on the same retained record.

Pure changeover status. This file defines the certificate shape, includes one
accepted analytic row-shape certificate, one accepted nontrivial linear
moving-receiver branch-family fixture, and a priority-only retained
branch-family first-derivative evidence target. It does not yet populate an A1,
VP-1, breather, circular, eigen-braid, or assembly-closure branch pass. A
solver, vendor proposal, or proof packet satisfies a domain changeover only
when it fills this schema for its retained branch family and shows that the
force/action row uses receiver-normal $W^{\mathrm{rec}}$ rather than a
source-normal proxy.

Vendor/proof intake rule. A proposal may choose the smallest branch family that
can be reproduced independently, but its first force/action deliverable is this
certificate packet: branch identity, same-record $D_s$, $D_t$,
$W^{\mathrm{rec}}$, sign/fold status, retained/rejected branch status, and a
negative control that fails if receiver-normal branch strength is replaced.

Breather specialization. The breather consumer of this packet is
[Breather Receiver-Normal Force-Margin Restart Target](../proof-programs/breather-proof/certificate/breather_receiver_normal_force_margin_restart_target.md).
It adds no new branch pass. It states the breather recapture/self-drive margin
equation and keeps the packet fail-closed until the consumed margin rows bind
same-record $D_s$, $D_t$, $W^{\mathrm{rec}}$, $D_vD_s$, $D_vD_t$, and
$D_vW^{\mathrm{rec}}$ to the same retained branch-family checksum.

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
| Derivative row | First retained-branch derivative row for $D_s$, $D_t$, $W^{\mathrm{rec}}$, and the receiver-normal force/action kernel when a downstream packet consumes force, action, power, or wake-history derivatives. |
| Projection rows | Radial and tangential projections computed from the same force/action row. |
| Aggregation row | Branch-family sum that names exactly which retained rows were consumed. |
| Scalar statistic row | Any margin, constant, threshold, or pass/fail statistic derived from the aggregation row. |
| Negative controls | Fail-closed controls listed below. |
| Source artifact hash | Stable input artifact, solver version, or proof packet identifier. |
| Regulator state | Declared $\eta$, $\epsilon_c$, fold, caustic, or simple-root status. |

## Minimal Same-Record Derivative Target

Status. Required target for the first receiver-normal derivative row consumed by
force/action packets. This is a certificate target, not a branch pass by itself.
The accepted row-shape and moving-receiver fixtures above remain validation
evidence for branch-strength binding; a packet that consumes derivatives must
add the derivative row below on its own retained branch record.

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
D_{t,\alpha}
=
c_f-\hat{\mathbf r}_\alpha\cdot\mathbf v_i(t),
\qquad
\dot s_\alpha
=
\frac{D_{t,\alpha}}{D_{s,\alpha}},
$$
and
$$
W_{\alpha}^{\mathrm{rec}}
=
\left|\frac{D_{t,\alpha}}{D_{s,\alpha}}\right|.
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
\dot D_{t,\alpha}
=
-\dot{\hat{\mathbf r}}_\alpha\cdot\mathbf v_i(t)
-\hat{\mathbf r}_\alpha\cdot\mathbf a_i(t).
$$
For the signed ratio $Q_\alpha=D_{t,\alpha}/D_{s,\alpha}$, the derivative row is
$$
\dot Q_\alpha
=
\frac{\dot D_{t,\alpha}D_{s,\alpha}
-D_{t,\alpha}\dot D_{s,\alpha}}
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
subgradient convention or fail closed for differentiable action use.

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

- $D_s$, $D_t$, $W^{\mathrm{rec}}$, $\dot s$, $\dot D_s$, $\dot D_t$,
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

- missing $\dot s$, $\dot D_s$, $\dot D_t$, $\dot W^{\mathrm{rec}}$, or
  $\dot{\mathbf B}^{\mathrm{rec}}$ when the consuming packet requires a first
  derivative;
- derivative fields evaluated from a root id, source/receiver id, box,
  direction convention, regulator state, or artifact hash different from the
  branch-strength row;
- finite-difference or interpolated derivative rows without an outward error
  interval and same-record reconstruction of $D_s$, $D_t$, and
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
circular, H39/theta3minus, eigen-braid, or assembly-closure row.

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
D_{t,a},
\zeta_{s,a},
\zeta_{t,a},
W_a^{\mathrm{rec}},
D_vD_{s,a},
D_vD_{t,a},
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
\zeta_{t,a}=\operatorname{sign}D_{t,a},
$$
and
$$
\zeta_{s,a}D_{s,a}\ge D_{s,0}>0,
\qquad
\zeta_{t,a}D_{t,a}\ge D_{t,0}>0
$$
on the same retained box. The receiver-normal branch-strength derivative is
then not an independent fit; it is reconstructed on the same record as
$$
D_vW_a^{\mathrm{rec}}
=
\frac{\zeta_{t,a}\zeta_{s,a}}{D_{s,a}^2}
\left(
D_{s,a}D_vD_{t,a}
-
D_{t,a}D_vD_{s,a}
\right).
$$
Equivalently, on the fixed sign stratum,
$$
D_vW_a^{\mathrm{rec}}
=
W_a^{\mathrm{rec}}
\left(
\frac{D_vD_{t,a}}{D_{t,a}}
-
\frac{D_vD_{s,a}}{D_{s,a}}
\right).
$$

Lemma target: same-record receiver-normal derivative reconstruction. If the
retained row fixes $\zeta_s,\zeta_t$ on its box and emits $D_s$, $D_t$,
$D_vD_s$, and $D_vD_t$ on the same retained record, then the only admissible
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
| `receiver_normal_fields` | $D_{s,a}$, $D_{t,a}$, $\zeta_{s,a}$, $\zeta_{t,a}$, $W_a^{\mathrm{rec}}$, and sign-stratum floors on the same retained box. |
| `receiver_normal_derivatives` | $D_vD_{s,a}$, $D_vD_{t,a}$, and reconstructed $D_vW_a^{\mathrm{rec}}$ with outward intervals. |
| `geometry_derivatives` | $D_vr_a$ and $D_v\hat{\mathbf r}_a$, or the shell-braid arclength equivalents $D_v\eta_a$ and $D_v\widehat{\mathbf R}_a$. |
| `force_kernel_derivative` | $\mathbf B_a^{\mathrm{rec}}$ and $D_v\mathbf B_a^{\mathrm{rec}}$ computed from the same rows. |
| `branch_family_checksum` | Exact retained branch list $\mathcal{A}_{\mathcal B}$, aggregation convention, and consumer checksum tying every downstream statistic to that list. |
| `negative_controls` | Fail-closed controls below, including aggregate-only and source-normal-diagnostic substitutions. |

### Fail-Closed Ledger

The artifact fails with:

| Status | Meaning |
| --- | --- |
| `receiver-normal-first-derivative-row-missing` | A derivative-consuming packet lacks $D_vD_s$, $D_vD_t$, or $D_vW^{\mathrm{rec}}$ on the retained row. |
| `receiver-normal-derivative-record-mismatch` | $D_s$, $D_t$, $W^{\mathrm{rec}}$, $D_vD_s$, $D_vD_t$, or $D_vW^{\mathrm{rec}}$ come from different retained records, boxes, variation coordinates, regulator states, or source artifact hashes. |
| `receiver-normal-sign-stratum-open` | The retained row does not fix both $D_s$ and $D_t$ signs or does not declare an accepted nonsmooth crossing convention. |
| `receiver-normal-derivative-reconstruction-failed` | The emitted $D_vW^{\mathrm{rec}}$ interval does not contain the reconstructed value from $D_s$, $D_t$, $D_vD_s$, and $D_vD_t$. |
| `aggregate-only-branch-family-derivative-rejected` | A terminal aggregate, provider replay, lambda witness, scalar statistic, or finite-difference table is supplied after branch identity has been erased. |
| `source-normal-diagnostic-consumed-as-branch-strength` | A row consumes the source-normal transversality diagnostic as receiver-normal branch strength. |
| `branch-family-consumer-checksum-mismatch` | A force, action, power, wake-history, Lipschitz, or scalar row consumes a different retained branch list from the derivative artifact. |

Wake-history consumer status 2026-06-29. The first executable consumer of this
derivative target now lives in
`scripts/proof-programs/event-wake-history-pullback-diagnostic.mjs`. Its
`energy_wake` fixture is priority-only row-logic evidence: it accepts one
wake-history row only when the row's accepted proof object carries
`receiver-normal-retained-branch-family-first-derivative/v0` on the same
retained source record, event ledger, retained record key, source artifact hash,
and consumer row, and when reconstructed $D_vW^{\mathrm{rec}}$ agrees with
$D_s$, $D_t$, $D_vD_s$, and $D_vD_t$. This does not certify wake-history
closure or promote any domain branch family; it only emits the first concrete
same-record derivative consumer and the corresponding fail-closed record
mismatch and reconstruction controls.

H39/theta3minus boundary. The diagnostic $G,D$ and H39 shared-domain packets may
remain useful as root-geometry, recurrence, or provider-provenance diagnostics.
They do not satisfy this artifact unless the regenerated retained branch-family
row emits the fields above on the same retained records. In particular,
aggregate $P$ provider rows, lambda terminal witness intervals, row-local
expression feeds, and terminal replay statistics remain rejected unless they
carry the same retained branch labels, receiver-normal fields, derivative
fields, projection or normalization identity, and consumer checksum before
aggregation erases branch identity.

The executable H39 branch-provider audit sharpens this boundary in
[Branch Provider Evidence Report](../solver/branch-provider-evidence-report.md#receiver-normal-first-derivative-readout):
the target names five shared source cells, 15 terminal rows, and 30 `P_-` /
`P_+` branch rows, but the manifest emits zero accepted provider-object branch
intervals and no same-record $D_s$, $D_t$, $D_vD_s$, $D_vD_t$, or
$D_vW^{\mathrm{rec}}$ rows. Its first derivative-evidence verdict is therefore
`h39-receiver-normal-first-derivative-evidence-not-populated`, with the
provider-object branch rows still missing before receiver-normal derivative
binding can even be attempted. The precise executable first missing field is
`source_map_provider_object_branch_split_map_available_terminal_row_count`;
the next H39 producer-side source surface,
`terminal-expression-level-source-map-provider-object-branch-antisymmetric-equation-extractor`,
is emitted only as an absence readout with `0 / 15` available
$A_P=P_- - P_+$ terminal rows and `0 / 30` explicit `P_-` / `P_+` rows.
Populated variable-owned alpha, row-local branch-feed, and term-pushforward
candidate diagnostics remain negative-control evidence until the same-domain
$P_b$ identity, pushforward operator, and normalization identity are present.
The H39 primitive-vector replay, hybrid prefix-Cauchy order diagnostic, and
coefficient-series source-map residual provider candidates fail even earlier as
`h39-primitive-vector-provider-provenance-only-not-retained-record-preimage` or
`h39-coefficient-series-provider-candidate-not-retained-record-preimage`: they
may guide provider-object construction, but they do not emit an accepted
$A_P=P_- - P_+$ row or a retained causal-root derivative record.
The H39-specific preimage row target is
`h39-receiver-normal-retained-record-preimage-row/v0`: it first requires an
accepted provider-object branch row, then a retained causal-root force/action
record carrying the receiver-normal fields and derivative fields above.

## First Accepted Row-Shape Certificate

Status. Accepted analytic row-shape certificate for the receiver-normal fields
emitted by `solveRootsAndHitsF64` on the static/static single-root fixture. This
is validation evidence for same-record row binding, not an A1, VP-1, breather,
circular, eigen-braid, or assembly-closure pass.

Claim level. `validation-evidence` for receiver-normal branch-strength row
shape and fail-closed invariant enforcement. The certificate proves that the
row reports $D_s$, $D_t$, and $W^{\mathrm{rec}}$ on the same analytic root and
that the invariant consumer rejects rows whose branch strength is not
$\lvert D_t/D_s\rvert$.

Source artifacts:

| Artifact | SHA-256 |
| --- | --- |
| `src/solver/fixtures/causal-roots-f64-smoke.request.json` | `d0cd79de26351c850b391ae9d29814812951fcff74f8f55e6205cd5624ed6196` |
| `src/solver/fixtures/roots-and-hits-f64-smoke.response.json` | `ca3f84edb1bcccfaab998cac0ec0164a8628eeeb879df8caeb6c5305c61a15fd` |
| `src/solver/src/InvariantChecks.cpp` | `0e1d356b13544a13ad0f20b901655d58c848e79d142ba475cab3b7b4edfe9712` |
| `scripts/check-solver-contract-fixtures.mjs` | `fbf117ae8082d51a0d33633ff7137c5df47326bdb81ed5a0bc487260797f2b36` |

Validation command:

```bash
node scripts/check-solver-contract-fixtures.mjs
```

The command passed for this row.

### Static/Static Single-Root Row

The fixture uses solver units with $c_f=1$. The source block is fixed at
$\mathbf{x}_j(t)=(0,0,0)$ and the receiver block is fixed at
$\mathbf{x}_i(t)=(10,0,0)$ over $0\le t\le10$. At hit time $t=10$, the retained
root has emission time $s_\alpha=0$, distance $r_\alpha=10$, and
$$
\hat{\mathbf r}_{\alpha}=(1,0,0).
$$
Because both source and receiver velocities vanish,
$$
D_{s,\alpha}
=
1-\hat{\mathbf r}_{\alpha}\cdot\mathbf v_j(s_\alpha)
=
1,
\qquad
D_{t,\alpha}
=
1-\hat{\mathbf r}_{\alpha}\cdot\mathbf v_i(t)
=
1,
$$
and therefore
$$
W_{\alpha}^{\mathrm{rec}}
=
\left|D_{t,\alpha}/D_{s,\alpha}\right|
=
1.
$$

The corresponding certified force/action row shape is
$$
\mathbf a_{i,\alpha}^{\mathrm{rec}}
=
\frac{\kappa\,\sigma_{ij}|q_iq_j|}{\mu_{\mathrm{arch}}}
\frac{1}{100}
(1,0,0).
$$
The scalar prefactor remains symbolic because this row certifies the
receiver-normal branch-strength binding, not a calibrated branch-family
force-balance verdict.

| Required field | Populated row |
| --- | --- |
| Retained root id | `rootId=0`, singleton retained analytic root. |
| Source and receiver ids | Certificate labels `static-source-0` and `static-receiver-0`, corresponding to the request's `source` and `receiver` blocks. |
| Time row | $t=10$, $s_\alpha=0$, $\Delta=10$. |
| Geometry row | $r_\alpha=10$, $\hat{\mathbf r}_\alpha=(1,0,0)$, source-emission point to receiver-now convention. |
| Source-normal row | $D_{s,\alpha}=1$; transversality status `ok`. |
| Receiver-normal row | $D_{t,\alpha}=1$ on the same root row. |
| Branch-strength row | `branchWeight=1`, `receiverNormalFactor=1`, `unsignedReceiverNormalFactor=1`. |
| Projection rows | Radial projection equals the symbolic prefactor above; tangential projection is $0$. |
| Aggregation row | Singleton aggregation over `{rootId=0}`. |
| Scalar statistic row | $W_{\alpha}^{\mathrm{rec}}=1$ and invariant status `ok`. |
| Negative controls | `InvariantChecks.cpp` rejects completed rows when root `branchWeight` or delayed-hit `strength` differs from $\lvert D_t/D_s\rvert$, and rejects non-finite receiver-normal fields. |
| Source artifact hash | The request, response, invariant-consumer, and contract-check hashes listed above. |
| Regulator state | Simple-root analytic fixture; no fold, caustic, $\eta$, or $\epsilon_c$ regulator row is active. |

Changeover consequence. This row satisfies the minimum same-record
receiver-normal branch-strength shape for one analytic simple root. It only
authorizes row-shape and invariant-consumer reuse. Any A1, VP-1, breather,
circular, or vendor/proof proposal must still populate its own retained branch
identity, source/receiver ids, branch-family aggregation, regulator state, and
negative controls before it can supply force/action evidence.

## First Accepted Branch-Family Fixture Certificate

Status. Accepted solver-contract fixture certificate for a nontrivial
receiver-normal branch-strength row on a linear moving-receiver branch family.
This is validation evidence for branch-family row population and negative
controls, not an A1, VP-1, breather, circular, eigen-braid, or assembly-closure
pass.

Claim level. `validation-evidence` for a same-record branch-family row whose
receiver-normal numerator differs from the source-normal denominator. The
fixture proves that the durable solver contract can carry $D_s$, $D_t$, and
$W^{\mathrm{rec}}$ on the same retained branch and that the checker rejects a
source-normal proxy for either the root `branchWeight` or delayed-hit
`strength`.

Source artifacts:

| Artifact | SHA-256 |
| --- | --- |
| `src/solver/fixtures/causal-roots-moving-receiver-f64-smoke.request.json` | `2650d509e459d072e63774f216cabacac7decc47ce8957fbe3b6e46914ffe2f0` |
| `src/solver/fixtures/roots-and-hits-moving-receiver-f64-smoke.response.json` | `688f954897db22cb554b7c2dfbd55652084d8000213fb5d0d2924281997bbc1a` |
| `scripts/check-solver-contract-fixtures.mjs` | `279a2088e136932bc7718dbc562b7d5c9ded764ac2fefd2f741759b1f0baf472` |
| `src/solver/native/solver_analytic_smoke.cpp` | `ea52c3adb84d590200b4488946d4ea88bfff008697a8041856f0ab91e3e72bf7` |
| `src/solver/src/InvariantChecks.cpp` | `0e1d356b13544a13ad0f20b901655d58c848e79d142ba475cab3b7b4edfe9712` |

Validation command:

```bash
node scripts/check-solver-contract-fixtures.mjs
```

The command passed for this branch-family fixture.

### Linear Moving-Receiver Branch Row

The fixture uses solver units with $c_f=1$. The source block is fixed at
$\mathbf{x}_j(s)=(0,0,0)$ and the receiver block moves as
$\mathbf{x}_i(t)=(10-\tfrac12 t,0,0)$ on $0\le t\le10$. At hit time $t=10$,
the retained root has emission time $s_\alpha=5$, distance $r_\alpha=5$, and

$$
\hat{\mathbf r}_{\alpha}=(1,0,0).
$$

The source-normal row is

$$
D_{s,\alpha}
=
1-\hat{\mathbf r}_{\alpha}\cdot\mathbf v_j(s_\alpha)
=
1,
$$

while the receiver-normal row is

$$
D_{t,\alpha}
=
1-\hat{\mathbf r}_{\alpha}\cdot\mathbf v_i(t)
=
1-\left(-\frac12\right)
=
\frac32.
$$

Therefore

$$
W_{\alpha}^{\mathrm{rec}}
=
\left|D_{t,\alpha}/D_{s,\alpha}\right|
=
\frac32.
$$

The corresponding certified force/action row shape is

$$
\mathbf a_{i,\alpha}^{\mathrm{rec}}
=
\frac{\kappa\,\sigma_{ij}|q_iq_j|}{\mu_{\mathrm{arch}}}
\frac{3}{2r_\alpha^2}
(1,0,0)
=
\frac{\kappa\,\sigma_{ij}|q_iq_j|}{\mu_{\mathrm{arch}}}
\frac{3}{50}
(1,0,0).
$$

The scalar prefactor remains symbolic because this row certifies
receiver-normal branch-strength binding on a solver branch family, not a
calibrated force-balance verdict.

| Required field | Populated row |
| --- | --- |
| Retained root id | `rootId=0`, singleton retained analytic root across the linear moving-receiver fixture. |
| Source and receiver ids | Request fields `source` and `receiver`, with source fixed and receiver moving toward the source. |
| Time row | $t=10$, $s_\alpha=5$, $\Delta=5$. |
| Geometry row | $r_\alpha=5$, $\hat{\mathbf r}_\alpha=(1,0,0)$, source-emission point to receiver-now convention. |
| Source-normal row | $D_{s,\alpha}=1$; transversality status `ok`. |
| Receiver-normal row | $D_{t,\alpha}=3/2$ on the same root row. |
| Branch-strength row | `branchWeight=1.5`, `receiverNormalFactor=1.5`, `unsignedReceiverNormalFactor=1.5`. |
| Projection rows | Radial projection equals the symbolic prefactor above; tangential projection is $0$. |
| Aggregation row | Singleton aggregation over `{rootId=0}`. |
| Scalar statistic row | $W_{\alpha}^{\mathrm{rec}}=3/2$ and invariant status `ok`. |
| Negative controls | `check-solver-contract-fixtures.mjs` rejects a source-normal proxy by setting root `branchWeight=1` or delayed-hit `strength=1` and requiring receiver-normal invariant failure. `InvariantChecks.cpp` independently rejects completed rows whose branch strength differs from $\lvert D_t/D_s\rvert$. |
| Source artifact hash | The request, response, native analytic smoke, invariant-consumer, and contract-check hashes listed above. |
| Regulator state | Simple-root analytic linear-motion fixture; no fold, caustic, $\eta$, or $\epsilon_c$ regulator row is active. |

Changeover consequence. This fixture supplies the first accepted nontrivial
branch-family row with same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ and a
source-normal-proxy negative control. It authorizes solver-contract and vendor
intake reuse for the receiver-normal branch-strength field. It does not
authorize any A1, VP-1, breather, circular, eigen-braid, or assembly-closure
force/action conclusion; those packets must populate their own retained branch
families and negative controls. It also does not populate
`receiver-normal-retained-branch-family-first-derivative/v0`; derivative
consumers still need same-record $D_vD_s$, $D_vD_t$, $D_vW^{\mathrm{rec}}$, and
the consumer checksum.

## Fail-Closed Controls

The certificate must reject:

- a row with missing $D_t$;
- a row where $D_s$, $D_t$, and $W^{\mathrm{rec}}$ come from different retained
  records or different boxes;
- a row that substitutes a source-normal diagnostic for receiver-normal branch
  strength;
- a topology-only row used as force/action evidence;
- a stationary-receiver reduction that was not derived by direct substitution
  inside the declared retained row;
- a derivative-consuming force/action row with missing or non-same-record
  variation key, $D_vD_s$, $D_vD_t$, $D_vW^{\mathrm{rec}}$, or
  $D_v\mathbf B^{\mathrm{rec}}$;
- a sign-changing $D_t/D_s$ derivative row treated as differentiable
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
