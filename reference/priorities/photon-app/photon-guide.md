# Photon Guide

## What This App Shows

The photon app is an exploratory diagnostic for a candidate photon modeled as two contra-rotating flat Noether swarms. It is meant to help inspect the candidate geometry, Virtual Observer field readouts, and derived polarization diagnostics. It is not a proof of photon closure.

The left swarm is the trailing swarm and rotates counter-clockwise. The right swarm is the leading swarm and rotates clockwise. The app shows the swarms face-on so the I/M/O binary motion is visible; in the candidate geometry, the planar swarms are perpendicular to the line of translation.

## Main View

The upper stage shows the two face-on swarms on the left and an edge-on side view on the right. Each active I/M/O binary contributes one red positrino marker and one blue electrino marker. The face-on markers, orbit paths, and path-history trails follow the Ideal Swarm visual grammar.

The side view shows the same pair along the line of translation. Each planar swarm appears as a vertical glowing trace with the same height as the diameter of the largest enabled binary. The red and blue side-view markers move up and down along those traces, as they would when the orbit is viewed from the side.

The lower stage contains two observer-level readouts:

- Virtual Observer E plot: the transverse electric readout reconstructed from the branch-weighted causal hits at the current Virtual Observer coordinate.
- Polarization inset: the transverse $E_y/E_z$ curve fitted from the actual branch-sum field over one reference cycle, with the current field vector, analyzer axis, pass projection, and reject component.

The plot covers three full middle-layer cycles. The white now line moves left to right, and the app leaves only a short forward gap ahead of that line blank so the waveform stays visible when time wraps around. For an ideal plane-wave comparison moving along $+\hat{\mathbf x}$, $\mathbf B$ is recovered from $\mathbf E$ by $\mathbf B=(1/c_f)\hat{\mathbf x}\times\mathbf E$, so it is not plotted as a separate graph.

## Basic Controls

Use the pause/play button to stop or resume the animation. The Space bar also toggles pause and play when focus is not inside a control.

Use Reset time to restart time at the beginning of the three-cycle plot. Use Reset all to restore the default photon candidate state.

Use Paths on/off to show or hide orbit paths and path-history trails.

Each of the six binaries has an enabled checkbox. When a binary is unchecked, it is removed from the swarm display and its two architrinos are removed from the Virtual Observer E field sum.

## Geometry Controls

The `Sep/r` control changes the center-to-center distance between the two vertical traces in the side view as a ratio relative to the current reference radius $r_{\mathrm{ref}}$. The reference radius is the largest enabled binary radius, or the largest configured binary radius if every binary is disabled. The range is `1e-10 r` to `1e5 r`, with selectable `1` through `9` ticks in each decade. The absolute separation is $s = r_{\mathrm{ref}} 10^q$, where $q$ is the selected log value. The swarm centers sit at $x = -s/2$ and $x = +s/2$. The control does not change the spacing between the two face-on circular swarm views.

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

The Analyzer angle remains a control because it is a measurement axis, not a source polarization factor. The inset overlays that analyzer axis and shows the pass projection and reject component for the current field vector.

Treat polarization agreement as a diagnostic signal. A useful fit can identify a parameter regime worth studying, but it does not by itself establish a physical photon branch.
