# Effective Lagrangian

This chapter formalizes the conditional variational scaffold used by $\mathbb{A}\mathbb{A}\mathbb{A}$. Its purpose is to connect the exact, path-history-dependent microdynamics of discrete architrinos to coarse-grained effective descriptions of macroscopic assembly behavior in the Noether sea.

The bridge is deliberately conditional. The Master EOM remains the primary dynamics at the substrate level; an action or Lagrangian chart becomes theorem-grade only after its variation, boundary, and conservation residuals close on the retained branch chart. Until then, the effective Lagrangian is a disciplined inference device rather than an independent ontology.

### Ordinary Lagrangian Orientation

In ordinary local mechanics, one chooses generalized coordinates $q^a(t)$ and writes a Lagrangian $L(q,\dot q,t)$, often in the simple form
$$
L = T - V
$$
where $T$ is kinetic energy and $V$ is potential energy. The corresponding action is
$$
S[q]=\int_{t_a}^{t_b}L(q,\dot q,t)\,dt
$$
and fixed-endpoint stationarity,
$$
\delta S=0
$$
gives the Euler-Lagrange equation
$$
\frac{d}{dt}\frac{\partial L}{\partial \dot q^a}
-
\frac{\partial L}{\partial q^a}
=0
$$
for each coordinate $q^a$. This equation is not a separate force postulate. It is the recovery condition that the chosen scalar $L$ must satisfy if the action is to generate the equations of motion.

Operationally, stationarity is tested by nearby trial paths
$q_\epsilon^a(t)=q^a(t)+\epsilon\xi^a(t)$ with
$\xi^a(t_a)=\xi^a(t_b)=0$. Because $\xi^a$ is otherwise arbitrary,
setting the first variation of $S$ to zero forces the Euler-Lagrange expression
itself to vanish. The action is therefore a history functional with units of
energy times time, not an instruction to minimize instantaneous energy.

A minimal recovery check is the one-dimensional harmonic oscillator. For a mass $m$ attached to an ideal spring of stiffness $k$ with displacement $x(t)$,
$$
L(x,\dot{x})
=
\frac{1}{2}m\dot{x}^2-\frac{1}{2}kx^2
$$
so the Euler-Lagrange equation gives
$$
\frac{d}{dt}(m\dot{x})-(-kx)=0
$$
or equivalently
$$
m\ddot{x}=-kx
$$
which is the same equation obtained from Newton's law and Hooke's law. The value of the example is not that Lagrangian mechanics replaces the tested motion, but that it recovers the same equation from an energy scalar and generalizes cleanly to many coordinates.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ correction to this toy example is more informative than the recovery itself. A real assembly-level spring is a delayed restoring channel, so the first effective model is not exactly $m\ddot x=-kx$ but

$$
m\ddot x(t)
=
-k\,x(t-\tau_{\mathrm{eff}})
+\cdots
$$

for an effective causal-wake delay $\tau_{\mathrm{eff}}$ across the assembly. Expanding the delayed displacement gives

$$
\left(
m+\frac{1}{2}k\tau_{\mathrm{eff}}^2
\right)
\ddot x
-
k\tau_{\mathrm{eff}}\dot x
+
kx
=
O(k\tau_{\mathrm{eff}}^3 x^{(3)})
$$

on a slowly varying branch. The leading correction is therefore sign-definite once the branch delay orientation is fixed. For the causal restoring convention displayed above it is anti-damping, the same local pattern that appears as positive tangential work in the circular binary. The mass-like coefficient is also shifted by the delayed response. This does not prove the full assembly mass map, but it shows in the simplest chart why inertia and dissipation-like terms are delayed-response quantities rather than primitive architrino constants.

Historically, the route into this form matters. Newtonian force balance can be projected along fixed-endpoint variations as virtual work. For conservative interactions, $\mathbf{F}=-\nabla V$ turns the work term into a variation of potential energy, while the inertial term supplies a variation of kinetic energy plus an endpoint term. When the endpoint variation vanishes, Hamilton's construction turns that differential relation into the stationary action of $T-V$. The useful condition is therefore stationarity of the action, not a literal minimum in every case.

The same idea survives in $\mathbb{A}\mathbb{A}\mathbb{A}$ only after changing the object being varied. The Master EOM is not local in the instantaneous variables $(\mathbf{x}_i(t),\dot{\mathbf{x}}_i(t))$: receiver acceleration depends on delayed source coordinates, causal-root branches, Jacobian weights, and the retained causal-wake history. A local expression $L(\mathbf{x},\dot{\mathbf{x}},t)$ therefore cannot be the substrate-level action for the exact law. The appropriate candidate is a multi-time path-history functional whose variation must reproduce the delayed, Jacobian-weighted branch law.

The operational bridge is:

1. ordinary mechanics uses $L(q,\dot q,t)$ and tests $\delta S=0$;
2. $\mathbb{A}\mathbb{A}\mathbb{A}$ uses a regularized delayed action $S_\eta[\{\mathbf{x}_i\}]$ over path history;
3. the action is promoted only if its variation yields the Master EOM on the retained branch chart;
4. failure is measured by the variation residual $\mathbf{R}_i^{(\eta)}(t)$ and the window diagnostic $\epsilon_{\mathrm{var}}^{(\eta)}(W)$ defined below.

Thus the Lagrangian question in $\mathbb{A}\mathbb{A}\mathbb{A}$ is not whether one can write a familiar-looking $T-V$ expression. The question is whether a delayed action with the same causal-root, Jacobian, boundary, and wake-history conventions as the Master EOM has a stationary variation whose residual closes. Only then do Noether-style energy, momentum, and angular-momentum statements become theorem-grade rather than diagnostic.

### Ordinary Hamiltonian Orientation

Hamiltonian mechanics repackages the same local dynamics into coordinates and canonical momenta. Starting from a local Lagrangian $L(q,\dot q,t)$, define the canonical momentum
$$
p_a\equiv\frac{\partial L}{\partial \dot q^a}
$$
and, when the velocity-momentum map can be inverted, define the Hamiltonian by the Legendre transform
$$
H(q,p,t)=p_a\dot q^a-L(q,\dot q,t)
$$
with the velocities rewritten in terms of $(q,p,t)$. Hamilton's equations are
$$
\dot q^a=\frac{\partial H}{\partial p_a},
\qquad
\dot p_a=-\frac{\partial H}{\partial q^a}
$$
so one second-order equation in $q^a$ becomes a first-order flow on phase space $(q^a,p_a)$. In simple time-independent mechanical systems $H$ is often the total energy $T+V$, but the defining statement is the Legendre transform and the canonical flow, not the energy slogan by itself.

The same equations can also be read from the phase-space action
$$
S_H[q,p]=\int_{t_a}^{t_b}\left(p_a\dot q^a-H(q,p,t)\right)dt
$$
when variations in both $q^a$ and $p_a$ are admitted and endpoint variations of
$q^a$ vanish. Variation with respect to $p_a$ gives
$\dot q^a=\partial H/\partial p_a$, while variation with respect to $q^a$ gives
$\dot p_a=-\partial H/\partial q^a$. This is the action-level form of the
canonical flow, and it is the part that matters when asking whether a reduced
$\mathbb{A}\mathbb{A}\mathbb{A}$ chart is genuinely Hamiltonian rather than only
an energy-like fit.

The conjugate momenta are more than bookkeeping in ordinary mechanics. When a coordinate is cyclic, the corresponding conjugate momentum is conserved; the same coordinate-momentum pairing later becomes the classical object used in Bohr-Sommerfeld action integrals and in canonical commutation rules. In $\mathbb{A}\mathbb{A}\mathbb{A}$ these are recovery targets for a reduced effective chart, not permission to quantize the substrate variables directly.

This matters for $\mathbb{A}\mathbb{A}\mathbb{A}$ because the exact Master EOM is a delayed path-history law, not an ordinary finite-dimensional phase-space law. The instantaneous pair $(\mathbf{x}_i(t),\mathbf{p}_i(t))$ does not contain all active causal-root, boundary, and wake-history data. A Hamiltonian chart is therefore an effective reduction: it is admissible only when a coarse-graining compresses the retained path history into coordinates and momenta while preserving the comparison invariants. The test is not merely that an expression called $H_{\text{eff}}$ can be written, but that the induced return map preserves the relevant measure, symplectic form, or Poisson-bracket structure to the declared tolerance.

For $\mathbb{A}\mathbb{A}\mathbb{A}$, the strongest phase-space use case is
therefore not an arbitrary instantaneous snapshot. It is a replayable or
phase-locked branch chart: a reduced description in which the retained internal
motion returns to a comparable section despite bounded surrounding influences.
If a retained assembly is modeled by coarse coordinates $Q^A$ and by
phase-bearing sub-assemblies indexed by
$\alpha=1,\ldots,N_{\mathrm{ph}}$, the candidate chart has the form
$$
z_{\mathfrak B}=(Q^A,\Pi_A,\theta^\alpha,I_\alpha)
$$
where $\theta^\alpha$ records the sub-assembly phase and $I_\alpha$ is the
conjugate action variable for that phase. Each retained phase-locked
sub-assembly adds its own phase-action pair. Surrounding influences are
admissible only when they are represented as fixed branch data, slow parameters,
or additional coordinates over the comparison window; otherwise the chart is a
driven open system rather than a closed Hamiltonian phase space.

The action variables are local objects unless the phase torus is globally unobstructed. For a three-layer nested shell braid chart, the phase circles of the outer, middle, and inner binaries need not form a trivial $T^3$ bundle over the retained branch family. A cycle that exchanges two orbital planes can carry an integer phase-bundle winding

