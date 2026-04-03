# Dyadic Resonance Lock Archive

The live mathematical backbone of this topic now lives in [dyadic-resonance-lock.md](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md). This priorities note is retained only as archive scratch material and intuition capture that has not yet been promoted into the dynamics document.

## Preserved Intuitions from Reviewer Audit

The strongest phenomenology from the earlier draft has now been promoted into the live dynamics, particle, spacetime, and cosmology notes. What remains here is the material that still does not have a fully stable home or still needs sharper constitutive closure before promotion.

### Phenomenological Scaling and Homology

- **Confining-scaling intuition:** preserve the heuristic that self-hit-dominant or confining regimes can exhibit a different radius-frequency law than Coulomb-like partner-only regimes. Any explicit $r \propto f^{-1/2}$ relation should be treated as a toy scaling law, not as a proved consequence of the master equation.
- **Micro-macro homology:** preserve the philosophy-level mapping that the inner, middle, and outer binary roles may mirror singularity-like interior, horizon-like interface, and exterior-field behavior in black holes. This remains an ontology map, not yet a derived equivalence.

### Theory Guardrail

The most important negative result to preserve is this:

- **Jacobian-weighted action failure:** one cannot infer action or energy doubling directly from delay-map covering degree because the $1/|J|$ weighting destroys uniform-sheet counting. Spatial double covering and temporal frequency doubling are therefore not interchangeable, and any future action theorem must come after the reduced stability analysis rather than before it.

## Heuristic Archive

The remaining sections are preserved as conjectural geometry, scaling, and cosmology notes. They are not the current derivation path unless they are later rederived from the regularized reduced dynamics or from a justified invariant principle.

### Kinematic Constraints on the Horizon

Let us formalize the state at the event horizon (the "CFT space" or alignment limit). We assume the assembly is planar (collapsed $z$-axis) and rotational symmetry applies.

Define the cycle frequencies $f_k$ (Hz) and tangential velocities $v_k = 2\pi f_k r_k$ for $k \in \{\text{Outer, Middle, Inner}\}$. We will also write
$$
v_k = \beta(f_k)\,c_f,
$$
so a single $\beta(\cdot)$ function is evaluated at each binary's own frequency. By definition, $\beta(f)=1$ exactly when $v=c_f$.

**The Constraints:**
1.  **Frequency Doubling (fixed ratios):** $f_M = 2f_O$ and $f_I = 2f_M = 4f_O$ are imposed here as a working closure ansatz across the full tri-binary range. This is not yet derived from the full delayed dynamics.
2.  **Field Speed Lock (middle branch):** $v_M = c_f$ is invariant for the full range $f_O \in [1\,\text{Hz}, f_P]$ (so $\beta(2f)=1$). The middle radius therefore follows $r_M = c_f/(2\pi f_M)$. The outer velocity varies with $f_O$ and reaches $c_f$ only at $f_O = f_P$, i.e., $\beta(f_P)=1$.
3.  **Universal MCB Cap:** There is only one maximum-curvature binary (MCB) state, shared by all binaries as a hard cap. No binary can exceed the MCB curvature (or go beyond its defining radius/speed).

**Derivation of Radii Scaling (middle branch):**
From $v = 2\pi f r$, if velocity is constant ($c_f$) and frequency doubles, the radius must halve. This applies to the **middle** branch because $v_M=c_f$ across the full range.
$$
\begin{aligned}
r_O &= \frac{\beta(f_O)c_f}{2\pi f_O} \\
r_M &= \frac{c_f}{2\pi f_M} = \frac{c_f}{4\pi f_O} = \frac{1}{2\beta(f_O)}\, r_O
\end{aligned}
$$
Thus, the middle radius is fixed by the lock, while the outer radius carries the $\beta(f_O)$ factor. The ratio is $r_M/r_O = 1/(2\beta(f_O))$, which reduces to the $1:1/2$ geometric progression only at the horizon where $\beta(f_P)=1$.

**The Inner Binary Anomaly:**
Take the horizon state as the reference: the Middle rides $c_f$ (our hinge), the Outer reaches $c_f$ only at $f_O=f_P$, while the Inner is already in the self-hit regime at the low-frequency floor with $v_I = \beta(f_I) c_f$, $\beta>1$. As $f_O$ increases, $\beta(f_I)$ grows within the self-hit region and is capped at the universal MCB value $\beta_{\text{MCB}}>1$. With the 1:2:4 lock,
$$
r_I = \frac{v_I}{2\pi f_I} = \frac{\beta(f_I) c_f}{8\pi f_O} = \frac{\beta(f_I)}{4\beta(f_O)}\, r_O,
$$
so the Inner sits at the geometric $r_O/4$ only if $\beta(f_I)=\beta(f_O)$; in general the self-hit condition ($\beta>1$) inflates it relative to $r_O/4$. The MCB is a single, universal limit state: binaries may sit below it, but no binary can surpass it. The offset $\beta-1$ remains the candidate for core binding energy.

