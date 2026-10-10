# Symmetry, equal speed and constant speed on one sphere

## Research status and scope

This is the symmetry worker's first independent analytical report for the [spherical 3:3 campaign](spherical-three-three-overnight-research-plan.md). The result is derived and self-reviewed, pending independent adjudication. No dynamics-worker or reviewer conclusions were read before this report. The [campaign synthesis](spherical-three-three-synthesis.md) is maintained by the coordinator. The analysis concerns the canonical [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), with all admitted partner and positive-delay self roots and the explicitly selected radial sphere constraint. It introduces no tangential controller, speed cap, damping, smoothing or event rule.

The main result is stronger than a warning that symmetry is insufficient. An explicitly specified complete preparation has a transitive symmetry, equal nonzero speeds, a complete ordinary root ledger, and an exactly negative common speed derivative upon normal-constrained release. A short unique release exists by a smooth ordinary differential equation argument because all partner emissions initially remain in the stationary part of the preparation. Thus this preparation gives a local constrained evolution with equal but nonconstant speeds. It does not establish an eternal solution satisfying the equation throughout its prepared past, a stable assembly, a periodic motion or a physical source of confinement.

## Equation and symmetry action

Write the fixed sphere as $|\mathbf X_i|=R$, its outward unit normal as $\mathbf n_i=\mathbf X_i/R$, and the member velocity as $\mathbf V_i$. Choose the sphere center as the spatial origin. Let $q_i=\sigma_i q$, with $q>0$, three signs $\sigma_i=+1$ and three signs $\sigma_i=-1$. Put $K_{\mathrm{int}}=\kappa q^2>0$. For each admitted emission time $S<T$, define $\mathbf r_{ij}=\mathbf X_i(T)-\mathbf X_j(S)$ and $r_{ij}=|\mathbf r_{ij}|$. The canonical acceleration and selected constrained equation are

$$
\mathbf A_i[\mathbf X](T)=K_{\mathrm{int}}\sum_j\sum_{S\in\mathcal C_{ij}(T)}\sigma_i\sigma_j\frac{\mathbf r_{ij}}{r_{ij}^3}\frac{c_f}{|c_f-\mathbf V_j(S)\cdot\hat{\mathbf r}_{ij}|},
\qquad
\ddot{\mathbf X}_i=\mathbf A_i+\lambda_i\mathbf n_i.
$$

Here $\mathcal C_{ij}(T)$ contains every admitted positive-delay solution of $r_{ij}=c_f(T-S)$. The factor depends on the transmitter velocity at emission; it is not the signed root-playback ratio. Every numerical instantiation below uses $c_f=1$. Differentiating the sphere identity twice fixes the normal support and leaves the speed equation

$$
\lambda_i=-\frac{|\mathbf V_i|^2}{R}-\mathbf n_i\cdot\mathbf A_i,
\qquad
\frac{d}{dT}\frac{|\mathbf V_i|^2}{2}=\mathbf V_i\cdot\mathbf A_i.
$$

The second equation is a kinematic identity, not an assertion that the squared speed is a physical energy. Normal support cannot change speed because $\mathbf V_i\cdot\mathbf n_i=0$.

Consider a constant orthogonal spatial map $Q\in O(3)$, a permutation $p$ of the six identities, and a single global sign $\chi\in\{+1,-1\}$ such that

$$
\sigma_{p(i)}=\chi\sigma_i
\quad\text{for every }i.
$$

The case $\chi=+1$ preserves each polarity class. The case $\chi=-1$ swaps the two entire classes and uses global polarity conjugation. It is allowed because every product $\sigma_i\sigma_j$ is unchanged. Arbitrary partial polarity flips are not a symmetry of this law. A polarity-preserving permutation alone has separate orbits in the two classes; it cannot imply equality between all six speeds without an additional relation connecting the classes.

**Derived equivariance statement.** If the transformed complete history obeys $\widetilde{\mathbf X}_{p(i)}(T)=Q\mathbf X_i(T)$, its roots correspond one for one at the same emission times, including all positive-delay self roots. Distances and transmitter scalar products are unchanged, so $\widetilde{\mathbf A}_{p(i)}=Q\mathbf A_i$. The sphere projection transforms in the same way and $\widetilde\lambda_{p(i)}=\lambda_i$. Reflections are included: the kernel contains vectors and scalar products, with no handed cross-product input. Translation of the entire problem moves the sphere center; it is not a symmetry of a sphere held at an already fixed center. Time translation is a symmetry of the autonomous problem on appropriately translated complete histories. Time reversal is not asserted, since it reverses the causal ordering.

