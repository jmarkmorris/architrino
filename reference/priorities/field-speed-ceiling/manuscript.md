# A Field-Speed Ceiling: Causal Geometry, Conditional Motion, and the Missing Selection Law

## 1. The proposed constrained dynamics

### Current scope and evidence boundary

The current sharp-law investigation retains the Master Equation's ordinary partner reception, imposes the field-speed ceiling through the regular response below, and sets self acceleration to zero at and below the ceiling, including equality. Retaining a self-emission record does not give it a self response in this investigation. A speed ceiling is still a proposed modification, not a consequence of the uncapped canonical equation.

Conclusions about this model must follow from the sharp equation. Smoothing is only an explicitly labeled comparison whose modifications and limitations accompany every reported result. Transferring a smoothed result requires a demonstrated limiting argument; numerical refinement at fixed smoothing checks only the modified calculation. The present continuation and planar analyses use the sharp equation only. The retained [auxiliary trajectories](analysis/partner-only-auxiliary-evolution-results.md) establish neither sharp-law reversal nor sticking nor once-only reception. Prescribed kinematic curves likewise establish no dynamical continuation.

Chapters 3 and 4 preserve conditional results of an older, additionally extended event model. Its common event map, zero velocity jump, frozen-root suppression, and retained multivalued exact-mirror continuation are additional assumptions outside the current cap-only examination. Those chapters do not establish that the sharp capped equation admits straight passage or delayed braking from coincidence. Section 4.4 states the current collinear result; Chapter 5 treats the regular circular configuration independently of those event assumptions.

### 1.1. Why examine a path-speed ceiling?

Finite propagation speed does not by itself limit the speed of a source. In the canonical master equation of $\mathbb{A}\mathbb{A}\mathbb{A}$, an architrino moves in Euclidean space with absolute time, emits a delayed wake at speed $c_f$, and receives acceleration contributions from its causal path history. The primitive velocity domain is $\mathbb R^3$. Below, equal to, and above $c_f$ are different causal-geometric regimes of that domain, rather than different ontologies. A proposed path ceiling therefore changes the dynamics: it cannot be inferred from wake propagation or inserted as a numerical clamp without changing the model.

The motivation is a concrete unresolved boundary. The stationary mirror approach studied in [the master-equation threshold analysis](../master-equation-closure/analysis/mirror-close-approach-causal-root-boundary.md) reaches the first wake-speed event with an ordinary, finite, speed-increasing partner contribution. Its unchanged sharp-law extension encounters a non-locally-finite newborn self-root measure. That bounded result motivates testing alternatives; it does not select one. A closed speed domain excludes the above-wake history responsible for that particular self-root birth, but immediately raises another question: what replaces the excluded evolution, and does the replacement determine a future?

This manuscript synthesizes the [field-speed mathematical development](analysis/mathematics-geometry-dynamical-system.md) and its companion analyses. Its subject is an **unadopted alternative**. The positive results are conditional theorems about that alternative: simpler causal geometry, a compatible circular binary, regular local history evolution, and a family of exact mirror continuations. Its unfavorable results are equally central: singular endpoint measures do not become finite by projection, the tested six-path geometry fails acceleration closure, the mirror restart admits multiple futures, and no existing action or wake account selects the onset of braking. The [source-coverage record](analysis/manuscript-source-coverage.md) preserves the provenance and review dispositions separately from the scientific narrative.

We use $T$ for absolute time, $S$ for an emission instant, and $\mathbf X_i(T)$, $\mathbf V_i(T)$ and $\mathbf A_i(T)$ for the position, velocity and acceleration of label $i$. Where source notes use lowercase time, it is translated here to absolute time without changing the equations. Numerical examples use normalized wake-speed units with $c_f=1$. Symbolic $c_f$ remains where its dependence matters. Standard-physics conservation laws, relativistic speed bounds, masses and quantization are not premises of the architrino-level argument.

### 1.2. The ordinary causal-root ledger

The proposal retains the ordinary delayed interaction before constraining its complete sum. Establishing that order requires two pieces of notation: the causal equation identifies which emissions arrive, and the acceleration kernel assigns each ordinary arrival its weight.

For receiver $i$ and transmitter $j$, define the separation, unit direction and causal-root function by

$$
\mathbf r_{i\leftarrow j}(T,S)=\mathbf X_i(T)-\mathbf X_j(S),\qquad r=\|\mathbf r_{i\leftarrow j}\|,\qquad \hat{\mathbf r}=\frac{\mathbf r_{i\leftarrow j}}r,\qquad g(T,S)=r-c_f(T-S)
$$

An ordinary root has positive delay, positive range, is isolated in emission time, and has nonzero transmitter factor. The two factors are

$$
D_t=c_f-\hat{\mathbf r}\cdot\mathbf V_j(S),\qquad D_r=c_f-\hat{\mathbf r}\cdot\mathbf V_i(T),\qquad \partial_Sg=D_t,\qquad \partial_Tg=-D_r
$$

For coupling $K_{ij}=\kappa|q_iq_j|>0$ and polarity sign $\sigma_{ij}=\operatorname{sign}(q_iq_j)$, the ordinary per-root acceleration is

$$
\mathbf a_{i\leftarrow j}(T,S)=\sigma_{ij}\frac{K_{ij}c_f}{r^2|D_t|}\hat{\mathbf r}
$$

The multiplier is $c_f/|D_t|$. Receiver motion controls the playback of source history through $D_r/D_t$; it does not replace the transmitter-side acceleration multiplier. Every admitted row must be evaluated at its original weight before forming the complete finite ordinary ledger $\mathbf A_i^{\mathrm{ord}}$.

### 1.3. The velocity constraint and response order

The proposed constrained response introduces a second speed, $c_a$, and the closed velocity ball $\mathcal B_{c_a}=\{\mathbf V:\|\mathbf V\|\le c_a\}$. Its regular solution law requires absolutely continuous velocity and a radial normal-cone reaction:

$$
\dot{\mathbf V}_i+\mathbf n_i=\mathbf A_i^{\mathrm{ord}},\qquad \mathbf n_i\in N_{\mathcal B_{c_a}}(\mathbf V_i)\quad\text{almost everywhere}
$$

Here the normal cone is zero in the interior and consists of outward radial vectors at the boundary. Under these proposed clauses, the minimal-selection argument derives

$$
\mathbf A_i^{\mathrm{eff}}=
\begin{cases}
\mathbf A_i^{\mathrm{ord}},&\|\mathbf V_i\|<c_a,\\
\mathbf A_i^{\mathrm{ord}}-(\hat{\mathbf v}_i\cdot\mathbf A_i^{\mathrm{ord}})_+\hat{\mathbf v}_i,&\|\mathbf V_i\|=c_a
\end{cases}
\qquad \hat{\mathbf v}_i=\frac{\mathbf V_i}{c_a}
$$

The notation $(z)_+=\max(z,0)$ denotes the positive part. The response removes a net forward component at the ceiling, retains transverse turning, and permits backward slowing. The derivation uses the almost-everywhere behavior of an absolutely continuous velocity on its boundary level set; a bare inequality or an inclusion at one instant does not supply it.

Operation order is part of the proposal. At a boundary direction $\mathbf e_x$, let two ordinary contributions be $2\mathbf e_x$ and $-\mathbf e_x+\mathbf e_y$. Projecting their sum gives $\mathbf e_y$; projecting each first and then adding gives $-\mathbf e_x+\mathbf e_y$. The second operation changes the law. Nor does a zero projected contribution erase the wake or its provenance.

### 1.4. Response to a supplied input

The finite-ledger response has an existence result of its own. This is the first analytic step toward a delayed evolution theorem: it determines velocity when the acceleration input has already been supplied. The separate task of obtaining that input from a changing history remains visible throughout the argument.

For a supplied integrable ledger $\mathbf f$ on a fixed interval beginning at $T_0$ and fixed initial velocity $\mathbf V(T_0)=\mathbf V_0\in\mathcal B_{c_a}$, the fixed-ball inclusion has a unique absolutely continuous response. Starting from that same $\mathbf V_0$, the constructive scheme is

$$
\mathbf V_{k+1}=\Pi_{\mathcal B_{c_a}}\left(\mathbf V_k+\int_{T_k}^{T_{k+1}}\mathbf f(T)\,dT\right)
$$

