# Master Equation Closure: Coincidence, Speed Constraints, and Causal Continuation

## 1. What it means to close a dynamical law

A dynamical law is complete only on a domain where it determines what can happen. Writing an acceleration formula does not by itself establish that the formula assigns a finite value to every allowed state, produces an evolution, or determines a unique future. Those questions become particularly demanding when the acceleration depends on an entire past history and the number of contributing interactions can change during motion.

Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$, describes primitive point entities called architrinos moving in three-dimensional Euclidean space with one absolute time. Each architrino has a persistent identity and a polarity. Its past motion leaves an expanding wake: an emission made at a particular position spreads at the fixed wake speed $c_f$ about that emission position. Later motion of the emitter does not move the center of an already emitted surface. A receiver interacts with those past emissions whose expanding surfaces reach its present position. The Master Equation specifies acceleration directly from these receptions. Primitive mass, a conventional force law, and a separately postulated magnetic field are not premises of this description.

The central scientific question is whether this delayed interaction law supplies a consistent and predictive evolution. The question of coordinate coincidence gives a concrete way to investigate it: can two initially separated architrinos occupy the same position at the same absolute time? An exclusion theorem would identify a property of the dynamics. A construction reaching coincidence would identify an allowed event. A failure of the equation before coincidence would identify a limit of its current predictive domain. These are different outcomes, and none alone establishes that all singular behavior is absent.

This manuscript develops the connections among regular evolution, coordinate coincidence, self-interaction boundaries, a proposed field-speed constraint, infinite populations, and conserved accounts. Derived results are stated with their assumptions. A candidate modification remains a proposal even when a theorem establishes a useful property of that candidate. Numerical measurements illustrate the independently justified mathematical statements; they do not substitute for existence or uniqueness proofs.

## 2. The equation reads history

### 2.1 Emission and reception

Write $\mathbf X_i(T)$ for the position of receiver $i$ at absolute time $T$, and $\mathbf V_i(T)$ for its velocity. An emission by transmitter $j$ at an earlier time $s$ reaches this receiver when

$$
r_{ij}(T,s)=\|\mathbf X_i(T)-\mathbf X_j(s)\|=c_f(T-s),\qquad s<T.
$$

A solution $s$ is a causal root. The range $r_{ij}$ measures separation from the earlier emission position, not from the transmitter's present position. There may be no root, one root, or several roots for the same ordered pair of identities. Positive-delay self roots, with $j=i$, are possible when a particle encounters its own past wake. The exact zero-delay self diagonal $s=T$ is excluded from the regular interaction sum.

At a positive-range root, define the unit direction from emission to reception and two velocity factors:

$$
\mathbf n_{ij}=\frac{\mathbf X_i(T)-\mathbf X_j(s)}{r_{ij}},\qquad
D_t=c_f-\mathbf n_{ij}\cdot\mathbf V_j(s),\qquad
D_r=c_f-\mathbf n_{ij}\cdot\mathbf V_i(T).
$$

The subscripts distinguish transmitter and receiver. On a simple root, meaning $D_t\ne0$, the canonical acceleration contribution is

$$
\mathbf a_{ij,s}
=\kappa\,\sigma_{ij}|q_iq_j|
\frac{c_f}{r_{ij}^{2}|D_t|}\mathbf n_{ij},
\qquad
\ddot{\mathbf X}_i(T)=\sum_j\sum_{s\in\mathcal C_{ij}(T)}\mathbf a_{ij,s}.
$$

Here $\kappa$ is the coupling coefficient, $|q_iq_j|$ is the product of polarity magnitudes, $\sigma_{ij}$ is positive for equal polarities and negative for opposite polarities, and $\mathcal C_{ij}(T)$ is the complete set of admitted positive-delay roots. Equal polarities contribute away from the emission site; opposite polarities contribute toward it. This is an acceleration law, without a primitive mass factor.

Differentiating the root equation gives

$$
\frac{ds}{dT}=\frac{D_r}{D_t}.
$$

This ratio describes how the sampled emission time changes as reception advances. It can vanish or become negative without becoming an extra acceleration multiplier. For example, a receiver can momentarily keep reading the same emission time while its acceleration remains nonzero. Confusing this sampling rate with acceleration strength changes the equation.

