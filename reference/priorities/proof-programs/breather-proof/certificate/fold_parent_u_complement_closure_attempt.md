# Fold Parent `u` Complement Closure Attempt

## Scope

This attempt covers only the three `u` parent rows in packet `seed-doubled-four-arc-cosine-template-v0` and refinement `preledger-separator-level-split-v1`:

- `R_u_A3_A2`
- `R_u_A4_A2`
- `R_u_A4_A3`

It reads the accepted fixed-parameter full-interval constants certificate and the current parent-complement contract. It does not edit `causal_ledger.json`, `fold_layer_atlas.json`, `branch_chart.json`, or any pass/fail ledger.

## Verdict

Rejected as a live closure packet.

The accepted full-interval constants certificate supplies finite fixed-parameter fold-layer constants for $\Sigma_3$ and $\Sigma_4$ on the same packet identity tuple, with the stored fold-atlas conditions preserved:

$$
\alpha_{\Sigma}>0,
\qquad
\nu_{\mathrm{exit},\Sigma}>0,
\qquad
\Delta N_\Sigma\in2\mathbb{Z},
\qquad
\Delta D_\Sigma=0.
$$

However, the current artifacts still do not record the required complement-by-complement classification for the three `u` parent rows. In particular, no artifact names the disjoint boundary complements $B$, records their interval ranges $Y_{\alpha}^{u}$ and $Y_{\beta}^{u}$, records a strict positive gap

$$
\Delta^u_B
=
\operatorname{dist}\!\big(Y_{\alpha}^{u},Y_{\beta}^{u}\big)
>0,
$$

or records exact membership

$$
B\in\mathcal{F}_{\Sigma_3}
\qquad\text{or}\qquad
B\in\mathcal{F}_{\Sigma_4}
$$

for each complement. Therefore the `u` parent side cannot be consumed now.

## Per-Parent Row Table

| Parent row | Accepted simple-root subrow | Stored parent status | Accepted fold-layer coverage available? | Strict range-empty gaps recorded for every complement? | Complement-by-complement verdict |
| --- | --- | --- | --- | --- | --- |
| `R_u_A3_A2` | `S_u_A3_A2_1` | `split_required`, `failure_code=range_overlap_requires_level_split` | $\Sigma_3$ and $\Sigma_4$ have accepted fixed-parameter constants, but no artifact assigns each boundary complement to $\mathcal{F}_{\Sigma_3}$ or $\mathcal{F}_{\Sigma_4}$. | No. The artifacts record the accepted simple-root subrow and source-coverage gap only; they do not record $\Delta^u_B>0$ for the boundary complements. | Blocked. |
| `R_u_A4_A2` | `S_u_A4_A2_2` | `split_required`, `failure_code=range_overlap_requires_level_split` | $\Sigma_3$ and $\Sigma_4$ have accepted fixed-parameter constants, but no artifact assigns each boundary complement to $\mathcal{F}_{\Sigma_3}$ or $\mathcal{F}_{\Sigma_4}$. | No. The artifacts record the accepted simple-root subrow and source-coverage gap only; they do not record $\Delta^u_B>0$ for the boundary complements. | Blocked. |
| `R_u_A4_A3` | `S_u_A4_A3_3` | `split_required`, `failure_code=range_overlap_requires_level_split` | $\Sigma_3$ and $\Sigma_4$ have accepted fixed-parameter constants, but no artifact assigns each boundary complement to $\mathcal{F}_{\Sigma_3}$ or $\mathcal{F}_{\Sigma_4}$. | No. The artifacts record the accepted simple-root subrow and source-coverage gap only; they do not record $\Delta^u_B>0$ for the boundary complements. | Blocked. |

## Accepted Coverage Facts That Are Usable Later

The full-interval constants certificate records accepted fixed-parameter fold-layer rows for the `u` separator families:

