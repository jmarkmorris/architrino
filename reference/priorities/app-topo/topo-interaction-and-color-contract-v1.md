# TOPO-002 — Interaction And Color Contract v1

## Contract Status

- Contract identity: `topo_interaction_and_color/v1`
- Product state: accepted for the TOPO-003 reference-surface implementation
- Claim grade: designed display and interaction contract
- Preview input: declared synthetic signed surface only
- Scientific input: none
- Scientific authority: none beyond preserving TOPO-001 result states and raw values supplied later
- Coordinate chart: one linear Euclidean absolute-space chart for every scenario
- Pair perspective: native `Electrino` and `Positrino` radios appear only for the collinear and orbiting pair scenarios; the selected observer's self-wake is excluded and only its partner's admitted wake enters the raw field, contours, and shading
- Display mapping: bounded square-root visibility transfer with an adjustable display-only reach, applied only after raw-field and contour calculations
- Shading spread: percent range $0$ through $100$, step $1$, default $50$; maps to $0.25$ through $4$ times the default color reach without changing raw values or contours
- Visibility midpoint: at the default shading spread, $|z|=64$ maps to half of the polarity endpoint color
- Contour count: integer $4$ through $25$, step $1$, default $13$; selects genuine equal-wake thresholds across the fixed raw range without interpolating line geometry
- Contour visibility: percent range $0$ through $100$, pointer step $0.1$, keyboard step $1$, default $75$

The companion `topo.html` surface is an interaction preview. It uses a declared synthetic signed inverse-square function so that color, contour, panel, and state behavior can be inspected before TOPO-003 connects the TOPO-001 provider. Its visible information card frames the view as a theoretical model without claiming TOPO-001 scientific authority.

Plainly: the preview is a ruler for the interface. Its colored values are not measurements or predictions from the theory.

## Reproducible State Split

The later scientific frame identity contains the scenario identity, source species, selected pair observer, retained partner source, $\beta$, observable identity, reception slice, domain, and scientific-kernel version. Display state contains shading spread, contour count, contour visibility, the fixed coordinate chart, panel state, and viewport.

Changing $\beta$ changes the prescribed geometry. Changing a single-source scenario reverses polarity over that geometry. In a pair scenario, changing Perspective changes the scientific frame identity: it removes the selected observer's source contribution and retains only the partner contribution. Shading spread, contour count, contour visibility, panel state, neutral background, and display scale remain display-only and must not change the inverse-square kernel or a retained partner value at a physical point.

Plainly: speed chooses the prescribed geometry. In a pair, Perspective chooses whose surroundings are being inspected. Choosing Electrino displays only the positrino wake; choosing Positrino displays only the electrino wake.

The TOPO-002 preview uses the accepted prescribed causal-root geometry to place
one explicitly non-scientific comparison envelope around the displayed source.
For source-relative coordinates

$$
u=x-2/3,
\qquad
w=y-1/2,
\qquad
\rho^2=u^2+w^2,
$$

define the preview delay coordinate

$$
\tau_{\mathrm{syn}}=
\begin{cases}
\displaystyle
\frac{\rho^2}
{\sqrt{u^2+(1-\beta^2)w^2}-\beta u},
&0\leq\beta<1,\ \rho>0,\\[8pt]
\displaystyle
-\frac{\rho^2}{2u},
&\beta=1,\ u<0.
\end{cases}
$$

The synthetic signed inverse-square magnitude is

$$
z_{\mathrm{syn}}(x,y;\beta,\varsigma_q)
=
\boxed{\varsigma_q\frac{K}{\tau_{\mathrm{syn}}^2}},
\qquad
K=64(0.025)^2=0.04,
$$

where $\varsigma_q=-1$ for the electrino preview and $+1$ for the positrino preview. The anchor $T_0=0.025$ therefore maps to the declared display clip $|z|=64$. This theoretical comparison surface uses only the causal delay and inverse-square magnitude; it is not the TOPO-001 product $\varsigma_q/(\tau_\beta\lambda_\beta)$ and carries no TOPO-001 scientific authority.

Plainly: there is one marker, one causal center, and one signed inverse-square comparison surface. It tests the settled display architecture without presenting itself as the independently checked scientific renderer.

## Coordinate Charts

For canvas pixel coordinates $(p_x,p_y)$, width $W$, and height $H$, provider coordinates use one common scale $H$:

$$
x=\frac23+\frac{p_x-(2/3)W}{H},
\qquad
y=\frac12+\frac{(1/2)H-p_y}{H}.
$$

This linear Euclidean chart is the only coordinate view. A single source remains at two-thirds canvas width and vertical center. Pair scenarios use their declared midpoint or circular center while retaining the same equal horizontal and vertical scale. Canvas width, height, and display scale are part of display geometry identity; the selected observer is part of the pair scientific-frame identity.

At $\beta>0$, each retained source's causal geometry preserves its leading/trailing asymmetry on the linear chart. No exponent-radius or source-local coordinate transform is available.

Plainly: a wide screen reveals more world space left and right; it does not stretch circles into ellipses.

## Control Contract

| Control | Location | Accepted behavior |
| --- | --- | --- |
| Scenario | Left panel, first control | `Electrostatic: single electrino`; `Electrostatic: single positrino`; changing it reverses polarity only. Beta, contour range, and contour visibility remain unchanged, and the same analytic geometry is immediately restyled with the new polarity color. |
| Perspective | Unified left Scenario panel; pair scenarios only | Native radios `Electrino` and `Positrino`. The selected architrino is the observer. Its self-wake is excluded before any field, contour, shading, cache, or diagnostic calculation; only the partner source remains. Both body markers stay visible. |
| `Speed` ($\beta=v/c_f$) | Left panel below scenario | Range $0\leq\beta\leq1$, step $0.01$, keyboard-operable, with visible numeric output and `aria-valuetext`; changing it creates a fresh raw-frame identity. |
| `Topo count` | Unified left Scenario panel | Integer $4$ through $25$, step $1$, default $13$. It selects genuine equal-wake thresholds across the fixed raw range. Pair perspectives retain only thresholds with the partner source's sign. |
| `Shading` | Unified left Scenario panel | Percent range $0$ through $100$, step $1$, default $50$. It adjusts only the characteristic reach of the bounded $1/r$-like color transfer from $0.25$ through $4$ times the default. It has no visible numeric output and changes neither raw wake values nor contours. |
| `Topo fade` | Unified left Scenario panel | Percent range $0$ through $100$, pointer step $0.1$, keyboard step $1$, default $75$; changes opacity only. Nonzero decade lines have equal width and opacity with one adaptive high-contrast family-colored stroke; zero is slightly thicker. Device-pixel scaling preserves apparent width. |
| `Scale` | Unified left Scenario panel | Range $0.5$ through $2$, step $0.25$, default $1$; changes the visible coordinate window while preserving the wake law and raw contour values. |
| Legend | Left panel near display controls | Always visible while the panel is open. It is headed `Shading scale` and states that signed contributions are summed before drawing equal-value topographic contours. The Perspective note and canvas accessible name identify the observer, retained partner source, and self-exclusion rule in pair scenarios. |
| Panel toggle | Persistent left rail | Uses `PanelCollapseIcons.js`, updates name and `aria-expanded`, preserves the reopen control, and makes closed content hidden and inert. |
| Shared chrome | Top-right safe area | Stable order is `Home`, `Back`, `Forward`, `Search`, then any declared Notes/Documents and Settings controls. TOPO-002 declares only the first four. Home retains the shared Applications-return behavior. |

Plainly: the controls that change the requested data are separated from the controls that only change its presentation, and a collapsed panel can always be reopened by keyboard or pointer.

## Adjustable-Reach Visibility Color And Raw Contour Contract

For normalized slider position $s\in[0,1]$, define the display-only reach scale

$$
g(s)=0.25\,16^s.
$$

For a raw ordinary value $z$, the sole heatmap transfer is

$$
C_s(z)=\operatorname{sgn}(z)
\frac{g(s)\sqrt{|z|}}{g(s)\sqrt{|z|}+8}.
$$

The default $s=0.5$ gives $g=1$ and exactly reproduces the prior fixed curve. At that default, $|z|=64$ contributes half of the polarity endpoint color. For the stationary inverse-square wake $|z|=K/r^2$ with $K=64r_0^2$ and $r_0=0.025$, define $a(s)=r_0g(s)$. The visible strength is

$$
|C_s(z(r))|=\frac{a(s)}{r+a(s)}.
$$

