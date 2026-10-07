# Lattice Research: Ordered Populations and Delayed Response

This manuscript studies explicitly repeated populations and their disturbances under declared complete histories, causal-root rules and summation conventions. The supplied two-target pulse, the self-consistent coherent staggered branch, and the cubic moving-background candidates are distinct constructions. Their results retain their original evidence grades and preparation limits.

The first chapter develops the infinite alternating lattice and its actual response. The second distinguishes stationary cubic cancellation from finite moving constructions. The third describes adaptive geometry and the evidence required for a retained medium. General history-domain and continuation theorems remain shared inputs in [Master-Equation Closure](../manuscript.md); an ordered population of individual architrinos is not automatically a populated Noether sea.

## 1. Infinite populations and cancellation

### 1.1. What the stationary lattice establishes

A finite population and an infinite population pose different summation problems. For an infinite population, the number of particles in a three-dimensional shell grows with its volume, whereas one stationary contribution decreases as inverse distance squared. Magnitudes need not have a finite total. Cancellation must be specified and proved for the actual delayed contributions.

A useful complete-history control places one architrino at every site of the infinite simple-cubic lattice $\mathbf z_j=\ell j$, with $j\in\mathbb Z^3$, spacing $\ell$ and fixed polarity charge $q_j=q_0(-1)^{j_1+j_2+j_3}$. The reference number density is $\ell^{-3}$. Each site has six nearest neighbors of opposite polarity at distance $\ell$, and twelve face-diagonal neighbors of the same polarity at distance $\sqrt2\ell$. This is a three-dimensional alternating checkerboard. Each particle in the reference is stationary throughout its earlier history. Grouping sources into disjoint eight-site blocks $\{2n+\epsilon:\epsilon\in\{0,1\}^3\}$, with $n\in\mathbb Z^3$, cancels the leading spatial moments through degree two. Each block contains four sources of each polarity; it is a summation convention, not an assumed bound assembly. For a block a distance $R$ away, its remaining acceleration is $O(R^{-5})$. A shell with radii $R$ and $2R$ contains $O(R^3)$ blocks, so its contribution is bounded by $O(R^{-2})$. Summing these bounds over successively doubled shells gives a finite tail.

At a stationary receiver anchor, this selected grouped sum is exactly zero. Reflection through that anchor pairs equal-polarity sources with opposite acceleration vectors in finite symmetric cubes. To transfer the cancellation to the fixed eight-source grouping, one must also control the unmatched boundary faces, edges and corners. Their total tends to zero, giving the same zero limit. Exact cancellation is therefore a derived property of this reference, despite divergence of the sum of individual magnitudes. It does not establish equality of every possible source ordering.

The absence of motion here is an exact balance, not a consequence of infinite population size. Perturbing source histories or displacing a receiver changes the delayed contributions whose cancellation was proved. The following constructions distinguish the disturbed lattice from this stationary reference.

### 1.2. Finite changes and infinitely coordinated changes

Changing a fixed finite set $F$ of source histories, while keeping the receiver history fixed and retaining regular finite root sums, gives

$$
\mathbf A_i^{\rm changed}
=\mathbf A_i^{\rm stationary}
+\sum_{j\in F}\left(
\mathbf A_{ij}^{\rm changed}-\mathbf A_{ij}^{\rm stationary}
\right).
$$

The infinite reference is already defined, and the correction is a finite sum. If the receiver moves away from its anchor, the stationary reference must also be evaluated at the new receiver position; its smooth grouped field need not be zero there. These are well-defined release-time calculations under the stated regularity conditions. They do not require imposing a decay condition on infinitely many freely chosen source perturbations merely to change two fixed particles.

A broader history class allowed independent small changes for arbitrarily many particles. A derived counterexample chooses different old emission times for different sources. At those times their positions still equal the stationary anchors, but their velocities depend on polarity. The transmitter weights then destroy the needed cancellation: both polarities give corrections with the same positive projection. A lower bound on the actual signed shell sums proves divergence under every ordering of the specified blocks. This is stronger than observing that a bound on absolute magnitudes diverges.

A separate sequence of finite changes shows that restricting attention to histories with individually finite sums does not automatically give continuity in the original uniform history norm. The affected finite sets grow without bound along that sequence. Neither construction proves discontinuity for two fixed modified labels, and neither proves that coupled evolution from a local disturbance creates the constructed distant histories. The environmental response must be determined by an evolution theorem.

### 1.3. One sufficient proposed history class

A mathematical proposal restores finite sums and controlled relative derivatives by restricting the histories and strengthening the way their differences are measured. In normalized units, let $\mathbf u_j(s)=\mathbf X_j(s)-\mathbf z_j$ for all $s\le0$. Require, in addition to the regular root and separation conditions,

$$
\sum_{m=0}^{3}\ell^{m-1}\|\mathbf u_j^{(m)}(s)\|
\le A(1+|s|/\ell)^{-p}+b_j,
\qquad p>1,\qquad A\ge0,\qquad b_j\ge0,\qquad\sum_jb_j<\infty.
$$

The derivatives include displacement, velocity, acceleration and jerk of the supplied history. The first term permits independent deviations across the lattice but requires them to decrease sufficiently far into the past. The summable allowances $b_j$ permit persistent deviations, including arbitrary finite source modifications satisfying the original bounds. No acceleration contribution is multiplied by these allowances; they define which histories are admitted.

Why does a distant-past condition help a spatial sum? A source at range $R$ contributes from a time roughly $-R$ when $c_f=1$. Its allowed temporal deviation is consequently bounded by order $R^{-p}$. Combined with an inverse-square row and the shell population, the leading shell correction has order $R^{1-p}$. The dyadic series converges for $p>1$. Full root and derivative estimates justify this mechanism under the proposal's complete assumptions. Existing controls show that the strict threshold cannot be weakened within this broad independent-history envelope family.

The corresponding stronger norm measures a position-and-velocity difference by the least temporal-envelope budget plus the sum of its persistent allowances. Between admitted $C^3$ histories sharing bounded envelope budgets and regular root margins, the acceleration map has a controlled relative derivative and remainder, with uniform tails. The linear derivative expression can act on suitable $C^1$ directions, but arbitrary small $C^1$ changes need not remain admitted histories. These are derived sufficient estimates, not a selection of this distant-past background as physical. They do not prove a common lifespan for mutually evolving particles, compatibility of all derivatives at the release cut, or preservation of the entire regular history domain. In particular, a well-defined initial acceleration is only the beginning of an infinite-population evolution theorem.

### 1.4. A common first evolution interval

For a stationary alternating lattice with only two fixed modified complete pasts, a conditional local evolution theorem goes beyond evaluation of the initial acceleration. Under complete uniform simple-root certificates, separation bounds, bounded history derivatives and a normalized exclusion of very recent self roots, one positive interval works for every particle. The prescribed block sum and finite source corrections define a uniformly smooth field $\mathscr F_i(T,\mathbf x)$. Every arriving emission on this interval remains in the supplied past. Solving $\ddot{\mathbf X}_i=\mathscr F_i(T,\mathbf X_i)$ therefore constructs the environmental futures as well as the target futures without prescribing either. A contraction with common bounds gives existence and uniqueness within the declared bounded, piecewise classical comparison class. A separate check of old roots, their complements and recent chords verifies that the constructed paths solve the complete causal equations.

This theorem distinguishes smooth release from a merely continuous position-and-velocity join. Write $\mathbf a_i^-$ and $\mathbf j_i^-$ for incoming acceleration and jerk at release, and $\mathbf x_i,\mathbf v_i$ for position and velocity there. A globally $C^3$ join requires, at every label,

$$
\mathbf a_i^-=\mathscr F_i(0,\mathbf x_i),\qquad
\mathbf j_i^-=\partial_T\mathscr F_i(0,\mathbf x_i)
+D_{\mathbf x}\mathscr F_i(0,\mathbf x_i)\mathbf v_i.
$$

These conditions match the derivatives selected by the equation to those supplied by the past. A globally $C^1$, piecewise $C^3$ release permits jumps in acceleration or jerk, but accepting a theorem in that class does not select it as the physical domain.

For the existing two-target control with past disturbances supported in a common finite time interval, only 32 environmental labels can have nonzero acceleration or jerk corrections at release. Exact finite expressions decide their matching conditions. One explicit specialization has two nonstationary pasts and satisfies every smooth-cut condition. Its first short future is stationary because none of the arriving emission times yet samples the past disturbances. A second specialization produces an immediate nonzero environmental response but fails the smooth acceleration match. Thus nonempty smooth compatibility is proved, while a nonstationary immediate future in that smooth subset is not established by these examples.

The result supplies a common short lifespan, not a certified numerical duration or an invariant population class. Its uniform bounds are relaxed bounds rather than preservation of every originally saturated constant. Later reception of newly generated emissions requires a coupled delayed estimate, and neither later continuation nor target contact follows from this first-interval theorem.

### 1.5. The first nonstationary response

For the same explicit smooth compatible history, a further derived result identifies the first reception of the past disturbance. If $\ell$ is the lattice spacing, the entire population remains stationary through

$$
T_*=(\sqrt2-11/8)\ell.
$$

The acceleration is still zero at this onset. On a sufficiently short positive interval afterward, exactly 24 environmental labels move: 16 have leading displacement of fifth order in elapsed time, and eight have leading displacement of sixth order. Both targets and all other labels remain stationary on this interval. These are conclusions about solutions of the receiver equations, including feedback from receiver displacement, rather than evaluations of the acceleration at fixed anchors.

