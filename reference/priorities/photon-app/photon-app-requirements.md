# Photon App Requirements

Status. Initial priority-app requirements packet for [photon-app](photon-app.md). This file stages the first product, visualization, and diagnostic requirements for a photon application. It is priority material only and does not edit reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ prose.

Claim level. Exploratory app scaffold. The app models a photon candidate as two contra-rotating flat Noether swarms and visualizes observer-level polarization diagnostics fitted from the branch-sum field, but it does not prove a physical photon branch, helicity closure, Malus-law recovery, or analyzer dynamics.

## Purpose

The photon app should provide an interactive 2D workbench for exploring a candidate photon as a pair of contra-rotating flat Noether swarms. The app's first job is to make the candidate geometry inspectable: layer cadence, radius, phase, pair separation, binary rotation direction, propagation speed, analyzer axis, derived polarization state, and observer-level field summaries should all be visible.

The app should support theory work by making parameter choices reproducible. A useful state should be exportable as a preset or diagnostic snapshot so later proof packets, simulations, or corpus notes can cite exact values rather than describing an animation by memory.

## Candidate Model

The first version uses this candidate picture:

- A photon is represented as a pair of flat Noether swarms.
- The pair moves at $c_f$ in v1.
- A later version may replace the fixed $c_f$ channel with a local $c$ derived from the local Noether sea state.
- The two swarms are displayed side by side.
- The two swarm centers are separated along the line of translation.
- The left swarm is the trailing swarm and rotates counter-clockwise.
- The right swarm is the leading swarm and rotates clockwise.
- The 2D view of each swarm does not rotate as a group; only the binaries and layer phases animate.
- The stage should also include an edge-on side view along the line of translation, where the pair separation control changes the distance between the two side-view swarm traces rather than changing the distance between the face-on circular swarm views.

Use the canonical photon priority language where possible: the visual pair should be described as a candidate planar pair, and any pro/anti or leading/trailing role should be declared in the app state rather than inferred only from screen position.

## V1 Prototype Contract

The first implementation should use the app name `photon`.

Required route and source layout:

- route file: `photon.html`;
- operator-facing app guide: `reference/priorities/photon-app/photon-guide.md`;
- app folder: `src/apps/photon/`;
- entrypoint: `src/apps/photon/main.js`;
- runtime module: `src/apps/photon/PhotonRuntime.js`;
- renderer module: `src/apps/photon/PhotonSwarmVisualRuntime.js`;
- state module: `src/apps/photon/PhotonStateRuntime.js`;
- formulas module: `src/apps/photon/PhotonFormulaRuntime.js`;
- controls module: `src/apps/photon/PhotonControlsRuntime.js`;
- diagnostics module: `src/apps/photon/PhotonDiagnosticsRuntime.js`;
- and, if shared visual extraction is needed, a focused shared helper consumed by both `src/apps/ideal-swarm/` and `src/apps/photon/`.

The prototype should be a working diagnostic app, not a route stub. It should load directly at `photon.html`, render the two swarm views, animate by default, and expose the v1 control set in a visible UI panel.

## Coordinate And Timing Convention

V1 uses a left-to-right propagation convention:

- horizontal screen direction is the line of translation;
- left means trailing;
- right means leading;
- the left trailing swarm rotates counter-clockwise;
- the right leading swarm rotates clockwise;
- the observer-field cursor moves from left to right as the visualization runs;
- the $\mathbf E$ plot covers exactly three observer cycles;
- and the plot keeps the full waveform visible except for a short forward gap ahead of the moving now line.

The v1 observer cycle should use the middle-layer frequency as the default field-cycle reference. With the default middle-layer frequency $f_M=0.26\,\mathrm{Hz}$, the three-cycle run duration is

$$
T_{\mathrm{run}}=\frac{3}{f_M}\approx11.54\,\mathrm{s}.
$$

If the middle-layer frequency changes, the plot window should update so it still spans three middle-layer cycles.

## Default State

The default runtime parameter state should use these initial values:

