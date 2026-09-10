# Finite perturbations and release-cut compatibility

## Result and scope

A stationary alternating lattice with two fixed modified complete histories admits a conditional local EOM theorem. Under the existing uniform simple-root and self-complement assumptions, the specified stationary block prescription defines a uniformly smooth acceleration field on a common short interval. Every received emission on that interval still belongs to the supplied past. A contraction argument constructs the future of every particle, including the environment, and a separate root-census proof shows that this construction solves the full positive-delay equations on that interval.

The release regularity matters. Arbitrary admitted histories generally do not admit a globally $C^3$ join: the EOM's right-hand acceleration and jerk must match the prescribed left-hand derivatives at every label. A globally $C^1$, piecewise $C^3$ release can accommodate an acceleration jump and has a local solution without these higher-derivative matches. This is a conditional mathematical result on that explicitly stated regularity domain, not adoption of a new physical history class. The acceleration law, all old roots, and the unresolved status of the exact zero-delay diagonal are unchanged.

The existing bump control makes the distinction concrete. When only its two target histories are changed, the potentially nonzero environmental acceleration and jerk at the cut occur in an explicitly finite set of 32 labels. The compatibility tests reduce to exact finite expressions there. Some parameter choices within that existing control fail the acceleration match; other choices of its already allowed profile jets satisfy both matches. Neither a blanket smooth-release assertion nor a blanket incompatibility assertion follows merely from changing two histories.

The mathematical inputs are the [complete-history population class](population-history-class.md), the [complete-root derivative](population-history-derivative.md), the [population-admissibility adjudication](population-admissibility-independent-adjudication.md), and the canonical [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md). The block prescription and stationary cancellation are consumed at their established conditional scope. The theorem here is submitted for independent review; it is not represented as an independently adjudicated evolution result.

## 1. What must be supplied at release

Set $c_f=1$ and put the release cut at $T=0$. Labels are $j\in\mathbb Z^3$, anchors are $\mathbf z_j=\ell j$, and signs are $\sigma_j=(-1)^{j_1+j_2+j_3}$. Let $G=\kappa q_0^2>0$ and fix the changed label set

$$
E=\{0,e_1\}.
$$

Supply the entire two target histories $\mathbf X_j(s)$, $s\leq0$, for $j\in E$. All other pasts are exactly $\mathbf X_j(s)=\mathbf z_j$. This is a restriction of the existing initial-history class, not a new independently prescribed population. The supplied histories need not solve the EOM before release. Requiring an all-time EOM solution would add equations on their entire past and is a different initial-data question.

The histories obey the existing displacement and derivative bounds

$$
\|\mathbf X_j(s)-\mathbf z_j\|\leq B=4\ell,\qquad
V_*=4,\qquad A_*=256/\ell,\qquad J_*=65536/\ell^2,
$$

where the last three quantities bound the first, second, and third time derivatives. The environment has zero past displacement, so it also satisfies its smaller bound $b=\ell/16$. Distinct release positions have separation at least $d_*=\ell/8$. Write

$$
\mathbf x_i=\mathbf X_i(0),\qquad
\mathbf v_i=\dot{\mathbf X}_i(0^-),\qquad
\mathbf a_i^-=\ddot{\mathbf X}_i(0^-),\qquad
\mathbf j_i^-=\mathbf X_i^{(3)}(0^-).
$$

Position and velocity at release are the endpoint values of these histories. They cannot be assigned independently while claiming a $C^1$ join. An instantaneous displacement or velocity change requires another regularity formulation and is not covered below. Acceleration and jerk are supplied derivatives, but they become compatibility tests rather than additional freely assignable future data.

For each ordered channel, put

$$
f_{ij}(u)=u-\|\mathbf x_i-\mathbf X_j(-u)\|,\qquad u>0.
$$

The existing complete certificate supplies disjoint root tubes of half-width $w=\ell/256$, positive range at least $w$, transmitter magnitude at least $\delta=1/4$, and an ordinary complement gap $\gamma=w/4$. Self channels instead have

$$
|f_{ii}(u)|\geq\eta u\quad(0<u\leq\tau_0),
\qquad
\eta=1/4,\qquad \tau_0=2w,
$$

with no root tube meeting this sector; their remaining complement has the ordinary gap. Every positive root is included. There are at most $M_{\rm root}=2050$ roots per channel. Taking the self-sector limit gives the endpoint speed separation

$$
\big|1-\|\mathbf v_i\|\big|\geq\eta.
$$

