# Independent review of fixed-sphere 3:3 motion

## Frozen initial reference and scope

This initial reference was independently reconstructed from the canonical [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), Euclidean geometry and differentiation of the sphere constraint. The campaign plan was read as a proposal; no symmetry-worker or dynamics-worker result or instrument was read before this reference was frozen. The [Energy chapter](../../../../../content/markdown/aaa/dynamics/energy.md#kinetic-energy-and-momentum-of-a-single-architrino) supplies the boundary on kinetic bookkeeping. The existing [six-point spherical comparison](../../braid-program/analysis/neutral-six-point-balance-and-phase-compensated-symmetric-rotation.md) was read for its declared chart and scope, without treating its historical search as current evidence.

The system has three members of each polarity, a fixed center $\mathbf C$, radius $R>0$, and complete prescribed or actual histories on that sphere. Numerical examples use $c_f=1$. The sole selected modification is a radial constraint acceleration. The statements below apply wherever the canonical acceleration sum is defined; no collision, non-simple-root or endpoint-birth continuation is supplied. The initial reference contains mathematical controls and qualifications, not an evolved trajectory, a stability verdict or a physical confinement mechanism.

## Constraint, speed and complete vector residual

Write $\mathbf n_i=(\mathbf X_i-\mathbf C)/R$, $\mathbf v_i=\dot{\mathbf X}_i$, $s_i=|\mathbf v_i|$ and $\mathbf A_i$ for the canonical delayed acceleration evaluated on the declared histories. Twice differentiating $|\mathbf X_i-\mathbf C|^2=R^2$ gives

$$
\mathbf n_i\cdot\mathbf v_i=0,
\qquad
\mathbf n_i\cdot\ddot{\mathbf X}_i=-\frac{s_i^2}{R}.
$$

Thus a radial addition $\lambda_i\mathbf n_i$ has a unique signed coefficient, and the resulting equation can be written with the tangent projector $P_i=I-\mathbf n_i\mathbf n_i^{\mathsf T}$:

$$
\lambda_i=-\frac{s_i^2}{R}-\mathbf n_i\cdot\mathbf A_i,
\qquad
\ddot{\mathbf X}_i=P_i\mathbf A_i-\frac{s_i^2}{R}\mathbf n_i.
$$

The projector removes the radial part of the supplied acceleration; the remaining radial term is fixed by the curvature of the sphere. This is exact constraint differentiation, not an imported inertial or mass law. Dotting the equation with velocity gives

$$
\frac{d}{dT}\frac{s_i^2}{2}=\mathbf v_i\cdot\mathbf A_i.
$$

Consequently a solution has constant speed precisely when the right-hand side vanishes throughout its interval. Equality of all six speeds is a different property: on an equal-speed solution it requires equality of the six scalar products, which can share a nonzero value. Equivariance and a uniqueness theorem can preserve a full-history symmetry; equal positions or speeds at one instant do not themselves supply either premise.

For a prescribed $C^2$ spherical path the diagnostic

$$
\boldsymbol\rho_i=\ddot{\mathbf X}_i+\frac{s_i^2}{R}\mathbf n_i-P_i\mathbf A_i
$$

is tangent. Its vanishing is necessary and sufficient for that prescribed history to satisfy the normal-constrained equation at the evaluated event. At positive constant speed, define $\mathbf t_i=\mathbf v_i/s_i$. Then $\mathbf t_i\cdot\boldsymbol\rho_i=-\mathbf t_i\cdot\mathbf A_i$. Zero along-path residual leaves another tangent direction unchecked. For example a prescribed small latitude circle has a sideways acceleration within the sphere's tangent plane, even when its speed is constant. Normal support alone cannot repair a nonzero residual in that direction. At rest, $\mathbf t_i$ is undefined; use the vector residual and the squared-speed identity directly.

> Claim grade: derived on differentiable histories with defined canonical acceleration. Falsifier: a $C^2$ fixed-sphere path satisfying the stated equation but violating either constraint identity, or a path with zero full residual that fails the equation, would contradict the differentiation and projection above. The relevant quantities are pointwise derivatives and the complete canonical sum, not sampled speed plots.

## Exact projection of every spherical causal hit

Let $\mathbf x=\mathbf X_i(T)-\mathbf C$ and $\mathbf y=\mathbf X_j(S)-\mathbf C$ have length $R$, with $r=|\mathbf x-\mathbf y|>0$ and $\mathbf e=(\mathbf x-\mathbf y)/r$. The chord geometry gives $r^2=2R^2-2\mathbf x\cdot\mathbf y$, so

$$
\mathbf n_i\cdot\mathbf e=\frac{r}{2R},
\qquad
P_i\mathbf e=\frac{\mathbf x-\mathbf y}{r}-\frac{r}{2R}\mathbf n_i.
$$

At a simple root, put $D_t=c_f-\mathbf e\cdot\mathbf v_j(S)$ and $K_{ij}=\kappa|q_iq_j|$. The canonical per-hit acceleration and its radial projection are therefore

$$
\mathbf A_{ij,S}=\frac{K_{ij}\sigma_{ij}c_f}{r^2|D_t|}\mathbf e,
\qquad
\mathbf n_i\cdot\mathbf A_{ij,S}=\frac{K_{ij}\sigma_{ij}c_f}{2Rr|D_t|}.
$$

Every like-polarity hit has positive outward projection and every unlike-polarity hit has negative projection, regardless of emission speed or the sign of $D_t$. In particular every admitted self hit pushes outward relative to the sphere's center. Cancellation can occur only in the signed sum. The coefficient contains the transmitter factor alone; the receiver factor $D_r=c_f-\mathbf e\cdot\mathbf v_i(T)$ controls root playback and does not multiply the acceleration.

> Claim grade: derived for noncoincident, simple hits with positive coupling. Falsifier: substitute two equal-radius points and the canonical kernel; failure of the displayed chord or projection identity would refute the result. The sign claim does not assert that the total radial acceleration has one sign in a neutral assembly.

## Finite delay, endpoint inclusion and root-count qualifications

Put $u=T-S>0$ and define the root function $F_{ij}(u)=|\mathbf X_i(T)-\mathbf X_j(T-u)|-c_fu$. Sphere diameter bounds every source-receiver chord by $2R$, hence every causal root satisfies

$$
0<u\le L,\qquad L=\frac{2R}{c_f}.
$$

The upper endpoint is included. An antipodal emission at $u=L$ is a valid positive-delay root. If the source history is differentiable on the sphere at that event, its velocity is tangent to the sphere and perpendicular to the antipodal chord. Therefore $D_t=c_f$ and $F'_{ij}(L)=-c_f$: this endpoint root is simple. If the receiver is also tangent to the sphere, $D_r=c_f$ there as well. Discarding the endpoint loses a regular hit, and calling it a fold is incorrect.

The bound applies to all older emissions only if the source remains on the same fixed sphere over that older history, or an independent exclusion argument handles the older part. A record of the most recent $L$ units does not by itself prove that older, off-sphere emissions cannot arrive. A translating center is outside this diameter proof.

A bounded delay interval is not yet a finite-root certificate because its lower endpoint is open and a non-simple root may admit arbitrarily close zeros. The following conditions are sufficient for a finite simple census at a fixed reception event: a proved root-free interval $(0,\epsilon)$, a continuous source history on $[T-L,T]$, differentiability near every root, and nonzero $D_t$ at every root in $[\epsilon,L]$. The root set is closed in that compact interval. Infinitely many roots would have an accumulation root; differentiability with nonzero derivative makes that root locally isolated, a contradiction. A uniform positive numerical floor is useful for conditioning, but the qualitative finiteness argument only needs simplicity plus the lower-end exclusion. It does not establish uniform conditioning over a future time interval.

Two useful lower-end controls are available without numerical scanning:

- For partners with present separation $d=|\mathbf X_i(T)-\mathbf X_j(T)|>0$ and source speed bounded by $M$ on the inspected interval, a root has $c_fu\ge d-Mu$, hence $u\ge d/(c_f+M)$. Coincident partner positions do not have this protection.
- For self history differentiable at $T$, $|\mathbf X_i(T)-\mathbf X_i(T-u)|/u\to s_i(T)$. If $s_i(T)\ne c_f$, continuity gives a root-free neighborhood of zero. The limit alone supplies no finite computable neighborhood and proves nothing at $s_i(T)=c_f$.

When the source speed is uniformly bounded by $M<c_f$ over the full sphere delay window, every partner root has $D_t\ge c_f-M>0$. The root function is strictly decreasing (equivalently its distance part is $M$-Lipschitz), is positive at zero for distinct present partners, and is nonpositive at $L$. Thus exactly one partner root exists. No positive-delay self root exists if self speed is at most $c_f$ throughout the connecting interval: its chord is at most its path length, which is at most $c_fu$. Equality would require a straight segment of positive length at speed $c_f$; no such segment lies on a finite fixed sphere. This stronger self exclusion requires the entire interval's speed bound, not the receiver's current speed alone.

For a $C^3$ constant-speed self history at $s=c_f>0$, a separate local expansion confirms lower-end exclusion:

$$
\frac{|\mathbf X(T)-\mathbf X(T-u)|}{u}
=s-\frac{|\ddot{\mathbf X}(T)|^2}{24s}u^2+o(u^2).
$$

To obtain it, expand the displacement as $u\mathbf v-u^2\mathbf a/2+u^3\mathbf j/6+o(u^3)$ and use $\mathbf v\cdot\mathbf a=0$, $\mathbf v\cdot\mathbf j=-|\mathbf a|^2$. Sphere curvature gives $|\mathbf a|\ge s^2/R>0$, so the ratio is strictly below $c_f$ near zero. Merely having instantaneous speed $c_f$ is insufficient for this constant-speed expansion.

> Claim grade: derived with the explicit continuity, differentiability, separation and speed hypotheses above. Falsifiers: a root beyond $L$ with both endpoints on the fixed sphere, an antipodal root with nonzero tangent velocity projection on its chord, two roots under the strict source-speed bound, or a positive-delay self root under the full-interval speed bound would contradict the stated geometric estimates. A root scanner that returns no hits without checking near zero, the upper endpoint and non-simple zeros does not test these claims completely.

## Analytical controls frozen before numerical target use

These exact controls can be used by a separately authored instrument. No instrument or target computation was run to select their expected values.

### Constraint controls

At $\mathbf X=(R,0,0)$ and $\mathbf v=(0,s,0)$, the outward normal is $\mathbf e_x$.

| Supplied diagnostic acceleration | Expected $\lambda$ | Expected constrained acceleration | Expected $d(s^2/2)/dT$ |
| --- | --- | --- | --- |
| $\mathbf0$ | $-s^2/R$ | $-(s^2/R)\mathbf e_x$ | $0$ |
| $-(s^2/R)\mathbf e_x$ | $0$ | $-(s^2/R)\mathbf e_x$ | $0$ |
| $a\mathbf e_y$ | $-s^2/R$ | $-(s^2/R)\mathbf e_x+a\mathbf e_y$ | $sa$ |
| $b\mathbf e_z$ | $-s^2/R$ | $-(s^2/R)\mathbf e_x+b\mathbf e_z$ | $0$ |

The third row is a negative control against hidden speed projection. The fourth is a negative control against using zero scalar power as a full path test: a prescribed equatorial great circle has residual $-b\mathbf e_z$. These synthetic accelerations verify projection arithmetic only; they are not adopted interaction variants.

### Stationary partner and receiver-factor control

Take $R=c_f=K_{ij}=1$, receiver at $(1,0,0)$ and a stationary transmitter at $(0,1,0)$. Exactly one root occurs at $u=\sqrt2$, with $D_t=1$ and

$$
\mathbf A_{ij}=\frac{\sigma_{ij}}{2\sqrt2}(1,-1,0).
$$

Give the receiver the tangent velocity $(0,-\sqrt2,0)$. Then $D_r=0$, but the same nonzero acceleration remains. This directly detects an erroneous receiver multiplier. Reversing polarity reverses the acceleration, and a stationary same-transmitter history has no positive-delay self root.

### Circular self-root control with an exact endpoint

Prescribe $\mathbf X(t)=R(\cos\omega t,\sin\omega t,0)$, $\omega>0$, with reception at $T=0$. Set $\beta=R\omega/c_f$ and $x=\omega u/2$. The complete self-root equation becomes

$$
x=\beta|\sin x|,\qquad 0<x\le\beta.
$$

For $0<\beta\le1$, the strict inequality $|\sin x|<x$ excludes every positive root. For $1<\beta<\pi$, there is exactly one: $\sin x/x$ decreases strictly from $1$ to $0$ on $(0,\pi)$, since $\sin x-x\cos x$ has derivative $x\sin x>0$. At that root,

$$
D_t=c_f(1-\beta\cos x)>0,
\qquad
\mathbf e=(\sin x,\cos x,0).
$$

The derivative sign follows from $\sin x-x\cos x>0$ and $\beta=x/\sin x$. With $R=c_f=K_{ii}=1$ and $\beta=\pi/2$, the unique root is exactly $x=\pi/2$, $u=2$, at the closed delay endpoint, with $D_t=D_r=1$ and $\mathbf A_{ii}=(1/4,0,0)$. Thus the isolated self contribution is outward and has zero tangent component at this speed; it requires inward support $\lambda=-\pi^2/4-1/4$ to sustain this prescribed circular single-history diagnostic. This is not a six-member solution.

For $1<\beta<\pi/2$ its self tangential contribution is positive, and for $\pi/2<\beta<\pi$ it is negative because $\cos x$ changes sign. Any all-root implementation that claims this domain must recover the absent-root control, the exact endpoint root and the tangent sign change. For $\beta\ge\pi$, this one-lobe proof no longer establishes the complete census; all additional lobes must be included or excluded separately.

> Claim grade: derived analytical controls. Falsifiers: direct substitution into the prescribed curves, the canonical per-hit law or the constraint equation yielding another result. They are frozen independently of the subject instrument and establish no scientific six-member result by themselves.

## Receipt, preservation and next review obligation

Admission used `node scripts/agent-dispatch-session.mjs receive-file` for `.local-data/agent-dispatch/sphere-review-20261010`; it returned payload verification success and the complete assignment. `shasum -a 256` on AGENTS, Master Equation, Energy, the assigned role and the plan matched all five dispatch identities before writing this report. The reviewer session identity is `01a123e1-a026-7713-9dd2-d994947dd381`. Only this assigned report was written for the initial freeze. No numerical instrument, Python process or heavy job was launched. The mathematical reference is retained here and can be regenerated from the explicit derivations; there is no bulky or sole scratch evidence to preserve.

The coordinator receives this frozen initial reference for `spherical-three-three-synthesis.md`. Subsequent adjudication will be appended under a separate heading after subject claims and exact receipts are frozen. Outstanding scientific obligations are an actual six-member history with a complete root census, the full vector residual over its declared domain, and separate existence/evolution, stability and physical-support arguments. The energy-radius-speed map remains a hypothesis: the canonical acceleration law and the kinematic scalar $s^2/2$ do not define it. Work remains available for the assigned independent adjudication; no scientific acceptance is claimed.

## Adjudication of the frozen orthogonal-circle candidate

This section was begun only after the initial reference above was retained and sent to the coordinator. The subject is the [dynamics worker's prescribed orthogonal-circle history](spherical-three-three-dynamics.md), together with its [diagnostic](../evidence/spherical-three-three-dynamics-diagnostic.mjs). Its entire histories are $\mathbf u_0=(\cos\theta,\sin\theta,0)$, $\mathbf u_1=(0,\cos\theta,\sin\theta)$ and $\mathbf u_2=(\sin\theta,0,\cos\theta)$, with positive polarity on $\mathbf u_k$ and negative polarity on $-\mathbf u_k$, where $\theta=\beta T$, $R=c_f=K_{\mathrm{int}}=1$.

The common sphere and tangent-speed hypotheses hold exactly. Cyclic coordinate permutation and simultaneous inversion with global polarity conjugation act transitively at a common time, preserving pair polarity products. Different circle vectors have dot product $\sin\theta\cos\theta$, so allowing their antipodes gives simultaneous distance at least $1$ for nonantipodal partners. For $0<\beta<1$, the independent uniqueness and no-self-hit results above give exactly thirty directed partner roots and no positive-delay self roots at every reception event. These are geometric proofs for the prescribed histories, not consequences of a scan.

### A continuous speed interval excluded by one event

At phase zero, receiver $\mathbf u_0$ is at $\mathbf e_x$ with tangent $\mathbf e_y$. Only the antipodal member on its own circle and the two members on the $yz$ circle contribute to its $y$ acceleration. The other two source histories lie in the $xz$ plane, so their chord directions have zero $y$ component.

For the antipodal source, let $x=\beta u/2$, where $u$ is its delay. In the domain $0\le\beta\le3/4$, the unique root obeys $u=2\cos x$ and $x=\beta\cos x$, with $0\le x\le\beta$. Its $y$ acceleration contribution is $\sin x/[4\cos^2x(1+\beta\sin x)]$. Both $yz$ sources have exact distance and delay $\sqrt2$ and transmitter factor $D_t=1$; their radial components cancel and their $y$ contributions add. Consequently

$$
A_y(0)=\frac{\sin x}{4\cos^2x(1+\beta\sin x)}-\frac{\cos(\sqrt2\beta)}{\sqrt2}.
$$

This formula is independently derived from the five individual canonical contributions. It does not reuse the subject's numerical root results. It proves a uniform negative sign using elementary alternating Taylor bounds. Put $a=3/4$ and define the rational bounds

$$
U=a-\frac{a^3}{6}+\frac{a^5}{120}=\frac{27921}{40960},
\qquad
L=1-\frac{a^2}{2}+\frac{a^4}{24}-\frac{a^6}{720}=\frac{239759}{327680},
$$

$$
C=1-\frac9{16}+\frac{81}{1536}-\frac{729}{368640}=\frac{19999}{40960}.
$$

The Taylor remainder signs give $\sin a\le U$, $\cos a\ge L$ and $\cos(3\sqrt2/4)\ge C$. Since $x\le\beta\le a$, the positive term is at most $U/(4L^2)$. The negative term's magnitude is at least $2C/3$ because $1/\sqrt2>2/3$ and cosine is positive and decreasing over this interval. The exact rational difference is

$$
\frac{2C}{3}-\frac{U}{4L^2}
=\frac{25382122195519}{3531840189296640}
>\frac7{1000}.
$$

Thus $A_y(0)<-0.007$ for every $0\le\beta\le3/4$. At positive speed, the required along-path support is $\mu=-A_y>0.007$. The prescribed equatorial member has no tangent acceleration, so a normal correction cannot supply this missing along-path acceleration. At zero speed, the same negative component directly contradicts stationarity with normal support alone, without introducing an undefined unit tangent.

> Claim grade: derived. The specified orthogonal-circle family is not an exact normal-only constrained solution for any $0<\beta\le3/4$ at positive coupling. The result rescales by $K_{\mathrm{int}}/R^2$ at fixed $\beta$ and therefore does not depend on an arbitrary choice of positive coupling magnitude. Falsifier: an error in one of the five phase-zero canonical contributions, the root equation, or the exact rational Taylor inequality would overturn the proof. Another geometry, nonuniform angular history, different prescribed speed, or added tangent support lies outside this exclusion; no global six-member obstruction follows.

### Independent numerical magnitude check

The separately authored [phase-zero reference](../evidence/spherical-three-three-review-reference.mjs) uses scalar chord equations, a contraction iteration, and the exact paired $yz$ contribution. It imports no subject code. Its first controls execution initially failed to parse because JavaScript requires parentheses around a negated exponentiation; this was repaired before any target use. The subsequent `controls` run passed the known contraction map $u\mapsto1+u/2$ with root $2$, rejected a noncontractive coefficient, reproduced the exact stationary-octahedral vector, and checked the rational gap by integer arithmetic. The [control receipt](../evidence/spherical-three-three-review-controls.json) was retained and the pass reported before running `target`.

The independently measured phase-zero values are:

| $\beta$ | $\lambda$ | $\mu$ | Sideways residual | Full residual magnitude |
| --- | ---: | ---: | ---: | ---: |
| $1/4$ | $0.185545511268192$ | $0.603227657742393$ | $0.452498176377726$ | $0.754081034564947$ |
| $3/4$ | $-0.266447790744075$ | $0.194977483730532$ | $0.085437362299186$ | $0.212874991576118$ |

Here positive sideways residual is the component along $\mathbf e_z$ of the prescribed acceleration minus the canonical acceleration; the prescribed great circle requires zero acceleration along that direction. Both the along-path and sideways failures are present at these events. The radial support changes sign between the two cases, which does not remove either tangent residual.

> Claim grade: measured with `node .../spherical-three-three-review-reference.mjs target`, retained in the [target receipt](../evidence/spherical-three-three-review-target.json). This is binary64 arithmetic at two events, not an interval enclosure or a full-period validation. Falsifier: an independently accurate evaluation of the same scalar roots and canonical contributions disagreeing beyond the stated comparison tolerance would invalidate the numerical magnitude check; the analytical negative proof is separate.

A comparator first passed a synthetic vector-difference control with expected answer $2$, then compared the reference with receiver zero at phase zero in the subject's `.local-data/master-equation-closure/spherical-three-three/dynamics/subfield-768.json`. The maximum component/support differences were $3.33\times10^{-16}$ at $\beta=1/4$ and $1.17\times10^{-15}$ at $\beta=3/4$, below the declared comparison tolerance $2\times10^{-14}$; the [comparison receipt](../evidence/spherical-three-three-review-comparison.jsonl) retains the subject and reference hashes. This tolerance measures implementation agreement only; it is not a certified error bound on either entire computation.

The subject's projection arithmetic matches the independent identities and its regular sub-wake root theorem is sound. Its machine bracket width and residual are floating-point diagnostic values, not outward-rounded interval certificates. Its sampled extrema are extrema over sampled phases, not certified bounds over the full period. Neither limitation weakens the one-event analytical exclusion above. The subject instrument was not modified.

### Review disposition and remaining scope

Accepted at the stated grade: the prescribed geometry, exact sub-wake root census, normal/along-path/sideways residual definitions, and the phase-zero binary64 magnitudes. Refuted at derived grade: normal-only compatibility of the exact orthogonal-circle family throughout $0<\beta\le3/4$. Unreviewed: every claimed full-period numerical extremum, beyond-wake-speed root census, any actual evolved trajectory, and any later symmetry-worker example until separately supplied. An exact or independently bounded six-member solution and its physical radial-support provider remain open.

## Independent adjudication of the prepared release and full sub-wake exclusion

The coordinator subsequently supplied the frozen [symmetry construction](spherical-three-three-symmetry.md) and the completed [quarter-period proof](spherical-three-three-dynamics.md#a-full-period-obstruction-for-the-synchronized-orthogonal-circle-family). `shasum -a 256` verified the supplied symmetry digest `ef75a6c34bba1e802433a5155e154d249959cb55f966bc7ebea99a538a6a3a51`; the inspected dynamics analysis had digest `df1367c7c4de5081e87da5b40fd3b872f1a1d35bab83053c88f25a24919f63ec`. The derivations below use the canonical kernel and the frozen independent reference above; no subject instrument or expected value was changed.

### The symmetric preparation does have a local constrained solution

**Verdict: accepted at derived grade within its explicit preparation class.** The construction is more than a nonzero derivative evaluated on arbitrary future curves. Its old stationary emission interval reduces the actual constrained initial-history equation to a smooth ordinary equation for a sufficiently short future interval. This supplies the existence and uniqueness hypothesis needed for symmetry preservation.

An independent way to verify the preparation is to put $v=1+T/\delta$, where $\delta=1/4$, and differentiate the recent latitude perturbation $\varepsilon T(1+T/\delta)^3$ with $\varepsilon=1/4$. Its velocity factor is $\varepsilon v^2(4v-3)$, whose minimum is $-\varepsilon/4$ at $v=1/2$ and maximum is $\varepsilon$ at $v=1$. Its displacement is bounded by $\varepsilon\delta\max_{[0,1]}(1-v)v^3=27/4096$. Both first and second derivatives match the stationary piece at $T=-\delta$. At $T=0$, position returns to latitude $\pi/6$ while velocity is the nonzero increasing-latitude vector of magnitude $1/4$.

For the representative location $\mathbf x=(\rho,0,h)$ with $(\rho,h)=(\sqrt3/2,1/2)$, the two same-triangle distances are $\sqrt3\rho=3/2$; the two non-antipodal opposite-triangle distances are $\sqrt{\rho^2+4h^2}=\sqrt7/2$; and its antipode is at distance $2$. The recent source displacement bound is less than the margin $\sqrt7/2-\delta$, so no recent partner emission can reach the receiver at the release event. Each old stationary source supplies one root at its distance, with $D_t=1$. The global speed bound $1/4$ excludes every positive-delay self root. In particular the antipodal root at delay $2$ is retained, in agreement with the independent endpoint control.

The initial acceleration can be checked without importing the symmetry worker's projection formula. The two same-triangle displacement vectors sum to $(3\rho,0,0)$, each with denominator $(\sqrt3\rho)^3$. The two opposite-triangle non-antipodal displacement vectors sum to $(\rho,0,4h)$, each with denominator $(\rho^2+4h^2)^{3/2}$ and a negative polarity product. The antipode contributes $-\mathbf n/4$. Therefore, with $d=\sqrt{\rho^2+4h^2}$,

$$
\frac{\mathbf A(0)}{K_{\mathrm{int}}}
=\left(\frac{1}{\sqrt3\rho^2}-\frac{\rho}{d^3}-\frac{\rho}{4},\quad 0,\quad-\frac{4h}{d^3}-\frac h4\right).
$$

Dotting with the latitude tangent $(-h,0,\rho)$ gives $-h/(\sqrt3\rho^2)-3h\rho/d^3$, while dotting with the normal $(\rho,0,h)$ gives $1/(\sqrt3\rho)-1/d-1/4$. Substitution yields exactly

$$
\dot s_i(0+)=-K_{\mathrm{int}}\left(\frac{2}{3\sqrt3}+\frac{6\sqrt3}{7\sqrt7}\right)<0,
\qquad
\lambda_i(0+)=-\frac1{16}-K_{\mathrm{int}}\left(\frac5{12}-\frac2{\sqrt7}\right).
$$

The first equality uses positive initial speed and the kinematic speed identity. It does not interpret $s^2/2$ as energy.

For local existence, let $\mathbf x_j^0$ denote the old stationary sites. Choose a small neighborhood of each initial receiver and a sufficiently short future interval such that $|\mathbf X_i(T)-\mathbf x_j^0|>T+\delta$ for every partner. This is possible by the strict positive margin above. On that neighborhood define the finite smooth field

$$
\mathbf F_i(\mathbf x)=K_{\mathrm{int}}\sum_{j\ne i}\sigma_i\sigma_j\frac{\mathbf x-\mathbf x_j^0}{|\mathbf x-\mathbf x_j^0|^3}.
$$

Solve the ordinary position–velocity equation on the sphere's tangent bundle with acceleration $P_i\mathbf F_i-s_i^2\mathbf n_i$ (unit radius). Its right-hand side is smooth away from the finite old source sites, so local existence and uniqueness follow for the stated initial tangent data. Shrink the interval until the solution stays in the chosen neighborhood and every speed remains below $1$, which is possible by continuity from $1/4$. Each partner then has the old root $S=T-|\mathbf X_i(T)-\mathbf x_j^0|<-\delta$. The combined prepared and new source paths are Lipschitz with a bound strictly below $1$, so the independent partner uniqueness theorem rules out every additional root and the self-root theorem rules out all positive-delay self roots. The ordinary solution therefore satisfies the complete delayed equation exactly on that interval. This ordering avoids assuming the desired delayed solution to justify its own reduction.

The static source field, initial positions, initial velocities and sphere projection respect the same transitive spatial/permutation/global-polarity symmetry. Uniqueness then preserves equal speeds. Their derivative is continuous from the strictly negative initial value, so it remains negative on a possibly smaller interval. This proves equal but nonconstant speed for an actual local normal-constrained release.

The proof accepts the prepared past as initial data and permits a jump in acceleration at the release cut. It supplies no solution of the same equation over that past, no positive numerical duration, and no global delayed continuation or stability theorem. Requiring an all-time solution or acceleration matching at the cut changes the premise and leaves that stronger problem unanswered.

> Claim grade: derived. Falsifier: an error in the vector sum, a failure of the old-root distance margin, or a failure of smooth local existence for the displayed noncollision ordinary equation would refute the local release result. A construction that requires the same dynamics in the prepared past would not falsify this result; it would impose a different hypothesis.

### The symmetry-breaking controls also follow

**Verdict: accepted at derived grade for the same preparation and local-release class.** Reversing one recent meridional preparation leaves its speed/displacement bounds and all arriving old emissions unchanged. At release it changes that member's velocity sign but not its acceleration, reversing its speed derivative while the other five retain theirs. For the small direction rotation, the release unit tangent is $\cos\eta\,\mathbf e_\alpha+\sin\eta\,\mathbf e_\phi$. The independently computed vector sum has zero azimuthal component, so its speed derivative is $A_\alpha\cos\eta$. The difference from the five unperturbed derivatives is $A_\alpha(\cos\eta-1)$, strictly positive for sufficiently small nonzero $\eta$ because $A_\alpha<0$. The leading difference is quadratic, not linear. These are exact initial comparisons with local existence; they are not numerical integrations or long-time perturbation results. Their falsifier is a nonzero azimuthal initial acceleration or a failure of the unchanged emission ledger under the stated displacement bound.

### Quarter-period cancellation extends the candidate exclusion to every sub-wake speed

**Verdict: accepted at derived grade for the synchronized orthogonal-great-circle family at every fixed $0<\beta<1$.** This extends the earlier independently proved phase-zero exclusion through $\beta=3/4$ without changing that earlier proof or its receipts.

The independent reconstruction starts with the receiver position $\mathbf u_0(\theta)$ and tangent $\mathbf t_0(\theta)$. For an orthogonal-circle source $j\in\{1,2\}$, use its unit curve $\mathbf u_j(\theta-\delta)$ and polarity/sign $\varepsilon$. Define $C_j=\mathbf u_0\cdot\mathbf u_j$ and $B_j=\mathbf t_0\cdot\mathbf u_j$. Trigonometric product identities give

$$
C_1=\frac{\sin(2\theta-\delta)+\sin\delta}{2},
\qquad
C_2=\frac{\sin(2\theta-\delta)-\sin\delta}{2},
$$

$$
B_1=\frac{\cos\delta+\cos(2\theta-\delta)}{2},
\qquad
B_2=\frac{-\cos\delta+\cos(2\theta-\delta)}{2}.
$$

The source's signed position is $\varepsilon\mathbf u_j$, so its squared chord is $d^2=2-2\varepsilon C_j$. Since $\partial_\delta C_j=-\mathbf u_0\cdot\mathbf u_j'$, its transmitter factor is $D_t=1+\varepsilon\beta\partial_\delta C_j/d$. Tangent projection of the chord contributes $-\varepsilon B_j/d$, and multiplication by the polarity product $\varepsilon$ gives the canonical tangent acceleration $-B_j/(d^3D_t)$.

Replacing $\theta$ by $\theta+\pi/2$ negates the double-angle sine and cosine. Simultaneously exchange source circles $1\leftrightarrow2$ and source signs $\varepsilon\leftrightarrow-\varepsilon$. Then $C_j$ and its $\delta$ derivative change to the negative of their paired values, leaving both $\varepsilon C_j$ and $\varepsilon\partial_\delta C_j$ unchanged. The entire delay equation and $D_t$ are identical at the same delay. The paired $B_j$ changes sign. Each distinct partner has exactly one root and all $D_t$ are positive for the fixed $\beta<1$, so this is a complete bijection of the four contributing roots, with no hidden sign from an absolute denominator. Hence their summed tangent acceleration reverses sign after a quarter period and has zero period average.

The own-circle opposite-polarity partner is unaffected by phase. Its unique root has $\xi=\beta\cos\xi$ and $0<\xi<\beta<1$. The already independently derived antipodal contribution is

$$
C(\beta)=\frac{\sin\xi}{4\cos^2\xi(1+\beta\sin\xi)}>0.
$$

There are no self roots. Therefore the full period average of the canonical tangent acceleration is $K_{\mathrm{int}}C(\beta)/R^2>0$. A constant-speed solution with only normal support has identically zero acceleration power and zero along-path acceleration at positive speed, so it cannot be this prescribed family. The required along-path correction has negative mean and RMS at least $K_{\mathrm{int}}C(\beta)/R^2$. Both statements follow from the exact root pairing and the elementary mean-square inequality, without a sampling or numerical integration argument.

The proof holds at every finite positive radius and coupling, at fixed $0<\beta<1$. It is not uniform continuation through $\beta=1$: the generic lower bound $D_t\ge1-\beta$ vanishes at that boundary, and the admitted census beyond it needs a separate proof. A positive mean evaluated on a prescribed curve is not an observed speed increase along an evolved trajectory. Other shapes, asynchronous histories and nonconstant-speed solutions remain outside this family exclusion.

> Claim grade: derived. Falsifiers: a counterexample to the explicit root pairing, a missing sub-wake root despite the proven speed/separation hypotheses, or a wrong antipodal tangent sign would overturn the all-sub-wake exclusion. A numerical scan beyond the proven speed domain cannot test this theorem without separately establishing its root census.

### Checkpoint disposition and preservation

The prepared symmetric release establishes actual short local evolution analytically, whereas the orthogonal-circle calculation excludes a prescribed candidate; these are different results and retain different histories. No correction to either frozen mathematical claim was found in this review. The symmetry theorem's uniqueness premise is independently supplied only in the prepared-release neighborhood, not for arbitrary delayed histories. The energy-radius-speed map and a physical source of radial confinement remain unresolved.

Only this assigned review record was edited during this follow-up. No numerical experiment, subject edit, new instrument, compute job or publication operation was performed. Earlier numerical receipts remain unchanged. The mathematical evidence is the explicit derivation retained here; the coordinator owns reconciliation into the shared synthesis. This completes the supplied dependent adjudications within the original assignment, while leaving the stated all-time existence and physical-support questions open.

## Frozen independent reference for scale and relative circle phases

This reference was derived and retained before reading the new symmetry scale companion or any dynamics result for relative phase shifts. It extends the same prescribed antipodal orthogonal-circle class and uses the already frozen canonical kernel, normal constraint and sub-wake root theorem. No new equation, continuation rule or numerical experiment is selected.

### Scale at fixed coupling

Let a complete history on radius $R$ be written $\mathbf X_i(T)=R\mathbf y_i(\tau)$ with $\tau=T/R$ and $c_f=1$. Thus $|\mathbf y_i|=1$, physical velocity is $\mathbf y_i'$ and physical acceleration is $\mathbf y_i''/R$, where primes denote derivatives with respect to $\tau$. Define the dimensionless canonical sum

$$
\mathbf H_i[\mathbf y](\tau)=\sum_{j,S}\frac{\sigma_i\sigma_j\mathbf e_{ij,S}}{d_{ij,S}^2|1-\mathbf e_{ij,S}\cdot\mathbf y_j'(S)|},
$$

where the sum includes every admitted dimensionless positive-delay root, $d$ is the dimensionless chord and $\mathbf e$ its unit direction. The physical acceleration is $K_{\mathrm{int}}\mathbf H_i/R^2$. With $P_i=I-\mathbf y_i\mathbf y_i^{\mathsf T}$, the normal-constrained equation is

$$
\mathbf y_i''=\frac{K_{\mathrm{int}}}{R}P_i\mathbf H_i-|\mathbf y_i'|^2\mathbf y_i.
$$

Consequently $g=K_{\mathrm{int}}/R$ is the dimensionless coupling at fixed $c_f=1$. Enlarging the sphere while stretching time by the same factor preserves speeds, root geometry and transmitter weights, but changes $g$ when the physical coupling is fixed.

More explicitly, set $\widetilde{\mathbf X}_i(T)=a\mathbf X_i(T/a)$ for $a>0$. Delays and chords scale by $a$, velocities and $D_t$ stay unchanged, and acceleration of the prescribed path scales by $1/a$. With the same coupling, the canonical sum instead scales by $1/a^2$. Normal support cannot repair a tangent mismatch. If the original history solves the constrained equation, its dilated counterpart does so at the same coupling precisely when $a=1$ or $P_i\mathbf A_i=0$ for every member and time. In the latter case the original constrained acceleration is purely normal, so each nonstationary member follows a constant-speed great circle; stationary members are included in the zero-speed case. This criterion does not establish that any interacting six-member history actually meets it.

If coupling is also changed to $\widetilde K_{\mathrm{int}}=aK_{\mathrm{int}}$, then canonical acceleration and the prescribed path acceleration both scale by $1/a$, and $\widetilde\lambda_i=\lambda_i/a$. That is a covariance across different couplings, not a covariance at the fixed coupling of this experiment.

There is a useful radius-selection test for one fixed dimensionless complete history. Put $\mathbf B_i=\mathbf y_i''+|\mathbf y_i'|^2\mathbf y_i$, its tangent kinematic acceleration. Its physical vector residual is

$$
\boldsymbol\rho_i(R)=\frac{\mathbf B_i}{R}-\frac{K_{\mathrm{int}}}{R^2}P_i\mathbf H_i.
$$

A radius can make this zero only if $R\mathbf B_i=K_{\mathrm{int}}P_i\mathbf H_i$ simultaneously for every member and time. Two different positive radii can both work only if $\mathbf B_i=P_i\mathbf H_i=0$ everywhere. Otherwise at most one radius works, and its existence requires one common positive proportionality across the complete vector histories. For prescribed constant-speed great circles, $\mathbf B_i=0$ identically: no positive finite radius can remove a nonzero tangent canonical residual. Radius only multiplies it by $K_{\mathrm{int}}/R^2$.

> Claim grade: derived, subject to complete corresponding root ledgers and a defined canonical sum. Falsifier: under the stated dilation with $c_f=1$, a different scaling of a root distance, transmitter weight, prescribed derivative or tangent projection would overturn the corresponding identity. These statements neither select an energy value nor exclude a family whose dimensionless shape or speed changes with radius.

### Relative-phase geometry and a uniform root margin

Use the dimensionless phase $\theta=\beta T$ on the unit sphere and three positive histories

$$
\mathbf u_0=(\cos(\theta+\phi_0),\sin(\theta+\phi_0),0),\quad
\mathbf u_1=(0,\cos(\theta+\phi_1),\sin(\theta+\phi_1)),\quad
\mathbf u_2=(\sin(\theta+\phi_2),0,\cos(\theta+\phi_2)).
$$

Each has an opposite-polarity antipode. A common shift of all $\phi_i$ is a time-origin choice; set $\phi_0=0$ if desired, leaving two relative phases. A shift of one phase by $\pi$ exchanges that pair's geometric sites but reverses their polarity assignment at a given time. It must not be identified silently with an unchanged labeled interaction history.

For each pair of different circle planes, the scalar product of their positive unit positions is a sinusoid of amplitude $1/2$ plus a constant of magnitude $|\sin(\phi_j-\phi_i)|/2$. Allowing the antipodal signs gives the exact minimum simultaneous separation over a period,

$$
d_*^2=1-\max\left\{|\sin(\phi_1-\phi_0)|,|\sin(\phi_2-\phi_1)|,|\sin(\phi_0-\phi_2)|\right\}.
$$

The own-circle antipodes have distance $2$ and cannot lower this minimum. Thus this prescribed family is collision-free for all phases precisely when no inter-circle phase difference is $\pi/2$ modulo $\pi$. A zero $d_*$ is an actual simultaneous coincidence in this class, not merely failure of a conservative estimate.

For fixed $0<\beta<1$ and $d_*>0$, every source has speed $\beta$, every partner root is unique, and no positive-delay self roots exist. In addition to $u\le2$, triangle inequality gives the useful uniform lower root-distance and delay bound

$$
u\ge\frac{d_*}{1+\beta},\qquad D_t\ge1-\beta>0.
$$

The displayed variable $u$ is the positive causal delay; at $c_f=1$ it also equals the causal chord length. These bounds supply complete root coverage and protect every prescribed event from both the zero-delay and transmitter-factor singular boundaries. If $d_*=0$, the thirty-partner-root assertion cannot be carried over unchanged: at a simultaneous partner coincidence, strict sub-wake monotonicity starts with zero at $u=0$ and gives no positive-delay root for that coincident ordered pair. The endpoint itself remains excluded and supplies no collision continuation rule.

> Claim grade: derived for these complete histories. Falsifier: a smaller simultaneous distance than the trigonometric minimum, a positive-delay self root under the global speed bound, or a partner root outside the displayed bounds would contradict the stated identities. A near-collision numerical phase cell requires its own strictly positive separation margin; a plotting grid does not provide it.

### Two exact event controls exclude all relative phases below wake speed

The phase class has a stronger obstruction than the synchronized-family mean. It can be tested at just two specified events on each positive member, without numerical root searches for every cross-plane contribution.

Index the circles cyclically, so $i+1$ denotes the next plane and $i-1$ the previous plane. Define $\Delta_i=\phi_{i+1}-\phi_i$, $b=\sqrt2\beta$, and let $C(\beta)>0$ be the own-circle antipodal tangent contribution derived above. At the event when receiver $i$ has its own phase zero, its next-plane source pair is perpendicular to the receiver position. Both roots therefore have exact delay $\sqrt2$ and $D_t=1$. Their combined along-path contribution is $-\cos(\Delta_i-b)/\sqrt2$. Its previous-plane sources have identically zero chord projection along that receiver's tangent, so they supply no along-path component. Thus

$$
a_i^{(0)}=C(\beta)-\frac{\cos(\Delta_i-b)}{\sqrt2}.
$$

At the event when the same receiver has its own phase $\pi/2$, the previous-plane source pair is perpendicular to its position. The tangent has reversed coordinate direction, giving

$$
a_i^{(\pi/2)}=C(\beta)+\frac{\cos(\phi_{i-1}-\phi_i-b)}{\sqrt2}.
$$

Here $a$ denotes canonical acceleration projected onto the positive unit tangent, not total tangent-plane acceleration. These are exact canonical reference values. The other-plane terms have zero projected numerator; their individual ordinary roots still belong in a complete vector diagnostic. The own-circle contribution has its usual unique root $\xi=\beta\cos\xi$.

If the normal-only prescribed history were a solution, all six displayed event values would vanish. Pair receiver $i$'s zero-phase condition with receiver $i+1$'s quarter-phase condition. They require

$$
\cos(\Delta_i-b)=\sqrt2C(\beta),
\qquad
\cos(\Delta_i+b)=-\sqrt2C(\beta).
$$

Adding them gives $2\cos\Delta_i\cos b=0$. Since $0<\beta<1$ implies $0<b<\sqrt2<\pi/2$, $\cos b$ is strictly positive and every cyclic difference must satisfy $\Delta_i=\pi/2$ modulo $\pi$. This already violates the collision-free geometry. Moreover, all three differences cannot have this form simultaneously: their exact sum is $\Delta_0+\Delta_1+\Delta_2=0$, whereas a sum of three odd multiples of $\pi/2$ is an odd multiple of $\pi/2$ and cannot be zero modulo $2\pi$. Thus the necessary along-path conditions are inconsistent across the three pairs.

This yields an independent analytical exclusion of the entire collision-free relative-phase family for every $0<\beta<1$, at every positive finite radius and coupling. It does not assume transitive symmetry between the differently phased circles. It uses common constant speed, the specified orientation and winding of each great circle, antipodal opposite polarities, the complete ordinary causal-root law, and normal support only. Reversing one circle's winding, changing the paths, allowing unequal or varying speeds, or adding another acceleration lies outside the proof.

> Claim grade: derived, frozen before inspecting the phase worker's results. Falsifier: a wrong sign or phase offset in either exact event projection, failure of the ordinary sub-wake root hypotheses, or a cyclic phase triple satisfying all six displayed zero conditions would refute the argument. A numerical phase search is unnecessary for this exclusion but can verify the event formulas as an implementation check.

### Independent-baseline checkpoint

The scale and phase references above are retained before dependent review. No new worker companion or phase result was inspected, no new instrument was run, and earlier receipts remain unchanged. The next dependent action is adjudication of the frozen worker slices against these references; until those artifacts are supplied, this worker is waiting on that dependency. The coordinator owns synthesis and any decision to investigate a different history class.

## Adjudication of the scale companion and shifted pilot

After the blind reference was saved, the coordinator supplied the [scale and rigid-candidate companion](spherical-three-three-symmetry-scale-and-rigid-candidate.md) and the relative-phase extension in the [dynamics account](spherical-three-three-dynamics.md#relative-phase-extension-initial-checkpoint). `shasum -a 256` measured those inspected analyses as `22d79fc49b614085b71022376433eac229cca4aca2046dbfceb3554ae1fc3a6e` and `c8ec78b101c42695780341f283853aaea9ad8322102e305e6bce77f20a2c2f35`, respectively. The shifted numerical companion's digest was `8665e80b4971a0d003aaad4cf2a2eabed7072e9f7ca98d997010fd7f907778fb`. These identify the reviewed snapshots; later additions require their own scope statement.

### Scaling and energy obligations

**Verdict: accepted at derived grade, including the stated degenerate exception.** The companion's general map $\mathbf Y(t)=a\mathbf X(t/b)$ gives velocity factor $a/b$, acceleration factor $a/b^2$, and chord factor $a$. Choosing $c_f'=(a/b)c_f$ preserves every corresponding causal root and multiplies both $D_t$ and $c_f$ by the same factor. Thus the weight is unchanged. If $K'=kK$, the canonical acceleration factor is $k/a^2$ and covariance requires $k=a^3/b^2$. Projection immediately gives its residual transformation

$$
\mathbf F'=\frac a{b^2}\mathbf F+\left(\frac a{b^2}-\frac k{a^2}\right)P\mathbf A.
$$

The fixed-$c_f$, fixed-$K$ specialization agrees with the independently frozen result: a corresponding nonzero root requires $b=a$, and a nontrivial dilation of an exact solution survives only when $P\mathbf A=0$ everywhere. The stationary alternating hexagon is a valid realization of the stationary exception. Its stationary source sum has zero tangent component by pairing equal-distance sites reflected about each receiver's radial axis; all sources remain in the equatorial plane, so the perpendicular component also vanishes. Positive-delay partner roots are exactly their distances at $c_f=1$ and stationary self roots are absent. Normal support cancels the remaining radial acceleration for every radius. This example is externally supported and has zero speed; it does not rescue a moving candidate with nonzero tangent residual.

The conditional energy argument also respects the live owner. An accepted energy map is not supplied by dimensional scaling or zero radial acceleration power. If a branch were already specified by differentiable equations $C(g,\beta)=0$ and $\mathcal E(g,\beta)=E_0$, a nonzero two-by-two Jacobian at a solution would locally isolate it by the implicit function theorem. This is a sufficient local condition, not a proof that either function exists, that a solution exists, or that it is globally unique. Surviving shape/history degrees of freedom still need their own equations. No physical energy or radius-speed branch is inferred here.

Falsifiers are an incorrect transformed root or residual factor, a nonzero tangent component in the stationary hexagon under its exact symmetry, or misuse of local Jacobian invertibility as a global/physical uniqueness result. None was found in the inspected companion.

### Latitude-ring obstruction reconstructed hit by hit

**Verdict: accepted at derived grade on the declared complete ordinary root chart, including speeds above wake speed when that chart actually exists.** The proof does not import a one-root sub-wake census.

At an upper receiver $R(\rho,0,h)$, with $h>0$, $\rho>0$ and $h^2+\rho^2=1$, write a source as $R(\rho\cos\delta,\rho\sin\delta,\eta h)$, where $\eta=+1$ is same polarity and $\eta=-1$ is opposite polarity. The dimensionless chord is

$$
(\rho(1-\cos\delta),-\rho\sin\delta,(1-\eta)h).
$$

Dotting it with the latitude tangent $(-h,0,\rho)$ gives $h\rho(\cos\delta-\eta)$. Multiplication by the polarity product $\eta$ therefore gives $h\rho(\eta\cos\delta-1)\le0$ at every admitted hit. The canonical inverse-cube vector coefficient and transmitter weight are positive. A positive-delay same-ring hit is strictly negative because $\cos\delta=1$ would make its separation and delay zero. A distinct same-ring partner necessarily has at least one positive geometric root: its distance is positive at delay zero and bounded by $2R\rho$ for all earlier times, so its distance-minus-delay function changes from positive to nonpositive by delay $2R\rho$ at $c_f=1$. If the required crossing is singular, the claimed complete ordinary chart fails; it does not supply a finite exception.

For rigid angular speed $\Omega$, the actual prescribed acceleration is $R(-\Omega^2\rho,0,0)$ at this event. Its latitude component is $R\Omega^2h\rho\ge0$, strictly positive for rotation. The canonical component is strictly negative on a complete finite or convergent ordinary ledger, while the normal constraint has zero latitude projection. Hence the rigid candidate cannot satisfy the equation, including the stationary case. A variable azimuthal rate adds only an azimuthal acceleration; its latitude component remains $Rh\rho\dot\phi^2\ge0$. The same obstruction therefore extends to histories confined to the same two nonzero fixed latitudes with the same polarity segregation, provided a distinct same-ring partner remains and the ordinary-root hypotheses hold.

Direct dotting of the rotating source velocity with the chord gives $D_t/c_f=1+\omega\rho^2\sin\delta/u$, matching the companion's weight. Squaring the chord gives $u^2=2\rho^2(1-\cos\delta)+(1-\eta)^2h^2$. These independently check its root and denominator signs. The argument ends at the equator, collapsed pole sites, variable latitude, mixed polarity rings, an undefined/divergent root sum or a singular-event continuation; no physical fate is assigned there. A positive latitude contribution from one ordinary hit under these precise assumptions is a direct falsifier. No such sign error was found.

### Shifted-family derivations and pilot

**Verdict: the collision domain, sub-wake root census and mean-response reduction are accepted at derived grade; the numerical pilot retains measured grade.** Its exact collision minimum matches the blind formula above. Cyclic permutation and separate time-origin changes give the reported means

$$
M_0=C+F(\alpha)-F(\gamma),\quad
M_1=C+F(\gamma-\alpha)-F(-\alpha),\quad
M_2=C+F(-\gamma)-F(\alpha-\gamma).
$$

The source-type quarter-period transformation compares equal relative phase arguments and changes the sign of their mean. It does not establish that $F$ is even. Thus the three equal-phase subsets are correctly excluded, while replacing the generic mean sum by $3C$ would be unjustified. The reported counterexample to unchanged mean cancellation is consistent with this derivation. The pilot's full-period mean and RMS table has not been independently recomputed here and is not upgraded to a rigorous bound by this review.

The inspected shifted instrument uses the same transmitter-only kernel, complete sub-wake bisection domain and normal projection as the earlier diagnostic, with the two relative phases supplied to its history functions. Its copied evaluator is not an independent oracle; the worker identifies that limitation. It does not enforce the exact separation margin as a generic phase-domain admission check, so the mathematical formula remains necessary if future cells are selected. All currently named cells have positive exact separation; no current cell is rejected for that reason. Floating residuals, endpoint tolerances and sampled extrema retain the earlier numerical limitations.

A new, separate [reviewer event checker](../evidence/spherical-three-three-review-phase-controls.mjs) evaluates only the frozen exact-event formulas. Its `controls` mode passed the static values $(-1/\sqrt2,+1/\sqrt2)$, the known antipodal root angle $\xi=\pi/6$ at $\beta=\pi/(3\sqrt3)$, and rejection of the boundary $\beta=1$. The [control receipt](../evidence/spherical-three-three-review-phase-controls.json) was saved before any target-data comparison. Its subsequent `target` run compared receiver zero at own phases zero and $\pi/2$ in every retained `shifted-384.json` cell. The [target receipt](../evidence/spherical-three-three-review-phase-target.json) records ten cells and twenty event comparisons, with maximum absolute difference $2.23\times10^{-16}$ rounded upward, below the declared comparison tolerance $2\times10^{-12}$. The retained subject digest is included in that receipt. This checks event-formula agreement in binary64 arithmetic; it does not certify the full period or make the reviewer's new theorem independently accepted.

### New theorem review boundary and handoff

The two-event phase obstruction in the preceding blind reference is an independently authored mathematical result relative to the dynamics worker, but it is self-reviewed by its author. Its status is **derived, pending separate mathematical adjudication**. The pilot agrees at its tested event points, and this cannot substitute for checking the cyclic sign/phase contradiction. The dynamics worker is being asked to reconstruct that argument independently before the coordinator accepts whole-phase exclusion. The weaker worker results remain preserved, including the measured failure of unchanged mean cancellation; the new proof does not contradict that measurement because it uses pointwise event conditions rather than the generic mean identity.

No subject file was modified. This follow-up added only the owned review appendix, event checker and two small receipts. All short commands completed; no heavy job, evolution run or compute lease exists for this review. The coordinator owns integration. The remaining dependent review is the separate check of the new phase theorem; scientific questions outside the selected candidate classes remain open.

## Independent review of beyond-wake-speed root admission

The supplied dependency is the synchronized-history root-admission section of the [dynamics account](spherical-three-three-dynamics.md#beyond-wake-speed-root-admission-initial-checkpoint), its [exact fixed-point instrument](../evidence/spherical-three-three-dynamics-superfield-roots.mjs), and its [bound receipt](../evidence/spherical-three-three-dynamics-superfield-root-bounds.json). The scope is $\beta=3/2$ and $\beta=3$, with $R=c_f=1$. This review reconstructs the mathematics and uses a separately authored exact-rational reference. It does not treat a rerun of the subject as independent evidence and does not calculate target accelerations.

### Scalar reduction and the missing-root boundaries

For the next-plane source, direct dotting of the synchronized paths gives $d^2=2-\varepsilon[\sin(2\theta-\beta u)+\sin(\beta u)]$. Put $z=2\theta-\beta u$. The squared root residual and its derivative are

$$
F=u^2-2+\varepsilon(\sin z+\sin\beta u),
\qquad
F_u=2u+\varepsilon\beta(-\cos z+\cos\beta u).
$$

At a positive-delay root, $F=(u-d)(u+d)$ and differentiation gives $F_u=2u(1-d')=2uD_t$. Therefore the simultaneous equations $F=F_u=0$ are exactly the transmitter-factor failure equations. They imply

$$
\sin z=\varepsilon(2-u^2)-\sin\beta u,
\qquad
\cos z=\cos\beta u+\frac{2\varepsilon u}{\beta}.
$$

Their right-hand sides describe an actual phase $z$ precisely when their squared sum is one. This gives the subject's scalar function $H_\varepsilon$. Conversely, any zero of $H_\varepsilon$ at $0<u\le2$ gives a real $z$ by the unit-circle identity and a receiver phase $\theta=(z+\beta u)/2$ modulo $\pi$, so the elimination introduces no extraneous fold roots. The previous-plane source gives the same two scalar functions after sign exchange.

For the independent arithmetic check it is useful to expand the scalar function differently. With $a=2-u^2$ and $v=2u/\beta$,

$$
H_\varepsilon(u)=a^2+v^2+2\varepsilon[-a\sin(\beta u)+v\cos(\beta u)].
$$

This expression is the independently implemented reference below. The equivalence uses $\sin^2+\cos^2=1$, not subject output.

The continuation boundaries are explicit. At $u=0$, $F=-2+\varepsilon\sin2\theta\le-1$. At $u=2$, $F\ge1-|\sin(2\beta)|$, which is strictly positive for both selected speeds. Compactness of the phase circle and continuity give uniform root-free neighborhoods of those endpoints. If $H$ stays positive, every root is simple, so the number of interior roots and the sign of each continued $D_t$ are locally constant in phase. The phase circle is connected. For a next-plane source at receiver phase zero, $F=u^2-2$, with exactly one root $u=\sqrt2$ and $D_t=1$; the previous-plane reference occurs at phase $\pi/2$. Hence absence of a zero of either $H$ establishes exactly one cross-plane root of each type at every phase, all with positive $D_t$. This proves completeness without a root scan. It does not give a numerical lower bound for $D_t$.

> Claim grade: derived. Falsifiers: a different chord product, failure of $F_u=2uD_t$ at a positive root, a zero entering through an endpoint despite the displayed strict signs, or failure of the explicit sine/cosine reconstruction would invalidate the corresponding conclusion.

### Audit of the subject's interval arithmetic

**Verdict: the inspected internal enclosure method is sound on its declared rational grid.** The BigInt floor and ceiling functions use positive denominators and correctly round negative numerators outward. Addition, negation and the four-endpoint multiplication preserve interval containment. The square operation separately handles intervals crossing zero. Every denominator used by the inspected calls is positive.

At a rational argument in $[0,6]$, the sine polynomial includes degrees through $39$, and its order-$40$ Lagrange remainder has magnitude at most $x^{40}/40!$. The cosine polynomial includes degree $40$, with remainder bounded by $x^{41}/41!$. The exact rational terms are individually rounded outward at scale $10^{24}$ and the rational remainder is rounded upward. Large cancellations therefore widen the interval rather than silently lose enclosure. No platform trigonometric function supplies those signs.

To independently check the between-node estimate, set $A=2-u^2-\varepsilon\sin\beta u$ and $Z=\cos\beta u+2\varepsilon u/\beta$. On $0\le u\le2$, $|A|\le3$, $|A'|\le4+\beta$, $|Z|\le1+4/\beta$ and $|Z'|\le\beta+2/\beta$. Differentiating $H=A^2+Z^2-1$ gives

$$
|H'|\le6(4+\beta)+2(1+4/\beta)(\beta+2/\beta).
$$

The grid includes both endpoints and has spacing $1/100$, so every point is within $1/200$ of a node. Subtracting the outward upper derivative bound times $1/200$ from the minimum lower node endpoint correctly bounds the entire interval. The constants are $484/9$ at $\beta=3/2$ and $532/9$ at $\beta=3$.

There is one preservation qualification: the subject's JSON converts its exact fixed-point endpoints to binary64 for display. Those decimal pairs are not necessarily outward-rounded intervals and can collapse to the same displayed value. The internal arithmetic and source define the enclosure computation; the JSON alone is not a portable exact certificate. The weak displayed strict inequalities have ample margin, but a consumer must not interpret the displayed pairs as exact enclosing endpoints. The independent receipt below retains rational endpoints as integer numerator/denominator strings.

### Independent rational-cell certificate

The separate [root reference](../evidence/spherical-three-three-review-root-reference.mjs) uses reduced exact rational numbers, not fixed-point arithmetic. It expands $H$ in the different form above and encloses entire delay cells directly, rather than evaluating grid nodes and applying a bound on $H'$. At each cell midpoint it evaluates the sine series through degree $25$ and cosine through degree $24$ using exact rational recurrence. Their last retained terms are positive; from the next term onward the terms alternate and decrease because $x\le6$ and the next denominator product exceeds $36$. Thus the exact value lies between the partial sum and that sum plus the first omitted negative term. The interval is widened by the argument half-width using $|\sin'|,|\cos'|\le1$. Exact rational interval arithmetic then evaluates the whole-cell $H$ expression. This is an independent enclosure route with different polynomial orders, rounding representation and inter-cell argument.

The first controls run failed an overstrong test assumption: it demanded that a sine-cell upper enclosure contain the number $0.1$, although $\sin(0.1)<0.1$ and a valid tighter enclosure need not contain that number. The test was corrected before target use to require the known zero endpoint and exclude the known out-of-range value one. No target result was used to change the control. The subsequent `controls` run passed exact rational addition, the square of an interval crossing zero, exact trigonometric values at zero, $H_\varepsilon(0)=4$, independent broad alternating bounds at argument one, and the corrected cell endpoint control. Its [receipt](../evidence/spherical-three-three-review-root-controls.json) was retained before target use.

The `target` run used four hundred closed cells of width $1/200$ covering $[0,2]$. The [exact-rational target receipt](../evidence/spherical-three-three-review-root-target.json) establishes the following conservative whole-interval bounds; the decimal thresholds here are rounded down from the retained rational lower endpoints:

| Speed and sign | Independent whole-interval conclusion |
| --- | --- |
| $\beta=3/2$, $\varepsilon=-1$ | $H_{-1}>3.98$ |
| $\beta=3/2$, $\varepsilon=+1$ | $H_{+1}>0.91$ |
| $\beta=3$, $\varepsilon=-1$ | $H_{-1}>1.63$ |

It also independently encloses the four $H_{+1}$ endpoints at $\beta=3$ with the signs $H(0.43)>0$, $H(0.44)<0$, $H(1.15)<0$, $H(1.16)>0$, and proves $\cos(2.8)<-0.94$. The signed rational endpoints are retained rather than only their binary64 displays. The short command completed without a long-running job or heavy allocation.

> Claim grade: derived with exact-rational computer-assisted interval bounds, conditional on the explicitly inspected rational arithmetic and alternating-tail proof. Falsifier: a rational operation or containment rule that excludes its exact mathematical result, a wrong tail sign/monotonicity argument, an uncovered delay cell, or a nonpositive exact retained lower endpoint would refute the corresponding bound. Same-script replay would establish reproducibility only; independence here comes from the separate algebraic form and separately authored rational whole-cell instrument, together with the independent analytical reconstruction.

### Complete same-circle census and the two speed verdicts

The self-root equation is $x=\beta|\sin x|$, $0<x\le\beta$. For both selected speeds $1<\beta<\pi$, sine is positive on the relevant interval and $\sin x/x$ decreases strictly. There is exactly one positive self root, and its transmitter factor $1-\beta\cos x$ is positive by $\sin x-x\cos x>0$. The receiver factor is the same by rigid circular geometry. The zero-delay endpoint remains excluded.

For the antipodal source at $\beta=3/2<\pi/2$, $x=\beta\cos x$ has exactly one root and $D_t=1+\beta\sin x>0$. These facts plus the independently certified cross-plane homotopy establish **exactly six ordinary roots per receiver, thirty-six in the full directed ledger, all with positive transmitter factors, throughout the complete synchronized period at $\beta=3/2$**. This is admission of a prescribed history, not verification that its constrained acceleration residual vanishes.

At $\beta=3$, the antipodal equation has one principal root in $(0,\pi/2)$. On $(\pi/2,3)$ the remaining equation is $g(x)=x+3\cos x=0$. Its second derivative is $-3\cos x>0$, both endpoint values are positive, and the independent rational bound at $2.8$ gives $g(2.8)<-0.02$. Strict convexity therefore gives exactly two further roots, with opposite nonzero derivative signs. Both must be retained; the sign of $D_t=g'$ is not an admission rule. The one self root and three antipodal roots do not cure a cross-plane singularity.

Indeed the independently verified endpoint signs of $H_{+1}$ give at least one zero in each of $(0.43,0.44)$ and $(1.15,1.16)$. The exact unit-circle reconstruction above supplies actual receiver phases with $F=F_u=0$, $u>0$ and hence $D_t=0$. At a root, direct differentiation and substitution give

$$
F_{uu}=2-\varepsilon\beta^2(\sin z+\sin\beta u)=2-\beta^2(2-u^2).
$$

At $\beta=3$ this equals $9u^2-16<0$ on both retained intervals. Thus these are quadratic emission-root degeneracies at positive separation. This review accepts at least two definite non-simple events; it does not claim that they exhaust every event at that speed or supply a continuation through them.

The separate elementary count change is also valid. At receiver phase zero, a positive next-plane source has the unique root $u=\sqrt2$. At receiver phase $\pi/2$, its residual is $u^2-2+2\sin3u$, with signs negative, positive, negative, positive at $0,\pi/6,\pi/3,2$. Thus at least three distinct roots occur there. The strict endpoint exclusions make an interior non-simple event unavoidable between those phases. This independent qualitative argument supports the obstruction even without trusting the interval localization.

**Verdicts.** Accept the complete positive-factor thirty-six-root admission at $\beta=3/2$ and the impossibility of a full-period ordinary sharp-root ledger at $\beta=3$, each at derived grade with the evidence stated above. A zero receiver factor by itself is not a canonical acceleration singularity; this obstruction concerns the transmitter factor. Neither verdict establishes stability, physical fate, a tangent-support result or an energy branch. The admitted $\beta=3/2$ case can now support a separately scoped full-residual calculation; the $\beta=3$ case needs an explicitly owned singular treatment before a continuation claim.

### Preservation and communication reconciliation

The coordinator reports that the newly authored whole-phase event theorem has been separately checked in the symmetry worker's verification artifact. That two-sided verdict is integrated by the coordinator; no additional dynamics review of that theorem is requested by this reviewer. The present dependency is exclusively the beyond-wake root-admission review.

This slice adds only the owned root-reference instrument, its controls/target receipts and this review appendix. No subject file or earlier reviewer receipt was edited, no target acceleration was evaluated, and no evolution solver or heavy job was launched. The independent exact-rational receipts are small durable evidence with their reconstruction method retained. Coordinator synthesis integration remains the receiving obligation.

Validation at this checkpoint: `shasum -a 256` matched the subject instrument and bound receipt to their reported frozen identities `73f65040e65dcefafdbe26010bff2fb7d5353c3a60a956963acb7c1885889a4b` and `6f7a145f62cb64d563edae86948733d67002598dadf72e4bdb46e2ab821c78aa`. `node --check` passed for the independent root reference. Separate `git diff --no-index --check /dev/null` calls on the review and new reference emitted no whitespace diagnostics; their exit status 1 denotes added content. These are byte/syntax/hygiene checks, distinct from the independently derived admission verdicts.

## Independent adjudication of the first turning event

The subject is [the first-turn companion](spherical-three-three-symmetry-first-turn.md), with the previously verified complete preparation and $R=K_{\mathrm{int}}=c_f=1$. The reference below reconstructs the static-source projections and continuation estimates analytically. No subject instrument was replayed, no new numerical evolution was run, and the prepared past is not reclassified as a solution of the post-release equation.

### Exact meridional reduction

**Verdict: accepted at derived grade.** The old source sites, rather than the moving receivers' new positions, determine the arriving acceleration until their emission times leave the stationary past. At the representative receiver $\mathbf x=(c,0,s)$, where $c=\cos\alpha$, $s=\sin\alpha$, the old like-polarity sites are $(-\rho_0/2,\pm\sqrt3\rho_0/2,h_0)$, the non-antipodal unlike sites are their negatives, and the old own antipode is $(-\rho_0,0,-h_0)$, with $\rho_0=\sqrt3/2$ and $h_0=1/2$.

Their squared distances are directly

$$
d_L^2=2+\rho_0c-s,\qquad d_O^2=2-\rho_0c+s,\qquad d_A^2=2+2\cos(\alpha-\alpha_0),\quad\alpha_0=\pi/6.
$$

The latitude unit tangent is $(-s,0,c)$. Its dot product with a like-site displacement is $-(\rho_0s+c)/2$. For each non-antipodal unlike site, the displacement projection has the opposite sign and the negative polarity product reverses it back. The old own-antipode contribution is $+\sin(\alpha-\alpha_0)$ after applying its negative polarity product. With $B=\rho_0\sin\alpha+\cos\alpha$, their sum is exactly

$$
f(\alpha)=-B(d_L^{-3}+d_O^{-3})+\frac{\sin(\alpha-\alpha_0)}{d_A^3}.
$$

Reflection in the representative meridian exchanges the two like sites and the two unlike non-antipodal sites, so its azimuthal acceleration is zero at $\phi=0$. The full smooth projected ordinary equation therefore preserves the initial data $\phi=\dot\phi=0$, giving $\ddot\alpha=f(\alpha)$. This uses uniqueness in the old-source neighborhood, not an assumed global delayed uniqueness theorem. For each hit, the equal-radius chord identity gives radial projection $\eta/(2d)$; summing the two pairs and antipode yields

$$
A_n=d_L^{-1}-d_O^{-1}-(2d_A)^{-1},\qquad\lambda=-\dot\alpha^2-A_n.
$$

These equations retain both tangent directions and the normal part. They supply the full vector motion within the closed old-source domain, rather than a scalar speed fit.

### Strip bounds and arrival at the turn

On $0\le z=\alpha-\alpha_0\le1/8$, the receiver's Euclidean displacement is at most $z$. Every old partner distance is therefore greater than $\sqrt7/2-1/8>9/8$. Summing the five inverse-square magnitudes bounds the full canonical acceleration by $320/81<4$, so $|f|<4$.

For the negative sign, the derivative satisfies

$$
B'\ge\rho_0(\rho_0-1/8)-(1/2+1/8)=\frac{2-\sqrt3}{16}>0.
$$

Thus $B\ge3\sqrt3/4$. Convexity of $x^{-3/2}$ and $d_L^2+d_O^2=4$ give $d_L^{-3}+d_O^{-3}\ge1/\sqrt2$. The old-antipode term is positive but smaller than $(1/8)/(7/4)^3=8/343<1/32$, because $d_A^2\ge255/64$. Therefore $f<-3\sqrt6/8+1/32<-7/8$; the final comparison follows exactly from $864>841$. The independently reconstructed strip enclosure is consequently $-4<f<-7/8$.

Start with signed meridional velocity $v(0)=1/4$. The reduced ordinary equation can first be solved as a smooth mathematical equation without yet asserting its delayed interpretation. While $v>0$ its first-integral identity is

$$
\frac{v^2}{2}=\frac1{32}+\int_0^z f(\alpha_0+w)\,dw.
$$

The upper acceleration bound prevents an increasing solution from reaching $z=1/28$ with nonnegative $v^2$. It therefore cannot escape through the strip's upper edge before turning. It cannot escape through the lower edge while increasing. Smoothness, bounded velocity and positive old-source separation continue the solution to its first zero of $v$. Integrating the two strict acceleration bounds in time and in latitude gives

$$
\frac1{16}<T_*<\frac27,\qquad\frac1{128}<z_*<\frac1{28}.
$$

This verifies both the existence of the first turn and the displacement estimate; neither assumes that a delayed continuation has already been admitted. The first integral is a calculus identity for this autonomous reduced equation, not an energy assignment to the full delayed theory.

### Smooth reversal and the speed-norm cusp

At the turn, $v=0$ but $v'=f(\alpha_*)<-7/8$. Thus signed latitude velocity crosses zero with a nonzero negative derivative. All six members share this turning time by the previously verified transitive symmetry. Their common speed is $s=|v|$, and its one-sided derivatives are

$$
\dot s(T_*^-)=f(\alpha_*)<0,\qquad\dot s(T_*^+)=-f(\alpha_*)>0.
$$

The speed norm is therefore not differentiable at this turn; this is a strict cusp, not merely a possible loss of differentiability. The signed velocity and the post-release position remain smooth. At the turn $d(s^2/2)/dT=vf=0$, despite the nonzero tangent acceleration $f\mathbf e_\alpha$. This does not imply equilibrium or a failure of uniqueness, and the positive-speed formula $\dot s=\mathbf v\cdot\mathbf A/s$ must not be evaluated there. The companion's statement that the speed decreases, reaches zero and then increases has the correct meaning when interpreted with these one-sided derivatives.

For the additional time $0\le h=T-T_*\le1/32$, the strip acceleration bound gives $|v|<4h\le1/8$ and backward latitude travel less than $2h^2\le1/512$. Since $z_*>1/128$, the reduced solution remains strictly above the lower strip edge. Its negative velocity keeps it below its turning latitude. These estimates close continuation through the full event-defined interval $[0,T_*+1/32]$, with $T_*+1/32<71/224$ and $|v|\le1/4$. They do not assert validity until the fixed upper bound $71/224$ when the actual event interval ends earlier.

### Root margins close the delayed interpretation

Throughout that interval every old partner distance is greater than $9/8$. Its explicit stationary-source root has emission time $S=T-d_j$ and therefore

$$
-\frac14-S>\frac98-\frac{71}{224}-\frac14=\frac{125}{224}>0.
$$

Thus every constructed partner root lies strictly in the stationary preparation, where $D_t=W^{\mathrm{acc}}=1$. The prepared past and the newly constructed ordinary solution together have speed at most $1/4$. Their partner root functions are globally strictly monotone, excluding additional recent or older roots; the chord-versus-path-length inequality excludes every positive-delay self root. All positions remain on the fixed sphere, so delay $2$ remains the included geometric upper endpoint. The own old site is correctly omitted from the partner sum: it is not a separate stationary emitter added on top of the actual self history.

This order proves the reduction without circularity: solve and bound the smooth old-source equation first, then verify that its entire event-defined solution satisfies the complete delayed root law. The result is actual analytical constrained motion through a first reversal, not a prescribed path whose residual is merely small.

### Outward support and the conditional coupling extension

Let $q=\rho_0\cos\alpha-\sin\alpha$. Since $q(\alpha_0)=1/4$, $q'=-B$ and $B\le\sqrt7/2<3/2$, the strip has $q>1/16>0$. Hence $d_L>d_O$, so

$$
-A_n=\frac1{d_O}-\frac1{d_L}+\frac1{2d_A}>\frac1{2d_A}\ge\frac14.
$$

Combining this with $|v|\le1/4$ proves $\lambda>3/16$. Conversely dropping the negative term $-1/d_L$ and using both remaining chords greater than $9/8$ gives $-A_n<8/9+4/9=4/3$, hence $\lambda<4/3$. At the turn the velocity term vanishes and $\lambda(T_*)>1/4$. The radial canonical component is canceled there while the tangent acceleration remains nonzero. The trajectory therefore needs nonzero outward support even when every member is instantaneously at rest.

For geometrically scaled preparation at radius $R$, fixed $c_f=1$ and fixed coupling, dimensionless time $\tau=T/R$ gives $\alpha''=g f(\alpha)$ with $g=K_{\mathrm{int}}/R$. At $g\ge1$, the same strip proof gives

$$
\frac1{16g}<\tau_*<\frac2{7g},\qquad
\frac1{128g}<z_*<\frac1{28g}.
$$

A post-turn interval $1/(32g)$ has velocity magnitude less than $1/8$ and backward latitude displacement less than $1/(512g)$, preserving the lower-edge margin. The old-source emission margin is at least $9/8-1/4-71/(224g)>0$. The dimensionless support $\ell=R\lambda$ obeys $g/4-1/16<\ell<4g/3$. These are correct sufficient conditions; they neither select new coupling experiments nor establish a sharp threshold or failure for $g<1$.

> Claim grade: derived for the stated complete preparation, normal-only support, positive coupling and event-defined root domain. Falsifiers: an incorrect old-site projection, violation of a strip inequality, failure of the explicit stationary-source emission margin, or an extra root despite the global speed bound would invalidate the corresponding motion claim. The signed velocity and speed norm must be distinguished at the turn as above. An all-time solution, later delayed motion after the certified interval, stability, a physical support provider and an energy map remain unproved.

### Review disposition

The first-turn motion, quantitative bounds, post-turn continuation, root census and outward-support inequalities are accepted at derived grade. The conditional $g\ge1$ extension is accepted as an analytical sufficient domain. No substantive correction to the companion is required; this review sharpens its wording at zero speed by explicitly identifying the strict speed-norm cusp. Only this owned review appendix was added. No numerical instrument, same-script replay, heavy job or subject edit was used. The coordinator owns synthesis integration and any further research selection.

The reviewed first-turn file measured SHA-256 `82e30c3da469c692944115074292b3f5a244d7551e11318d972af1276b225b2e` by `shasum -a 256`. The review appendix emitted no whitespace diagnostics under `git diff --no-index --check /dev/null`; exit 1 denotes the file addition. This is document validation; the scientific reference is the independent analytical reconstruction above.

## Radius-map review: independent reference checkpoint

The reviewer-owned `spherical-three-three-review-radius-reference.mjs` passed its controls-only execution before reading target inputs: Newton's method returns the exact linear root, the circular self endpoint gives $(1/4,0,0)$, the known antipodal half-angle is $\pi/6$, and an affine second-moment control gives $\sqrt{13}$. The retained controls receipt records that order. The target will use independently implemented scalar Newton equations and explicit component sums, then an affine-moment audit of retained samples; it will not replay the subject instruments or regenerate a full-period pilot.

The independently reconstructed radius identity is $\lambda_R=-\beta^2/R-A_{n,1}/R^2$, with $A_{n,1}=-\beta^2-\lambda_1$. Thus $\lambda_R=g^2\lambda_1+(g^2-g)\beta^2$ at fixed $K_{\mathrm{int}}=c_f=1$ and $g=1/R$. The tangent kinematic acceleration vanishes for these constant-speed great circles, so both tangent correction components and the normal-corrected residual magnitude scale as $R^{-2}$. Dimensionless supports multiply these dimensional values by $R$. This is derived similarity for prescribed histories, not a claim that the histories solve the constrained equation.

### Independent event reconstruction and measured agreement

At positive receiver $0$ and phase zero, the self half-angle solves $x=\beta\sin x$, and the opposite-polarity own-circle half-angle solves $a=\beta\cos a$. Independently squaring the two $xz$ chord equations gives $p^2=2+2\sin(\beta p)$ and $m^2=2-2\sin(\beta m)$. The previously reviewed root admission supplies uniqueness on the stated positive branches at $\beta=3/2$; Newton convergence alone is not the completeness argument. Writing $q=\sqrt2\beta$, the vector is reconstructed directly as

$$
\begin{aligned}
\mathbf A={}&\frac{(\sin x,\cos x,0)}{4\sin^2x(1-\beta\cos x)}
+\frac{(-\cos a,\sin a,0)}{4\cos^2a(1+\beta\sin a)}
+\frac{(0,-\cos q,\sin q)}{\sqrt2}\\
&+\frac{(1+\sin(\beta p),0,-\cos(\beta p))}{p^3[1-\beta\cos(\beta p)/p]}
-\frac{(1-\sin(\beta m),0,\cos(\beta m))}{m^3[1+\beta\cos(\beta m)/m]}.
\end{aligned}
$$

The denominators follow by differentiating each chord equation with respect to delay; the two $yz$ contributions have exact delay $\sqrt2$ and transmitter factor one. All denominators are positive by the admitted root theorem. This reference evaluates explicit scalar/component expressions with Newton iteration; the subject uses bracket bisection and geometric source-position/source-velocity reconstruction. Neither implementation was changed to match the other.

Measured by [the independent reviewer instrument](../evidence/spherical-three-three-review-radius-reference.mjs), the event vector is $(-0.07007214418808372,0.6344798540967014,-0.3091671568637002)$, and the largest discrepancy from the retained subject vector/support values is $1.1102230246251565\times10^{-16}$. The independent unit-radius support values are $\lambda=-2.179927855811916$, $\mu=-0.6344798540967014$, $\nu=0.3091671568637002$ and tangent residual magnitude $0.7057967243744868$. The [target receipt](../evidence/spherical-three-three-review-radius-target.jsonl) retains roots, separate vector terms and comparisons. These are independent binary64 magnitude checks, not exact interval enclosures. The separate analytical sign adjudication remains the symmetry worker's assignment.

### Statistics, provenance and grade boundary

For a retained scalar sample $Z$, an affine transform $Y=sZ+b$ has $\langle Y\rangle=s\langle Z\rangle+b$ and $\langle Y^2\rangle=s^2\langle Z^2\rangle+2sb\langle Z\rangle+b^2$. With $s>0$, both sampled extrema transform by the same affine map. The reviewer used these moment identities rather than the subject's row-by-row scaled RMS procedure. For normal support the reference first recovers the radial interaction from $A_{n,1}=-\beta^2-\lambda_1$ and uses $-\beta^2/R-A_{n,1}/R^2$ directly.

Measured by that independent audit, all 252 scalar comparisons across dimensional and dimensionless map statistics pass the declared $2\times10^{-10}$ tolerance, with maximum absolute discrepancy $1.6200374375330284\times10^{-12}$. The six sub-wake cells retain 4608 rows each, comprising 768 distinct phases and 768 rows per member; the three $\beta=3/2$ cells use only the one independently checked event. Both input hashes match the map receipt: `b36c2d606238667a9202779a8c9282adc2834b53daa20ec9561814b4b5cae44b` for the original sub-wake samples and `f3e11793725b4c601d174a3d340e3d8597d6d961fa2cd5c96ec6ab1fa80b298f` for the event receipt. This validates retained-input identity and scaling/statistics, not a new independent evaluation of every sub-wake root. The earlier reviewed sub-wake phase-zero controls and analytical root theorem retain their separate scopes.

Direct inspection of the analysis table and map schema confirms that sub-wake extrema are labeled sampled, RMS is over members and phases, and the beyond-wake table is explicitly event-only. Its six-decimal printed values agree with the audited map values. The root-admitted $\beta=3/2$ family does not thereby acquire a full-period residual measurement. The three $\beta=3$ cells contain only the ordinary-chart obstruction, without numerical acceleration/support values. Scaling preserves their dimensionless fold events, so radius does not restore an ordinary chart.

The antipodal sign convention is also derived: simultaneous inversion sends $\mathbf n,\mathbf t,\mathbf A$ to their negatives, while $\mathbf b=\mathbf n\times\mathbf t$ stays unchanged. Thus normal and along-path support agree, whereas signed sideways support reverses. Cyclic coordinate symmetry relates the three positive members at the event. Equality of support magnitudes over all six therefore does not mean equality of their signed sideways components.

The retained profile reports a completed controls/result output and a later `sysctl kern.clockrate` denial from `/usr/bin/time -l`; extended resource statistics are unavailable. The denial does not invalidate the complete numerical receipt. No target rerun is justified merely to fill telemetry, and none was performed in this review.

**Disposition:** accept the exact radius/support scaling at derived grade; accept the event magnitudes and retained-sample map at independently checked binary64 measured grade within the explicit event/sample boundaries. The normal-only constrained residual remains nonzero; no evolved trajectory, energy-radius relation, continuous numerical extrema or singular-event continuation follows. Falsifiers are a missing admitted root, an incorrect component sign or transmitter denominator in the displayed reference, a failed input hash, or a violation of the direct radius/moment identities in the retained comparison. Subjects and original receipts remain unchanged; only reviewer-owned evidence and this appendix were written.

## Independent local-fold reference before instrument comparison

This reference is retained before inspecting the new subject fold instrument. For the positive next-plane source at $\beta=3$, set $v=2\theta-3u$ and $F=u^2-2+\sin v+\sin3u$. Direct differentiation gives $F_u=2u-3\cos v+3\cos3u$, $F_\theta=2\cos v$ and $F_{uu}=2-9(\sin v+\sin3u)$. At a fold, $\sin v=2-u^2-\sin3u$ and $\cos v=\cos3u+2u/3$, giving $F_{uu}=9u^2-16$ and the elimination equation $H_+=(2-u^2-\sin3u)^2+(\cos3u+2u/3)^2-1=0$. Expanding and differentiating yields $H_+'=2(u^2-16/9)(2u+3\cos3u)$. The corresponding negative sign gives $H_-$, already independently excluded by the retained rational whole-cell certificate.

At a root, $F_u=2uD_t$. Differentiating the geometric squared residual with respect to common phase at fixed delay gives $F_\theta=2u(D_r-D_t)/3$, hence $D_r^*=3F_\theta/(2u_*)$ at the fold. Taylor expansion with $F_{uu}<0$ and $F_\theta\ne0$ gives $u-u_*=\pm c\sqrt{|h|}+O(|h|)$ on $\operatorname{sign}(F_\theta)h>0$, where $c^2=2|F_\theta|/|F_{uu}|$. Thus $|D_t|=|F_{uu}|c\sqrt{|h|}/(2u_*)+O(|h|)$ on each branch. Each canonical hit contributes $2\mathbf e_*/(u_*|F_{uu}|c\sqrt{|h|})+O(1)$, so the two positive-polarity hits add with coefficient $B=4/(u_*|F_{uu}|c)$. Signed transmitter factors have opposite signs; canonical absolute weights have the same sign.

The radial projection is $u_*/2$, the tangent projection is $(1-D_r^*)/3$, and the squared sideways projection is $1-u_*^2/4-(1-D_r^*)^2/9$. These determine the divergent support components once fold isolation and absence of simultaneous singular sources are certified. This is a local prescribed-history statement; it supplies no value or continuation at the event.

Before its first target run, the separate rational fold checker passed exact addition, $H_+(0)=4$, $H_+'(0)=-32/3$, sine at zero, and rational bisection of $u^2-2$ with the output endpoints checked by exact squaring. Its controls receipt is retained. It uses the reviewer's existing rational midpoint-Taylor/Lipschitz library, fixed whole-cell exclusion outside two broad monotone windows, then rational bisection inside those windows. No subject code is imported.

### Independent isolation and projection certificate

The first independent whole-cell pass at width $1/200$ stopped on unresolved cell $[1.2,1.205]$; it did not classify that cell as empty or claim a completed certificate. Refining the exclusion grid to width $1/2000$ resolved the interval-dependency inflation. The final [reviewer reference](../evidence/spherical-three-three-review-fold-reference.mjs) excludes 3600 cells outside $[2/5,1/2]$ and $[11/10,6/5]$. On each of these two windows the factored derivative has a strict sign, and exact endpoint signs oppose. Each therefore contains exactly one root. Rational bisection refines those roots without contributing any unproved completeness assumption. The [retained receipt](../evidence/spherical-three-three-review-fold-target.jsonl) stores exact rational endpoints for all enclosures and reports zero unresolved intervals. Its approximate display fields are truncated rational-to-number summaries, not certificate endpoints; exact rational strings are authoritative.

The independent root intervals are

$$
u_1\in\left[\frac{36827723}{83886080},\frac{73655447}{167772160}\right],
\qquad
u_2\in\left[\frac{193936459}{167772160},\frac{9696823}{8388608}\right].
$$

The exact rational receipt, rather than these transcription labels, owns the root brackets. Approximate delays are $0.43902067$ and $1.15595138$. The reference also verifies both displayed phase-signature rectangles in the subject analysis using exact rational comparisons. It independently proves $0.390<c_1<0.391$, $0.421<c_2<0.422$, $1.63<B_1<1.64$, $2.06<B_2<2.07$, $-0.91<p_{t,1}<-0.90$, $0.48<p_{t,2}<0.49$, and $p_{b,1}^2>0.12$, $p_{b,2}^2>0.42$. Square-root bounds are checked by exact rational comparisons of $c^2$ and $B^2$, using

$$
B^2=\frac{8}{u_*^2|F_{uu}||F_\theta|}.
$$

No numerical square root or rounded display is used to establish these strict inequalities. The first target's approximate conversion of very large numerator and denominator separately produced nonfinite display values for two phase fields; the rational enclosures themselves remained exact. Before the final run that display-only conversion was replaced by fixed-decimal integer division. The controls were rerun before the final target, and all exact interval assertions passed.

### Complete local ledger and noncoincidence

For receiver $\mathbf u_0(\theta)=(\cos\theta,\sin\theta,0)$, direct dot products give the next-plane positive residual $u^2-2+\sin v+\sin3u$ and previous-plane positive residual $u^2-2+\sin v-\sin3u$. The negative sources reverse their sine terms. Eliminating $v$ assigns next-positive and previous-negative folds to $H_+$; next-negative and previous-positive folds require $H_-=0$. The latter is excluded on the whole delay domain by the earlier independent rational certificate. Previous-negative folds are next-positive folds shifted by $\pi/2$ modulo $\pi$.

At an $H_+$ root, the reconstructed phase signature is

$$
\sin2\theta=(2-u^2-\sin3u)\cos3u+(\cos3u+2u/3)\sin3u,
$$

$$
\cos2\theta=(\cos3u+2u/3)\cos3u-(2-u^2-\sin3u)\sin3u.
$$

The independent interval rectangles have opposite sine signs and opposite cosine signs between events, but unequal absolute values with wide separation. They are neither equal nor antipodal on the phase-signature circle. Hence no same-plane or other cross-plane fold coincides at either representative receiver phase. This argument includes the quarter-period negative-source companions; their polarity cannot cancel a divergence at a distinct event.

The self and antipodal branches are phase-independent. Their previously established one-self/three-antipodal simple-root census at $\beta=3$ is unaffected. Partner histories have instantaneous separation at least one and speed three, so every partner delay is at least $1/(1+3)=1/4$ and at most two. Analytic root functions have only finitely many isolated roots on this compact interval; all roots other than the identified double root are simple at the representative event. The self branch has its separate positive-delay exclusion at zero. Compactness and the implicit-function theorem therefore make the remaining complete ledger a bounded local background. No unenumerated simultaneous non-simple branch remains that could cancel the pair's leading term.

### Subject arithmetic, portability and verdict

Inspection of `spherical-three-three-dynamics-fold-local.mjs` confirms outward fixed-point addition, multiplication and division at scale $10^{24}$, sine/cosine Taylor bounds with valid absolute remainders, midpoint derivative-one widening over delay intervals, and a covering binary subdivision of $[0,2]$. A cell is removed only by interval exclusion or strict monotonicity with same-sign endpoints; an accepted bracket requires strict monotonicity and opposite signs. The reported two brackets and zero unresolved cells therefore represent a whole-delay classification, not merely two found roots. Its controls include exact integer checks around the known square-root bracket. The separate reviewer certificate supplies independent evidence for that classification rather than replaying this instrument.

**Portable-interval qualification:** the subject's `show` conversion uses `Number(v)/Number(S)` without directed rounding. Its JSON decimal derivative and phase endpoints are not portable exact enclosures. The `delayFixed` integers with the declared scale do preserve exact delay brackets, and the subject's deliberately widened prose rectangles are independently validated by the reviewer rational intervals. Preserve this distinction when consuming the receipt. The exact-rational reviewer fields supply portable enclosures for the derived quantities used in this verdict.

**Derived verdict:** accept two ordinary quadratic fold delays, their nonzero reception derivatives, the opposite transmitter signs, the specified two-root sides, and the positive absolute-weight coefficient $B$. Because the remaining ledger is bounded, the total acceleration has the same $B\mathbf e_*/\sqrt{|h|}+O(1)$ leading term. The radial, along-path and sideways support magnitudes all diverge. Radial support is inward at both representative positive-source events; along-path support is positive at the first and negative at the second. The sideways sign is representation-dependent under antipodal symmetry, while its nonzero magnitude is certified. In absolute time $h=3(T-T_*)$, so the corresponding coefficient for $|T-T_*|^{-1/2}$ is divided by $\sqrt3$.

The scope is a sufficiently small ordinary-side neighborhood of each prescribed-history event. Local integrability of the exponent does not prescribe an event impulse or continuation, establish evolved constrained motion, or determine a physical fate. Falsifiers are an invalid whole-delay exclusion, an overlooked coincident source fold, a wrong transmitter absolute-weight convention, or a failed exact coefficient/projection bound. This bounded adjudication adds no event rule, target phase scan or production change. All subject files and prior receipts were preserved.

Measured by `shasum -a 256`, the reviewed fold instrument is `a5889a5b53a35959a051cea98b4abf902774fc2239ee52c3e15d97387bb19096` and its receipt is `ce4d02b7f9df0988912f062a052f0ee57f02caa2854be21d7190ec8f3d837fda`. The completed appendix produced no whitespace diagnostics under `git diff --no-index --check /dev/null`; exit 1 denotes the file addition. The coordinator owns receiving synthesis. This assigned slice is complete and no job remains active.

## Small initial-speed perturbation: independent analytical checkpoint

The accepted first-turn strip supplies $-4<f<-7/8$ and old-source distances greater than $9/8$. For each initial speed $\varepsilon\in[6/25,13/50]$, construct the smooth scalar old-source solution first, without yet assuming a coupled delayed reduction. Its sensitivity $y=\partial_\varepsilon\alpha$ solves $y''=f'(\alpha)y$, $y(0)=0$, $y'(0)=1$. The five stationary inverse-square vector terms have derivative operator norm at most $2/d^3$ each, so their sum has norm less than $5120/729<8$; the acceleration norm is less than $320/81<4$. Projection onto the moving unit latitude tangent therefore gives $|f'|<12$. These bounds hold in the radius-$1/8$ ball about the release position: the closest old partner is at initial distance $\sqrt7/2$, and $\sqrt7/2-1/8>9/8$.

The Volterra equation gives $|y(t)|\le\sinh(\sqrt{12}t)/\sqrt{12}$ and $|y'(t)-1|\le\cosh(\sqrt{12}t)-1$. Since every stopping time is below $3/10$, the series ratio after the constant is at most $(27/25)/12=9/100$. Thus $\cosh(\sqrt{12}t)\le145/91$, and $37/91\le y'(t)\le145/91$. The stop is transverse, so implicit differentiation yields $T'(\varepsilon)=y'(T)/[-f(\alpha_*)]$ and consequently $37/364<T'<1160/637$, which implies the stated $1/10<T'<2$.

Independently integrating the scalar equation gives $\int_0^{z_*}[-f(\alpha_0+z)]\,dz=\varepsilon^2/2$. Differentiation gives $z_*'=\varepsilon/[-f(\alpha_*)]$, hence $3/50<z_*'<52/175<3/10$. This is a mathematical first integral and finite-time initial-data derivative, not a physical energy map or an equilibrium stability calculation. No numerical instrument is needed.

Two details remain for the final disposition: explicitly exclude $\delta=0$ from the strict speed-spread inequality, and close the complete assembly's histories on a common interval rather than assuming that individual post-turn intervals automatically coincide. The available bounds suffice for that closure, as developed below.

### Common event interval and complete-history closure

The mean-value theorem gives $|T(\varepsilon)-T_*|<2|\delta|\le1/50$ for nonzero $\delta$. Define

$$
L=\max\{T(\varepsilon),T_*\}+\frac1{32}.
$$

The later-turning history is already certified through $L$. The earlier-turning history needs at most $1/32+1/50=41/800$ after its turn. While it stays in the strip, its backward speed is less than $4(41/800)=41/200<13/50$, and its backward displacement is less than

$$
2\left(\frac{41}{800}\right)^2=\frac{1681}{320000}<\frac9{1250}.
$$

The last quantity is the uniform lower bound on the turning rise. Therefore it cannot reach the lower strip boundary during this interval. Negative signed velocity after the turn prevents escape through the upper boundary. A first-exit argument closes continuation through $L$ for every member, with speed at most $13/50$. This includes both turning events and every member's claimed $1/32$ post-turn interval. At $\delta=0$ the same result holds with coincident turns and no extra extension.

Also $L<52/175+1/32=1839/5600<1/3$. Throughout the entire common interval, each explicit old-source emission satisfies $S=t-d_j$ and $-1/4-S>13/24$. The complete preparation has speed at most $\varepsilon$ because differentiating $T(1+4T)^3$ gives $(1+4T)^2(1+16T)$, whose absolute value is at most one on $[-1/4,0]$. Its maximum displacement is $27\varepsilon/1024$. The unchanged members' preparations satisfy the same bound with initial speed $1/4$. These complete histories, joined to the scalar solutions on $[0,L]$, therefore have speed at most $13/50<1$ everywhere needed by the causal roots.

Every partner root is unique by strict monotonicity of the delay function, and every positive-delay self root is excluded by the path-length bound. The explicitly constructed partner roots lie in the unchanged stationary past, so they have transmitter factor one. This establishes the canonical constrained equation for the simultaneous assembly on $[0,L]$, rather than assuming that separately bounded scalar solutions already solve the coupled history problem. Each unperturbed member remains its original scalar trajectory because the changed member's emissions reaching it are still from the same stationary site. No future source history beyond $L$ is required.

### Comparison at the original stopping event and support

For $\delta>0$, the changed member has not yet turned at $T_*$; for $\delta<0$, it has already turned and is descending. Both cases lie in the common interval above. Integrating the strictly negative acceleration between the two stops gives

$$
\frac78|T(\varepsilon)-T_*|<|v(T_*;\varepsilon)|<4|T(\varepsilon)-T_*|.
$$

For $0<|\delta|\le1/100$, this implies the stated $7|\delta|/80<|v(T_*;\varepsilon)|<8|\delta|$ and $\operatorname{sign}v(T_*;\varepsilon)=\operatorname{sign}\delta$. For $\delta=0$, the correct statement is exactly $T(\varepsilon)=T_*$, $\alpha_*(\varepsilon)=\alpha_*$ and $v(T_*;\varepsilon)=0$; neither strict magnitude inequality applies. The introductory result already restricts its strict event-displacement inequalities to nonzero perturbations, but the later speed-spread display and the phrase “for every permitted $\delta$” should make this restriction explicit. This is an edge-wording correction, not a failure of the sensitivity theorem.

The bound $1/4<-A_n<4/3$ and common speed bound give $\lambda=-v^2-A_n>1/4-(13/50)^2=114/625$, with $\lambda<4/3$. Thus outward normal support remains necessary on the full common interval. The latitude velocity crosses zero smoothly with negative acceleration, while its norm has a cusp at each member's own stop. The parameter derivative concerns smooth signed velocity, so it does not incorrectly differentiate the speed norm at that cusp.

### Review disposition and exact limits

**Accepted at derived grade:** uniform initial-speed sensitivity, positive stopping-time and turning-latitude derivatives, direction and magnitude of the finite changes for nonzero permitted perturbations, comparison at the original stopping time, complete-history root margins, unchanged motion of the other five members and outward support. The above common-interval continuation supplies a missing explicit step in the subject's assembly-level argument. Its numerical constants require no change. The only wording correction is the nonzero-$\delta$ condition on strict magnitude bounds; at zero use the exact identities stated above.

This is finite-time sensitivity of a moving constrained solution prepared with already unequal initial speeds. It establishes neither splitting from equal initial speeds nor long-time stability or instability, a stability spectrum, a physical energy label or an extension past the certified stationary-emission domain. Falsifiers are violation of the derivative/strip estimates, failure of the transverse stop, a breach of the common-interval displacement bound, or an additional root despite the complete-history speed bound. All mathematical checks here are analytical; no new target instrument, numerical evolution, heavy job or subject modification was used. The coordinator owns synthesis and any subject wording correction. This bounded adjudication is complete.

Measured by `shasum -a 256`, the reviewed small-speed companion has identity `d1bb7520cb0c5ece10589764c5d8ce30fad049e31d589b1cb9797491ba6f378f`. The appended review emitted no whitespace diagnostics under `git diff --no-index --check /dev/null` (exit 1 records the file addition). These are document checks; the independent analytical reference above carries the scientific verdict.

## Independent rotating alternating-hexagon reference

This reference is saved before reading the new dynamics rotating-hexagon output. Assume complete uniform equatorial histories $\mathbf X_i(T)=R(\cos(\omega T+i\pi/3),\sin(\omega T+i\pi/3),0)$, polarity $(-1)^i$, fixed positive $K_{\mathrm{int}}$, $c_f=1$ and positive speed $\beta=R\omega\in(0,1)$. Rotate the receiving member to $(R,0,0)$. For relative source index $j=1,\ldots,5$, define $a_j=j\pi/6$ and the unique $x_j\in(0,\pi)$ solving

$$
x_j+\beta\sin x_j=a_j.
$$

The left side has derivative $1+\beta\cos x>1-\beta>0$, maps $[0,\pi]$ onto $[0,\pi]$ and therefore gives exactly one root for each partner. The causal delay is $u_j=2R\sin x_j$, the relative emission angle is $2x_j$, the unit chord is $(\sin x_j,-\cos x_j,0)$, and $D_{t,j}=1+\beta\cos x_j>0$. These expressions satisfy both the geometric chord equation and the emission phase relation. Global speed below wake speed gives the independent delay-monotonicity argument excluding every other partner root and every positive-delay self root. Each present partner separation is at least $R$, hence partner delay is at least $R/(1+\beta)$ and at most $2R$, with the upper endpoint included. The complete ledger has five roots per receiver, thirty across the six receivers.

Direct substitution into the canonical absolute-transmitter-weight law gives dimensionless projections

$$
N(\beta)=\sum_{j=1}^5\frac{(-1)^j}{4\sin x_j(1+\beta\cos x_j)},
\qquad
P(\beta)=-\sum_{j=1}^5\frac{(-1)^j\cos x_j}{4\sin^2x_j(1+\beta\cos x_j)}.
$$

The physical acceleration is $(K_{\mathrm{int}}/R^2)(N\mathbf n+P\mathbf t)$ and has exactly zero sideways component. Required normal support is $\lambda=-\beta^2/R-K_{\mathrm{int}}N/R^2$; required along-path correction is $\mu=-K_{\mathrm{int}}P/R^2$. Constant-speed normal-only motion therefore requires $P(\beta)=0$, independent of radius at fixed shape and speed. Rigid rotation and cyclic polarity products make both projections time-independent and identical for every receiver; a phase scan adds no information for these exact full histories.

### Small-speed coefficient and exact parity

At $\beta=0$, $x_j=a_j$ and reflection pairs cancel tangent contributions. The radial value is

$$
N(0)=\frac1{\sqrt3}-\frac54<0,
\qquad P(0)=0.
$$

Implicit differentiation gives $x_j'(0)=-\sin a_j$. If $Q(x)=\cos x/\sin^2x$, then $Q'(x)=-(1+\cos^2x)/\sin^3x$. Hence

$$
\left.\frac{d}{d\beta}\frac{Q(x_j(\beta))}{1+\beta\cos x_j(\beta)}\right|_{\beta=0}
=\frac1{\sin^2a_j}.
$$

The exact alternating sum is $\sum_{j=1}^5(-1)^j\csc^2(j\pi/6)=-4+4/3-1+4/3-4=-19/3$, so

$$
P'(0)=\frac{19}{12}>0.
$$

Reflection gives $x_{6-j}(\beta)=\pi-x_j(-\beta)$. Since $(-1)^{6-j}=(-1)^j$, it follows that $N$ is even and $P$ is odd in the analytic continuation through zero. Thus

$$
N(\beta)=\frac1{\sqrt3}-\frac54+O(\beta^2),
\qquad P(\beta)=\frac{19}{12}\beta+O(\beta^3).
$$

Analyticity follows from the implicit-function theorem because all five $\sin a_j$ are nonzero and their root derivatives are nonvanishing near zero. Therefore there exists a positive $\beta_0$ such that every $0<\beta<\beta_0$ has strictly positive tangent acceleration and fails the constant-speed normal-only necessary condition at every finite positive radius. This is a derived small-speed exclusion; it does not yet give an explicit cutoff or a sign theorem over the whole interval $(0,1)$.

For a further analytical control, differentiating the same scalar quotient at any signed parameter $b\in(-1,1)$ yields $(1+b\cos^3x)/[\sin^2x(1+b\cos x)^3]>0$. Consequently each reflected same-polarity pair contributes a strictly negative tangent acceleration, and each reflected opposite-polarity pair contributes a strictly positive one for positive speed. The own opposite-polarity partner also contributes positively. These individual signs alone do not compare the magnitudes of the alternating pairs and are not a full-speed positivity proof.

> Grade and falsifiers: derived canonical root census, projections, parity and small-speed obstruction. A missing root despite global sub-wake monotonicity, a wrong source tangent sign or transmitter factor, or an incorrect alternating trigonometric sum would falsify the corresponding claim. No equilibrium spectrum, actual evolution, energy assignment or full-speed sign claim is made. No target instrument or sweep was used. The independent reference is now frozen for comparison with the forthcoming dynamics artifact.

## Rotating-hexagon full-speed convexity adjudication

The frozen dynamics companion's root census, canonical projections, stationary radial value, small-speed coefficient and parity agree with the independent reference above. Its additional full-interval argument needs a separate convexity identity. Before target use, the reviewer-authored exact integer polynomial checker passed the known square $(x+y)^2$, derivative of $x^3$ and sign substitution controls; its controls-only receipt is retained. This checker derives quotient-rule numerators rather than importing the subject's differentiation implementation; the subject is analytical and has no target instrument to replay.

Let $S=1-c^2$, $D=1+\beta c$ and $N=1+\beta c^3$, so $W=N/(SD^3)$. Since $\partial_a=-\sqrt S\,\partial_c/D$, quotient differentiation gives

$$
P=N_cSD-N(S_cD+3S\beta),\qquad W_a=-\frac{P}{S^{3/2}D^5}.
$$

A second differentiation gives the independent numerator construction

$$
E=P_cSD+3cPD-5\beta PS,\qquad W_{aa}=\frac{E}{S^2D^7}.
$$

These identities provide the analytical reference for the exact polynomial coefficient check. Positivity of $S$ and $D$ is already established on $0<a<\pi$, $0\le\beta<1$ by the complete root map.

### Exact identities and global positivity

The [independently authored polynomial reference](../evidence/spherical-three-three-review-hexagon-polynomial.mjs) verifies, with integer coefficients, the subject's displayed $P$ and $E$ against the quotient-rule constructions. It also verifies the negative-$c$ decomposition and its discriminant identity exactly. The [target receipt](../evidence/spherical-three-three-review-hexagon-target.jsonl) records all derived coefficients and passed identities; the [controls receipt](../evidence/spherical-three-three-review-hexagon-controls.json) precedes it. This is exact finite algebra, with no floating-point or interval-endpoint qualification.

For $c\ge0$, set $t=c^2$. The coefficient of $\beta^2$ obeys

$$
15-48t+59t^2-8t^3\ge15-48t+51t^2
=51\left(t-\frac8{17}\right)^2+\frac{63}{17}>0.
$$

The remaining terms are at least $2-\beta c>1$. Thus $E>0$ on this half of the domain without requiring a numerical minimum.

For $c=-z<0$, the exact decomposition uses $t=z^2$, $A=z(7+t)>0$, $B_0=15-39t+8t^2$ and $C=2z^3(1+3t)>0$:

$$
E=(2+4t)(1-\beta z)^3+\beta(1-t)(A+B_0\beta+C\beta^2).
$$

If $B_0\ge0$, all terms in the bracket are nonnegative and its constant is positive. If $B_0<0$, monotonic decrease of $15-39t+8t^2$ on $[0,1]$ and its value $17/25$ at $2/5$ imply $t>2/5$. The exact identity

$$
4AC-B_0^2=(1-t)^2(-40t^2+720t-225)
$$

is then strictly positive: $t<1$, and the last factor increases on $[2/5,1]$ from $283/5>0$. The quadratic bracket has positive leading coefficient and negative discriminant, hence is positive for all real $\beta$. Since $1-\beta z>0$, the first term of $E$ is strictly positive even at $\beta=0$. These facts prove strict convexity for all the stated angles and speeds. The separate zero-speed control is $W(a,0)=\csc^2a$ and $W_{aa}=(2+4\cos^2a)/\sin^4a$, in agreement with the general formula.

### Alternating sum and normal-only obstruction

Implicit differentiation independently gives $x_\beta=-\sin x/(1+\beta\cos x)$. For $h=-\cos x/[\sin^2x(1+\beta\cos x)]$, it follows that $h_\beta=-W$. The dimensionless tangent function $P$ in the review's earlier reference is the subject's $T$; this is only a notation difference. Its derivative is therefore

$$
T'(\beta)=\frac14(W_1-W_2+W_3-W_4+W_5).
$$

Strict midpoint convexity at the equally spaced five angles gives $W_2<(W_1+W_3)/2$ and $W_4<(W_3+W_5)/2$. Substitution cancels the middle contribution exactly and yields $T'>(W_1+W_5)/8>0$. No reflection symmetry of $W$ is assumed in this step. With the independently derived $T(0)=0$, integration proves $T(\beta)>0$ for the entire open sub-wake interval. This strengthens the review's previously frozen small-speed-only conclusion without relying on a speed scan.

The receiver and source projection factors coincide for this rigid family: $D_r=D_t=1+\beta\cos x$, so playback is one. That fact does not cancel the transmitter factor in the canonical acceleration. For reversed rotation, the component on a fixed counterclockwise basis reverses by the signed-speed parity; the velocity direction reverses too, leaving the component along motion strictly positive. Thus both senses of uniform nonzero sub-wake rotation are excluded. Zero speed is a distinct admitted stationary configuration with outward normal support $K(5/4-1/\sqrt3)/R^2$; no claim at $\beta=1$ or beyond follows.

### Final disposition

**Accepted at derived grade:** the complete five-partner/no-self ledger, exact normal/tangent projections, static limit, $19/12$ small-speed coefficient, strict convexity proof and entire $0<\beta<1$ normal-only exclusion for the rigid alternating equatorial hexagon at every finite positive radius and positive coupling. No correction to the frozen companion is required. Its constant-speed tangent mismatch is strictly along the prescribed direction of motion, so the extra correction that would maintain the history would oppose motion; that tangent correction is not selected by the scenario.

Falsifiers are a failed quotient-rule identity, an error in the negative-domain discriminant factorization, failure of the strict midpoint inequalities, or a root outside the complete sub-wake ledger. The exact polynomial evidence and independent analytical reconstruction above address these obligations. This result does not exclude arbitrary six-member motion, prescribe evolution away from this history, establish fate or stability, or identify physical energy. Subject files remain unchanged; no scan, numerical evolution, singular continuation, expanded law or production change was used. This bounded reference-and-adjudication assignment is complete, and the coordinator owns synthesis.

Measured by `shasum -a 256`, the reviewed rotating-hexagon companion is `b0948c700dfeb0872e7f4f0785d37b896d492be9b4fcde47258467566c785640`. The completed review appendix emitted no whitespace diagnostics under `git diff --no-index --check /dev/null` (exit 1 denotes a file addition). Scientific validation is the separate exact polynomial reference plus the analytical derivation, not the document check.

## Independent prepared equatorial-hexagon release reference

This reference is saved before reading the new symmetry release companion. Work at $R=K_{\mathrm{int}}=c_f=1$ with alternating stationary sites at angles $i\pi/3$ before $-1/4$. On $(-1/4,0]$, all members share the prepared phase $\Phi(T)=\varepsilon T(1+4T)^3$, $\varepsilon=1/4$. The preparation returns to phase zero at release, has right initial angular speed $\varepsilon$, and has complete speed at most $\varepsilon$. The equation is imposed after the preparation cut; no matching of prepared and right dynamical acceleration is assumed.

For a receiver at phase $\phi$ relative to its release site, define $a_j=j\pi/6$ and $x_j=a_j-\phi/2$, $j=1,\ldots,5$. On $|\phi|\le1/8$, all $x_j$ lie in $(0,\pi)$. If every arriving source emission is stationary, the exact tangent and radial accelerations are

$$
f(\phi)=-\frac14\sum_{j=1}^5(-1)^j\frac{\cos x_j}{\sin^2x_j},
\qquad
n(\phi)=\frac14\sum_{j=1}^5\frac{(-1)^j}{\sin x_j}.
$$

The scalar equation is $\phi''=f(\phi)$, with $\phi(0)=0$ and $\phi'(0)=1/4$. This static-source expression has transmitter factors exactly one. It is distinct from the excluded eternal uniform-rotation history, whose emissions move and whose transmitter factors depend on speed.

Reflection of the five old sites gives $f(-\phi)=-f(\phi)$ and $n(-\phi)=n(\phi)$. Direct differentiation at release yields

$$
f(0)=0,\qquad
f'(0)=\frac18\left(29-\frac{20}{3\sqrt3}\right)
=\frac{29}{8}-\frac5{6\sqrt3}>0,
\qquad n(0)=\frac1{\sqrt3}-\frac54.
$$

Therefore the first nonzero time derivative of tangent acceleration is

$$
\left.\frac{d}{dT}f(\phi(T))\right|_{0^+}
=\phi'''(0^+)=\frac{29}{32}-\frac5{24\sqrt3}>0.
$$

The speed derivative itself vanishes at release, but its second derivative is this positive quantity. Local analyticity and the odd scalar equation give $\phi(T)=\varepsilon T+\varepsilon f'(0)T^3/6+O(T^5)$ and $\phi'(T)=\varepsilon+\varepsilon f'(0)T^2/2+O(T^4)$. Initial normal support is $\lambda(0)=19/16-1/\sqrt3>0$, and $\lambda'(0)=0$ by radial parity.

### Explicit strip, increasing speed and complete roots

Every point on the phase strip lies within Euclidean distance $1/8$ of its release site. The five old partner distances exceed $1-1/8=7/8$. Consequently the stationary vector field satisfies $|\mathbf A|<320/49<7$ and $\|D\mathbf A\|<5120/343<15$, using the exact inverse-square derivative norm $2/d^3$. Differentiating either unit-vector projection gives $|f'|,|n'|<22$.

There is also a direct strict sign bound on $f'$ throughout the strip. Let $Q(x)=(1+\cos^2x)/\sin^3x$. Then $f'=-(1/8)\sum(-1)^jQ(x_j)$. For the two nearest opposite-polarity partners, $\sin x_j\le9/16$, hence $Q\ge(16/9)^3$. For the two like-polarity partners, $\sin x_j>3/4$, hence $Q<128/27$. The own opposite-polarity partner has $Q\ge1$. Thus

$$
f'(\phi)>\frac18\left[2\left(\frac{16}{9}\right)^3+1-\frac{256}{27}\right]
=\frac{2009}{5832}>\frac13.
$$

In particular $f(\phi)>\phi/3$ for $0<\phi\le1/8$. The released member moves forward and speeds up strictly for every positive time during the strip interval; it cannot stall while this bound holds.

First construct all six scalar motions through $0\le T\le1/32$. The acceleration bound gives

$$
|\phi'(T)|\le\frac14+7T\le\frac{15}{32}<1,
\qquad
|\phi(T)|\le\frac T4+\frac72T^2\le\frac{23}{2048}<\frac18.
$$

A first-exit argument therefore closes this entire interval. The discrete rotation by $\pi/3$ and cyclic relabeling leave every polarity product invariant, despite reversing the individual signs. Together with identical scalar initial data, this symmetry makes all six members follow the same $\phi(T)$ and retain a regular hexagon with equal speeds. Plane reflection preserves their common equatorial plane. These are symmetries of the complete preparations, not just of the release positions.

For every stationary partner distance $d_j>7/8$, its explicit causal emission satisfies $S=T-d_j<-1/4$ with margin

$$
-\frac14-S>\frac78-\frac1{32}-\frac14=\frac{19}{32}.
$$

The constructed complete histories have speed at most $15/32<1$, so partner delay monotonicity proves that these five roots per receiver are the only partner roots. The path-length bound excludes all positive-delay self roots. The stationary-source scalar solution is therefore an actual solution of the complete canonical constrained equation throughout $[0,1/32]$, with thirty directed partner roots and no self roots. This order avoids assuming the delayed reduction before checking its complete history.

### Radial support and scope

The radial projection varies by less than $22|\phi|\le253/1024$. Its release value obeys $2/3<-n(0)<3/4$. Combining this with $|\phi'|\le15/32$ gives

$$
\frac{307}{1536}<\lambda=-\phi'^2-n(\phi)<\frac{1021}{1024}<1
$$

throughout the full interval. Thus this finite-time release has equal but strictly increasing speeds under positive outward normal support. The adopted support remains purely radial; no tangent controller is used. This is an actual finite constrained motion, not a compatibility claim for eternal uniform rotation.

> Grade and falsifiers: derived finite-time scalar motion, first nonzero release derivative, complete root census and explicit support bounds. A wrong old-source projection, loss of the strip sign/size bounds, an additional root despite the complete-history speed bound, or failure of the stationary-emission margin would invalidate the corresponding conclusion. No claim of an all-time orbit, stability, energy label or physical support provider is made. No target instrument or numerical evolution was used. This independent reference is now frozen pending the symmetry companion.

## Prepared hexagon: angle-event extension adjudication

The frozen symmetry companion is compared against the independent release reference above. Its static five-source equation, discrete complete-history symmetry, release coefficient $c=29/8-5/(6\sqrt3)$, positive first time derivative of tangent acceleration and initial normal support agree with that reference. The subject extends the certified motion to the angle event $Q=1/64$, beyond the review's initial fixed-time interval, and proves tighter outward-support bounds. The following independent reconstruction verifies that extension without numerical evolution.

### Hessian bound and event bootstrap

For one inverse-square vector term $H(r)=r/|r|^3$, direct differentiation twice along a unit vector $w$ gives

$$
D^2H[w,w]=|r|^{-4}[-6bw+(15b^2-3)\widehat r],\qquad b=\widehat r\cdot w.
$$

Taking the squared norm yields $|r|^{-8}(9-18b^2+45b^4)$. This quadratic in $b^2\in[0,1]$ is convex, so its maximum is the larger endpoint value, $36$. Thus the norm is at most $6/|r|^4$. In the spatial ball of radius $1/16$ about the release site, all five old-source distances are at least $15/16$, giving

$$
|A|\le5(16/15)^2<6,\quad
\|DA\|\le10(16/15)^3<13,\quad
|D^2A[w,w]|\le30(16/15)^4<39.
$$

For $f=t\cdot A(x)$, angle differentiation gives $f''=t''\cdot A+2t'\cdot DA\,t+t\cdot D^2A[t,t]+t\cdot DA\,t'$. Since $|t|=|t'|=|t''|=1$, the bound is $|f''|<6+3(13)+39=84$. This independently checks the factor three multiplying the first derivative norm and the directional Hessian estimate used by the subject.

Since $3<c<4$, on $0\le\Phi\le1/64$ one has $f'>c-84/64>27/16>3/2$ and $f'<4+84/64<6$. Together with $f(0)=0$, this gives $(3/2)\Phi<f(\Phi)<6\Phi$ for positive phase. The initial positive speed and positive acceleration keep the motion increasing until the angle event. Under the temporary speed bound $s\le13/50$, the event must occur by $1/16$ unless that speed bound fails first. Before either event, $f<6/64=3/32$, so $s<1/4+3/512=131/512<13/50$. This strict improvement rules out a first failure. Smooth scalar continuation on the compact strip therefore reaches $Q$.

Integrating $1/4<s<13/50$ at positive times gives the strict event bounds $25/416<T_Q<1/16$. The lower inequality follows from $Q<(13/50)T_Q$, and the upper from $Q>T_Q/4$. Integrating $(3/2)\Phi<f<6\Phi$ together with $T/4\le\Phi\le13T/50$ gives precisely

$$
\frac3{16}T^2<s(T)-\frac14<\frac{39}{50}T^2,\qquad 0<T\le T_Q.
$$

The strict drift bounds are correctly restricted to positive times; at release the speed equals $1/4$. The event interval includes $T_Q$ itself, rather than only approaching the event from below.

### Complete histories and sharper radial support

Construct the common-phase scalar motion first, then use its uniform speed bound to verify all causal roots. At the event strip, $|x-a_0|\le\Phi\le1/64$, so every old partner distance is at least $63/64$. Its explicit emission lies before $-1/4$ with margin at least $63/64-1/16-1/4=43/64>0$. The entire preparation and constructed future through $T_Q$ have speed at most $13/50$. Delay monotonicity with lower Lipschitz slope $37/50$ excludes every extra partner root, and the strict path-length inequality excludes every positive-delay self root. There are exactly five partner roots per receiver and thirty directed roots for the assembly. The stationary sources have transmitter factor one; the receiver factor is bounded below by $37/50$ and is not an extra canonical weight. The sixfold symmetry and plane reflection remain valid for these complete histories, so the common-phase construction satisfies every member's equation.

The radial formula $A_n=(1/2)\sum_{k=1}^5(-1)^k/d_k$ follows independently from the equal-radius chord identity. Its angle derivative is bounded by $(5/2)(16/15)^2=128/45<3$, because $|d_k'|\le1$. Therefore, using $13/20<-A_n(0)<3/4$,

$$
-A_n>\frac{13}{20}-\frac3{64}=\frac{193}{320}>\frac35,
\qquad
-A_n<\frac34+\frac3{64}=\frac{51}{64}<1.
$$

It follows that $\lambda=-s^2-A_n>3/5-(13/50)^2=1331/2500>1/2$, while $\lambda<1$. The sharper event-strip support bounds are consistent with, and improve on, the earlier independently frozen fixed-time reference. Pure radial support suffices because the actual angular acceleration equals the canonical tangent projection; no tangent correction is inserted.

### Final verdict and boundary

**Accepted at derived grade:** actual normal-constrained motion through $\Phi=1/64$, the strict stopping-angle time bounds $25/416<T_Q<1/16$, equal positive and strictly increasing speeds, the quantitative drift, complete five-partner/no-self census, stationary-emission margin and $1/2<\lambda<1$. No correction to the frozen companion is required. Its Hessian and bootstrap estimates are conservative but valid. The preparation's possible acceleration mismatch at zero is explicitly allowed; position and velocity are continuous, and all quoted release derivatives are from the post-release side.

This result concerns the declared prepared history and its finite event-defined interval. It does not use the excluded eternal uniform-rotation history as initial data, imply all-time rigid motion, select physical energy, remove the need for external normal support, or supply a stability conclusion. Falsifiers are an incorrect Hessian norm, failure of the strict speed bootstrap, a root outside the complete sub-wake ledger, or a lost old-emission/support bound. No subject or earlier independent-reference edits, numerical evolution, duplicate job or scan were used. This bounded adjudication is complete; the coordinator owns synthesis.

Measured by `shasum -a 256`, the reviewed prepared-hexagon companion has identity `86231a4749f14db1112de5e43a8a574d595bbc2ba43ad30228d87c3d6e240ee6`, matching the coordinator's frozen identity. The completed appendix emitted no whitespace diagnostics under `git diff --no-index --check /dev/null` (exit 1 denotes the file addition). The independent analytical reconstruction, rather than this document check, supports the scientific verdict.

## Independent six-cell prepared-hexagon radius and speed reference

This reference is saved before reading the pending dynamics radius/speed companion. Keep fixed $K=K_{\mathrm{int}}>0$, $c_f=1$, radius $R$, dimensionless time $\tau=T/R$, and $g=K/R\in\{1/10,1,10\}$. The initial speed is $\beta\in\{1/4,3/4\}$. All members share the complete preparation $p(\tau)=\beta\tau(1+4\tau)^3$ on $[-1/4,0]$, stationary earlier. Its maximum speed is $\beta$, and physical stationary history ends at $T=-R/4$.

The independently frozen static-source projections $f(\Phi)$ and $N(\Phi)$ give the exact reduced equation

$$
\Phi''(\tau)=g f(\Phi),\qquad \Phi(0)=0,\quad \Phi'(0)=\beta,
\qquad \ell:=R\lambda=-\Phi'^2-gN(\Phi).
$$

The common physical speed is $s=\Phi'(\tau)$, not $\Phi'/R$; the latter is angular frequency. Fixed $K$ with changing $R$ changes $g$ and therefore changes the dimensionless motion. It is not a similarity that preserves a solved trajectory merely by rescaling time and radius.

### An exact radial/tangent identity and finite event bounds

Direct differentiation of $N=(1/4)\sum(-1)^j\csc(a_j-\Phi/2)$ gives

$$
N'(\Phi)=\frac18\sum(-1)^j\frac{\cos(a_j-\Phi/2)}{\sin^2(a_j-\Phi/2)}=-\frac12 f(\Phi).
$$

Put $L_0=-N(0)=5/4-1/\sqrt3$, $I(\Phi)=\int_0^\Phi f(q)\,dq$ and $v=\Phi'$. Scalar integration and the projection identity then imply

$$
v^2=\beta^2+2gI(\Phi),\qquad
-N(\Phi)=L_0+\frac12 I(\Phi),\qquad
\ell=gL_0-\beta^2-\frac32gI(\Phi).
$$

These are exact mathematical identities of the reduced equation; $I$ is not assigned physical energy. On the already admitted strip $0<\Phi\le Q=1/64$, $(3/2)\Phi<f(\Phi)<6\Phi$, so

$$
\frac34\Phi^2<I(\Phi)<3\Phi^2,
\qquad
\beta^2+\frac32g\Phi^2<v^2<\beta^2+6g\Phi^2.
$$

In all six cells the upper speed bound is below one. More explicitly, for $\beta=1/4$ it is at most $\sqrt{79/1024}<7/25$; for $\beta=3/4$ it is at most $\sqrt{591/1024}<19/25$. These bounds are attained conservatively by using the largest selected coupling $g=10$ in the inequality. They suffice for a first-exit construction through the phase event $\Phi(\tau_Q)=Q$: acceleration is positive, the speed increases from its positive initial value, and no boundary or speed singularity occurs before the event. The event times satisfy

$$
\frac{Q}{\sqrt{\beta^2+6gQ^2}}<\tau_Q<\frac Q\beta.
$$

Uniform rational versions are $25/448<\tau_Q<1/16$ for initial speed $1/4$, and $25/1216<\tau_Q<1/48$ for initial speed $3/4$. The physical event time is $T_Q=R\tau_Q=(K/g)\tau_Q$. The exact square-speed increment at the event lies between $3g/8192$ and $3g/2048$. Every member has the same strictly increasing speed by the unchanged complete-history discrete symmetry.

### Support signs in all six cells

The support identity shows that $\ell$ decreases strictly with phase for every selected positive $g$, despite the radial interaction becoming more inward. On the full event interval,

$$
gL_0-\beta^2-\frac{9g}{8192}<\ell\le gL_0-\beta^2,
$$

with equality on the upper side only at release. Since $2/3<L_0<3/4$, the signs are certified without numerical evaluation:

| $g$ | $\beta$ | Required normal support throughout the event interval | Exact sufficient comparison |
| --- | --- | --- | --- |
| $1/10$ | $1/4$ | outward | $\ell>1/240-9/81920>0$ |
| $1/10$ | $3/4$ | inward | $\ell<3/40-9/16=-39/80<0$ |
| $1$ | $1/4$ | outward | $\ell>2/3-1/16-9/8192>0$ |
| $1$ | $3/4$ | outward | $\ell>2/3-9/16-9/8192>0$ |
| $10$ | $1/4$ | outward | $\ell>20/3-1/16-90/8192>0$ |
| $10$ | $3/4$ | outward | $\ell>20/3-9/16-90/8192>0$ |

Physical support is $\lambda=\ell/R=(g/K)\ell$, so the sign is unchanged. None of these cells is an unsupported motion, and none crosses zero normal support within the certified interval. A normal-only constraint permits either sign; an additional one-sided support restriction would be a separate assumption not selected here.

### Complete root history and frequency interpretation

On the entire constructed interval, the receiver is within distance $RQ$ of its original site and each stationary partner distance is at least $63R/64$. Since every dimensionless event time is below $1/16$, each explicit emission predates $-R/4$ by at least $43R/64$. The complete prepared and evolved histories have speed at most $19/25<1$. Global delay monotonicity therefore proves exactly one partner root per source, while the chord/path-length inequality excludes all positive-delay self roots. Every transmitter factor is exactly one because all admitted emissions are stationary. There are five roots per receiver and thirty directed roots total, with receiver factors at least $6/25$ if recorded. This closes the reduced motion as an actual canonical constrained solution for every selected cell; the root argument uses the complete histories rather than an imposed finite truncation.

With $c=f'(0)=29/8-5/(6\sqrt3)$, local release behavior is

$$
s(\tau)=\beta+\frac12g\beta c\,\tau^2+O(\tau^4),
\qquad
\frac{ds}{dT}(0)=0,\qquad
\frac{d^2s}{dT^2}(0)=\frac{K\beta c}{R^3}>0.
$$

The instantaneous angular frequency is $\Omega(T)=s(T)/R=(g/K)s(T)$, initially $\beta g/K$. Cycles per unit time are $\Omega/(2\pi)$. Both increase on the certified interval; there is no single constant rotation frequency or full-period orbit established by this finite release. No energy-frequency or energy-radius interpretation follows from the numerical radius labels.

> Grade and falsifiers: derived finite-time six-cell motion, scaling, speed drift, support signs and complete roots. The new exact identity $N'=-f/2$, the admitted strip estimates, and the global sub-wake history bound are operator-checkable falsifiers of the corresponding claims. No numerical evolution, diagnostic instrument or target sweep was used. This reference is frozen before the dynamics companion; comparison and any stronger subject bounds remain pending.

## Six-cell prepared-hexagon companion adjudication

The frozen subject is compared with the independently saved six-cell reference above. Its exact static field, scaled equation $\Phi''=gf$, support identity $\ell=gC_0-\beta^2-(3/2)gI$, support signs and rate conventions agree. The subject uses a separate, more conservative derivative bound, whose constants and event-endpoint inequalities are checked here analytically. The sharper bounds already retained in the reference are not needed to rescue any subject claim.

### Conservative derivative bounds and reached event

For $H(r)=r/|r|^3$, differentiating its Jacobian in directions $v,w$ gives three terms bounded by $3|v||w|/|r|^4$ each and a fourth bounded by $15|v||w|/|r|^4$. Thus the bilinear norm is at most $24/|r|^4$, a valid conservative bound distinct from the sharper same-direction estimate used in the earlier release review. At source distances at least $63/64$, five terms give $|A|<6$, $\|DA\|<11$ and $\|D^2A\|<128$. In particular the last inequality is the exact integer comparison $120\cdot64^4<128\cdot63^4$.

The angle derivatives satisfy $|f'|<|A|+\|DA\|<17$ and $|f''|<|A|+3\|DA\|+\|D^2A\|<167$. Since $f'(0)>3$, the lower derivative bound is $3-167/64=25/64>0$. Integrating from $f(0)=0$ proves the subject's $(25/64)\Phi<f(\Phi)<17\Phi$ for positive phase through $Q=1/64$.

The scalar first integral therefore gives $\beta^2+(25g/64)\Phi^2<u^2<\beta^2+17g\Phi^2$. Its largest upper value over the six cells is $1237/2048<16/25$. Positive speed, this uniform bound and smoothness of the old-source field prove that the angle event is reached, with the strict time bounds printed by the subject. This proof does not assume a common fixed terminal time for different cells. At the event, substituting $Q^2=1/4096$ produces exactly the lower increment $25g/262144$ and upper increment $17g/4096$ in $u_*^2$. No endpoint factor of two is missing.

The complete preparation has derivative range $[-\beta/4,\beta]$. Joined to the scalar motion, its physical speed remains below $4/5$ everywhere needed by the roots. The receiver-to-old-site distance is at least $63R/64$, and $\tau_*<1/16$ ensures emission margin at least $43R/64$ before the stationary cut. Global delay monotonicity and the self path-length bound then close exactly five partner roots and no positive-delay self roots per receiver on the full closed event interval. The stated lower slope $1/5$ is conservative and valid; stationary emissions have transmitter factor one. Cyclic data symmetry preserves the regular shape and equal speeds without prescribing their rate.

### Support signs, rates and endpoint loss

The independently derived identity $N'=-f/2$ verifies the subject's elimination of speed from the radial multiplier. Integrating its conservative tangent bounds yields

$$
\frac{25}{128}\Phi^2<I(\Phi)<\frac{17}{2}\Phi^2.
$$

Multiplication by $3g/2$ and evaluation at $Q$ give the exact endpoint support loss interval $(75g/1048576,51g/16384)$. Throughout the event interval, the support is at most its release value, with equality only at release, and is strictly above that value minus $51g/16384$. The weakest outward cell satisfies $\ell>1/240-51/163840>0$; the other positive-cell inequalities follow as printed. The inward cell satisfies $\ell<-99/200<0$, using $C_0<27/40$. All six table signs, initial rates and radius ratios are correct. The sharper earlier reviewer inequalities are compatible with these deliberately wider bounds.

Units are consistent: $u=d\Phi/d\tau$ is physical speed because $c_f=1$, while angular rate is $u/R=(g/K)u$. Dividing that rate by $2\pi$ defines instantaneous cycles per time. The positive drift makes these rates variable; the table's $g\beta$ is $K\omega(0)$, not a claimed frequency or energy level. Physical support is $\ell/R$ and retains the sign of $\ell$. Neither the scalar first integral nor the radius labels establish a physical energy relation.

### Zero-support release radius is only an instantaneous balance

A direct independent consequence of the exact support identity is worth retaining within this same local domain. For a chosen positive initial speed, release support vanishes precisely when

$$
R_0=\frac{K C_0}{\beta^2},\qquad g_0=\frac{\beta^2}{C_0}.
$$

For the two selected initial speeds, $0<g_0<1$ because $C_0>2/3$ implies $g_0<3/32$ at $\beta=1/4$ and $g_0<27/32$ at $\beta=3/4$. The existing field, speed and emission bounds apply at these parameter values as well: their proofs use only $0<g\le10$ and either selected initial speed. Thus the local constrained construction is admitted through the same phase $Q$, without a new numerical experiment.

At that release-balance radius, the exact identity reduces to

$$
\ell(\Phi)=-\frac32g_0 I(\Phi)<0\qquad(0<\Phi\le Q).
$$

Consequently zero support at the initial instant does not create a positive-time unsupported interval for this spherical trajectory. Maintaining the constrained spherical motion immediately requires inward support. This is a local necessary-support statement for the specified prepared solution; it does not determine an unconstrained path that leaves the sphere or any later fate. It introduces no new law or physical provider of support.

### Final verdict

**Accepted at derived grade:** all six phase-defined motions, the conservative $25/64$ and $17\Phi$ field bounds, bilinear Hessian bound, reached-event timing and speed intervals, complete roots, support-loss bounds, table signs, units and instantaneous rate interpretation. No subject correction is required. The zero-support radius consequence above is independently derived within the admitted local domain and may accompany the synthesis with that scope.

Falsifiers are a failed kernel derivative bound, an endpoint arithmetic error, a lost complete-history speed/emission margin, or a violation of $N'=-f/2$. These are addressed by the independent calculations here and in the earlier frozen reference. No numerical evolution, new instrument, scan, subject edit or change to the reference was used. This bounded adjudication is complete; receiving synthesis remains coordinator-owned.

Measured by `shasum -a 256`, the reviewed six-cell subject has identity `bef27cca3446e1af42394542b0801df673b956b84bbd0537bdeeb9547fe6aab7`, matching the supplied frozen identity. The completed appendix emitted no whitespace diagnostics under `git diff --no-index --check /dev/null` (exit 1 denotes the file addition). These are preservation/document checks; the analytical reference and reconstruction carry the scientific verdict.

## Independent one-member positional-phase release reference

This reference is saved before reading the pending symmetry positional-phase companion. Set $R=K_{\mathrm{int}}=c_f=1$, $\beta=1/4$, and retain the regular alternating hexagon's old stationary sites. Only member zero has preparation phase $p(T)+\delta H(1+4T)$ on $[-1/4,0]$, where $p(T)=T(1+4T)^3/4$, $H(u)=10u^3-15u^4+6u^5$, and $0<|\delta|\le1/1000$. The offset is zero earlier. Since $H(0)=0$, $H(1)=1$, $H'$ and $H''$ vanish at both endpoints, the old stationary sites and initial velocities are unchanged, while member zero's release phase is $\delta$. All six initial speeds remain exactly $1/4$ in their respective tangent directions.

### Correct static equations and a common event

For member $i$, the old-source sum contains exactly the five sites $j\ne i$. Its own stationary old site is not an additional source: it belongs to its self history, whose positive-delay roots must be considered by the self-root rule and are excluded below by sub-wake geometry. Rotating each member's old-site set into its own release frame gives the same static scalar function $f$ retained above. Therefore, after constructing and verifying the stationary-emission domain, the scalar equations are

$$
\phi_i''=f(\phi_i),\qquad
\phi_i(0)=0,\quad\phi_i'(0)=\frac14\quad(i\ne0),
\qquad
\psi''=f(\psi),\quad\psi(0)=\delta,\quad\psi'(0)=\frac14.
$$

The five unchanged members all have the base phase $\phi$. They remain unaffected by the recent offset during this interval because every arriving emission is from the unchanged stationary past. This conclusion does not invoke an invalid sixfold symmetry of the perturbed recent data. Equatorial reflection still preserves the plane, and uniqueness of the old-source scalar equations supplies the five identical base motions.

Define the common comparison endpoint $T_B$ by the base event $\phi(T_B)=1/128$. The previously admitted base solution gives

$$
\frac{25}{832}<T_B<\frac1{32},\qquad
\frac14\le\phi'(T)<\frac{13}{50}\quad(0\le T\le T_B).
$$

The static field is odd, so its derivative is even. The already derived $3/2<f'<6$ therefore holds on the symmetric phase strip $|\Phi|\le1/64$.

### Signed phase and speed separation for both offset signs

Let $z=\psi-\phi$. The mean-value integral gives the exact equation $z''=a(T)z$, where

$$
a(T)=\int_0^1f'(\phi(T)+r z(T))\,dr\in(3/2,6)
$$

as long as both phases stay in that strip. Initial data are $z(0)=\delta$, $z'(0)=0$. Positivity of the scalar integral equation implies that $z$ keeps the sign of $\delta$, and $z'$ has that sign at every positive time. Comparison with constant positive coefficients gives

$$
|\delta|\cosh(\sqrt{3/2}\,T)<|z(T)|<|\delta|\cosh(\sqrt6\,T),
$$

$$
|\delta|\sqrt{3/2}\sinh(\sqrt{3/2}\,T)<|z'(T)|<|\delta|\sqrt6\sinh(\sqrt6\,T)
$$

for $T>0$. These follow either by positive Volterra iteration or by comparing the inhomogeneous equations for the difference of the two fundamental solutions; no linearization about an equilibrium is used.

For $T\le1/32$, the elementary series bound $\cosh(\sqrt6T)\le1/(1-3T^2)\le1024/1021<101/100$ implies

$$
\frac32|\delta|T<|z'(T)|<7|\delta|T,
\qquad
|\delta|\left(1+\frac34T^2\right)<|z(T)|<|\delta|\left(1+\frac72T^2\right).
$$

All strict bounds apply for $0<T\le T_B$; initially $z=\delta$ and $z'=0$. The signs of both differences are the sign of $\delta$. The initial difference of signed accelerations is $f(\delta)$, also of that sign, with $(3/2)|\delta|<|f(\delta)|<6|\delta|$. Thus positive and negative positional offsets produce speed splitting from exactly equal initial speeds in opposite directions.

The same estimates close their assumed phase strip. Indeed $|z|<101/100000$ and $0\le\phi\le1/128$, so $|\psi|<1/128+101/100000<1/64$. A first-exit argument and smooth continuation therefore validate all comparisons through the common base event. Also $\psi'>1/4-7/(32000)>0$ and $\psi'<13/50+7/(32000)<27/100$. Because both angular velocities remain positive, $z'$ is also the difference of physical speed norms; no absolute-value cusp obscures its sign.

### Preparation, collision margins, complete roots and support

The smooth-step derivative is $H'(u)=30u^2(1-u)^2\in[0,15/8]$. The changed member's prepared speed is therefore bounded by $1/4+(15/2)|\delta|\le103/400<27/100$. The other preparations have speed at most $1/4$. Thus all complete prepared and evolved histories have speed below $27/100$ through $T_B$.

During preparation the changed member's phase offset has magnitude at most $|\delta|$, since $0\le H\le1$. During the release it differs from the base member by less than $101/100000$. Moving one point by that phase distance changes any chord by at most the same amount, so all simultaneous partner separations exceed $1-101/100000>99/100$. Unchanged pairs retain their exact regular-hexagon chords. This certifies collision avoidance for the complete specified history and interval without restoring a broken rotational symmetry.

Every receiver's phase relative to its own old site has magnitude below $1/64$, so every old partner distance is at least $63/64$. The explicit stationary-source root has emission $S=T-d$ before $-1/4$ with margin at least $63/64-1/32-1/4=45/64$. Global delay monotonicity has lower Lipschitz slope at least $73/100$, proving uniqueness of all five partner roots per receiver. The path-length bound excludes every positive-delay self root, including hits to the changed member's own old site. All admitted transmitter factors equal one, and receiver factors are at least $73/100$ if recorded. This closes the scalar construction as a complete canonical constrained solution with thirty directed partner roots.

The radial static projection is even and retains $3/5<-N<1$ on the symmetric phase strip. Thus every member's support satisfies

$$
\lambda=-s^2-N>\frac35-\left(\frac{27}{100}\right)^2
=\frac{5271}{10000}>\frac12,
\qquad \lambda<1.
$$

Pure outward normal support therefore remains sufficient; no tangent controller is added. The displaced member is faster for positive $\delta$ and slower for negative $\delta$, while the other five retain the base speed.

> Grade and falsifiers: derived finite-time two-sided phase/speed separation from equal initial speeds, complete roots, collision margin and support. A wrong omitted-self convention, failed derivative-strip comparison, loss of the bootstrap or violation of the complete-history speed/emission margins would falsify the corresponding result. This is local response to an explicitly unequal initial position, not asymptotic stability, chaos, recurrence or energy evidence. No instrument or numerical evolution was used. The independent reference is frozen before the symmetry subject; its bounded adjudication remains pending.

## Positional-phase companion adjudication and remaining selected scope

The frozen symmetry phase companion is compared against the independent one-member positional-phase reference above. Its label-specific self omission, static scalar field, complete quintic preparation and signed comparison equation agree. The subject tightens several constants without changing the event or mathematical mechanism. The following independent arithmetic and domain checks establish those improvements.

### Tighter speed, support and endpoint bounds

The difference equation has $3/2<a(T)<6$, positive initial signed gap $|\delta|$ and zero initial gap derivative. The already independently proved Volterra comparison gives $w'(T)<6|\delta|T\cosh(\sqrt6T)$. Since $\cosh(\sqrt6T)<101/100$ for $T\le1/32$, its upper coefficient is exactly $303/50$. The subject's lower coefficient $3/2$ follows by integrating $a(T)w(T)>(3/2)|\delta|$. Hence its boxed signed speed-difference inequality is correct on $0<T\le T_E$ for either permitted sign of $\delta$.

The base phase stays at most $1/128$, so its acceleration is below $6/128=3/64$. Integrating through time at most $1/32$ gives $\Phi'\le1/4+3/2048$. Meanwhile the maximum magnitude of the changed velocity relative to the base is less than $(303/50)(1/1000)(1/32)=303/1600000$. Therefore both of the subject's positive lower and $13/50$ upper bounds on $\Psi'$ are valid. This improves the review reference's conservative $27/100$ ceiling. Both angular velocities are strictly positive, so the signed velocity difference equals the signed difference of speed norms even for negative offsets. The negative-offset member initially decelerates, but does not stop in this interval.

At the common event, multiplying $25/832<T_E<1/32$ by the difference bounds gives exactly $(75/1664)|\delta|<|\Psi'-\Phi'|<(303/1600)|\delta|$. The subject correctly restricts these strict speed inequalities to positive times. At zero, both speeds equal $1/4$, the speed difference is zero and the phase difference is $\delta$. Nonzero $\delta$ is explicit in the preparation definition. Its phase-gap inequality uses a non-strict lower bound, so it is valid also at release. The stated initial derivative $f(\delta)=c\delta+O(\delta^2)$ is valid; odd analyticity would permit a sharper remainder but is not required.

The support difference follows from $\lambda=-s^2-N$ and $|N'|<3$ on the whole segment between the two phases. Using the subject's own constants gives the explicit sufficient bound

$$
|\lambda_0-\lambda_k|
<\left[\frac{13}{25}\frac{303}{1600}+3\frac{101}{100}\right]|\delta|
=\frac{125139}{40000}|\delta|<4|\delta|.
$$

No sign of this support difference is inferred. The common individual support bounds $1/2<\lambda_i<1$ follow from the improved speed ceiling and the accepted symmetric radial strip; they hold also at the release instant.

### Complete history and final mathematical disposition

The quintic derivative bound gives prepared speed at most $103/400<13/50$. The strict phase bootstrap keeps every receiver phase below $1/64$ in magnitude through the common base event. Consequently all old partner distances exceed $63/64$, and all explicit emissions predate the stationary cut with strict margin greater than $45/64$. The complete-history speed bound below $13/50$ gives unique partner roots and excludes every positive-delay self root. The receiver factor exceeds $37/50$ and does not weight the canonical acceleration. The collision bound exceeds $99/100$ for both the preparation and actual released interval. These verify the stronger strict inequalities asserted by the subject; no endpoint equality is inadvertently excluded.

The five unchanged members share the baseline scalar solution because their arriving histories remain stationary, not because the displaced six-member history retains transitive rotational symmetry. The displaced member's own old site is omitted only from its own partner sum. For every other receiver that old site remains a valid opposite- or like-polarity partner according to its label. The root argument correctly treats and excludes self histories, rather than adding a diagonal static source or deleting a positive-delay self contribution by convention.

**Accepted at derived grade:** actual two-sided finite-time phase and speed separation from equal initial speeds, the tighter $303/50$ coefficient, positive speeds below $13/50$, the common reached event, complete history/root margins, collision separation, outward support and $4|\delta|$ support-difference bound. No subject correction is required. Falsifiers remain the old-source labeling, the derivative-strip comparison, bootstrap closure and complete-history bounds, all independently reconstructed here and in the frozen reference. This does not establish asymptotic stability, chaos, recurrence, energy or independence of receivers beyond the admitted old-source interval. No new instrument, numerical evolution, subject edit or modification of the earlier reference was used.

### Coverage disposition after this selected gap

Direct reading of the [selected-stage coverage audit](spherical-three-three-symmetry-coverage-audit.md) identifies two immediate scientific dependencies: the six-cell actual-release adjudication and the actual positional-phase sensitivity proof/review. The first is already accepted in the preceding review section; the second is completed by this adjudication. Thus that audit identifies no further ready, bounded scientific derivation within the selected scope after coordinator integration of this verdict. This is a statement about that audit's declared dependencies, not a new whole-repository absence claim or campaign-completion decision.

The audit's unresolved scientific boundaries remain: full delayed-state recurrence and sustained surface occupation lack an admitted long-time continuation; the reported constrained EOM capability gap prevents using the existing scoped route as a long surface-evolution instrument; physical energy/branch selection lacks its governing functional and relation; physical confinement lacks a provider of the imposed signed normal acceleration; singular-chart passage lacks a selected event rule. This review inherits the audit's scoped capability finding and does not claim a new solver search. Repeating local extensions, denser scans or approaching an already classified fold would not resolve those specific obligations.

Evidence preservation, final reconciliation and receiving synthesis may still require coordinator-owned work. The campaign remains under its original deadlines and coordinator control; this reviewer neither declares it complete nor starts an unselected scientific task. The bounded phase adjudication is complete and no reviewer job remains active.

Measured by `shasum -a 256`, the reviewed positional-phase subject has identity `561ec2c3c1484075d0c58fb0b252e408bf71fd6db4588a6a618886e67d24a5ad`, matching the frozen identity. The completed appendix emitted no whitespace diagnostics under `git diff --no-index --check /dev/null` (exit 1 denotes the file addition). These checks concern document identity and hygiene; the analytical reference carries the scientific verdict.
