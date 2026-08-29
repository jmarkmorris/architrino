# Binary Dynamics

This chapter starts with the simplest possible assembly question: what happens when one Electrino and one Positrino try to stay together under delayed causal wakes? The answer is not ordinary central-force orbit mechanics. Each architrino responds to where the partner was when the relevant wake was emitted, not to where the partner sits at the same absolute time.

That delay makes the binary the first serious test of the Master Equation. Partner hits, self-hits, branch birth, caustic onset, circular anti-damping, non-circular spiral hypotheses, and maximum-curvature binary analysis all appear here before they are used in larger Noether braid structures. Two status boundaries govern the chapter: self-hit makes the dynamics non-Markovian (path-history dependent), and stability or attractor claims are conjectural unless explicitly established.

Read the chapter as a branch atlas, not as a single orbit story. The partner-only contribution shows why ordinary circular central-force intuition fails. The self-hit records show where the system becomes path-history dependent. The maximum-curvature and spiral sections are candidate ways to control that delayed feedback, and each must close its own root, action, wake, and stability ledger before it can become an assembly building block.

**Claim-status convention.** A **derived** statement follows from the declared circular or history-space equations on its stated chart. A **conditional** statement follows only under the assumptions named with it. A **target** states a proof or certificate obligation that is not yet closed. A **diagnostic** is a computable comparison or branch record whose agreement does not by itself promote the underlying claim. These labels apply chapter-wide; an unlabeled explanation does not upgrade a conditional, target, or diagnostic statement.