The initial directions can also be stated geometrically. Take the pulse direction to be the third coordinate and call its positive direction upward. Around each exciting target, the twelve first responders occupy its face-diagonal sites. Eight lie above or below its horizontal plane; all eight initially move downward, with horizontal components determined by their positions. The four in its horizontal plane initially move upward. Across the two disjoint shells this gives sixteen initially downward responses and eight initially upward responses. These are the leading directions immediately after onset, as derived in the [first-response analysis](analysis/smooth-two-particle-first-response.md#4-the-actual-nonstationary-response); velocity and acceleration still vanish at the onset itself. The direction statements concern the initial response and do not assign a fixed direction to every subsequent segment.

The extension preserves the smooth join, the original quantitative history bounds and the complete root census on a common short interval. All arriving emissions still precede the original release. Its existence therefore does not yet require reception of the newly generated source futures. The result remains conditional on the stated history and block-summation convention.

This establishes a nonstationary smooth continuation after the waiting interval. Completing the received pulse requires a longer estimate and its endpoint must follow the moving receivers' actual causal equations. The next result supplies that estimate on a stated parameter range. Later reception of postrelease emissions requires a separate coupled-history estimate; neither target contact nor a globally preserved population class follows.

### 1.6. Completion of the first received pulse

The [independently adjudicated pulse theorem](analysis/smooth-two-particle-pulse-independent-adjudication.md) extends this same smooth control through its first received pulse. To specify the input, take the two modified labels to be $E=\{0,e_1\}$, where $e_1=(1,0,0)$, and their common displacement direction to be $\mathbf e=(0,0,1)$. For every supplied time $s\leq0$, retain

$$
\mathbf X_j(s)=\mathbf z_j+\varepsilon\ell\mathbf e\,\psi\big(8(s/\ell+5/4)\big)
\quad(j\in E),\qquad
\varepsilon=2^{-16},\qquad
\psi(v)=\begin{cases}v(1-v^2)^4,&|v|<1,\\0,&|v|\geq1.\end{cases}
$$

All other supplied histories are stationary. The displacement pulse occupies $[-11\ell/8,-9\ell/8]$; its derivatives through third order vanish at both ends. These complete pasts are prescribed data, with no assertion that the equation generated them before release. The original eight-source block sum remains the summation prescription. Let $G=\kappa q_0^2>0$, where $q_0$ is the common polarity magnitude, and introduce dimensionless reception time $t=T/\ell$, coupling ratio $g=G/\ell$, and displacement $\mathbf y_i(t)=(\mathbf X_i(\ell t)-\mathbf z_i)/\ell$. Primes on $\mathbf y_i$ denote derivatives with respect to $t$; physical acceleration and jerk are $\mathbf y_i''/\ell$ and $\mathbf y_i'''/\ell^2$.

Here $G$ collects the Master Equation's coupling coefficient $\kappa$ and the two equal polarity magnitudes. A single stationary source at distance $r$ contributes acceleration of magnitude $G/r^2$; polarity determines its direction. Thus $G$ sets the strength of each contribution before the population sum is taken. At the exact stationary lattice, that sum cancels for every $G$. The spacing $\ell$ is the distance between nearest lattice sites, and $g$ measures the interaction strength relative to that spacing. It is a dimensionless form of the same coefficient, not an additional physical constant.

Restoring symbolic wake speed makes the normalization explicit: dimensionless time is $t=c_fT/\ell$ and the ratio is $g=G/(c_f^2\ell)$. The ratio compares the single-source acceleration scale $G/\ell^2$ with $c_f^2/\ell$, the acceleration scale for changing speed by $c_f$ during one lattice wake-crossing time $\ell/c_f$. In the required numerical convention $c_f=1$, this reduces to $g=G/\ell$. For fixed $G$, halving the lattice spacing doubles $g$. In this fixed dimensionless control, changing $\ell$ also scales the supplied pulse's physical amplitude and duration with $\ell$. The case $g=16$ therefore selects $\ell=G/16$ in these units. It is a parameter case covered by the proof, with no calibration to a typical populated universe implied. The range $0<g\le16$ is the proved range of this control; its upper endpoint is not asserted to be a universal physical limit.

The two targets occupy adjacent sites $(0,0,0)$ and $(\ell,0,0)$ and have opposite polarities. Their supplied excursions are identical along the third coordinate, perpendicular to their line of separation. Their separation is therefore exactly $\ell$ throughout the supplied past; no inward or outward relative kick is imposed. At release $T=0$, every architrino is back at its reference site with zero velocity. What distinguishes this input from the all-stationary reference is the two targets' earlier emitted histories. Complete paths are specified for every label and every $s\le0$, while the Master Equation determines all paths for $T>0$. Environmental positions are not held fixed during that evolution. This prepared-history control is not an assertion that a self-consistent all-past universe produced either the lattice or the excursion.

During the prescribed excursion, both targets first move downward, reverse, pass upward through their original sites, reverse above those sites, and return to rest at them. Their first and second coordinates remain fixed throughout this past motion. Differentiating the profile gives $\psi'(v)=(1-v^2)^3(1-9v^2)$, so its two interior extrema occur at $v=\pm1/3$. The attained target displacement is therefore at most $\ell/314928$, about three millionths of a lattice spacing. The coefficient $2^{-16}\ell$ in the profile is not its attained maximum. The targets reach the lower extremum at $T=-31\ell/24$, cross their sites at $T=-5\ell/4$, reach the upper extremum at $T=-29\ell/24$, and settle at $T=-9\ell/8$. All other paths in this supplied past remain stationary. Section 1.14 establishes why that environmental prescription cannot be the unforced response to the earlier pulse.

For $0<g\leq16$, the derived continuation reaches the common horizon $T=5\ell/16$. Exactly 24 environmental labels have nonconstant future histories: the disjoint distance-$\sqrt2\ell$ shells around the two modified labels. The targets and all remaining labels stay at their anchors through this horizon. Nonconstant history does not mean nonzero velocity or acceleration at every instant.

The estimate accounts for the moving receiver. In the ball $\|\mathbf y\|\leq b=1/64$, write $\mathbf S(\mathbf y)$ for the dimensionless stationary block acceleration and $\mathbf Q_{\mathbf k}(t,\mathbf y)$ for the changed old-source row minus its stationary row, with $\mathbf k=i-j$ for the unique first-pulse source $j$. The actual root determines which point of the supplied pulse enters this correction. Finite symmetric cubes have vanishing stationary Taylor coefficients through degree two; an absolutely summable third-derivative bound and the cube-to-block boundary estimate give

$$
\|\mathbf S(\mathbf y)\|\leq C_b\|\mathbf y\|^3,
\qquad C_b=\frac{1309}{(1-b)^5},\qquad
\|\mathbf S(\mathbf y)+\mathbf Q_{\mathbf k}(t,\mathbf y)\|<\frac1{64}.
$$

The receiver equation is $\mathbf y_i''=g[\mathbf S(\mathbf y_i)+\mathbf Q_{\mathbf k}(t,\mathbf y_i)]$, with zero displacement and velocity at $t_*=\sqrt2-11/8$. Integration to $H=5/16$ yields

$$
\|\mathbf y_i\|\leq\frac{g(t-t_*)^2}{128}\leq\frac{25}{2048}<b,
\qquad \|\mathbf y_i'\|\leq\frac5{64},
\qquad \|\mathbf y_i''\|\leq\frac14,
\qquad \|\mathbf y_i'''\|<3g\leq48.
$$

The strict displacement inequality prevents a first exit from the ball, while the smooth acceleration function and bounded velocity supply continuation. Uniform receiver bounds also give uniqueness among classical continuations in the declared bounded domain. The original history class allows environmental displacement $\ell/16$, target displacement $4\ell$, speed $4$, acceleration $256/\ell$, and jerk $2^{16}/\ell^2$. Combining the displayed future estimates with the supplied past bounds keeps every ceiling, smooth join, separation condition and original root margin through the common horizon. This is preservation along this fixed control, not invariance for every history in the class.

The endpoint is the reception of emission $s_b=-9\ell/8$ at the receiver's actual position. Since the source is at its anchor at $s_b$, its dimensionless endpoint satisfies

$$
t_i^{\rm end}+9/8=\|\mathbf k+\mathbf y_i(t_i^{\rm end})\|,
\qquad
\sqrt2-9/8-1/64\leq t_i^{\rm end}\leq\sqrt2-9/8+1/64<5/16.
$$

The derivative of the reception residual is at least $1-\|\mathbf y_i'\|\geq59/64$, so it has one zero and the pulse is traversed in order. The center $\sqrt2-9/8$ is the fixed-anchor reference time, not an assigned moving endpoint. After pulse exit a receiver may retain velocity and stationary-background acceleration.

Complete-history speed and displacement bounds establish exactly one positive-delay root in each distinct-label channel and no positive-delay self root. Every cross range is at least $31\ell/32$, so all received emission times obey

$$
s=T-r\leq\ell(5/16-31/32)=-21\ell/32<0.
$$

Thus the construction solves the entire population's future while receiving only prescribed pre-release emissions. It does not hold the environmental futures fixed or omit their already received contributions. Their newly generated emissions have not yet arrived.

### 1.7. Class loss and the next continuation boundary

The same input permits arbitrary $g>0$, but its fixed derivative ceilings prevent a full-pulse assertion for every such value. Let $J=2^{16}$ be its dimensionless jerk ceiling and $\theta=t-t_*$. A hypothetical globally $C^3$ continuation in the original class through $\theta_0=2^{-16}$ must satisfy $\|\mathbf y_i''\|\leq J\theta$, because acceleration is zero at onset. For the receiver with $\mathbf k=(1,0,1)$ relative to target zero, put $\mathbf n_0=\mathbf k/\sqrt2$ and $\mathbf e_a=-\sqrt2\mathbf n_0(n_0)_3$, a unit direction. The exact pulse expansion, with its uniform remainder and moving-receiver correction retained, gives

$$
\mathbf e_a\cdot\mathbf y_i''(t_*+\theta)>g\theta^3
\quad(0<\theta\leq2^{-16}).
$$

At $\theta_0$, the class permits acceleration magnitude at most $J\theta_0=1$, whereas the equation requires a projection strictly greater than $g2^{-48}$. These statements contradict one another for $g\geq2^{48}$, including equality. This time lies inside the first received pulse. The corrected parameter classification is therefore

| Coupling ratio | Derived conclusion for the unchanged smooth input |
| --- | --- |
| $0<g\leq16$ | Continuation through the complete returned pulse to $21\ell/16$ in Section 1.13, preserving the original class; Sections 1.11–1.12 supply the earlier $17\ell/16$ feedback interval and its increasing-separation theorem; Section 1.15 proves a transient approach at $g=16$ without classifying all smaller couplings |
| $16<g<2^{48}$ | A positive local response exists, but full-pulse continuation versus original-class loss remains unclassified |
| $g\geq2^{48}$ | No original-class continuation through $T_*+2^{-16}\ell$, before pulse completion |

Neither threshold is claimed sharp. The negative result follows from the equation and the fixed jerk ceiling, not from failure of a sufficient small-coupling estimate. It establishes neither a root singularity nor contact, does not determine which class ceiling is first encountered, and does not exclude regular continuation in a larger domain. Enlarging that domain would be a separate mathematical proposal; it is not adopted by this result. A positive local response for each fixed finite $g$ remains consistent because its duration can shrink as $g$ grows.

For the accepted small-coupling range, the next old-pulse shell has anchor reception onset $t=\sqrt3-11/8$, beyond the first-pulse horizon. Section 1.9 supplies the expanded receiving set and new estimates needed to continue through it. More generally, if complete displacement stays below $d\ell$, cross ranges exclude nonnegative emission times while $t<1-2d$; this sufficient inequality grants no lifespan without those bounds. Once emissions from generated motion arrive, the contributing source histories must also be controlled. Section 1.11 does this by a method of steps that samples only an already established prefix; comparisons of independently changed source histories require additional history-sensitivity estimates. Target contact, arbitrary-history continuity and physical selection of the class remain separate questions.

### 1.8. The topology and summation rule are part of the result

The original population class is a space of complete prescribed histories with quantitative displacement, speed, acceleration, jerk, separation, density, and root bounds. Its norm controls the entire past without fading away old changes. The accepted negative results concern that space and norm. They do not say that every dense history has a divergent sum, nor that a fixed finite source modification is inadmissible.

In the nonstationary counterexample, small old velocity changes can be coordinated over infinitely many labels so that the transmitter-factor correction has one sign. A cone of distant lattice sites then supplies a non-Cauchy block sum. A related finite-shell sequence has perturbation norm tending to zero while its acceleration correction stays bounded away from zero. Thus even extensions agreeing with every canonical finite-source correction cannot be continuous in the original norm. These are explicit lower-bound obstructions, stronger than merely finding a nonintegrable upper estimate.

The obstruction persists under a stronger geometric restriction: each alternating eight-source cell can translate rigidly and preserve all signed spatial moments through quadratic order at every supplied time. In the selected cells, the vertices have distinct distances from the receiver, hence different emission times. One shared cell history can have different velocities at those times. At the exact received emissions, a prescribed pulse construction returns each vertex to its anchor but gives sampled velocity $\nu\sigma_j\mathbf e$, where $\mathbf e$ is a fixed unit direction. With $t_j=\mathbf n_j\cdot\mathbf e\ge1/2$, its acceleration correction is exactly

$$
\Delta\mathbf F_j
=\frac{G\nu t_j\mathbf n_j}{d_j^2(1-\nu\sigma_jt_j)},\qquad
\mathbf e\cdot\Delta\mathbf F_j
\ge\frac{G\nu}{4(1+\nu)d_j^2}>0.
$$

Here $G=\kappa q_0^2>0$, $d_j$ is the anchor distance, $\mathbf n_j$ points from that anchor to receiver zero, and $0<\nu\le1/1024$. Complete root bounds give exactly one root in every cross channel and no positive-delay self root at release. In a fixed cone, the number of selected cells between radii $R$ and $2R$ grows as $R^3$, so the positive correction has a lower bound proportional to $\nu R$. The stationary cell series converges, and therefore cannot cancel this divergence. Taking only a finite distant shell with amplitude proportional to $1/R$ also gives histories tending to the stationary input while their acceleration corrections stay bounded away from zero. These are derived obstructions even with rigid internal geometry. They concern coordinated prescribed pasts on infinitely many cells or growing finite supports; they are not shown to arise from evolving a disturbance on two fixed labels.

The corresponding conditional positive estimate sums moments of the actual received positions over every admitted root, with weight $\sigma_j/|D_b|$ for root $b$ of source $j$. Assume uniform bounds on actual-root offsets from fixed cell centers, uniform root-count bounds and a nonzero transmitter-factor floor. If the zeroth and first moments vanish uniformly, bounded second moments give $O(R^{-4})$ cell acceleration. The same bound for history derivatives requires the moment conditions to hold throughout the allowed family, with bounded source jets, controlled tangent variations and a persistent complete root chart. Cubic cell counts then give $O(R^{-1})$ acceleration and derivative tails. Differentiability of the infinite functional additionally needs a remainder estimate valid after summation, or a suitable parameter-chart argument supplying it. For example, a cell remainder bounded by $\varepsilon\omega(\varepsilon)R^{-4}$ is summable, where $\varepsilon$ is history-distance and $\omega(\varepsilon)\to0$. An unweighted small remainder for each cell alone does not justify the infinite passage. No evolving population preserving these delayed moment conditions is established by this estimate.

A sufficient replacement proposal restricts the complete source histories by a decaying temporal envelope and an absolutely summable label-dependent remainder. With temporal power $p>1$, stationary subtraction permits summable acceleration and derivative tails. At the threshold $p=1$, coordinated source shells again defeat the desired continuity; a bound whose dyadic majorant fails to decay is not by itself a divergence proof, but the retained counterexample supplies the needed lower bound. The replacement class remains a mathematical proposal rather than a selected physical distribution.

Three freedoms must stay separate: reordering whole cells of one partition, reordering individual sources, and changing the partition. Absolute convergence of a cell series permits the first. It does not grant the other two. Likewise, a convergent field at two chosen receivers does not establish a coupled infinite evolution. The first-pulse construction succeeds because it proves the common bounds and evolves every receiver on a fixed control; its result should neither be erased by the broader negative nor extended beyond its own horizon.

To transfer a finite-population miss to a limiting evolution, one needs both a uniform difference bound on the acceleration functionals and a coupled stability estimate including the environmental histories. If the trajectory error is bounded by $C\eta_N$, a minimum separation exceeding $2C\eta_N$ can certify a miss in the limit. A sampled minimum approaching zero cannot certify contact. Exact contact requires an additional one-sided crossing or invariant-symmetry argument, and its genericity requires a differentiable admitted history family.

### 1.9. Continuation through the second receiving shell

The unchanged smooth two-target disturbance continues through the next received pulse for the same coupling range $0<g=G/\ell\le16$. In dimensionless time $t=T/\ell$, a common evolution reaches $H=79/128$. The improvement uses a sharper bound on the existing pulse, with no change to its amplitude or supplied past. For $\psi(v)=v(1-v^2)^4$,

$$
\psi'(v)=(1-v^2)^3(1-9v^2),\qquad |\psi'(v)|\le1.
$$

The bound follows from the extrema at $v^2=0,1/3,1$, with derivative values $1,-16/27,0$. The original amplitude $\varepsilon=2^{-16}$ and time scaling give complete-past source speed at most $8\varepsilon=1/8192$.

Let $\mathbf y_i(t)=(\mathbf X_i(\ell t)-\ell i)/\ell$ and use the proof ball $\|\mathbf y_i\|\le b=1/1024$. The cubic stationary field and at most two changed-source corrections obey

$$
\|\mathbf S\|+\sum_j\|\mathbf Q_{i-j}\|
\le\frac{1309b^3}{(1-b)^5}+
2\frac{2\varepsilon+1/8192}{1-1/8192}
<\frac1{3200}.
$$

The corrections retain their polarity products: the distance-squared-two product is positive and the distance-squared-three product is negative. Integrating the acceleration bound gives $\|\mathbf y_i\|\le gt^2/6400$ and $\|\mathbf y_i'\|\le gt/3200$. Because $H<5/8$ and $g\le16$, the former remains strictly below $1/1024$ and the latter below $1/320$. This excludes a first exit from the ball and supplies continuation of the smooth receiver equations to $H$. Differentiating their actual delayed roots bounds dimensionless jerk by $5g\le80$ and retains the smooth joins at pulse reception.

Exactly 32 environmental labels have nonconstant future histories on this interval. The receiving set consists of labels at distance $\sqrt2$ or $\sqrt3$ from either target anchor in lattice units. There are 40 ordered source-receiver pulse pairs. Eight receivers belong to both sets and receive a pulse from each changed source. The original 24 histories remain nonconstant; the new eight labels are

$$
(-1,\pm1,\pm1),\qquad (2,\pm1,\pm1).
$$

Their first reception begins at $t_3=\sqrt3-11/8$. Relative to the relevant source, write $\mathbf k=i-j$ and $\theta=t-t_3$. The opposite-polarity product and the exact initial pulse expansion give the derived response

$$
\mathbf y_i(t_3+\theta)
=\frac{g\mathbf k k_3}{45}\theta^5+O_g(\theta^6),
\qquad \|\mathbf k\|^2=3,\quad k_3=\pm1.
$$

The coefficient is nonzero for every $g>0$, so counting these labels as newly moving does not rely on a numerical threshold. Both targets and all labels outside the receiving set stay stationary by the receiver equations and local uniqueness. No claim is made that every moving receiver has nonzero velocity at every instant.

Pulse endpoints are determined at the moving receivers. For each receiving pair, the support-end equation is

$$
t_{ij}^{\rm end}+9/8
=\|i-j+\mathbf y_i(t_{ij}^{\rm end})\|,
\qquad
\left|t_{ij}^{\rm end}-(\|i-j\|-9/8)\right|\le1/1024.
$$

The reception residual has derivative at least $319/320$, so this endpoint is unique. Every such pulse ends before $\sqrt3-9/8+1/1024<H$. The double receivers' second-pulse starts are also determined by their moving positions. Distance-one pulses have already passed before release, while the distance-two pulse cannot begin before $5/8-1/1024>H$. Completion of reception does not make a receiver stationary again.

The entire supplied-and-evolved history has displacement below $\ell/1024$ and speed at most $1/320$. Thus every cross range is at least $511\ell/512$, every cross channel has exactly one positive-delay root with transmitter factor at least $319/320$, and all positive-delay self channels are empty. The original root tubes and complement margins remain valid. Every arriving emission satisfies

$$
s=T-r\le\left(\frac{79}{128}-\frac{511}{512}\right)\ell
=-\frac{195\ell}{512}<0.
$$

This last bound identifies the receiver equations with the full EOM throughout the extended interval. The environmental futures evolve in response to the supplied old disturbance; their newly generated emissions have not yet arrived. The complete acceleration and jerk remain below the original class ceilings, and the stronger displacement bound retains the density and separation conditions. Uniqueness is established among classical continuations sharing this complete past and staying within displacement $b\ell$ and speed $1/4$; singular or unrestricted alternatives are outside that assertion.

The next distance-two shell begins at anchor time $5/8$. Section 1.10 supplies the receiving-set and motion estimates through its full pulse and the overlapping next-shell entries. The targets remain separated by $\ell$ on the interval proved here. This concrete environmental response establishes neither contact nor exclusion in general populations, and it does not imply that the original history class is invariant for arbitrary perturbations.

### 1.10. Distance-two reception and the overlapping next shell

The distance-two pulse cannot be treated as an isolated reception interval. Its anchor support ends at $t=7/8$, while the distance-$\sqrt5$ pulse starts at $t=\sqrt5-11/8<7/8$. The same smooth two-target input therefore requires both sets of receivers when continued through the distance-two exit.

Keep the dimensionless coupling $0<g=G/\ell\le16$, displacement ball $b=1/1024$, input amplitude $\varepsilon=2^{-16}$ and input speed bound $\nu=1/8192$ from Section 1.9. Set the new horizon to $H=113/128$. Every active finite source correction has anchor distance at least $\sqrt2$, so its actual range and the segment used to subtract the stationary row exceed $\sqrt2-b-\varepsilon>7/5$. For the inverse-square vector kernel $\mathbf K(\mathbf R)=\mathbf R/\|\mathbf R\|^3$, this gives

$$
\|\mathbf Q\|\le
\frac{2\varepsilon(5/7)^3+\nu(5/7)^2}{1-\nu},
\qquad
\|\mathbf S\|+\sum_j\|\mathbf Q_{i-j}\|<\frac1{6400}.
$$

The stationary contribution $\mathbf S$ retains its cubic bound, and there are at most two source corrections per receiver even when additional shells arrive. Their polarity factors remain $(-1)^{\|i-j\|^2}$: positive at distance two and negative at distance $\sqrt5$. Integrating the acceleration bound from release yields

$$
\|\mathbf y_i(t)\|\le\frac{gt^2}{12800},\qquad
\|\mathbf y_i'(t)\|\le\frac{gt}{6400},\qquad
\|\mathbf y_i''(t)\|<\frac g{6400}.
$$

At $g=16$ and $t=H$, the displacement bound is $12769/13107200<1/1024$, and the speed bound is $113/51200<1/400$. The strict displacement inequality excludes the first exit from the ball. Positive ranges and transmitter denominators keep the receiver equations smooth there, giving continuation through $H$. The differentiated-root estimate still bounds dimensionless jerk by $5g\le80$. No source history, admitted class ceiling or coupling range is changed to obtain this extension.

Actual reception endpoints use the moving receiver. For anchor separation $d=\|i-j\|$, the entry and exit solve

$$
t_{ij}^{\rm entry}+11/8=\|i-j+\mathbf y_i(t_{ij}^{\rm entry})\|,
\qquad
t_{ij}^{\rm exit}+9/8=\|i-j+\mathbf y_i(t_{ij}^{\rm exit})\|.
$$

The residuals increase at least at rate $399/400$, so each endpoint on the constructed interval is unique and differs from its anchor value by at most $b$. The strict inequalities

$$
7/8+b<H<\sqrt6-11/8-b,
\qquad
\sqrt5-11/8+b<7/8-b,
\qquad H<\sqrt5-9/8-b
$$

place every distance-two exit before the horizon, exclude every distance-$\sqrt6$ entry, and ensure that all distance-$\sqrt5$ entries precede all distance-two exits while their own exits remain later than $H$. The unfinished pulse is included in the equation; its future exit is not assigned an unproved trajectory value.

The affected labels lie at squared distance $2$, $3$, $4$ or $5$ from one of the two target anchors. Those shells contain 12, 8, 6 and 24 labels per source. Across both sources there are 100 entered ordered source-receiver pairs, of which 52 have completed their pulses and 48 have not. A label belongs to both source sets only when its squared distances $(m,n)$ are one of $(2,3),(3,2),(2,5),(5,2),(4,5),(5,4)$, each with four solutions. This follows from $i_1=(m-n+1)/2$ and $i_2^2+i_3^2=m-i_1^2$. Thus there are 24 double receivers and 76 distinct environmental receivers. Twelve new labels first receive at distance two, and another 32 first receive at distance $\sqrt5$.

An explicit onset calculation establishes that all 44 new labels move. Until their first future reception they remain at their anchors. Write $\mathbf k=i-j$, $d=\|\mathbf k\|$, $\theta=t-(d-11/8)>0$ and $\sigma=(-1)^{d^2}$ relative to the first arriving source. The unchanged pulse satisfies $p(u)=-u^4+O(u^5)$ and $p'(u)=-4u^3+O(u^4)$ near its support start. For $k_3\ne0$, the transmitter denominator gives the first response

$$
\mathbf y_i(d-11/8+\theta)
=-\frac{\sigma g\mathbf k k_3}{5d^4}\theta^5+O_g(\theta^6).
$$

For $k_3=0$, this fifth-order coefficient vanishes. Motion instead begins through the displacement term in the acceleration kernel: $D\mathbf K(\mathbf k)\mathbf e=\mathbf e/d^3$, while the transmitter-denominator correction starts only at seventh order. Consequently

$$
\mathbf y_i(d-11/8+\theta)
=\frac{\sigma g\mathbf e}{30d^3}\theta^6+O_g(\theta^7).
$$

Both formulas follow by integrating the leading acceleration twice; the local receiver Lipschitz estimate puts feedback at higher order. Among the new labels, 28 have a nonzero fifth-order coefficient and 16 have a nonzero sixth-order coefficient. Every coefficient is nonzero for $g>0$. Together with the earlier 32 histories and the stationary complement, these formulas establish exactly 76 nonconstant environmental histories on $[0,H]$. Both targets stay at their anchors.

The complete past and future displacement remains below $\ell/1024$ and speed below $1/400$. Every cross range is therefore at least $511\ell/512$, each complete cross channel has exactly one positive-delay root, and the positive-delay self channels are empty. The original root tubes and complement gaps are preserved by the residual slope floor $399/400$. At every received cross root,

$$
s=T-r\le\left(\frac{113}{128}-\frac{511}{512}\right)\ell
=-\frac{59\ell}{512}<0.
$$

The receiver equations are thus the full EOM on this interval. Environmental futures are evolved, while the absence of received emissions from those futures is a consequence of the delay geometry. Until those emissions arrive, the finite system is a product of independent receiver equations driven by the same supplied past. The original acceleration, jerk, density, separation and smoothness conditions remain satisfied. Uniqueness retains the same bounded comparison scope: the identical complete past and fixed block sum, future displacement at most $b\ell$ and speed at most $1/4$.

The targets remain separated by $\ell$ throughout this interval. Section 1.11 supplies the next method-of-steps estimate and includes received emissions from EOM-generated environmental motion. Later distance-$\sqrt5$ exits require further continuation estimates. This example establishes an evolving environmental response to a specified local disturbance; it does not establish contact behavior or class invariance for arbitrary populated histories.

### 1.11. First received environmental feedback and target motion

The first received emissions from the moving environment change the targets' behavior. Both targets leave their anchors, initially moving together in the direction of the supplied past displacement. Their common leading motion does not change their separation. A higher-order contribution moves them apart along their original line of separation.

Keep the unchanged smooth input and $0<g=G/\ell\le16$, with $c_f=1$. Let $\alpha=\sqrt2-11/8$ be the first environmental onset, and let $\mathcal S$ denote its 24 responding labels at squared distance two from the two target anchors. Continue from the accepted interval ending at $h=113/128$ to $H=17/16$ in dimensionless time. Use a proof displacement ball of radius $B=1/512$, which remains inside the original history class. Every cross range then exceeds $1-2B=255/256$ in lattice units.

The four returning sources at each target are selected by this geometry and the elapsed causal time. In units of $\ell$, the right target is at anchor $(1,0,0)$. Four of its six nearest neighbors are $(1,1,0)$, $(1,-1,0)$, $(1,0,1)$ and $(1,0,-1)$. Each is a face-diagonal neighbor of the left target $(0,0,0)$, at distance $\sqrt2$, and a nearest neighbor of the right target, at distance one. The first return paths therefore run from the left target's supplied pulse to those four environmental responders, then from their generated histories to the right target. The left target receives the reflected four paths through $(0,\pm1,0)$ and $(0,0,\pm1)$, excited by the right target. There are eight distinct environmental sources across the two targets, drawn from the 24 first responders.

The initial motion of these four neighbors is especially concrete. The source above the right target, at $(1,0,1)$, begins moving down and left. The source below it, at $(1,0,-1)$, begins moving down and right. The two side sources at $(1,\pm1,0)$ begin moving upward. These are the leading directions from Section 1.5, with coordinates in lattice units; later reception of the rest of the pulse changes their acceleration. The left target's four-source picture is the reflection across the plane halfway between the targets. A source need not return to its anchor or stop when the driving pulse ends.

The remaining axial nearest neighbors are still present in the equation. The right target's neighbor at zero is the other target; its direct old pulse arrived before release, and its new target motion cannot return on this interval. The outer neighbor $(2,0,0)$ received the right target's old pulse before release and first receives a postrelease disturbance from the left target across distance two, so its generated return is later. In particular, every distance-one old pulse passed during $[-3\ell/8,-\ell/8]$, which is wholly inside the prescribed past. Distance-$\sqrt2\ell$ pulses are the first that arrive after release. Four counts the nonstationary generated corrections received by one target, not a truncation to four interacting particles or omission of the infinite stationary reference. The eight first-return sources are also distinct from the eight-source blocks used to define that reference sum.

The source-time bound for the continuation is

$$
s/\ell\le H-(1-2B)=17/256<h.
$$

This is the reason the next interval can be constructed. Every environmental source segment it receives has already been evolved in the accepted prefix. Such a segment is not an independently supplied environmental future. Using it as known data on the next interval implements the delayed coupling by a method of steps: solve one interval, then use its generated history wherever the causal equation samples it on a later interval.

The source-time bound also precedes the second environmental onset $\sqrt3-11/8$. Only the first 24 responding paths can contribute nonstationary generated corrections, and only to nearest-neighbor receivers because $H+2B<\sqrt2$. Other received postrelease histories remain at their anchors and contribute their stationary reference rows. The distance-$\sqrt5$ old pulses remain active, and the distance-$\sqrt6$ old pulses have not started.

The acceleration consists of the original stationary block sum, at most two corrections from the prescribed target pulses, and at most six corrections from generated environmental paths. For a known generated source displacement $\mathbf U_j$ and velocity $\mathbf V_j$, its correction is

$$
\mathbf Q^{\rm gen}_{ij}
=\frac{\mathbf K(i-j+\mathbf y_i-\mathbf U_j(s))}
{1-\mathbf n\cdot\mathbf V_j(s)}
-\mathbf K(i-j+\mathbf y_i),
\qquad
t-s=\|i-j+\mathbf y_i-\mathbf U_j(s)\|,
$$

where time is dimensionless inside this equation, $\mathbf K(\mathbf r)=\mathbf r/\|\mathbf r\|^3$, and $\mathbf n$ is the corresponding range unit vector. Each correction retains its polarity product and transmitter denominator. The new source paths are EOM outputs; receiver playback supplies no extra acceleration factor.

The short received portion of each generated path makes the estimate small. The accepted acceleration bound and stationarity through $\alpha$ give

$$
\|\mathbf U_j(s)\|\le\frac{g(s-\alpha)^2}{12800},
\qquad
\|\mathbf V_j(s)\|\le\frac{g(s-\alpha)}{6400}.
$$

Since $17/256-\alpha<1/32$, these are at most $P=1/819200$ and $V=1/12800$. Actual ranges and subtraction segments exceed $7/8$, so each generated correction has norm at most $[2P(8/7)^3+V(8/7)^2]/(1-V)<1/9000$. The stationary background and two old corrections together have norm less than $1/6000$. No generated correction can act before $L=33/32$, because its source time would precede $\alpha$. Thus

$$
\begin{aligned}
\|\mathbf y_i(t)\|&\le\frac{gt^2}{12000}
+\frac{g(t-L)_+^2}{3000},\\
\|\mathbf y_i'(t)\|&\le\frac{gt}{6000}
+\frac{g(t-L)_+}{1500}.
\end{aligned}
$$

At the largest admitted coupling and the new horizon, the bounds are $29/19200<1/512$ and $19/6000<1/256$. The strict first-exit argument therefore gives continuation to $H$. Differentiating the actual roots, including source acceleration, bounds dimensionless jerk by $49g\le784$; complete acceleration is at most $3/8$. The original class ceilings, density, separation and smooth joins retain slack.

The receiving geometry is finite. Nearest neighbors of one first-response shell have squared distances one, three and five from its exciting target. There are respectively six, eight and 24 such receivers, with four, three and one source neighbors per receiver. The two centers' receiver sets have opposite lattice parity and are disjoint. Across both there are 144 generated ordered channels reaching 76 labels. Seventy-four already belong to the earlier environmental receiving set, while the remaining two are the targets. Thus this step has 78 labels with nonconstant future histories in total, comprising the same 76 environmental histories and both targets.

For every generated channel, the onset emission occurs at $\alpha$ with its source still at the anchor. Its actual arrival satisfies

$$
t_{ij}-\alpha=\|i-j+\mathbf y_i(t_{ij})\|.
$$

The residual has derivative at least $255/256$, and its root lies within $B$ of $\beta=\alpha+1=\sqrt2-3/8$. All 144 boundaries arrive before $H$. The earliest global boundary is the minimum of these moving-receiver roots; it lies in $[\beta-B,\beta]$. The present estimates do not identify the earliest moving receiver or justify assigning that minimum the anchor value $\beta$.

For the targets themselves, the first boundary is exactly $\beta$. Target 0 receives from $\pm e_2,\pm e_3$, and target $e_1$ from $e_1\pm e_2,e_1\pm e_3$. Each target remains stationary up to $\beta$ by its receiver equation and uniqueness. Each of its four generated-source polarity products is negative. The two vertical neighbors have leading source velocity $-g\mathbf k k_3u^4/4$, with common third component $-gu^4/4$. In the target acceleration, their terms $-g\mathbf n(\mathbf n\cdot\mathbf V_j)$ add. The two transverse neighbors start later in the expansion and do not alter the leading coefficient. With $\delta=t-\beta>0$,

$$
\mathbf y_0(\beta+\delta)
=\frac{g^2}{60}\mathbf e_3\delta^6+O_g(\delta^7),
\qquad
\mathbf y_{e_1}(\beta+\delta)
=\frac{g^2}{60}\mathbf e_3\delta^6+O_g(\delta^7).
$$

This proves actual target motion for each fixed $g>0$. At $\delta=0$ the displacement and velocity still vanish; $\beta$ is the onset boundary, not an instant with an already nonzero displacement. The equality of these coefficients is material: their contribution to relative displacement is zero.

The first separation term comes from the next even contribution of the simultaneous vertical source pair. Relative to their original exciting target, these sources have offsets $\mathbf k=(a,0,\pm1)$, where $a=-1$ for target 0's neighbors and $a=+1$ for target $e_1$'s. In their original received pulse, the first-component acceleration terms below sixth order are odd in $k_3$ and cancel between the pair. At sixth order there are two even terms: moving the old emission root supplies $p''p=12\theta^6+O(\theta^7)$, and the squared transmitter-denominator contribution supplies $(p')^2=16\theta^6+O(\theta^7)$. For their original distance $d=\sqrt2$, the resulting coefficient is

$$
Q_x^{\rm even}=\frac{28k_xk_3^2}{d^5}\theta^6+O(\theta^7).
$$

Source receiver-position feedback begins only at seventh order in acceleration. Twice integrating the sixth-order term and adding the two sources gives a pair first displacement $ga\,u^8/(4\sqrt2)+O_g(u^9)$. At the target, the linear displacement correction is $g$ times that pair sum; its vertical-source velocity term has no first component through this order. A transverse source has a seventh-order original denominator correction and an eighth-order first-component kernel displacement, so its first-component acceleration begins at order seven and its first displacement at order nine. Shifts of the new source roots and target receiver-position feedback also contribute only at ninth or higher acceleration order. Consequently

$$
y_{0,x}=-\frac{g^2}{360\sqrt2}\delta^{10}+O_g(\delta^{11}),
\qquad
y_{e_1,x}=+\frac{g^2}{360\sqrt2}\delta^{10}+O_g(\delta^{11}).
$$

Reflection across $x_1=1/2$ exchanges the targets and reverses all polarities, leaving every polarity product unchanged. Reflection in $x_2=0$ preserves the input as well. The fixed stationary sum respects these reflections through its vanishing anchor jets and absolutely convergent third-derivative sum; finite source corrections transform with the source histories. Regular uniqueness therefore makes the third components equal and the second components zero. The separation is

$$
\|\mathbf X_{e_1}-\mathbf X_0\|
=\ell\left[1+\frac{g^2}{180\sqrt2}\delta^{10}
+O_g(\delta^{11})\right].
$$

Integrating the same acceleration expansion once also gives

$$
\frac{d}{dt}\left(\frac{\|\mathbf X_{e_1}-\mathbf X_0\|}{\ell}\right)
=\frac{g^2}{18\sqrt2}\delta^9+O_g(\delta^{10}).
$$

Its sign is positive for a sufficiently small positive interval after feedback onset, for each fixed $g>0$, establishing an initial increase. This local expansion alone does not bound the remainder through the full horizon. Section 1.12 supplies the finite-interval bound; long-time separation remains unresolved.

Complete displacement below $B\ell$ and speed below $1/256$ preserve exactly one cross root per channel and exclude every positive self root. The original tubes and complement gaps remain valid with slope floor $255/256$. Uniqueness holds among classical continuations with the identical complete input and fixed block sum, future displacement at most $B\ell$ and speed at most $1/4$. Such a competitor first matches the accepted prefix because all its earlier cross emissions are negative, then matches the new step because every subsequently received source segment lies in that same prefix. Equal-time separation exceeds $255\ell/256$ throughout the proved interval, independently of the local expansion.

The distinction between scenarios is explicit here: the two prescribed past disturbances first generate environmental motion, and emissions from that motion later generate target motion. This control supplies a finite interval of actual feedback in an infinite population. Arbitrary-history invariance, the identity of the globally earliest moving receiver, later returns and general coordinate-coincidence behavior remain separate questions.

### 1.12. Separation increases over the complete feedback interval

The separation increase can be controlled throughout the interval constructed in Section 1.11. The relevant distinction is between common motion and relative motion. Both targets initially move in the third direction, while their much smaller first-component motions determine separation. An estimate that combines all components would obscure this difference. The following derived bound retains the signed source-pair cancellation and separately controls the errors that can change it.

Keep the same complete past, block prescription, original class and $0<g=G/\ell\le16$, with $c_f=1$. Let $H=17/16$, $\alpha=\sqrt2-11/8$, $\beta=\alpha+1$ and $\delta=t-\beta$. For the right target write $x(\delta)=y_{e_1,1}(\beta+\delta)$. The result is

$$
x''(\delta)\ge\frac{g^2}{300}\delta^8
\qquad(0<\delta\le H-\beta).
$$

The reflection identities from Section 1.11 give normalized separation $d(t)=\|\mathbf X_{e_1}(\ell t)-\mathbf X_0(\ell t)\|/\ell=1+2x(\delta)$. Both targets start from rest at $\beta$, so

$$
d'(t)\ge\frac{g^2}{1350}\delta^9>0,\qquad
d(t)-1\ge\frac{g^2}{13500}\delta^{10}>0.
$$

Thus separation stays constant before target feedback and increases strictly afterwards through $17\ell/16$. The conservative inequalities quantify the remainder without changing the earlier leading coefficients.

First restrict the required source histories. Put $U=3/128$. The exact inequality $H-\beta<U-1/10000$, the accepted generated-source displacement bound $1/819200$, and the target acceleration bound $g/2000$ imply that every received source offset $u=s-\alpha$ lies below $U$. These source segments are already EOM-evolved parts of the accepted prefix. Each sees only its original old-pulse disturbance during this short interval.

The two vertical environmental sources relevant to the right target have offsets $(1,0,\pm1)$ from their original exciting target. Let their actual displacements be $\mathbf U_\pm(u)$. Their first-component sum obeys

$$
\frac{gu^8}{20}-\frac7{360}g^2u^9
\le U_{+,1}(u)+U_{-,1}(u),\qquad
|U_{+,1}(u)+U_{-,1}(u)|<\frac{gu^8}{3}.
$$

Each vertical source also satisfies

$$
\|\mathbf U_\pm\|\le gu^5/10,\quad
\|\mathbf U_\pm'\|\le gu^4/2,\quad
|U_{\pm,1}|,|U_{\pm,3}|\le gu^5/16,\quad
|U_{\pm,1}'|,|U_{\pm,3}'|\le5gu^4/16.
$$

The positive pair bound has an exact integral origin. For the old pulse $p(v)=-(1-8v)v^4(1-4v)^4$, introduce the auxiliary amplitude $\lambda\in[-1,1]$ and the fixed-anchor comparison

$$
\begin{gathered}
r_\lambda(v)=\sqrt{1+(1-\lambda p(v))^2},\quad
t_\lambda(v)=v+r_\lambda(v)-\sqrt2,\quad
t_\lambda(v_\lambda)=u,\\
Z(\lambda,u)=\int_0^{v_\lambda}
(u-t_\lambda(v))r_\lambda(v)^{-3}\,dv-\frac{u^2}{2(\sqrt2)^3}.
\end{gathered}
$$

Changing integration from reception time to emission time cancels the transmitter denominator. The two anchor comparison displacements have first components $gZ(1,u)$ and $gZ(-1,u)$, and $Z(0,u)=0$. Write $b=1-\lambda p$ and $D_\lambda=t_\lambda'$. Differentiating twice in amplitude, including the moving integration boundary, gives

$$
\begin{aligned}
\partial_\lambda^2Z={}&
\frac{b(v_\lambda)^2p(v_\lambda)^2}
{r_\lambda(v_\lambda)^5D_\lambda(v_\lambda)}\\
&+\int_0^{v_\lambda}
\left[
\frac{(6b^2-1)p^2}{r_\lambda^6}
+(u-t_\lambda)\frac{(12b^2-3)p^2}{r_\lambda^7}
\right]dv.
\end{aligned}
$$

All terms are nonnegative on this interval, and the boundary term is positive for $u>0$. Since $Z(1,u)+Z(-1,u)=\int_{-1}^1(1-|\lambda|)\partial_\lambda^2Z\,d\lambda$, the full pulse shape can be bounded directly. The original roots obey $(999/1000)u\le v_\lambda\le(1001/1000)u<1/40$. The boundary term alone then exceeds $u^8/20$, while the whole expression is below $u^8/4$.

The comparison does not hold the actual environment fixed. For its actual receiver equation, the pulse derivative bounds $|p|\le v^4$, $|p'|\le4v^3$ and $|p''|\le12v^2$, together with range greater than $7/5$, give

$$
\|D_{\mathbf y}(\mathbf S_0+\mathbf Q)\|\le7u^2.
$$

The actual displacement bound $gu^5/10$ consequently makes the difference between each moving source and its twice-integrated anchor comparison at most $7g^2u^9/720$. Adding the two errors proves the displayed pair bound.

The transverse environmental sources have exciting offsets $(1,\pm1,0)$. For their anchor comparison, $r=\sqrt{2+p^2}$ and $D=1+pp'/r\ge1$, so the first component begins at order seven in acceleration. Applying the same receiver derivative estimate gives, for each actual transverse source,

$$
\|\mathbf U_\perp\|\le gu^6/60,\quad
\|\mathbf U_\perp'\|\le gu^5/10,\quad
|U_{\perp,1}|<gu^9/64.
$$

At the target, these source bounds sharpen the total displacement to $\|\mathbf y_{e_1}\|\le g^2\delta^6/14$. Every actual received source offset obeys $0<u_j<(1000001/1000000)\delta$. Let $F_j=r_j^{-3}/D_j$ be its actual range-and-transmitter weight, and let $f_j=\|e_1-j+\mathbf y_{e_1}\|^{-3}$ be the stationary reference factor. Because the four anchor channel vectors have zero first component, the exact first-component equation is

$$
x''=A(\delta)+b(\delta)x,\qquad
A=g\sum_j U_{j,1}(u_j)F_j,\qquad |b|\le3g^2\delta^4.
$$

The coefficient $b$ includes the stationary first-component derivative and $\sum_jg(f_j-F_j)$. The stationary first component vanishes when $x=0$ by reflection, which is why common third-direction motion does not enter this term as a large uncontrolled error.

The two vertical channel contributions differ from their source-pair sum at common offset $\delta$ by at most

$$
\left|\sum_{j\ {\rm vertical}}U_{j,1}(u_j)F_j
-U_{+,1}(\delta)-U_{-,1}(\delta)\right|
<\frac2{25}g^2\delta^9+\frac{23}{500}g^3\delta^{10}.
$$

This bound includes both the generated-root shift and nonlinear weight. It follows by bounding $|u_j-\delta|$ using the third components and the square of the first-component range difference, then bounding the displacement change with the source velocity. The two transverse terms together have magnitude below $g\delta^9/30$. The source-pair upper bound now yields $|A|<g^2\delta^8/2$. A first-exit comparison, initialized by the earlier local expansion, gives $|x|\le g^2\delta^{10}/64$, and therefore $|bx|<g^4\delta^{10}/250$.

Combining the positive vertical-pair term with every possible opposing contribution gives

$$
x''\ge g^2\delta^8
\left[\frac1{20}-\frac{179}{1800}g\delta
-\frac{\delta}{10}-\frac{g^2\delta^2}{20}\right].
$$

All subtracted terms increase with $g$ and $\delta$. At the conservative endpoints $g=16$ and $\delta=3/128$, the bracket is exactly $1/300$. It is therefore positive throughout the actual interval, proving the separation inequalities above.

The environment's return signal thus increases the targets' separation throughout this first feedback interval. The conclusion uses the specified smooth disturbance, its actual environmental response and their delayed signed contributions. It supplies no sign for later returns, no stability statement under changed histories, and no general exclusion of coordinate coincidence in a populated universe.


### 1.13. Following the complete returned pulse

The next physical question concerns the rest of the environmental response already arriving at the targets. The original pulse first changes the environment; those moving environmental histories then supply the targets' acceleration. Receiving the original pulse endpoint through this two-stage process marks a change in the source's driving regime. The source can retain displacement and velocity afterwards, so receipt of that endpoint does not end its contribution to the target.

The following continuation and comparison are derived in the [next-feedback analysis](analysis/smooth-two-particle-next-feedback.md) and accepted by its [independent assessment](analysis/smooth-two-particle-next-feedback-independent-adjudication.md). They preserve the identical complete past, fixed stationary block sum, $c_f=1$ and $0<g\le16$. This comparison by itself extends no separation sign beyond $H=17/16$. Section 1.15 supplies the additional actual-history error bound and establishes transient approach at $g=16$.

For one of the four channels at a target, write $e(v)=-11/8+v$ for the original emission time, $p(v)=-(1-8v)v^4(1-4v)^4$ for its third-coordinate displacement, $s_j(v)$ for reception at environmental source $j$, and $t_{ij}(v)$ for the subsequent reception at target $i$. If $c$ is the exciting target, the event equations are

$$
\begin{aligned}
s_j(v)-e(v)&=\|j-c+\mathbf U_j(s_j(v))-p(v)e_3\|,\\
t_{ij}(v)-s_j(v)&=\|i-j+\mathbf y_i(t_{ij}(v))-\mathbf U_j(s_j(v))\|.
\end{aligned}
$$

The environmental displacement $\mathbf U_j$ is its actual EOM history. Both maps increase while their receiver and source speeds remain below one. The first zero of $p'$ at $v=1/12$ therefore arrives before the endpoint at $v=1/4$, but it is not an acceleration-zero condition: the acceleration also contains the range-dependent displacement contribution, and the target samples the integrated environmental response.

Continuation to $H_*=21/16$ can be constructed using only source histories already accepted through $h=113/128$. In the displacement ball $B_*=1/256$, every cross range is at least $127/128$, so every sampled nonnegative emission satisfies

$$
s\le\frac{21}{16}-\frac{127}{128}=\frac{41}{128}<\sqrt3-\frac{11}{8}<h.
$$

Only the first 24 environmental responders contribute nonconstant generated source histories, and they still act only along nearest-neighbor channels. The targets retain four such channels each. A time-dependent bound for each generated correction, $\|\mathbf Q^{\rm gen}\|<g(t-1)/4750$, gives the full receiver estimate

$$
\|\mathbf y_i''\|\le\frac g{4300}+\frac{6g^2}{4750}(t-1),
\qquad H\le t\le H_*.
$$

Integrating from the accepted cut, at the largest coupling, bounds displacement by $305261/78432000<1/256$ and speed by $94387/4902000<1/32$. The strict displacement inequality prevents the solution from leaving the proof ball. The source-time bound makes the receiver equations ordinary differential equations with known delayed inputs, and their uniform Lipschitz bound supplies existence and uniqueness. Uniqueness compares classical continuations with the identical supplied past and block sum, displacement at most $1/256$ and speed at most $1/4$. Complete speed below $1/32$ makes every cross delay residual strictly increasing, hence gives exactly one cross root and excludes all positive-delay self roots. Acceleration, jerk, density and the original root margins remain within their stated class limits. The exact zero-delay diagonal remains unevaluated.

The old squared-distance-six shell enters during this extension, but its newly generated motion cannot return to the targets on the same slab. The receiving census contains 148 old-pulse ordered receptions on 100 environmental labels, together with both targets, and retains the 144 generated nearest-neighbor channels. Each target's pulse-end reception differs from the anchor value $\sqrt2-1/8$ by at most $3/512$, so all eight channels have received that event before $H_*$. The first additional target-source family has anchor arrival $2\sqrt2-11/8$, later than this slab; its actual reception requires another continuation.

To study separation, hold the four environmental receivers at their anchors only as an analytical comparison and integrate their exact old-pulse acceleration twice. Let $\mathcal Z(u)$ be their summed first-coordinate comparison displacement divided by $g$, with $u$ measured from their onset. The comparison retains the full pulse and actual emission root at each fixed receiver. Combining the four source integrals before estimating them gives kernel differences

$$
H_m(a)=(2-2a+a^2)^{-m/2}+(2+2a+a^2)^{-m/2}
+2(2+a^2)^{-m/2}-4\,2^{-m/2}.
$$

For $|a|\le2^{-16}$, direct algebra gives $H_2(a)=-2a^6/[(2+a^2)(4+a^4)]\le0$, while a binomial and convexity estimate gives $H_3(a)\ge a^2(3-105a^2/4)/(\sqrt2)^7>0$ when $a\ne0$. The displacement integral has common integrand $(u-v+\sqrt2)H_3(p(v))-H_2(p(v))$. Its four moving-endpoint corrections are nonnegative because the reception maps increase. Consequently $\mathcal Z(u)>0$ for every $u>0$, including both pulse lobes. After pulse completion it has the exact form

$$
\mathcal Z(u)=\left(u+\sqrt2-\frac18\right)C_3-C_2,
\qquad C_m=\int_0^{1/4}H_m(p(v))\,dv,
\qquad C_3>0,\quad C_2<0.
$$

The comparison therefore retains a positive summed source velocity. It does not replace the moving environmental sources. Writing the right target's first displacement as $x$, reflection still gives $d=1+2x$, and the exact separation balance can be organized as

$$
\frac{d'(t)}2=x'(H)+g^2\int_H^t\mathcal Z(v-\beta)\,dv
+\int_H^t\mathcal E(v)\,dv.
$$

Here $\mathcal E$ is the exact signed difference caused by source receiver motion, unequal sampled source times, transmitter and range weights, and the target's scalar first-coordinate receiver term. Its definition and the corresponding acceleration identity are in the supporting analysis. The initial velocity and comparison integral are positive. A bound on the final signed integral that preserves their sign at every intermediate time would establish continued separation through the returned pulse. A negative value of the complete expression establishes approach; an unsuccessful lower bound establishes neither. Section 1.15 resolves this distinction at $g=16$ while enclosing the signed integral over the full coupling range.

The continuation argument also supplies a restricted local existence and uniqueness statement for finitely many disturbed $C^3$ complete histories over this unit-spaced stationary lattice, with a $C^1$ reference receiver field on the displacement ball. Positive range and subunit-speed margins ensure that a sufficiently short next step samples only known history. A common finite starting time for the disturbances makes the receiving set finite on a bounded step, leaving a regular stationary tail and finitely many receiver equations. This includes the present control, with compatible smooth cuts. It does not give evolution on an open neighborhood of the original infinite-population history norm, where independently changed remote histories can defeat summation, and it supplies no singular-boundary or regulator continuation.

### 1.14. Preparation of the supplied history

The smooth two-target control defines a forward initial-history problem. Its complete past is admissible input, but it cannot itself be an unforced solution of the Master Equation before release. The [preparation analysis](analysis/smooth-two-particle-preparation.md), with its [independent assessment](analysis/smooth-two-particle-preparation-independent-adjudication.md), derives two distinct contradictions. These concern the origin of the input and leave the forward theorems intact.

First consider either target during its prescribed pulse. In dimensionless time let $a=-11/8$ and $t=a+v$, $0\le v\le1/4$. Every cross range exceeds $1-2^{-15}>1/4$, so every received source emission precedes $a$. All received source histories are therefore stationary. The target equation reduces exactly to $y''=gS(y)$, with $S(0)=0$ and a locally Lipschitz stationary receiver field. Its prescribed onset has zero position and velocity. Uniqueness makes the stationary trajectory its only regular continuation, whereas the prescribed pulse is nonzero immediately after onset.

The mismatch is quantitative. For $0<v\le1/128$, direct differentiation gives $p''(v)<-8v^2$, while the stationary cubic bound gives $\|gS(p(v)e_3)\|\le22400v^{12}<v^2$. The physical third-component difference between prescribed acceleration and the Master Equation is consequently

$$
\frac{p''(v)-gS_3(p(v)e_3)}{\ell}
<-\frac{7v^2}{\ell}.
$$

Second, keeping the environmental past stationary also conflicts with the old pulse. Choose the environmental receiver at $e_2$ and source zero, with source emission offset $v_*=1/16$. Then $p_*=-81/2^{25}$ and $p_*'=-135/2^{21}$. Put $r_*=(1+p_*^2)^{1/2}$ and $D_*=1+p_*p_*'/r_*$. Reception occurs at the exact negative time $t_*=-21/16+r_*$. The other target's pulse has not yet arrived, and the stationary background cancels. The EOM third acceleration is $gp_*/(\ell r_*^3D_*)<0$, while the prescribed environmental acceleration is zero. Their difference is greater than $g/(2^{20}\ell)$.

Thus imposing motion only on the two targets would already change the environmental history before release. An additive acceleration chosen to cancel these residuals would merely encode the desired trajectories; it supplies no independently derived preparation mechanism. The exact supplied past would require compensating environmental inputs as well. A physically specified preparation must include every participating architrino and its earlier coupled response in the history supplied to the delayed equation.

At release itself, acceleration and jerk match exactly: the distance-one old pulses have finished, and the distance-$\sqrt2$ pulses have not begun reception. Smooth matching at one cut therefore coexists with the earlier contradictions. A different EOM-generated past might reach the same positions and velocities at release, but those instantaneous data would not reproduce this delayed state. The present control establishes a conditional forward response; neither an unforced origin of that exact input nor typical populated-universe behavior follows. Section 1.27 constructs a different, self-consistent complete past approaching rest in the remote past; it does not reproduce this supplied pulse or inherit its event certificate.

### 1.15. Signed reception error and a transient approach

The targets briefly approach at $g=16$, then separate again by the latest pulse-end reception. This derived result follows from the [signed-error analysis](analysis/smooth-two-particle-signed-error.md) and its [independent assessment](analysis/smooth-two-particle-signed-error-independent-adjudication.md). It uses the identical supplied past and accepted forward continuation. The proof includes the actual environmental response, both stages of causal reception, and a finite-amplitude error bound. A positive summed source displacement alone misses the reversal because the target receives the sources at different times and with different weights.

The [motion figures and reading guide](analysis/smooth-two-particle-motion-plots.md) show the exact supplied excursion, common vertical response, magnified target paths, changing separation and the four early sources returning to one target. The displayed future curves are the derived comparisons with their certified errors. Their axis units and distinct source/target time windows are explicit.

Use dimensionless time $t=T/\ell$, target onset $\beta=\sqrt2-3/8$, target offset $u=t-\beta$, and $u_H=17/16-\beta$. Let $x(u;g)$ be the right target's first-coordinate displacement divided by $\ell$, so normalized separation is $d(t)=1+2x(t-\beta;g)$. The comparison interval is $0\le u\le b_t=17/64$. The latest pulse-end reception has dimensionless time $\tau_{\rm end}=\beta+u_{\rm end}$, where

$$
\frac{125}{512}\le u_{\rm end}\le\frac{131}{512}<b_t,
\qquad \beta+b_t<\frac{21}{16}.
$$

All sampled environmental histories remain in their accepted prefix, where the same four sources per target receive only their original old pulse and stationary reference field.

Introduce $\lambda p$ as an auxiliary amplitude for constructing a comparison, with the actual pulse recovered at $\lambda=1$. Matching the canonical source and target equations through amplitude degree two, with zero initial displacements and velocities, defines explicit piecewise polynomials. Write the target first-coordinate comparison as

$$
X(u;g)=g^2X_2(u)+g^3X_3(u)+g^4X_4(u).
$$

The coefficient equations, their zero-initial primitives and their continuation across $u=1/4$ are given explicitly in Sections 2–3 of the signed-error analysis. The $g^2$ term contains the four-source anchor contribution. The $g^3$ and $g^4$ terms also retain environmental receiver motion, source-time shifts and the target's common transverse displacement in the reception weights. They have no general positivity property. Continuing the coefficient curves after $1/4$ preserves their endpoint values and velocities; the actual source endpoint remains determined by its moving causal root.

To compare these polynomials with the exact histories, evaluate their residual in the full Master Equation. Implicit-root differentiation through amplitude order three bounds the omitted terms, including transmitter factors. Piecewise pulse derivatives retain roots crossing the pulse endpoint. Outward-rounded interval arithmetic encloses the residual integrals over the complete amplitude and coupling domains; receiver derivative bounds then propagate those residuals into trajectory errors. The independent assessment reconstructs the coefficients and interval calculation separately. This yields

$$
|x'(u;g)-X'(u;g)|<10^{-11},
\qquad 0\le u\le17/64,\quad 0<g\le16.
$$

The requested signed error integral now has an explicit enclosure. Retain the exact anchor comparison $\mathcal Z$ from Section 1.13, including its moving integration endpoints, and define

$$
\mathcal C(u,g)=X'(u;g)-X'(u_H;g)
-g^2\int_{u_H}^u\mathcal Z(v)\,dv.
$$

Subtracting the two velocity errors in the exact separation balance gives

$$
\left|\int_{17/16}^{\beta+u}\mathcal E(t)\,dt-\mathcal C(u,g)\right|
<2\times10^{-11},
\qquad u_H\le u\le17/64,\quad 0<g\le16.
$$

This bounds the signed error at every intermediate time through the latest pulse-end reception. Its center retains the signed corrections; it does not assume that their integral is positive. The absolute radius becomes too coarse to determine the sign as $g$ tends to zero, so a full coupling-dependent classification remains open.

At $g=16$, a sharper calculation on $0\le u\le3/25$ gives $|x'-X'|<4\times10^{-13}$. Direct polynomial evaluation gives $-3.811\times10^{-12}<X'(3/25;16)<-3.810\times10^{-12}$, hence

$$
-4.211\times10^{-12}<x'(3/25;16)<-3.410\times10^{-12}.
$$

With $c_f=1$, physical separation velocity equals the derivative of normalized separation with respect to $t$. At the physical event

$$
T_*=(\sqrt2-51/200)\ell,
\qquad \frac{d}{dT}\bigl[\ell d(T/\ell)\bigr]<-6.8\times10^{-12}.
$$

Thus the targets approach on an open interval containing $T_*$. Their earlier positive separation velocity implies at least one intervening zero, without locating a unique first zero or proving that every zero is a transverse crossing.

On the entire endpoint enclosure, the polynomial obeys $X'(u;16)>1.9\times10^{-10}$. Applying the uniform velocity error gives

$$
x'(u_{\rm end};16)>1.8\times10^{-10},
\qquad d'(\tau_{\rm end})>3.6\times10^{-10}.
$$

Separation has therefore resumed by the latest reception. This is a reversal of separation velocity within a regular finite evolution interval. It does not establish contact or that separation falls below its initial value; the accepted positive separation and range floors remain intact. An omitted causal-root term, an invalid interval bound or a failed residual propagation would invalidate the corresponding sign conclusion. Section 1.14 separately establishes that the exact input is not an unforced all-past history, so this result carries no typical populated-universe interpretation.

### 1.16. Later environmental returns and repeated vertical turns

The same supplied-history control admits a further continuation through $T=2\ell$ at $g=16$ and $c_f=1$. The [later-continuation derivation](analysis/smooth-two-particle-later-continuation.md) and its [independent assessment](analysis/smooth-two-particle-later-independent-adjudication.md) retain the fixed infinite checkerboard lattice, complete supplied past, stationary block prescription and original regularity class. The proof first sharpens the already evolved environmental source bounds by integrating the old pulse before taking its absolute estimate. Through the source time $33/32$, this gives displacement below $1/60000$ and speed below $1/16000$ in normalized units. Every generated source time received by $t=2$ lies inside that known prefix.

The subsequent receiver bounds are

$$
\|y_i(t)\|<\frac1{30000}+\frac{(t-1)_+^2}{144}<\frac1{128},
\qquad \|y_i'(t)\|<\frac1{32}.
$$

They close the continuation, retain exactly one positive cross root and exclude every positive self root. The infinite stationary field remains in the equations; finite propagation restricts only the changed-history corrections. The interval contains 206 nonconstant environmental histories and the two targets, with 328 entered old-pulse channels and 1,032 generated-history channels. Each target receives 21 distinct environmental source histories containing 25 original-pulse-to-environment-to-target paths. Counting only source identities would miss a second excitation in four reused sources.

The added returning families include each target's own twelve face-diagonal neighbors near $t=2\sqrt2-11/8$, its outward axial neighbor near $13/8$, and additional histories near $\sqrt2+\sqrt3-11/8$. Their acceleration contributions can oppose or reinforce the previously accumulated velocity. A direction change requires their integrated opposition to exceed that velocity; delay alone establishes no restoring or damping sign.

The [later-motion comparisons](analysis/smooth-two-particle-later-motion.md) evaluate these histories in two independently implemented ways: the first two amplitude coefficients of the full equation and a nonlinear moving-root comparison that omits the cubic stationary term. An independently derived exact first-coefficient path sum also checks the shared vertical response. These calculations propose the approximate motion. A subsequent [full-equation certificate](analysis/smooth-two-particle-later-certification.md), with its [independent assessment](analysis/smooth-two-particle-later-certification-independent-adjudication.md), establishes the actual vertical turns by enclosing the acceleration mismatch of continuous polynomial histories against the unmodified equation.

| Enclosed actual time $t$ | Shared height in $10^{-6}\ell$ | Direction change |
| --- | --- | --- |
| $[1545/1024,1547/1024]$ | $[4.59109,4.71167]$ | Upward to downward |
| $[1878/1024,1881/1024]$ | $[-0.428213,-0.307786]$ | Downward to upward |
| $[2019/1024,2024/1024]$ | $[0.980320,1.100902]$ | Upward to downward |

There is exactly one actual turn in each interval, and these are exactly three consecutive turns on $[5/4,2]$. The first downward excursion lies between $4.898880\times10^{-6}\ell$ and $5.139873\times10^{-6}\ell$, while the following rise lies between $1.288107\times10^{-6}\ell$ and $1.529114\times10^{-6}\ell$. Using the same trough in their ratio gives $0.256623<U/D<0.304647<1/3$, where $D$ denotes the downward excursion and $U$ the following upward excursion. This is a derived finite-interval ringing result for the actual equation. At the same horizon the numerical comparison's horizontal separation is still increasing, with excess about $1.33330\times10^{-9}\ell$. That smaller horizontal sign is outside the new certificate's error resolution; a decreasing vertical excursion does not imply decay in every motion component.

The nonlinear comparison's nearest sampled upward-neighbor gap is approximately $0.999993562\ell$; the outward-neighbor gap changes by only about $2.49\times10^{-11}\ell$ at its sampled minimum. Both calculations use simultaneous neighbor and target positions. These numerical minima are distinct from the derived coarse exclusion $r>63\ell/64$, which follows for every initially adjacent pair from the actual continuation's displacement bound.

The certificate defines piecewise quintic paths from exact dyadic nodal positions, velocities and accelerations. Shared nodes give exact $C^2$ joins. Every received causal root and every time-cell acceleration residual is enclosed, including the infinite stationary contribution through $16\|S_0(y)\|\le22400\|y\|^3$. The complete source residual is below $9.471749\times10^{-11}$ and the target residual below $1.539527\times10^{-11}$. The [propagation theorem](analysis/smooth-two-particle-later-residual-propagation.md) includes the earlier errors in all 76 received source histories, their shifted causal times and target feedback; it bounds position, velocity and acceleration errors by $6\times10^{-8}$, $1.2\times10^{-7}$ and $2\times10^{-7}$. Continuous polynomial bounds also establish the required target neighborhood. Opposite endpoint velocity signs and a fixed acceleration sign establish a unique turn inside each window, while continuous signs in every gap establish that the turns are consecutive. Exact rational polynomial bounds supply an independent check of those signs and the excursion inequality. Numerical agreement alone is not used as acceptance evidence.

The residual enclosures and the independent propagation/sign checks are different evidence components. The [review assessment](analysis/lattice-review-integration-2026-10-03.md#independence-and-current-reproduction) records which inputs are shared or replayed and the outstanding current-source reproduction gap; independent assessment does not mean every component was independently recomputed.

These results do not imply eventual settling. Eight later old-pulse return paths per target have not completed their pulse-end receptions at $t=2$. The next section follows those receptions; a longer argument must also control successive excursions and drift, while retaining the preparation limitation of Section 1.14.

### 1.17. Continued descent through the remaining pulse endpoints

The [pulse-end extension](analysis/smooth-two-particle-later-pulse-ends.md), with its [independent assessment](analysis/smooth-two-particle-later-pulse-end-independent-adjudication.md), proves continuation of the same actual infinite-population problem to $H=259/128=2.0234375$. Its continuation and full-equation residual estimates preserve the supplied past, $g=16$, $c_f=1$, the stationary block sum and the original history class. Every received environmental source time remains below $33/32$, so the already evolved source histories suffice on this added interval. The 208 affected histories and all entered channel counts are unchanged.

Each target receives the last eight original-pulse endpoints along two-leg paths whose squared anchor distances are $(2,3)$ or $(3,2)$. For the right target at $e_1$, these paths originate at zero and pass through $j=(0,\pm1,\pm1)$ or $j=(1,\pm1,\pm1)$. The latter four carry the second excitation of previously received sources. The reflected paths reach the left target. There are sixteen directed endpoint receptions in total and no new target source identities.

The anchor endpoint time is $\tau_e=\sqrt2+\sqrt3-9/8$. Allowing motion on both legs gives the actual enclosure

$$
|t_e-\tau_e|<\frac7{120000},\qquad
2.021206036<t_e<2.021322704<H.
$$

These endpoints precede the next entering generated families anywhere in the population. Completing an old-pulse reception does not make its environmental source stationary: the source retains the displacement and velocity accumulated during its earlier excitation and subsequent evolution, and its subsequent emitted history remains part of the Master Equation.

The continuous target approximation appends 24 quintic cells with exact $C^2$ joins to the unchanged certified prefix. Enclosing the complete acceleration residual on all 192 new subcells, including the infinite stationary field, gives a residual below $4.586780\times10^{-12}$. The extended comparison still bounds target position, velocity and acceleration errors by $6\times10^{-8}$, $1.2\times10^{-7}$ and $2\times10^{-7}$. Independent exact rational polynomial bounds then give, for either target's normalized height $z$,

$$
-2.119112\times10^{-6}<z'(t)<-1.748130\times10^{-6}<0,
\qquad 2\le t\le H.
$$

Both targets therefore continue downward through every remaining endpoint. There is no fourth vertical turn by $H$. Integrating the velocity error bounds the added fall more tightly than subtracting two separate position enclosures:

$$
4.300499\times10^{-8}\ell
<\ell\big[z(2)-z(H)\big]
<4.863000\times10^{-8}\ell.
$$

The new downward leg is unfinished at this horizon, so the pulse-end extension supplies no additional completed-excursion ratio. The previous ratio $0.256623<U/D<0.304647$ remains valid. The following section reaches the next vertical minimum while evolving every newly required source history. Eventual settling, drift in other components and typical preparation remain separate unresolved questions; no additional motion law is introduced.

### 1.18. A fourth vertical turn and a smaller completed descent

The [next-minimum analysis](analysis/smooth-two-particle-next-minimum.md), with its [independent assessment](analysis/smooth-two-particle-next-minimum-independent-adjudication.md), establishes actual continuation through $H=9/4$ and a fourth consecutive turn on $[5/4,H]$ of the targets' common vertical coordinate. The same supplied past, infinite alternating cubic lattice, eight-source block sum, $g=16$ and $c_f=1$ remain fixed. Both targets finish their downward excursion and begin rising again. This vertical reversal is distinct from a change in their horizontal separation velocity.

The new receiving stage includes the other target's generated future. Each target receives 26 changed source identities: six unit neighbors, twelve face diagonals and eight body diagonals. The required source prefix through $a_1=41/32$ includes 100 environmental histories and both target histories. The [continuation theorem](analysis/smooth-two-particle-next-minimum-continuation.md) proves that every final receiver root samples this prefix, and every generated root needed to evolve that prefix samples the earlier accepted histories through $a_0=33/32$. The full population has 248 histories that become nonconstant by $H$, with 392 old and 1540 generated directed channels. More remote stationary histories remain in the infinite stationary sum.

The intermediate numerical histories have accepted complete-equation residual enclosures, including the new generated feedback. Independent propagation and continuous sign checks consume those enclosures; they are not separate full residual reconstructions. Their full residual is below $9.471749\times10^{-11}$; the final target residual is below $1.539527\times10^{-11}$. Both include the infinite stationary-field remainder. A three-stage positive integral comparison propagates source position, velocity and emission-time errors, giving uniform target allowances $1.3\times10^{-8}$, $5\times10^{-8}$ and $2\times10^{-7}$ in dimensionless position, velocity and acceleration. The source and target displacement neighborhoods required by that comparison are themselves certified.

Write $m_2$ for the preceding minimum, $M_3$ for the following maximum and $m_4$ for the new minimum. Continuous polynomial bounds and the propagated errors give

$$
\begin{gathered}
\frac{2274}{1024}\le t_4\le\frac{2277}{1024},\\
3.6306106\times10^{-7}<m_4<3.8976381\times10^{-7}.
\end{gathered}
$$

Actual velocity remains negative from the preceding endpoint to this window, crosses zero exactly once inside it, and stays positive afterward through $9/4$. The window's acceleration is strictly positive. Independent exact rational polynomial bounds verify these continuous signs, so the statement does not rest on sampled extrema.

The new fall is $D_4=M_3-m_4$ and the preceding rise is $U=M_3-m_2$. The common maximum cancels: $D_4<U$ is equivalent to $m_4>m_2$. The new minimum is above the lattice plane, while the preceding certified minimum lies below it. The retained enclosures yield

$$
0.4192709<\frac{D_4}{U}<0.5237783.
$$

Thus the enclosed ratio runs from approximately $41.9\%$ to $52.4\%$ of the preceding upward excursion; these rounded percentages describe the display, while the exact bounds above define the enclosure. The finite sequence now contains four consecutive vertical turns on $[5/4,9/4]$ and a second comparison of successively smaller excursions. It supplies no all-time damping law or limiting height, and it preserves the preparation restriction of Section 1.14. A subsequent larger excursion would refute an extrapolation of the pattern, not this finite result.

### 1.19. A later rise exceeds the preceding fall

The [next-maximum investigation](analysis/smooth-two-particle-next-maximum.md), with its [independent adjudication](analysis/smooth-two-particle-next-maximum-independent-adjudication.md), establishes continued upward motion through $H=11/4$ under the unchanged supplied history, lattice, block prescription, $g=16$ and $c_f=1$. The next maximum has not occurred. Nevertheless, the ongoing rise has already exceeded the preceding completed fall. The smaller excursions in Sections 1.16 and 1.18 therefore cannot be extrapolated to a monotonically decreasing sequence.

The [continuation theorem](analysis/smooth-two-particle-next-maximum-continuation.md) evolves the necessary 150 environmental source histories and both targets through $57/32$. Each final target receives 36 changed source identities. Integrating the general vector-source acceleration contributions by parts retains their endpoint terms and propagates separate bounds before and after the earlier certified source cut. This closes actual population continuation without adding a motion law or replacing a needed source future. The complete residual includes the infinite stationary field; its maximum is below $9.471749\times10^{-11}$ for source histories and $7.392321\times10^{-9}$ for the final target. The resulting position and velocity error allowances are $1.2\times10^{-7}$ and $4.4\times10^{-7}$.

Independent exact rational polynomial bounds then give

$$
z'(t)>1.3003342\times10^{-5}\quad(9/4\le t\le11/4),
\qquad
6.8976846\times10^{-5}<z(11/4)<6.9216847\times10^{-5}.
$$

Write $D_4=M_3-m_4$ for the preceding fall and $U(t)=z(t)-m_4$ for the present rise accumulated by time $t$. Their common minimum cancels: $U(t)>D_4$ is equivalent to $z(t)>M_3$. The accepted height already exceeds the preceding maximum, and the correlated ratio obeys

$$
92.9927368<\frac{U(11/4)}{D_4}<116.5460665.
$$

The same independent assessment also accepts the [later full-law extension](analysis/smooth-two-particle-next-maximum.md) through $13/4$. It certifies all 246 environmental source histories and both targets through $73/32$, including both targets' returning effects, and 60 changed source identities per final target. Restarting the population comparison from that complete prefix closes continuation; four-stage error propagation and continuous sign bounds give

$$
\begin{aligned}
z'(t)&>1.0597846\times10^{-4}&& (11/4\le t\le13/4),\\
2.2716913\times10^{-4}&<z(13/4)<3.0916914\times10^{-4},\\
307.3918340&<U(13/4)/D_4<522.8613419.
\end{aligned}
$$

This compares an unfinished rise with a completed fall. It proves neither a fifth turning time nor all-time growth. Extending the same comparison with a uniform source bound is insufficient at $15/4$; the following complete-population restart supplies the stronger estimate. This limitation belongs to the earlier proof estimate. The preparation restriction and distinction between vertical motion and horizontal pair separation remain unchanged.

### 1.20. Continuing from the complete population state

The [population-state certificate](analysis/smooth-two-particle-population-restart.md) and its [source-resolved continuation](analysis/smooth-two-particle-post-restart.md) establish actual complete-population continuation and continued common-height rise through $H=19/4$. The [independent assessment](analysis/smooth-two-particle-class-preserving-independent-adjudication.md) retains the Master Equation, supplied past, infinite alternating cubic lattice, stationary block sum, $g=16$ and $c_f=1$.

The common-time state at $h=13/4$ contains 504 environmental identities and both targets, for 506 histories. Its construction samples only the earlier certified histories through $73/32$, preserves the earlier nodes and includes both targets' returning effects. Continuous full-law residuals and independently propagated errors establish

$$
|y_i(h)|<1/2000,\qquad |y_i'(h)|<1/1000,\qquad |y_i''(h)|<1/100.
$$

The restart retains the complete past of every source. Each source has its own nondecreasing displacement enclosure on successive source-time intervals. Integrating its vector contribution retains both endpoint terms and the lower emission-time primitive. A source that remains stationary contributes zero to the changed-source sum, while its stationary row remains in the original infinite sum.

The stationary contribution can be bounded more sharply by extracting its cubic term. In displacement coordinates,

$$
S_{0,i}(y)=a\left(y_i^3-\frac32 y_i\sum_{j\ne i}y_j^2\right)+R_i(y),
\qquad |R(y)|\le\frac{7995}{(1-B)^7}|y|^5\quad(|y|\le B<1),
$$

where an absolutely convergent coefficient series, a finite outward sum and an explicit infinite tail give $14.2309<a<14.3977$. Cubic symmetry, zero divergence and the accepted vanishing first two derivatives determine the cubic form. The remainder follows from $\|D^5K(x)\|\le29520|x|^{-7}$ and $\sum_{n\ne0}|n|^{-7}<65/2$. This yields $|S_0(y)|<25|y|^3$ on radius $1/64$, and, using the cubic vector's norm bound $|y|^3$, a bound below $50|y|^3$ on radius $1/20$. These estimates retain the original block prescription and introduce no new acceleration term.

The later proof combines direct comparison to complete numerical histories with a short final continuation. It refreshes all 676 affected histories through $15/4$, then all 836 affected histories through $17/4$. Each refresh retains the complete earlier histories and is checked against the full equation. The environmental residual bounds are $5.460740\times10^{-7}$ and $3.077658\times10^{-6}$ respectively; the copied targets have separately certified residuals within the complete-population budget $1/25000$. Propagating source errors as well as these defects proves complete state bounds at $17/4$ of $1/100$ in displacement, $3/100$ in speed and $1/10$ in acceleration.

The final complete-population comparison extends from $17/4$ to $H=19/4$ and includes all 1070 affected identities. Its continuous full-law residual is below $0.001520358$. Receiver sensitivity retains all possible actual channels; the source-error forcing retains the union of those channels and the nonzero numerical-trial channels. This distinction includes small polynomial terms appearing before the exact causal front. Independently propagated errors give displacement below $0.043639265<1/16$, speed below $0.173612594<1$ and acceleration below $0.863730737$. Strict range, root and jerk bounds preserve the original regularity class. The infinite stationary complement remains in the prescribed sum. The same-time distance between any two labels initially one spacing apart exceeds $0.91272\ell$; this conservative population bound does not locate an individual closest approach.

Each target has 130 possible actual changed-source identities on the final interval; its comparison includes four additional numerical-trial terms. The continuous full-law residual on $[9/2,19/4]$ is below $0.000143090753$, including the stationary remainder. Every required source time is below $3.79<17/4$, within the accepted complete histories. Sufficient uniform target error allowances are $0.00344$ in position and $0.0184$ in velocity, giving

$$
\begin{aligned}
z'(t)&>0.0000340325 &&(9/2\le t\le19/4),\\
0.0127854757&<z(19/4)<0.0196654758,\\
17327.7513&<U(19/4)/D_4<33299.2235.
\end{aligned}
$$

The independently accepted acceleration allowance $0.0936$ also gives $0.1216416860<z''(19/4)<0.3088416861$. Together with the earlier continuous signs, this excludes a fifth turn through $19/4$ and establishes positive upward acceleration at the endpoint. The upward excursion remains unfinished. Its much greater accumulated height refutes monotonic shrinkage of subsequent excursions for this preparation, without establishing a future maximum, all-time growth or eventual settling.

### 1.21. Complete-population continuation through five

The [time-dependent continuation](analysis/smooth-two-particle-through-five-continuation.md), with its [independent assessment](analysis/smooth-two-particle-through-five-independent-adjudication.md), extends the same actual solution through $t=5$. The infinite alternating cubic lattice, supplied complete past, $g=16$, $c_f=1$, stationary block prescription and Master Equation remain unchanged. There are 1174 affected identities through this time. The comparison contains all of them, plus 176 allocated environmental histories that remain exactly zero; the infinite stationary complement is still included analytically.

The environmental numerical displacement approaches $0.059305$, leaving only about $0.003195$ below the original class ceiling $1/16$. Closing the proof requires separate source and receiver errors. Starting at the accepted state at $13/4$, the comparison propagates these errors over 112 intervals of length $1/64$. A source error is evaluated at its earlier emission time, and every actual or nonzero trial contribution is retained. On a stopped solution with displacements below $1/16$, every required emission received by $5$ is at most $33/8<17/4$, within the already accepted complete histories.

The stationary field has the same cubic form as in Section 1.20, with the sharper coefficient enclosure $14.3016343017<a<14.3270249269$. A solid-harmonic representation of the infinite remainder gives

$$
|R(y)|<197|y|^5,\qquad
\|DS_0(y)\|\le3(14.3271)|y|^2+983|y|^4
\qquad(|y|\le1/16).
$$

These are bounds on the original sum. The new continuous population residual on $[19/4,5]$ is below $0.004498697$. A sharper earlier target residual is below $1.090401\times10^{-6}$ on $[13/4,15/4]$. Both use the unchanged numerical histories and full acceleration equation. Old supplied-pulse derivatives vanish only where the support and causal range prove that the corresponding reception has already ended or has not yet begun.

The vector acceleration error is bounded by a receiver coefficient times the position error plus the received-source errors and residual. Integrating twice gives a Volterra inequality for the position-error norm. A scalar comparison with positive hyperbolic kernels bounds that integral; the Euclidean error norm itself need not have a classical second derivative. The resulting strict bounds throughout the extension are

$$
|y_i|<0.062304433<1/16,\qquad
|y_i'|<0.177391005<1/2,\qquad
|y_i''|<0.611649869.
$$

The displacement margin exceeds $0.000195567$. Cross ranges exceed $7/8$, causal-root slopes exceed $1/2$, positive own-history roots remain absent, and the independently bounded jerk is below $12481.469<65536$. The original root-complement, density, separation and regularity conditions persist. These margins establish actual continuation; a small residual alone would not suffice.

Independent continuous sign bounds give

$$
\begin{aligned}
z'(t)&>0.0459339318,\qquad z''(t)>0.1925968116 &&(19/4\le t\le5),\\
0.0348881581&<z(5)<0.0411686831,\\
0.1180127268&<z'(5)<0.1530480085,\\
0.3819939490&<z''(5)<0.6116490107,\\
47283.6691&<U(5)/D_4<69710.9690.
\end{aligned}
$$

The [neighbor-distance enclosure](analysis/smooth-two-particle-through-five-history-audit.md) applies the triangle inequality to the individual displacement bounds and includes stationary exterior neighbors. Throughout $[0,5]$, every initially unit-separated lattice-neighbor pair remains more than $0.8825413871\ell$ apart, and the selected pair remains more than $0.9176591506\ell$ apart. The estimate does not locate a closest approach or assert that either lower bound is attained.

The selected pair therefore continues upward and gains upward speed throughout this extension. No fifth turn has occurred, and the upward excursion is still unfinished. The numerical environmental displacement candidate near $5.02206$ remains unproved. The ceiling $1/16$ belongs to the present history class; it is not a collision condition or an added dynamical law. Neither a later maximum, eventual settling nor typical behavior of an independently prepared population follows from this finite fixed-history result.

### 1.22. An environmental displacement boundary precedes the next maximum

The [first-boundary continuation](analysis/smooth-two-particle-first-class-boundary.md), independently assessed in the [event adjudication](analysis/smooth-two-particle-first-class-boundary-independent-adjudication.md), proves that the original environmental displacement ceiling is reached while the selected pair is still rising. Let $\tau$ be the first time any environmental architrino reaches distance $1/16$ from its original anchor. For the same supplied history, infinite alternating lattice, stationary block prescription, $g=16$, $c_f=1$ and unmodified Master Equation,

$$
\frac{5121}{1024}<\tau\le\frac{10339}{2048}.
$$

Both targets satisfy $z'(t)>0.0975220255$ and $z''(t)>0.1323581026$ throughout $[5,\tau]$. The previously accepted signs cover the interval from the fourth minimum to $5$, so no next upward maximum precedes this environmental boundary.

The proof considers the stopped solution through a prospective horizon $H=81/16$. It includes all 1278 identities whose first excitation could occur by $H$, together with the unchanged infinite stationary complement. The number already excited at the unknown $\tau$ is not asserted. Stopping on displacements $1/16$ gives delayed cross ranges at least $7/8$ and source times at most $67/16<17/4$, inside the previously accepted complete population histories. Applying this displacement bound to the targets is an auxiliary restriction that is closed separately, rather than an assumption about their original larger history class.

For a generated source whose displacement and speed are bounded by $b,w$, with intervening range at least $r$, its acceleration contribution minus the stationary reference has norm at most

$$
16\left(\frac{2b}{r^3}+\frac{w}{r^2(1-w)}\right).
$$

Summing the individually bounded sources, including all possible old-pulse receptions and the original stationary field, gives acceleration below $3.262580$. Consequently the entire population stays below speed $0.381303$, and the target displacement norm stays below $0.057141<1/16$. The jerk bound is below $13281.469<65536$. Together with the inherited range and simple-root margins, these estimates exclude earlier speed, target-displacement and regularity obstructions. Strictly subunit motion also excludes positive own-history roots. Initially unit-separated pairs remain at least $7/8$ of a lattice spacing apart at the first boundary.

For the environmental witness anchored at $(-1,0,0)$ and the right target, form quadratic comparison curves from their exact saved endpoint triples at $5$:

$$
\widetilde y(t)=\widetilde y(5)+(t-5)\widetilde y'(5)
+\frac{(t-5)^2}{2}\widetilde y''(5).
$$

These curves have full-law acceleration defects bounded continuously by $0.025802911$ and $0.115937198$ respectively. Every incoming source emission lies within the certified earlier archive. The stationary remainder is bounded on the comparison ball $3/40$, which permits the witness curve to cross the environmental ceiling without changing the actual class being investigated.

Independent receiver and source-error estimates yield positive-kernel comparisons with coefficients $\lambda=(20,38)$ and forcing bounds $q=(0.085,0.18)$. If $P,V$ denote their position and velocity error bounds, the scalar equation $P''=\lambda P+q$ bounds the twice-integrated vector acceleration inequality; no second derivative of the Euclidean error norm is assumed. Under the hypothesis that the solution remains inside every environmental displacement bound, the witness's vertical coordinate exceeds $1/16$ by $10339/2048$. Some environmental boundary must therefore occur first. Conversely, the global acceleration bound keeps every environmental displacement below $0.062479222<1/16$ through $5121/1024$, proving the other end of the event bracket.

The theorem identifies an event of the actual solution, but not its unique first label or an exact crossing time. The numerical candidate near $5.02206$ remains only a narrower search guide. Reaching $1/16$ marks the limit of this small-displacement proof class. It establishes no collision, acceleration singularity or modification of the Master Equation. Continuation beyond that class is established below; the next maximum and any later damping pattern remain unresolved.

### 1.23. Regular continuation through the displacement boundary

The [extended continuation](analysis/smooth-two-particle-beyond-class-boundary.md), with its [independent assessment](analysis/smooth-two-particle-beyond-class-boundary-independent-adjudication.md), proves unique regular evolution of the same population through $H=81/16=5.0625$. This is strictly beyond the first environmental boundary in Section 1.22. The actual solution crosses the former displacement limit without a changed equation, a replacement past or a state update at the crossing.

The mathematical change is to allow displacement up to $B=3/32$ in the local existence argument, then prove a stricter bound on the resulting motion. The earlier stationary-field theorem gives a continuously differentiable field on this larger ball: its remainder series and differentiated series converge uniformly for every $B<1$. The same expressions for the remainder coefficients yield

$$
|R(y)|<198|y|^5,\qquad
\|DR(y)\|<992|y|^4
\qquad(|y|\le3/32).
$$

The enlarged displacement ball leaves every cross range at least $13/16$. Consequently every source time received through $H$ is at most $H-13/16=17/4$, which lies in the already accepted complete history and precedes the restart at $5$. The delayed terms therefore depend on fixed earlier source paths during this short continuation. Their simple causal roots vary smoothly with receiver position, and the acceleration is locally Lipschitz: nearby receiver positions give proportionately nearby acceleration values. Finite-dimensional ordinary differential equation existence and uniqueness apply to all 1278 potentially affected labels. Labels outside this finite causal set retain their stationary solution, with the infinite stationary sum still included analytically.

The original stationary contribution and individually bounded changed rows give a whole-population acceleration bound $A_*=3.962883$. Let $P_0=0.062304432625$ and $V_0=0.177391004262$ be the accepted displacement and speed upper bounds at $5$. For $0\le h=t-5\le1/16$, integration gives

$$
\begin{aligned}
|y_i(t)|&\le P_0+V_0h+\frac12A_*h^2<0.081132<\frac3{32},\\
|y_i'(t)|&\le V_0+A_*h<0.425072<\frac12.
\end{aligned}
$$

Thus neither the displacement nor the speed boundary can terminate the local solution before $H$. Jerk stays below $15939.657<65536$, cross roots remain simple with their retained complement margins, and positive own-history roots remain absent. Smooth joining at $5$ follows because this is an interior cut of the same equation with compatible position, velocity, acceleration and jerk. These strict bounds establish regular continuation across the earlier boundary. They also keep every initially unit-separated pair more than $0.837736$ of a lattice spacing apart.

The two quadratic comparison curves from Section 1.22 and their residuals remain valid. Only the error comparison must be enlarged to cover the possible actual receiver positions. Independent receiver and source bounds permit $(\lambda,q)=(25,23/250)$ for the environmental witness and $(45,47/250)$ for the target in the scalar error equation $P''=\lambda P+q$. At the new endpoint the actual environmental witness satisfies

$$
z_{(-1,0,0)}(81/16)>0.06437605151>1/16.
$$

It has therefore moved outside the old displacement class. The larger existence neighborhood is supported by actual continuation and a verified displacement beyond the previous limit, not merely by relaxing a numerical stopping criterion. Both targets satisfy

$$
z'(t)>0.09526010667,\qquad z''(t)>0.08741526776
\qquad(5\le t\le81/16).
$$

The selected pair continues upward and gains upward speed through this extension. Combined with the preceding sign intervals, this excludes a next vertical maximum through $81/16$. The old displacement ceiling is thus a removable restriction of the earlier proof for this fixed solution. Neither a future maximum nor a long-time growth or damping law follows; those questions require further evolution with the same complete past and full causal-root accounting.

### 1.24. A wake-speed obstruction before the next maximum

The [event certificate](analysis/smooth-two-particle-next-event-continuation.md), with its [independent assessment](analysis/smooth-two-particle-next-event-independent-adjudication.md), proves a first global speed-one event under the identical supplied past and unmodified equation:

$$
\frac{87}{16}<t_*\le\frac{351}{64},
\qquad 5.4375<t_*\le5.484375.
$$

Every path remains below speed $0.948131$ through the lower endpoint. At the upper endpoint, the fixed-history auxiliary solution for the anchor $(-1,0,1)$ has speed greater than $1.0014633$, even after its velocity error is subtracted. The auxiliary equation agrees with the Master Equation before the first global speed-one event, so continuity forces an actual event in the bracket. Both selected targets retain $z_i'(t)>0.1320962439$ throughout $[5,t_*]$. Their preceding accepted rise therefore continues to this event without the next vertical maximum.

These are error-adjusted actual-solution bounds, not trial speeds with one global error subtracted. The adjudication's [continuous comparison](analysis/smooth-two-particle-next-event-independent-adjudication.md#131-continuous-comparison-and-independent-arithmetic) and [event bracket](analysis/smooth-two-particle-next-event-independent-adjudication.md#132-event-bracket-and-no-earlier-target-maximum) propagate receiver-specific position, velocity and acceleration errors over every reception cell; the upper-end witness has certified speed lower bound $1.001463393599$. The target vertical-speed lower bound is a separate component estimate. Those references own the target-specific allowances.

The first actual label is unresolved among twelve possibilities, including both targets. The [numerical comparison](analysis/smooth-two-particle-next-event-evolution.md) suggests four downward-moving environmental anchors $(0,\pm1,1)$ and $(1,\pm1,1)$ near $5.46164723$; that numerical ordering is not promoted to an actual ordering. The continuous certificate instead proves $v_*\cdot a_*>1.4630814180$ for every possible first-event identity. Population displacement stays below $0.265391$ through the forcing endpoint. Consequently all distinct identities remain more than $0.469218$ apart in unit-lattice coordinates. This is a guaranteed lower separation bound, not a measured closest approach; contact does not precede the event.

The [history audit](analysis/smooth-two-particle-next-event-history.md) establishes coverage of all 1502 potentially affected identities through $11/2$, with 1350 retained incoming histories containing every required earlier source. The infinite stationary complement remains in the original block sum. Later numerical curves use an auxiliary equation containing all cross contributions but omitting own-history roots. It equals the unchanged Master Equation before the first actual global speed-one event. Its values after a comparison crossing serve only a stopped error comparison; they are not a proposed continuation that discards newly received self interaction.

The [root-birth theorem](../analysis/smooth-two-particle-next-event-root-birth.md) now applies to the certified event. Let $v_*$ be a first-event unit velocity and $\alpha=v_*\cdot a_*>0$ the rate at which speed increases there. No positive own-history root exists at the endpoint, because all earlier path speeds were strictly smaller than one. A hypothetical $C^3$ extension would immediately create a root of delay $\tau=2h+O(h^2)$ and transmitter denominator $D_t=\alpha h+O(h^2)$, where $h=t-t_*>0$. Its same-identity acceleration contribution would be

$$
A_{\rm self}(t_*+h)=\frac{g v_*}{4\alpha h^3}+O(h^{-2}).
$$

The divergent contribution cannot coexist with a bounded continuous acceleration if the cross contribution stays bounded. At a first global speed event, positive cross separation and finite disturbed-source support ensure that all received cross emissions remain in an earlier compact subunit portion of the histories. Their transmitter denominators remain positive, providing that bounded remainder. The argument applies to curved three-dimensional paths. It excludes the stated smooth continuation, without assuming a universal speed ceiling or deciding every possible nonsmooth continuation.

The [continuous residual](analysis/smooth-two-particle-next-event-residual.md) and trajectory comparison close these event conditions with every generated relationship and the infinite stationary remainder retained. Independently verified earlier time-dependent source errors sharpen the comparison without changing any history. Exact rational error propagation and continuous polynomial signs establish actual arrival and transversality. Every required cross emission remains before $5$; the sharper computed cut before the forcing endpoint is below $4.778039$. Positive range and source-denominator margins exclude an earlier cross-root obstruction.

The incoming solution reaches this endpoint with finite acceleration. The divergent own-history term belongs to a hypothetical smooth extension after it, and prevents that extension from satisfying the unchanged equation. Thus this fixed preparation reaches a genuine obstruction to $C^3$ continuation before the next target maximum. Section 1.25 extends the obstruction to continuous-velocity integral solutions. Singular event continuation, eventual settling and typical populated-universe behavior remain unresolved. In particular, the result retains the supplied-past restriction established in Section 1.14 and does not replace it with an unforced preparation.

### 1.25. The obstruction persists for continuous-velocity integral solutions

The outgoing acceleration need not be continuous for a trajectory to have finite continuous velocity. For example, an acceleration proportional to $t^{-1/2}$ has a finite time integral near zero. A divergence of acceleration alone therefore does not settle whether the first wake-speed event admits a weaker continuation. The [weaker-continuation theorem](../analysis/smooth-two-particle-weaker-continuation.md) and its [independent assessment](../analysis/smooth-two-particle-weaker-continuation-independent-adjudication.md) establish a nonintegrable contribution for any candidate in the following class.

Translate the event to zero. Require position $X$ to be continuously differentiable across it, with $v(0)=e$ and $|e|=1$. Require velocity to be absolutely continuous on every compact interval $[a,b]$ strictly after zero: its change there is the integral of its acceleration. The acceleration may be unbounded or discontinuous, and its integrability at zero is not assumed. The complete ordinary causal-root equation is imposed almost everywhere. The incoming history remains the certified strictly subunit history, with positive endpoint projection $\alpha=e\cdot a(0-)$.

All possible own-history roots at receptions approaching zero must have their emissions approaching zero as well. Earlier chords have a strict subunit margin, and the stationary remote past excludes arbitrarily old roots. Continuity of velocity therefore places every possible recent chord direction in a cone about $e$. Each same-identity row has positive weight, so its projection along $e$ is positive. The cross contribution $R$ remains continuous with $e\cdot R(0)=\alpha>0$. Integrating the projected equation on compact outgoing intervals and taking the continuous endpoint limit yields

$$
e\cdot v(t)\ge1+\frac{\alpha t}{2},
\qquad
e\cdot[X(t)-X(0)]\ge t+\frac{\alpha t^2}{4}>t.
$$

This inequality forces a simple root emitted strictly before the event. For

$$
F(t,s)=|X(t)-X(s)|-(t-s),
$$

one has $F(t,0)>0$ while $F(t,s_0)<0$ for a fixed small $s_0<0$. Strict subunit source speed makes $F(t,s)$ strictly increasing on the negative-emission history. Hence it has exactly one such root $s(t)<0$, with transmitter factor $D=1-n\cdot v(s(t))>0$. Its delay $\delta(t)=t-s(t)$ tends to zero.

Implicit differentiation of this one branch gives

$$
\delta'(t)=\frac{n\cdot[v(t)-v(s(t))]}{D},
\qquad
|A_s(t)|=\frac{g}{\delta(t)^2D}.
$$

If $M$ bounds source and receiver velocity in a short interval straddling the event and the cone is chosen so that $e\cdot n\ge1/2$, then

$$
\left|\frac{d}{dt}\frac1\delta\right|
\le\frac{2M}{g}|A_s|,
\qquad
\frac12|A_s|\le e\cdot v'-e\cdot R.
$$

For fixed $b>0$ these inequalities imply

$$
\frac{g}{4M}\left|\frac1{\delta(a)}-\frac1{\delta(b)}\right|
\le e\cdot[v(b)-v(a)]-\int_a^b e\cdot R(t)\,dt
\qquad(0<a<b).
$$

The left side diverges as $a\downarrow0$; the right side has a finite limit. This contradiction excludes the candidate continuation. It requires neither a future Taylor expansion nor a prescribed rate of root birth. A second proof uses the incoming chord deficit to obtain $e\cdot A_s(t)\ge k/t$ for some $k>0$. An everywhere classical outgoing equation is also excluded without an absolute-continuity premise: the mean value theorem applied to $e\cdot v(t)-k\log t$ contradicts its finite endpoint limit.

For the infinite lattice, boundedness of the cross field requires an explicit population neighborhood. Retain the original stationary summation and a uniform displacement bound $|y_i|<7/20$ for every label near the event. Continuity of the population positions in the supremum norm supplies this neighborhood from the certified endpoint bound below $0.265391$. Distinct-label ranges exceed or equal $3/10$, so receptions within $3/20$ after the event sample only emissions at least $3/20$ before it. The cross field uses fixed earlier smooth histories and a regular stationary complement; it is consequently continuous. The argument needs neither a uniform outgoing population-speed bound nor finite future disturbed support. Coordinatewise continuity without any common position neighborhood is a different population class.

The result is a derived nonexistence theorem for this fixed preparation and the stated integral class. It is stronger than the earlier $C^3$ obstruction. A velocity jump or a continuous singular variation would require a separately defined reception-time acceleration measure; the ordinary equation imposed only on an almost-everywhere derivative does not determine that missing component. No generalized event rule is selected by this theorem, and no conclusion about eventual damping follows without an admitted all-time continuation.

The [domain audit](../analysis/smooth-two-particle-weaker-continuation-domain.md#a-finite-jump-to-a-strictly-superunit-right-velocity-is-still-excluded) further excludes a finite jump to an outgoing velocity limit $w$ with $|w|>1$, under locally absolutely continuous outgoing velocity and bounded cross contribution. The negative-emission root still exists, and entirely outgoing chords have length greater than their delay, leaving no additional self row to cancel it. Its direction tends to one point in the finite intersection of the segment $[e,w]$ with the unit sphere. Projection along that limiting direction and the reciprocal-delay identity reproduce the divergent-integral contradiction. An assigned finite velocity change at the event cannot balance that divergence afterward.

A subunit outgoing limit instead gives no nearby self roots and no velocity atom from the bounded ordinary acceleration. A nonzero jump would therefore require a singular event measure derived separately from the history interaction. A unit outgoing limit in a changed direction is outside this ordinary-equation exclusion; Section 1.26 addresses it within a direct measure interpretation. The ordinary positive-range fold theorem supplies neither a nonzero atomic velocity change nor an extension through vanishing self range. These distinctions preserve the gap between ruling out ordinary integral solutions and ruling out every possible generalized event formulation.

### 1.26. The direct history measure supplies no finite event impulse

An instantaneous velocity change requires more than a large acceleration. An acceleration measure assigns a vector velocity change to each time interval; a nonzero amount concentrated at one time is called an atom. For a velocity $v$ of bounded variation, the sum of the magnitudes of its changes over arbitrary time partitions is bounded. Its distributional derivative $Dv$ is then a finite vector measure, and an event atom equals the jump $v(0+)-v(0-)$. This class includes ordinary acceleration, finite jumps and singular continuous changes that an almost-everywhere derivative does not record.

The [event-measure analysis](../analysis/smooth-two-particle-event-measure.md), with its [independent assessment](../analysis/smooth-two-particle-event-measure-independent-adjudication.md), tests a direct measure interpretation of the unchanged history integral. Translate the certified event to zero. For one first-event identity define

$$
\Gamma=\{(t,s):s<t,\ |X(t)-X(s)|=t-s\},
\qquad \pi(t,s)=t.
$$

The set $\Gamma$ contains the positive-delay geometric incidences. Let $\nu$ be a nonnegative scalar measure carried by this set, with direction $n=[X(t)-X(s)]/(t-s)$. On every simple graph emitted from the fixed smooth past, including graphs obtained by composing the smooth source root map with a locally Lipschitz receiver, retain the canonical weight

$$
d\nu(t,s(t))=\frac{g}{(t-s(t))^2|1-n\cdot v(s(t))|}\,dt.
$$

The same-identity acceleration measure assigns each contribution to its reception time:

$$
\mu_{\rm self}(E)=\int_{\Gamma\cap\pi^{-1}(E)}n\,d\nu,
\qquad Dv=R(t)\,dt+\mu_{\rm self}.
$$

Here $E$ is a reception-time set and $R$ is the complete cross contribution. Require finite scalar weight over compact reception intervals containing the event, and add no measure on the excluded diagonal. These are explicit interpretation hypotheses. The formal delta expression is not assumed to define a measure on every degenerate or nonsmooth history. The theorem also allows additional positive contributions on singular incidences wherever a measure with those properties can be defined.

The first decisive fact is independent of the proposed outgoing velocity. Every earlier self chord satisfies

$$
|X(0)-X(s)|<-s\qquad(s<0).
$$

There is therefore no point of $\Gamma$ with reception time zero. Its entire event fiber is empty, giving

$$
\mu_{\rm self}(\{0\})=0.
$$

The bounded cross density also has zero atom. The measure equation consequently requires $v(0+)=v(0-)=e$, with $|e|=1$. This proves that the direct positive-delay measure supplies no nonzero instantaneous jump. It does not construct a continuation with zero jump.

In fact, no bounded-variation continuation can satisfy this measure equation. The matching velocity traces place all sufficiently recent chord directions in a common cone, $e\cdot n\ge1/2$. Positivity of the self measure and the incoming cross projection $\alpha=e\cdot R(0)>0$ yield

$$
D(e\cdot v)\ge\frac{\alpha}{2}\,dt,
\qquad
e\cdot[X(t)-X(0)]\ge t+\frac{\alpha t^2}{4}>t.
$$

Thus there is a unique simple root emitted strictly before zero, with delay $\delta(t)\to0$. Although the receiver velocity may have jumps or singular continuous variation, its position is Lipschitz. The fixed smooth source and positive transmitter margin make the selected root Lipschitz on every compact outgoing interval. The reciprocal-delay identity therefore holds almost everywhere and can be integrated:

$$
(e\cdot\mu_{\rm self})([a,b])
\ge\frac{g}{4M}
\left|\frac1{\delta(a)}-\frac1{\delta(b)}\right|,
\qquad 0<a<b,
$$

where $M$ bounds incoming and outgoing velocity near zero. For fixed $b$, the right side diverges as $a\downarrow0$. This contradicts finite reception weight and finite velocity variation. The result extends Section 1.25 by controlling singular velocity changes through a full measure equation, without assuming absolute continuity on outgoing intervals.

The population qualification remains explicit. In the same uniform displacement neighborhood of radius $7/20$, every cross range is at least $3/10$. Sufficiently early outgoing receptions use only fixed smooth pre-event sources and the original regular stationary sum. Hence the complete cross contribution remains the bounded continuous density used above. The theorem does not cover an uncontrolled coordinatewise continuation of infinitely many paths.

A fixed-path cutoff cannot turn the contradiction into a finite impulse. Restricting the same incidence measure to delays at least $\varepsilon$ gives nested positive pieces. If their reception weight is finite, cutoff removal converges to the same direct measure with zero event atom; if the positive weight diverges near zero, there is no finite positive measure limit there. Infinite positive accumulation is not a finite point contribution.

The [domain audit](../analysis/smooth-two-particle-event-measure-domain.md) distinguishes this conclusion from limits in which the histories or regularization change. Such measures can concentrate at a boundary, even when each approximant has no atom. Regular-chart agreement alone does not determine that concentration, its direction or its effect on the coupled paths. Appending a vector multiple of a reception-time delta formally leaves off-event data unchanged, but supplies extra boundary data and proves no solution of the full history equation. A uniquely derived varying-history limit remains a separate theorem target. The direct integral investigated here supplies neither a finite event impulse nor an outgoing bounded-variation solution.

### 1.27. Self-consistent incoming growth and its stability consequence

The preparation failure in Section 1.14 leaves a different possibility: motion that tends to rest as time tends to minus infinity while remaining nonzero at every finite time. The [incoming-history construction](analysis/smooth-two-particle-incoming-reachability.md), with its [independent assessment](analysis/smooth-two-particle-incoming-reachability-independent-adjudication.md), establishes such complete histories under the unchanged Master Equation. The result retains the unit cubic lattice, alternating polarity, original eight-source block prescription, $g=16$ and $c_f=1$. Its claim grade is derived. It is an exact nonlinear existence theorem, rather than a prescribed trajectory or a simulation.

In this motion the two polarity sublattices move oppositely along a lattice axis:

$$
X_i(t)=i+\sigma_i q(t)e_3,
\qquad \sigma_i=(-1)^{i_1+i_2+i_3},\qquad t\le0.
$$

Every architrino moves, and every delayed source contribution remains in its equation. Translation and inversion symmetry reduce the unknown histories to the scalar function $q$. They do not replace the population by two architrinos. This pattern also differs from the old pulse, which moved two selected labels in the same vertical direction.

For a small complete history, all speeds are below one and all distinct labels remain separated. Each cross channel consequently has one simple positive-delay root; every self channel is empty. The full acceleration is the accepted stationary receiver field plus the actual correction from every moving source. If $q$ and its derivatives decay as $e^{\lambda t}$ in the past, a source at anchor distance $r$ is sampled at a time no later than $t-r+2b$, where $b$ bounds all displacements. Its correction is bounded by a constant times $e^{\lambda t-\lambda r}(r^{-3}+r^{-2})$. This makes the changing-source series absolutely convergent while preserving the original stationary block sum. The [domain analysis](analysis/smooth-two-particle-incoming-reachability-domain.md) verifies this infinite-population reduction and its complete roots.

Linearization is taken at the already verified resting equilibrium. Its stationary receiver derivative is zero. The source displacement terms cancel on each complete cubic shell, whereas the transmitter-velocity terms give

$$
h''(t)=\frac g3\sum_{d\ne0}\frac{h'(t-|d|)}{|d|^2}.
$$

An exponential $h(t)=ae^{\lambda t}$ therefore requires

$$
\lambda=\frac g3\sum_{d\ne0}\frac{e^{-\lambda|d|}}{|d|^2}.
$$

The right side is positive and strictly decreasing in $\lambda>0$, whereas the left side increases. There is exactly one positive root, with $2<\lambda<4$ at $g=16$. This linear mode identifies growth from the remote past; nonlinear existence requires the next step.

The [general spatial-mode derivation](analysis/checkerboard-linear-wavevectors.md) proves a unique positive staggered rate for every $g>0$, an open wavevector band of positive real growth roots, and complete ancient solutions of the linearized equation with spatial tails decaying faster than any power. It uses a matrix contour construction to avoid assuming smooth individual eigenvectors at the threefold staggered root. This new derivation has been self-reviewed, with the displayed scalar equation as its analytical control; separate mathematical adjudication remains outstanding. It supplies localized linear seeds, not an exact nonlinear localized preparation or a nonlinear instability theorem at every coupling.

The exact nonlinear acceleration differs from this linear operator by a quadratically small remainder with a controlled Lipschitz bound. A convergent iteration on complete past functions gives, for every $0<a\le1/2000000$, an actual solution with

$$
\left|q^{(k)}(t)-\lambda^kae^{\lambda t}\right|
\le(2\lambda)^k\,150000a^2e^{2\lambda t},
\qquad k=0,1,2,\quad t\le0.
$$

The proof controls the correction in a weighted $C^2$ norm, rather than solving the delay equation backward from an endpoint. Its integrated linear operator has norm below $1/2$ on the faster-decaying correction, and the nonlinear estimate closes the stated correction ball. Differentiation of the convergent acceleration series supplies the third derivative and the original complete-history regularity bounds. In particular, $q$, $q'$ and $q''$ are positive on this axial branch. The equation holds at every finite past time; there is no finite onset at which an imposed kick is hidden.

This supplies a precise nonlinear instability statement. Measure a complete history through a cut $T$ by

$$
\mathcal H_T=\sup_{i,s\le T}|X_i(s)-i|
+\sup_{i,s\le T}|X_i'(s)|.
$$

Fix any one nonzero branch just constructed. Then $\mathcal H_T\to0$ as $T\to-\infty$, but $q(0)\ge a/2$. For every initial-history tolerance, a sufficiently early cut gives a self-consistent past within that tolerance whose exact future reaches this same fixed small displacement. Time translation makes that cut the new release time. Hence the property that all sufficiently small histories remain in every fixed uniform neighborhood of rest fails in any admitted class containing these coherent histories and their translations. This conclusion concerns the uniform complete-history norm and infinitely many coordinated labels. It does not establish instability under finite-support disturbances, typicality or unbounded growth.

The local construction has speeds far below one. Positive small-amplitude acceleration cannot simply be extrapolated: individual geometric contributions from delayed source displacement have opposite signs in axial and transverse directions. Section 1.28 supplies the separate complete-sum comparison needed to continue this branch to wake speed. The old pulse's event time and finite source census supply no certificate for that new arrival. The domain analysis identifies the corresponding obstruction hypotheses: a complete incoming displacement bound below $1/2$, a finite positive transverse acceleration trace, and a proposed outgoing population within a uniform anchor neighborhood of radius below $1/2$. The complete-prefix bound controls cross-time ranges; equal-time separation alone does not replace it.

### 1.28. A self-consistent past reaches a transverse first wake-speed event

The [first-event proof](analysis/staggered-lattice-first-event.md), with its [independent assessment](analysis/staggered-lattice-first-event-independent-adjudication.md), continues the axial branch from Section 1.27 under the unchanged Master Equation. Fix its ancient leading amplitude at $a=2^{-40}$. This identifies a time origin; it does not add an external acceleration or substitute a new past. The exact characteristic root and the nonlinear ancient correction are both retained. The population still consists of one architrino at every integer cubic anchor with alternating polarity, $g=16$, $c_f=1$ and the original eight-source block sum.

**Claim grade: derived with an independently checked interval certificate.** The first speed-one time satisfies

$$
\frac{1191}{128}<t_*\le\frac{1193}{128}.
$$

Every label reaches this event simultaneously, with velocity $\sigma_i e_3$. No earlier reversal occurs. The displacement and incoming acceleration satisfy

$$
0.2207234700<q(t_*)<0.2455541486,
\qquad
5.9711295686<q''(t_*^-)<8.075038970.
$$

The nearest simultaneous opposite-polarity separation is $1-2q$, so it exceeds $0.5088917028$ at arrival. The complete prefix also keeps cross ranges above $0.7294887052$ and transmitter denominators above $0.9287873355$. Thus the speed-one boundary occurs while distinct architrinos remain separated and their received source histories remain regular.

The analytical continuation argument first excludes contact as an earlier finite boundary. While $0<q<1/2$ and $0<q'<1$, only the approaching axial opposite-polarity partner can have causal range below one. Its delay $\delta$ and positive acceleration obey

$$
\delta=1-q(t)-q(t-\delta),\qquad
A_+(t)=\frac{16}{\delta^2[1-q'(t-\delta)]}
\ge8\left(\frac1\delta\right)'.
$$

Every other row samples a source at least one time unit earlier. Its signed remainder is bounded near a finite prospective endpoint, including the exponentially decaying distant tail. A contact limit would require $\delta\downarrow0$ and hence unbounded integrated positive acceleration, contradicting incoming speed bounded by one. Local receiver evolution and the infinite-tail bounds also give continuation within each compact subunit, separated part of the branch.

The actual event requires more than this barrier. A [scalar numerical comparison](analysis/staggered-lattice-first-event-evolution.md) locates a candidate, while the [continuous residual calculation](analysis/staggered-lattice-first-event-residual.md) encloses its full equation defect. Exact scalar orbit multiplicities represent 24,388 finite source offsets in 3,073 groups; analytical tails retain the infinite complement. The stationary contribution is the original full block sum, enclosed using immutable independent coefficients and remainders. Exact polynomial reconstruction controls times between saved samples. None of these steps treats a finite bare lattice as the full population.

The trajectory comparison propagates the ancient nonlinear correction, the exact characteristic-rate uncertainty and each continuous residual bound. It preserves the shell cancellations in the linear operator of Section 1.27, then bounds the nonlinear difference using complete delayed source intervals and the signed total receiver derivative. Positive integrated scalar majorants close every provisional displacement-error neighborhood. Independent exact-rational replay verifies all 658 final updates and their continuous sign intervals. The first coarse enclosure fell slightly short of forcing an event; refining only the final reception cells closed it without changing the reference history or equation.

The comparison remains within $|q|<1/4$, keeps velocity positive, and excludes speed one through $1191/128$. If no event had occurred by $1193/128$, the lower velocity bound there would exceed $1.0211550976$, a contradiction. The lower incoming acceleration bound above makes the first arrival transverse. The reference's short mathematical extension uses the auxiliary cross-source equation only; it is not a full-law path beyond the actual first event.

The preceding continuation obstruction therefore applies to a genuinely self-consistent past. To check the population premise, consider any proposed outgoing history staying within $B=1/3$ of every anchor. The entire incoming prefix already lies inside that ball. Every distinct-label cross range is at least $1/3$, so receptions earlier than $t_*+1/6$ can use only sources earlier than $t_*-1/6$. That earlier staggered prefix has a uniform speed margin below one. Its recent part is regular and its remote source corrections retain exponential decay, giving a bounded continuous complete cross contribution. The incoming own-root fiber is empty, and the acceleration trace is finite and strictly positive along the velocity.

One step of the earlier self-root localization used an exactly stationary remote past. The bounded ancient branch supplies the necessary extension: an outgoing receiver inside the $1/3$ ball and an incoming position inside the proved $0.24556$ ball have an own-history chord shorter than $2/3$. Sufficiently old delays exceed that uniform chord bound and cannot be roots. Together with strict subunit motion on each earlier compact interval, this excludes remote own roots just as required by the localization argument. The independent assessment proves this replacement explicitly.

These bounds yield the exclusion of $C^3$ continuation and extend the weaker arguments to finite continuous velocity with locally absolutely continuous outgoing velocity, and bounded-variation velocity under the stated locally finite direct positive history-measure interpretation. No finite event update or varying-history singular limit is selected. The obstruction is reached before any reversal or decay; no later ringing or settling follows from the unchanged evolution in these classes.

This result removes the supplied-preparation objection for the particular coherent branch. It does not establish typicality or the fate of a spatially localized disturbance. The exact resting lattice remains an equilibrium, while the complete-history instability proved in Section 1.27 now has an event-reaching realization.

### 1.29. The collective displacement equation and its singular boundary

The staggered motion preserves the internal spacing of each polarity sublattice while changing the relation between the two groups. Every positive architrino moves upward by the same displacement $q(t)$, and every negative architrino moves downward by that amount. Their equal velocities keep relative positions fixed, and symmetry preserves those equal velocities through equal accelerations. The common acceleration need not vanish.

The distinction between current geometry and received geometry is essential. A positive architrino and two positive neighbors on opposite sides can occupy the same height at reception. The received wakes were emitted when both neighbors were lower. Their horizontal contributions cancel, while their upward components add. A stationary picture of the present positions therefore misses part of the acceleration, even when each sublattice retains its shape.

#### The equation for the common displacement

Use unit lattice spacing, normalized wake speed $c_f=1$ and the fixed acceleration coupling $g=16$. For labels $i\in\mathbb Z^3$, let $\sigma_i=(-1)^{i_1+i_2+i_3}$ denote polarity. The complete population is

$$
\mathbf X_i(t)=i+\sigma_iq(t)e_3,
$$

where $e_3$ is the upward unit vector. The scalar $q$ specifies infinitely many trajectories because the spatial pattern repeats exactly. This reduction imposes no mechanical constraint on the architrinos; the full equation preserves the symmetry of the complete incoming history.

For a positive receiver, write the source offset as $d=i-j=(d_1,d_2,m)$, put $p=d_1^2+d_2^2$, and let $\sigma_d=(-1)^{d_1+d_2+m}$. Same-polarity sources have $\sigma_d=+1$; opposite-polarity sources have $\sigma_d=-1$. Before the first wake-speed event, every distinct source has one emission time $s_d<t$ satisfying

$$
r_d=t-s_d=\sqrt{p+z_d^2},\qquad
z_d=m+q(t)-\sigma_dq(s_d),\qquad
D_d=1-\sigma_d\frac{z_d}{r_d}q'(s_d)>0.
$$

Here $z_d$ is the vertical component of the received separation, $r_d$ is both its length and its travel time, and $D_d$ is the source-velocity factor in the acceleration weight. A source in another column has $p>0$. Its horizontal distance remains in both the travel time and the vertical acceleration even though reflection cancels the total horizontal acceleration.

The exact displacement equation on this incoming branch is

$$
\boxed{q''(t)=gS(q(t))+C_+[q](t)+C_-[q](t),}
$$

$$
C_\pm[q](t)=g\sum_{\substack{d\ne0\\\sigma_d=\pm1}}
\sigma_d\left[
\frac{z_d}{r_d^3D_d}
-\frac{m+q(t)}{[p+(m+q(t))^2]^{3/2}}
\right].
$$

The stationary term $S(q)$ is the axial acceleration kernel of the original alternating anchor population evaluated at the displaced receiver, with its original eight-source block prescription. Each bracket subtracts that stationary source contribution and replaces it by the actual received contribution. Thus $C_+$ and $C_-$ measure the corrections due to same-polarity and opposite-polarity source motion. Each correction sum converges absolutely because distant emissions come from the exponentially small ancient disturbance. The stationary term retains its specified grouping. These definitions do not independently reorder two infinite nonneutral source populations.

All three terms are needed: the stationary reference alone is not the moving lattice, and a correction alone is not the complete acceleration from one polarity. This is an exact decomposition of the unchanged equation, rather than a new interaction rule. There are no positive-delay own receptions on the incoming subunit history. At a later root change, any newly admitted own reception must be included; the displayed equation cannot simply be extrapolated with that channel omitted.

The equation is scalar but depends on history. Knowing the present $q$ and $q'$ does not specify $q(s_d)$ or $q'(s_d)$ at all the received emission times. Consequently it is not an ordinary equation $q''=A(q)$ derived from a displacement-only curve. A plot along this particular branch can express its acceleration against displacement, but that plot does not define the law for other histories.

#### How the disturbance initially grows

The stationary lattice is an exact equilibrium and its stationary receiver term has zero first derivative. Let $h(t)$ be a small vertical displacement history decaying exponentially into the past. Linearizing the changing-source terms about rest gives

$$
DC_\pm[0]h(t)=\frac g3
\sum_{\substack{d\ne0\\\sigma_d=\pm1}}
\frac{h'(t-|d|)}{|d|^2}.
$$

The notation $DC_\pm[0]h$ means the first-order response of the corresponding correction to $h$. To see why only delayed velocity remains, group offsets at each fixed distance. The lattice has cubic symmetry, so their source-position derivatives cancel and their squared vertical direction components average to one third. Every fixed-distance shell has one parity, since $|d|^2$ and $d_1+d_2+d_3$ have the same parity. The cancellation therefore holds separately within each polarity subset.

Both corrections are positive for the growing mode $h(t)=a e^{\lambda t}$ with $a>0$ and $\lambda>0$. Same-polarity repulsion consequently participates in the initial collective growth. Summing the two subsets gives the characteristic equation

$$
\lambda=\frac g3\sum_{d\ne0}\frac{e^{-\lambda|d|}}{|d|^2}.
$$

This growth rate follows from all the three-dimensional source distances and their multiplicities. One displacement coordinate does not make the population equivalent to the collinear binary. The latter shares the local own-history mechanism at wake-speed arrival, while the lattice retains acceleration from every other column.

#### Separating the complete polarity contributions

To assign the complete acceleration to the two source polarities, the stationary term must also be separated. Use the same expanding cubes centered on the receiver's anchor for both groups. Their combined limit equals the original stationary block sum. Define

$$
S_\pm(u)=\lim_{N\to\infty}
\sum_{\substack{0<|d|_\infty\le N\\\sigma_d=\pm1}}
\sigma_d\frac{d_3+u}{|d+ue_3|^3},
\qquad
A_{\rm same}=gS_+(q)+C_+[q],\qquad
A_{\rm opposite}=gS_-(q)+C_-[q].
$$

Here $|d|_\infty$ is the largest absolute coordinate of the source offset. The sums use a common spatial convention; they do not assert that either charged sublattice can be summed in arbitrary order. Their existence follows by subtracting each row's Taylor terms through quadratic order. The constant and quadratic sums cancel by inversion, and the linear sum cancels by cubic symmetry. The remaining terms have absolute size bounded by a constant times $|u|^3|d|^{-5}$, whose sum converges. Thus $S_++S_-=S$, and the incoming equation is also $q''=A_{\rm same}+A_{\rm opposite}$. The [displacement derivation](analysis/staggered-lattice-displacement-equation.md#5-an-optional-complete-polarity-allocation-with-a-specified-cutoff) gives the proof and explicit finite-sum remainder.

The [contribution evaluation](analysis/staggered-lattice-acceleration-decomposition.md) applies this decomposition to the existing certified history. It encloses the actual receiver displacement, each earlier source history, the shifts of the causal roots and the infinite tails. It does not integrate a new trajectory. **Claim grade: derived interval bounds, with a [separate analytical and numerical assessment](analysis/staggered-lattice-decomposition-independent-assessment.md).** The following bounds use normalized acceleration units and are rounded outward. They apply at the listed times and at the unknown incoming event time $t_*$. Their widths express uncertainty in the bounds, not differing motions among members of one sublattice.

| Time | Displacement $q$ | Speed $q'$ | Same-polarity acceleration | Opposite-polarity acceleration |
| --- | --- | --- | --- | --- |
| $8$ | $[0.004648,0.004717]$ | $[0.01299,0.01320]$ | $[0.008668,0.008938]$ | $[0.02725,0.02840]$ |
| $9$ | $[0.07863,0.08044]$ | $[0.2353,0.2431]$ | $[0.1471,0.1572]$ | $[0.6365,0.6943]$ |
| $9.25$ | $[0.1779,0.1840]$ | $[0.6650,0.7013]$ | $[0.3570,0.4143]$ | $[3.120,3.648]$ |
| $9.3046875$ | $[0.2207,0.2294]$ | $[0.9193,0.9837]$ | $[0.4727,0.5735]$ | $[5.284,6.446]$ |
| $t_*$ | $[0.2205,0.2456]$ | $1$ | $[0.4581,0.6567]$ | $[5.135,7.965]$ |

Both polarity groups contribute acceleration in the direction of motion at every listed reception and at the event. For a negative receiver, the corresponding acceleration points downward. In the small-amplitude limit the same-polarity share is approximately $24.0595\%$ and the opposite-polarity share $75.9405\%$. At first wake-speed arrival, the complete same-polarity share lies within $[5.4\%,11.4\%]$ and the opposite-polarity share within $[88.6\%,94.6\%]$. These fractions use the common centered-cube allocation just defined. They establish a substantially greater opposite-polarity share near the event; they do not establish monotonic change of the share at every intermediate time.

The developing geometry explains why the opposite group becomes important. The nearest opposite-polarity neighbor ahead of a positive receiver is approaching it. Its received delay satisfies $\delta=1-q(t)-q(t-\delta)$ and its positive axial contribution is $g/[\delta^2(1-q'(t-\delta))]$. Increasing displacement reduces this received range, while increasing source speed increases the transmitter weight. Other source rows remain in the complete sum and can have different signs; the enclosed totals, rather than that one neighbor alone, establish the polarity allocation.

The reference decomposition supplies an additional useful distinction at the event: $gS$ lies in $[2.517,3.497]$, $C_+$ in $[0.2971,0.4045]$ and $C_-$ in $[2.832,4.656]$. The stationary reference is therefore substantial by then, even though it contributes only at cubic order near rest. It is a term in an exact rearrangement of the moving-source law, not an externally held stationary environment. The full same-polarity values in the table include its same-polarity stationary share and should not be identified with $C_+$ alone.

The numerical assessment reconstructs source polynomials, roots and source sums separately from the evaluator, while the analytical check verifies the inherited error bounds, summation convention and new stationary-sector remainder. An omitted source or tail, incorrect polarity, underestimated history error or inward-rounded interval would invalidate the corresponding allocation. The narrower total event-acceleration bound in Section 1.28 remains in force; the separate component bounds need not reproduce its width when added without their correlations.

#### Regular reception and the boundary of continuation

The cross-source part of the equation is regular along the certified incoming motion. Differentiating its implicit source-time equation gives

$$
\frac{ds_d}{dt}
=\frac{1-(z_d/r_d)q'(t)}{D_d}.
$$

The denominator uses the earlier source velocity; the numerator uses the present receiver velocity. A zero numerator can stop source-time playback without making the acceleration singular. A zero denominator is a different event: it destroys the simple-root condition used in the per-hit formula. Vanishing causal range is another distinct singularity. On the certified prefix, every cross range stays above $0.7294887052$ and every cross denominator above $0.9287873355$. None of those cross-source singularities causes the first event.

At the first event, displacement and velocity have finite incoming limits, $q(t_*)=q_*$ and $q'(t_*)=1$, and the incoming acceleration $\alpha=q''(t_*^-)$ is finite and positive. There is no positive-delay own reception at $t_*$: every earlier own chord is shorter than its elapsed time. The diagonal at zero delay remains excluded.

To test smooth continuation, suppose a $C^3$ extension existed, and let $h=t-t_*>0$ be its elapsed reception time. A newborn own delay $\delta=t-s>0$ would satisfy

$$
q(t)-q(t-\delta)=\delta.
$$

Expanding the average velocity along this chord around the event gives

$$
1+\alpha\left(h-\frac\delta2\right)
+O\big((|h|+|\delta|)^2\big)=1.
$$

Because $\alpha>0$, the new root has $\delta=2h+O(h^2)$ and emission time $s=t_*-h+O(h^2)$. Its source factor is $1-q'(s)=\alpha h+O(h^2)$. The own-history acceleration therefore has the leading behavior

$$
A_{\mathrm{own}}(t_*+h)
=\frac{g}{\delta^2|1-q'(s)|}
=\frac{g}{4\alpha h^3}+O(h^{-2}).
$$

The coefficient is positive. The received range shrinks linearly with elapsed time, contributing two inverse powers, while the source factor contributes a third. The resulting acceleration is nonintegrable at the endpoint. The complete cross contribution remains bounded under the outgoing population neighborhood stated in Section 1.28, so it cannot cancel this term.

This calculation contradicts the assumed smooth extension. It does not describe an actual outgoing acceleration curve or assign an infinite velocity to an existing solution. The direct history-measure result in Section 1.26 also supplies no finite event impulse, and the bounded-ancient-history extension in Section 1.28 makes that exclusion applicable here. A jump in velocity, a bounce, or a later oscillation therefore cannot be inferred from the singularity.

The established boundary is a loss of continuation of the equation in the specified classes. The incoming displacement does not jump; the incoming velocity reaches one continuously; the incoming acceleration stays finite. What changes is the causal-root structure required by a proposed continuation. Claim grade: derived, conditional on the exact incoming branch and the stated bounded cross-history neighborhood. An admitted unchanged-law continuation satisfying those premises, a failure of the own-root expansion, or an omitted unbounded opposing contribution would defeat the corresponding obstruction.

## 2. Cubic backgrounds: exact facts and finite failures

### 2.1. Stationary inversion cancellation

The [cubic-lattice analysis](analysis/f6c-cubic-lattice.md) contains an exact stationary identity. Let sites be $\mathbf X_g=dLg$ for integer triples $g$, invertible fixed $L$, lattice scale $d>0$, and checkerboard polarity. A displacement $n$ and its inverse $-n$ have the same polarity-product factor $\sigma(n)$. With stationary paths, the causal root has delay $d\|Ln\|/c_f$. In normalized units $c_f=1$, the transmitter factor is $D_t=1$ and the dimensionless acceleration contribution has the form

$$
\frac{\mathbf A_n}{a_0}
=-\sigma(n)\frac{Ln}{\|Ln\|^3},
\qquad
\mathbf A_n+\mathbf A_{-n}=0.
$$

Here $a_0$ absorbs the fixed dimensional coefficient and lattice scale. Any inversion-paired finite sum cancels. The corresponding inversion-ordered infinite construction is conditionally organized; it is not an absolute-convergence theorem. The cancellation survives a homogeneous invertible affine deformation $L$. Its derivative with respect to homogeneous strain consequently vanishes in this stationary construction, but that says nothing by itself about a nonuniform elastic modulus, moving-site stability, or a closed finite environment. A defined fixed-source stationary receiver Jacobian is symmetric with zero trace, so it cannot be strictly restoring in all three directions. Static defects can introduce directional slopes but do not supply an isotropic confining response by themselves. The checkerboard remains a useful equilibrium control; its verified nonlinear coherent instability at $g=16$ and the new positive linear band at every $g>0$ must accompany that description.

The retained source reports a structural audit of 192 stationary ledgers and 105,600 rows with exact cancellation, tamper negatives, and a separately authored high-precision comparison. Those are historical instrument results. They do not establish a moving periodic sea, and no new execution is represented here.

### 2.2. Why isolated cells and copied circles differ

Equal positive and negative tetrahedral center sets at $\pm h\mathbf n_i$ form the eight vertices of a cube with side $d=2h/\sqrt3$. These are track centers, not moving members when the orbit radius is nonzero. The cube is the convex hull of the vertices; the tetrahedra are not filled matter occupying the intervening volume.

An isolated frozen eight-vertex cube has an inward acceleration coefficient

$$
\frac{3\sqrt6}{8}-\frac{1+3\sqrt3}{4}
\simeq-0.630479452.
$$

The exterior checkerboard changes this acceleration ledger. Isolated-cube contraction therefore does not refute the stationary infinite cancellation identity, nor does that identity bind the isolated cube.

Copying the same moving cell into adjacent cubes introduces a different obstruction: a shared vertex is assigned four distinct unoriented normal planes. A nonzero circle cannot lie in all four required planes; the common circular cell-copy limit collapses to zero orbit radius. A site-indexed orientation pattern is another construction and remains logically separate from this no-go result.

The global-plane antiphase pattern has a two-site primitive cell under the even-parity translation lattice, although an orthogonal description uses a $2\times2\times2$ cell. A nonzero circle in one fixed plane at a fixed site cannot possess full cubic point symmetry there. Multiple site orientations, permutations, or time-dependent symmetries require their own analysis.

### 2.3. Rank-two isotropy does not remove directional dispersion

Cubic symmetry forces an invariant rank-two tensor to be proportional to the identity. It also permits the fourth-order invariant

$$
I_4(\hat{\mathbf k})=\hat k_x^4+\hat k_y^4+\hat k_z^4,
$$

whose values on $[100]$, $[110]$, and $[111]$ are $1$, $1/2$, and $1/3$. A vector response can involve fourth-rank coefficients even in a quadratic wavevector term. Thus isotropic second orientation moments neither prove propagation isotropy nor recover observer Lorentz behavior. Physical clock and ruler assemblies must participate in the readout. Linearization also requires an actual background solution; a spectrum around a rejected prescribed orbit has no stability interpretation for that orbit.

<a id="24-three-bounded-negative-results"></a>

### 2.4. Finite-seed negatives and their dependencies

The moving-seed evidence distinguishes three experiments, all in normalized wake-speed units:

| Prescribed construction | Recorded comparison | Scope of the negative |
| --- | --- | --- |
| Eight-site open population, one global circular plane; $d=1$, orbit radius $0.05$, angular cadence $1$ | Evolution through $T=0.1$ had complete recorded roots and positive clearance, but symmetry leakage grew from about $1.28\times10^{-5}$ at $T=0.01$ to $1.27\times10^{-3}$ at $T=0.1$, above $10^{-8}$ | Rejects the prescribed symmetry as an invariant continuation in this finite experiment; no full-period nonreturn conclusion |
| Rigid global-plane release, side lengths $2,4,6$ with the central eight-site core compared | Normalized release-mismatch intervals were approximately $[0.2556023163,0.2556023470]$, $[0.0087010690,0.0087012283]$, and $[0.0044355249,0.0044358262]$ | The finite exterior suppresses the mismatch, but every tested level remains above $10^{-8}$; no infinite-tail estimate or evolved return |
| Site-local tetrahedral orientation pattern, side lengths $2,4,6$ | Historical searched-history release-mismatch lower bounds were $0.2680958096$, $0.2450927240$, and $0.2450927240$, with 50,816 ordered certificate rows | The $N=2$ rejection retains full-diameter history coverage; $N=4,6$ complete-history conclusions are withdrawn because distant source emissions lie before the stored history |

The first experiment reached maximum recorded speed about $0.06815$ and minimum recorded separation about $0.89836$; its failure was not inferred from a collision. Its early sublattice leakage is consistent with $\lambda_{\rm sym}(T)=\tfrac12\lambda_A T^2+O(T^3)$, where $\lambda_A$ is the release acceleration split in the second row. These are related release/evolution manifestations of the finite boundary, not independent mechanisms. The rigid-ladder suppression factors, approximately $29.38$ and $1.96$, describe finite comparisons, not a convergent infinite correction. The [historical site-local audit](../../mapping-electromagnetism/evidence/adaptive-cubic-site-local-release-ladder-audit-2026-08-25.json) retains its exact recorded intervals and counts; the [current assessment](analysis/lattice-review-integration-2026-10-03.md#retained-history-ladder-defect) withdraws the larger-rung interpretation and specifies the required repair. None of these rows rejects every adaptive cubic organization or establishes a material propagation law.

Finite open crops, exact periodic all-image constructions, replicated finite ladders, receiver-centered exhaustion, and screened-cell constructions have different boundary obligations. Agreement between two finite sizes is not an infinite-tail proof. A screened tail requires a derived screening estimate, not a declared omission of the exterior.

## 3. Adaptive geometry and a retained medium

### 3.1. Local kinematics without lattice bonds

The [adaptive cubic contract](analysis/adaptive-cubic-medium-kinematics-and-ledger-contract.md) replaces immutable cell copies with identity-labeled local geometry. A candidate chart writes a member path as

$$
\mathbf X_g(T)=\mathbf Y_g(T)
+\rho_g(T)\bigl[\mathbf p_g(T)\cos\theta_g(T)
+\mathbf q_g(T)\sin\theta_g(T)\bigr]
+\mathbf e_g(T),
$$

with an orthonormal local plane basis, radius and phase, center, and residual. These are estimators of a path record. Persistent site labels preserve provenance; they do not pin members to space or add bonds to the law. Plane-basis and phase changes can be chart gauge. When the estimator loses the required rank or exceeds its error floor, the chart is unavailable rather than physically singular by definition.

A midpoint $[\mathbf X(T)+\mathbf X(T-P/2)]/2$ can estimate a circular center if an appropriate period $P$ is already supported. Choosing $P$ does not establish periodicity. Likewise, common and differential displacements of separately normalized positive and negative sectors are kinematic observables. Naming them gravitational and electric fields would require additional response derivations.

Local neighbor geometry defines a deformation gradient $F$ and the finite strain

$$
E=\frac12(F^TF-I).
$$

A rigid proper rotation gives $E=0$, an exact kinematic check. The antisymmetric part $(F-F^T)/2$ is not the finite polar-decomposition rotation. Neither construction supplies a stiffness, energy density, or elastic constitutive law.

### 3.2. Neighborhood identity, return, and reorganization

Suppose distance enclosures distinguish six local neighbors from every omitted candidate. A positive separation between the largest upper bound among the six and the smallest lower bound among the omitted distances certifies the neighbor identities within those enclosures. It does not truncate causal interactions at the sixth neighbor. Rank changes require persistent identities, reciprocal edge changes, a bracket or dwell record distinguishing the change from an unresolved instantaneous rank tie, and continued root and account provenance. A kinematically admissible swap is not yet a retained physical reorganization.

Continuous history return compares position and velocity over an entire window, not a scalar crossing or a few stored frames. In a declared frame convention, typical return quantities are

$$
D_X=\sup_{T\in W}\|\mathbf X(T+P)-\mathbf X(T)\|,
\qquad
D_V=\sup_{T\in W}\|\mathbf V(T+P)-\mathbf V(T)\|.
$$

Piecewise polynomial histories require extrema and error enclosures on every interval. An independent verifier is needed for a certified conclusion. Return alone is not transverse stability, and neither implies response isotropy. After a disturbance, elastic return, persistent excitation, retained reorganization, and failure are separate outcomes.

The [background audit](../../mapping-electromagnetism/evidence/adaptive-cubic-background-o0-audit-2026-08-25.json) did not reach this return question. Its usable history was only $[-2,0.1]$ while the candidate period was $2\pi$; even an antipodal sample at the initial event would require an earlier history. It also lacked a closed exterior and an independent continuous-return certificate. Root completeness, speed, clearance, and use of the EOM solver did not remove those gaps. The adaptive background was blocked, and physical receiver and directional-response comparisons were not run. Missing comparisons are not negative physical measurements.

### 3.3. Directional response needs a physical readout

An even-sided tetrahedral parity pattern can have orientation second moment exactly $I/3$ while retaining higher-order structure. A fourth orientation diagnostic measures that structure, but it is still an orientation statistic. Propagation along $[100]$, $[110]$, and $[111]$ would require an accepted background, controlled boundaries, physical receiver assemblies, one fixed readout, and refinement. Those three directions can falsify isotropy when they disagree; their agreement alone does not establish isotropy over every direction.

This hierarchy prevents a path-acceleration diagnostic from being promoted to a clock measurement. It also explains why a candidate with good static symmetry but a failed memberwise release equation cannot be used as the background for a claimed stability or wave result.

## 4. An infinite line of pairs that moves and balances

The checkerboard at rest is an exact equilibrium, and Sections 1 to 3 explain why sustained collective motion of a three-dimensional population has not been defined. One infinite configuration does move and balance exactly under the unchanged equation: a rotating ladder. Opposite-polarity pairs are stacked along an axis at equal spacing $d$, each pair turned half a revolution from the next, and the whole line rotates rigidly at one angular rate with every member below wake speed. Each rail of the ladder then alternates in polarity along the axis, and the delayed sum over the line converges absolutely.

On an isolated slow pair the partner's row has a forward part, which is why the pair expands. In the ladder the like-polarity neighbours on the same rail brake each member, and at one spacing the two cancel. To first order in speed the condition is $y\sinh y=6$ with $y=2\pi R/d$, which gives $d/R=3.3453$ (derived). Under the full delayed equation the balance persists as a branch from the smallest speeds to $0.995$ of wake speed, measured to rounding and reproduced by a separate construction; at small speed its existence is proved and [independently adjudicated](analysis/rotating-ladder-small-speed-existence-independent-adjudication-2026-10-03.md). The [ladder analysis](analysis/rotating-alternating-ladder.md) owns the branch tables.

The ladder is unstable at every speed examined. In the delayed first variation its largest growth rate is $0.99$ of the angular rate at small speed, about $0.52$ near $0.76$ of wake speed and $0.57$ near wake speed, and an [independent census](analysis/rotating-ladder-delayed-stability-independent-adjudication-2026-10-03.md) counts 23 growing roots at the slow end and 70 near wake speed (measured, formal modes). Delay does not remove growing modes; modes that are neutral in the zero-delay comparison begin to grow as speed rises.

Twisting the ladder, so that successive pairs turn by less than half a revolution, removes its mirror symmetry along the axis. The twisted strand is then pushed along its axis and balances only while translating, at an axial speed up to $0.60$ of its rotation speed for the twists examined (measured, float, one construction). The same counting of conditions governs finite arrangements, and the Braid Program's [search](../braid-program/analysis/rigid-balance-search-2026-10-04.md) found four finite balances that travel along their axis.

For the lattice question this is a bounded result. It shows that an infinite ordered population can move and satisfy the equation exactly below wake speed, which the checkerboard in sustained motion has not been shown to do, and that order of this kind does not by itself give persistence. No interval enclosure exists at finite speed. A ladder spectrum without growing roots at some speed, or a nonvanishing tangential residual at the tabulated spacing under tighter arithmetic, would overturn it.
