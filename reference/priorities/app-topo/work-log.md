# Topo App Work Log

This file is the chronological work log for the `app-topo` priority area. Use [priorities.md](priorities.md) for strategy, [work-queue.md](work-queue.md) for accepted executable work, [requirements-and-design.md](requirements-and-design.md) for the current application boundary, and [brainstorming.md](brainstorming.md) for provisional ideas.

## Log Entries

### 2026-08-02 — TOPO-002 Interaction And Color Contract Closed

- Added [the TOPO-002 contract](topo-interaction-and-color-contract-v1.md) and an explicitly labeled synthetic interaction preview at `topo.html`.
- Fixed `Asinh` as the v1 default, with $z_*=4$, a symmetric ordinary display clip at $|z|=64$, and $24$ contour levels adjustable from $8$ through $48$.
- Kept scenario and $\beta$ in raw-frame identity while contour density, contour visibility, transform, and panel state remain display-only state.
- Bound Topo to the shared semantic shell tokens, shared panel icon, existing Applications-return behavior, global search runtime, keyboard focus, reduced-motion treatment, and responsive $58$-pixel collapse rail.
- Defined distinct signed ordinary, clipped, singular, unavailable, nonordinary, unresolved, loading, and complete presentation states. The preview uses no TOPO-001 raw values.
- Refined the preview to one source-anchored synthetic causal envelope, a single compact polarity-colored source marker, continuous full-density field color, and anti-aliased interpolated contours. The canvas uses available device-pixel density up to an explicit safety ceiling; smoothing never writes back to provider values.
- Aligned both native dropdowns and their option text with the shared left-panel typography while retaining native selection, focus, and responsive behavior.
- Split rendering into an immediate coalesced interaction preview and interruptible full-density refinement. Raw frames are cached only by scenario, $\beta$, and pixel size; transform and contour changes reuse that raw field, and stale refinement is cancelled so sliders do not block behind obsolete work.
- At the exact $\beta=1$ endpoint, retained unavailable product typing while replacing the large diagonal hatch and later dark void with the Electric Purple neutral display midpoint. The front carries no special region ornament and no sample receives a fabricated raw number.
- Replaced the custom source glyph with the repository's canonical architrino semantics: a solid standard-blue electrino disk or solid standard-red positrino disk with the established thin centered white body stroke, and no backing shape, glow, shadow, inset, tail, or direction ornament.
- Made scenario switching polarity-only: non-default beta, contour density, contour visibility, and transform persist, while the opposite-polarity raw cache and contour-level mapping are derived from the current synthetic frame so visible contours recolor immediately without a provider rebuild.
- Added a display-only Contour visibility slider with a legible $60\%$ default. It continuously increases one anti-aliased stroke's opacity, canonical-white mix, and CSS-consistent width, reaching fully opaque canonical white at $2$ CSS pixels at the maximum. It reuses cached raw and field frames so field color, contour geometry, source, states, and provider values remain unchanged.
- Recast Contour levels as continuous Contour density. The control fades a fixed set of valid isolines in and out at tenth-percent pointer resolution while retaining one-percent keyboard steps; no fractional line count is shown and no isoline is displaced.
- Kept every range track at a fixed thin visual thickness through hover, focus, active, and drag states. A transparent larger interaction lane preserves touch use, and keyboard focus is localized to the fixed-size thumb rather than outlining the whole track.
- Corrected the canvas-to-world chart to use one canvas-height per Euclidean world unit on both axes. Raw sampling, caches, contours, and resizing now share that mapping, making the $\beta=0$ control circular on wide and mobile canvases without removing $\beta>0$ causal asymmetry.
- Removed the object-like dark oval created by the singular display mask beneath the canonical source disk. The mask remains nonnumeric in provider semantics but composites with the same-polarity field endpoint color, leaving exactly one visible architrino object.
- Removed both lower-corner canvas text boxes. The left-panel Interaction Contract Preview retains the synthetic-data disclosure, while runtime completion updates remain available through an offscreen polite live region.
- Removed the visible Singular / Unavailable / Loading state-key row from the Signed ordinary values card and deleted its dedicated markup and styling. Typed renderer guards and offscreen status remain intact.
- Removed the visible Source marker and Frame rows from the Scenario record while retaining source placement and frame identity in internal state and tests.
- Removed the Raw probe subpanel, all canvas pointer-probe state and handlers, its raw/transformed/identity readout rendering, and the unused runtime sampling method. No replacement diagnostic panel was added; core provider calculations and private validity guards remain.
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
- Recorded linear, signed-log2, and asinh display transforms for controlled comparison, with asinh as the leading but unselected default candidate.
- Identified the first blocker: `potential` and a signed $1/r^2$ wake-intensity quantity require distinct mathematical definitions unless a versioned scientific contract explicitly equates or relates them.
- Bound reusable path-to-potential conversion to [Potential](../app-potential/priorities.md) and shared interchange to [AAA Core](../app-aaa-core/priorities.md).
- Queued the observable/reference-geometry contract and the interaction/color contract. No application implementation began.

Plainly: the app idea now has a durable home, but the first colored pixel waits for an exact definition of what its value means.
