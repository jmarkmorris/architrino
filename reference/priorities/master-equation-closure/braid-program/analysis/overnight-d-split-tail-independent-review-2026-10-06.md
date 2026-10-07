# Independent review of the split-history tail criterion

## Verdict and precise history hypothesis

The frozen [split-history candidate](overnight-d-split-history-tail.md) has valid spherical-cap, old-impulse, future-onset, and future-impulse estimates. Its stated future transmitter-factor floor is conservative but correct. The criterion gives global complete pair separation when its continuous-history margins and continuation regularity hold. No actual entry of an assigned preparation is established by this review.

The continuation hypothesis should explicitly cover the whole remaining old source history, not only neighborhoods of the emission times currently being received. A sufficient precise formulation is: select a finite $S_*<\min_{i\ne j}S_{ij}^0$; require complete past position paths to be $1$-Lipschitz, and require compatible Lipschitz velocities on $[S_*,T_0]$, with $\dot{\mathbf X}_j=\mathbf V_j$ there and $\mathbf V_j(T_0)=\mathbf U_j$. Thus those positions are $C^{1,1}$, meaning continuously differentiable with Lipschitz derivative. A separate cutoff for each source is equally sufficient. The velocity kick at zero is excluded by taking positive cutoffs when the entry roots permit that choice. No small velocity-deviation bound is imposed on this old interval.

The subject's wording about an interval “containing every partner emission at entry” must include the old intervals through $T_0$ and compatible endpoint traces. If it meant only a small interval around the entry roots, it would not supply the hypotheses used by the cited local continuation construction. This is a needed explicit interpretation of the regularity assumption, not a constructed counterexample to a weaker possible solution theory.

Two derived refinements are available. Under the stated capped anchors and positive radii, the branch $z_{ij}\le c_{ij}$ is impossible. Also, every future root obeys the stronger bound $D_t\ge c_{ij}^2/2$, so a positive future transmitter-factor floor follows already from $c_{ij}>0$. Neither refinement changes the equation or establishes numerical applicability.

Claim grade: derived conditional theorem and algebraic refinements. The independent reconstruction below starts from the causal equation and selected normal-cone law, rather than an evolved trajectory or the subject's diagnostic code. Falsifiers are identified with the individual steps. The analytical lens is `ramon-e-moore`; it supplies no acceptance authority.

## Equation and domain

The scenario has finitely many labels, eight in the selected preparations, with unit polarity magnitudes and $K=c_f=c_a=1$. For receiver $i$ and source $j\ne i$, a partner root satisfies

$$
g_{ij}(T,S)=|\mathbf X_i(T)-\mathbf X_j(S)|-(T-S)=0,\qquad S<T.
$$

Write $\tau=T-S$, $\mathbf n=[\mathbf X_i(T)-\mathbf X_j(S)]/\tau$, and $D_t=1-\mathbf n\cdot\mathbf V_j(S)$. At a positive simple root the ordinary row is $\sigma_{ij}\mathbf n/(\tau^2D_t)$, where $\sigma_{ij}=\pm1$ is the polarity product. Self acceleration is zero. The complete ordinary partner sum is formed before applying the inclusive-ball normal-cone response. This response preserves $|\mathbf V_i|\le1$ and has $|\dot{\mathbf V}_i|\le|\mathbf A_i^{\mathrm{ord}}|$ almost everywhere; it does not reweight individual rows.

Fix $T_0$, the ordinary entry emission times $S_{ij}^0$, anchor velocities $\mathbf U_i=\mathbf V_i(T_0)$, positive future radii $\eta_i$, and fixed unit directions $\mathbf e_{ji}=-\mathbf e_{ij}$. Define $d_{ij}>0$, $v_{ij}$, and $c_{ij}>0$ exactly as in the subject:

$$
d_{ij}=\mathbf e_{ij}\cdot[\mathbf X_i(T_0)-\mathbf X_j(T_0)],\qquad
v_{ij}=\mathbf e_{ij}\cdot(\mathbf U_i-\mathbf U_j),\qquad
c_{ij}=v_{ij}-\eta_i-\eta_j.
$$

