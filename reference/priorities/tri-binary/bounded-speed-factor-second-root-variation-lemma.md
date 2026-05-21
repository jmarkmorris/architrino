# Bounded Speed Factor Second Root-Variation Lemma

Promotion status: `priority-only`. This packet refines [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md), [bounded-speed-factor-action-stability-closure.md](bounded-speed-factor-action-stability-closure.md), [bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md), and [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md). It supplies the second root-sheet variation layer needed before bounded-speed Hessian, force-Lipschitz, and Krawczyk rows can be read as certified rather than first-order diagnostics.

It does not retain a branch.

---

## 1. Root Equation On The Augmented Chart

Fix one retained bounded-speed root label $r=(i,j,\alpha)$, one source-pair policy, one same-source policy, one endpoint convention, one support/action convention, and one fixed Jacobian-sign stratum. Let

$$
z=(\mathbf{Y},\nu,s,\gamma,e)
$$

denote the active finite chart variables: arclength curves, bounded speed factors, support variables, action-scale variables, and event variables as needed. With

$$
\chi_i(\lambda)=\int_0^\lambda\frac{d\xi}{\nu_i(\xi)},
\qquad
\Lambda_i=\chi_i^{-1},
$$

define

$$
G_r^{\nu}(u,\eta;z)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta))
\right\|
-\eta.
$$

The retained sheet is the solution

$$
G_r^{\nu}(u,\eta_r(u;z);z)=0.
$$

Write

$$
\lambda_i=\Lambda_i(u),
\qquad
\lambda_j^-=\Lambda_j(u-\eta_r),
\qquad
\mathbf{R}_r=\mathbf{Y}_i(\lambda_i)-\mathbf{Y}_j(\lambda_j^-),
\qquad
\widehat{\mathbf{R}}_r=\frac{\mathbf{R}_r}{\eta_r}.
$$

The bounded-speed root Jacobian is

$$
J_r^{\nu}
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_r,
\qquad
G_{\eta}=-J_r^{\nu}.
$$

The stratum assumptions are

$$
\eta_r\ge\eta_0>0,
\qquad
\zeta_rJ_r^{\nu}\ge J_0>0,
\qquad
\zeta_r\in\{+1,-1\},
$$

with root-tube, inactive-gap, support, event, period-cut, and noncollision floors frozen on the same chart ball.

---

## 2. First Variation Recap

For a chart direction $v$, write

$$
\rho_{v,i}=D_v\nu_i,
\qquad
\xi_{v,i}=D_v\mathbf{Y}_i,
$$

and

$$
\phi_{v,i}(\lambda)
=
D_v\chi_i(\lambda)
=
-
\int_0^\lambda
\frac{\rho_{v,i}(\xi)}{\nu_i(\xi)^2}
d\xi.
$$

At fixed causal receiver time $u$,

$$
\Xi_{v,i}
=
\xi_{v,i}(\lambda_i)
-
\nu_i(\lambda_i)\mathbf{T}_i(\lambda_i)\phi_{v,i}(\lambda_i),
$$

and

$$
\Xi_{v,j}^-
=
\xi_{v,j}(\lambda_j^-)
-
\nu_j^-\mathbf{T}_j^-\phi_{v,j}(\lambda_j^-).
$$

The first root variation is

$$
h_v
:=
D\eta_r[v]
=
\frac{
\widehat{\mathbf{R}}_r\cdot
\left(\Xi_{v,i}-\Xi_{v,j}^-\right)
}{
J_r^{\nu}
}.
$$

The total delayed phase variation is

$$
D\lambda_j^-[v]
=
-\nu_j^-\phi_{v,j}^-
-\nu_j^-h_v.
$$

Consequently

$$
D\mathbf{R}_r[v]
=
\Xi_{v,i}-\Xi_{v,j}^-
+\nu_j^-\mathbf{T}_j^-h_v,
$$

and

$$
D\widehat{\mathbf{R}}_r[v]
=
\frac{
\left(I-\widehat{\mathbf{R}}_r\widehat{\mathbf{R}}_r^T\right)
D\mathbf{R}_r[v]
}{
\eta_r
}.
$$

The first Jacobian variation is

$$
DJ_r^{\nu}[v]
=
-
D\nu_j^-[v]\,
\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_r
-
\nu_j^-D\mathbf{T}_j^-[v]\cdot\widehat{\mathbf{R}}_r
-
\nu_j^-\mathbf{T}_j^-\cdot D\widehat{\mathbf{R}}_r[v].
$$

---

## 3. Implicit Second Root Variation

All derivatives in this section are evaluated at fixed receiver time $u$ and at the retained root $\eta=\eta_r(u;z)$. Let $G_z[v]$, $G_{z\eta}[v]$, and $G_{zz}[v,w]$ denote partial derivatives of $G_r^{\nu}(u,\eta;z)$ with $\eta$ held fixed unless an $\eta$ slot is displayed.

