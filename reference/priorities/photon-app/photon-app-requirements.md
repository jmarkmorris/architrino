# Photon App Requirements

Status. Initial priority-app requirements packet for [photon-app](photon-app.md). This file stages the first product, visualization, and diagnostic requirements for a photon application. It is priority material only and does not edit reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ prose.

Claim level. Exploratory app scaffold. The app models a photon candidate as two contra-rotating flat Noether swarms and visualizes observer-level polarization formulas, but it does not prove a physical photon branch, helicity closure, Malus-law recovery, or analyzer dynamics.

## Purpose

The photon app should provide an interactive 2D workbench for exploring a candidate photon as a pair of contra-rotating flat Noether swarms. The app's first job is to make the candidate geometry inspectable: layer cadence, radius, phase, pair separation, binary rotation direction, propagation speed, polarization state, and observer-level field summaries should all be visible and adjustable.

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
- the observer-field plots draw from left to right as the visualization runs;
- the stacked $\mathbf E$ and comparison $\mathbf B$ plot windows each cover exactly three observer cycles;
- vertical guide lines appear at the start and end of the middle cycle in both plots;
- and the middle cycle is the default visual focus region for comparing $\mathbf E$, comparison $\mathbf B$, analyzer projection, and polarization readouts.

The v1 observer cycle should use the middle-layer frequency as the default field-cycle reference. With the default middle-layer frequency $f_M=0.26\,\mathrm{Hz}$, the three-cycle run duration is

$$
T_{\mathrm{run}}=\frac{3}{f_M}\approx11.54\,\mathrm{s}.
$$

The $\mathbf E$ and comparison $\mathbf B$ plot guide lines are placed at

$$
t=\frac{T_{\mathrm{run}}}{3}
\qquad\text{and}\qquad
t=\frac{2T_{\mathrm{run}}}{3}.
$$

If the middle-layer frequency changes, both plot windows should update so they still span three middle-layer cycles.

## Default State