$$
c_1[\theta^O,\theta^M,\theta^I]
=
\frac{1}{2\pi}
\oint_{\gamma}
d(\text{relative phase})
\in\mathbb{Z}
$$

when the relative phase closes on the branch. This is the topological content of integer resonance lock: the lock ratios $(m,n)$ in [Dyadic Resonance Lock](dyadic-resonance-lock.md) make the phase-bundle data integral rather than irrationally drifting. The effective Hamiltonian chart is therefore globally promotable only on resonance-locked branches where the returned phase torus and causal-root ledger close together. Off-lock, the same $I_\alpha$ may exist on a local patch but acquires monodromy under return, so quantization and measure preservation become local fitting statements rather than global chart facts.

### Regularized Nonlocal Action and Variation

The Master Equation of Motion for architrinos is non-Markovian, driven by intersections between receiver trajectories and past causal wake surfaces. Consequently, any action-level scaffold for this law cannot be a local integral over instantaneous states. It must be a multi-time functional over path history, and its variation residual must be identified before the scaffold is treated as an exact action derivation. A scale-only derivation requires that residual to vanish or become a boundary term; a recoil-inclusive derivation may instead retain it as a mechanical wake-emission resistance term.

For a finite, isolated set of architrinos parameterized by absolute time $t$ in the Euclidean void, use the $\eta>0$ regularized delayed action below. The exact causal wake kernel is recovered in the weak branch limit as $\eta\to0^+$. The admissible interaction sum excludes trivial self-coincidence: $i\ne j$ terms are retained, and $i=j$ terms are retained only on nontrivial self-hit branches with $t-t_0\ge\tau_{\min}>0$ or with an explicitly declared core regularization.

The $\eta\to0^+$ statement is a weak or distributional scaling claim over declared observables unless a stronger topology is explicitly supplied. A finite-regulator trend supports this action scaffold only after the observable map, normalization, admissible test functions, and uniform control needed for the limit are stated. It is not by itself a proof of the exact causal-wake action.

$$
S_\eta[\{\mathbf{x}_i\}]
=
\int dt \sum_i \frac{1}{2} \mu_{\text{arch}} \|\dot{\mathbf{x}}_i(t)\|^2
- \frac{1}{2}\sum_{i,j}^{\mathrm{adm}}\frac{\kappa \, \sigma_{ij} |q_i q_j|}{c_f}
\int dt \int_{-\infty}^{t} dt_0\,
\frac{\phi_\eta\!\big(g_{ij}(t,t_0)\big)}{r_{ij}(t;t_0)}
$$
$$
g_{ij}(t,t_0)\equiv t-t_0-\frac{r_{ij}(t;t_0)}{c_f},
\qquad
r_{ij}(t;t_0)=\|\mathbf{x}_i(t)-\mathbf{x}_j(t_0)\|,
\qquad
\phi_\eta\equiv\delta_\eta
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
-\sum_i\int_{t_a}^{t_b} \mu_{\text{arch}}\ddot{\mathbf{x}}_i\cdot\boldsymbol{\xi}_i\,dt
$$

For the interaction kernel
$$
\mathcal{K}_{ij}(t,t_0)\equiv \frac{\phi_\eta(g_{ij}(t,t_0))}{r_{ij}(t;t_0)},
\qquad
\hat{\mathbf{r}}_{ij}\equiv\frac{\mathbf{x}_i(t)-\mathbf{x}_j(t_0)}{r_{ij}(t;t_0)}
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
\right]
$$

This receiver-side gradient is one ingredient in the full first variation, but it is not the complete Euler-Lagrange expression. In the double-time action, each varied worldline appears both as a receiver coordinate $\mathbf{x}_i(t)$ and as a source coordinate inside transposed kernels. The full branch-resolved variation is carried out in [master-equation](./master-equation.md#exact-nonlocal-lagrangian). The term proportional to $\phi_\eta'(g_{ij})$ is not an algebraic nuisance to discard: on a purely delayed branch it is the local signature of wake-emission recoil. If a chart proves that this term is boundary-only, the scale term below gives the scale-only Master EOM; if not, the same variation points to a recoil-inclusive force law.

On charts where the constraint-variation residual is boundary-only, or is cancelled by an explicitly declared regularized action-level term, the scale-only result is the delayed force law
$$
\mu_{\text{arch}}\ddot{\mathbf{x}}_i(t)
=
\sum_j \kappa \, \sigma_{ij}|q_i q_j|
\sum_{t_0\in\mathcal{C}_{ij}(t)}
\frac{\hat{\mathbf{r}}_{ij}(t;t_0)}
{r_{ij}(t;t_0)^2\,\left|1-\hat{\mathbf{r}}_{ij}(t;t_0)\cdot\mathbf{v}_j(t_0)/c_f\right|}
$$
including self-hit branches $j=i$ when the trivial coincidence root is excluded.

The branch collapse used here is an $\eta\to0^+$ simple-root statement, not an identity at arbitrary finite $\eta$. Since
$$
\partial_{t_0}g_{ij}(t,t_0)
=
-\left(1-\frac{\hat{\mathbf{r}}_{ij}(t;t_0)\cdot\mathbf{v}_j(t_0)}{c_f}\right)
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
\phi_\eta\!\big(g_{ij}(t,t_0)\big)
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
\right)
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
}
$$
The scale-only branch law is theorem-grade on $W$ only when this residual tends to zero with the declared branch floors and boundary convention. The broader action-derived dynamics may instead be theorem-grade with nonzero $\mathbf{C}_{ij}^{(\eta)}$ if that term is retained as mechanical recoil and the same action closes the energy, momentum, and angular-momentum ledgers. If neither condition is reported, the local effective Lagrangian remains a fitted chart.