This permits both sub-field and super-field endpoint speeds. It excludes equality speed only in this regular chart.

For one root at emission $s<0$, define

$$
\mathbf R=\mathbf x_i-\mathbf X_j(s),\quad
r=\|\mathbf R\|=-s,\quad
\mathbf n=\mathbf R/r,\quad
\mathbf W=\dot{\mathbf X}_j(s),\quad
\mathbf A=\ddot{\mathbf X}_j(s),\quad
D=1-\mathbf n\cdot\mathbf W.
$$

Its canonical acceleration is

$$
\mathbf a_{ijb}=\frac{G\sigma_i\sigma_j}{r^2|D|}\mathbf n.
$$

The index $b$ distinguishes multiple positive roots of one ordered channel. The zero-delay diagonal is never evaluated.

### The summation prescription remains an explicit hypothesis

Use the existing complete blocks $P_n=\{2n+\epsilon:\epsilon\in\{0,1\}^3\}$. For $\mathbf K(\mathbf y)=\mathbf y/\|\mathbf y\|^3$, alternating signs make a distant stationary block a third mixed finite difference. Its receiver derivatives of order $k=0,1,2$ obey

$$
\left\|D_{\mathbf x}^k
\sum_{j\in P_n}G\sigma_i\sigma_j\mathbf K(\mathbf x-\mathbf z_j)\right\|
\leq C_kG\ell^3R^{-5-k}.
$$

Cubic shell counting makes these block series uniformly summable away from their excluded anchors. Finite exceptional blocks are evaluated explicitly. The stationary cancellation proof in the preceding adjudication compares the block sum with reflection-symmetric cubes, whose sum is exactly zero; the unmatched boundary faces, edges, and corner total $O(G/(\ell^2N^2))$. Thus the stationary acceleration at each anchor is zero under this prescription.

No absolute convergence of individual source rows, equality of arbitrary partitions, or physical selection of the blocks is assumed. Those questions are not resolved by the local theorem.

## 2. The exact acceleration and jerk tests

Let $\mathscr F_i(T,\mathbf x)$ denote the acceleration obtained from the continued old roots at reception $(T,\mathbf x)$, with the stationary block reference and only the two changed source histories. Section 3 constructs this function independently of any future. Define the right-hand endpoint values

$$
\mathbf a_i^+=\mathscr F_i(0,\mathbf x_i),\qquad
\mathbf j_i^+
=\partial_T\mathscr F_i(0,\mathbf x_i)
+D_{\mathbf x}\mathscr F_i(0,\mathbf x_i)\mathbf v_i.
$$

The necessary and, for the constructed local solution, sufficient conditions for a globally $C^3$ join are

$$
\boxed{\quad
\mathbf a_i^-=\mathbf a_i^+,\qquad
\mathbf j_i^-=\mathbf j_i^+
\quad\text{for every }i.\quad}
$$

Only the first equality is required for a $C^2$ join. Their necessity follows by taking right limits of the EOM and its first time derivative. Sufficiency follows from the one-sided $C^3$ future proved below and equality of the derivatives through order three at the join. These are exact constraints, not small-error acceptance tests.

### A directly evaluable formula for the jerk

At a retained root, differentiate along a receiver with instantaneous velocity $\mathbf v_i$. Let $\mathbf P=\mathbf I-\mathbf n\otimes\mathbf n$. Differentiating the causal equation $r=T-s$ gives

$$
\begin{aligned}
s'&=\frac{1-\mathbf n\cdot\mathbf v_i}{D},\\
\mathbf R'&=\mathbf v_i-\mathbf W s',\\
r'&=1-s'=\mathbf n\cdot\mathbf R',\\
\mathbf n'&=\frac{\mathbf P\mathbf R'}r,\\
D'&=-\mathbf W\cdot\mathbf n'-\mathbf n\cdot\mathbf A\,s'.
\end{aligned}
$$

The sign of $D$ is fixed in a regular tube. The per-root derivative is therefore

$$
\mathbf a_{ijb}'
=\frac{G\sigma_i\sigma_j}{r^2|D|}
\left[
\mathbf n'-\mathbf n\left(\frac{2r'}r+\frac{D'}D\right)
\right].
$$

Sum these expressions over the two changed sources and add the derivative of the stationary background. The source acceleration in $D'$ is a derivative of the supplied past at its sampled emission. It is already known; there is no implicit equation for a future source acceleration on the first interval.

