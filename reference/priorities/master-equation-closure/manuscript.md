# Master Equation Closure: History, Singular Events, Populations, and Conserved Accounts

## 1. What it means to close a dynamical law

A dynamical law is complete only on a domain where it determines what can happen. Writing an acceleration formula does not by itself establish that the formula assigns a finite value to every allowed state, produces an evolution, or determines a unique future. Those questions become particularly demanding when the acceleration depends on an entire past history and the number of contributing interactions can change during motion.

Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$, describes primitive point entities called architrinos moving in three-dimensional Euclidean space with one absolute time. Each architrino has a persistent identity and a polarity. Its past motion leaves an expanding wake: an emission made at a particular position spreads at the fixed wake speed $c_f$ about that emission position. Later motion of the emitter does not move the center of an already emitted surface. A receiver interacts with those past emissions whose expanding surfaces reach its present position. The Master Equation specifies acceleration directly from these receptions. Primitive mass, a conventional force law, and a separately postulated magnetic field are not premises of this description.

The central scientific question is whether this delayed interaction law supplies a consistent and predictive evolution. The question of coordinate coincidence gives a concrete way to investigate it: can two initially separated architrinos occupy the same position at the same absolute time? An exclusion theorem would identify a property of the dynamics. A construction reaching coincidence would identify an allowed event. A failure of the equation before coincidence would identify a limit of its current predictive domain. These are different outcomes, and none alone establishes that all singular behavior is absent.

This manuscript develops the connections among regular evolution, coordinate coincidence, self-interaction boundaries, a proposed field-speed constraint, infinite populations, and conserved accounts. Derived results are stated with their assumptions. A candidate modification remains a proposal even when a theorem establishes a useful property of that candidate. The numerical measurements reported here are inherited from the retained analyses and their independent reviews. They are attributed historical observations, with no new execution or external verification implied; they do not substitute for existence or uniqueness proofs.

## 2. The equation reads history

### 2.1. Emission and reception

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

### 2.2. Initial data and regular evolution

A delayed law needs more initial information than positions and velocities at one instant. One must specify the relevant past paths, including their continuation farther into the past or a proof that older emissions cannot contribute. A finite retained segment is complete only when the omitted past has been excluded mathematically. Prescribing such a past for a forward initial-value problem does not assert that the same law generated that past at all earlier times.

On a regular interval, a finite complete collection of simple roots can move continuously with the histories. Positive lower bounds on the active ranges and transmitter factors, together with appropriate history regularity and exclusion of additional roots, give controlled acceleration and its dependence on the data. Local existence and uniqueness then become questions about a regular delayed equation. They must be proved on that domain; counting a few numerically located roots is insufficient because a missed root changes the acceleration itself.

The boundaries of this regular description include vanishing delay, a zero transmitter factor, loss of history control, and failure of convergence when infinitely many transmitters contribute. These boundaries need not occur together. A causal-root fold at positive delay is a merger of roots, whereas a self root born from the excluded zero-delay diagonal has a different geometry.

### 2.3. How a regular root changes under perturbation

A root supplies both an acceleration value and a sensitivity to changes in the history. These are different mathematical objects. Work in normalized units and put $D=1-\mathbf n\cdot\mathbf v$, where $\mathbf v=\mathbf V_j(s)$ is the sampled transmitter velocity. For a displacement $\mathbf b_i$ of the receiver and a direct displacement $\mathbf b_j$ of the transmitter at the unperturbed emission time, implicit differentiation gives

$$
\delta s=-\frac{\mathbf n\cdot(\mathbf b_i-\mathbf b_j)}{D},\qquad
\delta\mathbf v=\delta\dot{\mathbf X}_j(s)+\mathbf A_j(s)\delta s.
$$

The second term in the velocity variation arises because the sampled time moves. The acceleration value at a fixed root does not depend on transmitter acceleration, but its derivative generally does. A fixed-receiver gradient and a derivative with respect to arbitrary past histories therefore cannot be interchanged. Uniform bounds on source acceleration, together with a stated history norm, are needed when a proof uses this sensitivity.

For the more restricted variation holding the entire transmitter history fixed, define

$$
M=I+\frac{\mathbf v\otimes\mathbf n}{D},\qquad
N=\frac{(I-\mathbf n\otimes\mathbf n)M}{r},\qquad
\mathbf h_r=\frac{\mathbf n}{D},\qquad
\mathbf d_D=-N^{\mathsf T}\mathbf v+\frac{\mathbf n\cdot\mathbf A_j(s)}{D}\mathbf n.
$$

Here $I$ is the Euclidean identity, $\otimes$ denotes the outer product, $\mathbf h_r$ is the gradient of range, and $\mathbf d_D$ is the gradient of $D$. If the signed row coefficient is $C=\kappa\sigma_{ij}|q_iq_j|$, the receiver-position derivative is

$$
D_{\mathbf X_i}\mathbf a
=\frac{C}{r^2|D|}\left[N-\mathbf n\otimes\left(\frac{2\mathbf h_r}{r}+\frac{\mathbf d_D}{D}\right)\right].
$$

This is a derived regular-chart tensor. In particular, differentiating only $r^{-2}$ discards moving-emission, direction, and transmitter-factor contributions. When source acceleration does not decay with distance, the resulting bound need not gain an additional inverse power of range. That fact becomes important for infinite populations.

### 2.4. A local scalar potential and its limits

On a connected simple-root chart on which $D$ has fixed sign, the scalar

$$
\Phi(\mathbf X_i)=\frac{C\operatorname{sgn}D}{r(\mathbf X_i,s(\mathbf X_i))}
$$

satisfies $-\nabla\Phi=\mathbf a$. The sign of $D$ is constant on this chart and $\nabla r=\mathbf n/D$, which gives the result directly. The scalar is a convenient representation of one regular receiver response. It is not a complete worldline action, an independently conserved energy, or a globally defined potential across root creation and disappearance.

The distinction can be seen on a local quadratic path crossing the wake speed. A root of delay proportional to $\tau$ can have acceleration proportional to $\tau^{-3}$, longitudinal receiver sensitivity proportional to $\tau^{-5}$, and transverse sensitivity proportional to $\tau^{-4}$. Finite integrated acceleration and finite sensitivity are consequently separate requirements. At an ordinary fold at positive range, the corresponding powers can instead be an inverse square root for acceleration and an inverse three-halves power for sensitivity. These are chart-specific asymptotics, not interchangeable singularity rules.

Smoothing the causal selector changes the finite-width acceleration law even where a limiting sharp root is regular. A fold calculation may give a width-dependent amplitude proportional to the inverse square root of width. Neither that scaling nor dimensional availability of a length made from the coupling and $c_f$ selects a physical width. A density assigned per path arclength also differs from a shell thickness; converting between path time and arclength introduces the path-speed factor and does not provide a regularization principle.

### 2.5. Complete root geometry before dynamical interpretation

A useful exact control uses piecewise affine source histories and affine receiver paths. On one collinear sign sector the causal residual is affine in emission time. Away from its zero derivative, solving it gives an affine emission map, which must then be clipped to the exact source and receiver intervals. Corners, interval endpoints, and excluded zero-delay roots belong to the census. A nonzero residual at each point of an open complement is weaker than a uniform positive complement gap.

Such constructions can establish complete branch identities, ordered event incidences, and negative controls for missing roots. Piecewise affine corners do not thereby become smooth solutions of the equation. The retained affine control distinguishes delayed-state root equations from velocity-sensitive acceleration and preserves source labels across corners rather than renumbering roots according to their instantaneous order. Its interval and provenance conventions are supporting definitions for later dynamical work.

Compact periodic geometry gives a different completeness control. On a torus with maximum distance $D_L$, a retained horizon greater than $D_L/c_f$ permits an intermediate-value argument for a distinct-source reception under the stated continuity assumptions. It proves neither a simple root nor a positive-delay self root, and the required horizon grows with the torus. Winding labels, shortest-distance cut boundaries, and chart overlaps must still be resolved. A compact laboratory construction is therefore not a proof of a noncompact infinite-population limit.