All numerical examples below use normalized wake-speed units, $c_f=1$. Symbolic formulas retain $c_f$ where its role matters.

### 2.2 Initial data and regular evolution

A delayed law needs more initial information than positions and velocities at one instant. One must specify the relevant past paths, including their continuation farther into the past or a proof that older emissions cannot contribute. A finite retained segment is complete only when the omitted past has been excluded mathematically. Prescribing such a past for a forward initial-value problem does not assert that the same law generated that past at all earlier times.

On a regular interval, a finite complete collection of simple roots can move continuously with the histories. Positive lower bounds on the active ranges and transmitter factors, together with appropriate history regularity and exclusion of additional roots, give controlled acceleration and its dependence on the data. Local existence and uniqueness then become questions about a regular delayed equation. They must be proved on that domain; counting a few numerically located roots is insufficient because a missed root changes the acceleration itself.

The boundaries of this regular description include vanishing delay, a zero transmitter factor, loss of history control, and failure of convergence when infinitely many transmitters contribute. These boundaries need not occur together. A causal-root fold at positive delay is a merger of roots, whereas a self root born from the excluded zero-delay diagonal has a different geometry.

## 3. Coordinate coincidence and delayed singularity

### 3.1 Three distinct questions

For two different identities $i\ne j$, coordinate coincidence means

$$
\mathbf X_i(T_*)=\mathbf X_j(T_*).
$$

The identity labels remain distinct at that event. The equation instead samples differences of the form $\mathbf X_i(T)-\mathbf X_j(s)$ with $s<T$. Therefore a vanishing present separation does not imply that an active delayed range vanishes. Conversely, a self-interaction singularity can arise while every pair of distinct particles remains separated.

The distinction separates three investigations. Coordinate reachability asks whether the evolving positions can meet. Root reachability asks whether the evolving history produces a particular causal-root boundary. Continuation asks whether the equation determines a future through an attained boundary. An answer to one is evidence for another only when the required implication is actually proved.

### 3.2 A finite construction reaching coordinate contact

A derived finite construction reaches distinct-label coordinate contact as the finite endpoint limit of a regular incoming evolution on one declared forward initial-history class. It uses four architrinos and complete prescribed pasts, followed by evolution of all four receivers under the Master Equation. Its purpose is an existence result; it does not settle the stationary two-particle problem or a general populated-universe claim.

Choose unit polarity magnitudes and $\kappa=10^{-6}$. Two target particles have earlier stationary positions $(2,0,0)$ and $(-2,0,0)$. Two environmental particles remain stationary before release at $(1,1.5,0)$ and $(-1,1.5,0)$. Both right-hand labels have polarity $+1$, and both left-hand labels have polarity $-1$. For $-1\le T\le0$, the target x coordinates are $\pm f(T+1)$, where

$$
f(v)=2-3.97v^2+1.98v^3,\qquad 0\le v\le1.
$$

The targets are thus released at x coordinates $\pm0.01$ with inward speeds $2$. Their earlier cubic joins are specified inputs, not claimed solutions of the equation. Their positions and velocities join continuously to the stationary pasts. The two environmental receivers are also released into evolution at $T=0$.

The complete incoming census has fourteen simple roots, all sampling the earlier stationary parts of the paths. The two environmental self channels are empty. The targets' existing self roots have delays near $2$; they are not newborn roots. Bounds on all remaining candidate emissions exclude roots on the joins and the recent evolving segments before contact. Active ranges exceed $1.6$, so at most four contributions per receiver give

$$
\|\mathbf A_i\|\le\frac{4\times10^{-6}}{1.6^2}<M,
\qquad M=2\times10^{-6}.
$$

The acceleration changes each velocity by less than $10^{-8}$ over the relevant interval. Because every contributing emission remains on a stationary segment, the incoming delayed equation reduces to a smooth field evaluated at each current receiver position. This reduction freezes already emitted locations, not the future environmental trajectories. Local uniqueness preserves reflection symmetry. The right target's x acceleration is inward, while the two targets have the same transverse displacement. Contact reduces to the vanishing of its positive x coordinate.

With $x_0=0.01$ and inward speed $U=2$, scalar comparison yields

$$
\frac{2x_0}{U+\sqrt{U^2+2Mx_0}}<T_*<\frac{x_0}{U},
$$

or

$$
0.0049999999875\ldots<T_*<0.005.
$$

