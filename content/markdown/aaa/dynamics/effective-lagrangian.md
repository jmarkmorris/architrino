# Effective Lagrangian

This chapter formalizes the conditional variational scaffold used by $\mathbb{A}\mathbb{A}\mathbb{A}$. Its purpose is to connect the exact, path-history-dependent microdynamics of discrete architrinos to coarse-grained effective descriptions of macroscopic assembly behavior in the Noether Sea.

The bridge is deliberately conditional. The Master EOM remains the primary dynamics at the substrate level; an action or Lagrangian chart becomes theorem-grade only after its variation, boundary, and conservation residuals close on the retained branch chart. Until then, the effective Lagrangian is a disciplined inference device rather than an independent ontology.

### Regularized Nonlocal Action and Variation

The Master Equation of Motion for architrinos is non-Markovian, driven by intersections between receiver trajectories and past causal wake surfaces. Consequently, any action-level scaffold for this law cannot be a local integral over instantaneous states. It must be a multi-time functional over path history, and its variation residual must be identified before the scaffold is treated as an exact action derivation. A scale-only derivation requires that residual to vanish or become a boundary term; a recoil-inclusive derivation may instead retain it as a mechanical wake-emission resistance term.

For a finite, isolated set of architrinos parameterized by absolute time $t$ in the Euclidean void, use the $\eta>0$ regularized delayed action below. The exact causal wake kernel is recovered in the weak branch limit as $\eta\to0^+$. The admissible interaction sum excludes trivial self-coincidence: $i\ne j$ terms are retained, and $i=j$ terms are retained only on nontrivial self-hit branches with $t-t_0\ge\tau_{\min}>0$ or with an explicitly declared core regularization.

$$
S_\eta[\{\mathbf{x}_i\}]
=
\int dt \sum_i \frac{1}{2} \mu_{\text{arch}} \|\dot{\mathbf{x}}_i(t)\|^2
- \frac{1}{2}\sum_{i,j}^{\mathrm{adm}}\frac{\kappa \, \sigma_{ij} |q_i q_j|}{c_f}
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

Here:
- $\mathbf{x}_i(t)$ is the trajectory of architrino $i$.
- $\mu_{\text{arch}}$ is the universal force/energy bookkeeping constant, not a particle-specific inertial mass.
- $r_{ij}(t; t_0)$ is the Euclidean separation between reception and emission events.
- $\delta_\eta$ is a mollified delta function of width $\eta > 0$. It supports Lipschitz control only together with the collision floor, finite-branch, transversality, and integrability assumptions below.
- $\sigma_{ij} = \mathrm{sign}(q_i q_j)$ enforces attraction for opposite polarities and repulsion for like polarities.

#### Regularization and Admissibility Assumptions

The derivation below is valid under:

- **(EL1)** $\mathbf{x}_i\in C^2([t_a,t_b];\mathbb{R}^3)$ and variations $\boldsymbol{\xi}_i$ are $C^1$ with $\boldsymbol{\xi}_i(t_a)=\boldsymbol{\xi}_i(t_b)=0$.
- **(EL2)** $\phi_\eta\in C_c^1(\mathbb{R})$, $\phi_\eta\ge0$, $\int\phi_\eta(s)\,ds=1$.
- **(EL3)** Collision and trivial-self exclusion on active support: $r_{ij}(t;t_0)\ge r_{\min}>0$ whenever $\phi_\eta(g_{ij}(t,t_0))\neq0$, and for $i=j$ the active support also satisfies $t-t_0\ge\tau_{\min}>0$ unless a separate core regularization supplies the same lower-bound control.
- **(EL4)** Delay-root transversality on active branches: $\partial_{t_0}g_{ij}(t,t_0)\neq0$ when $g_{ij}(t,t_0)=0$.
- **(EL5)** Integrability on the chosen history window, either by finite support or sufficient tail falloff, so differentiation under the time integrals is justified.
- **(EL6)** Delayed branch convention: only $t_0\le t$ contributes (equivalently, the $\Theta(t-t_0)$ branch of the causal selector).