The current status is therefore a conditional theorem schema, not a universal action theorem. The pure scalar $1/r$ action is not a universal exact action for the scale-only Master EOM; it is valid as that derivation only on residual-closed charts. On charts where the interior residual survives, $\mathbf{C}_{ij}^{(\eta)}$ is the strict mechanical recoil (wake-emission resistance) required by a purely delayed action. It is the same bookkeeping channel that balances the positive tangential drive and wake escapement described in [Binary Dynamics](binary-dynamics.md#tangential-drive-and-wake-escapement) and [Energy](energy.md#wake-escapement).

The recoil-inclusive reading also supplies the native seed of effective gauge structure. The scale term is a spatial gradient of the causal scale kernel and coarse-grains into an effective scalar wake potential. The derivative-of-constraint term is different: it differentiates the causal phase function $g_{ij}$ itself. On an effective product chart with coordinates $(t,\mathbf{x})$, write the recoil current schematically as

$$
\mathcal{A}_{\mu}^{\mathrm{wake}}(\mathbf{x},t)
\propto
\left\langle
\phi_{\eta}'(g_{ij})\,\partial_{\mu}g_{ij}
\right\rangle_{\mathrm{cg}}
$$

where $\mu$ indexes the absolute-time component and the three spatial components of the effective chart; this is not a substrate Lorentz four-vector. The point is structural: the scalar/vector split $(\Phi_{\mathrm{wake}},\mathbf{A}_{\mathrm{wake}})$ introduced in the continuum reduction is forced by the scale/recoil split of the first variation. The scale term is the scalar-potential channel, while the retained recoil current is the vector-transport channel.

Thus a chart that keeps $\mathbf{C}_{ij}^{(\eta)}$ should not treat it as noise to be hidden in a residual. It should compute the effective field-strength candidate

$$
F_{\mu\nu}^{\mathrm{wake}}
=
\partial_{\mu}\mathcal{A}_{\nu}^{\mathrm{wake}}
-
\partial_{\nu}\mathcal{A}_{\mu}^{\mathrm{wake}}
$$

as the curl of the coarse recoil current and test whether its spatial and temporal components reproduce the effective electric-like and magnetic-like response. The no-go against same-support scalar cancellation then has a positive corollary: on a recoil-inclusive action branch, magnetic-like response is not an optional extra law. It is the effective expression of the non-cancellable derivative-of-causal-phase channel. If a scale-only repair cancels this channel by a characteristic-tail kernel or richer invariant counterterm, that repair must also explain where the corresponding vector-potential response has gone.

The same-support local scalar route and its finite delta-jet extension are ruled out under the restricted assumptions in [master-equation](./master-equation.md#exact-nonlocal-lagrangian): cancelling the derivative residual forces the counterterm to change the accepted inverse-square scale term. The remaining minimal scale-only repair is the delayed-interior characteristic-tail kernel stated there. With
$$
u=g+\frac{r}{c_f}
$$
the endpoint-clear candidate is
$$
K_{\mathrm{eff}}^{(\eta)}(r,g)
=
\int_{-\infty}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds
$$
or the finite-endpoint variant with lower limit $-h_{+}$ after the characteristic gauge has cancelled the endpoint-clearance term. It satisfies
$$
\left(
\partial_r-\frac{1}{c_f}\partial_g
\right)
K_{\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(g)}{r^2}
$$
so it cancels the derivative-of-constraint residual without changing the accepted inverse-square scale term. Effective Lagrangian reductions should still inherit the Master EOM directly unless they explicitly choose the normalized characteristic-tail kernel and carry its boundary-increment convention on the retained chart.

The normalized characteristic-tail kernel now carries explicit energy, momentum, and angular-momentum wake-history increments in [master-equation](./master-equation.md#exact-nonlocal-lagrangian). An effective Lagrangian reduction may therefore choose that kernel only when it also carries the same boundary-increment convention and reports the corresponding variation and conservation residuals on its branch chart. Without those residuals, the reduced Lagrangian remains a scaffold for the Master EOM rather than an independent proof of the branch force.

### Symmetries and History-Aware Conservation Laws

The regularized action $S_\eta$ is invariant under the fundamental symmetry group of the substrate when the mollifier, history window, and self-branch cutoff preserve those symmetries: the Euclidean group $E(3)$ and absolute time translations $\mathbb{R}_{\text{time}}$; the exact statement is recovered in the $\eta\to0^+$ limit. If the regularization is inserted only at the equation-of-motion level or uses a non-invariant window, the associated energy, momentum, and angular-momentum expressions become diagnostics rather than proved Noether charges.

Because the Lagrangian is nonlocal in time, the corresponding Noether charges are path-history functionals tracking interactions that are still carried by causal wakes between emission and reception.

**Energy Functional:**
Invariance under absolute time translation yields a conserved total energy only for the symmetry-preserving action-derived model:
$$
E_{\text{tot}}(t)=K(t)+E_{\text{wake}}(t)
$$
where the action-level nonlocal Noether charge can be written with the weighted causal kernel from [master-equation](./master-equation.md#action-level-wake-energy-functional-at-time-boundary-t). To avoid confusing the receiver-gradient kernel above with the Noether-energy kernel, write
$$
\mathcal{K}_{ij}^{E}(t_1,t_0)
=
\frac{\kappa\,\sigma_{ij}\,|q_iq_j|}{c_f}
\Theta(t_1-t_0)
\frac{\delta\!\big(g_{ij}(t_1,t_0)\big)}
{r_{ij}(t_1,t_0)}
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
\right)
$$
The scalar $1/r$ expression remains the diagnostic scaffold only when this replacement has not been declared for the chart.
Then:

$$
E_{\text{wake}}(t)
=
\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{t} dt_0
\int_{t}^{\infty} dt_1\,
\partial_{t_1}\mathcal{K}_{ij}^{E}(t_1,t_0)
$$

For compatible trajectory reconstruction one may use the work-integral form
$$
U(t)=U_\ast-\int_{t_\ast}^{t}\sum_i \mu_{\text{arch}}\,\mathbf{a}_i(t')\cdot\mathbf{v}_i(t')\,dt'
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
}
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
}
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
}
$$
Small $\epsilon_E^{(\eta)}$, $\epsilon_P^{(\eta)}$, and $\epsilon_J^{(\eta)}$ are conservation diagnostics when the regularization is inserted at the equation-of-motion level. They become Noether-charge tests only when the action regularization itself preserves time translation, spatial translation, and rotation symmetry on the retained chart.

