# Causal-Writhe Parity Extractor Packet

Status. Priority proof packet for `spinor_closure` and `component_resolved_causal_writhe_bridge`, downstream of [noncoplanar-spinor-transport-certificate.md](noncoplanar-spinor-transport-certificate.md). This file defines a row-local extractor for the causal-writhe parity row required by the spinor-support route. It is priority material only and does not claim a passing spinor support row.

Claim level. Defer with blocker. The packet converts component-resolved causal writhe from a qualitative support condition into an extractor with inputs, residuals, pass/fail/no-go outcomes, and doubled-path checks. It does not populate the extractor on a retained branch chart.

Promotion decision. Defer with blocker. Promote only after a retained non-coplanar active-root row supplies sheet coordinates, component return data, gauge controls, quotient witness, angular-momentum residuals, and doubled-path restoration with populated numerical or symbolic values.

## Extractor Domain

Fix a stable non-coplanar ordered branch $B$, a retained active-root row

$$
r\in\mathscr K_B,
$$

and the visible paths

$$
\gamma_{2\pi}:[0,1]\to\mathcal Q_B^{\mathrm{ord}},
\qquad
\gamma_{4\pi}=\gamma_{2\pi}\ast\gamma_{2\pi}:[0,2]\to\mathcal Q_B^{\mathrm{ord}}.
$$

The extractor may be evaluated only after the row has a continuous row-lift

$$
\widetilde r(s)
=
\left(
t_{0,r}(s),
k_r(s),
\mathcal E_r(s),
\Xi_r(s),
\mathcal C_r(s)
\right),
\qquad
s\in[0,2],
$$

where $t_{0,r}$ is the continued causal-root coordinate, $k_r$ is the integer phase branch, $\mathcal E_r$ is the emission-order record, $\Xi_r$ is a component-resolved sheet coordinate, and $\mathcal C_r$ is the chirality or horizon-sign provenance row. A raw self-hit count is not an extractor input unless it is refined into this row-lift.

## Row-Local Parity Map

The causal-writhe parity extractor is a row-local map

$$
\Pi_{W,r}:
\left\{
\widetilde r(s)
\right\}_{s\in[0,2]}
\longrightarrow
\mathbb Z_2.
$$

To keep the row test gauge-controlled, choose a sheet coordinate

$$
\Xi_r(s)
=
\left(
\xi_{r,H}(s),
\xi_{r,M}(s),
\xi_{r,L}(s)
\right)
$$

on the ordered non-coplanar branch and a regularized signed crossing functional

$$
W_r(s)
=
\mathsf W_r
\left[
\Xi_r|_{[0,s]},
\mathcal E_r|_{[0,s]},
\mathcal C_r|_{[0,s]}
\right].
$$

The parity rows are

$$
\Pi_{W,r}^{2\pi}
=
W_r(1)-W_r(0)\pmod 2,
\qquad
\Pi_{W,r}^{4\pi}
=
W_r(2)-W_r(0)\pmod 2.
$$

The intended spinor-support pattern for a candidate row $r_\star$ is

$$
\Pi_{W,r_\star}^{2\pi}=1,
\qquad
\Pi_{W,r_\star}^{4\pi}=0,
$$

but this pattern is support only when the same row also passes root continuation, phase lock, quotient, angular-momentum, branch-domain, and doubled-path restoration rows.

## Residual Vector

The extractor residual is

$$
\Delta_{\Pi_W}(r)
=
\Delta_{\mathrm{sheet}}(r)
+
\Delta_{\mathrm{return}}(r)
+
\Delta_{\mathrm{gauge}}(r)
+
\Delta_{\mathrm{quot}}(r)
+
\Delta_{\mathrm{dbl}}(r)
+
\Delta_{\mathbf J}(r).
$$

The row can pass only if

$$
\Delta_{\Pi_W}(r)\le\varepsilon_{\Pi_W}.
$$

The component residuals mean:

| Residual | Required content |
| --- | --- |
| $\Delta_{\mathrm{sheet}}$ | The sheet coordinate $\Xi_r(s)$ is continuous on the retained branch domain and has no undeclared relabeling. |
| $\Delta_{\mathrm{return}}$ | Component return data show which component rows return after $2\pi$ and after $4\pi$. |
| $\Delta_{\mathrm{gauge}}$ | Pure reparametrization, smooth phase relabeling, and chart-coordinate changes do not flip $\Pi_{W,r}$. |
| $\Delta_{\mathrm{quot}}$ | The quotient witness declares whether the row difference is physical or gauge-equivalent. |
| $\Delta_{\mathrm{dbl}}$ | The doubled path restores the row parity and branch domain. |
| $\Delta_{\mathbf J}$ | Angular-momentum residuals remain within tolerance on both paths. |

## Pass, Fail, And No-Go Outcomes

Pass. A row-local pass has

$$
\Pi_{W,r}^{2\pi}=1,
\qquad
\Pi_{W,r}^{4\pi}=0,
\qquad
\Delta_{\Pi_W}(r)\le\varepsilon_{\Pi_W},
$$

with the same retained row $r$ continued through both paths and with no hidden angular-momentum routing.

Fail. The extractor fails when $\Pi_{W,r}^{2\pi}=0$ for every retained non-gauge row, when $\Pi_{W,r}^{4\pi}=1$, when the row parity changes under a gauge move, or when $\Delta_{\mathbf J}$ exceeds tolerance. A visible $SO(3)$ loop cannot repair those failures.

No-go. The extractor is unpopulated when the only available data are fixed normals, raw self-hit counts, aggregate chirality labels, or a component count that has no row-local sheet coordinate. In that case the support-row attempt remains blocked, not falsified.

## Current Bucket Verdict

The current angular-momentum/spin bucket has no populated $\Xi_r(s)$ row, no row-local $\mathsf W_r$ calculation, and no doubled-path parity ledger for a retained active root. Therefore the present status is

$$
\Pi_{W,r_\star}^{2\pi},\Pi_{W,r_\star}^{4\pi}
\quad
\text{uncomputed},
\qquad
\Delta_{\Pi_W}(r_\star)
\quad
\text{blocked}.
$$

The next concrete spinor-support pass should populate this extractor for one candidate row from the non-coplanar transport certificate before any reader-facing spinor-closure claim is strengthened.
