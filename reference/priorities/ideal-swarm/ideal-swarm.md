# Ideal Swarm

## LLM Instructions

- Keep `Task Queue` ordered as the current Ideal Swarm app work queue, with the most important active item first.
- Keep this priority file app-facing: runtime access, visualization requirements, lesson flow, controls, charts, document access, and acceptance gates.
- Keep this workstream app-local and unranked unless the operator/developer explicitly selects Ideal Swarm work or a proof/simulation inspection dependency requires it.
- Use [effective-metric-deformation.md](effective-metric-deformation.md) and [raw-notes.md](raw-notes.md) only as source packets. Do not treat them as separate active priority lanes.
- Do not treat the app as proof by itself; use it to make candidate geometry, equations, and closure defects visible.

## Workstream Metadata

- Kind: `app-priority`
- Rank: `unranked`
- Value: `app-local`
- Cost: `app-local`
- ROI: `app-local`
- Status: `active`

## Access

- Local dev command: `PORT=5174 node scripts/dev/start-local-dev.mjs`
- Local browser URL: `http://127.0.0.1:5174/ideal-swarm.html`
- HTML entrypoint: [ideal-swarm.html](../../../ideal-swarm.html)
- JavaScript entrypoint: [main.js](../../../src/apps/ideal-swarm/main.js)
- Runtime module: [IdealSwarmPrototypeRuntime.js](../../../src/apps/ideal-swarm/IdealSwarmPrototypeRuntime.js)

## Purpose

Ideal Swarm is the interactive Noether swarm Lorentz lesson and inspection app.

Its near-term role is to make the Lorentz response of a Noether swarm visually and quantitatively legible. The user should be able to change the velocity fraction $\beta=v/c_f$, see the Lorentz factor $\gamma$ update, watch the core geometry become a Lorentz-flattened spheroid, and read the corresponding time-dilation, length-contraction, and energy-ledger symbols directly on the app surface.

The target reader experience is lesson-like rather than decorative. The app should let a reader see that the same velocity fraction $\beta=v/c_f$ controls:

- the Lorentz factor $\gamma=1/\sqrt{1-\beta^2}$;
- the contracted axis ratio $\xi=R_\parallel/R_\perp=1/\gamma$;
- the time-dilation relation $\Delta t=\Delta\tau/\sqrt{1-\beta^2}$;
- the length-contraction relation $L_\parallel=L_0\sqrt{1-\beta^2}$;
- the bulk-motion energy ledger with $E_{\mathrm{CM}}=\gamma m_0c_f^2$;
- the candidate angular-momentum alignment of the binary normals toward $n=(1,1,1)/\sqrt{3}$;
- and the candidate Noether swarm spheroid geometry implied by closed return-cycle closure.

## Current State

- The app has a standalone HTML surface at `ideal-swarm.html`.
- The application scene links to the standalone app.
- The app title, controls, chart labels, energy ledger, equation stack, binary-measures table, markdown document overlay, and home navigation are implemented.
- Direct document buttons open Ideal Swarm Guide, Return-Cycle Lorentz Quantization, and Lorentz Kinematics in the standard markdown overlay.
- The app uses a central Three.js canvas with surrounding panels for the Lorentz map, controls, equations, and binary measures.
- The visible shell grammar is translucent nested spheroid surfaces plus architrino paths and wake trails.
- The surface potential points default on, with poles aligned to the bulk-motion / contraction axis $n$.
- The velocity slider reaches the $\beta=1$ light-speed limit as a visible limit state.
- The app uses $c_f$ in the user-facing formulas where the lesson refers to the field-speed reference.

## Task Queue

1. `surface_pole_clarity` — Deduplicate exact pole samples or add explicit paired $+n/-n$ markers so the surface poles read as symmetric despite camera angle and potential coloring. Status: `active`. Depends on: none.
2. `momentum_frame_view_lock` — Refine the momentum-frame guides and view behavior so side-on spheroid inspection reads as a thickness change along $n$ rather than an apparent axis rotation. Status: `next`. Depends on: none.
3. `symbol_chart_overlay` — Add compact chart labels and equation callouts that keep $\beta$, $\gamma$, $\xi$, $\Delta t/\Delta\tau$, and $L_\parallel/L_0$ visible while the speed state changes. Status: `next`. Depends on: none.
4. `return_cycle_closure_readout` — Extend the closure-defect readout into a visual timing comparison for longitudinal and transverse return cycles. Status: `pending`. Depends on: `momentum_frame_view_lock`.

## Visual Instrument Contract

The app is a technical instrument, not a decorative animation. Its central visual should make the relative path behavior of the Noether swarm legible from one screen while leaving enough room for controls, graphs, tables, and model-state readouts.

The visual center is one reserved spherical area. The app may rotate the sphere contents for inspection, but the lesson should remain interpretable in the bulk-momentum frame:

```text
bulk-motion axis n
        ↓
transverse plane
        ↓
Lorentz spheroid thickness along n
```

