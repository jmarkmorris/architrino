# Support-Complete $M=3$ Root-Sheet Variation Theorem

Promotion status: `priority-only`. This packet supplies the missing derivative layer between the support-tail slab schedule, mesh lift, and the support-complete dynamics/action solve. If the exact-antipodal $M=3$ tail contains roots, those roots are not isolated node decorations. They become arclength root sheets whose coefficient variations must enter the force, virtual-work curl, scalar action row, and Krawczyk derivative envelope.

The theorem is local to one exact-antipodal $M=3$ arclength-inverse chart, one support-complete root ledger, one source-pair policy, one endpoint convention, one equal-period convention, and one row-weight convention. It does not retain a branch.

This packet is the fixed-speed root-sheet theorem. Its source phase $\lambda-\eta$ and Jacobian $J=1-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}$ are valid for the bounded speed factor model only after setting $\nu_i\equiv1$. The bounded-speed successor is [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md).

---

## 1. Root-Sheet Stratum

Let a support-tail root sheet be labelled by

$$
u=(i,j,n,q,\mu),
$$

where $(i,j)$ is the ordered source pair, $I_n$ is an arclength cell, $Q_q$ is a tail slab, and $\mu$ is the local root label inside the slab. The sheet is a function

$$
\eta_u:I_n\to Q_q
$$

satisfying

$$
G_u(\lambda,\eta_u(\lambda);a)=0,
$$

where

$$
G_u(\lambda,\eta;a)
=
\|\mathbf{Y}_i(\lambda;a)-\mathbf{Y}_j(\lambda-\eta;a)\|
-\eta.
$$

Write

$$
\mathbf{R}_u
=
\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda-\eta_u),
\qquad
\widehat{\mathbf{R}}_u
=
\frac{\mathbf{R}_u}{\eta_u},
$$

and

$$
J_u
=
1-\mathbf{T}_j(\lambda-\eta_u)\cdot\widehat{\mathbf{R}}_u.
$$

The root-sheet stratum is valid on a coefficient ball $B_\rho(a_0)$ only if every retained active root and every assimilated tail sheet satisfies

$$
\eta_u\ge\eta_0>0,
\qquad
|J_u|\ge J_0>0,
$$

and the sheet tube remains separated from all other retained root tubes, excluded slabs, support boundaries, period cuts, and noncollision floors. If any of these margins fails, the correct outcome is a branch event or a root-ledger rebuild, not a dynamics obstruction.

### Source-Normal Root-Chart Diagnostic

The source-normal root chart still needs a fixed Jacobian sign on each retained
tube for differentiating the causal-root row. The force/action contribution is
not this diagnostic quotient; it is the receiver-normal branch strength
$W_u^{\mathrm{rec}}=\lvert D_{T,u}/D_{s,u}\rvert$ on the same retained record.
The ledger must emit

$$
\zeta_u=\operatorname{sign}J_u\in\{+1,-1\}
$$

and the signed floor

$$
\zeta_uJ_u\ge J_0>0
$$

throughout the tube and coefficient ball, together with $D_s$, $D_T$,
$W_u^{\mathrm{rec}}$, and $D_vW_u^{\mathrm{rec}}$. Then

$$
|J_u|=\zeta_uJ_u,
\qquad
D_v|J_u|=\zeta_uD_vJ_u,
$$

and therefore

$$
\frac{D_v|J_u|}{|J_u|}
=
\frac{D_vJ_u}{J_u}.
$$

This identity is a source-normal transversality diagnostic only. Force-row differentiation now requires the same-root receiver-normal branch weight $W_u^{\mathrm{rec}}$ and its derivative. If the source-normal or receiver-normal sign row has no fixed label, the derivative status is

$$
\texttt{root-sheet-receiver-normal-sign-stratum-open}.
$$

If $J_u$ changes sign inside a retained tube, the event is not a smooth force derivative row; it is a root/Jacobian branch event that must rebuild the support-complete root ledger.

---

## 2. Sheet Derivatives In Arclength

