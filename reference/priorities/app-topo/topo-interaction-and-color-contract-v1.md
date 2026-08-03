# TOPO-002 — Interaction And Color Contract v1

## Contract Status

- Contract identity: `topo_interaction_and_color/v1`
- Product state: accepted for the TOPO-003 reference-surface implementation
- Claim grade: designed display and interaction contract
- Preview input: declared synthetic signed surface only
- Scientific input: none
- Scientific authority: none beyond preserving TOPO-001 result states and raw values supplied later
- Display mapping: one zero-safe signed base-10 logarithmic mapping
- Reference scale: $z_*=4$
- Ordinary display-clip magnitude: $z_{\max}=64$
- Contour range: continuous $1.0$ through $3.0$ intensity decades, pointer step $0.1$ percent, keyboard step $1$ percent, default $2.0$ decades at the $40%$ slider position
- Contour visibility: percent range $0$ through $100$, pointer step $0.1$, keyboard step $1$, default $75$

The companion `topo.html` surface is an interaction preview. It uses a declared synthetic signed inverse-square function so that color, contour, panel, and state behavior can be inspected before TOPO-003 connects the TOPO-001 provider. Its visible information card frames the view as a theoretical model without claiming TOPO-001 scientific authority.

Plainly: the preview is a ruler for the interface. Its colored values are not measurements or predictions from the theory.

## Reproducible State Split

The later scientific frame identity contains the scenario identity, source species, $\beta$, observable identity, reception slice, domain, and scientific-kernel version. Display state contains the contour range, contour visibility, fixed color scale, panel state, and viewport.

Changing $\beta$ changes the unsigned synthetic geometry. Changing scenario reverses polarity over that same geometry. Contour range, contour visibility, and panel state are display-only and must not change any raw magnitude sample.

Plainly: speed chooses the synthetic geometry. Species changes its sign, while the contour and color controls only change how the same geometry is shown.

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

## Aspect-Correct Euclidean Chart

For canvas pixel coordinates $(p_x,p_y)$, width $W$, and height $H$, provider coordinates use one common scale $H$:

$$
x=\frac23+\frac{p_x-(2/3)W}{H},
\qquad
y=\frac12+\frac{(1/2)H-p_y}{H}.
$$

The source therefore remains at two-thirds canvas width and vertical center, while equal horizontal and vertical pixel offsets represent equal Euclidean distances. The deterministic CPU reference, analytic display renderer, exact contour arcs, and resize handling all use this same chart. Canvas width and height are part of the display geometry identity.

The blocking control is $\beta=0$: every constant-value contour must have equal screen-pixel width and height at every supported aspect ratio. A horizontal and vertical pixel displacement of the same magnitude from the source must return the same raw synthetic value. At $\beta>0$, each synthetic constant-delay circle shifts trailing by $\beta T$ and therefore preserves the causal leading/trailing asymmetry.

Plainly: a wide screen reveals more world space left and right; it does not stretch circles into ellipses.

## Control Contract

| Control | Location | Accepted behavior |
| --- | --- | --- |
| Scenario | Left panel, first control | `Electrostatic: single electrino`; `Electrostatic: single positrino`; changing it reverses polarity only. Beta, contour range, and contour visibility remain unchanged, and the same analytic geometry is immediately restyled with the new polarity color. |
| $\beta=v/c_f$ | Left panel below scenario | Range $0\leq\beta\leq1$, step $0.01$, keyboard-operable, with visible numeric output and `aria-valuetext`; changing it creates a fresh raw-frame identity. |
| Contour range | Left panel, display section | Continuous $1.0$ through $3.0$ intensity decades, shown to one decimal; default $2.0$ decades at slider position $40\%$. The fixed lattice has three equal log-intensity intervals per decade. Moving the control retains every existing radius and cross-fades only the next outward valid level; no contour moves or re-anchors. The compact cue reads `3 levels / decade · I ∝ 1/r²`. |
| Contour visibility | Left panel, display section | Percent range $0$ through $100$, pointer step $0.1$, keyboard step $1$, default $75$; continuously applies global opacity, canonical-white mix, and width gain to the contour profile. The complete selected set is sorted by causal radius, then receives one deterministic linear fade from the clearly bright inner treatment to a visible outer floor. At $0$ the set is hidden; at $100$ the innermost treatment reaches canonical white and $2$ CSS pixels while the sequential outward fade remains. Device-pixel scaling preserves apparent width. |
| Legend | Left panel near display controls | Always visible while the panel is open; names the signed base-10 logarithmic mapping, $z_*$, decade-oriented raw reference values, and zero. No visible nonnumeric-state row or raw-probe panel is retained. |
| Panel toggle | Persistent left rail | Uses `PanelCollapseIcons.js`, updates name and `aria-expanded`, preserves the reopen control, and makes closed content hidden and inert. |
| Shared chrome | Top-right safe area | Stable order is `Home`, `Back`, `Forward`, `Search`, then any declared Notes/Documents and Settings controls. TOPO-002 declares only the first four. Home retains the shared Applications-return behavior. |

