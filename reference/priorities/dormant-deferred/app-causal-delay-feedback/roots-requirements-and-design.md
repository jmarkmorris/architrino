# Deferred Roots Teaching Requirements And Design

## Purpose

This deferred packet explores a linked-view lesson inside Causal Delay Feedback for the causal-root fold described in [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse): as a source's velocity component toward a receiver crosses $c_f$, the delay-map function $g$ develops a new pair of zero-crossings (causal roots), the wake surfaces emitted by the source visibly compress on the approach side, the active-root count steps by $\pm2$, and the per-hit acceleration spikes but integrates to a finite velocity change. The proposed design renders all four as one synchronized 2x2 grid driven by a small shared control set, so a reader can watch one fold appear simultaneously as an algebraic fact, a geometric picture, a counting ledger, and a bounded kinematic consequence.

The challenge is not missing computation. It is teaching four coupled representations without overwhelming the learner or implying that a schematic view independently proves the Master EOM behavior. The current app already has a canonical causal-root evaluator and internal Roots view; this packet does not authorize another evaluator, route, runtime, or implementation pass.

**Notation.** This packet writes receiver time as $T_r$ and transmit (emission) time as $T_t$, rather than `master-equation.md`'s bare $T$ and $T_{\mathrm{em}}$, so every pane and control can name "receiver" and "transmit" explicitly. Fold instants carry the same subscript pattern: $T_{r,\ast}$ is the receiver-time instant of the fold, $T_{t,\ast}$ the paired transmit-time instant. Drop the `r`/`t` subscripts to recover the `master-equation.md` symbols.

## Requirements Before Reopening

1. All four panes share one time cursor and one source-kinematics state; moving any shared control redraws all four panes together, not just one.
2. The fold event (where $D_{s,ij}=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_j$ crosses zero) must be visually identifiable in every pane at the same instant: a zero-crossing pair-creation in Pane A, a compression crest in Pane B, a step in Pane C, and the divergent-then-bounded spike in Pane D.
3. The scene must support both a sub-$c_f$ source ($\beta=v/c_f<1$, single root throughout, no fold) and a super-$c_f$ source ($\beta>1$, fold pair visible), so the qualitative before/after is directly comparable.
4. No pane may imply an infinite physical kick. Pane D must show the time-integrated $\Delta\mathbf V$ staying finite through the transit, per the finite-impulse lemma.
5. Root count, $D_s$ value, and $\beta$ must also appear as plain numeric readouts, not only as curves, so the panes are checkable rather than purely impressionistic.
6. Follows Theory-Layer Constraints below in all labels, tooltips, and captions.

## 2x2 Pane Layout

| Pane | Content | Governing object |
| --- | --- | --- |
| A. Delay-map roots | $g(T_r;T_t)$ plotted against $T_t$ at the current receiver time $T_r$; zero-crossings marked as active causal roots. | `master-equation.md` fold normal form $g\approx\alpha(T_t-T_{t,\ast})^2+\lambda(T_r-T_{r,\ast})$ |
| B. Wake scene | Source worldline and the expanding causal-wake circles (2D) it has emitted, receiver marked as a fixed point; wake spacing visibly compresses ahead of the source and opens up behind it. | Causal wake surfaces, `master-equation.md` "Master EOM" |
| C. Root-count ledger | Step plot of active root count $N(T_r)$ over receiver time, with $\pm2$ transitions marked at each fold. | Fold law $\Delta N=\pm2$, $\Delta D=0$ (`master-equation.md`, $\Sigma^1$ stratum) |
| D. Impulse pane | Per-hit acceleration magnitude near the fold (schematic $\propto(T_{r,\ast}-T_r)^{-1/2}$ divergence) overlaid with the cumulative integrated $\Delta\mathbf V$, showing the integral stays bounded. | Finite-impulse lemma, $\int\|\mathbf A_{ij,+}+\mathbf A_{ij,-}\|\,dT_r\le4C\sqrt\varepsilon$ |

Pane A and Pane C should read as one statement in two forms: the number of zero-crossings visible in A at time $T_r$ must equal $N(T_r)$ read off C at that same $T_r$. This cross-check is the app's main pedagogical payload and should be treated as a correctness requirement, not a nice-to-have.

