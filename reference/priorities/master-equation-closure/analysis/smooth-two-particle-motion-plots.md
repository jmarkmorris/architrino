# Motion of the two disturbed architrinos and their returning neighbors

These figures show the fixed alternating-lattice control at $g=16$, with wake speed $c_f=1$ and lattice spacing $\ell$. Uppercase $G=\kappa q_0^2$ is the acceleration-strength coefficient, and $g=G/\ell$ in these units. Time $t=T/\ell$ counts the time a wake needs to cross one lattice spacing. The two targets begin at adjacent sites, have opposite polarities, and share the same vertical supplied excursion.

The supplied past is exact input. The curves after release are the explicit polynomial comparisons through second order in the auxiliary pulse amplitude, evaluated at the full supplied amplitude. Their error bounds come from the [signed-error proof](smooth-two-particle-signed-error.md) and its [independent adjudication](smooth-two-particle-signed-error-independent-adjudication.md). The plots render that accepted analysis; they are not sampled EOM solver trajectories or a new independent proof. The [preparation assessment](smooth-two-particle-preparation-independent-adjudication.md) establishes that this particular supplied past cannot be an unforced all-past history.

## Population and interaction accounting

No EOM solver simulation produced these figures. The [plotting evaluator](smooth-two-particle-motion-plots.py) samples previously derived coefficient formulas. Its input has no finite simulation population or numerical all-pairs evolution loop. The mathematical system is an infinite simple cubic lattice with one architrino at every site and alternating polarity along each lattice direction.

