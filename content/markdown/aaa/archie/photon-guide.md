# Photon Guide

The photon app is an inspection workbench, not a proof document. It lets a reader inspect whether a paired planar Noether braid candidate can produce coherent field and polarization readouts before the full photon proof is available.

## What This App Shows

The photon app is an exploratory diagnostic for a candidate photon modeled as two contra-rotating flat Noether braids. It is meant to help inspect the candidate geometry, Virtual Observer field readouts, and derived polarization diagnostics. It is not a proof of photon closure.

The left braid is the trailing braid and rotates counter-clockwise. The right braid is the leading braid and rotates clockwise. The app shows the braids face-on so the binary 1/2/3 motion is visible; in the candidate geometry, the planar braids are perpendicular to the line of translation.

## Main View

The upper stage shows the two face-on braids on the left and an edge-on side view on the right. Each active indexed binary contributes one blue electrino marker and one red positrino marker. The face-on markers, orbit paths, and path-history trails follow the A1 Lorentz Geometry visual grammar.

The side view shows the same pair along the line of translation. Each planar braid appears as a vertical glowing trace with the same height as the diameter of the largest enabled binary. The red and blue side-view markers move up and down along those traces, as they would when the orbit is viewed from the side.

The lower stage contains two observer-level readouts:

- Electric Field: the transverse electric-field readout reconstructed from the branch-weighted causal hits at the current Virtual Observer coordinate.
- Polarization: the reference-frequency component fitted from the actual branch-sum field over the slowest enabled layer's common period, with the current field vector, analyzer axis, and optional raw common-period points.

The plot covers three full reference-channel cycles. The white now line moves left to right, and the app leaves only a short forward gap ahead of that line blank so the waveform stays visible when time wraps around. For an ideal plane-wave comparison moving along $+\hat{\mathbf x}$, $\mathbf B$ is recovered from $\mathbf E$ by $\mathbf B=(1/c_f)\hat{\mathbf x}\times\mathbf E$, so it is not plotted as a separate graph.

## Basic Controls

Use the pause/play button to stop or resume the animation. The Space bar also toggles pause and play when focus is not inside a control.

Use the Preset menu to load a named exploratory candidate. Loading a preset resets the animation time and replaces the current controls with the preset values.

Use Reset preset to return to the last loaded preset after making local edits. Use Reset time to restart time at the beginning of the three-cycle plot. Use Reset all to restore the default balanced pair.

Use Paths on/off to show or hide orbit paths and path-history trails.

Use Slow/Fast to scale animation time without changing the configured binary frequencies. The default Slow/Fast setting is calibrated to make the default binary 1/2/3 orbit rates visible at `0.8`, `0.4`, and `0.2` cycles per real second.

Use Cycle reference to choose which indexed layer defines one plotted cycle, and Plotted cycles to choose a run length from `1` through `12` reference cycles. The polarization fit still uses the slowest enabled layer's common period so changing the plot window does not reintroduce slower-layer leakage into the reference-frequency fit.

Each of the six binaries has an enabled checkbox. When a binary is unchecked, it is removed from the braid display and its two architrinos are removed from the Virtual Observer E field sum.

## Named Presets

Presets are starting points for inspection, not certified photon branches. They change the same visible controls that a reader can edit by hand.

| Preset | What it sets up | How to read it |
|---|---|---|
| Balanced pair | All binaries enabled, indexed frequencies `4`, `2`, `1`, speed-matched default radii, and all phases at `0` degrees. | Baseline contra-rotating pair for comparing later edits. |
| Linear candidate | Only the O binaries enabled, with both braids phase-aligned. | A simple one-axis transverse readout candidate. |
| Right circular candidate | All binaries enabled with a handed leading/trailing phase pattern. | A handed phase-lock candidate; it is not a certified circular photon branch. |
| Left circular candidate | The mirror handed phase pattern of the right-circular candidate. | A comparison state for reversing the fitted handed component. |
| Phase-offset stress | All binaries enabled, nonzero observer position, small $\Delta x$, and nontrivial phase offsets. | A stress test for the causal-root solver and polarization fit. |
| Binary-radius stress | All binaries enabled with deliberately uneven indexed radii. | A stress test for radius sensitivity and side-view scaling. |

