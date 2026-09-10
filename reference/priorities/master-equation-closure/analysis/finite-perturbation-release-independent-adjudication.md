# Independent adjudication of finite-perturbation release compatibility

## Verdict and scope

Accept the [subject's](finite-perturbation-release-compatibility.md) conditional common-interval existence theorem, its stated bounded uniqueness class, its exact acceleration and jerk matching criterion, and its finite compatibility reduction for the existing two-target bump control. The proof constructs every environmental future as well as the two target futures. Its reduction to separate receiver equations is valid because a complete causal argument places every arriving emission in the already supplied past throughout that interval.

The regularity distinction is essential. A globally $C^1$ release that is $C^3$ on either side may have an acceleration or jerk jump. A globally $C^3$ join requires the two exact derivative matches at every label. Accepting the conditional theorem on the former domain does not adopt that domain physically or prove that an arbitrary member of the original globally $C^3$ history class has a smooth extension. The theorem supplies relaxed uniform bounds; it does not preserve every original saturated constant.

An explicit specialization of the existing free-profile two-target control satisfies every initial hypothesis and both cut matches; both target pasts are nonstationary. A second specialization of the same control gives a nonzero environmental acceleration at release and fails smooth joining. Section 6 makes every profile, direction, and amplitude explicit by reusing the compact polynomial already defined in the fixed derivative reference. These are instances of the existing control formula, not a new history class or a prescribed future.

| Claim | Adjudication | Exact boundary |
| --- | --- | --- |
| The stationary background and two changed source histories give a uniformly $C^2$ old-emission field. | Accept — derived. | The specified complete-block prescription, complete uniform root certificates, and bounded incoming jets are indispensable. |
| One positive lifespan works for all labels. | Accept — derived. | The lifespan comes from common field bounds and root/separation margins; no numerical duration is certified. |
| The auxiliary solution contains the full causal census. | Accept — derived. | Continued old tubes, the unbounded old complement, recent self chords, and every post-cut cross emission are checked separately. |
| The coupled solution is unique. | Accept at the stated bounded comparison scope. | Same complete past, matching position and velocity, piecewise classical regularity, and the common linear velocity bound. Singular or nonuniform continuations are excluded from this verdict. |
| Acceleration and jerk matching are necessary and sufficient for this solution's globally $C^3$ join. | Accept — derived. | Matching concerns every label, includes every positive-delay self root, and retains the target's stationary-background derivative. |
| Only 32 environmental labels can have nonzero cut corrections for the existing common-support two-bump control. | Accept — derived. | This is a finite set of potentially affected labels; it is not a claim that all 32 corrections are nonzero. |
| The displayed mismatch and vanishing-jet subset give different smooth-release verdicts. | Accept — derived. | The former fails $C^2$ matching; the latter suffices for exact $C^3$ matching. Neither is a classification of all profile/direction cancellations. |
| The theorem gives physical class adoption, arbitrary population perturbations, later continuation, or target contact. | Reject as an inference. | These are separate questions not settled by a first interval with fixed incoming emissions. |

This review reconstructs the mathematical argument independently. The subject's own checker is not used as evidence that the theorem is correct. The fixed references are the [population class](population-history-class.md), the [full-history derivative](population-history-derivative.md), the [admissibility adjudication](population-admissibility-independent-adjudication.md), and the [canonical Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form). Their scoped results are used below with their assumptions restated. No subject or reference is edited.

## 1. Fixed pasts and uniform stationary summation

Set $c_f=1$. The lattice has labels $i\in\mathbb Z^3$, anchors $\mathbf z_i=\ell i$, alternating signs $\sigma_i=(-1)^{i_1+i_2+i_3}$, and coefficient $G=\kappa q_0^2>0$. Only the complete pasts of $E=\{0,e_1\}$ differ from their stationary anchors. All pasts are $C^3$ on $(-\infty,0]$, with displacement at most $B=4\ell$ and derivative bounds

$$
V_*=4,\qquad A_*=256/\ell,\qquad J_*=65536/\ell^2.
$$

Write $\mathbf x_i=\mathbf X_i(0)$ and $\mathbf v_i=\dot{\mathbf X}_i(0^-)$. Distinct release positions have separation at least $d_*=\ell/8$. The initial certificate supplies all positive-delay roots of

$$
f_{ij}(u)=u-\|\mathbf x_i-\mathbf X_j(-u)\|.
$$

Its disjoint centered tubes have half-width $w=\ell/256$, range floor $w$, transmitter floor $\delta=1/4$, and ordinary complement gap $\gamma=w/4$. Self channels instead use $|f_{ii}(u)|\ge\eta u$ for $0<u\le\tau_0$, with $\eta=1/4$ and $\tau_0=2w$, before returning to the ordinary complement condition. No tube meets that self sector. Localization and tube packing bound each complete channel by $M=2050$ roots. All these are fixed hypotheses, not consequences of the proposed evolution.

For $\mathbf K(\mathbf y)=\mathbf y/\|\mathbf y\|^3$, the signed sum in each eight-label block is a mixed third finite difference. Repeated integration of three directional derivatives gives, at receiver distance $R$ from a far block,

$$
\|D_{\mathbf x}^k\mathbf B_{i,n}(\mathbf x)\|
\le C_kG\ell^3R^{-5-k},\qquad k=0,1,2.
$$

This follows from homogeneity: the $(3+k)$th derivative of the degree-minus-two kernel has degree $-5-k$ and is bounded on the unit sphere. A dyadic shell contains $O((R/\ell)^3)$ blocks, so the shell bounds are $O(GR^{-2-k})$, a summable geometric series. Receiver displacements are uniformly bounded and finitely many nearby or excluded-source blocks can be handled explicitly. Separation from each retained stationary anchor is at least $d_*$ at release. Thus the stationary field and its first two derivatives have common bounds over all receiver labels on small position balls.

To verify zero acceleration at an anchor under this particular prescription, pair $j$ with $2i-j$ in a cube centered at $i$. The signs agree and the vectors are opposite. The complete-block interior differs from that zero cube sum by faces, edges, and a corner. Their remaining alternating pairs yield, respectively, two, one, and zero kernel derivatives. The aggregate bounds are all $O(G/(\ell^2N^2))$ at cube radius $N\ell$. They vanish. This establishes equality of the prescribed complete-block sum with those symmetric cubes, without permitting arbitrary repartitioning of individual sources.

The finite changed-source set is crucial. A receiver sees at most $2M$ nonstationary old rows; all other incoming source histories are exactly stationary. The known discontinuity controls on the broad independent-history topology vary a growing number of sources and do not invalidate this fixed-support construction. No unrestricted infinite-history derivative is needed here.

**Grade: derived at the declared summation scope.** Falsifiers are failure of the mixed-difference identity, the vanishing boundary estimate, or a violation of a uniform stationary derivative bound while its finite excluded set and positive distance margins remain satisfied. Absolute divergence of individual-source norms is compatible with, and does not refute, this grouped result.

## 2. Persistence of old roots and construction of the field

Use the old emission coordinate $s=-u<0$ and put

$$
H_{ij}(T,\mathbf x,u)=T+u-\|\mathbf x-\mathbf X_j(-u)\|.
$$

The reverse triangle inequality yields a bound on the entire old past,

$$
|H_{ij}(T,\mathbf x,u)-f_{ij}(u)|
\le T+\|\mathbf x-\mathbf x_i\|.
$$

Choose the subject's constants

$$
a=\min\{\tau_0/2,\eta/(8A_*)\}=\ell/8192,
$$

$$
\rho=\min\{w/4,\delta w/[16(1+V_*)],\gamma/8,\eta a/8,d_*/8\}
=\ell/262144.
$$

For $0\le T\le\rho$ and $\|\mathbf x-\mathbf x_i\|\le\rho$, the residual changes by at most $2\rho$. On each old tube its endpoint magnitudes were at least $\delta w$, because the derivative has fixed sign and magnitude at least $\delta$. Range is now at least $w-\rho$, and the unit-vector comparison gives a transmitter change at most $2V_*\rho/w<\delta/2$. The two endpoint signs persist, and the derivative has its old sign throughout the tube. There is exactly one continued root. The new slope floor gives displacement of its center at most $4\rho/\delta<w/2$. Since an initial centered tube lies wholly in $u>0$, its continued root has $u>w/2$.

On cross complements the original $\gamma$ gap survives. On self complements with $u\ge a$, the available gap is at least $\min(\eta a,\gamma)$, which also survives the $2\rho$ perturbation. These estimates include arbitrarily old emissions. They deliberately do not exclude $0<u<a$ for an arbitrary receiver point in the parameter box; that exclusion must be proved on the evolved paths.

For the two changed sources define each row on its continued root by

$$
\mathbf a=\frac{G\sigma_i\sigma_j}{r^2|D|}\mathbf n,
\qquad D=1-\mathbf n\cdot\mathbf W,
\qquad \mathbf W=\dot{\mathbf X}_j(s).
$$

Add these finitely many rows to the stationary field with sources in $E$ and the stationary self label excluded. This defines $\mathscr F_i(T,\mathbf x)$. It includes actual positive-delay self roots of a changed target. A stationary source's root is $s=T-\|\mathbf x-\mathbf z_j\|<0$ in this box, and its exact row is its stationary kernel; hence the background is the exact old-emission contribution.

Here is an independent derivative bound. Let $r_0=w/2$, $d_0=\delta/2$, and $Q=1+V_*/d_0$. A direction $(t,\mathbf v)$ with $|t|+\|\mathbf v\|\le1$ gives

$$
ds=\frac{t-\mathbf n\cdot\mathbf v}{D},\qquad
d\mathbf R=\mathbf v-\mathbf W ds,\qquad
d\mathbf n=\frac{(I-\mathbf n\otimes\mathbf n)d\mathbf R}{r},
$$

$$
dD=-\mathbf W\cdot d\mathbf n-\mathbf n\cdot\mathbf A\,ds.
$$

Therefore $|ds|\le d_0^{-1}$, $\|d\mathbf R\|\le Q$, and

$$
\|d\mathbf a\|
\le G\left[
\frac{Q(3/d_0+V_*/d_0^2)}{r_0^3}
+\frac{A_*}{r_0^2d_0^3}\right].
$$

The three radial powers arise from differentiating the direction and inverse-square range; differentiating the transmitter factor supplies the velocity and acceleration terms. Both signs of $D$ are covered by $d\log|D|=dD/D$.

Second implicit root derivatives use derivatives of $g=\|\mathbf x-\mathbf X_j(s)\|-T+s$ bounded by $r_0^{-1}$, $V_*r_0^{-1}$, and $V_*^2r_0^{-1}+A_*$. Differentiating a row a second time adds source jerk, already bounded by $J_*$. Thus all component fields have a common second-derivative bound, which makes their first derivatives uniformly Lipschitz. A uniform continuity assumption on source jerk at arbitrarily old times is unnecessary.

In particular,

$$
K_0=C_{B,0}+\frac{8|E|MG}{\delta w^2}<\infty,
\qquad
L=\sup_{i,T,\mathbf x}\|D_{\mathbf x}\mathscr F_i\|<\infty
$$

are valid common magnitude and receiver-Lipschitz bounds. Subtracting anchors allows these fields to act on bounded sequences; the bounds just obtained give continuity and differentiability in the uniform sequence norm.

**Grade: derived conditional on the complete certificates.** A retained tube losing its root, an old complement gaining a root despite these margins, or an unbounded component derivative under the stated floors and jet bounds would falsify this construction. This section alone does not certify the recent self sector.

## 3. Common lifespan, complete appended census, and uniqueness

Put $K=\max(K_0,\ell^{-1})$ and $\overline V=V_*+1$. All of the following upper bounds are positive and independent of label:

$$
h\le\min(a,\rho),\quad
\overline Vh\le\rho/2,\quad
Kh\le\min(1,\eta/8),\quad
(1+2\overline V)h\le d_*/2,\quad
Lh^2\le1.
$$

Take a positive $h$ satisfying them. If $L=0$, the last constraint is omitted. In $C([0,h];\ell^\infty)$ use the closed set of displacements satisfying $\|\mathbf q_i(T)-T\mathbf v_i\|\le KT^2/2$. The map

$$
(\Phi\mathbf q)_i(T)=T\mathbf v_i+
\int_0^T(T-t)\mathscr F_i(t,\mathbf x_i+\mathbf q_i(t))\,dt
$$

is defined inside the position box: the displayed inequalities imply $\|\mathbf q_i(T)\|\le\overline Vh\le\rho/2$. Its magnitude bound makes it a self-map and

$$
\|\Phi\mathbf q-\Phi\widetilde{\mathbf q}\|_\infty
\le\tfrac12Lh^2\|\mathbf q-\widetilde{\mathbf q}\|_\infty
\le\tfrac12\|\mathbf q-\widetilde{\mathbf q}\|_\infty.
$$

Geometric convergence of the iterates in this complete space gives the unique fixed point. Differentiating its integral equation establishes $\|\ddot{\mathbf X}_i\|\le K_0$ and $\|\dot{\mathbf X}_i(T)-\mathbf v_i\|\le KT$. The uniformly Lipschitz first derivatives of $\mathscr F_i$ then give a uniformly bounded continuous right jerk. This constructs a common one-sided $C^3$ future before using any assertion about its full root census.

For a post-cut cross emission $0\le s<T\le h$, the resulting velocity bound gives

$$
\|\mathbf X_i(T)-\mathbf X_j(s)\|
\ge d_*-2\overline Vh>h\ge T-s.
$$

No such cross root exists. Distinct present positions remain separated by at least $d_*/2$.

For a recent self chord $-a\le s<T\le h$, old velocities differ from $\mathbf v_i$ by at most $A_*a\le\eta/8$, and new velocities by at most $Kh\le\eta/8$. The joined path is $C^1$, so its chord velocity is an average of these velocities. Since the initial normalized self margin implies $|1-\|\mathbf v_i\||\ge\eta$,

$$
\left|1-\frac{\|\mathbf X_i(T)-\mathbf X_i(s)\|}{T-s}\right|
\ge\eta-\eta/8=7\eta/8.
$$

This excludes every recent self root, including emissions before zero that were unresolved by the arbitrary receiver box. The argument uses closeness of the vector velocities to one vector, not an invalid inference from their individual speed magnitudes. It works for super-field and sub-field endpoint speeds alike.

All emissions further in the past are covered by the old tubes and complements. Recenter tubes with half-width $w/4$ around the continued roots; they fit in the original tubes because the center shift is below $w/2$. Their range and transmitter floors are at least $w/2$ and $\delta/2$. Within the removed outer parts of an old tube, the residual is at least $\delta w/8$. The old complement and chord estimates give an ordinary gap no smaller than a positive choice

$$
\gamma'=\min\{\gamma/2,\eta a/2,\delta w/8\},
$$

and normalized self gap $\eta/2$ on total delays at most $a$. Consequently the auxiliary field includes every actual positive-delay row, with no row at the excluded diagonal. All received source emissions are strictly before zero. This proves that the fixed point solves the full equations under the retained summation prescription, even though the equations decouple as receiver equations during this first interval.

For uniqueness in the subject's comparison class, impose the same past and the bound $\|\dot{\mathbf X}_i(T)-\mathbf v_i\|\le KT$. Apply the preceding root exclusions first to a competing piecewise classical solution. It must satisfy the same auxiliary equation, hence the integral equation, hence the contraction bound. This ordering avoids assuming root completeness from uniqueness. The verdict retains the stated piecewise $C^3$ solution domain; a merely $C^1$ path satisfying an acceleration equation only almost everywhere without absolute continuity of velocity would not be justified by this integration argument.

**Grade: derived conditional local existence and bounded uniqueness.** The cross-separation inequality, recent chord inequality, continued complete census, and strict contraction give direct falsifiers. Later loss of a root margin or appearance of newly generated emissions is outside the proved first interval. No unchanged original bound is claimed if it was saturated at release.

## 4. Exact matching at the release cut

Let $\mathbf a_i^-$ and $\mathbf j_i^-$ be the supplied left acceleration and jerk. The constructed solution has

$$
\mathbf a_i^+=\mathscr F_i(0,\mathbf x_i),\qquad
\mathbf j_i^+=\partial_T\mathscr F_i(0,\mathbf x_i)
+D_{\mathbf x}\mathscr F_i(0,\mathbf x_i)\mathbf v_i.
$$

Continuity of position and velocity is built into the integral equation. Therefore $\mathbf a_i^-=\mathbf a_i^+$ for every label is necessary and sufficient for this solution's $C^2$ join. Adding $\mathbf j_i^-=\mathbf j_i^+$ for every label is necessary and sufficient for its $C^3$ join, since both sides already have the corresponding continuous one-sided derivatives. No small numerical residual substitutes for these equalities.

Independently differentiating $r=T-s$ along receiver velocity $\mathbf v_i$ gives

$$
s'=\frac{1-\mathbf n\cdot\mathbf v_i}{D},\quad
\mathbf R'=\mathbf v_i-\mathbf W s',\quad
r'=1-s',\quad
\mathbf n'=\frac{(I-\mathbf n\otimes\mathbf n)\mathbf R'}r,
$$