#### Kernel Variation and Branch Reduction

This subsection isolates the exact step at which a variational scaffold can fail. Set $\mathbf{x}_i^\varepsilon=\mathbf{x}_i+\varepsilon\boldsymbol{\xi}_i$ and differentiate at $\varepsilon=0$.

Kinetic term:
$$
\delta S_{\eta,\text{kin}}
=
\sum_i\int_{t_a}^{t_b} \mu_{\text{arch}}\dot{\mathbf{x}}_i\cdot\dot{\boldsymbol{\xi}}_i\,dt
=
-\sum_i\int_{t_a}^{t_b} \mu_{\text{arch}}\ddot{\mathbf{x}}_i\cdot\boldsymbol{\xi}_i\,dt.
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

This receiver-side gradient is one ingredient in the full first variation, but it is not the complete Euler-Lagrange expression. In the double-time action, each varied worldline appears both as a receiver coordinate $\mathbf{x}_i(t)$ and as a source coordinate inside transposed kernels. The full branch-resolved variation is carried out in [master-equation](./master-equation.md#exact-nonlocal-lagrangian). The term proportional to $\phi_\eta'(g_{ij})$ is not an algebraic nuisance to discard: on a purely delayed branch it is the local signature of wake-emission recoil. If a chart proves that this term is boundary-only, the scale term below gives the scale-only Master EOM; if not, the same variation points to a recoil-inclusive force law.

On charts where the constraint-variation residual is boundary-only, or is cancelled by an explicitly declared regularized action-level term, the scale-only result is the delayed force law
$$
\mu_{\text{arch}}\ddot{\mathbf{x}}_i(t)
=
\sum_j \kappa \, \sigma_{ij}|q_i q_j|
\sum_{t_0\in\mathcal{C}_{ij}(t)}
\frac{\hat{\mathbf{r}}_{ij}(t;t_0)}
{r_{ij}(t;t_0)^2\,\left|1-\hat{\mathbf{r}}_{ij}(t;t_0)\cdot\mathbf{v}_j(t_0)/c_f\right|},
$$
including self-hit branches $j=i$ when the trivial coincidence root is excluded.

The branch collapse used here is an $\eta\to0^+$ simple-root statement, not an identity at arbitrary finite $\eta$. Since
$$
\partial_{t_0}g_{ij}(t,t_0)
=
-\left(1-\frac{\hat{\mathbf{r}}_{ij}(t;t_0)\cdot\mathbf{v}_j(t_0)}{c_f}\right),
$$
any branch-local smooth $f$ satisfies
$$
\lim_{\eta\to0^+}\int_{-\infty}^{t} f(t_0)\phi_\eta\!\big(g_{ij}(t,t_0)\big)\,dt_0
=
\sum_{t_0\in\mathcal{C}_{ij}(t)}
\frac{f(t_0)}
\left|1-\hat{\mathbf{r}}_{ij}(t;t_0)\cdot\mathbf{v}_j(t_0)/c_f\right|}
$$
provided the active roots are simple and separated from collision support.

Equivalently, in the finite-$\eta$ branch-selector form one may write
$$
\mu_{\text{arch}}\ddot{\mathbf{x}}_i(t)
=
\sum_j \kappa \, \sigma_{ij}|q_i q_j|
\int_{-\infty}^{t}dt_0\,
\frac{\hat{\mathbf{r}}_{ij}(t;t_0)}{r_{ij}(t;t_0)^2}\,
\phi_\eta\!\big(g_{ij}(t,t_0)\big),
$$
with the understanding that the displayed finite-$\eta$ integral is a branch-selector surrogate whose weak limit is the Jacobian-weighted branch law above. The derivative term in $\nabla_{\mathbf{x}_i}\mathcal{K}_{ij}$ is absorbed only after the full delayed variation is assembled and the branch reduction is performed. In a recoil-inclusive reading, this sentence is replaced by a stronger requirement: the derivative term is retained as $\mathbf{C}_{ij}^{(\eta)}$ and tested as part of the force and conservation ledger rather than being forced to zero.

