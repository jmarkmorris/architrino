# Photon Guide

## What This App Shows

The photon app is an exploratory diagnostic for a candidate photon modeled as two contra-rotating flat Noether swarms. It is meant to help inspect the candidate geometry, Virtual Observer field readouts, and derived polarization diagnostics. It is not a proof of photon closure.

The left swarm is the trailing swarm and rotates counter-clockwise. The right swarm is the leading swarm and rotates clockwise. The app shows the swarms face-on so the I/M/O binary motion is visible; in the candidate geometry, the planar swarms are perpendicular to the line of translation.

## Main View

The upper stage shows the two face-on swarms on the left and an edge-on side view on the right. Each active I/M/O binary contributes one red positrino marker and one blue electrino marker. The face-on markers, orbit paths, and path-history trails follow the Ideal Swarm visual grammar.

The side view shows the same pair along the line of translation. Each planar swarm appears as a vertical glowing trace with the same height as the diameter of the largest enabled binary. The red and blue side-view markers move up and down along those traces, as they would when the orbit is viewed from the side.

The lower stage contains two observer-level readouts:

- Electric Field: the transverse electric-field readout reconstructed from the branch-weighted causal hits at the current Virtual Observer coordinate.
- Polarization: the transverse $E_y/E_z$ curve fitted from the actual branch-sum field over one reference cycle, with the current field vector and analyzer axis.

The plot covers three full middle-layer cycles. The white now line moves left to right, and the app leaves only a short forward gap ahead of that line blank so the waveform stays visible when time wraps around. For an ideal plane-wave comparison moving along $+\hat{\mathbf x}$, $\mathbf B$ is recovered from $\mathbf E$ by $\mathbf B=(1/c_f)\hat{\mathbf x}\times\mathbf E$, so it is not plotted as a separate graph.

## Basic Controls

Use the pause/play button to stop or resume the animation. The Space bar also toggles pause and play when focus is not inside a control.

Use Reset time to restart time at the beginning of the three-cycle plot. Use Reset all to restore the default photon candidate state.

Use Paths on/off to show or hide orbit paths and path-history trails.

Each of the six binaries has an enabled checkbox. When a binary is unchecked, it is removed from the swarm display and its two architrinos are removed from the Virtual Observer E field sum.

## Geometry Controls

The $\Delta x$ control changes the center-to-center distance between the two vertical traces in the side view as a ratio relative to the current reference radius $r_{\mathrm{ref}}$. The reference radius is the largest enabled binary radius, or the largest configured binary radius if every binary is disabled. The range is $10^{-10}r$ to $10^5r$, with selectable `1` through `9` coefficients in each decade. The absolute separation is $s = r_{\mathrm{ref}} 10^q$, where $q$ is the selected log value. The swarm centers sit at $x = -s/2$ and $x = +s/2$. The control does not change the spacing between the two face-on circular swarm views.

Each swarm has independent I/M/O controls:

- frequency sets the layer cadence;
- radius sets the layer orbit size;
- phase sets the starting angle in degrees.

The default I/M/O phases are all `0` degrees. The default I/M/O radii use the same `5:7:9` ratio as the Ideal Swarm app.

## Virtual Observer Controls

The Virtual Observer controls choose where the absolute-coordinate sample point is placed:

- `x` is the coordinate along the line of translation;
- `y` is the first transverse coordinate;
- `z` is the second transverse coordinate.

The `x`, `y`, and `z` sliders mark the zero point and snap values very close to zero to exactly `0`.

The plotted E curve is recalculated by solving the causal-root equation from every active architrino source history to the Virtual Observer point. Each retained root contributes a radial Master-EOM-style hit weighted by $1/(R^2 |J|)$, where $R$ is the source-to-observer distance at the root and $J$ is the delay-map Jacobian. The app then reconstructs the displayed $E_y$ and $E_z$ components from the transverse part of the summed receiver acceleration.

The $\mathbf E$ graph auto-scales its vertical span from the maximum visible $|E_y|$ or $|E_z|$ sample, so the curve stays readable without changing the diagnostic field values. The previous local-mix diagnostic is no longer needed because the branch-weighted receiver acceleration already uses the radial inverse-square causal-hit form.

## Derived Polarization

The app no longer asks the operator to set a polarization basis, linear angle, phase lag, ellipticity, or intensity. Those are now observer-level diagnostic outcomes. The formula panel fits the actual branch-sum $E_y(t)$ and $E_z(t)$ over one reference cycle, extracts the fitted amplitudes and relative phase lag, and classifies the result as weak, linear, circular, or elliptical.

The Analyzer angle remains a control because it is a measurement axis, not a source polarization factor. The inset overlays that analyzer axis and the formula panel reports the scalar analyzer fraction for the current field vector. The formula panel keeps the normalized ellipse-fit residual separate from the analyzer residual, which is the cycle-average analyzer fraction minus the fitted analyzer fraction.

