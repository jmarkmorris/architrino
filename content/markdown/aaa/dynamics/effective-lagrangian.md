# Effective Lagrangian

This document formalizes the variational foundation of the Architrino Assembly Architecture. It bridges the exact, path-history-dependent microdynamics of discrete architrinos with the coarse-grained, effective field theories that govern macroscopic assembly behavior in the Noether Sea.

### Regularized Nonlocal Action and Variation

The Master Equation of motion for architrinos is non-Markovian, driven by the intersection of trajectories with past causal wake surfaces. Consequently, the fundamental action principle cannot be a local integral over instantaneous states. It must be a multi-time functional that evaluates the entire path history.

For a finite, isolated set of architrinos parameterized by absolute time $t$ in the Euclidean void, use the $\eta>0$ regularized delayed action (the exact kernel is recovered as $\eta\to0^+$).

$$
S_\eta[\{\mathbf{x}_i\}]
=
\int dt \sum_i \frac{1}{2} m_i |\dot{\mathbf{x}}_i(t)|^2
- \frac{1}{2}\sum_{i,j}\frac{\kappa \, \sigma_{ij} |q_i q_j|}{c_f}
\int dt \int_{-\infty}^{t} dt_0\,
\frac{\phi_\eta\!\big(g_{ij}(t,t_0)\big)}{r_{ij}(t;t_0)},
$$
$$
g_{ij}(t,t_0)\equiv t-t_0-\frac{r_{ij}(t;t_0)}{c_f},
\qquad
r_{ij}(t;t_0)=\|\mathbf{x}_i(t)-\mathbf{x}_j(t_0)\|,
\qquad
\phi_\eta\equiv\delta_\eta.
$$

where:
*   $\mathbf{x}_i(t)$ is the trajectory of architrino $i$.
*   $m_i$ is the inertial parameter (effective mass) of the receiver.
*   $r_{ij}(t; t_0)$ is the Euclidean separation between reception and emission events.
*   $\delta_\eta$ is a mollified delta function of width $\eta > 0$, regularizing the causal wake surface to ensure a Lipschitz-continuous vector field.
*   $\sigma_{ij} = \mathrm{sign}(q_i q_j)$ enforces attraction for opposite charges and repulsion for like charges.

#### Regularization and Admissibility Assumptions

The derivation below is valid under:

- **(EL1)** $\mathbf{x}_i\in C^2([t_a,t_b];\mathbb{R}^3)$ and variations $\boldsymbol{\xi}_i$ are $C^1$ with $\boldsymbol{\xi}_i(t_a)=\boldsymbol{\xi}_i(t_b)=0$.
- **(EL2)** $\phi_\eta\in C_c^1(\mathbb{R})$, $\phi_\eta\ge0$, $\int\phi_\eta(s)\,ds=1$.
- **(EL3)** Collision exclusion on active support: $r_{ij}(t;t_0)\ge r_{\min}>0$ whenever $\phi_\eta(g_{ij}(t,t_0))\neq0$.
- **(EL4)** Delay-root transversality on active branches: $\partial_{t_0}g_{ij}(t,t_0)\neq0$ when $g_{ij}(t,t_0)=0$.
- **(EL5)** Integrability on the chosen history window (finite window or decay) so differentiation under the time integrals is justified.
- **(EL6)** Delayed branch convention: only $t_0\le t$ contributes (equivalently, the $\Theta(t-t_0)$ branch of the causal selector).

#### Kernel Variation and Branch Reduction

Set $\mathbf{x}_i^\varepsilon=\mathbf{x}_i+\varepsilon\boldsymbol{\xi}_i$ and differentiate at $\varepsilon=0$.

Kinetic term:
$$
\delta S_{\eta,\text{kin}}
=
\sum_i\int_{t_a}^{t_b} m_i\dot{\mathbf{x}}_i\cdot\dot{\boldsymbol{\xi}}_i\,dt
=
-\sum_i\int_{t_a}^{t_b} m_i\ddot{\mathbf{x}}_i\cdot\boldsymbol{\xi}_i\,dt.
$$