```json
{
  "app": "photon",
  "version": 1,
  "time": {
    "paused": false,
    "speedMultiplier": 1,
    "cycleReferenceLayer": "M",
    "cycleCount": 3
  },
  "pair": {
    "speedMode": "cf",
    "pairSeparation": 1.62,
    "left": {
      "role": "trailing",
      "direction": "ccw",
      "layers": {
        "I": { "enabled": true, "radius": 0.9, "frequencyHz": 0.2122, "phaseDeg": 0 },
        "M": { "enabled": true, "radius": 1.26, "frequencyHz": 0.1263, "phaseDeg": 0 },
        "O": { "enabled": true, "radius": 1.62, "frequencyHz": 0.0786, "phaseDeg": 0 }
      }
    },
    "right": {
      "role": "leading",
      "direction": "cw",
      "layers": {
        "I": { "enabled": true, "radius": 0.9, "frequencyHz": 0.2122, "phaseDeg": 0 },
        "M": { "enabled": true, "radius": 1.26, "frequencyHz": 0.1263, "phaseDeg": 0 },
        "O": { "enabled": true, "radius": 1.62, "frequencyHz": 0.0786, "phaseDeg": 0 }
      }
    }
  },
  "polarization": {
    "analyzerAngleDeg": 0
  },
  "measurement": {
    "virtualObserver": { "x": 0, "y": 0, "z": 0 },
    "emissionSpeedCf": 1
  }
}
```

The I/M/O default radii follow the Ideal Swarm $5:7:9$ ratio. The default frequencies use the Ideal Swarm initial layer cadences.

## Layout Requirements

The first screen should be the working diagnostic, not a landing page.

Required layout regions:

1. Top diagnostic region: two face-on flat Noether swarm views plus an edge-on side view of the same pair.
2. Lower observer-field region: external $\mathbf E$ field readouts observed from the current candidate state.
3. Control region: compact controls for time, pair state, per-swarm I/M/O parameters, analyzer angle, formulas, and presets.
4. Markdown document access: compact `MD` buttons for the photon guide, project packet, and requirements packet, using the same in-app Markdown viewer pattern as the Ideal Swarm app.

The pair should remain centered in the diagnostic region. Translation at $c_f$ should be represented by a propagation cue, phase advance, moving tick marks, or a viewport-followed centerline, rather than by allowing the swarms to drift off screen.

The swarm views should remain 2D. The app should not use a 3D renderer unless the requirements are explicitly revised.

Desktop layout should be optimized first. The preferred v1 desktop layout is:

- a full-viewport app surface;
- a two-swarm face-on stage occupying the main upper-left region, with an edge-on side view in the same stage;
- a three-cycle $\mathbf E$ plot directly below the two-swarm stage;
- a right-side inspector panel, approximately `360px` to `420px` wide, for controls, presets, diagnostics, and formulas;
- clickable Markdown guide controls inside the inspector;
- compact translucent controls in the same restrained app family as Ideal Swarm;
- and no landing-page hero, decorative card nesting, or separate explanatory splash surface.

On narrow screens, the app may stack the inspector below the visual regions, but the first prototype should be judged on desktop usability.

## Swarm Visualization Requirements

Each flat Noether swarm view should show:

- I/M/O layers as distinct concentric layer tracks or equivalent flat layer bands;
- binary markers on each active layer;
- layer radius;
- layer phase;
- layer frequency;
- clockwise or counter-clockwise rotation direction;
- and a visible centerline or translation-axis cue.

The two swarm views should make contra-rotation obvious without needing explanatory prose. Direction indicators, phase ticks, or short motion trails are acceptable if they do not make the display visually noisy.

The stage should also provide an edge-on side view of the photon candidate. In that view, each planar swarm should appear as a vertical trace whose length equals the diameter of the largest enabled binary. The trace should carry red and blue glow, and active architrino markers may move up and down along the trace to show the projected side-view orbit. The `Sep/r` control should change the center-to-center distance between the two side-view traces along the $x$ axis, while the face-on circular orbit views keep a fixed visual spacing for readability. Pair separation uses the same dimensionless model length units as the I/M/O radii, but the UI controls it as a ratio $s/r_{\mathrm{ref}}$ from `1e-10` to `1e5`, where $r_{\mathrm{ref}}$ is the largest enabled binary radius. A separation $s$ places the swarm centers at $x = -s/2$ and $x = +s/2$.

The visual state should be driven by one shared app clock so pause/play, reset, phase offsets, and observed field summaries remain synchronized.

## Ideal Swarm Visual Reuse Requirement