The different finite counts identify different roles within that infinite system. They are derived counts in the [accepted continuation and receiving census](smooth-two-particle-next-feedback-independent-adjudication.md#4-receiving-geometry-and-census):

| Population or subset | Count and scope |
| --- | --- |
| Complete lattice | Infinitely many architrinos, with complete supplied histories |
| Targets with a nonstationary supplied past | 2 adjacent architrinos |
| First environmental responders | 24, arranged in two face-diagonal shells |
| Sources whose generated motion first returns to the targets | 4 per target, 8 distinct sources altogether; the neighbor figure displays the right target's 4 |
| Histories that are nonconstant somewhere over the continued interval through $T=21\ell/16$ | 102: the 2 targets and 100 environmental architrinos |

The last count does not assert that all 102 move at every instant or that 102 trajectories were numerically integrated. The continuation proves their evolution and bounds; the figures display only the selected target and source comparisons. The plotted target horizon lies inside that continuation interval.

Every admitted contribution is accounted for in the exact equations, but the proof does not calculate every ordered pair separately at every time. It writes each receiver's acceleration as the stationary infinite-lattice sum plus a finite set of corrections. Each correction replaces the relevant stationary source contribution by the source's actual contribution at the earlier emission time selected by the causal range equation. By the continuation horizon, 148 old-pulse channels and 144 generated nearest-neighbor channels have entered. These are directed source-to-receiver histories, not undirected pairs or time samples. At each target, exactly four generated corrections can arrive during the plotted interval. Later environmental responses cannot yet return to the targets, because their travel times exceed the interval.

The stationary sum cancels exactly at a lattice anchor. At a displaced receiver it can be nonzero; its contribution is retained and bounded in the comparison error. Similarly, nonlinear corrections beyond the plotted coefficient formulas are enclosed by the proved residual bounds. They are not assigned zero. The root argument establishes one positive-delay root for every distinct source–receiver pair and excludes positive-delay self roots on this interval. Thus the accounting combines explicit causal contributions, exact stationary cancellation where applicable, bounded residuals, and proved exclusion of arrivals that are too late. It supplies no arbitrary-population or long-time all-pairs simulation result. A missing admitted channel or failure of the stationary-sum or residual bound would invalidate the affected conclusion.

## 1. Read the motion in time

Local figure — The supplied vertical excursion, later common vertical motion, separation change, and separation velocity with a close-up of approach: `.local-data/master-equation-closure/motion-plots/target-motion.png`.

- **A — supplied past.** Both targets follow the same down-and-up excursion and return to rest. Their separation stays exactly $\ell$. At release, $t=0$, all particles occupy their lattice anchors with zero velocity.
- **B — common vertical motion after return.** The targets remain still until $t=\sqrt2-3/8\approx1.0392$. Their subsequent vertical displacement is shared by reflection symmetry. The curve shown is their common comparison height; its certified error is too small to see at this scale.
- **C — change in separation.** The horizontal response changes their distance by amounts measured in trillionths of a lattice spacing. The shaded region encloses the separation change; crossing the zero line with an error bound would not itself establish contact, because zero on this axis means the original separation $\ell$.
- **D — separation velocity.** Positive means separating and negative means approaching. The inset magnifies the interval where the complete error band becomes negative. At the orange point, $t=\sqrt2-51/200$, the comparison separation velocity is approximately $-7.6215\times10^{-12}$ and its error is below $8\times10^{-13}$. The entire interval is negative. By the orange vertical strip marking the latest pulse-end reception, the velocity is positive again.

The dotted line marks the comparison polynomial join at offset $u=1/4$. The actual latest reception lies in the orange interval and is not assigned to the comparison join. A zero of a drawn centerline does not locate an exact first reversal. The proof establishes the stated signs with their errors and leaves the unique first transition unresolved.

At the orange point, the exact polynomial enclosure gives comparison separation velocity between $-7.622\times10^{-12}$ and $-7.620\times10^{-12}$. Allowing the full error of $8\times10^{-13}$ therefore encloses the actual separation velocity strictly between $-8.422\times10^{-12}$ and $-6.820\times10^{-12}$, in units of wake speed. Even the endpoint closest to zero is negative, which proves approach at that time. Continuity gives an open interval of approach around it. This is a decrease in their current distance; it does not establish that the distance falls below the original lattice spacing or reaches zero. Their common vertical motion cancels when taking their separation.

Vector version: target motion SVG (local artifact: `.local-data/master-equation-closure/motion-plots/target-motion.svg`).

## 2. The target paths, with unequal magnification made explicit

Local figure — Separate local displacement paths for the left and right targets: `.local-data/master-equation-closure/motion-plots/target-paths.png`.

Each panel places its own target's initial lattice site at the origin. The actual two starting sites remain a distance $\ell$ apart. Follow the arrows upward along the comparison paths. Horizontal displacement is shown in units of $10^{-12}\ell$ and vertical displacement in units of $10^{-6}\ell$: the horizontal units are one million times smaller. The screen magnification also depends on each axis's displayed range and length, so the apparent path angles are distorted. The local origins in separate panels do not represent a collision or a shared starting site.

The orange point is the certified approach event; the gray square is the comparison join. The small inward turn is clearest in the velocity inset of Figure 1 because the later outward displacement occupies most of this path plot's horizontal range. Shading gives the horizontal position enclosure. The separate vertical error bound is below $8\times10^{-12}\ell$, below pixel scale here; the component bounds describe rectangles about each comparison point, not ellipses with those semiaxes.

Vector version: target paths SVG (local artifact: `.local-data/master-equation-closure/motion-plots/target-paths.svg`).

### 2.1. Distance to the next neighbor

The outward horizontal neighbors start at $-\ell e_1$ and $2\ell e_1$, on opposite sides of the targets at $0$ and $\ell e_1$. Each initial gap is $\ell$. The targets also have neighbors one spacing above them, at $\ell e_3$ and $\ell(e_1+e_3)$. Their displacement plots magnify motions within these initial gaps; the chart boundaries are not neighboring lattice sites.

At the final plotted time, $t=\sqrt2-3/8+17/64\approx1.30484$, the plotting receipt (local artifact: `.local-data/master-equation-closure/motion-plots/receipt.json`) records the right target's comparison displacement $x=1.7498408797\ldots\times10^{-11}$ and $z=3.1799091194\ldots\times10^{-6}$. The actual horizontal error is at most $1.50425\times10^{-12}$, and the vertical error is below $8\times10^{-12}$. Reflection gives the opposite horizontal displacement and same vertical displacement for the left target. Thus each target's outward displacement is about 18 trillionths of a spacing, while its upward displacement is about 3.18 millionths of a spacing. These endpoint evaluations measure the retained comparison formulas; the stated errors are derived from the accepted proof.

The neighboring architrinos also move, so displacement toward a neighbor's original site is not the change in their actual gap. Write the right target position as $\ell(1+x(t),0,z(t))$ and its outward neighbor position as $\ell(2+U_1(t),U_2(t),U_3(t))$. Here $\mathbf U(t)$ is that neighbor's dimensionless displacement at the same absolute time as the target. Their simultaneous distance $r_{\rm out}$ satisfies the exact geometric identity

$$
\frac{r_{\rm out}(t)}{\ell}
=\sqrt{(1+U_1(t)-x(t))^2+U_2(t)^2+(U_3(t)-z(t))^2}.
$$

In particular, the sign of $x'$ alone does not decide whether this gap is shrinking. The early environmental paths plotted in Section 3 stop near $t=0.3205$; they cannot supply neighboring positions at the target time near $t=1.3$. Delayed source positions used in the acceleration equation likewise cannot replace simultaneous positions when measuring a gap.

A conservative lower bound follows directly from already accepted estimates, without extending those early curves. The [signed adjudication](smooth-two-particle-signed-error-independent-adjudication.md#3-domains-roots-and-endpoint-regularity) bounds the target comparison norm below $3.180\times10^{-6}$ on the complete displayed target interval, and its propagation result bounds the actual position error below $8\times10^{-12}$. The [continuation](smooth-two-particle-next-feedback-independent-adjudication.md#2-source-cutoff-and-continuation-estimate) bounds every neighbor's displacement below $1/256$. The reverse triangle inequality therefore gives, for every initially adjacent neighbor throughout the displayed target interval,

$$
\frac{r(t)}{\ell}
>1-\frac1{256}-3.180\times10^{-6}-8\times10^{-12}
=0.996090569992.
$$

This derived guarantee includes neighbor motion and applies to both outward and upward neighbors: every such gap remains above 99.6 percent of its initial spacing. It is a lower bound, not an attained closest distance or a determination of the gap's velocity. The exact closest distance and whether the outward-neighbor gap shrinks require the neighboring histories at matching absolute times. Those quantities have not been evaluated by these plots. Failure of either displacement enclosure or use beyond the displayed interval would invalidate this bound.

### 2.2. Further reversal and possible ring-down

Further turning and eventual ring-down are hypotheses about the coupled histories beyond the proved interval. Ring-down here means repeated oscillation with an amplitude that tends to zero about a limiting local configuration. It does not follow merely from the existence of nearby architrinos or from exact cancellation in the original stationary lattice. A stationary configuration and its dynamical stability are different claims.

For the fixed supplied past at $g=16$, the [accepted signed result](smooth-two-particle-signed-error-independent-adjudication.md#5-propagation-and-signed-conclusions) already gives positive, then negative, then positive separation velocity. This establishes relative reversals during the first returned response. It does not establish a repeated oscillation, decreasing successive amplitudes, or a later downward reversal of the targets' common vertical motion. The relative displacement and common height must be followed separately; a reversal of one need not reverse the other or a target's distance to a different neighbor.

A later acceleration opposed to the motion can slow a target without reversing it. For example, if the right target has $x'(t_1)>0$, a later inward velocity at $t_2$ requires

$$
\int_{t_1}^{t_2}x''(s)\,ds<-x'(t_1).
$$

Here $x$ is its dimensionless horizontal displacement and primes denote dimensionless time derivatives. The condition follows directly by integrating acceleration. Its integrand must come from the received source histories, with all newly arriving contributions admitted. The current first-return polynomial formulas cannot determine this integral outside their certified interval.

A possible mechanism for local decay is that the disturbance spreads among more environmental architrinos while the original pair's motion weakens. This is a conjectural outcome of the delayed interactions. The returning contributions can oppose or reinforce a velocity component depending on their history and geometry, so no damping sign is supplied merely by their arrival. Establishing decay would require the coupled evolution to produce that sign and a shrinking amplitude envelope. No friction coefficient or assumed damped-oscillator law is part of this argument, and the limiting configuration need not equal the original lattice sites.

The [subsequent extension through $t=2$](smooth-two-particle-later-motion.md) tracks common height, target separation and simultaneous neighbor gaps. The [independently accepted full-equation certificate](smooth-two-particle-later-certification.md) now proves three consecutive common-height turns on $[5/4,2]$ and a following vertical excursion between $25.6\%$ and $30.5\%$ as large as its predecessor. It includes source-history errors, moving roots and the infinite stationary field at both stages. Horizontal separation growth at the endpoint remains a numerical comparison result. The certified vertical turns establish finite-interval ringing; long-time ring-down additionally requires control of later excursions and drift. Continued growth, persistent nondecaying excursions, or nonzero limiting drift would contradict settling in the stated sense. The extension selects none of those long-time behaviors and remains specific to the supplied preparation.

## 3. The early motion of the four returning sources

Local figure — Starting geometry of four sources and their early displacement paths: `.local-data/master-equation-closure/motion-plots/neighbor-paths.png`.

The geometry panel shows the four environmental sources that first feed back to the right target: $(1,0,1)$, $(1,0,-1)$ and $(1,\pm1,0)$ in lattice units. Each receives the left target's old pulse over a face diagonal and later contributes to the right target over a nearest-neighbor channel. The left target receives the reflected arrangement. These eight returning sources belong to the 24 first environmental responders; the figure selects the right target's four sources.

The displacement panel overlays the four sources' separate starting displacements at zero and projects their paths onto the horizontal–vertical plane. Both axes use the same magnification. The source above the right target initially moves down and left, and the one below initially moves down and right. Their comparison paths turn upward later in the driving pulse. The two side neighbors initially move upward; their horizontal–vertical projections coincide, while their second-coordinate motions are related by reflection.

This figure covers the sources' own early absolute times $\sqrt2-11/8\le t\le\sqrt2-11/8+9/32$, approximately $0.0392$ to $0.3205$. The target figures instead cover absolute times approximately $1.0392$ to $1.3048$. The source curves are not extrapolated into that later target-time window. A source may retain displacement and velocity after its original driving pulse ends. Squares mark the polynomial join, and arrows follow the comparison curves in time. Source position error is below $3\times10^{-13}\ell$ throughout the displayed interval.

Vector version: neighbor paths SVG (local artifact: `.local-data/master-equation-closure/motion-plots/neighbor-paths.svg`).

## Error bounds and evidence

Let $u=t-\beta$ be the target offset, $\beta=\sqrt2-3/8$, and $X(u;16)$ the accepted first-coordinate comparison. Its common height comparison is $256Z(u)$. Because both exact and comparison first displacements vanish initially, integrating the accepted velocity errors gives the derived position bound

$$
|x(u)-X(u;16)|\le\epsilon_x(u),\qquad
\epsilon_x(u)=
\begin{cases}
4\times10^{-13}u,&0\le u\le3/25,\\
4.8\times10^{-14}+10^{-11}(u-3/25),&3/25<u\le17/64.
\end{cases}
$$

Its maximum is $1.50425\times10^{-12}$. The separation-change error is twice this bound. Separation-velocity error is below $8\times10^{-13}$ through $u=3/25$ and below $2\times10^{-11}$ over the remaining interval. The graph preserves the step between these two certified bounds. Common-height error is below $6\times10^{-13}$ on the shorter interval and below $8\times10^{-12}$ throughout. Source position error is the Euclidean bound given above. These are deterministic analytical enclosures, not statistical confidence intervals.

The independent signed-error reviewer checked this display-specific integration and domain use without rerunning the underlying certificates. The [plotting script](smooth-two-particle-motion-plots.py) evaluates frozen rational-plus-$\sqrt2$ coefficients at 70 decimal digits, then converts sampled values to plotting coordinates. Its known-case mode passed polynomial decoding, differentiation, a matched piecewise join, the exact pulse extrema, the integrated error formula, and mirror/separation transformations before target use. Target fidelity checks then passed the frozen input hashes, actual coefficient joins, derivative arrays and the accepted midpoint value. These checks establish plotting fidelity to the accepted inputs, not independent scientific validity of those inputs.

The author visually inspected all three final PNGs for layout, scales, labels and visibility of the approach inset. A separate reader inspected the three images and passed their geometry, reflection, domains and signed inset; its wording correction distinguishing axis units from screen magnification was applied, and the standalone target paths gained explicit time endpoints. Local receipts are known-case results (local artifact: `.local-data/master-equation-closure/motion-plots/known.json`) and input, output and script hashes with plotted-value checks (local artifact: `.local-data/master-equation-closure/motion-plots/receipt.json`). The frozen source and independent adjudication remain unchanged. Reproduce from the repository root, in this order:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-motion-plots.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-motion-plots.py plot
```

The figures and receipts are reproducible local outputs under `.local-data/master-equation-closure/motion-plots/`. An incorrect input hash, coordinate reflection, scale factor, sampled-domain selection, error-band multiplier or polynomial evaluation invalidates the corresponding display. No additional coupling classification, preparation mechanism, contact result or genericity conclusion follows from the plots.