## Controls

Primary:

- **Velocity slider ($\beta=v/c_f$).** Drives the source's constant speed along its straight-line pass. Range roughly $0$ to $3$, with a visibly marked threshold at $\beta=1$. This is the single control the user is expected to reach for first; all four panes redraw live as it moves.
- **Time cursor / scrub bar**, with play, pause, reset, and slow/fast rate, consistent with the transport controls already used in the Photon app. Needed because Panes A and B are instantaneous-$T_r$ views while Panes C and D are history views with a moving read-time marker.

Secondary:

- **Impact parameter slider ($b$)**, the source's perpendicular offset from the receiver on its straight-line pass. Does not change whether a fold exists (that is governed by $\beta$ alone, since $\hat{\mathbf r}_{ij}\cdot\mathbf V_j\to v$ as the source position on its line goes to $\pm\infty$, so any $\beta>1$ guarantees a fold region regardless of $b$), but changes when the fold occurs and how compressed Pane B's wake spacing gets at closest approach.
- **Source path toggle: straight-line pass vs. circular orbit.** V1 default is the straight-line pass (simplest fold demonstration). A circular-orbit mode is a stretch goal tied to the principal-partner root certificate in [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md#principal-partner-root-certificate) and may ship after V1.
- **Snap-to-fold step control.** Jumps the time cursor directly to the next or previous root-count transition, since the fold window can be brief relative to the full pass and is easy to scrub past.
- **Pane overlay toggles.** Show/hide the $D_s$ floor trace on Pane A, and show/hide the cumulative-$\Delta V$ overlay on Pane D, so a first-time viewer can start simpler and add detail.

Numeric readout strip (not a fifth pane, a compact status row): current $\beta$, current $D_s$, current active root count $N$, and time-to-next-fold.

## Theory-Layer Constraints

- Architrinos carry no mass; describe the source and receiver kinematically (position, velocity, causal-root count) and speak of **acceleration**, never force, per `AGENTS.md` theory-layer discipline.
- Do not introduce a standard-physics shock-front or Mach-cone picture as a premise. The wake-compression half-angle in Pane B may be compared to that picture only in a clearly labeled, dismissible caption, never as the core explanation; the core explanation is the delay-map fold derived inside $\mathbb{A}\mathbb{A}\mathbb{A}$.
- A super-$c_f$ individual source speed is not a violation of anything at this layer: the substrate law places no a priori speed cap on an architrino, and any emergent Lorentz-like speed limit is a recovery target for later observer-level chapters, not an axiom available here. Captions should not read as though $\beta>1$ is exotic or forbidden.
- Use `source` / `receiver` / `causal root` as the canonical terms; avoid ad hoc substitutes such as "transmitter" or "signal" in UI labels, captions, or code identifiers.

## Implementation Boundaries (for when this is scoped for a build)

- Implement Roots as a Causal Delay Feedback mode; do not create a separate `roots.html` product by default.
- Put mode logic behind focused Causal Delay Feedback modules for the shared kinematics state, Pane A (delay-map), Pane B (wake scene), Pane C (root ledger), Pane D (impulse), and the shared control strip.
- Reuse the app's canonical source, receiver, retained-history state, causal-root evaluator, and wake renderer.
- Do not add new behavior to root `app.js`.
- Do not introduce a production solver path or new EOM integrator for this app; the fold quantities needed here (the local normal-form $g$, $D_s$, the $(T_{r,\ast}-T_r)^{-1/2}$ schematic magnitude, and the bounded integral) can be computed directly from the closed forms already derived in `master-equation.md` without dispatching the EOM solver.

## Open Design Questions (discussion-scoped)

- Whether Pane B should stay 2D (circles) for V1 or go straight to a 3D wake-surface scene comparable to `app-photon`/`app-borg` rendering.
- Whether the circular-orbit transmitter mode ships in V1 or is deferred as noted above.
- Whether the numeric readout strip should expose both $W_{r\leftarrow t}^{\mathrm{acc}}=c_f/|D_t|$ and signed root playback $D_r/D_t$, or stay limited to $\beta$, $D_t$, $N$, and time-to-fold for V1 simplicity.

Status of all three: deferred. No new implementation is scheduled.