At fixed coefficient vector, differentiating

$$
G_u(\lambda,\eta_u(\lambda))=0
$$

with respect to receiver arclength gives

$$
\partial_\lambda G_u
=
\widehat{\mathbf{R}}_u\cdot
\left(
\mathbf{T}_i(\lambda)-\mathbf{T}_j(\lambda-\eta_u)
\right),
$$

and

$$
\partial_\eta G_u=-J_u.
$$

Therefore

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
$$

where the minus superscript means evaluation at $\lambda-\eta_u(\lambda)$. The mesh-lift bound is the immediate corollary

$$
|\eta_u'(\lambda)|
\le
\frac{L_{\lambda,u}}{J_0}.
$$

This is the first reason nodewise tail roots are insufficient. A dynamics row integrates force along $\lambda$, so the solver must know how each tail label moves between nodes.

---

## 3. Coefficient Variation Of A Sheet

Let $v$ be a reduced coefficient direction in the equal-period arclength-inverse chart, and define

$$
\xi_i(\lambda)=D_v\mathbf{Y}_i(\lambda).
$$

At fixed receiver arclength $\lambda$, the sheet variation is

$$
D_v\eta_u
=
\frac{
\widehat{\mathbf{R}}_u\cdot
\left(
\xi_i(\lambda)-\xi_j(\lambda-\eta_u)
\right)
}{
J_u
}.
$$

The total delayed source variation is

$$
D_v\mathbf{Y}_j^-
=
\xi_j(\lambda-\eta_u)
-
\mathbf{T}_j^-\,
D_v\eta_u.
$$

Hence

$$
D_v\mathbf{R}_u
=
\xi_i-\xi_j^-
+
\mathbf{T}_j^-D_v\eta_u,
$$

and

$$
D_v\widehat{\mathbf{R}}_u
=
\frac{
\left(
I-\widehat{\mathbf{R}}_u\widehat{\mathbf{R}}_u^T
\right)
D_v\mathbf{R}_u
}{
\eta_u
}.
$$

The total delayed tangent variation is

$$
D_v\mathbf{T}_j^-
=
(D_v\mathbf{T}_j)^-
-
\mathbf{K}_j^-D_v\eta_u.
$$

Therefore

$$
D_vJ_u
=
-
D_v\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_u
-
\mathbf{T}_j^-\cdot D_v\widehat{\mathbf{R}}_u.
$$

These formulas are the continuous-sheet version of the augmented root-corrector Schur complement. They are valid for active roots and assimilated tail sheets on the same ledger.

---

## 4. Sheet Force Derivative

For a retained sheet contribution define

$$
\mathbf{f}_u(\lambda)
=
\sigma_i\sigma_j\eta_u(\lambda)^{-2}W_u^{\mathrm{rec}}(\lambda)
\widehat{\mathbf{R}}_u(\lambda).
$$

On a fixed receiver-normal sign stratum for $W_u^{\mathrm{rec}}$,

$$
D_v\mathbf{f}_u
=
\sigma_i\sigma_j\eta_u^{-2}W_u^{\mathrm{rec}}
\left[
D_v\widehat{\mathbf{R}}_u
+
\left(
\frac{D_vW_u^{\mathrm{rec}}}{W_u^{\mathrm{rec}}}
-
2\frac{D_v\eta_u}{\eta_u}
\right)
\widehat{\mathbf{R}}_u
\right].
$$

The support-complete force derivative is then

$$
D_v\widetilde{\mathbf{F}}_i(\lambda)
=
\sum_{u\in\mathcal{A}_{i,\lambda}^{+}}
D_v\mathbf{f}_u(\lambda),
$$

where $\mathcal{A}_{i,\lambda}^{+}$ includes active roots and any assimilated tail sheets whose receiver cell contains $\lambda$.

For computable proof budgets, define coefficient-chart bounds

$$
\|D_v\eta_u\|\le\Lambda_{\eta,u}\|v\|,
\qquad
\|D_v\widehat{\mathbf{R}}_u\|\le\Lambda_{R,u}\|v\|,
\qquad
|D_vJ_u|\le\Lambda_{J,u}\|v\|.
$$