## 3. Coordinate coincidence and delayed singularity

### 3.1. Three distinct questions

For two different identities $i\ne j$, coordinate coincidence means

$$
\mathbf X_i(T_*)=\mathbf X_j(T_*).
$$

The identity labels remain distinct at that event. The equation instead samples differences of the form $\mathbf X_i(T)-\mathbf X_j(s)$ with $s<T$. Therefore a vanishing present separation does not imply that an active delayed range vanishes. Conversely, a self-interaction singularity can arise while every pair of distinct particles remains separated.

The distinction separates three investigations. Coordinate reachability asks whether the evolving positions can meet. Root reachability asks whether the evolving history produces a particular causal-root boundary. Continuation asks whether the equation determines a future through an attained boundary. An answer to one is evidence for another only when the required implication is actually proved.

Population and perturbation are separate assumptions. An isolated pair receives no contributions from other labels, but its supplied histories can still be perturbed. An infinite lattice is populated; the cancellation proved in Section 6 applies to its exact stationary reference. A perturbation means a change from a named reference history, and need not be random, continuously applied, or symmetry-breaking.

| Scenario | Environment and perturbation assumption | Where the distinction matters |
| --- | --- | --- |
| Stationary isolated pair, Section 3.3 | No external labels; exact collinear stationary pasts | The first-boundary ordering is derived for that input. Isolation alone does not prove the ordering for perturbed pair histories. |
| Four-particle contact, Section 3.2 | Two environmental labels evolve with the targets; the complete histories preserve reflection with polarity reversal | Environmental contributions are present, but the targets retain equal transverse displacements. Exact contact does not require an empty environment. |
| One-target transverse change, Section 3.7 | One supplied history breaks that reflection symmetry; all four futures still obey the equation | The stated change turns contact into a derived miss over the stated interval. It models a changed past, not an imposed future disturbance. |
| Stationary infinite lattice, Section 6.1 | Infinitely many sources; exact stationary histories and the declared grouping give zero total acceleration at each anchor | Equilibrium is a cancellation result. It is not evidence that the environment is absent or remains balanced after a disturbance. |
| Two modified lattice histories, Sections 6.4–6.7 | A disturbance is supplied on two fixed labels; every future, including the environment, is evolved | In the smooth example, delayed reception gives a stationary waiting interval followed by a nonstationary response. Conclusions depend on the reception interval and coupling range. |
| Coordinated distant-history changes, Sections 6.2 and 6.8 | Changes are prescribed across an infinite set, or a growing finite set, of source pasts | The resulting summation or continuity obstruction is not proved to arise by evolving a local disturbance. |

The environmental effect on an encounter is determined by its contribution to relative acceleration. Let $\mathbf E_i$ and $\mathbf E_j$ be the complete acceleration sums from labels outside the target pair, whenever those sums exist under the declared prescription. For $\mathbf d=\mathbf X_i-\mathbf X_j$, $\mathbf w=\dot{\mathbf d}$ and $\mathbf h=\mathbf d\times\mathbf w$, the environmental term in the derived identity $\dot{\mathbf h}=\mathbf d\times\ddot{\mathbf d}$ is

$$
\left.\dot{\mathbf h}\right|_{\rm env}
=\mathbf d\times(\mathbf E_i-\mathbf E_j).
$$

Population alone gives neither the sign nor the nonvanishing of this term. Its instantaneous vanishing also does not prove persistence: that requires symmetry or evolution bounds on the complete histories. In particular, the lattice's zero total acceleration does not mean that its environmental contribution relative to a selected pair is separately zero. Claims about robustness must therefore state the allowed history changes, preserved symmetries, and evolution interval; claims about frequency additionally need a specified population distribution.

### 3.2. A finite construction reaching coordinate contact

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

### 3.3. The stationary two-particle encounter

A more direct control starts two equal-magnitude, opposite-polarity particles at rest on a line, with stationary complete earlier histories. Write their positions as $\pm q(T)\mathbf e$, where $\mathbf e$ is a fixed unit vector, $q>0$ is half the present separation, and $u=-q'$ is inward speed. On the monotone incoming branch, there is one partner root per receiver and no positive-delay self root.

For partner emission time $s$, put $R=q(T)+q(s)=T-s$. With positive coupling magnitude $K$, the inward acceleration is

$$
u'(T)=\frac{K}{R^2[1-u(s)]}.
$$

The complete incoming analysis establishes that the first boundary is $u(T_*)=1$ while $q(T_*)>0$ and $R_*>0$. The partner factor $1-u(s)$ remains positive: the partner root is still simple. No positive-delay self root exists at the endpoint itself. This is a derived ordering result for the stated stationary input and regular branch, not a universal speed ceiling.

The result answers a precise question: the regular incoming solution does not reach coordinate contact before it reaches a field-speed event. There are no environmental contributions in this control, and persistence under changes to the pair's own histories is a separate question. It does not prove that the particles rebound, pass through each other, or remain forever separated. Those claims require a continuation.

### 3.4. Present separation, delay, and near-field geometry

The near-field comparison is particularly transparent with $c_f=1$. Let the present baseline from transmitter to receiver be $d\mathbf n_0$ and write an affine transmitter velocity as $a\mathbf n_0+\mathbf p$, with $\mathbf p\cdot\mathbf n_0=0$. If $\chi=\sqrt{1-\|\mathbf p\|^2}>0$ and $a<\chi$, its first positive root has

$$
\Delta=\frac{d}{\chi-a},\qquad
r=\Delta,\qquad
D=\chi(\chi-a),\qquad
\mathbf n=\chi\mathbf n_0+\mathbf p.
$$

Thus the delay-lead angle $\alpha$ satisfies $\cos\alpha=\chi$ and is independent of $d$ on the affine control. For $K=\kappa|q_iq_j|$, the row magnitude is $KD/(\chi^2d^2)$. Replacing $r$ by $d/D$ would miss the factor $\chi$ and underestimate a transverse contribution. At $d=0.1$, $a=0$ and $\|\mathbf p\|=0.6$, the exact values are $r=0.125$, $D=0.64$, and magnitude $100K$, whereas the omitted-angle expression gives $64K$. These are exact algebraic controls, not measurements of an evolving pair.

For a bounded-acceleration history the affine expression is an asymptotic approximation only while the delay, root derivative, and transverse margins support the expansion. Letting $D$ vanish at fixed $d$ can drive the affine root into the remote past and out of that local approximation. A statement about this limit does not regularize a fold at fixed nonzero range.

The affine root equation factors as

$$
[d+(a-\chi)\Delta][d+(a+\chi)\Delta]=0.
$$

There are no positive roots when $a>\chi$, one when $-\chi<a<\chi$, and two when $a<-\chi$. At $a=\chi$ there is no finite positive root, and at $a=-\chi$ one finite root remains. When the transverse speed equals one and $a<0$, the two roots merge with zero transmitter factor; transverse speed above one gives no affine root. A finite source segment retains only the solutions lying on that segment.

Both roots of a receding superfield source must be kept. Although one opposite-polarity row points outward relative to the present baseline, their complete radial sum is $-2K\chi/d^2$. The older of these roots cannot be hidden inside a supposedly bounded remainder. Conversely, two sufficiently fast inbound paths can each outrun the other's recent wake. Their recent partner channels are then empty, as in the incoming part of the finite contact construction, while older and self receptions can remain present.

### 3.5. Transverse motion does not have a universal secular sign

Define relative position $\mathbf d=\mathbf X_i-\mathbf X_j$, relative velocity $\mathbf w$, and the kinematic areal-rate vector $\mathbf h=\mathbf d\times\mathbf w$. This introduces neither mass nor a conserved angular account. For an exactly central relative acceleration, $\mathbf h$ is constant and the radial equation contains $\|\mathbf h\|^2/d^3$. Comparing it with an inward inverse-square term gives a barrier scale of order $\|\mathbf h\|^2/K$. The scale where the two accelerations match is not, without initial radial data, an exact turning radius.

