# Every infinite branch enters a compact dispersing similarity regime

## The stronger conditional-on-infinite-continuation result

Claim grade: derived candidate, pending independent assessment of this proof and its [radial-margin premise](authorized-cases-ten-hour-c-spiral-radial-margin.md). Every all-future regular strict-subfield continuation of a sufficiently small member of the admitted logarithmic family has eventual positive constants $c,z_0,d$ such that

$$
r(t)\ge c(t-s_0),\qquad h(t)\ge c(t-s_0),\qquad
\frac{h(t)}{r(t)}\ge z_0,\qquad D(t)\ge d.
\tag{1}
$$

Its normalized finite history windows are precompact in position and velocity with their first derivatives. This result assumes neither scalar speed convergence nor a uniform total-speed margin below one. It strengthens the earlier uniform-margin regime theorem by deriving the required geometry from infinite continuation itself.

The fixed law, complete past, actual small family and all-root conventions are those of the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md). The proof starts from the independently checkable radial-margin candidate: eventually $p=r'\ge-1+\varepsilon$, $D\ge\varepsilon$, and $R\le2r/\varepsilon$. It also uses accepted acute positive lag, increasing angle and angular momentum, source escape, and physical radius divergence. No actual member is proved to continue forever; finite unit arrival remains the other admitted alternative.

## Source and receiver radii are comparable

The radial-margin premise already gives $r_s\le(2-\varepsilon)r/\varepsilon$. We claim that an eventual lower comparison also holds:

$$
r_s\ge c_s r\qquad\text{for some }c_s>0.
\tag{2}
$$

Suppose instead there are receptions $a_j\to\infty$, sources $b_j=s(a_j)$ and delays $L_j=a_j-b_j$ with $r(b_j)/r(a_j)\to0$. The root equation gives $r(a_j)/L_j\to1$ and $r(b_j)/L_j\to0$. Let $e_j=x(a_j)/r(a_j)$. Unit speed and the displacement integral then give

$$
\frac1{L_j}\int_{b_j}^{a_j}|v(u)-e_j|^2\,du\to0,
\qquad
\sup_{0\le\xi\le1}
\left|\frac{x(b_j+\xi L_j)}{L_j}-\xi e_j\right|\to0.
\tag{3}
$$

These are the outward version of the elementary near-unit chord estimates. No derivative compactness is assumed.

Choose points $m_j$ and $n_j$ with scaled locations in $[1/4,1/3]$ and $[2/3,3/4]$, respectively, at which both velocities tend to $e_j$. On the entire interval $[m_j,n_j]$, (3) makes the radial direction uniformly tend to $e_j$. The continuous angle lift stays within the original acute interval, so its variation on this middle interval tends to zero. Every actual chord angle lies between its receiving angle minus $\pi/2$ and its receiving angle. Thus all accelerations on this middle interval lie in a cone of angle approaching $\pi/2$. A unit vector along the cone's bisector has projection at least $1/2$ on every acceleration direction for large $j$. It follows that

$$
\int_{m_j}^{n_j}|x''(u)|\,du
\le2|v(n_j)-v(m_j)|\to0.
\tag{4}
$$

On the other hand, these times and their sources are late, so $R(u)\le2r(u)/\varepsilon$. Since $D\le2$,

$$
|x''(u)|\ge\frac{\varepsilon}{4r(u)}.
$$

Throughout the middle interval, $r(u)\le2L_j$ for large $j$, while $n_j-m_j\ge L_j/3$. Hence the integral in (4) is at least $\varepsilon/24$, a contradiction. This proves (2). Both endpoint comparisons hold at every sufficiently late reception.

## The complete sampled arc has a positive radius floor

Write $\beta_r=1-\varepsilon<1$ for the inward radial bound. On a late causal interval $[s,t]$, one has $p\ge-\beta_r$ and $p\le1$. For $y\in[s,t]$,

$$
r(y)\ge r_s-\beta_r(y-s),\qquad
r(y)\ge r-(t-y).
$$

Take the first bound with weight $1/(1+\beta_r)$ and the second with weight $\beta_r/(1+\beta_r)$. The time-dependent terms cancel. Using $R\le r+r_s$ gives

$$
r(y)\ge\frac{r_s+\beta_r(r-R)}{1+\beta_r}
\ge\frac{\varepsilon r_s}{2-\varepsilon}
\ge\frac{\varepsilon c_s}{2-\varepsilon}r.
\tag{5}
$$

Thus the entire actual source interval is bounded away from zero relative to the receiver radius. This replaces the complete-arc estimate that formerly required a uniform bound on total speed.

## Tangential speed cannot collapse

Suppose $h(t_j)/r(t_j)\to0$ on a late sequence. Rescale and rotate the complete actual paths at radius $r_j=r(t_j)$ as in the uniform-margin proof,

$$
q_j(u)=\frac{Q_jx(t_j+r_j u)}{r_j},\qquad q_j(0)=e.
$$

They are uniformly 1-Lipschitz on every finite $u$ interval and have a locally uniform subsequential limit on the real line. Since $r_j\to\infty$, the fixed old prescribed past collapses to zero position. A nonzero limiting position therefore belongs to generated times, exactly as in the earlier rescaling proof.

At every compact interval of positive limiting radius, the bound $D\ge\varepsilon$ and $R\ge r$ bounds the rescaled acceleration by $1/(\varepsilon|q_j|)$. This gives $C^1$ convergence there. The selected source clocks have bounded derivatives, at most $2/\varepsilon$, and their source radii stay positive by (2). Passing to a subsequence, the clocks and source velocities therefore converge and the exact response gives $C^2$ convergence. The limit root remains ordinary with denominator at least $\varepsilon$. Although the limiting speed is allowed to equal one, no second root is introduced: its scalar root function is nonincreasing under $|q'|\le1$, and a positive derivative margin at the selected root prevents another zero on either side.

