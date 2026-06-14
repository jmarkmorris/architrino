# Photon App

## Workstream Metadata

- Kind: `priority-app`
- Rank: `proposed`
- Value: `high`
- Cost: `unscored`
- ROI: `unscored`
- Status: `active`

## Current

This folder owns the priority work ledger for the deployed Photon and Polarization Visualization app.

The app begins from the candidate photon picture already used in the photon Gate B priority material: a coaxial contra-rotating planar pair whose observer-facing transverse ledger must still be derived, tested, and routed through analyzer behavior. This priority packet does not claim photon closure, Malus-law recovery, helicity recovery, or a physical free photon branch.

The deployed route is `photon.html`. The dedicated runtime lives under `src/apps/photon/`, with focused modules for state, controls, swarm rendering, formulas, diagnostics, and runtime assembly.

The reader-facing app guide is [Photon Guide](../../../content/markdown/aaa/archie/photon-guide.md). The visible Photon UI exposes Markdown buttons for the guide, [Photon Closure](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md), and [Polarization](../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md).

## Implemented Baseline

The current app implements:

- two fixed-spacing face-on flat Noether swarm views plus an edge-on side view of the same pair;
- counter-clockwise rotation in the trailing swarm and clockwise rotation in the leading swarm;
- per-swarm I/M/O controls for enabled state, frequency, radius, and phase;
- a $\Delta x$ pair-separation control that changes the side-view trace spacing without changing the face-on orbit spacing;
- Ideal Swarm-style architrino markers, orbit paths, and layered trails;
- pause/play, Space bar pause/play, Reset time, Reset all, Paths, and Slow/Fast controls;
- Virtual Observer $x$, $y$, and $z$ controls with visible zero markers and near-zero snap;
- a three-cycle Electric Field plot based on causal-root branch sums;
- a transverse polarization inset derived from a one-cycle branch-sum fit;
- formula and diagnostic panels with quality words where the readout has a useful direction;
- and in-app Markdown viewing for the user-facing guide and the two supporting corpus bridges.

## Candidate Model

The current candidate picture is:

- A photon is represented as a pair of flat Noether swarms.
- The pair uses fixed $c_f$ in the current app.
- A later version may replace fixed $c_f$ with local $c$ derived from declared Noether sea state variables.
- The trailing swarm is shown on the left in the face-on view and rotates counter-clockwise.
- The leading swarm is shown on the right in the face-on view and rotates clockwise.
- The 2D face-on view of each swarm does not rotate as a group; only the binaries and layer phases animate.
- The edge-on side view shows the same pair along the line of translation.

Use the canonical photon priority language where possible: the visual pair is a candidate planar pair, and leading/trailing role is declared in app state rather than inferred only from screen position.

## Default State

Current defaults:

- pair speed mode: fixed `cf`;
- pair separation: $\Delta x=1r_{\mathrm{ref}}$;
- cycle reference: middle layer `M`;
- plotted cycle count: `3`;
- Slow/Fast animation scale: `0.20`;
- analyzer angle: `0 deg`;
- Virtual Observer coordinate: $(x,y,z)=(0,0,0)$;
- all six binaries enabled;
- all I/M/O phases set to `0 deg`;
- default I/M/O frequencies set to `4 Hz`, `2 Hz`, and `1 Hz`;
- default I/M/O radii chosen from $v=2\pi r f$, with I at $1.2c_f$, M at $c_f$, and O at $0.8c_f$.

The default visible I/M/O orbit rates are therefore `0.8`, `0.4`, and `0.2` cycles per real second.

## Coordinate And Timing Convention

The app uses a left-to-right propagation convention:

- the horizontal screen direction is the line of translation;
- the propagation axis is $+\hat{\mathbf x}$;
- the transverse axes are $\hat{\mathbf y}$ and $\hat{\mathbf z}$;
- the observer-field cursor moves from left to right as the visualization runs;
- the $\mathbf E$ plot covers three middle-layer cycles;
- and the plot keeps the full waveform visible except for a short forward gap ahead of the moving now line.

The observer-cycle duration is based on the current middle-layer frequency:

$$
T_{\mathrm{run}}=\frac{3}{f_M}.
$$

