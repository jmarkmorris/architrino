# Branch-Local Response Object

Promotion status: `priority-only`. This packet defines the first geometry-bridge residual object. It is a theorem-target scaffold for one root-regular branch chart, not a retained-branch claim and not a new validation gate.

The purpose is to make the missing middle object explicit:

$$
\text{Master EOM}
\longrightarrow
\mathcal{R}_B(z_B;\theta)=0
\longrightarrow
\mathcal{K}_{B}^{\mathrm{geom}}.
$$

The branch-local response object is the residual system whose linear inverse, after gauge quotient, turns a Noether sea or assembly-environment perturbation into first-order changes in period, branch geometry, exposure, and medium response.

---

## 1. Branch Chart And State Variables

Fix one candidate branch chart $B$ with site set $i=1,\ldots,N_B$, receiver sample set $\mathcal{N}_B$, active causal-root ledger $\mathcal{A}_B$, and branch-label record $\Lambda_B$. A root label has the form

$$
\rho=(i,j,n,\alpha,\ell_\rho),
$$

where $i$ is the receiver, $j$ is the source, $n$ is the receiver sample or phase row, $\alpha$ distinguishes multiple active roots with the same receiver-source pair, and $\ell_\rho$ records the source-pair policy, memory convention, winding class, and Jacobian-sign stratum.

Use the bounded-speed arclength chart, with the fixed-speed chart recovered by setting $\nu_i\equiv1$. The retained state is

