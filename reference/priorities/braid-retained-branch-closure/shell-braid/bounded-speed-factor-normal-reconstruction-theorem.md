# Bounded Speed Factor Normal Reconstruction Theorem

Promotion status: `priority-only`. This packet advances the bounded speed factor dynamics stack after the scalar speed-ODE row closes. It refines [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md), [bounded-speed-factor-executable-solver-protocol.md](bounded-speed-factor-executable-solver-protocol.md), [free-support-bounded-speed-dynamics.md](free-support-bounded-speed-dynamics.md), [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md), and [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md).

It does not retain a branch. It states the normal/curve reconstruction problem: once a bounded speed factor $\nu_i$ has absorbed the tangential work into a closed scalar speed row, the remaining normal equation must reconstruct actual closed arclength curves without losing the support descriptor, noncollision floors, causal-root ledger, action scale, period/winding data, or root-ledger persistence.

---

## 1. Input After The Speed ODE Closes

Fix one same-level braid branch chart, one source-pair policy, one same-source policy, one support descriptor, one bounded speed factor root ledger, one action/event convention, and one row-weight convention.

The scalar row is assumed to have already produced:

$$
0<\nu_-\le\nu_i(\lambda_i)\le\nu_+<\infty,
$$

with clock maps

$$
\chi_i(\lambda_i)
=
\int_0^{\lambda_i}\frac{d\xi}{\nu_i(\xi)},
\qquad
\Lambda_i(u)=\chi_i^{-1}(u),
\qquad
\frac{d\Lambda_i}{du}
=
\nu_i(\Lambda_i(u)).
$$

It also emits the closed scalar speed equation

$$
\nu_i\nu_i'
=
\Gamma_B^{\nu}\mathbf{T}_i\cdot F_i^{\nu},
$$

and the period-compatible primitive row

$$
\int_0^{H_*}
\mathbf{T}_i(u)\cdot F_i^{\nu}(u)\,du
=0,
$$

together with the speed-band interval, clock/length row, and winding replacement when $m_iH_i=H_{\mathrm{com}}$ is declared.

The zero-mean correction intake may hand this scalar row to the present packet through `normal_reconstruction_handoff`, but that handoff is not a reconstruction certificate. It must cite the same `speed_ode_clock_length_certificate`, carry the same bounded-speed ledger id and force/consumer checksums, and expose the pullback

$$
\widehat{\nu}_i(u)
=
\nu_{i,0}
+
A_i(u;z_0+\delta z_B),
\qquad
\frac{d\Lambda_i}{du}
=
\widehat{\nu}_i(u),
\qquad
\nu_i(\lambda_i)
=
\widehat{\nu}_i(\chi_i(\lambda_i)).
$$

The handoff may stage supplied rows for the normal residual, tangent holonomy, position closure, unit-tangent residual, and support margin. Those rows only prove that the scalar speed packet is available to the normal solver. If the speed certificate is absent, the status is `speed-ode-row-missing`; if ledger ids or force checksums disagree, the status is `normal-force-ledger-mismatch`; if only this handoff is present, the status remains `normal-reconstruction-open`.

A later `bounded_speed_normal_reconstruction_candidate` may upgrade that handoff only when all candidate rows close on the same ledger:

$$
\nu_i(\lambda_i)^2\mathbf{K}_i(\lambda_i)
-
\Gamma_B^{\nu}P_i^\perp(\lambda_i)F_i^{\nu}(\chi_i(\lambda_i))
=
\mathbf{0},
\qquad
\int\mathbf{K}_i\,d\lambda_i=\mathbf{0},
\qquad
\int\mathbf{T}_i\,d\lambda_i=\mathbf{0}.
$$

It must also close the unit-tangent, support-margin, noncollision, root-ledger-persistence, and normal Krawczyk rows. The success status is `bounded-speed-normal-reconstruction-candidate`; the candidate is still `not_retained` and does not certify a bounded-speed live ledger until action/Noether, event, stability, observer-export, refinement, and coupled fixed-point rows close.

The normal reconstruction input is then the tuple

