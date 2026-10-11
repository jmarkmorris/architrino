# Spherical curvature investigation: independent review reference (frozen before subject exposure)

Legend: ✓ Done, ◐ Partial, ○ Not done. Role: review (Specialist lens `ramon-e-moore`, launch name "spherical-curvature review"). Owner of this file: the review role only. This is the independent mathematical reference that the review role freezes before reading any subject produced by the symmetry or coverage roles or any Codex-authored scaling reference. Every statement below was derived by the review role from the [canonical Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), the [surface-constraint definition](../../equation-variants/surface-constraint/definition.md), the [frozen plan](spherical-curvature-configuration-space-plan.md) and the common brief, without reading any subject. Shared identities named in the brief as reusable (tangent work, sub-wake root completeness, dilation obstruction, preparation history) are re-derived here, not copied.

Correction 1 read at 2026-10-11 00:03 UTC.

Checkpoint record: ✓ items 1–3 saved 00:05 UTC (sha256 40020bc5…); ✓ items 4–6 with instrument controls and targets saved 00:09 UTC (sha256 93db02f6…); ✓ frozen by the final line of this file. After the freeze line the review role edits nothing in this file; corrections, if ever needed, go in a separate adjudication file that cites this one.

## 0. Conventions used throughout

Six architrinos, three positrinos ($q=+\epsilon$) and three electrinos ($q=-\epsilon$), move on the sphere $|\mathbf X|=R$ centered at the origin in Euclidean space with absolute time $T$. The wake speed is $c_f$; every numerical instance sets $c_f=1$. For every ordered pair $|q_iq_j|=\epsilon^2$, so the per-pair acceleration coefficient $K=\kappa\epsilon^2$ is the same for all pairs; every numerical instance of the fixed-coupling comparison sets $K=1$. The polarity sign is $\sigma_{ij}=+1$ for like polarities (repel) and $-1$ for unlike (attract). Dimensions: $\kappa$ has dimension $\mathrm L^3\mathrm T^{-2}\mathrm Q^{-2}$ per the canonical parameter table, so $K$ has dimension $\mathrm L^3\mathrm T^{-2}$ and $K/r^2$ is an acceleration. Architrinos have no mass; the law gives acceleration directly and no force language is used. "Delay" means the causal delay $\tau=T_r-T_t>0$ between emission and reception. The unit normal is $\mathbf n_i=\mathbf X_i/R$ and the tangent projector is $P_i=I-\mathbf n_i\mathbf n_i^{\mathsf T}$; $P_i$ is symmetric, $P_i^2=P_i$, $P_i\mathbf n_i=0$, and $P_i\mathbf w=\mathbf w$ for every tangent vector $\mathbf w$ ($\mathbf w\cdot\mathbf n_i=0$).

## 1. The selected law and its sphere derivation

### 1.1 Canonical per-hit and total acceleration

For receiver $i$ at reception time $T_r$ and transmitter $j$ at an admitted emission time $T_t<T_r$, the canonical per-hit acceleration is

$$
\mathbf A_{ij}(T_r;T_t)=\kappa\,\sigma_{ij}\,\frac{|q_iq_j|}{r_{ij}^2}\,\frac{c_f}{|D_{t,ij}|}\,\hat{\mathbf r}_{ij},\qquad \mathbf r_{ij}=\mathbf X_i(T_r)-\mathbf X_j(T_t),\quad D_{t,ij}=c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf r}_{ij},
$$

with $\hat{\mathbf r}_{ij}$ the unit vector from the emission point to the receiver. The admitted emission times are the positive-delay solutions of the causal constraint $|\mathbf X_i(T_r)-\mathbf X_j(T_t)|=c_f(T_r-T_t)$, for every transmitter $j$ including $j=i$ wherever such a self root exists. The total canonical acceleration $\mathbf A_i(T_r)$ is the vector sum over every transmitter and every admitted root. Three facts from this form are load-bearing below: the kernel is radial along $\hat{\mathbf r}_{ij}$; the only velocity entering a fixed hit is the transmitter's velocity at the emission time, through $D_{t,ij}$; and the receiver's own velocity does not enter the multiplier. In particular, for a transmitter at rest at its emission time, $D_{t,ij}=c_f$ and the transmitter-side weight is exactly $1$.

### 1.2 Kinematics forced by the sphere

Let $\mathbf X_i(T)$ be any twice-differentiable path on the sphere, $\mathbf v_i=\mathbf X_i'$. Differentiating $\mathbf X_i\cdot\mathbf X_i=R^2$ once gives $\mathbf X_i\cdot\mathbf v_i=0$, that is $\mathbf n_i\cdot\mathbf v_i=0$: the velocity is tangent. Differentiating again gives $|\mathbf v_i|^2+\mathbf X_i\cdot\mathbf X_i''=0$, that is

$$
\mathbf n_i\cdot\mathbf X_i''=-\frac{|\mathbf v_i|^2}{R}.
$$

So the normal component of the acceleration of any path that stays on the sphere is fixed by the speed alone; nothing in the interaction can change it. Only the tangent component $P_i\mathbf X_i''$ is free to be selected by a law.

### 1.3 The selected law

The operator-selected law takes the tangent component of the complete canonical acceleration and nothing else:

$$
P_i\mathbf X_i''=P_i\mathbf A_i,\qquad\text{hence}\qquad \mathbf X_i''=P_i\mathbf A_i-\frac{|\mathbf v_i|^2}{R}\,\mathbf n_i .
$$

