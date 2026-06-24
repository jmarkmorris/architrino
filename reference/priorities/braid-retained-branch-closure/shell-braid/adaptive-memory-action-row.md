# Adaptive Memory And Action Row

Promotion status: `priority-only`. This packet converts the $M=3$ root-frontier result in [arclength-inverse-m3-root-frontier.md](arclength-inverse-m3-root-frontier.md) into a theorem target for finite-memory completeness and action consistency. It does not retain a branch.

The immediate lesson is that a fixed root-search cutoff such as

$$
\eta_{\max}=4
$$

is a solver convention, not a physical branch certificate. Once a deformation widens the support band, retained source-pair roots can move beyond that cutoff without disappearing. A retained branch must derive or certify its memory depth from the same support, root, force, and action convention used by the dynamics row.

---

## 1. Dimensionless Memory Depth

In the arclength-inverse shape chart, write the dimensionless delayed root equation as

$$
G_{ij}(\lambda,\eta;\alpha)
=
\|\mathbf{Y}_i(\lambda;\alpha)
-
\mathbf{Y}_j(\lambda-\eta;\alpha)\|
-
\eta
=0.
$$

For a candidate coefficient vector $\alpha$, define the active root ledger at memory depth $\eta_{\mathrm{mem}}$ by

$$
\mathcal{A}_{\eta_{\mathrm{mem}}}(\alpha)
=
\left\{
(i,j,\lambda_n,\mu,\eta_{ij,n}^{\mu})
:
0<\eta_{ij,n}^{\mu}\le\eta_{\mathrm{mem}},
\quad
G_{ij}(\lambda_n,\eta_{ij,n}^{\mu};\alpha)=0
\right\}.
$$

The memory depth is complete for a declared source-pair policy only if every required source pair has the declared number of roots in $\mathcal{A}_{\eta_{\mathrm{mem}}}$ and every excluded interval has a positive gap margin.

Also define the active-root memory maximum

$$
\eta_{\mathrm{act}}(\alpha)
=
\max_{a\in\mathcal{A}_{\eta_{\mathrm{mem}}}(\alpha)}
\eta_a(\alpha),
$$

and the memory margin

$$
m_{\mathrm{mem}}(\alpha;\eta_{\mathrm{mem}})
=
\eta_{\mathrm{mem}}-\eta_{\mathrm{act}}(\alpha).
$$

If $m_{\mathrm{mem}}>0$ and all root brackets remain isolated, the emitted active ledger is inside the declared window. That is still weaker than support-complete memory unless the tail interval beyond the last active root is certified.

The dynamics row must then be written with the ledger visible:

$$
\widetilde{\mathbf{F}}_i^{(\eta_{\mathrm{mem}})}(\lambda_n)
=
\sum_{(j,\mu)\in\mathcal{A}_{\eta_{\mathrm{mem}},i}(\lambda_n)}
\mathbf{F}_{ij}^{\mu}(\lambda_n),
$$

and

$$
\mathcal{R}_{K}^{(\eta_{\mathrm{mem}})}
=
\mathbf{K}
-
\Gamma_K^{(\eta_{\mathrm{mem}})}
P^\perp\widetilde{\mathbf{F}}^{(\eta_{\mathrm{mem}})}.
$$

Changing $\eta_{\mathrm{mem}}$ changes the force row, the fitted scale, and the action ledger. It is not a harmless root-solver parameter.

---

## 2. Support-Bound Memory Certificate

Assume a center-gauge rest chart, a declared source-pair policy, and a bounded support row

$$
\|\mathbf{Y}_i(\lambda;\alpha)\|\le r_{\max}(\alpha)
\qquad
\text{for every required } i,\lambda
$$

on the current and history parameter intervals used by the causal-root ledger. Then any positive cross-site causal root satisfies

$$
\eta
=
\|\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda-\eta)\|
\le
2r_{\max}(\alpha).
$$

Therefore any memory depth obeying

$$
\eta_{\mathrm{mem}}(\alpha)
\ge
2r_{\max}(\alpha)+m_{\eta},
$$

where $m_{\eta}>0$ is a numerical bracket margin, excludes cross-site roots beyond the declared memory window. In physical units,