The default state should be reproducible as JSON. The initial values are:

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
    "pairSeparation": 4,
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
    "basis": "linear",
    "linearAngleDeg": 0,
    "phaseLagDeg": 0,
    "ellipticity": 0,
    "intensity": 1,
    "analyzerAngleDeg": 0
  },
  "measurement": {
    "testPoint": { "x": 6, "y": 0, "z": 0 },
    "emissionSpeedCf": 1,
    "nearFieldWeight": 0.12,
    "fieldGain": 0.04
  }
}
```

The I/M/O default radii follow the Ideal Swarm $5:7:9$ ratio. The default frequencies use the Ideal Swarm initial layer cadences.

## Layout Requirements

The first screen should be the working diagnostic, not a landing page.

Required layout regions:

1. Top diagnostic region: two face-on flat Noether swarm views plus an edge-on side view of the same pair.
2. Lower observer-field region: external $\mathbf E$ and comparison $\mathbf B$ field readouts observed from the current candidate state.
3. Control region: compact controls for time, pair state, per-swarm I/M/O parameters, polarization, formulas, and presets.
4. Markdown document access: compact `MD` buttons for the photon guide, project packet, and requirements packet, using the same in-app Markdown viewer pattern as the Ideal Swarm app.

The pair should remain centered in the diagnostic region. Translation at $c_f$ should be represented by a propagation cue, phase advance, moving tick marks, or a viewport-followed centerline, rather than by allowing the swarms to drift off screen.

The swarm views should remain 2D. The app should not use a 3D renderer unless the requirements are explicitly revised.

Desktop layout should be optimized first. The preferred v1 desktop layout is:

- a full-viewport app surface;
- a two-swarm face-on stage occupying the main upper-left region, with an edge-on side view in the same stage;
- stacked three-cycle $\mathbf E$ and comparison $\mathbf B$ plots directly below the two-swarm stage;
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

The stage should also provide an edge-on side view of the photon candidate. In that view, each planar swarm should appear as a vertical trace whose length equals the diameter of the largest enabled binary. The trace should carry red and blue glow, and active architrino markers may move up and down along the trace to show the projected side-view orbit. The pair separation control should change the center-to-center distance between the two side-view traces along the $x$ axis, while the face-on circular orbit views keep a fixed visual spacing for readability. Pair separation uses the same dimensionless model length units as the I/M/O radii, but measures distance along the line of translation; a separation $s$ places the swarm centers at $x = -s/2$ and $x = +s/2$.

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

- test-point $x$ coordinate along the line of translation;
- test-point $y$ coordinate on the first transverse axis;
- test-point $z$ coordinate on the second transverse axis;
- field gain for keeping the analytic delayed-emission curve readable;
- and near-field mix for comparing a pure acceleration/radiation-style signal against a signal with a controlled signed near-field contribution.

Per swarm controls:

- enabled checkbox for each of the six binaries, default checked;
- layer frequency for I, M, and O;
- layer radius for I, M, and O;
- layer phase in degrees for I, M, and O;
- direction display locked to clockwise for one swarm and counter-clockwise for the other in v1;
- and a copy/mirror control so one swarm can inherit parameters from the other with sign or phase changes.

When a binary checkbox is unchecked, that binary is removed from the swarm display. The analytic delayed-emission formulas for $\mathbf E$ and comparison $\mathbf B$ should zero the contribution from both architrinos in that binary.

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
| pair separation | `4.00` | `0.05` to `50.00` | `0.05` |
| time speed | `1.00` | `0.10` to `4.00` | `0.05` |
| polarization angle | `0 deg` | `0` to `180 deg` | `1 deg` |
| phase lag | `0 deg` | `-180` to `180 deg` | `1 deg` |
| ellipticity | `0.00` | `-1.00` to `1.00` | `0.01` |
| intensity | `1.00` | `0.00` to `2.00` | `0.01` |
| analyzer angle | `0 deg` | `0` to `180 deg` | `1 deg` |
| test point $x$ | `6.00` | `-10.00` to `10.00` | `0.05` |
| test point $y$ | `0.00` | `-4.00` to `4.00` | `0.05` |
| test point $z$ | `0.00` | `-4.00` to `4.00` | `0.05` |
| near-field mix | `0.12` | `0.00` to `1.00` | `0.01` |
| field gain | `0.04` | `0.01` to `1.00` | `0.01` |

The test point $x$, $y$, and $z$ sliders should show a visible zero marker. Values within two slider steps of zero should snap to exactly `0`.

Each swarm should have its own I/M/O frequency, radius, and phase controls. The direction controls are visible but locked in v1: left trailing is counter-clockwise and right leading is clockwise.

## Polarization Requirements

The app needs a direct way to visualize polarization.

Required v1 polarization views:

- linear polarization angle in the transverse plane;
- circular polarization handedness indicator;
- ellipticity or phase-lag control for non-linear polarization states;
- analyzer angle control;
- projected accepted and rejected components for the current analyzer angle;
- and a visual link between the swarm-pair state and the observer-level polarization readout.

Useful additional controls:

- polarization basis selector: linear, circular, or elliptical;
- phase difference between the two transverse components;
- intensity scale;
- analyzer pass/reject toggle or split display;
- and a lock that ties polarization controls to I/M/O layer phases when a specific candidate mapping is being tested.

The app must keep the distinction between substrate animation and observer-level polarization formulas visible in the state model. A good visual match to Malus' law is a diagnostic target, not proof that the planar pair has supplied the required substrate ledger rows.

## Observer-Field Panel

The lower panel should show the external fields an observer would assign to the candidate state.

Required readouts:

- $\mathbf E$ vector or waveform;
- comparison $\mathbf B$ vector or waveform;
- propagation direction;
- phase relation between $\mathbf E$ and comparison $\mathbf B$;
- current polarization state;
- and current analyzer projection result when the analyzer is enabled.

The $\mathbf E$ / comparison $\mathbf B$ panel should support both vector and waveform forms if practical:

- vector mode for immediate phase and orientation inspection;
- waveform mode for frequency, phase, and intensity inspection over time.

## V1 Observer-Field Mapping

The first prototype should base the lower E-B plot on analytic delayed-emission calculations from the architrinos in the two swarms. This mapping is diagnostic-only and should not be treated as a photon-substrate derivation.

Let the propagation axis be $+\hat{\mathbf x}$, and let the transverse axes be $\hat{\mathbf y}$ and $\hat{\mathbf z}$. The measurement point is

$$
\mathbf X_{\mathrm{test}}
=
x_{\mathrm{test}}\hat{\mathbf x}
+y_{\mathrm{test}}\hat{\mathbf y}
+z_{\mathrm{test}}\hat{\mathbf z}.
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

where $\sigma_s=+1$ for the left trailing counter-clockwise swarm and $\sigma_s=-1$ for the right leading clockwise swarm. The delayed emission time $\tau_{s\ell q}$ for observer time $t$ is determined by

$$
\tau_{s\ell q}
=
t-\frac{|\mathbf X_{\mathrm{test}}-\mathbf r_{s\ell q}(\tau_{s\ell q})|}{c_f}.
$$

The v1 implementation may solve this causal-delay equation by a short fixed-point iteration over the analytic source position. With

$$
\mathbf n_i
=
\frac{\mathbf X_{\mathrm{test}}-\mathbf r_i(\tau_i)}
{|\mathbf X_{\mathrm{test}}-\mathbf r_i(\tau_i)|},
$$

and analytic source acceleration $\mathbf a_i(\tau_i)$, the provisional displayed contribution from source $i$ is

$$
\mathbf E_i(t)
=
g q_i
\left[
\frac{\mathbf n_i(\mathbf n_i\cdot\mathbf a_i)-\mathbf a_i}{R_i}
+\eta\frac{\mathbf n_i}{R_i^2}
\right],
$$

where $g$ is the field-gain display control, $\eta$ is the near-field mix control, and $R_i=|\mathbf X_{\mathrm{test}}-\mathbf r_i(\tau_i)|$. The displayed field is

$$
\mathbf E(t)=\sum_i\mathbf E_i(t).
$$

The comparison magnetic field is computed per delayed contribution and then summed:

$$
\mathbf B_{\mathrm{cmp}}(t)
=
\sum_i\frac{1}{c_f}\mathbf n_i\times\mathbf E_i(t).
$$

The lower field panel should draw two separate same-width plots with the same grid, cursor, and middle-cycle guide format. The $\mathbf E$ plot appears above the comparison $\mathbf B$ plot. The $\mathbf E$ plot should draw three full cycles of $E_y$ and $E_z$ from left to right. The comparison $\mathbf B$ plot should draw three full cycles of the displayed comparison $\mathbf B_{\mathrm{cmp}}$ components from left to right. The middle cycle should be bounded by the two vertical guide lines in both plots. Both plots should update immediately when frequency, radius, phase, pair separation, test-point coordinates, field gain, near-field mix, polarization analyzer angle, or reset state changes.

The analyzer projection should use

$$
\hat{\mathbf a}
=
\cos\theta\,\hat{\mathbf y}
+
\sin\theta\,\hat{\mathbf z},
$$

and the displayed pass measure should be

$$
\mu_{\mathrm{pass}}
=
\frac{|\hat{\mathbf a}\cdot\mathbf E|^2}
{|\mathbf E|^2+\varepsilon}.
$$

## Formula Panel

The formula panel should include Malus' law:

$$
I_{\mathrm{pass}}=I_0\cos^2\theta,
\qquad
P_{\mathrm{pass}}=\cos^2\theta.
$$

It should also reserve space for polarization formulas that help connect the app state to observer-level optics:

$$
\mathbf a_{\perp}
=
a_y\hat{\mathbf y}+a_z\hat{\mathbf z},
\qquad
\mu_{\mathrm{pass}}
=
\frac{|\hat{\mathbf a}\cdot\mathbf a_{\perp}|^2}
{|\mathbf a_{\perp}|^2+\varepsilon}.
$$

For circular basis diagnostics:

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
- Malus residual for the current analyzer angle;
- phase-lock indicators for I/M/O layers;
- and snapshot ID for exported parameter states.

These readouts should be named as diagnostics or residual-style indicators, not as theorem passes.

## Presets And Capture

The app should support reproducible exploration through:

- named presets;
- import/export of the full parameter state as JSON;
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
- the stacked $\mathbf E$ and comparison $\mathbf B$ plots draw left to right over exactly three middle-layer cycles;
- vertical guide lines bracket the middle cycle in both plots;
- I/M/O controls update both the visual swarms and exported state;
- test-point controls update both delayed-emission field plots and exported state;
- polarization and analyzer controls update formula-panel values;
- pause/play and reset controls work;
- exported JSON can be imported or replayed without losing values;
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
3. Which polarization controls should directly drive substrate parameters after the first prototype, and which should remain observer-level probes.
4. Whether the comparison $\mathbf B$ field should remain a derived observer field only or become a provisional substrate diagnostic.
5. Which exported snapshot format will be easiest for later simulation or proof packets to consume.
6. What local Noether sea state variables are needed before fixed $c_f$ can be replaced by local $c$.

## First Implementation Acceptance

The first implementation is acceptable when:

- two flat Noether swarm views render side by side;
- the left trailing swarm rotates counter-clockwise while the right leading swarm rotates clockwise;
- architrino markers, orbit paths, and layered trails match the Ideal Swarm visual grammar;
- I/M/O frequency, radius, and phase controls work for both swarms;
- six binary enabled checkboxes default checked, remove unchecked binaries from the display, and remove their delayed-emission contributions from both field plots;
- default I/M/O phases are all `0` degrees on both swarms;
- default I/M/O radii follow the `5:7:9` Ideal Swarm ratio;
- pair separation changes visibly between the two edge-on side-view traces without changing the face-on circular orbit spacing;
- pause/play, Space bar playback shortcut, and reset controls work;
- the lower $\mathbf E$ / comparison $\mathbf B$ panel draws separate stacked delayed-emission field plots at the configured test point left to right over three full cycles;
- vertical guide lines bracket the middle cycle in both field plots;
- polarization controls affect the observer-level readout;
- Malus' law is present with live numeric substitution;
- app state can be reset and exported;
- and the interface avoids 3D rendering, group rotation, and proof-status claims.