Here $\mathbf A_i$ is evaluated on the actual histories with ambient Euclidean wake distance, all roots included. The canonical radial interaction component $(\mathbf n_i\cdot\mathbf A_i)\mathbf n_i$ is discarded: it appears nowhere in the motion. The term $-(|\mathbf v_i|^2/R)\mathbf n_i$ is the quantity forced in 1.2; it contains no $K$, no polarity, no history and no root, and it is the same for every curve on the sphere with that speed. It is therefore geometric bookkeeping for writing a tangent path in Cartesian coordinates, not retained radial interaction and not a physical confinement mechanism. Nothing else is selected: no speed normalization, damping, cap, smoothing, polarity change, root omission, event law, contact law or controller.

Claim grade: derived. Given that the path stays on the sphere and that the tangent acceleration equals $P_i\mathbf A_i$, the displayed equation is the unique Cartesian form. Falsifier: a twice-differentiable path on the sphere whose acceleration has normal component different from $-|\mathbf v|^2/R$, or a subject equation of motion whose tangent part differs from $P_i\mathbf A_i$ while claiming the selected law.

### 1.4 Why projecting the acceleration alone leaves the sphere

Suppose instead $\mathbf X_i''=P_i\mathbf A_i$ with no normal term. Then $\mathbf n_i\cdot\mathbf X_i''=0$, and the second derivative of $\tfrac12|\mathbf X_i|^2$ is $|\mathbf v_i|^2+\mathbf X_i\cdot\mathbf X_i''=|\mathbf v_i|^2>0$ whenever the member is moving. Starting on the sphere with tangent velocity $\mathbf v_0$, $|\mathbf X_i(T)|^2=R^2+|\mathbf v_0|^2T^2+O(T^3)$: the path leaves the sphere outward at second order in time, at a rate set by the speed, independent of the interaction. The error is not small: at $R=1$, $|\mathbf v_0|=1$, after $T=1$ the radius has grown by about $41\%$ ($\sqrt2-1$) before any interaction effect. A subject that implements the projected acceleration alone, or that repairs the drift by renormalizing positions or tangential speed, is not solving the selected law.

Claim grade: derived. Falsifier: exhibit a moving solution of $\mathbf X''=P\mathbf A$ that stays on the sphere; by the computation above this requires $|\mathbf v|=0$.

### 1.5 Tangent-work identity

Dot the selected law with $\mathbf v_i$. Because $\mathbf v_i\cdot\mathbf n_i=0$ the normal term drops, and because $P_i$ is symmetric with $P_i\mathbf v_i=\mathbf v_i$, $\mathbf v_i\cdot P_i\mathbf A_i=(P_i\mathbf v_i)\cdot\mathbf A_i=\mathbf v_i\cdot\mathbf A_i$. Hence

$$
\frac{d}{dT}\,\frac{|\mathbf v_i|^2}{2}=\mathbf v_i\cdot\mathbf A_i=\mathbf v_i\cdot P_i\mathbf A_i .
$$

Speed changes exactly by the tangent work; the curvature term does no work; the discarded radial part does no work because it is normal. Speed is constant on an interval exactly when the tangent acceleration is orthogonal to the velocity throughout that interval. Equal initial speeds therefore stay equal only if the tangent work is equal member by member, which must be shown, not assumed.

Claim grade: derived. Falsifier: a lawful history on which $|\mathbf v_i|^2/2$ and $\int\mathbf v_i\cdot\mathbf A_i\,dT$ differ.

### 1.6 Relation to the normal-only constraint law (adjudication note)

The [surface-constraint definition](../../equation-variants/surface-constraint/definition.md) writes $\mathbf X_i''=\mathbf A_i+\mathbf C_i$ with normal-only support $\mathbf C_i=-(\mathbf n_i\cdot\mathbf A_i+|\mathbf v_i|^2/R)\mathbf n_i$. Expanding, $\mathbf A_i-(\mathbf n_i\cdot\mathbf A_i)\mathbf n_i-(|\mathbf v_i|^2/R)\mathbf n_i=P_i\mathbf A_i-(|\mathbf v_i|^2/R)\mathbf n_i$, which is the selected law of 1.3 term by term. On an ordinary differentiable chart, with the same $\mathbf A_i$, the same histories and no additional selected clause, the two laws prescribe identical motion; they differ only in what is called "support" (the constraint law records the radial interaction as cancelled, the selected law records it as discarded). This matters for adjudication in one direction only: a subject that attributes a difference in motion to "discarding versus supporting" the radial interaction, holding everything else fixed, has made an error. The review role has not read the prior spherical-three-three campaigns and makes no claim about which further clauses (speed responses, event rules) they selected; transfer of any prior numerical result requires checking those clauses separately.

Claim grade: derived (algebraic identity of the two displayed equations). Falsifier: a term in either displayed equation not accounted for by the expansion above.

## 2. Nondimensionalization, the dimensionless coupling, and the fixed-$K$ dilation obstruction

### 2.1 Scaling

