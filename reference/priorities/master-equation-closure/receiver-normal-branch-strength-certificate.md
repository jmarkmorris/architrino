# Receiver-Normal Branch-Strength Certificate

Status. Required certificate target for receiver-normal Master EOM force/action rows.
This is a priority certificate target, not a branch pass by itself.

Claim level. Minimum admissible branch-strength row for the receiver-normal
Master EOM. A retained branch cannot supply force balance, action, power,
Noether wake-history, A1 outward constants, breather margin, or pass/fail
evidence until it reports the rows below on the same retained record.

Pure changeover blocker. This file defines the certificate shape and includes
one accepted analytic row-shape certificate. It does not yet populate an A1,
VP-1, breather, circular, or assembly-closure branch pass. A solver, vendor
proposal, or proof packet satisfies the full changeover only when it fills this
schema for one retained branch family and shows that the force/action row uses
receiver-normal $W^{\mathrm{rec}}$ rather than a source-normal proxy.

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