### Coarse-Graining: The Effective Continuum Lagrangian

The continuum Lagrangian belongs to the effective level. To describe emergent behavior of the Noether sea and complex assemblies, the description passes from discrete trajectories to continuum densities. Define a coarse-grained architrino polarity density $\rho_q(\mathbf{x}, t)$ and current density $\mathbf{j}_q(\mathbf{x}, t)$, smoothed over a scale much larger than the nested shell braid scale but smaller than macroscopic gradients. This notation is deliberately distinct from Noether braid density variables such as $\rho_{\text{NS}}$ and $n$.

At the level of a branch-collapsed delayed causal action, the exact multi-time interaction double sum suggests the continuum delayed functional

$$
S_{\text{int}}^{\text{cg}} = - \frac{\kappa}{2c_f} \int dt \int d^3x \int d^3x' \,
\frac{\rho_q(\mathbf{x}, t) \rho_q(\mathbf{x}', t - \|\mathbf{x}-\mathbf{x}'\|/c_f)}
{\|\mathbf{x}-\mathbf{x}'\|\,J_{\mathrm{eff}}(\mathbf{x},t;\mathbf{x}',t')}
$$
with delayed source time
$$
t' = t - \frac{\|\mathbf{x}-\mathbf{x}'\|}{c_f}
$$
propagation direction
$$
\hat{\mathbf{n}}(\mathbf{x},\mathbf{x}')=
\frac{\mathbf{x}-\mathbf{x}'}{\|\mathbf{x}-\mathbf{x}'\|}
$$
coarse transport velocity
$$
\mathbf{u}(\mathbf{x}',t')
=
\frac{\mathbf{j}_q(\mathbf{x}',t')}{\rho_q(\mathbf{x}',t')}
\qquad (\rho_q\neq 0)
$$
and effective Jacobian
$$
J_{\mathrm{eff}}(\mathbf{x},t;\mathbf{x}',t')
=
\left|1-\frac{\mathbf{u}(\mathbf{x}',t')\cdot\hat{\mathbf{n}}(\mathbf{x},\mathbf{x}')}{c_f}\right|
$$
This functional is the continuum inheritance of the discrete delayed causal $1/r$ action kernel together with the same Jacobian branch weight that appears in the Master EOM. Source emission remains isotropic at the microscopic level, but the received coarse flux is compressed or dilated by delayed transport geometry. Differentiating this delayed action with respect to receiver coordinates produces the corresponding Jacobian-weighted inverse-square force density plus velocity-dependent correction terms. In the quasi-static limit $\|\mathbf{u}\|/c_f\to0$, one recovers $J_{\mathrm{eff}}\to 1$ and the leading force law reduces to the familiar inverse-square form.

The $J_{\mathrm{eff}}$ denominator is also the continuum location of the per-hit third-law defect. It is evaluated using the delayed source velocity $\mathbf{u}(\mathbf{x}',t')$, so the receiver/source exchange is not represented by a symmetric mechanical stress alone. Translation invariance still protects total momentum when the wake momentum is included, but the mechanical current must split as

$$
\Pi_q^{ij}
=
\Pi_{q,\mathrm{sym}}^{ij}
+
\Pi_{q,J}^{ij},
\qquad
\Pi_{q,J}^{[ij]}
\equiv
\frac{1}{2}
\left(
\Pi_{q,J}^{ij}
-
\Pi_{q,J}^{ji}
\right)
$$

where $\Pi_{q,J}^{[ij]}$ is generated by the source-only velocity dependence of the Jacobian factor. The antisymmetric part is not a new force; it is the continuum expression of wake momentum that the particle-only mechanical ledger has omitted. This identifies three equivalent diagnostics of the same effective channel: the discrete recoil term $\mathbf{C}_{ij}^{(\eta)}$, the vector transport potential $\mathbf{A}_{\mathrm{wake}}$, and the antisymmetric stress contribution $\Pi_{q,J}^{[ij]}$. A continuum simulation can therefore test magnetic-like emergence by measuring whether these three reconstructions agree on the same branch window.

The continuum variables are admitted only through balance laws inherited from resolved histories. A coarse polarity density and current must satisfy
$$
\partial_t\rho_q+\nabla\cdot\mathbf{j}_q
=
R_{\rho}^{\mathrm{cg}}
$$
and the first two kinetic moments must close through a declared momentum-current tensor and energy-flux vector,
$$
\partial_t(\rho_q u^i)
+\partial_j\Pi_q^{ij}
=
f_q^i+R_{P,q}^i
$$
$$
\partial_t e_q
+\nabla\cdot\mathbf{J}_{e,q}
=
\mathbf{f}_q\cdot\mathbf{u}
+R_{E,q}
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
+\Pi_{\mathrm{mem}}^{ij}
$$
where $E^{ij}=\frac{1}{2}(\partial^iu^j+\partial^ju^i)$. This is a comparison form borrowed from continuum mechanics and kinetic theory. In $\mathbb{A}\mathbb{A}\mathbb{A}$ it becomes native only after $\eta_{\mathrm{cg}}$, $\zeta_{\mathrm{cg}}$, and $\Pi_{\mathrm{mem}}^{ij}$ are derived from the same delayed branch record that supplies the force law.

The constructive route is to read the transport coefficients as low-frequency moments of the delayed response kernel, not as independent material constants. If $\widetilde K_{\mathrm{shear}}(\omega)$ and $\widetilde K_{\mathrm{bulk}}(\omega)$ are the shear and bulk projections of the same branch-derived causal kernel, then the leading near-equilibrium coefficients have the schematic form

$$
\eta_{\mathrm{cg}}
\sim
\lim_{\omega\to0}
\frac{
\operatorname{Im}\widetilde K_{\mathrm{shear}}(\omega)
}{
\omega
},
\qquad
\zeta_{\mathrm{cg}}
\sim
\lim_{\omega\to0}
\frac{
\operatorname{Im}\widetilde K_{\mathrm{bulk}}(\omega)
}{
\omega
}
$$

and $\Pi_{\mathrm{mem}}^{ij}$ carries the finite-frequency remainder. This makes the viscosity-like channel an odd-frequency readout of the delayed force kernel. The ratio between $\eta_{\mathrm{cg}}$, $\zeta_{\mathrm{cg}}$, and the force-law coupling $\kappa$ is therefore a kernel-shape consequence on a certified branch, not an additional parameter family.

The corresponding dissipation residual is
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
}
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
\epsilon_{\omega}
$$
for the retained two-form $\omega_{\mathcal{Q}}$, or an equivalent Poisson-bracket residual on the admitted observables. If $\epsilon_{\mathcal{Q}}$ or $\epsilon_{\omega}$ is not controlled, the local Hamiltonian is only a fitting chart, not a derived mechanics.

For a replayable branch chart, this measure condition is the
$\mathbb{A}\mathbb{A}\mathbb{A}$ analogue of Liouville's theorem. In ordinary
finite-dimensional Hamiltonian mechanics the phase-space flow is
divergence-free, $\nabla_z\cdot\dot z=0$, so a phase-space volume element may
stretch and fold but is not compressed by the exact flow. In the delayed
setting, the analogous statement is valid only after $\mathcal{Q}$ retains the
phase variables, causal-root ledger, wake-history record, and surrounding
context that actually control the return map. Dropping an active sub-assembly
phase can make a closed chart look dissipative or probabilistic merely because
the chart has thrown away one of the variables that carries the recurrence.

The preserved two-form is likewise not the naive instantaneous form alone. On a delayed branch the candidate symplectic structure has a memory correction,

$$
\omega_{\mathcal{Q}}
=
\omega_0+\omega_{\mathrm{mem}},
\qquad
\omega_0
=
\sum_A dQ^A\wedge d\Pi_A
+
\sum_\alpha d\theta^\alpha\wedge dI_\alpha
$$

with

$$
\omega_{\mathrm{mem}}
=
\int_{-h}^{0}
\mathcal K_{\mathrm{symp}}(\vartheta)\,
\delta\mathbf{x}(\vartheta)
\wedge
\delta\dot{\mathbf{x}}(\vartheta)
\,d\vartheta
$$

where $h$ is the retained memory depth and $\mathcal K_{\mathrm{symp}}$ is built from the same branch causal kernel that supplies the force. The residual $\epsilon_{\omega}$ is small only when this memory term is replayable: after one return, the retained history segment $[-h,0]$ must map to a congruent segment with the same branch rows and boundary convention. This is why phase-locked branches are the natural Hamiltonian domain. They replay the history window that carries $\omega_{\mathrm{mem}}$, while off-lock branches leak symplectic content through the memory boundary and can look dissipative after projection.

This gate keeps the exact and effective levels separate. The Master Equation owns the delayed causal dynamics; the effective Hamiltonian owns only those regimes where internal wake memory, branch changes, and unresolved Noether sea exchange have been compressed without losing the observer-level invariants being compared.

The same domain restriction applies before translating an effective Hamiltonian chart into quantum operators. The admissible observable set in [Quantum Operator Mapping](../philosophy-history/theory-bridges/quantum-operator-mapping.md#admissible-quantization-domain-guardrail) must be derived from this retained coarse-graining and record window, not chosen afterward as a free quantization convention.

The positive selection rule is that the quantizable algebra is generated by the globally defined branch variables,

$$
\{Q^A,\Pi_A\}
\cup
\{e^{i\theta^\alpha},I_\alpha\}
$$

not by arbitrary functions on a projected chart. The phases enter through the single-valued observables $e^{i\theta^\alpha}$, while $I_\alpha$ records the corresponding action. A Bohr-Sommerfeld-like integer is admissible only when it is forced by single-valuedness around the resonance-locked phase bundle,

$$
\oint_{\gamma_\alpha}\Pi\,dQ
\in
2\pi\hbar_{\mathrm{eff}}\mathbb{Z}
$$

with the integer tied to the phase-bundle winding above. Thus quantization in this reduction is a topological single-valuedness condition on a retained phase-locked bundle, not a global quantization convention imposed on every smooth effective observable.

### Topological Constraints and Assembly Stability

The delayed action, after branch reduction to causal-locus and root-ledger data, constrains the allowed topological configurations of architrino assemblies in the Noether sea. Stable assemblies, such as nested maximal-curvature candidates inside nested shell braids, should therefore be treated as theorem targets for localized, phase-locked causal-locus classes rather than as already-proved vortices or continuum topological defects.

The stability of these assemblies must be checked by the nonlinear self-hit feedback embedded in the interaction functional. When internal circulation velocities exceed $c_f$, the non-Markovian repulsion supplies a candidate branch-trapping mechanism; it becomes a robust geometric attractor only after a branch chart, Lyapunov or Floquet diagnostic, and history-aware energy bound are supplied. Likewise, mass-gap language is a closure target tied to discrete admissible branch classes, not an automatic consequence of writing the effective action.

The native topological sector is the stabilized causal-root ledger, not a borrowed field-theory vortex number. The canonical definition is given in [Assembly Topological Charge](assembly-topological-charge.md); in the effective-action chart, the same assembly topological charge is the retained sector

$$
[\mathfrak B]
=
\left(
N_s,\,
M_p,\,
c_1[\theta^O,\theta^M,\theta^I]
\right)
\in
\mathbb{Z}_{\ge0}\times\mathbb{Z}_{\ge0}\times\mathbb{Z}^2
$$

where $N_s$ counts active self-hit roots, $M_p$ counts active partner-hit roots, and $c_1[\theta^O,\theta^M,\theta^I]$ is the phase-bundle winding of the resonance-locked tri-binary chart. This class is deformation-stable only inside the nondegenerate branch domain: a causal-root fold, reconnection, or loss of phase-bundle closure changes the sector.

The corresponding mass-gap target is therefore native and computable. The gap is the minimum action cost to change $[\mathfrak B]$ by an admissible branch transition, such as a $\Delta N_s=\pm2$ root birth or death under the same Jacobian floor and boundary convention. In a caustic-grazing transition this cost should be estimated from the finite impulse and wake-history increment across the fold. If that minimum vanishes under refinement, the action chart has no protected assembly gap; if it remains positive, the gap is a property of the branch ledger and delayed action, not an imported continuum-defect assumption.

### Closure Interface: Action-to-Envelope Reduction

This chapter supplies the variational bridge used by the quantum closure chain. The bridge remains effective and comparative: it tests when a signed polarity/current history can be compressed into a nonnegative envelope without erasing memory terms.

From the regularized nonlocal action, the first step is to derive a continuum effective action in terms of coarse variables $(\rho_q,\mathbf{j}_q)$. The second step tests a phase-amplitude closure ansatz for the retained nonnegative envelope channel:
$$
\rho_{\mathrm{env}}=|\psi|^2,\qquad
\mathbf{j}_{\mathrm{env}}=\frac{\hbar_{\mathrm{eff}}}{m_{\mathrm{eff}}}\Im(\psi^*\nabla\psi)
$$
Here $m_{\mathrm{eff}}$ is the retained envelope mass parameter of the benchmark chart, not a primitive architrino mass. The projection from the signed polarity/current data $(\rho_q,\mathbf{j}_q)$ to the nonnegative envelope channel must be declared before $\rho_{\mathrm{env}}$ is interpreted as $|\psi|^2$.

That projection has a topological cost. The signed polarity density carries a polarity-sign sheet

$$
\sigma(\mathbf{x},t)
=
\operatorname{sign}\rho_q(\mathbf{x},t)
\qquad
(\rho_q\neq0)
$$

and the interfaces $\rho_q=0$ are polarity domain walls. The envelope map is faithful only on a region where $\sigma$ is constant. When a loop $\gamma$ encloses domain-wall crossings, the phase chart must carry the lost sign sheet as a $\mathbb{Z}_2$ bundle datum:

$$
\oint_{\gamma}
\nabla S_{\mathrm{env}}\cdot d\boldsymbol{\ell}
=
\pi\,N_{\mathrm{wall}}(\gamma)
\quad
(\mathrm{mod}\ 2\pi)
$$

where $N_{\mathrm{wall}}(\gamma)$ is the parity count of enclosed polarity-domain-wall intersections in the retained projection. The memory current is therefore not generic residue in this regime. Its circulation classifies the polarity-domain-wall topology that the nonnegative envelope has forgotten. A spin-$\tfrac12$-like double-valued envelope can be promoted only if this $\mathbb{Z}_2$ sign-sheet circulation is recovered from the same $(\rho_q,\mathbf{j}_q)$ history and persists under branch-preserving deformation.

The handoff must report the continuity residual
$$
R_{\mathrm{cg}}=\partial_t\rho_{\mathrm{env}}+\nabla\cdot\mathbf{j}_{\mathrm{env}},
\qquad
\epsilon_{\mathrm{cg}}=
\frac{\|R_{\mathrm{cg}}\|}
{\|\partial_t\rho_{\mathrm{env}}\|+\|\nabla\cdot\mathbf{j}_{\mathrm{env}}\|+\varepsilon}
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
\nabla\cdot\mathbf{j}_{\mathrm{mem}}
$$
Thus a small $R_{\mathrm{cg}}$ by itself does not prove envelope closure; the projection mismatch and memory-current divergence must be controlled as well.

For the non-relativistic, fixed-particle-number benchmark, the same envelope must also admit a phase chart
$$
\psi=\sqrt{\rho_{\mathrm{env}}}\,e^{iS_{\mathrm{env}}/\hbar_{\mathrm{eff}}},
\qquad
\mathbf{j}_{\mathrm{env}}=\frac{\rho_{\mathrm{env}}}{m_{\mathrm{eff}}}\nabla S_{\mathrm{env}}
$$
Define
$$
K_{\mathrm{env}}=\frac{\|\nabla S_{\mathrm{env}}\|^2}{2m_{\mathrm{eff}}},
\qquad
Q_{\mathrm{env}}
=
-\frac{\hbar_{\mathrm{eff}}^2}{2m_{\mathrm{eff}}}
\frac{\nabla^2\sqrt{\rho_{\mathrm{env}}}}{\sqrt{\rho_{\mathrm{env}}}}
$$
and test the corresponding Hamilton-Jacobi residual
$$
R_{\mathrm{HJ}}
=
\partial_t S_{\mathrm{env}}
+K_{\mathrm{env}}
+V_{\mathrm{eff}}
+Q_{\mathrm{env}}
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
\le\epsilon_{\mathrm{env}}
$$
This is a comparison residual, not a new ontology. If it fails, the wave function and Hamiltonian remain useful fitting charts for that window rather than promoted quantum closure.

The interface is closed only when:
- the Euler-Lagrange equations of the coarse action reproduce the effective envelope equation used in [pilot-wave-character](../philosophy-history/theory-bridges/pilot-wave-character.md);
- the phase-amplitude chart reports $\mathcal{R}_{\mathrm{env}}$ rather than assuming the Schrödinger limit;
- memory contributions $\mathbf{j}_{\mathrm{mem}}$ remain explicit as controlled correction terms rather than hidden parameter absorbs.