Measure lengths in units of $R$ and times in units of the wake-crossing time $R/c_f$: $\mathbf x=\mathbf X/R$, $s=c_fT/R$. Then $\mathbf u=d\mathbf x/ds=\mathbf v/c_f$ is the speed in wake units and $d^2\mathbf X/dT^2=(c_f^2/R)\,d^2\mathbf x/ds^2$. The causal constraint becomes $|\mathbf x_i(s)-\mathbf x_j(s')|=s-s'$, with no parameter. The transmitter factor becomes $D_t/c_f=1-\mathbf u_j\cdot\hat{\mathbf r}$, with no parameter. A per-hit acceleration becomes $(K/R^2)\,\sigma\,\rho^{-2}\,|1-\mathbf u_j\cdot\hat{\mathbf r}|^{-1}\hat{\mathbf r}$ with $\rho=r/R$. Dividing the selected law by $c_f^2/R$:

$$
\frac{d^2\mathbf x_i}{ds^2}=g\,P_i\sum_{j,\text{roots}}\frac{\sigma_{ij}}{\rho_{ij}^2}\frac{\hat{\mathbf r}_{ij}}{|1-\mathbf u_j\cdot\hat{\mathbf r}_{ij}|}-|\mathbf u_i|^2\mathbf n_i,\qquad g=\frac{K}{Rc_f^2}.
$$

Dimension check: $K$ is $\mathrm L^3\mathrm T^{-2}$ and $Rc_f^2$ is $\mathrm L\cdot\mathrm L^2\mathrm T^{-2}$, so $g$ is dimensionless. The complete dimensionless problem is specified by $g$, the dimensionless history (positions in units of $R$, times in units of $R/c_f$, hence speeds in units of $c_f$), and the polarity assignment. With $K=1$, $c_f=1$ the coupling is $g=1/R=\mathcal C$: in normalized units the dimensionless coupling is numerically the sphere's normal curvature. The fixed-$K$ radius sweep $R\in\{1/4,1/2,1,2,4,10\}$ is therefore the coupling sweep $g\in\{4,2,1,1/2,1/4,1/10\}$ on the unit sphere with the same dimensionless histories, and a cell is comparable across radii only if its history is supplied in these units (same $u_0=v_0/c_f$, same preparation in $s$).

Claim grade: derived. Falsifier: a second dimensionless combination of $K,R,c_f$ surviving the scaling, or a numerical cell at $(R,K=1)$ and one at $(1,K=1/R)$ with identical dimensionless histories whose dimensionless accelerations differ.

### 2.2 Fixed-$K$ dilation obstruction

Let $\{\mathbf X_i(T)\}$ be an exact solution on the sphere of radius $R$ with coupling $K$ and wake speed $c_f$, and let $\lambda>0$, $\lambda\ne1$. Any dilation that keeps roots in correspondence must scale time with length: for $\mathbf Y_i(T)=\lambda\mathbf X_i(T/\mu)$, the constraint $|\mathbf Y_i(T)-\mathbf Y_j(T')|=c_f(T-T')$ reads $\lambda|\mathbf X_i(\tau)-\mathbf X_j(\tau')|=c_f\mu(\tau-\tau')$, which is the original constraint only when $\mu=\lambda$ (otherwise the effective wake speed is $c_f\mu/\lambda\ne c_f$, which is barred). Take $\mu=\lambda$. Then speeds are preserved, $\hat{\mathbf r}$ and $D_t$ are preserved at corresponding roots, distances scale by $\lambda$, so $\mathbf A^{Y}_i=\lambda^{-2}\mathbf A^{X}_i$ at corresponding times, while $\mathbf Y_i''=\lambda^{-1}\mathbf X_i''$ and the sphere radius is $\lambda R$. The law for $\mathbf Y$ requires $\lambda^{-1}\mathbf X_i''=\lambda^{-2}P_i\mathbf A_i^X-|\mathbf v_i|^2/(\lambda R)\,\mathbf n_i$; substituting the law for $\mathbf X$ on the left gives $(\lambda^{-1}-\lambda^{-2})P_i\mathbf A_i^X=0$, that is

$$
P_i\mathbf A_i^X(T)=0\quad\text{for every }i\text{ and every }T .
$$

So at fixed $K$ and $c_f$ a nontrivial dilation of an exact solution is again an exact solution only when the tangent interaction vanishes identically along the whole solution (free great-circle motion with constant speed, or rest). Conversely, dilating with $K\to\lambda K$ restores the law exactly: this is the mathematical-similarity family $g=K/(Rc_f^2)$ constant, which must be labeled as such and kept separate from the fixed-$K$ comparison. Comparable motion across radii at fixed $K$ is therefore never a consequence of scaling; it must be established cell by cell, and the expected generic outcome is that it fails.

Claim grade: derived. Falsifier: two exact solutions at the same $K$ and $c_f$ on spheres of different radii, related by $\mathbf Y(T)=\lambda\mathbf X(T/\lambda)$, with $P\mathbf A\ne0$ somewhere.

## 3. Root theory on a sphere

### 3.1 Delay bounds

For $i$ and $j$ both on the sphere, $|\mathbf X_i(T_r)-\mathbf X_j(T_t)|\le2R$, so every admitted root has $c_f\tau\le2R$ with $\tau=T_r-T_t$; $\tau=0$ is excluded because the law is defined at positive separation. Hence every delay lies in $(0,2R/c_f]$, and the retained history needed to evaluate $\mathbf A_i(T_r)$ is exactly $[T_r-2R/c_f,T_r]$ for every transmitter. Equality $\tau=2R/c_f$ occurs only when the transmitter was exactly antipodal to the receiver's present position at the emission time.

Claim grade: derived. Falsifier: an admitted root with $c_f\tau>2R$ for two points of the same sphere.

### 3.2 Monotonicity certificate for sub-wake histories

Fix the receiver $i$, reception time $T$, transmitter $j$, and define on $[0,2R/c_f]$

$$
f_{ij}(\tau)=\tau-\frac{|\mathbf X_i(T)-\mathbf X_j(T-\tau)|}{c_f}.
$$

Admitted roots are the zeros of $f_{ij}$ in $(0,2R/c_f]$. The map $\tau\mapsto\mathbf X_j(T-\tau)$ has speed $|\mathbf V_j(T-\tau)|$, and the distance to a fixed point is $1$-Lipschitz in the moving point, so for $\tau_2>\tau_1$,

$$
f_{ij}(\tau_2)-f_{ij}(\tau_1)\ \ge\ (\tau_2-\tau_1)\Bigl(1-\frac{v_{\max}}{c_f}\Bigr),\qquad v_{\max}=\sup_{[T-2R/c_f,\,T]}|\mathbf V_j| .
$$

Where the distance is positive and the history differentiable this is the derivative statement $f_{ij}'(\tau)=1-\hat{\mathbf r}_{ij}\cdot\mathbf V_j(T-\tau)/c_f=D_{t,ij}/c_f\ge1-v_{\max}/c_f$; the Lipschitz form also covers points where the distance vanishes and $\hat{\mathbf r}$ is undefined. If $v_{\max}<c_f$ then $f_{ij}$ is strictly increasing. For a partner $j\ne i$ not coincident with $i$ at time $T$, $f_{ij}(0)=-|\mathbf X_i(T)-\mathbf X_j(T)|/c_f<0$ and $f_{ij}(2R/c_f)=(2R-|\mathbf X_i(T)-\mathbf X_j(T-2R/c_f)|)/c_f\ge0$, so by the intermediate value theorem and strict monotonicity there is exactly one root in $(0,2R/c_f]$. For the self case $j=i$, $f_{ii}(0)=0$ and strict increase give $f_{ii}(\tau)>0$ for all $\tau>0$: no positive-delay self root. Consequently, for a six-member history with all speeds below $c_f$ on the retained window, the complete root census at any reception time is exactly five partner roots and zero self roots, and the root at $\tau$ has $D_t\ge c_f-v_{\max}>0$, so the transmitter-side weight satisfies $1/(1+v_{\max}/c_f)\le c_f/|D_t|\le1/(1-v_{\max}/c_f)$. The certificate uses only the speed bound on the transmitter's retained window; the receiver's speed is irrelevant to it.

Claim grade: derived. Falsifier: a history with $v_{\max}<c_f$ on the retained window exhibiting two admitted roots for one ordered pair, a positive-delay self root, or a root with $D_t\le c_f-v_{\max}$.

### 3.3 What fails at and above wake speed

At $v_{\max}=c_f$ the bound degenerates to $f'\ge0$: $f_{ij}$ is nondecreasing but can be flat exactly where $D_t=0$, that is where the transmitter at the emission time moves at speed $c_f$ directly along $\hat{\mathbf r}$ toward the receiver's present position. At such a point the per-hit weight $c_f/|D_t|$ is unbounded (a fold of the root chart), and a flat segment of $f$ would be a root continuum rather than a simple root. Above $c_f$, $f'$ can be negative, roots can be multiple, and the self function $f_{ii}$ has $f_{ii}'(0^+)=1-|\mathbf V_i(T)|/c_f<0$, so it becomes negative near $\tau=0$ and, since $f_{ii}(2R/c_f)\ge0$, at least one positive-delay self root then exists. Two consequences bind every subject in this investigation. First, the selected law caps nothing, and the tangent work of 1.5 can raise a speed from $c_f$ to above $c_f$ immediately after release (section 4 exhibits patterns with strictly positive tangent work at release at the operator's reference speed $v=c_f$); a subject continuing such a cell must either prove the speed stays below $c_f$ on the interval it claims or perform the full accounting. Second, at exactly $v=c_f$ with constant speed, the chord is shorter than the arc, $|\mathbf X_i(T)-\mathbf X_i(T-\tau)|<c_f\tau$ for a curved path, so $f_{ii}>0$ and no self root exists; this is a derived statement about constant speed exactly $c_f$ on a curved path and says nothing once the speed exceeds $c_f$. An all-root accounting at or above wake speed must list, for each ordered pair and for each self pair, every sign change of $f$ on $(0,2R/c_f]$, every zero of $f'$ (fold candidate, $D_t=0$) with the sign of $f$ there, the boundary value at $\tau=2R/c_f$, and must report an unresolved box rather than a count wherever enclosures do not separate roots.

Claim grade: derived (the bounds), with the "at least one self root above $c_f$" statement derived by the intermediate value theorem. Falsifier: a history with $|\mathbf V_i(T)|>c_f$ and no positive-delay self root at $T$; or a point with $D_t=0$ at which the canonical weight is finite.

### 3.4 Interval-style certificate recipe

The recipe below is what the review role will apply, on request, to a specific cell (receiver, reception time, transmitter, retained history on $[T-2R/c_f,T]$). It is stated so that the PI can ask for it by name.

1. History enclosure. Represent the transmitter's retained history in one of two forms: (a) an exact formula (prescribed history, for example the preparation of 4.4) evaluated in outward-rounded interval arithmetic (`mpmath.iv` at a stated precision) or in exact rationals where no radical occurs; or (b) sampled values with a declared bound $a_{\max}$ on acceleration, enclosed on each sample interval by the Taylor form $\mathbf X(t)\in\mathbf X(t_k)+\mathbf V(t_k)(t-t_k)+\tfrac12 a_{\max}(t-t_k)^2[-1,1]^3$. Form (b) is only as good as its declared bound, which must itself be justified.
2. Partition. Split $[0,2R/c_f]$ into boxes $[a,b]$; include the endpoints $0$ and $2R/c_f$ as box edges and refine near any sample seam.
3. Exclusion. On each box compute an enclosure of $f$ from the history enclosure (distance enclosure via interval norm, then $f\in[a,b]-\text{dist}/c_f$ outward-rounded). If $0\notin f([a,b])$ the box is root-free.
4. Inclusion. On a box not excluded, compute an enclosure of $f'=1-\hat{\mathbf r}\cdot\mathbf V_j/c_f$; if it excludes $0$ and $f(a)f(b)<0$ in interval sense (both endpoint enclosures sign-definite), the box contains exactly one simple root; refine by interval Newton or bisection to the required width and record the enclosure of $\tau$, of $D_t$ and of the per-hit acceleration.
5. Unresolved. A box that is neither excluded nor certified (enclosure of $f$ contains $0$ and enclosure of $f'$ contains $0$, or endpoint signs are not definite at the working precision) is recorded as unresolved with its width; a fold is suspected where $f'$ enclosures contain $0$ across refinement. Never report a count that silently drops an unresolved box.
6. Sub-wake shortcut. If the declared speed bound on the retained window gives $1-v_{\max}/c_f>0$, step 4 is replaced by the certificate of 3.2: exactly one partner root, zero self roots, with the root enclosure obtained by bisection on sign-definite endpoint enclosures.
7. Stationary shortcut. If the transmitter is stationary at position $\mathbf X_j^0$ on the whole interval that contains the root, the root is exact, $\tau=|\mathbf X_i(T)-\mathbf X_j^0|/c_f$, $D_t=c_f$; the certificate reduces to verifying that the emission time $T-\tau$ lies inside the stationary interval.

Claim grade: derived (each step is standard interval reasoning on the function of 3.2). Falsifier: a certified box whose stated root enclosure does not contain a true root, or a box reported excluded that contains one, demonstrable by exact evaluation.

## 4. Closed-form independent references for release-state accelerations

### 4.1 Instrument and its controls (run before any target)

The review instrument is [spherical-curvature-claude-review-reference.py](../evidence/spherical-curvature-claude-review-reference.py), authored by the review role alone, with its compact output in [spherical-curvature-claude-review-reference-output.json](../evidence/spherical-curvature-claude-review-reference-output.json). It evaluates the canonical per-hit kernel in exact arithmetic (sympy) for stationary sources, where every root is exact ($\tau=d/c_f$, $D_t=c_f$, weight $1$), splits the total into radial and tangent parts, computes tangent work for declared tangent velocities, and refuses non-tangent velocities, zero separation and sub-wake certificates at or above $c_f$. Domain of the instrument: stationary transmitters at the emission times, $c_f=1$, $K=1$; it does not evolve anything and it does not certify roots of moving histories (that is the recipe of 3.4). Controls, in the order recorded in the output field `_order`, all run and passed before the first target, and the output stamps the UTC time at which the controls completed: K1 known case, receiver $(1,0,0)$ with one unlike stationary source at $(-1,0,0)$, expected $\mathbf A=(-1/4,0,0)$, root $\tau=2$, $D_t=1$, zero tangent part, returned exactly; K1b the like-polarity version, expected $(+1/4,0,0)$, returned exactly; K2 known case, receiver $(1,0,0)$ with two unlike sources at $(0,\pm1,0)$, expected $(-1/\sqrt2,0,0)$ with zero tangent part by reflection symmetry, returned exactly; K3 known case for tangent work, $\mathbf X=(1,0,0)$, $\mathbf v=(0,1,0)$, $\mathbf A=(5,2,0)$, expected $2$ both as $\mathbf v\cdot P\mathbf A$ and $\mathbf v\cdot\mathbf A$, returned exactly; N1 negative control, velocity $(1,1,0)$ at $(1,0,0)$ rejected as non-tangent; N2 negative control, the sub-wake certificate refused at $v_{\max}=1$ and accepted at $v_{\max}=1/2$ with lower bound $1/2$; N3 negative control, zero separation rejected. Wall time $3.2$ s, single-threaded.

Claim grade: measured (instrument self-report of control outcomes, binary64 and exact sympy, domain as stated). Falsifier: re-running the script and finding any `pass: false` or a different `_order`.

### 4.2 Six stationary poles (regular octahedron)

Positrinos at $R\hat{\mathbf x},R\hat{\mathbf y},R\hat{\mathbf z}$, electrinos at $-R\hat{\mathbf x},-R\hat{\mathbf y},-R\hat{\mathbf z}$. Distances: two like partners at $\sqrt2R$, two unlike partners at $\sqrt2R$, one unlike antipode at $2R$; stationary sources give exact roots $\tau\in\{\sqrt2R/c_f,\sqrt2R/c_f,\sqrt2R/c_f,\sqrt2R/c_f,2R/c_f\}$ with $D_t=c_f$. For the receiver at $R\hat{\mathbf x}$ (positrino), by hand: the like partners contribute $\tfrac{K}{2R^2}\tfrac{(1,-1,0)}{\sqrt2}$ and $\tfrac{K}{2R^2}\tfrac{(1,0,-1)}{\sqrt2}$; the unlike side partners contribute $-\tfrac{K}{2R^2}\tfrac{(1,1,0)}{\sqrt2}$ and $-\tfrac{K}{2R^2}\tfrac{(1,0,1)}{\sqrt2}$; the antipode contributes $-\tfrac{K}{4R^2}(1,0,0)$. The $x$ components of the four side hits cancel in pairs, leaving

$$
\mathbf A(R\hat{\mathbf x})=\frac{K}{R^2}\Bigl(-\frac14,\;-\frac1{\sqrt2},\;-\frac1{\sqrt2}\Bigr),\qquad \mathbf n\cdot\mathbf A=-\frac{K}{4R^2},\qquad P\mathbf A=\frac{K}{R^2}\,\frac{(0,-1,-1)}{\sqrt2},\qquad |P\mathbf A|=\frac{K}{R^2}.
$$

The radial part is the antipode's attraction alone and is discarded by the selected law. The tangent acceleration has magnitude exactly $K/R^2$ and points along the tangent projection of $-\mathbf a$, $\mathbf a=(1,1,1)/\sqrt3$: away from the two like neighbours and toward the two unlike side partners, that is along the meridian of axis $\mathbf a$ toward the opposite cap. The cyclic permutation $x\to y\to z$ and the inversion $\mathbf X\to-\mathbf X$ (which swaps polarities and preserves every $\sigma_{ij}$) give the other five: every member has radial part $-K/(4R^2)$ and tangent magnitude $K/R^2$; positrinos accelerate toward the $-\mathbf a$ cap, electrinos toward the $+\mathbf a$ cap. The instrument reproduces all six members exactly (output `target_six_poles_R1_K1`). Consequently the stationary six-pole configuration is not an equilibrium of the selected law: with $\mathbf v=0$ its tangent acceleration is $K/R^2\ne0$, so no linearization about it is lawful.

Preparation condition for exactness at release. These formulas are exact at reception time $T_0$ if, and only if, each partner was at rest at its pole at its own emission time $T_0-\sqrt2R/c_f$ or $T_0-2R/c_f$, and the root census at $T_0$ is exactly those five roots. Under the history family H1 (every member at rest at its pole for $T\le T_0-R/(4c_f)$, then the preparation of 4.5 returning it to its pole at $T_0$ with tangent speed $u c_f$), both emission times lie in the stationary past because $\sqrt2>1/4$; for $u<1$ the certificate of 3.2 gives exactly these five roots and no self root; for $u=1$ the same census holds because the only place the monotonicity bound degenerates is at $\tau=0$, which is not a root (3.3, and the chord-versus-arc argument for the self function). A preparation that displaces a member from its pole at release, or that lasts longer than $\sqrt2R/c_f$, voids the formulas.

Claim grade: derived (hand computation, cross-checked by the instrument, and by the closed form $F(\alpha)$ of 4.4 at $\cos\alpha=1/\sqrt3$). Falsifier: a correct canonical evaluation of the five stationary hits at any pole with tangent magnitude other than $K/R^2$ or radial part other than $-K/(4R^2)$.

### 4.3 Tangent work of the named velocity patterns at the six poles

Definitions used by the review role (a subject using a different definition must say so; the adjudication will then re-derive for the subject's definition). Let $\mathbf a=(1,1,1)/\sqrt3$ and let all speeds equal $v$ at release. At $R\hat{\mathbf x}$ the zonal unit vector (common rotation about $\mathbf a$) is $\hat{\boldsymbol\zeta}=\widehat{\mathbf a\times\mathbf X}=(0,1,-1)/\sqrt2$ and the meridional unit vector toward the opposite cap is $\hat{\boldsymbol\mu}=(0,-1,-1)/\sqrt2$, which is exactly the direction of $P\mathbf A$; the two are orthogonal.

- V1, common rotation about $\mathbf a$: $\mathbf v_i=v\,\widehat{\mathbf a\times\mathbf X_i}$ for all six. Work at release: $\mathbf v\cdot P\mathbf A=0$ for every member, because the tangent acceleration is meridional and the velocity is zonal. Speeds are stationary to first order at release; the tangent acceleration bends each path toward the opposite cap. (Instrument: `V1` work $0$ for all six.)
- V2, toward opposite caps: $\mathbf v_i=v\hat{\boldsymbol\mu}_i$ (positrinos toward $-\mathbf a$, electrinos toward $+\mathbf a$, along their meridians). Work $=+vK/R^2$ for every member: all six speeds increase at the same rate at release, $d|\mathbf v|/dT=K/R^2$. Note that "toward the own antipode" is not a tangent direction (the antipode direction $-\mathbf n$ is purely normal), so that reading of V2 is an excluded zero-tangent-projection seed.
- V3, copied antipodal velocities: each electrino at $-\mathbf X$ carries the same velocity vector as the positrino at $\mathbf X$ (both tangent, since the tangent planes at antipodes coincide). Identity: $P\mathbf A(-\mathbf X)=-P\mathbf A(\mathbf X)$ by inversion symmetry, so the copied member has the negative of the original's tangent work: $w(-\mathbf X)=-w(\mathbf X)$. With a V2 base the positrinos gain $+vK/R^2$ and the electrinos lose $-vK/R^2$ (instrument `V3_copied_V2base`). With a V1 base all works are zero.
- V4, balanced counter-motion: $\mathbf v_i=s_i\,v\,\widehat{\mathbf a\times\mathbf X_i}$ with $s_i=+1$ for positrinos and $-1$ for electrinos. Because $\mathbf a\times(-\mathbf X)=-\mathbf a\times\mathbf X$, this pattern is vector-identical to V3 with a V1 base (instrument field `V3_copied_V1base_equals_V4` is true for all six). Work $0$ for every member at release. A subject reporting V4 and copied-V1 as distinct release states has an error.
- V5, one-member $10^\circ$ direction perturbation: member $R\hat{\mathbf x}$ has $\mathbf v=v(\cos10^\circ\,\hat{\boldsymbol\zeta}+\sin10^\circ\,\hat{\boldsymbol\mu})$ (rotated toward the tangent-acceleration direction; the opposite sign gives the opposite work), the other five keep V1. Work $=vK\sin10^\circ/R^2=0.173648\,vK/R^2$ for that member and $0$ for the others, because at release every acceleration is fixed by the stationary emission states and does not see the perturbed velocity.

Numerical table at $R=1,K=1,c_f=1$ (output `target_six_poles_tangent_work_table`): V1 and V4 give $0$ for all members at every speed; V2 gives $v\in\{0.25,0.5,0.75,1\}$ for every member; V3 (V2 base) gives $\pm v$ by polarity; V5 gives $0.0434,0.0868,0.1302,0.1736$ for member $0$. The operator's reference cell ($v=c_f=1$) with V2 therefore leaves wake speed immediately after release, $d|\mathbf v|/dT=+1$, and any continuation of that cell owes the all-root accounting of 3.3 from $T_0^+$ on; with V1 or V4 the speed is stationary at release and whether it later exceeds $c_f$ is decided by the generated history, not by the release state.

Claim grade: derived (closed forms), with the numerical table measured by the instrument over its stated domain. Falsifier: a direct canonical evaluation at the release state giving a nonzero V1 work, a V2 work different from $vK/R^2$, or a V4 release velocity different from the copied-V1 vector.

### 4.4 Three meridional antipodal pairs and the alternating hexagon as one family

Place three positrinos at colatitude $\alpha$ from the $+\hat{\mathbf z}$ axis at longitudes $0,2\pi/3,4\pi/3$ and each electrino at the antipode of a positrino. The reflection through each member's meridian plane and the three-fold rotation preserve the configuration and polarities, so each tangent acceleration is purely meridional. With $\hat{\boldsymbol\theta}$ the unit vector of increasing $\alpha$ (toward the equator and beyond, that is toward the opposite cap for $\alpha<\pi/2$), using $\mathbf X_0\cdot\hat{\boldsymbol\theta}=0$, the like partners at chord $\sqrt3R\sin\alpha$ and the unlike side partners at chord $R\sqrt{4-3\sin^2\alpha}$ give, and the antipode gives no tangent part,

$$
P\mathbf A=\frac{K}{R^2}F(\alpha)\,\hat{\boldsymbol\theta},\qquad F(\alpha)=\frac{\cos\alpha}{\sqrt3\sin^2\alpha}+\frac{3\sin\alpha\cos\alpha}{(4-3\sin^2\alpha)^{3/2}} .
$$

Checks: $F(\pi/2)=0$ is the alternating equatorial hexagon; $\cos\alpha=1/\sqrt3$ (the six poles seen along $\mathbf a$) gives $F=\tfrac12+\tfrac12=1$, matching 4.2 independently; $F\to\infty$ as $\alpha\to0$ (like members crowding one pole). Both terms are positive on $(0,\pi/2)$, so the only stationary tangent equilibrium in this family is the hexagon. The instrument evaluates the direct five-hit sum and the closed form at $\alpha\in\{30^\circ,45^\circ,54.7356^\circ,60^\circ,90^\circ\}$ and they agree exactly: $F=2+6\sqrt{39}/169=2.221716$, $1.195970$, $1$, $0.946032$, $0$; the zonal component is identically $0$ (output `target_three_meridional_pairs_colatitude_family`). At $\alpha=\pi/6$ the discarded radial part is $+0.350\,K/R^2$ (outward); at $\pi/4$ it is $-0.066$; at the six poles $-0.25$; at the hexagon $-0.6727$. Velocity patterns on this family: a zonal velocity (rotation about $\hat{\mathbf z}$) does zero tangent work at release; a meridional velocity toward the opposite cap does work $+vKF(\alpha)/R^2$.

Alternating equatorial hexagon at rest ($\alpha=\pi/2$), re-derived by hand for the receiver at $R\hat{\mathbf x}$: partners at $\pm60^\circ$ (unlike, chord $R$), $\pm120^\circ$ (like, chord $\sqrt3R$), $180^\circ$ (unlike, chord $2R$); the $y$ components cancel by the reflection $y\to-y$, the $z$ components vanish, and the $x$ component is $-\tfrac12-\tfrac12+\tfrac{\sqrt3}6+\tfrac{\sqrt3}6-\tfrac14=-\tfrac54+\tfrac{\sqrt3}3=-0.672650$ in units of $K/R^2$. The tangent sum is zero for every member (sixty-degree rotation with polarity swap is a symmetry). Hence the stationary alternating hexagon, with every member at rest for all past time, is an exact solution of the selected law for every $R$ and $K$: $\mathbf v=0$, $P\mathbf A=0$, $\mathbf X''=0$. It is the one configuration in this reference about which linearization is lawful; no stability statement is made here. Any tangent velocity has zero tangent work at release on the hexagon.

Claim grade: derived (closed form by hand, cross-checked by the instrument's direct sum at five values of $\alpha$ including the six-pole and hexagon limits). Falsifier: a correct direct evaluation of the five stationary hits with a nonzero zonal component, or a meridional magnitude differing from $KF(\alpha)/R^2$.

### 4.5 Preparation history (H1) re-derived for general release speed

Each member moves along the great circle of its release direction with angular displacement $\theta(s)=0$ for $s\le-1/4$ and $\theta(s)=u\,s(1+4s)^3$ for $-1/4\le s\le0$, $s=c_fT/R$, $u=v/c_f$. Facts (output `target_preparation_history_regularity`): $\theta(0)=0$, so release is at the pole; $\theta'(0)=u$, so the release speed is $uc_f$; at the seam $s=-1/4$, $\theta,\theta',\theta''$ vanish and $\theta'''=-96u$, so the history is $C^2$ with a $C^3$ break there; $\theta'(s)=u(1+4s)^2(1+16s)$, so the speed on the window never exceeds $uc_f$ (the extreme values are $-u/4$ at $s=-1/8$ and $u$ at $s=0$), and the swing reaches $\theta=-27u/1024$ at $s=-1/16$. The brief's stated history is the case $u=1/2$. Because the preparation lasts $R/(4c_f)$ and the nearest partner chord at release is at least $\sqrt2R$ (six poles) or $R$ (hexagon), every partner emission received at release comes from the stationary past, and the release accelerations of 4.2 and 4.4 are exact. The self function $f_{ii}$ at release is positive on $(0,2R/c_f]$ for $u\le1$ (derived: speed $\le uc_f\le c_f$ with equality only at the instant $s=0$, and a curved path has chord shorter than arc); a $20000$-point grid at $u=1/2$ and $u=1$ returns minimum $f_{ii}$ of $5.0\times10^{-5}$ and $1.2\times10^{-7}$ at the smallest grid delay, consistent with the cubic growth $f_{ii}\approx k^2c_f^2\tau^3/24$ ($k$ the path curvature, $1/R$ on a great circle) and recorded only as a sanity check, not as the certificate.

Claim grade: derived (seam algebra and speed bound), with the grid values measured by the instrument. Falsifier: a seam derivative that does not vanish, a window speed exceeding $uc_f$, or a partner root at release with emission time later than $T_0-R/(4c_f)$.

## 5. Recurrence taxonomy applied in adjudication

Grades of return, from strongest to weakest, with the minimum evidence for each. All are statements about a generated lawful history on an actually reached interval; none may be claimed for a prescribed path.

1. Strict recurrence: there is $P>0$ with $\mathbf X_i(T+P)=\mathbf X_i(T)$ and $\mathbf v_i(T+P)=\mathbf v_i(T)$ for every member, labeled, for all $T$ in a window of length at least $2R/c_f$ (so the full retained history recurs, which is what makes the delayed law periodic from then on). Minimum evidence: a reached interval of length at least $P+2R/c_f$, the root census with certificate on it, and an enclosure of the return defect on the whole window, not at one instant.
2. Relative recurrence: the same with a fixed rotation $Q\in SO(3)$ and a declared polarity-preserving permutation $\pi$: $\mathbf X_{\pi(i)}(T+P)=Q\mathbf X_i(T)$, $\mathbf v_{\pi(i)}(T+P)=Q\mathbf v_i(T)$ on a window of length $2R/c_f$. Minimum evidence as above plus the explicit $Q$ and $\pi$. Because the law is invariant under rotations and under polarity-preserving relabeling, a relative recurrence generates a lawful continuation by symmetry; a reflection is also a symmetry of the law but must be declared as such.
3. Scalar oscillation: a scalar observable (a speed, a chord, an angle) returns to a value with the same derivative sign; this is not recurrence of the state. Minimum evidence: the observable, its window and the number of returns; no frequency claim beyond that observable.
4. Near-return on a finite window: $\min_T\max_i|\mathbf X_i(T)-\mathbf X_i(T_0)|+|\mathbf v_i(T)-\mathbf v_i(T_0)|<\varepsilon$ on the reached interval. Minimum evidence: the tolerance, the time of closest approach, the reached interval and its root certificate. A finite-window near-return is not periodicity: the delayed law is driven by the whole retained window, so a state near-return with a different retained history does not continue the same way, and no frequency is derived from it.

The kinematic control $f_0=v/(2\pi R)$ is the frequency of a constant-speed great circle, which is a solution of the selected law only when the tangent interaction vanishes along it (2.2). It is used to scale observation windows and to label candidates; it is never reported as a solved six-member frequency. A candidate frequency is reported only with its grade from this list, its reached interval, its root certificate, the speed change over the window (from 1.5), and the enclosure or error estimate of the return defect. Existence of a root chart, the actually reached interval, near-return, relative recurrence, strict recurrence and stability are six different claims; stability requires a lawful equilibrium or periodic orbit as its base (the stationary hexagon of 4.4 is the only lawful equilibrium in this reference; the six poles are not one).

Claim grade: derived (definitions and the consequences of the law's symmetries and delay structure). Falsifier: a lawful periodic continuation that follows from a one-instant state return without recurrence of the retained window.

## 6. Checklist applied to every subject

Each item is answered yes, no or not shown, with the subject's line reference, in the adjudication file.

1. Complete root census with certificate: for every reception time used, every ordered pair including self; sub-wake certificate (3.2) with the transmitter speed bound on the retained window, or the full accounting of 3.3 with unresolved boxes listed; delays in $(0,2R/c_f]$.
2. Transmitter factor: $D_t=c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf r}$ with $\hat{\mathbf r}$ from the emission point to the receiver and $\mathbf V_j$ at the emission time; weight $c_f/|D_t|$; receiver velocity absent from the multiplier; stationary sources give weight exactly $1$.
3. Polarity sign: $\sigma=+1$ like (acceleration along $+\hat{\mathbf r}$, away from the emission point), $-1$ unlike.
4. Tangent projection: $P=I-\mathbf n\mathbf n^{\mathsf T}$ applied to the total $\mathbf A$ after superposition, not per hit and not to a velocity-direction projection.
5. Discarded radial part not used in motion; if recorded, recorded as a receiver total diagnostic only.
6. Normal term $-(|\mathbf v|^2/R)\mathbf n$ present in any Cartesian evolution; no position or speed renormalization; no cap, damping, smoothing, controller, event or contact law.
7. Speed evolution from tangent work (1.5); equal initial speeds not assumed to persist; speeds crossing $c_f$ flagged with the consequence for item 1.
8. History: complete supplied family on $[T_0-2R/c_f,T_0]$ for every member, seam regularity stated, radius-scaled duration stated; release-state formulas used only where the preparation condition of 4.2 holds.
9. Controls recorded before targets, with the instrument's domain; no replay or shared-code agreement counted as independent.
10. Claim grade and falsifier present at each claim; existence, reached interval, near-return, relative and strict recurrence, and stability kept distinct (5); no linearization except about a lawful equilibrium or periodic orbit.
11. No prescribed history reported as motion; residual of a prescribed path against the law reported as a diagnostic with its grade.
12. Fixed-$K$ comparison across radii not attributed to scaling (2.2); any $K\propto R$ similarity comparison labeled as such and separate.
13. Units: $c_f=1$, $K=1$, curvature $\mathcal C=1/R$, $f_0$ a control only.

Claim boundary of this reference: independent references and verification recipes only; no evolved motion, no stability, no confinement, no sea. Measured evidence size for this role (du -sk): script 16 KiB, output 28 KiB, scratch 4 KiB, local-data 0.

Frozen: 2026-10-11 00:09:34 UTC. sha256 of this file over all bytes preceding this line: ce59e1333690788eb7f52b58769e389ecef073c046a7269a2b5701ecfd627d35. Instrument sha256: 3a5a00cf87b4d81e86316235557eaa64a37bac764758c2cecccf8da390678ef1. Instrument output sha256: 91b40d2849fa2173a9327c78dd80b5cc583efc8ec59880a4a3b1e856fa6b129b. Frozen before any subject, peer reference or Codex scaling reference was read.
