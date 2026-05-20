# Spiral Branch-Chart Certificate

Status. Active proof packet for `spiral_branch_chart_test`. The circular dependency is now satisfied, so VP-1 is the first concrete variable-pitch spiral branch-chart target consumed by the active queue item. The sampled executable pass finds a stable $3+1$ root ledger, positive sampled Jacobian floors, finite memory, and a positive weighted tangential-drive diagnostic. Therefore VP-1 is not a passing bare isolated spiral certificate at sampled level, but this packet does not close the queue item because the active-root, inactive-gap, root-transport, and weighted-integral rows still need outward interval proof.

Claim level. Candidate VP-1 below is a branch-chart certification target, not a promoted master-equation closure claim. A passing certificate would show that the chosen isolated variable-pitch spiral has a replayable finite causal-root chart and a negative weighted tangential drive on a radial-turn corridor. A failing certificate falsifies this candidate only; it becomes a theorem-grade VP-1 rejection only after the interval proof rows close.

## Source Equations Consumed

The Master EOM supplies the branch-resolved acceleration law
$$
\frac{d^2 \mathbf{x}_i}{dt^2}
=
\sum_j \sum_{t_0\in\mathcal{C}_{ij}(t)}
\kappa\,\sigma_{ij}\,
\frac{|q_i q_j|}
{r_{ij}^2(t;t_0)\,\left|J_{ij}(t;t_0)\right|}
\hat{\mathbf{r}}_{ij}(t;t_0),
$$
with
$$
J_{ij}(t;t_0)
\equiv
1-\frac{\mathbf{v}_j(t_0)\cdot\hat{\mathbf{r}}_{ij}(t;t_0)}{c_f}.
$$
The branch-chart object is usable only when its active roots are simple, its inactive complements have positive gaps, and its memory depth is finite:
$$
\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)
=
\left(
\mathcal{R}^{\mathrm{act}},
\mathcal{G}^{\mathrm{inact}},
\nu_J,
h_{\mathrm{mem}},
\mathcal{R}_{\mathrm{return}},
\lambda_{\mathrm{sec}}
\right),
$$
with
$$
\nu_J>0,\qquad
\inf_{\mathcal{G}^{\mathrm{inact}}}g_a^{ij}>0,\qquad
0<h_{\mathrm{mem}}<h<\infty.
$$
The dyadic-lock priority note supplies the discipline used here: a root ledger is only a branch label until a finite-$\eta$ return or certificate reports finite active branches, positive Jacobian floors, a closed returned section, and a non-symmetry stability gap. VP-1 therefore reports branch-chart data first and does not use an integer branch count as proof of stability.

## Candidate History VP-1

Use the symmetric isolated pair
$$
\mathbf{x}_1(\theta)=r(\theta)\mathbf{e}_r(\theta),
\qquad
\mathbf{x}_2(\theta)=-r(\theta)\mathbf{e}_r(\theta),
$$
with
$$
p(\theta)=-\frac{r'(\theta)}{r(\theta)}=-a\sin\theta,
\qquad
a=\frac{1}{10},
$$
$$
r(\theta)=R_\ast\exp(a(1-\cos\theta)),
\qquad
t(\theta)=\frac{\theta}{\Omega},
\qquad
b_\ast=\frac{\Omega R_\ast}{c_f}=\frac{7}{2}.
$$
The radial-turn corridor is
$$
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],
\qquad
\theta_\ast=0,
$$
so
$$
p(0)=0,
\qquad
p'(0)=-a<0.
$$
This is the smallest paper-executable variable-pitch target because it has one controlled pitch reversal, a finite memory domain below, and the circular tangential sign at the turn point remains visible.

For any candidate branch offset $\Delta>0$, define
$$
\rho(\theta,\Delta)
=
\frac{r(\theta-\Delta)}{r(\theta)}
=
\exp(a(\cos\theta-\cos(\theta-\Delta))),
$$
$$
p_0=p(\theta-\Delta),
\qquad
b(\theta)=\frac{\Omega r(\theta)}{c_f}
=b_\ast\exp(a(1-\cos\theta)).
$$

## Partner And Self Root Equations

