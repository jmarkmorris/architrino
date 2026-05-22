# Root/Jacobian Barrier Lemma

Promotion status: `priority-only`. This packet supplies a concrete theorem-target lemma for root and Jacobian barriers in the intrinsic collocation solver. It builds on [intrinsic-curve-solver-protocol.md](intrinsic-curve-solver-protocol.md), [shell-swarm-branch-mathematics.md](shell-swarm-branch-mathematics.md), [finite-mode-rank-screen-results.md](finite-mode-rank-screen-results.md), and [intrinsic-m2-collocation-rank-results.md](intrinsic-m2-collocation-rank-results.md).

Claim level: solver guard and proof route. This packet does not claim a retained same-level branch, does not certify a nonlinear solution, and does not authorize migration into `content/markdown/aaa`.

---

## 1. Purpose

The intrinsic solver must not accept a residual-improving step that silently changes the active-root ledger. The required local chart is therefore not only a Fourier coefficient chart; it is a Fourier coefficient chart plus isolating root brackets.

The barrier lemma below gives sufficient conditions under which a collocation perturbation preserves:

1. the active root count and labels;
2. the positive Jacobian floor;
3. the finite memory window;
4. the validity of rank and trust-region derivatives.

The $M=3$ arclength-inverse trust screen in [arclength-inverse-m3-rank-and-trust-results.md](arclength-inverse-m3-rank-and-trust-results.md) makes one guardrail explicit: an apparently healthy active-root Jacobian floor is not enough. In that screen, $\rho=0.4$ still has active-root $J_{\min}\approx0.3259$ on the sampled roots under the working $\eta_{\max}=4$ window, but the off-grid active-root count has already changed from $5$-$5$ to $4$-$5$. The root-frontier refinement in [arclength-inverse-m3-root-frontier.md](arclength-inverse-m3-root-frontier.md) shows why: the missing roots continue just beyond $\eta=4$ and are recovered under $\eta_{\max}=4.5$. The root barrier must therefore track bracket endpoint signs, excluded-interval gaps, and memory-window exits, not only the smallest Jacobian among roots that remain visible after the step.

The lemma is intentionally one-sided. If the bounds fail, the candidate is not disproven as physics; it is outside the certified root chart and must be rescreened with a new root ledger.

---

## 2. Root Chart Data

Fix a collocation grid

$$
\theta_n=\frac{2\pi n}{K},
\qquad
n=0,\ldots,K-1,
$$

and intrinsic curves

$$
\mathbf{Z}_i(\theta;\alpha),
\qquad
i=1,\ldots,6,
$$

with common arclength scale $\ell(\alpha)>0$. For an ordered receiver-source pair $(i,j)$ at node $n$, define

$$
G_{ij,n}(\eta;\alpha)
=
\left\|
\mathbf{Z}_i(\theta_n;\alpha)
-
\mathbf{Z}_j\!\left(\theta_n-\frac{\eta}{\ell(\alpha)};\alpha\right)
\right\|
-
\eta.
$$

The Jacobian row is

$$
J_{ij,n}(\eta;\alpha)
=
1-
\mathbf{T}_j\!\left(\theta_n-\frac{\eta}{\ell(\alpha)};\alpha\right)
\cdot
\widehat{\mathbf{R}}_{ij,n}(\eta;\alpha),
$$

where

$$
\mathbf{T}_j(\theta;\alpha)
=
\frac{\partial_\theta\mathbf{Z}_j(\theta;\alpha)}{\ell(\alpha)}
$$

and

$$
\widehat{\mathbf{R}}_{ij,n}(\eta;\alpha)
=
\frac{
\mathbf{Z}_i(\theta_n;\alpha)
-
\mathbf{Z}_j\!\left(\theta_n-\frac{\eta}{\ell(\alpha)};\alpha\right)
}{\eta}.
$$

As in the solver protocol,

$$
\frac{dG_{ij,n}}{d\eta}(\eta;\alpha)
=
-J_{ij,n}(\eta;\alpha).
$$

For a bounded speed factor row, the collocation nodes are common causal-time nodes

$$
u_n=\frac{nH_*}{K},
$$

not common arclength nodes. Let

