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

Promotion note: the named preset descriptions, Virtual Observer branch-sum equations, and analyzer-fit formulas have been promoted into the reader-facing Photon Guide. The remaining app-specific control ranges, verification checklist, and open work queue stay priority-only.

## Implemented Baseline

The current app implements:

- two fixed-spacing face-on flat Noether swarm views plus an edge-on side view of the same pair;
- counter-clockwise rotation in the trailing swarm and clockwise rotation in the leading swarm;
- per-swarm Inner/Middle/Outer controls for enabled state, frequency, radius, and phase;
- a $\Delta x$ pair-separation control that changes the side-view trace spacing without changing the face-on orbit spacing;
- Ideal Swarm-style architrino markers, orbit paths, and layered trails;
- pause/play, Space bar pause/play, Reset time, Reset all, Paths, and Slow/Fast controls;
- Virtual Observer $x$, $y$, and $z$ controls with visible zero markers and near-zero snap;
- a three-cycle Electric Field plot based on causal-root branch sums;
- a transverse polarization inset derived from a one-cycle branch-sum fit, with optional raw one-cycle branch-sum points behind the fit;
- formula and diagnostic panels with quality words where the readout has a useful direction;
- a named preset dropdown that can load a complete photon settings state and reset back to the last loaded preset;
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
- the face-on camera uses a stable reference scale, so radius edits move the selected orbit instead of rescaling the whole swarm;
- the Outer orbit radius is capped at the initial/default Outer radius;
- and the app remains 2D unless the requirements are explicitly revised.

### Controls

Current control ranges remain:

| Control | Default | Range | Step |
| --- | ---: | ---: | ---: |
| I frequency | `4 Hz` | $2^0$ to $2^5$ | powers of two |
| M frequency | `2 Hz` | $2^0$ to $2^5$ | powers of two |
| O frequency | `1 Hz` | $2^0$ to $2^5$ | powers of two |
| Inner radius | `0.0477` | `0.0100` to current Middle radius | continuous |
| Middle radius | `0.0796` | current Inner radius to current Outer radius | continuous |
| Outer radius | `0.1273` | current Middle radius to initial/default Outer radius `0.1273` | continuous |
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

The current calculation is a co-moving diagnostic: the two swarm centers are held at fixed app-frame offsets, and the Virtual Observer is held at a fixed app-frame coordinate. This is useful for inspecting delayed superposition, but it does not yet solve the harder absolute-history problem where the entire photon candidate, including the two swarms and the Virtual Observer, translates through the Noether sea at local $c$.

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

### Absolute-History Solver Burden

The next $\Delta x$ refinement must treat the photon candidate as a moving apparatus. If the pair translates at $c_\gamma$, with $c_\gamma$ identified with local $c$ for the local Noether sea state, then the absolute source and receiver histories should be written in an absolute observer frame before solving causal roots.

Let $\chi_s\in\{-\Delta x/2,+\Delta x/2\}$ be the trailing or leading swarm offset in the moving photon frame, and let $\chi_{\mathrm{VO}}$ be the Virtual Observer offset in that same moving frame. The current visual intuition often places the Virtual Observer near $\chi_{\mathrm{VO}}=+\Delta x/2$, but the calculation should keep this as an explicit variable.

The absolute Virtual Observer history is

$$
\mathbf X_{\mathrm{VO}}(t)
=
\mathbf X_0
+c_\gamma t\,\hat{\mathbf x}
+\chi_{\mathrm{VO}}\hat{\mathbf x}
+y_{\mathrm{VO}}\hat{\mathbf y}
+z_{\mathrm{VO}}\hat{\mathbf z},
$$

and an absolute source history should be

$$
\mathbf r_{s\ell q}(\tau)
=
\mathbf X_0
+c_\gamma\tau\,\hat{\mathbf x}
+\chi_s\hat{\mathbf x}
+R_{s\ell}\cos\theta_{s\ell q}(\tau)\hat{\mathbf y}
+R_{s\ell}\sin\theta_{s\ell q}(\tau)\hat{\mathbf z}.
$$

The causal-root equation then becomes

$$
\left\|
\mathbf X_{\mathrm{VO}}(t)-\mathbf r_{s\ell q}(\tau)
\right\|
=
c_{\mathrm{sig}}(t-\tau),
$$

where $c_{\mathrm{sig}}$ is the signal speed used by the branch solver. The first implementation should expose whether $c_{\mathrm{sig}}$ is still $c_f$ or is also local $c$.

With $u=t-\tau$, the longitudinal separation in the root equation is no longer just the fixed app-frame gap. It is

$$
D_x(u)
=
\chi_{\mathrm{VO}}-\chi_s+c_\gamma u.
$$

This is the troubling part. If $c_\gamma$ is very close to $c_{\mathrm{sig}}$, then a contribution from a source behind the Virtual Observer has a very small catch-up margin. For small transverse offset, the delay scale is approximately