Projection nonexpansiveness bounds the velocity increment by the integral of $\|\mathbf f\|$ and gives a constant-one comparison estimate. Local averaging supplies uniform integrability for the limit argument; the projection inequality is passed in integrated form. Integrable input gives equi-absolute continuity, whereas bounded input additionally gives an equi-Lipschitz bound. This solves the supplied-input response problem, not the coupled delayed-history problem.

The distinction matters because the pointwise response is discontinuous across the boundary when the raw forward component is positive. With $c_a=c_f=1$, taking $\mathbf V_n=(1-1/n)\mathbf e_x$ and $\mathbf A^{\mathrm{ord}}=\mathbf e_x$ gives interior response $\mathbf e_x$ but boundary response zero. Coupled existence must use the monotone evolution response, not claim that this pointwise map is globally smooth.

## 2. Causal geometry and acceleration measures

A speed restriction changes the possible intersections between a path and its arriving wakes. It also changes how emission time advances along those intersections. The resulting geometry must be established before deciding whether an accumulated acceleration is finite: a root count alone says nothing about the integrability of its weight.

### 2.1. Root geometry at and below wake speed

For histories with $\|\mathbf V\|\le c_a\le c_f$, the reverse triangle inequality makes $S\mapsto g(T,S)$ nondecreasing and $T\mapsto g(T,S)$ nonincreasing. Consequently a fixed-receiver positive-delay fiber is empty, a singleton, or a connected interval. Separate ordinary roots and quadratic folds in one channel are unavailable. This is a derived geometric simplification, not an event prescription.

A higher ceiling $c_a>c_f$ does not have this monotonicity guarantee. Its admitted above-wake histories retain the original multi-root and event obligations; the following simple-root results cannot be extended to that regime by changing only a parameter.

If a whole emission interval reaches one receiver event, equality in the speed-bound triangle inequality forces a straight transmitter segment moving at exactly $c_f$ and aimed at that event. Conversely, a frozen branch with $S(T)\equiv S_0$ forces the receiver to run at $c_f$ on the straight ray away from the fixed emission point. These are dual rigid geometries. A single instant with $D_r=0$ need not be a frozen interval; it can be an isolated receiver tangency with a finite ordinary density.

The same-label channel is especially restrictive. Its causal equality requires equality between chord length and the maximum allowed path length over the entire intervening interval. Thus a positive-delay self equality at $c_a=c_f$ requires an exact straight wake-speed chord. A genuinely curved path has no such root. Straight co-moving intervals are recorded as nonordinary inactive families under the proposal, not counted as repeated ordinary self hits.

#### 2.1.1. Strict-gap control and its boundary

With a strict uniform gap $c_a<c_f$, complete all-past histories and distinct present label positions give exactly one partner root, with

$$
c_f-c_a\le D_t,D_r\le c_f+c_a,\qquad
\frac{c_f-c_a}{c_f+c_a}\le\frac{dS}{dT}\le\frac{c_f+c_a}{c_f-c_a},\qquad
T-S\le\frac{r(T,T)}{c_f-c_a}
$$

The gap controls delays and root conditioning. It does not bound an inverse-square contribution when range tends to zero. At equality, an isolated degenerate root has $D_t=0$; a cubic crossing follows only with the additional nonzero third derivative hypothesis. Higher odd orders and flat crossings remain possible. Weak path/velocity topologies do not automatically preserve pointwise root factors or exclude singular-continuous source clocks.

#### 2.1.2. The remaining event geometry

The incidence set $g(T,S)=0$ therefore provides a useful organizing picture: ordinary arcs advance the source clock, frozen intervals pause it, and characteristic arrivals can advance it discontinuously. A complete atlas still needs interval endpoints, diagonal-abutting corners, source identities, simultaneous channels and singular-continuous components. A per-channel catalogue is not a proven locally finite stratification of the full history problem. Historical genericity and activation-monotonicity suggestions are retained as restricted proposals, not used to override the later margin-zero activation theorem. The velocity ball and its sphere also have trivial fundamental group; a speed ceiling supplies no topological protection for a braid.

### 2.2. Incoming acceleration and the singular endpoint

The mirror approach exposes why the type and domain of a measure matter. Integrating ordinary arrivals before coincidence and assigning acceleration to a whole family at coincidence are different operations. The first can be finite even when an ordinary-kernel extension of the second diverges.

#### 2.2.1. Clock transfer and finite incoming accumulation

Along an injective ordinary branch with $D_t,D_r>0$, implicit differentiation gives $dS/dT=D_r/D_t$. For the vector kernel $\mathbf K=\sigma_{ij}K_{ij}c_f\hat{\mathbf r}/r^2$, changing clocks yields

$$
\int_B\frac{\|\mathbf K(T,S(T))\|}{D_t(T,S(T))}\,dT
=\int_{S(B)}\frac{\|\mathbf K(T(S),S)\|}{D_r(T(S),S)}\,dS
$$

Positive range and a positive receiver-factor floor can make a pointwise $1/D_t$ spike integrable. The branch and clock hypotheses are essential: this is not permission to evaluate $dS/D_r$ as $0/0$ on a frozen interval.

For the normalized mirror approach, let first ceiling arrival occur at $T_\ast$ with half-separation $q_\ast>0$. The proposed response gives the straight inward cap $q(T)=q_\ast-(T-T_\ast)$ until $T_c=T_\ast+q_\ast$. The one ordinary partner root moves through the pre-ceiling history, with playback $dS/dT=2/(1-u(S))$, where $u(S)$ is the positive inward source speed. The cap-emitted partner family has not yet arrived. If $u$ is left-$C^1$ at $T_\ast$ with $\alpha=u'(T_\ast^-)>0$, then $S(T)\uparrow T_\ast$ as the later receiver time $T\uparrow T_c$, with

$$
T_\ast-S(T)=\frac{2}{\sqrt\alpha}\sqrt{T_c-T}+o\!\left(\sqrt{T_c-T}\right).
$$

The emission-time deficit has square-root rather than Lipschitz dependence on the remaining receiver time. This open-segment asymptotic supplies no endpoint measure or event update.

The [endpoint reanalysis](analysis/capped-collinear-endpoint-reanalysis.md) gives the complete open-cap raw integral

$$
\frac K2\int_{S_0}^{T_\ast}\frac{dS}{R_p(S)^2}<\infty,\qquad R_p(S)\ge q_\ast>0
$$

Here $R_p$ is the causal partner range and $S_0$ is the source time received at cap entry. The complete row is forward on this prescribed segment, so its effective velocity increment is zero. At $T_c$, however, the whole partner cap becomes a characteristic family with $D_t=0$. Extending the ordinary inverse-square expression onto that event family produces the separate endpoint density $K/[2c_f^2(T_c-S)^2]$.

#### 2.2.2. Endpoint divergence and failed completions

The [open-interval convergence theorem](analysis/coincidence-open-interval-convergence-and-endpoint-residue.md) retains the exact distinction. On each compact source interval ending short of $T_c$, an ordinary-root resolution converges in total variation if it has eventual coverage, uniform collapse to the event, convergent moving traces and kernel, positive convergent $D_r$, retained source labels and separated competing strata. Uniform position convergence and $L^1$ velocity convergence alone do not imply these conditions. Fixed positive-range pieces push forward to finite labeled receiver-time atoms; the endpoint variation satisfies

$$
\operatorname{TV}(\rho)=\frac{K}{2c_f^2}\left(\frac1\rho-\frac1{\rho_0}\right),\qquad
\lim_{\rho\downarrow0}\rho\,\operatorname{TV}(\rho)=\frac{K}{2c_f^2}
$$

The resolution limit precedes $\rho\downarrow0$. The residue measures the strength of the divergence; it is not an event impulse. There is no finite vector-Radon ordinary measure on a closed neighborhood containing that endpoint under the theorem's consistency assumptions.

Two tempting repairs fail. Signed principal-value cancellation across different times does not reduce total variation. Projecting a divergent forward coefficient does not define a response on an infinite raw ledger: a small transverse direction rotating while its coefficient grows can retain a bounded but nonconvergent transverse vector. Even exact removal of a leading term leaves the integrability of the remainder to prove. These rejected routes explain why the event construction needs its own carrier and law.

#### 2.2.3. Transverse variation on the open cap

The singular endpoint does not prevent a conditional calculation on the preceding open segment. Its purpose is to describe the response to transverse displacement while the same ordinary branch and projection regime persist.

