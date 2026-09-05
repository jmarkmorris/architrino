# Deferred Roots Teaching Requirements And Design

## Status And Authority

This document preserves a proposed advanced lesson inside Causal Delay Feedback. The lesson remains `dormant-deferred`: no implementation is scheduled, no queue row is executable, and this design does not authorize a separate evaluator, runtime, product route, or EOM solver path.

The proposal is a teaching design, not scientific evidence. Its synchronized views would render consequences of the closed forms already presented in [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse); agreement among those views would show that the app applies one shared model consistently, but it would not independently prove the Master EOM, certify a physical branch, or establish stability.

## The Fold Before The Symbols

Picture a receiver at one event and a moving transmitter that has emitted expanding causal-wake surfaces throughout its earlier path. A causal root is a past emission event whose wake reaches the receiver at the selected receiver time. As the transmitter's velocity component toward the receiver crosses $c_f$, two such emission events can appear or disappear together. The same ordinary fold then has four linked descriptions: the delay-map function $g$ gains or loses a pair of zero-crossings, the emitted wake surfaces compress on the approach side, the active-root count changes by $\pm2$, and the pointwise acceleration grows sharply while its accumulated velocity change remains finite.

The proposed lesson shows these four descriptions in one synchronized 2x2 grid. The learner sees one fold as an algebraic event, a geometric construction, a counting transition, and a bounded kinematic consequence rather than as four unrelated plots.

The main difficulty is explanatory rather than computational. Four coupled representations must remain legible without implying that a schematic display independently establishes the dynamics. The current app already supplies the canonical causal-root evaluator and a live Roots mode within `causal-delay-feedback.html`; this packet neither replaces that implementation nor reopens it.

**Notation.** Receiver time is $T_r$, and transmitter emission time is $T_t$. These symbols correspond to the bare $T$ and $T_{\mathrm{em}}$ used in `master-equation.md`, but the role subscripts let every pane name the receiver and emission events directly. The fold occurs at the paired instants $T_{r,\ast}$ and $T_{t,\ast}$ in those two time coordinates. Dropping the `r` and `t` subscripts recovers the notation used in `master-equation.md`.

## Requirements Before Reopening

1. All four panes must consume one time cursor and one transmitter-kinematics state. Moving any shared control redraws every pane from that same state rather than updating one representation in isolation.
2. Every pane must identify the same fold event, defined here by the transmitter-side diagnostic $D_{t,ij}=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_j$ crossing zero. At that receiver-time instant, Pane A shows a zero-crossing pair appearing or disappearing, Pane B shows the wake-compression crest, Pane C shows the corresponding count step, and Pane D shows the pointwise spike together with its bounded accumulation.
3. The scene must support a sub-$c_f$ transmitter with $\beta=v/c_f<1$, which has one root throughout and no fold, and a super-$c_f$ transmitter with $\beta>1$, which makes the fold pair visible. Showing both cases under the same controls supplies the qualitative comparison.
4. No pane may imply an infinite physical kick. Pane D must show the time-integrated $\Delta\mathbf V$ remaining finite through the transit, as required by the finite-impulse lemma.
5. Root count, the $D_t$ value, and $\beta$ must appear as plain numerical readouts as well as curves. The readouts make the displayed relationships checkable rather than purely impressionistic.
6. Every label, tooltip, and caption must obey the Theory-Layer Constraints below.

These are reopening conditions, not evidence that the deferred lesson has already met them.

## Four Synchronized Views

Each pane presents a different representation of the same transmitter history and receiver event. Their values must come from the shared state described above.

| Pane | Content | Governing object |
| --- | --- | --- |
| A. Delay-map roots | Plot $g(T_r;T_t)$ against $T_t$ at the current receiver time $T_r$, with every zero-crossing marked as an active causal root. | The `master-equation.md` fold normal form $g\approx\alpha(T_t-T_{t,\ast})^2+\lambda(T_r-T_{r,\ast})$ |
| B. Wake scene | Draw the transmitter worldline, its expanding causal-wake circles in two dimensions, and the receiver as a fixed point. The spacing between wakes compresses ahead of the transmitter and opens behind it. | Causal wake surfaces and the `master-equation.md` “Master EOM” |
| C. Root-count ledger | Plot the active root count $N(T_r)$ over receiver time and mark each $\pm2$ transition at a fold. | The ordinary-fold law $\Delta N=\pm2$ with $\Delta D=0$ on the `master-equation.md` $\Sigma^1$ stratum |
| D. Impulse pane | Overlay the schematic near-fold per-hit acceleration magnitude, with divergence $\propto(T_{r,\ast}-T_r)^{-1/2}$, and the cumulative integrated $\Delta\mathbf V$. | The finite-impulse bound $\int\|\mathbf A_{ij,+}+\mathbf A_{ij,-}\|\,dT_r\le4C\sqrt\varepsilon$ |

