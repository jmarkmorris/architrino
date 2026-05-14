# Ideal Core

## LLM Instructions

- Keep `Task Queue` ordered as the current Ideal Core app work queue, with the most important active item first.
- Keep this priority file app-facing: runtime access, visualization requirements, lesson flow, controls, charts, and acceptance gates.
- Use [../ellipsoid/ideal-core.md](../ellipsoid/ideal-core.md) as the earlier design brief for the Noether-core instrument and central spherical viewing model.
- Use [../../../content/markdown/aaa/theory-bridges/return-cycle-lorentz-quantization.md](../../../content/markdown/aaa/theory-bridges/return-cycle-lorentz-quantization.md) as the current theory bridge for Lorentz-factor quantization, return-cycle closure, and Lorentz spheroid geometry.
- Do not treat the app as proof by itself; use it to make the candidate geometry, equations, and closure defects visible.

## Workstream Metadata

- Kind: `priority`
- Rank: `1`
- Value: `9.40`
- Cost: `5.0`
- ROI: `1.88`
- Status: `active`

## Access

- Local dev command: `node scripts/dev/start-local-dev.mjs`
- Local browser URL: `http://127.0.0.1:5173/ideal-core.html`
- HTML entrypoint: [ideal-core.html](../../../ideal-core.html)
- JavaScript entrypoint: [main.js](../../../src/apps/ideal-core/main.js)
- Runtime module: [IdealCorePrototypeRuntime.js](../../../src/apps/ideal-core/IdealCorePrototypeRuntime.js)

## Purpose

Ideal Core is the interactive Noether-core visualization app.

Its near-term role is to make the Lorentz response of a Noether core visually and quantitatively legible: the user should be able to change the relative speed $v$, see the Lorentz factor $\gamma$ update, watch the core geometry become a Lorentz-flattened oblate spheroid, and read the corresponding time-dilation and length-contraction symbols directly on the chart.

The target reader experience is lesson-like rather than decorative. The app should let a reader see that the same speed ratio $\beta=v/c$ controls:

- the Lorentz factor $\gamma=1/\sqrt{1-\beta^2}$;
- the contracted axis ratio $\xi=R_\parallel/R_\perp=1/\gamma$;
- the time-dilation relation $\Delta t=\gamma\Delta\tau$;
- the length-contraction relation $L_\parallel=L_0/\gamma$;
- and the candidate Noether-core spheroid geometry implied by closed return-cycle closure.

## Current State

- The app already has a standalone HTML surface at `ideal-core.html`.
- The current screen has one central Three.js canvas and four surrounding panels.
- Existing controls include view selection, path/surface/axis toggles, freeze, reset, focus, radius, and speed.
- Existing readouts include selected view, surface range, sample sum, and a binary-measures table.
- The lower-left equation zone is reserved and is the natural home for the Lorentz lesson equation stack.
- The upper-left chart zone is the natural home for $\beta$, $\gamma$, $\xi$, time-dilation, and length-contraction curves.

## Task Queue

1. `lorentz_core_lesson` — Build the Lorentz-conforming Noether-core lesson view. Status: `active`. Depends on: none.
2. `symbol_chart_overlay` — Add chart labels and equation callouts that keep the symbols visible while the speed state changes. Status: `next`. Depends on: `lorentz_core_lesson`.
3. `spheroid_axis_mapping` — Map the core envelope, binary path radii, and velocity direction onto a stable Lorentz spheroid visual grammar. Status: `pending`. Depends on: `lorentz_core_lesson`.
4. `return_cycle_closure_readout` — Add a closure-defect readout comparing longitudinal and transverse return-cycle timing. Status: `pending`. Depends on: `spheroid_axis_mapping`.

## Top Priority: Lorentz Core Lesson

### Objective

Create a first lesson mode where the user can vary $\beta=v/c$ and immediately see how Lorentz kinematics maps onto the Noether-core geometry.

The lesson should answer one visual question:

> If a Noether core conforms to Lorentz response, what geometric, timing, and symbolic changes must appear as $v$ increases?

### Core Equations

The app should display and update these equations as first-class lesson objects:

$$
\beta=\frac{v}{c}
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
| $\beta=v/c$ | normalized speed | primary lesson slider value |
| $\gamma$ | Lorentz factor | time-dilation curve and main numeric readout |
| $R_\perp$ | transverse core radius | unchanged equatorial radius in the Lorentz lesson |
| $R_\parallel$ | radius along velocity direction | contracted spheroid axis |
| $\xi=R_\parallel/R_\perp$ | Lorentz axis ratio | length-contraction curve and shape flattening |
| $\Delta\tau$ | proper-time tick | rest-core tick marker |
| $\Delta t$ | observer-time tick | dilated tick marker |
| $L_0$ | proper length | rest reference ruler |
| $L_\parallel$ | observed parallel length | contracted ruler along $v$ |

The default geometry should be a Lorentz-flattened oblate spheroid with its shortened symmetry axis aligned to the velocity vector. If the velocity vector is drawn horizontally, the core should visibly flatten horizontally while the transverse radii remain fixed.

### Lesson Stages

The lesson mode should have a compact staged flow:

1. `rest_core` — show $\beta=0$, $\gamma=1$, $R_\parallel=R_\perp$, $\Delta t=\Delta\tau$, and $L_\parallel=L_0$.
2. `moving_core` — increase $\beta$ and show $\gamma>1$, $R_\parallel<R_\perp$, $\Delta t>\Delta\tau$, and $L_\parallel<L_0$.
3. `return_cycle` — draw longitudinal and transverse return paths and show how equal closure time requires $\xi=1/\gamma$.
4. `aaa_candidate` — mark the open theory claim: realized Noether-core branches may admit only closure-compatible Lorentz states rather than an arbitrary continuous deformation.

### Chart Requirements

The upper-left chart zone should show at least two synchronized curves over $0\leq\beta<1$:

- $\gamma(\beta)$ for time dilation;
- $\xi(\beta)=1/\gamma(\beta)$ for length contraction.

The current $\beta$ state should appear as a vertical cursor. The chart should label the active point values:

$$
\beta,\qquad \gamma,\qquad \xi,\qquad \Delta t/\Delta\tau,\qquad L_\parallel/L_0
$$

The labels should stay readable at normal desktop zoom and should not require the reader to infer the symbol meanings from surrounding prose.

### Acceptance Gate

This priority is done when:

- `ideal-core.html` has a dedicated Lorentz lesson mode or equivalent view state;
- changing $v$ or $\beta$ updates the spheroid geometry, time-dilation readout, length-contraction readout, and chart cursor together;
- the chart displays $\gamma(\beta)$ and $\xi(\beta)$ with active symbolic labels;
- the central core visibly contracts along the velocity direction according to $R_\parallel=R_\perp/\gamma$;
- the lower-left equation zone explains $\beta$, $\gamma$, $\xi$, $\Delta t$, $\Delta\tau$, $L_0$, and $L_\parallel$ in a lesson sequence;
- and the app clearly distinguishes established Lorentz kinematics from the $\mathbb{A}\mathbb{A}\mathbb{A}$ candidate claim about Noether-core branch realization.

## Related Files

- [../ellipsoid/ideal-core.md](../ellipsoid/ideal-core.md)
- [../../../content/markdown/aaa/spacetime/lorentz-kinematics.md](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md)
- [../../../content/markdown/aaa/spacetime/noether-core-geometry.md](../../../content/markdown/aaa/spacetime/noether-core-geometry.md)
- [../../../content/markdown/aaa/theory-bridges/return-cycle-lorentz-quantization.md](../../../content/markdown/aaa/theory-bridges/return-cycle-lorentz-quantization.md)
- [../../../content/markdown/aaa/theory-bridges/special-relativity-noether-core.md](../../../content/markdown/aaa/theory-bridges/special-relativity-noether-core.md)