This is a finite first-contact limit of the incoming EOM evolution, with finite limiting position and velocity. It assigns no post-contact equation value. An independent numerical oracle corroborates a pre-contact portion; the contact conclusion comes from the complete root bounds and comparison argument, not a numerical step across the event.

No positive-delay self root approaches zero delay in this construction. Thus it establishes coordinate contact without establishing the self-boundary event discussed below. It also gives no frequency or probability for contact. Reflection symmetry is a special condition, and a proof of generic behavior requires an admitted perturbation class and persistence of the complete root census.

### 3.3 The stationary two-particle encounter

A more direct control starts two equal-magnitude, opposite-polarity particles at rest on a line, with stationary complete earlier histories. Write their positions as $\pm q(T)\mathbf e$, where $\mathbf e$ is a fixed unit vector, $q>0$ is half the present separation, and $u=-q'$ is inward speed. On the monotone incoming branch, there is one partner root per receiver and no positive-delay self root.

For partner emission time $s$, put $R=q(T)+q(s)=T-s$. With positive coupling magnitude $K$, the inward acceleration is

$$
u'(T)=\frac{K}{R^2[1-u(s)]}.
$$

The complete incoming analysis establishes that the first boundary is $u(T_*)=1$ while $q(T_*)>0$ and $R_*>0$. The partner factor $1-u(s)$ remains positive: the partner root is still simple. No positive-delay self root exists at the endpoint itself. This is a derived ordering result for the stated stationary input and regular branch, not a universal speed ceiling.

The result answers a precise question: the regular incoming solution does not reach coordinate contact before it reaches a field-speed event. It does not prove that the particles rebound, pass through each other, or remain forever separated. Those claims require a continuation.

## 4. Why the unchanged continuation fails, and what a candidate repairs

### 4.1 A self root born at positive particle separation

Translate the stationary pair's field-speed event to $T=0$. Suppose a continuous regular continuation enters $u(T)>1$. For either particle, let an inward coordinate be $x(T)$ and define $h(T)=x(T)-T$. Before the event $h$ decreases; on the proposed superfield side it increases. A newborn self root matches a past value to the present one:

$$
h(s)=h(T),\qquad s<0<T.
$$

Equivalently, the average inward speed over this chord is exactly the wake speed. Let $\delta=T-s$, $w_-=1-u(s)>0$, and $w_+=u(T)-1>0$. Exact differentiation converts the self contribution into

$$
A_{\rm self}\,dT
=\frac{K}{\delta^2(w_-+w_+)}\,d\delta.
$$

At birth both the delay and the velocity gaps approach zero. Their sum is eventually smaller than a fixed positive constant, so the measure dominates a positive multiple of $d\delta/\delta^2$, whose integral diverges. The coefficient has a fixed inward sign. The persistent partner contribution stays bounded, so it cannot cancel the newborn divergence. Opposite vector contributions at the two different receivers do not cancel either receiver's own acceleration or their relative approach.

Consequently, the unchanged sharp-root law has no regular continuation with locally finite accumulated acceleration through this crossing on the specified stationary history. Assigning a finite value at the single excluded endpoint cannot repair a divergent integral on its open neighborhood. This is a limitation of that law on that input; it is not a selected alternative motion.

### 4.2 Regularity has several meanings

An unbounded instantaneous acceleration is not automatically an infinite velocity change. For a transverse fold at positive delay, the two roots can contribute an inverse-square-root dependence on time from the fold. Such a singularity is locally integrable. The self-birth measure above has stronger divergence. The geometry and signed accumulation must therefore be evaluated, rather than grouping every exceptional root into one category called a singularity.

A separate derived exclusion result gives a positive lower bound on recent self delays when the recent self contributions lie in a common forward cone, recent velocities remain bounded, the opposing part of the remaining acceleration has an integrable projection, and the initial and entering root sections have positive delays. Complete finite simple-root sections and locally absolutely continuous receiver velocity are part of these hypotheses. The cone makes the relevant projected self contributions reinforce rather than cancel. The estimate does not exclude singular lineages or histories for which these controls fail.

### 4.3 A conditional quintic continuation

