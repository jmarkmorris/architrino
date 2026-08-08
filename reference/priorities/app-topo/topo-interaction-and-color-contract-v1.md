# TOPO-002 — Interaction And Color Contract v1

## Contract Status

- Contract identity: `topo_interaction_and_color/v1`
- Product state: accepted for the TOPO-003 reference-surface implementation
- Claim grade: designed display and interaction contract
- Preview input: declared synthetic signed surface only
- Scientific input: none
- Scientific authority: none beyond preserving TOPO-001 result states and raw values supplied later
- View split: `Combined wake` is the default absolute-space chart; `Source-local decades` is a display-only portable chart available for beta-zero single-source scenes
- Display mapping: Physical magnitude is the default signed fill in both views; Enhanced decade contrast is an explicitly display-only analytical option. Source-local decades maps the same raw exponent through one finite equal-step radial chart without changing the raw kernel
- Physical-magnitude reference: $|z|=64$
- Full endpoint-color magnitude: $|z|=64$
- Contour span: integer $1$ through $4$, step $1$, default $3$; span $N$ selects one raw factor-of-ten level at each of $N$ decades inward and $N$ decades outward from the reference, includes the reference exactly once per sign, and retains explicit zero where defined
- Contour visibility: percent range $0$ through $100$, pointer step $0.1$, keyboard step $1$, default $75$

The companion `topo.html` surface is an interaction preview. It uses a declared synthetic signed inverse-square function so that color, contour, panel, and state behavior can be inspected before TOPO-003 connects the TOPO-001 provider. Its visible information card frames the view as a theoretical model without claiming TOPO-001 scientific authority.

Plainly: the preview is a ruler for the interface. Its colored values are not measurements or predictions from the theory.

## Reproducible State Split

The later scientific frame identity contains the scenario identity, source species, $\beta$, observable identity, reception slice, domain, and scientific-kernel version. Display state contains the contour span, contour visibility, coordinate chart, heatmap mode, panel state, and viewport.

Changing $\beta$ changes the unsigned synthetic geometry. Changing scenario reverses polarity over that same geometry. View selection, contour span, contour visibility, and panel state are display-only and must not change the inverse-square kernel or the raw magnitude assigned to a physical point. When Source-local decades is selected at $\beta=0$ in either single-source scenario, contour span also selects the endpoints of the display-only exponent-radius chart and therefore changes the pixel-to-physical-coordinate map; the resulting display frame key changes while the scientific kernel identity does not. An unsupported Source-local selection is atomically returned to Combined wake before a frame is scheduled, with a brief accessible explanation; focus is not moved.

Plainly: speed chooses the synthetic geometry. Species changes its sign. The View radios choose either the combined absolute-space map or, for a stationary single source, its local exponent chart. Neither choice changes the inverse-square calculation.

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

This linear Euclidean chart is the `Combined wake` view for every scenario. The source remains at two-thirds canvas width and vertical center, while equal horizontal and vertical pixel offsets represent equal Euclidean distances. Canvas width and height are part of the display geometry identity.

When `Source-local decades` is selected at $\beta=0$, radial symmetry permits a distinct display-only exponent-radius chart for either single-source polarity. Define

$$
e=\log_{10}(|z|/64),
\qquad
r_{\rm phys}(e)=T_0 10^{-e/2},
\qquad T_0=0.025.
$$

For selected span $N$, $e=+N$ maps to the finite source-marker edge, $e=-N$ maps to the largest complete equal-scale circle inset two CSS pixels from the stage boundary, and all integer exponents between them map affinely to equally spaced display radii. Values inside the inner boundary are masked beneath the opaque source marker and values outside the outer boundary are neutral-clipped; neither region is clamped to an endpoint. Heatmap sampling and contour placement use the same inverse/forward map. Plain integer labels $N,\ldots,0,\ldots,-N$ identify the radial exponent axis.

Plainly: Source-local decades uses exponent as screen radius around one stationary source. Combined wake stays on the ordinary absolute-space plane. Moving and multi-source local charts are not yet accepted because there is no canonical causal-history-aware angular mapping for a portable moving-source chart. Those transitions return to Combined wake rather than publishing an unavailable canvas.

The blocking control is radial symmetry: every $\beta=0$ constant-value contour must have equal screen-pixel width and height at every supported aspect ratio, and consecutive integer exponent circles must have equal radial pixel spacing. At $\beta>0$, each synthetic constant-delay circle shifts trailing by $\beta T$ on the linear chart and therefore preserves the causal leading/trailing asymmetry.

