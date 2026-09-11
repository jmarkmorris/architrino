# Energy

In $\mathbb{A}\mathbb{A}\mathbb{A}$, energy accounting begins with moving architrinos and the causal wakes recorded by their motion. An architrino is a primitive pointlike entity carrying one polarity. A [causal wake](../foundations/architrino.md#the-wake-is-geometry-not-fluid) is the expanding record emitted along its path, not hidden fuel, a vacuum reservoir, or a second substance in the Euclidean void. Motion changes wake geometry, branch timing, and the acceleration available at a receiver; it does not turn the wake into an independent material thing.

This chapter answers four linked questions. What kinetic bookkeeping is allowed for a single architrino? How does work occur when a receiver crosses delayed causal wakes? How do assemblies hide or expose internal energy? How can Noether sea coupling make energy, inertia, and effective geometry appear at larger scales?

The chapter underwrites [Particle Masses](../assemblies/particle-masses.md), [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), [Noether Braid](../noether-braid/noether-braid.md), [Noether Sea Pro/Anti Coupling](../spacetime/noether-sea-pro-anti-coupling.md), [Emergent Metric](../spacetime/emergent-metric.md), and the constructive delay-energy standard in [Delay Dynamics Energy](../validation/simulations/action-energy/delay-dynamics-energy.md).

All such dynamics unfold on absolute time $T$ and the Euclidean void. A causal wake surface is the sphere emitted at one past time $T_t$; a causal root is an emission time satisfying $\|\mathbf X_i(T)-\mathbf X_j(T_t)\|=c_f(T-T_t)$ with $T_t<T$. The receiver lies on that surface when it receives the hit. The [Master Equation](master-equation.md#the-master-equation-canonical-form) assigns each admitted hit a signed acceleration along the line from the emission point to the receiver. Derivations retain the wake speed $c_f$ symbolically; numerical examples use $c_f=1$.

The chapter separates the primitive acceleration law, candidate kinetic and history-energy bookkeeping, effective assembly response, and observer comparison. Mass belongs to the last two levels. Its proposed origin in internal geometry, shielding, and Noether sea coupling is developed here as a recovery target; the quantitative mass map has not been derived.

Spacetime in this framework belongs to the effective level, not the ontological one. The [Noether sea](../spacetime/noether-sea.md) is the proposed ambient population of neutral Noether braid assemblies occupying the Euclidean void. Its constitutive state is a candidate common source of assembly inertia and effective geometry; deriving that shared response from stable assemblies remains a closure obligation.

---

## Kinetic Energy and Momentum of a Single Architrino

The Master Equation specifies architrino acceleration but does not independently specify a kinetic-energy or momentum functional. This section therefore introduces the most general isotropic bookkeeping pair used by the later energy tests and states the conditions under which the pair is mutually compatible.

- **Kinetic Energy $E_k$**
  
  For a single architrino $a$ with velocity $\mathbf V_a(T)$, define a candidate kinetic scalar by
  
  $$E_{k,a}(T) = K(s_a),\qquad s_a=\|\mathbf V_a(T)\|,$$

  [View →](../../../../equation-mapping.html#corpus-equation-9c26d744155fdd7c)
  
  where $s_a$ is the speed. The bookkeeping assumptions are $K(0)=0$, strict convexity, and monotonic increase for $s>0$. These assumptions make speed recoverable from the scalar value, but they do not follow from the acceleration law. The primitive domain has no imposed finite speed cap. An auxiliary comparison chart may impose $K'(s)\to\infty$ at a declared saturation scale, but that chart does not define the primitive ontology. The function must ultimately be fixed by consistency across independently certified branches.

  > Claim grade: guessed for the existence and form of the primitive kinetic scalar. Falsifier: incompatible back-solved $K$ or $\mu_K=K'(s)/s$ on two certified branches, after matching units and boundary conventions, would reject a universal scalar of this form.

- **Momentum $\mathbf{p}_a$**
  
  Define the corresponding isotropic momentum-like vector by
  
  $$\mathbf p_a(T) = P\big(\|\mathbf V_a(T)\|\big)\,\hat{\mathbf V}_a(T), \quad \hat{\mathbf V}_a = \frac{\mathbf V_a}{\|\mathbf V_a\|},$$

  [View →](../../../../equation-mapping.html#corpus-equation-cea96aa9e5fc3a55)
  
  where $P$ is a speed-dependent magnitude. Its physical interpretation remains to be established by consistency with assembly behavior.

  If this momentum is treated as the conjugate momentum for the primitive kinetic scalar, its rate must reproduce the kinetic-scalar power for arbitrary nonzero velocity and acceleration. This work-power compatibility makes $P$ and $K$ dependent:
  $$
  P'(s)=\frac{K'(s)}{s}=\mu_K(s),
  \qquad
  P(s)=\int_0^s\frac{K'(u)}{u}\,du
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-7ef7b1701c66d826)

  after choosing $P(0)=0$. The integral through rest additionally requires $K'(0)=0$ and local integrability of $K'(u)/u$ near $u=0$; these conditions are not supplied by differentiability away from rest alone. If work-power compatibility is not imposed, $\mathbf{p}$ should be read as a momentum-like bookkeeping vector rather than a conjugate momentum generated by the same kinetic chart.

  Under the stated differentiability and near-zero assumptions, the kinetic Lagrangian associated with this momentum account is

  $$
  \ell_K(s)=sP(s)-K(s)
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-b34cbd136b8d7b64)

  because

  $$
  \ell_K'(s)
  =
  P(s)+sP'(s)-K'(s)
  =
  P(s),
  \qquad
  \mathbf p\cdot\mathbf V-\ell_K=K.
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-9055ca326d6a89e1)

  The scalar $K$ is the kinetic-energy candidate, while $\ell_K$ is the kinetic Lagrangian whose velocity derivative generates the declared momentum. A general action cannot use $K$ itself as the kinetic Lagrangian.

  **Radial-collinearity theorem.** Let $D\subseteq\mathbb R^3$ be a connected open velocity domain. Assume every pair $\mathbf u,\mathbf w\in D$ is admissible, or that the admissible increment graph is separately proved triangle-connected, and require

  $$
  \mathbf p(\mathbf w)-\mathbf p(\mathbf u)
  \parallel
  \mathbf w-\mathbf u
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-d49282c6e572403e)

  for every admitted pair. Non-collinear velocity triangles then force one common scale on every increment, so

  $$
  \mathbf p(\mathbf V)=a\mathbf V+\mathbf b.
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-3de3ad511a7d2acd)

  If the domain contains rest with $\mathbf p(\mathbf0)=\mathbf0$, or if proper-rotation equivariance excludes a fixed nonzero offset, then $\mathbf p(\mathbf V)=a\mathbf V$ and $P(s)=as$. Work-power compatibility and $K(0)=0$ then give

  $$
  K(s)=\frac{a}{2}s^2.
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-4f07d9efe71f026b)

  The linear momentum and quadratic kinetic family follows only when all sufficiently rich radial velocity increments remain radial in momentum-account space. Radial acceleration by itself does not supply this hypothesis.

  > Claim grade: derived under the stated all-pairs or triangle-connected collinearity hypothesis. Falsifier: a non-affine momentum map on a connected open domain satisfying that hypothesis would refute the theorem. The coefficient $a$ is an undetermined bookkeeping scale, not primitive architrino mass, and the theorem does not establish a physical conservation law.

  **Kinetic-scalar / closure compatibility.** The conjugacy relation constrains $K$ and $P$ within one kinetic chart. It does not determine the effective assembly signal speed $c_{\text{eff}}$. If an auxiliary finite-saturation comparison chart has scale $c_K$, identifying it with the sea-response scale is an additional matching hypothesis, expressed with a declared tolerance $\epsilon_{cK}$ as
  $$
  \left|\frac{c_{\text{eff}}}{c_K}-1\right|\le\epsilon_{cK}
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-551a6457c0e9f82d)

  This inequality is guessed for a comparison reduction, not derived from Legendre compatibility. Its falsifier is a consistent reduction whose two independently extracted scales differ beyond the declared tolerance. Primitive architrino speed remains uncapped; $c_{\text{eff}}$ belongs to the Noether sea response. The conjugate-momentum construction supplies no reason to identify either effective speed with $c_f$.

**No fundamental mass.**

Individual architrinos have no physical mass property. This is not a zero value of an otherwise present mass, and a universal kinetic coefficient does not give every architrino the same hidden mass. The expressions $E_k=\tfrac12m\|\mathbf V\|^2$ and $\mathbf p=m\mathbf V$ are therefore not primitive premises. The bookkeeping used here has the following scope:

- A kinetic scalar and momentum are candidate bookkeeping functions constrained by work-power and branch consistency.
- The substrate law is written in **acceleration-first** form.
- A quadratic-kinetic chart may introduce one universal coefficient $\mu_{\text{arch}}$, but this coefficient is not physical mass.
- "Mass" in the usual observer sense is sought only at the assembly level as an effective response property of a large internal causal-history record coupled to the Noether sea.

---

## Work–Energy Relation and Per-Hit Power

Kinetic-energy accounting is controlled by the acceleration-first master law, but the familiar quadratic work-energy form applies only after a kinetic proxy has been chosen. For a general primitive kinetic scalar with $s_a=\|\mathbf V_a\|$,

$$
\frac{dE_{k,a}}{dT}
=
K'(s_a)\frac{\mathbf V_a\cdot\mathbf A_a}{s_a}
=
\mu_K(s_a)\,\mathbf A_a\cdot\mathbf V_a,
\qquad
\mu_K(s)\equiv\frac{K'(s)}{s}
$$

[View →](../../../../equation-mapping.html#corpus-equation-a5a7fe4b87f9cb63)

If the optional universal bookkeeping coefficient $\mu_{\text{arch}}$ is introduced, the quadratic proxy $K_{\mu,a}=\frac{1}{2}\mu_{\text{arch}}\|\mathbf V_a\|^2$ satisfies

$$
\frac{dK_{\mu,a}}{dT} = \mu_{\text{arch}}\mathbf A_a(T)\cdot\mathbf V_a(T).
$$

[View →](../../../../equation-mapping.html#corpus-equation-a47c01bd459d1e0f)

This identity is only the derivative of the chosen quadratic scalar. It does not establish that $\mu_{\text{arch}}$ is primitive mass or that the scalar is conserved.

From the canonical per-hit law

$$
\mathbf A_{ij}(T;T_t)
=
\kappa\,\sigma_{ij}\,
\frac{|q_i q_j|}{r_{ij}^2}
W_{ij}^{\mathrm{acc}}(T;T_t)\,\hat{\mathbf{r}}_{ij}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e78bc4ad7eaf2974)

where
$$
D_{t,ij}(T;T_t)
\equiv
c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf{r}}_{ij},
\qquad
D_{r,ij}(T;T_t)
\equiv
c_f-\mathbf V_i(T)\cdot\hat{\mathbf{r}}_{ij},
\qquad
W_{ij}^{\mathrm{acc}}(T;T_t)
\equiv
\frac{c_f}{|D_{t,ij}(T;T_t)|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f456741d2054c9b9)

is the transmitter-side acceleration weight. Here $r_{ij}$ and $\hat{\mathbf r}_{ij}$ are evaluated on the same retained causal branch. The transmitter-side factor $D_t$ sets root transversality and acceleration density; $D_r/D_t$ separately records signed root playback.

Decompose the receiver's velocity into radial and transverse components:

$$\mathbf V_i = V_r \hat{\mathbf{r}}_{ij} + \mathbf V_\perp, \quad V_r=\mathbf V_i\cdot\hat{\mathbf{r}}_{ij}.$$

[View →](../../../../equation-mapping.html#corpus-equation-1dac00db984c671b)

In the quadratic bookkeeping chart, define $K_\mu=\tfrac12\mu_{\mathrm{arch}}\|\mathbf V_i\|^2$. Because $\mathbf A_{ij}\parallel\hat{\mathbf{r}}_{ij}$:

- The **instantaneous work rate** from this hit is
  
  $$
  \frac{dK_\mu}{dT}\bigg|_{\text{hit}}
  =
  \mu_{\text{arch}}\mathbf A_{ij}\cdot\mathbf V_i
  =
  \mu_{\text{arch}}\kappa\,\sigma_{ij}\,|q_i q_j|
  \frac{W_{ij}^{\mathrm{acc}}(T;T_t)}{r_{ij}^2}\,V_r
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-30b33c7cd55f1df3)

  Only $V_r$ contributes to instantaneous quadratic-proxy power. For the primitive scalar $K$, replace $\mu_{\text{arch}}$ by $\mu_K(\|\mathbf V_i\|)$.

- A hit only changes the **along-the-line** component of velocity; sideways motion $\mathbf V_\perp$ is unchanged instantaneously.

---

## Potential Energy and Causal-Wake Potential

Potential energy is a candidate scalar reconstruction of the interaction between a receiver architrino and the net causal-wake record generated by all transmitters, including nontrivial self-hit branches where they exist. The Master Equation supplies acceleration directly; a potential is valid only on a branch chart where its receiver-coordinate gradient reproduces that acceleration.

### Net Causal-Wake Potential

At a point $\mathbf X$ and time $T$, suppose the retained source histories admit scalar representatives on one common regular receiver chart. For a finite set of sources, their sum is

$$\Phi_{\text{net}}(\mathbf X,T) = \sum_o \Phi_o(\mathbf X,T).$$

[View →](../../../../equation-mapping.html#corpus-equation-1743c15c55550355)

Here $\Phi_o$ includes the admitted roots of source $o$ and is normalized per unit receiver polarity in the chosen quadratic bookkeeping chart. The [local scalar derivation](master-equation.md#superposition-and-local-wake-geometry) gives the per-root energy $U_{i,o,b}=\mu_{\text{arch}}\kappa q_iq_o\operatorname{sgn}(D_{t,b})/r_b$: differentiating the selected root as the receiver moves reproduces $\mu_{\text{arch}}\mathbf A_{i,o,b}=-\nabla U_{i,o,b}$. The sign of $D_{t,b}$ is constant on the connected chart, which excludes collisions, singular roots, and root-selection boundaries. Finite superposition then follows by linearity of the gradient; an infinite population also requires a convergent sum and permission to differentiate it.

### Potential Availability Is Geometric

The phrase "an architrino emits potential" should not be read as a transmitter continually spending an internal fuel. The emission is the causal-wake geometry of the architrino itself: at each emission time, an expanding causal wake surface is added to the transmitter's path history. That causal structure can later participate in work, but it is not a material energy substance stored inside the Euclidean void.

Potential energy is therefore relational. It is assigned when a receiver is placed in a transmitter's path-history causal-wake record and its trajectory intersects the relevant causal wake surfaces. The receiver's energy accounting depends on the active causal roots, their inverse-square distance factors, their polarity signs, the transmitter-side root denominator, the transmitter-side acceleration weight, and the receiver's radial motion through the line of action. In the general per-hit law the transmitter-side factor is

$$
D_{t,ij}(T;T_t)
=
c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf{r}}_{ij}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ef3fbb3ed212556d)

and the receiver-side factor is

$$
D_{r,ij}(T;T_t)
=
c_f-\mathbf V_i(T)\cdot\hat{\mathbf{r}}_{ij}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-bc6aaccf1c17c159)