On the symmetric pair-center affine chart, $\mathbf v_i=\mathbf w/2$ and $\mathbf v_j=-\mathbf w/2$ in the absolute frame, the delayed opposite-polarity rows feed the existing transverse motion. With radial relative speed $u_r$ and $\chi=\sqrt{1-\|\mathbf w_\perp\|^2/4}$,

$$
\dot{\mathbf h}_{ij}=\frac{K}{d^2}\left(1+\frac{u_r}{2\chi}\right)\mathbf h.
$$

The coefficient is positive on its first-root chart. A nonzero areal rate grows in magnitude under this leading pair contribution. The restriction is a physical condition on the absolute velocities, not an arbitrary change to a pair rest frame.

For general affine velocities $\mathbf v_i=a_i\mathbf n_0+\mathbf p_i$ and $\mathbf v_j=a_j\mathbf n_0+\mathbf p_j$, the complete leading result is instead

$$
\dot{\mathbf h}_{ij}=\frac{K}{d}\mathbf n_0\times\left[\left(1+\frac{a_i}{\chi_i}\right)\mathbf p_i-\left(1-\frac{a_j}{\chi_j}\right)\mathbf p_j\right],\qquad
\chi_k=\sqrt{1-\|\mathbf p_k\|^2}.
$$

The common-motion terms have no fixed sign. Even exact relative aim can acquire transverse motion if the common velocity has both radial and transverse components. A retained prescribed periodic control makes the pair's full-turn contribution negative: with relative transverse speed $k\varepsilon^2$ and rotating center velocity $-a\varepsilon\mathbf n_0+p\varepsilon\mathbf t$, the turn increment tends to $2\pi K(1-2ap/k)$ for $0<k<2ap$. Here $\mathbf t$ is the planar unit tangent and $\varepsilon$ is small. This disproves a universal sign claim for prescribed regular histories. It does not establish that the equation realizes the prescribed center motion.

The retained three-body EOM measurement found an increased areal-rate component over only about $0.135183$ turns. Later attempted controls did not supply a complete accepted turn. Their failed prefixes neither establish a full-turn average nor reverse the mathematical sign-indefiniteness of the general prescribed-history calculation.

### 3.6. Two conditional exclusion mechanisms

A quantitative transverse exclusion remains possible on a restricted populated chart. Suppose $H=\|\mathbf h\|$, $\|\mathbf w\|\le V$, and the exact areal-rate equation has the decomposition

$$
\dot{\mathbf h}=\lambda(T)\mathbf h+\boldsymbol\eta(T),\qquad
\lambda\ge\frac{L}{d^2},\qquad \|\boldsymbol\eta\|\le Bd,
$$

with $L>0$ and $B\ge0$. The positive coefficient is an additional dominance hypothesis. For any $\beta>0$, on $H^2=\beta d$, differentiation of $Q=H^2-\beta d$ gives

$$
\dot Q\ge\frac{2L\beta}{d}-2B\sqrt\beta\,d^{3/2}-\beta V.
$$

At sufficiently small $d$ this is positive, so a solution cannot cross from $Q\ge0$ to $Q<0$ while the hypotheses hold. Since $H\le dV$, the protected region also has $d\ge\beta/V^2$. On a monotone approach, $H\ge(2B/L)d^3$ is a capture threshold when $B>0$; outside the smaller cone the positive term eventually carries the solution into the protected region. For $B=0$, every $H>0$ has this growth property. No random population or almost-sure assertion enters the theorem.

A separate radial argument does not assume that transverse sign. Suppose the pair has opposite polarities, both newest partner roots exist, all transmitter velocities over their sampled chords remain below a fixed $\nu<1$, the complete remaining relative acceleration is bounded by $M$, and relative speed is bounded by $V$. Exact chord geometry gives an inward pair projection at least $C_\nu/d^2$, where

$$
C_\nu=2K\frac{(1-\nu)^2\sqrt{1-\nu^2}}{1+\nu}>0.
$$

For radial speed $u=\dot d$, the equation implies $\dot u\le V^2/d-C_\nu/d^2+M$. On a sufficiently small inward segment beginning at $(d_0,u_0)$, integration yields

$$
u(d)^2\ge u_0^2+C_\nu\left(\frac1d-\frac1{d_0}\right),\qquad
d\ge\left[\frac1{d_0}+\frac{V^2-u_0^2}{C_\nu}\right]^{-1}.
$$

This is a first-exit theorem. A finite-speed trajectory cannot reach zero separation while those hypotheses remain valid; a speed, root, or remainder bound must fail earlier. It does not predict a rebound, apply to a root-free inbound sector, or impose a global speed ceiling.

### 3.7. Contact, perturbations, and one-sided continuation

The finite contact example has no incoming collapsing partner row, so its bounded old-source field escapes the hypotheses of the radial theorem. An explicit transverse change of $10^{-6}$ in one target's supplied endpoint position instead gives a derived positive transverse separation at least $9.9995\times10^{-7}$ through $T=0.005$. A historical oracle run corroborates the resulting near-pass. The explicit miss does not require a universal genericity theorem.

For the smooth stationary-source comparison field, two transverse history coordinates and collision time give a rank-three relative-position map. Allowing time to vary leaves two transverse tunings for contact. Extending that codimension-two result to an incoming neighborhood of full EOM histories requires persistence of the complete root census there. No post-contact EOM or physical probability distribution follows. An ensemble absolutely continuous in the transverse coordinates would give a zero-measure contact set in that comparison, while an ensemble concentrated on the exact symmetry can behave differently.

The incoming boundary can also be examined geometrically. Write $\mathbf d=\rho\mathbf u$ with $\|\mathbf u\|=1$. If relative acceleration is bounded, the passive parameter change $dT/ds=\rho$ gives at $\rho=0$

$$
\mathbf u'=(I-\mathbf u\otimes\mathbf u)\mathbf w,\qquad
\mathbf w'=0.
$$

For nonzero limiting $\mathbf w$, the incoming direction $-\mathbf w/\|\mathbf w\|$ attracts radially and repels angular perturbations. This is a one-sided description with the incoming absolute-time history still supplied. After straight passage the new receding partner channels would contain two recent roots, with nonintegrable inverse-square acceleration under inherited finite velocity. Thus the unchanged complete row sum supplies no $C^1$ finite-velocity passage of this type. It selects neither a rebound nor termination.

For an existing inverse-square row and bounded physical velocity, a power-law time change $dT/ds=\rho^p$ requires $p\ge2$ to regularize acceleration. Those powers freeze the geometric boundary and send the root's required rescaled memory span to infinity. More generally, preserving the same canonical admission equation with the same fixed $c_f$ for every history permits only a translation of absolute time. A passive nonuniform parameter can carry $T$ as an additional variable, but it does not change the original causal law or remove its singularity.

## 4. Why the unchanged continuation fails, and what a candidate repairs

### 4.1. A self root born at positive particle separation

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

### 4.2. Regularity has several meanings

An unbounded instantaneous acceleration is not automatically an infinite velocity change. For a transverse fold at positive delay, the two roots can contribute an inverse-square-root dependence on time from the fold. Such a singularity is locally integrable. The self-birth measure above has stronger divergence. The geometry and signed accumulation must therefore be evaluated, rather than grouping every exceptional root into one category called a singularity.

A separate derived exclusion result gives a positive lower bound on recent self delays when the recent self contributions lie in a common forward cone, recent velocities remain bounded, the opposing part of the remaining acceleration has an integrable projection, and the initial and entering root sections have positive delays. Complete finite simple-root sections and locally absolutely continuous receiver velocity are part of these hypotheses. The cone makes the relevant projected self contributions reinforce rather than cancel. The estimate does not exclude singular lineages or histories for which these controls fail.

### 4.3. A conditional quintic continuation

One proposed boundary rule changes the strength of a root only when its history identifies it as born from the self diagonal. Near such a birth, its multiplier vanishes as the fifth power of a dimensionless local geometric coordinate. Ordinary roots retain their original rule. Selecting this multiplier as physical is an additional constitutive hypothesis: the regular equation does not derive it merely by encountering a divergence.

