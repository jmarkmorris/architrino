# Topo App Work Log

This file is the chronological work log for the `app-topo` priority area. Use [priorities.md](priorities.md) for strategy, [work-queue.md](work-queue.md) for accepted executable work, [requirements-and-design.md](requirements-and-design.md) for the current application boundary, and [brainstorming.md](brainstorming.md) for provisional ideas.

## Log Entries

- Made the circular-binary retained history adaptive to the current visible extent, orbital radius, and speed. The warmup is the smallest whole number of orbits that brackets both source roots across the visible frame, so the opening source phase remains unchanged. Defined the approaching-collinear input as infinite stationary prehistory at the existing 20% and 80% start positions followed by an instantaneous prescribed launch at replay time zero; CPU and GPU paths now show both histories throughout the frame. These are prescribed display inputs, not EOM evolution or natural-motion claims.

- Shortened the unified left-panel slider labels to `Speed`, `Topo count`, `Shading`, `Topo fade`, and `Scale`, and aligned every slider on the same row as its title. Slider values, scientific/display ownership, keyboard behavior, and the Purple-to-White neutral-background endpoints are unchanged.

- Replaced the discrete Purple/White neutral-background radios with one accessible slider from the accepted Electric Purple endpoint to White. Intermediate values are channel-wise sRGB mixtures that add only white, and the same value continuously updates the field midpoint, unavailable display color, legend, contour contrast, translation axis, and prescribed orbit guide without entering raw-frame or scientific frame identity.

- Made Physical magnitude the default heatmap transfer: relative endpoint-color contribution is $\min(|W|/64,1)$, so exponents $e=0,-1,-2,-3$ contribute $1,0.1,0.01,0.001$. Added an optional Enhanced decade contrast mode labeled as display-only. Raw fields, prescribed histories, contour levels and positions, coordinate charts, and scientific frame identities do not change. Unsupported Source-local transitions now atomically return to Combined wake before rendering, preserve focus, and announce the reason instead of stranding the reader on an unavailable canvas.

- Recorded the orbiting-binary precision follow-up without claiming acceptance. Later evidence must solve $c_f\tau_i=\lVert x-X_i(T-\tau_i)\rVert$ independently for each source and preserve source identity, emission and observation events, $\tau_i$, residual, bracket/history availability, and kernel identity before signed combination. A separately authored selected-pixel reference must cover phases, radii, and both directions; $\beta<1$ requires the monotone unique-root contract and $\beta=1$ fails closed wherever the ordinary finite-history route is unavailable or unresolved. Screenshot similarity is not precision evidence.

- Recorded the approved two-view checkpoint. `Combined wake` is the default honest absolute-space x-y map for every scenario. `Source-local decades` exposes the accepted equal-step exponent-radius chart only for beta-zero single electrino and positrino scenes; moving and multi-source transitions return to Combined wake until a causal-history-aware local mapping is accepted. The approved ring spacing, `e=` labels, source-mask relationship, and Purple/White appearance are the geometry contract. No raw kernel, prescribed history, or EOM authority changed.

- Repaired the failed beta-zero exponent-radius visual checkpoint. The overlay owner had referenced an undefined `state` while drawing the marker origin, which aborted the complete contour/marker publication and exposed the neutral source hole. The canonical white origin mark is restored without that dependency. The heatmap had also reused the linear chart's fixed $|W|=64$ color clip, saturating the full $e\ge0$ half-annulus into one large endpoint-color bloom; beta-zero singles now normalize signed base-10 exponent smoothly across the selected $-N$ through $+N$ annulus. The finite inner boundary is the marker edge, eliminating the exposed neutral gap. Raw inverse-square values and physical exponent radii are unchanged.

- Added the display-only exponent-radius chart for both beta-zero single-source polarities. With $e=\log_{10}(|W|/64)$ and span $N=1$–$4$, integer labels $+N$ through $-N$ occupy equal radial display steps between a finite marker-adjacent inner boundary and the largest complete outer circle. Heatmap sampling and exact contour circles share the same inverse/forward map; inner and outer regions mask or clip without clamping, while the inverse-square kernel and raw values at physical points remain unchanged. Moving singles and both multi-source scenarios retain linear Euclidean coordinates.
- Recorded user authorization for circular-binary contours as a bounded follow-on. The binary remains heatmap-only until its heatmap is promoted to the same immutable sampled raw frame used by deterministic marching squares, with explicit scientific states, paused-frame atomicity, independent CPU/GPU fixtures, and measured responsive latency. No per-source warp or potential claim was introduced.

