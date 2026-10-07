# Separating the emitted past from the future velocity region

## Purpose and scope

The [common-history velocity region](overnight-d-ceiling-eight-member-2026-10-06.md#a-sufficient-all-pair-tail-condition) is too restrictive at the assigned seed-1 endpoint: it requires the large release transient and the outgoing velocities to fit the same small balls. The following sufficient criterion bounds old emissions geometrically, while imposing small velocity deviations only after the proposed entry time. It retains the same inclusive ceiling, original partner weights, zero self acceleration and projection after summation, with $K=c_f=c_a=1$. It is an independently reconstructed sufficient criterion whose actual entry remains unresolved; it introduces no new equation or preparation.

Fix an entry time $T_0$ and write $u=T-T_0$. The complete positions are $1$-Lipschitz on the past. Choose $S_*<\min_{i\ne j}S_{ij}^0$ and require compatible Lipschitz velocities on the whole interval $[S_*,T_0]$, with $\dot{\mathbf X}_j=\mathbf V_j$ there and the entry traces matching $\mathbf U_j$. Thus the accessible old paths are $C^{1,1}$ through $T_0$, not merely near the entry roots. The complete rigid remote past is retained. Present positions are distinct, all current partner roots are ordinary, and their emission times $S_{ij}^0$ are known. For the original histories these accessible times should be positive so the time-zero kick lies outside the future source evaluation interval.

Set $\mathbf U_i=\mathbf V_i(T_0)$ and choose future velocity radii $\eta_i>0$. The proposed region is $|\mathbf V_i(T)-\mathbf U_i|\le\eta_i$ only for $T\ge T_0$. For a fixed unit pair direction $\mathbf e_{ij}=-\mathbf e_{ji}$ define

$$
d_{ij}=\mathbf e_{ij}\cdot[\mathbf X_i(T_0)-\mathbf X_j(T_0)]>0,\quad
v_{ij}=\mathbf e_{ij}\cdot(\mathbf U_i-\mathbf U_j),\quad
c_{ij}=v_{ij}-\eta_i-\eta_j>0.
$$

These conditions make every projected present separation at least $d_{ij}+c_{ij}u$ while the proposed region holds. The direction can be chosen along the relative anchor velocity if it also gives positive initial projection.

## Old emissions: a causal normal cone

For an old emission $S\in[S_{ij}^0,T_0]$, define its age at entry $\ell=T_0-S$, displacement $\mathbf a=\mathbf X_i(T_0)-\mathbf X_j(S)$, and source velocity $\mathbf w=\mathbf V_j(S)$. The causal gap at entry is nonnegative on this interval, so $a=|\mathbf a|\ge\ell$. Put $\beta=\ell/a\in[0,1]$ and $\mathbf p=\mathbf a/a$.

At any later reception of this emission, the wake normal $\mathbf n$ has unit length and the receiver has moved by $(u+\ell)\mathbf n-\mathbf a$. Its speed ceiling implies

$$
|(u+\ell)\mathbf n-\mathbf a|\le u,
\qquad
2u(\mathbf n\cdot\mathbf a-\ell)\ge|\mathbf a-\ell\mathbf n|^2\ge0.
$$

For $u>0$ this requires $\mathbf n\cdot\mathbf p\ge\beta$; the entry root has the same condition by continuity. Thus an old emission cannot arrive from an arbitrary normal direction. This spherical-cap restriction depends only on retained source position and the receiver's speed ceiling, not a small old-velocity deviation.

Let $q=\mathbf p\cdot\mathbf w$ and $s=|\mathbf w|$. Maximizing $\mathbf n\cdot\mathbf w$ on that spherical cap gives

$$
M(S)=
\begin{cases}
s,&q\ge\beta s,\\
\beta q+\sqrt{1-\beta^2}\sqrt{s^2-q^2},&q<\beta s.
\end{cases}
$$

In the first case the source-velocity direction belongs to the allowed cap. In the second case the maximum is on its rim, with the perpendicular normal aligned with the source's perpendicular velocity. Define continuous-history margins

$$
\delta_{ij}^{\mathrm{old}}=\inf_{S\in[S_{ij}^0,T_0]}[1-M(S)]>0,\qquad
R_{ij}=\inf_{S\in[S_{ij}^0,T_0]}\frac{|\mathbf a(S)|+\ell(S)}2>0.
$$

These are obligations over full intervals, not sampled minima. The first is a transmitter-factor floor for every possible old reception. For range, $|\mathbf a|\le u+\tau$ and $\tau=u+\ell$ give $\tau\ge(|\mathbf a|+\ell)/2$, while trivially $\tau\ge u$. Hence every old-source row obeys

$$
|\mathbf a_{i\leftarrow j}^{\mathrm{old}}(T)|\le
\frac{1}{\delta_{ij}^{\mathrm{old}}\max(R_{ij},u)^2},\qquad
\int_0^\infty|\mathbf a_{i\leftarrow j}^{\mathrm{old}}|\,du
\le\frac{2}{\delta_{ij}^{\mathrm{old}}R_{ij}}.
$$

The row is zero in this bookkeeping after its source clock exceeds $T_0$; that is only a partition of the unchanged ordinary row by emission time. It is not a root exclusion or change of weight. Extending the majorant to all $u$ makes the bound conservative.

## Future emissions: delayed onset and future velocity bounds

If the source emission satisfies $S\ge T_0$, its delay $\tau=T-S$ is at most $u$. Receiver and source displacements from their anchors have errors at most $\eta_i u$ and $\eta_j(u-\tau)$. Projecting the causal displacement onto $\mathbf e_{ij}$ yields

$$
\tau\ge d_{ij}+c_{ij}u+(\mathbf e_{ij}\cdot\mathbf U_j+\eta_j)\tau.
$$

Define $z_{ij}=1-\mathbf e_{ij}\cdot\mathbf U_j-\eta_j$. Because the anchors obey the cap and the radii are positive, $z_{ij}-c_{ij}=1-\mathbf e_{ij}\cdot\mathbf U_i+\eta_i\ge\eta_i>0$. Consequently $z_{ij}>c_{ij}>0$ and

$$
\tau\ge\frac{d_{ij}+c_{ij}u}{z_{ij}},\qquad
u_{ij}^{\min}=\frac{d_{ij}}{z_{ij}-c_{ij}},\qquad u\ge\nu_{ij}^{\min}.
$$

The last inequality delays the earliest possible reception of a post-entry emission. It is especially useful for a receiver close to the ceiling and moving away from the source.

The same displacement formula and $\tau\le u$ give

$$
\mathbf e_{ij}\cdot(\mathbf n-\mathbf U_j)\ge v_{ij}-\eta_i=:m_{ij}^{U}.
$$

Using $1-\mathbf n\cdot\mathbf U_j=[1-|\mathbf U_j|^2+|\mathbf n-\mathbf U_j|^2]/2$, the source velocity ball, and independently the exact speed cap, a sufficient future transmitter-factor floor is

$$
\delta_{ij}^{\mathrm{new}}=
\max\left\{
1-|\mathbf U_j|-\eta_j,
\frac{1-|\mathbf U_j|^2+(m_{ij}^{U})_+^2}{2}-\eta_j,
\frac{c_{ij}^2}{2}
\right\}>0.
$$

For the last entry, the exact displacement gives $\mathbf e_{ij}\cdot[\mathbf n-\mathbf V_j(S)]\ge(d_{ij}+c_{ij}u)/\tau\ge c_{ij}$, so the exact cap implies $D_t\ge c_{ij}^2/2$. Thus positivity follows from $c_{ij}>0$. Each entry in this maximum is a lower bound on the same original transmitter factor; none changes its weighting. The total future-emission row impulse is bounded by

$$
B_{ij}^{\mathrm{new}}
\le\int_{\nu_{ij}^{\min}}^\infty
\frac{z_{ij}^2}{\delta_{ij}^{\mathrm{new}}(d_{ij}+c_{ij}u)^2}\,du
=\frac{z_{ij}(z_{ij}-c_{ij})}{\delta_{ij}^{\mathrm{new}}c_{ij}d_{ij}}.
$$

For a disjoint partition assign $S\le T_0$ to the old part and $S>T_0$ to the future part. The future estimate proved for $S\ge T_0$ still applies. A clock can freeze at $S=T_0$, so this equality case is not discarded as a set of zero reception measure. Old and future emissions remain the same partner channel; the two upper bounds estimate its remaining impulse without counting the actual row twice.

## Sufficient closure test and its limitations

For every receiver require

$$
B_i^{\mathrm{split}}=
\sum_{j\ne i}\left[
\frac{2}{\delta_{ij}^{\mathrm{old}}R_{ij}}+B_{ij}^{\mathrm{new}}
\right]<\eta_i.
$$

On any ordinary continuation in the proposed region, the post-summation ceiling response has norm at most the ordinary sum's norm, so $|\mathbf V_i(T)-\mathbf U_i|\le B_i^{\mathrm{split}}$. A first exit is impossible. The all-past speed bound makes every causal gap monotone; the retained remote past and positive present separation give existence of a root. Monotonic source clocks keep old roots after $S_{ij}^0$. The old and future factor floors make every possible root ordinary and exclude multiple roots or root intervals. Range has a positive lower bound on each finite time interval.

Under compatible Lipschitz source velocities, the local normal-cone construction in the [independent tail review](overnight-d-tail-independent-review-2026-10-06.md#a-local-construction-that-permits-a-frozen-clock) can then restart at every finite endpoint. The finite acceleration bounds preserve that regularity. This gives the proposed global complete-separation conclusion, including the possibility of capped members whose source clocks converge to finite old emission times. It does not require every clock to flush the release transient.

Claim grade: derived sufficient criterion, independently reconstructed in the [split-tail review](overnight-d-split-tail-independent-review-2026-10-06.md). The current version adopts that review’s stronger future factor floor and explicit old-history regularity. Earlier numerical screens using the weaker floor remain separately identified in the research record. Its hypotheses include continuous-history infima, the future velocity inequalities, exact regular root data, and the source regularity required for continuation. A numerical search over radii or sampled source data cannot certify them. Falsifier: a capped path receiving an old emission with $\mathbf n\cdot\mathbf a<\ell$, a failure of either transmitter-factor estimate, a failed impulse integral under its hypotheses, or a finite ordinary continuation obstruction with all stated margins intact. If the criterion fails, escape remains open; the failure identifies only a limitation of this majorant.

## Explicit interface for an enclosed approximate history

The strict inequalities above can be applied to a certified neighborhood of an approximate history, rather than requiring the exact history in closed form. This subsection is a derived extension independently reconstructed in the [split-tail review](overnight-d-split-tail-independent-review-2026-10-06.md). It specifies the missing numerical-to-exact interface; it does not supply the enclosure for the assigned release.

Fix the same exact entry time $T_0$ and a cutoff $S_*<T_0$. Let barred positions and velocities denote an approximate history. Suppose certified errors satisfy

$$
|\mathbf X_j(S)-\overline{\mathbf X}_j(S)|\le\epsilon_x,
\qquad
|\mathbf V_j(S)-\overline{\mathbf V}_j(S)|\le\epsilon_v,
\qquad S\in[S_*,T_0].
$$

All exact histories still obey the original unit cap and the full regularity hypotheses. Choose fixed velocity centers $\mathbf U_i$ within the unit ball and certify $|\mathbf V_i(T_0)-\mathbf U_i|\le\epsilon_i^0$. They need not equal the exact entry velocities. For fixed pair directions, replace $d_{ij}$ by the lower bound

$$
\underline d_{ij}=\mathbf e_{ij}\cdot[\overline{\mathbf X}_i(T_0)-\overline{\mathbf X}_j(T_0)]-2\epsilon_x>0.
$$

The same $v_{ij}$ and $c_{ij}$ use the chosen centers and radii. Require a negative causal gap at the cutoff, certified for example by

$$
|\overline{\mathbf X}_i(T_0)-\overline{\mathbf X}_j(S_*)|+2\epsilon_x<T_0-S_*.
$$

Receiver and source speed bounds then confine every later root to $(S_*,T)$, independently of an approximate entry root time. For every old source time $S\in[S_*,T_0]$, put $\ell=T_0-S$, $\overline{\mathbf a}=\overline{\mathbf X}_i(T_0)-\overline{\mathbf X}_j(S)$, $\overline a=|\overline{\mathbf a}|>0$, and $\overline{\mathbf p}=\overline{\mathbf a}/\overline a$. Any possible later reception obeys

$$
\mathbf n\cdot\overline{\mathbf a}\ge\ell-2\epsilon_x.
$$

Thus define $\beta_-=(\ell-2\epsilon_x)/\overline a$. If $\beta_->1$, no unit normal can receive that emission. Otherwise the admitted normals lie in the spherical cap $\mathbf n\cdot\overline{\mathbf p}\ge\max(-1,\beta_-)$. The same support formula $M$ applies for cap parameters throughout $[-1,1]$, with $\overline{\mathbf w}=\overline{\mathbf V}_j(S)$. Consequently every possible old reception has

$$
D_t\ge1-M(\overline{\mathbf p},\max(-1,\beta_-),\overline{\mathbf w})-\epsilon_v,
\qquad
\tau\ge\frac{\overline a-2\epsilon_x+\ell}{2}.
$$

Take positive infima of these bounds over the potentially admissible old emissions. These replace $\delta_{ij}^{\mathrm{old}}$ and $R_{ij}$ in the old impulse bound. The future estimates use $\underline d_{ij}$ in place of $d_{ij}$ and otherwise remain unchanged. The closure inequalities become

$$
\epsilon_i^0+B_i^{\mathrm{split}}<\eta_i.
$$

The first-exit proof now starts with the certified initial velocity error, and the root/restart argument uses the strictly negative cutoff gap. These hypotheses imply the same complete-separation conclusion for every exact history in the certified neighborhood. They must be checked over full source intervals, including the endpoints of the possibly admitted set; a sampled maximum is insufficient.

This interface separates two obligations: enclosing the selected preparation's finite evolution, and bounding the tail from that enclosure. A numerical tail candidate can provide tolerances worth pursuing, but it cannot establish that the original exact preparation lies within them. Falsifier: an exact capped history satisfying the uniform error bounds and cutoff/closure inequalities but possessing a root or acceleration contribution outside the displayed enlarged-cap bounds.