**Derived conditional symmetry-preservation theorem.** Suppose a group of such pairs $(Q,p)$ fixes the entire prescribed past, not only the current positions. Suppose the constrained initial-history problem has a unique continuation in the specified solution class on an interval. Applying any group element gives another continuation from the same history. Uniqueness therefore makes it the same continuation. If the group's permutation action is transitive on the six identities, then

$$
|\mathbf V_1(T)|=\cdots=|\mathbf V_6(T)|=s(T)
$$

on that interval. The theorem gives a common scalar function $s(T)$; it supplies no equation setting $\dot s$ to zero. It also makes the six scalar acceleration powers $\mathbf V_i\cdot\mathbf A_i$ equal. Their common value can be nonzero. A transformed root omitted by an instrument, a support rule that breaks the symmetry, an asymmetric past or failure of uniqueness invalidates this argument. A present-time symmetric drawing is insufficient.

This theorem does not borrow uniqueness from an auxiliary regulated model. In general the canonical continuation domain remains a separate obligation. The counterexample below supplies its own local uniqueness proof on a strictly delayed sub-wake-speed chart.

## A concrete transitive history class

Let $Q_k$ rotate space around the $z$ axis through $2\pi k/3$, for $k=0,1,2$, and define

$$
\mathbf u(\alpha,\phi)=(\cos\alpha\cos\phi,\cos\alpha\sin\phi,\sin\alpha),
\qquad
\mathbf X_{+,k}(T)=R Q_k\mathbf u(\alpha(T),\phi(T)),
\qquad
\mathbf X_{-,k}(T)=-\mathbf X_{+,k}(T).
$$

The upper three histories have one polarity; their antipodes have the other. These six histories are fixed by the $120$-degree rotation and cyclic permutation within each class, and by inversion $Q=-I$ together with simultaneous swapping of all three polarity pairs. The resulting $C_3\times C_2$ action is transitive on all six labels. The inversion is a spatial operation together with a globally conjugating identity permutation; it does not mean an individual architrino changes polarity during evolution.

Every differentiable history in this class has the same simultaneous speed,

$$
s(T)^2=R^2\left[\dot\alpha(T)^2+\cos^2\alpha(T)\dot\phi(T)^2\right].
$$

This formula permits arbitrary common speed variation kinematically. To become a constrained solution, the representative must also satisfy both components of the tangent equation. With $\mathbf e_\alpha=\partial_\alpha\mathbf u$, $\mathbf e_\phi=(-\sin\phi,\cos\phi,0)$ and $A_\alpha=\mathbf A\cdot\mathbf e_\alpha$, $A_\phi=\mathbf A\cdot\mathbf e_\phi$, these components are

$$
R\left(\ddot\alpha+\sin\alpha\cos\alpha\dot\phi^2\right)=A_\alpha,
\qquad
R\left(\cos\alpha\ddot\phi-2\sin\alpha\dot\alpha\dot\phi\right)=A_\phi.
$$

At nonzero speed, constant speed requires $\dot\alpha A_\alpha+\cos\alpha\dot\phi A_\phi=0$, and the two tangent equations still have to hold. A zero acceleration component along the path does not establish the correct sideways curvature within the sphere. Fixed-latitude rigid rotation, for example, requires $A_\phi=0$ and $A_\alpha=R\sin\alpha\cos\alpha\Omega^2$. Its common constant speed is $R|\Omega|\cos\alpha$ by the ansatz, not by the discrete symmetry alone.

## Exact preparation with common speed drift

### Complete past and endpoint data

The following parameters specify one concrete case: $R=1$, $c_f=1$, $\alpha_0=\pi/6$, $\delta=1/4$, $\varepsilon=1/4$ and arbitrary fixed $K_{\mathrm{int}}>0$. Define the complete past for $T\le0$ by the transitive class above with $\phi(T)=0$ and

$$
\alpha(T)=
\begin{cases}
\alpha_0, &T\le-\delta,\\
\alpha_0+\varepsilon T(1+T/\delta)^3,&-\delta<T\le0.
\end{cases}
$$

