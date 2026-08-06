# Topo App Requirements And Design

## Status

- Stage: `interaction-contract-complete`
- Implementation: `TOPO-002 synthetic preview complete; TOPO-003 reference surface not started`
- Application authority: display-only prescribed-path exploration
- Forward-evolution authority: EOM solver only
- Potential-product authority: [Potential](../app-potential/priorities.md)
- First observable: [TOPO-001 signed ordinary wake intensity](topo-observable-and-reference-geometry-v1.md)
- Interaction contract: [TOPO-002 interaction and color contract v1](topo-interaction-and-color-contract-v1.md)
- Circular-binary contract: [prescribed circular binary v1](topo-circular-binary-prescribed-history-v1.md)
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

This Euclidean chart remains authoritative for all multi-source scenes and for single-source frames with $\beta>0$. At $\beta=0$ only, either radially symmetric single-source scene uses the display-only exponent radius $e=\log_{10}(|W|/64)$. Span $N$ maps $e=+N$ to the source-marker edge and $e=-N$ to the largest complete equal-scale circle, with every intervening integer exponent at an equal radial display step. The inner and outer regions are neutral-masked or clipped rather than clamped, and the heatmap and contours share the same coordinate map. Heatmap color also advances uniformly from neutral at $e=-N$ to the signed endpoint at $e=+N$ so the fixed linear-chart clip cannot create a saturated inner bloom. The raw inverse-square calculation remains unchanged.

Plainly: only a stationary one-source view has one honest radial exponent axis. The pair and binary keep their ordinary linear plane.

The initial controls are:

| Control | Initial contract |
| --- | --- |
| Scenario | single electrino; single positrino; approaching collinear electrino and positrino; orbiting binary electrino and positrino |
| $\beta=v/c_f$ | range $0\leq\beta\leq1$; the exact ordinary, unavailable, and nonordinary endpoint regions are fixed by TOPO-001 |
| Contour span | integer $1$ through $4$; default $3$; span $N$ selects integer exponents $+N$ through $-N$, one raw factor-of-ten level per exponent, includes the reference once per sign, and retains explicit zero; changing span preserves every shared level and topology in linear scenes and changes only the display-radius endpoints in beta-zero single-source scenes |
| Contour visibility | display-only global contour-emphasis percent from $0$ through $100$ in one-point keyboard steps; default $75$; changes line opacity only; zero reads `Hidden`; equal nonzero widths and the single adaptive zero stroke do not alter field color, contour geometry, or raw values |
| Color mapping | one zero-safe signed base-10 logarithmic mapping with $z_*=4$ and symmetric clip at $|z|=64$; no transform selector |
| Overlay | scenario-specific reference geometry plus source polarity disks using one shared half-size radius, canonical thin white border, and half-size centered white origin dot |

The source position, contour range, contour visibility, and color limits belong to view state. The chosen species, $\beta$, observable identity, time slice, domain, and scientific-kernel version belong to the reproducible scenario record.

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
  scientific contract. Contour span, contour visibility, and legend
  remain nearby display controls rather than being hidden in global
  navigation. The default contour visibility is $75\%$.
- Mobile layout collapses the left panel before reducing shared icon hit
  targets and keeps the top-right controls clear of the map legend and source
  marker.
- Space invokes the same play/pause action as the visible transport button for
  the moving collinear and circular-binary scenarios. The shortcut is inert at
  $\beta=0$, ignores repeat events, and leaves Space to buttons, radios,
  checkboxes, selects, links, text entry, and editable content. A focused range
  slider does not suppress the global shortcut because Space has no native
  range adjustment meaning; arrow, Home, and End behavior remains native.

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

## Prescribed Circular-Binary Geometry

The `Orbiting binary electrino and positrino` scenario uses equal-scale world coordinates centered at $(1/2,1/2)$. Its shared orbital radius $R$ ranges from $0.01$ through $0.45$ visible-width units and defaults to $0.3$, reproducing the initial $(0.2,0.5)$ and $(0.8,0.5)$ positions. The sources stay antipodal and use $|\omega|=\beta/R$, so the slider changes source separation and period without changing the selected nonnegative tangential-speed magnitude $\beta$. Counterclockwise uses positive $\omega$ and remains the default; Clockwise uses negative $\omega$ consistently in warm-up, replay, source placement, root evaluation, and frame identity.