The architrino visualization and trails in the photon app should match the Ideal Swarm app. The implementation reference is [IdealSwarmRuntime](../../../src/apps/ideal-swarm/IdealSwarmRuntime.js) and its path-potential profile helper [IdealSwarmPathPotentialProfile](../../../src/apps/ideal-swarm/IdealSwarmPathPotentialProfile.js).

The photon app should reuse this visual grammar:

- red positrino markers and blue electrino markers;
- one fixed on-screen architrino marker size shared by all I/M/O layers and both swarms;
- purple neutral path blending where the orbit path is not strongly dominated by either polarity;
- I/M/O layer colors matching the Ideal Swarm inner, middle, and outer binary colors;
- orbit path lines with time-varying charge tinting;
- layered path-history trails with separate headlamp and wake ribbons;
- trail opacity and width falloff from head to tail;
- wake-side tinting that makes path-history visible without becoming a solid band;
- and path/trail visibility toggles equivalent to the Ideal Swarm `Paths` control.

The photon renderer should not invent a different architrino marker style, polarity palette, or trail behavior unless a later requirement explicitly changes the shared visual language. If implementation begins by copying the Ideal Swarm code, the preferred cleanup is to extract the shared architrino marker, orbit-path, tint-profile, and trail-ribbon helpers into a focused shared module that both apps can consume.

## Core Controls

Global controls:

- pause/play icon button;
- Space bar pause/play shortcut when focus is not inside an editable field, slider, selector, or button;
- reset animation button;
- reset parameters button;
- simulation time readout;
- speed mode with v1 fixed to $c_f$ and a future slot for local $c$;
- and pair separation along the line of translation, shown by the edge-on side-view trace spacing rather than by moving the face-on circular orbit views.

Measurement controls:

- Virtual Observer $x$ coordinate along the line of translation;
- Virtual Observer $y$ coordinate on the first transverse axis;
- and Virtual Observer $z$ coordinate on the second transverse axis.

The Virtual Observer $\mathbf E$ plot should keep the branch-sum field values unscaled in diagnostics and use automatic plot scaling only for drawing.

Per swarm controls:

- enabled checkbox for each of the six binaries, default checked;
- layer frequency for I, M, and O;
- layer radius for I, M, and O;
- layer phase in degrees for I, M, and O;
- direction display locked to clockwise for one swarm and counter-clockwise for the other in v1;
- and a copy/mirror control so one swarm can inherit parameters from the other with sign or phase changes.

When a binary checkbox is unchecked, that binary is removed from the swarm display. The Virtual Observer branch-sum formulas for $\mathbf E$ should zero the contribution from both architrinos in that binary.

Control organization should assume the app may eventually need dozens of controls. The v1 interface should therefore use grouped panels, tabs, accordions, or inspector sections rather than placing every advanced parameter in one flat control wall.

## V1 Control Ranges

The first prototype should expose these controls visibly in the UI panel:

| Control | Default | Range | Step |
| --- | ---: | ---: | ---: |
| I frequency | `0.2122 Hz` | `0.01` to `2.00 Hz` | `0.0001` |
| M frequency | `0.1263 Hz` | `0.01` to `2.00 Hz` | `0.0001` |
| O frequency | `0.0786 Hz` | `0.01` to `2.00 Hz` | `0.0001` |
| I radius | `0.90` | `0.20` to `2.40` | `0.01` |
| M radius | `1.26` | `0.20` to `2.40` | `0.01` |
| O radius | `1.62` | `0.20` to `2.40` | `0.01` |
| I phase | `0 deg` | `0` to `360 deg` | `1 deg` |
| M phase | `0 deg` | `0` to `360 deg` | `1 deg` |
| O phase | `0 deg` | `0` to `360 deg` | `1 deg` |
| pair separation ratio | `1 r` | `1e-10 r` to `1e5 r` | selectable `1` through `9` ticks per decade |
| time speed | `1.00` | `0.10` to `4.00` | `0.05` |
| analyzer angle | `0 deg` | `0` to `180 deg` | `1 deg` |
| Virtual Observer $x$ | `0.00` | `-10.00` to `10.00` | `0.05` |
| Virtual Observer $y$ | `0.00` | `-4.00` to `4.00` | `0.05` |
| Virtual Observer $z$ | `0.00` | `-4.00` to `4.00` | `0.05` |

The Virtual Observer $x$, $y$, and $z$ sliders should show a visible zero marker. Values within two slider steps of zero should snap to exactly `0`.