The preparation is twice continuously differentiable at $T=-\delta$ and supplies all earlier history. At release, $\alpha(0)=\alpha_0$, $\dot\alpha(0)=\varepsilon$, and every member has speed $1/4$ toward increasing representative latitude. The three antipodal partners have the corresponding inverted velocities. The prepared history is not required to have been a free or normally constrained solution before release; it is explicitly initial data. At $T=0$ the right acceleration is set by the constrained equation and need not equal the left acceleration of the preparation. The resulting release is continuously differentiable and piecewise twice differentiable, with the equation imposed for $T\ge0$ using its right derivative at the cut. If the permitted preparation class instead requires the same equation for all past times or acceleration matching at the release cut, this case does not answer that narrower problem.

Put $v=1+T/\delta\in[0,1]$ during the recent preparation. Direct differentiation gives $\dot\alpha=\varepsilon v^2(4v-3)$. The factor lies in $[-1/4,1]$, so every prepared speed is at most $\varepsilon=1/4<1$. Also

$$
|\alpha(T)-\alpha_0|\le\frac{27\varepsilon\delta}{256}=\frac{27}{4096}.
$$

The maximum follows by maximizing $(1-v)v^3$ at $v=3/4$. The corresponding displacement on the unit sphere is no larger than this angular displacement.

### Complete causal-root ledger at release

For a receiver at its release position, the five distances to the stationary source positions are $3/2$ twice, $\sqrt7/2$ twice, and $2$ once. The first pair are like-polarity members on the same triangle; the second pair are opposite-polarity members other than its own antipode; the last is its antipode. Every partner source during $[-\delta,0]$ remains at distance at least

$$
\frac{\sqrt7}{2}-\frac{27}{4096}>\delta
$$

from that receiver. Thus no partner root lies in the recent preparation, since its delay there is at most $\delta$. In the earlier stationary portion there is exactly one root for each partner, at $S=-r_{ij}$. Every root samples zero transmitter velocity, hence $D_t=1$ and $W^{\mathrm{acc}}=1$ exactly. The entire five-root ledger is therefore explicit; no grid search or truncation is involved. The antipodal root at delay $2$ saturates the sphere's geometric upper bound and must be included.

There are no positive-delay self roots. The complete past is globally Lipschitz with speed bound $1/4$, so $|\mathbf X_i(0)-\mathbf X_i(S)|\le(0-S)/4<0-S$ for every $S<0$. This excludes the self-root equation at every positive delay. Self interaction is not discarded by convention; its root set is empty for this preparation.

### Closed-form initial update

Because all five arriving emissions are stationary, the initial acceleration is the ordinary static source sum at the declared six locations. Let $h=\sin\alpha_0$ and $\rho=\cos\alpha_0$. For the representative receiver, the like-polarity pair contributes

$$
\frac{A_\alpha^{\mathrm{like}}}{K_{\mathrm{int}}}=-\frac{h}{\sqrt3\rho^2}.
$$

To verify this projection, each same-triangle chord has length $\sqrt3\rho$ and scalar product $-3h\rho/2$ with $\mathbf e_\alpha=(-h,0,\rho)$. The two opposite-polarity non-antipodal chords have length $\sqrt{1+3h^2}$ and, after applying their negative polarity product, give

$$
\frac{A_\alpha^{\mathrm{opposite}}}{K_{\mathrm{int}}}=-\frac{3h\rho}{(1+3h^2)^{3/2}}.
$$

The remaining antipodal chord is parallel to the receiver normal and contributes no latitude component. Combining the rows and substituting $h=1/2$, $\rho=\sqrt3/2$ gives

$$
A_\alpha(0)=-K_{\mathrm{int}}\left[\frac{2}{3\sqrt3}+\frac{6\sqrt3}{7\sqrt7}\right]<0.
$$

Since $\mathbf V=\varepsilon\mathbf e_\alpha$ at release and radial support does no acceleration power, all six members obey the exact common derivative

$$
\boxed{\dot s_i(0+)=-K_{\mathrm{int}}\left[\frac{2}{3\sqrt3}+\frac{6\sqrt3}{7\sqrt7}\right]<0.}
$$

No physical energy account is used here. Equal speeds initially decrease because each member is moving against the same symmetry-related tangential acceleration. The normal constraint supplies the required radial part but cannot cancel this latitude component. This is an exact falsifier of the universal implication “a transitive symmetric complete preparation with equal speeds implies constant speed after normal-only release.” It does not exclude special constant-speed solutions.

For a complete initial support record, the radial component is

$$
\frac{A_n(0)}{K_{\mathrm{int}}}=\frac{1}{\sqrt3\rho}-\frac{1}{\sqrt{1+3h^2}}-\frac14
=\frac5{12}-\frac2{\sqrt7},
\qquad
\lambda(0+)=-\frac1{16}-K_{\mathrm{int}}\left(\frac5{12}-\frac2{\sqrt7}\right).
$$