One proposed boundary rule changes the strength of a root only when its history identifies it as born from the self diagonal. Near such a birth, its multiplier vanishes as the fifth power of a dimensionless local geometric coordinate. Ordinary roots retain their original rule. Selecting this multiplier as physical is an additional constitutive hypothesis: the regular equation does not derive it merely by encountering a divergence.

On the exact stationary mirror input, the candidate has a derived short existence-and-uniqueness result. The permitted continuations preserve mirror symmetry, have continuous velocity at the incoming endpoint and locally absolutely continuous velocity afterwards, and satisfy the complete candidate equation almost everywhere. They include no additional singular impulse or update and omit no undefined row by convention.

The local rule can be written directly from the incoming history. Write the newborn emission as $s=-y$, set $\alpha(y)=u_-'(-y)$ for the incoming acceleration, and let $w(y)=1-u_-(-y)$. The delay is $\delta=T+y$. In the candidate's normalized coordinates before its release threshold, the geometric coordinate is $\varrho=\delta\alpha(y)$ and the multiplier is $\varrho^5$. The resulting inward self acceleration is

$$
S=\frac{K\delta^3\alpha(y)^5}{w(y)}.
$$

The proof reconstructs the newborn root from the incoming history and solves for the outgoing trajectory, rather than prescribing a path that happens to give a finite integral. If $a_*>0$ is the finite incoming acceleration and $z(T)=\int_0^T[u(v)-1]\,dv$, positivity of the partner contribution places an actual regular solution in a region where $z(T)$ is proportional to $T^2$. In that region $y$ is proportional to $T$, $w(y)$ is proportional to $y$, and the displayed self contribution is $O(T^2)$ with a bounded derivative with respect to $z$. A contraction of the integrated equation yields a short solution. Every continuation in the stated regular mirror class enters the same region, establishing uniqueness as a local history germ: any two such solutions agree on a sufficiently short common interval.

This conditional result demonstrates that the existing candidate supplies more than a finite value on a chosen path. It does not derive the candidate from the primitives, prove independence from different smoothing procedures, continue through the later release of its multiplier, establish nonsymmetric continuation, or supply conserved accounts. The unchanged-law obstruction and the candidate theorem concern different equations and are compatible conclusions.

There is also a distinction between a well-defined sharp candidate and a well-defined approximation problem. Naming hard cutoffs or smoothing kernels does not specify how they act on the quintic multiplier, its root history or its event classification. Those parameterized operators must be defined before their evolved solutions can be compared. The sharp candidate's local uniqueness alone cannot prove convergence of unspecified approximations, and a regulator for a different acceleration weight does not supply that missing definition.

## 5. What imposing a field-speed ceiling teaches

A bound on particle speed is a separate hypothesis from the fixed propagation speed of the wake. The canonical velocity domain permits finite speeds above $c_f$. The ceiling remains a speculative, unadopted alternative: its conditional mathematical results do not establish that nature imposes it. Investigating a constraint $\|\mathbf V_i\|\le c_f$ asks whether a modified dynamics can remain inside that bound and what consequences follow; it does not establish that the unmodified equation enforces the constraint.

For a path whose speed is bounded strictly below $c_f$ on every chord under consideration,

$$
\|\mathbf X(T)-\mathbf X(s)\|
\le\int_s^T\|\mathbf V(v)\|\,dv
<c_f(T-s).
$$

Thus it has no positive-delay self root on those chords. Under a non-strict ceiling, equality requires saturation of both inequalities: speed must equal $c_f$ almost everywhere and velocity must maintain one fixed direction along the chord. This rigidity identifies exactly why straight field-speed segments are exceptional. It does not assign their degenerate roots an acceleration or continuation.

The stationary mirror encounter also shows why clipping a computed velocity is not a derivation of a ceiling. At its first field-speed event, the existing partner acceleration still points inward along the motion. Keeping the velocity within a prescribed ball requires an additional response. The response, the treatment of singular receptions and the retained history must belong to one declared alternative dynamics. A ceiling can eliminate some self-intersection geometry while introducing a new question about how boundary motion is selected.

### 5.1 A constraint requires a response law

Let $c_a$ denote an imposed maximum particle speed, distinct from the wake speed $c_f$. A studied alternative first computes the complete finite ordinary acceleration $\mathbf A_{\rm ord}$ and then removes its outward radial component at the velocity boundary. With $\hat{\mathbf v}=\mathbf V/\|\mathbf V\|$ and $(b)_+=\max(b,0)$, the proposed response is