Treat polarization agreement as a diagnostic signal. A useful fit can identify a parameter regime worth studying, but it does not by itself establish a physical photon branch.

## Diagnostics

The live Diagnostics panel includes a quality word when a readout has a useful direction. The words are `great`, `good`, `ok`, `poor`, and `bad`; neutral readouts use `info`.

| # | Name | ELI5 explanation |
|---:|---|---|
| 1 | Transverse&nbsp;amp | How strong the sideways electric readout is at the Virtual Observer. |
| 2 | Longitudinal&nbsp;leak | How much field points along the travel direction. For a clean transverse light-like readout, this should stay small. |
| 3 | Helicity&nbsp;estimate | A simple handedness check for the left counter-clockwise and right clockwise setup. |
| 4 | Fit&nbsp;residual | How far the fitted polarization curve misses the sampled branch-sum field. Smaller is a cleaner fit. |
| 5 | Mean&nbsp;delay | The average travel time from source history roots to the Virtual Observer. |
| 6 | Source&nbsp;count | How many active architrino sources are included. Each enabled binary contributes two sources. |
| 7 | Root&nbsp;count | How many causal roots were retained after solving source histories. More than source count means at least one source has multiple roots. |
| 8 | Max&nbsp;source&nbsp;v/c_f | The fastest active source speed compared with field speed. Above `1` means super-field-speed source motion is present; that is a regime indicator, not a delay-solve failure by itself. |
| 9 | Min \|J\| | The smallest Jacobian magnitude in the causal-root sum. Very small values mean the branch is close to a pile-up or caustic. |
| 10 | Missed&nbsp;sources | How many active source rows produced no retained root. For a clean solve, this should be `0`. |
| 11 | Delay&nbsp;solve&nbsp;gap | The largest leftover mismatch in the causal-delay equation. Smaller means the root solve is tighter. |
| 12 | Delay&nbsp;status | A simple stable/unstable flag based on root misses, delay gap, and small-Jacobian checks. |
| 13 | Left&nbsp;phase&nbsp;spread | How evenly the left swarm's I/M/O phases are spaced. |
| 14 | Right&nbsp;phase&nbsp;spread | How evenly the right swarm's I/M/O phases are spaced. |

## Formulas

The live Formulas panel reports the current branch-sum field, the one-cycle polarization fit, the Analyzer-axis comparison, and the Stokes-style fitted polarization components. The Stokes rows put the formula first and the conventional shorthand in parentheses.

| # | Name | ELI5 explanation |
|---:|---|---|
| 1 | derived&nbsp;mode | The fitted polarization type: weak field, linear, circular, or elliptical. |
| 2 | fit&nbsp;amp&nbsp;E_y | How tall the fitted E_y wave is over one reference cycle. |
| 3 | fit&nbsp;amp&nbsp;E_z | How tall the fitted E_z wave is over one reference cycle. |
| 4 | fit&nbsp;E_z/E_y | How large the fitted E_z amplitude is compared with the fitted E_y amplitude. Near `1` means the two fitted components are about equally strong. |
| 5 | fit&nbsp;lag | The signed phase difference between the fitted $E_z$ and $E_y$ waves. It is `n/a` when the field is too weak or too close to one axis to define a useful lag. |
| 6 | fit&nbsp;residual | How far the fitted polarization curve misses the sampled branch-sum field. Smaller is a cleaner one-cycle fit. |
| 7 | fit&nbsp;analyzer&nbsp;fraction | The fraction predicted by the fitted polarization curve along the current Analyzer angle. |
| 8 | mu&nbsp;analyzer | The current branch-sum field vector's analyzer fraction at the now line. |
| 9 | cycle&nbsp;average | The average instantaneous analyzer fraction sampled over the three-cycle run. |
| 10 | analyzer&nbsp;residual | The cycle average minus the fitted analyzer fraction. Closer to `0` means the analyzer summary agrees better with the raw sampled field. |
| 11 | source&nbsp;count | How many active architrino sources are included in the branch-sum field. |
| 12 | root&nbsp;count | How many causal roots were retained after solving the source histories. |
| 13 | mean&nbsp;delay | The average travel time from retained source roots to the Virtual Observer. |
| 14 | nearest&nbsp;source | The closest retained source-to-observer distance in the current causal-root sum. |
| 15 | $A_y^2 + A_z^2$ ($S_0$) | The fitted total transverse strength. |
| 16 | $A_y^2 - A_z^2$ ($S_1$) | The fitted strength imbalance between the two transverse components. |
| 17 | $2A_yA_z\cos\delta$ ($S_2$) | The fitted in-phase or anti-phase linear component. |
| 18 | $-2A_yA_z\sin\delta$ ($S_3$) | The fitted handed circular or elliptical component. |
