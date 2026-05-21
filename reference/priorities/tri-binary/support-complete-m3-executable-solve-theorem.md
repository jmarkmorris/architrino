# Support-Complete $M=3$ Executable Solve Theorem

Promotion status: `priority-only`. This packet turns the exact-antipodal $M=3$ certificate stack into one executable solve theorem. It is not a retained branch claim. It states the ordered proof sequence and the mutually exclusive statuses for the current same-level tri-binary dynamics target.

The theorem is local to one exact-antipodal arclength-inverse $M=3$ branch class, one source-pair policy, one endpoint convention, one equal-period/gauge convention, one residual norm, and one support-complete memory convention.

---

## 1. Base Numerical Row

The current live row is the extended-window exact-antipodal $M=3$ row at $\rho=0.8$:

$$
\eta_{\mathrm{mem}}=4.5,
\qquad
\eta_{\mathrm{act}}\approx4.4058154936,
$$

with active margin

$$
m_{\mathrm{act}}\approx0.0941845064.
$$

The support bound is

$$
B_{\mathrm{sup}}=2r_{\max}\approx5.5211575250.
$$

Therefore the unresolved support tail is

$$
T_{\mathrm{tail}}
=
(4.5,\ 5.5211575250+m_\eta].
$$

The fixed $\eta_{\max}=4$ root-count failure has already been reclassified as a memory-window exit. The current question is no longer whether those roots disappeared. It is whether the exact-antipodal $M=3$ chart closes after support-complete memory, action scale, and proof-budget rows are enforced.

---

## 2. Executable Certificate Object

Define the executable solve packet

$$
\mathsf{X}_{M3}
=
\left(
\mathsf{Tail},
\mathsf{Mesh},
\mathsf{Sheet},
\mathsf{Root},
\mathsf{Dyn},
\mathsf{Action},
\mathsf{Kraw},
\mathsf{Post},
\mathsf{Mode},
\mathsf{Obstr},
\mathsf{Relax},
\mathsf{Status}
\right).
$$

The entries are:

| Entry | Required packet |
| --- | --- |
| $\mathsf{Tail}$ | interval tail exclusion or tail-root assimilation from [support-complete-m3-tail-resolution-protocol.md](support-complete-m3-tail-resolution-protocol.md), executed through the margin/error ledger in [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md) |
| $\mathsf{Mesh}$ | arclength-cell tail lift from [support-complete-m3-tail-mesh-lift.md](support-complete-m3-tail-mesh-lift.md) |
| $\mathsf{Sheet}$ | root-sheet variation row from [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md) when tail roots are assimilated |
| $\mathsf{Root}$ | root brackets, Jacobian floors, explicit delay variables or implicit root sensitivities |
| $\mathsf{Dyn}$ | support-complete $R_T$, $R_K$, and $R_\gamma$ residual rows from [support-complete-m3-corrector-system.md](support-complete-m3-corrector-system.md) |
| $\mathsf{Action}$ | $\Gamma_B$, virtual-work curl, scalar inertia, and fit/action rows from [support-complete-m3-action-scale-protocol.md](support-complete-m3-action-scale-protocol.md) |
| $\mathsf{Kraw}$ | chart radius, range Krawczyk, cokernel audit, and proof budget from [support-complete-m3-krawczyk-proof-budget.md](support-complete-m3-krawczyk-proof-budget.md) |
| $\mathsf{Post}$ | single-ledger post-tail score from [support-complete-m3-post-tail-proof-budget.md](support-complete-m3-post-tail-proof-budget.md) |
| $\mathsf{Mode}$ | exact-antipodal higher-mode column test from [exact-antipodal-mode-refinement-certificate.md](exact-antipodal-mode-refinement-certificate.md) |
| $\mathsf{Obstr}$ | support-complete adjoint/cokernel obstruction from [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md) |
| $\mathsf{Relax}$ | midpoint relaxation column test from [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md) |
| $\mathsf{Status}$ | one primary decision status from Section 8 |

Every entry must use the same source-pair policy, endpoint convention, memory ledger, root sign stratum, and row weighting. If any row changes those conventions, the packet exits with

$$
\texttt{ledger-convention-mismatch}.
$$

---

## 3. Ordered Solve Sequence

The exact sequence is:

```text
0. Start with the rho=0.8 exact-antipodal M=3 extended-window row.
1. Declare the tail execution ledger: source-pair policy, endpoint ownership, coefficient-box persistence, and row weights.
2. Certify or assimilate T_tail by interval slabs.
3. Lift nodewise tail status to arclength cells.
4. If tail sheets are assimilated, emit root-sheet variation and derivative envelopes.
5. Build a support-complete root ledger A_eta.
6. Choose implicit root-sensitive or augmented explicit-delay corrector.
7. Compute Gamma_B, curl exactness, scalar inertia, and fit/action compatibility.
8. Run the single-ledger post-tail proof budget: chart radius, derivative envelopes, Krawczyk range, cokernel, and action score.
9. If a stable cokernel defect remains, test higher exact-antipodal modes.
10. Only if higher exact-antipodal modes fail, test support-complete obstruction.
11. Only if obstruction passes, test midpoint relaxation columns.
```

The sequence is strict. For example, a midpoint relaxation run before tail mesh lift and exact-antipodal mode refinement has status

$$
\texttt{relaxation-premature}.
$$

---

## 4. Tail And Mesh Rows

The tail row passes only if

$$
T_{\mathrm{tail}}
=
(4.5,\ 5.5211575250+m_\eta]
$$

is covered for every required ordered source pair and arclength cell. A slab must be either root-free or root-assimilated with positive Jacobian and separation margins.

The nodewise root equation is

$$
G_{ij,n}(\eta)
=
\|\mathbf{Y}_i(\lambda_n)-\mathbf{Y}_j(\lambda_n-\eta)\|-\eta.
$$

The arclength-cell root equation is

$$
G_{ij}(\lambda,\eta)
=
\|\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda-\eta)\|-\eta.
$$

A nodewise tail certificate lifts to a cell if the excluded-gap margin $g_{nq}$ obeys

$$
g_{nq}
>
\frac12L_{\lambda,nq}h_K+\epsilon_G.
$$

If a tail root exists, it must be assimilated as a root sheet

$$
G_{ij}(\lambda,\eta_u(\lambda))=0
$$

with

$$
|\eta_u'(\lambda)|
\le
\frac{L_{\lambda,nq}}{J_{nq}}.
$$

The tail stage succeeds only with one of:

$$
\texttt{tail-exclusion-restored},
\qquad
\texttt{tail-root-sheet-assimilated}.
$$

If tail roots are assimilated but the force, $\Gamma_B$, action, Krawczyk, and master-error rows have not yet been recomputed on the extended ledger, the intermediate composite status is

$$
\texttt{tail-root-sheet-assimilated-rerun-required}.
$$

If the second status occurs, the solve must emit the sheet variation row:

$$
\eta_u'(\lambda)
=
\frac{
\widehat{\mathbf{R}}_u\cdot
\left(
\mathbf{T}_i-\mathbf{T}_j^-
\right)
}{
J_u
},
\qquad
D_v\eta_u
=
\frac{
\widehat{\mathbf{R}}_u\cdot(\xi_i-\xi_j^-)
}{
J_u
}.
$$

Those terms must feed $D\widetilde{\mathbf{F}}$, $\mathcal{C}^{+}$, $D\Gamma_B$, and the Krawczyk envelope $L_R^{+}$. Otherwise the solve exits with

$$
\texttt{root-sheet-derivative-envelope-open}.
$$

Otherwise the whole solve exits as

$$
\texttt{active-window-only}.
$$

---

## 5. Support-Complete Dynamics Solve

After tail closure, freeze a support-complete ledger

$$
\mathcal{L}
=
\left(
\eta_{\mathrm{mem}},
\mathcal{A}_{\eta},
\Pi_{\mathrm{src}},
\Pi_{\mathrm{end}},
\operatorname{sign}J,
W_{\mathcal{E}}
\right).
$$

The implicit residual is

$$
\mathcal{F}_{M3}(u,\gamma)
=
\begin{bmatrix}
R_T\\
R_K\\
R_\gamma
\end{bmatrix},
$$

where

$$
R_T=\mathbf{T}\cdot\widetilde{\mathbf{F}},
\qquad
R_K=\mathbf{K}-\gamma P^\perp\widetilde{\mathbf{F}},
\qquad
R_\gamma=\gamma-\Gamma_B(u).
$$