$$
\dot{\mathbf V}=\begin{cases}
\mathbf A_{\rm ord},&\|\mathbf V\|<c_a,\\
\mathbf A_{\rm ord}-(\hat{\mathbf v}\cdot\mathbf A_{\rm ord})_+\hat{\mathbf v},&\|\mathbf V\|=c_a.
\end{cases}
$$

This expression holds almost everywhere along solutions satisfying the proposed absolute-continuity and radial normal-cone response assumptions; it is not a consequence of the speed inequality alone. Inward and tangential acceleration remain; only acceleration that would increase speed beyond the cap is removed. The complete ordinary sum must already exist before this operation. Projecting an undefined infinite sum does not define it.

If $c_a<c_f$, both velocity factors satisfy $D_t,D_r\ge c_f-c_a>0$, and the chord inequality excludes self roots. If $c_a=c_f$, straight characteristic intervals can occur: a whole interval of emissions can satisfy the same reception condition. If $c_a>c_f$, superfield root geometries remain possible. These are derived distinctions among the three proposed regimes.

### 5.2 Contact under the equal-speed constraint

For the mirror pair at its first field-speed event, the equal-speed response can sustain a conditional incoming segment

$$
q(T)=q_*-(T-T_*),\qquad
T_*\le T<T_c=T_*+q_*.
$$

The particles continue inward at unit speed and reach coordinate coincidence. The cap has excluded the superfield continuation from the previous chapter, but at contact a whole partner-emission interval lies on the reception geometry. The isolated-simple-root formula no longer defines that event.

A separate proposed event completion retains the distinct source labels and matches their event measures using exact mirror symmetry and one common linear conversion to acceleration impulse. Within that architecture the net event impulse is zero and position and velocity remain continuous. This cancellation is a statement about the declared event measure and map. It is not an event value derived from the unchanged ordinary root law, nor a reason to discard divergent receiver contributions in a different problem. The continuation theorem also requires the proposed complete labeled-history splice and event-ownership rules: the already accounted-for noncrossing event family is not counted again as a new ordinary reception. Velocity is absolutely continuous and the equation holds almost everywhere. Zero impulse alone does not supply these rules.

### 5.3 Finite continuation without a unique future

Even after that proposed event completion, the outgoing future is not uniquely selected. Put coincidence at $t=0$ and write the separating mirror coordinate as

$$
x(t)=t-E(t),\qquad x'(t)=1-m(t),\qquad E'=m.
$$

The function $m$ measures the deficit below unit speed, and $E$ is the accumulated deficit in position relative to straight unit-speed separation. The straight solution has $E=m=0$. For every prescribed waiting time $t_w>0$, another derived local solution remains exactly straight through $t_w$ and then satisfies

$$
E'=m,\qquad
m'=\frac{K}{2(t-E/2)^2},\qquad
E(t_w)=m(t_w)=0.
$$

The causal-root equation on this initial braking interval is $2s=E(t)+E(s)$. Its unique root lies in the preceding straight segment, so $s=E(t)/2$. The transmitter factor is $2$, and the ordinary opposite-polarity contribution slows the receiver. A complete local census excludes extra partner roots and new self roots. Thus the construction is a solution of the declared two-particle restart model, not only of an arbitrarily fitted scalar equation.

For positive $t_w$, the right-hand side is regular at onset. At zero onset it has the nonintegrable leading behavior $K/(2t^2)$, excluding immediate sustained braking in this solution class. Straight separation and every positive waiting time remain available. The equation specifies the braking once its onset is supplied, but the admitted model has no state evolution that selects that onset. It assigns neither a preferred future nor probabilities to the alternatives.

This is a conditional nonuniqueness theorem for the proposed cap and event architecture. It establishes that a speed ceiling can replace one obstruction with a different closure problem: a finite continuation relation that does not determine a single future. Multiple mathematical continuations do not establish randomness, free will, or a physical process selecting among them.

### 5.4 A separate circular compatibility result

The ceiling investigation also supplies a positive all-past circular control. For antipodal circular paths at the imposed speed, set $0<\lambda=c_a/c_f\le1$. The partner half-delay angle $\xi$ obeys

$$
\xi=\lambda\cos\xi.
$$

