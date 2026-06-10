# Ideal Core

## LLM Instructions

- Keep `Task Queue` ordered as the current Ideal Core app work queue, with the most important active item first.
- Keep this priority file app-facing: runtime access, visualization requirements, lesson flow, controls, charts, and acceptance gates. Its task queue is app-local and is not part of the global theory priority score table unless the operator/developer explicitly selects Ideal Core work.
- Use [../ellipsoid/ideal-core.md](../ellipsoid/ideal-core.md) as the earlier design brief for the Noether swarm instrument and central spherical viewing model.
- Use [../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md](../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md) as the current theory bridge for Lorentz-factor quantization, return-cycle closure, and Lorentz spheroid geometry.
- Do not treat the app as proof by itself; use it to make the candidate geometry, equations, and closure defects visible.

## Workstream Metadata

- Kind: `app-priority`
- Rank: `unranked`
- Value: `app-local`
- Cost: `app-local`
- ROI: `app-local`
- Status: `active`

## Access

- Local dev command: `node scripts/dev/start-local-dev.mjs`
- Local browser URL: `http://127.0.0.1:5173/ideal-core.html`
- HTML entrypoint: [ideal-core.html](../../../ideal-core.html)
- JavaScript entrypoint: [main.js](../../../src/apps/ideal-core/main.js)
- Runtime module: [IdealCorePrototypeRuntime.js](../../../src/apps/ideal-core/IdealCorePrototypeRuntime.js)

## Purpose

Ideal Core is the interactive Noether swarm visualization app.

Its near-term role is to make the Lorentz response of a Noether swarm visually and quantitatively legible: the user should be able to change the relative speed $v$, see the Lorentz factor $\gamma$ update, watch the core geometry become a Lorentz-flattened oblate spheroid, and read the corresponding time-dilation and length-contraction symbols directly on the chart.

The target reader experience is lesson-like rather than decorative. The app should let a reader see that the same velocity fraction $\beta=v/c$ controls:

- the Lorentz factor $\gamma=1/\sqrt{1-(v/c)^2}$;
- the contracted axis ratio $\xi=R_\parallel/R_\perp=1/\gamma$;
- the time-dilation relation $\Delta t=\gamma\Delta\tau$;
- the length-contraction relation $L_\parallel=L_0/\gamma$;
- and the candidate Noether swarm spheroid geometry implied by closed return-cycle closure.

## Current State

- The app already has a standalone HTML surface at `ideal-core.html`.
- The current screen has one central Three.js canvas and four surrounding panels.
- Existing controls include view selection, path/surface/axis toggles, freeze, reset, focus, radius, and speed.
- Existing readouts include selected view, surface range, sample sum, and a binary-measures table.
- The lower-left equation zone is reserved and is the natural home for the Lorentz lesson equation stack.
- The upper-left chart zone is the natural home for velocity fraction $v/c$, $\gamma$, $\xi$, time-dilation, and length-contraction curves.

## Task Queue

1. `symbol_chart_overlay` — Add chart labels and equation callouts that keep the symbols visible while the speed state changes. Status: `active`. Depends on: none.
2. `spheroid_axis_mapping` — Refine the core envelope, binary path radii, and velocity direction into a stable Lorentz spheroid visual grammar. Status: `next`. Depends on: none.
3. `return_cycle_closure_readout` — Extend the closure-defect readout into a visual timing comparison for longitudinal and transverse return cycles. Status: `pending`. Depends on: `spheroid_axis_mapping`.

Completed 2026-06-10: `lorentz_core_lesson` added a velocity-fraction slider labeled $\beta=v/c$, Lorentz chart, equation stack, a dedicated mass / relative-time / relative-length factor panel, the derived fixed-energy mass equation $m=(E/c^3)\sqrt{c^2-v^2}$, contracted-axis spheroid transform, velocity arrow, and numeric return-cycle residual. The separate rest-envelope overlay was removed because the slider can return to $v/c=0$ for the uncontracted reference state. The slider reaches the $v/c=1$ light-speed limit as a limit state: $\gamma$ and relative time diverge, while contracted length and the fixed-energy mass factor go to zero.