### The Planck Scale Definition

We posit that the Outer binary at field speed defines the Planck scale. Let us map this to the standard variables. The system does **not** reach the Planck scale until $f_O = f_P$; below that, the 1:2:4 lock still holds but the radii are larger.

If we adopt the Outer circumference as the Planck length $\ell_P$ (interpretive ansatz, not a tunable choice):
$$
2\pi r_O = \ell_P \implies r_O = \frac{\ell_P}{2\pi}
$$
Then the frequencies at that identification point are:
$$
f_O = \frac{c_f}{2\pi r_O} = \frac{c_f}{\ell_P} = f_P \quad (\text{Planck frequency})
$$
The assembly hierarchy becomes:
1.  **Outer:** $r = \ell_P / 2\pi$, $f = f_P$. (The event horizon "surface").
2.  **Middle:** $r = \ell_P / 4\pi$, $f = 2f_P$. (The sub-Planckian interface).
3.  **Inner:** $r \approx \ell_P / 8\pi$, $f = 4f_P$. (The trans-Planckian core).

**Mathematical Implication:**
Standard physics treats $\ell_P$ as a minimum length. Here, the Outer binary is used as that limit in this ansatz. The Middle and Inner binaries effectively exist "inside" the spacetime pixel defined by the Outer binary. This is consistent with your intuition of the "CFT space" or holographic bounds: external observers may couple primarily to the Outer binary (the horizon), while the high-frequency internal state (Middle/Inner) may encode much of the mass/energy content (the AdS bulk) via self-hit dynamics.

### Next Steps for Derivation

The live analytical path is now:

1.  Write the regularized two-layer map first, keeping both phase and amplitude/speed variables.
2.  Identify a candidate Lyapunov-Krasovskii or cycle-averaged causal-work functional for that map.
3.  Test whether the Jacobian wall near $v=c_f$ makes the dyadic fixed point locally attracting as $\beta \to 1$.
4.  Only then lift the argument to the full tri-binary chain and ask whether the stable extension is $1{:}2{:}4$.

This 1:2:4 lock remains a plausible working candidate for a Planck-scale assembly configuration, but the current live support is kinematic plus reduced-map conjecture, not a completed selection theorem.

The next subsection records a caution: an earlier attempt to replace the action-partition postulate with a topological derivation from delay-map degree is not currently rigorous enough to support the lock claim.

---

**Caution on Topological Action Arguments**

An earlier version of this note tried to derive the action partition directly from delay-map degree by treating the inner branch as a double-wrapped domain and then reading off
$$
\Delta L_I = 2\,\Delta L_O.
$$
That argument is not currently rigorous enough to carry the load.

The analytic obstruction is simple: even if the delay domain has topological degree $2$, the action density is not uniform across the sheets. Near the null separatrix the kernel contains the highly non-uniform Jacobian weight
$$
\frac{1}{|J|},
$$
so one cannot factor the covering degree out of the action integral unless much stronger invariance assumptions are proved.

Likewise, a spatial double-covering of the delay locus does not by itself imply temporal frequency doubling. At present, the bridge
$$
N_I=2 \;\Longrightarrow\; f_I=2f_M
$$
should be treated only as a heuristic mnemonic, not as a theorem.

The practical consequence is:

- delay-map topology may still constrain the **admissible resonance classes**,
- but the actual weighting of action or stability must be computed from the regularized reduced dynamics,
- and any future action-partition theorem must come after, not before, the phase-amplitude stability analysis.

---

The strongest particle, strong-force, vacuum-pairing, black-hole-core, and toy-cosmology intuitions from this older draft have now been promoted into the live notes. What remains below is the still-unmoved material.

---

The next subsection frames the tri-binary Noether core assembly as a candidate universal nucleus, emphasizing a proposed micro-macro correspondence between particles and black holes.

---

**Geometric Analysis of the Universal Generator: The Fractal Identity**