Two closed-form substitutions check the chain rule. For a stationary source, it becomes $G\sigma_i\sigma_jD\mathbf K(\mathbf R)\mathbf v_i$. For a locally affine radial source with velocity $v\mathbf n$ and fixed receiver, $r'=-v/(1-v)$ and the derivative becomes $2G\sigma_i\sigma_jv\mathbf n/(r^3(1-v)|1-v|)$, exactly the derivative of the affine row. These are algebraic controls, not a population simulation.

### Environmental compatibility

For $i\notin E$, all four left endpoint quantities are stationary: $\mathbf x_i=\mathbf z_i$ and $\mathbf v_i=\mathbf a_i^-=\mathbf j_i^-=\mathbf0$. Write $\mathbf F_{ij}^0=\sum_b\mathbf a_{ijb}$ at the cut and

$$
\mathbf S_{ij}=G\sigma_i\sigma_j\mathbf K(\mathbf z_i-\mathbf z_j).
$$

Stationary cancellation then gives the explicit environmental tests

$$
\begin{aligned}
\mathbf C_i^{(0)}
&=\sum_{j\in E}(\mathbf F_{ij}^0-\mathbf S_{ij})=\mathbf0,\\
\mathbf C_i^{(1)}
&=\sum_{j\in E}\partial_T\mathbf F_{ij}(0,\mathbf z_i)=\mathbf0,
\qquad i\notin E.
\end{aligned}
$$

Here $\partial_T$ holds the receiver position fixed, so the preceding root derivative uses $\mathbf v_i=\mathbf0$. General two-target pasts may make these countably many nontrivial tests: distant receivers can sample arbitrarily old portions of those two pasts. Each test contains only two finite changed-source sums. The rest of the population is not an independently selectable correction that can be used to enforce the equalities.

The target tests retain their full background derivative and every positive-delay self root. In particular, changing a target's current position changes its stationary background. The environmental formula must not be transferred to a displaced target by silently omitting that term.

**Claim grade: derived.** A mismatch in either boxed equality falsifies a proposed $C^3$ extension of those particular initial histories. It does not falsify existence of a piecewise regular release. Conversely, a proof of smooth release for arbitrary admitted pasts would have to establish these equalities, not merely bound the acceleration sums.

## 3. A uniformly regular field from the fixed past

This section builds an auxiliary field before solving for any future. For an old emission write $s=-u$, with $u>0$, and define

$$
H_{ij}(T,\mathbf x,u)
=T+u-\|\mathbf x-\mathbf X_j(-u)\|.
$$

For every old time,

$$
|H_{ij}(T,\mathbf x,u)-f_{ij}(u)|
\leq T+\|\mathbf x-\mathbf x_i\|.
$$

This estimate controls the entire old past, including its unbounded part.

Choose positive lengths

$$
a=\min\left\{\frac{\tau_0}{2},\frac{\eta}{8A_*}\right\},
\qquad
\rho=\min\left\{
\frac w4,\,
\frac{\delta w}{16(1+V_*)},\,
\frac\gamma8,\,
\frac{\eta a}8,\,
\frac{d_*}8
\right\}.
$$

The fixed class has $A_*>0$. With its constants, $a=\ell/8192$ and $\rho=\ell/262144$. These conservative values are proof parameters, not a measured lifespan.

Consider $0\leq T\leq\rho$ and $\|\mathbf x-\mathbf x_i\|\leq\rho$. On any original tube, range remains at least $w-\rho\geq w/2$. Changing the receiver position changes the unit direction by at most $2\rho/w$ and hence changes $D$ by at most $2V_*\rho/w<\delta/2$. At the two original tube endpoints, $f_{ij}$ has opposite signs and magnitude at least $\delta w$, whereas the perturbation is at most $2\rho<\delta w/2$. Thus there is exactly one continued root in that tube, with

$$
|D|\geq\delta/2,\qquad
|u_b(T,\mathbf x)-u_b(0,\mathbf x_i)|
\leq\frac{4\rho}{\delta}<\frac w2.
$$

Every such emission has $u_b>w/2$, since its original tube lies wholly in positive delay. Cross-channel complements remain root-free. On self complements with $u\geq a$, the old gap is at least $\min(\eta a,\gamma)$, and the same perturbation bound preserves a positive gap. Possible very recent self roots with $0<u<a$ are deliberately not decided for arbitrary points in this parameter box: an arbitrary receiver position can create one there. Section 4 excludes them on the constructed receiver paths using their matching first derivatives. This distinction prevents an unjustified near-diagonal root deletion.