The azimuthal acceleration vanishes by reflection across the representative meridian. These values specify every component of the initial normal-constrained update. They are direct evaluations, not an evolved numerical trajectory.

### Local existence and equality during the release

The release has a positive margin between every partner root and the boundary $S=-\delta$ of the stationary past. Choose a sufficiently short future interval and a small neighborhood of the initial positions in which every partner's distance from its fixed old position remains greater than $T+\delta$. Such a neighborhood exists because the smallest initial distance is $\sqrt7/2>\delta$. All partner emissions then remain at $S=T-|\mathbf X_i(T)-\mathbf x_j^0|<-\delta$, where $\mathbf x_j^0$ denotes the stationary source position. On that interval the exact canonical partner law reduces to

$$
\mathbf A_i(T)=K_{\mathrm{int}}\sum_{j\ne i}\sigma_i\sigma_j\frac{\mathbf X_i(T)-\mathbf x_j^0}{|\mathbf X_i(T)-\mathbf x_j^0|^3}.
$$

This is a smooth function of each receiver's current position in the chosen neighborhood. The sphere-projected position–velocity equation is consequently a smooth ordinary differential equation on the tangent bundle of the sphere and has a unique short solution. Its velocity stays strictly below $1$ for a sufficiently short interval by continuity from $1/4$. Combined with the past speed bound, this excludes all positive-delay self roots and makes the partner root function strictly monotone. Thus the reduced ordinary equation is exactly the full causal-root equation on that short interval, rather than a surrogate. It also preserves the initial sphere and velocity tangency constraints.

The transitive symmetry theorem now applies without invoking a global delayed-equation uniqueness theorem. All six speeds stay equal on that interval, and their common derivative remains negative on a possibly smaller interval by continuity. This establishes actual local existence with common speed drift analytically. No positive numerical duration, long-time extension or stability result is asserted. A failure of the stated positive-delay margins, the scalar projection calculation or smooth local existence hypotheses would overturn this claim; the explicit formulas above locate the checks.

## A controlled symmetry-breaking comparison

There is an equally explicit comparison with the same release positions, the same complete arriving-root ledger and initially equal speed magnitudes. Reverse the sign of $\varepsilon$ only for member $(+,0)$ in the recent preparation, leaving every other member unchanged. Its past speed and displacement bounds remain identical, so every arriving partner emission still samples the same stationary geometry. At release its velocity is $-\varepsilon\mathbf e_\alpha$ and its speed derivative is $-A_\alpha(0)>0$, while the other five still have the negative derivative above. The same local ordinary-equation argument applies. This breaks the full-history transitive symmetry and produces immediate speed splitting from equal speeds.

For arbitrarily small direction breaking, keep the perturbed member on the unit sphere using

$$
\mathbf X_{+,0}^{\eta}(T)=\cos[\varepsilon f(T)]\mathbf x_{+,0}^0+\sin[\varepsilon f(T)]\left(\cos\eta\,\mathbf e_\alpha+\sin\eta\,\mathbf e_\phi\right),
\qquad
f(T)=T(1+T/\delta)^3
$$

on the recent interval and its original stationary value earlier. Its initial speed stays $\varepsilon$, but the initial derivative is $A_\alpha(0)\cos\eta$, because $A_\phi(0)=0$. The difference from the other five is $A_\alpha(0)(\cos\eta-1)$, nonzero for sufficiently small nonzero $\eta$ and quadratic in $\eta$. This deliberately quadratic response prevents mistaking small numerical splitting for a missing symmetry effect. The meridional unperturbed history equals the same great-circle formula at $\eta=0$.

Both comparisons are derived preparation controls. They nominate exact inputs and initial answers for a separately authored dynamics instrument; no such instrument or numerical release was run by this worker.

## Simultaneous symmetry versus choreography

A spatial/permutation symmetry that fixes each time slice gives simultaneous equality. A choreography instead relates different times. If a complete solution satisfies

$$
\mathbf X_{p(i)}(T)=Q\mathbf X_i(T+\tau),
$$

then $s_{p(i)}(T)=s_i(T+\tau)$. The conclusion compares shifted speeds; it does not make all six equal at the same time. If $p$ has finite order $m$, repeated use gives $s_i(T)=s_i(T+m\tau)$, so a nonconstant periodic speed is compatible with this symmetry. The continuous spacetime symmetry of a rigid rotating relative equilibrium, $\mathbf X_i(T+u)=Q(u)\mathbf X_i(T)$ for every real $u$ in its domain, is stronger: orthogonality gives $s_i(T+u)=s_i(T)$ for every $u$, hence constant speed. Existence of that relative equilibrium still requires the full constrained equation and root ledger.

