# Independent six-pole release and continuation reference

**Derived; awaiting separate adjudication.** All three selected six-pole preparations have the same canonical release acceleration and inward normal support. The opposite-cap pattern slows at first order. The common-rotation and broken-antipodal patterns have zero first speed derivative and positive second speed derivative. Each preparation has an actual normally constrained continuation through physical $T=1/10$, with thirty complete ordinary partner roots, no positive-delay self root, and strictly inward support throughout. All six speeds remain equal within each pattern by its own full-history symmetry, including the broken-antipodal pattern. This does not mean speed is constant or that the pole arrangement remains an octahedron.

## Frozen scenario and independence

The [six-pole packet](spherical-three-three-six-pole-plan.md) is the exact selected problem: $K=c_f=1,R=10$, positrinos at positive coordinate poles, electrinos at opposite poles, initial speed $1/2$, and only normal sphere support. Its 9208-byte SHA-256 `b66ecf15b903624c2007228f8613df59f52d40ae83378c6beee1c269da4b8b43` was matched by `shasum -a 256` before this work. No new six-pole peer subject has been read before this reference freeze.

Dispatch `4fff7460-d459-4f29-aa1d-12f35833684d` was admitted untruncated at 2026-10-10 22:28:23.899 UTC. Its 2947-byte payload hash is `fe3784e9f7ef200511d8532f9346a0e728de69ae0515f9756050ced7203d86e8`; payload verification passed and provider transport verification remained false. The existing Ramon E. Moore lens is used for full-past root and strict-domain reasoning, not as acceptance authority. Earlier hexagon files remain unchanged and are not this problem's history.

Put $t=T/10$, $\mathbf y_i=\mathbf X_i/10$, and $u_i=|\mathbf y_i'|$, which equals physical speed. Write $\mathbf n_i=\mathbf y_i(0)$, $\mathbf d_i=2\mathbf y_i'(0)$, and polarity $\sigma_i$. For a positive axis $a$, define

$$
\mathbf b_{P_a}=\frac{\mathbf e_b+\mathbf e_c}{\sqrt2},\qquad
\mathbf b_{E_a}=-\mathbf b_{P_a},\qquad \{a,b,c\}=\{x,y,z\}.
$$

Thus $\mathbf b_i$ is the selected opposite-cap direction. Common-rotation directions are the normalized $\mathbf w\times\mathbf n_i$, with $\mathbf w=(1,1,1)/\sqrt3$. Broken-antipodal directions retain those on positive axes and copy them without sign reversal to opposite poles. Both rotational choices have $\mathbf d_i\cdot\mathbf b_i=0$; the cap choice has $\mathbf d_i=\mathbf b_i$.

## Preparation controls and complete release roots

The supplied scalar angle is

$$
\theta(s)=\tfrac12s(1+4s)^3\quad(-1/4\le s\le0),
$$

with zero earlier. Its exact derivative is $\theta'=\tfrac12(1+4s)^2(1+16s)$, giving $-1/8\le\theta'\le1/2$ and $-27/2048\le\theta\le0$. With $r=s+1/4$, the seam expression is $\theta=-8r^3+32r^4$, so two derivatives match stationary history. The preparation is $C^2$ at that seam and ends at the required tangent speed $1/2$.

Known analytical controls are $\mathbf n=\mathbf e_x,\mathbf d=\mathbf e_y$ (unit tangent), $\mathbf d=\mathbf n$ (invalid radial direction, rejected), $\theta'(0)=1/2$, and the nonzero value/derivative $\theta(-1/8)=-1/128$, $\theta'(-1/8)=-1/8$. These distinguish the selected coefficient from a normalization error that a zero-seam check alone cannot detect. All three vector patterns have unit norm and tangent dot product zero by the displayed cross-product or coordinate formulas; no renormalization is applied.

At release, the four non-antipodal partners have candidate emissions $s=-\sqrt2$ and the opposite partner $s=-2$. All are in the supplied stationary past. Global preparation speed at most $1/2<1$ makes the causal residual strictly monotone over the entire past, so these are the unique partner roots, not selected roots from an incomplete search. The transmitter weight is exactly one. There are five roots per receiver and thirty directed partner roots. A positive-delay self root would require a chord equal to elapsed time while its path length is at most half that time, impossible. This proof includes the full infinite stationary past and the moving preparation.

## Independent static field and release projections

As long as the partner roots read stationary poles, define the dimensionless canonical field

$$
\mathbf G_i(\mathbf y)=\sum_{j\ne i}\sigma_i\sigma_j\frac{\mathbf y-\mathbf n_j}{|\mathbf y-\mathbf n_j|^3},\qquad \mathbf A_i=\mathbf G_i/100.
$$

