# Spiral VP-1 Next-Candidate Sensitivity

Status. Priority-only fallback packet for `spiral_branch_chart_test` if the VP-1 $\Gamma$ route remains blocked. This packet does not edit `spiral_branch_chart_certificate.py`, the current sidecar, generated reports, the priority queue, or authored AAA prose. It identifies the smallest useful next executable action without promoting VP-1 beyond its current status.

Claim level. Parameter-continuation target, not a theorem-grade branch-chart result. VP-1 still has a certified tangential-drive failure on the fixed chart, while the radial-turn row remains blocked until a strict force-ratio interval is declared.

## Current Fixed Evidence

The fixed VP-1 candidate is
$$
a_0=\frac{1}{10},
\qquad
b_{\ast,0}=\frac{7}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],
$$
with retained active labels
$$
P_1,\ P_2,\ P_3,\ S_1.
$$
The structural rows for this retained chart are accepted in the current sidecar: active roots, active Jacobian floor, inactive gaps, self-coincidence clearance, finite memory, and root transport all pass for the declared VP-1 contract.

The radial branch interval is
$$
B_r(0)\in[-0.27143260470972164,\ -0.27143255629407625].
$$
For a declared force-ratio interval $\Gamma\in[\Gamma^-,\Gamma^+]$ in the accepted normalization
$$
\Gamma=\frac{r_\ast^3\Omega^2}{\kappa q_1^2},
$$
the radial row has only these strict outcomes:

| Outcome | Inequality |
| --- | --- |
| `passed` | $\Gamma^-+B_r^->0$, equivalently $\Gamma^->0.27143260470972164$ for the current branch interval. |
| `certified_fail` | $\Gamma^+ + B_r^+\le0$, equivalently $\Gamma^+\le0.27143255629407625$ for the current branch interval. |
| `blocked` | Neither strict inequality is proved. |

The tangential row is already certified as a VP-1 failure:
$$
\mathcal{D}_T(I_\ast)\ge0.036446308644655666>0.
$$
Therefore $\Gamma$ should not be used as a shape-search knob. It can decide radial admissibility after a candidate is selected, but it cannot repair a nonnegative tangential-drive interval.

## Variable Order

Vary $a$ first. It is the smallest genuine next-candidate variable because it changes the pitch law
$$
p(\theta)=-a\sin\theta
$$
and the delayed ratio
$$
\rho(\theta,\Delta)=\exp(a(\cos\theta-\cos(\theta-\Delta)))
$$
while leaving the delay scale $b_\ast$, corridor, active-root naming convention, and $\Gamma$ blocker untouched. The first continuation family should be
$$
C_a(a)=\left(a,\ \frac{7}{2},\ \left[-\frac{\pi}{6},\frac{\pi}{6}\right]\right),
\qquad
a>0,
$$
with VP-1 as the center row.

Vary $b_\ast$ second. The parameter $b_\ast=\Omega R_\ast/c_f$ changes the causal-delay scale and can create or remove active roots. It should be touched only after the $a$-only run reports either no plausible negative tangential direction or a near-boundary region where root placement, not pitch amplitude alone, controls the sign.

Keep the corridor fixed until a pointwise sign reason exists. The corridor $I_\ast$ and weight $w(\theta)=\cos^2(3\theta)$ are part of the VP-1 candidate definition. A narrower or shifted corridor must not be used to hide positive tangential-drive regions. Corridor variation is legitimate only after an executable pointwise row reports an interior subinterval $J\subset I_\ast$ with a strict negative tangential interval $T^+(J)<0$ and stable roots on $J$.

Do not vary active roots as free parameters. Active labels are outputs of the root equations, not knobs. A continuation row may retain $P_1,P_2,P_3,S_1$ only when interval root enclosures, a positive Jacobian floor, and inactive gaps persist. A root birth, root death, branch exchange, or inactive-gap closure is a branch-transition packet, not a passing next candidate.