### Separating the stationary background from two changed sources

Define

$$
\mathbf B_i(\mathbf x)
=\sum_{\substack{j\notin E\\j\ne i}}^{\rm complete\ blocks}
G\sigma_i\sigma_j\mathbf K(\mathbf x-\mathbf z_j).
$$

Blocks containing $E$, the receiver label, or nearby anchors are finite exceptional blocks; retain their allowed stationary rows explicitly. All remaining blocks are summed whole. For every retained stationary anchor, release separation gives $\|\mathbf x_i-\mathbf z_j\|\geq d_*$, so its range in the parameter box is at least $d_*/2$. The number of nearby anchors is uniformly bounded by lattice counting, since $\|\mathbf x_i-\mathbf z_i\|\leq B$. The block estimate in Section 1 therefore supplies finite uniform bounds $C_{B,k}$ for $\mathbf B_i$ and its first two receiver derivatives.

The auxiliary field is

$$
\mathscr F_i(T,\mathbf x)
=\mathbf B_i(\mathbf x)
+\sum_{j\in E}\sum_{b\in\mathcal R_{ij}}
\frac{G\sigma_i\sigma_j\,\mathbf n_{ijb}(T,\mathbf x)}
{r_{ijb}(T,\mathbf x)^2|D_{ijb}(T,\mathbf x)|}.
$$

The inner indices name all initial positive roots and their unique continuations. If $i\in E$, this includes its actual positive-delay self roots. If $i\notin E$, its stationary past has no initial self root, and no stationary self kernel is inserted into $\mathbf B_i$.

The stationary source root has old emission coordinate $u=\|\mathbf x-\mathbf z_j\|-T>0$ in this box. Its row is exactly its stationary kernel. Consequently the displayed field represents all continued old rows; it is not a stationary approximation to a changed source.

### Bounds needed for a common existence interval

Put $r_0=w/2$ and $d_0=\delta/2$. There are at most $|E|M_{\rm root}$ nonstationary rows in $\mathscr F_i$, uniformly in $i$. In particular,

$$
\sup_{i,T,\mathbf x}\|\mathscr F_i(T,\mathbf x)\|
\leq C_{B,0}+\frac{8|E|M_{\rm root}G}{\delta w^2}
=:K_0<\infty.
$$

For a variation $(t,\mathbf v)$ of $(T,\mathbf x)$ with $|t|+\|\mathbf v\|\leq1$, implicit differentiation gives

$$
ds=\frac{t-\mathbf n\cdot\mathbf v}{D},
\qquad
d\mathbf R=\mathbf v-\mathbf W\,ds.
$$

Let $Q=1+V_*/d_0$. Then $|ds|\leq1/d_0$, $\|d\mathbf R\|\leq Q$, $\|d\mathbf n\|\leq Q/r_0$, and $|dD|\leq V_*Q/r_0+A_*/d_0$. Differentiating the row gives the uniform bound

$$
\|d\mathbf a\|
\leq G\left[
\frac{Q(3/d_0+V_*/d_0^2)}{r_0^3}
+\frac{A_*}{r_0^2d_0^3}
\right].
$$

Together with $C_{B,1}$, this bounds both $\partial_T\mathscr F_i$ and $D_{\mathbf x}\mathscr F_i$. In particular there is a finite common receiver Lipschitz constant

$$
L=\sup_{i,T,\mathbf x}\|D_{\mathbf x}\mathscr F_i(T,\mathbf x)\|<\infty.
$$

A uniform modulus for these first derivatives is also available. For $g(T,\mathbf x,s)=\|\mathbf x-\mathbf X_j(s)\|-T+s$, the second derivatives entering the implicit-root formula satisfy

$$
\|g_{\mathbf x\mathbf x}\|\leq r_0^{-1},\qquad
\|g_{\mathbf x s}\|\leq V_*r_0^{-1},\qquad
|g_{ss}|\leq V_*^2r_0^{-1}+A_*.
$$

For two parameter directions $\lambda,\mu$,

$$
D\,s_{\lambda\mu}
=-\left(
g_{\lambda\mu}+g_{\lambda s}s_\mu
+g_{\mu s}s_\lambda+g_{ss}s_\lambda s_\mu
\right).
$$

Thus second root derivatives are uniformly bounded. Differentiating the row twice uses only these bounds and the supplied source jets through order three; its denominators are powers of $r$ and $D$, both bounded away from zero. The finitely many changed rows and uniformly convergent second stationary derivatives give a uniform second-derivative bound for the component fields. In particular their first derivatives are uniformly Lipschitz. No uniform continuity of third derivatives on an unbounded old-time interval is assumed.