The partner geometry is
$$
\Lambda_p(\theta,\Delta)
=
\sqrt{1+\rho^2+2\rho\cos\Delta},
$$
with root equation
$$
F_p(\theta,\Delta)
\equiv
\Lambda_p(\theta,\Delta)-\frac{\Delta}{b(\theta)}
=0.
$$
The self geometry is
$$
\Lambda_s(\theta,\Delta)
=
\sqrt{1+\rho^2-2\rho\cos\Delta},
$$
with nontrivial self-root equation
$$
F_s(\theta,\Delta)
\equiv
\Lambda_s(\theta,\Delta)-\frac{\Delta}{b(\theta)}
=0,
\qquad
\Delta>0.
$$
The certification domain is
$$
D_h=(0,4\pi],
\qquad
h=\frac{4\pi}{\Omega}.
$$
The interval proof must choose a coincidence clearance $0<\Delta_{\mathrm{co}}<1$ and certify active roots only on
$$
D_{\mathrm{cert}}=[\Delta_{\mathrm{co}},4\pi],
$$
while separately proving the excluded-coincidence row
$$
\inf_{\theta\in I_\ast,\ 0<\Delta<\Delta_{\mathrm{co}}}
\frac{|F_s(\theta,\Delta)|}{\Delta}>0.
$$

## Jacobian-Floor Checks

The VP-1 partner Jacobian is
$$
J_{12}
=
1+
\frac{b(\theta)\rho}{\Lambda_p}
\left[\sin\Delta-p_0(\cos\Delta+\rho)\right],
$$
and the VP-1 self Jacobian is
$$
J_{11}
=
1-
\frac{b(\theta)\rho}{\Lambda_s}
\left[\sin\Delta+p_0(\rho-\cos\Delta)\right].
$$
The active floor is
$$
\nu_J
=
\min\left\{
\inf_{\theta\in I_\ast,\ \Delta_p\in\mathcal{P}(\theta)}
|J_{12}(\theta,\Delta_p)|,
\inf_{\theta\in I_\ast,\ \Delta_s\in\mathcal{S}(\theta)}
|J_{11}(\theta,\Delta_s)|
\right\}.
$$
Acceptance requires an explicit interval lower bound
$$
\nu_J\ge\nu_{\mathrm{cert}}>0.
$$
Failure occurs immediately if an active row touches $J=0$, if a negative tangential contribution appears only inside a Jacobian-null window, or if the root labels cannot be continued across $I_\ast$ without branch exchange.

## Inactive Complements And Finite Memory

The active root tubes must be removed from $I_\ast\times D_{\mathrm{cert}}$. Every remaining partner box $Q_a^p$ and self box $Q_a^s$ must satisfy
$$
g_a^p=\inf_{Q_a^p}|F_p(\theta,\Delta)|>0,
\qquad
g_a^s=\inf_{Q_a^s}|F_s(\theta,\Delta)|>0.
$$
The finite-memory estimate is already explicit:
$$
\rho\le e^{2a},
\qquad
\Lambda_{p,s}\le1+e^{2a},
\qquad
b(\theta)\le b_\ast e^{2a}.
$$
Therefore every retained root obeys
$$
\Delta\le b_\ast e^{2a}(1+e^{2a})
=9.497\ldots<4\pi,
$$
so
$$
h_{\mathrm{mem}}
\le
\frac{b_\ast e^{2a}(1+e^{2a})}{\Omega}
<
\frac{4\pi}{\Omega}=h.
$$
The finite-memory ledger row is accepted only if the computed active root enclosures all lie below the displayed bound and the inactive boxes cover the rest of $D_{\mathrm{cert}}$.

The inactive-memory proof packet also supplies the sharper corridor-specific bound
$$
B_{\mathrm{mem}}^{\mathrm{VP1}}
=
\frac{7}{2}
\left(
e^{(1-\sqrt3/2)/10}+e^{1/5}
\right)
=7.8221162806\ldots<4\pi,
$$
and proves the declared self-coincidence clearance for $\Delta_{\mathrm{co}}=1/2$:
$$
\inf_{\theta\in I_\ast,\ 0<\Delta<1/2}
\frac{|F_s(\theta,\Delta)|}{\Delta}
\ge0.6794678492\ldots>0.
$$

## Radial-Turn Inequality