There is also a conditional first variation on the open inward cap. Write its positive raw component as $a_0\hat{\mathbf v}_r$, its causal range as $R=T-S$, and transverse perturbations as $\delta\mathbf y_r$ and $\delta\mathbf y_t$. To first order, the transverse displacement changes the arrival direction but not the root time, range or transmitter factor. The active projection gives

$$
\delta\mathbf A^{\mathrm{eff}}=-a_0\left[\frac{\delta\mathbf y_r(T)-\delta\mathbf y_t(S)}R+\delta\hat{\mathbf v}_r(T)\right]
$$

This is bending without a first-order longitudinal slowing term while the raw forward component remains strictly positive. A sign change leaves that smooth response branch. The calculation is a conditional variation about the stated cap solution, not a stability theorem or an exclusion of new partner events.

### 2.3. The spatial wake-speed limit

The preceding obstruction concerns reception along a particular approaching path. A spatial measure asks instead how source emissions are distributed throughout a three-dimensional observation region. Comparing the two results requires retaining that change of carrier; a finite spatial limit cannot serve as a contact prescription for the mirror pair.

The [uniform-translation theorem](analysis/uniform-translation-spatial-receiver-measure-limit.md) studies a different limit, for one complete uniformly translating source and a three-dimensional spatial receiver measure. At the observation time place the source at the origin, write its speed ratio as $\beta_f\in[0,1]$, and parameterize past emissions by age $a>0$ and propagation direction $\boldsymbol\omega\in S^2$. In normalized units the spatial map is

$$
\Phi_{\beta_f}(a,\boldsymbol\omega)=a(\boldsymbol\omega-\beta_f\mathbf e)
$$

The source-provenanced vector carrier has constant coefficient $\Gamma$ times $\boldsymbol\omega\,da\,d\Omega$, where $\Gamma$ contains the declared source/receiver coupling and polarity. Pushing this carrier into space retains the emission-age provenance before taking the spatial marginal. At $\beta_f=1$, write $u=\mathbf y\cdot\mathbf e$ for the axial coordinate and $\rho=\|\mathbf y\|$. The ordinary trailing density is

$$
\mathbf m_1(\mathbf y)=\frac{2\Gamma}{\rho^2}\left(\mathbf e-\frac{2u\mathbf y}{\rho^2}\right)\mathbf1_{\{u<0\}}
$$

The scalar envelope has mass $4\pi R$ in a source-centered ball of radius $R$, independently of $\beta_f$. Almost-everywhere density convergence and the envelope identity give local total-variation convergence of the vector measures as $\beta_f\uparrow1$. The characteristic fiber maps to the source point but occupies one zero-area propagation direction, so the singular residual is zero.

This derived result concerns a spatial marginal of an eternal uniform path. It neither evaluates the measure at the point source nor supplies a self-acceleration, contact response or nonuniform-path limit. All-space mass is infinite, and a two-dimensional slice has a different integrability problem. It therefore does not contradict the mirror endpoint divergence: the carriers, marginalization and limits are different.

## 3. A finite coincidence event and its restart data

The endpoint obstruction leaves a precise gap: the ordinary kernel does not provide a finite event update. The construction in this chapter supplies one under additional event assumptions. Its output is immediate data and retained history; whether those data determine one future is the subject of Chapter 4.

### 3.1. A common finite source carrier

The proposed [common coincidence event](analysis/common-impulse-event-measure-and-mirror-cancellation.md) uses finite source-history data rather than the singular ordinary kernel. For cap duration $L$, retain both labels on a common lookback carrier $(0,L]\times\{+,-\}$ with finite matching measure $\nu$. Exact mirror symmetry gives signed source weights $+q\nu$ and $-q\nu$. Pushing them onto the same event $E$ produces opposite scalar atoms. Applying one common linear event-to-acceleration map after aggregation gives

$$
\mathsf M_E^{\mathrm{imp}}=q\nu((0,L])\delta_E-q\nu((0,L])\delta_E=0,\qquad
\mathbf J_{i,-}=-\mathbf J_{i,+},\qquad \Delta\mathbf V_i=\mathbf0
$$

The common map is additional law. Ordinary radial contributions would reinforce, because polarity and direction both reverse; their cancellation is not what was proved. Both source records remain present. The zero coefficient belongs to the event update, not to a vanished source, a finite part of the inverse-square kernel, or an independently derived conserved account.

### 3.2. Complete history, ownership, and the straight right trace

Cancellation of the matched event coefficient retains both source histories in the restart state. A restart must therefore retain labels and distinguish emissions that have passed, belong to the current event, or remain inbound. Otherwise a statement about the net event update would silently become a deletion of history.

The [exact-mirror restart](analysis/mirror-event-family-completion-and-right-trace.md) requires coincident positions, matched incoming opposite wake-speed velocities and cap records, a classified incoming census, and no unmatched incoming event atom. It preserves continuous positions and velocities, splices the full labeled histories, and carries received-source clocks, ownership, emission records and typed measures. Every velocity atom must belong to a declared event; regular right velocities are absolutely continuous. The event supplies immediate data and bookkeeping. Right histories are solutions of the restart inclusion, possibly more than one.

A retained emission is sorted at the event by its causal gap. If $g(T_c,S)<0$, its front has already passed; if $g=0$, it lies on the current event/frozen family; if $g>0$, it remains inbound and must stay in the remainder. For an owned front, the opposite gap

$$
\gamma(T)=c_f(T-S)-\|\mathbf X_i(T)-\mathbf X_j(S)\|
$$

is nondecreasing under every ceiling-admissible future. Once strictly positive it stays positive, so an owned emission cannot return as an ordinary crossing. Equality can persist only on the rigid ridden geometry. This permanence argument preserves other wakes rather than deleting inconvenient contributions.

On the isolated straight right trace, normalized to $T_c=0$, the partner root is $S=0$ with $D_t=2$, $D_r=0$; older cap records have passed, new partner emissions have positive constant margin $2S$, and the self family is inactive in this extended model. Its additional frozen-root suppression sets the received ledger to zero, making straight separation compatible with that extended model. The canonical sharp row itself is nonzero: stationary receiver-side playback does not silence acceleration. Immediate exact rebound would require velocity jumps of magnitude two and is excluded by the extended model's zero-atom event rule. A zero atom does not exclude continuous reversal later within that model.

The inherited cap's incidence depends on the candidate trace: it is a whole characteristic family at coincidence, has passed on the prescribed straight separation, and is a whole ridden $D_t=D_r=0$ interval on exact rebound. Generic right traces need have neither disposition. This geometric census precedes the question of whether the proposed event law admits the candidate trace.

### 3.3. Frozen reception remains an additional choice

The frozen disposition itself remains additional semantics. The joint distribution $\mathbf K\delta(g)$ exists away from zero range on the frozen chart $g=2S$, and its receiver-time marginal supplies a nonzero density $\mathbf K(T,0)/2$. A source-crossing measure instead assigns zero to a frozen singleton. Both agree on ordinary crossing branches. Regular-chart equivalence cannot choose between them. The [swept-source proposal](analysis/mathematics-geometry-dynamical-system.md) must therefore remain distinct from both the canonical regular row and the separate finite coincidence event.

## 4. Multiple futures and the missing selection law

The straight restart is compatible, but compatibility establishes only one member of the allowed future set. This chapter constructs other members, follows prescribed braking through a return where sufficient bounds permit it, and then identifies what a selector would have to add. The nonuniqueness is a result within the proposed law and declared solution class, not a consequence of incomplete incoming data.

### 4.1. Delayed braking from the same complete past

The straight future has no uniform inactive-gap margin: the constant positive margins $2S$ tend to zero as post-event emission times approach zero. The [trailing-front theorem](analysis/trailing-front-activation-dichotomy.md) turns this observation into exact nonuniqueness in the stated isolated mirror class.

Set $c_f=1$, place the event at $T=0$, and write the mirror half-position and signed velocity as $x(T)=T-E(T)$ and $v(T)=1-m(T)$, with deficit integral $E'=m$. Choose any onset duration $u>0$ and keep the history straight through $T=u$. The partner causal equation is

$$
2S=E(T)+E(S)
$$

Immediately after onset its source time lies in the stored straight segment, so $E(S)=0$, $S=E(T)/2$, $D_t=2$ and $D_r=m(T)>0$. The complete active local system becomes