$$
h_{\mathrm{mem}}
=
\frac{R_*}{c_f}\eta_{\mathrm{mem}}.
$$

This is a tail certificate, not a complete root-enumeration proof by itself. The same packet must still bracket and isolate every required in-window root and emit positive excluded-interval gap margins under the declared source-pair policy. The support-bound row is deliberately conservative because it ties memory depth to a visible branch geometry rather than to an arbitrary fixed cutoff.

This creates two distinct statuses:

| Status | Criterion | Claim allowed |
| --- | --- | --- |
| `active-window-certified` | $m_{\mathrm{mem}}>0$ and all declared active-root brackets/gaps pass inside the chosen $\eta_{\mathrm{mem}}$ | dynamics screen on the declared ledger |
| `support-complete-memory` | in-window roots are bracketed and gap-certified, and either $\eta_{\mathrm{mem}}\ge2r_{\max}+m_{\eta}$ or a sharper interval proof excludes roots in the remaining tail | branch-level memory completeness |

The fixed $\eta_{\max}=4.5$ rescore in [arclength-inverse-m3-root-frontier.md](arclength-inverse-m3-root-frontier.md) is `active-window-certified` in the sampled rows, not support-complete at $\rho=0.8$. A sharper route to support-complete memory is the tail-exclusion certificate in [tail-interval-root-exclusion-certificate.md](tail-interval-root-exclusion-certificate.md), which can certify the remaining interval without raising the active window to the full support bound. If the remaining interval contains roots, [tail-root-assimilation-theorem.md](tail-root-assimilation-theorem.md) gives the complementary route: bracket the roots, extend the active ledger, and recompute force, $\Gamma$, curl, action, and event rows on that deeper ledger.

---

## 3. $M=3$ Memory Numbers

The $M=3$ trust path gives the following memory scales.

| Radius $\rho$ | Support $r_{\max}$ | Support bound $2r_{\max}$ | Largest active root under $\eta_{\max}=4.5$ | Root count under $\eta_{\max}=4.5$ |
| ---: | ---: | ---: | ---: | --- |
| $0.30$ | $2.4793876112$ | $4.9587752224$ | $3.9822306948$ | $5$-$5$ |
| $0.34$ | $2.5012232620$ | $5.0024465239$ | $4.0167747482$ | $5$-$5$ |
| $0.40$ | $2.5345364224$ | $5.0690728448$ | $4.0683608316$ | $5$-$5$ |
| $0.80$ | $2.7605787625$ | $5.5211575250$ | $4.4058154936$ | $5$-$5$ |

Thus $\eta_{\max}=4$ is too shallow once the support grows along the $M=3$ trust direction. The support-certified window for $\rho=0.8$ is at least

$$
\eta_{\mathrm{mem}}\ge5.5211575250+m_{\eta},
$$

while the directly observed active-root maximum is only

$$
4.4058154936.
$$

The gap between these two numbers is the difference between a rigorous support-bound certificate and a sampled active-root certificate.

For the fixed $\eta_{\max}=4.5$ rescore at $\rho=0.8$, the active-root margin is

$$
m_{\mathrm{mem}}
\approx
4.5-4.4058154936
=
0.0941845064.
$$

That margin is enough to continue the displayed active-window dynamics screen, but it is not enough to claim no required root exists in the tail interval

$$
(4.5,\ 5.5211575250].
$$

---

## 4. Action Consistency

The scale/action packet [gamma-scale-action-row.md](gamma-scale-action-row.md) requires the same active-root ledger in the dynamics and history action rows. With adaptive memory, the ledger becomes

$$
\mathcal{L}_{\Gamma}^{(B)}
=
\left(
R_*,
E_\epsilon,
\eta_{\mathrm{mem}},
\mathcal{A}_{\eta_{\mathrm{mem}}},
\mathcal{H}_{\eta_{\mathrm{mem}}},
\mathcal{S}_{B,\eta_{\mathrm{mem}}},
\mathsf{M}_{B,\perp},
m_{\mathrm{car}},
\Gamma_K,
\Gamma_F,
\mathcal{R}_{\Gamma}
\right).
$$

The history segment must extend over