Differentiating

$$
G_r^{\nu}(u,\eta_r(u;z);z)=0
$$

twice gives

$$
D^{2}\eta_r[v,w]
=
-
\left(G_{\eta}\right)^{-1}
\left(
G_{zz}[v,w]
+G_{z\eta}[v]D\eta_r[w]
+G_{z\eta}[w]D\eta_r[v]
+G_{\eta\eta}D\eta_r[v]D\eta_r[w]
\right).
$$

Since $G_{\eta}=-J_r^{\nu}$, this is equivalently

$$
D^{2}\eta_r[v,w]
=
\frac{
G_{zz}[v,w]
+G_{z\eta}[v]h_w
+G_{z\eta}[w]h_v
+G_{\eta\eta}h_vh_w
}{
J_r^{\nu}
}.
$$

The executable certificate may compute the partial tensors by interval automatic differentiation. A closed-form export must include at least the interval bounds

$$
|G_{zz}[v,w]|\le\Lambda_{zz,r},
\qquad
|G_{z\eta}[v]|\le\Lambda_{z\eta,r}\|v\|,
\qquad
|G_{\eta\eta}|\le\Lambda_{\eta\eta,r}.
$$

For unit directions, the certified second-root floor-bound is

$$
|D^{2}\eta_r[v,w]|
\le
\frac{
\Lambda_{zz,r}
+2\Lambda_{z\eta,r}\Lambda_{\eta,r}
+\Lambda_{\eta\eta,r}\Lambda_{\eta,r}^2
}{
J_0
},
$$

where $\Lambda_{\eta,r}$ bounds $|D\eta_r[\cdot]|$ on the same chart ball.

---

## 4. Second Variation Of The Jacobian And Force Weight

Set

$$
n=\widehat{\mathbf{R}}_r,
\qquad
P=I-nn^T,
\qquad
h_v=D\eta_r[v],
\qquad
k_{vw}=D^2\eta_r[v,w],
$$

and

$$
j_v=DJ_r^{\nu}[v],
\qquad
j_{vw}=D^2J_r^{\nu}[v,w].
$$

Because

$$
J_r^{\nu}=1-\nu_j^-\mathbf{T}_j^-\cdot n,
$$

its second variation is

$$
\begin{aligned}
j_{vw}
=
&-
D^2\nu_j^-[v,w]\,
\mathbf{T}_j^-\cdot n
-
D\nu_j^-[v]\,
D\mathbf{T}_j^-[w]\cdot n
-
D\nu_j^-[w]\,
D\mathbf{T}_j^-[v]\cdot n
\\
&-
D\nu_j^-[v]\,
\mathbf{T}_j^-\cdot Dn[w]
-
D\nu_j^-[w]\,
\mathbf{T}_j^-\cdot Dn[v]
-
\nu_j^-D^2\mathbf{T}_j^-[v,w]\cdot n
\\
&-
\nu_j^-D\mathbf{T}_j^-[v]\cdot Dn[w]
-
\nu_j^-D\mathbf{T}_j^-[w]\cdot Dn[v]
-
\nu_j^-\mathbf{T}_j^-\cdot D^2n[v,w].
\end{aligned}
$$

The delayed quantities $D^2\nu_j^-[v,w]$, $D^2\mathbf{T}_j^-[v,w]$, and $D^2n[v,w]$ must include both inverse-clock variations and the second root shift $k_{vw}$. For the direction row,

$$
D^2n[v,w]
=
\frac{
P D^2\mathbf{R}_r[v,w]
-h_wDn[v]
-h_vDn[w]
-n\left(Dn[w]\cdot D\mathbf{R}_r[v]\right)
}{
\eta_r
},
$$

with $D^2\mathbf{R}_r[v,w]$ evaluated on the total delayed sheet.

On the fixed sign stratum,

$$
|J_r^{\nu}|=\zeta_rJ_r^{\nu}.
$$

Define the force scalar weight

$$
H_r^{\nu}
=
\eta_r^{-2}|J_r^{\nu}|^{-1}.
$$

Its logarithmic first variation is

$$
\alpha_v
=
2\frac{h_v}{\eta_r}
+
\frac{j_v}{J_r^{\nu}},
\qquad
DH_r^{\nu}[v]
=
-H_r^{\nu}\alpha_v.
$$

The second logarithmic variation is

$$
\alpha_{vw}
=
2\left(
\frac{k_{vw}}{\eta_r}
-
\frac{h_vh_w}{\eta_r^2}
\right)
+
\left(
\frac{j_{vw}}{J_r^{\nu}}
-
\frac{j_vj_w}{(J_r^{\nu})^2}
\right).
$$

Therefore

