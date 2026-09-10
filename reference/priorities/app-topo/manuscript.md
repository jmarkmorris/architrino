# Wake Topography: Prescribed Histories, Causal Samples, and Coordinate Meaning

## 1. What a wake map represents

A wake map begins with a prescribed source history and an observation event. It asks which earlier source events can reach that observation point and which declared scalar should be assigned to those events. Geometry, scalar evaluation, and presentation are separate mathematical operations. A colored image can be correct for its declared scalar without establishing that the scalar is a potential, an acceleration, or a self-consistent account of subsequent motion.

The local development of Wake Topography supplies a useful common core: Euclidean spatial coordinates, absolute reception time, positive causal delay, explicit source polarity, and typed results that distinguish ordinary numbers from unavailable or singular samples. Every numerical value below uses normalized wake speed $c_f=1$. Prescribed source speeds are denoted by $\beta\in[0,1]$. Neither this interval nor a slider endpoint derives a physical speed ceiling.

The retained descriptions also contain incompatible presentation and scenario contracts. A stationary source-local decade chart, a linear absolute-space map, a receiver-selected partner map, and a signed two-source aggregate answer different questions. Their distinctions matter even when their colors look alike. The exposition develops the shared geometry first and identifies each alternative at the point where its assumptions change. It does not infer the current application implementation from documentary statements alone.

## 2. A uniformly translating source

### 2.1. Positive delay and the unique sub-wake-speed root

At reception time zero, place the source at $\mathbf x_0=(2/3,1/2)$ and prescribe its past path by $\mathbf X(s)=\mathbf x_0+\beta s\mathbf e_x$ for $s\leq0$. Write the observation displacement as $(u,w)=\mathbf x-\mathbf x_0$ and set $\rho^2=u^2+w^2$. A positive delay $\tau=-s$ must satisfy

$$
\sqrt{(u+\beta\tau)^2+w^2}=\tau,
\qquad
(1-\beta^2)\tau^2-2\beta u\tau-\rho^2=0.
$$

For $0\leq\beta<1$ away from the source, define $\lambda_\beta=\sqrt{u^2+(1-\beta^2)w^2}$. The positive root and its rationalized form are

$$
\tau_\beta=\frac{\beta u+\lambda_\beta}{1-\beta^2}
=\frac{\rho^2}{\lambda_\beta-\beta u}.
$$

Here $\lambda_\beta>|\beta u|$ away from the source, so the displayed root is positive and the other quadratic root is negative. These statements concern the declared infinite uniform past. A source that begins moving after a stationary past has a different history and cannot generally use this root everywhere.

Let $\mathbf R=(u+\beta\tau,w)$, $r=\|\mathbf R\|=\tau$, and $\widehat{\mathbf R}=\mathbf R/r$. The transmitter-side factor in the ordinary diagnostic is

$$
D_t=1-\beta\widehat{\mathbf R}_x=\frac{\lambda_\beta}{\tau_\beta}>0,
\qquad W^{\mathrm{acc}}=\frac{1}{D_t}=\frac{\tau_\beta}{\lambda_\beta}.
$$

The superscript records the source's weight notation. It does not make the scalar map a complete acceleration. A receiver polarity, coupling magnitudes, and a direction of acceleration are absent from this scalar definition.

### 2.2. Signed ordinary wake intensity

Assign polarity $\varsigma_q=-1$ to an electrino and $+1$ to a positrino. The uniform-source reference contract defines

$$
\mathcal I_q^{\mathrm{ord}}=\frac{\varsigma_q}{r^2}W^{\mathrm{acc}}
=\frac{\varsigma_q}{\tau_\beta\lambda_\beta}.
$$

This is a declared ordinary wake diagnostic. At $\beta=0$ it becomes $\varsigma_q/\rho^2$, giving an exact radial control. Species reversal changes its sign while leaving delay, causal direction, weight, and availability unchanged. It is not a pointwise scalar potential. A potential would require a separately established kernel, history measure or mollification, radial dependence, normalization, treatment of singular cases, and independent reference. A gradient or magnitude derived from another product would likewise need its own identity.