This establishes the required common bounds before any evolution is posited. After subtracting the unbounded anchors, the field acts on bounded sequences of receiver displacements. Its uniform estimates make it continuous and locally Lipschitz in the supremum norm over all labels.

**Claim grade: derived conditional on the frozen complete certificates and block prescription.** Falsifiers are loss of a stated endpoint sign, a zero on an old complement with $u\geq a$, failure of the uniform stationary derivative estimate, or an unbounded finite-row derivative despite the displayed range, transmitter, and source-jet bounds. The unresolved auxiliary sector $u<a$ is handled next, not assumed empty here.

## 4. A common first interval of coupled evolution

### Conditional theorem

For any fixed two-target complete past satisfying Section 1, retain the block prescription and allow a globally $C^1$ join that is $C^3$ on each side. There is $h>0$, common to all labels, and a unique solution in the bounded local chart constructed below, satisfying

$$
\mathbf X_i(0)=\mathbf x_i,\qquad
\dot{\mathbf X}_i(0^+)=\mathbf v_i,\qquad
\ddot{\mathbf X}_i(T)=\mathcal A_i(X_{\leq T})
\quad(0<T\leq h).
$$

The acceleration on the right contains every positive-delay root of the appended history and the same stationary summation prescription. The new paths have uniform bounds on velocity, acceleration, and jerk, positive distinct-label separation, and a complete census with relaxed positive root margins. Every received emission on this interval is strictly before zero. The theorem selects no value for the exact zero-delay diagonal.

### Construction by a contraction

Choose $K=\max(K_0,\ell^{-1})$ and $\overline V=V_*+1$. Choose $h>0$ small enough that

$$
\begin{gathered}
h\leq\min(a,\rho),\qquad
\overline Vh\leq\rho/2,\qquad
Kh\leq\min(1,\eta/8),\\
(1+2\overline V)h\leq d_*/2,\qquad
Lh^2\leq1.
\end{gathered}
$$

All constants are finite and the upper bounds are positive; if $L=0$, its inequality is automatic. Thus a positive common $h$ exists. This is an explicit selection from proved bounds, not an assumed continuation interval.

Use the Banach space of continuous paths into $\ell^\infty(\mathbb Z^3;\mathbb R^3)$. The unknown bounded displacement is $\mathbf q_i(T)=\mathbf X_i(T)-\mathbf x_i$. On the closed set

$$
\|\mathbf q_i(T)-T\mathbf v_i\|\leq\tfrac12KT^2
\quad\text{for all }i,T,
$$

define

$$
(\Phi\mathbf q)_i(T)
=T\mathbf v_i+
\int_0^T(T-t)\mathscr F_i(t,\mathbf x_i+\mathbf q_i(t))\,dt.
$$

The position bound keeps every evaluation inside the field's parameter box. The $K_0$ estimate makes $\Phi$ a self-map. For two paths,

$$
\|\Phi\mathbf q-\Phi\widetilde{\mathbf q}\|_\infty
\leq\frac{Lh^2}{2}
\|\mathbf q-\widetilde{\mathbf q}\|_\infty
\leq\frac12\|\mathbf q-\widetilde{\mathbf q}\|_\infty.
$$

Successive iteration is Cauchy by this estimate; completeness supplies a fixed point, and the same strict inequality proves uniqueness. Differentiating its integral equation gives

$$
\|\ddot{\mathbf X}_i(T)\|\leq K_0,\qquad
\|\dot{\mathbf X}_i(T)-\mathbf v_i\|\leq KT,\qquad
\|\mathbf X_i(T)-\mathbf x_i-T\mathbf v_i\|\leq\tfrac12KT^2.
$$

The field's uniformly continuous first derivatives make this future $C^3$ and give a finite uniform jerk bound

$$
\sup_{i,T}\|\mathbf X_i^{(3)}(T)\|
\leq
\sup\|\partial_T\mathscr F_i\|
+\overline V\sup\|D_{\mathbf x}\mathscr F_i\|.
$$

### Why the auxiliary equation is the actual EOM here

The construction alone would not suffice if new roots appeared outside the retained old tubes. They can be excluded using the resulting velocity bounds.

For a distinct source with new emission $0\leq s<T$, release separation gives

$$
\|\mathbf X_i(T)-\mathbf X_j(s)\|
\geq d_*-2\overline Vh
>h\geq T-s.
$$