This chapter is the foundational precursor to [Shared-Circle Assemblies](shared-circle-assemblies.md), [A1 Dynamics](../noether-braid/braid-a1-dynamics.md#a1-dynamics), [A3.3 Doubling-Frequency Resonance Lock](../noether-braid/braid-a3-3-doubling-frequency-lock.md), [Master Equation](master-equation.md), and the assembly-level [Noether Braid](../noether-braid/noether-braid.md). Shared-Circle Assemblies carries the complete-root circular benchmark into balanced many-member rings while keeping their braid-taxonomy status explicit. The primitive-entity ontology in [Architrino](../foundations/architrino.md) points here once the discussion becomes a behavioral regime or assembly-stability mechanism.

## The Spiral Orbiting Binary and the Contraction Phase

An orbiting binary is the simplest emergent assembly, consisting of two architrinos of opposite polarity: an Electrino and a Positrino. With polarities $-\epsilon$ and $+\epsilon$, the assembly is electrically neutral overall. This system is the first teaching case for delayed causal wakes, partner-hit contraction, and the self-hit onset boundary.

Consider the ideal case of a symmetric orbit in a universe with no other architrinos. In general, each architrino is subject to a superposition of external causal wake contributions from all other transmitters; the analysis below isolates the binary by setting those external contributions to zero.

Let the Electrino be architrino 1 and the Positrino be architrino 2.
-  **Positions:** $\mathbf X_1(T)$ and $\mathbf X_2(T)$
-  **Polarities:** $q_1 = -\epsilon$ and $q_2 = +\epsilon$

The motion of each architrino is determined by the wake emitted by the other at a delayed time. The acceleration of the Electrino (architrino 1) at absolute time $T$ is caused by the Positrino's (architrino 2) wake emitted at an emission time $T_t$. This is governed by the interaction condition:
$$
\|\mathbf X_1(T) - \mathbf X_2(T_t)\| = c_f(T - T_t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-0d3a5068ed97efb1)
The acceleration vector for the Electrino is attractive, pointing towards the Positrino's delayed position:
$$
\mathbf A_1(T) \propto -\hat{\mathbf{r}}_{21} = - \frac{\mathbf X_1(T) - \mathbf X_2(T_t)}{\|\mathbf X_1(T) - \mathbf X_2(T_t)\|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-02fabdc1ab817101)
The Electrino's emissions govern the Positrino's symmetric response through the corresponding partner equation.

In the strictly sub-field-speed regime (no self-interaction, $\|\mathbf V\|\le c_f$), a stable, circular orbit is impossible. Because the attractive acceleration on each architrino points to the *past* position of its partner, it is not a true central acceleration. The principal circular branch proves a sharper direction diagnostic: the partner line of action has a forward tangential projection, so the partner-only near-circular ledger is anti-damped rather than a contraction proof. This diagnostic is not a receiver-side acceleration-balance certificate. A logarithmic inward spiral can still be used as a separate non-circular ansatz or capture target, but its radial tightening must be certified by solving that branch chart with same-record transmitter-side acceleration weight; it is not implied by the principal circular sign.

The receiver-side reduction makes the direction test exact. The signed pitch $p=-\dot r/(r\omega)$ is positive while the binary spirals inward and negative while it spirals outward. The [closed spiral-direction flow](master-equation.md#closed-spiral-direction-flow) computes how that sign changes from the radial and azimuthal wake contributions.

The practical conclusion is narrower than “binaries spiral in” or “binaries spiral out.” A binary cannot follow an exact logarithmic spiral while simultaneously keeping a fixed spiral tightness, a fixed angular rate, and only one principal delayed partner root. Those assumptions are mutually incompatible under the transmitter-side Master Equation. An actual spiral must change its tightness or angular rate, acquire another causal root, enter the self-hit regime, or receive additional multi-body contributions. The formulas decide the direction once that evolving branch history is supplied.

Standard central-force mechanics conserves angular momentum because the force at absolute time $T$ is collinear with the equal-time separation vector. The partner-hit branch does not have that geometry. Define the equal-time separation and delayed line of action by
$$
\mathbf{r}_{12}^{\mathrm{eq}}(T)
\equiv
\mathbf X_1(T)-\mathbf X_2(T),
\qquad
\widehat{\mathbf{r}}_{12}(T;T_t)
=
\frac{\mathbf X_1(T)-\mathbf X_2(T_t)}
{\|\mathbf X_1(T)-\mathbf X_2(T_t)\|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-76f4af57d07f67ed)
The delayed partner branch carries the angular-momentum-change direction
$$
\mathbf{r}_{12}^{\mathrm{eq}}(T)
\times
\widehat{\mathbf{r}}_{12}(T;T_t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-d395058f3a923c57)
which is generically nonzero because $\mathbf X_2(T_t)$ is not the partner's equal-time position. Therefore the usual angular-momentum barrier and the instantaneous effective potential
$$
V_{\mathrm{eff}}(r)=V(r)+\frac{ml^2}{2r^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-184fcbda3dfe0a02)
cannot be imported as the binary's governing reduction. A conserved angular-momentum-like quantity, if present, must include the causal-wake history term that balances the delayed torque.

**Circular root-playback simplification for the sub-field partner contribution.** In units with $c_f=1$, the circular speed is $s=R\omega$. On the non-translating symmetric circular chart, the transmitter and receiver velocity projections on every retained chord are equal. If two points on the circle have angles $a$ and $b$, then
$$
\mathbf e_\theta(a)\cdot(\mathbf e_r(a)-\mathbf e_r(b))
=
\sin(a-b)
=
\mathbf e_\theta(b)\cdot(\mathbf e_r(a)-\mathbf e_r(b)).
$$

[View →](../../../../equation-mapping.html#corpus-equation-9ad3da309fb63960)
Thus $D_r=D_t$ and the signed root-playback derivative is one for every retained root on this chart. The acceleration weight is instead $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert=1/|J^t|$. The circular partner contribution gives
$$
T_p
\propto
\frac{\sin(\delta_p/2)}{\cos^2(\delta_p/2)}
\quad (0<\delta_p<\pi)
$$

[View →](../../../../equation-mapping.html#corpus-equation-eae7bd168382c02e)
where $\delta_p$ is the partner delay angle. This is a canonical acceleration contribution only for the non-translating symmetric circular benchmark; deformed, translating, or non-circular histories must recompute the same-record $D_t$, $D_r$, and $W^{\mathrm{acc}}$ before any acceleration-balance conclusion is promoted.

-  The circular geometry gives a positive tangential acceleration contribution for the partner-only ledger.
-  The radial component points inward, but inward radial pull plus positive tangential work does not by itself prove a tightening spiral.

With perfectly symmetric initial conditions, the paths of the electrino and positrino are distinct but mirror-related. If the branch begins as a radial fall or enters a non-circular capture basin, it may still contract, but that is a separate branch-history statement. Emission cadence and intrinsic per-wavefront amplitude remain constant, while the **received** acceleration is velocity-dependent because the causal-delay Jacobian compresses or dilates the causal flux along each active branch. For action or wake-history rates accumulated along a moving receiver path, the same root also carries the receiver-side factor $dT_{t,\ell}/dT=(c_f-\hat{\mathbf r}\cdot\mathbf V_i(T))/(c_f-\hat{\mathbf r}\cdot\mathbf V_j(T_{t,\ell}))$. The evolution is therefore driven by delay geometry, branch bunching, receiver-path sampling, and, once active, self-interaction.

Initially, and as long as the speeds of both architrinos are less than or equal to the wake propagation speed $c_f$, they are only influenced by their partner's attractive wake. The total acceleration is simply the attractive acceleration contribution:
$$
\mathbf A_{1, \text{total}}(T) = \mathbf A_{1,2}(T) \quad \text{and} \quad \mathbf A_{2, \text{total}}(T) = \mathbf A_{2,1}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-341b78634c74be5b)
During this partner-only phase, the retained circular contribution has an inward radial component and a forward tangential work term. That combination is anti-damping: it accelerates the orbiting motion and prevents a partner-only constant-speed circle. Any sub-field-speed contraction claim must come from a certified non-circular branch, a capture basin, or an explicit finite-window wake-history account.

### Ideal Symmetric Spiral Ansatz

The ideal binary spiral used in this opening analysis is not the same geometry as the later maximum-curvature circular benchmark. It is a **symmetric logarithmic-spiral ansatz**: the electrino and positrino follow two distinct planar curves related by the binary symmetry. At equal absolute time they remain opposite about the midpoint in the ideal center frame, but each architrino's path is the mirror-conjugate of the other's path rather than the same curve traced by both architrinos.

This matters because the ideal spiral is a **transient, scale-similar contraction ansatz**, not a consequence of the principal circular calculation. Within a fixed velocity regime and fixed active-root ledger, the model assumes that the local acceleration geometry repeats after a scale change and phase advance: radii shrink by a common factor, speeds rise according to the same delayed-geometry rule, and the partner/self branch structure is symmetric between the two architrinos. When the trajectory crosses a threshold such as $\|\mathbf V\|=c_f$ or a higher root-birth boundary, that scale-similar description must be re-matched on a new branch chart.

By contrast, the maximum-curvature binary section studies a **uniform circular benchmark**: fixed $R$, fixed $s$, and a single circular path geometry used to compute closed-form delay angles, branch Jacobians, and per-hit acceleration components. That circular model is useful as a limiting or diagnostic case, and it gives the anti-damping obstruction that any non-circular contraction story must beat. The detailed non-circular benchmark for the symmetric logarithmic spiral belongs in [Master Equation](master-equation.md#symmetric-delayed-spiral-advanced-non-circular-benchmark); this chapter uses it only as the conceptual two-body entry point.

### Translating Binary Trace

The same binary has a co-moving orbit and an absolute-history trace. If a circular binary translates with constant group velocity $\mathbf{V}$ while its orbital plane is spanned by orthonormal axes $\mathbf{e}_1,\mathbf{e}_2$, a first kinematic diagnostic is

$$
\mathbf X_{\pm}(T)
=
\mathbf X_0+\mathbf V T
\pm
R\left(\cos\omega T\,\mathbf e_1+\sin\omega T\,\mathbf e_2\right),
\qquad
\mathbf n=\mathbf e_1\times\mathbf e_2 .
$$

[View →](../../../../equation-mapping.html#corpus-equation-d21026dd32a1ca98)

When $\mathbf{V}$ is parallel to $\mathbf{n}$, each architrino draws a constant-pitch helical trace with pitch $2\pi\|\mathbf{V}\|/\omega$ per binary cycle. At a tilted orientation, the absolute-history trace combines longitudinal pitch $2\pi|\mathbf{V}\cdot\mathbf{n}|/\omega$ with the transverse group-velocity component $\mathbf{V}-(\mathbf{V}\cdot\mathbf{n})\mathbf{n}$. This trace is a visualization and solver diagnostic, not a stability proof: the dynamical question is still whether the translated path-history ledger retains the same active causal roots, Jacobian floors, energy/action records, and branch identity.

### Collision-Free Shared-Circle Winding Lemma

Let $M\ge 2$ continuous labeled worldlines remain on one fixed nondegenerate circle for a common labeled period $P>0$, with $\mathbf X_i(P)=\mathbf X_i(0)$ for every label and $\mathbf X_i(T)\ne\mathbf X_j(T)$ for every $i\ne j$ and every $T\in[0,P]$. Choose one orientation for the circle and continuous lifts $\theta_i:[0,P]\to\mathbb R$ of that common angular coordinate. Each label then has an integer signed winding number

$$
w_i=\frac{\theta_i(P)-\theta_i(0)}{2\pi}.
$$

For a pair of labels, $\delta_{ij}=\theta_i-\theta_j$ is continuous and avoids $2\pi\mathbb Z$ because the paths never coincide. It therefore remains in one connected component of $\mathbb R\setminus2\pi\mathbb Z$. Both endpoint values lie in the same open interval of width $2\pi$, while

$$
\delta_{ij}(P)-\delta_{ij}(0)=2\pi(w_i-w_j).
$$

The left side has magnitude less than $2\pi$ and the right side is an integer multiple of $2\pi$, so $w_i=w_j$. Hence every labeled architrino has the same signed net lap count and the same signed mean angular rate over the common period.

Claim level: **derived**. The lemma permits unequal instantaneous angular velocities, including temporary reversals, because it constrains only the net winding. It does not establish acceleration balance, retention, or stability. It excludes collisions or collision continuations, return only as an unlabeled set modulo permutation, a collapsed or changing circle, departure from the circle, and paths without a common labeled period. A continuous collision-free labeled common-period family on one fixed nondegenerate circle with unequal winding numbers would falsify the result.

## Spiral Momentum Budget Across the Hinge (Speculative)

This subsection records a modeling hypothesis rather than a derived law. The desired closure would link the spiral path, the per-hit acceleration law, and the angular-momentum budget across the full velocity range. Below the wake speed, the binary feels only partner hits, and the principal circular branch has positive tangential work. A contraction ansatz must therefore explain how radial tightening survives that anti-damping record through non-circular geometry, wake-flux export, or a later multi-root ledger. We introduce a per-cycle gain parameter $\Delta L_c$ only as a provisional bookkeeping variable for that unresolved branch-history calculation.

**Branch-birth jump target:** a smooth doubling rule is too strong unless the active causal-root ledger stays unchanged. On a fixed signed branch chart $b(s)$, the per-cycle escaped angular-momentum entry should instead be written
$$
\Delta L_{\mathrm{cycle}}(s)
=
\sum_{\rho\in b(s)}
\ell_{\rho}^{\mathrm{esc}}(s),
$$

[View →](../../../../equation-mapping.html#corpus-equation-f9340e93e3880a6c)
where $\rho$ ranges over the active partner and self records that actually send wake angular momentum through the window boundary. At a branch birth the ledger changes, so the cycle budget has a jump law rather than an automatic smooth continuation. At the principal self-hit hinge,
$$
\Delta L_{\mathrm{cycle}}(1^+)-\Delta L_{\mathrm{cycle}}(1^-)
=
\ell_{\mathrm{self},0}^{\mathrm{esc}}(1^+),
$$

[View →](../../../../equation-mapping.html#corpus-equation-c23a0717c77b6a1a)
with the right-hand side evaluated in the same finite-$\eta$ chart that regularizes the caustic. The older heuristic $\Delta L_c\mapsto2\Delta L_c$ is recovered only in the special case where the newly born principal self record exports exactly the same cycle increment as the pre-hinge partner ledger. More precisely, $\ell_{\mathrm{self},0}^{\mathrm{esc}}(1^+)$ is not the value of a divergent pointwise tangential coefficient at the hinge. It is the finite angular impulse
$$
\ell_{\mathrm{self},0}^{\mathrm{esc}}(1^+)
=
\lim_{\eta\to0^+}
\int_{T^-}^{T^+}
R(T)\,A_{\mathrm{self},0,\eta}^{\mathrm{tan}}(T)\,dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-7e7f7eabed7564de)
when that limit exists under the same finite-caustic transit convention used for the velocity impulse. If the impulse limit is regulator-dependent, the branch-birth jump remains a diagnostic record rather than a promoted angular-momentum ledger entry.

This section treats an exponential-in-angle spiral (logarithmic spiral) as a **modeling assumption** rather than a derived law. It sets the bookkeeping target: a path-history acceleration sum whose signed branch-birth increments and boundary wake fluxes yield the spiral contraction. Near $s=1^+$ the principal self branch inherits the transmitter-side fold onset displayed below, and the canonical acceleration weight is $W^{\mathrm{acc}}=1/|J_s|$. Its coincident endpoint birth is therefore more singular than the former stripped model, and its verification remains incomplete.

## Spiral Binary Field-Speed Symmetry-Breaking Point

The binary system's evolution is organized around the **field-speed symmetry point** $\|\mathbf V\|=c_f$. This is a **hinge** where the causal structure changes: below $c_f$ only partner-delay acceleration contributions exist, while above $c_f$ self-hit roots appear. The hinge is not a hard barrier; it is the birth of the principal self branch. In the symmetric circular geometry the self-delay equation is
$$
\delta_s = 2s\sin(\delta_s/2), \qquad s=\frac{\|\mathbf V\|}{c_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7af528a44359dc7c)
Writing $s=1+\mu$ with $\mu>0$ small, the principal root satisfies
$$
\delta_s \sim \sqrt{24\mu},
\qquad
\sin(\delta_s/2)\sim \sqrt{6\mu}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3bc38b3b7bfc47bf)
The associated branch Jacobian is
$$
J_s = 1-s\cos(\delta_s/2)=1-\frac{\delta_s}{2}\cot(\delta_s/2)\sim 2\mu
$$

[View →](../../../../equation-mapping.html#corpus-equation-b3bf24b912c47c07)
The transmitter-side root-density diagnostics therefore scale as
$$
\frac{1}{\sin(\delta_s/2)\,|J_s|}\sim \mu^{-3/2},
\qquad
\frac{1}{\sin^2(\delta_s/2)\,|J_s|}\sim \mu^{-2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f24fd137abed9a1c)
This is the first major consequence of the transmitter-side Jacobian: the hinge is not merely a change in root count but a genuine **caustic onset** for transmitter-emission density and action counting. On the non-translating symmetric circular chart the equal-projection lemma gives $D_r=D_t$, but $W^{\mathrm{acc}}=1/|J_s|$. The canonical self-hit acceleration components therefore scale as
$$
\frac{1}{\sin(\delta_s/2)|J_s|}\sim \mu^{-3/2},
\qquad
\frac{1}{\sin^2(\delta_s/2)|J_s|}\sim \mu^{-2}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-c15fe92f2b57d467)
The principal self branch therefore has a non-integrable coincident-birth warning in the current analytic control. Any candidate maximum-curvature balance must route that transition through a finite accepted singular-event treatment before appealing to higher-winding smoothing.

## Self-Hit: Definition and Diagnostics

Self-hit is the key non-Markovian feature of architrino dynamics. It occurs when an architrino interacts with potential it emitted earlier along its own worldline.

**Geometric condition (absolute coordinates):** For a given architrino with trajectory $\mathbf X(T)$, a self-hit event is a pair of times $(T_t, T_{\mathrm{hit}})$ with $T_{\mathrm{hit}} > T_t$ such that
$$
\|\mathbf X(T_{\mathrm{hit}}) - \mathbf X(T_t)\| = c_f (T_{\mathrm{hit}} - T_t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-4c581ca6c1e9cf32)
and the architrino is the transmitter of the causal wake surface emitted at $T_t$.

**Terminology split:** Hit type is determined by **transmitter identity**. A **self-hit** has the same transmitter and receiver; a **partner hit** has a different transmitter and receiver. Root count is a separate question: either transmitter can contribute one active causal root or multiple active roots at the same reception time. Thus "self-hit" does not mean "multi-hit," and "partner hit" does not mean "single-hit."

**Dynamical role:**
- On any interval with strict sub-field-speed motion, self-hit is absent by the triangle-inequality root test, unless older path-history emissions from a prior super-field-speed interval remain active.
- As velocities exceed $c_f$ on curved histories, emission isochrons can catch up with the transmitter's future positions, generating candidate nonlocal feedback and effective restoring or destabilizing accelerations depending on configuration.
- In generic trajectories, once an architrino has exceeded $c_f$ and emitted wakes in that regime, it can later slow below $c_f$ and still experience self-hits from those earlier emissions because the active record is non-Markovian.
- For binary and Noether braid assemblies, repeated self-hit events are a proposed outward barrier against collapse. Stable radii, frequencies, limit cycles, and attractors require separate tangential, radial, wake-boundary, and return-map closure.

For the circular-geometry details (principal angles, winding numbers, discrete self-hit branches), see **Setup and Notation (Symmetric Frame)** in **Maximum-Curvature Binary — Circular**.

## Post-Threshold Self-Hit Phase

Once the circular branch admits same-transmitter roots, the architrinos interact with their own earlier, repulsive wakes. The total acceleration on each architrino then becomes a superposition of attraction from its partner and self-repulsion. For the electrino:
$$
\mathbf A_{1, \text{total}}(T) = \mathbf A_{1,2}(T) + \mathbf A_{1,1}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9a69dd9bee7ee82e)
In the circular benchmark, the principal self-hit branch ($m=0$) becomes available only on the super-field-speed side; at higher speeds, additional self-hit and partner-hit roots can turn on (see **Root Multiplicity vs. Speed**). The new self-repulsive term, $\mathbf A_{1,1}(T)$, grows rapidly as the path curvature increases and changes the tangential ledger. On the same-sheet principal chart that tangential contribution is forward; in the full signed ledger, older sheets can contribute with the opposite tangential sign. This post-threshold phase is therefore a branch-certificate target, not a generic tightening law: any radial arrest or continued contraction must be decided by the signed multi-root ledger, wake-history accounting, and stability certificate described below.

## Maximum-Curvature Binary — Circular

Receiver-side validity notice. The circular MCB branch topology, root labels, transmitter-side Jacobian formulas, and canonical acceleration components use $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$. The algebraic root-ledger result below is therefore a Master EOM measurement on the unregularized circular simple-root chart. Stability, finite-event continuation, action records, and retained-history claims remain outside that measurement.

Once self-hit turns on, the natural question is whether the dynamics converge to a limiting curvature. We call the candidate limit the **maximum-curvature binary (MCB)**. This section collects the full two-body, self-hit analysis for that candidate, including delay geometry, acceleration components, and stability criteria. It is the canonical reference for MCB attractor status.

MCB stability claims rely on the well-posedness of the regularized SD-NDDE. In this chapter we treat $\eta > 0$ as fixed; any $\eta \to 0$ statement is outside the claims established here unless a weak-limit argument is explicitly supplied. The formal state-space framework appears in **State Space and Well-Posedness of the Two-Body Delay System**.

**Goal**: Characterize the circular, constant-speed, constant-radius configuration of two opposite-polarity architrinos and investigate where curvature $1/R$ is maximized. We work in units with field speed $c_f = 1$ and use the canonical delayed per-hit law with radial line of action and transmitter-side acceleration weight.

**Plain language**: We seek the tightest (smallest-$R$) steady circle an opposite-polarity pair can trace when the only acceleration contributions come from delayed line-of-action interactions with the partner and from each architrino's own past emissions. In the canonical transmitter-side law, each retained hit carries $c_f/|D_t|$ as its acceleration weight and $D_r/D_t$ separately for root playback.

### Foundational Context (Ontological Clarification)

#### The Maximum-Curvature Binary (MCB) as Fundamental Unit

The architecture hypothesizes that the **maximum-curvature binary (MCB)** would be reachable first by one declared persistent binary index of a candidate Noether braid. On the super-field-speed circular chart, certified same-transmitter roots can supply only the outward barrier against collapse; centripetal and tangential closure must come from the complete signed ledger. This mechanism does not by itself assign a braid-taxonomy member. If the branch is certified as a stable and reproducible attractor, it would supply candidate **fundamental physical units** (length and time); see **Emergent Properties and Measurement Standards** below for the explicit definitions.

**Universal cap target (explicit):** If a stable MCB branch is certified, it would define a single limit state with one radius/speed pair. Binaries may sit below that limit, but the claim that no binary can exceed the MCB curvature or pass beyond its defining radius/speed remains conditional on the full signed-root ledger and stability certificate.

If realized, the MCB radius $r_{\text{min}}$ is expected to be determined by the balance of:
1. opposite-polarity causal-wake attraction, with the stripped inverse-square surrogate scaling as $\epsilon^2/r^2$,
2. self-hit repulsion (non-Markovian feedback when same-transmitter roots exist; super-field-speed circular history is the relevant branch),
3. Centripetal requirement for stable circular orbit.

**Dynamical priority (attractor status):** The architecture hypothesizes the MCB is a **robust attractor**, not a finely tuned periodic orbit. Only if the multipliers lie strictly inside the unit circle and the basin is non-trivial do we have the attractor the architecture relies on. If neutrality or instability is found, the candidate Family-A ladder and broader Noether braid claims must be downgraded or the interaction law revised (e.g., additional damping/medium effects).

### Setup and Notation (Symmetric Frame)

- **Two architrinos** with polarity bookkeeping labels $q_1 = -\epsilon$ and $q_2 = +\epsilon$ (where $\epsilon = |e|/6$).
- **Equal-time positions** (in absolute time $T$) are diametrically opposite on a circle of radius $R$ about the midpoint.
- **Uniform circular motion**: Angular speed $\omega$, constant tangential speed $s = R\omega$.
- **Non-translating binary**: Circle center (midpoint) is fixed in Euclidean 3D space; no net translation.

### Translating Binary Handoff to Lorentz Closure

The circular maximum-curvature benchmark is also the rest-frame boundary condition for the first material clock/ruler test. The translating ansatz keeps absolute time and the primitive wake speed explicit:
$$
\mathbf X_{\sigma}(T)
=
u T\,\hat{\mathbf e}
+
\sigma\,\boldsymbol{\rho}_u(\theta(T)),
\qquad
\sigma\in\{+1,-1\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-116ae71707d08388)
where $\boldsymbol{\rho}_0$ is the circular branch studied here and $\boldsymbol{\rho}_u$ is the deformed periodic orbit, if it exists, on the retained moving branch chart.

This is a direct delayed-root calculation, not a coordinate boost imposed on the answer. The root equations must be solved again with the transmitter positions, transmitter velocities, partner-hit records, self-hit records, and Jacobian factors evaluated on the translating history. The decisive outputs are the moving period $P_u$ and the projected size ratio $L_{\parallel}(u)/L_{\perp}(u)$. In primitive units the Lorentz target is
$$
\frac{P_u}{P_0}=\gamma_f(u),
\qquad
\frac{L_{\parallel}(u)}{L_{\perp}(u)}=\frac{1}{\gamma_f(u)},
\qquad
\gamma_f(u)=\left(1-\frac{u^2}{c_f^2}\right)^{-1/2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ed308a8866ffe052)

Here $P_0$ is the reference cycle period of the same declared clock branch.

The exact residual definitions and Theorem G role are recorded in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#translating-binary-benchmark). A Lorentzian result would make the two-body branch the first derived substrate clock. A non-Lorentzian residual would be equally informative because it would identify the first place where the primitive two-body kernel pressures the larger Lorentz-closure program.

Two conditional results constrain this handoff without producing a moving branch. First, for the exactly circular planar rest record, full spatial equivariance, global polarity-reversal invariance, smooth group velocity dependence, and local branch uniqueness modulo center and phase imply $P(\mathbf u)=P(-\mathbf u)$, so the first-order period coefficient vanishes. This fails as a branch statement if the symmetry exchanges two inequivalent moving branches, the rest record is chiral or nonplanar, or the retained-history rule distinguishes group velocity directions.

Second, no real linear map of the restricted form

$$
T'=\alpha T+\lambda x_\parallel,
\qquad
x_\parallel'=\frac{x_\parallel}{\gamma_f}+\beta T,
\qquad
\mathbf x_\perp'=\mathbf x_\perp
$$

[View →](../../../../equation-mapping.html#corpus-equation-ec622d7b2b0d86e0)

preserves every causal-root quadratic at nonzero group velocity, because coefficient matching requires $c_f^2\lambda^2=\gamma_f^{-2}-1=-u^2/c_f^2<0$. This is an exact no-go only for that complete map class; a wider class that also changes transverse lengths lies outside the claim. Neither result is evidence that a translating branch exists.

Plainly: symmetry removes one cheap linear-period test, and the restricted map cannot manufacture the desired branch. The delayed dynamics still has to find or reject the branch directly.

The moving-branch test also has a root-starvation obligation. If a forward transmitter root has minimum forward separation $d_{\min}$ in the direction of motion, then the causal delay needed to receive that root obeys the elementary bound
$$
\Delta_{\mathrm{forward}}(u)\geq \frac{d_{\min}}{c_f-u}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-bfe09dc75a000d92)
This divergence is stronger than the Lorentz factor divergence,
$$
\gamma_f(u)\sim(c_f-u)^{-1/2},
$$

[View →](../../../../equation-mapping.html#corpus-equation-4b089642eac934b5)
as $u\to c_f^-$. Therefore a bare translating binary cannot be promoted to the Lorentz handoff merely by showing that one clock period stretches. It must also show that the locked branch retains enough memory depth to supply the forward roots it claims. One diagnostic target is
$$
\mathcal{R}_{\mathrm{Lor\text{-}root}}(u)
=
\frac{\Delta_{\mathrm{forward}}(u)/P_u}
{M_b^{\mathrm{mem}}(u)+\epsilon_h},
\qquad
M_b^{\mathrm{mem}}(u)=\frac{h_b^{\mathrm{lock}}(u)}{P_u},
$$

[View →](../../../../equation-mapping.html#corpus-equation-e324194a02a56819)
where $h_b^{\mathrm{lock}}$ is the declared retained-history depth of the moving branch and $\epsilon_h>0$ is a fixed normalization floor. If this residual diverges on the finite-$\eta$ moving chart, the two-body branch has run out of retained causal roots before it has derived Lorentz closure; the handoff must then move to a Noether-sea or larger assembly response rather than being booked as a bare-binary result.

On a declared smooth simple-root history, the companion canonical weight scales as

$$
\frac{1}{r^2}\frac{c_f}{|D_t|}
\sim
\frac{c_f-u}{c_fd_{\min}^2}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-e96c7e69227c7e82)

The forward hit therefore weakens linearly in the gap while its delay diverges. A finite window can still remove it discontinuously at the retained boundary. This local result neither fixes the branch period nor interprets numerical history truncation as a physical memory law; it also fails if the same root approaches a transmitter-side fold.

Plainly: an older forward hit can become weaker while remaining necessary to the declared ledger. Losing it at a finite window is a separate boundary event.

The branch-qualified symbol matters: $h_b^{\mathrm{lock}}$ is the measured retained-history depth of this locked moving branch, whereas bare $h$ later denotes a generic history-space horizon. A translating-branch certificate must report $h_b^{\mathrm{lock}}$ rather than silently substituting the generic horizon.

Equivalently, with finite retained memory $h_b^{\mathrm{lock}}$, the bare translating binary hits a root-ledger wall at
$$
u_{\mathrm{crit}}
=
c_f-\frac{d_{\min}}{h_b^{\mathrm{lock}}},
$$

[View →](../../../../equation-mapping.html#corpus-equation-a12c1a15fd910bca)
for any retained forward record with separation floor $d_{\min}$. At or above this wall that record exits the memory window, so the active causal-root ledger cannot be preserved on the same two-body chart. This is the binary-level version of the forward partner-root starvation theorem in [Master Equation](master-equation.md#delay-map-theorem-pack-formalized): the obstruction is kinematic/topological before it is an acceleration-balance residual.

Let $C_i(T_t)$ denote the causal wake surface emitted by architrino $i$ at emission time $T_t$. For uniform circular motion, self-hit events are discrete intersections between the worldline and its own wake surfaces. Define the **principal self-delay angle** $\tilde{\delta}_s \in (0, \pi]$ as the minimal angular separation between the current position and the emission point that yields a hit. Additional self-hits occur at longer delays indexed by winding number $m \ge 0$, giving a discrete family $\delta_s(m) = \tilde{\delta}_s + 2\pi m$.

#### Phase Angles and Delays

Let $\delta_s$ and $\delta_p$ denote the angular phase separations (measured along the circle) between:
- **Self** (same architrino): Current position -> its own past emission position that hits "now."
  - Causal delay: $\Delta_s$; angular separation: $\delta_s = \omega \Delta_s$.
  - Chord length: $r_s = 2R \sin(\delta_s / 2)$.
 
- **Partner** (other architrino): Current position -> partner's past emission position that hits "now."
  - Causal delay: $\Delta_p$; angular separation: $\delta_p = \omega \Delta_p$.
  - Chord length: $r_p = 2R \cos(\delta_p / 2)$.

#### Causal-Time Constraints in Normalized Field-Speed Units

For a signal to travel from emission point to reception point:
$$
r = c_f \cdot \Delta \quad \Rightarrow \quad r = \Delta \quad \text{(in units where } c_f = 1\text{)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5d72250b685366bf)

This yields two delay equations:

1. **Self-hit**:
  $$
  \delta_s = \omega \Delta_s = \omega \cdot r_s = \omega \cdot 2R \sin(\delta_s / 2) = 2s \sin(\delta_s / 2)
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-679084cba0182b7a)

2. **Partner hit**:
  $$
  \delta_p = \omega \Delta_p = \omega \cdot r_p = \omega \cdot 2R \cos(\delta_p / 2) = 2s \cos(\delta_p / 2)
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-c0098e33ef4500fd)

**These two transcendental equations determine** $(\delta_s, \delta_p)$ **as functions of speed** $s$.

**Circular-branch threshold**: On this uniform circular branch, self-hit roots exist only when $s > 1$ (i.e., $\|\mathbf V\| > c_f$). For $s \le 1$, no self-hit roots occur on the circular chart. This is a branch-specific root result, not a general speed-only criterion for arbitrary histories.

---

#### Principal Partner-Root Certificate

For the partner branch, write the full delay angle as
$$
\phi=\omega\Delta
$$

[View →](../../../../equation-mapping.html#corpus-equation-f2f257da55db47df)
and the chapter speed ratio as
$$
\beta_f=\frac{\omega R}{c_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-19e481375424b42f)
In this non-translating circular certificate, $\beta_f$ is the same speed ratio denoted $s$ elsewhere in the chapter. The principal partner-root equation is
$$
2\beta_f\cos\frac{\phi}{2}=\phi,
\qquad
0<\phi<\pi
$$

[View →](../../../../equation-mapping.html#corpus-equation-dd3c84cc0800fa6e)
The function $F(\phi)=2\beta_f\cos(\phi/2)-\phi$ satisfies $F(0)=2\beta_f>0$, $F(\pi)=-\pi$, and
$$
F'(\phi)=-\beta_f\sin\frac{\phi}{2}-1<0
$$

[View →](../../../../equation-mapping.html#corpus-equation-ca2a51f9363e76b5)
on $(0,\pi)$. Therefore the principal partner root exists and is unique for every $\beta_f>0$.

The same conclusion gives a derived transversality floor. On the principal partner branch,
$$
J_p=1+\beta_f\sin\frac{\phi}{2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c58a6a7553be6587)
so the dimensional root-transversality quantity is
$$
\kappa_{\mathrm{hit}}^{\mathrm{bin}}
\equiv
\left|
c_f-\hat{\mathbf r}\cdot\mathbf V_j(T-\Delta)
\right|
=
c_f\left(1+\beta_f\sin\frac{\phi}{2}\right)
>
c_f
$$

[View →](../../../../equation-mapping.html#corpus-equation-03f0682d60a16f1c)
This floor is not an admissibility parameter for the principal branch; it is a computed property of the circular geometry. It certifies that the simple-root chart cannot fail by partner-root tangency on the principal partner branch.

The instantaneous radial-balance equation is also closed form. Setting the inward partner radial acceleration equal to the required centripetal acceleration gives
$$
\frac{\beta_f^2c_f^2}{R}
=
\frac{\kappa\epsilon^2}
{4R^2\cos(\phi/2)J_p}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0d4201e774ca3534)
and therefore, with $R_*=\kappa\epsilon^2/c_f^2$,
$$
\frac{R}{R_*}
=
\frac{1}
{4\beta_f^2\cos(\phi/2)J_p}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4fad02f6365fca11)
As $\beta_f\to0$, the root satisfies $\phi\sim2\beta_f$, and the balance reduces to
$$
\omega^2R^3=\frac{\kappa\epsilon^2}{4}
$$

[View →](../../../../equation-mapping.html#corpus-equation-874ac7b8086a1de5)
which is the delayed Coulomb-Kepler scaling for the isolated opposite-polarity pair.

The same principal branch still cannot be a uniform orbit. The delayed partner line of action has a forward tangential projection, so
$$
a_\theta^{(\mathrm{part})}
=
\frac{\kappa\epsilon^2\sin(\phi/2)}
{4R^2\cos^2(\phi/2)J_p}
>
0
$$

[View →](../../../../equation-mapping.html#corpus-equation-f18f2f353f33b583)
and the instantaneous work rate satisfies $A_\theta^{(\mathrm{part})}R\omega>0$. Thus the principal branch has positive tangential work in the partner-only circular reduction: it gives the radial family above, but it also pumps tangential energy. A constant-speed circular binary therefore requires a signed multi-root tangential residual
$$
\sum_{T_t\in\mathcal{C}_{12}(T)}A_\theta^{(12)}(T;T_t)
+
\sum_{T_t\in\mathcal{C}_{11}(T)}A_\theta^{(11)}(T;T_t)
=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-6d474b13a9ba4ecb)
on the retained ledger, or an explicitly retained wake-flux channel in the finite-window energy ledger. Since circular self-hit roots require super-field-speed history on this branch, an MCB candidate using the self-hit barrier must live on the super-field-speed side of the circular ledger rather than on the principal partner branch alone.

Additional partner roots are not speculative. The full delay-angle equation is
$$
\phi=2\beta_f\left|\cos\frac{\phi}{2}\right|,
\qquad
\phi>0,
$$

[View →](../../../../equation-mapping.html#corpus-equation-3e24b4ed75e3a368)
and the retained ledger must record the sheet sign
$$
\sigma_p=\operatorname{sign}\!\left(\cos\frac{\phi}{2}\right).
$$

[View →](../../../../equation-mapping.html#corpus-equation-5e86613c4eaf9f85)
Positive-cosine and negative-cosine windows both contain admissible partner sheets. The principal root lies on the positive sheet in $(0,\pi)$. Higher positive-sheet pairs appear when the corresponding window maximum reaches zero:
$$
\sqrt{\beta_f^2-1}
+
\arcsin\frac{1}{\beta_f}
=
2\pi k
$$

[View →](../../../../equation-mapping.html#corpus-equation-1b5263e714814f61)
for $k\ge1$. At equality the two roots are born at a tangency; above it they thicken the partner-hit ledger. Negative-sheet partner roots are represented by $\phi=2\pi m-\alpha_p$ in the signed-sheet notation below. The first such branch is born at the minimum of
$$
\beta_-(\alpha_p)
=
\frac{2\pi-\alpha_p}{2\cos(\alpha_p/2)},
\qquad
0<\alpha_p<\pi,
$$

[View →](../../../../equation-mapping.html#corpus-equation-f5b62cfd3e5010ef)
whose tangency condition is $\tan(\alpha_p/2)=2/(2\pi-\alpha_p)$. It carries the opposite tangential sign. The root census is therefore a computed signed branch diagram rather than a positive-window-only conjecture.

#### Signed Root Census and Speed Ladder

**Root**: An emission time $T_t < T_r$ (from either self or partner) that satisfies the causal constraint $r = c_f (T_r - T_t)$ and produces a hit at reception time $T_r$.

**Integer-indexed older roots (winding numbers)**:

Let $\tilde{\delta}_s \in (0, \pi]$ and $\tilde{\delta}_p \in (0, \pi)$ denote the **minimal (principal) angular separations** that determine the chord lengths and acceleration directions. The partner endpoint is open because $\tilde{\delta}_p=\pi$ makes the partner chord length vanish and the inverse-square coefficient singular; the self endpoint remains closed and carries zero tangential projection.

In the same-sheet convention used for the first circular no-go, the full families of causal delays are:

- **Self**: 
 $$
 \delta_s(m) = \tilde{\delta}_s + 2\pi m = 2s \sin(\tilde{\delta}_s / 2), \quad m = 0, 1, 2, \dots
 $$

 [View →](../../../../equation-mapping.html#corpus-equation-6b3508d6d529e695)
 
- **Partner**: 
 $$
 \delta_p(m) = \tilde{\delta}_p + 2\pi m = 2s \cos(\tilde{\delta}_p / 2), \quad m = 0, 1, 2, \dots
 $$

 [View →](../../../../equation-mapping.html#corpus-equation-d24b00d3b8013558)

**Geometric interpretation**:
- The minimal separations $\tilde{\delta}_s$, $\tilde{\delta}_p$ determine the **same-sheet principal geometry** (chord lengths, acceleration directions).
- The winding index $m$ affects **timing/ordering** of multiple hits inside that same-sheet convention.

**Signed-sheet completion:** A full circular root certificate must also track whether the full delay angle is represented as $2\pi m+\alpha$ or $2\pi m-\alpha$, with $\alpha_s\in(0,\pi]$ for self roots and $\alpha_p\in(0,\pi)$ for partner roots. The same-sheet convention is the quotient that forgets the orientation of the delay direction; the signed sheet $\sigma\in\{+1,-1\}$ lifts the circular root to the orientation double cover of the retained delay strip. Opposite signed sheets can reverse the tangential projection of a self-hit line of action. The sign-invariant statements below are therefore certified only on the same-sheet principal branch chart unless the signed sheet has been explicitly included in the root ledger.

For the full signed ledger, write
$$
\Delta_s^{\sigma,m}=2\pi m+\sigma\alpha_s,
\qquad
\Delta_p^{\sigma,m}=2\pi m+\sigma\alpha_p,
\qquad
\sigma\in\{+1,-1\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4b8936a3ab67cdda)
with $\sigma=-1$ requiring $m\ge1$. The signed circular root equations become
$$
2\pi m+\sigma\alpha_s=2s\sin(\alpha_s/2),
\qquad
2\pi m+\sigma\alpha_p=2s\cos(\alpha_p/2)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5cbb5c55957b27ff)
The corresponding tangential signs are $\sigma\cos(\alpha_s/2)$ for self roots and $\sigma\sin(\alpha_p/2)$ for partner roots, up to positive branch weights. The signed sheet is therefore not a cosmetic ledger choice: it is the first place the bare circular kernel can acquire a tangential contribution with the opposite sign from the same-sheet no-go record.

| Transmitter identity | Sheet | Allowed winding | Tangential sign away from endpoints | First boundary |
| --- | --- | ---: | ---: | ---: |
| Partner | $\sigma=+1$ | $m\ge0$ | positive | principal branch for all $s>0$; first older positive-sheet representation at $s=\pi$ |
| Partner | $\sigma=-1$ | $m\ge1$ | negative | first interior tangency at $s=s_{p,-}^\star$ |
| Self | $\sigma=+1$ | $m\ge0$ | positive | principal branch at $s=1$; first older branch at $s=s_1^\star$ |
| Self | $\sigma=-1$ | $m\ge1$ | negative | first boundary at $s=\pi/2$ |

The consolidated structural speed ladder of the circular atlas is therefore

| Speed | Root-ledger event |
| ---: | --- |
| $s=1$ | principal positive-sheet self root enters from $\alpha_s=0$ |
| $s=\pi/2$ | first negative-sheet self root enters at $\alpha_s=\pi$ |
| $s=s_{p,-}^\star\approx2.97169$ | first negative-sheet partner pair is born at an interior tangency |
| $s=\pi$ | a negative-partner branch reaches $\alpha_p=0$ and continues onto the first older positive-sheet representation |
| $s=s_1^\star\approx4.60334$ | first older positive-sheet self pair is born at an interior tangency |

The negative-partner threshold and the first older positive-self threshold are fixed by
$$
s_{p,-}^\star
=
\min_{0<\alpha<\pi}
\frac{2\pi-\alpha}{2\cos(\alpha/2)}
\approx
2.97169,
\qquad
\sqrt{(s_1^\star)^2-1}
-
\arccos\!\left(\frac{1}{s_1^\star}\right)
=
\pi.
$$

[View →](../../../../equation-mapping.html#corpus-equation-9221dccabe0a9274)

The first negative self sheet, $m=1,\sigma=-1$, obeys
$$
2\pi-\alpha=2s\sin(\alpha/2)
$$

[View →](../../../../equation-mapping.html#corpus-equation-ff6bb373ed56f825)
and appears at $s=\pi/2$ with $\alpha=\pi$. Equivalently, at the threshold a wake crosses the diameter $2R$ in time $2R/c_f$, while the transmitter advances half a circumference $\pi R$ at speed $s c_f$; the equality $\pi R=s c_f(2R/c_f)$ gives $s=\pi/2$. For $s>\pi/2$ it contributes negative tangential drive. This does not prove circular closure, but it makes the $\sigma=-1$ sheet the first internal generator capable of carrying opposite period in the tangential cohomology class. A useful floor conjecture is:

> No isolated, bare, constant-speed circular MCB branch can close for $s<\pi/2$, because the first negative same-transmitter sheet is absent and the same-sheet tangential cohomology class has no internal cancellation generator. In cochain language, the space available to the retained two-body ledger has no opposite-period self-record before the $\sigma=-1$ wall at $s=\pi/2$.

The decision procedure is finite on any compact speed interval below $\pi/2$: enumerate the full signed partner and self-root ledger, certify the inactive gaps and positive $|J|$ floors, include the finite-window wake boundary term, and evaluate the signed tangential period. A retained negative-period root, a zero total period with closed wake flux, or a branch missed by the enumeration falsifies the floor conjecture.

For $s\geq\pi/2$, closure is still not automatic. The negative sheet must survive the finite-$\eta$ branch chart, satisfy the Jacobian and inactive-gap floors, and balance the remaining tangential class through signed-root cancellation, wake escapement, or multi-body exchange.

---

### Per-Hit Directions and Acceleration Components

#### Local Coordinate Frame at Receiver

- **Radial outward**: $\hat{e}_r$ (from rotation center toward receiver).
- **Tangential**: $\hat{e}_t$ (direction of motion along circle).

#### Unit Directions from Emission to Reception

**Self-hit**:
$$
\hat{u}_s = \sin(\delta_s / 2) \, \hat{e}_r + \cos(\delta_s / 2) \, \hat{e}_t
$$

[View →](../../../../equation-mapping.html#corpus-equation-d528317cc5516f91)

**Partner hit** (geometric chord across circle):
$$
\hat{u}_p = \cos(\delta_p / 2) \, \hat{e}_r - \sin(\delta_p / 2) \, \hat{e}_t
$$

[View →](../../../../equation-mapping.html#corpus-equation-999fc8e5bd526ce2)

#### Canonical Per-Hit Accelerations

Using the delayed law with line-of-action direction and transmitter-side acceleration weight (where $\kappa$ is a coupling constant and $\epsilon = |e|/6$), define the same-root factors

$$
W_s^{\mathrm{acc}}=\frac{c_f}{|D_{t,s}|},
\qquad
W_p^{\mathrm{acc}}=\frac{c_f}{|D_{t,p}|}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-345420b59d5b4f34)

The canonical per-hit acceleration contributions are

$$
\mathbf A_s = +\kappa \epsilon^2 \frac{W_s^{\mathrm{acc}}}{r_s^2} \hat{u}_s,
\qquad
\mathbf A_p = -\kappa \epsilon^2 \frac{W_p^{\mathrm{acc}}}{r_p^2} \hat{u}_p.
$$

[View →](../../../../equation-mapping.html#corpus-equation-8283dd3ffa815b21)

On the non-translating symmetric circular benchmark, the equal-projection lemma gives $D_r=D_t$ on every retained self or partner chord, so signed root playback is one. The acceleration weights remain $W_s^{\mathrm{acc}}=1/|J_s|$ and $W_p^{\mathrm{acc}}=1/J_p$. The circular canonical contributions are

$$
\mathbf A_s = +\kappa \epsilon^2 \frac{1}{r_s^2|J_s|} \hat{u}_s,
\qquad
\mathbf A_p = -\kappa \epsilon^2 \frac{1}{r_p^2J_p} \hat{u}_p.
$$

[View →](../../../../equation-mapping.html#corpus-equation-46fc98c0ea86dc48)

The transmitter-side factors remain the root-density and transversality diagnostics:

$$
J_s \equiv 1-\frac{\mathbf V_{\text{self}}(T_t)\cdot \hat{u}_s}{c_f},
\qquad
J_p \equiv 1-\frac{\mathbf V_{\text{partner}}(T_t)\cdot \hat{u}_p}{c_f}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-222a78eb8bf4caf1)

---

#### Explicit Circular Jacobians

For the symmetric circular geometry, the transmitter velocities can be resolved exactly against the line-of-action directions:
$$
\mathbf V_{\text{self}}(T_t)\cdot \hat{u}_s = s\cos(\delta_s/2),
\qquad
\mathbf V_{\text{partner}}(T_t)\cdot \hat{u}_p = -s\sin(\delta_p/2)
$$

[View →](../../../../equation-mapping.html#corpus-equation-3f67145e70534eba)
Hence the branch Jacobians reduce to
$$
J_s = 1-s\cos(\delta_s/2),
\qquad
J_p = 1+s\sin(\delta_p/2)
$$

[View →](../../../../equation-mapping.html#corpus-equation-a1fa1ea81d573082)
Using the delay constraints gives equivalent forms
$$
J_s = 1-\frac{\delta_s}{2}\cot(\delta_s/2),
\qquad
J_p = 1+\frac{\delta_p}{2}\tan(\delta_p/2)
$$

[View →](../../../../equation-mapping.html#corpus-equation-e20a3822a1516ea4)
These formulas make the transmitter-side transversality asymmetry between the two branch types explicit:

- The partner branch always satisfies $J_p > 1$, so its transmitter-side acceleration is diluted relative to a static inverse-square surrogate.
- The self branch can satisfy $J_s \to 0^+$, producing the causal bunching that sharpens self-hit into a null-separatrix wall for root density, action counting, and finite-$\eta$ branch certification.

---

#### Transmitter-Side Radial and Tangential Diagnostics

Define **inward radial** as positive (toward center) and **tangential** as positive in direction of motion.

The projections in this subsection are transmitter-side circular diagnostics. They record root playback and root geometry, but they are not canonical Master EOM acceleration contributions until the same retained branches are recomputed with $D_t$, $D_r$, and $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$.

**Chord lengths**:
$$
r_s = 2R \sin(\delta_s / 2), \quad r_p = 2R \cos(\delta_p / 2)
$$

[View →](../../../../equation-mapping.html#corpus-equation-2aa860050763be5e)

**Inward radial diagnostic components**:

- **Self** (repulsive -> outward -> negative):
 $$
	 A_{s,\text{rad}}^{t} = -\kappa \epsilon^2 \frac{\sin(\delta_s / 2)}{r_s^2\,|J_s|} = -\frac{\kappa \epsilon^2}{4R^2 \sin(\delta_s / 2)\,|J_s|}
 $$

 [View →](../../../../equation-mapping.html#corpus-equation-ec403851e72cedfe)

- **Partner** (attractive -> inward -> positive):
 $$
	 A_{p,\text{rad}}^{t} = +\kappa \epsilon^2 \frac{\cos(\delta_p / 2)}{r_p^2\,|J_p|} = +\frac{\kappa \epsilon^2}{4R^2 \cos(\delta_p / 2)\,|J_p|}
 $$

 [View →](../../../../equation-mapping.html#corpus-equation-3aa80ae0062942b8)

**Net inward radial diagnostic**:
$$
A_{\text{rad}}^{t} = \frac{\kappa \epsilon^2}{4R^2} \left( \frac{1}{\cos(\delta_p / 2)\,|J_p|} - \frac{1}{\sin(\delta_s / 2)\,|J_s|} \right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-49d425561ed2044a)

**Tangential diagnostic components**:

- **Self**:
 $$
	 T_s^{t} = +\kappa \epsilon^2 \frac{\cos(\delta_s / 2)}{r_s^2\,|J_s|} = \frac{\kappa \epsilon^2 \cos(\delta_s / 2)}{4R^2 \sin^2(\delta_s / 2)\,|J_s|}
 $$

 [View →](../../../../equation-mapping.html#corpus-equation-9b5af381c8c1e16e)

- **Partner**:
 $$
	 T_p^{t} = +\kappa \epsilon^2 \frac{\sin(\delta_p / 2)}{r_p^2\,|J_p|} = \frac{\kappa \epsilon^2 \sin(\delta_p / 2)}{4R^2 \cos^2(\delta_p / 2)\,|J_p|}
 $$

 [View →](../../../../equation-mapping.html#corpus-equation-84fa67ffb7a47f8f)

**Net tangential diagnostic**:
$$
T^{t} = T_s^{t} + T_p^{t}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2a5247be966ed03d)

---

#### Sub-Field-Speed Simplification

When $s \le 1$, self-hits do not occur ($\delta_s$ has no solution). Only the partner contributes to this transmitter-side diagnostic:

$$
T^{t}(s \le 1) = T_p^{t} = \frac{\kappa \epsilon^2}{4R^2} \frac{\sin(\delta_p / 2)}{\cos^2(\delta_p / 2)\,|J_p|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1d7442a967d9b4c9)

Using the delay relation $\delta_p = 2s \cos(\delta_p / 2)$:

$$
T^{t}(s \le 1) = \frac{\kappa \epsilon^2 s^2}{R^2} \frac{\sin(\delta_p / 2)}{\delta_p^2\,|J_p|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7e6136bf8133adc8)

Because $J_p = 1+s\sin(\delta_p/2) > 1$, the transmitter-side delay geometry weakens the canonical contribution relative to a stripped inverse-square surrogate by the factor $1/J_p$. Its tangential sign remains positive. For $s\le1$, the full signed census contains only this principal partner root: no self root, older positive partner root, or negative sheet is active. A particle-only constant-speed circular orbit is therefore excluded on the full circular root ledger throughout the sub-field-speed regime. A causal retained-history account is still required for any broader conservation claim.

---

### Requirements for True Circular Orbit (Working Hypothesis)

For uniform circular motion at fixed radius $R$ and constant speed $s$:

1. **Receiver-side centripetal balance**:
  $$
  A_{\text{rad}}^{\mathrm{rec}} = \frac{s^2}{R}
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-a0642be4451c6de4)

2. **Finite-window energy balance**:
  $$
  \left\langle
  \frac{dK_{\mu}}{dT}
  \right\rangle_W
  +
  \left\langle
  \Phi_{\mathrm{wake},\partial W}
  \right\rangle_W
  =
  0
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-26557bc502288453)
  Here $K_{\mu}$ is the chosen quadratic kinetic proxy and $\Phi_{\mathrm{wake},\partial W}$ is the causal-wake energy flux through the boundary of the local window. The older shorthand $\langle T\rangle=0$ is valid only for a particle-only closed window with no boundary wake flux.

  On a declared branch chart $b$, this balance has an operational work record:
  $$
  P_{b,\mathrm{work}}^{(\eta)}(T)
  =
  \sum_i
  \mu_{\text{arch}}\,
  \mathbf A_{i,b}^{(\eta)}(T)
  \cdot
  \mathbf V_i(T)
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-9ad8965a858b7e5b)
  For a circular constant-speed benchmark, $\mathbf V_i$ is tangent to the orbit and the radial record does no instantaneous work, so
  $$
  \left\langle
  P_{b,\mathrm{work}}^{(\eta)}
  \right\rangle_{P_b}
  =
  \mu_{\text{arch}}\,s_b\,
  \left\langle
  A_{\eta,b}^{\mathrm{tan}}
  \right\rangle_{P_b}
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-7fb3fe13d2d79f07)
  for the quadratic proxy. Thus the tangential term is not merely a geometric nuisance; it is the first constructive entry in the binary wake-energy ledger. If the primitive kinetic scalar is used instead, replace $\mu_{\text{arch}}$ by $\mu_K(\|\mathbf V_i\|)$ inside the summed power.

---

#### Tangential Drive and Wake Escapement

**Theorem (Same-sheet no-go for constant-speed circular orbit in the bare two-body kernel).** In the symmetric, non-translating circular binary with canonical delayed radial acceleration contributions only, and with active roots restricted to the same-sheet principal branch chart defined above, the net tangential acceleration is strictly positive whenever at least one causal root contributes.

$$
T_{\mathrm{net}}
=
\sum_{m\in\mathcal{M}_p} w_{p,m} T_{p,m}
\;+\;
\sum_{m\in\mathcal{M}_s} w_{s,m} T_{s,m}
>0
$$

[View →](../../../../equation-mapping.html#corpus-equation-ed91b29f8aba3607)
where $w_{p,m},w_{s,m}\ge 0$ are same-root transmitter-side weights induced by $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$ and any declared regularization/time averaging, and $\mathcal{M}_p,\mathcal{M}_s$ are active partner/self root sets.

*Proof.*  
For any active partner branch, the tangential contribution is
$$
T_{p,m}
=
\frac{\kappa\epsilon^2}{4R^2}
\frac{\sin(\tilde{\delta}_{p,m}/2)}{\cos^2(\tilde{\delta}_{p,m}/2)}
>0,
\qquad \tilde{\delta}_{p,m}\in(0,\pi)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5c31b988a2090bd0)
and for any active self branch (when present),
$$
T_{s,m}
=
\frac{\kappa\epsilon^2}{4R^2}
\frac{\cos(\tilde{\delta}_{s,m}/2)}{\sin^2(\tilde{\delta}_{s,m}/2)}
\ge0,
\qquad \tilde{\delta}_{s,m}\in(0,\pi]
$$

[View →](../../../../equation-mapping.html#corpus-equation-cd922f4c09761daf)
The sign is branch-invariant on this same-sheet chart because winding changes timing, not chord orientation. Therefore each summand in $T_{\mathrm{net}}$ is nonnegative. The always-present principal partner root is strictly positive, including when a self branch sits at its endpoint with zero tangential projection. Hence $T_{\mathrm{net}}>0$ on the certified chart. $\square$

**Corollary.**  
Within the same-sheet bare isolated two-body kernel, an exact constant-speed circular orbit with no boundary wake-state exchange is impossible. Any MCB-like steady state must therefore close a finite-window balance: signed-root cancellation may reduce the local tangential drive, but any remaining forward kinetic-rate change must close against the causal wake state or genuinely multi-body Noether braid exchange.

**Interpretation.** The positive tangential component is not merely an obstruction to be erased. In a finite local window, partner and self wakes are continually emitted while only a subset of their causal isochrons later hit a local receiver. A local binary can be called conservative only if the retained causal wake state, its boundary exchange, and the active-root record close energy, momentum, and angular momentum on the same update.

**Cohomology reading.** On a closed circular branch, write $\theta$ for the receiver phase and let
$$
\omega_T^{(b)} = R\,T_{\mathrm{net}}^{(b)}(\theta)\,d\theta
$$

[View →](../../../../equation-mapping.html#corpus-equation-19c31bb40d3a5aef)
be the tangential torque one-form on the retained signed ledger $b$. Same-sheet records give a positive period integral,
$$
\oint_{S^1}\omega_T^{(b)}>0,
$$

[View →](../../../../equation-mapping.html#corpus-equation-bcd3689fdb93dd85)
so $[\omega_T^{(b)}]\ne0$ in $H^1(S^1)$ and $\omega_T^{(b)}$ is not an exact derivative of a single-valued mechanical angular-momentum potential on the particle-only chart. Closure requires a coboundary supplied by retained non-particle channels:
$$
\left[\omega_T^{(b)}
+\omega_{\partial W}^{(b)}
+\omega_{\mathrm{wake}}^{(b)}
+\omega_{\mathrm{multi}}^{(b)}
\right]=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-ae449c3f33bf0eff)
in the cycle cohomology of the branch chart. A compact escaped-action diagnostic is
$$
N_{\mathrm{esc}}^{(b)}
=
\frac{\mu_{\text{arch}}}{h_{\mathrm{act}}}
\int_0^{P_b} R\,T_{\mathrm{net}}^{(b)}(T)\,dT
=
\frac{\mu_{\text{arch}}}{h_{\mathrm{act}}\,\omega_b}
\oint R\,T_{\mathrm{net}}^{(b)}(\theta)\,d\theta,
$$

[View →](../../../../equation-mapping.html#corpus-equation-5ee2d900406f5b30)
where $h_{\mathrm{act}}$ is the declared action unit used by the branch packet and the second equality assumes a uniform circular benchmark. It is distinct from the retained-history depth $h$. If the primitive kinetic scalar is used instead of the quadratic proxy, the same packet must replace $\mu_{\text{arch}}$ by the declared $\mu_K$ entry. A bare two-body circular closure can pass only when this class is cancelled by an explicitly retained signed sheet, causal wake-state, boundary, or multi-body exchange entry.

**Plain language**: On the same-sheet chart, the isolated pair shows persistent tangential drive at the per-hit level; cancellation is hard because every certified root accelerates the same way. The stable-branch question is whether one causal wake-state or multi-body update closes that drive without destroying the retained branch. This is a primary test of the MCB attractor hypothesis.

---

### What "Maximum Curvature" Demands

**Mechanism summary (self-hit balance):** once $s>1$, each self-hit contributes a **repulsive acceleration away from its own past emission point**. In the symmetric circular geometry that repulsion has a radial outward component and a signed tangential component. As the radius shrinks, both partner attraction and self-hit repulsion scale like $1/R^2$ times their transmitter-side weights $1/|J|$. Maximum curvature would require the outward self-hit radial component to balance the inward partner pull without the tangential sum destroying constant-speed closure, and the coincident self-root birth must first have a finite accepted event treatment.

The non-translating symmetric circular radial target is therefore the transmitter-side weighted acceleration contribution:

$$
A_{\text{rad}} = \frac{\kappa \epsilon^2}{4R^2} \left( \frac{1}{\cos(\delta_p / 2)J_p} - \frac{1}{\sin(\delta_s / 2)|J_s|} \right).
$$

[View →](../../../../equation-mapping.html#corpus-equation-9aef3ea1a516f4b5)

For translating, deformed, or non-circular branches, this target must be restored to the same-root form with $W_{\bullet}^{\mathrm{acc}}=c_f/|D_{t,\bullet}|$, with $D_{r,\bullet}/D_{t,\bullet}$ retained separately for root playback.

**Increasing curvature** ($1/R$ larger, so $R$ smaller) requires **stronger inward radial acceleration**. This occurs when:

1. **$\delta_p$ increases** -> $\cos(\delta_p / 2)$ decreases -> partner term $1/\cos(\delta_p / 2)$ **increases** (stronger inward pull).
2. **$\delta_s$ increases** -> $\sin(\delta_s / 2)$ increases -> the geometric part of the self term decreases, while the full outward response still depends on the same-root transmitter-side acceleration weight $W_s^{\mathrm{acc}}$.

Two distinct balance mechanisms are now mathematically visible:

1. **Near-threshold inverse-distance hinge plus transmitter-side fold.** On the principal self branch, $D_t$ loses its floor as $s\downarrow 1^+$, and the transmitter-side acceleration weight diverges as $1/|D_t|$. The coincident branch birth therefore remains a failed singular event until a finite regulator-independent transition is certified.

2. **Higher-speed multi-branch redistribution.** At larger $s$, additional self branches turn on and redistribute the outward response across several winding sectors. In that regime the detailed balance depends on the full transmitter-side weighted sum over all active branches rather than on the principal branch alone.

**Current status**: The same-sheet per-hit $T>0$ result excludes only the restricted same-sheet chart. The complete unregularized signed simple-root ledger has algebraic circular candidates, beginning near $s=3.07036$, so existence is measured rather than excluded on that chart. The maximum-curvature state remains uncertified for the isolated two-body system because finite-event continuation, retained-history persistence, wake-boundary closure, and return-map stability have not been established.

Because the desired MCB branch is expected to graze the $J=0$ wall, the stability target is not only a smooth Floquet calculation. On smooth arcs with a fixed ledger, Floquet multipliers are the right local test. At the null separatrix itself, the branch is a caustic-grazing limit cycle: the appropriate theorem target is an isolating block in history space that straddles the $J=0$ wall and has a persistent Conley index under finite-$\eta$ continuation. The concrete target is uniform index persistence: for sufficiently small $\eta>0$, the regularized return map must carry the same Conley index on one isolating neighborhood of the grazing orbit, with the finite-caustic impulse bound controlling the velocity jump through the wall. If the index changes as $\eta\to0^+$, the MCB is not a robust attractor. In that reading, the MCB branch is stable only if the orbit returns through the grazing chart without escaping the isolating block or changing its declared signed ledger except at the certified fold records.

---

### Emergent Properties and Measurement Standards

If a stable MCB exists, it provides a concrete **rod** and **clock** defined entirely by the two-body delay dynamics. Let
$$
d_0 := R_{\text{MCB}}, \qquad P_0 := \frac{2\pi}{\omega_{\text{MCB}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1f72dd4e4e729012)
The natural Layer-I two-body units are
$$
R_*=\frac{\kappa\epsilon^2}{c_f^2},
\qquad
T_*=\frac{R_*}{c_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-a18476ab029c629b)
so the first MCB outputs are the dimensionless ratios
$$
\frac{R_{\mathrm{MCB}}}{R_*},
\qquad
\frac{P_0}{T_*},
\qquad
\beta_{\mathrm{MCB}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e6cca7d00e47ed2e)
rather than additional fitted constants. Once $(c_f,\kappa,\epsilon)$ fixes the length, time, and polarity units, the signed-root ledger and stability problem must compute those ratios as pure numbers.

Then $d_0$ is the candidate fundamental length scale of the architecture, and $P_0$ is the candidate fundamental time scale. Their comparison with the wake propagation speed is the dimensionless MCB speed factor
$$
\beta_{\mathrm{MCB}}
=
\frac{R_{\mathrm{MCB}}\omega_{\mathrm{MCB}}}{c_f}
=
\frac{2\pi d_0}{c_fP_0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0259af4b1bc11ab2)
so the wake propagation speed is not an imposed architrino-speed limit. It is the propagation reference used to compare the MCB rod and clock, while individual architrinos may enter super-field-speed regimes with
$$
\|\mathbf V\|>c_f
$$

[View →](../../../../equation-mapping.html#corpus-equation-159a10b5ae5d31fe)

In this view, any ruler or clock built from architrino assemblies ultimately reduces to multiples of $(d_0, P_0)$. Measurement standards are therefore **dynamical invariants** of the two-body attractor: they persist because the underlying limit cycle (if realized) is stable and reproducible across assemblies.

A certified MCB would also define the first handedness marker. In the binary plane set
$$
\hat{\mathbf n}_{\mathrm{MCB}}
=
\hat{\mathbf r}\times\hat{\mathbf V},
$$

[View →](../../../../equation-mapping.html#corpus-equation-b1bce6b032776b52)
with $\hat{\mathbf r}$ pointing from the center to one chosen polarity record and $\hat{\mathbf V}$ its direction of motion. The two signs of $\hat{\mathbf n}_{\mathrm{MCB}}$ label two branch basins, $B_+$ and $B_-$, not two coordinate conventions. A branch-preserving deformation can rotate the plane, but it cannot flip this $\mathbb{Z}_2$ label without passing through a degeneracy where the circular plane, transmitter order, or signed causal-root ledger changes. Thus chirality is carried by the joint path-history and signed-root framing of the branch, not by a freely chosen drawing orientation.

This handedness claim is falsified by any continuous retained deformation from $B_+$ to $B_-$ that preserves a nondegenerate plane, transmitter order, the signed causal-root ledger, and all declared Jacobian floors throughout the path. Such a deformation would show that the proposed $\mathbb Z_2$ label is a chart convention rather than a branch invariant.

If the MCB does not exist as a stable attractor, these emergent standards must be replaced by whatever stable limit structure the dynamics actually support.

### Root Multiplicity vs. Speed

This section separates the two terminology axes used throughout the chapter:

- **Transmitter identity**: self-hit ($j=i$) or partner hit ($j\ne i$).
- **Root count**: single-root or multi-root on the current branch chart.

The self-hit onset is dynamically special because it introduces same-transmitter feedback and an outward self-repulsive channel. Partner multi-hit is still part of the same super-field-speed root topology: at higher speeds, older partner wake surfaces can also satisfy the causal-root condition and contribute additional inward channels.

In the same-sheet uniform circular, non-translating geometry, admissible self-roots are indexed by winding number $m \ge 0$ and minimal angular separation $\tilde{\delta}_s \in (0, \pi]$:

$$
\delta_s = \tilde{\delta}_s + 2\pi m = 2s \sin(\tilde{\delta}_s / 2)
$$

[View →](../../../../equation-mapping.html#corpus-equation-f28884b49ad67b66)

#### Counting Self-Hits by Winding Index

For fixed winding $m \ge 0$, define
$$
f_m(\delta;s)=2s\sin(\delta/2)-\delta-2\pi m,
\qquad \delta\in(0,\pi]
$$

[View →](../../../../equation-mapping.html#corpus-equation-aac7e4226c4dbf5c)
An $m$-branch same-sheet self-hit exists exactly when $f_m(\delta;s)=0$ has a solution in $(0,\pi]$.

- For the principal branch $m=0$, the threshold is sharp:
  $$
  s_0^\star = 1
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-f6c717f00f8d3a75)
- For higher winding numbers $m\ge 1$, the appearance threshold is determined by the tangency condition at the interior maximizer $f_m'(\delta;s)=0$, namely
  $$
  \cos(\delta^\star_m/2)=\frac{1}{s},
  \qquad
  \sqrt{(s_m^\star)^2-1}-\arccos\!\left(\frac{1}{s_m^\star}\right)=\pi m
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-1f9c6d29dc1762e6)

Thus the higher same-sheet self branches do not turn on at equally spaced speeds. Their onset is governed by a nonlinear sequence of tangencies of the delayed self-intersection curve. A full signed-root ledger must add the $\sigma=-1$ sheets described above; the first such negative self sheet appears at $s=\pi/2$, earlier than the first higher same-sheet self branch.

For large winding number $m$, the threshold has the asymptotic form
$$
s_m^\star = \pi m + \frac{\pi}{2} + O\!\left(\frac{1}{m}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-bfea2a29a2e9a7c7)
so the equally spaced picture is recovered only as a high-speed approximation.

**Note**: Straight-line motion admits **no self-hits** even if $s > 1$; **curvature is required**. The above statements apply specifically to uniform circular, non-translating geometry.

The self-hit root count is therefore a genuine branch-bifurcation diagram for the circular benchmark. Here
$$
s=\frac{\|\mathbf V\|}{c_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3549cb7a383b91c5)
is the chapter's speed ratio, equivalent to $\beta_f$ in the usual notation. Between neighboring branch-birth thresholds, the active self-root ledger $N_s(s)$ is constant and the same root labels can be transported. At the thresholds, the delay equation has a tangency and the newly born circular root lies on a Jacobian-null boundary. Thus the root census, the caustic locations, and the ledger-transition speeds are one computed object rather than three separate assumptions.

#### Root Ledger as a One-Parameter Morse Complex

For a fixed reception event on a one-parameter family of branch histories, write the root function as
$$
F_{ij}(T_t;s)
=
\|\mathbf X_i(T;s)-\mathbf X_j(T_t;s)\|
-c_f(T-T_t).
$$

[View →](../../../../equation-mapping.html#corpus-equation-e039ae2ca69de5bd)
Active causal roots are the zeros of $F_{ij}$. A branch birth or death is a fold record:
$$
F_{ij}=0,
\qquad
\partial_{T_t}F_{ij}=0,
\qquad
\partial_{T_t}^{2}F_{ij}\neq0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-5ae7567fc04d918b)
Away from those folds, the signed degree
$$
D_{ij}(s)
=
\sum_{T_t\in\mathcal{C}_{ij}(T;s)}
\operatorname{sign}\!\left(\partial_{T_t}F_{ij}(T_t;s)\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-c7591e4bdb50ca80)
is locally constant, while the unsigned counts $N_s$ and $M_p$ track the ranks of the same-transmitter and partner-root records. This is the binary version of the [assembly topological charge](../noether-braid/noether-braid-topological-charge.md): the later rank-three braid label $(N_s,M_p,c_1)$ uses the two root-complex integers from this chapter and the phase-return degree data from the resonance-lock chart. A solver that reports only raw root counts loses the signed degree needed to distinguish a true branch fold from a harmless relabeling of records.

#### Parameter-Free Circular Branch Packet

The circular two-body benchmark can now be stated as a parameter-free branch packet. Use the Layer-I units
$$
R_*=\frac{\kappa\epsilon^2}{c_f^2},
\qquad
\rho=\frac{R}{R_*},
\qquad
s=\frac{R\omega}{c_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4f1f4bf1ed5e3967)
and factor out the acceleration scale $c_f^2/R_*$. The remaining equations depend only on the dimensionless radius $\rho$, the speed ratio $s$, and the signed causal-root ledger.

For the principal partner branch, let $\xi_p=\delta_p/2$. The delay equation is
$$
\cos\xi_p=\frac{\xi_p}{s},
\qquad
0<\xi_p<\frac{\pi}{2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-cfa3ec6a61efb761)
with
$$
J_p=1+s\sin\xi_p
$$

[View →](../../../../equation-mapping.html#corpus-equation-969e1e922d667c33)
as the transmitter-side transversality diagnostic. For a general signed partner branch $\alpha_p=(\xi,\sigma,m)$, use
$$
2\pi m+2\sigma\xi=2s\cos\xi,
\qquad
J_p(\xi,\sigma;s)=1+\sigma s\sin\xi.
$$

[View →](../../../../equation-mapping.html#corpus-equation-6fb95ab7bbce2f30)
The canonically weighted circular acceleration coefficients are
$$
P_{\mathrm{rad}}(\xi,\sigma;s)=\frac{1}{\cos\xi\,|J_p|},
\qquad
P_{\mathrm{tan}}(\xi,\sigma;s)=\frac{\sigma\sin\xi}{\cos^2\xi\,|J_p|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4422a91942b79d59)
where radial is measured inward and tangential is measured in the direction of motion.

For a signed self branch $\alpha_s=(\xi,\sigma)$ in the full circular ledger, use
$$
\sigma\sin\xi=\frac{\xi}{s},
\qquad
\sigma=\operatorname{sign}(\sin\xi)
$$

[View →](../../../../equation-mapping.html#corpus-equation-48786dfa3d2c7508)
with
$$
J_s(\xi,\sigma;s)=1-s\sigma\cos\xi
$$

[View →](../../../../equation-mapping.html#corpus-equation-0c217ffbd2986532)
as the transmitter-side transversality diagnostic. The outward radial and signed tangential canonical circular coefficients are
$$
S_{\mathrm{rad}}(\xi,\sigma;s)=\frac{s}{\xi\,|J_s|},
\qquad
S_{\mathrm{tan}}(\xi,\sigma;s)=\frac{s^2\sigma\cos\xi}{\xi^2\,|J_s|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-dac177081b1631e8)
Higher self-root births occur at tangencies:
$$
\tan\xi^\star=\xi^\star,
\qquad
s^\star=|\sec\xi^\star|
$$

[View →](../../../../equation-mapping.html#corpus-equation-16c46242ccebe455)
and these births are also Jacobian-null events, $J_s=0$.

On a fixed signed ledger $b$, the dimensionless circular MCB candidate equations are therefore
$$
\mathcal{G}_{\mathrm{rad}}^{(b)}(\rho,s)
=
\frac{1}{4\rho^2}
\left(
\sum_{\alpha_p\in b_p}P_{\mathrm{rad}}(\alpha_p;s)
-
\sum_{\alpha_s\in b_s}S_{\mathrm{rad}}(\alpha_s;s)
\right)
-
\frac{s^2}{\rho}
=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-5ad6daf7ca9c08c6)
and
$$
\mathcal{G}_{\mathrm{tan}}^{(b)}(\rho,s)
=
\frac{1}{4\rho^2}
\left(
\sum_{\alpha_p\in b_p}P_{\mathrm{tan}}(\alpha_p;s)
+
\sum_{\alpha_s\in b_s}S_{\mathrm{tan}}(\alpha_s;s)
\right)
=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-e03435a2612340e5)
Here $b_p$ and $b_s$ are the partner-hit and self-hit entries in the signed causal-root ledger. The equations are parameter-free because $\kappa$, $\epsilon$, and $c_f$ have already been absorbed into $R_*$ and the acceleration scale. A common zero of these two residuals is only an algebraic circular MCB candidate; promotion to a stable branch still requires the finite-window return-map certificate, positive Jacobian floors, and energy packet described below.

#### Circular Self-Hit Sign Theorem and Complete-Ledger Measurement

The uniform-circular self-hit geometry supplies a derived sign result. For the full delay half-angle $\xi>0$,
$$
\left|\sin\xi\right|=\frac{\xi}{s},
\qquad
\hat{\mathbf u}_s
=
|\sin\xi|\,\hat{\mathbf e}_r
+
\operatorname{sign}(\sin\xi)\cos\xi\,\hat{\mathbf e}_t
$$

[View →](../../../../equation-mapping.html#corpus-equation-7637a296378ff6bd)
Every nondegenerate self-hit therefore has a strictly outward radial projection. On the principal branch $\xi\in(0,\pi)$, the tangential projection changes from forward to backward exactly at
$$
\xi=\frac{\pi}{2},
\qquad
s=\frac{\pi}{2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-48fd5d41c94a7b8e)
This is exact on the uniform-circular chart, not a general threshold for non-circular histories. The derivation and falsifiers are given in [Master Equation](master-equation.md#super-field-speed-single-architrino-uniform-circular-self-hit).

The absolute value in the root equation is essential. The first additional self-root pair is born at
$$
\tan\xi_1^\star=\xi_1^\star,
\qquad
s_1^\star
=
\sqrt{1+(\xi_1^\star)^2}
\approx
4.6033388488
$$

[View →](../../../../equation-mapping.html#corpus-equation-36d4a8566bb7167a)
not near $7.8$. The next pair is born at $s_2^\star\approx7.7897057675$. At $s=8$, the complete self ledger contains five roots, with full delay angles approximately $319.2409^\circ$, $413.6433^\circ$, $632.7112^\circ$, $859.1794^\circ$, and $911.8419^\circ$. A three-root census at that speed has omitted the alternating-sine pair.

Claim grade: **derived** for the radial sign, principal $\pi/2$ threshold, and pair-birth equations; **measured** for the numerical root and residual values below. The independent analysis instrument is `scripts/equation-mapping/analyze-circular-self-hit-binary.mjs`. It brackets every monotone half-lobe, verifies roots against the direct Euclidean chord condition, and evaluates acceleration from the circular position and velocity vectors.

The principal partner formula reproduces the supplied tangential values through $s=6$, including $0.7083439236$ there, and confirms their positive sign. At $s=10$ the canonical value is $1.1141796596$, not $1.05588$. The principal self value at $s=10$ is $-0.2782507206$, while the sum over all five active self roots is $-0.0902141750$.

On $1<s<20$, the restricted ledger containing the principal partner root and every self root has no tangential zero. Its minimum is approximately $0.2389668633$ in units $\kappa\epsilon^2/R^2$ at $s\approx1.7972747766$. Its radial coefficient changes sign at $s\approx1.8471246228$, not at $\pi/2$; the two values solve different balance equations, so their proximity has no derived significance.

The complete ledger gives the opposite existence verdict because older partner roots cannot be omitted. The measured simple-root zeros are:

| $s$ | Net radial coefficient, outward positive | Algebraic radius $R/R_*$ |
| ---: | ---: | ---: |
| $3.0703566254$ | $-0.8196069638$ | $0.0869416735$ |
| $6.2184549634$ | $-1.2902686401$ | $0.0333668459$ |
| $9.3764360282$ | $-1.8001431321$ | $0.0204753554$ |

At each listed point the complete tangential coefficient is zero to the scan tolerance and the radial coefficient is inward, so the algebraic circular conditions have solutions inside the searched domain. This establishes measured existence on the current unregularized simple-root chart; it does not certify a periodic history. Each older branch descends from a $J=0$ birth and still needs the common finite-event convention, retained root ledger, wake-boundary account, and return-map stability certificate.

The measurement is conditional on the canonical line of action from the transmitter's emission point to the receiver event. A counterfactual inertially extrapolated construction replaces only the acceleration direction by
$$
\hat{\mathbf d}_{\mathrm{ext}}
=
\frac{
\mathbf X_r(T_r)
-
\left[
\mathbf X_t(T_t)+\mathbf V_t(T_t)(T_r-T_t)
\right]
}{
\left\|
\mathbf X_r(T_r)
-
\left[
\mathbf X_t(T_t)+\mathbf V_t(T_t)(T_r-T_t)
\right]
\right\|
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2022ac7e8e371495)
while retaining the actual causal roots, emission-site distance, and canonical transmitter-side acceleration weight. This convention isolates the line-of-action sensitivity without substituting a different wake-density law.

The recomputed complete ledger moves the first three emission-site candidates off both balance conditions:

| Emission-site candidate $s$ | Extrapolated-direction radial coefficient | Extrapolated-direction tangential coefficient |
| ---: | ---: | ---: |
| $3.0703566254$ | $+0.1986630540$ | $-0.3350989817$ |
| $6.2184549634$ | $+0.1969175233$ | $-0.1271086141$ |
| $9.3764360282$ | $+0.1881554019$ | $-0.0742863069$ |

The same counterfactual ledger has tangential zeros near $s=3.2253960989$, $6.2226379612$, and $9.3769260902$, but their radial coefficients are respectively $+0.1357894119$, $+0.1768252822$, and $+0.1802347924$, with outward sign positive. The scan through $1<s<20$ finds six tangential zeros and no simultaneous inward-radial point. Claim grade: **measured counterfactual**, not canonical dynamics. The closed-form extrapolated direction independently checks the vector evaluator, while the causal roots remain checked against the Euclidean chord residual.

The equilibrium gate therefore fails before stability analysis: none of the extrapolated-direction zeros is a circular solution, so a Floquet multiplier or delayed-history spectrum about those rows would have no dynamical referent. This closes the requested counterfactual stability test as an acceleration-balance negative, not as a measured instability.

The autonomous wake-state reduction in [Master Equation](master-equation.md#autonomous-emission-labeled-wake-transport) resolves the regular-domain ontology dependency under the present postulates. A fixed emission-site center with radius growing at absolute speed $c_f$ has the canonical emission-site normal and the canonical $c_f/|D_t|$ weight. Redirecting only the acceleration is not a surface-normal response; moving the emitted center inertially changes absolute propagation speed, causal support, and root weight. The extrapolated calculation therefore remains a sensitivity diagnostic and does not eliminate the canonical emission-site candidates.

The circular result forecloses neither non-circular contraction nor the symmetric logarithmic spiral, multi-architrino braids, or Noether sea embedded configurations. It also does not yet establish the circular MCB: it promotes the current chart from an unanswered algebraic question to a measured candidate family while leaving finite-event persistence and stability open.

---

### Discrete Azimuth Pattern of Circular Hits

**Context**: Non-translating, uniform circular binary at fixed speed $s$. Receiver "now" at azimuth $\theta = 0$.

The emission points on the circle that can produce hits "now" form a **finite, discrete set** of azimuths determined by the delay equations--**not arbitrary locations**. Because roots are indexed by winding number $m$ and, in the full ledger, sheet sign $\sigma$, multiple hits at the same "now" can occur for different signed windings, but the admissible azimuths remain a finite comb and never fill the circle.

#### Partner Hits

- Minimal angular separation: $\tilde{\delta}_p \in (0, \pi)$.
- The signed causal delays and their allowed windings are those in the **Signed Root Census and Speed Ladder** above.

- **Emission azimuth** at reception:
 $$
 \varphi_p^{\sigma,m}(s) = \pi-\sigma\tilde{\delta}_p^{\sigma,m}(s)
 $$

 [View →](../../../../equation-mapping.html#corpus-equation-1bcd94b7531bdac6)

- **Existence thresholds**: each signed sheet is born when its delay equation first becomes tangent; the positive-sheet family has boundary threshold $s=m\pi$, while the negative-sheet family uses the interior minimum displayed above.
- As winding grows, the admissible azimuths approach the diametrically opposite point on their respective signed sheets.
- Partner multi-hit means $M_p(s)>1$: the base partner branch plus one or more older partner roots. These additional roots affect the inward partner-root ledger, but they do not create same-transmitter feedback.

#### Self-Hits

- Minimal angular separation: $\tilde{\delta}_s \in (0, \pi]$.
- The signed causal delays and their allowed windings are those in the **Signed Root Census and Speed Ladder** above.

- **Emission azimuth** at reception:
 $$
 \varphi_s^{\sigma,m}(s) = -\sigma\tilde{\delta}_s^{\sigma,m}(s)
 $$

 [View →](../../../../equation-mapping.html#corpus-equation-74fcfe83066fcbb3)

- **Existence windows**:
 - Principal branch ($m = 0$): exists for every $s>1$, with $\tilde{\delta}_s\to0^+$ as $s\downarrow1$.
 - The first negative sheet enters at $s=\pi/2$ through $\tilde{\delta}_s=\pi$.
 - For older positive sheets with $m \ge 1$, the branch appears only when the self-delay equation develops an interior tangency. The exact threshold $s_m^\star$ is determined in **Counting Self-Hits by Winding Index** above.
 - Within each branch, $\tilde{\delta}_s$ initially enters at a tangency angle and then decreases with $s$, so $\varphi_s$ drifts toward $-\pi$ at high speed.

---

### Super-Field-Speed Root Ledgers and Resonance Lock

The super-field-speed regime is not merely the same spiral at a larger speed. It changes the root topology of the binary. Once
$$
\|\mathbf V\|>c_f
$$

[View →](../../../../equation-mapping.html#corpus-equation-159a10b5ae5d31fe-2)
the receiver can intersect multiple older causal wake surfaces from both its own path and its partner's path. In the circular reduced model, these intersections are counted by two integer ledgers:
$$
N_s(s)
\equiv
\#\{(m,\sigma):\text{self branch }(m,\sigma)\text{ is active at speed }s\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-fcd6561e8a6c2301)
$$
M_p(s)
\equiv
\#\{(m,\sigma):\text{partner branch }(m,\sigma)\text{ is active at speed }s\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-521f686be8eefbf0)
The self-ledger
$$
N_s
$$

[View →](../../../../equation-mapping.html#corpus-equation-a6a99a74942169d4)
tracks outward self-hit channels. The partner-ledger
$$
M_p
$$

[View →](../../../../equation-mapping.html#corpus-equation-576a149f2fb73f35)
tracks inward partner-hit channels. Both are integer-valued because a causal root either exists or it does not. As
$$
s
$$

[View →](../../../../equation-mapping.html#corpus-equation-6eed536a611d6853)
varies, these counts change only at branch birth/death thresholds where a causal delay equation develops a tangency.

A candidate stable super-field-speed bound state therefore cannot be described by a single smooth acceleration curve alone. It must satisfy a finite root-ledger balance:
$$
\sum_{m\in\mathcal{M}_p(s)}
A_{p,m}^{\mathrm{rad}}(R,s)
-
\sum_{m\in\mathcal{M}_s(s)}
A_{s,m}^{\mathrm{rad}}(R,s)
=
\frac{s^2}{R}
$$

[View →](../../../../equation-mapping.html#corpus-equation-22fc4463538b634d)
together with whatever tangential closure condition is supplied by the full regularized dynamics. The radial equation says that partner-root accumulation supplies inward pull while self-root accumulation supplies outward response. On a fixed signed branch ledger $b$, the corresponding constant-speed closure target has the form
$$
\left\langle
\sum_{\rho\in b} T_\rho(R,s;\eta)
\right\rangle_{P_b}
=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-c06daf1549fd17c5)
where the average is taken over one candidate period $P_b$ of the regularized history. The tangential condition remains the hard part: in the same-sheet bare isolated two-body kernel, the no-go result above shows that every active branch contributes positive tangential drive; in the full signed ledger, negative sheets must be included before any global no-go or closure theorem is claimed.

Equivalently, on a fixed signed ledger $b$, the circular MCB search is the intersection problem
$$
G_{\mathrm{rad}}^{(b)}(R,s)=0,
\qquad
G_{\mathrm{tan}}^{(b)}(R,s)=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-333b6fba15075b4f)
where
$$
G_{\mathrm{rad}}^{(b)}(R,s)
\equiv
\sum_{\alpha_p\in b_p}A_{\alpha_p}^{\mathrm{rad}}(R,s)
-
\sum_{\alpha_s\in b_s}A_{\alpha_s}^{\mathrm{rad}}(R,s)
-
\frac{s^2}{R}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9911c5b04660eb1d)
and
$$
G_{\mathrm{tan}}^{(b)}(R,s)
\equiv
\left\langle
\sum_{\alpha\in b}T_\alpha(R,s;\eta)
\right\rangle_{P_b}
$$

[View →](../../../../equation-mapping.html#corpus-equation-10d46f86a116af12)
with $b_p$ and $b_s$ denoting the partner-hit and self-hit entries inside the signed ledger $b$. The first curve enforces inward/outward radial balance, while the second enforces finite-window tangential closure. In the natural Layer-I units, the search lives in $(R/R_*,s)$, so any intersection is a parameter-free candidate point for that ledger. It is still only an algebraic MCB candidate until the fixed-ledger return map proves stability, positive Jacobian floors, and persistence under perturbation.

This gives a precise, conditional meaning to binary resonance lock. A stable slot would be a region of history space in which the integer pair
$$
(N_s,M_p)
$$

[View →](../../../../equation-mapping.html#corpus-equation-62b23a38136d33e4)
is fixed, the branch Jacobians stay transversal, and perturbations that approach a root threshold are pushed back into the same ledger rather than escaping to a neighboring one. If such a self-map certificate exists, the discreteness of
$$
N_s
\quad\text{and}\quad
M_p
$$

[View →](../../../../equation-mapping.html#corpus-equation-8fa572c7b03fcbbb)
would provide a deterministic mechanism for quantized bound-state geometry: allowed radii and frequencies would be selected by integer causal-root ledgers rather than by a continuum of arbitrary circular orbits.

This statement is deliberately conditional. This chapter derives the discrete root ledgers and the radial balance target, but the stability and quantization claims require the missing full-history certificate: finite active branches, positive Jacobian floors, transmitter-side acceleration-weight floors, returned-history closure, and a monodromy or boundary-trapping argument. In practice, that certificate may close first in a collinear breather or Noether braid setting rather than in the bare circular two-body kernel.

#### Branch Stability Target (Hessian Bridge)

The standard equilibrium test in central-force mechanics uses the Hessian of an instantaneous effective potential. If $q_\star$ is an equilibrium, the matrix
$$
H_{ab}(q_\star)=\partial_a\partial_b V_{\mathrm{eff}}(q_\star)
$$

[View →](../../../../equation-mapping.html#corpus-equation-936d35dcd5f53639)
tests local stiffness in the non-symmetry directions. This is useful as comparison language, but it is not yet a stability proof for an architrino binary because the acceleration law depends on path-history, the active signed causal-root ledger, the transmitter-side acceleration weight, and the branch Jacobian floors.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ branch-stability target is therefore a cycle-averaged stiffness matrix on a fixed branch chart. Let $b$ denote a fixed signed causal-root ledger and let $\mathbf{X}_b(T)$ be a candidate periodic history with period $P_b$. For reduced branch coordinates $y^a$ transverse to time shift, period reparameterization, Euclidean motions, and any phase-locked flat-connection moduli retained by an enclosing assembly chart, define the diagnostic stiffness target
$$
K^{(b)}_{ab}
=
\frac{1}{P_b}\int_0^{P_b}
\left.
\frac{\delta^2 U_{\eta,b}^{\mathrm{hist}}}{\delta y^a\,\delta y^b}
\right|_{\mathbf X_T=\mathbf X_{b,T}}
dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-894223f7794f8693)
where $U_{\eta,b}^{\mathrm{hist}}$ is the action-compatible history potential, or the corresponding diagnostic reconstruction when the regularization has not yet been derived from the delayed action. Negative stiffness in this matrix is a local instability signal; positive stiffness is only a necessary reduced-coordinate check, not a certificate.

The actual branch certificate must be delayed-history and Floquet-style. Let
$$
\mathcal{P}_b:\mathcal{N}_b\subset\mathcal{H}\to\mathcal{H}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4ee26b2542ac95ef)
advance an admissible history by one candidate cycle while the signed causal-root ledger remains fixed. A stable branch requires the return map to stay inside the same branch neighborhood,
$$
\mathcal{P}_b(\mathcal{N}_b)\subset\mathcal{N}_b,
\qquad
\inf_{\phi\in\mathcal{N}_b}|J(\phi)|\ge J_{\min}>0
$$

[View →](../../../../equation-mapping.html#corpus-equation-c04f4f985bc8860c)
and the non-symmetry Floquet multipliers of $D\mathcal{P}_b[\mathbf{X}_b]$ to satisfy
$$
|\mu_\alpha|<1
$$

[View →](../../../../equation-mapping.html#corpus-equation-92a6df169651777e)
Only that return-map condition would upgrade the Hessian-style stiffness picture into branch stability. If the candidate touches a branch-fold or $J=0$ wall, this smooth Floquet test must be supplemented by the Conley-index isolating-block certificate named above; otherwise the multiplier calculation has evaluated the smooth arcs while missing the grazing transition. Until those certificates are supplied, MCB stability remains a conditional target rather than a completed proof.

#### Finite-dimensional projection caveat

The circular formulas below use reduced coordinates; stability in the full history space remains a separate proof obligation.

#### Two-Body Closure Packet (Theorem Target)

The practical standard is replayability. A binary branch is not accepted because the picture is circular, compact, or suggestive. It is accepted only when the same finite record supplies the motion, active roots, excluded roots, return map, energy packet, and residuals needed to reproduce the branch under the delayed law.

A nontrivial electrino:positrino binary is promoted only by a replayable finite-$\eta$ packet, not by the circular ansatz alone. For a fixed signed causal-root ledger $b$, the binary closure packet is

$$
\mathfrak{C}_{2\mathrm{B}}^{(\eta)}
=
\left(
b,\mathbf{X}_b,P_b,R_b,s_b,\mathfrak{B}_b,\mathcal{P}_b,\mathcal{E}_b
\right),
$$

[View →](../../../../equation-mapping.html#corpus-equation-4d6d25495c77af1e)

where $\mathbf X_b(T)$ is the two-body history, $P_b$ is its return period, $R_b$ and $s_b$ are the circular benchmark radius and speed when that reduction is valid, $\mathfrak{B}_b$ is the branch chart of active and excluded roots, $\mathcal{P}_b$ is the history-space return map, and $\mathcal{E}_b$ is the constructive energy packet of [Delay-Dynamics Energy](../validation/simulations/action-energy/delay-dynamics-energy.md). The packet must report the following residuals before the branch can be used as a closed result.

This chapter owns the normative two-body residual tuple:
$$
\mathsf{Res}_{2\mathrm{B}}^{(\eta)}
=
\left(
\mathcal{R}_{\mathrm{EOM}}^{2\mathrm{B}},
\mathcal{R}_{\mathrm{per}}^{2\mathrm{B}},
\mathcal{R}_{\mathrm{bal}}^{2\mathrm{B}},
\nu_J^{2\mathrm{B}},
\nu_{\mathrm{rec}}^{2\mathrm{B}},
\Delta_{\mathrm{gap}}^{2\mathrm{B}},
\lambda_{\mathrm{sec}}^{2\mathrm{B}},
\epsilon_E^{(\eta)},
\Delta_{\mathrm{E,cross}}^{(\eta)},
\mathcal{R}_{\omega}^{2\mathrm{B}}
\right).
$$

[View →](../../../../equation-mapping.html#corpus-equation-1c4ed318198bb04c)
Simulation recipes consume this tuple by reference; they must not define shorter or reordered variants.

The equation-of-motion residual is

$$
\mathcal{R}_{\mathrm{EOM}}^{2\mathrm{B}}(b,\eta)
=
\frac{1}{P_b}
\int_0^{P_b}
\frac{
\left\|
\frac{d^2\mathbf X_b}{dT^2}(T)
-
\mathcal A_{\eta,b}[\mathbf X_{b,T}]
\right\|
}{
1+\left\|\mathcal A_{\eta,b}[\mathbf X_{b,T}]\right\|
}
\,dT,
$$

[View →](../../../../equation-mapping.html#corpus-equation-31d98afbd185e844)

where $\mathcal A_{\eta,b}$ is the regularized two-body branch acceleration obtained from the active self and partner records in $b$. The period residual is

$$
\mathcal{R}_{\mathrm{per}}^{2\mathrm{B}}(b,\eta)
=
\frac{
\left\|\mathbf{X}_{b,P_b}-\mathbf{X}_{b,0}\right\|_{\mathcal{H}}
}{
\left\|\mathbf{X}_{b,0}\right\|_{\mathcal{H}}+\epsilon_{\mathcal{H}}
},
$$

[View →](../../../../equation-mapping.html#corpus-equation-28b8761149423402)

with $\mathcal{H}$ the declared history norm and $\epsilon_{\mathcal{H}} > 0$ a fixed normalization floor.

The packet must also report the signed-degree record
$$
\deg_s^{2\mathrm{B}}(b)
=
\sum_{\rho\in b_s}
\operatorname{sign}J_\rho,
\qquad
\deg_p^{2\mathrm{B}}(b)
=
\sum_{\rho\in b_p}
\operatorname{sign}J_\rho,
$$

[View →](../../../../equation-mapping.html#corpus-equation-c8a829ee02417622)
where $b_s$ and $b_p$ are the retained self-hit and partner-hit entries. On a smooth certified window these integers must be constant. If the branch crosses a fold inside the window, the packet must log the corresponding $\Delta N=\pm2,\Delta D=0$ surgery rather than treating the unsigned root counts as conserved data.

The branch-chart admissibility certificate is

$$
\nu_J^{2\mathrm{B}}(b,\eta)
=
\inf_{\rho\in b,\ 0\leq T\leq P_b}
|J_\rho(T)|
>0,
\qquad
\Delta_{\mathrm{gap}}^{2\mathrm{B}}(b,\eta)
=
\inf_{\rho\in b^{\mathrm{off}},\ 0\leq T\leq P_b}
|g_\rho(T)|
>0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-877ef7a82a571b89)

Here $J_\rho$ is the root Jacobian for an active record and $g_\rho$ is the signed gap of a declared inactive record in the finite branch complement $b^{\mathrm{off}}$. The certificate fails if either floor tends to zero under refinement or under the advertised $\eta$-continuation.

The same active records must also certify a nonvanishing lower acceleration-weight margin
$$
\nu_{\mathrm{rec}}^{2\mathrm{B}}(b,\eta)
=
\inf_{\rho\in b,\ 0\leq T\leq P_b}
W_{\rho}^{\mathrm{acc}}(T)
>0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-a003897847428110)
Together with $\nu_J^{2\mathrm{B}}>0$, this keeps the canonical transmitter-side acceleration weight inside a finite positive interval on the retained branch chart.

For a circular benchmark the radial and tangential balance residual is

$$
\mathcal{R}_{\mathrm{bal}}^{2\mathrm{B}}
=
\frac{
\left|
\left\langle A^{\mathrm{rad}}_{\eta,b}(R_b,s_b)\right\rangle_{P_b}
-s_b^2/R_b
\right|
}{
1+s_b^2/R_b+
\left|\left\langle A^{\mathrm{rad}}_{\eta,b}\right\rangle_{P_b}\right|
}
+
\frac{
\left|
\left\langle A^{\mathrm{tan}}_{\eta,b}
+A^{\mathrm{tan}}_{\partial W}
\right\rangle_{P_b}
\right|
}{
1+\left\langle
|A^{\mathrm{tan}}_{\eta,b}|
+|A^{\mathrm{tan}}_{\partial W}|
\right\rangle_{P_b}
}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-2907bc9136459a5f)

The boundary term is not optional bookkeeping: it is required by the constructive finite-window wake-energy account. If it is absent, verification is incomplete and the packet is not advanced; tangential work cannot be hidden in an undefined reservoir.

The stability certificate is a secular Floquet margin in history space,

$$
\lambda_{\mathrm{sec}}^{2\mathrm{B}}(b,\eta)
=
1-\rho\!\left(
D\mathcal{P}_b[\mathbf{X}_b]\big|_{E_\perp}
\right)
>0,
$$

[View →](../../../../equation-mapping.html#corpus-equation-747f7330dc2f2b26)

where $E_\perp$ removes the neutral phase and symmetry directions. A numerical orbit without this projected return-map certificate is an existence candidate, not a stable binary certificate.

For a standalone circular binary, the neutral quotient includes the global time phase, the period-reparameterization direction, and Euclidean translations and rotations of the complete history. When the same two-body packet is embedded into a phase-locked rank-three braid or larger assembly chart, a neutral-direction audit is required: a direction may be removed from $E_\perp$ only if it is neutral for the full enclosing chart, not merely for the isolated subsystem. The flat-connection moduli declared by the enclosing chart are physical lock variables unless the full chart proves them neutral. Otherwise a slow drift of relative phase can be hidden as an allowed symmetry even though it breaks the lock.

The energy packet is

$$
\mathcal{E}_b
=
\left(
\epsilon_E^{(\eta)}(W_b;\mathfrak{B}_b),
\Delta_{\mathrm{E,cross}}^{(\eta)}(W_b;\mathfrak{B}_b),
U_{b,\mathrm{work}}^{(\eta)}(T),
U_{\min,b}^{(\eta)}
\right),
$$

[View →](../../../../equation-mapping.html#corpus-equation-175a787e6ac22ab7)

and must satisfy

$$
\epsilon_E^{(\eta)}(W_b;\mathfrak{B}_b)\leq \epsilon_E^\star,
\qquad
\Delta_{\mathrm{E,cross}}^{(\eta)}(W_b;\mathfrak{B}_b)
\leq \epsilon_{\mathrm{cross}}^\star,
\qquad
E_{\mathrm{wake},b}^{(\eta)}(T)\geq U_{\min,b}^{(\eta)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5ae980f445ac0e3f)

on the same window, branch chart, and regulator used for the motion residuals. The work reconstruction is
$$
U_{b,\mathrm{work}}^{(\eta)}(T)
=
U_b(T_\ast)
-
\int_{T_\ast}^{T}
\sum_i
\mu_{\text{arch}}\,
\mathbf A_{i,b}^{(\eta)}(T')
\cdot
\mathbf V_i(T')\,dT'
$$

[View →](../../../../equation-mapping.html#corpus-equation-c539e6904ab9c89b)
for the quadratic proxy, with $\mu_K(\|\mathbf V_i\|)$ replacing $\mu_{\text{arch}}$ when the primitive kinetic scalar is used. The lower-bound entry applies to the constructed action-level wake charge when that route is available, or to the compatible work reconstruction when that is the declared route. This is the handoff point to the constructive delay-energy chapter: ordinary Noether language is not sufficient until $E_{\mathrm{wake},b}^{(\eta)}$ or its compatible work-integral reconstruction has been constructed for the chosen chart.

Finally, the characteristic frequency is extracted from the return period,

$$
\omega_b=\frac{2\pi}{P_b},
\qquad
\mathcal{R}_{\omega}^{2\mathrm{B}}
=
\frac{\left|2\pi/P_b-s_b/R_b\right|}
{|2\pi/P_b|+|s_b/R_b|+\epsilon_{\omega}},
$$

[View →](../../../../equation-mapping.html#corpus-equation-c7fd891b38fac32d)

when the circular reduction is claimed. For a noncircular branch, $\omega_b=2\pi/P_b$ remains the fundamental return frequency, but the $s_b/R_b$ comparison is inadmissible unless an effective radius and speed have been independently defined. A breather or spiral candidate must instead report its harmonic-extraction rule on the retained history record and compare the extracted fundamental or locked harmonic to $2\pi/P_b$.

The theorem target is therefore:

> If a finite-$\eta$ branch supplies $\mathfrak{C}_{2\mathrm{B}}^{(\eta)}$ with $\mathcal{R}_{\mathrm{EOM}}^{2\mathrm{B}}$, $\mathcal{R}_{\mathrm{per}}^{2\mathrm{B}}$, $\mathcal{R}_{\mathrm{bal}}^{2\mathrm{B}}$, and $\mathcal{R}_{\omega}^{2\mathrm{B}}$ below declared tolerances, $\nu_J^{2\mathrm{B}}$, $\nu_{\mathrm{rec}}^{2\mathrm{B}}$, and $\Delta_{\mathrm{gap}}^{2\mathrm{B}}$ bounded away from zero, $\lambda_{\mathrm{sec}}^{2\mathrm{B}} > 0$, and the constructive energy residuals closed on the same branch chart, then that branch is a certified local electrino:positrino two-body binary at that finite regulator.

No such finite-$\eta$ packet is supplied in this chapter yet. The status is a theorem target and simulation closure contract, not a closed proof. The $\eta\to0$ limit, the basin measure of the branch, and the later use of the binary as a universal clock or matter standard remain separate obligations.

## State Space and Well-Posedness of the Two-Body Delay System

### Introduction and Scope

The master equation of motion for the architrino system constitutes a system of **State-Dependent Neutral Delay Differential Equations (SD-NDDEs)**. Unlike ordinary differential equations (ODEs) where the state is a point in $\mathbb{R}^{6N}$, the state of this system is a **function segment** representing the past history of the architrinos.

We denote the position of the $i$-th architrino as $\mathbf X_i(T) \in \mathbb{R}^3$. We work in the **Euclidean void** with fixed metric $\delta_{ij}$.

---

### Functional Phase Space

To define the evolution at time $T$, we require knowledge of the trajectory over an interval $[T - \Delta_{\max}, T]$, where $\Delta_{\max}$ is the maximum causal lookback time relevant to the current dynamics.

#### Definition 1 (The History Space)
Let $h > 0$ be a history horizon (sufficiently large to capture all active causal roots). On a smooth simple-root branch, the **smooth history space** $\mathcal{H}_{\mathrm{sm}}$ is the Banach space of continuously differentiable functions mapping the delay interval to the configuration space:
$$
\mathcal{H}_{\mathrm{sm}} = C^1\left([-h, 0]; (\mathbb{R}^3)^N\right).
$$

[View →](../../../../equation-mapping.html#corpus-equation-eb7232637fc1adee)
For a trajectory $\mathbf X: [-h, \infty) \to (\mathbb{R}^3)^N$, the **state at time $T$**, denoted $\mathbf X_T$, is the element of $\mathcal{H}_{\mathrm{sm}}$ on smooth charts, or of $\mathcal{H}_*$ on caustic-extension charts, given by:
$$
\mathbf X_T(\theta) = \mathbf X(T + \theta), \quad \theta \in [-h, 0]
$$

[View →](../../../../equation-mapping.html#corpus-equation-f157ade25feabdc3)
The norm on the smooth chart is the standard $C^1$ sup-norm: $\|\phi\|_{\mathcal{H}_{\mathrm{sm}}} = \sup_{\theta \in [-h,0]} (\|\phi(\theta)\| + \|\dot{\phi}(\theta)\|)$.

**Remark:** We require $C^1$ rather than $C^0$ because the causal delay $\Delta$ depends on the state. In such systems, the vector field is typically not Lipschitz continuous in the $C^0$ topology, endangering uniqueness.

For caustic-grazing packets this smooth space is not the whole story. The working extension is
$$
\mathcal{H}_*
=
W^{1,\infty}\left([-h,0];(\mathbb{R}^3)^N\right),
$$

[View →](../../../../equation-mapping.html#corpus-equation-baba0dacd7bb9adf)
with $C^1$ regularity retained on smooth arcs and finite impulse transitions handled by the finite-$\eta$ kernel before any $\eta\to0$ statement is made. The existence theorem below is a smooth-chart theorem. A branch that crosses a $J=0$ wall must supply a separate impulse lemma or isolating-block continuation certificate showing that the finite-$\eta$ solutions converge in $\mathcal{H}_*$ with bounded velocity and finite total impulse. This makes $\mathcal{H}_*$ the common functional-analytic home for caustic-grazing two-body packets, doubling-frequency middle-carrier caustics, and any later breather packet that relies on finite impulse rather than a globally $C^1$ path.

Below, $\mathcal{H}$ denotes the declared history chart for the packet being tested. Unless a caustic-extension certificate is explicitly named, $\mathcal{H}=\mathcal{H}_{\mathrm{sm}}$.

---

### The Regularized Interaction Functional

We formalize the acceleration term derived in the master equation.

#### Definition 2 (Causal Constraint Functional)
For a receiver architrino $i$ at reception time $T_r$ and transmitter $j$, the delay $\Delta_{ij}(T_r)$ is implicitly defined by the causal-isochron condition. Let $\phi \in \mathcal{H}$ be the history. A **causal root** is a value $\Delta > 0$ satisfying:
$$
g_{ij}(\Delta, \phi) \equiv \|\phi_i(0) - \phi_j(-\Delta)\| - c_f \Delta = 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-14f4055b5329f20d)

#### Lemma 1 (Regularity of the Delay Map)
*Assumption:* The velocities are sub-field-speed relative to the separation, i.e., $\|\mathbf V_j\| < c_f$ (single-root regime) OR we isolate a specific branch of the multi-root solution where the relative radial velocity is not $c_f$.

*Statement:* If $\phi \in \mathcal{H}$ and $\Delta^*$ is a simple root of $g_{ij}(\Delta, \phi) = 0$ (i.e., $\partial_\Delta g_{ij} \neq 0$), then there exists a neighborhood $U \subset \mathcal{H}$ of $\phi$ and a continuously differentiable functional $\Delta: U \to \mathbb{R}^+$ such that $\Delta(\phi) = \Delta^*$.

*Proof.*  
Define
$$
g_{ij}(\Delta,\phi)=\|\phi_i(0)-\phi_j(-\Delta)\|-c_f\Delta
$$

[View →](../../../../equation-mapping.html#corpus-equation-8d9a7e52353d7a9d)
Because $\phi\in C^1$, the evaluation maps $\phi\mapsto \phi_i(0)$ and $(\Delta,\phi)\mapsto \phi_j(-\Delta)$ are $C^1$, hence $g_{ij}$ is $C^1$ on $\mathbb{R}^+\times\mathcal{H}$. At a root $(\Delta^*,\phi)$,
$$
\partial_\Delta g_{ij}
=\hat{\mathbf{r}}_{ij}\!\cdot\!\dot{\phi}_j(-\Delta^*)-c_f,
\quad
\hat{\mathbf{r}}_{ij}
\equiv
\frac{\phi_i(0)-\phi_j(-\Delta^*)}{\|\phi_i(0)-\phi_j(-\Delta^*)\|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9dad0a59feb16019)
Equivalently, $\partial_\Delta g_{ij}=-D_{t,ij}$ on this root. The simple-root condition is exactly $\partial_\Delta g_{ij}\neq 0$, i.e. no delayed tangency/causal-shock degeneracy. Therefore, by the Banach-space Implicit Function Theorem, there exist a neighborhood $U$ of $\phi$ and a unique $C^1$ map $\Delta:U\to\mathbb{R}^+$ with $g_{ij}(\Delta(\psi),\psi)=0$ and $\Delta(\phi)=\Delta^*$. $\square$

#### Definition 3 (Regularized Acceleration Functional)
To ensure the vector field is Lipschitz, we replace the distributional Dirac delta of the master equation with the mollifier $\delta_\eta$ (see [Master Equation](master-equation.md)). The acceleration functional $F_i: \mathcal{H} \to \mathbb{R}^3$ is:
$$
F_i(\phi) = \sum_{j} \kappa \sigma_{ij} |q_i q_j| \int_{-h}^0 \frac{\phi_i(0) - \phi_j(\theta)}{\|\phi_i(0) - \phi_j(\theta)\|^3} \, \delta_\eta\left( \|\phi_i(0) - \phi_j(\theta)\| + c_f \theta \right) \, d\theta
$$

[View →](../../../../equation-mapping.html#corpus-equation-e3a7f07a7a30e112)
**Crucial Property:** For $\eta > 0$ and smooth $\delta_\eta$, this integral operator maps $C^1$ histories to continuous accelerations.

This finite-$\eta$ functional is a certification surrogate until its sharp-limit branch reduction reproduces the canonical transmitter-side acceleration weight. Each retained simple root must carry $W_{ij}^{\mathrm{acc}}=c_f/\lvert D_{t,ij}\rvert$. The same record also carries $D_{r,ij}/D_{t,ij}$ for signed root playback, but that ratio does not multiply the instantaneous acceleration.

On $\mathcal{H}_*$ this same formula is interpreted through the finite-$\eta$ integral first. The admissibility claim is weaker: the packet must show bounded velocity and finite total impulse across the grazing chart before it can pass to the $\eta\to0$ limit.

---

### Local Well-Posedness

#### Theorem 1 (Local Existence and Uniqueness)
**Assumptions:**
1. $\eta > 0$, and $\delta_\eta$ is $C^1$ with bounded value and bounded derivative.
2. Initial history $\phi^0 \in \mathcal{H}$ is admissible: there exists $d_{\min}>0$ such that all interaction channels used by Definition 3 satisfy
   $$
   \|\phi_i(0)-\phi_j(\theta)\|\ge d_{\min},\qquad \theta\in[-h,0]
   $$

   [View →](../../../../equation-mapping.html#corpus-equation-9996ca4c48763e5f)
   on a neighborhood of $\phi^0$.
3. Delay roots used in channel construction are simple (transversal), i.e. no causal-shock degeneracy (Lemma 1).
4. Active branches are uniformly finite on the considered history neighborhood.
5. Couplings and polarity magnitudes are finite.
6. Optional higher-smoothness gluing condition at $T=T_{\mathrm{init}}$ (needed for $C^2$ at the junction, not for $C^1$ well-posedness).

**Statement:** Let $\mathbf Y=(\mathbf X,\mathbf V)$ and write the system in first-order form
$$
\frac{d\mathbf Y}{dT}=\mathcal{G}(\mathbf Y_T),\qquad
\mathbf Y_{T_{\mathrm{init}}}=\phi^0
$$

[View →](../../../../equation-mapping.html#corpus-equation-b2a556fd2efbe164)
Then there exists $\Delta T>0$ and a unique $C^1$ solution on $[T_{\mathrm{init}}-h,T_{\mathrm{init}}+\Delta T)$. Equivalently, there is a unique maximal solution interval
$$
[T_{\mathrm{init}}-h,T_{\max}),\qquad T_{\max}>T_{\mathrm{init}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-31fdd6129fc2f986)
If the optional gluing condition holds, the solution is $C^2$ at $T_{\mathrm{init}}$.

*Proof.*  
Define
$$
\mathcal{G}(\phi)=(\phi_v(0),F(\phi))
$$

[View →](../../../../equation-mapping.html#corpus-equation-42e5134853c2c76e)
with $F$ from Definition 3.

1. By Assumption 2, every denominator in the interaction kernel is bounded away from zero on the admissible neighborhood; therefore the map
   $$
   (\mathbf{u},\mathbf{w})\mapsto \frac{\mathbf{u}-\mathbf{w}}{\|\mathbf{u}-\mathbf{w}\|^3}
   $$

   [View →](../../../../equation-mapping.html#corpus-equation-86f76f80fa7dd382)
   is $C^1$ there with bounded derivative.
2. By Assumption 1, composition with $\delta_\eta$ preserves $C^1$ regularity and bounded derivatives.
3. By Lemma 1 and Assumption 3, delay branches (where used) depend $C^1$ on history; thus branch-evaluation maps are locally Lipschitz in $\phi$.
4. Finite sums over channels and integration over finite interval $[-h,0]$ preserve local Lipschitz continuity; hence $\mathcal{G}$ is locally Lipschitz on an open subset of $\mathcal{H}$ containing $\phi^0$.
5. Apply the standard Banach-space existence/uniqueness theorem for state-dependent DDEs: a unique local $C^1$ solution exists and extends uniquely to a maximal interval.

Therefore Theorem 1 holds. $\square$

---

### Global Existence vs. Blow-Up

Unlike Newtonian gravity, global existence is **not guaranteed** simply by avoiding collisions, because the delay equation can harbor "runaway" modes where self-acceleration diverges.

#### Theorem 2 (Continuation Principle)
The solution $\mathbf X(T)$ can be extended as long as the state $\mathbf X_T$ remains within a compact subset of the phase space where causal roots are simple.

#### Definition 4 (Blow-Up Criteria)
The solution ceases to exist at finite time $T^*$ if:
1. **Collision:** $\inf_{i,j} \|\mathbf X_i(T) - \mathbf X_j(T')\| \to 0$ inside the regularization kernel support.
2. **Infinite Speed:** $\sup_i \|\mathbf V_i(T)\| \to \infty$.
3. **Causal Shock:** The derivative of the delay $d\Delta/dT$ diverges because the transmitter-side factor becomes singular. The branch condition is $\mathbf V_j(T_t)\cdot\hat{\mathbf r}_{ij}=c_f$ at emission, not merely $\|\mathbf V_j\|=c_f$.

---

## Symmetry, Conservation, and Lyapunov Functionals

### Introduction

Standard conservation laws (energy, momentum, angular momentum) rely on the application of Noether's theorem to local Lagrangian densities. In this delayed setting, the acceleration at absolute time $T$ depends on the phase-space trajectory over the interval $[T-h,T]$.

For an action-derived, symmetry-preserving delayed model, symmetries of the substrate (Euclidean void + absolute time) imply conservation laws, but the conserved quantities are no longer simple functions of the instantaneous state $(\mathbf X, \mathbf V)$. Instead, they are **functionals on the history space** $\mathcal{H}$. For a working regularized kernel not yet derived from an action, the same expressions function as validation diagnostics rather than established Noether charges.

This section derives these functionals, establishes the exact symmetry group of the regularized dynamics ($\eta > 0$), and provides the *a priori* bounds required to ensure physical well-posedness (preventing unphysical runaway acceleration).

---

### The Global Symmetry Group

We consider the regularized two-body system in the Euclidean void $\mathbb{R}^3$ with metric $\delta_{ij}$ and absolute time $T$.

In this symmetry proof, bare $T$ is intentionally the generic absolute-time parameter transformed by time translation. When one delayed term is read as a causal hit, that evaluation event has reception time $T_r$ and the retained earlier root has emission time $T_t$.

#### Definition (The Fundamental Symmetry Group)
The background substrate and the master equation interaction kernel
$$
\mathbf A_{ij}(T) \propto
\frac{W_{ij}^{\mathrm{acc}}(T;T_t)}
{\|\mathbf X_i(T) - \mathbf X_j(T_t)\|^3}
\left(\mathbf X_i(T) - \mathbf X_j(T_t)\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-2fc690245b5bb8d4)
(regularized by $\eta$) respect the group:
$$
G_{\text{fund}} = E(3) \times \mathbb{R}_{\text{time}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-583b437b0adbc430)
where $E(3) = \mathbb{R}^3 \rtimes O(3)$ is the Euclidean group of spatial translations and rotations, and $\mathbb{R}_{\text{time}}$ denotes time translation.

#### Theorem (Invariance of the Equations of Motion)
Let $\mathbf X(T)$ be a solution to the master equation.
1. **Time Translation:** For any $\Delta T \in \mathbb{R}$, $\mathbf Y(T) = \mathbf X(T + \Delta T)$ is also a solution.
2. **Spatial Isometry:** For any $R \in O(3)$ and $\mathbf b \in \mathbb{R}^3$, $\mathbf Y(T) = R\mathbf X(T) + \mathbf b$ is also a solution.

*Proof.*  
For time translation, set $\mathbf Y_i(T)=\mathbf X_i(T+\Delta T)$. If $T_t\in\mathcal{C}_{ij}^X(T+\Delta T)$ for the original solution, then $T_t-\Delta T\in\mathcal{C}_{ij}^Y(T)$ because
$$
\|\mathbf Y_i(T)-\mathbf Y_j(T_t-\Delta T)\|
=\|\mathbf X_i(T+\Delta T)-\mathbf X_j(T_t)\|
=c_f[(T+\Delta T)-T_t]
=c_f[T-(T_t-\Delta T)]
$$

[View →](../../../../equation-mapping.html#corpus-equation-c58e41463f3593a5)
Hence the same branch contributions appear with shifted times, and $\frac{d^2\mathbf Y_i}{dT^2}(T)=\frac{d^2\mathbf X_i}{dT^2}(T+\Delta T)$ satisfies the same acceleration law.

For spatial isometries, set $\mathbf Y_i(T)=R\mathbf X_i(T)+\mathbf b$, $R\in O(3)$. Distances are preserved:
$$
\|\mathbf Y_i(T)-\mathbf Y_j(T_t)\|
=\|R(\mathbf X_i(T)-\mathbf X_j(T_t))\|
=\|\mathbf X_i(T)-\mathbf X_j(T_t)\|
$$

[View →](../../../../equation-mapping.html#corpus-equation-ca2338bae35b3213)
so causal-root times are unchanged. Unit directions transform covariantly: $\hat{\mathbf{r}}_{ij}^Y=R\hat{\mathbf{r}}_{ij}^X$. The dot products defining $D_t$, $D_r$, and $W^{\mathrm{acc}}$ are preserved by the same spatial isometry. Therefore each acceleration term transforms as $\mathbf A_{ij}^Y=R\mathbf A_{ij}^X$, and
$$
\frac{d^2\mathbf Y_i}{dT^2}(T)=R\frac{d^2\mathbf X_i}{dT^2}(T)
=\sum_j\sum_{T_t\in\mathcal{C}_{ij}(T)}
\kappa\sigma_{ij}\frac{|q_iq_j|\,W_{ij}^{\mathrm{acc}}(T;T_t)}
{r_{ij}^2}\,\hat{\mathbf{r}}_{ij}^Y
$$

[View →](../../../../equation-mapping.html#corpus-equation-56c453325c784131)
Thus $\mathbf Y$ solves the same equations. $\square$

**Implication:** In an action-derived regularization, these symmetries correspond to exact history-space integrals of motion. Because the interaction is non-local in time, those integrals must account for momentum and energy carried by causal wake surfaces rather than only by the instantaneous mechanical coordinates.

---

### Conservation of Generalized Momentum

As a standard instantaneous-interaction comparison, equal bookkeeping weights would give $\mu_{\text{arch}}\mathbf A_{12}(T)=-\mu_{\text{arch}}\mathbf A_{21}(T)$. The delayed system does not generally satisfy that equal-time relation: $\mathbf A_{12}(T)$ samples architrino 2 at $T-\Delta_1$, while $\mathbf A_{21}(T)$ samples architrino 1 at $T-\Delta_2$. This comparison does not introduce force as a substrate quantity; the Master Equation remains acceleration-first.

#### Definition (Mechanical Momentum)
The instantaneous mechanical momentum is:
$$
\mathbf{P}_{\text{mech}}(T) = \sum_{i} \mu_{\text{arch}} \mathbf V_i(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-80d5ba33852e8a56)
This is the mechanical momentum of the optional quadratic kinetic proxy. On a general primitive kinetic-scalar chart, each $\mu_{\text{arch}}\mathbf V_i$ is replaced by the declared conjugate momentum $\mathbf p_i=P(\|\mathbf V_i\|)\hat{\mathbf V}_i$, with $P'(s)=K'(s)/s$ as specified in [Energy](energy.md#kinetic-energy-and-momentum-of-a-single-architrino). Neither construction assigns primitive mass to an architrino.

Because of the delay, $\frac{d}{dT}\mathbf{P}_{\text{mech}} \neq 0$ generally.

#### Conservation Target (Total Momentum Functional)
For an action-derived delayed model with translation symmetry, there exists a functional $\mathbf{P}_{\text{wake}}[\mathbf X_T]$ representing the momentum flux encoded in the active causal wake surfaces such that the total momentum:
$$
\mathbf{P}_{\text{tot}} = \mathbf{P}_{\text{mech}}(T) + \mathbf{P}_{\text{wake}}[\mathbf X_T]
$$

[View →](../../../../equation-mapping.html#corpus-equation-2d7f5b32fa849f58)
is conserved. For working regularized models, this same expression is a validation diagnostic unless the chosen regularization preserves the translation symmetry of the underlying action.

**Explicit Form (Weak Coupling Limit):** For $\eta \to 0$, the wake momentum can be approximated by integrating the acceleration impulse over the delay time:
$$
\mathbf{P}_{\text{wake}} \approx \sum_{i \neq j} \int_{T - \Delta_{ij}(T)}^{T} \mu_{\text{arch}}\mathbf A_{ij}^{\text{emit}}(T') \, dT'
$$

[View →](../../../../equation-mapping.html#corpus-equation-09d0270897868038)
*Physical interpretation:* The "missing" momentum is accounted for by the causal wake surfaces currently traversing the space between transmitters and receivers in an action-derived model; otherwise this balance is the momentum diagnostic to verify.

**Corollary (Center of Response Motion):** For an isolated binary, the center of mass $\mathbf X_{\text{cm}}$ need not move at constant velocity in the mechanical coordinates alone. Instead, it can oscillate around a mean trajectory while wake momentum carries the compensating history term. This is the two-body version of the [center-of-response theorem target](energy.md#energy-conservation-and-exchange): in an exactly symmetric circular binary, the exposed-energy response center $\mathbf{X}_{\mathrm{resp}}$ is pinned to the circle center by symmetry, while the particle-only mechanical center can still show finite-window oscillatory bookkeeping if wake momentum is not included. A runaway center-of-mass self-acceleration is forbidden only in an action-derived model whose regularization preserves translation symmetry; in working regularized models this is a conservation diagnostic to be checked.

---

### Energy and The Lyapunov Functional

Energy conservation is the critical constraint preventing runaway solutions.

#### Definition (The History Hamiltonian)
For an action-derived delayed model with time-translation symmetry, the target conserved quantity $\mathcal{H}$ is a history functional. For state-dependent delays, the useful comparison object is a **Lyapunov-Krasovskii-style functional**:
$$
\mathcal{H}(\mathbf X_T) = K(T) + \mathcal{U}_{\text{history}}(\mathbf X_T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b85f9571774650f8)

1. **Kinetic Energy:** $K(T) = \sum \frac{1}{2} \mu_{\text{arch}} \|\mathbf V_i(T)\|^2$.
2. **Potential Functional:** $\mathcal{U}_{\text{history}}$ accumulates the assembly-level work bookkeeping from the delayed acceleration contributions. Unlike an instantaneous potential $V(r)$, this depends on the configuration of all active wake surfaces.

#### Trajectory Identity (Energy Balance)
$$
\frac{dK}{dT} = \sum_{i} \mu_{\text{arch}}\mathbf V_i(T) \cdot \mathbf A_i(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9a8dc6555582a60f)
We define the **Interaction Potential Functional** $\mathcal{W}(T)$ such that:
$$
\mathcal{W}(T) = -\int_{T_{\mathrm{init}}}^T \sum_i \mu_{\text{arch}}\mathbf V_i(T') \cdot \mathbf A_i(T') \, dT'
$$

[View →](../../../../equation-mapping.html#corpus-equation-baaa1f0c2124b785)
This functional is nonlocal in time: it accumulates deferred work along the path-history of wakes and is not an instantaneous potential $U(r)$. Then, by construction along the realized trajectory, $\mathcal{E}_{\text{tot}} = K(T) + \mathcal{W}(T)$ is constant. It is an exact Noether charge only when $\mathcal{W}$ is the boundary term of the same symmetry-preserving delayed action; otherwise it is a diagnostic reconstruction.

That distinction is decisive for the circular tangential channel. A $\mathcal W$ obtained by integrating the same $\mathbf A\cdot\mathbf V$ record cannot test whether the record contains persistent forward tangential acceleration; it assigns the opposite change to $\mathcal W$ by definition. Independent circular energy closure requires the action-derived boundary charge or a separately derived finite-window wake account.

#### Lemma (Boundedness of the Potential)
**Assumption:** The interaction is regularized with width $\eta > 0$ such that the per-hit acceleration is bounded: $\|\mathbf A_{ij}\| \le A_{\max}(\eta)$. **Statement:** For a bound system (architrinos confined to a finite volume $V$), the magnitude of the assembly-level work rate is bounded by $N\mu_{\text{arch}}A_{\max}V_{\max}$.

#### Conditional Target (No-Runaway Criterion)
This criterion is not a completed theorem until the same symmetry-preserving regularized action supplies $\mathcal{W}$ on the retained branch chart and a lower bound is proven for that branch. Under those hypotheses, in an action-derived master-equation branch with fixed $\eta>0$, an isolated binary cannot undergo runaway acceleration ($\|\mathbf V\| \to \infty$) *unless* the action-compatible potential energy functional $\mathcal{W}(T)$ diverges to $-\infty$.

*Proof Logic:* Since $\mathcal{E}_{\text{tot}}$ is constant:
$$
K(T) = \mathcal{E}_{\text{tot}} - \mathcal{W}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-bc09cddcdde16f33)
For $K(T)$ to diverge, $\mathcal{W}(T)$ must decrease without bound.
1. **Partner attraction:** $q_1 q_2 < 0$. The potential is negative (attractive). As $r \to 0$, $V \to -\infty$. Collapse leads to infinite kinetic energy in the standard Kepler singularity pattern; in this architecture, self-hit is the proposed counter-channel.
2. **Self-hit repulsion:** $q_1 q_1 > 0$. The acceleration is **repulsive**. The potential contribution is **positive**.
  *  Work done by self-hit: If an architrino is pushed "from behind" by its own wake, it gains $K$.
  *  However, this energy must come from the $\mathcal{W}$ term.
  *  Since self-hit potential is repulsive (positive energy hill), converting it to kinetic energy lowers the total potential.
  *  **Crucial bound:** The deferred work encoded in a self-wake is finite when the emitted causal-wake budget is finite. An architrino cannot extract infinite energy from its own past unless the history functional has already assigned an infinite budget to that causal wake.

**Conclusion:** A self-acceleration runaway, where an architrino accelerates itself indefinitely using self-acceleration contributions, is excluded only on branches satisfying the action-derived conservation and lower-bound hypotheses. In other working models, the same statement is a validation target: the system can oscillate or settle, but an apparent explosion to $\|\mathbf V\|=\infty$ must be traced either to singular collapse, transversality loss, or a broken conservation diagnostic.

## Summary

The circular atlas establishes exact delay equations, signed-sheet root thresholds, and canonically weighted radial and tangential coefficients. The principal partner branch cannot form a particle-only constant-speed circle because its tangential acceleration is positive. The complete unregularized canonical simple-root ledger does contain algebraic radial/tangential balance points, so the circular ansatz is not excluded at that level. Redirecting the acceleration toward an inertially extrapolated emission site removes those candidates and supplies no replacement equilibrium on $1<s<20$, but the autonomous fixed-speed wake state rejects that construction as the local response of the present causal surfaces. A maximum-curvature binary remains conditional: the canonical candidates must survive one finite singular-event convention, retained-history transport, wake-boundary exchange, return-map stability, Jacobian floors, and the action-derived conservation charges on one retained history record.