For equal present-marker distances $a>0$ on the horizontal axis, direct substitution gives

$$
\begin{array}{c|c|c|c|c}
 &\tau&D_t&W^{\mathrm{acc}}&\mathcal I_q^{\mathrm{ord}}\\ \hline
u=+a&a/(1-\beta)&1-\beta&1/(1-\beta)&\varsigma_q(1-\beta)/a^2\\
u=-a&a/(1+\beta)&1+\beta&1/(1+\beta)&\varsigma_q(1+\beta)/a^2
\end{array}
$$

Thus the trailing-to-leading magnitude ratio is $(1+\beta)/(1-\beta)$. For this product the shorter trailing causal distance outweighs the smaller transmitter-side weight. A larger leading transmitter weight alone does not imply a larger leading plotted intensity. At $a=1/6$, electrino values ahead and behind are $(-36,-36)$ at $\beta=0$, $(-18,-54)$ at $\beta=1/2$, and $(-9,-63)$ at $\beta=3/4$; the positrino values have opposite signs. These are analytical controls before coloring, clipping, contour selection, or numerical sampling.

### 2.3. The exact endpoint is a change of domain

At $\beta=1$, the delay equation reduces to $2u\tau+\rho^2=0$. In the strict trailing half-plane $u<0$, it has the positive ordinary solution

$$
\tau_1=-\frac{\rho^2}{2u},\qquad
D_t=\frac{2u^2}{\rho^2},\qquad
\mathcal I_q^{\mathrm{ord}}=\frac{2\varsigma_q}{\rho^2}.
$$

For $u>0$, or $u=0$ with $w\ne0$, there is no positive root. At $u=w=0$, every positive delay satisfies the causal equality and $D_t=0$: the source lies on a degenerate root family. The leading sub-wake-speed intensity tends to zero as $\beta\to1^-$, but the exact endpoint sample is unavailable, not zero. Behind the marker the axis value is $2\varsigma_q/a^2$.

These classifications belong to the infinite uniformly translating history. They are not a universal endpoint classification for a circular history or a source with a stationary prehistory. A numerical floor on $D_t$ would change the diagnostic if it silently converted a failed or singular case into a finite ordinary value.

## 3. A scalar identity is part of the problem

### 3.1. Equal-delay geometry and the synthetic preview

The interaction preview uses the same uniform-path delay geometry but a different scalar,

$$
z_{\mathrm{syn}}=\frac{\varsigma_q K}{\tau^2},\qquad
K=64(0.025)^2=0.04.
$$

At fixed delay $T_m>0$, the causal equation traces the exact circle

$$
(u+\beta T_m)^2+w^2=T_m^2.
$$

The circle is centered at the earlier source location and has radius $T_m$. It is an equal-value contour of the synthetic inverse-delay-square scalar. For a moving source it is not generally an equal-value contour of $\mathcal I_q^{\mathrm{ord}}$, which also contains the transmitter-side weight. Agreement between preview heatmaps and these circles validates a preview geometry/display relationship; it does not establish the ordinary diagnostic or a physical potential.

### 3.2. Sampling a partner differs from summing sources

For a source index set $S$, a signed aggregate can be written as $W_S(\mathbf x,T)=\sum_{s\in S}W_s(\mathbf x,T)$. A receiver-selected partner view chooses $S$ before the sum. In a two-source scenario, selecting the electrino receiver retains only the positrino transmitter; selecting the positrino receiver retains only the electrino transmitter. Both present-time markers can remain visible, but visibility does not put the excluded self-source into the scalar.