Thus no cross-source emission at or after release can reach a receiver during this interval. Distinct present positions also remain separated by at least $d_*/2$.

For a self channel, consider any chord with $-a\leq s<T\leq h$. On its old portion,

$$
\|\dot{\mathbf X}_i(t)-\mathbf v_i\|\leq A_*a\leq\eta/8,
$$

and on its new portion the same quantity is at most $Kh\leq\eta/8$. The joined path is $C^1$, so its chord velocity is the average of these velocities:

$$
\left\|
\frac{\mathbf X_i(T)-\mathbf X_i(s)}{T-s}-\mathbf v_i
\right\|\leq\eta/8.
$$

The speed separation at the cut implies

$$
\left|
1-\frac{\|\mathbf X_i(T)-\mathbf X_i(s)\|}{T-s}
\right|
\geq7\eta/8.
$$

There is consequently no self root whose emission is in $[-a,T)$. This argument applies to super-field as well as sub-field endpoint speeds and covers the small old-emission sector that the auxiliary parameter box could not exclude.

All remaining emissions have $s<-a$. The complete old complement argument in Section 3 excludes new roots there and retains exactly one root in each original tube. Hence the full positive-delay census is exactly the one used in $\mathscr F_i$. In particular, its source emissions satisfy $s<-w/2$; the old history, not any artificially frozen environmental future, supplies every arriving row.

Smaller tubes centered at the continued roots, of half-width $w/4$, lie within the original tubes. They have range at least $w/2$ and transmitter magnitude at least $\delta/2$. Outside them, the tube slope bound gives a residual gap at least $\delta w/8$. The old complements and the self-chord estimate supply a common remaining gap that can be chosen no larger than

$$
\gamma'=\min\{\gamma/2,\eta a/2,\delta w/8\}>0.
$$

On the self sector with total delay $0<T-s\leq a$, a normalized margin $\eta/2$ is valid. These are relaxed quantitative certificates for the complete appended past.

The fixed point is therefore a solution of the infinite coupled delayed system on a common first interval. The equations reduce to separate nonautonomous receiver ODEs on this interval because all arriving source histories have already been supplied. Every environmental future is nevertheless solved from its own EOM.

For precision, the uniqueness comparison class consists of globally $C^1$ appended paths with the same prescribed past and $\|\dot{\mathbf X}_i(T)-\mathbf v_i\|\leq KT$ for every label and time. This bound keeps them in the same receiver box and makes the preceding cross and self exclusions apply before using their EOM. Any solution in this class must therefore obey the auxiliary integral equation; its acceleration is bounded by $K_0$, so it belongs to the contraction set and is the fixed point already constructed. No uniqueness claim is made about singular or nonuniform continuations outside this comparison class.

**Claim grade: derived conditional local theorem, pending independent review.** A falsifier would be a new postrelease cross root despite the separation inequality, a near-cut self root despite the chord inequality, an old root missed by the continued-tube and complement argument, or failure of the displayed contraction for a field obeying its uniform bounds. Later root-chart failure does not falsify this first-interval conclusion.

## 5. Applying the cut tests to the existing bump control

Use the existing population-class control without changing its formula or support:

$$
\mathbf X_j(s)=\mathbf z_j+\varepsilon\ell\,\mathbf e_j\phi(s/\ell),
\qquad
\mathbf e_j=\mathbf0\quad(j\notin E),\qquad
\|\mathbf e_j\|\leq1\quad(j\in E).
$$

Here $\phi$ is the already allowed nonconstant $C^3$ bump supported in $(-2,-1)$. Retain its existing smallness bounds, including $\varepsilon\|\phi'\|_\infty<1/4$. All endpoint derivatives through order three vanish, and all release positions are their anchors. Every cross residual is strictly increasing, with one root; self residuals have no positive root. These are the supplied complete-history controls, not independently invented environmental pasts.

At a receiver anchor, if $\phi(-\|i-j\|)=0$, the stationary emission $s=-\ell\|i-j\|$ is still an exact root. Uniqueness then makes it the only root. Outside the two interior lattice distances $\sqrt2\ell$ and $\sqrt3\ell$, the profile and its derivatives vanish at this root, because its support lies strictly between delays $\ell$ and $2\ell$. Therefore a changed target can alter the acceleration or its reception-time derivative at the cut only for

$$
\mathcal N_j=\{i:\|i-j\|^2\in\{2,3\}\}.
$$