For the interaction kernel
$$
\mathcal{K}_{ij}(t,t_0)\equiv \frac{\phi_\eta(g_{ij}(t,t_0))}{r_{ij}(t;t_0)},
\qquad
\hat{\mathbf{r}}_{ij}\equiv\frac{\mathbf{x}_i(t)-\mathbf{x}_j(t_0)}{r_{ij}(t;t_0)},
$$
the receiver-coordinate gradient is
$$
\nabla_{\mathbf{x}_i(t)}\mathcal{K}_{ij}
=
-\hat{\mathbf{r}}_{ij}
\left[
\frac{\phi_\eta(g_{ij})}{r_{ij}^2}
+
\frac{\phi_\eta'(g_{ij})}{c_f\,r_{ij}}
\right].
$$

This receiver-side gradient is one ingredient in the full first variation, but it is not the whole story: in the double-time action each varied worldline appears both as a receiver coordinate $\mathbf{x}_i(t)$ and as a source coordinate inside transposed kernels. The full branch-resolved variation is carried out in [master-equation](./master-equation.md#exact-nonlocal-lagrangian). The result is the exact delayed force law
$$
m_i\ddot{\mathbf{x}}_i(t)
=
\sum_j \kappa \, \sigma_{ij}|q_i q_j|
\sum_{\tau\in\mathcal{C}_{ij}(t)}
\frac{\hat{\mathbf{r}}_{ij}(t;\tau)}
{r_{ij}(t;\tau)^2\,\left|1-\hat{\mathbf{r}}_{ij}(t;\tau)\cdot\mathbf{v}_j(\tau)/c_f\right|},
$$
including self-hit branches $j=i$ when the trivial coincidence root is excluded.

Equivalently, in the regularized integral form one may write
$$
m_i\ddot{\mathbf{x}}_i(t)
=
\sum_j \kappa \, \sigma_{ij}|q_i q_j|
\int_{-\infty}^{t}dt_0\,
\frac{\hat{\mathbf{r}}_{ij}(t;t_0)}{r_{ij}(t;t_0)^2}\,
\phi_\eta\!\big(g_{ij}(t,t_0)\big),
$$
with the understanding that $\phi_\eta$ converges weakly to the causal selector on simple branches as $\eta\to0^+$. This is the regularized form consistent with the branch law above; the derivative term in $\nabla_{\mathbf{x}_i}\mathcal{K}_{ij}$ is absorbed only after the full delayed variation is assembled and the branch reduction is performed.

### Symmetries and History-Aware Conservation Laws

The regularized action $S_\eta$ is invariant under the fundamental symmetry group of the substrate: the Euclidean group $E(3)$ and absolute time translations $\mathbb{R}_{\text{time}}$; the exact statement is recovered in the $\eta\to0^+$ limit.

Because the Lagrangian is nonlocal in time, the corresponding Noether charges are path-history functionals tracking "in-flight" interactions encoded in the causal wakes.

**Energy Functional:**
Invariance under absolute time translation yields a conserved total energy
$$
E_{\text{tot}}(t)=K(t)+E_{\text{wake}}(t),
$$
where the exact nonlocal Noether charge can be written as in [master-equation](./master-equation.md#exact-wake-energy-functional-at-time-boundary-t):

$$
E_{\text{wake}}(t)
=
\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{t} dt_0
\int_{t}^{\infty} dt_1\,
\partial_{t_1}\mathcal{K}_{ij}(t_1,t_0).
$$

For trajectory reconstruction one may equivalently use the work-integral form
$$
U(t)=U_\ast-\int_{t_\ast}^{t}\sum_i m_i\,\mathbf{a}_i(t')\cdot\mathbf{v}_i(t')\,dt',
$$
which differs from $E_{\text{wake}}(t)$ at most by a reference constant and boundary convention.

**Generalized Momentum:**
Spatial translation invariance guarantees the conservation of total momentum, $\mathbf{P}_{\text{tot}} = \mathbf{P}_{\text{mech}}(t) + \mathbf{P}_{\text{wake}}(t)$, where the mechanical momentum of the architrinos is balanced by the momentum flux propagating within the causal wake surfaces. Boundedness of the history-aware energy is therefore the natural diagnostic against runaway behavior, not a separate postulate.

### Coarse-Graining: The Effective Continuum Lagrangian

To describe the emergent dynamics of the Noether Sea and complex matter assemblies, we transition from discrete trajectories to continuum densities. We define a coarse-grained architrino charge density $\rho(\mathbf{x}, t)$ and current density $\mathbf{j}(\mathbf{x}, t)$, smoothed over a scale much larger than the tri-binary radius but smaller than macroscopic gradients.

At the level of a branch-collapsed delayed causal action, the exact multi-time interaction double sum suggests the continuum delayed functional

$$
S_{\text{int}}^{\text{cg}} = - \frac{\kappa}{2c_f} \int dt \int d^3x \int d^3x' \,
\frac{\rho(\mathbf{x}, t) \rho(\mathbf{x}', t - \|\mathbf{x}-\mathbf{x}'\|/c_f)}
{\|\mathbf{x}-\mathbf{x}'\|\,J_{\mathrm{eff}}(\mathbf{x},t;\mathbf{x}',t')}
$$
with delayed source time
$$
t' = t - \frac{\|\mathbf{x}-\mathbf{x}'\|}{c_f},
$$
propagation direction
$$
\hat{\mathbf{n}}(\mathbf{x},\mathbf{x}')=
\frac{\mathbf{x}-\mathbf{x}'}{\|\mathbf{x}-\mathbf{x}'\|},
$$
coarse transport velocity
$$
\mathbf{u}(\mathbf{x}',t')
=
\frac{\mathbf{j}(\mathbf{x}',t')}{\rho(\mathbf{x}',t')}
\qquad (\rho\neq 0),
$$
and effective Jacobian
$$
J_{\mathrm{eff}}(\mathbf{x},t;\mathbf{x}',t')
=
\left|1-\frac{\mathbf{u}(\mathbf{x}',t')\cdot\hat{\mathbf{n}}(\mathbf{x},\mathbf{x}')}{c_f}\right|.
$$
This is the continuum inheritance of the discrete delayed causal $1/r$ action kernel together with the same Jacobian branch weight that appears in the master equation. Source emission remains isotropic at the microscopic level, but the received coarse flux is compressed or dilated by the delayed transport geometry. Differentiating this delayed action with respect to receiver coordinates produces the corresponding Jacobian-weighted inverse-square force density plus velocity-dependent correction terms. In the quasi-static limit $\|\mathbf{u}\|/c_f\to0$, one recovers $J_{\mathrm{eff}}\to 1$ and the leading force law reduces to the familiar inverse-square form.

By defining an effective scalar potential $\Phi(\mathbf{x}, t)$ and a vector flow potential $\mathbf{A}(\mathbf{x}, t)$ that track the integrated causal wakes of the continuous medium, the system maps locally onto an effective field theory. These potentials are bookkeeping fields for delayed transport, not additional ontological primitives. The resulting local Lagrangian density $\mathcal{L}_{\text{eff}}$ therefore belongs to a further closure step beyond the exact delayed causal action.

### Topological Constraints and Assembly Stability

The effective Lagrangian restricts the allowed topological configurations of the architrino medium. Stable assemblies—such as the nested maximal-curvature orbits of tri-binaries—manifest as localized, phase-locked topological defects (vortices or knots) within the continuous flow fields.

The stability of these assemblies is governed by the nonlinear self-hit feedback embedded in the interaction functional. When the internal circulation velocities exceed $c_f$, the resulting non-Markovian repulsion establishes a robust geometric attractor, providing a mass gap and fixing the spatial extent of the assembly. The effective Lagrangian thus isolates the discrete parameter space (e.g., $e/6$ polar site decorations) where these geometric attractors minimize the time-averaged path-history action.

### Closure Interface: Action-to-Envelope Reduction

This chapter supplies the variational bridge used by the quantum closure chain.

From the regularized nonlocal action, derive a continuum effective action in terms of coarse fields $(\rho,\mathbf{j})$, then test a phase-amplitude closure ansatz of the form
$$
\rho=|\psi|^2,\qquad
\mathbf{j}=\frac{\hbar_{\mathrm{eff}}}{m}\Im(\psi^*\nabla\psi)+\mathbf{j}_{\mathrm{mem}}.
$$

Closure requirement for this interface:
- the Euler-Lagrange equations of the coarse action reproduce the effective envelope equation used in [pilot-wave-character](../quantum/pilot-wave-character.md),
- memory contributions $\mathbf{j}_{\mathrm{mem}}$ remain explicit as controlled correction terms rather than hidden parameter absorbs.