While the proposed future region $|\mathbf V_i(T)-\mathbf U_i|\le\eta_i$ holds, integration gives projected pair separation at least $d_{ij}+c_{ij}u$, where $u=T-T_0$. This estimate is about current positions, and excludes equal-time coincidence within the region.

## Root-domain control before the factor bounds

The complete source speed bound makes $S\mapsto g_{ij}(T,S)$ nondecreasing. The receiver speed bound makes $T\mapsto g_{ij}(T,S)$ nonincreasing. At entry, an ordinary root $S_{ij}^0$ has positive derivative. A nondecreasing continuous function with an ordinary root cannot have a second zero: two zeros would force a zero interval and contradict the positive derivative at the ordinary root. Thus

$$
g_{ij}(T_0,S)<0\quad(S<S_{ij}^0),\qquad
g_{ij}(T_0,S)\ge0\quad(S\ge S_{ij}^0).
$$

For every future receiver event, $g_{ij}(T,S)<0$ for $S<S_{ij}^0$, while $g_{ij}(T,S_{ij}^0)\le0$ and $g_{ij}(T,T)>0$. A root therefore exists in $[S_{ij}^0,T)$, and none exists before $S_{ij}^0$. This argument does not assume a source-clock differential equation before root simplicity has been established. It also shows that bounded rigid remote positions are not needed for this particular future-existence step once the ordinary entry root is known, although the complete rigid history remains part of the selected preparation.

Every possible root is now in one of the old or future domains to which the following factor estimates apply. This removes a possible circular reading of the subject's use of monotone source clocks.

## Old-emission geometry and support function

For an old source time $S\in[S_{ij}^0,T_0]$, set $\ell=T_0-S$, $\mathbf a=\mathbf X_i(T_0)-\mathbf X_j(S)$, $a=|\mathbf a|$, $\mathbf p=\mathbf a/a$, $\beta=\ell/a$, and $\mathbf w=\mathbf V_j(S)$. The entry-gap inequality gives $a\ge\ell$. Moreover $a>0$: for $S<T_0$, $a\ge\ell>0$, and for $S=T_0$, present positions are distinct. Thus $\beta\in[0,1]$ is defined on the entire compact old interval.

If that emission arrives at $T=T_0+u$, causal equality requires $\tau=u+\ell$. The receiver's displacement is $\tau\mathbf n-\mathbf a$, whose norm is at most $u$. Squaring and rearranging gives the exact necessary inequality

$$
2u(\mathbf n\cdot\mathbf a-\ell)\ge|\mathbf a-\ell\mathbf n|^2.
$$

For $u>0$ it implies $\mathbf n\cdot\mathbf p\ge\beta$. At $u=0$, the only possible old reception is the entry root, with $\mathbf n=\mathbf p$ and $\beta=1$. The cone constraint therefore holds there as well, without a continuity assumption about a family of other old receptions.

To maximize the source projection, write $q=\mathbf p\cdot\mathbf w$, $s=|\mathbf w|$, and decompose $\mathbf w=q\mathbf p+\mathbf w_\perp$. For a unit normal with $x=\mathbf n\cdot\mathbf p\in[\beta,1]$, its maximal dot product with $\mathbf w$ at fixed $x$ is

$$
qx+\sqrt{s^2-q^2}\sqrt{1-x^2}.
$$

When $s>0$, the unconstrained maximum occurs at $x=q/s$ and equals $s$. If $q/s\ge\beta$, that direction is admitted. Otherwise the constrained maximum is attained at $x=\beta$. This gives exactly

$$
M(S)=
\begin{cases}
s,&q\ge\beta s,\\
\beta q+\sqrt{1-\beta^2}\sqrt{s^2-q^2},&q<\beta s.
\end{cases}
$$

The formula also handles $s=0$, where its first branch is zero, and $\beta=1$, where the cap is the singleton $\mathbf p$ and the result is $q$. No strict subfield source speed has been used. Therefore $D_t\ge1-M(S)$ at every possible old reception, and a positive full-interval infimum $\delta_{ij}^{\mathrm{old}}$ is a valid uniform old-source factor floor.

For range, $a\le u+\tau=2\tau-\ell$, so $\tau\ge(a+\ell)/2$. Also $\tau=u+\ell\ge u$. With $R_{ij}=\inf_S(a+\ell)/2>0$, the original row norm is bounded by