There are 12 integer displacement vectors of squared norm two and eight of squared norm three. The intersection $\mathcal N_0\cap\mathcal N_{e_1}$ consists of $(0,\pm1,\pm1)$ and $(1,\pm1,\pm1)$: subtracting the two squared-distance equations gives $2i_1-1=\pm1$, and the other two coordinates must each have magnitude one. Neither target belongs to this union. Thus

$$
|\mathcal N_0\cup\mathcal N_{e_1}|=20+20-8=32.
$$

All other environmental cut tests vanish exactly. The two targets also have zero cut acceleration and jerk: their mutual distance is $\ell$, their own positive-delay self rows are absent, and their unchanged stationary background cancels the unchanged mutual stationary row. Consequently smooth compatibility for this existing two-bump control is exactly the finite set of vector acceleration and jerk equalities on those 32 environmental labels.

### An exact mismatch within the existing family

Suppose the allowed profile has $\phi(-\sqrt2)\ne0$. Examine the existing receiver label $i=(-1,1,0)$, and take the allowed target direction $\mathbf e_0=(0,0,1)$. The other target direction remains arbitrary. The receiver is at distance $\sqrt2\ell$ from target zero and $\sqrt5\ell$ from target $e_1$. The second target's row is exactly stationary at the cut.

The first target's unique root tends to $s=-\sqrt2\ell$ as $\varepsilon\to0$. For sufficiently small nonzero $\varepsilon$, its sampled $\phi(s/\ell)$ is nonzero. Its displacement to the receiver has third component $-\varepsilon\ell\phi(s/\ell)$, whereas the stationary row had zero third component. The total environmental cut acceleration therefore has

$$
\big(\mathbf C_i^{(0)}\big)_3
=-\frac{G\sigma_i\sigma_0\,\varepsilon\ell\,\phi(s/\ell)}
{r^3|D|}\ne0.
$$

All other stationary contributions have zero combined correction. The prescribed left acceleration of this receiver is zero, so this member of the already specified control has no $C^2$ or $C^3$ EOM join. It does have the piecewise regular release of Section 4. No future path has been prescribed to produce this mismatch; it is a direct cut evaluation of the original bump family.

The first variation gives a broader diagnostic without replacing the exact test. At a stationary root, with $\mathbf n=(\mathbf z_i-\mathbf z_j)/d$,

$$
\left.\frac{d\mathbf F_{ij}^0}{d\varepsilon}\right|_{\varepsilon=0}
=G\sigma_i\sigma_j\left[
\frac{\ell(3\mathbf n\otimes\mathbf n-\mathbf I)\mathbf e_j}{d^3}
\phi(-d/\ell)
+\frac{\mathbf n(\mathbf n\cdot\mathbf e_j)}{d^2}
\phi'(-d/\ell)
\right].
$$

The corresponding reception-time derivative replaces $\ell\phi$ by $\phi'$ in the first term and $\phi'$ by $\phi''/\ell$ in the second. Nonzero values indicate failure of the appropriate cut constraint at first order; a vanishing linear test alone does not establish the nonlinear equality.

### A sufficient compatible subset of the same control

If the already allowed profile satisfies

$$
\phi(-\sqrt m)=\phi'(-\sqrt m)=\phi''(-\sqrt m)=0,
\qquad m=2,3,
$$

then the stationary root is exact for every channel, and its sampled source position, velocity, and acceleration equal their stationary values. All cut acceleration and jerk corrections vanish exactly for any two allowed target directions. Both target tests also vanish as above. Section 4 then gives a globally $C^3$ local join.

This is a sufficient jet condition on the original free profile, not a new selected profile or a necessary classification of every cancellation between the two sources. The original nonemptiness argument neither imposes these jet equalities nor rules them out. Without the actual profile and target directions, its smooth-release compatibility is therefore not determined.

**Claim grade: derived for the finite support, exact mismatch, and sufficient compatible subset.** Falsifiers are a nonstationary sampled row outside the stated support despite unique roots and the bump's support, a zero third-component correction under the mismatch assumptions, or failure of a cut equality despite the displayed vanishing sampled jets.

## 6. What the environmental response means

For general two-target pasts, the environment's initial right-hand acceleration is $\mathbf C_i^{(0)}$. The local solution gives

$$
\mathbf X_i(T)
=\mathbf z_i+\tfrac12\mathbf C_i^{(0)}T^2+O(T^3),
\qquad i\notin E,
$$