At the turn point, define
$$
\mathcal{T}_r(0)
\equiv
r_\ast\Omega^2
-
\sum_{\Delta_p\in\mathcal{P}(0)}
\frac{\kappa |q_1q_2|\,(1+\rho_p\cos\Delta_p)}
{r_\ast^2\Lambda_{p}^3 |J_{12,p}|}
+
\sum_{\Delta_s\in\mathcal{S}(0)}
\frac{\kappa q_1^2\,(1-\rho_s\cos\Delta_s)}
{r_\ast^2\Lambda_{s}^3 |J_{11,s}|}.
$$
For equal-magnitude opposite charges, write
$$
\Gamma
\equiv
\frac{r_\ast^3\Omega^2}{\kappa q_1^2}.
$$
The sampled VP-1 center rows below give the normalized branch sum
$$
-
\sum_{\Delta_p\in\mathcal{P}(0)}
\frac{1+\rho_p\cos\Delta_p}
{\Lambda_{p}^3 |J_{12,p}|}
+
\sum_{\Delta_s\in\mathcal{S}(0)}
\frac{1-\rho_s\cos\Delta_s}
{\Lambda_{s}^3 |J_{11,s}|}
=-0.2714325805\ldots.
$$
Thus the interval radial-turn acceptance condition for this equal-charge normalization is
$$
\Gamma>0.2714325805\ldots+\varepsilon_r,
\qquad
\varepsilon_r>0,
$$
with the decimal replaced by an outward interval upper bound in the final certificate.

## Weighted Tangential-Drive Verdict

The branch tangential numerators are
$$
S_T^p(\theta,\Delta)
=
p(\theta)(1+\rho\cos\Delta)+\rho\sin\Delta,
$$
$$
S_T^s(\theta,\Delta)
=
-p(\theta)(1-\rho\cos\Delta)+\rho\sin\Delta.
$$
Use the declared quadrature weight
$$
w(\theta)=\cos^2(3\theta),
\qquad
\theta\in I_\ast.
$$
The diagnostic is
$$
\mathcal{D}_T(I_\ast)
\equiv
\int_{I_\ast}w(\theta)
\left[
\sum_{\Delta_p\in\mathcal{P}(\theta)}
\frac{|q_1q_2|\,S_T^p(\theta,\Delta_p)}
{\Lambda_p^3 |J_{12,p}|}
+
\sum_{\Delta_s\in\mathcal{S}(\theta)}
\frac{q_1^2\,S_T^s(\theta,\Delta_s)}
{\Lambda_s^3 |J_{11,s}|}
\right]d\theta.
$$
VP-1 passes the bare isolated spiral test only if the interval certificate proves
$$
\mathcal{D}_T(I_\ast)\le-\varepsilon_T,
\qquad
\varepsilon_T>0,
$$
while preserving $\nu_J>0$, positive inactive gaps, and finite memory depth. VP-1 fails this route if
$$
\mathcal{D}_T(I_\ast)\ge0
$$
on the certified chart, or if a negative value appears only by adding roots outside the certified active ledger.

## Paper Root Rows For The First Certificate

The following rows are a reproducibility target for the interval proof. They are not theorem-grade bounds; each decimal must be replaced by an outward enclosure before promotion.

At $\theta=0$, the sampled active ledger on $D_h=(0,4\pi]$ is:

| Class | $\Delta$ | $J$ | $\Lambda$ | $S_T$ | $S_T/(\Lambda^3|J|)$ |
| --- | ---: | ---: | ---: | ---: | ---: |
| Partner | $2.502775826$ | $4.356934994$ | $0.715078807$ | $0.714036100$ | $0.448205692$ |
| Partner | $4.385887226$ | $-1.771316799$ | $1.253110636$ | $-1.080902793$ | $-0.310114554$ |
| Partner | $6.806959744$ | $1.740787379$ | $1.944845641$ | $0.506902428$ | $0.039584324$ |
| Self | $4.840212128$ | $4.003062376$ | $1.382917751$ | $-1.082270060$ | $-0.102224321$ |

Endpoint sample checks preserve the same active count:

| $\theta$ | Partner roots | Self roots | Minimum sampled $|J|$ | Tangential sample sum |
| ---: | ---: | ---: | ---: | ---: |
| $-\pi/6$ | $3$ | $1$ | $1.669656880$ | $0.083465087$ |
| $0$ | $3$ | $1$ | $1.740787379$ | $0.075451141$ |
| $\pi/6$ | $3$ | $1$ | $1.912151342$ | $0.084204887$ |

