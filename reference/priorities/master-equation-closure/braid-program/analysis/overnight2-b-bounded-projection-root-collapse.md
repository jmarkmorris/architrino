# Bounded above-wake motion with a slow planar projection requires vanishing self delays

## Statement and scope

The [planar-projection argument](overnight2-b-unit-planar-speed.md) makes height strictly monotone when an exact above-wake history has planar speed at most one. Bounded monotone height could still approach a finite limit without becoming periodic. The next argument shows that such an aperiodic history cannot retain a uniform positive lower bound on its self delays.

This is a derived subject awaiting independent analytical review, conditional on the separate disposition of the planar-projection theorem. Use physical absolute time, $K=c_f=1$, and the exact ordinary canonical domain of the [accepted recent-gap theorem](overnight2-b-independent-wake-speed-crossing.md). In particular retain complete $C^2$ paths, collision-free simultaneous positions, the locally uniform complete-past root cutoff, all ordinary positive-delay roots including self, positive self polarity, the absolute source divisor and a finite exact sum. Bounded complete past positions are sufficient for the root cutoff. No singular continuation or root deletion is selected.

For one member on a connected future interval $[t_0,\infty)$, write $X=(Y,z)$ with $Y\in\mathbb R^2$, and assume:
- $|\dot Y|\le1$ throughout the interval;
- some reception in the interval has $|\dot X|>1$;
- the planar future positions have finite diameter at most $D\ge0$;
- the axial future positions lie in an interval of finite width $H_z\ge0$.

The first proposed conclusion is that positive self causal delays must approach zero along receptions tending to infinity. Equivalently, no uniform strictly positive recent-self-root gap can hold on any future tail. If, additionally, $|\ddot X|\le M<\infty$ uniformly on the future, then along such roots the full speed tends to one and the absolute source divisor tends to zero. This is an asymptotic obstruction to a uniformly ordinary bounded chart. It neither proves a finite-time singular event nor provides an actual history with this behavior.

## A quantitative block lemma

The projection theorem implies that $z$ is strictly monotone. Reverse its sign for the following geometric argument if needed, so that every axial increment is positive. This change is only a coordinate choice.

Suppose, for contradiction, that for every reception in a sufficiently late future tail and every $0<d\le d_*$ the recent self gap is positive:
$$
|X(t)-X(t-d)|>d. \tag{1}
$$
A uniform recent-self-root gap on an exact above-wake component would imply precisely (1), since its small-delay sign is positive and a continuous gap cannot change sign without a root.

Choose any fixed $\delta>0$ with $2\delta<d_*$. Choose an integer
$$
N\ge2,\qquad N\delta>2D. \tag{2}
$$
Consider one block of $N$ consecutive time steps, all lying in the tail. Write
$$
u_k=\frac{Y(t+(k+1)\delta)-Y(t+k\delta)}{\delta},\qquad
w_k=z(t+(k+1)\delta)-z(t+k\delta)>0,
$$
for $k=0,\ldots,N-1$. The planar speed bound gives $|u_k|\le1$. Define the total axial change in the block by $W=\sum_k w_k$.

Applying (1) to a one-step chord and to a two-step chord gives
$$
|u_k|^2>1-(w_k/\delta)^2,
$$
$$
|u_k+u_{k+1}|^2>
4-\left(\frac{w_k+w_{k+1}}{\delta}\right)^2.
$$
The second inequality and $|u_k|,|u_{k+1}|\le1$ imply
$$
|u_k-u_{k+1}|^2
=2|u_k|^2+2|u_{k+1}|^2-|u_k+u_{k+1}|^2
<
\left(\frac{w_k+w_{k+1}}{\delta}\right)^2.
$$
Thus the total change of the planar step directions satisfies
$$
\sum_{k=0}^{N-2}|u_{k+1}-u_k|
<\frac{2W}{\delta}. \tag{3}
$$
No actual unit-vector normalization is used here; $u_k$ are average planar velocities.

If $W\le\delta/10$, then $|u_0|>\sqrt{99/100}$ and every $u_k$ is within $2W/\delta$ of $u_0$. Consequently
$$
\begin{aligned}
|Y(t+N\delta)-Y(t)|
&=\delta\left|\sum_{k=0}^{N-1}u_k\right|\\
&>N\delta\left(\sqrt{99/100}-1/5\right)\\
&>\frac34N\delta>D.
\end{aligned}
$$
The numerical comparison uses $\sqrt{99/100}>19/20$. The final inequality follows from (2); it also contradicts $D=0$. This violates the planar diameter bound. Therefore every such block must have
$$
\boxed{W>\delta/10.} \tag{4}
$$