On the exact stationary mirror input, the candidate has a derived short existence-and-uniqueness result. The permitted continuations preserve mirror symmetry, have continuous velocity at the incoming endpoint and locally absolutely continuous velocity afterwards, and satisfy the complete candidate equation almost everywhere. They include no additional singular impulse or update and omit no undefined row by convention.

The local rule can be written directly from the incoming history. Write the newborn emission as $s=-y$, set $\alpha(y)=u_-'(-y)$ for the incoming acceleration, and let $w(y)=1-u_-(-y)$. The delay is $\delta=T+y$. In the candidate's normalized coordinates before its release threshold, the geometric coordinate is $\varrho=\delta\alpha(y)$ and the multiplier is $\varrho^5$. The resulting inward self acceleration is

$$
S=\frac{K\delta^3\alpha(y)^5}{w(y)}.
$$

The proof reconstructs the newborn root from the incoming history and solves for the outgoing trajectory, rather than prescribing a path that happens to give a finite integral. If $a_*>0$ is the finite incoming acceleration and $z(T)=\int_0^T[u(v)-1]\,dv$, positivity of the partner contribution places an actual regular solution in a region where $z(T)$ is proportional to $T^2$. In that region $y$ is proportional to $T$, $w(y)$ is proportional to $y$, and the displayed self contribution is $O(T^2)$ with a bounded derivative with respect to $z$. A contraction of the integrated equation yields a short solution. Every continuation in the stated regular mirror class enters the same region, establishing uniqueness as a local history germ: any two such solutions agree on a sufficiently short common interval.

This conditional result demonstrates that the existing candidate supplies more than a finite value on a chosen path. It does not derive the candidate from the primitives, prove independence from different smoothing procedures, continue through the later release of its multiplier, establish nonsymmetric continuation, or supply conserved accounts. The unchanged-law obstruction and the candidate theorem concern different equations and are compatible conclusions.

There is also a distinction between a well-defined sharp candidate and a well-defined approximation problem. Naming hard cutoffs or smoothing kernels does not specify how they act on the quintic multiplier, its root history or its event classification. Those parameterized operators must be defined before their evolved solutions can be compared. The sharp candidate's local uniqueness alone cannot prove convergence of unspecified approximations, and a regulator for a different acceleration weight does not supply that missing definition.

### 4.4. What a delay floor actually proves

The self-delay exclusion uses more than a root count. On a simple self branch with delay $\delta$, differentiating the root gives an identity between the branch's acceleration and the change of reciprocal delay. When recent chord velocities are bounded, a common forward cone converts the projected self contribution into a bound on the total variation of $1/\delta$. Integrating the actual remaining acceleration's negative projection prevents an unrecorded cancellation from defeating that bound.

If every initial or entering branch has delay at least $\delta_{\rm ent}>0$ and the total reciprocal-delay variation is at most $C$, the result takes the form

$$
\delta\ge\left(\delta_{\rm ent}^{-1}+C\right)^{-1}>0.
$$

The proof uses complete finite simple-root sections and regular entrance sections, but does not require a uniform number of roots or a uniform transmitter-factor floor. Positive-delay singular events may be joined only with the separate finite-event hypotheses. A finite collection of transverse folds has an integrable absolute budget; an uncontrolled infinite collection does not inherit it merely because each fold is locally integrable.

The endpoint expansion explains another important distinction. For a $C^4$ past path, with $v=\|\mathbf V\|>0$, acceleration $\mathbf A$ and jerk $\mathbf J$ at reception, the self-chord residual is

$$
G(\delta)=(v-c_f)\delta-\frac{\mathbf V\cdot\mathbf A}{2v}\delta^2+\left[\frac{\|\mathbf A\|^2}{8v}+\frac{\mathbf V\cdot\mathbf J}{6v}-\frac{(\mathbf V\cdot\mathbf A)^2}{8v^3}\right]\delta^3+O(\delta^4).
$$

Accumulation at one fixed reception requires vanishing of these leading coefficients. A sequence whose reception times also approach an endpoint has different quantifiers: continuous endpoint velocity requires $v_*=c_f$, and an incoming $C^2$ sequence additionally requires $\mathbf V_*\cdot\mathbf A_*=0$. Cubic vanishing need not follow because the moving lower-order coefficients can balance the cubic term. These are geometric necessary conditions, not examples of EOM self birth.

### 4.5. Suppression order, sensitivity, and regulator dependence

On the linear self-birth chart with unsuppressed acceleration proportional to $T^{-3}$, a nonnegative maturity multiplier $M(T)$ yields finite accumulated acceleration precisely when its weighted integral is finite:

$$
\int_0^L\frac{M(T)}{T^3}\,dT<\infty.
$$

A bound $M=O(T^p)$ with $p>2$ is sufficient; cubic is the first possible nonzero analytic order. The condition is not equivalent to a cubic law. For example, a quadratic multiplier divided by a sufficiently strong logarithmic factor can be integrable, while merely being $o(T^2)$ is insufficient. Bounded receiver sensitivity is stricter because differentiating the unsuppressed row introduces higher singular powers and may differentiate the multiplier itself.

The quintic proposal addresses a particular event lineage with a declared geometric multiplier. It keeps ordinary folds separate, freezes the relevant incoming history, and includes the multiplier's derivative when evaluating sensitivity. Its short mirror proof is confined to the region where the newborn emission-time offset scales with the reception time; a rectangular domain allowing that offset to vanish at fixed positive reception time would not support the same estimate. Positivity of the partner row is what places actual candidate solutions in the controlled region.

A sharp candidate and its approximations are also distinct. Pointwise convergence of a family of multipliers can leave a nonzero weighted residue concentrated near the endpoint. A common integrable majorant or a uniform approximation defect on the contraction domain would be sufficient additional information, but no unspecified regulator earns those properties. Different admissible suppressions can give different finite impulses even with similar endpoint orders. The candidate therefore has a local theorem without a derived selection principle, a regulator-independent physical limit, or a global event law.

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

### 5.1. A constraint requires a response law

Let $c_a$ denote an imposed maximum particle speed, distinct from the wake speed $c_f$. A studied alternative first computes the complete finite ordinary acceleration $\mathbf A_{\rm ord}$ and then removes its outward radial component at the velocity boundary. With $\hat{\mathbf v}=\mathbf V/\|\mathbf V\|$ and $(b)_+=\max(b,0)$, the proposed response is

$$
\dot{\mathbf V}=\begin{cases}
\mathbf A_{\rm ord},&\|\mathbf V\|<c_a,\\
\mathbf A_{\rm ord}-(\hat{\mathbf v}\cdot\mathbf A_{\rm ord})_+\hat{\mathbf v},&\|\mathbf V\|=c_a.
\end{cases}
$$

This expression holds almost everywhere along solutions satisfying the proposed absolute-continuity and radial normal-cone response assumptions; it is not a consequence of the speed inequality alone. Inward and tangential acceleration remain; only acceleration that would increase speed beyond the cap is removed. The complete ordinary sum must already exist before this operation. Projecting an undefined infinite sum does not define it.

If $c_a<c_f$, both velocity factors satisfy $D_t,D_r\ge c_f-c_a>0$, and the chord inequality excludes self roots. If $c_a=c_f$, straight characteristic intervals can occur: a whole interval of emissions can satisfy the same reception condition. If $c_a>c_f$, superfield root geometries remain possible. These are derived distinctions among the three proposed regimes.

### 5.2. Contact under the equal-speed constraint

For the mirror pair at its first field-speed event, the equal-speed response can sustain a conditional incoming segment

$$
q(T)=q_*-(T-T_*),\qquad
T_*\le T<T_c=T_*+q_*.
$$

The particles continue inward at unit speed and reach coordinate coincidence. The cap has excluded the superfield continuation from the previous chapter, but at contact a whole partner-emission interval lies on the reception geometry. The isolated-simple-root formula no longer defines that event.