Then every sheet has the derivative envelope

$$
\|D_v\mathbf{f}_u\|
\le
\frac{1}{\eta_0^2J_0}
\left(
\Lambda_{R,u}
+
2\frac{\Lambda_{\eta,u}}{\eta_0}
+
\frac{\Lambda_{J,u}}{J_0}
\right)
\|v\|.
$$

This is the sheet-level constant consumed by the delayed-force Lipschitz, Krawczyk, curl, and collocation-refinement rows. Without these constants, `tail-root-sheet-assimilated` is only a root-count statement, not a dynamics certificate.

---

## 5. Dynamics Residual Derivatives

Let

$$
A_i=P_i^\perp\widetilde{\mathbf{F}}_i,
\qquad
P_i^\perp=I-\mathbf{T}_i\mathbf{T}_i^T.
$$

The projector variation is

$$
D_vP_i^\perp
=
-D_v\mathbf{T}_i\,\mathbf{T}_i^T
-\mathbf{T}_i(D_v\mathbf{T}_i)^T.
$$

Thus

$$
D_vA_i
=
D_vP_i^\perp\,\widetilde{\mathbf{F}}_i
+
P_i^\perp D_v\widetilde{\mathbf{F}}_i.
$$

The support-complete residual derivatives are

$$
D_vR_{T,i}
=
D_v\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i
+
\mathbf{T}_i\cdot D_v\widetilde{\mathbf{F}}_i,
$$

and

$$
D_vR_{K,i}
=
D_v\mathbf{K}_i
-
\gamma D_vA_i
-
D_v\gamma\,A_i.
$$

If the action-derived scale row is active,

$$
D_vR_\gamma
=
D_v\gamma-D\Gamma_B[v].
$$

The arclength-inverse variation formulas for $D_v\mathbf{Y}$, $D_v\mathbf{T}$, and $D_v\mathbf{K}$ are part of this same derivative chain. A matrix assembled at fixed construction phase, or with frozen tail roots, is not the derivative of the support-complete residual.

---

## 6. Virtual-Work Curl With Root Sheets

On the frozen support-complete ledger define the sheet-complete virtual-work one-form

$$
W_p^{+}(a)
=
\int_0^{L_*}
\sum_i
A_i^{+}(\lambda;a)
\cdot
e_{p,i}^{\perp}(\lambda;a)
d\lambda,
$$

where

$$
e_{p,i}^{\perp}=P_i^\perp\partial_p\mathbf{Y}_i
$$

and $A_i^{+}$ is computed from active roots plus assimilated root sheets. Its derivative is

$$
D_qW_p^{+}
=
\int_0^{L_*}
\sum_i
\left[
D_qA_i^{+}\cdot e_{p,i}^{\perp}
+
A_i^{+}\cdot D_qe_{p,i}^{\perp}
\right]
d\lambda.
$$

The projected-basis derivative is

$$
D_qe_{p,i}^{\perp}
=
(D_qP_i^\perp)\partial_p\mathbf{Y}_i
+
P_i^\perp D_q\partial_p\mathbf{Y}_i.
$$

In commuting coefficient coordinates, the skew part of the second basis derivative cancels, but the projector terms need not cancel. Therefore the sheet-complete curl is

$$
\mathcal{C}_{pq}^{+}
=
D_pW_q^{+}-D_qW_p^{+}.
$$

The action row may pass only if

$$
\frac{\|\mathcal{C}^{+}\|_{\mathrm{F}}}
{1+\|W^{+}\|_{\mathrm{F}}}
\le
\epsilon_{\mathrm{curl}},
$$

with every $D_pA_i^{+}$ using the sheet derivatives above. A curl row that uses active roots only after tail-root assimilation has status

$$
\texttt{tail-root-curl-ledger-stale}.
$$

A curl row that inserts tail roots only at nodes, without $\eta_u(\lambda)$ and $D_v\eta_u(\lambda)$, has status