The Noether swarm should read as moving architrino paths and potential-response surfaces, not as a solid body. The central area supports both path inspection and spherical test-surface field inspection so path behavior and field behavior remain visually connected.

## Panel Roles

| Zone | Role |
| --- | --- |
| Upper-left | Lorentz chart, relative time, relative length, and energy ledger |
| Upper-right | Main controls, pause/play, reset/focus, document buttons, and sliders |
| Lower-left | Equation stack and closure statement |
| Lower-right | Binary-measures table |
| Center | Rotatable Noether swarm paths, shells, guides, and surface potential layer |

The readout standard is high contrast, short labels, and direct numeric values. Avoid diagnostic clutter that competes with the central core.

## Lorentz Lesson Core

The lesson should answer one visual question:

> If a Noether swarm conforms to Lorentz response, what geometric, timing, and symbolic changes must appear as $\beta$ increases?

The app should display and update these equations as first-class lesson objects:

$$
\beta=\frac{v}{c_f}
$$

$$
\gamma(\beta)=\frac{1}{\sqrt{1-\beta^2}}
$$

$$
\xi(\beta)=\frac{R_\parallel}{R_\perp}=\frac{1}{\gamma}
$$

$$
R_\parallel=\frac{R_\perp}{\gamma}
$$

$$
\Delta t=\frac{\Delta\tau}{\sqrt{1-\beta^2}}
$$

$$
L_\parallel=L_0\sqrt{1-\beta^2}
$$

For the closed return-cycle interpretation, reserve the longitudinal and transverse timing targets:

$$
T_\parallel=\frac{R_\parallel}{c_f-v}+\frac{R_\parallel}{c_f+v}
$$

$$
T_\perp=\frac{2R_\perp}{c_f}\gamma
$$

and the closure condition:

$$
T_\parallel=T_\perp
$$

which gives:

$$
\frac{R_\parallel}{R_\perp}=\frac{1}{\gamma}
$$

## Visual Mapping

| Symbol | App meaning | Visual role |
| --- | --- | --- |
| $v$ | observer-relative group speed | slider value and chart cursor |
| $c_f$ | field-speed reference | fixed denominator in $\beta=v/c_f$ |
| $\beta=v/c_f$ | normalized speed | primary lesson slider value |
| $\gamma$ | Lorentz factor | time-dilation curve and main numeric readout |
| $\xi=1/\gamma$ | Lorentz axis ratio | length-contraction curve and spheroid flattening |
| $R_\perp$ | transverse core radius | unchanged transverse radius in the default Lorentz lesson |
| $R_\parallel$ | radius along the group momentum / velocity direction | contracted spheroid axis along $n$ |
| $n=(1,1,1)/\sqrt{3}$ | group momentum and contraction axis | shared contraction axis and convergence target for binary angular-momentum normals |
| $\ell_i$ | binary angular-momentum normal | rest-orthogonal triad that tilts toward $n$ as $\xi$ decreases |
| $\Delta\tau$ | proper-time tick | rest-core tick marker |
| $\Delta t$ | observer-time tick | dilated tick marker |
| $L_0$ | proper length | rest reference ruler |
| $L_\parallel$ | observed parallel length | contracted ruler along $v$ |

The default geometry should be a Lorentz-flattened spheroid with its shortened symmetry axis aligned to $n=(1,1,1)/\sqrt{3}$. A direct-on view down $n$ should show high-speed binary orbit planes as circles because their angular-momentum normals converge to the same axis that the spheroid contracts along.

## Return-Cycle Teaching View

The app should define a return cycle as one complete closed causal exchange, not as a one-way signal leg:

```text
one-way leg: A influences B
return cycle: A influences B, the influence returns, and A re-closes in phase with itself
```

The longitudinal lesson should show the two unequal one-way legs:

$$
t_+=\frac{R_\parallel}{c_f-v},
\qquad
t_-=\frac{R_\parallel}{c_f+v}
$$

and then group them into the closed return cycle:

$$
T_\parallel=t_++t_-
$$

The visual point is that a clock or ruler is not made from one isolated one-way leg. It is made from a branch that returns with stable timing, phase, and action ledgers.

## Binary-Layer Ledger

The Lorentz spheroid is the visible outer projection of a deeper coupled core closure.

For each binary layer $\ell\in\{I,M,O\}$, reserve a row for:

$$
\Delta\phi_\ell=2\pi n_\ell
$$

and:

$$
\Delta A_\ell=n_\ell h
$$

up to leakage and branch-resolution terms. The full Noether swarm branch should be shown as a coupled closure requirement:

$$
(\Delta\phi_I,\Delta\phi_M,\Delta\phi_O)
=
2\pi(n_I,n_M,n_O)
$$

with an all-layer action ledger:

$$
\Delta I_I+\Delta I_M+\Delta I_O+\Delta I_{\mathrm{wake}}
=
\sigma\hbar
$$