Do not vary $\Gamma$ in this lane. If an accepted $\Gamma$ interval appears, it belongs in the radial-turn sidecar row. Until then, each continuation row should report only the radial threshold interval
$$
G_{\mathrm{pass}}=-B_r^-,
\qquad
G_{\mathrm{fail}}=-B_r^+.
$$

Treat the tangential lower bound as the first decision output, not as an input. The search target is a strict interval reversal,
$$
\mathcal{D}_T^+(I)\le-\varepsilon_T,
\qquad
\varepsilon_T>0,
$$
under certified structural rows. A lower bound $\mathcal{D}_T^-(I)\ge0$ rejects the candidate's negative-drive row.

## Minimal Executable Target

The smallest useful executable target is an $a$-only sensitivity table, not a global scanner and not a sidecar update. It should evaluate the three rows
$$
(a,b_\ast,\theta_c)
\in
\left\{
\left(0.08,\frac{7}{2},\frac{\pi}{6}\right),
\left(0.10,\frac{7}{2},\frac{\pi}{6}\right),
\left(0.12,\frac{7}{2},\frac{\pi}{6}\right)
\right\},
$$
where $I_{\theta_c}=[-\theta_c,\theta_c]$. The center row must reproduce the current VP-1 values before the neighboring rows are interpreted.

For each row, emit a machine-readable record with:

| Field | Required output |
| --- | --- |
| `parameters` | `a`, `b_star`, `theta_interval`, `delta_co`, `delta_cert`. |
| `active_roots` | Partner/self root count, labels, root intervals, root-boundary sign rows, and whether the retained label set is still $P_1,P_2,P_3,S_1$. |
| `structural_bounds` | $\nu_J^-$, inactive partner gap, inactive self gap, self-coincidence clearance, maximum active $\Delta$, and finite-memory bound. |
| `radial_branch` | $B_r(0)\in[B_r^-,B_r^+]$, $G_{\mathrm{pass}}=-B_r^-$, and $G_{\mathrm{fail}}=-B_r^+$. |
| `tangential_drive` | Pointwise $T(\theta)$ interval summary, weighted interval $\mathcal{D}_T(I_{\theta_c})\in[D_T^-,D_T^+]$, and the status from the decision inequalities below. |
| `sensitivity` | $\Delta D_T=D_T(a)-D_T(a_0)$ and, if available, one-sided finite-difference rows for $\partial_a D_T$ and $\partial_a G_{\mathrm{pass}}$. |
| `classification` | `local_fail`, `negative_drive_candidate`, `branch_transition`, or `blocked_interval_width`. |

The executable output is useful only if sampled rows are clearly separated from outward interval rows. A sampled negative value is a target selector, not a certificate. A sidecar row must not be written from this sensitivity table unless the row also satisfies the strict interval evidence rules already used by the current runner.

Coordinator follow-up. [spiral-vp1-a-sensitivity-sampled-report](spiral-vp1-a-sensitivity-sampled-report.md) executed this sampled target and found a sign-reversal bracket between $a=0.2025$ and $a=0.203$ while the sampled active ledger remains partner $3$, self $1$ and the sampled minimum $|J|$ remains above $1.57$. The next certificate target is therefore a focused $a_{\mathrm{A1}}\in[0.203,0.205]$ retained-chart interval packet, not a wide search and not a $\Gamma$ tuning exercise.

## Decision Inequalities

For a continuation candidate $C=(a,b_\ast,I)$ with retained chart $\mathcal{A}$, define:
$$
\nu_J(C)=\inf_{\alpha\in\mathcal{A}}|J_\alpha|,
\qquad
g_{\mathrm{inact}}(C)=\inf_{\mathrm{inactive}}|F|,
$$
$$
B_r(C)\in[B_r^-(C),B_r^+(C)],
\qquad
\mathcal{D}_T(C)\in[D_T^-(C),D_T^+(C)].
$$