$$
\texttt{nodewise-root-sheet-curl-invalid}.
$$

---

## 7. Action-Scale And Krawczyk Consequences

The action-derived scale remains

$$
\Gamma_B
=
\frac{E_\epsilon(R_*)}{m_{\mathrm{car}}c_f^2}.
$$

After tail-root assimilation, both $m_{\mathrm{car}}$ and $R_*$ must be interpreted on the same sheet-complete ledger. If

$$
E_\epsilon=\frac{\kappa\epsilon^2}{R_*},
$$

then

$$
D_v\Gamma_B
=
-\Gamma_B
\left(
\frac{D_vR_*}{R_*}
+
\frac{D_vm_{\mathrm{car}}}{m_{\mathrm{car}}}
\right).
$$

The terms $D_vR_*$ and $D_vm_{\mathrm{car}}$ must be computed with the same root-sheet force/action derivatives used in $\mathcal{C}^{+}$ when those quantities depend on the support-complete history ledger.

For the weighted residual

$$
F(a,\gamma)=W_{\mathcal{E}}^{1/2}\mathcal{F}_{M3}^{+}(a,\gamma),
$$

the Krawczyk derivative envelope must include sheet variation:

$$
\|DF(x+h_1)-DF(x+h_2)\|
\le
L_R^{+}\|h_1-h_2\|,
$$

where

$$
L_R^{+}
=
L_R^{\mathrm{active}}
+
L_R^{\mathrm{sheet}}
+
L_R^{\mathrm{action}}
+
L_R^{\mathrm{proj}}.
$$

The new term $L_R^{\mathrm{sheet}}$ is assembled from the sheet force derivative envelope and its chart-ball variation. If it is missing, the Krawczyk status is

$$
\texttt{root-sheet-derivative-envelope-open}.
$$

---

## 8. Sheet-Complete Scalar Inertia

If the action row supplies a normal inertia operator, tail-root assimilation also changes the inertia ledger. The sheet-complete operator is

$$
\mathsf{M}_{B,\perp}^{+}
=
\mathsf{M}_{B,\perp}^{\mathrm{act}}
+
\Delta\mathsf{M}_{B,\perp}^{\mathrm{sheet}}.
$$

Let $Q^{+}$ be an orthonormal basis for the reduced normal carrier subspace after the same gauge, tangent, equal-period, and support constraints are imposed on the sheet-complete ledger. Define

$$
m_{\mathrm{car}}^{+}
=
\frac{1}{d}
\operatorname{tr}
\left(
(Q^{+})^T\mathsf{M}_{B,\perp}^{+}Q^{+}
\right),
\qquad
d=\dim Q^{+}.
$$

The scalar-isotropy row becomes

$$
R_{\mathrm{iso}}^{+}
=
\sup_{\|w\|=1}
\frac{
\|\mathsf{M}_{B,\perp}^{+}Q^{+}w
-m_{\mathrm{car}}^{+}Q^{+}w\|
}{
m_{\mathrm{car}}^{+}
}.
$$

The row passes only if

$$
R_{\mathrm{iso}}^{+}\le\epsilon_{\mathrm{iso}},
\qquad
m_{\mathrm{car}}^{+}>0.
$$

For the scale derivative, a parallel-basis gauge on the reduced normal subspace gives

$$
D_vm_{\mathrm{car}}^{+}
=
\frac{1}{d}
\operatorname{tr}
\left(
(Q^{+})^TD_v\mathsf{M}_{B,\perp}^{+}Q^{+}
\right).
$$

Without that gauge, the derivative must include the two basis-transport terms:

$$
D_vm_{\mathrm{car}}^{+}
=
\frac{1}{d}
\operatorname{tr}
\left(
(D_vQ^{+})^T\mathsf{M}_{B,\perp}^{+}Q^{+}
+
(Q^{+})^TD_v\mathsf{M}_{B,\perp}^{+}Q^{+}
+
(Q^{+})^T\mathsf{M}_{B,\perp}^{+}D_vQ^{+}
\right).
$$