Plainly: the raw wake still falls as one over distance squared. The slider changes only how far its gradual one-over-distance-like color remains visible. The bounded denominator prevents a hard color clip near the source.

The renderer calculates the signed raw field and extracts equal-value contour geometry before applying $C_s$ to the field color. The contour extractor never consumes $C_s(z)$, RGB values, or any other shaded quantity.

Plainly: changing how strongly a region is colored cannot move, create, or delete a contour. Every contour remains a threshold of the unshaded wake calculation.

The contour lattice is fixed independently of viewport, polarity, interaction, and color mapping. With $T_0=0.025$, every level is

$$
T_m=T_0 10^{-m/2},
\qquad
I_m=\frac{K}{T_m^2}=64\,10^m,
\qquad
m\in\{-N,\ldots,0,\ldots,N\}.
$$

For selected range $N$, positive $m$ gives the higher-magnitude inward family and negative $m$ gives the lower-magnitude outward family. The reference $m=0$ appears exactly once. Consecutive raw levels differ by a factor of ten. On the linear chart, inverse-square geometry places consecutive single-source physical radii at the true ratio $1/\sqrt{10}$ inward or $\sqrt{10}$ outward. Visibility changes contour opacity only. The bounded color transfer approaches the polarity endpoint asymptotically and does not clip finite ordinary values.

Plainly: every line still means one tenfold change in raw signed wake intensity, and all contour positions remain in ordinary linear space.

## Analytic Field And Contour Rendering Contract

The canvas requests the available device-pixel density. A safety ceiling limits either dimension to $4096$ device pixels and total area to $12{,}582{,}912$ device pixels. The preferred synthetic-provider path evaluates the causal-delay, inverse-square magnitude, and selected signed heatmap transfer per display fragment in an offscreen WebGL surface, then atomically copies the complete result to the visible canvas. Beta, polarity, midpoint, and display-range calibration are uniforms. A deterministic interruptible Canvas2D implementation remains the boot fallback and CPU reference. The visible canvas is initialized to Electric Purple and retains its last valid frame if either path fails; a watchdog stops indefinite refinement without blanking the usable preview.

For every positive selected constant delay $T$, the synthetic provider has the exact physical isoline

$$
(u+\beta T)^2+w^2=T^2.
$$

For a single synthetic source, Topo draws one direct Canvas2D arc centered at $(2/3-\beta T,1/2)$ with physical radius $T$ on the linear chart. Pair scenarios calculate a sampled partner-only raw field and extract contours from that same field. The retained partner's singular point is masked; the selected observer's position remains an ordinary sample whenever the partner wake admits one.

Contour styling is uniform around every nonzero level: equal width and opacity with one adaptive high-contrast family-colored stroke. The explicit zero contour is slightly thicker. Its color changes continuously from pale lavender on Electric Purple to Electric Purple on White, following the same background slider. Visibility is the only opacity gain, and range only filters fixed level identities. No level sign, polarity, draw order, cache timing, or range interaction perturbs existing radii or topology.

Neither fragment evaluation nor vector contour styling writes back to the raw provider, geometry, frame identity, or state classification. A future sampled TOPO-001 provider may use a separate general contour implementation without weakening this boundary.

Plainly: the synthetic formula is evaluated sharply at the screen. Pair contours describe only the retained partner wake in absolute-space coordinates.

## Signed Color Contract

The ordinary scalar palette is fixed to the shared semantic data tokens:

$$
\text{negative}\rightarrow\text{zero}\rightarrow\text{positive}
=
\text{blue}\rightarrow\text{purple}\rightarrow\text{red}.
$$

The neutral display midpoint is controlled by one white-mix parameter $t\in[0,1]$:

$$
C_0(t)=(1-t)\,\text{Electric Purple}+t\,\text{White}.
$$

The interpolation is channel-wise in sRGB, so it adds only white to the accepted Electric Purple (`#8F00FF`) and introduces no other color stop. Signed-field interpolation is then piecewise linear in sRGB between `--ui-data-negative`, $C_0(t)$, and `--ui-data-positive`. The zero tick is always present. The palette is supplemented by raw numbers and state text; color is never the only carrier of meaning. The shared dark stage remains a shell/empty-space color and is not substituted for a numeric zero.

Plainly: blue always means negative, red always means positive, and the neutral midpoint is the existing purple with the slider's chosen amount of white added. A reader can still determine the state without relying on color perception.