$$
[-h_{\mathrm{mem}},0],
\qquad
h_{\mathrm{mem}}=\frac{R_*}{c_f}\eta_{\mathrm{mem}}.
$$

The virtual-work row must use the same root set:

$$
\delta\mathcal{S}_{\mathrm{hist}}^\perp
\left[
\mathcal{A}_{\eta_{\mathrm{mem}}}
\right]
=
\frac{R_*E_\epsilon(R_*)}{c_f}
\int
\sum_i
P_i^\perp
\widetilde{\mathbf{F}}_i^{(\eta_{\mathrm{mem}})}
\cdot
\delta\mathbf{Y}_i^\perp
d\lambda.
$$

If a numerical packet changes $\eta_{\mathrm{mem}}$ but does not recompute this action row, its status is

$$
\texttt{gamma-diagnostic-only}.
$$

---

## 5. Continuation Criterion

An exact-antipodal $M=3$ continuation packet may accept a radius $\rho$ under the adaptive-memory convention only if it emits:

1. the declared $\eta_{\mathrm{mem}}(\rho)$;
2. the support-bound value $2r_{\max}(\rho)$ and whether the row is `active-window-certified` or `support-complete-memory`;
3. raw root counts by source pair before any pruning;
4. the largest active root $\eta_{\max}^{\mathrm{active}}$;
5. endpoint, gap, separation, and Jacobian margins for the active roots;
6. a tail-interval certificate if $\eta_{\mathrm{mem}}<2r_{\max}$, using the certificate fields in [tail-interval-root-exclusion-certificate.md](tail-interval-root-exclusion-certificate.md);
7. a tail-assimilation row if tail roots are found, using [tail-root-assimilation-theorem.md](tail-root-assimilation-theorem.md) to extend $\mathcal{A}_{\eta}$ and trigger recomputation;
8. a tail-force error row if the tail certificate is not complete and roots are not assimilated, using [unresolved-tail-force-error-bound.md](unresolved-tail-force-error-bound.md) to emit $N_{i,n}^{\mathrm{tail}}$, $J_{\mathrm{tail}}$, and $\epsilon_F^{\mathrm{tail}}$ when available;
9. an adaptive-memory trust-radius row from [adaptive-memory-trust-radius-lemma.md](adaptive-memory-trust-radius-lemma.md), including active-window, support-memory, and tail-certificate radii;
10. the dynamics residuals computed with $\mathcal{A}_{\eta_{\mathrm{mem}}}$ or its assimilated extension;
11. a scale/action status: `computed`, `diagnostic-only`, or `not_computed`.

The radius is rejected under the adaptive-memory branch convention if

$$
\eta_{\max}^{\mathrm{active}}
>
\eta_{\mathrm{mem}},
$$

or if any required source pair is missing after the memory depth is extended to the declared value.

The radius is not retained even when this memory row passes unless

$$
\mathcal{R}_{\mathrm{tan}}=0,
\qquad
\mathcal{R}_{K}=0,
\qquad
\mathcal{R}_{\Gamma}=0,
$$

within declared tolerances on the same root ledger.

---

## 6. Decision State

The current $M=3$ evidence supports the following decision:

$$
\text{continue exact-antipodal }M=3
\quad
\text{under an adaptive-memory root policy}
$$

before opening antipodal relaxation. The first apparent root failure is explained by memory-window depth, not by pair-even obstruction.

The branch remains unretained because:

1. the residuals remain nonzero;
2. the support band is wide;
3. the memory/action row is not yet computed;
4. $\Gamma_K$ is still fitted rather than derived.

Status codes:

$$
\texttt{adaptive-memory-row-open},
\qquad
\texttt{adaptive-memory-trust-radius-open},
\qquad
\texttt{m3-active-root-near-memory-boundary},
\qquad
\texttt{m3-fixed-eta-active-window-only},
\qquad
\texttt{m3-support-memory-incomplete},
\qquad
\texttt{m3-tail-interval-uncertified},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{support-bound-memory-certificate-required},
\qquad
\texttt{m3-action-gamma-rerun-required},
\qquad
\texttt{gamma-diagnostic-only},
\qquad
\texttt{not-retained}.
$$