$$
E'=m,\qquad m'=\frac{K}{2(T-E/2)^2},\qquad E(u)=m(u)=0
$$

This smooth active system has a local solution with $m'(u^+)=K/(2u^2)>0$. Its one new partner root is ordinary for $T>u$; there is no new self root, no rebilling of the owned event family and no external or transverse contribution. Exact mirror symmetry embeds it in the two-label vector restart. A finite acceleration jump at onset is compatible with the declared absolutely continuous, almost-everywhere solution class.

Every positive $u$ therefore gives a distinct continuation sharing the complete preceding straight history, while the indefinitely straight continuation also remains. The acceleration law governs braking after the onset is supplied. It does not implement a causal mechanism producing that onset.

#### 4.1.1. Why exclusion of an immediate cascade does not select onset

The [event-adjacent no-cascade lemma](analysis/event-adjacent-no-cascade-lemma.md) closes a separate concern. A positive activation creates a nondecreasing speed deficit and a persistent ordinary partner root, so the nearby active set cannot consist of disconnected shrinking bursts. Onset at zero would require $m'(T)\ge K/(2T^2)$ and infinite variation. Each admitted local mirror solution has a positive initial interval free of ordinary active roots. This excludes the proposed thin ordinary cascade in that class, not the arbitrary positive waiting time or broader singular-clock phenomena.

Earlier claims that swept-source reception uniquely selected straight passage consequently fail. The historical ceiling-exit story in which a self-family atom is delivered and then projected to zero is also unnecessary and unsupported by the selected event law: the current construction retains that family as inactive, and its disappearance is not a newly declared atom. The [complete-lobe review](analysis/independent-complete-lobe-returning-event-review-2026-09-02.md) records this correction explicitly.

### 4.2. Returning lobes and controlled recurrence

Choosing an onset makes it possible to ask a further question: how far does the resulting branch continue? The answer depends on source-window and range estimates. Return and repetition below are conditional on the supplied onset and the proposed event law; neither construction retroactively supplies an onset mechanism.

#### 4.2.1. Turnaround and inward ceiling arrival

For a supplied onset, let $y=T-E/2$ be the causal range while the source remains on its initial straight segment. The [return-map analysis](analysis/two-lobe-return-map-and-autonomous-trigger-audit.md) derives

$$
2m-\frac{m^2}{2}=K\left(\frac1u-\frac1y\right),\qquad
y_{\mathrm{turn}}=\frac{2Ku}{2K-3u}
$$

Turnaround is $m=1$, where $v=0$. A finite positive value of this first-chart balance requires $K/u>3/2$; the sufficient bound $K\ge3u$ keeps the source root in the stored straight segment through turnaround. The stronger sufficient bound $K\ge7u/2$ gives $x_{\max}<y_{\mathrm{turn}}\le K/2$. After turnaround, with inward speed $w=-v$, the complete partner row supplies

$$
w^2\ge K\left(\frac1{x+x_{\max}}-\frac1{2x_{\max}}\right),\qquad
x_{\mathrm{cap}}\ge\frac{x_{\max}(K-2x_{\max})}{K+2x_{\max}}>0
$$

The continuation argument uses positive-range, simple-root local evolution until inward cap arrival or coincidence; it must not assume extension merely from an inequality. The bound forces inward ceiling speed at positive separation. The pair then coasts inward to a second coincidence.

#### 4.2.2. The complete returning-cap census

The returning-cap census needs one additional observation. The helper $H(S)=S+x(S)$ becomes constant on the transmitter's inward cap, but its constant value is the return time, strictly above the root equation's right side before that event. Thus the unique ordinary partner root remains in the pre-cap source history. The receiver's same-label cap family is separately recorded inactive. On the open inward cap, $D_r=2$ and

$$
\int\frac{K}{r^2D_t}\,dT=\int\frac{K}{2r^2}\,dS,\qquad r\ge x_{\mathrm{cap}}>0
$$

The ordinary approach is integrable and has no event atom. The final matched cap, including its assigned start endpoint, belongs to the event carrier. All pre-cap records have strictly passed; equality at the return occurs exactly on the final inward cap. The same proposed event guard therefore reapplies with reversed orientation and incoming cap length $L_{\mathrm{out}}=x_{\mathrm{cap}}$.

#### 4.2.3. Recurrence of the live state

Let $G(K,u)=x_{\mathrm{cap}}$. Permanent passage makes this outgoing duration independent of older incoming cap length. Equal prescribed onsets generate reflected lobes and a spatial period-two cycle. Literal all-past history nevertheless grows. The [future-equivalence theorem](analysis/future-equivalence-quotient-and-two-cycle.md) removes only complete owned and consumed record bundles with a strict permanent all-receiver passage margin. Zero-gap frozen families, current event data, source clocks, ownership and cap duration stay live. When all transition clauses consult only this live data, equivalent states have identical sets of future ledgers and continuations. Equal prescribed onsets then give a genuine cycle on the normalized event-section quotient. This is a controlled cycle of a relation, not an autonomous breather or a claim that the literal archive repeats.

#### 4.2.4. The cap-duration reset has no positive fixed cycle

The natural cap-duration reset also fails to select a positive fixed cycle. In the sufficient closed-form regime $\alpha=K/u\ge6$, define $z=\sqrt{2/(\alpha-2)}$. Then

$$
\frac{G(K,u)}u=(1+z^2)(1-z\arctan z)=\ell(\alpha),\qquad
P(K,u)=\frac{2Ku}{K-2u},\qquad 0<\ell(\alpha)<1
$$

The root stays in the stored straight history because $S_{\mathrm{cap}}/u=(1+z^2)z\arctan z<3/4$. The recursion $u_{n+1}=L_{n+1}=G(K,u_n)$ shrinks to zero, with $\ell(\alpha)=1-8/[3(\alpha-2)^2]+O(\alpha^{-3})$. Its waits are of inverse-square-root order and $\sum_nP_n$ diverges: no positive fixed cycle and no finite-time accumulation follow in this controlled regime. The formulas must not be extrapolated to ratios where the source leaves the stored straight segment.