$$
\mathfrak{N}_{\nu}^{\mathrm{in}}
=
\left(
\nu_i,
\chi_i,
\Lambda_i,
\mathcal{A}_i^{\nu},
F_i^{\nu},
\mathsf{Support}^{\nu},
\Gamma_B^{\nu},
\mathsf{PeriodWind},
\mathsf{Action}^{\nu},
\mathsf{Margins}^{\nu}
\right)_i.
$$

Here $\mathcal{A}_i^{\nu}$ is not merely a list of roots. It includes root labels, source identity, sign labels, Jacobian signs, delay brackets, excluded gaps, memory depth, same-source policy, and receiver-normal branch-weight normalization. The force $F_i^{\nu}$ must be evaluated on that same bounded speed factor ledger:

$$
F_i^{\nu}(u)
=
\sum_{r\in\mathcal{A}_i^{\nu}(u)}
\sigma_i\sigma_j
\frac{W_{r,\nu}^{\mathrm{rec}}(u)}{\eta_r(u)^2}
\widehat{\mathbf{R}}_r(u)
+
F_{i,\mathrm{self}}^{\nu}(u)
+
F_{i,\mathrm{med}}^{\nu}(u),
$$

with self and medium-response terms included only when their ledgers use the same causal-time convention. If support multipliers are active, $F_i^{\nu}$ denotes the same total force used by the speed-ODE and action rows:

$$
F_i^{\nu}=F_{i,\mathrm{root/self/med}}^{\nu}+F_{i,\mathrm{supp}}^{\nu}.
$$

If support viability is enforced as a variational inequality instead, the normal reconstruction row must state the tangent-cone version of the force convention.

The unknown output remains geometric:

$$
\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\|\mathbf{Y}_i'(\lambda_i)\|=1,
\qquad
\mathbf{T}_i=\mathbf{Y}_i',
\qquad
\mathbf{K}_i=\mathbf{Y}_i''.
$$

The normal equation to be reconstructed is

$$
\boxed{
\nu_i(\lambda_i)^2\mathbf{K}_i(\lambda_i)
=
\Gamma_B^{\nu}
P_i^\perp(\lambda_i)F_i^{\nu}(\chi_i(\lambda_i))
}
$$

where

$$
P_i^\perp=I-\mathbf{T}_i\mathbf{T}_i^T.
$$

The equation is a curve reconstruction equation, not only a sampled residual row. A solution must integrate $\mathbf{K}_i$ to a closed unit tangent and integrate that tangent to a closed arclength curve.

---

## 2. Normal Reconstruction As A Curve Problem

Define the normal curvature field implied by the force ledger:

$$
\mathcal{K}_i^{\nu}(\lambda_i;\mathbf{Y})
=
\frac{\Gamma_B^{\nu}}{\nu_i(\lambda_i)^2}
P_i^\perp(\lambda_i)
F_i^{\nu}(\chi_i(\lambda_i)).
$$

The normal reconstruction problem is to find $\mathbf{Y}_i$ such that

$$
\mathbf{T}_i'(\lambda_i)
=
\mathcal{K}_i^{\nu}(\lambda_i;\mathbf{Y}),
\qquad
\mathbf{Y}_i'(\lambda_i)=\mathbf{T}_i(\lambda_i),
\qquad
\|\mathbf{T}_i(\lambda_i)\|=1.
$$

The projector makes

$$
\mathbf{T}_i\cdot\mathcal{K}_i^{\nu}=0,
$$

so unit speed is formally preserved by the differential equation. A certificate must still emit the unit-tangent residual because a finite-mode representation can violate this identity through discretization, mixed clocks, omitted force terms, or stale derivative columns.

For a frozen root/force ledger, $\mathcal{K}_i^{\nu}$ is a known periodic forcing after the speed row closes. For a live bounded-speed ledger, $\mathcal{K}_i^{\nu}$ depends on $\mathbf{Y}$ through the roots, receiver-normal branch weights, directions, support descriptor, and action scale. The theorem target below is the live-ledger statement. A frozen-ledger solve is only a diagnostic unless it also proves root-ledger persistence in a certified ball.

---

## 3. Closure Identities

Normal reconstruction requires more than small pointwise normal residual. The following identities must close on the same branch chart.

### 3.1 Zero Net Tangent Holonomy

Since $\mathbf{T}_i'=\mathbf{K}_i$, tangent closure requires

