# Assembly Dynamics Visualization With EOM True

Promotion status: `priority-only`.

Claim level: explanatory visualization scaffold. This packet assumes the master equation of motion is true for the purpose of visualizing assembly dynamics. It does not retain a branch, close a certificate, prove stability, or authorize migration into `content/markdown/aaa`.

Related anchors: [Nested Shell Braid Model Card](nested-shell-braid-model-card.md), [Nested Shell Braid Reduction Row](nested-shell-braid-reduction-row.md), [Nested Shell Braid Dynamics](../../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md#nested-shell-braid-dynamics), and [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md).

---

## 1. Explicit Assumption

Assume `EOM=true`:

- Every architrino has a definite path in Euclidean space and absolute substrate time.
- Each architrino emits causal wakes at the primitive speed $c_f$.
- Acceleration at a receiver event comes from delayed causal-wake intersections selected by the master equation.
- The receiver responds to source positions in the causal path history, not to equal-time source positions alone.

This is the only assumption being added here. No proof status is promoted by this visualization packet.

## 2. Plain-Language Picture

An assembly is not a tiny solid ball. It is a repeating delayed-feedback dance among architrinos.

Each architrino is like a moving dot that leaves expanding wake shells behind it. Later, another architrino, or sometimes the same architrino, crosses one of those old wake shells and receives a push or pull. The assembly is stable only if those delayed pushes keep returning the dots to a repeating pattern.

In electrical-engineering language, the assembly behaves like a coupled delay oscillator:

- the architrinos are the active nodes;
- the causal wakes are the delayed feedback paths;
- the active roots are the loop-delay events;
- the shell phases are oscillator phases;
- the nested shell braid is a multi-loop delayed-feedback system whose loops must return coherently.

## 3. Current Geometry

The reader-facing nested shell braid case uses six architrinos organized, when the exact-binary assumption is active, into three ordered shell binaries:

| Shell | Visualization role under `EOM=true` | Typical weak-stress behavior |
| --- | --- | --- |
| Inner | Fast history-supported engine | Smallest radius, highest cadence, self-hit-prone |
| Middle | Hinge and transfer layer | Near the $c_f$ separator scale, sensitive to branch changes |
| Outer | Boundary and Noether sea interface | Largest radius, lowest cadence, strongest envelope projection |

The binary language is a visualization convenience only when a binary partition has been declared. The broader neutral braid model still starts from six labeled architrinos with three positive-polarity and three negative-polarity sites.

## 4. Motion Modes

### Rotation

Delayed hits do not generally point along the equal-time separation vector. The force line points toward a source's causal-history position. That creates a tangential component, so the dots naturally rotate, phase slip, or spiral rather than behaving like a simple central-force orbit.

In the visualization, each shell binary is a rotating delay loop. The rotation is not merely a bead moving around a hoop; it is the visible trace of many delayed causal-hit rows arriving at the right phase.

### Breathing

Breathing is periodic radial change in one or more shell supports. Under `EOM=true`, breathing occurs when inward partner hits, same-source response, inter-layer wake exchange, and ambient Noether sea driving do not balance instant by instant but still return over a cycle.

Visual signature:

```text
large radius -> delayed inward pull dominates -> radius contracts
small radius -> self/inter-layer response grows -> radius expands
cycle closes -> the support returns to its prior band
```

This should be read as a motion description, not as a closed stability claim.

### Folding

Folding is the visual name for delay-map folding. One receiver event may be reached by multiple past emission times from a source path. When that happens, one architrino is effectively hit by several past positions of the same source.

Visual signature:

```text
one source path
  -> several old wake shells
  -> one receiver event
  -> multiple causal-history hits at the same instant
```

Near a fold, wake arrivals can bunch together and produce a strong impulse-like response in the regularized picture. This packet does not try to classify or certify those folds.

### Phase Motion

Each shell has a phase, but the useful phase is not just an angle on a drawn circle. It is the phase of the whole causal-return pattern: position, speed, active wake rows, and inter-layer timing.

An idealized nested shell braid visualization can use phases

$$
\theta_I(t),\qquad \theta_M(t),\qquad \theta_O(t)
$$

with a return condition of the form

$$
\theta_I(T)-\theta_I(0)=2\pi k_I,\qquad
\theta_M(T)-\theta_M(0)=2\pi k_M,\qquad
\theta_O(T)-\theta_O(0)=2\pi k_O.
$$

The integers are visualization labels for a repeat cycle unless the corresponding root ledger and branch rows are actually closed elsewhere.

### Nested Shell Behavior

The nested shell braid behaves like three coupled delay loops, not like three independent orbits.

- The inner shell supplies fast causal-history activity.
- The middle shell transfers timing stress between inner and outer layers.
- The outer shell projects the leading exclusion envelope and couples most directly to the surrounding Noether sea.

When the assembly translates through the Euclidean void, the internal loops must retune. A wake sent between constituents must reach a receiver that has moved during the propagation delay. The rest-state picture therefore becomes a braided spiral-helical motion picture: pitch, tilt, radius, and timing change together.

## 5. Concrete Visualization Model

Use a three-ring delayed-feedback mobile:

```text
          outer shell: slow boundary / Noether sea interface
        O+ --------------------------------------------- O-

               middle shell: near c_f hinge / transfer layer
             M+ ------------------------------- M-

                    inner shell: fast self-hit engine
                  I+ ------------------- I-
```

Each `+/-` pair is a polarity-balanced binary in the exact-binary visualization. Each endpoint moves, emits causal wakes, and receives delayed hits from partner, inter-layer, and possible same-source history.

Animate it with four simultaneous motions:

1. The three pairs rotate at different cadences.
2. The radii breathe slightly instead of staying rigid.
3. The shell planes precess or tilt under inter-layer and external wake stress.
4. The whole assembly, if translating, stretches into a braided spiral-helical cable.

The most useful mental image is a gyroscope mobile made of wake trails rather than rods. The rods are not physical material. They stand for delayed causal communication paths that must keep landing at the right phase.

## 6. Scope Guardrails

This packet may be used for:

- explaining how architrinos move inside an assumed-EOM assembly;
- designing diagrams, animations, or simple motion descriptions;
- keeping rotation, breathing, folding, phase motion, and nested shell behavior in one consistent picture;
- helping decide what later branch rows should measure.

This packet may not be used as:

- a retained-branch certificate;
- a proof of nested shell braid stability;
- a proof of exact binary nesting;
- a proof of mass, photon, spin, Lorentz, or observer-geometry recovery;
- a replacement for active-root, Jacobian-floor, finite-memory, action, event, or stability rows.

## 7. Likely Reader-Facing Destination

If this scaffold becomes stable enough for corpus prose, the most natural destination is a short explanatory subsection near the spiral-helical motion picture in [Nested Shell Braid Dynamics](../../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md#nested-shell-braid-dynamics).

Before promotion, it should be rewritten as reader-facing explanation and stripped of priority-side workflow language.
