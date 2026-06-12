# Photon Guide

## What This App Shows

The photon app is an exploratory diagnostic for a candidate photon modeled as two contra-rotating flat Noether swarms. It is meant to help inspect the candidate geometry, delayed field readouts, and polarization controls. It is not a proof of photon closure.

The left swarm is the trailing swarm and rotates counter-clockwise. The right swarm is the leading swarm and rotates clockwise. The app shows the swarms face-on so the I/M/O binary motion is visible; in the candidate geometry, the planar swarms are perpendicular to the line of translation.

## Main View

The upper stage shows the two swarms side by side. Each active I/M/O binary contributes one red positrino marker and one blue electrino marker. The markers, orbit paths, and path-history trails follow the Ideal Swarm visual grammar.

The lower stage contains two stacked plots:

- Delayed E plot: the transverse electric readout computed from the delayed emissions of the active architrinos at the current test point.
- Comparison B plot: the corresponding comparison magnetic readout from the same delayed-emission calculation.

Both plots cover three full middle-layer cycles. The vertical guide lines mark the start and end of the middle cycle so the central cycle can be inspected without edge effects.

## Basic Controls

Use the pause/play button to stop or resume the animation. The Space bar also toggles pause and play when focus is not inside a control.

Use Reset to restart time at the beginning of the three-cycle plot. Use Reset all to restore the default photon candidate state.

Use Paths on/off to show or hide orbit paths and path-history trails.

Each of the six binaries has an enabled checkbox. When a binary is unchecked, it is removed from the swarm display and its two architrinos are removed from the delayed E and comparison B field sums.

## Geometry Controls

The pair separation control changes the distance between the trailing and leading swarm centers along the line of translation.

Each swarm has independent I/M/O controls:

- frequency sets the layer cadence;
- radius sets the layer orbit size;
- phase sets the starting angle in degrees.

The default I/M/O phases are `0`, `120`, and `240` degrees. The default I/M/O radii use the same `5:7:9` ratio as the Ideal Swarm app.

## Measurement Controls

The test point controls choose where the external fields are measured:

- `x` is the coordinate along the line of translation;
- `u` is the first transverse coordinate;
- `v` is the second transverse coordinate.

The plotted E and comparison B curves are recalculated from the active architrino positions and the current test point. Field gain only rescales the displayed curve so it stays readable. Near-field mix blends in a controlled near-field contribution for diagnostic comparison.

## Polarization Controls

The polarization panel exposes a basis, linear angle, phase lag, ellipticity, intensity, and analyzer angle. The formula panel reports Malus-law and Stokes-style readouts for the current analyzer setup.

Treat polarization agreement as a diagnostic signal. A useful fit can identify a parameter regime worth studying, but it does not by itself establish a physical photon branch.

## JSON State

The JSON panel holds the current reproducible state. Export refreshes the text from the live controls. Import applies the JSON text back into the app after normalization.

Use this panel when a parameter set becomes important enough to preserve for a later preset, proof packet, or simulation comparison.