The interaction contract specifies those two partner choices. The requirements additionally specify an Absolute Observer choice that sums both signed contributions. The retained circular contract instead defines a two-source sum throughout. These are distinct source selections, and their current reconciliation is unresolved. In particular, a zero caused by two-source cancellation is absent from a single nonzero ordinary partner contribution. At the receiver marker, the retained partner may have a valid causal sample even though the excluded self-source would have been singular.

A receiver-focused display should retain the receiver position, transmitter identity, emission event, delay, and typed raw result. It still does not supply a receiver-dependent acceleration unless the missing polarity, coupling, and line-of-action factors have been established. Nor does the source-selection operation introduce a physical self-interaction rule into the substrate theory.

### 3.3. Numbers and nonnumeric states

The uniform diagnostic distinguishes `ordinary`, `singular:endpoint_source`, `unavailable:no_positive_causal_root`, `nonordinary:degenerate_root_family`, and `unresolved:numeric_failure`. Circular finite-history failures have their own unavailable and endpoint labels. Loading, refining, and complete describe presentation lifecycle rather than new scientific values. Only an ordinary result carries the declared scalar; genuine aggregate cancellation may carry an ordinary zero.

A provider's ordinary record includes source speed and polarity, observation displacement, emission time, delay, separation vector and magnitude, unit direction, transmitter factor, weight, and scalar. Its causal residual must satisfy a declared numerical tolerance, and its positive-delay, positive-distance, finite-value, and ordinary-domain checks must pass. The tolerance describes the instrument; it does not enlarge the causal domain. A missing bracket, singular source, invalid sample, clipped value, or failed residual cannot be serialized as zero.

## 4. Prescribed pairs and retained histories

### 4.1. Collinear launch from a stationary past

The collinear scenario places opposite species at the recorded 20% and 80% horizontal positions and gives them an infinite stationary past followed by an instantaneous prescribed launch. For each source, the history has the form

$$
\mathbf X_s(t)=\begin{cases}
\mathbf x_{s,\mathrm{start}},&t\leq0,\\
\mathbf x_{s,\mathrm{start}}+\mathbf v_s t,&t\geq0.
\end{cases}
$$

Position is continuous at launch and velocity jumps. Neither the launch nor its subsequent motion is obtained by integrating an acceleration law. A causal event can lie before or after launch, so the history branch must be resolved rather than replaced by a uniform past. The recorded paused collinear display uses one canonical sampled frame for heatmap and contours; moving display and paused canonical refinement have different presentation schedules without changing the scientific identity of a sample.

### 4.2. Circular geometry and sufficient opening history

For the circular alternative, set $\mathbf C=(1/2,1/2)$ and prescribe antipodal sources by

$$
\mathbf X_-(t)=\mathbf C+R(\cos(\pi+\omega t),\sin(\pi+\omega t)),\qquad
\mathbf X_+(t)=\mathbf C+R(\cos\omega t,\sin\omega t),
\qquad \omega=d\beta/R.
$$

The direction $d=+1$ is counterclockwise and $d=-1$ clockwise. The documented radius interval is $0.01\leq R\leq0.45$, with default $R=0.3$; zero speed makes both histories stationary. The pair is a prescribed geometry, not evidence of binding, stability, conservation, or dynamically retained motion.

For $\beta>0$, let $P=2\pi R/\beta$. If the centered viewport has half-extents $A_x,A_y$, the largest distance to a corner from the two horizontal source positions at emission time zero is $D_{\max}=\sqrt{(A_x+R)^2+A_y^2}$. Define

$$
N=\max\!\left(1,\left\lceil D_{\max}/P\right\rceil\right),\qquad
T_0=NP,\qquad T=T_0+2Pp,\quad 0\leq p\leq1.
$$