Each swarm should have its own I/M/O frequency, radius, and phase controls. The direction controls are visible but locked in v1: left trailing is counter-clockwise and right leading is clockwise.

## Polarization Requirements

The app needs a direct way to visualize the polarization implied by the actual branch-sum observer field.

Required v1 polarization views:

- fitted linear polarization angle in the transverse plane;
- fitted circular polarization handedness indicator;
- fitted ellipticity or phase-lag indicator for non-linear polarization states;
- analyzer angle control;
- scalar analyzer projection fraction for the current analyzer angle;
- and a transverse $E_y/E_z$ inset that keeps the observer-level polarization readout visually separate from the swarm-pair substrate animation.

Useful additional controls:

- and a diagnostic overlay that shows the raw one-cycle branch-sum points behind the fitted polarization curve.

The app must keep the distinction between substrate animation and observer-level polarization diagnostics visible in the state model. A good visual match to Malus' law is a diagnostic target, not proof that the planar pair has supplied the required substrate ledger rows.

## Observer-Field Panel

The lower panel should show the external fields an observer would assign to the candidate state.

Required readouts:

- $\mathbf E$ vector or waveform;
- propagation direction;
- current fitted polarization state;
- and current analyzer projection result when the analyzer is enabled.

The $\mathbf E$ panel should support both vector and waveform forms if practical:

- vector mode for immediate phase and orientation inspection;
- waveform mode for frequency, phase, and intensity inspection over time.

## V1 Observer-Field Mapping

The first prototype should base the lower $\mathbf E$ plot on a Virtual Observer branch-sum calculation from the architrino source histories in the two swarms. This mapping is diagnostic-only and should not be treated as a photon-substrate derivation or a closure certificate.

Let the propagation axis be $+\hat{\mathbf x}$, and let the transverse axes be $\hat{\mathbf y}$ and $\hat{\mathbf z}$. The Virtual Observer coordinate is

$$
\mathbf X_{\mathrm{VO}}
=
x_{\mathrm{VO}}\hat{\mathbf x}
+y_{\mathrm{VO}}\hat{\mathbf y}
+z_{\mathrm{VO}}\hat{\mathbf z}.
$$

For swarm $s$, layer $\ell$, and architrino charge $q\in\{+1,-1\}$, use the analytic source position

$$
\mathbf r_{s\ell q}(\tau)
=
x_s\hat{\mathbf x}
+R_{s\ell}\cos\theta_{s\ell q}(\tau)\hat{\mathbf y}
+R_{s\ell}\sin\theta_{s\ell q}(\tau)\hat{\mathbf z},
$$

$$
\theta_{s\ell q}(\tau)
=
\phi_{s\ell}
+\sigma_s2\pi f_{s\ell}\tau
+\pi\,\mathbf 1_{q=-1},
$$

where $\sigma_s=+1$ for the left trailing counter-clockwise swarm and $\sigma_s=-1$ for the right leading clockwise swarm.

For each active source row $i=(s,\ell,q)$ and observer time $t$, solve the causal-root equation for every retained source-history root $\tau_{i,k}<t$:

$$
F_i(t;\tau)
=
\left\|
\mathbf X_{\mathrm{VO}}-\mathbf r_i(\tau)
\right\|
-c_f(t-\tau)
=0.
$$

With

$$
\mathbf n_{i,k}
=
\frac{\mathbf X_{\mathrm{VO}}-\mathbf r_i(\tau_{i,k})}
{\left\|\mathbf X_{\mathrm{VO}}-\mathbf r_i(\tau_{i,k})\right\|},
$$

and source velocity $\mathbf v_i(\tau_{i,k})$, compute the delay-map Jacobian

$$
J_{i,k}
=
1-\frac{\mathbf v_i(\tau_{i,k})\cdot\mathbf n_{i,k}}{c_f}.
$$

The Virtual Observer receiver acceleration is the Jacobian-weighted radial hit sum for a unit positive receiver:

$$
\mathbf a_{\mathrm{VO}}(t)
=
g\sum_i\sum_k
q_i
\frac{\mathbf n_{i,k}}
{R_{i,k}^2 |J_{i,k}|},
\qquad
R_{i,k}
=
\left\|
\mathbf X_{\mathrm{VO}}-\mathbf r_i(\tau_{i,k})
\right\|.
$$