- Finalized the raw contour schedule after live visual review: integer span $N=1$–$4$ selects one true raw factor-of-ten contour at each exponent from $+N$ through $-N$ around the unique reference level. This raw level policy remains current; the later beta-zero single-source exponent-radius entry above supersedes only those two scenes' display-coordinate spacing. The collinear pair still extracts the symmetric signed levels plus zero from its canonical paused raw frame, and binary contours remain disabled pending the recorded gates.

### 2026-08-05 — Four-Scenario Controls And Canonical Collinear Contours

- Replaced the scenario select with one native four-option radio group and unified scenario, motion, and display controls into one compact `Scenario` panel. Purple/White display selection persists across scenarios without entering raw-frame identity.
- Made the approaching-collinear contour controls functional from the same immutable sampled raw frame used for the paused heatmap. Integer span $1$–$4$ defaults to $3$, retains exactly one raw magnitude per factor of ten per sign across symmetric inward/outward coverage plus explicit zero, and uses stable raw-level identity for saddle topology.
- Visibility now changes opacity only and reads `Hidden` at zero. Contours stop at explicit nonvalid sample states, remain hidden during playback, and publish only with the matching paused frame. Each signed decade and zero uses one adaptive high-contrast stroke; the removed two-pass casing no longer reads as a doubled white ring.
- Fixed play, pause, replay, and Space by preserving unchanged shared transport SVG nodes across animation frames, so native pointer clicks are synthesized normally. Pointer scenario selection hands focus to the stage for immediate global Space control, while keyboard-selected radios retain native Space behavior and beta zero remains inert.
- Live browser QA measured a $300$ ms first-contour latency in the tested desktop frame and observed long tasks up to $538$ ms during full sampled-frame work; this is a warning that routes a cancelable worker follow-up, not a production performance claim.

Plainly: the pair contour slider now changes real, frame-matched isolines; it does not change field samples or move contour coordinates.

### 2026-08-05 — Prescribed Circular Binary Integrated

- Added `Orbiting binary electrino and positrino` beside the existing single-source and approaching-collinear scenarios, preserving each scenario's independent renderer, controls, and transport behavior.
- Added an accessible orbital-radius slider over $0.01\leq R\leq0.45$ with $R=0.3$ as the original default. Both sources stay antipodal and the prescribed history uses $|\omega|=\beta/R$, so tangential speed remains $\beta$ while period and separation change. Overlapping endpoint markers are split at their perpendicular bisector so both source identities remain visible.
- Applied one shared $50\%$ source-marker radius, including the centered origin mark, across all four Topo scenarios while retaining polarity fill and the established white outline. No raw field, history, or playback calculation changed for this marker consolidation.
- Replaced the binary axes option with a checked-by-default thin solid circular guide that follows the selected $R$. It adapts from pale lavender on the Electric Purple neutral background to restrained Electric Purple on White and remains a prescribed reference path distinct from disabled field contours.
- Added Counterclockwise and Clockwise native radio controls. The default positive angular rate and the reversed negative angular rate propagate through warm-up, replay, marker positions, causal roots, shader evaluation, and frame identity while $\beta$ stays nonnegative.
- Corrected the $\beta=1$ source-adjacent artifact by replacing the stale fixed $0.012$ shader mask with a resolution-derived mask contained to $75\%$ of the now-smaller visible marker radius. This preserves fail-closed root handling and legitimate wake color outside the marker.
- Made Purple and White selections show option-colored checked indicators with contrast and focus, and made Space toggle the same play/pause actions for both moving scenarios without intercepting native controls, disabled $\beta=0$ state, or repeated keydown events.

Plainly: the binary now supports very close and wide authored separations, either authored direction, and both neutral backgrounds while keeping the same mathematical sampling rule. The smaller dots, solid ring, and corrected display mask change legibility only.

### 2026-08-03 — TOPO-002 Signed-Logarithmic Architecture Frozen

- Replaced the transform comparison with one zero-safe signed base-10 mapping, $\operatorname{sgn}(z)\log_{10}(1+|z|/z_*)$, at the established $z_*=4$ reference and $|z|=64$ symmetric display clip. Removed the Scale transform selector and its state, shader branch, cache key, event, accessibility, and test paths.
- Fixed the declared synthetic comparison magnitude to $I(T)=K/T^2$ with $T_0=0.025$ and $K=64T_0^2=0.04$. This remains a TOPO-002 theoretical display model rather than the TOPO-001 scientific renderer.
- The original denser contour-range experiment was superseded on 2026-08-05 by integer one-per-decade levels, equal line styling, and opacity-only visibility.
- Kept the positive-$x$ reference axis subordinate to the contour overlay and source marker.
- Kept the exact-circle Canvas2D overlay, $75\%$ default contour visibility, canonical source marker, Electric Purple zero and endpoint display, polarity-only scenario switching, WebGL analytic field with CPU fallback/watchdog, and Applications organization unchanged.