A trapezoidal scratch quadrature over the same chart gives
$$
\mathcal{D}_T(I_\ast)\approx0.0401300178
$$
for equal-magnitude charges after the common positive factor is removed. This sampled sign points toward a VP-1 failure of the bare isolated spiral test, but the formal verdict is reserved for the interval certificate because root tubes, inactive gaps, and Jacobian floors must be certified on the whole corridor.

## Team-Agent VP-1 Support Packets

The current executable and worker packets are:

| Packet | Claim level | Verdict |
| --- | --- | --- |
| [spiral-vp1-root-jacobian-proof](spiral-vp1-root-jacobian-proof.md) | Sampled active-root and Jacobian-floor contract. | Stable $P_1,P_2,P_3,S_1$ root ledger on $D_{\mathrm{cert}}=[1/2,4\pi]$, sampled $\nu_J\ge1.669656880405$, interval target $\nu_{\mathrm{cert}}=1.50$. |
| [spiral-vp1-interval-root-gap-proof](spiral-vp1-interval-root-gap-proof.md) | Interval-pass active-root and inactive-gap packet. | Fixed tubes $P_1=[2.48,2.52]$, $P_2=[4.30,4.46]$, $P_3=[6.78,6.92]$, and $S_1=[4.80,4.90]$ have boundary sign rows, $\nu_{\mathrm{cert}}=1.50$, and $g_{\mathrm{inactive}}^{\mathrm{VP1}}\ge0.0030$. |
| [spiral-vp1-inactive-memory-proof](spiral-vp1-inactive-memory-proof.md) | Partial branch-chart certificate support. | Finite memory and self-coincidence rows certified; inactive gaps and root transport were handed to the later interval packets. |
| [spiral-vp1-root-transport-interval-proof](spiral-vp1-root-transport-interval-proof.md) | Dependent analytic root-transport row. | Root transport is analytic-pass once active tubes, nonzero $\partial_\Delta F$, $\partial_\Delta F=-J/b(\theta)$, and matching velocity projections are certified. |
| [spiral-vp1-drive-verdict-proof](spiral-vp1-drive-verdict-proof.md) | Computed radial and tangential verdict target. | $\Gamma_{\mathrm{turn}}=0.271432580502\ldots$ and $\mathcal{D}_T(I_\ast)\approx0.040130017760659>0$, so VP-1 fails the negative-drive row at sampled level. |
| [spiral-vp1-tangential-interval-proof](spiral-vp1-tangential-interval-proof.md) | Tangential interval reduction packet. | Reduces theorem-grade tangential rejection to a retained-chart lower-bound certificate; the executable evaluator now proves the stronger pointwise lower row $T(\theta)\ge0.06960732213899794$. |
| [spiral-vp1-tangential-evaluator-review](spiral-vp1-tangential-evaluator-review.md) | Tangential evaluator safety review. | Confirms sampled quadrature and sampled branch extrema cannot promote theorem grade; only outward pointwise or weighted-integral evidence can certify the tangential row. |
| [spiral-vp1-radial-gamma-routing](spiral-vp1-radial-gamma-routing.md) | Radial force-ratio routing packet. | Confirms the accepted normalization $\Gamma=r_\ast^3\Omega^2/(\kappa q_1^2)$ but finds no accepted $\Gamma$ value or interval. |
| [spiral-vp1-gamma-source-audit](spiral-vp1-gamma-source-audit.md) | Source-admissibility audit. | Finds no accepted VP-1 force-ratio interval; rejects $b_\ast$, branch thresholds, synthetic fixtures, breather constants, and unrelated $\Gamma$ symbols as legal sources. |
| [spiral-vp1-gamma-dimensional-closure](spiral-vp1-gamma-dimensional-closure.md) | Proof-style Gamma blocker. | Proves the VP-1 root chart cancels force-scale data and leaves $\Gamma=b_\ast^2c_f^2r_\ast/(\kappa q_1^2)$ independent of the kinematic branch data. |
| [spiral-vp1-radial-branch-interval-proof](spiral-vp1-radial-branch-interval-proof.md) | Radial branch-sum interval packet. | Records the outward retained-chart interval $B_r(0)\in[-0.27143260470972164,-0.27143255629407625]$ and the exact $\Gamma$ decision inequalities. |
| [spiral-vp1-gamma-decision-row-template](spiral-vp1-gamma-decision-row-template.md) | Gamma decision-row template. | Gives the sidecar-compatible `radial_turn` row shape for a future declared $\Gamma$ interval without selecting a force ratio. |
| [spiral-vp1-radial-validator-review](spiral-vp1-radial-validator-review.md) | Radial validator fixture review. | Documents adversarial radial-turn fixtures for pass, fail, boundary-blocked, and empty-evidence cases. |
| [spiral-vp1-next-candidate-sensitivity](spiral-vp1-next-candidate-sensitivity.md) | Parameter-continuation target. | If $\Gamma$ remains absent, the smallest useful follow-on is an $a$-only continuation table with structural, radial-threshold, and tangential-drive rows; $\Gamma$ is not a shape-search knob. |
| [spiral-vp1-a-sensitivity-sampled-report](spiral-vp1-a-sensitivity-sampled-report.md) | Sampled $a$-continuation target selector. | Finds a sampled sign-reversal bracket between $a=0.2025$ and $a=0.203$ on a sampled $3+1$ ledger; selects $a_{\mathrm{A1}}\in[0.203,0.205]$ for the next retained-chart interval packet. |
| [spiral-vp1-sidecar-schema-review](spiral-vp1-sidecar-schema-review.md) | Sidecar schema safety review. | Identifies drive-row semantic validation as required so theorem-grade status labels are not trusted without typed interval evidence. |
| [spiral-vp1-interval-integration-plan](spiral-vp1-interval-integration-plan.md) | Executable sidecar ingestion plan. | Adds a typed interval-row sidecar path so sampled rows cannot be mistaken for theorem-grade rows. |
| [spiral-vp1-current-interval-rows](spiral-vp1-current-interval-rows.json) | Current typed interval sidecar. | Loads the accepted structural rows and the tangential `certified_fail` row into the runner; leaves `radial_turn` blocked and keeps theorem grade false. |
| [spiral-branch-chart-interval-report](spiral-branch-chart-interval-report.md) | Executable VP-1 branch ledger with interval-proof blocker. | Structural rows pass and tangential drive is certified as a VP-1 failure; theorem grade remains false only because no strict $\Gamma$ row resolves radial turn. |