Plainly: a wide screen reveals more world space left and right; it does not stretch circles into ellipses.

## Control Contract

| Control | Location | Accepted behavior |
| --- | --- | --- |
| Scenario | Left panel, first control | `Electrostatic: single electrino`; `Electrostatic: single positrino`; changing it reverses polarity only. Beta, contour range, and contour visibility remain unchanged, and the same analytic geometry is immediately restyled with the new polarity color. |
| View | Unified left Scenario panel | Native radios Source-local decades and Combined wake, with Combined wake checked by default. Source-local is available only for beta-zero single-source scenes. Unsupported moving or multi-source transitions atomically select Combined wake, preserve focus, and announce the reason. |
| $\beta=v/c_f$ | Left panel below scenario | Range $0\leq\beta\leq1$, step $0.01$, keyboard-operable, with visible numeric output and `aria-valuetext`; changing it creates a fresh raw-frame identity. |
| Heatmap | Unified left Scenario panel | Native radios Physical magnitude (default) and Enhanced decade contrast. Physical magnitude blends $|z|/64$ toward the selected neutral background, so each lower exponent decade contributes one tenth as much fill. Enhanced contrast is display-only. Neither mode changes raw values, histories, contours, or scientific frame identity. |
| Contour span | Unified left Scenario panel | Integer $1$ through $4$, step $1$, default $3$. Span $N$ selects integer exponents $+N$ through $-N$, one line per raw factor of ten, the reference included once, symmetric signed families, and explicit zero where defined. In linear scenes shared levels retain exact world positions and topology. In a $\beta=0$ single-source scene, $N$ selects the exponent-radius endpoints and the same levels occupy equal radial display steps. The cue reads One contour per factor of 10 in wake intensity. |
| Contour visibility | Unified left Scenario panel | Percent range $0$ through $100$, pointer step $0.1$, keyboard step $1$, default $75$; changes opacity only. At $0$ the output reads `Hidden`. Nonzero decade lines have equal width and opacity with one adaptive high-contrast family-colored stroke; zero is slightly thicker. Device-pixel scaling preserves apparent width. |
| Legend | Left panel near display controls | Always visible while the panel is open; names the active heatmap transfer and integer wake-intensity exponents relative to $|z|=64$. Physical magnitude copy states the tenfold falloff; enhanced copy identifies a display-only analytical transfer. Contours remain the topology carrier when weak physical fill is nearly neutral. |
| Panel toggle | Persistent left rail | Uses `PanelCollapseIcons.js`, updates name and `aria-expanded`, preserves the reopen control, and makes closed content hidden and inert. |
| Shared chrome | Top-right safe area | Stable order is `Home`, `Back`, `Forward`, `Search`, then any declared Notes/Documents and Settings controls. TOPO-002 declares only the first four. Home retains the shared Applications-return behavior. |

Plainly: the controls that change the requested data are separated from the controls that only change its presentation, and a collapsed panel can always be reopened by keyboard or pointer.

## Signed Base-10 Color And Logarithmic Contour Contract

For a raw ordinary value $z$, Physical magnitude is the default heatmap transfer in both views:

$$
P(z)=\operatorname{sgn}(z)\min\!\left(1,\frac{|z|}{64}\right).
$$

Thus wake-intensity exponents $e=0,-1,-2,-3$ contribute $1,0.1,0.01,0.001$ of the polarity endpoint color over the selected neutral background. Contour strokes are composited separately and remain legible when the physical-magnitude fill is nearly neutral.

Enhanced decade contrast is an optional analytical display transfer. Let $e_c=\operatorname{clip}(\log_{10}(|z|/64),-N,N)$, $f=e_c-\lfloor e_c\rfloor$, and $d=\lfloor e_c\rfloor+f^2(3-2f)$. Then

$$
E_N(z)=\operatorname{sgn}(z)\left(\frac{d+N}{2N}\right)^{0.72}.
$$

This optional transfer changes only color contrast. It does not change $z$, any contour level or position, a source history, the coordinate chart, or scientific frame identity. Zero maps to the selected neutral color.

The contour lattice is fixed independently of viewport, polarity, interaction, and color mapping. With $T_0=0.025$, every level is

$$
T_m=T_0 10^{-m/2},
\qquad
I_m=\frac{K}{T_m^2}=64\,10^m,
\qquad
m\in\{-N,\ldots,0,\ldots,N\}.
$$