$$
u
\sim
\frac{\chi_{\mathrm{VO}}-\chi_s}
{c_{\mathrm{sig}}-c_\gamma}.
$$

So if local $c$ is close to $c_f$ and $c_{\mathrm{sig}}=c_f$, the received contribution from the trailing swarm may come from a very old source-history point, or may have no finite positive root in the limiting case $c_\gamma=c_{\mathrm{sig}}$. Even the leading swarm is not automatically simple: if $\chi_{\mathrm{VO}}=\chi_s$ but there is transverse orbital separation $\rho$, the root scale is

$$
u
=
\frac{\rho}
{\sqrt{c_{\mathrm{sig}}^2-c_\gamma^2}},
$$

which also becomes large as $c_\gamma\to c_{\mathrm{sig}}$.

This means the current co-moving branch sum is not enough for photon-substrate closure. The app needs a later absolute-history mode that:

- chooses $c_\gamma/c_f$ directly or derives it from declared Noether sea variables;
- optionally derives $c_\gamma/c_f$ from a Lorentz-factor chart when that chart is the active local-$c$ parameterization;
- keeps $\chi_{\mathrm{VO}}$, $\chi_{\mathrm{trailing}}$, and $\chi_{\mathrm{leading}}$ explicit rather than assuming the fixed app-frame roots are physical roots;
- solves all positive causal roots in the absolute frame;
- reports when trailing or leading contributions have no catch-up root, very old roots, or small Jacobian margins;
- and compares the absolute-history field against the current co-moving diagnostic field.

#### Reusable Solver Contract

The moving-apparatus calculation and the same-source self-hit calculation should share one reusable absolute-history solver. The solver should accept source histories, a receiver history, the declared photon-channel speed $c_\gamma$, the branch signal speed $c_{\mathrm{sig}}$, and an admissibility policy, then return:

- every retained source-to-observer causal root;
- every retained same-source causal root when self-hit diagnostics are enabled;
- the root delay, source position, source velocity, receiver position, residual, and Jacobian for each row;
- the source phase-at-hit for each retained root, including layer id, charge sign, leading/trailing role, orbit phase, and phase cycle index;
- the receiver phase-at-hit for every modeled receiver binary, with `n/a` for the Virtual Observer;
- rejected-root reasons such as insufficient history, no catch-up root, singular root, small Jacobian, or transversality-floor failure;
- the Jacobian-weighted hit sum;
- the reconstructed receiver acceleration;
- and the observer-level transverse field derived from that acceleration.

The Jacobian diagnostic should remain separate from the source-speed diagnostic. In this app context,

$$
J
=
1-\frac{\mathbf v_{\mathrm{source}}\cdot\hat{\mathbf n}}{c_{\mathrm{sig}}},
$$

so a small $|J|$ means source-history times are bunching along the causal direction. It is not the same thing as large total speed. A source can have large transverse speed while still producing a modest Jacobian effect if little of that velocity projects along $\hat{\mathbf n}$.

#### Phase-Lock Diagnostics

Phase-lock should be treated as an output diagnostic of this solver, not as an imposed polarization input. Once phase-at-hit is available for every retained root, the app can ask:

- do same-layer leading and trailing hits arrive at repeatable phase offsets;
- are those phase offsets stable across cycles;
- do same-source roots return at phase positions that reinforce the emitting binary;
- and do linear, circular, or elliptical observer candidates correspond to low phase-spread root families.

Candidate phase-lock mechanisms include partner-hit loops, same-source self-hit loops, and any retained causal round-trip family whose phase rows recur across cycles. The reusable solver should therefore provide phase-spread summaries by layer, swarm role, charge sign, root kind, and cycle. These summaries should let the app distinguish a manually chosen phase preset from a causal phase-lock family produced by the delayed branch geometry.

#### Field-Reconstruction Pipeline

The correct pipeline is:

$$
\text{source histories + receiver history}
\rightarrow
\text{all causal roots}
\rightarrow
\text{Jacobian-weighted hit sum}
\rightarrow
\text{receiver acceleration}
\rightarrow
\mathbf E_\perp.
$$

This should not be treated as a speed-threshold shortcut. The speed budget

$$
\left(\frac{v_{k,\mathrm{abs}}}{c_f}\right)^2
=
\left(\frac{c_\gamma}{c_f}\right)^2
+
\left(\frac{2\pi f_kR_k}{c_f}\right)^2
$$

can nominate self-hit candidate regimes, but a self-hit row exists only when the solver retains a positive same-source causal root with acceptable residual, Jacobian, and transverse geometry.

#### Solver Precedents

Existing code to mine first:

- `src/apps/photon/PhotonFormulaRuntime.js` already contains the current co-moving branch-sum scanner. It is useful for the UI and formulas, but it is not the absolute moving-apparatus solver because source and receiver histories do not yet translate through the Noether sea.
- `scripts/simulations/lib/assembly-dynamics-solver.mjs` is the closest reusable numerical pattern. It already keeps finite history, resolves all retained causal roots, separates self and partner roots, reports unresolved-root reasons, and applies the Jacobian factor $1/|J|$.
- `src/apps/sim2/orbits.py` and `src/apps/sim2/md/design.md` are useful visual and emission-history precedents, but their hit detector is discrete emission-history crossing logic rather than the analytic branch-root solver needed here.

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