An orthogonal-three-plane drawing does not by itself exhibit either relation on complete histories. Its label permutation, spatial map, polarity relation and time shift must be specified and checked before speed conclusions follow. Equal second spatial moments likewise do not imply either uniform occupation of the sphere or the dynamical symmetry used here.

## What the energy chapter permits

The live [Energy chapter](../../../../../content/markdown/aaa/dynamics/energy.md#kinetic-energy-and-momentum-of-a-single-architrino) explicitly treats $K(s)$ as a candidate isotropic kinetic account. Its existence and form are guessed pending branch consistency. Its monotonicity would make a separately established individual kinetic value select a speed, but no such individual invariant follows from the present symmetry. The exact differentiation identity is $dK(s_i)/dT=K'(s_i)\mathbf V_i\cdot\mathbf A_i/s_i$. A normal constraint contributes zero to that derivative under this candidate account.

Even a future accepted total-energy functional would have the form of a history-aware account. For a symmetric motion its schematic decomposition is $E=6K(s)+H[\text{complete history}]$, with $H$ standing for whatever interaction and wake terms are actually derived. Constancy of $E$ does not imply constancy of $s$ when $H$ changes. Neither this notation nor time-translation equivariance constructs a conserved functional; the Energy chapter retains action, same-record provenance and boundary closure obligations. No primitive physical mass or $ms^2/2$ is introduced.

Energy therefore does not currently select a numerical pair $(R,s)$ for this experiment. If a validated energy map $\mathcal E(R,s,\text{shape},\text{history})$ becomes available, fixing its value supplies one relation. The constrained equations, admissibility and any branch-selection condition must supply the remaining relations; a fixed energy value alone need not isolate one radius and speed. The external normal support further prevents identifying a constrained branch with a free physical assembly without a support-provider account.

The dimensionless coordinates $g=K_{\mathrm{int}}/(Rc_f^2)$ and $\beta=s/c_f$ organize the experiment without calling them energy levels. As derived in the [scale analysis](preparation-controls-and-population-scales.md#a-scaled-history-needs-an-equation-check), scaling lengths and times together preserves $c_f$ but requires scaling $K_{\mathrm{int}}$ by the same length factor to preserve a generic solution. At fixed $K_{\mathrm{int}}$ and $c_f$, changing $R$ is a physically different dimensionless problem. The present counterexample is a short-time constrained release, not a selected energy branch.

## Verification and handoff record

The mathematical instrument for the first report is the explicit analytical root census and vector projection above. No new parser, numerical root finder, integration instrument, external source or heavy computation was used. The stationary static rows also provide exact positive controls for a separate instrument, and the equal-speed splitting preparation provides a negative control for an erroneous claim that equal initial speeds must persist. Independent verification is outstanding; self-review does not supply it.

Before authoring, `shasum -a 256` on the five dispatched source files matched every supplied dispatch identity. The file was absent before authoring by scoped `ls`, and its path had no tracked modification by scoped `git --no-optional-locks status --short`. Only this assigned analysis file was written by this worker. The original comparison packet, canonical equation, Energy chapter, reference outputs and shared trackers were left intact. No generated write or publication command was run.

Document verification: `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/noether-sea-research/analysis/spherical-three-three-symmetry.md` emitted no whitespace diagnostics; its exit status was 1 because the new file differs from `/dev/null`. Ordinary scoped `git diff --check` also emitted no diagnostics, but does not inspect an untracked file and is not the substantive check. Explicit `ls` of the five linked file destinations and `rg` of the three linked section headings confirmed their existence. These are document checks only, not independent mathematical acceptance.

Durable evidence consists of this self-contained mathematical construction and its exact reproduction inputs. Its regeneration needs finite symbolic calculations rather than a costly job; no numerical timing claim is made. There are no bulky outputs or owned compute jobs to retain or close. Coordinator integration and independent adjudication remain open. The worker remains available for bounded follow-up within the campaign deadline.

The strongest unresolved research question is whether a complete all-time solution, including its entire past, supports a constant-speed normal-only branch on the sphere and whether any such branch can shed its radial support. The counterexample rejects an unconditional symmetry implication, while leaving that existence question intact.