| Separator family | Accepted rows | Accepted aggregate available |
| --- | --- | --- |
| $\mathcal{F}_{\Sigma_3}$ | `R_u_F3_A2`, `R_u_F3_F3`, `R_u_A3_F3`, `R_u_A4_F3` | finite $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma_3}$ at $\eta=0.02$, $\epsilon_c=0.05$, $c_f=1$, $h=2\pi$, $\Gamma=1$ |
| $\mathcal{F}_{\Sigma_4}$ | `R_u_F4_A2`, `R_u_F4_A3`, `R_u_F4_F4`, `R_u_A4_F4` | finite $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma_4}$ at $\eta=0.02$, $\epsilon_c=0.05$, $c_f=1$, $h=2\pi$, $\Gamma=1$ |

These facts are enough to support a later coverage alternative only after each boundary complement is explicitly identified as an element of one of those fold-layer families. The currently stored parent rows are regular-regular rows (`A3/A2`, `A4/A2`, `A4/A3`), and the current artifacts do not state that any named complement is identical to, or covered by, one of the accepted fold-layer rows above.

## Missing Interval Data

The exact missing data are the disjoint boundary-complement boxes and their certified $u$-range intervals. A minimal closure artifact must enumerate a partition of each parent row into its accepted simple-root subrow plus disjoint complements. For example, using the stored parent intervals and simple-root subwindows, the natural receiver/source strip data that must be certified are:

| Parent row | Missing complement strip data |
| --- | --- |
| `R_u_A3_A2` | Receiver-left strip $[0.66008361765,0.670709367399]\times[0.36491638235,0.63508361765]$; source-left strip $[0.670709367399,0.83991638235]\times[0.36491638235,0.54103883344]$; source-right strip $[0.670709367399,0.83991638235]\times[0.625869003963,0.63508361765]$. |
| `R_u_A4_A2` | Receiver-right strip $[0.957747116028,1]\times[0.36491638235,0.63508361765]$; source-left strip $[0.86491638235,0.957747116028]\times[0.36491638235,0.541076558044]$; source-right strip $[0.86491638235,0.957747116028]\times[0.625869003963,0.63508361765]$. |
| `R_u_A4_A3` | Receiver-left strip $[0.86491638235,0.873898811563]\times[0.66008361765,0.83991638235]$; receiver-right strip $[0.957785341387,1]\times[0.66008361765,0.83991638235]$; source-left strip $[0.873898811563,0.957785341387]\times[0.66008361765,0.670446004355]$; source-right strip $[0.873898811563,0.957785341387]\times[0.829553995645,0.83991638235]$. |

For each such strip, the missing certificate must record exactly one of:

1. a strict positive range-empty gap $\Delta^u_B>0$ using certified interval images $Y_{\alpha}^{u}$ and $Y_{\beta}^{u}$ for that strip; or
2. exact fold-layer membership $B\in\mathcal{F}_{\Sigma_3}$ or $B\in\mathcal{F}_{\Sigma_4}$ together with the already accepted finite $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}$ on the same packet identity tuple.

The current source-coverage gap of `0.005` for the simple-root subrow does not certify these boundary complements. It is a margin for the extracted simple-root subrow, not a strict empty gap for the complement itself.

## Minimal Next Calculation

The minimal next calculation is a `u` parent-complement interval partition certificate:

1. Define the canonical disjoint complement partition for `R_u_A3_A2`, `R_u_A4_A2`, and `R_u_A4_A3` relative to `S_u_A3_A2_1`, `S_u_A4_A2_2`, and `S_u_A4_A3_3`.
2. For every complement box $B$, compute certified interval images $Y_{\alpha}^{u}(B)$ and $Y_{\beta}^{u}(B)$ with outward-rounded endpoints.
3. Accept $B$ as range-empty only if the certified interval distance satisfies $\Delta^u_B>0$.
4. If $\Delta^u_B$ is not strictly positive, accept $B$ only by recording exact membership in $\mathcal{F}_{\Sigma_3}$ or $\mathcal{F}_{\Sigma_4}$ and naming the covering accepted fold-layer row from the full-interval constants certificate.

Until that calculation exists, the correct fail-closed state is:

| Quantity | State |
| --- | --- |
| `u` parent side consumed now? | No. |
| Live `causal_ledger.json` update authorized? | No. |
| `branch_chart_authorized` update authorized? | No. |

