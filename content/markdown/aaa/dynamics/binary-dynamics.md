# Binary Dynamics

This chapter develops two-body architrino dynamics from the appearance of self-hit to candidate stable binaries and their conditional role as measurement standards. It then formalizes the maximum-curvature attractor analysis and closes with the state-space and conservation-law foundations needed for well-posed dynamics. **Status:** (1) self-hit makes the dynamics non-Markovian (path-history dependent), and (2) stability/attractor claims are conjectural unless explicitly established.

It is the foundational precursor to [Nested Shell Braid Dynamics](../noether-braid/nested-shell-braid-dynamics.md), [Doubling-Frequency Resonance Lock](../noether-braid/noether-braid-doubling-frequency-resonance-lock.md), [Master Equation](master-equation.md), and the assembly-level [Noether Braid](../noether-braid/noether-braid.md).

This chapter is the canonical home for two-body wake regimes, partner-hit versus self-hit behavior, circular anti-damping, non-circular spiral hypotheses, and maximum-curvature binary analysis. The primitive-entity ontology in [Architrino](../foundations/architrino.md) should point here once the discussion becomes a behavioral regime or assembly-stability mechanism.

## The Spiral Orbiting Binary and the Contraction Phase

An orbiting binary is the simplest emergent assembly, consisting of two architrinos of opposite polarity: an Electrino and a Positrino. With polarities $-\epsilon$ and $+\epsilon$, the assembly is electrically neutral overall. This system is the first teaching case for delayed causal wakes, partner-hit contraction, and the self-hit onset boundary.

Consider the ideal case of a symmetric orbit in a universe with no other architrinos. In general, each architrino is subject to a superposition of external causal wake contributions from all other sources; the analysis below isolates the binary by setting those external contributions to zero.

Let the Electrino be architrino 1 and the Positrino be architrino 2.
-  **Positions:** $\mathbf{s}_1(t)$ and $\mathbf{s}_2(t)$
-  **Polarities:** $q_1 = -\epsilon$ and $q_2 = +\epsilon$

The motion of each architrino is determined by the wake emitted by the other at a delayed time. The acceleration of the Electrino (architrino 1) at time $t$ is caused by the Positrino's (architrino 2) wake emitted at an emission time $t_0$. This is governed by the interaction condition:
$$
\|\mathbf{s}_1(t) - \mathbf{s}_2(t_0)\| = c_f(t - t_0)
$$
The acceleration vector for the Electrino is attractive, pointing towards the Positrino's delayed position:
$$
\mathbf{a}_1(t) \propto -\hat{\mathbf{r}}_{21} = - \frac{\mathbf{s}_1(t) - \mathbf{s}_2(t_0)}{\|\mathbf{s}_1(t) - \mathbf{s}_2(t_0)\|}
$$
A symmetric set of equations governs the Positrino's motion based on the Electrino's emissions.

In the strictly sub-field-speed regime (no self-interaction, $\|\mathbf{v}\|\le c_f$), a stable, circular orbit is impossible. Because the attractive force on each architrino points to the *past* position of its partner, it is not a true central force. The principal circular branch proves a sharper direction diagnostic: the partner line of action has a forward tangential projection, so the partner-only near-circular ledger is anti-damped rather than a contraction proof. This diagnostic is not a receiver-normal force-balance certificate. A logarithmic inward spiral can still be used as a separate non-circular ansatz or capture target, but its radial tightening must be certified by solving that branch chart with same-record receiver-normal branch strength; it is not implied by the principal circular sign.

Standard central-force mechanics conserves angular momentum because the force at time $t$ is collinear with the equal-time separation vector. The partner-hit branch does not have that geometry. Define the equal-time separation and delayed line of action by
$$
\mathbf{r}_{12}^{\mathrm{eq}}(t)
\equiv
\mathbf{s}_1(t)-\mathbf{s}_2(t),
\qquad
\widehat{\mathbf{r}}_{12}(t;t_0)
=
\frac{\mathbf{s}_1(t)-\mathbf{s}_2(t_0)}
{\|\mathbf{s}_1(t)-\mathbf{s}_2(t_0)\|}
$$
The delayed partner branch carries the angular-momentum-change direction
$$
\mathbf{r}_{12}^{\mathrm{eq}}(t)
\times
\widehat{\mathbf{r}}_{12}(t;t_0)
$$
which is generically nonzero because $\mathbf{s}_2(t_0)$ is not the partner's equal-time position. Therefore the usual angular-momentum barrier and the instantaneous effective potential
$$
V_{\mathrm{eff}}(r)=V(r)+\frac{ml^2}{2r^2}
$$
cannot be imported as the binary's governing reduction. A conserved angular-momentum-like quantity, if present, must include the causal-wake history term that balances the delayed torque.

**Receiver-normal restart target for the sub-field partner row.** In units with $c_f=1$, the circular speed is $s=R\omega$. The source-normal circular sign diagnostic gives
$$
T_p^{\mathrm{src}}
\propto
\frac{\sin(\delta_p/2)}{\cos^2(\delta_p/2)}
\quad (0<\delta_p<\pi)
$$
where $\delta_p$ is the partner delay angle. This is not a canonical force verdict. The receiver-normal row must recompute the partner contribution with same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$, then test finite-window work and wake-history balance before any constant-speed circular conclusion is promoted.

-  The source-normal circular geometry nominates a tangential-sign diagnostic for the partner-only ledger.
-  The radial component points inward, but inward radial pull plus positive tangential work does not by itself prove a tightening spiral.

With perfectly symmetric initial conditions, the paths of the electrino and positrino are distinct but mirror-related. If the branch begins as a radial fall or enters a non-circular capture basin, it may still contract, but that is a separate branch-history statement. Emission cadence and intrinsic per-wavefront amplitude remain constant, while the **received** force is velocity-dependent because the causal-delay Jacobian compresses or dilates the causal flux along each active branch. For action or wake-history rates accumulated along a moving receiver path, the same root also carries the receiver-normal factor $ds_\ell/dt=(c_f-\hat{\mathbf r}\cdot\mathbf v_i)/(c_f-\hat{\mathbf r}\cdot\mathbf v_j)$. The evolution is therefore driven by delay geometry, branch bunching, receiver-path sampling, and, once active, self-interaction.

Initially, and as long as the speeds of both architrinos are less than or equal to the wake propagation speed $c_f$, they are only influenced by their partner's attractive wake. The total acceleration is simply the attractive force:
$$
\mathbf{a}_{1, \text{total}}(t) = \mathbf{a}_{1,2}(t) \quad \text{and} \quad \mathbf{a}_{2, \text{total}}(t) = \mathbf{a}_{2,1}(t)
$$
During this partner-only phase, the retained force has an inward radial component and a forward tangential work row. In the circular or near-circular reduction that combination is anti-damping: it accelerates the orbiting motion and prevents a partner-only constant-speed circle. It does not, by itself, prove a tightening spiral. Any sub-field-speed contraction claim must come from a certified non-circular branch, a capture basin, or an explicit finite-window wake/recoil ledger.

### Ideal Symmetric Spiral Ansatz

The ideal binary spiral used in this opening analysis is not the same geometry as the later maximum-curvature circular benchmark. It is a **symmetric logarithmic-spiral ansatz**: the electrino and positrino follow two distinct planar curves related by the binary symmetry. At equal absolute time they remain opposite about the midpoint in the ideal center frame, but each architrino's path is the mirror-conjugate of the other's path rather than the same curve traced by both architrinos.

This matters because the ideal spiral is a **transient, scale-similar contraction ansatz**, not a consequence of the principal circular calculation. Within a fixed velocity regime and fixed active-root ledger, the model assumes that the local force geometry repeats after a scale change and phase advance: radii shrink by a common factor, speeds rise according to the same delayed-geometry rule, and the partner/self branch structure is symmetric between the two architrinos. When the trajectory crosses a threshold such as $\|\mathbf{v}\|=c_f$ or a higher root-birth boundary, that scale-similar description must be re-matched on a new branch chart.