For $n$ disjoint consecutive blocks, monotonicity makes their axial changes add. The total exceeds $n\delta/10$, whereas the axial range is at most $H_z$. Choosing
$$
n=\left\lfloor\frac{10H_z}{\delta}\right\rfloor+1
$$
is impossible. The uniform positive-gap hypothesis cannot persist for that many blocks. This explicit finite-block test establishes the contradiction without assuming a convergent velocity or acceleration limit.

## From the block obstruction to small actual self roots

At each fixed reception in the exact above-wake component, the accepted recent-gap theorem gives positivity for sufficiently small positive delays. If a whole future tail had no positive self roots with $d\le d_*$, continuity in delay would extend that positivity throughout $0<d\le d_*$. This is exactly the hypothesis contradicted above. Therefore every tail and every positive threshold contain a reception with a positive self root below that threshold.

Choose thresholds tending to zero and tails starting arbitrarily late. This yields receptions $t_n\to\infty$ and actual self causal delays $d_n\to0$. These are roots of the complete canonical geometry, not a sampled root list or an imposed truncation. The conclusion follows from the failure of a uniform root-free interval; it does not infer a root from a silent numerical search.

The same conclusion can be phrased using compact-time regularity. The accepted exact-chart theorem gives a strictly positive recent-root floor on each compact reception interval. Hence any sequence of positive self roots whose delays tend to zero must leave every compact reception interval. There is no contradiction with pointwise ordinariness at each finite reception; the degeneration may be approached only asymptotically.

## Divisor and speed degeneration with uniformly bounded acceleration

Assume in addition that $|\ddot X|\le M<\infty$ uniformly on the future. For sufficiently large $n$, the entire segment $[t_n-d_n,t_n]$ lies in that future. At a self root define
$$
n_n=\frac{X(t_n)-X(t_n-d_n)}{d_n},\qquad |n_n|=1.
$$
This vector is the average velocity over the delayed segment. The acceleration bound gives
$$
|n_n-\dot X(t_n)|\le\frac{Md_n}{2},\qquad
|n_n-\dot X(t_n-d_n)|\le\frac{Md_n}{2}.
$$
Therefore
$$
\big||\dot X(t_n)|-1\big|\le\frac{Md_n}{2}\longrightarrow0.
$$
The canonical signed source divisor at the self root is
$$
D_n=1-n_n\cdot\dot X(t_n-d_n)
=n_n\cdot\bigl(n_n-\dot X(t_n-d_n)\bigr).
$$
Thus
$$
\boxed{0<|D_n|\le\frac{Md_n}{2}\longrightarrow0.} \tag{5}
$$
The strict lower inequality is the assumed ordinariness at each finite root, not a uniform lower bound. If $M=0$, no such ordinary root is possible and the hypotheses already contradict one another. For $M>0$, its individual canonical row norm is bounded below by
$$
\frac1{d_n^2|D_n|}\ge\frac2{M d_n^3}.
$$
This is a statement about individual contributions. No conclusion about the total acceleration follows by ignoring other roots; possible large opposing contributions remain subject to the exact equation and are not analyzed here.

## Consequences and boundaries

The theorem excludes any bounded all-future above-wake exact history with a globally at-most-unit planar projection and a uniform self-delay floor. Consequently a bounded aperiodic candidate in this geometric class must either leave the declared exact ordinary domain or lose every uniform recent-self-root floor asymptotically. Under bounded acceleration the paired delay/divisor degeneration (5) is necessary. Neither alternative selects a finite-time event, proves existence, or licenses deletion of the troublesome roots.

If the planar speed instead has a fixed strict bound $|\dot Y|\le v_*<1$, there is a simpler all-future exclusion without any uniform root-gap assumption. The crossing theorem forces $|\dot X|\ge1$, so $|\dot z|\ge\sqrt{1-v_*^2}>0$. Continuity fixes the sign of $\dot z$, and its magnitude lower bound makes $z$ unbounded, contradicting the finite axial range. The nontrivial limiting case treated by the block argument is a planar projection allowed to reach unit speed.

For selected relatively periodic six-member profiles, periodic height already yields the stronger finite-interval monotonicity obstruction. This extension addresses bounded aperiodic histories and the loss of uniform chart regularity, without inventing an exact spatial reference.

Independent review must verify the local-to-global projection premise, the one-step/two-step inequalities, the strict block contradiction, the conversion from absence of a uniform gap to actual roots, and the delayed-average divisor estimate. An exact history satisfying every displayed hypothesis and retaining a uniform positive self-delay floor would refute the main result. A small self root violating (5) under the claimed acceleration bound would refute the local estimate.

No numerical instrument, experiment or runtime evidence is needed. The parent owns integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md). All earlier subjects, accepted proofs and retained numerical evidence remain frozen.