A derivation, reduction, or simulation that claims action-derived dynamics must therefore report the variation residual
$$
\mathbf{R}_i^{(\eta)}(t)
=
\mu_{\text{arch}}\ddot{\mathbf{x}}_i(t)
-
\sum_j\kappa\,\sigma_{ij}|q_iq_j|
\left(
\mathbf{F}_{ij,\mathrm{scale}}^{(\eta)}(t)
+
\mathbf{C}_{ij}^{(\eta)}(t)
\right),
$$
using the scale term and constraint residual defined in [Master Equation](./master-equation.md#exact-nonlocal-lagrangian). The dimensionless window diagnostic is
$$
\epsilon_{\mathrm{var}}^{(\eta)}(W)
=
\frac{
\sum_i\int_W\|\mathbf{R}_i^{(\eta)}(t)\|\,dt
}{
\sum_i\int_W
\left(
\mu_{\text{arch}}\|\ddot{\mathbf{x}}_i(t)\|
+
\|\mathbf{F}_{i,\mathrm{act}}^{(\eta)}(t)\|
\right)dt
+
\varepsilon
}.
$$
The scale-only branch law is theorem-grade on $W$ only when this residual tends to zero with the declared branch floors and boundary convention. The broader action-derived dynamics may instead be theorem-grade with nonzero $\mathbf{C}_{ij}^{(\eta)}$ if that term is retained as mechanical recoil and the same action closes the energy, momentum, and angular-momentum ledgers. If neither condition is reported, the local effective Lagrangian remains a fitted chart.

The current status is therefore a conditional theorem schema, not a universal action theorem. The pure scalar $1/r$ action is not a universal exact action for the scale-only Master EOM; it is valid as that derivation only on residual-closed charts. On charts where the interior residual survives, $\mathbf{C}_{ij}^{(\eta)}$ is the strict mechanical recoil (wake-emission resistance) required by a purely delayed action. It is the same bookkeeping channel that balances the positive tangential drive and wake escapement described in [Binary Dynamics](binary-dynamics.md#tangential-drive-and-wake-escapement) and [Kinetic and Potential Energy](energy.md#wake-escapement).

The same-support local scalar route and its finite delta-jet extension are ruled out under the restricted assumptions in [master-equation](./master-equation.md#exact-nonlocal-lagrangian): cancelling the derivative residual forces the counterterm to change the accepted inverse-square scale term. The remaining minimal scale-only repair is the delayed-interior characteristic-tail kernel stated there. With
$$
u=g+\frac{r}{c_f},
$$
the endpoint-clear candidate is
$$
K_{\mathrm{eff}}^{(\eta)}(r,g)
=
\int_{-\infty}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds,
$$
or the finite-endpoint variant with lower limit $-h_{+}$ after the characteristic gauge has cancelled the endpoint-clearance term. It satisfies
$$
\left(
\partial_r-\frac{1}{c_f}\partial_g
\right)
K_{\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(g)}{r^2},
$$
so it cancels the derivative-of-constraint residual without changing the accepted inverse-square scale term. Effective Lagrangian reductions should still inherit the Master EOM directly unless they explicitly choose the normalized characteristic-tail kernel and carry its boundary-increment convention on the retained chart.

The normalized characteristic-tail kernel now carries explicit energy, momentum, and angular-momentum wake-history increments in [master-equation](./master-equation.md#exact-nonlocal-lagrangian). An effective Lagrangian reduction may therefore choose that kernel only when it also carries the same boundary-increment convention and reports the corresponding variation and conservation residuals on its branch chart. Without those residuals, the reduced Lagrangian remains a scaffold for the Master EOM rather than an independent proof of the branch force.

### Symmetries and History-Aware Conservation Laws

The regularized action $S_\eta$ is invariant under the fundamental symmetry group of the substrate when the mollifier, history window, and self-branch cutoff preserve those symmetries: the Euclidean group $E(3)$ and absolute time translations $\mathbb{R}_{\text{time}}$; the exact statement is recovered in the $\eta\to0^+$ limit. If the regularization is inserted only at the equation-of-motion level or uses a non-invariant window, the associated energy, momentum, and angular-momentum expressions become diagnostics rather than proved Noether charges.

Because the Lagrangian is nonlocal in time, the corresponding Noether charges are path-history functionals tracking interactions that are still carried by causal wakes between emission and reception.

**Energy Functional:**
Invariance under absolute time translation yields a conserved total energy only for the symmetry-preserving action-derived model:
$$
E_{\text{tot}}(t)=K(t)+E_{\text{wake}}(t),
$$
where the action-level nonlocal Noether charge can be written with the weighted causal kernel from [master-equation](./master-equation.md#action-level-wake-energy-functional-at-time-boundary-t). To avoid confusing the receiver-gradient kernel above with the Noether-energy kernel, write
$$
\mathcal{K}_{ij}^{E}(t_1,t_0)
=
\frac{\kappa\,\sigma_{ij}\,|q_iq_j|}{c_f}
\Theta(t_1-t_0)
\frac{\delta\!\big(g_{ij}(t_1,t_0)\big)}
{r_{ij}(t_1,t_0)}.
$$
For the delayed-interior characteristic-tail candidate, the Noether-energy kernel must instead be built from the same normalized action kernel,
$$
\mathcal{K}_{ij,\mathrm{eff}}^{E}(t_1,t_0)
=
\frac{\kappa\,\sigma_{ij}\,|q_iq_j|}{c_f}
\Theta(t_1-t_0)
K_{\mathrm{eff}}^{(\eta)}
\!\left(
r_{ij}(t_1,t_0),
g_{ij}(t_1,t_0)
\right).
$$
The scalar $1/r$ expression remains the diagnostic scaffold only when this replacement has not been declared for the chart.
Then:

$$
E_{\text{wake}}(t)
=
\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{t} dt_0
\int_{t}^{\infty} dt_1\,
\partial_{t_1}\mathcal{K}_{ij}^{E}(t_1,t_0).
$$

For compatible trajectory reconstruction one may use the work-integral form
$$
U(t)=U_\ast-\int_{t_\ast}^{t}\sum_i \mu_{\text{arch}}\,\mathbf{a}_i(t')\cdot\mathbf{v}_i(t')\,dt',
$$
when it is derived from the same action-level force and boundary convention. Otherwise $U(t)$ is a diagnostic history functional, not an independently proved Noether charge.

The corresponding finite-window energy residual is
$$
\epsilon_E^{(\eta)}(W)
=
\frac{
\left|
\Delta_W\left(K+E_{\text{wake}}^{(\eta)}\right)
-
\int_W\sum_i\mathbf{v}_i\cdot\mathbf{R}_i^{(\eta)}\,dt
-
\int_W\mathcal{B}_E^{(\eta)}\,dt
\right|
}{
\left|\Delta_W K\right|
+
\left|\Delta_W E_{\text{wake}}^{(\eta)}\right|
+
\varepsilon
}.
$$
Here $\mathcal{B}_E^{(\eta)}$ is the declared endpoint or period-cut leakage. For isolated period-matched tests, $\epsilon_{\mathrm{var}}^{(\eta)}\to0$, $\mathcal{B}_E^{(\eta)}\to0$, and $\epsilon_E^{(\eta)}\to0$ are the minimal conservation checks before the effective Hamiltonian is promoted beyond a diagnostic fit.

For a branch chart that explicitly chooses the normalized delayed-interior characteristic-tail kernel, the conservation object is not the generic scalar $1/r$ scaffold above but the pullback
$$
K_{\mu,\mathfrak{B}}+E_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)},
\qquad
\mathbf{P}_{\mathrm{mech},\mathfrak{B}}+\mathbf{P}_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)},
\qquad
\mathbf{J}_{\mathrm{mech},\mathfrak{B}}+\mathbf{J}_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}
$$
defined on the same retained branch rows that enter the force residual. The energy residual above is theorem-level only after this chart declares the action-level $g$, endpoint convention, branch floors, and endpoint or period-cut leakage terms. The work-integral reconstruction $U(t)$ remains a trajectory diagnostic unless it is derived from that same normalized kernel and boundary convention.