On the relevant interval the left side increases and the right side decreases, giving one partner root. A self root would require $\eta=\lambda|\sin\eta|$ with $\eta>0$, which is impossible because $|\sin\eta|<\eta$. The partner acceleration has inward radial and forward tangential components. The proposed cap response removes the forward component and leaves a radial compatibility condition for the circle's radius.

This is an exact compatibility result for an all-past circular history under the modified dynamics. It does not prove that general initial histories form such a circle, that perturbations remain near it, or that the circle is stable. Existence of a special solution and dynamical selection of that solution remain distinct questions.

### 5.5 What adopting the ceiling would cost

A ceiling would remove mechanisms used in the open-speed description. A history confined wholly below or at wake speed cannot contain the earlier superfield interval responsible for a later superfield-history self reception. Circular self-hit branches requiring above-wake-speed motion, multiple separated simple roots within one channel, and proposed binary self-hit barriers dependent on such motion cannot simply be retained. Assembly and braid constructions that use those histories would need new admissible paths and new dynamical derivations. The original conditional results do not become false; their hypotheses are excluded by the alternative model.

One unfavorable control makes that distinction concrete. A high-precision acceleration diagnostic of a prescribed six-path orthogonal-circle geometry found that the minimal ceiling response fails the required vector acceleration at the initial instant for all four inequivalent relative polarity orientations. A receiver either slows or acquires acceleration perpendicular to its prescribed orbital plane. The independently derived thirty-root census for that geometry remains valid, but root correctness does not make the prescribed paths solutions. This measured result rejects that particular geometry under that particular response; it does not exclude every capped assembly.

The constrained response also supplies no energy, momentum or angular-momentum account for the removed acceleration component. Calling that component lost energy would import an account that has not been derived. A complete alternative needs independently defined balances on its own constrained and event dynamics, as well as treatment of exceptional events beyond the exact mirror case. The ceiling therefore remains an investigation of a different model with substantial consequences, rather than an established simplification of the canonical theory.

## 6. Infinite populations and cancellation

### 6.1 What the stationary lattice establishes

A finite population and an infinite population pose different summation problems. For an infinite population, the number of particles in a three-dimensional shell grows with its volume, whereas one stationary contribution decreases as inverse distance squared. Magnitudes need not have a finite total. Cancellation must be specified and proved for the actual delayed contributions.

A useful complete-history control places equal-magnitude alternating polarities at the cubic anchors $\mathbf z_j=\ell j$, with $j\in\mathbb Z^3$ and sign $(-1)^{j_1+j_2+j_3}$. Each particle is stationary throughout its earlier history. Grouping the eight corners of consecutive lattice cells cancels the leading spatial moments through degree two. For a block a distance $R$ away, its remaining acceleration is $O(R^{-5})$. A shell with radii $R$ and $2R$ contains $O(R^3)$ blocks, so its contribution is bounded by $O(R^{-2})$. Summing these bounds over successively doubled shells gives a finite tail.

At a stationary receiver anchor, this selected grouped sum is exactly zero. Reflection through that anchor pairs equal-polarity sources with opposite acceleration vectors in finite symmetric cubes. To transfer the cancellation to the fixed eight-source grouping, one must also control the unmatched boundary faces, edges and corners. Their total tends to zero, giving the same zero limit. Exact cancellation is therefore a derived property of this reference, despite divergence of the sum of individual magnitudes. It does not establish equality of every possible source ordering.

### 6.2 Finite changes and infinitely coordinated changes

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

### 6.3 One sufficient proposed history class

A mathematical proposal restores finite sums and controlled relative derivatives by restricting the histories and strengthening the way their differences are measured. In normalized units, let $\mathbf u_j(s)=\mathbf X_j(s)-\mathbf z_j$ for all $s\le0$. Require, in addition to the regular root and separation conditions,

$$
\sum_{m=0}^{3}\ell^{m-1}\|\mathbf u_j^{(m)}(s)\|
\le A(1+|s|/\ell)^{-p}+b_j,
\qquad p>1,\qquad A\ge0,\qquad b_j\ge0,\qquad\sum_jb_j<\infty.
$$

The derivatives include displacement, velocity, acceleration and jerk of the supplied history. The first term permits independent deviations across the lattice but requires them to decrease sufficiently far into the past. The summable allowances $b_j$ permit persistent deviations, including arbitrary finite source modifications satisfying the original bounds. No acceleration contribution is multiplied by these allowances; they define which histories are admitted.