with a remainder uniform over labels because the jerk bound is uniform. Thus a nonzero environmental response is an output of the released EOM. Keeping every environmental future stationary would require its full time-dependent acceleration to vanish, a condition not implied even by zero initial acceleration and jerk.

Only two source histories differ from stationary in the supplied past. The appended future may move many or infinitely many environmental particles, and its support is not an independent datum. Nevertheless, during the first interval each stationary environmental source contributes its old stationary row. A changed receiver position is accounted for by $\mathbf B_i(\mathbf X_i(T))$; its acceleration is not obtained by pretending that this background is independent of the receiver.

More generally, a bounded continuation to any fixed $h$ with complete displacement bound $B_h$ has the conditional implication

$$
\|\mathbf z_i-\mathbf z_j\|>h+2B_h
\quad\Longrightarrow\quad
s=T-r<0
\quad(0\leq T\leq h).
$$

Outside a uniformly finite geometric core and the fixed set $E$, every sampled source is then still stationary in its sampled past. The first-interval theorem proves the bounds it needs without presupposing such a continuation; the displayed longer-time implication alone does not construct later intervals.

The theorem retains a complete displacement bound $B+\overline Vh$, speed bound $\overline V$, and finite acceleration and jerk bounds. These need not equal the original saturated constants. The initially stationary environment remains within its original positional envelope on a smaller interval satisfying $Kh^2/2\leq b$. A target already on the boundary of its original displacement envelope can move outward immediately. Exact preservation of all original inequalities therefore requires compatible initial slack or additional directional and derivative conditions; it has not been inferred from the relaxed local chart.

The first remaining issue for a specified initial control is precise. For a globally smooth release, evaluate its acceleration and jerk equalities; for the existing compact two-bump control they reduce to the 32-label finite test above. For a piecewise regular release, the mathematical first interval is available under the stated conditional prescription, but choosing that regularity as the working physical class remains an operator decision. Iterating beyond this first interval requires estimates when newly generated emissions can enter root tubes, including one-sided source-acceleration behavior at a nonsmooth release. Neither long-time regularity nor target contact is proved here.

## 7. Working record and integration boundary

This task writes only this analysis and its assigned scratch directory. The four mathematical input files were frozen before the new proof was written. The scratch manifest records their hashes and snapshot paths; a SHA-256 known case was passed before hashing them. Existing analyses, shared trackers, canonical laws, generated files, and summation decisions are read-only for this task.

The proof has three distinct outcomes: a derived conditional local existence theorem for the stated piecewise regular release; exact necessary and sufficient endpoint matches for that theorem's solution to join the supplied past in $C^3$; and an explicit cut adjudication within the existing two-bump control. It supplies no independent theorem-review acceptance, numerical EOM trajectory, new prescribed multiparticle example, physical class adoption, or statement that arbitrary independent distant-past perturbations arise dynamically.

The task-scoped checker first passed known cases before reading this target: two mathematical expressions and one file link, a fenced unmatched delimiter that must be ignored, invalid-macro and unescaped-spacing-command rejections, whitespace and control-character rejections, SHA-256 of a known string, the six unit lattice neighbors, and three closed-form one-root jerk substitutions. Its target run checks KaTeX syntax, relative file targets, delimiter balance, whitespace, the two lattice shells and their intersection, the conservative proof constants, and unchanged hashes of all frozen and live inputs. These are bounded syntax, arithmetic, and source-integrity checks; they do not independently adjudicate the infinite-dimensional theorem. Receipts are retained in the assigned scratch directory.

- `node .tmp/finite-perturbation-release-compatibility/check.mjs target` passed 219 expressions with KaTeX 0.16.47, four relative file targets, the shell union and proof-constant checks, and unchanged hashes for all four mathematical input files, as recorded in `validation.txt` in that scratch directory.
- `node scripts/validate-content.mjs --check --strict` reported zero errors, zero warnings, and 30 notes in the live repository scope; its output is retained as `content-validation.txt`. This is structural validation, not mathematical acceptance.
- `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/finite-perturbation-release-compatibility.md` produced no whitespace diagnostics for this new artifact. Its new-file difference exit status is distinct from a whitespace failure.

Coordinator integration should preserve the three-way distinction: smooth joining requires the exact cut matches; a piecewise regular release has the proved common first interval under the stated summation prescription; later evolution and physical class selection remain separate. The next mathematical review should examine the uniform old-root field, the near-cut self exclusion, and the stated uniqueness comparison class. For an actual chosen bump profile, the first data-specific obligation is its finite environmental cut test.