## Configuration Search

The Search configurations button looks for photon settings that are worth inspecting more closely. It starts from the current app settings, then tries nearby or systematic variations of the enabled binaries, indexed frequency powers, radius lanes, phase offsets, $\Delta x$, Virtual Observer position, Analyzer angle, and speed mode. The search includes a small set of `Lorentz factor` local-$c$ candidates so the results can expose configurations where derived $c_{\mathrm{sig}}/c_f$ and $c_\gamma/c_f$ materially change the moving-apparatus solve.

The search generates a results list for the current session. The interactive search is intentionally bounded: it samples representative configuration families rather than trying every possible combination. Each result should include a short name, the full settings snapshot, the main plot and polarization summary, the diagnostics that made it stand out, and a plain-language reason to inspect it. When the absolute-history solver path is available, top results also record a compact comparison between the co-moving diagnostic and the absolute-history moving-apparatus diagnostic. Interactive search defers the expensive same-transmitter self-hit sweep; helical phase-family records remain available through the dedicated sweep workflow. Loading a result applies its settings to the app so it can be viewed, played, edited, or compared against a named preset.

Useful results can be exported as JSON. Exported settings can later be reviewed and, when they are worth keeping, incorporated into the named preset set. Until a result is promoted that way, treat it as a session finding rather than a durable app preset.

The search should flag a configuration as interesting when it has one or more of these traits:

- Clean polarization behavior: strong linear, circular, or elliptical fit, low fit residual, and stable phase lag across cycles.
- Strong cancellation: many active binaries but a small net transverse field at the Virtual Observer.
- Sharp transitions: small changes in phase, $\Delta x$, Virtual Observer position, or radius produce a large change in the fitted polarization.
- Robust patterns: the same behavior survives small nudges to the settings instead of depending on one exact slider position.
- Absolute-history agreement or divergence: the absolute-history comparison either preserves the co-moving behavior, which is a stability clue, or changes it strongly, which is a useful stress clue.
- Causal-root structure: low missed-transmitter count, healthy Jacobian values together with a bounded transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/|D_t|$, signed root playback $D_r/D_t$, repeatable phase-at-hit families, or organized same-transmitter and partner-hit roots.
- Simple explanations: fewer active binaries, integer frequency ratios, simple phase offsets, or clean leading/trailing symmetry are preferred when the diagnostic quality is similar.
- Diversity: the results list should avoid many tiny variations of the same pattern and keep representative examples from different pattern families.

The search should mark numerically suspect cases as suspect rather than good. Missed roots, very small Jacobian values, a transmitter-side acceleration weight collapsing toward its null or diverging near a caustic, large delay-solve gaps, or unstable diagnostics can still be useful clues, but they should not be confused with clean polarization evidence.

## Geometry Controls

The $\Delta x$ control changes the center-to-center distance between the two vertical traces in the side view as a ratio relative to the current reference radius $r_{\mathrm{ref}}$. The reference radius is the largest enabled binary radius, or the largest configured binary radius if every binary is disabled. The range is $10^{-10}r$ to $10^5r$, with selectable `1` through `9` coefficients in each decade. The absolute separation is $s = r_{\mathrm{ref}} 10^q$, where $q$ is the selected log value. The braid centers sit at $x = -s/2$ and $x = +s/2$. The control does not change the spacing between the two face-on circular braid views.

Each braid has independent binary 1/2/3 controls:

- frequency sets the layer cadence as powers of two, from $2^0$ through $2^5$;
- radius sets the layer orbit size;
- phase sets the starting angle in degrees.