Why does a distant-past condition help a spatial sum? A source at range $R$ contributes from a time roughly $-R$ when $c_f=1$. Its allowed temporal deviation is consequently bounded by order $R^{-p}$. Combined with an inverse-square row and the shell population, the leading shell correction has order $R^{1-p}$. The dyadic series converges for $p>1$. Full root and derivative estimates justify this mechanism under the proposal's complete assumptions. Existing controls show that the strict threshold cannot be weakened within this broad independent-history envelope family.

The corresponding stronger norm measures a position-and-velocity difference by the least temporal-envelope budget plus the sum of its persistent allowances. Between admitted $C^3$ histories sharing bounded envelope budgets and regular root margins, the acceleration map has a controlled relative derivative and remainder, with uniform tails. The linear derivative expression can act on suitable $C^1$ directions, but arbitrary small $C^1$ changes need not remain admitted histories. These are derived sufficient estimates, not a selection of this distant-past background as physical. They do not prove a common lifespan for mutually evolving particles, compatibility of all derivatives at the release cut, or preservation of the entire regular history domain. In particular, a well-defined initial acceleration is only the beginning of an infinite-population evolution theorem.

### 6.4 A common first evolution interval

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

### 6.5 The first nonstationary response

For the same explicit smooth compatible history, a further derived result identifies the first reception of the past disturbance. If $\ell$ is the lattice spacing, the entire population remains stationary through

$$
T_*=(\sqrt2-11/8)\ell.
$$

The acceleration is still zero at this onset. On a sufficiently short positive interval afterward, exactly 24 environmental labels move: 16 have leading displacement of fifth order in elapsed time, and eight have leading displacement of sixth order. Both targets and all other labels remain stationary on this interval. These are conclusions about solutions of the receiver equations, including feedback from receiver displacement, rather than evaluations of the acceleration at fixed anchors.

The extension preserves the smooth join, the original quantitative history bounds and the complete root census on a common short interval. All arriving emissions still precede the original release. Its existence therefore does not yet require reception of the newly generated source futures. The result remains conditional on the stated history and block-summation convention.

This establishes a nonstationary smooth continuation after the waiting interval. It does not finish the received pulse. Because the receivers have moved, the end of that pulse must be determined from their actual causal equations. Later reception of postrelease emissions requires a separate coupled-history estimate; neither target contact nor a globally preserved population class follows.

## 7. Wake transport, action, and conserved accounts

### 7.1 Geometry does not determine an account value

The emitted-surface picture already has a causal kinematic realization. For an emission by $j$ at time $s$, retain its identity, emission time, center $\mathbf C_{j,s}=\mathbf X_j(s)$, polarity, and expanding radius $a_{j,s}(T)$. Then

$$
\frac{d\mathbf C_{j,s}}{dT}=\mathbf0,\qquad
\frac{da_{j,s}}{dT}=c_f.
$$

Intersections with a receiver reproduce the regular causal roots and their transmitter factors. This is a derived description of geometry and transport. It does not determine how much energy or momentum an emission carries, whether reception spends anything, or how a singular event transfers an account. Nor does the existence of this representation prove that additional independent physical state variables are necessary or that a chosen representation is minimal.

A conserved completion must derive its account maps on the same evolution. For example,

$$
\Delta E_{\rm motion}+\Delta E_{\rm wake}+\Phi_E=0,
$$

with corresponding balances for vector momentum and angular momentum. Here $\Phi_E$ is outward account flux through the boundary of the chosen region. The motion and wake quantities are unknown functions to be derived; they are not supplied by importing single-particle mass or conventional kinetic energy. Defining the wake change to be whatever cancels the motion change would make the equation true by definition and would not explain conservation.

### 7.2 A local gradient identity does not supply a complete action

An action principle assigns a scalar functional to histories and derives an equation by requiring its first variation to vanish. One investigated characteristic-tail kernel was constructed to reproduce the required receiver-position derivative. With causal mismatch $g=T-s-R/c_f$, it satisfies a local identity of the form

$$
\left(\partial_R-c_f^{-1}\partial_g\right)K_\eta
=-\frac{\delta_\eta(g)}{R^2}.
$$