$$
\frac1{\delta_{ij}^{\mathrm{old}}\max\{R_{ij},u\}^2}.
$$

Integrating over $[0,R_{ij}]$ gives $1/(\delta_{ij}^{\mathrm{old}}R_{ij})$, and integrating over $[R_{ij},\infty)$ gives the same amount. Hence the proposed old impulse bound $2/(\delta_{ij}^{\mathrm{old}}R_{ij})$ is correct. Continuing the bound after the source clock leaves the old interval only enlarges it.

Claim grade: derived old-row bound. Falsifiers would be a capped receiver displacement violating the squared identity's necessary inequality, an admitted unit normal with source projection exceeding $M(S)$, or failure of the range/impulse inequalities under the declared positive margins. Sampling the old interval is insufficient to establish either infimum for an exact history.

## Future-root displacement, onset, and sharper factors

For a future source time $S\ge T_0$, the elapsed source time is $S-T_0=u-\tau\ge0$. Write the two displacements from entry as

$$
\mathbf X_i(T)=\mathbf X_i(T_0)+\mathbf U_i u+\mathbf E_i(u),\qquad
\mathbf X_j(S)=\mathbf X_j(T_0)+\mathbf U_j(u-\tau)+\mathbf E_j(u-\tau),
$$

where $|\mathbf E_i(u)|\le\eta_i u$ and $|\mathbf E_j(u-\tau)|\le\eta_j(u-\tau)$. Projecting the exact causal displacement, before bounding the normal projection by one, gives

$$
\tau\mathbf e_{ij}\cdot\mathbf n
\ge d_{ij}+c_{ij}u+(\mathbf e_{ij}\cdot\mathbf U_j+\eta_j)\tau.
$$

Since $\mathbf e_{ij}\cdot\mathbf n\le1$, the subject's inequality $z_{ij}\tau\ge d_{ij}+c_{ij}u$ follows, with $z_{ij}=1-\mathbf e_{ij}\cdot\mathbf U_j-\eta_j$. Because $\tau\le u$, the onset bound is

$$
u\ge\frac{d_{ij}}{z_{ij}-c_{ij}},\qquad
\tau\ge\frac{d_{ij}+c_{ij}u}{z_{ij}}.
$$

Within the stated hypotheses, the required denominator is automatically positive:

$$
z_{ij}-c_{ij}=1-\mathbf e_{ij}\cdot\mathbf U_i+\eta_i\ge\eta_i>0.
$$

Thus $z_{ij}>c_{ij}>0$ for every ordered pair. The subject's exclusion statement for $z_{ij}\le c_{ij}$ is a correct implication in a larger algebraic domain, but its antecedent cannot occur for the declared capped anchors and positive future radii. It provides no extra exclusion case here. The finite necessary onset does not imply that the clock ever reaches $T_0$; a clock can still converge to an earlier finite time.

The same exact projection gives a stronger estimate than the subject uses:

$$
\mathbf e_{ij}\cdot(\mathbf n-\mathbf U_j)
\ge\frac{d_{ij}+c_{ij}u}{\tau}+\eta_j
\ge c_{ij}+\eta_j=v_{ij}-\eta_i.
$$

Subtracting the source-velocity deviation at $S$ yields

$$
\mathbf e_{ij}\cdot[\mathbf n-\mathbf V_j(S)]
\ge\frac{d_{ij}+c_{ij}u}{\tau}\ge c_{ij}>0.
$$

The exact speed cap then gives $D_t=[1-|\mathbf V_j(S)|^2+|\mathbf n-\mathbf V_j(S)|^2]/2\ge c_{ij}^2/2$. A sufficient improved future floor is therefore

$$
\widehat\delta_{ij}^{\mathrm{new}}=
\max\left\{
1-|\mathbf U_j|-\eta_j,
\frac{1-|\mathbf U_j|^2+(v_{ij}-\eta_i)^2}{2}-\eta_j,
\frac{c_{ij}^2}{2}
\right\}>0.
$$

