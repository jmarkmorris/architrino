# Fixed finite-width collinear fate comparison

The [analytical screen](alternatives-screen-2026-10-05-collinear.md#a-compatible-approaching-pair-has-a-unique-finite-contact-and-passage) establishes a unique finite contact and passage for each of four complete compatible preparations. The coordinator independently assessed that proof before this numerical specification was written. The next question is whether the same preparations later turn, keep separating, or enter a mathematically proved escape sector. A finite computed endpoint by itself is not the intended result.

## Fixed cases and complete preparation

Every case has $c_f=K_{ij}=1$, two persistent opposite polarities, triangular reception window, positive spatial core, and every declared self and partner channel. The cases are $(h,\rho)=(1/16,1/32),(1/16,1/64),(1/32,1/32),(1/32,1/64)$, each a separate law. There is no ceiling, projection, receiver multiplier, root suppression or event selector.

For each law, use the screen's complete cubic compatible ramp with $a=1/2$, $\delta=1/2048$ and its unique contraction-defined coefficient $A_{h,\rho}\in(0,2)$. The complete stationary tail is retained. The numerical preparation solves that same fixed-point equation to successive-iterate difference below $10^{-12}$; its remaining mismatch and quadrature error are recorded, not declared zero. The receiver equation is integrated directly in $x,v$, with mirror symmetry preserved by construction. This tests collinear mirror motion only.

## Instrument and complete reception coverage

The separately stored [comparison instrument](../evidence/alternatives-screen-2026-10-05-width-comparison.mjs) evaluates the original finite-width integral. For each current receiver, the stationary tail before $-\delta$ is integrated analytically. The preparation ramp and generated source history use cubic Hermite pieces. Each source piece has its exact polynomial extrema for $P(s)=s+x(s)$, $Q(s)=s-x(s)$ and $x(s)$ enumerated. Monotone source-clock sectors are retained across the complete generated record.

Every nonzero reception integrand belongs to one of the $P$ or $Q$ bands centered at $t+x(t)$ or $t-x(t)$, of half-width $h$. The instrument locates all such bands in every monotone sector, includes flat characteristic sectors, unions their support and integrates both actual signed self and partner kernels there. Band centres, band edges and displacement zeros split the quadrature. No finite age cutoff is substituted for the complete stationary tail, and no sharp-root denominator is evaluated.

Adaptive Simpson quadrature integrates the continuous reception bands. The target acceleration tolerance is $10^{-8}$, split in proportion to integration length. Quadrature exhaustion ends the run with a failure receipt; its error estimate is a numerical estimate, not directed enclosure. Generated source values are cubic Hermite interpolants of retained states. A four-stage explicit Runge–Kutta update supplies trial current-step Hermite segments. Because those trial segments approximate unknown same-step history, formal classical fourth-order accuracy is not assumed; empirical refinement is required. Every returned trajectory has measured comparison grade and is not output of the production EOM solver.

## Known controls passed before targets

The first controls receipt preceded every target run. The expanded frozen source has SHA-256 `f860d5af160de82162426423e3695bbffe933b3b2b40a538c70a3f8110d9a269`; the receipt is `.local-data/master-equation-closure/collinear-research/alternatives-screen-2026-10-05/width-controls-02/receipt.json`. It reports `known-controls-pass`, $0.01183775$ seconds wall time and 62,013,440 bytes RSS as measured by that invocation. These are run measurements, not a scaling or cost prediction.

The independent exact references are Simpson integration of a constant and a polynomial, the cubic $x(s)=s^3-2s$ with its three $P=0$ roots and one monotone $Q$ sector, a flat unit-speed source clock, stationary full and partial triangular bands, and the frozen affine-self closed form at positive and negative subfield, unit and superfield speeds. Complete affine-recent/stationary-tail controls also exercise band assembly: they include the full unit-speed flat-clock interval and the superfield control's additional old-tail contribution. These comparisons validate those instrument uses and do not certify a coupled target trajectory.

## Targets, refinements and stopping rules

Status markers: ✓ Done, ◐ Partial, ○ Not done.

| Status | Item | Frozen specification |
| --- | --- | --- |
| ✓ Done | Known controls | Expanded controls receipt above; all pass before target use |
| ○ Not done | First comparison per fixed law | Time step $2^{-13}$, acceleration tolerance $10^{-8}$, initial numerical horizon $T=2$ |
| ○ Not done | Event refinement | Repeat a reported contact/turn with steps $2^{-14}$ and $2^{-15}$; also tighten quadrature tolerance to $10^{-9}$ if its contribution is not negligible |
| ○ Not done | Later-fate proof | Derive and independently assess an invariant or scattering condition on the actual retained history; if no turn or criterion occurs by $T=2$, assess the unresolved mechanism before extending the same case |

Each run stops at the first postcontact velocity turn, its specified horizon, a quadrature failure, a nonfinite state, or its operational deadline. It records unit-speed brackets, first-contact brackets, separate self and partner accelerations, all source-clock sector counts, the complete numerical trajectory, script hash, actual wall/CPU use and memory. Linear interpolation inside an event bracket is not a mathematical event enclosure. A turn is a measured event until independently checked against the complete source integral and refinement; an all-future statement needs a separate proof.

Runs emit an observable heartbeat at a fixed 15-second wall cadence and use the repository's owned-compute supervisor with a hard deadline within the campaign science cutoff. No target has run at this preregistration checkpoint. The root coordinator assesses this frozen rule/instrument before target application; this scientific review is distinct from routine process permission.

## Reviewed successor before target use

The first source remains frozen. The coordinator's code review found that merging overlapping clock bands did not retain every original internal band edge, despite the specification above. No target had run. The [v2 successor](../evidence/alternatives-screen-2026-10-05-width-comparison-v2.mjs) corrects that issue by retaining every original band endpoint inside merged support and every generated Hermite knot face on active support, alongside the centres and displacement zeros. It adds a known overlapping-band control with a narrow triangular piece inside a wider interval; the exact integral is $1.5$, and the measured value is $1.5000000000000075$ with the internal edges and knot face retained.

The successor SHA-256 is `1819f7ae43d743f72e5448d871433558f378c29695133d05d6c6c5c00f1eef8a`. All controls passed again before target use, as recorded in `.local-data/master-equation-closure/collinear-research/alternatives-screen-2026-10-05/width-controls-v2/receipt.json`. That invocation measured $0.013915458$ seconds wall time and 61,358,080 bytes RSS. No coupled target result belongs to the first version. The successor retains the same selected laws, preparations, target steps, tolerances and stopping conditions.