Within this framework, the Noether Core is treated as a candidate **fundamental solution** (Green's-function-like generator) for physical structure.

In geometric analysis, when a single structural definition (the tri-binary) appears at the microscopic scale (particles), the macroscopic scale (black holes), and the background scale (the Noether sea), we call this **Conformal Invariance** or **Self-Similarity**.

The following mapping motivates the "universal nucleus" interpretation.

### The Micro-Macro Homology (The Black Hole Is an Atom)

Standard physics struggles to unify Quantum Mechanics (particles) and General Relativity (black holes) because it treats them as distinct geometric objects.
In the architrino architecture, they are proposed to be topologically homologous.

**The Isomorphism:**
Let $\mathcal{M}$ be the manifold of a Tri-Binary.
*   **The Particle (Fermion):** A tri-binary where the Inner Binary dominates energy dynamics (highest action-share branch in the self-hit regime), stabilized by self-hit.
*   **The Black Hole:** A macroscopic aggregate of tri-binaries where the collective density drives the *entire assembly* into the Inner Binary regime ($v > c_f$).

**The Map:**
1.  **Inner Binary ($v > c_f$):** Corresponds to the **Singularity/Interior**. (The region of trapped surfaces and self-interaction).
2.  **Middle Binary ($v = c_f$):** Corresponds to the **Event Horizon**. (The surface of causal isolation).
3.  **Outer Binary ($v < c_f$):** Corresponds to the **Gravitational Field**. (The region of standard causal connection).

In this proposal, matter can be modeled as tri-binary structures that share some features with micro-black-hole-like self-hit-stabilized states.

### The Completeness of the Architecture

Why might the tri-binary be treated as a "nucleus for everything"?
One proposed reason is that it spans the model's **Logic of Causality**.

Given a propagation speed $c_f$, this framework emphasizes three geometric relationships an object can have with a signal:
1.  **Slower ($v < c_f$):** You receive information. (Communication / Force / Structure).
2.  **Equal ($v = c_f$):** You ride the information. (Resonance / Horizon / Limit).
3.  **Faster ($v > c_f$):** You overrun information. (Self-Interaction / Memory / Mass).

The Tri-Binary is modeled here as an assembly that can **occupy all three causal domains simultaneously**.
*   It generates Mass (Inner).
*   It defines Limits (Middle).
*   It interacts (Outer).

A complex universe in this framework would likely require units that access all three capacities. A system restricted to only $v<c_f$ or only $v>c_f$ would be dynamically impoverished in this picture. The Tri-Binary is therefore proposed as a minimal engine of complexity.

---

The remaining table is kept only as raw kinematic scratch work for the 1:2:4 closure ansatz.

---

**Detail Table (1:2:4 lock across the full range; $v_k = \beta(f_k)c_f$ with $\beta(2f)=1$ for $f \in [1\,\text{Hz}, f_P]$ and $\beta(f_P)=1$):**

| $f_I$ | $f_M$ | $f_O$ | $r_I$ | $r_M$ | $r_O$ | $v_I$ | $v_M$ | $v_O$ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $4\ \text{Hz}$ | $2\ \text{Hz}$ | $1\ \text{Hz}$ | $\dfrac{\beta(4\,\text{Hz})\,c_f}{8\pi}$ | $\dfrac{c_f}{4\pi}$ | $\dfrac{\beta(1\,\text{Hz})\,c_f}{2\pi}$ | $\beta(4\,\text{Hz})\,c_f$ | $c_f$ | $\beta(1\,\text{Hz})\,c_f$ |
| $4f$ | $2f$ | $f$ | $\dfrac{\beta(4f)\,c_f}{8\pi f}$ | $\dfrac{c_f}{4\pi f}$ | $\dfrac{\beta(f)\,c_f}{2\pi f}$ | $\beta(4f)\,c_f$ | $c_f$ | $\beta(f)\,c_f$ |
| $4f_P$ | $2f_P$ | $f_P$ | $\dfrac{\beta(4f_P)\,c_f}{8\pi f_P}$ | $\dfrac{c_f}{4\pi f_P}$ | $\dfrac{c_f}{2\pi f_P} = \dfrac{\ell_P}{2\pi}$ | $\beta(4f_P)\,c_f$ | $c_f$ | $c_f$ |

## Related Priorities

- [dyadic-lock](../dyadic-lock/dyadic-lock.md)
- [strong-field-hypotheses](../strong-field-hypotheses/strong-field-hypotheses.md)
- [cosmology-closure](../cosmology-closure/cosmology-closure.md)

## Related AAA Notes

- [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md)
- [tri-binary-dynamics](../../../content/markdown/aaa/dynamics/tri-binary-dynamics.md)
- [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md)
- [cosmology-ontology](../../../content/markdown/aaa/cosmology/cosmology-ontology.md)