Here $K_\eta$ is that particular smoothed kernel and $\delta_\eta$ is a smoothed causal selector. The derivative follows the dependence of the causal mismatch on range. This identity is a genuine positive result for the receiver variation.

It does not establish a complete causal action. The same varied path point can also be a transmitter for later receivers, and the full distinct-particle variation contains a future-receiver term absent from the intended forward acceleration law. Independently, the selected self kernel has a near-diagonal lower bound leading to a logarithmically divergent integral along locally Lipschitz self histories. Removing the single diagonal point does not remove that neighborhood divergence. The frozen action and its stated self-only repair class therefore fail their complete requirements. This rejection does not exclude every action or every conserved history functional.

### 7.3 What account obstructions actually exclude

One proposed architecture treats acceleration observations as expenditures from a finite positive source budget. If arbitrarily many supplied receiver channels each demand the same nonzero acceleration variation, but the total allocated budget is bounded, at least one allocation must tend to zero as the receiver count grows. A common bound making supported acceleration vanish with allocation then contradicts the canonical nonzero observation. This excludes that finite-funded-observation architecture under its universal-channel assumptions. It does not identify acceleration with energy expenditure or prove that every coupled physical population realizes those independent channels.

A second obstruction concerns a receiver driven by one independently supplied source history. Consider a scalar composed of an isotropic present-speed function and an interaction term depending on separation and finitely many derivatives of the source history. Requiring it to be conserved for every regular supplied input is too strong. The complete chain rule successively eliminates the highest independent source derivatives. Stationary-source inputs then force a quadratic speed term paired with an inverse-range term. Allowing source motion leaves an uncancelled rate proportional to the source's radial velocity, forcing the nonconstant coefficient to vanish.

The conclusion is a derived impossibility for that universal driven-receiver scalar ansatz. Coupled EOM trajectories do not have independently variable source derivatives in the same way. Source-inclusive transfers, full-history functionals, and interaction terms with more general receiver dependence fall outside the theorem. The result narrows a construction class; it does not prove that the full theory cannot conserve accounts.

Finally, cancellation of a signed total does not make its total variation finite. If an age-preserved emission has a nonzero time-independent angular density $b(\omega)$, its accumulated total variation over a past duration $H$ is

$$
\|\mu_H\|_{\rm TV}
=H\int_{S^2}\|b(\omega)\|\,\frac{d\omega}{4\pi}.
$$

The sphere $S^2$ indexes directions, and total variation adds magnitudes rather than cancelling signs. A vector density can have zero net integral on each sphere while this quantity grows without bound. Finite local accounts can still exist. A global account with finite total variation requires assumptions addressing the complete past; a conditionally summed global account requires a separately specified convergence and conservation argument.

## 8. What these results establish about closure

The investigations separate four properties that are easily conflated. A finite coordinate-contact construction establishes reachability within one forward-history class. The stationary pair's earlier self-boundary obstruction establishes failure of the unchanged regular continuation on a different input. A quintic candidate supplies a unique short mirror continuation only after modifying the boundary rule. A proposed speed cap and event completion can supply finite passage while leaving multiple future branches. None of these results contradicts the others: their histories, event types and equations differ.

Infinite-population summation adds a distinct requirement. Exact stationary cancellation and finite modifications are viable initial calculations under a selected reference, while independently coordinated complete histories can destroy convergence. A sufficient restricted history class addresses that functional problem without yet establishing a self-consistent evolving population. Account obstructions likewise constrain specific constructions without selecting a conserved completion or ruling out every possible one.

A complete theory must connect these levels on one declared domain and update. It must identify the histories that can occur, include every admitted reception, determine a solution with the claimed regularity, and specify what happens at reachable exceptional events. If unique prediction is claimed, the state must select the continuation rather than leave a waiting time or boundary choice as external data. If conservation is claimed, its quantities and transfers must be independently defined and valid on that same evolution.

Coordinate coincidence is therefore a central diagnostic of the Master Equation, but its scientific value is broader than a yes-or-no collision answer. It reveals which aspects of geometry control the update, which exclusions depend on special histories, and where additional assumptions enter. Closure advances when these distinctions become theorems or explicit limitations, and when a proposed completion resolves them together without hiding an undefined sum, a missing root, an unselected future, or a residual-defined account.