If tail sheets are present and the inertia operator remains the old active-ledger operator, the action-scale row exits with

$$
\texttt{root-sheet-inertia-ledger-stale}.
$$

If the full Krawczyk residual includes $R_{\mathrm{iso}}^{+}$ but the derivative of $\mathsf{M}_{B,\perp}^{+}$ is not bounded on the chart ball, the status is

$$
\texttt{root-sheet-inertia-second-variation-open}.
$$

---

## 9. Second Sheet Variation And Krawczyk Envelope

The Krawczyk $Z$ bound needs a Lipschitz envelope for $DF$, hence it needs second variations of the root sheets or an automatic-differentiation/interval equivalent. For coefficient directions $v,w$, write partial derivatives of $G_u$ at fixed $\lambda$ and fixed $\eta$ as

$$
G_{v}=\partial_vG_u,
\qquad
G_{v\eta}=\partial_v\partial_\eta G_u,
\qquad
G_{vw}=\partial_v\partial_wG_u,
\qquad
G_{\eta\eta}=\partial_{\eta\eta}G_u.
$$

Differentiating the implicit equation twice gives

$$
D_{v,w}^{2}\eta_u
=
\frac{
G_{vw}
+
G_{v\eta}D_w\eta_u
+
G_{w\eta}D_v\eta_u
+
G_{\eta\eta}D_v\eta_uD_w\eta_u
}{
J_u
}.
$$

The fixed-delay second coefficient derivative has the concrete form

$$
G_{vw}
=
\widehat{\mathbf{R}}_u\cdot
D_{v,w}^{2}\mathbf{R}_u\big|_{\eta}
+
\eta_u^{-1}
\left(
P_uD_v\mathbf{R}_u\big|_{\eta}
\right)
\cdot
D_w\mathbf{R}_u\big|_{\eta},
$$

where

$$
P_u=I-\widehat{\mathbf{R}}_u\widehat{\mathbf{R}}_u^T.
$$

In a linear normal-coordinate perturbation model this reduces to the retained-root second-sensitivity formula with

$$
h_u^v=D_v\eta_u,
\qquad
u_u^v
=
\xi_i-\xi_j^-+\mathbf{T}_j^-h_u^v,
$$

and

$$
q_u^{vw}
=
h_u^w(D_v\mathbf{T}_j)^-
+
h_u^v(D_w\mathbf{T}_j)^-
-
h_u^vh_u^w\mathbf{K}_j^-,
$$

after adding any nonzero arclength-inverse second-coordinate terms to $q_u^{vw}$. The safe executable requirement is not a preferred closed form; it is a certified interval or automatic-differentiation enclosure of $D_{v,w}^{2}\eta_u$, $D_{v,w}^{2}J_u$, and $D_{v,w}^{2}\mathbf{f}_u$ on the same sheet tube.

For unit coefficient directions, a sufficient second-root bound is

$$
|D_{v,w}^{2}\eta_u|
\le
\frac{
\Lambda_{vw,u}
+
\Lambda_{v\eta,u}\Lambda_{\eta,u}
+
\Lambda_{w\eta,u}\Lambda_{\eta,u}
+
\Lambda_{\eta\eta,u}\Lambda_{\eta,u}^{2}
}{
J_0
}.
$$

This feeds a sheet contribution

$$
L_R^{\mathrm{sheet}}
=
\sum_u
L_{R,u}^{(2)}
$$

to the Krawczyk envelope

$$
\|DF^{+}(x+h_1)-DF^{+}(x+h_2)\|
\le
L_R^{+}\|h_1-h_2\|.
$$

If the solver emits only first sheet derivatives, the range proof may still be used as a diagnostic Newton row, but its certified status is

$$
\texttt{root-sheet-second-variation-open}.
$$

For a fully explicit export, define

$$
h_v=D_v\eta_u,
\qquad
h_w=D_w\eta_u,
\qquad
n=\widehat{\mathbf{R}}_u,
\qquad
P=I-nn^T.
$$