$$
\mathbf{T}_i(L_i)-\mathbf{T}_i(0)
=
\int_0^{L_i}\mathbf{K}_i(\lambda)\,d\lambda
=\mathbf{0}.
$$

Using the normal equation, this becomes the zero net tangent holonomy row

$$
\boxed{
\int_0^{L_i}
\frac{\Gamma_B^{\nu}}{\nu_i(\lambda)^2}
P_i^\perp(\lambda)
F_i^{\nu}(\chi_i(\lambda))\,d\lambda
=\mathbf{0}.
}
$$

For a winding branch, lift the integrand over $m_i$ covers:

$$
\int_0^{m_iL_i}
\frac{\Gamma_B^{\nu}}{\nu_i(\lambda)^2}
P_i^\perp(\lambda)
F_i^{\nu}(\chi_i(\lambda))\,d\lambda
=\mathbf{0}.
$$

Failure of this row means the normal force reconstructs an open tangent path on the unit sphere, even if the pointwise normal residual is small.

### 3.2 Closed-Position Integral

Position closure is the independent row

$$
\boxed{
\int_0^{L_i}\mathbf{T}_i(\lambda)\,d\lambda
=\mathbf{0}.
}
$$

For winding data, the lifted row is

$$
\int_0^{m_iL_i}\mathbf{T}_i(\lambda)\,d\lambda
=\mathbf{0}.
$$

This row cannot be inferred from tangent closure. A closed tangent loop on $S^2$ may integrate to a nonzero spatial drift.

### 3.3 Tangent-Frame Monodromy And Rotation Closure

Let $Q_i(\lambda)\in SO(3)$ be a transported tangent frame with first column $\mathbf{T}_i(\lambda)$. Write

$$
Q_i'(\lambda)=Q_i(\lambda)\Omega_i(\lambda),
\qquad
\Omega_i(\lambda)^T=-\Omega_i(\lambda).
$$

The frame monodromy is

$$
M_i
=
\mathcal{P}\exp
\int_0^{L_i}\Omega_i(\lambda)\,d\lambda.
$$

Tangent closure requires

$$
M_i\mathbf{e}_1=\mathbf{e}_1.
$$

If the support descriptor or branch label includes a ribbon, plane-normal, or twist class, the rotation closure row is stronger:

$$
M_i
=
R_{\mathbf{e}_1}(2\pi q_i)
\quad
\text{in the declared frame gauge},
\qquad
q_i\in\mathbb{Z}.
$$

For a plain curve-only reconstruction, $q_i$ is gauge data and should not be used as a new branch label. For a plane-normal or support-frame chart, $q_i$ is part of the branch certificate and must persist under refinement.

### 3.4 Period And Winding Compatibility

The bounded speed factor period is

$$
H_i
=
\int_0^{L_i}\frac{d\lambda}{\nu_i(\lambda)}.
$$

The equal physical-period row is

$$
H_i=H_*
\qquad
\text{for every }i,
$$

or, for rational winding,

$$
m_iH_i=H_{\mathrm{com}},
\qquad
m_i\in\mathbb{N}.
$$

Normal reconstruction must report the geometric cover $L_i$ and the physical-time cover $H_i$ together. Closing $\mathbf{Y}_i$ over $L_i$ while failing $m_iH_i=H_{\mathrm{com}}$ gives a closed curve with the wrong causal-time return.

---

## 4. Support-Radial Compatibility

Let the support descriptor supply a center $\mathbf{C}$ and support radius

$$
r_i(\lambda)=\|\mathbf{Y}_i(\lambda)-\mathbf{C}\|.
$$

Assume $r_i(\lambda)>0$ and define

$$
\mathbf{n}_i(\lambda)
=
\frac{\mathbf{Y}_i(\lambda)-\mathbf{C}}{r_i(\lambda)}.
$$

The arclength support identity is