The augmented equivalent introduces every delay as a variable:

$$
z=(u,\gamma,\eta),
$$

and solves

$$
\mathcal{H}_{M3}(z)
=
\begin{bmatrix}
G_{\mathrm{root}}\\
R_T\\
R_K\\
R_\gamma
\end{bmatrix}
=0.
$$

The two formulations are equivalent while

$$
|J_r|\ge J_0>0
$$

for every retained root. The Schur complement of

$$
D_\eta G_{\mathrm{root}}
=
-\operatorname{diag}(J_r)
$$

recovers the implicit root derivative

$$
\delta\eta_r[\xi]
=
\frac{
\widehat{\mathbf{R}}_r\cdot(\xi_i-\xi_j^-)
}{J_r}.
$$

---

## 6. Action-Scale Row

The action-derived scale is

$$
\Gamma_B
=
\frac{E_\epsilon(R_*)}{m_{\mathrm{car}}c_f^2}
=
\frac{\kappa\epsilon^2}{m_{\mathrm{car}}R_*c_f^2}.
$$

The virtual-work curl must pass

$$
\frac{\|\mathcal{C}\|_{\mathrm{F}}}
{1+\|W\|_{\mathrm{F}}}
\le
\epsilon_{\mathrm{curl}}.
$$

After `tail-root-sheet-assimilated`, this row means the sheet-complete curl $\mathcal{C}^{+}$ built from $W^{+}$, not the old active-window curl and not a nodewise tail surrogate.

The scalar inertia reduction must pass

$$
R_{\mathrm{iso}}
\le
\epsilon_{\mathrm{iso}},
\qquad
m_{\mathrm{car}}>0.
$$

Finally, the action scale must be compatible with the diagnostic fit:

$$
\operatorname{dist}
\left(
\Gamma_B,
[\Gamma_K^{\mathrm{fit}}-\epsilon_\Gamma,\,
\Gamma_K^{\mathrm{fit}}+\epsilon_\Gamma]
\right)
\le
\frac{\tau_K+\tau_M}{A_0}.
$$

If this row fails, the solve may still be a useful force-fit screen, but its status is not a support-complete dynamics/action candidate.

---

## 7. Krawczyk And Cokernel Rows

With fixed row weights, define

$$
F(x)=W_{\mathcal{E}}^{1/2}\mathcal{F}_{M3}(x).
$$

Let

$$
DF(x_0)=U_R\Sigma V^T,
\qquad
C=V\Sigma^{-1},
\qquad
P_{\mathrm{cok}}=I-U_RU_R^T.
$$

The range Krawczyk row passes when

$$
Y=\|CU_R^TF(x_0)\|,
$$

$$
Z\le\|C\|L_R\rho<1,
$$

and

$$
Y+Z\rho<\rho\le\rho_{\mathrm{chart}}.
$$

Equivalently, for $a=\|C\|L_R$, a sufficient radius window is

$$
4aY<1,
\qquad
\rho_-<\rho<\min\{\rho_+,\rho_{\mathrm{chart}}\},
$$

where

$$
\rho_\pm
=
\frac{1\pm\sqrt{1-4aY}}{2a}.
$$

After range closure, the cokernel audit must satisfy

$$
\epsilon_C+\epsilon_{\mathrm{disc}}+\epsilon_{\mathrm{root}}+\epsilon_\Gamma
\le
\tau_{\mathrm{dyn}}.
$$

If this passes together with the action row, the solve has status

$$
\texttt{support-complete-exact-antipodal-dynamics-action-candidate}.
$$

This is still not a retained branch until the finite-mode convergence handoff in [support-complete-m3-finite-mode-convergence-handoff.md](support-complete-m3-finite-mode-convergence-handoff.md), the Noether/event handoff in [support-complete-m3-noether-event-handoff.md](support-complete-m3-noether-event-handoff.md), inventory, the stability handoff in [support-complete-m3-stability-handoff.md](support-complete-m3-stability-handoff.md), and the master retention theorem in [support-complete-m3-master-retention-theorem.md](support-complete-m3-master-retention-theorem.md) pass on the same ledger.

---

## 8. Exhaustive Primary Statuses