The displayed electric readout is the transverse observer reconstruction from that receiver acceleration:

$$
\mathbf E_{\perp}(t)
=
\left(\mathbf a_{\mathrm{VO}}(t)\cdot\hat{\mathbf y}\right)\hat{\mathbf y}
+
\left(\mathbf a_{\mathrm{VO}}(t)\cdot\hat{\mathbf z}\right)\hat{\mathbf z}.
$$

The app should expose diagnostic rows for source count, retained root count, maximum source speed ratio, minimum $|J|$, missed source rows, nearest source distance, mean delay, and delay residual. A low $|J|$, missing root row, or super-$c_f$ source speed should mark the branch solve as unstable rather than silently treating the plotted trace as a certified field.

For an ideal plane-wave comparison moving along $+\hat{\mathbf x}$, the magnetic field is recoverable from the displayed electric field:

$$
\mathbf B(t)=\frac{1}{c_f}\hat{\mathbf x}\times\mathbf E(t),
$$

so $B_y=-E_z/c_f$ and $B_z=E_y/c_f$. The app should not draw $\mathbf B$ as a separate graph unless a later diagnostic explicitly needs to compare a non-plane-wave magnetic reconstruction.

The lower field panel should draw one $\mathbf E$ plot with grid, moving now cursor, and no middle-cycle guide lines, plus a transverse polarization inset. The $\mathbf E$ plot should cover three full cycles of $E_y$ and $E_z$. The waveform should remain mostly visible across wrap-around, with only a short forward gap ahead of the now cursor left blank. The $\mathbf E$ graph should auto-scale its drawing span from the maximum visible $|E_y|$ or $|E_z|$ sample while keeping diagnostics based on the unscaled branch-sum field. The polarization inset should fit the actual branch-sum $E_y(t)$ and $E_z(t)$ over one reference cycle, show $E_y$ and $E_z$ axes, draw the current field vector, leave a one-cycle fitted trail, and overlay the analyzer axis. The plot and inset should update immediately when frequency, radius, phase, pair separation, Virtual Observer coordinates, analyzer angle, or reset state changes.

The analyzer projection should use

$$
\hat{\mathbf a}
=
\cos\theta\,\hat{\mathbf y}
+
\sin\theta\,\hat{\mathbf z},
$$

and the displayed analyzer fraction should be

$$
\mu_{\mathrm{analyzer}}
=
\frac{|\hat{\mathbf a}\cdot\mathbf E|^2}
{|\mathbf E|^2+\varepsilon}.
$$

## Formula Panel

The formula panel should fit the actual branch-sum transverse field over one reference cycle:

$$
E_y(t)\approx A_y\cos(\omega t+\phi_y),
\qquad
E_z(t)\approx A_z\cos(\omega t+\phi_z),
$$

then report the relative amplitude $A_z/A_y$, phase lag $\Delta\phi=\phi_z-\phi_y$, and linear, circular, or elliptical classification derived from that fit. It should also show analyzer projection formulas that help connect the fitted field to observer-level optics:

$$
\mathbf a_{\perp}
=
a_y\hat{\mathbf y}+a_z\hat{\mathbf z},
\qquad
\mu_{\mathrm{analyzer}}
=
\frac{|\hat{\mathbf a}\cdot\mathbf a_{\perp}|^2}
{|\mathbf a_{\perp}|^2+\varepsilon}.
$$

For circular diagnostics:

$$
\boldsymbol{\epsilon}_{\lambda}
=
\frac{1}{\sqrt{2}}
\left(
\hat{\mathbf y}
+i\lambda\hat{\mathbf z}
\right),
\qquad
\lambda\in\{+1,-1\}.
$$

For Stokes-style observer summaries:

$$
S_0=|E_y|^2+|E_z|^2,
\qquad
S_1=|E_y|^2-|E_z|^2,
$$

$$
S_2=2\operatorname{Re}(E_y\overline{E_z}),
\qquad
S_3=2\operatorname{Im}(E_y\overline{E_z}).
$$

The formula panel should show live numeric substitution from the current app state when possible.

## Diagnostic Readouts

The first useful diagnostic readouts should be lightweight and explicitly non-certifying:

- static exposure balance between the two swarms;
- transverse oscillatory amplitude;
- longitudinal leakage indicator;
- helicity sign estimate;
- analyzer projection intensity;
- normalized ellipse-fit residual;
- analyzer residual for the current analyzer angle;
- phase-lock indicators for I/M/O layers;
- and snapshot ID for captured diagnostic states.

