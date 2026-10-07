# Independent reconstruction of the N02 physical-history departure argument

**Frozen before prior circle or neighborhood adjudications.** This is an analytical audit of the exact retained N02 case under the unchanged canonical law, $K=c_f=1$. It uses the [flow subject](authorized-cases-ten-hour-d-circle-flow-reference.md), [neighborhood subject](authorized-cases-ten-hour-d-followup-n02-neighborhood.md), their [fixed case/method](authorized-cases-ten-hour-d-followup-n02-method.md), and the independently accepted [exact balance and characteristic inventory](../../braid-program/analysis/ring-inventory-independent-adjudication-2026-10-03.md). It does not recompute balance, roots, spectrum or a trajectory. The certified growing common-radius/phase mode is mirror-preserving; no nonmirror eigenvalue is supplied or inferred.

## Analytical controls and the theorem being used

Three exact controls fix the interfaces before assessing the N02 construction.

First, for any smooth position perturbation $p(s)$, define its rotating velocity perturbation by $v(s)=p'(s)+\Omega Jp(s)$. The physical identity then holds identically. In particular, for $p(s)=s^2\chi(s)c/2$ with $\chi=1$ near zero, $p(0)=p'(0)=v(0)=0$ and $v'(0)=c$. A correction of this form changes precisely the endpoint acceleration compatibility while preserving present position and velocity. If its support is later than every admitted source time, all those delayed values are unchanged as well.

Second, a constant-delay linear equation with history horizon $H>d$ depends only on its initial restriction to $[-d,0]$. Two histories identical on that restriction have identical future solutions. If one is an exact characteristic history and the other is cut off only before $-d$, their future characteristic solutions coincide, and their full history segments coincide after time $H$. This elementary uniqueness control explains the required waiting step; merely projecting the truncated initial history onto a spectral eigenspace would not give the same conclusion.

Third, the nonnormal matrix

$$
L_M=\begin{pmatrix}2&M\\0&1/2\end{pmatrix}
$$

has growing eigenspace spanned by $(1,0)$ and complementary eigenspace spanned by $(-2M/3,1)$. In eigenvector coordinates the exact multipliers are $2$ and $1/2$, while coordinate/projection norms become arbitrarily poor as $|M|$ grows. Thus a growing eigenvalue supports an adapted-norm argument but supplies no uniform numerical perturbation radius by itself. The diagonal-coordinate cone calculation is exact; adding a norm-bounded remainder yields the inequalities below.