With the current default $f_M=2\,\mathrm{Hz}$, the run duration is $1.5\,\mathrm{s}$ before the plot wraps. The swarm animation time continues across plot wrap.

## Runtime Requirements Kept In Force

### Visual Stage

The visual stage should continue to preserve these requirements:

- each active I/M/O binary contributes one red positrino marker and one blue electrino marker;
- all architrino markers use one fixed on-screen size;
- orbit paths use purple neutral blending where no polarity dominates;
- layered path-history trails retain the Ideal Swarm visual grammar;
- path/trail visibility remains controlled by the `Paths` control;
- the side-view traces have height equal to the diameter of the largest enabled binary;
- the side-view $\Delta x$ arrow spans the side-view trace centers;
- the face-on views stay fixed for readability even when $\Delta x$ changes;
- and the app remains 2D unless the requirements are explicitly revised.

### Controls

Current control ranges remain:

| Control | Default | Range | Step |
| --- | ---: | ---: | ---: |
| I frequency | `4 Hz` | $2^0$ to $2^5$ | powers of two |
| M frequency | `2 Hz` | $2^0$ to $2^5$ | powers of two |
| O frequency | `1 Hz` | $2^0$ to $2^5$ | powers of two |
| I radius | `0.0477` | `0.0100` to `2.4000` | `0.0001` |
| M radius | `0.0796` | `0.0100` to `2.4000` | `0.0001` |
| O radius | `0.1273` | `0.0100` to `2.4000` | `0.0001` |
| I phase | `0 deg` | `0` to `360 deg` | `1 deg` |
| M phase | `0 deg` | `0` to `360 deg` | `1 deg` |
| O phase | `0 deg` | `0` to `360 deg` | `1 deg` |
| $\Delta x$ ratio | `1 r` | `1e-10 r` to `1e5 r` | selectable `1` through `9` ticks per decade |
| Slow/Fast animation scale | `0.20` | `0.025` to `1.600` | log slider |
| analyzer angle | `0 deg` | `0` to `180 deg` | `1 deg` |
| Virtual Observer $x$ | `0.00` | `-10.00` to `10.00` | `0.05` |
| Virtual Observer $y$ | `0.00` | `-4.00` to `4.00` | `0.05` |
| Virtual Observer $z$ | `0.00` | `-4.00` to `4.00` | `0.05` |

The Virtual Observer $x$, $y$, and $z$ sliders should continue to show a visible zero marker. Values within two slider steps of zero should snap to exactly `0`.

### Observer-Field Mapping

The lower Electric Field plot is based on a Virtual Observer branch-sum calculation from the architrino source histories in the two swarms. This mapping is diagnostic-only and is not a photon-substrate derivation or closure certificate.

The Virtual Observer coordinate is

$$
\mathbf X_{\mathrm{VO}}
=
x_{\mathrm{VO}}\hat{\mathbf x}
+y_{\mathrm{VO}}\hat{\mathbf y}
+z_{\mathrm{VO}}\hat{\mathbf z}.
$$

For swarm $s$, layer $\ell$, and architrino charge $q\in\{+1,-1\}$, the source position is

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

where $\sigma_s=+1$ for the trailing counter-clockwise swarm and $\sigma_s=-1$ for the leading clockwise swarm.

For each active source row $i=(s,\ell,q)$ and observer time $t$, solve every retained causal-root source time $\tau_{i,k}<t$:

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

and source velocity $\mathbf v_i(\tau_{i,k})$, compute

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

For an ideal plane-wave comparison moving along $+\hat{\mathbf x}$, the magnetic field is recoverable from the displayed electric field:

$$
\mathbf B(t)=\frac{1}{c_f}\hat{\mathbf x}\times\mathbf E(t),
$$

so $B_y=-E_z/c_f$ and $B_z=E_y/c_f$. The app should not draw $\mathbf B$ as a separate graph unless a later diagnostic explicitly needs to compare a non-plane-wave magnetic reconstruction.

### Polarization And Formulas

The app fits the actual branch-sum transverse field over one reference cycle:

$$
E_y(t)\approx A_y\cos(\omega t+\phi_y),
\qquad
E_z(t)\approx A_z\cos(\omega t+\phi_z).
$$