The app should avoid implying that the outer binary alone solves Lorentz closure. The intended teaching hierarchy is:

```text
inner binary return cycle
middle binary return cycle
outer binary return cycle
        ↓
coupled Noether swarm branch closure
        ↓
outer-binary Lorentz envelope
        ↓
observer reads clock dilation and ruler contraction
```

## Outer-Binary Lorentz Envelope

Use **Outer-Binary Lorentz Envelope** as the teaching label for the visible spheroid. The phrase should mean the visible exclusion envelope exposed by the outer binary, not a solid volume physically filled by the outer binary.

The teaching view should show:

```text
outer binary path system
        ↓
outer-binary exclusion envelope
        ↓
Lorentz spheroid
        ↓
observer reads length contraction and time dilation
```

The default no-extra-scale lesson state should keep:

$$
R_\perp=R_0,
\qquad
R_\parallel=\frac{R_0}{\gamma}
$$

The relative envelope volume may be displayed as:

$$
\frac{V_{\mathrm{env}}(v)}{V_{\mathrm{env}}(0)}
=
\frac{1}{\gamma}
$$

If the lesson exposes a separate transverse scale channel, use:

$$
R_\perp=\lambda R_0,
\qquad
R_\parallel=\frac{\lambda R_0}{\gamma}
$$

and:

$$
\frac{V_{\mathrm{env}}(v)}{V_{\mathrm{env}}(0)}
=
\frac{\lambda^3}{\gamma}
$$

The visual grammar should show outer-binary paths and the translucent envelope together, so the reader sees the spheroid as the relative envelope traced or exposed by the outer binary while still understanding that the hidden inner and middle binary ledgers remain active.

## Completed App Decisions

- `lorentz_core_lesson` added the velocity-fraction slider, Lorentz chart, relative-time and relative-length equation cards, normalized energy ledger, equation stack, directional spheroid transform along $n$, velocity-dependent binary angular-momentum alignment toward $n$, and the $\beta=1$ limit state.
- The duplicate rest-envelope overlay was removed because the slider can return to $\beta=0$ for the uncontracted reference state.
- The individual-binary visibility mode was removed; the app uses the full Noether swarm by default.
- The lower-left closure-only rows that were not live computed were hidden.
- The app was linked from the application scene and app-linked documents link back to it.

## Acceptance Gate

This priority is healthy when:

- changing $\beta$ updates the spheroid geometry, time-dilation readout, length-contraction readout, energy ledger, and chart cursor together;
- the chart displays $\gamma(\beta)$ and $\xi(\beta)$ with active symbolic labels;
- the central core visibly contracts along $n=(1,1,1)/\sqrt{3}$ according to $R_\parallel=R_\perp/\gamma$;
- the binary angular-momentum normals remain orthogonal at $\beta=0$ and converge toward $n=(1,1,1)/\sqrt{3}$ as $\beta\to1$;
- the surface potential layer uses poles aligned with $n$ and reads symmetrically enough for users to trust the geometry;
- the central view labels or implies the spheroid as the Outer-Binary Lorentz Envelope and does not present it as a solid body filled by the outer binary;
- the teaching view distinguishes one-way legs from return cycles and groups $t_+$ and $t_-$ into $T_\parallel$;
- inner, middle, and outer binary ledger rows remain reserved for future computed closure readouts;
- the equation zone explains $\beta$, $\gamma$, $\xi$, $\Delta t$, $\Delta\tau$, $L_0$, and $L_\parallel$ in a compact lesson sequence;
- and the app clearly distinguishes established Lorentz kinematics from the $\mathbb{A}\mathbb{A}\mathbb{A}$ candidate claim about Noether swarm branch realization.

## Source Packets

| File | Role | Status |
| --- | --- | --- |
| [effective-metric-deformation.md](effective-metric-deformation.md) | Source packet for the broader shape-plus-scale deformation intuition, effective-metric extraction, Planck alignment, cosmology, and strong-field comparisons. | Preserved source material; not a separate active workstream. |
| [raw-notes.md](raw-notes.md) | Scratch notes on energy accounting, $h$ transfer, frequency mismatch, radiation, temperature, and strong-field questions. | Parked source material; promote only concrete equations, simulation targets, or theorem obligations. |

## Related Files

- [../../../ideal-swarm.html](../../../ideal-swarm.html)
- [../../../src/apps/ideal-swarm/IdealSwarmPrototypeRuntime.js](../../../src/apps/ideal-swarm/IdealSwarmPrototypeRuntime.js)
- [../../../content/markdown/aaa/archie/ideal-swarm-notes.md](../../../content/markdown/aaa/archie/ideal-swarm-notes.md)
- [../../../content/markdown/aaa/spacetime/lorentz-kinematics.md](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md)
- [../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-geometry.md](../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-geometry.md)
- [../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md](../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md)
- [../../../content/markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-swarm.md](../../../content/markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-swarm.md)