## Private Nonnumeric And Lifecycle Guards

| State | Visual treatment | Accessible treatment |
| --- | --- | --- |
| `ordinary` | Signed blue-purple-red fill and contours | Private numeric value remains available to the renderer. |
| `singular:endpoint_source` | One compact canonical architrino disk: standard blue electrino or standard red positrino with the established thin centered white body stroke and small canonical white origin dot. Masked display pixels beneath it use the same-polarity field endpoint color so no second object-like underlay appears. | Private state remains singular; no raw number is fabricated. |
| `unavailable:no_positive_causal_root` | The slider-selected neutral midpoint $C_0(t)$ with no boundary, texture, tint, or region ornament; this is display-only and does not supply a raw zero | Private state remains `unavailable`; no raw number. |
| `nonordinary:degenerate_root_family` | The same compact canonical architrino disk | Private state remains nonordinary; no raw number is fabricated. |
| `unresolved:numeric_failure` | Dark error hatch reserved for TOPO-003 | Polite live status announces calculation failure; no raw number. |
| `loading` | Reserved neutral veil before any current preview exists | Polite live region announces that the initial frame is computing. |
| `refining` | A current low-density interaction preview remains visible while interruptible work replaces it with the full-density frame | Polite live region announces that full-density refinement continues. |
| `complete` | Loading veil removed only after the matching frame is ready | Polite live region announces the matching frame identity is complete. |

At $\beta=1$, the preview demonstrates the TOPO-001 state layout without evaluating its raw ordinary formula: the strict trailing half-plane remains available for the synthetic comparison surface, while the leading half-plane and off-source transverse line use the slider-selected neutral display midpoint $C_0(t)$ and the Signed ordinary wake-intensity product reports unavailable with no raw number. The source uses the nonordinary treatment.

Plainly: the endpoint void and numeric zero share a neutral display color, while the private typed state still distinguishes no value from zero.

## Layout And Accessibility Contract

- The user-facing header is `Wake Topography`; internal TOPO work-item/version labels do not appear in that header.
- The first information card is titled `About this view` and says exactly: `Explore wake topography for source and superposition views around prescribed what if path scenarios.` Internal preview, validation, and work-item language does not appear in the visible card.
- The stage and shell consume the shared semantic tokens from `ui-tokens.css`; Topo adds no app-local shell palette.
- The left panel opens at a desktop width near $360$ pixels and collapses to a persistent $58$-pixel rail.
- Below $820$ pixels, the panel begins collapsed and expands as an overlay over the stage. The shared top-right controls retain $32\times32$ hit targets.
- The single compact source marker remains anchored at normalized $(2/3,1/2)$ in every viewport. It reuses the repository's standard solid blue electrino and solid red positrino semantics with the same thin centered white circular stroke and small centered white origin dot as the Causal Delay Feedback marker treatment. No backing shape, glow, shadow, inset, or direction ornament is permitted; direction is reported in the scenario facts.
- Pair scenarios keep both source markers visible while the Perspective control selects the observer. The Perspective note and canvas accessible name state which partner wake is retained and that self-wake is excluded.
- Every form control has a visible label, every icon button has an accessible name, and all focusable controls receive a visible focus treatment.
- Range controls keep a fixed five-pixel visual track and fixed-size thumb in default, hover, focus, active, and drag states. Their larger transparent interaction lane does not render; keyboard focus is shown only around the thumb.
- Closed panel content is hidden, `aria-hidden`, and inert. The reopen control stays focusable.
- Under `prefers-reduced-motion: reduce`, panel and control transitions are removed; state changes remain immediate and complete.

Plainly: the same controls work by touch, pointer, and keyboard, and motion preferences change animation rather than functionality.

## TOPO-003 Handoff

TOPO-003 may replace only the synthetic surface provider and internal provenance. It must retain this contract's state split, partner-only pair perspective, bounded square-root variable-reach visibility mapping, fixed coordinate scale, raw-decade contour lattice, palette semantics, contour controls, shell behavior, navigation order, endpoint treatments, and accessibility behavior unless a separately reviewed contract supersedes them.

The TOPO-003 implementation is accepted only when independent analytical references verify its raw TOPO-001 samples. Agreement with this synthetic preview is not scientific evidence.

Plainly: the preview decides how supplied values are shown. The next task must independently prove that the supplied values are the right ones.
