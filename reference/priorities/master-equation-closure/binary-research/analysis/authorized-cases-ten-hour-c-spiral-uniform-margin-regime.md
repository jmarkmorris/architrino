# A uniform speed margin forces a compact dispersing similarity regime

## Conditional regime theorem

Claim grade: derived candidate, pending independent assessment. Let a sufficiently small member of the admitted logarithmic family have an all-future regular strict-subfield continuation and a uniform speed bound $|v|\le\beta<1$ on its complete history. Then there are positive constants $z_0,c_0$ and a finite cutoff such that

$$
\frac{h(t)}{r(t)}\ge z_0,\qquad
h(t)\ge c_0(t-s_0),\qquad
r(t)\ge c_0(t-s_0)
\tag{1}
$$

thereafter, after decreasing $c_0$ if needed. The constants are existential and can depend on the continuation and its margin. Together with the previously established upper radius and source-clock bounds, these inequalities make its normalized finite history windows precompact in position and velocity with their first derivatives. No scalar speed convergence is assumed.

A uniform bound only on the eventual future suffices: the given complete old preparation and each intervening compact strict-subfield segment have their own strict margin, so enlarging $\beta$ once gives a complete-history bound below one. No uniform margin is asserted for every actual member. The theorem describes what an infinite branch with such a margin must look like; forcing that margin or determining its limiting invariant set remains open.

The law, preparation, actual family, all-root treatment and domain meanings remain those in the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md). The proof uses the accepted positive angular momentum, acute positive partner lag, escaping source time, and $r,h\to\infty$. It does not use the scalar-speed-limit theorem or replace the preparation by a radial one. A radial curve appears only as a mathematical limit in a contradiction argument.

## A uniform margin controls every point of a causal interval

At any reception write $r=|x(t)|$, $r_s=|x(s)|$, and $R=t-s=|x(t)+x(s)|$. The complete speed bound gives

$$
|x(t)-x(s)|\le\beta R.
$$

The triangle inequality then gives the endpoint comparisons

$$
\frac{1-\beta}{1+\beta}r\le r_s
\le\frac{1+\beta}{1-\beta}r,
\qquad
r\le R\le\frac{2r}{1-\beta}.
\tag{2}
$$

The lower range bound uses the accepted acute lag. Also $1-\beta\le D\le1+\beta$. For any intermediate time $y\in[s,t]$, both endpoint speed estimates apply:

$$
r(y)\ge\max\{r-\beta(t-y),\ r_s-\beta(y-s)\}.
$$

The minimum of the right side is $(r+r_s-\beta R)/2$, so

$$
r(y)\ge\frac{1-\beta}{2}R
\ge\frac{1-\beta}{2}r.
\tag{3}
$$

This bound covers the entire actually sampled arc, not just its endpoints. The response also gives

$$
|x''(t)|\le\frac1{(1-\beta)r(t)}.
\tag{4}
$$

These estimates preserve ordinary root coverage in the rescaling used next.

## Vanishing tangential speed would give a radial limiting motion

Suppose contrary to the first statement of (1) that there are $t_j\to\infty$ with $h(t_j)/r(t_j)\to0$. Set $r_j=r(t_j)$ and align $x(t_j)$ with a fixed unit vector $e$ by a rotation $Q_j$. Consider the actual complete rescaled paths

$$
q_j(u)=\frac{Q_jx(t_j+r_j u)}{r_j},\qquad u\in\mathbb R.
\tag{5}
$$

The given complete past makes (5) defined for every real $u$. The accepted dispersal theorem gives $r_j\to\infty$. The curves are uniformly $\beta$-Lipschitz, satisfy $q_j(0)=e$, and obey $|q_j(u)|\le1+\beta|u|$. Elementary compactness therefore gives a subsequence converging locally uniformly on the whole real line to a $\beta$-Lipschitz curve $q$.

Pass also to a subsequence on which $t_j/r_j\to L\in(0,\infty]$. If $L$ is finite, the old prescribed path collapses to zero for $u\le-L$: its physical position remains bounded on the supplied past and $r_j\to\infty$. Every point where $q(u)\ne0$ must then have $u>-L$ and is a generated physical time for all sufficiently large $j$. If $L=\infty$, every fixed finite scaled time is eventually generated. Thus a nonzero limiting position never requires treating the supplied past as an equation solution.

On any compact interval where $|q|>0$, (4) bounds $q_j''$ uniformly. It follows that the convergence is $C^1$ there after extraction. At such a receiving point, (2) gives a positive limiting source radius and a bounded source interval. The source factor is uniformly at least $1-\beta$. Its root is unique even for the limiting Lipschitz curve: increasing the source time by $d>0$ decreases $u-\sigma-|q(u)+q(\sigma)|$ by at least $(1-\beta)d$. Consequently the actual clocks converge to that unique root. Source velocities converge on a positive-radius source neighborhood, so the exact acceleration passes to the limit. The convergence is $C^2$ on compact positive-radius generated intervals, and $q$ satisfies the unchanged logarithmic equation there.

At $u=0$, the entire source interval has the positive lower radius in (3). The corresponding physical source times tend to infinity by accepted source escape, and the interval is generated. On this interval monotonicity of $h$ gives

$$
0\le q_j(u)\mathbin\times q_j'(u)
=\frac{h(t_j+r_j u)}{r_j}
\le\frac{h(t_j)}{r_j}\longrightarrow0.
\tag{6}
$$

The same holds at the limiting endpoints by continuity. The limiting curve therefore has zero angular velocity on this entire connected nonzero interval. It lies on the positive ray through $e$, with radial velocity. This is full initial causal-history information, rather than only zero angular momentum at one instant.