The default indexed phases are all `0` degrees. The default indexed frequencies are `4`, `2`, and `1`. The default radii are chosen from $v=2\pi r f$ so binary 1 is super-$c_f$, binary 2 is at $c_f$, and binary 3 is below $c_f$. These speed roles belong to the displayed source record, not to the taxonomy.

## Virtual Observer Controls

The Virtual Observer controls choose where the sample point is placed in the app's coordinate frame:

- `x` is the coordinate along the line of translation;
- `y` is the first transverse coordinate;
- `z` is the second transverse coordinate.

The `x`, `y`, and `z` sliders mark the zero point and snap values very close to zero to exactly `0`.

`Local c mode` chooses how the app sets the speeds used by the moving-apparatus solver. `Direct` uses the two speed sliders. `Lorentz factor` derives both speeds from `Local γ` as a first chart-style approximation of local $c/c_f$.

`Signal c/c_f` sets the causal signal speed used by the current root solve. At the default value `1.00`, the branch signal speed is $c_f$. Lower values let the diagnostic inspect slower local-signal regimes.

`Photon c_\gamma/c_f` sets the photon-channel translation speed used by the default `Absolute history` calculation.

When `Local c mode` is `Lorentz factor`, the `Signal c/c_f` and `Photon c_\gamma/c_f` sliders become readouts for the derived value. Change `Local γ` to change the solver speed in that mode.

`Absolute history` makes the Electric Field plot use the moving-apparatus diagnostic. In that mode, each architrino transmitter history and the Virtual Observer history translate along $+\hat{\mathbf x}$ at $c_\gamma$, and the shared solver helper solves the moving circular transmitter against the moving Virtual Observer. This remains a diagnostic layer for the moving-apparatus calculation; the co-moving mode remains useful for comparison.

The plotted E curve is recalculated by solving the causal-root equation from every active architrino transmitter history to the Virtual Observer point. Each retained root contributes a radial Master-EOM-style hit weighted by $W^{\mathrm{acc}}/R^2$, where $R$ is the transmitter-to-observer distance at the root and $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$ is computed from the same retained root record. The app then reconstructs the displayed $E_y$ and $E_z$ components from the transverse part of the summed receiver acceleration.

The $\mathbf E$ graph auto-scales its vertical span from the maximum visible $|E_y|$ or $|E_z|$ sample, so the curve stays readable without changing the diagnostic field values. The displayed field comes directly from retained roots and the radial inverse-square causal-hit form rather than from a separate near/far mixing slider.

The app's diagnostic calculation can be written explicitly. The Virtual Observer coordinate is

$$
\mathbf X_{\mathrm{VO}}
=
x_{\mathrm{VO}}\hat{\mathbf x}
+y_{\mathrm{VO}}\hat{\mathbf y}
+z_{\mathrm{VO}}\hat{\mathbf z}
$$

In co-moving mode, for braid $s$, layer $\ell$, and polarity sign $q\in\{+1,-1\}$, the app places the source at

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

Here $\sigma_s=+1$ for the trailing counter-clockwise braid and $\sigma_s=-1$ for the leading clockwise braid.

In absolute-history mode, the same circular transmitter history carries the translated center term $c_\gamma\tau\hat{\mathbf x}$, and the Virtual Observer history includes $c_\gamma t\hat{\mathbf x}$. This makes the root solve ask whether a transmitter history point moving with the photon channel can causally reach the moving Virtual Observer. Retained roots also carry transmitter phase-at-hit metadata so later diagnostics can ask whether stable phase families are emerging.

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
D_{t,i,k}
=
c_{\mathrm{sig}}-\mathbf v_i(\tau_{i,k})\cdot\mathbf n_{i,k},
\qquad
D_{r,i,k}
=
c_{\mathrm{sig}}-\mathbf v_{\mathrm{VO}}(t)\cdot\mathbf n_{i,k}
$$

The displayed electric readout is reconstructed from the transverse part of the receiver-side radial hit sum

$$
\mathbf a_{\mathrm{VO}}(t)
=
g\sum_i\sum_k
q_i
\frac{c_{\mathrm{sig}}}{|D_{t,i,k}|}
\frac{\mathbf n_{i,k}}
{R_{i,k}^2}
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