Plainly: the controls that change the requested data are separated from the controls that only change its presentation, and a collapsed panel can always be reopened by keyboard or pointer.

## Signed Base-10 Color And Logarithmic Contour Contract

For a raw ordinary value $z$, the one display coordinate is

$$
C_{10}(z)=\operatorname{sgn}(z)\log_{10}\!\left(1+\frac{|z|}{z_*}\right).
$$

The display normalization is symmetric:

$$
\widehat C(z)=
\operatorname{clip}
\left(
\frac{C_{10}(z)}{C_{10}(z_{\max})},-1,1
\right),
\qquad z_{\max}=64.
$$

The contour lattice is fixed independently of viewport, polarity, interaction, and color mapping. With $T_0=0.025$, every level is

$$
T_n=T_0 10^{n/6},
\qquad
I_n=\frac{K}{T_n^2},
\qquad
\frac{I_{n+1}}{I_n}=10^{-1/3}.
$$

Thus each outward step is one third of an intensity decade, major decade anchors occur at $n=0,3,6,9$, and the fixed labels are $10^0$, $10^{-1}$, $10^{-2}$, and $10^{-3}$. The range control reveals a prefix of this lattice from one through three decades and uses the next level's opacity as the continuous fractional state. A value with $|z|>z_{\max}$ retains its private raw value and receives the internal state qualifier `ordinary:display_clipped`.

Plainly: the colors use one orders-of-magnitude mapping, and the circles use one fixed three-steps-per-decade ruler. Neither changes its meaning from frame to frame.

## Analytic Field And Contour Rendering Contract

The canvas requests the available device-pixel density. A safety ceiling limits either dimension to $4096$ device pixels and total area to $12{,}582{,}912$ device pixels. The preferred synthetic-provider path evaluates the causal-delay, inverse-square magnitude, and signed base-10 color mapping per display fragment in an offscreen WebGL surface, then atomically copies the complete result to the visible canvas. Beta, polarity, midpoint, and display-range calibration are uniforms. A deterministic interruptible Canvas2D implementation remains the boot fallback and CPU reference. The visible canvas is initialized to Electric Purple and retains its last valid frame if either path fails; a watchdog stops indefinite refinement without blanking the usable preview.

For every positive selected constant delay $T$, the synthetic provider has the exact isoline

$$
(u+\beta T)^2+w^2=T^2.
$$

Topo therefore draws one direct Canvas2D arc centered at $(2/3-\beta T,1/2)$ with radius $T$. The immediate and final contour paths are the same atomic vector overlay: no marching-squares extraction, partial batches, low-resolution tessellation, or delayed refinement runs for this provider. Clipping occurs only at the canvas boundary. Major-decade labels appear at the trailing intersection with the faint positive-$x$ axis when space allows and are suppressed on narrow viewports.

Contour styling is uniform around each circle. The complete lattice is sorted by increasing causal delay $T$, with normalized sequential position $p=i/(N-1)$ over the fixed ten-member lattice. Opacity is multiplied by $1-0.60p$, canonical-white mix by $1-0.55p$, and width by $1-0.25p$. The resulting outer floors remain visible at the $75\%$ default. Contour range cross-fades only the next outward level; visibility remains the global gain. No level sign, polarity, draw order, cache timing, or range interaction perturbs existing radii or their sequential profile.

Neither fragment evaluation nor vector contour styling writes back to the raw provider, geometry, frame identity, or state classification. A future sampled TOPO-001 provider may use a separate general contour implementation without weakening this boundary.

