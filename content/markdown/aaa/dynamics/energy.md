# Energy

In $\mathbb{A}\mathbb{A}\mathbb{A}$, energy accounting begins with moving architrinos and the causal wakes recorded by their motion. An architrino is a primitive pointlike entity carrying one polarity. A [causal wake](../foundations/architrino.md#the-emitted-wake) is the expanding record emitted along its path, not hidden fuel, a vacuum reservoir, or a second substance in the Euclidean void. Motion changes wake geometry, branch timing, and the acceleration available at a receiver; it does not turn the wake into an independent material thing.

This chapter answers four linked questions. What kinetic bookkeeping is allowed for a single architrino? How does work occur when a receiver crosses delayed causal wakes? How do assemblies hide or expose internal energy? How can Noether sea coupling make energy, inertia, and effective geometry appear at larger scales?

The chapter underwrites [Particle Masses](../assemblies/particle-masses.md), [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), [Noether Braid](../noether-braid/noether-braid.md), [Noether Sea Pro/Anti Coupling](../spacetime/noether-sea-pro-anti-coupling.md), [Emergent Metric](../spacetime/emergent-metric.md), and the constructive delay-energy standard in [Delay Dynamics Energy](../validation/simulations/action-energy/delay-dynamics-energy.md).

All such dynamics unfold on a fixed ontological background: absolute time plus the Euclidean void. Accelerations and motion arise from **delayed causal hits from causal isochrons**, with line-of-action direction and transmitter-side acceleration weight, on this fixed background. Derivations keep $c_f$ symbolic so the primitive-speed dependence remains visible; numerical instantiations use normalized units with $c_f=1$.

The chapter keeps four levels separate. At the substrate level, kinetic and potential terms are architrino and causal-wake records on absolute time and the Euclidean void. At the dynamical level, energy changes through receiver-side causal hits and radial power. At the effective level, assemblies acquire inertia, apparent energy, and effective metric response through Noether sea coupling. At the inference level, scalar masses, thermodynamic records, and cosmological inventories are accepted only after a window, boundary record, and residual are declared.

Spacetime in this framework belongs to the effective level, not the ontological one. The [Noether sea](../spacetime/noether-sea.md) is the proposed ambient population of neutral Noether braid assemblies occupying the Euclidean void. Its constitutive state is a candidate common source of assembly inertia and effective geometry; deriving that shared response from stable assemblies remains a closure obligation.

---

## Kinetic Energy and Momentum of a Single Architrino

The Master Equation specifies architrino acceleration but does not independently specify a kinetic-energy or momentum functional. This section therefore introduces the most general isotropic bookkeeping pair used by the later energy tests and states the conditions under which the pair is mutually compatible.

- **Kinetic Energy $E_k$**
  
  For a single architrino $a$ with velocity $\mathbf V_a(T)$, define a candidate kinetic scalar by
  
  $$E_{k,a}(T) = K(s_a),\qquad s_a=\|\mathbf V_a(T)\|,$$

  [View →](../../../../equation-mapping.html#corpus-equation-9c26d744155fdd7c)
  
  where $s_a$ is the speed. The bookkeeping assumptions are $K(0)=0$, strict convexity, and monotonic increase for $s>0$. These assumptions make speed recoverable from the scalar value, but they do not follow from the acceleration law. A finite saturation proxy may additionally impose $K'(s)\to\infty$ at a declared scale; the primitive unbounded-speed chart instead leaves the domain unbounded. The function must ultimately be fixed by consistency across independently certified branches.

  > Claim grade: guessed for the existence and form of the primitive kinetic scalar. Falsifier: incompatible back-solved $K$ or $\mu_K=K'(s)/s$ on two certified branches, after matching units and boundary conventions, would reject a universal scalar of this form.

- **Momentum $\mathbf{p}_a$**
  
  Define the corresponding isotropic momentum-like vector by
  
  $$\mathbf p_a(T) = P\big(\|\mathbf V_a(T)\|\big)\,\hat{\mathbf V}_a(T), \quad \hat{\mathbf V}_a = \frac{\mathbf V_a}{\|\mathbf V_a\|},$$

  [View →](../../../../equation-mapping.html#corpus-equation-cea96aa9e5fc3a55)
  
  where $P$ is a speed-dependent magnitude. Its detailed form is not postulated at the architrino level; it emerges from matching to assembly behavior.

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

  **Kinetic-scalar / closure compatibility.** The conjugacy relation above also prevents a hidden second speed scale. If the primitive kinetic scalar is modeled with a finite saturation scale $c_K$, meaning $K'(s)\to\infty$ as $s\to c_K^-$, then any effective assembly closure using a signal speed $c_{\text{eff}}$ is admissible on the declared comparison window only when
  $$
  \left|\frac{c_{\text{eff}}}{c_K}-1\right|\le\epsilon_{cK}
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-551a6457c0e9f82d)
  with $\epsilon_{cK}$ declared before the comparison is accepted. If $K$ is instead kept in the primitive unbounded-speed limit, then $c_{\text{eff}}$ is wholly a Noether sea response quantity and no substrate-level particle speed cap may be invoked in the energy or mass-shell argument. This is the Legendre-compatibility condition for the kinetic scalar: once $K$ is chosen, the canonical radial momentum magnitude is fixed by the same generating function. A later effective mass-shell closure may introduce $c_{\text{eff}}$ only as the declared sea-response scale, or as the same finite scale already present in $K$ to the stated tolerance; it may not carry an unrelated second speed limit.

**No fundamental mass.**

The ontology assigns no particle-specific substrate mass to individual architrinos. Neither $E_k = \frac{1}{2}m\|\mathbf V\|^2$ nor $\mathbf p = m \mathbf V$ is a substrate premise for distinct architrino species. Instead:

- A kinetic scalar and momentum are candidate bookkeeping functions constrained by work-power and branch consistency.
- The substrate law is written in **acceleration-first** form.
- A quadratic-kinetic chart may introduce one universal coefficient $\mu_{\text{arch}}$, but this is not a particle-specific inertial mass.
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

Because $\mathbf A_{ij}\parallel\hat{\mathbf{r}}_{ij}$:

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

At a point $\mathbf X$ and time $T$, the net potential is the **superposition** of contributions from all sources:

$$\Phi_{\text{net}}(\mathbf X,T) = \sum_o \Phi_o(\mathbf X,T).$$

[View →](../../../../equation-mapping.html#corpus-equation-1743c15c55550355)

Each $\Phi_o$ is built from the expanding causal isochrons emitted by source $o$, using the measure-valued or mollified emission density described in the architrino section. In the mollified representation with causal-surface width $\eta>0$, $\Phi_{\text{net}}$ is a smooth function of $(\mathbf X,T)$; in the ideal limit $\eta\to 0$ it becomes a measure-valued distribution supported on causal isochrons.

### Potential Availability Is Geometric

The phrase "an architrino emits potential" should not be read as a transmitter continually spending an internal fuel. The emission is the causal-wake geometry of the architrino itself: at each emission time, an expanding causal isochron is added to the transmitter's path history. That causal structure can later participate in work, but it is not a material energy substance stored inside the Euclidean void.

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
\|\mathbf A_{ij}\|\,V_r
$$

[View →](../../../../equation-mapping.html#corpus-equation-31d12a9f37326e23)

On an affine partner chart, the transmitter-side factor and receiver-side factor must both be tracked. The simple branch expression $J_p=1+(dX/dT)/c_f$ is only a transmitter-side topology expression unless the receiver-side factor is also present on the same chart.

Thus the potential to do work is broadly available wherever causal wakes pass, but work is realized only through an actual receiver trajectory. A quiet region is not a region with no causal activity; it is a region where the active wake contributions sum to negligible net acceleration and negligible net power for the assemblies present there.

### Potential Energy

For a receiver architrino $i$ with polarity $q_i$ at position $\mathbf X_i(T)$, the potential energy $U_i(T)$ is the fixed-history bookkeeping value assigned to the current configuration against the causal path-history wake record:

$$U_i(T) = q_i\,\Phi_{\text{net}}[\text{history}]\big(\mathbf X_i(T),T\big).$$

[View →](../../../../equation-mapping.html#corpus-equation-db8d90188e15f2f2)

The sign of $\Phi_{\text{net}}$ is not a sign on total energy. A negative causal-wake potential contribution from an electrino source is a polarity-signed interaction record; it becomes energy bookkeeping only after the receiver polarity, active causal root, line-of-action geometry, transmitter-side factor, transmitter-side acceleration weight, and receiver radial motion are specified. Work can therefore occur relative to a negative potential without introducing a negative-energy substance or a negative total-energy reservoir.

Unlike electrostatics, $\Phi_{\text{net}}$ is not a function of instantaneous source positions but a functional of their past worldlines intercepted by the backward causal-wake record of $\mathbf X_i(T)$. The gradient $\nabla\Phi_{\text{net}}$ is taken with respect to the receiver's spatial coordinates on the fixed background, holding the causal history fixed. In the idealized picture, $\Phi$ is a distribution supported on causal isochrons, not a smooth continuum field.

For a mollified effective potential $\Phi_\eta$ in the quadratic bookkeeping chart, the fixed-history target is

$$\mu_{\text{arch}}\mathbf A_i(T) = -\nabla_{\mathbf X_i}U_i(T) = -q_i \nabla_{\mathbf X_i} \Phi_\eta[\text{history}]\big(\mathbf X_i(T),T\big),$$

[View →](../../../../equation-mapping.html#corpus-equation-6eef4154628cac82)

and this must reproduce the Master Equation in the quasi-static, resolved-in-time limit with the same kinetic-bookkeeping coefficient and retained causal history. For a general kinetic scalar, the corresponding statement is an equation for the conjugate-momentum rate and must be rederived rather than obtained by replacing $\mu_{\text{arch}}$ pointwise. The gradient identity is valid only at fixed causal history; the fundamental acceleration law remains the per-hit sum of the Master EOM.

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

Both bounds must use the same horizon, screening, and summation prescription that makes the many-source wake sum converge. The variance bound is the load-bearing part: incoherent fluctuation must remain small compared with the coherent bound-state gradient that phase-locked assemblies preserve. This cancellation is one reason the Noether sea can be densely active while remaining macroscopically quiet. What standard prose may call a vacuum state is not empty Euclidean void; it is the effective limit in which the local Noether sea assemblies and their causal wakes balance so well that only small residual gradients remain available to ordinary probes.

Mean-zero wake potential is therefore not zero total energy. A statistically neutral $50/50$ electrino/positrino inventory can make the large-scale potential gradient and received power nearly vanish while still carrying kinetic energy, local correlated interaction energy, retained wake-history content, and Noether sea organization. The candidate conserved quantity for an isolated exact trajectory is a history-aware total ledger, not "initial kinetic energy plus a naive instantaneous potential" evaluated after the wake record has been discarded. Its conservation remains a closure target until one accepted causal action or causal-wake update derives the motion, wake, and boundary accounts on the same provenance-complete causal-root record.

For energy accounting, cancellation is applied only after transmitter identity, polarity, emission time, active causal root, branch Jacobian, line-of-action geometry, and receiver radial power have been retained. A net-zero scalar potential channel is therefore a projection of a richer transmitter-tagged ledger, not proof that no wake-history energy, internal branch energy, or coherent work opportunity remains available to a receiver whose branch resolves the contributing rows.

Phase-locked bound states are the important exception. In a localized assembly, nearby constituents do not sample random phases; their active causal roots are correlated, and the $1/r^2$ distance factor lets the nearest coherent branches dominate over the far incoherent background. A collinear breather, for example, is precisely a reduced setting in which two opposite-polarity architrinos can form a localized, non-canceling causal resonance: instead of averaging away, the partner-hit and self-hit branches stay phase organized enough to exchange kinetic and potential energy across a bounded cycle.

---

## Energy Conservation and Exchange

Energy conservation is a required closure target. Its derivation must show, on one retained causal-root record, how kinetic motion exchanges with causal-history interaction content while every active root, admitted self entry, fold, and boundary transfer has unique provenance. The wake term in the candidate ledger should not be read as an independent material reservoir that drains from the transmitter with every unreceived isochron; it must be derived as nonlocal bookkeeping from the same time-translation-invariant causal action or causal-wake update that generates the acceleration contributions. Time-translation symmetry is necessary but insufficient: the action route must extend the variational symmetry argument of [Noether (1918)](https://eudml.org/doc/59024) to the delayed history and its boundary terms, while either route requires signed motion, wake, and boundary accounts with complete pairwise provenance and no double booking. For mollified working models, an exact conservation claim additionally requires the regularization to inherit the accepted action or update rather than being inserted only at the acceleration-operator level.

Classical virial language is recovered only at branch level. The familiar comparison form $\langle 2K-pU\rangle=0$ is admissible after a retained branch chart supplies a branch-local potential, homogeneity degree, and proof that the same acceleration contribution used by the Master EOM is generated by that potential over the declared window. Standard mechanics often writes $T$ for kinetic energy in this formula; here $K$ avoids collision with absolute time $T$. Until those rows close, virial behavior remains a diagnostic on the causal-root ledger rather than a primitive substrate axiom; see the branch-virial target in [Analytic Baselines](../validation/simulations/action-energy/analytic-baselines.md#analytic-baselines).

With a declared assembly-level bookkeeping normalization and a fixed set of sources, the branch-local work identity has the candidate form:

$$
\Delta E_k
=
\int
\mu_K(\|\mathbf V\|)\,\mathbf A\cdot d\mathbf X
=
-\Delta U
$$

[View →](../../../../equation-mapping.html#corpus-equation-179020f3e21467c8)

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

For a hybrid decomposition, the omission must be checkable on the same finite window. Let the near/far split be made with the same coarse-graining window $W_\ell$ used in the matter-to-sea source $S_{\mathrm{mat}\to\mathrm{sea}}^{(\ell)}$. Define the partition-overlap residual
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

The finite-$\eta$ pathology theorem target in [Master Equation](./master-equation.md#finite-regulator-pathology-quarantine-theorem-target) uses this conservation status in a restricted way. The no-runaway conclusion is available only when the action-derived $E_{\text{wake}}^{(\eta)}$, or a compatible realized-trajectory reconstruction, has a declared lower bound on the same admissible branch chart. If the lower bound is absent, the run is not accepted as a closed solution; it is routed to the continuation boundary where collapse, missing wake-history bookkeeping, regulator dependence, or endpoint leakage must be resolved.

For reaction or radiation events, energy can leave the source assembly as photon output, recoil, medium excitation, remnant excitation, wake-carried exchange, or handoff terms, but those are named outputs rather than hidden losses. The event-level version is the componentwise ledger closure in [Reaction Ledger](../validation/reaction-ledger.md#residual-routing-event-ledger-contract).

### Wake Escapement

This is a boundary-accounting idea, not a new energy reservoir. If a wake leaves the chosen local window before any retained receiver crosses it, the local work ledger cannot spend that wake internally. The accounting must therefore mark it as escaped flux, recoil, boundary exchange, or another declared handoff rather than hiding it inside the local assembly.

For a finite local window $W\subset\Sigma_T$, the **wake-escapement diagnostic set** is the set of emitted causal isochrons whose first retained boundary crossing occurs before any retained receiver intersection inside that window. More explicitly, if architrino $a$ emits at $T_t$, define the causal isochron at later time $T$ by

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
The emitted isochron belongs to the escapement set $\mathcal{E}_{\mathrm{esc}}(W)$ when it has a first retained boundary crossing
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

This isochron-level set is an earliest-crossing diagnostic, not a measure of the escaped fraction of a wake. When only some surface sectors cross $\partial W$, or when retained receivers intersect other sectors, quantitative escapement is the surface-resolved boundary flux through $\partial W$, with a declared solid-angle or surface partition when needed. A receiver intersection records local work; it does not imply depletion or absorption of the remaining isochron unless that mechanism is separately derived from the action.

Wake escapement is therefore a finite-window boundary classification, not a new substance in the Euclidean void. It names the portion of causal-wake history that cannot be balanced by local receiver work because no local receiver intercepted it. In a contracting binary, the persistent positive tangential drive identified in [Binary Dynamics](binary-dynamics.md#tangential-drive-and-wake-escapement) should be read against this boundary ledger: particle kinetic gain, local interaction-energy change, recoil, and escaped wake flux are parts of one balance law.

For a finite spatial window $W\subset\Sigma_T$, conservation is a balance law rather than a claim that the window is isolated. This is the conservation-law upgrade relative to instantaneous mechanics: energy, momentum, and angular momentum are not generally conserved equal-time particle snapshots, but finite-window history functionals whose apparent deficits must be carried by causal-wake fluxes or by an explicit residual. Write
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
Here $\mathbf{J}_E$ is the boundary flux of causal-wake energy bookkeeping, including any wake escapement through $\partial W$; $P_{\mathrm{ext},W}$ is declared external work through sources or controls not included in $W$; and $\mathcal{R}_E$ records mollifier, timestep, and omitted-boundary-history error. A finite-window conservation claim is mature only when $\mathcal{R}_E\to0$ under the same regularized causal action used for the local equation of motion.

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
where $\mathcal{B}_{\partial W}$ records boundary and embedding terms. The corresponding inventory residual is
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
The circularity check is the post-handoff residual
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

**Theorem target (center of response).** The standard center-of-mass theorem depends on equal-time internal force cancellation. In delayed causal dynamics that cancellation is not available as a particle-only statement on $\Sigma_T$: the reciprocal hit generally belongs to a different emission time, a different causal-root branch, or a boundary wake record not retained by the finite window. For an assembly window $W_A(T)$, the replacement target is to prove that there is a response center $\mathbf X_{\mathrm{resp}}(T)$ and an assembly response tensor $M_A^{ij}$ such that the finite-window momentum balance reduces, over resolved windows, to
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
The pair $(\mathbf{X}_{\mathrm{resp}},M_A^{ij})$ is not free to be chosen after the balance is fitted. The response center must be pinned independently by the exposed internal-energy ledger,
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
whenever the denominator is positive and the window contains the exposed assembly record on the native slice $\Sigma_T$. The tensor $M_A^{ij}$ must then reduce to the independently extracted response tensor $\mathsf{I}_A^{ij}$ on the same branch chart. Only when these independently defined objects satisfy the balance with $\mathcal{R}_{\mathrm{resp}}^i\to0$ does it reduce to the familiar center-of-mass form. A non-vanishing irreducible residual means the exposed-energy center is not the inertial response center for that branch, rather than a license to redefine the center. Until that theorem is closed, a center-of-mass trajectory is an effective readout of the assembly response, not a substrate-level proof that internal delayed acceleration contributions cancel instantaneously. Equivalently, $\mathbf{X}_{\mathrm{resp}}$ and the inertial-response center are two different moment maps on the same retained assembly record: one weights exposed internal energy, while the other is inferred from momentum response. Their coincidence is a theorem target, not a definition. The obstruction is the finite-window wake-momentum flux across $\partial W_A$; if that boundary record has a secular or nonrecurrent component, the two centers can differ even when the equal-time particle picture looks nearly balanced. This is the center-of-response version of the memory-boundary recurrence condition used by the effective-Lagrangian symplectic-validity condition.

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
This is not an added thermodynamic postulate. It is a test that the chosen coarse variables have retained enough state counting to make relaxation and response claims reproducible.

The distinction matters because energy conservation does not by itself measure work availability. Two records with the same total energy can have different free-energy diagnostics when one retains a concentrated heat, chemical, photon-channel, or potential-gradient channel and the other has dispersed the same energy into unresolved thermal, boundary, or wake-history records. A finite-window calculation must therefore close the energy ledger and the entropy ledger on the same retained record before claiming that energy remained useful, became waste heat, or crossed the boundary as low-grade radiation.

For an isolated finite window, the minimum coarse thermodynamic criterion is the same-record entropy-production residual
$$
\mathcal R_{S,W}
=
\frac{
\left[
-
\Delta_W S_{\mathcal Q}
+
\int_W
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
\int_W
\left|
\frac{\mathcal D_{\mathcal Q}}{T_{\mathcal Q}+\varepsilon_T}
\right|dT'
+\varepsilon
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-11c8271067035366)
where $[x]_+=\max(x,0)$ and $\mathcal D_{\mathcal Q}$ is the declared coherent-to-incoherent transfer rate, including viscous, thermal, wake-boundary, or Noether sea response channels retained by the record. Passing this criterion means only that the selected coarse record has not made entropy decrease after unresolved boundary leakage is accounted for. It does not prove a fundamental stochastic substrate.

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
Here $\mathcal F_T$ is the record's chosen fluctuation-dissipation map, and $\chi_{AB}''$ is the imaginary, dissipative response. A passing value supports the coarse response chart; a failing value means the noise, dissipation, and energy ledger have been fitted separately.

---

## Noether Sea, Effective Spacetime, and Energy Storage

At the fundamental level, the Euclidean void is an empty container. **Effective spacetime** is the observer-level summary of a **sea of high-energy Noether braid assemblies**. The following size and energy statements are hypotheses awaiting a certified Noether braid and scale map:

- These Noether braids are extremely small compared to ordinary particles (electrons, protons, etc.).
- Each Noether braid is itself a tightly bound architrino assembly with very high internal kinetic and potential energy; coincident-midpoint orthogonal-axis braid is the best-developed orthogonal-axis three-binary member, not the definition of the sea.
- As a sea, they form a **dense population of coupled assemblies** occupying the Euclidean void. This ambient Noether sea content carries non-zero assembly density and internal stress. It provides the constitutive relations (permittivity, permeability, and medium-dressed inertial response) that deform the primitive architrino dynamics into effective relativistic kinematics, providing the bridge-level spacetime medium for:
  - Emergent inertia and mass,
  - Effective causal-cone behavior and Lorentz-like behavior,
  - Effective gravitational coupling (emergent geometry at large scales).

Energy in this picture is distributed across:

1. **Unbound Architrinos** (rare at low energies),
2. **Standard Model assemblies** (electrons, nucleons, etc.),
3. The **Noether sea** and, in bridge prose, the spacetime medium.

---

## Assemblies: Internal vs Apparent Energy

For composite systems such as Standard Model particles, nuclei, and other bound states formed from architrinos and embedded in the Noether sea, distinguish:

- **Total internal energy**: energy retained by the assembly and by its immediate Noether braid environment,
- **Apparent energy**: what leaks out as a long-range wake signature and governs how the assembly interacts with the outside world.

### Internal Energy of an Assembly

For an assembly $A$ (e.g., Noether braid or higher structure), let $i\in A$ run over its constituent architrinos. Then:

$$E_{\text{internal}}(A) = \sum_{i\in A} E_{k,i} + \frac{1}{2} \sum_{\substack{i,j\in A \\ i\neq j}} U_{ij} + E_{\text{coupling to sea}}(A),$$

[View →](../../../../equation-mapping.html#corpus-equation-a355acf2081a9004)

where:

- $E_{k,i}$ is the kinetic energy of architrino $i$,
- $U_{ij}$ is mutual potential energy of pair $(i,j)$,
- $E_{\text{coupling to sea}}$ accounts for how the assembly deforms and polarizes the surrounding Noether sea, that is, the local Noether sea environment (or in bridge prose, the local spacetime medium).

**Hypothesis.** The internal energy can be much larger than the externally exposed energy. Any comparison to the Planck scale or a higher scale remains a benchmark-level possibility until a certified branch fixes the native energy map.

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

evaluated in a regime where the assembly appears as an effective point source. Here $\Pi_0$ extracts the monopole/isotropic component of the far-field wake ledger and $\mathcal{L}_{\text{aniso}}$ retains anisotropic leakage instead of hiding it inside a scalar error term. A strongly shielded, neutral Noether braid in the Noether sea is guessed to have $\zeta\ll1$. Operationally, extract $\zeta(A)$ from a far-field fit of $\Phi_{\text{net}}$ or hit amplitude at $r\gg\operatorname{size}(A)$: $\zeta\equiv A_{\text{measured}}/A_{\text{naive}}$, the ratio of the leading $1/r^2$ or multipole coefficient to the naive constituent sum, with anisotropic residuals reported separately. The scalar shielding summary is admissible only when anisotropic leakage is small enough for the comparison being made, for example
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
The mass map couples distant probes to $E_{\text{probe}}$ through the retuned Noether sea; the matter-to-sea source uses $E_{\text{sea-coupled}}$. A calculation that uses the raw $\zeta E_{\text{internal}}$ in both roles must report $\mathcal R_{\text{part}}$ as unresolved rather than treating the two uses as independent evidence. This is an exactness condition on one forgetting map. The full internal ledger is first projected to the exposed ledger $\zeta E_{\text{internal}}$, and the probe, sea-coupled, and unresolved channels are further projections of that same exposed ledger. The residual $\mathcal R_{\text{part}}$ measures whether those fibers close back to the once-projected total; it is therefore an anti-double-count rule, not an optional accounting convention.

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

For an assembly $A$ in a regime already shown to have isotropic, linear, collinear response, define its scalar inertial mass $m_{\text{inertial}}(A)$ operationally by the following procedure:

- Apply a small external wake potential (from a distant test source) that exerts a known net force $\mathbf{F}_{\text{ext}}$ on $A$,
- Measure the resulting acceleration of the response center; in regimes where the effective center-of-mass readout has been justified, denote this acceleration by $\mathbf A_{\text{cm}}$,
- Define:

$$m_{\text{inertial}}(A) \equiv \frac{\|\mathbf F_{\text{ext}}\|}{\|\mathbf A_{\text{cm}}\|}.$$

[View →](../../../../equation-mapping.html#corpus-equation-c454de0e25062cfd)

The scalar mass-map hypothesis is that the external wake couples mainly to the probe-facing exposed energy rather than to the full internal circulation:

$$m_{\text{inertial}}(A) \approx \alpha_{\mathrm{m}}\,\frac{E_{\text{probe}}(A)}{c_{\text{eff}}^2}.$$

[View →](../../../../equation-mapping.html#corpus-equation-9785ed6d237481f0)

The tensor handoff is more precise. In the formulas below, $\mathcal{Z}_A^{ab}$ is the probe-channel exposure tensor after the exposed-energy partition has been declared; the sea-coupled channel enters through $S_{\mathrm{mat}\to\mathrm{sea}}^{(\ell)}$ and the resulting Noether sea response, not as a second direct inertial source. For a small group velocity (center-of-mass convention) $V_{\text{cm},b}$ through a declared Noether sea response record,
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

Then the exposed inertial-response tensor is

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

This scalar trace is admissible as a positive inertial mass only inside the shielding window
$$
\zeta_{\text{probe}}(A)(1+\delta\mathcal{M}_{0})
>
\frac{1}{3}
\left|
\mathcal{Z}_{\mathrm{tf},ab}(A)\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-fbad2ac2378276f1)
with the comparison sea state declared. If a certified $A_0$ branch reports $\zeta_{\text{probe}}$ so small that this inequality fails for plausible $\delta\mathcal{M}_{\mathrm{tf}}^{ab}$ in the accepted environment, the shielded-energy mass map is falsified for that branch. Thus deep probe-channel shielding is a constrained exposure window, not an unconstrained way to suppress all long-range response. When $1+\delta\mathcal{M}_{0}>0$, a conservative sufficient lower bound is
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
on the same window. More anisotropic exposure therefore permits less deep scalar shielding before the trace response can become zero or negative. Highly anisotropic branches must either reduce their trace-free exposure, keep the medium response nearly isotropic, or leave the scalar-mass regime.

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

with $\delta\theta_{\mathrm{sea}}^{(\ell)}$ projecting into $n$, $\chi_{\text{sea}}$, $\Gamma_N$, strain, orientation, cadence, and envelope-scale variables. In this language, saying that neighboring Noether braids absorb the exposed potential means that they retune their branch state. Depending on the accepted branch, that retuning may appear as higher cadence, changed strain, stronger alignment, envelope-scale shift, or altered coupling to nearby Noether braids; it should not be compressed into a generic statement that the braids simply gain energy and expand.

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
on branches that pass the positivity criterion above. For any pair $A,A'$ in the mass-map test set, require
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
with $\epsilon_{\alpha}$ declared before accepting universality. If this residual cannot be held small without per-species tuning, the universality claim fails and the parameter count must be raised explicitly. On a connected family of realized assembly branches, this is a flatness condition for $\alpha_{\mathrm{m}}$ over the retained moduli. An irreducible jump in the back-solved $\alpha_{\mathrm{m}}$ across different assembly topological charge sectors would not be hidden inside the same symbol; it would mark either a disconnected mass-map family or a failed universality claim for the compared species.

Thermodynamic or entropic derivations of gravitational force are therefore comparison benchmarks for this chapter, not replacements for the mass mechanism. They may sharpen the observer-level equation-of-state target for gravity, but $m_{\text{inertial}}(A)$ is not closed until the same assembly ledger supplies its closed internal causal-history record, shielding extraction, Noether sea response tensor, and acceleration response.

The immediate mathematical dependency is the $A_0$ reference-attractor criterion. The energy chapter defines the internal-energy and apparent-energy quantities that $A_0$ must supply: layer energies, interaction and wake terms, total $E_{\text{internal}}(A_0)$, far-field wake coefficients, $E_{\text{probe}}(A_0)$, $E_{\text{sea-coupled}}(A_0)$, and $\mathcal R_{\text{part}}(A_0)$. Those quantities remain unestablished until a stable branch, shielding extraction, and response tensor are computed. Compact finite-coordinate no-go records and branch-chart checker results are not energy-accounting inputs: rejection excludes the chart, while clearance identifies only a candidate for recomputation until Tier 2 shielding exists on an accepted branch.

The multi-scale status of $A_0$ matters for this accounting. Fast internal corrections should not be removed until they are classified. Nonresonant motion on a measured fast binary may average out of the leading apparent-energy fit, but corrections that change self-hit counts, the branch Jacobian near $c_f$, or the leakage tensor can change $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, or both. Apparent energy is therefore downstream of closure and stability, not an input used to force a convenient branch.

---

### Noether Sea and Effective Relativistic Behavior

The Noether sea adds an additional layer:

- Moving assemblies must retune their internal causal ledger and reorganize local Noether sea coupling.
- The proposed mechanism is that the effective resistance to high group speed (using the center-of-mass convention, near the relevant internal Noether braid causal-wake propagation scale) increases steeply, producing an emergent saturation speed scale $c_{\text{eff}}$ at which assemblies effectively saturate. This presupposes stable sea-coupled assemblies, none of which has yet been derived. Its identification with the photon-channel speed is a separate closure.

Thus:

- At low group speeds (center-of-mass convention) $v_{\text{CM}}\ll c_{\text{eff}}$, the effective readout recovers $E_k \approx \frac{1}{2}m_{\text{inertial}} v_{\text{CM}}^2$ for assemblies.
- At high group speeds (center-of-mass convention) approaching $c_{\text{eff}}$, internal coupling to the Noether sea and self-hit effects yield a relativistic-like $E_k \sim m_{\text{inertial}}c_{\text{eff}}^2(\gamma_{\text{eff}}-1)$, with $\gamma_{\text{eff}} = 1/\sqrt{1-v_{\text{CM}}^2/c_{\text{eff}}^2}$, as an **effective law**.
- Near $c_{\text{eff}}$, axial architrino stripping and oblation are failure channels or branch-transition hypotheses to test, not assumed parts of the mass mechanism.

The details of this emergent relativistic law arise from the combined dynamics of the assembly and the Noether sea; they are not postulated but must be confirmed by coefficient extraction, simulation, and matching to known particle kinematics. Ordinary dissipative drag is a failure channel for this program, not the mass mechanism. The mass-side integration and quantitative derivation path is tracked in [Particle Masses](../assemblies/particle-masses.md).

---

## Effective Energy-Momentum Closure

For assembly center-of-mass motion in the Lorentz-suppressed regime, impose the relativistic mass-shell relation as an **effective closure test** (not a substrate postulate):

$$
E_{\text{CM}}^2 = p_{\text{CM}}^2 c_{\text{eff}}^2 + M_0^2 c_{\text{eff}}^4
$$

[View →](../../../../equation-mapping.html#energy-momentum-rest-energy)

Here:
- $M_0$ is the assembly rest/internal invariant extracted at $v_{\text{CM}}=0$ in a locally homogeneous sea.
- $E_{\text{CM}}$ and $p_{\text{CM}}$ are the total center-of-mass energy and momentum measured from trajectory dynamics.
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

Equivalent parameterization:
$$
E_{\text{CM}}=\gamma_{\text{eff}} M_0 c_{\text{eff}}^2,\qquad
p_{\text{CM}}=\gamma_{\text{eff}} M_0 v_{\text{CM}},\qquad
\gamma_{\text{eff}}=\frac{1}{\sqrt{1-v_{\text{CM}}^2/c_{\text{eff}}^2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1efcb1026be589f8)

This parameterization must keep rest, motion, and null transport separate. The rest term is the exposed internal ledger $M_0c_{\text{eff}}^2$, not a velocity-dependent rest mass. Motion changes the center-of-mass readout through $\gamma_{\text{eff}}$ and $p_{\text{CM}}$, while the massless photon-channel limit is a separate null closure,
$$
E_\gamma=c_\gamma\|\mathbf{p}_\gamma\|
$$

[View →](../../../../equation-mapping.html#corpus-equation-c8abb51062ca1203)
after the photon channel and its speed record have been declared. A calculation that uses the same scalar mass-shell formula to explain a massive assembly, a moving massive assembly, and a photon without naming these three records has collapsed distinct observer-level closures into one slogan.

Consistency requirement: if this closure fails in regimes where emergent Lorentz behavior is claimed, the mass-loading and medium-response model is incomplete.

Cross-links:
- [Proper-time closure test](../spacetime/proper-time-and-time-dilation.md#effective-energy-momentum-closure-test)
- [SR mapping entry](../philosophy-history/theory-mapping.md#special-relativity-sr)

---

## Energy and Self-Hit in the Noether Sea

In the **super-field-speed** regime ($\|\mathbf V_a\|>1$ somewhere along the relevant path-history interval), architrinos and assemblies can intersect their own past isochrons (self-hit). In the presence of the Noether sea:

- On the uniform-circular chart, each canonical self-hit contribution is radially outward and therefore cannot supply centripetal support. Whether the corresponding self-hit branches provide a lower radial boundary in a Noether braid or more complex assembly depends on the complete vector balance and continuation record; it is not implied by the circular sign alone.
- Under a candidate signed wake account, energy represented in an architrino's causal wake and local Noether sea response would be partially routed back through delayed self-interaction. The exchange between internal kinetic energy and wake/medium energy is candidate bookkeeping pending an accepted signed account on the same causal-root record.

If an accepted causal action with a proved delay-compatible Noether theorem supplies both the acceleration contributions and the signed energy accounts on one provenance-complete record, then global conservation would follow and self-hit would route energy along more complex paths (architrino → causal isochron → local Noether sea → back to architrino/assembly) without net creation or loss. That action, theorem, account construction, pairwise provenance result, and boundary-flux closure remain open; until they close, self-hit routing is a candidate bookkeeping picture rather than an established conservation result.

---

## Mechanism in One Picture

Inside an assembly, large internal causal-history energy can circulate through many branch channels. Outside the assembly, distant probes couple only to the portion of that ledger that survives phase cancellation, shielding, and Noether sea response.

Architrinos, their causal histories, and their assemblies are the variables to which the energy bookkeeping is assigned. The Noether sea is proposed as a dense population of energetic Noether braid assemblies whose net long-range wake response becomes quiet when incoherent contributions cancel and shielded internal rows leak only weakly. Neither that cancellation nor the required stable Noether braid has yet been derived generally. In candidate indexed fermion source records, declared support rows may screen other rows from the ambient Noether sea. The mass and gravitational-response program must derive the residual exposure; no screening order follows from the persistent indices.

## Summary and Role in the Larger Theory

- **At the architrino level:**
  
  The Master Equation fixes acceleration but does not yet fix a unique kinetic scalar, momentum, or global potential. This chapter defines candidate energy accounts and the compatibility conditions they must satisfy. Exact global conservation remains a closure target for an accepted causal-action or causal-wake theory with proved same-record signed accounts and boundary closure. The substrate law is acceleration-first, and no particle-specific fundamental mass is assigned to architrinos. Potential availability is geometric rather than fuel-like: causal wakes are emitted as path-history structure, while work appears only when a receiver intersects active wake branches with nonzero radial power.

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
so a separator crossing that changes the effective inner wall cannot be counted once as a gauge-origin jump and again as an independent $h$-like energy quantum. At a crossing radius $r_\ast$ between ledger cells $b$ and $b'$, the physical bookkeeping must satisfy
$$
\left[E_{\text{total}}\right]_{b\to b'}
=
K^{(b)}(r_\ast)+U^{(b)}(r_\ast)
=
K^{(b')}(r_\ast)+U^{(b')}(r_\ast)+\Delta_{\text{ledger}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-90adb8aeda556212)
where $\Delta_{\text{ledger}}$ is the declared root-change energy routed through the table entries such as $\varepsilon_3$, $\varepsilon_w$, and the binary-2 adjustment. The visible step is the ledger/gauge matching term; it is not additional to that matching. Thus $U^{(b)}$ is a ledger-indexed potential, and the zero-section can jump when the active causal-root cell changes. A globally consistent energy ledger requires the $\Delta_{\text{ledger}}$ increments to glue around overlaps of ledger cells; otherwise the local potential gauges are individually consistent but the global binding-energy record is multivalued.

### Binding Energy and Total Energy

Let $B(r)$ denote the **binding energy** at radius $r$, with

$$B(r_{\min}) = B_{\max}.$$

[View →](../../../../equation-mapping.html#corpus-equation-4de56cf4b153a741)

Define

$$U(r) = B_{\max} - B(r).$$

[View →](../../../../equation-mapping.html#corpus-equation-176c8c556150fe31)

Then total energy bookkeeping is

$$E_{\text{total}} = K(r) + U(r).$$

[View →](../../../../equation-mapping.html#corpus-equation-f91f6ff9a16feefa)

The additional inequality $U(r)\ge0$ holds only if $B(r_{\min})$ is proved to be the maximum binding value on the admitted branch. At the minimum radius, the gauge identity gives

$$E_{\text{total}} = K(r_{\min}), \quad U(r_{\min}) = 0.$$

[View →](../../../../equation-mapping.html#corpus-equation-82fb0af67261acf9)

This equation is a consequence of the chosen zero, not a claim that kinetic energy is maximal. At a radial turning point the radial kinetic term is zero, while tangential or internal motion may remain. Whether motion outward converts kinetic energy into this branch-local potential must be shown by the same-record work identity.

### Effective Potential Language

If an effective potential is used, the centrifugal term and the self-hit barrier both contribute:

$$V_{\text{eff}}(r) = V(r) + \frac{L^2}{2 m_{\text{eff}} r^2} + V_{\text{self-hit}}(r).$$

[View →](../../../../equation-mapping.html#corpus-equation-d328e989dfe05eaa)

Here $m_{\text{eff}}$ is an **effective inertial scale** (a bookkeeping proxy for mass in the coarse-grained description), not a primitive architrino mass.

If an effective-potential comparison needs the same displayed zero, define the separately shifted quantity

$$\widetilde V_{\text{eff}}(r)\equiv V_{\text{eff}}(r)-V_{\text{eff}}(r_{\min}),\qquad \widetilde V_{\text{eff}}(r_{\min})=0.$$

[View →](../../../../equation-mapping.html#corpus-equation-aaaf2218ee120aa3)

This additive shift does not change the effective radial equation. It is distinct from proving that $r_{\min}$ minimizes $V_{\text{eff}}$ or that the effective-potential reduction is valid for the delayed branch.

### Self-Hit Branch Changes and Discrete Ledgers

In this picture, the self-hit region is **not** assumed to change the local acceleration law. The radial slope remains smooth:

$$\frac{dU}{dr} \text{ remains finite and continuous across the retained regularized branch chart.}$$

[View →](../../../../equation-mapping.html#corpus-equation-b1b6e0fabff8a2c3)

If this continuity condition is established, the transition between the $v=c_f$ regime and the self-hit regime is a regularized branch transition rather than a kink in the potential. The condition is not implied merely by mollifying the root selector; the complete variation and regulator limit must supply it.

> Claim grade: guessed for continuity of $dU/dr$ through the self-hit branch transition. Falsifier: a regulator-stable jump or divergence in the same-record branch-potential slope would reject the smooth-graft hypothesis.

The discrete step is a causal-root ledger effect, not an assumption that energy itself is made of independent chunks. On a fixed branch chart, the active causal intersections have an integer multiplicity: a self-hit count $N$ and an analogous partner-hit or channel count $M$. In the circular binary notation this same idea appears as the pair $(N_s,M_p)$ in [Super-Field-Speed Root Ledgers and Resonance Lock](binary-dynamics.md#super-field-speed-root-ledgers-and-resonance-lock). Within one ledger cell the underlying trajectory and $U(r)$ remain continuous. A visible $h$-like transaction occurs when a separator crossing changes the admissible integer ledger, for example by adding one grouped channel or, in the raw simple-root table, by a fold-pair jump satisfying $\Delta N\in 2\mathbb{Z}$ with $\Delta D=0$.

The mechanical event behind such a ledger change can be a caustic-grazing impulse. When a regularized branch crosses a $J=0$ caustic, the pointwise branch expression may become large while the integrated velocity change remains finite, as in [Caustic Transit and Finite Impulse](master-equation.md#caustic-transit-and-finite-impulse):
$$
\Delta\mathbf{V}_{a,n}
=
\int_{T_n^-}^{T_n^+}
\mathbf{A}_a^{(\eta)}(T)\,dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-5b0e0e63d5a78d85)
This finite impulse is a candidate substrate mechanism for changing the active causal-root ledger by a discrete amount without making primitive energy granular.

Thus a candidate discrete action transaction may be represented as geometric bookkeeping attached to a threshold crossing of the causal-root ledger. Discrete root counts do not by themselves quantize action or energy. That stronger result requires the action difference across neighboring certified ledger cells to approach a nonzero universal value while the path-history geometry, potential chart, and regulator are refined. A closed branch chart must expose the root-change energy, wake exchange, closure-channel adjustment, and any mismatch routed into unresolved modes.

The guessed bookkeeping pattern is:

- Source-record binary 3 registers a single-step transaction ($h$-like unit), meaning one minimal admissible update of its active partner and self channel ledger.
- Source-record binary 2 adjusts to conserve total energy.
- Source-record binary 1 executes a two-step shift ($2h$-like unit), i.e., two discrete ledger updates rather than one. The "step" corresponds to the system crossing a separatrix between basins of attraction in the nonlinear delay dynamics. While the underlying trajectory is continuous, the energy redistribution stabilizes only at discrete resonances (winding numbers and causal-root multiplicities), making the effective energy transfer appear quantized.

This can read as an "amplified" response, but only because source-record binary 1 is **releasing or reconfiguring retained internal energy** when the self-hit echo is engaged. It is **not** net energy creation; it is a redistribution between internal stores under a smooth $U(r)$. The assigned transaction, closure, and self-hit roles in this working record are hypotheses; the persistent indices do not carry those meanings in the taxonomy.

### Candidate Braid as Routing/Locking Circuit (Analogy)

It is useful (as a **bookkeeping analogy**) to think of this candidate braid record as a **routing/locking circuit** rather than a simple reservoir. An incoming single-step transaction ($h$-like) couples most strongly to source-record binary 3, binary 2 acts as a closure buffer that maintains overall consistency, and binary 1 can respond with a two-step reconfiguration when the self-hit echo is engaged. These provisional roles do not identify a taxonomy member. The effective response can resemble a geared or ratcheted redistribution, but the mechanism is still deterministic energy routing, not creation.

In this language, a discrete input can **lock in** a new candidate braid configuration: a threshold-triggered, history-dependent update that selects one stable branch over another. This is a **collapse-like** event in the phenomenological sense (a sudden, discrete state update), but in $\mathbb{A}\mathbb{A}\mathbb{A}$ it is treated as a **deterministic, microstate-sensitive bifurcation**, not an intrinsically stochastic collapse.

### Closed-Cycle Action Bookkeeping Table for the Sub-Field Source Record

This table records one $h$ of closed-cycle action for source-record binary 3 in the sub-field-speed regime $v_3<c_f$.

For the $h$ versus $\hbar$ convention used here, see [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md).

Assumptions for this bookkeeping pass:

- $f$ labels a discrete binary-3 orbital state (frequency index). The three rows are **pre-hit** ($f-1$), **action/transition** ($f_{\psi}$), and **post-redistribution** ($f$). There is **one** step in frequency. The $f_{\psi}$ label is a transient bookkeeping state, not a new frequency index or literal wave function.
- The transaction is a single closed-cycle action unit, $\Delta A_{\text{cycle}} = +h$, coupled first to source-record binary 3 while $v_3 < c_f$.
- The symbol $h$ labels action per full causal phase cycle. The associated radian-normalized rotational-action increment is $\hbar = h/(2\pi)$; in this local bookkeeping pass $\Delta I$ denotes that angular-momentum/action variable.
- Energy bookkeeping uses action-angle language: for a small discrete step, $\Delta E \approx \omega\,\Delta I = f\,\Delta A_{\text{cycle}}$. This is a **notation choice**, not a claim about the exact micro-law.
- Source-record binary 1 responds with a two-step reconfiguration. Binary 2 adjusts to satisfy conservation of total energy and total angular momentum (including any causal-wake exchange).

Notation in the table:

- $K_3, U_3$ = binary-3 kinetic and potential energies.
- $K_2, U_2$ = binary-2 kinetic and potential energies.
- $K_1, U_1$ = binary-1 kinetic and potential energies.
- Superscripts $(f-1)$, $(f_{\psi})$, and $(f)$ denote the state index (one-step update).

Per-step increments are defined without overloaded delta notation.

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
| $f-1$ | $K_3^{f-1}$, $U_3^{f-1}$ | $K_2^{f-1}$, $U_2^{f-1}$ | $K_1^{f-1}$, $U_1^{f-1}$ | Baseline. No pending transaction. |
| $f_{\psi}$ | $K_3^{f_{\psi}} = K_3^{f-1} + k_3$<br>$U_3^{f_{\psi}} = U_3^{f-1} + u_3$ | $K_2^{f_{\psi}} = K_2^{f-1}$<br>$U_2^{f_{\psi}} = U_2^{f-1}$ | $K_1^{f_{\psi}} = K_1^{f-1}$<br>$U_1^{f_{\psi}} = U_1^{f-1}$ | Immediate post-hit. <br>Binary 3 receives $\Delta I_3 = +\hbar$ in the initial bookkeeping gauge. <br>Binary 3 records a $(k_3,u_3)$ increment. |
| $f$ | $K_3^{f} = K_3^{f-1} + k_3$<br>$U_3^{f} = U_3^{f-1} + u_3$ | $K_2^{f} = K_2^{f-1} + k_2$<br>$U_2^{f} = U_2^{f-1} + u_2$ | $K_1^{f} = K_1^{f-1} + 2k_1$<br>$U_1^{f} = U_1^{f-1} + 2u_1$ | Post-redistribution. <br>Binary-3 update is complete at $f_{\psi}$; <br>only binaries 2 and 1 continue to settle. |

Constraints to apply across the $f-1 \to f$ transition (bookkeeping level):

- **Angular momentum / rotational action**: the sign rule is gauge-invariant only after declaring the allowed wake share:
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
  For a **net positive** transaction, the binary increments must satisfy $\Delta I_a\ge-\epsilon_w\hbar$ for $a\in\{1,2,3\}$. For a **net negative** transaction, the same bound applies with signs reversed. The nonnegative-increment claim is therefore an up-to-wake-tolerance statement, not a gauge-free statement that the wake channel carries exactly zero rotational action.
- **Energy**: $(k_3+u_3) + (k_2+u_2) + 2(k_1+u_1) = \varepsilon_3 + \varepsilon_w$. This is the explicit version of conservation using the per-step increments defined above.
- **Root-ledger closure**: the transition must move from one admissible integer causal-root ledger to another and then close consistently over the full cycle. In a raw self-root table, separator crossings obey the parity rule $\Delta N\in 2\mathbb{Z}$ and $\Delta D=0$; in a grouped channel ledger, the same event may be recorded as one newly active channel.
- **Cross-ledger gauge matching**: any jump in $r_{\min}^{(b)}$ and $B_{\max}^{(b)}$ is part of the declared $\Delta_{\text{ledger}}$ budget above. A table row may not count the same gauge-origin shift once in $U^{(b)}$ and again as an extra wake or oscillator energy.
- **Smooth-slope test**: the guessed graft requires $dU/dr$ to remain continuous; a computed kink or divergence rejects that graft.

This table makes the guessed $h$-like transaction explicit by representing it as a radian-normalized $\hbar$ rotational-action increment split into kinetic and potential parts. It does not derive the value $h$. The remaining freedom is how each binary partitions its step through the $\chi$ fractions and how binaries 2 and 1 plus the causal-wake channel redistribute the initial binary-3 coupling in this source record.

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