## Top Priority: Lorentz Core Lesson

### Objective

Create a first lesson mode where the user can vary the velocity fraction $\beta=v/c$ and immediately see how Lorentz kinematics maps onto the Noether swarm geometry.

The lesson should answer one visual question:

> If a Noether swarm conforms to Lorentz response, what geometric, timing, and symbolic changes must appear as $v$ increases?

### Core Equations

The app should display and update these equations as first-class lesson objects:

$$
\frac{v}{c}
$$

$$
\gamma(v/c)=\frac{1}{\sqrt{1-(v/c)^2}}
$$

$$
\xi(v/c)=\frac{R_\parallel}{R_\perp}=\frac{1}{\gamma}
$$

$$
R_\parallel=\frac{R_\perp}{\gamma}
$$

$$
\Delta t=\gamma\Delta\tau
$$

$$
L_\parallel=\frac{L_0}{\gamma}
$$

For the closed return-cycle interpretation, include the longitudinal and transverse timing targets:

$$
T_\parallel=\frac{R_\parallel}{c-v}+\frac{R_\parallel}{c+v}
$$

$$
T_\perp=\frac{2R_\perp}{c}\gamma
$$

and the closure condition:

$$
T_\parallel=T_\perp
$$

which gives:

$$
\frac{R_\parallel}{R_\perp}=\frac{1}{\gamma}
$$

### Visual Mapping

The primary core view should map Lorentz variables to geometry as follows:

| Symbol | App Meaning | Visual Role |
| --- | --- | --- |
| $v$ | observer-relative core speed | velocity arrow through the core |
| $c$ | limiting signal speed | fixed reference scale on the chart |
| $v/c$ | normalized speed | primary lesson slider value |
| $\gamma$ | Lorentz factor | time-dilation curve and main numeric readout |
| $R_\perp$ | transverse core radius | unchanged equatorial radius in the Lorentz lesson |
| $R_\parallel$ | radius along velocity direction | contracted spheroid axis |
| $\xi=R_\parallel/R_\perp$ | Lorentz axis ratio | length-contraction curve and shape flattening |
| $\Delta\tau$ | proper-time tick | rest-core tick marker |
| $\Delta t$ | observer-time tick | dilated tick marker |
| $L_0$ | proper length | rest reference ruler |
| $L_\parallel$ | observed parallel length | contracted ruler along $v$ |

The default geometry should be a Lorentz-flattened oblate spheroid with its shortened symmetry axis aligned to the velocity vector. If the velocity vector is drawn horizontally, the core should visibly flatten horizontally while the transverse radii remain fixed.

### Teaching View Requirements

The teaching view should orient the reader around three linked objects:

1. the return cycle;
2. the tri-binary closure burden;
3. the outer-binary Lorentz envelope.

#### Return Cycle

The app should define a return cycle as one complete closed causal exchange, not as a one-way signal leg. The lesson should contrast:

```text
one-way leg: A influences B
return cycle: A influences B, the influence returns, and A re-closes in phase with itself
```

The longitudinal lesson should show the two unequal one-way legs:

$$
t_+=\frac{R_\parallel}{c-v},
\qquad
t_-=\frac{R_\parallel}{c+v}
$$

and then group them into the closed return cycle:

$$
T_\parallel=t_++t_-.
$$

The visual point is that a clock or ruler is not made from one isolated one-way leg. It is made from a branch that returns with a stable timing, phase, and action ledger.

#### Binary-Layer Ledger

The lesson should make clear that the Lorentz spheroid is the visible outer projection of a deeper coupled core closure.

For each binary layer $\ell\in\{I,M,O\}$, display or reserve a row for:

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
\sigma\hbar.
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

#### Outer-Binary Lorentz Envelope

Use **Outer-Binary Lorentz Envelope** as the teaching label for the spheroid. The phrase should mean the visible exclusion envelope exposed by the outer binary, not a solid volume physically filled by the outer binary.

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
R_\parallel=\frac{R_0}{\gamma}.
$$

The relative envelope volume should be displayed as:

$$
V_{\mathrm{env}}(v)
=
\frac{4\pi}{3}R_\perp^2R_\parallel
$$