The current binary display hides contour controls and shows the signed heatmap, shared half-size polarity markers, one optional thin solid orbit guide, playback progress, direction and radius controls, and shared play/pause/replay controls. The guide follows $R$ in the same equal-scale chart and is explicitly a prescribed path reference, not an equal-intensity contour. It is pale lavender on the Electric Purple neutral background and restrained Electric Purple on White. Each background radio uses its option color for the checked indicator while retaining native radio semantics, focus, and keyboard behavior. Binary contours are now an authorized follow-on, but stay disabled until the heatmap consumes one canonical immutable sampled raw frame with explicit scientific states and passes the parity and frame-identity gates recorded in the dynamic-contour recommendation.

At the $1\%$ radius endpoint, marker disks can overlap on narrow canvases. The overlay clips the two marker drawings at their perpendicular bisector so both source identities remain visible deterministically; it does not merge, reorder, or hide either source. The source display mask is $75\%$ of the visible marker radius in world units, replacing the stale fixed $0.012$ mask that extended beyond the smaller marker at $\beta=1$. Root failure remains fail-closed, and the mask changes no ordinary value outside the marker.

Plainly: the radius slider moves the two authored circles closer together or farther apart. The solid ring helps the eye follow that authored path, the direction radios reverse only the authored motion, and overlapping colored marker halves still show both sources. None supplies dynamics or a physical orbit.

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

Legend ticks expose the fixed signed base-10 display coordinate and its raw reference values. Contours use one fixed causal-delay lattice so view state cannot add arbitrary levels, move circles, or re-anchor decade identities. TOPO-002 fixes $z_*=4$, an ordinary display-clip magnitude of $64$, and the one mapping

$$
C_{10}(z)=\operatorname{sgn}(z)\log_{10}\!\left(1+\frac{|z|}{z_*}\right).
$$

The contour display uses $I(T)=K/T^2$ and

$$
T_m=T_0 10^{-m/2},
\qquad T_0=0.025,
\qquad m\in\{-N,\ldots,N\},
$$

so each integer exponent step changes magnitude by exactly a factor of ten. `Contour span` is the integer set $1,2,3,4$ and defaults to $3$; span $N$ retains integer exponents $+N$ through $-N$ around the single reference level. On linear charts, single-source inverse-square physical radii crowd inward by $1/\sqrt{10}$ and expand outward by $\sqrt{10}$. On the beta-zero single-source exponent-radius chart, those same physical radii appear at equal display-radius steps.

Plainly: each contour still marks a tenfold raw wake-intensity change. The stationary single-source view warps only its declared radial display coordinate; moving and multi-source maps do not warp space.

The approaching-collinear scenario obtains positive, negative, and explicit
zero contours from the same immutable full-resolution raw frame used to paint
its heatmap. Levels are symmetric signed raw powers of ten across the selected inward/outward span, include the fixed reference exactly once per sign, and retain an explicit zero level. Marching squares linearly interpolates only within finite cells,
uses the bilinear-cell determinant with a stable cell/raw-level-value tie-break for saddle
topology, and never crosses a source mask or unavailable sample. `Contour
visibility` multiplies only line opacity from hidden at zero through legible at
one; `Contour span` changes only the retained signed decade levels. During
active replay the WebGL path supplies the responsive heatmap preview, and the
canonical heatmap-plus-contour frame settles immediately when playback pauses.

Plainly: the pair contours follow the sampled field in world space. The
logarithm chooses raw contour values, not pixel positions, and missing samples
cannot masquerade as a cancellation line.

One native `Purple` / `White` neutral-background radio group appears in the
common unified Scenario panel for all four scenarios. Its checked value persists when
the scenario changes and affects only the neutral display color and reference
overlay contrast. Raw-frame keys, prescribed histories, solver state, timing,
and frame identities exclude it.

Plainly: changing the background changes the paper behind the signed colors,
not the numbers or motion being shown.

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
7. contour range and visibility change only the visualization, not the raw map;
8. $c_f=1$ is used in all numerical fixtures; and
9. the shared top-right application controls, dark neutral-purple stage,
   collapsible left-panel behavior, focus states, reduced-motion behavior, and
   responsive hit targets pass desktop and mobile checks; and
10. no EOM evolution, continuation, conservation, stability, or physical claim is attached to the display.

## Open Decisions

1. Whether and when a separately defined true scalar-potential product from Potential becomes a second map mode.
2. Map resolution, recomputation budget, and progressive-rendering policy.
3. Whether the source stays at $(2/3,1/2)$ for every later scenario or becomes scenario metadata.