The integer number of warmup orbits preserves the opening source phase. The distance bound is specifically to the fixed retained-history start positions, not to every source position throughout an orbit. Since $T\geq T_0\geq D_{\max}$, the endpoint at emission time zero can bracket a root for every visible off-source point. At $\beta=0$, the contract uses $T_0=D_{\max}$, fixes progress at zero, and disables play and replay. The documented two-orbit animation duration of sixteen wall-clock seconds is a playback convention, not a dynamical time scale. Here $N$ counts warmup orbits; it is unrelated to the contour-span integer introduced below.

### 4.3. Root uniqueness and endpoint limits

For each source the finite-history equation is

$$
g_s(\tau)=\|\mathbf x-\mathbf X_s(T-\tau)\|-\tau=0,
\qquad 0<\tau\leq T.
$$

Away from the present source, $g_s(0)>0$. If $g_s(T)>0$, the retained interval supplies no root and the result remains unavailable. For $\beta<1$, the path is Lipschitz with speed bound $\beta$; for $\tau_2>\tau_1$, the reverse triangle inequality gives $g_s(\tau_2)-g_s(\tau_1)\leq(\beta-1)(\tau_2-\tau_1)<0$. This elementary argument also covers points where the distance derivative is undefined. A nonpositive endpoint and continuity therefore give exactly one positive root.

The source contract uses fixed-count bisection on the actual circular history, with direct residual checks. At $\beta=1$, its separate classification allows a directly bracketed, converged circular root, while a missing bracket or failed residual remains unavailable or unresolved. Rotation prevents the straight-path positive-length degenerate family on a nondegenerate circle; the circular source endpoint is separately labeled `nonordinary:endpoint_source`. These statements do not authorize evaluating the uniform-source weighted diagnostic at a zero transmitter factor.

The frozen circular scalar is

$$
W_{\mathrm{circ}}=\sum_{s\in\{-,+\}}\frac{\varsigma_s\kappa}{\tau_s^2},\qquad \kappa=0.04.
$$

Both contributions must be ordinary under that contract; one missing contribution makes the aggregate unavailable. This equal-wake-intensity sum contains no transmitter weight. The later-described partner selection changes the retained source set and thus changes that completeness requirement. It cannot be treated as a color-only change. Static opposite-source sums, center cancellation, antipodal motion, retained-history coverage, direction reversal, and the exact endpoint are documented reference cases, not fresh application test results.

## 5. Coordinate charts carry meaning

### 5.1. Linear world coordinates and responsive clipping

The single-source linear chart uses viewport width $W$ and height $H$ with $H$ pixels per world unit in both axes. Its horizontal domain is $[2/3-2W/(3H),\,2/3+W/(3H)]$ and its vertical domain is $[0,1]$. The marker remains at two-thirds of the viewport width and mid-height. Equal world lengths remain equal screen lengths; viewport aspect ratio changes the visible domain rather than distorting circles.

The circular-history contract instead fixes one world unit across the viewport width, centers the pair, and gives vertical extent $H/W$. When $H/W<2R$, the orbit may be clipped rather than squeezed. The interaction contract's general height-based pair wording and this explicit width-based circular policy are not interchangeable. A viewport or device-pixel-ratio change cannot justify altering the prescribed orbit or the values assigned to a fixed world event.

### 5.2. Source-local decades and the two-layer alternative

The retained coordinate decision distinguishes a source-local strength chart from a combined absolute-space wake map. In the local chart, the exponent sequence $-1,-2,-3$ has relative strengths $10^{-1},10^{-2},10^{-3}$ and equal display radii $1,2,3$. These radii are display indices, not equal physical distances. The visually accepted checkpoint is restricted to stationary single-source scenarios; moving and multi-source local charts remain undefined.

In a combined map, every source contribution is evaluated at the same absolute-space observation event before signed summation. Its cancellation sets and aggregate contours are not transported individual decade rings. A moving source's equal-strength surfaces must be obtained from its history, not assumed to be rigid circles carried with its present position.

