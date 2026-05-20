# Next Candidate Solver Target

## Scope

This packet defines the next executable candidate-generation target after `seed-doubled-four-arc-cosine-template-v0` was rejected at the parent-complement gate.

It is priority-only. It does not claim a solved candidate, does not edit `causal_ledger.json`, does not edit `fold_layer_atlas.json`, does not create `branch_chart.json`, and does not authorize branch-chart construction.

## Verdict

The next executable target is a fresh fold-adapted collocation candidate for the same doubled four-arc itinerary, with the null-coordinate pre-ledger as the first acceptance row.

The rejected cosine packet may be used only as diagnostic data. The solver must be judged first by whether it removes fold-adjacent parent-complement equality cores before branch-chart construction.

## Packet Identity To Instantiate

The candidate generator must freeze one new packet identity
$$
\mathfrak{I}_{\mathrm{next}}
=
\left(
\mathcal{K},
T_{\mathrm{cyc}},
\mathcal{S},
\mathcal{P},
\mathcal{B}_{\mathrm{rep}},
\Theta
\right).
$$

Recommended fixed choices for the first run:

| Entry | Target choice |
| --- | --- |
| $\mathcal{K}$ | `doubled_four_arc_generic`, rerun itinerary parity if separator ordering changes. |
| $\mathcal{P}$ | Keep `c_f=1.0`, `eta=0.02`, `epsilon_c=0.05`, `g=1.0`, and `h=6.28318530718` for comparison with the rejected packet. |
| $\mathcal{S}$ | Section $x(0)=x_\ast$, $\dot x(0)=-v_\ast$, $0<v_\ast<c_f$, with half-period antisymmetry $x(\theta+1/2)=-x(\theta)$. |
| $\mathcal{B}_{\mathrm{rep}}$ | Fold-adapted piecewise collocation representation for the first half-cycle, mirrored to the second half-cycle. |
| $\Theta$ | Separator-refined mesh with explicit parent-complement strips recorded before interval acceptance. |

Free solver variables:
$$
\mathbf a_{\mathrm{next}}
=
\left(
T_{\mathrm{cyc}},
x_\ast,
v_\ast,
\sigma_1,
\sigma_2,
\rho_1,
\rho_2,
\{p_{\ell,k}\},
\{q_{\Sigma_i},r_{\Sigma_i}\},
\Theta_{\mathrm{adapt}}
\right),
$$
with
$$
0<\sigma_1<\sigma_2<1/2,
\qquad
\sigma_3=\sigma_1+1/2,
\qquad
\sigma_4=\sigma_2+1/2.
$$

Here $p_{\ell,k}$ are the regular-arc collocation coefficients for $x(t)$ and $\dot x(t)$, while $q_{\Sigma_i},r_{\Sigma_i}$ are local fold-coordinate coefficients for the null coordinate whose derivative vanishes at $\Sigma_i$. The local fold coordinate must expose
$$
y(t)-y(t_{\Sigma_i})
=
q_{\Sigma_i}(t-t_{\Sigma_i})^2
+
r_{\Sigma_i}(t-t_{\Sigma_i})^3
+
O((t-t_{\Sigma_i})^4),
\qquad
y\in\{u,w\},
$$
with an interval target $|2q_{\Sigma_i}|\ge\alpha_{\Sigma_i}>0$.

## Ansatz Requirements

Use a first-order state representation
$$
X(\theta)=x(T_{\mathrm{cyc}}\theta),
\qquad
U(\theta)=\dot x(T_{\mathrm{cyc}}\theta),
\qquad
\partial_\theta X=T_{\mathrm{cyc}}U.
$$

The first half-cycle is split into three regular arcs and two separator layers:
$$
[0,\sigma_1-\rho_1],
\quad
[\sigma_1-\rho_1,\sigma_1+\rho_1],
\quad
[\sigma_1+\rho_1,\sigma_2-\rho_2],
\quad
[\sigma_2-\rho_2,\sigma_2+\rho_2],
\quad
[\sigma_2+\rho_2,1/2].
$$

The solver must enforce:

1. section anchoring $X(0)=x_\ast$ and $U(0)=-v_\ast$;
2. half-period antisymmetry $X(\theta+1/2)=-X(\theta)$ and $U(\theta+1/2)=-U(\theta)$;
3. separator constraints $|U(\sigma_i)|=c_f$ for $i=1,\dots,4$;
4. fold nondegeneracy in the vanishing null coordinate, $\alpha_{\Sigma_i}>0$ and $\nu_{\mathrm{exit},\Sigma_i}>0$;
5. origin-layer events inside the super-field arcs, not at separator endpoints;
6. $C^1$ matching across regular interfaces, with fold layers represented by their own local coordinates rather than by a simple-root branch sum.

## Residual Vector

The candidate-generation residual is
$$
\mathcal R_{\mathrm{next}}(\mathbf a_{\mathrm{next}})
=
\left(
G_{\mathrm{sec}},
G_{\mathrm{sym}},
G_{\mathrm{per}},
G_{\mathrm{sep}},
G_{\mathrm{match}},
G_{\mathrm{orig}},
\{E_j\}_{j\in\Theta_{\mathrm{simple}}},
\{I_{\Sigma_i,k}\},
\{R_j^x,R_j^v\}_{j\in\Theta},
H_{\mathrm{pc}}
\right).
$$

The structural residuals are:

| Residual | Required meaning |
| --- | --- |
| $G_{\mathrm{sec}}$ | Section anchoring and time-translation removal. |
| $G_{\mathrm{sym}}$ | Half-period antisymmetry and mirrored separator labels. |
| $G_{\mathrm{per}}$ | Periodic endpoint compatibility. |
| $G_{\mathrm{sep}}$ | Field-speed separator equations and fold-coordinate nondegeneracy. |
| $G_{\mathrm{match}}$ | $C^1$ regular-arc matching plus fold-layer boundary recovery. |
| $G_{\mathrm{orig}}$ | Origin-layer placement and signed crossing inside the super-field arcs. |

The dynamic residuals remain targets, not proof of a returned sample:
$$
E_j
=
\left|
\ddot x(t_j)-F_\eta^\Pi(t_j)
\right|,
\qquad
R_j^x
=
\left|
P_\eta(\phi_{\mathrm{cyc}})(\theta_j)
-
\phi_{\mathrm{cyc}}(\theta_j)
\right|,
$$
$$
R_j^v
=
\left|
\partial_\theta P_\eta(\phi_{\mathrm{cyc}})(\theta_j)
-
\dot\phi_{\mathrm{cyc}}(\theta_j)
\right|.
$$

Fold residuals are interval fold-contribution targets $I_{\Sigma_i,k}$, not branch-sum residuals.

The parent-complement steering term $H_{\mathrm{pc}}$ is not an acceptance theorem. It is a search objective that penalizes any fold-adjacent parent complement whose outward-rounded null-coordinate ranges have zero gap, positive-width overlap, or residual equality core after the proposed simple-root windows are removed.

The stronger use of $H_{\mathrm{pc}}$ is a gap-opening perturbation criterion. Let
$$
C(\mathbf a)=0
$$
collect the structural constraints in the fresh fold-collocation packet, and for each unresolved parent complement $C_m=R_m\times S_m$ define a signed gap functional
$$
\delta_m(\mathbf a)
=
\inf_{\theta_s\in S_m} y_m(\theta_s;\mathbf a)
-
\sup_{\theta_r\in R_m} y_m(\theta_r;\mathbf a),
$$
or the opposite ordering, so that $\delta_m>0$ means strict null-coordinate separation. A provisional candidate $\mathbf a_0$ has a constructive parent-complement repair direction when there exists $\xi$ such that
$$
DC(\mathbf a_0)\xi=0,
\qquad
D\delta_m(\mathbf a_0)\xi\ge \kappa_m>0
\quad
\text{for every unresolved }m.
$$
Then, by the implicit-function theorem, a nearby structural solution curve opens those parent-complement gaps for sufficiently small positive parameter. In matrix form the solver should test
$$
B\xi=0,
\qquad
A\xi\ge\kappa\mathbf{1},
$$
where $B$ is the structural Jacobian plus neutral-coordinate fixing rows and $A$ is the signed parent-complement gap derivative matrix. This is a candidate-construction mechanism, not a certificate pass.