Both calculation modes use the same display regularization, $R_{\mathrm{display}}=\max(R,0.08)$ in app-coordinate units, in the inverse-square denominator. The direction vector remains normalized from the unregularized displacement, so the floor limits only the near-source magnitude. This is a numerical display safeguard, not a derived short-distance law.

## Derived Polarization

The app treats polarization basis, linear angle, phase lag, ellipticity, and intensity as observer-level diagnostic outcomes rather than transmitter-side controls. The formula panel fits the reference-frequency component of the actual branch-sum $E_y(t)$ and $E_z(t)$ over the slowest enabled layer's common period, extracts the fitted amplitudes and relative phase lag, and classifies the result as weak, linear, circular, or elliptical. This common window prevents slower enabled layers from leaking into the reference-frequency coefficients merely because the fit stopped after one shorter cycle. The polarization inset draws the fitted oscillating component centered on the $E_y/E_z$ origin, so a constant observer bias does not shift the ellipse or line.

Show raw polarization points is on by default. It draws the sampled common-period branch-sum points behind the fitted curve. If the points sit close to the fitted curve, the fit is visually clean. If they spread away from it, the polarization label should be treated with more caution.

The common-period reference-frequency fit uses

$$
E_y(t)\approx A_y\cos(\omega t+\phi_y),
\qquad
E_z(t)\approx A_z\cos(\omega t+\phi_z)
$$

with phase lag $\Delta\phi=\phi_z-\phi_y$.

The Analyzer angle remains a control because it is a measurement axis, not a source polarization factor. The inset overlays that analyzer axis and the formula panel reports the scalar analyzer fraction for the current field vector. The formula panel keeps the normalized fit residual separate from the fit-to-field fraction residual. Both the fitted fraction and the sampled common-period fraction use transmitted energy divided by total transverse energy, so their difference does not mix two incompatible averages.

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

The common-period energy fraction is

$$
\bar\mu_{\mathrm{analyzer}}
=
\frac{\left\langle|\hat{\mathbf a}\cdot\mathbf E|^2\right\rangle}
{\left\langle|\mathbf E|^2\right\rangle+\varepsilon}.
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
| 3 | Fitted&nbsp;$S_3$&nbsp;sign | The sign of the fitted circular or elliptical component. This is a fit readout, not a graded physical helicity claim. |
| 4 | Fit&nbsp;residual | How far the fitted polarization curve misses the sampled branch-sum field. Smaller is a cleaner fit. |
| 5 | Mean&nbsp;delay | The average travel time from transmitter history roots to the Virtual Observer. |
| 6 | Transmitter&nbsp;count | How many active architrino transmitters are included. Each enabled binary contributes two transmitters. |
| 7 | Root&nbsp;count | How many causal roots were retained after solving transmitter histories. More than the transmitter count means at least one transmitter has multiple roots. |
| 8 | Max&nbsp;transmitter&nbsp;v/c_f | The fastest active transmitter speed compared with field speed. Above `1` means super-field-speed transmitter motion is present; that is a regime indicator, not a delay-solve failure by itself. |
| 9 | Min \|J\| | The smallest Jacobian magnitude in the causal-root sum. Very small values mean the branch is close to a pile-up or caustic. |
| 10 | Self-hit&nbsp;diagnostics | The interactive snapshot defers the heavier same-transmitter sweep so animation and control changes remain responsive. Dedicated sweep records retain those diagnostics outside the frame loop. |
| 11 | Missed&nbsp;sources | How many active source rows produced no retained root. For a clean solve, this should be `0`. |
| 12 | No&nbsp;catch-up&nbsp;sources | How many source histories did not causally catch the moving Virtual Observer in the scanned window. This can be a real moving-apparatus result when $c_\gamma$ is close to $c_{\mathrm{sig}}$. |
| 13 | Stale&nbsp;windows | How many scan windows looked too old for the selected hit time. |
| 14 | Near&nbsp;misses | How many source histories came close to a root but did not retain one. These deserve numerical caution. |
| 15 | Root&nbsp;cap&nbsp;hits | How many source histories found more candidate roots than the current root cap can keep. |
| 16 | Delay&nbsp;solve&nbsp;gap | The largest leftover mismatch in the causal-delay equation. Smaller means the root solve is tighter. |
| 17 | Delay&nbsp;status | A simple stable/catch-up-limited/unstable flag based on root misses, no-catch-up classification, delay gap, and small-Jacobian checks. |
| 18 | Left&nbsp;120-degree&nbsp;spacing&nbsp;error | How far the left braid's three indexed phase gaps depart from equal 120-degree spacing. |
| 19 | Right&nbsp;120-degree&nbsp;spacing&nbsp;error | How far the right braid's three indexed phase gaps depart from equal 120-degree spacing. |
| 20 | Trailing&nbsp;hit&nbsp;phase&nbsp;spread | How tightly retained trailing-braid source roots cluster by source phase. Smaller means the retained roots are more phase-aligned. |
| 21 | Leading&nbsp;hit&nbsp;phase&nbsp;spread | How tightly retained leading-braid source roots cluster by source phase. Smaller means the retained roots are more phase-aligned. |