This two-view decision conflicts with the linear-only view language in the interaction and requirements contracts. Its recorded visual acceptance does not establish application-wide migration, and those other documents do not establish that it was withdrawn. The common invariant is that coordinate meaning must be explicit and undefined representations must fail closed. The unresolved choices include treatment of positive exponents near the source, moving-source mappings, and whether multiple local charts should appear as small multiples, selected views, or non-global overlays.

## 6. Raw values, shading, and contours

### 6.1. Bounded square-root visibility

The linear-display contracts define a shading slider $s\in[0,1]$, gain $g=0.25\,16^s$, and the signed transfer

$$
C_s(W)=\operatorname{sgn}(W)\frac{g\sqrt{|W|}}{g\sqrt{|W|}+8}.
$$

The midpoint gives $g=1$ and magnitude $|C_s(64)|=1/2$. For a static inverse-square contribution $|W|=K/r^2$ with $K=0.04$, the unsigned transfer becomes $a/(r+a)$ with $a=0.025g$. The transfer is bounded and monotone; it does not clip any finite raw magnitude to its asymptote. It changes visibility, not roots, source selection, scalar values, or contour locations.

Other retained alternatives are distinct. The earlier signed-log display uses $\operatorname{sgn}(W)\log_{10}(1+|W|/4)$ with a normalization tied to magnitude $64$. The coordinate decision calls for a default fill proportional to raw relative magnitude, so a decade decrease gives a tenfold contribution decrease before compositing; an explicitly labeled Enhanced decade contrast mode is optional. The work log records the bounded proportional form $\min(|W|/64,1)$. Neither proportional fill nor signed-log enhancement is the bounded square-root transfer. Legacy references to a “clip” at $64$ also cannot describe the square-root asymptote without qualification.

### 6.2. Level identity precedes display density

The fixed raw decade schedule uses reference delay $T_*=0.025$ and a separate contour-span integer $N_c$:

$$
T_m=T_*10^{-m/2},\qquad I_m=64\,10^m,\qquad m=-N_c,\ldots,N_c.
$$

Adjacent delay radii differ by a factor $\sqrt{10}$, and adjacent raw magnitudes by a factor ten. The reference occurs once. In an absolute-space chart, these are genuine geometric radii for the synthetic static scalar; in a source-local exponent chart, equal exponent increments receive equal display spacing. A coordinate transform must not masquerade as a new raw level set.

The strategy retains a span control from one to four decades. The interaction and requirements documents also specify Contour count from 4 to 25, default 13, with additional genuine thresholds inside a fixed raw range. They do not fully reconcile arbitrary counts with the symmetric integer schedule, which has $2N_c+1$ unsigned levels before signs and a separately declared zero. Neither count is silently identified with the other here. A consistent level-selection rule remains necessary before these specifications can be treated as one executable contract.

An aggregate zero contour is the zero set of the raw signed sum. It is not a percentile contour, a substituted missing value, or a stronger colored decade. Invalid regions interrupt contours. Labels and topology must be derived from retained raw levels rather than from normalized color intensity.

### 6.3. One sampled frame and honest topology

The dynamic-contour recommendation compares a shader-only overlay, full sampled-grid marching squares, and a reduced-grid hybrid. Its preference is a single immutable sampled-field frame containing raw signed values, typed validity, world coordinates, time, scenario, kernel identity, and raw-value identity. The heatmap consumes that frame as a texture while contour extraction consumes the same frame. Neither consumer independently recomputes a second scientific field.

That architecture prevents heatmap/contour disagreement about their input, but their agreement is not an independent test of the producer. Independently authored selected-node references and texture readback are separate obligations. A cancellable contour worker should return only results matching the requested frame and raw level set; incomplete or stale work must not be relabeled as current. Keeping the previous complete frame until an atomic replacement is ready is a presentation rule, not evidence that the new calculation succeeded.