The structural row is admissible only if
$$
\nu_J(C)\ge\nu_{\mathrm{cert}}>0,
\qquad
g_{\mathrm{inact}}(C)\ge g_{\mathrm{cert}}>0,
\qquad
\Delta_{\max}(C)<h_{\mathrm{mem}}(C)<4\pi.
$$
If any of these inequalities fails, classify the row as `branch_transition` or `structural_fail`; do not use its tangential sign as a candidate verdict.

The radial row is:
$$
\mathrm{radial\_passed}
\Longleftrightarrow
\Gamma^-+B_r^-(C)>0,
$$
$$
\mathrm{radial\_certified\_fail}
\Longleftrightarrow
\Gamma^+ + B_r^+(C)\le0.
$$
With no strict $\Gamma$ interval, this row is `blocked` and must remain only a threshold report.

The tangential row is:
$$
\mathrm{tangential\_passed}
\Longleftrightarrow
D_T^+(C)\le-\varepsilon_T
\quad(\varepsilon_T>0),
$$
$$
\mathrm{tangential\_certified\_fail}
\Longleftrightarrow
D_T^-(C)\ge0.
$$
If $D_T^-(C)<0<D_T^+(C)$, the row is `blocked_interval_width`, not a sign result.

## Closure Or Rejection Conditions

A theorem-grade passing spiral candidate requires all of:
$$
\nu_J>0,\quad g_{\mathrm{inact}}>0,\quad h_{\mathrm{mem}}<4\pi,
\quad
\Gamma^-+B_r^->0,
\quad
D_T^+\le-\varepsilon_T<0.
$$
Absent a strict $\Gamma$ interval, a negative tangential-drive row is only a next-candidate target for the radial route; it is not `spiral_branch_chart_test` closure.

A theorem-grade rejection of a candidate occurs if the structural rows pass and either
$$
\Gamma^+ + B_r^+\le0
$$
or
$$
\Gamma^-+B_r^->0
\quad\text{and}\quad
D_T^-\ge0.
$$
This matches the current runner logic: tangential failure becomes theorem-grade rejection only after the radial row is resolved as passed, while a radial certified failure rejects independently.

A useful $\Gamma$-independent local rejection is still possible. For a declared parameter box $Q$ in the $a$-continuation family, if interval continuation proves
$$
\nu_J(Q)>0,\qquad
g_{\mathrm{inact}}(Q)>0,\qquad
h_{\mathrm{mem}}(Q)<4\pi,
\qquad
D_T^-(Q)\ge0,
$$
then no candidate in $Q$ can satisfy the negative weighted tangential-drive condition, regardless of the missing $\Gamma$ value. This is the best fallback closure if the force-ratio route stays blocked: it shrinks the admissible next-candidate search without pretending VP-1 itself is theorem-grade complete.

## Escalation To Two Parameters

Move from $a$-only continuation to $(a,b_\ast)$ only when the first sensitivity table reports one of these conditions:

- both neighboring $a$ rows preserve the active chart and keep $D_T^->0$, but the one-sided sensitivity indicates $D_T$ decreases toward one side;
- a neighboring $a$ row is near sign reversal, with $D_T^-<0<D_T^+$, and the interval width is dominated by root enclosure drift rather than quadrature width;
- the retained $P_1,P_2,P_3,S_1$ chart becomes a branch-transition row before $D_T$ can be tested.

The first two-parameter probes should keep the corridor fixed and use the best $a$ direction from the first run with
$$
b_\ast\in\{3.25,\ 3.50,\ 3.75\}.
$$
Each row must recompute active roots from the equations. Reusing the VP-1 windows without verifying root-boundary signs and inactive gaps would overpromote the chart.

## Promotion Decision

Priority-only. This packet is not suitable for `content/markdown/aaa` promotion. It records a minimal executable sensitivity target and strict decision inequalities for `spiral_branch_chart_test`. The next durable artifact should be a sensitivity JSON/markdown report that either rejects a declared $a$-neighborhood by $D_T^-\ge0$ or identifies a negative-drive candidate that still waits for a strict $\Gamma$ interval before any theorem-grade closure claim.