The historical review reports lower-ratio numerical lobes and a sharper threshold for one estimate, but the [live reproducibility item](work-queue.md#routed-reproducibility-gap) records that its two numerical instruments were not retained. Those measurements are unresolved reproducibility evidence, not a stronger theorem or a fresh calculation by this manuscript. The conservative sufficient bounds above remain the analytic statement.

### 4.3. What a selection law would add

The local branches and returning lobes establish what the relation permits. A predictive choice among them requires an additional criterion whose input state, causal mechanism, and admissible solution class are specified. A regularity restriction or smoothing convention can change that choice, but its selection effect must be attributed to the added rule.

#### 4.3.1. Selection proposals and the retained multivalued relation

The [selection analysis](analysis/exact-mirror-continuation-selection-analysis.md) tests several proposed uniqueness routes. Active-chart ODE uniqueness begins only after $u$ is supplied. A continuous-acceleration restriction, scalar minimality principle or prohibition on an inactive channel causing its own first crossing changes the admissible solution law. A smooth-limit prescription is incomplete without an approximation family: zero-preserving smoothing can retain straight motion, while a vanishing seed near a selected positive onset can approach that braking branch. A set-valued differential-equation closure does not supply missing values merely by being named.

A positive onset functional built from a reduced event state would have to respect translation, rotation and scaling; a dimensional form is $u=K\Phi(L/K)$ in normalized units. No current wake or action equation defines $\Phi$. A selector consulting older records could have more arguments, but would also have to restore those records to the live quotient state. Causality, a single root, determinism and Markov sufficiency are different requirements. Even a unique partner root depends on a past position and velocity that instantaneous $(\mathbf X,\mathbf V)$ generally cannot reconstruct. Promoting a sufficient retained history to the state can address that information loss; it cannot cure multiple futures from the same complete state without a selection law.

The current [operator decision](decisions/continuation-selection-operator-decision-2026-09-02.md) retains the multivalued relation as multivalued exact-mirror continuation. It adds neither a deterministic selector nor a probability distribution. This is closure of the present decision at its stated authority, not closure of the physical dynamics.

#### 4.3.2. Short-range and alternative continuation proposals

Other historical alternatives carry different missing data. A bounded short-range kernel or positive minimum separation introduces a new scale; excluding only exact coincidence does not bound arbitrarily close approaches. A finite transition interval needs entry, exit, retained-history and wake accounts throughout the interval. Stopping after a wake-speed segment exposes a nonordinary self-history family rather than an already defined braking row. An external third source can supply asymmetric input but does not determine how coincident opposite source records are aggregated. Non-collinear escape needs a declared perturbation class and cannot serve as a universal noncoincidence theorem. These proposals remain distinct from the controlled continuations already constructed.

#### 4.3.3. Strict speed domains and nonattainment targets

Two further comparisons sharpen the boundary. Replacing the closed ball by $\|\mathbf V\|<c_f$ supplies no normal-cone reaction at any admitted state; a finite-time boundary arrival simply leaves that domain. A constant sub-wake separating trial $x(T)=v_0T$, $0<v_0<1$, has

$$
S(T)=\frac{1-v_0}{1+v_0}T,\qquad r(T)=\frac{2v_0}{1+v_0}T,\qquad
\|\mathbf a\|=\frac{K(1+v_0)}{4v_0^2T^2}
$$

Its ordinary backward contribution is nonintegrable at coincidence; the trial does not establish a finite turnaround. An emergent nonattainment target is instead an integrable bound $\mathbf V\cdot\mathbf A\le C(T)(c_f^2-\|\mathbf V\|^2)$, which would preserve a positive speed gap by Gronwall. This is an FSC-local candidate-update obligation, not a proved property of the unchanged law. Even proving it would not prove positive-separation reversal, which needs enough finite backward acceleration to cancel the incoming speed.

#### 4.3.4. Response gains and a drifting encounter

A broader exploratory response writes separate longitudinal and transverse gains multiplying the corresponding complete-ledger components. The hard cap is one particular gain choice. Smooth nonattainment would instead require an appropriate boundary reachability estimate and generally changes the interior response. Such gains must be derived from the admitted wake and assembly dynamics before they can explain a ceiling; an observer-level relativistic comparison is only a recovery target. The historical suggestion that a gain modification removes every event obligation is too broad: range singularities, history strata and other events require their own analysis. Likewise, a drifting mirror encounter is a proposed preferred-frame diagnostic, whose interpretation needs an independently derived emergent comparison map and complete drifted histories.

### 4.4. Collinear coincidence under the sharp equation alone

#### 4.4.1. Source measure, surface density, and the incoming family

Set $c_f=1$ and coincidence at $t=0$. The incoming mirror cap has $X_A(s)=s$, $X_B(s)=-s$ for $-L\le s\le0$. Earlier histories remain retained; the results below assume $|X_A(s)|<-s$ for $s<-L$, no external sources, and zero self response. These are restrictions of the theorem, not universal initial data.

Continuous emission labels do not conflict with isolated reception roots. At a fixed receiver event, an ordinary root is an isolated emission time whose sphere passes through that event. A continuum of emitted labels can supply one such root. At coincidence the incoming capped partner instead supplies an entire interval of simultaneous roots. The ordinary sum cannot be applied term by term to that interval.

An emission at $s=-\tau$ from B is centered at $+\tau$. Its sphere reaches the origin at zero. The direction of attraction on A is positive, toward the old center and along its incoming motion, not backward. The outgoing braking row on a straight-through candidate is a different reception: the crossover root gives $-K/(2t^2)$ for $t>0$.

The signed emitted amount is a source measure proportional to $q\,ds$. A sphere's integrated normalization is distinct from its local density and the receiver acceleration kernel. Finite total source measure therefore neither bounds the inverse-square acceleration near zero range nor supplies a finite velocity change at coincidence. No separate finite kick equal to $q$ may be added at incidence. The [continuous-emission analysis](analysis/cap-only-continuous-emission-crossover.md) records the endpoint obstruction without replacing the kernel.

#### 4.4.2. Continuous passage and two sharp rebound attempts

The [partner-only calculation](analysis/self-silent-partner-near-event-balance.md) follows the root of the actual moving history. For a continuous positive outgoing launch, the unique new root satisfies $s+x(s)=t-x(t)$ and produces $a(t)\le-K/(2t^2)$. The cap retains this backward acceleration. Integrating from any $\delta>0$ to $t$ and sending $\delta$ to zero contradicts bounded velocity. This excludes the stated regular continuous-launch class; it does not predict an unbounded physical speed.

An exact immediate full-speed rebound would put A at $x(t)=-t$. Every old partner cap emission remains a root because $|-t+s|=t-s$. The residual is identically zero over an open set of receiver and source times, with $D_t=D_r=0$. This persists at positive ranges away from coincidence. The ordinary weight is undefined; the finite-impulse theorem for an isolated nondegenerate fold does not apply because its nonzero-derivative hypotheses fail. All old partner centers attract A to the right, opposing rebound, so the ceiling does not silence the family. The [sharp rebound audit](analysis/cap-only-rapid-reversal-geometry.md#sharp-law-audit--2026-09-16) therefore identifies both an underived event update and an undefined subsequent interval, not merely one missing value at zero.

Suppose instead A reverses and immediately slows below the ceiling. Write $X_A=-y$, $X_B=y$, $y(0)=0$, outward speed $w=y'$ with $0<w\le1$, and $y(t)<t$ for all positive times in an initial outward interval. The old family is then absent. The complete ordinary ledger contains one new root satisfying $s+y(s)=t-y(t)$ and gives

$$
w'(t)=-\frac{K}{[t-s(t)]^2[1+w(s(t))]}\le-\frac{K}{2t^2},
\qquad
w(t)-w(\delta)\le-\frac K2\left(\frac1\delta-\frac1t\right).
$$

Bounded outward speed contradicts this inequality as $\delta\downarrow0$. Local absolute continuity on positive intervals suffices; even a separately granted initial velocity jump would not repair this ordinary outward leg. The proof excludes neither every singular continuation nor different histories, external interactions, or broken mirror symmetry.

#### 4.4.3. Once-only passage and the unresolved contact alternative

For a fixed labeled emission center $C_s$, the interior gap $d_s(t)=t-s-|x(t)-C_s|$ is nondecreasing under the cap. Once strictly positive, it cannot return to zero. Thus an emission that has passed cannot be encountered again. A ridden front has persistent equality instead; the theorem supplies no response or source-depletion rule during that contact. Declaring a family spent after a reversing action would add semantics not derived from the sharp equation. A positive-duration turn opens a positive gap, but drawing such a turn does not establish its dynamical existence.

A candidate stationary pair at the origin has no ordinary positive-delay partner roots after crossover under the stated older-history conditions. This empty ordinary sum does not admit persistent coincidence or supply the required stopping changes $\Delta v_A=-1$, $\Delta v_B=+1$. Likewise, convergence of positions toward coincidence would not establish convergence of velocities or of the singular delayed acceleration. Neither a prescribed oscillation nor the retained smoothed runs resolves this boundary.

The current collinear result is therefore a set of scoped obstructions, with no derived sharp bounce, stopping event, or retained binary. A complete sharp event response remains a foundational target. The positive regular circular result below is a separate reason to continue investigating the ceiling.

## 5. Circular motion and regular local evolution

The mirror example reaches a nonordinary boundary where regular evolution theorems do not select a future. The circular pair provides a complementary test within a regular chart. The argument first establishes a complete root census and acceleration compatibility, then asks which additional history-space hypotheses support local evolution. Stability remains a separate question.

### 5.1. The exact circular binary

#### 5.1.1. Root census and acceleration compatibility

The [circular certificate](analysis/circular-binary-all-root-certificate.md) supplies the cleanest regular positive result. Prescribe an isolated all-past antipodal pair $\mathbf X_\pm(T)=\pm R\mathbf e_r(T)$ with opposite polarity and constant speed $R|\omega|=c_a\le c_f$. Let $\lambda=c_a/c_f$ and half-delay angle $\xi=|\omega|(T-S)/2$. Every partner root satisfies $\xi=\lambda|\cos\xi|$. Since $0<\xi\le\lambda\le1<\pi/2$, it reduces to

$$
\xi=\lambda\cos\xi,\qquad F_\lambda'(\xi)=1+\lambda\sin\xi>0
$$

There is exactly one partner root. A self root would require $\eta=\lambda|\sin\eta|$ at positive $\eta$, impossible because the chord is strictly shorter than the corresponding wake distance. The complete ordinary ledger is therefore one partner contribution per receiver, with

$$
r=2R\cos\xi,\qquad D_t=D_r=c_f(1+\lambda\sin\xi),\qquad
\mathbf A^{\mathrm{ord}}=-\frac{K}{4R^2\cos^2\xi(1+\lambda\sin\xi)}(\cos\xi\,\mathbf e_r-\sin\xi\,\mathbf e_\theta)
$$

Its radial component is inward and its tangential component forward. The boundary response removes the latter. Matching the former to $-c_a^2\mathbf e_r/R$ selects

$$
R_\ast(\lambda)=\frac{K}{4c_a^2\cos\xi(1+\lambda\sin\xi)},\qquad |\omega_\ast|=\frac{c_a}{R_\ast}
$$

At $c_a=c_f=1$, $D=\cos D$ gives $D\approx0.7390851332151606$, $R_\ast/K\approx0.2021113735152611$, $|\omega_\ast|K\approx4.9477670782$ and $P/K\approx1.269903212$. These are rounded numerical evaluations of the analytic expressions, consistent with the retained [100-digit endpoint receipt](evidence/fsc-010-circular-binary-all-root-mpmath-receipt.v1.json), not new interval certificates.

#### 5.1.2. The radius family and interior-circle exclusion

The [secondary theorems](analysis/circular-binary-secondary-theorems.md) delimit the result. A uniform circle strictly below the ceiling retains its unprojected forward component and fails the equation. At fixed $K,c_f$, the compatible radius decreases across $0<\lambda\le1$, with

$$
\xi=\lambda-\frac{\lambda^3}{2}+\frac{13\lambda^5}{24}+O(\lambda^7),\qquad
R_\ast=\frac{K}{4c_a^2}\left(1-\frac{\lambda^2}{2}+\frac{7\lambda^4}{8}+O(\lambda^6)\right)
$$

This gives a minimum only inside the stated family. It supplies no universal minimum radius, action quantum or maximum physical frequency. Root conditioning is favorable: $d\xi/d\lambda=\cos\xi/(1+\lambda\sin\xi)\in(0,1)$, and $\lambda=\xi/\cos\xi$ parameterizes the family explicitly. Interval-Newton-ready algebra does not replace an actual directed-rounding certificate.

#### 5.1.3. Rigid translation fails the complete response

Constant-speed rigid translation of the pair must be perpendicular to its rotation plane. In the equal-ceiling helical chart, with axial speed $u_h>0$ and circular speed $v_h>0$, $u_h^2+v_h^2=c_f^2$, the half-delay remains $D$, while $D_t=D_r=v_h^2(1+\sin D)/c_f$. The complete response has a strictly negative axial component and cannot sustain constant translation. The product $r^2D_t=4D^2R^2c_f(1+\sin D)$ is independent of the speed split, so the row magnitude does not vanish as the root factors degenerate. This excludes the whole rigid uniformly translating constant-boundary-speed circle class; deformed, externally coupled or nonuniformly translating assemblies remain outside the argument. The identity $D_t=D_r$ follows from the declared chord-exchange symmetry, but equality of the factors alone does not prove that symmetry.

### 5.2. From admissible histories to local evolution

#### 5.2.1. A geometric neighborhood and a history-space contract

The [census-neighborhood theorem](analysis/circular-binary-census-stability-neighborhood.md) intersects a dimensionless $W^{2,\infty}$ neighborhood with the ceiling-admissible histories. Its explicit sufficient radius is approximately $0.0682586$ in normalized coordinates. It gives a partner-delay bracket $[R_\ast D,3R_\ast D]$, range floor $R_\ast\cos(3D/2)$, factor floors $[1+\sin(D/2)]/2$, a root-displacement bound and positive equal-time separation. Its acceleration control excludes straight self chords. These are geometry statements about admissible histories in a specified tube.

The [regular-history theorem](analysis/regular-chart-history-to-ledger-well-posedness.md) adds what coupled evolution needs: finitely many fixed root slots, a sufficient delay window, atom-free $W^{2,\infty}$ histories with controlled acceleration, selected pointwise representatives and compatible traces, root-bracket floors on the intervening intervals, preserved inactive strata and a response cylinder mapped into itself. Root location is Lipschitz with coefficient $2/d_t$ for a transmitter floor $d_t>0$. Composing delayed position and velocity evaluations yields explicit $L^\infty$ row and total-ledger bounds; a stronger derivative-norm conclusion needs stronger acceleration regularity.

#### 5.2.2. Contraction and the continuation boundary

For a horizon $h$ shorter than the delay floor, all transmitter data lie in the already known history. The receiver response map is contractive when

$$
q=\frac12L_{\mathrm{rec}}h^2<1
$$

Here $L_{\mathrm{rec}}$ is the theorem's receiver-position ledger constant. The invariant-cylinder assumption is essential to make this a self-map. The exact all-past certified circle satisfies the conditional theorem and has a unique local continuation. Extending the conclusion uniformly to every history in the geometric tube still requires a verified invariant response regime and compatible right-acceleration trace. Continuation stops at the first loss of a floor, census, clock, trace, history coverage, response regime, ownership condition or event classification.

#### 5.2.3. The separate stability problem

No orbital stability or capture follows. A stability theorem would require a constructed solution and a differentiable evolution and return map on a declared history space, then the correct symmetry reduction and spectral hypotheses. A reduced spectral radius below one, under those nonlinear hypotheses, supports local exponential asymptotic stability and its local basin; a list of multipliers without that structure does not. Nor can any regular positive-gap theorem select the margin-zero mirror future of Section 4.1.

### 5.3. Planar perturbations and the ellipse question

The exact circular history has a unique local continuation within its admitted regular chart. This is stronger than a prescribed radius balance, but it does not show attraction from nearby histories, stability, or formation. The nearby-root theorem protects reception geometry; it does not assert that evolved disturbances remain in that neighborhood. No elliptical binary has been established in this investigation. Elliptical or precessing motion must satisfy the full delayed equation and cap; it cannot be inferred from an instantaneous inverse-square analogy.

#### 5.3.1. First sharp radial response

The [planar first-variation analysis](analysis/planar-circle-sharp-first-variation.md) begins at the exact solution $R_\ast$ with $c_f=c_a=1$. Supply a nearby unit-speed antipodal circular input history of radius $R$, angular speed $1/R$, and release the future to the equation. This is an initial-history response test, not a new equilibrium or an evolved perturbed orbit. Its sole partner root still obeys $D=\cos D$; the sharp capped initial acceleration is $-R_\ast\mathbf e_r/R^2$. For distance $\rho$ from the fixed antipodal midpoint,

$$
\dot\rho(0)=0,\qquad
\ddot\rho(0^+)=\frac1R-\frac{R_\ast}{R^2}
=\frac{R-R_\ast}{R^2}.
$$

The initially wider history therefore has outward radial acceleration, and the narrower history has inward radial acceleration. This is a derived non-restoring initial response for that input-history family. It is not a stability theorem: the changing history determines later roots, and the displayed initial formula is not a closed radial evolution equation. The supplied history may have an acceleration mismatch at release and is not asserted to meet the stronger compatible-trace continuation theorem.

#### 5.3.2. The delayed perturbation equation

For a smooth planar variation $\mathbf u_i$ about the exact circular solution, fix receiver time $t$ and let $s$ be its base emission time. Set $\mathbf r=\mathbf X_i(t)-\mathbf X_j(s)$, $\mathbf n=\mathbf r/r$, $J=1-\mathbf n\cdot\mathbf v_j(s)>0$. The sharp causal condition determines

$$
\delta s=-\frac{\mathbf n\cdot[\mathbf u_i(t)-\mathbf u_j(s)]}{J},
\qquad
\delta\mathbf r=\mathbf u_i(t)-\mathbf u_j(s)-\mathbf v_j(s)\delta s.
$$

With $\delta r=\mathbf n\cdot\delta\mathbf r$ and $\delta\mathbf n=(I-\mathbf n\mathbf n^{\mathsf T})\delta\mathbf r/r$, the transmitter-factor variation is

$$
\delta J=-\delta\mathbf n\cdot\mathbf v_j(s)-\mathbf n\cdot[\dot{\mathbf u}_j(s)+\mathbf a_j(s)\delta s].
$$

The path acceleration $\mathbf a_j(s)$ appears through evaluating velocity at the displaced emission time; it is not an added acceleration-dependent emission term. For the opposite-polarity raw row $\mathbf a=-K\mathbf n/(r^2J)$,

$$
\delta\mathbf a=-\frac{K}{r^2J}\left[\delta\mathbf n-\mathbf n\left(\frac{2\delta r}{r}+\frac{\delta J}{J}\right)\right].
$$

On the active unit-speed boundary branch, where the raw forward component remains positive and $\mathbf v_i\cdot\dot{\mathbf u}_i=0$, the effective variation is

$$
\ddot{\mathbf u}_i=(I-\mathbf v_i\mathbf v_i^{\mathsf T})\delta\mathbf a-[\dot{\mathbf u}_i\mathbf v_i^{\mathsf T}+\mathbf v_i\dot{\mathbf u}_i^{\mathsf T}]\mathbf a.
$$

These are derived necessary equations for differentiable solution families on this branch. They account for both changed root time and changed cap direction. They do not establish differentiability of the solution map or cover speed reductions into the interior, where a separate one-sided constrained analysis is required. The next stability object is the rotating-frame delayed system, its admissible modes and symmetry directions, and the connection to a justified evolution map. No spectrum, nonlinear stability, or ellipse follows from the first variation alone.

#### 5.3.3. A growing antipodal planar mode

The [rotating-frame mode calculation](analysis/planar-circle-growing-mode.md) advances the first variation to a characteristic equation. Put $\tau=t/R_\ast$ and write $\mathbf u_A=R_\ast(a\mathbf e_r+b\mathbf e_\theta)$, $\mathbf u_B=-\mathbf u_A$. The boundary-speed constraint is $a+b'=0$. A mode $b=e^{z\tau}$ therefore has $a=-ze^{z\tau}$ and radial velocity coefficient $q=-(1+z^2)$. Set $C=\cos D=D$, $S=\sin D$, $J=1+S$, and $E=e^{-2Dz}$. Define

$$
N=-Cz-S+E(-Cz+S),\quad M=-Sz+C+E(Sz+C),\quad
B(z)=\frac{1-2S}{2C^2}M+\frac{3N}{2CJ}+\frac{ECq}{J}.
$$

The complete delayed row and cap variation give

$$
F(z)=-z(1+z^2)-B(z)+q\frac SC=0.
$$

The phase mode satisfies $F(0)=0$, while direct differentiation gives $F'(0)=1$. On the positive real axis, $F(z)=-z^3-(S/C)z^2+O(z)\to-\infty$. Continuity therefore proves at least one positive real characteristic root: the boundary-branch linearized system has a growing antipodal planar mode. The [arithmetic instrument](../../../scripts/field-speed-ceiling/planar-circle-growing-mode.mjs), after its known-case and phase checks, locates one at approximately $z=0.410171808$. Its approximate linear amplitude factor over one base period is $e^{2\pi z}\approx13.1600$. This is a floating-point location of an analytically established mode, not a nonlinear trajectory or an interval-certified spectrum.

This result is stronger than the initially non-restoring radius response, but its scope remains the sharp delayed linearization on the active ceiling branch. A nonlinear instability theorem requires compatible finite-amplitude histories realizing this tangent and a justified differentiable evolution or direct nonlinear growth argument. No elliptical orbit, final collapse, escape, or saturated motion follows. The exact circle remains a solution; its robustness now faces a concrete growing linear mode rather than an untested stability expectation.

#### 5.3.4. Nonlinear instability on the active planar boundary

The [nonlinear bridge](analysis/planar-circle-nonlinear-instability.md) verifies the missing admissibility and smooth-evolution conditions for the antipodal unit-speed branch. It establishes a local nonlinear instability result in that class, not a trajectory after departure or a theorem about every history in the earlier perturbation tube. The [independent review](analysis/planar-circle-instability-independent-review.md) rederived the linear equation and supported the nonlinear conclusion. Its proof-route, admissibility, uniqueness and quantifier corrections are integrated here and in the supporting proof.

Let $Q$ denote planar rotation, $\mathcal J=Q(\pi/2)$, $\tau=t/R_\ast$, and reconstruct the physical pair by $\mathbf X_A=R_\ast Q(\tau)p(\tau)$, $\mathbf X_B=-\mathbf X_A$. A heading angle $\alpha$ represents the unit velocity through $e(\alpha)=(\cos\alpha,\sin\alpha)$. With dimensionless delay $d$, define

$$
b=p(\tau)+Q(-d)p(\tau-d),\quad |b|=d,\quad n=b/|b|,\quad
J_t=1+n\cdot Q(-d)e(\alpha(\tau-d)),
$$

$$
\mathcal A=-\frac{(K/R_\ast)n}{|b|^2J_t},\qquad
p'=e(\alpha)-\mathcal Jp,\qquad
\alpha'=(\mathcal Je(\alpha))\cdot\mathcal A-1.
$$

These are exactly the sharp partner equation and active ceiling projection in heading coordinates. They enforce speed one without a first-order truncation. The base circle is the constant state $p=(1,0)$, $\alpha=\pi/2$. Its forward raw acceleration is strictly positive and its root is separated from singularities.

On an open $C^1$ neighborhood of this constant history, the implicit root has derivative $G_d=-(1+\sin D)\ne0$ at the base, so the delay depends smoothly on history. Differentiating the full functional uses values of the history variation, but no derivatives of that variation; derivatives of the base history enter only as coefficients of the shifted evaluation. Its derivative therefore extends continuously to continuous variations. These are the solution-manifold smoothness conditions used by the [state-dependent-delay instability theorem](https://www.math.u-szeged.hu/ejqtde/p5301.pdf). This is a mathematical analysis tool applied to the sharp equation, not an added physical premise.

The associated local unstable manifold supplies actual solutions for all negative times approaching the circle. Their position and heading obey the reconstruction equation throughout their past, so they are admissible unit-speed histories, not arbitrary position/velocity records. Choose dimensionless history length $h=4$ and a local radius bound $|p|<1+\epsilon$ with $\epsilon<1/2$. Every possible partner separation is then below $2(1+\epsilon)<h$, excluding roots older than the represented history. This is exact history coverage for these solutions, not a physical memory cutoff. Positive root and forward-acceleration margins preserve the sharp active branch locally.

The positive-root eigenvector in these coordinates is $(-z,1,1+z^2)e^{z\tau}$. It satisfies the linearized heading system and is transverse to the circular phase tangent $(0,1,1)$. Nonzero nearby points on the unstable manifold therefore depart from the circle's phase family, while their negative-time histories approach it. Starting sufficiently far back yields arbitrarily close admissible initial histories that later leave a fixed small neighborhood. This establishes local nonlinear instability even after allowing phase changes.

The exact circle remains a solution, but there exist admissible antipodal planar disturbances, arbitrarily small in the stated history norm, whose evolution leaves a fixed neighborhood of the circular phase family. This result does not determine escape, collision, an ellipse, or saturation after departure, nor does it exclude other stable configurations. The heading reduction, complete history census and theorem hypotheses are recorded explicitly in the supporting proof together with the independent review and its stated verification limits.

The theorem application distinguishes two steps. Instability on the endpoint-compatible solution manifold alone does not supply physical histories. The additional unstable-manifold construction uses backward orbits of a differentiable time-$a$ map on its expanding spectral subspace; matching history segments and forward uniqueness concatenate these into complete negative-time solutions. Continuous dependence fills the intervals between the discrete times. The supporting proof states this route explicitly rather than citing an introductory remark as the theorem. Reflection symmetry gives both receiver equations, and the regular-chart contraction identifies the constructed antipodal solution with the unique two-body evolution locally. Neither step requires a count of every unstable eigenvalue; existence of one positive mode suffices.

#### 5.3.5. First observed departures under the sharp equation

The [departure diagnostic](analysis/sharp-circle-first-departure.md) integrates the sharp equation from supplied all-past unit-speed circular histories of radii $1.001R_\ast$ and $0.999R_\ast$. Their future is generated by the equation; their imposed past has an acceleration mismatch at release, so they are not claimed to be exact unstable-manifold histories. The instrument first passes the exact-circle known case and then halves both the maximum time step and turning control. These are floating-point, history-interpolated calculations, with no smoothing of the causal surface or spatial kernel and no interval certification.

For the larger-radius input, the raw forward acceleration changes sign near $t/R_\ast=19.910$, at radius approximately $2.8723R_\ast$. The finer numerical crossing bracket is $[19.9095,19.9100]$. The partner root remains ordinary: its last accepted transmitter factor is approximately 1.93981. The change matters dynamically because negative forward acceleration is braking that the ceiling must retain. The unit-speed heading formulation therefore stops at this boundary; a full speed-variable capped evolution is needed next. Escape or an outer turning point has not been demonstrated.

For the smaller-radius input, the trajectory contracts to the numerical radius guard $0.01R_\ast$ near $t/R_\ast=16.4406$ while the forward component remains positive and the transmitter factor remains approximately 0.8999. This guard is a stopping criterion, not a physical core or modified law. No collision, limiting spiral, or new event at zero range follows. The [receipt](evidence/sharp-circle-departure-receipt.json) binds reproduction commands, instrument hash, known-case result and refinement summaries. The two outcomes concern the specified histories only and are independent of the analytical proof that some admissible histories are unstable.

## 6. Assembly compatibility and the missing accounts

An isolated compatible circle supplies a constituent reference, but coupling several pairs changes every complete ledger. A larger assembly must satisfy its own acceleration equations before its prescribed motion can support claims about assembly transitions or accounts. The prescribed six-path example tests this distinction directly, and the binary cycle diagnostic shows why even a compatible path does not by itself define energy or action.

### 6.1. Complete-ledger closure for six paths

A three-binary construction must use the full six-label ledger. For a prescribed boundary-speed constituent with unit tangent $\mathbf t_i$ and radial direction $\boldsymbol\rho_i$, compatibility requires

$$
g_i=\mathbf t_i\cdot\mathbf A_i^{\mathrm{ord}}\ge0,\qquad
(I-\mathbf t_i\mathbf t_i^{\mathsf T})\mathbf A_i^{\mathrm{ord}}=-\frac{c_f^2}{R_i}\boldsymbol\rho_i
$$

There are six scalar inequalities and twelve perpendicular scalar equalities before reduction. They must hold for the complete period, not only sampled phases. Exact speed constraints $R_i^2\omega_i^2-c_f^2=0$ are separate equalities; active inequalities have different one-sided and two-sided tangent conditions. The [independent review of the assembly program](analysis/sections-12-14-independent-review-2026-09-02.md) requires this separation explicitly.

A common period requires integer windings $\omega_iP=2\pi k_i$ and corresponding inverse-winding radius ratios at fixed speed. Relative phases must be taken through the correct integer-lattice quotient; a convenient pair of phase combinations need not distinguish every orbit when winding integers exceed one. Rotating a circle's frame while shifting its phase is a representation redundancy. Incommensurate windings give a torus trajectory rather than a finite-period cycle. Homothetic scaling balances a raw $L^{-2}$ ledger against required $L^{-1}$ curvature and gives at most one positive scale for a fixed curved shape and coupling. It is not an existence theorem. Likewise, a small-radius obstruction assumes bounded external contributions; simultaneous singular cross rows or leading cancellations leave that hypothesis class.

### 6.2. A complete census with failed acceleration closure

The [quarantined reference calculation](analysis/quarantined-hypotheses-and-prescribed-reference-cases.md) fixes three equal-radius antipodal pairs in orthogonal planes with phases $0,2\pi/3,4\pi/3$ and normalized $c_f=R=\omega=1$. Its geometry theorem gives thirty ordinary distinct-label roots at every reception time and no self root. That complete census does not make it a solution. Write $\lambda=\kappa q_0^2>0$ for the common coupling, so the unit-coupling total $\mathbf A^{(0)}$ satisfies $\mathbf A^{\mathrm{ord}}=\lambda\mathbf A^{(0)}$. The retained [time-zero coordinate receipt](evidence/fsc-004-t0-six-path-mpmath-receipt.v1.json), produced at 100-digit precision, records these unit-coupling necessary-condition failures:

| Relative polarity orientation | Receiver and failed quantity | Recorded value, rounded |
| --- | --- | --- |
| $(1,1,1)$ | $1+$, $\mathbf V\cdot\mathbf A^{(0)}$ | $-0.3655392199$ |
| $(1,1,-1)$ | $1+$, $\mathbf V\cdot\mathbf A^{(0)}$ | $-0.3655392199$ |
| $(1,-1,1)$ | $1+$, binormal component of the response to $\mathbf A^{(0)}$ | $+0.8925757279$ |
| $(1,-1,-1)$ | $2+$, $\mathbf V\cdot\mathbf A^{(0)}$ | $-0.3301014266$ |

Positive common coupling scales both the ordinary total and its minimal projected response by $\lambda$; it changes these magnitudes while preserving the negative forward signs and nonzero binormal component. All four orientations therefore fail under the minimal response for every $\lambda>0$. This is a measured negative for the prescribed geometry, supported by a time-zero arithmetic instrument together with the response's positive homogeneity; it is not an interval theorem about all other geometries or a test of an unselected redirection law. The separate 2,881-time sample scan is diagnostic, not a certified all-time floor. The antipodal labels share spatial carrier circles and the orthogonal circles intersect, so this object is a loop in labeled configuration space, not a six-component spatial link.

### 6.3. The cycle diagnostic is not an action account

Accounts remain unresolved even for the compatible binary. Its raw per-label cycle diagnostic is

$$
\mathcal J_i^{\mathrm{raw}}=\int_0^P\mathbf V_i\cdot\mathbf A_i^{\mathrm{ord}}\,dT=2\pi c_f^2\frac{\sin D}{D},\qquad
\mathcal J_i^{\mathrm{eff}}=0
$$

In normalized units the raw value is approximately $5.72658$ per label. It has velocity-squared dimensions and is not an energy or action balance. The proposed response has no account storing the removed component. A native action requires separately derived conjugate variables and a cycle integral; an energy-frequency relation needs its own identity, and quantization needs an additional discrete closure argument. No Planck value or mass-based formula supplies those steps.

### 6.4. Transitions and an infinite background

A radius/frequency transfer between boundary circles must preserve $R^-|\omega^-|=R^+|\omega^+|=c_f$, but endpoint kinematics do not provide a transition. One needs its guard, event or continuous update, complete roots, outgoing history and wake/account balance. Finite standoff, transverse redirection, phase exhaustion, limiting transverse response, collective transition failure and sea-driven rebinding remain guessed mechanisms or conditional targets. A purely forward input has no unique transverse direction from isotropy alone. An infinite background also needs more than local finiteness: inverse-square decay and three-dimensional shell growth can leave a nonintegrable far tail. Exhaustion, cancellation rate and boundary/order independence must be proved before a many-assembly account is defined.

## 7. Remaining obligations for a complete dynamics

The ceiling proposal provides useful conditional mathematics without becoming a complete alternative dynamics. Its regular finite-channel problem has a local theorem; its exact circular chart has compatible acceleration and unique local continuation at the declared scope; its mirror event has a finite proposed update and a demonstrably multivalued continuation relation. These statements have different premises and cannot substitute for one another.

The remaining scientific obligations are specific: an adopted or derived reason for any path ceiling or replacement update; a complete nonordinary event atlas and reception law; a causal selector or transition probability if a single predictive future is intended; a uniform perturbative circular evolution theorem before stability; a complete six-label residual zero or exclusion in a declared class; and native wake, action and conservation accounts. The preferred-frame comparison additionally needs an emergent comparison map, not a relativistic premise. The [compatibility decision](decisions/field-speed-ceiling-compatibility-decision.md) makes clear that any future adoption would require distinct model binding and coordinated corpus, solver, oracle and fixture changes while retaining historical open-model evidence.

Numerical verification must match these claims. Increment projection has a derived discrete nonexpansiveness estimate; practical runs still need independent root isolation, quadrature and accumulation bounds, declared convergence order, delay-floor stopping rules and propagation of history breaking points. A small transmitter factor with positive range and receiver floor calls for source-time integration; loss of those hypotheses calls for reclassification. High precision and repeated agreement with the same formula are not independent proof. The historical lobe-instrument gap remains open, and this manuscript has not rerun the receipts or reviewed its own mathematics independently.

The decisive lesson of the lane is therefore a separation of obligations: restricting velocity changes which histories are admitted; a response specifies regular acceleration; an event law assigns singular ownership and immediate data; and a continuation law determines what those data can do. The first three have conditional constructions here. The exact-mirror example shows why the fourth cannot be supplied by inference from them.