The formula panel should continue to report the relative amplitude $A_z/A_y$, phase lag $\Delta\phi=\phi_z-\phi_y$, linear/circular/elliptical classification, Stokes-style observer summaries, analyzer fraction, analyzer residual, and fit residual.

The analyzer projection uses

$$
\hat{\mathbf a}
=
\cos\theta\,\hat{\mathbf y}
+
\sin\theta\,\hat{\mathbf z},
$$

and the displayed analyzer fraction is

$$
\mu_{\mathrm{analyzer}}
=
\frac{|\hat{\mathbf a}\cdot\mathbf E|^2}
{|\mathbf E|^2+\varepsilon}.
$$

## Open Work Queue

1. `named_presets` - Add named preset selection for balanced contra-rotating pair, linear polarization candidate, right circular candidate, left circular candidate, phase-offset stress test, and layer-radius stress test. Include reset to last loaded preset. Status: `open`.
2. `raw_polarization_overlay` - Add an optional overlay that shows raw one-cycle branch-sum points behind the fitted polarization curve. Status: `open`.
3. `shared_visual_extraction` - Extract shared Ideal Swarm / photon architrino marker, orbit-path, tint-profile, and layered-trail helpers if the visual grammar needs to be maintained across both apps. Status: `open`.
4. `substrate_mapping_refinement` - Refine the Virtual Observer branch-sum mapping from I/M/O layer parameters to transverse observer-field amplitudes, while preserving claim discipline. Status: `open`.
5. `separation_mapping_refinement` - Decide whether $\Delta x$ should later enter the observer-field mapping as a physical delay, a phase delay, or a separate diagnostic. Status: `open`.
6. `polarization_parameter_search` - Identify which geometry or binary controls can reliably produce fitted linear, circular, or elliptical observer-level polarization without adding synthetic source-polarization parameters. Status: `open`.
7. `local_c_continuation` - Add a later speed mode that replaces fixed $c_f$ with local $c$ from declared Noether sea state variables. Status: `open`.
8. `absolute_source_history_self_hit` - Add a local-$c$ helical source-history diagnostic that combines photon-channel translation with transverse binary motion, then reports same-source roots, Jacobian floors, and whether each layer is sub-field-speed or candidate self-hit. Status: `open`.

## Deferred Non-Goals

The current app should continue to defer:

- proof-grade photon Gate B residual evaluation;
- material analyzer substrate dynamics;
- no-signaling or Bell-pair behavior;
- 3D swarm rendering;
- group rotation of each 2D swarm view;
- persistent project libraries beyond basic preset/export support;
- and any claim that a displayed preset is a certified photon branch.

## Verification Baseline

The app should remain verified against these baseline checks:

- `photon.html` loads locally through the repo dev server;
- the app route renders a nonblank visual stage;
- the trailing swarm rotates counter-clockwise;
- the leading swarm rotates clockwise;
- the $\mathbf E$ plot draws left to right over exactly three middle-layer cycles;
- I/M/O controls update the visual swarms and runtime state;
- Virtual Observer controls update the branch-sum field plot and runtime state;
- analyzer controls update formula-panel values;
- disabled binary checkboxes remove both display markers and branch-sum contributions;
- pause/play, Space bar playback shortcut, Reset time, Reset all, and Paths work;
- and browser verification confirms no visible text overlap or broken canvas sizing on the desktop target.

## Claim Discipline

The photon app is an exploratory diagnostic. It may visualize candidate planar-pair behavior, expose residual-style readouts, and help identify promising parameter regimes. It must not promote a parameter preset, animation state, visual fit, or analyzer readout into a photon Gate B pass without a separate branch certificate or simulation packet that populates the needed substrate ledger rows.

## Related Priorities

- [Photon planar-pair ledger substrate packet](../angular-momentum-spin/photon-planar-pair-ledger-substrate-packet.md)
- [Planar-pair symbolic substrate instance](../angular-momentum-spin/planar-pair-symbolic-substrate-instance.md)
- [Photon event ledger balance diagnostic](../angular-momentum-spin/photon-event-ledger-balance-diagnostic.md)
- [Malus' law](../cross-theory-mapping/malus-law.md)
