# Topological Carrier And Spin Targets For Same-Level Braid Branches

Promotion status: `priority-only`. This document sharpens candidate carrier geometry, phase-locking, framed-wake, angular-momentum, and color-scaffold targets for the same-level braid architecture. It is not migration authority for `content/markdown/aaa`, simulations, scene assets, or app copy.

Claim level: theorem-target packet. A branch may use the carrier families below only after a retained branch certificate supplies active causal roots, positive Jacobian floors, receiver-normal branch strengths, finite memory depth, support-band residuals, phase-lock residuals, noncollision data, history-dressed energy/action closure, angular-momentum ledger closure, exposure rows, and observer-export statuses.

---

## 1. Shared Notation

Let the three same-level binaries be indexed by $a\in\{1,2,3\}$ and their antipodal partners by $\sigma\in\{+,-\}$. Write

$$
\mathbf{y}_{a,\sigma}(t)=\mathbf{x}_{a,\sigma}(t)-\mathbf{C}(t),
\qquad
\mathbf{u}_{a,\sigma}(t)=\dot{\mathbf{x}}_{a,\sigma}(t)-\dot{\mathbf{C}}(t),
$$

where $\mathbf{C}(t)$ is the declared branch center. A radial same-level carrier must keep all six architrinos inside one support band

$$
R-\delta
\le
\|\mathbf{y}_{a,\sigma}(t)\|
\le
R+\delta
$$

on the retained window $W$, with speed residual

$$
\mathcal{R}_{\mathrm{speed}}
=
\max_{a,\sigma}\sup_{t\in W}
\frac{\big|\|\mathbf{u}_{a,\sigma}(t)\|-c_f\big|}
{\epsilon_v}
\le 1.
$$

The antipodal relation is a certificate residual, not an assumption:

$$
\mathcal{R}_{\mathrm{anti}}
=
\max_a\sup_{t\in W}
\frac{\|\mathbf{y}_{a,+}(t)+\mathbf{y}_{a,-}(t)\|}
{\epsilon_{\mathrm{anti}}}
\le 1.
$$

All carrier claims are subordinate to the Euclidean noncollision gate

