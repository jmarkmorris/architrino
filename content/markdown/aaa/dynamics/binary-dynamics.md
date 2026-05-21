# Binary Dynamics

This chapter develops two-body architrino dynamics from the appearance of self-hit to candidate stable binaries and their conditional role as measurement standards. It then formalizes the maximum-curvature attractor analysis and closes with the state-space and conservation-law foundations needed for well-posed dynamics. **Status:** (1) self-hit makes the dynamics non-Markovian (path-history dependent), and (2) stability/attractor claims are conjectural unless explicitly established.

It is the foundational precursor to [Nested Shell Swarm Dynamics](../noether-swarm/nested-shell-swarm-dynamics.md), [Dyadic Resonance Lock](dyadic-resonance-lock.md), [Master Equation](master-equation.md), and the assembly-level [Noether Core](../noether-swarm/noether-swarm.md).

This chapter is the canonical home for two-body wake regimes, partner-hit versus self-hit behavior, spiral contraction, and maximum-curvature binary analysis. The primitive-entity ontology in [Architrino](../foundations/architrino.md) should point here once the discussion becomes a behavioral regime or assembly-stability mechanism.

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

In the strictly sub-field-speed regime (no self-interaction, $\|\mathbf{v}\|\le c_f$), a stable, circular orbit is impossible. Because the attractive force on each architrino points to the *past* position of its partner, it is not a true central force. This delay motivates an **inward spiral modeled as exponential in angle** (a logarithmic spiral), consistent with a per-cycle angular-momentum increment $\Delta L_c$ in the partner-only regime. The radius shrinks geometrically per turn and speed increases until the self-interaction threshold ($\|\mathbf{v}\|>c_f$) is crossed.

Standard central-force mechanics conserves angular momentum because the force at time $t$ is collinear with the equal-time separation vector. The partner-hit branch does not have that geometry. Define the equal-time separation and delayed line of action by
$$
\mathbf{r}_{12}^{\mathrm{eq}}(t)
\equiv
\mathbf{s}_1(t)-\mathbf{s}_2(t),
\qquad
\widehat{\mathbf{r}}_{12}(t;t_0)
=
\frac{\mathbf{s}_1(t)-\mathbf{s}_2(t_0)}
{\|\mathbf{s}_1(t)-\mathbf{s}_2(t_0)\|}.
$$
The delayed partner branch carries the angular-momentum-change direction
$$
\mathbf{r}_{12}^{\mathrm{eq}}(t)
\times
\widehat{\mathbf{r}}_{12}(t;t_0),
$$
which is generically nonzero because $\mathbf{s}_2(t_0)$ is not the partner's equal-time position. Therefore the usual angular-momentum barrier and the instantaneous effective potential
$$
V_{\mathrm{eff}}(r)=V(r)+\frac{ml^2}{2r^2}
$$
cannot be imported as the binary's governing reduction. A conserved angular-momentum-like quantity, if present, must include the causal-wake history term that balances the delayed torque.

**Lemma (No stable circular orbit for $\|\mathbf{v}\| < c_f$).** In units with $c_f=1$, the circular speed is $s=R\omega$. In the partner-only regime, the per-hit tangential component satisfies
$$
T_p \propto \frac{\sin(\delta_p/2)}{\cos^2(\delta_p/2)} > 0 \quad (0<\delta_p<\pi),
$$
where $\delta_p$ is the partner delay angle. The time-averaged tangential acceleration cannot vanish; a constant-speed circular orbit is impossible.

-  The tangential component of the delayed force sustains the orbital motion.
-  The radial component continuously pulls the architrinos closer together.

With perfectly symmetric initial conditions (e.g., starting at rest), the paths of the electrino and positrino are distinct but perfect mirror images of each other. As they spiral inward, their speeds continuously increase. Emission cadence and intrinsic per-wavefront amplitude remain constant, but the **received** force is still velocity-dependent because the delayed Jacobian compresses or dilates the causal flux along each active branch. The evolution is therefore driven by delay geometry, branch bunching, and, once active, self-interaction.

Initially, and as long as the speeds of both architrinos are less than or equal to the wake propagation speed $c_f$, they are only influenced by their partner's attractive wake. The total acceleration is simply the attractive force:
$$
\mathbf{a}_{1, \text{total}}(t) = \mathbf{a}_{1,2}(t) \quad \text{and} \quad \mathbf{a}_{2, \text{total}}(t) = \mathbf{a}_{2,1}(t)
$$
During this phase, the system is purely contractile, with the architrinos accelerating and spiraling towards each other. The positive tangential component (see Lemma in the prior section) guarantees continued speed-up, so the spiral tightens until the self-hit regime is reached.

### Ideal Symmetric Spiral Ansatz

The ideal binary spiral used in this opening analysis is not the same geometry as the later maximum-curvature circular benchmark. It is a **symmetric logarithmic-spiral ansatz**: the electrino and positrino follow two distinct planar curves related by the binary symmetry. At equal absolute time they remain opposite about the midpoint in the ideal center frame, but each architrino's path is the mirror-conjugate of the other's path rather than the same curve traced by both architrinos.

This matters because the ideal spiral is a **transient, scale-similar contraction model**. Within a fixed velocity regime and fixed active-root ledger, the local force geometry is assumed to repeat after a scale change and phase advance: radii shrink by a common factor, speeds rise according to the same delayed-geometry rule, and the partner/self branch structure is symmetric between the two architrinos. When the trajectory crosses a threshold such as $\|\mathbf{v}\|=c_f$ or a higher root-birth boundary, that scale-similar description must be re-matched on a new branch chart.