Plainly: Topo now has one orders-of-magnitude architecture. The slider reveals more fixed logarithmic distance range; it does not slide the ruler or compare alternative color transforms.

### 2026-08-02 — TOPO-002 Interaction And Color Contract Closed

- Added [the TOPO-002 contract](topo-interaction-and-color-contract-v1.md) and an explicitly labeled synthetic interaction preview at `topo.html`.
- Retained `Linear` and `Signed log2` field-color transforms, with `Signed log2` as the interim default while the independent contour-spacing semantics remain open. The fixed reference scale is $z_*=4$ with a symmetric ordinary display clip at $|z|=64$.
- Kept scenario and $\beta$ in raw-frame identity while contour density, contour visibility, transform, and panel state remain display-only state.
- Bound Topo to the shared semantic shell tokens, shared panel icon, existing Applications-return behavior, global search runtime, keyboard focus, reduced-motion treatment, and responsive $58$-pixel collapse rail.
- Defined distinct signed ordinary, clipped, singular, unavailable, nonordinary, unresolved, loading, and complete presentation states. The preview uses no TOPO-001 raw values.
- Refined the preview to one source-anchored synthetic causal envelope, a single compact polarity-colored source marker, continuous full-density field color, and anti-aliased interpolated contours. The canvas uses available device-pixel density up to an explicit safety ceiling; smoothing never writes back to provider values.
- Aligned both native dropdowns and their option text with the shared left-panel typography while retaining native selection, focus, and responsive behavior.
- Split rendering into an immediate coalesced interaction preview and interruptible full-density refinement. Raw frames are cached only by scenario, $\beta$, and pixel size; transform and contour changes reuse that raw field, and stale refinement is cancelled so sliders do not block behind obsolete work.
- At the exact $\beta=1$ endpoint, retained unavailable product typing while replacing the large diagonal hatch and later dark void with the Electric Purple neutral display midpoint. The front carries no special region ornament and no sample receives a fabricated raw number.
- Replaced the custom source glyph with the repository's canonical architrino semantics: a solid standard-blue electrino disk or solid standard-red positrino disk with the established thin centered white body stroke, and no backing shape, glow, shadow, inset, tail, or direction ornament.
- Made scenario switching polarity-only: non-default beta, contour density, contour visibility, and transform persist, while the opposite-polarity raw cache and contour-level mapping are derived from the current synthetic frame so visible contours recolor immediately without a provider rebuild.
- Added the display-only Contour visibility and range controls; their current accepted integer-level and opacity-only behavior is recorded in the 2026-08-05 entry above.
- Kept every range track at a fixed thin visual thickness through hover, focus, active, and drag states. A transparent larger interaction lane preserves touch use, and keyboard focus is localized to the fixed-size thumb rather than outlining the whole track.
- Corrected the canvas-to-world chart to use one canvas-height per Euclidean world unit on both axes. Raw sampling, caches, contours, and resizing now share that mapping, making the $\beta=0$ control circular on wide and mobile canvases without removing $\beta>0$ causal asymmetry.
- Removed the object-like dark oval created by the singular display mask beneath the canonical source disk. The mask remains nonnumeric in provider semantics but composites with the same-polarity field endpoint color, leaving exactly one visible architrino object.
- Removed both lower-corner canvas text boxes. The compact `About this view` card now carries the accepted theoretical signed-wake framing, while runtime completion updates remain available through an offscreen polite live region.
- Removed the visible Singular / Unavailable / Loading state-key row from the Signed ordinary values card and deleted its dedicated markup and styling. Typed renderer guards and offscreen status remain intact.
- Removed the visible Source marker and Frame rows from the Scenario record while retaining source placement and frame identity in internal state and tests.
- Removed the Raw probe subpanel, all canvas pointer-probe state and handlers, its raw/transformed/identity readout rendering, and the unused runtime sampling method. No replacement diagnostic panel was added; core provider calculations and private validity guards remain.
- Replaced synthetic-provider marching squares with exact Canvas2D arcs obtained by analytically inverting each selected magnitude to its causal delay $T$. Every loop is complete unless naturally clipped by the canvas, beta-zero circles remain aspect-correct, and beta-one circles are tangent to the source plane. The immediate and final paths are identical and swap atomically.
- Replaced the enlarged CSS-pixel field raster with per-fragment evaluation of the accepted synthetic causal envelope in an offscreen WebGL surface. The complete field copies atomically to an Electric Purple-initialized visible canvas; the deterministic interruptible CPU renderer remains the fallback and reference, and a watchdog cannot erase the last usable frame.
- Added the established small centered white origin dot to the one canonical polarity disk while retaining its thin concentric white border and rejecting every backing, halo, shadow, or directional ornament.
- Added a faint one-CSS-pixel dashed prescribed-translation axis through the source from normalized canvas $x=0.10$ to $x=0.90$, ending in a small positive-$x$ arrowhead. It is a noninteractive reference layer above the field but below exact contours and the source marker.
- Decoupled contour identity from the scale transform. Density now selects from one fixed $24$-member causal-delay master set spanning $T=0.025$ through $0.300$; each member remains the legitimate raw isovalue $64e^{-16T}$. Linear and Signed log2 update only field color and legend labels while the same contour overlay remains present.
- Compared the shared Electric Purple (`#8F00FF`) and Pure Purple (`#800080`) midpoint candidates through a temporary display-only control, then removed that control after the user selected Electric Purple. The locked midpoint changes signed-field interpolation and the legend only; the dark shared stage remains the shell and beta-endpoint empty-space color, so unavailable samples are not painted as numeric zero.
- Reorganized Applications into Learn & Reference, Explore Models, Analyze Evidence, and Build & Simulate child scenes. All existing app scene paths remain direct, and Topo is the fifteenth app under Explore Models.
- Removed TOPO-002 from the live queue. TOPO-003 is now the top queued object and must replace the synthetic provider with independently checked TOPO-001 raw values.