These readouts should be named as diagnostics or residual-style indicators, not as theorem passes.

## Presets And Capture

The app should support reproducible exploration through:

- named presets;
- reset to default candidate state;
- reset to last loaded preset;
- and a diagnostic snapshot that records parameters, formula-panel values, and current readouts.

Initial presets should include:

- balanced contra-rotating pair;
- linear polarization candidate;
- right circular candidate;
- left circular candidate;
- phase-offset stress test;
- and layer-radius stress test.

## Implementation Boundaries

The implementation should be modular from the start:

- one focused route or entrypoint for the photon app;
- one renderer module for the flat Noether swarm view;
- one shared or reusable visual helper boundary for the Ideal Swarm-style architrino markers, orbit paths, and layered trails;
- one state module for app parameters and presets;
- one formulas module for polarization and observer-field calculations;
- one control module for grouped inspectors;
- and one diagnostic module for residual-style readouts.

Do not add this logic to a large general runtime file except for straightforward route setup. The app should remain a dedicated application project with clear boundaries between rendering, state, controls, formulas, diagnostics, and persistence.

If more than one Ideal Swarm visual helper needs to be copied, extract before the prototype hardens. The preferred shared boundary is a small reusable module for architrino marker materials, charge colors, orbit path line geometry, path tinting, and layered trail ribbons.

## Prototype Verification

The first prototype should be verified before it is treated as complete:

- `photon.html` loads locally through the repo dev server;
- the app route renders a nonblank visual stage;
- the left trailing swarm rotates counter-clockwise;
- the right leading swarm rotates clockwise;
- the $\mathbf E$ plot draws left to right over exactly three middle-layer cycles;
- I/M/O controls update the visual swarms and runtime state;
- Virtual Observer controls update the branch-sum field plot and runtime state;
- analyzer controls update formula-panel values;
- pause/play and reset controls work;
- and browser verification confirms no visible text overlap or broken canvas sizing on the desktop target.

## V1 Non-Goals

The first prototype should defer:

- replacing $c_f$ with local $c$;
- proof-grade photon Gate B residual evaluation;
- material analyzer substrate dynamics;
- no-signaling or Bell-pair behavior;
- 3D swarm rendering;
- group rotation of each 2D swarm view;
- persistent project libraries beyond basic preset/export support;
- and any claim that a displayed preset is a certified photon branch.

## Open Design Questions

These should remain explicit until implementation choices or theory work settle them:

1. How I/M/O layer parameters should map to transverse observer-field amplitudes after the provisional v1 formula panel.
2. Whether pair separation should later enter the observer-field mapping as a physical delay, a phase delay, or a separate diagnostic.
3. Which geometry or binary controls can reliably produce fitted linear, circular, or elliptical observer-level polarization without adding synthetic source-polarization parameters.
4. Whether a future non-plane-wave magnetic reconstruction should become a provisional substrate diagnostic.
5. Which exported snapshot format will be easiest for later simulation or proof packets to consume.
6. What local Noether sea state variables are needed before fixed $c_f$ can be replaced by local $c$.

## First Implementation Acceptance

The first implementation is acceptable when:

- two flat Noether swarm views render side by side;
- the left trailing swarm rotates counter-clockwise while the right leading swarm rotates clockwise;
- architrino markers, orbit paths, and layered trails match the Ideal Swarm visual grammar;
- I/M/O frequency, radius, and phase controls work for both swarms;
- six binary enabled checkboxes default checked, remove unchecked binaries from the display, and remove their Virtual Observer branch-sum contributions from the field plot;
- default I/M/O phases are all `0` degrees on both swarms;
- default I/M/O radii follow the `5:7:9` Ideal Swarm ratio;
- pair separation changes visibly between the two edge-on side-view traces without changing the face-on circular orbit spacing;
- pause/play, Space bar playback shortcut, and reset controls work;
- the lower $\mathbf E$ panel draws the branch-sum field plot at the configured Virtual Observer coordinate left to right over three full cycles;
- fitted branch-sum polarization affects the observer-level readout;
- analyzer projection is present with live numeric substitution;
- app state can be reset;
- and the interface avoids 3D rendering, group rotation, and proof-status claims.