$$
\mathbf{n}_i\cdot\mathbf{K}_i
=
r_i''
-
\frac{1-(r_i')^2}{r_i}.
$$

Projecting the normal equation into the support-radial direction gives the compatibility identity

$$
\boxed{
\nu_i^2
\left(
r_i''
-
\frac{1-(r_i')^2}{r_i}
\right)
=
\Gamma_B^{\nu}
\mathbf{n}_i\cdot P_i^\perp F_i^{\nu}.
}
$$

Since

$$
\mathbf{n}_i\cdot P_i^\perp F_i^{\nu}
=
\mathbf{n}_i\cdot F_i^{\nu}
-
(\mathbf{n}_i\cdot\mathbf{T}_i)
(\mathbf{T}_i\cdot F_i^{\nu}),
$$

the scalar speed ODE supplies the missing tangent-power term. Combining the tangent row and the normal row recovers the full radial dynamics identity

$$
\nu_i\nu_i'r_i'
+
\nu_i^2
\left(
r_i''
-
\frac{1-(r_i')^2}{r_i}
\right)
=
\Gamma_B^{\nu}\mathbf{n}_i\cdot F_i^{\nu}.
$$

The support margins are inequalities, not decorative metadata. For a same-level band

$$
R-\delta\le r_i(\lambda)\le R+\delta,
$$

define

$$
m_{\mathrm{sup},i}
=
\inf_{\lambda}
\min\{r_i(\lambda)-(R-\delta),\,R+\delta-r_i(\lambda)\}.
$$

A free-support reconstruction needs $m_{\mathrm{sup},i}>0$ or a certified boundary-viability row. A fixed-radius reconstruction is the special sector

$$
r_i(\lambda)\equiv R_i,
$$

which additionally imposes

$$
\Gamma_B^{\nu}\mathbf{n}_i\cdot F_i^{\nu}
=
-\frac{\nu_i^2}{R_i}
+
\nu_i\nu_i'(\mathbf{n}_i\cdot\mathbf{T}_i).
$$

In the fixed-radius sector $\mathbf{n}_i\cdot\mathbf{T}_i=0$, so this reduces to

$$
\Gamma_B^{\nu}\mathbf{n}_i\cdot F_i^{\nu}
=
-\frac{\nu_i^2}{R_i}.
$$

Thus a fixed-radius normal reconstruction does not prove the free-support row.

---

## 5. Noncollision And Root-Ledger Persistence

Normal reconstruction must preserve the same architrino support and causal-root ledger. The noncollision floor is

$$
d_{\min}
=
\inf_{i\ne j}
\inf_{\lambda,\mu}
\|\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\mu)\|.
$$

A retained reconstruction ball requires

$$
d_{\min}\ge d_0>0.
$$

For each retained causal-root label $r=(i,j,\alpha)$ on the bounded-speed ledger,

$$
G_r^{\nu}(u,\eta_r(u);\mathbf{Y},\nu)=0,
$$

with

$$
J_r^{\nu}(u)
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_r(u).
$$

The persistence margin is

$$
\zeta_rJ_r^{\nu}(u)\ge J_0>0,
\qquad
\eta_r(u)\ge\eta_0>0,
\qquad
\zeta_r\in\{+1,-1\}.
$$

Inactive root intervals must retain a gap

$$
|G_q^{\nu}(u,\eta)|\ge g_0>0
$$

on every excluded cell, or be assimilated as new differentiable sheets before the branch is claimed to persist.

The persistence certificate over a reconstruction ball $\|z-z_0\|\le\rho$ is therefore

$$
\rho
\le
\rho_{\mathrm{ledger}}^{\nu}
=
\min\{
\rho_d,
\rho_{\eta}^{\nu},
\rho_J^{\nu},
\rho_{\mathrm{gap}}^{\nu},
\rho_{\mathrm{tail}}^{\nu},
\rho_{\mathrm{support}}^{\nu},
\rho_{\nu\mathrm{band}},
\rho_{\Gamma}^{\nu}
\}.
$$

If the normal solve changes a root count, root sign, memory convention, support sector, or same-source policy, the output is a new branch attempt, not a reconstruction of the same bounded-speed ledger.

---

## 6. Finite-Mode And Krawczyk Certificate

Let $z$ denote the finite-mode reconstruction variables. At minimum $z$ contains curve coefficients $a$; depending on chart gauge it may also contain initial tangent-frame coordinates, support-center variables, period/winding variables, and an action scale variable if $\Gamma_B^{\nu}$ is solved rather than consumed. The speed coefficients are not free in this packet unless the scalar speed ODE is being solved simultaneously; otherwise they are certified inputs from the preceding row.

Define the continuous normal residual

$$
\mathcal{R}_{N,i}^{\nu}(z)
=
\nu_i^2\mathbf{Y}_i''
-
\Gamma_B^{\nu}
P_i^\perp F_i^{\nu}.
$$

The finite residual vector is

$$
\mathcal{F}_{N}^{\nu}(z)
=
\begin{bmatrix}
\mathcal{R}_{N}^{\nu}\\
\mathcal{R}_{T\mathrm{unit}}\\
\mathcal{R}_{T\mathrm{hol}}\\
\mathcal{R}_{Y\mathrm{close}}\\
\mathcal{R}_{\mathrm{frame}}\\
\mathcal{R}_{H\mathrm{wind}}\\
\mathcal{R}_{\mathrm{support}}^{\nu}\\
\mathcal{R}_{r}^{\nu}\\
\mathcal{R}_{\mathrm{root\text{-}persist}}^{\nu}\\
\mathcal{R}_{\mathrm{noncoll}}\\
\mathcal{R}_{\Gamma}^{\nu}
\end{bmatrix}.
$$

The derivative matrix must include:

1. curve derivatives of $\mathbf{Y}_i$, $\mathbf{T}_i$, $\mathbf{K}_i$, $P_i^\perp$, support radii, and support normals;
2. bounded-speed clock derivatives when the active finite variables include speed coefficients or period variables;
3. root-sheet derivatives $D\eta_r$, $DJ_r^{\nu}$, and $D\widehat{\mathbf{R}}_r$ on the same causal-time chart;
4. force derivatives through $\eta_r^{-2}$, $W_{r,\nu}^{\mathrm{rec}}$, self-hit terms, and medium-response terms;
5. action-scale derivatives if $\Gamma_B^{\nu}$ is not a frozen certified input;
6. monodromy derivatives for the tangent-frame closure row.

Let

$$
F_N^{\nu}(z)=W_N^{1/2}\mathcal{F}_N^{\nu}(z).
$$

On a gauge-reduced range chart, choose an approximate inverse $C_N$ for $DF_N^{\nu}(z_0)$. The Krawczyk row passes if there is a radius $\rho$ such that

$$
Y_N=\|C_NF_N^{\nu}(z_0)\|,
\qquad
Z_N=
\sup_{\|h\|\le\rho}
\|I-C_NDF_N^{\nu}(z_0+h)\|,
$$

and

$$
\boxed{
Z_N<1,
\qquad
Y_N+Z_N\rho<\rho,
\qquad
\rho\le\rho_{\mathrm{chart},N}^{\nu}.
}
$$

The normal reconstruction chart radius is

$$
\rho_{\mathrm{chart},N}^{\nu}
=
\min
\left\{
\rho_{\mathrm{geom}},
\rho_{\mathrm{unit}},
\rho_{T\mathrm{hol}},
\rho_{Y\mathrm{close}},
\rho_{\mathrm{frame}},
\rho_H,
\rho_{\mathrm{support}}^{\nu},
\rho_d,
\rho_{\eta}^{\nu},
\rho_J^{\nu},
\rho_{\mathrm{gap}}^{\nu},
\rho_{\mathrm{tail}}^{\nu},
\rho_{\nu\mathrm{band}},
\rho_{\Gamma}^{\nu},
\rho_{\mathrm{disc}}
\right\}.
$$

For an overdetermined collocation residual, the range/cokernel split must also be emitted. Let $P_{\mathrm{cok},N}$ be the numerical cokernel projector. A range Krawczyk pass certifies only the range equation unless the cokernel bound satisfies

$$
\sup_{\|h\|\le\rho}
\left\|
P_{\mathrm{cok},N}
\mathcal{F}_{N}^{\nu}(z_0+h)
\right\|
+
\epsilon_{\mathrm{disc}}^{\nu}
+
\epsilon_{\mathrm{tail}}^{\nu}
\le
\tau_N.
$$

Without this row, residual descent is not normal reconstruction.

---

## 7. Output Schema

A bounded speed factor normal reconstruction packet must emit:

| Field | Payload |
| --- | --- |
| `solver_space` | `bounded-speed-normal-reconstruction` or `fixed-speed-special-case` |
| `speed_ode_certificate` | $\nu_i$, $\chi_i$, $\Lambda_i$, tangent forcing, zero-mean row, primitive excursion, speed-band interval, clock/length row consumed from the scalar packet, and optional `normal_reconstruction_handoff` provenance when the zero-mean correction intake supplies it |
| `bounded_speed_normal_reconstruction_candidate` | optional same-ledger candidate provenance from the zero-mean correction intake, including normal equation, tangent holonomy, position closure, unit-tangent, support-margin, noncollision, root-persistence, and normal Krawczyk rows |
| `period_winding` | $L_i$, $H_i$, $H_*$ or $m_iH_i=H_{\mathrm{com}}$, lifted-cover convention, and period residuals |
| `normal_equation` | $\nu_i^2\mathbf{K}_i-\Gamma_B^{\nu}P_i^\perp F_i^{\nu}$ residual in sampled and continuous norms |
| `tangent_holonomy` | $\int\mathbf{K}_i\,d\lambda$, lifted winding version, tolerance, and status |
| `position_closure` | $\int\mathbf{T}_i\,d\lambda$, lifted winding version, tolerance, and status |
| `tangent_frame_monodromy` | frame gauge, $M_i$, declared rotation integer $q_i$ when applicable, and monodromy status |
| `support_descriptor` | support sector, center, support band or functional, $r_i$, $r_i'$, $r_i''$, support margins, boundary viability, and fixed-radius-special-case status |
| `support_radial_compatibility` | radial projection of the normal row and the combined tangent-plus-normal radial identity |
| `root_ledger_persistence` | active labels, root brackets, sign labels, delay/Jacobian/gap floors, inactive-cell exclusions, tail status, and same-source policy |
| `floors` | speed, support, noncollision, delay, Jacobian, gap, and action-scale margins |
| `finite_mode_basis` | curve basis, gauge rows, collocation grid, reconstruction variables, and frozen versus live speed status |
| `derivative_matrix_normal` | columns in the active variables, including clock/root/force/projector/support/monodromy derivatives |
| `krawczyk_budget_normal` | $Y_N$, $Z_N$, $\rho$, $\rho_{\mathrm{chart},N}^{\nu}$, range/cokernel split, tail/discretization bounds, and obstruction status |
| `action_scale` | $\Gamma_B^{\nu}$ source, action-derived or diagnostic status, and compatibility with the same root/force ledger |
| `status` | first failed row or `bounded-speed-normal-reconstruction-candidate` |

---

## 8. Fixed-Speed Special Case

The fixed-speed subcase is

$$
\nu_i\equiv1,
\qquad
\chi_i(\lambda)=\lambda,
\qquad
\Lambda_i(u)=u.
$$

The scalar speed ODE becomes the pointwise fixed-speed tangent closure

$$
\mathbf{T}_i\cdot F_i^1=0.
$$

The normal reconstruction equation becomes

$$
\mathbf{K}_i
=
\Gamma_B^1P_i^\perp F_i^1.
$$

Thus the fixed-speed reconstruction problem is:

1. pointwise tangent force vanishes;
2. normal force reconstructs curvature;
3. tangent holonomy, position closure, monodromy, support, noncollision, and root-ledger rows close in the arclength chart.

The bounded-speed problem is different. It allows

$$
\mathbf{T}_i\cdot F_i^{\nu}\ne0
$$

pointwise only because the scalar ODE has converted that tangent work into a closed, positive, band-limited speed factor. The normal row is scaled by $\nu_i^2$ and the root ledger uses $\chi_i$, $\Lambda_i$, and

$$
J_r^{\nu}
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_r.
$$

Therefore an old fixed-speed normal certificate can be read only as

$$
\texttt{fixed-speed-special-case}.
$$

It does not certify bounded-speed normal reconstruction unless the speed, clock, root, support, action, derivative, Krawczyk, and closure rows above are recomputed on the bounded-speed ledger.

---

## 9. Theorem Target

**Theorem target: bounded speed factor normal reconstruction.** Fix one bounded-speed branch chart, one source-pair policy, one same-source policy, one support descriptor, one period/winding convention, one action/event convention, and one row-weight convention. Suppose:

1. the scalar speed ODE row closes with positive speed band, zero-mean tangent forcing, clock/length return, and equal physical-period or winding compatibility;
2. the bounded-speed causal-root ledger has finite active roots, positive delay and Jacobian floors, inactive-root gap floors, finite memory, and a declared same-source policy;
3. the force ledger, support descriptor, and action scale $\Gamma_B^{\nu}$ use that same bounded-speed root ledger;
4. a finite-mode normal reconstruction packet satisfies the normal equation, zero net tangent holonomy, closed-position integral, tangent-frame monodromy, support-radial compatibility, support margins, noncollision floors, and root-ledger persistence rows;
5. the Krawczyk range/cokernel budget encloses a unique reconstruction in a chart ball contained in the support, root, speed, action, and discretization radii.

Then the packet reconstructs closed arclength curves $\mathbf{Y}_i$ satisfying

$$
\nu_i^2\mathbf{K}_i
=
\Gamma_B^{\nu}P_i^\perp F_i^{\nu}
$$

on the same bounded-speed ledger. Together with the previously certified scalar speed ODE, the curves satisfy the full center-time bounded-speed dynamics residual

$$
\nu_i\nu_i'\mathbf{T}_i
+
\nu_i^2\mathbf{K}_i
-
\Gamma_B^{\nu}F_i^{\nu}
=\mathbf{0}
$$

on the retained chart.

This makes the output a bounded-speed dynamics/action candidate. It is not a retained branch until the master retention rows for tail, Noether/event exchange, action curl, inventory, stability, observer export, and refinement persistence also close.

Proof route:

1. speed-band positivity makes $\chi_i$ invertible and keeps causal-time roots well-defined;
2. the speed ODE supplies the tangent component of the center-time acceleration and the period-compatible speed primitive;
3. the normal equation supplies $\mathbf{T}_i'=\mathbf{K}_i$ after division by $\nu_i^2$;
4. zero net tangent holonomy closes $\mathbf{T}_i$ over the declared cover;
5. the closed-position integral closes $\mathbf{Y}_i$ over the declared cover;
6. tangent-frame monodromy preserves the branch frame or rotation class when that class is part of the support descriptor;
7. support-radial compatibility and support margins keep the reconstructed curve in the declared support sector;
8. noncollision and root-ledger persistence keep the force ledger unchanged inside the Krawczyk ball;
9. the range/cokernel Krawczyk inequalities turn finite-mode residual closure into a local curve-level reconstruction certificate.

---

## 10. Status Codes

| Status | Meaning |
| --- | --- |
| `speed-ode-row-missing` | $\nu_i$, $\chi_i$, $\Lambda_i$, zero-mean tangent forcing, primitive excursion, speed-band interval, or clock/length row is not certified |
| `normal-reconstruction-handoff-staged` | the zero-mean correction intake supplied scalar speed and receiver residual rows, but the normal equation and closure identities have not been certified |
| `bounded-speed-period-winding-open` | $H_i=H_*$ or $m_iH_i=H_{\mathrm{com}}$ fails |
| `normal-force-ledger-mismatch` | normal force, root ledger, support descriptor, or action scale uses a different bounded-speed convention |
| `normal-holonomy-open` | $\int\mathbf{K}_i\,d\lambda\ne0$ on the declared cover |
| `position-closure-open` | $\int\mathbf{T}_i\,d\lambda\ne0$ on the declared cover |
| `tangent-frame-monodromy-open` | tangent-frame return or declared rotation integer fails |
| `support-radial-compatibility-open` | radial projection of the normal row disagrees with the support identity or the combined tangent-plus-normal radial dynamics row |
| `support-margin-failure` | support band or boundary-viability row fails |
| `noncollision-floor-failure` | reconstructed curves violate the noncollision floor |
| `root-ledger-persistence-failure` | a retained root, inactive gap, sign label, same-source policy, or tail exclusion changes in the reconstruction ball |
| `action-scale-mismatch` | $\Gamma_B^{\nu}$ is fitted or imported from a different ledger without action compatibility |
| `finite-mode-normal-krawczyk-open` | finite residual descent lacks a range/cokernel Krawczyk enclosure |
| `bounded-speed-normal-reconstruction-candidate` | normal reconstruction rows close on the same bounded-speed ledger |
| `fixed-speed-special-case` | $\nu_i\equiv1$ and the result should not be read as a bounded-speed certificate |

Current status:

$$
\texttt{bounded-speed-normal-reconstruction-open}.
$$