$$
\theta_i^n=\chi_i^{-1}(u_n),
\qquad
\theta_j^-(u_n,\eta)=\chi_j^{-1}(u_n-\eta),
$$

where

$$
\chi_i(\theta)
=
\int_0^\theta
\frac{\|\partial_\theta\mathbf{Z}_i(\zeta)\|}
{\nu_i(\zeta)}
d\zeta.
$$

Then the bounded speed factor root row is

$$
G_{ij,n}^{\nu}(\eta;\alpha)
=
\left\|
\mathbf{Z}_i(\theta_i^n;\alpha)
-
\mathbf{Z}_j(\theta_j^-(u_n,\eta);\alpha)
\right\|
-\eta,
$$

with

$$
J_{ij,n}^{\nu}(\eta;\alpha)
=
1-
\nu_j(\theta_j^-;\alpha)
\mathbf{T}_j(\theta_j^-;\alpha)
\cdot
\widehat{\mathbf{R}}_{ij,n}(\eta;\alpha).
$$

The barrier inequalities below keep the same form, but their perturbation envelopes must include the variations of $\nu_i$ and $\chi_i^{-1}$. The fixed-speed row is recovered when $\nu_i\equiv1$. A full bounded-speed successor must also emit

$$
D_v\chi_i(\theta)
=
-\int_0^\theta
\frac{D_v\nu_i(\zeta)}
{\nu_i(\zeta)^2}
d\zeta,
$$

and