The first entry is the speed-ball estimate. The second uses the preceding bound on $|\mathbf n-\mathbf U_j|$ and the source-velocity error of at most $\eta_j$. The third uses the exact cap directly. Since $v_{ij}-\eta_i=c_{ij}+\eta_j>0$, its square is legitimate without a positive-part qualification. This maximum is at least as strong as the subject's original maximum. The original formula remains valid because it uses weaker lower bounds at both vector-difference steps. The improvement is optional for the reviewed criterion, but it removes a needless separate positive-future-floor obstruction when $c_{ij}>0$.

For either valid chosen future floor $\delta$, integration starts at $u_{\min}=d_{ij}/(z_{ij}-c_{ij})$. Direct evaluation gives

$$
\begin{aligned}
\int_{u_{\min}}^\infty\frac{z_{ij}^2}{\delta(d_{ij}+c_{ij}u)^2}\,du
&=\frac{z_{ij}^2}{\delta c_{ij}[d_{ij}+c_{ij}u_{\min}]}\\
&=\frac{z_{ij}(z_{ij}-c_{ij})}{\delta c_{ij}d_{ij}}.
\end{aligned}
$$

This agrees with the subject's future impulse expression. It is a majorant for an unchanged ordinary row, not a new source weighting.

Claim grade: derived future bounds and strengthening. A falsifier is a future root satisfying the specified velocity balls, causal equation, and positive $c_{ij}$ but violating the displacement inequality or $D_t\ge c_{ij}^2/2$. Failure of a sampled numerical estimate to provide exact input margins is an application failure, not such a falsifier.

## Joining the histories and closing continuation

For a disjoint bookkeeping partition, assign $S\le T_0$ to the old part and $S>T_0$ to the future part. The future estimate proved for $S\ge T_0$ remains applicable. Equality cannot simply be discarded as a measure-zero case: a source clock may freeze at $T_0$. Adding both majorants remains conservative even if both are evaluated at that boundary, but the actual partner row is counted only once in the law.

Every possible root lies after its entry root, as proved above. Old or future factor floors make its source derivative positive. Global source monotonicity then excludes two roots or a root interval, establishing the complete one-root partner census. The resulting source clocks are nondecreasing, with $S'=D_r/D_t\ge0$; no positive lower clock rate is required.

Summing the old and future impulse bounds and using norm decrease under post-summation projection gives $|\mathbf V_i(T)-\mathbf U_i|\le B_i^{\mathrm{split}}<\eta_i$ on any ordinary continuation in the proposed region. A first exit contradicts continuity of velocity. This is the same first-exit logic as in the common-history criterion, with no restriction that old velocities fit the future balls.

For a finite-endpoint restart, the old ranges have positive lower bounds $R_{ij}$, and the future ranges have positive lower bounds $d_{ij}/z_{ij}$. Both old and future transmitter factors have positive lower bounds. There are finitely many channels, so the ordinary acceleration has a finite uniform bound throughout every finite future interval; in fact the displayed majorants provide a finite global upper bound. Velocities remain Lipschitz, positions remain $C^{1,1}$ after entry, and the finite total impulse produces limiting velocities.