The executable runner is [spiral_branch_chart_certificate.py](spiral_branch_chart_certificate.py). With [spiral-vp1-current-interval-rows](spiral-vp1-current-interval-rows.json), its structural rows pass and the tangential row is `certified_fail`, with $\mathcal{D}_T(I_\ast)\ge0.036446308644655666$. The radial branch interval is $B_r(0)\in[-0.27143260470972164,-0.27143255629407625]$. `--require-theorem-grade` still exits nonzero because no strict $\Gamma$ interval resolves radial turn; the Gamma source audit and dimensional closure prove that this interval cannot be inferred from $b_\ast$ or from the retained VP-1 roots alone.

## A1 Continuation Support Packets

The first post-VP-1 continuation target fixes
$$
a_{\mathrm{A1}}=0.204,
\qquad
b_\ast=\frac{7}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],
$$
and retains the $P_1,P_2,P_3,S_1$ chart. These rows are priority-packet evidence until the runner or a typed sidecar emits them with the A1 candidate metadata.

| Packet | Claim level | Verdict |
| --- | --- | --- |
| [spiral-a1-root-window-certificate](spiral-a1-root-window-certificate.md) | Priority-packet structural interval row. | Retained windows $P_1=[2.55,2.69]$, $P_2=[4.00,4.34]$, $P_3=[6.78,7.12]$, and $S_1=[4.82,5.02]$ carry active boundary signs, inactive-complement signs, $\nu_{\mathrm{cert}}^{\mathrm{A1}}=1.20$, self-coincidence clearance, and corridor finite-memory bound $B_{\mathrm{mem}}^{\mathrm{A1}}=8.860302120379817<4\pi$. |
| [spiral-a1-drive-interval-target](spiral-a1-drive-interval-target.md) | Priority-packet radial threshold and tangential interval row. | Reports $B_r(C_{\mathrm{A1}};0)\in[-0.005994791326773983,-0.005994715991872956]$ and $D_T(C_{\mathrm{A1}};I_\ast)\in[-0.0015572472070875527,-0.00023480430280344085]$, so the tangential row is strictly negative while radial turn remains blocked without an accepted $\Gamma$ interval. |
| [spiral-a1-corpus-recommendation](spiral-a1-corpus-recommendation.md) | Corpus recommendation packet. | Recommends only a generic Master EOM radial-normalization clarification for `content/markdown/aaa` now; A1 numeric rows remain priority-only until sidecar integration, root transport, and $\Gamma$ are resolved. |