The first proof aid for this condition is
[`null-coordinate-gap-opening-scanner.mjs`](../../../../../scripts/proof-programs/null-coordinate-gap-opening-scanner.mjs).
It accepts a declared finite matrix and reports a strict witness only when it
finds
$$
\|\xi\|_\infty\le1,
\qquad
B\xi=0
\quad\text{to tolerance},
\qquad
A\xi>\kappa.
$$
The diagnostic artifact
`gap_opening_feasibility_result.seed_cosine_diagnostic_demo.v0.json` shows the
success-marker shape on independent endpoint-shear columns, while explicitly
leaving `preledger_pass=false` and `branch_chart_authorized=false`. A live fresh
candidate must replace that diagnostic matrix with $B=DC(\mathbf a_0)$ and the
true signed gap derivative matrix $A$ for one frozen packet identity.

## Null-Coordinate Pre-Ledger Acceptance Targets

Before any branch-chart construction, the successor packet must run the null-coordinate pre-ledger on its own frozen identity and record:
$$
u(t)=c_f t-x(t),
\qquad
w(t)=c_f t+x(t).
$$

Acceptance target:
$$
\text{every row}
\in
\{\text{empty},\text{simple_root},\text{fold_layer}\},
\qquad
\text{no `split_required` rows}.
$$

Required global margins:
$$
\gamma_{\mathrm{empty}}>0,
\qquad
\nu_{\mathrm{simple}}>0,
\qquad
\gamma_{\mathrm{cov}}>0,
\qquad
\gamma_{\tau}>0,
\qquad
\gamma_h>0,
\qquad
\gamma_{\mathrm{sign}}>0,
\qquad
\gamma_{\mathrm{inact}}>0.
$$

Required fold fields for every separator:
$$
\alpha_{\Sigma}>0,
\qquad
\nu_{\mathrm{exit},\Sigma}>0,
\qquad
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}<\infty,
\qquad
\Delta N_\Sigma\in2\mathbb{Z},
\qquad
\Delta D_\Sigma=0.
$$

Every simple-root parent complement must satisfy at least one accepted alternative:

1. strict outward-rounded range-empty gap;
2. endpoint-excluded singleton contact under the approved parent-complement boundary convention;
3. exact accepted fold-layer coverage;
4. an explicit same-packet regular-boundary theorem with inclusion, domination, ownership, and non-core strict-gap fields.

The first solver run should screen for a numerical buffer before interval certification:
$$
\min
\left(
\gamma_{\mathrm{empty}},
\gamma_{\mathrm{cov}},
\gamma_{\mathrm{inact}}
\right)
\ge 5\times 10^{-3}
$$
on the floating candidate data. This buffer is only a search filter; the certificate acceptance condition remains strict interval positivity on the same packet identity.

## Stop Conditions

Stop before branch-chart construction if any of the following occurs:

1. the solver cannot freeze one packet identity with matching `phi_cyc.json`, `mesh.json`, and pre-ledger inputs;
2. itinerary parity fails after the chosen separator ordering is instantiated;
3. any ordered row remains `split_required` after the null-coordinate pre-ledger;
4. any fold row lacks finite same-packet fold fields;
5. any fold-adjacent parent complement retains a positive-width null-coordinate overlap, residual equality core, or uncertified endpoint-scale gap;
6. any inactive complement has $\gamma_{\mathrm{inact}}\le0$;
7. dynamic residuals improve but the null-coordinate pre-ledger still fails.

If the pre-ledger passes with every row accepted as `empty`, `simple_root`, or `fold_layer`, stop this packet with the verdict `preledger_ready_for_branch_chart`. Only a later packet may construct `branch_chart.json`.

## Capture Decision

Priority-only. This is an executable solver target for the proof-program priority bucket. It is not reader-facing AAA prose and should not be promoted into `content/markdown/aaa` unless a later proof-program chapter needs a worked account of candidate-generation gates before branch-chart certification.