Choose the regular-history cutoff $S_*$ from the explicit hypothesis above. At entry, $g_{ij}(T_0,S_*)<0$ because $S_*<S_{ij}^0$ and the entry root is ordinary. The negative gap persists under capped receiver motion, so roots stay separated from this left history boundary. At any hypothetical finite maximal endpoint, bounded acceleration gives compatible continuous velocity limits, while the positive delay/range/factor margins and the source cutoff keep all roots in a compact regular source interval. The [short-step normal-cone construction](overnight-d-tail-independent-review-2026-10-06.md#a-local-construction-that-permits-a-frozen-clock) then restarts the solution: choose a step shorter than the positive delay floor, use only known retained sources, apply local position-Lipschitzness of their ordinary rows, and contract the integrated normal-cone response for sufficiently small step length. No positive $D_r$ floor or finite-time source flushing is needed. Restart contradicts a finite maximal endpoint.

Thus the strengthened precise hypotheses give global ordinary continuation and $|\mathbf X_i(T)-\mathbf X_j(T)|\ge d_{ij}+c_{ij}(T-T_0)$ for every pair. Each velocity converges because its remaining acceleration is integrable. No bounded surviving subcluster is possible under those hypotheses. This conclusion is conditional on actual entry and exact full-interval old-source margins, neither of which is established here.

Claim grade: derived conditional closure. A falsifier would be a finite maximal endpoint with the stated regularity and positive margins but no local restart, or a solution obeying all premises and violating the first-exit or pair-separation bounds. If the source history is only regular near entry roots, the cited restart proof is not licensed through later old-source sampling; the fuller interval assumption or a separate weaker-regularity theorem is then required.

## Review provenance and disposition

The frozen subject SHA-256 measured by `shasum -a 256` was `56b805f0b696eec41b9203f5231374c613a57e2292c4e88b47a323edaa3e4ecf`. The reviewer read the entire candidate and used the previously inspected fixed-law definition, Specialist charter, role lens, and normal-cone continuation companion. No numerical target, custom computational checker, code change, additional agent, or Git mutation was used. The only authorized write is this new review companion; the subject and previous reviews remain untouched by this reviewer.

The bounded review establishes the criterion's mathematical sufficiency under explicit full old-history regularity, with an independently derived improvement to the future factor floor. Remaining work is application: bound the old-history infima and ranges, select future radii and directions, and establish the impulse inequalities for an exact admitted history. A failure of this sufficient criterion leaves the actual fate unresolved.

Validation at 2026-10-07 00:11:00 UTC by `clock.curr_time`: `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/braid-program/analysis/overnight-d-split-tail-independent-review-2026-10-06.md` returned no whitespace diagnostics, with expected exit status 1 for the nonempty new-file difference. Path-scoped `git --no-optional-locks status --short` identified the companion as untracked. The final `shasum -a 256` read of the frozen subject matched the initial hash above. Mathematical validation is the separate reconstruction in this review; no numerical or rendered-document validation is claimed. The review is complete and no process remains running.

## Separate review of the enclosed-history interface

The new subsection [Explicit interface for an enclosed approximate history](overnight-d-split-history-tail.md#explicit-interface-for-an-enclosed-approximate-history) is mathematically sound under its stated exact-history and nonzero-displacement assumptions. Uniform position and velocity errors enlarge the old-emission normal caps and weaken their factor/range bounds in the stated directions. Arbitrary capped velocity centers preserve the future estimates, with the initial velocity error added to the impulse budget. This review provides no finite-evolution error enclosure and makes no actual-entry claim.

The exact histories must separately have complete-past unit speed control, compatible $C^{1,1}$ source history through the exact entry time, and the original projected equation for continuation. Small uniform position and velocity errors do not imply those properties. The approximation itself need not satisfy the cap or the exact evolution equation; the certified neighborhood must actually contain the selected exact preparation. Choosing a center $\mathbf U_i$ changes only the estimating ball, not the exact initial velocity or its trace.

### Cutoff and present separation

Let the common exact entry time be $T_0$ and let the error bounds hold for every label and every $S\in[S_*,T_0]$. Then

$$
\left|[\mathbf X_i(T_0)-\mathbf X_j(S)]-[\overline{\mathbf X}_i(T_0)-\overline{\mathbf X}_j(S)]\right|\le2\epsilon_x.
$$

The positive lower projected separation $\underline d_{ij}$ follows by taking the fixed unit-direction projection at $S=T_0$. In particular exact present positions are distinct. Define the certified cutoff gap margin

$$
\gamma_{ij}=T_0-S_*-|\overline{\mathbf X}_i(T_0)-\overline{\mathbf X}_j(S_*)|-2\epsilon_x>0.
$$

It implies $g_{ij}(T_0,S_*)\le-\gamma_{ij}$. Receiver speed at most one preserves this negative inequality at every later reception time, and complete-past source speed at most one excludes every emission at or before $S_*$. During any future continuation in the proposed velocity region, positive projected present separation gives $g_{ij}(T,T)>0$, so a root exists in $(S_*,T)$. Moreover, source-speed control makes the gap $2$-Lipschitz in source time, giving the uniform source-edge margin

$$
S(T)-S_*\ge\frac{\gamma_{ij}}2.
$$

No approximate entry-root time is used in this argument. The old factor bound below proves that the root at $T_0$ is ordinary and unique. Thus the interface can derive the earlier theorem's entry-root properties from its cutoff and margin data rather than requiring the exact emission times as independent numerical inputs.

### Enlarged old-emission caps

For an old emission put $\ell=T_0-S$, $\mathbf a=\mathbf X_i(T_0)-\mathbf X_j(S)$, and $\overline{\mathbf a}=\overline{\mathbf X}_i(T_0)-\overline{\mathbf X}_j(S)$. At any actual later reception, the exact speed argument already proved gives $\mathbf n\cdot\mathbf a\ge\ell$. At entry itself, causal equality gives equality for the arriving old root. Therefore

$$
\mathbf n\cdot\overline{\mathbf a}\ge\ell-2\epsilon_x.
$$

For $\overline a=|\overline{\mathbf a}|>0$, define $\overline{\mathbf p}=\overline{\mathbf a}/\overline a$ and $\beta_-=(\ell-2\epsilon_x)/\overline a$. If $\beta_->1$, that emission cannot arrive: no unit normal has the required projection. Otherwise it belongs to the enlarged spherical cap with parameter $\max\{-1,\beta_-\}$. This cap is a necessary condition for reception; admitting geometrically impossible emissions only makes the resulting infima more conservative.

The support formula is valid throughout $\beta\in[-1,1]$. For $s=|\overline{\mathbf w}|>0$ and $q=\overline{\mathbf p}\cdot\overline{\mathbf w}$, the scalar objective is $qx+\sqrt{s^2-q^2}\sqrt{1-x^2}$ on $x\in[\beta,1]$. Its unrestricted maximum is at $x=q/s$. When this point is admitted the support is $s$; otherwise the maximum is at $x=\beta$. This proves the same piecewise formula even when the cap is larger than a hemisphere. At $\beta=-1$ it gives the full-sphere support $s$, at $\beta=1$ it gives $q$, and at $s=0$ it gives zero. The approximate velocity need not lie in the unit ball for this support calculation.

The velocity error is evaluated at the same exact source time as the row, so

$$
\mathbf n\cdot\mathbf V_j(S)
\le M(\overline{\mathbf p},\max\{-1,\beta_-\},\overline{\mathbf V}_j(S))+\epsilon_v.
$$

This establishes the stated lower bound for $D_t$. There is no missing root-time displacement term: the error hypotheses hold uniformly at every source time in the interval, including the unknown true root time. A certificate that only bounds errors at approximate roots or stored nodes would not satisfy these hypotheses.

Likewise $|\mathbf a|\ge\overline a-2\epsilon_x$, and the exact receiver argument gives

$$
\tau\ge\frac{|\mathbf a|+\ell}{2}\ge\frac{\overline a-2\epsilon_x+\ell}{2},\qquad \tau\ge u.
$$

For precision, the potentially admitted set used in the infima is

$$
\mathcal A_{ij}=\{S\in[S_*,T_0]:\overline a(S)>0,\ \ell(S)\le\overline a(S)+2\epsilon_x\},
$$

under the subject's explicit positive-$\overline a$ assumption. Every actual old reception belongs to this set. Positive lower bounds for $1-M-\epsilon_v$ and $(\overline a-2\epsilon_x+\ell)/2$ over all of $\mathcal A_{ij}$ therefore give exactly the old impulse estimate $2/(\delta_{ij}^{\mathrm{old}}R_{ij})$. Equality cases at the admitted-set boundary must be included; a frozen source clock can place positive reception-time measure at one such emission.

The nonzero approximate displacement is an actual premise wherever normalization is used. If it vanishes, division by $\overline a$ is unavailable. A safe separate treatment is immediate from the unnormalized inequality: if $\ell>2\epsilon_x$, the emission is impossible and may be excluded without normalization; if $\ell\le2\epsilon_x$, all normal directions must be retained, with factor lower bound $1-|\overline{\mathbf V}_j(S)|-\epsilon_v$. The displayed range lower bound is then $(\ell-2\epsilon_x)/2\le0$, so this particular positive-range infimum test cannot pass while that emission remains in the admitted set. This does not refute a stronger geometric test; it explains why the current interface must verify its nonzero-displacement premise or handle the case explicitly.

### Arbitrary centers and the corrected initial budget

Let the centers satisfy $|\mathbf U_i|\le1$ and $|\mathbf V_i(T_0)-\mathbf U_i|\le\epsilon_i^0$. While the future velocity balls hold, integrating actual velocities relative to those centers gives $|\mathbf E_i(u)|\le\eta_i u$ exactly as before. Equality of center and actual initial velocity was not used in this displacement estimate. Replacing exact initial projected separation by its lower bound therefore gives

$$
\tau\mathbf e_{ij}\cdot\mathbf n
\ge\underline d_{ij}+c_{ij}u+(\mathbf e_{ij}\cdot\mathbf U_j+\eta_j)\tau.
$$

The onset, range, and transmitter-factor estimates follow unchanged, using $\underline d_{ij}$ throughout. In particular $z_{ij}-c_{ij}=1-\mathbf e_{ij}\cdot\mathbf U_i+\eta_i>0$ and $D_t\ge c_{ij}^2/2$ remain valid. No additional $\epsilon_i^0u$ displacement error is needed: the radius $\eta_i$ already bounds the full actual velocity deviation from the chosen center.

The initial error enters at the velocity first-exit step:

$$
|\mathbf V_i(T)-\mathbf U_i|
\le|\mathbf V_i(T_0)-\mathbf U_i|+\int_{T_0}^T|\dot{\mathbf V}_i(t)|\,dt
\le\epsilon_i^0+B_i^{\mathrm{split}}<\eta_i.
$$

This also ensures the exact entry velocity lies strictly inside its proposed estimating ball. The old and future impulse majorants bound the unchanged partner rows, and the selected projection cannot increase the summed acceleration norm. Consequently a first exit is impossible.

### Complete roots and continuation

The strict cutoff gap excludes all earlier emissions. Each possible remaining root has either the enlarged-cap old factor floor or the future factor floor. These bounds make every root ordinary; complete-source monotonicity then proves uniqueness in each partner channel. The positive old range infimum and future range bound prevent zero delay or range on a finite interval.

The exact $C^{1,1}$ source-history premise, finite acceleration majorants, and compatible actual entry traces preserve the regularity needed at any hypothetical finite maximal endpoint. The cutoff margin keeps roots away from the left history boundary. The earlier short-step normal-cone construction therefore restarts the solution, giving global continuation and complete pair separation for every exact history satisfying all of the enclosure and dynamical hypotheses. Centers remain auxiliary estimates throughout; there is no reset, kick, smoothing, source exclusion, or altered row weight.

The conditional result does not show that any exact solution from the selected preparation lies in the proposed neighborhood. That finite-evolution enclosure is a distinct obligation. It also does not infer exact cap compliance or Lipschitz velocity from the numerical approximation. These premises must be established independently, even if the supplied approximation and errors look small.

Claim grade: derived robust sufficient-entry interface. Falsifiers are an exact history satisfying all stated full-interval errors, exact cap and regularity, nonzero-displacement or safe-exclusion conditions, cutoff margin, and closure inequalities, but having an old root outside the enlarged cap, a row exceeding the majorant, a first exit, or a finite regular endpoint without the constructed restart. Failure to certify an input error bound or an admitted-set infimum leaves applicability unresolved and does not falsify this theorem.

### Interface review provenance

The interface was reviewed at subject SHA-256 `f46ae04da03aecad35710b2c2bf3c2202895794c9948691a4397bc2d48ac4005`, measured by `shasum -a 256`. The adopted stronger future floor, explicit old-history regularity, and disjoint $S=T_0$ bookkeeping in the preceding sections match the earlier review's algebra. This follow-up appends only this section to the owned companion. It runs no numerical job or new computational checker and alters no subject or code. Its outstanding application obligations are an actual finite-evolution enclosure and exact full-interval tail inequalities.

Interface validation at 2026-10-07 00:17:31 UTC by `clock.curr_time`: the final subject `shasum -a 256` read matched the frozen hash, and the companion's `git diff --no-index --check /dev/null` returned no whitespace diagnostics, with exit status 1 for its nonempty new-file difference. Path-scoped status still identified the companion as untracked. The bounded proof review is complete; the frozen subject may be released. No numerical or rendered-document verification is claimed.