By contrast, the maximum-curvature binary section studies a **uniform circular benchmark**: fixed $R$, fixed $s$, and a single circular path geometry used to compute closed-form delay angles, branch Jacobians, and per-hit force components. That circular model is useful as a limiting or diagnostic case, and it gives the anti-damping obstruction that any non-circular contraction story must beat. The detailed non-circular benchmark for the symmetric logarithmic spiral belongs in [Master Equation](master-equation.md#symmetric-delayed-logarithmic-spiral-advanced-non-circular-benchmark); this chapter uses it only as the conceptual two-body entry point.

### Translating Binary Trace

The same binary has a co-moving orbit and an absolute-history trace. If a circular binary translates with center velocity $\mathbf{V}$ while its orbital plane is spanned by orthonormal axes $\mathbf{e}_1,\mathbf{e}_2$, a first kinematic diagnostic is

$$
\mathbf{x}_{\pm}(t)
=
\mathbf{X}_0+\mathbf{V}t
\pm
R\left(\cos\omega t\,\mathbf{e}_1+\sin\omega t\,\mathbf{e}_2\right),
\qquad
\mathbf{n}=\mathbf{e}_1\times\mathbf{e}_2 .
$$

When $\mathbf{V}$ is parallel to $\mathbf{n}$, each architrino draws a constant-pitch helical trace with pitch $2\pi\|\mathbf{V}\|/\omega$ per binary cycle. At a tilted orientation, the absolute-history trace combines longitudinal pitch $2\pi|\mathbf{V}\cdot\mathbf{n}|/\omega$ with transverse drift from $\mathbf{V}-(\mathbf{V}\cdot\mathbf{n})\mathbf{n}$. This trace is a visualization and solver diagnostic, not a stability proof: the dynamical question is still whether the translated path-history ledger retains the same active causal roots, Jacobian floors, energy/action rows, and branch identity.

## Spiral Momentum Budget Across the Hinge (Speculative)

This subsection records a modeling hypothesis rather than a derived law. The desired closure would link the spiral path, the per-hit force law, and the angular-momentum budget across the full velocity range. Below the wake speed, the binary feels only partner hits, and the principal circular branch has positive tangential work. A contraction ansatz must therefore explain how radial tightening survives that anti-damping row through non-circular geometry, wake-flux export, recoil, or a later multi-root ledger. We introduce a per-cycle gain parameter $\Delta L_c$ only as a provisional bookkeeping variable for that unresolved branch-history calculation.

**Branch-birth jump target:** a smooth doubling rule is too strong unless the active causal-root ledger stays unchanged. On a fixed signed branch chart $b(s)$, the per-cycle escaped angular-momentum entry should instead be written
$$
\Delta L_{\mathrm{cycle}}(s)
=
\sum_{\rho\in b(s)}
\ell_{\rho}^{\mathrm{esc}}(s),
$$
where $\rho$ ranges over the active partner and self rows that actually send wake angular momentum through the window boundary. At a branch birth the ledger changes, so the cycle budget has a jump law rather than an automatic smooth continuation. At the principal self-hit hinge,
$$
\Delta L_{\mathrm{cycle}}(1^+)-\Delta L_{\mathrm{cycle}}(1^-)
=
\ell_{\mathrm{self},0}^{\mathrm{esc}}(1^+),
$$
with the right-hand side evaluated in the same finite-$\eta$ chart that regularizes the caustic. The older heuristic $\Delta L_c\mapsto2\Delta L_c$ is recovered only in the special case where the newly born principal self row exports exactly the same cycle increment as the pre-hinge partner ledger.
More precisely, $\ell_{\mathrm{self},0}^{\mathrm{esc}}(1^+)$ is not the value of a divergent pointwise tangential coefficient at the hinge. It is the finite angular impulse
$$
\ell_{\mathrm{self},0}^{\mathrm{esc}}(1^+)
=
\lim_{\eta\to0^+}
\int_{t^-}^{t^+}
R(t)\,A_{\mathrm{self},0,\eta}^{\mathrm{tan}}(t)\,dt
$$
when that limit exists under the same finite-caustic transit convention used for the velocity impulse. If the impulse limit is regulator-dependent, the branch-birth jump remains a diagnostic row rather than a promoted angular-momentum ledger entry.

This section treats an exponential-in-angle spiral (logarithmic spiral) as a **modeling assumption** rather than a derived law. It sets the bookkeeping target: a path-history force sum whose signed branch-birth increments and boundary wake fluxes yield the spiral contraction. Near $s=1^+$ the principal self row inherits the caustic onset already displayed below; after finite-window averaging its branch-entry impulse should still report the $(s-1)^{-3/2}$ wall inherited from the self radial coefficient, while the sharper raw tangential coefficient must be regularized before it is used in a cycle ledger.

## Spiral Binary Symmetry-Breaking Point ($\|\mathbf{v}\| = c_f$)

The binary system's evolution is organized around the **field-speed symmetry point** $\|\mathbf{v}\|=c_f$. This is a **hinge** where the causal structure changes: below $c_f$ only partner-delay forces exist, while above $c_f$ self-hit roots appear. The hinge is not a hard barrier; it is the birth of the principal self branch. In the symmetric circular geometry the self-delay equation is
$$
\delta_s = 2s\sin(\delta_s/2), \qquad s=\frac{\|\mathbf{v}\|}{c_f}
$$
Writing $s=1+\mu$ with $\mu>0$ small, the principal root satisfies
$$
\delta_s \sim \sqrt{24\mu},
\qquad
\sin(\delta_s/2)\sim \sqrt{6\mu}
$$
The associated branch Jacobian is
$$
J_s = 1-s\cos(\delta_s/2)=1-\frac{\delta_s}{2}\cot(\delta_s/2)\sim 2\mu
$$
Therefore the self radial and tangential magnitudes scale as
$$
\frac{1}{\sin(\delta_s/2)\,|J_s|}\sim \mu^{-3/2},
\qquad
\frac{1}{\sin^2(\delta_s/2)\,|J_s|}\sim \mu^{-2}
$$
This is the first major consequence of restoring the causal Jacobian: the hinge is not merely a change in root count but a genuine **caustic onset**. The principal self branch turns on with a sharply amplified outward radial response and an even more singular tangential drive. The tangential pump strengthens faster than the radial barrier as the hinge is approached, so the immediate super-hinge region cannot be treated as a quiet equilibrium. Any candidate maximum-curvature balance must therefore either avoid that region or supply a cancellation channel with comparable caustic scaling before appealing to higher-winding smoothing.

## Self-Hit: Definition and Diagnostics

Self-hit is the key non-Markovian feature of architrino dynamics. It occurs when an architrino interacts with potential it emitted earlier along its own worldline.

**Geometric condition (absolute coordinates):** For a given architrino with trajectory $\mathbf{x}(t)$, a self-hit event is a pair of times $(t_\text{emit}, t_\text{hit})$ with $t_\text{hit} > t_\text{emit}$ such that
$$
\|\mathbf{x}(t_\text{hit}) - \mathbf{x}(t_\text{emit})\| = c_f (t_\text{hit} - t_\text{emit})
$$
and the architrino is the source of the causal wake surface emitted at $t_\text{emit}$.

**Terminology split:** Hit type is determined by **source identity**. A **self-hit** has the same source and receiver; a **partner hit** has a different source and receiver. Root count is a separate question: either source can contribute one active causal root or multiple active roots at the same reception time. Thus "self-hit" does not mean "multi-hit," and "partner hit" does not mean "single-hit."

**Dynamical role:**
- On any interval with strict sub-field-speed motion, self-hit is absent by the triangle-inequality root test, unless older path-history emissions from a prior super-field-speed interval remain active.
- As velocities exceed $c_f$ on curved histories, emission isochrons can catch up with the emitter's future positions, generating candidate nonlocal feedback and effective restoring or destabilizing forces depending on configuration.
- In generic trajectories, once an architrino has exceeded $c_f$ and emitted wakes in that regime, it can later slow below $c_f$ and still experience self-hits from those earlier emissions (see **Status** at top for the non-Markovian/path-history caveat).
- For binary and Noether braid assemblies, repeated self-hit events are the proposed mechanism that can prevent collapse, lock in stable radii and frequencies, and create new limit cycles and attractors.

For the circular-geometry details (principal angles, winding numbers, discrete self-hit branches), see **Setup and Notation (Symmetric Frame)** in **Maximum-Curvature Binary — Circular**.

## Post-Threshold Self-Hit Phase

Once the circular branch admits same-source roots, the architrinos interact with their own earlier, repulsive wakes. The total acceleration on each architrino then becomes a superposition of attraction from its partner and self-repulsion. For the electrino:
$$
\mathbf{a}_{1, \text{total}}(t) = \mathbf{a}_{1,2}(t) + \mathbf{a}_{1,1}(t)
$$
In the circular benchmark, the principal self-hit branch ($m=0$) becomes available only on the super-field-speed side; at higher speeds, additional self-hit and partner-hit roots can turn on (see **Root Multiplicity vs. Speed**). The new self-repulsive term, $\mathbf{a}_{1,1}(t)$, grows rapidly as the path curvature increases and changes the tangential ledger. On the same-sheet principal chart that tangential contribution is forward; in the full signed ledger, older sheets can contribute with the opposite tangential sign. This post-threshold phase is therefore a branch-certificate target, not a generic tightening law: any radial arrest or continued contraction must be decided by the signed multi-root ledger, wake-flux/recoil accounting, and stability certificate described below.

## Maximum-Curvature Binary — Circular

Receiver-normal restart notice. The circular MCB branch topology, root labels,
and source-normal Jacobian formulas remain useful geometry. Force components,
stability criteria, action rows, and any branch-weighted verdicts in this
section must be redriven with $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$ before
they can serve as canonical Master EOM evidence.

Once self-hit turns on, the natural question is whether the dynamics converge to a limiting curvature. We call the candidate limit the **maximum-curvature binary (MCB)**. This section collects the full two-body, self-hit analysis for that candidate, including delay geometry, force components, and stability criteria. It is the canonical reference for MCB attractor status.

MCB stability claims rely on the well-posedness of the regularized SD-NDDE. In this chapter we treat $\eta > 0$ as fixed; any $\eta \to 0$ statement is outside the claims established here unless a weak-limit argument is explicitly supplied. The formal state-space framework appears in **State Space and Well-Posedness of the Two-Body Delay System**.

**Goal**: Characterize the circular, constant-speed, constant-radius configuration of two opposite-polarity architrinos and investigate where curvature $1/R$ is maximized. We work in units with field speed $c_f = 1$ and use the canonical delayed per-hit law with radial line of action and receiver-normal branch strength.

**Plain language**: We seek the tightest (smallest-$R$) steady circle an opposite-polarity pair can trace when the only forces come from delayed line-of-action interactions with the partner (partner hits, possibly multiple at higher speed) and from each architrino's own past emissions (self-hits, accepted by same-source roots; in the circular branch these require the super-field-speed side). In the canonical receiver-normal law, each retained hit must carry both the source-normal denominator and the receiver-normal factor.

### Foundational Context (Ontological Clarification)

#### The Maximum-Curvature Binary (MCB) as Fundamental Unit

The architecture hypothesizes that the **maximum-curvature binary (MCB)** would be reachable first by the **inner binary** of a nested shell braid assembly, stabilized by certified same-source self-hit roots on the super-field-speed circular branch. Contingent on Conjectures A/B, it would supply candidate **fundamental physical units** (length and time); see **Emergent Properties and Measurement Standards** below for the explicit definitions.

**Universal cap target (explicit):** If a stable MCB branch is certified, it would define a single limit state with one radius/speed pair. Binaries may sit below that limit, but the claim that no binary can exceed the MCB curvature or pass beyond its defining radius/speed remains conditional on the full signed-root ledger and stability certificate.

If realized, the MCB radius $r_{\text{min}}$ is expected to be determined by the balance of:
1. opposite-polarity causal-wake attraction, with the stripped inverse-square surrogate scaling as $\epsilon^2/r^2$,
2. self-hit repulsion (non-Markovian feedback when same-source roots exist; super-field-speed circular history is the relevant branch),
3. Centripetal requirement for stable circular orbit.

**Dynamical priority (attractor status):** The architecture hypothesizes the MCB is a **robust attractor**, not a finely tuned periodic orbit. Only if the multipliers lie strictly inside the unit circle and the basin is non-trivial do we have the attractor the architecture relies on. If neutrality or instability is found, the nested shell braid ladder and Noether braid claims must be downgraded or the interaction law revised (e.g., additional damping/medium effects).

### Setup and Notation (Symmetric Frame)

- **Two architrinos** with polarity bookkeeping labels $q_1 = -\epsilon$ and $q_2 = +\epsilon$ (where $\epsilon = |e|/6$).
- **Equal-time positions** (in absolute time $t$) are diametrically opposite on a circle of radius $R$ about the midpoint.
- **Uniform circular motion**: Angular speed $\omega$, constant tangential speed $s = R\omega$.
- **Non-translating binary**: Circle center (midpoint) is fixed in Euclidean 3D space; no net translation.

### Translating Binary Handoff to Lorentz Closure

The circular maximum-curvature benchmark is also the rest-frame boundary condition for the first material clock/ruler test. The translating ansatz keeps absolute time and the primitive wake speed explicit:
$$
\mathbf{x}_{\sigma}(t)
=
u t\,\hat{\mathbf e}
+
\sigma\,\boldsymbol{\rho}_u(\theta(t)),
\qquad
\sigma\in\{+1,-1\}
$$
where $\boldsymbol{\rho}_0$ is the circular branch studied here and $\boldsymbol{\rho}_u$ is the deformed periodic orbit, if it exists, on the retained moving branch chart.

This is a direct delayed-root calculation, not a coordinate boost imposed on the answer. The root equations must be solved again with the source positions, source velocities, partner-hit rows, self-hit rows, and Jacobian factors evaluated on the translating history. The decisive outputs are the moving period $T_u$ and the projected size ratio $L_{\parallel}(u)/L_{\perp}(u)$. In primitive units the Lorentz target is
$$
\frac{T_u}{T_0}=\gamma_f(u),
\qquad
\frac{L_{\parallel}(u)}{L_{\perp}(u)}=\frac{1}{\gamma_f(u)},
\qquad
\gamma_f(u)=\left(1-\frac{u^2}{c_f^2}\right)^{-1/2}
$$
The exact residual definitions and Theorem G role are recorded in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#translating-binary-benchmark). A Lorentzian result would make the two-body branch the first derived substrate clock. A non-Lorentzian residual would be equally informative because it would identify the first place where the primitive two-body kernel pressures the larger Lorentz-closure program.

The moving-branch test also has a root-starvation obligation. If a forward source row has minimum forward separation $d_{\min}$ in the direction of motion, then the causal delay needed to receive that row obeys the elementary bound
$$
\tau_{\mathrm{forward}}(u)\geq \frac{d_{\min}}{c_f-u}.
$$
This divergence is stronger than the Lorentz factor divergence,
$$
\gamma_f(u)\sim(c_f-u)^{-1/2},
$$
as $u\to c_f^-$. Therefore a bare translating binary cannot be promoted to the Lorentz handoff merely by showing that one clock period stretches. It must also show that the locked branch retains enough memory depth to supply the forward roots it claims. One diagnostic target is
$$
\mathcal{R}_{\mathrm{Lor\text{-}root}}(u)
=
\frac{\tau_{\mathrm{forward}}(u)/T_u}
{M_b^{\mathrm{mem}}(u)+\epsilon_h},
\qquad
M_b^{\mathrm{mem}}(u)=\frac{h_b^{\mathrm{lock}}(u)}{T_u},
$$
where $h_b^{\mathrm{lock}}$ is the declared retained-history depth of the moving branch and $\epsilon_h>0$ is a fixed normalization floor. If this residual diverges on the finite-$\eta$ moving chart, the two-body branch has run out of retained causal roots before it has derived Lorentz closure; the handoff must then move to a Noether-sea or larger assembly response rather than being booked as a bare-binary result.

Equivalently, with finite retained memory $h_b^{\mathrm{lock}}$, the bare translating binary hits a root-ledger wall at
$$
u_{\mathrm{crit}}
=
c_f-\frac{d_{\min}}{h_b^{\mathrm{lock}}},
$$
for any retained forward row with separation floor $d_{\min}$. At or above this wall that row exits the memory window, so the active causal-root ledger cannot be preserved on the same two-body chart. This is the binary-level version of the forward partner-root starvation theorem in [Master Equation](master-equation.md#delay-map-theorem-pack-formalized): the obstruction is kinematic/topological before it is a force-balance residual.

Let $C_i(t_\text{emit})$ denote the causal wake surface emitted by architrino $i$ at emission time $t_\text{emit}$. For uniform circular motion, self-hit events are discrete intersections between the worldline and its own wake surfaces. Define the **principal self-delay angle** $\tilde{\delta}_s \in (0, \pi]$ as the minimal angular separation between the current position and the emission point that yields a hit. Additional self-hits occur at longer delays indexed by winding number $m \ge 0$, giving a discrete family $\delta_s(m) = \tilde{\delta}_s + 2\pi m$.

#### Phase Angles and Delays

Let $\delta_s$ and $\delta_p$ denote the angular phase separations (measured along the circle) between:
- **Self** (same architrino): Current position -> its own past emission position that hits "now."
  - Delay time: $\tau_s$; angular separation: $\delta_s = \omega \tau_s$.
  - Chord length: $r_s = 2R \sin(\delta_s / 2)$.
 
- **Partner** (other architrino): Current position -> partner's past emission position that hits "now."
  - Delay time: $\tau_p$; angular separation: $\delta_p = \omega \tau_p$.
  - Chord length: $r_p = 2R \cos(\delta_p / 2)$.

#### Causal-Time Constraints (Field Speed $c_f = 1$)

For a signal to travel from emission point to reception point:
$$
r = c_f \cdot \tau \quad \Rightarrow \quad r = \tau \quad \text{(in units where } c_f = 1\text{)}
$$

This yields two delay equations:

1. **Self-hit**:
  $$
  \delta_s = \omega \tau_s = \omega \cdot r_s = \omega \cdot 2R \sin(\delta_s / 2) = 2s \sin(\delta_s / 2)
  $$

2. **Partner hit**:
  $$
  \delta_p = \omega \tau_p = \omega \cdot r_p = \omega \cdot 2R \cos(\delta_p / 2) = 2s \cos(\delta_p / 2)
  $$

**These two transcendental equations determine** $(\delta_s, \delta_p)$ **as functions of speed** $s$.

**Circular-branch threshold**: On this uniform circular branch, self-hit roots exist only when $s > 1$ (i.e., $\|\mathbf{v}\| > c_f$). For $s \le 1$, no self-hit roots occur on the circular chart. This is a branch-specific root result, not a general speed-only criterion for arbitrary histories.

---

#### Principal Partner-Root Certificate

For the partner branch, write the full delay angle as
$$
\phi=\omega\Delta
$$
and the chapter speed ratio as
$$
\beta=\frac{\omega R}{c_f}
$$
The principal partner-root equation is
$$
2\beta\cos\frac{\phi}{2}=\phi,
\qquad
0<\phi<\pi
$$
The function $F(\phi)=2\beta\cos(\phi/2)-\phi$ satisfies $F(0)=2\beta>0$, $F(\pi)=-\pi$, and
$$
F'(\phi)=-\beta\sin\frac{\phi}{2}-1<0
$$
on $(0,\pi)$. Therefore the principal partner root exists and is unique for every $\beta>0$.

The same conclusion gives a derived transversality floor. On the principal partner branch,
$$
J_p=1+\beta\sin\frac{\phi}{2}
$$
so the dimensional root-transversality quantity is
$$
\kappa_{\mathrm{hit}}^{\mathrm{bin}}
\equiv
\left|
c_f-\hat{\mathbf r}\cdot\mathbf{v}_j(t-\Delta)
\right|
=
c_f\left(1+\beta\sin\frac{\phi}{2}\right)
>
c_f
$$
This floor is not an admissibility parameter for the principal branch; it is a computed property of the circular geometry. It certifies that the simple-root chart cannot fail by partner-root tangency on the principal partner branch.

The instantaneous radial-balance equation is also closed form. Setting the inward partner radial acceleration equal to the required centripetal acceleration gives
$$
\frac{\beta^2c_f^2}{R}
=
\frac{\kappa\epsilon^2}
{4R^2\cos(\phi/2)\left(1+\beta\sin(\phi/2)\right)}
$$
and therefore, with $R_*=\kappa\epsilon^2/c_f^2$,
$$
\frac{R}{R_*}
=
\frac{1}
{4\beta^2\cos(\phi/2)\left(1+\beta\sin(\phi/2)\right)}
$$
As $\beta\to0$, the root satisfies $\phi\sim2\beta$, and the balance reduces to
$$
\omega^2R^3=\frac{\kappa\epsilon^2}{4}
$$
which is the delayed Coulomb-Kepler scaling for the isolated opposite-polarity pair.

The same principal branch still cannot be a uniform orbit. The delayed partner line of action has a forward tangential projection, so
$$
a_\theta^{(\mathrm{part})}
=
\frac{\kappa\epsilon^2\sin(\phi/2)}
{4R^2\cos^2(\phi/2)\left(1+\beta\sin(\phi/2)\right)}
>
0
$$
and the instantaneous work rate satisfies $a_\theta^{(\mathrm{part})}R\omega>0$. Thus the principal branch has positive tangential work in the partner-only circular reduction: it gives the radial family above, but it also pumps tangential energy. A partner-only constant-speed circular binary therefore requires a signed multi-root tangential residual
$$
\sum_{t_0\in\mathcal{C}_{12}(t)}a_\theta^{(12)}(t;t_0)
+
\sum_{t_0\in\mathcal{C}_{11}(t)}a_\theta^{(11)}(t;t_0)
=0
$$
on the retained ledger, or an explicitly retained wake-flux/recoil channel in the finite-window energy ledger. Since circular self-hit roots require super-field-speed history on this branch, a self-hit-stabilized MCB candidate must live on the super-field-speed side of the circular ledger rather than on the principal partner branch alone.

Additional partner roots are not speculative. In the full delay-angle representation, partner roots can occur only in positive-cosine windows
$$
W_k=\left(4\pi k-\pi,\ 4\pi k+\pi\right),
\qquad
k=0,1,2,\ldots
$$
with the principal root in $W_0\cap(0,\pi)$. For $k\ge1$, the root pair appears when the window maximum reaches zero:
$$
\sqrt{\beta^2-1}
+
\arcsin\frac{1}{\beta}
=
2\pi k
$$
At equality the two roots are born at a tangency; above it they thicken the partner-hit ledger. The root census is therefore a computed branch diagram rather than an independent conjecture.

#### Terminology: Roots and Winding Numbers

**Root**: An emission time $t_0 < t$ (from either self or partner) that satisfies the causal constraint $r = c_f (t - t_0)$ and produces a hit at reception time $t$.

**Integer-indexed older roots (winding numbers)**:

Let $\tilde{\delta}_s \in (0, \pi]$ and $\tilde{\delta}_p \in (0, \pi]$ denote the **minimal (principal) angular separations** that determine the chord lengths and force directions.

In the same-sheet convention used for the first circular no-go, the full families of causal delays are:

- **Self**: 
 $$
 \delta_s(m) = \tilde{\delta}_s + 2\pi m = 2s \sin(\tilde{\delta}_s / 2), \quad m = 0, 1, 2, \dots
 $$
 
- **Partner**: 
 $$
 \delta_p(m) = \tilde{\delta}_p + 2\pi m = 2s \cos(\tilde{\delta}_p / 2), \quad m = 0, 1, 2, \dots
 $$

**Geometric interpretation**:
- The minimal separations $\tilde{\delta}_s$, $\tilde{\delta}_p$ determine the **same-sheet principal geometry** (chord lengths, force directions).
- The winding index $m$ affects **timing/ordering** of multiple hits inside that same-sheet convention.

**Signed-sheet completion:** A full circular root certificate must also track whether the full delay angle is represented as $2\pi m+\alpha$ or $2\pi m-\alpha$ for a minimal chord angle $\alpha\in(0,\pi]$. The same-sheet convention is the quotient that forgets the orientation of the delay direction; the signed sheet $\sigma\in\{+1,-1\}$ lifts the circular root to the orientation double cover of the retained delay strip. Opposite signed sheets can reverse the tangential projection of a self-hit line of action. The sign-invariant statements below are therefore certified only on the same-sheet principal branch chart unless the signed sheet has been explicitly included in the root ledger.

For the full signed ledger, write
$$
\Delta_s^{\sigma,m}=2\pi m+\sigma\alpha_s,
\qquad
\Delta_p^{\sigma,m}=2\pi m+\sigma\alpha_p,
\qquad
\sigma\in\{+1,-1\}
$$
with $\sigma=-1$ requiring $m\ge1$. The signed circular root equations become
$$
2\pi m+\sigma\alpha_s=2s\sin(\alpha_s/2),
\qquad
2\pi m+\sigma\alpha_p=2s\cos(\alpha_p/2)
$$
The corresponding tangential signs are $\sigma\cos(\alpha_s/2)$ for self roots and $\sigma\sin(\alpha_p/2)$ for partner roots, up to positive branch weights. The signed sheet is therefore not a cosmetic ledger choice: it is the first place the bare circular kernel can acquire a same-source tangential contribution with the opposite sign from the same-sheet no-go row. The first negative self sheet, $m=1,\sigma=-1$, obeys
$$
2\pi-\alpha=2s\sin(\alpha/2)
$$
and appears at $s=\pi/2$ with $\alpha=\pi$. Equivalently, at the threshold a wake crosses the diameter $2R$ in time $2R/c_f$, while the source advances half a circumference $\pi R$ at speed $s c_f$; the equality $\pi R=s c_f(2R/c_f)$ gives $s=\pi/2$. For $s>\pi/2$ it contributes negative tangential drive. This does not prove circular closure, but it makes the $\sigma=-1$ sheet the first internal generator capable of carrying opposite period in the tangential cohomology class. A useful floor conjecture is:

> No isolated, bare, constant-speed circular MCB branch can close for $s<\pi/2$, because the first negative same-source sheet is absent and the same-sheet tangential cohomology class has no internal cancellation generator. In cochain language, the space available to the retained two-body ledger has no opposite-period self-row before the $\sigma=-1$ wall at $s=\pi/2$.

For $s\geq\pi/2$, closure is still not automatic. The negative sheet must survive the finite-$\eta$ branch chart, satisfy the Jacobian and inactive-gap floors, and balance the remaining tangential class through signed-root cancellation, wake escapement, recoil, or multi-body exchange.

---

### Per-Hit Directions and Force Components

#### Local Coordinate Frame at Receiver

- **Radial outward**: $\hat{e}_r$ (from rotation center toward receiver).
- **Tangential**: $\hat{e}_t$ (direction of motion along circle).

#### Unit Directions of Lines of Action (Emission -> Reception)

**Self-hit**:
$$
\hat{u}_s = \sin(\delta_s / 2) \, \hat{e}_r + \cos(\delta_s / 2) \, \hat{e}_t
$$

**Partner hit** (geometric chord across circle):
$$
\hat{u}_p = \cos(\delta_p / 2) \, \hat{e}_r - \sin(\delta_p / 2) \, \hat{e}_t
$$

#### Canonical Per-Hit Accelerations

Using the delayed law with line-of-action direction and receiver-normal branch strength (where $\kappa$ is a coupling constant and $\epsilon = |e|/6$), define source-normal branch denominators

$$
J_s \equiv 1-\frac{\mathbf{v}_{\text{self}}(t_0)\cdot \hat{u}_s}{c_f},
\qquad
J_p \equiv 1-\frac{\mathbf{v}_{\text{partner}}(t_0)\cdot \hat{u}_p}{c_f}
$$

These encode the geometric bunching or dilation of the received causal flux along the active self and partner branches.

**Self-hit** (like polarities -> repulsive):
$$
\mathbf{a}_s = +\kappa \epsilon^2 \frac{1}{r_s^2\,|J_s|} \hat{u}_s
$$

**Partner hit** (opposite polarities -> attractive):
$$
\mathbf{a}_p = -\kappa \epsilon^2 \frac{1}{r_p^2\,|J_p|} \hat{u}_p
$$

---

#### Explicit Circular Jacobians

For the symmetric circular geometry, the emitter velocities can be resolved exactly against the line-of-action directions:
$$
\mathbf{v}_{\text{self}}(t_0)\cdot \hat{u}_s = s\cos(\delta_s/2),
\qquad
\mathbf{v}_{\text{partner}}(t_0)\cdot \hat{u}_p = -s\sin(\delta_p/2)
$$
Hence the branch Jacobians reduce to
$$
J_s = 1-s\cos(\delta_s/2),
\qquad
J_p = 1+s\sin(\delta_p/2)
$$
Using the delay constraints gives equivalent forms
$$
J_s = 1-\frac{\delta_s}{2}\cot(\delta_s/2),
\qquad
J_p = 1+\frac{\delta_p}{2}\tan(\delta_p/2)
$$
These formulas make the asymmetry between the two branch types explicit:

- The partner branch always satisfies $J_p > 1$, so delay geometry **dilutes** the received partner flux relative to the static inverse-square value.
- The self branch can satisfy $J_s \to 0^+$, producing the causal bunching that sharpens self-hit into a null-separatrix wall.

---

#### Source-Normal Radial and Tangential Diagnostics

Define **inward radial** as positive (toward center) and **tangential** as positive in direction of motion.

The projections in this subsection are source-normal circular diagnostics. They
record branch orientation and root geometry, but they are not canonical Master EOM
acceleration rows until the same retained branches are recomputed with
$D_s$, $D_t$, and $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$.

**Chord lengths**:
$$
r_s = 2R \sin(\delta_s / 2), \quad r_p = 2R \cos(\delta_p / 2)
$$

**Inward radial diagnostic components**:

- **Self** (repulsive -> outward -> negative):
 $$
	 A_{s,\text{rad}}^{\mathrm{src}} = -\kappa \epsilon^2 \frac{\sin(\delta_s / 2)}{r_s^2\,|J_s|} = -\frac{\kappa \epsilon^2}{4R^2 \sin(\delta_s / 2)\,|J_s|}
 $$

- **Partner** (attractive -> inward -> positive):
 $$
	 A_{p,\text{rad}}^{\mathrm{src}} = +\kappa \epsilon^2 \frac{\cos(\delta_p / 2)}{r_p^2\,|J_p|} = +\frac{\kappa \epsilon^2}{4R^2 \cos(\delta_p / 2)\,|J_p|}
 $$

**Net inward radial diagnostic**:
$$
A_{\text{rad}}^{\mathrm{src}} = \frac{\kappa \epsilon^2}{4R^2} \left( \frac{1}{\cos(\delta_p / 2)\,|J_p|} - \frac{1}{\sin(\delta_s / 2)\,|J_s|} \right)
$$

**Tangential diagnostic components**:

- **Self**:
 $$
	 T_s^{\mathrm{src}} = +\kappa \epsilon^2 \frac{\cos(\delta_s / 2)}{r_s^2\,|J_s|} = \frac{\kappa \epsilon^2 \cos(\delta_s / 2)}{4R^2 \sin^2(\delta_s / 2)\,|J_s|}
 $$

- **Partner**:
 $$
	 T_p^{\mathrm{src}} = +\kappa \epsilon^2 \frac{\sin(\delta_p / 2)}{r_p^2\,|J_p|} = \frac{\kappa \epsilon^2 \sin(\delta_p / 2)}{4R^2 \cos^2(\delta_p / 2)\,|J_p|}
 $$

**Net tangential diagnostic**:
$$
T^{\mathrm{src}} = T_s^{\mathrm{src}} + T_p^{\mathrm{src}}
$$

---

#### Sub-Field-Speed Simplification ($s \le 1$; No Self-Hits)

When $s \le 1$, self-hits do not occur ($\delta_s$ has no solution). Only the partner contributes to this source-normal diagnostic:

$$
T^{\mathrm{src}}(s < 1) = T_p^{\mathrm{src}} = \frac{\kappa \epsilon^2}{4R^2} \frac{\sin(\delta_p / 2)}{\cos^2(\delta_p / 2)\,|J_p|}
$$

Using the delay relation $\delta_p = 2s \cos(\delta_p / 2)$:

$$
T^{\mathrm{src}}(s < 1) = \frac{\kappa \epsilon^2 s^2}{R^2} \frac{\sin(\delta_p / 2)}{\delta_p^2\,|J_p|}
$$

Because $J_p = 1+s\sin(\delta_p/2) > 1$, the source-normal delay geometry weakens the partner diagnostic relative to a stripped inverse-square surrogate. That sign row no longer proves a net tangential force or excludes a constant-speed circular orbit. In the canonical Master EOM, the sub-field partner row restarts with the same-record receiver-normal factor and the finite-window energy and wake-history balances below.

---

### Requirements for True Circular Orbit (Working Hypothesis)

For uniform circular motion at fixed radius $R$ and constant speed $s$:

1. **Receiver-normal centripetal balance**:
  $$
  A_{\text{rad}}^{\mathrm{rec}} = \frac{s^2}{R}
  $$

2. **Finite-window energy balance**:
  $$
  \left\langle
  \frac{dK_{\mu}}{dt}
  \right\rangle_W
  +
  \left\langle
  \Phi_{\mathrm{wake},\partial W}
  +
  P_{\mathrm{recoil}}
  \right\rangle_W
  =
  0
  $$
  Here $K_{\mu}$ is the chosen quadratic kinetic proxy, $\Phi_{\mathrm{wake},\partial W}$ is the causal-wake energy flux through the boundary of the local window, and $P_{\mathrm{recoil}}$ is any retained local wake-emission resistance term. The older shorthand $\langle T\rangle=0$ is valid only for a particle-only closed window with no boundary wake flux and no recoil term.

  On a declared branch chart $b$, this balance has an operational work row:
  $$
  P_{b,\mathrm{work}}^{(\eta)}(t)
  =
  \sum_i
  \mu_{\text{arch}}\,
  \mathbf{a}_{i,b}^{(\eta)}(t)
  \cdot
  \mathbf{v}_i(t)
  $$
  For a circular constant-speed benchmark, $\mathbf{v}_i$ is tangent to the orbit and the radial row does no instantaneous work, so
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
  for the quadratic proxy. Thus the tangential term is not merely a geometric nuisance; it is the first constructive entry in the binary wake-energy ledger. If the primitive kinetic scalar is used instead, replace $\mu_{\text{arch}}$ by $\mu_K(\|\mathbf{v}_i\|)$ inside the summed power.

---

#### Tangential Drive and Wake Escapement

**Theorem (Same-sheet no-go for constant-speed circular orbit in the bare two-body kernel).**
In the symmetric, non-translating circular binary with canonical delayed radial forces only, and with active roots restricted to the same-sheet principal branch chart defined above, the net tangential acceleration is strictly positive whenever at least one causal root contributes.

$$
T_{\mathrm{net}}
=
\sum_{m\in\mathcal{M}_p} w_{p,m} T_{p,m}
\;+\;
\sum_{m\in\mathcal{M}_s} w_{s,m} T_{s,m}
>0
$$
where $w_{p,m},w_{s,m}\ge 0$ are same-row receiver-normal branch weights induced by $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$ and any declared regularization/time averaging, and $\mathcal{M}_p,\mathcal{M}_s$ are active partner/self root sets.

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
and for any active self branch (when present),
$$
T_{s,m}
=
\frac{\kappa\epsilon^2}{4R^2}
\frac{\cos(\tilde{\delta}_{s,m}/2)}{\sin^2(\tilde{\delta}_{s,m}/2)}
>0,
\qquad \tilde{\delta}_{s,m}\in(0,\pi)
$$
The sign is branch-invariant on this same-sheet chart because winding changes timing, not chord orientation. Therefore each summand in $T_{\mathrm{net}}$ is nonnegative, and at least one is strictly positive whenever any hit exists. Hence $T_{\mathrm{net}}>0$ on the certified chart. $\square$

**Corollary.**  
Within the same-sheet bare isolated two-body kernel, an exact constant-speed circular orbit
with no boundary wake flux and no recoil term is impossible. Any MCB-like steady state must therefore close a finite-window balance: signed-ledger cancellation may reduce the local tangential drive, but the remaining forward power must be assigned either to wake escapement through $\partial W$, to a local recoil term, or to genuinely multi-body nested shell braid exchange.

**Interpretation.** The positive tangential component is not merely an obstruction to be erased. In a finite local window, partner and self wakes are continually emitted while only a subset of their causal isochrons later hit a local receiver. The unreceived portion exits the local window as wake-history flux. The same-sheet tangential drive is therefore the mechanical pump that can replace the interaction energy exported by those escaping causal wakes. A local binary can look particle-only conservative only if the outgoing wake record, recoil channel, and retained branch ledger are all included in the same balance law.

**Cohomology reading.** On a closed circular branch, write $\theta$ for the receiver phase and let
$$
\omega_T^{(b)} = R\,T_{\mathrm{net}}^{(b)}(\theta)\,d\theta
$$
be the tangential torque one-form on the retained signed ledger $b$. Same-sheet rows give a positive period integral,
$$
\oint_{S^1}\omega_T^{(b)}>0,
$$
so $[\omega_T^{(b)}]\ne0$ in $H^1(S^1)$ and $\omega_T^{(b)}$ is not an exact derivative of a single-valued mechanical angular-momentum potential on the particle-only chart. Closure requires a coboundary supplied by retained non-particle channels:
$$
\left[\omega_T^{(b)}
+\omega_{\partial W}^{(b)}
+\omega_{\mathrm{recoil}}^{(b)}
+\omega_{\mathrm{multi}}^{(b)}
\right]=0
$$
in the cycle cohomology of the branch chart. A compact escaped-action diagnostic is
$$
N_{\mathrm{esc}}^{(b)}
=
\frac{1}{h}
\oint R\,T_{\mathrm{net}}^{(b)}(\theta)\,d\theta,
$$
where $h$ is the declared action unit used by the branch packet. A bare two-body circular closure can pass only when this class is cancelled by an explicitly retained signed sheet, wake-boundary, recoil, or multi-body exchange row.

**Plain language**: On the same-sheet chart, the isolated pair shows persistent tangential drive at the per-hit level; cancellation is hard because every certified root pushes the same way. The stable-branch question is not "how can the drive disappear?" but "which wake flux, recoil, or multi-body channel balances the drive without destroying the retained branch?" This is a primary test of the MCB attractor hypothesis.

---

### What "Maximum Curvature" Demands

**Mechanism summary (self-hit balance):** once $s>1$, each self-hit contributes a **repulsive acceleration away from its own past emission point**. In the symmetric circular geometry that repulsion has a **radial outward component** (opposing further contraction) and a **positive tangential component** (continuing to speed up the architrino). As the radius shrinks, both partner attraction and self-hit repulsion scale like $1/R^2$, while the decisive extra effect is receiver-normal branch strength: the self-hit response can sharpen dramatically as an active branch approaches its source-normal null-separatrix geometry, as the receiver-normal numerator changes the crossing cadence, and because **new self-hit roots appear** at higher $s$. Maximum curvature would require the **outward self-hit radial component** to balance the inward partner pull without the still-positive tangential drive destroying constant-speed closure.

The current receiver-normal radial target uses same-root receiver-normal branch
strengths:

$$
A_{\text{rad}} = \frac{\kappa \epsilon^2}{4R^2} \left( \frac{W_p^{\mathrm{rec}}}{\cos(\delta_p / 2)} - \frac{W_s^{\mathrm{rec}}}{\sin(\delta_s / 2)} \right),
\qquad
W_{\bullet}^{\mathrm{rec}}=\left|\frac{D_{t,\bullet}}{D_{s,\bullet}}\right|.
$$

**Increasing curvature** ($1/R$ larger, so $R$ smaller) requires **stronger inward radial force**. This occurs when:

1. **$\delta_p$ increases** -> $\cos(\delta_p / 2)$ decreases -> partner term $1/\cos(\delta_p / 2)$ **increases** (stronger inward pull).
2. **$\delta_s$ increases** -> $\sin(\delta_s / 2)$ increases -> the geometric part of the self term decreases, while the full outward response still depends on the same-root receiver-normal branch strength $W_s^{\mathrm{rec}}$.

Two distinct balance mechanisms are now mathematically visible:

1. **Near-threshold denominator wall.**
   On the principal self branch, $D_s$ loses its floor as $s\downarrow 1^+$.
   The current force/action row must combine that denominator with the
   receiver-normal numerator on the same root before claiming a radial balance.

2. **Higher-speed multi-branch redistribution.**
   At larger $s$, additional self branches turn on and redistribute the outward response across several winding sectors. In that regime the detailed balance depends on the full receiver-normal weighted sum over all active branches rather than on the principal branch alone.

**However**: Due to the same-sheet per-hit $T > 0$ result, this "maximum curvature" state remains unverified for the isolated two-body system. Its stability must be tested by the full, signed, multi-root time-averaged dynamics.

Because the desired MCB branch is expected to graze the $J=0$ wall, the stability target is not only a smooth Floquet calculation. On smooth arcs with a fixed ledger, Floquet multipliers are the right local test. At the null separatrix itself, the branch is a caustic-grazing limit cycle: the appropriate theorem target is an isolating block in history space that straddles the $J=0$ wall and has a persistent Conley index under finite-$\eta$ continuation. The concrete target is uniform index persistence: for sufficiently small $\eta>0$, the regularized return map must carry the same Conley index on one isolating neighborhood of the grazing orbit, with the finite-caustic impulse bound controlling the velocity jump through the wall. If the index changes as $\eta\to0^+$, the MCB is not a robust attractor. In that reading, the MCB branch is stable only if the orbit returns through the grazing chart without escaping the isolating block or changing its declared signed ledger except at the certified fold rows.

---

### Emergent Properties and Measurement Standards

If a stable MCB exists, it provides a concrete **rod** and **clock** defined entirely by the two-body delay dynamics. Let
$$
d_0 := R_{\text{MCB}}, \qquad T_0 := \frac{2\pi}{\omega_{\text{MCB}}}
$$
The natural Layer-I two-body units are
$$
R_*=\frac{\kappa\epsilon^2}{c_f^2},
\qquad
T_*=\frac{R_*}{c_f}
$$
so the first MCB outputs are the dimensionless ratios
$$
\frac{R_{\mathrm{MCB}}}{R_*},
\qquad
\frac{T_0}{T_*},
\qquad
\beta_{\mathrm{MCB}}
$$
rather than additional fitted constants. Once $(c_f,\kappa,\epsilon)$ fixes the length, time, and polarity units, the signed-root ledger and stability problem must compute those ratios as pure numbers.

Then $d_0$ is the candidate fundamental length scale of the architecture, and $T_0$ is the candidate fundamental time scale. Their comparison with the wake propagation speed is the dimensionless MCB speed factor
$$
\beta_{\mathrm{MCB}}
=
\frac{R_{\mathrm{MCB}}\omega_{\mathrm{MCB}}}{c_f}
=
\frac{2\pi d_0}{c_fT_0}
$$
so the wake propagation speed is not an imposed architrino-speed limit. It is the propagation reference used to compare the MCB rod and clock, while individual architrinos may enter super-field-speed regimes with
$$
\|\mathbf{v}\|>c_f
$$

In this view, any ruler or clock built from architrino assemblies ultimately reduces to multiples of $(d_0, T_0)$. Measurement standards are therefore **dynamical invariants** of the two-body attractor: they persist because the underlying limit cycle (if realized) is stable and reproducible across assemblies.

A certified MCB would also define the first handedness marker. In the binary plane set
$$
\hat{\mathbf n}_{\mathrm{MCB}}
=
\hat{\mathbf r}\times\hat{\mathbf v},
$$
with $\hat{\mathbf r}$ pointing from the center to one chosen polarity row and $\hat{\mathbf v}$ its direction of motion. The two signs of $\hat{\mathbf n}_{\mathrm{MCB}}$ label two branch basins, $B_+$ and $B_-$, not two coordinate conventions. A branch-preserving deformation can rotate the plane, but it cannot flip this $\mathbb{Z}_2$ label without passing through a degeneracy where the circular plane, source order, or signed causal-root ledger changes. Thus chirality is carried by the joint path-history and signed-root framing of the branch, not by a freely chosen drawing orientation.

If the MCB does not exist as a stable attractor, these emergent standards must be replaced by whatever stable limit structure the dynamics actually support.

### Root Multiplicity vs. Speed

This section separates the two terminology axes used throughout the chapter:

- **Source identity**: self-hit ($j=i$) or partner hit ($j\ne i$).
- **Root count**: single-root or multi-root on the current branch chart.

The self-hit onset is dynamically special because it introduces same-source feedback and an outward self-repulsive channel. Partner multi-hit is still part of the same super-field-speed root topology: at higher speeds, older partner wake surfaces can also satisfy the causal-root condition and contribute additional inward channels.

In the same-sheet uniform circular, non-translating geometry, admissible self-roots are indexed by winding number $m \ge 0$ and minimal angular separation $\tilde{\delta}_s \in (0, \pi]$:

$$
\delta_s = \tilde{\delta}_s + 2\pi m = 2s \sin(\tilde{\delta}_s / 2)
$$

#### Counting Self-Hits by Winding Index

For fixed winding $m \ge 0$, define
$$
f_m(\delta;s)=2s\sin(\delta/2)-\delta-2\pi m,
\qquad \delta\in(0,\pi]
$$
An $m$-branch same-sheet self-hit exists exactly when $f_m(\delta;s)=0$ has a solution in $(0,\pi]$.

- For the principal branch $m=0$, the threshold is sharp:
  $$
  s_0^\star = 1
  $$
- For higher winding numbers $m\ge 1$, the appearance threshold is determined by the tangency condition at the interior maximizer $f_m'(\delta;s)=0$, namely
  $$
  \cos(\delta^\star_m/2)=\frac{1}{s},
  \qquad
  \sqrt{(s_m^\star)^2-1}-\arccos\!\left(\frac{1}{s_m^\star}\right)=\pi m
  $$

Thus the higher same-sheet self branches do not turn on at equally spaced speeds. Their onset is governed by a nonlinear sequence of tangencies of the delayed self-intersection curve. A full signed-root ledger must add the $\sigma=-1$ sheets described above; the first such negative self sheet appears at $s=\pi/2$, earlier than the first higher same-sheet self branch.

For large winding number $m$, the threshold has the asymptotic form
$$
s_m^\star = \pi m + \frac{\pi}{2} + O\!\left(\frac{1}{m}\right)
$$
so the equally spaced picture is recovered only as a high-speed approximation.

**Note**: Straight-line motion admits **no self-hits** even if $s > 1$; **curvature is required**. The above statements apply specifically to uniform circular, non-translating geometry.

The self-hit root count is therefore a genuine branch-bifurcation diagram for the circular benchmark. Here
$$
s=\frac{\|\mathbf{v}\|}{c_f}
$$
is the chapter's speed ratio, equivalent to $\beta$ in the usual notation. Between neighboring branch-birth thresholds, the active self-root ledger $N_s(s)$ is constant and the same root labels can be transported. At the thresholds, the delay equation has a tangency and the newly born circular root lies on a Jacobian-null boundary. Thus the root census, the caustic locations, and the ledger-transition speeds are one computed object rather than three separate assumptions.

#### Root Ledger as a One-Parameter Morse Complex

For a fixed reception event on a one-parameter family of branch histories, write the root function as
$$
F_{ij}(t_0;s)
=
\|\mathbf{x}_i(t;s)-\mathbf{x}_j(t_0;s)\|
-c_f(t-t_0).
$$
Active causal roots are the zeros of $F_{ij}$. A branch birth or death is a fold row:
$$
F_{ij}=0,
\qquad
\partial_{t_0}F_{ij}=0,
\qquad
\partial_{t_0t_0}F_{ij}\neq0.
$$
Away from those folds, the signed degree
$$
D_{ij}(s)
=
\sum_{t_0\in\mathcal{C}_{ij}(t;s)}
\operatorname{sign}\!\left(\partial_{t_0}F_{ij}(t_0;s)\right)
$$
is locally constant, while the unsigned counts $N_s$ and $M_p$ track the ranks of the same-source and partner-root rows. This is the binary version of the [assembly topological charge](../noether-braid/noether-braid-topological-charge.md): the later three-binary label $(N_s,M_p,c_1)$ uses the two root-complex integers from this chapter and the phase-return degree data from the resonance-lock chart. A solver that reports only raw root counts loses the signed degree needed to distinguish a true branch fold from a harmless relabeling of rows.

#### Parameter-Free Circular Branch Packet

The circular two-body benchmark can now be stated as a parameter-free branch packet. Use the Layer-I units
$$
R_*=\frac{\kappa\epsilon^2}{c_f^2},
\qquad
\rho=\frac{R}{R_*},
\qquad
s=\frac{R\omega}{c_f}
$$
and factor out the acceleration scale $c_f^2/R_*$. The remaining equations depend only on the dimensionless radius $\rho$, the speed ratio $s$, and the signed causal-root ledger.

For the principal partner branch, let $\xi_p=\delta_p/2$. The delay equation is
$$
\cos\xi_p=\frac{\xi_p}{s},
\qquad
0<\xi_p<\frac{\pi}{2}
$$
with
$$
J_p=1+s\sin\xi_p
$$
and branch coefficients
$$
P_{\mathrm{rad}}(\xi_p,s)=\frac{1}{\cos\xi_p\,|J_p|},
\qquad
P_{\mathrm{tan}}(\xi_p,s)=\frac{\sin\xi_p}{\cos^2\xi_p\,|J_p|}
$$
where radial is measured inward and tangential is measured in the direction of motion.

Each partner row uses the same coefficient form with its own half-angle. For a signed self branch $\alpha_s=(\xi,\sigma)$ in the full circular ledger, use
$$
\sigma\sin\xi=\frac{\xi}{s},
\qquad
\sigma=\operatorname{sign}(\sin\xi)
$$
with
$$
J_s(\xi,\sigma;s)=1-s\sigma\cos\xi
$$
The outward radial and signed tangential coefficients are
$$
S_{\mathrm{rad}}(\xi,\sigma;s)=\frac{s}{\xi |J_s|},
\qquad
S_{\mathrm{tan}}(\xi,\sigma;s)=\frac{s^2\sigma\cos\xi}{\xi^2 |J_s|}
$$
Higher self-root births occur at tangencies:
$$
\tan\xi^\star=\xi^\star,
\qquad
s^\star=|\sec\xi^\star|
$$
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
Here $b_p$ and $b_s$ are the partner-hit and self-hit rows in the signed causal-root ledger. The equations are parameter-free because $\kappa$, $\epsilon$, and $c_f$ have already been absorbed into $R_*$ and the acceleration scale. A common zero of these two residuals is only an algebraic circular MCB candidate; promotion to a stable branch still requires the finite-window return-map certificate, positive Jacobian floors, and energy packet described below.

---

### Where Do Causal Hits Come From on the Circle? (Discrete Azimuth Pattern)

**Context**: Non-translating, uniform circular binary at fixed speed $s$. Receiver "now" at azimuth $\theta = 0$.

The emission points on the circle that can produce hits "now" form a **finite, discrete set** of azimuths determined by the delay equations--**not arbitrary locations**. Because roots are indexed by winding number $m$ and, in the full ledger, sheet sign $\sigma$, multiple hits at the same "now" can occur for different signed windings, but the admissible azimuths remain a finite comb and never fill the circle.

#### Partner Hits

- Minimal angular separation: $\tilde{\delta}_p \in (0, \pi]$.
- Causal delays:
 $$
 \delta_p(m) = \tilde{\delta}_p + 2\pi m = 2s \cos(\tilde{\delta}_p / 2), \quad m = 0, 1, 2, \dots
 $$

- **Emission azimuth** at reception:
 $$
 \varphi_p(m; s) = \pi - \tilde{\delta}_p(m; s)
 $$

- **Existence thresholds**: For each $m \ge 0$, a solution exists only if $s > m\pi$.
- As $m$ increases, $\tilde{\delta}_p$ decreases -> $\varphi_p$ drifts monotonically toward $\pi$ (diametrically opposite point).
- Partner multi-hit means $M_p(s)>1$: the base partner branch plus one or more older partner roots. These additional roots affect the inward partner-root ledger, but they do not create same-source feedback.

#### Self-Hits

- Minimal angular separation: $\tilde{\delta}_s \in (0, \pi]$.
- Causal delays:
 $$
 \delta_s(m) = \tilde{\delta}_s + 2\pi m = 2s \sin(\tilde{\delta}_s / 2), \quad m = 0, 1, 2, \dots
 $$

- **Emission azimuth** at reception:
 $$
 \varphi_s(m; s) = -\tilde{\delta}_s(m; s)
 $$

- **Existence windows**:
 - Principal branch ($m = 0$): exists for every $s>1$, with $\tilde{\delta}_s\to0^+$ as $s\downarrow1$.
 - For $m \ge 1$: the branch appears only when the self-delay equation develops an interior tangency. The exact threshold $s_m^\star$ is determined in **Counting Self-Hits by Winding Index** above.
 - Within each branch, $\tilde{\delta}_s$ initially enters at a tangency angle and then decreases with $s$, so $\varphi_s$ drifts toward $-\pi$ at high speed.

---

### Super-Field-Speed Root Ledgers and Resonance Lock

The super-field-speed regime is not merely the same spiral at a larger speed. It changes the root topology of the binary. Once
$$
\|\mathbf{v}\|>c_f
$$
the receiver can intersect multiple older causal wake surfaces from both its own path and its partner's path. In the circular reduced model, these intersections are counted by two integer ledgers:
$$
N_s(s)
\equiv
\#\{(m,\sigma):\text{self branch }(m,\sigma)\text{ is active at speed }s\}
$$
$$
M_p(s)
\equiv
\#\{(m,\sigma):\text{partner branch }(m,\sigma)\text{ is active at speed }s\}
$$
The self-ledger
$$
N_s
$$
tracks outward self-hit channels. The partner-ledger
$$
M_p
$$
tracks inward partner-hit channels. Both are integer-valued because a causal root either exists or it does not. As
$$
s
$$
varies, these counts change only at branch birth/death thresholds where a causal delay equation develops a tangency.

A candidate stable super-field-speed bound state therefore cannot be described by a single smooth force curve alone. It must satisfy a finite root-ledger balance:
$$
\sum_{m\in\mathcal{M}_p(s)}
A_{p,m}^{\mathrm{rad}}(R,s)
-
\sum_{m\in\mathcal{M}_s(s)}
A_{s,m}^{\mathrm{rad}}(R,s)
=
\frac{s^2}{R}
$$
together with whatever tangential closure condition is supplied by the full regularized dynamics. The radial equation says that partner-root accumulation supplies inward pull while self-root accumulation supplies outward response. On a fixed signed branch ledger $b$, the corresponding constant-speed closure target has the form
$$
\left\langle
\sum_{\rho\in b} T_\rho(R,s;\eta)
\right\rangle_{P_b}
=0
$$
where the average is taken over one candidate period $P_b$ of the regularized history. The tangential condition remains the hard part: in the same-sheet bare isolated two-body kernel, the no-go result above shows that every active branch contributes positive tangential drive; in the full signed ledger, negative sheets must be included before any global no-go or closure theorem is claimed.

Equivalently, on a fixed signed ledger $b$, the circular MCB search is the intersection problem
$$
G_{\mathrm{rad}}^{(b)}(R,s)=0,
\qquad
G_{\mathrm{tan}}^{(b)}(R,s)=0
$$
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
and
$$
G_{\mathrm{tan}}^{(b)}(R,s)
\equiv
\left\langle
\sum_{\alpha\in b}T_\alpha(R,s;\eta)
\right\rangle_{P_b}
$$
with $b_p$ and $b_s$ denoting the partner-hit and self-hit rows inside the signed ledger $b$.
The first curve enforces inward/outward radial balance, while the second enforces finite-window tangential closure. In the natural Layer-I units, the search lives in $(R/R_*,s)$, so any intersection is a parameter-free candidate point for that ledger. It is still only an algebraic MCB candidate until the fixed-ledger return map proves stability, positive Jacobian floors, and persistence under perturbation.

This gives a precise, conditional meaning to binary resonance lock. A stable slot would be a region of history space in which the integer pair
$$
(N_s,M_p)
$$
is fixed, the branch Jacobians stay transversal, and perturbations that approach a root threshold are pushed back into the same ledger rather than escaping to a neighboring one. If such a self-map certificate exists, the discreteness of
$$
N_s
\quad\text{and}\quad
M_p
$$
would provide a deterministic mechanism for quantized bound-state geometry: allowed radii and frequencies would be selected by integer causal-root ledgers rather than by a continuum of arbitrary circular orbits.

This statement is deliberately conditional. This chapter derives the discrete root ledgers and the radial balance target, but the stability and quantization claims require the missing full-history certificate: finite active branches, positive Jacobian floors, returned-history closure, and a monodromy or boundary-trapping argument. In practice, that certificate may close first in a collinear breather or nested shell braid setting rather than in the bare circular two-body kernel.

#### Branch Stability Target (Hessian Bridge)

The standard equilibrium test in central-force mechanics uses the Hessian of an instantaneous effective potential. If $q_\star$ is an equilibrium, the matrix
$$
H_{ab}(q_\star)=\partial_a\partial_b V_{\mathrm{eff}}(q_\star)
$$
tests local stiffness in the non-symmetry directions. This is useful as comparison language, but it is not yet a stability proof for an architrino binary because the force law depends on path-history, the active signed causal-root ledger, and the branch Jacobian floors.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ branch-stability target is therefore a cycle-averaged stiffness matrix on a fixed branch chart. Let $b$ denote a fixed signed causal-root ledger and let $\mathbf{X}_b(t)$ be a candidate periodic history with period $P_b$. For reduced branch coordinates $y^a$ transverse to time shift, period reparameterization, Euclidean motions, and any phase-locked flat-connection moduli retained by an enclosing assembly chart, define the diagnostic stiffness target
$$
K^{(b)}_{ab}
=
\frac{1}{P_b}\int_0^{P_b}
\left.
\frac{\delta^2 U_{\eta,b}^{\mathrm{hist}}}{\delta y^a\,\delta y^b}
\right|_{\mathbf{x}_t=\mathbf{X}_{b,t}}
dt
$$
where $U_{\eta,b}^{\mathrm{hist}}$ is the action-compatible history potential, or the corresponding diagnostic reconstruction when the regularization has not yet been derived from the delayed action. Negative stiffness in this matrix is a local instability signal; positive stiffness is only a necessary reduced-coordinate check, not a certificate.

The actual branch certificate must be delayed-history and Floquet-style. Let
$$
\mathcal{P}_b:\mathcal{N}_b\subset\mathcal{H}\to\mathcal{H}
$$
advance an admissible history by one candidate cycle while the signed causal-root ledger remains fixed. A stable branch requires the return map to stay inside the same branch neighborhood,
$$
\mathcal{P}_b(\mathcal{N}_b)\subset\mathcal{N}_b,
\qquad
\inf_{\phi\in\mathcal{N}_b}|J(\phi)|\ge J_{\min}>0
$$
and the non-symmetry Floquet multipliers of $D\mathcal{P}_b[\mathbf{X}_b]$ to satisfy
$$
|\mu_\alpha|<1
$$
Only that return-map condition would upgrade the Hessian-style stiffness picture into branch stability. If the candidate touches a branch-fold or $J=0$ wall, this smooth Floquet test must be supplemented by the Conley-index isolating-block certificate named above; otherwise the multiplier calculation has evaluated the smooth arcs while missing the grazing transition. Until those certificates are supplied, MCB stability remains a conditional target rather than a completed proof.

#### Finite-dimensional projection caveat

The circular formulas below use reduced coordinates; stability in the full history space remains a separate proof obligation.

#### Two-Body Closure Packet (Theorem Target)

A nontrivial electrino:positrino binary is promoted only by a replayable finite-$\eta$ packet, not by the circular ansatz alone. For a fixed signed causal-root ledger $b$, the binary closure packet is

$$
\mathfrak{C}_{2\mathrm{B}}^{(\eta)}
=
\left(
b,\mathbf{X}_b,P_b,R_b,s_b,\mathfrak{B}_b,\mathcal{P}_b,\mathcal{E}_b
\right),
$$

where $\mathbf{X}_b(t)$ is the two-body history, $P_b$ is its return period, $R_b$ and $s_b$ are the circular benchmark radius and speed when that reduction is valid, $\mathfrak{B}_b$ is the branch chart of active and excluded roots, $\mathcal{P}_b$ is the history-space return map, and $\mathcal{E}_b$ is the constructive energy packet of [Delay-Dynamics Energy](../validation/simulations/action-energy/delay-dynamics-energy.md). The packet must report the following residuals before the branch can be used as a closed result.

The equation-of-motion residual is

$$
\mathcal{R}_{\mathrm{EOM}}^{2\mathrm{B}}(b,\eta)
=
\frac{1}{P_b}
\int_0^{P_b}
\frac{
\left\|
\ddot{\mathbf{X}}_b(t)
-
F_{\eta,b}[\mathbf{X}_{b,t}]
\right\|
}{
1+\left\|F_{\eta,b}[\mathbf{X}_{b,t}]\right\|
}
\,dt,
$$

where $F_{\eta,b}$ is the regularized two-body branch force obtained from the active self and partner rows in $b$. The period residual is

$$
\mathcal{R}_{\mathrm{per}}^{2\mathrm{B}}(b,\eta)
=
\frac{
\left\|\mathbf{X}_{b,P_b}-\mathbf{X}_{b,0}\right\|_{\mathcal{H}}
}{
\left\|\mathbf{X}_{b,0}\right\|_{\mathcal{H}}+\epsilon_{\mathcal{H}}
},
$$

with $\mathcal{H}$ the declared history norm and $\epsilon_{\mathcal{H}} > 0$ a fixed normalization floor.

The packet must also report the signed-degree row
$$
D_s^{2\mathrm{B}}(b)
=
\sum_{\rho\in b_s}
\operatorname{sign}J_\rho,
\qquad
D_p^{2\mathrm{B}}(b)
=
\sum_{\rho\in b_p}
\operatorname{sign}J_\rho,
$$
where $b_s$ and $b_p$ are the retained self-hit and partner-hit rows. On a smooth certified window these integers must be constant. If the branch crosses a fold inside the window, the packet must log the corresponding $\Delta N=\pm2,\Delta D=0$ surgery rather than treating the unsigned root counts as conserved data.

The branch-chart admissibility certificate is

$$
\nu_J^{2\mathrm{B}}(b,\eta)
=
\inf_{\rho\in b,\ 0\leq t\leq P_b}
|J_\rho(t)|
>0,
\qquad
\Delta_{\mathrm{gap}}^{2\mathrm{B}}(b,\eta)
=
\inf_{\rho\in b^{\mathrm{off}},\ 0\leq t\leq P_b}
|g_\rho(t)|
>0.
$$

Here $J_\rho$ is the root Jacobian for an active row and $g_\rho$ is the signed gap of a declared inactive row in the finite branch complement $b^{\mathrm{off}}$. The certificate fails if either floor tends to zero under refinement or under the advertised $\eta$-continuation.

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
+A^{\mathrm{tan}}_{\mathrm{recoil}}
\right\rangle_{P_b}
\right|
}{
1+\left\langle
|A^{\mathrm{tan}}_{\eta,b}|
+|A^{\mathrm{tan}}_{\partial W}|
+|A^{\mathrm{tan}}_{\mathrm{recoil}}|
\right\rangle_{P_b}
}.
$$

The two added tangential channels are not optional bookkeeping terms: they are the boundary and recoil entries required by the constructive wake-energy ledger. If they are absent, the packet must fail closed rather than hiding tangential work in an undefined reservoir.

The stability certificate is a secular Floquet margin in history space,

$$
\lambda_{\mathrm{sec}}^{2\mathrm{B}}(b,\eta)
=
1-\rho\!\left(
D\mathcal{P}_b[\mathbf{X}_b]\big|_{E_\perp}
\right)
>0,
$$

where $E_\perp$ removes the neutral phase and symmetry directions. A numerical orbit without this projected return-map certificate is an existence candidate, not a stable binary certificate.

For a standalone circular binary, the neutral quotient includes the global time phase, the period-reparameterization direction, and Euclidean translations and rotations of the complete history. When the same two-body packet is embedded into a phase-locked three-binary or larger assembly chart, a neutral-direction audit is required: a direction may be removed from $E_\perp$ only if it is neutral for the full enclosing chart, not merely for the isolated subsystem. The flat-connection moduli declared by the enclosing chart are physical lock variables unless the full chart proves them neutral. Otherwise a slow drift of relative phase can be hidden as an allowed symmetry even though it breaks the lock.

The energy packet is

$$
\mathcal{E}_b
=
\left(
\epsilon_E^{(\eta)}(W_b;\mathfrak{B}_b),
\Delta_{\mathrm{E,cross}}^{(\eta)}(W_b;\mathfrak{B}_b),
U_{b,\mathrm{work}}^{(\eta)}(t),
U_{\min,b}^{(\eta)}
\right),
$$

and must satisfy

$$
\epsilon_E^{(\eta)}(W_b;\mathfrak{B}_b)\leq \epsilon_E^\star,
\qquad
\Delta_{\mathrm{E,cross}}^{(\eta)}(W_b;\mathfrak{B}_b)
\leq \epsilon_{\mathrm{cross}}^\star,
\qquad
E_{\mathrm{wake},b}^{(\eta)}(t)\geq U_{\min,b}^{(\eta)}
$$

on the same window, branch chart, and regulator used for the motion residuals. The work reconstruction is
$$
U_{b,\mathrm{work}}^{(\eta)}(t)
=
U_b(t_\ast)
-
\int_{t_\ast}^{t}
\sum_i
\mu_{\text{arch}}\,
\mathbf{a}_{i,b}^{(\eta)}(t')
\cdot
\mathbf{v}_i(t')\,dt'
$$
for the quadratic proxy, with $\mu_K(\|\mathbf{v}_i\|)$ replacing $\mu_{\text{arch}}$ when the primitive kinetic scalar is used. The lower-bound entry applies to the constructed action-level wake charge when that route is available, or to the compatible work reconstruction when that is the declared route. This is the handoff point to the constructive delay-energy chapter: ordinary Noether language is not sufficient until $E_{\mathrm{wake},b}^{(\eta)}$ or its compatible work-integral reconstruction has been constructed for the chosen chart.

Finally, the characteristic frequency is extracted from the return period,

$$
\omega_b=\frac{2\pi}{P_b},
\qquad
\mathcal{R}_{\omega}^{2\mathrm{B}}
=
\frac{\left|2\pi/P_b-s_b/R_b\right|}
{|2\pi/P_b|+|s_b/R_b|+\epsilon_{\omega}},
$$

when the circular reduction is claimed. For a noncircular branch, $\omega_b=2\pi/P_b$ remains the fundamental return frequency, but the $s_b/R_b$ comparison is inadmissible unless an effective radius and speed have been independently defined. A breather or spiral candidate must instead report its harmonic-extraction rule on the retained history record and compare the extracted fundamental or locked harmonic to $2\pi/P_b$.

The theorem target is therefore:

> If a finite-$\eta$ branch supplies $\mathfrak{C}_{2\mathrm{B}}^{(\eta)}$ with $\mathcal{R}_{\mathrm{EOM}}^{2\mathrm{B}}$, $\mathcal{R}_{\mathrm{per}}^{2\mathrm{B}}$, $\mathcal{R}_{\mathrm{bal}}^{2\mathrm{B}}$, and $\mathcal{R}_{\omega}^{2\mathrm{B}}$ below declared tolerances, $\nu_J^{2\mathrm{B}}$ and $\Delta_{\mathrm{gap}}^{2\mathrm{B}}$ bounded away from zero, $\lambda_{\mathrm{sec}}^{2\mathrm{B}} > 0$, and the constructive energy residuals closed on the same branch chart, then that branch is a certified local electrino:positrino two-body binary at that finite regulator.

No such finite-$\eta$ packet is supplied in this chapter yet. The status is a theorem target and simulation closure contract, not a closed proof. The $\eta\to0$ limit, the basin measure of the branch, and the later use of the binary as a universal clock or matter standard remain separate obligations.

## State Space and Well-Posedness of the Two-Body Delay System

### Introduction and Scope

The master equation of motion for the architrino system constitutes a system of **State-Dependent Neutral Delay Differential Equations (SD-NDDEs)**. Unlike ordinary differential equations (ODEs) where the state is a point in $\mathbb{R}^{6N}$, the state of this system is a **function segment** representing the past history of the architrinos.

We denote the position of the $i$-th architrino as $\mathbf{x}_i(t) \in \mathbb{R}^3$. We work in the **Euclidean void** with fixed metric $\delta_{ij}$.

---

### Functional Phase Space

To define the evolution at time $t$, we require knowledge of the trajectory over an interval $[t - \tau_{\max}, t]$, where $\tau_{\max}$ is the maximum causal lookback time relevant to the current dynamics.

#### Definition 1 (The History Space)
Let $h > 0$ be a history horizon (sufficiently large to capture all active causal roots). On a smooth simple-root branch, the **smooth history space** $\mathcal{H}_{\mathrm{sm}}$ is the Banach space of continuously differentiable functions mapping the delay interval to the configuration space:
$$
\mathcal{H}_{\mathrm{sm}} = C^1\left([-h, 0]; (\mathbb{R}^3)^N\right).
$$
For a trajectory $\mathbf{x}: [-h, \infty) \to (\mathbb{R}^3)^N$, the **state at time $t$**, denoted $\mathbf{x}_t$, is the element of $\mathcal{H}_{\mathrm{sm}}$ on smooth charts, or of $\mathcal{H}_*$ on caustic-extension charts, given by:
$$
\mathbf{x}_t(\theta) = \mathbf{x}(t + \theta), \quad \theta \in [-h, 0]
$$
The norm on the smooth chart is the standard $C^1$ sup-norm: $\|\phi\|_{\mathcal{H}_{\mathrm{sm}}} = \sup_{\theta \in [-h,0]} (\|\phi(\theta)\| + \|\dot{\phi}(\theta)\|)$.

**Remark:** We require $C^1$ rather than $C^0$ because the delay $\tau$ depends on the state (state-dependent delay). In such systems, the vector field is typically not Lipschitz continuous in the $C^0$ topology, endangering uniqueness.

For caustic-grazing packets this smooth space is not the whole story. The working extension is
$$
\mathcal{H}_*
=
W^{1,\infty}\left([-h,0];(\mathbb{R}^3)^N\right),
$$
with $C^1$ regularity retained on smooth arcs and finite impulse transitions handled by the finite-$\eta$ kernel before any $\eta\to0$ statement is made. The existence theorem below is a smooth-chart theorem. A branch that crosses a $J=0$ wall must supply a separate impulse lemma or isolating-block continuation certificate showing that the finite-$\eta$ solutions converge in $\mathcal{H}_*$ with bounded velocity and finite total impulse. This makes $\mathcal{H}_*$ the common functional-analytic home for caustic-grazing two-body packets, doubling-frequency middle-carrier caustics, and any later breather packet that relies on finite impulse rather than a globally $C^1$ path.

Below, $\mathcal{H}$ denotes the declared history chart for the packet being tested. Unless a caustic-extension certificate is explicitly named, $\mathcal{H}=\mathcal{H}_{\mathrm{sm}}$.

---

### The Regularized Interaction Functional

We formalize the force term derived in the master equation.

#### Definition 2 (Causal Constraint Functional)
For a target architrino $i$ at time $t$ and source $j$, the delay $\tau_{ij}(t)$ is implicitly defined by the causal-isochron condition. Let $\phi \in \mathcal{H}$ be the history. A **causal root** is a value $\tau > 0$ satisfying:
$$
g_{ij}(\tau, \phi) \equiv \|\phi_i(0) - \phi_j(-\tau)\| - c_f \tau = 0
$$

#### Lemma 1 (Regularity of the Delay Map)
*Assumption:* The velocities are sub-field-speed relative to the separation, i.e., $\|\mathbf{v}_j\| < c_f$ (single-root regime) OR we isolate a specific branch of the multi-root solution where the relative radial velocity is not $c_f$.

*Statement:* If $\phi \in \mathcal{H}$ and $\tau^*$ is a simple root of $g_{ij}(\tau, \phi) = 0$ (i.e., $\partial_\tau g_{ij} \neq 0$), then there exists a neighborhood $U \subset \mathcal{H}$ of $\phi$ and a continuously differentiable functional $\tau: U \to \mathbb{R}^+$ such that $\tau(\phi) = \tau^*$.

*Proof.*  
Define
$$
g_{ij}(\tau,\phi)=\|\phi_i(0)-\phi_j(-\tau)\|-c_f\tau
$$
Because $\phi\in C^1$, the evaluation maps $\phi\mapsto \phi_i(0)$ and
$(\tau,\phi)\mapsto \phi_j(-\tau)$ are $C^1$, hence $g_{ij}$ is $C^1$ on
$\mathbb{R}^+\times\mathcal{H}$. At a root $(\tau^*,\phi)$,
$$
\partial_\tau g_{ij}
=-\hat{\mathbf{r}}_{ij}\!\cdot\!\dot{\phi}_j(-\tau^*)-c_f,
\quad
\hat{\mathbf{r}}_{ij}
\equiv
\frac{\phi_i(0)-\phi_j(-\tau^*)}{\|\phi_i(0)-\phi_j(-\tau^*)\|}
$$
The simple-root condition is exactly $\partial_\tau g_{ij}\neq 0$, i.e. no
delayed tangency/causal-shock degeneracy. Therefore, by the Banach-space
Implicit Function Theorem, there exist a neighborhood $U$ of $\phi$ and a
unique $C^1$ map $\tau:U\to\mathbb{R}^+$ with
$g_{ij}(\tau(\psi),\psi)=0$ and $\tau(\phi)=\tau^*$. $\square$

#### Definition 3 (Regularized Acceleration Functional)
To ensure the vector field is Lipschitz, we replace the distributional Dirac delta of the master equation with the mollifier $\delta_\eta$ (see [Master Equation](master-equation.md)). The acceleration functional $F_i: \mathcal{H} \to \mathbb{R}^3$ is:
$$
F_i(\phi) = \sum_{j} \kappa \sigma_{ij} |q_i q_j| \int_{-h}^0 \frac{\phi_i(0) - \phi_j(\theta)}{\|\phi_i(0) - \phi_j(\theta)\|^3} \, \delta_\eta\left( \|\phi_i(0) - \phi_j(\theta)\| + c_f \theta \right) \, d\theta
$$
**Crucial Property:** For $\eta > 0$ and smooth $\delta_\eta$, this integral operator maps $C^1$ histories to continuous accelerations.

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
   on a neighborhood of $\phi^0$.
3. Delay roots used in channel construction are simple (transversal), i.e. no causal-shock degeneracy (Lemma 1).
4. Active branches are uniformly finite on the considered history neighborhood.
5. Couplings and polarity magnitudes are finite.
6. Optional higher-smoothness gluing condition at $t=0$ (needed for $C^2$ at the junction, not for $C^1$ well-posedness).

**Statement:**
Let $\mathbf{Y}=(\mathbf{x},\mathbf{v})$ and write the system in first-order form
$$
\dot{\mathbf{Y}}(t)=\mathcal{G}(\mathbf{Y}_t),\qquad
\mathbf{Y}_{t_0}=\phi^0
$$
Then there exists $T>0$ and a unique $C^1$ solution on $[t_0-h,t_0+T)$.  
Equivalently, there is a unique maximal solution interval
$$
[t_0-h,t_{\max}),\qquad t_{\max}>t_0
$$
If the optional gluing condition holds, the solution is $C^2$ at $t_0$.

*Proof.*  
Define
$$
\mathcal{G}(\phi)=(\phi_v(0),F(\phi))
$$
with $F$ from Definition 3.

1. By Assumption 2, every denominator in the interaction kernel is bounded away from zero on the admissible neighborhood; therefore the map
   $$
   (\mathbf{u},\mathbf{w})\mapsto \frac{\mathbf{u}-\mathbf{w}}{\|\mathbf{u}-\mathbf{w}\|^3}
   $$
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
The solution $\mathbf{x}(t)$ can be extended as long as the state $\mathbf{x}_t$ remains within a compact subset of the phase space where causal roots are simple.

#### Definition 4 (Blow-Up Criteria)
The solution ceases to exist at finite time $T^*$ if:
1. **Collision:** $\inf_{i,j} \|\mathbf{x}_i(t) - \mathbf{x}_j(t')\| \to 0$ inside the regularization kernel support.
2. **Infinite Speed:** $\sup_i \|\mathbf{v}_i(t)\| \to \infty$.
3. **Causal Shock:** The derivative of the delay $\dot{\tau}(t)$ diverges (Doppler factor becomes singular). This occurs if an architrino moves directly toward a receiver at speed $\|\mathbf{v}\| = c_f$.

---

## Symmetry, Conservation, and Lyapunov Functionals

### Introduction

Standard conservation laws (energy, momentum, angular momentum) rely on the application of Noether's theorem to local Lagrangian densities. In this delayed setting, the force at time $t$ depends on the phase-space trajectory over the interval $[t - h, t]$.

For an action-derived, symmetry-preserving delayed model, symmetries of the substrate (Euclidean void + absolute time) imply conservation laws, but the conserved quantities are no longer simple functions of the instantaneous state $(\mathbf{x}, \mathbf{v})$. Instead, they are **functionals on the history space** $\mathcal{H}$. For a working regularized kernel not yet derived from an action, the same expressions function as validation diagnostics rather than established Noether charges.

This section derives these functionals, establishes the exact symmetry group of the regularized dynamics ($\eta > 0$), and provides the *a priori* bounds required to ensure physical well-posedness (preventing unphysical runaway acceleration).

---

### The Global Symmetry Group

We consider the regularized two-body system in the Euclidean void $\mathbb{R}^3$ with metric $\delta_{ij}$ and absolute time $t$.

#### Definition 1 (The Fundamental Symmetry Group)
The background substrate and the master equation interaction kernel
$$
\mathbf{a}_{ij}(t) \propto
\frac{W_{ij}^{\mathrm{rec}}(t;t_0)}
{\|\mathbf{x}_i(t) - \mathbf{x}_j(t_0)\|^3}
\left(\mathbf{x}_i(t) - \mathbf{x}_j(t_0)\right)
$$
(regularized by $\eta$) respect the group:
$$
G_{\text{fund}} = E(3) \times \mathbb{R}_{\text{time}}
$$
where $E(3) = \mathbb{R}^3 \rtimes O(3)$ is the Euclidean group of spatial translations and rotations, and $\mathbb{R}_{\text{time}}$ denotes time translation.

#### Theorem 1 (Invariance of the Equations of Motion)
Let $\mathbf{x}(t)$ be a solution to the master equation.
1. **Time Translation:** For any $\tau \in \mathbb{R}$, $\mathbf{y}(t) = \mathbf{x}(t + \tau)$ is also a solution.
2. **Spatial Isometry:** For any $R \in O(3)$ and $\mathbf{b} \in \mathbb{R}^3$, $\mathbf{y}(t) = R\mathbf{x}(t) + \mathbf{b}$ is also a solution.

*Proof.*  
For time translation, set $\mathbf{y}_i(t)=\mathbf{x}_i(t+\tau)$. If
$t_0\in\mathcal{C}_{ij}^x(t+\tau)$ for the original solution, then
$t_0-\tau\in\mathcal{C}_{ij}^y(t)$ because
$$
\|\mathbf{y}_i(t)-\mathbf{y}_j(t_0-\tau)\|
=\|\mathbf{x}_i(t+\tau)-\mathbf{x}_j(t_0)\|
=c_f[(t+\tau)-t_0]
=c_f[t-(t_0-\tau)]
$$
Hence the same branch contributions appear with shifted times, and
$\ddot{\mathbf{y}}_i(t)=\ddot{\mathbf{x}}_i(t+\tau)$ satisfies the same force law.

For spatial isometries, set $\mathbf{y}_i(t)=R\mathbf{x}_i(t)+\mathbf{b}$,
$R\in O(3)$. Distances are preserved:
$$
\|\mathbf{y}_i(t)-\mathbf{y}_j(t_0)\|
=\|R(\mathbf{x}_i(t)-\mathbf{x}_j(t_0))\|
=\|\mathbf{x}_i(t)-\mathbf{x}_j(t_0)\|
$$
so causal-root times are unchanged. Unit directions transform covariantly:
$\hat{\mathbf{r}}_{ij}^y=R\hat{\mathbf{r}}_{ij}^x$. The dot products defining
$D_s$, $D_t$, and $W^{\mathrm{rec}}$ are preserved by the same spatial
isometry. Therefore each force term transforms as
$\mathbf{a}_{ij}^y=R\mathbf{a}_{ij}^x$, and
$$
\ddot{\mathbf{y}}_i(t)=R\ddot{\mathbf{x}}_i(t)
=\sum_j\sum_{t_0\in\mathcal{C}_{ij}(t)}
\kappa\sigma_{ij}\frac{|q_iq_j|\,W_{ij}^{\mathrm{rec}}(t;t_0)}
{r_{ij}^2}\,\hat{\mathbf{r}}_{ij}^y
$$
Thus $\mathbf{y}$ solves the same equations. $\square$

**Implication:** In an action-derived regularization, these symmetries correspond to exact history-space integrals of motion. Because the interaction is non-local in time, those integrals must account for momentum and energy carried by causal wake surfaces rather than only by the instantaneous mechanical coordinates.

---

### Conservation of Generalized Momentum

In a delay system, Newton's Third Law ($\mathbf{F}_{12}(t) = -\mathbf{F}_{21}(t)$) fails instantaneously because $\mathbf{F}_{12}(t)$ originates from architrino 2 at $t-\tau_1$, while $\mathbf{F}_{21}(t)$ originates from architrino 1 at $t-\tau_2$.

#### Definition 2 (Mechanical Momentum)
The instantaneous mechanical momentum is:
$$
\mathbf{P}_{\text{mech}}(t) = \sum_{i} \mu_{\text{arch}} \mathbf{v}_i(t)
$$
Because of the delay, $\frac{d}{dt}\mathbf{P}_{\text{mech}} \neq 0$ generally.

#### Conservation Target 2 (Total Momentum Functional)
For an action-derived delayed model with translation symmetry, there exists a functional $\mathbf{P}_{\text{wake}}[\mathbf{x}_t]$ representing the momentum flux encoded in the active causal wake surfaces such that the total momentum:
$$
\mathbf{P}_{\text{tot}} = \mathbf{P}_{\text{mech}}(t) + \mathbf{P}_{\text{wake}}[\mathbf{x}_t]
$$
is conserved. For working regularized models, this same expression is a validation diagnostic unless the chosen regularization preserves the translation symmetry of the underlying action.

**Explicit Form (Weak Coupling Limit):**
For $\eta \to 0$, the wake momentum can be approximated by integrating the force impulse over the delay time:
$$
\mathbf{P}_{\text{wake}} \approx \sum_{i \neq j} \int_{t - \tau_{ij}(t)}^{t} \mathbf{F}_{ij}^{\text{emit}}(s) \, ds
$$
*Physical interpretation:* The "missing" momentum is accounted for by the causal wake surfaces currently traversing the space between sources and receivers in an action-derived model; otherwise this balance is the momentum diagnostic to verify.

**Corollary (Center of Mass Motion):**
For an isolated binary, the center of mass $\mathbf{x}_{\text{cm}}$ need not move at constant velocity in the mechanical coordinates alone. Instead, it can oscillate around a mean trajectory while wake momentum carries the compensating history term. This is the two-body version of the [center-of-response theorem target](energy.md#theorem-target-center-of-response): in an exactly symmetric circular binary, the exposed-energy response center $\mathbf{X}_{\mathrm{resp}}$ is pinned to the circle center by symmetry, while the particle-only mechanical center can still show finite-window oscillatory bookkeeping if wake momentum is not included. A runaway center-of-mass self-acceleration is forbidden only in an action-derived model whose regularization preserves translation symmetry; in working regularized models this is a conservation diagnostic to be checked.

---

### Energy and The Lyapunov Functional

Energy conservation is the critical constraint preventing runaway solutions (MCB-09).

#### Definition 3 (The History Hamiltonian)
For an action-derived delayed model with time-translation symmetry, the target conserved quantity $\mathcal{H}$ is a history functional. For state-dependent delays, the useful comparison object is a **Lyapunov-Krasovskii-style functional**:
$$
\mathcal{H}(\mathbf{x}_t) = K(\mathbf{v}(t)) + \mathcal{U}_{\text{history}}(\mathbf{x}_t)
$$

1. **Kinetic Energy:** $K(t) = \sum \frac{1}{2} \mu_{\text{arch}} \|\mathbf{v}_i(t)\|^2$.
2. **Potential Functional:** $\mathcal{U}_{\text{history}}$ accumulates the work done by the conservative forces. Unlike an instantaneous potential $V(r)$, this depends on the configuration of all active wake surfaces.

#### Theorem 3 (Energy Balance Equation)
$$
\frac{dK}{dt} = \sum_{i} \mathbf{v}_i(t) \cdot \mathbf{F}_i(t)
$$
We define the **Interaction Potential Functional** $\mathcal{W}(t)$ such that:
$$
\mathcal{W}(t) = -\int_{t_0}^t \sum_i \mathbf{v}_i(s) \cdot \mathbf{F}_i(s) \, ds
$$
This functional is nonlocal in time: it accumulates deferred work along the path-history of wakes and is not an instantaneous potential $U(r)$.
Then, by construction along the realized trajectory, $\mathcal{E}_{\text{tot}} = K(t) + \mathcal{W}(t)$ is constant. It is an exact Noether charge only when $\mathcal{W}$ is the boundary term of the same symmetry-preserving delayed action; otherwise it is a diagnostic reconstruction.

#### Lemma 1 (Boundedness of the Potential)
**Assumption:** The interaction is regularized with width $\eta > 0$ such that the maximum force is bounded: $\|\mathbf{F}_{ij}\| \le F_{\max}(\eta)$.
**Statement:** For a bound system (architrinos confined to a finite volume $V$), the rate of work is bounded by $N F_{\max} v_{\max}$.

#### Conditional Target 4 (No-Runaway Criterion)
This criterion is not a completed theorem until the same symmetry-preserving regularized action supplies $\mathcal{W}$ on the retained branch chart and a lower bound is proven for that branch. Under those hypotheses, in an action-derived master-equation branch with fixed $\eta>0$, an isolated binary cannot undergo runaway acceleration ($\|\mathbf{v}\| \to \infty$) *unless* the action-compatible potential energy functional $\mathcal{W}(t)$ diverges to $-\infty$.

*Proof Logic:*
Since $\mathcal{E}_{\text{tot}}$ is constant:
$$
K(t) = \mathcal{E}_{\text{tot}} - \mathcal{W}(t)
$$
For $K(t)$ to diverge, $\mathcal{W}(t)$ must decrease without bound.
1. **Partner attraction:** $q_1 q_2 < 0$. The potential is negative (attractive). As $r \to 0$, $V \to -\infty$. Collapse leads to infinite kinetic energy in the standard Kepler singularity pattern; in this architecture, self-hit is the proposed counter-channel.
2. **Self-hit repulsion:** $q_1 q_1 > 0$. The force is **repulsive**. The potential contribution is **positive**.
  *  Work done by self-hit: If an architrino is pushed "from behind" by its own wake, it gains $K$.
  *  However, this energy must come from the $\mathcal{W}$ term.
  *  Since self-hit potential is repulsive (positive energy hill), converting it to kinetic energy lowers the total potential.
  *  **Crucial bound:** The deferred work encoded in a self-wake is finite when the emitted causal-wake budget is finite. An architrino cannot extract infinite energy from its own past unless the history functional has already assigned an infinite budget to that causal wake.

**Conclusion:** A self-acceleration runaway, where an architrino accelerates itself indefinitely using self-forces, is excluded only on branches satisfying the action-derived conservation and lower-bound hypotheses. In other working models, the same statement is a validation target: the system can oscillate or settle, but an apparent explosion to $\|\mathbf{v}\|=\infty$ must be traced either to singular collapse, transversality loss, or a broken conservation diagnostic.

---