and, relative to the rest sphere,

$$
\frac{V_{\mathrm{env}}(v)}{V_{\mathrm{env}}(0)}
=
\frac{1}{\gamma}.
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
\frac{\lambda^3}{\gamma}.
$$

The default chart label should therefore include:

```text
Outer-Binary Lorentz Envelope
shape ratio: xi = R_parallel / R_perp = 1 / gamma
relative envelope volume: V_env(v) / V_env(0) = 1 / gamma
```

The visual grammar should show outer-binary paths and the translucent envelope together, so the reader sees the spheroid as the relative envelope traced or exposed by the outer binary while still understanding that the hidden inner and middle binary ledgers remain active.

### Lesson Stages

The lesson mode should have a compact staged flow:

1. `rest_core` — show $v/c=0$, $\gamma=1$, $R_\parallel=R_\perp$, $\Delta t=\Delta\tau$, and $L_\parallel=L_0$.
2. `moving_core` — increase $v/c$ and show $\gamma>1$, $R_\parallel<R_\perp$, $\Delta t>\Delta\tau$, and $L_\parallel<L_0$.
3. `return_cycle` — draw longitudinal and transverse return paths and show how equal closure time requires $\xi=1/\gamma$.
4. `binary_ledgers` — show that inner, middle, and outer binary return cycles must close together for a stable Noether swarm branch.
5. `outer_envelope` — label the visible spheroid as the Outer-Binary Lorentz Envelope and show $V_{\mathrm{env}}(v)/V_{\mathrm{env}}(0)$.
6. `aaa_candidate` — mark the open theory claim: realized Noether swarm branches may admit only closure-compatible Lorentz states rather than an arbitrary continuous deformation.

### Chart Requirements

The upper-left chart zone should show at least two synchronized curves over $0\leq v/c\leq 1$, with $v/c=1$ shown as the light-speed limit point:

- $\gamma(v/c)$ for time dilation;
- $\xi(v/c)=1/\gamma(v/c)$ for length contraction.

The current velocity-fraction state should appear as a vertical cursor. The chart should label the active point values:

$$
v/c,\qquad \gamma,\qquad \xi,\qquad \Delta t/\Delta\tau,\qquad L_\parallel/L_0
$$

The labels should stay readable at normal desktop zoom and should not require the reader to infer the symbol meanings from surrounding prose.

### Acceptance Gate

This priority is done when:

- `ideal-core.html` has a dedicated Lorentz lesson mode or equivalent view state;
- changing $v/c$ updates the spheroid geometry, time-dilation readout, length-contraction readout, and chart cursor together;
- the chart displays $\gamma(v/c)$ and $\xi(v/c)$ with active symbolic labels;
- the central core visibly contracts along the velocity direction according to $R_\parallel=R_\perp/\gamma$;
- the central view labels the spheroid as the Outer-Binary Lorentz Envelope and does not present it as a solid body filled by the outer binary;
- the app displays $V_{\mathrm{env}}(v)/V_{\mathrm{env}}(0)=1/\gamma$ in the no-extra-scale lesson state, with the $\lambda^3/\gamma$ extension reserved for scale-channel mode;
- the teaching view distinguishes one-way legs from return cycles and groups $t_+$ and $t_-$ into $T_\parallel$;
- the teaching view reserves or displays inner, middle, and outer binary ledger rows so the outer envelope is not mistaken for the whole closure burden;
- the lower-left equation zone explains velocity fraction $v/c$, $\gamma$, $\xi$, $\Delta t$, $\Delta\tau$, $L_0$, and $L_\parallel$ in a lesson sequence;
- and the app clearly distinguishes established Lorentz kinematics from the $\mathbb{A}\mathbb{A}\mathbb{A}$ candidate claim about Noether swarm branch realization.

## Related Files

- [../ellipsoid/ideal-core.md](../ellipsoid/ideal-core.md)
- [../../../content/markdown/aaa/spacetime/lorentz-kinematics.md](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md)
- [../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-geometry.md](../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-geometry.md)
- [../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md](../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md)
- [../../../content/markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-swarm.md](../../../content/markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-swarm.md)