The branch strength is $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$, while the instantaneous power delivered to the receiver is controlled by

$$
\mathbf A_{ij}\cdot\mathbf V_i
=
\big(\mathbf A_{ij}\cdot\hat{\mathbf r}_{ij}\big)\,V_r
$$

[View →](../../../../equation-mapping.html#corpus-equation-31d12a9f37326e23)

The signed radial component retains polarity: an attractive contribution points opposite to $\hat{\mathbf r}_{ij}$. For example, with $c_f=1$, receiver velocity $\mathbf V_i=(1,0,0)$ and contribution $\mathbf A_{ij}=(-1,0,0)$ in normalized units, the power factor is $-1$. Taking the acceleration norm would incorrectly give $+1$. Root timing is separate: differentiating the causal equation along the receiver trajectory gives $dT_t/dT=D_r/D_t$ on a regular branch. Neither the sign of this playback ratio nor the receiver factor replaces the transmitter-side acceleration weight.

Thus the potential to do work is broadly available wherever causal wakes pass, but work is realized only through an actual receiver trajectory. A quiet region is not a region with no causal activity; it is a region where the active wake contributions sum to negligible net acceleration and negligible net power for the assemblies present there.

### Potential Energy

For a receiver architrino $i$ with polarity $q_i$ at position $\mathbf X_i(T)$, the potential energy $U_i(T)$ is the fixed-history bookkeeping value assigned to the current configuration against the causal path-history wake record:

$$U_i(T) = q_i\,\Phi_{\text{net}}[\text{history}]\big(\mathbf X_i(T),T\big).$$

[View →](../../../../equation-mapping.html#corpus-equation-db8d90188e15f2f2)

The sign of $\Phi_{\text{net}}$ is not a sign on total energy. A negative causal-wake potential contribution from an electrino source is a polarity-signed interaction record; it becomes energy bookkeeping only after the receiver polarity, active causal root, line-of-action geometry, transmitter-side factor, transmitter-side acceleration weight, and receiver radial motion are specified. Work can therefore occur relative to a negative potential without introducing a negative-energy substance or a negative total-energy reservoir.

Unlike electrostatics, $\Phi_{\text{net}}$ is not a function of instantaneous source positions but a functional of their past worldlines intercepted by the backward causal-wake record of $\mathbf X_i(T)$. The gradient $\nabla\Phi_{\text{net}}$ is taken with respect to the receiver's spatial coordinates on the fixed background, holding the causal history fixed. The emission selector can be a delta distribution while its emission-time integral is smooth on a regular receiver chart. For a stationary source with a retained root, the resulting scalar is proportional to $1/r$, smooth away from the source. A finite-width selector alone does not regularize a coincident point-source amplitude or an uncontrolled infinite sum.

For a mollified effective potential $\Phi_\eta$ in the quadratic bookkeeping chart, the fixed-history target is

$$\mu_{\text{arch}}\mathbf A_i(T) = -\nabla_{\mathbf X_i}U_i(T) = -q_i \nabla_{\mathbf X_i} \Phi_\eta[\text{history}]\big(\mathbf X_i(T),T\big),$$

[View →](../../../../equation-mapping.html#corpus-equation-6eef4154628cac82)

This is a matching condition for the declared finite-width model. The sharp regular-chart identity above already holds for moving simple roots; it does not require a quasi-static source. A mollified kernel needs its own scalar derivation and convergence comparison. For a general kinetic scalar, a variational reduction would instead concern the conjugate-momentum rate and must be derived from the same accepted action. Replacing $\mu_{\text{arch}}$ pointwise by $\mu_K$ does not prove that reduction.

### Macroscopic Cancellation and Localized Resonance

Constant causal emission by many architrinos does not imply a large random macroscopic acceleration. The net causal-wake potential is a superposition, and in a large, incoherent population the leading gradients arrive with many signs, distances, phases, and line-of-action directions. For a receiver sampling such a population, macroscopic quietness is a two-moment condition, not only a mean-zero statement:

$$
\left\|
\left\langle \nabla \Phi_{\text{net}}\right\rangle_W
\right\|
\le
\epsilon_{\text{mean}},
\qquad
\frac{
\operatorname{Var}_W\!\left(\nabla\Phi_{\text{net}}\right)
}{
\left\|\nabla\Phi_{\text{coh}}^{\text{bound}}\right\|^2
}
\le
\epsilon_{\text{var}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7380906ec15d3d86)

Here $\langle\cdot\rangle_W$ denotes the declared sampling average, and $\operatorname{Var}_W(\mathbf G)=\langle\|\mathbf G-\langle\mathbf G\rangle_W\|^2\rangle_W$ is a scalar variance. The reference $\nabla\Phi_{\text{coh}}^{\text{bound}}$ is a nonzero coherent-assembly gradient measured with the same normalization. Both bounds use the horizon, screening, and summation prescription that makes the many-source sum converge. A small mean alone does not control fluctuations. These are the conditions needed for a densely active Noether sea to be macroscopically quiet; incoherence does not establish them. The proposed vacuum-like limit is a population with small mean response and small fluctuations for the probes being considered.

Mean-zero wake potential is therefore not zero total energy. A statistically neutral $50/50$ electrino/positrino inventory can make the large-scale potential gradient and received power nearly vanish while still carrying kinetic energy, local correlated interaction energy, retained wake-history content, and Noether sea organization. The candidate conserved quantity for an isolated exact trajectory is a history-aware total ledger, not "initial kinetic energy plus a naive instantaneous potential" evaluated after the wake record has been discarded. Its conservation remains a closure target until one accepted causal action or causal-wake update derives the motion, wake, and boundary accounts on the same provenance-complete causal-root record.

For energy accounting, cancellation is applied only after transmitter identity, polarity, emission time, active causal root, branch Jacobian, line-of-action geometry, and receiver radial power have been retained. A net-zero scalar potential channel is therefore a projection of a richer transmitter-tagged ledger, not proof that no wake-history energy, internal branch energy, or coherent work opportunity remains available to a receiver whose branch resolves the contributing rows.

A localized phase-correlated assembly is the candidate setting for sustained, non-canceling exchange. A collinear breather denotes the proposed bounded oscillation of an opposite-polarity pair along one line. Its existence requires the complete partner and self-hit acceleration balance and a retained bounded trajectory. The $1/r^2$ factor favors nearby hits at comparable weights, but nearest-branch dominance also requires control of root weights, multiplicities, and the far-source sum. Neither binding nor quietness follows from distance scaling alone.

---

## Energy Conservation and Exchange

Energy conservation is a required closure target. Its derivation must show, on one retained causal-root record, how kinetic motion exchanges with causal-history interaction content while every active root, admitted self entry, fold, and boundary transfer has unique provenance. The wake term in the candidate ledger should not be read as an independent material reservoir that drains from the transmitter with every unreceived causal wake surface; it must be derived as nonlocal bookkeeping from the same time-translation-invariant causal action or causal-wake update that generates the acceleration contributions. Time-translation symmetry is necessary but insufficient: the action route must extend the variational symmetry argument of [Noether (1918)](https://eudml.org/doc/59024) to the delayed history and its boundary terms, while either route requires signed motion, wake, and boundary accounts with complete pairwise provenance and no double booking. For mollified working models, an exact conservation claim additionally requires the regularization to inherit the accepted action or update rather than being inserted only at the acceleration-operator level.

Virial language is a conditional reduced-model comparison. Suppose a derived canonical reduction supplies $\dot{\mathbf p}=-\nabla U$ and a potential homogeneous of degree $p$ in its spatial coordinates. The product rule gives $d(\mathbf X\cdot\mathbf p)/dT=\mathbf V\cdot\mathbf p-pU$. Averaging over $[T_a,T_b]$ leaves the endpoint term $[\mathbf X\cdot\mathbf p]_{T_a}^{T_b}/(T_b-T_a)$. The familiar $\langle2K-pU\rangle=0$ follows only when that endpoint term vanishes and the kinetic chart is quadratic, so $\mathbf V\cdot\mathbf p=2K$. For a general $K$, the left kinetic term is $sP(s)$; for example $K=s^4$ gives $sP=4K/3$. Here $p$ in $pU$ is the homogeneity degree, distinct from the vector $\mathbf p$. This calculus does not derive a canonical reduction of the delayed law; see [Analytic Baselines](../validation/simulations/action-energy/analytic-baselines.md#analytic-baselines).

For a differentiable trajectory, the kinetic work integral is an identity of the chosen scalar. In a quadratic chart with a valid receiver potential $\mu_{\text{arch}}\mathbf A=-\nabla U$, its relation to potential change includes the explicit time dependence:

$$
\Delta E_k
=
\int_{T_a}^{T_b}
\mu_K(\|\mathbf V\|)\,\mathbf A\cdot\mathbf V\,dT,
\qquad
\Delta K_\mu=-\Delta U+
\int_{T_a}^{T_b}\partial_T U(\mathbf X(T),T)\,dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-179020f3e21467c8)

The second equality follows from $dU/dT=\nabla U\cdot\mathbf V+\partial_T U$. Fixed source identities do not make their wake histories stationary. Only when the explicit-time term vanishes does it reduce to $\Delta K_\mu=-\Delta U$. A full history-functional energy can require additional boundary/history terms; a receiver potential is not that functional by definition.

For an **isolated system** of architrinos and their wakes, the candidate total-energy functional is:

$$E_{\text{total}} = \sum_a E_{k,a} + U_{\text{int}} + E_{\text{wake}},$$

[View →](../../../../equation-mapping.html#corpus-equation-8c38f91bbb573425)

Its acceptance as a constant of motion requires a derivation from the accepted causal action or causal-wake update, a provenance-complete causal-root ledger with no double booking, and closed motion, wake, and boundary accounts on the same record. In mollified working models, this same bookkeeping is exact only when the mollified kernel inherits the action-level time-translation symmetry; otherwise it remains the natural candidate history functional to monitor, but not an established exact invariant.

- $U_{\text{int}}$ is an optional effective decomposition of near-field interaction energy.
- $E_{\text{wake}}$ is the candidate history-dependent account for nonlocal interaction content carried by wake structures and any radiation-like transport through the Noether sea.

These equations specify the ledger that must be derived and closed; they do not assert that exact energy conservation has already been established.

The same distinction governs cosmological redshift. Because the Euclidean void does not expand and absolute time supplies the comparison parameter, a transparent redshift branch cannot treat the photon's missing energy as a bookkeeping disappearance. At the universe-state level, the conservation target is a scalar ledger of architrino kinetic/configuration energy, causal-wake energy in flight, and Noether sea constitutive energy:

$$
E_{\mathrm{tot}}(T)
=
E_{\mathrm{arch}}(T)
+E_{\mathrm{wake}}(T)
+E_{\mathrm{sea}}(T),
\qquad
\frac{dE_{\mathrm{tot}}}{dT}=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-ad1ce80deb662efa)

This global target requires the total energy on the constant-$T$ leaf to be finite or convergently summable. For an unbounded or observationally truncated cosmology, the safe conservation statement is local continuity,

$$
\partial_T\rho_E+\nabla_{\mathbf X}\cdot\mathbf S_E=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-8906a676cd2c9cc2)

tested through finite windows and boundary fluxes. In the pure transparent-path limit, after source, recoil, remnant, and boundary terms have been separated, a bundle redshifted by $1+z$ carries the deficit

$$
\Delta E_{\gamma}^{\mathrm{loss}}
=
E_{\mathrm{emit}}-E_{\mathrm{obs}}
=
E_{\mathrm{emit}}\frac{z}{1+z},
\qquad
-\Delta E_{\gamma}^{\mathrm{loss}}
+\Delta E_{\mathrm{sea,path}}
=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-c9d3af81587e21ed)

Here $\Delta E_{\mathrm{sea,path}}>0$ denotes energy gained by the retained path and Noether sea account. If the Noether sea update needed to close this row is nonlocal, re-radiating, path-history inconsistent, or incompatible with image sharpness and CMB blackbody preservation, the fixed-void redshift branch has failed the energy ledger rather than solved cosmological redshift.

Consistency rule: either use $E_{\text{wake}}$ alone for all interaction energy, or, if a $U_{\text{int}}$ pairwise term is retained as an effective decomposition inside assemblies, then $E_{\text{wake}}$ must explicitly omit the corresponding near-field content to prevent double counting.

For a hybrid decomposition, the omission must be checkable on the same finite window. Let $W$ denote the retained spatial region and observation record. Use one averaging kernel $W_\ell$, with resolution length $\ell$, to separate near and far interaction content and to construct the later matter-to-sea source $S_{\mathrm{mat}\to\mathrm{sea}}^{(\ell)}$. The near part is represented by $U_{\mathrm{int},W}$; only the far part is then added separately to the total. Define the partition-overlap residual
$$
\mathcal{R}_{\mathrm{dbl},W}
=
\frac{
\left|
E_{\mathrm{wake},W}^{(\eta)}
-
\left(E_{\mathrm{wake},W}^{\mathrm{far}}+E_{\mathrm{wake},W}^{\mathrm{near}}\right)
\right|
+
\left|
U_{\mathrm{int},W}
-
E_{\mathrm{wake},W}^{\mathrm{near}}
\right|
}{
\left|E_{\mathrm{wake},W}^{(\eta)}\right|
+
\left|U_{\mathrm{int},W}\right|
+
\varepsilon_E
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-89a902362ac9cb61)

with $\varepsilon_E > 0$ a declared denominator floor. A retained $U_{\text{int}}+E_{\text{wake}}$ decomposition is admissible only when $\mathcal{R}_{\mathrm{dbl},W}\to0$ under refinement of the same window, boundary record, and regularized causal action.

### Conservation Status

The conservation claim is a level-specific statement. For an isolated branch whose acceleration law is generated by a time-translation-invariant causal action for which a delay-compatible Noether theorem has been proved, and whose signed motion, wake, and boundary accounts close on a provenance-complete causal-root record, the target statement is:

$$
\frac{d}{dT}E_{\text{total}}(T)=0,
\qquad
E_{\text{total}}(T)
=
\sum_a E_{k,a}(T)
+
U_{\text{int}}(T)
+
E_{\text{wake}}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8925bc8fee546c1f)

No accepted causal action, delay-compatible Noether theorem, provenance-complete signed-account record, or boundary-flux closure currently establishes this display as a physical invariant. It gives the shape of the theorem to be proved.

This is not a claim that $\sum_a E_{k,a}$ is constant on $\Sigma_T$, nor that a finite simulation window conserves its particle-only ledger. Delayed hits move energy between mechanical motion and causal-wake history, and finite windows must also name boundary flux, external work, and residuals. A calculation that omits one of those terms has not established energy nonconservation; it has exposed an incomplete retained record.

For any candidate scalar action kernel proportional to $1/r$ with the time-normalized constraint $\tilde g=T_r-T_t-r/c_f$, dimensional consistency requires the coefficient $\mu_{\text{arch}}\kappa$, not $\kappa/c_f$. The corresponding regularized interaction diagnostic for that candidate is proportional to $\delta_\eta(\tilde g)/r$; simple-root collapse produces $W^{\mathrm{acc}}/r$ once. An inverse-square acceleration density with a manually inserted $W^{\mathrm{acc}}$ is not an energy functional. With the polarity convention that like signs repel, the sharp like-polarity interaction charge is positive and the boundary derivative inherits the outer minus sign declared in the action.

The wake-energy account must come from whatever action kernel is eventually accepted as generating the acceleration operator. The $1/r$ construction above constrains candidates only. Reusing the $1/r^2$ acceleration formula as energy gives the wrong units and double-counts the root weight.

In working models the exact claim is conditional. If the mollifier, history window, self-branch cutoff, or another history-kernel construction is inserted only at the equation-of-motion level, then the same expression is a diagnostic to monitor, not a proved Noether charge. Exact conservation is established only when the same symmetry-preserving action or independently derived causal-wake update supplies both the acceleration contribution and the energy row, and when the energy residual in this section vanishes under refinement. The formal construction routes, crosswalk residual, and acceptance conditions for $E_{\text{wake}}$ are isolated in [Delay Dynamics Energy](../validation/simulations/action-energy/delay-dynamics-energy.md).

The finite-$\eta$ pathology theorem target in [Master Equation](./master-equation.md#finite-regulator-pathology-quarantine-theorem-target) requires an independently derived conserved charge and a lower bound on its nonkinetic part over the same admissible history class. Then the positive quadratic kinetic sum is bounded wherever the solution exists. Defining a compensating wake term by integrating the same negative kinetic power makes the total constant by construction; that arithmetic identity is not independent evidence against runaway. A missing lower bound or an unclosed boundary account leaves the no-runaway conclusion unproved.

For reaction or radiation events, energy can leave the source assembly as photon output, recoil, medium excitation, remnant excitation, wake-carried exchange, or handoff terms, but those are named outputs rather than hidden losses. The event-level version is the componentwise ledger closure in [Reaction Ledger](../validation/reaction-ledger.md#residual-routing-event-ledger-contract).

### Wake Escapement

This is a boundary-accounting idea, not a new energy reservoir. If a wake leaves the chosen local window before any retained receiver crosses it, the local work ledger cannot spend that wake internally. The accounting must therefore mark it as escaped flux, recoil, boundary exchange, or another declared handoff rather than hiding it inside the local assembly.

For a finite local window $W\subset\Sigma_T$, the **wake-escapement diagnostic set** is the set of emitted causal wake surfaces whose first retained boundary crossing occurs before any retained receiver intersection inside that window. More explicitly, if architrino $a$ emits at $T_t$, define the causal wake surface at later time $T$ by

$$
C_a(T;T_t)
=
\left\{
\mathbf Y\in\Sigma_T:
\left\|\mathbf Y-\mathbf X_a(T_t)\right\|
=
c_f(T-T_t)
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f9ab8f3a26ebd83e)

The emitted causal wake surface belongs to the escapement set $\mathcal{E}_{\mathrm{esc}}(W)$ when it has a first retained boundary crossing
$$
C_a(T_{\partial W};T_t)\cap\partial W\ne\varnothing
$$

[View →](../../../../equation-mapping.html#corpus-equation-cf92985fd69d74d1)

and there is no retained receiver hit before that crossing:
$$
\nexists\, b,T_r
\quad
\text{with}
\quad
T_t<T_r<T_{\partial W},
\quad
\mathbf X_b(T_r)\in W,
\quad
\mathbf X_b(T_r)\in C_a(T_r;T_t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-012f94e1f66b159d)

This surface-level set is an earliest-crossing diagnostic, not a measure of the escaped fraction of a wake. When only some surface sectors cross $\partial W$, or when retained receivers intersect other sectors, quantitative escapement is the surface-resolved boundary flux through $\partial W$, with a declared solid-angle or surface partition when needed. A receiver intersection records local work; it does not imply depletion or absorption of the remaining causal wake surface unless that mechanism is separately derived from the action.

Wake escapement is therefore a finite-window boundary classification, not a new substance in the Euclidean void. It names the portion of causal-wake history that cannot be balanced by local receiver work because no local receiver intercepted it. In a contracting binary, the persistent positive tangential drive identified in [Binary Dynamics](binary-dynamics.md#tangential-drive-and-wake-escapement) should be read against this boundary ledger: particle kinetic gain, local interaction-energy change, recoil, and escaped wake flux are parts of one balance law.

For a finite spatial window $W\subset\Sigma_T$, the conservation target is a balance law. The proposed energy, momentum, and angular-momentum accounts are finite-window history functionals; particle transport, interaction and wake fluxes, and any unresolved residual must all be included. Write
$$
E_W(T)
=
\sum_{a:\mathbf X_a(T)\in W}K_a(T)
+
U_{\mathrm{int},W}(T)
+
E_{\mathrm{wake},W}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-caaead4cfb7cf0ad)

where the terms include only the kinetic, interaction, and wake-history content retained by the declared window record. The finite-window energy balance should take the residual form
$$
\frac{dE_W}{dT}
+
\int_{\partial W}\mathbf{J}_E\cdot\hat{\mathbf{n}}\,dA
=
P_{\mathrm{ext},W}
+
\mathcal{R}_E(\eta,\Delta T,W)
$$

[View →](../../../../equation-mapping.html#corpus-equation-06b99ef1ba25294f)

Here $\mathbf J_E$ is the total boundary energy flux: mechanical transport by crossing particles or assemblies, interaction transport, and causal-wake transport, partitioned without overlap. $P_{\mathrm{ext},W}$ is external work by controls outside the retained system; $\mathcal R_E$ is the residual after physical transport and external work have been included. For example, a particle leaving $W$ with kinetic proxy $K_a$ removes $K_a$ from the particle sum even without local work. Its outward mechanical flux must record that amount; timestep refinement cannot erase it. In distribution form its kinetic density is $K_a\delta(\mathbf X-\mathbf X_a)$ and its transport flux is $K_a\mathbf V_a\delta(\mathbf X-\mathbf X_a)$. These are bookkeeping distributions, not new substances. A finite-window conservation claim requires $\mathcal R_E\to0$ under the same independently derived action or wake account.

A receiver-gradient kernel identity does not by itself define a wake-energy boundary flux. Any proposed boundary contribution must be derived from the same accepted action or causal-wake update as the motion law, and its finite-window leakage must vanish or appear explicitly in $\mathbf J_E$. Otherwise it remains a diagnostic partition rather than exact energy conservation.

The analogous momentum and angular-momentum closures must also remain tied to the same window and boundary data. The finite-window momentum functional $P_W^i$ contains the mechanical momentum retained in $W$ plus the retained wake-history momentum record:
$$
\frac{dP_W^i}{dT}
+
\int_{\partial W}\Pi^{ij}\hat{n}_j\,dA
=
F_{\mathrm{ext},W}^i
+
\mathcal{R}_P^i(\eta,\Delta T,W)
$$

[View →](../../../../equation-mapping.html#corpus-equation-304b6c99102112b3)

For a declared origin $\mathbf X_0$, the corresponding angular-momentum history functional has the schematic form
$$
\mathbf{L}_W(T)
=
\sum_{a:\mathbf X_a(T)\in W}
\big(\mathbf X_a(T)-\mathbf X_0\big)\times\mathbf p_a(T)
+
\mathbf{L}_{\mathrm{wake},W}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b1002c4d8bd76364)

where $\mathbf p_a$ is the declared mechanical momentum proxy for the chosen kinetic bookkeeping. Its finite-window balance target is
$$
\frac{dL_W^i}{dT}
+
\int_{\partial W}\Lambda^{ij}\hat{n}_j\,dA
=
\tau_{\mathrm{ext},W}^i
+
\mathcal{R}_L^i(\eta,\Delta T,W)
$$

[View →](../../../../equation-mapping.html#noether-conservation)

Here $\Pi^{ij}$ and $\Lambda^{ij}$ are finite-window flux diagnostics for retained causal wakes and assembly crossings, not new substrate fields. $\tau_{\mathrm{ext},W}^i$ is the external torque about the same origin $\mathbf X_0$. If the energy, momentum, and angular-momentum residuals can be made small only by changing the window measure, boundary wake record, or regularization separately for each observable, the calculation has fitted separate summaries rather than demonstrated one causal-history conservation law.

Cosmological inventory comparisons add one more finite-window caution. A gravitational binding contribution is negative relative to dispersed matter in the declared window, but the sign is meaningful only after the boundary and coarse-graining are fixed. In this chapter, $G_{\mathrm{eff}}$ in the binding line is a provisional external comparison input until the mass map and Noether sea response tensor independently derive it. For a component inventory over $W$,
$$
E_{\mathrm{bind},W}^{\mathrm{grav}}
=
-\frac{1}{2}
\int_W\!\int_W
\frac{G_{\mathrm{eff}}(\theta;x_{\mathrm{eff}}^i,y_{\mathrm{eff}}^i)\,
\rho_{\mathrm{eff}}(x_{\mathrm{eff}}^i)\rho_{\mathrm{eff}}(y_{\mathrm{eff}}^i)}
{\|\mathbf x_{\mathrm{eff}}-\mathbf y_{\mathrm{eff}}\|}
\,dV_{x_{\mathrm{eff}}}\,dV_{y_{\mathrm{eff}}}
+
\mathcal{B}_{\partial W}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b85e0d24b6eb535b)

Here $\theta$ labels the declared sea state, $\rho_{\mathrm{eff}}$ is observer-level mass density for this gravitational comparison, and $\mathbf x_{\mathrm{eff}},\mathbf y_{\mathrm{eff}}$ are its effective spatial coordinates. None is a primitive architrino mass density. $\mathcal B_{\partial W}$ records boundary and embedding terms. Neither this comparison nor an inertial response measurement derives gravitational mass or its equality with inertial mass. The corresponding inventory residual is
$$
\mathcal{R}_{\mathrm{grav\,bind},W}
=
\frac{
\left|
E_{\mathrm{bind},W}^{\mathrm{grav}}
-
E_{\mathrm{bind},W}^{\mathrm{obs}}
\right|
}{\epsilon_{\mathrm{bind}}}
+
\frac{|\mathcal{B}_{\partial W}|}{\epsilon_{\partial W}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6855e08f0b925e8f)

With positive comparison tolerances $\epsilon_{\mathrm{bind}}$ and $\epsilon_{\partial W}$, the preceding residual compares binding and boundary energies in their own units. The independently derived coupling is then compared with the coupling used in that inventory through
$$
\mathcal{R}_{G\text{-consist},W}
=
\frac{
\left|
G_{\mathrm{eff}}^{\mathrm{bind}}
-
G_{\mathrm{eff}}^{(\zeta,\mathcal{M})}
\right|
}{
\left|G_{\mathrm{eff}}^{(\zeta,\mathcal{M})}\right|
+
\varepsilon_G
}
\le
\epsilon_G
$$

[View →](../../../../equation-mapping.html#corpus-equation-de6b1951adaebcc7)

where $G_{\mathrm{eff}}^{\mathrm{bind}}$ is the value used in the inventory comparison and $G_{\mathrm{eff}}^{(\zeta,\mathcal{M})}$ is the value derived from shielding, exposed response, and the Noether sea response tensor. Until $\mathcal{R}_{G\text{-consist},W}$ is reported on the same window, the cosmological binding line is comparison bookkeeping only, not a derived inventory contribution. This keeps gravitational binding from being used as an adjustable bookkeeping sign that can repair the cosmic energy inventory without specifying the same window, boundary wake history, and effective $G_{\mathrm{eff}}$ used by the rest of the cosmology branch. The stronger same-record requirement is that $G_{\mathrm{eff}}^{(\zeta,\mathcal{M})}$, the response-speed tensor that supplies $c_{\text{eff}}$, and the ruler/metric response consumed by the effective geometry chapter all be read from one Noether sea response record. If those quantities require separate sea records or separately tuned response tensors, the gravity, clock, and ruler sectors have been fitted independently rather than derived from one exposed-energy and medium-response ledger.

**Theorem target (center of response).** The standard center-of-mass theorem depends on equal-time internal force cancellation. In delayed causal dynamics that cancellation is not available as a particle-only statement on $\Sigma_T$: the reciprocal hit generally belongs to a different emission time, a different causal-root branch, or a boundary wake record not retained by the finite window. For a moving assembly window $W_A(T)$, interpret $\Pi^{ij}$ below as flux relative to its boundary. If $g_P^i$ is the retained momentum density and $v_{\partial W}^j$ the boundary velocity, this flux is $\Pi_{\mathrm{lab}}^{ij}-g_P^i v_{\partial W}^j$. Energy and angular momentum require the analogous transport correction. With this convention, the replacement target is to prove that there is a response center $\mathbf X_{\mathrm{resp}}(T)$ and an assembly response tensor $M_A^{ij}$ such that the finite-window momentum balance reduces, over resolved windows, to
$$
\frac{d}{dT}\left(M_A^{ij}\frac{dX_{\mathrm{resp},j}}{dT}\right)
=
F_{\mathrm{ext},W_A}^i
-
\int_{\partial W_A}\Pi^{ij}\hat{n}_j\,dA
+
\mathcal{R}_{\mathrm{resp}}^i(\eta,\Delta T,W_A)
$$

[View →](../../../../equation-mapping.html#corpus-equation-460fea5f9bf52b7e)

Here spatial indices $i,j\in\{1,2,3\}$ are summed when repeated, and $M_A^{ij}$ is a candidate assembly response tensor, not a set of constituent masses. The pair $(\mathbf{X}_{\mathrm{resp}},M_A^{ij})$ is not free to be chosen after the balance is fitted. The response center must be pinned independently by the exposed internal-energy ledger,
$$
X_{\mathrm{resp}}^i(T)
\equiv
\frac{
\displaystyle\int_{W_A(T)}
X^i\,
\zeta_{\mathrm{loc}}(\mathbf X,T)\,
e_{\text{internal}}(\mathbf X,T)\,dV
}{
\displaystyle\int_{W_A(T)}
\zeta_{\mathrm{loc}}(\mathbf X,T)\,
e_{\text{internal}}(\mathbf X,T)\,dV
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1ace26de4419922b)

Here $e_{\mathrm{internal}}$ is the assigned internal-energy density and $\zeta_{\mathrm{loc}}$ its local exposure weight. The definition applies whenever the denominator is positive and the window contains the exposed assembly record on the absolute-time slice $\Sigma_T$. The tensor $M_A^{ij}$ must then reduce to the independently extracted response tensor $\mathsf{I}_A^{ij}$ on the same branch chart. Only when these independently defined objects satisfy the balance with $\mathcal{R}_{\mathrm{resp}}^i\to0$ does it reduce to the familiar center-of-mass form. A non-vanishing irreducible residual means the exposed-energy center is not the inertial response center for that branch, rather than a license to redefine the center. Until that theorem is closed, a center-of-mass trajectory is an effective readout of the assembly response, not a substrate-level proof that internal delayed acceleration contributions cancel instantaneously. Equivalently, $\mathbf{X}_{\mathrm{resp}}$ and the inertial-response center are two different response summaries of the same retained assembly record: one weights exposed internal energy, while the other is inferred from momentum response. Their coincidence is a theorem target, not a definition. One possible obstruction is the finite-window wake-momentum flux across $\partial W_A$; if that boundary record has a secular or nonrecurrent component, the two centers can differ even when the equal-time particle picture looks nearly balanced. A comparison with a Hamiltonian reduction also needs control of the retained momentum carried through the history boundary; recurrence of an equal-time particle picture alone does not supply that control.

Particle-only recoil is therefore not anomalous merely because mechanical momentum changes. The anomalous-recoil row is the already defined irreducible $\mathcal R_{\mathrm{resp}}^i$ after the independently defined response center, external contribution, and boundary wake-momentum flux have been fixed on the same window. A nonzero mechanical recoil balanced by that ledger is ordinary delayed exchange, not isolated self-acceleration.

In practice, finite systems or simulation domains should monitor $E_W(T)$, $P_W^i(T)$, and $L_W^i(T)$ together with their boundary fluxes and residuals. $E_{\text{total}}(T)$ is the isolated-system limit when the declared window contains the full wake-history record and the boundary terms vanish.

---

## Entropy, Free Energy, and Coarse Residuals

Entropy and free-energy language belongs to coarse-grained records, not to empty Euclidean void. It is useful when a simulation or continuum reduction groups many microhistories into the same retained macrostate. For a declared coarse map $\mathcal Q:S(T)\mapsto z$ with cell probabilities $p_\alpha$ over the retained histories, the entropy diagnostic is
$$
S_{\mathcal Q}
=
-k_B\sum_{\alpha}p_\alpha\log p_\alpha
$$

[View →](../../../../equation-mapping.html#corpus-equation-c0ed442a8c9df90d)

When a temperature-like channel $T_{\mathcal Q}$ is declared by the same record, the Helmholtz-style free-energy diagnostic is
$$
F_{\mathcal Q}
=
E_{\mathcal Q}
-
T_{\mathcal Q}S_{\mathcal Q}
$$

[View →](../../../../equation-mapping.html#corpus-equation-fa5054ee6924be6c)

Here $k_B$ is the observer-level entropy-unit conversion, and $E_{\mathcal Q}$ is the energy assigned by the same coarse map. These definitions supply diagnostics; they do not by themselves prove a relaxation law or make this free energy an available-work bound. Such interpretations require an effective thermodynamic reduction with a specified environment.

The distinction matters because energy conservation does not by itself measure work availability. Two records with the same total energy can have different free-energy diagnostics when one retains a concentrated heat, chemical, photon-channel, or potential-gradient channel and the other has dispersed the same energy into unresolved thermal, boundary, or wake-history records. A finite-window calculation must therefore close the energy ledger and the entropy ledger on the same retained record before claiming that energy remained useful, became waste heat, or crossed the boundary as low-grade radiation.

For an isolated spatial window $W$ observed over $[T_a,T_b]$, suppose $T_{\mathcal Q}(T')>0$ and a separately characterized production channel has $\mathcal D_{\mathcal Q}(T')\ge0$. Here $\Delta_W S_{\mathcal Q}=S_{\mathcal Q,W}(T_b)-S_{\mathcal Q,W}(T_a)$. Positive denominator floors $\varepsilon_T$ and $\varepsilon$ have temperature and entropy units respectively. A coarse thermodynamic diagnostic is
$$
\mathcal R_{S,W}
=
\frac{
\left[
-
\Delta_W S_{\mathcal Q}
+
\int_{T_a}^{T_b}
\frac{
\mathcal D_{\mathcal Q}
}{
T_{\mathcal Q}+\varepsilon_T
}
dT'
\right]_+
}{
|\Delta_W S_{\mathcal Q}|
+
\int_{T_a}^{T_b}
\left|
\frac{\mathcal D_{\mathcal Q}}{T_{\mathcal Q}+\varepsilon_T}
\right|dT'
+\varepsilon
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-11c8271067035366)

Here $[x]_+=\max(x,0)$. $\mathcal D_{\mathcal Q}$ denotes nonnegative conversion into unresolved degrees of freedom within the window, not signed energy or entropy transport through its boundary. Zero residual implies $\Delta_W S_{\mathcal Q}\ge\int_{T_a}^{T_b}\mathcal D_{\mathcal Q}/(T_{\mathcal Q}+\varepsilon_T)\,dT'\ge0$ under these assumptions. If the window exchanges entropy, include that signed boundary transfer separately before testing production. This is a declared coarse diagnostic, not a derived microscopic thermodynamic law; a signed negative production input would invalidate its nondecrease interpretation.

For the consolidated mapping from legacy entropy formulas into $\mathbb{A}\mathbb{A}\mathbb{A}$ record projections, see [Entropy](entropy.md).

In near-equilibrium comparison runs, response and fluctuation must also come from one record. The fluctuation-dissipation map may be invoked only after that same retained record supplies an admissible temperature channel. Concretely, the record $\theta_W$ that supplies $\chi_{AB}''$ and $S_{AB}^{\mathrm{meas}}$ must pass $\mathcal R_{S,W}$ and must yield consistent temperatures from at least two independent observable pairs:
$$
\mathcal{R}_{T,W}
=
\frac{
\left|
T_{\mathcal Q}^{(AB)}
-
T_{\mathcal Q}^{(A'B')}
\right|
}{
\left|T_{\mathcal Q}^{(AB)}\right|
+
\left|T_{\mathcal Q}^{(A'B')}\right|
+
\varepsilon_T
}
\le
\epsilon_T
$$

[View →](../../../../equation-mapping.html#corpus-equation-866c9c36d6549fc3)

If this sea-temperature admissibility check fails, the record may report the dissipative response $\chi_{AB}''$ alone, but it may not use an equilibrium fluctuation-dissipation map as closure evidence. If an observable $O_A$ has response kernel $\chi_{AB}(\omega)$ to a controlled source coupled to $O_B$, the causal-response check is that the dissipative part and the equilibrium fluctuation spectrum $S_{AB}(\omega)$ obey a declared classical or quantum fluctuation-dissipation row. A dimensionless record residual can be written as
$$
\mathcal R_{\mathrm{FD}}(A,B)
=
\frac{
\left\|
S_{AB}^{\mathrm{meas}}(\omega)
-
\mathcal F_T\!\left(\chi_{AB}''(\omega)\right)
\right\|_{\omega}
}{
\left\|S_{AB}^{\mathrm{meas}}(\omega)\right\|_{\omega}
+
\left\|\mathcal F_T\!\left(\chi_{AB}''(\omega)\right)\right\|_{\omega}
+\varepsilon
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0d9aa2aa4280bef2)

Here $\mathcal F_T$ is the record's chosen fluctuation-dissipation map, and $\chi_{AB}''$ is the imaginary, dissipative response. A passing value supports the declared comparison on its tested domain. Failure rejects that comparison; it does not by itself identify separate fitting as the cause.

---

## Noether Sea, Effective Spacetime, and Energy Storage

At the fundamental level, the Euclidean void is an empty container. **Effective spacetime** is the observer-level summary of a **sea of high-energy Noether braid assemblies**. The following size and energy statements are hypotheses awaiting a certified Noether braid and scale map:

- These Noether braids are extremely small compared to ordinary particles (electrons, protons, etc.).
- Each Noether braid is itself a tightly bound architrino assembly with very high internal kinetic and potential energy; coincident-midpoint orthogonal-axis braid is the best-developed orthogonal-axis three-binary member, not the definition of the sea.
- As a sea, they form a **dense population of coupled assemblies** occupying the Euclidean void. In this hypothesis, the population carries assembly density and internal stress. Its constitutive response is the proposed source of effective permittivity, permeability, and inertial response. Recovering these quantities from the population would provide a common account of:
  - Emergent inertia and mass,
  - Effective causal-cone behavior and Lorentz-like behavior,
  - Effective gravitational coupling (emergent geometry at large scales).

Energy in this picture is distributed across:

1. **Unbound Architrinos** (their abundance requires a population model),
2. **Standard Model assemblies** (electrons, nucleons, etc.),
3. The **Noether sea** and, in bridge prose, the spacetime medium.

---

## Assemblies: Internal vs Apparent Energy

For composite systems such as Standard Model particles, nuclei, and other bound states formed from architrinos and embedded in the Noether sea, distinguish:

- **Total internal energy**: energy retained by the assembly and by its immediate Noether braid environment,
- **Apparent energy**: what leaks out as a long-range wake signature and governs how the assembly interacts with the outside world.

### Internal Energy of an Assembly

For an assembly $A$ (e.g., Noether braid or higher structure), let $i\in A$ run over its constituent architrinos. Then:

$$E_{\text{internal}}(A) = \sum_{i\in A} E_{k,i} + \frac{1}{2} \sum_{\substack{i,j\in A \\ i\neq j}} U_{ij} + E_{\text{history},A} + E_{\text{coupling to sea}}(A),$$

[View →](../../../../equation-mapping.html#corpus-equation-a355acf2081a9004)

where:

- $E_{k,i}$ is the kinetic energy of architrino $i$,
- $U_{ij}=U_{ji}$ is a deliberately symmetric allocation of pair interaction energy: each unordered pair is assigned one value, so the factor $1/2$ counts it once. It is not the unsymmetrized receiver potential $U_i$ evaluated twice,
- $E_{\text{history},A}$ retains admitted internal self-history and other internal wake content not allocated to those pair entries,
- $E_{\text{coupling to sea}}$ accounts for how the assembly deforms and polarizes the surrounding Noether sea, that is, the local Noether sea environment (or in bridge prose, the local spacetime medium).

This partition is a candidate until an independent action or wake-energy construction assigns all pair, self, internal-history, and sea-coupling entries with no overlap. A vanishing history remainder is an additional reduction to prove, not a consequence of the pair notation.

**Hypothesis.** The internal energy can be much larger than the externally exposed energy. Any comparison to the Planck scale or a higher scale remains a benchmark-level possibility until a certified branch fixes the assembly energy map.

### Apparent Energy and Shielding

The surrounding Noether sea, and the arrangement of positive- and negative-polarity architrinos inside an assembly, can **shield** internal energy from the external world through:

- **Polarity cancellation**: positive- and negative-polarity architrinos within the assembly (and in surrounding Noether braids) emit wakes that interfere destructively at larger distances.
- **Phase-structured far-field cancellation**: the geometry of internal orbits and Noether braid polarization patterns generates cancellation of most multipoles at scales $r \gg$ assembly size.
- **Indexed support shielding**: in candidate multi-tier fermion braid scaffolds, source-record support indices can partially screen other rows from the surrounding sea. Generation shifts are hypothesized to reflect loss of declared support rows, not a fixed outer-to-inner identity or only a loss of constituent count.

At the reference-attractor level, define the **shielding (leakage) factor** as the leading isotropic projection of a larger far-field wake ledger:

$$
\zeta(A_0)
\equiv
\frac{\|\Pi_0\mathcal{L}_{\text{wake}}(A_0)\|}
{\|\mathcal{L}_{\text{naive}}(A_0)\|},
\qquad
\mathcal{L}_{\text{aniso}}(A_0)
\equiv
\mathcal{L}_{\text{wake}}(A_0)-\Pi_0\mathcal{L}_{\text{wake}}(A_0)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5da0199a4b2c37b1)

Evaluate both ledgers on the same far-field sampling window and in the same angular/radial basis. $\Pi_0$ extracts the isotropic component, and the remainder $\mathcal L_{\mathrm{aniso}}$ retains direction dependence. Define the positive reference norm $\|\mathcal L_{\mathrm{naive}}\|$ as the sum of the norms of the individual unshielded constituent contributions in that basis; do not use their signed sum, which can vanish for a neutral assembly. If this reference is zero, $\zeta$ is undefined. The operational fit uses canonical acceleration amplitude and its leading $1/r^2$ coefficient. A valid scalar-potential fit instead begins with a $1/r$ coefficient and must be differentiated with the same normalization to compare acceleration. Higher multipoles require their own radial power and angular basis. A strongly shielded neutral braid is guessed to have $\zeta\ll1$; scalar interpretation additionally requires small anisotropic leakage:
$$
\frac{\|\mathcal{L}_{\text{aniso}}(A_0)\|}
{\|\mathcal{L}_{\text{naive}}(A_0)\|}
\le
\epsilon_{\text{aniso}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f4acab4b99976a5d)

with $\epsilon_{\text{aniso}}$ declared before the branch is accepted as a scalar mass-facing result.

The candidate scalar apparent-energy proxy for long-range assembly response is

$$E_{\text{apparent}}(A) \sim \zeta(A)\,E_{\text{internal}}(A),$$

[View →](../../../../equation-mapping.html#corpus-equation-70c7b08600f11ed4)

This is a guessed proportionality, not a substrate identity. Its coefficient must be derived from the Noether sea response and then tested against observer-level mass-energy measurements; matching to $mc^2$ alone would fit the target rather than derive the mechanism.

> Claim grade: guessed. Falsifier: a certified assembly whose independently measured long-range response is not proportional to its exposed-energy channel, or whose fitted coefficient varies irreducibly across the declared universal branch family, would reject the scalar proxy.

The exposed energy cannot be counted twice as both the direct probe readout and the sea-retuning source. On a declared comparison window, split the exposed ledger into a probe channel and a sea-coupled channel:
$$
\zeta(A)E_{\text{internal}}(A)
=
E_{\text{probe}}(A)
+
E_{\text{sea-coupled}}(A)
+
E_{\text{unresolved}}(A),
\qquad
E_{\text{probe}}(A)+E_{\text{sea-coupled}}(A)
\le
\zeta(A)E_{\text{internal}}(A)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8b37e9a042bf7aac)

with partition residual
$$
\mathcal R_{\text{part}}(A)
=
\frac{
\left|
\zeta(A)E_{\text{internal}}(A)
-
E_{\text{probe}}(A)
-
E_{\text{sea-coupled}}(A)
-
E_{\text{unresolved}}(A)
\right|
}{
\left|\zeta(A)E_{\text{internal}}(A)\right|
+
\varepsilon_{\text{part}}
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-96170d01e45cbeac)

In the proposed mass map, $E_{\mathrm{probe}}$ supplies the inertial-probe channel and $E_{\mathrm{sea-coupled}}$ supplies the source that changes the sea state. The same assigned energy cannot appear in both disjoint channels. The unresolved entry must be nonnegative for the displayed inequality and must be characterized independently if the residual is to test anything beyond subtraction. Setting it equal to whatever closes the sum makes $\mathcal R_{\mathrm{part}}=0$ by definition. This partition is a modeling assumption to be tested on a derived energy account; it does not follow from the far-field amplitude ratio alone.

Define the probe-channel share
$$
\zeta_{\text{probe}}(A)
\equiv
\frac{E_{\text{probe}}(A)}{E_{\text{internal}}(A)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7ce39270e77ce478)

when $E_{\text{internal}}(A)>0$. The raw far-field scalar $\zeta(A)$ names the total exposed ledger before the probe, sea-coupled, and unresolved split. The probe-channel scalar $\zeta_{\text{probe}}(A)$ names only the trace part consumed by the inertial probe formulas below.

---

## Emergent Inertia (Mass) from Shielded Energy

Inertia is an observer-level response property rather than primitive architrino mass. The specific claim that it is determined by an assembly's closed internal causal-history ledger, shielding factor, and Noether sea coupling is the mass-map target developed below, not an established consequence of the Master Equation.

### Operational Definition of Inertial Mass

The quantities used in this section have different meanings:

| Quantity | Meaning and current status |
| --- | --- |
| $\mu_{\mathrm{arch}}$, $\mu_K$, $a$ | Kinetic-bookkeeping coefficients; none is physical architrino mass |
| $m_{\mathrm{inertial}}(A)$ | Effective assembly inertial mass defined by a calibrated response experiment; its prediction from primitives remains open |
| $\mathsf I_A^{ab}$ | Candidate direction-dependent inertial-response tensor |
| $m_{\mathrm{tr}}(A)$ | One third of that tensor's spatial trace; identification with measured scalar mass requires the stated scalar-response regime |
| $M_0(A)$ | Effective assembly rest-mass parameter in the later energy–momentum recovery target |
| $m_{\mathrm{eff}}$ | Inertial coefficient of the appendix's comparison reduction; no primitive binary mass is implied |

For an assembly $A$ in a regime already shown to have isotropic, linear, collinear response, define its scalar inertial mass $m_{\text{inertial}}(A)$ operationally by the following procedure:

- Apply a small externally characterized perturbation with a net assembly-level force $\mathbf F_{\mathrm{ext}}$ calibrated independently of the unknown response coefficient. A distant wake source can realize this experiment only after its effective coupling has been established,
- Measure the resulting acceleration of the response center; in regimes where the effective center-of-mass readout has been justified, denote this acceleration by $\mathbf A_{\text{cm}}$,
- Define:

$$m_{\text{inertial}}(A) \equiv \frac{\|\mathbf F_{\text{ext}}\|}{\|\mathbf A_{\text{cm}}\|}.$$

[View →](../../../../equation-mapping.html#corpus-equation-c454de0e25062cfd)

The ratio is an operational definition for a nonzero response in that regime. Defining $\mathbf F_{\mathrm{ext}}$ using the unknown mass would make the inference circular. No primitive $\mathbf F=m\mathbf A$ law is used to obtain the architrino trajectories.

The scalar mass-map hypothesis is that the external wake couples mainly to the probe-facing exposed energy rather than to the full internal circulation:

$$m_{\text{inertial}}(A) \approx \alpha_{\mathrm{m}}\,\frac{E_{\text{probe}}(A)}{c_{\text{eff}}^2}.$$

[View →](../../../../equation-mapping.html#corpus-equation-9785ed6d237481f0)

The tensor ansatz retains direction dependence. Spatial indices $a,b,c\in\{1,2,3\}$ in this section are coordinate components, not binary labels; repeated indices are summed. $h_{ab}$ is the Euclidean spatial metric and $h^{ab}$ its inverse, equal to the identity matrix in orthonormal Cartesian coordinates. They raise and lower indices and define the tensor norms. $\alpha_{\mathrm m}$ is a proposed universal normalization, not a species-specific fit. In the formulas below, $\mathcal{Z}_A^{ab}$ is the probe-channel exposure tensor after the exposed-energy partition has been declared; the sea-coupled channel enters through $S_{\mathrm{mat}\to\mathrm{sea}}^{(\ell)}$ and the resulting Noether sea response, not as a second direct inertial source. For a small group velocity (center-of-mass convention) $V_{\text{cm},b}$ through a declared Noether sea response record,
$$
p_{\text{int}}^{a}
\approx
\alpha_{\mathrm{m}}\,\zeta_{\text{probe}}(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}\,
V_{\text{cm},b}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1ca96579d18d148e)

with homogeneous isotropic limit
$$
\mathcal{M}_{\text{sea}}^{ab}\to \frac{h^{ab}}{c_{\text{eff}}^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-689a5b7976efc5d1)

A more complete first-order handoff keeps the scalar and trace-free exposure pieces visible. Write

$$
\mathcal{Z}_{A}^{ab}
=
\zeta_{\text{probe}}(A)h^{ab}
+
\mathcal{Z}_{\mathrm{tf}}^{ab}(A),
\qquad
h_{ab}\mathcal{Z}_{\mathrm{tf}}^{ab}(A)=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-1c295864d52fdb22)

and split the local Noether sea response as

$$
\mathcal{M}_{\text{sea}}^{ab}
=
\frac{1}{c_{\text{eff},0}^{2}}
\left[
(1+\delta\mathcal{M}_{0})h^{ab}
+
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-a14b67d3000d9772)

The proposed exposed inertial-response tensor is

$$
\mathsf{I}_{A}^{ab}
=
\frac{\alpha_{\mathrm{m}}E_{\text{internal}}(A)}{2}
\left(
\mathcal{Z}_{A}^{a}{}_{c}\mathcal{M}_{\text{sea}}^{cb}
+
\mathcal{Z}_{A}^{b}{}_{c}\mathcal{M}_{\text{sea}}^{ca}
\right),
\qquad
p_{\text{int}}^{a}
\approx
\mathsf{I}_{A}^{ab}V_{\text{cm},b}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1b42a7c80ad55be1)

Its rotational scalar trace is

$$
m_{\mathrm{tr}}(A)
\equiv
\frac{1}{3}h_{ab}\mathsf{I}_{A}^{ab}
=
\alpha_{\mathrm{m}}
\frac{E_{\text{internal}}(A)}{c_{\text{eff},0}^{2}}
\left[
\zeta_{\text{probe}}(A)(1+\delta\mathcal{M}_{0})
+
\frac{1}{3}\mathcal{Z}_{\mathrm{tf},ab}(A)\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-bc9d01090363429b)

Only in the homogeneous isotropic limit does the scalar mass formula above follow. The trace formula gives a stricter diagnostic: pure exposure anisotropy does not shift scalar mass in an isotropic medium, and pure trace-free medium response does not shift scalar mass for scalar exposure. A scalar mass shift from anisotropy appears only through the contraction $\mathcal{Z}_{\mathrm{tf},ab}\delta\mathcal{M}_{\mathrm{tf}}^{ab}$; otherwise the residue remains directional inertia in $\mathsf{I}_{A}^{ab}$. Here $E_{\text{internal}}$ names the internal-energy candidate, while $\zeta_{\text{probe}}(A)$ names the probe-facing share of the external leakage that survives cancellation and Noether sea shielding. If the map is validated, it would explain a weak long-range inertial footprint without making the internal energy small. The trace-free exposure tensor is also a candidate carrier of orientation and framing leakage. Clock-orientation leakage, matter anisotropy, and scalar-mass anisotropy must therefore be compared as different contractions of the same branch-emitted trace-free exposure record against different probe or medium-response tensors. If $\mathcal{Z}_{\mathrm{tf}}^{ab}=0$ for an accepted branch in a homogeneous response record, these first-order trace-free terms vanish; that algebraic cancellation does not rule out higher-order leakage.

> Claim grade: guessed for the exposed-energy mass map and derived for the stated trace contractions within that ansatz. Falsifier: a certified assembly and Noether sea record that passes the scalar-response assumptions but yields an inertial tensor inconsistent with $\mathsf I_A^{ab}$ would reject the map. A nonzero first-order anisotropy when both declared trace-free inputs vanish would refute the displayed first-order expansion.

For positive $\alpha_{\mathrm m}E_{\mathrm{internal}}/c_{\mathrm{eff},0}^2$, positivity of the candidate scalar trace requires the exact signed condition
$$
\zeta_{\text{probe}}(A)(1+\delta\mathcal{M}_{0})
+
\frac{1}{3}
\mathcal{Z}_{\mathrm{tf},ab}(A)\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\gt 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-fbad2ac2378276f1)

The contraction has a sign. If its sign is unknown, requiring the isotropic term to exceed its absolute value is a conservative sufficient guarantee, not a necessary condition. Failure of that stronger guarantee does not falsify the proposed map. For example, dimensionless diagonal exposure and sea tensors both equal to $\operatorname{diag}(2.8,0.1,0.1)$ give an isotropic term $1$, anisotropic trace correction $1.62$, and positive trace bracket $2.62$, despite failing $1>1.62$. This is an algebraic example within the ansatz, not a realized sea state or a small-anisotropy measurement. Positive trace alone also does not establish positive directional response: the latter requires $u_a\mathsf I_A^{ab}u_b>0$ for every nonzero spatial vector $u$. When $1+\delta\mathcal M_0>0$, Cauchy–Schwarz gives the sufficient scalar bound
$$
\zeta_{\text{probe}}(A)
>
\frac{
\left\|\mathcal{Z}_{\mathrm{tf}}(A)\right\|_h
\left\|\delta\mathcal{M}_{\mathrm{tf}}\right\|_h
}{
3(1+\delta\mathcal{M}_{0})
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0c71e78a30c3a8e3)

on the same comparison window. This norm bound gives a guarantee against either sign of the contraction. When it fails, evaluate the actual signed trace and directional response within the ansatz's admissible domain. Even a positive result is only internal consistency of the proposed inertial-response model, not a derivation of physical mass.

At the matter-to-medium interface, a Standard Model fermion assembly should therefore be treated as a localized source of exposed response, not as an unshielded transfer of all internal energy into the surrounding Noether sea. For a coarse cell $\Omega_\ell$, the source supplied by stable matter assemblies can be written schematically as

$$
S_{\mathrm{mat}\to\mathrm{sea}}^{(\ell)}(\mathbf X,T)
=
\sum_{A\subset\Omega_\ell}
W_\ell(\mathbf X-\mathbf X_A(T))\,
E_{\text{sea-coupled}}(A)
+
S_{\mathrm{aniso}}^{(\ell)}(\mathbf X,T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-1191069627ac79ef)

where $W_\ell$ is the coarse-graining window, $\mathbf{X}_A$ is the assembly center, and $S_{\mathrm{aniso}}^{(\ell)}$ records exposed tensor, orientation, spin, or wake-history residue that cannot be collapsed into the scalar shielding factor. This source then perturbs the local Noether sea state through a constitutive response map,

$$
\delta\theta_{\mathrm{sea}}^{(\ell)}
=
\mathcal{C}_{\mathrm{mat}\to\mathrm{sea}}
\left(
S_{\mathrm{mat}\to\mathrm{sea}}^{(\ell)},
\lambda_A,\xi_A,\mathcal{H}_A,
\theta_{\mathrm{sea},0}^{(\ell)}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-01e8e60015d53f14)

Here $\theta_{\mathrm{sea},0}^{(\ell)}$ is the unperturbed constitutive state, $\delta\theta_{\mathrm{sea}}^{(\ell)}$ its change, and $\mathcal C_{\mathrm{mat}\to\mathrm{sea}}$ the response map to be derived. The assembly arguments describe its retained geometry and history: $\lambda_A$ is the declared axis-alignment parameter, $\xi_A$ denotes the remaining specified shape and phase coordinates, and $\mathcal H_A$ is the retained assembly path history. A use of the map must specify these coordinates for its chosen assembly family. Its outputs include normalized braid density $n=\rho_{\mathrm{NS}}/\rho_{\mathrm{NS},0}$, the delay factor $\chi_{\mathrm{sea}}=c_f/c_{\mathrm{eff}}$, and cadence stretch $\Gamma_N=\Omega_{N0}/\Omega_N$, together with strain, orientation, and envelope scale. These definitions follow [Noether Sea](../spacetime/noether-sea.md). A changed response state need not mean that each braid simply gains energy and expands; the map must resolve which cadence, strain, orientation, or scale variable changes.

This is the same shielding-based logic developed more directly in [Particle Masses](../assemblies/particle-masses.md). The matching factor $\alpha_{\mathrm{m}}$ should be fixed only after a calibration-free reference attractor has supplied $E_{\text{internal}}$, raw $\zeta$, $E_{\text{probe}}$ or $\zeta_{\text{probe}}$, the exposed-energy partition, and the medium-response map; it should not be fitted separately to each particle species. Universality is a cross-species invariant, not a notation choice. For any certified assembly $A$, define the back-solved value
$$
\alpha_{\mathrm{m}}(A)
\equiv
\frac{
m_{\mathrm{tr}}(A)c_{\text{eff},0}^2
}{
E_{\text{internal}}(A)
\left[
\zeta_{\text{probe}}(A)(1+\delta\mathcal M_0)
+
\frac{1}{3}\mathcal Z_{\mathrm{tf},ab}(A)\delta\mathcal M_{\mathrm{tf}}^{ab}
\right]
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0b2bc9bc06a945d4)

on branches that pass the positivity criterion above. For this test, the numerator must use the trace of an independently measured inertial-response tensor. Substituting the ansatz's own predicted trace would recover the input $\alpha_{\mathrm m}$ identically and provide no evidence of universality. For any pair $A,A'$ in the mass-map test set, require
$$
\mathcal R_{\alpha}(A,A')
\equiv
\frac{
\left|\alpha_{\mathrm{m}}(A)-\alpha_{\mathrm{m}}(A')\right|
}{
\left|\alpha_{\mathrm{m}}(A)\right|
+
\left|\alpha_{\mathrm{m}}(A')\right|
}
\le
\epsilon_{\alpha}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0778c4b0460cae13)

with $\epsilon_{\alpha}$ declared before accepting universality. If this residual cannot be held small without per-species tuning, the universality claim fails and the parameter count must be raised explicitly. On a connected comparison family, this tests constancy of $\alpha_{\mathrm{m}}$ across the independently characterized assembly states. An irreducible jump in the back-solved $\alpha_{\mathrm{m}}$ across different assembly topological charge sectors would not be hidden inside the same symbol; it would mark either a disconnected mass-map family or a failed universality claim for the compared species.

Thermodynamic or entropic derivations of gravitational force are therefore comparison benchmarks for this chapter, not replacements for the mass mechanism. They may sharpen the observer-level equation-of-state target for gravity, but $m_{\text{inertial}}(A)$ is not closed until the same assembly ledger supplies its closed internal causal-history record, shielding extraction, Noether sea response tensor, and acceleration response.

The reference assembly $A_0$ must supply a stable retained trajectory, internal pair/self/history energy, far-field wake coefficients, and the probe/sea partition before this map yields a mass prediction. These quantities are outputs to derive, not observed masses inserted into the construction. A prescribed geometry that merely passes an acceleration screen remains a candidate; its actual stability, shielding, and sea response must still be established.

The multi-scale status of $A_0$ matters for this accounting. Fast internal corrections should not be removed until they are classified. Nonresonant motion on a measured fast binary may average out of the leading apparent-energy fit, but corrections that change self-hit counts, the branch Jacobian near $c_f$, or the leakage tensor can change $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, or both. Apparent energy is therefore downstream of closure and stability, not an input used to force a convenient branch.

---

### Noether Sea and Effective Relativistic Behavior

The Noether sea adds an additional layer:

- Moving assemblies must retune their internal causal ledger and reorganize local Noether sea coupling.
- The proposed mechanism is that the effective resistance to high group speed (using the center-of-mass convention, near the relevant internal Noether braid causal-wake propagation scale) increases steeply, producing an emergent saturation speed scale $c_{\text{eff}}$ at which assemblies effectively saturate. This presupposes stable sea-coupled assemblies, none of which has yet been derived. Its identification with the photon-channel speed is a separate closure.

Thus:

- At low group speeds (center-of-mass convention) $v_{\text{CM}}\ll c_{\text{eff}}$, the low-speed recovery target is $E_k \approx \frac{1}{2}m_{\text{inertial}} v_{\text{CM}}^2$ for assemblies.
- At high group speeds (center-of-mass convention) approaching $c_{\text{eff}}$, the high-speed recovery target for internal and Noether sea response is a relativistic-like $E_k \sim m_{\text{inertial}}c_{\text{eff}}^2(\gamma_{\text{eff}}-1)$, with $\gamma_{\text{eff}} = 1/\sqrt{1-v_{\text{CM}}^2/c_{\text{eff}}^2}$, as an **effective comparison law**.
- Near $c_{\text{eff}}$, axial architrino stripping and oblation are failure channels or branch-transition hypotheses to test, not assumed parts of the mass mechanism.

The displayed kinetic laws specify the response to recover. Deriving them requires independent energy and momentum accounts, controlled coefficient extraction, and agreement with the same clock, ruler, and signal channels. No such derivation follows from a steep response or a saturation speed alone. Ordinary dissipative drag remains a distinct effect; it cannot stand in for the reversible inertial mechanism. [Particle Masses](../assemblies/particle-masses.md) develops the assembly-response construction.

---

## Effective Energy-Momentum Closure

For assembly center-of-mass motion in the Lorentz-suppressed regime, impose the relativistic mass-shell relation as an **effective closure test** (not a substrate postulate):

$$
E_{\text{CM}}^2 = p_{\text{CM}}^2 c_{\text{eff}}^2 + M_0^2 c_{\text{eff}}^4
$$

[View →](../../../../equation-mapping.html#energy-momentum-rest-energy)

Here:
- $M_0$ is the effective assembly rest-mass parameter to be extracted at $v_{\text{CM}}=0$ in a locally homogeneous sea. Its identification with the independently measured inertial response is part of this recovery target, not a primitive definition.
- $E_{\text{CM}}$ and $p_{\text{CM}}$ are effective assembly energy and momentum to be obtained from independent trajectory-based accounts; the mass-shell equation must not be used to manufacture both inputs to its own test.
- $c_{\text{eff}}$ is the isotropic projection of the local Noether sea response-speed record. In weak-field homogeneous and neutral conditions that also pass the two-moment quietness condition above, $c_{\text{eff}}\to c_\infty$, with $c_\infty=c_0$ by observer calibration. The relation between $c_0$ and the primitive wake speed $c_f$ remains the declared hierarchy question in the [speed-role table](../foundations/absolute-timespace.md#speed-convention); the active Bell route requires $c_f>c_0$ rather than silently identifying them.

More precisely, the response-speed tensor may be written schematically as
$$
\left(c_{\text{eff}}^2\right)^{ab}
=
c_0^2
\left[
(1+\delta c_0)h^{ab}
+
\delta c_{\mathrm{tf}}^{ab}
\right],
\qquad
c_{\text{eff}}^2
\equiv
\frac{1}{3}h_{ab}\left(c_{\text{eff}}^2\right)^{ab}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c633c02ee1ae0156)

The scalar mass-shell closure is admissible only when the anisotropic propagation correction is bounded,
$$
\left\|\delta c_{\mathrm{tf}}\right\|
\le
\epsilon_{c,\mathrm{tf}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-40ad4b4ea6bfb56c)

on the same comparison window. The scalar offset $\delta c_0\to0$ is not assumed by isotropy language alone; it must follow from the same homogeneous neutral summation and screening conditions that make the Noether sea macroscopically quiet.

The scalar mass shell alone does not connect momentum to measured group velocity. On its positive-energy branch, for constant local $c_{\mathrm{eff}}>0$ and $M_0>0$, an effective Hamiltonian or an independent response derivation must also supply $v_{\mathrm{CM}}=\partial E_{\mathrm{CM}}/\partial p_{\mathrm{CM}}=p_{\mathrm{CM}}c_{\mathrm{eff}}^2/E_{\mathrm{CM}}$. Then substitution gives the equivalent parameterization below for $|v_{\mathrm{CM}}|<c_{\mathrm{eff}}$. This is conditional algebra within the recovery model, not a substrate momentum law:
$$
E_{\text{CM}}=\gamma_{\text{eff}} M_0 c_{\text{eff}}^2,\qquad
p_{\text{CM}}=\gamma_{\text{eff}} M_0 v_{\text{CM}},\qquad
\gamma_{\text{eff}}=\frac{1}{\sqrt{1-v_{\text{CM}}^2/c_{\text{eff}}^2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1efcb1026be589f8)

This parameterization must keep rest, motion, and null transport separate. Within this recovery model, $M_0c_{\mathrm{eff}}^2$ is the effective rest-energy readout to be matched to the exposed internal account, not automatically the full internal energy. $M_0$ is not a velocity-dependent rest mass. Motion changes the center-of-mass readout through $\gamma_{\text{eff}}$ and $p_{\text{CM}}$, while the massless photon-channel limit is a separate null closure,
$$
E_\gamma=c_\gamma\|\mathbf{p}_\gamma\|
$$

[View →](../../../../equation-mapping.html#corpus-equation-c8abb51062ca1203)

after the effective photon channel and its speed record have been declared. Massless here refers to that observer-level null relation, not to assigning zero mass to individual architrinos. A calculation that uses the same scalar mass-shell formula to explain a massive assembly, a moving massive assembly, and a photon without naming these three records has collapsed distinct observer-level closures into one slogan.

Consistency requirement: if this closure fails in regimes where emergent Lorentz behavior is claimed, the mass-loading and medium-response model is incomplete.

Cross-links:
- [Proper-time closure test](../spacetime/proper-time-and-time-dilation.md#effective-energy-momentum-closure-test)
- [SR mapping entry](../philosophy-history/theory-mapping.md#special-relativity-sr)

---

## Energy and Self-Hit in the Noether Sea

In the **super-field-speed** regime ($\|\mathbf V_a\|>1$ somewhere along the relevant path-history interval), architrinos and assemblies can intersect their own past causal wake surfaces (self-hit). In the presence of the Noether sea:

- On the uniform-circular chart, each canonical self-hit contribution is radially outward and therefore cannot supply centripetal support. Whether the corresponding self-hit branches provide a lower radial boundary in a Noether braid or more complex assembly depends on the complete vector balance and continuation record; it is not implied by the circular sign alone.
- Under a candidate signed wake account, energy represented in an architrino's causal wake and local Noether sea response would be partially routed back through delayed self-interaction. The exchange between internal kinetic energy and wake/medium energy is candidate bookkeeping pending an accepted signed account on the same causal-root record.

If an accepted causal action with a proved delay-compatible Noether theorem supplies both the acceleration contributions and the signed energy accounts on one provenance-complete record, then global conservation would follow and self-hit would route energy along more complex paths (architrino → causal wake surface → local Noether sea → back to architrino/assembly) without net creation or loss. That action, theorem, account construction, pairwise provenance result, and boundary-flux closure remain open; until they close, self-hit routing is a candidate bookkeeping picture rather than an established conservation result.

---

## Mechanism in One Picture

Inside an assembly, large internal causal-history energy can circulate through many branch channels. Outside the assembly, distant probes couple only to the portion of that ledger that survives phase cancellation, shielding, and Noether sea response.

Architrinos, their causal histories, and their assemblies are the variables to which the energy bookkeeping is assigned. The Noether sea is proposed as a dense population of energetic Noether braid assemblies whose net long-range wake response becomes quiet when incoherent contributions cancel and shielded internal rows leak only weakly. Neither that cancellation nor the required stable Noether braid has yet been derived generally. In candidate indexed fermion source records, declared support rows may screen other rows from the ambient Noether sea. The mass and gravitational-response program must derive the residual exposure; no screening order follows from the persistent indices.

## Summary and Role in the Larger Theory

- **At the architrino level:**
  
  The Master Equation fixes acceleration but does not yet fix a unique kinetic scalar, momentum, or global potential. This chapter defines candidate energy accounts and the compatibility conditions they must satisfy. Exact global conservation remains a closure target for an accepted causal-action or causal-wake theory with proved same-record signed accounts and boundary closure. The substrate law is acceleration-first, and no physical mass property is assigned to architrinos. Potential availability is geometric rather than fuel-like: causal wakes are emitted as path-history structure, while work appears only when a receiver intersects active wake branches with nonzero radial power.

- **At the assembly level:**
  
  The mass-map hypothesis asks whether internal energy, shielding, and coupling to the Noether sea jointly generate:
  - Effective inertia (mass),
  - Shielded external wake signatures (tiny apparent energy compared to internal),
  - Generation dependence through which declared support rows remain active and how their shielding map changes,
  - An emergent speed scale $c_{\text{eff}}$ and relativistic-like behavior. The proposed quiet macroscopic limit requires both small mean response and controlled fluctuations after superposition and shielding; it has not been derived merely from incoherence. Phase-locked assemblies such as collinear breathers remain candidates for localized, non-canceling wake structure.

- **For spacetime and gravity:**
  
  The proposed sea of small, energetic Noether braids would form the Noether sea and, at coarse-grained level, the effective spacetime medium whose response is intended to yield an emergent metric. The closure program tests whether the shielding factors and internal energies of both sea assemblies and matter assemblies determine:
  - The effective Newton constant $G$,
  - The cosmological Noether sea energy density,
  - How strongly observer-level effective metric response is reconstructed from different kinds of energy.
  
  Density-driven oblation is a candidate contribution to the effective gravitational-coupling closure: as the Noether sea encounters denser matter, local Noether braids may scale down and oblate, creating a compliance gradient that must be mapped through the Noether sea response tensor before it can be read as part of $G$.

---

## Appendix A: Energy Zero and Bookkeeping

$\mathbb{A}\mathbb{A}\mathbb{A}$ permits a binding-energy convention that fixes the zero of a branch-local potential at the inner radial boundary of an accepted bound branch. This is a gauge choice: adding a constant to a valid potential does not change its gradient or the acceleration it represents. A certified inner boundary would provide a convenient reference, but it would not by itself prove that the configuration is a ground state, an energy minimum, or a stable maximum-curvature binary. The circular simple-root ledger supplies algebraic candidates, not an accepted inner turning point.

Cosmology inventory prose uses the same convention only after declaring the comparison window. Positive component entries such as matter, radiation, dark-sector bookkeeping, and thermal reservoirs are mass-equivalent or energy-density terms measured relative to that window, while gravitational binding is a negative finite-window contribution. Mixing a local branch convention with a cosmological inventory convention without naming the window and boundary term risks double counting the same retained wake-history energy.

### Physical Setup and Why a New Zero is Needed

Suppose an accepted attractive branch has a minimum admitted radius $r_{\min}$ because its complete delayed ledger prevents continuation to smaller separation. Unlike the ideal Coulomb comparison, such a branch has a lower radial boundary. A radial boundary alone does not imply a lower bound on every energy account; that conclusion requires the branch-local kinetic, potential, and wake terms to be bounded on the same record.

The inner boundary may then be used as a convenient reference in place of infinite separation. Calling it a ground configuration requires a separate energy-minimization and stability result.

### The Bookkeeping Convention

On a certified branch chart with a declared self-hit lower boundary $r_{\min}$, fix the potential gauge at that boundary. If an MCB branch is later certified, its lower boundary is one candidate realization of this reference. Without such a certified boundary, choose and name a conventional reference radius $r_{\mathrm{ref}}$ instead; that gauge supports comparisons within the declared ledger cell but carries no claim that $r_{\mathrm{ref}}$ is a physical minimum.

$$U(r_{\min}) \equiv 0.$$

[View →](../../../../equation-mapping.html#corpus-equation-eb4839c3b5a6c05d)

In this gauge, $U(r)$ represents the candidate accumulated work required to move along the same certified branch from $r_{\min}$ to $r$. This interpretation is valid only where a branch-local scalar potential has been derived from the Master Equation. A fully separated limit carries $U_{\max}\equiv B_{\max}$ only if that limit exists and the corresponding integral converges.

When the active causal-root ledger changes, this gauge must be indexed by the branch ledger. For ledger cell $b$,
$$
U^{(b)}(r)
\equiv
B_{\max}^{(b)}-B^{(b)}(r),
\qquad
B_{\max}^{(b)}
=
B^{(b)}\!\left(r_{\min}^{(b)}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-cd28152abf4b06a2)

so a separator crossing that changes the effective inner wall cannot be counted once as a gauge-origin jump and again as an independent $h$-like energy quantum. Let $H^{(b)}$ retain the history energy not represented by the local potential in cell $b$. A local change of potential zero cannot remove this history dependence. At a crossing radius $r_\ast$ between ledger cells $b$ and $b'$, the physical bookkeeping must satisfy
$$
\left[E_{\text{total}}\right]_{b\to b'}
=
K^{(b)}(r_\ast)+U^{(b)}(r_\ast)+H^{(b)}(r_\ast)
=
K^{(b')}(r_\ast)+U^{(b')}(r_\ast)+H^{(b')}(r_\ast)+\Delta_{\text{ledger}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-90adb8aeda556212)

Here $\Delta_{\mathrm{ledger}}$ compares the same complete accounts and includes any explicitly assigned transfer or change of energy origin. It is not a new energy quantum merely because a local potential zero changed. The later transaction example separately names the binary-3 energy increment, a signed wake exchange, and a compensating binary-2 adjustment; those entries cannot also be counted as an extra gauge-origin jump. On overlapping cells, changes of energy origin must compose consistently, with zero net gauge offset around a closed cycle. A physical history-dependent transfer is retained separately from that choice of origin.

### Binding Energy and Total Energy

Let $B(r)$ denote the **binding energy** at radius $r$, with

$$B(r_{\min}) = B_{\max}.$$

[View →](../../../../equation-mapping.html#corpus-equation-4de56cf4b153a741)

Define

$$U(r) = B_{\max} - B(r).$$

[View →](../../../../equation-mapping.html#corpus-equation-176c8c556150fe31)

Let $H$ denote all remaining retained nonkinetic history content not included in $U$, evaluated along the declared reduced branch; writing $H(r)$ presupposes a single-valued branch parameterization. The total candidate account is

$$E_{\text{total}} = K(r) + U(r) + H(r).$$

[View →](../../../../equation-mapping.html#corpus-equation-f91f6ff9a16feefa)

The additional inequality $U(r)\ge0$ holds only if $B(r_{\min})$ is proved to be the maximum binding value on the admitted branch. At the minimum radius, the gauge identity gives

$$E_{\text{total}} = K(r_{\min})+H(r_{\min}), \quad U(r_{\min}) = 0.$$

[View →](../../../../equation-mapping.html#corpus-equation-82fb0af67261acf9)

The gauge sets only $U$ to zero. Reduction to $K+U$ requires proving that $H$ is constant and fixing its offset, or constructing a different effective potential that already contains its contribution without changing the derived motion. Neither follows from the reference radius. The equation does not imply that kinetic energy is maximal. At a radial turning point the radial kinetic term is zero, while tangential or internal motion may remain. Whether motion outward converts kinetic energy into this branch-local potential must be shown by the same-record work identity.

### Effective Potential Language

As an explicitly conventional comparison, consider a planar central reduction with constant positive inertial coefficient $m_{\mathrm{eff}}$, quadratic reduced kinetic energy, a conserved angular quantity $L$, and time-independent radial interactions. Eliminating the angular velocity from that comparison gives

$$V_{\text{eff}}(r) = V(r) + \frac{L^2}{2 m_{\text{eff}} r^2} + V_{\text{self-hit}}(r).$$

[View →](../../../../equation-mapping.html#corpus-equation-d328e989dfe05eaa)

Here $m_{\mathrm{eff}}$ is a comparison-model inertial coefficient, not the mass of an architrino or a derived binary mass. The centrifugal term follows only from the stated quadratic central reduction. $V_{\mathrm{self-hit}}$ is admissible only if the retained self interaction has its own radial scalar and is excluded from $V$ to prevent double counting. The delayed binary has not been shown to satisfy these reduction assumptions. Calling a term effective does not supply that derivation.

If an effective-potential comparison needs the same displayed zero, define the separately shifted quantity

$$\widetilde V_{\text{eff}}(r)\equiv V_{\text{eff}}(r)-V_{\text{eff}}(r_{\min}),\qquad \widetilde V_{\text{eff}}(r_{\min})=0.$$

[View →](../../../../equation-mapping.html#corpus-equation-aaaf2218ee120aa3)

This additive shift does not change the effective radial equation. It is distinct from proving that $r_{\min}$ minimizes $V_{\text{eff}}$ or that the effective-potential reduction is valid for the delayed branch.

### Self-Hit Branch Changes and Discrete Ledgers

In this picture, the self-hit region is **not** assumed to change the local acceleration law. The smooth-transition hypothesis is

$$\frac{dU}{dr} \text{ remains finite and continuous across the retained regularized branch chart.}$$

[View →](../../../../equation-mapping.html#corpus-equation-b1b6e0fabff8a2c3)

If this continuity condition is established, the transition between the $v=c_f$ regime and the self-hit regime is a regularized branch transition rather than a kink in the potential. The condition is not implied merely by mollifying the root selector; the complete variation and regulator limit must supply it.

> Claim grade: guessed for continuity of $dU/dr$ through the self-hit branch transition. Falsifier: a regulator-stable jump or divergence in the same-record branch-potential slope would reject the smooth-graft hypothesis.

The discrete step is a causal-root ledger effect, not an assumption that energy itself is made of independent chunks. On a fixed branch chart, the active causal intersections have an integer multiplicity: a self-hit count $N$ and an analogous partner-hit or channel count $M$. In the circular binary notation this same idea appears as the pair $(N_s,M_p)$ in [Super-Field-Speed Root Ledgers and Resonance Lock](binary-dynamics.md#super-field-speed-root-ledgers-and-resonance-lock). Within one ledger cell the underlying trajectory and $U(r)$ remain continuous. A visible $h$-like transaction occurs when a separator crossing changes the admissible integer ledger, for example by adding one grouped channel or, in a raw simple-root table, by an interior ordinary fold with $\Delta N=\pm2$ and $\Delta D=0$. Here $D$ is the sum of root-orientation signs. The fold rule assumes a nonzero second root derivative, transverse unfolding, and no entry or exit through the retained history endpoints.

The mechanical event behind such a ledger change can be a caustic-grazing impulse. Here $J=D_t/c_f$ is the normalized transmitter-side root denominator. When a regularized branch crosses a $J=0$ caustic, the pointwise branch expression may become large while the integrated velocity change remains finite, as in [Caustic Transit and Finite Impulse](master-equation.md#caustic-transit-and-finite-impulse):
$$
\Delta\mathbf{V}_{a,n}
=
\int_{T_n^-}^{T_n^+}
\mathbf{A}_a^{(\eta)}(T)\,dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-5b0e0e63d5a78d85)

This finite impulse is a candidate substrate mechanism for changing the active causal-root ledger by a discrete amount without making primitive energy granular.

Thus a candidate discrete action transaction may be represented as geometric bookkeeping attached to a threshold crossing of the causal-root ledger. Discrete root counts do not by themselves quantize action or energy. That stronger result requires the action difference across neighboring certified ledger cells to approach a nonzero universal value while the path-history geometry, potential chart, and regulator are refined. A closed branch chart must expose the root-change energy, wake exchange, closure-channel adjustment, and any mismatch routed into unresolved modes.

The following transaction pattern is a guessed illustration:

- Source-record binary 3 registers a single-step transaction ($h$-like unit), meaning one minimal admissible update of its active partner and self channel ledger.
- Source-record binary 2 adjusts to conserve total energy.
- Source-record binary 1 executes a two-step shift ($2h$-like unit), i.e., two discrete ledger updates rather than one. The "step" corresponds to the system crossing a separatrix between basins of attraction in the nonlinear delay dynamics. Discrete resonant outcomes are the hypothesis to test. Continuous trajectory evolution and integer root counts alone do not establish a discrete energy spectrum.

This can read as an "amplified" response, but only because source-record binary 1 is **releasing or reconfiguring retained internal energy** when the self-hit echo is engaged. It is **not** net energy creation; it is a redistribution between internal stores under a smooth $U(r)$. The assigned transaction, closure, and self-hit roles in this working record are hypotheses; the persistent indices do not carry those meanings in the taxonomy.

### Candidate Braid as Routing/Locking Circuit (Analogy)

It is useful (as a **bookkeeping analogy**) to think of this candidate braid record as a **routing/locking circuit** rather than a simple reservoir. An incoming single-step transaction ($h$-like) couples most strongly to source-record binary 3, binary 2 acts as a closure buffer that maintains overall consistency, and binary 1 can respond with a two-step reconfiguration when the self-hit echo is engaged. These provisional roles do not identify a taxonomy member. The effective response can resemble a geared or ratcheted redistribution, but the mechanism is still deterministic energy routing, not creation.

In this language, a discrete input can **lock in** a new candidate braid configuration: a threshold-triggered, history-dependent update that selects one stable branch over another. The comparison is a collapse-like change in a coarse state label. Establishing such a deterministic, microstate-sensitive branch transition requires actual trajectories and their basins; the analogy supplies neither that result nor a stochastic-collapse postulate.

### Closed-Cycle Action Bookkeeping Table for the Sub-Field Source Record

This guessed comparison table assigns one $h$ of closed-cycle action for source-record binary 3 in the sub-field-speed regime $v_3<c_f$.

For the $h$ versus $\hbar$ convention used here, see [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md).

Assumptions for this bookkeeping pass:

- $n$ labels a dimensionless discrete binary-3 state index. The three rows are **pre-hit** ($n-1$), **action/transition** ($n_{\psi}$), and **post-redistribution** ($n$). There is **one** step in the state index. The $n_{\psi}$ label is a transient bookkeeping state, not an additional persistent state index or literal wave function.
- The transaction is a single closed-cycle action unit, $\Delta A_{\text{cycle}} = +h$, coupled first to source-record binary 3 while $v_3 < c_f$.
- The symbol $h$ is the observer action scale used as a comparison target per full cycle; its universal emergence is not derived here. The associated radian-normalized rotational-action increment is $\hbar = h/(2\pi)$; in this local bookkeeping pass $\Delta I$ denotes that angular-momentum/action variable.
- Energy bookkeeping uses a hypothetical canonical cycle action $I$: a reduced Hamiltonian $H_{\mathrm{red}}(I)$ would give $\omega=\partial H_{\mathrm{red}}/\partial I$ at fixed other variables and $\Delta E=\omega\Delta I+O((\Delta I)^2)$. With cycle frequency $\nu=\omega/(2\pi)$, the linear term is $\nu\Delta A_{\mathrm{cycle}}$. The table keeps this linear approximation; a finite physical transition must retain its remainder. This is a conditional reduction, not a notation choice or a primitive action law.
- Source-record binary 1 responds with a two-step reconfiguration. Binary 2 supplies a signed compensating energy entry. For the scalar angular illustration only, all $I_a$ are signed angular components about one fixed common axis and the cycle-action identification is assumed for that reduction. Differently oriented binaries require the full vector angular balance; their cycle-action magnitudes cannot simply be summed.

Notation in the table:

- $K_3, U_3$ = binary-3 kinetic and potential energies.
- $K_2, U_2$ = binary-2 kinetic and potential energies.
- $K_1, U_1$ = binary-1 kinetic and potential energies.
- Superscripts $(n-1)$, $(n_{\psi})$, and $(n)$ denote the state index (one-step update).

The fractions $0\le\chi_a\le1$ allocate each signed energy increment between kinetic and potential entries. A negative adjustment decreases the corresponding entries; admissible final energies and the omitted history account must still be checked. The following definitions close a trial energy budget by construction, not by an independent conservation proof.

**Binary-3 step energy.** Set $\varepsilon_3 \equiv \omega_3 \hbar$ and split it by

$$k_3 \equiv \chi_3\,\varepsilon_3,\quad u_3 \equiv (1-\chi_3)\,\varepsilon_3,$$

[View →](../../../../equation-mapping.html#corpus-equation-a35196e899147084)

so $k_3 + u_3 = \varepsilon_3$.

**Binary-1 step energy.** Set $\varepsilon_1 \equiv \omega_1 \hbar$ and split it by

$$k_1 \equiv \chi_1\,\varepsilon_1,\quad u_1 \equiv (1-\chi_1)\,\varepsilon_1,$$

[View →](../../../../equation-mapping.html#corpus-equation-0b910a5e36da23c3)

so $k_1 + u_1 = \varepsilon_1$. Because binary 1 takes **two steps** in this source record, it adds $2k_1$ and $2u_1$.

**Binary-2 adjustment energy.** Let $\varepsilon_w$ denote the **causal-wake exchange energy** during the step and define the amount needed to close the ledger by

$$\varepsilon_2 \equiv \varepsilon_w - 2\varepsilon_1,$$

[View →](../../../../equation-mapping.html#corpus-equation-3af21b70c4a6036c)

then split it by

$$k_2 \equiv \chi_2\,\varepsilon_2,\quad u_2 \equiv (1-\chi_2)\,\varepsilon_2.$$

[View →](../../../../equation-mapping.html#corpus-equation-5334a3bc018c97a8)

| State | Binary 3 | Binary 2 | Binary 1 | Notes |
| --- | --- | --- | --- | --- |
| $n-1$ | $K_3^{n-1}$, $U_3^{n-1}$ | $K_2^{n-1}$, $U_2^{n-1}$ | $K_1^{n-1}$, $U_1^{n-1}$ | Baseline. No pending transaction. |
| $n_{\psi}$ | $K_3^{n_{\psi}} = K_3^{n-1} + k_3$<br>$U_3^{n_{\psi}} = U_3^{n-1} + u_3$ | $K_2^{n_{\psi}} = K_2^{n-1}$<br>$U_2^{n_{\psi}} = U_2^{n-1}$ | $K_1^{n_{\psi}} = K_1^{n-1}$<br>$U_1^{n_{\psi}} = U_1^{n-1}$ | Immediate post-hit. <br>Binary 3 receives $\Delta I_3 = +\hbar$ in the initial bookkeeping gauge. <br>Binary 3 records a $(k_3,u_3)$ increment. |
| $n$ | $K_3^{n} = K_3^{n-1} + k_3$<br>$U_3^{n} = U_3^{n-1} + u_3$ | $K_2^{n} = K_2^{n-1} + k_2$<br>$U_2^{n} = U_2^{n-1} + u_2$ | $K_1^{n} = K_1^{n-1} + 2k_1$<br>$U_1^{n} = U_1^{n-1} + 2u_1$ | Post-redistribution. <br>Binary-3 update is complete at $n_{\psi}$; <br>only binaries 2 and 1 continue to settle. |

Constraints to apply across the $n-1 \to n$ transition (bookkeeping level):

- **Angular momentum / rotational action**: for the declared common-axis comparison, signed increments obey
  $$
  \Delta I_3+\Delta I_2+\Delta I_1+\Delta I_{\text{wake}}
  =
  +\hbar,
  \qquad
  |\Delta I_{\text{wake}}|
  \le
  \epsilon_w\hbar
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-729564ce33deeadc)

  With $\Delta I_3=\hbar$ and the proposed $\Delta I_1=2\hbar$, this requires $\Delta I_2=-2\hbar-\Delta I_{\mathrm{wake}}$. Negative internal compensation is allowed. For example, $\Delta I_{\mathrm{wake}}=0$ gives increments $(\Delta I_3,\Delta I_2,\Delta I_1)=(1,-2,2)\hbar$, whose sum is $\hbar$. If all three energies are simultaneously inferred from the same linear action-angle relation, the separate energy allocation also requires $\varepsilon_w=2(\omega_1-\omega_2)\hbar-\omega_2\Delta I_{\mathrm{wake}}$. A freely chosen wake-energy entry need not satisfy this angular constraint; the full table must meet both on one record.
- **Energy**: $(k_3+u_3) + (k_2+u_2) + 2(k_1+u_1) = \varepsilon_3 + \varepsilon_w$. This equality follows from the definition of $\varepsilon_2$; an independent event account is required to test conservation.
- **Root-ledger closure**: the transition must move from one admissible integer causal-root ledger to another and then close consistently over the full cycle. In a raw self-root table, a certified interior ordinary fold changes the count by $\pm2$ and preserves signed degree, provided no history endpoint is crossed. A simple root entering or leaving through an endpoint changes the retained count by one and is recorded separately; in a grouped channel ledger, the same event may be recorded as one newly active channel.
- **Cross-ledger gauge matching**: any jump in $r_{\min}^{(b)}$ and $B_{\max}^{(b)}$ is part of the declared $\Delta_{\text{ledger}}$ budget above. A table row may not count the same gauge-origin shift once in $U^{(b)}$ and again as an extra wake or oscillator energy.
- **Smooth-slope test**: the guessed graft requires $dU/dr$ to remain continuous; a computed kink or divergence rejects that graft.

This table represents the guessed $h$-like transaction by a radian-normalized $\hbar$ rotational-action increment. Its corresponding energy increment, under the assumed linear action-angle relation, is split into kinetic and potential parts. The table does not derive the value $h$. The remaining freedom is how each binary partitions its energy step through the $\chi$ fractions and how binaries 2 and 1 plus the causal-wake channel redistribute the initial binary-3 coupling in this source record, subject to both energy and angular compatibility.

### Comparison to Coulomb and Standard Conventions

In pure Coulomb,

$$V(r) = -\frac{k q^2}{r},$$

[View →](../../../../equation-mapping.html#corpus-equation-84d9060789dea048)

so there is no inner bound and no natural finite zero. Classical mechanics therefore chooses $V(\infty)=0$.

In $\mathbb{A}\mathbb{A}\mathbb{A}$, a certified hard inner bound permits a convenient zero at $r_{\min}$. It is the lowest accessible radius on that branch, not automatically the lowest-energy state. The bookkeeping may therefore use energy relative to the inner boundary rather than energy relative to infinity, provided the chosen potential is valid on that ledger cell.

### Summary Table (Operational Meaning)

| Region | $K$ | $U$ | Meaning |
| --- | --- | --- | --- |
| $r = r_{\min}$ | branch-dependent | 0 by gauge | Inner radial boundary; ground-state status unproved |
| $r > r_{\min}$ | branch-dependent | branch-dependent | Same-ledger continuation required |
| escape limit | set by the asymptotic branch state | $B_{\max}$ if the integral converges | Unbound comparison state |

### One-Line Rule

If a certified branch has a hard inner bound and a valid branch-local potential, the potential zero may be set at that bound; the choice does not establish a ground state or determine the kinetic-energy profile.

**Adiabatic branch invariant target.** On a certified branch chart for binary layer $a$, suppose an accepted action supplies a canonical pair $(Q_a,\Pi_a)$ for the reduced cycle and the branch has a slowly varying parameter $\lambda(T)$, such as a local Noether sea response variable, shielding parameter, or neighboring-layer phase parameter. The existence of this canonical pair is itself unestablished pending that accepted action, so the invariant target below is conditional on both the action and the adiabatic hypotheses. Define the rotational action
$$
I_a(\lambda)
\equiv
\frac{1}{2\pi}
\oint_{\gamma_a(\lambda)}
\Pi_a\,dQ_a
$$

[View →](../../../../equation-mapping.html#corpus-equation-22dd0aed2ee55168)

If the parameter changes slowly compared with the cycle period $P_a(\lambda)$,
$$
\epsilon_{\mathrm{ad},a}
\equiv
\max_{T\in W}
\left(
P_a(\lambda(T))\,
\left\|\frac{d\lambda}{dT}\right\|\,
\ell_{\lambda}^{-1}
\right)
\ll1
$$

[View →](../../../../equation-mapping.html#corpus-equation-cb93cafc55af9651)

and the path remains a positive distance from the causal-root ledger-cell boundary,
$$
\operatorname{dist}\!\left(\gamma_a(\lambda),\partial\mathcal{G}_a\right)
\ge
\delta_{\text{cell}}
>
0
$$

[View →](../../../../equation-mapping.html#corpus-equation-8c550a86d8d431b5)

the interior adiabatic theorem target is
$$
\frac{dI_a}{dT}
=
O(\epsilon_{\mathrm{ad},a})
+
\mathcal{R}_{\mathrm{int},a}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-d1710e1ccb8d3aa2)

Here $\ell_{\lambda}$ is the declared scale over which the reduced Hamiltonian changes appreciably, and $\mathcal{R}_{\mathrm{int},a}$ records omitted wake-history exchange, non-characteristic boundary leakage, or small chart error while the branch stays inside one ledger cell. At a separator crossing or root-fold boundary, the interior estimate is void. The crossing rule is instead
$$
\Delta I_a\big|_{\mathrm{fold}}
=
\frac{1}{2\pi}
\left(
\oint_{\gamma_a'}\Pi_a\,dQ_a
-
\oint_{\gamma_a}\Pi_a\,dQ_a
\right)
=
\Delta I_{\mathrm{ledger},a}
$$

[View →](../../../../equation-mapping.html#corpus-equation-aebe9d3eb2270c88)

where $\Delta I_{\mathrm{ledger},a}$ is the candidate ledger increment associated with the change in active causal-root multiplicity or branch chart. The adiabatic theorem would constrain drift inside a ledger cell, while a root-ledger transition may produce a discrete change in the action variable. Nothing here establishes that the change is universal, nonzero, or equal to $h$ or $\hbar$. That identification requires a regulator-stable phase-space area jump shared across independently certified transitions. The floor $\delta_{\text{cell}}>0$ marks the domain of the interior adiabatic estimate; at the wall, the fold impulse, ledger update, and cross-ledger gauge matching must be booked together on the same retained branch record.

> Claim grade: guessed for a universal $h$-like ledger increment. Falsifier: transition-dependent, continuously variable, or regulator-vanishing values of $\Delta I_{\mathrm{ledger},a}$ on otherwise certified crossings would reject the proposed universal action step.

## References

- William Rowan Hamilton, “On a General Method in Dynamics,” *Philosophical Transactions of the Royal Society of London* 124 (1834): 247–308, [doi:10.1098/rstl.1834.0017](https://doi.org/10.1098/rstl.1834.0017).
- Emmy Noether, “Invariante Variationsprobleme,” *Nachrichten von der Königlichen Gesellschaft der Wissenschaften zu Göttingen, Mathematisch-Physikalische Klasse* (1918): 235–257, [original publication](https://eudml.org/doc/59024).