Plainly: the synthetic formula is evaluated sharply at the screen, and its contours are complete mathematical circles. Every selected circle appears once, fading steadily from the inside outward.

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
| `nonordinary:degenerate_root_family` | The same compact canonical architrino disk | Private state remains nonordinary; no raw number is fabricated. |
| `unresolved:numeric_failure` | Dark error hatch reserved for TOPO-003 | Polite live status announces calculation failure; no raw number. |
| `loading` | Reserved neutral veil before any current preview exists | Polite live region announces that the initial frame is computing. |
| `refining` | A current low-density interaction preview remains visible while interruptible work replaces it with the full-density frame | Polite live region announces that full-density refinement continues. |
| `complete` | Loading veil removed only after the matching frame is ready | Polite live region announces the matching frame identity is complete. |

At $\beta=1$, the preview demonstrates the TOPO-001 state layout without evaluating its raw ordinary formula: the strict trailing half-plane remains available for the synthetic comparison surface, while the leading half-plane and off-source transverse line use the Electric Purple neutral display midpoint and the Signed ordinary wake-intensity product reports unavailable with no raw number. The source uses the nonordinary treatment.

Plainly: the endpoint void and numeric zero share a neutral display color, while the private typed state still distinguishes no value from zero.

## Layout And Accessibility Contract

- The user-facing header is `Wake Intensity Map` with the subtitle `Two-dimensional prescribed-motion slice`; internal TOPO work-item/version labels do not appear in that header.
- The first information card is titled `About this view` and says exactly: `Explore a theoretical two-dimensional view of signed wake intensity around a prescribed electrino or positrino.` Internal preview, validation, and work-item language does not appear in the visible card.
- The stage and shell consume the shared semantic tokens from `ui-tokens.css`; Topo adds no app-local shell palette.
- The left panel opens at a desktop width near $360$ pixels and collapses to a persistent $58$-pixel rail.
- Below $820$ pixels, the panel begins collapsed and expands as an overlay over the stage. The shared top-right controls retain $32\times32$ hit targets.
- The single compact source marker remains anchored at normalized $(2/3,1/2)$ in every viewport. It reuses the repository's standard solid blue electrino and solid red positrino semantics with the same thin centered white circular stroke and small centered white origin dot as the Causal Delay Feedback marker treatment. No backing shape, glow, shadow, inset, or direction ornament is permitted; direction is reported in the scenario facts.
- A noninteractive prescribed-translation reference axis runs horizontally through the source from normalized canvas $x=0.10$ to $x=0.90$. It is a one-CSS-pixel canonical-white dashed stroke at $52\%$ opacity with a five-CSS-pixel far-right arrowhead. It is painted above the field but below every contour and the source marker, and its canvas description identifies it as a positive-$x$ reference rather than a trajectory or wake boundary. Major-decade labels sit above and outside their trailing axis/ring intersections so neither the dashed line nor the contour stroke crosses a character; narrow layouts retain the same nine-CSS-pixel type, clamp labels beyond the persistent collapse rail, and use collision tiers before any label suppression.
- Every form control has a visible label, every icon button has an accessible name, and all focusable controls receive a visible focus treatment.
- Range controls keep a fixed five-pixel visual track and fixed-size thumb in default, hover, focus, active, and drag states. Their larger transparent interaction lane does not render; keyboard focus is shown only around the thumb.
- Closed panel content is hidden, `aria-hidden`, and inert. The reopen control stays focusable.
- Under `prefers-reduced-motion: reduce`, panel and control transitions are removed; state changes remain immediate and complete.

Plainly: the same controls work by touch, pointer, and keyboard, and motion preferences change animation rather than functionality.

## TOPO-003 Handoff

TOPO-003 may replace only the synthetic surface provider and internal provenance. It must retain this contract's state split, one signed base-10 mapping, fixed scale, inverse-square logarithmic contour lattice, palette semantics, contour range, shell behavior, navigation order, endpoint treatments, and accessibility behavior unless a separately reviewed contract supersedes them.

The TOPO-003 implementation is accepted only when independent analytical references verify its raw TOPO-001 samples. Agreement with this synthetic preview is not scientific evidence.

Plainly: the preview decides how supplied values are shown. The next task must independently prove that the supplied values are the right ones.