By contrast, the maximum-curvature binary section studies a **uniform circular benchmark**: fixed $R$, fixed $s$, and a single circular path geometry used to compute closed-form delay angles, branch Jacobians, and per-hit force components. That circular model is useful as a limiting or diagnostic case, but it should not be read as the actual inward spiral path before any final arrest. The detailed non-circular benchmark for the symmetric logarithmic spiral belongs in [Master Equation](master-equation.md#symmetric-delayed-logarithmic-spiral-advanced-non-circular-benchmark); this chapter uses it only as the conceptual two-body entry point.

## Spiral Momentum Budget Across the Hinge (Speculative)

This subsection records a modeling hypothesis rather than a derived law. The desired closure would link the spiral path, the per-hit force law, and the angular-momentum budget across the full velocity range. Below the wake speed, the binary feels only partner hits, yet the tangential component remains positive, so the spiral keeps tightening and the total orbital angular momentum of the **binary** grows each turn. We introduce a per-cycle gain parameter $\Delta L_c$ to track that growth (a **constant** increment per full revolution in this hypothesis).

**Speculative continuity assumption:** as $s\to1$, the per-cycle mechanical gain transitions smoothly from $\Delta L_\text{cycle} = \Delta L_c$ (sub-field-speed) to $\Delta L_\text{cycle} = 2\Delta L_c$ (self-hit active). This is not a claim that total angular momentum is created; the missing balance must be carried by a history-aware wake angular-momentum functional.

This section treats an exponential-in-angle spiral (logarithmic spiral) as a **modeling assumption** rather than a derived law. It simply sets the bookkeeping target: a path-history force sum that yields a smooth, finite increase in $\Delta L_\text{cycle}$ at the hinge. The detailed link between the summed per-hit forces and the spiral shape remains to be derived.

## Spiral Binary Symmetry-Breaking Point ($\|\mathbf{v}\| = c_f$)

The binary system's evolution is organized around the **field-speed symmetry point** $\|\mathbf{v}\|=c_f$. This is a **hinge** where the causal structure changes: below $c_f$ only partner-delay forces exist, while above $c_f$ self-hit roots appear. The hinge is not a hard barrier; it is the birth of the principal self branch. In the symmetric circular geometry the self-delay equation is
$$
\delta_s = 2s\sin(\delta_s/2), \qquad s=\frac{\|\mathbf{v}\|}{c_f}.
$$
Writing $s=1+\mu$ with $\mu>0$ small, the principal root satisfies
$$
\delta_s \sim \sqrt{24\mu},
\qquad
\sin(\delta_s/2)\sim \sqrt{6\mu}.
$$
The associated branch Jacobian is
$$
J_s = 1-s\cos(\delta_s/2)=1-\frac{\delta_s}{2}\cot(\delta_s/2)\sim 2\mu.
$$
Therefore the self radial and tangential magnitudes scale as
$$
\frac{1}{\sin(\delta_s/2)\,|J_s|}\sim \mu^{-3/2},
\qquad
\frac{1}{\sin^2(\delta_s/2)\,|J_s|}\sim \mu^{-2}.
$$
This is the first major consequence of restoring the causal Jacobian: the hinge is not merely a change in root count but a genuine **caustic onset**. The principal self branch turns on with a sharply amplified outward radial response and an even more singular tangential drive. Any candidate maximum-curvature balance must therefore confront a near-threshold Jacobian wall before appealing to higher-winding smoothing.

## Self-Hit: Definition and Diagnostics

Self-hit is the key non-Markovian feature of architrino dynamics. It occurs when an architrino interacts with potential it emitted earlier along its own worldline.

**Geometric condition (absolute coordinates):** For a given architrino with trajectory $\mathbf{x}(t)$, a self-hit event is a pair of times $(t_\text{emit}, t_\text{hit})$ with $t_\text{hit} > t_\text{emit}$ such that
$$
\|\mathbf{x}(t_\text{hit}) - \mathbf{x}(t_\text{emit})\| = c_f (t_\text{hit} - t_\text{emit}),
$$
and the architrino is the source of the causal wake surface emitted at $t_\text{emit}$.

**Terminology split:** Hit type is determined by **source identity**. A **self-hit** has the same source and receiver; a **partner hit** has a different source and receiver. Root count is a separate question: either source can contribute one active causal root or multiple active roots at the same reception time. Thus "self-hit" does not mean "multi-hit," and "partner hit" does not mean "single-hit."

**Dynamical role:**
- On any interval with strict sub-field-speed motion, self-hit is absent by the triangle-inequality root test, unless older path-history emissions from a prior super-field-speed interval remain active.
- As velocities exceed $c_f$ on curved histories, emission isochrons can catch up with the emitter's future positions, generating candidate nonlocal feedback and effective restoring or destabilizing forces depending on configuration.
- In generic trajectories, once an architrino has exceeded $c_f$ and emitted wakes in that regime, it can later slow below $c_f$ and still experience self-hits from those earlier emissions (see **Status** at top for the non-Markovian/path-history caveat).
- For binary and tri-binary assemblies, repeated self-hit events are the proposed mechanism that can prevent collapse, lock in stable radii and frequencies, and create new limit cycles and attractors.

For the circular-geometry details (principal angles, winding numbers, discrete self-hit branches), see **Setup and Notation (Symmetric Frame)** in **Maximum-Curvature Binary — Circular**.

## Spiral Binary Deflationary Phase

Once the circular branch admits same-source roots, the architrinos interact with their own earlier, repulsive wakes. The total acceleration on each architrino then becomes a superposition of attraction from its partner and self-repulsion. For the electrino:
$$
\mathbf{a}_{1, \text{total}}(t) = \mathbf{a}_{1,2}(t) + \mathbf{a}_{1,1}(t)
$$
In the circular benchmark, the principal self-hit branch ($m=0$) becomes available only on the super-field-speed side; at higher speeds, additional self-hit and partner-hit roots can turn on (see **Root Multiplicity vs. Speed**). The new self-repulsive term, $\mathbf{a}_{1,1}(t)$, grows rapidly as the path curvature increases, and it also adds tangential acceleration. In this regime the spiral typically tightens **more** each turn: the radius decreases faster while speed continues to rise. We still call this the **deflationary** phase, but in the sense that any radial arrest is a **late** effect—there is no soft landing early on. The balance that halts contraction is expected, if realized, only near the final turn where the orbit settles into the conjectured limiting circle; see **What "Maximum Curvature" Demands** for the balance mechanism.

## Maximum-Curvature Binary — Circular

Once self-hit turns on, the natural question is whether the dynamics converge to a limiting curvature. We call the candidate limit the **maximum-curvature binary (MCB)**. This section collects the full two-body, self-hit analysis for that candidate, including delay geometry, force components, and stability criteria. It is the canonical reference for MCB attractor status.

MCB stability claims rely on the well-posedness of the regularized SD-NDDE. In this chapter we treat $\eta > 0$ as fixed; any $\eta \to 0$ statement is outside the claims established here unless a weak-limit argument is explicitly supplied. The formal state-space framework appears in **State Space and Well-Posedness of the Two-Body Delay System**.

**Goal**: Characterize the circular, constant-speed, constant-radius configuration of two opposite-polarity architrinos and investigate where curvature $1/R$ is maximized. We work in units with field speed $c_f = 1$ and use the canonical delayed per-hit law with radial line of action and Jacobian-weighted magnitude.

**Plain language**: We seek the tightest (smallest-$R$) steady circle an opposite-polarity pair can trace when the only forces come from delayed, Jacobian-weighted line-of-action interactions with the partner (partner hits, possibly multiple at higher speed) and from each architrino's own past emissions (self-hits, accepted by same-source roots; in the circular branch these require the super-field-speed side).

### Foundational Context (Ontological Clarification)

#### The Maximum-Curvature Binary (MCB) as Fundamental Unit

The architecture hypothesizes that the **maximum-curvature binary (MCB)** would be reachable first by the **inner binary** of a tri-binary assembly, stabilized by certified same-source self-hit roots on the super-field-speed circular branch. Contingent on Conjectures A/B, it would supply candidate **fundamental physical units** (length and time); see **Emergent Properties and Measurement Standards** below for the explicit definitions.

**Universal cap target (explicit):** If a stable MCB branch is certified, it would define a single limit state with one radius/speed pair. Binaries may sit below that limit, but the claim that no binary can exceed the MCB curvature or pass beyond its defining radius/speed remains conditional on the full signed-root ledger and stability certificate.

If realized, the MCB radius $r_{\text{min}}$ is expected to be determined by the balance of:
1. opposite-polarity causal-wake attraction, with the stripped inverse-square surrogate scaling as $\epsilon^2/r^2$,
2. self-hit repulsion (non-Markovian feedback when same-source roots exist; super-field-speed circular history is the relevant branch),
3. Centripetal requirement for stable circular orbit.

**Dynamical priority (attractor status):** The architecture hypothesizes the MCB is a **robust attractor**, not a finely tuned periodic orbit. Only if the multipliers lie strictly inside the unit circle and the basin is non-trivial do we have the attractor the architecture relies on. If neutrality or instability is found, the tri-binary ladder and Noether-core claims must be downgraded or the interaction law revised (e.g., additional damping/medium effects).

### Setup and Notation (Symmetric Frame)

- **Two architrinos** with polarity bookkeeping labels $q_1 = -\epsilon$ and $q_2 = +\epsilon$ (where $\epsilon = |e|/6$).
- **Equal-time positions** (in absolute time $t$) are diametrically opposite on a circle of radius $R$ about the midpoint.
- **Uniform circular motion**: Angular speed $\omega$, constant tangential speed $s = R\omega$.
- **Non-translating binary**: Circle center (midpoint) is fixed in Euclidean 3D space; no net translation.

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
r = c_f \cdot \tau \quad \Rightarrow \quad r = \tau \quad \text{(in units where } c_f = 1\text{)}.
$$

This yields two delay equations:

1. **Self-hit**:
  $$
  \delta_s = \omega \tau_s = \omega \cdot r_s = \omega \cdot 2R \sin(\delta_s / 2) = 2s \sin(\delta_s / 2).
  $$

2. **Partner hit**:
  $$
  \delta_p = \omega \tau_p = \omega \cdot r_p = \omega \cdot 2R \cos(\delta_p / 2) = 2s \cos(\delta_p / 2).
  $$

**These two transcendental equations determine** $(\delta_s, \delta_p)$ **as functions of speed** $s$.

**Circular-branch threshold**: On this uniform circular branch, self-hit roots exist only when $s > 1$ (i.e., $\|\mathbf{v}\| > c_f$). For $s \le 1$, no self-hit roots occur on the circular chart. This is a branch-specific root result, not a general speed-only criterion for arbitrary histories.

---

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

**Signed-sheet caveat:** A full circular root certificate must also track whether the full delay angle is represented as $2\pi m+\alpha$ or $2\pi m-\alpha$ for a minimal chord angle $\alpha\in(0,\pi]$. Opposite signed sheets can reverse the tangential projection of a self-hit line of action. The sign-invariant statements below are therefore certified only on the same-sheet principal branch chart unless the signed sheet has been explicitly included in the root ledger.

For the full signed ledger, write
$$
\Delta_s^{\sigma,m}=2\pi m+\sigma\alpha_s,
\qquad
\Delta_p^{\sigma,m}=2\pi m+\sigma\alpha_p,
\qquad
\sigma\in\{+1,-1\},
$$
with $\sigma=-1$ requiring $m\ge1$. The signed circular root equations become
$$
2\pi m+\sigma\alpha_s=2s\sin(\alpha_s/2),
\qquad
2\pi m+\sigma\alpha_p=2s\cos(\alpha_p/2).
$$
The corresponding tangential signs are $\sigma\cos(\alpha_s/2)$ for self roots and $\sigma\sin(\alpha_p/2)$ for partner roots, up to positive branch weights. The first negative self sheet, $m=1,\sigma=-1$, obeys
$$
2\pi-\alpha=2s\sin(\alpha/2),
$$
and appears at $s=\pi/2$ with $\alpha=\pi$. For $s>\pi/2$ it contributes negative tangential drive. This does not prove circular closure, but it prevents the same-sheet no-go from being promoted to a full signed-ledger theorem.

---

### Per-Hit Directions and Force Components

#### Local Coordinate Frame at Receiver

- **Radial outward**: $\hat{e}_r$ (from rotation center toward receiver).
- **Tangential**: $\hat{e}_t$ (direction of motion along circle).

#### Unit Directions of Lines of Action (Emission -> Reception)

**Self-hit**:
$$
\hat{u}_s = \sin(\delta_s / 2) \, \hat{e}_r + \cos(\delta_s / 2) \, \hat{e}_t.
$$

**Partner hit** (geometric chord across circle):
$$
\hat{u}_p = \cos(\delta_p / 2) \, \hat{e}_r - \sin(\delta_p / 2) \, \hat{e}_t.
$$

#### Canonical Per-Hit Accelerations

Using the delayed law with line-of-action direction and Jacobian-weighted magnitude (where $\kappa$ is a coupling constant and $\epsilon = |e|/6$), define branch Jacobians

$$
J_s \equiv 1-\frac{\mathbf{v}_{\text{self}}(t_0)\cdot \hat{u}_s}{c_f},
\qquad
J_p \equiv 1-\frac{\mathbf{v}_{\text{partner}}(t_0)\cdot \hat{u}_p}{c_f}.
$$

These encode the geometric bunching or dilation of the received causal flux along the active self and partner branches.

**Self-hit** (like polarities -> repulsive):
$$
\mathbf{a}_s = +\kappa \epsilon^2 \frac{1}{r_s^2\,|J_s|} \hat{u}_s.
$$

**Partner hit** (opposite polarities -> attractive):
$$
\mathbf{a}_p = -\kappa \epsilon^2 \frac{1}{r_p^2\,|J_p|} \hat{u}_p.
$$

---

#### Explicit Circular Jacobians

For the symmetric circular geometry, the emitter velocities can be resolved exactly against the line-of-action directions:
$$
\mathbf{v}_{\text{self}}(t_0)\cdot \hat{u}_s = s\cos(\delta_s/2),
\qquad
\mathbf{v}_{\text{partner}}(t_0)\cdot \hat{u}_p = -s\sin(\delta_p/2).
$$
Hence the branch Jacobians reduce to
$$
J_s = 1-s\cos(\delta_s/2),
\qquad
J_p = 1+s\sin(\delta_p/2).
$$
Using the delay constraints gives equivalent forms
$$
J_s = 1-\frac{\delta_s}{2}\cot(\delta_s/2),
\qquad
J_p = 1+\frac{\delta_p}{2}\tan(\delta_p/2).
$$
These formulas make the asymmetry between the two branch types explicit:

- The partner branch always satisfies $J_p > 1$, so delay geometry **dilutes** the received partner flux relative to the static inverse-square value.
- The self branch can satisfy $J_s \to 0^+$, producing the causal bunching that sharpens self-hit into a null-separatrix wall.

---

#### Radial and Tangential Components

Define **inward radial** as positive (toward center) and **tangential** as positive in direction of motion.

**Chord lengths**:
$$
r_s = 2R \sin(\delta_s / 2), \quad r_p = 2R \cos(\delta_p / 2).
$$

**Inward radial components**:

- **Self** (repulsive -> outward -> negative):
 $$
 A_{s,\text{rad}} = -\kappa \epsilon^2 \frac{\sin(\delta_s / 2)}{r_s^2\,|J_s|} = -\frac{\kappa \epsilon^2}{4R^2 \sin(\delta_s / 2)\,|J_s|}.
 $$

- **Partner** (attractive -> inward -> positive):
 $$
 A_{p,\text{rad}} = +\kappa \epsilon^2 \frac{\cos(\delta_p / 2)}{r_p^2\,|J_p|} = +\frac{\kappa \epsilon^2}{4R^2 \cos(\delta_p / 2)\,|J_p|}.
 $$

**Net inward radial acceleration**:
$$
A_{\text{rad}} = \frac{\kappa \epsilon^2}{4R^2} \left( \frac{1}{\cos(\delta_p / 2)\,|J_p|} - \frac{1}{\sin(\delta_s / 2)\,|J_s|} \right).
$$

**Tangential components** (both non-negative for $0 < \delta_s, \delta_p < \pi$):

- **Self**:
 $$
 T_s = +\kappa \epsilon^2 \frac{\cos(\delta_s / 2)}{r_s^2\,|J_s|} = \frac{\kappa \epsilon^2 \cos(\delta_s / 2)}{4R^2 \sin^2(\delta_s / 2)\,|J_s|}.
 $$

- **Partner**:
 $$
 T_p = +\kappa \epsilon^2 \frac{\sin(\delta_p / 2)}{r_p^2\,|J_p|} = \frac{\kappa \epsilon^2 \sin(\delta_p / 2)}{4R^2 \cos^2(\delta_p / 2)\,|J_p|}.
 $$

**Net tangential acceleration**:
$$
T = T_s + T_p \ge 0.
$$

---

#### Sub-Field-Speed Simplification ($s \le 1$; No Self-Hits)

When $s \le 1$, self-hits do not occur ($\delta_s$ has no solution). Only the partner contributes, so the tangential drive remains strictly positive, consistent with the lemma above:

$$
T(s < 1) = T_p = \frac{\kappa \epsilon^2}{4R^2} \frac{\sin(\delta_p / 2)}{\cos^2(\delta_p / 2)\,|J_p|}.
$$

Using the delay relation $\delta_p = 2s \cos(\delta_p / 2)$:

$$
T(s < 1) = \frac{\kappa \epsilon^2 s^2}{R^2} \frac{\sin(\delta_p / 2)}{\delta_p^2\,|J_p|} > 0.
$$

Because $J_p = 1+s\sin(\delta_p/2) > 1$, the delay geometry weakens the partner contribution relative to bare $1/r^2$, but it never changes its sign. Therefore even at sub-field speeds there is always a **net positive tangential force** (accelerating the binary), which prevents a truly stable, constant-speed circular orbit.

---

### Requirements for True Circular Orbit (Working Hypothesis)

For uniform circular motion at fixed radius $R$ and constant speed $s$:

1. **Centripetal balance**:
  $$
  A_{\text{rad}} = \frac{s^2}{R}.
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
  0.
  $$
  Here $K_{\mu}$ is the chosen quadratic kinetic proxy, $\Phi_{\mathrm{wake},\partial W}$ is the causal-wake energy flux through the boundary of the local window, and $P_{\mathrm{recoil}}$ is any retained local wake-emission resistance term. The older shorthand $\langle T\rangle=0$ is valid only for a particle-only closed window with no boundary wake flux and no recoil term.

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
>0,
$$
where $w_{p,m},w_{s,m}\ge 0$ are branch weights induced by regularization/time averaging, and $\mathcal{M}_p,\mathcal{M}_s$ are active partner/self root sets.

*Proof.*  
For any active partner branch, the tangential contribution is
$$
T_{p,m}
=
\frac{\kappa\epsilon^2}{4R^2}
\frac{\sin(\tilde{\delta}_{p,m}/2)}{\cos^2(\tilde{\delta}_{p,m}/2)\,|J_{p,m}|}
>0,
\qquad \tilde{\delta}_{p,m}\in(0,\pi),
$$
and for any active self branch (when present),
$$
T_{s,m}
=
\frac{\kappa\epsilon^2}{4R^2}
\frac{\cos(\tilde{\delta}_{s,m}/2)}{\sin^2(\tilde{\delta}_{s,m}/2)\,|J_{s,m}|}
>0,
\qquad \tilde{\delta}_{s,m}\in(0,\pi).
$$
The sign is branch-invariant on this same-sheet chart because winding changes timing, not chord orientation. Therefore each summand in $T_{\mathrm{net}}$ is nonnegative, and at least one is strictly positive whenever any hit exists. Hence $T_{\mathrm{net}}>0$ on the certified chart. $\square$

**Corollary.**  
Within the same-sheet bare isolated two-body kernel, an exact constant-speed circular orbit
with no boundary wake flux and no recoil term is impossible. Any MCB-like steady state must therefore close a finite-window balance: signed-ledger cancellation may reduce the local tangential drive, but the remaining forward power must be assigned either to wake escapement through $\partial W$, to a local recoil term, or to genuinely multi-body tri-binary exchange.

**Interpretation.** The positive tangential component is not merely an obstruction to be erased. In a finite local window, partner and self wakes are continually emitted while only a subset of their causal isochrons later hit a local receiver. The unreceived portion exits the local window as wake-history flux. The same-sheet tangential drive is therefore the mechanical pump that can replace the interaction energy exported by those escaping causal wakes. A local binary can look particle-only conservative only if the outgoing wake record, recoil channel, and retained branch ledger are all included in the same balance law.

**Plain language**: On the same-sheet chart, the isolated pair shows persistent tangential drive at the per-hit level; cancellation is hard because every certified root pushes the same way. The stable-branch question is not "how can the drive disappear?" but "which wake flux, recoil, or multi-body channel balances the drive without destroying the retained branch?" This is a primary test of the MCB attractor hypothesis.

---

### What "Maximum Curvature" Demands

**Mechanism summary (self-hit balance):** once $s>1$, each self-hit contributes a **repulsive acceleration away from its own past emission point**. In the symmetric circular geometry that repulsion has a **radial outward component** (opposing further contraction) and a **positive tangential component** (continuing to speed up the architrino). As the radius shrinks, both partner attraction and self-hit repulsion scale like $1/R^2$, while the decisive extra effect is the Jacobian weighting: the self-hit response can sharpen dramatically as an active branch approaches its null-separatrix geometry and because **new self-hit roots appear** at higher $s$. Maximum curvature would require the **outward self-hit radial component** to balance the inward partner pull without the still-positive tangential drive destroying constant-speed closure.

From the radial component formula:

$$
A_{\text{rad}} = \frac{\kappa \epsilon^2}{4R^2} \left( \frac{1}{\cos(\delta_p / 2)\,|J_p|} - \frac{1}{\sin(\delta_s / 2)\,|J_s|} \right).
$$

**Increasing curvature** ($1/R$ larger, so $R$ smaller) requires **stronger inward radial force**. This occurs when:

1. **$\delta_p$ increases** -> $\cos(\delta_p / 2)$ decreases -> partner term $1/\cos(\delta_p / 2)$ **increases** (stronger inward pull).
2. **$\delta_s$ increases** -> $\sin(\delta_s / 2)$ increases -> the geometric part of the self term decreases, while the full outward response still depends on how rapidly the Jacobian factor $|J_s|^{-1}$ grows along the active branch.

Two distinct balance mechanisms are now mathematically visible:

1. **Near-threshold Jacobian wall.**  
   On the principal self branch, $|J_s|^{-1}$ turns on singularly as $s\downarrow 1^+$, with radial magnitude scaling like $(s-1)^{-3/2}$. This is the earliest possible obstruction to continued contraction.

2. **Higher-speed multi-branch redistribution.**  
   At larger $s$, additional self branches turn on and redistribute the outward response across several winding sectors. In that regime the detailed balance depends on the full weighted sum over all active branches rather than on the principal branch alone.

**However**: Due to the same-sheet per-hit $T > 0$ result, this "maximum curvature" state remains unverified for the isolated two-body system. Its stability must be tested by the full, signed, multi-root time-averaged dynamics.

---

### Emergent Properties and Measurement Standards

If a stable MCB exists, it provides a concrete **rod** and **clock** defined entirely by the two-body delay dynamics. Let
$$
d_0 := R_{\text{MCB}}, \qquad T_0 := \frac{2\pi}{\omega_{\text{MCB}}}.
$$
Then $d_0$ is the fundamental length scale of the architecture, and $T_0$ is the fundamental time scale. Their comparison with the wake propagation speed is the dimensionless MCB speed factor
$$
\beta_{\mathrm{MCB}}
=
\frac{R_{\mathrm{MCB}}\omega_{\mathrm{MCB}}}{c_f}
=
\frac{2\pi d_0}{c_fT_0},
$$
so the wake propagation speed is not an imposed architrino-speed limit. It is the propagation reference used to compare the MCB rod and clock, while individual architrinos may enter super-field-speed regimes with
$$
\|\mathbf{v}\|>c_f.
$$

In this view, any ruler or clock built from architrino assemblies ultimately reduces to multiples of $(d_0, T_0)$. Measurement standards are therefore **dynamical invariants** of the two-body attractor: they persist because the underlying limit cycle (if realized) is stable and reproducible across assemblies.

If the MCB does not exist as a stable attractor, these emergent standards must be replaced by whatever stable limit structure the dynamics actually support.

### Root Multiplicity vs. Speed

This section separates the two terminology axes used throughout the chapter:

- **Source identity**: self-hit ($j=i$) or partner hit ($j\ne i$).
- **Root count**: single-root or multi-root on the current branch chart.

The self-hit onset is dynamically special because it introduces same-source feedback and an outward self-repulsive channel. Partner multi-hit is still part of the same super-field-speed root topology: at higher speeds, older partner wake surfaces can also satisfy the causal-root condition and contribute additional inward channels.

In the same-sheet uniform circular, non-translating geometry, admissible self-roots are indexed by winding number $m \ge 0$ and minimal angular separation $\tilde{\delta}_s \in (0, \pi]$:

$$
\delta_s = \tilde{\delta}_s + 2\pi m = 2s \sin(\tilde{\delta}_s / 2).
$$

#### Counting Self-Hits by Winding Index

For fixed winding $m \ge 0$, define
$$
f_m(\delta;s)=2s\sin(\delta/2)-\delta-2\pi m,
\qquad \delta\in(0,\pi].
$$
An $m$-branch same-sheet self-hit exists exactly when $f_m(\delta;s)=0$ has a solution in $(0,\pi]$.

- For the principal branch $m=0$, the threshold is sharp:
  $$
  s_0^\star = 1.
  $$
- For higher winding numbers $m\ge 1$, the appearance threshold is determined by the tangency condition at the interior maximizer $f_m'(\delta;s)=0$, namely
  $$
  \cos(\delta^\star_m/2)=\frac{1}{s},
  \qquad
  \sqrt{(s_m^\star)^2-1}-\arccos\!\left(\frac{1}{s_m^\star}\right)=\pi m.
  $$

Thus the higher same-sheet self branches do not turn on at equally spaced speeds. Their onset is governed by a nonlinear sequence of tangencies of the delayed self-intersection curve. A full signed-root ledger must add the $\sigma=-1$ sheets described above; the first such negative self sheet appears at $s=\pi/2$, earlier than the first higher same-sheet self branch.

For large winding number $m$, the threshold has the asymptotic form
$$
s_m^\star = \pi m + \frac{\pi}{2} + O\!\left(\frac{1}{m}\right),
$$
so the old equally spaced picture is recovered only as a high-speed approximation.

**Note**: Straight-line motion admits **no self-hits** even if $s > 1$; **curvature is required**. The above statements apply specifically to uniform circular, non-translating geometry.

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
 \varphi_p(m; s) = \pi - \tilde{\delta}_p(m; s).
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
 \varphi_s(m; s) = -\tilde{\delta}_s(m; s).
 $$

- **Existence windows**:
 - Principal branch ($m = 0$): exists for every $s>1$, with $\tilde{\delta}_s\to0^+$ as $s\downarrow1$.
 - For $m \ge 1$: the branch appears only when the self-delay equation develops an interior tangency. The exact threshold $s_m^\star$ is determined in **Counting Self-Hits by Winding Index** below.
 - Within each branch, $\tilde{\delta}_s$ initially enters at a tangency angle and then decreases with $s$, so $\varphi_s$ drifts toward $-\pi$ at high speed.

---

### Super-Field-Speed Root Ledgers and Resonance Lock

The super-field-speed regime is not merely the same spiral at a larger speed. It changes the root topology of the binary. Once
$$
\|\mathbf{v}\|>c_f,
$$
the receiver can intersect multiple older causal wake surfaces from both its own path and its partner's path. In the circular reduced model, these intersections are counted by two integer ledgers:
$$
N_s(s)
\equiv
\#\{(m,\sigma):\text{self branch }(m,\sigma)\text{ is active at speed }s\},
$$
$$
M_p(s)
\equiv
\#\{(m,\sigma):\text{partner branch }(m,\sigma)\text{ is active at speed }s\}.
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
\frac{s^2}{R},
$$
together with whatever tangential closure condition is supplied by the full regularized dynamics. The radial equation says that partner-root accumulation supplies inward pull while self-root accumulation supplies outward response. On a fixed signed branch ledger $b$, the corresponding constant-speed closure target has the form
$$
\left\langle
\sum_{\rho\in b} T_\rho(R,s;\eta)
\right\rangle_{P_b}
=0,
$$
where the average is taken over one candidate period $P_b$ of the regularized history. The tangential condition remains the hard part: in the same-sheet bare isolated two-body kernel, the no-go result above shows that every active branch contributes positive tangential drive; in the full signed ledger, negative sheets must be included before any global no-go or closure theorem is claimed.

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

This statement is deliberately conditional. The present chapter derives the discrete root ledgers and the radial balance target, but the stability and quantization claims require the missing full-history certificate: finite active branches, positive Jacobian floors, returned-history closure, and a monodromy or boundary-trapping argument. In practice, that certificate may close first in a collinear breather or tri-binary setting rather than in the bare circular two-body kernel.

#### Branch Stability Target (Hessian Bridge)

The standard equilibrium test in central-force mechanics uses the Hessian of an instantaneous effective potential. If $q_\star$ is an equilibrium, the matrix
$$
H_{ab}(q_\star)=\partial_a\partial_b V_{\mathrm{eff}}(q_\star)
$$
tests local stiffness in the non-symmetry directions. This is useful as comparison language, but it is not yet a stability proof for an architrino binary because the force law depends on path-history, the active signed causal-root ledger, and the branch Jacobian floors.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ branch-stability target is therefore a cycle-averaged stiffness matrix on a fixed branch chart. Let $b$ denote a fixed signed causal-root ledger and let $\mathbf{X}_b(t)$ be a candidate periodic history with period $P_b$. For reduced branch coordinates $y^a$ transverse to time-shift and rotation symmetries, define the diagnostic stiffness target
$$
K^{(b)}_{ab}
=
\frac{1}{P_b}\int_0^{P_b}
\left.
\frac{\delta^2 U_{\eta,b}^{\mathrm{hist}}}{\delta y^a\,\delta y^b}
\right|_{\mathbf{x}_t=\mathbf{X}_{b,t}}
dt,
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
\inf_{\phi\in\mathcal{N}_b}|J(\phi)|\ge J_{\min}>0,
$$
and the non-symmetry Floquet multipliers of $D\mathcal{P}_b[\mathbf{X}_b]$ to satisfy
$$
|\mu_\alpha|<1.
$$
Only that return-map condition would upgrade the Hessian-style stiffness picture into branch stability. Until it is supplied, MCB stability remains a conditional target rather than a completed proof.

#### Finite-dimensional projection caveat

The circular formulas below use reduced coordinates; stability in the full history space remains a separate proof obligation.

## State Space and Well-Posedness of the Two-Body Delay System

### Introduction and Scope

The master equation of motion for the architrino system constitutes a system of **State-Dependent Neutral Delay Differential Equations (SD-NDDEs)**. Unlike ordinary differential equations (ODEs) where the state is a point in $\mathbb{R}^{6N}$, the state of this system is a **function segment** representing the past history of the architrinos.

We denote the position of the $i$-th architrino as $\mathbf{x}_i(t) \in \mathbb{R}^3$. We work in the **Euclidean void** with fixed metric $\delta_{ij}$.

---

### Functional Phase Space

To define the evolution at time $t$, we require knowledge of the trajectory over an interval $[t - \tau_{\max}, t]$, where $\tau_{\max}$ is the maximum causal lookback time relevant to the current dynamics.

#### Definition 1 (The History Space)
Let $h > 0$ be a history horizon (sufficiently large to capture all active causal roots). The **history space** $\mathcal{H}$ is defined as the Banach space of continuously differentiable functions mapping the delay interval to the configuration space:
$$
\mathcal{H} = C^1\left([-h, 0]; (\mathbb{R}^3)^N\right).
$$
For a trajectory $\mathbf{x}: [-h, \infty) \to (\mathbb{R}^3)^N$, the **state at time $t$**, denoted $\mathbf{x}_t$, is the element of $\mathcal{H}$ given by:
$$
\mathbf{x}_t(\theta) = \mathbf{x}(t + \theta), \quad \theta \in [-h, 0].
$$
The norm is the standard $C^1$ sup-norm: $\|\phi\|_\mathcal{H} = \sup_{\theta \in [-h,0]} (\|\phi(\theta)\| + \|\dot{\phi}(\theta)\|)$.

**Remark:** We require $C^1$ rather than $C^0$ because the delay $\tau$ depends on the state (state-dependent delay). In such systems, the vector field is typically not Lipschitz continuous in the $C^0$ topology, endangering uniqueness.

---

### The Regularized Interaction Functional

We formalize the force term derived in the master equation.

#### Definition 2 (Causal Constraint Functional)
For a target architrino $i$ at time $t$ and source $j$, the delay $\tau_{ij}(t)$ is implicitly defined by the causal-isochron condition. Let $\phi \in \mathcal{H}$ be the history. A **causal root** is a value $\tau > 0$ satisfying:
$$
g_{ij}(\tau, \phi) \equiv \|\phi_i(0) - \phi_j(-\tau)\| - c_f \tau = 0.
$$

#### Lemma 1 (Regularity of the Delay Map)
*Assumption:* The velocities are sub-field-speed relative to the separation, i.e., $\|\mathbf{v}_j\| < c_f$ (single-root regime) OR we isolate a specific branch of the multi-root solution where the relative radial velocity is not $c_f$.

*Statement:* If $\phi \in \mathcal{H}$ and $\tau^*$ is a simple root of $g_{ij}(\tau, \phi) = 0$ (i.e., $\partial_\tau g_{ij} \neq 0$), then there exists a neighborhood $U \subset \mathcal{H}$ of $\phi$ and a continuously differentiable functional $\tau: U \to \mathbb{R}^+$ such that $\tau(\phi) = \tau^*$.

*Proof.*  
Define
$$
g_{ij}(\tau,\phi)=\|\phi_i(0)-\phi_j(-\tau)\|-c_f\tau.
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
\frac{\phi_i(0)-\phi_j(-\tau^*)}{\|\phi_i(0)-\phi_j(-\tau^*)\|}.
$$
The simple-root condition is exactly $\partial_\tau g_{ij}\neq 0$, i.e. no
delayed tangency/causal-shock degeneracy. Therefore, by the Banach-space
Implicit Function Theorem, there exist a neighborhood $U$ of $\phi$ and a
unique $C^1$ map $\tau:U\to\mathbb{R}^+$ with
$g_{ij}(\tau(\psi),\psi)=0$ and $\tau(\phi)=\tau^*$. $\square$

#### Definition 3 (Regularized Acceleration Functional)
To ensure the vector field is Lipschitz, we replace the distributional Dirac delta of the master equation with the mollifier $\delta_\eta$ (see [Master Equation](master-equation.md)). The acceleration functional $F_i: \mathcal{H} \to \mathbb{R}^3$ is:
$$
F_i(\phi) = \sum_{j} \kappa \sigma_{ij} |q_i q_j| \int_{-h}^0 \frac{\phi_i(0) - \phi_j(\theta)}{\|\phi_i(0) - \phi_j(\theta)\|^3} \, \delta_\eta\left( \|\phi_i(0) - \phi_j(\theta)\| + c_f \theta \right) \, d\theta.
$$
**Crucial Property:** For $\eta > 0$ and smooth $\delta_\eta$, this integral operator maps $C^1$ histories to continuous accelerations.

---

### Local Well-Posedness

#### Theorem 1 (Local Existence and Uniqueness)
**Assumptions:**
1. $\eta > 0$, and $\delta_\eta$ is $C^1$ with bounded value and bounded derivative.
2. Initial history $\phi^0 \in \mathcal{H}$ is admissible: there exists $d_{\min}>0$ such that all interaction channels used by Definition 3 satisfy
   $$
   \|\phi_i(0)-\phi_j(\theta)\|\ge d_{\min},\qquad \theta\in[-h,0],
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
\mathbf{Y}_{t_0}=\phi^0.
$$
Then there exists $T>0$ and a unique $C^1$ solution on $[t_0-h,t_0+T)$.  
Equivalently, there is a unique maximal solution interval
$$
[t_0-h,t_{\max}),\qquad t_{\max}>t_0.
$$
If the optional gluing condition holds, the solution is $C^2$ at $t_0$.

*Proof.*  
Define
$$
\mathcal{G}(\phi)=(\phi_v(0),F(\phi)),
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
\mathbf{a}_{ij}(t) \propto \frac{\mathbf{x}_i(t) - \mathbf{x}_j(t_0)}{\|\mathbf{x}_i(t) - \mathbf{x}_j(t_0)\|^2\,|J_{ij}(t;t_0)|}
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
=c_f[t-(t_0-\tau)].
$$
Hence the same branch contributions appear with shifted times, and
$\ddot{\mathbf{y}}_i(t)=\ddot{\mathbf{x}}_i(t+\tau)$ satisfies the same force law.

For spatial isometries, set $\mathbf{y}_i(t)=R\mathbf{x}_i(t)+\mathbf{b}$,
$R\in O(3)$. Distances are preserved:
$$
\|\mathbf{y}_i(t)-\mathbf{y}_j(t_0)\|
=\|R(\mathbf{x}_i(t)-\mathbf{x}_j(t_0))\|
=\|\mathbf{x}_i(t)-\mathbf{x}_j(t_0)\|,
$$
so causal-root times are unchanged. Unit directions transform covariantly:
$\hat{\mathbf{r}}_{ij}^y=R\hat{\mathbf{r}}_{ij}^x$. Therefore each force term
transforms as $\mathbf{a}_{ij}^y=R\mathbf{a}_{ij}^x$, and
$$
\ddot{\mathbf{y}}_i(t)=R\ddot{\mathbf{x}}_i(t)
=\sum_j\sum_{t_0\in\mathcal{C}_{ij}(t)}
\kappa\sigma_{ij}\frac{|q_iq_j|}{r_{ij}^2\,|J_{ij}(t;t_0)|}\,\hat{\mathbf{r}}_{ij}^y.
$$
Thus $\mathbf{y}$ solves the same equations. $\square$

**Implication:** In an action-derived regularization, these symmetries correspond to exact history-space integrals of motion. Because the interaction is non-local in time, those integrals must account for momentum and energy carried by causal wake surfaces rather than only by the instantaneous mechanical coordinates.

---

### Conservation of Generalized Momentum

In a delay system, Newton's Third Law ($\mathbf{F}_{12}(t) = -\mathbf{F}_{21}(t)$) fails instantaneously because $\mathbf{F}_{12}(t)$ originates from architrino 2 at $t-\tau_1$, while $\mathbf{F}_{21}(t)$ originates from architrino 1 at $t-\tau_2$.

#### Definition 2 (Mechanical Momentum)
The instantaneous mechanical momentum is:
$$
\mathbf{P}_{\text{mech}}(t) = \sum_{i} \mu_{\text{arch}} \mathbf{v}_i(t).
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
\mathbf{P}_{\text{wake}} \approx \sum_{i \neq j} \int_{t - \tau_{ij}(t)}^{t} \mathbf{F}_{ij}^{\text{emit}}(s) \, ds.
$$
*Physical interpretation:* The "missing" momentum is accounted for by the causal wake surfaces currently traversing the space between sources and receivers in an action-derived model; otherwise this balance is the momentum diagnostic to verify.

**Corollary (Center of Mass Motion):**
For an isolated binary, the center of mass $\mathbf{x}_{\text{cm}}$ need not move at constant velocity in the mechanical coordinates alone. Instead, it can oscillate around a mean trajectory while wake momentum carries the compensating history term. A runaway center-of-mass self-acceleration is forbidden only in an action-derived model whose regularization preserves translation symmetry; in working regularized models this is a conservation diagnostic to be checked.

---

### Energy and The Lyapunov Functional

Energy conservation is the critical constraint preventing runaway solutions (MCB-09).

#### Definition 3 (The History Hamiltonian)
For an action-derived delayed model with time-translation symmetry, the target conserved quantity $\mathcal{H}$ is a history functional. For state-dependent delays, the useful comparison object is a **Lyapunov-Krasovskii-style functional**:
$$
\mathcal{H}(\mathbf{x}_t) = K(\mathbf{v}(t)) + \mathcal{U}_{\text{history}}(\mathbf{x}_t).
$$

1. **Kinetic Energy:** $K(t) = \sum \frac{1}{2} \mu_{\text{arch}} \|\mathbf{v}_i(t)\|^2$.
2. **Potential Functional:** $\mathcal{U}_{\text{history}}$ accumulates the work done by the conservative forces. Unlike an instantaneous potential $V(r)$, this depends on the configuration of all active wake surfaces.

#### Theorem 3 (Energy Balance Equation)
$$
\frac{dK}{dt} = \sum_{i} \mathbf{v}_i(t) \cdot \mathbf{F}_i(t).
$$
We define the **Interaction Potential Functional** $\mathcal{W}(t)$ such that:
$$
\mathcal{W}(t) = -\int_{t_0}^t \sum_i \mathbf{v}_i(s) \cdot \mathbf{F}_i(s) \, ds.
$$
This functional is nonlocal in time: it accumulates deferred work along the path-history of wakes and is not an instantaneous potential $U(r)$.
Then, by construction along the realized trajectory, $\mathcal{E}_{\text{tot}} = K(t) + \mathcal{W}(t)$ is constant. It is an exact Noether charge only when $\mathcal{W}$ is the boundary term of the same symmetry-preserving delayed action; otherwise it is a diagnostic reconstruction.

#### Lemma 1 (Boundedness of the Potential)
**Assumption:** The interaction is regularized with width $\eta > 0$ such that the maximum force is bounded: $\|\mathbf{F}_{ij}\| \le F_{\max}(\eta)$.
**Statement:** For a bound system (architrinos confined to a finite volume $V$), the rate of work is bounded by $N F_{\max} v_{\max}$.

#### Theorem 4 (No-Runaway Criterion)
In an action-derived master-equation branch with fixed $\eta>0$, an isolated binary cannot undergo runaway acceleration ($\|\mathbf{v}\| \to \infty$) *unless* the action-compatible potential energy functional $\mathcal{W}(t)$ diverges to $-\infty$.

*Proof Logic:*
Since $\mathcal{E}_{\text{tot}}$ is constant:
$$
K(t) = \mathcal{E}_{\text{tot}} - \mathcal{W}(t).
$$
For $K(t)$ to diverge, $\mathcal{W}(t)$ must decrease without bound.
1. **Partner attraction:** $q_1 q_2 < 0$. The potential is negative (attractive). As $r \to 0$, $V \to -\infty$. Collapse leads to infinite kinetic energy in the standard Kepler singularity pattern; in this architecture, self-hit is the proposed counter-channel.
2. **Self-hit repulsion:** $q_1 q_1 > 0$. The force is **repulsive**. The potential contribution is **positive**.
  *  Work done by self-hit: If an architrino is pushed "from behind" by its own wake, it gains $K$.
  *  However, this energy must come from the $\mathcal{W}$ term.
  *  Since self-hit potential is repulsive (positive energy hill), converting it to kinetic energy lowers the total potential.
  *  **Crucial bound:** The deferred work encoded in a self-wake is finite when the emitted causal-wake budget is finite. An architrino cannot extract infinite energy from its own past unless the history functional has already assigned an infinite budget to that causal wake.

**Conclusion:** A self-acceleration runaway, where an architrino accelerates itself indefinitely using self-forces, is forbidden by the conservation of $\mathcal{H}$ in the symmetry-preserving action model. In other working models, the same statement is a validation target: the system can oscillate or settle, but an apparent explosion to $\|\mathbf{v}\|=\infty$ must be traced either to singular collapse, transversality loss, or a broken conservation diagnostic.

---