**Generalized Momentum:**
Spatial translation invariance guarantees the conservation of total momentum, $\mathbf{P}_{\text{tot}} = \mathbf{P}_{\text{mech}}(t) + \mathbf{P}_{\text{wake}}(t)$, where the mechanical momentum of the architrinos is balanced by the momentum flux propagating within the causal wake surfaces. Boundedness of the history-aware energy is therefore the natural diagnostic against runaway behavior, not a separate postulate.

For an effective reduction to promote a retained chart rather than fit it, it must also report vector residuals for the same branch pullback:
$$
\epsilon_P^{(\eta)}(W)
=
\frac{
\left\|
\Delta_W\left(\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake,eff}}^{(\eta)}\right)
-
\int_W\sum_i\mathbf{R}_i^{(\eta)}\,dt
-
\int_W\boldsymbol{\mathcal{B}}_P^{(\eta)}\,dt
\right\|
}{
\left\|\Delta_W\mathbf{P}_{\mathrm{mech}}\right\|
+
\left\|\Delta_W\mathbf{P}_{\mathrm{wake,eff}}^{(\eta)}\right\|
+
\varepsilon
},
$$
and
$$
\epsilon_J^{(\eta)}(W)
=
\frac{
\left\|
\Delta_W\left(\mathbf{J}_{\mathrm{mech}}+\mathbf{J}_{\mathrm{wake,eff}}^{(\eta)}\right)
-
\int_W\sum_i\mathbf{x}_i(t)\times\mathbf{R}_i^{(\eta)}\,dt
-
\int_W\boldsymbol{\mathcal{B}}_J^{(\eta)}\,dt
\right\|
}{
\left\|\Delta_W\mathbf{J}_{\mathrm{mech}}\right\|
+
\left\|\Delta_W\mathbf{J}_{\mathrm{wake,eff}}^{(\eta)}\right\|
+
\varepsilon
}.
$$
Small $\epsilon_E^{(\eta)}$, $\epsilon_P^{(\eta)}$, and $\epsilon_J^{(\eta)}$ are conservation diagnostics when the regularization is inserted at the equation-of-motion level. They become Noether-charge tests only when the action regularization itself preserves time translation, spatial translation, and rotation symmetry on the retained chart.