Local uniqueness of the regular ordinary delay equation now preserves the collinear radial sector while its radius is positive. It is the same regular root functional used in the admitted local solution argument: positive range, $D\ge1-\beta$, and $C^1$ sampled histories give a locally Lipschitz response on each finite regular chart. The source clock advances, so it subsequently samples only that initial positive-ray interval or the generated positive-ray motion. Thus

$$
q(u)=\rho(u)e,\qquad u\ge0,
\tag{7}
$$

for as long as $\rho>0$. Its speed stays at most $\beta$, inherited from the actual curves.

## A radial limit cannot keep that speed bound

For the positive-ray limiting motion, $R=\rho+\rho_s$, $n=e$, and the radial response is

$$
\rho''=-\frac1{RD}
\le-\frac{1-\beta}{2(1+\beta)\rho}
=:-\frac{c_\beta}{\rho},
\qquad c_\beta>0.
\tag{8}
$$

The inequalities use exactly (2) and $D\le1+\beta$. The limit cannot reach zero radius at a finite first time $U$. Indeed its Lipschitz bound would give $\rho(u)\le\beta(U-u)$ as $u\uparrow U$. Integrating (8) would then make $\rho'$ tend to minus infinity, contradicting $|\rho'|\le\beta$. A loss of regularity at positive radius is also impossible because (2)–(4) preserve a positive range and source margin and the limiting equation continues on a finite chart.

Hence the limiting radial motion would remain positive for all $u\ge0$. But $\rho(u)\le1+\beta u$, so (8) gives

$$
\rho'(u)\le\rho'(0)-\frac{c_\beta}{\beta}\log(1+\beta u).
\tag{9}
$$

The right side eventually falls below $-\beta$, again a contradiction. The case $\beta=0$ is already incompatible with the nonzero response; one may enlarge the complete bound to any $0<\beta<1$ at the outset.

Thus no sequence $h(t_j)/r(t_j)\to0$ exists. This proves the eventual positive tangential-speed floor in (1). No actual radial perturbation or alternative initial history has been introduced. The forbidden radial motion is the limit forced by the hypothesized degeneration of the actual branch.

## Positive tangential speed gives linear dispersal

The accepted exact torque estimate on generated source intervals is

$$
h'(t)\ge\frac{h(s(t))}{2\pi R(t)}.
\tag{10}
$$

At sufficiently late receptions the escaping source is beyond the cutoff of the tangential-speed floor, so $h(s)\ge z_0r_s$. Applying the range comparison (2) with the source endpoint gives $R\le2r_s/(1-\beta)$. Therefore

$$
h'(t)\ge\frac{z_0(1-\beta)}{4\pi}>0.
\tag{11}
$$

Integration yields a positive linear lower bound for $h$. Since $h\le\beta r<r$, the same follows for $r$, after increasing the cutoff and reducing the coefficient. This proves the rest of (1). The argument uses the tangential floor at the actual source, which is legitimate because the floor holds at every sufficiently late generated time; no unproved ratio $h(s)/h(t)$ is needed.

## Precompact normalized histories and the remaining invariant-set question

Set $w=t-s_0$ and consider

$$
P_t(u)=\frac{x(s_0+wu)}w
$$

on any compact interval $I\subset(0,\infty)$. The new lower radius bound and the accepted upper bound give $c_0u\le|P_t(u)|\le19u/20$ eventually. The accepted source ratio is at least $1/39$, so all sources on $I$ lie in another fixed positive compact interval. The uniform speed and denominator margins give bounded $P_t'$, $P_t''$ and, on these late generated intervals, bounded $P_t'''$: differentiating the response uses only bounded normalized source acceleration, bounded clock derivative $(1-n\cdot v)/D$, and ranges bounded away from zero. No third derivative of the supplied past enters these late windows.

Thus the position histories are precompact in $C^2(I)$; equivalently the position/velocity state histories are precompact in $C^1(I)$. Rotating by the current phase preserves this conclusion. In logarithmic time, each fixed finite history window consequently lies in a precompact set separated from zero radius, zero source delay, and loss of the ordinary source margin. The full delay functional remains regular on this set.

This establishes a controlled dispersing regime for every infinite branch with a uniform speed margin, including those whose speed does not converge. It does not identify the limit set as the spiral. A compact nonconvergent similarity orbit is not excluded by the accepted positive linear exponent or the finite history-norm departure. The unresolved branch question is whether the actual departed histories reach the inward unit-event criterion, return asymptotically to the spiral orbit, or enter another invariant set of this regular normalized history dynamics. No Lyapunov functional or return-map restriction excluding the latter possibilities has been established.

## Known case, falsifiers and ownership

The exact admitted spiral is the known consistency case: $h/r=a\omega>0$, $h$ and $r$ grow linearly, and its normalized histories lie on the rotation orbit. It satisfies every claimed bound for suitable positive constants. The argument uses only the fixed logarithmic equation and elementary compactness, integration and regular local uniqueness already justified for that equation.

Load-bearing falsifiers are failure of the complete-arc lower bound (3); a nonzero rescaled point that actually belongs to the collapsed old prescribed past; loss of velocity convergence at a positive-radius source; inability to pass the unique ordinary clock to the limiting curve; failure of zero angular momentum on the complete initial sampled arc; or a radial limiting continuation evading (8) while retaining the same uniform speed margin. A genuine all-future branch with speed approaching one along a sequence lies outside this theorem's margin hypothesis.

All constants are existential, and no new numerical member, spectrum, solver or computational instrument is selected. Only this new subject is written. Earlier subjects, independent references, complete preparations and shared owners remain frozen; no owned computation is active. Independent assessment is required before integration.