A separate proposed event completion retains the distinct source labels and matches their event measures using exact mirror symmetry and one common linear conversion to acceleration impulse. Within that architecture the net event impulse is zero and position and velocity remain continuous. This cancellation is a statement about the declared event measure and map. It is not an event value derived from the unchanged ordinary root law, nor a reason to discard divergent receiver contributions in a different problem. The continuation theorem also requires the proposed complete labeled-history splice and event-ownership rules: the already accounted-for noncrossing event family is not counted again as a new ordinary reception. Velocity is absolutely continuous and the equation holds almost everywhere. Zero impulse alone does not supply these rules.

### 5.3. Finite continuation without a unique future

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

### 5.4. A separate circular compatibility result

The ceiling investigation also supplies a positive all-past circular control. For antipodal circular paths at the imposed speed, set $0<\lambda=c_a/c_f\le1$. The partner half-delay angle $\xi$ obeys

$$
\xi=\lambda\cos\xi.
$$

On the relevant interval the left side increases and the right side decreases, giving one partner root. A self root would require $\eta=\lambda|\sin\eta|$ with $\eta>0$, which is impossible because $|\sin\eta|<\eta$. The partner acceleration has inward radial and forward tangential components. The proposed cap response removes the forward component and leaves a radial compatibility condition for the circle's radius.

This is an exact compatibility result for an all-past circular history under the modified dynamics. It does not prove that general initial histories form such a circle, that perturbations remain near it, or that the circle is stable. Existence of a special solution and dynamical selection of that solution remain distinct questions.

### 5.5. What adopting the ceiling would cost

A ceiling would remove mechanisms used in the open-speed description. A history confined wholly below or at wake speed cannot contain the earlier superfield interval responsible for a later superfield-history self reception. Circular self-hit branches requiring above-wake-speed motion, multiple separated simple roots within one channel, and proposed binary self-hit barriers dependent on such motion cannot simply be retained. Assembly and braid constructions that use those histories would need new admissible paths and new dynamical derivations. The original conditional results do not become false; their hypotheses are excluded by the alternative model.

One unfavorable control makes that distinction concrete. A high-precision acceleration diagnostic of a prescribed six-path orthogonal-circle geometry found that the minimal ceiling response fails the required vector acceleration at the initial instant for all four inequivalent relative polarity orientations. A receiver either slows or acquires acceleration perpendicular to its prescribed orbital plane. The independently derived thirty-root census for that geometry remains valid, but root correctness does not make the prescribed paths solutions. This measured result rejects that particular geometry under that particular response; it does not exclude every capped assembly.

The constrained response also supplies no energy, momentum or angular-momentum account for the removed acceleration component. Calling that component lost energy would import an account that has not been derived. A complete alternative needs independently defined balances on its own constrained and event dynamics, as well as treatment of exceptional events beyond the exact mirror case. The ceiling therefore remains an investigation of a different model with substantial consequences, rather than an established simplification of the canonical theory.

## 6. Infinite populations and cancellation

### 6.1. What the stationary lattice establishes

A finite population and an infinite population pose different summation problems. For an infinite population, the number of particles in a three-dimensional shell grows with its volume, whereas one stationary contribution decreases as inverse distance squared. Magnitudes need not have a finite total. Cancellation must be specified and proved for the actual delayed contributions.

A useful complete-history control places equal-magnitude alternating polarities at the cubic anchors $\mathbf z_j=\ell j$, with $j\in\mathbb Z^3$ and sign $(-1)^{j_1+j_2+j_3}$. Each particle is stationary throughout its earlier history. Grouping the eight corners of consecutive lattice cells cancels the leading spatial moments through degree two. For a block a distance $R$ away, its remaining acceleration is $O(R^{-5})$. A shell with radii $R$ and $2R$ contains $O(R^3)$ blocks, so its contribution is bounded by $O(R^{-2})$. Summing these bounds over successively doubled shells gives a finite tail.

At a stationary receiver anchor, this selected grouped sum is exactly zero. Reflection through that anchor pairs equal-polarity sources with opposite acceleration vectors in finite symmetric cubes. To transfer the cancellation to the fixed eight-source grouping, one must also control the unmatched boundary faces, edges and corners. Their total tends to zero, giving the same zero limit. Exact cancellation is therefore a derived property of this reference, despite divergence of the sum of individual magnitudes. It does not establish equality of every possible source ordering.

The absence of motion here is an exact balance, not a consequence of infinite population size. Perturbing source histories or displacing a receiver changes the delayed contributions whose cancellation was proved. The following constructions distinguish the disturbed lattice from this stationary reference.

### 6.2. Finite changes and infinitely coordinated changes

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

### 6.3. One sufficient proposed history class

A mathematical proposal restores finite sums and controlled relative derivatives by restricting the histories and strengthening the way their differences are measured. In normalized units, let $\mathbf u_j(s)=\mathbf X_j(s)-\mathbf z_j$ for all $s\le0$. Require, in addition to the regular root and separation conditions,

$$
\sum_{m=0}^{3}\ell^{m-1}\|\mathbf u_j^{(m)}(s)\|
\le A(1+|s|/\ell)^{-p}+b_j,
\qquad p>1,\qquad A\ge0,\qquad b_j\ge0,\qquad\sum_jb_j<\infty.
$$

The derivatives include displacement, velocity, acceleration and jerk of the supplied history. The first term permits independent deviations across the lattice but requires them to decrease sufficiently far into the past. The summable allowances $b_j$ permit persistent deviations, including arbitrary finite source modifications satisfying the original bounds. No acceleration contribution is multiplied by these allowances; they define which histories are admitted.

Why does a distant-past condition help a spatial sum? A source at range $R$ contributes from a time roughly $-R$ when $c_f=1$. Its allowed temporal deviation is consequently bounded by order $R^{-p}$. Combined with an inverse-square row and the shell population, the leading shell correction has order $R^{1-p}$. The dyadic series converges for $p>1$. Full root and derivative estimates justify this mechanism under the proposal's complete assumptions. Existing controls show that the strict threshold cannot be weakened within this broad independent-history envelope family.

The corresponding stronger norm measures a position-and-velocity difference by the least temporal-envelope budget plus the sum of its persistent allowances. Between admitted $C^3$ histories sharing bounded envelope budgets and regular root margins, the acceleration map has a controlled relative derivative and remainder, with uniform tails. The linear derivative expression can act on suitable $C^1$ directions, but arbitrary small $C^1$ changes need not remain admitted histories. These are derived sufficient estimates, not a selection of this distant-past background as physical. They do not prove a common lifespan for mutually evolving particles, compatibility of all derivatives at the release cut, or preservation of the entire regular history domain. In particular, a well-defined initial acceleration is only the beginning of an infinite-population evolution theorem.

### 6.4. A common first evolution interval

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

### 6.5. The first nonstationary response

For the same explicit smooth compatible history, a further derived result identifies the first reception of the past disturbance. If $\ell$ is the lattice spacing, the entire population remains stationary through

$$
T_*=(\sqrt2-11/8)\ell.
$$

The acceleration is still zero at this onset. On a sufficiently short positive interval afterward, exactly 24 environmental labels move: 16 have leading displacement of fifth order in elapsed time, and eight have leading displacement of sixth order. Both targets and all other labels remain stationary on this interval. These are conclusions about solutions of the receiver equations, including feedback from receiver displacement, rather than evaluations of the acceleration at fixed anchors.

The extension preserves the smooth join, the original quantitative history bounds and the complete root census on a common short interval. All arriving emissions still precede the original release. Its existence therefore does not yet require reception of the newly generated source futures. The result remains conditional on the stated history and block-summation convention.

This establishes a nonstationary smooth continuation after the waiting interval. Completing the received pulse requires a longer estimate and its endpoint must follow the moving receivers' actual causal equations. The next result supplies that estimate on a stated parameter range. Later reception of postrelease emissions requires a separate coupled-history estimate; neither target contact nor a globally preserved population class follows.

### 6.6. Completion of the first received pulse

