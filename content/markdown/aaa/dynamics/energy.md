# Energy

In $\mathbb{A}\mathbb{A}\mathbb{A}$, energy accounting begins with moving architrinos and the causal wakes recorded by their motion. A wake is not a hidden fuel, a vacuum reservoir, or a second substance in the Euclidean void. It is the source-dependent causal-isochron record of an architrino's emissions. Motion changes the wake geometry, branch timing, and received potential; it does not turn the wake into an independent material thing.

This chapter answers four linked questions. What kinetic bookkeeping is allowed for a single architrino? How does work occur when a receiver crosses delayed causal wakes? How do assemblies hide or expose internal energy? How can Noether sea coupling make energy, inertia, and effective geometry appear at larger scales?

The chapter underwrites [Particle Masses](../assemblies/particle-masses.md), [Nested Shell Braid Dynamics](../noether-braid/braid-families.md#nested-shell-braid-dynamics), [Noether Braid](../noether-braid/noether-braid.md), [Noether Sea Pro/Anti Coupling](../spacetime/noether-sea-pro-anti-coupling.md), [Emergent Metric](../spacetime/emergent-metric.md), and the constructive delay-energy standard in [Delay Dynamics Energy](../validation/simulations/action-energy/delay-dynamics-energy.md).

All such dynamics unfold on a fixed ontological background: absolute time plus the Euclidean void. Accelerations and motion arise from **delayed causal hits from causal isochrons**, with line-of-action direction and receiver-weighted acceleration factor, on this fixed background. We work in units with causal-wake propagation speed $c_f=1$.

The chapter keeps four levels separate. At the substrate level, kinetic and potential terms are architrino and causal-wake records on absolute time and the Euclidean void. At the dynamical level, energy changes through receiver-side causal hits and radial power. At the effective level, assemblies acquire inertia, apparent energy, and effective metric response through Noether sea coupling. At the inference level, scalar masses, thermodynamic records, and cosmological inventories are accepted only after a window, boundary record, and residual are declared.

Spacetime in this framework belongs to the effective level, not the ontological one. The ambient Noether sea is built from dense populations of neutral Noether braid assemblies occupying the Euclidean void. Its energetic state and configuration control how energy, inertia, and effective geometry appear at larger scales.

---

## Kinetic Energy and Momentum of a Single Architrino

An architrino in motion possesses kinetic energy and momentum.

- **Kinetic Energy $E_k$**
  
  A scalar quantity representing the energy of motion. For a single architrino $a$ with velocity $\mathbf V_a(T)$, we write
  
  $$E_{k,a}(T) = K(s_a),\qquad s_a=\|\mathbf V_a(T)\|,$$
  
  where $s_a$ denotes the speed argument and $K$ is a strictly convex, monotonically increasing function with $K(0)=0$. If an effective saturation proxy is being used, $K'(s_a)\to\infty$ at the saturation scale; in the primitive limit, $K$ grows unboundedly. $K$ is left unspecified because mass is emergent from interactions between assemblies, especially the Noether braids in the Noether sea. Strict convexity ensures a one-to-one mapping between kinetic energy and speed magnitude. Because a free architrino has no intrinsic speed limit in the micro-model, $E_k$ is, in principle, unbounded as $\|\mathbf V_a\|\to\infty$.

- **Momentum $\mathbf{p}_a$**
  
  The vector counterpart of kinetic energy:
  
  $$\mathbf p_a(T) = P\big(\|\mathbf V_a(T)\|\big)\,\hat{\mathbf V}_a(T), \quad \hat{\mathbf V}_a = \frac{\mathbf V_a}{\|\mathbf V_a\|},$$
  
  where $P$ is a speed-dependent magnitude. Its detailed form is not postulated at the architrino level; it emerges from matching to assembly behavior.

  If this momentum is treated as the conjugate momentum for the primitive kinetic scalar and $\mathbf F=d\mathbf p/dT$ is used in the work-energy relation, then $P$ and $K$ are not independent. For arbitrary nonzero velocity and acceleration, consistency requires
  $$
  P'(s)=\frac{K'(s)}{s}=\mu_K(s),
  \qquad
  P(s)=\int_0^s\frac{K'(u)}{u}\,du
  $$
  after choosing $P(0)=0$. If this condition is not imposed, $\mathbf{p}$ should be read as a momentum-like bookkeeping vector rather than the canonical momentum of $K$.

  **Kinetic-scalar / closure compatibility.** The conjugacy relation above also prevents a hidden second speed scale. If the primitive kinetic scalar is modeled with a finite saturation scale $c_K$, meaning $K'(s)\to\infty$ as $s\to c_K^-$, then any effective assembly closure using a signal speed $c_{\text{eff}}$ is admissible on the declared comparison window only when
  $$
  \left|\frac{c_{\text{eff}}}{c_K}-1\right|\le\epsilon_{cK}
  $$
  with $\epsilon_{cK}$ declared before the comparison is promoted. If $K$ is instead kept in the primitive unbounded-speed limit, then $c_{\text{eff}}$ is wholly a Noether sea response quantity and no substrate-level particle speed cap may be invoked in the energy or mass-shell argument.
  This is the Legendre-compatibility condition for the kinetic scalar: once $K$ is chosen, the canonical radial momentum magnitude is fixed by the same generating function. A later effective mass-shell closure may introduce $c_{\text{eff}}$ only as the declared sea-response scale, or as the same finite scale already present in $K$ to the stated tolerance; it may not carry an unrelated second speed limit.

**No fundamental mass:**

In this model, there is no **particle-specific substrate mass** assigned to individual architrinos. We do **not** assume $E_k = \frac{1}{2}m\|\mathbf V\|^2$ or $\mathbf p = m \mathbf V$ at the substrate level for distinct architrino species. Instead:

- Kinetic energy and momentum are **primitive kinematic quantities** of architrinos.
- The substrate law is written in **acceleration-first** form.
- If force-like or quadratic-kinetic bookkeeping is needed, one may introduce a single universal conversion constant $\mu_{\text{arch}}$, but this is not a particle-specific inertial mass.
- "Mass" in the usual observer sense appears **only at the assembly level** as a derived property of how a large internal energy distribution responds to external forcing in the Noether sea.

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

If one introduces the optional universal bookkeeping constant $\mu_{\text{arch}}$ and defines $\mathbf F_a \equiv \mu_{\text{arch}}\mathbf A_a$, then the quadratic bookkeeping proxy $K_{\mu,a}=\frac{1}{2}\mu_{\text{arch}}\|\mathbf V_a\|^2$ satisfies

$$
\frac{dK_{\mu,a}}{dT} = \mathbf F_a(T)\cdot\mathbf V_a(T)
$$

Here $\mathbf{F}_a$ is the optional force-like bookkeeping quantity associated with the net acceleration from all causal hits; it is not a particle-specific substrate mass law.

From the canonical per-hit law

$$
\mathbf A_{o'\leftarrow j}(T;T_t)
=
\kappa\,\sigma_{q_j q_{o'}}\,
\frac{|q_j q_{o'}|}{r_{o'j}^2}
W_{o'j}^{\mathrm{acc}}(T;T_t)\,\hat{\mathbf{r}}_{o'j}
$$

where
$$
D_{t,o'j}(T;T_t)
\equiv
c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf{r}}_{o'j},
\qquad
D_{r,o'j}(T;T_t)
\equiv
c_f-\mathbf V_{o'}(T)\cdot\hat{\mathbf{r}}_{o'j},
\qquad
W_{o'j}^{\mathrm{acc}}(T;T_t)
\equiv
\left|
\frac{D_{r,o'j}(T;T_t)}
{D_{t,o'j}(T;T_t)}
\right|
$$
is the receiver-weighted acceleration factor. Here $r_{o'j}$ and $\hat{\mathbf r}_{o'j}$ are evaluated on the same retained causal branch. The transmitter-side factor $D_t$
is the causal-root transversality diagnostic; the numerator $D_r$ records how
the receiver cuts through the emitted causal wake sequence.

Decompose the receiver's velocity into radial and transverse components:

$$\mathbf V_{o'} = V_r \hat{\mathbf{r}}_{o'j} + \mathbf V_\perp, \quad V_r=\mathbf V_{o'}\cdot\hat{\mathbf{r}}_{o'j}.$$

Because $\mathbf A_{o'\leftarrow j}\parallel\hat{\mathbf{r}}_{o'j}$:

- The **instantaneous work rate** from this hit is
  
  $$
  \frac{dK_\mu}{dT}\bigg|_{\text{hit}}
  =
  \mu_{\text{arch}}\mathbf A_{o'\leftarrow j}\cdot\mathbf V_{o'}
  =
  \mu_{\text{arch}}\kappa\,\sigma_{q_j q_{o'}}\,|q_j q_{o'}|
  \frac{W_{o'j}^{\mathrm{acc}}(T;T_t)}{r_{o'j}^2}\,V_r
  $$

  Only $V_r$ contributes to instantaneous quadratic-proxy power. For the primitive scalar $K$, replace $\mu_{\text{arch}}$ by $\mu_K(\|\mathbf V_{o'}\|)$.

- A hit only changes the **along-the-line** component of velocity; sideways motion $\mathbf V_\perp$ is unchanged instantaneously.

---

## Potential Energy and Causal-Wake Potential

Potential energy arises from the interaction of an architrino with the **net causal-wake potential** generated by all architrinos, including in some regimes its own past emissions.

### Net Causal-Wake Potential

At a point $\mathbf X$ and time $T$, the net potential is the **superposition** of contributions from all sources:

$$\Phi_{\text{net}}(\mathbf X,T) = \sum_o \Phi_o(\mathbf X,T).$$

Each $\Phi_o$ is built from the expanding causal isochrons emitted by source $o$, using the measure-valued or mollified emission density described in the architrino section. In the mollified representation with causal-surface width $\eta>0$, $\Phi_{\text{net}}$ is a smooth function of $(\mathbf X,T)$; in the ideal limit $\eta\to 0$ it becomes a measure-valued distribution supported on causal isochrons.

### Potential Availability Is Geometric

The phrase "an architrino emits potential" should not be read as a transmitter continually spending an internal fuel. The emission is the causal-wake geometry of the architrino itself: at each emission time, an expanding causal isochron is added to the transmitter's path history. That causal structure can later participate in work, but it is not a material energy substance stored inside the Euclidean void.

Potential energy is therefore relational. It is assigned when a receiver is placed in a transmitter's path-history causal-wake record and its trajectory intersects the relevant causal wake surfaces. The receiver's energy accounting depends on the active causal roots, their inverse-square distance factors, their polarity signs, the transmitter-side root denominator, the receiver-weighted acceleration factor, and the receiver's radial motion through the line of action. In the general per-hit law the transmitter-side factor is

$$
D_{t,o'j}(T;T_t)
=
c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf{r}}_{o'j}
$$

and the receiver-side factor is

$$
D_{r,o'j}(T;T_t)
=
c_f-\mathbf V_{o'}(T)\cdot\hat{\mathbf{r}}_{o'j}.
$$

The branch strength is $W^{\mathrm{acc}}=\lvert D_r/D_t\rvert$, while the instantaneous power delivered to the receiver is controlled by

$$
\mathbf A_{o'\leftarrow j}\cdot\mathbf V_{o'}
=
\|\mathbf A_{o'\leftarrow j}\|\,V_r
$$

On an affine partner chart, the transmitter-side factor and receiver-side factor must both be tracked. The simple branch expression $J_p=1+(dX/dT)/c_f$ is only a transmitter-side topology expression unless the receiver-side factor is also present on the same chart.

Thus the potential to do work is broadly available wherever causal wakes pass, but work is realized only through an actual receiver trajectory. A quiet region is not a region with no causal activity; it is a region where the active wake contributions sum to negligible net acceleration and negligible net power for the assemblies present there.

### Potential Energy

For a receiver architrino $o'$ with polarity $q_{o'}$ at position $\mathbf X_{o'}(T)$, the potential energy $U_{o'}(T)$ is the fixed-history bookkeeping value assigned to the current configuration against the causal path-history wake record:

$$U_{o'}(T) = q_{o'}\,\Phi_{\text{net}}[\text{history}]\big(\mathbf X_{o'}(T),T\big).$$

The sign of $\Phi_{\text{net}}$ is not a sign on total energy. A negative causal-wake potential contribution from an electrino source is a polarity-signed interaction record; it becomes energy bookkeeping only after the receiver polarity, active causal root, line-of-action geometry, transmitter-side factor, receiver-weighted acceleration factor, and receiver radial motion are specified. Work can therefore occur relative to a negative potential without introducing a negative-energy substance or a negative total-energy reservoir.

Unlike electrostatics, $\Phi_{\text{net}}$ is not a function of instantaneous source positions but a functional of their past worldlines intercepted by the backward causal-wake record of $\mathbf X_{o'}(T)$. The gradient $\nabla\Phi_{\text{net}}$ is taken with respect to the receiver's spatial coordinates on the fixed background, holding the causal history fixed. In the idealized picture, $\Phi$ is a distribution supported on causal isochrons, not a smooth continuum field.

When we work with the mollified effective potential $\Phi_\eta$, we can also write the fixed-history, force-like relation:

$$\mathbf F_{o'}(T) = -\nabla_{\mathbf X_{o'}}U_{o'}(T) = -q_{o'} \nabla_{\mathbf X_{o'}} \Phi_\eta[\text{history}]\big(\mathbf X_{o'}(T),T\big),$$

and this is equivalent to the Master Equation in the quasi-static, resolved-in-time limit after the same force normalization, such as $\mathbf F_{o'}=\mu_{\text{arch}}\mathbf A_{o'}$ or the appropriate $\mu_K\mathbf A_{o'}$, has been declared.
The force-as-gradient identity is valid only when taking the gradient at fixed causal history; the fundamental acceleration law remains the per-hit sum of the Master EOM.

### Macroscopic Cancellation and Localized Resonance

Constant causal emission by many architrinos does not imply a large random macroscopic force. The net causal-wake potential is a superposition, and in a large, incoherent population the leading gradients arrive with many signs, distances, phases, and line-of-action directions. For a receiver sampling such a population, macroscopic quietness is a two-moment condition, not only a mean-zero statement:

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

Both bounds must use the same horizon, screening, and summation prescription that makes the many-source wake sum converge. The variance bound is the load-bearing part: incoherent fluctuation must remain small compared with the coherent bound-state gradient that phase-locked assemblies preserve. This cancellation is one reason the Noether sea can be densely active while remaining macroscopically quiet. What standard prose may call a vacuum state is not empty Euclidean void; it is the effective limit in which the local Noether sea assemblies and their causal wakes balance so well that only small residual gradients remain available to ordinary probes.

Mean-zero wake potential is therefore not zero total energy. A statistically neutral $50/50$ electrino/positrino inventory can make the large-scale potential gradient and received power nearly vanish while still carrying kinetic energy, local correlated interaction energy, retained wake-history content, and Noether sea organization. The conserved quantity for an isolated exact trajectory is the history-aware total ledger, not "initial kinetic energy plus a naive instantaneous potential" evaluated after the wake record has been discarded.

For energy accounting, cancellation is applied only after transmitter identity, polarity, emission time, active causal root, branch Jacobian, line-of-action geometry, and receiver radial power have been retained. A net-zero scalar potential channel is therefore a projection of a richer transmitter-tagged ledger, not proof that no wake-history energy, internal branch energy, or coherent work opportunity remains available to a receiver whose branch resolves the contributing rows.

Phase-locked bound states are the important exception. In a localized assembly, nearby constituents do not sample random phases; their active causal roots are correlated, and the $1/r^2$ distance factor lets the nearest coherent branches dominate over the far incoherent background. A collinear breather, for example, is precisely a reduced setting in which two opposite-polarity architrinos can form a localized, non-canceling causal resonance: instead of averaging away, the partner-hit and self-hit branches stay phase organized enough to exchange kinetic and potential energy across a bounded cycle.

---

## Energy Conservation and Exchange

In the exact causal theory, energy conservation is enforced through exchange between kinetic motion and the causal-history interaction content encoded by wakes. This wake term should not be read as an independent material reservoir that drains from the emitter with every unreceived isochron; it is the nonlocal bookkeeping required by the same delayed causal action that generates the hits. For mollified working models, the strongest exact conservation claims remain conditional on the regularization being derived from the same time-translation-invariant causal action rather than inserted only at the equation-of-motion level.

Classical virial language is recovered only at branch level. The familiar comparison form $\langle 2K-pU\rangle=0$ is admissible after a retained branch chart supplies a branch-local potential, homogeneity degree, and proof that the same acceleration contribution used by the Master EOM is generated by that potential over the declared window. Standard mechanics often writes $T$ for kinetic energy in this formula; here $K$ avoids collision with absolute time $T$. Until those rows close, virial behavior remains a diagnostic on the causal-root ledger rather than a primitive substrate axiom; see the branch-virial target in [Analytic Baselines](../validation/simulations/action-energy/analytic-baselines.md#analytic-baselines).

For a single architrino:

$$\Delta E_k = \int \mathbf F\cdot d\mathbf X = -\Delta U$$

(when we restrict attention to its interactions with a fixed set of sources). For an **isolated system** of architrinos and their wakes, the total energy is:

$$E_{\text{total}} = \sum_a E_{k,a} + U_{\text{int}} + E_{\text{wake}},$$

and is constant in time for exact isolated solutions of the causal action. In mollified working models, this same bookkeeping should be treated as exact only when the mollified kernel inherits that action-level time-translation symmetry; otherwise it remains the natural candidate history functional to monitor, but not yet an established exact invariant.

- $U_{\text{int}}$ is an optional effective decomposition of near-field interaction energy.
- $E_{\text{wake}}$ accounts for the exact nonlocal interaction content carried by wake structures and any radiation-like transport through the Noether sea.

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

This global target requires the total energy on the constant-$T$ leaf to be finite or convergently summable. For an unbounded or observationally truncated cosmology, the safe conservation statement is local continuity,

$$
\partial_T\rho_E+\nabla_{\mathbf X}\cdot\mathbf S_E=0
$$

tested through finite windows and boundary fluxes. In the pure transparent-path limit, after source, recoil, remnant, and boundary terms have been separated, a bundle redshifted by $1+z$ carries the deficit

$$
\Delta E_{\gamma}
=
E_{\mathrm{emit}}-E_{\mathrm{obs}}
=
E_{\mathrm{emit}}\frac{z}{1+z},
\qquad
\Delta E_{\gamma}
+\Delta E_{\mathrm{sea,path}}
=0
$$

If the Noether sea update needed to close this row is nonlocal, re-radiating, path-history inconsistent, or incompatible with image sharpness and CMB blackbody preservation, the fixed-void redshift branch has failed the energy ledger rather than solved cosmological redshift.

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
with $\varepsilon_E > 0$ a declared denominator floor. A retained $U_{\text{int}}+E_{\text{wake}}$ decomposition is admissible only when $\mathcal{R}_{\mathrm{dbl},W}\to0$ under refinement of the same window, boundary record, and regularized causal action.

### Conservation Status

The conservation claim is a level-specific statement. For an isolated branch whose acceleration law comes from a time-translation-invariant causal action,

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

This is not a claim that $\sum_a E_{k,a}$ is constant on $\Sigma_T$, nor that a finite simulation window conserves its particle-only ledger. Delayed hits move energy between mechanical motion and causal-wake history, and finite windows must also name boundary flux, external work, and residuals. A calculation that omits one of those terms has not established energy nonconservation; it has exposed an incomplete retained record.

In working models the exact claim is conditional. If the mollifier, history window, self-branch cutoff, or characteristic-tail repair is inserted only at the equation-of-motion level, then the same expression is a diagnostic to monitor, not a proved Noether charge. Exact conservation is promoted only when the same regularized action supplies both the acceleration contribution and the energy row, and when the energy residual in this section vanishes under refinement. The formal construction routes, crosswalk residual, and promotion conditions for $E_{\text{wake}}$ are isolated in [Delay Dynamics Energy](../validation/simulations/action-energy/delay-dynamics-energy.md).

The finite-$\eta$ pathology theorem target in [Master Equation](./master-equation.md#finite-eta-pathology-quarantine-theorem-target) uses this conservation status in a restricted way. The no-runaway conclusion is available only when the action-derived $E_{\text{wake}}^{(\eta)}$, or a compatible realized-trajectory reconstruction, has a declared lower bound on the same admissible branch chart. If the lower bound is absent, the run is not promoted as a closed solution; it is routed to the continuation boundary where collapse, missing wake-history bookkeeping, regulator dependence, or endpoint leakage must be resolved.

For reaction or radiation events, energy can leave the source assembly as photon output, recoil, medium excitation, remnant excitation, wake-carried exchange, or handoff terms, but those are named outputs rather than hidden losses. The event-level version is the componentwise ledger closure in [Reaction Ledger](../validation/reaction-ledger.md#residual-routing-event-ledger-contract).

### Wake Escapement

This is a boundary-accounting idea, not a new energy reservoir. If a wake leaves the chosen local window before any retained receiver crosses it, the local work ledger cannot spend that wake internally. The accounting must therefore mark it as escaped flux, recoil, boundary exchange, or another declared handoff rather than hiding it inside the local assembly.

For a finite local window $W\subset\Sigma_T$, **wake escapement** is the subset of emitted causal isochrons that exit the retained window without intersecting any retained receiver inside that window. More explicitly, if architrino $a$ emits at $T_t$, define the causal isochron at later time $T$ by

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
The emitted isochron belongs to the escapement set $\mathcal{E}_{\mathrm{esc}}(W)$ when it has a first retained boundary crossing
$$
C_a(T_{\partial W};T_t)\cap\partial W\ne\varnothing
$$
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
Here $\mathbf{J}_E$ is the boundary flux of causal-wake energy bookkeeping, including any wake escapement through $\partial W$; $P_{\mathrm{ext},W}$ is declared external work through sources or controls not included in $W$; and $\mathcal{R}_E$ records mollifier, timestep, and omitted-boundary-history error. A finite-window conservation claim is mature only when $\mathcal{R}_E\to0$ under the same regularized causal action used for the local equation of motion.

The characteristic-tail repair target in [Master Equation](./master-equation.md#exact-nonlocal-lagrangian) inherits this same rule. If the outgoing tail kernel $K_{\mathrm{ct},+}^{(\eta)}$ is used, its endpoint contribution may be counted as a Noether wake-history boundary flux only when the endpoint is characteristic, or when it is a declared fixed history boundary whose leakage residual vanishes:
$$
\mathcal{B}_{E,+}^{(\eta)}
\sim
\frac{D_{ij}R_{+}}{c_fR_{+}}\,
\delta_\eta'\!\left(u-\frac{R_{+}}{c_f}\right)
\longrightarrow 0
$$
on the retained branch chart. If $D_{ij}R_{+}\ne0$ and this residual does not vanish, the endpoint is an interior Euler source rather than a conservation-boundary term. In that case the characteristic-tail action changes the accepted branch acceleration and cannot be used to close exact energy conservation for the canonical Master EOM.

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
For a declared origin $\mathbf X_0$, the corresponding angular-momentum history functional has the schematic form
$$
\mathbf{L}_W(T)
=
\sum_{a:\mathbf X_a(T)\in W}
\big(\mathbf X_a(T)-\mathbf X_0\big)\times\mathbf p_a(T)
+
\mathbf{L}_{\mathrm{wake},W}(T)
$$
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
where $G_{\mathrm{eff}}^{\mathrm{bind}}$ is the value used in the inventory comparison and $G_{\mathrm{eff}}^{(\zeta,\mathcal{M})}$ is the value derived from shielding, exposed response, and the Noether sea response tensor. Until $\mathcal{R}_{G\text{-consist},W}$ is reported on the same window, the cosmological binding line is comparison bookkeeping only, not a derived inventory contribution. This keeps gravitational binding from being used as an adjustable bookkeeping sign that can repair the cosmic energy inventory without specifying the same window, boundary wake history, and effective $G_{\mathrm{eff}}$ used by the rest of the cosmology branch.
The stronger same-record requirement is that $G_{\mathrm{eff}}^{(\zeta,\mathcal{M})}$, the response-speed tensor that supplies $c_{\text{eff}}$, and the ruler/metric response consumed by the effective geometry chapter all be read from one Noether sea response record. If those quantities require separate sea records or separately tuned response tensors, the gravity, clock, and ruler sectors have been fitted independently rather than derived from one exposed-energy and medium-response ledger.

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
whenever the denominator is positive and the window contains the exposed assembly record on the native slice $\Sigma_T$. The tensor $M_A^{ij}$ must then reduce to the independently extracted response tensor $\mathsf{I}_A^{ij}$ on the same branch chart. Only when these independently defined objects satisfy the balance with $\mathcal{R}_{\mathrm{resp}}^i\to0$ does it reduce to the familiar center-of-mass form. A non-vanishing irreducible residual means the exposed-energy center is not the inertial response center for that branch, rather than a license to redefine the center. Until that theorem is closed, a center-of-mass trajectory is an effective readout of the assembly response, not a substrate-level proof that internal delayed forces cancel instantaneously.
Equivalently, $\mathbf{X}_{\mathrm{resp}}$ and the inertial-response center are two different moment maps on the same retained assembly record: one weights exposed internal energy, while the other is inferred from momentum response. Their coincidence is a theorem target, not a definition. The obstruction is the finite-window wake-momentum flux across $\partial W_A$; if that boundary record has a secular or nonrecurrent component, the two centers can differ even when the equal-time particle picture looks nearly balanced. This is the center-of-response version of the memory-boundary recurrence condition used by the effective-Lagrangian symplectic-promotion row.

In practice, finite systems or simulation domains should monitor $E_W(T)$, $P_W^i(T)$, and $L_W^i(T)$ together with their boundary fluxes and residuals. $E_{\text{total}}(T)$ is the isolated-system limit when the declared window contains the full wake-history record and the boundary terms vanish.

---

## Entropy, Free Energy, and Coarse Residuals

Entropy and free-energy language belongs to coarse-grained records, not to empty Euclidean void. It is useful when a simulation or continuum reduction groups many microhistories into the same retained macrostate. For a declared coarse map $\mathcal Q:S(T)\mapsto z$ with cell probabilities $p_\alpha$ over the retained histories, the entropy diagnostic is
$$
S_{\mathcal Q}
=
-k_B\sum_{\alpha}p_\alpha\log p_\alpha
$$
When a temperature-like channel $T_{\mathcal Q}$ is declared by the same record, the Helmholtz-style free-energy diagnostic is
$$
F_{\mathcal Q}
=
E_{\mathcal Q}
-
T_{\mathcal Q}S_{\mathcal Q}
$$
This is not an added thermodynamic postulate. It is a test that the chosen coarse variables have retained enough state counting to make relaxation and response claims reproducible.

The distinction matters because energy conservation does not by itself measure work availability. Two records with the same total energy can have different free-energy diagnostics when one retains a concentrated heat, chemical, photon-channel, or potential-gradient channel and the other has dispersed the same energy into unresolved thermal, boundary, or wake-history records. A finite-window calculation must therefore close the energy ledger and the entropy ledger on the same retained record before claiming that energy remained useful, became waste heat, or crossed the boundary as low-grade radiation.

For an isolated finite window, the minimum coarse thermodynamic gate is the same-record entropy-production residual
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
where $[x]_+=\max(x,0)$ and $\mathcal D_{\mathcal Q}$ is the declared coherent-to-incoherent transfer rate, including viscous, thermal, wake-boundary, or Noether sea response channels retained by the packet. Passing this gate means only that the selected coarse record has not made entropy decrease after unresolved boundary leakage is accounted for. It does not prove a fundamental stochastic substrate.

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
If this sea-temperature admissibility check fails, the packet may report the dissipative response $\chi_{AB}''$ alone, but it may not use an equilibrium fluctuation-dissipation map as closure evidence. If an observable $O_A$ has response kernel $\chi_{AB}(\omega)$ to a controlled source coupled to $O_B$, the causal-response check is that the dissipative part and the equilibrium fluctuation spectrum $S_{AB}(\omega)$ obey a declared classical or quantum fluctuation-dissipation row. A dimensionless packet residual can be written as
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
Here $\mathcal F_T$ is the packet's chosen fluctuation-dissipation map, and $\chi_{AB}''$ is the imaginary, dissipative response. A passing value supports the coarse response chart; a failing value means the noise, dissipation, and energy ledger have been fitted separately.

---

## Noether Sea, Effective Spacetime, and Energy Storage

At the fundamental level, the Euclidean void is an empty container. **Effective spacetime** is the observer-level summary of a **sea of high-energy Noether braid assemblies**:

- These Noether braids are extremely small compared to ordinary particles (electrons, protons, etc.).
- Each Noether braid is itself a tightly bound architrino assembly with very high internal kinetic and potential energy; the nested shell braid is the best-developed three-band subtype, not the definition of the sea.
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

For composite systems such as Standard Model particles, nuclei, and composite bound states formed from architrinos and embedded in the Noether sea, we distinguish:

- **Total internal energy**: energy retained by the assembly and by its immediate Noether braid environment,
- **Apparent energy**: what leaks out as a long-range wake signature and governs how the assembly interacts with the outside world.

### Internal Energy of an Assembly

For an assembly $A$ (e.g., Noether braid or higher structure), let $i\in A$ run over its constituent architrinos. Then:

$$E_{\text{internal}}(A) = \sum_{i\in A} E_{k,i} + \frac{1}{2} \sum_{\substack{i,j\in A \\ i\neq j}} U_{ij} + E_{\text{coupling to sea}}(A),$$

where:

- $E_{k,i}$ is the kinetic energy of architrino $i$,
- $U_{ij}$ is mutual potential energy of pair $(i,j)$,
- $E_{\text{coupling to sea}}$ accounts for how the assembly deforms and polarizes the surrounding Noether sea, that is, the local Noether sea environment (or in bridge prose, the local spacetime medium).

This internal energy can be **very large**: accepted high-energy branches may retain Planck-scale or higher internal energy, even when the assembly appears externally as a low-mass effective particle.

### Apparent Energy and Shielding

The surrounding Noether sea, and the arrangement of positive- and negative-polarity architrinos inside an assembly, can **shield** internal energy from the external world through:

- **Polarity cancellation**: positive- and negative-polarity architrinos within the assembly (and in surrounding Noether braids) emit wakes that interfere destructively at larger distances.
- **Phase-structured far-field cancellation**: the geometry of internal orbits and Noether braid polarization patterns generates cancellation of most multipoles at scales $r \gg$ assembly size.
- **Nested shielding**: in multi-tier fermion braid scaffolds, outer support tiers partially screen the deeper tiers from the surrounding sea. Generation shifts can therefore be read as loss of shielding tiers, not only as loss of constituent count.

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

evaluated in a regime where the assembly appears as an effective point source. Here $\Pi_0$ extracts the monopole/isotropic component of the far-field wake ledger and $\mathcal{L}_{\text{aniso}}$ retains anisotropic leakage instead of hiding it inside a scalar error term. For a strongly shielded, neutral Noether braid in the Noether sea, we expect $\zeta\ll 1$.
Operationally, extract $\zeta(A)$ from a far-field fit of $\Phi_{\text{net}}$ (or hit amplitude) at $r \gg \text{size}(A)$: $\zeta \equiv A_{\text{measured}}/A_{\text{naive}}$, the ratio of the leading $1/r^2$ (or multipole) coefficient to the naive constituent sum, with anisotropic residuals reported separately.
The scalar shielding summary is admissible only when anisotropic leakage is small enough for the comparison being made, for example
$$
\frac{\|\mathcal{L}_{\text{aniso}}(A_0)\|}
{\|\mathcal{L}_{\text{naive}}(A_0)\|}
\le
\epsilon_{\text{aniso}}
$$
with $\epsilon_{\text{aniso}}$ declared before the branch is promoted to a scalar mass-facing result.

The scalar apparent-energy proxy that influences other assemblies at large distances is then:

$$E_{\text{apparent}}(A) \sim \zeta(A)\,E_{\text{internal}}(A),$$

This is a roadmap relation, not a substrate identity; proportionality constants must be fixed by matching to effective low-energy theory (e.g. mapping to $mc^2$).

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
The mass map couples distant probes to $E_{\text{probe}}$ through the retuned Noether sea; the matter-to-sea source uses $E_{\text{sea-coupled}}$. A calculation that uses the raw $\zeta E_{\text{internal}}$ in both roles must report $\mathcal R_{\text{part}}$ as unresolved rather than treating the two uses as independent evidence.
This is an exactness condition on one forgetting map. The full internal ledger is first projected to the exposed ledger $\zeta E_{\text{internal}}$, and the probe, sea-coupled, and unresolved channels are further projections of that same exposed ledger. The residual $\mathcal R_{\text{part}}$ measures whether those fibers close back to the once-projected total; it is therefore an anti-double-count rule, not an optional accounting convention.

Define the probe-channel share
$$
\zeta_{\text{probe}}(A)
\equiv
\frac{E_{\text{probe}}(A)}{E_{\text{internal}}(A)}
$$
when $E_{\text{internal}}(A)>0$. The raw far-field scalar $\zeta(A)$ names the total exposed ledger before the probe, sea-coupled, and unresolved split. The probe-channel scalar $\zeta_{\text{probe}}(A)$ names only the trace part consumed by the inertial probe formulas below.

---

## Emergent Inertia (Mass) from Shielded Energy

**Inertia** is not fundamental; it is the externally exposed response of an assembly's closed internal causal-history ledger, shielding factor, and Noether sea coupling to changes in bulk motion.

### Operational Definition of Inertial Mass

For an assembly $A$, define its inertial mass $m_{\text{inertial}}(A)$ operationally via:

- Apply a small external wake potential (from a distant test source) that exerts a known net force $\mathbf{F}_{\text{ext}}$ on $A$,
- Measure the resulting acceleration of the response center; in regimes where the effective center-of-mass readout has been justified, denote this acceleration by $\mathbf A_{\text{cm}}$,
- Define:

$$m_{\text{inertial}}(A) \equiv \frac{\|\mathbf F_{\text{ext}}\|}{\|\mathbf A_{\text{cm}}\|}.$$

Because the external wake couples mainly to the probe-facing exposed energy, not the full internal circulation, the scalar roadmap limit is:

$$m_{\text{inertial}}(A) \approx \alpha_{\mathrm{m}}\,\frac{E_{\text{probe}}(A)}{c_{\text{eff}}^2}.$$

The tensor handoff is more precise. In the formulas below, $\mathcal{Z}_A^{ab}$ is the probe-channel exposure tensor after the exposed-energy partition has been declared; the sea-coupled channel enters through $S_{\mathrm{mat}\to\mathrm{sea}}^{(\ell)}$ and the resulting Noether sea response, not as a second direct inertial source. For a small center-of-mass velocity $V_{\text{cm},b}$ through a declared Noether sea response record,
$$
p_{\text{int}}^{a}
\approx
\alpha_{\mathrm{m}}\,\zeta_{\text{probe}}(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}\,
V_{\text{cm},b}
$$
with homogeneous isotropic limit
$$
\mathcal{M}_{\text{sea}}^{ab}\to \frac{h^{ab}}{c_{\text{eff}}^2}
$$
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

Only in the homogeneous isotropic limit does the scalar mass formula above follow. The trace formula gives a stricter diagnostic: pure exposure anisotropy does not shift scalar mass in an isotropic medium, and pure trace-free medium response does not shift scalar mass for scalar exposure. A scalar mass shift from anisotropy appears only through the contraction $\mathcal{Z}_{\mathrm{tf},ab}\delta\mathcal{M}_{\mathrm{tf}}^{ab}$; otherwise the residue remains directional inertia in $\mathsf{I}_{A}^{ab}$. Here $E_{\text{internal}}$ names the large internal energy circulation, while $\zeta_{\text{probe}}(A)$ names the probe-facing share of the small external leakage that survives cancellation and Noether sea shielding. The formula therefore explains weak long-range gravitational and inertial footprints without making the internal energy small: ordinary probes couple to the leaked pattern, not to every internal exchange branch.
The trace-free exposure tensor is also the mass-side carrier of orientation and framing leakage. Clock-orientation leakage, Hughes-Drever-style matter anisotropy, and scalar-mass anisotropy should therefore be compared as different contractions of the same branch-emitted trace-free exposure record against different probe or medium-response tensors. If $\mathcal{Z}_{\mathrm{tf}}^{ab}=0$ for an accepted branch in a homogeneous response record, all of these trace-free leakage channels vanish at this order; if it is nonzero, scalar mass remains protected only when the retained medium response has no matching trace-free component.

This scalar trace is admissible as a positive inertial mass only inside the shielding window
$$
\zeta_{\text{probe}}(A)(1+\delta\mathcal{M}_{0})
>
\frac{1}{3}
\left|
\mathcal{Z}_{\mathrm{tf},ab}(A)\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right|
$$
with the comparison sea state declared. If a certified $A_0$ branch reports $\zeta_{\text{probe}}$ so small that this inequality fails for plausible $\delta\mathcal{M}_{\mathrm{tf}}^{ab}$ in the accepted environment, the shielded-energy mass map is falsified for that branch. Thus deep probe-channel shielding is a constrained exposure window, not an unconstrained way to suppress all long-range response.
When $1+\delta\mathcal{M}_{0}>0$, a conservative sufficient lower bound is
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
on branches that pass the positivity gate above. For any pair $A,A'$ in the mass-map test set, require
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
with $\epsilon_{\alpha}$ declared before promotion. If this residual cannot be held small without per-species tuning, the universality claim fails and the parameter count must be raised explicitly.
On a connected family of realized assembly branches, this is a flatness condition for $\alpha_{\mathrm{m}}$ over the retained moduli. An irreducible jump in the back-solved $\alpha_{\mathrm{m}}$ across different assembly topological charge sectors would not be hidden inside the same symbol; it would mark either a disconnected mass-map family or a failed universality claim for the compared species.

Thermodynamic or entropic derivations of gravitational force are therefore comparison benchmarks for this chapter, not replacements for the mass mechanism. They may sharpen the observer-level equation-of-state target for gravity, but $m_{\text{inertial}}(A)$ is not closed until the same assembly ledger supplies its closed internal causal-history record, shielding extraction, Noether sea response tensor, and acceleration response.

The immediate hand-off is the $A_0$ reference attractor gate. The energy chapter owns the internal-energy and apparent-energy definitions that $A_0$ must report: layer energies, interaction and wake terms, total $E_{\text{internal}}(A_0)$, far-field wake coefficients, $E_{\text{probe}}(A_0)$, $E_{\text{sea-coupled}}(A_0)$, and $\mathcal R_{\text{part}}(A_0)$. Those outputs are still closure targets until a stable branch, shielding extraction, and response tensor are computed. Compact finite-coordinate no-go records and branch-chart checker results cannot be consumed as energy-accounting inputs: a rejection blocks the chart path, and a clearance authorizes only a rerun candidate until Tier 2 shielding exists on an accepted branch.

The multi-scale status of $A_0$ matters for this accounting. Fast internal corrections should not be removed until they are classified. Nonresonant inner-layer motion may average out of the leading apparent-energy fit, but corrections that change self-hit counts, the branch Jacobian near $c_f$, or the leakage tensor can change $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, or both. Apparent energy is therefore downstream of closure and stability, not an input used to force a convenient branch.

---

### Noether Sea and Effective Relativistic Behavior

The Noether sea adds an additional layer:

- Moving assemblies must retune their internal causal ledger and reorganize local Noether sea coupling.
- The effective resistance to high center-of-mass speed (near the relevant internal Noether braid causal-wake propagation scale) increases steeply, producing an emergent saturation speed scale $c_{\text{eff}}$ at which assemblies effectively saturate. Its identification with the photon-channel speed is a separate closure.

Thus:

- At low center-of-mass speeds $v_{\text{CM}}\ll c_{\text{eff}}$, the effective readout recovers $E_k \approx \frac{1}{2}m_{\text{inertial}} v_{\text{CM}}^2$ for assemblies.
- At high center-of-mass speeds approaching $c_{\text{eff}}$, internal coupling to the Noether sea and self-hit effects yield a relativistic-like $E_k \sim m_{\text{inertial}}c_{\text{eff}}^2(\gamma_{\text{eff}}-1)$, with $\gamma_{\text{eff}} = 1/\sqrt{1-v_{\text{CM}}^2/c_{\text{eff}}^2}$, as an **effective law**.
- Near $c_{\text{eff}}$, axial architrino stripping and oblation are failure channels or branch-transition hypotheses to test, not assumed parts of the mass mechanism.

The details of this emergent relativistic law arise from the combined dynamics of the assembly and the Noether sea; they are not postulated but must be confirmed by coefficient extraction, simulation, and matching to known particle kinematics. Ordinary dissipative drag is a failure channel for this program, not the mass mechanism. The mass-side integration and quantitative derivation path is tracked in [Particle Masses](../assemblies/particle-masses.md).

---

## Effective Energy-Momentum Closure

For assembly center-of-mass motion in the Lorentz-suppressed regime, impose the relativistic mass-shell relation as an **effective closure test** (not a substrate postulate):

$$
E_{\text{CM}}^2 = p_{\text{CM}}^2 c_{\text{eff}}^2 + M_0^2 c_{\text{eff}}^4
$$

Here:
- $M_0$ is the assembly rest/internal invariant extracted at $v_{\text{CM}}=0$ in a locally homogeneous sea.
- $E_{\text{CM}}$ and $p_{\text{CM}}$ are the total center-of-mass energy and momentum measured from trajectory dynamics.
- $c_{\text{eff}}$ is the isotropic projection of the local Noether sea response-speed record; in weak-field homogeneous and neutral conditions that also pass the two-moment quietness condition above, $c_{\text{eff}}\to c_f$.

More precisely, the response-speed tensor may be written schematically as
$$
\left(c_{\text{eff}}^2\right)^{ab}
=
c_f^2
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
The scalar mass-shell closure is admissible only when the anisotropic propagation correction is bounded,
$$
\left\|\delta c_{\mathrm{tf}}\right\|
\le
\epsilon_{c,\mathrm{tf}}
$$
on the same comparison window. The scalar offset $\delta c_0\to0$ is not assumed by isotropy language alone; it must follow from the same homogeneous neutral summation and screening conditions that make the Noether sea macroscopically quiet.

Equivalent parameterization:
$$
E_{\text{CM}}=\gamma_{\text{eff}} M_0 c_{\text{eff}}^2,\qquad
p_{\text{CM}}=\gamma_{\text{eff}} M_0 v_{\text{CM}},\qquad
\gamma_{\text{eff}}=\frac{1}{\sqrt{1-v_{\text{CM}}^2/c_{\text{eff}}^2}}
$$

This parameterization must keep rest, motion, and null transport separate. The rest term is the exposed internal ledger $M_0c_{\text{eff}}^2$, not a velocity-dependent rest mass. Motion changes the center-of-mass readout through $\gamma_{\text{eff}}$ and $p_{\text{CM}}$, while the massless photon-channel limit is a separate null closure,
$$
E_\gamma=c_\gamma\|\mathbf{p}_\gamma\|
$$
after the photon channel and its speed record have been declared. A calculation that uses the same scalar mass-shell formula to explain a massive assembly, a moving massive assembly, and a photon without naming these three records has collapsed distinct observer-level closures into one slogan.

Consistency requirement: if this closure fails in regimes where emergent Lorentz behavior is claimed, the mass-loading and medium-response model is incomplete.

Cross-links:
- [Proper-time closure test](../spacetime/proper-time-and-time-dilation.md#effective-energy-momentum-closure-test)
- [SR mapping entry](../philosophy-history/theory-mapping.md#special-relativity-sr)

---

## Energy and Self-Hit in the Noether Sea

In the **super-field-speed** regime ($\|\mathbf V_a\|>1$ somewhere along the relevant path-history interval), architrinos and assemblies can intersect their own past isochrons (self-hit). In the presence of the Noether sea:

- Self-hit repulsion acts as an internal **stiffening mechanism** for Noether braids and more complex assemblies, contributing to their stability.
- Energy represented in an architrino's causal wake and local Noether sea response can be partially routed back through delayed self-interaction. At the bookkeeping level, this is an exchange between internal kinetic energy and wake/medium energy associated with the local Noether braid configuration.

At the exact causal-action level, global energy is conserved: self-hit just routes energy along more complex paths (architrino → causal isochron → local Noether sea → back to architrino/assembly). In dual-mollified local theorem models, the same statement should be read conditionally unless the mollified kernel is explicitly tied to an action-level regularization.

---

## Intuition (Plain Language)

Inside an assembly, large internal causal-history energy can circulate through many branch channels. Outside the assembly, distant probes couple only to the portion of that ledger that survives phase cancellation, shielding, and Noether sea response.

Architrinos and their assemblies are where the energy bookkeeping lives. The Noether sea is a dense population of high-energy Noether braid assemblies whose net long-range wake response is usually quiet because incoherent contributions cancel and shielded internal layers leak only weakly. In nested fermion braid scaffolds, outer support tiers screen deeper layers from the ambient Noether sea. The small residual exposure is what observer-level mass and gravitational response measure.

## Summary and Role in the Larger Theory

- **At the architrino level:**
  
  Kinetic energy and potential energy are defined via the Master EOM. Exact global conservation belongs to the exact causal-action theory; in mollified working models it is the target bookkeeping structure and is exact only when the regularization preserves the underlying time-translation symmetry. The substrate law is acceleration-first; no particle-specific fundamental mass is assigned to architrinos, and speeds are unbounded in principle.
  Potential availability is geometric rather than fuel-like: causal wakes are emitted as path-history structure, while work appears only when a receiver intersects active wake branches with nonzero radial power.

- **At the assembly level:**
  
  Large internal energies, plus coupling to the Noether sea, generate:
  - Effective inertia (mass),
  - Shielded external wake signatures (tiny apparent energy compared to internal),
  - Generation dependence through how many outer screening layers still surround the deepest core,
  - An emergent speed scale $c_{\text{eff}}$ and relativistic-like behavior.
  Macroscopic quietness follows from superposition and shielding: incoherent populations cancel statistically, while phase-locked assemblies such as collinear breathers preserve localized, non-canceling wake structure.

- **For spacetime and gravity:**
  
  The sea of small, high-energy Noether braids forms the Noether sea and, at coarse-grained level, the effective spacetime medium whose energy density and stress give rise to an emergent metric. The shielding factors and internal energies of both Noether braids in the Noether sea and "matter" assemblies contribute to:
  - The effective Newton constant $G$,
  - The cosmological Noether sea energy density,
  - How strongly observer-level effective metric response is reconstructed from different kinds of energy.
  
  Density-driven oblation is a candidate contribution to the effective gravitational-coupling closure: as the Noether sea encounters denser matter, local Noether braids may scale down and oblate, creating a compliance gradient that must be mapped through the Noether sea response tensor before it can be read as part of $G$.

---

## Appendix A: Energy Zero and Bookkeeping

$\mathbb{A}\mathbb{A}\mathbb{A}$ uses a **binding-energy convention** that fixes the zero of potential energy at the **inner turning point** of an accepted bound branch (the maximum-curvature binary (MCB) radius when that branch has been certified). This choice is operational: on a branch with a self-hit lower boundary, the deepest accessible state supplies the reference. It should not be read as a proof that every isolated two-body candidate already has a unique, history-independent cutoff.

Cosmology inventory prose uses the same convention only after declaring the comparison window. Positive component entries such as matter, radiation, dark-sector bookkeeping, and thermal reservoirs are mass-equivalent or energy-density terms measured relative to that window, while gravitational binding is a negative finite-window contribution. Mixing a local branch convention with a cosmological inventory convention without naming the window and boundary term risks double counting the same retained wake-history energy.

### Physical Setup and Why a New Zero is Needed

For an accepted attractive bound branch (opposite polarities), the inward motion accelerates until it reaches a **minimum radius** $r_{\min}$ where the certified self-hit and curvature records prevent further collapse. The motion then rebounds or orbits. Unlike a pure Coulomb potential, this branch has a lower bound on radius (and hence on accessible energy states).

Because a lower bound exists, the natural reference is **not** "infinite separation" but the **ground configuration** at $r_{\min}$.

### The Bookkeeping Convention

We adopt a **singular-boundary gauge**: on a certified branch chart with a declared self-hit lower boundary $r_{\min}$ (the MCB attractor), we fix the potential gauge at this wall.

$$U(r_{\min}) \equiv 0.$$

In this gauge, $U(r)$ represents the **accumulated work** performed to separate the binary from its ground state to radius $r$. Total energy is thus partitioned into *kinetic* (motion) and *deformation* (separation) components, with fully separated (unbound) pairs carrying maximal deformation energy $U_{\max} \equiv B_{\max}$.

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
so a separator crossing that changes the effective inner wall cannot be counted once as a gauge-origin jump and again as an independent $h$-like energy quantum. At a crossing radius $r_\ast$ between ledger cells $b$ and $b'$, the physical bookkeeping must satisfy
$$
\left[E_{\text{total}}\right]_{b\to b'}
=
K^{(b)}(r_\ast)+U^{(b)}(r_\ast)
=
K^{(b')}(r_\ast)+U^{(b')}(r_\ast)+\Delta_{\text{ledger}}
$$
where $\Delta_{\text{ledger}}$ is the declared root-change energy routed through the table entries such as $\varepsilon_o$, $\varepsilon_w$, and the middle-channel adjustment. The visible step is the ledger/gauge matching term; it is not additional to that matching.
Thus $U^{(b)}$ is a ledger-indexed potential, and the zero-section can jump when the active causal-root cell changes. A globally consistent energy ledger requires the $\Delta_{\text{ledger}}$ increments to glue around overlaps of ledger cells; otherwise the local potential gauges are individually consistent but the global binding-energy record is multivalued.

### Binding Energy and Total Energy

Let $B(r)$ denote the **binding energy** at radius $r$, with

$$B(r_{\min}) = B_{\max}.$$

Define

$$U(r) = B_{\max} - B(r).$$

Then total energy bookkeeping is:

$$E_{\text{total}} = K(r) + U(r), \qquad U(r) \ge 0.$$

At the minimum radius:

$$E_{\text{total}} = K_{\max}, \quad U(r_{\min}) = 0.$$

All available mechanical energy is kinetic at the inner turning point. Moving outward converts kinetic energy into potential energy (the rebound / climb-out phase).

### Effective Potential Language

If an effective potential is used, the centrifugal term and the self-hit barrier both contribute:

$$V_{\text{eff}}(r) = V(r) + \frac{L^2}{2 m_{\text{eff}} r^2} + V_{\text{self-hit}}(r).$$

Here $m_{\text{eff}}$ is an **effective inertial scale** (a bookkeeping proxy for mass in the coarse-grained description), not a primitive architrino mass.

The convention above fixes:

$$V_{\text{eff}}(r_{\min}) = 0.$$

This does **not** change dynamics; it sets a physically meaningful reference.

### Self-Hit Echo and Discrete Steps (Working Note)

In this picture, the self-hit region is **not** assumed to change the local acceleration law. The radial slope remains smooth:

$$\frac{dU}{dr} \text{ remains finite and continuous across the retained regularized branch chart.}$$

So the transition between the $v=c_f$ regime and the self-hit regime is a **regularized branch transition**, not a kink in the potential. The distinction shows up in **how action and energy bookkeeping are routed** between binaries, not in a new macroscopic slope.

The discrete step is a causal-root ledger effect, not an assumption that energy itself is made of independent chunks. On a fixed branch chart, the active causal intersections have an integer multiplicity: a self-hit count $N$ and an analogous partner-hit or channel count $M$. In the circular binary notation this same idea appears as the pair $(N_s,M_p)$ in [Super-Field-Speed Root Ledgers and Resonance Lock](binary-dynamics.md#super-field-speed-root-ledgers-and-resonance-lock). Within one ledger cell the underlying trajectory and $U(r)$ remain continuous. A visible $h$-like transaction occurs when a separator crossing changes the admissible integer ledger, for example by adding one grouped channel or, in the raw simple-root table, by a fold-pair jump satisfying $\Delta N\in 2\mathbb{Z}$ with $\Delta D=0$.

The mechanical event behind such a ledger change can be a caustic-grazing impulse. When a regularized branch crosses a $J=0$ caustic, the pointwise branch expression may become large while the integrated velocity change remains finite, as in [Caustic Transit and Finite Impulse](master-equation.md#caustic-transit-and-finite-impulse):
$$
\Delta\mathbf{V}_{a,n}
=
\int_{T_n^-}^{T_n^+}
\mathbf{A}_a^{(\eta)}(T)\,dT
$$
This finite impulse is a candidate substrate mechanism for changing the active causal-root ledger by a discrete amount without making primitive energy granular.

Thus the candidate quantum of action is geometric bookkeeping: it is the action scale assigned to a threshold crossing of the causal-root ledger. The energy shift appears in steps because the allowed causal intersections have changed discretely, even though the path-history geometry and the local potential slope remain continuous through the regularized fold layer. A closed branch chart must still expose the root-change energy, wake exchange, middle-channel adjustment, and any mismatch routed into unresolved modes.

Working bookkeeping hypothesis:

- Outer binary registers a single-step transaction ($h$-like unit), meaning one minimal admissible update of its active partner and self channel ledger.
- Middle binary adjusts to conserve total energy.
- Inner binary executes a two-step shift ($2h$-like unit), i.e., two discrete ledger updates rather than one. The "step" corresponds to the system crossing a separatrix between basins of attraction in the nonlinear delay dynamics. While the underlying trajectory is continuous, the energy redistribution stabilizes only at discrete resonances (winding numbers and causal-root multiplicities), making the effective energy transfer appear quantized.

This can read as an "amplified" response, but only because the inner binary is **releasing or reconfiguring retained internal energy** when the self-hit echo is engaged. It is **not** net energy creation; it is a redistribution between internal stores under a smooth $U(r)$.

### Nested Shell Braid as Routing/Locking Circuit (Analogy)

It is useful (as a **bookkeeping analogy**) to think of the nested shell braid as a **routing/locking circuit** rather than a simple reservoir. An incoming single-step transaction ($h$-like) couples most strongly to the **outer binary**, the **middle binary** acts as a buffer/fulcrum that maintains overall consistency, and the **inner binary** can respond with a two-step reconfiguration when the self-hit echo is engaged. The effective response can resemble a geared or ratcheted redistribution, but the mechanism is still deterministic energy routing, not creation.

In this language, a discrete input can **lock in** a new nested shell braid configuration: a threshold-triggered, history-dependent update that selects one stable branch over another. This is a **collapse-like** event in the phenomenological sense (a sudden, discrete state update), but in $\mathbb{A}\mathbb{A}\mathbb{A}$ it is treated as a **deterministic, microstate-sensitive bifurcation**, not an intrinsically stochastic collapse.

### Bookkeeping Table: One $h$ of Closed-Cycle Action (Outer $v < c_f$)

For the $h$ versus $\hbar$ convention used here, see [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md).

Assumptions for this bookkeeping pass:

- $f$ labels a discrete outer-binary orbital state (frequency index). The three rows are **pre-hit** ($f-1$), **action/transition** ($f_{\psi}$), and **post-redistribution** ($f$). There is **one** step in frequency. The $f_{\psi}$ label is a transient bookkeeping state, not a new frequency index or literal wave function.
- The transaction is a single closed-cycle action unit, $\Delta A_{\text{cycle}} = +h$, coupled first to the **outer** binary while $v_{\text{out}} < c_f$.
- The symbol $h$ labels action per full causal phase cycle. The associated radian-normalized rotational-action increment is $\hbar = h/(2\pi)$; in this local bookkeeping pass $\Delta I$ denotes that angular-momentum/action variable.
- Energy bookkeeping uses action-angle language: for a small discrete step, $\Delta E \approx \omega\,\Delta I = f\,\Delta A_{\text{cycle}}$. This is a **notation choice**, not a claim about the exact micro-law.
- The **inner binary** responds with a two-step reconfiguration. The **middle binary** adjusts to satisfy conservation of total energy and total angular momentum (including any causal-wake exchange).

Notation in the table:

- $K_o, U_o$ = outer-binary kinetic and potential energies.
- $K_m, U_m$ = middle-binary kinetic and potential energies.
- $K_i, U_i$ = inner-binary kinetic and potential energies.
- Superscripts $(f-1)$, $(f_{\psi})$, and $(f)$ denote the state index (one-step update).

Per-step increments (explicit, no deltas):

- Outer step energy: $\varepsilon_o \equiv \omega_o \hbar$ with
  $$k_o \equiv \chi_o\,\varepsilon_o,\quad u_o \equiv (1-\chi_o)\,\varepsilon_o,$$
  so $k_o + u_o = \varepsilon_o$.
- Inner step energy: $\varepsilon_i \equiv \omega_i \hbar$ with
  $$k_i \equiv \chi_i\,\varepsilon_i,\quad u_i \equiv (1-\chi_i)\,\varepsilon_i,$$
  so $k_i + u_i = \varepsilon_i$. Because the inner binary takes **two steps**, it adds $2k_i$ and $2u_i$.
- Middle adjustment energy: $\varepsilon_m$ is whatever is needed to close the ledger. Here $\varepsilon_w$ denotes the **causal-wake exchange energy** during the step:
  $$\varepsilon_m \equiv \varepsilon_w - 2\varepsilon_i,$$
  and we split it as
  $$k_m \equiv \chi_m\,\varepsilon_m,\quad u_m \equiv (1-\chi_m)\,\varepsilon_m.$$

| State | Outer (o) | Middle (m) | Inner (i) | Notes |
| --- | --- | --- | --- | --- |
| $f-1$ | $K_o^{f-1}$, $U_o^{f-1}$ | $K_m^{f-1}$, $U_m^{f-1}$ | $K_i^{f-1}$, $U_i^{f-1}$ | Baseline. No pending transaction. |
| $f_{\psi}$ | $K_o^{f_{\psi}} = K_o^{f-1} + k_o$<br>$U_o^{f_{\psi}} = U_o^{f-1} + u_o$ | $K_m^{f_{\psi}} = K_m^{f-1}$<br>$U_m^{f_{\psi}} = U_m^{f-1}$ | $K_i^{f_{\psi}} = K_i^{f-1}$<br>$U_i^{f_{\psi}} = U_i^{f-1}$ | Immediate post-hit. <br>Outer receives $\Delta I_o = +\hbar$ in the initial bookkeeping gauge. <br>Outer records a $(k_o,u_o)$ increment. |
| $f$ | $K_o^{f} = K_o^{f-1} + k_o$<br>$U_o^{f} = U_o^{f-1} + u_o$ | $K_m^{f} = K_m^{f-1} + k_m$<br>$U_m^{f} = U_m^{f-1} + u_m$ | $K_i^{f} = K_i^{f-1} + 2k_i$<br>$U_i^{f} = U_i^{f-1} + 2u_i$ | Post-redistribution. <br>Outer update is complete at $f_{\psi}$; <br>only middle/inner continue to settle. |

Constraints to apply across the $f-1 \to f$ transition (bookkeeping level):

- **Angular momentum / rotational action**: the sign rule is gauge-invariant only after declaring the allowed wake share:
  $$
  \Delta I_{\text{out}}+\Delta I_{\text{mid}}+\Delta I_{\text{in}}+\Delta I_{\text{wake}}
  =
  +\hbar,
  \qquad
  |\Delta I_{\text{wake}}|
  \le
  \epsilon_w\hbar
  $$
  For a **net positive** transaction, the layer increments must satisfy $\Delta I_k\ge-\epsilon_w\hbar$ for $k\in\{\text{out},\text{mid},\text{in}\}$. For a **net negative** transaction, the same bound applies with signs reversed. The nonnegative-increment claim is therefore an up-to-wake-tolerance statement, not a gauge-free statement that the wake channel carries exactly zero rotational action.
- **Energy**: $(k_o+u_o) + (k_m+u_m) + 2(k_i+u_i) = \varepsilon_o + \varepsilon_w$. This is the explicit version of conservation using the per-step increments defined above.
- **Root-ledger closure**: the transition must move from one admissible integer causal-root ledger to another and then close consistently over the full cycle. In a raw self-root table, separator crossings obey the parity rule $\Delta N\in 2\mathbb{Z}$ and $\Delta D=0$; in a grouped channel ledger, the same event may be recorded as one newly active channel.
- **Cross-ledger gauge matching**: any jump in $r_{\min}^{(b)}$ and $B_{\max}^{(b)}$ is part of the declared $\Delta_{\text{ledger}}$ budget above. A table row may not count the same gauge-origin shift once in $U^{(b)}$ and again as an extra wake or oscillator energy.
- **Smooth slope**: $dU/dr$ remains continuous across the graft; the discrete behavior comes from **state updates**, not a kink in $U(r)$.

This table is intentionally explicit: every $h$ closed-cycle action transaction is represented by a radian-normalized $\hbar$ rotational-action increment, split into a kinetic part ($k$) and a potential part ($u$). The remaining freedom is **how** each binary partitions its step (the $\chi$ fractions) and how the middle, inner, and causal-wake channels redistribute the initial outer-binary coupling.

### Comparison to Coulomb and Standard Conventions

In pure Coulomb,

$$V(r) = -\frac{k q^2}{r},$$

so there is no inner bound and no natural finite zero. Classical mechanics therefore chooses $V(\infty)=0$.

In $\mathbb{A}\mathbb{A}\mathbb{A}$, a certified hard inner bound **supplies** a natural zero at $r_{\min}$, which is the lowest accessible state. The bookkeeping therefore switches from "energy relative to infinity" to "energy relative to the ground state."

### Summary Table (Operational Meaning)

| Region | $K$ | $U$ | Meaning |
| --- | --- | --- | --- |
| $r = r_{\min}$ | max | 0 | Fully bound (ground) |
| $r > r_{\min}$ | $\downarrow$ | $\uparrow$ | Climbing out / rebound |
| escape limit | 0 | $B_{\max}$ | Free (unbound) |

### One-Line Rule

If the model has a hard inner bound, **set the potential zero at that bound** and measure all energies outward from it.

**Adiabatic branch invariant target.** On a certified branch chart for binary layer $a$, suppose the reduced cycle admits a canonical pair $(Q_a,\Pi_a)$ and a slowly varying branch parameter $\lambda(T)$, such as a local Noether sea response variable, shielding parameter, or neighboring-layer phase parameter. Define the rotational action
$$
I_a(\lambda)
\equiv
\frac{1}{2\pi}
\oint_{\gamma_a(\lambda)}
\Pi_a\,dQ_a
$$
If the parameter changes slowly compared with the cycle period $T_a(\lambda)$,
$$
\epsilon_{\mathrm{ad},a}
\equiv
\max_{T\in W}
\left(
T_a(\lambda(T))\,
\left\|\frac{d\lambda}{dT}\right\|\,
\ell_{\lambda}^{-1}
\right)
\ll1
$$
and the path remains a positive distance from the causal-root ledger-cell boundary,
$$
\operatorname{dist}\!\left(\gamma_a(\lambda),\partial\mathcal{G}_a\right)
\ge
\delta_{\text{cell}}
>
0
$$
the interior adiabatic theorem target is
$$
\frac{dI_a}{dT}
=
O(\epsilon_{\mathrm{ad},a})
+
\mathcal{R}_{\mathrm{int},a}(T)
$$
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
where $\Delta I_{\mathrm{ledger},a}$ is the declared quantized ledger increment associated with the change in active causal-root multiplicity or branch chart. Thus the action variable is expected to drift only adiabatically inside a ledger cell, while a root-ledger transition may produce the discrete $\Delta I$ recorded above. This turns the $h$-like bookkeeping into a branch-boundary invariant target rather than an assumption that energy itself is quantized at the primitive level.
In this form, an $h$-like action transaction is the finite phase-space area jump across a root-fold wall, not a primitive grain of energy. The floor $\delta_{\text{cell}}>0$ is the adiabatic validity condition: inside the cell the action is nearly invariant; at the wall the fold impulse, ledger update, and cross-ledger gauge matching must be booked together on the same retained branch record.