The external mathematical input was checked directly in [Hartung–Krisztin–Walther–Wu, Theorem 3.2.1](https://aimath.org/WWN/variabletimelag/sur0b.pdf). For an open $C^1$ history domain, continuous differentiability of the functional, bounded derivative extensions to $C^0$ directions, and joint continuity of their evaluation yield the endpoint-compatible solution manifold and differentiable fixed-time maps. Their tangent derivative is the variational equation. Operator-norm continuity of moving evaluations on $C^0$ is not assumed. [Stumpf, Theorem 4.1](https://www.math.u-szeged.hu/ejqtde/p5301.pdf) independently states instability from a positive generator eigenvalue. The stronger physical-history and orbital conclusions here require the case-specific construction below, not merely that theorem's conclusion. These are mathematical tools; none of either paper's physical examples enters the law.

## First-order regularity and the two denominators

Use $z=Q(-\Omega t)X$, $w=Q(-\Omega t)V$ and ambient space $C^1([-1,0],\mathbb R^{12})$. The ambient components must remain independent when differentiating the functional. Physical histories satisfy

$$
z'=w-\Omega Jz.
$$

Because both $z$ and $w$ are $C^1$, the right side is $C^1$, so physical $z$ and $X$ are $C^2$. Endpoint compatibility makes physical acceleration continuous at release. This does not follow from a bare $C^1$ position history, and the theorem does not use that weaker data class.

For a selected delay $a$, write $S=z_i(0)-Q(-\Omega a)z_j(-a)$ and $F=a-|S|$. Direct differentiation gives

$$
\partial_a S=Q(-\Omega a)(\Omega Jz_j+z'_j)(-a),
\quad D_c=1-n\cdot Q(-\Omega a)(\Omega Jz_j+z'_j)(-a).
$$

The acceleration denominator is instead

$$
D_v=1-n\cdot Q(-\Omega a)w_j(-a).
$$

They coincide on physical histories and at the reference, but not on arbitrary ambient histories. For example, keeping $z$ constant while varying the independent $w$ changes $D_v$ without changing the geometric clock derivative. The subject correctly keeps them distinct. A small ambient neighborhood preserves the nonzero signs of both denominators at each reference root.

The implicit root derivative is

$$
Da[\xi]=
\frac{n\cdot(\xi_{z_i}(0)-Q(-\Omega a)\xi_{z_j}(-a))}{D_c}.
$$

Differentiating the acceleration row introduces delayed values of $\xi_z,\xi_w$ and this scalar. Differentiation with respect to the root introduces background $z'$ and $w'$ only as coefficients. No derivative of the variation occurs. Thus the derivative extends to bounded linear maps on $C^0$ directions. If base histories converge in $C^1$, their background coefficients and delays converge; if directions converge in $C^0$, their moving evaluations converge jointly. The required extension condition follows without the false claim of operator-norm continuity of point evaluation on $C^0$.

The endpoint-compatible manifold has tangent condition $\xi'(0)=Df(h_0)\xi$. Its physical kinematic subset contains the constructed histories and is preserved on generated segments by the first equation. The subset requiring a particular old cutoff is a class of initial preparations; it is not asserted invariant as a fixed moving-window subset after one time step. The complete older history remains attached to the same absolute-time path.

## Complete roots, including self and old history

The exact reference is the interval-certified circle, not the printed decimal center. It has eight directed ordinary roots: three partner hits and one positive-delay self hit per receiver. The local chart must preserve this entire census.

The near-zero self exclusion uses geometric velocity, not a subfield chord argument: the projected reference displacement divided by delay exceeds $2.8$ on $0<a\le0.01$, and a sufficiently small $C^1$ neighborhood retains a lower bound above two. Hence the self gap cannot vanish there. Partner separation retains a positive margin on the same interval. The diagonal $a=0$ is not an ordinary root.

On the remaining compact delay interval, isolate every simple reference root. Endpoint signs and a fixed derivative sign retain exactly one root in each isolating neighborhood. The absolute gap has a positive minimum on their compact complement; continuity excludes additional roots there. This complement step cannot be replaced by the implicit-function theorem alone.

Every complete position, including the fixed old circle and already generated history before exit, stays below $0.1$ in norm. Therefore for $a\ge1$ the displacement is below $0.2<a$, excluding every older root. The old circle cannot be discarded merely because the finite functional uses horizon one. Continuous-time chart control supplies the same position bound on every generated segment up to the departure event.

## Physical nonmirror preparation and exact compatibility repair

Let the positive characteristic root be $\lambda$ and its full physical state mode be $e^{\lambda s}q$. Cut off its position only before the entire relevant linear delay window, then define velocity kinematically. The characteristic identity makes the release compatibility defect quadratic along this smooth parameter family. Although the functional is only claimed $C^1$ on the general history space, its restriction to the chosen smooth finite-parameter histories and simple roots has the second parameter derivatives needed for this particular quadratic estimate.

The added common position $\eta^2s\chi(s)d_0$ changes common present physical velocity by $\eta^2d_0$ and leaves present position unchanged. It is supported in a common root-free recent interval. A fixed translation cannot remove a nonzero common velocity; a boost is not an admitted symmetry. The subsequent $s^2\chi(s)c_i/2$ correction is chosen with the explicit sign

$$
c_i=\mathcal A_i(h)-\Omega Jw_i(0)-w_i'(0)
$$

before repair. It changes $w_i'(0)$ by $c_i$ and leaves the right side and all delayed source values unchanged. Persistence of the full root chart excludes any new near-endpoint roots, so compatibility is repaired exactly. These coefficients are $O(\eta^2)$ and do not change the leading characteristic tangent.

In the stated ambient history norm the common endpoint-velocity functional has norm at most one. Hence the relatively open physical compatible ball of radius $c\eta^2$, where $c\le|d_0|/4$, retains common velocity of norm at least $3|d_0|\eta^2/4$. The ball is relative to the actual physical/compatibility class and fixed old extension; an arbitrary ambient ball would contain inadmissible histories.

## Compact time map and a nonnormal expanding cone

At the constant rotating equilibrium, the extended derivative is a finite constant-delay state equation with bounded evaluation coefficients. For a fixed time $\tau>1$, bounded $C^1$ initial histories yield bounded state values, first derivatives and second derivatives on the positive-time output window. The linear equation and its differentiated finite-delay equation provide these bounds. Thus output histories and their first derivatives are bounded and equicontinuous, making the linear time map compact in $C^1$. No compactness assertion about the nonlinear map is required.

The full characteristic history is an eigenvector with multiplier $e^{\lambda\tau}>1$. Choose a modulus cut above one and below this multiplier, avoiding the compact operator's spectrum. The outer Riesz space is finite-dimensional and contains all multipliers outside the cut, not merely the known witness. If $L_u,L_c$ are the restricted maps, choose numbers

$$
r(L_c)<b<a<r(L_u^{-1})^{-1},\qquad a>1.
$$

Equivalent norms can be constructed from $\sup_{n\ge0}b^{-n}\|L_c^nv\|$ and $\sup_{n\ge0}a^n\|L_u^{-n}u\|$. Their finiteness follows from the strict spectral inequalities; they give $|L_cv|\le b|v|$ and $|L_uu|\ge a|u|$. This treats possible nonnormality and allows the complement to contain weaker growing modes. The projection and equivalence constants are not numerically determined by the one certified root.

In a manifold chart write $F(z)=Lz+R(z)$ with $|R(z)|_*\le\delta|z|_*$, where $\delta\le\min(a-1,a-b)/4$. On $|v|\le|u|$,

$$
|u_+|\ge(a-\delta)|u|,
\qquad |v_+|\le(b+\delta)|u|<(a-\delta)|u|.
$$

The cone is invariant and its outer component expands by $q=a-\delta>1$. The zero-remainder nonnormal control above becomes exactly this calculation in adapted coordinates.

The truncated tangent differs from the full eigenhistory only before the largest relevant initial delay. Its linear future difference is zero, and after $\tau>1$ the full moving history difference is zero. Therefore the first nonlinear time map applied to the prepared curve is $\eta v_*+o(\eta)$ with $v_*\ne0$ in the outer space. Only an $o(\eta)$ flow remainder is justified, not a quadratic one. Local Lipschitz continuity of this fixed-time map adds at most $L_1c\eta^2$ for the whole admissible ball. The subject's smallness conditions make the total error at most $m|\eta|/4$, so all members enter the cone with outer component at least $3m|\eta|/4$.

## Continuous-time exit and the rigid orbit

Choose a fixed cone radius $r$ small enough that the whole first-step and subsequent length-$\tau$ evolutions stay inside the larger complete-root chart. Joint local flow continuity at the equilibrium on this compact time interval supplies such uniform moduli. Also choose the coordinate chart through radius $2Ar$, where $A\ge\|L\|_*+\delta$ and $A\ge2$. Then the first discrete exit has norm between $r$ and $Ar$, and its preceding continuous segment remains in the admitted root chart. The expanding estimate and the first-step lower bound give the stated upper count

$$
\left\lceil\frac{\log(2r/(m|\eta|))}{\log q}\right\rceil
$$

after the first step. This is a qualitative logarithmic bound with unevaluated constants, not a numerical N02 time certificate.

Spatial translations and proper rotations of the complete exact circle give bounded variational histories in rotating coordinates. A strictly expanding projection of such a tangent must vanish; otherwise its forward iterates would be unbounded. Thus the rigid orbit has zero outer tangent. In a general $C^1$ manifold chart this implies an $o(\|\sigma\|)$ outer component, enough for the subject's $|P_u\sigma|\le|\sigma|_*/8$. A quadratic estimate is available if a linear graph chart or an ambient linear extension of the projection is chosen; it is not a consequence of arbitrary $C^1$ chart regularity alone.

For a cone exit point $z$, a hypothetical orbit point with $|z-\sigma|_*<|z|_*/4$ has $|\sigma|_*<5|z|_*/4$ and hence

$$
|P_u(z-\sigma)|>\frac{27}{32}|z|_*,
$$

contradicting that closeness. Coordinate Lipschitz bounds convert the resulting local orbit distance to physical-history distance. The full rigid orbit has no hidden far representatives approaching $h_0$: its common present position identifies the translation, and its rotation parameter lies in compact $SO(3)$. On a nontrivial full circular history, fixing all position vectors fixes the proper rotation. The orbit map is therefore a local embedding with positive separation from the complement of a chosen local parameter neighborhood. This supplies the additional far-orbit distance margin used by the subject.

The proved distance is in $C^1$ position/velocity history space, equivalently a $C^2$ physical-position history norm on the kinematic class. It is not automatically an instantaneous configuration-distance statement. The departure is orbital with respect to rigid Euclidean motions; it does not quotient boosts or alter the fixed initial remote history.

## Preliminary disposition before cross-assessment

The case-specific requirements above form a coherent local nonlinear-departure argument for relatively open nonmirror preparation neighborhoods. No omitted derivative of a variation, suppression of the two positive self roots, nonphysical velocity prescription, unjustified quadratic flow remainder, orthogonal spectral assumption or chart-exit shortcut is needed. The original flow source's quadratic symmetry phrasing needs the graph-chart interpretation just described; the neighborhood theorem already uses only the weaker consequence justified by differentiability.

The accepted exact balance, complete reference ledger and positive characteristic witnesses remain inherited evidence. Numerical constants for the root chart, projections/adapted norm, finite-time flow moduli and orbit distance remain uncomputed. The theorem does not prove that every nonmirror perturbation departs, identify a new transverse eigenmode, preserve asymmetry forever, or classify later fate.

Falsifiers are an incorrect exact reference, an extra root outside the retained isolating intervals, a variation derivative hidden in the extended differential, failure of the kinematic or endpoint repair, cutoff overlap with a required linear source interval, loss of spectral separation, an uncontrolled intervening continuous step, or an orbit tangent with nonzero expanding projection. This reconstruction used no new code, numerical target, Python process, Git mutation or generator rewrite.