The [independently adjudicated pulse theorem](analysis/smooth-two-particle-pulse-independent-adjudication.md) extends this same smooth control through its first received pulse. To specify the input, take the two modified labels to be $E=\{0,e_1\}$, where $e_1=(1,0,0)$, and their common displacement direction to be $\mathbf e=(0,0,1)$. For every supplied time $s\leq0$, retain

$$
\mathbf X_j(s)=\mathbf z_j+\varepsilon\ell\mathbf e\,\psi\big(8(s/\ell+5/4)\big)
\quad(j\in E),\qquad
\varepsilon=2^{-16},\qquad
\psi(v)=\begin{cases}v(1-v^2)^4,&|v|<1,\\0,&|v|\geq1.\end{cases}
$$

All other supplied histories are stationary. The displacement pulse occupies $[-11\ell/8,-9\ell/8]$; its derivatives through third order vanish at both ends. These complete pasts are prescribed data, with no assertion that the equation generated them before release. The original eight-source block sum remains the summation prescription. Let $G=\kappa q_0^2>0$, where $q_0$ is the common polarity magnitude, and introduce dimensionless reception time $t=T/\ell$, coupling ratio $g=G/\ell$, and displacement $\mathbf y_i(t)=(\mathbf X_i(\ell t)-\mathbf z_i)/\ell$. Primes on $\mathbf y_i$ denote derivatives with respect to $t$; physical acceleration and jerk are $\mathbf y_i''/\ell$ and $\mathbf y_i'''/\ell^2$.

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

### 6.7. Class loss and the next continuation boundary

The same input permits arbitrary $g>0$, but its fixed derivative ceilings prevent a full-pulse assertion for every such value. Let $J=2^{16}$ be its dimensionless jerk ceiling and $\theta=t-t_*$. A hypothetical globally $C^3$ continuation in the original class through $\theta_0=2^{-16}$ must satisfy $\|\mathbf y_i''\|\leq J\theta$, because acceleration is zero at onset. For the receiver with $\mathbf k=(1,0,1)$ relative to target zero, put $\mathbf n_0=\mathbf k/\sqrt2$ and $\mathbf e_a=-\sqrt2\mathbf n_0(n_0)_3$, a unit direction. The exact pulse expansion, with its uniform remainder and moving-receiver correction retained, gives

$$
\mathbf e_a\cdot\mathbf y_i''(t_*+\theta)>g\theta^3
\quad(0<\theta\leq2^{-16}).
$$

At $\theta_0$, the class permits acceleration magnitude at most $J\theta_0=1$, whereas the equation requires a projection strictly greater than $g2^{-48}$. These statements contradict one another for $g\geq2^{48}$, including equality. This time lies inside the first received pulse. The corrected parameter classification is therefore

| Coupling ratio | Derived conclusion for the unchanged smooth input |
| --- | --- |
| $0<g\leq16$ | Full first-pulse reception through $T=5\ell/16$, with the original class preserved |
| $16<g<2^{48}$ | A positive local response exists, but full-pulse continuation versus original-class loss remains unclassified |
| $g\geq2^{48}$ | No original-class continuation through $T_*+2^{-16}\ell$, before pulse completion |

Neither threshold is claimed sharp. The negative result follows from the equation and the fixed jerk ceiling, not from failure of a sufficient small-coupling estimate. It establishes neither a root singularity nor contact, does not determine which class ceiling is first encountered, and does not exclude regular continuation in a larger domain. Enlarging that domain would be a separate mathematical proposal; it is not adopted by this result. A positive local response for each fixed finite $g$ remains consistent because its duration can shrink as $g$ grows.

For the accepted small-coupling range, the next old-pulse shell has anchor reception onset $t=\sqrt3-11/8$, beyond the present horizon. Continuing the same control through it requires an expanded finite receiving set, actual moving-receiver endpoints and uniform displacement, derivative and root bounds. If complete displacement stays below $d\ell$, cross ranges exclude nonnegative emission times while $t<1-2d$; this sufficient inequality grants no lifespan without those bounds. Once a newly generated emission does arrive, source and receiver variations both enter the delayed equation, and the receiver-only reduction must be replaced by a coupled-history estimate. No later evolution, target-contact conclusion, arbitrary-history continuity or physical selection of the class follows from the first-pulse theorem.

### 6.8. The topology and summation rule are part of the result

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

## 7. Wake transport, action, and conserved accounts

### 7.1. Geometry does not determine an account value

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

### 7.2. A local gradient identity does not supply a complete action

An action principle assigns a scalar functional to histories and derives an equation by requiring its first variation to vanish. One investigated characteristic-tail kernel was constructed to reproduce the required receiver-position derivative. With causal mismatch $g=T-s-R/c_f$, it satisfies a local identity of the form

$$
\left(\partial_R-c_f^{-1}\partial_g\right)K_\eta
=-\frac{\delta_\eta(g)}{R^2}.
$$

Here $K_\eta$ is that particular smoothed kernel and $\delta_\eta$ is a smoothed causal selector. The derivative follows the dependence of the causal mismatch on range. This identity is a genuine positive result for the receiver variation.

It does not establish a complete causal action. The same varied path point can also be a transmitter for later receivers, and the full distinct-particle variation contains a future-receiver term absent from the intended forward acceleration law. Independently, the selected self kernel has a near-diagonal lower bound leading to a logarithmically divergent integral along locally Lipschitz self histories. Removing the single diagonal point does not remove that neighborhood divergence. The frozen action and its stated self-only repair class therefore fail their complete requirements. This rejection does not exclude every action or every conserved history functional.

The mechanism of the action failure can be stated precisely. Put $u=T-s$ and choose a nonnegative compact causal selector $\delta_\eta$ of unit integral, a fixed memory depth $h>3\eta$, and a characteristic endpoint. The normalized tail is

$$
K_h^{(\eta)}(r,g)=\int_{-h}^{g}\frac{\delta_\eta(z)}{c_f(u-z)^2}\,dz,\qquad u=g+r/c_f.
$$

Differentiation at fixed $u$ gives the receiver identity above. An arbitrary spatial variation of a worldline point must nevertheless collect both its receiver and transmitter occurrences. With the frozen ordered-pair factor $1/2$, the regular cross-worldline Euler coefficient has the form

$$
\mathbf E_a=-\mu\ddot{\mathbf X}_a+\tfrac12\mathbf R_a^{\rm past}-\tfrac12\mathbf F_a^{\rm future}.
$$

Here $\mu$ is the explicitly hypothetical quadratic motion-account coefficient, $\mathbf R^{\rm past}$ is the intended past receiver integral, and $\mathbf F^{\rm future}$ denotes future support rather than force. The one-sided domain already counts each oriented event once. Replacing $1/2$ by $1$ fixes receiver normalization but preserves the unwanted future term. Its sharp collapse depends on later receivers and their $D_r$ factors.

On separated regular cross histories, a transverse future change of a receiver at range $R$ changes the present coefficient by $-\Lambda\mathbf e_y/(2R^3)$ per unit displacement, where $\Lambda$ is the signed pair coupling including the proxy coefficient. The complete past is unchanged. A source-attributed finite-difference calculation of the cross action corroborates this coefficient, but its retained table has no standalone replay artifact and does not examine the divergent self sector. The exact mixed derivative already distinguishes the two operators without a numerical tolerance.

For a locally Lipschitz self path, $r(T,T-u)\le Mu$ near the diagonal. At fixed positive width, the retained tail has a lower bound proportional to $1/r$, so its self integral dominates $\int_0^\epsilon du/u$. A modification confined to self history or a near-origin core cannot cancel the separated cross-worldline mixed response. Such a modification would also define a different complete candidate.

Finally, exact elimination of auxiliary variables from a differentiable action preserves its worldline derivative when the auxiliary Euler equation holds. Rewriting a well-defined reduced functional with extra variables cannot remove its future term while leaving the same functional. The divergent frozen self-inclusive action does not even satisfy that differentiability premise. An independently evolving causal wake state must therefore supply additional justified dynamics; a relabeling of the failed action does not supply it.

### 7.3. What account obstructions actually exclude

One proposed architecture treats acceleration observations as expenditures from a finite positive source budget. If arbitrarily many supplied receiver channels each demand the same nonzero acceleration variation, but the total allocated budget is bounded, at least one allocation must tend to zero as the receiver count grows. A common bound making supported acceleration vanish with allocation then contradicts the canonical nonzero observation. This excludes that finite-funded-observation architecture under its universal-channel assumptions. It does not identify acceleration with energy expenditure or prove that every coupled physical population realizes those independent channels.

A second obstruction concerns a receiver driven by one independently supplied source history. Consider a scalar composed of an isotropic present-speed function and an interaction term depending on separation and finitely many derivatives of the source history. Requiring it to be conserved for every regular supplied input is too strong. The complete chain rule successively eliminates the highest independent source derivatives. Stationary-source inputs then force a quadratic speed term paired with an inverse-range term. Allowing source motion leaves an uncancelled rate proportional to the source's radial velocity, forcing the nonconstant coefficient to vanish.

The conclusion is a derived impossibility for that universal driven-receiver scalar ansatz. Coupled EOM trajectories do not have independently variable source derivatives in the same way. Source-inclusive transfers, full-history functionals, and interaction terms with more general receiver dependence fall outside the theorem. The result narrows a construction class; it does not prove that the full theory cannot conserve accounts.

Finally, cancellation of a signed total does not make its total variation finite. If an age-preserved emission has a nonzero time-independent angular density $b(\omega)$, its accumulated total variation over a past duration $H$ is

$$
\|\mu_H\|_{\rm TV}
=H\int_{S^2}\|b(\omega)\|\,\frac{d\omega}{4\pi}.
$$

The sphere $S^2$ indexes directions, and total variation adds magnitudes rather than cancelling signs. A vector density can have zero net integral on each sphere while this quantity grows without bound. Finite local accounts can still exist. A global account with finite total variation requires assumptions addressing the complete past; a conditionally summed global account requires a separately specified convergence and conservation argument.

### 7.4. Allocation, observation, and transfer

The finite-budget obstruction depends on an ordered set of definitions. A construction first specifies which emissions are allocated to each reception, how those allocations are represented, and how a receiver observes them. Only then can it define depletion, suppression, motion and wake accounts, and boundary transfer. Rearranging these steps can conceal a required input by defining it from the desired acceleration afterward.

A point receiver intercepts zero area from an ordinary integrable angular density. A nonzero point observation consequently requires a different sampling or measure structure. Atomic observations distinguish representatives that an ordinary density identifies almost everywhere; an observation rule must respect whichever state space is declared. Measures singular with respect to area need not be atomic, so eliminating point atoms does not by itself reduce the state to a smooth density.

A receiver patch of transverse radius $\varepsilon$ seen at range $r$ has solid angle asymptotic to $\pi\varepsilon^2/r^2$. Keeping a fixed transfer while shrinking the patch forces its density to increase. This geometry offers a family of possible representations, not a derived finite receiver cross section. Angular localization, temporal width, and spatial shell thickness remain different choices.

On a regular monotone branch, a source-clock measure pushed onto reception time acquires the playback derivative. Reconstructing a fixed nonzero acceleration through a newly traversed source allocation can then require unbounded gain near $D_r=0$. More explicitly, if emission time advances by $o(\Delta T)$ while a bounded-gain new-allocation model offers only $o(\Delta T)$ response, it cannot reproduce an acceleration integral of order $\Delta T$. A rule involving residence or repeated reading could lie outside this obstruction, but it must be supplied rather than inferred from the failed model.

### 7.5. Nondepleting transport does not close reception

A nondepleting proposal avoids spending a finite source packet at each compatible receiver. That change alone does not select the emission density or its account values. Isotropic functions of polarity and source-speed invariants can define many covariant scalar and vector emission weights. Their availability shows freedom in the construction, not physical uniqueness.

The finite-jet scalar obstruction from Section 7.3 also needs its full domain. Independent variation of the highest source derivatives removes successive jet dependence; allowing all compatible receiver directions removes a remaining apparent freedom in the interaction term. Connectedness of the complete domain is not the same as connectedness of its fixed-parameter fibers, so a proof cannot silently use one for the other. The conclusion concerns universal independently driven receiver inputs, not arbitrary conserved functionals on coupled trajectories.

Energy and vector momentum could be separate state channels with separately specified reception currents. Constructing their measures requires measurable labels and finite sums of current variations on each claimed domain. Writing the currents as whatever equals the receiver's observed change would repeat the residual-definition problem. No minimal set of physical channels has been established merely by naming them.

For an orbital angular account about origin $O$, the exact integrability requirement is the integrability of $(\mathbf Y-O)\times d\mathbf P$. It can be weaker than a finite full spatial first moment: momentum radial to a source center can make the radius-dependent cross product vanish. Changing the origin transforms the angular account by the corresponding displacement crossed with total momentum. These identities are geometric bookkeeping conditions and do not assign a primitive spin or momentum to an architrino.

### 7.6. Global history and boundary ownership

Boundary accounting must distinguish interception, surviving transport, and escape. A wake surface can cross a spatial boundary only in part; an earliest-crossing label cannot stand in for a surface-resolved flux. Splitting a region should preserve additive account transfers, with boundary atoms assigned consistently and without resetting an emission's earlier debit history.

A nonzero age-preserved emission over an infinite past can have an infinite global variation even when each bounded region has a finite account. Signed angular cancellation does not repair that divergence. Finite total accounts require an integrable survival or decay condition, a finite age domain, or a separately selected conditional summation rule. These possibilities remain distinct from the convergence of the signed acceleration series in Chapter 6.

An ordinary outgoing ray from a fixed source center cannot later return to that same center under free outward propagation. Reinterpreting a reception as an instantaneous remote debit would therefore require a separately derived transfer mechanism. Neither causal geometry nor an invented balance residual licenses it. A complete causal state remains a proposed route whose allocation, observation, evolution, and three account maps must be supplied together.

## 8. From root geometry to an assembly

### 8.1. Returning a history is stronger than cancelling an acceleration

An assembly candidate must solve every member's equation on its complete retained history. Cancelling the sum of accelerations is only a necessary condition for a prescribed rigid translation at constant velocity. Individual residuals can remain large while their total vanishes. A periodic drawing also need not be a periodic delayed solution: the source history and all retained root identities must return along with the visible coordinates.

A branch description therefore includes active roots, proven inactive complements, a positive simple-root margin, a finite retained horizon, a return residual on a specified history space, and the relevant symmetry exclusions. Positive margins and a small residual do not themselves establish an exact orbit. A validated invariant neighborhood and a fixed-point, trapping, or equivalent existence argument must first show that an EOM-consistent history returns. Stability is then assessed about that established orbit. A spectrum about a non-solution has no stability referent.

The proposed deeper assembly condition also compares the accumulated tangential, recoil, boundary, and multiple-root contributions over the same return. Their pointwise or cycle-average cancellation is not an independently conserved account. Cohomology and chart-gluing descriptions express additional global compatibility questions; a locally valid root chart does not automatically supply a global section or a finite number of continuations.

### 8.2. Circular and spiral controls

Circular geometry remains useful for classifying root births. For the standard circular self-root family, the birth conditions are $\tan\xi_* =\xi_*$ and $\beta_* =\sqrt{1+\xi_*^2}$. Near a positive transverse crossing of the speed parameter, the two root offsets and transmitter factors split as square roots of $\beta-\beta_*$. Their acceleration singularity is proved locally integrable under the declared nonzero crossing rate, absolute branch budget, regulator control, and restored post-event census. At the exact constant-speed null point, the regular acceleration formula remains undefined. A zero receiver playback factor does not cancel it.

A variable-pitch spiral relaxes fixed radius and curvature. One retained family uses $p(\theta)=-r'(\theta)/r(\theta)=-a\sin\theta$ and

$$
r(\theta)=R_*e^{a(1-\cos\theta)},\qquad
T(\theta)=\theta/\Omega,\qquad
\rho(\theta,\Delta)=\frac{r(\theta-\Delta)}{r(\theta)}.
$$

Partner and self root geometry is expressed by $\Lambda_p^2=1+\rho^2+2\rho\cos\Delta$ and $\Lambda_s^2=1+\rho^2-2\rho\cos\Delta$, with $\Lambda_{p,s}=\Delta c_f/(\Omega r(\theta))$. These are equations for prescribed histories. They do not state that the radial and tangential EOM residuals vanish.

The retained $a=0.1$ control has finite certified root windows, a positive Jacobian floor, an analytic exclusion near the diagonal, and a memory bound within its declared horizon. A second control with $a=0.204$ has rebuilt transmitter-side reciprocal-weight intervals and a point radial/tangential diagnostic. The former coarse memory estimate that exceeded its horizon was replaced by a sharper bound; the historical constants and the refined result must not be mixed. Neither control has an outward interval evaluation of all acceleration aggregates and independently accepted accounts establishing a physical limit cycle or a constant-rate exclusion.

Earlier receiver-weighted conclusions about these paths were withdrawn. Their root windows, implicit transport identities, and transversality calculations survive at their stated geometric grade. The identity $1-d\Delta/d\theta=D_r/D_t$ is a consequence of the same root equation; agreement with it is not independent evidence for acceleration strength. Any dynamical interpretation must use $c_f/|D_t|$ and preserve the same root record.

### 8.3. Residual screens and surface integrals

The retained point-cloud audit illustrates why memberwise residuals matter. Its source-time expanded screen had 120 records, of which 62 were eligible for the stated residual test and 58 remained unknown; all 62 eligible prescribed candidates failed that test. Twenty-four had cancellation in a summed quantity that concealed member residuals. Thirteen eligible dense controls also failed. The best reported residual remained many orders above its declared tolerance. These historical instrument results reject the tested exact prescribed motions, not every nearby deformable branch, and no fresh run is implied.

A memberwise maximum residual and a mean-square residual answer different questions from a total-vector sum. A small total is compatible with large opposite errors at different members. One near-threshold root in the retained audit was classified unknown rather than rounded into a pass; preserving that distinction prevents incomplete root evidence from being used as a dynamical negative or positive.

Likewise, integrating a scalar wake diagnostic over a chosen surface does not automatically define a conserved flux. Comoving and isochronal surface integrals can give different functions of speed, and the associated field can have nonzero divergence. The mathematical sampling surface is not a cloud of passive physical receivers unless an observation model establishes that identification. Proposed effective energy expressions that depend on an unaccepted action remain conditional, even when their dimensions or stationary limits are consistent.

## 9. Response coefficients and observable recovery

### 9.1. Bare assembly response and medium response

An accepted drifting assembly with independently defined total momentum could support a susceptibility

$$
\mathcal I^{ab}_{A,\rm void}=\left.\frac{\partial P^a_{A,\rm total}}{\partial V_b}\right|_{\mathbf V=0}.
$$

This is a proposed assembly-level response in bare Euclidean void. Its definition requires a differentiable family of actual returned histories with stable root identity, controlled memory and regulator limits, and valid momentum accounts. It is not primitive architrino mass, a polarity parameter, or an automatically isotropic scalar. A comparison with internal energy divided by $c_f^2$ remains a target.

A surrounding Noether sea, meaning the proposed population of structured assemblies, introduces a different constitutive problem. Its susceptibility, shielding, exposure, and effective signal speed need not preserve the bare response. An isolated assembly's far-field multipole and a medium's pressure response are different objects. A vanishing linear response on a particular chart does not exclude a nonlinear response, nor does a symmetry of a prescribed sea supply its dynamical constitutive law.

### 9.2. Clock, shape, and signal must come from the same history

Lorentz and gravitational behavior are observer-level recovery targets. One proposed extraction uses a cycle-averaged shape tensor

$$
Q_{ab}=\frac{1}{\sum_i w_i}\left\langle\sum_i w_i r_{i,a}r_{i,b}\right\rangle,\qquad w_i\ge0,\quad\sum_iw_i>0.
$$

Here $r_{i,a}$ is component $a$ of member $i$'s position relative to the declared assembly center. The weights are fixed geometric extraction weights, not primitive masses. They must be held identical across rest and moving comparisons. Longitudinal and transverse semiaxes come from projections of this tensor; a clock period comes from one declared phase's nonzero mean angular cadence on the same returned history. A zero or ill-defined cadence does not define a period.

After choosing an observer channel with speed $c_*$, the comparison factor is $\gamma_*=(1-v^2/c_*^2)^{-1/2}$ on $v<c_*$. The recovery targets are a longitudinal-to-transverse shape ratio near $1/\gamma_*$ and a clock-period ratio near $\gamma_*$. The primitive root equation still uses $c_f$. A drift band below $c_f$ does not, without further information, ensure a band below a different effective channel speed. Wake speed, sea-dressed clock/ruler speed, photon-channel speed, and a calibrated observer reference speed must remain distinct until a derivation relates them.

The homogeneous moving-assembly problem precedes weak-field medium comparison in this program. The same branch must determine clock, ruler and two-way signal residuals. Fitting one parameter per observable would not establish the requested recovery. Independent derivation of the constitutive map is still missing; prepared coefficient relations and stiffness expansions do not supply it.

### 9.3. Weak-field comparisons and anisotropy

The proposed weak-field map converts medium density, cadence, effective potential, drift and stress into lapse, shift and spatial response coefficients. Those coefficients must jointly predict redshift, delay, bending, weak acceleration and preferred-frame residuals. Writing them in an effective metric is a comparison representation, not a replacement of Euclidean space and absolute time at the substrate level.

The retained program gives source-mined parametrized post-Newtonian (PPN) comparison scales for deviations in $\gamma$, $\beta$, and three preferred-frame coefficients, along with Robertson–Mansouri–Sexl and Standard-Model Extension projections. These are historical observational targets recorded by the source packets; their cited external measurements have not been refreshed here. No coefficient is recovered merely by supplying the export format, and an absent row is an untested comparison rather than a zero.

The photon response additionally requires control of anisotropic tensor components, dispersion, and the full remainder of an expansion. Cancelling a leading trace-free coefficient does not prove an isotropic limiting medium unless the residual terms are controlled. A shared clock-and-signal relation is a proposed consistency condition, not permission to introduce independent clock rules for each experiment.

These downstream questions retain their dependencies. A root chart supplies neither an invariant probability measure nor Born weights, detector statistics, a shielding coefficient, an observed mass, or a cosmic evolution. Such quantities require additional derived maps on the already justified dynamics and comparisons with their appropriate observations.

## 10. What these results establish about closure

The investigations separate properties that are easily conflated. A finite coordinate-contact construction establishes reachability within one forward-history class. The stationary pair's earlier self-boundary obstruction establishes failure of the unchanged regular continuation on a different input. A quintic candidate supplies a unique short mirror continuation only after modifying the boundary rule. A proposed speed cap and event completion can supply finite passage while leaving multiple future branches. Their histories, event types and equations differ.

Infinite-population summation adds a distinct requirement. Exact stationary cancellation and finite modifications are viable under a selected reference, while independently coordinated complete histories can destroy convergence and continuity. A sufficient restricted history class addresses that functional problem. Separately, the fixed smooth two-source control has a self-consistent evolving population through its first received pulse in the proved coupling range. Neither result establishes a general invariant population class or later evolution after newly generated emissions arrive.

The surviving local scalar gradient, the rejected complete action, and the account obstructions likewise have different scopes. They narrow proposed constructions without selecting a conserved completion or excluding every possible one. Assembly root geometry and return diagnostics provide necessary information, while exact EOM existence, stability, and observer-level response remain additional burdens.

A complete theory must connect these levels on one declared domain and update. It must identify admissible histories, include every reception, determine a solution with the claimed regularity, and specify what happens at reachable exceptional events. If unique prediction is claimed, the state must select the continuation rather than leave an onset or boundary choice as external data. If conservation is claimed, its quantities and transfers must be independently defined on that same evolution. These requirements preserve the positive results while making clear which singular events, population limits, and physical account maps remain unresolved.