$$
D'=-\mathbf W\cdot\mathbf n'-\mathbf n\cdot\mathbf A\,s',\qquad
\mathbf a'=
\frac{G\sigma_i\sigma_j}{r^2|D|}
\left[\mathbf n'-\mathbf n\left(\frac{2r'}r+\frac{D'}D\right)\right].
$$

For a stationary source this reduces to $G\sigma_i\sigma_jD\mathbf K(\mathbf R)\mathbf v_i$. For a locally affine radial source with signed speed $v$ and fixed receiver it reduces to $2G\sigma_i\sigma_jv\mathbf n/[r^3(1-v)|1-v|]$. These direct substitutions check the sign and absolute-transmitter differentiation without referring to the subject's implementation. The source acceleration appearing in jerk is evaluated at a strictly negative emission time and is known input.

At an environmental anchor all left derivatives vanish and $\mathbf v_i=0$. Subtracting the stationary cancellation leaves exactly

$$
\sum_{j\in E}(\mathbf F_{ij}^0-\mathbf S_{ij})=0,
\qquad
\sum_{j\in E}\partial_T\mathbf F_{ij}(0,\mathbf z_i)=0,
\qquad i\notin E.
$$

Here $\mathbf F_{ij}^0$ sums all actual cut roots from the changed source and $\mathbf S_{ij}=G\sigma_i\sigma_j\mathbf K(\mathbf z_i-\mathbf z_j)$. These are countably many tests for general changed complete histories, each with finitely many changed-source rows. A target at a displaced position has its own background and background derivative; the displayed environmental simplification cannot omit them.

**Grade: derived necessary-and-sufficient matching for the constructed solution.** A nonzero exact cut residual falsifies its smooth join, while leaving the piecewise regular theorem intact. A smooth join with a derivative mismatch would falsify the criterion itself.

## 5. Independent reconstruction of the 32-label reduction

The existing control is $\mathbf X_j(s)=\mathbf z_j+\varepsilon\ell\mathbf e_j\phi(s/\ell)$, with a nonconstant $C^3$ bump supported in $(-2,-1)$, $\mathbf e_j=0$ outside $E$, and $\|\mathbf e_j\|\le1$. Its four strict amplitude/jet bounds imply speed below $1/4$, so all cross residuals are strictly increasing with slope at least $3/4$ in the Lipschitz sense, and every self residual is at least $3u/4$. Release positions are the anchors and release derivatives through order three vanish.

If a lattice distance $d/\ell$ is not $\sqrt2$ or $\sqrt3$, the stationary emission $s=-d$ lies outside the bump support. Position, velocity, and acceleration at that emission are exactly stationary. It is an exact root and strict monotonicity makes it the only root. Thus both cut corrections vanish. This uses uniqueness to exclude a shifted root inside the bump; support alone would not have sufficed.

For each changed source the candidate labels have squared displacement norm two or three. Squared norm two means a permutation of $(\pm1,\pm1,0)$, giving $3\cdot4=12$ labels; squared norm three gives eight sign choices. In the intersection for centers $0$ and $e_1$, subtracting squared distances gives $2i_1-1\in\{-1,0,1\}$. It is odd, hence is $-1$ or $1$. Consequently $i_1=0$ or $1$, and in either case the other squared coordinates sum to two. The intersection is exactly

$$
\{(0,\pm1,\pm1),(1,\pm1,\pm1)\},
\qquad
|\mathcal N_0\cup\mathcal N_{e_1}|=20+20-8=32.
$$

Neither target is in the union. Their mutual row samples delay $\ell$, outside the support, and neither has a positive self root. Their full acceleration and jerk at the cut therefore vanish by stationary cancellation. The cut tests for this control reduce exactly to the two vector equations at the 32 environmental labels.

The subject's mismatch uses $i=(-1,1,0)$ and $\mathbf e_0=(0,0,1)$, with $\phi(-\sqrt2)\ne0$. The other target is at distance $\sqrt5\ell$, so its correction is zero. The first target root depends continuously on small $\varepsilon$ and samples nonzero $\phi$. Its third-direction correction is exactly

$$
-\frac{G\sigma_i\sigma_0\varepsilon\ell\phi(s/\ell)}{r^3|D|}\ne0.
$$

This proves failure of acceleration matching without relying on a truncated first variation. Conversely, $\phi=\phi'=\phi''=0$ at both $-\sqrt2$ and $-\sqrt3$ makes every stationary root exact and restores the sampled source position, velocity, and acceleration. Both cut tests then vanish identically for every label. That condition is sufficient, not necessary: correlated vector cancellations might supply other compatible members.

**Grade: derived for the finite reduction and both conditional controls.** A changed cut row outside the union despite unique roots, a vanishing displayed third component under its nonzero assumptions, or a nonzero jerk correction when all sampled source jets through acceleration are stationary would falsify the corresponding result.

## 6. Concrete-control assessment

The original two-target family leaves its bump profile free. A concrete member must fix that profile and the target directions before its cut compatibility can be reported; the sufficient jet condition alone is not a recorded numerical or symbolic instance. The following specializations keep the subject's history formula, two changed labels, support requirement, and smallness rules. The polynomial used to instantiate its free profile already appears in the fixed full-history derivative reference:

$$
\psi(t)=
\begin{cases}
t(1-t^2)^4,&|t|<1,\\
0,&|t|\ge1.
\end{cases}
$$

The fourth-order endpoint zero makes this function $C^3$. Expanding $t-4t^3+6t^5-4t^7+t^9$ and summing absolute derivative coefficients gives bounds $80,384,1728$ for its first three derivatives; directly $|\psi|\le1$. Both examples below use $\varepsilon=2^{-16}$ and $\mathbf e_0=\mathbf e_{e_1}=(0,0,1)$, with every other direction zero. The lattice scale $\ell>0$ and coefficient $G>0$ remain the declared fixed constants, and $c_f=1$.

### A nonstationary prescribed past with an exact smooth join

Take the already free profile to be

$$
\phi(t)=\psi\big(8(t+5/4)\big).
$$

Its support is $[-11/8,-9/8]\subset(-2,-1)$, and its first three derivative bounds are $640,24576,884736$. Hence the actual displacement, speed, acceleration, and jerk bounds of the two changed pasts are respectively

$$
2^{-16}\ell<\ell/32,\qquad
5/512<1/4,\qquad
3/(8\ell)<256/\ell,\qquad
27/(2\ell^2)<65536/\ell^2.
$$

The environment is stationary and every release position is its anchor. The all-channel monotonicity argument in Section 5 gives one cross root, no positive self root, and the original tube and complement margins with slack. The displacement bounds supply the original density conditions. The fixed stationary block prescription is unchanged. Thus this is a member of the exact existing initial class, not merely of a relaxed replacement.

Both $-\sqrt2$ and $-\sqrt3$ lie strictly to the left of the support. Their profile derivatives through second order vanish in neighborhoods, so all 32 environmental acceleration and jerk equations vanish exactly, as do the target equations. Every hypothesis of the conditional release theorem and the global $C^3$ matching criterion is satisfied. The past is nontrivial: at $s=-19\ell/16$, both targets have displacement $81\ell/2^{25}$ in the third direction, since $\psi(1/2)=81/512$.

This witness does not claim a nonzero immediate future. Indeed, $\sqrt2-11/8>1/32$, while the theorem chooses $h\le\rho=\ell/262144<\ell/32$. At stationary receiver anchors throughout that interval, no cut root advanced by $T$ has reached the bump support: distance-$\ell$ emissions are already later than it, and all larger lattice distances remain earlier. The all-channel root monotonicity persists. The stationary appended future therefore satisfies the full EOM there and is the theorem's unique bounded future. The nonstationarity is in the supplied complete past; a later response is not assessed.

### A nontrivial immediate response in the piecewise regular domain

For comparison within the same existing formula, set

$$
\phi(t)=\psi\big(4(t+3/2)\big)
$$

with the same directions and amplitude. Its support $[-7/4,-5/4]$ lies inside $(-2,-1)$, and its derivative bounds $320,6144,110592$ give still smaller speed, acceleration, and jerk than the preceding example. The original all-channel admission proof applies unchanged.

At $i=(-1,1,0)$, write $t=s/\ell$ for the unique root from target zero. The receiver's anchor displacement from target zero is perpendicular to the bump direction, so its exact range equation is

$$
t=-\sqrt{2+\varepsilon^2\phi(t)^2}.
$$

Since $|\phi|\le1$ and $\varepsilon<1/2$, this root lies strictly between $-3/2$ and $-\sqrt2$. Consequently $0<4(t+3/2)<1$, and $\phi(t)>0$. The other target's unique row at this receiver remains stationary at delay $\sqrt5\ell$. The exact third component of the environmental acceleration correction is therefore strictly negative by Section 5, whereas its left acceleration is zero. This is a concrete nonstationary two-target input with a nonzero immediate environmental response and a valid piecewise $C^3$, globally $C^1$ release. It has no globally $C^2$ or $C^3$ join with that same prescribed past.

These examples settle nonemptiness and distinguish which hypotheses each meets. They do not infer smooth compatibility of an unspecified operator-selected profile. They also do not establish a nonstationary immediate future within the globally $C^3$ compatible subset; the first example's immediate future is explicitly stationary.

**Grade: derived by exact substitution into the existing family.** Falsifiers are failure of any displayed support or derivative bound, an extra causal root despite the speed bound, a nonzero cut residual in the first specialization, or zero third-direction acceleration in the second despite its positive sampled profile. Choosing these free parameters is a control specialization for review, not adoption of the class or modification of its defining constraints.

## 7. Mathematical limit and evidence record

The next limitation is the entry of emissions generated after the release cut. The present proof avoids unknown source futures only because all arriving roots remain strictly in the fixed past. Once that separation fails, a new coupled delayed estimate is needed, including one-sided source-acceleration behavior if the cut is not globally $C^2$. No conclusion about that later regime, physical admission of the proposed piecewise domain, target contact, or arbitrary perturbations of infinitely many prescribed old histories follows here.

Five inputs were frozen before writing this adjudication. The subject SHA-256 is `23163d370e8d1827cc1e7e55aaf26550d9015f197344bcf3055d753256232cf7`; the four live reference hashes agree with the subject's frozen manifest, by `shasum -a 256` on those exact paths. Full paths and hashes are retained in `.tmp/finite-perturbation-release-review/input-digests.sha256`, with frozen copies beside it. Only this adjudication and its assigned scratch directory are authored.

The independent evidence consists of the mixed-difference and boundary estimates, uniform implicit-root bounds, the sequence-space contraction, the all-emission complement reconstruction, signed jerk differentiation, exact lattice-shell argument, and explicit substitutions within the existing bump family above. Syntax and arithmetic checks do not replace these derivations.

Before running the target check, `node .tmp/finite-perturbation-release-review/check.mjs known` passed two known formulas, one existing file link, a fenced unmatched-dollar exclusion, invalid-macro and trailing-whitespace rejections, enumeration of the six unit lattice neighbors, differentiation of $3+4x+5x^2$, and a known coefficient-sum bound. The receipt is `.tmp/finite-perturbation-release-review/known-check.txt`. This establishes the new arithmetic routines' controls before they inspect the target shells or profile bounds.

Measured validation: `node .tmp/finite-perturbation-release-review/check.mjs target` passed 219 KaTeX expressions, five relative file targets, delimiter and whitespace checks, the shell counts and 32-label union, both profile derivative bounds, and the conservative proof constants. The receipt is `validation.txt` in the assigned scratch directory. File-target checks do not resolve anchors or inspect browser layout. `shasum -a 256 -c .tmp/finite-perturbation-release-review/input-digests.sha256` returned `OK` for the subject and all four fixed live references. `node scripts/validate-content.mjs --check --strict` completed with zero errors, zero warnings, and 30 notes, recorded in `content-validation.txt`. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/finite-perturbation-release-independent-adjudication.md` emitted no whitespace diagnostics and returned 1 for the new-file difference. A failed rerun in these exact scopes would falsify the corresponding validation statement; the checks do not independently prove the infinite-dimensional theorem.

Recommended coordinator integration: accept the conditional common first interval and bounded uniqueness, preserve the exact smooth-cut matching requirement, and consume the 32-label reduction only for the existing support-limited two-bump family. Section 6 supplies explicit members of that family for both a smooth compatible prescribed past and an immediate but nonsmooth environmental response. The smooth member's first short future is stationary. A general nonstationary smooth future, entry of newly generated emissions, physical regularity selection, invariant-class preservation, and contact remain separate. No manuscript, shared tracker, canonical equation, or source analysis is changed by this review.