## Acceptance Ledger

The first executable certificate passes only if every row below is supplied.

| Row | Required certificate | Pass condition |
| --- | --- | --- |
| Candidate history | $a=1/10$, $b_\ast=7/2$, $I_\ast=[-\pi/6,\pi/6]$, $D_h=(0,4\pi]$. | Same history used in all rows. |
| Partner active roots | Interval enclosures for all roots of $F_p=0$ on $I_\ast\times D_{\mathrm{cert}}$. | Exactly the certified root tubes are retained; no unlisted partner root remains. |
| Self active roots | Interval enclosures for all nontrivial roots of $F_s=0$ on $I_\ast\times D_{\mathrm{cert}}$. | Exactly the certified root tubes are retained; near-coincidence row is excluded by $|F_s|/\Delta$ clearance. |
| Jacobian floor | Outward lower bound for $|J_{12}|$ and $|J_{11}|$ on active tubes. | $\nu_J\ge\nu_{\mathrm{cert}}>0$. |
| Inactive gaps | Box cover of inactive complements with lower bounds for $|F_p|$ and $|F_s|$. | Every gap bound is positive. |
| Finite memory | Root upper bound and active maximum $\Delta_{\max}$. | $\Delta_{\max}<b_\ast e^{2a}(1+e^{2a})<4\pi$. |
| Root transport | Interval residual for the simple-root transport equation on each active tube. | $\sup\mathcal{R}_{\mathrm{tr},\alpha}\le\varepsilon_{\mathrm{tr}}$. |
| Radial turn | Outward interval for $\mathcal{T}_r(0)$. | $\mathcal{T}_r(0)>0$, equivalently $\Gamma$ exceeds the branch bound in the equal-charge normalization. |
| Tangential drive | Outward interval for $\mathcal{D}_T(I_\ast)$. | Pass if $\mathcal{D}_T\le-\varepsilon_T$; fail VP-1 if $\mathcal{D}_T\ge0$. |
| Dependency status | Circular obstruction handoff from `circular_asymptotics`. | Passed: the theorem-grade circular interval and large-$\beta$ tail certificate is available. |

## Failure Modes

VP-1 is rejected as a certified branch-chart target if any of the following occurs:

- an active partner or self row loses the Jacobian floor;
- an inactive complement gap closes, exposing an unlisted causal root;
- the self-coincidence interval cannot be separated from the nontrivial self roots;
- the finite-memory bound reaches or exceeds $h=4\pi/\Omega$;
- the root-transport residual fails on a retained tube;
- $\mathcal{T}_r(0)\le0$ for the declared force ratio, so the candidate is not a radial-turn corridor;
- $\mathcal{D}_T(I_\ast)\ge0$, so the bare isolated spiral does not beat the tangential obstruction;
- $\mathcal{D}_T(I_\ast)<0$ only after adding uncertified roots, using a Jacobian-null window, or changing the candidate history;
- the result depends on an unresolved regulator or memory-window refinement;
- the sampled executable result is mistaken for theorem-grade priority completion before the interval blockers close.

## Claim Map

- Ontology: none added. The packet uses the existing delayed causal-root law and does not add a new substrate entity.
- Derivation/closure target: certify or falsify VP-1 as a local branch-chart candidate with positive floors, finite memory, a radial turn, and a tangential-drive verdict.
- Effective summary: the sampled positive $\mathcal{D}_T$ is a strong computed VP-1 failure signal, but theorem-grade rejection still requires outward interval rows.
- Speculation: none promoted. If later work varies $a$, $b_\ast$, $I_\ast$, or the candidate history to hunt for a negative tangential chart, that is a new parameter-search packet rather than a VP-1 conclusion.