$$
D^2H_r^{\nu}[v,w]
=
H_r^{\nu}
\left(
\alpha_v\alpha_w-\alpha_{vw}
\right).
$$

For the force contribution

$$
\mathbf{f}_r^{\nu}
=
\sigma_i\sigma_jH_r^{\nu}n,
$$

the second variation is

$$
D^2\mathbf{f}_r^{\nu}[v,w]
=
\sigma_i\sigma_jH_r^{\nu}
\left[
D^2n[v,w]
-\alpha_vDn[w]
-\alpha_wDn[v]
+(\alpha_v\alpha_w-\alpha_{vw})n
\right].
$$

These are the sheet terms that enter the bounded-speed action Hessian, the force derivative Lipschitz bound, and the coupled Krawczyk $Z$ estimate.

---

## 5. Interval Floors And Krawczyk Export

A second-root export is Krawczyk-eligible only if the interval packet supplies positive floors

$$
\eta_r\ge\eta_0,
\qquad
\zeta_rJ_r^{\nu}\ge J_0,
\qquad
\nu_-\le\nu_i\le\nu_+,
\qquad
H_i=\int_0^{L_i}\frac{d\lambda}{\nu_i(\lambda)}
\ \text{on the declared period row},
$$

plus active support, inactive-gap, tail-owner, endpoint, event, and noncollision margins.

For unit chart directions, sufficient Hessian constants are

$$
|k_{vw}|\le\Lambda_{\eta,r}^{(2)},
\qquad
|j_{vw}|\le\Lambda_{J,r}^{(2)},
\qquad
\|D^2n[v,w]\|\le\Lambda_{n,r}^{(2)}.
$$

With first-variation bounds $\Lambda_{\eta,r}$, $\Lambda_{J,r}$, and $\Lambda_{n,r}$, define

$$
\Lambda_{\alpha,r}
=
2\frac{\Lambda_{\eta,r}}{\eta_0}
+
\frac{\Lambda_{J,r}}{J_0},
$$

and

$$
\Lambda_{\alpha,r}^{(2)}
=
2\left(
\frac{\Lambda_{\eta,r}^{(2)}}{\eta_0}
+
\frac{\Lambda_{\eta,r}^2}{\eta_0^2}
\right)
+
\left(
\frac{\Lambda_{J,r}^{(2)}}{J_0}
+
\frac{\Lambda_{J,r}^2}{J_0^2}
\right).
$$

Then the per-root force-Hessian envelope may be exported as

$$
L_{f,r}^{(2),\nu}
=
\frac{|\sigma_i\sigma_j|}{\eta_0^2J_0}
\left[
\Lambda_{n,r}^{(2)}
+2\Lambda_{\alpha,r}\Lambda_{n,r}
+\Lambda_{\alpha,r}^2
+\Lambda_{\alpha,r}^{(2)}
\right].
$$

The coupled residual contribution is the row-weighted image

$$
L_{R,r}^{(2),\nu}
=
W_{\mathrm{row}}^{1/2}
\operatorname{Img}_{R}
\left(
L_{f,r}^{(2),\nu}
\right),
$$

where $\operatorname{Img}_{R}$ includes the tangent, normal, support, action-scale, speed-storage, projector, and event rows that consume $\mathbf{f}_r^{\nu}$. The sheet contribution to the bounded-speed Krawczyk envelope is

$$
L_R^{\mathrm{sheet},\nu}
=
\sum_{r\in\mathcal{A}_{\nu}}
L_{R,r}^{(2),\nu}.
$$

The Krawczyk chart radius must satisfy

$$
\rho
\le
\min
\left\{
\rho_{\nu\mathrm{band}},
\rho_H,
\rho_{\chi},
\rho_{\mathrm{root}}^{\nu},
\rho_J^{\nu},
\rho_{\mathrm{tail}}^{\nu},
\rho_{\mathrm{sheet}}^{\nu},
\rho_{\mathrm{support}}^{\nu},
\rho_{\mathrm{action}}^{\nu},
\rho_{\mathrm{event}}^{\nu},
\rho_{\mathrm{disc}}
\right\}.
$$

First sheet derivatives alone can populate a Newton matrix. They cannot certify the Krawczyk derivative-Lipschitz row.

---

## 6. Theorem Target

**Theorem target: bounded speed factor second root-variation lemma.** Fix one bounded-speed root-regular chart, one active root ledger $\mathcal{A}_{\nu}$, one support/action/event convention, and one row-weight convention. Suppose:

1. each active or assimilated root satisfies $G_r^{\nu}(u,\eta_r;z)=0$ on a complete causal-time cell cover;
2. every retained root has $\eta_r\ge\eta_0>0$ and a fixed sign floor $\zeta_rJ_r^{\nu}\ge J_0>0$;
3. the speed band, inverse-clock map, support margins, event windows, tail owners, inactive gaps, and noncollision floors persist on the chart ball;
4. the chart has the first and second derivative bounds for $G_r^{\nu}$, $\nu_j^-$, $\mathbf{T}_j^-$, $\widehat{\mathbf{R}}_r$, and the total delayed phase;
5. the action, support, speed-storage, and coupled fixed-point rows consume the same root ledger and sign convention.

Then every retained bounded-speed root sheet has a bilinear second variation $D^2\eta_r[v,w]$ given by the implicit formula above. The force weight $\eta_r^{-2}|J_r^{\nu}|^{-1}$ and force contribution $\mathbf{f}_r^{\nu}$ have the displayed second variations on the same stratum. The bounded-speed Hessian and Krawczyk rows may consume $L_R^{\mathrm{sheet},\nu}$ as the sheet derivative-Lipschitz contribution.

Proof route:

1. apply the implicit-function theorem to $G_r^{\nu}(u,\eta;z)=0$ using $G_{\eta}=-J_r^{\nu}$ and the fixed sign floor;
2. differentiate the implicit equation once to recover $D\eta_r[v]$ and the delayed phase variation;
3. differentiate a second time at fixed receiver time to obtain the bilinear formula for $D^2\eta_r[v,w]$;
4. propagate $D^2\eta_r[v,w]$ through $\lambda_j^-$, $\nu_j^-$, $\mathbf{T}_j^-$, $\widehat{\mathbf{R}}_r$, and $J_r^{\nu}$;
5. differentiate $\eta_r^{-2}|J_r^{\nu}|^{-1}$ on the fixed sign stratum;
6. assemble the second force envelope and push it through the bounded-speed residual rows to obtain the Krawczyk contribution.

---

## 7. Output Schema

A bounded-speed second root-variation packet must emit:

| Field | Payload |
| --- | --- |
| `root_chart` | $G_r^{\nu}(u,\eta;z)$, chart variables $z$, causal-time cells, support/action/event convention, and endpoint policy |
| `first_variation` | $\phi_{v,i}$, $\Xi_{v,i}$, $D\eta_r[v]$, $D\lambda_j^-[v]$, $D\widehat{\mathbf{R}}_r[v]$, and $DJ_r^{\nu}[v]$ |
| `second_root_variation` | $D^2\eta_r[v,w]$ from the implicit formula or an interval automatic-differentiation enclosure |
| `second_jacobian_variation` | $D^2J_r^{\nu}[v,w]$, including clock, speed, tangent, direction, and second-root terms |
| `force_weight_hessian` | $D^2(\eta_r^{-2}|J_r^{\nu}|^{-1})[v,w]$, $\alpha_v$, $\alpha_{vw}$, and sign-stratum data |
| `force_hessian` | $D^2\mathbf{f}_r^{\nu}[v,w]$ or a certified enclosure |
| `interval_floors` | $\eta_0$, $J_0$, speed band, inverse-clock, tail, support, action, event, inactive-gap, and noncollision margins |
| `krawczyk_export` | $\Lambda_{\eta,r}^{(2)}$, $\Lambda_{J,r}^{(2)}$, $\Lambda_{n,r}^{(2)}$, $L_{f,r}^{(2),\nu}$, $L_R^{\mathrm{sheet},\nu}$, limiting root label, and first failed status |

---

## 8. Failure Statuses

| Status | Meaning |
| --- | --- |
| `bounded-speed-second-root-variation-ready` | all retained roots export first and second sheet variations, force-weight Hessians, and Krawczyk constants on the same bounded-speed ledger |
| `bounded-speed-second-root-variation-open` | second sheet variations or certified interval equivalents are missing |
| `bounded-speed-root-second-ad-missing` | the packet relies on interval automatic differentiation but no AD enclosure is emitted |
| `bounded-speed-hessian-root-ledger-stale` | Hessian/action rows use a different root, support, action, event, or sign ledger |
| `bounded-speed-force-weight-second-variation-open` | $\eta^{-2}|J|^{-1}$ is differentiated only to first order |
| `bounded-speed-second-jacobian-open` | $D^2J_r^{\nu}$ is missing clock, speed, tangent, direction, or second-root terms |
| `bounded-speed-root-sheet-jacobian-sign-open` | $|J_r^{\nu}|$ has no fixed sign label for differentiating the force weight |
| `bounded-speed-root-floor-failed` | the delay, Jacobian, inactive-gap, tail, support, event, or noncollision floor fails on the chart ball |
| `bounded-speed-krawczyk-second-envelope-open` | the Krawczyk $Z$ row lacks $L_R^{\mathrm{sheet},\nu}$ |
| `not-retained` | the second-variation row is diagnostic only and cannot support bounded-speed retention |

Current status:

$$
\texttt{bounded-speed-second-root-variation-open}.
$$