### Configuration Search Design

The configuration search is a guided exploration tool for finding photon settings worth inspecting. It should be visible in the UI as a `Search configurations` action near the preset controls, with results shown in a compact session list.

First implementation scope:

- start each run from the current app settings;
- search bounded nearby and systematic variants of enabled binaries, Inner/Middle/Outer frequency powers, radius lanes, phase offsets, $\Delta x$, Virtual Observer position, and Analyzer angle;
- use the current co-moving branch-sum diagnostics first;
- add local-$c$ and absolute-history comparisons after the reusable absolute-history solver exists;
- keep results session-local by default;
- support JSON export/import before relying on search results for durable research capture.

Each search result should store a complete settings snapshot, not only the changed control values. A result record should include:

- `id`;
- short display name;
- full photon settings state;
- reason tags;
- numeric score components;
- polarization summary;
- diagnostic summary;
- small plot or sample summary;
- and a short note explaining why the result is interesting.

The result list should support:

- previewing a result without losing the current state;
- loading a result into the app;
- playing the loaded state;
- renaming or deleting a session result;
- exporting selected results or all results as JSON;
- importing exported results;
- and promoting a result into the named preset set.

The named preset dropdown is part of this design. It must load complete settings states, including enabled flags, frequencies, radii, phases, $\Delta x$, Virtual Observer coordinates, Analyzer angle, display toggles, and later local-$c$ mode. `Reset preset` should restore the last loaded preset or promoted result.

The search should flag a configuration as interesting when one or more of these traits appears:

- clean polarization behavior: strong fitted linear, circular, or elliptical behavior with low fit residual and stable phase lag;
- strong cancellation: many active sources but small net transverse field;
- sharp transitions: small setting changes produce large changes in fitted polarization or analyzer response;
- robust patterns: the behavior survives small nudges rather than depending on one exact slider value;
- causal-root structure: low missed-source count, healthy Jacobian values, repeatable phase-at-hit families, or organized same-source and partner-hit roots;
- simple explanations: fewer enabled binaries, integer frequency ratios, simple phase offsets, or clean leading/trailing symmetry;
- and diversity: the result set should prefer representative examples from different pattern families over many tiny variations of the same case.

Suspect numerical cases should be labeled as suspect, not good. Missed roots, very small Jacobian values, large delay-solve gaps, or unstable diagnostics can still be useful clues, but they should not be presented as clean polarization evidence.

## Open Work Queue

1. `reusable_absolute_history_solver` - Build or extract a shared solver for absolute source histories, moving receiver histories, all retained causal roots, same-source self-hit roots, source and receiver phase-at-hit rows, phase-spread diagnostics, Jacobian floors, rejected-root reasons, receiver acceleration, and observer-level field reconstruction. Mine `scripts/simulations/lib/assembly-dynamics-solver.mjs` first, but adapt it for the photon app's 3D planar-pair histories and local-$c$ translation. Status: `open`.
2. `local_c_parameterization` - Add a speed mode that replaces fixed $c_f$ with local $c$ from either a direct $c_\gamma/c_f$ control, declared Noether sea state variables, or a Lorentz-factor chart mapping when that mapping is available. This is an input to the reusable absolute-history solver, not just a display label. Status: `open`.
3. `moving_apparatus_delta_x_mapping` - Use the reusable absolute-history solver to replace the co-moving $\Delta x$ diagnostic with an optional absolute-history mode where the swarms and Virtual Observer translate at $c_\gamma$, then solve whether leading and trailing source histories can causally reach the moving Virtual Observer. Status: `open`.
4. `absolute_source_history_self_hit` - Use the reusable absolute-history solver to add a local-$c$ helical source-history diagnostic that combines photon-channel translation with transverse binary motion, then reports same-source roots, Jacobian floors, and whether each layer is sub-field-speed or candidate self-hit. Status: `open`.
5. `substrate_mapping_refinement` - Refine the Virtual Observer branch-sum mapping from I/M/O layer parameters to transverse observer-field amplitudes, while preserving claim discipline and distinguishing co-moving diagnostics from absolute-history results. Status: `open`.
6. `polarization_parameter_search` - Implement the Configuration Search Design above. Identify which geometry, binary controls, and full settings configurations can reliably produce fitted linear, circular, or elliptical observer-level polarization without adding synthetic source-polarization parameters. Compare co-moving fits against absolute-history moving-apparatus roots once the shared solver exists. Status: `open`.
7. `shared_visual_extraction` - Extract shared Ideal Swarm / photon architrino marker, orbit-path, tint-profile, and layered-trail helpers if the visual grammar needs to be maintained across both apps. Status: `open`.

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
