# Photon App

## Workstream Metadata

- Kind: `priority-app`
- Rank: `13`
- Value: `2.00`
- Cost: `6.6`
- ROI: `0.30`
- Status: `active`

## Current

This folder owns the priority work ledger for the deployed Photon and Polarization Visualization app.

The app begins from the candidate photon picture already used in the photon Gate B priority material: a coaxial contra-rotating planar pair whose observer-facing transverse ledger must still be derived, tested, and routed through analyzer behavior. This priority packet does not claim photon closure, Malus-law recovery, helicity recovery, or a physical free photon branch.

The deployed route is `photon.html`. The dedicated runtime lives under `src/apps/photon/`, with focused modules for state, controls, braid rendering, formulas, diagnostics, and runtime assembly.

The reader-facing app guide is [Photon Guide](../../../content/markdown/aaa/archie/photon-guide.md). The visible Photon UI exposes Markdown buttons for the guide, [Photon Closure](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md), and [Polarization](../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md).

Historical promotion note is preserved in [work-log.md](work-log.md#2026-07-02-photon-guide-promotion-note).

## Document Role And Authority

This tracker combines four kinds of material that must not be read as one status. **Implemented Baseline** and statements that the app currently implements or emits record deployed behavior; **Runtime Requirements Kept In Force** records accepted requirements whether or not a later refinement is complete; **Candidate Model**, statements using `should` or `next`, and the phase-lock discussion retain proposal or open-design status; and **Deferred Non-Goals** names work the app does not currently claim. [work-queue.md](work-queue.md) is the authority for executable task state, while [work-log.md](work-log.md) and the focused sibling packets carry the validation and historical evidence.

Every mathematical row in this tracker is an app diagnostic, requirement, comparison, or open closure burden at the scope stated where it appears. Its presence here does not establish a retained photon branch, stability, helicity, Malus-law recovery, or a Noether sea constitutive law.

## Implemented Baseline

The current app implements:

- two fixed-spacing face-on flat Noether braid views plus an edge-on side view of the same pair;
- counter-clockwise rotation in the trailing braid and clockwise rotation in the leading braid;
- per-braid Inner/Middle/Outer controls for enabled state, frequency, radius, and phase;
- a $\Delta x$ pair-separation control that changes the side-view trace spacing without changing the face-on orbit spacing;
- Lorentz Geometry-style architrino markers, orbit paths, and layered trails;
- pause/play, Space bar pause/play, Reset time, Reset all, Paths, and Slow/Fast controls;
- Virtual Observer $x$, $y$, and $z$ controls with visible zero markers and near-zero snap;
- direct $c_{\mathrm{sig}}/c_f$ and $c_\gamma/c_f$ controls plus a first Lorentz-factor local-$c$ mode that derives both speeds from $\gamma$;
- default `Absolute history` mode that translates source and Virtual Observer histories at $c_\gamma$ and uses the shared prescribed-path absolute-history facade through its moving-circular compatibility entrypoint;
- a three-cycle Electric Field plot based on causal-root branch sums;
- absolute-history source-scan diagnostics for no-catch-up sources, stale windows, near misses, and root-cap hits;
- a machine-readable `photon-moving-apparatus-delta-x.v1` record that makes absolute history authoritative for $\Delta x$, marks co-moving output comparison-only, and classifies retained-root age in declared reference-cycle bands;
- a transverse polarization inset derived from a reference-frequency fit over the slowest enabled layer's common period, with optional raw common-period branch-sum points behind the fit;
- a machine-readable `photon-substrate-mapping-refinement.v1` record that partitions every sampled transverse field into I/M/O contributions, fits the same reference harmonic per layer and in total, and reports algebraic-closure, fit, root-solve, and coverage diagnostics;
- formula and diagnostic panels with quality words where the readout has a useful direction;
- shared-geometry same-transmitter self-hit span diagnostics for enabled leading/trailing Inner/Middle/Outer binaries, using the vector sum of photon-channel speed and transverse orbital speed as the solver speed ratio;
- first-pass helical same-transmitter root results for individual architrino transmitter histories, with transmitter phase-at-hit, receiver phase-at-hit, and phase-family grouping by role, layer, charge, and transmitter cycle;
- fail-closed helical self-hit admission rows that distinguish regular candidates from singular roots, small-Jacobian failures, and uncertified transversality records;
- a named preset dropdown that can load a complete photon settings state and reset back to the last loaded preset;
- a bounded `Search configurations` workflow plus a scheduled `Deep compare` path that evaluates the full constructed candidate pool, yields between candidates, applies local-$c$ and measured phase-family filters, attaches co-moving and absolute-history summaries to every retained deep row, preserves explicit UI-independence and scientific-oracle-independence labels through JSON export/import, and supports preview/load/play, rename/delete, and promotion into session presets;
- and in-app Markdown viewing for the user-facing guide and the two supporting corpus bridges.

## Candidate Model

The current candidate picture is:

- A photon is represented as a pair of flat Noether braids.
- The current co-moving diagnostic exposes a branch signal speed control $c_{\mathrm{sig}}/c_f$.
- The app uses a photon-channel group speed control $c_\gamma/c_f$ in the default `Absolute history` mode.
- The app can either use direct speed sliders or a first Lorentz-factor local-$c$ mode; a later version should derive local $c$ from declared Noether sea state variables rather than only direct slider input or the provisional $\gamma$ mapping.
- The trailing braid is shown on the left in the face-on view and rotates counter-clockwise.
- The leading braid is shown on the right in the face-on view and rotates clockwise.
- The 2D face-on view of each braid does not rotate as a group; only the binaries and layer phases animate.
- The edge-on side view shows the same pair along the line of translation.

Use the canonical photon priority language where possible: the visual pair is a candidate planar pair, and leading/trailing role is declared in app state rather than inferred only from screen position.

## Default State

Current defaults:

- pair speed mode: `Direct`;
- local Lorentz factor: `100`;
- pair separation: $\Delta x=1r_{\mathrm{ref}}$;
- cycle reference: middle layer `M`;
- plotted cycle count: `3`;
- Slow/Fast animation scale: `0.20`;
- signal speed: $c_{\mathrm{sig}}/c_f=1.00$;
- photon-channel group speed: $c_\gamma/c_f=1.00$;
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

With the current default $f_M=2\,\mathrm{Hz}$, the run duration is $1.5\,\mathrm{s}$ before the plot wraps. The braid animation time continues across plot wrap.

## Runtime Requirements Kept In Force

### Visual Stage

The visual stage should continue to preserve these requirements:

- each active I/M/O binary contributes one red positrino marker and one blue electrino marker;
- all architrino markers use one fixed on-screen size;
- orbit paths use purple neutral blending where no polarity dominates;
- layered path-history trails retain the Lorentz Geometry visual grammar;
- path/trail visibility remains controlled by the `Paths` control;
- the side-view traces have height equal to the diameter of the largest enabled binary;
- the side-view $\Delta x$ arrow spans the side-view trace centers;
- the face-on views stay fixed for readability even when $\Delta x$ changes;
- the face-on camera uses a stable reference scale, so radius edits move the selected orbit instead of rescaling the whole braid;
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
| Cycle reference | `M` | `I`, `M`, or `O` | select |
| Plotted cycles | `3` | `1` to `12` | `1` |
| Local $c$ mode | `Direct` | `Direct` or `Lorentz factor` | select |
| Lorentz factor $\gamma_\star$ | `100.00` | `1.00` to `100.00` | `0.01` |
| Signal $c_{\mathrm{sig}}/c_f$ | `1.00` | `0.05` to `1.00` | `0.01` |
| Photon $c_\gamma/c_f$ | `1.00` | `0.00` to `1.00` | `0.01` |
| Absolute history | `on` | `off` or `on` | checkbox |
| analyzer angle | `0 deg` | `0` to `180 deg` | `1 deg` |
| Virtual Observer $x$ | `0.00` | `-10.00` to `10.00` | `0.05` |
| Virtual Observer $y$ | `0.00` | `-4.00` to `4.00` | `0.05` |
| Virtual Observer $z$ | `0.00` | `-4.00` to `4.00` | `0.05` |

The Virtual Observer $x$, $y$, and $z$ sliders should continue to show a visible zero marker. Values within two slider steps of zero should snap to exactly `0`.

### Observer-Field Mapping

The lower Electric Field plot is based on a Virtual Observer branch-sum calculation from the architrino source histories in the two braids. This mapping is diagnostic-only and is not a photon-substrate derivation or closure certificate. The current root equation uses the visible signal-speed control $c_{\mathrm{sig}}/c_f$.

The default calculation is now `Absolute history`: the two braid centers and the Virtual Observer translate at $c_\gamma$, and the Electric Field plot is reconstructed from shared prescribed-path moving-circular transmitter roots and observer-field contributions. The `co_moving` mode remains available as a comparison diagnostic where braid centers are held at fixed app-frame offsets and the Virtual Observer is held at a fixed app-frame coordinate. The [reusable absolute-history facade](reusable-absolute-history-facade.md) now composes the existing linear, moving-circular, and moving-circular same-transmitter contracts, exposes receiver-phase and phase-spread records, and rejects invalid field branches without contribution. It remains a display/reference capability; arbitrary history families and production EOM ownership remain with App Solver.

The Virtual Observer coordinate is

$$
\mathbf X_{\mathrm{VO}}
=
x_{\mathrm{VO}}\hat{\mathbf x}
+y_{\mathrm{VO}}\hat{\mathbf y}
+z_{\mathrm{VO}}\hat{\mathbf z}.
$$

For braid $s$, layer $\ell$, and architrino charge $q\in\{+1,-1\}$, the source position is

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

where $\sigma_s=+1$ for the trailing counter-clockwise braid and $\sigma_s=-1$ for the leading clockwise braid.

For each active source row $i=(s,\ell,q)$ and observer time $t$, solve every retained causal-root source time $\tau_{i,k}<t$:

$$
F_i(t;\tau)
=
\left\|
\mathbf X_{\mathrm{VO}}-\mathbf r_i(\tau)
\right\|
-c_{\mathrm{sig}}(t-\tau)
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
D_{t,i,k}
=
c_{\mathrm{sig}}-\mathbf v_i(\tau_{i,k})\cdot\mathbf n_{i,k},
\qquad
D_{r,i,k}
=
c_{\mathrm{sig}}-\mathbf v_{\mathrm{VO}}(t)\cdot\mathbf n_{i,k}.
$$

The Virtual Observer acceleration is the radial sum of transmitter-side causal-hit contributions for a unit positive receiver. The receiver-side factor $D_r$ remains signed root-playback data and does not multiply the instantaneous acceleration:

$$
\mathbf a_{\mathrm{VO}}(t)
=
g\sum_i\sum_k
q_i
\frac{c_{\mathrm{sig}}}{|D_{t,i,k}|}
\frac{\mathbf n_{i,k}}
{R_{\mathrm{display},i,k}^2},
\qquad
R_{i,k}
=
\left\|
\mathbf X_{\mathrm{VO}}-\mathbf r_i(\tau_{i,k})
\right\|,
\qquad
R_{\mathrm{display},i,k}=\max(R_{i,k},0.08).
$$

The $0.08$ floor is a display regularization, not a derived short-distance rule. The exact I/M/O grouping, harmonic projection, residuals, and falsifiers are recorded in the [PHO-005 substrate-mapping refinement](substrate-mapping-refinement.md).

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
\mathbf B(t)=\frac{1}{c_{\mathrm{sig}}}\hat{\mathbf x}\times\mathbf E(t),
$$

so $B_y=-E_z/c_{\mathrm{sig}}$ and $B_z=E_y/c_{\mathrm{sig}}$. This is an ideal plane-wave comparison only, not an imported magnetic input or a branch-local substrate derivation. The app should not draw $\mathbf B$ as a separate graph unless a later diagnostic explicitly needs to compare a non-plane-wave magnetic reconstruction.

### Absolute-History Solver Burden

The next $\Delta x$ refinement must treat the photon candidate as a moving apparatus. If the pair translates at $c_\gamma$, with $c_\gamma$ identified with local $c$ for the local Noether sea state, then the absolute source and receiver histories should be written in an absolute observer frame before solving causal roots.

Let $\chi_s\in\{-\Delta x/2,+\Delta x/2\}$ be the trailing or leading braid offset in the moving photon frame, and let $\chi_{\mathrm{VO}}$ be the Virtual Observer offset in that same moving frame. The current visual intuition often places the Virtual Observer near $\chi_{\mathrm{VO}}=+\Delta x/2$, but the calculation should keep this as an explicit variable.

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

So if local $c$ is close to $c_f$ and $c_{\mathrm{sig}}=c_f$, the received contribution from the trailing braid may come from a very old source-history point, or may have no finite positive root in the limiting case $c_\gamma=c_{\mathrm{sig}}$. Even the leading braid is not automatically simple: if $\chi_{\mathrm{VO}}=\chi_s$ but there is transverse orbital separation $\rho$, the root scale is

$$
u
=
\frac{\rho}
{\sqrt{c_{\mathrm{sig}}^2-c_\gamma^2}},
$$

which also becomes large as $c_\gamma\to c_{\mathrm{sig}}$.

This means the co-moving branch sum is not enough for photon-substrate closure. The app now has a first absolute-history mode that:

- chooses $c_\gamma/c_f$ directly or derives it from the provisional Lorentz-factor local-$c$ control;
- derives $c_\gamma/c_f$ and $c_{\mathrm{sig}}/c_f$ from a first Lorentz-factor chart mode when that mode is active;
- keeps $\chi_{\mathrm{VO}}$, $\chi_{\mathrm{trailing}}$, and $\chi_{\mathrm{leading}}$ explicit rather than assuming the fixed app-frame roots are physical roots;
- solves all positive causal roots in the absolute frame;
- reports when trailing or leading contributions have no catch-up root, very old roots, or small Jacobian margins;
- and compares the absolute-history field against the current co-moving diagnostic field.

#### Reusable Solver Contract

The moving-apparatus calculation and the same-transmitter self-hit calculation share one reusable display/reference absolute-history facade. The facade accepts the existing declared transmitter and receiver history contracts, the declared photon-channel speed $c_\gamma$ where it enters those histories, the branch signal speed $c_{\mathrm{sig}}$, and an admissibility policy, then returns:

- every retained source-to-observer causal root;
- every retained same-transmitter causal root when self-hit diagnostics are enabled;
- the root delay, source position, source velocity, receiver position, residual, and Jacobian for each row;
- the source phase-at-hit for each retained root, including layer id, charge sign, leading/trailing role, orbit phase, and phase cycle index;
- the receiver phase-at-hit for every modeled receiver binary, with `n/a` for the Virtual Observer;
- rejected-root reasons such as insufficient history, no catch-up root, singular root, small Jacobian, or transversality-floor failure;
- the transmitter-side causal-hit contribution sum;
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
- do same-transmitter roots return at phase positions that reinforce the emitting binary;
- and do linear, circular, or elliptical observer candidates correspond to low phase-spread root families.

Candidate phase-lock mechanisms include partner-hit loops, same-transmitter self-hit loops, and any retained causal round-trip family whose phase results recur across cycles. The reusable facade provides circular phase-spread summaries by layer, braid role, charge sign, root kind, and cycle, with explicit missing and not-applicable receiver-phase counts. These summaries let the app distinguish a manually chosen phase preset from a causal phase-family diagnostic produced by the delayed branch geometry; they do not establish retained phase locking.

#### Field-Reconstruction Pipeline

The correct pipeline is:

$$
\text{source histories + receiver history}
\rightarrow
\text{all causal roots}
\rightarrow
\text{transmitter-side contribution sum}
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

can nominate self-hit candidate regimes, but a self-hit exists only when the solver retains a positive same-transmitter causal root with acceptable residual, Jacobian, and transverse geometry.

#### Solver Interface

Photon should use the EOM solver bridge for production-authoritative transmitter histories, receiver histories, causal-root ledgers, same-transmitter roots, phase-at-hit results, rejected-root reasons, Jacobian diagnostics, and observer-field reconstruction. The shared prescribed-path facade remains the compatibility/reference implementation for the currently declared linear and circular history contracts and must not become a second production solver.

### Polarization And Formulas

The app fits the reference-frequency component of the actual branch-sum transverse field over the slowest enabled layer's common period:

$$
E_y(t)\approx A_y\cos(\omega t+\phi_y),
\qquad
E_z(t)\approx A_z\cos(\omega t+\phi_z).
$$

The formula panel should continue to report the relative amplitude $A_z/A_y$, phase lag $\Delta\phi=\phi_z-\phi_y$, linear/circular/elliptical classification, Stokes-style observer summaries, instantaneous analyzer fraction, common-period energy fraction, fit-to-field fraction residual, and fit residual.

Both calculation modes use the same display regularization, $R_{\mathrm{display}}=\max(R,0.08)$ in app-coordinate units, in the inverse-square observer-field denominator. The direction vector remains normalized from the unregularized displacement. This floor is a numerical display safeguard and carries no short-distance-law authority.

The analyzer projection uses

$$
\hat{\mathbf a}
=
\cos\theta\,\hat{\mathbf y}
+
\sin\theta\,\hat{\mathbf z},
$$

and the instantaneous analyzer fraction is

$$
\mu_{\mathrm{analyzer}}
=
\frac{|\hat{\mathbf a}\cdot\mathbf E|^2}
{|\mathbf E|^2+\varepsilon}.
$$

The common-period analyzer summary uses projected energy divided by total transverse energy:

$$
\bar\mu_{\mathrm{analyzer}}
=
\frac{\left\langle|\hat{\mathbf a}\cdot\mathbf E|^2\right\rangle}
{\left\langle|\mathbf E|^2\right\rangle+\varepsilon}.
$$

Here $\hat{\mathbf a}$ is the unit analyzer direction at angle $\theta$ in the transverse YZ plane, $\mathbf E$ is the displayed transverse field sample, $\varepsilon$ is the small positive denominator regularizer, and the angle brackets average over the declared common-period window. The instantaneous fraction $\mu_{\mathrm{analyzer}}$ evaluates one field sample, whereas $\bar\mu_{\mathrm{analyzer}}$ compares the accumulated projected and total transverse energies over the window. Both are observer-level app diagnostics; neither supplies a material-analyzer mechanism or establishes Malus-law recovery.

### Configuration Search Design

The configuration search is a guided exploration tool for finding photon settings worth inspecting. It is visible in the UI as a short `Search configurations` action and a larger `Deep compare` action near the preset controls, with results shown in a compact session list.

Current implementation scope:

- start each run from the current app settings;
- search bounded nearby and systematic variants of enabled binaries, Inner/Middle/Outer frequency powers, radius lanes, phase offsets, $\Delta x$, Virtual Observer position, and Analyzer angle;
- use the current branch-sum diagnostics and, when available, attach a compact co-moving versus absolute-history comparison for top results;
- let deep comparison evaluate both history modes for every candidate in the full constructed pool, yielding to the browser between candidates and reporting progress;
- filter the deep pool by normalized direct or Lorentz-factor local-$c$ mode before evaluation and by measured stable, candidate, singular, absent, or any phase-family class after evaluation;
- keep results session-local by default;
- support selected/all JSON export and JSON import.

Each search result should store a complete settings snapshot, not only the changed control values. A result record should include:

- `id`;
- short display name;
- full photon settings state;
- reason tags;
- numeric score components;
- polarization summary;
- diagnostic summary;
- co-moving versus absolute-history comparison status, mode summaries, and deltas when the solver path can compute them;
- for deep rows, a versioned provenance record that states the producing path, analysis identity, normalized-state-snapshot boundary, UI independence after dispatch, lack of an independent scientific oracle, evaluated history modes, and filters;
- small plot or sample summary;
- and a short note explaining why the result is interesting.

The result list supports:

- previewing a result without losing the current state;
- loading a result into the app;
- playing the loaded state;
- renaming or deleting a session result;
- exporting selected results or all results as JSON;
- importing exported results;
- and promoting a result into the named preset set for the current session.

The named preset dropdown is part of this design. It loads complete settings states, including enabled flags, frequencies, radii, phases, $\Delta x$, Virtual Observer coordinates, Analyzer angle, and display toggles. `Reset preset` restores the last loaded preset or promoted result.

The search should flag a configuration as interesting when one or more of these traits appears:

- clean polarization behavior: strong fitted linear, circular, or elliptical behavior with low fit residual and stable phase lag;
- strong cancellation: many active sources but small net transverse field;
- sharp transitions: small setting changes produce large changes in fitted polarization or analyzer response;
- robust patterns: the behavior survives small nudges rather than depending on one exact slider value;
- absolute-history comparison: either strong agreement between co-moving and absolute-history modes, or strong divergence that marks the configuration as a useful moving-apparatus stress case;
- causal-root structure: low missed-transmitter count, healthy Jacobian values, repeatable phase-at-hit families, or organized same-transmitter and partner-hit roots;
- simple explanations: fewer enabled binaries, integer frequency ratios, simple phase offsets, or clean leading/trailing symmetry;
- and diversity: the result set should prefer representative examples from different pattern families over many tiny variations of the same case.

Suspect numerical cases should be labeled as suspect, not good. Missed roots, very small Jacobian values, large delay-solve gaps, or unstable diagnostics can still be useful clues, but they should not be presented as clean polarization evidence.

The detailed execution and export boundary is recorded in [configuration-search-deep-comparison.md](configuration-search-deep-comparison.md). Deep comparison is independently scheduled from later UI mutation, but it reuses the same prescribed-path analysis and therefore is not an independent numerical oracle or physical certificate.

## Work Queue

The locally ranked implementation, evidence, architecture, and deferred work lives in [work-queue.md](work-queue.md).

## Deferred Non-Goals

The current app should continue to defer:

- proof-grade photon Gate B residual evaluation;
- material analyzer substrate dynamics;
- no-signaling or Bell-pair behavior;
- 3D braid rendering;
- group rotation of each 2D braid view;
- persistent project libraries beyond basic preset/export support;
- and any claim that a displayed preset is a certified photon branch.

## Verification Baseline

The app should remain verified against these baseline checks:

- `photon.html` loads locally through the repo dev server;
- the app route renders a nonblank visual stage;
- the trailing braid rotates counter-clockwise;
- the leading braid rotates clockwise;
- the $\mathbf E$ plot draws left to right over exactly three middle-layer cycles;
- I/M/O controls update the visual braids and runtime state;
- Virtual Observer controls update the branch-sum field plot and runtime state;
- analyzer controls update formula-panel values;
- disabled binary checkboxes remove both display markers and branch-sum contributions;
- pause/play, Space bar playback shortcut, Reset time, Reset all, and Paths work;
- and browser verification confirms no visible text overlap or broken canvas sizing on the desktop target.

## Claim Discipline

The photon app is an exploratory diagnostic. It may visualize candidate planar-pair behavior, expose residual-style readouts, and help identify promising parameter regimes. It must not promote a parameter preset, animation state, visual fit, or analyzer readout into a photon Gate B pass without a separate branch certificate or simulation packet that populates the needed substrate ledger rows.

## Related Priorities

- Photon planar-pair ledger substrate packet
- Planar-pair symbolic substrate instance
- Photon event ledger balance diagnostic
- [Malus' law](../mapping-benchmarks/malus-law.md)