## Formulas

The live Formulas panel reports the current branch-sum field, the common-period reference-frequency fit, the Analyzer-axis comparison, and the Stokes-style fitted polarization components. The Stokes rows put the formula first and the conventional shorthand in parentheses.

| # | Name | ELI5 explanation |
|---:|---|---|
| 1 | derived&nbsp;mode | The fitted polarization type: weak field, linear, circular, or elliptical. |
| 2 | fit&nbsp;amp&nbsp;E_y | How tall the reference-frequency fitted $E_y$ wave is over the common period. |
| 3 | fit&nbsp;amp&nbsp;E_z | How tall the reference-frequency fitted $E_z$ wave is over the common period. |
| 4 | fit&nbsp;E_z/E_y | How large the fitted E_z amplitude is compared with the fitted E_y amplitude. Near `1` means the two fitted components are about equally strong. |
| 5 | fit&nbsp;lag | The signed phase difference between the fitted $E_z$ and $E_y$ waves. It is `n/a` when the field is too weak or too close to one axis to define a useful lag. |
| 6 | fit&nbsp;residual | How far the fitted polarization curve misses the sampled branch-sum field. Smaller is a cleaner common-period fit. |
| 7 | fit&nbsp;energy&nbsp;fraction | The transmitted-energy fraction predicted by the fitted reference-frequency component along the current Analyzer angle. |
| 8 | instantaneous&nbsp;fraction | The current branch-sum field vector's analyzer fraction at the now line. |
| 9 | common-period&nbsp;energy&nbsp;fraction | Sampled projected energy divided by sampled total transverse energy over the common period. |
| 10 | fit-to-field&nbsp;fraction&nbsp;residual | The common-period sampled energy fraction minus the fitted energy fraction. Closer to `0` means the reference-frequency fit summarizes the sampled field more closely. |
| 11 | source&nbsp;count | How many active architrino sources are included in the branch-sum field. |
| 12 | root&nbsp;count | How many causal roots were retained after solving the source histories. |
| 13 | mean&nbsp;delay | The average travel time from retained source roots to the Virtual Observer. |
| 14 | nearest&nbsp;source | The closest retained transmitter-to-observer distance in the current causal-root sum. |
| 15 | $A_y^2 + A_z^2$ ($S_0$) | The fitted total transverse strength. |
| 16 | $A_y^2 - A_z^2$ ($S_1$) | The fitted strength imbalance between the two transverse components. |
| 17 | $2A_yA_z\cos\delta$ ($S_2$) | The fitted in-phase or anti-phase linear component. |
| 18 | $-2A_yA_z\sin\delta$ ($S_3$) | The fitted handed circular or elliptical component. |