Marching-squares ambiguity requires a bilinear/asymptotic decision keyed stably by cell and raw level. Segment joining must preserve connected components, closed loops, open curves clipped by the viewport, and termination at invalid regions. Births, deaths, and saddles are genuine topology changes rather than motion to be smoothed away. Labels belong to whole world-space polylines, prefer low curvature, avoid markers and controls, and are suppressed when a stable nonoverlapping placement is unavailable.

The local record describes canonical paused collinear adoption, but binary adoption remains inconsistent across the documents: the circular contract and dynamic recommendation retain a contour gate, whereas the requirements describe partner contours. The recorded roughly 300 ms first-contour response and 538 ms main-thread long tasks belong to a historical machine/viewport observation, not a portable budget or current benchmark. A cheaper grid requires measured, level-aware error and topology bounds; grid size alone is not a measured cost or accuracy result.

## 7. Interaction without hidden scientific changes

A reproducible display must identify the scenario, source species and selected transmitter set, prescribed speed and history, observation event, domain, and kernel. Shading, contour opacity, background compositing, and panel geometry do not change those scientific inputs. A perspective change that removes a source does. New labels must not accompany an old raw buffer without disclosing that it is the retained previous frame.

The source UI contracts include four scenarios, speed from zero to one, shading from 0 to 100 with midpoint default, contour fade default 75%, and scale from 0.5 to 2. The documented contour count and historical span alternatives remain as qualified above. Source polarity disks use the shared half-size radius, a thin white border and a centered white origin dot. Only overlapping binary marker drawings are clipped at their perpendicular bisector to preserve both identities. The circular path guide changes continuously from pale lavender on Electric Purple to restrained Electric Purple on White; its resolution-derived source display mask is not a physical core radius. Both markers remain visible in receiver-selected pair views.

Keyboard, pointer, and mobile behavior belong to the display contract. Collapsible panels retain accessible names and focus, expose expanded/hidden/inert state correctly, and respect reduced motion. Space toggles meaningful moving replay without overriding text entry, native controls, repeats, or a zero-speed disabled transport. Shared navigation appears only where its behavior exists. The details of rail dimensions, targets, sliders, legend wording, lifecycle rendering, and historical control removals are retained as supporting interface specifications rather than recast as mathematical claims.

A mask makes a singular display legible without resolving source physics. White or purple appearance cannot alone distinguish a finite zero from an unavailable point. Exact source-state metadata, residual checks, and nonnumeric guards must survive every palette, opacity, sampling, and responsive-layout choice.

## 8. What remains outside the visualization

The future swept-source comparison proposal would compare independent finite-pixel deposition of equal emission-time and solid-angle carriers against an optimized expression involving $\sum_s\varsigma_s\kappa/(\tau_s^2|1-\widehat{\mathbf n}_s\cdot\mathbf v_s|)$. It is a proposed comparison with new measure, kernel, legend, reference, and endpoint obligations. It does not replace the current equal-wake scalar or establish the uniform-source ordinary diagnostic through shared code. Absent, simple, zero-Jacobian, and interval roots at the endpoint require explicit measure-level handling or a failed-closed result; inventing an event atom would not settle them.

A later evolved-history view would need accepted EOM solver histories and their root, acceleration, and stepping provenance. It would consume that history rather than continue to expose authored orbit controls as if those controls generated a dynamical result. The two-layer decision likewise calls for a shared coordinate contract, consumer inventory, cross-application fixtures, completeness disclosure, and revalidation before application-wide completion could be claimed. A visually approved local chart does not satisfy those wider obligations.

The strongest conclusions established here are conditional geometry, declared scalar identities, and explicit distinctions between raw quantities and their presentation. A preserved document may report an implementation or visual checkpoint; this manuscript does not independently reproduce it. Neither causal root closure, a clean contour, a symmetric orbit, nor a passing display comparison establishes a potential law, a primitive magnetic mechanism, binding, stability, conservation, self-consistent feedback, or physical acceptance in $\mathbb{A}\mathbb{A}\mathbb{A}$.