This is the canonical acceleration kernel with the receiver's own label omitted; no positive-delay self contribution is inserted. At a positive pole, the antipodal partner contributes $-\mathbf n_i/4$. Each other positive/negative axis pair contributes minus its unit axis divided by $\sqrt2$. Applying inversion and global polarity reversal gives the same formula at negative poles:

$$
\mathbf G_i(\mathbf n_i)=-\mathbf n_i/4-\mathbf b_i.
$$

Hence every pattern has

$$
\mathbf A_i(0)=-\mathbf n_i/400-\mathbf b_i/100,\qquad
\mathbf A_{i,\mathrm{tan}}(0)=-\mathbf b_i/100,
$$
$$
\lambda_i(0)=-\frac{(1/2)^2}{10}-\mathbf n_i\cdot\mathbf A_i(0)=-9/400,
$$
$$
\mathbf X_i''(0)=-\mathbf n_i/40-\mathbf b_i/100.
$$

The nonzero tangent acceleration prevents interpreting this as a static equilibrium. Negative $\lambda$ is inward support. It supplies no physical support mechanism and does not constrain the speed to its initial value.

## First nonzero speed derivatives

On the stationary-source interval, the dimensionless constrained equation is

$$
\mathbf y_i''=g[\mathbf G_i-(\mathbf y_i\cdot\mathbf G_i)\mathbf y_i]-u_i^2\mathbf y_i,\qquad g=1/10.
$$

Consequently $u_i'=g\mathbf d_i\cdot\mathbf G_i$ at release. For the cap pattern this is $-1/10$, or in physical time

$$
\frac{du_i}{dT}(0)=-1/100.
$$

For both rotational direction patterns, the first derivative vanishes. Derive the next derivative directly, retaining the normal contribution to direction change. The static-field Jacobian at the pole is

$$
J_i=-I/8+3\mathbf n_i\mathbf n_i^{\!T}/8
+\tfrac32(\mathbf n_i\mathbf b_i^{\!T}+\mathbf b_i\mathbf n_i^{\!T}).
$$

Indeed the antipodal term is $-I/8+3\mathbf n_i\mathbf n_i^{T}/8$; each other signed pair cancels its identity part and leaves $3/(2\sqrt2)$ times the corresponding mixed axis dyad. For any unit tangent $\mathbf d$, $\mathbf d^TJ_i\mathbf d=-1/8$.

When $u_i'(0)=0$, the direction derivative is $\mathbf d_i'=\mathbf y_i''/u_i=-\mathbf b_i/5-\mathbf n_i/2$. Therefore

$$
u_i''(0)=g\left[(-\mathbf b_i/5-\mathbf n_i/2)\cdot(-\mathbf b_i-\mathbf n_i/4)
+\tfrac12\mathbf d_i^TJ_i\mathbf d_i\right]
=\frac1{10}\left(\frac{13}{40}-\frac1{16}\right)=21/800.
$$

Physical time introduces two factors $1/10$, giving

$$
\frac{d^2u_i}{dT^2}(0)=21/80000>0.
$$

Thus the cap speed is $1/2-T/100+O(T^2)$, whereas the common-rotation and broken-antipodal speeds are $1/2+21T^2/160000+O(T^3)$. These are local Taylor statements on an actually existing smooth solution, not future prescribed paths. They prove opposite initial drift signs on some nonzero right neighborhood, without asserting monotonicity across the entire explicit continuation interval below.

## Uniform actual interval and whole-history root closure

A common independent enclosure works for all three cases. Bootstrap on $0\le t\le1/100$ with $2/5<u_i<3/5$. Then $|\mathbf y_i(t)-\mathbf n_i|<3/500$. Every receiver is more than

$$
\sqrt2-3/500>697/500>1
$$

from each distinct partner's stationary pole. The candidate stationary-source root therefore satisfies

$$
s=t-|\mathbf y_i-\mathbf n_j|<1/100-697/500=-173/125<-1/4.
$$

It genuinely lies in the supplied stationary past. The complete past, including all released segments in the bootstrap, has speed below $3/5$. Strict causal monotonicity proves these candidates are the only partner roots and excludes every alternative moving-preparation or positive emission. The self path-length contradiction remains valid. Transmitter factors are exactly one; receiver factors are greater than $2/5$. Current pair separation is greater than $\sqrt2-3/250>0$.

Since all five stationary source distances exceed one, $|\mathbf G_i|<5$. On the exact sphere the projected equation gives

$$
|\mathbf y_i''|<g\,5+(3/5)^2=43/50.
$$

Integration improves the speed bootstrap to

$$
1/2-43/5000<u_i<1/2+43/5000,
$$

strictly inside $(2/5,3/5)$. The displacement bound is also strict. The static vector field is smooth at every receiver, and the tangent initial data plus normal constraint preserve the sphere. These strict margins close actual constrained continuation through $t=1/100$, or physical $T=1/10$. This is a local ordinary differential equation obtained from a proved all-root history domain, not a competing numerical solver.