$$
D_v\chi_i^{-1}(u)
=
-\frac{D_v\chi_i(\theta_i)}{\chi_i'(\theta_i)},
\qquad
\theta_i=\chi_i^{-1}(u),
$$

so the root, Jacobian, tail, and Krawczyk perturbation envelopes include speed-factor directions.

Let $\alpha_0$ be a base collocation point with a declared active-root ledger. For every retained label

$$
a=(i,j,n,\mu),
$$

where $\mu$ labels a retained delayed hit, choose an isolating bracket

$$
I_a=[\eta_a^-,\eta_a^+]\subset[\epsilon_\eta,\eta_{\max}]
$$

containing the base root $\eta_a^0$ and no other base root for the same $(i,j,n)$. Let

$$
E_{ij,n}
=
[\epsilon_\eta,\eta_{\max}]
\setminus
\bigcup_{\mu}I_{(i,j,n,\mu)}
$$

be the excluded interval set for that ordered pair and node.

The root chart records five positive base margins:

$$
\gamma_{\mathrm{end}}
=
\min_a
\min\left\{
\left|G_a(\eta_a^-;\alpha_0)\right|,
\left|G_a(\eta_a^+;\alpha_0)\right|
\right\},
$$

$$
\gamma_{\mathrm{gap}}
=
\min_{i,j,n}
\inf_{\eta\in E_{ij,n}}
\left|G_{ij,n}(\eta;\alpha_0)\right|,
$$

$$
J_0
=
\min_a
\inf_{\eta\in I_a}
\left|J_a(\eta;\alpha_0)\right|,
$$

$$
\Delta_\eta
=
\min_a
\min\left\{
\eta_a^0-\eta_a^-,
\eta_a^+-\eta_a^0
\right\},
$$

and

$$
\eta_0
=
\min_a\eta_a^0.
$$

Here $G_a$ abbreviates $G_{ij,n}$ on the retained label $a$. The chart is admissible only when

$$
\gamma_{\mathrm{end}}>0,
\qquad
\gamma_{\mathrm{gap}}>0,
\qquad
J_0>\epsilon_J,
\qquad
\Delta_\eta>0,
\qquad
\eta_0>\epsilon_\eta.
$$

If same-source rows are present, their brackets must also carry one of the statuses `regularized-fold-layer` or `split-source-retained`. Otherwise the same-source interval below $\epsilon_{\eta,\mathrm{self}}$ is excluded from the chart. The ordinary same-curve arclength row cannot be retained as a positive-delay Jacobian-regular root by [same-source-self-root-exclusion-lemma.md](same-source-self-root-exclusion-lemma.md).

---

## 3. Perturbation Norm And Lipschitz Bounds

For a trial point $\alpha$, define

$$
\rho_0(\alpha)
=
\max_i
\left\|
\mathbf{Z}_i(\cdot;\alpha)-\mathbf{Z}_i(\cdot;\alpha_0)
\right\|_{C^0},
$$

$$
\rho_1(\alpha)
=
\max_i
\left\|
\partial_\theta\mathbf{Z}_i(\cdot;\alpha)
-
\partial_\theta\mathbf{Z}_i(\cdot;\alpha_0)
\right\|_{C^0},
$$

and

$$
\rho_\ell(\alpha)
=
\left|\ell(\alpha)-\ell(\alpha_0)\right|.
$$

Let

$$
\ell_-
\le
\ell(\alpha)
\le
\ell_+,
\qquad
0<\ell_-<\ell_+<\infty,
$$

on the trust region, and let

$$
V_\theta
=
\max_i
\left\|
\partial_\theta\mathbf{Z}_i(\cdot;\alpha_0)
\right\|_{C^0}
+\rho_1.
$$

For $0\le\eta\le\eta_{\max}$, the source-phase shift caused by changing $\ell$ is bounded by

$$
\left|
\frac{\eta}{\ell(\alpha)}
-
\frac{\eta}{\ell(\alpha_0)}
\right|
\le
\eta_{\max}
\frac{\rho_\ell}{\ell_-\ell(\alpha_0)}.
$$

Therefore the root-function perturbation obeys the explicit sufficient bound

$$
\left|
G_{ij,n}(\eta;\alpha)-G_{ij,n}(\eta;\alpha_0)
\right|
\le
\Lambda_G(\alpha),
$$

with

$$
\Lambda_G(\alpha)
=
2\rho_0
+
V_\theta\eta_{\max}
\frac{\rho_\ell}{\ell_-\ell(\alpha_0)}.
$$

For the Jacobian row, use

$$
\Lambda_T(\alpha)
=
\frac{\rho_1}{\ell_-}
+
V_\theta
\frac{\rho_\ell}{\ell_-\ell(\alpha_0)}
$$

as a conservative tangent perturbation bound. If all active brackets satisfy $\eta\ge\epsilon_\eta$, then the unit line-of-action perturbation is bounded by

$$
\Lambda_R(\alpha)
=
\frac{2\Lambda_G(\alpha)}{\epsilon_\eta}.
$$

The factor $2$ is conservative: it absorbs both numerator motion and delay normalization inside the active bracket. With

$$
T_+
=
\max_i
\left\|
\mathbf{T}_i(\cdot;\alpha_0)
\right\|_{C^0}
+\Lambda_T,
$$

one obtains

$$
\left|
J_{ij,n}(\eta;\alpha)-J_{ij,n}(\eta;\alpha_0)
\right|
\le
\Lambda_J(\alpha),
$$

where

$$
\Lambda_J(\alpha)
=
\Lambda_T(\alpha)
+
T_+\Lambda_R(\alpha).
$$

In an implementation, these analytic bounds may be replaced by interval arithmetic or automatic-differentiation envelopes, but the emitted packet must record the actual envelope used. A finite-difference rank screen is valid only for steps satisfying the same root-label-preserving envelope.

---

## 4. Barrier Lemma

### Lemma Target: Root/Jacobian Barrier

Assume the root chart data in Section 2 are admissible at $\alpha_0$. Let $\alpha$ be a trial collocation point such that:

$$
\Lambda_G(\alpha)
<
\min\{\gamma_{\mathrm{end}},\gamma_{\mathrm{gap}}\},
$$

$$
\Lambda_J(\alpha)
<
J_0-\epsilon_J,
$$

and

$$
\rho_\eta(\alpha)
<
\Delta_\eta,
$$

where $\rho_\eta$ is the maximum root displacement predicted by the bracket-preserving root solver. A sufficient computable choice is

$$
\rho_\eta(\alpha)
=
\frac{\Lambda_G(\alpha)}
{J_0-\Lambda_J(\alpha)}.
$$

Then:

1. each retained bracket $I_a$ contains exactly one root of $G_a(\eta;\alpha)=0$;
2. the root in $I_a$ inherits the label $a$;
3. no additional root appears in any excluded interval $E_{ij,n}$;
4. every retained root satisfies

   $$
   \left|J_a(\eta_a(\alpha);\alpha)\right|>\epsilon_J;
   $$

5. the active-root count is unchanged on the collocation grid;
6. the rank derivative at $\alpha_0$ is valid for any finite-difference or trust-region step contained in the same inequalities.

### Proof Route

At a retained bracket endpoint, the perturbation in $G$ is smaller than the endpoint gap. Therefore the endpoint signs are preserved. The intermediate value theorem gives at least one root in every retained bracket.

Inside a retained bracket,

$$
\left|J_a(\eta;\alpha)\right|
\ge
J_0-\Lambda_J(\alpha)
>
\epsilon_J.
$$

Since $dG/d\eta=-J$, the derivative never vanishes and cannot change sign inside the bracket. Thus the root in the bracket is unique. The same inequality supplies the positive Jacobian floor for the continued root.

On the excluded interval set $E_{ij,n}$, the perturbation in $G$ is smaller than $\gamma_{\mathrm{gap}}$. Since the base function has no zero there and keeps distance at least $\gamma_{\mathrm{gap}}$ from zero, no new root can appear in the excluded intervals.

Finally, the root-displacement estimate follows from the mean-value theorem:

$$
\left|\eta_a(\alpha)-\eta_a^0\right|
\le
\frac{
\left|G_a(\eta_a^0;\alpha)-G_a(\eta_a^0;\alpha_0)\right|
}{
\inf_{\eta\in I_a}|J_a(\eta;\alpha)|
}
\le
\frac{\Lambda_G(\alpha)}
{J_0-\Lambda_J(\alpha)}.
$$

The condition $\rho_\eta<\Delta_\eta$ prevents label crossing and bracket escape.

---

## 5. Finite Memory Consequence

If the support row satisfies

$$
\left\|\mathbf{Z}_i(\theta;\alpha)\right\|
\le
1+\delta
\qquad
\text{for every }i,\theta,
$$

then any retained delayed root obeys

$$
\eta
=
\left\|
\mathbf{Z}_i(\theta_n;\alpha)
-
\mathbf{Z}_j\!\left(\theta_n-\frac{\eta}{\ell(\alpha)};\alpha\right)
\right\|
\le
2(1+\delta).
$$

Thus the dimensionless finite memory window can be set to

$$
\eta_{\max}=2(1+\delta)
$$

in the center-gauge rest chart. In physical units, the corresponding time depth is

$$
h_{\mathrm{mem}}
=
\frac{R_*}{c_f}\eta_{\max}.
$$

For a moving-center export with center drift bound $V_C<c_f$, the same argument uses the bound from [shell-swarm-branch-mathematics.md](shell-swarm-branch-mathematics.md):

$$
h_{\mathrm{mem}}
\le
\frac{2R_+}{c_f-V_C}.
$$

The finite-memory row is therefore a consequence of bounded support plus a declared center-gauge drift bound. It is not supplied by a small residual norm.

---

## 6. Collocation Barrier Functions

For a positive margin $m$, use the logarithmic barrier from the solver protocol:

$$
B(m;m_0,\beta)
=
-\beta\log\left(\frac{m}{m_0}\right),
\qquad
0<m\le m_0,
$$

and $B=0$ for $m>m_0$. A candidate with $m\le0$ is infeasible.

For each retained bracket $I_a=[\eta_a^-,\eta_a^+]$, define the endpoint-sign margins using the base orientation

$$
s_a^-=\operatorname{sign}G_a(\eta_a^-;\alpha_0),
\qquad
s_a^+=\operatorname{sign}G_a(\eta_a^+;\alpha_0).
$$

Then

$$
m_{\mathrm{end},a}^-
=
s_a^-G_a(\eta_a^-;\alpha),
\qquad
m_{\mathrm{end},a}^+
=
s_a^+G_a(\eta_a^+;\alpha).
$$

These margins are positive exactly when the bracket endpoint signs have not changed.

Define the bracket-interior Jacobian margin

$$
m_{J,a}
=
\inf_{\eta\in I_a}
\left|J_a(\eta;\alpha)\right|
-
\epsilon_J.
$$

Define the root-position margin after solving the bracket root:

$$
m_{\eta,a}
=
\min\left\{
\eta_a(\alpha)-\eta_a^-,
\eta_a^+-\eta_a(\alpha),
\eta_a(\alpha)-\epsilon_\eta
\right\}.
$$

Define the excluded-interval margin

$$
m_{\mathrm{gap},ij,n}
=
\inf_{\eta\in E_{ij,n}}
\left|G_{ij,n}(\eta;\alpha)\right|
-
\epsilon_G.
$$

Define the root-separation margin

$$
m_{\mathrm{sep}}
=
\min_{\substack{a\ne b\\\text{same }(i,j,n)}}
\left|\eta_a(\alpha)-\eta_b(\alpha)\right|
-
\epsilon_{\eta,\mathrm{merge}}.
$$

Define the finite-memory margin

$$
m_{\mathrm{mem}}
=
\eta_{\max}
-
\max_a\eta_a(\alpha).
$$

The root/Jacobian barrier added to the curve objective is

$$
\mathcal{B}_{\mathrm{RJ}}
=
\sum_a
\left[
B(m_{\mathrm{end},a}^-;m_{\mathrm{end},0},\beta_{\mathrm{end}})
+
B(m_{\mathrm{end},a}^+;m_{\mathrm{end},0},\beta_{\mathrm{end}})
+
B(m_{J,a};m_{J,0},\beta_J)
+
B(m_{\eta,a};m_{\eta,0},\beta_\eta)
\right]
$$

$$
\quad
+
\sum_{i,j,n}
B(m_{\mathrm{gap},ij,n};m_{\mathrm{gap},0},\beta_{\mathrm{gap}})
+
B(m_{\mathrm{sep}};m_{\mathrm{sep},0},\beta_{\mathrm{sep}})
+
B(m_{\mathrm{mem}};m_{\mathrm{mem},0},\beta_{\mathrm{mem}}).
$$

The total intrinsic objective should use

$$
\mathcal{J}_{\mathrm{curve}}
\leftarrow
\mathcal{J}_{\mathrm{curve}}
+
\mathcal{B}_{\mathrm{RJ}},
$$

but acceptance remains gate-based:

$$
m_{\mathrm{end},a}^{\pm}>0,
\qquad
m_{J,a}>0,
\qquad
m_{\eta,a}>0,
\qquad
m_{\mathrm{gap},ij,n}>0,
\qquad
m_{\mathrm{sep}}>0,
\qquad
m_{\mathrm{mem}}>0.
$$

No finite residual norm can compensate for a nonpositive barrier margin.

---

## 7. Trust-Region Use

At a base point $\alpha_0$, compute the largest admissible scalar step $\rho_{\mathrm{RJ}}$ satisfying

$$
\Lambda_G(\rho_{\mathrm{RJ}})
\le
\frac{1}{2}
\min\{\gamma_{\mathrm{end}},\gamma_{\mathrm{gap}}\},
$$

$$
\Lambda_J(\rho_{\mathrm{RJ}})
\le
\frac{1}{2}(J_0-\epsilon_J),
$$

and

$$
\frac{\Lambda_G(\rho_{\mathrm{RJ}})}
{J_0-\Lambda_J(\rho_{\mathrm{RJ}})}
\le
\frac{1}{2}\Delta_\eta.
$$

Then the Gauss-Newton or Levenberg-Marquardt trial radius should obey

$$
\|\Delta\alpha\|
\le
\min\{\rho_{\mathrm{trust}},\rho_{\mathrm{RJ}}\}.
$$

This explains the status of the $M=2$ rank result in [intrinsic-m2-collocation-rank-results.md](intrinsic-m2-collocation-rank-results.md). The large unconstrained least-squares correction is only a direction signal. Actual accepted steps must be clipped by the root/Jacobian radius and must rerun the bracketed root solver from scratch.

---

## 8. Output Fields For Solver Packets

Every intrinsic collocation run that uses this barrier lemma should emit the following additional fields:

| Field | Required payload |
| --- | --- |
| `root_brackets` | $I_a=[\eta_a^-,\eta_a^+]$ for every retained root label |
| `endpoint_gaps` | $\gamma_{\mathrm{end}}$ and per-label endpoint margins |
| `excluded_gap` | $\gamma_{\mathrm{gap}}$ or an interval-certified lower bound on excluded intervals |
| `jacobian_envelope` | $J_0$, $\epsilon_J$, $\Lambda_J$, and the method used to bound $\Lambda_J$ |
| `root_function_envelope` | $\Lambda_G$ and whether it came from analytic bounds, interval arithmetic, or automatic differentiation |
| `bounded_speed_fields` | when active, $\nu_i$, $\chi_i$, $\chi_i^{-1}$, $D_v\chi_i$, $D_v\chi_i^{-1}$, $G^\nu$, and $J^\nu$ |
| `root_displacement_bound` | $\rho_\eta=\Lambda_G/(J_0-\Lambda_J)$ and comparison with $\Delta_\eta$ |
| `root_count_by_node` | active-root count for every receiver/source/node row on the training grid and refined off-grid screens |
| `first_missing_root_label` | first retained label that loses its bracket, if a clipped step changes the count |
| `memory_window_frontier` | largest retained delay, first label crossing $\eta_{\max}$, and whether an extended window recovers the root |
| `memory_bound` | $\eta_{\max}$, $\eta_{\mathrm{act}}$, $r_{\max}$, and the support or center-drift hypothesis that supplies it |
| `memory_policy` | `fixed-window`, `active-window-certified`, or `support-complete-memory` |
| `tail_certificate` | either $\eta_{\max}\ge2r_{\max}+m_\eta$ after in-window enumeration, or an interval proof such as [tail-interval-root-exclusion-certificate.md](tail-interval-root-exclusion-certificate.md) that the remaining tail is root-free |
| `barrier_values` | all positive margins and logarithmic barrier values |
| `root_chart_status` | `root-chart-certified`, `root-chart-rescreen-required`, or `root-chart-failed` |

The root chart status is independent from the curve residual status. A packet may have a promising residual decrease and still exit with `root-chart-rescreen-required`.

---

## 9. Failure Codes

Use these failure codes in the solver packet. Existing architecture codes are preferred when they apply directly.

| Failure code | Trigger |
| --- | --- |
| `root-bracket-sign-loss` | $m_{\mathrm{end},a}^-\le0$ or $m_{\mathrm{end},a}^+\le0$ for a retained bracket |
| `root-exclusion-gap-loss` | $m_{\mathrm{gap},ij,n}\le0$ on an excluded interval set |
| `root-merge-risk` | $m_{\mathrm{sep}}\le0$ or $\rho_\eta\ge\Delta_\eta$ |
| `root-label-derivative-invalid` | a finite-difference or trust-region step leaves the certified root chart |
| `root-count-change` | the bracketed root solver finds a different active-root count without a declared branch event |
| `memory-window-exit` | a retained root continues beyond the declared $\eta_{\max}$ window |
| `tail-interval-uncertified` | $\eta_{\max}<2r_{\max}$ and the interval beyond $\eta_{\max}$ is not certified root-free |
| `jacobian-floor-violation` | some retained root has $|J|\le\epsilon_J$ |
| `finite-memory-window-exceeded` | some retained root has $\eta>\eta_{\max}$ |
| `near-zero-self-root-unresolved` | a same-source near-zero interval is used without `retained-positive-delay` or `regularized-fold-layer` status |
| `linear-step-floor-inadmissible` | a linearized correction violates the first-order root, Jacobian, support, or noncollision floor |
| `collocation-aliasing-fail` | mesh or mode refinement changes the certified brackets, root count, or barrier margins |

The correct decision status after any of these failures is

$$
\texttt{no-retained-branch}
$$

unless a new packet supplies a replacement root chart and reruns the residual, floor, event/action, and observer-export rows on that replacement ledger.

---

## 10. Promotion Decision

This packet remains `priority-only`. It is ready to support solver packets and rank checks, but it is not reader-facing corpus material until a concrete intrinsic collocation candidate supplies:

$$
\mathcal{R}_{\mathrm{curve}}\approx0,
\qquad
J_{\min}>\epsilon_J,
\qquad
d_{\min}>\epsilon_x,
\qquad
\eta_{\min}>\epsilon_\eta,
$$

on one certified root chart, with event/action rows no longer marked `not_computed`.