$$
d_{\min}^{(q)}
=
\inf_{\substack{(a,\sigma)\ne(b,\sigma')\\ t\in W}}
\|\mathbf{x}_{a,\sigma}(t)-\mathbf{x}_{b,\sigma'}(t)\|
>
\epsilon_x.
$$

---

## 2. Candidate Carrier Families

### 2.1 Orthogonal Great-Circle / Octahedral Braid

The rigid octahedral candidate uses three mutually orthogonal carrier planes:

$$
\begin{aligned}
\gamma_1(t)&=R(\cos\theta_1(t),\sin\theta_1(t),0),\\
\gamma_2(t)&=R(0,\cos\theta_2(t),\sin\theta_2(t)),\\
\gamma_3(t)&=R(\sin\theta_3(t),0,\cos\theta_3(t)),
\end{aligned}
$$

with $\theta_a(t)=\omega t+\phi_a$, $\omega=c_f/R$, and $\mathbf{y}_{a,-}(t)=-\mathbf{y}_{a,+}(t)$ in the ideal row. The three circles intersect at the six octahedral nodes

$$
\mathcal{N}_{\mathrm{oct}}
=
\{(\pm R,0,0),(0,\pm R,0),(0,0,\pm R)\}.
$$

The theorem target is not that spatial intersection is harmless. The target is that temporal phase offsets keep node passages separated. A first phase-lock row may use offsets

$$
\Delta_{ab}^{*}\in\left\{\frac{\pi}{2},-\frac{\pi}{2}\right\},
\qquad
\operatorname{wrap}_{(-\pi,\pi]}
\big(\phi_b-\phi_a-\Delta_{ab}^{*}\big)=0,
$$

but the retained row must verify the node-clearance functions in Section 3.2. The octahedral braid is rejected if the carrier depends on perfect rigid constraints rather than causal-wake dynamics preserving the residuals.

### 2.2 Hopf-Chart Carrier

The Hopf-chart family is a construction chart only. The physical ambient space remains the Euclidean void $\mathbb{R}^3$, not $S^3$. Let

$$
F:S^3\setminus\{N\}\to\mathbb{R}^3
$$

be the stereographic projection used by the branch certificate. A chart row may place a path on a Hopf torus

$$
\mathbb{T}_{\alpha}
=
\left\{
(z_1,z_2)\in\mathbb{C}^2:
|z_1|=\cos\alpha,\ |z_2|=\sin\alpha
\right\}
\subset S^3
$$

and project it by

$$
\mathbf{x}_{a,\sigma}(t)=\mathbf{C}(t)+F(u_{a,\sigma}(t)),
\qquad
u_{a,\sigma}(t)\in\mathbb{T}_{\alpha_a}.
$$

The Hopf-chart row must report $\alpha_a$, winding data, phase offsets, projection scale, support-band residuals, and Euclidean $d_{\min}^{(q)}$. Linked fibers or Clifford-torus language do not prove noncollision, root regularity, or spinor holonomy by themselves.

### 2.3 Deformed Support-Band Carrier

The deformed radial support-band carrier drops rigid great-circle motion. It treats the retained branch as a deformable choreography inside

$$
\mathcal{B}_{R,\delta}
=
\left\{
\mathbf{y}\in\mathbb{R}^3:
R-\delta\le\|\mathbf{y}\|\le R+\delta
\right\}.
$$

Write

$$
\mathbf{y}_{a,\sigma}(t)=\rho_{a,\sigma}(t)\hat{\mathbf{r}}_{a,\sigma}(t),
\qquad
R-\delta\le\rho_{a,\sigma}(t)\le R+\delta.
$$

The phase $\theta_a(t)$ is then extracted from a declared return section or carrier chart, not assumed from a perfect circle. This family is the default target if exact great-circle nodes fail but the dynamics still appear to form a stable same-level support band. It must still supply winding rows, noncollision rows, causal-root rows, and closure residuals on the same retained window.

A non-spherical carrier may replace $\mathcal{B}_{R,\delta}$ by a declared support functional with equivalent certified margins. In that case the root, action, support, and stability rows must be recomputed in the free-support chart rather than inherited from the radial sector.

---

## 3. Phase-Lock And Noncollision Conditions

### 3.1 Phase And Winding Residuals

For any carrier chart that supplies phases $\theta_a(t)$, define the relative phase residual

$$
\mathcal{R}_{\mathrm{phase}}
=
\max_{a<b}
\sup_{t\in W}
\frac{
\left|
\operatorname{wrap}_{(-\pi,\pi]}
\big(\theta_b(t)-\theta_a(t)-\Delta_{ab}^{*}\big)
\right|
}
{\epsilon_{\phi}}.
$$

The winding residual over a candidate period $T$ is

$$
\mathcal{R}_{\mathrm{wind}}
=
\max_a
\left|
\frac{\theta_a(t+T)-\theta_a(t)}{2\pi}
-w_a
\right|,
\qquad
w_a\in\mathbb{Z}.
$$

A phase-locked row requires

$$
\mathcal{R}_{\mathrm{phase}}\le 1,
\qquad
\mathcal{R}_{\mathrm{wind}}\le \epsilon_w,
\qquad
d_{\min}^{(q)}>\epsilon_x.
$$

### 3.2 Collision-Node Clearance Functions

Here `collision-node` means an intersection node of candidate carrier curves, not a new ontology. For a node $n$ and a node radius $r_n$, define the set of architrinos inside the node neighborhood at time $t$:

$$
\mathcal{P}_n(t)
=
\left\{
(a,\sigma):
\|\mathbf{y}_{a,\sigma}(t)-n\|\le r_n
\right\}.
$$

The instantaneous node-clearance function is

$$
\chi_x^n(t)
=
\begin{cases}
\displaystyle
\min_{\substack{i\ne j\\ i,j\in\mathcal{P}_n(t)}}
\|\mathbf{x}_i(t)-\mathbf{x}_j(t)\|,
& |\mathcal{P}_n(t)|\ge 2,\\[6pt]
+\infty,
& |\mathcal{P}_n(t)|<2.
\end{cases}
$$

For periodic carrier rows, let

$$
\mathcal{T}_i(n)
=
\{t\in[0,T):\mathbf{y}_i(t)=n\},
\qquad
|t-s|_T=\min_{m\in\mathbb{Z}}|t-s+mT|.
$$

The temporal node-clearance function is

$$
\chi_t^n
=
\min_{i\ne j}
\inf_{\substack{t\in\mathcal{T}_i(n)\\ s\in\mathcal{T}_j(n)}}
c_f|t-s|_T.
$$

The causal-root node-clearance function is

$$
\chi_J^n
=
\inf_{\substack{(i,j,t,s)\in\mathcal{A}_q\\
\mathbf{y}_i(t),\,\mathbf{y}_j(s)\in B(n,r_n)}}
|J_{ij}(t,s)|.
$$

A node-bearing carrier row requires

$$
\inf_{n,t}\chi_x^n(t)>\epsilon_x,
\qquad
\inf_n\chi_t^n>\epsilon_t,
\qquad
\inf_n\chi_J^n>\epsilon_J.
$$

These conditions are separate from the global $d_{\min}^{(q)}$ gate because a candidate can avoid simultaneous coordinate collisions while still grazing a near-tangent causal root at a node.

---

## 4. Framed-Wake Braid Record And Spinor Parity Target

For a retained period $T$, close each architrino worldline in $\mathbb{R}^3\times S_T^1$:

$$
\Gamma_i
=
\{(\mathbf{x}_i(t),e^{2\pi\mathrm{i}t/T}):t\in[0,T]\}.
$$

The framed-wake braid record is the branch-certificate entry

$$
\mathcal{K}_q
=
\left(
\text{carrier label},
\{w_a\},
\{Lk(\Gamma_i,\Gamma_j)\},
\mathcal{W}_q,
\mathcal{P}_{\mathrm{node}},
\Pi_{\mathcal{W}}^{2\pi},
\Pi_{\mathcal{W}}^{4\pi}
\right),
$$

where $\mathcal{W}_q$ records the wake-ribbon frame, active causal roots, Jacobian floors, and frame-continuation convention used for the same retained row.

The spinor holonomy theorem target is

$$
\Pi_{\mathcal{W}}^{2\pi}=1,
\qquad
\Pi_{\mathcal{W}}^{4\pi}=0,
\qquad
\Delta_{\mathrm{gc}}(\mathcal{W}_q)\le\epsilon_{\mathrm{gc}}.
$$

This is only a target for $SU(2)$ double-cover behavior. It is not a completed spinor proof until the same retained branch also closes the root ledger, phase residuals, noncollision gates, tangential residuals, angular-momentum ledger, torque residual, stability row, and gauge-control residual.

---

## 5. Angular-Momentum Ledger And Torque Closure

The spinor target cannot be promoted if the angular-momentum ledger is open. Define mechanical angular momentum relative to the branch center by

$$
\mathbf{J}_{\mathrm{mech}}(t)
=
\sum_i \mathbf{y}_i(t)\times\mathbf{p}_i(t).
$$

The total angular-momentum ledger must include mechanical, wake, and Noether sea update channels:

$$
\mathbf{J}_{\mathrm{tot}}(t)
=
\mathbf{J}_{\mathrm{mech}}(t)
+\mathbf{J}_{\mathrm{wake}}(t)
+\mathbf{J}_{\mathrm{sea}}(t).
$$

For a closed isolated branch row, the residual is

$$
\mathcal{R}_{\mathbf{J}}^{(q)}
=
\sup_{t\in W}
\frac{
\|\mathbf{J}_{\mathrm{tot}}(t)-\mathbf{J}_{\mathrm{tot}}(t_0)\|
}
{\epsilon_{\mathbf{J}}}
\le 1.
$$

For a branch with declared boundary exchange, use the integrated torque row

$$
\mathcal{R}_{\tau}^{(q)}
=
\sup_{t\in W}
\frac{
\left\|
\mathbf{J}_{\mathrm{tot}}(t)-\mathbf{J}_{\mathrm{tot}}(t_0)
-\int_{t_0}^{t}\boldsymbol{\tau}_{\mathrm{bdry}}(s)\,ds
\right\|
}
{\epsilon_{\tau}}
\le 1.
$$

The torque closure obligation is to compute $\mathbf{J}_{\mathrm{wake}}$, $\mathbf{J}_{\mathrm{sea}}$, and $\boldsymbol{\tau}_{\mathrm{bdry}}$ from the same active roots and endpoint convention used in the force, energy/action, and event-ledger rows. A near-zero $\mathbf{J}_{\mathrm{mech}}$ from symmetric orthogonal planes is not by itself a spin claim; it may also indicate spin-0 cancellation unless the framed-wake parity and total ledger close.

---

## 6. Color Slot Scaffold

The three same-level binaries provide a discrete slot action

$$
\pi\in\mathcal{S}_3:
a\mapsto\pi(a),
\qquad
a\in\{1,2,3\}.
$$

This supplies at most a color slot scaffold:

$$
\mathcal{S}_3\subset\mathrm{Weyl}(SU(3)).
$$

It does not recover continuous $SU(3)$. Continuous color requires a phase-bundle connection over a branch-family base, with local generators and curvature:

$$
\nabla_\mu^{\mathrm{color}}
=
\partial_\mu+A_\mu^A T_A,
\qquad
[T_A,T_B]=\mathrm{i}f_{AB}{}^{C}T_C,
$$

and

$$
F_{\mu\nu}^{A}
=
\partial_\mu A_\nu^A-\partial_\nu A_\mu^A
+f_{BC}{}^{A}A_\mu^B A_\nu^C.
$$

The connection coefficients $A_\mu^A$ must be extracted from continuous choreography phase transport, not inserted as inherited gauge data. Until the row supplies generators, connection, curvature, transport, and confinement residuals, the only safe statement is that $\mathcal{S}_3$ labels three discrete carrier slots.

---

## 7. Failure Modes

| Failure code | Trigger |
| --- | --- |
| `support-band-escape` | Some $\|\mathbf{y}_{a,\sigma}\|$ leaves $[R-\delta,R+\delta]$ on $W$. |
| `phase-lock-drift` | $\mathcal{R}_{\mathrm{phase}}>1$ or $\mathcal{R}_{\mathrm{wind}}>\epsilon_w$. |
| `projection-collision` | Euclidean $d_{\min}^{(q)}\le\epsilon_x$. |
| `node-clearance-fail` | Any $\chi_x^n$, $\chi_t^n$, or $\chi_J^n$ falls below its declared floor. |
| `jacobian-node-graze` | A node-adjacent active root has $|J_{ij}|\le\epsilon_J$. |
| `near-zero-self-root-unresolved` | A same-source causal root lacks retained-positive-delay, regularized-fold-layer, or reject status. |
| `tangential-residual-open` | Fixed-speed branch has nonzero tangential force residual above tolerance. |
| `energy-ledger-open` | $E_{\mathrm{hist}}$ is not conserved within tolerance on the retained row. |
| `angular-momentum-ledger-open` | $\mathcal{R}_{\mathbf{J}}^{(q)}>1$ after wake and Noether sea updates are included. |
| `torque-closure-open` | $\mathcal{R}_{\tau}^{(q)}>1$ or boundary torque is not computed from the retained roots. |
| `framed-wake-parity-open` | $\Pi_{\mathcal{W}}^{2\pi}$ / $\Pi_{\mathcal{W}}^{4\pi}$ is asserted without a retained framed-wake continuation row. |
| `color-connection-missing` | $\mathcal{S}_3$ slots are promoted as continuous $SU(3)$ without generators, connection, and curvature. |
| `topological-mass-overclaim` | Winding, writhe, or mapping-class data are treated as a mass formula without history-dressed energy, exposure, and Noether sea response rows. |

---

## 8. Simulation Observables

A carrier/spin packet should emit these observables even when a row is `not_computed`:

1. `carrier_family`: orthogonal great-circle/octahedral braid, Hopf-chart carrier, or deformed support-band carrier.
2. `state_vector`: $\mathbf{x}_{a,\sigma}$, $\mathbf{u}_{a,\sigma}$, polarities, $\mathbf{C}(t)$, $R$, $\delta$, and support-band residuals.
3. `phase_lock`: $\theta_a(t)$, $\Delta_{ab}^{*}$, $\mathcal{R}_{\mathrm{phase}}$, $\mathcal{R}_{\mathrm{wind}}$, and winding integers $w_a$.
4. `noncollision`: $d_{\min}^{(q)}$, node set $\mathcal{N}$, $\chi_x^n$, $\chi_t^n$, $\chi_J^n$, and node-neighborhood radius $r_n$.
5. `root_ledger`: active causal roots $\mathcal{A}_q$, delays, Jacobians, self-root statuses, and memory depth.
6. `force_residuals`: speed residuals, tangential closure residuals, support-band restoring residuals, and branch-return gap.
7. `framed_wake_braid`: $\Gamma_i$, $\mathcal{W}_q$, linking numbers, writhe or helicity proxy, optional Jones polynomial row, and parity continuations under $2\pi$ and $4\pi$ rotations.
8. `energy_action`: $E_{\mathrm{hist}}$, action increments, endpoint convention, and energy residual.
9. `angular_momentum`: $\mathbf{J}_{\mathrm{mech}}$, $\mathbf{J}_{\mathrm{wake}}$, $\mathbf{J}_{\mathrm{sea}}$, $\boldsymbol{\tau}_{\mathrm{bdry}}$, $\mathcal{R}_{\mathbf{J}}^{(q)}$, and $\mathcal{R}_{\tau}^{(q)}$.
10. `stability`: Lyapunov spectrum, NHIM domination check, return-map gap, and perturbation-recovery status.
11. `exposure_medium`: $\mathcal{Z}^{ab}$, exposure quotient, $\mathcal{M}_{\mathrm{sea}}^{ab}$, and leakage diagnostics.
12. `color_scaffold`: $\mathcal{S}_3$ slot action, status of continuous phase-bundle connection, generators $T_A$, curvature $F_{\mu\nu}^{A}$, and confinement/transport residuals.

Priority decision: this packet remains priority-only until at least one retained branch row passes the carrier, root, phase, noncollision, energy/action, angular-momentum, framed-wake parity, exposure, and observer-export gates on the same data.