For selected span $N$, positive $m$ gives the higher-magnitude inward family and negative $m$ gives the lower-magnitude outward family. The reference $m=0$ appears exactly once. Consecutive raw levels differ by a factor of ten. On linear charts, inverse-square geometry places consecutive single-source physical radii at the true ratio $1/\sqrt{10}$ inward or $\sqrt{10}$ outward. On the $\beta=0$ single-source exponent-radius chart, those same physical radii map to equal display-radius steps. Visibility changes opacity only. A value with $|z|>64$ retains its private raw value and receives the internal state qualifier `ordinary:display_clipped`; only the physical-magnitude fill reaches full endpoint color.

Plainly: every line still means one tenfold change in raw signed wake intensity. Source-local decades spaces those exponents evenly around a stationary single source; Combined wake keeps linear absolute-space coordinates.

Within the finite Source-local decades annulus, the selected heatmap transfer uses the raw value sampled by the same inverse/forward chart as the rings. Physical magnitude remains the default, so outward decades rapidly approach neutral while the contour rings retain the full decade topology. Enhanced decade contrast may be selected to reveal weak fill, and is explicitly labeled display-only. Neither transfer changes the approved ring spacing, labels, mask relationship, or physical radius associated with an exponent.

Plainly: the rings show the selected exponent sequence even when honest magnitude makes distant fill faint. Enhanced contrast is available for inspection, but it is not the physical-magnitude view.

## Analytic Field And Contour Rendering Contract

The canvas requests the available device-pixel density. A safety ceiling limits either dimension to $4096$ device pixels and total area to $12{,}582{,}912$ device pixels. The preferred synthetic-provider path evaluates the causal-delay, inverse-square magnitude, and selected signed heatmap transfer per display fragment in an offscreen WebGL surface, then atomically copies the complete result to the visible canvas. Beta, polarity, midpoint, and display-range calibration are uniforms. A deterministic interruptible Canvas2D implementation remains the boot fallback and CPU reference. The visible canvas is initialized to Electric Purple and retains its last valid frame if either path fails; a watchdog stops indefinite refinement without blanking the usable preview.

For every positive selected constant delay $T$, the synthetic provider has the exact physical isoline

$$
(u+\beta T)^2+w^2=T^2.
$$

In Combined wake, Topo draws one direct Canvas2D arc centered at $(2/3-\beta T,1/2)$ with physical radius $T$ on the linear chart. In Source-local decades, it maps the beta-zero circle through the exponent-radius chart and draws the corresponding display-radius ring, using the same map as the heatmap. The immediate and final contour paths are the same atomic vector overlay: no marching-squares extraction, partial batches, low-resolution tessellation, or delayed refinement runs for this provider. Clipping occurs only at the declared chart boundary. Plain `e=` labels are placed on visible rings when space allows, never inside the source mask, and are collision-suppressed.

Contour styling is uniform around every nonzero level: equal width and opacity with one adaptive high-contrast family-colored stroke. The explicit zero contour is slightly thicker and uses pale lavender on Purple or Electric Purple on White. Visibility is the only opacity gain, and range only filters fixed level identities. No level sign, polarity, draw order, cache timing, or range interaction perturbs existing radii or topology.

Neither fragment evaluation nor vector contour styling writes back to the raw provider, geometry, frame identity, or state classification. A future sampled TOPO-001 provider may use a separate general contour implementation without weakening this boundary.

Plainly: the synthetic formula is evaluated sharply at the screen, and its contours are complete mathematical circles. Source-local decades shows exact raw exponents on the approved local chart; Combined wake shows their absolute-space positions.

## Signed Color Contract

The ordinary scalar palette is fixed to the shared semantic data tokens:

$$
\text{negative}\rightarrow\text{zero}\rightarrow\text{positive}
=
\text{blue}\rightarrow\text{purple}\rightarrow\text{red}.
$$

Interpolation is piecewise linear in sRGB between `--ui-data-negative`, `--ui-data-zero`, and `--ui-data-positive`. The shared `--ui-data-zero` semantic resolves through `--ui-color-electric-purple` to the accepted Electric Purple (`#8F00FF`) midpoint. The zero tick is always present. The palette is supplemented by raw numbers and state text; color is never the only carrier of meaning. The shared dark stage remains a shell/empty-space color and is not substituted for a numeric zero.

Plainly: blue always means negative, purple means zero, and red means positive. A reader can still determine the state without relying on color perception.

## Private Nonnumeric And Lifecycle Guards