Plainly: the app now has a fixed interface and a safe preview, while the real scientific map remains the next task.

### 2026-08-02 — TOPO-001 Observable And Reference Geometry Closed

- Added [the TOPO-001 contract](topo-observable-and-reference-geometry-v1.md) for the prescribed uniformly translating single-source geometry with $c_f=1$.
- Derived the unique positive causal root for every off-source sample at $0\leq\beta<1$, together with $D_t=\lambda_\beta/\tau_\beta$ and $W^{\mathrm{acc}}=\tau_\beta/\lambda_\beta$.
- Selected `Signed ordinary wake intensity`, $\mathcal I_q^{\mathrm{ord}}=\varsigma_q/(\tau_\beta\lambda_\beta)$, as the first raw scalar and explicitly did not identify it as a scalar potential or receiver acceleration.
- Added the radial $\beta=0$ control, exact equal-distance leading/trailing samples at two regular nonzero speeds, polarity reversal, and the exact $\beta=1$ split between the ordinary trailing half-plane, rootless leading/transverse region, and degenerate source-point family.
- Defined distinct ordinary, singular, unavailable, nonordinary, unresolved, and display-clipped result states plus operator-checkable falsifiers.
- Removed TOPO-001 from the live queue. TOPO-002 is now the top item; the reference surface remains blocked on that display contract. A future true scalar-potential mode remains routed to [Potential](../app-potential/priorities.md).

Plainly: the first map now has one exact raw meaning and exact endpoint behavior. The open potential question remains separate instead of being hidden inside the wake-intensity label.

### 2026-08-02 — Priority Area Created

- Created `app-topo` as a focused two-dimensional prescribed-path viewer rather than an alternative Potential calculation route.
- Captured the fixed normalized source position $(2/3,1/2)$, left-to-right translation, $\beta=v/c_f$ slider, initial electrino/positrino choices, recalculation behavior, tunable contour count, and red-purple-blue signed palette.
- Limited the first release to a static single-time map and deferred dynamics.
- Recorded linear and signed-log2 field-color transforms for controlled comparison; contour spacing remains an independent decision.
- Identified the first blocker: `potential` and a signed $1/r^2$ wake-intensity quantity require distinct mathematical definitions unless a versioned scientific contract explicitly equates or relates them.
- Bound reusable path-to-potential conversion to [Potential](../app-potential/priorities.md) and shared interchange to [AAA Core](../app-aaa-core/priorities.md).
- Queued the observable/reference-geometry contract and the interaction/color contract. No application implementation began.

Plainly: the app idea now has a durable home, but the first colored pixel waits for an exact definition of what its value means.
