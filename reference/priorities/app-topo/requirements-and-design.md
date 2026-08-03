# Topo App Requirements And Design

## Status

- Stage: `interaction-contract-complete`
- Implementation: `TOPO-002 synthetic preview complete; TOPO-003 reference surface not started`
- Application authority: display-only prescribed-path exploration
- Forward-evolution authority: EOM solver only
- Potential-product authority: [Potential](../app-potential/priorities.md)
- First observable: [TOPO-001 signed ordinary wake intensity](topo-observable-and-reference-geometry-v1.md)
- Interaction contract: [TOPO-002 interaction and color contract v1](topo-interaction-and-color-contract-v1.md)
- Numerical convention: normalized wake-speed units with $c_f=1$

## Product Definition

`Topo` is a two-dimensional interactive viewer for a declared signed map around one prescribed uniformly translating architrino. The first release is a fixed-time snapshot of the `Signed ordinary wake intensity` product defined by [TOPO-001](topo-observable-and-reference-geometry-v1.md). The source remains visually anchored while the selected $\beta$ changes the path-history geometry used to request a new map.

This first release is called `Electrostatic` in the scenario interface only as a concise user-facing label for a static, single-source comparison. That label does not import a standard electromagnetic field equation into the architrino-level model. The exact $\beta$-dependent v1 observable is supplied by TOPO-001 as a diagnostic composition of canonical $\mathbb{A}\mathbb{A}\mathbb{A}$ factors, not as a new physical law.

Plainly: `static` describes the picture, not the source's absolute-frame motion. The viewer freezes one instant of a uniformly moving source and does not simulate what happens next.

## Initial Coordinate And Control Contract

For a canvas with pixel width $W$ and height $H$, the Euclidean display chart is

$$
\Omega_{W,H}=
\left[\frac23-\frac{2W}{3H},\frac23+\frac{W}{3H}\right]\times[0,1],
\qquad
\mathbf x_0=(2/3,1/2),
\qquad
\widehat{\mathbf v}=\mathbf e_x.
$$

Plainly: one world unit is always one canvas-height, so equal horizontal and vertical distances occupy equal pixels. The architrino stays two-thirds of the way across and halfway up, and its represented motion points to the right.

The initial controls are:

| Control | Initial contract |
| --- | --- |
| Scenario | `Electrostatic: single electrino`; `Electrostatic: single positrino` |
| $\beta=v/c_f$ | range $0\leq\beta\leq1$; the exact ordinary, unavailable, and nonordinary endpoint regions are fixed by TOPO-001 |
| Contour density | continuous display percentage; default $40\%$; progressively fades valid isolines from the minimum-density subset through the fixed $48$-level geometry without moving contour locations |
| Contour visibility | display-only line-brightness percent from $0$ through $100$ in one-point steps; default $60$; does not alter field color, contour geometry, or raw values |
| Scale transform | `Linear`, `Signed log2`, and `Asinh`; default `Asinh` |
| Overlay | single polarity-colored source marker, contour legend, zero marker, singular/unavailable mask; direction remains textual in the scenario facts |

The source position, contour density, contour visibility, transform choice, and color limits belong to view state. The chosen species, $\beta$, observable identity, time slice, domain, and scientific-kernel version belong to the reproducible scenario record.

## Shared Application-Shell Contract

Topo inherits the shared Architrino application shell rather than creating an
app-local navigation or panel language.

- The canvas uses the shared dark neutral-purple stage and translucent dark
  panel surfaces. The colors must come from shared semantic UI tokens; Topo
  must not introduce another nearly matching hard-coded purple palette. Signed
  data zero uses the accepted shared Electric Purple (`#8F00FF`) semantic
  token. At the beta endpoint, the leading region uses the same neutral display
  midpoint without receiving a fabricated raw value; the shell itself keeps
  the dark shared stage token.
- The shared application controls occupy the top-right safe area in the
  established order: `Home`, `Back`, `Forward`, `Search`, `Notes` or
  `Documents`, and `Settings`, omitting only a control that has no declared
  behavior. Buttons use the shared monoline SVGs, dark shell, visible focus
  state, accessible names, and the standard approximately $32\times32$ hit
  target.
- The left control panel uses the shared open/closed panel icon from
  `PanelCollapseIcons.js`. Collapse preserves a narrow visible rail and the
  reopen control; it does not remove the control from keyboard navigation.
  The toggle exposes `aria-expanded`, updates its accessible name, and makes
  closed content inert. Sliding motion is short and functional and is removed
  under reduced-motion preferences.
- Scenario and $\beta$ are local scientific controls in the left panel. The
  $\beta$ slider reuses the established Architrino slider interaction and
  keyboard pattern while retaining Topo's own exact $0\leq\beta\leq1$
  scientific contract. Contour density, transform, and legend
  remain nearby display controls rather than being hidden in global
  navigation.
- Mobile layout collapses the left panel before reducing shared icon hit
  targets and keeps the top-right controls clear of the map legend and source
  marker.

Plainly: Topo should feel like another Architrino application immediately.
The map is new; its navigation, slider behavior, panel toggle, colors, focus
rules, and responsive shell are not.

## Prescribed Uniform-Translation Geometry

At display time $T=0$, a source anchored at $\mathbf x_0=(2/3,1/2)$ has the prescribed history

$$
\mathbf X(s)=\mathbf x_0+\beta s\mathbf e_x,
\qquad s\leq0,
$$

and an ordinary arrival at sample point $\mathbf x$ must satisfy the normalized causal condition