### Coarse-Graining: The Effective Continuum Lagrangian

The continuum Lagrangian belongs to the effective level. To describe emergent behavior of the Noether Sea and complex assemblies, the description passes from discrete trajectories to continuum densities. Define a coarse-grained architrino polarity density $\rho_q(\mathbf{x}, t)$ and current density $\mathbf{j}_q(\mathbf{x}, t)$, smoothed over a scale much larger than the nested shell swarm scale but smaller than macroscopic gradients. This notation is deliberately distinct from Noether swarm density variables such as $\rho_{\text{NS}}$ and $n$.

At the level of a branch-collapsed delayed causal action, the exact multi-time interaction double sum suggests the continuum delayed functional

$$
S_{\text{int}}^{\text{cg}} = - \frac{\kappa}{2c_f} \int dt \int d^3x \int d^3x' \,
\frac{\rho_q(\mathbf{x}, t) \rho_q(\mathbf{x}', t - \|\mathbf{x}-\mathbf{x}'\|/c_f)}
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
\frac{\mathbf{j}_q(\mathbf{x}',t')}{\rho_q(\mathbf{x}',t')}
\qquad (\rho_q\neq 0),
$$
and effective Jacobian
$$
J_{\mathrm{eff}}(\mathbf{x},t;\mathbf{x}',t')
=
\left|1-\frac{\mathbf{u}(\mathbf{x}',t')\cdot\hat{\mathbf{n}}(\mathbf{x},\mathbf{x}')}{c_f}\right|.
$$
This functional is the continuum inheritance of the discrete delayed causal $1/r$ action kernel together with the same Jacobian branch weight that appears in the Master EOM. Source emission remains isotropic at the microscopic level, but the received coarse flux is compressed or dilated by delayed transport geometry. Differentiating this delayed action with respect to receiver coordinates produces the corresponding Jacobian-weighted inverse-square force density plus velocity-dependent correction terms. In the quasi-static limit $\|\mathbf{u}\|/c_f\to0$, one recovers $J_{\mathrm{eff}}\to 1$ and the leading force law reduces to the familiar inverse-square form.

The continuum variables are admitted only through balance laws inherited from resolved histories. A coarse polarity density and current must satisfy
$$
\partial_t\rho_q+\nabla\cdot\mathbf{j}_q
=
R_{\rho}^{\mathrm{cg}},
$$
and the first two kinetic moments must close through a declared momentum-current tensor and energy-flux vector,
$$
\partial_t(\rho_q u^i)
+\partial_j\Pi_q^{ij}
=
f_q^i+R_{P,q}^i,
$$
$$
\partial_t e_q
+\nabla\cdot\mathbf{J}_{e,q}
=
\mathbf{f}_q\cdot\mathbf{u}
+R_{E,q}.
$$
Here $\Pi_q^{ij}$ and $\mathbf{J}_{e,q}$ are coarse-history summaries of the retained causal-wake record, not new substrate fields. The effective action is a promoted continuum chart only when $R_{\rho}^{\mathrm{cg}}$, $R_{P,q}^i$, and $R_{E,q}$ are small under history, spatial, and regulator refinement. Otherwise the chart has reproduced only low-order moments while leaving unresolved memory in the omitted kinetic hierarchy.

For near-equilibrium reductions, a constitutive response may be written schematically as
$$
\Pi_q^{ij}
=
\Pi_{\mathrm{rev}}^{ij}
-
2\eta_{\mathrm{cg}}
\left(
E^{ij}-\frac{1}{3}(\nabla\cdot\mathbf{u})h^{ij}
\right)
-
\zeta_{\mathrm{cg}}(\nabla\cdot\mathbf{u})h^{ij}
+\Pi_{\mathrm{mem}}^{ij},
$$
where $E^{ij}=\frac{1}{2}(\partial^iu^j+\partial^ju^i)$. This is a comparison form borrowed from continuum mechanics and kinetic theory. In $\mathbb{A}\mathbb{A}\mathbb{A}$ it becomes native only after $\eta_{\mathrm{cg}}$, $\zeta_{\mathrm{cg}}$, and $\Pi_{\mathrm{mem}}^{ij}$ are derived from the same delayed branch record that supplies the force law. The corresponding dissipation residual is
$$
\mathcal R_{\mathrm{diss}}(W)
=
\frac{
\left|
\Delta_W K_{\mathrm{cg}}
+\int_W
2\eta_{\mathrm{cg}}E_{ij}E^{ij}
+\zeta_{\mathrm{cg}}(\nabla\cdot\mathbf{u})^2\,dt\,dV
+\Delta_W E_{\mathrm{wake}}
\right|
}{
|\Delta_W K_{\mathrm{cg}}|
+\int_W
\left(
2\eta_{\mathrm{cg}}E_{ij}E^{ij}
+\zeta_{\mathrm{cg}}(\nabla\cdot\mathbf{u})^2
\right)dt\,dV
+|\Delta_W E_{\mathrm{wake}}|
+\varepsilon
}.
$$
This residual prevents ordinary viscous loss language from replacing the exact wake-history energy ledger. A nonzero positive quadratic term is allowed as a coarse channel for coherent-to-incoherent transfer, but the transferred content must appear in the retained wake, heat, or medium-response record.

By defining an effective scalar potential $\Phi_{\text{wake}}(\mathbf{x}, t)$ and a vector transport potential $\mathbf{A}_{\text{wake}}(\mathbf{x}, t)$ that track the integrated causal wakes of the continuous medium, the system maps locally onto an effective field theory. These potentials are bookkeeping variables for delayed transport, not additional ontological primitives. The resulting local Lagrangian density $\mathcal{L}_{\text{eff}}$ therefore belongs to a further closure step beyond the exact delayed causal action.

### Effective Hamiltonian Domain Gate

A local Hamiltonian or local Lagrangian description is admissible only after the path-history law has been reduced to a finite set of coarse variables that preserve the relevant state-counting measure over the comparison window. This is an inference condition: it tests whether exact histories can be represented by local canonical coordinates without losing the invariants under comparison. Let $\mathcal{Q}$ be the coarse-graining from exact histories $\Gamma(t)$ to effective coordinates $z=(\rho_q,\mathbf{j}_q,\ldots)$, and let $\mathcal{P}_{\Delta t}^{\mathrm{eff}}$ be the induced effective flow. The local canonical approximation must supply a measure $\mu_{\mathcal{Q}}$ such that
$$
(\mathcal{P}_{\Delta t}^{\mathrm{eff}})_*\mu_{\mathcal{Q}}
=
\mu_{\mathcal{Q}}
+O(\epsilon_{\mathcal{Q}})
$$
on the retained regime. This measure condition is necessary but not sufficient for canonical mechanics. The same handoff must also control a bracket or symplectic residual, for example
$$
\left\|
(\mathcal{P}_{\Delta t}^{\mathrm{eff}})^*\omega_{\mathcal{Q}}
-
\omega_{\mathcal{Q}}
\right\|
\le
\epsilon_{\omega},
$$
for the retained two-form $\omega_{\mathcal{Q}}$, or an equivalent Poisson-bracket residual on the admitted observables. If $\epsilon_{\mathcal{Q}}$ or $\epsilon_{\omega}$ is not controlled, the local Hamiltonian is only a fitting chart, not a derived mechanics.

This gate keeps the exact and effective levels separate. The Master Equation owns the delayed causal dynamics; the effective Hamiltonian owns only those regimes where internal wake memory, branch changes, and unresolved Noether-Sea exchange have been compressed without losing the observer-level invariants being compared.

The same domain restriction applies before translating an effective Hamiltonian chart into quantum operators. The admissible observable set in [Quantum Operator Mapping](../philosophy-history/theory-bridges/quantum-operator-mapping.md#admissible-quantization-domain-guardrail) must be derived from this retained coarse-graining and record window, not chosen afterward as a free quantization convention.

### Topological Constraints and Assembly Stability

The delayed action, after branch reduction to causal-locus and root-ledger data, constrains the allowed topological configurations of architrino assemblies in the Noether Sea. Stable assemblies, such as nested maximal-curvature candidates inside nested shell swarms, should therefore be treated as theorem targets for localized, phase-locked causal-locus classes rather than as already-proved vortices or continuum topological defects.

The stability of these assemblies must be checked by the nonlinear self-hit feedback embedded in the interaction functional. When internal circulation velocities exceed $c_f$, the non-Markovian repulsion supplies a candidate branch-trapping mechanism; it becomes a robust geometric attractor only after a branch chart, Lyapunov or Floquet diagnostic, and history-aware energy bound are supplied. Likewise, mass-gap language is a closure target tied to discrete admissible branch classes, not an automatic consequence of writing the effective action.

### Closure Interface: Action-to-Envelope Reduction

This chapter supplies the variational bridge used by the quantum closure chain. The bridge remains effective and comparative: it tests when a signed polarity/current history can be compressed into a nonnegative envelope without erasing memory terms.

From the regularized nonlocal action, the first step is to derive a continuum effective action in terms of coarse variables $(\rho_q,\mathbf{j}_q)$. The second step tests a phase-amplitude closure ansatz for the retained nonnegative envelope channel:
$$
\rho_{\mathrm{env}}=|\psi|^2,\qquad
\mathbf{j}_{\mathrm{env}}=\frac{\hbar_{\mathrm{eff}}}{m_{\mathrm{eff}}}\Im(\psi^*\nabla\psi).
$$
Here $m_{\mathrm{eff}}$ is the retained envelope mass parameter of the benchmark chart, not a primitive architrino mass. The projection from the signed polarity/current data $(\rho_q,\mathbf{j}_q)$ to the nonnegative envelope channel must be declared before $\rho_{\mathrm{env}}$ is interpreted as $|\psi|^2$.

The handoff must report the continuity residual
$$
R_{\mathrm{cg}}=\partial_t\rho_{\mathrm{env}}+\nabla\cdot\mathbf{j}_{\mathrm{env}},
\qquad
\epsilon_{\mathrm{cg}}=
\frac{\|R_{\mathrm{cg}}\|}
{\|\partial_t\rho_{\mathrm{env}}\|+\|\nabla\cdot\mathbf{j}_{\mathrm{env}}\|+\varepsilon},
$$
and keep the memory current
$$
\mathbf{j}_{\mathrm{mem}}
=
\mathbf{j}_q-\mathbf{j}_{\mathrm{env}}
$$
as an explicit residual rather than absorbing it into fitted constants. Equivalently, with $\Delta\rho=\rho_q-\rho_{\mathrm{env}}$,
$$
\partial_t\rho_q+\nabla\cdot\mathbf{j}_q
=
R_{\mathrm{cg}}
+
\partial_t\Delta\rho
+
\nabla\cdot\mathbf{j}_{\mathrm{mem}}.
$$
Thus a small $R_{\mathrm{cg}}$ by itself does not prove envelope closure; the projection mismatch and memory-current divergence must be controlled as well.

For the non-relativistic, fixed-particle-number benchmark, the same envelope must also admit a phase chart
$$
\psi=\sqrt{\rho_{\mathrm{env}}}\,e^{iS_{\mathrm{env}}/\hbar_{\mathrm{eff}}},
\qquad
\mathbf{j}_{\mathrm{env}}=\frac{\rho_{\mathrm{env}}}{m_{\mathrm{eff}}}\nabla S_{\mathrm{env}}.
$$
Define
$$
K_{\mathrm{env}}=\frac{\|\nabla S_{\mathrm{env}}\|^2}{2m_{\mathrm{eff}}},
\qquad
Q_{\mathrm{env}}
=
-\frac{\hbar_{\mathrm{eff}}^2}{2m_{\mathrm{eff}}}
\frac{\nabla^2\sqrt{\rho_{\mathrm{env}}}}{\sqrt{\rho_{\mathrm{env}}}},
$$
and test the corresponding Hamilton-Jacobi residual
$$
R_{\mathrm{HJ}}
=
\partial_t S_{\mathrm{env}}
+K_{\mathrm{env}}
+V_{\mathrm{eff}}
+Q_{\mathrm{env}}.
$$
The effective Schrödinger/Madelung chart is licensed on a retained window only when
$$
\mathcal{R}_{\mathrm{env}}
=
\max\!\left(
\epsilon_{\mathrm{cg}},
\frac{\|R_{\mathrm{HJ}}\|}
{\|\partial_t S_{\mathrm{env}}\|+\|K_{\mathrm{env}}\|+\|V_{\mathrm{eff}}\|+\|Q_{\mathrm{env}}\|+\varepsilon},
\frac{\|\mathbf{j}_{\mathrm{mem}}\|}{\|\mathbf{j}_q\|+\varepsilon}
\right)
\le\epsilon_{\mathrm{env}}.
$$
This is a comparison residual, not a new ontology. If it fails, the wave function and Hamiltonian remain useful fitting charts for that window rather than promoted quantum closure.

The interface is closed only when:
- the Euler-Lagrange equations of the coarse action reproduce the effective envelope equation used in [pilot-wave-character](../philosophy-history/theory-bridges/pilot-wave-character.md);
- the phase-amplitude chart reports $\mathcal{R}_{\mathrm{env}}$ rather than assuming the Schrödinger limit;
- memory contributions $\mathbf{j}_{\mathrm{mem}}$ remain explicit as controlled correction terms rather than hidden parameter absorbs.
