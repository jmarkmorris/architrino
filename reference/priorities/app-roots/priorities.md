# Roots App

## Workstream Metadata

- Kind: `priority-app`
- Rank: `unranked` (not yet entered in the unified [aaa-work-threads/priorities.md](../aaa-work-threads/priorities.md) table)
- Value: `tbd`
- Cost: `tbd`
- ROI: `tbd`
- Status: `proposed`

## Current

This folder owns the priority work ledger for a proposed **Roots** visualization app. No code exists yet under `src/apps/` or as a deployed page; this packet stages the concept, its governing equations, and the open design questions before any implementation agent is dispatched.

This packet uses $T_r$ for receiver time and $T_t$ for transmit (emission) time, in place of `master-equation.md`'s bare $T$ and $T_{\mathrm{em}}$, so panes and controls can name "receiver" and "transmit" time explicitly without relying on subscript position alone. The two notations refer to the same quantities; cross-reference `master-equation.md` by dropping the `r`/`t` subscripts back to $T$/$T_{\mathrm{em}}$.

The app's subject is the **causal-root fold**: the mechanism in [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse) by which the number of active causal roots between a source worldline and a receiver event changes. A causal root is an emission event on the source worldline whose expanding causal wake intersects the receiver event now; the master EOM sums per-hit accelerations over the currently active roots (`master-equation.md`, "Master EOM"). The source-normal transversality floor

$$
D_{s,ij}(T_r;T_t) \equiv c_f - \hat{\mathbf r}_{ij}(T_r;T_t)\cdot\mathbf V_j(T_t)
$$

is the quantity that must stay away from zero for a root to be simple and legal. At a fold ($D_{s,ij}=0$ with the transversal control parameter crossing generically), two simple roots merge and either appear or disappear together: the generic fold law is $\Delta N=\pm2$ active roots with the receiver-normal branch-strength bookkeeping $\Delta D=0$ (`master-equation.md`, "Caustic Transit and Finite Impulse", $\Sigma^1$ stratum). This happens when the source's velocity component toward the receiver along $\hat{\mathbf r}_{ij}$ reaches $c_f$ — i.e., when the source is locally moving at the field speed along that line of sight, not when the source's total speed exceeds $c_f$ in some frame-independent sense. Cusp and higher strata ($\Sigma^{1,1}$ and deeper) can merge or split more than one root pair at once and are not covered by the generic fold law; they route to a separate singular-stratum treatment.

## Objective

Illustrate, for an operator/developer or reader audience, how causal-root count changes as a source's motion is dialed through and past the fold condition:

- render the source worldline, the receiver worldline, and the expanding causal-wake surfaces (circles in a 2D scene, spheres in 3D) emitted along the source history;
- mark each currently active causal root as the wake surface's intersection with the receiver event;
- animate the source's velocity component along $\hat{\mathbf r}_{ij}$ crossing $c_f$ and show the corresponding root pair appearing or annihilating at the fold, with $D_{s,ij}$ plotted alongside so the floor crossing is visible, not just asserted;
- keep the finite-impulse behavior visible: the pointwise per-hit acceleration diverges like $(T_{r,\ast}-T_r)^{-1/2}$ approaching the fold, but the time-integrated $\Delta\mathbf V$ through the caustic transit stays finite (`master-equation.md`, eq. for $\int\|\mathbf A_{ij,+}+\mathbf A_{ij,-}\|\,dT_r \le 4C\sqrt\varepsilon$) — the app should not let the pointwise spike read as an unbounded kick.

## Requirements And Design

The pane layout, control set, and theory-layer constraints for V1 are worked out in [requirements-and-design.md](requirements-and-design.md). Summary: a synchronized 2x2 grid (delay-map roots, wake scene, root-count ledger, finite-impulse pane) driven primarily by a source velocity slider $\beta=v/c_f$, with a secondary impact-parameter slider and standard time-transport controls.

## Theory-Layer Constraints

- Architrinos have no mass; describe the source and receiver kinematically (position, velocity, causal-root count), and speak of **acceleration**, not force, per `AGENTS.md` theory-layer discipline.
- Do not call this "Cherenkov-like" or import any standard-physics shock-front picture as a premise; the fold is a delay-map root-multiplicity fact derived inside $\mathbb{A}\mathbb{A}\mathbb{A}$, and any comparison to a standard-physics analogue belongs in a clearly labeled comparison note, not the core explanation.
- Use `source` / `receiver` / `causal root` as the canonical terms (see `master-equation.md` and `content/markdown/aaa/archie/terminology-usage.md`); avoid ad hoc substitutes such as "transmitter" or "signal" in authored copy or UI labels.

## Open Design Questions (discussion-scoped)

Resolved into the V1 design (see [requirements-and-design.md](requirements-and-design.md)): panel layout is a synchronized 2x2 grid, the source path defaults to a straight-line pass with a circular-orbit mode deferred, and root-count history is its own ledger pane (Pane C) so the $\Delta N=\pm2$ law is checkable against Pane A's zero-crossing count, not just visually plausible.

Still unresolved:

- Whether Pane B (wake scene) stays 2D for V1 or goes straight to a 3D wake-surface scene comparable to `app-photon`/`app-borg`.
- Whether the circular-orbit source mode ships in V1 or stays deferred.
- Whether the numeric readout strip should also expose the receiver-normal branch strength $D_{T,ij}$.

No implementation dispatched.
