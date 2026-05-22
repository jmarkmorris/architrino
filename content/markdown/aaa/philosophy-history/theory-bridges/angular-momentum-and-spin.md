# Angular Momentum and Spin

This bridge explains how angular momentum, spin, helicity, and the constants $h$ and $\hbar$ should be read across standard quantum theory and $\mathbb{A}\mathbb{A}\mathbb{A}$. The central claim is level-specific:

- At the primitive architrino level, neither angular momentum nor spin is an additional substance or intrinsic property.
- Angular momentum becomes a conserved history functional when architrino motion is organized inside the rotationally symmetric Euclidean void.
- Spin becomes an effective transformation class of stable assemblies, especially ordered nested shell swarm and planar vector-channel structures.

The result is not that angular momentum and spin are unreal. The result is that their ontological status is emergent. They are indispensable higher-level ledgers and measurement labels, but the fundamental ontology still consists of architrinos, polarity, position, velocity, absolute time, Euclidean void, causal wakes, and path history.

The related material is best read as an ordered path rather than as a flat list of adjacent chapters:

1. Start with primitive ontology in [Architrino](../../foundations/architrino.md) and [Foundational Ontology](../../foundations/ontology.md).
2. Use [Master Equation](../../dynamics/master-equation.md) and [Causal Action Functional](../../dynamics/causal-action-functional.md) for delayed conservation and wake-history bookkeeping.
3. Use [Nested Shell Swarm Dynamics](../../noether-swarm/nested-shell-swarm-dynamics.md) for the nested shell swarm mechanics that spin must descend from.
4. Treat [Measurement Ontology](../../quantum/measurement-ontology.md), [Electroweak Bosons](../../assemblies/bosons/electroweak-bosons.md), and [Bell's Theorem](./bell-theorem.md) as downstream tests rather than source derivations.

## Primitive Status

The architrino page fixes the starting point: an architrino is a point transceiver with identity, position, velocity, polarity, and path-history ledger. It has no volume, no internal axis, no primitive rest mass, and no intrinsic spin in the classical sense.

That statement answers the first question directly. $\mathbb{A}\mathbb{A}\mathbb{A}$ does not need angular momentum or spin as primitive entities. The primitive dynamics can be stated without either concept:

$$
\ddot{\mathbf{x}}_i(t)
=
\sum_j\sum_{t_0\in\mathcal{C}_{ij}(t)}
\kappa\,\sigma_{ij}
\frac{|q_iq_j|}
{r_{ij}^2(t;t_0)\,|J_{ij}(t;t_0)|}
\hat{\mathbf{r}}_{ij}(t;t_0).
$$

The only vector direction inside one hit is the delayed radial line of action $\hat{\mathbf{r}}_{ij}$. There is no primitive cross-product force, no intrinsic magnetic right-hand-rule term, and no point-particle spin axis. Any angular, magnetic-like, spin-like, or helicity-like behavior must be reconstructed from delayed geometry, superposition, assembly circulation, and measurement coupling.

The important qualification is that angular momentum still becomes mandatory once the dynamics are studied as an isolated rotationally symmetric system. The Euclidean void is invariant under spatial rotations. For the action-derived delayed model, rotational symmetry gives a conserved angular-momentum functional. That functional is not a new substance; it is the Noether ledger associated with organized motion and in-flight causal-wake history.

## Angular Momentum as a History Ledger

In ordinary local mechanics, angular momentum is often written as a particle-only snapshot. In $\mathbb{A}\mathbb{A}\mathbb{A}$ that is incomplete because delayed interactions break the instantaneous equal-and-opposite picture. A source emits at one time, a receiver responds later, and the apparent missing momentum or angular momentum is carried by the active causal-wake history.

With the universal force/energy bookkeeping constant $\mu_{\text{arch}}$, the mechanical part is

$$
\mathbf{L}_{\text{mech}}(t)
=
\sum_i \mathbf{x}_i(t)\times\mu_{\text{arch}}\mathbf{v}_i(t).
$$

The wake part is a history functional. In the master-equation conservation scaffold it is written as

$$
\mathbf{L}_{\text{wake}}(t)
=
\mathbf{L}_{\text{wake}}(t_\ast)
-
\int_{t_\ast}^{t}
\sum_i
\mathbf{x}_i(s)\times\mathbf{F}_i(s)\,ds,
$$

where $\mathbf{F}_i=\mu_{\text{arch}}\mathbf{a}_i$ is only a bookkeeping force corresponding to the acceleration-first law. The conserved total ledger is

$$
\mathbf{L}_{\text{tot}}(t)
\equiv
\mathbf{L}_{\text{mech}}(t)+\mathbf{L}_{\text{wake}}(t).
$$

For exact isolated solutions of the symmetry-preserving delayed action, $\mathbf{L}_{\text{tot}}$ is conserved. In regularized numerical models, conservation of $\mathbf{L}_{\text{tot}}$ is a validation condition: the chosen regularization must preserve the same rotation symmetry before exact conservation can be claimed.

This is the safest ontology statement:

> Angular momentum is not a primitive property of an isolated architrino. It is the conserved rotational ledger of an isolated motion-plus-wake history.

## Four Regimes

The meaning of angular momentum and spin changes sharply as one moves from free architrinos to bound assemblies.

| Regime | What exists at the substrate level | Angular momentum reading | Spin reading |
| --- | --- | --- | --- |
| Opposite-polarity architrinos passing in an empty void | Two persistent architrino worldlines, unlike polarities, mutual attractive delayed partner hits, and their emitted causal wakes. | A scattering impact-parameter ledger exists for the two-body history. The mechanical part can bend during delayed attraction, while $\mathbf{L}_{\text{wake}}$ carries the in-flight balance. There is no quantized orbital label unless the interaction locks into a periodic assembly. | None at the primitive level. A single architrino has no internal axis, and a flyby pair has not formed an ordered assembly. |
| Same-polarity architrinos passing in an empty void | Two persistent architrino worldlines, like polarities, mutual repulsive delayed partner hits, and their emitted causal wakes. | The same total ledger exists, but the radial sign is repulsive. The encounter is normally a deflection rather than a capture route. Any self-hit contribution requires suitable curved super-field-speed history; it is not implied by same polarity alone. | None at the primitive level. Same polarity changes the force sign, not the ontological inventory. |
| Spiraling opposite-polarity binary | A bound or capturing electrino:positrino pair with partner-hit delay, positive tangential drive in the sub-field-speed circular benchmark, and possible transition toward self-hit. | Angular momentum becomes assembly-relevant. The binary has orbital-plane circulation, a phase variable, and an action-angle ledger. The particle-only circular expression is not enough because delayed partner hits and later self-hits exchange angular momentum with wake history. | Not standard spin. A planar binary can have a circulation sign relative to its plane normal, but it is still a planar orbital-like datum, not a spinor representation. |
| Maximum-curvature binary | A candidate tight self-hit-supported binary near the null-separatrix / Jacobian-wall regime, with root ledgers and possible stable cycle. | If a stable maximum-curvature binary exists, it supplies a reproducible internal rotational-action standard. Its angular momentum is internal circulation plus self-wake history, not a primitive point property. | Still not fermion spin-$\tfrac{1}{2}$. It can supply a planar angular-momentum sign or helicity-like boundary datum only after a normal or propagation axis is specified. |

The table shows why the answer cannot be simply "angular momentum exists" or "spin exists." The primitive two-body law contains only delayed radial hits. Angular momentum appears when the entire isolated history is organized under rotational symmetry. Spin appears only after an assembly has enough internal orientation structure to transform like a standard spin representation.

## Opposite and Same Polarity Flybys

For two architrinos in an otherwise empty Euclidean void, the active causal-root condition is

$$
\|\mathbf{x}_1(t)-\mathbf{x}_2(t_0)\|
=
c_f(t-t_0),
\qquad
t_0 < t.
$$

The sign of $q_1q_2$ determines attraction or repulsion:

$$
\sigma_{12}
=
\mathrm{sign}(q_1q_2)
=
\begin{cases}
-1, & \text{opposite polarities},\\
+1, & \text{same polarities}.
\end{cases}
$$

The instantaneous hit is radial along the delayed line of action. If the receiver velocity is decomposed as

$$
\mathbf{v}_1
=
v_r\hat{\mathbf{r}}_{12}+\mathbf{v}_{\perp},
$$

then the hit changes the along-the-line component directly, while the transverse component changes only through the later rotation of the line of action. The instantaneous power is proportional to $v_r$:

$$
P_{12}(t;t_0)
=
\mu_{\text{arch}}\,
\kappa\sigma_{12}
\frac{|q_1q_2|}
{r_{12}^2|J_{12}|}
v_r.
$$

An opposite-polarity flyby can therefore convert transverse motion into a capture or spiral if the delay geometry and impact parameter place the pair inside the relevant basin. A same-polarity flyby normally does the opposite: it pushes the paths apart. In both cases the spin statement remains the same. A flyby pair has no intrinsic spin variable. It has only motion, causal wakes, and the total angular-momentum ledger of that motion-plus-wake history.

## Spiraling Binary

An opposite-polarity binary introduces the first genuinely assembly-like use of angular momentum. In the sub-field-speed partner-only circular benchmark, the delayed attraction is not central in the instantaneous Newtonian sense. The partner's past position creates a tangential component, and that component is positive in the direction of motion. The result is inward spiral rather than stable circular motion.

The binary's useful variables are not only position and velocity. A reduced circular chart uses radius $R$, angular speed $\omega$, speed $s=R\omega$, phase angle, branch roots, and a plane normal. For a full cycle, the relevant action-angle relation is

$$
A_{\text{cycle}}
=
\oint p\,dq
=
2\pi I.
$$

Here $I$ is the radian-normalized rotational-action variable. In a reduced circular effective chart it plays the role that angular momentum plays in ordinary mechanics. But in the exact delayed theory, $I$ is only the local assembly-side projection of a larger history functional. Partner hits, self-hit roots, and in-flight wake terms must all be included before the conservation statement is complete.

This binary stage is where the standard words become tempting but dangerous:

- "orbital angular momentum" is useful if it means binary circulation in an assembly chart;
- "spin" is premature if it means intrinsic spin of the architrinos;
- "helicity" is premature unless a propagation axis is dynamically tied to the planar sign.

The correct statement is that a spiraling binary has orbital-like rotational action, not elementary spin.

## Maximum-Curvature Binary

The maximum-curvature binary is the candidate limiting state reached when the inward spiral enters self-hit geometry. Self-hit exists when the same architrino intersects its own earlier causal wake:

$$
\|\mathbf{x}_i(t)-\mathbf{x}_i(t_0)\|
=
c_f(t-t_0),
\qquad
t_0 < t.
$$

For uniform circular motion, the self-delay equation in units with $c_f=1$ is

$$
\delta_s
=
2s\sin(\delta_s/2),
\qquad
s=R\omega.
$$

The principal self branch turns on only for $s > 1$. Its Jacobian is

$$
J_s
=
1-s\cos(\delta_s/2)
=
1-\frac{\delta_s}{2}\cot(\delta_s/2).
$$

Near the self-hit onset, $J_s\to0^+$ and the unregularized response develops a strong Jacobian wall. This is why the maximum-curvature binary is not merely "a tighter orbit." It is a regime in which active self-wake branches, root multiplicity, and branch Jacobians become the dominant accounting.

If a stable maximum-curvature binary exists, it may define a fundamental length and cycle scale for the architecture. It still does not make spin primitive. It gives a reproducible planar circulation standard. The step from that standard to spin requires additional structure: at minimum, a stable orientation frame, a representation under rotations, and a measurement response that recovers standard spin projections.

## Nested Shell Swarm Spin Scaffold

The nested shell swarm is the first place where the spin question becomes native to the assembly rather than imported from standard quantum notation. A nested shell swarm contains three coupled shell binaries:

| Layer | Dynamics role | Angular-momentum role | Spin relevance |
| --- | --- | --- | --- |
| Inner | Self-hit engine, smallest radius, highest frequency, super-field-speed history-supported branch. | Deep internal rotational-action store and strongest self-wake feedback. | Supplies the high-curvature memory channel that can make orientation transport history-sensitive. |
| Middle | Hinge near $v=c_f$, with shell scale and cadence retuning. | Mediates redistribution between inner memory and outer coupling. | Controls branch sensitivity and phase-lock transitions. |
| Outer | Sub-field-speed interface in ordinary regimes, shielding and external coupling layer. | First receiver of many external action transactions and main far-field exposure channel. | Supplies the apparatus-facing handle by which a measurement can deform the swarm ledger. |

Let $\ell\in\{I,M,O\}$ label inner, middle, and outer. In a reduced action-angle chart define

$$
I_\ell
=
\frac{A_{\ell,\text{cycle}}}{2\pi},
\qquad
\mathbf{I}_\ell
=
I_\ell\hat{\mathbf{n}}_\ell,
$$

where $\hat{\mathbf{n}}_\ell$ is the layer's oriented plane normal. This is not yet the exact Noether charge; it is the layer projection of the rotational ledger. The core-level accounting target is

$$
\mathbf{J}_{\text{core}}
\sim
\mathbf{I}_I+\mathbf{I}_M+\mathbf{I}_O+\mathbf{L}_{\text{wake}},
$$

with the understanding that the exact expression must be evaluated from architrino worldlines, active root branches, and causal-wake history.

For an accepted external transaction, the bridge-level partition target is

$$
\Delta \mathbf{I}_I
+
\Delta \mathbf{I}_M
+
\Delta \mathbf{I}_O
+
\Delta \mathbf{L}_{\text{wake}}
=
\Delta \mathbf{J}_{\text{ext}}.
$$

The companion energy ledger is

$$
\Delta E
=
\omega_I\Delta I_I
+
\omega_M\Delta I_M
+
\omega_O\Delta I_O
+
\Delta E_{\text{wake}},
$$

again as a reduced action-angle statement rather than a completed derivation. The actual partition is a dynamics problem. It must be determined by conservation, causal-root admissibility, phase-lock constraints, branch stability, and coupling geometry. Assigning the entire $\hbar$ increment to one layer by fiat would erase the main mechanism.

## Delayed Three-Layer Functional Scaffold

The nested shell swarm ledger can now be written in a form that is concrete enough for proof work and simulation checks. This is still a scaffold: the wake term must be derived from the regularized nonlocal causal action before it can be claimed as a closed theorem.

For each layer $\ell\in\{I,M,O\}$, let $R_\ell(t)$ be the layer radius, $\omega_\ell(t)$ its angular frequency, $\hat{\mathbf n}_\ell(t)$ its plane normal, and

$$
\theta_\ell(t)
=
\theta_{\ell,0}+\int_{t_0}^{t}\omega_\ell(s)\,ds
$$

its phase. Choose in-plane basis vectors with

$$
\mathbf u_\ell(t)\times\mathbf v_\ell(t)=\hat{\mathbf n}_\ell(t),
$$

and define

$$
\mathbf e_\ell(\theta)
=
\cos\!\big(\theta+\phi_\ell\big)\mathbf u_\ell
+
\sin\!\big(\theta+\phi_\ell\big)\mathbf v_\ell,
$$

where $\phi_\ell$ is the layer phase offset in the selected chart. For member $\alpha\in\{+1,-1\}$, use the local position model

$$
\mathbf x_{\ell,\alpha}(t)
=
\mathbf X(t)+\mathbf c_\ell(t)+\alpha R_\ell(t)\mathbf e_\ell(\theta_\ell(t)).
$$

Here $\mathbf X(t)$ is the core center and $\mathbf c_\ell(t)$ records layer-center offset. A separated-scale internal gauge may set these terms aside, but only as an approximation.

The mechanical part is

$$
\mathbf L_{\text{mech}}^{\text{core}}(t)
=
\sum_{\ell,\alpha}
\mathbf x_{\ell,\alpha}(t)\times
\mu_{\text{arch}}\dot{\mathbf x}_{\ell,\alpha}(t).
$$

For nearly circular separated layers, this becomes

$$
\mathbf L_{\text{mech}}^{\text{core}}(t)
=
\sum_{\ell\in\{I,M,O\}}
2\mu_{\text{arch}}R_\ell^2(t)\omega_\ell(t)\hat{\mathbf n}_\ell(t)
+
\mathbf L_{\text{tr}}(t),
$$

where $\mathbf L_{\text{tr}}$ collects center motion, layer-center offsets, changing plane frames, and non-circular corrections.

The delayed part is branch-resolved. Define

$$
\mathcal C_{\ell\alpha,m\beta}(t)
=
\left\{
t_0 < t:
\left\|\mathbf x_{\ell,\alpha}(t)-\mathbf x_{m,\beta}(t_0)\right\|
=
c_f(t-t_0)
\right\},
$$

and let

$$
\mathcal R(t)
=
\left\{
(\ell,\alpha;m,\beta;b):
t_0^{(b)}\in\mathcal C_{\ell\alpha,m\beta}(t)
\right\}
$$

record the active source-receiver branches. For member phases, use

$$
\vartheta_{\ell,\alpha}(t)
=
\theta_\ell(t)+\frac{1-\alpha}{2}\pi.
$$

The phase-closure residual of a branch is

$$
\Psi_{\ell\alpha\leftarrow m\beta}^{(b)}(t)
=
\vartheta_{\ell,\alpha}(t)
-
\vartheta_{m,\beta}(t_0^{(b)})
+
\phi_{\ell m}^{(b)}
-
2\pi k_{\ell m}^{(b)}.
$$

An active branch must satisfy the causal-root equation and the relevant phase window,

$$
\Psi_{\ell\alpha\leftarrow m\beta}^{(b)}(t)
\equiv0\pmod{2\pi},
$$

inside the tolerance of the regularized chart.

The self-hit history is the diagonal subset

$$
\mathcal H_{\ell,\alpha}(t)
=
\left\{
t_0\in\mathcal C_{\ell\alpha,\ell\alpha}(t):
t_0 < t,\ H(t-t_0)=1
\right\},
$$

with the trivial instantaneous branch excluded. This history is path-history data; it is not determined by the current position and velocity alone.

For an active branch, set

$$
\mathbf r_{\ell\alpha,m\beta}^{(b)}(t)
=
\mathbf x_{\ell,\alpha}(t)-\mathbf x_{m,\beta}(t_0^{(b)}),
\qquad
\hat{\mathbf r}_{\ell\alpha,m\beta}^{(b)}
=
\frac{\mathbf r_{\ell\alpha,m\beta}^{(b)}}
{\left\|\mathbf r_{\ell\alpha,m\beta}^{(b)}\right\|},
$$

and

$$
J_{\ell\alpha,m\beta}^{(b)}
=
1-\frac{\mathbf v_{m,\beta}(t_0^{(b)})\cdot
\hat{\mathbf r}_{\ell\alpha,m\beta}^{(b)}}{c_f}.
$$

The branch force-like bookkeeping term is

$$
\mathbf F_{\ell\alpha\leftarrow m\beta}^{(b)}(t)
=
\mu_{\text{arch}}\kappa\sigma_{\ell\alpha,m\beta}
\frac{|q_{\ell,\alpha}q_{m,\beta}|}
{\left\|\mathbf r_{\ell\alpha,m\beta}^{(b)}\right\|^2
\left|J_{\ell\alpha,m\beta}^{(b)}\right|}
\hat{\mathbf r}_{\ell\alpha,m\beta}^{(b)}.
$$

The corresponding branch torque is

$$
\boldsymbol{\tau}_{\ell\alpha\leftarrow m\beta}^{(b)}(t)
=
\mathbf x_{\ell,\alpha}(t)\times
\mathbf F_{\ell\alpha\leftarrow m\beta}^{(b)}(t).
$$

The delayed wake contribution is therefore

$$
\mathbf L_{\text{wake}}^{\text{core}}(t)
=
\mathbf L_{\text{wake}}^{\text{core}}(t_\ast)
-
\int_{t_\ast}^{t}
\sum_{(\ell,\alpha;m,\beta;b)\in\mathcal R(s)}
\boldsymbol{\tau}_{\ell\alpha\leftarrow m\beta}^{(b)}(s)\,ds.
$$

The working three-layer total is

$$
\boxed{
\mathbf L_{\text{tot}}^{\text{core}}(t)
=
\sum_{\ell\in\{I,M,O\}}
2\mu_{\text{arch}}R_\ell^2(t)\omega_\ell(t)\hat{\mathbf n}_\ell(t)
+
\mathbf L_{\text{tr}}(t)
+
\mathbf L_{\text{wake}}^{\text{core}}(t)
}
$$

For isolated solutions of a symmetry-preserving delayed action, this total is the conserved rotational ledger. In regularized working models, conservation of this quantity is a validation target.

For a small transition, the layer increment is

$$
\Delta \mathbf I_\ell^{\text{mech}}
\simeq
2\mu_{\text{arch}}
\left(
2R_\ell\omega_\ell\Delta R_\ell
+
R_\ell^2\Delta\omega_\ell
\right)\hat{\mathbf n}_\ell
+
2\mu_{\text{arch}}R_\ell^2\omega_\ell\,\Delta\hat{\mathbf n}_\ell,
$$

while the wake increment is

$$
\Delta\mathbf L_{\text{wake}}^{\text{core}}
=
-
\int_{t_i}^{t_f}
\sum_{\mathcal R(s)}
\boldsymbol{\tau}^{(b)}(s)\,ds.
$$

Projecting onto a transaction axis $\hat{\mathbf a}$ gives the scalar bridge convention

$$
\hat{\mathbf a}\cdot
\left(
\sum_{\ell}\Delta\mathbf I_\ell^{\text{mech}}
+
\Delta\mathbf L_{\text{tr}}
+
\Delta\mathbf L_{\text{wake}}^{\text{core}}
\right)
=
\Delta I_{\text{accepted}}.
$$

For a positive one-cycle accepted transaction, $\Delta I_{\text{accepted}}=+\hbar$. The partition among inner, middle, outer, and wake channels must therefore be solved from causal-root admissibility, phase lock, branch stability, and coupling geometry.

## Partition Equations from the Master Ledger

The partition equation is not an extra postulate. It is the layer-resolved projection of the master-equation angular-momentum ledger. For each receiver layer $\ell$, define the branch torque collected by that layer over a transition window $[t_i,t_f]$:

$$
\mathbf T_\ell(t)
=
\sum_{\alpha}
\sum_{(m,\beta;b):(\ell,\alpha;m,\beta;b)\in\mathcal R(t)}
\mathbf x_{\ell,\alpha}(t)\times
\mathbf F_{\ell\alpha\leftarrow m\beta}^{(b)}(t).
$$

Since $\frac{d}{dt}\big(\mathbf x\times\mu_{\text{arch}}\dot{\mathbf x}\big)=\mathbf x\times\mathbf F$ for each architrino worldline, the exact layer mechanical increment is

$$
\Delta\mathbf L_{\text{mech},\ell}
=
\int_{t_i}^{t_f}\mathbf T_\ell(s)\,ds.
$$

The master-equation scaffold therefore gives the core mechanical change

$$
\Delta\mathbf L_{\text{mech}}^{\text{core}}
=
\sum_{\ell\in\{I,M,O\}}
\Delta\mathbf L_{\text{mech},\ell}
=
\int_{t_i}^{t_f}
\sum_{\ell\in\{I,M,O\}}\mathbf T_\ell(s)\,ds.
$$

The wake functional supplies the complementary in-flight ledger:

$$
\Delta\mathbf L_{\text{wake}}^{\text{core}}
=
-
\int_{t_i}^{t_f}
\sum_{\ell\in\{I,M,O\}}\mathbf T_\ell(s)\,ds
+
\Delta\mathbf L_{\text{wake},\partial}.
$$

Here $\Delta\mathbf L_{\text{wake},\partial}$ denotes angular momentum still carried across the boundary of the chosen core subsystem at the end of the transition window. For a completely isolated core-plus-source system this boundary term is balanced by source-channel recoil. For a reduced core-only ledger it is the retained wake channel that appears as $\Delta\mathbf L_{\text{wake}}$ in the bridge equations.

Let the incoming source channel lose angular momentum

$$
\Delta\mathbf J_{\text{tx}}
=
-\Delta I_{\text{accepted}}\hat{\mathbf a}.
$$

Then conservation over the combined source, core, and wake ledger gives the vector partition equation

$$
\boxed{
\Delta\mathbf J_{\text{tx}}
+
\sum_{\ell\in\{I,M,O\}}\Delta\mathbf L_{\text{mech},\ell}
+
\Delta\mathbf L_{\text{wake},\partial}
=
\mathbf 0.
}
$$

This is the direct descendant of

$$
\mathbf L_{\text{tot}}
=
\mathbf L_{\text{mech}}
+
\mathbf L_{\text{wake}}.
$$

It is stronger than the scalar $\hbar$ bookkeeping equation because it keeps the transaction axis, layer normals, wake recoil, and source recoil in the same vector ledger.

The scalar partition used in the nested shell swarm bookkeeping is obtained only after projecting onto the accepted transaction axis $\hat{\mathbf a}$. Define

$$
\Delta I_\ell
\equiv
\hat{\mathbf a}\cdot\Delta\mathbf L_{\text{mech},\ell},
\qquad
\Delta I_{\text{wake}}
\equiv
\hat{\mathbf a}\cdot\Delta\mathbf L_{\text{wake},\partial}.
$$

Then the projected accepted transaction satisfies

$$
\boxed{
\Delta I_I+\Delta I_M+\Delta I_O+\Delta I_{\text{wake}}
=
\Delta I_{\text{accepted}}.
}
$$

For one positive closed-cycle action transaction,

$$
\Delta A_{\text{cycle}}=h,
\qquad
\Delta I_{\text{accepted}}=\hbar.
$$

The dimensionless partition fractions are therefore

$$
\eta_\ell
=
\frac{\Delta I_\ell}{\hbar},
\qquad
\eta_{\text{wake}}
=
\frac{\Delta I_{\text{wake}}}{\hbar},
$$

with

$$
\boxed{
\eta_I+\eta_M+\eta_O+\eta_{\text{wake}}=1.
}
$$

These fractions are not free interpretive weights. They must be computed from the same branch data that appears in $\mathbf T_\ell$: causal roots, Jacobians, phase windows, layer normals, branch multiplicities, and the source-channel coupling geometry.

The reduced nonnegative branch family used below is one convenient parameterization of this equation:

$$
\eta_O=a,
\qquad
\eta_I=n_I b,
\qquad
\eta_{\text{wake}}=w,
\qquad
\eta_M=1-a-n_Ib-w,
$$

where $n_I$ is the number of inner self-hit substeps retained by the branch. The four-substep certificate sets $n_I=2$ and then imposes the additional symmetry choice $a=b=\eta_M$ with $w=0$. More general branches must solve for $a$, $b$, $w$, and any transverse recoil terms from the torque integrals rather than assigning them by symmetry.

The geometry of the partition is visible in the normal decomposition

$$
\Delta\mathbf L_{\text{mech},\ell}
=
\Delta I_\ell\hat{\mathbf n}_\ell
+
\Delta\mathbf L_{\ell,\perp},
\qquad
\hat{\mathbf a}\cdot\Delta\mathbf L_{\ell,\perp}=0.
$$

The scalar equation controls only the components along $\hat{\mathbf a}$. The transverse balance condition is

$$
\sum_{\ell\in\{I,M,O\}}\Delta\mathbf L_{\ell,\perp}
+
\left(
\Delta\mathbf L_{\text{wake},\partial}
-
\Delta I_{\text{wake}}\hat{\mathbf a}
\right)
+
\Delta\mathbf L_{\text{source},\perp}
=
\mathbf 0.
$$

Thus a spin-like response cannot be reduced to "which layer received the $\hbar$." The core must also transport or cancel the transverse normal changes caused by plane precession, wake recoil, and apparatus coupling. This is where the angular-momentum partition becomes a spin-transport problem rather than a scalar energy table.

The first-order radius-frequency closure comes from the circular layer approximation:

$$
\Delta I_\ell
\simeq
2\mu_{\text{arch}}
\left(
2R_\ell\omega_\ell\Delta R_\ell
+
R_\ell^2\Delta\omega_\ell
\right)
$$

when $\hat{\mathbf n}_\ell$ is fixed during the projected step. Each layer then contributes one mechanical retune equation. The dynamics-specific side conditions are:

$$
R_O^+\omega_O^+ < c_f,
\qquad
R_M^+\omega_M^+\approx c_f,
\qquad
R_I^+\omega_I^+ > c_f,
$$

with the inner self-hit branch additionally constrained by

$$
\delta_{\text{self}}^+
=
2s_I^+\sin\!\left(\frac{\delta_{\text{self}}^+}{2}\right),
\qquad
s_I^+ = \frac{R_I^+\omega_I^+}{c_f}.
$$

Finally, the same branch must close energy:

$$
\Delta E_O+\Delta E_M+\Delta E_I+\Delta E_{\text{wake}}
=
\omega_{\text{tx}}\hbar,
$$

with

$$
\Delta E_\ell
\approx
\bar\omega_\ell\Delta I_\ell
+
\bar I_\ell\Delta\omega_\ell
+
\Delta E_{\ell,\text{root}}.
$$

Together, these equations are the nested shell swarm total-angular-momentum partition system. The four-substep branch below is a solved certificate inside this system, not the general solution of the branch-selection problem.

## Worked Outer-Coupled Transition

This worked transition has two levels. The first level gives the general separated-scale ledger for one positive closed-cycle action transaction coupled first to the outer binary. The second level solves one minimal branch certificate: one outer substep, one middle hinge substep, two inner self-hit substeps, and no retained wake angular momentum after the transition. General branch coefficients remain closure targets, but the minimal branch shows how the scaffold can produce an explicit partition and frequency retune.

Use a separated-scale branch with

$$
R_I\ll R_M\ll R_O,
\qquad
\omega_I\gg\omega_M\gg\omega_O,
$$

and speed regimes

$$
R_I\omega_I > c_f,
\qquad
R_M\omega_M\approx c_f,
\qquad
R_O\omega_O < c_f.
$$

Let $-$ and $+$ denote the pre-transaction and post-transaction states. If the source channel carries one accepted positive cycle into the core, then the source side loses

$$
\Delta A_{\text{cycle}}^{\text{tx}}=-h,
\qquad
\Delta\mathbf{J}_{\text{tx}}=-\hbar\hat{\mathbf a},
\qquad
\Delta E_{\text{tx}}=-\omega_{\text{tx}}\hbar,
$$

where $\hat{\mathbf a}$ is the transaction axis and $\omega_{\text{tx}}$ is the accepted channel frequency. The core-side scalar convention is therefore

$$
\Delta I_{\text{accepted}}=+\hbar.
$$

For a general positive branch with $n_I=2$, introduce nonnegative coefficients

$$
a\ge0,\qquad b\ge0,\qquad w\ge0,\qquad a+2b+w\le1.
$$

The outer, inner, and wake increments are

$$
\Delta I_O=a\hbar,
\qquad
\Delta I_I=2b\hbar,
\qquad
\Delta I_{\text{wake}}=w\hbar,
$$

and the middle hinge receives the remainder:

$$
\Delta I_M
=
\big(1-a-2b-w\big)\hbar.
$$

The factor $2b$ records the inner self-hit response as a two-substep branch update. It is not a claim that a one-$h$ accepted transaction creates two extra units of angular momentum. The two inner substeps belong to the internal partition, so the scalar ledger closes:

$$
\Delta I_I+\Delta I_M+\Delta I_O+\Delta I_{\text{wake}}
=
\hbar.
$$

The full vector conservation law is stricter:

$$
-\hbar\hat{\mathbf a}
+
\sum_{\ell\in\{I,M,O\}}
\Delta\!\left(I_\ell\hat{\mathbf n}_\ell\right)
+
\Delta\mathbf L_{\text{wake}}
+
\Delta\mathbf L_{\text{tr}}
=
\mathbf 0.
$$

The scalar partition above is the fixed-normal, negligible-transport projection of this vector equation. If the layer normals precess during the transition, the transverse components must be balanced by wake recoil, source-channel recoil, apparatus recoil, or transport terms.

In the fixed-normal circular approximation, the layer-frequency shift follows from the mechanical scaffold:

$$
\Delta I_\ell
\simeq
2\mu_{\text{arch}}
\left(
2R_\ell^-\omega_\ell^-\Delta R_\ell
+
\left(R_\ell^-\right)^2\Delta\omega_\ell
\right).
$$

Thus

$$
\Delta\omega_\ell
\simeq
\frac{\Delta I_\ell}
{2\mu_{\text{arch}}\left(R_\ell^-\right)^2}
-
2\omega_\ell^-\frac{\Delta R_\ell}{R_\ell^-}.
$$

For the outer layer, the branch must remain sub-field-speed:

$$
R_O^+\omega_O^+ < c_f.
$$

The outer phase-lock and coupling geometry determine $a$ and the allowed pair $(\Delta R_O,\Delta\omega_O)$. In the general ledger, those are open branch equations rather than assigned values.

For the middle hinge, impose the simplified post-transaction hinge condition

$$
R_M^+\omega_M^+=c_f.
$$

Linearizing gives

$$
\frac{\Delta\omega_M}{\omega_M^-}
=
-
\frac{\Delta R_M}{R_M^-}.
$$

Combining this with the mechanical increment yields the explicit hinge retune:

$$
\Delta R_M
\simeq
\frac{\Delta I_M}
{2\mu_{\text{arch}}R_M^-\omega_M^-},
\qquad
\Delta\omega_M
\simeq
-
\frac{\Delta I_M}
{2\mu_{\text{arch}}\left(R_M^-\right)^2}.
$$

In this reduced branch, a positive retained middle increment expands the hinge radius and lowers the hinge frequency just enough to keep $R_M\omega_M$ at $c_f$. A more general transition may let the middle layer cross the separator and return after wake exchange; that case requires the full hinge branch map.

For the inner layer, the post-transaction branch must remain self-hit admissible:

$$
\frac{R_I^+\omega_I^+}{c_f}>1.
$$

In the symmetric circular chart, the self-hit delay angle must satisfy

$$
\delta_{\text{self}}^+
=
2s_I^+\sin\!\left(\frac{\delta_{\text{self}}^+}{2}\right),
\qquad
s_I^+ = \frac{R_I^+\omega_I^+}{c_f}.
$$

On raw simple-root charts, a separator crossing must also respect

$$
\Delta N_{\text{self}}\in2\mathbb Z,
\qquad
\Delta D=0.
$$

These self-hit equations decide which two-substep branch update is admissible and how much of the accepted increment can remain in the inner layer as $2b\hbar$ instead of being returned through the wake ledger.

The energy ledger for the same isolated transaction is

$$
\Delta E_{\text{tx}}
+
\Delta E_O
+
\Delta E_M
+
\Delta E_I
+
\Delta E_{\text{wake}}
=0,
$$

or

$$
\Delta E_O+\Delta E_M+\Delta E_I+\Delta E_{\text{wake}}
=
\omega_{\text{tx}}\hbar.
$$

Each layer energy is still a branch functional:

$$
\Delta E_\ell
=
E_\ell(I_\ell^+,\omega_\ell^+,R_\ell^+,\mathcal R_\ell^+)
-
E_\ell(I_\ell^-,\omega_\ell^-,R_\ell^-,\mathcal R_\ell^-).
$$

The first action-angle approximation is

$$
\Delta E_\ell
\approx
\bar\omega_\ell\Delta I_\ell
+
\bar I_\ell\Delta\omega_\ell
+
\Delta E_{\ell,\text{root}},
$$

where $\Delta E_{\ell,\text{root}}$ records the causal-root and self-hit branch change not captured by the smooth action-angle part. The middle channel closes the energy balance:

$$
\Delta E_M
=
\omega_{\text{tx}}\hbar
-
\Delta E_O
-
\Delta E_I
-
\Delta E_{\text{wake}}.
$$

### Solved Minimal Four-Substep Branch

The minimal solved branch adds four simplifying assumptions to the separated-scale chart:

1. the transaction axis is aligned with the projected layer normals, so $\hat{\mathbf n}_I\cdot\hat{\mathbf a}=\hat{\mathbf n}_M\cdot\hat{\mathbf a}=\hat{\mathbf n}_O\cdot\hat{\mathbf a}=1$ during the linearized step;
2. $\Delta\mathbf L_{\text{tr}}=\mathbf 0$;
3. the wake mediates the transition but retains no net angular momentum after closure, so $\Delta I_{\text{wake}}=0$;
4. the branch has one outer substep, one middle hinge substep, and two equal inner self-hit substeps.

Let the common substep be $\iota$. The branch rule is

$$
\Delta I_O=\iota,
\qquad
\Delta I_M=\iota,
\qquad
\Delta I_I=2\iota,
\qquad
\Delta I_{\text{wake}}=0.
$$

The scalar ledger fixes $\iota$:

$$
\iota+\iota+2\iota=\hbar
\qquad\Longrightarrow\qquad
\iota=\frac{\hbar}{4}.
$$

Thus this branch has the explicit partition

$$
\boxed{
\Delta I_O=\frac{\hbar}{4},
\qquad
\Delta I_M=\frac{\hbar}{4},
\qquad
\Delta I_I=\frac{\hbar}{2},
\qquad
\Delta I_{\text{wake}}=0.
}
$$

In the fixed-normal projection this closes the angular-momentum ledger:

$$
\Delta I_O+\Delta I_M+\Delta I_I+\Delta I_{\text{wake}}
=
\hbar.
$$

The corresponding retunes follow from the mechanical scaffold. For the outer layer, take the impulsive retune at fixed radius:

$$
\Delta R_O=0,
\qquad
\Delta\omega_O
=
\frac{\hbar}{8\mu_{\text{arch}}\left(R_O^-\right)^2}.
$$

The outer branch remains admissible only if

$$
R_O^-\left(
\omega_O^-
+
\frac{\hbar}{8\mu_{\text{arch}}\left(R_O^-\right)^2}
\right)
< c_f.
$$

For the middle layer, preserve the hinge condition $R_M\omega_M=c_f$ through the linearized retune. Since $\Delta I_M=\hbar/4$,

$$
\Delta R_M
=
\frac{\hbar}
{8\mu_{\text{arch}}R_M^-\omega_M^-},
\qquad
\Delta\omega_M
=
-
\frac{\hbar}
{8\mu_{\text{arch}}\left(R_M^-\right)^2}.
$$

This gives

$$
R_M^-\Delta\omega_M+\omega_M^-\Delta R_M=0,
$$

so the middle layer stays on the $v=c_f$ hinge to first order.

For the inner layer, use a fixed-radius retune across the two equal self-hit substeps:

$$
\Delta R_I=0,
\qquad
\Delta\omega_I
=
\frac{\hbar}
{4\mu_{\text{arch}}\left(R_I^-\right)^2}.
$$

The inner branch remains admissible only if

$$
s_I^+
=
\frac{R_I^-\left(
\omega_I^-
+
\frac{\hbar}{4\mu_{\text{arch}}\left(R_I^-\right)^2}
\right)}
{c_f}
>1
$$

and its self-delay angle satisfies

$$
\delta_{\text{self}}^+
=
2s_I^+\sin\!\left(\frac{\delta_{\text{self}}^+}{2}\right).
$$

On a raw simple-root separator chart, the two inner substeps correspond to the minimal admissible even jump

$$
\Delta N_{\text{self}}=+2,
\qquad
\Delta D=0,
$$

provided the active roots stay simple through the regularized transition.

The energy admissibility condition is now explicit. In the first action-angle approximation with no retained wake energy and no residual root-energy term, the source channel must satisfy

$$
\omega_{\text{tx}}
=
\omega_{\ast}
\equiv
\frac{\omega_O^{\ast}+\omega_M^{\ast}+2\omega_I^{\ast}}{4},
$$

where $\omega_\ell^{\ast}$ is the branch-local effective angular frequency over the substep. If the actual source frequency differs, the mismatch is

$$
\Delta E_{\text{mismatch}}
=
\left(\omega_{\text{tx}}-\omega_{\ast}\right)\hbar.
$$

The clean four-substep branch is energy-closed only when $\Delta E_{\text{mismatch}}=0$. If $\omega_{\text{tx}}<\omega_{\ast}$, the branch cannot retain positive outer, middle, and inner increments without drawing energy from a root reconfiguration or the wake/internal ledger. If $\omega_{\text{tx}}>\omega_{\ast}$, the surplus must be routed into wake recoil, transport, or another admissible branch. This is a useful failure condition, not a defect of the scaffold: a low-frequency outer hit cannot be promoted into a positive inner self-hit retune for free.

Equivalently, the branch certificate carries the signed energy residual

$$
\mathcal R_E^{B_{\min}}
=
\left(
\omega_\ast-\omega_{\text{tx}}
\right)\hbar.
$$

The minimal four-substep branch is therefore a conditional certificate, not a branch-selection theorem. In the fixed-normal, no-retained-wake chart, the scalar and vector rows close by the declared assumptions. The root replay, phase lock, torque consistency, tail-wake pullback, section stability, and nonzero energy mismatch rows still have to be populated from a retained branch chart before the branch can be treated as a physical selected outcome.

This exposes the reusable same retained-row conservation pullback. For a retained branch chart $B$ on record window $W$, force, torque, wake, and partition residuals are admissible in one angular-momentum certificate only when their row selectors coincide:

$$
\operatorname{rows}\!\left(\mathcal R_{\mathrm{force}}^B\right)
=
\operatorname{rows}\!\left(\mathcal R_{\mathrm{torque}}^B\right)
=
\operatorname{rows}\!\left(\mathcal R_{\mathrm{wake}}^B\right)
=
\operatorname{rows}\!\left(\mathcal R_{\mathrm{part}}^B\right)
=
\mathcal R_B^{\mathrm{act}}\big|_W.
$$

The same row set must also use the same regularization $\eta$, coupling tolerance $\epsilon_c$, endpoint convention, branch identity, and characteristic-tail kernel. Only then may the angular-momentum residual be evaluated as

$$
\mathcal R_{\mathbf J}^{B}
=
\frac{
\left\|
\Delta\mathbf J_{\mathrm{coupl}}
+
\sum_{\ell}\Delta\mathbf L_{\mathrm{mech},\ell}^{B}
+
\Delta\mathbf L_{\mathrm{tr}}^{B}
+
\Delta\mathbf J_{\mathrm{wake},B}^{(\eta)}
\right\|
}{
\left\|\Delta\mathbf J_{\mathrm{coupl}}\right\|+\epsilon_{\mathbf J}
}.
$$

The first proof step is to differentiate $\mathbf J_{\mathrm{mech}}^B+\mathbf J_{\mathrm{wake}}^B$ on $W$ and match the torque sum to the normalized wake-history boundary increment emitted by the same regularized action kernel. If any term is evaluated on a different retained row set, endpoint convention, or characteristic-tail kernel, the scalar $\hbar$ partition is only a diagnostic partition, not a conserved angular-momentum certificate.

The conservation result for this branch is therefore explicit:

$$
\Delta\mathbf J_{\text{tx}}
+
\left(
\Delta I_O+\Delta I_M+\Delta I_I
\right)\hat{\mathbf a}
+
\Delta\mathbf L_{\text{wake}}
=
\mathbf 0
$$

in the fixed-normal source, core, and wake ledger, and

$$
\Delta E_{\text{tx}}
+
\Delta E_O
+
\Delta E_M
+
\Delta E_I
=
0
$$

when $\omega_{\text{tx}}=\omega_{\ast}$ and root-energy residuals vanish in the branch approximation.

For branches outside this minimal certificate, the open equations are:

1. Derive the exact layer energy functionals $E_\ell(I_\ell,\omega_\ell,R_\ell,\mathcal R_\ell)$ from the nonlocal causal action.
2. Derive the outer coupling rule that fixes $a$ from the incoming wake geometry and the sub-field-speed outer branch.
3. Derive the hinge map that decides whether the middle layer stays on $R_M\omega_M=c_f$ or crosses the separator and returns.
4. Derive the inner self-hit map that fixes $b$, $\Delta N_{\text{self}}$, and $\Delta E_{I,\text{root}}$.
5. Derive the wake recoil equations that fix $w$, $\Delta E_{\text{wake}}$, and any transverse vector balance when layer normals precess.

The smallest useful branch-selection comparator keeps the minimal certificate next to a possible retained wake/recoil competitor:

$$
\mathfrak K_{\min,\mathrm{wr}}
=
\left(
B_{\min}^-,
\Gamma_{\min},
W_{\min},
\mathfrak a_{\min},
\mathfrak a_{\mathrm{wr}},
\Theta_{\min,\mathrm{wr}},
\mathcal R_{\mathrm{cmp}},
\mathcal V_{\mathrm{cmp}}
\right).
$$

Here $\mathfrak a_{\mathrm{wr}}$ is not assumed to exist. It must be emitted by the finite branch machinery as a retained wake or recoil candidate with row lineage, quotient, energy, phase, stability, and route data. Until both sides of $\mathfrak K_{\min,\mathrm{wr}}$ carry populated residuals, any claim of $\operatorname{Sel}_{B,N}=\mathfrak a_{\min}$ remains deferred.

### Finite-Candidate Branch-Selection Functional

The branch-selection target can be stated as a finite functional on retained branch records. For a pre-transaction branch chart $B^-$, coupling datum $\Gamma_{\text{coupl}}$, record window $W$, and retained budget $N$, let

$$
\mathcal A_N(B^-,\Gamma_{\text{coupl}},W)
=
\left(
\widetilde{\mathcal A}_N^{\mathrm{eval}}/\!\cong_B,
\widetilde{\mathcal A}_N^{\mathrm{blk}},
\widetilde{\mathcal A}_N^{\mathrm{excl}}
\right)
$$

be the finite candidate set after quotienting evaluable candidates by branch-chart isomorphism. The blocked set contains candidates whose row data are missing; the excluded set contains candidates that fail a hard local condition with the required rows present. For each evaluable candidate $\mathfrak a_N$, define the selection residual vector

$$
\mathcal R_{\mathrm{sel}}(\mathfrak a_N)
=
\left(
r_{\mathrm{rows}},
r_{\mathrm{root}},
r_{\Phi},
r_{\mathrm{stab}},
r_{\mathrm{pull}},
r_{\mathrm{part}},
r_{\mathrm{route}}
\right).
$$

For a route class $\kappa\in\{\mathrm{core},\mathrm{wake},\mathrm{refl}\}$,

$$
\mathcal A_{\kappa,N}^{\mathrm{pass}}
=
\left\{
\mathfrak a_N\in\mathcal A_{\kappa,N}^{\mathrm{eval}}/\!\cong_B:
\left\|\mathcal R_{\mathrm{sel}}(\mathfrak a_N)\right\|_{\infty}\le1
\right\}.
$$

The route priority is a theorem target, not a label convention:

$$
\mathcal A_{\mathrm{core}}^{\mathrm{pass}}
\succ
\mathcal A_{\mathrm{wake}}^{\mathrm{pass}}
\succ
\mathcal A_{\mathrm{refl}}^{\mathrm{pass}}.
$$

Let $\kappa_\star$ be the first nonempty passing class in this priority order. The finite-branch selection functional is

$$
\operatorname{Sel}_{B,N}
\left(
\Gamma_{\text{coupl}},
\mathfrak m_{B^-};W
\right)
=
\operatorname{lexmin}_{\mathfrak a_N\in\mathcal A_{\kappa_\star,N}^{\mathrm{pass}}}
\mathcal J_{\mathrm{sel}}(\mathfrak a_N),
$$

where $\mathcal J_{\mathrm{sel}}$ may use only quotient-invariant residual intervals, route data, retained row lineage, and physical microstate order $\tau_{\mathfrak m}$. The first proof obligation is chart invariance: $\mathcal R_{\mathrm{sel}}$ and $\mathcal J_{\mathrm{sel}}$ must be unchanged under $\cong_B$. That makes the selected branch depend on retained physics rather than generator order, file order, or chart labels.

This functional does not claim branch uniqueness yet. If required row sets differ, the candidate is locally excluded from the selected comparison. If rows are absent, the candidate is blocked rather than forbidden. If two non-isomorphic passing candidates tie and no valid $\tau_{\mathfrak m}$ separates them, the result is a physical tie that must be carried forward as unresolved branch measure, not hidden inside a deterministic theorem claim.

### Retained-Budget Refinement Stability

The finite selector must also be stable under retained-budget refinement. Let $N\preceq N'$ mean that $N'$ retains every branch-history row, route slot, quotient witness, and interval payload kept by $N$, possibly with additional rows or narrower intervals. A refinement map

$$
\iota_{N,N'}:
\mathcal A_N^{\mathrm{eval}}/\!\cong_B
\dashrightarrow
\mathcal A_{N'}^{\mathrm{eval}}/\!\cong_B
$$

is admissible only when it preserves row lineage, route class, endpoint convention, and quotient-canonical branch record. Write $\operatorname{Can}_N(\mathfrak a_N)$ for the quotient-canonical representative of a retained candidate at budget $N$.

The refinement-stability theorem target is:

$$
\operatorname{Can}_{N'}
\left(
\iota_{N,N'}(\mathfrak a_N^\star)
\right)
\cong_B
\operatorname{Can}_N(\mathfrak a_N^\star),
\qquad
\operatorname{Sel}_{B,N'}
\cong_B
\operatorname{Sel}_{B,N},
$$

where $\mathfrak a_N^\star=\operatorname{Sel}_{B,N}$. This conclusion is licensed only when the selected candidate remains evaluable, its residual intervals contract under refinement, its route class is preserved, and every newly resolved candidate in the same or higher-priority route class is blocked, locally excluded, or lexicographically no smaller than the persistent selected candidate.

This is a consistency theorem for the finite branch-selection law, not another validation gate. If it fails, the earlier budget $N$ was too coarse to support a physical selection claim; the failure should refine the retained row set rather than be interpreted as substrate randomness. The proof burden is to construct $\iota_{N,N'}$ from row lineage and quotient witnesses, prove interval residual monotonicity for persistent candidates, and show that refinement cannot smuggle generator order or chart labels into $\operatorname{Sel}_{B,N}$.

## Ordered-Frame Spinor Target

Spin-$\tfrac{1}{2}$ should not be modeled as a tiny literal orbit. The nested shell swarm has a richer object available: an ordered, non-coplanar internal frame together with root-ledger history. A compact way to name the data is

$$
\mathcal{F}_{\text{core}}(t)
=
\bigl(
\hat{\mathbf{n}}_I,\hat{\mathbf{n}}_M,\hat{\mathbf{n}}_O,
\phi_I,\phi_M,\phi_O,
\mathcal{R}
\bigr),
$$

where $\phi_\ell$ are layer phases and $\mathcal{R}$ records the active causal-root and self-hit branch data. A spatial rotation acts on the normals, but it need not return the full ordered phase-and-root history to itself after the same rotation that returns an ordinary rigid body.

The corresponding reduced nested shell swarm state vector is

$$
\Gamma_C(t)
=
\{R_a,\omega_a,\phi_a,\hat{\mathbf n}_a,I_a,\mathcal R_a,\mathcal R_{ab},\mathbf V_{\text{cm}}\}_{a\in\{I,M,O\}}.
$$

This is a branch-chart reduction of the full six-architrino history. It keeps layer radii, frequencies, phases, binary-plane normals, radian-normalized rotational actions, layer and inter-layer causal-root ledgers, and the center/group velocity through the Noether Sea. A theorem-target configuration space for this reduction is

$$
\mathcal Q_C^{\text{red}}
=
\left(
\mathbb R_+^3\times\mathbb R_+^3\times\mathbb T^3
\times
\mathcal N_{\text{ord}}
\times
\mathfrak R
\times
B_{c_\star}
\right)/G_{\text{gauge}},
$$

where

$$
\mathcal N_{\text{ord}}
=
\left\{
(\hat{\mathbf n}_I,\hat{\mathbf n}_M,\hat{\mathbf n}_O)\in(S^2)^3:
\det[\hat{\mathbf n}_I,\hat{\mathbf n}_M,\hat{\mathbf n}_O]\ne0
\right\}.
$$

Here $\mathfrak R$ is the causal-root ledger class and $B_{c_\star}$ records admissible $\mathbf V_{\text{cm}}$ values for the declared branch speed $c_\star$. The quotient $G_{\text{gauge}}$ removes only genuine gauge redundancy such as center translation and time-origin choice. It does not remove ordered layer identity, oriented-normal reversal, causal-root bifurcation, or chirality-branch change.

In the circular carrier chart,

$$
\mathbf x_{a,\alpha}(t)
=
\mathbf X(t)+\mathbf c_a(t)+\alpha R_a(t)
\bigl(\cos\phi_a(t)\mathbf u_a(t)+\sin\phi_a(t)\mathbf v_a(t)\bigr),
\qquad
\mathbf u_a(t)\times\mathbf v_a(t)=\hat{\mathbf n}_a(t).
$$

The reduced closure-label version of the same target keeps only the data needed to compare closed nested shell swarm branches. The dynamics sections use $\ell\in\{I,M,O\}$ for inner, middle, and outer. The ordered-frame and chirality literature also uses $\{H,M,L\}$, where $H$ is high / inner, $M$ is middle, and $L$ is low / outer. These are aliases for the same three binary roles, not two different triads.

For a closed ordered core, use the reduced branch label

$$
\Lambda_{\text{NC}}
=
\left(
k_H,k_M,k_L;\
\mathcal{G}_H,\mathcal{G}_M,\mathcal{G}_L;\
\mathcal{G}_{HM},\mathcal{G}_{HL},\mathcal{G}_{ML};\
\chi_c
\right).
$$

The integers $k_H,k_M,k_L$ are layer winding counts over the chosen return period. The layer ledgers $\mathcal{G}_a$ record active self-hit and partner-hit branches, root multiplicities, winding or phase branch, emission-order data, and separator history. The inter-layer ledgers $\mathcal{G}_{ab}$ record delayed exchange roots and phase-lock constraints. The branch label $\chi_c$ records ordered-frame chirality, currently the `HML/HLM` datum, with $Wr_c$ or a multi-component causal-writhe parity as the leading formal candidate.

The corresponding ordered-frame object is the history-lifted frame

$$
F_{\text{NC}}(t)=
\big(
\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L;\
\mathcal{G}_H,\mathcal{G}_M,\mathcal{G}_L,\
\mathcal{G}_{HM},\mathcal{G}_{HL},\mathcal{G}_{ML};\
\chi_c
\big).
$$

This is a theorem target, not a completed derivation. The quotient is allowed to remove center-of-mass translation, time-origin choice, smooth phase reparameterization inside one closed root-ledger cell, and small deformations that preserve the ordered layer labels, root ledgers, and chirality branch. It must not quotient away permutations of $H,M,L$, reversal of the oriented normals, or branch-changing causal-root relabelings.

The spinor closure target is therefore

$$
\widetilde{R}:SU(2)\simeq\mathrm{Spin}(3)\to SO(3),
$$

with the physical requirement:

- a $2\pi$ spatial rotation returns the coarse orientation but changes the internal phase/sign branch;
- a $4\pi$ rotation restores the full ordered-frame configuration.

A support row for that requirement has to be a retained active-root datum, not merely the visible $SO(3)$ loop. For a retained row $r$ in a branch chart, the local parity test has the form

$$
\epsilon_{r}^{2\pi}
=
\left[
\Delta k_{r}^{2\pi}
+
\Delta e_{r}^{2\pi}
+
\Delta w_{r}^{2\pi}
+
\Delta\chi_{r}^{2\pi}
\right]_2,
$$

where the entries record, respectively, phase-branch parity, emission-order parity, component-resolved causal-writhe parity, and row-sourced chirality parity. A nontrivial spinor-support candidate must exhibit at least one non-gauge retained row with $\epsilon_{r}^{2\pi}=1$ while the doubled path restores the lifted history, $\epsilon_{r}^{4\pi}=0$, and the angular-momentum residual remains below tolerance. A visible ordered-frame loop by itself gives only ordinary $SO(3)$ closure. A nonzero angular-momentum residual is a conservation failure, not evidence for a spinor sheet.

The row-local causal-writhe version of this support test uses a lifted retained row

$$
\widetilde r(s)
=
\left(
t_{0,r}(s),
k_r(s),
\mathcal E_r(s),
\Xi_r(s),
\mathcal C_r(s)
\right),
\qquad
\Xi_r
=
\left(
\xi_{r,H},
\xi_{r,M},
\xi_{r,L}
\right),
$$

where $s\in[0,2]$ traces one visible $2\pi$ loop followed by its doubled path. The row-local parity extractor is

$$
\Pi_{W,r}^{2\pi}
=
W_r(1)-W_r(0)
\pmod 2,
\qquad
\Pi_{W,r}^{4\pi}
=
W_r(2)-W_r(0)
\pmod 2.
$$

A retained row $r_\star$ can support the spinor lift only if

$$
\Pi_{W,r_\star}^{2\pi}=1,
\qquad
\Pi_{W,r_\star}^{4\pi}=0,
\qquad
\Delta_{\Pi_W}(r_\star)\le\varepsilon_{\Pi_W}.
$$

This is still a proof obligation. The present corpus has the extractor and control conditions, but it does not yet contain a populated retained row that passes them.

The same test needs an explicit gauge control so that coordinate relabeling is not mistaken for spinor support:

$$
\Delta_{\mathrm{gc}}(r)
=
\Delta_{\mathrm{rig}}(r)
+
\Delta_{\mathrm{flip}}(r)
+
\Delta_{\mathrm{phys}}(r)
+
\Delta_{\mathrm{quot}}(r)
+
\Delta_{\mathrm{dbl}}(r)
+
\Delta_{\mathbf J}(r).
$$

The null rigid row must return ordinary closure,

$$
\Pi_{W,r,\mathrm{rig}}^{2\pi}=0,
\qquad
\Pi_{W,r,\mathrm{rig}}^{4\pi}=0.
$$

If an allowed branch-preserving gauge probe $g\in G_{\mathrm{gauge}}$ changes the proposed parity,

$$
\delta_g\Pi_{W,r}^{2\pi}=1,
$$

then the parity is a gauge artifact, not spinor support. A passed spinor row must keep $\Delta_{\mathrm{gc}}(r)\le\varepsilon_{\mathrm{gc}}$ and must also keep the $2\pi$ and $4\pi$ angular-momentum residuals below tolerance.

### Quotient-Resolved Row-Parity Additivity

The row-local extractor becomes a branch-level spinor datum only after quotient resolution and row provenance are both explicit. Let $B$ be a stable non-coplanar branch chart on $W$, let $\mathscr K_B$ be its retained physical branch-history rows after quotienting genuine gauge redundancy, and let $s\in\{2\pi,4\pi\}$. For each retained row define

$$
\bar\epsilon_r^{s}
=
q_r^{s}
\left[
\Delta k_r^{s}
+
\Delta e_r^{s}
+
\Delta w_r^{s}
+
\operatorname{Prov}_\chi^{s}(r)
\right]_2.
$$

Here $q_r^s\in\{0,1\}$ records whether the apparent row difference survives the quotient as physical data, $\Delta k_r^s$ is the root or winding-cell change, $\Delta e_r^s$ is the emission-order change, $\Delta w_r^s$ is the component causal-writhe change, and $\operatorname{Prov}_\chi^s(r)$ is the row-local contribution to the chirality branch. Aggregate chirality or causal-writhe signs are not usable by downstream consumers until they decompose into these row-sourced terms.

The branch-level table parity is therefore only

$$
\eta_B^{\mathrm{table}}(\gamma_s)
=
\left[
\sum_{r\in\mathscr K_B}
\bar\epsilon_r^s
\right]_2.
$$

This is a $\mathbb Z_2$ additivity lemma, not a spinor-support pass. Gauge-erased rows contribute zero, even physical row flips cancel, and termwise gauge invariance of $\bar\epsilon_r^s$ gives gauge invariance of $\eta_B^{\mathrm{table}}$. The remaining burden is still to populate a retained non-coplanar row, compute its row-local causal writhe, supply $\operatorname{Prov}_\chi$, exhibit quotient witnesses, prove doubled-path restoration, and keep the angular-momentum residual below tolerance.

### Rigid Branch-Preserving Control

The row-local test has a useful no-go consequence. Apply the quotient-resolved table parity above to a branch-preserving visible $2\pi$ loop $\gamma_{2\pi}^{\mathrm{rig}}$.

If the loop is rigid on the retained history data,

$$
\bar\epsilon_r^{2\pi}=0
\qquad
\text{for every }r\in\mathscr K_B,
$$

then

$$
\eta_B^{\mathrm{table}}(\gamma_{2\pi}^{\mathrm{rig}})=0.
$$

This is ordinary $SO(3)$ closure, not spinor support. The proof is just the parity sum: when every retained non-gauge row returns identically, the visible normal-triad loop has no history-sheet change to pull back into the ordered core. Therefore a proposed spinor proof that assigns nontrivial $2\pi$ lift to this rigid table has imported the $SU(2)\to SO(3)$ comparison rather than deriving the lift from delayed causal-root transport.

The first non-null support condition is consequently narrow:

$$
\left[
\sum_{r\in\mathscr K_B}
\bar\epsilon_r^{2\pi}
\right]_2
=1,
\qquad
\left[
\sum_{r\in\mathscr K_B}
\bar\epsilon_r^{4\pi}
\right]_2
=0,
$$

with branch stability, gauge control, and angular-momentum residuals still below tolerance. In the minimal support case this reduces to one retained non-gauge row $r_\star$ with $\bar\epsilon_{r_\star}^{2\pi}=1$ and $\bar\epsilon_{r_\star}^{4\pi}=0$. A failed $4\pi$ restoration signals a branch reconfiguration or broken return map, not a fermion spinor closure.

The fixed-normal minimal four-substep certificate is therefore not a spinor-support proof by itself. Its reduced chart lies outside the non-coplanar transport test when

$$
\det[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L]=0,
$$

and its raw self-root count $\Delta N_{\text{self}}=+2$ is even modulo two. Those rows remain useful for angular-momentum partitioning, but they do not supply a transported odd sheet parity for one retained $r_\star$.

### Same-Record Spinor-Label Pullback

The row-local condition becomes reusable when written as a pullback object. Let one retained branch record on window $W$ be

$$
\mathfrak R_\star(\theta;W)
=
\left(
\theta_W,
r_\star,
\widetilde r_\star(s),
\Gamma_{\mathrm{coupl}},
\mathcal C_{\mathbf J}
\right),
\qquad s\in[0,2],
$$

where $\widetilde r_\star(s)$ is the lifted row path, $\Gamma_{\mathrm{coupl}}$ is the coupling record, and $\mathcal C_{\mathbf J}$ is the angular-momentum certificate data. The row is downstream-admissible only if

$$
\Pi_{W,r_\star}^{2\pi}=1,
\qquad
\Pi_{W,r_\star}^{4\pi}=0,
$$

$$
\Delta_{\Pi_W}(r_\star)\le\varepsilon_{\Pi_W},
\qquad
\Delta_{\mathrm{gc}}(r_\star)\le\varepsilon_{\mathrm{gc}},
\qquad
\Delta_{\mathbf J}^{2\pi},
\Delta_{\mathbf J}^{4\pi}\le\varepsilon_{\mathbf J}.
$$

All spinor, weak, exchange, and fermion-metric labels must then be pulled back from the same gauge-quotient class:

$$
\mathcal L_\star(\theta;W,r_\star)
=
\mathsf P
\left(
[\widetilde r_\star]_{G_{\mathrm{gauge}}},
\theta_W
\right),
$$

with consumer projections

$$
\mathcal L_\star
\mapsto
\left(
s_{1/2},
h_{\mathrm{eff}},
\Sigma_{\mathrm{spin}}^{(L/R)},
\epsilon_{\mathrm{ex}},
\Pi_{\mathrm{weak}},
\Pi_{\mathrm{matter}}
\right).
$$

The fermionic exchange sign is therefore not an independent assignment:

$$
\epsilon_{\mathrm{ex}}(r_\star)
=
(-1)^{\Pi_{W,r_\star}^{2\pi}}
=
-1,
\qquad
\epsilon_{\mathrm{ex}}^{4\pi}
=
(-1)^{\Pi_{W,r_\star}^{4\pi}}
=
+1.
$$

The same-record admissibility residual is

$$
\Delta_{\mathrm{pull}}(\theta;W,r_\star)
=
\Delta_{\Pi_W}(r_\star)
+
\Delta_{\mathrm{gc}}(r_\star)
+
\Delta_{\mathbf J}(r_\star)
+
\sum_{c\in\{\mathrm{weak},\mathrm{ex},\mathrm{metric}\}}
d_c\!\left(
\lambda_c,
\Pi_c\mathcal L_\star
\right)
+
\mathcal S_{\mathrm{retune}}(\theta).
$$

The pass condition is

$$
\Delta_{\mathrm{pull}}(\theta;W,r_\star)\le\varepsilon_{\mathrm{pull}},
\qquad
\mathcal S_{\mathrm{retune}}(\theta)=0.
$$

The first proof step is gauge-quotient factorization. For every allowed gauge probe $g$ and every consumer projection $\Pi_c$,

$$
\Pi_c\mathsf P(g\cdot\widetilde r_\star,\theta_W)
=
\Pi_c\mathsf P(\widetilde r_\star,\theta_W).
$$

If this identity fails, the consumer label is chart-dependent and cannot be promoted as spinor, weak, exchange, or metric evidence. This proposition remains a theorem target until a non-coplanar retained row with quotient witness, doubled-path restoration, and angular-momentum residuals is populated.

The Lorentz-sector extension is a separate but connected theorem target. Once the relativistic observer sector has been recovered, the same ordered nested shell swarm frame must admit an effective spinor response compatible with the double cover

$$
\widetilde{\Lambda}_{\mathrm{eff}}:
SL(2,\mathbb C)\simeq\mathrm{Spin}^+(1,3)
\to
SO^+(1,3),
$$

whose spatial-rotation subgroup restricts to the $SU(2)$ lift above. This does not make $SL(2,\mathbb C)$ a primitive substrate symmetry of the Euclidean void. It states the recovery burden: boosts, rotations, spinor phase, helicity comparison, and fermion matter records in the effective relativistic observer sector must be describable by one lifted ordered-frame response after clock, ruler, and Noether-Sea metric closure are already in place.

Standard orbital quantization supplies the contrast case. For an effective orbital azimuthal mode,

$$
\psi_{\text{orb}}(\phi)=e^{im\phi},
\qquad
\psi_{\text{orb}}(\phi+2\pi)=\psi_{\text{orb}}(\phi)
\quad\Rightarrow\quad
m\in\mathbb{Z}.
$$

That is a $2\pi$ single-valuedness rule on an observer-level orbital envelope. A fermion spinor target cannot reuse that ordinary closure rule. It must explain why the visible $SO(3)$ orientation closes after $2\pi$ while the history-lifted nested shell swarm state changes sheet and only restores after $4\pi$.

For a central external envelope, the full observer-level orbital gate also includes angular regularity:

$$
\ell\in\mathbb N_0,
\qquad
m\in\{-\ell,\ldots,\ell\},
\qquad
L^2\Psi_{\mathrm{env}}
=
\ell(\ell+1)\hbar^2\Psi_{\mathrm{env}},
\qquad
L_z\Psi_{\mathrm{env}}
=
m\hbar\Psi_{\mathrm{env}}.
$$

This is a recovery target for $\Psi_{\mathrm{env}}$, the external envelope of an assembly in a declared potential chart. It is not a substitute for the ordered-frame $2\pi/4\pi$ support-row test above.

### Effective C/P/T Recovery Interface

The ordered-frame spinor target also carries the C/P/T burden inherited from standard fermion physics. The substrate proof does not need to import a particular representation of Dirac spinors, but it must recover the effective actions that those representations summarize. In the observer-level fermion chart:

- $C_{\mathrm{eff}}$ must map a fermion record to the corresponding charge-conjugate record by reversing the effective polarity bookkeeping and pro/anti orientation while preserving the appropriate spin-state comparison data.
- $P_{\mathrm{eff}}$ must reverse the effective spatial orientation used by the observer chart, including helicity sign when a momentum or propagation axis is part of the record.
- $T_{\mathrm{eff}}$ must reverse the effective motion and phase-flow record without turning the positive-energy comparison branch into an unphysical negative-energy sector.
- $(CPT)_{\mathrm{eff}}$ must return an admissible fermion-sector record in every validated regime, even though $C$, $P$, $T$, and their pairwise combinations may be violated by weak-sector and flavor-sector data.

A useful proof scaffold is to define these maps on an effective fermion record
$$
\mathfrak{f}_A
=
\left(
\Lambda_{\text{NC}},
\mathcal{A}_{\mathrm{ax}},
q_{\mathrm{eff}},
\mathbf{p}_{\mathrm{eff}},
\mathbf{S}_{\mathrm{eff}},
h_{\mathrm{eff}},
\Pi_{\mathrm{weak}},
\mathcal{P}
\right),
$$
where $\Lambda_{\text{NC}}$ is the legacy closure label, $\mathcal{A}_{\mathrm{ax}}$ is the axial inventory and axial-frame record, $h_{\mathrm{eff}}$ is the observer-level helicity when a propagation direction is present, and $\mathcal{P}$ is the provenance ledger needed to compare branches. The effective maps must first close as comparison operations:
$$
C_{\mathrm{eff}}^2
=
P_{\mathrm{eff}}^2
=
T_{\mathrm{eff}}^2
=
\mathrm{id}_{\mathrm{eff}},
\qquad
(CPT)_{\mathrm{eff}}\mathfrak{f}_A
\in
\mathfrak{F}_{\mathrm{fermion}}.
$$
They must then satisfy the observer-record residual
$$
\mathcal{R}_{\mathrm{CPT}}(A;\theta)
=
d_{\mathrm{obs}}\!\left(
\Pi_{\mathrm{obs}}(CPT)_{\mathrm{eff}}\mathfrak{f}_A,
\Pi_{\mathrm{obs}}\mathfrak{f}_{\bar A}
\right)
+
d_{\mathrm{inv}}\!\left(
(CPT)_{\mathrm{eff}}^2\mathfrak{f}_A,
\mathfrak{f}_A
\right)
+
\mathcal{R}_{\mathrm{weak/flavor}}(A;\theta),
$$
with $\mathfrak{f}_{\bar A}$ the effective antiparticle record and $\mathcal{R}_{\mathrm{weak/flavor}}$ carrying the observed C, P, T, CP, and flavor-sector violations that are allowed before the combined benchmark is tested. The residual passes only if the combined operation is admissible without erasing the weak chirality and generation/mixing ledgers.

The component action table makes the proof obligation explicit:

| Record component | $C_{\mathrm{eff}}$ | $P_{\mathrm{eff}}$ | $T_{\mathrm{eff}}$ | Combined benchmark |
| --- | --- | --- | --- | --- |
| $\Lambda_{\text{NC}}$ | map to the pro/anti-conjugate closure label | reverse the observer-facing orientation chart | reverse phase-flow order in the comparison chart | return an admissible closure label |
| $\mathcal{A}_{\mathrm{ax}}$ | swap effective polarity inventory while preserving axial-site admissibility | reflect the axial frame relative to the observer chart | reverse cycle orientation and phase ordering | preserve the allowed axial inventory class |
| $q_{\mathrm{eff}}$ | $q_{\mathrm{eff}}\mapsto-q_{\mathrm{eff}}$ | unchanged | unchanged | match the antiparticle charge record |
| $\mathbf{p}_{\mathrm{eff}}$ | unchanged as a charge-conjugation datum | $\mathbf{p}_{\mathrm{eff}}\mapsto-\mathbf{p}_{\mathrm{eff}}$ | $\mathbf{p}_{\mathrm{eff}}\mapsto-\mathbf{p}_{\mathrm{eff}}$ | recover the same mass-shell comparison branch |
| $\mathbf{S}_{\mathrm{eff}}$ | preserve spin comparison data while conjugating the carrier record | treat spin as axial under spatial reflection | reverse the motion-coupled comparison orientation | preserve spin magnitude and $4\pi$ closure class |
| $h_{\mathrm{eff}}$ | map to the antiparticle helicity comparison | flip helicity when momentum is reflected | flip helicity when motion is reversed | restore the allowed helicity comparison after the combined operation |
| $\Pi_{\mathrm{weak}}$ | map particles to antiparticles without inventing right-handed charged-current coupling | expose the parity-violating weak-sector mismatch as an effective violation | expose allowed T or CP violations as flavor-sector residuals | leave $(CPT)_{\mathrm{eff}}$ compatible with validated weak data |
| $\mathsf{s}_{\mathrm{sh}}$ | preserve generation shielding class unless the reaction ledger changes it | preserve generation shielding class | preserve generation shielding class | commute with $T_{\mathrm{gen}}$ up to the generation residual |
| $\mathcal{P}$ | conjugate source and product provenance rows | reverse the observer chart, not the substrate history | compare the reversed effective process with the admissible history record | keep energy, $\mathbf{p}$, $\mathbf{J}$, polarity, and remnant rows balanced |

The local proof target is therefore not just a $4\pi$ lift. It is a lifted nested shell swarm state whose coarse spinor chart admits effective $C_{\mathrm{eff}}$, $P_{\mathrm{eff}}$, and $T_{\mathrm{eff}}$ operations compatible with weak chirality, charge conjugation, and the generation/mixing ledgers. If no such effective operations can be derived from $\Lambda_{\text{NC}}$, then the ordered-frame route may reproduce a rotation double cover while still failing the fermion symmetry benchmark.

### Spinor-to-Metric Compatibility Residual

The ordered-frame spinor target is also a dependency for fermion matter channels in the effective metric program. A metric record may advance scalar, photon, clock, ruler, and stress-channel closure independently, but a claim that fermion stress or weak-chiral matter dynamics is fully metric-compatible must include the spinor ledger. For a branch record $\theta$ on a record window $W$, use
$$
\mathcal{R}_{\mathrm{spin\to metric}}(\theta;W)
=
w_{4\pi}\Delta_{4\pi}(\theta;W)
+w_{\mathrm{op}}\Delta_{\mathrm{spin\,op}}(\theta;W)
+w_{\mathrm{weak}}\Delta_{\mathrm{WCT}}(\theta;W)
+w_{\mathrm{mat}}\mathcal{R}_{\mathrm{matter}}(\theta;W)
+w_{\mathrm{ctx}}\Delta_{\mathrm{ctx}}(\theta;W).
$$

Here $\Delta_{4\pi}$ measures failure of the $2\pi/4\pi$ ordered-frame lift, $\Delta_{\mathrm{spin\,op}}$ measures failure to recover the spin-operator and Stern-Gerlach record algebra on the declared apparatus contexts, $\Delta_{\mathrm{WCT}}$ measures mismatch between the spinor/helicity ledger and the weak-coupling-triad exposure record, $\mathcal{R}_{\mathrm{matter}}$ measures failure of the fermion matter channel to project into the same Noether-Sea metric record, and $\Delta_{\mathrm{ctx}}$ is the apparatus-context residual from [Quantum Operator Mapping](quantum-operator-mapping.md#apparatus-context-guardrail). The residual passes only when all terms use the same $\theta$; otherwise the spin proof, weak handedness, and metric matter channel have been fitted by separate records rather than recovered as one closure.

The $4\pi$ term is row-local. For a retained active-root row $r_\star$ on the same record window, the downstream consumer may use the spinor label only when

$$
\Pi_{W,r_\star}^{2\pi}=1,
\qquad
\Pi_{W,r_\star}^{4\pi}=0,
\qquad
\Delta_{\Pi_W}(r_\star)\le\varepsilon_{\Pi_W},
\qquad
\Delta_{\mathrm{gc}}(r_\star)\le\varepsilon_{\mathrm{gc}},
$$

with the associated angular-momentum residuals below tolerance on the same branch record. This is a reuse rule, not a new ontology: weak exposure, exchange statistics, and fermion metric compatibility may consume spin/helicity only from the retained row that also carries the causal-writhe parity, quotient, doubled-path, gauge-control, and angular-momentum data.

This is a theorem target, not a completed proof. The causal-action functional adds a promising topological handle through causal writhe,

$$
Wr_c[\gamma]
=
\iint_{\mathcal{L}_{\text{causal}}}
\mathrm{sign}\!\big(\mathbf{v}(t)\times\mathbf{v}(t')\cdot\mathbf{r}\big)\,d\tau,
$$

which measures handedness of the self-interaction pattern. The open problem is to lift that kind of causal-locus invariant from one worldline or branch family to the full ordered nested shell swarm frame and then prove the $4\pi$ return behavior.

## The $h$ and $\hbar$ Convention

The standard constants should be kept distinct.

- Use $h$ for closed-cycle action.
- Use $\hbar=h/(2\pi)$ for radian-normalized rotational action, angular momentum, spin, helicity, and rotation generators.

For a circular or phase-like degree of freedom,

$$
A_{\text{cycle}}
=
\oint p\,dq
=
2\pi I.
$$

The Bohr-Sommerfeld form

$$
\oint p\,dq=nh
$$

is equivalent to

$$
I=n\hbar.
$$

The energy relation follows the same distinction. If $f$ is ordinary frequency in cycles per unit time and $\omega=2\pi f$ is angular frequency, then

$$
E=hf=\hbar\omega.
$$

Thus a full causal phase-cycle transaction is naturally counted in units of $h$, while the angular-momentum generator conjugate to a phase angle is naturally counted in units of $\hbar$.

The same convention supplies the action-measure target needed by the lower recordable basin-measure program in [Wavefunction Ontology](../../quantum/wavefunction-ontology.md#lower-bound-on-recordable-basin-measure). Suppose a record-facing reduced chart closes to $n$ action-angle channels $(I_i,\theta_i)$ with $\theta_i\sim\theta_i+2\pi$, and suppose the Master-Equation closure, root-ledger admissibility, and apparatus channel derive the increment $\Delta I_i=\hbar$ rather than inserting it as a postulate. The local action cell in that chart is then
$$
\Delta\Gamma_{\text{cell}}
=
\prod_{i=1}^{n}
\left(
\int_{I_i}^{I_i+\hbar}dI_i
\int_0^{2\pi}d\theta_i
\right)
=
(2\pi\hbar)^n
=
h^n.
$$
This is not yet a derivation of quantum discreteness. It is the theorem target that would let a finite recordable basin measure reduce to $\mu_0(\mathcal{Q},W)\to C_{\mathcal{Q},W}h^n$, with $C_{\mathcal{Q},W}$ fixed by quotienting, apparatus coupling, inaccessible root-ledger variables, and the declared coarse-graining rather than chosen after the fact.

To make the chart test explicit, the reduced action-angle variables should report a local canonical-chart residual before any action-cell count is accepted:
$$
\epsilon_{\mathrm{can}}(\mathcal{Q},W,T)
=
\sup_{a,b}
\max\left(
\left|\{I_a,I_b\}_{\mathcal{Q},W,T}\right|,
\left|\{\theta_a,\theta_b\}_{\mathcal{Q},W,T}\right|,
\left|\{I_a,\theta_b\}_{\mathcal{Q},W,T}-\delta_{ab}\right|
\right).
$$
Here $\{\cdot,\cdot\}_{\mathcal{Q},W,T}$ is the effective bracket induced by the retained coarse-graining on the same record window used for the basin-measure claim. The chart is admissible for action-cell comparison only when $\epsilon_{\mathrm{can}}\le\varepsilon_{\mathrm{can}}$ and the variables are fixed by Master-Equation closure, root-ledger admissibility, and apparatus recordability rather than by a representation chosen to produce a desired count.

The corresponding state-count residual should compare physical basin records with action cells in a declared record domain $D$:
$$
\Delta_{\mathrm{cell}}(D)
=
\frac{
\left|N_{\mathrm{basin}}(D)-N_{\mathrm{cell}}(D)\right|
}{
N_{\mathrm{cell}}(D)+1
}.
$$
Here $N_{\mathrm{basin}}(D)$ counts independently recordable basin alternatives derived from the delayed dynamics, while $N_{\mathrm{cell}}(D)$ counts the $h^n$ action cells that remain after quotienting inaccessible root-ledger and apparatus-equivalent variables. A small $\Delta_{\mathrm{cell}}$ supports an effective action-cell comparison; it does not by itself promote the chart to substrate ontology.

The action-angle chart should therefore be treated as a comparison chart selected after the recordable basin family has been fixed, not as a free quantization rule. In ordinary Bohr-Sommerfeld language one counts integral action leaves. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ closure route, the corresponding count is accepted only when the same Master-Equation branch record, root-ledger admissibility, and apparatus channel already identify the leaves as independently recordable alternatives. A singular or representation-dependent action-angle chart that changes the count without changing those physical records is a failed effective chart, not a new state sector.

For a nested shell swarm transaction, the compact bookkeeping statement is

$$
\Delta A_{\text{cycle}}=h,
\qquad
\Delta I_{\text{tot}}=\hbar,
$$

with

$$
\Delta I_I+\Delta I_M+\Delta I_O+\Delta I_{\text{wake}}
=
\hbar
$$

only after choosing the relevant projected action-angle channel. That scalar statement should not be mistaken for the full vector conservation law.

## Foundation-Up Closure Route

The orbital lesson should be used as a method, not merely as a dictionary. In ordinary atomic-orbital theory, one chooses the angular configuration space, imposes single-valuedness and finite angular behavior, and then reads the surviving labels as quantum numbers. The clean generalization is that ordinary orbital labels come from closure and regularity on an effective angular envelope, while nested shell swarm labels should come from closure, root-ledger admissibility, normal-triad holonomy, and stability of the three shell binaries. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this style of reasoning begins one layer lower: first classify the stable nested shell swarm closures, then ask which causal-wake envelopes and observer-level orbital labels they support.

For a nested shell swarm, the first closure object is the three-shell phase and root ledger over a stable return period $T$. A useful theorem-target form is

$$
\Theta_a(T)
=
\int_0^T\omega_a(t)\,dt
+
\Phi_a^{\text{root}}(T)
+
\Phi_a^{\text{frame}}(T)
=
2\pi k_a,
\qquad
k_a\in\mathbb{Z},
\qquad
a\in\{I,M,O\}.
$$

Here $a$ labels the inner, middle, and outer binary layers, $\Phi_a^{\text{root}}(T)$ records the phase contribution of the active self-hit, partner-hit, and inter-layer causal-root branches during the closure period, and $\Phi_a^{\text{frame}}(T)$ records phase accumulated by transport of the binary-plane frame. The important claim is integer phase winding over a stable closed cycle, not that each instantaneous frequency must be an integer by itself.

Inter-layer phase locks add relative closure equations. For a branch with integer weights $p_a,p_b$,

$$
\Theta_{ab}(T)
=
p_b\Theta_a(T)-p_a\Theta_b(T)+\Phi_{ab}^{\text{root}}(T)
=
2\pi k_{ab}.
$$

The special dyadic candidate is therefore a possible selected lock, not an axiom: $k_O:k_M:k_I=1:m:n$, with $1:2:4$ only after the cancellation functional selects it.

An accepted energy/action change should therefore move the core between admissible integer-and-root ledgers:

$$
\Delta A_{\text{cycle}}=h
\quad\Longrightarrow\quad
\bigl(k_I,k_M,k_O,\mathcal R\bigr)
\mapsto
\bigl(k_I,k_M,k_O,\mathcal R\bigr)
+
\bigl(\Delta k_I,\Delta k_M,\Delta k_O,\Delta\mathcal R\bigr),
$$

subject to the energy, angular-momentum, phase-closure, and root-admissibility equations above. This is the foundation-up version of the quantization question: energy levels are not added as external quantum labels; they are the stable return classes of the delayed nested shell swarm geometry.

When the only question is energy-level closure, the schematic integer-and-root ledger above is enough. When the question is spin, ordered-frame chirality, weak chirality, or any broader quantum-number recovery, the branch must instead be tracked by the reduced legacy label $\Lambda_{\text{NC}}$. That label keeps the integer windings, causal-root ledgers, inter-layer phase-lock data, and candidate chirality branch in one proof object. It does not prove the holonomy or chirality claim by definition; it prevents later quantum-number language from floating free of the swarm closure data that would have to derive it.

The candidate nested shell swarm closure labels are therefore:

- Layer winding vector $(k_I,k_M,k_O)$, generated by phase closure.
- Inter-layer lock integers $k_{IM},k_{MO},k_{IO}$, generated by relative closure.
- Causal-root ledger class $\mathfrak R=\{\mathcal R_a,\mathcal R_{ab}\}$, including self-hit and partner-hit branch counts, causal-locus winding classes, and fold-parity constraints.
- Normal-triad holonomy class, generated by ordered-frame transport:

$$
H_{\text{core}}(T)
=
\mathcal P\exp\!\int_0^T\widehat{\boldsymbol\Omega}_{\text{prec}}(t)\,dt.
$$

This return is $SO(3)$-like if the full lifted state returns after $2\pi$, and spinor-like only if the visible normal triad returns after $2\pi$ while the history-lifted ledger restores after $4\pi$.

- Chirality or causal-writhe parity, not merely $\operatorname{sgn}\det[\hat{\mathbf n}_I,\hat{\mathbf n}_M,\hat{\mathbf n}_O]$, but a component-resolved causal-writhe candidate tied to $\mathfrak R$.
- Group-velocity exposure data: signs and projection classes of $\hat{\mathbf n}_a$ and layer angular-momentum channels relative to $\mathbf V_{\text{cm}}$.

Group velocity alters closure through the causal-root equation. For an internal source-receiver displacement $\mathbf d$ in a moving core,

$$
\|\mathbf d+\mathbf V_{\text{cm}}\Delta\|=c_\star\Delta
$$

gives the positive branch

$$
\Delta_{\mathbf V}
=
\frac{
\mathbf V_{\text{cm}}\cdot\mathbf d
+
\sqrt{
(\mathbf V_{\text{cm}}\cdot\mathbf d)^2
+
(c_\star^2-\|\mathbf V_{\text{cm}}\|^2)\|\mathbf d\|^2
}
}
{c_\star^2-\|\mathbf V_{\text{cm}}\|^2}.
$$

Forward and rear sectors therefore accumulate different phase delays and Jacobian weights. Combined with the transverse causal budget

$$
c_{\perp}
=
c_\star\sqrt{1-\frac{\|\mathbf V_{\text{cm}}\|^2}{c_\star^2}},
$$

this makes some rest-branch closures inadmissible at high velocity, drives oblate causal-wake envelopes, changes shielding exposure, and can force precession or planar alignment. The primitive wake speed remains $c_f$ in the branch equation; $c_\star$ must be declared before using the result, because primitive wake-intersection, Noether-Sea dressed clock/ruler comparison, and photon-channel synchronization are different closure tests.

At larger scale, the emitted causal-wake pattern of such a closed core should have an effective far-zone angular decomposition. A schematic recovery target is

$$
\mathcal W_{\lambda_C}(r,\hat{\mathbf r},t)
\sim
\sum_{L,M,p}
A_{LMp}^{(\lambda_C)}(r)\,
Y_L^M(\hat{\mathbf r})\,
e^{-i\Omega_p(t-r/c_f)},
$$

where $\lambda_C$ abbreviates the selected nested shell swarm closure label, and $\mathbf k=(k_I,k_M,k_O,\mathcal R)$ is its energy-level reduction. This is not a new substrate field; it is an effective description of the superposed causal wakes after coarse-graining. The atomic-orbital program is then to show that an electron assembly in the nuclear and Noether-Sea environment locks to stable resonance basins whose angular part recovers $Y_\ell^m$.

The resulting proof route is:

$$
\text{nested shell swarm integer closure}
\longrightarrow
\text{structured causal-wake envelope}
\longrightarrow
\text{electron-assembly resonance basin}
\longrightarrow
\text{observer-level labels }(n,\ell,m).
$$

This route strengthens the distinction rather than weakening it. The internal nested shell swarm spinor closure still targets $4\pi$ fermion behavior, while the atomic orbital envelope still targets $2\pi$ observer-level angular closure. The possible unification is that both are selected by geometry, phase closure, and causal-root admissibility at different levels of description.

The failure modes are part of the proof program. The route is disciplined or falsified if no candidate closure class has a positive non-symmetry Floquet gap, if root ledgers change continuously rather than through branch or fold events, if the ordered frame has trivial $2\pi$ holonomy where spinor closure is required, if the proposed lift fails to restore after $4\pi$, if group-velocity anisotropy behaves like dissipative drag in stable atoms, if far-zone coefficients fail to converge or fail to recover the spherical-harmonic central limit, or if a derivation conflates internal nested shell swarm rotational action with observer-level atomic orbital angular momentum.

## Bridge to Standard Quantum Mechanics

The transition to standard quantum mechanics proceeds through successive coarse-grainings.

| Step | Standard quantum object | $\mathbb{A}\mathbb{A}\mathbb{A}$ bridge target |
| --- | --- | --- |
| 1 | Classical-looking orbital angular momentum $\mathbf{L}$ | Assembly center-of-motion or binary-circulation ledger in an effective chart. It is not the same as the primitive architrino ontology. |
| 2 | Internal spin $\mathbf{S}$ | Transformation class of an internal assembly frame or vector mode. For fermions, this is the ordered-frame spinor target; for photons, it is transverse planar-pair helicity. |
| 3 | Total angular momentum $\mathbf{J}$ | Conserved coarse ledger after orbital, internal, apparatus, and wake terms are projected into the observer-level channel. |
| 4 | Quantum number labels $\ell,s,j,m$ | Stable basin labels of the effective state space after coarse-graining over inaccessible path-history variables. |
| 5 | Operators $\hat{J}_i$ | Effective generators of rotations on the coarse state space, recovered only after the assembly response closes under rotations. |
| 6 | Measurement projections | Finite-time apparatus coupling that drives the assembly ledger across a basin boundary, producing a record. |

In standard angular-momentum theory, the effective operators satisfy

$$
[\hat{J}_i,\hat{J}_j]
=
i\hbar\,\epsilon_{ijk}\hat{J}_k,
$$

with eigenvalue relations

$$
\hat{\mathbf{J}}^2|j,m\rangle
=
j(j+1)\hbar^2|j,m\rangle,
\qquad
\hat{J}_{\hat{\mathbf{m}}}|j,m\rangle
=
m\hbar|j,m\rangle.
$$

From the standpoint of $\mathbb{A}\mathbb{A}\mathbb{A}$, these are not primitive postulates about point entities. They are the observer-level representation algebra that must emerge when stable assemblies are probed by rotation-sensitive apparatuses. The algebra becomes credible only after the internal ordered-frame dynamics and measurement coupling recover the same projection statistics.

## Standard Recovery Gates

The standard quantum formulas are recovery gates, not mechanisms to import unchanged. For an effective central-potential orbital envelope, the observer-level angular solutions must recover

$$
\hat{\mathbf L}^2Y_\ell^m
=
\ell(\ell+1)\hbar^2Y_\ell^m,
\qquad
\hat L_zY_\ell^m
=
m\hbar Y_\ell^m,
$$

with

$$
\ell\in\mathbb N_0,
\qquad
m\in\{-\ell,-\ell+1,\ldots,\ell\}.
$$

The $m$ quantization is the same $2\pi$ azimuthal closure rule written above, while the allowed $\ell$ spectrum is the regularity / finite-solution condition for the angular envelope. Both belong to observer-level orbital quantum numbers.

For a fermion assembly, the separate internal-spin recovery gate is

$$
\hat{\mathbf S}^2|s,m_s\rangle
=
s(s+1)\hbar^2|s,m_s\rangle,
\qquad
s=\frac{1}{2},
\qquad
m_s=\pm\frac{1}{2}.
$$

The nested shell swarm burden is to supply the effective spinor coordinate whose apparatus projection gives the two Stern-Gerlach records $+\hbar/2$ and $-\hbar/2$. Those records should be basin outcomes of the full angular-momentum ledger, not evidence for a tiny pre-existing arrow inside the target.

## Orbital Angular Momentum

Observer-level orbital angular momentum $\mathbf{L}$ belongs to spatial motion around a center or to an orbital degree of freedom in an effective wave description. It should not be conflated with internal binary action inside a particle assembly.

The hydrogen $1s$ state is the warning case. In standard quantum numbers, the electron's atomic orbital quantum number is $\ell=0$. That statement concerns the observer-level atomic wavefunction. If the electron assembly contains internal nested shell swarm rotational action, that action is not the same object as the atomic $\mathbf{L}$. The atomic label describes the coarse motion of the electron assembly relative to the nucleus; the internal nested shell swarm ledger describes the assembly's own organized causal history.

The mapping target is therefore two-stage:

1. derive internal rotational-action ledgers from architrino and nested shell swarm dynamics;
2. derive observer-level orbital quantum numbers from the effective envelope of an assembly in an external potential.

Skipping that distinction would make internal circulation falsely appear as atomic orbital angular momentum.

### Effective Angular-Envelope Recovery Lemma

The safe recovery statement is conditional. Suppose the native extraction map supplies a record-facing central envelope

$$
\Psi_{\mathrm{env}}
=
\mathcal E_{\mathrm{orb}}
\left(
B_e,
\theta_{\mathrm{sea}}^{(\ell)},
V_{\mathrm{eff}},
W
\right)
$$

whose envelope residual and internal-ledger separation rows pass in the declared chart. If the angular part separates as $\Psi_{\mathrm{env}}(r,\theta,\phi)=R(r)Y(\theta,\phi)$, and $Y$ is a regular single-valued function on $S^2$ in the domain of the self-adjoint angular operator, then

$$
-\Delta_{S^2}Y=\lambda Y,
\qquad
Y(\theta,\phi+2\pi)=Y(\theta,\phi)
\quad\Longrightarrow\quad
\lambda=\ell(\ell+1),
\quad
\ell\in\mathbb N_0,
\quad
m\in\{-\ell,\ldots,\ell\}.
$$

Consequently the observer-level orbital readouts recover

$$
L^2\Psi_{\mathrm{env}}
=
\ell(\ell+1)\hbar^2\Psi_{\mathrm{env}},
\qquad
L_z\Psi_{\mathrm{env}}
=
m\hbar\Psi_{\mathrm{env}}.
$$

The theorem-grade part here is the level separation. Once $\mathcal E_{\mathrm{orb}}$ has supplied a valid central envelope, the angular spectrum is ordinary $S^2$ mathematics; the remaining $\mathbb{A}\mathbb{A}\mathbb{A}$ burden is deriving $\mathcal E_{\mathrm{orb}}$ from the electron assembly branch, nuclear causal-wake envelope, and local Noether-Sea record without importing the orbital postulate or using internal spinor data to force the label.

## Spin

Spin is the most delicate bridge because standard quantum mechanics treats it as intrinsic. In $\mathbb{A}\mathbb{A}\mathbb{A}$, "intrinsic" should be read as "not reducible to observer-level orbital motion of the whole assembly," not as "primitive property of a point architrino."

The repo-wide spin taxonomy is:

| Effective spin label | Geometry target |
| --- | --- |
| Spin-$0$ | Scalar or radial response with no attached orientation axis. |
| Spin-$\tfrac{1}{2}$ | Ordered non-coplanar nested shell swarm frame with $4\pi$ spinor closure. |
| Spin-$1$ | Vector channel with one distinguished axis and transverse or helical structure. |
| Spin-$2$ | Tensor-like transverse-traceless deformation data. |

This taxonomy is a bridge, not a proof. It tells the corpus where to look for the mechanism behind each spin label. The proof burden is to derive the transformation and measurement rules from the underlying assembly dynamics.

## Downstream Use

Downstream chapters should use this bridge as a dictionary, not as a completed proof. The nucleon spin budget in [Nucleon Structure](../../nuclear-atomic/nucleon-structure.md), the gluon vector-channel account in [Gluons and the Strong Force: Geometric Origins](../../assemblies/bosons/gluons.md), the rho/Delta spin and Pauli discussions in [Transient Hadrons: Mesons and Δ Resonances](../../assemblies/mesons/mesons.md), the exchange-statistics program in [Fermi-Dirac and Bose-Einstein Statistics](../../quantum/quantum-statistics.md), atomic and molecular spin/exclusion language in [Atomic Structure](../../nuclear-atomic/atomic-structure.md), [Atomic Spectra](../../nuclear-atomic/atomic-spectra.md), and [Molecular Geometry](../../nuclear-atomic/molecular-geometry.md), and photon/vector-mode language in [Electroweak Bosons](../../assemblies/bosons/electroweak-bosons.md), [Mode Taxonomy](../../interactions/mode-taxonomy.md), and [Particle Masses](../../assemblies/particle-masses.md) all inherit the open single-assembly angular-momentum ledger and ordered-frame spinor closure target.

Second-ring consumers inherit the same limitation. Photon records in [Reaction Ledger](../../validation/reaction-ledger.md), [Reaction-Cosmology Provenance Ledger](../../validation/reaction-cosmology-provenance-ledger.md), [Bremsstrahlung](../../reactions/bremsstrahlung.md), and [Synchrotron Cascades](../../reactions/synchrotron.md), weak helicity selection in [Weak Mixing and CKM](./weak-mixing-ckm.md), Bell/CHSH response claims in [Bell's Theorem](./bell-theorem.md), Cesium hyperfine clock claims in [Architrino and SI Base Units](../../validation/architrino-si-base-units.md), and boundary-helicity proxy language in [Horizon Chirality and Planar Spin](../../spacetime/horizon-chirality.md) may state observer-level labels and validation targets. They should not use those labels as independent derivations of spin, Pauli exclusion, spin-statistics closure, photon polarization, vector-mode spin, weak handedness, spin-measurement response, Bell correlations, or hyperfine spin coupling. The common discipline is same-record consumption: a downstream claim may use the spinor, helicity, or weak-handedness label only from the branch record that also carries the relevant angular-momentum, apparatus, event-balance, or exposure residuals.

## Helicity and Vector Modes

Helicity is a projection onto a propagation or momentum axis. It should not be used for every planar circulation sign.

For a vector mode with propagation direction $\hat{\mathbf{p}}$, the standard helicity target is

$$
\lambda_{\text{hel}}
=
\frac{\mathbf{S}\cdot\hat{\mathbf{p}}}{\hbar}.
$$

For photons, the target is strict. A free photon has no rest frame and no physical longitudinal polarization in the validated free-space regime. Its observer-level spin information appears as helicity $\pm1$. The $\mathbb{A}\mathbb{A}\mathbb{A}$ photon model must therefore show how the coaxial contra-rotating pro/anti planar pair carries exactly two transverse modes, helicity $\pm1$, Malus' law, and no unacceptable longitudinal free mode.

The photon scaffold is a transverse ledger, not a rest-frame spin ledger. Let $\hat{\mathbf{e}}$ be the propagation axis supplied by the Gate A kinematic branch, and choose orthonormal transverse axes $(\hat{\mathbf{u}},\hat{\mathbf{v}})$ with $\hat{\mathbf{u}}\cdot\hat{\mathbf{e}}=\hat{\mathbf{v}}\cdot\hat{\mathbf{e}}=0$. The effective Gate B state can be written as

$$
\mathbf{a}_{\perp}
=
a_u\hat{\mathbf{u}}+a_v\hat{\mathbf{v}},
\qquad
|a_u|^2+|a_v|^2=1.
$$

This notation is only a bridge scaffold until the planar-pair capture variables are derived from the architrino ledger. The circular basis

$$
\boldsymbol{\epsilon}_{\pm}
=
\frac{1}{\sqrt{2}}
\left(\hat{\mathbf{u}}\pm i\hat{\mathbf{v}}\right)
$$

is the target bridge to helicity. A helicity eigenmode must first be stated as a substrate angular-momentum ledger. Let

$$
\mathbf J_{\gamma}^{\mathrm{sub}}
=
\mathbf J_{\mathrm{pro}}
+
\mathbf J_{\mathrm{anti}}
+
\mathbf J_{\gamma,\mathrm{wake}},
$$

where the terms are the photon-side pro/anti planar-pair and photon-carried wake contributions. Source remnant, recoil, material handoff, and unrelated medium rows belong to the event ledger, not inside the photon-only helicity vector. The helicity residual is

$$
\Delta_{\mathrm{hel}}^\gamma
=
\left|
\frac{
\hat{\mathbf e}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}
}{\hbar}
-
\lambda_{\mathrm{hel}}
\right|
+
\frac{
\left\|
P_{\perp}\mathbf J_{\gamma}^{\mathrm{sub}}
\right\|
}{
\hbar+\varepsilon_J
},
\qquad
\lambda_{\mathrm{hel}}\in\{+1,-1\},
$$

where $P_{\perp}$ projects transverse to the propagation axis. Linear polarization is then a real transverse-axis state, while circular polarization is a quarter-cycle phase relation between the two transverse axes. The scalar summary $\hat{\mathbf e}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}\approx\lambda_{\mathrm{hel}}\hbar$ is allowed only after Gate A, the substrate planar-pair rows, and the event-balance rows pass. The proof burden is to show that the coaxial contra-rotating pro/anti planar pair carries this spin-$1$ transverse ledger and not a scalar, spinor, or longitudinal free mode.

The useful algebraic consequence is an event-window helicity projection lemma. For a finite radiative event window,

$$
\Delta\mathbf J_{\mathrm{src}}^{0}
=
\mathbf J_{\gamma}^{\mathrm{sub}}
+
\mathbf J_{\mathrm{recoil}}^{0}
+
\mathbf J_{\mathrm{med}}^{0}
+
\mathbf J_{\mathrm{wake}}^{0}
+
\mathbf J_{\mathrm{handoff}}^{0}
+
\mathbf J_{\mathrm{rem}}^{0}.
$$

Define the balance defect

$$
\mathbf B_{\gamma}^{0}
=
\Delta\mathbf J_{\mathrm{src}}^{0}
-
\mathbf J_{\gamma}^{\mathrm{sub}}
-
\mathbf J_{\mathrm{recoil}}^{0}
-
\mathbf J_{\mathrm{med}}^{0}
-
\mathbf J_{\mathrm{wake}}^{0}
-
\mathbf J_{\mathrm{handoff}}^{0}
-
\mathbf J_{\mathrm{rem}}^{0}
$$

and suppose the substrate row has no transverse spin leakage. If $\mathbf B_{\gamma}^{0}=\mathbf 0$, projecting along $\hat{\mathbf e}$ gives

$$
\lambda_{\mathrm{hel}}
=
\frac{\hat{\mathbf e}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}}{\hbar}
=
\frac{
\hat{\mathbf e}\cdot
\left(
\Delta\mathbf J_{\mathrm{src}}^{0}
-
\mathbf J_{\mathrm{recoil}}^{0}
-
\mathbf J_{\mathrm{med}}^{0}
-
\mathbf J_{\mathrm{wake}}^{0}
-
\mathbf J_{\mathrm{handoff}}^{0}
-
\mathbf J_{\mathrm{rem}}^{0}
\right)
}{\hbar},
\qquad
\lambda_{\mathrm{hel}}\in\{+1,-1\}.
$$

With a nonzero but small balance defect, the projection error is bounded by

$$
\left|
\frac{\hat{\mathbf e}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}}{\hbar}
-
\frac{
\hat{\mathbf e}\cdot
\left(
\Delta\mathbf J_{\mathrm{src}}^{0}
-
\mathbf J_{\mathrm{recoil}}^{0}
-
\mathbf J_{\mathrm{med}}^{0}
-
\mathbf J_{\mathrm{wake}}^{0}
-
\mathbf J_{\mathrm{handoff}}^{0}
-
\mathbf J_{\mathrm{rem}}^{0}
\right)
}{\hbar}
\right|
\le
\frac{\|\mathbf B_{\gamma}^{0}\|}{\hbar}.
$$

Thus photon helicity is not an isolated scalar assertion: it is the propagation-axis projection of the same source-depletion, recoil, wake, handoff, remnant, and photon substrate ledger, with its error controlled by the event-window balance defect.

Analyzer coupling belongs to the same Gate B ledger. The transverse projector is

$$
P_{\perp}^{ab}
=
h^{ab}-\hat{e}^a\hat{e}^b.
$$

An analyzer axis $\hat{\mathbf{a}}$ must satisfy $P_{\perp}\hat{\mathbf{a}}=\hat{\mathbf{a}}$. For a linearly polarized photon axis $\hat{\mathbf{e}}_\gamma$ and analyzer offset $\theta$, the target capture rule is

$$
\mathcal{A}_{\text{pass}}
\propto
\hat{\mathbf{e}}_\gamma\cdot\hat{\mathbf{a}}
=
\cos\theta,
\qquad
P_{\text{pass}}
=
|\mathcal{A}_{\text{pass}}|^2
=
\cos^2\theta.
$$

This is the Malus-law boundary condition on the native derivation. The squared-amplitude step comes from treating the analyzer as a projector onto an accepted transverse capture channel and then measuring positive accepted action, not the signed transverse component itself.

Let $a_\perp^a$ denote the complexified transverse ledger components of the incoming planar pair, normalized by the positive action ledger

$$
\mathcal{I}_{\perp}
=
h_{ab}\,\overline{a_\perp^a}a_\perp^b.
$$

The analyzer axis defines a rank-one accepted-channel projector inside the transverse plane:

$$
A^a{}_{b}
=
\hat a^a\hat a_b,
\qquad
A^a{}_{b}P_{\perp}^{b}{}_{c}=A^a{}_{c}.
$$

The signed coherent capture amplitude is linear,

$$
\mathcal{A}_{\text{pass}}
=
\hat a_a a_\perp^a,
$$

because the analyzer channel adds the phase-matched transverse ledger component before a material record forms. The positive action available to the accepted channel is the quadratic ledger norm

$$
\mathcal{I}_{\text{pass}}
=
\overline{a_\perp^a}\,\hat a_a\hat a_b\,a_\perp^b
=
\left|\hat a_a a_\perp^a\right|^2.
$$

The native capture measure is therefore the normalized positive action fraction

$$
\mu_{\text{pass}}(\hat{\mathbf a}\mid a_\perp)
=
\frac{\mathcal{I}_{\text{pass}}}{\mathcal{I}_{\perp}}
=
\frac{\left|\hat a_a a_\perp^a\right|^2}
{h_{ab}\,\overline{a_\perp^a}a_\perp^b}.
$$

The rejected material channel is the orthogonal transverse complement

$$
R^a{}_{b}=P_{\perp}^{a}{}_{b}-A^a{}_{b},
\qquad
\mu_{\text{rej}}
=
\frac{\overline{a_\perp^a}R_{ab}a_\perp^b}{\mathcal{I}_{\perp}},
\qquad
\mu_{\text{pass}}+\mu_{\text{rej}}=1.
$$

At the material level, $\hat{\mathbf a}$ is not a free observer label. It is supplied by an analyzer assembly $M_{\hat{\mathbf a}}$ whose oriented lattice, stress state, and phase-locked capture geometry leave exactly one stable transverse relocking family for the incoming planar-pair ledger:

$$
\mathcal{C}_{\text{pass}}(\hat{\mathbf a})
=
\{\xi\,\hat a^a:\xi\in\mathbb{C}\}
\subset\operatorname{im}P_{\perp}.
$$

The corresponding material analyzer projector is the orthogonal projector onto that accepted family:

$$
A^2=A,
\qquad
A^{\dagger}=A,
\qquad
\operatorname{tr}_{\perp}A=1,
\qquad
A^a{}_{b}=\hat a^a\hat a_b.
$$

This is why the accepted channel is rank one inside $P_{\perp}$. A rank-two accepted channel would pass the whole transverse ledger and would not be a linear analyzer; a rank-zero channel would be an opaque absorber. The nontrivial ideal linear analyzer has one accepted transverse material relocking direction and one rejected transverse complement.

The rejected component remains transverse:

$$
a_{\text{rej}}^a
=
R^a{}_{b}a_\perp^b,
\qquad
\hat e_a a_{\text{rej}}^a=0.
$$

It therefore cannot be reclassified as a longitudinal free photon mode. In a rejected event, its action routes locally into reflection, absorption, scattering, heat, or another allowed material update, with the local ledger closing as

$$
\Delta E_{\gamma}
+\Delta E_{M}
+\Delta E_{\text{wake}}
+\Delta E_{\text{sea}}
=0,
$$

$$
\Delta\mathbf{p}_{\gamma}
+\Delta\mathbf{p}_{M}
+\Delta\mathbf{p}_{\text{wake}}
+\Delta\mathbf{p}_{\text{sea}}
=\mathbf{0},
$$

and

$$
\Delta\mathbf{J}_{\gamma}
+\Delta\mathbf{J}_{M}
+\Delta\mathbf{L}_{\text{wake}}
+\Delta\mathbf{J}_{\text{sea}}
=\mathbf{0}.
$$

For a linearly polarized photon with $a_\perp^a=\hat e_\gamma^a$ and $\|\hat{\mathbf e}_\gamma\|=1$, this gives

$$
\mu_{\text{pass}}
=
\left|\hat{\mathbf a}\cdot\hat{\mathbf e}_\gamma\right|^2
=
\cos^2\theta,
\qquad
\mu_{\text{rej}}=\sin^2\theta.
$$

For circular helicity states, the same measure gives

$$
\mu_{\text{pass}}(\hat{\mathbf a}\mid\boldsymbol{\epsilon}_{\pm})
=
\frac{1}{2}
$$

for every linear analyzer axis $\hat{\mathbf a}$. This is the expected equal split for circular polarization through a linear analyzer.

The missing measure-theoretic step can now be stated without importing Malus' law as an axiom. Let $\zeta\in\Theta_{\hat{\mathbf a}}$ denote the unresolved local analyzer variables during the record window: impact phase, internal capture phase, relevant lattice phase, wake background, and other material degrees of freedom not controlled by the photon preparation. The Gate B invariant-measure target is a normalized material measure $d\nu_{\hat{\mathbf a}}$ and a normalized channel coordinate $\eta_{\hat{\mathbf a}}:\Theta_{\hat{\mathbf a}}\to[0,1]$ such that

$$
\nu_{\hat{\mathbf a}}(\Theta_{\hat{\mathbf a}})=1,
\qquad
T_{s*}d\nu_{\hat{\mathbf a}}=d\nu_{\hat{\mathbf a}},
\qquad
(\eta_{\hat{\mathbf a}})_*d\nu_{\hat{\mathbf a}}=d\eta,
$$

where $T_s$ is the analyzer's local material flow through the successful record window. The deterministic single-event kernels are then

$$
K_{\text{pass}}(\hat{\mathbf a};a_\perp,\zeta)
=
G_{\text{mat}}
H\!\left(
\mu_{\text{pass}}(\hat{\mathbf a}\mid a_\perp)
-\eta_{\hat{\mathbf a}}(\zeta)
\right),
$$

and

$$
K_{\text{rej}}(\hat{\mathbf a};a_\perp,\zeta)
=
G_{\text{mat}}
H\!\left(
\eta_{\hat{\mathbf a}}(\zeta)
-\mu_{\text{pass}}(\hat{\mathbf a}\mid a_\perp)
\right),
$$

with $H(0)=0$. Conditioned on a successful material record, $G_{\text{mat}}=1$, the unresolved analyzer variables give

$$
\int_{\Theta_{\hat{\mathbf a}}}
K_{\text{pass}}(\hat{\mathbf a};a_\perp,\zeta)
d\nu_{\hat{\mathbf a}}(\zeta)
=
\int_{0}^{1}
H\!\left(\mu_{\text{pass}}-\eta\right)d\eta
=
\mu_{\text{pass}}(\hat{\mathbf a}\mid a_\perp).
$$

This is the reusable threshold-pullback theorem target for one-wing record channels. If a record window has an event-ledger residual below tolerance, an invariant unresolved-material measure $d\nu$, and a threshold coordinate $\eta:\Theta\to[0,1]$ with $\eta_*d\nu=d\eta$, then the deterministic kernel

$$
K_o(\rho,\zeta)=H\!\left(\rho-\eta(\zeta)\right)
$$

has the pushed-forward weight

$$
\int_{\Theta}K_o(\rho,\zeta)\,d\nu(\zeta)
=
\nu\!\left(\{\zeta:\eta(\zeta)<\rho\}\right)
=
\int_0^\rho d\eta
=
\rho.
$$

Photon Gate B uses $\rho=\mu_{\text{pass}}(\hat{\mathbf a}\mid a_\perp)$. The Stern-Gerlach-like chart below uses the same structure with $\rho=p_{+}(\hat{\mathbf a},\hat{\mathbf m})$. Bell-pair work may consume this theorem target only after both one-wing kernels are tied to the same pair-provenance record and the resulting joint law avoids product screening while preserving measurement independence and no-signaling.

The Bell limitation is quantitative. If two wings use independent threshold-pullback kernels over a setting-independent source measure, Fubini reduction turns them into one-wing response probabilities $p_A(a|x,\Pi)$ and $p_B(b|y,\Pi)$. The resulting law

$$
P(a,b|x,y)
=
\int p_A(a|x,\Pi)p_B(b|y,\Pi)\,d\rho_{\mathrm{src}}(\Pi)
$$

obeys the CHSH bound. If a product-screened approximation differs from the completed table by at most $\Delta_{\mathrm{prod}}$ per outcome-setting cell, then

$$
|S|\le 2+16\Delta_{\mathrm{prod}}.
$$

If the same table is within $\Delta_{\mathrm{joint}}^{\mathrm{sing}}$ of the singlet joint law at the CHSH-optimal settings, then

$$
\Delta_{\mathrm{prod}}
+
\Delta_{\mathrm{joint}}^{\mathrm{sing}}
\ge
\frac{2\sqrt2-2}{16}
=
\frac{\sqrt2-1}{8}.
$$

Thus exact singlet recovery requires the product-screening residual to stay bounded away from zero; in this normalization $\Delta_{\mathrm{prod}}\ge(\sqrt2-1)/8\approx0.0518$. The one-wing threshold theorem can supply local probabilities, but it cannot be duplicated independently to make Bell correlations.

The substrate origin of these reduced objects is the analyzer's own finite-time material dynamics. Let $\mathcal{P}_{\hat{\mathbf a}}$ denote the record-window section of fully specified analyzer states: a state lies in $\mathcal{P}_{\hat{\mathbf a}}$ when an incoming Gate A-admissible photon branch has reached the analyzer entrance with propagation axis $\hat{\mathbf e}$, the analyzer's macroscopic accepted axis is $\hat{\mathbf a}$, and the local Noether-Sea environment is within the calibrated operating band. Let $\sim_{\hat{\mathbf a}}$ identify material states that differ only by translations among equivalent capture sites or by record-cycle phase choices that preserve the same local pass/reject geometry. The unresolved analyzer microstate space is then the quotient

$$
\Theta_{\hat{\mathbf a}}
=
\mathcal{P}_{\hat{\mathbf a}}/\!\sim_{\hat{\mathbf a}}.
$$

The map $T_s:\Theta_{\hat{\mathbf a}}\to\Theta_{\hat{\mathbf a}}$ is the return map induced by the architrino-level Master Equation through one record-window step, after projecting the fully resolved analyzer state back to the quotient. The invariant analyzer measure is the long-run occupation measure of this return map:

$$
\int_{\Theta_{\hat{\mathbf a}}} f(\zeta)\,d\nu_{\hat{\mathbf a}}(\zeta)
=
\int_{\Theta_{\hat{\mathbf a}}}
f(T_s\zeta)\,d\nu_{\hat{\mathbf a}}(\zeta),
$$

or, equivalently for typical calibrated analyzer histories,

$$
\int_{\Theta_{\hat{\mathbf a}}} f\,d\nu_{\hat{\mathbf a}}
=
\lim_{N\to\infty}
\frac{1}{N}
\sum_{n=0}^{N-1}
f(T_s^n\zeta_0).
$$

Thus $d\nu_{\hat{\mathbf a}}$ is not a quantum postulate. It is the reduced invariant measure of a stable material assembly under repeated local capture attempts.

The channel coordinate $\eta_{\hat{\mathbf a}}$ is derived from the pass-basin filtration of that same material dynamics. For each accepted positive-action fraction $\rho\in[0,1]$, let

$$
\mathcal{B}_{\text{pass}}(\rho;\hat{\mathbf a})
\subseteq
\Theta_{\hat{\mathbf a}}
$$

be the set of analyzer microstates that route to the accepted material record when the incoming planar-pair ledger supplies $\mu_{\text{pass}}=\rho$. The ideal linear analyzer requires the monotonicity condition

$$
\rho_1\le\rho_2
\quad\Longrightarrow\quad
\mathcal{B}_{\text{pass}}(\rho_1;\hat{\mathbf a})
\subseteq
\mathcal{B}_{\text{pass}}(\rho_2;\hat{\mathbf a}),
$$

with $\mathcal{B}_{\text{pass}}(0;\hat{\mathbf a})$ measure zero and $\mathcal{B}_{\text{pass}}(1;\hat{\mathbf a})$ full measure after conditioning on a successful material record. The threshold coordinate is

$$
\eta_{\hat{\mathbf a}}(\zeta)
=
\inf\left\{
\rho\in[0,1]:
\zeta\in\mathcal{B}_{\text{pass}}(\rho;\hat{\mathbf a})
\right\}.
$$

This gives the deterministic rule

$$
\zeta\in\mathcal{B}_{\text{pass}}(\rho;\hat{\mathbf a})
\quad\Longleftrightarrow\quad
\eta_{\hat{\mathbf a}}(\zeta)<\rho
$$

outside measure-zero separatrix cases. The uniform pushforward

$$
(\eta_{\hat{\mathbf a}})_*d\nu_{\hat{\mathbf a}}=d\eta
$$

is the unbiased-ideal-analyzer theorem target. In physical terms, it says that ordinary calibrated polarizer preparation samples the material capture threshold evenly in the invariant-measure coordinate. If the pushforward is not uniform, the measured pass curve becomes

$$
P_{\text{pass}}(\rho)
=
\nu_{\hat{\mathbf a}}
\left(
\{\zeta:\eta_{\hat{\mathbf a}}(\zeta)<\rho\}
\right),
$$

and the deviation

$$
\Delta_{\text{pol}}(\rho)
=
P_{\text{pass}}(\rho)-\rho
$$

is a detector-bias or failed-calibration diagnostic, not a new photon law.

This is the reduced substrate-origin scaffold. The quantity being measured is still the native accepted positive action fraction, so the $\cos^2\theta$ result appears only after the material projector $A^a{}_{b}$ and the linear-polarization ledger $a_\perp^a=\hat e_\gamma^a$ have been derived. The remaining substrate burden is to compute $\mathcal{P}_{\hat{\mathbf a}}$, the equivalence relation $\sim_{\hat{\mathbf a}}$, the return map $T_s$, and the basin filtration $\mathcal{B}_{\text{pass}}(\rho;\hat{\mathbf a})$ from a concrete analyzer assembly simulation and then prove or bound $\Delta_{\text{pol}}(\rho)$.

The interpretation is local and ledger-based. In a single event, the analyzer-plus-photon microstate still resolves into one material record channel. Across an ensemble whose unresolved material variables sample $d\nu_{\hat{\mathbf a}}$, the pass frequency is $\mu_{\text{pass}}$. After a successful pass, the outgoing planar-pair ledger is relocked into the analyzer channel, so the next analyzer uses $a_\perp^a=\hat a^a$ as its incoming transverse ledger. Sequential analyzer probabilities therefore multiply by the same projector rule rather than by a separate collapse postulate.

The effective relocking map can be stated directly. Let each analyzer $M_{\hat{\mathbf a}_k}$ preserve the same propagation axis and have accepted rank-one transverse projector

$$
A_k=\hat a_k\hat a_k^{\flat},
\qquad
R_k=P_{\perp}-A_k
$$

inside the free transverse plane. Conditioned on a successful pass record and a zero handoff residual, the outgoing ledger is

$$
a_{k,+}^{a}
=
\frac{
A_k{}^{a}{}_{b}a_{k-1}^{b}
}{
\sqrt{
\overline{a_{k-1}^{c}}A_{k,cd}a_{k-1}^{d}
}
}
=
e^{i\chi_k}\hat a_k^{a}.
$$

If the rejected channel emits a free outgoing transverse branch rather than absorbing or scattering locally, the rejected ledger is

$$
a_{k,-}^{a}
=
\frac{
R_k{}^{a}{}_{b}a_{k-1}^{b}
}{
\sqrt{
\overline{a_{k-1}^{c}}R_{k,cd}a_{k-1}^{d}
}
}.
$$

For a pass-only cascade through analyzer axes $\hat{\mathbf a}_1,\ldots,\hat{\mathbf a}_N$, induction over the local threshold-pullback events gives

$$
P(+_1,\ldots,+_N\mid a_0)
=
\left|
\hat a_{1,a}a_0^a
\right|^2
\prod_{k=2}^{N}
\left|
\hat{\mathbf a}_k\cdot\hat{\mathbf a}_{k-1}
\right|^2.
$$

This is an effective response lemma, not a collapse postulate. Each analyzer still has its own material, wake, recoil, and Noether-Sea event ledger; the lemma states how the already-accepted transverse ledger is normalized and handed to the next local analyzer when the handoff residual is zero.

The same ledger supplies the no-signaling test for polarization correlations. For a two-photon provenance ledger and analyzer settings $\alpha,\beta$, the validated limit must obey

$$
\sum_{b=\pm}P(a,b\,|\,\alpha,\beta)=P(a\,|\,\alpha),
\qquad
\sum_{a=\pm}P(a,b\,|\,\alpha,\beta)=P(b\,|\,\beta),
$$

while recovering the standard polarization-correlation angle law for the prepared entangled state. Pair provenance and contextual analyzer coupling may be non-factorized in the completed model, but a distant analyzer setting must not change the local marginal statistics.

For massive vector bosons, the target differs. A massive spin-$1$ channel has three rest-frame projections in standard representation theory. A $W/Z$ corridor may carry longitudinal or mixed-axis structure because it is a localized massive vector channel, not the free photon planar-pair branch. The corpus should not transfer the photon-only "exactly two transverse modes" statement into massive-vector prose.

Horizon and planar-lock discussions should use narrower language unless the propagation axis is established. A sign of planar angular momentum relative to a chosen normal is a boundary helicity proxy. It becomes standard helicity only when that normal is dynamically tied to propagation or translation.

## Stern-Gerlach-Like Measurement Response

Spin measurement is not the reading of a pre-existing tiny arrow. It is a finite-time coupling between an apparatus and the full angular-momentum ledger of the target assembly. The measured value is the branch record produced by that coupling relative to the apparatus axis, not a primitive label that existed before the apparatus interaction.

For a Stern-Gerlach-like measurement, the apparatus supplies an oriented interaction geometry $\hat{\mathbf{m}}$ and a spatial gradient. In effective language one writes a coupling to a spin projection along $\hat{\mathbf{m}}$. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the substrate-level description is a macroscopic apparatus assembly whose constituent architrinos and causal wakes create an axis-indexed potential environment for the target nested shell swarm. A useful reduced apparatus potential is

$$
U_{\text{app}}(\mathbf{x},t;\hat{\mathbf{m}}),
$$

but this is only a mollified bookkeeping object for the coherent envelope of many causal-wake hits. The fundamental interaction remains the architrino-wise Master Equation sum over radial causal-wake intersections.

The apparatus acts over a finite interval

$$
t_{\text{in}}\le t\le t_{\text{out}},
\qquad
T_{\text{int}}=t_{\text{out}}-t_{\text{in}}>0.
$$

The gradient must be strong enough and persistent enough to drive the coupled target-apparatus state toward a branch boundary, but not so violent that it dissociates the target instead of measuring it. A zero-duration projection is therefore not the substrate model. The observer-level abruptness is the coarse appearance of a finite threshold crossing and record lock.

The target is not represented by one internal vector $\hat{\mathbf{n}}$. The substrate-facing object is the full nested shell swarm spin ledger

$$
\mathcal{J}_{\text{core}}(t)
=
\left(
\{\mathbf{n}_{\ell},\phi_{\ell},\omega_{\ell},I_{\ell},\mathcal{R}_{\ell}\}_{\ell\in\{I,M,O\}},
\mathbf{L}_{\text{wake},\text{core}}(t),
\mathcal{H}_{\text{self}}(t)
\right),
$$

where $\mathbf{n}_{\ell}$ denotes the layer plane normal, $\phi_{\ell}$ the phase, $\omega_{\ell}$ the layer frequency, $I_{\ell}$ the radian-normalized rotational-action variable, $\mathcal{R}_{\ell}$ the active causal-root ledger, $\mathbf{L}_{\text{wake},\text{core}}$ the in-flight causal-wake contribution associated with the target core, and $\mathcal{H}_{\text{self}}$ the relevant self-hit history. This package is still a reduction of the full architrino state. It is nevertheless the minimum kind of ledger a spin apparatus can couple to, because a single classical axis would erase the phase, root, and wake-history information that the measurement interaction is supposed to test.

The apparatus couples first through the externally exposed layers of the assembly, but the result is not determined by the outer layer alone. During the interval $T_{\text{int}}$, the apparatus gradient exerts a distributed torque on the target constituents,

$$
\boldsymbol{\tau}_{\text{app}\to\text{core}}(t)
=
\sum_{i\in\text{core}}
\left(\mathbf{x}_i(t)-\mathbf{X}_{\text{core}}(t)\right)
\times
\mathbf{F}^{\text{app}}_i(t),
$$

where $\mathbf{F}^{\text{app}}_i$ is the apparatus-induced force bookkeeping term reconstructed from the local causal-wake hits, and $\mathbf{X}_{\text{core}}$ is the target core center used for the reduced ledger. The torque deforms the outer response channel, retunes the middle hinge, and can alter the admissible self-hit branch history of the inner layer. The measured response is therefore a coupled redistribution of $\Delta I_O$, $\Delta I_M$, $\Delta I_I$, and $\Delta I_{\text{wake}}$, not a direct lookup of an already chosen sign.

Angular momentum must be conserved across the whole interaction window. For the target core $C$, apparatus $A$, exchange wakes, and local Noether-Sea recoil, the required ledger is

$$
\Delta \mathbf{J}_{C}
+
\Delta \mathbf{J}_{A}
+
\Delta \mathbf{L}_{\text{wake},C\leftrightarrow A}
+
\Delta \mathbf{J}_{\text{sea}}
=
\mathbf{0}.
$$

This is the Stern-Gerlach analogue of recoil accounting. The apparatus receives the opposite angular-momentum impulse needed to make a durable record, while in-flight causal wakes and the local Noether Sea carry the part of the exchange that is not present in the instantaneous mechanical variables. If this ledger is omitted, the two detector channels become unexplained labels rather than physical outcomes.

The two outcomes arise from basin resolution. Let

$$
Z_{\hat{\mathbf{m}}}(t)
=
\left(\mathcal{J}_{\text{core}}(t),A_{\hat{\mathbf{m}}}(t),\mathcal{W}_{\text{loc}}(t)\right)
$$

denote the reduced state containing the core spin ledger, the apparatus channel state, and the local causal-wake background. A Stern-Gerlach-like measurement is successful only when the coupled flow crosses an axis-indexed separatrix

$$
\Sigma_{\hat{\mathbf{m}}}\!\left(Z_{\hat{\mathbf{m}}}(t)\right)=0
$$

and then settles into one of two record-forming basins

$$
B_{+}(\hat{\mathbf{m}}),
\qquad
B_{-}(\hat{\mathbf{m}}).
$$

The measured value is therefore

$$
o_{\hat{\mathbf{m}}}
=
\begin{cases}
+1, & Z_{\hat{\mathbf{m}}}(t_{\text{rec}})\in B_{+}(\hat{\mathbf{m}}),\\
-1, & Z_{\hat{\mathbf{m}}}(t_{\text{rec}})\in B_{-}(\hat{\mathbf{m}}),
\end{cases}
$$

where $t_{\text{rec}}>t_{\text{in}}$ is the time at which the branch has crossed the separatrix and locked into a persistent apparatus record. Failed capture, dissociation, or insufficient amplification are apparatus failures, not additional spin outcomes.

The deterministic microscopic response for a fully specified incoming state is obtained by applying the finite-time flow to the two basin sets. This gives the exact reduced response kernels

$$
K_{\pm}(\hat{\mathbf{m}};Z_{\hat{\mathbf{m}}}(t_{\text{in}}))
=
\mathbf{1}\!\left[
\Phi^{\hat{\mathbf{m}}}_{T_{\text{int}}}
\left(Z_{\hat{\mathbf{m}}}(t_{\text{in}})\right)
\in B_{\pm}(\hat{\mathbf{m}})
\right],
$$

where $\Phi^{\hat{\mathbf{m}}}_{T_{\text{int}}}$ is the finite-time flow generated by the target, apparatus, and local Noether-Sea state. This is already a derived deterministic kernel at the reduced-flow level: it is the pullback of the record-forming basins through the actual apparatus-coupled dynamics.

For calculation, this exact pullback can be rewritten near the separatrix as a signed threshold functional. Choose the signed coordinate

$$
q_{\hat{\mathbf{m}}}(Z)
=
\Sigma_{\hat{\mathbf{m}}}(Z),
$$

with $q_{\hat{\mathbf{m}}}>0$ on the $+$ side and $q_{\hat{\mathbf{m}}}<0$ on the $-$ side. Along the apparatus-driven flow, linearize the separatrix-normal dynamics:

$$
\frac{d q_{\hat{\mathbf{m}}}}{dt}
=
\lambda_{\hat{\mathbf{m}}}(t)q_{\hat{\mathbf{m}}}
+
\mathcal{N}_{\hat{\mathbf{m}}}(Z(t),t)\cdot
\dot{\mathbf{J}}_{C}^{\text{app}}(t)
+
O(q_{\hat{\mathbf{m}}}^{2},\|\delta Z_{\perp}\|^{2}).
$$

Here $\mathcal{N}_{\hat{\mathbf{m}}}$ is the separatrix normal covector in the reduced angular-momentum ledger coordinates, $\lambda_{\hat{\mathbf{m}}}$ is the local normal expansion / contraction rate, and $\delta Z_{\perp}$ denotes tangent-to-separatrix perturbations. The apparatus-driven core update is

$$
\dot{\mathbf{J}}_{C}^{\text{app}}(t)
=
\boldsymbol{\tau}_{\text{app}\to\text{core}}(t)
+
\dot{\mathbf{L}}_{\text{wake},C\leftrightarrow A}(t),
$$

where

$$
\boldsymbol{\tau}_{\text{app}\to\text{core}}(t)
=
\sum_{i\in\text{core}}
\left(\mathbf{x}_i(t)-\mathbf{X}_{\text{core}}(t)\right)
\times
\mathbf{F}^{\text{app}}_i(t),
\qquad
\mathbf{F}^{\text{app}}_i(t)
=
-\nabla_{\mathbf{x}_i}U_{\text{app}}(\mathbf{x}_i,t;\hat{\mathbf{m}})
$$

in the mollified apparatus-potential chart.

The Master-Equation origin of this impulse is the constituent causal-hit sum. Let $\mathscr A_{\hat{\mathbf{m}}}$ be the set of apparatus source architrinos whose organized wake envelope defines the Stern-Gerlach gradient. For target constituent $i\in C$ and apparatus constituent $a\in\mathscr A_{\hat{\mathbf{m}}}$, define the apparatus cross-root set

$$
\mathcal C_{ia}^{A}(t)
=
\left\{
s<t:
\left\|\mathbf{x}_i(t)-\mathbf{x}_a(s)\right\|
=
c_f(t-s)
\right\}.
$$

For each root $s\in\mathcal C_{ia}^{A}(t)$, write

$$
\mathbf r_{ia}(t;s)
=
\mathbf{x}_i(t)-\mathbf{x}_a(s),
\qquad
r_{ia}(t;s)=\|\mathbf r_{ia}(t;s)\|,
\qquad
\hat{\mathbf r}_{ia}(t;s)
=
\frac{\mathbf r_{ia}(t;s)}{r_{ia}(t;s)},
$$

and

$$
J_{ia}(t;s)
=
1-\frac{\mathbf v_a(s)\cdot\hat{\mathbf r}_{ia}(t;s)}{c_f}.
$$

The apparatus contribution to the target constituent's acceleration is therefore

$$
\mathbf a_i^{\text{app}}(t;\hat{\mathbf{m}})
=
\kappa
\sum_{a\in\mathscr A_{\hat{\mathbf{m}}}}
\sum_{s\in\mathcal C_{ia}^{A}(t)}
\sigma_{ia}
\frac{|q_iq_a|}
{r_{ia}^2(t;s)|J_{ia}(t;s)|}
\hat{\mathbf r}_{ia}(t;s),
$$

and the force-like bookkeeping variable is

$$
\mathbf F_i^{\text{app}}(t;\hat{\mathbf{m}})
=
\mu_{\text{arch}}\mathbf a_i^{\text{app}}(t;\hat{\mathbf{m}}).
$$

Equivalently, in the finite-memory dual-mollified chart,

$$
\mathbf a_{i,\eta}^{\text{app}}(t;\hat{\mathbf{m}})
=
\kappa
\sum_{a\in\mathscr A_{\hat{\mathbf{m}}}}
\sigma_{ia}|q_iq_a|
\int_{t-h}^{t}
\frac{\widehat{\mathbf r}_{ia}(t,s)}
{r_{ia}^2(t,s)+\epsilon_c^2}
\delta_{\eta}\!\left(r_{ia}(t,s)-c_f(t-s)\right)\,ds.
$$

The apparatus angular impulse entering the reduced response is therefore not an imported spin torque. It is the core-centered torque of these delayed radial hits, plus the wake part required by the delayed Noether ledger:

$$
\boxed{
\dot{\mathbf{J}}_{C}^{\text{app}}(t;\hat{\mathbf{m}})
=
\mu_{\text{arch}}
\sum_{i\in C}
\left(\mathbf{x}_i(t)-\mathbf{X}_{C}(t)\right)
\times
\mathbf a_i^{\text{app}}(t;\hat{\mathbf{m}})
+
\dot{\mathbf L}_{\text{wake},C\leftrightarrow A}(t)
}
$$

and over the interaction window,

$$
\Delta\mathbf{J}_{C}^{\text{app}}
=
\int_{t_{\text{in}}}^{t_{\text{out}}}
\dot{\mathbf{J}}_{C}^{\text{app}}(t;\hat{\mathbf{m}})\,dt.
$$

The missing recoil is not discarded; it is fixed by

$$
\Delta \mathbf{J}_{C}
+
\Delta \mathbf{J}_{A}
+
\Delta \mathbf{L}_{\text{wake},C\leftrightarrow A}
+
\Delta \mathbf{J}_{\text{sea}}
=
\mathbf{0}.
$$

Let

$$
\Lambda_{\hat{\mathbf{m}}}(u,v)
=
\int_{u}^{v}\lambda_{\hat{\mathbf{m}}}(s)\,ds.
$$

The first-order signed response functional at the end of the interaction window is

$$
\mathcal{Q}_{\hat{\mathbf{m}}}(Z_{\text{in}})
=
e^{\Lambda_{\hat{\mathbf{m}}}(t_{\text{in}},t_{\text{out}})}
\Sigma_{\hat{\mathbf{m}}}(Z_{\text{in}})
+
\int_{t_{\text{in}}}^{t_{\text{out}}}
e^{\Lambda_{\hat{\mathbf{m}}}(s,t_{\text{out}})}
\mathcal{N}_{\hat{\mathbf{m}}}(Z(s),s)\cdot
\dot{\mathbf{J}}_{C}^{\text{app}}(s)\,ds.
$$

The record gate is

$$
G_{\text{rec}}(Z_{\text{in}})
=
H\!\left(
\left|R(A(t_{\text{rec}}))-R(A_{\text{pre}})\right|-R_*
\right)
H\!\left(\tau_{\text{persist}}-T_{\text{rec}}\right),
$$

with the project convention $H(0)=0$. The derived first-order Stern-Gerlach kernels are therefore

$$
\boxed{
K_{+}^{\text{SG}}(\hat{\mathbf{m}};Z_{\text{in}})
=
G_{\text{rec}}(Z_{\text{in}})
H\!\left(\mathcal{Q}_{\hat{\mathbf{m}}}(Z_{\text{in}})\right)
}
$$

and

$$
\boxed{
K_{-}^{\text{SG}}(\hat{\mathbf{m}};Z_{\text{in}})
=
G_{\text{rec}}(Z_{\text{in}})
H\!\left(-\mathcal{Q}_{\hat{\mathbf{m}}}(Z_{\text{in}})\right)
}.
$$

For a successful two-channel apparatus with $G_{\text{rec}}=1$ and $\mathcal{Q}_{\hat{\mathbf{m}}}\ne0$, the kernels satisfy

$$
K_{+}^{\text{SG}}+K_{-}^{\text{SG}}=1.
$$

If $G_{\text{rec}}=0$, the event is a failed record formation. If $\mathcal{Q}_{\hat{\mathbf{m}}}=0$ exactly, the state remains on the reduced separatrix in this first-order chart; that measure-zero case is not a third spin value and must be resolved by higher-order terms, environmental perturbation, or apparatus redesign.

The observer-level probabilities are obtained only after coarse-graining over the unresolved incoming ledger:

$$
P_{\pm}(\hat{\mathbf{m}})
=
\int K_{\pm}^{\text{SG}}(\hat{\mathbf{m}};Z)\,d\mu_*(Z).
$$

This derivation does not reduce the measurement to a preassigned local axis. $\mathcal{Q}_{\hat{\mathbf{m}}}$ depends on the full trajectory through the interaction window: layer phases and frequencies, causal-root history, self-hit memory, apparatus microstate, local causal-wake background, and the separatrix geometry. At the reduced statistical level, the quantitative target is the basin measure. For a spin-$\tfrac{1}{2}$ preparation with effective angle $\alpha$ relative to $\hat{\mathbf{m}}$, the required recovery is

$$
P_{+}(\alpha)
=
\int K_{+}^{\text{SG}}(\hat{\mathbf{m}};Z)\,d\mu_{\alpha}(Z)
\to
\cos^2\!\left(\frac{\alpha}{2}\right),
\qquad
P_{-}(\alpha)
=
\int K_{-}^{\text{SG}}(\hat{\mathbf{m}};Z)\,d\mu_{\alpha}(Z)
\to
\sin^2\!\left(\frac{\alpha}{2}\right).
$$

A concrete reduced basin calculation can be given once the ordered-frame spinor target has supplied an effective two-channel coordinate for the measurement-axis chart. Write the coordinate in the $\hat{\mathbf{m}}$ channel basis as

$$
\psi^{(\hat{\mathbf{m}})}(Z)
=
\begin{pmatrix}
c_{+}(Z;\hat{\mathbf{m}})\\
c_{-}(Z;\hat{\mathbf{m}})
\end{pmatrix},
\qquad
|c_{+}|^2+|c_{-}|^2=1.
$$

Then

$$
p_{+}(Z;\hat{\mathbf{m}})
=
|c_{+}(Z;\hat{\mathbf{m}})|^2,
\qquad
p_{-}=1-p_{+},
$$

or, equivalently, for the same normalized state in a fixed effective spinor chart,

$$
p_{+}(Z;\hat{\mathbf{m}})
=
\psi^{\dagger}(Z)
\Pi_{+}(\hat{\mathbf{m}})
\psi(Z),
$$

with

$$
\Pi_{\pm}(\hat{\mathbf{m}})
=
\frac{1}{2}
\left(
\mathbf{1}\pm\hat{\mathbf{m}}\cdot\boldsymbol{\sigma}
\right).
$$

The unresolved material degrees of freedom in the record amplifier reduce to a fast apparatus-record phase

$$
\theta_{\text{rec}}\in[0,2\pi).
$$

In the ideal reduced chart, the successful record gate samples this phase with

$$
d\nu_{\text{rec}}=\frac{d\theta_{\text{rec}}}{2\pi}.
$$

This phase is not an additional spin value. It is the unresolved position of the coupled target-apparatus trajectory along the record-forming cycle.

This measure also descends from the Master Equation. After record formation, each successful channel contains a stable apparatus record cycle $\Gamma_{\text{rec}}^{\pm}$ inside the full apparatus phase space. Let

$$
\Theta_{\text{rec}}:\Gamma_{\text{rec}}^{\pm}\to S^1
$$

be a phase coordinate on that cycle, and let $F_{\text{ME}}^{A}$ denote the apparatus part of the Master-Equation vector field, including the same delayed cross-root terms used in the impulse calculation. Along the locked record cycle,

$$
\dot{\theta}_{\text{rec}}
=
\Omega_{\text{rec}}(\theta_{\text{rec}})
=
d\Theta_{\text{rec}}\!\left(F_{\text{ME}}^{A}\right).
$$

The invariant density $\rho_{\text{rec}}$ for this one-dimensional phase flow satisfies the stationary continuity equation

$$
\frac{d}{d\theta_{\text{rec}}}
\left(
\Omega_{\text{rec}}(\theta_{\text{rec}})
\rho_{\text{rec}}(\theta_{\text{rec}})
\right)
=
0,
\qquad
\int_{0}^{2\pi}\rho_{\text{rec}}(\theta_{\text{rec}})\,d\theta_{\text{rec}}=1.
$$

Hence

$$
d\nu_{\text{rec}}
=
\rho_{\text{rec}}(\theta_{\text{rec}})\,d\theta_{\text{rec}}
=
\frac{1}{T_{\text{rec}}\Omega_{\text{rec}}(\theta_{\text{rec}})}
d\theta_{\text{rec}},
\qquad
T_{\text{rec}}
=
\int_{0}^{2\pi}
\frac{d\theta_{\text{rec}}}
{\Omega_{\text{rec}}(\theta_{\text{rec}})}.
$$

The uniform measure $d\theta_{\text{rec}}/(2\pi)$ is the calibrated limit in which the successful record cycle has constant phase speed, or in which $\theta_{\text{rec}}$ is chosen as the normalized time-of-flight phase on the cycle. If the Master-Equation record cycle has nonconstant phase speed or channel-dependent efficiency, the basin integral must use $d\nu_{\text{rec}}$ above rather than the uniform idealization.

The reduced half-angle arithmetic needs a measure coordinate, not a raw uniform phase. Define

$$
u_{\hat{\mathbf m}}(\theta)
=
\nu_{\hat{\mathbf m}}^{\mathrm{rec}}([0,\theta])
=
\int_0^\theta
\rho_{\hat{\mathbf m}}^{\mathrm{rec}}(s)\,ds.
$$

When the conditional record measure is non-atomic, this coordinate pushes the record measure to Lebesgue measure on $[0,1]$:

$$
(u_{\hat{\mathbf m}})_*d\nu_{\hat{\mathbf m}}^{\mathrm{rec}}=du.
$$

This is the probability-integral transform applied to the locked apparatus record cycle. It means the ideal threshold rule should be written in the invariant-measure coordinate; the raw phase formula is only the special case $u_{\hat{\mathbf m}}(\theta_{\text{rec}})=\theta_{\text{rec}}/(2\pi)$.

In this reduced chart, the concrete Stern-Gerlach separatrix is

$$
\boxed{
\Sigma_{\hat{\mathbf{m}}}^{\text{SG,red}}(Z,\theta_{\text{rec}})
=
p_{+}(Z;\hat{\mathbf{m}})
-
u_{\hat{\mathbf m}}(\theta_{\text{rec}})
}
$$

with separatrix normal

$$
\mathcal{N}_{\hat{\mathbf{m}}}^{\text{SG,red}}
=
d p_{+}
-
\rho_{\hat{\mathbf m}}^{\mathrm{rec}}(\theta_{\text{rec}})\,d\theta_{\text{rec}}.
$$

The reduced record basins are therefore

$$
B_{+}^{\text{red}}(\hat{\mathbf{m}})
=
\left\{
(Z,\theta_{\text{rec}}):
u_{\hat{\mathbf m}}(\theta_{\text{rec}})<p_{+}(Z;\hat{\mathbf{m}})
\right\},
$$

and

$$
B_{-}^{\text{red}}(\hat{\mathbf{m}})
=
\left\{
(Z,\theta_{\text{rec}}):
u_{\hat{\mathbf m}}(\theta_{\text{rec}})>p_{+}(Z;\hat{\mathbf{m}})
\right\},
$$

with the boundary assigned measure zero by $H(0)=0$. The corresponding ideal reduced kernels are

$$
K_{+}^{\text{SG,red}}
=
G_{\text{rec}}
H\!\left(
p_{+}(Z;\hat{\mathbf{m}})
-
u_{\hat{\mathbf m}}(\theta_{\text{rec}})
\right),
$$

and

$$
K_{-}^{\text{SG,red}}
=
G_{\text{rec}}
H\!\left(
u_{\hat{\mathbf m}}(\theta_{\text{rec}})
-
p_{+}(Z;\hat{\mathbf{m}})
\right).
$$

For a prepared spin-$\tfrac{1}{2}$ core whose effective preparation axis is $\hat{\mathbf{a}}$, let

$$
\hat{\mathbf{a}}\cdot\hat{\mathbf{m}}=\cos\alpha.
$$

The spinor projection gives

$$
p_{+}(\hat{\mathbf{a}},\hat{\mathbf{m}})
=
\frac{1+\hat{\mathbf{a}}\cdot\hat{\mathbf{m}}}{2}
=
\cos^2\!\left(\frac{\alpha}{2}\right),
\qquad
p_{-}
=
\sin^2\!\left(\frac{\alpha}{2}\right).
$$

Conditioned on a successful record gate whose measure is included in $d\nu_{\hat{\mathbf m}}^{\mathrm{rec}}$,

$$
P_{+}(\alpha\,|\,\text{rec})
=
\int
H\!\left(
\cos^2\!\left(\frac{\alpha}{2}\right)
-
u_{\hat{\mathbf m}}(\theta_{\text{rec}})
\right)
\,
d\nu_{\hat{\mathbf m}}^{\mathrm{rec}}(\theta_{\text{rec}})
=
\int_0^1
H\!\left(
\cos^2\!\left(\frac{\alpha}{2}\right)-u
\right)du
=
\cos^2\!\left(\frac{\alpha}{2}\right),
$$

and

$$
P_{-}(\alpha\,|\,\text{rec})
=
\sin^2\!\left(\frac{\alpha}{2}\right).
$$

This closes the single-assembly basin-volume arithmetic in the reduced spinor-record chart and identifies the Master-Equation origin of both ingredients external to the spinor coordinate: $d\nu_{\text{rec}}$ is the invariant measure of the locked record-cycle phase, and $\dot{\mathbf{J}}_{C}^{\text{app}}$ is the angular impulse generated by the apparatus cross-root branch sum. The remaining substrate burden is to derive the effective spinor coordinate itself, derive the conditional record measure and physical separatrix from the apparatus dynamics, and evaluate the branch-sum impulse for a concrete nested shell swarm apparatus model. If the record gate efficiency depends on $\theta_{\text{rec}}$ or on the unresolved swarm phases, that dependence belongs inside $d\nu_{\hat{\mathbf m}}^{\mathrm{rec}}$ rather than inside a separate post-measurement probability rule.

Bell-pair tests require one more layer: the pair-provenance ledger and both local apparatus couplings must be included before comparing to the singlet correlation. A response that reduces to a sharp classical basin boundary over a preassigned local axis remains the known linear-correlation failure mode, not a successful spin-measurement model.

## Bell's Theorem Handoff

Bell's theorem is downstream of the angular-momentum and spin program. It tests whether the completed measurement-response model can reproduce the observed spin correlations without collapsing into the local factorizable response model that Bell excludes.

The standard singlet target is

$$
|\Psi^-\rangle
=
\frac{1}{\sqrt{2}}
\bigl(
|\!\uparrow\rangle_A|\!\downarrow\rangle_B
-
|\!\downarrow\rangle_A|\!\uparrow\rangle_B
\bigr),
$$

with correlation

$$
E_{\text{QM}}(\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
=
-
\hat{\mathbf{m}}_A\cdot\hat{\mathbf{m}}_B
=
-\cos\theta_{AB}.
$$

The architrino-level starting point is not this ket. It is a pair provenance ledger. At a creation or fragmentation event,

$$
\Gamma_{\text{parent}}(t_0^-)
\longrightarrow
\Gamma_A(t_0^+),\Gamma_B(t_0^+),
$$

with conservation of total energy, momentum, angular momentum, polarity inventory, and relevant causal-wake history. For a singlet-like pair, the observer-level summary is

$$
\mathbf{J}_A+\mathbf{J}_B=\mathbf{0}.
$$

That summary is necessary but not sufficient. A pair of opposite preassigned classical axes gives the wrong correlation. If an unresolved unit vector $\hat{\mathbf{n}}$ is uniformly distributed and detectors return signs by hemisphere,

$$
E_{\text{axis}}(\theta_{AB})
=
-1+\frac{2\theta_{AB}}{\pi},
$$

which is linear in $\theta_{AB}$ and obeys the CHSH bound. Therefore angular-momentum conservation at creation is not enough. The response kernel must involve the full nested shell swarm ledger and finite-time detector coupling, not merely an opposite spin arrow carried by each daughter.

Bell's factorization condition is

$$
P(a,b\,|\,\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B,\lambda)
=
P(a\,|\,\hat{\mathbf{m}}_A,\lambda)
P(b\,|\,\hat{\mathbf{m}}_B,\lambda).
$$

Any completed $\mathbb{A}\mathbb{A}\mathbb{A}$ account that reproduces experiments must fail this factorized Bell-local form while preserving no-signaling and measurement independence. The failure cannot be asserted by slogan. It must be shown by deriving the pair-provenance ledger and the two local apparatus-response maps, then proving that their observer-level compression does not fit Bell's factorized model.

The no-signaling requirement is equally strict:

$$
\sum_b P(a,b\,|\,\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
=
P(a\,|\,\hat{\mathbf{m}}_A),
$$

independent of $\hat{\mathbf{m}}_B$, and similarly on the other side. No usable signal, energy transfer, or causal wake may pass between spacelike-separated detectors during the measurement. The Bell burden is therefore not solved by adding a faster-than-$c_f$ influence.

For simulation and proof packets, this final gate should be reported with three residuals rather than with a single success label:

$$
\Delta_{\mathrm{MI}}^{\mathrm{prov}}
=
\sup_{\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B}
D_{\mathrm{TV}}\!\left(
\rho_{AB}^{\mathrm{prov}}(\lambda\mid\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B),
\rho_{AB}^{\mathrm{prov}}(\lambda)
\right),
$$

$$
\Delta_{\mathrm{NS}}^{A}
=
\sup_{\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B,\hat{\mathbf{m}}'_B}
\sum_a
\left|
P(a\mid \hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
-
P(a\mid \hat{\mathbf{m}}_A,\hat{\mathbf{m}}'_B)
\right|,
$$

with the analogous $\Delta_{\mathrm{NS}}^{B}$, and

$$
\Delta_{\mathrm{Bell}}
=
\sup_{\theta\in[0,\pi]}
\left|
E_{\mathbb{A}\mathbb{A}\mathbb{A}}(\theta)+\cos\theta
\right|.
$$

The required outcome is small $\Delta_{\mathrm{Bell}}$ and vanishing no-signaling residuals while $\Delta_{\mathrm{MI}}^{\mathrm{prov}}$ remains zero within tolerance. If fitting the Bell curve requires setting-dependent provenance preparation, the angular-momentum ledger has not supplied the intended $\mathbb{A}\mathbb{A}\mathbb{A}$ closure.

Here $D_{\mathrm{TV}}$ is total-variation distance on the pair-provenance distribution.

The correct development order is:

1. derive the delayed total angular-momentum functional for architrino dynamics;
2. evaluate the functional for changing-frequency nested shell swarms;
3. validate the projected nested shell swarm partition equations and derive the branch-selection rule for accepted action transactions;
4. prove or falsify ordered-frame spinor closure;
5. derive a Stern-Gerlach-like measurement response from apparatus coupling;
6. construct the pair-provenance ledger for singlet-like creation;
7. compute $E(\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)$ and test whether it equals $-\cos\theta_{AB}$ while preserving no-signaling.

Bell's theorem remains the hard final gate. It should not be used to define spin before the lower-level ledger exists. It should be used to test whether the lower-level ledger and measurement response are strong enough.

## Terminology Rules

The following usage should be preferred across the corpus:

- Write "one $h$ of closed-cycle action," not "one $h$ of angular momentum."
- Write "one $\hbar$-scale angular-momentum increment" when the quantity is a rotational-action variable or generator.
- Write "closed-cycle action transaction" when the causal-root ledger update is the subject.
- Write "radian-normalized rotational action" when using $\omega$ in an energy equation.
- Write "spinor closure target" when discussing the $4\pi$ fermion mechanism before a formal bundle proof exists.
- Write "helicity" only for projection onto a propagation or momentum axis; otherwise use "planar angular-momentum sign," "boundary helicity proxy," or the local term already defined in the document.
- Keep $\mathbf{L}$, $\mathbf{S}$, and $\mathbf{J}$ for the standard observer-level angular-momentum decomposition unless the document explicitly defines an assembly-side ledger variable.
- Write "spin-measurement outcome" for the apparatus-indexed basin record, not for a pre-existing spin arrow hidden inside the target.
- Write "observer-level orbital quantum number" for atomic $\ell$ and $m$ labels until their effective-envelope recovery is derived.
- Treat "intrinsic spin" as standard quantum language meaning "not observer-level orbital motion"; do not use it to imply primitive spin on an architrino.

## Closure Targets

This bridge leaves several derivations open beyond the partition scaffold above.

1. Promote the delayed three-layer scaffold above into a conserved functional derived directly from the regularized nonlocal action.
2. Validate that functional on a nested shell swarm with inner, middle, and outer binary radii, frequencies, plane normals, phases, active root branches, and self-hit history.
3. Populate the finite candidate set $\mathcal A_N(B^-,\Gamma_{\text{coupl}},W)$, evaluate $\mathcal R_{\mathrm{sel}}$ on each retained branch candidate, and test whether $\operatorname{Sel}_{B,N}$ is chart-invariant, stable under retained-budget refinement $N\preceq N'$, unique, or a physical tie for an accepted $\Delta A_{\text{cycle}}=h$ transaction.
4. Generalize the solved four-substep branch by deriving or fitting $a$, $b$, $w$, $\Delta R_\ell$, $\Delta\omega_\ell$, and $\Delta E_{\ell,\text{root}}$ from the master equation for non-minimal branches.
5. Determine whether the partition is unique or branch-dependent for inner, middle, and outer binary layers.
6. Prove or falsify the $SU(2)\to SO(3)$ spinor lift for ordered non-coplanar nested shell swarms, then test whether the same lifted ordered-frame response extends to an effective $SL(2,\mathbb C)\to SO^+(1,3)$ spinor compatibility map in the recovered relativistic observer sector.
7. Evaluate the Master-Equation apparatus branch-sum impulse $\dot{\mathbf{J}}_{C}^{\text{app}}$ and record-cycle phase density $d\nu_{\text{rec}}$ for a minimal nested shell swarm apparatus simulation, and test when they reduce to the ideal $\Sigma_{\hat{\mathbf{m}}}^{\text{SG,red}}$ chart with uniform record phase.
8. Derive the effective spinor coordinate and substrate preparation measures $\mu_{\alpha}$ whose pushforward into the reduced spinor-record chart gives the computed spin-$\tfrac{1}{2}$ half-angle law.
9. Recover photon helicity $\pm1$, exactly two physical transverse photon modes, the material analyzer projector, the analyzer return-map measure $d\nu_{\hat{\mathbf a}}$, the uniform pass-threshold pushforward for $\eta_{\hat{\mathbf a}}$, the sequential analyzer relocking map, Malus' law, and no-signaling polarization statistics from the coaxial contra-rotating pro/anti planar pair.
10. Separate photon helicity closure from massive vector-boson spin closure.
11. Derive integer phase-winding closure for nested shell swarm energy levels by computing the admissible ledgers $(k_I,k_M,k_O,\mathcal R)$ and their allowed changes under $\Delta A_{\text{cycle}}=h$ transactions.
12. Derive the effective far-zone causal-wake envelope of an integer-closed nested shell swarm and decompose its angular content into recovery coefficients that can be compared with spherical-harmonic orbital modes.
13. Derive the native effective envelope extractor $\mathcal E_{\mathrm{orb}}$ for an assembly in an external potential, then apply the angular-envelope lemma to recover $2\pi$ azimuthal single-valuedness, $\ell\in\mathbb N_0$, and $m\in\{-\ell,\ldots,\ell\}$ without importing internal spin data.
14. Map observer-level orbital angular momentum, such as atomic $\ell$, to assembly-level internal rotational action without conflating the two.
15. Rebuild the Bell account from the completed angular-momentum ledger, measurement-response kernel, and basin-measure law.

Until those targets are closed, this document should be read as a disciplined bridge. It is strong enough to say that angular momentum and spin are not primitive architrino properties, strong enough to prevent $h/\hbar$ drift, and strong enough to route Bell's theorem to the correct prerequisite. It is not yet a proof that standard spin and all Bell correlations have been derived from the master equation.