Pane A and Pane C express one count in two forms. At any selected $T_r$, the number of zero-crossings visible in Pane A must equal $N(T_r)$ in Pane C at that same $T_r$. This equality is the lesson's main internal correctness check, not an optional visual correspondence. It checks consistency among displays that share one model; it does not provide an independent derivation of the fold law.

## Shared Controls

### Primary Controls

- **Velocity slider ($\beta=v/c_f$).** This slider drives the transmitter at constant speed along the straight-line pass. Its approximate range is $0$ to $3$, with the threshold $\beta=1$ visibly marked. It is the first control the learner is expected to use, and moving it redraws all four panes.
- **Time cursor and scrub bar.** Play, pause, reset, and slow/fast rate controls must match the transport controls already used in the Photon app. Panes A and B show the instantaneous state at $T_r$, whereas Panes C and D show histories with a moving read-time marker; the shared cursor keeps those views synchronized.

### Secondary Controls

- **Impact-parameter slider ($b$).** The impact parameter is the transmitter's perpendicular offset from the receiver during the straight-line pass. Within this constant-speed, unbounded-line model, it changes when the fold occurs and how strongly Pane B compresses near closest approach, but it does not decide whether a fold exists; that condition is governed by $\beta$ alone. The reason is that $\hat{\mathbf r}_{ij}\cdot\mathbf V_j\to v$ as the transmitter position approaches $\pm\infty$ along its line, so any $\beta>1$ guarantees a fold region regardless of $b$.
- **Transmitter-path toggle: straight-line pass or circular orbit.** The straight-line pass is the V1 default because it gives the simplest fold demonstration. The circular-orbit mode is a stretch goal tied to the principal-partner root certificate in [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md#principal-partner-root-certificate) and may follow V1.
- **Snap-to-fold step control.** This control moves directly to the next or previous root-count transition. The fold window may be brief relative to the complete pass and otherwise easy to skip while scrubbing.
- **Pane-overlay toggles.** These controls show or hide the $D_t$ floor trace in Pane A and the cumulative-$\Delta V$ overlay in Pane D. A learner can begin with the simpler views and expose the diagnostics when needed.

A compact numerical strip, rather than a fifth pane, reports the current $\beta$, current $D_t$, current active root count $N$, and time to the next fold.

## Theory-Layer Constraints

- Architrinos carry no mass. Describe the transmitter and receiver through position, velocity, and causal-root count, and use acceleration rather than force, as required by `AGENTS.md`.
- Do not import a standard-physics shock front or Mach cone as the mechanism. Pane B may mention that visual comparison only in a clearly labeled, dismissible caption. The core explanation remains the delay-map fold derived within $\mathbb{A}\mathbb{A}\mathbb{A}$.
- A transmitter with speed above $c_f$ is not forbidden at the architrino layer. The substrate law imposes no a priori speed cap on an individual architrino, while an emergent Lorentz-like speed limit remains a later observer-level recovery target. Captions must therefore avoid presenting $\beta>1$ as intrinsically exotic or prohibited.
- Use `transmitter`, `receiver`, and `causal root` consistently in UI labels and captions. Preserve established `source`-prefixed machine identifiers where they are existing interfaces, but do not use “source” or “signal” as an alternate causal-role label in new prose.

## Implementation Boundaries If The Lane Reopens

- Implement Roots only as a Causal Delay Feedback mode. Retain `causal-delay-feedback.html?mode=roots` as the direct link; do not create a separate `roots.html` product.
- Keep the mode behind focused Causal Delay Feedback modules for shared kinematics, Pane A, Pane B, Pane C, Pane D, and the shared control strip.
- Reuse the app's canonical source and receiver state, retained history, causal-root evaluator, and wake renderer.
- Do not add new behavior to root `app.js`.
- Do not introduce a production solver path or a new EOM integrator. The lesson needs only the closed-form quantities already derived in `master-equation.md`: the local normal-form $g$, $D_t$, the schematic magnitude $(T_{r,\ast}-T_r)^{-1/2}$, and its bounded integral.

These restrictions preserve one implementation and one evidence boundary. A future build may visualize the declared closed forms, but it may not turn display agreement into solver or scientific authority.

## Open Design Questions

- Should Pane B remain two-dimensional, using circles, for V1, or move directly to a three-dimensional wake-surface scene comparable to the `app-photon`/`app-borg` renderers?
- Should the circular-orbit transmitter mode ship in V1, or remain deferred as described above?
- Should the numerical strip expose both $W_{r\leftarrow t}^{\mathrm{acc}}=c_f/|D_t|$ and the signed root-playback derivative $D_r/D_t$, or remain limited to $\beta$, $D_t$, $N$, and time to the fold for V1 simplicity?

All three decisions remain deferred, and no implementation is scheduled.

The transmitter-side factor is written consistently as `D_t`, following the current Master Equation authority. The sibling Roots plan still contains the earlier `D_s` form and must be reconciled separately before a future implementation pass consumes both documents.
