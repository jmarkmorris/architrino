# Photon Guide

## What This App Shows

The photon app is an exploratory diagnostic for a candidate photon modeled as two contra-rotating flat Noether swarms. It is meant to help inspect the candidate geometry, Virtual Observer field readouts, and derived polarization diagnostics. It is not a proof of photon closure.

The left swarm is the trailing swarm and rotates counter-clockwise. The right swarm is the leading swarm and rotates clockwise. The app shows the swarms face-on so the I/M/O binary motion is visible; in the candidate geometry, the planar swarms are perpendicular to the line of translation.

## Main View

The upper stage shows the two face-on swarms on the left and an edge-on side view on the right. Each active I/M/O binary contributes one red positrino marker and one blue electrino marker. The face-on markers, orbit paths, and path-history trails follow the Ideal Swarm visual grammar.

The side view shows the same pair along the line of translation. Each planar swarm appears as a vertical glowing trace with the same height as the diameter of the largest enabled binary. The red and blue side-view markers move up and down along those traces, as they would when the orbit is viewed from the side.

The lower stage contains two observer-level readouts:

- Electric Field: the transverse electric-field readout reconstructed from the branch-weighted causal hits at the current Virtual Observer coordinate.
- Polarization: the transverse $E_y/E_z$ curve fitted from the actual branch-sum field over one reference cycle, with the current field vector, analyzer axis, and optional raw one-cycle points.

The plot covers three full middle-layer cycles. The white now line moves left to right, and the app leaves only a short forward gap ahead of that line blank so the waveform stays visible when time wraps around. For an ideal plane-wave comparison moving along $+\hat{\mathbf x}$, $\mathbf B$ is recovered from $\mathbf E$ by $\mathbf B=(1/c_f)\hat{\mathbf x}\times\mathbf E$, so it is not plotted as a separate graph.

## Basic Controls

Use the pause/play button to stop or resume the animation. The Space bar also toggles pause and play when focus is not inside a control.

Use the Preset menu to load a named exploratory candidate. Loading a preset resets the animation time and replaces the current controls with the preset values.

Use Reset preset to return to the last loaded preset after making local edits. Use Reset time to restart time at the beginning of the three-cycle plot. Use Reset all to restore the default balanced pair.

Use Paths on/off to show or hide orbit paths and path-history trails.

Use Slow/Fast to scale animation time without changing the configured layer frequencies. The default Slow/Fast setting is calibrated to make the default I/M/O orbit rates visible at `0.8`, `0.4`, and `0.2` cycles per real second.

Each of the six binaries has an enabled checkbox. When a binary is unchecked, it is removed from the swarm display and its two architrinos are removed from the Virtual Observer E field sum.

## Named Presets

Presets are starting points for inspection, not certified photon branches. They change the same visible controls that a reader can edit by hand.

| Preset | What it sets up | How to read it |
|---|---|---|
| Balanced pair | All binaries enabled, I/M/O frequencies `4`, `2`, `1`, speed-matched default radii, and all phases at `0` degrees. | Baseline contra-rotating pair for comparing later edits. |
| Linear candidate | Only the O binaries enabled, with both swarms phase-aligned. | A simple one-axis transverse readout candidate. |
| Right circular candidate | All binaries enabled with a handed leading/trailing phase pattern. | A handed phase-lock candidate; it is not a certified circular photon branch. |
| Left circular candidate | The mirror handed phase pattern of the right-circular candidate. | A comparison state for reversing the fitted handed component. |
| Phase-offset stress | All binaries enabled, nonzero observer position, small $\Delta x$, and nontrivial phase offsets. | A stress test for the causal-root solver and polarization fit. |
| Layer-radius stress | All binaries enabled with deliberately uneven I/M/O radii. | A stress test for radius sensitivity and side-view scaling. |

## Configuration Search

The Search configurations button looks for photon settings that are worth inspecting more closely. It starts from the current app settings, then tries nearby or systematic variations of the enabled binaries, I/M/O frequency powers, radius lanes, phase offsets, $\Delta x$, Virtual Observer position, Analyzer angle, and available speed mode.

The search generates a results list for the current session. The interactive search is intentionally bounded: it samples representative configuration families rather than trying every possible combination. Each result should include a short name, the full settings snapshot, the main plot and polarization summary, the diagnostics that made it stand out, and a plain-language reason to inspect it. When the absolute-history solver path is available, top results also record a compact comparison between the co-moving diagnostic and the absolute-history moving-apparatus diagnostic. Loading a result applies its settings to the app so it can be viewed, played, edited, or compared against a named preset.

Useful results can be exported as JSON. Exported settings can later be reviewed and, when they are worth keeping, incorporated into the named preset set. Until a result is promoted that way, treat it as a session finding rather than a durable app preset.

The search should flag a configuration as interesting when it has one or more of these traits:

- Clean polarization behavior: strong linear, circular, or elliptical fit, low fit residual, and stable phase lag across cycles.
- Strong cancellation: many active binaries but a small net transverse field at the Virtual Observer.
- Sharp transitions: small changes in phase, $\Delta x$, Virtual Observer position, or radius produce a large change in the fitted polarization.
- Robust patterns: the same behavior survives small nudges to the settings instead of depending on one exact slider position.
- Absolute-history agreement or divergence: the absolute-history comparison either preserves the co-moving behavior, which is a stability clue, or changes it strongly, which is a useful stress clue.
- Causal-root structure: low missed-source count, healthy Jacobian values, repeatable phase-at-hit families, or organized same-source and partner-hit roots.
- Simple explanations: fewer active binaries, integer frequency ratios, simple phase offsets, or clean leading/trailing symmetry are preferred when the diagnostic quality is similar.
- Diversity: the results list should avoid many tiny variations of the same pattern and keep representative examples from different pattern families.

The search should mark numerically suspect cases as suspect rather than good. Missed roots, very small Jacobian values, large delay-solve gaps, or unstable diagnostics can still be useful clues, but they should not be confused with clean polarization evidence.

## Geometry Controls

The $\Delta x$ control changes the center-to-center distance between the two vertical traces in the side view as a ratio relative to the current reference radius $r_{\mathrm{ref}}$. The reference radius is the largest enabled binary radius, or the largest configured binary radius if every binary is disabled. The range is $10^{-10}r$ to $10^5r$, with selectable `1` through `9` coefficients in each decade. The absolute separation is $s = r_{\mathrm{ref}} 10^q$, where $q$ is the selected log value. The swarm centers sit at $x = -s/2$ and $x = +s/2$. The control does not change the spacing between the two face-on circular swarm views.

Each swarm has independent I/M/O controls:

- frequency sets the layer cadence as powers of two, from $2^0$ through $2^5$;
- radius sets the layer orbit size;
- phase sets the starting angle in degrees.

The default I/M/O phases are all `0` degrees. The default I/M/O frequencies are `4`, `2`, and `1`. The default radii are chosen from $v=2\pi r f$ so the I layer is super-$c_f$, the M layer is at $c_f$, and the O layer is below $c_f$.

## Virtual Observer Controls

The Virtual Observer controls choose where the sample point is placed in the app's coordinate frame:

- `x` is the coordinate along the line of translation;
- `y` is the first transverse coordinate;
- `z` is the second transverse coordinate.

The `x`, `y`, and `z` sliders mark the zero point and snap values very close to zero to exactly `0`.

`Signal c/c_f` sets the causal signal speed used by the current root solve. At the default value `1.00`, the branch signal speed is $c_f$. Lower values let the diagnostic inspect slower local-signal regimes.

`Photon c_\gamma/c_f` sets the photon-channel translation speed used when `Absolute history` is enabled.

`Absolute history` switches the solver request from the co-moving circular-source diagnostic to a segmented absolute-history diagnostic. In that mode, each architrino source history and the Virtual Observer history translate along $+\hat{\mathbf x}$ at $c_\gamma$, and the central solver bridge solves the retained roots on short moving linear segments. This is an approximation layer for the moving-apparatus calculation; the co-moving mode remains useful for comparison.

The plotted E curve is recalculated by solving the causal-root equation from every active architrino source history to the Virtual Observer point. Each retained root contributes a radial Master-EOM-style hit weighted by $1/(R^2 |J|)$, where $R$ is the source-to-observer distance at the root and $J$ is the delay-map Jacobian. The app then reconstructs the displayed $E_y$ and $E_z$ components from the transverse part of the summed receiver acceleration.

The $\mathbf E$ graph auto-scales its vertical span from the maximum visible $|E_y|$ or $|E_z|$ sample, so the curve stays readable without changing the diagnostic field values. The displayed field comes directly from retained roots and the radial inverse-square causal-hit form rather than from a separate near/far mixing slider.

The app's diagnostic calculation can be written explicitly. The Virtual Observer coordinate is

$$
\mathbf X_{\mathrm{VO}}
=
x_{\mathrm{VO}}\hat{\mathbf x}
+y_{\mathrm{VO}}\hat{\mathbf y}
+z_{\mathrm{VO}}\hat{\mathbf z}
$$

In co-moving mode, for swarm $s$, layer $\ell$, and polarity sign $q\in\{+1,-1\}$, the app places the source at

$$
\mathbf r_{s\ell q}(\tau)
=
x_s\hat{\mathbf x}
+R_{s\ell}\cos\theta_{s\ell q}(\tau)\hat{\mathbf y}
+R_{s\ell}\sin\theta_{s\ell q}(\tau)\hat{\mathbf z}
$$

with

$$
\theta_{s\ell q}(\tau)
=
\phi_{s\ell}
+\sigma_s2\pi f_{s\ell}\tau
+\pi\,\mathbf 1_{q=-1}
$$

Here $\sigma_s=+1$ for the trailing counter-clockwise swarm and $\sigma_s=-1$ for the leading clockwise swarm.