Let $\xi_i^{vw}=D_{v,w}^{2}\mathbf{Y}_i(\lambda)$ and $\xi_j^{vw,-}=D_{v,w}^{2}\mathbf{Y}_j(\lambda-\eta_u)$ denote fixed-phase second coefficient variations. The total second delayed separation variation is

$$
D_{v,w}^{2}\mathbf{R}_u
=
\xi_i^{vw}
-\xi_j^{vw,-}
+(D_v\mathbf{T}_j)^-h_w
+(D_w\mathbf{T}_j)^-h_v
-\mathbf{K}_j^-h_vh_w
+\mathbf{T}_j^-D_{v,w}^{2}\eta_u.
$$

The corresponding unit-separation variation is

$$
D_{v,w}^{2}\widehat{\mathbf{R}}_u
=
\frac{
P D_{v,w}^{2}\mathbf{R}_u
-h_wD_v\widehat{\mathbf{R}}_u
-h_vD_w\widehat{\mathbf{R}}_u
-\widehat{\mathbf{R}}_u
\left(D_w\widehat{\mathbf{R}}_u\cdot D_v\mathbf{R}_u\right)
}{\eta_u}.
$$

The second delayed tangent variation is

$$
D_{v,w}^{2}\mathbf{T}_j^-
=
(D_{v,w}^{2}\mathbf{T}_j)^-
-(\partial_\lambda D_v\mathbf{T}_j)^-h_w
-(D_w\mathbf{K}_j)^-h_v
+(\partial_\lambda\mathbf{K}_j)^-h_vh_w
-\mathbf{K}_j^-D_{v,w}^{2}\eta_u.
$$

Thus the second Jacobian variation is

$$
D_{v,w}^{2}J_u
=
-
D_{v,w}^{2}\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_u
-
D_v\mathbf{T}_j^-\cdot D_w\widehat{\mathbf{R}}_u
-
D_w\mathbf{T}_j^-\cdot D_v\widehat{\mathbf{R}}_u
-
\mathbf{T}_j^-\cdot D_{v,w}^{2}\widehat{\mathbf{R}}_u.
$$

For the force row, set

$$
\ell_v
=
-2\frac{D_v\eta_u}{\eta_u}
+
\frac{D_vW_u^{\mathrm{rec}}}{W_u^{\mathrm{rec}}},
\qquad
\ell_w
=
-2\frac{D_w\eta_u}{\eta_u}
+
\frac{D_wW_u^{\mathrm{rec}}}{W_u^{\mathrm{rec}}},
$$

and

$$
\ell_{vw}
=
-2\left(
\frac{D_{v,w}^{2}\eta_u}{\eta_u}
-
\frac{D_v\eta_uD_w\eta_u}{\eta_u^2}
\right)
+
\left(
\frac{D_{v,w}^{2}W_u^{\mathrm{rec}}}{W_u^{\mathrm{rec}}}
-
\frac{D_vW_u^{\mathrm{rec}}D_wW_u^{\mathrm{rec}}}{(W_u^{\mathrm{rec}})^2}
\right).
$$

On the fixed $D_s,D_T$ sign stratum,

$$
D_{v,w}^{2}\mathbf{f}_u
=
\frac{\sigma_i\sigma_jW_u^{\mathrm{rec}}}{\eta_u^2}
\left[
D_{v,w}^{2}\widehat{\mathbf{R}}_u
+\ell_vD_w\widehat{\mathbf{R}}_u
+\ell_wD_v\widehat{\mathbf{R}}_u
+
(\ell_v\ell_w+\ell_{vw})
\widehat{\mathbf{R}}_u
\right].
$$

Consequently a certified second-variation export may use the bounds

$$
\Lambda_{\alpha,u}
=
\frac{2\Lambda_{\eta,u}}{\eta_0}
+
\Lambda_{W,u},
$$

and