| State | Visual treatment | Accessible treatment |
| --- | --- | --- |
| `ordinary` | Signed blue-purple-red fill and contours | Private numeric value remains available to the renderer. |
| `ordinary:display_clipped` | Endpoint color | Preserved private raw value and internal clipped qualifier. |
| `singular:endpoint_source` | One compact canonical architrino disk: standard blue electrino or standard red positrino with the established thin centered white body stroke and small canonical white origin dot. Masked display pixels beneath it use the same-polarity field endpoint color so no second object-like underlay appears. | Private state remains singular; no raw number is fabricated. |
| `unavailable:no_positive_causal_root` | Electric Purple neutral midpoint with no boundary, texture, tint, or region ornament; this is display-only and does not supply a raw zero | Private state remains `unavailable`; no raw number. |
| `unavailable:source_local_chart` | Neutral canvas with a short notice that Source-local decades is not yet available for the selected moving or multi-source scene | No chart or field value is fabricated; Combined wake remains available. |
| `nonordinary:degenerate_root_family` | The same compact canonical architrino disk | Private state remains nonordinary; no raw number is fabricated. |
| `unresolved:numeric_failure` | Dark error hatch reserved for TOPO-003 | Polite live status announces calculation failure; no raw number. |
| `loading` | Reserved neutral veil before any current preview exists | Polite live region announces that the initial frame is computing. |
| `refining` | A current low-density interaction preview remains visible while interruptible work replaces it with the full-density frame | Polite live region announces that full-density refinement continues. |
| `complete` | Loading veil removed only after the matching frame is ready | Polite live region announces the matching frame identity is complete. |

At $\beta=1$, the preview demonstrates the TOPO-001 state layout without evaluating its raw ordinary formula: the strict trailing half-plane remains available for the synthetic comparison surface, while the leading half-plane and off-source transverse line use the Electric Purple neutral display midpoint and the Signed ordinary wake-intensity product reports unavailable with no raw number. The source uses the nonordinary treatment.

Plainly: the endpoint void and numeric zero share a neutral display color, while the private typed state still distinguishes no value from zero.

## Layout And Accessibility Contract

- The user-facing header is `Wake Topological Map` with the subtitle `Two-dimensional prescribed motion`; internal TOPO work-item/version labels do not appear in that header.
- The first information card is titled `About this view` and says exactly: `Explore theoretical two-dimensional views of signed wake intensity around prescribed path scenarios.` Internal preview, validation, and work-item language does not appear in the visible card.
- The stage and shell consume the shared semantic tokens from `ui-tokens.css`; Topo adds no app-local shell palette.
- The left panel opens at a desktop width near $360$ pixels and collapses to a persistent $58$-pixel rail.
- Below $820$ pixels, the panel begins collapsed and expands as an overlay over the stage. The shared top-right controls retain $32\times32$ hit targets.
- The single compact source marker remains anchored at normalized $(2/3,1/2)$ in every viewport. It reuses the repository's standard solid blue electrino and solid red positrino semantics with the same thin centered white circular stroke and small centered white origin dot as the Causal Delay Feedback marker treatment. No backing shape, glow, shadow, inset, or direction ornament is permitted; direction is reported in the scenario facts.
- Source-local decades uses the approved equally spaced integer-exponent rings themselves as the coordinate guide. Their labels avoid the source marker and each other and may be suppressed when no collision-free placement exists. Combined wake retains scenario-specific absolute-space overlays only where the scenario declares one.
- Every form control has a visible label, every icon button has an accessible name, and all focusable controls receive a visible focus treatment.
- Range controls keep a fixed five-pixel visual track and fixed-size thumb in default, hover, focus, active, and drag states. Their larger transparent interaction lane does not render; keyboard focus is shown only around the thumb.
- Closed panel content is hidden, `aria-hidden`, and inert. The reopen control stays focusable.
- Under `prefers-reduced-motion: reduce`, panel and control transitions are removed; state changes remain immediate and complete.

Plainly: the same controls work by touch, pointer, and keyboard, and motion preferences change animation rather than functionality.

## TOPO-003 Handoff

TOPO-003 may replace only the synthetic surface provider and internal provenance. It must retain this contract's state split, one signed base-10 mapping, fixed scale, symmetric inward/outward raw-decade contour lattice, palette semantics, contour span, shell behavior, navigation order, endpoint treatments, and accessibility behavior unless a separately reviewed contract supersedes them.

The TOPO-003 implementation is accepted only when independent analytical references verify its raw TOPO-001 samples. Agreement with this synthetic preview is not scientific evidence.

Plainly: the preview decides how supplied values are shown. The next task must independently prove that the supplied values are the right ones.