The executable solve returns exactly one primary status:

| Status | Meaning |
| --- | --- |
| `active-window-only` | support tail or mesh lift has not been certified |
| `tail-certificate-failure` | at least one atomic tail cell, endpoint ownership row, or antipodal pairing row is uncertified |
| `tail-antipodal-compression-invalid` | a copied exact-antipodal tail-cell certificate uses mismatched source-pair, endpoint, period-split, or coefficient-box data |
| `tail-certificate-pointwise-only` | tail predicates hold at $\alpha_0$ but not on the coefficient box required by Krawczyk/master rows |
| `tail-mesh-lift-failed` | nodewise tail evidence does not lift to arclength-cell exclusion or root-sheet assimilation |
| `tail-root-sheet-assimilated-rerun-required` | tail roots exist and the force/action/corrector rows must be rebuilt on the extended ledger |
| `root-sheet-derivative-envelope-open` | assimilated tail sheets lack first derivative envelopes for force, curl, action, or Krawczyk rows |
| `root-sheet-second-variation-open` | assimilated tail sheets lack derivative-Lipschitz envelopes needed by the Krawczyk $Z$ bound |
| `root-sheet-inertia-ledger-stale` | scalar inertia row uses the old active ledger after tail-root-sheet assimilation |
| `support-complete-exact-antipodal-dynamics-action-candidate` | tail, mesh, root, action, Krawczyk range, and cokernel rows pass |
| `continue-exact-antipodal-refine` | proof budget fails, but no support-complete obstruction is certified |
| `exact-antipodal-mode-refinement-succeeds` | a higher exact-antipodal mode removes the $M=3$ defect |
| `support-complete-exact-antipodal-obstruction` | adjoint/cokernel lower bound passes after exact-antipodal mode refinement fails |
| `open-antipodal-relaxation` | obstruction passes and midpoint relaxation columns span the obstructing block |
| `ledger-convention-mismatch` | rows were computed on incompatible root, memory, endpoint, source-pair, action, or weighting conventions |

The statuses are ordered by proof strength:

$$
\texttt{active-window-only}
\prec
\texttt{continue-exact-antipodal-refine}
\prec
\texttt{support-complete-exact-antipodal-dynamics-action-candidate}.
$$

An obstruction status is not stronger than a candidate status. It is a different local conclusion: no exact-antipodal zero exists inside the certified ball on the declared ledger.

---

## 9. Solve Alternative Theorem

**Theorem target: exact-antipodal $M=3$ executable solve alternative.** Fix the current exact-antipodal $M=3$ branch class, source-pair policy, endpoint convention, equal-period/gauge chart, residual weights, and support-tail interval. Suppose all interval arithmetic, mesh-lift, root, action, Krawczyk, mode-refinement, and obstruction computations are outward-rounded and use the same ledger conventions. Then the algorithm above returns exactly one primary status from Section 8. If it returns `support-complete-exact-antipodal-dynamics-action-candidate`, the packet supplies a local finite-mode dynamics/action candidate. If it returns `support-complete-exact-antipodal-obstruction`, the packet supplies a local exact-antipodal obstruction only inside the certified ball and only after higher exact-antipodal mode refinement fails.

Proof route. Tail and mesh rows first decide support completeness. On a support-complete root stratum with $J$ floors, the implicit and augmented root correctors are equivalent by the implicit function theorem. The Krawczyk inequalities give a unique range zero in the certified chart ball. The cokernel audit decides tolerance-level closure; the adjoint lower bound decides local obstruction. The mode-refinement row prevents a finite $M=3$ defect from being mistaken for an exact-antipodal obstruction. The relaxation-column test is reached only after those exact-antipodal alternatives close.

---

## 10. Current Reading

The current row has not yet run this executable sequence. Its mathematical status is:

$$
\texttt{active-window-only},
\qquad
\texttt{tail-mesh-lift-open},
\qquad
\texttt{support-complete-newton-closure-open},
\qquad
\texttt{gamma-fitted-not-derived},
\qquad
\texttt{continue-exact-antipodal}.
$$

The next decisive calculation is therefore not relaxation. It is the support-tail interval and mesh-lift solve on

$$
(4.5,\ 5.5211575250+m_\eta].
$$