The current complete source interval has the positive radius floor (5). On that interval monotone $h$ gives $0\le q_j\times q_j'\le h(t_j)/r_j\to0$. Thus the full limiting sampled history lies on one positive ray with radial velocity. Regular local uniqueness preserves this radial sector while the future radius is positive. The limiting source clock is nondecreasing and samples only the initial radial arc and its generated radial continuation.

For the radial limit $q(u)=\rho(u)e$, the inherited range and denominator bounds give

$$
\rho''=-\frac1{RD}\le-\frac{\varepsilon}{4\rho},
\qquad |\rho'|\le1.
\tag{6}
$$

A finite zero of $\rho$ is impossible: Lipschitz continuity would imply $\rho(u)\le U-u$ before its first zero $U$, and integrating (6) would force $\rho'\to-\infty$. Regular continuation also cannot fail at positive radius because the range and ordinary denominator retain their margins. If the radius stays positive forever, $\rho(u)\le1+u$ makes the integral of the right side in (6) diverge logarithmically, again contradicting bounded radial velocity. Thus the assumed tangential-speed collapse is impossible.

There are therefore $z_0>0$ and a finite cutoff with $h/r\ge z_0$ at every later time. This argument uses the actual complete family through rescaling and its inherited equation. It does not select a radial physical history or claim that a limiting unit-speed point has a modified response.

## Linear dispersal and bounded normalized histories

At late receptions the source is beyond the tangential-speed cutoff. The exact torque estimate and (2) give

$$
h'(t)\ge\frac{h(s)}{2\pi R}
\ge\frac{z_0r_s}{2\pi(r+r_s)}
\ge\frac{z_0c_s}{2\pi(1+c_s)}>0.
\tag{7}
$$

Integration proves a positive linear lower bound for $h$. Since $h<r$, the same follows for $r$. This proves (1), after decreasing the shared constant and increasing the cutoff. The earlier upper bound $r<19(t-s_0)/20$ remains unchanged.

For $w=t-s_0$, define $P_t(u)=x(s_0+wu)/w$ on any compact positive interval. Its radii are bounded above and below by positive multiples of $u$. The source ratio stays between the accepted lower bound $1/39$ and an upper bound strictly below one, because $R\ge r\ge cw$. Its ordinary denominator is at least $\varepsilon$. Thus normalized position, velocity and acceleration are bounded on every fixed positive window. Differentiating the response also bounds normalized jerk: the source clock derivative is bounded, source acceleration is bounded on its positive scaled window, and no denominator or range vanishes. Hence $P_t$ is precompact in $C^2$ on every fixed positive interval, and the position/velocity state is precompact in $C^1$.

Every subsequential limit is an exact ordinary logarithmic trajectory on all positive scaled times, has speed at most one, positive linear radius and positive tangential speed, and keeps the positive source denominator. The limiting equation is obtained from the actual sources, not prescribed at a new past. The root window remains entirely in positive scaled time. A positive-delay self root would require equality in the unit-speed chord inequality, hence a constant unit velocity on an interval; the nonzero limiting partner acceleration excludes that possibility. The partner root is unique by the preceding monotonicity and ordinary-margin argument. Thus the full relevant root census survives these limiting histories.

In logarithmic time, with a fixed finite history width exceeding $\log39$, the normalized position/velocity histories consequently have a compact closure in the stated norm. The autonomous normalized equation remains regular there. Rotating each history by its current phase gives the corresponding compact set modulo planar rotation. These statements allow nonconvergent histories; no convergence theorem is inferred from compactness alone.

## Remaining branch-selection issue

The actual small family has a proved finite departure from the spiral orbit. If a member survives for all future time, the present theorem places its later normalized history in a regular compact dispersing regime. A scalar speed limit then forces the previously classified asymptotic return to the spiral orbit. If speed does not converge, the compact dynamics can in principle have another invariant limit set. Total speed may approach one along subsequences, but the source denominator and scaled radius no longer degenerate in such a limit. Unit-speed points of a limiting trajectory must be stationary maxima of speed, hence satisfy the outward grazing identities. Strict physical trajectories are not assigned an equality rule by this observation.

No Lyapunov functional, global return-map restriction, or actual exit-state enclosure presently shows that the admitted departed histories must enter the inward event criterion or excludes their return to a compact invariant set. That is the remaining precise dynamical gap. A spectral census alone would not decide it, because the accepted family has existential nonlinear exit constants and uncomputed finite-amplitude history coordinates.

## Known case, falsifiers and ownership

The exact admitted spiral satisfies the stronger regime with constant tangential speed and linear radius/angular momentum. Its normalized histories lie on its rotation orbit. This is the analytical consistency case; no new numerical target is run.

Load-bearing falsifiers are an error in the radial-margin premise, an unaccounted angle change in the middle of the outward near-unit arc, failure of the acceleration-cone lower projection in (4), a wrong complete-arc estimate in (5), a nonordinary limiting source despite the inherited positive denominator, failure of zero angular momentum on the complete sampled history, or a radial limiting continuation evading (6). Compactness without a selected invariant set does not itself establish nonlinear return or event entry.

Only this new subject is written. Earlier frozen subjects, references, complete preparations and shared owners remain preserved. No owned computation is active. Independent assessment is required before integration.