No preparation arrival occurs on this interval. The root margin below the preparation seam exceeds $173/125-1/4=567/500$. All thirty roots remain stationary-source roots throughout. The delayed initial histories still matter to completeness, even though their moving parts have not yet arrived.

## Inward support on the explicit interval

For each receiver the omitted-self static field has Jacobian operator norm below ten along the segment from its pole to its actual position: each kernel derivative has norm $2/d^3<2$. Therefore

$$
|\mathbf G_i(\mathbf y_i)-\mathbf G_i(\mathbf n_i)|<10(3/500),
$$
$$
|\mathbf y_i\cdot\mathbf G_i(\mathbf y_i)-\mathbf n_i\cdot\mathbf G_i(\mathbf n_i)|<15(3/500)=9/100.
$$

Also $|u_i^2-1/4|<(11/10)(43/5000)=473/50000$. For scaled support $10\lambda_i=-u_i^2-g\mathbf y_i\cdot\mathbf G_i$, its change from $-9/40$ is below

$$
473/50000+9/1000=923/50000.
$$

Thus throughout physical $0\le T\le1/10$,

$$
-12173/500000<\lambda_i<-10327/500000,
$$

and in particular $-1/40<\lambda_i<-1/50<0$. No support zero occurs on this admitted interval. The segment derivative bound concerns each receiver's canonical omitted-self field; it does not insert its own stationary pole as a source.

## Full-history symmetry and equal-speed verdict

Spatial pole symmetry alone is insufficient; verify the preparation directions too. The canonical law and normal constraint are equivariant under orthogonal spatial maps and a simultaneous global polarity reversal, because polarity products are unchanged. The complete supplied histories transform when both $\mathbf n_i$ and $\mathbf d_i$ transform.

For common rotation and opposite-cap motion, cyclic coordinate permutation and inversion preserve all position/direction histories, inversion accompanied by global polarity reversal. Together they act transitively on the six labels. Local uniqueness therefore preserves equal simultaneous speed norms among all six members in each pattern on the admitted actual interval.

Broken-antipodal directions are not inversion invariant. They nevertheless have another transitive symmetry: cyclic coordinate permutation and $Q=-P$, where $P$ exchanges the x and y axes. The latter maps each positive axis to a negative axis with global polarity reversal. For positive rotational directions, the cross-product transformation with $\det P=-1$ gives

$$
Q(\mathbf w\times\mathbf e_a)=-P(\mathbf w\times\mathbf e_a)
=\mathbf w\times P\mathbf e_a.
$$

That is exactly the copied direction at the destination negative pole; the same check maps negative to positive directions. Thus both the pole and direction data, and hence the full supplied history, are preserved. These transformations are transitive on all six labels. Equal speeds therefore remain equal for the broken-antipodal case too. Breaking antipodal velocity pairing is not enough to break all transitive history symmetry.

Moreover the positive receivers in common-rotation and broken-antipodal cases have identical initial data and identical static omitted-self equations on the proved interval. Their actual positive-member trajectories coincide there by uniqueness. Combined with within-pattern equal-speed symmetry, both patterns have exactly the same speed function on this interval. This equivalence is restricted to the proved stationary-source domain; no equality after reception of differing moving histories is inferred.

## Controls, grades and remaining scope

All scientific claims above are derived analytically, not measured trajectories. No new numerical instrument, target run, scientific job, process lease or extra agent is used. The initial norm/tangency and nonzero scalar-history controls are displayed before target projection reasoning. The invalid radial direction is the negative control; the self path-length contradiction is an independent root-exclusion control. Exact stationary source times and the static signed-pair sum are independent mathematical references for future implementations.

Falsifiers are a failed vector normalization or tangent dot product, wrong preparation coefficient, omitted causal root or self contribution, unavailable stationary history, failed strict continuation margin, incorrect Jacobian or normal contribution to the speed derivative, wrong radius/time factor, or a symmetry map that fails on a preparation direction. The inward-support enclosure is local. The speed Taylor signs are not asserted over all of $T\le1/10$. No full later preparation-reception proof, stability spectrum, recurrence, energy law, free confinement or support provider follows.

Only this new reviewer reference and authorized bundle diagnostics are written. No EOM capability claim or software-interface audit is made in this reference; analytical continuation is sufficient for its stated scope. Scientific cost is unprofiled, local storage does not establish recoverability, and no machine interval certificate is claimed. Issued commands are terminal without a global process-idleness assertion. The unchanged exploration cutoff is 23:26:02 UTC and hard closeout is 23:41:02 UTC on October 10, 2026. The next dependency is separate adjudication and the coordinator's frozen comparison target; no successor is self-selected.