$$
\Lambda_{\alpha,u}^{(2)}
=
\left(
\frac{2\Lambda_{\eta,u}^{(2)}}{\eta_0}
+
\frac{2\Lambda_{\eta,u}^2}{\eta_0^2}
+
\Lambda_{W,u}^{(2)}
\right).
$$

If

$$
\|D_v\widehat{\mathbf{R}}_u\|\le\Lambda_{\widehat{R},u},
\qquad
\|D_{v,w}^{2}\widehat{\mathbf{R}}_u\|
\le
\Lambda_{\widehat{R},u}^{(2)},
$$

then

$$
L_{f,u}^{(2)}
=
\frac{|\sigma_i\sigma_j|}{\eta_0^2J_0}
\left[
\Lambda_{\widehat{R},u}^{(2)}
+
2\Lambda_{\alpha,u}\Lambda_{\widehat{R},u}
+
\Lambda_{\alpha,u}^{2}
+
\Lambda_{\alpha,u}^{(2)}
\right].
$$

The residual contribution $L_{R,u}^{(2)}$ is the row-weighted image of $L_{f,u}^{(2)}$ through the $R_T$ and $R_K$ formulas, including the projector, tangent, curvature, and action-scale chart constants. The assembled value used by the post-tail proof budget is still

$$
L_R^{\mathrm{sheet}}
=
\sum_u L_{R,u}^{(2)}.
$$

If interval automatic differentiation emits sharper enclosures for $D_{v,w}^{2}J_u$ and $D_{v,w}^{2}\mathbf{f}_u$, those enclosures may replace the displayed formulas, but the output schema must still expose the limiting $L_{R,u}^{(2)}$ and the sheet that attains it.

---

## 10. Root-Sheet Variation Theorem

**Theorem target: support-complete root-sheet differentiability.** Suppose an exact-antipodal $M=3$ support-tail mesh lift returns `tail-root-sheet-assimilated`, and suppose on a coefficient ball $B_\rho(a_0)$:

1. the equal-period arclength-inverse chart has positive speed floor and $C^3$ coefficient control;
2. every active root and assimilated tail root sheet has $\eta_u\ge\eta_0>0$ and $|J_u|\ge J_0>0$;
3. every retained root tube has a fixed Jacobian sign label $\zeta_u$ with $\zeta_uJ_u\ge J_0$;
4. root tubes remain separated from each other, excluded slabs, support boundaries, period cuts, and noncollision floors;
5. all sheets are matched by the exact-antipodal involution under the declared source-pair convention;
6. the source-pair, endpoint, memory, action, and residual-weight ledgers are frozen.

Then each retained root sheet is $C^1$ in receiver arclength and in coefficient directions on $B_\rho(a_0)$. If the chart has the corresponding second-derivative bounds, the sheet derivatives are Lipschitz on the same ball. The support-complete force, tangential residual, curvature residual, virtual-work one-form, curl matrix, scalar inertia row, action-scale derivative, and Krawczyk derivative row are differentiable on the same stratum. Their first derivatives and required second-variation envelopes are the formulas above.

Consequently `tail-root-sheet-assimilated` may feed a support-complete dynamics/action solve only after the solver emits the sheet derivative envelope and uses it in $D\mathcal{F}_{M3}^{+}$, $\mathcal{C}^{+}$, $D\Gamma_B$, and $L_R^{+}$.

Proof route:

1. apply the implicit-function theorem to $G_u(\lambda,\eta;a)=0$ using the floor $|J_u|\ge J_0$;
2. differentiate the root sheet in $\lambda$ and in coefficient directions;
3. use arclength-inverse chart derivatives for $\mathbf{Y}$, $\mathbf{T}$, and $\mathbf{K}$;
4. differentiate the inverse-square, receiver-normal delayed force on a fixed sign stratum;
5. assemble projected force, dynamics residuals, work one-form, and curl by integration over receiver arclength;
6. bound the resulting first- and second-derivative terms on the chart ball to obtain $L_R^{+}$.

---

## 11. Output Schema

A root-sheet variation run must emit:

| Field | Payload |
| --- | --- |
| `sheet_labels` | root label $u$, source pair $(i,j)$, receiver cell $I_n$, delay slab $Q_q$, exact-antipodal mate, and endpoint ownership |
| `sheet_geometry` | $\eta_u$, $\widehat{\mathbf{R}}_u$, $J_u$, $\zeta_u$, $\eta_0$, $J_0$, tube separation, and complement-gap intervals |
| `arclength_variation` | $\eta_u'(\lambda)$ and its mesh-lift bound $L_{\lambda,u}/J_0$ |
| `coefficient_variation` | $D_v\eta_u$, $D_v\widehat{\mathbf{R}}_u$, $D_vJ_u$, $D_vW_u^{\mathrm{rec}}$, and fixed $D_s,D_T$ sign rows |
| `force_derivative` | $D_v\mathbf{f}_u$, $D_v\widetilde{\mathbf{F}}_i$, and the per-sheet constants $\Lambda_{\eta,u}$, $\Lambda_{R,u}$, $\Lambda_{J,u}$, $\Lambda_{W,u}$ |
| `residual_derivative` | $D_vA_i$, $D_vR_{T,i}$, $D_vR_{K,i}$, and $D_vR_\gamma$ on the sheet-complete ledger |
| `curl_action_rows` | $W_p^{+}$, $D_qW_p^{+}$, $\mathcal{C}_{pq}^{+}$, $\Gamma_B$, $D_v\Gamma_B$, and scalar inertia rows if active |
| `second_variation` | certified enclosures for $D_{v,w}^{2}\eta_u$, $D_{v,w}^{2}J_u$, $D_{v,w}^{2}\mathbf{f}_u$, or an interval automatic-differentiation equivalent |
| `krawczyk_export` | $L_R^{\mathrm{sheet}}$, $L_R^{+}$, limiting sheet, and `root-sheet-variation-ready` or first failed status |

The force derivative row is not optional after `tail-root-sheet-assimilated`. A run that emits only root locations and $J$ floors has completed the root-count problem but has not yet produced a support-complete dynamics derivative.

---

## 12. Decision Statuses

The root-sheet variation row can return:

| Status | Meaning |
| --- | --- |
| `root-sheet-variation-ready` | every assimilated tail sheet has $\lambda$ and coefficient derivatives, force derivatives, and derivative envelopes |
| `tail-root-curl-ledger-stale` | action/curl row uses the old active ledger after tail roots were assimilated |
| `nodewise-root-sheet-curl-invalid` | curl/action row uses nodewise tail roots without continuous sheets |
| `root-sheet-derivative-envelope-open` | Krawczyk or curl rows lack sheet derivative bounds |
| `root-sheet-second-variation-open` | Krawczyk row lacks second sheet variation or an equivalent derivative-Lipschitz enclosure |
| `root-sheet-inertia-ledger-stale` | scalar inertia row uses the old active ledger after tail roots were assimilated |
| `root-sheet-inertia-second-variation-open` | full residual includes inertia but lacks the sheet-complete inertia derivative envelope |
| `root-sheet-jacobian-sign-stratum-open` | a retained sheet has $|J_u|$ bounded away from zero but no fixed sign label for differentiating the source-normal root-chart row |
| `root-sheet-jacobian-floor-failed` | $|J_u|$ loses its floor on a sheet tube |
| `root-sheet-tube-separation-failed` | a sheet tube hits another tube, an excluded slab, a support boundary, or a period cut |
| `root-sheet-antipodal-match-failed` | a sheet is not paired by the exact-antipodal involution under the declared tolerance |
| `support-complete-ledger-rerun-required` | the sheet set changes and force/action/Krawczyk rows must be rebuilt |

Current exact-antipodal $M=3$ status remains:

$$
\texttt{active-window-only},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{gamma-fitted-not-derived},
\qquad
\texttt{not-retained}.
$$

This packet states what must be emitted if the tail stage returns `tail-root-sheet-assimilated`. It does not assert that such roots exist.