$$
z_B
=
\left(
Y,\nu,\chi,\Lambda,\eta,J,W^{\mathrm{rec}},\Lambda_B,
\mathcal{A}_{\mathrm{cyc}},
\mathcal{E}_{\mathrm{hist}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
Q_{ab},
\mathcal{Z}^{ab},
\mathcal{M}_{\mathrm{sea}}^{ab}
\right).
$$

The entries are:

| State entry | Meaning |
| --- | --- |
| $Y=(\mathbf{Y}_i)$ | Arclength-parametrized internal carrier curves, $\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3$. |
| $\nu=(\nu_i)$ | Positive bounded speed factors, with $\nu_i\equiv1$ on the fixed-speed subchart. |
| $\chi_i(\lambda)=\int_0^\lambda\nu_i(\xi)^{-1}d\xi$ | Dimensionless absolute-time phase map. |
| $\Lambda_i=\chi_i^{-1}$ | Source phase inverse used by delayed source rows. |
| $\eta=(\eta_\rho)$ | Positive dimensionless root delays for every $\rho\in\mathcal{A}_B$. |
| $J=(J_\rho)$ | Root Jacobians on the declared sign stratum. |
| $W^{\mathrm{rec}}=(W_\rho^{\mathrm{rec}})$ | Same-record receiver-normal branch strengths for every force, action, wake-history, or exposure root. |
| $\Lambda_B$ | Discrete branch labels: site identities, root identities, winding class, source policy, memory policy, and sign stratum. |
| $\mathcal{A}_{\mathrm{cyc}}$ | One-cycle action row or action-increment row for the branch. |
| $\mathcal{E}_{\mathrm{hist}}$ | Trapped internal causal-history energy row, including wake-history bookkeeping. |
| $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ | Energy, momentum, angular-momentum, charge, and provenance ledger rows. |
| $Q_{ab}$ | Cycle-averaged branch shape tensor. |
| $\mathcal{Z}^{ab}$ | Exterior exposure tensor: the symmetric tensor measuring which root-weighted directions remain visible to external probe rows. |
| $\mathcal{M}_{\mathrm{sea}}^{ab}$ | Noether sea response tensor exported by the same branch chart. |

The tensor rows are part of $z_B$, not post-processing. This forces period, shape tensor, exposure tensor, action rows, and Noether sea response tensor to close on the same root ledger.

---

## 2. Environment Record

The local environment record is

$$
\theta
=
\left(
R_*,
\Gamma,
\mathbf{C}_\theta,
\mathsf{D}_\theta,
\widetilde{\mathbf{F}}_{\mathrm{self}},
\widetilde{\mathbf{F}}_{\mathrm{med}},
\Theta_{\mathrm{sea}},
\mathsf{W}_{\mathrm{ext}},
\Delta\mathcal{A}_{\mathrm{env}},
\Delta\mathcal{L}_{E\mathbf{p}\mathbf{J},\mathrm{env}}
\right).
$$

Here $R_*$ is the scale used to nondimensionalize the branch, $\Gamma$ is the action-derived force-to-acceleration scale, $\mathbf{C}_\theta(u)$ is the branch-center drift in dimensionless absolute time $u=c_f(t-t_0)/R_*$, and $\mathsf{D}_\theta(u)$ is the local affine deformation applied to the internal coordinates before primitive causal roots are solved. The primitive root law still uses $c_f$; $\theta$ does not replace it with an observer-channel speed.

Define the absolute-coordinate branch embedding

$$
\mathbf{X}_{i,\theta}(u)
=
\mathbf{C}_\theta(u)
+
\mathsf{D}_\theta(u)
\mathbf{Y}_i(\Lambda_i(u)).
$$

The remaining environment entries enter the residual as follows:

| Environment entry | Residual use |
| --- | --- |
| $\widetilde{\mathbf{F}}_{\mathrm{self}}$ | Same-source or regularized fold-layer force row, when the ledger declares it. |
| $\widetilde{\mathbf{F}}_{\mathrm{med}}$ | Noether sea or medium-response correction to the branch force row. |
| $\Theta_{\mathrm{sea}}$ | Local Noether sea density, delay factor, drift, gradient, and constitutive coefficients used only in medium and export rows. |
| $\mathsf{W}_{\mathrm{ext}}$ | Exterior probe weights used to compute $\mathcal{Z}^{ab}$ and the preferred-frame leakage row. |
| $\Delta\mathcal{A}_{\mathrm{env}}$ | Imposed action increment or cycle-work row. |
| $\Delta\mathcal{L}_{E\mathbf{p}\mathbf{J},\mathrm{env}}$ | Imposed conservation-ledger exchange with the environment. |

Thus $D_\theta\mathcal{R}_B$ has concrete sources: changes in drift/deformation, action scale, medium force, exterior probe weights, and Noether sea constitutive coefficients.

---

## 3. Residual Blocks

The branch-local response object is the block residual

$$
\mathcal{R}_B(z_B;\theta)
=
\left(
\mathcal{R}_{\mathrm{chart}},
\mathcal{R}_{\mathrm{clock}},
\mathcal{R}_{\mathrm{root}},
\mathcal{R}_{J},
\mathcal{R}_{\mathrm{dyn}},
\mathcal{R}_{\mathrm{act}},
\mathcal{R}_{\mathrm{led}},
\mathcal{R}_{Q},
\mathcal{R}_{\mathcal{Z}},
\mathcal{R}_{\mathcal{M}}
\right).
$$

Each block is evaluated on the fixed ledger $\Lambda_B$ and active-root set $\mathcal{A}_B$. Branch-label changes are not infinitesimal responses; they are chart exits.

### 3.1 Chart And Clock Rows

The arclength, closure, and center-gauge rows are

$$
\mathcal{R}_{\mathrm{chart},i}
=
\left(
\|\mathbf{Y}_i'(\lambda)\|^2-1,\,
\mathbf{Y}_i(\lambda+L_i)-\mathbf{Y}_i(\lambda),\,
\mathbf{Y}_i'(\lambda+L_i)-\mathbf{Y}_i'(\lambda)
\right),
$$

with a declared center or moving-center gauge, for example

$$
\mathcal{R}_{\mathrm{center}}
=
\sum_i w_i\left\langle\mathbf{Y}_i\right\rangle_B.
$$

The clock rows are

$$
\mathcal{R}_{\mathrm{clock},i}
=
\left(
\chi_i'(\lambda)-\nu_i(\lambda)^{-1},\,
\Lambda_i(\chi_i(\lambda))-\lambda,\,
H_i-H_*
\right),
$$

where

$$
H_i=\chi_i(L_i).
$$

On a winding branch, replace $H_i-H_*$ by $m_iH_i-H_{\mathrm{com}}$.

### 3.2 Root And Jacobian Rows

For a root $\rho=(i,j,n,\alpha,\ell_\rho)$, let the receiver time phase be

$$
u_\rho=\chi_i(\lambda_n),
$$

and define

$$
\mathbf{R}_\rho
=
\mathbf{X}_{i,\theta}(u_\rho)
-
\mathbf{X}_{j,\theta}(u_\rho-\eta_\rho),
\qquad
\widehat{\mathbf{R}}_\rho
=
\frac{\mathbf{R}_\rho}{\|\mathbf{R}_\rho\|}.
$$

The root residual is

$$
\mathcal{R}_{\mathrm{root},\rho}
=
\|\mathbf{R}_\rho\|-\eta_\rho.
$$

The Jacobian residual is

$$
\mathcal{R}_{J,\rho}
=
J_\rho
-
\left(
1-
\partial_u\mathbf{X}_{j,\theta}(u_\rho-\eta_\rho)
\cdot
\widehat{\mathbf{R}}_\rho
\right).
$$

The chart domain carries the inequalities

$$
\eta_\rho>0,
\qquad
|J_\rho|\ge J_{\min}>0,
\qquad
g_{\mathrm{inactive}}>0,
$$

but these are domain assumptions for the residual theorem, not additional residual equations.

### 3.3 Delayed Force And Dynamics Rows

For each retained root, define the dimensionless per-root wake contribution

$$
\mathbf{f}_\rho
=
\sigma_i\sigma_j
W_\rho^{\mathrm{rec}}
\frac{\widehat{\mathbf{R}}_\rho}{\eta_\rho^2}.
$$

Here $W_\rho^{\mathrm{rec}}$ is the same-record receiver-normal branch
strength. The $|J_\rho|$ floor remains a root-chart diagnostic, not the
receiver-normal branch strength.

The receiver force row is

$$
\widetilde{\mathbf{F}}_i(z_B;\theta)
=
\sum_{\rho\in\mathcal{A}_{B,i}}\mathbf{f}_\rho
+
\widetilde{\mathbf{F}}_{\mathrm{self},i}(z_B;\theta)
+
\widetilde{\mathbf{F}}_{\mathrm{med},i}(z_B;\theta).
$$

The bounded-speed intrinsic dynamics row is

$$
\mathcal{R}_{\mathrm{dyn},i}
=
\nu_i^2\mathbf{K}_i
+
\nu_i\nu_i'\mathbf{T}_i
-
\Gamma\,\widetilde{\mathbf{F}}_i
+
\mathcal{A}_{\mathrm{emb},i}(z_B;\theta),
$$

where $\mathbf{T}_i=\mathbf{Y}_i'$, $\mathbf{K}_i=\mathbf{Y}_i''$, and $\mathcal{A}_{\mathrm{emb},i}$ is the known inertial correction induced by differentiating the environment embedding $\mathbf{C}_\theta+\mathsf{D}_\theta\mathbf{Y}_i$ in absolute time. In the internal center chart with no affine drift, $\mathcal{A}_{\mathrm{emb},i}=0$.

The fixed-speed subchart is the constrained specialization

$$
\nu_i\equiv1,
\qquad
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i=0,
\qquad
\mathbf{K}_i-\Gamma P_i^\perp\widetilde{\mathbf{F}}_i=0.
$$

### 3.4 Action, Energy, And Ledger Rows

The action row is

$$
\mathcal{R}_{\mathrm{act}}
=
\mathcal{A}_{\mathrm{cyc}}(z_B;\theta)
-
\Delta\mathcal{A}_{\mathrm{env}}.
$$

For a one-$h$ accepted transaction, this row may be specialized to

$$
\mathcal{A}_{\mathrm{cyc}}(z_B;\theta)-\sigma h=0.
$$

The internal energy-history row is

$$
\mathcal{R}_{E}
=
\mathcal{E}_{\mathrm{hist}}
-
\mathfrak{E}_{\mathrm{hist}}(Y,\nu,\eta,J,W^{\mathrm{rec}},\Theta_{\mathrm{sea}}),
$$

where $\mathfrak{E}_{\mathrm{hist}}$ is computed from the same causal-root and wake-history convention as the force row. The conservation-ledger residual is

$$
\mathcal{R}_{\mathrm{led}}
=
\mathcal{L}_{E\mathbf{p}\mathbf{J}}(z_B;\theta)
-
\Delta\mathcal{L}_{E\mathbf{p}\mathbf{J},\mathrm{env}}.
$$

This block is where energy, momentum, angular momentum, charge, and provenance enter the response object.

### 3.5 Geometry-Export Tensor Rows

Let $\langle\cdot\rangle_B$ denote the declared cycle average on the branch chart and let $\mathbf{r}_i$ be the internal position relative to the branch center. The shape tensor residual is

$$
\mathcal{R}_{Q}^{ab}
=
Q_{ab}
-
\frac{1}{M_B}
\left\langle
\sum_i m_i\,r_i^a r_i^b
\right\rangle_B.
$$

The exposure tensor is the branch-visible, root-weighted exterior tensor

$$
\mathfrak{Z}^{ab}(z_B;\theta)
=
\left\langle
\sum_{\rho\in\mathcal{A}_{B}^{\mathrm{ext}}}
\mathsf{W}_{\mathrm{ext},\rho}(\theta)
\eta_\rho^{-2}
W_\rho^{\mathrm{rec}}
\widehat{R}_\rho^a\widehat{R}_\rho^b
\right\rangle_B,
$$

with residual

$$
\mathcal{R}_{\mathcal{Z}}^{ab}
=
\mathcal{Z}^{ab}
-
\mathfrak{Z}^{ab}(z_B;\theta).
$$

The Noether sea response tensor is the branch derivative of the exported Noether sea momentum/current response with respect to a small imposed drift $\upsilon_b$ in the environment record:

$$
\mathfrak{M}_{\mathrm{sea}}^{ab}(z_B;\theta)
=
\left.
\frac{\partial}{\partial\upsilon_b}
\mathcal{P}_{\mathrm{sea}}^{a}(z_B;\theta+\upsilon)
\right|_{\upsilon=0},
$$

where $\mathcal{P}_{\mathrm{sea}}^{a}$ is computed from $\Theta_{\mathrm{sea}}$, $\widetilde{\mathbf{F}}_{\mathrm{med}}$, and the same branch exposure weights. Its residual is

$$
\mathcal{R}_{\mathcal{M}}^{ab}
=
\mathcal{M}_{\mathrm{sea}}^{ab}
-
\mathfrak{M}_{\mathrm{sea}}^{ab}(z_B;\theta).
$$

This row is the first controlled bridge from assembly response to Noether sea constitutive response. It does not assert an observer metric.

---

## 4. Linear Response And Geometry Export

On a root-regular branch chart, the first variation is

$$
D_z\mathcal{R}_B(z_B;\theta)[\delta z]
+
D_\theta\mathcal{R}_B(z_B;\theta)[\delta\theta]
=0.
$$

Let $\mathfrak{g}_B$ denote the span of translation, rotation, phase, period, root-label, and branch-family gauge directions that have been declared for the chart. Let

$$
\Pi_B: T_{z_B}\mathcal{Z}_B\to T_{z_B}\mathcal{Z}_B/\mathfrak{g}_B
$$

be the quotient projection. After adding any required phase or center-gauge border rows, define

$$
\mathcal{L}_B
=
\Pi_B D_z\mathcal{R}_B\Pi_B^*.
$$

The response theorem target is:

**Branch-local implicit response theorem target.** Suppose $\mathcal{R}_B(z_B;\theta)=0$ on a fixed root ledger $\Lambda_B$, all active roots satisfy $\eta_\rho>0$ and $|J_\rho|\ge J_{\min}>0$, same-record receiver-normal $W_\rho^{\mathrm{rec}}$ rows are declared for all force and exposure roots, inactive roots have positive gap, the bounded-speed band is open, and the bordered operator $\mathcal{L}_B$ is invertible on the non-gauge subspace. Then, for sufficiently small environment perturbations $\delta\theta$ that do not cross a branch boundary, there is a unique gauge-fixed first-order response

$$
\delta z
=
-
\mathcal{G}_B
D_\theta\mathcal{R}_B[\delta\theta],
\qquad
\mathcal{G}_B=\mathcal{L}_B^{-1}\Pi_B,
$$

up to the declared gauge reconstruction. The geometry-export packet follows by differentiating the export projection:

$$
\mathcal{K}_{B}^{\mathrm{geom}}[\delta\theta]
=
D_z\Pi_{\mathrm{geom}}[\delta z]
+
D_\theta\Pi_{\mathrm{geom}}[\delta\theta],
$$

where

$$
\Pi_{\mathrm{geom}}(z_B;\theta)
=
\left(
\ln T_B,\,
Q_{ab},\,
\mathcal{Z}^{ab},\,
\mathcal{M}_{\mathrm{sea}}^{ab},\,
\mathcal{R}_{\mathrm{pf}},\,
\mathcal{R}_{\mathrm{ledger}}
\right).
$$

Here

$$
T_B=\frac{R_*}{c_f}H_*,
$$

and a minimal preferred-frame leakage row is

$$
\mathcal{R}_{\mathrm{pf}}
=
\left(
\mathcal{Z}^{ab}
-
\frac{1}{3}\delta^{ab}\mathcal{Z}^{c}{}_{c}
\right)_{\mathrm{unpaired}}
$$

together with any declared drift-odd part of $\mathcal{M}_{\mathrm{sea}}^{ab}$. The ledger row $\mathcal{R}_{\mathrm{ledger}}$ is the exported value of $\mathcal{R}_{\mathrm{led}}$, not a separate proof obligation.

Proof route:

1. Use the simple-root rows and $|J_\rho|\ge J_{\min}$ to apply the implicit-function theorem to every active root delay $\eta_\rho$ and Jacobian $J_\rho$ as $C^1$ functions of $(Y,\nu,\theta)$ on the fixed ledger, and require the same-record receiver-normal branch-strength derivative row for each root consumed by force or exposure.
2. Substitute those root and receiver-normal derivatives into the force, dynamics, action, tensor, and Noether sea rows to obtain a $C^1$ residual map on the finite coefficient or Galerkin branch chart.
3. Quotient translation, rotation, phase, period, and root-label gauge directions by explicit border rows.
4. Apply the Banach-space or finite-dimensional implicit-function theorem to $\Pi_B\mathcal{R}_B=0$ using invertibility of $\mathcal{L}_B$.
5. Differentiate $\Pi_{\mathrm{geom}}$ along the resulting solution map $\theta\mapsto z_B(\theta)$ to obtain the displayed export formula.

The theorem target can fail in precise ways: a root hits $J_\rho=0$, a required same-record receiver-normal branch-strength derivative row is missing, an inactive root enters the chart, the speed band boundary is crossed, the action row is not differentiable under the chosen wake-history convention, or $\mathcal{L}_B$ has a non-gauge kernel. Those failures classify the chart as response-open or response-rejected, not as evidence for an observer metric.

---

## 5. First Worked Target

The first worked target should be the smallest support-complete branch already close to a root-regular chart:

1. exact-antipodal $M=3$ shell braid row, if its active root ledger, Jacobian signs, action scale, and exterior exposure rows can be kept fixed over one cycle;
2. otherwise the bounded-speed successor of that row, using $\nu_i$ and $\chi_i$ explicitly so the tangential force projection becomes a speed-factor equation rather than a fixed-speed obstruction.

The target deliverable is not a metric and not a new gate. It is a populated instance of

$$
\mathcal{R}_B(z_B;\theta)=0,
\qquad
\delta z
=
-
\mathcal{G}_B
D_\theta\mathcal{R}_B[\delta\theta],
\qquad
\mathcal{K}_{B}^{\mathrm{geom}}[\delta\theta],
$$

classified as `response-passed`, `response-open`, or `response-rejected` under the declared branch chart.

## Current Classification

This packet remains `priority-only`. The theorem target is a `defer with blocker` for corpus promotion: promotion should wait until one branch chart supplies a concrete root ledger, bordered inverse or diagnosed non-gauge kernel, and at least one computed geometry-export row.