In absolute-history mode, the same circular source history is evaluated in short moving segments. The segment start point includes the translated center term $c_\gamma\tau\hat{\mathbf x}$, and the Virtual Observer segment includes $c_\gamma t\hat{\mathbf x}$. This makes the root solve ask whether a source history point moving with the photon channel can causally reach the moving Virtual Observer.

For each active source row $i=(s,\ell,q)$, the retained source times solve

$$
F_i(t;\tau)
=
\left\|
\mathbf X_{\mathrm{VO}}-\mathbf r_i(\tau)
\right\|
-c_{\mathrm{sig}}(t-\tau)
=0,
\qquad
\tau<t
$$

For each retained root $\tau_{i,k}$, define

$$
\mathbf n_{i,k}
=
\frac{\mathbf X_{\mathrm{VO}}-\mathbf r_i(\tau_{i,k})}
{\left\|\mathbf X_{\mathrm{VO}}-\mathbf r_i(\tau_{i,k})\right\|},
\qquad
R_{i,k}
=
\left\|
\mathbf X_{\mathrm{VO}}-\mathbf r_i(\tau_{i,k})
\right\|
$$

and

$$
J_{i,k}
=
1-\frac{\mathbf v_i(\tau_{i,k})\cdot\mathbf n_{i,k}}{c_{\mathrm{sig}}}
$$

The displayed electric readout is reconstructed from the transverse part of the Jacobian-weighted radial hit sum

$$
\mathbf a_{\mathrm{VO}}(t)
=
g\sum_i\sum_k
q_i
\frac{\mathbf n_{i,k}}
{R_{i,k}^2 |J_{i,k}|}
$$

by taking

$$
\mathbf E_{\perp}(t)
=
\left(\mathbf a_{\mathrm{VO}}(t)\cdot\hat{\mathbf y}\right)\hat{\mathbf y}
+
\left(\mathbf a_{\mathrm{VO}}(t)\cdot\hat{\mathbf z}\right)\hat{\mathbf z}
$$

This is a Virtual Observer diagnostic. It uses Master-EOM-style causal hits to inspect a candidate branch, but it does not prove that the displayed state is a physical photon.

## Derived Polarization

The app treats polarization basis, linear angle, phase lag, ellipticity, and intensity as observer-level diagnostic outcomes rather than source-side controls. The formula panel fits the actual branch-sum $E_y(t)$ and $E_z(t)$ over one reference cycle, extracts the fitted amplitudes and relative phase lag, and classifies the result as weak, linear, circular, or elliptical. The polarization inset draws the fitted oscillating component centered on the $E_y/E_z$ origin, so a constant observer bias does not shift the ellipse or line.

Show raw polarization points is on by default. It draws the sampled one-cycle branch-sum points behind the fitted curve. If the points sit close to the fitted curve, the fit is visually clean. If they spread away from it, the polarization label should be treated with more caution.

The one-cycle fit uses

$$
E_y(t)\approx A_y\cos(\omega t+\phi_y),
\qquad
E_z(t)\approx A_z\cos(\omega t+\phi_z)
$$

with phase lag $\Delta\phi=\phi_z-\phi_y$.

The Analyzer angle remains a control because it is a measurement axis, not a source polarization factor. The inset overlays that analyzer axis and the formula panel reports the scalar analyzer fraction for the current field vector. The formula panel keeps the normalized ellipse-fit residual separate from the analyzer residual, which is the cycle-average analyzer fraction minus the fitted analyzer fraction.

The analyzer axis is

$$
\hat{\mathbf a}
=
\cos\theta\,\hat{\mathbf y}
+
\sin\theta\,\hat{\mathbf z}
$$

and the displayed analyzer fraction is

$$
\mu_{\mathrm{analyzer}}
=
\frac{|\hat{\mathbf a}\cdot\mathbf E|^2}
{|\mathbf E|^2+\varepsilon}
$$

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
| 10 | Self-hit&nbsp;roots | How many enabled binary layers produced a retained same-source self-hit span row in the shared-geometry solver. |
| 11 | Self-hit&nbsp;max&nbsp;$v/c_{\mathrm{sig}}$ | The largest same-source speed ratio after combining photon-channel translation speed with transverse orbital speed. Values above `1` nominate a self-hit candidate regime. |
| 12 | Missed&nbsp;sources | How many active source rows produced no retained root. For a clean solve, this should be `0`. |
| 13 | Delay&nbsp;solve&nbsp;gap | The largest leftover mismatch in the causal-delay equation. Smaller means the root solve is tighter. |
| 14 | Delay&nbsp;status | A simple stable/unstable flag based on root misses, delay gap, and small-Jacobian checks. |
| 15 | Left&nbsp;phase&nbsp;spread | How evenly the left swarm's I/M/O phases are spaced. |
| 16 | Right&nbsp;phase&nbsp;spread | How evenly the right swarm's I/M/O phases are spaced. |

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