$$
\lVert\mathbf x-\mathbf X(s)\rVert=-s,
\qquad -s>0.
$$

Plainly: for every pixel, the provider looks backward along the architrino's left-to-right path for the emission whose outward-moving wake arrives at that pixel at the displayed instant.

This geometry and its first raw scalar are now fixed by [TOPO-001](topo-observable-and-reference-geometry-v1.md). On an ordinary root, v1 plots the source-polarity sign times the canonical inverse-square distance factor times the transmitter-side ordinary-root weight. The contract also fixes aggregation, the static and axis controls, the punctured regular domain, and the $\beta=1$ unavailable and nonordinary regions.

## Observable Boundary

The application keeps these meanings separate:

1. the accepted v1 signed ordinary wake-intensity quantity whose ordinary isolated-root value contains the canonical $1/r^2$ distance factor and transmitter-side weight;
2. a future scalar potential quantity with its own declared scientific kernel and radial dependence; and
3. a derived magnitude or gradient view of another scalar product.

If more than one is retained, each becomes a separately named menu mode with a separate legend, units or normalized scale, kernel identity, and reference test. No display transform may be used to turn one observable into another.

Plainly: logarithmic coloring changes how values are spread across colors. It does not change what those values mean.

## Contour And Color Contract

The signed palette is ordered

$$
\text{large negative}\longrightarrow\text{zero}\longrightarrow\text{large positive}
\quad=
\quad\text{blue}\longrightarrow\text{Electric Purple}\longrightarrow\text{red}.
$$

Plainly: positrino-positive and electrino-negative maps use the same legend. Selecting the other species reverses the sign of the declared observable without changing the geometry or color semantics.

Contour thresholds are uniform in the selected transformed display coordinate, while the legend exposes corresponding raw values. TOPO-002 fixes $z_*=4$, an ordinary display-clip magnitude of $64$, and these transforms:

$$
C_{\mathrm{linear}}(z)=z/z_*,
$$

$$
C_{\log_2}(z)=\operatorname{sgn}(z)\log_2\!\left(1+\frac{|z|}{z_*}\right),
$$

and

$$
C_{\operatorname{asinh}}(z)=\operatorname{asinh}(z/z_*).
$$

Plainly: plain $\log_2|z|$ fails at zero. The signed `log2(1 + magnitude)` form remains defined there, while `asinh` is nearly linear near neutral and logarithmic at large magnitude. `Asinh` is the accepted v1 default.

[TOPO-002](topo-interaction-and-color-contract-v1.md) records the comparison against one declared synthetic signed surface and its falsifier. Quantile coloring is not a v1 candidate because it would make the same color mean different raw values in different frames.

## Singular And Endpoint Behavior

Any point-source observable with inverse-distance growth is singular at the marker. The first renderer must mask a declared sampling neighborhood and identify the marker's TOPO-001 state as `singular` for $0\leq\beta<1$ or `nonordinary` at $\beta=1$; it must not clamp the value and then present the clamp as a finite scientific result. The mask radius is a display-resolution quantity recorded with the frame, not a new physical length, and masked ordinary neighbors remain distinct from the marker's raw scientific state.

At $\beta=1$, the strict trailing half-plane retains one ordinary root, the leading half-plane and off-source transverse line have no positive root, and the source point has a non-isolated degenerate root family. The provider returns the exact states declared by TOPO-001. Topo must render them distinctly from zero and from an ordinary clipped high value.

Plainly: the viewer may leave a hole where the formula is undefined. It may not fill that hole with a convenient color and imply that the theory supplied the missing value.

## Recalculation And Scenario Behavior

Changing $\beta$ creates a new map request. The renderer may update progressively, but it must not leave old values under a new slider label. The UI exposes whether the current map is computing, complete, singular at declared locations, or unavailable.

The map should reveal any leading-versus-trailing asymmetry produced by the selected observable. It must not manufacture the expected front buildup by skewing coordinates, contour thresholds, sampling density, or color limits. A reference test along the horizontal axis will compare equal displayed distances ahead of and behind the source using raw values before coloring.

The scenario menu is extensible, but a later binary, multi-source, time-varying, or EOM-driven scenario requires its own scientific input contract. Adding a menu entry does not authorize Topo to create the underlying field law.

## First-Release Acceptance Boundary

The first release is acceptable only when:

1. every pixel value is traceable to one declared observable and scientific-kernel version;
2. the $\beta=0$ reference map satisfies its independently specified radial and polarity controls;
3. switching electrino to positrino reverses sign without changing raw magnitude or geometry when the observable contract says it should;
4. slider changes produce fresh, deterministic map identities and never mix frames;
5. raw equal-distance leading/trailing samples are recorded before display transformation;
6. singular and unavailable points remain distinct from zero and clipped display values;
7. contour density and transform change only the visualization, not the raw map;
8. $c_f=1$ is used in all numerical fixtures; and
9. the shared top-right application controls, dark neutral-purple stage,
   collapsible left-panel behavior, focus states, reduced-motion behavior, and
   responsive hit targets pass desktop and mobile checks; and
10. no EOM evolution, continuation, conservation, stability, or physical claim is attached to the display.

## Open Decisions

1. Whether and when a separately defined true scalar-potential product from Potential becomes a second map mode.
2. Map resolution, recomputation budget, and progressive-rendering policy.
3. Whether the source stays at $(2/3,1/2)$ for every later scenario or becomes scenario metadata.
